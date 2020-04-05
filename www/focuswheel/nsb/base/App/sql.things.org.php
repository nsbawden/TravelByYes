<?php
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Thu, 1 Jan 1970 01:00:00 GMT"); // Date in the past
header('Content-type: application/json');

if (file_exists('credentials.php')) include_once('credentials.php');

define('DB_HOST', 'tenmilliontruecom.fatcowmysql.com');
define('DB_NAME', 'pnx');
define('DB_USER', 'pnx');
define('DB_PASSWORD', 'wordasana399$');

$fields = array('id', 'userId', 'utc_modified', 'utc_created', 'type', 'shared', 'thing');

class Db {};

$db = !empty($_POST['Data']) ? json_decode($_POST['Data']) : new Db() ;
$db->result = false;
$mysqli = false;
$db->partitionKey = "Things";
$keys = $db->keys;
$noContent = false;

if (!empty($db->content64)) {
	$db->content = base64_decode($db->content64);
	$db->content64 = "";
}

$passkey = sha1($srcPasscode . $_SERVER["REMOTE_ADDR"] . $_SERVER["HTTP_USER_AGENT"] . $_ENV['TZ']);
if (!empty($srcPasscode) && $passkey !== $db->password) {
	$db->msg = "invalid credentials";
	$db->content = "";
	echo json_encode($db);
	exit(0);
}

//
// CONNECT TO THE DATABASE 
//
function MyConnect() {
	global $mysqli, $db;
	$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
	if ($mysqli->connect_errno) {
		$db->msg = "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
		echo json_encode($db);
		exit(0);
	}
}

//
// SELECT BY ID
//
if ($db->transact === "selectById") {
	MyConnect();
	$db->query = "SELECT * FROM `$db->partitionKey` WHERE id='$keys->id'";
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
		$list[] = $row;
	}
	$db->rows = count($list);
	$db->content = $list;
	$res->close();
	$db->fromCache = false;
	$db->result = true;
}
//
// SELECT BY USER
//
else if ($db->transact === "selectByUser") {
	MyConnect();
	$shared = $keys->shared ? "AND `shared`=1" : "";
	$db->query = "SELECT * FROM `$db->partitionKey` WHERE userId='$keys->userId' $shared";
	$res = $mysqli->query($db->query);
	if ($res === false) {
		$db->msg = "Failed to SELECT: ($mysqli->error)";
		echo json_encode($db);
		$mysqli->close();
		exit(0);
	}
	$list = array();
	while ($row = $res->fetch_assoc()) {
		$row['utc_added'] = floatval($row['utc_added']); // Fix number
		$row['utc_modified'] = floatval($row['utc_modified']); // Fix number
		$row['thing'] = json_decode($row['thing']);
		$list[] = $row;
	}
	$db->rows = count($list);
	$db->content = $list;
	$res->close();
	$db->fromCache = false;
	$db->result = true;
}
//
// SELECT BY TYPE
//
else if ($db->transact === "selectByType") {
	MyConnect();
	$shared = $keys->shared ? "AND `shared`=1" : "";
	$db->query = "SELECT * FROM `$db->partitionKey` WHERE type=$keys->type $shared";
	$res = $mysqli->query($db->query);
	if ($res === false) {
		$db->msg = "Failed to SELECT: ($mysqli->error)";
		echo json_encode($db);
		$mysqli->close();
		exit(0);
	}
	$list = array();
	while ($row = $res->fetch_assoc()) {
		$row['utc_added'] = floatval($row['utc_added']); // Fix number
		$row['utc_modified'] = floatval($row['utc_modified']); // Fix number
		$row['thing'] = json_decode($row['thing']);
		$list[] = $row;
	}
	$db->rows = count($list);
	$db->content = $list;
	$res->close();
	$db->fromCache = false;
	$db->result = true;
}
//
// SELECT BY USER AND TYPE
//
else if ($db->transact === "selectByUserType") {
	MyConnect();
	$shared = $keys->shared ? "AND `shared`=1" : "";
	$db->query = "SELECT * FROM `$db->partitionKey` WHERE userId='$keys->userId' AND type=$keys->type $shared";
	$res = $mysqli->query($db->query);
	if ($res === false) {
		$db->msg = "Failed to SELECT: ($mysqli->error)";
		echo json_encode($db);
		$mysqli->close();
		exit(0);
	}
	$list = array();
	while ($row = $res->fetch_assoc()) {
		$row['utc_added'] = floatval($row['utc_added']); // Fix number
		$row['utc_modified'] = floatval($row['utc_modified']); // Fix number
		$row['thing'] = json_decode($row['thing']);
		$list[] = $row;
	}
	$db->rows = count($list);
	$db->content = $list;
	$res->close();
	$db->fromCache = false;
	$db->result = true;
}
//
// DELETE
//
else if ($db->transact === "deleteById") {
	MyConnect();
	$db->query = "DELETE FROM `$db->partitionKey` WHERE id='$keys->id'";
	$res = $mysqli->query($db->query);
	if ($res === false) {
		$db->msg = "Failed to DELETE: ($mysqli->error)";
		echo json_encode($db);
		$mysqli->close();
		exit(0);
	}
	$db->fromCache = false;
	$db->result = true;
	$noContent = true;
}
//
// INSERT
//
else if ($db->transact === "insert") {
	MyConnect();
	$rr = json_decode($db->content);
	if (empty($rr)) {
		$db->msg = "Empty record";
		echo json_encode($db);
		exit(0);
	}
	$rr->utc_modified = time() * 1000;
	$rr->thing = json_encode($rr->thing);
	
	$keys = "";
	$values = "";
	$update = "";
	foreach ($fields as $n) {
		if (!empty($keys)) $keys .= ',';
		$keys .= "`$n`";
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
	$db->query = "INSERT INTO `$db->partitionKey` ($keys) VALUES ($values) ON DUPLICATE KEY UPDATE $update";
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
// RECEINT
//
else if ($db->transact === "receint") {
	MyConnect();
	$db->query = "SELECT * FROM `$db->partitionKey` ORDER BY utc_modified DESC LIMIT 500";
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
		$list[] = array($row['id'], $row['userId'], $row['utc_modified'], $row['utc_created'], $row['type'], $row['thing']);
	}
	$db->content = json_encode($list);
	$res->close();
	$db->fromCache = false;
	$db->result = true;
}
//
// MISSING TRANSACT
//
else {
	$db->msg = "no transaction specified";
	$noContent = true;
}

if ($mysqli)
	$mysqli->close();

if ($db->debug !== true) {
	$db->query = "";
	$db->password = "";
	$db->partitionKey = "";
	$db->rowKey = "";
	if ($noContent === true) {
		$db->content = "";
	}
}
	
echo json_encode($db);
?>