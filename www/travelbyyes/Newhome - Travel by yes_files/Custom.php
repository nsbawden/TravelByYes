// Custom Styles
// last time = 1404853128
// current time = 1404853128
// custom time = 1397411683
function jQuerySect() {
	if (!window.jQuery) {
		setTimeout(jQuerySect, 13);
		return;
	}
	
	function blogBy() {
		var els;
		if ((els = jQuery('.blog-title a')) && els.length == 0) {
			setTimeout(blogBy, 13);
			return;
		}
		
		els.each(function(i, el) {
			var t = jQuery(el);
			var s = t.html();
			s = s.replace(/\bby\b/gi, " by ");
			var ss = t.html().split(" by ");
			t.html(ss[0]);
			if (ss.length > 1) {
				var by = jQuery("<div class='byAuthor'/>").html(ss[ss.length-1]);
				t.append(by);
				var cc = t.closest(".blog-post").find(".blog-content");
				if (cc.length > 0)
				{
					cc.append(by.clone().addClass("byAuthorBottom"));
				}
			}
		});
	}
	blogBy();
	

	jQuery(function() {
		jQuery(".wsite-social-facebook").attr("title", "go to our Facebook page");
		jQuery(".wsite-social-twitter").attr("title", "find us on Twitter");
		jQuery(".wsite-social-mail").attr("title", "email us");
	});
};

jQuerySect();