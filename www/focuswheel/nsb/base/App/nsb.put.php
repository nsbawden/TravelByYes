<?php
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Thu, 1 Jan 1970 01:00:00 GMT"); // Date in the past
//
// The minify option places a minimized copy in the file and the original copy in the same
// file name with a dot (.) on the front.
// Only files with a .js extension will be minified.
// Right now this option is forced on to be in sync with the vss editor. (NOT)
//

error_reporting(E_ERROR | E_PARSE | E_CORE_ERROR);
ini_set('log_errors', '1');
ini_set('error_log', 'php_error.log');
ini_set('display_errors', '1');

if (file_exists('credentials.php')) include_once('credentials.php');

$allowedPaths = array(
	//'db/hearts' => true, // example
	'db/grid/images' => true
);

function webPath($path, $file) {
	// Returns full file path sans ending slash /
	// /path = webroot relative path/file
	// :/path = file system full path/file
	// @/path = mirror relative path/file
	// all else = path/file
	// $path and/or $file can be empty or respectivly full path
	global $docroot,$mirrorroot;
	if ($path && substr($path,-1,1) != '/') $path .= '/';
	$path = ($path ? $path : '') . ($file ? $file : '');
	if (substr($path,0,1) == '/') $path = $docroot . $path;
	if (substr($path,0,2) == ':/') $path = substr($path,1);
	if (substr($path,0,2) == '@/') $path = $mirrorroot . substr($path,1);
	if ($path && substr($path,-1,1) == '/') $path = substr($path,0,strlen($path)-1);
	return $path;
}

function req($nm,$default) {
	$v = $_POST[$nm];
	if ($v == 'TRUE' || $v == 'true') return TRUE;
	if ($v == 'FALSE' || $v == 'false') return FALSE;
	if ($v) {
		if (0 === strpos($v,'transfer/double-encoded:'))
			return pureTx(rawurldecode(substr($v,24)));
		return pureTx($v);
	}
	$v = $_GET[$nm];
	if ($v == 'TRUE' || $v == 'true') return TRUE;
	if ($v == 'FALSE' || $v == 'false') return FALSE;
	if ($v) return pureTx($v);
	return $default;
}

function pureTx($tx) {
	if (get_magic_quotes_gpc() == 0) return $tx;
	return stripslashes($tx);
}

// Migrating to $db format
class Db {};
$db = new Db();
$db = !empty($_REQUEST['Data']) ? json_decode($_POST['Data']) : new Db() ;
$db->result = false;

$forceSave = req('forceSave', FALSE);
//$forceSave = TRUE;

// needs at least path, file, password, callback, content, and probably createFile

$myRoot = req('path', '');
$filename = req('file', '');
$password = req('password', '');
$chkSaveKey = req('chkSaveKey', FALSE);
$createFile = req('createFile', FALSE);
$createPath = req('createPath', FALSE);
$createOnly = req('createOnly', FALSE); // Only save to file if it doesn't exist
$createBackup = req('createBackup', FALSE);
$backupName = req('backupName', 'backup.txt'); // Required if has $createBackup
$content = req('content', '');
$content64 = req('content64', '');
$priorTime = req('priorTime', 0);
//$minify = req('minify', FALSE);
$key = req('key');
$callback = req('callback');

$createBackup = FALSE;
$logEach = TRUE;

$passkey = sha1($srcPasscode . $_SERVER["REMOTE_ADDR"] . $_SERVER["HTTP_USER_AGENT"] . $_ENV['TZ']);
if (!empty($srcPasscode) && $passkey !== $password) {
	$db->msg = "invalid credentials";
	$db->content = "";
	echo json_encode($db);
	exit(0);
}

//autoHeader();
//authenticate($validCredentials);

$msg = $altmsg = $error = '';
$result = FALSE;
$created = FALSE;
$didMin = $savedMin = FALSE;
$minimized = '';
$minify = FALSE;
$priorChanged = 0;
$lastChanged = 0;
$fileNewer = FALSE;
$logFile = '@Logs.txt';

$fullname = webPath($myRoot, $filename);
$pi = pathinfo($fullname);
$pathName = $pi['dirname'];
$pathBackup = webPath('bk/', $myRoot);
$fileBackup = $pathBackup . '/' . $backupName;

// Fail to write any .php file for security reasons
if ($pi['extension'] == 'php')
	exit(0);
	
// Only write to these paths
if ($allowedPaths[$myRoot] !== true)
	authenticate("path not allowed $myRoot");

function autoAppend($file, $content) {
	$h = fopen($file, 'a');
	if ($h) {
		flock($h, LOCK_EX);
		clearstatcache();
		$sta = fstat($h);
		if ($sta['size'] > 0)
			fwrite($h, ",\r\n" . $content);
		else
			fwrite($h, $content);
		flock($h, LOCK_UN);
		fclose($h);
		return TRUE;
	}
	return FALSE;
}
	
if ($content64) {
	$content = base64_decode($content64);
}

// If creating folder and the folder doesn't exist then create it
if ($createPath === TRUE) {
	$pi = pathinfo($fullname);
	$newFolder = $pi['dirname'];
	if (!file_exists($newFolder)) {
		$ic = mkdir($newFolder, 0777, TRUE);
		if ($ic === FALSE)
			$msg = "FAILED TO CREATE FOLDER $newFolder";
	}
}

