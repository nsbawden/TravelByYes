
window.PageMenu = {
	"Home": "index.html",
	"TBY": "tby.html",
	"yes wheel": "yes-wheel.html",
	"ur ten": "ur-ten-wheel.html",
	"focus wheel": "focus-wheel.html",
	"ho'oponopono wheel": "hopo-wheel.html"
	
};

jQuery(function() {
	if (location.href.indexOf("file://") != 0)
		return;
	var nv = jQuery("<div id='NavBar'/>").prependTo(document.body);
	for (var h in PageMenu)
	{
		jQuery("<a/>")
			.appendTo(nv)
			.attr("href", PageMenu[h])
			.html(h)
			;		
	}
	jQuery("<a href='javascript:ToolsCloseMe()'>X</a>")
		.appendTo(nv)
		;
});

function ToolsCloseMe() {
	top.PNFbWidget.Main.Close();
}