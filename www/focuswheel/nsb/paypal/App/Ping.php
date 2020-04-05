<?php

// NOT IN USE ... using base/App/sql.myping.php instead

header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Thu, 1 Jan 1970 01:00:00 GMT"); // Date in the past
header('Content-type: application/json');

//include_once("db/ping/connection.php");
define('DB_HOST', 'tenmilliontruecom.fatcowmysql.com');
define('DB_NAME', 'pnx');
define('DB_USER', 'wrdvOyFpfbH');
define('DB_PASSWORD', 'OYmSxluVBZ');

class Ot {};

$ot = !empty($_REQUEST['Data']) ? json_decode($_REQUEST['Data']) : new Ot() ;
$ot->result = false;

$con = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);

if ($con) {
    $ot->Data = mysql_real_escape_string($ot->Data);
    $ot->mysql_select = mysql_select_db(DB_NAME, $con);
    $ot->mysql_query = mysql_query("INSERT INTO pnx_ping (UserId, Item, Utc, Data) VALUES ('$ot->UserId', '$ot->Item', $ot->Utc, '$ot->Data')");
    
    if ($ot->mysql_query !== false)
        $ot->result = true;
    else
        $ot->error = mysql_error();

    mysql_close($con);
}

echo json_encode($ot);

/*
DROP TABLE IF EXISTS `pnx_ping`;
CREATE TABLE IF NOT EXISTS `pnx_ping` (
  `UserId` varchar(40) NOT NULL,
  `Item` varchar(40) NOT NULL,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Utc` bigint(8) NOT NULL,
  `Data` varchar(256) NOT NULL,
  KEY `Item` (`Item`),
  KEY `UserId` (`UserId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
*/
?>