<?php
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Thu, 1 Jan 1970 01:00:00 GMT"); // Date in the past
//error_reporting(E_ERROR | E_PARSE | E_CORE_ERROR);
//ini_set('log_errors', '1');
//ini_set('error_log', 'php_errors.txt');
//ini_set('display_errors', '1');

function Consume($uid, $item) {
    
    // Don't consume if user is a guest.
    if (substr($uid, 0, 2) == "GU")
        return;
    
    if (file_exists("App/db"))
        $fileName = "App/db/purchases/$uid.txt";
    else
        $fileName = "db/purchases/$uid.txt";
    
    class Ud {};
    
    $json = file_get_contents($fileName);
    
    if ($json === false)
    {
        error_log("Error opening file $fileName");
        return;
    }
    
    $ud = json_decode($json);

    if (empty($ud))
        $ud = new Ud();
    
    if (empty($ud->purchases))
        $ud->purchases = new Ud();

    if (empty($ud->purchases->$item))
        $ud->purchases->$item = new Ud();

    $cnt = empty($ud->purchases->$item->count) ? 0 : $ud->purchases->$item->count;
    $cnt = $cnt - 1;
    if ($cnt < 0) $cnt = 0;
    
    $ud->purchases->$item->count = $cnt;
    
    $result = @file_put_contents($fileName, json_encode($ud));
    if ($result === false)
    {
        error_log("Error writing to file $fileName");
    }
}

function Purchase($uid, $item, $status = "Completed", $date = -1, $count = -1, $txnId = "Unknown", $duplicate = false) {
    
    // Don't consume if user is a guest.
    if (substr($uid, 0, 2) == "GU")
        return false;
    
    if (file_exists("App/db")) {
        $dir = "App/db/purchases";
        $fileName = "$dir/$uid.txt";
	}
    else {
    	$dir = "db/purchases";
        $fileName = "$dir/$uid.txt";
	}
        
    if (!file_exists($dir))
    	mkdir($dir, 0777, true); 
    
    class Ud {};
    
    if (file_exists($fileName))
    {
        $json = file_get_contents($fileName);

        if ($json === false)
        {
            error_log("Error opening file $fileName");
            return false;
        }
        
        $ud = json_decode($json);
    }

    if (empty($ud))
        $ud = new Ud();
    
    if (empty($ud->purchases))
        $ud->purchases = new Ud();

    if (empty($ud->purchases->$item))
        $ud->purchases->$item = new Ud();

    if ($count >= 0)
        $cnt = $count;
    else
    {
        $cnt = empty($ud->purchases->$item->count) ? 0 : $ud->purchases->$item->count;
        if ($cnt < 0) $cnt = 0;
        $cnt = $cnt + 1;
    }
    $ud->purchases->$item->count = $cnt;
    
    if ($date >= 0)
        $ud->purchases->$item->date = $date;
    else
        $ud->purchases->$item->date = time() * 1000;

    $ud->purchases->$item->status = $status;
    $ud->purchases->$item->txnId = $txnId;
    if ($duplicate === true)
        $ud->purchases->$item->duplicate = true;
    
    $result = @file_put_contents($fileName, json_encode($ud));
    if ($result === false)
    {
        error_log("Error writing to file $fileName");
        return false;
    }
    return true;
}
?>