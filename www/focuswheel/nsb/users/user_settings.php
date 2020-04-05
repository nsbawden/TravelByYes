<?php
/*
UserCake Version: 2.0.2
http://usercake.com
*/
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Thu, 1 Jan 1970 01:00:00 GMT"); // Date in the past

require_once("models/config.php");
if (!securePage($_SERVER['PHP_SELF'])){die();}

//Prevent the user visiting the logged in page if he is not logged in
if(!isUserLoggedIn()) { header("Location: login.php"); die(); }

if(!empty($_POST))
{
	$errors = array();
	$successes = array();
	$password = $_POST["password"];
	$password_new = $_POST["passwordc"];
	$password_confirm = $_POST["passwordcheck"];
	
	$errors = array();
	$email = $_POST["email"];
	$displayname = $_POST["displayname"];
	
	//Perform some validation
	//Feel free to edit / change as required
	
	//Confirm the hashes match before updating a users password
	$entered_pass = generateHash($password,$loggedInUser->hash_pw);
	
	if (trim($password) == ""){
		$errors[] = lang("ACCOUNT_SPECIFY_PASSWORD");
	}
	else if($entered_pass != $loggedInUser->hash_pw)
	{
		//No match
		$errors[] = lang("ACCOUNT_PASSWORD_INVALID");
	}	
	if($email != $loggedInUser->email)
	{
		if(trim($email) == "")
		{
			$errors[] = lang("ACCOUNT_SPECIFY_EMAIL");
		}
		else if(!isValidEmail($email))
		{
			$errors[] = lang("ACCOUNT_INVALID_EMAIL");
		}
		else if(emailExists($email))
		{
			$errors[] = lang("ACCOUNT_EMAIL_IN_USE", array($email));	
		}
		
		//End data validation
		if(count($errors) == 0)
		{
			$loggedInUser->updateEmail($email);
			$successes[] = lang("ACCOUNT_EMAIL_UPDATED");
		}
	}
	
	if ($displayname != $loggedInUser->displayname) {
		$displayname = trim(preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $displayname)); // remove control characters
		if($displayname == "")
		{
			$errors[] = lang("ACCOUNT_SPECIFY_DISPLAY");
		}
		if(minMaxRange(5,35,$displayname))
		{
			$errors[] = lang("ACCOUNT_DISPLAY_CHAR_LIMIT",array(5,35));
		}
		if (strlen(str_replace("\\\"", '', $displayname)) !== strlen($displayname))
		{			
			$errors[] = lang("ACCOUNT_DISPLAY_INVALID_CHARACTERS");
		}
		
		//End data validation
		if(count($errors) == 0)
		{
			updateDisplayName($loggedInUser->user_id, $displayname);
			$_SESSION['userCakeUser']->displayname = $displayname;
			$loggedInUser->displayname = $displayname;
			$successes[] = lang("ACCOUNT_DISPLAYNAME_UPDATED", array($displayname));
		}
	}
	
	if ($password_new != "" OR $password_confirm != "")
	{
		if(trim($password_new) == "")
		{
			$errors[] = lang("ACCOUNT_SPECIFY_NEW_PASSWORD");
		}
		else if(trim($password_confirm) == "")
		{
			$errors[] = lang("ACCOUNT_SPECIFY_CONFIRM_PASSWORD");
		}
		else if(minMaxRange(8,50,$password_new))
		{	
			$errors[] = lang("ACCOUNT_NEW_PASSWORD_LENGTH",array(8,50));
		}
		else if($password_new != $password_confirm)
		{
			$errors[] = lang("ACCOUNT_PASS_MISMATCH");
		}
		
		//End data validation
		if(count($errors) == 0)
		{
			//Also prevent updating if someone attempts to update with the same password
			$entered_pass_new = generateHash($password_new,$loggedInUser->hash_pw);
			
			if($entered_pass_new == $loggedInUser->hash_pw)
			{
				//Don't update, this fool is trying to update with the same password
				$errors[] = lang("ACCOUNT_PASSWORD_NOTHING_TO_UPDATE");
			}
			else
			{
				//This function will create the new hash and update the hash_pw property.
				$loggedInUser->updatePassword($password_new);
				$successes[] = lang("ACCOUNT_PASSWORD_UPDATED");
			}
		}
	}
	if (count($errors) == 0 AND count($successes) == 0) {
		$errors[] = lang("NOTHING_TO_UPDATE");
	}
	
	if (count($errors) == 0 AND count($successes) > 0) {
		header("Location: account.php"); die(); // Close the window and ping back to opener
	}
}

require_once("models/header.php");
echo "
<body>
<div id='wrapper'>
<div id='top'><div id='logo'></div></div>
<div id='content'>
<h2>".$loggedInUser->username."</h2>
<div id='left-nav'>";
// include("left-nav.php");

echo "
</div>
<div id='main'>";

echo resultBlock($errors,$successes);

echo "
<div id='regbox'>
<form name='updateAccount' action='".$_SERVER['PHP_SELF']."' method='post'>
<p>
<label>Password</label>
<input type='password' name='password' value=\"".$password."\"/>
</p>
<p>
<label>Display name</label>
<input type='text' name='displayname' value=\"".$loggedInUser->displayname."\" />
</p>
<p>
<label>Email</label>
<input type='text' name='email' value=\"".$loggedInUser->email."\" />
</p>
<p>
<label>New Pass</label>
<input type='password' name='passwordc' />
</p>
<p>
<label>Confirm Pass</label>
<input type='password' name='passwordcheck' />
</p>
<p>
<label>&nbsp;</label>
<input type='submit' value='update' class='submit' />
</p>
</form>
<p class='moreChoices'><a href='logout.php'>logout</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href='javascript:closeMe()'>close</a></p>
</div>
</div>
<div id='bottom'></div>
</div>
<script type='text/javascript'>
	function closeMe() {
		var w = window.opener || window.parent;
		if (w && w.LoginFn) {
			w.LoginFn();
			w.LoginFn = undefined;
		}
		window.close();
	}
//	window.onbeforeunload = function() {
//		if (window.opener && window.opener.LoginFn) {
//			window.opener.LoginFn();
//			window.opener.LoginFn = undefined;
//		}
//	}
</script>

</body>
</html>";

?>
