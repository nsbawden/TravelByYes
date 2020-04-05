//! PnxBase.debug.js
//

(function($) {

Type.registerNamespace('PnxCommon');

////////////////////////////////////////////////////////////////////////////////
// GameCommon

GameCommon = function GameCommon() {
}
GameCommon.init = function GameCommon$init() {
    MyCss.addStyleTag('/files/pnx/css/custom.css');
    $('#logo' + ' a').attr('href', Config.playNexusUrl);
    $('div.wcustomhtml').css({ 'overflow-y': 'visible' });
    $.getScript('//ajax.googleapis.com/ajax/libs/jqueryui/1/jquery-ui.min.js');
}


////////////////////////////////////////////////////////////////////////////////
// PnxFooter

PnxFooter = function PnxFooter() {
    /// <field name="_css" type="String" static="true">
    /// </field>
}
PnxFooter.load = function PnxFooter$load() {
    MyCss.addStyleOnce((PnxFooter).get_fullName(), '\r\n#AllFooter {\r\n    text-align: center;\r\n}\r\n');
    $.get('sitemap.xml', function(data) {
        $('div.wsite-footer').empty();
        var xml = $(data);
        var list = '';
        var $enum1 = ss.IEnumerator.getEnumerator(xml.find('loc'));
        while ($enum1.moveNext()) {
            var domEl = $enum1.current;
            var url = $(domEl).text().replaceAll('play.playnexus.com', 'www.playnexus.com');
            var dsp = Uri.end(url);
            dsp = dsp.split('.')[0];
            if (dsp === 'index') {
                dsp = 'home';
            }
            if (dsp !== 'index') {
                if (!String.isNullOrEmpty(list)) {
                    list += ' &#8226; ';
                }
                list += String.format("<a href='{0}'>{1}</a>", url, dsp);
            }
        }
        $("<div id='AllFooter'/>").appendTo('div.wsite-footer').append(list);
    });
}


////////////////////////////////////////////////////////////////////////////////
// PnxSite

PnxSite = function PnxSite() {
    /// <field name="css" type="String" static="true">
    /// </field>
    /// <field name="construction" type="String" static="true">
    /// </field>
}
PnxSite.LoadToolbar = function PnxSite$LoadToolbar() {
    PnxCommon.NsbSite.nsbReady(function() {
        MyCss.addStyleOnce((PnxSite).get_fullName(), "\r\n#footer-wrap {\r\n    background-color: transparent !important;\r\n    border: none !important;\r\n}\r\n.wcustomhtml { overflow: visible !important; }\r\n.PnxHomeTool {\r\n    position: absolute;\r\n    top: 4px; \r\n    left: 20px; \r\n}\r\n.PnxDeleteBtn {\r\n    position: absolute;\r\n    width: 16px !important;\r\n    height: 16px !important;\r\n    margin: 0;\r\n    padding: 0;\r\n    cursor: pointer;\r\n    background: url('%ImgPath2%/closebtn16.png');\r\n}\r\n".replaceAll('%ImgPath2%', Config.imgPath2));
        $(function() {
            PnxSite.ConfigPage();
            var exclude = ['admin.playnexus.com'];
            if (!exclude.contains(window.location.hostname)) {
                PnxToolbar.load();
                PnxToolbar.addOrSetButton('play nexus home', 'PNLogoWithText.png', Config.playNexusUrl, 'PnxHomeTool');
                PnxToolbar.addOrSetButton('FbUserBtn', $('<div></div>'));
            }
            PnxCommon.FacebookCommon.load();
            BrowserUser.load();
        });
    });
}
PnxSite.ConfigPage = function PnxSite$ConfigPage() {
    Config.afterConfig(function() {
        MyCss.addStyleOnce((PnxSite).get_fullName(), "\r\n#footer-wrap {\r\n    background-color: transparent !important;\r\n    border: none !important;\r\n}\r\n.wcustomhtml { overflow: visible !important; }\r\n.PnxHomeTool {\r\n    position: absolute;\r\n    top: 4px; \r\n    left: 20px; \r\n}\r\n.PnxDeleteBtn {\r\n    position: absolute;\r\n    width: 16px !important;\r\n    height: 16px !important;\r\n    margin: 0;\r\n    padding: 0;\r\n    cursor: pointer;\r\n    background: url('%ImgPath2%/closebtn16.png');\r\n}\r\n".replaceAll('%ImgPath2%', Config.imgPath2));
        $('div.wcustomhtml').css({ 'overflow-y': 'visible' });
        $(document.body).css({ 'margin-top': '31px !important' });
        $('#logo a').attr('href', Config.playNexusUrl);
        $('div#footer-wrap>div>div>div.paragraph').html("<a href='http://www.playnexus.com/'>www.playnexus.com</a> | <a href='http://travelbyyes.com/'>www.travelbyyes.com</a>");
    });
}
PnxSite.LoadUser = function PnxSite$LoadUser() {
    Config.afterConfig(function() {
        FbApi.getAuthAw(SudoNsb.Await.get_asyncAw());
        BrowserUser.load();
    });
}
PnxSite.InstallUserEvents = function PnxSite$InstallUserEvents() {
    $(document).on('PxUserKnownEv', function() {
        Snsb.defer(function() {
            PnxToolbar.addOrSetButton('login', PnxToolbar.btn(String.format('logged into playnexus as {0}', BrowserUser.Session.user.displayname), 'nsb/base/images/user24.png', function() {
                SudoNsb.PxUser.settings();
            }));
        });
    });
    $(document).on('PxUserUnknownEv', function() {
        PnxToolbar.addOrSetButton('login', PnxToolbar.btn('login to playnexus', $("<span class='ToolBarBtn'>login</span>"), function() {
            SudoNsb.PxUser.settings();
        }));
        Snsb.set_masterId(Snsb.get_anonId());
    });
}
PnxSite._reWrite = function PnxSite$_reWrite(url, from, to) {
    /// <param name="url" type="String">
    /// </param>
    /// <param name="from" type="String">
    /// </param>
    /// <param name="to" type="String">
    /// </param>
    /// <returns type="String"></returns>
    if (!String.isNullOrEmpty(url)) {
        var rx = new RegExp('^(https?:\\/\\/)(' + PnxSite._regExpEscape(from) + ')(.*)$', 'i');
        url = url.replace(rx, '$1' + to + '$3');
    }
    return url;
}
PnxSite._regExpEscape = function PnxSite$_regExpEscape(txt) {
    /// <param name="txt" type="String">
    /// </param>
    /// <returns type="String"></returns>
    return txt.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
PnxSite.deleteBtn = function PnxSite$deleteBtn() {
    /// <returns type="jQueryObject"></returns>
    return $("<div class='PnxDeleteBtn'/>");
}


////////////////////////////////////////////////////////////////////////////////
// PnxToolbar

PnxToolbar = function PnxToolbar() {
    /// <field name="_css" type="String" static="true">
    /// </field>
    /// <field name="bar" type="jQueryObject" static="true">
    /// </field>
    /// <field name="wrapper" type="jQueryObject" static="true">
    /// </field>
    /// <field name="_buttons" type="Object" static="true">
    /// </field>
    /// <field name="_noBar" type="Boolean" static="true">
    /// </field>
}
PnxToolbar.get_height = function PnxToolbar$get_height() {
    /// <value type="Number" integer="true"></value>
    return 31;
}
PnxToolbar.load = function PnxToolbar$load() {
    MyCss.addStyleOnce((PnxToolbar).get_fullName(), '\r\n#PnxToolWrapper {\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 31px;\r\n    border: none;\r\n    margin: 0;\r\n    padding: 0;\r\n    z-index: 200;\r\n}\r\n#PnxToolBack {\r\n    width: 100%;\r\n    height: 31px;\r\n    margin: 0;\r\n    padding: 3px 0;\r\n    border-bottom: 1px solid rgba(0,0,0,.05);\r\n    background: #F5F5F5;\r\n    text-align: right;\r\n    cursor: default;\r\n}\r\n#PnxToolbar {\r\n    height: 24px;\r\n    margin: 0;\r\n    padding: 0 30px 0 0;\r\n    cursor: default;\r\n}\r\n.PnxToolBtnBox {\r\n    display: inline-block;\r\n    height: 24px;\r\n    padding: 0;\r\n    margin: 0 4px;\r\n    line-height: 24px;\r\n    vertical-align: top;\r\n}\r\n.PnxToolFace {\r\n    height: 24px;\r\n    padding: 0;\r\n    margin: 0;\r\n}\r\n.PnxToolFace img.PnxToolBtn {\r\n    height: 24px;\r\n}\r\n.PnxToolFace a {\r\n    display: inline-block;\r\n    vertical-align: top;\r\n    padding: 0;\r\n    margin: 0;\r\n    height: 100%;\r\n    border-radius: 4px;\r\n}\r\n.PnxToolFace a:hover {\r\n    background: #E5E5E5;\r\n}\r\n.ToolBarBtn {\r\n    display: block;\r\n    padding: 0 10px;\r\n    border-radius: 4px;\r\n    margin: 0;\r\n    height: 24px;\r\n    font-size: 12px;\r\n    font-family: arial, sans-serif;\r\n    color: #FFF;\r\n    background: #808080;\r\n    border: none;\r\n    box-sizing: border-box;\r\n    line-height: 24px;\r\n}\r\n.ToolBarSpinner {\r\n    width: 24px;\r\n    height: 24px;\r\n}\r\n');
    Snsb.defer(function() {
        PnxToolbar._addToolbar();
    });
    PnxToolbar._noBar = false;
}
PnxToolbar._addToolbar = function PnxToolbar$_addToolbar() {
    PnxToolbar.wrapper = $("<div id='PnxToolWrapper'><div id='PnxToolBack'></div></div>").prependTo('body');
    PnxToolbar.bar = $("<div id='PnxToolbar'/>").appendTo('#PnxToolBack');
    Snsb.defer(function() {
        PnxToolbar.bar.hide();
    });
    Snsb.defer(function() {
        PnxToolbar.bar.show();
    }, 500);
}
PnxToolbar.btn = function PnxToolbar$btn(title, src, fn, classNames) {
    /// <param name="title" type="String">
    /// </param>
    /// <param name="src" type="String">
    /// </param>
    /// <param name="fn" type="Function">
    /// </param>
    /// <param name="classNames" type="String">
    /// </param>
    /// <returns type="jQueryObject"></returns>
    classNames = classNames || '';
    var face = (typeof(src) === 'string') ? $("<img class='PnxToolBtn' src='" + ((src.indexOf('/') >= 0) ? src : Uri.join(Config.imgPath2, src)) + "'>") : src;
    var btn = $("<div><a href='javascript:;' title=\"" + title + '"></a></div>').addClass(classNames);
    btn.find('a').click(fn).append(face);
    return btn;
}
PnxToolbar.addOrSetButton = function PnxToolbar$addOrSetButton(title, src, url, classNames) {
    /// <summary>
    /// Adds or replaces the button.
    /// </summary>
    /// <param name="title" type="String">
    /// The title which is also the button id.
    /// </param>
    /// <param name="src" type="String">
    /// The SRC.
    /// </param>
    /// <param name="url" type="String">
    /// The URL.
    /// </param>
    /// <param name="classNames" type="String">
    /// The class names.
    /// </param>
    if (PnxToolbar._noBar) {
        return;
    }
    var btn;
    var cns;
    if (typeof(src) === 'string' && typeof(url) === 'string') {
        cns = classNames;
        src = (src.indexOf('/') >= 0) ? src : Uri.join(Config.imgPath2, src);
        btn = $("<div><a href='" + url + "' title='" + title + "'><img class='PnxToolBtn' src='" + src + "'></a></div>");
    }
    else if (typeof(src) === 'string') {
        cns = classNames;
        src = (src.indexOf('/') >= 0) ? src : Uri.join(Config.imgPath2, src);
        btn = $("<div><a href='javascript:;' title='" + title + "'><img class='PnxToolBtn' src='" + src + "'></a></div>");
        btn.find('a').click(url);
    }
    else {
        btn = src;
        cns = url;
    }
    new SudoNsb.Await().waitDx(function() {
        return $('#PnxToolWrapper').length > 0;
    }).addDx(function() {
        if (PnxToolbar._buttons[title] != null) {
            PnxToolbar._buttons[title].empty().append(btn);
            return;
        }
        var div = $("<div class='PnxToolBtnBox'/>").appendTo(PnxToolbar.bar);
        if (cns != null) {
            div.addClass(cns);
        }
        btn.addClass('PnxToolFace').appendTo(div);
        PnxToolbar._buttons[title] = div;
    }).commit();
}
PnxToolbar.removeButton = function PnxToolbar$removeButton(id) {
    /// <param name="id" type="String">
    /// </param>
    var btn = PnxToolbar._buttons[id];
    if (btn != null) {
        btn.remove();
        delete PnxToolbar._buttons[id];
    }
}
PnxToolbar.spinner = function PnxToolbar$spinner(start) {
    /// <param name="start" type="Boolean">
    /// </param>
    if (start) {
        PnxToolbar.addOrSetButton('spinner', $("<img class='ToolBarSpinner' src='nsb/base/images/BubbleSpinner32.gif'/>"));
    }
    else {
        PnxToolbar.addOrSetButton('spinner', $("<div class='ToolBarSpinner'/>"));
    }
}


////////////////////////////////////////////////////////////////////////////////
// PnxCommon.NsbSite

PnxCommon.NsbSite = function PnxCommon_NsbSite() {
    /// <field name="_ready" type="Boolean" static="true">
    /// </field>
}
PnxCommon.NsbSite.nsbTestReady = function PnxCommon_NsbSite$nsbTestReady() {
    /// <returns type="Boolean"></returns>
    if (!FbApi.initialized) {
        return false;
    }
    return true;
}
PnxCommon.NsbSite.nsbReady = function PnxCommon_NsbSite$nsbReady(fn) {
    /// <param name="fn" type="Function">
    /// </param>
    PnxCommon.NsbSite.ready(fn, null);
}
PnxCommon.NsbSite.ready = function PnxCommon_NsbSite$ready(fn, testReady) {
    /// <param name="fn" type="Function">
    /// </param>
    /// <param name="testReady" type="System.Func`1">
    /// </param>
    if (PnxCommon.NsbSite._ready) {
        window.$ = window.jQuery;
        Snsb.defer(fn);
        return;
    }
    if (!window.jQuery || typeof(window.jQuery) !== 'function') {
        Snsb.defer(function() {
            PnxCommon.NsbSite.ready(fn, testReady);
        });
        return;
    }
    if (testReady != null && testReady()) {
        Snsb.defer(function() {
            PnxCommon.NsbSite.ready(fn, testReady);
        });
        return;
    }
    window.$ = window.jQuery;
    PnxCommon.NsbSite._ready = true;
    Snsb.defer(function() {
        window.$ = window.jQuery;
        fn();
    });
}
PnxCommon.NsbSite.readyAw = function PnxCommon_NsbSite$readyAw(awp) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    PnxCommon.NsbSite.ready(function() {
        awp.done();
    }, null);
}


////////////////////////////////////////////////////////////////////////////////
// PnxCommon.FacebookCommon

PnxCommon.FacebookCommon = function PnxCommon_FacebookCommon() {
    /// <field name="_css" type="String" static="true">
    /// </field>
    /// <field name="fbButtonId" type="String" static="true">
    /// </field>
}
PnxCommon.FacebookCommon.load = function PnxCommon_FacebookCommon$load() {
    MyCss.addStyleOnce((PnxCommon.FacebookCommon).get_fullName(), "\r\ndiv.FBUser { \r\n    height: 24px;\r\n    min-width: 24px;\r\n    padding: 0;\r\n    background: #3b5998;\r\n    border-radius: 4px;\r\n}\r\nimg.FBPict {\r\n    height: 24px;\r\n    width: 24px;\r\n    vertical-align: top;\r\n    border-radius: 4px;\r\n}\r\nspan.FBUserName {\r\n    padding: 0 6px;\r\n    font-family: 'lucida grande', tahoma, verdana, arial, sans-serif;\r\n    font-size: 11px;\r\n    line-height: 24px;\r\n    vertical-align: middle;\r\n    color: white;\r\n}\r\ndiv.FBUser.ignoreFb span.FBUserName {\r\n    padding: 0;\r\n}\r\n");
    $(document).on('AuthChangeEv.FbApi', function() {
        if (!FbApi.ignoreFacebook) {
            BrowserUser.clearUserCache();
            BrowserUser.reloadPage();
        }
    });
    new SudoNsb.Await().addAw(FbApi.getAuthAw).addFn(PnxCommon.FacebookCommon.addFbUserToPage).commit();
}
PnxCommon.FacebookCommon.addFbUserToPage = function PnxCommon_FacebookCommon$addFbUserToPage() {
    if (!FbApi.get_isConnected()) {
        PnxToolbar.removeButton('FbUserBtn');
        return;
    }
    var btn = $("<div class='FBUser' title='logged into Facebook'><img class='FBPict' src='https://graph.facebook.com/me/picture?access_token=" + FbApi.get_accessToken() + "'><span class='FBUserName'></span></div>");
    if (FbApi.ignoreFacebook) {
        btn.addClass('ignoreFb');
    }
    PnxToolbar.addOrSetButton('FbUserBtn', btn);
    var awx = new SudoNsb.Await().addAw(BrowserUser.waitSessionLockAw);
    if (!FbApi.ignoreFacebook) {
        awx.addDx(function() {
            btn.find('.FBUserName').html(FbApi.get_authResponse().name);
            btn.attr('title', String.format('logged into Facebook as {0}', FbApi.get_authResponse().name));
        });
    }
    awx.addAw(FbApi.getUserAw, FbApi.get_id());
    if (!FbApi.ignoreFacebook) {
        awx.addDx(function() {
            btn.find('.FBUserName').html(FbApi.get_fbData().name);
            btn.attr('title', String.format('logged into Facebook as {0}', FbApi.get_fbData().name));
        });
    }
    awx.commit();
}
PnxCommon.FacebookCommon.fbShareBtn = function PnxCommon_FacebookCommon$fbShareBtn(id, face) {
    /// <param name="id" type="String">
    /// </param>
    /// <param name="face" type="String">
    /// </param>
    /// <returns type="jQueryObject"></returns>
    var url = Uri.addPair('https://www.facebook.com/sharer/sharer.php', 'u', Uri.addPair(Uri.join(Config.hostUrl, '/files/pnx/App/sql.img.php'), 'popid', id));
    return $("<a href='#'/>").html(face).attr('title', 'Share on Facebook').click(function() {
        var scrollTop = $(document.body).scrollTop();
        window.open(url, 'facebook-share-dialog', 'width=626,height=436');
        Snsb.defer(function() {
            $(document.body).scrollTop(scrollTop);
        });
    });
}
PnxCommon.FacebookCommon.fbLikeBtn = function PnxCommon_FacebookCommon$fbLikeBtn(id) {
    /// <param name="id" type="String">
    /// </param>
    /// <returns type="String"></returns>
    return "<div class='fb-like' data-href='" + Uri.addPair(Uri.join(Config.hostUrl, Config.get_appPath(), 'gladheart.php'), 'popid', id) + "' data-send='false' data-width='450' data-show-faces='false'></div>";
}


Type.registerNamespace('SudoNsb');

////////////////////////////////////////////////////////////////////////////////
// SudoNsb.TipSide

SudoNsb.TipSide = function() { 
    /// <field name="left" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="right" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="top" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="bottom" type="Number" integer="true" static="true">
    /// </field>
};
SudoNsb.TipSide.prototype = {
    left: 0, 
    right: 1, 
    top: 2, 
    bottom: 3
}
SudoNsb.TipSide.registerEnum('SudoNsb.TipSide', false);


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.Dom

SudoNsb.Dom = function SudoNsb_Dom() {
    /// <field name="afterScrollTopEv" type="String" static="true">
    /// </field>
    /// <field name="afterScrollBottomEv" type="String" static="true">
    /// </field>
}
SudoNsb.Dom.unFocus = function SudoNsb_Dom$unFocus() {
    $(String.format("<input type='text' style='position:absolute;top:{0}px;left:-1000px;'/>", document.body.scrollTop)).appendTo('body').click().focus().remove();
}
SudoNsb.Dom.scrollInViewAw = function SudoNsb_Dom$scrollInViewAw(awp, el) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    /// <param name="el" type="jQueryObject">
    /// </param>
    if (el == null) {
        awp.done();
        return;
    }
    var wh = SudoNsb.Dom.windowHeight();
    var wt = SudoNsb.Dom.documentScrollTop();
    var wb = wt + wh;
    var et = el.offset().top;
    var eb = et + el.outerHeight();
    if (et < wt) {
        new SudoNsb.Await().addAw(SudoNsb.Dom.scrollToPosAw, Math.max(et - 5, 0)).addDx(function() {
            $(document).trigger('AfterScrollTopEv');
        }).commit(awp);
    }
    else if (eb > wb) {
        new SudoNsb.Await().addAw(SudoNsb.Dom.scrollToPosAw, Math.min(eb - wh + 5, et)).addDx(function() {
            $(document).trigger('AfterScrollBottomEv');
        }).commit(awp);
    }
    else {
        awp.done();
    }
}
SudoNsb.Dom.scrollToPosAw = function SudoNsb_Dom$scrollToPosAw(awp, y) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    /// <param name="y" type="Number" integer="true">
    /// </param>
    var once = false;
    $('body,html,document').animate({ scrollTop: y }, 300, 'swing', function() {
        if (!once) {
            once = true;
            awp.done();
        }
    });
}
SudoNsb.Dom.windowHeight = function SudoNsb_Dom$windowHeight() {
    /// <returns type="Number" integer="true"></returns>
    return SudoNsb.Dom._fFilterResults((ss.isValue(window.self.innerHeight)) ? window.self.innerHeight : 0, (ss.isValue(document.documentElement)) ? document.documentElement.clientHeight : 0, (ss.isValue(document.body)) ? document.body.clientHeight : 0);
}
SudoNsb.Dom.documentScrollTop = function SudoNsb_Dom$documentScrollTop() {
    /// <returns type="Number" integer="true"></returns>
    return SudoNsb.Dom._fFilterResults((ss.isValue(window.self.pageYOffset)) ? window.self.pageYOffset : 0, (ss.isValue(document.documentElement)) ? document.documentElement.scrollTop : 0, (ss.isValue(document.body)) ? document.body.scrollTop : 0);
}
SudoNsb.Dom._fFilterResults = function SudoNsb_Dom$_fFilterResults(nWin, nDocel, nBody) {
    /// <param name="nWin" type="Number" integer="true">
    /// </param>
    /// <param name="nDocel" type="Number" integer="true">
    /// </param>
    /// <param name="nBody" type="Number" integer="true">
    /// </param>
    /// <returns type="Number" integer="true"></returns>
    var n_result = nWin ? nWin : 0; if (nDocel && (!n_result || (n_result > nDocel))) n_result = nDocel;;
    return nBody && (!n_result || (n_result > nBody)) ? nBody : n_result;;
}
SudoNsb.Dom.rotate = function SudoNsb_Dom$rotate(el, angle) {
    /// <param name="el" type="jQueryObject">
    /// </param>
    /// <param name="angle" type="Number">
    /// </param>
    var str = 'rotate(' + angle + 'deg)';
    var stls = el[0].style;
    if ('-webkit-transform' in stls || 'webkitTransform' in stls) {
        el.css('-webkit-transform', str);
    }
    else if ('MozTransform' in stls || '-moz-transform' in stls || 'mozTransform' in stls) {
        el.css('-moz-transform', str);
    }
    else if ('-ms-transform' in stls || 'msTransform' in stls) {
        el.css('-ms-transform', str);
    }
    else if ('-o-transform' in stls || 'oTransform' in stls) {
        el.css('-o-transform', str);
    }
    else if ('transform' in stls) {
        el.css('transform', str);
    }
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.Metric

SudoNsb.Metric = function SudoNsb_Metric() {
    /// <field name="width" type="Number">
    /// </field>
    /// <field name="height" type="Number">
    /// </field>
    SudoNsb.Metric.initializeBase(this);
}
SudoNsb.Metric.prototype = {
    width: 0,
    height: 0
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.Pos

SudoNsb.Pos = function SudoNsb_Pos() {
    /// <field name="top" type="Number">
    /// </field>
    /// <field name="left" type="Number">
    /// </field>
}
SudoNsb.Pos.prototype = {
    top: 0,
    left: 0
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.Dim

SudoNsb.Dim = function SudoNsb_Dim() {
    /// <field name="width" type="Number">
    /// </field>
    /// <field name="height" type="Number">
    /// </field>
}
SudoNsb.Dim.prototype = {
    width: 0,
    height: 0
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.PxUser

SudoNsb.PxUser = function SudoNsb_PxUser() {
    /// <field name="_css" type="String" static="true">
    /// </field>
    /// <field name="loginWinName" type="String" static="true">
    /// </field>
    /// <field name="windowFeatures" type="String" static="true">
    /// </field>
    /// <field name="_loginWin" type="WindowInstance" static="true">
    /// </field>
    /// <field name="_thisUrl" type="String" static="true">
    /// </field>
    /// <field name="_iFrameEl" type="jQueryObject" static="true">
    /// </field>
    /// <field name="_title" type="Object" static="true">
    /// </field>
    /// <field name="userLoggedInEv" type="String" static="true">
    /// </field>
    /// <field name="userLoggedOutEv" type="String" static="true">
    /// </field>
}
SudoNsb.PxUser.get_isLoggedIn = function SudoNsb_PxUser$get_isLoggedIn() {
    /// <value type="Boolean"></value>
    return BrowserUser.Session.userId != null;
}
SudoNsb.PxUser.get_loginUrl = function SudoNsb_PxUser$get_loginUrl() {
    /// <value type="String"></value>
    return Uri.join(Config.sessionPath, 'login.php');
}
SudoNsb.PxUser.get_settingsUrl = function SudoNsb_PxUser$get_settingsUrl() {
    /// <value type="String"></value>
    return Uri.join(Config.sessionPath, 'user_settings.php');
}
SudoNsb.PxUser.tryLogin = function SudoNsb_PxUser$tryLogin(fn) {
    /// <param name="fn" type="System.Action`1">
    /// </param>
    fn = fn || function() {
    };
    if (BrowserUser.Session.userId == null) {
        SudoNsb.PxUser.login(fn);
    }
    else {
        fn(true);
    }
}
SudoNsb.PxUser.login = function SudoNsb_PxUser$login(fn, title) {
    /// <param name="fn" type="System.Action`1">
    /// </param>
    /// <param name="title" type="String">
    /// </param>
    SudoNsb.PxUser._title = title || '';
    fn = (typeof(fn) == 'function') ? fn : function() {
    };
    SudoNsb.PxUser._thisUrl = SudoNsb.PxUser.get_loginUrl();
    SudoNsb.PxUser._loginSub(fn);
}
SudoNsb.PxUser.settings = function SudoNsb_PxUser$settings() {
    SudoNsb.PxUser._thisUrl = SudoNsb.PxUser.get_settingsUrl();
    SudoNsb.PxUser._title = '';
    SudoNsb.PxUser._loginSub(function() {
    });
}
SudoNsb.PxUser._loginSub = function SudoNsb_PxUser$_loginSub(fn) {
    /// <param name="fn" type="System.Action`1">
    /// </param>
    SudoNsb.PxUser.close();
    var wasLoggedIn = BrowserUser.Session.user != null;
    var lgFn = function() {
        new SudoNsb.Await().addAw(BrowserUser.reloadSessionAw).addDx(function() {
            if (BrowserUser.Session.user != null) {
                if (!wasLoggedIn) {
                    $(document).trigger('PxUserLoggedIn');
                }
                fn(true);
            }
            else {
                if (wasLoggedIn) {
                    $(document).trigger('PxUserLoggedOut');
                }
                fn(false);
            }
        }).commit();
    };
    SudoNsb.PxUser._openIFrame(function() {
        SudoNsb.PxUser.close();
        delete window.self.LoginFn;
        delete window.self.LoginWin;
        lgFn();
    });
    BrowserUser.reloadSessionAw(SudoNsb.Await.get_asyncAw());
}
SudoNsb.PxUser._openWin = function SudoNsb_PxUser$_openWin(fn) {
    /// <param name="fn" type="Function">
    /// </param>
    SudoNsb.PxUser._loginWin = window.open(SudoNsb.PxUser._thisUrl || SudoNsb.PxUser.get_loginUrl(), SudoNsb.PxUser.loginWinName, SudoNsb.PxUser.windowFeatures + String.format(',top={0},left={1}', SudoNsb.PxUser.posTop() + 50, SudoNsb.PxUser.posLeft() + 50));
    window.LoginWin = SudoNsb.PxUser._loginWin;
    if (fn != null) {
        window.self['LoginFn'] = fn;
    }
    Snsb.defer(function() {
        SudoNsb.PxUser._loginWin.focus();
    }, 300);
}
SudoNsb.PxUser._openIFrame = function SudoNsb_PxUser$_openIFrame(fn) {
    /// <param name="fn" type="Function">
    /// </param>
    if (Snsb.isEmpty(SudoNsb.PxUser._title)) {
        var tx = $("<a class='CloseLoginFrame' title='close'>\u2715</a>").click(function() {
            SudoNsb.PxUser.close();
        });
        SudoNsb.PxUser._title = tx;
    }
    else if (typeof(SudoNsb.PxUser._title) === 'string') {
        SudoNsb.PxUser._title = $(String.format('<span>{0}</span>', SudoNsb.PxUser._title));
    }
    Surface.hider(true);
    SudoNsb.PxUser._iFrameEl = $("<div class='LoginDiv AboveHider'><label></label><iframe class='LoginIFrame' frameborder='none'></iframe></div>").appendTo(document.body);
    $('label', SudoNsb.PxUser._iFrameEl).append(SudoNsb.PxUser._title);
    var iFrame = SudoNsb.PxUser._iFrameEl.find('iframe');
    iFrame.attr('src', SudoNsb.PxUser._thisUrl || SudoNsb.PxUser.get_loginUrl());
    var iFrameWin = iFrame[0].contentWindow;
    Snsb.defer(function() {
        iFrameWin.opener = window.self;
    });
    if (fn != null) {
        window.self['LoginFn'] = fn;
    }
}
SudoNsb.PxUser.close = function SudoNsb_PxUser$close() {
    if (SudoNsb.PxUser._loginWin != null) {
        SudoNsb.PxUser._loginWin.close();
    }
    SudoNsb.PxUser._loginWin = null;
    if (SudoNsb.PxUser._iFrameEl != null) {
        SudoNsb.PxUser._iFrameEl.remove();
        SudoNsb.PxUser._iFrameEl = null;
        Surface.hider(false);
    }
}
SudoNsb.PxUser.posTop = function SudoNsb_PxUser$posTop() {
    /// <returns type="Number" integer="true"></returns>
    return parseInt(window.screenY || window.screenTop || 0);
}
SudoNsb.PxUser.posLeft = function SudoNsb_PxUser$posLeft() {
    /// <returns type="Number" integer="true"></returns>
    return parseInt(window.screenX || window.screenLeft || 0);
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.SqlThingData

SudoNsb.SqlThingData = function SudoNsb_SqlThingData() {
    /// <field name="alsoField" type="String" static="true">
    /// </field>
    /// <field name="moreField" type="String" static="true">
    /// </field>
    /// <field name="also" type="Array">
    /// </field>
    /// <field name="fromLocal" type="Boolean">
    /// </field>
    /// <field name="id" type="String">
    /// </field>
    /// <field name="isa" type="String">
    /// </field>
    /// <field name="more" type="Array">
    /// </field>
    /// <field name="second" type="String">
    /// </field>
    /// <field name="secret" type="Boolean">
    /// </field>
    /// <field name="thing" type="Object">
    /// </field>
    /// <field name="third" type="String">
    /// </field>
    /// <field name="topic" type="String">
    /// </field>
    /// <field name="unsaved" type="Boolean">
    /// </field>
    /// <field name="userId" type="String">
    /// </field>
    /// <field name="utc_created" type="Number">
    /// </field>
    /// <field name="utc_modified" type="Number">
    /// </field>
    this.id = Snsb.get_newGuid();
    this.thing = {};
    this.topic = this.second = this.third = '';
    this.userId = Snsb.get_masterId();
}
SudoNsb.SqlThingData.prototype = {
    also: null,
    fromLocal: false,
    id: null,
    isa: null,
    more: null,
    second: null,
    secret: false,
    thing: null,
    third: null,
    topic: null,
    unsaved: false,
    userId: null,
    utc_created: 0,
    utc_modified: 0,
    
    get_topicPath: function SudoNsb_SqlThingData$get_topicPath() {
        /// <value type="String"></value>
        return '/' + this.topic + ((this.second) ? '/' + this.second : '') + ((this.third) ? '/' + this.third : '');
    },
    
    Topic: function SudoNsb_SqlThingData$Topic(_topic, _more, _other) {
        /// <param name="_topic" type="String">
        /// </param>
        /// <param name="_more" type="String">
        /// </param>
        /// <param name="_other" type="String">
        /// </param>
        /// <returns type="SudoNsb.SqlThingData"></returns>
        this.topic = _topic;
        this.second = _more || '';
        this.third = _other || '';
        return this;
    },
    
    Secret: function SudoNsb_SqlThingData$Secret(_secret) {
        /// <param name="_secret" type="Boolean">
        /// </param>
        /// <returns type="SudoNsb.SqlThingData"></returns>
        this.secret = _secret;
        return this;
    },
    
    Thing: function SudoNsb_SqlThingData$Thing(_thing) {
        /// <param name="_thing" type="Object">
        /// </param>
        /// <returns type="SudoNsb.SqlThingData"></returns>
        this.thing = _thing;
        if (this.thing != null) {
            this.isa = Type.getInstanceType(this.thing).get_fullName();
        }
        else {
            this.isa = '';
        }
        Rx.typeClass(this.thing);
        return this;
    },
    
    Id: function SudoNsb_SqlThingData$Id(_id) {
        /// <param name="_id" type="String">
        /// </param>
        /// <returns type="SudoNsb.SqlThingData"></returns>
        this.id = _id || this.id;
        return this;
    },
    
    OnScreen: function SudoNsb_SqlThingData$OnScreen(os) {
        /// <param name="os" type="OnScreen">
        /// </param>
        /// <returns type="SudoNsb.SqlThingData"></returns>
        if (this.thing == null) {
            debugger;
        }
        this.thing.onScreen = os;
        return this;
    },
    
    Isa: function SudoNsb_SqlThingData$Isa(_type) {
        /// <param name="_type" type="Type">
        /// </param>
        /// <returns type="SudoNsb.SqlThingData"></returns>
        if (Type.canCast(_type, Type)) {
            this.isa = _type.get_fullName();
        }
        else {
            ss.Debug.assert((_type).charAt(0) === '/' || (_type).charAt(0) === '|', 'isa non-type must start with / or |');
            this.isa = _type;
        }
        return this;
    }
}


////////////////////////////////////////////////////////////////////////////////
// SqlThings

SqlThings = function SqlThings() {
    /// <field name="loginErrEw" type="String" static="true">
    /// </field>
    /// <field name="thingKey" type="String" static="true">
    /// </field>
    /// <field name="sqlReturnKey" type="String" static="true">
    /// </field>
    /// <field name="dataResultKey" type="String" static="true">
    /// </field>
    /// <field name="ignoreSessionLock" type="Boolean" static="true">
    /// </field>
    /// <field name="_isLoading" type="Boolean" static="true">
    /// </field>
    /// <field name="_defaultResult" type="Object" static="true">
    /// </field>
    /// <field name="_loginErrEvReg" type="Boolean" static="true">
    /// </field>
}
SqlThings.get_thingUrl = function SqlThings$get_thingUrl() {
    /// <value type="String"></value>
    return Uri.join(Config.get_appPath(), 'sql.things.php');
}
SqlThings.fromType = function SqlThings$fromType(td) {
    /// <param name="td" type="SudoNsb.SqlThingData">
    /// </param>
    /// <returns type="Object"></returns>
    return Rx.reClass(td.thing) || {};
}
SqlThings.fromResult = function SqlThings$fromResult(list, tp) {
    /// <summary>
    /// Gets a restored object from the first item in a SqlThings result.
    /// Requires the type as the second argument so that upon failure a new object can be created.
    /// Example:
    /// Clipboard cb = (Clipboard) SqlThings.FromResult(aw.Result, typeof(Clipboard));
    /// </summary>
    /// <param name="list" type="Object">
    /// SqlThingData list
    /// </param>
    /// <param name="tp" type="Type">
    /// The expected object type
    /// </param>
    /// <returns type="Object"></returns>
    var tl = list;
    if (tl == null || tl[0] == null || tl[0].thing == null) {
        return eval('new ' + tp.get_fullName());
    }
    return SqlThings.fromType(tl[0]);
}
SqlThings.fromResultOrNull = function SqlThings$fromResultOrNull(list, tp) {
    /// <summary>
    /// Gets a restored object from the first item in a SqlThings result or null.
    /// Requires the type to do type checking on the result.
    /// Example:
    /// Clipboard cb = (Clipboard) SqlThings.FromResultOr Null(aw.Result, typeof(Clipboard));
    /// </summary>
    /// <param name="list" type="Object">
    /// SqlThingData list
    /// </param>
    /// <param name="tp" type="Type">
    /// The expected object type
    /// </param>
    /// <returns type="Object"></returns>
    var tl = list;
    if (tl == null || tl[0] == null || tl[0].thing == null) {
        return null;
    }
    var rr = SqlThings.fromType(tl[0]);
    return (Type.getInstanceType(rr).get_fullName() === tp.get_fullName()) ? rr : null;
}
SqlThings.listFromResult = function SqlThings$listFromResult(list, tp) {
    /// <param name="list" type="Object">
    /// </param>
    /// <param name="tp" type="Type">
    /// </param>
    /// <returns type="Object"></returns>
    var tl = list;
    if (tl == null || tl[0] == null || tl[0].thing == null) {
        return [eval('new ' + tp.get_fullName())];
    }
    var ls = [];
    var $enum1 = ss.IEnumerator.getEnumerator(tl);
    while ($enum1.moveNext()) {
        var itm = $enum1.current;
        ls.add(SqlThings.fromType(itm));
    }
    return ls;
}
SqlThings.resultWrapper = function SqlThings$resultWrapper(list) {
    /// <param name="list" type="Object">
    /// </param>
    /// <returns type="SudoNsb.SqlThingData"></returns>
    var tl = list;
    return (tl == null || tl[0] == null) ? new SudoNsb.SqlThingData() : tl[0];
}
SqlThings.thingAt = function SqlThings$thingAt(list, idx) {
    /// <param name="list" type="Array">
    /// </param>
    /// <param name="idx" type="Number" integer="true">
    /// </param>
    /// <returns type="Object"></returns>
    return SqlThings.fromType(list[idx]);
}
SqlThings.alsoIdList = function SqlThings$alsoIdList(ids) {
    /// <param name="ids" type="Array">
    /// </param>
    /// <returns type="Array"></returns>
    var al = [];
    if ($.isArray(ids)) {
        var $enum1 = ss.IEnumerator.getEnumerator(ids);
        while ($enum1.moveNext()) {
            var id = $enum1.current;
            al.add('(' + id + ')');
        }
        return al;
    }
    var d = ids;
    var $dict2 = d;
    for (var $key3 in $dict2) {
        var p = { key: $key3, value: $dict2[$key3] };
        al.add('(' + p.key + ')');
    }
    return al;
}
SqlThings.storeIdTopic = function SqlThings$storeIdTopic(topic, thing, secret, id) {
    /// <summary>
    /// Stores a thing by topic.
    /// </summary>
    /// <param name="topic" type="String">
    /// The topic.
    /// </param>
    /// <param name="thing" type="Object">
    /// The thing.
    /// </param>
    /// <param name="secret" type="Boolean">
    /// Make this secret.
    /// </param>
    /// <param name="id" type="String">
    /// The thing id or null.
    /// </param>
    var td = new SudoNsb.SqlThingData();
    td.topic = topic;
    td.thing = thing;
    td.secret = secret;
    td.id = id || td.id;
    SqlThings.storeThingAw(SudoNsb.Await.get_asyncAw(), td);
}
SqlThings.storeIdTopicAw = function SqlThings$storeIdTopicAw(awp, topic, thing, secret, id) {
    /// <summary>
    /// Stores a thing by topic synchronosly.
    /// </summary>
    /// <param name="awp" type="SudoNsb.Await">
    /// The awp.
    /// </param>
    /// <param name="topic" type="String">
    /// The topic.
    /// </param>
    /// <param name="thing" type="Object">
    /// The thing.
    /// </param>
    /// <param name="secret" type="Boolean">
    /// Make this thing secret.
    /// </param>
    /// <param name="id" type="String">
    /// The thing id or null.
    /// </param>
    var td = new SudoNsb.SqlThingData();
    td.topic = topic;
    td.thing = thing;
    td.secret = secret;
    td.id = id || td.id;
    SqlThings.storeThingAw(awp, td);
}
SqlThings.storeThing = function SqlThings$storeThing(td) {
    /// <param name="td" type="SudoNsb.SqlThingData">
    /// </param>
    SqlThings.storeThingAw(SudoNsb.Await.get_asyncAw(), td);
}
SqlThings.storeThingAw = function SqlThings$storeThingAw(awp, td) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    /// <param name="td" type="SudoNsb.SqlThingData">
    /// </param>
    if (!(Type.canCast(td, SudoNsb.SqlThingData))) {
        td = $.extend(new SudoNsb.SqlThingData(), td);
    }
    td.utc_modified = Date.get_now().getTime();
    td.isa = Type.getInstanceType(td.thing).get_fullName();
    if (td.also == null) {
        delete td.also;
    }
    awp.set_item('TheThing', td);
    var awx = new SudoNsb.Await();
    if (!SqlThings.ignoreSessionLock) {
        awx.addAw(BrowserUser.waitSessionLockAw);
    }
    awx.addDl(function(aw) {
        var more = td.more;
        delete td.more;
        SqlThings.rawTransactAw(aw, { userId: Snsb.get_masterId(), secret: td.secret, id: td.id, topic: td.topic }, 'insert', td);
        if (more != null) {
            td.more = more;
        }
    }).addDx(function(aw) {
        aw.set_result(aw.get_ajaxResult());
    }).commit(awp);
}
SqlThings.retrieveTopicsAw = function SqlThings$retrieveTopicsAw(awp, topic, userId, secret) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    /// <param name="topic" type="String">
    /// </param>
    /// <param name="userId" type="String">
    /// </param>
    /// <param name="secret" type="Boolean">
    /// </param>
    if (SqlThings._isLoading) {
        Snsb.defer(function() {
            SqlThings.retrieveTopicsAw(awp, topic, userId, secret);
        }, 13);
        return;
    }
    SqlThings._isLoading = true;
    new SudoNsb.Await().addAw(BrowserUser.waitSessionLockAw).addDl(function(aw) {
        var keys = { topic: topic, userId: userId, secret: secret };
        SqlThings.rawTransactAw(aw, keys, 'selectByTopic');
    }).addDx(function(aw) {
        if (aw.get_result() != null) {
            var idx = 0;
            var tdl = aw.get_result();
            var $enum1 = ss.IEnumerator.getEnumerator(tdl);
            while ($enum1.moveNext()) {
                var thing = $enum1.current;
                tdl[idx++] = $.extend(new SudoNsb.SqlThingData(), thing);
            }
            aw.set_result(tdl);
        }
        SqlThings._isLoading = false;
    }).always(function() {
        SqlThings._isLoading = false;
    }).commit(awp);
}
SqlThings.retrieveThingsAw = function SqlThings$retrieveThingsAw(awp, id, userId) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    /// <param name="id" type="String">
    /// </param>
    /// <param name="userId" type="String">
    /// </param>
    if (SqlThings._isLoading) {
        Snsb.defer(function() {
            SqlThings.retrieveThingsAw(awp, id, userId);
        }, 13);
        return;
    }
    SqlThings._isLoading = true;
    new SudoNsb.Await().addAw(BrowserUser.waitSessionLockAw).addDl(function(aw) {
        var keys = { id: id, userId: userId, is: 0 };
        if (id != null) {
            SqlThings.rawTransactAw(aw, keys, 'selectById');
        }
        else if (userId != null) {
            SqlThings.rawTransactAw(aw, keys, 'selectByUser');
        }
    }).addDx(function(aw) {
        if (aw.get_result() != null) {
            var idx = 0;
            var tdl = aw.get_result();
            var $enum1 = ss.IEnumerator.getEnumerator(tdl);
            while ($enum1.moveNext()) {
                var thing = $enum1.current;
                tdl[idx++] = $.extend(new SudoNsb.SqlThingData(), thing);
            }
            aw.set_result(tdl);
        }
    }).always(function() {
        SqlThings._isLoading = false;
    }).commit(awp);
}
SqlThings.searchThingsAw = function SqlThings$searchThingsAw(awp, search) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    /// <param name="search" type="String">
    /// </param>
    if (SqlThings._isLoading) {
        Snsb.defer(function() {
            SqlThings.searchThingsAw(awp, search);
        }, 13);
        return;
    }
    SqlThings._isLoading = true;
    new SudoNsb.Await().addAw(BrowserUser.waitSessionLockAw).addDl(function(aw) {
        var keys = { search: search, userId: Snsb.get_masterId() };
        SqlThings.rawTransactAw(aw, keys, 'selectBySearch');
    }).always(function() {
        SqlThings._isLoading = false;
    }).commit(awp);
}
SqlThings.removeThing = function SqlThings$removeThing(mpx) {
    /// <param name="mpx" type="Object">
    /// </param>
    SqlThings.removeThingAw(SudoNsb.Await.get_asyncAw(), mpx);
}
SqlThings.removeThingAw = function SqlThings$removeThingAw(awp, mpx) {
    /// <summary>
    /// Removes the thing.
    /// </summary>
    /// <param name="awp" type="SudoNsb.Await">
    /// The awp.
    /// </param>
    /// <param name="mpx" type="Object">
    /// The thing or a thing id string.
    /// </param>
    var id;
    if (typeof(mpx) === 'string') {
        id = mpx;
    }
    else {
        id = (mpx).id;
    }
    new SudoNsb.Await().addAw(BrowserUser.waitSessionLockAw).addDl(function(aw) {
        var keys = { id: id, topic: (mpx).topic, userId: Snsb.get_masterId() };
        SqlThings.rawTransactAw(aw, keys, 'deleteById');
    }).addDx(function(aw) {
        aw.set_result((aw.get_item('SqlReturn'))['result']);
    }).commit(awp);
}
SqlThings.registerLoginErrEvent = function SqlThings$registerLoginErrEvent(fn) {
    /// <param name="fn" type="System.Action`2">
    /// </param>
    SqlThings._loginErrEvReg = true;
    $(document).on('LoginErr.SqlThings', fn);
}
SqlThings.rawLocalTransactEw = function SqlThings$rawLocalTransactEw(e, eo) {
    /// <param name="e" type="jQueryEvent">
    /// </param>
    /// <param name="eo" type="Object">
    /// </param>
    var topic = eo.keys['topic'] || eo.td.topic;
    if (eo.keys['transact'] === 'insert') {
        SudoNsb.Storage.setSession(topic, eo.td, true);
        eo.db.result = eo.awp.set_ajaxResult(true);
    }
    else if (eo.keys['transact'] === 'selectByTopic') {
        var tda = [SudoNsb.Storage.getSession(topic, true)];
        eo.awp.set_result(eo.db.content = tda);
        eo.db.result = eo.awp.set_ajaxResult(!Snsb.isEmpty(tda) && !Snsb.isEmpty(tda[0]));
        if (eo.db.result) {
            tda[0].fromLocal = true;
        }
    }
    else {
        debugger;
    }
    eo.awp.done();
}
SqlThings.rawTransactAw = function SqlThings$rawTransactAw(awp, keys, transact, content) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    /// <param name="keys" type="Object">
    /// </param>
    /// <param name="transact" type="String">
    /// </param>
    /// <param name="content" type="Object">
    /// </param>
    keys['transact'] = transact;
    if (keys['secret'] && (keys['userId'] == null || keys['userId'] === 'null' || String.isNullOrEmpty(keys['userId']))) {
        debugger;
    }
    if (transact !== 'insert' && keys['secret'] && !Snsb.get_isPxUser()) {
        var errEv = [{ awp: awp, db: {}, keys: keys, td: content }];
        $(document).trigger('LoginErr.SqlThings', errEv);
        return;
    }
    var awx = new SudoNsb.Await();
    if (!SqlThings.ignoreSessionLock) {
        awx.addAw(BrowserUser.waitSessionLockAw);
    }
    awx.addDl(function(aw) {
        var opts = {};
        opts.url = SqlThings.get_thingUrl();
        opts.type = 'POST';
        opts.dataType = 'json';
        opts.data = SudoNsb.Files.data({ keys: keys, debug: Config.debug, content64: ((content != null) ? SudoNsb.Encoder.encode64(SqlThings.serialize(content)) : '') });
        opts.success = function(data, textStatus, request) {
            var db = (data || SqlThings._defaultResult);
            aw.set_item('SqlReturn', db);
            aw.set_ajaxResult(db.result);
            if (!db.result) {
                if (db.loginError && SqlThings._loginErrEvReg) {
                    var redo = function(aw2) {
                        SqlThings.rawTransactAw(aw2, keys, transact, content);
                    };
                    var errEv = [{ redo: redo, awp: aw, db: db, keys: keys, td: content }];
                    $(document).trigger('LoginErr.SqlThings', errEv);
                    return;
                }
                aw.done(SqlThings._defaultResult['content']);
            }
            else {
                aw.done(db.content);
            }
        };
        opts.error = function(request, textStatus, error) {
            aw.set_item('SqlReturn', SqlThings._defaultResult);
            Inform.error('SqlThings.RawTransactAw {0}, {1}', textStatus, error.message);
            aw.set_ajaxResult(false);
            aw.done(SqlThings._defaultResult['content']);
        };
        if (!Config.offline) {
            $.ajax(opts);
        }
        else {
            aw.done(SqlThings._defaultResult['content']);
        }
    }).commit(awp);
}
SqlThings.serialize = function SqlThings$serialize(content) {
    /// <param name="content" type="Object">
    /// </param>
    /// <returns type="String"></returns>
    return Rx.publicStringify(content);
}
SqlThings.deserialize = function SqlThings$deserialize(content) {
    /// <param name="content" type="String">
    /// </param>
    /// <returns type="Object"></returns>
    if (Snsb.isEmpty(content)) {
        return null;
    }
    try {
        return Rx.reClass((typeof(content) === 'string') ? JSON.parse(content) : content);
    }
    catch (ex) {
        debugger;
        Inform.error('SqlThings.Deserialize {0}', ex);
    }
    return null;
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.SqlThingResult

SudoNsb.SqlThingResult = function SudoNsb_SqlThingResult() {
    /// <field name="content" type="Array">
    /// </field>
    /// <field name="loginDifferentUser" type="Boolean">
    /// </field>
    /// <field name="loginError" type="Boolean">
    /// </field>
    /// <field name="loginUnknown" type="Boolean">
    /// </field>
    /// <field name="msg" type="String">
    /// </field>
    /// <field name="result" type="Boolean">
    /// </field>
}
SudoNsb.SqlThingResult.prototype = {
    content: null,
    loginDifferentUser: false,
    loginError: false,
    loginUnknown: false,
    msg: null,
    result: false
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.SqlThingsClipboard

SudoNsb.SqlThingsClipboard = function SudoNsb_SqlThingsClipboard() {
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.Cb

SudoNsb.Cb = function SudoNsb_Cb() {
    /// <field name="topic" type="String" static="true">
    /// </field>
    /// <field name="wrapperInstance" type="SudoNsb.SqlThingData" static="true">
    /// </field>
    /// <field name="data" type="SudoNsb.SqlThingsClipboard" static="true">
    /// </field>
    /// <field name="dict" type="Object" static="true">
    /// </field>
}
SudoNsb.Cb.load = function SudoNsb_Cb$load() {
    SudoNsb.Cb.loadAw(SudoNsb.Await.get_asyncAw());
}
SudoNsb.Cb.loadAw = function SudoNsb_Cb$loadAw(awp) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    new SudoNsb.Await().addAw(BrowserUser.waitSessionLockAw).addAw(SqlThings.retrieveTopicsAw, '/Pnx/User/Clipboard', Snsb.get_masterId()).addDx(function(aw) {
        SudoNsb.Cb.wrapperInstance = SqlThings.resultWrapper(aw.get_result());
        SudoNsb.Cb.data = SqlThings.fromResult(aw.get_result(), SudoNsb.SqlThingsClipboard);
        SudoNsb.Cb.dict = SudoNsb.Cb.data;
        SudoNsb.Cb.wrapperInstance.thing = SudoNsb.Cb.data;
        SudoNsb.Cb.dict['username'] = Config.userName;
    }).commit(awp);
}
SudoNsb.Cb.save = function SudoNsb_Cb$save() {
    SudoNsb.Cb.saveAw(SudoNsb.Await.get_asyncAw());
}
SudoNsb.Cb.saveAw = function SudoNsb_Cb$saveAw(awp) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    SudoNsb.Cb.wrapperInstance.topic = '/Pnx/User/Clipboard';
    SudoNsb.Cb.wrapperInstance.thing = SudoNsb.Cb.data;
    SudoNsb.Cb.wrapperInstance.secret = true;
    new SudoNsb.Await().addDl(function(aw) {
        SqlThings.storeThingAw(aw, SudoNsb.Cb.wrapperInstance);
    }).commit(awp);
}
SudoNsb.Cb.erase = function SudoNsb_Cb$erase() {
    SudoNsb.Cb.data = new SudoNsb.SqlThingsClipboard();
    SudoNsb.Cb.dict = SudoNsb.Cb.data;
    SudoNsb.Cb.wrapperInstance.thing = SudoNsb.Cb.data;
}
SudoNsb.Cb.waitLoadedAw = function SudoNsb_Cb$waitLoadedAw(awp) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    Snsb.waitOn(function(ic) {
        awp.done(ic);
    }, function() {
        return Type.canCast(SudoNsb.Cb.data, SudoNsb.SqlThingsClipboard);
    }, 20000);
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.ToolTips

SudoNsb.ToolTips = function SudoNsb_ToolTips() {
    /// <field name="_css" type="String" static="true">
    /// </field>
    /// <field name="_activeTip" type="jQueryObject" static="true">
    /// </field>
}
SudoNsb.ToolTips.addTo = function SudoNsb_ToolTips$addTo(sel) {
    /// <param name="sel" type="jQueryObject">
    /// </param>
    MyCss.addStyleOnce((SudoNsb.ToolTips).get_fullName(), "\r\n.tooltip {\r\n\tdisplay: none;\r\n\tposition:absolute;\r\n\tborder:1px solid #333;\r\n\tbackground-color:#161616;\r\n\tborder-radius:5px;\r\n\tpadding: 2px 10px;\r\n\tcolor:#fff;\r\n\tfont-size:12px Arial;\r\n\tmargin-top: -26px;\r\n\tmargin-right: 0;\r\n\tvertical-align: middle;\r\n\tline-height: 25px;\r\n\twhite-space: nowrap;\r\n\toverflow: visible;\r\n    z-index: 99;\r\n}\r\n.tooltip:after {\r\n\tcontent: '';\r\n\tposition: absolute;\r\n\tborder-style: solid;\r\n\tborder-width: 5px 9px 5px 0px;\r\n\tborder-color: transparent #000;\r\n\tdisplay: block;\r\n\twidth: 0;\r\n\tz-index: 1;\r\n\tleft: -9px;\r\n\ttop: 9px;\r\n}\r\n");
    if (sel.data('tipAdded')) {
        return;
    }
    var ttl = sel.attr('title');
    if (String.isNullOrEmpty(ttl)) {
        return;
    }
    sel.data('tipAdded', true).off('.tooltip').on('mouseenter.tooltip', function() {
        var ths = SudoNsb.ToolTips._activeTip = $(this);
        var title = ths.attr('title');
        ths.data('tipText', title).removeAttr('title');
        $("<p class='tooltip AboveHider'></p>").html(title).appendTo(window.top.document.body).fadeIn(400);
    }).on('mouseleave.tooltip', function() {
        SudoNsb.ToolTips._activeTip = null;
        var ths = $(this);
        ths.attr('title', ths.data('tipText'));
        $('.tooltip', window.top.document.body).remove();
    }).on('mousemove.tooltip', function(e) {
        var mousex = 0;
        var mousey = 0;
        if (Snsb.jqWin(sel).frameElement != null) {
            var p = $(window.frameElement).offset();
            mousex = p.left;
            mousey = p.top;
        }
        mousex += e.pageX + 25;
        mousey += e.pageY + 10;
        $('.tooltip', window.top.document.body).css({ top: mousey, left: mousex });
    });
}
SudoNsb.ToolTips.removeTip = function SudoNsb_ToolTips$removeTip(el, keepTitle) {
    /// <param name="el" type="jQueryObject">
    /// </param>
    /// <param name="keepTitle" type="Boolean">
    /// </param>
    if (el.data('tipAdded')) {
        if (keepTitle) {
            el.attr('title', el.data('tipText'));
        }
        else {
            el.attr('title', '');
        }
        el.off('.tooltip');
        el.removeData('tipAdded');
        $('.tooltip', window.top.document.body).remove();
    }
    else {
        if (keepTitle) {
            el.attr('title', el.data('tipText'));
        }
        else {
            el.attr('title', '');
        }
    }
}
SudoNsb.ToolTips.clearTips = function SudoNsb_ToolTips$clearTips() {
    if (SudoNsb.ToolTips._activeTip != null) {
        SudoNsb.ToolTips._activeTip.attr('title', SudoNsb.ToolTips._activeTip.data('tipText'));
        $('.tooltip', window.top.document.body).remove();
        SudoNsb.ToolTips._activeTip = null;
    }
}


////////////////////////////////////////////////////////////////////////////////
// FbApi

FbApi = function FbApi() {
    /// <field name="authChangeEv" type="String" static="true">
    /// </field>
    /// <field name="graphApiUrl" type="String" static="true">
    /// </field>
    /// <field name="_fbSvAuthKey" type="String" static="true">
    /// </field>
    /// <field name="_facebookIncluded" type="Boolean" static="true">
    /// </field>
    /// <field name="_fbBailoutTmr" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="_hasAuthChange" type="Boolean" static="true">
    /// </field>
    /// <field name="_authReturnStarted" type="Boolean" static="true">
    /// </field>
    /// <field name="_authLoopTmr" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="_userStatusKnown" type="Boolean" static="true">
    /// </field>
    /// <field name="authStatus" type="String" static="true">
    /// </field>
    /// <field name="_authResponse" type="SudoNsb.FbAuthResponse" static="true">
    /// </field>
    /// <field name="_authChangeIdx" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="scope" type="SudoNsb.FbScope" static="true">
    /// </field>
    /// <field name="sharingApi" type="Boolean" static="true">
    /// </field>
    /// <field name="_fbData" type="SudoNsb.FbDataResult" static="true">
    /// </field>
    /// <field name="initialized" type="Boolean" static="true">
    /// </field>
    /// <field name="ignoreFacebook" type="Boolean" static="true">
    /// </field>
}
FbApi.get_FbSdk = function FbApi$get_FbSdk() {
    /// <value type="SudoNsb.FbSdk"></value>
    return window.self.FB;
}
FbApi.get_fbData = function FbApi$get_fbData() {
    /// <value type="SudoNsb.FbDataResult"></value>
    return FbApi._fbData;
}
FbApi.set_fbData = function FbApi$set_fbData(value) {
    /// <value type="SudoNsb.FbDataResult"></value>
    FbApi._fbData = value;
    return value;
}
FbApi.get_authResponse = function FbApi$get_authResponse() {
    /// <value type="SudoNsb.FbAuthResponse"></value>
    return FbApi._authResponse;
}
FbApi.get_id = function FbApi$get_id() {
    /// <value type="String"></value>
    return FbApi._getSudoId(FbApi.get_fbSessionId());
}
FbApi.set_id = function FbApi$set_id(value) {
    /// <value type="String"></value>
    FbApi.set_fbSessionId(FbApi._getTrueId(value));
    return value;
}
FbApi.get_fbSessionId = function FbApi$get_fbSessionId() {
    /// <value type="String"></value>
    var id = FbApi._authResponse.userID || SudoNsb.Storage.getSession('fbid');
    if (!Snsb.isEmpty(id)) {
        SudoNsb.Storage.setSession('fbid', id);
    }
    return id;
}
FbApi.set_fbSessionId = function FbApi$set_fbSessionId(value) {
    /// <value type="String"></value>
    if (!Snsb.isEmpty(value)) {
        SudoNsb.Storage.setSession('fbid', value);
    }
    FbApi._authResponse.userID = value;
    return value;
}
FbApi.get_accessToken = function FbApi$get_accessToken() {
    /// <value type="String"></value>
    return FbApi._authResponse.accessToken;
}
FbApi.get_userStatusKnown = function FbApi$get_userStatusKnown() {
    /// <value type="Boolean"></value>
    return FbApi._userStatusKnown;
}
FbApi.get_userKnownOrIgnored = function FbApi$get_userKnownOrIgnored() {
    /// <value type="Boolean"></value>
    return FbApi.ignoreFacebook || FbApi._userStatusKnown;
}
FbApi.get_isConnected = function FbApi$get_isConnected() {
    /// <value type="Boolean"></value>
    return FbApi._authResponse.connected && !String.isNullOrEmpty(FbApi._authResponse.userID);
}
FbApi.isFbId = function FbApi$isFbId(id) {
    /// <param name="id" type="String">
    /// </param>
    /// <returns type="Boolean"></returns>
    return !(id || '').indexOf('FB');
}
FbApi._getTrueId = function FbApi$_getTrueId(sudoId) {
    /// <param name="sudoId" type="String">
    /// </param>
    /// <returns type="String"></returns>
    var k = sudoId || '';
    return (!k.indexOf('FB')) ? k.substr(2) : sudoId;
}
FbApi._getSudoId = function FbApi$_getSudoId(trueId) {
    /// <param name="trueId" type="String">
    /// </param>
    /// <returns type="String"></returns>
    var k = trueId || '';
    return (!k.indexOf('FB')) ? trueId : ((trueId == null) ? null : 'FB' + trueId);
}
FbApi.getAuthAw = function FbApi$getAuthAw(awp) {
    /// <summary>
    /// Gets Facebook auth info blocking until status is known.
    /// Primary means to wait on Facebook connection.
    /// Follow up by reading the FbApi.AuthResponse data.
    /// aw.Result contains true or false respective to the connection.
    /// </summary>
    /// <param name="awp" type="SudoNsb.Await">
    /// The awp.
    /// </param>
    var auth = SudoNsb.Storage.getLocal('-CacheFbAuth') || new SudoNsb.FbAuthResponse();
    Inform.trace('FbApi.GetAuthAw() auth.expresAt - Now {0}, auth.masterId {1}, Snsb.MasterId {2}', auth.expiresAt - 300000 - Date.get_now().getTime(), auth.masterId, Snsb.get_masterId());
    if (auth.expiresAt - 300000 >= Date.get_now().getTime() && auth.masterId === Snsb.get_masterId()) {
        FbApi._authResponse = auth;
        FbApi._userStatusKnown = true;
        Config.userId = FbApi._authResponse.userID;
        Config.userName = FbApi._authResponse.name;
        awp.done(true);
        Inform.trace('FbApi.GetAuthAw() using cached auth response');
    }
    var lastId = Snsb.get_masterId();
    FbApi.getLoginStatus(function(fbr) {
        if (fbr.status === 'connected') {
            FbApi._authResponse = fbr.authResponse;
            FbApi._authResponse.connected = true;
            FbApi._authResponse.expiresAt = FbApi._authResponse.expiresIn * 1000 + Date.get_now().getTime();
            FbApi._authResponse.masterId = FbApi.get_id();
            SudoNsb.Storage.setLocal('-CacheFbAuth', FbApi._authResponse);
            if (!Snsb.isEmpty(FbApi._authResponse.userID)) {
                SudoNsb.Storage.setSession('fbid', FbApi._authResponse.userID);
            }
            if (!String.isNullOrEmpty(lastId) && lastId !== FbApi.get_id()) {
                FbApi._doAuthChanges();
            }
            awp.done(true);
            FbApi._userStatusKnown = true;
            Inform.trace('FbApi.GetAuthAw(true)');
        }
        else {
            FbApi._authResponse = {};
            FbApi._authResponse.connected = false;
            FbApi._authResponse.expiresAt = Date.get_now().getTime() - 1;
            FbApi._authResponse.masterId = Snsb.get_masterId();
            SudoNsb.Storage.removeLocal('-CacheFbAuth');
            if (FbApi.isFbId(lastId) && !Snsb.get_isPxUser()) {
                FbApi._doAuthChanges();
            }
            awp.done(false);
            FbApi._userStatusKnown = true;
            Inform.trace('FbApi.GetAuthAw(false)');
        }
    });
}
FbApi.getUserAw = function FbApi$getUserAw(awp, id) {
    /// <summary>
    /// Gets any user by id into FbData.
    /// Utilizes the access_token if it is already available by a previous call to getLoginStatus
    /// so that richer user data can be obtained.
    /// </summary>
    /// <param name="awp" type="SudoNsb.Await">
    /// The awp.
    /// </param>
    /// <param name="id" type="String">
    /// The user id.
    /// </param>
    if (FbApi.get_fbData() == null) {
        Inform.event(arguments, 'begin');
        new SudoNsb.Await().addAw(FbApi.getDataAw, id).addDx(function(aw) {
            var fb = aw.get_result();
            if (fb != null) {
                FbApi.set_fbData(fb);
                if (id === Snsb.get_masterId()) {
                    Config.userId = id;
                    Config.email = fb.email || '';
                    Config.userName = fb.name;
                    FbApi._authResponse.name = (fb.name || FbApi._authResponse.name);
                    FbApi._authResponse.email = (fb.email || FbApi._authResponse.email);
                    SudoNsb.Storage.setLocal('-CacheFbAuth', FbApi._authResponse);
                }
            }
            else {
                FbApi.set_fbData(null);
            }
        }).commit(awp);
    }
    else {
        awp.done();
    }
}
FbApi.clearCache = function FbApi$clearCache() {
    SudoNsb.Storage.removeLocal('-CacheFbAuth');
}
FbApi._doAuthChanges = function FbApi$_doAuthChanges() {
    $(document).trigger('AuthChangeEv.FbApi');
}
FbApi.reGetUserAw = function FbApi$reGetUserAw(awp, id) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    /// <param name="id" type="String">
    /// </param>
    FbApi.set_fbData(null);
    FbApi.getUserAw(awp, id);
}
FbApi.pictureUrl = function FbApi$pictureUrl(id) {
    /// <param name="id" type="String">
    /// </param>
    /// <returns type="String"></returns>
    return Uri.join('https://graph.facebook.com/', FbApi._getTrueId(id), 'picture');
}
FbApi.getLoginStatus = function FbApi$getLoginStatus(fn) {
    /// <param name="fn" type="System.Action`1">
    /// </param>
    if (!FbApi.tryLoaded(function() {
        FbApi.getLoginStatus(fn);
    })) {
        return;
    }
    FbApi.get_FbSdk().getLoginStatus(fn);
}
FbApi.tryLoaded = function FbApi$tryLoaded(fn) {
    /// <summary>
    /// Returns false and executes fn until FB api has loaded and first getLoginStatus has
    /// returned with a valid status, either connected or not. Further use of
    /// getLoginStatus will return with immediate result.
    /// </summary>
    /// <param name="fn" type="Function">
    /// The function that is used to keep the loop going. Should include the caller.
    /// </param>
    /// <returns type="Boolean"></returns>
    FbApi._waitAuthReturnLoop();
    if (!('FB' in window.self) || !FbApi._hasAuthChange) {
        FbApi.includeFacebookApi();
        window.setTimeout(fn, 59);
        return false;
    }
    return true;
}
FbApi._waitAuthReturnLoop = function FbApi$_waitAuthReturnLoop() {
    if (FbApi._authReturnStarted) {
        return;
    }
    FbApi._authReturnStarted = true;
    FbApi._authLoopTmr = window.setInterval(function() {
        if (!('FB' in window.self)) {
            return;
        }
        window.clearInterval(FbApi._authLoopTmr);
        if (FbApi.sharingApi) {
            FB.init({appId: Config.fbAppId, status: true, cookie: true, oauth: true, xfbml: true});
        }
        Snsb.defer(function() {
            FbApi.get_FbSdk().getLoginStatus(function(rsp) {
                if (rsp != null && ('authResponse' in rsp)) {
                    FbApi._hasAuthChange = true;
                }
            }, FbApi.sharingApi);
        });
    }, 13);
}
FbApi.includeFacebookApi = function FbApi$includeFacebookApi() {
    if (Config.offline) {
        return;
    }
    if (!FbApi._facebookIncluded) {
        FbApi._facebookIncluded = true;
        if (FbApi.sharingApi) {
            return;
        }
        if (!$('div#fb-root').length) {
            $(document.body).prepend("<div id='fb-root'/>");
            if (!(typeof(window.self.fbAsyncInit) === 'function')) {
                window.self.fbAsyncInit = FbApi._fbAsyncInit;
            }
            
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = '//connect.facebook.net/en_US/all.js#xfbml=1&appId=' + Config.fbAppId;
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));;
        }
    }
}
FbApi._fbAsyncInit = function FbApi$_fbAsyncInit() {
    FbApi.get_FbSdk().Event.subscribe('auth.authResponseChange', FbApi._fbAuthResponseChange);
    FbApi._fbBailoutTmr = window.setTimeout(function() {
        FbApi._hasAuthChange = true;
    }, 30000);
}
FbApi._fbAuthResponseChange = function FbApi$_fbAuthResponseChange(rsp) {
    /// <param name="rsp" type="SudoNsb.FbResponse">
    /// </param>
    window.clearTimeout(FbApi._fbBailoutTmr);
    FbApi._hasAuthChange = true;
}
FbApi.registerOnLogin = function FbApi$registerOnLogin(fn) {
    /// <param name="fn" type="Function">
    /// </param>
    if (!FbApi.tryLoaded(function() {
        FbApi.registerOnLogin(fn);
    })) {
        return;
    }
    FB.Event.subscribe('auth.login', fn);
}
FbApi.parseXFBML = function FbApi$parseXFBML(el) {
    /// <param name="el" type="jQueryObject">
    /// </param>
    if (!FbApi.tryLoaded(function() {
        FbApi.parseXFBML(el);
    })) {
        return;
    }
    if (el == null) {
        FB.XFBML.parse();
    }
    else {
        FB.XFBML.parse(el[0]);
    }
}
FbApi.login = function FbApi$login(fn, scope) {
    /// <param name="fn" type="System.Action`1">
    /// </param>
    /// <param name="scope" type="String">
    /// </param>
    if (!FbApi.tryLoaded(function() {
        FbApi.login(fn, scope);
    })) {
        return;
    }
    var fn2 = function(rsp) {
        FbApi.authStatus = rsp.status;
        FbApi._authResponse = $.extend({}, rsp.authResponse);
        Inform.debug('Login authResponse {0}', Rx.prettyJson(FbApi._authResponse));
        FbApi.getScope(function() {
            fn(rsp);
        });
    };
    FbApi.get_FbSdk().login(fn2, { scope: scope });
}
FbApi.getScope = function FbApi$getScope(fn) {
    /// <param name="fn" type="Function">
    /// </param>
    FbApi.scope = null;
    FbApi.get_FbSdk().api('/me/permissions', function(d1) {
        if (d1 != null && d1.data != null) {
            FbApi.scope = d1.data[0];
        }
        Inform.debug('Login scope {0}', Rx.prettyJson(FbApi.scope));
        if (fn != null) {
            fn();
        }
    });
}
FbApi.forLogin = function FbApi$forLogin(fnLoggedIn, fnNotLoggedIn) {
    /// <param name="fnLoggedIn" type="System.Action`1">
    /// </param>
    /// <param name="fnNotLoggedIn" type="Function">
    /// </param>
    if (!FbApi.tryLoaded(function() {
        FbApi.forLogin(fnLoggedIn, fnNotLoggedIn);
    })) {
        return;
    }
    window.setTimeout(function() {
        var rsp = FbApi.get_FbSdk().getAuthResponse();
        if (rsp == null) {
            if (fnNotLoggedIn != null) {
                fnNotLoggedIn();
            }
        }
        else {
            if (fnLoggedIn != null) {
                fnLoggedIn(rsp);
            }
        }
    }, 1000);
}
FbApi.getDataAw = function FbApi$getDataAw(awp, id) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    /// <param name="id" type="String">
    /// </param>
    var ao = {};
    ao.url = Uri.join('https://graph.facebook.com/', FbApi._getTrueId(id));
    if (FbApi._authResponse.accessToken != null) {
        ao.url += '?access_token=' + FbApi._authResponse.accessToken;
    }
    ao.type = 'GET';
    ao.dataType = 'jsonp';
    ao.success = function(data, textStatus, request) {
        var fb = data;
        if (fb != null && fb.error == null) {
            awp.set_result(fb);
            awp.done();
            return;
        }
        if (fb != null && fb.error != null) {
            awp.set_result(fb);
            awp.throwEx(new Error("Record doesn't exist"));
            return;
        }
        ao.error(request, textStatus, null);
    };
    ao.error = function(request, textStatus, error) {
        awp.throwAjax('Ajax Load Error', String.format('fbid {0}', id), request, textStatus, 'FbApi.GetDataAw');
    };
    $.ajax(ao);
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.FbDataResult

