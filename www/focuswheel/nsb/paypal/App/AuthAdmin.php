<?php
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Thu, 1 Jan 1970 01:00:00 GMT"); // Date in the past
header('Content-type: application/json');

class Ot {};

$ot = !empty($_REQUEST['Data']) ? json_decode($_REQUEST['Data']) : new Ot() ;
$passcode = trim(file_get_contents("AuthAdmin.txt"));

if ($ot->password === $passcode)
{
    $ot->result = true;
    $ot->msg = "valid credentials";
}
else
{
    $ot->result = false;
    $ot->msg = "invalid credentials";
}

echo json_encode($ot);
?>