<?php
set_magic_quotes_runtime(0);

$docroot = $_SERVER['DOCUMENT_ROOT'];
$mirrorroot = $docroot . '/mirror';
$versionFile = '../@version.php';
$forceValidCredentials = FALSE;
$devPasscode = 'SuperBaby';
$appPath = 'App';
$dbPath = 'App/db';
$credentialFile = "credentials.php";


//include_once($versionFile);

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

function BumpVersion() {
	global $docroot,$fobver,$versionFile;
	$newVers = floatval($fobver) + 0.00001;
	$fobver = "$newVers";
	file_put_contents($versionFile, "<?PHP \$fobver = '$fobver'; ?>\n");
}

function ReversionLinks($content) {
	global $reload, $fobver;
	$size = strlen($content);

	// Verify and if needed update the fob version
	preg_match('/fv=xV([0-9.]+)Vx/', $content, $fva);
	$fv = $fva[1];
	if ($fv != $fobver) {
		$content = preg_replace('/fv=xV[0-9.]+Vx/', 'fv=xV'.$fobver.'Vx', $content);
		$reload = TRUE;
	}
	return $content;
}

function autoHeader()
{
	global $callback;
	if ($callback)
		header('Content-type: text/javascript');
	else
		header('Content-type: application/json');
}

function authenticate($valid)
{
	global $callback, $inactive_credentials, $password, $passcode;
	if ($valid !== TRUE)
	{
		if ($callback)
			$ee .= "$callback({\n";
		else
			$ee .= "{\n";
		$ee .= "\"result\": false,\n";
		$ee .= "\"valid\": \"$valid\",\n";
		$ee .= '"inactive": ' . ($inactive_credentials === TRUE ? 'true' : 'false') . ",\n";
		$ee .= '"devServer":' . json_encode($devserver) . ",\n";
		$ee .= "\"msg\": \"invalid credentials\",\n";
		$ee .= "\"password\": \"$password\",\n";
		//$ee .= "\"passcode\": \"$passcode\",\n";
		$ee .= "\"end\": true\n";
		if ($callback)
			$ee .= "})";
		else
			$ee .= "}";
		echo $ee;
		exit(0);
	}
}

$devserver = FALSE;
$servername = strtolower($_SERVER['SERVER_NAME']);

if ($servername == 'localhost')
	$devserver = TRUE;
else if ($servername == '192.168.1.19')
	$devserver = TRUE;
else if ($servername == 'love.playnexus.com')
	$devserver = TRUE;

if (file_exists($credentialFile)) include_once($credentialFile);
//else if (file_exists("../$credentialFile")) include_once("../$credentialFile");

$user = req('user','');
$password = md5(req('password',''));
$callback = req('callback');
$validCredentials = $fullValidCredentials = FALSE;
$inactive_credentials = $notactiveId ? TRUE : FALSE;

//if ($password === '0f30177af2c0c5ba8a550f43e0cf7c88'/*rainbowpanties*/)
//	$forceValidCredentials = TRUE;

/*
if ($forceValidCredentials || ($user && $password && $usercode && $user === $usercode && $password === $passcode)) {
	$validCredentials = TRUE;
	$fullValidCredentials = TRUE;
} else if ($passcode && $passcode === $password) {
	$validCredentials = TRUE;
} else {
	$passcode = FALSE;
	$validCredentials = FALSE;
}
*/

$sessionKey = sha1($srcPasscode . $_SERVER["REMOTE_ADDR"] . $_SERVER["HTTP_USER_AGENT"] . $_ENV['TZ']);

if ($sessionKey && $sessionKey === req('password'))
{
	$validCredentials = TRUE;
	$fullValidCredentials = TRUE;
}

?>