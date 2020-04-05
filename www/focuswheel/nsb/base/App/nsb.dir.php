<?php
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Thu, 1 Jan 1970 01:00:00 GMT"); // Date in the past
error_reporting(E_ERROR | E_PARSE | E_CORE_ERROR);
ini_set("display_errors","true");

include_once("file.common.php");
autoHeader();
//authenticate($validCredentials); // based on allowed folder list in $allowedPaths

$allowedPaths = array(
	'../../../../play/memes' => true,
	'../../../../../play/memes' => true,
);

$path = req('path', './');
$password = req('password');
$callbackName = req('callback');
$imagesizes = req('imagesizes', FALSE);
$ee = '';

$path = webPath($path);

// Only read from these paths
if ($allowedPaths[$path] !== true)
	authenticate("path not allowed $path");

if ($imagesizes == 'true') $imagesizes = TRUE;


//
// Get folder and file lists
//
$numdirs = 0;
$numfiles = 0;
$handle = opendir($path);
if ($handle) {
	while (false !== ($file = readdir($handle))) {
	$nm = $path.'/'.$file;
		if(!is_dir($nm)) {
			if (!is_link($nm) && substr($file,0,1) != '.') {
				$filearr[] = $file;
				$numfiles++;
			}
		}
		else {
			if (substr($file,0,1) != '.') {
				$dirarr[$numdirs] = $file;
				$numdirs++;
			}
		}
	}
	closedir($handle);
} else $handle = "FAILURE";

if ($numdirs > 1) sort($dirarr);
if ($numfiles > 1) sort($filearr);

// Collect file sizes and modification times
if ($numfiles > 0) for ($i = 0; $i < $numfiles; $i++) {
	$nm = $path.'/'.$filearr[$i];
	$sizearr[] = filesize($nm);
	$timearr[] = filemtime($nm);
	if ($imagesizes) $imagarr[] = getimagesize($nm);
}

// Build JSON object

$jdirs = $jfiles = $jsizes = $jtimes = $jimgsizes = '';

if ($numdirs > 0) for ($i = 0; $i < $numdirs; $i++) {
	if ($i!=0) $jdirs .= ",";
	$jdirs .= '"' . $dirarr[$i] . '"';
}
if ($numfiles > 0) for ($i = 0; $i < $numfiles; $i++) {
	if ($i!=0) {
		$jfiles .= ",";
		$jsizes .= ",";
		$jtimes .= ",";
		if ($imagesizes) $jimgsizes .= ",";
	}
	$jfiles .= '"' . $filearr[$i] . '"';
	$jsizes .= $sizearr[$i];
	$jtimes .= $timearr[$i];
	if ($imagesizes) $jimgsizes .= '"' . $imagarr[$i][0] . 'x' . $imagarr[$i][1] . '"';
}

$result = true;

if ($callback)
	$ee .= "$callback({\n";
else
	$ee .= "{\n";
$ee .= "\"result\": " . ($result ? 'true' : 'false') . ",\n";
$ee .= "\"handle\": " . json_encode($handle) . ",\n";
$ee .= "\"dirpath\": " . json_encode($path) . ",\n";
$ee .= "\"dircnt\": " . json_encode($numdirs) . ",\n";
$ee .= "\"filecnt\": " . json_encode($numfiles) . ",\n";
$ee .= "\"dirs\": ".'['.$jdirs.']'.",\n";
$ee .= "\"files\": ".'['.$jfiles.']'.",\n";
$ee .= "\"sizes\": ".'['.$jsizes.']'.",\n";
if ($imagesizes) $ee .= "\"imgsizes\": ".'['.$jimgsizes.']'.",\n";
$ee .= "\"times\": ".'['.$jtimes.']'.",\n";
if ($devserver) {
	$ee .= '"cwd":' . json_encode(getcwd()) . ",\n";
	$ee .= '"root":' . json_encode($_SERVER['DOCUMENT_ROOT']) . ",\n";
}
$ee .= '"end":true' . "\n";
if ($callback)
	$ee .= "})";
else
	$ee .= "}";
echo $ee;
?>