<?php
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Thu, 1 Jan 1970 01:00:00 GMT"); // Date in the past
header('Content-type: application/json');

include_once("PayPalTransact.php");

class Ot {};

$ot = !empty($_REQUEST['Data']) ? json_decode($_REQUEST['Data']) : new Ot() ;

if ($ot->password == "Froggerlove1")
{
    $ot->result = Purchase($ot->id, $ot->item, $ot->status, $ot->date, $ot->count, $ot->txnId);
}
else
{
    $ot->result = false;
    $ot->msg = "invalid credentials";
}

echo json_encode($ot);
?>