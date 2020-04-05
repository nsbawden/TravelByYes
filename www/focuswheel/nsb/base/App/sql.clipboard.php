<?php
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Thu, 1 Jan 1970 01:00:00 GMT"); // Date in the past
header('Content-type: application/json');

// Azure table storage equivilency
// http://cloud.dzone.com/articles/partitionkey-and-rowkey
//
// $db->rowKey = table primary key
// $db->partitionKey = table name
// $db->table = database name

if (file_exists('credentials.php')) include_once('credentials.php');

define('DB_HOST', 'tenmilliontruecom.fatcowmysql.com');
define('DB_NAME', 'pnx');
define('DB_USER', 'pnx');
define('DB_PASSWORD', 'wordasana399$');

$fields = array('id', 'utc_modified', 'json', 'user');

class Db {};

$db = !empty($_REQUEST['Data']) ? json_decode($_POST['Data']) : new Db() ;
$db->result = false;
$mysqli = false;
$db->partitionKey = "Clipboard";

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
// FOR TESTING
//
//$db->transact = "select";  
//$db->rowKey = "1";

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
// SELECT
//
if ($db->transact === "select") {
	MyConnect();
	$db->query = "SELECT * FROM `$db->partitionKey` WHERE id='$db->rowKey'";
	$res = $mysqli->query($db->query);
	if ($res === false) {
		$db->msg = "Failed to SELECT: ($mysqli->error)";
		echo json_encode($db);
		$mysqli->close();
		exit(0);
	}
	$row = $res->fetch_assoc();
	$row['utc_modified'] = floatval($row['utc_modified']); // Fix number
	$db->content = json_encode($row);
	$res->close();
	$db->fromCache = false;
	$db->result = true;
}
//
// DELETE
//
else if ($db->transact === "delete") {
	MyConnect();
	$db->query = "DELETE FROM `$db->partitionKey` WHERE id='$db->rowKey'";
	$res = $mysqli->query($db->query);
	if ($res === false) {
		$db->msg = "Failed to DELETE: ($mysqli->error)";
		echo json_encode($db);
		$mysqli->close();
		exit(0);
	}
	//$res->close();
	$db->fromCache = false;
	$db->result = true;
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
	$rr->user = json_encode($rr->user);
	
	$keys = "";
	$values = "";
	$update = "";
	foreach ($fields as $n) {
		if (!empty($keys)) $keys .= ',';
		$keys .= "`$n`";
		if (!empty($values)) $values .= ',';
		$values .= "'" . $mysqli->escape_string($rr->$n) . "'";
		if (!empty($update)) $update .= ',';
		$update .= "`$n`='" . $mysqli->escape_string($rr->$n) . "'";
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
}
//
// RECEINT
//
else if ($db->transact === "receint") {
	MyConnect();
	$db->query = "SELECT id,utc_modified,user FROM `$db->partitionKey` ORDER BY utc_modified DESC LIMIT 500";
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
		$list[] = array($row['id'], $row['utc_modified'], json_decode($row['user']));
	}
	$db->content = json_encode($list);
	$res->close();
	$db->fromCache = false;
	$db->result = true;
}
//
// MISSING TRANSACT
//
else
	$db->msg = "no transaction specified";

if ($mysqli)
	$mysqli->close();

echo json_encode($db);
?>