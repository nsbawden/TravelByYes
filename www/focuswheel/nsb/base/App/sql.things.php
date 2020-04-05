<?php
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Thu, 1 Jan 1970 01:00:00 GMT"); // Date in the past
header('Content-type: application/json');

//if (file_exists('credentials.php')) include_once('credentials.php');

include_once('site.config.php');

// Set to true for development and false for production 
// Overrdden by $db->debug for users <= 3 (admin,nathan,testuser)
$myDebug = false;

$fields = array('id', 'topic', 'prime', 'second', 'third', 'userId', 'utc_modified', 'utc_created', 'isa', 'also', 'secret', 'thing');
$fieldsNoId =   array('topic', 'prime', 'second', 'third', 'userId', 'utc_modified', 'utc_created', 'isa', 'also', 'secret', 'thing');

class Db {};

$db = !empty($_POST['Data']) ? json_decode($_POST['Data']) : new Db() ;
$db->result = false;
$mysqli = false;
$db->sqlTable = "SqlThings";
$keys = $db->keys;
$noContent = false;
$userKnown = false;
$userSame = false;
$testUserId = "PX3";

// So that we can read the session userCakeUser variable
class loggedInUser {
	public $displayname = NULL;
	public $email = NULL;
	public $hash_pw = NULL;
	public $title = NULL;
	public $user_id = NULL;
	public $username = NULL;
}

session_start();

//
// DETERMINE IF THE USER IS KNOWN AND ALSO IF REQUEST REFERENCES THE SAME USER
//
if (!empty($_SESSION['userCakeUser']) AND !empty($_SESSION['userCakeUser']->user_id)) {
	$uid = (int)$_SESSION['userCakeUser']->user_id;
	if ($uid > 0) {
		$userKnown = true;
		if (!empty($keys->userId)) {
			$pxUid = substr($keys->userId, 0, 2) == 'PX' ? (int)substr($keys->userId, 2) : $pxUid ;		
			if ($pxUid == $uid)
				$userSame = true;
		}
		if ($uid <= 10 AND $db->debug) /* admin and nathan and testusers */
			$myDebug = true;
	}
}

$db->userKnown = $userKnown;
$db->userSame = $userSame;
if ($myDebug === true)
	$db->session = $_SESSION;

if (!empty($db->content64)) {
	$db->content = base64_decode($db->content64);
	$db->content64 = "";
}

//
// RETURN OUTPUT
//
function returnOutput() {
	global $db, $noContent, $myDebug, $mysqli;

	if ($mysqli)
		$mysqli->close();

	// Hide things we dont want non-developers to see	
	if ($myDebug !== true) {
		$db->query = "";
		$db->sqlTable = "";
		if ($noContent === true) {
			$db->content = "";
		}
	}
	echo json_encode($db);
	die();
}

//
// PROVIDE SESSION LOCK SECURITY
//
function mustBeKnownUser() {
	global $db, $userKnown;
	if ($userKnown !== true) {
		$db->msg = "database operation by unknown user";
		$db->loginError = true;
		$db->loginUnknown = true;
		$db->content = array();
		$db->result = false;
		returnOutput();
	}
}

function mustBeSameUser() {
	global $db, $userSame;
	if ($userSame !== true) {
		$db->msg = "protected database operation by different user";
		$db->loginError = true;
		$db->loginDifferentUser = true;
		$db->content = array();
		$db->result = false;
		returnOutput();
	}
}

//
// PROVIDE SECRET FIELD SECURITY - USER MUST BE SAME USER TO ACCESS SECRET DATA
//
function bySecret($keys) {
	global $userSame;
	if ($userSame === true)
		$secret = ""; // All access
	else
		$secret = "AND `secret`=0"; // Public access only
	return $secret;
}

//
// RUN THE QUERY
//
function runQuery() {
	global $db, $mysqli;
	$res = $mysqli->query($db->query);
	if ($res === false) {
		$db->msg = "Failed to SELECT: ($mysqli->error)";
		echo json_encode($db);
		$mysqli->close();
		exit(0);
	}
	$list = array();
	while ($row = $res->fetch_assoc()) {
		$row['utc_created'] = floatval($row['utc_created']); // Fix number
		$row['utc_modified'] = floatval($row['utc_modified']); // Fix number
		$row['thing'] = json_decode($row['thing']);
		$row['secret'] = $row['secret'] ? true : false;
		$list[] = $row;
	}
	$db->rows = count($list);
	$db->content = $list;
	$res->close();
	$db->fromCache = false;
	$db->result = true;
}

