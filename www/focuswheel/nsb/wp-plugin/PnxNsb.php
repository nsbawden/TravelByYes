<?php
/*
$myDebug = ".debug";
global $mySessionVersion;

if (!isset($mySessionVersion)) $mySessionVersion = "v" . time();

Wordpress plugin maker; http://plugin.michael-simpson.com/
*/

add_shortcode("nsb", "pnxDollop");

function pnxDollop($atts, $content = '')
{
	$id       = $atts['id'];
	$tag      = Dfalt( $atts, 'tag', 'div');
	$tagClass = Dfalt( $atts, 'class', false);
	$tagStyle = Dfalt( $atts, 'style', false);
	$action   = Dfalt( $atts, 'action', false);
	$atts['content'] = $content;

	if ($tagClass) $tagClass = " class=\"$tagClass\"";
	if ($tagStyle) $tagStyle = " style=\"$tagStyle\"";
	$action = $action ? "$action(\"$id\");" : '';

	$nm = $id . "DaTa";
	$json = json_encode($atts);
	
	return <<<EOT
	<$tag id="$id"$tagClass$tagStyle></$tag>
	<script type="text/javascript">
		$nm = $json;
		$action
	</script>
EOT;
}

function Dfalt(&$arr, $n, $v)
{
	$arr[$n] = isset($arr[$n]) /*|| $arr[$n] === false*/ ? $arr[$n] : $v;
	return $arr[$n];
}

function Bfalt(&$arr, $n, $v)
{
	Dfalt( $arr, $n, $v);
	if($arr[$n] == 'true')
	$arr[$n] = true;
	else
	if($arr[$n] == 'false')
	$arr[$n] = false;
	return $arr[$n];
}

//
// Ajax Receiver
//

add_action( 'wp_ajax_pnx_receiver', 'pnx_receiver_callback' );
add_action( 'wp_ajax_nopriv_pnx_receiver', 'pnx_receiver_callback' );

function pnx_receiver_callback() {
	$ot = (object)array();
	$ot->result = false;
	$ot->command = "huh2";
	echo json_encode($ot);
	die(); // this is required to return a proper result
	global $wpdb; // this is how you get access to the database
	
	if ($_POST['pnx_receiver'] !== true)
		return;
	
	kses_remove_filters(); // Don't filter my custom tags

	$id = intval($_POST['id']);
	$content = isset($_POST['content']) ? $_POST['content'] : false;
	$command = $_POST['command'];
	$result = false;
	
	switch ($command)
	{
		case 'getPost':
			$post = get_post($id);
			echo(json_encode($post));
			break;
		case 'storePost':
			$result = wp_update_post(array(
				'ID' => $id,
				'post_content' => $content,
			));
		    echo "result=$result\r\n";
		    echo $content;
			break;
	}

	die(); // this is required to return a proper result
}

/**
 * Adds a box to the main column on the Page edit screens.
 */
function myplugin_add_meta_box() {
	add_meta_box(
		'SwitchPage',
		'Switch to Page',
		'myplugin_meta_box_callback',
		'page',
		'side',
		'high'
	);
}
add_action( 'add_meta_boxes', 'myplugin_add_meta_box' );

/**
 * Prints the box content.
 * 
 * @param WP_Post $post The object for the current post/page.
 */
function myplugin_meta_box_callback( $post ) {
	global $post;
	echo "<select id='EditChangePage'>";
	$pages = get_pages(); 
	foreach ( $pages as $page ) {
		if ($post->ID == $page->ID)
			$option = '<option value="' . $page->ID . '" selected>';
		else
			$option = '<option value="' . $page->ID . '">';
		$option .= $page->post_title;
		$option .= '</option>';
		echo $option;
	}
	echo "</select>";
	$postPath = admin_url("post.php");
	echo <<<EOT
	<script type="text/javascript">
		jQuery('#EditChangePage').on('change', function() {
			var post = jQuery('#EditChangePage').val();
			location.href = "$postPath?post=" + post + "&action=edit";
		});
	</script>
EOT;
}
