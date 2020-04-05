<?php
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Thu, 1 Jan 1970 01:00:00 GMT"); // Date in the past
header('Content-type: application/json');

define('DB_HOST', 'tenmilliontruecom.fatcowmysql.com');
define('DB_NAME', 'pnx');
define('DB_USER', 'pnx');
define('DB_PASSWORD', 'wordasana399$');
$table = 'Log';

class Ot {};

$ot = !empty($_REQUEST['Data']) ? json_decode($_REQUEST['Data']) : new Ot() ;
$ot->result = false;
$ot->ip = $_SERVER["REMOTE_ADDR"];

$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

if (!$mysqli->connect_errno) {
    $ot->Data =  $mysqli->escape_string($ot->Data);
    $ot->queryResult = $mysqli->query("INSERT INTO `$table` (userId, item, utc, ip, data) VALUES ('$ot->UserId', '$ot->Item', $ot->Utc, '$ot->ip', '$ot->Data')");
    
    if ($ot->queryResult !== false)
        $ot->result = true;
    else
        $ot->error = $mysqli->error;

	$mysqli->close();
}

echo json_encode($ot);

/*
DROP TABLE IF EXISTS `Log`;
CREATE TABLE IF NOT EXISTS `Log` (
  `userId` varchar(60) NOT NULL,
  `item` varchar(40) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `utc` bigint(52) NOT NULL,
  `ip` varchar(15) NOT NULL,
  `data` text,
  KEY `item` (`item`),
  KEY `userId` (`userId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
*/
?>