//
// EXPLODE A TOPIC INTO MULTI-QUERY
//

function explodePath(&$topic, &$prime, &$second, &$third) {
	if (substr($topic, 0, 1) == '/') {
		$t = explode('/', substr($topic, 1));
		if (!empty($t[0]) && !in_array($t[0], $prime)) $prime[] = $t[0];
		if (!empty($t[1]) && !in_array($t[1], $second)) $second[] = $t[1];
		if (!empty($t[2]) && !in_array($t[2], $third)) $third[] = $t[2];
	}
	else {
		$prime[] = $topic;
	}	
}

function explodeTopic($topic) {
	global $mysqli;
	$prime = array();
	$second = array();
	$third = array();
		
	if (strpos($topic, ',') === false) {
		explodePath($topic, $prime, $second, $third);
	}
	else {
		$list = explode(',', trim($topic, ','));
		foreach($list as $t) {
			explodePath($t, $prime, $second, $third);
		}
	}
	$tp = $tm = $to = '';
	
	if (!empty($prime)) {
		$tt = '';
		foreach ($prime as $t) {
			$tt .= "'" . $mysqli->escape_string($t) . "',";
		}
		$tp .= 'prime IN (' . trim($tt, ',') . ')';
	}
	if (!empty($second)) {
		$tt = '';
		foreach ($second as $t) {
			$tt .= "'" . $mysqli->escape_string($t) . "',";
		}
		$tm .= 'second IN (' . trim($tt, ',') . ')';
	}
	if (!empty($third)) {
		$tt = '';
		foreach ($third as $t) {
			$tt .= "'" . $mysqli->escape_string($t) . "',";
		}
		$to .= 'third IN (' . trim($tt, ',') . ')';
	}
	if (!empty($tm)) $tp .= ' AND ' . $tm;
	if (!empty($to)) $tp .= ' AND ' . $to;
	return $tp;
}

//
// CONNECT TO THE DATABASE 
//
function MyConnect() {
	global $mysqli, $db;
	$mysqli = new mysqli(DB_HOST, DB_THING_USER, DB_THING_PASSWORD, DB_THING_NAME);
	if ($mysqli->connect_errno) {
		$db->msg = "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
		echo json_encode($db);
		exit(0);
	}
}

