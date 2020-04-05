//! FocusWheel.debug.js
//

(function($) {

Type.registerNamespace('SudoNsb');

////////////////////////////////////////////////////////////////////////////////
// SudoNsb.CssTransition

SudoNsb.CssTransition = function SudoNsb_CssTransition() {
    /// <field name="_jsFull" type="String" static="true">
    /// </field>
    /// <field name="_jsMin" type="String" static="true">
    /// </field>
    /// <field name="_loaded" type="Boolean" static="true">
    /// </field>
}
SudoNsb.CssTransition.animate = function SudoNsb_CssTransition$animate(el, selectors, options) {
    /// <param name="el" type="jQueryObject">
    /// </param>
    /// <param name="selectors" type="Object">
    /// </param>
    /// <param name="options" type="Object">
    /// </param>
    if (!el.transition || !SudoNsb.CssTransition._loaded) {
        Snsb.defer(function() {
            SudoNsb.CssTransition.animate(el, selectors, options);
        }, 13);
        return;
    }
    if (!jQuery.support.transition) jQuery.fn.transition = jQuery.fn.animate;
    el.transition(selectors, options);
}
SudoNsb.CssTransition.fadeIn = function SudoNsb_CssTransition$fadeIn(el, ms, fn) {
    /// <param name="el" type="jQueryObject">
    /// </param>
    /// <param name="ms" type="Number" integer="true">
    /// </param>
    /// <param name="fn" type="Function">
    /// </param>
    if (!el.is(':visible')) {
        el.show();
    }
    if (fn == null) {
        SudoNsb.CssTransition.animate(el, { opacity: 1 }, { duration: ms });
    }
    else {
        SudoNsb.CssTransition.animate(el, { opacity: 1 }, { duration: ms, complete: fn });
    }
}
SudoNsb.CssTransition.fadeOut = function SudoNsb_CssTransition$fadeOut(el, ms, fn) {
    /// <param name="el" type="jQueryObject">
    /// </param>
    /// <param name="ms" type="Number" integer="true">
    /// </param>
    /// <param name="fn" type="Function">
    /// </param>
    if (!el.is(':visible')) {
        el.show();
    }
    if (fn == null) {
        SudoNsb.CssTransition.animate(el, { opacity: 0 }, { duration: ms });
    }
    else {
        SudoNsb.CssTransition.animate(el, { opacity: 0 }, { duration: ms, complete: fn });
    }
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.Dialog

SudoNsb.Dialog = function SudoNsb_Dialog() {
    /// <field name="_css" type="String" static="true">
    /// </field>
}
SudoNsb.Dialog.aw = function SudoNsb_Dialog$aw(awp, tmpHtml, opt) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    /// <param name="tmpHtml" type="jQueryObject">
    /// </param>
    /// <param name="opt" type="Object">
    /// </param>
    MyCss.addStyleOnce((SudoNsb.Dialog).get_fullName(), "\r\n.pnxDialog span.pnxDialogWarn {\r\n    display: inline-block;\r\n    float: right;\r\n    margin: 0 20px 5px 20px;\r\n    width: 50px;\r\n    height: 50px;\r\n    color: transparent;\r\n    background: url('nsb/base/images/warn.svg');\r\n    background-size: cover;\r\n    line-height: 50px;\r\n}\r\n");
    var buttons = [];
    if (opt.buttons != null) {
        var $enum1 = ss.IEnumerator.getEnumerator(opt.buttons);
        while ($enum1.moveNext()) {
            var d = $enum1.current;
            buttons.add(d);
        }
        delete opt.buttons;
    }
    if (opt.cancelBtn) {
        buttons.add({ text: (opt.cancelFace || 'Cancel'), click: SudoNsb.Dialog.closeCx(opt.cancelFn) });
    }
    if (!opt.noOkBtn) {
        buttons.add({ text: (opt.okFace || 'Ok'), click: SudoNsb.Dialog.closeCx(opt.okFn) });
    }
    if (opt.warn) {
        tmpHtml.prepend("<span class='pnxDialogWarn'>&nbsp;</span>");
    }
    var dlg = tmpHtml;
    var deflts = { title: 'The Doctor', width: 363, modal: true, dialogClass: 'AboveHider pnxDialog', position: { my: 'center', at: 'center center-200' }, show: { effect: 'explode', duration: 400 }, hide: { effect: 'explode', duration: 400 }, buttons: buttons, close: function() {
        dlg.dialog('destroy');
        dlg.remove();
        if (opt.onClose != null) {
            opt.onClose();
        }
        awp.done();
    } };
    $.extend(deflts, opt);
    dlg.appendTo(document.body);
    dlg.dialog(deflts);
}
SudoNsb.Dialog.closeCx = function SudoNsb_Dialog$closeCx(fn) {
    /// <summary>
    /// Closes the dialog executing the passed function if it is not null.
    /// </summary>
    /// <param name="fn" type="Function">
    /// Function to execute on close.
    /// </param>
    /// <returns type="Function"></returns>
    return function() {
        $(this).dialog('close');
        if (fn != null) {
            fn();
        }
    };
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.PrefixFree

SudoNsb.PrefixFree = function SudoNsb_PrefixFree() {
    /// <field name="_jsFull" type="String" static="true">
    /// </field>
    /// <field name="_jsMin" type="String" static="true">
    /// </field>
    /// <field name="_jsDynamic" type="String" static="true">
    /// </field>
    /// <field name="_loaded" type="Boolean" static="true">
    /// </field>
}
SudoNsb.PrefixFree.processNow = function SudoNsb_PrefixFree$processNow() {
    try {
        window.$ = undefined;
        eval("(function(){function t(e,t){return[].slice.call((t||document).querySelectorAll(e))}if(!window.addEventListener)return;var e=window.StyleFix={link:function(t){try{if(t.rel!==\"stylesheet\"||t.hasAttribute(\"data-noprefix\"))return}catch(n){return}var r=t.href||t.getAttribute(\"data-href\"),i=r.replace(/[^\\/]+$/,\"\"),s=(/^[a-z]{3,10}:/.exec(i)||[\"\"])[0],o=(/^[a-z]{3,10}:\\/\\/[^\\/]+/.exec(i)||[\"\"])[0],u=/^([^?]*)\\??/.exec(r)[1],a=t.parentNode,f=new XMLHttpRequest,l;f.onreadystatechange=function(){f.readyState===4&&l()};l=function(){var n=f.responseText;if(n&&t.parentNode&&(!f.status||f.status<400||f.status>600)){n=e.fix(n,!0,t);if(i){n=n.replace(/url\\(\\s*?((?:\"|')?)(.+?)\\1\\s*?\\)/gi,function(e,t,n){return/^([a-z]{3,10}:|#)/i.test(n)?e:/^\\/\\//.test(n)?'url(\"'+s+n+'\")':/^\\//.test(n)?'url(\"'+o+n+'\")':/^\\?/.test(n)?'url(\"'+u+n+'\")':'url(\"'+i+n+'\")'});var r=i.replace(/([\\\\\\^\\$*+[\\]?{}.=!:(|)])/g,\"\\\\$1\");n=n.replace(RegExp(\"\\\\b(behavior:\\\\s*?url\\\\('?\\\"?)\"+r,\"gi\"),\"$1\")}var l=document.createElement(\"style\");l.textContent=n;l.media=t.media;l.disabled=t.disabled;l.setAttribute(\"data-href\",t.getAttribute(\"href\"));a.insertBefore(l,t);a.removeChild(t);l.media=t.media}};try{f.open(\"GET\",r);f.send(null)}catch(n){if(typeof XDomainRequest!=\"undefined\"){f=new XDomainRequest;f.onerror=f.onprogress=function(){};f.onload=l;f.open(\"GET\",r);f.send(null)}}t.setAttribute(\"data-inprogress\",\"\")},styleElement:function(t){if(t.hasAttribute(\"data-noprefix\"))return;var n=t.disabled;t.textContent=e.fix(t.textContent,!0,t);t.disabled=n},styleAttribute:function(t){var n=t.getAttribute(\"style\");n=e.fix(n,!1,t);t.setAttribute(\"style\",n)},process:function(){t('link[rel=\"stylesheet\"]:not([data-inprogress])').forEach(StyleFix.link);t(\"style\").forEach(StyleFix.styleElement);t(\"[style]\").forEach(StyleFix.styleAttribute)},register:function(t,n){(e.fixers=e.fixers||[]).splice(n===undefined?e.fixers.length:n,0,t)},fix:function(t,n,r){for(var i=0;i<e.fixers.length;i++)t=e.fixers[i](t,n,r)||t;return t},camelCase:function(e){return e.replace(/-([a-z])/g,function(e,t){return t.toUpperCase()}).replace(\"-\",\"\")},deCamelCase:function(e){return e.replace(/[A-Z]/g,function(e){return\"-\"+e.toLowerCase()})}};(function(){setTimeout(function(){t('link[rel=\"stylesheet\"]').forEach(StyleFix.link)},10);document.addEventListener(\"DOMContentLoaded\",StyleFix.process,!1)})()})();(function(e){function t(e,t,r,i,s){e=n[e];if(e.length){var o=RegExp(t+\"(\"+e.join(\"|\")+\")\"+r,\"gi\");s=s.replace(o,i)}return s}if(!window.StyleFix||!window.getComputedStyle)return;var n=window.PrefixFree={prefixCSS:function(e,r,i){var s=n.prefix;n.functions.indexOf(\"linear-gradient\")>-1&&(e=e.replace(/(\\s|:|,)(repeating-)?linear-gradient\\(\\s*(-?\\d*\\.?\\d*)deg/ig,function(e,t,n,r){return t+(n||\"\")+\"linear-gradient(\"+(90-r)+\"deg\"}));e=t(\"functions\",\"(\\\\s|:|,)\",\"\\\\s*\\\\(\",\"$1\"+s+\"$2(\",e);e=t(\"keywords\",\"(\\\\s|:)\",\"(\\\\s|;|\\\\}|$)\",\"$1\"+s+\"$2$3\",e);e=t(\"properties\",\"(^|\\\\{|\\\\s|;)\",\"\\\\s*:\",\"$1\"+s+\"$2:\",e);if(n.properties.length){var o=RegExp(\"\\\\b(\"+n.properties.join(\"|\")+\")(?!:)\",\"gi\");e=t(\"valueProperties\",\"\\\\b\",\":(.+?);\",function(e){return e.replace(o,s+\"$1\")},e)}if(r){e=t(\"selectors\",\"\",\"\\\\b\",n.prefixSelector,e);e=t(\"atrules\",\"@\",\"\\\\b\",\"@\"+s+\"$1\",e)}e=e.replace(RegExp(\"-\"+s,\"g\"),\"-\");e=e.replace(/-\\*-(?=[a-z]+)/gi,n.prefix);return e},property:function(e){return(n.properties.indexOf(e)>=0?n.prefix:\"\")+e},value:function(e,r){e=t(\"functions\",\"(^|\\\\s|,)\",\"\\\\s*\\\\(\",\"$1\"+n.prefix+\"$2(\",e);e=t(\"keywords\",\"(^|\\\\s)\",\"(\\\\s|$)\",\"$1\"+n.prefix+\"$2$3\",e);n.valueProperties.indexOf(r)>=0&&(e=t(\"properties\",\"(^|\\\\s|,)\",\"($|\\\\s|,)\",\"$1\"+n.prefix+\"$2$3\",e));return e},prefixSelector:function(e){return e.replace(/^:{1,2}/,function(e){return e+n.prefix})},prefixProperty:function(e,t){var r=n.prefix+e;return t?StyleFix.camelCase(r):r}};(function(){var e={},t=[],r={},i=getComputedStyle(document.documentElement,null),s=document.createElement(\"div\").style,o=function(n){if(n.charAt(0)===\"-\"){t.push(n);var r=n.split(\"-\"),i=r[1];e[i]=++e[i]||1;while(r.length>3){r.pop();var s=r.join(\"-\");u(s)&&t.indexOf(s)===-1&&t.push(s)}}},u=function(e){return StyleFix.camelCase(e)in s};if(i.length>0)for(var a=0;a<i.length;a++)o(i[a]);else for(var f in i)o(StyleFix.deCamelCase(f));var l={uses:0};for(var c in e){var h=e[c];l.uses<h&&(l={prefix:c,uses:h})}n.prefix=\"-\"+l.prefix+\"-\";n.Prefix=StyleFix.camelCase(n.prefix);n.properties=[];for(var a=0;a<t.length;a++){var f=t[a];if(f.indexOf(n.prefix)===0){var p=f.slice(n.prefix.length);u(p)||n.properties.push(p)}}n.Prefix==\"Ms\"&&!(\"transform\"in s)&&!(\"MsTransform\"in s)&&\"msTransform\"in s&&n.properties.push(\"transform\",\"transform-origin\");n.properties.sort()})();(function(){function i(e,t){r[t]=\"\";r[t]=e;return!!r[t]}var e={\"linear-gradient\":{property:\"backgroundImage\",params:\"red, teal\"},calc:{property:\"width\",params:\"1px + 5%\"},element:{property:\"backgroundImage\",params:\"#foo\"},\"cross-fade\":{property:\"backgroundImage\",params:\"url(a.png), url(b.png), 50%\"}};e[\"repeating-linear-gradient\"]=e[\"repeating-radial-gradient\"]=e[\"radial-gradient\"]=e[\"linear-gradient\"];var t={initial:\"color\",\"zoom-in\":\"cursor\",\"zoom-out\":\"cursor\",box:\"display\",flexbox:\"display\",\"inline-flexbox\":\"display\",flex:\"display\",\"inline-flex\":\"display\",grid:\"display\",\"inline-grid\":\"display\",\"min-content\":\"width\"};n.functions=[];n.keywords=[];var r=document.createElement(\"div\").style;for(var s in e){var o=e[s],u=o.property,a=s+\"(\"+o.params+\")\";!i(a,u)&&i(n.prefix+a,u)&&n.functions.push(s)}for(var f in t){var u=t[f];!i(f,u)&&i(n.prefix+f,u)&&n.keywords.push(f)}})();(function(){function s(e){i.textContent=e+\"{}\";return!!i.sheet.cssRules.length}var t={\":read-only\":null,\":read-write\":null,\":any-link\":null,\"::selection\":null},r={keyframes:\"name\",viewport:null,document:'regexp(\".\")'};n.selectors=[];n.atrules=[];var i=e.appendChild(document.createElement(\"style\"));for(var o in t){var u=o+(t[o]?\"(\"+t[o]+\")\":\"\");!s(u)&&s(n.prefixSelector(u))&&n.selectors.push(o)}for(var a in r){var u=a+\" \"+(r[a]||\"\");!s(\"@\"+u)&&s(\"@\"+n.prefix+u)&&n.atrules.push(a)}e.removeChild(i)})();n.valueProperties=[\"transition\",\"transition-property\"];e.className+=\" \"+n.prefix;StyleFix.register(n.prefixCSS)})(document.documentElement);");
        SudoNsb.PrefixFree._loaded = true;
        window.$ = undefined;
        jQuery('style').forEach(StyleFix.styleElement);;
    }
    catch (ex) {
        debugger;
        Inform.warn('PrefixFree error {0}', ex);
    }
}
SudoNsb.PrefixFree.process = function SudoNsb_PrefixFree$process() {
    Snsb.defer(SudoNsb.PrefixFree.processNow);
}
SudoNsb.PrefixFree.addStyleOnce = function SudoNsb_PrefixFree$addStyleOnce(name, style) {
    /// <param name="name" type="String">
    /// </param>
    /// <param name="style" type="String">
    /// </param>
    var stl = MyCss.addStyleOnce(name, style);
    if (!SudoNsb.PrefixFree._loaded) {
        $('link').attr('data-noprefix', 'data-noprefix');
        eval("(function(){function t(e,t){return[].slice.call((t||document).querySelectorAll(e))}if(!window.addEventListener)return;var e=window.StyleFix={link:function(t){try{if(t.rel!==\"stylesheet\"||t.hasAttribute(\"data-noprefix\"))return}catch(n){return}var r=t.href||t.getAttribute(\"data-href\"),i=r.replace(/[^\\/]+$/,\"\"),s=(/^[a-z]{3,10}:/.exec(i)||[\"\"])[0],o=(/^[a-z]{3,10}:\\/\\/[^\\/]+/.exec(i)||[\"\"])[0],u=/^([^?]*)\\??/.exec(r)[1],a=t.parentNode,f=new XMLHttpRequest,l;f.onreadystatechange=function(){f.readyState===4&&l()};l=function(){var n=f.responseText;if(n&&t.parentNode&&(!f.status||f.status<400||f.status>600)){n=e.fix(n,!0,t);if(i){n=n.replace(/url\\(\\s*?((?:\"|')?)(.+?)\\1\\s*?\\)/gi,function(e,t,n){return/^([a-z]{3,10}:|#)/i.test(n)?e:/^\\/\\//.test(n)?'url(\"'+s+n+'\")':/^\\//.test(n)?'url(\"'+o+n+'\")':/^\\?/.test(n)?'url(\"'+u+n+'\")':'url(\"'+i+n+'\")'});var r=i.replace(/([\\\\\\^\\$*+[\\]?{}.=!:(|)])/g,\"\\\\$1\");n=n.replace(RegExp(\"\\\\b(behavior:\\\\s*?url\\\\('?\\\"?)\"+r,\"gi\"),\"$1\")}var l=document.createElement(\"style\");l.textContent=n;l.media=t.media;l.disabled=t.disabled;l.setAttribute(\"data-href\",t.getAttribute(\"href\"));a.insertBefore(l,t);a.removeChild(t);l.media=t.media}};try{f.open(\"GET\",r);f.send(null)}catch(n){if(typeof XDomainRequest!=\"undefined\"){f=new XDomainRequest;f.onerror=f.onprogress=function(){};f.onload=l;f.open(\"GET\",r);f.send(null)}}t.setAttribute(\"data-inprogress\",\"\")},styleElement:function(t){if(t.hasAttribute(\"data-noprefix\"))return;var n=t.disabled;t.textContent=e.fix(t.textContent,!0,t);t.disabled=n},styleAttribute:function(t){var n=t.getAttribute(\"style\");n=e.fix(n,!1,t);t.setAttribute(\"style\",n)},process:function(){t('link[rel=\"stylesheet\"]:not([data-inprogress])').forEach(StyleFix.link);t(\"style\").forEach(StyleFix.styleElement);t(\"[style]\").forEach(StyleFix.styleAttribute)},register:function(t,n){(e.fixers=e.fixers||[]).splice(n===undefined?e.fixers.length:n,0,t)},fix:function(t,n,r){for(var i=0;i<e.fixers.length;i++)t=e.fixers[i](t,n,r)||t;return t},camelCase:function(e){return e.replace(/-([a-z])/g,function(e,t){return t.toUpperCase()}).replace(\"-\",\"\")},deCamelCase:function(e){return e.replace(/[A-Z]/g,function(e){return\"-\"+e.toLowerCase()})}};(function(){setTimeout(function(){t('link[rel=\"stylesheet\"]').forEach(StyleFix.link)},10);document.addEventListener(\"DOMContentLoaded\",StyleFix.process,!1)})()})();(function(e){function t(e,t,r,i,s){e=n[e];if(e.length){var o=RegExp(t+\"(\"+e.join(\"|\")+\")\"+r,\"gi\");s=s.replace(o,i)}return s}if(!window.StyleFix||!window.getComputedStyle)return;var n=window.PrefixFree={prefixCSS:function(e,r,i){var s=n.prefix;n.functions.indexOf(\"linear-gradient\")>-1&&(e=e.replace(/(\\s|:|,)(repeating-)?linear-gradient\\(\\s*(-?\\d*\\.?\\d*)deg/ig,function(e,t,n,r){return t+(n||\"\")+\"linear-gradient(\"+(90-r)+\"deg\"}));e=t(\"functions\",\"(\\\\s|:|,)\",\"\\\\s*\\\\(\",\"$1\"+s+\"$2(\",e);e=t(\"keywords\",\"(\\\\s|:)\",\"(\\\\s|;|\\\\}|$)\",\"$1\"+s+\"$2$3\",e);e=t(\"properties\",\"(^|\\\\{|\\\\s|;)\",\"\\\\s*:\",\"$1\"+s+\"$2:\",e);if(n.properties.length){var o=RegExp(\"\\\\b(\"+n.properties.join(\"|\")+\")(?!:)\",\"gi\");e=t(\"valueProperties\",\"\\\\b\",\":(.+?);\",function(e){return e.replace(o,s+\"$1\")},e)}if(r){e=t(\"selectors\",\"\",\"\\\\b\",n.prefixSelector,e);e=t(\"atrules\",\"@\",\"\\\\b\",\"@\"+s+\"$1\",e)}e=e.replace(RegExp(\"-\"+s,\"g\"),\"-\");e=e.replace(/-\\*-(?=[a-z]+)/gi,n.prefix);return e},property:function(e){return(n.properties.indexOf(e)>=0?n.prefix:\"\")+e},value:function(e,r){e=t(\"functions\",\"(^|\\\\s|,)\",\"\\\\s*\\\\(\",\"$1\"+n.prefix+\"$2(\",e);e=t(\"keywords\",\"(^|\\\\s)\",\"(\\\\s|$)\",\"$1\"+n.prefix+\"$2$3\",e);n.valueProperties.indexOf(r)>=0&&(e=t(\"properties\",\"(^|\\\\s|,)\",\"($|\\\\s|,)\",\"$1\"+n.prefix+\"$2$3\",e));return e},prefixSelector:function(e){return e.replace(/^:{1,2}/,function(e){return e+n.prefix})},prefixProperty:function(e,t){var r=n.prefix+e;return t?StyleFix.camelCase(r):r}};(function(){var e={},t=[],r={},i=getComputedStyle(document.documentElement,null),s=document.createElement(\"div\").style,o=function(n){if(n.charAt(0)===\"-\"){t.push(n);var r=n.split(\"-\"),i=r[1];e[i]=++e[i]||1;while(r.length>3){r.pop();var s=r.join(\"-\");u(s)&&t.indexOf(s)===-1&&t.push(s)}}},u=function(e){return StyleFix.camelCase(e)in s};if(i.length>0)for(var a=0;a<i.length;a++)o(i[a]);else for(var f in i)o(StyleFix.deCamelCase(f));var l={uses:0};for(var c in e){var h=e[c];l.uses<h&&(l={prefix:c,uses:h})}n.prefix=\"-\"+l.prefix+\"-\";n.Prefix=StyleFix.camelCase(n.prefix);n.properties=[];for(var a=0;a<t.length;a++){var f=t[a];if(f.indexOf(n.prefix)===0){var p=f.slice(n.prefix.length);u(p)||n.properties.push(p)}}n.Prefix==\"Ms\"&&!(\"transform\"in s)&&!(\"MsTransform\"in s)&&\"msTransform\"in s&&n.properties.push(\"transform\",\"transform-origin\");n.properties.sort()})();(function(){function i(e,t){r[t]=\"\";r[t]=e;return!!r[t]}var e={\"linear-gradient\":{property:\"backgroundImage\",params:\"red, teal\"},calc:{property:\"width\",params:\"1px + 5%\"},element:{property:\"backgroundImage\",params:\"#foo\"},\"cross-fade\":{property:\"backgroundImage\",params:\"url(a.png), url(b.png), 50%\"}};e[\"repeating-linear-gradient\"]=e[\"repeating-radial-gradient\"]=e[\"radial-gradient\"]=e[\"linear-gradient\"];var t={initial:\"color\",\"zoom-in\":\"cursor\",\"zoom-out\":\"cursor\",box:\"display\",flexbox:\"display\",\"inline-flexbox\":\"display\",flex:\"display\",\"inline-flex\":\"display\",grid:\"display\",\"inline-grid\":\"display\",\"min-content\":\"width\"};n.functions=[];n.keywords=[];var r=document.createElement(\"div\").style;for(var s in e){var o=e[s],u=o.property,a=s+\"(\"+o.params+\")\";!i(a,u)&&i(n.prefix+a,u)&&n.functions.push(s)}for(var f in t){var u=t[f];!i(f,u)&&i(n.prefix+f,u)&&n.keywords.push(f)}})();(function(){function s(e){i.textContent=e+\"{}\";return!!i.sheet.cssRules.length}var t={\":read-only\":null,\":read-write\":null,\":any-link\":null,\"::selection\":null},r={keyframes:\"name\",viewport:null,document:'regexp(\".\")'};n.selectors=[];n.atrules=[];var i=e.appendChild(document.createElement(\"style\"));for(var o in t){var u=o+(t[o]?\"(\"+t[o]+\")\":\"\");!s(u)&&s(n.prefixSelector(u))&&n.selectors.push(o)}for(var a in r){var u=a+\" \"+(r[a]||\"\");!s(\"@\"+u)&&s(\"@\"+n.prefix+u)&&n.atrules.push(a)}e.removeChild(i)})();n.valueProperties=[\"transition\",\"transition-property\"];e.className+=\" \"+n.prefix;StyleFix.register(n.prefixCSS)})(document.documentElement);");
        SudoNsb.PrefixFree._loaded = true;
    }
    Snsb.defer(function() {
        try {
            if (stl != null) {
                StyleFix.styleElement(stl[0]);
            }
        }
        catch (ex) {
            debugger;
            Inform.warn('PrefixFree error {0}', ex);
        }
    });
}


////////////////////////////////////////////////////////////////////////////////
// SqlStorage

SqlStorage = function SqlStorage() {
    /// <field name="sqlDataFromServerOnly" type="String" static="true">
    /// </field>
    /// <field name="isSession" type="Boolean" static="true">
    /// </field>
}
SqlStorage.get_browserId = function SqlStorage$get_browserId() {
    /// <value type="SudoNsb.BrowserType"></value>
    var bb = SudoNsb.Storage.getLocal('PnxBrowserId');
    if (Snsb.isEmpty(bb)) {
        bb = new SudoNsb.BrowserType();
        bb.id = Snsb.get_newGuid();
        bb.browser = $.browser;
        SudoNsb.Storage.setLocal('PnxBrowserId', bb);
    }
    return bb;
}
SqlStorage.topicUserKey = function SqlStorage$topicUserKey(topic) {
    /// <param name="topic" type="String">
    /// </param>
    /// <returns type="String"></returns>
    return String.format('#[{0}][{1}]', topic, ((Snsb.get_isPxUser()) ? Snsb.get_masterId() : ''));
}
SqlStorage.saveTopic = function SqlStorage$saveTopic(topic, data, session) {
    /// <param name="topic" type="String">
    /// </param>
    /// <param name="data" type="Object">
    /// </param>
    /// <param name="session" type="Boolean">
    /// </param>
    var lclKey = SqlStorage.topicUserKey(topic);
    if (session) {
        SudoNsb.Storage.setSession(lclKey, data, true);
    }
    else {
        SudoNsb.Storage.setLocal(lclKey, data, true);
    }
    if (Snsb.get_isPxUser()) {
        SqlStorage.storeAw(SudoNsb.Await.get_asyncAw(), topic, data);
    }
}
SqlStorage.loadTopicAw = function SqlStorage$loadTopicAw(awp, topic, type, session) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    /// <param name="topic" type="String">
    /// </param>
    /// <param name="type" type="Type">
    /// </param>
    /// <param name="session" type="Boolean">
    /// </param>
    var lclKey = SqlStorage.topicUserKey(topic);
    var res = (session) ? SudoNsb.Storage.getSession(lclKey, true) : SudoNsb.Storage.getLocal(lclKey, true);
    if ((SudoNsb.Storage.getLocal('@SqlDataFromServerOnly') || res == null) && Snsb.get_isPxUser()) {
        new SudoNsb.Await().addAw(SqlStorage.retrieveAw, topic).addDl(function(aw) {
            res = SqlThings.fromResultOrNull(aw.get_result(), type) || eval('new ' + type.get_fullName());
            SqlStorage.tellDiffBrowserAw(aw, res.browserId);
        }).addDl(function(aw) {
            aw.done(res);
        }).commit(awp);
    }
    else {
        awp.done(res || eval('new ' + type.get_fullName()));
    }
}
SqlStorage.removeTopicAw = function SqlStorage$removeTopicAw(awp, topic, session) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    /// <param name="topic" type="String">
    /// </param>
    /// <param name="session" type="Boolean">
    /// </param>
    var lclKey = SqlStorage.topicUserKey(topic);
    if (session) {
        SudoNsb.Storage.removeSession(lclKey);
    }
    else {
        SudoNsb.Storage.removeLocal(lclKey);
    }
    if (Snsb.get_isPxUser()) {
        SqlStorage.removeAw(awp, topic);
    }
    else {
        awp.done();
    }
}
SqlStorage.tellDiffBrowserAw = function SqlStorage$tellDiffBrowserAw(awp, bt) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    /// <param name="bt" type="SudoNsb.BrowserType">
    /// </param>
    if (!Snsb.isEmpty(bt) && bt.id !== SqlStorage.get_browserId().id) {
        SudoNsb.Dialog.aw(awp, $('<div>Note that this session is being continued from another browser. Please continue here and remember to reload that other browser if you return to it.</div>'), { warn: true, okFace: 'Thanks!' });
    }
    else {
        awp.done();
    }
}
SqlStorage.storeAw = function SqlStorage$storeAw(awp, topic, thing) {
    /// <summary>
    /// Stores a thing by topic synchronosly with server generated id upon new entry only.
    /// This works similar to Storage.SetLocal() but on the server.
    /// The user id is automatically filled from Snsb.MasterId and secret is implicit.
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
    var td = new SudoNsb.SqlThingData();
    td.topic = topic;
    td.thing = thing;
    td.secret = true;
    td.id = 'single';
    SqlThings.storeThingAw(awp, td);
}
SqlStorage.retrieveAw = function SqlStorage$retrieveAw(awp, topic) {
    /// <summary>
    /// Retrieves by topic filling in userId from Snsb.MasterId and assuming secret because must be the same user
    /// </summary>
    /// <param name="awp" type="SudoNsb.Await">
    /// The awp.
    /// </param>
    /// <param name="topic" type="String">
    /// The topic.
    /// </param>
    SqlThings.retrieveTopicsAw(awp, topic, Snsb.get_masterId(), true);
}
SqlStorage.removeAw = function SqlStorage$removeAw(awp, topic) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    /// <param name="topic" type="String">
    /// </param>
    if (typeof(topic) === 'string') {
        var td = new SudoNsb.SqlThingData();
        td.topic = topic;
        td.secret = true;
        td.id = 'single';
        td.userId = Snsb.get_masterId();
        SqlThings.removeThingAw(awp, td);
    }
    else {
        SqlThings.removeThingAw(awp, topic);
    }
}
SqlStorage.retrieveSmartAw = function SqlStorage$retrieveSmartAw(awp, key, dlFn) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    /// <param name="key" type="String">
    /// </param>
    /// <param name="dlFn" type="SudoNsb.Function">
    /// </param>
    var dm = SudoNsb.Storage.getSession(key, true);
    if (dm == null) {
        new SudoNsb.Await().addDl(dlFn).addDx(function(aw) {
            SudoNsb.Storage.setSession(key, aw.get_result(), true);
        }).commit(awp);
        return;
    }
    new SudoNsb.Await().addDl(dlFn).addDx(function(aw) {
        SudoNsb.Storage.setSession(key, aw.get_result(), true);
    }).commit();
    awp.done(dm);
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.BrowserType

SudoNsb.BrowserType = function SudoNsb_BrowserType() {
    /// <field name="browser" type="jQueryBrowser">
    /// </field>
    /// <field name="id" type="String">
    /// </field>
}
SudoNsb.BrowserType.prototype = {
    browser: null,
    id: null
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.UnitTest

SudoNsb.UnitTest = function SudoNsb_UnitTest() {
    /// <field name="_css$1" type="String" static="true">
    /// </field>
    /// <field name="_logClassName$1" type="String" static="true">
    /// </field>
    /// <field name="allFailed" type="Number" integer="true">
    /// </field>
    /// <field name="allPassed" type="Number" integer="true">
    /// </field>
    /// <field name="allTests" type="Number" integer="true">
    /// </field>
    /// <field name="allTotal" type="Number" integer="true">
    /// </field>
    /// <field name="div" type="jQueryObject">
    /// </field>
    /// <field name="failed" type="Number" integer="true">
    /// </field>
    /// <field name="log" type="jQueryObject">
    /// </field>
    /// <field name="passed" type="Number" integer="true">
    /// </field>
    /// <field name="setItem" type="SudoNsb.UnitTestItem">
    /// </field>
    /// <field name="testItem" type="SudoNsb.UnitTestItem">
    /// </field>
    /// <field name="testNum" type="Number" integer="true">
    /// </field>
    /// <field name="thisTestNum" type="Number" integer="true">
    /// </field>
    /// <field name="total" type="Number" integer="true">
    /// </field>
    /// <field name="_log$1" type="String">
    /// </field>
    /// <field name="_name$1" type="String">
    /// </field>
    /// <field name="_totalInSet$1" type="Number" integer="true">
    /// </field>
    /// <field name="_totalSets$1" type="Number" integer="true">
    /// </field>
    /// <field name="_allStartTime$1" type="Number" integer="true">
    /// </field>
    /// <field name="_allEndTime$1" type="Number" integer="true">
    /// </field>
    SudoNsb.UnitTest.initializeBase(this);
}
SudoNsb.UnitTest.deleteTestsAw = function SudoNsb_UnitTest$deleteTestsAw(awp) {
    /// <summary>
    /// Removes all the test user things from the database.
    /// </summary>
    /// <param name="awp" type="SudoNsb.Await">
    /// The awp.
    /// </param>
    new SudoNsb.Await().addAw(BrowserUser.waitSessionLockAw).addDl(function(aw) {
        var keys = { userId: Snsb.get_masterId() };
        SqlThings.rawTransactAw(aw, keys, 'deleteTests');
    }).addDx(function(aw) {
        aw.set_result((aw.get_item(SqlThings.sqlReturnKey))['result']);
    }).commit(awp);
}
SudoNsb.UnitTest.prototype = {
    allFailed: 0,
    allPassed: 0,
    allTests: 0,
    allTotal: 0,
    div: null,
    failed: 0,
    log: null,
    passed: 0,
    setItem: null,
    testItem: null,
    testNum: 0,
    thisTestNum: 0,
    total: 0,
    _log$1: '',
    _name$1: null,
    _totalInSet$1: 0,
    _totalSets$1: 0,
    _allStartTime$1: 0,
    _allEndTime$1: 0,
    
    initialize: function SudoNsb_UnitTest$initialize(div) {
        /// <param name="div" type="jQueryObject">
        /// </param>
        this.allTests = this.testNum = 0;
        this.allPassed = this.allFailed = this.allTotal = 0;
        this._allStartTime$1 = Date.get_now().getTime();
        div.empty();
        MyCss.addStyleOnce((SudoNsb.UnitTest).get_fullName(), "\r\nh1#MasterRun { margin-bottom: 20px; }\r\ndiv.LogClass h2 {\r\n    border-top: 2px solid rgba(0,0,0,.2);\r\n}\r\ndiv.LogClass h2.more {\r\n    margin-top: 50px;\r\n}\r\ndiv.LogClass h3  {\r\n    font-size: 120%;\r\n    margin: 0 0 8px 0;\r\n}\r\ndiv.LogClass ul {\r\n    list-style: none outside;\r\n    margin-left: 30px;\r\n}\r\ndiv.LogClass ul li {\r\n    list-style: none;\r\n}\r\ndiv.LogClass ul li.result {\r\n    margin-left: 36px;\r\n}\r\ndiv.LogClass ul li.title {\r\n    list-style-type: none\r\n    margin-left: -20px;\r\n}\r\ndiv.LogClass ul li.error {\r\n    list-style-type: none;\r\n    margin-left: 0;\r\n}\r\ndiv.LogClass ul li.closed {\r\n    height: 16px;\r\n    overflow: hidden;\r\n}\r\ndiv.LogClass ul li.closed:hover {\r\n    cursor: pointer;\r\n}\r\ndiv.LogClass li label {\r\n    display: inline-block;\r\n    width: 50px;\r\n}\r\ndiv.LogClass li.passed label {\r\n    color: #090;\r\n}\r\ndiv.LogClass li.failed label {\r\n    color: #900;\r\n}\r\ndiv.LogClass xmp {\r\n    margin: 0 0 0 56px;\r\n    padding: 0 0 0 5px;\r\n    border-left: 2px solid #9af;\r\n    font-size: 10pt;\r\n    line-height: 16px;\r\n}\r\ndiv.LogClass li.failed span.not {\r\n    color: #900;\r\n}\r\ndiv.LogClass li.failed span.not:before {\r\n    content: 'not ';\r\n    color: #009;\r\n}\r\ndiv.LogClass .red {\r\n    color: #900;\r\n}\r\ndiv.LogClass .green {\r\n    color: #090;\r\n}\r\n");
        this.div = div;
        this.div.addClass('LogClass').append("<ul id='Log'></ul>");
        this.log = $('#Log');
        $(document.body).on('click', 'li.closed,li.closed xmp', function(e) {
            if (!e.button) {
                $(e.target).closest('li').removeClass('closed').addClass('open');
            }
        });
        $(document.body).on('click', 'li.open,li.open xmp', function(e) {
            if (e.ctrlKey) {
                $(e.target).closest('li').removeClass('open').addClass('closed');
            }
        });
    },
    
    _printLine$1: function SudoNsb_UnitTest$_printLine$1(msg) {
        /// <param name="msg" type="String">
        /// </param>
        if (this.log != null) {
            this.log.append(msg);
        }
        else {
            throw new Error('UnitTest log not initialized');
        }
    },
    
    writeBlock: function SudoNsb_UnitTest$writeBlock(msg) {
        /// <param name="msg" type="String">
        /// </param>
        msg = msg.replaceAll('\t', '    ');
        msg = String.format("<li class='info closed' title'click to open, ctrl-click to close'><xmp>{0}</xmp></li>", msg);
        this._log$1 += msg;
        this._printLine$1(msg);
    },
    
    writeTitle: function SudoNsb_UnitTest$writeTitle(msg) {
        /// <param name="msg" type="String">
        /// </param>
        msg = msg.replaceAll('\t', '    ');
        msg = String.format("<li class='info title'>{0}</li>", msg);
        this._log$1 += msg;
        this._printLine$1(msg);
    },
    
    writeError: function SudoNsb_UnitTest$writeError(msg) {
        /// <param name="msg" type="String">
        /// </param>
        msg = msg.replaceAll('\t', '    ');
        msg = String.format("<li class='error failed'><label>Error</label> {0}</li>", msg);
        this._log$1 += msg;
        this._printLine$1(msg);
    },
    
    verify: function SudoNsb_UnitTest$verify(fn, msg) {
        /// <param name="fn" type="System.Func`1">
        /// </param>
        /// <param name="msg" type="String">
        /// </param>
        var ic;
        Inform.debug('type={0}, msg={1}', typeof(msg), msg);
        if (typeof(msg) === 'function') {
            var msgFn = msg;
            msg = msgFn();
        }
        try {
            ic = this.testItem.ic = fn();
        }
        catch ($e1) {
            ic = false;
        }
        if (ic) {
            msg = String.format("<li class='passed result'><label>Passed</label> {0}</li>", msg || '');
            this.passed++;
        }
        else {
            msg = String.format("<li class='failed result'><label>Failed</label> <span class='not'>{0}</span></li>", msg || this.testItem.verFnStr || fn.toString());
            this.failed++;
        }
        this.total++;
        var err = SudoNsb.Storage.getSession(Inform.lastErrorKey);
        this._log$1 += msg;
        this._printLine$1(msg);
        if (!String.isNullOrEmpty(err)) {
            this.writeError(err);
        }
        this.testItem.verFnStr = null;
    },
    
    verifyEx: function SudoNsb_UnitTest$verifyEx(fn, msg) {
        /// <param name="fn" type="System.Func`1">
        /// </param>
        /// <param name="msg" type="String">
        /// </param>
        this.verify(fn, msg);
        if (!this.testItem.ic) {
            this.abort();
        }
    },
    
    verIf: function SudoNsb_UnitTest$verIf(fn, msg) {
        /// <param name="fn" type="System.Func`2">
        /// </param>
        /// <param name="msg" type="String">
        /// </param>
        /// <returns type="SudoNsb.UnitTest"></returns>
        var ti = this.testItem;
        var cFn = fn.toString();
        this.addDx(ss.Delegate.create(this, function(aw) {
            this.testItem = ti;
            ti.verFnStr = cFn;
            this.verify(function() {
                return fn(aw);
            }, msg);
        }));
        return this;
    },
    
    verEx: function SudoNsb_UnitTest$verEx(fn, msg) {
        /// <param name="fn" type="System.Func`2">
        /// </param>
        /// <param name="msg" type="String">
        /// </param>
        /// <returns type="SudoNsb.UnitTest"></returns>
        var ti = this.testItem;
        var cFn = fn.toString();
        this.addDx(ss.Delegate.create(this, function(aw) {
            this.testItem = ti;
            ti.verFnStr = cFn;
            this.verifyEx(function() {
                return fn(aw);
            }, msg);
        }));
        return this;
    },
    
    tstDx: function SudoNsb_UnitTest$tstDx(fn) {
        /// <param name="fn" type="System.Action`1">
        /// </param>
        /// <returns type="SudoNsb.UnitTest"></returns>
        var ti = this.testItem;
        this.addDx(ss.Delegate.create(this, function(aw) {
            this.testItem = ti;
            try {
                fn(aw);
            }
            catch (ex) {
                this._printLine$1(String.format("<li class='failed'><label>Excep</label> {0}</li>", ex.message));
            }
        }));
        return this;
    },
    
    tstDl: function SudoNsb_UnitTest$tstDl(fn) {
        /// <param name="fn" type="System.Action`1">
        /// </param>
        /// <returns type="SudoNsb.UnitTest"></returns>
        var ti = this.testItem;
        this.addDl(ss.Delegate.create(this, function(aw) {
            this.testItem = ti;
            try {
                fn(aw);
            }
            catch (ex) {
                this._printLine$1(String.format("<li class='failed'><label>Excep</label> {0}</li>", ex.message));
            }
        }));
        return this;
    },
    
    newTest: function SudoNsb_UnitTest$newTest(name) {
        /// <param name="name" type="String">
        /// </param>
        this.allTests++;
        this.testItem = new SudoNsb.UnitTestItem(name);
        var ti = this.testItem;
        ti.num = ++this._totalInSet$1;
        ti.totalInSet = this._totalInSet$1;
        var si = this.setItem;
        this.addDx(ss.Delegate.create(this, function() {
            ++this.thisTestNum;
            SudoNsb.Storage.removeSession(Inform.lastErrorKey);
            this.testItem = ti;
            this.writeTitle(String.format('<b>{0}. {1}</b> ({0} of {2})', ti.num, ti.name, si.totalInSet));
            $('#MasterRun').html(String.format('Running {0} of {1}', ++this.testNum, this.allTests));
        }));
    },
    
    beginSet: function SudoNsb_UnitTest$beginSet(name) {
        /// <param name="name" type="String">
        /// </param>
        /// <returns type="SudoNsb.UnitTest"></returns>
        this._totalInSet$1 = 0;
        this._totalSets$1++;
        this.setItem = new SudoNsb.UnitTestItem(name);
        var set = this._totalSets$1;
        var more = (this._totalSets$1 <= 1) ? '' : " class='more'";
        this.addDx(ss.Delegate.create(this, function() {
            this.passed = this.failed = this.total = 0;
            this._name$1 = name;
            this.writeTitle(String.format("<h2{0}>{1}</h2><h3 id='TestResults{2}'>Running...</h3>", more, this._name$1, set));
        }));
        return this;
    },
    
    endSet: function SudoNsb_UnitTest$endSet(fn) {
        /// <param name="fn" type="Function">
        /// </param>
        /// <returns type="SudoNsb.UnitTest"></returns>
        var set = this._totalSets$1;
        this.setItem.totalInSet = this._totalInSet$1;
        this.addDx(ss.Delegate.create(this, function() {
            var span = (this.failed > 0) ? 'red' : 'green';
            $('#TestResults' + set).html(String.format("<span class='green'>{0}</span> Passed, <span class='{3}'>{1}</span> Failed (of {2} verifications)", this.passed, this.failed, this.total, span));
            this.allPassed += this.passed;
            this.allFailed += this.failed;
            this.allTotal += this.total;
        }));
        if (fn != null) {
            this.addFn(fn);
        }
        return this;
    },
    
    addTest: function SudoNsb_UnitTest$addTest(test) {
        /// <param name="test" type="Function">
        /// </param>
        test();
    },
    
    runTests: function SudoNsb_UnitTest$runTests() {
        this.div.prepend("<h1 id='MasterRun'>Running...</h1>");
        this.always(ss.Delegate.create(this, function() {
            this._allEndTime$1 = Date.get_now().getTime();
            var allTotalTime = (this._allEndTime$1 - this._allStartTime$1) / 1000;
            if (this.abortFlag) {
                $('#MasterRun').html(String.format("<span class='red'>Aborted</span> on test {0} of {1} tests", this.thisTestNum, this.allTests));
            }
            else {
                if (this.allFailed > 0) {
                    $('#MasterRun').html(String.format("Done with {0} tests, <span class='green'>{1}</span> verified, and <span class='red'>{2}</span> failed", this.allTests, this.allPassed, this.allFailed));
                }
                else {
                    $('#MasterRun').html(String.format('Done with {0} tests and {1} verifications in {2} sec', this.allTests, this.allPassed, allTotalTime));
                }
            }
        }));
        this.commit();
    }
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.UnitTestItem

SudoNsb.UnitTestItem = function SudoNsb_UnitTestItem(name) {
    /// <param name="name" type="String">
    /// </param>
    /// <field name="ic" type="Boolean">
    /// </field>
    /// <field name="name" type="String">
    /// </field>
    /// <field name="num" type="Number" integer="true">
    /// </field>
    /// <field name="totalInSet" type="Number" integer="true">
    /// </field>
    /// <field name="verFnStr" type="String">
    /// </field>
    this.name = name;
}
SudoNsb.UnitTestItem.prototype = {
    ic: false,
    name: null,
    num: 0,
    totalInSet: 0,
    verFnStr: null
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.AnimateRotate

SudoNsb.AnimateRotate = function SudoNsb_AnimateRotate() {
    /// <field name="_jsFull" type="String" static="true">
    /// </field>
    /// <field name="_jsMin" type="String" static="true">
    /// </field>
    /// <field name="_jsLoaded" type="Boolean" static="true">
    /// </field>
}
SudoNsb.AnimateRotate.aRotate = function SudoNsb_AnimateRotate$aRotate(el, endAngle, options, startAngle) {
    /// <param name="el" type="jQueryObject">
    /// </param>
    /// <param name="endAngle" type="Number">
    /// </param>
    /// <param name="options" type="Object">
    /// </param>
    /// <param name="startAngle" type="Number">
    /// </param>
    /// <returns type="jQueryObject"></returns>
    if (!SudoNsb.AnimateRotate._jsLoaded) {
        SudoNsb.AnimateRotate._jsLoaded = true;
        eval("\r\n(jQuery.fn.animateRotate = function(endAngle, options, startAngle) {\r\n    return this.each(function()\r\n    {\r\n        var elem = jQuery(this), rad, costheta, sintheta, matrixValues, animsEnd = {};\r\n        if (typeof options !== 'object')\r\n        {\r\n            options = {};\r\n        }\r\n        else if (typeof options.extra === 'object')\r\n        {\r\n            animsEnd = options.extra;\r\n        }\r\n        animsEnd.deg = endAngle;\r\n        options.step = function(now, fx)\r\n        {\r\n            if(fx.prop === 'deg')\r\n            {\r\n                elem.css({'-webkit-transform': ''});\r\n                elem.css({'-moz-transform': ''});\r\n                elem.css({'-ms-transform': ''});\r\n                elem.css({'-o-transform': ''});\r\n                elem.css({'transform': ''});\r\n                elem[0].offsetWidth = elem[0].offsetWidth; // causes reflow\r\n                var stls = elem.get(0).style;\r\n                if ('-webkit-transform' in stls || 'webkitTransform' in stls) {\r\n                    elem.css({'-webkit-transform': 'rotate('+now+'deg)'});\r\n                }\r\n                else if ('MozTransform' in stls || '-moz-transform' in stls || 'mozTransform' in stls)\r\n                    elem.css({'-moz-transform': 'rotate('+now+'deg)'});\r\n                else if ('-ms-transform' in stls || 'msTransform' in stls)\r\n                    elem.css({'-ms-transform': 'rotate('+now+'deg)'});\r\n                else if ('-o-transform' in stls || 'oTransform' in stls)\r\n                    elem.css({'-o-transform': 'rotate('+now+'deg)'});\r\n                else if ('transform' in stls)\r\n                    elem.css({'transform': 'rotate('+now+'deg)'});\r\n                else\r\n                {\r\n                    rad = now * (Math.PI * 2 / 360);\r\n                    costheta = Math.cos(rad);\r\n                    sintheta = Math.sin(rad);\r\n                    matrixValues = 'M11=' + costheta + ', M12=-'+ sintheta +', M21='+ sintheta +', M22='+ costheta;\r\n                    elem.css({\r\n                        'filter': 'progid:DXImageTransform.Microsoft.Matrix(sizingMethod=\\'auto expand\\','+matrixValues+')',\r\n                        '-ms-filter': 'progid:DXImageTransform.Microsoft.Matrix(sizingMethod=\\'auto expand\\','+matrixValues+')'\r\n                    });\r\n                }\r\n            }\r\n        };\r\n        if (typeof(startAngle) !== undefined)\r\n            elem[0]['deg'] = startAngle;\r\n        elem.animate(animsEnd, options);\r\n    });})\r\n");
    }
    return el.animateRotate(endAngle,options,startAngle);
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.ArcText

SudoNsb.ArcText = function SudoNsb_ArcText() {
    /// <field name="_jsFull" type="String" static="true">
    /// </field>
    /// <field name="_jsMin" type="String" static="true">
    /// </field>
}
SudoNsb.ArcText.bend = function SudoNsb_ArcText$bend(el, options) {
    /// <param name="el" type="jQueryObject">
    /// </param>
    /// <param name="options" type="Object">
    /// </param>
    el.arctext(options);
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.Closer

SudoNsb.Closer = function SudoNsb_Closer() {
    /// <field name="_css" type="String" static="true">
    /// </field>
}
SudoNsb.Closer.btn = function SudoNsb_Closer$btn(el, fn) {
    /// <summary>
    /// Creates a close button over the upper right corner of the element.
    /// </summary>
    /// <param name="el" type="jQueryObject">
    /// The element to add the close button to.
    /// </param>
    /// <param name="fn" type="Function">
    /// The function to fire on close click or escape.
    /// </param>
    var csc = Snsb.get_newId();
    var cx = $("<a class='ClosableLink nsbTip AboveGlass' data-tooltip='close'>\u2715</a>").appendTo(el);
    var fnCls = function(e) {
        Snsb.cancelEvent(e);
        $(document.body).off('.' + csc);
        cx.remove();
        fn(e);
    };
    var fnKy = function(e) {
        if (e.which === 27) {
            fnCls(e);
        }
    };
    $(document.body).on('click.' + csc, 'a.ClosableLink', fnCls).on('keydown.' + csc, fnKy);
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.Cxy

SudoNsb.Cxy = function SudoNsb_Cxy() {
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.Canvas

SudoNsb.Canvas = function SudoNsb_Canvas() {
    /// <field name="height" type="Number" integer="true">
    /// </field>
    /// <field name="width" type="Number" integer="true">
    /// </field>
}
SudoNsb.Canvas.prototype = {
    height: 0,
    width: 0
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.Cpt

SudoNsb.Cpt = function SudoNsb_Cpt(t, l, w, h, r) {
    /// <param name="t" type="Number">
    /// </param>
    /// <param name="l" type="Number">
    /// </param>
    /// <param name="w" type="Number">
    /// </param>
    /// <param name="h" type="Number">
    /// </param>
    /// <param name="r" type="Number">
    /// </param>
    /// <field name="h" type="Number">
    /// </field>
    /// <field name="l" type="Number">
    /// </field>
    /// <field name="t" type="Number">
    /// </field>
    /// <field name="w" type="Number">
    /// </field>
    /// <field name="r" type="Number">
    /// </field>
    this.t = t;
    this.l = l;
    this.w = w;
    this.h = h;
    this.r = r;
}
SudoNsb.Cpt.prototype = {
    h: 0,
    l: 0,
    t: 0,
    w: 0,
    r: 0
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.Ctx

SudoNsb.Ctx = function SudoNsb_Ctx() {
    /// <field name="canvas" type="SudoNsb.Canvas">
    /// </field>
    /// <field name="fillStyle" type="Object">
    /// </field>
    /// <field name="lineWidth" type="Number">
    /// </field>
    /// <field name="strokeStyle" type="String">
    /// </field>
    /// <field name="shadowBlur" type="Number">
    /// </field>
    /// <field name="shadowColor" type="String">
    /// </field>
    /// <field name="shadowOffsetX" type="Number">
    /// </field>
    /// <field name="shadowOffsetY" type="Number">
    /// </field>
    /// <field name="font" type="String">
    /// </field>
}
SudoNsb.Ctx.prototype = {
    canvas: null,
    fillStyle: null,
    lineWidth: 0,
    strokeStyle: null,
    shadowBlur: 0,
    shadowColor: null,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    font: null
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.Grd

SudoNsb.Grd = function SudoNsb_Grd() {
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb._fileDirs

SudoNsb._fileDirs = function SudoNsb__fileDirs() {
    /// <field name="threadCnt" type="Number" integer="true" static="true">
    /// </field>
}
SudoNsb._fileDirs.get__dirUrl = function SudoNsb__fileDirs$get__dirUrl() {
    /// <value type="String"></value>
    return Uri.join(Config.get_appPath(), '/nsb.dir.php');
}
SudoNsb._fileDirs.getDirAw = function SudoNsb__fileDirs$getDirAw(awp, partitionKey, imageSizes) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    /// <param name="partitionKey" type="String">
    /// </param>
    /// <param name="imageSizes" type="Boolean">
    /// </param>
    var fnArgs = 'FileBlobBase.GetDirAw';
    var fullKey = partitionKey;
    var payload = {};
    payload['password'] = BrowserUser.password;
    payload['path'] = partitionKey;
    payload['imagesizes'] = (imageSizes) ? true : false;
    var options = {};
    options.url = SudoNsb._fileDirs.get__dirUrl();
    options.data = payload;
    options.dataType = 'json';
    options.type = 'GET';
    options.success = function(data, textStatus, request1) {
        SudoNsb._fileDirs.threadCnt--;
        try {
            awp.set_result(data);
            awp.set_item('success', (data).result);
        }
        catch (ex) {
            Inform.trace('Unable to get file list {0}, exception={1}', partitionKey, ex);
            awp.throwEx(new Error(LocalExceptions.ajaxLoadError + ':' + fullKey));
            return;
        }
        awp.done();
    };
    options.error = function(request, textStatus, error) {
        SudoNsb._fileDirs.threadCnt--;
        var ex = LocalExceptions.ajaxError(LocalExceptions.ajaxLoadError, fullKey, request, textStatus, fnArgs);
        awp.throwEx(ex);
    };
    SudoNsb._fileDirs.threadCnt++;
    $.ajax(options);
}


////////////////////////////////////////////////////////////////////////////////
// PkgResult

PkgResult = function PkgResult() {
    /// <field name="activateId" type="String">
    /// </field>
    /// <field name="content" type="String">
    /// </field>
    /// <field name="devServer" type="Boolean">
    /// </field>
    /// <field name="email" type="String">
    /// </field>
    /// <field name="exists" type="Boolean">
    /// </field>
    /// <field name="inactive" type="Boolean">
    /// </field>
    /// <field name="lastChanged" type="Number" integer="true">
    /// </field>
    /// <field name="log" type="Object">
    /// </field>
    /// <field name="msg" type="String">
    /// </field>
    /// <field name="result" type="Boolean">
    /// </field>
    /// <field name="userid" type="String">
    /// </field>
}
PkgResult.prototype = {
    activateId: null,
    content: null,
    devServer: false,
    email: null,
    exists: false,
    inactive: false,
    lastChanged: 0,
    log: null,
    msg: null,
    result: false,
    userid: null
}


////////////////////////////////////////////////////////////////////////////////
// DirMap

DirMap = function DirMap() {
    /// <field name="dircnt" type="Number" integer="true">
    /// </field>
    /// <field name="dirpath" type="String">
    /// </field>
    /// <field name="dirs" type="Array">
    /// </field>
    /// <field name="filecnt" type="Number" integer="true">
    /// </field>
    /// <field name="files" type="Array">
    /// </field>
    /// <field name="imgsizes" type="Array">
    /// </field>
    /// <field name="result" type="Boolean">
    /// </field>
    /// <field name="sizes" type="Array">
    /// </field>
}
DirMap.prototype = {
    dircnt: 0,
    dirpath: null,
    dirs: null,
    filecnt: 0,
    files: null,
    imgsizes: null,
    result: false,
    sizes: null
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.Filters

SudoNsb.Filters = function SudoNsb_Filters() {
    /// <field name="map" type="Object" static="true">
    /// </field>
    /// <field name="awMap" type="Object" static="true">
    /// </field>
}
SudoNsb.Filters.addFilter = function SudoNsb_Filters$addFilter(name, fn) {
    /// <param name="name" type="String">
    /// </param>
    /// <param name="fn" type="System.Action`1">
    /// </param>
    var list = SudoNsb.Filters.map[name] || [];
    list.add(fn);
    SudoNsb.Filters.map[name] = list;
}
SudoNsb.Filters.addAwFilter = function SudoNsb_Filters$addAwFilter(name, fn) {
    /// <param name="name" type="String">
    /// </param>
    /// <param name="fn" type="System.Action`2">
    /// </param>
    var list = SudoNsb.Filters.awMap[name] || [];
    list.add(fn);
    SudoNsb.Filters.awMap[name] = list;
}
SudoNsb.Filters.doFilter = function SudoNsb_Filters$doFilter(name, item) {
    /// <param name="name" type="String">
    /// </param>
    /// <param name="item" type="Object">
    /// </param>
    var ff = SudoNsb.Filters.map[name];
    if (!Snsb.isEmpty(ff)) {
        var $enum1 = ss.IEnumerator.getEnumerator(ff);
        while ($enum1.moveNext()) {
            var fn = $enum1.current;
            try {
                fn(item);
            }
            catch (ex) {
                debugger;
                Inform.error('Filter error: {0}', ex);
            }
        }
    }
}
SudoNsb.Filters.doFiltersAw = function SudoNsb_Filters$doFiltersAw(awp, name, item) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    /// <param name="name" type="String">
    /// </param>
    /// <param name="item" type="Object">
    /// </param>
    var awx = new SudoNsb.Await();
    var ff = SudoNsb.Filters.awMap[name];
    if (!Snsb.isEmpty(ff)) {
        var $enum1 = ss.IEnumerator.getEnumerator(ff);
        while ($enum1.moveNext()) {
            var fn = $enum1.current;
            awx.addAw(fn, item);
        }
    }
    awx.commit(awp);
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.GridNest

SudoNsb.GridNest = function SudoNsb_GridNest() {
    /// <field name="_jsFull" type="String" static="true">
    /// </field>
    /// <field name="_jsMin" type="String" static="true">
    /// </field>
}
SudoNsb.GridNest.nested = function SudoNsb_GridNest$nested(el, options) {
    /// <param name="el" type="jQueryObject">
    /// </param>
    /// <param name="options" type="Object">
    /// </param>
    el.nested(options);
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.JQueryEasing

SudoNsb.JQueryEasing = function SudoNsb_JQueryEasing() {
    /// <field name="_jsFull" type="String" static="true">
    /// </field>
    /// <field name="_jsMin" type="String" static="true">
    /// </field>
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb._memes

SudoNsb._memes = function SudoNsb__memes() {
    /// <field name="_css" type="String" static="true">
    /// </field>
    /// <field name="_memeFolderUrl" type="String" static="true">
    /// </field>
    /// <field name="_memeFolderUrlLocal" type="String" static="true">
    /// </field>
    /// <field name="memeFolderPath" type="String" static="true">
    /// </field>
    /// <field name="_memeStoreKey" type="String" static="true">
    /// </field>
    /// <field name="memeEl" type="jQueryObject" static="true">
    /// </field>
    /// <field name="_memeName" type="String" static="true">
    /// </field>
    /// <field name="_map" type="DirMap" static="true">
    /// </field>
    /// <field name="_ready" type="Boolean" static="true">
    /// </field>
}
SudoNsb._memes.get_ready = function SudoNsb__memes$get_ready() {
    /// <value type="Boolean"></value>
    return SudoNsb._memes._ready;
}
SudoNsb._memes.load = function SudoNsb__memes$load() {
    MyCss.addStyleOnce((SudoNsb._memes).get_fullName(), '\r\n#Meme {\r\n    position: relative;\r\n    cursor: pointer;\r\n    margin-top: 66px;\r\n    box-sizing: border-box;\r\n}\r\n#Meme img {\r\n    border: 1px solid black;\r\n    box-sizing: border-box;\r\n}\r\n#ShadowBox {\r\n    position: absolute;\r\n    top: 50px;\r\n    left: 105px;\r\n    width: 600px;\r\n    height: 700px;\r\n    margin-top: -120px;\r\n    text-align: center;\r\n}\r\n#ShadowBox.showCover {\r\n    margin-top: 0;\r\n    height: initial;\r\n}\r\n#ShadowBox img {\r\n    max-width: 600px;\r\n    max-height: 700px;\r\n}\r\n#ShadowBox button {\r\n    margin: 30px;\r\n}\r\n');
    SudoNsb._memes.showOne();
}
SudoNsb._memes.get_memeFolderUrl = function SudoNsb__memes$get_memeFolderUrl() {
    /// <value type="String"></value>
    if (window.location.hostname.indexOf('127.0.0.1') >= 0) {
        return '/play/memes/';
    }
    return 'http://www.playnexus.com/memes/';
}
SudoNsb._memes.setMemeFrom = function SudoNsb__memes$setMemeFrom(memes) {
    /// <param name="memes" type="Array">
    /// </param>
    if (memes == null || !memes.length) {
        return;
    }
    var i = Snsb.randomOf(memes.length) - 1;
    SudoNsb._memes._memeName = memes[i];
    var img = $('img.pageMemeImg');
    if (img.length > 0) {
        img.attr('src', Uri.join(SudoNsb._memes.get_memeFolderUrl(), SudoNsb._memes._memeName));
    }
}
SudoNsb._memes.showOne = function SudoNsb__memes$showOne() {
    SudoNsb._memes.memeEl = $('#Meme', window.top.document.body);
    if (!SudoNsb._memes.memeEl.length) {
        return;
    }
    SudoNsb._memes.memeEl.css({ position: 'relative', cursor: 'pointer' }).empty().off('.meme').show();
    var awx = new SudoNsb.Await();
    if (SudoNsb._memes._map == null) {
        awx.addAw(SqlStorage.retrieveSmartAw, 'PnxMemeList', function(aw) {
            SudoNsb._fileDirs.getDirAw(aw, '../../../../play/memes');
        });
    }
    awx.addDx(function(aw) {
        if (SudoNsb._memes._map == null) {
            SudoNsb._memes._map = aw.get_result();
        }
        if (String.isNullOrEmpty(SudoNsb._memes._memeName)) {
            var i = Snsb.randomOf(SudoNsb._memes._map.filecnt) - 1;
            SudoNsb._memes._memeName = SudoNsb._memes._map.files[i];
        }
        var img = $("<img class='pageMemeImg' src='" + Uri.join(SudoNsb._memes.get_memeFolderUrl(), SudoNsb._memes._memeName) + "' width='100%' title='click to zoom and unzoom image'/>").css({ border: '1px solid black', visibility: 'hidden' });
        img.on('load', function() {
            img.css('visibility', 'visible').hide().fadeIn();
            SudoNsb._memes._ready = true;
        });
        SudoNsb._memes.memeEl.append(img);
        SudoNsb.ToolTips.addTo(img);
        SudoNsb._memes.memeEl.on('click.meme', SudoNsb._memes._shadowBox);
    }).commit();
}
SudoNsb._memes.reshow = function SudoNsb__memes$reshow() {
    if (SudoNsb._memes.memeEl != null) {
        SudoNsb._memes.memeEl.fadeOut(400, SudoNsb._memes.showOne);
    }
}
SudoNsb._memes._shadowBox = function SudoNsb__memes$_shadowBox(e) {
    /// <param name="e" type="jQueryEvent">
    /// </param>
    var up = $('#ShadowBox');
    var cls = function() {
        Surface.hider(false);
        Surface.glassOff(true);
        $('#ShadowBox').remove();
        SudoNsb._memes.memeEl.removeClass('AboveHider');
        $(document).off('.meme');
    };
    if (up.length > 0) {
        cls(null);
        return;
    }
    SudoNsb._memes.memeEl.addClass('AboveHider');
    Surface.hider(true);
    Surface.glass(cls);
    var sb = $("<div id='ShadowBox' class='AboveHider'/>").html("<img class='pageMemeImg' src='" + Uri.join(SudoNsb._memes.get_memeFolderUrl(), SudoNsb._memes._memeName) + "'/>").appendTo(document.body).click(cls).hide().fadeIn().css({ top: SudoNsb._memes.memeEl.offset().top });
    SudoNsb.Dom.scrollInViewAw(SudoNsb.Await.get_asyncAw(), sb);
    $(document).on('keydown.meme', function(e2) {
        Snsb.cancelEvent(e2);
        cls(null);
    });
}
SudoNsb._memes.showCover = function SudoNsb__memes$showCover(afterFn) {
    /// <param name="afterFn" type="Function">
    /// </param>
    var up = $('#ShadowBox');
    var cls = function() {
        Surface.hider(false);
        $('#ShadowBox').remove();
        if (afterFn != null) {
            afterFn();
        }
        $(document).off('.meme');
    };
    if (up.length > 0) {
        cls(null);
        return;
    }
    var ht = Math.min($(window).height() - 75, 700);
    Surface.hider(true).off('.swallowed').click(cls);
    var sb = $("<div id='ShadowBox' class='AboveHider showCover' style='text-align: center;'/>").html("<img class='pageMemeImg' src='" + Uri.join(SudoNsb._memes.get_memeFolderUrl(), SudoNsb._memes._memeName) + "'/>").appendTo(document.body).click(cls).hide().fadeIn(500).css({ top: document.body.scrollTop + 100, left: 0, width: '100%' });
    $('img', sb).css({ 'max-height': ht });
    $('<br/>').appendTo(sb);
    $('<button>continue</button>').appendTo(sb).button().on('click', cls);
    SudoNsb.Dom.scrollInViewAw(SudoNsb.Await.get_asyncAw(), sb);
    $(document).on('keydown.meme', function(e) {
        Snsb.cancelEvent(e);
        cls(null);
    });
    Snsb.defer(function() {
        $('button', sb).focus();
    });
}


////////////////////////////////////////////////////////////////////////////////
// SudoNsb.Text

SudoNsb.Text = function SudoNsb_Text() {
}
SudoNsb.Text.getSelectedText = function SudoNsb_Text$getSelectedText() {
    /// <returns type="String"></returns>
    var t = '';
    if (window.getSelection) {
        t = window.getSelection();
    }
    else if (document.getSelection) {
        t = document.getSelection();
    }
    else if (document.selection) {
        t = document.selection.createRange().text;
    }
    return t.toString();
}
SudoNsb.Text.selectRange = function SudoNsb_Text$selectRange(el, start, end) {
    /// <param name="el" type="jQueryObject">
    /// </param>
    /// <param name="start" type="Number" integer="true">
    /// </param>
    /// <param name="end" type="Number" integer="true">
    /// </param>
    if (arguments.length < 3) {
        end = el.val().length;
    }
    el.each(function(i, domEl) {
        domEl.focus();
        if (domEl.setSelectionRange) {
            domEl.setSelectionRange(start,end);
        }
        else if (domEl.createTextRange) {
            var range = domEl.createTextRange();range.collapse(true);range.moveEnd('character', end);range.moveStart('character', start);range.select();;
        }
        return true;
    });
}
SudoNsb.Text.fitPx = function SudoNsb_Text$fitPx(el, lineHeightRatio) {
    /// <param name="el" type="jQueryObject">
    /// </param>
    /// <param name="lineHeightRatio" type="Number">
    /// </param>
    /// <returns type="Object"></returns>
    var wd = el.width();
    var ht = el.height();
    var px = parseInt(el.css('font-size'));
    var ot = el.clone().empty().css({ overflow: 'hidden' }).insertAfter(el);
    var padding = el.css('padding-top') + ' ' + el.css('padding-right') + ' ' + el.css('padding-bottom') + ' ' + el.css('padding-left');
    el.detach();
    var ie = $('<div/>').css({ display: 'inline-block', overflow: 'visible', 'font-size': px + 'px' }).css({ padding: padding }).appendTo(ot).html(el.html());
    while ((ie.height() > ht || ie.width() > wd) && px > 8) {
        var xht = ie.height();
        var xwd = ie.width();
        ie.css({ 'font-size': --px + 'px', 'line-height': parseInt(px * lineHeightRatio) + 'px' });
    }
    el.insertAfter(ot);
    ie.remove();
    ot.remove();
    return { 'font-size': px, 'line-height': parseInt(px * lineHeightRatio) + 'px' };
}
SudoNsb.Text.pxPerEm = function SudoNsb_Text$pxPerEm(el) {
    /// <param name="el" type="jQueryObject">
    /// </param>
    /// <returns type="Number"></returns>
    var parentElement = el[0] || document.body;
    var div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.width = '1000em';
    parentElement.appendChild(div);
    var pixels = div.offsetWidth / 1000;
    parentElement.removeChild(div);
    return pixels;
}
SudoNsb.Text.pxToEm = function SudoNsb_Text$pxToEm(el) {
    /// <param name="el" type="jQueryObject">
    /// </param>
    var px = SudoNsb.Text.pxPerEm(el);
    el.css({ width: el.width() / px + 'em', height: el.height() / px + 'em' });
}


Type.registerNamespace('Jarvis');

////////////////////////////////////////////////////////////////////////////////
// Jarvis.Bucket

Jarvis.Bucket = function Jarvis_Bucket() {
    /// <field name="_css" type="String" static="true">
    /// </field>
    /// <field name="nestSpeed" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="waitToLeavePage" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="bucketLoadedEv" type="String" static="true">
    /// </field>
    /// <field name="firstLoad" type="String" static="true">
    /// </field>
    /// <field name="afterRemoteLoad" type="String" static="true">
    /// </field>
    /// <field name="autoArrange" type="Boolean">
    /// </field>
    /// <field name="myMore" type="String">
    /// </field>
    /// <field name="myTitle" type="String">
    /// </field>
    /// <field name="myTopic" type="String">
    /// </field>
    /// <field name="noDrop" type="Boolean">
    /// </field>
    /// <field name="pageSelector" type="String">
    /// </field>
    /// <field name="savedThings" type="Object">
    /// </field>
    /// <field name="topMargin" type="Number" integer="true">
    /// </field>
    /// <field name="id" type="String">
    /// </field>
    /// <field name="_BucketItems" type="Object">
    /// </field>
    /// <field name="_BucketInner" type="DroppableObject">
    /// </field>
    /// <field name="_BucketOuter" type="DroppableObject">
    /// </field>
    /// <field name="_FruitPerRow" type="Number" integer="true">
    /// </field>
    /// <field name="_Unsaved" type="Boolean">
    /// </field>
    this.savedThings = {};
    this._BucketItems = {};
    MyCss.addStyleOnce((Jarvis.Bucket).get_fullName(), "\r\nbody { overflow: auto !important; } /* fixes dragging scrolltop bug in jQuery */\r\n.BucketOuter {\r\n    position: relative;\r\n    height: 100%;\r\n    box-sizing: border-box;\r\n}\r\n.BucketInner {\r\n    position: absolute;\r\n    width: 100%;\r\n}\r\n.BucketOuter.drop-hover:before {\r\n    position: absolute;\r\n    display: block;\r\n    content: '&nbsp;';\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    background-color: rgba(0,128,255,.1);\r\n}\r\n.BucketOuter label {\r\n    display: block;\r\n    padding: 8px;\r\n    box-sizing: border-box;\r\n    width: 100%;\r\n    text-align: center;\r\n    z-index: -1;\r\n}\r\nlabel.BucketTitle {\r\n    position: absolute;\r\n    margin-top: 127%;\r\n    background: transparent;\r\n    color: #AAA;\r\n    font-size: 120%;\r\n}\r\nlabel.BucketMore {\r\n    background: transparent;\r\n    font-size: 80%;\r\n    color: #AAA;\r\n}\r\ndiv.BucketItem {\r\n    position: absolute;\r\n    top: 0px;\r\n    left: 102px;\r\n    width: 100px;\r\n    height: 100px;\r\n    display: block;\r\n    text-align: center;\r\n    cursorColor: default;\r\n    z-index: 9;\r\n}\r\ndiv.BucketItem .DragHandle {\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    z-index: 10;\r\n}\r\ndiv.BucketItem.ui-draggable-dragging {\r\n    z-index: 99;\r\n}\r\ndiv.BucketItem.ui-draggable-dragging .DragHandle {\r\n    z-index: 100;\r\n}\r\ndiv.BucketItem p {\r\n    position: relative;\r\n    display: table-cell;\r\n    height: 100px;\r\n    vertical-align: middle;\r\n    text-align: center;\r\n    width: 100px;\r\n    color: black;\r\n    font-weight: bold;\r\n    z-index: 5;\r\n}\r\ndiv.BucketItem svg {\r\n    position: absolute;\r\n    display: block;\r\n    top: 0;\r\n    left: 0;\r\n    z-index: 0;\r\n}\r\ndiv.BucketItem canvas {\r\n    position: relative;\r\n    top: -10px;\r\n    left: -25px;\r\n    width: 150px;\r\n    height: 150px;\r\n    z-index: 4;\r\n}\r\ndiv.BucketInnerItem {\r\n    display: block;\r\n    position: relative;\r\n    width: 100px;\r\n    height: 100px;\r\n    margin: 0;\r\n    font-size: 12px;\r\n    line-height: 1;\r\n    text-align: center;\r\n}\r\ndiv.BucketInnerItem.Fruit {\r\n    display: table-cell;\r\n    vertical-align: middle;\r\n    padding: 5px;\r\n    box-sizing: border-box;\r\n}\r\ndiv.DefaultClipItem {\r\n    width: 100px;\r\n    height: 100px;\r\n    overflow: hidden;\r\n}\r\ndiv.DefaultClipItem label {\r\n    display: none;\r\n    font-size: 70%;\r\n    color: #5E3535;\r\n    width: 100%;\r\n    text-align: center;\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\ndiv.DefaultClipItem p {\r\n    position: relative;\r\n    display: block;\r\n    height: auto;\r\n    text-align: center;\r\n    width: 100%;\r\n    color: #000;\r\n    font-size: 70%;\r\n    line-height: 1.2;\r\n    font-weight: normal;\r\n    overflow: hidden;\r\n    margin: 0;\r\n    padding: 5px;\r\n    box-sizing: border-box;\r\n}\r\n");
    this.id = Snsb.get_newGuid();
    this.noDrop = false;
}
Jarvis.Bucket.loadOrCreateAw = function Jarvis_Bucket$loadOrCreateAw(awp, bktType, pageSelect, topic) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    /// <param name="bktType" type="Type">
    /// </param>
    /// <param name="pageSelect" type="String">
    /// </param>
    /// <param name="topic" type="String">
    /// </param>
    new SudoNsb.Await().addAw(Jarvis.Bucket.loadAw, topic).addDx(function(aw) {
        var bu = aw.get_result();
        if (Snsb.isEmpty(bu)) {
            bu = (eval('new ' + bktType.get_fullName())).setOptions(pageSelect, topic).create();
        }
        aw.set_result(bu);
        bu.askLeavePage();
    }).commit(awp);
}
Jarvis.Bucket.restoreBucket = function Jarvis_Bucket$restoreBucket(bucketOrNull, bo) {
    /// <param name="bucketOrNull" type="Jarvis.Bucket">
    /// </param>
    /// <param name="bo" type="Object">
    /// </param>
    /// <returns type="Jarvis.Bucket"></returns>
    var bu = bucketOrNull || eval('(new ' + bo.type.get_fullName() + '())');
    bu.pageSelector = bo.pageSelect;
    bu.topic(bo.topic).title(bo.title).more(bo.more).create();
    return bu.selfRestore();
}
Jarvis.Bucket.loadAw = function Jarvis_Bucket$loadAw(awp, topic) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    /// <param name="topic" type="String">
    /// </param>
    new SudoNsb.Await().addAw(BrowserUser.waitSessionLockAw).waitDx(function() {
        return !String.isNullOrEmpty(Snsb.get_masterId());
    }).addDl(function(aw) {
        SqlThings.retrieveTopicsAw(aw, topic, Snsb.get_masterId(), true);
    }).addDl(function(aw) {
        var things = aw.get_result();
        if (aw.get_ajaxResult() && !Snsb.isEmpty(things)) {
            aw.set_result(things[0]);
            SudoNsb.Filters.doFiltersAw(aw, 'after-remote-load', aw.get_result());
        }
        else {
            aw.done(null);
        }
    }).addDx(function(aw) {
        aw.set_result(Jarvis.Bucket.loadFrom(aw.get_result()));
    }).commit(awp);
}
Jarvis.Bucket.loadFrom = function Jarvis_Bucket$loadFrom(td) {
    /// <param name="td" type="SudoNsb.SqlThingData">
    /// </param>
    /// <returns type="Jarvis.Bucket"></returns>
    if (Snsb.isEmpty(td)) {
        return null;
    }
    var bu;
    if (Type.canCast(td.thing, Jarvis.Bucket)) {
        bu = td.thing;
    }
    else {
        bu = SqlThings.fromResult([td], Jarvis.Bucket);
    }
    bu.create();
    bu.selfRestore();
    bu._Unsaved = td.unsaved || bu._Unsaved;
    return bu;
}
Jarvis.Bucket.prototype = {
    autoArrange: true,
    myMore: null,
    myTitle: null,
    myTopic: '/Pnx/Bucket',
    noDrop: false,
    pageSelector: null,
    topMargin: 0,
    id: null,
    _BucketInner: null,
    _BucketOuter: null,
    _FruitPerRow: 3,
    _Unsaved: false,
    
    setOptions: function Jarvis_Bucket$setOptions(pageSelector, topic) {
        /// <param name="pageSelector" type="String">
        /// </param>
        /// <param name="topic" type="String">
        /// </param>
        /// <returns type="Jarvis.Bucket"></returns>
        this.pageSelector = pageSelector;
        this.myTopic = topic;
        return this;
    },
    
    create: function Jarvis_Bucket$create() {
        /// <returns type="Jarvis.Bucket"></returns>
        var el = $(this.pageSelector);
        this._BucketOuter = el.addClass('BucketOuter').empty();
        this._BucketInner = $("<div class='BucketInner'></div>").appendTo(this._BucketOuter);
        this._BucketInner.css({ 'margin-top': this.topMargin });
        if (this.myTitle != null) {
            this._BucketOuter.prepend("<label class='BucketTitle'>" + this.myTitle + '</label>');
        }
        if (this.myMore != null) {
            $('label.BucketTitle', this._BucketOuter).append("<label class='BucketMore'>" + this.myMore + '</label>');
        }
        if (!this.noDrop) {
            Snsb.waitOn(ss.Delegate.create(this, function() {
                Snsb.defer(ss.Delegate.create(this, function() {
                    this._BucketOuter.droppable({ hoverClass: 'drop-hover', greedy: true, zIndex: 10, drop: ss.Delegate.create(this, this.onDrop) });
                }), 50);
            }), function() {
                return window.jQuery.ui && window.jQuery.ui.droppable;
            });
        }
        SudoNsb.Filters.doFilter('first-load', this);
        $(document).trigger('BucketLoadedEv.Bucket');
        return this;
    },
    
    topic: function Jarvis_Bucket$topic(topic) {
        /// <param name="topic" type="String">
        /// </param>
        /// <returns type="Jarvis.Bucket"></returns>
        this.myTopic = topic;
        return this;
    },
    
    title: function Jarvis_Bucket$title(title) {
        /// <param name="title" type="String">
        /// </param>
        /// <returns type="Jarvis.Bucket"></returns>
        this.myTitle = title;
        return this;
    },
    
    more: function Jarvis_Bucket$more(more) {
        /// <param name="more" type="String">
        /// </param>
        /// <returns type="Jarvis.Bucket"></returns>
        this.myMore = more;
        return this;
    },
    
    onDrop: function Jarvis_Bucket$onDrop(e, ui) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        /// <param name="ui" type="Object">
        /// </param>
        Inform.debug('OnDrop');
        var b = ui.draggable.data('BucketItem');
        if (Type.canCast(b, Jarvis.BucketItem)) {
            var bi = b;
            bi.dropStop();
            if (bi._Bucket !== this) {
                var from = bi._Bucket;
                bi.getAllMetrics(bi.get_el());
                this.moveHere(bi);
                if (from.autoArrange) {
                    from.arrangeItemsAw(SudoNsb.Await.get_asyncAw());
                }
            }
            if (this.autoArrange) {
                new SudoNsb.Await().addAw(ss.Delegate.create(this, this.arrangeItemsAw)).sleep(700).addDx(ss.Delegate.create(this, function() {
                    this._Unsaved = true;
                })).addDx(function() {
                    $(document).trigger(PnxBase.AppEvents.saveAll);
                }).addAw(ss.Delegate.create(this, this.saveAw)).commit();
            }
            else {
                bi.get_el().appendTo(bi.get_el().parent());
                delete this._BucketItems[bi.id];
                this._BucketItems[bi.id] = bi;
                this._Unsaved = true;
                $(document).trigger(PnxBase.AppEvents.saveAll);
                this.saveAw(SudoNsb.Await.get_asyncAw());
            }
        }
    },
    
    addItem: function Jarvis_Bucket$addItem(bucketItem, dropping) {
        /// <param name="bucketItem" type="Object">
        /// </param>
        /// <param name="dropping" type="Boolean">
        /// </param>
        /// <returns type="Jarvis.Bucket"></returns>
        var bi;
        if (Type.canCast(bucketItem, Jarvis.BucketItem)) {
            bi = bucketItem;
        }
        else if (Type.canCast(bucketItem, SudoNsb.SqlThingData)) {
            bi = new Jarvis.BucketItem(this, bucketItem);
        }
        else {
            debugger;
            Inform.error('Invalid argument passed to Bucket.AddItem');
            return this;
        }
        this._Unsaved = true;
        this._BucketItems[bi.id] = bi;
        bi._Bucket = this;
        bi.get_html().appendTo(this._BucketInner);
        if (dropping) {
            bi.transMetrics(bi.get_el());
        }
        bi.applyMetrics(bi.get_el());
        bi.getAllMetrics(bi.get_el());
        return this;
    },
    
    moveHere: function Jarvis_Bucket$moveHere(bi) {
        /// <param name="bi" type="Jarvis.BucketItem">
        /// </param>
        bi.remove();
        this.addItem(bi, true);
    },
    
    remove: function Jarvis_Bucket$remove(_id) {
        /// <param name="_id" type="String">
        /// </param>
        delete this._BucketItems[_id];
    },
    
    arrangeItemsAw: function Jarvis_Bucket$arrangeItemsAw(awp) {
        /// <param name="awp" type="SudoNsb.Await">
        /// </param>
        if (this.autoArrange) {
            var fruit = $('.BucketItem', this._BucketInner);
            var lines = parseInt((fruit.length - 1) / this._FruitPerRow) + 1;
            var fruitHeight = fruit.outerHeight();
            this.topMargin = this._BucketOuter.height() - this._BucketInner.position().top - (lines * fruitHeight);
            this._BucketInner.animate({ 'margin-top': this.topMargin });
        }
        if (!this._BucketOuter.is(':visible')) {
            awp.done();
            return;
        }
        Snsb.defer(ss.Delegate.create(this, function() {
            SudoNsb.GridNest.nested(this._BucketInner, { selector: '.BucketItem', minWidth: 100, resizeToFit: false, gutter: 2, animate: true, animationOptions: { speed: Jarvis.Bucket.nestSpeed, complete: function() {
                Inform.trace('ArrangeItemsAw complete');
                awp.done();
            } } });
        }));
    },
    
    selfRestore: function Jarvis_Bucket$selfRestore() {
        /// <returns type="Jarvis.Bucket"></returns>
        var svUnsaved = this._Unsaved;
        if (this.savedThings != null) {
            var $dict1 = this.savedThings;
            for (var $key2 in $dict1) {
                var p = { key: $key2, value: $dict1[$key2] };
                this.addItem(p.value);
            }
        }
        this._Unsaved = svUnsaved;
        return this;
    },
    
    askLeavePage: function Jarvis_Bucket$askLeavePage() {
        var evt = 'beforeunload.bucketSaving';
        $(window.self).off(evt).on(evt, function() {
            if (Jarvis.Bucket.waitToLeavePage > 0) {
                return 'Data is being saved. Please wait a moment.';
            }
        });
    },
    
    saveAw: function Jarvis_Bucket$saveAw(awp) {
        /// <param name="awp" type="SudoNsb.Await">
        /// </param>
        Inform.trace('Bucket.SaveAw  {0} ({1})', this.myTopic, (this._Unsaved) ? 'unsaved' : 'saved');
        if (!this._Unsaved) {
            awp.done();
            return;
        }
        if (this.id == null) {
            debugger;
            awp.done();
            return;
        }
        this.prepareForSave();
        Jarvis.Bucket.waitToLeavePage++;
        new SudoNsb.Await().addFn(PnxToolbar.spinner, true).addDl(ss.Delegate.create(this, function(aw) {
            SqlThings.storeThingAw(aw, { topic: this.myTopic, thing: this, secret: true, id: this.id });
        })).addFn(PnxToolbar.spinner, false).addDx(ss.Delegate.create(this, function() {
            this._Unsaved = false;
            Jarvis.Bucket.waitToLeavePage--;
        })).commit(awp);
    },
    
    empty: function Jarvis_Bucket$empty() {
        var $dict1 = this._BucketItems;
        for (var $key2 in $dict1) {
            var p = { key: $key2, value: $dict1[$key2] };
            this._BucketItems[p.key].remove();
        }
        Object.clearKeys(this.savedThings);
        Object.clearKeys(this._BucketItems);
    },
    
    prepareForSave: function Jarvis_Bucket$prepareForSave() {
        Object.clearKeys(this.savedThings);
        var $dict1 = this._BucketItems;
        for (var $key2 in $dict1) {
            var p = { key: $key2, value: $dict1[$key2] };
            p.value.getAllMetrics(p.value.get_el());
            this.savedThings[p.key] = p.value.get_sqlData();
        }
    }
}


////////////////////////////////////////////////////////////////////////////////
// Jarvis.BucketItem

Jarvis.BucketItem = function Jarvis_BucketItem(bucket, td) {
    /// <param name="bucket" type="Jarvis.Bucket">
    /// </param>
    /// <param name="td" type="SudoNsb.SqlThingData">
    /// </param>
    /// <field name="id" type="String">
    /// </field>
    /// <field name="_Bucket" type="Jarvis.Bucket">
    /// </field>
    /// <field name="_el" type="DraggableObject">
    /// </field>
    /// <field name="_sqlData" type="SudoNsb.SqlThingData">
    /// </field>
    /// <field name="_dragging" type="Boolean">
    /// </field>
    /// <field name="_dragHelper" type="jQueryObject">
    /// </field>
    this._sqlData = td;
    this._Bucket = bucket;
    this.id = td.id;
}
Jarvis.BucketItem.prototype = {
    id: null,
    _Bucket: null,
    _el: null,
    _sqlData: null,
    
    get_sqlData: function Jarvis_BucketItem$get_sqlData() {
        /// <value type="SudoNsb.SqlThingData"></value>
        return this._sqlData;
    },
    
    get_el: function Jarvis_BucketItem$get_el() {
        /// <value type="DraggableObject"></value>
        return this._el;
    },
    set_el: function Jarvis_BucketItem$set_el(value) {
        /// <value type="DraggableObject"></value>
        if (value == null) {
            this._el.remove();
            this._el = null;
        }
        else {
            this._el = value;
        }
        return value;
    },
    
    get_html: function Jarvis_BucketItem$get_html() {
        /// <value type="jQueryObject"></value>
        var ci = this._sqlData.thing;
        if (!(Type.canCast((ci), Jarvis.ClipItem))) {
            ci = Rx.reCast(ci, Jarvis.ClipItem);
        }
        var it = ci.materialize();
        this._el = $("<div class='BucketItem' style='position:absolute;'/>").append(it);
        var handle = $("<div class='DragHandle'/>").appendTo(this._el);
        this._el.draggable({ containment: $(document.body), revert: 'invalid', helper: ss.Delegate.create(this, this.dragHelper), start: ss.Delegate.create(this, this.dragStart), drag: ss.Delegate.create(this, this.dragDrag), stop: ss.Delegate.create(this, this.dragStop), handle: handle, refreshPositions: true, revertDuration: 200, zIndex: 99 });
        Snsb.defer(function() {
            handle.attr('style', '');
        });
        this._el.data('BucketItem', this);
        return this._el;
    },
    
    get_text: function Jarvis_BucketItem$get_text() {
        /// <value type="String"></value>
        var ci = this._sqlData.thing;
        if (!(Type.canCast((ci), Jarvis.ClipItem))) {
            ci = Rx.reCast(ci, Jarvis.ClipItem);
        }
        return ci.toText();
    },
    
    _dragging: false,
    _dragHelper: null,
    
    dragHelper: function Jarvis_BucketItem$dragHelper() {
        /// <returns type="jQueryObject"></returns>
        var dt = this._el.data();
        var dg = this._el.data('uiDraggable');
        var p = this._el.offset();
        this._dragHelper = this._el.clone(false, true);
        this._dragHelper.appendTo(document.body);
        this._dragHelper.css({ position: 'absolute', top: p.top, left: p.left });
        return this._dragHelper;
    },
    
    dragStart: function Jarvis_BucketItem$dragStart() {
        var x = jQuery(this._el).draggable('option', 'cursorAt');
        debugger;
        this._dragging = false;
    },
    
    dragDrag: function Jarvis_BucketItem$dragDrag() {
        if (!this._dragging) {
            this._dragging = true;
        }
    },
    
    dragStop: function Jarvis_BucketItem$dragStop() {
        Inform.debug('Drag stop');
        this.getAllMetrics(this._el);
    },
    
    dropStop: function Jarvis_BucketItem$dropStop() {
        var p1 = this._dragHelper.offset();
        var p2 = this._el.offsetParent().offset();
        var top = p1.top - p2.top;
        var left = p1.left - p2.left;
        this._el.css({ top: top, left: left });
    },
    
    from: function Jarvis_BucketItem$from(td) {
        /// <param name="td" type="SudoNsb.SqlThingData">
        /// </param>
        /// <returns type="Jarvis.BucketItem"></returns>
        this._sqlData = td;
        return this;
    },
    
    getAllMetrics: function Jarvis_BucketItem$getAllMetrics(el) {
        /// <param name="el" type="jQueryObject">
        /// </param>
        if (el != null && ('onScreen' in this._sqlData.thing)) {
            var os = this._sqlData.thing.onScreen || new OnScreen();
            this._sqlData.thing.onScreen = os;
            var p = el.offset();
            var o = el.offsetParent().offset();
            os.top = p.top;
            os.left = p.left;
            os.top = p.top - o.top;
            os.left = p.left - o.left;
            os.width = el.width();
            os.height = el.height();
        }
    },
    
    applyMetrics: function Jarvis_BucketItem$applyMetrics(el) {
        /// <param name="el" type="jQueryObject">
        /// </param>
        var os = this._sqlData.thing.onScreen;
        if (os != null) {
            os.applyTo(el);
        }
    },
    
    transMetrics: function Jarvis_BucketItem$transMetrics(el) {
        /// <param name="el" type="jQueryObject">
        /// </param>
        var os = this._sqlData.thing.onScreen;
        if (os != null) {
            os.transAbsoTo(el);
        }
    },
    
    remove: function Jarvis_BucketItem$remove() {
        this._Bucket._Unsaved = true;
        this._Bucket.remove(this.id);
        this._el.remove();
        this._el = null;
    }
}


////////////////////////////////////////////////////////////////////////////////
// Jarvis.Clipboard

Jarvis.Clipboard = function Jarvis_Clipboard() {
    /// <field name="_css$1" type="String" static="true">
    /// </field>
    /// <field name="ClipboardImg" type="String" static="true">
    /// </field>
    /// <field name="instance" type="Jarvis.Clipboard" static="true">
    /// </field>
    /// <field name="clipboardEl" type="jQueryObject" static="true">
    /// </field>
    /// <field name="thumbnailEl" type="DroppableObject" static="true">
    /// </field>
    /// <field name="_tryLoaded$1" type="Boolean" static="true">
    /// </field>
    Jarvis.Clipboard.initializeBase(this);
    this.setOptions('#Clipboard', '/Pnx/Clipboard');
    this.autoArrange = false;
}
Jarvis.Clipboard.load = function Jarvis_Clipboard$load() {
    if (Jarvis.Clipboard._tryLoaded$1) {
        return;
    }
    Jarvis.Clipboard._tryLoaded$1 = true;
    Snsb.waitOn(function() {
        Snsb.defer(function() {
            Jarvis.Clipboard.thumbnailEl = $("<div id='ClipboardThumbnail'/>").appendTo('#header-wrap .container').attr('title', 'Drag your stuff here!').append("\r\n<svg width='100%' height='100%' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Layer_1' width='100' height='100' viewBox='0 0 100 100' overflow='visible' enable-background='new 0 0 100 100' xml:space='preserve' xmlns:xml='http://www.w3.org/XML/1998/namespace'>\r\n<g>\r\n\t<g>\r\n\t\t<linearGradient id='XMLID_5_' gradientUnits='userSpaceOnUse' x1='50' y1='14.1362' x2='50' y2='93.2161'>\r\n\t\t\t<stop offset='0' style='stop-color:#FDF58D'/>\r\n\t\t\t<stop offset='0.0662' style='stop-color:#F9DE75'/>\r\n\t\t\t<stop offset='0.1482' style='stop-color:#F5C85F'/>\r\n\t\t\t<stop offset='0.2451' style='stop-color:#F2B84E'/>\r\n\t\t\t<stop offset='0.365' style='stop-color:#F0AC43'/>\r\n\t\t\t<stop offset='0.5331' style='stop-color:#EEA63C'/>\r\n\t\t\t<stop offset='1' style='stop-color:#EEA43A'/>\r\n\t\t</linearGradient>\r\n\t\t<path fill='url(#XMLID_5_)' d='M21.546,15.589c-3.066,0-5.56,2.494-5.56,5.56V89.73c0,3.066,2.494,5.562,5.56,5.562h56.907    c3.066,0,5.56-2.495,5.56-5.562V21.149c0-3.066-2.494-5.56-5.56-5.56H21.546z'/>\r\n\t\t<path fill='#C07B5D' d='M78.453,14.872H21.546c-3.462,0-6.278,2.816-6.278,6.278V89.73c0,3.463,2.816,6.279,6.278,6.279h56.907    c3.462,0,6.278-2.816,6.278-6.279V21.15C84.731,17.688,81.915,14.872,78.453,14.872L78.453,14.872z M16.703,21.15    c0-2.675,2.168-4.843,4.843-4.843h56.907c2.675,0,4.843,2.168,4.843,4.843V89.73l0,0l0,0c0,2.676-2.168,4.845-4.843,4.845H21.546    c-2.675,0-4.843-2.169-4.843-4.845V21.15L16.703,21.15L16.703,21.15z'/>\r\n\t</g>\r\n\t<g opacity='0.31'>\r\n\t\t<path fill='#FFFFFF' d='M79.883,18.569c1.187,0,2.276,0.372,3.142,0.991c-0.658-1.893-2.454-3.254-4.571-3.254H21.546    c-2.117,0-3.912,1.361-4.57,3.254c0.865-0.619,1.954-0.991,3.141-0.991H79.883z'/>\r\n\t</g>\r\n\t<g opacity='0.1'>\r\n\t\t<path fill='#5A3D1C' d='M20.117,92.066c-1.187,0-2.275-0.372-3.141-0.991c0.658,1.893,2.453,3.254,4.57,3.254h56.907    c2.117,0,3.913-1.361,4.571-3.254c-0.865,0.619-1.955,0.991-3.142,0.991H20.117z'/>\r\n\t</g>\r\n\t<g opacity='0.2'>\r\n\t\t\r\n\t\t\t<image width='121' height='80' xlink:href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAABQCAYAAAA9Wdq3AAAACXBIWXMAAAsSAAALEgHS3X78AAAA BGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAItSURB VHja7JrNTsJQEEbbWiQoxogLjbrxNXkAntQYWYiICBEoOMXvJteGfaftOckXbFdjD3P/SpZA68l4 BEgGJAOSAcmAZEAyIBmQjGRAMiAZkAxIBiQDkgHJSAYkA5IByYBkQDIgGZCMZEAyIBmQDB7IvRU0 mUzSpj/U8Xh88FRP6kxuGtXVRNkH5fi3F9mpo87NTiRpiOwgc38itXe2l+E6Uy29KHlDRMeCd5Zt lF0Q3dlOVhcHwX3LheVS6UeivUsOgn8s38pK10fRdXZz7uBLlqlzS8Ejy60+ryT6zPEcHebgQkK/ LDPLe2X4jufq7nRytNAKgku5D5YnfY50v+d8q7fX0LyS4FfLiz7fdX9b50LMYyeXgp8t9+rmc8dD dhiqN+riN90vxc4ti6j2zg/XYU4eWm4sd5ZHy7Xue5dcDtWfup7r/3CzpvCyuk4195ZdO9DCa3hi XvYouVDdheoe6NpNzRxrdoDcWUeUc9taW5ClumHTkOF6qbrXqrmocx72JLm6xywf1IdlKqmLhi28 pqp/Ge+R65btRXJ1C5JoIdPULdQs2jrVLrnuE69MQ3JYWbfpMGQWdXRhe+Q9nfz3zU+i7UgbjjXp ZHVzvFdu5QsK3kL9f0Chq1v1qtHDIYQL+NFAByRXZDcabz//gQ7AsSaSAcmAZEAyIBmQDEgGJCMZ kAxIBiQDkgHJgGRAMpIByYBkQDIgGZAMSAYkI5lHgGRAMiAZXPArwAAbUMrNfUFAJgAAAABJRU5E rkJggg==' transform='matrix(1 0 0 1 -9.958 -15.8721)'>\r\n\t\t</image>\r\n\t</g>\r\n\t<g>\r\n\t\t<g>\r\n\t\t\t<rect x='22.561' y='22.079' fill='#73A2D7' width='54.878' height='66.299'/>\r\n\t\t\t<linearGradient id='XMLID_6_' gradientUnits='userSpaceOnUse' x1='88.3516' y1='102.9043' x2='26.8348' y2='26.4303'>\r\n\t\t\t\t<stop offset='0' style='stop-color:#ADD7F3'/>\r\n\t\t\t\t<stop offset='1' style='stop-color:#FFFFFF'/>\r\n\t\t\t</linearGradient>\r\n\t\t\t<path fill='url(#XMLID_6_)' d='M24.061,23.579c0,2.796,0,60.503,0,63.299c2.759,0,49.12,0,51.878,0c0-2.796,0-60.503,0-63.299     C73.181,23.579,26.82,23.579,24.061,23.579z'/>\r\n\t\t</g>\r\n\t\t<polygon fill='#C3D9F1' points='75.939,75.488 64.886,86.878 75.927,86.905   '/>\r\n\t\t<linearGradient id='XMLID_7_' gradientUnits='userSpaceOnUse' x1='69.7881' y1='79.8711' x2='64.2052' y2='74.7052'>\r\n\t\t\t<stop offset='0' style='stop-color:#8CB6CD'/>\r\n\t\t\t<stop offset='0.3524' style='stop-color:#B7DCF4'/>\r\n\t\t\t<stop offset='1' style='stop-color:#E5F2FB'/>\r\n\t\t</linearGradient>\r\n\t\t<polygon fill='url(#XMLID_7_)' points='64.058,74.132 75.728,73.605 74.886,75.604 64.11,86.38 63.953,83.752   '/>\r\n\t\t<path fill='#73A2D7' d='M77.439,73.942v-3.125h-1.5c-0.174,1.986-2.305,2.421-2.564,2.466c-0.135,0-10.292,0-10.292,0v10.805    c-0.001,0.265-0.079,2.402-2.334,2.726v1.564h2.683L77.439,73.942z M64.583,84.089v-9.306c1.274,0,8.915,0,8.915,0l0.055-0.008    c0.401-0.06,0.91-0.203,1.426-0.449L64.424,85.201C64.576,84.616,64.583,84.164,64.583,84.089z'/>\r\n\t</g>\r\n\t<g>\r\n\t\t<linearGradient id='XMLID_8_' gradientUnits='userSpaceOnUse' x1='42.248' y1='8.313' x2='54.025' y2='25.3589'>\r\n\t\t\t<stop offset='0' style='stop-color:#E6E6E6'/>\r\n\t\t\t<stop offset='1' style='stop-color:#979797'/>\r\n\t\t</linearGradient>\r\n\t\t<path fill='url(#XMLID_8_)' d='M39.861,11.803c-0.782,0-6.611,0-6.611,0c-2.146,0-3.893,1.747-3.893,3.894v8.885h41.287v-8.885    c0-2.147-1.746-3.894-3.892-3.894c0,0-5.696,0-6.476,0c-1.331-4.148-5.435-7.017-10.208-7.017    C45.294,4.787,41.19,7.655,39.861,11.803z M48.113,12.558c0-1.031,0.839-1.87,1.871-1.87c1.031,0,1.87,0.839,1.87,1.87    c0,1.032-0.839,1.871-1.87,1.871C48.952,14.428,48.113,13.589,48.113,12.558z'/>\r\n\t\t<path fill='#868686' d='M50.067,4.149c-2.576,0-5.002,0.776-7.017,2.245c-1.695,1.236-2.975,2.905-3.676,4.772h-6.125    c-2.499,0-4.531,2.033-4.531,4.532v8.247v1.276h1.276h40.011h1.276v-1.276v-8.247c0-2.499-2.032-4.532-4.53-4.532h-5.989    c-0.702-1.867-1.982-3.537-3.678-4.772C55.07,4.925,52.643,4.149,50.067,4.149L50.067,4.149z M29.994,15.698    c0-1.798,1.457-3.256,3.255-3.256h7.057c1.049-4.023,5.02-7.017,9.761-7.017c4.742,0,8.712,2.994,9.763,7.017h6.921    c1.797,0,3.254,1.458,3.254,3.256v8.247l0,0l0,0H29.994V15.698L29.994,15.698L29.994,15.698z M49.983,10.05    c-1.385,0-2.508,1.123-2.508,2.508c0,1.386,1.123,2.509,2.508,2.509c1.385,0,2.508-1.123,2.508-2.509    C52.491,11.173,51.368,10.05,49.983,10.05L49.983,10.05z M49.983,13.791c-0.679,0-1.232-0.553-1.232-1.233    c0-0.679,0.553-1.232,1.232-1.232c0.679,0,1.232,0.553,1.232,1.232C51.215,13.238,50.662,13.791,49.983,13.791L49.983,13.791z'/>\r\n\t</g>\r\n\t<g opacity='0.5'>\r\n\t\t<path fill='#FFFFFF' d='M66.751,12.441h-6.921c-1.051-4.023-5.021-7.017-9.763-7.017s-8.712,2.993-9.762,7.017H33.25    c-1.798,0-3.255,1.458-3.255,3.256v0.321c0.414-1.332,1.67-2.301,3.156-2.301h7.157c1.065-4.023,5.092-7.017,9.902-7.017    c4.808,0,8.834,2.993,9.9,7.017h7.02c1.221,0,2.285,0.656,2.855,1.629C69.812,13.714,68.429,12.441,66.751,12.441z'/>\r\n\t</g>\r\n</g>\r\n</svg>\r\n").click(Jarvis.Clipboard.clipboardOpen);
            $("<div id='ClipboardGlass'/>").appendTo('body').click(Jarvis.Clipboard.clipboardClose);
            Jarvis.Clipboard.clipboardEl = $("<div id='Clipboard'/>").appendTo('body');
            Jarvis.Clipboard.loadInstanceAw(SudoNsb.Await.get_asyncAw());
            Jarvis.Clipboard.thumbnailEl.droppable({ greedy: true, tolerance: 'touch', over: Jarvis.Clipboard.clipboardOpen });
        }, 50);
    }, function() {
        return window.jQuery.ui && window.jQuery.ui.droppable;
    });
}
Jarvis.Clipboard.loadInstanceAw = function Jarvis_Clipboard$loadInstanceAw(awp) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    MyCss.addStyleOnce((Jarvis.Clipboard).get_fullName(), "\r\n#ClipboardThumbnail {\r\n    display: block;\r\n    position: absolute;\r\n    top: 34px;\r\n    left: 400px;\r\n    width: 50px;\r\n    height: 50px;\r\n    z-index: 18;\r\n}\r\n#Clipboard {\r\n    display: none;\r\n    position: absolute;\r\n    top: 34px;\r\n    left: 50px;\r\n    width: 450px;\r\n    height: 450px;\r\n    padding: 4px;\r\n    background: #FFF;\r\n    border: 3px solid #458BD6;\r\n    border-radius: 20px;\r\n    -webkit-box-shadow: 7px 7px 5px 0px rgba(50, 50, 50, 0.75);\r\n    -moz-box-shadow: 7px 7px 5px 0px rgba(50, 50, 50, 0.75);\r\n    box-shadow: 7px 7px 5px 0px rgba(50, 50, 50, 0.75);\r\n    z-index: 20;\r\n}\r\n#Clipboard:before {\r\n    content: 'clipboard';\r\n    position: relative;\r\n    display: block;\r\n    height: 34px;\r\n    line-height: 1;\r\n    color: #CCC;\r\n    font-size: 24px;\r\n    text-align: center;\r\n}\r\nbody.ClipboardOpen #ClipboardThumbnail {\r\n    display: none;\r\n}\r\nbody.ClipboardOpen #Clipboard/*, #Clipboard.drop-hover*/ {\r\n    display: block;\r\n}\r\nbody #ClipboardGlass {\r\n    position: absolute;\r\n    display: none;\r\n}\r\nbody.ClipboardOpen #ClipboardGlass {\r\n    display: block;\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    background: rgba(0,0,0,.1);  \r\n    z-index: 19;\r\n}\r\n.ClipboardImg {\r\n    z-index: -1;\r\n}\r\nbody #Clipboard .BucketItem {\r\n    display: none;\r\n}\r\nbody.ClipboardOpen #Clipboard .BucketItem {\r\n    display: block;\r\n}\r\n#CleanupClipboard {\r\n    position: absolute;\r\n    top: 4px;\r\n    right: 12px;\r\n    z-index: 21;\r\n}\r\n\r\n");
    new SudoNsb.Await().waitDx(function() {
        return window.jQuery && window.jQuery.ui;
    }).addDl(function(aw) {
        Jarvis.Bucket.loadOrCreateAw(aw, Jarvis.Clipboard, '#Clipboard', '/Pnx/Clipboard');
    }).addDl(function(aw) {
        var tt = aw.get_result();
        Jarvis.Clipboard.instance = tt;
        $(document).on(PnxBase.AppEvents.saveAll, function() {
            tt.saveAw(SudoNsb.Await.get_asyncAw());
        });
        ($('#Clipboard')).droppable({ tolerance: 'touch', out: Jarvis.Clipboard.clipboardClose });
        new SudoNsb.Await().addDx(function() {
            Jarvis.Bucket.nestSpeed = 100;
        }).addAw(ss.Delegate.create(Jarvis.Clipboard.instance, Jarvis.Clipboard.instance.arrangeItemsAw)).addDx(function() {
            Jarvis.Bucket.nestSpeed = 20;
        }).commit(aw);
    }).commit(awp);
}
Jarvis.Clipboard.clipboardOpen = function Jarvis_Clipboard$clipboardOpen(e) {
    /// <param name="e" type="jQueryEvent">
    /// </param>
    Inform.trace('ClipboardOpen');
    $('.drop-hover:not(#Clipboard)').removeClass('drop-hover');
    $(document.body).addClass('ClipboardOpen');
    ($('.BucketOuter:not(#Clipboard)')).droppable({ disabled: true });
}
Jarvis.Clipboard.clipboardClose = function Jarvis_Clipboard$clipboardClose(e) {
    /// <param name="e" type="jQueryEvent">
    /// </param>
    Inform.trace('ClipboardClose');
    $(document.body).removeClass('ClipboardOpen');
    Snsb.defer(function() {
        $(document).trigger(PnxBase.AppEvents.appFocusEv);
        ($('.BucketOuter:not(#Clipboard)')).droppable({ disabled: false });
    });
}
Jarvis.Clipboard.prototype = {
    
    create: function Jarvis_Clipboard$create() {
        /// <returns type="Jarvis.Bucket"></returns>
        Jarvis.Clipboard.callBaseMethod(this, 'create');
        this._BucketOuter.off('dblclick').on('dblclick', ss.Delegate.create(this, this.cleanup)).prepend("<button id='CleanupClipboard'>clean up</button>");
        $('#CleanupClipboard', this._BucketOuter).click(ss.Delegate.create(this, this.cleanup));
        return this;
    },
    
    cleanup: function Jarvis_Clipboard$cleanup(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        Inform.trace('Clipboard.Cleanup');
        this._Unsaved = true;
        new SudoNsb.Await().addAw(ss.Delegate.create(this, this.arrangeItemsAw)).sleep(500).addDx(function() {
            $(document).trigger(PnxBase.AppEvents.saveAll);
        }).commit();
    }
}


////////////////////////////////////////////////////////////////////////////////
// Jarvis.ClipItem

Jarvis.ClipItem = function Jarvis_ClipItem() {
    /// <field name="onScreen" type="OnScreen">
    /// </field>
    /// <field name="text" type="String">
    /// </field>
    /// <field name="type" type="String">
    /// </field>
}
Jarvis.ClipItem.prototype = {
    onScreen: null,
    text: null,
    type: null,
    
    materialize: function Jarvis_ClipItem$materialize() {
        /// <summary>
        /// Materializes this instance into a jQueryObject suitable for page display.
        /// </summary>
        /// <returns type="jQueryObject"></returns>
        return this.toHtml();
    },
    
    toHtml: function Jarvis_ClipItem$toHtml() {
        /// <summary>
        /// Generic HTML for this item.
        /// </summary>
        /// <returns type="jQueryObject"></returns>
        var clss = this.type.split('.');
        var cls = clss[clss.length - 1];
        return $(String.format("<div class='DefaultClipItem'><label>{0}</label><p>{1}</p></div>", cls, this.text));
    },
    
    toText: function Jarvis_ClipItem$toText() {
        /// <summary>
        /// Generic text for this item.
        /// </summary>
        /// <returns type="String"></returns>
        return String.format('[ClipItem::{0} : {1}]', this.type, this.text);
    }
}


Type.registerNamespace('MagicWheel');

////////////////////////////////////////////////////////////////////////////////
// MagicWheel.CkEditor

MagicWheel.CkEditor = function MagicWheel_CkEditor() {
    /// <field name="_basicEditor" type="String" static="true">
    /// </field>
    /// <field name="ajaxUrl" type="String" static="true">
    /// </field>
    /// <field name="_div" type="String" static="true">
    /// </field>
    /// <field name="_saveBtn" type="jQueryObject" static="true">
    /// </field>
    /// <field name="_editor" type="jQueryObject" static="true">
    /// </field>
    /// <field name="_instanceReady" type="Boolean" static="true">
    /// </field>
}
MagicWheel.CkEditor.extendDtd = function MagicWheel_CkEditor$extendDtd(tagName, a1, a2, a3) {
    /// <param name="tagName" type="String">
    /// </param>
    /// <param name="a1" type="String">
    /// </param>
    /// <param name="a2" type="String">
    /// </param>
    /// <param name="a3" type="String">
    /// </param>
    var dtd = CKEDITOR.dtd;
    dtd[tagName] = {};
    dtd[tagName]['#'] = 1;
    for (var i = 1; i < arguments.length; i++) {
        dtd[arguments[i]][tagName] = 1;
    }
}
MagicWheel.CkEditor.InstanceReady = function MagicWheel_CkEditor$InstanceReady() {
    MagicWheel.CkEditor._instanceReady = true;
}
MagicWheel.CkEditor.load = function MagicWheel_CkEditor$load() {
    var data = { id: 66, action: 'pnx_receiver', command: 'getPost' };
    $.post('wp-admin/admin-ajax.php', data, MagicWheel.CkEditor.afterLoad);
}
MagicWheel.CkEditor.afterLoad = function MagicWheel_CkEditor$afterLoad(data) {
    /// <param name="data" type="Object">
    /// </param>
    try {
        ss.Debug.assert(Type.canCast(data, String), 'CkEditor load request did not return a json string');
        var post = JSON.parse(data);
        var html = post['post_content'];
        if (!String.isNullOrEmpty(html)) {
            Snsb.waitOn(function() {
                CKEDITOR.instances.editor1.setData(html);
                Snsb.defer(function() {
                    MagicWheel.CkEditor._saveBtn.html('save');
                }, 100);
            }, function() {
                return MagicWheel.CkEditor._instanceReady;
            });
        }
    }
    catch (ex) {
        Inform.error('CkEditor.AfterLoad :: {0}', ex.message);
    }
}
MagicWheel.CkEditor.Here = function MagicWheel_CkEditor$Here(id) {
    /// <param name="id" type="String">
    /// </param>
    Config.afterConfig(function() {
        var opts = window[id + "DaTa"];
        $(MyCss.hashId(id)).before("<button id='CkEditorSaveBtn'>save</button>").html("\r\n<textarea name='editor1'></textarea>\r\n<script type='text/javascript'>\r\nCKEDITOR.replace( 'editor1' );\r\nCKEDITOR.config.customConfig = '%configPath%?_=' + (new Date()).getTime();\r\nCKEDITOR.config.contentsCss = '%cssPath%?_=' + (new Date()).getTime();\r\nCKEDITOR.on('instanceReady', MagicWheel.CkEditor.InstanceReady);\r\n</script>\r\n".replaceAll('%configPath%', Uri.join(Uri.get_base(), 'nsb/fw/ckeditorConfig.js')).replaceAll('%cssPath%', Uri.join(Uri.get_base(), 'nsb/fw/css/dilliffication.css')));
        MagicWheel.CkEditor._editor = CKEDITOR.instances.editor1;
        MagicWheel.CkEditor._saveBtn = $('#CkEditorSaveBtn');
        MagicWheel.CkEditor._saveBtn.on('click', function() {
            var html = CKEDITOR.instances.editor1.getData();
            var data = { id: 66, pnx_receiver: true, command: 'storePost', content: html };
            var ajo = {};
            ajo.data = data;
            ajo.type = 'POST';
            ajo.url = 'wp-admin/admin-ajax.php';
            ajo.success = MagicWheel.CkEditor.afterPost;
            ajo.error = function() {
                MagicWheel.CkEditor._saveBtn.html('save*');
            };
            $.ajax(ajo);
            MagicWheel.CkEditor._saveBtn.html('saving...');
        });
        MagicWheel.CkEditor._editor.on('change', function() {
            MagicWheel.CkEditor._saveBtn.html('save*');
        });
        MagicWheel.CkEditor.load();
    });
}
MagicWheel.CkEditor.afterPost = function MagicWheel_CkEditor$afterPost(data, type, x) {
    /// <param name="data" type="Object">
    /// </param>
    /// <param name="type" type="String">
    /// </param>
    /// <param name="x" type="jQueryXmlHttpRequest">
    /// </param>
    MagicWheel.CkEditor._saveBtn.html('save');
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.CkEditorOpts

MagicWheel.CkEditorOpts = function MagicWheel_CkEditorOpts() {
    /// <field name="keyClass" type="String">
    /// </field>
    /// <field name="type" type="String">
    /// </field>
}
MagicWheel.CkEditorOpts.prototype = {
    keyClass: null,
    type: null
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.PayPal

MagicWheel.PayPal = function MagicWheel_PayPal() {
    /// <field name="buyNowBtn" type="String" static="true">
    /// </field>
    /// <field name="paymentRequestKey" type="String" static="true">
    /// </field>
    /// <field name="goingToPayPalEv" type="String" static="true">
    /// </field>
    /// <field name="sandbox" type="Boolean" static="true">
    /// </field>
    /// <field name="spinnerUrl" type="String" static="true">
    /// </field>
    /// <field name="_buttonForm" type="jQueryObject" static="true">
    /// </field>
    /// <field name="_products" type="Object" static="true">
    /// </field>
}
MagicWheel.PayPal.get_products = function MagicWheel_PayPal$get_products() {
    /// <value type="Object"></value>
    return MagicWheel.PayPal._products;
}
MagicWheel.PayPal.set_products = function MagicWheel_PayPal$set_products(value) {
    /// <value type="Object"></value>
    MagicWheel.PayPal._products = value;
    return value;
}
MagicWheel.PayPal.appUrl = function MagicWheel_PayPal$appUrl(fileName) {
    /// <param name="fileName" type="String">
    /// </param>
    /// <returns type="String"></returns>
    return Uri.join(Uri.get_base(), 'nsb/paypal/App', fileName);
}
MagicWheel.PayPal.Button = function MagicWheel_PayPal$Button(id) {
    /// <summary>
    /// Called from a page shortcode [PnxPayPalBtn id="THE ID" type="PRODUCT TYPE"]
    /// </summary>
    /// <param name="id" type="String">
    /// The id of the html element
    /// </param>
    Config.afterConfig(function() {
        var opts = window[id + "DaTa"];
        Snsb.defer(function() {
            var notifyUrl = Uri.uniqueify(MagicWheel.PayPal.appUrl('PayPalIPN.php'));
            var returnUrl = Uri.uniqueify(MagicWheel.PayPal.appUrl('PayPalDone.php'));
            MagicWheel.PayPal._buttonForm = $('\r\n<form action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post">\r\n<input type="hidden" name="cmd" value="_s-xclick">\r\n<input type="hidden" name="%buttonType%" value="%encrypted%">\r\n<input type="hidden" name="invoice" value="%invoice%">\r\n<input type="hidden" name="custom" value="%userId%">\r\n<input type="hidden" name="lc" value="US">\r\n<input type="hidden" name="button_subtype" value="services">\r\n<input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynowCC_LG.gif:NonHosted">\r\n<input type="hidden" name="cancel_return" value="%return_url%">\r\n<input type="hidden" name="notify_url" value="%notify_url%">\r\n<input type="hidden" name="return" value="%return_url%">\r\n<input type="hidden" name="rm" value="1">\r\n<input type="hidden" name="cbt" value="Return to PlayNexus.com">\r\n<input type="hidden" name="no_note" value="1">\r\n<input type="hidden" name="no_shipping" value="1">\r\n<input type="hidden" name="image_url" value="%image_url%">\r\n<input type="image" src="https://www.sandbox.paypal.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">\r\n<img alt="" border="0" src="https://www.sandbox.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1">\r\n</form>\r\n'.replaceAll('%notify_url%', notifyUrl).replaceAll('%return_url%', returnUrl).replaceAll('%encrypted%', MagicWheel.PayPal.get_products()[opts.type]).replaceAll('%invoice%', top.PayPalInvoiceId || Snsb.get_newId()).replaceAll('%userId%', top.PayPalUserId || Snsb.get_masterId()).replaceAll('%image_url%', Uri.join(Uri.get_base(), 'nsb/paypal/images/PayPalLogo270x90.gif')).replaceAll('%buttonType%', (MagicWheel.PayPal.sandbox) ? 'encrypted' : 'hosted_button_id').replaceAll('www.sandbox.paypal.com', (MagicWheel.PayPal.sandbox) ? 'www.sandbox.paypal.com' : 'www.paypal.com')).submit(function() {
                SudoNsb.Storage.setLocal('PayPalPaymentRequest', opts);
                $(document).trigger('PnxGoingToPayPalEv');
            }).attr('id', id);
            $(MyCss.hashId(id)).replaceWith(MagicWheel.PayPal._buttonForm);
            $('<!-- ' + Rx.prettyJson(opts) + ' -->').insertAfter(MagicWheel.PayPal._buttonForm);
        });
    });
}
MagicWheel.PayPal.buyWindow = function MagicWheel_PayPal$buyWindow(fnClose) {
    /// <param name="fnClose" type="System.Action`1">
    /// </param>
    new MagicWheel.PopWindow().show(function(opt) {
        opt.width = 981;
        opt.height = 670;
        opt.url = Uri.join(Uri.get_base(), 'purchase');
        opt.coverMsg = 'Purchase window active.<br><br>Complete transaciton or close purchase window to continue.';
        opt.coverSpinner = MagicWheel.PayPal.spinnerUrl;
        opt.closeFn = fnClose;
        opt.childParams = { PayPalUserId: Snsb.get_masterId(), PayPalInvoiceId: Snsb.get_newId() };
    });
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.PayPalBtnOpts

MagicWheel.PayPalBtnOpts = function MagicWheel_PayPalBtnOpts() {
    /// <field name="keyClass" type="String">
    /// </field>
    /// <field name="type" type="String">
    /// </field>
}
MagicWheel.PayPalBtnOpts.prototype = {
    keyClass: null,
    type: null
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.PayPalSubscriptions

MagicWheel.PayPalSubscriptions = function MagicWheel_PayPalSubscriptions() {
    /// <field name="oneDay" type="Number" static="true">
    /// </field>
    /// <field name="oneYear" type="Number" static="true">
    /// </field>
}
MagicWheel.PayPalSubscriptions.get_isPaidFor = function MagicWheel_PayPalSubscriptions$get_isPaidFor() {
    /// <value type="Boolean"></value>
    var now = Date.get_now().getTime();
    return now - MagicWheel.PayPalSubscriptions.oneDay <= MagicWheel.PayPalSubscriptions.get_useForADay().date || now - MagicWheel.PayPalSubscriptions.oneYear <= MagicWheel.PayPalSubscriptions.get_subscription().date;
}
MagicWheel.PayPalSubscriptions.get_purchases = function MagicWheel_PayPalSubscriptions$get_purchases() {
    /// <value type="MagicWheel.PnxPurchases"></value>
    var pps = BrowserUser.Session;
    if (Snsb.isEmpty(pps) || Snsb.isEmpty(pps.transactions)) {
        return new MagicWheel.PnxPurchases();
    }
    return pps.transactions.purchases || new MagicWheel.PnxPurchases();
}
MagicWheel.PayPalSubscriptions.get_useForADay = function MagicWheel_PayPalSubscriptions$get_useForADay() {
    /// <value type="MagicWheel.PnxPurchaseData"></value>
    return (MagicWheel.PayPalSubscriptions.get_purchases().CustomTile || new MagicWheel.PnxPurchaseData());
}
MagicWheel.PayPalSubscriptions.get_subscription = function MagicWheel_PayPalSubscriptions$get_subscription() {
    /// <value type="MagicWheel.PnxPurchaseData"></value>
    return (MagicWheel.PayPalSubscriptions.get_purchases().TileSubscription || new MagicWheel.PnxPurchaseData());
}
MagicWheel.PayPalSubscriptions.askPay = function MagicWheel_PayPalSubscriptions$askPay(e) {
    /// <param name="e" type="jQueryEvent">
    /// </param>
    MagicWheel.PayPalSubscriptions.ping('AskPay');
    MagicWheel.PayPal.buyWindow(function(success) {
        MagicWheel.PayPalSubscriptions.ping((success) ? 'CompletePay' : 'CancelPay');
        new SudoNsb.Await().handleDl(LocalExceptions.ajaxLoadError, function(aw) {
            SudoNsb.Await.rethrowAw(aw);
        }).addAw(BrowserUser.waitSessionLockAw).addAw(BrowserUser.reloadSessionAw).addDl(function(aw) {
            if (MagicWheel.PayPalSubscriptions.get_isPaidFor()) {
                aw.done();
                return;
            }
            var btnOpts = SudoNsb.Storage.getLocal('PayPalPaymentRequest');
            if (!Snsb.isEmpty(btnOpts)) {
                var pd = (MagicWheel.PayPalSubscriptions.get_purchases())[btnOpts.type];
                if (pd != null && pd.status === 'Pending') {
                    SudoNsb.Dialog.aw(aw, $('<div>PayPal payement status is <b>pending</b>. Please press the button again to check for payment completion.</div>'), {});
                    return;
                }
                if (pd != null && pd.status === 'Failed') {
                    SudoNsb.Dialog.aw(aw, $('<div>PayPal indicated a failed payment. Try again with a different payment method.</div>'), {});
                }
            }
        }).commit();
    });
}
MagicWheel.PayPalSubscriptions.ping = function MagicWheel_PayPalSubscriptions$ping(item, msg) {
    /// <param name="item" type="String">
    /// </param>
    /// <param name="msg" type="String">
    /// </param>
    var options = {};
    options.url = Uri.join(Config.get_appUrl(), 'sql.myping.php');
    options.dataType = 'jsonp';
    options.data = SudoNsb.Files.data({ Project: 'VibrationalArcade', UserId: Snsb.get_masterId(), Item: item, Utc: new Date().getTime(), Data: JSON.stringify(msg) });
    options.type = 'POST';
    options.success = function() {
    };
    options.error = function() {
    };
    $.ajax(options);
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.PnxPurchases

MagicWheel.PnxPurchases = function MagicWheel_PnxPurchases() {
    /// <field name="CustomTile" type="MagicWheel.PnxPurchaseData">
    /// </field>
    /// <field name="TileSubscription" type="MagicWheel.PnxPurchaseData">
    /// </field>
}
MagicWheel.PnxPurchases.prototype = {
    CustomTile: null,
    TileSubscription: null
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.PnxPurchaseData

MagicWheel.PnxPurchaseData = function MagicWheel_PnxPurchaseData() {
    /// <field name="count" type="Number" integer="true">
    /// </field>
    /// <field name="date" type="Number" integer="true">
    /// </field>
    /// <field name="duplicate" type="Boolean">
    /// </field>
    /// <field name="status" type="String">
    /// </field>
    /// <field name="txnId" type="String">
    /// </field>
}
MagicWheel.PnxPurchaseData.prototype = {
    count: 0,
    date: 0,
    duplicate: false,
    status: null,
    txnId: null
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.PaypalPingItems

MagicWheel.PaypalPingItems = function MagicWheel_PaypalPingItems() {
    /// <field name="askPay" type="String" static="true">
    /// </field>
    /// <field name="goToPaypal" type="String" static="true">
    /// </field>
    /// <field name="completePay" type="String" static="true">
    /// </field>
    /// <field name="cancelPay" type="String" static="true">
    /// </field>
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.PnxTransaction

MagicWheel.PnxTransaction = function MagicWheel_PnxTransaction() {
    /// <field name="purchases" type="MagicWheel.PnxPurchases">
    /// </field>
}
MagicWheel.PnxTransaction.prototype = {
    purchases: null
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.PaypalSession

MagicWheel.PaypalSession = function MagicWheel_PaypalSession() {
    /// <field name="transactions" type="MagicWheel.PnxTransaction">
    /// </field>
    MagicWheel.PaypalSession.initializeBase(this);
}
MagicWheel.PaypalSession.prototype = {
    transactions: null
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.PopWindow

MagicWheel.PopWindow = function MagicWheel_PopWindow() {
    /// <field name="_instance" type="MagicWheel.PopWindow" static="true">
    /// </field>
    /// <field name="_returned" type="Boolean" static="true">
    /// </field>
    /// <field name="opt" type="MagicWheel.PopWindowOptions">
    /// </field>
    this.opt = new MagicWheel.PopWindowOptions();
}
MagicWheel.PopWindow.Done = function MagicWheel_PopWindow$Done(ic) {
    /// <param name="ic" type="Boolean">
    /// </param>
    var opt = MagicWheel.PopWindow._instance.opt;
    if (!MagicWheel.PopWindow._returned) {
        MagicWheel.PopWindow._returned = true;
        if (opt.closeFn != null) {
            opt.closeFn(ic);
        }
    }
}
MagicWheel.PopWindow.prototype = {
    
    show: function MagicWheel_PopWindow$show(fn) {
        /// <param name="fn" type="System.Action`1">
        /// </param>
        MagicWheel.PopWindow._instance = this;
        this.opt.set(fn);
        MagicWheel.PopWindow._returned = false;
        var top = Math.max((window.screenY || window.screenTop) + ($(window).height() / 2) - (this.opt.height / 2), 0);
        var left = Math.max((window.screenX || window.screenLeft) + ($(window).width() / 2) - (this.opt.width / 2), 0);
        var win = window.open(this.opt.url, 'pnxpopwin', String.format('toolbar=0,status=0,top={0},left={1},width={2},height={3},scrollbars=1', top, left, this.opt.width, this.opt.height));
        if (win != null && !win.closed) {
            win.NsbAppDone = 'PnxTiles.PopWindow.Done';
            if (this.opt.childParams != null) {
                var $dict1 = this.opt.childParams;
                for (var $key2 in $dict1) {
                    var p = { key: $key2, value: $dict1[$key2] };
                    win[p.key] = p.value;
                }
            }
            var iTmr = 0;
            iTmr = window.setInterval(function() {
                if (win.closed) {
                    window.clearInterval(iTmr);
                    MagicWheel.PopWindow.Done(false);
                }
            }, 21);
        }
    }
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.PopWindowOptions

MagicWheel.PopWindowOptions = function MagicWheel_PopWindowOptions() {
    /// <field name="childParams" type="Object">
    /// </field>
    /// <field name="closeFn" type="System.Action`1">
    /// </field>
    /// <field name="height" type="Number" integer="true">
    /// </field>
    /// <field name="url" type="String">
    /// </field>
    /// <field name="width" type="Number" integer="true">
    /// </field>
    /// <field name="coverMsg" type="String">
    /// </field>
    /// <field name="coverSpinner" type="String">
    /// </field>
}
MagicWheel.PopWindowOptions.prototype = {
    childParams: null,
    closeFn: null,
    height: 0,
    url: null,
    width: 0,
    coverMsg: null,
    coverSpinner: null,
    
    set: function MagicWheel_PopWindowOptions$set(fn) {
        /// <param name="fn" type="System.Action`1">
        /// </param>
        /// <returns type="MagicWheel.PopWindowOptions"></returns>
        switch (typeof(fn)) {
            case 'function':
                fn(this);
                break;
            default:
                $.extend(true, this, fn);
                break;
        }
        return this;
    }
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.AskBase

MagicWheel.AskBase = function MagicWheel_AskBase(toCover, text) {
    /// <param name="toCover" type="jQueryObject">
    /// </param>
    /// <param name="text" type="String">
    /// </param>
    /// <field name="_css" type="String" static="true">
    /// </field>
    /// <field name="element" type="PositionObject">
    /// </field>
    /// <field name="cancelFn" type="Function">
    /// </field>
    /// <field name="cover" type="jQueryObject">
    /// </field>
    /// <field name="near" type="jQueryObject">
    /// </field>
    /// <field name="okFn" type="Function">
    /// </field>
    /// <field name="myBody" type="jQueryObject">
    /// </field>
    MyCss.addStyleOnce((MagicWheel.AskBase).get_fullName(), '\r\n.askDeleteCover {\r\n    position: absolute;\r\n    text-align: center;\r\n    background: rgba(0, 0, 0, .75);\r\n}\r\n.askDeleteDiv {\r\n    position: absolute;\r\n    width: 200px;\r\n    border-radius: 9px;\r\n    background: #FFF;\r\n    overflow: hidden;\r\n}\r\n.askDeleteDiv span {\r\n    display: block;\r\n    width: 80%;\r\n    margin: 12px auto;\r\n    text-align: center;\r\n}\r\n.askDeleteDiv button {\r\n    margin: 12px;\r\n    padding: 3px 10px;\r\n}\r\n.askDeleteDiv .cancel {\r\n    float: left;\r\n}\r\n.askDeleteDiv .ok {\r\n    clear: both;\r\n    float: right;\r\n}\r\n');
    this.myBody = $(toCover[0].ownerDocument.body);
    toCover = toCover || this.myBody;
    Snsb.defer(ss.Delegate.create(this, function() {
        var p = toCover.offset();
        this.cover = $("<div class='askDeleteCover AboveHider'/>").css({ top: p.top, left: p.left, width: toCover.outerWidth(), height: toCover.outerHeight() }).appendTo(this.myBody);
        this.element = $("<div class='askDeleteDiv'/>").append(String.format('<span>{0}</span>', text)).appendTo(this.cover);
        this.myBody.on('keydown.askbase', ss.Delegate.create(this, function(e) {
            if (e.which === 27) {
                this.onCancel(e);
            }
            if (e.which === 13) {
                this.onOk(e);
            }
        }));
        this.config();
        this.position();
    }));
}
MagicWheel.AskBase.prototype = {
    element: null,
    cancelFn: null,
    cover: null,
    near: null,
    okFn: null,
    myBody: null,
    
    config: function MagicWheel_AskBase$config() {
    },
    
    okBtn: function MagicWheel_AskBase$okBtn() {
        $("<button class='ok'>ok</button>").appendTo(this.element).on('click', ss.Delegate.create(this, this.onOk));
    },
    
    cancelBtn: function MagicWheel_AskBase$cancelBtn() {
        $("<button class='cancel'>cancel</button>").appendTo(this.element).on('click', ss.Delegate.create(this, this.onCancel));
    },
    
    position: function MagicWheel_AskBase$position() {
        this.element.position({ my: 'center', at: 'center-20%', of: this.cover, collision: 'fit' });
    },
    
    onOk: function MagicWheel_AskBase$onOk(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        if (this.okFn != null) {
            this.okFn();
        }
        this.close(e);
    },
    
    onCancel: function MagicWheel_AskBase$onCancel(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        if (this.cancelFn != null) {
            this.cancelFn();
        }
        this.close(e);
    },
    
    close: function MagicWheel_AskBase$close(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        this.cover.remove();
        Snsb.cancelEvent(e);
        this.myBody.off('.askbase');
    }
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.AskOk

MagicWheel.AskOk = function MagicWheel_AskOk(text, toCover, okFn) {
    /// <param name="text" type="String">
    /// </param>
    /// <param name="toCover" type="jQueryObject">
    /// </param>
    /// <param name="okFn" type="Function">
    /// </param>
    MagicWheel.AskOk.initializeBase(this, [ toCover, text ]);
    this.okFn = okFn;
}
MagicWheel.AskOk.prototype = {
    
    config: function MagicWheel_AskOk$config() {
        this.okBtn();
    }
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.AskOkCancel

MagicWheel.AskOkCancel = function MagicWheel_AskOkCancel(text, toCover, okFn, cancelFn) {
    /// <param name="text" type="String">
    /// </param>
    /// <param name="toCover" type="jQueryObject">
    /// </param>
    /// <param name="okFn" type="Function">
    /// </param>
    /// <param name="cancelFn" type="Function">
    /// </param>
    MagicWheel.AskOkCancel.initializeBase(this, [ toCover, text ]);
    this.okFn = okFn;
    this.cancelFn = cancelFn;
}
MagicWheel.AskOkCancel.prototype = {
    
    config: function MagicWheel_AskOkCancel$config() {
        this.okBtn();
        this.cancelBtn();
    }
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.AskDelete

MagicWheel.AskDelete = function MagicWheel_AskDelete(near, toCover, okFn) {
    /// <param name="near" type="jQueryObject">
    /// </param>
    /// <param name="toCover" type="jQueryObject">
    /// </param>
    /// <param name="okFn" type="Function">
    /// </param>
    /// <field name="_css$1" type="String" static="true">
    /// </field>
    MagicWheel.AskDelete.initializeBase(this, [ toCover, 'Delete for sure?' ]);
    MyCss.addStyleOnce((MagicWheel.AskDelete).get_fullName(), '\r\n.askDeleteCover {\r\n    background: rgba(255,0,0,.14);\r\n}\r\n');
    this.okFn = okFn;
    this.near = near;
}
MagicWheel.AskDelete.prototype = {
    
    config: function MagicWheel_AskDelete$config() {
        this.okBtn();
        this.cancelBtn();
    },
    
    position: function MagicWheel_AskDelete$position() {
        this.element.position({ my: 'right center', at: 'left+40 center-24', of: this.near, collision: 'fit', within: this.cover });
    }
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.AppStyle

MagicWheel.AppStyle = function MagicWheel_AppStyle(ctx, cx, cy, radius) {
    /// <param name="ctx" type="SudoNsb.Ctx">
    /// </param>
    /// <param name="cx" type="Number">
    /// </param>
    /// <param name="cy" type="Number">
    /// </param>
    /// <param name="radius" type="Number" integer="true">
    /// </param>
    /// <field name="_themeKey" type="String" static="true">
    /// </field>
    /// <field name="themeNameKey" type="String" static="true">
    /// </field>
    /// <field name="centerBack" type="String">
    /// </field>
    /// <field name="ctx" type="SudoNsb.Ctx">
    /// </field>
    /// <field name="cursorColor" type="String">
    /// </field>
    /// <field name="cx" type="Number">
    /// </field>
    /// <field name="cy" type="Number">
    /// </field>
    /// <field name="grd" type="SudoNsb.Grd">
    /// </field>
    /// <field name="htmlBackground" type="String">
    /// </field>
    /// <field name="innerCircleBorder" type="Number" integer="true">
    /// </field>
    /// <field name="lineColor" type="String">
    /// </field>
    /// <field name="lineWidth" type="Number" integer="true">
    /// </field>
    /// <field name="radius" type="Number" integer="true">
    /// </field>
    /// <field name="bAw" type="Boolean">
    /// </field>
    /// <field name="textColor" type="String">
    /// </field>
    /// <field name="name" type="String">
    /// </field>
    /// <field name="doneColor" type="String">
    /// </field>
    /// <field name="doneColorKey" type="String" static="true">
    /// </field>
    /// <field name="textColorKey" type="String" static="true">
    /// </field>
    /// <field name="cursorColorKey" type="String" static="true">
    /// </field>
    /// <field name="themes" type="Object" static="true">
    /// </field>
    this.ctx = ctx;
    this.cx = cx;
    this.cy = cy;
    this.radius = radius;
    SudoNsb.Storage.defaultLocal('@FwTheme', 'frankieblue');
    this.redraw();
}
MagicWheel.AppStyle.prototype = {
    centerBack: null,
    ctx: null,
    cursorColor: 'rgba(0,0,255,.20)',
    cx: 0,
    cy: 0,
    grd: null,
    htmlBackground: null,
    innerCircleBorder: 0,
    lineColor: null,
    lineWidth: 0,
    radius: 0,
    bAw: false,
    textColor: null,
    name: null,
    doneColor: 'rgba(100, 255, 100, .35)',
    
    defaults: function MagicWheel_AppStyle$defaults() {
        this.doneColor = 'rgba(100, 255, 100, .35)';
    },
    
    redraw: function MagicWheel_AppStyle$redraw() {
        Snsb.defer(ss.Delegate.create(this, function() {
            this[SudoNsb.Storage.getLocal('@FwTheme')]();
        }));
    },
    
    green: function MagicWheel_AppStyle$green(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        this.defaults();
        this.grd = this.ctx.createRadialGradient(this.cx, this.cy, 0, this.cx, this.cy, this.radius - 5);
        this.grd.addColorStop(0, 'rgb(255, 255, 170)');
        this.grd.addColorStop(0.945, 'rgb(106, 255, 0)');
        this.grd.addColorStop(1, 'rgb(0, 191, 0)');
        this.lineColor = '#060';
        this.lineWidth = 2;
        this.doneColor = 'rgba(100,100,255,.45)';
        this.innerCircleBorder = 2;
        this.textColor = '#816041';
        this.htmlBackground = 'transparent';
        this.centerBack = '#E7FDDF';
        this.bAw = false;
        this.name = 'green';
        $('.Swatch').removeClass('selected');
        $('.Swatch.green').addClass('selected');
        this.become();
    },
    
    yellow: function MagicWheel_AppStyle$yellow(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        this.defaults();
        this.grd = this.ctx.createRadialGradient(this.cx, this.cy, 0, this.cx, this.cy, this.radius - 5);
        this.grd.addColorStop(0, 'rgb(255, 110, 2)');
        this.grd.addColorStop(0.945, 'rgb(255, 255, 0)');
        this.grd.addColorStop(1, 'rgb(255, 109, 0)');
        this.lineColor = 'rgb(235, 78, 0)';
        this.lineWidth = 2;
        this.innerCircleBorder = 2;
        this.textColor = '#9B0505';
        this.htmlBackground = 'transparent';
        this.centerBack = 'rgba(255,255,220,.65)';
        this.bAw = false;
        this.name = 'yellow';
        $('.Swatch').removeClass('selected');
        $('.Swatch.yellow').addClass('selected');
        this.become();
    },
    
    sunburst: function MagicWheel_AppStyle$sunburst(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        this.defaults();
        this.grd = this.ctx.createRadialGradient(this.cx, this.cy, 0, this.cx, this.cy, this.radius - 5);
        this.grd.addColorStop(0, '#feccb1');
        this.grd.addColorStop(0.75, '#f17432');
        this.grd.addColorStop(1, '#ea5507');
        this.lineColor = '#FBA0D7';
        this.lineWidth = 10;
        this.innerCircleBorder = 2;
        this.textColor = '#F1E58E';
        this.htmlBackground = 'transparent';
        this.centerBack = '#900';
        this.bAw = false;
        this.name = 'sunburst';
        $('.Swatch').removeClass('selected');
        $('.Swatch.sunburst').addClass('selected');
        this.become();
    },
    
    white: function MagicWheel_AppStyle$white(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        this.defaults();
        this.grd = this.ctx.createRadialGradient(this.cx, this.cy, 0, this.cx, this.cy, this.radius - 5);
        this.grd.addColorStop(0, 'rgb(255, 255, 255)');
        this.grd.addColorStop(0.945, 'rgb(255, 255, 255)');
        this.grd.addColorStop(1, 'rgb(255, 255, 255)');
        this.lineColor = '#555';
        this.lineWidth = 4;
        this.innerCircleBorder = 4;
        this.textColor = '#000';
        this.htmlBackground = 'transparent';
        this.centerBack = '#EEE';
        this.cursorColor = this.doneColor = 'rgba(0, 0, 0, .25)';
        this.bAw = true;
        this.name = 'white';
        $('.Swatch').removeClass('selected');
        $('.Swatch.white').addClass('selected');
        this.become();
    },
    
    metro: function MagicWheel_AppStyle$metro(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        this.defaults();
        this.grd = this.ctx.createRadialGradient(this.cx, this.cy, 0, this.cx, this.cy, this.radius - 5);
        this.grd.addColorStop(0, '#8995D3');
        this.grd.addColorStop(0.945, '#8995D3');
        this.grd.addColorStop(1, '#8995D3');
        this.lineColor = '#4054BE';
        this.lineWidth = 14;
        this.innerCircleBorder = 14;
        this.textColor = '#FFF';
        this.htmlBackground = 'transparent';
        this.centerBack = '#A9A5F3';
        this.bAw = false;
        this.name = 'metro';
        $('.Swatch').removeClass('selected');
        $('.Swatch.metro').addClass('selected');
        this.become();
    },
    
    frankieblue: function MagicWheel_AppStyle$frankieblue(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        this.defaults();
        this.grd = this.ctx.createRadialGradient(this.cx, this.cy, 0, this.cx, this.cy, this.radius - 5);
        this.grd.addColorStop(0, '#FFF');
        this.grd.addColorStop(0.445, '#EEE');
        this.grd.addColorStop(0.945, '#1997FB');
        this.grd.addColorStop(1, '#0067AB');
        this.lineColor = '#1087eb';
        this.lineWidth = 8;
        this.innerCircleBorder = 4;
        this.textColor = '#008';
        this.htmlBackground = 'transparent';
        this.centerBack = 'rgba(255,255,255,.95)';
        this.bAw = false;
        this.name = 'frankieblue';
        $('.Swatch').removeClass('selected');
        $('.Swatch.frankieblue').addClass('selected');
        this.become();
    },
    
    become: function MagicWheel_AppStyle$become() {
        SudoNsb.Storage.setLocal('@FwTheme', this.name);
        $('html').css('background-color', this.htmlBackground);
        MagicWheel.Wheel.instance.fwEl.css('color', this.textColor);
        MagicWheel.Input.data.theme = SudoNsb.Storage.getLocal('@FwTheme');
        MagicWheel.Wheel.instance.clearCanvas();
        MagicWheel.Wheel.instance.drawWheel();
        MagicWheel.Wheel.instance.drawInnerCircle();
        MagicWheel.Wheel.instance.drawCenter(MagicWheel.Input.data.yatta || MagicWheel.Wheel.instance.wp.clickHere);
        MagicWheel.Wheel.instance.reDrawCursor();
        if (this.bAw) {
            $('img.stylable').addClass('desaturate');
        }
        else {
            $('img.stylable').removeClass('desaturate');
        }
    }
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.ArcText2

MagicWheel.ArcText2 = function MagicWheel_ArcText2(ctx, cx, cy, fontSize, lineHeight, color) {
    /// <param name="ctx" type="SudoNsb.Ctx">
    /// </param>
    /// <param name="cx" type="Number" integer="true">
    /// </param>
    /// <param name="cy" type="Number" integer="true">
    /// </param>
    /// <param name="fontSize" type="Number" integer="true">
    /// </param>
    /// <param name="lineHeight" type="Number" integer="true">
    /// </param>
    /// <param name="color" type="String">
    /// </param>
    /// <field name="cx" type="Number" integer="true">
    /// </field>
    /// <field name="cy" type="Number" integer="true">
    /// </field>
    /// <field name="ctx" type="SudoNsb.Ctx">
    /// </field>
    /// <field name="fontSize" type="Number" integer="true">
    /// </field>
    /// <field name="lineHeight" type="Number" integer="true">
    /// </field>
    /// <field name="radius" type="Number">
    /// </field>
    /// <field name="color" type="String">
    /// </field>
    /// <field name="_wel" type="jQueryObject">
    /// </field>
    this.cx = cx;
    this.cy = cy;
    this.ctx = ctx;
    this.fontSize = fontSize;
    this.lineHeight = lineHeight;
    this.color = color;
    ctx.translate(this.cx, this.cy);
}
MagicWheel.ArcText2.prototype = {
    cx: 0,
    cy: 0,
    ctx: null,
    fontSize: 0,
    lineHeight: 0,
    radius: 0,
    color: null,
    _wel: null,
    
    printLine: function MagicWheel_ArcText2$printLine(line, startAngle, endAngle, radius) {
        /// <param name="line" type="String">
        /// </param>
        /// <param name="startAngle" type="Number">
        /// </param>
        /// <param name="endAngle" type="Number">
        /// </param>
        /// <param name="radius" type="Number">
        /// </param>
        this.radius = radius;
        this.ctx.font = this.fontSize + 'px/' + this.lineHeight + 'px ' + "'Times New Roman'";
        this._wel = $('<span/>').css({ 'font-size': this.fontSize, 'line-height': this.lineHeight }).appendTo(document.body);
        this._wel.html(line);
        var lineWidth = this._wel.width();
        var arc = lineWidth / 3.14159 / this.radius * 180;
        startAngle += (endAngle - startAngle - arc) / 2;
        this.ctx.save();
        this.ctx.rotate(NsbMath.Trig.toRadians(startAngle));
        for (var i = 0; i < line.length; i++) {
            this.printChr(line.charAt(i));
        }
        this._wel.remove();
        this.ctx.restore();
    },
    
    printChr: function MagicWheel_ArcText2$printChr(s) {
        /// <param name="s" type="String">
        /// </param>
        this.ctx.save();
        this.ctx.translate(0, -parseInt(this.radius));
        this.ctx.fillStyle = this.color;
        this.ctx.fillText(s, 0, 0);
        this.ctx.restore();
        this._wel.html((s === ' ') ? '&nbsp;' : s);
        var chwd = this._wel.width();
        var wdeg = chwd * 360 / (2 * Math.PI * this.radius);
        this.ctx.rotate(NsbMath.Trig.toRadians(wdeg));
    }
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.Emotions

MagicWheel.Emotions = function MagicWheel_Emotions() {
    /// <field name="desirable" type="Object" static="true">
    /// </field>
    /// <field name="_lastAllFor" type="Object" static="true">
    /// </field>
    /// <field name="_lastAll" type="Array" static="true">
    /// </field>
    /// <field name="_cachedEmotions" type="Array" static="true">
    /// </field>
}
MagicWheel.Emotions.addToInput = function MagicWheel_Emotions$addToInput(inputEl, list, options) {
    /// <param name="inputEl" type="jQueryObject">
    /// </param>
    /// <param name="list" type="Object">
    /// </param>
    /// <param name="options" type="Object">
    /// </param>
    var doneFn = options['doneFn'];
    var escapeFn = options['onEscape'];
    inputEl.autocomplete({ source: MagicWheel.Emotions._sourcer, delay: 0 }).attr('placeholder', options['hintText']).on('keydown.emm', function(e) {
        if (e.which === 13) {
            if (doneFn != null) {
                doneFn(inputEl.val().trim());
            }
            Snsb.cancelEvent(e);
        }
        else if (e.which === 27) {
            if (escapeFn != null) {
                escapeFn();
            }
            Snsb.cancelEvent(e);
        }
    }).on('blur.emm', function(e) {
        if (escapeFn != null) {
            escapeFn();
        }
        Snsb.cancelEvent(e);
    });
    Snsb.defer(function() {
        inputEl.click().focus();
    });
}
MagicWheel.Emotions._sourcer = function MagicWheel_Emotions$_sourcer(aci, fn) {
    /// <param name="aci" type="Object">
    /// </param>
    /// <param name="fn" type="System.Action`1">
    /// </param>
    var result = [];
    var s = aci['term'];
    var c = s.charAt(0);
    for (var i = 0; i < MagicWheel.Emotions._cachedEmotions.length; i++) {
        if (MagicWheel.Emotions._cachedEmotions[i].charAt(0) < c) {
            continue;
        }
        if (MagicWheel.Emotions._cachedEmotions[i].charAt(0) > c) {
            break;
        }
        if (!MagicWheel.Emotions._cachedEmotions[i].indexOf(s)) {
            result.add(MagicWheel.Emotions._cachedEmotions[i]);
        }
    }
    fn(result);
}
MagicWheel.Emotions.randomOf = function MagicWheel_Emotions$randomOf(words) {
    /// <param name="words" type="Object">
    /// </param>
    /// <returns type="String"></returns>
    var l = words[Object.keys(words)[Snsb.randomOf(Object.getKeyCount(words)) - 1]];
    return l[Snsb.randomOf(l.length) - 1];
}
MagicWheel.Emotions.allOf = function MagicWheel_Emotions$allOf(list) {
    /// <param name="list" type="Object">
    /// </param>
    /// <returns type="Array"></returns>
    if (MagicWheel.Emotions._lastAllFor === list) {
        return MagicWheel.Emotions._lastAll;
    }
    var all = [];
    var $dict1 = list;
    for (var $key2 in $dict1) {
        var p = { key: $key2, value: $dict1[$key2] };
        var $enum3 = ss.IEnumerator.getEnumerator(p.value);
        while ($enum3.moveNext()) {
            var s = $enum3.current;
            all.add({ id: Snsb.get_newId(), name: s });
        }
    }
    MagicWheel.Emotions._lastAll = all;
    MagicWheel.Emotions._lastAllFor = list;
    return all;
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.FwData

MagicWheel.FwData = function MagicWheel_FwData() {
    /// <field name="date" type="String">
    /// </field>
    /// <field name="fbid" type="String">
    /// </field>
    /// <field name="hideSegSelect" type="Boolean">
    /// </field>
    /// <field name="keytypename" type="String">
    /// </field>
    /// <field name="more" type="Object">
    /// </field>
    /// <field name="name" type="String">
    /// </field>
    /// <field name="segs" type="Array">
    /// </field>
    /// <field name="theme" type="String">
    /// </field>
    /// <field name="uid" type="String">
    /// </field>
    /// <field name="username" type="String">
    /// </field>
    /// <field name="were" type="String">
    /// </field>
    /// <field name="yatta" type="String">
    /// </field>
    this.more = {};
    this.segs = [];
}
MagicWheel.FwData.prototype = {
    date: null,
    fbid: null,
    hideSegSelect: false,
    keytypename: null,
    name: null,
    theme: null,
    uid: null,
    username: null,
    were: null,
    yatta: null,
    
    setSegs: function MagicWheel_FwData$setSegs(spokes) {
        /// <param name="spokes" type="Number" integer="true">
        /// </param>
        /// <returns type="MagicWheel.FwData"></returns>
        var oldSegs = this.segs;
        this.segs = [];
        if (spokes > 0) {
            var i;
            for (i = 0; i < spokes; i++) {
                this.segs[i] = oldSegs[i] || '';
            }
        }
        return this;
    },
    
    set: function MagicWheel_FwData$set(key, value) {
        /// <param name="key" type="String">
        /// </param>
        /// <param name="value" type="Object">
        /// </param>
        /// <returns type="MagicWheel.FwData"></returns>
        this[key] = value;
        return this;
    },
    
    setMore: function MagicWheel_FwData$setMore(key, value) {
        /// <param name="key" type="String">
        /// </param>
        /// <param name="value" type="Object">
        /// </param>
        /// <returns type="MagicWheel.FwData"></returns>
        this.more[key] = value;
        return this;
    },
    
    getMore: function MagicWheel_FwData$getMore(key) {
        /// <param name="key" type="String">
        /// </param>
        /// <returns type="Object"></returns>
        return this.more[key];
    }
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.GridCloud

MagicWheel.GridCloud = function MagicWheel_GridCloud() {
    /// <field name="_css$1" type="String" static="true">
    /// </field>
    /// <field name="_gridClouldKey$1" type="String" static="true">
    /// </field>
    /// <field name="maxFontSize" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="_cloudBorderKey$1" type="String" static="true">
    /// </field>
    /// <field name="_instance$1" type="MagicWheel.GridCloud" static="true">
    /// </field>
    /// <field name="cloudItems" type="Array">
    /// </field>
    /// <field name="_myBody$1" type="jQueryObject">
    /// </field>
    /// <field name="name" type="String">
    /// </field>
    /// <field name="_aboveTop$1" type="Number" integer="true">
    /// </field>
    /// <field name="_asker$1" type="jQueryObject">
    /// </field>
    /// <field name="_baseHeight$1" type="Number" integer="true">
    /// </field>
    /// <field name="_extraHeight$1" type="Number" integer="true">
    /// </field>
    /// <field name="_f$1" type="Number" integer="true">
    /// </field>
    /// <field name="_input$1" type="jQueryObject">
    /// </field>
    /// <field name="_l$1" type="Number" integer="true">
    /// </field>
    /// <field name="_noblur$1" type="Boolean">
    /// </field>
    /// <field name="_t$1" type="Number" integer="true">
    /// </field>
    this.cloudItems = [];
    MagicWheel.GridCloud.initializeBase(this);
    MagicWheel.GridCloud._instance$1 = this;
    SudoNsb.PrefixFree.addStyleOnce((MagicWheel.GridCloud).get_fullName(), "\r\n#wsite-content { /* weebly */\r\n    position: relative !important;\r\n}\r\n#GridCloud {\r\n    position: relative;\r\n    top: 0px;\r\n    width: 100%;\r\n    height: 80px;\r\n    margin: 12px 0;\r\n    box-sizing: border-box;\r\n    background-color: rgba(255, 255, 255, 0.85);\r\n    background: radial-gradient(ellipse at center, rgba(254,255,255,1) 0%,rgba(221,241,249,0.12) 65%,rgba(61,167,251,0) 74%,rgba(25,151,251,0) 76%,rgba(255,0,0,0) 100%); /* W3C */\r\n    overflow: visible !important;\r\n}\r\n#GridCloud.borderCloud {\r\n    border: 3px solid white;\r\n    padding-bottom: 34px;\r\n    border-radius: 20px;\r\n    box-shadow:inset 1px -2px 71px #ffffff;\r\n}\r\n#GridCloudAsker {\r\n    position: absolute;\r\n    top: 30px;\r\n    width: 380px;\r\n    height: 1.5em;\r\n    margin-left: 5px;\r\n    box-sizing: border-box;\r\n    overflow: visible;\r\n    z-index: 2;\r\n}\r\n.GridCloudPrompt, #wsite-content p.GridCloudPrompt {\r\n    position: absolute;\r\n    top: 50%;\r\n    left: 320px;\r\n    margin: 0;\r\n    margin-top: -11px;\r\n    text-align: center;\r\n    font-family: arial;\r\n    font-size: 2em;\r\n    font-weight: bold;\r\n    color: rgba(0,0,0,.25) !important;\r\n    cursor: pointer;\r\n    z-index: 99;\r\n}\r\n#GridCloudBtns {\r\n    position: absolute;\r\n    top: 6px;\r\n    left: 6px;\r\n}\r\n.gridCloudBtn {\r\n    color: #FFF;\r\n    border: none;\r\n    opacity: 0.8;\r\n    border-radius: 5px;\r\n    font-size: .8em;\r\n    padding: 2px 7px;\r\n    margin: 0 2px;\r\n    background-color: #67A4C7;\r\n    z-index: 1;\r\n}\r\n#GridCloudInput {\r\n    position: absolute;\r\n    width: 100%;\r\n    height: 100%;\r\n    box-sizing: border-box;\r\n    margin: 0;\r\n    padding: 2px 6px;\r\n    font-size: 1em;\r\n    line-height: 1;\r\n    color: black;\r\n    background-color: white;\r\n    font-family: 'PT serif', serif;\r\n}\r\n#GridCloudAsker:after {\r\n    content: 'press enter when done';\r\n    display: block;\r\n    position: absolute;\r\n    margin: 0 0 0 50%;\r\n    padding: 0;\r\n    width: 60%;\r\n    height: 15px;\r\n    text-align: center;\r\n    bottom: -16px;\r\n    left: -30%;\r\n    color: rgba(0,0,0,.54);\r\n    background-color: rgba(255,255,255,.65);\r\n    font-size: 13px;\r\n    line-height: 12px;\r\n    z-index: 900;\r\n}\r\n.GridCloudItem {\r\n    position: absolute;\r\n    display: inline-block;\r\n    white-space: nowrap;\r\n    text-align: center;\r\n    font-family: 'PT serif', serif;\r\n    color: rgba(0,0,0,.49);\r\n    line-height: 1;\r\n    -webkit-stroke-width: 5.3px;\r\n    -webkit-stroke-color: #FFFFFF;\r\n    -webkit-fill-color: #FFFFFF;\r\n    text-shadow: 1px 0px 20px rgba(44, 237, 22, 0.9);\r\n    -webkit-transition: width 0.3s; /*Safari & Chrome*/\r\n    transition: width 0.3s;\r\n    -moz-transition: width 0.3s; /* Firefox 4 */\r\n    -o-transition: width 0.3s; /* Opera */\r\n}\r\n#GridCloudEraseBtn {\r\n    left: 5px;\r\n}\r\n#GridCloudPlusBtn {\r\n    left: 83px;\r\n}\r\n#CloudItemBubble {\r\n    position: absolute;\r\n    display: inline-block;\r\n    top: -24px;\r\n    right: 1px;\r\n    width: 30px;\r\n    height: 30px;\r\n    border: 3px solid white;\r\n    border-radius: 30px;\r\n    color: white;\r\n    background-color: rgb(255, 133, 0);\r\n    text-align: center;\r\n    line-height: 1.1;\r\n    font-size: 1.35em;\r\n    font-family: 'PT serif', serif;\r\n    font-weight: bold;\r\n}\r\n.ui-autocomplete.ui-menu .ui-menu-item {\r\n    padding: 0 1em 0 .4em;\r\n    line-height: 1;\r\n    font-family: 'PT serif', serif;\r\n}\r\n");
    this.die();
    var insertBefore = $('#TuWidget');
    if (insertBefore.length <= 0) {
        insertBefore = MagicWheel.Wheel.get_documentAnchor();
    }
    this.element = $("<div id='GridCloud'/>").on('click.gridcloud', ss.Delegate.create(this, this._ask$1));
    var ax = $('#GridCloudNode');
    if (ax.length > 0) {
        this.element.appendTo(ax);
    }
    else {
        ax = $('#GridCloudWhenFilled');
        if (ax.length > 0 && this.cloudItems.length > 0) {
            this.element.appendTo(ax);
        }
        else {
            this.element.insertBefore(insertBefore);
        }
    }
    this.toggleBorder((SudoNsb.Storage.getLocal('PnxGridCloudBorder') || true));
    this._myBody$1 = MagicWheel.Wheel.get_documentAnchor().closest('body');
    var btns = $("<div id='GridCloudBtns'/>").appendTo(this.element);
    SudoNsb.ToolTips.addTo($("<button id='GridCloudEraseBtn' class='gridCloudBtn unPopTip' title='manage my grids'>my grids</button>").appendTo(btns).on('click.gridcloud', ss.Delegate.create(this, this.doOnMyGrid)));
    SudoNsb.ToolTips.addTo($("<button id='GridCloudPlusBtn' class='gridCloudBtn' title='add one'>+</button>").appendTo(btns));
    this.element.hide();
    this._restoreItems$1();
}
MagicWheel.GridCloud.get_theGrid = function MagicWheel_GridCloud$get_theGrid() {
    /// <value type="MagicWheel.SavedGrid"></value>
    if (MagicWheel.GridCloud._instance$1 == null || (MagicWheel.GridCloud._instance$1.cloudItems == null | !MagicWheel.GridCloud._instance$1.cloudItems.length) === 1) {
        return null;
    }
    var gd = new MagicWheel.SavedGrid();
    gd.name = MagicWheel.GridCloud._instance$1.name;
    gd.items = MagicWheel.GridCloud._instance$1.cloudItems;
    return gd;
}
MagicWheel.GridCloud.set_theGrid = function MagicWheel_GridCloud$set_theGrid(value) {
    /// <value type="MagicWheel.SavedGrid"></value>
    if (value == null || MagicWheel.GridCloud._instance$1 == null) {
        return;
    }
    MagicWheel.GridCloud._instance$1.loadGrid(value);
    return value;
}
MagicWheel.GridCloud._widthAtFont$1 = function MagicWheel_GridCloud$_widthAtFont$1(item, fontWidth) {
    /// <param name="item" type="jQueryObject">
    /// </param>
    /// <param name="fontWidth" type="Number" integer="true">
    /// </param>
    /// <returns type="Number" integer="true"></returns>
    return item.width() / parseInt(item.css('font-size')) * fontWidth;
}
MagicWheel.GridCloud.popEdit = function MagicWheel_GridCloud$popEdit(tu, afterFn) {
    /// <param name="tu" type="TuneUp.TuWidget">
    /// </param>
    /// <param name="afterFn" type="Function">
    /// </param>
    Snsb.waitOn(function() {
        MagicWheel.GridCloud._instance$1.popEditInstance(tu, afterFn);
    }, function() {
        return MagicWheel.GridCloud._instance$1 != null;
    });
}
MagicWheel.GridCloud.prototype = {
    _myBody$1: null,
    name: null,
    _aboveTop$1: 76,
    _asker$1: null,
    _baseHeight$1: 100,
    _extraHeight$1: 100,
    _f$1: 0,
    _input$1: null,
    _l$1: 0,
    _noblur$1: false,
    _t$1: 0,
    
    get_slideOpenSpeed: function MagicWheel_GridCloud$get_slideOpenSpeed() {
        /// <value type="Number" integer="true"></value>
        return 300;
    },
    
    loadGrid: function MagicWheel_GridCloud$loadGrid(grid) {
        /// <param name="grid" type="MagicWheel.SavedGrid">
        /// </param>
        this.name = grid.name;
        this.installItems(grid.items);
        this.refresh();
    },
    
    _clickMsg$1: function MagicWheel_GridCloud$_clickMsg$1() {
        $('.GridCloudPrompt', this.element).remove();
        if (!this.cloudItems.length) {
            $("<p class='GridCloudPrompt'/>").html('click to fill in your grid cloud').appendTo(this.element);
        }
    },
    
    die: function MagicWheel_GridCloud$die() {
        $('#GridCloud', this._myBody$1).remove();
        if (this.element != null) {
            this.element.remove();
        }
        if (this._asker$1 != null) {
            if (this._input$1 != null) {
                this._input$1.remove();
            }
            this._asker$1.remove();
        }
        this._input$1 = this._asker$1 = this.element = null;
    },
    
    doOnMyGrid: function MagicWheel_GridCloud$doOnMyGrid(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        new MagicWheel.GridEditor(this, $(e.target));
        Snsb.cancelEvent(e);
        SudoNsb.Dom.unFocus();
    },
    
    doOnErase: function MagicWheel_GridCloud$doOnErase(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        $('.GridCloudItem, .GridCloudPrompt', this.element).remove();
        SudoNsb.Storage.removeSession('PnxGridCloud2');
        this.cloudItems.clear();
        this.name = null;
        this._clickMsg$1();
        Snsb.cancelEvent(e);
        this._adjustContainerHeight$1(this.cloudItems);
    },
    
    _restoreItems$1: function MagicWheel_GridCloud$_restoreItems$1() {
        Snsb.defer(ss.Delegate.create(this, function() {
            var sg = SudoNsb.Storage.getSession('PnxGridCloud2', true);
            if (sg != null) {
                this.name = sg.name;
                this.installItems(sg.items);
            }
            this.slideOpen();
        }), 500);
    },
    
    toggleBorder: function MagicWheel_GridCloud$toggleBorder(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        var isEvent = typeof(e) !== 'boolean';
        var ic = (isEvent) ? this.element.is('.borderCloud') : !e;
        if (ic) {
            this.element.removeClass('borderCloud');
            this._baseHeight$1 = 80;
            this._extraHeight$1 = 100;
            this._aboveTop$1 = 76;
            SudoNsb.Storage.setLocal('PnxGridCloudBorder', false);
        }
        else {
            this.element.addClass('borderCloud');
            this._baseHeight$1 = 150;
            this._extraHeight$1 = 0;
            this._aboveTop$1 = 0;
            SudoNsb.Storage.setLocal('PnxGridCloudBorder', true);
        }
        if (isEvent) {
            this.refresh();
        }
    },
    
    installItems: function MagicWheel_GridCloud$installItems(items) {
        /// <param name="items" type="Array">
        /// </param>
        items = $.extend([], items);
        this.cloudItems.clear();
        $('.GridCloudItem', this.element).remove();
        var $enum1 = ss.IEnumerator.getEnumerator(items);
        while ($enum1.moveNext()) {
            var item = $enum1.current;
            this.cloudItems.add(item);
        }
        this.tempSave();
    },
    
    _reshow$1: function MagicWheel_GridCloud$_reshow$1() {
        $('.GridCloudItem', this.element).remove();
        this._clickMsg$1();
        var $enum1 = ss.IEnumerator.getEnumerator(this.cloudItems);
        while ($enum1.moveNext()) {
            var item = $enum1.current;
            this._showItem$1(item);
        }
    },
    
    refresh: function MagicWheel_GridCloud$refresh() {
        this._adjustContainerHeight$1(this.cloudItems);
        this._reshow$1();
        this.tempSave();
    },
    
    _ask$1: function MagicWheel_GridCloud$_ask$1(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        if (this.element == null) {
            return;
        }
        if ($('#GridCloudAsker', this._myBody$1).length > 0) {
            return;
        }
        $('.GridCloudPrompt', this.element).remove();
        this._noblur$1 = false;
        this._asker$1 = $("<div id='GridCloudAsker'/>").appendTo(this.element);
        this._input$1 = $("<textarea id='GridCloudInput'/>").appendTo(this._asker$1);
        MagicWheel.Emotions.addToInput(this._input$1, MagicWheel.Emotions.desirable, { doneFn: ss.Delegate.create(this, this._doneAsking$1), onEscape: ss.Delegate.create(this, this._cancel$1), hintText: 'emotion, word, or phrase representing your grid' });
        $('.ui-autocomplete').addClass('AboveHider');
        SudoNsb.ToolTips.clearTips();
    },
    
    _doneAsking$1: function MagicWheel_GridCloud$_doneAsking$1(text) {
        /// <param name="text" type="String">
        /// </param>
        $('#GridCloudAsker', this._myBody$1).remove();
        this._noblur$1 = true;
        this._asker$1.fadeOut(250, ss.Delegate.create(this, function() {
            text = (text || '').trim();
            this._input$1.remove();
            this._asker$1.remove();
            this._asker$1 = this._input$1 = null;
            if (!String.isNullOrEmpty(text)) {
                $('.GridCloudPrompt', this.element).remove();
                this.cloudItems.add(text);
                this._adjustContainerHeight$1(this.cloudItems);
                this._showItem$1(text);
                this.tempSave();
            }
            $('.tokenInputDropdown').removeClass('AboveHider');
            this._ask$1();
        }));
    },
    
    _cancel$1: function MagicWheel_GridCloud$_cancel$1(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        Snsb.defer(ss.Delegate.create(this, function() {
            if (this._noblur$1) {
                return;
            }
            this._clickMsg$1();
            this._asker$1.fadeOut(250, ss.Delegate.create(this, function() {
                this._input$1.remove();
                this._asker$1.remove();
                this._asker$1 = this._input$1 = null;
            }));
        }));
    },
    
    tempSave: function MagicWheel_GridCloud$tempSave() {
        if (this.cloudItems.length > 0) {
            var sg = new MagicWheel.SavedGrid();
            sg.name = this.name;
            sg.items = this.cloudItems;
            SudoNsb.Storage.setSession('PnxGridCloud2', sg, true);
        }
        else {
            SudoNsb.Storage.removeSession('PnxGridCloud2');
        }
    },
    
    beforeSlideOpen: function MagicWheel_GridCloud$beforeSlideOpen(el) {
        /// <param name="el" type="jQueryObject">
        /// </param>
        this._clickMsg$1();
        this._adjustContainerHeight$1(this.cloudItems);
    },
    
    afterSlideOpen: function MagicWheel_GridCloud$afterSlideOpen(el) {
        /// <param name="el" type="jQueryObject">
        /// </param>
        Snsb.defer(ss.Delegate.create(this, this._reshow$1), 50);
    },
    
    _calcPosition$1: function MagicWheel_GridCloud$_calcPosition$1(item) {
        /// <param name="item" type="jQueryObject">
        /// </param>
        var wasOpen = this.tempOpen();
        var w = this.element.width();
        this._f$1 = Snsb.randomOf(28) + 10;
        this._t$1 = Snsb.randomOf(this.element.height() + this._extraHeight$1 - item.height()) - this._aboveTop$1;
        var rm = w - MagicWheel.GridCloud._widthAtFont$1(item, this._f$1);
        this._l$1 = Snsb.randomOf(rm) - 1;
        this.tempClose(wasOpen);
    },
    
    _adjustContainerHeight$1: function MagicWheel_GridCloud$_adjustContainerHeight$1(items) {
        /// <param name="items" type="Array">
        /// </param>
        var wasOpen = this.tempOpen();
        var cnt = 0;
        var $enum1 = ss.IEnumerator.getEnumerator(items);
        while ($enum1.moveNext()) {
            var s = $enum1.current;
            cnt += s.length;
        }
        Inform.debug('GridCloud ShowItem char count = {0}', cnt);
        var ht = Math.max(this._baseHeight$1, parseInt(cnt * 0.65));
        this.element.height(ht);
        this.tempClose(wasOpen);
    },
    
    _showItem$1: function MagicWheel_GridCloud$_showItem$1(text) {
        /// <param name="text" type="String">
        /// </param>
        if (Snsb.isEmpty(text)) {
            return;
        }
        var item = $("<div class='GridCloudItem'/>").html(text).appendTo(this.element);
        item.hide();
        this._animate$1(item);
    },
    
    _animate$1: function MagicWheel_GridCloud$_animate$1(item) {
        /// <param name="item" type="jQueryObject">
        /// </param>
        var fadeOut = (item.is(':visible')) ? 1700 : 1;
        this._calcPosition$1(item);
        var l = this._l$1;
        var t = this._t$1;
        var f = this._f$1;
        SudoNsb.CssTransition.fadeOut(item, fadeOut, ss.Delegate.create(this, function() {
            this._calcPosition$1(item);
            this._wrap$1(item, Math.max(f, this._f$1));
            var glow = ['rgba(255, 0, 0, 0.9)', 'rgba(0, 255, 0, 0.9)', 'rgba(0, 0, 255, 0.9)', 'rgba(255, 255, 0, 0.9)', 'rgba(0, 255, 255, 0.9)', 'rgba(255, 0, 255, 0.9)', 'rgba(255, 255, 255, 0.9)'][Snsb.randomOf(6) - 1];
            item.css({ 'text-shadow': '1px 0px 20px ' + glow, top: this._t$1, left: this._l$1, 'font-size': this._f$1 });
            SudoNsb.CssTransition.fadeIn(item.hide(), 1700, ss.Delegate.create(this, function() {
                SudoNsb.CssTransition.animate(item, { 'font-size': f, left: l, top: t }, { duration: Snsb.randomOf(5000) + 17500, easing: 'easeOutCubic', complete: ss.Delegate.create(this, function() {
                    this._reanimate$1(item);
                }) });
            }));
        }));
    },
    
    _wrap$1: function MagicWheel_GridCloud$_wrap$1(item, fontSize) {
        /// <param name="item" type="jQueryObject">
        /// </param>
        /// <param name="fontSize" type="Number" integer="true">
        /// </param>
        var w2 = this.element.width();
        var w1 = MagicWheel.GridCloud._widthAtFont$1(item, fontSize);
        if (w1 > w2 * 0.88) {
            var tx = item.text();
            var p = tx.length * 5 / 8;
            while (tx.charAt(p) !== ' ' && p > 0) {
                p--;
            }
            if (p > 0) {
                tx = tx.substring(0, p) + '<br/>' + tx.substr(p + 1);
                item.html(tx);
            }
        }
    },
    
    _reanimate$1: function MagicWheel_GridCloud$_reanimate$1(el) {
        /// <param name="el" type="jQueryObject">
        /// </param>
        this._animate$1(el);
    },
    
    popEditInstance: function MagicWheel_GridCloud$popEditInstance(tu, afterFn) {
        /// <param name="tu" type="TuneUp.TuWidget">
        /// </param>
        /// <param name="afterFn" type="Function">
        /// </param>
        Snsb.defer(ss.Delegate.create(this, function() {
            var step = tu.data.get_currentStep();
            if (step.visitCount <= 1) {
                this.doOnErase();
            }
            $('#WheelLoadingMsg').remove();
            this.element.addClass('AboveHider');
            $('#TuWidget').addClass('AboveHider');
            var cnt = 0;
            var bblFn = ss.Delegate.create(this, function() {
                var itms = this.cloudItems.length;
                if (itms !== cnt) {
                    cnt = itms;
                    var bbl = $('#CloudItemBubble');
                    if (!bbl.length) {
                        bbl = $("<span id='CloudItemBubble'/>").appendTo(this.element);
                    }
                    bbl.html(itms.toString());
                }
            });
            window.setInterval(bblFn, 100);
            Snsb.waitOn(function() {
                bblFn();
                tu.stepDone();
                if (afterFn != null) {
                    afterFn();
                }
            }, ss.Delegate.create(this, function() {
                return this.cloudItems.length >= 5;
            }), -1);
            Surface.hider(true);
        }));
    }
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.SavedGrid

MagicWheel.SavedGrid = function MagicWheel_SavedGrid() {
    /// <field name="items" type="Array">
    /// </field>
    /// <field name="name" type="String">
    /// </field>
}
MagicWheel.SavedGrid.prototype = {
    items: null,
    name: null
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.GridEditor

MagicWheel.GridEditor = function MagicWheel_GridEditor(target, initiatingBtn) {
    /// <param name="target" type="Object">
    /// </param>
    /// <param name="initiatingBtn" type="jQueryObject">
    /// </param>
    /// <field name="_css$1" type="String" static="true">
    /// </field>
    /// <field name="myTopic" type="String" static="true">
    /// </field>
    /// <field name="_cloud$1" type="MagicWheel.GridCloud">
    /// </field>
    /// <field name="_ulGrids$1" type="jQueryObject">
    /// </field>
    /// <field name="_ulItems$1" type="jQueryObject">
    /// </field>
    /// <field name="_grids$1" type="MagicWheel.SavedGrids">
    /// </field>
    MagicWheel.GridEditor.initializeBase(this, [ initiatingBtn, { left: 5, width: 500, height: 500 } ]);
    SudoNsb.PrefixFree.addStyleOnce((MagicWheel.GridEditor).get_fullName(), "\r\n.gridCloudEditor {\r\n    padding-top: 45px;\r\n}\r\n.gridCloudEditor .title {\r\n    position: absolute;\r\n    top: 3px;\r\n    width: 100%;\r\n    text-align: center;\r\n    margin: 0;\r\n    padding: 0;\r\n    color: rgba(255, 255, 255, .85);\r\n    background-color: transparent;\r\n    font-family: arial;\r\n}\r\n.gridCloudEditor .button.weebly {\r\n    position: relative;\r\n    display: block;\r\n    margin: 8px 0 8px 100px;\r\n    width: 120px;\r\n    padding: 3px 8px;\r\n}\r\n.gridCloudEditor .list {\r\n    position: relative;\r\n    display: block;\r\n    margin: 8px 0 8px 100px;\r\n}\r\n.gridCloudEditor .label {\r\n    font-family: arial;\r\n    font-size: 1em;\r\n    color: rgba(255, 255, 255, .5);\r\n    white-space: nowrap;\r\n}\r\n.gridCloudEditor .disabled {\r\n    opacity: .8;\r\n    color: rgba(255, 255, 255, .65);\r\n    background-color: rgba(255, 255, 255, .35);\r\n}\r\n.gridCloudEditor .disabled:hover {\r\n    opacity: .8;\r\n    color: rgba(255, 255, 255, .355);\r\n    background-color: rgba(255, 255, 255, .35);\r\n}\r\n.gridListBox {\r\n    width: 330px;\r\n    height: 150px;\r\n    background-color: transparent;\r\n}\r\n.gridListBox ul {\r\n    height: 132px;\r\n    margin: 0;\r\n    padding: 0;\r\n    overflow-y: auto;\r\n    overflow-x: hidden;\r\n}\r\n.gridListBox li {\r\n    padding: 0;\r\n    margin: 0;\r\n    height: 14px;\r\n    color: rgba(255, 255, 255, .5);\r\n    cursor: default;\r\n    font-family: arial;\r\n    overflow: hidden;\r\n    white-space: nowrap;\r\n    line-height: 1;\r\n    font-size: 1em;\r\n}\r\n.gridListBox li span {\r\n    display: inline-block;\r\n    overflow: hidden;\r\n    margin: 0;\r\n    padding: 0;\r\n    white-space: nowrap;\r\n}\r\n.gridListBox li span.text {\r\n    left: 5px;\r\n    width: 94%;\r\n}\r\n.gridListBox li:hover {\r\n    color: rgba(255, 255, 255, .75);\r\n}\r\n.gridListBox li .count {\r\n    position: relative;\r\n    display: inline-block;\r\n    top: -1px;\r\n    line-height: 1;\r\n    background: rgba(255, 0, 0, 0.78);\r\n    border-radius: 12px;\r\n    color: #FFF;\r\n    font-size: 11px;\r\n    margin: 1px 0 0 5px;\r\n    padding: 0 3px 0 2px;\r\n}\r\n.gridListBox .gridDeletor {\r\n    position: relative;\r\n    top: 1px;\r\n    color: rgba(240, 181, 181, 0.91);\r\n    padding: 0 0 0 1px;\r\n    float: right;\r\n    text-decoration: none;\r\n    font-weight: bold;\r\n    font-size: .7em;\r\n    font-family: 'times new roman';\r\n    border: 1px solid transparent;\r\n    line-height: 1;\r\n}\r\n.gridListBox .gridDeletor:hover {\r\n    color: rgba(240, 181, 181, 1);\r\n    border: 1px solid rgba(255, 255, 255, 0.61);\r\n    border-radius: 12px;\r\n    cursor: default;\r\n}\r\ndiv.gridEditDragItem {\r\n    display: inline-block;\r\n    padding: 0;\r\n    margin: 0;\r\n    height: 14px;\r\n    color: rgba(255, 255, 255, .8);\r\n    background-color: rgba(255, 255, 255, 0.21);\r\n    font-family: arial;\r\n    overflow: hidden;\r\n    white-space: nowrap;\r\n    line-height: 1;\r\n    font-size: 1em;\r\n}\r\n#CurrentGrid li {\r\n    background-color: rgba(255, 255, 255, 0.21);\r\n    border-radius: 3px;\r\n    padding: 0 5px 0 8px;\r\n    margin: 1px 0;\r\n}\r\n#CurrentGrid li:hover {\r\n    background-color: rgba(255, 255, 255, 0.31);\r\n}\r\n#LoadGrid li {\r\n    background-color: rgba(70, 160, 70, 0.5);\r\n    border-radius: 3px;\r\n    padding: 0 5px 0 8px;\r\n    margin: 1px 0;\r\n}\r\n#LoadGrid li.selected {\r\n    background-color: rgba(160, 160, 70, 0.5);\r\n}\r\n#LoadGrid li:hover {\r\n    background-color: rgba(70, 160, 70, 0.65);\r\n}\r\n#LoadGrid li.selected:hover {\r\n    background-color: rgba(160, 160, 70, 0.65);\r\n}\r\n#LoadGrid li.dragover {\r\n    background-color: rgba(70, 70, 160, 0.65);\r\n}\r\n.gridCloudEditor #Anonymous {\r\n    position: absolute;\r\n    bottom: 3px;\r\n    margin: 0 20px;\r\n    color: rgba(255, 194, 0, 0.84);\r\n    font-style: italic;\r\n    font-family: 'times new roman';\r\n    text-align: center;\r\n}\r\n");
    this._cloud$1 = target;
    this.element.addClass('gridCloudEditor');
    $('.myPopOpenerClone', this.element).hide();
    $("<h3 class='title'>my grids</h3>").appendTo(this.element);
    if (this.get_uid() === 'anonymous') {
        $("<div id='Anonymous'/>").appendTo(this.element).html('because you are not singned in - any grids you save will be shared with other anonymous users of this browser');
    }
    $("<button id='EraseCloud' class='button weebly'>clear this cloud</button>").appendTo(this.element).on('click.gce', ss.Delegate.create(this, this._doEraseCloud$1));
    $("<button id='SaveGrid' class='button weebly'>save this cloud</button>").appendTo(this.element).on('click.gce', ss.Delegate.create(this, this._doSaveGrid$1));
    if (!this._cloud$1.cloudItems.length) {
        $('#SaveGrid, #EraseCloud', this.element).addClass('disabled').attr('disabled', 'disabled');
    }
    new MagicWheel.MyPopBtn({ host: this.element, face: 'cloud border', position: { my: 'right top', at: 'right-40 top+20', of: this.element }, click: ss.Delegate.create(this._cloud$1, this._cloud$1.toggleBorder) });
    var cgw = $("<div id='CurrentGrid' class='list gridListBox'/>").appendTo(this.element);
    $("<label class='label items'/>").appendTo(cgw);
    this._ulItems$1 = $('<ul/>').appendTo(cgw);
    this._fillGridItems$1(this._ulItems$1);
    var lgc = $("<div id='LoadGrid' class='list gridListBox'/>").appendTo(this.element);
    $("<label class='label'>saved grids</label>").appendTo(lgc);
    this._ulGrids$1 = $('<ul/>').appendTo(lgc);
    this.loadGridsAw(SudoNsb.Await.get_asyncAw());
}
MagicWheel.GridEditor.prototype = {
    _cloud$1: null,
    _ulGrids$1: null,
    _ulItems$1: null,
    _grids$1: null,
    
    get_uid: function MagicWheel_GridEditor$get_uid() {
        /// <value type="String"></value>
        return (Snsb.get_isPxUser()) ? Snsb.get_masterId() : (FbApi.get_id() || 'anonymous');
    },
    
    _jq$1: function MagicWheel_GridEditor$_jq$1(el) {
        /// <param name="el" type="jQueryObject">
        /// </param>
        /// <returns type="jQueryObject"></returns>
        return (el[0].ownerDocument.defaultView || el[0].ownerDocument.parentWindow).jQuery(el[0]);
    },
    
    _fillGridItems$1: function MagicWheel_GridEditor$_fillGridItems$1(ul) {
        /// <param name="ul" type="jQueryObject">
        /// </param>
        ul.empty();
        $('label.items', ul.parent()).html(String.format("<label class='label'>items in current grid \"{0}\"</label>", this._cloud$1.name || '(unnamed)'));
        var $enum1 = ss.IEnumerator.getEnumerator(this._cloud$1.cloudItems);
        while ($enum1.moveNext()) {
            var s = $enum1.current;
            var li = $("<li title='" + s.replaceAll("'", '') + "'/>").appendTo(ul).html($("<span class='text'/>").html(s));
            $("<a href='javascript:;' class='gridDeletor' title='delete this item'>\u2715</a>").prependTo(li).on('click.gce', this._cxDeleteItem$1(s));
            (Snsb.jqTop(li)).draggable({ appendTo: this.element, containment: this.element, helper: this._cxDragItem$1(li, s) });
        }
    },
    
    _fillGridsList$1: function MagicWheel_GridEditor$_fillGridsList$1(ul) {
        /// <param name="ul" type="jQueryObject">
        /// </param>
        ul.empty();
        var $dict1 = this._grids$1.grids;
        for (var $key2 in $dict1) {
            var p = { key: $key2, value: $dict1[$key2] };
            var li = $("<li title='load this grid'/>").appendTo(ul).html($("<span class='text'/>").html(p.key).append("<span class='count'>" + p.value.items.length + '</span>')).on('click.gce', this._cxLoadGrid$1(p.key)).data('name', p.key);
            $("<a href='javascript:;' class='gridDeletor' title='delete this grid'>\u2715</a>").prependTo(li).on('click.gce', this._cxDeleteGrid$1(p.key));
            if (p.key === this._cloud$1.name) {
                li.addClass('selected');
            }
            (Snsb.jqTop(li)).droppable({ hoverClass: 'dragover', drop: ss.Delegate.create(this, this._onDrop$1) });
        }
    },
    
    _cxLoadGrid$1: function MagicWheel_GridEditor$_cxLoadGrid$1(n) {
        /// <param name="n" type="String">
        /// </param>
        /// <returns type="Function"></returns>
        return ss.Delegate.create(this, function(e) {
            Snsb.cancelEvent(e);
            this._doLoadGrid$1(n);
        });
    },
    
    _cxDeleteGrid$1: function MagicWheel_GridEditor$_cxDeleteGrid$1(n) {
        /// <param name="n" type="String">
        /// </param>
        /// <returns type="Function"></returns>
        return ss.Delegate.create(this, function(e) {
            Snsb.cancelEvent(e);
            new MagicWheel.AskDelete($(e.target), this.element, ss.Delegate.create(this, function() {
                this._doDeleteGrid$1(n);
            }));
        });
    },
    
    _cxDeleteItem$1: function MagicWheel_GridEditor$_cxDeleteItem$1(n) {
        /// <param name="n" type="String">
        /// </param>
        /// <returns type="Function"></returns>
        return ss.Delegate.create(this, function(e) {
            Snsb.cancelEvent(e);
            new MagicWheel.AskDelete($(e.target), this.element, ss.Delegate.create(this, function() {
                this._cloud$1.cloudItems.remove(n);
                this._cloud$1.refresh();
                this._fillGridItems$1($('#CurrentGrid ul', this.myBody));
                if (!String.isNullOrEmpty(this._cloud$1.name)) {
                    this._saveGrid$1();
                }
            }));
        });
    },
    
    _cxDragItem$1: function MagicWheel_GridEditor$_cxDragItem$1(li, n) {
        /// <param name="li" type="jQueryObject">
        /// </param>
        /// <param name="n" type="String">
        /// </param>
        /// <returns type="System.Func`1"></returns>
        return function() {
            return $("<div class='gridEditDragItem'/>").html(n).css({ width: li.width() });
        };
    },
    
    _onDrop$1: function MagicWheel_GridEditor$_onDrop$1(e, ui) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        /// <param name="ui" type="Object">
        /// </param>
        var key = $(e.target).data('name');
        if (key != null) {
            var s = ui.draggable.find('span.text').text();
            Inform.debug("dropped : adding '{0}' to '{1}'", s, key);
            if (!this._grids$1.grids[key].items.contains(s)) {
                this._grids$1.grids[key].items.add(s);
            }
            this._saveAllGrids$1();
            this._fillGridsList$1(this._ulGrids$1);
        }
    },
    
    _doEraseCloud$1: function MagicWheel_GridEditor$_doEraseCloud$1(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        this.close();
        this._cloud$1.doOnErase(e);
    },
    
    _saveGrid$1: function MagicWheel_GridEditor$_saveGrid$1() {
        /// <returns type="Boolean"></returns>
        var name = this._cloud$1.name || prompt('Name for this grid?');
        if (!String.isNullOrEmpty(name)) {
            var gd = new MagicWheel.SavedGrid();
            gd.name = name;
            gd.items = this._cloud$1.cloudItems;
            this._grids$1.grids[name] = gd;
            this._grids$1.uid = this._grids$1.uid || this.get_uid();
            SqlStorage.saveTopic('/PnxTools/Grids', this._grids$1);
            this._cloud$1.name = name;
            this._cloud$1.tempSave();
            return true;
        }
        return false;
    },
    
    loadGridsAw: function MagicWheel_GridEditor$loadGridsAw(awp) {
        /// <param name="awp" type="SudoNsb.Await">
        /// </param>
        new SudoNsb.Await().addAw(SqlStorage.loadTopicAw, '/PnxTools/Grids', MagicWheel.SavedGrids).addDx(ss.Delegate.create(this, function(aw) {
            this._grids$1 = aw.get_result();
            this._fillGridItems$1(this._ulItems$1);
            this._fillGridsList$1(this._ulGrids$1);
        })).commit(awp);
    },
    
    _saveAllGrids$1: function MagicWheel_GridEditor$_saveAllGrids$1() {
        SqlStorage.saveTopic('/PnxTools/Grids', this._grids$1);
    },
    
    _doSaveGrid$1: function MagicWheel_GridEditor$_doSaveGrid$1(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        if (this._saveGrid$1()) {
            this.close();
        }
    },
    
    _doLoadGrid$1: function MagicWheel_GridEditor$_doLoadGrid$1(key) {
        /// <param name="key" type="String">
        /// </param>
        if (Object.keyExists(this._grids$1.grids, key)) {
            this._cloud$1.installItems(this._grids$1.grids[key].items);
            this._cloud$1.refresh();
            this._cloud$1.name = key;
            this._cloud$1.tempSave();
        }
        else {
            debugger;
        }
    },
    
    _doDeleteGrid$1: function MagicWheel_GridEditor$_doDeleteGrid$1(key) {
        /// <param name="key" type="String">
        /// </param>
        if (Object.keyExists(this._grids$1.grids, key)) {
            delete this._grids$1.grids[key];
            this._saveAllGrids$1();
            this._fillGridsList$1($('#LoadGrid ul', this.myBody));
            if (this._cloud$1.name === key) {
                this._cloud$1.doOnErase();
            }
        }
        else {
            debugger;
        }
    }
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.SavedGrids

MagicWheel.SavedGrids = function MagicWheel_SavedGrids() {
    /// <field name="grids" type="Object">
    /// </field>
    /// <field name="uid" type="String">
    /// </field>
    this.grids = {};
}
MagicWheel.SavedGrids.prototype = {
    uid: null
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.MyPop

MagicWheel.MyPop = function MagicWheel_MyPop(initiatingBtn, options) {
    /// <param name="initiatingBtn" type="jQueryObject">
    /// </param>
    /// <param name="options" type="Object">
    /// </param>
    /// <field name="_css" type="String" static="true">
    /// </field>
    /// <field name="instance" type="MagicWheel.MyPop" static="true">
    /// </field>
    /// <field name="myBody" type="jQueryObject">
    /// </field>
    /// <field name="element" type="jQueryObject">
    /// </field>
    /// <field name="initiatingBtn" type="jQueryObject">
    /// </field>
    /// <field name="h" type="Number" integer="true">
    /// </field>
    /// <field name="l" type="Number" integer="true">
    /// </field>
    /// <field name="t" type="Number" integer="true">
    /// </field>
    /// <field name="w" type="Number" integer="true">
    /// </field>
    /// <field name="_leftOffset" type="Number" integer="true">
    /// </field>
    /// <field name="_aboveHiders" type="jQueryObject">
    /// </field>
    SudoNsb.PrefixFree.addStyleOnce((MagicWheel.MyPop).get_fullName(), '\r\n#MyPopEditor {\r\n    position: absolute; \r\n    background-color: rgba(0, 0, 0, .75);\r\n    border: 3px solid rgba(0, 0, 0, 1);\r\n    box-sizing: border-box;\r\n}\r\n#MyPopEditor .closer {\r\n    position: absolute;\r\n    top: 0;\r\n    right: 0;\r\n    padding: 3px 5px;\r\n    color: rgba(255,255,255,.55);\r\n    font-family: arial;\r\n    font-size: 14px;\r\n    line-height: 1;\r\n    text-decoration: none;\r\n    z-index: 1;\r\n}\r\n#MyPopEditor .closer:active, #MyPopEditor .closer:visited {\r\n    color: rgba(255,255,255,.55);\r\n}\r\n');
    if (MagicWheel.MyPop.instance != null) {
        this.close();
        return;
    }
    this._leftOffset = options['left'];
    this.w = options['width'];
    this.h = options['height'];
    this.myBody = $(initiatingBtn[0].ownerDocument.body);
    Surface.hider(true, 0.25, '#000', this.myBody).off('.swallowed').on('click.MyPop', ss.Delegate.create(this, this.close));
    this.initiatingBtn = initiatingBtn;
    MagicWheel.MyPop.instance = this;
    Snsb.defer(SudoNsb.ToolTips.clearTips);
    this._aboveHiders = $('.AboveHider').removeClass('AboveHider');
    this.element = $("<div id='MyPopEditor' class='AboveHider'/>").appendTo(this.myBody);
    var p = initiatingBtn.offset();
    this.t = p.top - 8;
    this.l = p.left - this._leftOffset;
    this.element.css({ top: this.t, left: this.l, width: this.w, height: this.h });
    $("<a href='javascript:;' class='closer' title='close'>\u2715</a>").appendTo(this.element).on('click.gce', ss.Delegate.create(this, this.close));
    var p1 = this.initiatingBtn.offset();
    var p2 = this.element.offset();
    var btnPop = this.initiatingBtn.clone(true, true).appendTo(this.element).on('click.gce', ss.Delegate.create(this, this.close)).addClass('myPopOpenerClone').css({ top: p1.top - p2.top - parseInt(this.element.css('border-top-width')), left: p1.left - p2.left - parseInt(this.element.css('border-left-width')) });
    $('.unPopTip', btnPop).off('.tooltip');
}
MagicWheel.MyPop.prototype = {
    myBody: null,
    element: null,
    initiatingBtn: null,
    h: 0,
    l: 0,
    t: 0,
    w: 0,
    _leftOffset: 8,
    _aboveHiders: null,
    
    close: function MagicWheel_MyPop$close(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        if (MagicWheel.MyPop.instance != null) {
            MagicWheel.MyPop.instance.element.remove();
            MagicWheel.MyPop.instance.initiatingBtn.removeClass('AboveHider');
            MagicWheel.MyPop.instance = null;
            this.element = null;
        }
        Surface.hider(false, 0.25, '#000', this.myBody).off('.MyPop');
        this._aboveHiders.addClass('AboveHider');
    },
    
    doNothing: function MagicWheel_MyPop$doNothing(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        Snsb.cancelEvent(e);
        SudoNsb.Dom.unFocus();
    }
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.MyPopBtn

MagicWheel.MyPopBtn = function MagicWheel_MyPopBtn(options) {
    /// <param name="options" type="Object">
    /// </param>
    /// <field name="element" type="jQueryObject">
    /// </field>
    /// <field name="button" type="jQueryObject">
    /// </field>
    this.element = $("<div class='myPopBtn' style='position: absolute'/>");
    this.button = $('<button/>').button().appendTo(this.element);
    this.button.html(options.face);
    this.element.appendTo(options.host);
    if (options.position != null) {
        this.element.position(options.position);
    }
    if (options.click != null) {
        this.button.on('click.mpbtn', options.click);
    }
}
MagicWheel.MyPopBtn.prototype = {
    element: null,
    button: null
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.ReSpoke

MagicWheel.ReSpoke = function MagicWheel_ReSpoke() {
    /// <field name="_css" type="String" static="true">
    /// </field>
    /// <field name="_widget" type="jQueryObject" static="true">
    /// </field>
}
MagicWheel.ReSpoke.addWidget = function MagicWheel_ReSpoke$addWidget() {
    var wg = MagicWheel.ReSpoke.widget();
    if (wg.length > 0) {
        SudoNsb.PrefixFree.addStyleOnce((MagicWheel.ReSpoke).get_fullName(), '\r\n#SegWidget {\r\n    position: absolute;\r\n    top: -32px;\r\n    left: 539px;\r\n    font-size: .9em;\r\n    z-index: 1;\r\n}\r\n');
        wg.appendTo(MagicWheel.Wheel.instance.fwOuterEl);
    }
}
MagicWheel.ReSpoke.remWidget = function MagicWheel_ReSpoke$remWidget() {
    if (MagicWheel.ReSpoke._widget != null) {
        MagicWheel.ReSpoke._widget.remove();
        MagicWheel.ReSpoke._widget = null;
    }
}
MagicWheel.ReSpoke.widget = function MagicWheel_ReSpoke$widget() {
    /// <returns type="jQueryObject"></returns>
    MagicWheel.ReSpoke._widget = $(null);
    var wd = MagicWheel.Wheel.instance.wp;
    if (wd.minSegs > 0 || wd.maxSegs > 0) {
        MagicWheel.ReSpoke._widget = $("<select id='SegWidget' title='change the number of item spokes in the wheel'/>").change(MagicWheel.ReSpoke.reWheel).append("<option name='label' value='0'>spokes</option>");
        for (var i = wd.minSegs; i <= wd.maxSegs; i++) {
            $('<option/>').appendTo(MagicWheel.ReSpoke._widget).attr('name', i.toString()).attr('value', i.toString()).html(i.toString());
        }
    }
    return MagicWheel.ReSpoke._widget;
}
MagicWheel.ReSpoke.reWheel = function MagicWheel_ReSpoke$reWheel(e) {
    /// <param name="e" type="jQueryEvent">
    /// </param>
    var wd = MagicWheel.Wheel.instance.wp;
    var segs = parseInt(MagicWheel.ReSpoke._widget.val().trim());
    MagicWheel.ReSpoke.setSpokes(segs);
}
MagicWheel.ReSpoke.setSpokes = function MagicWheel_ReSpoke$setSpokes(spokes) {
    /// <param name="spokes" type="Number" integer="true">
    /// </param>
    if (spokes > 2) {
        MagicWheel.Wheel.reloadWheel(MagicWheel.Input.data, spokes);
    }
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.WheelExport

MagicWheel.WheelExport = function MagicWheel_WheelExport() {
}
MagicWheel.WheelExport.deepUrl = function MagicWheel_WheelExport$deepUrl(url, window) {
    /// <param name="url" type="String">
    /// </param>
    /// <param name="window" type="WindowInstance">
    /// </param>
    /// <returns type="String"></returns>
    return url;
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.FocusWheel

MagicWheel.FocusWheel = function MagicWheel_FocusWheel() {
    MagicWheel.FocusWheel.initializeBase(this);
    this.pad = 8;
    this.square = 700;
    this.innerRadius = 80;
    this.segs = 12;
    this.pxMax = 52;
    this.slicePadding = 3;
    this.yattaDuration = 136000;
    this.yattaStopDeg = 360;
    this.doFireworks = true;
    this.clickHere = 'Click here to start';
    this.prompts = { were: 'What are you noticing right now that you want to change?', yatta: 'Where do you want to be right now on this subject?', first: 'What is something that is positive, general, and you know is true about where you are on this subject right now?', second: 'What else is true and you do not hesitate at all to say it?', third: 'What else is true?', fourth: 'What else is true?' };
    this.overrides();
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.UrTenWheel

MagicWheel.UrTenWheel = function MagicWheel_UrTenWheel() {
    /// <field name="_listDone$1" type="Boolean">
    /// </field>
    MagicWheel.UrTenWheel.initializeBase(this);
    this.pad = 8;
    this.square = 700;
    this.innerRadius = 90;
    this.segs = 10;
    this.minSegs = 3;
    this.maxSegs = 14;
    this.slicePadding = 4;
    this.pxMax = 52;
    this.yattaDuration = 136000;
    this.yattaStopDeg = 360;
    this.doFireworks = true;
    this.clickHere = 'Click to express gratitude now';
    this.onCenterClick = ss.Delegate.create(this, this.doOnCenterClick);
    this.onReWheel = ss.Delegate.create(this, this.doOnReWheel);
    this.prompts = { were: '', yatta: 'What is the subject of your grattitude? Is it a person place thing or emotion? To be unlimited simply type "love".', first: 'What are you grateful for?', second: 'What else are you grateful for?', third: 'What else are you grateful for?', fourth: 'What else are you grateful for?' };
    this.overrides();
}
MagicWheel.UrTenWheel.prototype = {
    _listDone$1: false,
    
    doOnCenterClick: function MagicWheel_UrTenWheel$doOnCenterClick() {
        this._listDone$1 = MagicWheel.Wheel.instance.slices[0].get_isAllFilled();
        MagicWheel.Input.data.were = ' ';
        MagicWheel.Wheel.instance.slices[0].editCenter();
    },
    
    doOnReWheel: function MagicWheel_UrTenWheel$doOnReWheel() {
        Snsb.defer(MagicWheel.Input.editNext);
    }
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.YesWheel

MagicWheel.YesWheel = function MagicWheel_YesWheel() {
    /// <field name="_currentSequence$1" type="Number" integer="true">
    /// </field>
    /// <field name="_listDone$1" type="Boolean">
    /// </field>
    /// <field name="_reloaded$1" type="Boolean">
    /// </field>
    /// <field name="_seg$1" type="Number" integer="true">
    /// </field>
    MagicWheel.YesWheel.initializeBase(this);
    this.pad = 8;
    this.square = 700;
    this.innerRadius = 140;
    this.initialRotation = 90;
    this.segs = 5;
    this.minSegs = 3;
    this.maxSegs = 10;
    this.pxMax = 52;
    this.slicePadding = 6;
    this.yattaDuration = 136000;
    this.yattaStopDeg = 360;
    this.yattaDim = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.skipWere = true;
    this.skipYatta = true;
    this.doFireworks = false;
    this.clickHere = 'Click here to find your HIGHEST YES';
    this.onCenterClick = ss.Delegate.create(this, this.doOnCenterClick);
    this.onHeartClick = ss.Delegate.create(this, this.doOnHeartClick);
    this.onPieClick = ss.Delegate.create(this, this.doOnPieClick);
    this.onReload = ss.Delegate.create(this, this.doOnReload);
    this.onYatta = ss.Delegate.create(this, this.doOnYatta);
    this.onReWheel = ss.Delegate.create(this, this.doOnReWheel);
    this.onBlur = ss.Delegate.create(this, this.doOnBlur);
    this.prompts = { were: '', yatta: '', first: "What sounds or feels really exciting to do right now? Don't be shy. What do you really want to do that you can do right now?\r\nThink only of what you can and want to do, not what you think you should do.", second: 'What is another thing you can do right now?' };
    this.overrides();
}
MagicWheel.YesWheel.prototype = {
    _currentSequence$1: 0,
    _listDone$1: false,
    _reloaded$1: false,
    _seg$1: 0,
    
    doOnCenterClick: function MagicWheel_YesWheel$doOnCenterClick() {
        this._listDone$1 = MagicWheel.Wheel.instance.slices[0].get_isAllFilled();
        MagicWheel.Input.data.were = ' ';
        if (!this._listDone$1) {
            MagicWheel.Input.data.yatta = ' ';
            MagicWheel.Wheel.instance.drawCenter(MagicWheel.Input.data.yatta);
            MagicWheel.Wheel.instance.slices[0].edit();
            return;
        }
        this.doOnYatta();
    },
    
    doOnHeartClick: function MagicWheel_YesWheel$doOnHeartClick(seg) {
        /// <param name="seg" type="Number" integer="true">
        /// </param>
        MagicWheel.Wheel.instance.set_cursorIsShown(false);
        this._seg$1 = this._currentSequence$1;
        if (seg < this._seg$1) {
            return;
        }
        var list = MagicWheel.Input.data.segs;
        var sg = list[seg];
        list.removeAt(seg);
        list.insert(this._currentSequence$1++, sg);
        MagicWheel.Wheel.instance.redrawWheel(ss.Delegate.create(this, function() {
            MagicWheel.Wheel.instance.balloons.hilite(this._seg$1);
            MagicWheel.Input.data.yatta = "Now click the next brightest thing. <br><font size='-1'>(click here to restart)</font>";
            MagicWheel.Wheel.instance.drawCenter(MagicWheel.Input.data.yatta);
            if (this._currentSequence$1 + 1 === this.segs) {
                MagicWheel.Wheel.instance.eraseCursor();
                this.doOnFinish();
            }
            else {
                Snsb.defer(ss.Delegate.create(this, function() {
                    MagicWheel.Wheel.instance.drawCursorSlice(MagicWheel.Wheel.instance.cursorSegToDeg(0), MagicWheel.Wheel.instance.cursorSegToDeg(this._currentSequence$1), MagicWheel.AppStyle.doneColorKey);
                }), 50);
            }
        }));
    },
    
    doOnPieClick: function MagicWheel_YesWheel$doOnPieClick(seg) {
        /// <param name="seg" type="Number" integer="true">
        /// </param>
        if (MagicWheel.Wheel.instance.slices[0].get_isAllFilled()) {
            this.doOnHeartClick(seg);
        }
        else {
            MagicWheel.Wheel.instance.slices[seg].edit();
        }
    },
    
    doOnReload: function MagicWheel_YesWheel$doOnReload() {
        if (this._reloaded$1) {
            return;
        }
        this._reloaded$1 = true;
        for (var i = 0; i < MagicWheel.Wheel.instance.wp.segs - 1; i++) {
            MagicWheel.Wheel.instance.balloons.hilite(i);
        }
        this.doOnFinish();
    },
    
    doOnYatta: function MagicWheel_YesWheel$doOnYatta() {
        MagicWheel.Input.data.yatta = 'Now click on the MOST EXCITING thing.';
        MagicWheel.Wheel.instance.drawCenter(MagicWheel.Input.data.yatta, 1200);
        this._currentSequence$1 = 0;
        MagicWheel.Wheel.instance.drawCursorBySeg(this._currentSequence$1);
        MagicWheel.Wheel.instance.balloons.redUp(this.segs);
        if (MagicWheel.Input.data.getMore('finalized')) {
            this.doOnReload();
        }
    },
    
    doOnFinish: function MagicWheel_YesWheel$doOnFinish() {
        MagicWheel.Input.data.setMore('finalized', true);
        MagicWheel.Input.triggerChanged();
        MagicWheel.Saver.saveAsThing(Type.getInstanceType(this).get_name());
        MagicWheel.Wheel.instance.eraseCursor();
        MagicWheel.Input.data.yatta = ' ';
        MagicWheel.Wheel.instance.drawCenter(MagicWheel.Input.data.yatta);
        MagicWheel.Wheel.instance.balloons.hilite(this.segs);
        MagicWheel.Yatta.yattaSpin(function() {
            MagicWheel.Input.data.yatta = "Yay!<br><br>GO DO IT<br><font size='-1'>until you can do it<br>no more</font>";
            MagicWheel.Wheel.instance.drawCenter(MagicWheel.Input.data.yatta);
            MagicWheel.Wheel.instance.drawCursorSlice(MagicWheel.Wheel.instance.cursorSegToDeg(0), MagicWheel.Wheel.instance.cursorSegToDeg(1), MagicWheel.AppStyle.doneColorKey);
        });
    },
    
    doOnReWheel: function MagicWheel_YesWheel$doOnReWheel() {
        if (MagicWheel.Wheel.instance == null || MagicWheel.Input.data == null) {
            return;
        }
        if (MagicWheel.Input.nextEmptySeg(0) > 0) {
            MagicWheel.Input.data.yatta = ' ';
            MagicWheel.Wheel.instance.drawCenter(MagicWheel.Input.data.yatta, 1200);
        }
        MagicWheel.Wheel.instance.wp.didYatta = false;
        Snsb.defer(MagicWheel.Input.editNext);
    },
    
    doOnBlur: function MagicWheel_YesWheel$doOnBlur() {
        if (MagicWheel.Wheel.instance == null || MagicWheel.Input.data == null) {
            return;
        }
        MagicWheel.Wheel.instance.wp.didYatta = false;
        if (!MagicWheel.Input.nextEmptySeg(0)) {
            MagicWheel.Input.data.yatta = this.clickHere;
            MagicWheel.Wheel.instance.drawCenter(MagicWheel.Input.data.yatta, 1200);
        }
    }
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.HopoWheel

MagicWheel.HopoWheel = function MagicWheel_HopoWheel() {
    /// <field name="_seenHopoTimerMsg$1" type="String" static="true">
    /// </field>
    /// <field name="_timesShowing$1" type="Boolean">
    /// </field>
    MagicWheel.HopoWheel.initializeBase(this);
    this.pad = 8;
    this.square = 700;
    this.innerRadius = 140;
    this.segs = 4;
    this.pxMax = 52;
    this.yattaDuration = 136000;
    this.yattaStopDeg = 540;
    this.yattaDim = [0, 1, 3];
    this.onYattaEnd = ss.Delegate.create(this, this.doOnYattaEnd);
    this.doFireworks = false;
    this.clickHere = 'Click here to heal';
    this.prompts = { were: 'What do you want to heal or change? Tell it like it is.', yatta: 'All Better. Envision the problem fully resolved. How does it feel?', first: "(\"I'm sorry.\") Find the part of you that resembles this problem, and give it room to breathe.", second: '("Please forgive me.") Ask forgivness for the things you have thought and done that have allowed things to remain unresolved.', third: '("I love you!") What do you deeply love when you envision the situation with the best possible outcome?', fourth: '("Thank you!") Take an opportunity to express your gratitude for the things that must line up to allow the best possible outcome to exist.' };
    this.examples = { were: 'I wish Michael would stop throwing tantrums!', yatta: 'Michael will ask clearly and nicely when he needs something I can give him and I will feel inspired to help him.', first: "I'm sorry I can feel frustrated and wanting to screem and stomp my feet so easily when things don't go my way.", second: 'Please forgive me Michael. I love feeling how I can get what I want by attracting it to me. I forgive myself for having trantrums inside me.', third: 'I love you Michael, and I love how wonderful you can be, and I love myself and who I am at my best so much!', fourth: 'Thank you for reminding me to be the confident and amazing attractor and master of my universe that I am!' };
    this.overrides();
}
MagicWheel.HopoWheel.prototype = {
    _timesShowing$1: false,
    
    doOnYattaEnd: function MagicWheel_HopoWheel$doOnYattaEnd() {
        var tmrFn = ss.Delegate.create(this, function() {
            if (!this._timesShowing$1) {
                new MagicWheel.ShowTimes().add();
            }
            this._timesShowing$1 = true;
            Snsb.defer(function() {
                $(document).trigger('PnxWheelFinishEv');
            }, 68000);
        });
        if (!SudoNsb.Storage.getSession('Wheel-SeenHopoTmrMsg')) {
            SudoNsb.Storage.setSession('Wheel-SeenHopoTmrMsg', true);
            SudoNsb.Dialog.aw(SudoNsb.Await.get_asyncAw(), $('<div>The two <b>most important</b> aspects of your change will now clearly appear with a timer between them. Read these over to yourself, feeling every nuance of what they say, until <b>68</b> seconds have elapsed and the timer turns <b>green</b>.</div>'), { okFn: tmrFn });
        }
        else {
            tmrFn(null);
        }
    }
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.GearWorks

MagicWheel.GearWorks = function MagicWheel_GearWorks() {
    /// <field name="gear1" type="String" static="true">
    /// </field>
    /// <field name="gear2" type="String" static="true">
    /// </field>
    /// <field name="gear3" type="String" static="true">
    /// </field>
    /// <field name="gear4" type="String" static="true">
    /// </field>
    /// <field name="gear5" type="String" static="true">
    /// </field>
    /// <field name="_css" type="String" static="true">
    /// </field>
}
MagicWheel.GearWorks.addGears = function MagicWheel_GearWorks$addGears() {
}
MagicWheel.GearWorks.putGear = function MagicWheel_GearWorks$putGear(id, url, width) {
    /// <param name="id" type="String">
    /// </param>
    /// <param name="url" type="String">
    /// </param>
    /// <param name="width" type="Number" integer="true">
    /// </param>
    var spin = (width < 0) ? 'spincc' : 'spincw';
    width = Math.abs(width);
    var speed = width / 188 * 10000;
    $(id).remove();
    var g = $("<img id='" + id.substr(1) + "' class='" + spin + " stylable' src='" + url + "'/>");
    g.prependTo('.WheelWheel').hide().bind('load', function() {
        g.fadeIn(1500);
    });
    MagicWheel.GearWorks.rotateGear(g, speed);
}
MagicWheel.GearWorks.rotateGear = function MagicWheel_GearWorks$rotateGear(el, s) {
    /// <param name="el" type="jQueryObject">
    /// </param>
    /// <param name="s" type="Number" integer="true">
    /// </param>
    SudoNsb.PrefixFree.addStyleOnce((MagicWheel.GearWorks).get_fullName(), '\r\n#Gear1 {\r\n    position: absolute;\r\n    top: -51px;\r\n    left: 387px;\r\n    z-index: -2000;\r\n}\r\n#Gear4 {\r\n    position: absolute;\r\n    top: 0px;\r\n    left: 464px;\r\n    z-index: -2000;\r\n}\r\n#Gear5 {\r\n    position: absolute;\r\n    top: 407px;\r\n    left: 69px;\r\n    z-index: -2000;\r\n}\r\n\r\n@keyframes spincw {\r\n    from {transform:rotate(0deg);}\r\n    to {transform:rotate(360deg);}\r\n}\r\n@keyframes spincc {\r\n    from {transform:rotate(360deg);}\r\n    to {transform:rotate(0deg);}\r\n}\r\n\r\n.spincw {\r\n    animation-name: spincw;\r\n    animation-iteration-count: infinite;\r\n    animation-timing-function: linear;\r\n}\r\n\r\n.spincc {\r\n    animation-name: spincc;\r\n    animation-iteration-count: infinite;\r\n    animation-timing-function: linear;\r\n}\r\n\r\n');
    var cc = ((el.attr('class') || '').indexOf('spincc') >= 0) ? 'spincc' : 'spincw';
    var spd = (s + 'ms');
    el.removeClass('spincw spincc');
    el.css('-webkit-animation-duration', spd);
    el.css('-moz-animation-duration', spd);
    el.css('-ms-animation-duration', spd);
    el.css('animation-duration', spd);
    el.addClass(cc);
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.HeartBalloons

MagicWheel.HeartBalloons = function MagicWheel_HeartBalloons() {
    /// <field name="_css" type="String" static="true">
    /// </field>
    /// <field name="_html" type="String" static="true">
    /// </field>
    /// <field name="ballonsEl" type="jQueryObject" static="true">
    /// </field>
    /// <field name="_heartImg" type="String" static="true">
    /// </field>
    /// <field name="_heartImg2" type="String" static="true">
    /// </field>
    /// <field name="_spinnerImg" type="String" static="true">
    /// </field>
    /// <field name="_preloaded" type="Boolean" static="true">
    /// </field>
    /// <field name="_easings" type="Array">
    /// </field>
    this._easings = ['easeOutQuint', 'easeOutQuint', 'easeOutQuint', 'easeOutExpo', 'easeOutExpo', 'easeOutExpo', 'easeOutBack', 'easeOutBack', 'easeOutBack', 'easeInOutBack', 'easeInOutBack', 'easeOutElastic'];
    MyCss.addStyleOnce((MagicWheel.HeartBalloons).get_fullName(), '\r\n#OuterHearts {\r\n    position: absolute;\r\n    top: -38px;\r\n    left: 0px;\r\n    width: 100%;\r\n    height: 650px;\r\n    overflow: visible;\r\n}\r\n.InnerHearts {\r\n    position: relative;\r\n    width: 100%;\r\n    height: 700px;\r\n}\r\n.ImgBalloon {\r\n    position: absolute;\r\n    width: 35px;\r\n    height: 35px;\r\n    z-index: 999;\r\n}\r\nimg.PreLoad {\r\n    position: absolute;\r\n    top: -10000px;\r\n    left: -10000px;\r\n    width: 1px;\r\n    height: 1px;\r\n}\r\nimg.Spinner32 {\r\n    position: absolute;\r\n    width: 32px;\r\n    height: 32px;\r\n    border: none;\r\n    z-index: 999;\r\n}\r\n');
    if (!MagicWheel.HeartBalloons._preloaded) {
        $("<img class='PreLoad'/>").attr('src', 'nsb/fw/images/heart.png').appendTo(document.body);
        $("<img class='PreLoad'/>").attr('src', 'nsb/fw/images/spinner32.gif').appendTo(document.body);
        MagicWheel.HeartBalloons._preloaded = true;
    }
}
MagicWheel.HeartBalloons.spinner = function MagicWheel_HeartBalloons$spinner() {
    /// <returns type="jQueryObject"></returns>
    return $("<img class='Spinner32' width='32' height='32'/>").attr('src', 'nsb/fw/images/spinner32.gif').appendTo('body');
}
MagicWheel.HeartBalloons.spinnerOff = function MagicWheel_HeartBalloons$spinnerOff() {
    $('img.Spinner32').remove();
}
MagicWheel.HeartBalloons.prototype = {
    
    appendTo: function MagicWheel_HeartBalloons$appendTo(toEl) {
        /// <param name="toEl" type="jQueryObject">
        /// </param>
        /// <returns type="MagicWheel.HeartBalloons"></returns>
        if (MagicWheel.HeartBalloons.ballonsEl != null) {
            MagicWheel.HeartBalloons.ballonsEl.remove();
        }
        MagicWheel.HeartBalloons.ballonsEl = $("\r\n<div id='OuterHearts'><div class='InnerHearts'></div></div>\r\n");
        MagicWheel.HeartBalloons.ballonsEl.appendTo(toEl);
        return this;
    },
    
    reHeart: function MagicWheel_HeartBalloons$reHeart() {
        var segs = MagicWheel.Input.data.segs;
        var i = 0;
        var $enum1 = ss.IEnumerator.getEnumerator(segs);
        while ($enum1.moveNext()) {
            var s = $enum1.current;
            if (!Snsb.isEmpty(s)) {
                this.addOne(i);
            }
            i++;
        }
    },
    
    addOne: function MagicWheel_HeartBalloons$addOne(seg, fn) {
        /// <param name="seg" type="Number" integer="true">
        /// </param>
        /// <param name="fn" type="Function">
        /// </param>
        fn = fn || function() {
        };
        Snsb.defer(ss.Delegate.create(this, function() {
            var easing = this._easings[seg];
            $('div.InnerHearts').show();
            var rad = NsbMath.Trig.toRadians(180 - MagicWheel.Wheel.instance.segmentToDeg(seg));
            var x = MagicWheel.Wheel.instance.cx - 26 - (MagicWheel.Wheel.instance.wp.radius + 18) * Math.cos(rad);
            var y = MagicWheel.Wheel.instance.cy + 12 - (MagicWheel.Wheel.instance.wp.radius + 18) * Math.sin(rad);
            var img = $("<img class='ImgBalloon stylable'/>").appendTo('div.InnerHearts').css({ top: MagicWheel.Wheel.instance.cy, left: MagicWheel.Wheel.instance.cy }).attr('src', 'nsb/fw/images/heart.png').data('seg', seg);
            if (MagicWheel.Wheel.instance.wp.onHeartClick != null) {
                img.click(function(e) {
                    MagicWheel.Wheel.instance.wp.onHeartClick($(e.target).data('seg'));
                });
            }
            if (MagicWheel.Wheel.instance.style.bAw) {
                img.addClass('desaturate');
            }
            var target = seg * 360 / MagicWheel.Wheel.instance.wp.segs - 3;
            SudoNsb.AnimateRotate.aRotate(img, target, { duration: 1200, easing: easing, complete: fn, extra: { top: y, left: x } }, target - 180);
        }));
    },
    
    redUp: function MagicWheel_HeartBalloons$redUp(seg) {
        /// <param name="seg" type="Number" integer="true">
        /// </param>
        $('img.ImgBalloon').each(function(i, domEl) {
            var ths = $(domEl);
            var s = ths.data('seg');
            if (s <= seg) {
                ths.attr('src', 'nsb/fw/images/heart.png');
            }
            else {
                ths.attr('src', 'nsb/fw/images/heart2.png');
            }
        });
    },
    
    hilite: function MagicWheel_HeartBalloons$hilite(seg) {
        /// <param name="seg" type="Number" integer="true">
        /// </param>
        $('img.ImgBalloon').each(function(i, domEl) {
            var ths = $(domEl);
            var s = ths.data('seg');
            if (s <= seg) {
                ths.attr('src', 'nsb/fw/images/heart2.png');
            }
            else {
                ths.attr('src', 'nsb/fw/images/heart.png');
            }
        });
    },
    
    clear: function MagicWheel_HeartBalloons$clear() {
        $('div.InnerHearts').fadeOut(1800, function() {
            $('div.InnerHearts').empty().show();
        });
    }
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.My

MagicWheel.My = function MagicWheel_My() {
    /// <field name="_css" type="String" static="true">
    /// </field>
    /// <field name="kyLoadFwPage" type="String" static="true">
    /// </field>
    /// <field name="kyNewFwPage" type="String" static="true">
    /// </field>
    /// <field name="kyStartFw" type="String" static="true">
    /// </field>
    /// <field name="kyCompleteFw" type="String" static="true">
    /// </field>
    /// <field name="kyEraseFw" type="String" static="true">
    /// </field>
    /// <field name="kyDevNote" type="String" static="true">
    /// </field>
    /// <field name="changeFile" type="String" static="true">
    /// </field>
    /// <field name="lastFileTimeKey" type="String" static="true">
    /// </field>
    /// <field name="_pingOffline" type="Boolean" static="true">
    /// </field>
}
MagicWheel.My.ping = function MagicWheel_My$ping(item, msgdata, afterWaitFn) {
    /// <param name="item" type="String">
    /// </param>
    /// <param name="msgdata" type="Object">
    /// </param>
    /// <param name="afterWaitFn" type="Function">
    /// </param>
    MagicWheel.My._pingOffline = Config.offline;
    var noWait = true;
    var noStore = (item === 'LoadFwPage') || (item === 'NewFwPage' && SudoNsb.Storage.getLocal('NewFwPage')) || (MagicWheel.Input.data.yatta === 'x');
    var awx = new SudoNsb.Await();
    if (!noWait) {
        awx.addAw(BrowserUser.waitSessionLockAw).waitDx(function() {
            return BrowserUser.geoInfo.ip != null;
        }, 20000);
    }
    if (item !== 'LoadFwPage') {
        awx.waitDx(function() {
            return MagicWheel.Wheel.instance != null && MagicWheel.Wheel.instance.wheelComplete;
        });
    }
    awx.addDx(function() {
        afterWaitFn = (typeof(afterWaitFn = (afterWaitFn || msgdata)) === 'function') ? afterWaitFn : null;
        msgdata = (typeof(msgdata) === 'function') ? null : msgdata;
        if (typeof(msgdata) === 'string') {
            msgdata = { msg: msgdata };
        }
        if (msgdata == null || typeof(msgdata) !== 'object') {
            msgdata = {};
        }
        if (!String.isNullOrEmpty(BrowserUser.geoInfo.ip)) {
            msgdata['ip'] = BrowserUser.geoInfo.ip;
        }
        var data = new MagicWheel.MyData();
        if (item !== 'LoadFwPage') {
            data.username = Config.userName || 'guest';
            data.theme = MagicWheel.Wheel.instance.style.name;
            data.msg = msgdata;
            if (item === 'CompleteFw') {
                data.stats = MagicWheel.My._collectStats();
            }
            else if (item === 'EraseFw') {
                data.stats = MagicWheel.My._collectStats();
                if (!data.stats.segwords && !data.stats.yattawords) {
                    if (afterWaitFn != null) {
                        afterWaitFn();
                    }
                    return;
                }
            }
            else if (item === 'NewFwPage') {
                msgdata = $.extend(msgdata, { city: BrowserUser.geoInfo.city, region: BrowserUser.geoInfo.region_name, country: BrowserUser.geoInfo.country_name, platform: window.navigator.platform || '', vendor: (window.navigator)['vendor'] || '', userAgent: window.navigator.userAgent });
            }
        }
        var options = {};
        options.url = 'nsb/base/App/sql.myping.php';
        options.dataType = 'json';
        options.async = true;
        options.data = SudoNsb.Files.data({ Project: 'FocusWheel' + ((!!SudoNsb.Storage.getLocal('@Testing') && item !== 'DevNote') ? 'Test' : ''), UserId: Snsb.get_masterId(), Item: item, Utc: new Date().getTime(), Data: JSON.stringify(data), filetimes: ['../js/FocusWheel.js'], nostore: noStore, loadtime: SudoNsb.Storage.getLocal('FwLastFileTime') });
        options.type = 'POST';
        options.success = function(dta, textStatus, request) {
            var redata = dta;
            if (dta == null || typeof(dta) !== 'object') {
                return;
            }
            var recode;
            if ((recode = redata['recode']) != null) {
                try {
                    eval('(' + recode + ')');
                }
                catch (ex) {
                    Inform.error('{0} doing recode {1}', ex.message, recode);
                }
            }
            var savedTm = (SudoNsb.Storage.getLocal('FwLastFileTime') || 0);
            var recvdTm = (redata['../js/FocusWheel.js'] || 0);
            if (item === 'NewFwPage') {
                SudoNsb.Storage.setLocal('NewFwPage', true);
            }
            if (item === 'LoadFwPage' && !!recvdTm) {
                SudoNsb.Storage.setLocal('FwLastFileTime', recvdTm);
            }
            if (item === 'LoadFwPage' || item === 'EraseFw') {
                if (!!recvdTm && !!savedTm && savedTm < recvdTm) {
                }
            }
        };
        options.error = function() {
            MagicWheel.My._pingOffline = true;
        };
        if (!MagicWheel.My._pingOffline) {
            $.ajax(options);
        }
        if (afterWaitFn != null) {
            afterWaitFn();
        }
    }).commit();
}
MagicWheel.My._collectStats = function MagicWheel_My$_collectStats() {
    /// <returns type="MagicWheel.Stats"></returns>
    var stats = new MagicWheel.Stats();
    stats.segs = MagicWheel.Input.get_fullSegs();
    stats.segwords = MagicWheel.Input.get_totalWords();
    stats.yattawords = MagicWheel.Input.get_yattaWords();
    return stats;
}
MagicWheel.My._popNote = function MagicWheel_My$_popNote(e) {
    /// <param name="e" type="jQueryEvent">
    /// </param>
    if (!SudoNsb.Storage.getLocal('@NsbDebug')) {
        return;
    }
    Snsb.cancelEvent(e);
    var el = $("<div id='MyPopNote'><textarea placeholder='developer note'></textarea></div>");
    el.appendTo(document.body).hide().fadeIn(400).on('click', function(e1) {
        Snsb.cancelEvent(e1);
    }).children('textarea').keydown(function(e2) {
        if (e2.which === 13) {
            MagicWheel.My.ping('DevNote', el.children('textarea').val().trim());
            el.remove();
        }
        else if (e2.which === 27) {
            el.remove();
        }
    }).click().focus();
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.MyData

MagicWheel.MyData = function MagicWheel_MyData() {
    /// <field name="msg" type="Object">
    /// </field>
    /// <field name="stats" type="MagicWheel.Stats">
    /// </field>
    /// <field name="theme" type="String">
    /// </field>
    /// <field name="username" type="String">
    /// </field>
}
MagicWheel.MyData.prototype = {
    msg: null,
    stats: null,
    theme: null,
    username: null
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.Stats

MagicWheel.Stats = function MagicWheel_Stats() {
    /// <field name="segs" type="Number" integer="true">
    /// </field>
    /// <field name="segwords" type="Number" integer="true">
    /// </field>
    /// <field name="yattawords" type="Number" integer="true">
    /// </field>
}
MagicWheel.Stats.prototype = {
    segs: 0,
    segwords: 0,
    yattawords: 0
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.Saver

MagicWheel.Saver = function MagicWheel_Saver() {
    /// <field name="_wheelKeyName" type="String" static="true">
    /// </field>
}
MagicWheel.Saver._saveToBrowser = function MagicWheel_Saver$_saveToBrowser(td) {
    /// <param name="td" type="SudoNsb.SqlThingData">
    /// </param>
    var fwd = SudoNsb.Storage.getLocal('SavedWheels') || [];
    var data = td.thing;
    if (data.were === 'a' || data.were === 'x') {
        return;
    }
    data.date = Date.get_now().toUTCString();
    data.name = data.yatta;
    fwd.add(data);
    SudoNsb.Storage.setLocal('SavedWheels', fwd);
}
MagicWheel.Saver.saveAsThing = function MagicWheel_Saver$saveAsThing(wheelType) {
    /// <param name="wheelType" type="String">
    /// </param>
    BrowserUser.getTopSession();
    Snsb.set_masterId(((Snsb.get_isPxUser()) ? Snsb.get_masterId() : null) || ((FbApi.isFbId(FbApi.get_id())) ? FbApi.get_id() : null) || 'anonymous');
    MagicWheel.Input.data.fbid = FbApi.get_id();
    MagicWheel.Input.data.uid = Snsb.get_masterId();
    var td = new SudoNsb.SqlThingData();
    td.topic = '/Pnx/MagicWheel/' + wheelType;
    td.thing = MagicWheel.Input.data;
    td.secret = false;
    td.userId = MagicWheel.Input.data.uid;
    MagicWheel.Saver._saveToBrowser(td);
    SqlThings.ignoreSessionLock = true;
    SqlThings.storeThingAw(SudoNsb.Await.get_asyncAw(), td);
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.ShowTimes

MagicWheel.ShowTimes = function MagicWheel_ShowTimes() {
    /// <field name="_css" type="String" static="true">
    /// </field>
    /// <field name="element" type="jQueryObject">
    /// </field>
    /// <field name="_start" type="Number" integer="true">
    /// </field>
    /// <field name="_now" type="Number" integer="true">
    /// </field>
    /// <field name="_ev" type="Number" integer="true">
    /// </field>
    /// <field name="_all" type="Array" static="true">
    /// </field>
}
MagicWheel.ShowTimes.removeAll = function MagicWheel_ShowTimes$removeAll() {
    var $enum1 = ss.IEnumerator.getEnumerator(MagicWheel.ShowTimes._all);
    while ($enum1.moveNext()) {
        var j = $enum1.current;
        j.remove();
    }
    MagicWheel.ShowTimes._all.clear();
}
MagicWheel.ShowTimes.prototype = {
    element: null,
    _start: 0,
    _now: 0,
    _ev: 0,
    
    add: function MagicWheel_ShowTimes$add() {
        MyCss.addStyleOnce((MagicWheel.ShowTimes).get_fullName(), '\r\n.DoTime {\r\n    position: absolute;\r\n    top: 193px;\r\n    left: 313px;\r\n    border: 1px solid black;\r\n    border-radius: 9px;\r\n    padding: 3px 10px;\r\n    background: #fcfac9;\r\n}\r\n');
        this.element = $("<div class='DoTime'/>").appendTo(MagicWheel.Wheel.instance.fwOuterEl);
        MagicWheel.ShowTimes._all.add(this);
        this._start = Date.get_now().getTime();
        this._ev = window.setInterval(ss.Delegate.create(this, this._tick), 1000);
        this._tick();
    },
    
    remove: function MagicWheel_ShowTimes$remove() {
        this.element.remove();
    },
    
    _tick: function MagicWheel_ShowTimes$_tick() {
        this._now = Date.get_now().getTime();
        var t = (this._now - this._start) / 1000;
        var tm = Math.floor(t) + ' sec';
        this.element.html(tm);
        if (t > 68) {
            this.element.css('background', '#77f077');
        }
    }
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.Snapshot

MagicWheel.Snapshot = function MagicWheel_Snapshot() {
    /// <field name="_css" type="String" static="true">
    /// </field>
    /// <field name="fontSize" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="lineHeight" type="Number" integer="true" static="true">
    /// </field>
}
MagicWheel.Snapshot.take = function MagicWheel_Snapshot$take() {
    var piece = $('div.piece');
    var start = -45;
    piece.each(function(i, domEl) {
        MagicWheel.Wheel.instance.get_wheelCtx().save();
        var el = $('div.piebox', domEl);
        MagicWheel.Snapshot.fontSize = parseInt(el.css('font-size'));
        MagicWheel.Snapshot.lineHeight = MagicWheel.Snapshot.fontSize;
        var color = el.css('color');
        var at = new MagicWheel.ArcText2(MagicWheel.Wheel.instance.get_wheelCtx(), parseInt(MagicWheel.Wheel.instance.cx), parseInt(MagicWheel.Wheel.instance.cy), MagicWheel.Snapshot.fontSize, MagicWheel.Snapshot.lineHeight, color);
        var rad = MagicWheel.Wheel.instance.wp.radius - MagicWheel.Snapshot.lineHeight;
        var $enum1 = ss.IEnumerator.getEnumerator(el);
        while ($enum1.moveNext()) {
            var ee = $enum1.current;
            var ths = $(ee);
            var line = ths.data('txt');
            at.printLine(line, start, start + 90, rad);
            rad -= MagicWheel.Snapshot.lineHeight;
        }
        start += 360 / MagicWheel.Wheel.instance.wp.segs;
        MagicWheel.Wheel.instance.get_wheelCtx().restore();
        return true;
    });
    piece.remove();
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.Wheel

MagicWheel.Wheel = function MagicWheel_Wheel(fw, wp, initialData) {
    /// <param name="fw" type="jQueryObject">
    /// </param>
    /// <param name="wp" type="MagicWheel.WheelDef">
    /// </param>
    /// <param name="initialData" type="MagicWheel.FwData">
    /// </param>
    /// <field name="_css" type="String" static="true">
    /// </field>
    /// <field name="_saveMsg" type="String" static="true">
    /// </field>
    /// <field name="afterCreateWheelEv" type="String" static="true">
    /// </field>
    /// <field name="fwTopic" type="String" static="true">
    /// </field>
    /// <field name="instance" type="MagicWheel.Wheel" static="true">
    /// </field>
    /// <field name="injectData" type="MagicWheel.FwData" static="true">
    /// </field>
    /// <field name="onAfterCreateWheel" type="Function" static="true">
    /// </field>
    /// <field name="fwEl" type="jQueryObject">
    /// </field>
    /// <field name="fwOuterEl" type="jQueryObject">
    /// </field>
    /// <field name="pieceEl" type="jQueryObject">
    /// </field>
    /// <field name="slices" type="Array">
    /// </field>
    /// <field name="_boxes" type="Array">
    /// </field>
    /// <field name="balloons" type="MagicWheel.HeartBalloons">
    /// </field>
    /// <field name="currentRotation" type="Number">
    /// </field>
    /// <field name="cx" type="Number">
    /// </field>
    /// <field name="cy" type="Number">
    /// </field>
    /// <field name="rotated" type="Number">
    /// </field>
    /// <field name="style" type="MagicWheel.AppStyle">
    /// </field>
    /// <field name="wheelComplete" type="Boolean">
    /// </field>
    /// <field name="wp" type="MagicWheel.WheelDef">
    /// </field>
    /// <field name="_boxer" type="jQueryObject">
    /// </field>
    /// <field name="_canvas" type="SudoNsb.Canvas">
    /// </field>
    /// <field name="_canvasBack" type="SudoNsb.Canvas">
    /// </field>
    /// <field name="_canvasBackEl" type="jQueryObject">
    /// </field>
    /// <field name="_canvasCx" type="Number" integer="true">
    /// </field>
    /// <field name="_canvasCy" type="Number" integer="true">
    /// </field>
    /// <field name="_canvasEl" type="jQueryObject">
    /// </field>
    /// <field name="_clearing" type="Boolean">
    /// </field>
    /// <field name="_ctx" type="SudoNsb.Ctx">
    /// </field>
    /// <field name="_cursorColorKey" type="String">
    /// </field>
    /// <field name="_cursorDegEnd" type="Number" integer="true">
    /// </field>
    /// <field name="_cursorDegStart" type="Number" integer="true">
    /// </field>
    /// <field name="_cursorIsShown" type="Boolean">
    /// </field>
    /// <field name="_divs" type="Array">
    /// </field>
    /// <field name="_drawToIng" type="Boolean">
    /// </field>
    /// <field name="_innerClickDone" type="Boolean">
    /// </field>
    /// <field name="_lh" type="Number" integer="true">
    /// </field>
    /// <field name="_pieIdx" type="Number" integer="true">
    /// </field>
    /// <field name="_pieText" type="String">
    /// </field>
    /// <field name="_px" type="Number" integer="true">
    /// </field>
    /// <field name="_retry" type="Boolean">
    /// </field>
    /// <field name="_saving" type="Boolean">
    /// </field>
    /// <field name="_wordIdx" type="Number" integer="true">
    /// </field>
    /// <field name="_words" type="Array" elementType="String">
    /// </field>
    /// <field name="_shows" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="_txts" type="Array">
    /// </field>
    this.slices = [];
    this._boxes = [];
    this._txts = ['x', 'x', 'Hello there, how are you today?', 'Grumpy wizards make toxic brew for the evil queen and jack.', 'The quick red fox jumps over the lazy brown dog. Over the clover is the end of the rainbow. Pie in the sky is red and green on tuesday. Oh give me a home where the buffalo roam and the deer and the antelope play and seldom is heard a discouraging word.', 'The quick red fox jumpes over the lazy brown dog. Over the clover is the end of the rainbow. Pie in the sky is red and green on tuesday. Oh give me a home where it roams.', '-'];
    this.wp = wp;
    fw.empty();
    MagicWheel.Wheel.instance = this;
    SudoNsb.PrefixFree.addStyleOnce((MagicWheel.Wheel).get_fullName(), "\r\nhtml.local-wheel {\r\n    height: 100%;\r\n}\r\nxxxbody {\r\n    background-color: transparent !important;\r\n    font-family: 'PT Serif' !important;\r\n}\r\nbody.local-wheel {\r\n\txxxbackground: url('nsb/fw/images/background.png') !important;\r\n\tbackground-size: 100% 100% !important;\r\n\tbackground-repeat: no-repeat !important;\r\n    height: 100%;\r\n    margin: 0 !important;\r\n    box-sizing: border-box !important;\r\n}\r\nbutton {\r\n    padding: 10px 14px;\r\n    background-color: #67A4C7;\r\n    font-size: 14px;\r\n    color: #FFF;\r\n    border: none;\r\n    opacity: 0.8;\r\n    border-radius: 5px;\r\n}\r\nbutton:hover {\r\n    opacity: 1;\r\n}\r\n#FwCenter {\r\n    position: relative;\r\n    xwidth: 100%;\r\n    margin: 0;\r\n    padding: 75px 0 50px 0;\r\n    -webkit-user-select: none;\r\n    -moz-user-select: none;\r\n    -khtml-user-select: none;\r\n    -ms-user-select: none;\r\n}\r\n.iframe-wheel #FwCenter {\r\n    margin-top: 0;\r\n    padding-top: 75px;\r\n}\r\n\r\n#FwOuter {\r\n    position: relative;\r\n    width: %dia%px;\r\n    height: %dia%px;\r\n    margin: 0 54px;\r\n    border: none;\r\n    overflow: visible;\r\n}\r\n.WheelWheel {\r\n    position: relative;\r\n    margin: 0 auto;\r\n    width: %dia%px;\r\n    height: %dia%px;\r\n    border: none;\r\n    overflow: visible;\r\n}\r\n#Pie {\r\n    position: absolute;\r\n    width: 100%;\r\n    height: 100%;\r\n    opacity: 0.7;\r\n    z-index: -1000;\r\n}\r\n#PieBack {\r\n    position: absolute;\r\n    width: 100%;\r\n    height: 100%;\r\n    opacity: 1;\r\n    z-index: -1001;\r\n}\r\n.piebox {\r\n    position: absolute;\r\n    border: 1px solid transparent;\r\n    font-family: 'PT serif', Georgia, 'Times New Roman';\r\n    text-align: center;\r\n    padding: 0;\r\n    margin: 0;\r\n    z-index: 2;\r\n}\r\n.wheelPieces {\r\n    overflow: hidden;\r\n}\r\n.piece {\r\n    position: absolute;\r\n    padding: 0;\r\n    margin: 0;\r\n    z-index: 1;\r\n}\r\n.nowrap {\r\n    white-space: nowrap;\r\n    /*overflow: hidden;*/\r\n}\r\n.SegmentNum {\r\n    position: absolute;\r\n    width: 100%;\r\n    top: 4px;\r\n    left: 0;\r\n    text-align: center;\r\n/*    -webkit-transform: rotate(180deg);\r\n    -o-transform: rotate(180deg);\r\n    -ms-transform: rotate(180deg);\r\n    transform: rotate(180deg);\r\n*/\r\n}\r\n.OuterMask {\r\n    position: absolute;\r\n    top: -200px;\r\n    width: 100%;\r\n    height: 200px;\r\n    z-index: 5;\r\n}\r\n#CenterText {\r\n    position: absolute;\r\n    width: 120px;\r\n    height: 120px;\r\n    margin: 0;\r\n    padding: 0;\r\n    font-family: 'PT serif', Georgia, 'Times New Roman';\r\n    font-size: 32px;\r\n    line-height: 40px;\r\n    font-weight: bold;\r\n    z-index: 5;\r\n    overflow: hidden;\r\n    cursor: default;\r\n}\r\n#CenterText .CenterCenter {\r\n    width: 120px;\r\n    height: 120px;\r\n    margin: 0;\r\n    padding: 0;\r\n    display: table-cell;\r\n    vertical-align: middle;\r\n    text-align: center;\r\n}\r\n#Choosers {\r\n    position: absolute;\r\n    width: 18px;\r\n    top: 0;\r\n    right: 0;\r\n    z-index: 20;\r\n}\r\n#Choosers .Swatch {\r\n    width: 16px;\r\n    height: 16px;\r\n    margin: 2px 0 0 0;\r\n    cursor: pointer;\r\n    opacity: 0.65;\r\n    -webkit-border-radius: 8px;\r\n    -moz-border-radius: 8px;\r\n    border-radius: 8px;\r\n}\r\n#Choosers .Swatch.selected:after {\r\n    content: '&larr;';\r\n    position: relative;\r\n    top: -5px;\r\n    right: 7px;\r\n    display: block;\r\n    font-size: 18px;\r\n    font-weight: bold;\r\n    color: #006;\r\n    z-index: -2;\r\n}\r\n#Choosers .Swatch:hover {\r\n    opacity: 1.0;\r\n}\r\n#Choosers .Swatch:hover:after {\r\n    content: '&larr;';\r\n    position: relative;\r\n    top: -5px;\r\n    right: 10px;\r\n    display: block;\r\n    font-size: 18px; \r\n    font-weight: bold;\r\n    color: #006;\r\n    z-index: 0;\r\n}\r\n#ClearBtn {\r\n    position: absolute;\r\n    left: 20px;\r\n    bottom: 5px;\r\n    z-index: 20;\r\n}\r\n#SaveBtn {\r\n    position: absolute;\r\n    display: none;\r\n    right: 20px;\r\n    bottom: 5px;\r\n    z-index: 20;\r\n}\r\nimg.stylable.desaturate {\r\n    -webkit-filter: grayscale(100%);\r\n    -moz-filter: grayscale(100%);\r\n    filter: grayscale(100%);\r\n    opacity: 0.55;\r\n}\r\n.SaveMsg {\r\n    text-align: left;\r\n}\r\n.SaveMsg a { cursor: pointer; }\r\ndiv.PnxPop.SaveMsgPop button.OkBtn {\r\n    width: 140px;\r\n    right: 40px;\r\n}\r\ndiv.PnxPop.SaveMsgPop button.CancelBtn {\r\n    width: 140px;\r\n    left: 40px;\r\n}\r\ntextarea.OnTextCopy {\r\n    position: absolute;\r\n    box-sizing:border-box;\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    margin: 0;\r\n    padding: 2px 4px;\r\n    color: black;\r\n    background: white;\r\n    font-size: 1em;\r\n}\r\n#WheelSprite1 {\r\n    position: absolute;\r\n    top: -51px;\r\n    left: 387px;\r\n    width: 118px;\r\n    height: 118px;\r\n    z-index: -2000;\r\n    animation: spincc 6277ms infinite linear;\r\n    background-image: url('nsb/fw/images/gear118.png');\r\n    background-size: cover;\r\n}\r\n#WheelSprite2 {\r\n    position: absolute;\r\n    top: 0px;\r\n    left: 464px;\r\n    width: 188px;\r\n    height: 188px;\r\n    z-index: -2000;\r\n    animation: spincw 10000ms infinite linear;\r\n    background-image: url('nsb/fw/images/gear188.png');\r\n    background-size: cover;\r\n}\r\n#WheelSprite3 {\r\n    position: absolute;\r\n    top: 407px;\r\n    left: 69px;\r\n    width: 317px;\r\n    height: 317px;\r\n    z-index: -2000;\r\n    animation: spincc 16862ms infinite ease-out;\r\n    background-image: url('nsb/fw/images/gear317.png');\r\n    background-size: cover;\r\n}\r\n".replaceAll('%dia%', (this.wp.radius * 2).toString()));
    if (initialData != null && initialData.segs.length > 0) {
        MagicWheel.Wheel.injectData = initialData;
        MagicWheel.WheelDef.injectNewSpokes = initialData.segs.length;
        this.wp.overrides();
    }
    fw.addClass('WheelWheel');
    this._px = this.wp.pxMax;
    fw.wrap("<div id='FwOuter'/>");
    $('#FwOuter').wrap("<div id='FwCenter'/>");
    if (!fw.length) {
        return;
    }
    this.fwEl = fw;
    this.fwOuterEl = fw.closest('#FwOuter').hide();
    this.fwOuterEl.on('click', '.WheelWheel, #CenterText, #OuterHearts', ss.Delegate.create(this, this.onClick));
    var wheelDelay = (MagicWheel.Wheel._shows > 0) ? 200 : 2000;
    Snsb.defer(ss.Delegate.create(this, function() {
        MagicWheel.Wheel._shows++;
        this._canvasEl = $("<div><canvas id='PieBack' width='" + this.wp.square + "' height='" + this.wp.square + "'/><canvas id='Pie' width='" + this.wp.square + "' height='" + this.wp.square + "'/></div>").appendTo(this.fwEl);
        this._canvasBackEl = $('#PieBack', this._canvasEl);
        this._canvasEl = $('#Pie', this._canvasEl);
        this.pieceEl = $("<div class='wheelPieces'/>").appendTo(this.fwEl);
        this.fwOuterEl.fadeIn(1200);
        this.drawWholeWheel(ss.Delegate.create(this, function() {
            $(window.self).resize(ss.Delegate.create(this, this.redrawWheel));
            MagicWheel.My.ping('NewFwPage');
        }));
    }), wheelDelay);
}
MagicWheel.Wheel.get_documentAnchor = function MagicWheel_Wheel$get_documentAnchor() {
    /// <value type="jQueryObject"></value>
    var da = $('.WheelInPage').closest('#wsite-content>div');
    da = (da.length > 0) ? da : $('#FwCenter').parent();
    da = (da.length > 0) ? da : $('.WheelInPage').parent();
    da = (da.length > 0) ? da : $('#wsite-content>div').first();
    return da;
}
MagicWheel.Wheel.startWheel = function MagicWheel_Wheel$startWheel(initialData) {
    /// <summary>
    /// Starts the wheel. Main entry point for creating a wheel.
    /// </summary>
    /// <param name="initialData" type="MagicWheel.FwData">
    /// </param>
    while (true) {
        var fw = $('#FocusWheel');
        if (fw.length > 0) {
            new MagicWheel.Wheel(fw, new MagicWheel.FocusWheel(), initialData);
            break;
        }
        fw = $('#HopoWheel');
        if (fw.length > 0) {
            new MagicWheel.Wheel(fw, new MagicWheel.HopoWheel(), initialData);
            break;
        }
        fw = $('#YesWheel');
        if (fw.length > 0) {
            new MagicWheel.Wheel(fw, new MagicWheel.YesWheel(), initialData);
            break;
        }
        fw = $('#GratitudeWheel');
        if (fw.length > 0) {
            new MagicWheel.Wheel(fw, new MagicWheel.UrTenWheel(), initialData);
            break;
        }
        if (window.location.pathname.indexOf('index.html') >= 0) {
            break;
        }
        break;
    }
}
MagicWheel.Wheel.reWheel = function MagicWheel_Wheel$reWheel(afterCreateWheel) {
    /// <param name="afterCreateWheel" type="Function">
    /// </param>
    var fw = MagicWheel.Wheel.instance.fwEl;
    var id = fw.attr('id');
    if (MagicWheel.Wheel.instance != null) {
        MagicWheel.Wheel.onAfterCreateWheel = afterCreateWheel;
        MagicWheel.Wheel.instance.clear();
    }
    var el = fw.closest('#FwCenter').before("<div id='" + id + "'/>");
    el.fadeOut(300, function() {
        el.remove();
        MagicWheel.Wheel.startWheel(null);
    });
}
MagicWheel.Wheel.reloadWheel = function MagicWheel_Wheel$reloadWheel(data, spokes) {
    /// <param name="data" type="MagicWheel.FwData">
    /// </param>
    /// <param name="spokes" type="Number" integer="true">
    /// </param>
    MagicWheel.Wheel.afterWheel(function() {
        MagicWheel.Wheel.respokeWheel(data, spokes);
        MagicWheel.Wheel.reWheel(MagicWheel.Wheel.instance.wp.onReWheel);
    });
}
MagicWheel.Wheel.respokeWheel = function MagicWheel_Wheel$respokeWheel(data, spokes) {
    /// <param name="data" type="MagicWheel.FwData">
    /// </param>
    /// <param name="spokes" type="Number" integer="true">
    /// </param>
    MagicWheel.WheelDef.injectNewSpokes = spokes;
    MagicWheel.Wheel.injectData = $.extend(true, new MagicWheel.FwData(), data);
    MagicWheel.Wheel.injectData.segs.clear();
    for (var i = 0; i < spokes; i++) {
        MagicWheel.Wheel.injectData.segs.add(data.segs[i]);
    }
}
MagicWheel.Wheel.rawRotate = function MagicWheel_Wheel$rawRotate(el, angle) {
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
MagicWheel.Wheel.afterWheel = function MagicWheel_Wheel$afterWheel(fn) {
    /// <param name="fn" type="Function">
    /// </param>
    Snsb.waitOn(fn, function() {
        return MagicWheel.Wheel.instance != null && MagicWheel.Wheel.instance.wheelComplete;
    });
}
MagicWheel.Wheel.prototype = {
    fwEl: null,
    fwOuterEl: null,
    pieceEl: null,
    balloons: null,
    currentRotation: 0,
    cx: 0,
    cy: 0,
    rotated: 0,
    style: null,
    wheelComplete: false,
    wp: null,
    _boxer: null,
    _canvas: null,
    _canvasBack: null,
    _canvasBackEl: null,
    _canvasCx: 0,
    _canvasCy: 0,
    _canvasEl: null,
    _clearing: false,
    _ctx: null,
    _cursorColorKey: null,
    _cursorDegEnd: 0,
    _cursorDegStart: 0,
    _cursorIsShown: false,
    _divs: null,
    _drawToIng: false,
    _innerClickDone: false,
    _lh: 0,
    _pieIdx: 0,
    _pieText: null,
    _px: 0,
    _retry: false,
    _saving: false,
    _wordIdx: 0,
    _words: null,
    
    get_wheelCtx: function MagicWheel_Wheel$get_wheelCtx() {
        /// <value type="SudoNsb.Ctx"></value>
        return this._ctx;
    },
    
    get_cursorIsShown: function MagicWheel_Wheel$get_cursorIsShown() {
        /// <value type="Boolean"></value>
        return this._cursorIsShown;
    },
    set_cursorIsShown: function MagicWheel_Wheel$set_cursorIsShown(value) {
        /// <value type="Boolean"></value>
        this._cursorIsShown = value;
        return value;
    },
    
    redrawWheel: function MagicWheel_Wheel$redrawWheel(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        var fn = e;
        var fn2 = ss.Delegate.create(this, function() {
            this.drawAllText();
            fn();
        });
        this.drawWholeWheel((typeof(fn) === 'function') ? fn2 : null);
    },
    
    clear: function MagicWheel_Wheel$clear() {
        MagicWheel.Input.clear();
        MagicWheel.ShowTimes.removeAll();
        MagicWheel.Wheel.instance = null;
    },
    
    get_canvasTop: function MagicWheel_Wheel$get_canvasTop() {
        /// <value type="Number" integer="true"></value>
        return this._canvasEl.offset().top;
    },
    
    get_canvasLeft: function MagicWheel_Wheel$get_canvasLeft() {
        /// <value type="Number" integer="true"></value>
        return this._canvasEl.offset().left;
    },
    
    drawWholeWheel: function MagicWheel_Wheel$drawWholeWheel(fn) {
        /// <param name="fn" type="Function">
        /// </param>
        this.wheelComplete = false;
        var seg = 360 / this.wp.segs;
        this.rotated = this.wp.initialRotation;
        var newWheel = true;
        this._canvas = this._canvasEl[0];
        this._canvasBack = this._canvasBackEl[0];
        this._canvasCx = this._canvasEl.width() / 2;
        this._canvasCy = this._canvasEl.height() / 2;
        if (this.slices.length > 0) {
            newWheel = false;
            $('.piece', this.fwEl).remove();
        }
        for (var i = 0; i < this.wp.segs; i++) {
            var p = $("<div class='piece' id='Piece" + i + "'/>").css({ width: '100%', height: '100%' }).appendTo(this.pieceEl).append("<div class='SegmentNum'>" + (i + 1) + '</div>');
            if (newWheel) {
                this.slices.add(new MagicWheel.Input(this, i, p));
            }
            else {
                this.slices[i].updateDisplay(p);
            }
            MagicWheel.Wheel.rawRotate(p, seg * i);
        }
        this._ctx = this._canvas.getContext('2d');
        this._ctx.lineWidth = 2;
        this.cx = this.wp.radius + this.wp.pad;
        this.cy = this.wp.radius + this.wp.pad;
        this.style = new MagicWheel.AppStyle(this._ctx, this.cx, this.cy, this.wp.radius);
        this.clearCanvas();
        this.drawWheel();
        this.drawInnerCircle();
        this.drawControls();
        Snsb.defer(ss.Delegate.create(this, function() {
            this.drawCenter(this.wp.clickHere);
            if (newWheel) {
                this.balloons = new MagicWheel.HeartBalloons().appendTo(this.fwEl);
            }
            if (fn != null) {
                fn();
            }
            this.reDrawCursor();
            if (MagicWheel.Wheel.injectData != null) {
                MagicWheel.Input.data = MagicWheel.Wheel.injectData;
                MagicWheel.Wheel.injectData = null;
                Snsb.defer(ss.Delegate.create(this, function() {
                    var i = 0;
                    var $enum1 = ss.IEnumerator.getEnumerator(MagicWheel.Input.data.segs);
                    while ($enum1.moveNext()) {
                        var txt = $enum1.current;
                        if (i < this.wp.segs) {
                            this.drawTo(txt, i++);
                        }
                    }
                    if (!Snsb.isEmpty(MagicWheel.Input.data.were) && !String.isNullOrEmpty(MagicWheel.Input.data.were.trim())) {
                        this.slices[0].drawWere(MagicWheel.Input.data.were);
                    }
                    if (!Snsb.isEmpty(MagicWheel.Input.data.yatta) && !String.isNullOrEmpty(MagicWheel.Input.data.yatta.trim())) {
                        this.drawCenter(MagicWheel.Input.data.yatta);
                    }
                    this.balloons.reHeart();
                    MagicWheel.Yatta.onYatta();
                    if (MagicWheel.Wheel.onAfterCreateWheel != null) {
                        MagicWheel.Wheel.onAfterCreateWheel();
                    }
                    MagicWheel.Wheel.onAfterCreateWheel = null;
                    this.wheelComplete = true;
                }), -1);
            }
            else {
                if (MagicWheel.Wheel.onAfterCreateWheel != null) {
                    MagicWheel.Wheel.onAfterCreateWheel();
                }
                MagicWheel.Wheel.onAfterCreateWheel = null;
                this.wheelComplete = true;
            }
            if (!MagicWheel.Input.data.hideSegSelect) {
                MagicWheel.ReSpoke.addWidget();
            }
        }), 200);
        if (!$('#WheelSprite1', this.fwEl).length) {
            $("<div id='WheelSprite8'/>").prependTo(this.fwEl);
            $("<div id='WheelSprite7'/>").prependTo(this.fwEl);
            $("<div id='WheelSprite6'/>").prependTo(this.fwEl);
            $("<div id='WheelSprite5'/>").prependTo(this.fwEl);
            $("<div id='WheelSprite4'/>").prependTo(this.fwEl);
            $("<div id='WheelSprite3'/>").prependTo(this.fwEl);
            $("<div id='WheelSprite2'/>").prependTo(this.fwEl);
            $("<div id='WheelSprite1'/>").prependTo(this.fwEl);
        }
    },
    
    drawAllText: function MagicWheel_Wheel$drawAllText() {
        for (var i = 0; i < MagicWheel.Input.data.segs.length; i++) {
            this.reDrawSegAsync(MagicWheel.Input.data.segs[i] || '', i);
        }
        this.drawCenter(MagicWheel.Input.data.yatta);
    },
    
    drawTo: function MagicWheel_Wheel$drawTo(text, pieIdx, fn) {
        /// <param name="text" type="String">
        /// </param>
        /// <param name="pieIdx" type="Number" integer="true">
        /// </param>
        /// <param name="fn" type="Function">
        /// </param>
        if (this._drawToIng) {
            Snsb.defer(ss.Delegate.create(this, function() {
                this.drawTo(text, pieIdx, fn);
            }), 13);
            return;
        }
        this._drawToIng = true;
        this._px = this.wp.pxMax;
        this._pieIdx = pieIdx;
        this._pieText = text || '';
        this._words = this._pieText.split(' ');
        this._divs = this.slices[pieIdx].divs;
        MagicWheel.Input.data.segs[pieIdx] = text;
        this.fwEl.css({ color: this.style.textColor });
        this._drawText(ss.Delegate.create(this, function() {
            this._drawTextLoop(ss.Delegate.create(this, function() {
                var ln = 0;
                var $enum1 = ss.IEnumerator.getEnumerator(this._divs);
                while ($enum1.moveNext()) {
                    var div = $enum1.current;
                    var r = this._boxes[ln++].r;
                    SudoNsb.ArcText.bend(div, { radius: r });
                }
                if (fn != null) {
                    fn();
                }
                this._drawToIng = false;
            }));
        }));
    },
    
    _drawTextLoop: function MagicWheel_Wheel$_drawTextLoop(fn) {
        /// <param name="fn" type="Function">
        /// </param>
        if (this._px > 35) {
            this._px -= 4;
        }
        else if (this._px > 20) {
            this._px -= 3;
        }
        else if (this._px > 12) {
            this._px -= 2;
        }
        else {
            this._px--;
        }
        if (this._retry && this._px >= 8) {
            Snsb.defer(ss.Delegate.create(this, function() {
                this._drawText(ss.Delegate.create(this, function() {
                    this._drawTextLoop(fn);
                }));
            }), 5);
            return;
        }
        fn();
    },
    
    _drawText: function MagicWheel_Wheel$_drawText(fn) {
        /// <param name="fn" type="Function">
        /// </param>
        if (this._divs.length > 0) {
            var $enum1 = ss.IEnumerator.getEnumerator(this._divs);
            while ($enum1.moveNext()) {
                var d = $enum1.current;
                d.remove();
            }
            this._divs.clear();
        }
        this._boxes.clear();
        this.wp.slicePadding = 15 - this.wp.segs;
        this._lh = parseInt(this._px * 1.25);
        var sw = 360 / this.wp.segs / 2;
        var df = 3.5 / (this._lh / 64);
        var slst = 270 - sw + this.wp.slicePadding;
        var slen = 270 + sw - this.wp.slicePadding;
        var tm = 14;
        var tp;
        switch (this.wp.segs) {
            case 2:
                tp = -245;
                break;
            case 3:
                tp = -90;
                break;
            case 4:
                tp = -45;
                break;
            case 5:
                tp = -24;
                break;
            case 6:
                tp = -16;
                break;
            case 7:
                tp = -12;
                break;
            case 8:
                tp = -6;
                break;
            case 9:
                tp = -4;
                break;
            case 10:
                tp = -3;
                break;
            default:
                tp = 0;
                break;
        }
        for (var i = this.wp.radius - this._lh - tm; i > this.wp.innerRadius; i -= this._lh) {
            var x1 = this.cx - this.wp.pad - 2 - 8 + Math.cos(NsbMath.Trig.toRadians(slst)) * i;
            var y1 = this.cy - this.wp.pad - 2 + tp + Math.sin(NsbMath.Trig.toRadians(slst)) * i;
            var x2 = this.cx + Math.cos(NsbMath.Trig.toRadians(slen)) * i;
            var box = new SudoNsb.Cpt(x1, y1 - this._lh, x2 - x1 - this.wp.pad - 2, this._lh, i);
            this._boxes.add(box);
        }
        this._printWrap();
        fn();
    },
    
    _printWrap: function MagicWheel_Wheel$_printWrap() {
        this._wordIdx = 0;
        this._retry = false;
        var $enum1 = ss.IEnumerator.getEnumerator(this._boxes);
        while ($enum1.moveNext()) {
            var cpt = $enum1.current;
            var st = this._wordIdx;
            this._boxWrap(parseInt(cpt.w));
            if (this._retry) {
                return;
            }
            var str = this._words.extract(st, this._wordIdx - st).join(' ').trim();
            var div = $("<div class='piebox nowrap'/>").data('txt', str).html(str).css({ top: cpt.l, left: cpt.t, width: cpt.w, height: cpt.h, 'line-height': this._lh + 'px', 'font-size': this._px + 'px' }).appendTo(this.slices[this._pieIdx].divPiece);
            this._divs.add(div);
            if (this._wordIdx >= this._words.length) {
                return;
            }
        }
        this._retry = true;
    },
    
    _boxWrap: function MagicWheel_Wheel$_boxWrap(width) {
        /// <param name="width" type="Number" integer="true">
        /// </param>
        if (this._boxer == null) {
            this._boxer = $("<span class=''></span>").css({ 'line-height': this._lh + 'px', 'font-size': this._px + 'px', padding: 0, margin: 0, position: 'absolute', top: -1000, left: -1000 }).appendTo('body');
        }
        else {
            this._boxer.css({ 'line-height': this._lh + 'px', 'font-size': this._px + 'px' });
        }
        for (var i = this._wordIdx; i < this._words.length; i++) {
            var str = this._words.extract(this._wordIdx, i + 1 - this._wordIdx).join(' ');
            this._boxer.text(str);
            if (this._boxer.width() > width) {
                if (i <= this._wordIdx) {
                    i++;
                    this._retry = true;
                }
                this._wordIdx = i;
                return;
            }
        }
        this._wordIdx = this._words.length;
    },
    
    rotate: function MagicWheel_Wheel$rotate(el, angle) {
        /// <param name="el" type="jQueryObject">
        /// </param>
        /// <param name="angle" type="Number">
        /// </param>
        this.rotated = angle + 90;
        this.rotated = (this.rotated >= 360) ? 360 - this.rotated : this.rotated;
        MagicWheel.Wheel.rawRotate(el, -angle);
    },
    
    onClick: function MagicWheel_Wheel$onClick(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        if (e.shiftKey) {
            this.fillTestData();
            Snsb.cancelEvent(e);
            return;
        }
        SudoNsb.ToolTips.clearTips();
        var xd = (e.pageX - this.get_canvasLeft()) - this._canvasCx;
        var yd = this._canvasCy - (e.pageY - this.get_canvasTop());
        var radius = Math.sqrt((xd * xd) + (yd * yd));
        if (radius > this.wp.radius) {
            return;
        }
        if (radius <= this.wp.innerRadius) {
            Snsb.cancelEvent(e);
            SudoNsb.ToolTips.removeTip($('#CenterText'), false);
            if (this.wp.onCenterClick != null) {
                this._innerClickDone = true;
                this.wp.onCenterClick();
                return;
            }
            this._innerClickDone = true;
            if (Snsb.isEmpty(MagicWheel.Input.data.were) && !this.wp.skipWere) {
                this.slices[0].editWere();
            }
            else if (!this.wp.skipYatta) {
                this.slices[0].editCenter();
            }
            else {
                this.slices[0].edit();
            }
            return;
        }
        var deg = this.xyToDeg(xd, yd);
        deg += this.currentRotation;
        while (deg < 0) {
            deg += 360;
        }
        while (deg > 359) {
            deg -= 360;
        }
        var slice = this.degToSegment(deg);
        ss.Debug.assert(slice < this.wp.segs, 'slice index out of range');
        if (this.wp.onPieClick != null) {
            this.wp.onPieClick(slice);
        }
        else {
            this.slices[slice].edit();
        }
    },
    
    _onClear: function MagicWheel_Wheel$_onClear(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        if (this._clearing) {
            return;
        }
        this._clearing = true;
        MagicWheel.Yatta.unYatta();
        this.balloons.clear();
        SudoNsb.Dom.unFocus();
        MagicWheel.My.ping('EraseFw', ss.Delegate.create(this, function() {
            MagicWheel.Input.eraseAll(this);
            this.spinWheel(ss.Delegate.create(this, function() {
                MagicWheel.Wheel.reWheel();
                SudoNsb._memes.reshow();
                this._clearing = false;
            }), 360, 2000);
        }));
    },
    
    _onSave: function MagicWheel_Wheel$_onSave(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        if (this._saving) {
            return;
        }
        this._saving = true;
        if (!Snsb.get_isPxUser()) {
            SudoNsb.Dialog.aw(SudoNsb.Await.get_asyncAw(), $('<div>Please log in to save and share wheels.</div>'), { okFace: 'Login', cancelBtn: true, okFn: ss.Delegate.create(this, function() {
                SudoNsb.PxUser.tryLogin(ss.Delegate.create(this, function() {
                    this._onSave(e);
                }));
            }) });
            this._saving = false;
            return;
        }
        SudoNsb.Dom.unFocus();
        new SudoNsb.Await().addDl(ss.Delegate.create(this, function(aw) {
            SudoNsb.Dialog.aw(aw, $('<div>' + "\r\n<h3>You can</h3>\r\n<ol class='SaveMsg'>\r\n<li>Save your wheel privately so that you can access it later.</li>\r\n<li>Share a copy of your wheel which can be viewed by others and shared on social networks.</li>\r\n<li>Copy and Paste the text of your wheel.</li>\r\n</ol>\r\n" + '</div>'), { okFace: 'cancel', onClose: ss.Delegate.create(this, function() {
                this._saving = false;
            }), buttons: [{ text: 'save for me', click: ss.Delegate.create(this, this._onSaveForMe) }, { text: 'save and share', click: ss.Delegate.create(this, this._onSaveAndShare) }, { text: 'copy text', click: ss.Delegate.create(this, this._onTextCopy) }] });
        })).commit();
    },
    
    _onSaveForMe: function MagicWheel_Wheel$_onSaveForMe(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        SudoNsb.PxUser.tryLogin(function(success) {
            if (success) {
                new SudoNsb.Await().addFn(Surface.spinner, true).addDl(function(aw) {
                    SqlThings.storeIdTopicAw(aw, '/Pnx/Item/FocusWheel', MagicWheel.Input.data, true);
                }).addFn(Surface.spinner, false).commit();
            }
        });
    },
    
    _onSaveAndShare: function MagicWheel_Wheel$_onSaveAndShare(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        SudoNsb.PxUser.tryLogin(function(success) {
            if (success) {
                new SudoNsb.Await().addFn(Surface.spinner, true).addDl(function(aw) {
                    SqlThings.storeIdTopicAw(aw, '/Pnx/Item/FocusWheel', MagicWheel.Input.data, false);
                }).addFn(Surface.spinner, false).commit();
            }
        });
    },
    
    _onTextCopy: function MagicWheel_Wheel$_onTextCopy(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        var ot = '';
        ot += String.format('{0}\r\n\r\n', MagicWheel.Input.data.were);
        ot += String.format('{0}\r\n\r\n', MagicWheel.Input.data.yatta);
        var cnt = 0;
        var $enum1 = ss.IEnumerator.getEnumerator(MagicWheel.Input.data.segs);
        while ($enum1.moveNext()) {
            var line = $enum1.current;
            ot += String.format('{0}. {1}\r\n', ++cnt, line);
        }
        Surface.hider(true);
        var stl = { position: 'absolute', top: this.fwOuterEl.offset().top, left: this.fwOuterEl.offset().left, width: this.fwOuterEl.width(), height: this.fwOuterEl.height() };
        var dxl = $('<div/>').appendTo(document.body).css(stl);
        var txl = $("<textarea class='OnTextCopy AboveHider'/>").val(ot).appendTo(dxl);
        SudoNsb.Text.selectRange(txl, 0);
        SudoNsb.Closer.btn(dxl, function() {
            dxl.remove();
            Surface.hider(false);
        });
    },
    
    reDrawSegAsync: function MagicWheel_Wheel$reDrawSegAsync(text, seg) {
        /// <param name="text" type="String">
        /// </param>
        /// <param name="seg" type="Number" integer="true">
        /// </param>
        Snsb.defer(ss.Delegate.create(this, function() {
            this.drawTo(text, seg);
        }), seg * parseInt(800 / this.wp.segs - 30));
    },
    
    degToSegment: function MagicWheel_Wheel$degToSegment(deg) {
        /// <param name="deg" type="Number">
        /// </param>
        /// <returns type="Number" integer="true"></returns>
        var slice = parseInt(deg * this.wp.segs / 360);
        if (!!slice) {
            slice = this.wp.segs - slice;
        }
        return slice;
    },
    
    segmentToDeg: function MagicWheel_Wheel$segmentToDeg(seg) {
        /// <param name="seg" type="Number" integer="true">
        /// </param>
        /// <returns type="Number"></returns>
        if (!!seg) {
            seg = this.wp.segs - seg;
        }
        var deg = seg * 360 / this.wp.segs;
        deg += this.rotated;
        if (deg >= 360) {
            deg -= 360;
        }
        else if (deg < 0) {
            deg += 360;
        }
        return deg;
    },
    
    degToXy: function MagicWheel_Wheel$degToXy(deg, rad) {
        /// <param name="deg" type="Number">
        /// </param>
        /// <param name="rad" type="Number">
        /// </param>
        /// <returns type="Array"></returns>
        var x = Math.round(rad * Math.cos(NsbMath.Trig.toRadians(deg)));
        var y = Math.round(rad * Math.sin(NsbMath.Trig.toRadians(deg)));
        return [x, y];
    },
    
    xyToDeg: function MagicWheel_Wheel$xyToDeg(x, y) {
        /// <param name="x" type="Number" integer="true">
        /// </param>
        /// <param name="y" type="Number" integer="true">
        /// </param>
        /// <returns type="Number"></returns>
        var fx = 360 / this.wp.segs;
        var deg = NsbMath.Trig.toAngle(x, y) + (fx / 2) - this.rotated;
        if (deg >= 360) {
            deg -= 360;
        }
        else if (deg < 0) {
            deg += 360;
        }
        deg = parseInt(deg / fx) * fx;
        return deg;
    },
    
    drawCenter: function MagicWheel_Wheel$drawCenter(text, fadeIn) {
        /// <param name="text" type="String">
        /// </param>
        /// <param name="fadeIn" type="Number" integer="true">
        /// </param>
        if (!window.jQuery.ui) {
            Snsb.defer(ss.Delegate.create(this, function() {
                this.drawCenter(text, fadeIn);
            }), 13);
            return;
        }
        var r = this.wp.innerRadius * 1.5;
        $('#CenterText').remove();
        var el = $("<div id='CenterText' title='click to start your wheel'/>").css({ color: this.style.textColor }).css({ width: r, height: r }).html("<div class='CenterCenter' style='width:" + r + 'px;height:' + r + "px'>" + (text || this.wp.clickHere) + '</div>').appendTo('#FwOuter');
        if (!this._innerClickDone) {
            SudoNsb.ToolTips.addTo(el);
        }
        el.position({ of: '#FwOuter' });
        el.find('div').css(SudoNsb.Text.fitPx(el, 1.25));
        if (fadeIn > 0) {
            el.hide().fadeIn(fadeIn);
        }
    },
    
    drawWheel: function MagicWheel_Wheel$drawWheel() {
        this.drawWhiteBack();
        var seg = 360 / this.wp.segs;
        var shift = seg / 2 - this.wp.initialRotation;
        this._ctx.lineWidth = this.style.lineWidth;
        this._ctx.fillStyle = this.style.grd;
        this._ctx.strokeStyle = this.style.lineColor;
        for (var i = shift; i < 360 + shift; i += seg) {
            this._ctx.beginPath();
            this._ctx.moveTo(this.cx, this.cy);
            this._ctx.arc(this.cx, this.cy, this.wp.radius, NsbMath.Trig.toRadians(i), NsbMath.Trig.toRadians(i + seg));
            this._ctx.lineTo(this.cx, this.cy);
            this._ctx.stroke();
            this._ctx.fill();
            this._ctx.closePath();
        }
    },
    
    drawWhiteBack: function MagicWheel_Wheel$drawWhiteBack() {
        var ctx = this._canvasBack.getContext('2d');
        ctx.moveTo(this.cx, this.cy);
        ctx.beginPath();
        ctx.lineWidth = 0;
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#fff';
        ctx.arc(this.cx, this.cy, this.wp.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    },
    
    drawInnerCircle: function MagicWheel_Wheel$drawInnerCircle() {
        this._ctx.moveTo(this.cx, this.cy);
        this._ctx.beginPath();
        this._ctx.lineWidth = (this.style.innerCircleBorder || this.style.lineWidth);
        this._ctx.fillStyle = this.style.centerBack;
        this._ctx.strokeStyle = this.style.lineColor;
        this._ctx.arc(this.cx, this.cy, this.wp.innerRadius, 0, 2 * Math.PI);
        this._ctx.stroke();
        this._ctx.fill();
    },
    
    drawCursorByDeg: function MagicWheel_Wheel$drawCursorByDeg(deg, colorKey) {
        /// <param name="deg" type="Number" integer="true">
        /// </param>
        /// <param name="colorKey" type="String">
        /// </param>
        this.drawCursorSlice(deg, deg + (360 / this.wp.segs), colorKey);
    },
    
    drawCursorSlice: function MagicWheel_Wheel$drawCursorSlice(degStart, degEnd, colorKey) {
        /// <param name="degStart" type="Number" integer="true">
        /// </param>
        /// <param name="degEnd" type="Number" integer="true">
        /// </param>
        /// <param name="colorKey" type="String">
        /// </param>
        this.eraseCursor();
        var color = this.style[colorKey || MagicWheel.AppStyle.cursorColorKey];
        this.set_cursorIsShown(true);
        this._cursorDegStart = degStart;
        this._cursorDegEnd = degEnd;
        this._cursorColorKey = colorKey;
        this._ctx.lineWidth = 1;
        this._ctx.fillStyle = color;
        this._ctx.strokeStyle = 'transparent';
        this._ctx.beginPath();
        this._ctx.moveTo(this.cx, this.cy);
        this._ctx.arc(this.cx, this.cy, this.wp.radius, NsbMath.Trig.toRadians(degStart), NsbMath.Trig.toRadians(degEnd));
        this._ctx.fill();
        this._ctx.closePath();
        this.drawInnerCircle();
    },
    
    drawCursorBySeg: function MagicWheel_Wheel$drawCursorBySeg(seg, color) {
        /// <param name="seg" type="Number" integer="true">
        /// </param>
        /// <param name="color" type="String">
        /// </param>
        this.drawCursorByDeg(this.cursorSegToDeg(seg), color);
    },
    
    cursorSegToDeg: function MagicWheel_Wheel$cursorSegToDeg(seg) {
        /// <param name="seg" type="Number" integer="true">
        /// </param>
        /// <returns type="Number" integer="true"></returns>
        var sw = 360 / this.wp.segs;
        var deg = (seg * sw) - (sw / 2) - parseInt((this.rotated - (this.rotated - 90)));
        return deg;
    },
    
    eraseCursor: function MagicWheel_Wheel$eraseCursor() {
        this.drawWheel();
        this.drawInnerCircle();
        this.set_cursorIsShown(false);
    },
    
    reDrawCursor: function MagicWheel_Wheel$reDrawCursor() {
        if (this.get_cursorIsShown()) {
            this.drawCursorSlice(this._cursorDegStart, this._cursorDegEnd, this._cursorColorKey);
        }
    },
    
    drawControls: function MagicWheel_Wheel$drawControls() {
        $('#Choosers, #ClearBtn, #SaveBtn').remove();
        var coo = $("<div id='Choosers'/>").appendTo('#FwOuter');
        var $dict1 = MagicWheel.AppStyle.themes;
        for (var $key2 in $dict1) {
            var p = { key: $key2, value: $dict1[$key2] };
            $("<div class='Swatch'/>").addClass(p.key).appendTo(coo);
        }
        var i = 0;
        var myClick = ss.Delegate.create(this, function(e) {
            this.style[$(e.target).data('styleName')]();
            Snsb.cancelEvent(e);
        });
        var swatches = $('#Choosers .Swatch');
        var $dict3 = MagicWheel.AppStyle.themes;
        for (var $key4 in $dict3) {
            var p = { key: $key4, value: $dict3[$key4] };
            swatches.eq(i++).data('styleName', p.key).on('click', myClick).attr('title', MagicWheel.AppStyle.themes[p.key]['title'] + ' Theme').css('background', MagicWheel.AppStyle.themes[p.key]['background']);
        }
        $("<button id='ClearBtn'>erase</button>").appendTo('#FwOuter').click(ss.Delegate.create(this, this._onClear));
        if (Config.offline || MagicWheel.Main.ignoreUserWhenSaving) {
            $("<button id='SaveBtn'>copy text</button>").appendTo('#FwOuter').click(ss.Delegate.create(this, this._onTextCopy));
        }
        else {
            $("<button id='SaveBtn'>save / share</button>").appendTo('#FwOuter').click(ss.Delegate.create(this, this._onSave));
        }
        SudoNsb.ToolTips.addTo($('div.Swatch'));
    },
    
    clearCanvas: function MagicWheel_Wheel$clearCanvas() {
        this._ctx.save();
        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
        this._ctx.restore();
    },
    
    spinWheel: function MagicWheel_Wheel$spinWheel(complete, deg, duration) {
        /// <param name="complete" type="Function">
        /// </param>
        /// <param name="deg" type="Number">
        /// </param>
        /// <param name="duration" type="Number" integer="true">
        /// </param>
        var wasAt = this.currentRotation;
        this.currentRotation = wasAt + deg;
        SudoNsb.AnimateRotate.aRotate(this.fwEl, this.currentRotation, { duration: duration, complete: complete, easing: 'easeOutSine' }, wasAt);
    },
    
    fillTestData: function MagicWheel_Wheel$fillTestData() {
        this.slices[0].drawWere(this._txts[0]);
        this.drawCenter(this._txts[1]);
        for (var i = 0; i < this.wp.segs; i++) {
            if (this._txts[i + 2] === '-') {
                break;
            }
            this.drawTo(this._txts[i + 2], i);
        }
    }
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.Input

MagicWheel.Input = function MagicWheel_Input(wheel, seg, divPiece) {
    /// <param name="wheel" type="MagicWheel.Wheel">
    /// </param>
    /// <param name="seg" type="Number" integer="true">
    /// </param>
    /// <param name="divPiece" type="jQueryObject">
    /// </param>
    /// <field name="_css" type="String" static="true">
    /// </field>
    /// <field name="_editing" type="jQueryObject" static="true">
    /// </field>
    /// <field name="inputChangeEv" type="String" static="true">
    /// </field>
    /// <field name="data" type="MagicWheel.FwData" static="true">
    /// </field>
    /// <field name="_were" type="jQueryObject" static="true">
    /// </field>
    /// <field name="_wereMetrics" type="OnScreen" static="true">
    /// </field>
    /// <field name="divs" type="Array">
    /// </field>
    /// <field name="_seg" type="Number" integer="true">
    /// </field>
    /// <field name="_wheel" type="MagicWheel.Wheel">
    /// </field>
    /// <field name="divPiece" type="jQueryObject">
    /// </field>
    /// <field name="_cursorDeg" type="Number" integer="true">
    /// </field>
    /// <field name="_p" type="jQueryPosition">
    /// </field>
    /// <field name="_timesShowing" type="Boolean">
    /// </field>
    /// <field name="_wasEmpty" type="Boolean">
    /// </field>
    this.divs = [];
    this._wheel = wheel;
    this._seg = seg;
    SudoNsb.PrefixFree.addStyleOnce((MagicWheel.Input).get_fullName(), "\r\ntextarea.Input {\r\n    width: 100%;\r\n    height: 100%;\r\n    margin: 0;\r\n    padding: 5px 8px;\r\n    font-size: 16px;\r\n    line-height: 23px;\r\n    font-family: 'PT serif', Georgia,'Times New Roman';\r\n}\r\n#InputOuter {\r\n    position: absolute;\r\n    width: 286px;\r\n    height: 167px;\r\n    z-index: 10;\r\n    box-shadow: 2px 3px 7px 3px rgba(34, 31, 31, 0.45);\r\n}\r\n#InputOuter:after {\r\n    content: 'press enter to move on';\r\n    display: block;\r\n    position: absolute;\r\n    margin: 0 0 0 50%;\r\n    padding: 0;\r\n    width: 180px;\r\n    height: 15px;\r\n    text-align: center;\r\n    bottom: -18px;\r\n    left: -90px;\r\n    color: rgba(0,0,0,.54);\r\n    background-color: rgba(255,255,255,.65);\r\n    font-size: 13px;\r\n    line-height: 12px;\r\n    z-index: 900;\r\n}\r\n#InputOuter .HowTo {\r\n    display: block;\r\n    position: absolute;\r\n    margin: 0 0 0 50%;\r\n    padding: 4px 6px;\r\n    width: 90%;\r\n    height: auto;\r\n    text-align: center;\r\n    top: 102%;\r\n    left: -45%;\r\n    color: rgba(0,0,0,.54);\r\n    background-color: rgba(248, 247, 231, 1);\r\n    font-size: 14px;\r\n    line-height: 1;\r\n    font-style: italic;\r\n    font-weight: bold;\r\n    box-sizing: border-box;\r\n    z-index: 901;\r\n    -webkit-box-shadow: 2px 3px 7px 3px rgba(34, 31, 31, 0.45);\r\n    -moz-box-shadow: 2px 3px 7px 3px rgba(34, 31, 31, 0.45);\r\n    box-shadow: 2px 3px 7px 3px rgba(34, 31, 31, 0.45);\r\n}\r\n#Fireworks {\r\n    position: absolute;\r\n    top: 0;\r\n    left: 135px;\r\n    width: 128px;\r\n    height: 128px;\r\n}\r\n#Fireworks2 {\r\n    position: absolute;\r\n    top: 0;\r\n    left: 120px;\r\n    width: 100px;\r\n    height: 125px;\r\n}\r\n.WereBox {\r\n    position: absolute;\r\n    display: block;\r\n    width: 120px;\r\n    height: 120px;\r\n    margin: 0;\r\n    padding: 0;\r\n    font-family: 'PT serif', Georgia, 'Times New Roman';\r\n    font-size: 32px;\r\n    line-height: 40px;\r\n    font-weight: normal;\r\n    border: 1px solid #CCC;\r\n    -webkit-border-radius: 8px;\r\n    -moz-border-radius: 8px;\r\n    border-radius: 8px;\r\n    box-sizing: border-box;\r\n    z-index: 10;\r\n}\r\n.WereBoxInner {\r\n    position: relative;\r\n    display: table-cell;\r\n    width: 100%;\r\n    height: 100%;\r\n    margin: 0;\r\n    padding: 4%;\r\n    vertical-align: middle;\r\n    text-align: center;\r\n    box-sizing: border-box;\r\n}\r\n");
    if (MagicWheel.Input.data == null) {
        MagicWheel.Input.data = new MagicWheel.FwData().setSegs(this._wheel.wp.segs);
    }
    MagicWheel.Input.data.keytypename = Type.getInstanceType(this._wheel.wp).get_fullName();
    this.divPiece = divPiece;
}
MagicWheel.Input.get_first = function MagicWheel_Input$get_first() {
    /// <value type="MagicWheel.Input"></value>
    return MagicWheel.Wheel.instance.slices[0];
}
MagicWheel.Input.get_wereEl = function MagicWheel_Input$get_wereEl() {
    /// <value type="jQueryObject"></value>
    return MagicWheel.Input._were;
}
MagicWheel.Input.get_fullSegs = function MagicWheel_Input$get_fullSegs() {
    /// <value type="Number" integer="true"></value>
    var cnt = 0;
    var $enum1 = ss.IEnumerator.getEnumerator(MagicWheel.Input.data.segs);
    while ($enum1.moveNext()) {
        var txt = $enum1.current;
        if (!String.isNullOrEmpty(txt)) {
            cnt++;
        }
    }
    return cnt;
}
MagicWheel.Input.get_totalWords = function MagicWheel_Input$get_totalWords() {
    /// <value type="Number" integer="true"></value>
    var words = 0;
    var $enum1 = ss.IEnumerator.getEnumerator(MagicWheel.Input.data.segs);
    while ($enum1.moveNext()) {
        var txt = $enum1.current;
        if (!String.isNullOrEmpty(txt)) {
            words += txt.split(' ').length;
        }
    }
    return words;
}
MagicWheel.Input.get_yattaWords = function MagicWheel_Input$get_yattaWords() {
    /// <value type="Number" integer="true"></value>
    return (String.isNullOrEmpty(MagicWheel.Input.data.yatta)) ? 0 : MagicWheel.Input.data.yatta.split(' ').length;
}
MagicWheel.Input.clear = function MagicWheel_Input$clear() {
    MagicWheel.Input.data = null;
    MagicWheel.Input._were = null;
    MagicWheel.Input._wereMetrics = null;
    if (MagicWheel.Input._editing != null) {
        MagicWheel.Input._editing.closest('#InputOuter').remove();
        MagicWheel.Input._editing = null;
    }
}
MagicWheel.Input.triggerChanged = function MagicWheel_Input$triggerChanged() {
    $(document).trigger('WheelInputChangeEv');
}
MagicWheel.Input.nextEmptySeg = function MagicWheel_Input$nextEmptySeg(seg) {
    /// <summary>
    /// Passed seg if it is empty or the next empty seg starting at 0.
    /// The first seg (0) will be returned if all are empty and -1 if all are full.
    /// </summary>
    /// <param name="seg" type="Number" integer="true">
    /// The seg.
    /// </param>
    /// <returns type="Number" integer="true"></returns>
    ss.Debug.assert(MagicWheel.Input.data != null, 'Timing off - Data is null');
    var segs = MagicWheel.Input.data.segs;
    if (String.isNullOrEmpty(segs[seg])) {
        return seg;
    }
    var idx = 0;
    var $enum1 = ss.IEnumerator.getEnumerator(segs);
    while ($enum1.moveNext()) {
        var s = $enum1.current;
        if (String.isNullOrEmpty(s)) {
            return idx;
        }
        idx++;
    }
    return -1;
}
MagicWheel.Input.editNext = function MagicWheel_Input$editNext() {
    MagicWheel.Wheel.afterWheel(function() {
        var seg = MagicWheel.Input.nextEmptySeg(0);
        if (seg > 0) {
            MagicWheel.Wheel.instance.slices[seg].edit();
        }
        else if (seg < 0) {
            MagicWheel.Yatta.onYatta();
        }
    });
}
MagicWheel.Input.eraseAll = function MagicWheel_Input$eraseAll(wheel) {
    /// <param name="wheel" type="MagicWheel.Wheel">
    /// </param>
    MagicWheel.Wheel.instance.eraseCursor();
    MagicWheel.ShowTimes.removeAll();
    MagicWheel.Yatta.unDim();
    for (var i = 0; i < MagicWheel.Input.data.segs.length; i++) {
        MagicWheel.Input.data.segs[i] = '';
        wheel.reDrawSegAsync('', i);
    }
    MagicWheel.Input.data.yatta = MagicWheel.Input.data.were = '';
    if (MagicWheel.Input._were != null) {
        MagicWheel.Input._were.remove();
        MagicWheel.Input._were = null;
        MagicWheel.Input._wereMetrics = null;
    }
    MagicWheel.Input.triggerChanged();
}
MagicWheel.Input.prototype = {
    _seg: 0,
    _wheel: null,
    divPiece: null,
    _cursorDeg: 0,
    _p: null,
    _timesShowing: false,
    _wasEmpty: false,
    
    get_isAllFilled: function MagicWheel_Input$get_isAllFilled() {
        /// <value type="Boolean"></value>
        var $enum1 = ss.IEnumerator.getEnumerator(MagicWheel.Input.data.segs);
        while ($enum1.moveNext()) {
            var s = $enum1.current;
            if (Snsb.isEmpty(s)) {
                return false;
            }
        }
        return true;
    },
    
    get_isAnyFilled: function MagicWheel_Input$get_isAnyFilled() {
        /// <value type="Boolean"></value>
        if (MagicWheel.Input.data == null || !MagicWheel.Input.data.segs.length) {
            return false;
        }
        var $enum1 = ss.IEnumerator.getEnumerator(MagicWheel.Input.data.segs);
        while ($enum1.moveNext()) {
            var s = $enum1.current;
            if (!Snsb.isEmpty(s)) {
                return true;
            }
        }
        return false;
    },
    
    updateDisplay: function MagicWheel_Input$updateDisplay(divPiece) {
        /// <param name="divPiece" type="jQueryObject">
        /// </param>
        this.divPiece = divPiece;
    },
    
    _addPrompts: function MagicWheel_Input$_addPrompts(el, seg) {
        /// <param name="el" type="jQueryObject">
        /// </param>
        /// <param name="seg" type="Number" integer="true">
        /// </param>
        var key = ['were', 'yatta', 'first', 'second', 'third', 'fourth'][seg + 2];
        var prompt = this._wheel.wp.prompts[key] || this._wheel.wp.prompts['second'];
        var example = this._wheel.wp.examples[key];
        if (!String.isNullOrEmpty(prompt)) {
            el.attr('placeholder', prompt);
        }
        if (!String.isNullOrEmpty(example)) {
            $("<div class='HowTo'/>").appendTo(el.parent()).html('Example: ' + example);
        }
    },
    
    edit: function MagicWheel_Input$edit() {
        Snsb.defer(SudoNsb.ToolTips.clearTips, 20);
        MagicWheel.Yatta.unYatta();
        if (MagicWheel.Input._editing != null && MagicWheel.Input._editing.length > 0) {
            MagicWheel.Input._editing.parent().remove();
        }
        var sw = 360 / this._wheel.wp.segs;
        this._cursorDeg = (this._seg * sw) - (sw / 2) - parseInt((this._wheel.rotated - (this._wheel.rotated - 90)));
        var text = MagicWheel.Input.data.segs[this._seg] || '';
        this._wasEmpty = String.isNullOrEmpty(text);
        var outer = $("<div id='InputOuter'><textarea class='Input'></textarea></div>").appendTo('#FwOuter');
        MagicWheel.Input._editing = $('.Input', outer).val(text).keydown(ss.Delegate.create(this, this._onSliceKey)).blur(ss.Delegate.create(this, this._endEdit)).addClass('inputBlur');
        this._addPrompts(MagicWheel.Input._editing, this._seg);
        var nextSeg = (this._seg + 1 === this._wheel.wp.segs) ? 0 : this._seg + 1;
        var xy = this.segCenter(outer, nextSeg, this._wheel.wp.radius * 0.55);
        outer.css({ top: xy[1], left: xy[0] });
        this._wheel.drawCursorByDeg(this._cursorDeg);
        Snsb.defer(function() {
            SudoNsb.Dom.scrollInViewAw(SudoNsb.Await.get_asyncAw(), outer);
            MagicWheel.Input._editing.click().focus();
            SudoNsb.Text.selectRange(MagicWheel.Input._editing, text.length, text.length);
        }, 5);
    },
    
    _endEdit: function MagicWheel_Input$_endEdit(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        Snsb.cancelEvent(e);
        var seg = this._seg;
        var wasEmpty = this._wasEmpty;
        var text = MagicWheel.Input._editing.val().trim();
        MagicWheel.Input.data.segs[seg] = text;
        MagicWheel.Input._editing.parent().remove();
        MagicWheel.Input._editing = null;
        this._wheel.eraseCursor();
        MagicWheel.Input.triggerChanged();
        if (seg < this._wheel.wp.segs - 1 && e.type === 'keydown') {
            Snsb.defer(ss.Delegate.create(this, function() {
                var nxtSeg = (String.isNullOrEmpty(text)) ? seg : seg + 1;
                this._wheel.slices[nxtSeg].edit();
            }));
        }
        Snsb.defer(ss.Delegate.create(this, function() {
            this._wheel.drawTo(text, seg, ss.Delegate.create(this, function() {
                if (wasEmpty && !String.isNullOrEmpty(text)) {
                    this.wereShrink();
                    this._wheel.balloons.addOne(seg, function() {
                        Snsb.defer(MagicWheel.Yatta.onYatta, 50);
                    });
                }
                if (this._wheel.wp.onBlur != null) {
                    this._wheel.wp.onBlur();
                }
            }));
        }), 200);
    },
    
    editWere: function MagicWheel_Input$editWere(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        SudoNsb.ToolTips.clearTips();
        MagicWheel.Yatta.unYatta();
        if (MagicWheel.Input._editing != null && MagicWheel.Input._editing.length > 0) {
            MagicWheel.Input._editing.parent().remove();
        }
        var text = MagicWheel.Input.data.were || '';
        if (String.isNullOrEmpty(text)) {
            MagicWheel.My.ping('StartFw');
        }
        var outer = $("<div id='InputOuter' class='InputWere'><textarea class='Input'></textarea></div>").appendTo(document.body);
        MagicWheel.Input._editing = $('.Input', outer).val(text).keydown(ss.Delegate.create(this, this._onWereKey)).blur(ss.Delegate.create(this, this._endWereEdit)).addClass('inputBlur');
        this._addPrompts(MagicWheel.Input._editing, -2);
        outer.position({ my: 'left top', at: 'left-52 top+8', of: '#FwOuter', collision: 'none' });
        Snsb.defer(function() {
            SudoNsb.Dom.scrollInViewAw(SudoNsb.Await.get_asyncAw(), MagicWheel.Input._editing);
            SudoNsb.Text.selectRange(MagicWheel.Input._editing, text.length, text.length);
            MagicWheel.Input._editing.focus();
        }, 5);
    },
    
    _endWereEdit: function MagicWheel_Input$_endWereEdit(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        this._p = MagicWheel.Input._editing.offset();
        var txt = MagicWheel.Input._editing.val().trim();
        MagicWheel.Input._editing.parent().remove();
        MagicWheel.Input._editing = null;
        if (Snsb.isEmpty(txt)) {
            this.editWere();
        }
        else {
            this.drawWere(txt);
        }
        Snsb.cancelEvent(e);
    },
    
    drawWere: function MagicWheel_Input$drawWere(were) {
        /// <param name="were" type="String">
        /// </param>
        if (this._p == null) {
            this._p = MagicWheel.Wheel.instance.fwOuterEl.offset();
        }
        MagicWheel.Input.data.were = were;
        MagicWheel.Input.triggerChanged();
        if (MagicWheel.Input._were != null) {
            MagicWheel.Input._were.remove();
        }
        MagicWheel.Input._were = $("<div class='WereBox'><div class='WereBoxInner'>" + MagicWheel.Input.data.were + '</div></div>').css({ top: this._p.top, left: this._p.left }).appendTo(document.body).click(ss.Delegate.create(this, this.editWere));
        MagicWheel.Input._were.css(SudoNsb.Text.fitPx(MagicWheel.Input._were, 1.25));
        var pm = SudoNsb.Text.pxPerEm(MagicWheel.Input._were);
        MagicWheel.Input._were.find('div').css({ width: MagicWheel.Input._were.width() / pm + 'em', height: MagicWheel.Input._were.height() / pm + 'em' });
    },
    
    editCenter: function MagicWheel_Input$editCenter() {
        SudoNsb.ToolTips.clearTips();
        MagicWheel.Yatta.unYatta();
        if (MagicWheel.Input._editing != null && MagicWheel.Input._editing.length > 0) {
            MagicWheel.Input._editing.parent().remove();
        }
        var text = MagicWheel.Input.data.yatta || '';
        var outer = $("<div id='InputOuter'><textarea class='Input'></textarea></div>").appendTo('#FwOuter');
        MagicWheel.Input._editing = $('.Input', outer).val(text).keydown(ss.Delegate.create(this, this._onCenterKey)).blur(ss.Delegate.create(this, this._endCenterEdit)).addClass('inputBlur');
        this._addPrompts(MagicWheel.Input._editing, -1);
        outer.position({ of: '#FwOuter' });
        Snsb.defer(function() {
            SudoNsb.Dom.scrollInViewAw(SudoNsb.Await.get_asyncAw(), MagicWheel.Input._editing);
            SudoNsb.Text.selectRange(MagicWheel.Input._editing, text.length, text.length);
            MagicWheel.Input._editing.focus();
        }, 5);
    },
    
    _endCenterEdit: function MagicWheel_Input$_endCenterEdit(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        MagicWheel.Input.data.yatta = MagicWheel.Input._editing.val().trim();
        MagicWheel.Input.triggerChanged();
        MagicWheel.Input._editing.parent().remove();
        MagicWheel.Input._editing = null;
        this._wheel.drawCenter(MagicWheel.Input.data.yatta);
        Snsb.cancelEvent(e);
    },
    
    segCenter: function MagicWheel_Input$segCenter(elToPlace, seg, rad) {
        /// <param name="elToPlace" type="jQueryObject">
        /// </param>
        /// <param name="seg" type="Number" integer="true">
        /// </param>
        /// <param name="rad" type="Number">
        /// </param>
        /// <returns type="Array"></returns>
        var xy = this._wheel.degToXy(this._wheel.segmentToDeg(seg), rad);
        xy[0] = xy[0] + parseInt(this._wheel.cx) - (elToPlace.outerWidth(true) / 2);
        xy[1] = -xy[1] + parseInt(this._wheel.cy) - (elToPlace.outerHeight(true) / 2);
        return xy;
    },
    
    _onWereKey: function MagicWheel_Input$_onWereKey(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        if ((e.which === 13 && !e.shiftKey) || e.which === 9) {
            this._endWereEdit(e);
            if (Snsb.isEmpty(MagicWheel.Input.data.were)) {
                this.editWere();
            }
            else {
                this.editCenter();
            }
        }
        else if (e.which === 27) {
            MagicWheel.Input._editing.parent().remove();
            MagicWheel.Input._editing = null;
            Snsb.cancelEvent(e);
        }
    },
    
    _onCenterKey: function MagicWheel_Input$_onCenterKey(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        if ((e.which === 13 && !e.shiftKey) || e.which === 9) {
            this._endCenterEdit(e);
            if (Snsb.isEmpty(MagicWheel.Input.data.yatta)) {
                this.editCenter();
            }
            else {
                this._wheel.slices[0].edit();
            }
        }
        else if (e.which === 27) {
            MagicWheel.Input._editing.parent().remove();
            MagicWheel.Input._editing = null;
            Snsb.cancelEvent(e);
        }
    },
    
    _onSliceKey: function MagicWheel_Input$_onSliceKey(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        if ((e.which === 13 && !e.shiftKey) || e.which === 9) {
            this._endEdit(e);
        }
        else if (e.which === 27) {
            MagicWheel.Input._editing.parent().remove();
            MagicWheel.Input._editing = null;
            this._wheel.eraseCursor();
            Snsb.cancelEvent(e);
        }
    },
    
    wereShrink: function MagicWheel_Input$wereShrink() {
        if (MagicWheel.Input._were == null) {
            return;
        }
        if (MagicWheel.Input._wereMetrics == null) {
            MagicWheel.Input._wereMetrics = new OnScreen().getMetricsFrom(MagicWheel.Input._were);
        }
        var dwd = parseInt(MagicWheel.Input._wereMetrics.width / (this._wheel.wp.segs + 2));
        var dht = parseInt(MagicWheel.Input._wereMetrics.height / (this._wheel.wp.segs + 2));
        var dl = dwd / 2;
        var dt = dht / 2;
        var wd = MagicWheel.Input._were.width();
        var ht = MagicWheel.Input._were.height();
        var px = parseInt((wd / MagicWheel.Input._wereMetrics.width) * MagicWheel.Input._wereMetrics.fontSize);
        var p = MagicWheel.Input._were.offset();
        MagicWheel.Input._were.animate({ top: p.top + dt, left: p.left + dl, width: wd - dwd, height: ht - dht, 'font-size': px - 1, 'line-height': 1 }, { duration: 1200, easing: 'easeOutQuad' });
    }
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.WheelDef

MagicWheel.WheelDef = function MagicWheel_WheelDef() {
    /// <field name="injectNewSpokes" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="clickHere" type="String">
    /// </field>
    /// <field name="didYatta" type="Boolean">
    /// </field>
    /// <field name="doFireworks" type="Boolean">
    /// </field>
    /// <field name="events" type="SudoNsb.Await">
    /// </field>
    /// <field name="examples" type="Object">
    /// </field>
    /// <field name="initialRotation" type="Number" integer="true">
    /// </field>
    /// <field name="innerRadius" type="Number" integer="true">
    /// </field>
    /// <field name="maxSegs" type="Number" integer="true">
    /// </field>
    /// <field name="minSegs" type="Number" integer="true">
    /// </field>
    /// <field name="pad" type="Number" integer="true">
    /// </field>
    /// <field name="prompts" type="Object">
    /// </field>
    /// <field name="pxMax" type="Number" integer="true">
    /// </field>
    /// <field name="radius" type="Number" integer="true">
    /// </field>
    /// <field name="segs" type="Number" integer="true">
    /// </field>
    /// <field name="skipWere" type="Boolean">
    /// </field>
    /// <field name="skipYatta" type="Boolean">
    /// </field>
    /// <field name="slicePadding" type="Number" integer="true">
    /// </field>
    /// <field name="square" type="Number" integer="true">
    /// </field>
    /// <field name="yattaDim" type="Array">
    /// </field>
    /// <field name="yattaDuration" type="Number" integer="true">
    /// </field>
    /// <field name="yattaStopDeg" type="Number">
    /// </field>
    /// <field name="onCenterClick" type="Function">
    /// </field>
    /// <field name="onHeartClick" type="System.Action`1">
    /// </field>
    /// <field name="onPieClick" type="System.Action`1">
    /// </field>
    /// <field name="onWereClick" type="Function">
    /// </field>
    /// <field name="onBlur" type="Function">
    /// </field>
    /// <field name="onCenter" type="Function">
    /// </field>
    /// <field name="onCenterEnd" type="Function">
    /// </field>
    /// <field name="onPie" type="Function">
    /// </field>
    /// <field name="onPieEnd" type="Function">
    /// </field>
    /// <field name="onReWheel" type="Function">
    /// </field>
    /// <field name="onReload" type="Function">
    /// </field>
    /// <field name="onWere" type="Function">
    /// </field>
    /// <field name="onWereEnd" type="Function">
    /// </field>
    /// <field name="onWheelFinish" type="Function">
    /// </field>
    /// <field name="onWheelStart" type="Function">
    /// </field>
    /// <field name="onYatta" type="Function">
    /// </field>
    /// <field name="onYattaEnd" type="Function">
    /// </field>
    this.examples = {};
    this.prompts = {};
    this.yattaDim = [];
    this.radius = this.square / 2 - this.pad;
}
MagicWheel.WheelDef.prototype = {
    clickHere: 'Click here to start',
    didYatta: false,
    doFireworks: false,
    events: null,
    initialRotation: 90,
    innerRadius: 80,
    maxSegs: 0,
    minSegs: 0,
    pad: 8,
    pxMax: 52,
    radius: 0,
    segs: 12,
    skipWere: false,
    skipYatta: false,
    slicePadding: 6,
    square: 700,
    yattaDuration: 136000,
    yattaStopDeg: 360,
    onCenterClick: null,
    onHeartClick: null,
    onPieClick: null,
    onWereClick: null,
    onBlur: null,
    onCenter: null,
    onCenterEnd: null,
    onPie: null,
    onPieEnd: null,
    onReWheel: null,
    onReload: null,
    onWere: null,
    onWereEnd: null,
    onWheelFinish: null,
    onWheelStart: null,
    onYatta: null,
    onYattaEnd: null,
    
    overrides: function MagicWheel_WheelDef$overrides() {
        if (MagicWheel.WheelDef.injectNewSpokes > 0) {
            this.segs = MagicWheel.WheelDef.injectNewSpokes;
        }
        MagicWheel.WheelDef.injectNewSpokes = 0;
    }
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.Yatta

MagicWheel.Yatta = function MagicWheel_Yatta() {
    /// <field name="wheelFinishEv" type="String" static="true">
    /// </field>
}
MagicWheel.Yatta.onYatta = function MagicWheel_Yatta$onYatta() {
    var done = MagicWheel.Input.get_first().get_isAllFilled();
    if (Snsb.isEmpty(MagicWheel.Input.data.yatta) || Snsb.isEmpty(MagicWheel.Input.data.were)) {
        done = false;
    }
    if (!done || MagicWheel.Wheel.instance.wp.didYatta) {
        return;
    }
    MagicWheel.Wheel.instance.wp.didYatta = true;
    if (MagicWheel.Wheel.instance.wp.onYatta != null) {
        if (MagicWheel.Input.get_wereEl() != null) {
            MagicWheel.Input.get_wereEl().hide();
        }
        MagicWheel.Wheel.instance.wp.onYatta();
        return;
    }
    MagicWheel.Saver.saveAsThing(Type.getInstanceType(MagicWheel.Wheel.instance.wp).get_name());
    $('#SaveBtn').fadeIn();
    if (MagicWheel.Input.get_wereEl() != null) {
        MagicWheel.Input.get_wereEl().hide();
    }
    MagicWheel.Yatta.yattaSpin();
}
MagicWheel.Yatta.yattaSpin = function MagicWheel_Yatta$yattaSpin(after) {
    /// <param name="after" type="Function">
    /// </param>
    MagicWheel.Yatta.dimSum();
    MagicWheel.Wheel.instance.spinWheel(function() {
        if (after != null) {
            after();
        }
        if (MagicWheel.Wheel.instance.wp.onYattaEnd != null) {
            MagicWheel.Wheel.instance.wp.onYattaEnd();
        }
        else {
            $(document).trigger('PnxWheelFinishEv');
        }
        MagicWheel.My.ping('CompleteFw');
        Snsb.defer(function() {
            if (MagicWheel.Wheel.instance.wp.doFireworks) {
                $("<img id='Fireworks' class='yatta' src='nsb/fw/images/animated-fireworks.gif'/>").appendTo(MagicWheel.Wheel.instance.fwEl);
                $("<img id='Fireworks2' class='yatta' src='nsb/fw/images/animated-fireworks2.gif'/>").appendTo(MagicWheel.Wheel.instance.fwEl);
                Snsb.defer(MagicWheel.Yatta.unYatta, MagicWheel.Wheel.instance.wp.yattaDuration);
            }
        }, 700);
    }, MagicWheel.Wheel.instance.wp.yattaStopDeg, 2000);
}
MagicWheel.Yatta.unYatta = function MagicWheel_Yatta$unYatta() {
    $('.yatta').remove();
}
MagicWheel.Yatta.dimSum = function MagicWheel_Yatta$dimSum() {
    var $enum1 = ss.IEnumerator.getEnumerator(MagicWheel.Wheel.instance.wp.yattaDim);
    while ($enum1.moveNext()) {
        var i = $enum1.current;
        $('#Piece' + i).animate({ opacity: 0.3 }, { duration: 1000 });
    }
}
MagicWheel.Yatta.unDim = function MagicWheel_Yatta$unDim() {
    $('.WheelWheel > div').css({ opacity: '' });
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.Main

MagicWheel.Main = function MagicWheel_Main() {
    /// <field name="_css" type="String" static="true">
    /// </field>
    /// <field name="ignoreUserWhenSaving" type="Boolean" static="true">
    /// </field>
    /// <field name="_updating" type="Boolean" static="true">
    /// </field>
    /// <field name="dev" type="Boolean" static="true">
    /// </field>
    /// <field name="dontLoadWheel" type="Boolean" static="true">
    /// </field>
    /// <field name="projectName" type="String" static="true">
    /// </field>
}


////////////////////////////////////////////////////////////////////////////////
// MagicWheel.PurchaseItems

MagicWheel.PurchaseItems = function MagicWheel_PurchaseItems() {
    /// <field name="customTile" type="String" static="true">
    /// </field>
    /// <field name="tileSubscription" type="String" static="true">
    /// </field>
}


Type.registerNamespace('TuneUp');

////////////////////////////////////////////////////////////////////////////////
// TuneUp.Appreciator

TuneUp.Appreciator = function TuneUp_Appreciator(data) {
    /// <param name="data" type="MagicWheel.FwData">
    /// </param>
    /// <field name="_css$1" type="String" static="true">
    /// </field>
    /// <field name="_data$1" type="MagicWheel.FwData">
    /// </field>
    TuneUp.Appreciator.initializeBase(this);
    if (Snsb.isEmpty(data) || !data.segs.length) {
        return;
    }
    this._data$1 = data;
    SudoNsb.PrefixFree.addStyleOnce((TuneUp.Appreciator).get_fullName(), '\r\n.appreciatorOuter {\r\n    position: relative;\r\n    top: 0px;\r\n    width: 100%;\r\n    margin: 12px 0;\r\n    box-sizing: border-box;\r\n    border-radius: 20px;\r\n    background-color: rgba(0, 0, 0, 0.17);\r\n}\r\n.appreciator {\r\n    position: relative;\r\n    top: 0px;\r\n    width: 100%;\r\n    font-size: 42px;\r\n    line-height: 1;\r\n    padding: 20px 40px;\r\n    box-sizing: border-box;\r\n    text-align: center;\r\n    text-shadow: 1px 1px 4px rgb(238, 238, 238);\r\n    border-radius: 20px;\r\n    background-color: rgba(255, 255, 255, 0.85);\r\n    background: radial-gradient(ellipse at center, rgba(254,255,255,1) 0%,rgba(221,241,249,0.12) 65%,rgba(61,167,251,0) 74%,rgba(25,151,251,0) 76%,rgba(255,0,0,0) 100%);\r\n    cursor: pointer;\r\n}\r\n');
    this._waitor$1();
}
TuneUp.Appreciator.prototype = {
    _data$1: null,
    
    _waitor$1: function TuneUp_Appreciator$_waitor$1() {
        var insertAfter = $('#TuWidget');
        if (!insertAfter.length) {
            Snsb.defer(ss.Delegate.create(this, this._waitor$1), 23);
            return;
        }
        this.buildElements('appreciator').insertAfter(insertAfter);
        this.element.attr('title', 'click for a random one').html(String.format('&#9829; {0}', this._data$1.segs[Snsb.randIdx(this._data$1.segs.length)])).on('click.appr', ss.Delegate.create(this, function() {
            this.element.fadeOut(800, ss.Delegate.create(this, function() {
                this.element.html(String.format('&#9829; {0}', this._data$1.segs[Snsb.randIdx(this._data$1.segs.length)])).fadeIn(800);
            }));
        }));
        this.outer.hide().fadeIn(5000);
    }
}


////////////////////////////////////////////////////////////////////////////////
// TuneUp.Question

TuneUp.Question = function TuneUp_Question() {
}


////////////////////////////////////////////////////////////////////////////////
// TuneUp.QuestionText

TuneUp.QuestionText = function TuneUp_QuestionText() {
}


////////////////////////////////////////////////////////////////////////////////
// TuneUp.QuestionScale

TuneUp.QuestionScale = function TuneUp_QuestionScale() {
}


////////////////////////////////////////////////////////////////////////////////
// TuneUp.TuBase

TuneUp.TuBase = function TuneUp_TuBase() {
    /// <field name="dev" type="Boolean" static="true">
    /// </field>
    /// <field name="afterShown" type="Boolean">
    /// </field>
    /// <field name="element" type="jQueryObject">
    /// </field>
    /// <field name="outer" type="jQueryObject">
    /// </field>
    if (FbApi.get_id() === 'FB1305946510' || Snsb.get_masterId() === 'PX2' || Config.offline) {
        TuneUp.TuBase.dev = true;
    }
}
TuneUp.TuBase.flashScreen = function TuneUp_TuBase$flashScreen() {
    var el = $("<div class='AboveHider'/>");
    el.css({ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', margin: 0, padding: 0, background: 'rgba(255,255,0,.5)' }).appendTo(document.body).hide().fadeIn(50, function() {
        el.fadeOut(50, function() {
            el.remove();
        });
    });
}
TuneUp.TuBase.prototype = {
    afterShown: false,
    element: null,
    outer: null,
    
    get_slideOpenSpeed: function TuneUp_TuBase$get_slideOpenSpeed() {
        /// <value type="Number" integer="true"></value>
        return 400;
    },
    
    slideOpen: function TuneUp_TuBase$slideOpen() {
        var el = this.outer || this.element;
        if (!el.is(':visible')) {
            this.beforeSlideOpen(el);
            el.slideDown(this.get_slideOpenSpeed(), ss.Delegate.create(this, function() {
                this.afterShown = true;
                this.afterSlideOpen(el);
            }));
        }
    },
    
    buildElements: function TuneUp_TuBase$buildElements(baseCss) {
        /// <param name="baseCss" type="String">
        /// </param>
        /// <returns type="jQueryObject"></returns>
        this.outer = $(String.format("<div class='{0}Outer'/>", baseCss));
        this.element = $(String.format("<div class='{0}'/>", baseCss)).appendTo(this.outer);
        return this.outer;
    },
    
    beforeSlideOpen: function TuneUp_TuBase$beforeSlideOpen(el) {
        /// <param name="el" type="jQueryObject">
        /// </param>
    },
    
    afterSlideOpen: function TuneUp_TuBase$afterSlideOpen(el) {
        /// <param name="el" type="jQueryObject">
        /// </param>
    },
    
    afterWidgetShown: function TuneUp_TuBase$afterWidgetShown(fn) {
        /// <param name="fn" type="Function">
        /// </param>
        Snsb.waitOn(fn, ss.Delegate.create(this, function() {
            return this.afterShown;
        }));
    },
    
    tempOpen: function TuneUp_TuBase$tempOpen() {
        /// <returns type="Boolean"></returns>
        var ic = this.element.is(':visible');
        if (!ic) {
            this.element.show();
        }
        return ic;
    },
    
    tempClose: function TuneUp_TuBase$tempClose(wasOpen) {
        /// <param name="wasOpen" type="Boolean">
        /// </param>
        if (!wasOpen) {
            this.element.hide();
        }
    }
}


////////////////////////////////////////////////////////////////////////////////
// TuneUp.TuData

TuneUp.TuData = function TuneUp_TuData() {
    /// <field name="browserId" type="SudoNsb.BrowserType">
    /// </field>
    /// <field name="done" type="Boolean">
    /// </field>
    /// <field name="grid" type="MagicWheel.SavedGrid">
    /// </field>
    /// <field name="isModified" type="Boolean">
    /// </field>
    /// <field name="noTimes" type="Boolean">
    /// </field>
    /// <field name="started" type="Boolean">
    /// </field>
    /// <field name="step" type="Number" integer="true">
    /// </field>
    /// <field name="steps" type="Array">
    /// </field>
    /// <field name="topic" type="String">
    /// </field>
    /// <field name="_storageKey" type="String" static="true">
    /// </field>
    /// <field name="startEv" type="String" static="true">
    /// </field>
    /// <field name="nextEv" type="String" static="true">
    /// </field>
    /// <field name="doneEv" type="String" static="true">
    /// </field>
    /// <field name="tuDataTopic" type="String" static="true">
    /// </field>
    /// <field name="_testData2" type="TuneUp.TuData" static="true">
    /// </field>
    /// <field name="_pageUrls" type="TuneUp.TuData" static="true">
    /// </field>
    this.browserId = SqlStorage.get_browserId();
    this.steps = [];
}
TuneUp.TuData.loadAw = function TuneUp_TuData$loadAw(awp, topic) {
    /// <param name="awp" type="SudoNsb.Await">
    /// </param>
    /// <param name="topic" type="String">
    /// </param>
    SqlStorage.loadTopicAw(awp, topic, TuneUp.TuData, true);
}
TuneUp.TuData.testData = function TuneUp_TuData$testData() {
    /// <returns type="TuneUp.TuData"></returns>
    Inform.debug('Loading tuneup test data');
    var tu = TuneUp.TuData._testData2;
    if ($('html').is('.pnxWordpress')) {
        var tuu = TuneUp.TuData._pageUrls;
        for (var i = 0; i < tu.steps.length; i++) {
            $.extend(tu.steps[i], tuu.steps[i]);
        }
    }
    tu.save();
    return tu;
}
TuneUp.TuData.mergeNewData = function TuneUp_TuData$mergeNewData(tu) {
    /// <param name="tu" type="TuneUp.TuData">
    /// </param>
    var $enum1 = ss.IEnumerator.getEnumerator(TuneUp.TuData._testData2.steps);
    while ($enum1.moveNext()) {
        var stp = $enum1.current;
        var $enum2 = ss.IEnumerator.getEnumerator(tu.steps);
        while ($enum2.moveNext()) {
            var stp2 = $enum2.current;
            if (stp.name === stp2.name) {
                $.extend(stp2, stp);
                break;
            }
        }
    }
}
TuneUp.TuData.prototype = {
    done: false,
    grid: null,
    isModified: false,
    noTimes: false,
    started: false,
    step: 0,
    topic: null,
    
    get_count: function TuneUp_TuData$get_count() {
        /// <value type="Number" integer="true"></value>
        return this.steps.length;
    },
    
    get_steps: function TuneUp_TuData$get_steps() {
        /// <summary>
        /// Gets the number of steps in this tuneup
        /// </summary>
        /// <value type="Number" integer="true"></value>
        return Math.max(this.steps.length - 1, 0);
    },
    
    get_currentStep: function TuneUp_TuData$get_currentStep() {
        /// <value type="TuneUp.TuStep"></value>
        return ((this.step >= 0) ? this.steps[this.step] : null) || new TuneUp.TuStep('', '', 0, '');
    },
    
    get_nextStep: function TuneUp_TuData$get_nextStep() {
        /// <value type="TuneUp.TuStep"></value>
        return ((this.step >= 0) ? this.steps[this.step + 1] : null) || new TuneUp.TuStep('', '', 0, '');
    },
    
    get_isStepDone: function TuneUp_TuData$get_isStepDone() {
        /// <value type="Boolean"></value>
        return this.get_currentStep().isDone;
    },
    
    get_isStepPage: function TuneUp_TuData$get_isStepPage() {
        /// <value type="Boolean"></value>
        var pu = this.get_pageUrl();
        return (String.isNullOrEmpty(pu) && window.top.location.pathname === '/') || window.top.location.href.indexOf(pu) >= 0;
    },
    
    get_pageUrl: function TuneUp_TuData$get_pageUrl() {
        /// <value type="String"></value>
        return (this.get_currentStep().pageUrl === 'index') ? '' : this.get_currentStep().pageUrl;
    },
    
    start: function TuneUp_TuData$start(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        this.started = true;
        $(document).trigger('TuDataStartEv');
        this.step = -1;
        this.next();
    },
    
    next: function TuneUp_TuData$next(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        var wasOnStep = this.get_currentStep();
        if (!this.get_currentStep().isDone) {
            this.get_currentStep().isSkipped = true;
            this.get_currentStep().isDone = true;
        }
        this.step = 0;
        var $enum1 = ss.IEnumerator.getEnumerator(this.steps);
        while ($enum1.moveNext()) {
            var tu = $enum1.current;
            if (!tu.isDone || (this.done && tu.isSkipped)) {
                break;
            }
            this.step++;
        }
        if (wasOnStep.finalStep) {
            new SudoNsb.Await().addAw(ss.Delegate.create(this, this.clearAw)).addFn(BrowserUser.reloadPage, window.top).commit();
        }
        else {
            this.save();
            $(document).trigger('TuDataNextEv');
            var url = '/' + this.get_pageUrl();
            Snsb.defer(function() {
                BrowserUser.relink(url, window.top);
            });
        }
    },
    
    finished: function TuneUp_TuData$finished(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        this.done = true;
        this.get_currentStep().isDone = true;
        this.get_currentStep().isSkipped = false;
        $(document).trigger('TuDataDoneEv');
    },
    
    clearAw: function TuneUp_TuData$clearAw(awp) {
        /// <param name="awp" type="SudoNsb.Await">
        /// </param>
        new SudoNsb.Await().addDl(ss.Delegate.create(this, function(aw) {
            SudoNsb.Storage.removeSession('PnxTuneUp');
            if (!String.isNullOrEmpty(this.topic)) {
                SqlStorage.removeTopicAw(aw, this.topic, true);
            }
            else {
                aw.done();
            }
        })).commit(awp);
    },
    
    save: function TuneUp_TuData$save(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        this.isModified = true;
        if (this.get_isStepPage()) {
            if (this.get_currentStep().isStarted && MagicWheel.Wheel.instance != null && MagicWheel.Input.get_first().get_isAnyFilled()) {
                this.get_currentStep().savedWheel = MagicWheel.Input.data;
            }
        }
        this.grid = MagicWheel.GridCloud.get_theGrid() || this.grid;
        this.browserId = SqlStorage.get_browserId();
        if (!String.isNullOrEmpty(this.topic)) {
            SqlStorage.saveTopic(this.topic, this, true);
        }
    },
    
    wheelFromStep: function TuneUp_TuData$wheelFromStep(name) {
        /// <param name="name" type="String">
        /// </param>
        /// <returns type="MagicWheel.FwData"></returns>
        var $enum1 = ss.IEnumerator.getEnumerator(this.steps);
        while ($enum1.moveNext()) {
            var s = $enum1.current;
            if (s.name === name) {
                return s.savedWheel;
            }
        }
        return null;
    }
}


////////////////////////////////////////////////////////////////////////////////
// TuneUp.TuStep

TuneUp.TuStep = function TuneUp_TuStep(pageUrl, name, spokes, text) {
    /// <param name="pageUrl" type="String">
    /// </param>
    /// <param name="name" type="String">
    /// </param>
    /// <param name="spokes" type="Number" integer="true">
    /// </param>
    /// <param name="text" type="String">
    /// </param>
    /// <field name="bottomBox" type="String">
    /// </field>
    /// <field name="estTime" type="Array" elementType="Number" elementInteger="true">
    /// </field>
    /// <field name="finalStep" type="Boolean">
    /// </field>
    /// <field name="grid" type="MagicWheel.SavedGrid">
    /// </field>
    /// <field name="hideSpokes" type="Boolean">
    /// </field>
    /// <field name="isDone" type="Boolean">
    /// </field>
    /// <field name="isSkipped" type="Boolean">
    /// </field>
    /// <field name="isStarted" type="Boolean">
    /// </field>
    /// <field name="memes" type="Array">
    /// </field>
    /// <field name="name" type="String">
    /// </field>
    /// <field name="nextAction" type="String">
    /// </field>
    /// <field name="noMeme" type="Boolean">
    /// </field>
    /// <field name="noWheel" type="Boolean">
    /// </field>
    /// <field name="pageUrl" type="String">
    /// </field>
    /// <field name="quote" type="String">
    /// </field>
    /// <field name="quoteBy" type="String">
    /// </field>
    /// <field name="rightBox" type="String">
    /// </field>
    /// <field name="savedWheel" type="MagicWheel.FwData">
    /// </field>
    /// <field name="spokes" type="Number" integer="true">
    /// </field>
    /// <field name="startTime" type="Number" integer="true">
    /// </field>
    /// <field name="stopTime" type="Number" integer="true">
    /// </field>
    /// <field name="text" type="String">
    /// </field>
    /// <field name="version" type="Number">
    /// </field>
    /// <field name="visitCount" type="Number" integer="true">
    /// </field>
    this.name = name;
    this.pageUrl = pageUrl;
    this.text = text;
    this.spokes = spokes;
    if (spokes > 0) {
        this.hideSpokes = true;
    }
}
TuneUp.TuStep.prototype = {
    bottomBox: null,
    estTime: null,
    finalStep: false,
    grid: null,
    hideSpokes: false,
    isDone: false,
    isSkipped: false,
    isStarted: false,
    memes: null,
    name: null,
    nextAction: null,
    noMeme: false,
    noWheel: false,
    pageUrl: null,
    quote: null,
    quoteBy: null,
    rightBox: null,
    savedWheel: null,
    spokes: 0,
    startTime: 0,
    stopTime: 0,
    text: null,
    version: 1,
    visitCount: 0,
    
    set: function TuneUp_TuStep$set(key, value) {
        /// <param name="key" type="String">
        /// </param>
        /// <param name="value" type="Object">
        /// </param>
        /// <returns type="TuneUp.TuStep"></returns>
        this[key] = value;
        return this;
    }
}


////////////////////////////////////////////////////////////////////////////////
// TuneUp.TuPages

TuneUp.TuPages = function TuneUp_TuPages() {
    /// <field name="hopo" type="String" static="true">
    /// </field>
    /// <field name="yes" type="String" static="true">
    /// </field>
    /// <field name="focus" type="String" static="true">
    /// </field>
    /// <field name="gratitude" type="String" static="true">
    /// </field>
    /// <field name="vision" type="String" static="true">
    /// </field>
    /// <field name="done" type="String" static="true">
    /// </field>
}


////////////////////////////////////////////////////////////////////////////////
// TuneUp.TuDetailEditor

TuneUp.TuDetailEditor = function TuneUp_TuDetailEditor(widget) {
    /// <param name="widget" type="TuneUp.TuWidget">
    /// </param>
    /// <field name="_css" type="String" static="true">
    /// </field>
    /// <field name="_instance" type="TuneUp.TuDetailEditor" static="true">
    /// </field>
    /// <field name="_widget" type="TuneUp.TuWidget">
    /// </field>
    /// <field name="element" type="jQueryObject">
    /// </field>
    this._widget = widget;
    if (TuneUp.TuDetailEditor._instance != null) {
        TuneUp.TuDetailEditor._instance.close();
        return;
    }
    TuneUp.TuDetailEditor._instance = this;
    this.element = $("<div id='TuDetailEditor' class='tuWidgetEditor AboveHider'/>").insertAfter($('#TuDetailsBtn', this._widget.goldText));
    SudoNsb.PrefixFree.addStyleOnce((TuneUp.TuDetailEditor).get_fullName(), "\r\n.tuWidgetEditor {\r\n    padding: 20px 20px 5px 20px;\r\n    box-sizing: border-box;\r\n    margin-bottom: 20px;\r\n}\r\n.tuWidgetEditor .text {\r\n    width: 100%;\r\n    color: white;\r\n    background: rgba(255,255,255,.15);\r\n    padding: 3px 8px;\r\n    box-sizing: border-box;\r\n}\r\n.tuWidgetEditor .stepNum:after {\r\n    content: ')';\r\n    padding-left: 2px;\r\n    padding-right: 5px;\r\n}\r\n.tuWidgetEditor h3 .checkMark {\r\n    float: right;\r\n    width: 35px;\r\n    margin-top: -8px;\r\n    cursor: pointer;\r\n    line-height: 0;\r\n    border-radius: 35px;\r\n}\r\n.tuWidgetEditor h3 .checkMark.green:hover {\r\n    box-shadow: inset 0 0 137px rgba(0, 243, 58, 0.77);\r\n}\r\n.tuWidgetEditor h3 .checkMark.red:hover {\r\n    box-shadow: inset 0 0 137px rgba(243, 0, 58, 0.51);\r\n}\r\n.tuWidgetEditor .quitBtn {\r\n    float: right;\r\n}\r\n.tuWidgetEditor .skipBtn {\r\n    float: right;\r\n}\r\n.tuWidgetEditor .noTimesCk {\r\n    display: inline-block;\r\n    float: right;\r\n    margin: 11px;\r\n    margin-right: 78px;\r\n}\r\n.tuWidgetEditor .noTimesCk:after {\r\n    content: 'show time';\r\n    white-space: nowrap;\r\n    padding-left: 20px;\r\n}\r\n.tuWidgetEditor .spacer {\r\n    height: 35px;\r\n}\r\n");
    $(document).on('TuDataNextEv' + ' ' + 'TuDataDoneEv', ss.Delegate.create(this, this.close));
    var stp = this._widget.data.get_currentStep();
    var list = $("<div id='StepList'/>").appendTo(this.element);
    var idx = 0;
    var $enum1 = ss.IEnumerator.getEnumerator(this._widget.data.steps);
    while ($enum1.moveNext()) {
        var step = $enum1.current;
        if (step.finalStep && !this._widget.data.done) {
            continue;
        }
        var h3 = $('<h3/>').html(String.format("<span class='stepNum'>{0}</span> <span class='stepName'>{1}</span>", ((step.finalStep) ? '\u2665' : (idx + 1).toString()), step.name)).appendTo(list);
        $('<div/>').html(step.text).appendTo(list);
        if (step.isSkipped) {
            $("<img class='checkMark red' title='go to this step'/>").attr('src', 'nsb/fw/images/check-red.png').on('click.tue', this.goCv(step)).prependTo(h3);
        }
        else if (step.isDone) {
            $("<img class='checkMark green' title='go to this step'/>").attr('src', 'nsb/fw/images/check-green.png').prependTo(h3).on('click.tue', this.goCv(step));
        }
        idx++;
    }
    $(String.format("<button class='quitBtn fadeBtn'>{0}</button>", (this._widget.data.done) ? 'close session' : 'quit session')).button().appendTo(this.element).on('click.tue', ss.Delegate.create(this, function() {
        this.quit();
    }));
    var b1 = $("<button class='skipBtn fadeBtn' title='skip this step'>skip step</button>").button().appendTo(this.element).on('click.tue', ss.Delegate.create(this, function() {
        this._widget.data.next();
    }));
    if (stp.finalStep) {
        b1.button('disable');
    }
    var c1 = $("<input type='checkbox' class='noTimesCk' title='show the elapsed time'>");
    c1.appendTo(this.element).on('mousedown.tue', ss.Delegate.create(this, function() {
        this._widget.data.noTimes = c1.is(':checked');
        this._widget.elapsedTime();
        this._widget.data.save();
    })).prop('checked', !this._widget.data.noTimes);
    $("<div class='spacer'/>").appendTo(this.element);
    (list).accordion();
    (list).accordion('option', 'active', this._widget.data.step);
    SudoNsb.Dom.scrollInViewAw(SudoNsb.Await.get_asyncAw(), this.element);
    this.element.hide().slideDown(350);
    SudoNsb.Dom.unFocus();
}
TuneUp.TuDetailEditor.prototype = {
    _widget: null,
    element: null,
    
    goCv: function TuneUp_TuDetailEditor$goCv(item) {
        /// <param name="item" type="TuneUp.TuStep">
        /// </param>
        /// <returns type="Function"></returns>
        return ss.Delegate.create(this, function(e) {
            this._widget.go(item);
            Snsb.cancelEvent(e);
        });
    },
    
    close: function TuneUp_TuDetailEditor$close(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        TuneUp.TuDetailEditor._instance = null;
        this.element.slideUp(350, ss.Delegate.create(this, function() {
            this.element.remove();
        }));
    },
    
    quit: function TuneUp_TuDetailEditor$quit() {
        TuneUp.TuDetailEditor._instance = null;
        this._widget.outer.slideUp(350, ss.Delegate.create(this, function() {
            this.element.remove();
            this._widget.quit();
        }));
    }
}


////////////////////////////////////////////////////////////////////////////////
// TuneUp.TuWidget

TuneUp.TuWidget = function TuneUp_TuWidget() {
    /// <field name="_css$1" type="String" static="true">
    /// </field>
    /// <field name="wrapperId" type="String" static="true">
    /// </field>
    /// <field name="gear1Url" type="String" static="true">
    /// </field>
    /// <field name="gear2Url" type="String" static="true">
    /// </field>
    /// <field name="instance" type="TuneUp.TuWidget" static="true">
    /// </field>
    /// <field name="cancelMeme" type="Boolean">
    /// </field>
    /// <field name="data" type="TuneUp.TuData">
    /// </field>
    /// <field name="goldText" type="jQueryObject">
    /// </field>
    /// <field name="_afterMeme$1" type="Boolean">
    /// </field>
    /// <field name="_elapsedTmr$1" type="Number" integer="true">
    /// </field>
    TuneUp.TuWidget.initializeBase(this);
    SudoNsb.PrefixFree.addStyleOnce((TuneUp.TuWidget).get_fullName(), "\r\n#TuWidget {\r\n    position: relative;\r\n    margin-top: 40px;\r\n    z-index: 1;\r\n    overflow: visible !important;\r\n}\r\n.goldText {\r\n    position: relative;\r\n    top: 0;\r\n    width: 100%;\r\n    padding: 26px 50px 26px 100px;\r\n    margin: 0 0 8px 0;\r\n    box-sizing: border-box;\r\n    border: 1px solid rgba(255, 51, 0, 0.3);\r\n    background-color: rgba(255, 221, 115, 0.5);\r\n    border-radius: 20px;\r\n}\r\n.AboveHider .goldText {\r\n    background-color: rgba(231, 203, 114, 1);\r\n}\r\n.goldText .title .gear1 {\r\n    position: relative;\r\n    width: 28px;\r\n    height: 28px;\r\n    margin: 0 16px 0 0;\r\n    animation: spincw 10000ms infinite linear;\r\n}\r\n.goldText .title .gear2 {\r\n    position: absolute;\r\n    top: 10px;\r\n    left: 26px;\r\n    width: 14px;\r\n    height: 14px;\r\n    margin: 1px;\r\n}\r\n.goldText .digit {\r\n    position: absolute;\r\n    font-family: 'PT serif', serif;\r\n    line-height: 1;\r\n}\r\n.goldText .goo {\r\n    overflow: hidden;\r\n    padding-right: 26px;\r\n}\r\n.goldText label {\r\n    position: absolute;\r\n    top: -28px;\r\n    left: 34px;\r\n    padding: 4px 20px;\r\n    font-size: 32px;\r\n    font-family: Pompiere, 'times new roman';\r\n    text-shadow: 1px 1px 1px #F2DA5E;\r\n    background-color: #CF9E29;\r\n    border-top-left-radius: 9px;\r\n    border-top-right-radius: 9px;\r\n    border-bottom: 1px solid rgba(85, 39, 39, 0.28);\r\n    line-height: 1.1;\r\n}\r\n.goldText h3 {\r\n    padding: .2em 0;\r\n    margin: 10px 0;\r\n    font-family: 'PT serif', serif;\r\n}\r\n.goldText p {\r\n    padding: 0;\r\n    margin: 10px 20px;\r\n    z-index: 1;\r\n}\r\n.goldText .afterStep {\r\n    display: block;\r\n    padding: 5px 0;\r\n    margin: 0;\r\n    float: right;\r\n    clear: both;\r\n    color: rgba(255, 255, 255, 0.95);\r\n}\r\n.goldText .afterStep button {\r\n    margin: 0 10px;\r\n}\r\n.goldText .afterStepWrapper {\r\n    padding: 0 20px;\r\n    margin-top: 20px;\r\n    background: rgb(255, 133, 0);\r\n    border-radius: 13px;\r\n    clear: both;\r\n    overflow: hidden;\r\n}\r\n.goldText .afterStepWrapper .afterStepIcon {\r\n    float: left;\r\n    height: 2.3em;\r\n}\r\n@keyframes wobbler {\r\n    0% { transform: rotate(-15deg) }\r\n    25% { transform: rotate(15deg) }\r\n    50% { transform: rotate(-15deg) }\r\n    75% { transform: rotate(15deg) }\r\n    100% { transform: rotate(-15deg) }\t\r\n}\r\n.goldText .afterStepWrapper .afterStepWarn {\r\n    margin-top: 3px;\r\n    animation: wobbler 1.2s infinite;\r\n}\r\n.goldText .afterStepWrapper .afterStepSmile {\r\n    margin-top: 2px;\r\n}\r\n.goldText .clickBelow {\r\n    display: block;\r\n    margin: 5px 20px;\r\n    padding: 0;\r\n}\r\n.goldText .stepNumbers {\r\n    position: absolute;\r\n    top: -15px;\r\n    padding: 0 16px;\r\n    right: 80px;\r\n    border: 1px solid rgb(255, 184, 0);\r\n    border-radius: 12px;\r\n    background-color: rgb(255, 231, 169);\r\n    font-family: 'PT serif', serif;\r\n    font-weight: bold;\r\n    font-size: 20px;\r\n}\r\n.goldText .stepNumbers .of {\r\n    font-family: Pompiere;\r\n    font-size: 16px;\r\n    font-style: italic;\r\n    padding-right: 4px;\r\n}\r\n.goldText .bottomBox blockquote {\r\n    border-left: 4px solid rgb(233, 147, 68);\r\n}\r\n.goldText .rightBox blockquote {\r\n    border: none;\r\n    padding: 0;\r\n}\r\n.goldText .rightBox {\r\n    float: right;\r\n    width: 200px;\r\n    border: 1px solid green;\r\n    border-radius: 12px;\r\n    padding: 18px;\r\n    margin: 0 0 20px 20px;\r\n    background: #e0eacc; /* Old browsers */\r\n    background: linear-gradient(135deg, #e0eacc 0%,#99c62f 100%);\r\n    box-shadow:         12px 12px 11px 0px rgba(50, 50, 50, 0.65);\r\n}\r\n.goldText .bottomBox {\r\n}\r\n.goldText .bottomBox ul {\r\n    margin-left: 20px;\r\n}\r\n.goldText .bottomBox li {\r\n}\r\n.goldText .rightBox.img {\r\n    width: initial;\r\n    height: initial;\r\n    line-height: 0;\r\n}\r\n.goldText .estTime {\r\n    position: absolute;\r\n    white-space: nowrap;\r\n    top: 1px;\r\n    left: 348px;\r\n    font-size: 13px;\r\n}\r\n.goldText .elapsedTime {\r\n    position: absolute;\r\n    white-space: nowrap;\r\n    top: 1px;\r\n    left: 600px;\r\n    font-size: 13px;\r\n}\r\n#wsite-content .goldText p.returnTo {\r\n    color: rgba(0, 102, 233, 0.8) !important;\r\n}\r\n.ptBtn {\r\n    cursor: pointer;\r\n}\r\n#TuDetailsBtn {\r\n    display: inline-block;\r\n    cursor: pointer;\r\n}\r\n#TuDetailsBtn:before {\r\n    content: '\\25B6';\r\n    cursor: pointer;\r\n    padding-right: 4px;\r\n    font-size: smaller;\r\n    font-family: georgia;\r\n    color: rgb(255, 135, 5);\r\n}\r\n#TuDetailsBtn.open:before {\r\n    content: '\\25BC';\r\n    padding-right: 3px;\r\n}\r\n\r\nbody.default #QuickElevator {\r\n    border: 1px solid orange;\r\n    width: 314px;\r\n    padding: 30px 40px;\r\n    margin: 30px 40px;\r\n    color: white;\r\n    font-size: 2em;\r\n    border-radius: 20px;\r\n    text-align: center;\r\n    cursor: pointer;\r\n    background: #ffdeb7; /* Old browsers */\r\n    background: radial-gradient(ellipse at center, #ffdeb7 0%,#ffdeb7 46%,#ff920a 100%);\r\n}\r\nbody.default #Ad1 #QuickElevator {\r\n    border: 1px solid orange;\r\n    width: 200px;\r\n    padding: 20px 30px;\r\n    margin: 0px;\r\n    color: rgb(245, 17, 17);\r\n    font-size: 1.2em;\r\n    border-radius: 20px;\r\n    text-align: center;\r\n    cursor: pointer;\r\n    background: radial-gradient(ellipse at center, #ffdeb7 0%,#ffdeb7 46%,#ff920a 100%);\r\n}\r\n");
    if ($('#NoAppWidgets').length > 0) {
        return;
    }
    if ($('#Elevators').length > 0) {
        TuneUp.TuWidget.installElevatorButtons();
    }
    TuneUp.TuWidget.instance = this;
    new SudoNsb.Await().addAw(TuneUp.TuData.loadAw, this.get_topic()).addDx(ss.Delegate.create(this, function(aw) {
        this.data = aw.get_result();
        MagicWheel.Input.data = this.data.get_currentStep().savedWheel || MagicWheel.Input.data;
        if (this.data.get_count() <= 0) {
            TuneUp.TuWidget.installElevatorButtons();
            this.afterShown = this._afterMeme$1 = true;
            aw.done();
            return;
        }
        var step = this.data.get_currentStep();
        this.outer = this.element = $("<div id='TuWidget'/>").hide();
        var dx = $('#TuWidgetNode');
        if (dx.length > 0) {
            this.element.appendTo(dx);
        }
        else {
            this.element.insertBefore(MagicWheel.Wheel.get_documentAnchor());
        }
        this.goldText = $("<div class='goldText'/>").prependTo(this.element);
        var tt = $("<label class='title' title='session details'>Play Your Way Up</label>").appendTo(this.goldText);
        var g1 = $("<img class='gear1'/>").attr('src', TuneUp.TuWidget.gear1Url).prependTo(tt);
        $("<img class='gear2'/>").attr('src', TuneUp.TuWidget.gear2Url).insertAfter(g1);
        if (!Snsb.isEmpty(step.estTime)) {
            $("<span class='estTime'/>").appendTo(this.goldText).html('suggested time ' + (step.estTime[0] / 60000) + ' to ' + (step.estTime[1] / 60000) + ' minutes');
        }
        $("<div id='TuDetailsBtn' class='widget' title='click to expand session details and options'>details and options</div>").appendTo(this.goldText).on('click.tuw', ss.Delegate.create(this, function() {
            var btn = $('#TuDetailsBtn');
            if (btn.is('.open')) {
                btn.removeClass('open');
            }
            else {
                btn.addClass('open');
            }
            new TuneUp.TuDetailEditor(this);
        }));
        var goo = $("<div class='goo'/>").appendTo(this.goldText);
        if (!String.isNullOrEmpty(this.data.get_currentStep().rightBox)) {
            var rb = $("<div class='rightBox'/>").html(this.data.get_currentStep().rightBox).appendTo(goo);
            if (rb.children('img').length > 0) {
                rb.addClass('img');
            }
        }
        $("<h3 class='instructions'/>").appendTo(goo).html(this.data.get_currentStep().name);
        var pp = $("<p class='instructions'/>").html(step.text).appendTo(goo);
        if (!String.isNullOrEmpty(step.quote)) {
            $("<div class='bottomBox'/>").html(String.format('<blockquote>{0}</blockquote><cite>{1}</cite>', step.quote, (step.quoteBy || ''))).appendTo(goo);
        }
        if (!String.isNullOrEmpty(step.bottomBox)) {
            $("<div class='bottomBox'/>").html(step.bottomBox).appendTo(goo);
        }
        if (!this.data.get_isStepPage()) {
            this._afterStep$1('Return to this activity', 'here', ss.Delegate.create(this, function() {
                BrowserUser.relink(this.data.get_pageUrl());
            })).appendTo(goo).append($("<img class='afterStepIcon afterStepWarn'/>").attr('src', 'nsb/fw/images/warn.svg'));
        }
        else if (!this.data.get_currentStep().noWheel) {
            $("<span class='clickBelow'>Click in the center of the circle below to start.</span>").appendTo(pp);
        }
        $("<div class='stepNumbers'/>").appendTo(this.goldText).append(String.format("<span class='step'>{0}</span> <span class='of'>of</span> {1}", this.data.step + 1, this.data.get_steps())).on('mousedown.tuw', ss.Delegate.create(this, function(e) {
            if (e.shiftKey) {
                TuneUp.TuBase.flashScreen();
                this.data.next();
                Snsb.cancelEvent(e);
            }
        })).on('mouseup.tuw', Snsb.cancelEvent);
        $(document).on('TuDataDoneEv', ss.Delegate.create(this, this.finalStep)).on('WheelInputChangeEv', ss.Delegate.create(this.data, this.data.save)).on('PnxWheelFinishEv', ss.Delegate.create(this, this.stepDone));
        this.startStep();
        this.elapsedTime();
        this.element.hide();
        $('blockquote', this.element).addClass('quotation');
        $('cite', this.element).addClass('quoteBy');
    })).addFn(ss.Delegate.create(this, this._startWheels$1)).commit();
}
TuneUp.TuWidget.VisionCloudStep = function TuneUp_TuWidget$VisionCloudStep(tuWidget, afterFn) {
    /// <param name="tuWidget" type="TuneUp.TuWidget">
    /// </param>
    /// <param name="afterFn" type="Function">
    /// </param>
    MagicWheel.GridCloud.popEdit(tuWidget, afterFn);
}
TuneUp.TuWidget.startQuickElevator = function TuneUp_TuWidget$startQuickElevator(e) {
    /// <param name="e" type="jQueryEvent">
    /// </param>
    if (MagicWheel.PayPalSubscriptions.get_isPaidFor()) {
        TuneUp.TuData.testData().start();
    }
    else {
        MagicWheel.PayPalSubscriptions.askPay();
    }
}
TuneUp.TuWidget.installElevatorButtons = function TuneUp_TuWidget$installElevatorButtons() {
    var elv = $('#Elevators, #Ad1');
    if (!elv.length) {
        return;
    }
    elv.empty();
    var div = $("<div class='elevatorOuter'/>").appendTo(elv);
    $("<div id='QuickElevator' title='play your way to bliss'/>").appendTo(div).html('Quick Elevator').on('click.elv', TuneUp.TuWidget.startQuickElevator);
}
TuneUp.TuWidget.prototype = {
    cancelMeme: false,
    data: null,
    goldText: null,
    _afterMeme$1: false,
    _elapsedTmr$1: 0,
    
    get_topic: function TuneUp_TuWidget$get_topic() {
        /// <value type="String"></value>
        return '/PnxTools/QuickElevator';
    },
    
    get_savedWheel: function TuneUp_TuWidget$get_savedWheel() {
        /// <value type="MagicWheel.FwData"></value>
        return (this.data.get_isStepPage()) ? (this.data.get_currentStep().savedWheel || new MagicWheel.FwData().setSegs(this.data.get_currentStep().spokes).set('hideSegSelect', this.data.get_currentStep().hideSpokes)) : null;
    },
    
    get_slideOpenSpeed: function TuneUp_TuWidget$get_slideOpenSpeed() {
        /// <value type="Number" integer="true"></value>
        return 800;
    },
    
    _startWheels$1: function TuneUp_TuWidget$_startWheels$1() {
        this.afterWidgetShown(ss.Delegate.create(this, function() {
            Snsb.waitOn(ss.Delegate.create(this, function() {
                new MagicWheel.GridCloud();
                if ($('.WheelInPage').length > 0) {
                    MagicWheel.GridCloud.set_theGrid(this.data.grid);
                    new TuneUp.Appreciator(this.data.wheelFromStep('appreciation - the golden goose that gives'));
                }
                if (!this.data.get_currentStep().noWheel) {
                    MagicWheel.Wheel.startWheel(this.get_savedWheel());
                }
            }), ss.Delegate.create(this, function() {
                return this._afterMeme$1;
            }), -1);
        }));
    },
    
    die: function TuneUp_TuWidget$die(afterFn) {
        /// <param name="afterFn" type="Function">
        /// </param>
        if (this.element != null) {
            this.element.slideUp(400, ss.Delegate.create(this, function() {
                this.element.remove();
                this.element = null;
                if (afterFn != null) {
                    afterFn();
                }
            }));
        }
        else {
            if (afterFn != null) {
                afterFn();
            }
        }
    },
    
    finalStep: function TuneUp_TuWidget$finalStep(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        $('span.step', this.element).text('\u2665');
    },
    
    go: function TuneUp_TuWidget$go(item) {
        /// <param name="item" type="TuneUp.TuStep">
        /// </param>
        var stp = this.data.steps.indexOf(item);
        if (stp >= 0) {
            var url = (item.pageUrl === 'index') ? '' : item.pageUrl;
            this.data.step = stp;
            this.data.save();
            url = '/' + url;
            Snsb.defer(function() {
                BrowserUser.relink(url, window.top);
            });
        }
    },
    
    startStep: function TuneUp_TuWidget$startStep() {
        var step = this.data.get_currentStep();
        if (!this.data.started) {
            this.data.start();
            return;
        }
        var afterFn = ss.Delegate.create(this, function() {
            if (!this.data.get_isStepDone() && this.data.get_isStepPage()) {
                MagicWheel.Wheel.afterWheel(ss.Delegate.create(this, function() {
                    this.data.save();
                }));
            }
            if (step.finalStep) {
                this.data.finished();
            }
        });
        step.visitCount = (isNaN(step.visitCount)) ? 0 : step.visitCount;
        step.visitCount++;
        if (!step.isStarted || step.isSkipped) {
            step.isStarted = true;
            step.isSkipped = false;
            step.isDone = false;
            step.startTime = Date.get_now().getTime();
        }
        this.data.save();
        new SudoNsb.Await().addDl(ss.Delegate.create(this, function(aw) {
            if (this.data.get_isStepPage() && !step.noMeme && !this.cancelMeme) {
                this.element.hide();
                SudoNsb._memes.setMemeFrom(step.memes);
                Snsb.waitOn(ss.Delegate.create(this, function() {
                    SudoNsb._memes.showCover(ss.Delegate.create(this, function() {
                        this._afterMeme$1 = true;
                        this.slideOpen();
                        aw.done();
                    }));
                }), function() {
                    return SudoNsb._memes.get_ready();
                });
            }
            else {
                this._afterMeme$1 = true;
                this.slideOpen();
                aw.done();
            }
        })).addDx(ss.Delegate.create(this, function() {
            if (this.data.get_isStepPage() && !Snsb.isEmpty(step.nextAction)) {
                eval(step.nextAction + "(this, afterFn)");
                return;
            }
            afterFn();
        })).addDx(ss.Delegate.create(this, function() {
            if (this.data.get_currentStep().finalStep) {
                this.stepDone();
            }
        })).commit();
    },
    
    stepDone: function TuneUp_TuWidget$stepDone(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        if (!this.data.get_currentStep().isDone) {
            this.data.get_currentStep().isDone = true;
            this.data.get_currentStep().stopTime = Date.get_now().getTime();
        }
        this.data.save();
        Snsb.defer(ss.Delegate.create(this, function() {
            var msg = (this.data.get_currentStep().finalStep) ? 'Your session is complete' : 'This step is complete';
            var face = (this.data.get_currentStep().finalStep) ? 'Close' : 'Next';
            var wrapper = $('#AfterStepWrapper');
            if (!wrapper.length) {
                wrapper = this._afterStep$1(msg, face, ss.Delegate.create(this.data, this.data.next)).appendTo(this.goldText).append($("<img class='afterStepIcon afterStepSmile'/>").attr('src', 'nsb/fw/images/smiley.svg')).hide();
            }
            Snsb.defer(function() {
                wrapper.slideDown(800, function() {
                    SudoNsb.Dom.scrollInViewAw(SudoNsb.Await.get_asyncAw(), wrapper);
                });
            });
        }), 2000);
    },
    
    quit: function TuneUp_TuWidget$quit() {
        new SudoNsb.Await().addAw(ss.Delegate.create(this.data, this.data.clearAw)).addFn(BrowserUser.reloadPage).commit();
    },
    
    _afterStep$1: function TuneUp_TuWidget$_afterStep$1(text, face, action) {
        /// <param name="text" type="String">
        /// </param>
        /// <param name="face" type="String">
        /// </param>
        /// <param name="action" type="Function">
        /// </param>
        /// <returns type="jQueryObject"></returns>
        var wrapper = $("<div id='AfterStepWrapper' class='afterStepWrapper'/>");
        wrapper.append($("<div class='afterStep'><span class='widget'>" + text + '</span></div>').append($('<button>' + face + '</button>').button().on('click.tuw', action).on('click.tuw', function() {
            $('button', wrapper).off('.tuw');
        })));
        return wrapper;
    },
    
    beforeSlideOpen: function TuneUp_TuWidget$beforeSlideOpen(el) {
        /// <param name="el" type="jQueryObject">
        /// </param>
        $('label.title, div.stepNumbers', el).hide();
    },
    
    afterSlideOpen: function TuneUp_TuWidget$afterSlideOpen(el) {
        /// <param name="el" type="jQueryObject">
        /// </param>
        $('label.title, div.stepNumbers', el).fadeIn(400);
        SudoNsb.Dom.scrollInViewAw(SudoNsb.Await.get_asyncAw(), el);
    },
    
    elapsedTime: function TuneUp_TuWidget$elapsedTime() {
        window.clearInterval(this._elapsedTmr$1);
        if (this.data.noTimes || this.data.get_currentStep().finalStep) {
            $('.elapsedTime', this.element).remove();
            return;
        }
        var fn = ss.Delegate.create(this, function() {
            if (Snsb.isEmpty(this.data.get_currentStep().startTime)) {
                return;
            }
            var el = $('.elapsedTime', this.element);
            if (!el.length) {
                el = $("<span class='elapsedTime'/>").appendTo(this.goldText);
            }
            el.html('started ' + Strings.timespan(this.data.get_currentStep().startTime));
        });
        fn();
        this._elapsedTmr$1 = window.setInterval(fn, 1000);
    }
}


Type.registerNamespace('NsbMath');

////////////////////////////////////////////////////////////////////////////////
// NsbMath.Trig

NsbMath.Trig = function NsbMath_Trig() {
}
NsbMath.Trig.toRadians = function NsbMath_Trig$toRadians(deg) {
    /// <param name="deg" type="Number">
    /// </param>
    /// <returns type="Number"></returns>
    return deg * Math.PI / 180;
}
NsbMath.Trig.toDegrees = function NsbMath_Trig$toDegrees(rad) {
    /// <param name="rad" type="Number">
    /// </param>
    /// <returns type="Number"></returns>
    return rad * 180 / Math.PI;
}
NsbMath.Trig.toAngle = function NsbMath_Trig$toAngle(x, y) {
    /// <param name="x" type="Number" integer="true">
    /// </param>
    /// <param name="y" type="Number" integer="true">
    /// </param>
    /// <returns type="Number"></returns>
    var theta = Math.atan(y / x) * 360 / 2 / Math.PI;
    if (x >= 0 && y >= 0) {
        return theta;
    }
    if (x < 0 && y >= 0) {
        theta = 180 + theta;
    }
    else if (x < 0 && y < 0) {
        theta = 180 + theta;
    }
    else if (x > 0 && y < 0) {
        theta = 360 + theta;
    }
    return theta;
}


SudoNsb.CssTransition.registerClass('SudoNsb.CssTransition');
SudoNsb.Dialog.registerClass('SudoNsb.Dialog');
SudoNsb.PrefixFree.registerClass('SudoNsb.PrefixFree');
SqlStorage.registerClass('SqlStorage');
SudoNsb.BrowserType.registerClass('SudoNsb.BrowserType');
SudoNsb.UnitTest.registerClass('SudoNsb.UnitTest', SudoNsb.Await);
SudoNsb.UnitTestItem.registerClass('SudoNsb.UnitTestItem');
SudoNsb.AnimateRotate.registerClass('SudoNsb.AnimateRotate');
SudoNsb.ArcText.registerClass('SudoNsb.ArcText');
SudoNsb.Closer.registerClass('SudoNsb.Closer');
SudoNsb.Cxy.registerClass('SudoNsb.Cxy');
SudoNsb.Canvas.registerClass('SudoNsb.Canvas');
SudoNsb.Cpt.registerClass('SudoNsb.Cpt');
SudoNsb.Ctx.registerClass('SudoNsb.Ctx');
SudoNsb.Grd.registerClass('SudoNsb.Grd');
SudoNsb._fileDirs.registerClass('SudoNsb._fileDirs');
PkgResult.registerClass('PkgResult');
DirMap.registerClass('DirMap');
SudoNsb.Filters.registerClass('SudoNsb.Filters');
SudoNsb.GridNest.registerClass('SudoNsb.GridNest');
SudoNsb.JQueryEasing.registerClass('SudoNsb.JQueryEasing');
SudoNsb._memes.registerClass('SudoNsb._memes');
SudoNsb.Text.registerClass('SudoNsb.Text');
Jarvis.Bucket.registerClass('Jarvis.Bucket');
Jarvis.BucketItem.registerClass('Jarvis.BucketItem');
Jarvis.Clipboard.registerClass('Jarvis.Clipboard', Jarvis.Bucket);
Jarvis.ClipItem.registerClass('Jarvis.ClipItem');
MagicWheel.CkEditor.registerClass('MagicWheel.CkEditor');
MagicWheel.CkEditorOpts.registerClass('MagicWheel.CkEditorOpts');
MagicWheel.PayPal.registerClass('MagicWheel.PayPal');
MagicWheel.PayPalBtnOpts.registerClass('MagicWheel.PayPalBtnOpts');
MagicWheel.PayPalSubscriptions.registerClass('MagicWheel.PayPalSubscriptions');
MagicWheel.PnxPurchases.registerClass('MagicWheel.PnxPurchases');
MagicWheel.PnxPurchaseData.registerClass('MagicWheel.PnxPurchaseData');
MagicWheel.PaypalPingItems.registerClass('MagicWheel.PaypalPingItems');
MagicWheel.PnxTransaction.registerClass('MagicWheel.PnxTransaction');
MagicWheel.PaypalSession.registerClass('MagicWheel.PaypalSession', SudoNsb.SessionData);
MagicWheel.PopWindow.registerClass('MagicWheel.PopWindow');
MagicWheel.PopWindowOptions.registerClass('MagicWheel.PopWindowOptions');
MagicWheel.AskBase.registerClass('MagicWheel.AskBase');
MagicWheel.AskOk.registerClass('MagicWheel.AskOk', MagicWheel.AskBase);
MagicWheel.AskOkCancel.registerClass('MagicWheel.AskOkCancel', MagicWheel.AskBase);
MagicWheel.AskDelete.registerClass('MagicWheel.AskDelete', MagicWheel.AskBase);
MagicWheel.AppStyle.registerClass('MagicWheel.AppStyle');
MagicWheel.ArcText2.registerClass('MagicWheel.ArcText2');
MagicWheel.Emotions.registerClass('MagicWheel.Emotions');
MagicWheel.FwData.registerClass('MagicWheel.FwData');
TuneUp.TuBase.registerClass('TuneUp.TuBase');
MagicWheel.GridCloud.registerClass('MagicWheel.GridCloud', TuneUp.TuBase);
MagicWheel.SavedGrid.registerClass('MagicWheel.SavedGrid');
MagicWheel.MyPop.registerClass('MagicWheel.MyPop');
MagicWheel.GridEditor.registerClass('MagicWheel.GridEditor', MagicWheel.MyPop);
MagicWheel.SavedGrids.registerClass('MagicWheel.SavedGrids');
MagicWheel.MyPopBtn.registerClass('MagicWheel.MyPopBtn');
MagicWheel.ReSpoke.registerClass('MagicWheel.ReSpoke');
MagicWheel.WheelExport.registerClass('MagicWheel.WheelExport');
MagicWheel.WheelDef.registerClass('MagicWheel.WheelDef');
MagicWheel.FocusWheel.registerClass('MagicWheel.FocusWheel', MagicWheel.WheelDef);
MagicWheel.UrTenWheel.registerClass('MagicWheel.UrTenWheel', MagicWheel.WheelDef);
MagicWheel.YesWheel.registerClass('MagicWheel.YesWheel', MagicWheel.WheelDef);
MagicWheel.HopoWheel.registerClass('MagicWheel.HopoWheel', MagicWheel.WheelDef);
MagicWheel.GearWorks.registerClass('MagicWheel.GearWorks');
MagicWheel.HeartBalloons.registerClass('MagicWheel.HeartBalloons');
MagicWheel.My.registerClass('MagicWheel.My');
MagicWheel.MyData.registerClass('MagicWheel.MyData');
MagicWheel.Stats.registerClass('MagicWheel.Stats');
MagicWheel.Saver.registerClass('MagicWheel.Saver');
MagicWheel.ShowTimes.registerClass('MagicWheel.ShowTimes');
MagicWheel.Snapshot.registerClass('MagicWheel.Snapshot');
MagicWheel.Wheel.registerClass('MagicWheel.Wheel');
MagicWheel.Input.registerClass('MagicWheel.Input');
MagicWheel.Yatta.registerClass('MagicWheel.Yatta');
MagicWheel.Main.registerClass('MagicWheel.Main');
MagicWheel.PurchaseItems.registerClass('MagicWheel.PurchaseItems');
TuneUp.Appreciator.registerClass('TuneUp.Appreciator', TuneUp.TuBase);
TuneUp.Question.registerClass('TuneUp.Question');
TuneUp.QuestionText.registerClass('TuneUp.QuestionText');
TuneUp.QuestionScale.registerClass('TuneUp.QuestionScale');
TuneUp.TuData.registerClass('TuneUp.TuData');
TuneUp.TuStep.registerClass('TuneUp.TuStep');
TuneUp.TuPages.registerClass('TuneUp.TuPages');
TuneUp.TuDetailEditor.registerClass('TuneUp.TuDetailEditor');
TuneUp.TuWidget.registerClass('TuneUp.TuWidget', TuneUp.TuBase);
NsbMath.Trig.registerClass('NsbMath.Trig');
SudoNsb.CssTransition._loaded = false;
(function () {
    Snsb.defer(function() {
        eval('\r\n(function(t,e){if(typeof define==="function"&&define.amd){define(["jquery"],e)}else if(typeof exports==="object"){module.exports=e(require("jquery"))}else{e(t.jQuery)}})(this,function(t){t.transit={version:"0.9.12",propertyMap:{marginLeft:"margin",marginRight:"margin",marginBottom:"margin",marginTop:"margin",paddingLeft:"padding",paddingRight:"padding",paddingBottom:"padding",paddingTop:"padding"},enabled:true,useTransitionEnd:false};var e=document.createElement("div");var n={};function i(t){if(t in e.style)return t;var n=["Moz","Webkit","O","ms"];var i=t.charAt(0).toUpperCase()+t.substr(1);for(var r=0;r<n.length;++r){var s=n[r]+i;if(s in e.style){return s}}}function r(){e.style[n.transform]="";e.style[n.transform]="rotateY(90deg)";return e.style[n.transform]!==""}var s=navigator.userAgent.toLowerCase().indexOf("chrome")>-1;n.transition=i("transition");n.transitionDelay=i("transitionDelay");n.transform=i("transform");n.transformOrigin=i("transformOrigin");n.filter=i("Filter");n.transform3d=r();var a={transition:"transitionend",MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",msTransition:"MSTransitionEnd"};var o=n.transitionEnd=a[n.transition]||null;for(var u in n){if(n.hasOwnProperty(u)&&typeof t.support[u]==="undefined"){t.support[u]=n[u]}}e=null;t.cssEase={_default:"ease","in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",easeInCubic:"cubic-bezier(.550,.055,.675,.190)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"};t.cssHooks["transit:transform"]={get:function(e){return t(e).data("transform")||new f},set:function(e,i){var r=i;if(!(r instanceof f)){r=new f(r)}if(n.transform==="WebkitTransform"&&!s){e.style[n.transform]=r.toString(true)}else{e.style[n.transform]=r.toString()}t(e).data("transform",r)}};t.cssHooks.transform={set:t.cssHooks["transit:transform"].set};t.cssHooks.filter={get:function(t){return t.style[n.filter]},set:function(t,e){t.style[n.filter]=e}};if(t.fn.jquery<"1.8"){t.cssHooks.transformOrigin={get:function(t){return t.style[n.transformOrigin]},set:function(t,e){t.style[n.transformOrigin]=e}};t.cssHooks.transition={get:function(t){return t.style[n.transition]},set:function(t,e){t.style[n.transition]=e}}}p("scale");p("scaleX");p("scaleY");p("translate");p("rotate");p("rotateX");p("rotateY");p("rotate3d");p("perspective");p("skewX");p("skewY");p("x",true);p("y",true);function f(t){if(typeof t==="string"){this.parse(t)}return this}f.prototype={setFromString:function(t,e){var n=typeof e==="string"?e.split(","):e.constructor===Array?e:[e];n.unshift(t);f.prototype.set.apply(this,n)},set:function(t){var e=Array.prototype.slice.apply(arguments,[1]);if(this.setter[t]){this.setter[t].apply(this,e)}else{this[t]=e.join(",")}},get:function(t){if(this.getter[t]){return this.getter[t].apply(this)}else{return this[t]||0}},setter:{rotate:function(t){this.rotate=b(t,"deg")},rotateX:function(t){this.rotateX=b(t,"deg")},rotateY:function(t){this.rotateY=b(t,"deg")},scale:function(t,e){if(e===undefined){e=t}this.scale=t+","+e},skewX:function(t){this.skewX=b(t,"deg")},skewY:function(t){this.skewY=b(t,"deg")},perspective:function(t){this.perspective=b(t,"px")},x:function(t){this.set("translate",t,null)},y:function(t){this.set("translate",null,t)},translate:function(t,e){if(this._translateX===undefined){this._translateX=0}if(this._translateY===undefined){this._translateY=0}if(t!==null&&t!==undefined){this._translateX=b(t,"px")}if(e!==null&&e!==undefined){this._translateY=b(e,"px")}this.translate=this._translateX+","+this._translateY}},getter:{x:function(){return this._translateX||0},y:function(){return this._translateY||0},scale:function(){var t=(this.scale||"1,1").split(",");if(t[0]){t[0]=parseFloat(t[0])}if(t[1]){t[1]=parseFloat(t[1])}return t[0]===t[1]?t[0]:t},rotate3d:function(){var t=(this.rotate3d||"0,0,0,0deg").split(",");for(var e=0;e<=3;++e){if(t[e]){t[e]=parseFloat(t[e])}}if(t[3]){t[3]=b(t[3],"deg")}return t}},parse:function(t){var e=this;t.replace(/([a-zA-Z0-9]+)\\((.*?)\\)/g,function(t,n,i){e.setFromString(n,i)})},toString:function(t){var e=[];for(var i in this){if(this.hasOwnProperty(i)){if(!n.transform3d&&(i==="rotateX"||i==="rotateY"||i==="perspective"||i==="transformOrigin")){continue}if(i[0]!=="_"){if(t&&i==="scale"){e.push(i+"3d("+this[i]+",1)")}else if(t&&i==="translate"){e.push(i+"3d("+this[i]+",0)")}else{e.push(i+"("+this[i]+")")}}}}return e.join(" ")}};function c(t,e,n){if(e===true){t.queue(n)}else if(e){t.queue(e,n)}else{t.each(function(){n.call(this)})}}function l(e){var i=[];t.each(e,function(e){e=t.camelCase(e);e=t.transit.propertyMap[e]||t.cssProps[e]||e;e=h(e);if(n[e])e=h(n[e]);if(t.inArray(e,i)===-1){i.push(e)}});return i}function d(e,n,i,r){var s=l(e);if(t.cssEase[i]){i=t.cssEase[i]}var a=""+y(n)+" "+i;if(parseInt(r,10)>0){a+=" "+y(r)}var o=[];t.each(s,function(t,e){o.push(e+" "+a)});return o.join(", ")}t.fn.transition=t.fn.transit=function(e,i,r,s){var a=this;var u=0;var f=true;var l=t.extend(true,{},e);if(typeof i==="function"){s=i;i=undefined}if(typeof i==="object"){r=i.easing;u=i.delay||0;f=typeof i.queue==="undefined"?true:i.queue;s=i.complete;i=i.duration}if(typeof r==="function"){s=r;r=undefined}if(typeof l.easing!=="undefined"){r=l.easing;delete l.easing}if(typeof l.duration!=="undefined"){i=l.duration;delete l.duration}if(typeof l.complete!=="undefined"){s=l.complete;delete l.complete}if(typeof l.queue!=="undefined"){f=l.queue;delete l.queue}if(typeof l.delay!=="undefined"){u=l.delay;delete l.delay}if(typeof i==="undefined"){i=t.fx.speeds._default}if(typeof r==="undefined"){r=t.cssEase._default}i=y(i);var p=d(l,i,r,u);var h=t.transit.enabled&&n.transition;var b=h?parseInt(i,10)+parseInt(u,10):0;if(b===0){var g=function(t){a.css(l);if(s){s.apply(a)}if(t){t()}};c(a,f,g);return a}var m={};var v=function(e){var i=false;var r=function(){if(i){a.unbind(o,r)}if(b>0){a.each(function(){this.style[n.transition]=m[this]||null})}if(typeof s==="function"){s.apply(a)}if(typeof e==="function"){e()}};if(b>0&&o&&t.transit.useTransitionEnd){i=true;a.bind(o,r)}else{window.setTimeout(r,b)}a.each(function(){if(b>0){this.style[n.transition]=p}t(this).css(l)})};var z=function(t){this.offsetWidth;v(t)};c(a,f,z);return this};function p(e,i){if(!i){t.cssNumber[e]=true}t.transit.propertyMap[e]=n.transform;t.cssHooks[e]={get:function(n){var i=t(n).css("transit:transform");return i.get(e)},set:function(n,i){var r=t(n).css("transit:transform");r.setFromString(e,i);t(n).css({"transit:transform":r})}}}function h(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}function b(t,e){if(typeof t==="string"&&!t.match(/^[\\-0-9\\.]+$/)){return t}else{return""+t+e}}function y(e){var n=e;if(typeof n==="string"&&!n.match(/^[\\-0-9\\.]+/)){n=t.fx.speeds[n]||t.fx.speeds._default}return b(n,"ms")}t.transit.getTransitionValue=d;return t});');
        SudoNsb.CssTransition._loaded = true;
    });
})();
SudoNsb.PrefixFree._loaded = false;
SqlStorage.sqlDataFromServerOnly = '@SqlDataFromServerOnly';
SqlStorage.isSession = true;
(function () {
    SudoNsb.Storage.defaultLocal('@SqlDataFromServerOnly', false);
})();
SudoNsb.AnimateRotate._jsLoaded = false;
(function () {
    Snsb.defer(function() {
        eval("(function(e,t){function n(t,n,r,i){var s=t.text().split(n),o=\"\",u;if(s.length){e(s).each(function(e,t){u=\"\";if(t===\" \"){u=\" empty\";t=\"&nbsp;\"}o+='<span class=\"'+r+(e+1)+u+'\">'+t+\"</span>\"+i});t.empty().append(o)}}e.fn.fitText=function(t,n){var r={minFontSize:Number.NEGATIVE_INFINITY,maxFontSize:Number.POSITIVE_INFINITY};return this.each(function(){var i=e(this);var s=t||1;if(n){e.extend(r,n)}var o=function(){i.css(\"font-size\",Math.max(Math.min(i.width()/(s*10),parseFloat(r.maxFontSize)),parseFloat(r.minFontSize)))};o();e(window).resize(o)})};var r={init:function(){return this.each(function(){n(e(this),\"\",\"char\",\"\")})},words:function(){return this.each(function(){n(e(this),\" \",\"word\",\" \")})},lines:function(){return this.each(function(){var t=\"eefec303079ad17405c889e092e105b0\";n(e(this).children(\"br\").replaceWith(t).end(),t,\"line\",\"\")})}};e.fn.lettering=function(t){if(t&&r[t]){return r[t].apply(this,[].slice.call(arguments,1))}else if(t===\"letters\"||!t){return r.init.apply(this,[].slice.call(arguments,0))}e.error(\"Method \"+t+\" does not exist on jQuery.lettering\");return this};e.Arctext=function(t,n){this.$el=e(n);this._init(t)};e.Arctext.defaults={radius:0,dir:1,rotate:true,fitText:false};e.Arctext.prototype={_init:function(t){this.options=e.extend(true,{},e.Arctext.defaults,t);this._applyLettering();this.$el.data(\"arctext\",true);this._calc();this._rotateWord();this._loadEvents()},_applyLettering:function(){this.$el.lettering();if(this.options.fitText)this.$el.fitText();this.$letters=this.$el.find(\"span\").css(\"display\",\"inline-block\")},_calc:function(){if(this.options.radius===-1)return false;this._calcBase();this._calcLetters()},_calcBase:function(){this.dtWord=0;var t=this;this.$letters.each(function(n){var r=e(this),i=r.outerWidth(true);t.dtWord+=i;r.data(\"center\",t.dtWord-i/2)});var n=this.dtWord/2;if(this.options.radius<n)this.options.radius=n;this.dtArcBase=this.dtWord;var r=2*Math.asin(this.dtArcBase/(2*this.options.radius));this.dtArc=this.options.radius*r},_calcLetters:function(){var t=this,n=0;this.$letters.each(function(r){var i=e(this),s=i.outerWidth(true)/t.dtWord*t.dtArc,o=s/t.options.radius,u=t.options.radius*Math.cos(o/2),a=Math.acos((t.dtWord/2-n)/t.options.radius),f=a+o/2,l=Math.cos(f)*u,c=Math.sin(f)*u,h=n+Math.abs(t.dtWord/2-l-n),p=0|h-i.data(\"center\"),d=0|t.options.radius-c,v=t.options.rotate?0|-Math.asin(l/t.options.radius)*(180/Math.PI):0;n=2*h-n;i.data({x:p,y:t.options.dir===1?d:-d,a:t.options.dir===1?v:-v})})},_rotateWord:function(t){if(!this.$el.data(\"arctext\"))return false;var n=this;this.$letters.each(function(r){var i=e(this),s=n.options.radius===-1?\"none\":\"translateX(\"+i.data(\"x\")+\"px) translateY(\"+i.data(\"y\")+\"px) rotate(\"+i.data(\"a\")+\"deg)\",o=t?\"all \"+(t.speed||0)+\"ms \"+(t.easing||\"linear\"):\"none\";i.css({\"-webkit-transition\":o,\"-moz-transition\":o,\"-o-transition\":o,\"-ms-transition\":o,transition:o}).css({\"-webkit-transform\":s,\"-moz-transform\":s,\"-o-transform\":s,\"-ms-transform\":s,transform:s})})},_loadEvents:function(){if(this.options.fitText){var t=this;e(window).on(\"resize.arctext\",function(){t._calc();t._rotateWord()})}},set:function(e){if(!e.radius&&!e.dir&&e.rotate===\"undefined\"){return false}this.options.radius=e.radius||this.options.radius;this.options.dir=e.dir||this.options.dir;if(e.rotate!==t){this.options.rotate=e.rotate}this._calc();this._rotateWord(e.animation)},destroy:function(){this.options.radius=-1;this._rotateWord();this.$letters.removeData(\"x y a center\");this.$el.removeData(\"arctext\");e(window).off(\".arctext\")}};var i=function(e){if(this.console){console.error(e)}};e.fn.arctext=function(t){if(typeof t===\"string\"){var n=Array.prototype.slice.call(arguments,1);this.each(function(){var r=e.data(this,\"arctext\");if(!r){i(\"cannot call methods on arctext prior to initialization; \"+\"attempted to call method '\"+t+\"'\");return}if(!e.isFunction(r[t])||t.charAt(0)===\"_\"){i(\"no such method '\"+t+\"' for arctext instance\");return}r[t].apply(r,n)})}else{this.each(function(){var n=e.data(this,\"arctext\");if(!n){e.data(this,\"arctext\",new e.Arctext(t,this))}})}return this}})(jQuery)");
    });
})();
(function () {
    $(function() {
        MyCss.addStyleOnce((SudoNsb.Closer).get_fullName(), "\r\na.ClosableLink, a.ClosableLink:active, a.ClosableLink:visited, a.CloseableLink:hover {\r\n    position: absolute;\r\n    width: 24px;\r\n    height: 24px;\r\n    font-family: arial;\r\n    font-size: 23px;\r\n    line-height: 23px;\r\n    font-weight: bold;\r\n    cursorColor: pointer;\r\n    top: -13px;\r\n    right: -13px;\r\n    color: black;\r\n    opacity: .75;\r\n    background: #FFF;\r\n    border: 3px solid #9B9B9B;\r\n    border-radius: 24px;\r\n    text-align: center;\r\n    text-shadow: 0px 0px 4px #000;\r\n}\r\na.ClosableLink:hover {\r\n    opacity: 1;\r\n}\r\na.nsbTip:before {\r\n    content: '';\r\n    position: absolute;\r\n    width: 0;\r\n    height: 0;\r\n    border-top: 20px solid #000;\r\n    border-left: 20px solid transparent;\r\n    border-right: 20px solid transparent;\r\n    opacity: 0;\r\n    left: -30%;\r\n    bottom: 130%;\r\n}\r\na.nsbTip:after {\r\n    content: attr(data-tooltip);\r\n    position: absolute;\r\n    bottom: 160%;\r\n    left: -56%;\r\n    color: #FFF;\r\n    background: #000;\r\n    padding: 2px 10px;\r\n    -webkit-border-radius: 10px;\r\n    -moz-border-radius: 10px;\r\n    border-radius: 10px;\r\n    white-space: nowrap;\r\n    opacity: 0;\r\n    font-size: 14px;\r\n    font-family: sans-serif, arial;\r\n    text-shadow: none;\r\n}\r\na.nsbTip:hover:after, a:hover:before {\r\n    opacity: 1;\r\n}\r\n");
    });
})();
SudoNsb._fileDirs.threadCnt = 0;
SudoNsb.Filters.map = {};
SudoNsb.Filters.awMap = {};
(function () {
    Snsb.defer(function() {
        eval("(function(e,t){var n=function(e,t,n){var r;return function(){function u(){if(!n)e.apply(s,o);r=null}var s=this,o=arguments;if(r)clearTimeout(r);else if(n)e.apply(s,o);r=setTimeout(u,t||150)}};jQuery.fn[t]=function(e){return e?this.bind('resize',n(e)):this.trigger(t)}})(jQuery,'smartresize');if(!Object.keys){Object.keys=function(e){var t=[],n;for(n in e){if(Object.prototype.hasOwnProperty.call(e,n)){t.push(n)}}return t}}(function(e){e.Nested=function(t,n){this.element=e(n);this._init(t)};e.Nested.settings={selector:'.box',minWidth:50,minColumns:1,gutter:1,centered:false,resizeToFit:true,resizeToFitOptions:{resizeAny:true},animate:true,animationOptions:{speed:20,duration:100,queue:true,complete:function(){}}};e.Nested.prototype={_init:function(t){var n=this;this.box=this.element;this.options=e.extend(true,{},e.Nested.settings,t);this.elements=[];this._isResizing=false;this._update=true;this.maxy=new Array;e(window).smartresize(function(){n.resize()});this._setBoxes()},_setBoxes:function(t,n){var r=this;this.idCounter=0;this.counter=0;this.t=0;this.maxHeight=0;this.currWidth=0;this.total=this.box.find(this.options.selector);this.matrix={};this.gridrow=new Object;var i=!this.options.centered?this.box.innerWidth():e(window).width();this.columns=Math.max(this.options.minColumns,parseInt(i/(this.options.minWidth+this.options.gutter))+1);var s=this.options.minWidth;var o=this.options.gutter;var u='block';t=this.box.find(this.options.selector);e.each(t,function(){var t=parseInt(e(this).attr('class').replace(/^.*size([0-9]+).*$/,'$1')).toString().split('');var i=t[0]=='N'?1:parseFloat(t[0]);var a=t[1]=='a'?1:parseFloat(t[1]);var f=s*i+o*(i-1);var l=s*a+o*(a-1);e(this).css({display:u,position:'absolute',width:f,height:l,top:e(this).position().top,left:e(this).position().left}).removeClass('nested-moved').attr('data-box',r.idCounter).attr('data-width',f);r.idCounter++;r._renderGrid(e(this),n)});if(r.counter==r.total.length){if(r.options.resizeToFit){r.elements=r._fillGaps()}r._renderItems(r.elements);r.elements=[]}},_addMatrixRow:function(e){if(this.matrix[e]){return false}else this.matrix[e]={};for(var t=0;t<this.columns-1;t++){var n=t*(this.options.minWidth+this.options.gutter);this.matrix[e][n]='false'}},_updateMatrix:function(e){var t=0;var n=parseInt(e['y']);var r=parseInt(e['x']);for(var i=0;i<e['height'];i+=this.options.minWidth+this.options.gutter){for(var s=0;s<e['width'];s+=this.options.minWidth+this.options.gutter){var o=r+s;var u=n+i;if(!this.matrix[u]){this._addMatrixRow(u)}this.matrix[u][o]='true'}}},_getObjectSize:function(t){var n=0;e.each(t,function(e,t){n++});return n},_fillGaps:function(){var t=this;var n={};e.each(this.elements,function(e,n){t._updateMatrix(n)});var r=this.elements;r.sort(function(e,t){return e.y-t.y});r.reverse();var i=r[0]['y'];var s=0;var o=this._getObjectSize(this.matrix);e.each(this.matrix,function(u,a){o--;s=parseInt(u);e.each(a,function(a,f){if(f==='false'&&s<i){if(!n.y)n.y=u;if(!n.x)n.x=a;if(!n.w)n.w=0;if(!n.h)n.h=t.options.minWidth;n.w+=n.w?t.options.minWidth+t.options.gutter:t.options.minWidth;var l=0;for(var c=1;c<o;c++){var h=parseInt(u)+parseInt(c*(t.options.minWidth+t.options.gutter));if(t.matrix[h]&&t.matrix[h][a]=='false'){l+=t.options.minWidth+t.options.gutter;t.matrix[h][a]='true'}else break}n.h+(parseInt(l)/(t.options.minWidth+t.options.gutter)==o)?0:parseInt(l);n.ready=true}else if(n.ready){e.each(r,function(i,s){if(n.y<=r[i]['y']&&(t.options.resizeToFitOptions.resizeAny||n.w<=r[i]['width']&&n.h<=r[i]['height'])){r.splice(i,1);e(s['$el']).addClass('nested-moved');t.elements.push({$el:e(s['$el']),x:parseInt(n.x),y:parseInt(n.y),col:i,width:parseInt(n.w),height:parseInt(n.h)});return false}});n={}}})});t.elements=r;return t.elements},_renderGrid:function(e,t){this.counter++;var n,r=n=0;var i=0;var s=!t?'append':'prepend';var o=e.width();var u=e.height();var a=Math.ceil(o/(this.options.minWidth+this.options.gutter));var f=Math.ceil(u/(this.options.minWidth+this.options.gutter));if(a>this.options.minColumns){this.options.minColumns=a}while(true){for(var l=a;l>=0;l--){if(this.gridrow[r+l])break;this.gridrow[r+l]=new Object;for(var c=0;c<this.columns;c++){this.gridrow[r+l][c]=false}}for(var h=0;h<this.columns-a;h++){matrixY=r*(this.options.minWidth+this.options.gutter);this._addMatrixRow(matrixY);var p=true;for(var l=0;l<f;l++){for(var c=0;c<a;c++){if(!this.gridrow[r+l]){break}if(this.gridrow[r+l][h+c]){p=false;break}}if(!p){break}}if(p){for(var l=0;l<f;l++){for(var c=0;c<a;c++){if(!this.gridrow[r+l]){break}this.gridrow[r+l][h+c]=true}}this._pushItem(e,h*(this.options.minWidth+this.options.gutter),r*(this.options.minWidth+this.options.gutter),o,u,a,f,s);return}}r++}},_pushItem:function(e,t,n,r,i,s,o,u){if(u=='prepend'){this.elements.unshift({$el:e,x:t,y:n,width:r,height:i,cols:s,rows:o})}else{this.elements.push({$el:e,x:t,y:n,width:r,height:i,cols:s,rows:o})}},_setHeight:function(t){var n=this;e.each(t,function(e,t){var r=t['y']+t['height'];if(r>n.maxHeight){n.maxHeight=r}});return n.maxHeight},_setWidth:function(t){var n=this;e.each(t,function(e,t){var r=t['x']+t['width'];if(r>n.currWidth){n.currWidth=r}});return n.currWidth},_renderItems:function(t){var n=this;if(this.options.centered){this.box.css('height',this._setHeight(t));this.box.css({width:this._setWidth(t),'margin-left':'auto','margin-right':'auto'})}t.reverse();var r=this.options.animationOptions.speed;var i=this.options.animationOptions.effect;var s=this.options.animationOptions.duration;var o=this.options.animationOptions.queue;var u=this.options.animate;var a=this.options.animationOptions.complete;var f=this;var l=0;var c=0;e.each(t,function(n,i){$currLeft=e(i['$el']).position().left;$currTop=e(i['$el']).position().top;$currWidth=e(i['$el']).width();$currHeight=e(i['$el']).width();i['$el'].attr('data-y',$currTop).attr('data-x',$currLeft);if(u&&o&&($currLeft!=i['x']||$currTop!=i['y'])){setTimeout(function(){i['$el'].css({display:'block',width:i['width'],height:i['height']}).animate({left:i['x'],top:i['y']},s);c++;if(c==l){a.call(undefined,t)}},l*r);l++}if(u&&!o&&($currLeft!=i['x']||$currTop!=i['y'])){setTimeout(function(){i['$el'].css({display:'block',width:i['width'],height:i['height']}).animate({left:i['x'],top:i['y']},s);c++;if(c==l){a.call(undefined,t)}},l);l++}if(!u&&($currLeft!=i['x']||$currTop!=i['y'])){i['$el'].css({display:'block',width:i['width'],height:i['height'],left:i['x'],top:i['y']});c++;if(c==l){a.call(undefined,t)}}});if(l==0){a.call(undefined,t)}},append:function(e){this._isResizing=true;this._setBoxes(e,'append');this._isResizing=false},prepend:function(e){this._isResizing=true;this._setBoxes(e,'prepend');this._isResizing=false},resize:function(e){if(Object.keys(this.matrix[0]).length%Math.floor(this.element.width()/(this.options.minWidth+this.options.gutter))>0){this._isResizing=true;this._setBoxes(this.box.find(this.options.selector));this._isResizing=false}},refresh:function(t){t=t||this.options;this.options=e.extend(true,{},e.Nested.settings,t);this.elements=[];this._isResizing=false;this._setBoxes()},destroy:function(){var t=this;e(window).unbind('resize',function(){t.resize()});$els=this.box.find(this.options.selector);e($els).removeClass('nested-moved').removeAttr('style data-box data-width data-x data-y').removeData();this.box.removeAttr('style').removeData()}};var t={refresh:function(t){return this.each(function(){var n=e(this);var r=n.data('nested');r.refresh(t)})},destroy:function(){return this.each(function(){var t=e(this);var n=t.data('nested');n.destroy()})}};e.fn.nested=function(n,r){if(t[n]){return t[n].apply(this,Array.prototype.slice.call(arguments,1))}if(typeof n==='string'){this.each(function(){var t=e.data(this,'nested');t[n].apply(t,[r])})}else{this.each(function(){e.data(this,'nested',new e.Nested(n,this))})}return this}})(jQuery)");
    });
})();
(function () {
    Snsb.defer(function() {
        eval('jQuery.easing["jswing"]=jQuery.easing["swing"];jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,t,n,r,i){return jQuery.easing[jQuery.easing.def](e,t,n,r,i)},easeInQuad:function(e,t,n,r,i){return r*(t/=i)*t+n},easeOutQuad:function(e,t,n,r,i){return-r*(t/=i)*(t-2)+n},easeInOutQuad:function(e,t,n,r,i){if((t/=i/2)<1)return r/2*t*t+n;return-r/2*(--t*(t-2)-1)+n},easeInCubic:function(e,t,n,r,i){return r*(t/=i)*t*t+n},easeOutCubic:function(e,t,n,r,i){return r*((t=t/i-1)*t*t+1)+n},easeInOutCubic:function(e,t,n,r,i){if((t/=i/2)<1)return r/2*t*t*t+n;return r/2*((t-=2)*t*t+2)+n},easeInQuart:function(e,t,n,r,i){return r*(t/=i)*t*t*t+n},easeOutQuart:function(e,t,n,r,i){return-r*((t=t/i-1)*t*t*t-1)+n},easeInOutQuart:function(e,t,n,r,i){if((t/=i/2)<1)return r/2*t*t*t*t+n;return-r/2*((t-=2)*t*t*t-2)+n},easeInQuint:function(e,t,n,r,i){return r*(t/=i)*t*t*t*t+n},easeOutQuint:function(e,t,n,r,i){return r*((t=t/i-1)*t*t*t*t+1)+n},easeInOutQuint:function(e,t,n,r,i){if((t/=i/2)<1)return r/2*t*t*t*t*t+n;return r/2*((t-=2)*t*t*t*t+2)+n},easeInSine:function(e,t,n,r,i){return-r*Math.cos(t/i*(Math.PI/2))+r+n},easeOutSine:function(e,t,n,r,i){return r*Math.sin(t/i*(Math.PI/2))+n},easeInOutSine:function(e,t,n,r,i){return-r/2*(Math.cos(Math.PI*t/i)-1)+n},easeInExpo:function(e,t,n,r,i){return t==0?n:r*Math.pow(2,10*(t/i-1))+n},easeOutExpo:function(e,t,n,r,i){return t==i?n+r:r*(-Math.pow(2,-10*t/i)+1)+n},easeInOutExpo:function(e,t,n,r,i){if(t==0)return n;if(t==i)return n+r;if((t/=i/2)<1)return r/2*Math.pow(2,10*(t-1))+n;return r/2*(-Math.pow(2,-10*--t)+2)+n},easeInCirc:function(e,t,n,r,i){return-r*(Math.sqrt(1-(t/=i)*t)-1)+n},easeOutCirc:function(e,t,n,r,i){return r*Math.sqrt(1-(t=t/i-1)*t)+n},easeInOutCirc:function(e,t,n,r,i){if((t/=i/2)<1)return-r/2*(Math.sqrt(1-t*t)-1)+n;return r/2*(Math.sqrt(1-(t-=2)*t)+1)+n},easeInElastic:function(e,t,n,r,i){var s=1.70158;var o=0;var u=r;if(t==0)return n;if((t/=i)==1)return n+r;if(!o)o=i*.3;if(u<Math.abs(r)){u=r;var s=o/4}else var s=o/(2*Math.PI)*Math.asin(r/u);return-(u*Math.pow(2,10*(t-=1))*Math.sin((t*i-s)*2*Math.PI/o))+n},easeOutElastic:function(e,t,n,r,i){var s=1.70158;var o=0;var u=r;if(t==0)return n;if((t/=i)==1)return n+r;if(!o)o=i*.3;if(u<Math.abs(r)){u=r;var s=o/4}else var s=o/(2*Math.PI)*Math.asin(r/u);return u*Math.pow(2,-10*t)*Math.sin((t*i-s)*2*Math.PI/o)+r+n},easeInOutElastic:function(e,t,n,r,i){var s=1.70158;var o=0;var u=r;if(t==0)return n;if((t/=i/2)==2)return n+r;if(!o)o=i*.3*1.5;if(u<Math.abs(r)){u=r;var s=o/4}else var s=o/(2*Math.PI)*Math.asin(r/u);if(t<1)return-.5*u*Math.pow(2,10*(t-=1))*Math.sin((t*i-s)*2*Math.PI/o)+n;return u*Math.pow(2,-10*(t-=1))*Math.sin((t*i-s)*2*Math.PI/o)*.5+r+n},easeInBack:function(e,t,n,r,i,s){if(s==undefined)s=1.70158;return r*(t/=i)*t*((s+1)*t-s)+n},easeOutBack:function(e,t,n,r,i,s){if(s==undefined)s=1.70158;return r*((t=t/i-1)*t*((s+1)*t+s)+1)+n},easeInOutBack:function(e,t,n,r,i,s){if(s==undefined)s=1.70158;if((t/=i/2)<1)return r/2*t*t*(((s*=1.525)+1)*t-s)+n;return r/2*((t-=2)*t*(((s*=1.525)+1)*t+s)+2)+n},easeInBounce:function(e,t,n,r,i){return r-jQuery.easing.easeOutBounce(e,i-t,0,r,i)+n},easeOutBounce:function(e,t,n,r,i){if((t/=i)<1/2.75){return r*7.5625*t*t+n}else if(t<2/2.75){return r*(7.5625*(t-=1.5/2.75)*t+.75)+n}else if(t<2.5/2.75){return r*(7.5625*(t-=2.25/2.75)*t+.9375)+n}else{return r*(7.5625*(t-=2.625/2.75)*t+.984375)+n}},easeInOutBounce:function(e,t,n,r,i){if(t<i/2)return jQuery.easing.easeInBounce(e,t*2,0,r,i)*.5+n;return jQuery.easing.easeOutBounce(e,t*2-i,0,r,i)*.5+r*.5+n}})');
    });
})();
SudoNsb._memes.memeFolderPath = '../../../../play/memes';
SudoNsb._memes.memeEl = null;
SudoNsb._memes._memeName = null;
SudoNsb._memes._map = null;
SudoNsb._memes._ready = false;
Jarvis.Bucket.nestSpeed = 20;
Jarvis.Bucket.waitToLeavePage = 0;
Jarvis.Bucket.bucketLoadedEv = 'BucketLoadedEv.Bucket';
Jarvis.Bucket.firstLoad = 'first-load';
Jarvis.Bucket.afterRemoteLoad = 'after-remote-load';
Jarvis.Clipboard.ClipboardImg = "\r\n<svg width='100%' height='100%' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Layer_1' width='100' height='100' viewBox='0 0 100 100' overflow='visible' enable-background='new 0 0 100 100' xml:space='preserve' xmlns:xml='http://www.w3.org/XML/1998/namespace'>\r\n<g>\r\n\t<g>\r\n\t\t<linearGradient id='XMLID_5_' gradientUnits='userSpaceOnUse' x1='50' y1='14.1362' x2='50' y2='93.2161'>\r\n\t\t\t<stop offset='0' style='stop-color:#FDF58D'/>\r\n\t\t\t<stop offset='0.0662' style='stop-color:#F9DE75'/>\r\n\t\t\t<stop offset='0.1482' style='stop-color:#F5C85F'/>\r\n\t\t\t<stop offset='0.2451' style='stop-color:#F2B84E'/>\r\n\t\t\t<stop offset='0.365' style='stop-color:#F0AC43'/>\r\n\t\t\t<stop offset='0.5331' style='stop-color:#EEA63C'/>\r\n\t\t\t<stop offset='1' style='stop-color:#EEA43A'/>\r\n\t\t</linearGradient>\r\n\t\t<path fill='url(#XMLID_5_)' d='M21.546,15.589c-3.066,0-5.56,2.494-5.56,5.56V89.73c0,3.066,2.494,5.562,5.56,5.562h56.907    c3.066,0,5.56-2.495,5.56-5.562V21.149c0-3.066-2.494-5.56-5.56-5.56H21.546z'/>\r\n\t\t<path fill='#C07B5D' d='M78.453,14.872H21.546c-3.462,0-6.278,2.816-6.278,6.278V89.73c0,3.463,2.816,6.279,6.278,6.279h56.907    c3.462,0,6.278-2.816,6.278-6.279V21.15C84.731,17.688,81.915,14.872,78.453,14.872L78.453,14.872z M16.703,21.15    c0-2.675,2.168-4.843,4.843-4.843h56.907c2.675,0,4.843,2.168,4.843,4.843V89.73l0,0l0,0c0,2.676-2.168,4.845-4.843,4.845H21.546    c-2.675,0-4.843-2.169-4.843-4.845V21.15L16.703,21.15L16.703,21.15z'/>\r\n\t</g>\r\n\t<g opacity='0.31'>\r\n\t\t<path fill='#FFFFFF' d='M79.883,18.569c1.187,0,2.276,0.372,3.142,0.991c-0.658-1.893-2.454-3.254-4.571-3.254H21.546    c-2.117,0-3.912,1.361-4.57,3.254c0.865-0.619,1.954-0.991,3.141-0.991H79.883z'/>\r\n\t</g>\r\n\t<g opacity='0.1'>\r\n\t\t<path fill='#5A3D1C' d='M20.117,92.066c-1.187,0-2.275-0.372-3.141-0.991c0.658,1.893,2.453,3.254,4.57,3.254h56.907    c2.117,0,3.913-1.361,4.571-3.254c-0.865,0.619-1.955,0.991-3.142,0.991H20.117z'/>\r\n\t</g>\r\n\t<g opacity='0.2'>\r\n\t\t\r\n\t\t\t<image width='121' height='80' xlink:href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAABQCAYAAAA9Wdq3AAAACXBIWXMAAAsSAAALEgHS3X78AAAA BGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAItSURB VHja7JrNTsJQEEbbWiQoxogLjbrxNXkAntQYWYiICBEoOMXvJteGfaftOckXbFdjD3P/SpZA68l4 BEgGJAOSAcmAZEAyIBmQjGRAMiAZkAxIBiQDkgHJSAYkA5IByYBkQDIgGZCMZEAyIBmQDB7IvRU0 mUzSpj/U8Xh88FRP6kxuGtXVRNkH5fi3F9mpo87NTiRpiOwgc38itXe2l+E6Uy29KHlDRMeCd5Zt lF0Q3dlOVhcHwX3LheVS6UeivUsOgn8s38pK10fRdXZz7uBLlqlzS8Ejy60+ryT6zPEcHebgQkK/ LDPLe2X4jufq7nRytNAKgku5D5YnfY50v+d8q7fX0LyS4FfLiz7fdX9b50LMYyeXgp8t9+rmc8dD dhiqN+riN90vxc4ti6j2zg/XYU4eWm4sd5ZHy7Xue5dcDtWfup7r/3CzpvCyuk4195ZdO9DCa3hi XvYouVDdheoe6NpNzRxrdoDcWUeUc9taW5ClumHTkOF6qbrXqrmocx72JLm6xywf1IdlKqmLhi28 pqp/Ge+R65btRXJ1C5JoIdPULdQs2jrVLrnuE69MQ3JYWbfpMGQWdXRhe+Q9nfz3zU+i7UgbjjXp ZHVzvFdu5QsK3kL9f0Chq1v1qtHDIYQL+NFAByRXZDcabz//gQ7AsSaSAcmAZEAyIBmQDEgGJCMZ kAxIBiQDkgHJgGRAMpIByYBkQDIgGZAMSAYkI5lHgGRAMiAZXPArwAAbUMrNfUFAJgAAAABJRU5E rkJggg==' transform='matrix(1 0 0 1 -9.958 -15.8721)'>\r\n\t\t</image>\r\n\t</g>\r\n\t<g>\r\n\t\t<g>\r\n\t\t\t<rect x='22.561' y='22.079' fill='#73A2D7' width='54.878' height='66.299'/>\r\n\t\t\t<linearGradient id='XMLID_6_' gradientUnits='userSpaceOnUse' x1='88.3516' y1='102.9043' x2='26.8348' y2='26.4303'>\r\n\t\t\t\t<stop offset='0' style='stop-color:#ADD7F3'/>\r\n\t\t\t\t<stop offset='1' style='stop-color:#FFFFFF'/>\r\n\t\t\t</linearGradient>\r\n\t\t\t<path fill='url(#XMLID_6_)' d='M24.061,23.579c0,2.796,0,60.503,0,63.299c2.759,0,49.12,0,51.878,0c0-2.796,0-60.503,0-63.299     C73.181,23.579,26.82,23.579,24.061,23.579z'/>\r\n\t\t</g>\r\n\t\t<polygon fill='#C3D9F1' points='75.939,75.488 64.886,86.878 75.927,86.905   '/>\r\n\t\t<linearGradient id='XMLID_7_' gradientUnits='userSpaceOnUse' x1='69.7881' y1='79.8711' x2='64.2052' y2='74.7052'>\r\n\t\t\t<stop offset='0' style='stop-color:#8CB6CD'/>\r\n\t\t\t<stop offset='0.3524' style='stop-color:#B7DCF4'/>\r\n\t\t\t<stop offset='1' style='stop-color:#E5F2FB'/>\r\n\t\t</linearGradient>\r\n\t\t<polygon fill='url(#XMLID_7_)' points='64.058,74.132 75.728,73.605 74.886,75.604 64.11,86.38 63.953,83.752   '/>\r\n\t\t<path fill='#73A2D7' d='M77.439,73.942v-3.125h-1.5c-0.174,1.986-2.305,2.421-2.564,2.466c-0.135,0-10.292,0-10.292,0v10.805    c-0.001,0.265-0.079,2.402-2.334,2.726v1.564h2.683L77.439,73.942z M64.583,84.089v-9.306c1.274,0,8.915,0,8.915,0l0.055-0.008    c0.401-0.06,0.91-0.203,1.426-0.449L64.424,85.201C64.576,84.616,64.583,84.164,64.583,84.089z'/>\r\n\t</g>\r\n\t<g>\r\n\t\t<linearGradient id='XMLID_8_' gradientUnits='userSpaceOnUse' x1='42.248' y1='8.313' x2='54.025' y2='25.3589'>\r\n\t\t\t<stop offset='0' style='stop-color:#E6E6E6'/>\r\n\t\t\t<stop offset='1' style='stop-color:#979797'/>\r\n\t\t</linearGradient>\r\n\t\t<path fill='url(#XMLID_8_)' d='M39.861,11.803c-0.782,0-6.611,0-6.611,0c-2.146,0-3.893,1.747-3.893,3.894v8.885h41.287v-8.885    c0-2.147-1.746-3.894-3.892-3.894c0,0-5.696,0-6.476,0c-1.331-4.148-5.435-7.017-10.208-7.017    C45.294,4.787,41.19,7.655,39.861,11.803z M48.113,12.558c0-1.031,0.839-1.87,1.871-1.87c1.031,0,1.87,0.839,1.87,1.87    c0,1.032-0.839,1.871-1.87,1.871C48.952,14.428,48.113,13.589,48.113,12.558z'/>\r\n\t\t<path fill='#868686' d='M50.067,4.149c-2.576,0-5.002,0.776-7.017,2.245c-1.695,1.236-2.975,2.905-3.676,4.772h-6.125    c-2.499,0-4.531,2.033-4.531,4.532v8.247v1.276h1.276h40.011h1.276v-1.276v-8.247c0-2.499-2.032-4.532-4.53-4.532h-5.989    c-0.702-1.867-1.982-3.537-3.678-4.772C55.07,4.925,52.643,4.149,50.067,4.149L50.067,4.149z M29.994,15.698    c0-1.798,1.457-3.256,3.255-3.256h7.057c1.049-4.023,5.02-7.017,9.761-7.017c4.742,0,8.712,2.994,9.763,7.017h6.921    c1.797,0,3.254,1.458,3.254,3.256v8.247l0,0l0,0H29.994V15.698L29.994,15.698L29.994,15.698z M49.983,10.05    c-1.385,0-2.508,1.123-2.508,2.508c0,1.386,1.123,2.509,2.508,2.509c1.385,0,2.508-1.123,2.508-2.509    C52.491,11.173,51.368,10.05,49.983,10.05L49.983,10.05z M49.983,13.791c-0.679,0-1.232-0.553-1.232-1.233    c0-0.679,0.553-1.232,1.232-1.232c0.679,0,1.232,0.553,1.232,1.232C51.215,13.238,50.662,13.791,49.983,13.791L49.983,13.791z'/>\r\n\t</g>\r\n\t<g opacity='0.5'>\r\n\t\t<path fill='#FFFFFF' d='M66.751,12.441h-6.921c-1.051-4.023-5.021-7.017-9.763-7.017s-8.712,2.993-9.762,7.017H33.25    c-1.798,0-3.255,1.458-3.255,3.256v0.321c0.414-1.332,1.67-2.301,3.156-2.301h7.157c1.065-4.023,5.092-7.017,9.902-7.017    c4.808,0,8.834,2.993,9.9,7.017h7.02c1.221,0,2.285,0.656,2.855,1.629C69.812,13.714,68.429,12.441,66.751,12.441z'/>\r\n\t</g>\r\n</g>\r\n</svg>\r\n";
Jarvis.Clipboard.instance = null;
Jarvis.Clipboard.clipboardEl = null;
Jarvis.Clipboard.thumbnailEl = null;
Jarvis.Clipboard._tryLoaded$1 = false;
MagicWheel.CkEditor.ajaxUrl = 'wp-admin/admin-ajax.php';
MagicWheel.CkEditor._saveBtn = null;
MagicWheel.CkEditor._editor = null;
MagicWheel.CkEditor._instanceReady = false;
MagicWheel.PayPal.buyNowBtn = '\r\n<form action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post">\r\n<input type="hidden" name="cmd" value="_s-xclick">\r\n<input type="hidden" name="%buttonType%" value="%encrypted%">\r\n<input type="hidden" name="invoice" value="%invoice%">\r\n<input type="hidden" name="custom" value="%userId%">\r\n<input type="hidden" name="lc" value="US">\r\n<input type="hidden" name="button_subtype" value="services">\r\n<input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynowCC_LG.gif:NonHosted">\r\n<input type="hidden" name="cancel_return" value="%return_url%">\r\n<input type="hidden" name="notify_url" value="%notify_url%">\r\n<input type="hidden" name="return" value="%return_url%">\r\n<input type="hidden" name="rm" value="1">\r\n<input type="hidden" name="cbt" value="Return to PlayNexus.com">\r\n<input type="hidden" name="no_note" value="1">\r\n<input type="hidden" name="no_shipping" value="1">\r\n<input type="hidden" name="image_url" value="%image_url%">\r\n<input type="image" src="https://www.sandbox.paypal.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">\r\n<img alt="" border="0" src="https://www.sandbox.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1">\r\n</form>\r\n';
MagicWheel.PayPal.paymentRequestKey = 'PayPalPaymentRequest';
MagicWheel.PayPal.goingToPayPalEv = 'PnxGoingToPayPalEv';
MagicWheel.PayPal.sandbox = true;
MagicWheel.PayPal.spinnerUrl = Uri.join(Uri.get_base(), 'nsb/paypal/images/PayPalSpinner.gif');
MagicWheel.PayPal._buttonForm = null;
MagicWheel.PayPal._products = {};
MagicWheel.PayPalSubscriptions.oneDay = 24 * 50 * 60 * 1000;
MagicWheel.PayPalSubscriptions.oneYear = 365.25 * 24 * 60 * 60 * 1000;
(function () {
    Config.afterConfig(function() {
        $(document).on('PnxGoingToPayPalEv', function() {
            MagicWheel.PayPalSubscriptions.ping('GoToPaypal');
        });
    });
})();
MagicWheel.PaypalPingItems.askPay = 'AskPay';
MagicWheel.PaypalPingItems.goToPaypal = 'GoToPaypal';
MagicWheel.PaypalPingItems.completePay = 'CompletePay';
MagicWheel.PaypalPingItems.cancelPay = 'CancelPay';
MagicWheel.PopWindow._instance = null;
MagicWheel.PopWindow._returned = false;
MagicWheel.AppStyle.themeNameKey = '@FwThemeName';
MagicWheel.AppStyle.doneColorKey = Snsb.keyName("MagicWheel.Wheel.instance.style.doneColor");
MagicWheel.AppStyle.textColorKey = Snsb.keyName("MagicWheel.Wheel.instance.style.textColor");
MagicWheel.AppStyle.cursorColorKey = Snsb.keyName("MagicWheel.Wheel.instance.style.cursorColor");
MagicWheel.AppStyle.themes = { green: { name: 'green', title: 'Limeaid', background: 'green' }, yellow: { name: 'yellow', title: 'Citris Slice', background: '#FC0' }, white: { name: 'white', title: 'Black & White', background: '#CCC' }, metro: { name: 'metro', title: 'Metro Purple', background: '#8995D3' }, frankieblue: { name: 'frankieblue', title: 'Frankie Blue', background: '#1997FB' }, sunburst: { name: 'sunburst', title: 'Sunburst', background: '#ea5507' } };
MagicWheel.Emotions.desirable = { OPEN: ['open', 'understanding', 'confident', 'easy', 'connected', 'free', 'sympathetic', 'satisfied', 'receptive', 'accepting', 'kind', 'harmonious', 'empathetic', 'tolerant', 'friendly', 'approachable', 'outgoing', 'flowing', 'flowful', 'flexible', 'present', 'listening', 'welcoming', 'embracing'], LOVING: ['loving', 'considerate', 'affectionate', 'sensitive', 'tender', 'devoted', 'attracted', 'passionate', 'admiring', 'warm', 'touched', 'close', 'loved', 'sweet', 'gentle', 'compassionate', 'caring', 'allowing', 'nonjudgmental', 'appreciative', 'respectful', 'humble', 'gracious', 'patient', 'honoring', 'expansive', 'kindly', 'grateful', 'xoxo'], HAPPY: ['happy', 'awesome', 'totally awesome', 'blissful', 'joy', 'joyous', 'delighted', 'overjoyed', 'gleeful', 'thankful', 'festive', 'estatic', 'satisfied', 'glad', 'cheerful', 'sunny', 'elated', 'jubilant', 'jovial', 'fun-loving', 'lighthearted', 'easygoing', 'mellow', 'happy-go-lucky', 'glorious', 'innocent', 'child-like', 'gratified', 'euphoric', 'rapturous', 'in good humor', 'in heaven', 'on top of the wolrd', 'very happy', 'zaney', 'zippy', 'zestful'], INTERESTED: ['interested', 'fascinated', 'intrigued', 'absorbed', 'inquisitive', 'engrossed', 'curious', 'amazed', 'involved', 'attentive', 'frosty', 'observant', 'amused', 'thoughtful', 'courteous', 'intent', 'focused', 'quizzical', 'quirky', 'vital'], ALIVE: ['alive', 'playful', 'courageous', 'energetic', 'liberated', 'optimistic', 'frisky', 'animated', 'spirited', 'thrilled', 'wonderful', 'super', 'super duper', 'funny', 'great', 'giving', 'sharing', 'triumphant', 'intelligent', 'exilarated', 'equal', 'excited', 'enjoying', 'communicative', 'active', 'spunky', 'youthful', 'vigorous', 'tickled', 'on track', 'whimsical', 'witty', 'wacky', 'zowie'], BEAUTIFUL: ['beautiful', 'gorgeous', 'sexy', 'radiant', 'awe inspiring', 'lovely', 'glowing', 'beaming', 'glorious'], POSITIVE: ['positive', 'eager', 'keen', 'earnest', 'inspired', 'excited', 'enthusiastic', 'bold', 'brave', 'daring', 'hopeful', 'upbeat', 'magical', 'perfect', 'tuned in', 'tapped in', 'turned on', 'creative', 'constructive', 'helpful', 'resourceful', 'motivated', 'cooperative', 'productive', 'exuberant', 'supercharged', 'in the zone', 'in the flow', 'responsive', 'conscientious', 'approving', 'honored', 'privileged', 'adaptable'], PEACEFUL: ['peaceful', 'calm', 'good', 'at ease', 'comfortable', 'pleased', 'encouraged', 'surprised', 'content', 'quiet', 'certain', 'relaxed', 'serene', 'bright', 'blessed', 'assured', 'clear', 'balanced', 'fine', 'okay', 'grateful', 'carefree', 'adequate', 'fulfilled', 'genuine', 'authentic', 'forgiving', 'sincere', 'uplifted', 'unburdened', 'receptive', 'creative', 'confident', 'in-the-now', 'self-sufficient'], STRONG: ['reliable', 'sure', 'certain', 'unique', 'dynamic', 'tenacious', 'hardy', 'secure', 'stable', 'honest', 'composed', 'self-affirming', 'truthful', 'supportive', 'excellent', 'perseverant', 'responsible', 'energized', 'sane', 'complete', 'mature', 'solid'], RELAXED: ['reflective', 'smiling', 'grounded', 'unhurried', 'focused', 'open-minded', 'efficient', 'non-controlling', 'unassuming', 'trusting', 'supported', 'fluid', 'light', 'spontaneous', 'aware', 'healthy', 'meditative', 'still', 'rested', 'waiting', 'laughing', 'graceful', 'natural', 'steady', 'centered', 'placid'] };
MagicWheel.Emotions._lastAllFor = null;
MagicWheel.Emotions._lastAll = null;
MagicWheel.Emotions._cachedEmotions = [];
(function () {
    Snsb.defer(function() {
        MagicWheel.Emotions.allOf(MagicWheel.Emotions.desirable);
        var $enum1 = ss.IEnumerator.getEnumerator(MagicWheel.Emotions._lastAll);
        while ($enum1.moveNext()) {
            var d = $enum1.current;
            MagicWheel.Emotions._cachedEmotions.add(d['name'].toLowerCase());
        }
        MagicWheel.Emotions._cachedEmotions.sort();
    });
})();
MagicWheel.GridCloud.maxFontSize = 28;
MagicWheel.GridCloud._instance$1 = null;
MagicWheel.GridEditor.myTopic = '/PnxTools/Grids';
MagicWheel.MyPop.instance = null;
MagicWheel.ReSpoke._widget = null;
MagicWheel.GearWorks.gear1 = 'nsb/fw/images/gear118.png';
MagicWheel.GearWorks.gear2 = 'nsb/fw/images/gear150.png';
MagicWheel.GearWorks.gear3 = 'nsb/fw/images/gear159.png';
MagicWheel.GearWorks.gear4 = 'nsb/fw/images/gear188.png';
MagicWheel.GearWorks.gear5 = 'nsb/fw/images/gear317.png';
MagicWheel.HeartBalloons.ballonsEl = null;
MagicWheel.HeartBalloons._preloaded = false;
MagicWheel.My.kyLoadFwPage = 'LoadFwPage';
MagicWheel.My.kyNewFwPage = 'NewFwPage';
MagicWheel.My.kyStartFw = 'StartFw';
MagicWheel.My.kyCompleteFw = 'CompleteFw';
MagicWheel.My.kyEraseFw = 'EraseFw';
MagicWheel.My.kyDevNote = 'DevNote';
MagicWheel.My.changeFile = '../js/FocusWheel.js';
MagicWheel.My.lastFileTimeKey = 'FwLastFileTime';
MagicWheel.My._pingOffline = false;
(function () {
    SudoNsb.Storage.defaultLocal('@Testing', false);
    Snsb.defer(function() {
        MyCss.addStyleOnce((MagicWheel.My).get_fullName(), "\r\n#MyPopNote {\r\n    position: fixed;\r\n    top: 50px;\r\n    left: 300px;\r\n    width: 300px;\r\n    height: 200px;\r\n    border: 1px solid #999;\r\n    z-index: 9999;\r\n}\r\n#MyPopNote textarea {\r\n    padding: 2px 5px;\r\n    width: 290px;\r\n    height: 196px;\r\n    margin: 0;\r\n    font-family: 'Courier New';\r\n    font-size: 12pt;\r\n    background-color: #FFD;\r\n    border: none;\r\n}\r\n");
        $(document.body).on('keydown', function(e) {
            if (e.which === 78 && (e.ctrlKey || e.metaKey)) {
                MagicWheel.My._popNote(e);
            }
        });
    });
})();
MagicWheel.ShowTimes._all = [];
MagicWheel.Snapshot.fontSize = 32;
MagicWheel.Snapshot.lineHeight = 45;
(function () {
    MyCss.addStyleOnce((MagicWheel.Snapshot).get_fullName(), '\r\n.sn1 {\r\n    position: absolute;\r\n    color: white;\r\n    background: red;\r\n    border: 1px dotted green;\r\n}\r\n');
    $(document.body).click(function(e) {
        if (e.shiftKey) {
            MagicWheel.Snapshot.take();
        }
    });
})();
MagicWheel.Wheel.afterCreateWheelEv = 'WheelEndLoadEv';
MagicWheel.Wheel.fwTopic = '/Pnx/Item/FocusWheel';
MagicWheel.Wheel.instance = null;
MagicWheel.Wheel.injectData = null;
MagicWheel.Wheel.onAfterCreateWheel = null;
MagicWheel.Wheel._shows = 0;
MagicWheel.Input._editing = null;
MagicWheel.Input.inputChangeEv = 'WheelInputChangeEv';
MagicWheel.Input.data = null;
MagicWheel.Input._were = null;
MagicWheel.Input._wereMetrics = null;
MagicWheel.WheelDef.injectNewSpokes = 0;
MagicWheel.Yatta.wheelFinishEv = 'PnxWheelFinishEv';
MagicWheel.Main.ignoreUserWhenSaving = true;
MagicWheel.Main._updating = false;
MagicWheel.Main.dev = false;
MagicWheel.Main.dontLoadWheel = false;
MagicWheel.Main.projectName = 'VibrationalArcade';
(function () {
    var theme = window.localStorage.getItem('@Theme') || 'default';
    $(function() {
        if (theme !== 'default') {
            var headTag = document.getElementsByTagName('head')[0];
            var cssNode = document.createElement('link');
            cssNode.type = 'text/css';
            cssNode.rel = 'stylesheet';
            cssNode.href = 'nsb/themes/' + theme + '.css?_=' + Date.get_now().getTime();
            cssNode.media = 'screen';
            headTag.appendChild(cssNode);
        }
        var bodyTag = document.getElementsByTagName('body')[0];
        bodyTag.className = bodyTag.className + ' ' + theme;
    });
    $(function() {
        SudoNsb.PrefixFree.addStyleOnce((MagicWheel.Main).get_fullName(), "\r\n.instructions {\r\n    font-family: 'Open Sans', Arial, sans-serif;\r\n    line-height: 1.5;\r\n}\r\n.widget {\r\n    font-family: 'Open Sans', Arial, sans-serif;\r\n    line-height: 1.2;\r\n    font-size: 1.14em;\r\n}\r\n.quotation {\r\n    color: rgb(77, 77, 77);\r\n    font-size: 1.15em;\r\n    font-family: 'PT serif', serif;\r\n    font-style: italic;\r\n    line-height: 1.5;\r\n}\r\n.quotation:before {\r\n    content: '\\201C';\r\n    position: relative;\r\n    top: 12px;\r\n    padding-right: 4px;\r\n    font-size: 2.3em;\r\n    line-height: .1;\r\n}\r\n.quotation:after {\r\n    content: '\\201D';\r\n    position: relative;\r\n    top: 12px;\r\n    padding-right: 4px;\r\n    font-size: 2.3em;\r\n    line-height: .1;\r\n}\r\n.quoteBy {\r\n    position: relative;\r\n    float: right;\r\n    top: -10px;\r\n    padding-right: 3px;\r\n}\r\n.quoteBy:before {\r\n    content: ' \\2014 ';\r\n}\r\n\r\n@keyframes spincw {\r\n    from {transform:rotate(0deg);}\r\n    to {transform:rotate(360deg);}\r\n}\r\n@keyframes spincc {\r\n    from {transform:rotate(360deg);}\r\n    to {transform:rotate(0deg);}\r\n}\r\n\r\n\r\n/* Weebly Overrides */\r\n\r\np.instructions {\r\n    font-size: .95em;\r\n}\r\nh3.instructions {\r\n    font-size: 1.64em;\r\n}\r\n\r\n");
        if (MagicWheel.Main._updating && !SudoNsb.Storage.getLocal('@God')) {
            $("<div style='\r\n                                        position: absolute;\r\n                                        top: 0;\r\n                                        left: 0;\r\n                                        right: 0;\r\n                                        bottom: 0;\r\n                                        color: black;\r\n                                        background-color: white;\r\n                                        padding: 50px;\r\n                                        font-size: 65px;\r\n                                        '>Updating Software<br><font size='-1'>Please try again shortly...</font></div>").appendTo(document.body);
            return;
        }
        $('.WheelInPage').html("<center id='WheelLoadingMsg' style='font-size: 32px;margin:200px 50px 400px 50px;'>Loading...</center>");
        Config.set_appPath('nsb/base/App');
        Config.imgPath2 = 'nsb/base/images';
        Config.sessionPath = 'nsb/users';
        Config.afterConfig(function() {
            if (!Config.offline || true) {
                PnxSite.ConfigPage();
                if (!$('#NoToolBar').length) {
                    PnxSite.LoadToolbar();
                }
                PnxSite.InstallUserEvents();
                if (FbApi.get_id() === 'FB1305946510' || Snsb.get_masterId() === 'PX2' || Config.offline) {
                    MagicWheel.Main.dev = true;
                }
                if (window.location.pathname.indexOf('index.html') === -1) {
                    MagicWheel.My.ping('LoadFwPage');
                }
                SudoNsb._memes.load();
                new TuneUp.TuWidget();
                if (MagicWheel.PayPal.sandbox) {
                    MagicWheel.PayPal.set_products({ CustomTile: '-----BEGIN PKCS7-----MIIHoQYJKoZIhvcNAQcEoIIHkjCCB44CAQExggE6MIIBNgIBADCBnjCBmDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExETAPBgNVBAcTCFNhbiBKb3NlMRUwEwYDVQQKEwxQYXlQYWwsIEluYy4xFjAUBgNVBAsUDXNhbmRib3hfY2VydHMxFDASBgNVBAMUC3NhbmRib3hfYXBpMRwwGgYJKoZIhvcNAQkBFg1yZUBwYXlwYWwuY29tAgEAMA0GCSqGSIb3DQEBAQUABIGAF2c8/0Qph+TLTFXZ0e6pUavw8MKvvvxjciEoq+8LwLgTiSQSWFioYHBw9na9jFFIjc081GBLhw/973vCH0a4hr2PtztMr/hFDAgpGSvpY6Cwo5HshrooIALsmzMlwldxo5KtOk2c5zUpc0FOHjQbdZk7tGwK22ZW/CPcMK0ymsYxCzAJBgUrDgMCGgUAMIHsBgkqhkiG9w0BBwEwFAYIKoZIhvcNAwcECNnYLI3dLg81gIHIoqPfdZNuOz1JvSxTR1yxcTVafnscERJlQ62KZ3Rr4T0WvJaUP1Tq43gM3Ok1LAqDIwQzfk+Bt9BxklwoJDPu4MToMNWeUpqlnK3VWPx+8MM7nBjJ+7l7p92xELABNuX3ZBqM1JBPZAdURWaUA8JkS5nZdKLxDKZldzVn/FJ6KbdFAl1k5EH8VVplfsLxivbIDiM+PulWyWxY4PkFEv/NvPL82c7Gi6Zx4vvIc8IvqysEH/Gy6+K0Ydtvwvb8h233LiE4IMnv47GgggOlMIIDoTCCAwqgAwIBAgIBADANBgkqhkiG9w0BAQUFADCBmDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExETAPBgNVBAcTCFNhbiBKb3NlMRUwEwYDVQQKEwxQYXlQYWwsIEluYy4xFjAUBgNVBAsUDXNhbmRib3hfY2VydHMxFDASBgNVBAMUC3NhbmRib3hfYXBpMRwwGgYJKoZIhvcNAQkBFg1yZUBwYXlwYWwuY29tMB4XDTA0MDQxOTA3MDI1NFoXDTM1MDQxOTA3MDI1NFowgZgxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpDYWxpZm9ybmlhMREwDwYDVQQHEwhTYW4gSm9zZTEVMBMGA1UEChMMUGF5UGFsLCBJbmMuMRYwFAYDVQQLFA1zYW5kYm94X2NlcnRzMRQwEgYDVQQDFAtzYW5kYm94X2FwaTEcMBoGCSqGSIb3DQEJARYNcmVAcGF5cGFsLmNvbTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEAt5bjv/0N0qN3TiBL+1+L/EjpO1jeqPaJC1fDi+cC6t6tTbQ55Od4poT8xjSzNH5S48iHdZh0C7EqfE1MPCc2coJqCSpDqxmOrO+9QXsjHWAnx6sb6foHHpsPm7WgQyUmDsNwTWT3OGR398ERmBzzcoL5owf3zBSpRP0NlTWonPMCAwEAAaOB+DCB9TAdBgNVHQ4EFgQUgy4i2asqiC1rp5Ms81Dx8nfVqdIwgcUGA1UdIwSBvTCBuoAUgy4i2asqiC1rp5Ms81Dx8nfVqdKhgZ6kgZswgZgxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpDYWxpZm9ybmlhMREwDwYDVQQHEwhTYW4gSm9zZTEVMBMGA1UEChMMUGF5UGFsLCBJbmMuMRYwFAYDVQQLFA1zYW5kYm94X2NlcnRzMRQwEgYDVQQDFAtzYW5kYm94X2FwaTEcMBoGCSqGSIb3DQEJARYNcmVAcGF5cGFsLmNvbYIBADAMBgNVHRMEBTADAQH/MA0GCSqGSIb3DQEBBQUAA4GBAFc288DYGX+GX2+WP/dwdXwficf+rlG+0V9GBPJZYKZJQ069W/ZRkUuWFQ+Opd2yhPpneGezmw3aU222CGrdKhOrBJRRcpoO3FjHHmXWkqgbQqDWdG7S+/l8n1QfDPp+jpULOrcnGEUY41ImjZJTylbJQ1b5PBBjGiP0PpK48cdFMYIBpDCCAaACAQEwgZ4wgZgxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpDYWxpZm9ybmlhMREwDwYDVQQHEwhTYW4gSm9zZTEVMBMGA1UEChMMUGF5UGFsLCBJbmMuMRYwFAYDVQQLFA1zYW5kYm94X2NlcnRzMRQwEgYDVQQDFAtzYW5kYm94X2FwaTEcMBoGCSqGSIb3DQEJARYNcmVAcGF5cGFsLmNvbQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMTIxMjI3MjAzMDMyWjAjBgkqhkiG9w0BCQQxFgQUimRpTG7gHuG3fz5wk6GA/XQmURgwDQYJKoZIhvcNAQEBBQAEgYAT6IdWXvDIcIaqSMI4chfzkK3BURNrFoO/eRkI50qOJUeOOOPGJ3R6wRXvkTDOkNxB/fAs9AB+sSObZxB6XhUhRVnBhAPQIchFJHX2H5CsQ724MfqP8EL4KT++bsnyjxH6X49HgdoOn2xe1Jatpz0vuAXR8F3VCTyGSJRas7Sysw==-----END PKCS7-----', TileSubscription: '-----BEGIN PKCS7-----MIIHqQYJKoZIhvcNAQcEoIIHmjCCB5YCAQExggE6MIIBNgIBADCBnjCBmDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExETAPBgNVBAcTCFNhbiBKb3NlMRUwEwYDVQQKEwxQYXlQYWwsIEluYy4xFjAUBgNVBAsUDXNhbmRib3hfY2VydHMxFDASBgNVBAMUC3NhbmRib3hfYXBpMRwwGgYJKoZIhvcNAQkBFg1yZUBwYXlwYWwuY29tAgEAMA0GCSqGSIb3DQEBAQUABIGAI7REBFNzNLgDvBKV7Odn7565/GWKyblbA19jwwVZhoAbeKY7qzynlW1qX0R8DG+c8ssr6C+F76i18GuVWtuRT3R99xrd0vHKYLJJLAMGRJ0cTufuMbJ806xPlEvF4GwjxV0hlsZgAP5yglth9l2plgXMpUe+abVlzOAH3j/I/bYxCzAJBgUrDgMCGgUAMIH0BgkqhkiG9w0BBwEwFAYIKoZIhvcNAwcECPecLnqppCBPgIHQwNndLnsZHv3CIQZmiwP6eE9l24ahNF6xg5MMU6cAjRxvGiR5L/RbbyI8vEnfJUElC5F06PQkEwTJmKvRIy+qdBLLHBYTFr2pOGnc6YzPXqBVAeigAfdZ031udZGgADVPZfq0UYVV1L+i/P6JuShi2H7KoLH1Dc0HtShJXXfenGxPhGBrZMjwTn5rmE1vl00FXdj2L1QSuOivPCO6jMogjc2388YyFQ74pJvRFYy+All26f1Qu6ij4GBSBWiBhA7SCnz0btmUPVIiZebDqaudTaCCA6UwggOhMIIDCqADAgECAgEAMA0GCSqGSIb3DQEBBQUAMIGYMQswCQYDVQQGEwJVUzETMBEGA1UECBMKQ2FsaWZvcm5pYTERMA8GA1UEBxMIU2FuIEpvc2UxFTATBgNVBAoTDFBheVBhbCwgSW5jLjEWMBQGA1UECxQNc2FuZGJveF9jZXJ0czEUMBIGA1UEAxQLc2FuZGJveF9hcGkxHDAaBgkqhkiG9w0BCQEWDXJlQHBheXBhbC5jb20wHhcNMDQwNDE5MDcwMjU0WhcNMzUwNDE5MDcwMjU0WjCBmDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExETAPBgNVBAcTCFNhbiBKb3NlMRUwEwYDVQQKEwxQYXlQYWwsIEluYy4xFjAUBgNVBAsUDXNhbmRib3hfY2VydHMxFDASBgNVBAMUC3NhbmRib3hfYXBpMRwwGgYJKoZIhvcNAQkBFg1yZUBwYXlwYWwuY29tMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC3luO//Q3So3dOIEv7X4v8SOk7WN6o9okLV8OL5wLq3q1NtDnk53imhPzGNLM0flLjyId1mHQLsSp8TUw8JzZygmoJKkOrGY6s771BeyMdYCfHqxvp+gcemw+btaBDJSYOw3BNZPc4ZHf3wRGYHPNygvmjB/fMFKlE/Q2VNaic8wIDAQABo4H4MIH1MB0GA1UdDgQWBBSDLiLZqyqILWunkyzzUPHyd9Wp0jCBxQYDVR0jBIG9MIG6gBSDLiLZqyqILWunkyzzUPHyd9Wp0qGBnqSBmzCBmDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExETAPBgNVBAcTCFNhbiBKb3NlMRUwEwYDVQQKEwxQYXlQYWwsIEluYy4xFjAUBgNVBAsUDXNhbmRib3hfY2VydHMxFDASBgNVBAMUC3NhbmRib3hfYXBpMRwwGgYJKoZIhvcNAQkBFg1yZUBwYXlwYWwuY29tggEAMAwGA1UdEwQFMAMBAf8wDQYJKoZIhvcNAQEFBQADgYEAVzbzwNgZf4Zfb5Y/93B1fB+Jx/6uUb7RX0YE8llgpklDTr1b9lGRS5YVD46l3bKE+md4Z7ObDdpTbbYIat0qE6sElFFymg7cWMceZdaSqBtCoNZ0btL7+XyfVB8M+n6OlQs6tycYRRjjUiaNklPKVslDVvk8EGMaI/Q+krjxx0UxggGkMIIBoAIBATCBnjCBmDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExETAPBgNVBAcTCFNhbiBKb3NlMRUwEwYDVQQKEwxQYXlQYWwsIEluYy4xFjAUBgNVBAsUDXNhbmRib3hfY2VydHMxFDASBgNVBAMUC3NhbmRib3hfYXBpMRwwGgYJKoZIhvcNAQkBFg1yZUBwYXlwYWwuY29tAgEAMAkGBSsOAwIaBQCgXTAYBgkqhkiG9w0BCQMxCwYJKoZIhvcNAQcBMBwGCSqGSIb3DQEJBTEPFw0xMjEyMzEyMDMyNTFaMCMGCSqGSIb3DQEJBDEWBBTuXHt4nObz1x5yqgN9QC64/XicxzANBgkqhkiG9w0BAQEFAASBgFUcpHNOFloWzyY4fW5uSJoYPr+aieTy/xtRybMz8/Krr41m5GNXpvbkGclXl+j5oN6XVjr5CQg9/46eaJ0L+BrrWSCCbLKdBnVuRWVs5rfmaNalxBxIcs43WNdE4nlQXNxLFKjY8R3nhh6db5qQmsnTkvEEth9L08/ZxzJwZxiY-----END PKCS7-----' });
                }
                else {
                    MagicWheel.PayPal.set_products({ CustomTile: 'G42EGT3KDAJYJ', TileSubscription: 'A687CK6HDYL3W' });
                }
                $('.subscribeBtn').on('click', MagicWheel.PayPalSubscriptions.askPay);
                $('.loginBtn').on('click', SudoNsb.PxUser.settings);
            }
        });
        $(document).on(SudoNsb.PxUser.userLoggedInEv + ' ' + SudoNsb.PxUser.userLoggedOutEv, function() {
            BrowserUser.reloadPage();
        });
        $(document).on(SudoNsb.Dom.afterScrollTopEv, function() {
            if (!Surface.get_hiderShown()) {
                SudoNsb.Dom.scrollToPosAw(SudoNsb.Await.get_asyncAw(), Math.max(0, SudoNsb.Dom.documentScrollTop() - $('#PnxToolWrapper').outerHeight()));
            }
        });
    });
})();
MagicWheel.PurchaseItems.customTile = 'CustomTile';
MagicWheel.PurchaseItems.tileSubscription = 'TileSubscription';
TuneUp.TuBase.dev = false;
TuneUp.TuData._storageKey = 'PnxTuneUp';
TuneUp.TuData.startEv = 'TuDataStartEv';
TuneUp.TuData.nextEv = 'TuDataNextEv';
TuneUp.TuData.doneEv = 'TuDataDoneEv';
TuneUp.TuData.tuDataTopic = '/Pnx/Tools/TuData';
TuneUp.TuData._testData2 = Rx.reCast(eval("\r\n({\r\n\t'steps': [\r\n\t\t{\r\n\t\t\t'name': 'create your grid cloud',\r\n\t\t\t'pageUrl': 'appreciation.html',\r\n\t\t\t'text': 'Click on the (+) button to add 5 or more words or phrases to your grid cloud. Press enter after typing in each item. <b>Watching these items will super-charge materializng them in your life.</b> Stay general in your statements. Each item should represent how you want to feel more than specific details.',\r\n            'quote': 'Within 17 seconds of focusing on something, a matching vibration becomes activated. And now, as that focus becomes stronger and the vibration becomes clearer, the Law of Attraction will bring to you more thoughts that match. At this point, the vibration will not have much attraction power, but if you maintain your focus longer, the power of the vibration will become further-reaching. And if you manage to stay purely focused upon any thought for as little as 68 seconds, the vibration is powerful enough that its manifestation begins.',\r\n            'quoteBy': 'Abraham',\r\n            'rightBox': '<img src=\"nsb/fw/images/MonkeyGrid.jpg\" width=180 height=180>',\r\n\t\t\t'spokes': 0,\r\n            'estTime': [120000, 180000],\r\n\t\t\t'nextAction': 'TuneUp.TuWidget.VisionCloudStep',\r\n\t\t\t'noMeme': true,\r\n\t\t\t'noWheel': true\r\n\t\t},\r\n\t\t{\r\n\t\t\t'name': 'appreciation - the golden goose that gives',\r\n\t\t\t'pageUrl': 'appreciation.html',\r\n\t\t\t'text': 'Pick a subject and appreciate 5 things about it to center and elevate yourself. Be playful and have fun!',\r\n            'memes': ['10172615_585627414869938_3985052533336799480_n.jpg','10356707_617986474967365_8244949174975284642_n.png','10367181_593953800703966_8872553797545755441_n.jpg','10440828_599876030111743_7916819790662655335_n.jpg','10449489_634498493316163_8406649423381312326_n.jpg','10494763_610979245668088_2855066307607564251_n.jpg'],\r\n            'rightBox': '<blockquote>At the age of 18 I made up my mind to never have another bad day in my life. I dove into an endless sea of gratitude from which I\\'ve never emerged.</blockquote><cite>Patch Adams</cite>',\r\n            'bottomBox': 'Appreciation is:<ul><li>the art of allowing our connection to all that is good</li><li>allowing us to be grateful for the miracle we are</li><li>positive and life enhancing</li><li>healing</li><li>releasing resistance</li></ul>',\r\n\t\t\t'spokes': 5,\r\n            'estTime': [120000, 300000],\r\n\t\t\t'hideSpokes': true,\r\n\t\t\t'hideSegSelect': true\r\n\t\t},\r\n\t\t{\r\n\t\t\t'name': 'clear out the cobwebs using ho\\'oponopono',\r\n\t\t\t'pageUrl': 'hooponopono.html',\r\n\t\t\t'text': 'True yourself up to be more authentic by doing a ho\\'oponopono wheel on what bothers you most at the moment. Heal yourself or anyone you are aware of. <em>There are no limits to what you can heal except what you can hold in your heart.</em>',\r\n            'rightBox': '<blockquote>After a few months, patients that had to be shackled were being allowed to walk freely.</blockquote><cite><a target=\"_blank\" href=\"http://www.wanttoknow.info/070701imsorryiloveyoujoevitale\">Dr. Len</a></cite>',\r\n\t\t\t'spokes': 0,\r\n            'estTime': [240000, 300000],\r\n\t\t},\r\n\t\t{\r\n\t\t\t'name': 'find your true yes right now',\r\n\t\t\t'pageUrl': 'yes-wheel.html',\r\n\t\t\t'text': 'Let\\'s find your true yes for what to do next. Your true yes is the thing out of all the things you can do right now that feels most exciting to you. It is the thing you can do that will be the most productive in your life because the emotion of excitement is your higher consciousnes communicating to you the best thing you can do next.',\r\n            'rightBox': '<blockquote>A yes is a yes<br>&nbsp; And a no is a no<br>And a yes is the yes<br>&nbsp; That will get you to go</blockquote><cite>Scott Obley</cite>',\r\n            'quote': 'It\\'s the excitement in the simple things that tells you what simple things are actually connected to the bigger things that excite you. And will actually get you there in what may seem to be a round about manner, but by following the excitement is actually the shortest, fastest, straightest path.',\r\n            'quoteBy': 'Bashar',\r\n\t\t\t'spokes': 5,\r\n            'estTime': [150000, 240000],\r\n\t\t\t'hideSpokes': true\r\n\t\t},\r\n\t\t{\r\n\t\t\t'name': 'your play elevator has arrived at your floor',\r\n\t\t\t'pageUrl': 'index.html',\r\n\t\t\t'text': '<h2>Have an amazing day!</h2>',\r\n            'rightBox': '<img src=\"nsb/fw/images/Final1.jpg\" width=180 height=180>',\r\n\t\t\t'spokes': 0,\r\n            'noMeme': true,\r\n\t\t\t'finalStep': true,\r\n\t\t\t'noWheel': true\r\n\t\t}\r\n\t],\r\n    'topic': '/PnxTools/QuickElevator',\r\n\t'started': false,\r\n\t'step': -1\r\n})\r\n".trim()), TuneUp.TuData);
TuneUp.TuData._pageUrls = Rx.reCast(eval("\r\n({\r\n\t'steps': [\r\n\t\t{\r\n\t\t\t'pageUrl': 'appreciation',\r\n\t\t},\r\n\t\t{\r\n\t\t\t'pageUrl': 'appreciation',\r\n\t\t},\r\n\t\t{\r\n\t\t\t'pageUrl': 'hooponopono',\r\n\t\t},\r\n\t\t{\r\n\t\t\t'pageUrl': 'yes-wheel',\r\n\t\t},\r\n\t\t{\r\n\t\t\t'pageUrl': 'index',\r\n\t\t}\r\n\t]\r\n})\r\n".trim()), TuneUp.TuData);
TuneUp.TuPages.hopo = 'hooponopono.html';
TuneUp.TuPages.yes = 'yes-wheel.html';
TuneUp.TuPages.focus = 'focus-wheel.html';
TuneUp.TuPages.gratitude = 'appreciation.html';
TuneUp.TuPages.vision = 'appreciation.html';
TuneUp.TuPages.done = 'index.html';
TuneUp.TuDetailEditor._instance = null;
TuneUp.TuWidget.wrapperId = '#TuWidget';
TuneUp.TuWidget.gear1Url = MagicWheel.WheelExport.deepUrl('nsb/fw/images/PTGear1.png', top);
TuneUp.TuWidget.gear2Url = MagicWheel.WheelExport.deepUrl('nsb/fw/images/PTGear2.png', top);
TuneUp.TuWidget.instance = null;
(function () {
    Snsb.defer(function() {
        $('#wsite-content > div.paragraph:last > em').css({ color: 'rgb(213, 213, 213)' });
    });
})();
})(jQuery);

//! This script was generated using Script# v0.7.4.0
