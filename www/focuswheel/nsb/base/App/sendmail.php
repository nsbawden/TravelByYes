<?php

header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Thu, 1 Jan 1970 01:00:00 GMT"); // Date in the past
error_reporting(E_ERROR | E_PARSE | E_CORE_ERROR);
ini_set('log_errors', '1');
ini_set('error_log', 'php_error.log');
ini_set('display_errors', '1');

include_once('file.common.php');

// Allow input from env instead of GET
if (!$_GET && $_ENV['QUERY_STRING']) {
	$_GET = array();
	parse_str($_ENV['QUERY_STRING'], $_GET);
}

function stampOid($content) {
	global $to;
	include_once('lib.sql.php');
	sqlStdConnect();
	$row = sqlGet("SELECT oid FROM user WHERE email=" . qq($to));
	sqlDisconnect();
	if ($row['oid']) {
		$content = preg_replace('/@@oid@@/', $row['oid'], $content);
	}
	return $content;
}

function writeit($filename, $content, $mode) {
	return;
	$h = fopen($filename, $mode);
	if ($h) {
		flock($h, LOCK_EX);
		fwrite($h, $content);
		flock($h, LOCK_UN);
		fclose($h);
	}
}

function fullLogName($name) {
	return $name;
}

class Rq {};
$rq = new Rq();
$rq = !empty($_REQUEST['Data']) ? json_decode($_REQUEST['Data']) : new Rq() ;

// REQUIRED
$to = $rq->to;
$from = $rq->from;
$subject = $rq->subject;
$content = $rq->content;

// OPTIONAL
$parts = $rq->parts;
$textOnly = !empty($rq->textOnly) ? $rq->textOnly : 'THIS EMAIL REQUIRES HTML VIEWER';
$sendfile = $rq->sendfile;
$recipients = $rq->recipients; // File name of receipients list
$toAll = !empty($rq->toAll) ? $rq->toAll : false;
$callback = !empty($_REQUEST['callback']) ? $_REQUEST['callback'] : false;
$cc = $rq->cc;

// INTERNAL
$sentTo = array();
$logfilename = 'sendlog.txt';
$mailSent = FALSE;
$recipients = fullLogName($recipients);

// Security risk allows sending any file to anyone
//if ($sendfile) {
//	$content = file_get_contents($sendfile);
//}

autoHeader();

if (!$textOnly && file_exists('textonly.txt')) {
	$textOnly = file_get_contents('textonly.txt');
}

if ($toAll === true && $recipients && file_exists($recipients)) {
	$recip = file_get_contents($recipients);
	$toArr = explode(';', $recip);
    $rq->ToAllThese = $recip;
} else {
	$toArr = array($to);
    $rq->ToOnly = $to;
    if (!empty($cc))
    {
		$toArr = array_merge($toArr, explode(';', $cc));		
	}
	// Uncomment to test a bunch of sends
//	for ($i = 1;$i<100;$i++) {
//		$toArr[] = $to;
//	}

}

$contentSafe = $content;
//$content = stampOid($content);

// To force send to me uncomment this line
//$toArr[] = 'nsbawden@gmail.com'; // Appends this address to sending addresses

$boundry = '----=_CloudMail_' . md5(date('r', time()));
$nextpart = "--$boundry\r\n";
$endpart = "\r\n--$boundry--";

if (count($toArr) > 0 && $content && $subject) {
	$headers = $body = '';
	$headers .= "From: " . $from . "\r\n";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: multipart/alternative;\r\n";
	$headers .= "\tboundary=\"$boundry\"\r\n";
	$headers .= "X-Mailer: CYEPAD MAILER 1.1";

	$body .= $nextpart;
	$body .= "Content-Type: text/plain;\r\n";
	$body .= "\r\n";
	$body .= $textOnly . "\r\n";

	$body .= $nextpart;
	$body .= "Content-Type: text/html; charset=\"ISO-8859-1\"\r\n";
	//$body .= "Content-Transfer-Encoding: quoted-printable\r\n";
	$body .= "\r\n";
	$body .= $content . "\r\n";
    
    if (!empty($rq->parts)) foreach ($rq->parts as &$part)
    {
        $type = !empty($part->type) ? $part->type : "image/jpeg";
        $body .= $nextpart;
        $body .= "Content-Type: $type;\r\n";
        $body .= " name=\"$part->fileName\"\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n";
        $body .= "Content-ID: <$part->cid>\r\n";
        $body .= "Content-Disposition: inline;\r\n";
        $body .= " filename=\"$part->fileName\"\r\n";
        $body .= "\r\n";
        $body .= $part->base64 . "\r\n";
    }
    
	$body .= $endpart;

	for ($i = 0; $i < count($toArr); $i++) {
		$toThis = trim($toArr[$i]);
		// valid email must have at least 6 chars (as in a@b.tv)
		if (strlen($toThis) > 5) {
			$mailSent = mail($toThis, $subject, $body, $headers);
			$sentTo[] = $toThis;
            //				if ($mailSent === TRUE) myLog('SENT TO', $to);
            //				else  myLog('FAILED SENDING TO', $to);
		}
	}
}

$rq->result = $mailSent;
$rq->date = date('Y-m-d H:i:s T');
$rq->sentTo = print_r($sentTo, true);
$rq->headers = $headers;
$rq->body = substr($body, 0, 1000) . "..." . substr($body, -300);

$rq->body = "not echoing body today";
$rq->content = "not echoing content today";

// only echo back a small portion of the parts data
if (!empty($rq->parts)) foreach ($rq->parts as &$part)
{
    $part->base64 = substr($part->base64, 0, 20) . "..." . substr($part->base64, -20);
}

if ($callback)
	echo "$callback(" . json_encode($rq) . ")";
else
	echo json_encode($rq);
?>