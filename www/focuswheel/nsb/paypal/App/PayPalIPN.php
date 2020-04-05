<?php
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Thu, 1 Jan 1970 01:00:00 GMT"); // Date in the past
//error_reporting(E_ERROR | E_PARSE | E_CORE_ERROR);
//ini_set('log_errors', '1');
//ini_set('error_log', 'php_errors.txt');
//ini_set('display_errors', '1');

// STEP 1: Read POST data

//$host = "https://www.paypal.com";
$host = "https://www.sandbox.paypal.com";

// reading posted data from directly from $_POST causes serialization 
// issues with array data in POST
// reading raw POST data from input stream instead. 
$raw_post_data = file_get_contents('php://input');
$raw_post_array = explode('&', $raw_post_data);
$myPost = array();
foreach ($raw_post_array as $keyval) {
    $keyval = explode ('=', $keyval);
    if (count($keyval) == 2)
        $myPost[$keyval[0]] = urldecode($keyval[1]);
}
// read the post from PayPal system and add 'cmd'
$req = 'cmd=_notify-validate';
if(function_exists('get_magic_quotes_gpc')) {
    $get_magic_quotes_exists = true;
} 
foreach ($myPost as $key => $value) {
    if($get_magic_quotes_exists == true && get_magic_quotes_gpc() == 1) { 
        $value = urlencode(stripslashes($value)); 
    } else {
        $value = urlencode($value);
    }
    $req .= "&$key=$value";
}


// STEP 2: Post IPN data back to paypal to validate

$ch = curl_init("$host/cgi-bin/webscr");
curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $req);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
curl_setopt($ch, CURLOPT_FORBID_REUSE, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Connection: Close'));

if( !($res = curl_exec($ch)) ) {
    error_log("Got " . curl_error($ch) . " when processing IPN data");
    curl_close($ch);
    exit;
}
curl_close($ch);


// STEP 3: Inspect IPN validation result and act accordingly

class Ts {};
$ts = new Ts();

// assign posted variables to a class structure
$ts->result = $res;
$ts->item_name = $_POST['item_name'];
$ts->item_number = $_POST['item_number'];
$ts->payment_status = $_POST['payment_status'];
$ts->payment_amount = $_POST['mc_gross'];
$ts->payment_currency = $_POST['mc_currency'];
$ts->txn_id = $_POST['txn_id'];
$ts->receiver_email = $_POST['receiver_email'];
$ts->payer_email = $_POST['payer_email'];
$ts->uid = $_POST['custom'];

// Record the transaction to db/transact/TXNID
// Record the purchase to db/purchases/USERID

if (strcmp ($res, "VERIFIED") == 0) {
    // check whether the payment_status is Completed and not Pending or Failed
    // check that txn_id has not been previously processed
    // check that receiver_email is your Primary PayPal email
    // check that payment_amount/payment_currency are correct
    // process payment
        
    $txfile = "$ts->txn_id.txt";
    
    $ts->duplicate = file_exists("db/completed/$txfile");
    
    if ($ts->payment_status == "Completed")
    {
        $dir = "db/completed";
        if (!file_exists($dir))
            mkdir($dir, 0777, true); 
        file_put_contents("$dir/$txfile", json_encode($ts));
    }
    else if ($ts->payment_status == "Pending")
    {
        $dir = "db/pending";
        if (!file_exists($dir))
            mkdir($dir, 0777, true); 
        file_put_contents("$dir/$txfile", json_encode($ts));
    }
    else
    {
        $dir = "db/failed";
        if (!file_exists($dir))
            mkdir($dir, 0777, true);
        file_put_contents("$dir/$txfile", json_encode($ts));
    }

    include_once("PayPalTransact.php");
    Purchase($ts->uid, $ts->item_number, $ts->payment_status, -1, -1, $ts->txn_id, $ts->duplicate);
    
    /*
    Now inside Purchase()
    if (!file_exists("db/purchases"))
        mkdir("db/purchases", 0777, true);
    
    $fileName = "db/purchases/$ts->uid.txt";
    $item = $ts->item_number;
    
    class Ud {};
    
    $ud = json_decode(file_get_contents($fileName));

    if (empty($ud))
        $ud = new Ud();
    
    if (empty($ud->purchases))
        $ud->purchases = new Ud();

    if (empty($ud->purchases->$item))
        $ud->purchases->$item = new Ud();

    $cnt = empty($ud->purchases->$item->count) ? 0 : $ud->purchases->$item->count;
    if ($ts->payment_status == "Completed")
    {
        if ($cnt < 0) $cnt = 0;
        $cnt = $cnt + 1;
        $ud->purchases->$item->date = time() * 1000;
    }
    $ud->purchases->$item->count = $cnt;
    $ud->purchases->$item->txnId = $ts->txn_id;
    $ud->purchases->$item->status = $ts->payment_status;
    if ($ts->duplicate === true)
        $ud->purchases->$item->duplicate = true;
    
    
    file_put_contents($fileName, json_encode($ud));
     */
    
} else if (strcmp ($res, "INVALID") == 0) {
    if (!file_exists("db/transact_failed"))
        mkdir("db/transact_failed", 0777, true);
    file_put_contents("db/transact_failed/$ts->txn_id.txt", json_encode($ts));
}
