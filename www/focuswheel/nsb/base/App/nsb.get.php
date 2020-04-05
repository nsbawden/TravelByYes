<?php

header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Thu, 1 Jan 1970 01:00:00 GMT"); // Date in the past
//header('Content-type: text/JavaScript');
error_reporting(E_ERROR | E_PARSE | E_CORE_ERROR);
ini_set('log_errors', '1');
ini_set('error_log', 'php_error.log');
ini_set('display_errors', '1');

include_once("file.common.php");
autoHeader();
authenticate($validCredentials);

$allowedPaths = array(
	'db/hearts' => true,
);

// Input
$file = req('file', '');
$path = req('path', '');
$allowEmpty = req('allowEmpty', FALSE);

$result = TRUE;
$ee = $aot = '';
$content = '';
$isFolder = FALSE;
$exists = FALSE;
$size = 0;
$msg = 0;
$fv = 0;
$reload = FALSE;
$lastChanged = 0;

$fullPath = webPath($path, $file);

// Fail to read any .php file for security reasons
$pi = pathinfo($fullPath);
if ($pi['extension'] == 'php')
	authenticate("reading php files not allowed $file");

// Only read from these paths
if ($allowedPaths[$path] !== true)
	authenticate("path not allowed $path");

$pi = pathinfo($fullPath);
$minkey = $pi['dirname'] . '/.@@js';
$minname = $pi['dirname'] . '/.' . $pi['basename'];

if (file_exists($minkey) && file_exists($minname))
	$fullPath = $minname;

if (file_exists($fullPath)) {
	$exists = TRUE;
	if (is_dir($fullPath)) {
		$result = FALSE;
		$isFolder = TRUE;
		$msg = 'requested content of a folder, not a file';
	} else {
		$content = file_get_contents($fullPath);
		//$content = ReversionLinks($content);
		$size = strlen($content);
		if ($reload === TRUE && $size > 40) {
			file_put_contents($fullPath, $content, LOCK_EX);
		}
		clearstatcache();
		$lastChanged = filemtime($fullPath);
	}
}
else {
	if ($allowEmpty)
	{
		$content = "";
		$msg = "file empty or doesn't exist";
	}
	else
	{
		$result = FALSE;
		$msg = 'file does not exist';
	}
}

if ($callback)
	$ee = "$callback({\n";
else
	$ee = "{\n";
$ee .= '"result":' . json_encode($result) . ",\n";
$ee .= '"inactive":' . json_encode($inactive_credentials) . ",\n";
$ee .= '"devServer":' . json_encode($devserver) . ",\n";
$ee .= '"userid":' . json_encode($usercode) . ",\n";
$ee .= '"email":' . json_encode($curateEmail) . ",\n";
$ee .= '"file":' . json_encode($file) . ",\n";
$ee .= '"path":' . json_encode($path) . ",\n";
$ee .= '"fullPath":' . json_encode($fullPath) . ",\n";
$ee .= '"lastChanged":' . json_encode($lastChanged) . ",\n";
$ee .= '"msg":' . json_encode($msg) . ",\n";
$ee .= '"size":' . json_encode($size) . ",\n";
$ee .= '"host":' . json_encode($_SERVER['SERVER_NAME']) . ",\n";
$ee .= '"request":' . json_encode($_SERVER['REQUEST_URI']) . ",\n";
$ee .= '"https":' . json_encode($_SERVER['HTTPS']) . ",\n";
$ee .= '"exists":' . json_encode($exists) . ",\n";
$ee .= '"padtype":' . json_encode($padtype) . ",\n";
$ee .= '"fv":' . json_encode($fv) . ",\n";
$ee .= '"reload":' . json_encode($reload) . ",\n";
$ee .= '"content":' . json_encode($content) . ",\n";
if ($devserver) {
	$ee .= '"cwd":' . json_encode(getcwd()) . ",\n";
	$ee .= '"root":' . json_encode($_SERVER['DOCUMENT_ROOT']) . ",\n";
	//$ee .= '"webPath":' . json_encode(webPath("/abc")) . ",\n";
}
$ee .= '"end":true' . "\n";
if ($callback)
	$ee .= "})";
else
	$ee .= "}";
echo $ee;
?>