// If creating backup then create the folder and file
if ($createBackup === TRUE && !$msg) {
	if (!file_exists($pathBackup)) {
		$altmsg = 'CREATING BACKUP FOLDER';
		$ic = mkdir($pathBackup, 0777, TRUE);
		if ($ic === FALSE)
			$altmsg = "FAILED TO CREATE BACKUP FOLDER $pathBackup";
	}
	file_put_contents($fileBackup, $content, LOCK_EX);
}

// If creating and the file doesn't exist then create it
if (($createFile === TRUE || $createOnly === TRUE) && !file_exists($fullname) && !$msg) {
	$h = fopen($fullname, 'a');
	if ($h) {
		fclose($h);
		$created = TRUE;
	} else
		$msg = "FAILED TO CREATE FILE $filename";
	clearstatcache();
}

if (file_exists($fullname) && !$msg && ($created === TRUE || $createOnly === FALSE))
	while (TRUE) {
		clearstatcache();
		$priorChanged = filemtime($fullname);

		if ($priorTime !== 0 && $priorChanged > $priorTime && $forceSave === FALSE) {
			$msg = "FILE IS NEWER";
			$fileNewer = TRUE;
			break;
		}

		$pi = pathinfo($fullname);
		$minkey = $pi['dirname'] . '/.@@js';
		$minname = $pi['dirname'] . '/.' . $pi['basename'];

		$fsz = $msz = 0;

		if (file_exists($fullname))
			$fsz = filesize($fullname);
		if (file_exists($minname))
			$msz = filesize($minname);
		else
			$msz = $fsz;

		//$content = ReversionLinks($content);

		$h = fopen($fullname, 'w');
		if ($h) {
			flock($h, LOCK_EX);
			fwrite($h, $content);
			flock($h, LOCK_UN);
			fclose($h);
			$result = TRUE;
			$msg = "FILE CONTENT SAVED";
			if ($chkSaveKey)
				file_put_contents("chk/c$chkSaveKey" . ".txt", print_r($_ENV, true), LOCK_EX);
		} else
			$msg = "UNABLE TO OPEN FILE $filename";

		if ($minify === TRUE && strcasecmp($pi['extension'], 'js') == 0 && file_exists($minkey)) {
			include_once("lib.jsmin.php");
			try {
				$minimized = JSMin::minify($content);
				$didMin = TRUE;
			} catch (Exception $e) {
				$error = $e->getMessage();
			}
		}

		if ($minimized) {
			if ($fsz > $msz)
				copy($fullname, $minname . '.safety');
			$ic = TRUE;
			if (file_exists($minname))
				$ic = unlink($minname);
			if ($ic)
				$ic = rename($fullname, $minname);
			if ($ic) {
				$h = fopen($fullname, 'w');
				if ($h) {
					flock($h, LOCK_EX);
					fwrite($h, "$minimized\r\n");
					flock($h, LOCK_UN);
					fclose($h);
					$savedMin = TRUE;
				} else
					$msg .= " ... UNABLE TO OPEN FILE $minfilename";
			}
		}
		break;
	}
else {
	$result = FALSE;
	$msg .= " ... FILE EXISTS (createOnly=" . json_encode($createOnly) . ")\n";
}

clearstatcache();
$lastChanged = filemtime($fullname);
$fileSize = filesize($fullname);

$ee = '';
$ee .= '"result":' . json_encode($result) . ",\n";
$ee .= '"path":' . json_encode($myRoot) . ",\n";
$ee .= '"file":' . json_encode($filename) . ",\n";
$ee .= '"fileSize":' . json_encode($fileSize) . ",\n";
$ee .= '"created":' . json_encode($created) . ",\n";
$ee .= '"fileNewer":' . json_encode($fileNewer) . ",\n";
$ee .= '"priorTime":' . json_encode($priorTime) . ",\n";
$ee .= '"lastChanged":' . json_encode($lastChanged) . ",\n";
$ee .= '"priorChanged":' . json_encode($priorChanged) . ",\n";
$ee .= '"fullPath":' . json_encode($fullname) . ",\n";
$ee .= '"pathBackup":' . json_encode($pathBackup) . ",\n";
$ee .= '"fileBackup":' . json_encode($fileBackup) . ",\n";
$ee .= '"createBackup":' . json_encode($createBackup) . ",\n";
$ee .= '"msg":' . json_encode($msg) . ",\n";
$ee .= '"altmsg":' . json_encode($altmsg) . ",\n";
$ee .= '"error":' . json_encode($error) . ",\n";
$ee .= '"host":' . json_encode($_ENV['SERVER_NAME']) . ",\n";
$ee .= '"minimized":' . json_encode($didMin) . ",\n";
$ee .= '"minsaved":' . json_encode($savedMin) . ",\n";
if ($devserver) {
	$ee .= '"cwd":' . json_encode(getcwd()) . ",\n";
	$ee .= '"root":' . json_encode($_SERVER['DOCUMENT_ROOT']) . ",\n";
}
$ee .= '"end":true' . "\n";

if ($callback)
	echo "$callback({\n$ee})";
else
	echo "{\n$ee}";

if ($logEach) {
	autoAppend($logFile, "{\n$ee}");
}
?>