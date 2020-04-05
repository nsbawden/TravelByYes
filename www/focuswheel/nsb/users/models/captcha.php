<?php
/*
UserCake Version: 2.0.2
http://usercake.com
*/
/*
session_start();

    $str = "";
    $length = 0;
    for ($i = 0; $i < 4; $i++) {
        // this numbers refer to numbers of the ascii table (small-caps)
        $str .= chr(rand(97, 122));
    }
    $_SESSION['xcaptcha'] = $str;

$imgX = 60;
$imgY = 20;
$image = imagecreatetruecolor(60, 20);

$backgr_col = imagecolorallocate($image, 238,239,239);
$border_col = imagecolorallocate($image, 208,208,208);
$text_col = imagecolorallocate($image, 46,60,31);

imagefilledrectangle($image, 0, 0, 60, 20, $backgr_col);
imagerectangle($image, 0, 0, 59, 19, $border_col);

$font = "VeraSe.ttf"; // it's a Bitstream font check www.gnome.org for more
//$font = "times";
$font_size = 10;
$angle = 0;
$box = imagettfbbox($font_size, $angle, $font, $str);
$x = (int)($imgX - $box[4]) / 2;
$y = (int)($imgY - $box[5]) / 2;
imagettftext($image, $font_size, $angle, $x, $y, $text_col, $font, $str);

header("Content-type: image/png");
imagepng($image);
imagedestroy ($image);
*/

session_start();
$md5_hash = md5(rand(0,999999999)); 
$security_code = substr($md5_hash, 25, 5);
$_SESSION['xcaptcha'] = $security_code;

/*    $security_code = "";
    $length = 0;
    for ($i = 0; $i < 8; $i++) {
        // this numbers refer to numbers of the ascii table (small-caps)
        if ($i == 4) $security_code .= " ";
        $security_code .= chr(rand(97, 122));
    }
$_SESSION['xcaptcha'] = $security_code;
*/

$width = 150;
$height = 30; 

$image = ImageCreate($width, $height);  
$white = ImageColorAllocate($image, 255, 255, 255);
$black = ImageColorAllocate($image, 0, 0, 0);
$grey = ImageColorAllocate($image, 200, 200, 200);

ImageFill($image, 0, 0, $white); 
ImageString($image, 10, 5, 0, $security_code, $black); 

header("Content-Type: image/png"); 
ImagePng($image);
ImageDestroy($image);

?>
