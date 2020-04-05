
var GearData = {
	"#GearLeftHigh": "https://www.indiegogo.com/projects/travel-by-yes-wants-solar-panels",
	"#GearLeftLow": "blog.html",
	"#GearRightHigh": "http://store.playnexus.com",
	"#BigGear": "play-with-us.html",
	"#GearRightLow": "wahoozards.html"
};

var CloudData = [
	"homeship/cloudbacktop.png",
	"homeship/cloudbackmiddle.png",
	"homeship/cloudbackbottom.png",
	"homeship/cloudfronttop.png",
	"homeship/cloudfrontmiddle.png",
	"homeship/cloudfrontbottom.png"
];

var Clicks = {
	"#Basket": "http://www.playnexus.com/"
};

function setSpeed(n, s) {
 var el = jQuery(n);
 var r = parseInt(el.attr('data-speed'));
 var cc = el.attr('class').indexOf('spincc') >= 0 ? "spincc" : "spinc";
 s = (r * s) + 'ms';
 el.removeClass('spinc spincc');
 el.css('-webkit-animation-duration', s);
 el.css('-moz-animation-duration', s);
 el.css('-ms-animation-duration', s);
 el.css('animation-duration', s);
 //el.css('-webkit-animation-play-state', 'paused');
 //el.css('-webkit-animation-play-state', 'running');
 var x = el.css('-webkit-animation-duration');
 el.addClass(cc);
}

function gearSpeeds(s) {
	window.speed = s;
	for (var k in GearData) {
		setSpeed(k,s);
	}
}

function collectGears() {
	window.GearElements = [];
	for (var k in GearData) {
		var el = jQuery(document.getElementById(k.substr(1)));
		el.data("p", el.offset());
		window.GearElements[window.GearElements.length] = el;
	}
}

function debugCircle(x,y,r) {
	var el = jQuery("<svg style='position:absolute;top:0;left:0;width:2000px;height:3000px;' xmlns='http://www.w3.org/2000/svg'><circle cx='" + x + "' cy='" + y + "' r='" + r + "' fill='red'></svg>");
	el.appendTo(document.body);
}

function gearClick(e) {
	var xi = e.pageX;
	var yi = e.pageY;
	for (var i=0; i < GearElements.length; i++) {
		var el = GearElements[i];
		var r = el.width() / 2;
		var p = el.data("p");
		var cx = p.left + r;
		var cy = p.top + r;
		var is = Math.pow(xi-cx, 2) + Math.pow(yi-cy,2) < Math.pow(r,2);
		if (is) {
			console.log("clicked on " + el[0].id + " gear");
			//debugCircle(cx,cy,r);
			//el.click();
			location.href = GearData['#' + el[0].id];
			return;
		}
	}
}

// Moving clouds
					   
function myRand(n1,n2) {
 return Math.floor(Math.random() * (n2-n1)) + n1;
}

function nextCloud(url) {
	var i = myRand(0, CloudData.length-1);
	console.log("cloud=" + i);
	var nu = CloudData[i];
	if (nu == url) return nextCloud(url);
	return nu;
}

function doCloud(url, dly) {
 if (!dly) {
  setTimeout(function(){doCloud(url, true);}, myRand(200,600));
  return;
 }
 var isBack = url.indexOf("cloudback") > 0;
 var speed = isBack ? 30 : 25;
 var divHeight = jQuery("#HomeShip").height();
 var pos = myRand(150,divHeight-400);
 var winWidth = jQuery(window).width();
 var divWidth = jQuery("#HomeShip").width();
 var leftSide = 0 - jQuery("#HomeShip").offset().left;
 var rightSide = divWidth - (leftSide*2);
 //console.log("leftSide=" + leftSide + ", rightSide=" + rightSide);
 speed = (winWidth / 1024 * speed) + "s";
 var el = jQuery("<img/>").css({top:pos,left:rightSide,position:'absolute'});
 /*
 el.bind("load", function() {
         var cloudWidth = el.width();
         el.animate({left: leftSide-cloudWidth},{duration:20000,easing:'linear',complete: function() {
                    el.remove();
                    doCloud(url);
                    }});
         });
  */
 el.bind("load", function() {
         var cloudWidth = el.width();
         //el.addClass('cloud');
         el.css({
                "-webkit-transition": 'left ' + speed + ' linear',
                "-ms-transition": 'left ' + speed + ' linear',
                "-moz-transition": 'left ' + speed + ' linear',
                "-o-transition": 'left ' + speed + ' linear',
                "transition": 'left ' + speed + ' linear'
                })
         el.on('transitionend webkitTransitionEnd', function() {
               el.remove();
               url = nextCloud(url);
               doCloud(url);
               });
         el.css('left',leftSide-cloudWidth);
         });
 
 if (isBack)
  el.attr("src",url).prependTo("#HomeShip");
 else
  el.attr("src",url).prependTo("#GearClicks");
}

jQuery(function() {
       doCloud("homeship/cloudbacktop.png");
       //doCloud("homeship/cloudbackmiddle.png");
       //doCloud("homeship/cloudbackbottom.png");
       doCloud("homeship/cloudfronttop.png");
       //doCloud("homeship/cloudfrontmiddle.png");
       //doCloud("homeship/cloudfrontbottom.png");
});

// Setup and housekeeping

jQuery(function() {
	collectGears();
	jQuery("<div id='GearClicks' title='Click on a gear to go there!'/>").appendTo("#HomeShip");
	jQuery("<div id='Basket' title='Go to The Play Nexus'/>").appendTo("#HomeShip").click(function() {location.href = Clicks['#Basket']});
	jQuery("#GearClicks").click(gearClick);
	gearSpeeds(3);
	jQuery("#FBFeed").parent().parent().css("z-index", 10);
});


jQuery(document).keydown(
                       function(e) {
                       switch (e.which) {
                       case 38:
                       gearSpeeds(window.speed * .8);
                       break;
                       case 40:
                       gearSpeeds(window.speed * 1.2);
                       break;
                       }
                       e.preventDefault();
                       e.stopPropagation();
                       //console.log("speed="+window.speed);
                       });

