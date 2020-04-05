<?php
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Thu, 1 Jan 1970 01:00:00 GMT"); // Date in the past
header('Content-type: application/json');

define('DB_HOST', 'tenmilliontruecom.fatcowmysql.com');
define('DB_NAME', 'pnx');
define('DB_USER', 'pnx');
define('DB_PASSWORD', 'wordasana399$');

if (empty($_REQUEST['Data']))
{
	echo "{\"msg\":\"invalid input\",\"result\": false}";
	exit(0);	
}

$ot = json_decode($_REQUEST['Data']);
$ot->result = false;


if ($ot->nostore !== true) {
	$con = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);

	if ($con) {
	    $ot->Data = mysql_real_escape_string($ot->Data);
	    $ot->mysql_select = mysql_select_db(DB_NAME, $con);
	    $ot->mysql_query = mysql_query("INSERT INTO Ping (Project, UserId, Item, Utc, Data) VALUES ('$ot->Project', '$ot->UserId', '$ot->Item', $ot->Utc, '$ot->Data')");
	    
	    if ($ot->mysql_query !== false)
	        $ot->result = true;
	    else
	        $ot->error = mysql_error();

	    mysql_close($con);
	}
}
else {
	$ot->result = true;
}

if (! empty($ot->filetimes)) {
	foreach ($ot->filetimes as $file)
	{
		$ot->$file = @filemtime($file) * 1000;
	}
}

echo json_encode($ot);

/*
DROP TABLE IF EXISTS `Ping`;
CREATE TABLE IF NOT EXISTS `Ping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Project` varchar(40) NOT NULL,
  `UserId` varchar(40) NOT NULL,
  `Item` varchar(40) NOT NULL,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Utc` bigint(52) NOT NULL,
  `Data` text COMMENT 'json',
  PRIMARY KEY (`id`),
  KEY `Item` (`Item`),
  KEY `UserId` (`UserId`),
  KEY `Project` (`Project`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;
*/
?>