<?php
/*
UserCake Version: 2.0.2
http://usercake.com
*/
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Thu, 1 Jan 1970 01:00:00 GMT"); // Date in the past

require_once("models/config.php");
if (!securePage($_SERVER['PHP_SELF'])){die();}

//Prevent the user visiting the logged in page if he/she is already logged in
if(isUserLoggedIn()) { header("Location: account.php"); die(); }

//Forms posted
if(!empty($_POST))
{
	$errors = array();
	$successes = array();
	$fbid = trim($_POST["fbid"]);
	$email = trim($_POST["email"]);
	$username = trim($_POST["username"]);
	$displayname = trim($_POST["displayname"]);
	$password = trim($_POST["password"]);
	$confirm_pass = trim($_POST["passwordc"]);
	//$captcha = md5(trim($_POST["captcha"]));
	$captcha = strtolower(trim($_POST["captcha"]));
	
	
	if ($captcha !== $_SESSION['xcaptcha'])
	{
		$errors[] = lang("CAPTCHA_FAIL");
	}
	else
	{
		if(minMaxRange(5,25,$username))
		{
			$errors[] = lang("ACCOUNT_USER_CHAR_LIMIT",array(5,25));
		}
		if(!ctype_alnum($username)){
			$errors[] = lang("ACCOUNT_USER_INVALID_CHARACTERS");
		}
		
		$displayname = trim(preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $displayname)); // remove control characters
		if(minMaxRange(5,35,$displayname))
		{
			$errors[] = lang("ACCOUNT_DISPLAY_CHAR_LIMIT",array(5,35));
		}
		if (strlen(str_replace("\\\"", '', $displayname)) !== strlen($displayname))
		{			
			$errors[] = lang("ACCOUNT_DISPLAY_INVALID_CHARACTERS");
		}
		
		if(minMaxRange(8,50,$password) && minMaxRange(8,50,$confirm_pass))
		{
			$errors[] = lang("ACCOUNT_PASS_CHAR_LIMIT",array(8,50));
		}
		else if($password != $confirm_pass)
		{
			$errors[] = lang("ACCOUNT_PASS_MISMATCH");
		}
		if(!isValidEmail($email))
		{
			$errors[] = lang("ACCOUNT_INVALID_EMAIL");
		}
	}
	//End data validation
	if(count($errors) == 0)
	{	
		//Construct a user object
		$user = new User($username,$displayname,$password,$email,$fbid);
		
		//Checking this flag tells us whether there were any errors such as possible data duplication occured
		if(!$user->status)
		{
			if($user->username_taken) $errors[] = lang("ACCOUNT_USERNAME_IN_USE",array($username));
			if($user->displayname_taken) $errors[] = lang("ACCOUNT_DISPLAYNAME_IN_USE",array($displayname));
			if($user->email_taken) 	  $errors[] = lang("ACCOUNT_EMAIL_IN_USE",array($email));		
		}
		else
		{
			//Attempt to add the user to the database, carry out finishing  tasks like emailing the user (if required)
			if(!$user->userCakeAddUser())
			{
				if($user->mail_failure) $errors[] = lang("MAIL_ERROR");
				if($user->sql_failure)  $errors[] = lang("SQL_ERROR");
			}
		}
	}
	if(count($errors) == 0) {
		$successes[] = $user->success;
	}
}

require_once("models/header.php");
echo "
<body>
<div id='wrapper'>
<div id='top'><div id='logo'></div></div>
<div id='content'>
<h2>Register</h2>

<div id='left-nav'>";
//include("left-nav.php");
echo "
</div>

<div id='main'>";

echo resultBlock($errors,$successes);

echo "
<div id='regbox'>
<form name='newUser' action='".$_SERVER['PHP_SELF']."' method='post' autocomplete='off'>

<p>
<label>User Name</label>
<input type='text' name='username' value=\"".$username."\" autocomplete='off'/>
</p>
<p>
<label>Display Name</label>
<input type='text' name='displayname' value=\"".$displayname."\" autocomplete='off'/>
</p>
<p>
<label>Password</label>
<input type='password' name='password' value=\"".$password."\" autocomplete='off'/>
</p>
<p>
<label>Confirm</label>
<input type='password' name='passwordc' value=\"".$confirm_pass."\" autocomplete='off'/>
</p>
<p>
<label>Email</label>
<input type='text' name='email' value=\"".$email."\"/>
</p>
<p>
<img id='cpta' class='captchaImg' src='captcha/captcha.php'><a title='different word' href='javascript:;' onclick=\"document.getElementById('cpta').src = 'captcha/captcha.php?a=' + (new Date()).getTime()\"><img class='captchaRefresh' src='captcha/resources/images/refresh25.png'></a></a>
<label>Enter above word</label>
<input name='captcha' type='text' autocomplete='off'>
</p>
<p>
<label>&nbsp;</label>
<input type='submit' value='register'/>
</p>
<input id='fbid' type='hidden' name='fbid' value=''/>
</form>
<p class='moreChoices'><a href='login.php'>login</a></p>
</div>

</div>
<div id='bottom'></div>
</div>
<script type='text/javascript'>
	document.getElementById('fbid').value = top.FbApi.get_id();
</script>
</body>
</html>";
?>