SudoNsb.FbDataResult = function SudoNsb_FbDataResult() {
    /// <field name="custom" type="String">
    /// </field>
    /// <field name="data" type="Array">
    /// </field>
    /// <field name="description" type="String">
    /// </field>
    /// <field name="email" type="String">
    /// </field>
    /// <field name="error" type="SudoNsb.FbErrorResult">
    /// </field>
    /// <field name="first_name" type="String">
    /// </field>
    /// <field name="gender" type="String">
    /// </field>
    /// <field name="home_phone" type="String">
    /// </field>
    /// <field name="icon" type="String">
    /// </field>
    /// <field name="id" type="String">
    /// </field>
    /// <field name="last_name" type="String">
    /// </field>
    /// <field name="link" type="String">
    /// </field>
    /// <field name="locale" type="String">
    /// </field>
    /// <field name="mobile_phone" type="String">
    /// </field>
    /// <field name="name" type="String">
    /// </field>
    /// <field name="owner" type="SudoNsb.FbDataResult">
    /// </field>
    /// <field name="privacy" type="String">
    /// </field>
    /// <field name="street" type="String">
    /// </field>
    /// <field name="updated_time" type="String">
    /// </field>
    /// <field name="username" type="String">
    /// </field>
    /// <field name="venue" type="SudoNsb.FbDataResult">
    /// </field>
    /// <field name="version" type="Number" integer="true">
    /// </field>
}
SudoNsb.FbDataResult.prototype = {
    custom: null,
    data: null,
    description: null,
    email: null,
    error: null,
    first_name: null,
    gender: null,
    home_phone: null,
    icon: null,
    id: null,
    last_name: null,
    link: null,
    locale: null,
    mobile_phone: null,
    name: null,
    owner: null,
    privacy: null,
    street: null,
    updated_time: null,
    username: null,
    venue: null,
    version: 0
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.FbSdk

SudoNsb.FbSdk = function SudoNsb_FbSdk() {
    /// <field name="Event" type="SudoNsb.FbEvent">
    /// </field>
}
SudoNsb.FbSdk.prototype = {
    Event: null,
    
    getLoginStatus: function SudoNsb_FbSdk$getLoginStatus(fn, refresh) {
        /// <param name="fn" type="System.Action`1">
        /// </param>
        /// <param name="refresh" type="Boolean">
        /// </param>
    },
    
    login: function SudoNsb_FbSdk$login(fn, scope) {
        /// <param name="fn" type="System.Action`1">
        /// </param>
        /// <param name="scope" type="Object">
        /// </param>
    },
    
    getAuthResponse: function SudoNsb_FbSdk$getAuthResponse() {
        /// <returns type="SudoNsb.FbAuthResponse"></returns>
        return null;
    },
    
    getUserID: function SudoNsb_FbSdk$getUserID() {
        /// <returns type="String"></returns>
        return null;
    },
    
    api: function SudoNsb_FbSdk$api(request, fn) {
        /// <param name="request" type="String">
        /// </param>
        /// <param name="fn" type="System.Action`1">
        /// </param>
    }
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.FbResponse

SudoNsb.FbResponse = function SudoNsb_FbResponse() {
    /// <field name="authResponse" type="SudoNsb.FbAuthResponse">
    /// </field>
    /// <field name="post_id" type="String">
    /// </field>
    /// <field name="status" type="String">
    /// </field>
}
SudoNsb.FbResponse.prototype = {
    authResponse: null,
    post_id: null,
    status: null
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.FbAuthResponse

SudoNsb.FbAuthResponse = function SudoNsb_FbAuthResponse() {
    /// <field name="accessToken" type="String">
    /// </field>
    /// <field name="connected" type="Boolean">
    /// </field>
    /// <field name="email" type="String">
    /// </field>
    /// <field name="expiresAt" type="Number">
    /// </field>
    /// <field name="expiresIn" type="Number">
    /// </field>
    /// <field name="masterId" type="String">
    /// </field>
    /// <field name="name" type="String">
    /// </field>
    /// <field name="signedRequest" type="String">
    /// </field>
    /// <field name="userID" type="String">
    /// </field>
}
SudoNsb.FbAuthResponse.prototype = {
    accessToken: null,
    connected: false,
    email: null,
    expiresAt: 0,
    expiresIn: 0,
    masterId: '',
    name: null,
    signedRequest: null,
    userID: null
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.FbErrorResult

SudoNsb.FbErrorResult = function SudoNsb_FbErrorResult() {
    /// <field name="code" type="Number" integer="true">
    /// </field>
    /// <field name="message" type="String">
    /// </field>
    /// <field name="type" type="String">
    /// </field>
}
SudoNsb.FbErrorResult.prototype = {
    code: 0,
    message: null,
    type: null
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.FbScope

SudoNsb.FbScope = function SudoNsb_FbScope() {
    /// <field name="create_note" type="Boolean">
    /// </field>
    /// <field name="installed" type="Boolean">
    /// </field>
    /// <field name="photo_upload" type="Boolean">
    /// </field>
    /// <field name="publish_actions" type="Boolean">
    /// </field>
    /// <field name="publish_stream" type="Boolean">
    /// </field>
    /// <field name="share_item" type="Boolean">
    /// </field>
    /// <field name="status_update" type="Boolean">
    /// </field>
    /// <field name="user_groups" type="Boolean">
    /// </field>
    /// <field name="video_upload" type="Boolean">
    /// </field>
}
SudoNsb.FbScope.prototype = {
    create_note: false,
    installed: false,
    photo_upload: false,
    publish_actions: false,
    publish_stream: false,
    share_item: false,
    status_update: false,
    user_groups: false,
    video_upload: false
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.FbEvent

SudoNsb.FbEvent = function SudoNsb_FbEvent() {
}
SudoNsb.FbEvent.prototype = {
    
    subscribe: function SudoNsb_FbEvent$subscribe(name, fn) {
        /// <param name="name" type="String">
        /// </param>
        /// <param name="fn" type="System.Action`1">
        /// </param>
    }
}


////////////////////////////////////////////////////////////////////////////////
// Inform

Inform = function Inform() {
    /// <field name="tracing" type="Boolean" static="true">
    /// </field>
    /// <field name="passExceptions" type="Boolean" static="true">
    /// </field>
    /// <field name="logActions" type="Boolean" static="true">
    /// </field>
    /// <field name="nsbDebug" type="Boolean" static="true">
    /// </field>
    /// <field name="_mark" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="_initialTm" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="isLoggedTxt" type="String" static="true">
    /// </field>
    /// <field name="lastErrorKey" type="String" static="true">
    /// </field>
}
Inform.debug = function Inform$debug(msg, v1, v2, v3, v4) {
    /// <param name="msg" type="String">
    /// </param>
    /// <param name="v1" type="Object">
    /// </param>
    /// <param name="v2" type="Object">
    /// </param>
    /// <param name="v3" type="Object">
    /// </param>
    /// <param name="v4" type="Object">
    /// </param>
    if (Inform.nsbDebug) {
        if (window.console) console.warn(String.format('D' + (new Date().getTime() - Inform._initialTm) + ': ' + msg, v1, v2, v3, v4));
    }
}
Inform.trace = function Inform$trace(msg, v1, v2, v3, v4) {
    /// <param name="msg" type="String">
    /// </param>
    /// <param name="v1" type="Object">
    /// </param>
    /// <param name="v2" type="Object">
    /// </param>
    /// <param name="v3" type="Object">
    /// </param>
    /// <param name="v4" type="Object">
    /// </param>
    if (Inform.tracing) {
        if (window.console) console.log(String.format('Trace: ' + msg, v1, v2, v3, v4));
    }
}
Inform.warn = function Inform$warn(msg, v1, v2, v3, v4) {
    /// <param name="msg" type="String">
    /// </param>
    /// <param name="v1" type="Object">
    /// </param>
    /// <param name="v2" type="Object">
    /// </param>
    /// <param name="v3" type="Object">
    /// </param>
    /// <param name="v4" type="Object">
    /// </param>
    if (window.console) console.warn(String.format(msg, v1, v2, v3, v4));
}
Inform.error = function Inform$error(msg, v1, v2, v3, v4) {
    /// <param name="msg" type="String">
    /// </param>
    /// <param name="v1" type="Object">
    /// </param>
    /// <param name="v2" type="Object">
    /// </param>
    /// <param name="v3" type="Object">
    /// </param>
    /// <param name="v4" type="Object">
    /// </param>
    msg = String.format(msg, v1, v2, v3, v4);
    if (msg.indexOf(' (LOGGED=true)') === -1) {
        if (window.console) console.error(msg);
        SudoNsb.Storage.setSession('NsbLastError', String.format('{0} {1}', Strings.stdDate(), msg));
        LocalExceptions.SaveLog('Error', msg);
    }
}
Inform.rawError = function Inform$rawError(msg, v1, v2, v3, v4) {
    /// <param name="msg" type="String">
    /// </param>
    /// <param name="v1" type="Object">
    /// </param>
    /// <param name="v2" type="Object">
    /// </param>
    /// <param name="v3" type="Object">
    /// </param>
    /// <param name="v4" type="Object">
    /// </param>
    msg = String.format(msg, v1, v2, v3, v4);
    if (window.console) console.error(msg);
}
Inform.dump = function Inform$dump(item, name) {
    /// <param name="item" type="Object">
    /// </param>
    /// <param name="name" type="String">
    /// </param>
    try {
        Inform.debug('D' + (new Date().getTime() - Inform._initialTm) + ': ' + 'Dump of object "{0}"', (ss.isValue(name)) ? name : 'Type=' + Type.getInstanceType(item));
        var s = Rx.prettyJson(item);
        if (window.console) console.log(s);
    }
    catch ($e1) {
    }
}
Inform.logFn = function Inform$logFn(args) {
    /// <summary>
    /// Logs the function name.
    /// </summary>
    /// <param name="args" type="Object">
    /// Script.Literal("arguments")
    /// </param>
    var n = args.callee.name;
    if (!String.isNullOrEmpty(n)) {
        Inform.debug('Doing {0}', n);
    }
}
Inform.event = function Inform$event(args, msg) {
    /// <summary>
    /// Logs the function name to event logs
    /// </summary>
    /// <param name="args" type="Object">
    /// Script.Literal("arguments")
    /// </param>
    /// <param name="msg" type="String">
    /// optional message
    /// </param>
    var n;
    if (Type.canCast(args, String)) {
        n = args;
    }
    else {
        n = args.callee.name;
    }
    msg = (String.isNullOrEmpty(msg)) ? String.format('[{0}]', n || 'anonymous') : String.format('[{0}] {1}', n || 'anonymous', msg);
    Inform.debug(msg);
}
Inform.markSt = function Inform$markSt() {
    Inform._mark = new Date().getTime();
}
Inform.mark = function Inform$mark() {
    var m = new Date().getTime();
    Inform.debug('Mark {0}', (m - Inform._mark) / 1000);
    Inform._mark = m;
}


////////////////////////////////////////////////////////////////////////////////
// BrowserUser

BrowserUser = function BrowserUser() {
    /// <field name="pxUserKnownEv" type="String" static="true">
    /// </field>
    /// <field name="pxUserUnknownEv" type="String" static="true">
    /// </field>
    /// <field name="_buKey" type="String" static="true">
    /// </field>
    /// <field name="_adminPasswordKey" type="String" static="true">
    /// </field>
    /// <field name="_sessionCacheKey" type="String" static="true">
    /// </field>
    /// <field name="data" type="SudoNsb.BuData" static="true">
    /// </field>
    /// <field name="Session" type="SudoNsb.SessionData" static="true">
    /// </field>
    /// <field name="password" type="String" static="true">
    /// </field>
    /// <field name="geoInfo" type="SudoNsb.GeoInfo" static="true">
    /// </field>
    /// <field name="_startTime" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="loadTime" type="Number" integer="true" static="true">
    /// </field>
}
BrowserUser.get_adminPassword = function BrowserUser$get_adminPassword() {
    /// <value type="String"></value>
    return SudoNsb.Storage.getLocal('AdminPassword');
}
BrowserUser.set_adminPassword = function BrowserUser$set_adminPassword(value) {
    /// <value type="String"></value>
    if (value == null) {
        SudoNsb.Storage.removeLocal('AdminPassword');
    }
    else {
        SudoNsb.Storage.setLocal('AdminPassword', value);
    }
    return value;
}
BrowserUser.get_getSessionUrl = function BrowserUser$get_getSessionUrl() {
    /// <value type="String"></value>
    return Uri.join(Config.get_appPath(), 'file.session.php');
}
BrowserUser.load = function BrowserUser$load() {
    SudoNsb.Storage.removeCookie('PnxMasterId');
    SudoNsb.Storage.removeCookie('PnxAnonymousId');
    SudoNsb.Storage.defaultLocal('@StopOnReloadPage', false);
    BrowserUser._getSessionAw(SudoNsb.Await.get_asyncAw());
    BrowserUser.data = SudoNsb.Storage.getLocal('BrowserUser');
    if (BrowserUser.data == null) {
        BrowserUser.data = new SudoNsb.BuData();
        BrowserUser.data.id = Snsb.get_newId();
        BrowserUser.data.dateCreated = Date.get_now().getTime();
    }
    else {
        BrowserUser.data.geoInfo = null;
    }
    BrowserUser.getGeoInfoAw(SudoNsb.Await.get_asyncAw());
}
BrowserUser.userKey = function BrowserUser$userKey(prefix) {
    /// <param name="prefix" type="String">
    /// </param>
    /// <returns type="String"></returns>
    if (String.isNullOrEmpty(Snsb.get_masterId())) {
        debugger;
    }
    return ((String.isNullOrEmpty(prefix)) ? '' : prefix + '.') + Snsb.get_masterId();
}
BrowserUser.store = function BrowserUser$store(k, v) {
    /// <summary>
    /// Stores by user id in local storage when conneced.
    /// Stores by anonymous id in sesssion storage when not connected. Not really!
    /// </summary>
    /// <param name="k" type="String">
    /// The key.
    /// </param>
    /// <param name="v" type="Object">
    /// The value.
    /// </param>
    SudoNsb.Storage.setLocal(BrowserUser.userKey(k), v);
}
BrowserUser.retrieve = function BrowserUser$retrieve(k) {
    /// <summary>
    /// Retrieves by user id from local storage when conneced.
    /// Retrieves by anonymous id from sesssion storage when not connected.
    /// </summary>
    /// <param name="k" type="String">
    /// The key.
    /// </param>
    /// <returns type="Object"></returns>
    return SudoNsb.Storage.getLocal(BrowserUser.userKey(k));
}
BrowserUser.remove = function BrowserUser$remove(k) {
    /// <summary>
    /// Removes the anonymous value from session storage.
    /// Attempts to remove the user id'd value from local storage if connected.
    /// </summary>
    /// <param name="k" type="String">
    /// The key.
    /// </param>
    SudoNsb.Storage.removeLocal(BrowserUser.userKey(k));
}
BrowserUser.waitSessionLockAw = function BrowserUser$waitSessionLockAw(awp) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    Inform.event(arguments, String.format('MasterId = {0}', Snsb.get_masterId()));
    if (!String.isNullOrEmpty(Snsb.get_masterId()) && FbApi.get_userKnownOrIgnored() && BrowserUser.Session.key != null) {
        awp.done();
        return;
    }
    new SudoNsb.Await().waitDx(function() {
        return FbApi.get_userKnownOrIgnored() && BrowserUser.Session.key != null;
    }).addFn(BrowserUser.pxSessionChange).commit(awp);
}
BrowserUser._createMasterId = function BrowserUser$_createMasterId() {
    var lastId = Snsb.get_anonId() || '';
    Snsb.set_masterId((BrowserUser.Session.userId || FbApi.get_id() || Snsb.get_masterId() || ((!FbApi.isFbId(lastId)) ? lastId : null) || BrowserUser.Session.key || ''));
    if (!FbApi.isFbId(Snsb.get_masterId())) {
        Snsb.set_anonId(Snsb.get_masterId());
    }
    SudoNsb.Storage.setCookie('PnxSession', BrowserUser.Session);
}
BrowserUser.getTopSession = function BrowserUser$getTopSession() {
    try {
        var ts = top.BrowserUser.Session;
        if (!Snsb.isEmpty(ts)) {
            BrowserUser.Session = ts;
            Snsb.set_masterId(ts.userId);
            FbApi.set_id(top.FbApi.get_id());
            BrowserUser._createMasterId();
        }
    }
    catch (ex) {
        Inform.error('Error doing BrowswerUser.GetTopSession {0}', ex.message);
    }
}
BrowserUser.clearUserCache = function BrowserUser$clearUserCache() {
    Snsb.set_masterId(null);
    SudoNsb.Storage.removeCookie('PnxSession');
    FbApi.clearCache();
}
BrowserUser.save = function BrowserUser$save() {
    BrowserUser.data.dateSaved = Date.get_now().getTime();
    SudoNsb.Storage.setLocal('BrowserUser', BrowserUser.data);
}
BrowserUser.logout = function BrowserUser$logout(e) {
    /// <param name="e" type="jQueryEvent">
    /// </param>
    BrowserUser.set_adminPassword(null);
    BrowserUser.Session.admin = false;
    BrowserUser.cacheSession();
    BrowserUser.reloadPage();
}
BrowserUser.reloadPage = function BrowserUser$reloadPage(win) {
    /// <param name="win" type="WindowInstance">
    /// </param>
    if (SudoNsb.Storage.getLocal('@StopOnReloadPage')) {
        debugger;
    }
    Snsb.halt = true;
    win = win || window.self;
    win.location.reload(true);
}
BrowserUser.relink = function BrowserUser$relink(url, win) {
    /// <param name="url" type="String">
    /// </param>
    /// <param name="win" type="WindowInstance">
    /// </param>
    Snsb.halt = true;
    win = win || window.self;
    win.location.assign(url);
}
BrowserUser.getGeoInfoAw = function BrowserUser$getGeoInfoAw(awp) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    if (Config.offline) {
        return;
    }
    if (BrowserUser.geoInfo.ip != null) {
        awp.done(BrowserUser.geoInfo);
        return;
    }
    $.getJSON('http://freegeoip.net/json/', function(data) {
        BrowserUser.geoInfo = BrowserUser.data.geoInfo = data;
        awp.done(BrowserUser.geoInfo);
    });
}
BrowserUser.waitGeoInfoAw = function BrowserUser$waitGeoInfoAw(awp) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    new SudoNsb.Await().waitDx(function() {
        return BrowserUser.geoInfo.ip != null;
    }).commit(awp);
}
BrowserUser._getSessionAw = function BrowserUser$_getSessionAw(awp) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    var preDone = false;
    var sess = SudoNsb.Storage.getCookie('PnxSession');
    if (sess != null) {
        Inform.trace('BrowserUser.GetSessionAw() loaded from cache');
        BrowserUser.Session = sess;
        BrowserUser.Session.key = (Snsb.get_anonId() || BrowserUser.Session.key);
        BrowserUser.password = BrowserUser.Session.passkey;
        if (!BrowserUser.Session.admin) {
            BrowserUser.set_adminPassword(null);
        }
        preDone = true;
        awp.done();
    }
    else if (BrowserUser.Session.key != null) {
        awp.done();
        return;
    }
    BrowserUser.retrieveSession(function(data) {
        BrowserUser.Session = data;
        BrowserUser.pxSessionChange();
        BrowserUser.Session.key = (Snsb.get_masterId() || BrowserUser.Session.key);
        BrowserUser.password = BrowserUser.Session.passkey;
        if (!BrowserUser.Session.admin) {
            BrowserUser.set_adminPassword(null);
        }
        if (!preDone) {
            awp.done();
        }
        if (BrowserUser.Session.reload) {
            Snsb.defer(BrowserUser._copyAndReload, 500);
        }
        if (window.hasOwnProperty('localStorage') && BrowserUser.Session.version > parseInt(Uri.get_masterVersion())) {
            Uri.set_masterVersion(BrowserUser.Session.version.toString());
            BrowserUser.reloadPage();
        }
    });
}
BrowserUser._copyAndReload = function BrowserUser$_copyAndReload() {
}
BrowserUser.pxSessionChange = function BrowserUser$pxSessionChange() {
    BrowserUser._createMasterId();
    if (BrowserUser.Session.userId != null) {
        Config.email = BrowserUser.Session.user.email;
        Config.userName = BrowserUser.Session.user.displayname;
        Config.userId = BrowserUser.Session.userId;
        $(document).trigger('PxUserKnownEv');
    }
    else {
        $(document).trigger('PxUserUnknownEv');
    }
}
BrowserUser.retrieveSession = function BrowserUser$retrieveSession(fn) {
    /// <param name="fn" type="System.Action`1">
    /// </param>
    BrowserUser._startTime = Date.get_now().getTime();
    $.getJSON(Uri.addPair(BrowserUser.get_getSessionUrl(), 'adminPassword', BrowserUser.get_adminPassword()), function(data) {
        BrowserUser.loadTime = Date.get_now().getTime() - BrowserUser._startTime;
        Config.loadFactor = BrowserUser.loadTime / 333;
        Inform.trace('Session load time {0}, factor {1}', BrowserUser.loadTime, Config.loadFactor);
        fn(data);
    });
}
BrowserUser.reloadSessionAw = function BrowserUser$reloadSessionAw(awp) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    BrowserUser.retrieveSession(function(data) {
        BrowserUser.Session = data || BrowserUser.Session;
        BrowserUser.Session.key = (Snsb.get_masterId() || BrowserUser.Session.key);
        BrowserUser.password = BrowserUser.Session.passkey;
        if (!BrowserUser.Session.admin) {
            BrowserUser.set_adminPassword(null);
        }
        BrowserUser.pxSessionChange();
        awp.done();
    });
}
BrowserUser.cacheSession = function BrowserUser$cacheSession() {
    SudoNsb.Storage.setCookie('PnxSession', BrowserUser.Session);
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.SessionData

SudoNsb.SessionData = function SudoNsb_SessionData() {
    /// <field name="remotE_ADDR" type="String">
    /// </field>
    /// <field name="admin" type="Boolean">
    /// </field>
    /// <field name="key" type="String">
    /// </field>
    /// <field name="passkey" type="String">
    /// </field>
    /// <field name="reload" type="Boolean">
    /// </field>
    /// <field name="result" type="Boolean">
    /// </field>
    /// <field name="user" type="SudoNsb.PxSessionUser">
    /// </field>
    /// <field name="userId" type="String">
    /// </field>
    /// <field name="version" type="Number" integer="true">
    /// </field>
}
SudoNsb.SessionData.prototype = {
    remotE_ADDR: null,
    admin: false,
    key: null,
    passkey: null,
    reload: false,
    result: false,
    user: null,
    userId: null,
    version: 0
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.BuData

SudoNsb.BuData = function SudoNsb_BuData() {
    /// <field name="dateCreated" type="Number" integer="true">
    /// </field>
    /// <field name="dateSaved" type="Number" integer="true">
    /// </field>
    /// <field name="geoInfo" type="SudoNsb.GeoInfo">
    /// </field>
    /// <field name="id" type="String">
    /// </field>
}
SudoNsb.BuData.prototype = {
    dateCreated: 0,
    dateSaved: 0,
    geoInfo: null,
    id: null
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.GeoInfo

SudoNsb.GeoInfo = function SudoNsb_GeoInfo() {
    /// <field name="areacode" type="String">
    /// </field>
    /// <field name="city" type="String">
    /// </field>
    /// <field name="country_code" type="String">
    /// </field>
    /// <field name="country_name" type="String">
    /// </field>
    /// <field name="ip" type="String">
    /// </field>
    /// <field name="latitude" type="Number">
    /// </field>
    /// <field name="longitude" type="Number">
    /// </field>
    /// <field name="metro_code" type="String">
    /// </field>
    /// <field name="region_code" type="String">
    /// </field>
    /// <field name="region_name" type="String">
    /// </field>
    /// <field name="zipcode" type="String">
    /// </field>
}
SudoNsb.GeoInfo.prototype = {
    areacode: null,
    city: null,
    country_code: null,
    country_name: null,
    ip: null,
    latitude: 0,
    longitude: 0,
    metro_code: null,
    region_code: null,
    region_name: null,
    zipcode: null
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.CloudMail

SudoNsb.CloudMail = function SudoNsb_CloudMail() {
}
SudoNsb.CloudMail.get__sendUrl = function SudoNsb_CloudMail$get__sendUrl() {
    /// <value type="String"></value>
    return Uri.join(Config.get_appPath(), 'sendmail.php');
}
SudoNsb.CloudMail.sendMailAw = function SudoNsb_CloudMail$sendMailAw(awp, mail, url) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    /// <param name="mail" type="Object">
    /// </param>
    /// <param name="url" type="String">
    /// </param>
    var ao = {};
    ao.url = url || SudoNsb.CloudMail.get__sendUrl();
    ao.data = { Data: JSON.stringify(mail) };
    ao.dataType = 'json';
    ao.type = 'POST';
    ao.success = function() {
        awp.done();
    };
    ao.error = function(request, textStatus, error) {
        Inform.error('Error sending mail {0} {1}', textStatus, error);
        awp.throwEx(new Error('Send Mail Error'));
    };
    $.ajax(ao);
}
SudoNsb.CloudMail.get_newSendMailPart = function SudoNsb_CloudMail$get_newSendMailPart() {
    /// <value type="SudoNsb.SendMailPart"></value>
    return {};
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.SendMailData

SudoNsb.SendMailData = function SudoNsb_SendMailData() {
    /// <field name="content" type="String">
    /// </field>
    /// <field name="from" type="String">
    /// </field>
    /// <field name="subject" type="String">
    /// </field>
    /// <field name="to" type="String">
    /// </field>
    /// <field name="cc" type="String">
    /// semi-colon seperated list of cc reciepients (should not include to address)
    /// </field>
    /// <field name="parts" type="Array">
    /// </field>
    /// <field name="recipients" type="String">
    /// file name of semi-colon seperated reciepient list
    /// </field>
    /// <field name="sendToMeAlso" type="Boolean">
    /// </field>
    /// <field name="sendfile" type="String">
    /// </field>
    /// <field name="textonly" type="String">
    /// </field>
    /// <field name="toAll" type="Boolean">
    /// </field>
}
SudoNsb.SendMailData.prototype = {
    content: null,
    from: null,
    subject: null,
    to: null,
    cc: null,
    parts: null,
    recipients: null,
    sendToMeAlso: false,
    sendfile: null,
    textonly: null,
    toAll: false
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.SendMailPart

SudoNsb.SendMailPart = function SudoNsb_SendMailPart() {
    /// <field name="fileName" type="String">
    /// </field>
    /// <field name="cid" type="String">
    /// </field>
    /// <field name="base64" type="String">
    /// </field>
    /// <field name="url" type="String">
    /// </field>
    /// <field name="type" type="String">
    /// </field>
}
SudoNsb.SendMailPart.prototype = {
    fileName: null,
    cid: null,
    base64: null,
    url: null,
    type: null
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.Tables

SudoNsb.Tables = function SudoNsb_Tables() {
}
SudoNsb.Tables.asTable = function SudoNsb_Tables$asTable(list, opt) {
    /// <param name="list" type="Array">
    /// </param>
    /// <param name="opt" type="SudoNsb.TableOptions">
    /// </param>
    /// <returns type="jQueryObject"></returns>
    opt = opt || new SudoNsb.TableOptions();
    opt.skip = opt.skip || [];
    var table = $('<table/>');
    var cnt = 0;
    var $enum1 = ss.IEnumerator.getEnumerator(list);
    while ($enum1.moveNext()) {
        var dict = $enum1.current;
        var tr;
        if (!cnt++) {
            tr = $('<tr/>').appendTo(table);
            var $dict2 = dict;
            for (var $key3 in $dict2) {
                var p = { key: $key3, value: $dict2[$key3] };
                if (opt.skip.contains(p.key)) {
                    continue;
                }
                $('<th/>').html(p.key).appendTo(tr);
            }
        }
        tr = $('<tr/>').appendTo(table);
        var $dict4 = dict;
        for (var $key5 in $dict4) {
            var p = { key: $key5, value: $dict4[$key5] };
            if (opt.skip.contains(p.key)) {
                continue;
            }
            $('<td/>').html((p.value || '').toString()).appendTo(tr);
        }
    }
    return table;
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.TableOptions

SudoNsb.TableOptions = function SudoNsb_TableOptions() {
    /// <field name="skip" type="Array">
    /// </field>
}
SudoNsb.TableOptions.prototype = {
    skip: null
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.Encoder

SudoNsb.Encoder = function SudoNsb_Encoder() {
    /// <field name="_encoderLib" type="String" static="true">
    /// </field>
}
SudoNsb.Encoder.encode64 = function SudoNsb_Encoder$encode64(s) {
    /// <param name="s" type="String">
    /// </param>
    /// <returns type="String"></returns>
    return Encoder.Encode64(s);
}
SudoNsb.Encoder.decode64 = function SudoNsb_Encoder$decode64(s) {
    /// <param name="s" type="String">
    /// </param>
    /// <returns type="String"></returns>
    return Encoder.Decode64(s);
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.HelpTip

SudoNsb.HelpTip = function SudoNsb_HelpTip(htd) {
    /// <param name="htd" type="SudoNsb.HelpTipData">
    /// </param>
    /// <field name="_html" type="String" static="true">
    /// </field>
    /// <field name="_css" type="String" static="true">
    /// </field>
    /// <field name="_tipImgPath" type="String" static="true">
    /// </field>
    /// <field name="_element" type="jQueryObject">
    /// </field>
    /// <field name="_all" type="Array" static="true">
    /// </field>
    /// <field name="_tmr" type="Number" integer="true" static="true">
    /// </field>
    MyCss.addStyleOnce((SudoNsb.HelpTip).get_fullName(), '\r\ndiv.HelpTip {\r\n    position: absolute;\r\n    display: inline-block;\r\n    z-index: 3000; /* above AboveHider 2300 */\r\n}\r\ndiv.HelpTip img.TipBack {\r\n    position: absolute;\r\n    width: 100%;\r\n    height: 100%;\r\n    z-index: -1;\r\n}\r\ndiv.HelpTip p.TipMsg {\r\n    margin: 25px 60px;\r\n    padding: 0;\r\n    font-family: arial;\r\n    font-size: 10pt;\r\n    line-height: 12pt;\r\n    color: black;\r\n}\r\n');
    var tip = $("\r\n<div class='HelpTip'>\r\n    <img class='TipBack'>\r\n    <p class='TipMsg'></p>\r\n</div>\r\n").appendTo(document.body);
    this._element = htd.el;
    SudoNsb.HelpTip._metric(tip, htd);
    tip.data('HelpTip', htd);
    SudoNsb.HelpTip._all.add(tip);
    window.clearInterval(SudoNsb.HelpTip._tmr);
    SudoNsb.HelpTip._tmr = window.setInterval(SudoNsb.HelpTip._tick, 30);
}
SudoNsb.HelpTip._tick = function SudoNsb_HelpTip$_tick() {
    var $enum1 = ss.IEnumerator.getEnumerator(SudoNsb.HelpTip._all);
    while ($enum1.moveNext()) {
        var tip = $enum1.current;
        var htd = tip.data('HelpTip');
        var p = htd.el.offset();
        var hash = '' + p.left + p.top + htd.el.width() + htd.el.height();
        if (hash !== htd.hash) {
            SudoNsb.HelpTip._metric(tip, tip.data('HelpTip'));
        }
    }
    if (SudoNsb.HelpTip._all.length < 1) {
        SudoNsb.HelpTip._stopTimer();
    }
}
SudoNsb.HelpTip._metric = function SudoNsb_HelpTip$_metric(tip, htd) {
    /// <param name="tip" type="PositionObject">
    /// </param>
    /// <param name="htd" type="SudoNsb.HelpTipData">
    /// </param>
    var text = htd.text.replace(/\r\n|\n/g, '<br>');
    var pel = $('p.TipMsg', tip).html(text);
    var img = $('img.TipBack', tip);
    var wh = SudoNsb.Metrics.textMetrics(pel, text);
    var w;
    var h = wh[1] + 50;
    var pos;
    switch (htd.side) {
        case 0:
            pos = { my: 'right top', at: 'left top', of: htd.el };
            img.attr('src', Uri.join(SudoNsb.HelpTip._tipImgPath, 'TipBackLeft.png'));
            w = wh[0] + 80 + 40;
            break;
        case 1:
            pos = { my: 'left top', at: 'right top', of: htd.el };
            img.attr('src', Uri.join(SudoNsb.HelpTip._tipImgPath, 'TipBackRight.png'));
            w = wh[0] + 80 + 40;
            break;
        case 2:
            pos = { my: 'center bottom', at: 'center top', of: htd.el };
            img.attr('src', Uri.join(SudoNsb.HelpTip._tipImgPath, 'TipBackTop.png'));
            w = wh[0] + 80;
            pel.css('margin', '25px 40px');
            break;
        default:
            pos = { my: 'center top', at: 'center bottom', of: htd.el };
            img.attr('src', Uri.join(SudoNsb.HelpTip._tipImgPath, 'TipBackBottom.png'));
            w = wh[0] + 80;
            pel.css('margin', '25px 40px');
            break;
    }
    tip.css({ width: w, height: h });
    tip.position(pos);
    var p = htd.el.offset();
    htd.hash = '' + p.left + p.top + htd.el.width() + htd.el.height();
}
SudoNsb.HelpTip.clearTips = function SudoNsb_HelpTip$clearTips() {
    var $enum1 = ss.IEnumerator.getEnumerator(SudoNsb.HelpTip._all);
    while ($enum1.moveNext()) {
        var tip = $enum1.current;
        tip.removeData('HelpTip');
        tip.remove();
    }
    SudoNsb.HelpTip._all.clear();
    SudoNsb.HelpTip._stopTimer();
}
SudoNsb.HelpTip._stopTimer = function SudoNsb_HelpTip$_stopTimer() {
    var tmr = SudoNsb.HelpTip._tmr;
    SudoNsb.HelpTip._tmr = 0;
    window.clearInterval(tmr);
}
SudoNsb.HelpTip.addTips = function SudoNsb_HelpTip$addTips(block) {
    /// <summary>
    /// Adds the tips from an elements title attribute.
    /// Miltiple tips are allowed in the order top right bottom left
    /// </summary>
    /// <param name="block" type="jQueryObject">
    /// The block.
    /// </param>
    $('[title]', block).each(function(i, domEl) {
        var el = $(domEl);
        SudoNsb.HelpTip._addTip(el);
        return true;
    });
}
SudoNsb.HelpTip._addTip = function SudoNsb_HelpTip$_addTip(el) {
    /// <param name="el" type="jQueryObject">
    /// </param>
    var title = el.attr('title');
    var side = 0;
    var parts = title.split(':HelpTipLeft:');
    if (parts.length < 2) {
        parts = title.split(':HelpTipBottom:');
        side = 3;
        if (parts.length < 2) {
            parts = title.split(':HelpTipRight:');
            side = 1;
            if (parts.length < 2) {
                parts = title.split(':HelpTipTop:');
                side = 2;
            }
        }
    }
    if (parts.length > 1) {
        var htd = new SudoNsb.HelpTipData();
        htd.text = parts[1].trim();
        htd.side = side;
        htd.el = el;
        new SudoNsb.HelpTip(htd);
        el.attr('title', parts[0].trim());
        el.data('HelpTip', htd);
        SudoNsb.HelpTip._addTip(el);
    }
}
SudoNsb.HelpTip.prototype = {
    _element: null
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.HelpTipData

SudoNsb.HelpTipData = function SudoNsb_HelpTipData() {
    /// <field name="el" type="jQueryObject">
    /// </field>
    /// <field name="text" type="String">
    /// </field>
    /// <field name="side" type="Number" integer="true">
    /// </field>
    /// <field name="hash" type="String">
    /// </field>
}
SudoNsb.HelpTipData.prototype = {
    el: null,
    text: null,
    side: 0,
    hash: null
}


////////////////////////////////////////////////////////////////////////////////
// Strings

Strings = function Strings() {
    /// <field name="safeFileNameRx" type="RegExp" static="true">
    /// </field>
    /// <field name="rxSquish" type="RegExp" static="true">
    /// </field>
    /// <field name="rxCompress" type="RegExp" static="true">
    /// </field>
    /// <field name="_allowedTagsRx" type="RegExp" static="true">
    /// </field>
    /// <field name="_timeFormats" type="Array" static="true">
    /// </field>
}
Strings.paraCase = function Strings$paraCase(s) {
    /// <param name="s" type="String">
    /// </param>
    /// <returns type="String"></returns>
    return (s != null) ? s.substr(0, 1).toUpperCase() + s.substr(1) : '';
}
Strings.safeFileName = function Strings$safeFileName(n) {
    /// <param name="n" type="String">
    /// </param>
    /// <returns type="String"></returns>
    return (n != null) ? n.replaceAll('&nbsp;', ' ').replace(Strings.safeFileNameRx, '_').toLowerCase() : '';
}
Strings.filterWordsRx = function Strings$filterWordsRx(str, rx) {
    /// <param name="str" type="String">
    /// </param>
    /// <param name="rx" type="RegExp">
    /// </param>
    /// <returns type="String"></returns>
    return str.replace(rx, '').replace(Strings.rxCompress, ' ').trim();
}
Strings.paraSquishCase = function Strings$paraSquishCase(s) {
    /// <summary>
    /// Paracase and remove all whitespace.
    /// </summary>
    /// <param name="s" type="String">
    /// string to parasquish
    /// </param>
    /// <returns type="String"></returns>
    return (s != null) ? Strings.paraCase(s.replace(Strings.rxSquish, '')) : '';
}
Strings.fnStringify = function Strings$fnStringify(item) {
    /// <summary>
    /// Stringify a funciton.
    /// </summary>
    /// <param name="item" type="Object">
    /// function to stringify
    /// </param>
    /// <returns type="Object"></returns>
    return JSON.stringify(item, function(n, v) {
        return (typeof(v) === 'function') ? v.toString() : v;
    });
}
Strings.stdDate = function Strings$stdDate(date) {
    /// <summary>
    /// Standard date format.
    /// Exmaple: Mon Mar 10 2014 05:31 PM
    /// </summary>
    /// <param name="date" type="Date">
    /// The date.
    /// </param>
    /// <returns type="String"></returns>
    var d = date || new Date();
    return d.toDateString() + d.format(' hh:mm tt');
}
Strings.stdTzDate = function Strings$stdTzDate(date) {
    /// <summary>
    /// Standard date with timezone.
    /// Example: Mon Mar 10 2014 05:31 PM -04:00
    /// </summary>
    /// <param name="date" type="Date">
    /// The date.
    /// </param>
    /// <returns type="String"></returns>
    var d = date || new Date();
    return d.toDateString() + d.format(' hh:mm tt zzz');
}
Strings.timespan = function Strings$timespan(any) {
    /// <param name="any" type="Object">
    /// </param>
    /// <returns type="String"></returns>
    return Strings.niceDate(any);
}
Strings.niceDate = function Strings$niceDate(any) {
    /// <param name="any" type="Object">
    /// </param>
    /// <returns type="String"></returns>
    var time = 0;
    switch (typeof(any)) {
        case 'number':
            time = any;
            break;
        case 'string':
            time = new Date(any).getTime();
            break;
        case 'object':
            if (any.constructor === Date) {
                time = (any).getTime();
            }
            break;
        default:
            time = Date.get_now().getTime();
            break;
    }
    var seconds = (new Date().getTime() - time) / 1000;
    var date = new Date(time);
    var token = 'ago';
    var listChoice = 1;
    if (seconds < 2) {
        return 'Just now';
    }
    if (seconds < 0) {
        seconds = Math.abs(seconds);
        token = 'from now';
        listChoice = 2;
    }
    var i = 0;
    var format;
    while ((format = Strings._timeFormats[i++]) != null) {
        if (seconds < format[0]) {
            if (typeof(format[2]) === 'string') {
                return format[listChoice];
            }
            return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
        }
    }
    return Strings.stdDate(date);
}
Strings.wordJoin = function Strings$wordJoin(s1, s2) {
    /// <param name="s1" type="String">
    /// </param>
    /// <param name="s2" type="String">
    /// </param>
    /// <returns type="String"></returns>
    return ((s1 || '') + ' ' + (s2 || '')).replace(/\s+/g, ' ').trim();
}
Strings.sanitizeTags = function Strings$sanitizeTags(txt) {
    /// <param name="txt" type="String">
    /// </param>
    /// <returns type="String"></returns>
    var idx = Strings._allowedTagsRx.lastIndex = 0;
    var ot = '';
    var mm = Strings._allowedTagsRx.exec(txt);
    while (mm != null) {
        var st = Strings._allowedTagsRx.lastIndex - mm[0].length;
        if (st > idx) {
            ot += txt.substring(idx, st);
        }
        if (mm[4] != null) {
            ot += (mm[4].length > 1) ? mm[4] : '&amp;';
        }
        else if (mm[3] != null) {
            ot += '&gt;';
        }
        else if (mm[2] != null) {
            ot += '&lt;';
        }
        else if (mm[1] != null) {
            ot += mm[1];
        }
        idx = Strings._allowedTagsRx.lastIndex;
        mm = Strings._allowedTagsRx.exec(txt);
    }
    if (idx < txt.length) {
        ot += txt.substr(idx);
    }
    return ot;
}
Strings.reduce = function Strings$reduce(txt) {
    /// <summary>
    /// Reduces multiple spaces on front or end to single spaces
    /// </summary>
    /// <param name="txt" type="String">
    /// string to reduce
    /// </param>
    /// <returns type="String"></returns>
    return txt.replace(/^\s+|\s+$/g, ' ');
}
Strings.times = function Strings$times(t, txt) {
    /// <param name="t" type="Number" integer="true">
    /// </param>
    /// <param name="txt" type="String">
    /// </param>
    /// <returns type="String"></returns>
    var ot = '';
    while ((t--) > 0) {
        ot += txt;
    }
    return ot;
}
Strings.shorten = function Strings$shorten(txt) {
    /// <param name="txt" type="String">
    /// </param>
    /// <returns type="String"></returns>
    txt = txt || '';
    return txt.substr(0, 30) + '...' + txt.substr(Math.max(txt.length - 30, 0));
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.Await

SudoNsb.Await = function SudoNsb_Await() {
    /// <field name="logActions" type="Boolean" static="true">
    /// </field>
    /// <field name="passExceptions" type="Boolean" static="true">
    /// </field>
    /// <field name="_scripts" type="Object" static="true">
    /// </field>
    /// <field name="_simulatedLatency" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="files" type="Object" static="true">
    /// </field>
    /// <field name="awaitTimer" type="AwaitTimers">
    /// </field>
    /// <field name="vars" type="Object">
    /// </field>
    /// <field name="_traceList" type="Array">
    /// </field>
    /// <field name="events" type="Object">
    /// </field>
    /// <field name="abortFlag" type="Boolean">
    /// </field>
    /// <field name="_alwaysAction" type="Function">
    /// </field>
    /// <field name="_awp" type="SudoNsb.Await">
    /// </field>
    /// <field name="_count" type="Number" integer="true">
    /// </field>
    /// <field name="_exceptionHandlers" type="Object">
    /// </field>
    /// <field name="_ignore" type="Boolean">
    /// </field>
    /// <field name="_maxWaitStyleSheet" type="Number" integer="true">
    /// </field>
    /// <field name="_parallelActions" type="Array">
    /// </field>
    /// <field name="_queCount" type="Number" integer="true">
    /// </field>
    /// <field name="_serialActions" type="Array">
    /// </field>
    /// <field name="_serialSaved" type="Array">
    /// </field>
    /// <field name="_thrown" type="Error">
    /// </field>
    /// <field name="thrown" type="Error" static="true">
    /// </field>
    /// <field name="ajaxLoadError" type="String" static="true">
    /// </field>
    this.awaitTimer = new AwaitTimers();
    this.vars = {};
    this._traceList = [];
}
SudoNsb.Await.get_asyncAw = function SudoNsb_Await$get_asyncAw() {
    /// <value type="SudoNsb.Await"></value>
    return new SudoNsb.Await();
}
SudoNsb.Await.requireResultAw = function SudoNsb_Await$requireResultAw(awp, required) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    /// <param name="required" type="Object">
    /// </param>
    if ($.isFunction(required)) {
        var fn = required;
        var ic = fn(awp.get_result());
        if (!ic) {
            awp.abort();
        }
        else {
            awp.done();
        }
        return;
    }
    if (awp.get_result() !== required) {
        awp.abort();
    }
    else {
        awp.done();
    }
}
SudoNsb.Await.trigger = function SudoNsb_Await$trigger(nm, arg) {
    /// <param name="nm" type="String">
    /// </param>
    /// <param name="arg" type="Object">
    /// </param>
    var args = new Array(1);
    args[0] = arg;
    $(document).trigger(nm, args);
}
SudoNsb.Await.halt = function SudoNsb_Await$halt() {
    Snsb.halt = true;
}
SudoNsb.Await.vita = function SudoNsb_Await$vita(key, record) {
    /// <param name="key" type="String">
    /// </param>
    /// <param name="record" type="String">
    /// </param>
    /// <returns type="Object"></returns>
    return (SudoNsb.Await.files[key])[record];
}
SudoNsb.Await.abortAw = function SudoNsb_Await$abortAw(aw) {
    /// <param name="aw" type="SudoNsb.Await">
    /// </param>
    aw.abort();
}
SudoNsb.Await.ignoreAw = function SudoNsb_Await$ignoreAw(aw) {
    /// <param name="aw" type="SudoNsb.Await">
    /// </param>
    aw.done();
}
SudoNsb.Await.finishAw = function SudoNsb_Await$finishAw(aw) {
    /// <param name="aw" type="SudoNsb.Await">
    /// </param>
    aw.finish();
}
SudoNsb.Await.rethrowAw = function SudoNsb_Await$rethrowAw(aw) {
    /// <param name="aw" type="SudoNsb.Await">
    /// </param>
    aw._ignore = true;
    aw._doAlways(function() {
        if (aw.get_awp() != null && aw._thrown != null) {
            aw._proxyVars();
            aw.get_awp().throwEx(aw._thrown);
        }
    });
}
SudoNsb.Await.fileDictionary = function SudoNsb_Await$fileDictionary(key) {
    /// <param name="key" type="String">
    /// </param>
    /// <returns type="Object"></returns>
    return SudoNsb.Await.files[key];
}
SudoNsb.Await._logException = function SudoNsb_Await$_logException(ex, msg) {
    /// <param name="ex" type="Error">
    /// </param>
    /// <param name="msg" type="String">
    /// </param>
    LocalExceptions.logException(ex, msg);
}
SudoNsb.Await.ajaxError = function SudoNsb_Await$ajaxError(exname, msg, request, verboseMsg, fnArgs) {
    /// <param name="exname" type="String">
    /// </param>
    /// <param name="msg" type="String">
    /// </param>
    /// <param name="request" type="jQueryXmlHttpRequest">
    /// </param>
    /// <param name="verboseMsg" type="String">
    /// </param>
    /// <param name="fnArgs" type="Object">
    /// </param>
    /// <returns type="Error"></returns>
    var ex = LocalExceptions.ajaxError(exname, msg, request, verboseMsg, fnArgs);
    return ex;
}
SudoNsb.Await._pathize = function SudoNsb_Await$_pathize(url) {
    /// <param name="url" type="String">
    /// </param>
    /// <returns type="String"></returns>
    return url;
}
SudoNsb.Await.prototype = {
    events: null,
    abortFlag: false,
    _alwaysAction: null,
    _awp: null,
    _count: 0,
    _exceptionHandlers: null,
    _ignore: false,
    _maxWaitStyleSheet: 20000,
    _parallelActions: null,
    _queCount: 0,
    _serialActions: null,
    _serialSaved: null,
    _thrown: null,
    
    get_result: function SudoNsb_Await$get_result() {
        /// <value type="Object"></value>
        return this.get_item('result');
    },
    set_result: function SudoNsb_Await$set_result(value) {
        /// <value type="Object"></value>
        this.set_item('result', value);
        return value;
    },
    
    get_ajaxResult: function SudoNsb_Await$get_ajaxResult() {
        /// <value type="Boolean"></value>
        return this.get_item('ajaxresult');
    },
    set_ajaxResult: function SudoNsb_Await$set_ajaxResult(value) {
        /// <value type="Boolean"></value>
        this.set_item('ajaxresult', value);
        return value;
    },
    
    get_awp: function SudoNsb_Await$get_awp() {
        /// <value type="SudoNsb.Await"></value>
        return this._awp;
    },
    
    _doAlways: function SudoNsb_Await$_doAlways(fn) {
        /// <param name="fn" type="System.Action`1">
        /// </param>
        var my = this;
        if (this._alwaysAction == null) {
            fn(my);
            return;
        }
        this.awaitTimer.setTimeout(ss.Delegate.create(this, function() {
            this._alwaysAction(my);
            fn(my);
        }), 1);
    },
    
    throwEx: function SudoNsb_Await$throwEx(ex) {
        /// <summary>
        /// Throws an exception up the await chain for HandleDx or HandleDl to capture.
        /// </summary>
        /// <param name="ex" type="Error">
        /// The ex.
        /// </param>
        var exType = ((ss.isValue(ex.message)) ? ex.message : 'none').split(':')[0].trim();
        if (this._exceptionHandlers != null && Object.keyExists(this._exceptionHandlers, exType)) {
            Inform.trace(String.format('Handling await exception: {0}', ex));
            var fn = this._exceptionHandlers[exType];
            this._thrown = SudoNsb.Await.thrown = ex;
            fn(this);
            return;
        }
        if (this._awp != null) {
            this._proxyVars();
            this._awp.throwEx(ex);
        }
        else {
            SudoNsb.Await._logException(ex, String.format('Aborting await chain with exception: "{0}"', exType));
            this.abort();
            throw ex;
        }
    },
    
    throwAjax: function SudoNsb_Await$throwAjax(exType, msg, request, verboseMsg, fnArgs) {
        /// <param name="exType" type="String">
        /// </param>
        /// <param name="msg" type="String">
        /// </param>
        /// <param name="request" type="jQueryXmlHttpRequest">
        /// </param>
        /// <param name="verboseMsg" type="String">
        /// </param>
        /// <param name="fnArgs" type="Object">
        /// </param>
        var ex = SudoNsb.Await.ajaxError(exType, msg, request, verboseMsg, fnArgs);
        this.set_result(ex.message);
        this.throwEx(ex);
    },
    
    _doAbort: function SudoNsb_Await$_doAbort() {
        /// <returns type="SudoNsb.Await"></returns>
        this._ignore = true;
        this._doAlways(ss.Delegate.create(this, function() {
            if (this._awp != null) {
                this._proxyVars();
                this._awp.abort();
            }
        }));
        return this;
    },
    
    _actionClosure: function SudoNsb_Await$_actionClosure(f) {
        /// <param name="f" type="Function">
        /// </param>
        var my = this;
        this.awaitTimer.setTimeout(function() {
            f(my);
        }, 1);
    },
    
    _logDoFn: function SudoNsb_Await$_logDoFn(fn, arg1, arg2, arg3) {
        /// <param name="fn" type="Object">
        /// </param>
        /// <param name="arg1" type="Object">
        /// </param>
        /// <param name="arg2" type="Object">
        /// </param>
        /// <param name="arg3" type="Object">
        /// </param>
        if (!SudoNsb.Await.logActions) {
            return;
        }
        var t = fn._targets;
        if (ss.isValue(t)) {
            var args = '()';
            if (ss.isValue(arg1)) {
                args = String.format('({0},{1},{2})', arg1, arg2, arg3);
            }
            if (t.length > 1 && ss.isValue(t[1])) {
                var a = fn._targets[1].name;
                if (ss.isValue(a) && !String.isNullOrEmpty(a)) {
                    Inform.debug(String.format('Await doing {0}{1}', a, args));
                }
                else {
                    a = Type.getInstanceType(fn._targets[0]).get_name();
                    Inform.debug(String.format('Await doing (anonymous delegate){0}{1}', a, args));
                }
            }
        }
    },
    
    _proxyVars: function SudoNsb_Await$_proxyVars() {
        if (this._awp != null) {
            var $dict1 = this.vars;
            for (var $key2 in $dict1) {
                var p = { key: $key2, value: $dict1[$key2] };
                this._awp.vars[p.key] = p.value;
            }
        }
    },
    
    _loadScriptWait: function SudoNsb_Await$_loadScriptWait(url) {
        /// <param name="url" type="String">
        /// </param>
        if (!SudoNsb.Await._scripts[url]) {
            this.awaitTimer.startDelayedSpinner();
            this.awaitTimer.setTimeout(ss.Delegate.create(this, function() {
                this._loadScriptWait(url);
            }), 13);
        }
        else {
            this.awaitTimer.stopDelayedSpinner();
            this.done();
        }
    },
    
    que: function SudoNsb_Await$que(fn) {
        /// <param name="fn" type="Function">
        /// </param>
        /// <returns type="SudoNsb.Await"></returns>
        if (this._parallelActions == null) {
            this._parallelActions = [];
        }
        this._parallelActions.add(ss.Delegate.create(this, function(aw) {
            if (Snsb.halt) {
                return;
            }
            this._logDoFn(fn);
            if (SudoNsb.Await.passExceptions) {
                fn(aw);
                return;
            }
            try {
                fn(aw);
            }
            catch (ex) {
                this.throwEx(ex);
            }
        }));
        this._count++;
        this._queCount++;
        return this;
    },
    
    addDl: function SudoNsb_Await$addDl(fn) {
        /// <param name="fn" type="Function">
        /// </param>
        /// <returns type="SudoNsb.Await"></returns>
        if (this._serialSaved == null) {
            this._serialSaved = [];
        }
        this._serialSaved.add(ss.Delegate.create(this, function(aw) {
            if (Snsb.halt) {
                return;
            }
            this._logDoFn(fn);
            if (SudoNsb.Await.passExceptions) {
                fn(aw);
                return;
            }
            try {
                fn(aw);
            }
            catch (ex) {
                this.throwEx(ex);
            }
        }));
        this._count++;
        return this;
    },
    
    addDx: function SudoNsb_Await$addDx(fn) {
        /// <param name="fn" type="Function">
        /// </param>
        /// <returns type="SudoNsb.Await"></returns>
        if (this._serialSaved == null) {
            this._serialSaved = [];
        }
        this._serialSaved.add(ss.Delegate.create(this, function(aw) {
            if (Snsb.halt) {
                return;
            }
            this._logDoFn(fn);
            if (SudoNsb.Await.passExceptions) {
                fn(aw);
                aw.done();
                return;
            }
            try {
                fn(aw);
                aw.done();
            }
            catch (ex) {
                this.throwEx(ex);
            }
        }));
        this._count++;
        return this;
    },
    
    addAw: function SudoNsb_Await$addAw(fn, arg1, arg2, arg3, arg4) {
        /// <param name="fn" type="System.Action`5">
        /// </param>
        /// <param name="arg1" type="Object">
        /// </param>
        /// <param name="arg2" type="Object">
        /// </param>
        /// <param name="arg3" type="Object">
        /// </param>
        /// <param name="arg4" type="Object">
        /// </param>
        /// <returns type="SudoNsb.Await"></returns>
        if (this._serialSaved == null) {
            this._serialSaved = [];
        }
        this._serialSaved.add(ss.Delegate.create(this, function(aw) {
            this._logDoFn(fn, arg1, arg2, arg3);
            if (SudoNsb.Await.passExceptions) {
                fn(aw, arg1, arg2, arg3, arg4);
                return;
            }
            try {
                fn(aw, arg1, arg2, arg3, arg4);
            }
            catch (ex) {
                this.throwEx(ex);
            }
        }));
        this._count++;
        return this;
    },
    
    queFn: function SudoNsb_Await$queFn(fn) {
        /// <param name="fn" type="Function">
        /// </param>
        /// <returns type="SudoNsb.Await"></returns>
        this.que(ss.Delegate.create(this, function(aw) {
            if (Snsb.halt) {
                return;
            }
            this._logDoFn(fn);
            if (SudoNsb.Await.passExceptions) {
                fn();
                aw.done();
                return;
            }
            try {
                fn();
                aw.done();
            }
            catch (ex) {
                this.throwEx(ex);
            }
        }));
        return this;
    },
    
    addFn: function SudoNsb_Await$addFn(fn, arg1, arg2) {
        /// <param name="fn" type="System.Action`2">
        /// </param>
        /// <param name="arg1" type="Object">
        /// </param>
        /// <param name="arg2" type="Object">
        /// </param>
        /// <returns type="SudoNsb.Await"></returns>
        if (this._serialSaved == null) {
            this._serialSaved = [];
        }
        this._serialSaved.add(ss.Delegate.create(this, function(aw) {
            if (Snsb.halt) {
                return;
            }
            this._logDoFn(fn, arg1, arg2);
            if (SudoNsb.Await.passExceptions) {
                fn(arg1, arg2);
                aw.done();
                return;
            }
            try {
                fn(arg1, arg2);
                aw.done();
            }
            catch (ex) {
                this.throwEx(ex);
            }
        }));
        this._count++;
        return this;
    },
    
    addEv: function SudoNsb_Await$addEv(name, fn) {
        /// <param name="name" type="String">
        /// </param>
        /// <param name="fn" type="Function">
        /// </param>
        /// <returns type="SudoNsb.Await"></returns>
        if (this.events == null) {
            this.events = {};
        }
        this.events[name] = fn;
        return this;
    },
    
    doneWith: function SudoNsb_Await$doneWith(n, v) {
        /// <param name="n" type="String">
        /// </param>
        /// <param name="v" type="Object">
        /// </param>
        this.vars[n] = v;
        this.done();
    },
    
    done: function SudoNsb_Await$done(result) {
        /// <param name="result" type="Object">
        /// </param>
        /// <returns type="SudoNsb.Await"></returns>
        if (arguments.length > 0) {
            this.set_result(result);
        }
        if (this._ignore || Snsb.halt) {
            return this;
        }
        if (this.abortFlag) {
            return this._doAbort();
        }
        if (this._traceList.length > 0) {
            var msg = this._traceList[this._traceList.length - 1];
            this._traceList.removeAt(this._traceList.length - 1);
            Inform.trace('Done: ' + msg);
        }
        this._count--;
        this._queCount--;
        return this._next();
    },
    
    exit: function SudoNsb_Await$exit(result) {
        /// <param name="result" type="Object">
        /// </param>
        /// <returns type="SudoNsb.Await"></returns>
        if (arguments.length > 0) {
            this.set_result(result);
        }
        if (this._ignore || Snsb.halt) {
            return this;
        }
        if (this.abortFlag) {
            return this._doAbort();
        }
        if (this._traceList.length > 0) {
            var msg = this._traceList[this._traceList.length - 1];
            this._traceList.removeAt(this._traceList.length - 1);
            Inform.trace('Exit: ' + msg);
        }
        this.finish();
        return this;
    },
    
    abortWhen: function SudoNsb_Await$abortWhen(fn) {
        /// <param name="fn" type="System.Func`2">
        /// </param>
        /// <returns type="SudoNsb.Await"></returns>
        return this.addDl(ss.Delegate.create(this, function() {
            var ic;
            if (typeof(fn) === 'function') {
                ic = fn(this);
            }
            else {
                ic = fn;
            }
            if (ic === this.get_result()) {
                this.abort();
            }
            else {
                this.done();
            }
        }));
    },
    
    insertDl: function SudoNsb_Await$insertDl(fn) {
        /// <param name="fn" type="Function">
        /// </param>
        /// <returns type="SudoNsb.Await"></returns>
        if (!this.abortFlag) {
            ss.Debug.assert(fn != null, 'InsertDl fn != null');
            this._serialActions.insert(0, fn);
            this._count++;
        }
        return this;
    },
    
    always: function SudoNsb_Await$always(fn) {
        /// <param name="fn" type="Function">
        /// </param>
        /// <returns type="SudoNsb.Await"></returns>
        this._alwaysAction = fn;
        return this;
    },
    
    handleDl: function SudoNsb_Await$handleDl(exceptionName, fn) {
        /// <summary>
        /// Handles the specified exception requiring Done() in the handler code.
        /// Exceptions are thrown using ThrowEx
        /// </summary>
        /// <param name="exceptionName" type="String">
        /// Name of the exception.
        /// </param>
        /// <param name="fn" type="Function">
        /// The action to perform. Must envoke Done.
        /// </param>
        /// <returns type="SudoNsb.Await"></returns>
        if (this._exceptionHandlers == null) {
            this._exceptionHandlers = {};
        }
        this._exceptionHandlers[exceptionName] = fn;
        return this;
    },
    
    handleDx: function SudoNsb_Await$handleDx(exceptionName, fn) {
        /// <summary>
        /// Handles the specified exception with automatic Done() being done at the end.
        /// Exceptions are thrown using ThrowEx
        /// </summary>
        /// <param name="exceptionName" type="String">
        /// Name of the exception.
        /// </param>
        /// <param name="fn" type="Function">
        /// The action to perform.
        /// </param>
        /// <returns type="SudoNsb.Await"></returns>
        return this.handleDl(exceptionName, ss.Delegate.create(this, function() {
            fn(this);
            this.done();
        }));
    },
    
    abort: function SudoNsb_Await$abort() {
        /// <returns type="SudoNsb.Await"></returns>
        this.abortFlag = true;
        return this._doAbort();
    },
    
    sleep: function SudoNsb_Await$sleep(ms) {
        /// <param name="ms" type="Number" integer="true">
        /// </param>
        /// <returns type="SudoNsb.Await"></returns>
        return this.addDl(ss.Delegate.create(this, function() {
            this.awaitTimer.setTimeout(ss.Delegate.create(this, function() {
                this.done();
            }), ms);
        }));
    },
    
    _waitAw: function SudoNsb_Await$_waitAw(awp, waitTarget) {
        /// <summary>
        /// Waits until a wait target object is satisfied.
        /// </summary>
        /// <param name="awp" type="SudoNsb.Await">
        /// The awp.
        /// </param>
        /// <param name="waitTarget" type="Object">
        /// The wait target object
        /// </param>
        var t = waitTarget;
        t.targetMs = (t.targetMs || (Date.get_now().getTime() + 300000));
        if (Date.get_now().getTime() - t.startMs >= 300000) {
            if (t.targetMs - t.startMs < 300000) {
                Inform.error('waited more than 5 minutes for {0}', t.fn.toString());
            }
        }
        if (t.fn()) {
            awp.done(true);
            return;
        }
        if (Date.get_now().getTime() >= t.targetMs) {
            this._waitTimeoutAw(awp, t);
            return;
        }
        this.awaitTimer.setTimeout(ss.Delegate.create(this, function() {
            this._waitAw(awp, t);
        }), 13);
    },
    
    _waitTimeoutAw: function SudoNsb_Await$_waitTimeoutAw(awp, t) {
        /// <param name="awp" type="SudoNsb.Await">
        /// </param>
        /// <param name="t" type="SudoNsb.WaitTarget">
        /// </param>
        Inform.trace(String.format('WaitAw waited {0} for {1}', t.targetMs, t.fn));
        if (t.abortOnFail) {
            Inform.error('Wait aborted');
            awp.abort();
        }
        else {
            awp.done(false);
        }
    },
    
    waitDx: function SudoNsb_Await$waitDx(fn, maxWaitMs) {
        /// <summary>
        /// Waits for return true from the function.
        /// </summary>
        /// <param name="fn" type="Function">
        /// The function to test for true.
        /// </param>
        /// <param name="maxWaitMs" type="Number" integer="true">
        /// The max wait ms. If negative, the await will abort upon maximum time. If not given waits 5 minutes.
        /// </param>
        /// <returns type="SudoNsb.Await"></returns>
        var t = new SudoNsb.WaitTarget();
        t.startMs = Date.get_now().getTime();
        t.fn = fn;
        if (maxWaitMs < 0) {
            maxWaitMs = -maxWaitMs;
            t.abortOnFail = true;
        }
        t.targetMs = Date.get_now().getTime() + (maxWaitMs || 300000);
        return this.addAw(ss.Delegate.create(this, this._waitAw), t);
    },
    
    simulateAsync: function SudoNsb_Await$simulateAsync() {
        /// <returns type="SudoNsb.Await"></returns>
        return this.addDl(ss.Delegate.create(this, function() {
            this.awaitTimer.setTimeout(ss.Delegate.create(this, function() {
                this.done();
            }), SudoNsb.Await._simulatedLatency);
        }));
    },
    
    commit: function SudoNsb_Await$commit(awp) {
        /// <param name="awp" type="SudoNsb.Await">
        /// </param>
        /// <returns type="SudoNsb.Await"></returns>
        this.awaitTimer.clearAll();
        this._ignore = this.abortFlag = false;
        this._awp = (ss.isValue(awp)) ? awp : null;
        if (this._serialSaved != null) {
            this._serialActions = this._serialSaved.clone();
        }
        this._queCount = (this._parallelActions == null) ? 0 : this._parallelActions.length;
        this._count = (this._serialActions == null) ? 0 : this._serialActions.length + this._queCount;
        return this._doActions();
    },
    
    _doActions: function SudoNsb_Await$_doActions() {
        /// <returns type="SudoNsb.Await"></returns>
        if (this._queCount > 0) {
            var $enum1 = ss.IEnumerator.getEnumerator(this._parallelActions);
            while ($enum1.moveNext()) {
                var f = $enum1.current;
                if (this.abortFlag) {
                    return this._doAbort();
                }
                this._actionClosure(f);
            }
        }
        else {
            this._next();
        }
        return this;
    },
    
    _next: function SudoNsb_Await$_next() {
        /// <returns type="SudoNsb.Await"></returns>
        if (this._ignore) {
            return this;
        }
        if (this.abortFlag) {
            return this._doAbort();
        }
        var my = this;
        if (this._queCount <= 0 && this._count > 0) {
            var f = this._serialActions[0];
            this._serialActions.removeAt(0);
            this.awaitTimer.setTimeout(function() {
                f(my);
            }, 1);
            return this;
        }
        if (this._count <= 0) {
            this.finish();
        }
        return this;
    },
    
    finish: function SudoNsb_Await$finish() {
        this._ignore = true;
        this._doAlways(ss.Delegate.create(this, function() {
            if (ss.isValue(this._awp)) {
                this._proxyVars();
                this._awp.done();
            }
        }));
    },
    
    loadAndDo: function SudoNsb_Await$loadAndDo(url, className, opts, e) {
        /// <param name="url" type="String">
        /// </param>
        /// <param name="className" type="String">
        /// </param>
        /// <param name="opts" type="Object">
        /// </param>
        /// <param name="e" type="jQueryEvent">
        /// </param>
        /// <returns type="SudoNsb.Await"></returns>
        opts = opts || {};
        this.loadScript(url);
        this.addDx(function() {
            try {
                var p = className.split('.');
                var fn = window[p[0]][p[1]];
                fn(e, opts);
            }
            catch (ex) {
                SudoNsb.Await._logException(ex, String.format('LoadAndDo({0}, {1})', url, className));
            }
        });
        return this;
    },
    
    loadScript: function SudoNsb_Await$loadScript(url, cache) {
        /// <param name="url" type="String">
        /// </param>
        /// <param name="cache" type="Boolean">
        /// </param>
        /// <returns type="SudoNsb.Await"></returns>
        var fnArgs = 'Await.LoadScript';
        if (url == null) {
            return this;
        }
        url = url.trim();
        this.addDl(ss.Delegate.create(this, function() {
            if (!window.jQuery || window.jQuery !== window.$) {
                debugger;
            }
            if (!Object.keyExists(SudoNsb.Await._scripts, url)) {
                var options = {};
                options.url = url;
                options.dataType = 'script';
                options.cache = cache;
                options.success = function() {
                    SudoNsb.Await._scripts[url] = true;
                };
                options.error = ss.Delegate.create(this, function(request, textStatus, error) {
                    this.throwEx(SudoNsb.Await.ajaxError('Ajax Load Error', url, request, textStatus, fnArgs));
                });
                $.ajax(options);
                SudoNsb.Await._scripts[url] = false;
                this._loadScriptWait(url);
            }
            else if (!SudoNsb.Await._scripts[url]) {
                this._loadScriptWait(url);
            }
            else {
                this.done();
            }
        }));
        return this;
    },
    
    loadJson: function SudoNsb_Await$loadJson(name, url) {
        /// <param name="name" type="String">
        /// </param>
        /// <param name="url" type="String">
        /// </param>
        /// <returns type="SudoNsb.Await"></returns>
        var fnArgs = 'Await.LoadJson';
        return this.addDl(ss.Delegate.create(this, function() {
            var options = {};
            options.url = url;
            options.dataType = 'json';
            options.type = 'GET';
            options.cache = false;
            options.success = ss.Delegate.create(this, function(data, textStatus, request1) {
                if (name != null) {
                    SudoNsb.Await.files[name] = data;
                }
                this.done();
            });
            options.error = ss.Delegate.create(this, function(request, textStatus, error) {
                if (name != null) {
                    SudoNsb.Await.files[name] = null;
                }
                this.throwEx(SudoNsb.Await.ajaxError('Ajax Load Error', url, request, textStatus, fnArgs));
            });
            $.ajax(options);
        }));
    },
    
    loadText: function SudoNsb_Await$loadText(name, url) {
        /// <param name="name" type="String">
        /// </param>
        /// <param name="url" type="String">
        /// </param>
        /// <returns type="SudoNsb.Await"></returns>
        var fnArgs = 'Await.LoadText';
        return this.addDl(ss.Delegate.create(this, function() {
            var options = {};
            options.url = url;
            options.dataType = 'html';
            options.type = 'GET';
            options.cache = false;
            options.success = ss.Delegate.create(this, function(data, textStatus, request1) {
                SudoNsb.Await.files[name] = data;
                this.done();
            });
            options.error = ss.Delegate.create(this, function(request, textStatus, error) {
                this.throwEx(SudoNsb.Await.ajaxError('Ajax Load Error', url, request, textStatus, fnArgs));
            });
            $.ajax(options);
        }));
    },
    
    loadCss: function SudoNsb_Await$loadCss(url) {
        /// <param name="url" type="String">
        /// </param>
        /// <returns type="SudoNsb.Await"></returns>
        var urlKey = SudoNsb.Await._pathize(url);
        return this.addDl(ss.Delegate.create(this, function() {
            var sheet;
            if (Object.keyExists(SudoNsb.Await.files, urlKey)) {
                this.done();
                return;
            }
            sheet = this._hasStyleSheet(urlKey);
            if (sheet != null) {
                SudoNsb.Await.files[urlKey] = sheet;
                this.done();
                return;
            }
            var css = $('<link/>').attr({ rel: 'stylesheet', type: 'text/css', href: url });
            css.appendTo('head');
            if (('styleSheets' in window.document)) {
                var mark = new Date().getTime() + this._maxWaitStyleSheet;
                var tmr = 0;
                tmr = this.awaitTimer.setInterval(ss.Delegate.create(this, function() {
                    sheet = this._hasStyleSheet(urlKey);
                    if (sheet != null || new Date().getTime() > mark) {
                        this.awaitTimer.clearTimer(tmr);
                        SudoNsb.Await.files[urlKey] = sheet;
                        this.done();
                    }
                }), 5);
            }
            else {
                this.awaitTimer.setTimeout(ss.Delegate.create(this, function() {
                    this.done();
                }), 250);
            }
        }));
    },
    
    _hasStyleSheet: function SudoNsb_Await$_hasStyleSheet(url) {
        /// <param name="url" type="String">
        /// </param>
        /// <returns type="SudoNsb.DynamicStyleSheet"></returns>
        var stylesheets = window.document.styleSheets;
        var $enum1 = ss.IEnumerator.getEnumerator(stylesheets);
        while ($enum1.moveNext()) {
            var sheet = $enum1.current;
            if (!String.isNullOrEmpty(sheet.href) && sheet.href.indexOf(url) >= 0) {
                return sheet;
            }
        }
        return null;
    },
    get_item: function SudoNsb_Await$get_item(n) {
        /// <param name="n" type="String">
        /// </param>
        /// <param name="value" type="Object">
        /// </param>
        /// <returns type="Object"></returns>
        return this.vars[(n.substr(0, 1) === '@') ? n.substr(1) : n];
    },
    set_item: function SudoNsb_Await$set_item(n, value) {
        /// <param name="n" type="String">
        /// </param>
        /// <param name="value" type="Object">
        /// </param>
        /// <returns type="Object"></returns>
        n = (n.substr(0, 1) === '@') ? n.substr(1) : n;
        this.vars[n] = value;
        return value;
    }
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.WaitTarget

SudoNsb.WaitTarget = function SudoNsb_WaitTarget() {
    /// <field name="abortOnFail" type="Boolean">
    /// </field>
    /// <field name="fn" type="Function">
    /// </field>
    /// <field name="startMs" type="Number" integer="true">
    /// </field>
    /// <field name="targetMs" type="Number" integer="true">
    /// </field>
}
SudoNsb.WaitTarget.prototype = {
    abortOnFail: false,
    fn: null,
    startMs: 0,
    targetMs: 0
}


////////////////////////////////////////////////////////////////////////////////
// AwaitTimers

AwaitTimers = function AwaitTimers() {
    /// <field name="_timers" type="Object">
    /// </field>
    /// <field name="_delayedSpinner" type="Number" integer="true" static="true">
    /// </field>
    this._timers = {};
}
AwaitTimers.prototype = {
    
    setTimeout: function AwaitTimers$setTimeout(fn, ms) {
        /// <param name="fn" type="Function">
        /// </param>
        /// <param name="ms" type="Number" integer="true">
        /// </param>
        /// <returns type="Number" integer="true"></returns>
        var t = window.setTimeout(fn, ms);
        this._timers[t] = clearTimeout;
        return t;
    },
    
    setInterval: function AwaitTimers$setInterval(fn, ms) {
        /// <param name="fn" type="Function">
        /// </param>
        /// <param name="ms" type="Number" integer="true">
        /// </param>
        /// <returns type="Number" integer="true"></returns>
        var t = window.setInterval(fn, ms);
        this._timers[t] = clearInterval;
        return t;
    },
    
    clearTimer: function AwaitTimers$clearTimer(timer) {
        /// <param name="timer" type="Number" integer="true">
        /// </param>
        /// <returns type="Number" integer="true"></returns>
        var fn = this._timers[timer];
        if (fn != null) {
            var ret = fn(timer);
            delete this._timers[timer];
            return ret;
        }
        return 0;
    },
    
    clearAll: function AwaitTimers$clearAll() {
        var $dict1 = this._timers;
        for (var $key2 in $dict1) {
            var p = { key: $key2, value: $dict1[$key2] };
            this.clearTimer(p.key);
        }
    },
    
    startDelayedSpinner: function AwaitTimers$startDelayedSpinner() {
        return;
        if (AwaitTimers._delayedSpinner > 0) {
            return;
        }
        console.log('Starting delayed spinner');
        AwaitTimers._delayedSpinner = window.setTimeout(function() {
            SudoNsb.Await.trigger('Spinner', true);
        }, 3000);
    },
    
    stopDelayedSpinner: function AwaitTimers$stopDelayedSpinner() {
        return;
        console.log('Stopping delayed spinner');
        SudoNsb.Await.trigger('Spinner', false);
        var sv = AwaitTimers._delayedSpinner;
        AwaitTimers._delayedSpinner = 0;
        window.clearTimeout(sv);
    }
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.Files

SudoNsb.Files = function SudoNsb_Files() {
    /// <field name="getUrl" type="String" static="true">
    /// </field>
    /// <field name="storeUrl" type="String" static="true">
    /// </field>
}
SudoNsb.Files.data = function SudoNsb_Files$data(data) {
    /// <param name="data" type="Object">
    /// </param>
    /// <returns type="Object"></returns>
    return { Data: JSON.stringify(data) };
}
SudoNsb.Files.storeDataAw = function SudoNsb_Files$storeDataAw(awp, path, file, content, is64Already) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    /// <param name="path" type="String">
    /// </param>
    /// <param name="file" type="String">
    /// </param>
    /// <param name="content" type="String">
    /// </param>
    /// <param name="is64Already" type="Boolean">
    /// </param>
    var fnArgs = 'Files.StorDataAw';
    new SudoNsb.Await().addAw(BrowserUser.waitSessionLockAw).addDl(function(aw) {
        var opts = {};
        opts.url = SudoNsb.Files.storeUrl;
        opts.dataType = 'jsonp';
        opts.type = 'POST';
        opts.data = { password: BrowserUser.password, path: path, file: file, createFile: true, createPath: true };
        if (is64Already) {
            (opts.data)['content64'] = content;
        }
        else {
            (opts.data)['content64'] = SudoNsb.Encoder.encode64(content);
        }
        opts.success = function() {
            aw.done();
        };
        opts.error = function(request, textStatus, error) {
            awp.throwAjax('Ajax Load Error', path, request, textStatus, fnArgs);
        };
        $.ajax(opts);
    }).commit(awp);
}
SudoNsb.Files.getDataAw = function SudoNsb_Files$getDataAw(awp, path, file) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    /// <param name="path" type="String">
    /// </param>
    /// <param name="file" type="String">
    /// </param>
    var fnArgs = 'Files.GetDataAw';
    new SudoNsb.Await().addAw(BrowserUser.waitSessionLockAw).addDl(function(aw) {
        var opts = {};
        opts.url = SudoNsb.Files.getUrl;
        opts.type = 'POST';
        opts.dataType = 'jsonp';
        opts.data = { password: BrowserUser.password, path: path, file: file };
        opts.success = function(data, textStatus, request) {
            try {
                if (data != null) {
                    var d = data;
                    aw.done(d['content']);
                    return;
                }
            }
            catch ($e1) {
            }
            aw.done(null);
        };
        opts.error = function(request, textStatus, error) {
            var ex = LocalExceptions.ajaxError('Ajax Load Error', path, request, textStatus, fnArgs);
            awp.throwEx(ex);
        };
        $.ajax(opts);
    }).commit(awp);
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.Metrics

SudoNsb.Metrics = function SudoNsb_Metrics() {
}
SudoNsb.Metrics.documentWidth = function SudoNsb_Metrics$documentWidth(docTag) {
    /// <param name="docTag" type="jQueryObject">
    /// </param>
    /// <returns type="Number" integer="true"></returns>
    return $(docTag || $($(document))).width();
}
SudoNsb.Metrics.documentHeight = function SudoNsb_Metrics$documentHeight(docTag) {
    /// <param name="docTag" type="jQueryObject">
    /// </param>
    /// <returns type="Number" integer="true"></returns>
    return $(docTag || $($(document))).height();
}
SudoNsb.Metrics.windowWidth = function SudoNsb_Metrics$windowWidth() {
    /// <returns type="Number" integer="true"></returns>
    return SudoNsb.Metrics._fFilterResults((ss.isValue(window.self.innerWidth)) ? window.self.innerWidth : 0, (ss.isValue(document.documentElement)) ? document.documentElement.clientWidth : 0, (ss.isValue(document.body)) ? document.body.clientWidth : 0);
}
SudoNsb.Metrics.windowHeight = function SudoNsb_Metrics$windowHeight() {
    /// <returns type="Number" integer="true"></returns>
    return SudoNsb.Metrics._fFilterResults((ss.isValue(window.self.innerHeight)) ? window.self.innerHeight : 0, (ss.isValue(document.documentElement)) ? document.documentElement.clientHeight : 0, (ss.isValue(document.body)) ? document.body.clientHeight : 0);
}
SudoNsb.Metrics._fFilterResults = function SudoNsb_Metrics$_fFilterResults(nWin, nDocel, nBody) {
    /// <param name="nWin" type="Number" integer="true">
    /// </param>
    /// <param name="nDocel" type="Number" integer="true">
    /// </param>
    /// <param name="nBody" type="Number" integer="true">
    /// </param>
    /// <returns type="Number" integer="true"></returns>
    var n_result = nWin ? nWin : 0; if (nDocel && (!n_result || (n_result > nDocel))) n_result = nDocel;;
    return nBody && (!n_result || (n_result > nBody)) ? nBody : n_result;;
}
SudoNsb.Metrics._scrollBarWidth = function SudoNsb_Metrics$_scrollBarWidth() {
    /// <returns type="Number" integer="true"></returns>
    var div = $("<div style='width:50px;height:50px;overflow:hidden;position:absolute;top:200px;left:200px;'><div style='height:100px;'></div></div>").appendTo(document.body);
    var d2 = div.find('div');
    var w1 = d2[0].offsetWidth;
    div.css('overflow-y', 'scroll');
    var w2 = div[0].clientWidth;
    div.remove();
    return (w1 - w2);
}
SudoNsb.Metrics.textMetrics = function SudoNsb_Metrics$textMetrics(host, text) {
    /// <param name="host" type="jQueryObject">
    /// </param>
    /// <param name="text" type="String">
    /// </param>
    /// <returns type="Array" elementType="Number" elementInteger="true"></returns>
    var el = $("<div style='display:inline-block'/>").appendTo(document.body).css({ 'font-family': host.css('font-family'), 'font-size': host.css('font-size'), 'line-height': host.css('line-height') }).html(text);
    var ot = new Array(2);
    ot[0] = el.innerWidth();
    ot[1] = el.innerHeight();
    el.remove();
    if ($.browser.msie) {
        ot[0] += 1;
    }
    return ot;
}
SudoNsb.Metrics.ownerWindow = function SudoNsb_Metrics$ownerWindow(el) {
    /// <param name="el" type="jQueryObject">
    /// </param>
    /// <returns type="jQueryObject"></returns>
    return $(el[0].ownerDocument.defaultView || el[0].ownerDocument.parentWindow);
}
SudoNsb.Metrics.ownerDocument = function SudoNsb_Metrics$ownerDocument(el) {
    /// <param name="el" type="jQueryObject">
    /// </param>
    /// <returns type="jQueryObject"></returns>
    return $(el[0].ownerDocument);
}
SudoNsb.Metrics.ownerBody = function SudoNsb_Metrics$ownerBody(el) {
    /// <param name="el" type="jQueryObject">
    /// </param>
    /// <returns type="jQueryObject"></returns>
    return $(el[0].ownerDocument.body);
}


////////////////////////////////////////////////////////////////////////////////
// MyCss

MyCss = function MyCss() {
    /// <field name="_styles" type="Object" static="true">
    /// </field>
    /// <field name="alsoInjectToTop" type="Boolean" static="true">
    /// </field>
}
MyCss._addStyle = function MyCss$_addStyle(style, name) {
    /// <param name="style" type="String">
    /// </param>
    /// <param name="name" type="String">
    /// </param>
    /// <returns type="jQueryObject"></returns>
    if (MyCss.alsoInjectToTop && top !== self) {
        $("<style type='text/css'/>").append(style).appendTo($('head', top.document));
    }
    var stl = $("<style type='text/css'/>").append(style).appendTo('head');
    if (name != null) {
        stl.attr('name', name);
    }
    return stl;
}
MyCss.addStyleOnce = function MyCss$addStyleOnce(name, style) {
    /// <param name="name" type="String">
    /// </param>
    /// <param name="style" type="String">
    /// </param>
    /// <returns type="jQueryObject"></returns>
    var ret = null;
    if (MyCss._styles == null) {
        MyCss._styles = {};
    }
    style = (((arguments.length > 1) ? style : name) || '').trim();
    if (!String.isNullOrEmpty(style) && MyCss._styles[name] == null) {
        ret = MyCss._styles[name] = MyCss._addStyle(style, (arguments.length > 1 && name.indexOf('{') === -1) ? name : Snsb.get_newId());
    }
    return ret;
}
MyCss.addStyleTag = function MyCss$addStyleTag(url) {
    /// <param name="url" type="String">
    /// </param>
    if (!window.jQuery || window.jQuery !== window.$) {
        debugger;
    }
    $("<link rel='stylesheet' type='text/css' href='" + Uri.versionize(url) + "'>").appendTo('head');
}
MyCss.removeStyles = function MyCss$removeStyles() {
    if (MyCss._styles == null) {
        return;
    }
    var $dict1 = MyCss._styles;
    for (var $key2 in $dict1) {
        var p = { key: $key2, value: $dict1[$key2] };
        p.value.detach();
    }
}
MyCss.restoreStyles = function MyCss$restoreStyles() {
    if (MyCss._styles == null) {
        return;
    }
    var head = $('head');
    var $dict1 = MyCss._styles;
    for (var $key2 in $dict1) {
        var p = { key: $key2, value: $dict1[$key2] };
        p.value.appendTo(head);
    }
}
MyCss.hashId = function MyCss$hashId(id) {
    /// <param name="id" type="String">
    /// </param>
    /// <returns type="String"></returns>
    return (id.charAt(0) === '#') ? id : '#' + id;
}
MyCss.hashClass = function MyCss$hashClass(cls) {
    /// <param name="cls" type="String">
    /// </param>
    /// <returns type="String"></returns>
    return (cls.charAt(0) === '.') ? cls : '.' + cls;
}


////////////////////////////////////////////////////////////////////////////////
// Rx

Rx = function Rx() {
    /// <field name="hasEndSpace" type="RegExp" static="true">
    /// </field>
    /// <field name="whiteSpace" type="RegExp" static="true">
    /// </field>
    /// <field name="cssFilter" type="RegExp" static="true">
    /// </field>
    /// <field name="emailFilter" type="RegExp" static="true">
    /// </field>
    /// <field name="placeholder" type="String" static="true">
    /// </field>
}
Rx.prettyJson = function Rx$prettyJson(jo, indent) {
    /// <param name="jo" type="Object">
    /// </param>
    /// <param name="indent" type="String">
    /// </param>
    /// <returns type="String"></returns>
    try {
        return JSON.stringify(jo, function(n, o) {
            return o;
        }, indent || '\t');
    }
    catch (ex) {
        Inform.warn(ex.message);
    }
    return '';
}
Rx.addCommas = function Rx$addCommas(num) {
    /// <param name="num" type="String">
    /// </param>
    /// <returns type="String"></returns>
    return num.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
}
Rx.fnStringify = function Rx$fnStringify(item) {
    /// <summary>
    /// Stringify a funciton.
    /// </summary>
    /// <param name="item" type="Object">
    /// function to stringify
    /// </param>
    /// <returns type="Object"></returns>
    return JSON.stringify(item, function(n, v) {
        return (typeof(v) === 'function') ? v.toString() : v;
    });
}
Rx.reCast = function Rx$reCast(_class, tp) {
    /// <param name="_class" type="Object">
    /// </param>
    /// <param name="tp" type="Type">
    /// </param>
    /// <returns type="Object"></returns>
    var nc = eval('new ' + tp.get_fullName() + '()');
    nc = $.extend(nc, _class);
    return nc;
}
Rx.reClass = function Rx$reClass(_class) {
    /// <param name="_class" type="Object">
    /// </param>
    /// <returns type="Object"></returns>
    if (_class == null || typeof(_class) !== 'object') {
        return _class;
    }
    for (var n in _class) {if (n.charAt(0) !== '_' && n.charAt(0) !== '$' && typeof(_class[n]) === 'object') _class[n] = Rx.reClass(_class[n]);};
    var nc;
    try {
        if (_class.__classname__) {
            nc = eval('new ' + _class.__classname__ + '()');
            nc = $.extend(nc, _class);
            delete nc.__classname__;
        }
        else {
            nc = _class;
        }
    }
    catch ($e1) {
        if (_class.__classname__) {
            Inform.warn('Unable to reconstruct {0} class', _class.__classname__);
        }
        return _class;
    }
    return nc;
}
Rx.typeClass = function Rx$typeClass(_class) {
    /// <param name="_class" type="Object">
    /// </param>
    if (_class == null || typeof(_class) !== 'object') {
        return;
    }
    var t;
    if ((t = Type.getInstanceType(_class).get_fullName()) !== 'Object') {
        _class.__classname__ = t;
    }
    for (var n in _class) {if (n.charAt(0) !== '_' && n.charAt(0) !== '$' && typeof(_class[n]) === 'object') Rx.typeClass(_class[n]);};
}
Rx.typeClean = function Rx$typeClean(_class) {
    /// <param name="_class" type="Object">
    /// </param>
    if (_class == null || typeof(_class) !== 'object') {
        return;
    }
    delete _class.__classname__;
    for (var n in _class) {if (n.charAt(0) !== '_' && n.charAt(0) !== '$' && typeof(_class[n]) === 'object') Rx.typeClean(_class[n]);};
}
Rx.publicStringify = function Rx$publicStringify(_class) {
    /// <summary>
    /// Stringifies the public variables on a class ignoring those starting with _ or who's value is a function.
    /// Adds class names to all the non object classes.
    /// </summary>
    /// <param name="_class" type="Object">
    /// The class to stringify.
    /// </param>
    /// <returns type="String"></returns>
    Rx.typeClass(_class);
    var r = JSON.stringify(_class, function(n, v) {
        return ((n.charAt(0) === '_' && n !== '__classname__') || n.charAt(0) === '$' || typeof(v) === 'function') ? undefined : v;
    });
    Rx.typeClean(_class);
    return r;
}
Rx.publicParse = function Rx$publicParse(_class) {
    /// <summary>
    /// Parses a string created with PulbicStringify back into a full class tree.
    /// </summary>
    /// <param name="_class" type="String">
    /// The class tree as a string.
    /// </param>
    /// <returns type="Object"></returns>
    return Rx.reClass(JSON.parse(_class));
}


////////////////////////////////////////////////////////////////////////////////
// Snsb

Snsb = function Snsb() {
    /// <field name="nextGenKey" type="String" static="true">
    /// </field>
    /// <field name="svCnt" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="lastEvent" type="jQueryEvent" static="true">
    /// </field>
    /// <field name="_idCnt" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="halt" type="Boolean" static="true">
    /// </field>
    /// <field name="_masterKeyName" type="String" static="true">
    /// </field>
    /// <field name="_anonKeyName" type="String" static="true">
    /// </field>
    /// <field name="_masterId" type="String" static="true">
    /// </field>
    /// <field name="_anonId" type="String" static="true">
    /// </field>
}
Snsb.jqTop = function Snsb$jqTop(el) {
    /// <summary>
    /// Rewraps jquery object with a wrapper created in the top document.
    /// </summary>
    /// <param name="el" type="jQueryObject">
    /// The jQueryObject to rewrap.
    /// </param>
    /// <returns type="jQueryObject"></returns>
    return (el[0].ownerDocument.defaultView || el[0].ownerDocument.parentWindow).jQuery(el[0]);
}
Snsb.jqWin = function Snsb$jqWin(el) {
    /// <param name="el" type="jQueryObject">
    /// </param>
    /// <returns type="WindowInstance"></returns>
    return (el[0].ownerDocument.defaultView || el[0].ownerDocument.parentWindow);
}
Snsb.get_newId = function Snsb$get_newId() {
    /// <summary>
    /// Generate a new unique id composed of [user]q[time]n[count]
    /// </summary>
    /// <value type="String"></value>
    return Snsb.randomOf(10000000).toString() + 'q' + new Date().getTime() + 'n' + (Snsb._idCnt = (Snsb._idCnt > 99999) ? 1 : Snsb._idCnt + 1);
}
Snsb.get_newGuid = function Snsb$get_newGuid() {
    /// <value type="String"></value>
    var d = Date.get_now().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return ((c === 'x') ? r : (r & 7 | 8)).toString(16);
    });
    return uuid;
}
Snsb.swallowAllMouseEvents = function Snsb$swallowAllMouseEvents(el) {
    /// <param name="el" type="jQueryObject">
    /// </param>
    /// <returns type="jQueryObject"></returns>
    return el.off('.swallowed').on('click.swallowed', function(e) {
        Snsb.cancelEvent(e);
    }).on('doubleclick.swallowed', function(e) {
        Snsb.cancelEvent(e);
    }).on('mousedown.swallowed', function(e) {
        Snsb.cancelEvent(e);
    }).on('mouseup.swallowed', function(e) {
        Snsb.cancelEvent(e);
    }).on('mouseover.swallowed', function(e) {
        Snsb.cancelEvent(e);
    }).on('mouseenter.swallowed', function(e) {
        Snsb.cancelEvent(e);
    }).on('mouseleave.swallowed', function(e) {
        Snsb.cancelEvent(e);
    });
}
Snsb.keyName = function Snsb$keyName(fieldReference) {
    /// <summary>
    /// Use KeyName(Script.Literal("\"{0}"\", something.field));
    /// </summary>
    /// <param name="fieldReference" type="Object">
    /// The field reference.
    /// </param>
    /// <returns type="String"></returns>
    var sa = (fieldReference).split('.');
    return sa[sa.length - 1];
}
Snsb.cancelEvent = function Snsb$cancelEvent(e) {
    /// <param name="e" type="jQueryEvent">
    /// </param>
    if (e == null) {
        return;
    }
    Snsb.lastEvent = e;
    e.stopImmediatePropagation();
    e.stopPropagation();
    e.preventDefault();
}
Snsb.isEmpty = function Snsb$isEmpty(v) {
    /// <param name="v" type="Object">
    /// </param>
    /// <returns type="Boolean"></returns>
    if (!(v)) {
        return true;
    }
    if (((v) instanceof Array)) {
        return !(v).length;
    }
    if (typeof(v) === 'object') {
        for (var n in v) return false;
        return true;
    }
    return false;
}
Snsb.randomOf = function Snsb$randomOf(max) {
    /// <summary>
    /// Random from 1 to max. Does not include 0.
    /// </summary>
    /// <param name="max" type="Number" integer="true">
    /// The max.
    /// </param>
    /// <returns type="Number" integer="true"></returns>
    return Math.floor(Math.random() * max) + 1;
}
Snsb.randIdx = function Snsb$randIdx(length) {
    /// <summary>
    /// Random from 0 to length -1. Perfect for random indexes from a length.
    /// </summary>
    /// <param name="length" type="Number" integer="true">
    /// Random index from the length.
    /// </param>
    /// <returns type="Number" integer="true"></returns>
    return Snsb.randomOf(length) - 1;
}
Snsb.defer = function Snsb$defer(fn, ms) {
    /// <param name="fn" type="Function">
    /// </param>
    /// <param name="ms" type="Number" integer="true">
    /// </param>
    if (ms === -1) {
        fn();
    }
    else {
        window.setTimeout(fn, (arguments.length > 1) ? ms : 1);
    }
}
Snsb.waitOn = function Snsb$waitOn(fn, condition, maxWait) {
    /// <param name="fn" type="System.Action`1">
    /// </param>
    /// <param name="condition" type="System.Func`1">
    /// </param>
    /// <param name="maxWait" type="Number" integer="true">
    /// </param>
    maxWait = (maxWait === -1) ? 900000000 : maxWait;
    var dt = (maxWait < 0) ? 0 - maxWait : Date.get_now().getTime() + ((!maxWait) ? 900000000 : maxWait);
    var ic;
    var sel = null;
    switch (typeof(condition)) {
        case 'function':
            ic = condition();
            sel = ic;
            break;
        default:
            sel = $(condition);
            ic = (sel).length > 0;
            break;
    }
    if (Date.get_now().getTime() <= dt && !ic) {
        Snsb.defer(function() {
            Snsb.waitOn(fn, condition, 0 - dt);
        }, 13);
        return;
    }
    fn(sel);
}
Snsb.isjQueryObject = function Snsb$isjQueryObject(o) {
    /// <param name="o" type="Object">
    /// </param>
    /// <returns type="Boolean"></returns>
    return o instanceof jQuery;
}
Snsb.valueList = function Snsb$valueList(db) {
    /// <param name="db" type="Object">
    /// </param>
    /// <returns type="Object"></returns>
    var list = [];
    var $dict1 = db;
    for (var $key2 in $dict1) {
        var p = { key: $key2, value: $dict1[$key2] };
        list.add(p.value);
    }
    return list;
}
Snsb.nextGen = function Snsb$nextGen(nextFn, nowFn) {
    /// <param name="nextFn" type="Function">
    /// </param>
    /// <param name="nowFn" type="Function">
    /// </param>
    var next = (SudoNsb.Storage.getCookie('NextGen') || SudoNsb.Storage.getLocal('@NextGen'));
    if (next) {
        SudoNsb.Storage.setCookie('NextGen', 'true');
        SudoNsb.Storage.removeLocal('@NextGen');
        nextFn();
    }
    else if (nowFn != null) {
        nowFn();
    }
}
Snsb.nowGen = function Snsb$nowGen(nextFn, nowFn) {
    /// <summary>
    /// Replace NextGen instances with NowGen to easily move them into live now status.
    /// </summary>
    /// <param name="nextFn" type="Function">
    /// The next fn.
    /// </param>
    /// <param name="nowFn" type="Function">
    /// The now fn.
    /// </param>
    nextFn();
}
Snsb.ping = function Snsb$ping(item, msg) {
    /// <summary>
    /// Logs the item into the sql Log table.
    /// </summary>
    /// <param name="item" type="String">
    /// The item. A value from the PingItems class or a derivitave of it.
    /// </param>
    /// <param name="msg" type="String">
    /// The message to log.
    /// </param>
    var options = {};
    options.url = Uri.join(Config.get_appPath(), 'sql.log.php');
    options.dataType = 'jsonp';
    options.data = SudoNsb.Files.data({ UserId: Snsb.get_masterId(), Item: item, Utc: new Date().getTime(), Data: msg || '' });
    options.type = 'POST';
    options.success = function() {
    };
    options.error = function() {
    };
    $.ajax(options);
}
Snsb.get_isPxUser = function Snsb$get_isPxUser() {
    /// <value type="Boolean"></value>
    return Snsb.get_masterId().substr(0, 2) === 'PX';
}
Snsb.get_masterId = function Snsb$get_masterId() {
    /// <value type="String"></value>
    return Snsb._masterId || (Snsb._masterId = SudoNsb.Storage.getCookie('NsbMasterId')) || '';
}
Snsb.set_masterId = function Snsb$set_masterId(value) {
    /// <value type="String"></value>
    Snsb._masterId = value;
    if (String.isNullOrEmpty(value)) {
        SudoNsb.Storage.removeCookie('NsbMasterId');
    }
    else {
        SudoNsb.Storage.setCookie('NsbMasterId', value);
    }
    return value;
}
Snsb.get_anonId = function Snsb$get_anonId() {
    /// <value type="String"></value>
    return Snsb._anonId || (Snsb._anonId = SudoNsb.Storage.getCookie('NsbAnonymousId'));
}
Snsb.set_anonId = function Snsb$set_anonId(value) {
    /// <value type="String"></value>
    if (value != null && value.length !== 40) {
        return;
    }
    if (value == null) {
        SudoNsb.Storage.removeCookie('NsbAnonymousId');
    }
    else {
        SudoNsb.Storage.setCookie('NsbAnonymousId', value);
    }
    Snsb._anonId = value;
    return value;
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.PingItems

SudoNsb.PingItems = function SudoNsb_PingItems() {
    /// <field name="error" type="String" static="true">
    /// </field>
}


////////////////////////////////////////////////////////////////////////////////
// LocalExceptions

LocalExceptions = function LocalExceptions() {
    /// <field name="nullReference" type="String" static="true">
    /// </field>
    /// <field name="notImplementedExceptionString" type="String" static="true">
    /// </field>
    /// <field name="errorLogName" type="String" static="true">
    /// </field>
    /// <field name="recordNotExists" type="String" static="true">
    /// </field>
    /// <field name="ajaxLoadError" type="String" static="true">
    /// </field>
    /// <field name="sendMailError" type="String" static="true">
    /// </field>
    /// <field name="_stopOnErrorKey" type="String" static="true">
    /// </field>
}
LocalExceptions.get_nullReferenceException = function LocalExceptions$get_nullReferenceException() {
    /// <value type="Object"></value>
    throw new Error('Null Reference');
}
LocalExceptions.notImplementedException = function LocalExceptions$notImplementedException() {
    /// <returns type="Error"></returns>
    return new Error('Not Implimented');
}
LocalExceptions.format = function LocalExceptions$format(ex, msg) {
    /// <param name="ex" type="String">
    /// </param>
    /// <param name="msg" type="String">
    /// </param>
    /// <returns type="String"></returns>
    return ex + ' : ' + msg;
}
LocalExceptions.fn = function LocalExceptions$fn(args) {
    /// <param name="args" type="Object">
    /// </param>
    /// <returns type="String"></returns>
    return args.callee.name || 'unknown';
}
LocalExceptions.error = function LocalExceptions$error(exType, msg, fnArgs) {
    /// <param name="exType" type="String">
    /// </param>
    /// <param name="msg" type="String">
    /// </param>
    /// <param name="fnArgs" type="Object">
    /// </param>
    /// <returns type="Error"></returns>
    if (SudoNsb.Storage.getLocal('@StopOnError')) {
        debugger;
    }
    var fnm = '';
    if (typeof(fnArgs) === 'string') {
        fnm = (fnArgs || 'anonymous') + '() ';
    }
    else if (typeof(fnArgs) === 'object') {
        fnm = (fnArgs != null) ? ((fnArgs.callee.name) || 'anonymous') + '() ' : '';
    }
    var ot = '';
    var ex = new Error(exType + ': ' + msg + ' (LOGGED=true)');
    msg = fnm + ex + ((!String.isNullOrEmpty(ot)) ? '\n' + ot : '');
    ex.mylogged = true;
    Inform.rawError(msg);
    LocalExceptions.SaveLog('Error', msg);
    return ex;
}
LocalExceptions.ajaxError = function LocalExceptions$ajaxError(exname, msg, request, verboseMsg, fnArgs) {
    /// <param name="exname" type="String">
    /// </param>
    /// <param name="msg" type="String">
    /// </param>
    /// <param name="request" type="jQueryXmlHttpRequest">
    /// </param>
    /// <param name="verboseMsg" type="String">
    /// </param>
    /// <param name="fnArgs" type="Object">
    /// </param>
    /// <returns type="Error"></returns>
    if (verboseMsg !== 'error' && verboseMsg !== request.statusText) {
        return LocalExceptions.error(exname, String.format('{0}: ({1}) {2}\n{3}', msg, request.status, request.statusText, verboseMsg), fnArgs);
    }
    return LocalExceptions.error(exname, String.format('{0}: ({1}) {2}', msg, request.status, request.statusText), fnArgs);
}
LocalExceptions.logException = function LocalExceptions$logException(ex, msg) {
    /// <param name="ex" type="Error">
    /// </param>
    /// <param name="msg" type="String">
    /// </param>
    if (Snsb.halt) {
        return;
    }
    if (SudoNsb.Storage.getLocal('@StopOnError')) {
        debugger;
    }
    if (!ex.mylogged && ex.message.indexOf(' (LOGGED=true)') === -1) {
        try {
            if (msg.indexOf(ex.toString()) === -1) {
                msg = msg + ' : ' + ex;
            }
            Inform.error(msg);
            ex.mylogged = true;
            msg += ' (LOGGED=true)';
            ex.message = msg;
        }
        catch ($e1) {
        }
    }
}
LocalExceptions.SaveLog = function LocalExceptions$SaveLog(log, msg) {
    /// <summary>
    /// Saves a log entry.
    /// </summary>
    /// <param name="log" type="String">
    /// The log key or file name
    /// </param>
    /// <param name="msg" type="String">
    /// The message to log
    /// </param>
    if (Snsb.halt) {
        return;
    }
    var d = new Date();
    var entry = { t: d.getTime(), d: d.toDateString() + d.format(' hh:mm tt zzz'), i: Snsb.get_masterId(), e: Config.email, u: window.location.href, m: msg, b: window.navigator.userAgent };
    var logName = log + '-Log';
    var rawLogs = SudoNsb.Storage.getLocal(logName) || [];
    rawLogs.add(entry);
    SudoNsb.Storage.setLocal(logName, rawLogs);
    Snsb.ping('Error', msg);
}
LocalExceptions.getErrorLogsAw = function LocalExceptions$getErrorLogsAw(awp) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    var logName = 'Error' + '-Log';
    var logs = SudoNsb.Storage.getLocal(logName);
    if (!$.isArray(logs)) {
        logs = null;
        SudoNsb.Storage.removeLocal(logName);
    }
    awp.done(logs || []);
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.LogData

SudoNsb.LogData = function SudoNsb_LogData() {
    /// <field name="b" type="String">
    /// </field>
    /// <field name="d" type="String">
    /// </field>
    /// <field name="e" type="String">
    /// </field>
    /// <field name="i" type="String">
    /// </field>
    /// <field name="m" type="String">
    /// </field>
    /// <field name="t" type="Number" integer="true">
    /// </field>
    /// <field name="u" type="String">
    /// </field>
}
SudoNsb.LogData.prototype = {
    b: null,
    d: null,
    e: null,
    i: null,
    m: null,
    t: 0,
    u: null
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.PxSessionUser

SudoNsb.PxSessionUser = function SudoNsb_PxSessionUser() {
    /// <field name="user_id" type="String">
    /// </field>
    /// <field name="email" type="String">
    /// </field>
    /// <field name="displayname" type="String">
    /// </field>
    /// <field name="title" type="String">
    /// </field>
    /// <field name="username" type="String">
    /// </field>
}
SudoNsb.PxSessionUser.prototype = {
    user_id: null,
    email: null,
    displayname: null,
    title: null,
    username: null
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.Storage

SudoNsb.Storage = function SudoNsb_Storage() {
}
SudoNsb.Storage.setLocal = function SudoNsb_Storage$setLocal(n, v, serializeClasses) {
    /// <param name="n" type="String">
    /// </param>
    /// <param name="v" type="Object">
    /// </param>
    /// <param name="serializeClasses" type="Boolean">
    /// </param>
    SudoNsb.Storage._dbPackage(n, v, window.localStorage, serializeClasses);
}
SudoNsb.Storage.defaultLocal = function SudoNsb_Storage$defaultLocal(n, v, serializeClasses) {
    /// <param name="n" type="String">
    /// </param>
    /// <param name="v" type="Object">
    /// </param>
    /// <param name="serializeClasses" type="Boolean">
    /// </param>
    if (SudoNsb.Storage.getLocal(n) == null) {
        SudoNsb.Storage._dbPackage(n, v, window.localStorage, serializeClasses);
    }
}
SudoNsb.Storage.setSession = function SudoNsb_Storage$setSession(n, v, serializeClasses) {
    /// <param name="n" type="String">
    /// </param>
    /// <param name="v" type="Object">
    /// </param>
    /// <param name="serializeClasses" type="Boolean">
    /// </param>
    SudoNsb.Storage._dbPackage(n, v, window.sessionStorage, serializeClasses);
}
SudoNsb.Storage.getLocal = function SudoNsb_Storage$getLocal(n, unserializeClasses) {
    /// <param name="n" type="String">
    /// </param>
    /// <param name="unserializeClasses" type="Boolean">
    /// </param>
    /// <returns type="Object"></returns>
    return SudoNsb.Storage._dbUnpackage(n, window.localStorage, unserializeClasses);
}
SudoNsb.Storage.getSession = function SudoNsb_Storage$getSession(n, unserializeClasses) {
    /// <param name="n" type="String">
    /// </param>
    /// <param name="unserializeClasses" type="Boolean">
    /// </param>
    /// <returns type="Object"></returns>
    return SudoNsb.Storage._dbUnpackage(n, window.sessionStorage, unserializeClasses);
}
SudoNsb.Storage.removeLocal = function SudoNsb_Storage$removeLocal(n) {
    /// <param name="n" type="String">
    /// </param>
    try {
        window.localStorage.removeItem(n);
    }
    catch ($e1) {
        window.localStorage[n] = '';
    }
}
SudoNsb.Storage.removeSession = function SudoNsb_Storage$removeSession(n) {
    /// <param name="n" type="String">
    /// </param>
    try {
        window.sessionStorage.removeItem(n);
    }
    catch ($e1) {
        window.sessionStorage[n] = '';
    }
}
SudoNsb.Storage.compareObjects = function SudoNsb_Storage$compareObjects(a, b) {
    /// <param name="a" type="Object">
    /// </param>
    /// <param name="b" type="Object">
    /// </param>
    /// <returns type="Boolean"></returns>
    if (ss.isNullOrUndefined(a) || ss.isNullOrUndefined(b)) {
        return false;
    }
    return JSON.stringify(a) === JSON.stringify(b);
}
SudoNsb.Storage._dbPackage = function SudoNsb_Storage$_dbPackage(n, v, store, serializeClasses) {
    /// <param name="n" type="String">
    /// </param>
    /// <param name="v" type="Object">
    /// </param>
    /// <param name="store" type="Storage">
    /// </param>
    /// <param name="serializeClasses" type="Boolean">
    /// </param>
    store.setItem(n, SudoNsb.Storage.stringPackage(v, serializeClasses));
}
SudoNsb.Storage._dbUnpackage = function SudoNsb_Storage$_dbUnpackage(n, store, unserializeClasses) {
    /// <param name="n" type="String">
    /// </param>
    /// <param name="store" type="Storage">
    /// </param>
    /// <param name="unserializeClasses" type="Boolean">
    /// </param>
    /// <returns type="Object"></returns>
    var v = store.getItem(n);
    if (ss.isNull(v)) {
        return undefined;
    }
    return SudoNsb.Storage.stringValue(v, unserializeClasses);
}
SudoNsb.Storage.stringPackage = function SudoNsb_Storage$stringPackage(v, serializeClasses) {
    /// <param name="v" type="Object">
    /// </param>
    /// <param name="serializeClasses" type="Boolean">
    /// </param>
    /// <returns type="String"></returns>
    var ot;
    switch (typeof(v)) {
        case 'object':
            ot = '@@object@@' + ((serializeClasses) ? Rx.publicStringify(v) : Rx.fnStringify(v));
            break;
        default:
            if (ss.isUndefined(v)) {
                debugger;
            }
            ot = (v || '').toString();
            break;
    }
    return ot;
}
SudoNsb.Storage.stringValue = function SudoNsb_Storage$stringValue(v, unserializeClasses) {
    /// <param name="v" type="String">
    /// </param>
    /// <param name="unserializeClasses" type="Boolean">
    /// </param>
    /// <returns type="Object"></returns>
    if ((/^@@object@@|^\{.*\}$/).test(v)) {
        var idx = (v.substr(0, 1) === '{') ? 0 : 10;
        try {
            if (unserializeClasses) {
                return Rx.reClass(eval('(' + v.substr(idx) + ')'));
            }
            return eval('(' + v.substr(idx) + ')');
        }
        catch (ex) {
            Inform.error('Syntax error parsing stored object: ' + ex);
        }
        return undefined;
    }
    switch (v) {
        case 'true':
            return true;
        case 'false':
            return false;
        case 'null':
            return null;
        case 'undefined':
            return undefined;
    }
    return v;
}
SudoNsb.Storage.unescapedValue = function SudoNsb_Storage$unescapedValue(v) {
    /// <param name="v" type="String">
    /// </param>
    /// <returns type="Object"></returns>
    return SudoNsb.Storage.stringValue(unescape(v), false);
}
SudoNsb.Storage.escapedValue = function SudoNsb_Storage$escapedValue(v) {
    /// <param name="v" type="Object">
    /// </param>
    /// <returns type="String"></returns>
    return escape(SudoNsb.Storage.stringPackage(v, false));
}
SudoNsb.Storage.setCookie = function SudoNsb_Storage$setCookie(n, v, path, domain) {
    /// <summary>
    /// Sets the cookie. Will expire in 1 year
    /// </summary>
    /// <param name="n" type="String">
    /// The cookie name.
    /// </param>
    /// <param name="v" type="Object">
    /// The cookie value.
    /// </param>
    /// <param name="path" type="String">
    /// The path.
    /// </param>
    /// <param name="domain" type="String">
    /// The domain.
    /// </param>
    var myDate = new Date();
    myDate.setMonth(myDate.getMonth() + 12);
    path = path || '/';
    domain = domain || Config.cookieDomain;
    document.cookie = n + '=' + SudoNsb.Storage.escapedValue(v) + ';expires=' + myDate + ((domain != null) ? ';domain=' + domain : '') + ';path=' + path;
}
SudoNsb.Storage.getCookie = function SudoNsb_Storage$getCookie(cName) {
    /// <param name="cName" type="String">
    /// </param>
    /// <returns type="Object"></returns>
    var cValue = document.cookie;
    var cStart = cValue.indexOf(' ' + cName);
    if (cStart === -1) {
        cStart = cValue.indexOf(cName + '=');
    }
    if (cStart !== -1) {
        cStart = cValue.indexOf('=', cStart) + 1;
        var cEnd = cValue.indexOf(';', cStart);
        if (cEnd === -1) {
            cEnd = cValue.length;
        }
        return SudoNsb.Storage.unescapedValue(cValue.substring(cStart, cEnd));
    }
    return null;
}
SudoNsb.Storage.removeCookie = function SudoNsb_Storage$removeCookie(cName, path, domain) {
    /// <param name="cName" type="String">
    /// </param>
    /// <param name="path" type="String">
    /// </param>
    /// <param name="domain" type="String">
    /// </param>
    path = path || '/';
    domain = domain || Config.cookieDomain;
    document.cookie = cName + '=' + ';path=' + path + ((domain != null) ? ';domain=' + domain : '') + ';expires=Thu, 01 Jan 1970 00:00:01 GMT';
}


////////////////////////////////////////////////////////////////////////////////
// Surface

Surface = function Surface() {
    /// <field name="aboveStyles" type="String" static="true">
    /// </field>
    /// <field name="_hiderCount" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="_hiderElement" type="jQueryObject" static="true">
    /// </field>
    /// <field name="_spinnerTgB" type="Boolean" static="true">
    /// </field>
    /// <field name="_spinnerCnt" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="_spinnerPreload" type="Boolean" static="true">
    /// </field>
}
Surface.glassCss = function Surface$glassCss(bkgnd, docTag) {
    /// <param name="bkgnd" type="String">
    /// </param>
    /// <param name="docTag" type="jQueryObject">
    /// </param>
    /// <returns type="Object"></returns>
    return { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', margin: 0, padding: 0, background: bkgnd };
}
Surface.get_hiderShown = function Surface$get_hiderShown() {
    /// <value type="Boolean"></value>
    return Surface._hiderCount > 0;
}
Surface.hiderAw = function Surface$hiderAw(awp, hiderOn, opacity) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    /// <param name="hiderOn" type="Boolean">
    /// </param>
    /// <param name="opacity" type="Number">
    /// </param>
    Surface.hider(hiderOn, opacity);
    awp.done();
}
Surface.hider = function Surface$hider(hiderOn, opacity, background, bodyTag) {
    /// <param name="hiderOn" type="Boolean">
    /// </param>
    /// <param name="opacity" type="Number">
    /// </param>
    /// <param name="background" type="String">
    /// </param>
    /// <param name="bodyTag" type="jQueryObject">
    /// </param>
    /// <returns type="jQueryObject"></returns>
    var bdy = bodyTag || $(document.body);
    MyCss.addStyleOnce('.HiderZee {z-index: 2000 !important;} .GlassZee {z-index: 2100 !important;} .AboveHider {z-index: 2200 !important;} .AboveGlass {z-index: 2300 !important;} .OffPage {position: absolute;top:-100000px !important;left:-100000px !important;}');
    opacity = (opacity || 0.75);
    if (hiderOn) {
        if (Surface._hiderCount++ > 0) {
            return $('#HiderSurface', bdy);
        }
        Surface._hiderElement = $("<div id='HiderSurface'/>").appendTo(bdy).css(Surface.glassCss(background || '#000', $(bdy[0].ownerDocument))).css({ opacity: opacity }).addClass('HiderZee').show();
        Snsb.swallowAllMouseEvents(Surface._hiderElement);
        return Surface._hiderElement;
    }
    if (--Surface._hiderCount > 0) {
        Inform.debug('Removing stacked hider {0} remaining', Surface._hiderCount);
        var hdr = $('#HiderSurface', bdy);
        Snsb.swallowAllMouseEvents(Surface._hiderElement);
        return hdr;
    }
    $('.HiderSpinner', bdy).remove();
    var el = Surface._hiderElement;
    Surface._hiderElement = null;
    if (el != null) {
        Snsb.svCnt++;
        el.remove();
    }
    return $(null);
}
Surface.glass = function Surface$glass(clickFn) {
    /// <param name="clickFn" type="Function">
    /// </param>
    /// <returns type="jQueryObject"></returns>
    MyCss.addStyleOnce('.HiderZee {z-index: 2000 !important;} .GlassZee {z-index: 2100 !important;} .AboveHider {z-index: 2200 !important;} .AboveGlass {z-index: 2300 !important;} .OffPage {position: absolute;top:-100000px !important;left:-100000px !important;}');
    Surface.glassOff();
    var glass = $("<div class='VirtualGlass'/>");
    glass.appendTo(document.body).css(Surface.glassCss('transparent', null)).addClass('GlassZee').mousedown(function(e) {
        if (e.target === glass[0]) {
            if (clickFn != null) {
                Surface.glassOff();
            }
        }
        Snsb.cancelEvent(e);
    });
    glass.data('GlassOffFn', clickFn);
    $(window).unbind('resize.Glass').bind('resize.Glass', function() {
        var vg = $('body > .VirtualGlass');
        var fn = vg.data('GlassOffFn');
        vg.removeData('GlassOffFn');
        Surface.glassOff();
        Surface.glass(fn);
    });
    return glass;
}
Surface.glassOff = function Surface$glassOff(noClick) {
    /// <summary>
    /// Turns off the glass firing the click function unless noClick=true
    /// </summary>
    /// <param name="noClick" type="Boolean">
    /// if set to <c>true</c> don't fire the click function.
    /// </param>
    var glass = $('body > .VirtualGlass');
    if (glass.length > 0) {
        glass.each(function(i, domEl) {
            var ths = $(domEl);
            var clickFn = ths.data('GlassOffFn');
            if (!noClick && clickFn != null) {
                clickFn();
            }
            if (!ths.data('GlassStay')) {
                $(window).unbind('.Glass');
                ths.removeData('GlassOffFn');
                ths.removeData('GlassStay');
                ths.remove();
            }
        });
    }
}
Surface.reSurface = function Surface$reSurface() {
    var el = $('#HiderSurface, div.VirtualGlass').css({ width: SudoNsb.Metrics.documentWidth(), height: SudoNsb.Metrics.documentHeight() });
}
Surface.spinnerOn = function Surface$spinnerOn() {
    Surface.spinner(true);
}
Surface.spinnerOff = function Surface$spinnerOff() {
    Surface.spinner(false);
}
Surface.spinnerPreload = function Surface$spinnerPreload() {
    if (Surface._spinnerPreload) {
        return;
    }
    Surface._spinnerPreload = true;
    $("<img id='NsbSpinnerPreload' class='OffPage' src='" + Uri.join(Config.imgPath2, 'loading.gif') + "'>").appendTo(document.body);
}
Surface.spinWaitOn = function Surface$spinWaitOn(fn, condition, maxWait) {
    /// <param name="fn" type="System.Action`1">
    /// </param>
    /// <param name="condition" type="System.Func`1">
    /// </param>
    /// <param name="maxWait" type="Number" integer="true">
    /// </param>
    Surface.spinner(true);
    Snsb.waitOn(function(o) {
        Surface.spinner(false);
        fn(o);
    }, condition, (maxWait || 60000));
}
Surface._addSpinner = function Surface$_addSpinner() {
    /// <returns type="Boolean"></returns>
    PnxCommon.NsbSite.ready(function() {
        $(document).bind('Spinner', Surface.spinnerTg);
    }, null);
    return !Surface._spinnerTgB;
}
Surface.spinnerTg = function Surface$spinnerTg(e, oon, opacity) {
    /// <param name="e" type="jQueryEvent">
    /// </param>
    /// <param name="oon" type="Boolean">
    /// </param>
    /// <param name="opacity" type="Number">
    /// </param>
    if (oon) {
        if (Surface._spinnerCnt++ > 0) {
            return;
        }
        Surface.hider(true, (typeof(opacity) === 'number') ? opacity : 0.8);
        var spnr = $("<div id='HiderSpinner' class='AboveHider' style='width:300px;text-align:center;'><img src='" + Uri.join(Config.imgPath2, 'loading.gif') + "'></div>").appendTo(document.body);
        Snsb.defer(function() {
            spnr.position({ my: 'center', at: 'center', of: window.self });
        }, -1);
    }
    else if (--Surface._spinnerCnt <= 0) {
        Surface._spinnerCnt = 0;
        Surface.hider(false);
        $('#HiderSpinner').remove();
    }
}
Surface.spinner = function Surface$spinner(oon, opacity) {
    /// <param name="oon" type="Boolean">
    /// </param>
    /// <param name="opacity" type="Number">
    /// </param>
    Surface.spinnerTg(null, oon, opacity);
}
Surface.spinnerMsg = function Surface$spinnerMsg(msg) {
    /// <param name="msg" type="String">
    /// </param>
    $('#HiderSpinner').prepend(String.format("<p style='color:white;font-size:24pt;margin: 40px 20px;padding: 0;'>{0}</p>", msg));
}


////////////////////////////////////////////////////////////////////////////////
// Uri

Uri = function Uri() {
    /// <field name="queryData" type="Object" static="true">
    /// </field>
    /// <field name="_uriBase" type="String" static="true">
    /// </field>
    /// <field name="_instisizer" type="String" static="true">
    /// </field>
}
Uri.get_host = function Uri$get_host() {
    /// <value type="String"></value>
    return window.location.protocol + '//' + window.location.host;
}
Uri.get_base = function Uri$get_base() {
    /// <value type="String"></value>
    if (Uri._uriBase != null) {
        return Uri._uriBase;
    }
    var b = $('base').attr('href');
    Uri._uriBase = (!String.isNullOrEmpty(b)) ? b : Uri.get_host();
    return Uri._uriBase;
}
Uri.relative = function Uri$relative(uri) {
    /// <param name="uri" type="String">
    /// </param>
    /// <returns type="String"></returns>
    return uri;
}
Uri.isHttp = function Uri$isHttp(uri) {
    /// <param name="uri" type="String">
    /// </param>
    /// <returns type="Boolean"></returns>
    return (/^https?:\/\//i).test(uri);
}
Uri.uniqueify = function Uri$uniqueify(uri) {
    /// <param name="uri" type="String">
    /// </param>
    /// <returns type="String"></returns>
    return Uri.addPair(Uri.relative(uri), '_', new Date().getTime().toString());
}
Uri.path = function Uri$path(uri) {
    /// <summary>
    /// All of the uri before the question mark (?)
    /// </summary>
    /// <param name="uri" type="String">
    /// The URI.
    /// </param>
    /// <returns type="String"></returns>
    return (Uri.relative(uri) || '').split('?')[0];
}
Uri.query = function Uri$query(uri) {
    /// <param name="uri" type="String">
    /// </param>
    /// <returns type="String"></returns>
    return (uri || '').split('?')[1] || '';
}
Uri.front = function Uri$front(uri) {
    /// <param name="uri" type="String">
    /// </param>
    /// <returns type="String"></returns>
    var f = Uri.path(uri);
    return f.substr(0, f.length - Uri.end(uri).length - 1);
}
Uri.end = function Uri$end(uri) {
    /// <param name="uri" type="String">
    /// </param>
    /// <returns type="String"></returns>
    var p = Uri.path(uri).split('/');
    return p[p.length - 1];
}
Uri.ext = function Uri$ext(uri) {
    /// <param name="uri" type="String">
    /// </param>
    /// <returns type="String"></returns>
    var sa = Uri.end(uri).split('.');
    return (sa.length === 1) ? '' : '.' + sa[sa.length - 1];
}
Uri.removeExt = function Uri$removeExt(name) {
    /// <param name="name" type="String">
    /// </param>
    /// <returns type="String"></returns>
    name = name || '';
    var ns = name.split('.');
    return (ns.length > 1) ? name.substr(0, name.length - ns[ns.length - 1].length - 1) : name;
}
Uri.join = function Uri$join(u1, u2, u3, u4) {
    /// <summary>
    /// Joins paths with slashes.
    /// </summary>
    /// <param name="u1" type="String">
    /// path part
    /// </param>
    /// <param name="u2" type="String">
    /// path part
    /// </param>
    /// <param name="u3" type="String">
    /// path part
    /// </param>
    /// <param name="u4" type="String">
    /// path part
    /// </param>
    /// <returns type="String"></returns>
    var s1 = !String.isNullOrEmpty(u1);
    var s2 = !String.isNullOrEmpty(u2);
    var s3 = !String.isNullOrEmpty(u3);
    var s4 = !String.isNullOrEmpty(u4);
    return (((!s1) ? '' : u1.trim()) + ((!s2) ? '' : ((s1) ? '/' : '') + u2.trim()) + ((!s3) ? '' : ((s1 || s2) ? '/' : '') + u3.trim()) + ((!s4) ? '' : ((s1 || s2 || s3) ? '/' : '') + u4.trim())).replace(/\/+/g, '/').replace(/^(https?:)\//g, '$1//');
}
Uri.pairs = function Uri$pairs(txt) {
    /// <param name="txt" type="String">
    /// </param>
    /// <returns type="Object"></returns>
    var d = {};
    if (txt.substr(0, 1) === '?') {
        txt = txt.substr(1);
    }
    var pairs = txt.split('&');
    if (pairs.length > 0) {
        var $enum1 = ss.IEnumerator.getEnumerator(pairs);
        while ($enum1.moveNext()) {
            var pair = $enum1.current;
            var p = pair.split('=');
            if (String.isNullOrEmpty(p[0])) {
                continue;
            }
            if (p.length >= 2) {
                d[decodeURIComponent(p[0])] = decodeURIComponent(pair.substr(p[0].length + 1));
            }
            else {
                d[decodeURIComponent(p[0])] = '';
            }
        }
    }
    return d;
}
Uri.getValue = function Uri$getValue(url, nm) {
    /// <param name="url" type="String">
    /// </param>
    /// <param name="nm" type="String">
    /// </param>
    /// <returns type="String"></returns>
    try {
        return Uri.pairs(Uri.query(url))[nm];
    }
    catch ($e1) {
        return null;
    }
}
Uri.serialize = function Uri$serialize(d) {
    /// <param name="d" type="Object">
    /// </param>
    /// <returns type="String"></returns>
    var ot = '';
    var $dict1 = d;
    for (var $key2 in $dict1) {
        var pair = { key: $key2, value: $dict1[$key2] };
        ot += ((ot.length > 0) ? '&' : '') + encodeURIComponent(pair.key) + '=' + encodeURIComponent((pair.value || '').toString());
    }
    return ot;
}
Uri.addPair = function Uri$addPair(uri, name, value) {
    /// <param name="uri" type="String">
    /// </param>
    /// <param name="name" type="String">
    /// </param>
    /// <param name="value" type="String">
    /// </param>
    /// <returns type="String"></returns>
    var d = Uri.pairs(Uri.query(uri));
    d[name] = value;
    return Uri.path(uri) + '?' + Uri.serialize(d);
}
Uri.parseFromCss = function Uri$parseFromCss(css) {
    /// <param name="css" type="String">
    /// </param>
    /// <returns type="String"></returns>
    return ((/url\((.*)\)/g).exec(css || '')[1] || '').trim();
}
Uri.get_masterVersion = function Uri$get_masterVersion() {
    /// <value type="String"></value>
    return SudoNsb.Storage.getLocal('MasterVersionId') || Uri.bumpVersion();
}
Uri.set_masterVersion = function Uri$set_masterVersion(value) {
    /// <value type="String"></value>
    SudoNsb.Storage.setLocal('MasterVersionId', value);
    return value;
}
Uri._izer = function Uri$_izer(uri, ize) {
    /// <param name="uri" type="String">
    /// </param>
    /// <param name="ize" type="String">
    /// </param>
    /// <returns type="String"></returns>
    uri = Uri.relative(uri) || '';
    if (uri.indexOf('.') === -1) {
        return uri;
    }
    var rx = /url\([^\)]+\)/;
    if (rx.test(uri)) {
        return uri.replace(rx, 'url(' + Uri.addPair(Uri.parseFromCss(uri), '_', ize) + ')');
    }
    return Uri.addPair(uri, 'ize', 'U' + ize);
}
Uri.instisize = function Uri$instisize(uri) {
    /// <summary>
    /// Makes the uri unique to this page instance but not unique to other
    /// uses of the same uri on this page. Good for changed images loaded multiple times.
    /// </summary>
    /// <param name="uri" type="String">
    /// The uri.
    /// </param>
    /// <returns type="String"></returns>
    return Uri._izer(uri, Uri._instisizer);
}
Uri.bumpVersion = function Uri$bumpVersion() {
    /// <returns type="String"></returns>
    var v = new Date().getTime().toString();
    SudoNsb.Storage.setLocal('MasterVersionId', v);
    return v;
}
Uri.versionize = function Uri$versionize(uri) {
    /// <param name="uri" type="String">
    /// </param>
    /// <returns type="String"></returns>
    return Uri._izer(uri, Uri.get_masterVersion());
}


Type.registerNamespace('Jarvis');

////////////////////////////////////////////////////////////////////////////////
// OnScreen

OnScreen = function OnScreen() {
    /// <field name="uninitialized" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="aLeft" type="Number">
    /// </field>
    /// <field name="aTop" type="Number">
    /// </field>
    /// <field name="css" type="Object">
    /// </field>
    /// <field name="height" type="Number">
    /// </field>
    /// <field name="left" type="Number">
    /// </field>
    /// <field name="style" type="String">
    /// </field>
    /// <field name="top" type="Number">
    /// </field>
    /// <field name="width" type="Number">
    /// </field>
    /// <field name="fontSize" type="Number">
    /// </field>
    /// <field name="lineHeight" type="Number">
    /// </field>
    this.aLeft = OnScreen.uninitialized;
    this.aTop = OnScreen.uninitialized;
    this.left = OnScreen.uninitialized;
    this.top = OnScreen.uninitialized;
}
OnScreen.prototype = {
    css: null,
    height: 100,
    style: null,
    width: 100,
    fontSize: 0,
    lineHeight: 0,
    
    _defaults: function OnScreen$_defaults(el) {
        /// <param name="el" type="jQueryObject">
        /// </param>
        this.top = (this.top === OnScreen.uninitialized) ? 0 : this.top;
        this.left = (this.left === OnScreen.uninitialized) ? 0 : this.left;
        this.aTop = (this.aTop === OnScreen.uninitialized) ? el.offset().top : this.aTop;
        this.aLeft = (this.aLeft === OnScreen.uninitialized) ? el.offset().left : this.aLeft;
    },
    
    applyTo: function OnScreen$applyTo(el) {
        /// <param name="el" type="jQueryObject">
        /// </param>
        /// <returns type="OnScreen"></returns>
        this._defaults(el);
        var p = el.offsetParent().offset();
        el.css({ top: this.top, left: this.left, width: this.width, height: this.height });
        return this.applyStyles(el);
    },
    
    transAbsoTo: function OnScreen$transAbsoTo(el) {
        /// <param name="el" type="jQueryObject">
        /// </param>
        /// <returns type="OnScreen"></returns>
        this._defaults(el);
        var p = el.offsetParent().offset();
        this.top = this.aTop - p.top;
        this.left = this.aLeft - p.left;
        return this;
    },
    
    applyStyles: function OnScreen$applyStyles(el) {
        /// <param name="el" type="jQueryObject">
        /// </param>
        /// <returns type="OnScreen"></returns>
        if (!String.isNullOrEmpty(this.style)) {
            el.children('div').attr('style', this.style);
        }
        if (this.css != null) {
            el.children('div').css(this.css);
        }
        return this;
    },
    
    getMetricsFrom: function OnScreen$getMetricsFrom(el) {
        /// <param name="el" type="jQueryObject">
        /// </param>
        /// <returns type="OnScreen"></returns>
        var p = el.offset();
        this.top = this.aTop = p.top;
        this.left = this.aLeft = p.left;
        this.width = el.outerWidth();
        this.height = el.outerHeight();
        this.fontSize = parseFloat(el.css('font-size'));
        this.lineHeight = parseFloat(el.css('line-height'));
        return this;
    }
}


Type.registerNamespace('PnxBase');

////////////////////////////////////////////////////////////////////////////////
// PnxBase.AppEvents

PnxBase.AppEvents = function PnxBase_AppEvents() {
    /// <field name="appFocusEv" type="String" static="true">
    /// </field>
    /// <field name="saveAll" type="String" static="true">
    /// </field>
}


////////////////////////////////////////////////////////////////////////////////
// PnxBase.BlogBox

PnxBase.BlogBox = function PnxBase_BlogBox() {
    /// <field name="_css" type="String" static="true">
    /// </field>
}
PnxBase.BlogBox.show = function PnxBase_BlogBox$show(name) {
    /// <param name="name" type="String">
    /// </param>
    var bel = $('div.BlogBox' + name).first();
    if (!bel.length) {
        return;
    }
    MyCss.addStyleOnce((PnxBase.BlogBox).get_fullName(), '\r\n.BlogBox1, .BlogBox2, .BlogBox3, .BlogBox4 {\r\n    display: none;\r\n}\r\ndiv.BlogBox {\r\n    display: block !important;\r\n    padding: 0 20px 20px 20px;\r\n    margin-bottom: 20px;\r\n    border: 2px solid rgba(0,0,0,.11);\r\n}\r\ndiv.BlogBox h2 {\r\n}\r\ndiv.BlogBox h3 {\r\n    font-size: 14pt;\r\n    margin-bottom: 5px;\r\n}\r\ndiv.BlogBox a.BlogMoreLink {\r\n    font-size: 10pt;\r\n}\r\nimg.BlogImg {\r\n    width: 100px;\r\n    float: left;\r\n    margin-top: 6px;\r\n    margin-right: 14px;\r\n}\r\ndiv.BlogBox p.BlogParagraph {\r\n    max-height: 198px;\r\n    overflow: hidden;\r\n}\r\n');
    new SudoNsb.Await().addAw(PnxBase.RssReader.GetBlogRssAw, name).addDx(function(aw) {
        var bd = aw.get_result();
        if (bd == null) {
            return;
        }
        bel.empty().addClass('BlogBox');
        $('<h2/>').html(bd.title).appendTo(bel);
        $('<a/>').html($('<h3/>').html(bd.name)).appendTo(bel).attr('href', bd.channelLink);
        if (bd.img != null) {
            $('<a/>').html($("<img class='BlogImg'/>").attr('src', bd.img)).appendTo(bel).attr('href', bd.channelLink);
        }
        $("<p class='BlogParagraph'/>").append(PnxBase.BlogBox.stripHtml(bd.content)).appendTo(bel);
        $("<a class='BlogMoreLink'/>").attr('href', bd.channelLink).html('read more...').appendTo(bel);
    }).commit();
}
PnxBase.BlogBox.stripHtml = function PnxBase_BlogBox$stripHtml(html) {
    /// <param name="html" type="String">
    /// </param>
    /// <returns type="jQueryObject"></returns>
    var p = $(html);
    p.find('img').remove();
    return p;
}


////////////////////////////////////////////////////////////////////////////////
// PnxBase.RssReader

PnxBase.RssReader = function PnxBase_RssReader() {
    /// <field name="readCount" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="hashTotal" type="Number" integer="true" static="true">
    /// </field>
}
PnxBase.RssReader.GetBlogRssAw = function PnxBase_RssReader$GetBlogRssAw(awp, name) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    /// <param name="name" type="String">
    /// </param>
    var url = 'files/pnx/App/file.getblog.php?name=' + name;
    $.getJSON(url, function(data) {
        if (data == null) {
            Inform.error('Failed reading blog at {0}', url);
            awp.done();
            return;
        }
        var xml = (data)['content'];
        PnxBase.RssReader.hashTotal = PnxBase.RssReader.hash(xml + PnxBase.RssReader.hashTotal);
        PnxBase.RssReader.readCount++;
        var xdoc = $.parseXML(xml);
        var doc = $(xdoc);
        var bd = new PnxBase.BlogData();
        bd.channelLink = doc.find('channel link').first().text();
        bd.title = doc.find('channel description').first().text();
        bd.name = doc.find('channel item title').first().text();
        bd.description = doc.find('channel item description').first().text();
        bd.link = doc.find('channel item link').first().text();
        bd.pubDate = doc.find('channel item pubDate').first().text();
        bd.content = doc.find("channel item encoded, channel item [nodeName='content:encoded']").first().text();
        bd.img = $(bd.content).find('img').first().attr('src');
        awp.done(bd);
    });
}
PnxBase.RssReader.getBlogHashesAw = function PnxBase_RssReader$getBlogHashesAw(awp, names) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    /// <param name="names" type="Array" elementType="String">
    /// </param>
    PnxBase.RssReader.hashTotal = 0;
    PnxBase.RssReader.readCount = 0;
    var awx = new SudoNsb.Await();
    var $enum1 = ss.IEnumerator.getEnumerator(names);
    while ($enum1.moveNext()) {
        var name = $enum1.current;
        awx.addAw(PnxBase.RssReader.GetBlogRssAw, name);
    }
    awx.commit(awp);
}
PnxBase.RssReader.hash = function PnxBase_RssReader$hash(s) {
    /// <param name="s" type="String">
    /// </param>
    /// <returns type="Number" integer="true"></returns>
    var hash = 0;
    for (var i = 0; i < s.length; i++) {
        hash += (s.charCodeAt(i) * (i + 1));
    }
    return Math.abs(hash);
}


////////////////////////////////////////////////////////////////////////////////
// PnxBase.BlogData

PnxBase.BlogData = function PnxBase_BlogData() {
    /// <field name="content" type="String">
    /// </field>
    /// <field name="channelLink" type="String">
    /// </field>
    /// <field name="description" type="String">
    /// </field>
    /// <field name="link" type="String">
    /// </field>
    /// <field name="name" type="String">
    /// </field>
    /// <field name="pubDate" type="String">
    /// </field>
    /// <field name="title" type="String">
    /// </field>
    /// <field name="img" type="String">
    /// </field>
}
PnxBase.BlogData.prototype = {
    content: null,
    channelLink: null,
    description: null,
    link: null,
    name: null,
    pubDate: null,
    title: null,
    img: null
}


////////////////////////////////////////////////////////////////////////////////
// PnxBaseMain

PnxBaseMain = function PnxBaseMain() {
}
PnxBaseMain.load = function PnxBaseMain$load() {
    Inform.event(arguments, 'PnxBaseMain begin');
    PnxSite.LoadToolbar();
    Inform.event(arguments, 'PnxBaseMain end');
}


Type.registerNamespace('Project');

////////////////////////////////////////////////////////////////////////////////
// Config

Config = function Config() {
    /// <field name="logoAreaSelector" type="String" static="true">
    /// </field>
    /// <field name="placematClipboardKey" type="String" static="true">
    /// </field>
    /// <field name="playNexusUrl" type="String" static="true">
    /// </field>
    /// <field name="cookieDomain" type="String" static="true">
    /// </field>
    /// <field name="hostUrl" type="String" static="true">
    /// </field>
    /// <field name="pageUrl" type="String" static="true">
    /// </field>
    /// <field name="pnxUrl" type="String" static="true">
    /// </field>
    /// <field name="imgPath" type="String" static="true">
    /// </field>
    /// <field name="imgPath2" type="String" static="true">
    /// </field>
    /// <field name="_appPath" type="String" static="true">
    /// </field>
    /// <field name="sessionPath" type="String" static="true">
    /// </field>
    /// <field name="userId" type="String" static="true">
    /// </field>
    /// <field name="email" type="String" static="true">
    /// </field>
    /// <field name="userName" type="String" static="true">
    /// </field>
    /// <field name="applicationScope" type="String" static="true">
    /// </field>
    /// <field name="fbAppId" type="String" static="true">
    /// </field>
    /// <field name="fbAppScope" type="String" static="true">
    /// </field>
    /// <field name="startTime" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="loadFactor" type="Number" static="true">
    /// </field>
    /// <field name="offline" type="Boolean" static="true">
    /// </field>
    /// <field name="allLoaded" type="Boolean" static="true">
    /// </field>
    /// <field name="_afterConfigFlag" type="Boolean" static="true">
    /// </field>
    /// <field name="_afterConfigStaticFlag" type="Boolean" static="true">
    /// </field>
    /// <field name="debug" type="Boolean" static="true">
    /// </field>
}
Config.get_appPath = function Config$get_appPath() {
    /// <value type="String"></value>
    return Config._appPath;
}
Config.set_appPath = function Config$set_appPath(value) {
    /// <value type="String"></value>
    Config._appPath = value;
    return value;
}
Config.get_appUrl = function Config$get_appUrl() {
    /// <value type="String"></value>
    return Uri.join(Uri.get_base(), Config.get_appPath());
}
Config.afterConfig = function Config$afterConfig(fn) {
    /// <param name="fn" type="Function">
    /// </param>
    if (!Config._afterConfigFlag || !Config._afterConfigStaticFlag) {
        window.setTimeout(function() {
            Config.afterConfig(fn);
        }, 13);
        return;
    }
    fn();
}


GameCommon.registerClass('GameCommon');
PnxFooter.registerClass('PnxFooter');
PnxSite.registerClass('PnxSite');
PnxToolbar.registerClass('PnxToolbar');
PnxCommon.NsbSite.registerClass('PnxCommon.NsbSite');
PnxCommon.FacebookCommon.registerClass('PnxCommon.FacebookCommon');
SudoNsb.Dom.registerClass('SudoNsb.Dom');
SudoNsb.Pos.registerClass('SudoNsb.Pos');
SudoNsb.Metric.registerClass('SudoNsb.Metric', SudoNsb.Pos);
SudoNsb.Dim.registerClass('SudoNsb.Dim');
SudoNsb.PxUser.registerClass('SudoNsb.PxUser');
SudoNsb.SqlThingData.registerClass('SudoNsb.SqlThingData');
SqlThings.registerClass('SqlThings');
SudoNsb.SqlThingResult.registerClass('SudoNsb.SqlThingResult');
SudoNsb.SqlThingsClipboard.registerClass('SudoNsb.SqlThingsClipboard');
SudoNsb.Cb.registerClass('SudoNsb.Cb');
SudoNsb.ToolTips.registerClass('SudoNsb.ToolTips');
FbApi.registerClass('FbApi');
SudoNsb.FbDataResult.registerClass('SudoNsb.FbDataResult');
SudoNsb.FbSdk.registerClass('SudoNsb.FbSdk');
SudoNsb.FbResponse.registerClass('SudoNsb.FbResponse');
SudoNsb.FbAuthResponse.registerClass('SudoNsb.FbAuthResponse');
SudoNsb.FbErrorResult.registerClass('SudoNsb.FbErrorResult');
SudoNsb.FbScope.registerClass('SudoNsb.FbScope');
SudoNsb.FbEvent.registerClass('SudoNsb.FbEvent');
Inform.registerClass('Inform');
BrowserUser.registerClass('BrowserUser');
SudoNsb.SessionData.registerClass('SudoNsb.SessionData');
SudoNsb.BuData.registerClass('SudoNsb.BuData');
SudoNsb.GeoInfo.registerClass('SudoNsb.GeoInfo');
SudoNsb.CloudMail.registerClass('SudoNsb.CloudMail');
SudoNsb.SendMailData.registerClass('SudoNsb.SendMailData');
SudoNsb.SendMailPart.registerClass('SudoNsb.SendMailPart');
SudoNsb.Tables.registerClass('SudoNsb.Tables');
SudoNsb.TableOptions.registerClass('SudoNsb.TableOptions');
SudoNsb.Encoder.registerClass('SudoNsb.Encoder');
SudoNsb.HelpTip.registerClass('SudoNsb.HelpTip');
SudoNsb.HelpTipData.registerClass('SudoNsb.HelpTipData');
Strings.registerClass('Strings');
SudoNsb.Await.registerClass('SudoNsb.Await');
SudoNsb.WaitTarget.registerClass('SudoNsb.WaitTarget');
AwaitTimers.registerClass('AwaitTimers');
SudoNsb.Files.registerClass('SudoNsb.Files');
SudoNsb.Metrics.registerClass('SudoNsb.Metrics');
MyCss.registerClass('MyCss');
Rx.registerClass('Rx');
Snsb.registerClass('Snsb');
SudoNsb.PingItems.registerClass('SudoNsb.PingItems');
LocalExceptions.registerClass('LocalExceptions');
SudoNsb.LogData.registerClass('SudoNsb.LogData');
SudoNsb.PxSessionUser.registerClass('SudoNsb.PxSessionUser');
SudoNsb.Storage.registerClass('SudoNsb.Storage');
Surface.registerClass('Surface');
Uri.registerClass('Uri');
OnScreen.registerClass('OnScreen');
PnxBase.AppEvents.registerClass('PnxBase.AppEvents');
PnxBase.BlogBox.registerClass('PnxBase.BlogBox');
PnxBase.RssReader.registerClass('PnxBase.RssReader');
PnxBase.BlogData.registerClass('PnxBase.BlogData');
PnxBaseMain.registerClass('PnxBaseMain');
Config.registerClass('Config');
PnxSite.css = "\r\n#footer-wrap {\r\n    background-color: transparent !important;\r\n    border: none !important;\r\n}\r\n.wcustomhtml { overflow: visible !important; }\r\n.PnxHomeTool {\r\n    position: absolute;\r\n    top: 4px; \r\n    left: 20px; \r\n}\r\n.PnxDeleteBtn {\r\n    position: absolute;\r\n    width: 16px !important;\r\n    height: 16px !important;\r\n    margin: 0;\r\n    padding: 0;\r\n    cursor: pointer;\r\n    background: url('%ImgPath2%/closebtn16.png');\r\n}\r\n";
PnxSite.construction = "<img style='float:right' src='" + Uri.join(Config.imgPath2, 'BlueConstruction100.png') + "'>Feature in development<br>coming soon!";
PnxToolbar.bar = null;
PnxToolbar.wrapper = null;
PnxToolbar._buttons = {};
PnxToolbar._noBar = true;
PnxCommon.NsbSite._ready = false;
PnxCommon.FacebookCommon.fbButtonId = 'FbUserBtn';
SudoNsb.Dom.afterScrollTopEv = 'AfterScrollTopEv';
SudoNsb.Dom.afterScrollBottomEv = 'AfterScrollBottomEv';
SudoNsb.PxUser.loginWinName = null;
SudoNsb.PxUser.windowFeatures = null;
SudoNsb.PxUser._loginWin = null;
SudoNsb.PxUser._thisUrl = null;
SudoNsb.PxUser._iFrameEl = null;
SudoNsb.PxUser._title = null;
SudoNsb.PxUser.userLoggedInEv = 'PxUserLoggedIn';
SudoNsb.PxUser.userLoggedOutEv = 'PxUserLoggedOut';
(function () {
    Snsb.waitOn(function() {
        MyCss.addStyleOnce((SudoNsb.PxUser).get_fullName(), "\r\n.LoginDiv {\r\n    position: fixed;\r\n    top: 50px;\r\n    left: 50px;\r\n    width: 320px;\r\n    height: 520px;\r\n    background: black;\r\n    border: 1px solid black;\r\n}\r\n.LoginIFrame {\r\n    width: 320px;\r\n    height: 480px;\r\n    border: none;\r\n}\r\n.LoginDiv label {\r\n    display: block;\r\n    color: white;\r\n    background: black;\r\n    font-size: 18px;\r\n    text-align: center;\r\n}\r\n.LoginDiv label:before {\r\n    display: block;\r\n    position: relative;\r\n    float: left;\r\n    content: ' ';\r\n    width: 24px;\r\n    height: 24px;\r\n    background-size: contain;\r\n    background-color: #000;\r\n    background: url('nsb/base/images/pirate-lock15.png') no-repeat center;\r\n}\r\na.CloseLoginFrame {\r\n    float: right;\r\n    width: 20px;\r\n    color: #FFF;\r\n    font-family: arial;\r\n    font-size: 18px;\r\n    font-weight: normal;\r\n}\r\n");
        SudoNsb.PxUser.loginWinName = 'PlayNexusLogin';
        SudoNsb.PxUser.windowFeatures = 'toolbar=no,scrollbars=yes,resizable=yes,location=no,status=no,menubar=no,width=320,height=480';
    }, function() {
        return Config.sessionPath != null;
    });
})();
SudoNsb.SqlThingData.alsoField = 'also';
SudoNsb.SqlThingData.moreField = 'more';
SqlThings.loginErrEw = 'LoginErr.SqlThings';
SqlThings.thingKey = 'TheThing';
SqlThings.sqlReturnKey = 'SqlReturn';
SqlThings.dataResultKey = 'DataResult';
SqlThings.ignoreSessionLock = false;
SqlThings._isLoading = false;
SqlThings._defaultResult = { result: false, content: [] };
SqlThings._loginErrEvReg = false;
SudoNsb.Cb.topic = '/Pnx/User/Clipboard';
SudoNsb.Cb.wrapperInstance = null;
SudoNsb.Cb.data = null;
SudoNsb.Cb.dict = null;
SudoNsb.ToolTips._activeTip = null;
FbApi.authChangeEv = 'AuthChangeEv.FbApi';
FbApi.graphApiUrl = 'https://graph.facebook.com/';
FbApi._facebookIncluded = false;
FbApi._fbBailoutTmr = 0;
FbApi._hasAuthChange = false;
FbApi._authReturnStarted = false;
FbApi._authLoopTmr = 0;
FbApi._userStatusKnown = false;
FbApi.authStatus = null;
FbApi._authResponse = new SudoNsb.FbAuthResponse();
FbApi._authChangeIdx = 0;
FbApi.scope = null;
FbApi.sharingApi = false;
FbApi._fbData = null;
FbApi.initialized = false;
FbApi.ignoreFacebook = true;
(function () {
    FbApi.initialized = true;
})();
Inform.tracing = false;
Inform.passExceptions = false;
Inform.logActions = false;
Inform.nsbDebug = false;
Inform._mark = 0;
Inform._initialTm = 0;
Inform.isLoggedTxt = ' (LOGGED=true)';
Inform.lastErrorKey = 'NsbLastError';
(function () {
    Inform._initialTm = new Date().getTime();
    Inform.nsbDebug = SudoNsb.Storage.getLocal('@NsbDebug');
    SudoNsb.Storage.defaultLocal('@NsbDebug', false);
    Inform.tracing = SudoNsb.Storage.getLocal('@NsbTrace');
    SudoNsb.Storage.defaultLocal('@NsbTrace', false);
})();
BrowserUser.pxUserKnownEv = 'PxUserKnownEv';
BrowserUser.pxUserUnknownEv = 'PxUserUnknownEv';
BrowserUser.data = null;
BrowserUser.Session = new SudoNsb.SessionData();
BrowserUser.password = '';
BrowserUser.geoInfo = new SudoNsb.GeoInfo();
BrowserUser._startTime = 0;
BrowserUser.loadTime = 0;
(function () {
    eval('(' + '\r\nwindow.Encoder = {\r\n    // private property\r\n    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",\r\n\r\n    // public method for encoding\r\n    Encode64: function (input) {\r\n        var output = "";\r\n        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;\r\n        var i = 0;\r\n\r\n        input = Encoder._utf8_encode(input);\r\n\r\n        while (i < input.length) {\r\n\r\n            chr1 = input.charCodeAt(i++);\r\n            chr2 = input.charCodeAt(i++);\r\n            chr3 = input.charCodeAt(i++);\r\n\r\n            enc1 = chr1 >> 2;\r\n            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);\r\n            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);\r\n            enc4 = chr3 & 63;\r\n\r\n            if (isNaN(chr2)) {\r\n                enc3 = enc4 = 64;\r\n            } else if (isNaN(chr3)) {\r\n                enc4 = 64;\r\n            }\r\n\r\n            output = output +\r\n                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +\r\n                    this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);\r\n\r\n        }\r\n\r\n        return output;\r\n    },\r\n\r\n    Decode64: function (input) {\r\n        var output = "";\r\n        var chr1, chr2, chr3;\r\n        var enc1, enc2, enc3, enc4;\r\n        var i = 0;\r\n\r\n        input = input.replace(/[^A-Za-z0-9\\+\\/\\=]/g, "");\r\n\r\n        while (i < input.length) {\r\n\r\n            enc1 = this._keyStr.indexOf(input.charAt(i++));\r\n            enc2 = this._keyStr.indexOf(input.charAt(i++));\r\n            enc3 = this._keyStr.indexOf(input.charAt(i++));\r\n            enc4 = this._keyStr.indexOf(input.charAt(i++));\r\n\r\n            chr1 = (enc1 << 2) | (enc2 >> 4);\r\n            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);\r\n            chr3 = ((enc3 & 3) << 6) | enc4;\r\n\r\n            output = output + String.fromCharCode(chr1);\r\n\r\n            if (enc3 != 64) {\r\n                output = output + String.fromCharCode(chr2);\r\n            }\r\n            if (enc4 != 64) {\r\n                output = output + String.fromCharCode(chr3);\r\n            }\r\n\r\n        }\r\n\r\n        output = Encoder._utf8_decode(output);\r\n\r\n        return output;\r\n\r\n    },\r\n\r\n    // private method for UTF-8 encoding\r\n    _utf8_encode: function (string) {\r\n        string = string.replace(/\\r\\n/g, "\\n");\r\n        var utftext = "";\r\n\r\n        for (var n = 0; n < string.length; n++) {\r\n\r\n            var c = string.charCodeAt(n);\r\n\r\n            if (c < 128) {\r\n                utftext += String.fromCharCode(c);\r\n            } else if ((c > 127) && (c < 2048)) {\r\n                utftext += String.fromCharCode((c >> 6) | 192);\r\n                utftext += String.fromCharCode((c & 63) | 128);\r\n            } else {\r\n                utftext += String.fromCharCode((c >> 12) | 224);\r\n                utftext += String.fromCharCode(((c >> 6) & 63) | 128);\r\n                utftext += String.fromCharCode((c & 63) | 128);\r\n            }\r\n\r\n        }\r\n\r\n        return utftext;\r\n    },\r\n\r\n    // private method for UTF-8 decoding\r\n    _utf8_decode: function (utftext) {\r\n        var string = "";\r\n        var i = 0;\r\n        var c = c1 = c2 = 0;\r\n\r\n        while (i < utftext.length) {\r\n\r\n            c = utftext.charCodeAt(i);\r\n\r\n            if (c < 128) {\r\n                string += String.fromCharCode(c);\r\n                i++;\r\n            } else if ((c > 191) && (c < 224)) {\r\n                c2 = utftext.charCodeAt(i + 1);\r\n                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));\r\n                i += 2;\r\n            } else {\r\n                c2 = utftext.charCodeAt(i + 1);\r\n                c3 = utftext.charCodeAt(i + 2);\r\n                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));\r\n                i += 3;\r\n            }\r\n\r\n        }\r\n\r\n        return string;\r\n    },\r\n\r\n    LzwDecode: function (s) {\r\n        var dict = {};\r\n        var data = (s + "").split("");\r\n        var currChar = data[0];\r\n        var oldPhrase = currChar;\r\n        var out = [currChar];\r\n        var cxd = 256;\r\n        var phrase;\r\n        for (var i = 1; i < data.length; i++) {\r\n            var currCode = data[i].charCodeAt(0);\r\n            if (currCode < 256) {\r\n                phrase = data[i];\r\n            } else {\r\n                phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);\r\n            }\r\n            out.push(phrase);\r\n            currChar = phrase.charAt(0);\r\n            dict[cxd] = oldPhrase + currChar;\r\n            cxd++;\r\n            oldPhrase = phrase;\r\n        }\r\n        return out.join("");\r\n    },\r\n\r\n    LzwEncode: function (uncompressed) {\r\n        //"use strict";\r\n        // Build the dictionary.\r\n        var i,\r\n            dictionary = {},\r\n            c,\r\n            wc,\r\n            w = "",\r\n            result = [],\r\n            dictSize = 256;\r\n        for (i = 0; i < 256; i += 1) {\r\n            dictionary[String.fromCharCode(i)] = i;\r\n        }\r\n\r\n        for (i = 0; i < uncompressed.length; i += 1) {\r\n            c = uncompressed.charAt(i);\r\n            wc = w + c;\r\n            if (dictionary[wc]) {\r\n                w = wc;\r\n            } else {\r\n                result.push(dictionary[w]);\r\n                // Add wc to the dictionary.\r\n                dictionary[wc] = dictSize++;\r\n                w = String(c);\r\n            }\r\n        }\r\n\r\n        // Output the code for w.\r\n        if (w !== "") {\r\n            result.push(dictionary[w]);\r\n        }\r\n        for (var j = 0; j < result.length; j++) {\r\n            result[j] = String.fromCharCode(result[j]);\r\n        }\r\n        return result.join("");\r\n    }\r\n\r\n}' + ')');
})();
SudoNsb.HelpTip._tipImgPath = Config.imgPath2;
SudoNsb.HelpTip._all = [];
SudoNsb.HelpTip._tmr = 0;
Strings.safeFileNameRx = /[^\w\d.-]+/g;
Strings.rxSquish = new RegExp('\\s', 'g');
Strings.rxCompress = new RegExp('\\s+', 'g');
Strings._allowedTagsRx = /(<\/?(?:b|i|u|em|h[0-9]|p|blockquote|abbr|acronym|address|cite|code|del|dfn|sub|sup|strike|big|small|pre|xmp|strong|ul|ol|li|dl|dt|dd|span(?:\s[^>]*)?|img(?:\s[^>]+))>)|(<)|(>)|(&(?:#[0-9]+|[a-z]+);|&)/gi;
Strings._timeFormats = [[60, 'seconds', 1], [120, '1 minute ago', '1 minute from now'], [3600, 'minutes', 60], [7200, '1 hour ago', '1 hour from now'], [86400, 'hours', 3600], [172800, 'Yesterday', 'Tomorrow'], [604800, 'days', 86400], [1209600, 'Last week', 'Next week'], [2419200, 'weeks', 604800], [4838400, 'Last month', 'Next month'], [29030400, 'months', 2419200], [58060800, 'Last year', 'Next year'], [2903040000, 'years', 29030400], [5806080000, 'Last century', 'Next century'], [58060800000, 'centuries', 2903040000]];
SudoNsb.Await.logActions = false;
SudoNsb.Await.passExceptions = false;
SudoNsb.Await._scripts = {};
SudoNsb.Await._simulatedLatency = (([ '192.168.1.19', 'localhost' ]).contains(window.location.hostname)) ? 600 : 0;
SudoNsb.Await.files = {};
SudoNsb.Await.thrown = null;
SudoNsb.Await.ajaxLoadError = 'Ajax Load Error';
(function () {
    SudoNsb.Storage.defaultLocal('@PassExceptions', false);
    SudoNsb.Await.passExceptions = SudoNsb.Storage.getLocal('@PassExceptions');
})();
AwaitTimers._delayedSpinner = 0;
SudoNsb.Files.getUrl = Uri.join(Config.get_appPath(), 'nsb.get.php');
SudoNsb.Files.storeUrl = Uri.join(Config.get_appPath(), 'nsb.put.php');
MyCss._styles = null;
MyCss.alsoInjectToTop = false;
Rx.hasEndSpace = new RegExp('[^\\s]+\\s+$');
Rx.whiteSpace = new RegExp('\\s+');
Rx.cssFilter = new RegExp('(px|pt|em)$');
Rx.emailFilter = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
Rx.placeholder = '<b>&nbsp;</b>';
Snsb.nextGenKey = '@NextGen';
Snsb.svCnt = 0;
Snsb.lastEvent = null;
Snsb._idCnt = 0;
Snsb.halt = false;
Snsb._masterId = null;
Snsb._anonId = null;
(function () {
    SudoNsb.Storage.defaultLocal('@NextGen', false);
})();
SudoNsb.PingItems.error = 'Error';
LocalExceptions.nullReference = 'Null Reference';
LocalExceptions.notImplementedExceptionString = 'Not Implimented';
LocalExceptions.errorLogName = 'Error';
LocalExceptions.recordNotExists = "Record doesn't exist";
LocalExceptions.ajaxLoadError = 'Ajax Load Error';
LocalExceptions.sendMailError = 'Send Mail Error';
(function () {
    SudoNsb.Storage.defaultLocal('@StopOnError', false);
})();
Surface.aboveStyles = '.HiderZee {z-index: 2000 !important;} .GlassZee {z-index: 2100 !important;} .AboveHider {z-index: 2200 !important;} .AboveGlass {z-index: 2300 !important;} .OffPage {position: absolute;top:-100000px !important;left:-100000px !important;}';
Surface._hiderCount = 0;
Surface._hiderElement = null;
Surface._spinnerTgB = Surface._addSpinner();
Surface._spinnerCnt = 0;
Surface._spinnerPreload = false;
Uri.queryData = Uri.pairs(window.location.search);
Uri._uriBase = null;
Uri._instisizer = Date.get_now().getTime().toString();
OnScreen.uninitialized = -999999;
PnxBase.AppEvents.appFocusEv = 'AppFocus.PnxBase';
PnxBase.AppEvents.saveAll = 'AppSaveAll.PnxBase';
PnxBase.RssReader.readCount = 0;
PnxBase.RssReader.hashTotal = 0;
Config.logoAreaSelector = '#logo';
Config.placematClipboardKey = 'NewPlacematList';
Config.playNexusUrl = 'http://www.playnexus.com';
Config.cookieDomain = '.playnexus.com';
Config.hostUrl = window.location.protocol + '//' + window.location.host;
Config.pageUrl = Config.hostUrl + window.location.pathname;
Config.pnxUrl = '/files/pnx';
Config.imgPath = '/files/pnx/img';
Config.imgPath2 = '/files/pnx/img2';
Config._appPath = 'nsb/base/App';
Config.sessionPath = Uri.join(Uri.get_base(), 'nsb/users');
Config.userId = null;
Config.email = null;
Config.userName = null;
Config.applicationScope = 'publish_stream, user_groups, email';
Config.fbAppId = '452063474844272';
Config.fbAppScope = 'publish_stream, user_groups, email';
Config.startTime = Date.get_now().getTime();
Config.loadFactor = 1;
Config.offline = false;
Config.allLoaded = false;
Config._afterConfigFlag = true;
Config._afterConfigStaticFlag = false;
Config.debug = true;
(function () {
    Config._afterConfigStaticFlag = true;
    Config.offline = !window.location.href.indexOf('file://') || window.location.href.indexOf('127.0.0.1') >= 0;
    var deepNsb = ['toolbox.playnexus.com'];
    if (deepNsb.contains(window.location.hostname)) {
        Config.sessionPath = 'focuswheel/nsb/users';
        Config.set_appPath('focuswheel/nsb/base/App');
    }
    PnxCommon.NsbSite.nsbReady(function() {
        Snsb.defer(function() {
            if (window.location.hostname === 'blogs.playnexus.com') {
                FbApi.sharingApi = true;
            }
        });
    });
})();
})(jQuery);

//! This script was generated using Script# v0.7.4.0
