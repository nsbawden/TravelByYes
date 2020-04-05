<?php
/*
UserCake Version: 2.0.2
http://usercake.com
*/
require_once("models/config.php");
require_once("models/header.php");

echo "
<body>
<script type='text/javascript'>
	var w = window.opener || window.parent;
	if (w && w.LoginFn) {
		w.LoginFn();
	}
	else {
		//alert('on account.php with no opener.LoginFn');
		window.location.href = 'user_settings.php';
	}
</script>
</body>
</html>";
?>
