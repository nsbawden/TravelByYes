<?php

$include = array_merge($include, array(
    "plugins/pnx-tiles",
    "plugins/pnx-minions",
    "plugins/pnx-games",
    "themes/bare",
    ));

$exclude = array_merge($exclude, array(
    "tiles/","tmp/","db/",
    "log.txt","UrTenCounters.txt",
    ));

$extraPlugins = array_merge($extraPlugins, array(
    "plugins/wp-editor",
    "plugins/wordpress-importer",
    "plugins/quick-cache",
    "plugins/preserved-html-editor-markup",
    ));

?>
