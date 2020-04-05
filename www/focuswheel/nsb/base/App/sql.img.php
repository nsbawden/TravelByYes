<?php
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Thu, 1 Jan 1970 01:00:00 GMT"); // Date in the past

define('DB_HOST', 'tenmilliontruecom.fatcowmysql.com');
define('DB_NAME', 'pnx');
define('DB_USER', 'pnx');
define('DB_PASSWORD', 'wordasana399$');

class Db {};

$db = new Db();
$db->result = false;
$mysqli = false;

$db->partitionKey = "Things";
$db->rowKey = $_REQUEST['popid'];

$cachePath = "db/hearts";
$touchFile = $cachePath . "/touch_$db->partitionKey.txt";

//
// CONNECT TO THE DATABASE
//
function MyConnect() {
	global $mysqli, $db;
	$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
	if ($mysqli->connect_errno) {
		$db->msg = "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
		echo json_encode($db);
		exit(0);
	}
}

function Htmlify($text) {
	$text = preg_replace('/\r\n|\n/', "<br>", $text);
	$text = preg_replace("/  /", "&nbsp; ", $text);
	$text = preg_replace("/  /", " &nbsp;", $text);
	return $text;
}

//
// SELECT
//

MyConnect();
if (empty($db->rowKey))
	$db->query = "SELECT * FROM `$db->partitionKey` ORDER BY utc_modified DESC LIMIT 100";
else
	$db->query = "SELECT * FROM `$db->partitionKey` WHERE id='$db->rowKey'";
$res = $mysqli->query($db->query);
if ($res === false) {
	$db->msg = "Failed to SELECT: ($mysqli->error)";
	echo json_encode($db);
	$mysqli->close();
	exit(0);
}
$list = array();
while ($row = $res->fetch_assoc()) {
	$row['utc_created'] = floatval($row['utc_created']); // Fix number
	$row['utc_modified'] = floatval($row['utc_modified']); // Fix number
	$row['thing'] = json_decode($row['thing']);
	$list[] = $row;
}
$db->rows = count($list);
$row = json_decode(json_encode($list[0]), false); // Turn array into an object
$db->content = $row;

// Update lone_views in local data

$row->lone_views = $row->lone_views + 1;

// Update lone_views atomically on server
//$utc = time() * 1000;
//if (!empty($db->rowKey)) {
//	$db->query2 = "UPDATE `$db->partitionKey` SET views = views + 1, utc_viewed = $utc  WHERE id='$db->rowKey'";
//	$mysqli->query($db->query2);
//	@touch($touchFile);
//}

$res->close();
$db->fromCache = false;
$db->result = true;

if ($mysqli)
	$mysqli->close();
	
$rowKey = $db->rowKey;
$tg = $row->thing;
$tg->short = strip_tags($tg->name);
$tg->short = preg_replace("/[\r\n]/", ' ', $tg->short);
$tg->short = preg_replace("/ +/", " ", $tg->short);
$tg->short = preg_replace('/"/', '', $tg->short);
//$tg->text = Htmlify($tg->text);
$tg->shortImg = "/files/pnx/App/db/grid/images/" . $tg->fileName;
$tg->longImg = "http://grids.playnexus.com" . $tg->shortImg . $tg->fileName;
$tg->page = "http://grids.playnexus.com/files/pnx/App/sql.img.php?popid=" . $db->rowKey;

?><!DOCTYPE html>
<html>
<head>
<title>play nexus grid</title>
<meta property="og:site_name" content="play nexus grid" />
<meta property="og:title" content="a play nexus grid" />
<meta property="og:description" content="<?= $tg->short ?>" />
<meta property="og:image" content="<?= $tg->longImg ?>" />
<meta property="og:url" content="<?= $tg->page ?>" />
<meta property="fb:app_id" content="452063474844272" /> 
<meta property="og:type" content="website" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<style>
body {
	background: white;
}
div.PageCenter {
	position: relative;
	text-align: center;
}
div.ThingWrapper {
	display: inline-block;
	position: relative;
	text-align: center;
	width: 800px;
	margin: 20px auto 0 auto;
}
img.ThingImg {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
}
a.CloseBtn {
	position: absolute;
	display: inline-block;
	left: 0;
	bottom: -34px;
	width: 100px;
	text-align: center;
	margin: 0 0 0 275px;
	color: white;
	text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
	cursor: pointer;
	font-size: 14pt;
	font-style: normal;
	font-weight: bold;
	z-index: 2;
	text-decoration: none;
	border: 1px solid grey;
	background: rgba(54,98,160,.95);
	border-radius: 3px;
}
a.CloseBtn:hover {
    color: rgb(248,245,210);
}
div.FBHeartShareBtn {
	display: inline-block;
	position: absolute;
	bottom: -29px;
	left: 50px;
	width: 65px;
	height: 22px;
	background: rgba(255,255,255,.5);
	font-size: 14pt;
	line-height: 14pt;
}
div.FBHeartShareBtn img {
    width: 100%;
    height: 100%;
}
#Footer {
	position: absolute;
	text-align: center;
	bottom: -1000px;
	width: 100%;
	padding: 50px 0;
}
</style>
</head>
<body class='short-header-page wsite-theme-light wsite-page-index'>
<div class="PageCenter">
	<div class="ThingWrapper">
		<img class="ThingImg" src="<?= $tg->shortImg ?>">
	</div>
</div>
<div id="Footer">
<a href="http://grids.playnexus.com">grids game</a>
<br>
<a href="http://www.playnexus.com">www.playnexus.com</a>
</div>
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=452063474844272";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
<pre style="display:none"><?= json_encode($db) ?></pre>
</body>
</html>
