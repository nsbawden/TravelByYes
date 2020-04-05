<?php
/*
UserCake Version: 2.0.2
http://usercake.com
*/

define('DB_HOST', 'tenmilliontruecom.fatcowmysql.com');
define('DB_NAME', 'pnx');
define('DB_USER', 'pnx');
define('DB_PASSWORD', 'wordasana399$');

//Database Information
$db_host = DB_HOST; //Host address (most likely localhost)
$db_name = DB_NAME; //Name of Database
$db_user = DB_USER; //Name of database user
$db_pass = DB_PASSWORD; //Password for database user
$db_table_prefix = "pu_";

GLOBAL $errors;
GLOBAL $successes;

$errors = array();
$successes = array();

/* Create a new mysqli object with database connection parameters */
$mysqli = new mysqli($db_host, $db_user, $db_pass, $db_name);
GLOBAL $mysqli;

if(mysqli_connect_errno()) {
	echo "Connection Failed: " . mysqli_connect_errno();
	exit();
}

//Direct to install directory, if it exists
//if(is_dir("install/"))
//{
//	header("Location: install/");
//	die();
//}

?>