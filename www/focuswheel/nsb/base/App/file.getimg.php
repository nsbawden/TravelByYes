<?php
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Thu, 1 Jan 1970 01:00:00 GMT"); // Date in the past
header('Content-type: application/json');
error_reporting(E_ERROR | E_PARSE | E_CORE_ERROR);
ini_set('log_errors', '1');
ini_set('error_log', 'php_errors.txt');
ini_set('display_errors', '1');

if (file_exists('credentials.php')) include_once('credentials.php');

//
// $type = image/jpeg | image/png | image/gif
//

class Dd {};
$dd = new Dd();
$dd = !empty($_REQUEST['Data']) ? json_decode($_REQUEST['Data']) : new Dd() ;
$dd->result = false;
//$dd->url .= "xxx"; // To cause an error for testing

$passkey = sha1($srcPasscode . $_SERVER["REMOTE_ADDR"] . $_SERVER["HTTP_USER_AGENT"] . $_ENV['TZ']);
if (!empty($srcPasscode) && $passkey !== $db->password) {
	$db->msg = "invalid credentials";
	$db->content = "";
	echo json_encode($db);
	exit(0);
}

// $quality should be between 0 and 100
function data_uri($image, $mime, $quality=75) {
    try {
        ob_start();
        switch ($mime)
        {
            case "image/jpeg":
                imagejpeg($image, null, $quality); // Requires quality from 0 to 100
                break;
            case "image/png":
                imagepng($image, null, 9-round($quality/100*10)); // Converts to a quality from 9 to 0
                break;
            case "image/gif":
                imagegif($image);
                break;
        }
        $content = ob_get_clean();
        if ($content !== false && strlen($content) > 10)
            return "data:$mime;base64," . base64_encode($content);
    }
    catch (Exception $ex)
    {
    }
    return false;
}

try {
    $default_agent= "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11";
    $dd->myAgent = $_SERVER['HTTP_USER_AGENT'];
    
    $ch = curl_init(); 
    $timeout = 0; 
    curl_setopt ($ch, CURLOPT_URL, $dd->url); 
    curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
    curl_setopt ($ch, CURLINFO_HEADER_OUT, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    
    // Emulate browser
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_VERBOSE, true);
    curl_setopt($ch, CURLOPT_USERAGENT, $default_agent);
    
    // Getting binary data 
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
    curl_setopt($ch, CURLOPT_BINARYTRANSFER, 1); 

    $image = curl_exec($ch);
    
    $dd->error = curl_error($ch);
    $dd->requestHeaders = curl_getinfo($ch, CURLINFO_HEADER_OUT);
    $dd->responseHeaders = curl_getinfo($ch);
    
    $dd->size = strlen($image);
    
    curl_close($ch);
    
    if ($dd->size > 0)
    {
        $dd->image = data_uri(@imagecreatefromstring($image), empty($dd->type) ? "image/jpeg" : $dd->type);
        if ($dd->image === false)
        {
            $dd->content = $image;
            $dd->image = null;
        }
        else
            $dd->result = true;
    }
}
catch (Exception $ex)
{
    $dd->msg = $ex->getMessage();
}

echo json_encode($dd);

?>