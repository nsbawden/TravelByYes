<?php
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Thu, 1 Jan 1970 01:00:00 GMT"); // Date in the past

error_reporting(E_ERROR | E_PARSE | E_CORE_ERROR);
ini_set('log_errors', '1');
ini_set('error_log', 'php_error.log');
ini_set('display_errors', '1');

if (file_exists('credentials.php')) include_once('credentials.php');

$data = array();

if (!empty($srcPasscode))
{
	$data['key'] = sha1(mt_rand(100000, 100000000) . $srcPasscode . $_SERVER["REMOTE_ADDR"] . $_SERVER["HTTP_USER_AGENT"] . $_ENV['TZ']);
	$data['passkey'] = sha1($srcPasscode . $_SERVER["REMOTE_ADDR"] . $_SERVER["HTTP_USER_AGENT"] . $_ENV['TZ']);
	$data['admin'] = $adminPassword && $adminPasscode === $adminPassword;
	$data['result'] = true;
	$data['version'] = filectime("version.txt") * 1000;
	$data['REMOTE_ADDR'] = $_SERVER["REMOTE_ADDR"];
	$data['REMOTE_PORT'] = $_SERVER["REMOTE_PORT"];
	//$data['HTTP_USER_AJENT'] = $_SERVER["HTTP_USER_AGENT"];
	//$data['TZ'] = $_ENV['TZ'];
	//$data['srcPasscode'] = $srcPasscode;
}
else
{
	$data['result'] = false;
}

$file1 = "../../../../play/files/pnx/src/PnxRetro.debug.js";
$file2 = "../../../../blogs/files/pnx/src/PnxRetro.debug.js";

$f1tm = filectime($file1);
$f2tm = filectime($file2);

if ($f1tm > $f2tm)
	$data['reload'] = true;
else
	$data['reload'] = false;

$data['f1tm'] = $f1tm;
$data['f2tm'] = $f2tm;	

session_start();
$sess = json_decode(json_encode($_SESSION['userCakeUser'])); // Turn it into a valid object
if (!empty($sess) && isset($sess->user_id))
	$data['userId'] = 'PX' . strval($sess->user_id);
$data['user'] = $sess;

//
// Include payment data
//
$uid = $data['userId'];
$purchasesFile = "../../paypal/App/db/purchases/$uid.txt";
if (file_exists($purchasesFile))
{
	$data['transactions'] = json_decode(file_get_contents($purchasesFile));
}
else
{
	$data['transactions'] = json_decode("{}");
}

echo json_encode($data);

?>