//
// SELECT BY ID
//
if ($keys->transact === "selectById") {
	MyConnect();
	$secret = bySecret($keys);
	$db->query = "SELECT * FROM `$db->sqlTable` WHERE id='$keys->id' $secret";
	runQuery();
}
//
// SELECT BY USER AND/OR TOPIC
// If has thing->ResultIds field then those ids are queried and returned in thing->_resultItems
// If there is an also field in the retrieved object then get all the items in that list and put them in the more field.
// TODO: Make also/more retrievals recursive by both depth and by width of the result list.
// TODO: Allow any topic format for the list items of the also field. example: ["(id)","/Pnx/User/Item","text topic"]
//
else if ($keys->transact === "selectByTopic") {
	MyConnect();
	$secret = bySecret($keys);
	$topic = $keys->topic;
	$topicTpl = explodeTopic($topic);
	if (!empty($keys->userId))
		$db->query = "SELECT * FROM `$db->sqlTable` WHERE userId='$keys->userId' AND $topicTpl $secret";
	else
		$db->query = "SELECT * FROM `$db->sqlTable` WHERE $topicTpl $secret";
	runQuery();

	if ($db->result && !empty($db->content[0]['also'])) {
		$firstQuery = $db->query;
		$firstContent = $db->content;
		$list = json_decode($db->content[0]['also']);
		$tt = '';
		foreach($list as $id) {
			$tt .= "'" . trim($id, '()') . "',";
		}
		$also = 'id IN (' . trim($tt, ',') . ')';
		// To ponder...
		// Is this a security hole?
		// Can a malicious user somehow construct an object that get's other objects out of the security scope?
		// Well firstly, one would have to know the GUID's of those other secret objects, so that's one level of security.
		// Ideally one should only be able to get other items that belong to us or are not secret.
		// Need to devize a query like that.
		$db->query = "SELECT * FROM `$db->sqlTable` WHERE $also";
		$db->queryMore = $db->query;
		runQuery();
		$firstContent[0]['more'] = $db->content;
		$db->content = $firstContent;
		$db->query = $firstQuery;
	}

//	if ($db->result && !empty($db->content[0]['thing']->ResultIds)) {
//		$db->firstQuery = $db->query;
//		$db->firstContent = $db->content;
//		$list = $db->content[0]['thing']->ResultIds;
//		$tt = '';
//		foreach($list as $id) {
//			$tt .= "'" . trim($id, '()') . "',";
//		}
//		$to = 'id IN (' . trim($tt, ',') . ')';
//		if (!empty($keys->userId))
//			$db->query = "SELECT * FROM `$db->sqlTable` WHERE userId='$keys->userId' AND $to $secret";
//		else
//			$db->query = "SELECT * FROM `$db->sqlTable` WHERE $to $secret";
//		runQuery();
//		$db->firstContent[0]['thing']->_resultItems = $db->content;
//		$db->content = $db->firstContent;
//		$db->firstContent = '';
//	}
}
//
// SELECT BY SEARCH
//
else if ($keys->transact === "selectBySearch") {
	MyConnect();
	$secret = bySecret($keys);
	$db->query = "SELECT * FROM `$db->sqlTable` WHERE topic REGEXP '[[:<:]]$keys->search[[:>:]]' $secret";
	runQuery();
}
//
// SELECT BY USER
//
else if ($keys->transact === "selectByUser") {
	MyConnect();
	$secret = bySecret($keys);
	$db->query = "SELECT * FROM `$db->sqlTable` WHERE userId='$keys->userId' $secret ORDER BY utc_modified";
	runQuery();
}
//
// DELETE BY ID
//
else if ($keys->transact === "deleteById" && $keys->id !== 'single') {
	mustBeSameUser();
	MyConnect();
	$db->query = "DELETE FROM `$db->sqlTable` WHERE id='$keys->id' LIMIT 1";
	$res = $mysqli->query($db->query);
	if ($res === false) {
		$db->msg = "Failed to DELETE: ($mysqli->error)";
		echo json_encode($db);
		$mysqli->close();
		exit(0);
	}
	$db->rows = $mysqli->affected_rows;
	$db->fromCache = false;
	$db->result = true;
	$noContent = true;
}
//
// DELETE BY TOPIC AND USER
//
else if ($keys->transact === "deleteById" && $keys->id === 'single') {
	mustBeSameUser();
	MyConnect();
	$db->query = "DELETE FROM `$db->sqlTable` WHERE topic='$keys->topic' AND userId='$keys->userId' LIMIT 1";
	$res = $mysqli->query($db->query);
	if ($res === false) {
		$db->msg = "Failed to DELETE: ($mysqli->error)";
		echo json_encode($db);
		$mysqli->close();
		exit(0);
	}
	$db->rows = $mysqli->affected_rows;
	$db->fromCache = false;
	$db->result = true;
	$noContent = true;
}
//
// INSERT WITH ID
//
else if ($keys->transact === "insert" && $keys->id !== 'single') {
	if ($keys->secret === true)
		mustBeSameUser();
	MyConnect();
	$rr = json_decode($db->content);
	if (empty($rr)) {
		$db->msg = "Empty record";
		echo json_encode($db);
		exit(0);
	}
	$rr->utc_modified = time() * 1000;
	if (!empty($rr->thing))
		$rr->thing = json_encode($rr->thing);
	if (!empty($rr->also))
		$rr->also = json_encode($rr->also);
	
	$kees = "";
	$values = "";
	$update = "";
	$topic = $rr->topic;
	
	if (substr($topic, 0, 1) == '/') {
		$ls = explode('/', substr($topic, 1));
		$rr->prime = $ls[0] ? $ls[0] : "";
		$rr->second = $ls[1] ? $ls[1] : "";
		$rr->third = $ls[2] ? $ls[2] : "";
	}
	
	foreach ($fields as $n) {
		if (!empty($kees)) $kees .= ',';
		$kees .= "`$n`";
		if (!empty($values)) $values .= ',';
		if ($n == 'utc_created')
			$values .= "(UNIX_TIMESTAMP() * 1000)";
		else
			$values .= "'" . $mysqli->escape_string($rr->$n) . "'";
		if ($n != 'utc_created') {
			if (!empty($update)) $update .= ',';
			$update .= "`$n`='" . $mysqli->escape_string($rr->$n) . "'";
			}
	}
	$db->query = "INSERT INTO `$db->sqlTable` ($kees) VALUES ($values) ON DUPLICATE KEY UPDATE $update";
	$res = $mysqli->query($db->query);
	if ($res === false) {
		$db->msg = "Failed to INSERT/UPDATE: ($mysqli->error)";
		echo json_encode($db);
		$mysqli->close();
		exit(0);
	}
	$db->result = true;
	$noContent = true;
}
//
// INSERT WITHOUT ID - MUST HAVE userId and will only update the first instance in the db
//
else if ($keys->transact === "insert" && $keys->id === 'single') {
	if ($keys->secret === true)
		mustBeSameUser();
	MyConnect();
	$rr = json_decode($db->content);
	if (empty($rr) || empty($rr->userId)) {
		$db->msg = "Empty record";
		echo json_encode($db);
		exit(0);
	}
	$db->singleId = $id = $rr->id = uniqid('topic', true); // Id for insert will have topic prepended to it
	$kTopic = $keys->topic;
	$kUserId = $keys->userId;
	$rr->utc_modified = time() * 1000;
	if (!empty($rr->thing))
		$rr->thing = json_encode($rr->thing);
	if (!empty($rr->also))
		$rr->also = json_encode($rr->also);
	
	$kees = "";
	$values = "";
	$update = "";
	$topic = $rr->topic;
	
	if (substr($topic, 0, 1) == '/') {
		$ls = explode('/', substr($topic, 1));
		$rr->prime = $ls[0] ? $ls[0] : "";
		$rr->second = $ls[1] ? $ls[1] : "";
		$rr->third = $ls[2] ? $ls[2] : "";
	}
	
	foreach ($fieldsNoId as $n) {
		if (!empty($kees)) $kees .= ',';
		$kees .= "`$n`";
		if (!empty($values)) $values .= ',';
		if ($n == 'utc_created')
			$values .= "(UNIX_TIMESTAMP() * 1000)";
		else
			$values .= "'" . $mysqli->escape_string($rr->$n) . "'";
		if ($n != 'utc_created') {
			if (!empty($update)) $update .= ',';
			$update .= "`$n`='" . $mysqli->escape_string($rr->$n) . "'";
			}
	}
	$db->query = "UPDATE `$db->sqlTable` SET $update WHERE `topic` = '$kTopic' AND `userId` = '$kUserId' LIMIT 1";
	$res = $mysqli->query($db->query);
	$db->result1 = $res;
	if ($res === false || $mysqli->affected_rows == 0) {
		$db->affected_rows1 = $mysqli->affected_rows;
		$db->error1 = $mysqli->error;
		$db->query2 = "INSERT INTO `$db->sqlTable` (`id`,$kees) VALUES ('$id',$values)";
		$res = $mysqli->query($db->query2);
		$db->result2 = $res;
	}
	if ($res === false) {
		$db->error2 = $mysqli->error;
		$db->msg = "Failed to UPDATE/INSERT";
		echo json_encode($db);
		$mysqli->close();
		exit(0);
	}
	$db->result = true;
	$noContent = true;
}
//
// RECEINT
//
/*
else if ($keys->transact === "receint") {
	MyConnect();
	$db->query = "SELECT * FROM `$db->sqlTable` ORDER BY utc_modified DESC LIMIT 500";
	$res = $mysqli->query($db->query);
	if ($res === false) {
		$db->msg = "Failed to SELECT: ($mysqli->error)";
		echo json_encode($db);
		$mysqli->close();
		exit(0);
	}
	$list = array();
	while ($row = $res->fetch_assoc()) {
		$row['utc_modified'] = floatval($row['utc_modified']); // Fix number
		$row['utc_created'] = floatval($row['utc_created']); // Fix number
		$list[] = array($row['id'], $row['userId'], $row['utc_modified'], $row['utc_created'], $row['is'], $row['thing']);
	}
	$db->content = json_encode($list);
	$res->close();
	$db->fromCache = false;
	$db->result = true;
}
*/
//
// DELETE TESTS
//
else if ($keys->transact === "deleteTests") {
	mustBeSameUser();
	MyConnect();
	$db->query = "DELETE FROM `$db->sqlTable` WHERE userId='$testUserId' LIMIT 50"; // Just in case limit to 50
	$res = $mysqli->query($db->query);
	if ($res === false) {
		$db->msg = "Failed to DELETE: ($mysqli->error)";
		echo json_encode($db);
		$mysqli->close();
		exit(0);
	}
	$db->rows = $mysqli->affected_rows;
	$db->fromCache = false;
	$db->result = true;
	$noContent = true;
}
//
// MISSING TRANSACT
//
else {
	$db->msg = "no transaction specified";
	$noContent = true;
}

returnOutput();
?>