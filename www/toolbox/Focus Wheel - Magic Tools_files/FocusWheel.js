//! FocusWheel.debug.js
//

(function($) {

Type.registerNamespace('SudoNsb');

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
        eval("(jQuery.fn.animateRotate=function(e,t,n){return this.each(function(){var r=jQuery(this),i,s,o,u,a={};if(typeof t!==\"object\"){t={}}else if(typeof t.extra===\"object\"){a=t.extra}a.deg=e;t.step=function(e,t){if(t.prop===\"deg\"){var n=r.get(0).style;if(\"-webkit-transform\"in n||\"webkitTransform\"in n)r.css({\"-webkit-transform\":\"rotate(\"+e+\"deg)\"});else if(\"MozTransform\"in n||\"-moz-transform\"in n||\"mozTransform\"in n)r.css({\"-moz-transform\":\"rotate(\"+e+\"deg)\"});else if(\"-ms-transform\"in n||\"msTransform\"in n)r.css({\"-ms-transform\":\"rotate(\"+e+\"deg)\"});else if(\"-o-transform\"in n||\"oTransform\"in n)r.css({\"-o-transform\":\"rotate(\"+e+\"deg)\"});else if(\"transform\"in n)r.css({transform:\"rotate(\"+e+\"deg)\"});else{i=e*(Math.PI*2/360);s=Math.cos(i);o=Math.sin(i);u=\"M11=\"+s+\", M12=-\"+o+\", M21=\"+o+\", M22=\"+s;r.css({filter:\"progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand',\"+u+\")\",\"-ms-filter\":\"progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand',\"+u+\")\"})}}};if(n)r[0][\"deg\"]=n;r.animate(a,t)})})");
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
    el.detach();
    var ie = $('<div/>').css({ display: 'inline-block', overflow: 'visible', 'font-size': px }).appendTo(ot).html(el.html());
    while ((ie.height() > ht || ie.width() > wd) && px > 8) {
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
    MyCss.addStyleOnce((Jarvis.Bucket).get_fullName(), "\r\nbody { overflow: auto !important; } /* fixes dragging scrolltop bug in jQuery */\r\n.BucketOuter {\r\n    position: relative;\r\n    height: 100%;\r\n    box-sizing: border-box;\r\n}\r\n.BucketInner {\r\n    position: absolute;\r\n    width: 100%;\r\n}\r\n.BucketOuter.drop-hover:before {\r\n    position: absolute;\r\n    display: block;\r\n    content: '&nbsp;';\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    background-color: rgba(0,128,255,.1);\r\n}\r\n.BucketOuter label {\r\n    display: block;\r\n    padding: 8px;\r\n    box-sizing: border-box;\r\n    width: 100%;\r\n    text-align: center;\r\n    z-index: -1;\r\n}\r\nlabel.BucketTitle {\r\n    position: absolute;\r\n    margin-top: 127%;\r\n    background: transparent;\r\n    color: #AAA;\r\n    font-size: 120%;\r\n}\r\nlabel.BucketMore {\r\n    background: transparent;\r\n    font-size: 80%;\r\n    color: #AAA;\r\n}\r\ndiv.BucketItem {\r\n    position: absolute;\r\n    top: 0px;\r\n    left: 102px;\r\n    width: 100px;\r\n    height: 100px;\r\n    display: block;\r\n    text-align: center;\r\n    cursor: default;\r\n    z-index: 9;\r\n}\r\ndiv.BucketItem .DragHandle {\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    z-index: 10;\r\n}\r\ndiv.BucketItem.ui-draggable-dragging {\r\n    z-index: 99;\r\n}\r\ndiv.BucketItem.ui-draggable-dragging .DragHandle {\r\n    z-index: 100;\r\n}\r\ndiv.BucketItem p {\r\n    position: relative;\r\n    display: table-cell;\r\n    height: 100px;\r\n    vertical-align: middle;\r\n    text-align: center;\r\n    width: 100px;\r\n    color: black;\r\n    font-weight: bold;\r\n    z-index: 5;\r\n}\r\ndiv.BucketItem svg {\r\n    position: absolute;\r\n    display: block;\r\n    top: 0;\r\n    left: 0;\r\n    z-index: 0;\r\n}\r\ndiv.BucketItem canvas {\r\n    position: relative;\r\n    top: -10px;\r\n    left: -25px;\r\n    width: 150px;\r\n    height: 150px;\r\n    z-index: 4;\r\n}\r\ndiv.BucketInnerItem {\r\n    display: block;\r\n    position: relative;\r\n    width: 100px;\r\n    height: 100px;\r\n    margin: 0;\r\n    font-size: 12px;\r\n    line-height: 1;\r\n    text-align: center;\r\n}\r\ndiv.BucketInnerItem.Fruit {\r\n    display: table-cell;\r\n    vertical-align: middle;\r\n    padding: 5px;\r\n    box-sizing: border-box;\r\n}\r\ndiv.DefaultClipItem {\r\n    width: 100px;\r\n    height: 100px;\r\n    overflow: hidden;\r\n}\r\ndiv.DefaultClipItem label {\r\n    display: none;\r\n    font-size: 70%;\r\n    color: #5E3535;\r\n    width: 100%;\r\n    text-align: center;\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\ndiv.DefaultClipItem p {\r\n    position: relative;\r\n    display: block;\r\n    height: auto;\r\n    text-align: center;\r\n    width: 100%;\r\n    color: #000;\r\n    font-size: 70%;\r\n    line-height: 1.2;\r\n    font-weight: normal;\r\n    overflow: hidden;\r\n    margin: 0;\r\n    padding: 5px;\r\n    box-sizing: border-box;\r\n}\r\n");
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
            os.aTop = p.top;
            os.aLeft = p.left;
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
    Jarvis.Clipboard.initializeBase(this);
    this.setOptions('#Clipboard', '/Pnx/Clipboard');
    this.autoArrange = false;
}
Jarvis.Clipboard.load = function Jarvis_Clipboard$load() {
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


Type.registerNamespace('FocusWheel');

////////////////////////////////////////////////////////////////////////////////
// FocusWheel.AppStyle

FocusWheel.AppStyle = function FocusWheel_AppStyle(ctx, cx, cy, radius) {
    /// <param name="ctx" type="FocusWheel.Ctx">
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
    /// <field name="ctx" type="FocusWheel.Ctx">
    /// </field>
    /// <field name="cursor" type="String">
    /// </field>
    /// <field name="cx" type="Number">
    /// </field>
    /// <field name="cy" type="Number">
    /// </field>
    /// <field name="grd" type="FocusWheel.Grd">
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
    /// <field name="themes" type="Object" static="true">
    /// </field>
    this.ctx = ctx;
    this.cx = cx;
    this.cy = cy;
    this.radius = radius;
    SudoNsb.Storage.defaultLocal('@FwTheme', ['yellow', 'frankieblue'][Snsb.randomOf(2) - 1]);
    this.redraw();
}
FocusWheel.AppStyle.prototype = {
    centerBack: null,
    ctx: null,
    cursor: null,
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
    
    redraw: function FocusWheel_AppStyle$redraw() {
        Snsb.defer(ss.Delegate.create(this, function() {
            this[SudoNsb.Storage.getLocal('@FwTheme')]();
        }));
    },
    
    green: function FocusWheel_AppStyle$green(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        this.grd = this.ctx.createRadialGradient(this.cx, this.cy, 0, this.cx, this.cy, this.radius - 5);
        this.grd.addColorStop(0, 'rgb(255, 255, 170)');
        this.grd.addColorStop(0.945, 'rgb(106, 255, 0)');
        this.grd.addColorStop(1, 'rgb(0, 191, 0)');
        this.lineColor = '#060';
        this.lineWidth = 2;
        this.innerCircleBorder = 2;
        this.textColor = '#816041';
        this.htmlBackground = '#FFF';
        this.centerBack = '#E7FDDF';
        this.bAw = false;
        this.name = 'green';
        $('.Swatch').removeClass('selected');
        $('.Swatch.green').addClass('selected');
        this.become();
    },
    
    yellow: function FocusWheel_AppStyle$yellow(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        this.grd = this.ctx.createRadialGradient(this.cx, this.cy, 0, this.cx, this.cy, this.radius - 5);
        this.grd.addColorStop(0, 'rgb(255, 110, 2)');
        this.grd.addColorStop(0.945, 'rgb(255, 255, 0)');
        this.grd.addColorStop(1, 'rgb(255, 109, 0)');
        this.lineColor = 'rgb(235, 78, 0)';
        this.lineWidth = 2;
        this.innerCircleBorder = 2;
        this.textColor = '#9B0505';
        this.htmlBackground = '#FFF';
        this.centerBack = '#FFC';
        this.centerBack = 'rgba(255,255,220,.65)';
        this.bAw = false;
        this.name = 'yellow';
        $('.Swatch').removeClass('selected');
        $('.Swatch.yellow').addClass('selected');
        this.become();
    },
    
    sunburst: function FocusWheel_AppStyle$sunburst(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        this.grd = this.ctx.createRadialGradient(this.cx, this.cy, 0, this.cx, this.cy, this.radius - 5);
        this.grd.addColorStop(0, '#feccb1');
        this.grd.addColorStop(0.75, '#f17432');
        this.grd.addColorStop(1, '#ea5507');
        this.lineColor = '#FBA0D7';
        this.lineWidth = 10;
        this.innerCircleBorder = 2;
        this.textColor = '#F1E58E';
        this.htmlBackground = '#FFF';
        this.centerBack = '#900';
        this.bAw = false;
        this.name = 'sunburst';
        $('.Swatch').removeClass('selected');
        $('.Swatch.sunburst').addClass('selected');
        this.become();
    },
    
    white: function FocusWheel_AppStyle$white(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        this.grd = this.ctx.createRadialGradient(this.cx, this.cy, 0, this.cx, this.cy, this.radius - 5);
        this.grd.addColorStop(0, 'rgb(255, 255, 255)');
        this.grd.addColorStop(0.945, 'rgb(255, 255, 255)');
        this.grd.addColorStop(1, 'rgb(255, 255, 255)');
        this.lineColor = '#555';
        this.lineWidth = 4;
        this.innerCircleBorder = 4;
        this.textColor = '#000';
        this.htmlBackground = '#FFF';
        this.centerBack = '#EEE';
        this.bAw = true;
        this.name = 'white';
        $('.Swatch').removeClass('selected');
        $('.Swatch.white').addClass('selected');
        this.become();
    },
    
    metro: function FocusWheel_AppStyle$metro(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        this.grd = this.ctx.createRadialGradient(this.cx, this.cy, 0, this.cx, this.cy, this.radius - 5);
        this.grd.addColorStop(0, '#8995D3');
        this.grd.addColorStop(0.945, '#8995D3');
        this.grd.addColorStop(1, '#8995D3');
        this.lineColor = '#4054BE';
        this.lineWidth = 14;
        this.innerCircleBorder = 14;
        this.textColor = '#FFF';
        this.htmlBackground = '#FFF';
        this.centerBack = '#A9A5F3';
        this.bAw = false;
        this.name = 'metro';
        $('.Swatch').removeClass('selected');
        $('.Swatch.metro').addClass('selected');
        this.become();
    },
    
    frankieblue: function FocusWheel_AppStyle$frankieblue(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        this.grd = this.ctx.createRadialGradient(this.cx, this.cy, 0, this.cx, this.cy, this.radius - 5);
        this.grd.addColorStop(0, '#FFF');
        this.grd.addColorStop(0.945, '#1997FB');
        this.grd.addColorStop(1, '#0067AB');
        this.lineColor = '#FFF';
        this.lineWidth = 8;
        this.innerCircleBorder = 4;
        this.textColor = '#008';
        this.htmlBackground = '#FFF';
        this.centerBack = 'transparent';
        this.bAw = false;
        this.name = 'frankieblue';
        $('.Swatch').removeClass('selected');
        $('.Swatch.frankieblue').addClass('selected');
        this.become();
    },
    
    become: function FocusWheel_AppStyle$become() {
        SudoNsb.Storage.setLocal('@FwTheme', this.name);
        $('html').css('background-color', this.htmlBackground);
        $('#FocusWheel').css('color', this.textColor);
        FocusWheel.Input.data.theme = SudoNsb.Storage.getLocal('@FwTheme');
        FocusWheel.Fw.instance.clearCanvas();
        FocusWheel.Fw.instance.drawWheel();
        FocusWheel.Fw.instance.drawInnerCircle();
        FocusWheel.Fw.instance.drawCenter(FocusWheel.Input.data.yatta || 'click here to start');
        if (this.bAw) {
            $('img.stylable').addClass('desaturate');
        }
        else {
            $('img.stylable').removeClass('desaturate');
        }
    }
}


////////////////////////////////////////////////////////////////////////////////
// FocusWheel.FwData

FocusWheel.FwData = function FocusWheel_FwData() {
    /// <field name="segs" type="Array">
    /// </field>
    /// <field name="theme" type="String">
    /// </field>
    /// <field name="were" type="String">
    /// </field>
    /// <field name="yatta" type="String">
    /// </field>
}
FocusWheel.FwData.prototype = {
    segs: null,
    theme: null,
    were: null,
    yatta: null
}


////////////////////////////////////////////////////////////////////////////////
// FocusWheel.HeartBalloons

FocusWheel.HeartBalloons = function FocusWheel_HeartBalloons() {
    /// <field name="_css" type="String" static="true">
    /// </field>
    /// <field name="_html" type="String" static="true">
    /// </field>
    /// <field name="ballonsEl" type="jQueryObject" static="true">
    /// </field>
    /// <field name="_heartImg" type="String" static="true">
    /// </field>
    /// <field name="_spinnerImg" type="String" static="true">
    /// </field>
    /// <field name="_preloaded" type="Boolean">
    /// </field>
    /// <field name="_easings" type="Array">
    /// </field>
    this._easings = ['easeOutQuint', 'easeOutQuint', 'easeOutQuint', 'easeOutExpo', 'easeOutExpo', 'easeOutExpo', 'easeOutBack', 'easeOutBack', 'easeOutBack', 'easeInOutBack', 'easeInOutBack', 'easeOutElastic'];
    MyCss.addStyleOnce((FocusWheel.HeartBalloons).get_fullName(), '\r\n#OuterHearts {\r\n    position: absolute;\r\n    top: -38px;\r\n    left: 0px;\r\n    width: 100%;\r\n    height: 650px;\r\n    overflow: visible;\r\n}\r\n.InnerHearts {\r\n    position: relative;\r\n    width: 100%;\r\n    height: 700px;\r\n}\r\n.ImgBalloon {\r\n    position: absolute;\r\n    width: 35px;\r\n    height: 35px;\r\n}\r\nimg.PreLoad {\r\n    position: absolute;\r\n    top: -10000;\r\n    left: -10000;\r\n    width: 1px;\r\n    height: 1px;\r\n}\r\nimg.Spinner32 {\r\n    position: absolute;\r\n    width: 32px;\r\n    height: 32px;\r\n    border: none;\r\n    z-index: 999;\r\n}\r\n');
    if (!this._preloaded) {
        $("<img class='PreLoad'/>").attr('src', '/nsb/fw/images/heart.png').appendTo(FocusWheel.Fw.instance.fwOuterEl);
        $("<img class='PreLoad'/>").attr('src', '/nsb/fw/images/spinner32.gif').appendTo(FocusWheel.Fw.instance.fwOuterEl);
        this._preloaded = true;
    }
}
FocusWheel.HeartBalloons.spinner = function FocusWheel_HeartBalloons$spinner() {
    /// <returns type="jQueryObject"></returns>
    return $("<img class='Spinner32' width='32' height='32'/>").attr('src', '/nsb/fw/images/spinner32.gif').appendTo('body');
}
FocusWheel.HeartBalloons.spinnerOff = function FocusWheel_HeartBalloons$spinnerOff() {
    $('img.Spinner32').remove();
}
FocusWheel.HeartBalloons.prototype = {
    _preloaded: false,
    
    appendTo: function FocusWheel_HeartBalloons$appendTo(toEl) {
        /// <param name="toEl" type="jQueryObject">
        /// </param>
        /// <returns type="FocusWheel.HeartBalloons"></returns>
        if (FocusWheel.HeartBalloons.ballonsEl != null) {
            FocusWheel.HeartBalloons.ballonsEl.remove();
        }
        FocusWheel.HeartBalloons.ballonsEl = $("\r\n<div id='OuterHearts'><div class='InnerHearts'></div></div>\r\n");
        FocusWheel.HeartBalloons.ballonsEl.appendTo(toEl);
        return this;
    },
    
    addOne: function FocusWheel_HeartBalloons$addOne(seg, fn) {
        /// <param name="seg" type="Number" integer="true">
        /// </param>
        /// <param name="fn" type="Function">
        /// </param>
        fn = fn || function() {
        };
        Snsb.defer(ss.Delegate.create(this, function() {
            var easing = this._easings[seg];
            $('div.InnerHearts').show();
            var rad = NsbMath.Trig.toRadians(180 - FocusWheel.Fw.instance.segmentToDeg(seg));
            var x = FocusWheel.Fw.instance.cx - 26 - (FocusWheel.Fw.radius + 18) * Math.cos(rad);
            var y = FocusWheel.Fw.instance.cy + 12 - (FocusWheel.Fw.radius + 18) * Math.sin(rad);
            var img = $("<img class='ImgBalloon stylable'/>").appendTo('div.InnerHearts').css({ top: FocusWheel.Fw.instance.cy, left: FocusWheel.Fw.instance.cy }).attr('src', '/nsb/fw/images/heart.png');
            if (FocusWheel.Fw.instance.style.bAw) {
                img.addClass('desaturate');
            }
            var target = seg * 360 / 12 - 3;
            SudoNsb.AnimateRotate.aRotate(img, target, { duration: 1200, easing: easing, complete: fn, extra: { top: y, left: x } }, target - 180);
        }));
    },
    
    clear: function FocusWheel_HeartBalloons$clear() {
        $('div.InnerHearts').fadeOut(700, function() {
            $('div.InnerHearts').empty().show();
        });
    }
}


////////////////////////////////////////////////////////////////////////////////
// FocusWheel.My

FocusWheel.My = function FocusWheel_My() {
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
}
FocusWheel.My.ping = function FocusWheel_My$ping(item, msgdata, afterWaitFn) {
    /// <param name="item" type="String">
    /// </param>
    /// <param name="msgdata" type="Object">
    /// </param>
    /// <param name="afterWaitFn" type="Function">
    /// </param>
    var noWait = (item === 'LoadFwPage');
    var noStore = (item === 'LoadFwPage') || (item === 'NewFwPage' && SudoNsb.Storage.getLocal('NewFwPage')) || (FocusWheel.Input.data.yatta === 'x');
    var awx = new SudoNsb.Await();
    if (!noWait) {
        awx.addAw(BrowserUser.waitSessionLockAw).waitDx(function() {
            return BrowserUser.geoInfo.ip != null;
        }, 20000);
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
        var data = new FocusWheel.MyData();
        if (item !== 'LoadFwPage') {
            data.username = Config.userName || 'guest';
            data.theme = FocusWheel.Fw.instance.style.name;
            data.msg = msgdata;
            if (item === 'CompleteFw') {
                data.stats = FocusWheel.My._collectStats();
            }
            else if (item === 'EraseFw') {
                data.stats = FocusWheel.My._collectStats();
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
        options.url = '/nsb/fw/App/sql.myping.php';
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
                    SudoNsb.Storage.removeLocal('FwLastFileTime');
                    BrowserUser.reloadPage();
                }
            }
        };
        options.error = function() {
        };
        $.ajax(options);
        if (afterWaitFn != null) {
            afterWaitFn();
        }
    }).commit();
}
FocusWheel.My._collectStats = function FocusWheel_My$_collectStats() {
    /// <returns type="FocusWheel.Stats"></returns>
    var stats = new FocusWheel.Stats();
    stats.segs = FocusWheel.Input.get_fullSegs();
    stats.segwords = FocusWheel.Input.get_totalWords();
    stats.yattawords = FocusWheel.Input.get_yattaWords();
    return stats;
}
FocusWheel.My._popNote = function FocusWheel_My$_popNote(e) {
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
            FocusWheel.My.ping('DevNote', el.children('textarea').val().trim());
            el.remove();
        }
        else if (e2.which === 27) {
            el.remove();
        }
    }).click().focus();
}


////////////////////////////////////////////////////////////////////////////////
// FocusWheel.MyData

FocusWheel.MyData = function FocusWheel_MyData() {
    /// <field name="msg" type="Object">
    /// </field>
    /// <field name="stats" type="FocusWheel.Stats">
    /// </field>
    /// <field name="theme" type="String">
    /// </field>
    /// <field name="username" type="String">
    /// </field>
}
FocusWheel.MyData.prototype = {
    msg: null,
    stats: null,
    theme: null,
    username: null
}


////////////////////////////////////////////////////////////////////////////////
// FocusWheel.Stats

FocusWheel.Stats = function FocusWheel_Stats() {
    /// <field name="segs" type="Number" integer="true">
    /// </field>
    /// <field name="segwords" type="Number" integer="true">
    /// </field>
    /// <field name="yattawords" type="Number" integer="true">
    /// </field>
}
FocusWheel.Stats.prototype = {
    segs: 0,
    segwords: 0,
    yattawords: 0
}


////////////////////////////////////////////////////////////////////////////////
// FocusWheel.Fw

FocusWheel.Fw = function FocusWheel_Fw(fw) {
    /// <param name="fw" type="jQueryObject">
    /// </param>
    /// <field name="_css" type="String" static="true">
    /// </field>
    /// <field name="clickHere" type="String" static="true">
    /// </field>
    /// <field name="_saveMsg" type="String" static="true">
    /// </field>
    /// <field name="instance" type="FocusWheel.Fw" static="true">
    /// </field>
    /// <field name="pad" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="_square" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="innerRadius" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="radius" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="segs" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="_pxMax" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="yattaDuration" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="fwEl" type="jQueryObject">
    /// </field>
    /// <field name="fwOuterEl" type="jQueryObject">
    /// </field>
    /// <field name="slices" type="Array">
    /// </field>
    /// <field name="_boxes" type="Array">
    /// </field>
    /// <field name="balloons" type="FocusWheel.HeartBalloons">
    /// </field>
    /// <field name="cx" type="Number">
    /// </field>
    /// <field name="cy" type="Number">
    /// </field>
    /// <field name="rotated" type="Number">
    /// </field>
    /// <field name="style" type="FocusWheel.AppStyle">
    /// </field>
    /// <field name="_boxer" type="jQueryObject">
    /// </field>
    /// <field name="_canvas" type="FocusWheel.Canvas">
    /// </field>
    /// <field name="_canvasCx" type="Number" integer="true">
    /// </field>
    /// <field name="_canvasCy" type="Number" integer="true">
    /// </field>
    /// <field name="_canvasEl" type="jQueryObject">
    /// </field>
    /// <field name="_canvasLeft" type="Number" integer="true">
    /// </field>
    /// <field name="_canvasTop" type="Number" integer="true">
    /// </field>
    /// <field name="_clearing" type="Boolean">
    /// </field>
    /// <field name="_ctx" type="FocusWheel.Ctx">
    /// </field>
    /// <field name="_divs" type="Array">
    /// </field>
    /// <field name="_drawToIng" type="Boolean">
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
    /// <field name="fwTopic" type="String" static="true">
    /// </field>
    /// <field name="_txts" type="Array">
    /// </field>
    this.slices = [];
    this._boxes = [];
    this._px = 52;
    this._txts = ['The quick red fox jumps over the lazy brown dog. Over the clover is the end of the rainbow. Pie in the sky is red and green on tuesday. Oh give me a home where the buffalo roam and the deer and the antelope play and seldom is heard a discouraging word.', 'The quick red fox jumpes over the lazy brown dog. Over the clover is the end of the rainbow. Pie in the sky is red and green on tuesday. Oh give me a home where it roams.', 'Hello there', 'Grumpy wizards make toxic brew for the evil queen and jack.'];
    FocusWheel.Fw.instance = this;
    MyCss.addStyleOnce((FocusWheel.Fw).get_fullName(), "\r\nbody { background-color: transparent !important; }\r\n#footer-wrap { background-color: transparent !important; }\r\n.wcustomhtml { overflow: visible !important; }\r\nbutton {\r\n    padding: 10px 14px;\r\n    background-color: #67A4C7;\r\n    font-size: 14px;\r\n    color: #FFF;\r\n    border: none;\r\n    opacity: 0.8;\r\n    -webkit-border-radius: 5px;\r\n    -moz-border-radius: 5px;\r\n    border-radius: 5px;\r\n}\r\nbutton:hover {\r\n    opacity: 1;\r\n}\r\n#FwCenter {\r\n    position: relative;\r\n    width: 100%;\r\n    overflow: visible;\r\n}\r\n#FwOuter {\r\n    position: relative;\r\n    width: %dia%px;\r\n    height: %dia%px;\r\n    margin: 0 auto;\r\n    border: none;\r\n    overflow: visible;\r\n}\r\n#FocusWheel {\r\n    position: relative;\r\n    margin: 0 auto;\r\n    width: %dia%px;\r\n    height: %dia%px;\r\n    border: none;\r\n    overflow: hidden;\r\n}\r\n#Pie {\r\n    position: absolute;\r\n    width: 100%;\r\n    height: 100%;\r\n    opacity: 0.7;\r\n    z-index: -1000;\r\n}\r\n.piebox {\r\n    position: absolute;\r\n    border: 1px solid transparent;\r\n    font-family: Georgia, 'Times New Roman';\r\n    text-align: center;\r\n    padding: 0;\r\n    margin: 0;\r\n    z-index: 2;\r\n}\r\n.piece {\r\n    position: absolute;\r\n    padding: 0;\r\n    margin: 0;\r\n    z-index: 1;\r\n}\r\n.nowrap {\r\n    white-space: nowrap;\r\n    /*overflow: hidden;*/\r\n}\r\n.SegmentNum {\r\n    position: absolute;\r\n    width: 100%;\r\n    top: 4px;\r\n    left: 0;\r\n    text-align: center;\r\n/*    -webkit-transform: rotate(180deg);\r\n    -o-transform: rotate(180deg);\r\n    -ms-transform: rotate(180deg);\r\n    transform: rotate(180deg);\r\n*/\r\n}\r\n.OuterMask {\r\n    position: absolute;\r\n    top: -200px;\r\n    width: 100%;\r\n    height: 200px;\r\n    z-index: 5;\r\n}\r\n#CenterText {\r\n    position: absolute;\r\n    width: 120px;\r\n    height: 120px;\r\n    margin: 0;\r\n    padding: 0;\r\n    font-family: Georgia, 'Times New Roman';\r\n    font-size: 32px;\r\n    line-height: 40px;\r\n    font-weight: bold;\r\n    z-index: 5;\r\n    overflow: hidden;\r\n    cursor: default;\r\n}\r\n#CenterText .CenterCenter {\r\n    width: 120px;\r\n    height: 120px;\r\n    margin: 0;\r\n    padding: 0;\r\n    display: table-cell;\r\n    vertical-align: middle;\r\n    text-align: center;\r\n}\r\n#Choosers {\r\n    position: absolute;\r\n    width: 18px;\r\n    top: 0;\r\n    right: 0;\r\n    z-index: 20;\r\n}\r\n#Choosers .Swatch {\r\n    width: 16px;\r\n    height: 16px;\r\n    margin: 2px 0 0 0;\r\n    cursor: pointer;\r\n    opacity: 0.65;\r\n    -webkit-border-radius: 8px;\r\n    -moz-border-radius: 8px;\r\n    border-radius: 8px;\r\n}\r\n#Choosers .Swatch.selected:after {\r\n    content: '&larr;';\r\n    position: relative;\r\n    top: -5px;\r\n    right: 7px;\r\n    display: block;\r\n    font-size: 18px;\r\n    font-weight: bold;\r\n    color: #006;\r\n    z-index: -2;\r\n}\r\n#Choosers .Swatch:hover {\r\n    opacity: 1.0;\r\n}\r\n#Choosers .Swatch:hover:after {\r\n    content: '&larr;';\r\n    position: relative;\r\n    top: -5px;\r\n    right: 10px;\r\n    display: block;\r\n    font-size: 18px;\r\n    font-weight: bold;\r\n    color: #006;\r\n    z-index: 0;\r\n}\r\n#ClearBtn {\r\n    position: absolute;\r\n    left: 20px;\r\n    bottom: 5px;\r\n    z-index: 20;\r\n}\r\n#SaveBtn {\r\n    position: absolute;\r\n    right: 20px;\r\n    bottom: 5px;\r\n    z-index: 20;\r\n}\r\nimg.stylable.desaturate {\r\n    -webkit-filter: grayscale(100%);\r\n    -moz-filter: grayscale(100%);\r\n    filter: grayscale(100%);\r\n    opacity: 0.55;\r\n}\r\n.SaveMsg {\r\n    text-align: left;\r\n}\r\n.SaveMsg a { cursor: pointer; }\r\ndiv.PnxPop.SaveMsgPop button.OkBtn {\r\n    width: 140px;\r\n    right: 40px;\r\n}\r\ndiv.PnxPop.SaveMsgPop button.CancelBtn {\r\n    width: 140px;\r\n    left: 40px;\r\n}\r\ntextarea.OnTextCopy {\r\n    position: absolute;\r\n    box-sizing:border-box;\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    margin: 0;\r\n    padding: 2px 4px;\r\n    color: black;\r\n    background: white;\r\n}\r\n".replaceAll('%dia%', (FocusWheel.Fw.radius * 2).toString()));
    if (!fw.length) {
        return;
    }
    this.fwEl = fw;
    this.fwOuterEl = fw.closest('#FwOuter');
    this.fwOuterEl.on('click', '#FocusWheel, #CenterText, #OuterHearts', ss.Delegate.create(this, this.onClick));
    Snsb.defer(ss.Delegate.create(this, function() {
        this._canvasEl = $("<div><canvas id='Pie' width='" + 700 + "' height='" + 700 + "'/></div>").appendTo(this.fwEl);
        this._canvasEl = $('canvas', this._canvasEl);
        this.drawWholeWheel(ss.Delegate.create(this, function() {
            $(window.self).resize(ss.Delegate.create(this, function() {
                this.drawWholeWheel(ss.Delegate.create(this, this.drawAllText));
            }));
            FocusWheel.My.ping('NewFwPage');
        }));
    }), 50);
}
FocusWheel.Fw.phpWrap = function FocusWheel_Fw$phpWrap(str, width, brk, cut) {
    /// <param name="str" type="String">
    /// </param>
    /// <param name="width" type="Number" integer="true">
    /// </param>
    /// <param name="brk" type="String">
    /// </param>
    /// <param name="cut" type="Boolean">
    /// </param>
    /// <returns type="String"></returns>
    brk = brk || '\n';
    width = (ss.isValue(width)) ? width : 75;
    cut = cut || false;
    if (String.isNullOrEmpty(str)) {
        return str;
    }
    var regex = '.{1,' + width + '}(\\s|$)' + ((cut) ? '|.{' + width + '}|.+$' : '|\\S+?(\\s|$)');
    return str.match(new RegExp(regex, 'g')).join(brk);
}
FocusWheel.Fw.prototype = {
    fwEl: null,
    fwOuterEl: null,
    balloons: null,
    cx: 0,
    cy: 0,
    rotated: 0,
    style: null,
    _boxer: null,
    _canvas: null,
    _canvasCx: 0,
    _canvasCy: 0,
    _canvasEl: null,
    _canvasLeft: 0,
    _canvasTop: 0,
    _clearing: false,
    _ctx: null,
    _divs: null,
    _drawToIng: false,
    _lh: 0,
    _pieIdx: 0,
    _pieText: null,
    _retry: false,
    _saving: false,
    _wordIdx: 0,
    _words: null,
    
    drawWholeWheel: function FocusWheel_Fw$drawWholeWheel(fn) {
        /// <param name="fn" type="Function">
        /// </param>
        var seg = 360 / 12;
        this.rotated = 90;
        var newWheel = true;
        this._canvas = this._canvasEl[0];
        this._canvasLeft = this._canvasEl.offset().left;
        this._canvasTop = this._canvasEl.offset().top;
        this._canvasCx = this._canvasEl.width() / 2;
        this._canvasCy = this._canvasEl.height() / 2;
        if (this.slices.length > 0) {
            newWheel = false;
            $('.piece', this.fwEl).remove();
        }
        for (var i = 0; i < 12; i++) {
            var p = $("<div class='piece' id='Piece" + i + "'/>").css({ width: '100%', height: '100%' }).appendTo(this.fwEl).append("<div class='SegmentNum'>" + (i + 1) + '</div>');
            if (newWheel) {
                this.slices.add(new FocusWheel.Input(this, i, p));
            }
            else {
                this.slices[i].updateDisplay(p);
            }
            this.rawRotate(p, seg * i);
        }
        this._ctx = this._canvas.getContext('2d');
        this._ctx.lineWidth = 2;
        this.cx = FocusWheel.Fw.radius + 8;
        this.cy = FocusWheel.Fw.radius + 8;
        this.style = new FocusWheel.AppStyle(this._ctx, this.cx, this.cy, FocusWheel.Fw.radius);
        this.clearCanvas();
        this.drawWheel();
        this.drawInnerCircle();
        this.drawControls();
        Snsb.defer(ss.Delegate.create(this, function() {
            this.drawCenter('click here to start');
            if (newWheel) {
                this.balloons = new FocusWheel.HeartBalloons().appendTo(this.fwOuterEl);
            }
            if (fn != null) {
                fn();
            }
        }), 2000);
    },
    
    drawAllText: function FocusWheel_Fw$drawAllText() {
        for (var i = 0; i < FocusWheel.Input.data.segs.length; i++) {
            this.reDrawSegAsync(FocusWheel.Input.data.segs[i] || '', i);
        }
        this.drawCenter(FocusWheel.Input.data.yatta);
    },
    
    drawTo: function FocusWheel_Fw$drawTo(text, pieIdx, fn) {
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
        this._px = 52;
        this._pieIdx = pieIdx;
        this._pieText = text || '';
        this._words = this._pieText.split(' ');
        this._divs = this.slices[pieIdx].divs;
        FocusWheel.Input.data.segs[pieIdx] = text;
        this.fwEl.css({ color: this.style.textColor });
        this._drawText(ss.Delegate.create(this, function() {
            this._drawTextLoop(ss.Delegate.create(this, function() {
                var ln = 1;
                var $enum1 = ss.IEnumerator.getEnumerator(this._divs);
                while ($enum1.moveNext()) {
                    var div = $enum1.current;
                    SudoNsb.ArcText.bend(div, { radius: FocusWheel.Fw.radius - 14 - ((ln++) * (this._lh + 2)) });
                }
                if (fn != null) {
                    fn();
                }
                this._drawToIng = false;
            }));
        }));
    },
    
    _drawTextLoop: function FocusWheel_Fw$_drawTextLoop(fn) {
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
    
    _drawText: function FocusWheel_Fw$_drawText(fn) {
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
        this._lh = parseInt(this._px * 1.25);
        for (var i = FocusWheel.Fw.radius - this._lh - (14); i > 80; i -= this._lh) {
            var x1 = this.cx - 8 - 2 + Math.cos(NsbMath.Trig.toRadians(255)) * i;
            var y1 = this.cy - 8 - 2 + Math.sin(NsbMath.Trig.toRadians(255)) * i;
            var x2 = this.cx + Math.cos(NsbMath.Trig.toRadians(285)) * i;
            var box = new FocusWheel.Cpt(x1, y1 - this._lh, x2 - x1 - 8 - 2, this._lh);
            this._boxes.add(box);
        }
        this._printWrap();
        fn();
    },
    
    _printWrap: function FocusWheel_Fw$_printWrap() {
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
            var div = $("<div class='piebox nowrap'/>").html(str).css({ top: cpt.l, left: cpt.t, width: cpt.w, height: cpt.h, 'line-height': this._lh + 'px', 'font-size': this._px + 'px' }).appendTo(this.slices[this._pieIdx].divPiece);
            this._divs.add(div);
            if (this._wordIdx >= this._words.length) {
                return;
            }
        }
        this._retry = true;
    },
    
    _boxWrap: function FocusWheel_Fw$_boxWrap(width) {
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
    
    _boxWrap2: function FocusWheel_Fw$_boxWrap2(width) {
        /// <param name="width" type="Number" integer="true">
        /// </param>
        var bx = $("<div class='piebox'>l</div>").css({ width: width, display: 'block', 'line-height': this._lh + 'px', 'font-size': this._px + 'px' }).appendTo('body');
        var height = bx.height();
        bx.html('');
        for (var i = this._wordIdx; i < this._words.length; i++) {
            var str = this._words.extract(this._wordIdx, i + 1 - this._wordIdx).join(' ');
            bx.html(str);
            if (bx.height() > height) {
                if (i <= this._wordIdx) {
                    i++;
                    this._retry = true;
                }
                this._wordIdx = i;
                bx.remove();
                return;
            }
        }
        this._wordIdx = this._words.length;
        bx.remove();
        this._retry = true;
    },
    
    rotate: function FocusWheel_Fw$rotate(el, angle) {
        /// <param name="el" type="jQueryObject">
        /// </param>
        /// <param name="angle" type="Number">
        /// </param>
        this.rotated = angle + 90;
        this.rotated = (this.rotated >= 360) ? 360 - this.rotated : this.rotated;
        this.rawRotate(el, -angle);
    },
    
    rawRotate: function FocusWheel_Fw$rawRotate(el, angle) {
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
    },
    
    onClick: function FocusWheel_Fw$onClick(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        if (e.shiftKey) {
            this._fillTestData();
            return;
        }
        var xd = (e.pageX - this._canvasLeft) - this._canvasCx;
        var yd = this._canvasCy - (e.pageY - this._canvasTop);
        var radius = Math.sqrt((xd * xd) + (yd * yd));
        if (radius > FocusWheel.Fw.radius) {
            return;
        }
        if (radius <= 80) {
            if (Snsb.isEmpty(FocusWheel.Input.data.were)) {
                this.slices[0].editWere();
            }
            else {
                this.slices[0].editCenter();
            }
            return;
        }
        var deg = this.xyToDeg(xd, yd);
        var slice = this.degToSegment(deg);
        ss.Debug.assert(slice < 12, 'slice index out of range');
        this.slices[slice].edit();
    },
    
    _onClear: function FocusWheel_Fw$_onClear(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        if (this._clearing) {
            return;
        }
        this._clearing = true;
        FocusWheel.Input.unYatta();
        this.balloons.clear();
        SudoNsb.Dom.unFocus();
        FocusWheel.My.ping('EraseFw', ss.Delegate.create(this, function() {
            FocusWheel.Input.erase();
            this.spinWheel(ss.Delegate.create(this, function() {
                this.drawCenter('click here to start');
                this._clearing = false;
            }));
        }));
    },
    
    _onSave: function FocusWheel_Fw$_onSave(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        if (this._saving) {
            return;
        }
        this._saving = true;
        if (!Snsb.get_isPxUser()) {
            SudoNsb.Pop.okCancel(ss.Delegate.create(this, function(po) {
                po.pop.element.addClass('SaveMsgPop');
                po.msg = 'Please log in to save and share wheels.';
                po.okFace = 'Login';
                po.okFn = ss.Delegate.create(this, function() {
                    SudoNsb.PxUser.tryLogin(ss.Delegate.create(this, function() {
                        this._onSave(e);
                    }));
                });
            }));
            this._saving = false;
            return;
        }
        SudoNsb.Dom.unFocus();
        new SudoNsb.Await().addAw(SudoNsb.Pop.okAw, ss.Delegate.create(this, function(po) {
            po.pop.element.addClass('SaveMsgPop');
            po.msg = "\r\n<h3>You can</h3>\r\n<ol class='SaveMsg'>\r\n<li><a class='SavePrivate'>Save your wheel privately</a> so that you can access it later.</li>\r\n<li><a class='SaveShare'>Share a copy of your wheel</a> which can be viewed by others and shared on social networks.</li>\r\n<li><a class='TextCopy'>Copy and Paste</a> the text of your wheel.</li>\r\n</ol>\r\n";
            po.okFace = 'cancel';
            Snsb.defer(ss.Delegate.create(this, function() {
                $('.SavePrivate', po.pop.element).click(ss.Delegate.create(this, this._onSaveForMe));
            }));
            Snsb.defer(ss.Delegate.create(this, function() {
                $('.SaveShare', po.pop.element).click(ss.Delegate.create(this, this._onSaveAndShare));
            }));
            Snsb.defer(ss.Delegate.create(this, function() {
                $('.TextCopy', po.pop.element).click(ss.Delegate.create(this, this._onTextCopy));
            }));
            po.closeFn = ss.Delegate.create(this, function() {
                this._saving = false;
            });
        })).commit();
    },
    
    _onSaveForMe: function FocusWheel_Fw$_onSaveForMe(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        SudoNsb.PxUser.tryLogin(function(success) {
            if (success) {
                SudoNsb.Pop.closeAll();
                new SudoNsb.Await().addFn(Surface.spinner, true).addDl(function(aw) {
                    SqlThings.storeTopicAw(aw, '/Pnx/Item/FocusWheel', FocusWheel.Input.data, true);
                }).addFn(Surface.spinner, false).commit();
            }
        });
    },
    
    _onSaveAndShare: function FocusWheel_Fw$_onSaveAndShare(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        SudoNsb.PxUser.tryLogin(function(success) {
            if (success) {
                SudoNsb.Pop.closeAll();
                new SudoNsb.Await().addFn(Surface.spinner, true).addDl(function(aw) {
                    SqlThings.storeTopicAw(aw, '/Pnx/Item/FocusWheel', FocusWheel.Input.data, false);
                }).addFn(Surface.spinner, false).commit();
            }
        });
    },
    
    _onTextCopy: function FocusWheel_Fw$_onTextCopy(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        SudoNsb.Pop.closeAll();
        var ot = '';
        ot += String.format('{0}\r\n', FocusWheel.Input.data.were);
        ot += String.format('{0}\r\n\r\n', FocusWheel.Input.data.yatta);
        var cnt = 0;
        var $enum1 = ss.IEnumerator.getEnumerator(FocusWheel.Input.data.segs);
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
    
    reDrawSegAsync: function FocusWheel_Fw$reDrawSegAsync(text, seg) {
        /// <param name="text" type="String">
        /// </param>
        /// <param name="seg" type="Number" integer="true">
        /// </param>
        Snsb.defer(ss.Delegate.create(this, function() {
            this.drawTo(text, seg);
        }), seg * parseInt(800 / 12 - 30));
    },
    
    degToSegment: function FocusWheel_Fw$degToSegment(deg) {
        /// <param name="deg" type="Number">
        /// </param>
        /// <returns type="Number" integer="true"></returns>
        var slice = parseInt(deg * 12 / 360);
        if (!!slice) {
            slice = 12 - slice;
        }
        return slice;
    },
    
    segmentToDeg: function FocusWheel_Fw$segmentToDeg(seg) {
        /// <param name="seg" type="Number" integer="true">
        /// </param>
        /// <returns type="Number"></returns>
        if (!!seg) {
            seg = 12 - seg;
        }
        var deg = seg * 360 / 12;
        deg += this.rotated;
        if (deg >= 360) {
            deg -= 360;
        }
        else if (deg < 0) {
            deg += 360;
        }
        return deg;
    },
    
    degToXy: function FocusWheel_Fw$degToXy(deg, rad) {
        /// <param name="deg" type="Number">
        /// </param>
        /// <param name="rad" type="Number">
        /// </param>
        /// <returns type="Array"></returns>
        var x = Math.round(rad * Math.cos(NsbMath.Trig.toRadians(deg)));
        var y = Math.round(rad * Math.sin(NsbMath.Trig.toRadians(deg)));
        return [x, y];
    },
    
    xyToDeg: function FocusWheel_Fw$xyToDeg(x, y) {
        /// <param name="x" type="Number" integer="true">
        /// </param>
        /// <param name="y" type="Number" integer="true">
        /// </param>
        /// <returns type="Number"></returns>
        var fx = 360 / 12;
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
    
    drawCenter: function FocusWheel_Fw$drawCenter(text) {
        /// <param name="text" type="String">
        /// </param>
        if (!window.jQuery.ui) {
            Snsb.defer(ss.Delegate.create(this, function() {
                this.drawCenter(text);
            }), 13);
            return;
        }
        $('#CenterText').remove();
        var el = $("<div id='CenterText' title='click to start your focus wheel'/>").css({ color: this.style.textColor }).html("<div class='CenterCenter'>" + (text || 'click here to start') + '</div>').appendTo('#FwOuter');
        SudoNsb.ToolTips.addTo(el);
        el.position({ of: '#FwOuter' });
        el.find('div').css(SudoNsb.Text.fitPx(el, 1.25));
    },
    
    drawWheel: function FocusWheel_Fw$drawWheel() {
        var seg = 360 / 12;
        var shift = seg / 2;
        this._ctx.lineWidth = this.style.lineWidth;
        this._ctx.fillStyle = this.style.grd;
        this._ctx.strokeStyle = this.style.lineColor;
        for (var i = shift; i < 360 + shift; i += seg) {
            this._ctx.beginPath();
            this._ctx.moveTo(this.cx, this.cy);
            this._ctx.arc(this.cx, this.cy, FocusWheel.Fw.radius, NsbMath.Trig.toRadians(i), NsbMath.Trig.toRadians(i + seg));
            this._ctx.lineTo(this.cx, this.cy);
            this._ctx.stroke();
            this._ctx.fill();
            this._ctx.closePath();
        }
    },
    
    drawInnerCircle: function FocusWheel_Fw$drawInnerCircle() {
        this._ctx.moveTo(this.cx, this.cy);
        this._ctx.beginPath();
        this._ctx.lineWidth = (this.style.innerCircleBorder || this.style.lineWidth);
        this._ctx.fillStyle = this.style.centerBack;
        this._ctx.strokeStyle = this.style.lineColor;
        this._ctx.arc(this.cx, this.cy, 80, 0, 2 * Math.PI);
        this._ctx.stroke();
        this._ctx.fill();
    },
    
    drawCursor: function FocusWheel_Fw$drawCursor(deg) {
        /// <param name="deg" type="Number" integer="true">
        /// </param>
        this.eraseCursor();
        this._ctx.lineWidth = 1;
        this._ctx.fillStyle = 'rgba(0,0,255,.20)';
        this._ctx.strokeStyle = 'transparent';
        this._ctx.beginPath();
        this._ctx.moveTo(this.cx, this.cy);
        this._ctx.arc(this.cx, this.cy, FocusWheel.Fw.radius, NsbMath.Trig.toRadians(deg), NsbMath.Trig.toRadians(deg + (360 / 12)));
        this._ctx.fill();
        this._ctx.closePath();
    },
    
    eraseCursor: function FocusWheel_Fw$eraseCursor() {
        this.drawWheel();
        this.drawInnerCircle();
    },
    
    drawControls: function FocusWheel_Fw$drawControls() {
        $('#Choosers').remove();
        $('#ClearBtn').remove();
        var coo = $("<div id='Choosers'/>").appendTo('#FwOuter');
        var $dict1 = FocusWheel.AppStyle.themes;
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
        var $dict3 = FocusWheel.AppStyle.themes;
        for (var $key4 in $dict3) {
            var p = { key: $key4, value: $dict3[$key4] };
            swatches.eq(i++).data('styleName', p.key).on('click', myClick).attr('title', FocusWheel.AppStyle.themes[p.key]['title'] + ' Theme').css('background', FocusWheel.AppStyle.themes[p.key]['background']);
        }
        $("<button id='ClearBtn'>erase</button>").appendTo('#FwOuter').click(ss.Delegate.create(this, this._onClear));
        $("<button id='SaveBtn'>save / share</button>").appendTo('#FwOuter').click(ss.Delegate.create(this, this._onSave));
        SudoNsb.ToolTips.addTo($('div.Swatch'));
    },
    
    clearCanvas: function FocusWheel_Fw$clearCanvas() {
        this._ctx.save();
        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
        this._ctx.restore();
    },
    
    spinWheel: function FocusWheel_Fw$spinWheel(complete) {
        /// <param name="complete" type="Function">
        /// </param>
        SudoNsb.AnimateRotate.aRotate(this.fwEl, 360, { duration: 800, complete: complete, easing: 'easeOutQuart' }, 90);
    },
    
    _fillTestData: function FocusWheel_Fw$_fillTestData() {
        var fn = ss.Delegate.create(this, function(i) {
            Snsb.defer(ss.Delegate.create(this, function() {
                this.drawTo(this._txts[Snsb.randomOf(3) - 1], i);
            }));
        });
        for (var i = 0; i < 12; i++) {
            fn(i);
        }
    }
}


////////////////////////////////////////////////////////////////////////////////
// FocusWheel.Canvas

FocusWheel.Canvas = function FocusWheel_Canvas() {
    /// <field name="height" type="Number" integer="true">
    /// </field>
    /// <field name="width" type="Number" integer="true">
    /// </field>
}
FocusWheel.Canvas.prototype = {
    height: 0,
    width: 0
}


////////////////////////////////////////////////////////////////////////////////
// FocusWheel.Cpt

FocusWheel.Cpt = function FocusWheel_Cpt(t, l, w, h) {
    /// <param name="t" type="Number">
    /// </param>
    /// <param name="l" type="Number">
    /// </param>
    /// <param name="w" type="Number">
    /// </param>
    /// <param name="h" type="Number">
    /// </param>
    /// <field name="h" type="Number">
    /// </field>
    /// <field name="l" type="Number">
    /// </field>
    /// <field name="t" type="Number">
    /// </field>
    /// <field name="w" type="Number">
    /// </field>
    this.t = t;
    this.l = l;
    this.w = w;
    this.h = h;
}
FocusWheel.Cpt.prototype = {
    h: 0,
    l: 0,
    t: 0,
    w: 0
}


////////////////////////////////////////////////////////////////////////////////
// FocusWheel.Ctx

FocusWheel.Ctx = function FocusWheel_Ctx() {
    /// <field name="canvas" type="FocusWheel.Canvas">
    /// </field>
    /// <field name="fillStyle" type="Object">
    /// </field>
    /// <field name="lineWidth" type="Number">
    /// </field>
    /// <field name="strokeStyle" type="String">
    /// </field>
}
FocusWheel.Ctx.prototype = {
    canvas: null,
    fillStyle: null,
    lineWidth: 0,
    strokeStyle: null
}


////////////////////////////////////////////////////////////////////////////////
// FocusWheel.Grd

FocusWheel.Grd = function FocusWheel_Grd() {
}


////////////////////////////////////////////////////////////////////////////////
// FocusWheel.Input

FocusWheel.Input = function FocusWheel_Input(fw, seg, divPiece) {
    /// <param name="fw" type="FocusWheel.Fw">
    /// </param>
    /// <param name="seg" type="Number" integer="true">
    /// </param>
    /// <param name="divPiece" type="jQueryObject">
    /// </param>
    /// <field name="_css" type="String" static="true">
    /// </field>
    /// <field name="_editing" type="jQueryObject" static="true">
    /// </field>
    /// <field name="data" type="FocusWheel.FwData" static="true">
    /// </field>
    /// <field name="_were" type="jQueryObject" static="true">
    /// </field>
    /// <field name="_wereMetrics" type="OnScreen" static="true">
    /// </field>
    /// <field name="divs" type="Array">
    /// </field>
    /// <field name="_fw" type="FocusWheel.Fw">
    /// </field>
    /// <field name="_prompts" type="Object">
    /// </field>
    /// <field name="_seg" type="Number" integer="true">
    /// </field>
    /// <field name="divPiece" type="jQueryObject">
    /// </field>
    /// <field name="_cursorDeg" type="Number" integer="true">
    /// </field>
    /// <field name="_wasEmpty" type="Boolean">
    /// </field>
    this.divs = [];
    this._prompts = { yatta: 'Where do you want to be right now on this subject?', were: 'What are you noticing right now that you want to change?', first: 'What is something that is positive, general, and you know is true about where you are on this subject right now?', second: 'What else is true and you do not hesitate at all to say it?', third: 'What else is true?' };
    MyCss.addStyleOnce((FocusWheel.Input).get_fullName(), "\r\ntextarea.Input {\r\n    width: 270px;\r\n    height: 157px;\r\n    margin: 0;\r\n    padding: 5px 8px;\r\n    font-size: 16px;\r\n    line-height: 23px;\r\n    font-family: Georgia,'Times New Roman';\r\n}\r\n#InputOuter {\r\n    position: absolute;\r\n    width: 286px;\r\n    height: 167px;\r\n    z-index: 10;\r\n    box-shadow: 2px 3px 7px 3px rgba(34, 31, 31, 0.45);\r\n    -moz-box-shadow: 2px 3px 7px 3px rgba(34, 31, 31, 0.45);\r\n    -webkit-box-shadow: 2px 3px 7px 3px rgba(34, 31, 31, 0.45);\r\n}\r\n#InputOuter:after {\r\n    content: 'press enter to move on';\r\n    display: block;\r\n    position: absolute;\r\n    margin: 0 0 0 50%;\r\n    padding: 0;\r\n    width: 180px;\r\n    height: 15px;\r\n    text-align: center;\r\n    bottom: -18px;\r\n    left: -90px;\r\n    color: rgba(0,0,0,.54);\r\n    background-color: rgba(255,255,255,.65);\r\n    font-size: 13px;\r\n    line-height: 12px;\r\n    z-index: 900;\r\n}\r\n#Fireworks {\r\n    position: absolute;\r\n    top: 0;\r\n    left: 135px;\r\n    width: 128px;\r\n    height: 128px;\r\n}\r\n#Fireworks2 {\r\n    position: absolute;\r\n    top: 0;\r\n    left: 120px;\r\n    width: 100px;\r\n    height: 125px;\r\n}\r\n.WereBox {\r\n    position: absolute;\r\n    display: block;\r\n    width: 120px;\r\n    height: 120px;\r\n    margin: 0;\r\n    padding: 0;\r\n    font-family: Georgia, 'Times New Roman';\r\n    font-size: 32px;\r\n    line-height: 40px;\r\n    font-weight: normal;\r\n    border: 1px solid #CCC;\r\n    -webkit-border-radius: 8px;\r\n    -moz-border-radius: 8px;\r\n    border-radius: 8px;\r\n    box-sizing: border-box;\r\n    z-index: 10;\r\n}\r\n.WereBoxInner {\r\n    position: relative;\r\n    display: table-cell;\r\n    width: 100%;\r\n    height: 100%;\r\n    margin: 0;\r\n    padding: 4%;\r\n    vertical-align: middle;\r\n    text-align: center;\r\n    box-sizing: border-box;\r\n}\r\n");
    FocusWheel.Input.data = new FocusWheel.FwData();
    FocusWheel.Input.data.segs = [];
    FocusWheel.Input.data.segs[12 - 1] = '';
    this._seg = seg;
    this._fw = fw;
    this.divPiece = divPiece;
}
FocusWheel.Input.get_fullSegs = function FocusWheel_Input$get_fullSegs() {
    /// <value type="Number" integer="true"></value>
    var cnt = 0;
    var $enum1 = ss.IEnumerator.getEnumerator(FocusWheel.Input.data.segs);
    while ($enum1.moveNext()) {
        var txt = $enum1.current;
        if (!String.isNullOrEmpty(txt)) {
            cnt++;
        }
    }
    return cnt;
}
FocusWheel.Input.get_totalWords = function FocusWheel_Input$get_totalWords() {
    /// <value type="Number" integer="true"></value>
    var words = 0;
    var cnt = 0;
    var $enum1 = ss.IEnumerator.getEnumerator(FocusWheel.Input.data.segs);
    while ($enum1.moveNext()) {
        var txt = $enum1.current;
        if (!String.isNullOrEmpty(txt)) {
            words += txt.split(' ').length;
            cnt++;
        }
    }
    return words;
}
FocusWheel.Input.get_yattaWords = function FocusWheel_Input$get_yattaWords() {
    /// <value type="Number" integer="true"></value>
    return (String.isNullOrEmpty(FocusWheel.Input.data.yatta)) ? 0 : FocusWheel.Input.data.yatta.split(' ').length;
}
FocusWheel.Input.erase = function FocusWheel_Input$erase() {
    for (var i = 0; i < FocusWheel.Input.data.segs.length; i++) {
        FocusWheel.Input.data.segs[i] = '';
        FocusWheel.Fw.instance.reDrawSegAsync('', i);
    }
    FocusWheel.Input.data.yatta = FocusWheel.Input.data.were = '';
    if (FocusWheel.Input._were != null) {
        FocusWheel.Input._were.remove();
        FocusWheel.Input._were = null;
        FocusWheel.Input._wereMetrics = null;
    }
}
FocusWheel.Input.wereShrink = function FocusWheel_Input$wereShrink() {
    if (FocusWheel.Input._wereMetrics == null) {
        FocusWheel.Input._wereMetrics = new OnScreen().getMetricsFrom(FocusWheel.Input._were);
    }
    var dwd = parseInt(FocusWheel.Input._wereMetrics.width / (12 + 2));
    var dht = parseInt(FocusWheel.Input._wereMetrics.height / (12 + 2));
    var dl = dwd / 2;
    var dt = dht / 2;
    var wd = FocusWheel.Input._were.width();
    var ht = FocusWheel.Input._were.height();
    var px = parseInt((wd / FocusWheel.Input._wereMetrics.width) * FocusWheel.Input._wereMetrics.fontSize);
    var p = FocusWheel.Input._were.offset();
    FocusWheel.Input._were.animate({ top: p.top + dt, left: p.left + dl, width: wd - dwd, height: ht - dht, 'font-size': px - 1, 'line-height': 1 }, { duration: 1200, easing: 'easeOutQuad' });
}
FocusWheel.Input.yatta = function FocusWheel_Input$yatta() {
    var done = true;
    var $enum1 = ss.IEnumerator.getEnumerator(FocusWheel.Input.data.segs);
    while ($enum1.moveNext()) {
        var s = $enum1.current;
        if (Snsb.isEmpty(s)) {
            done = false;
            break;
        }
    }
    if (Snsb.isEmpty(FocusWheel.Input.data.yatta) || Snsb.isEmpty(FocusWheel.Input.data.were)) {
        done = false;
    }
    if (!done) {
        return;
    }
    FocusWheel.Input._were.hide();
    FocusWheel.Fw.instance.spinWheel(function() {
        FocusWheel.My.ping('CompleteFw');
        Snsb.defer(function() {
            $("<img id='Fireworks' class='yatta' src='/nsb/fw/images/animated-fireworks.gif'/>").appendTo(FocusWheel.Fw.instance.fwEl);
            $("<img id='Fireworks2' class='yatta' src='/nsb/fw/images/animated-fireworks2.gif'/>").appendTo(FocusWheel.Fw.instance.fwEl);
            Snsb.defer(FocusWheel.Input.unYatta, 136000);
        }, 700);
    });
}
FocusWheel.Input.unYatta = function FocusWheel_Input$unYatta() {
    $('.yatta').remove();
}
FocusWheel.Input.prototype = {
    _fw: null,
    _seg: 0,
    divPiece: null,
    _cursorDeg: 0,
    _wasEmpty: false,
    
    updateDisplay: function FocusWheel_Input$updateDisplay(divPiece) {
        /// <param name="divPiece" type="jQueryObject">
        /// </param>
        this.divPiece = divPiece;
    },
    
    edit: function FocusWheel_Input$edit() {
        Snsb.defer(SudoNsb.ToolTips.clearTips, 20);
        FocusWheel.Input.unYatta();
        if (FocusWheel.Input._editing != null && FocusWheel.Input._editing.length > 0) {
            FocusWheel.Input._editing.parent().remove();
        }
        var sw = 360 / 12;
        this._cursorDeg = (this._seg * sw) - (sw / 2) - parseInt((this._fw.rotated - (this._fw.rotated - 90)));
        var text = FocusWheel.Input.data.segs[this._seg] || '';
        this._wasEmpty = String.isNullOrEmpty(text);
        var prompt;
        switch (this._seg) {
            case 0:
                prompt = this._prompts['first'];
                break;
            case 1:
                prompt = this._prompts['second'];
                break;
            default:
                prompt = this._prompts['third'];
                break;
        }
        var outer = $("<div id='InputOuter'><textarea class='Input'></textarea></div>").appendTo('#FwOuter');
        FocusWheel.Input._editing = $('.Input', outer).attr('placeholder', prompt).val(text).keydown(ss.Delegate.create(this, this._onSliceKey)).blur(ss.Delegate.create(this, this._endEdit));
        var nextSeg = (this._seg + 1 === 12) ? 0 : this._seg + 1;
        var xy = this.segCenter(outer, nextSeg, FocusWheel.Fw.radius * 0.55);
        outer.css({ top: xy[1], left: xy[0] });
        this._fw.drawCursor(this._cursorDeg);
        Snsb.defer(function() {
            SudoNsb.Dom.scrollInViewAw(SudoNsb.Await.get_asyncAw(), outer);
            FocusWheel.Input._editing.click().focus();
            SudoNsb.Text.selectRange(FocusWheel.Input._editing, text.length, text.length);
        }, 5);
    },
    
    _endEdit: function FocusWheel_Input$_endEdit(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        Snsb.cancelEvent(e);
        var seg = this._seg;
        var wasEmpty = this._wasEmpty;
        var text = FocusWheel.Input._editing.val().trim();
        FocusWheel.Input.data.segs[seg] = text;
        FocusWheel.Input._editing.parent().remove();
        FocusWheel.Input._editing = null;
        this._fw.eraseCursor();
        if (seg < 12 - 1 && e.type === 'keydown') {
            var nxtSeg = (String.isNullOrEmpty(text)) ? seg : seg + 1;
            this._fw.slices[nxtSeg].edit();
        }
        Snsb.defer(ss.Delegate.create(this, function() {
            this._fw.drawTo(text, seg, function() {
                if (wasEmpty && !String.isNullOrEmpty(text)) {
                    FocusWheel.Input.wereShrink();
                    FocusWheel.Fw.instance.balloons.addOne(seg, function() {
                        Snsb.defer(FocusWheel.Input.yatta, 50);
                    });
                }
            });
        }), 200);
    },
    
    editWere: function FocusWheel_Input$editWere(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        SudoNsb.ToolTips.clearTips();
        FocusWheel.Input.unYatta();
        if (FocusWheel.Input._editing != null && FocusWheel.Input._editing.length > 0) {
            FocusWheel.Input._editing.parent().remove();
        }
        var text = FocusWheel.Input.data.were || '';
        if (String.isNullOrEmpty(text)) {
            FocusWheel.My.ping('StartFw');
        }
        var outer = $("<div id='InputOuter' class='InputWere'><textarea class='Input'></textarea></div>").appendTo(document.body);
        FocusWheel.Input._editing = $('.Input', outer).attr('placeholder', this._prompts['were']).val(text).keydown(ss.Delegate.create(this, this._onWereKey)).blur(ss.Delegate.create(this, this._endWereEdit));
        outer.position({ my: 'left top', at: 'left-52 top+8', of: '#FwOuter', collision: 'none' });
        Snsb.defer(function() {
            SudoNsb.Dom.scrollInViewAw(SudoNsb.Await.get_asyncAw(), FocusWheel.Input._editing);
            SudoNsb.Text.selectRange(FocusWheel.Input._editing, text.length, text.length);
            FocusWheel.Input._editing.focus();
        }, 5);
    },
    
    _endWereEdit: function FocusWheel_Input$_endWereEdit(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        FocusWheel.Input.data.were = FocusWheel.Input._editing.val().trim();
        var p = FocusWheel.Input._editing.offset();
        FocusWheel.Input._editing.parent().remove();
        FocusWheel.Input._editing = null;
        if (Snsb.isEmpty(FocusWheel.Input.data.were)) {
            this.editWere();
        }
        else {
            if (FocusWheel.Input._were != null) {
                FocusWheel.Input._were.remove();
            }
            FocusWheel.Input._were = $("<div class='WereBox'><div class='WereBoxInner'>" + FocusWheel.Input.data.were + '</div></div>').css({ top: p.top, left: p.left }).appendTo(document.body).click(ss.Delegate.create(this, this.editWere));
            FocusWheel.Input._were.css(SudoNsb.Text.fitPx(FocusWheel.Input._were, 1.25));
            var pm = SudoNsb.Text.pxPerEm(FocusWheel.Input._were);
            FocusWheel.Input._were.find('div').css({ width: FocusWheel.Input._were.width() / pm + 'em', height: FocusWheel.Input._were.height() / pm + 'em' });
        }
        Snsb.cancelEvent(e);
    },
    
    editCenter: function FocusWheel_Input$editCenter() {
        SudoNsb.ToolTips.clearTips();
        FocusWheel.Input.unYatta();
        if (FocusWheel.Input._editing != null && FocusWheel.Input._editing.length > 0) {
            FocusWheel.Input._editing.parent().remove();
        }
        var text = FocusWheel.Input.data.yatta || '';
        var outer = $("<div id='InputOuter'><textarea class='Input'></textarea></div>").appendTo('#FwOuter');
        FocusWheel.Input._editing = $('.Input', outer).attr('placeholder', this._prompts['yatta']).val(text).keydown(ss.Delegate.create(this, this._onCenterKey)).blur(ss.Delegate.create(this, this._endCenterEdit));
        outer.position({ of: '#FwOuter' });
        Snsb.defer(function() {
            SudoNsb.Dom.scrollInViewAw(SudoNsb.Await.get_asyncAw(), FocusWheel.Input._editing);
            SudoNsb.Text.selectRange(FocusWheel.Input._editing, text.length, text.length);
            FocusWheel.Input._editing.focus();
        }, 5);
    },
    
    _endCenterEdit: function FocusWheel_Input$_endCenterEdit(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        FocusWheel.Input.data.yatta = FocusWheel.Input._editing.val().trim();
        FocusWheel.Input._editing.parent().remove();
        FocusWheel.Input._editing = null;
        this._fw.drawCenter(FocusWheel.Input.data.yatta);
        Snsb.cancelEvent(e);
    },
    
    segCenter: function FocusWheel_Input$segCenter(elToPlace, seg, rad) {
        /// <param name="elToPlace" type="jQueryObject">
        /// </param>
        /// <param name="seg" type="Number" integer="true">
        /// </param>
        /// <param name="rad" type="Number">
        /// </param>
        /// <returns type="Array"></returns>
        var xy = this._fw.degToXy(this._fw.segmentToDeg(seg), rad);
        xy[0] = xy[0] + parseInt(this._fw.cx) - (elToPlace.outerWidth(true) / 2);
        xy[1] = -xy[1] + parseInt(this._fw.cy) - (elToPlace.outerHeight(true) / 2);
        return xy;
    },
    
    _onWereKey: function FocusWheel_Input$_onWereKey(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        if ((e.which === 13 && !e.shiftKey) || e.which === 9) {
            this._endWereEdit(e);
            if (Snsb.isEmpty(FocusWheel.Input.data.were)) {
                this.editWere();
            }
            else {
                this.editCenter();
            }
        }
        else if (e.which === 27) {
            FocusWheel.Input._editing.parent().remove();
            FocusWheel.Input._editing = null;
            Snsb.cancelEvent(e);
        }
    },
    
    _onCenterKey: function FocusWheel_Input$_onCenterKey(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        if ((e.which === 13 && !e.shiftKey) || e.which === 9) {
            this._endCenterEdit(e);
            if (Snsb.isEmpty(FocusWheel.Input.data.yatta)) {
                this.editCenter();
            }
            else {
                this._fw.slices[0].edit();
            }
        }
        else if (e.which === 27) {
            FocusWheel.Input._editing.parent().remove();
            FocusWheel.Input._editing = null;
            Snsb.cancelEvent(e);
        }
    },
    
    _onSliceKey: function FocusWheel_Input$_onSliceKey(e) {
        /// <param name="e" type="jQueryEvent">
        /// </param>
        if ((e.which === 13 && !e.shiftKey) || e.which === 9) {
            this._endEdit(e);
        }
        else if (e.which === 27) {
            FocusWheel.Input._editing.parent().remove();
            FocusWheel.Input._editing = null;
            this._fw.eraseCursor();
            Snsb.cancelEvent(e);
        }
    }
}


////////////////////////////////////////////////////////////////////////////////
// FocusWheel.Main

FocusWheel.Main = function FocusWheel_Main() {
}


SudoNsb.AnimateRotate.registerClass('SudoNsb.AnimateRotate');
SudoNsb.ArcText.registerClass('SudoNsb.ArcText');
SudoNsb.Closer.registerClass('SudoNsb.Closer');
SudoNsb.Filters.registerClass('SudoNsb.Filters');
SudoNsb.GridNest.registerClass('SudoNsb.GridNest');
SudoNsb.JQueryEasing.registerClass('SudoNsb.JQueryEasing');
SudoNsb.Text.registerClass('SudoNsb.Text');
Jarvis.Bucket.registerClass('Jarvis.Bucket');
Jarvis.BucketItem.registerClass('Jarvis.BucketItem');
Jarvis.Clipboard.registerClass('Jarvis.Clipboard', Jarvis.Bucket);
Jarvis.ClipItem.registerClass('Jarvis.ClipItem');
NsbMath.Trig.registerClass('NsbMath.Trig');
FocusWheel.AppStyle.registerClass('FocusWheel.AppStyle');
FocusWheel.FwData.registerClass('FocusWheel.FwData');
FocusWheel.HeartBalloons.registerClass('FocusWheel.HeartBalloons');
FocusWheel.My.registerClass('FocusWheel.My');
FocusWheel.MyData.registerClass('FocusWheel.MyData');
FocusWheel.Stats.registerClass('FocusWheel.Stats');
FocusWheel.Fw.registerClass('FocusWheel.Fw');
FocusWheel.Canvas.registerClass('FocusWheel.Canvas');
FocusWheel.Cpt.registerClass('FocusWheel.Cpt');
FocusWheel.Ctx.registerClass('FocusWheel.Ctx');
FocusWheel.Grd.registerClass('FocusWheel.Grd');
FocusWheel.Input.registerClass('FocusWheel.Input');
FocusWheel.Main.registerClass('FocusWheel.Main');
SudoNsb.AnimateRotate._jsLoaded = false;
(function () {
    Snsb.defer(function() {
        eval("(function(e,t){function n(t,n,r,i){var s=t.text().split(n),o=\"\",u;if(s.length){e(s).each(function(e,t){u=\"\";if(t===\" \"){u=\" empty\";t=\"&nbsp;\"}o+='<span class=\"'+r+(e+1)+u+'\">'+t+\"</span>\"+i});t.empty().append(o)}}e.fn.fitText=function(t,n){var r={minFontSize:Number.NEGATIVE_INFINITY,maxFontSize:Number.POSITIVE_INFINITY};return this.each(function(){var i=e(this);var s=t||1;if(n){e.extend(r,n)}var o=function(){i.css(\"font-size\",Math.max(Math.min(i.width()/(s*10),parseFloat(r.maxFontSize)),parseFloat(r.minFontSize)))};o();e(window).resize(o)})};var r={init:function(){return this.each(function(){n(e(this),\"\",\"char\",\"\")})},words:function(){return this.each(function(){n(e(this),\" \",\"word\",\" \")})},lines:function(){return this.each(function(){var t=\"eefec303079ad17405c889e092e105b0\";n(e(this).children(\"br\").replaceWith(t).end(),t,\"line\",\"\")})}};e.fn.lettering=function(t){if(t&&r[t]){return r[t].apply(this,[].slice.call(arguments,1))}else if(t===\"letters\"||!t){return r.init.apply(this,[].slice.call(arguments,0))}e.error(\"Method \"+t+\" does not exist on jQuery.lettering\");return this};e.Arctext=function(t,n){this.$el=e(n);this._init(t)};e.Arctext.defaults={radius:0,dir:1,rotate:true,fitText:false};e.Arctext.prototype={_init:function(t){this.options=e.extend(true,{},e.Arctext.defaults,t);this._applyLettering();this.$el.data(\"arctext\",true);this._calc();this._rotateWord();this._loadEvents()},_applyLettering:function(){this.$el.lettering();if(this.options.fitText)this.$el.fitText();this.$letters=this.$el.find(\"span\").css(\"display\",\"inline-block\")},_calc:function(){if(this.options.radius===-1)return false;this._calcBase();this._calcLetters()},_calcBase:function(){this.dtWord=0;var t=this;this.$letters.each(function(n){var r=e(this),i=r.outerWidth(true);t.dtWord+=i;r.data(\"center\",t.dtWord-i/2)});var n=this.dtWord/2;if(this.options.radius<n)this.options.radius=n;this.dtArcBase=this.dtWord;var r=2*Math.asin(this.dtArcBase/(2*this.options.radius));this.dtArc=this.options.radius*r},_calcLetters:function(){var t=this,n=0;this.$letters.each(function(r){var i=e(this),s=i.outerWidth(true)/t.dtWord*t.dtArc,o=s/t.options.radius,u=t.options.radius*Math.cos(o/2),a=Math.acos((t.dtWord/2-n)/t.options.radius),f=a+o/2,l=Math.cos(f)*u,c=Math.sin(f)*u,h=n+Math.abs(t.dtWord/2-l-n),p=0|h-i.data(\"center\"),d=0|t.options.radius-c,v=t.options.rotate?0|-Math.asin(l/t.options.radius)*(180/Math.PI):0;n=2*h-n;i.data({x:p,y:t.options.dir===1?d:-d,a:t.options.dir===1?v:-v})})},_rotateWord:function(t){if(!this.$el.data(\"arctext\"))return false;var n=this;this.$letters.each(function(r){var i=e(this),s=n.options.radius===-1?\"none\":\"translateX(\"+i.data(\"x\")+\"px) translateY(\"+i.data(\"y\")+\"px) rotate(\"+i.data(\"a\")+\"deg)\",o=t?\"all \"+(t.speed||0)+\"ms \"+(t.easing||\"linear\"):\"none\";i.css({\"-webkit-transition\":o,\"-moz-transition\":o,\"-o-transition\":o,\"-ms-transition\":o,transition:o}).css({\"-webkit-transform\":s,\"-moz-transform\":s,\"-o-transform\":s,\"-ms-transform\":s,transform:s})})},_loadEvents:function(){if(this.options.fitText){var t=this;e(window).on(\"resize.arctext\",function(){t._calc();t._rotateWord()})}},set:function(e){if(!e.radius&&!e.dir&&e.rotate===\"undefined\"){return false}this.options.radius=e.radius||this.options.radius;this.options.dir=e.dir||this.options.dir;if(e.rotate!==t){this.options.rotate=e.rotate}this._calc();this._rotateWord(e.animation)},destroy:function(){this.options.radius=-1;this._rotateWord();this.$letters.removeData(\"x y a center\");this.$el.removeData(\"arctext\");e(window).off(\".arctext\")}};var i=function(e){if(this.console){console.error(e)}};e.fn.arctext=function(t){if(typeof t===\"string\"){var n=Array.prototype.slice.call(arguments,1);this.each(function(){var r=e.data(this,\"arctext\");if(!r){i(\"cannot call methods on arctext prior to initialization; \"+\"attempted to call method '\"+t+\"'\");return}if(!e.isFunction(r[t])||t.charAt(0)===\"_\"){i(\"no such method '\"+t+\"' for arctext instance\");return}r[t].apply(r,n)})}else{this.each(function(){var n=e.data(this,\"arctext\");if(!n){e.data(this,\"arctext\",new e.Arctext(t,this))}})}return this}})(jQuery)");
    });
})();
(function () {
    $(function() {
        MyCss.addStyleOnce((SudoNsb.Closer).get_fullName(), "\r\na.ClosableLink, a.ClosableLink:active, a.ClosableLink:visited, a.CloseableLink:hover {\r\n    position: absolute;\r\n    width: 24px;\r\n    height: 24px;\r\n    font-family: arial;\r\n    font-size: 23px;\r\n    line-height: 23px;\r\n    font-weight: bold;\r\n    cursor: pointer;\r\n    top: -13px;\r\n    right: -13px;\r\n    color: black;\r\n    opacity: .75;\r\n    background: #FFF;\r\n    border: 3px solid #9B9B9B;\r\n    border-radius: 24px;\r\n    text-align: center;\r\n    text-shadow: 0px 0px 4px #000;\r\n}\r\na.ClosableLink:hover {\r\n    opacity: 1;\r\n}\r\na.nsbTip:before {\r\n    content: '';\r\n    position: absolute;\r\n    width: 0;\r\n    height: 0;\r\n    border-top: 20px solid #000;\r\n    border-left: 20px solid transparent;\r\n    border-right: 20px solid transparent;\r\n    opacity: 0;\r\n    left: -30%;\r\n    bottom: 130%;\r\n}\r\na.nsbTip:after {\r\n    content: attr(data-tooltip);\r\n    position: absolute;\r\n    bottom: 160%;\r\n    left: -56%;\r\n    color: #FFF;\r\n    background: #000;\r\n    padding: 2px 10px;\r\n    -webkit-border-radius: 10px;\r\n    -moz-border-radius: 10px;\r\n    border-radius: 10px;\r\n    white-space: nowrap;\r\n    opacity: 0;\r\n    font-size: 14px;\r\n    font-family: sans-serif, arial;\r\n    text-shadow: none;\r\n}\r\na.nsbTip:hover:after, a:hover:before {\r\n    opacity: 1;\r\n}\r\n");
    });
})();
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
Jarvis.Bucket.nestSpeed = 20;
Jarvis.Bucket.waitToLeavePage = 0;
Jarvis.Bucket.bucketLoadedEv = 'BucketLoadedEv.Bucket';
Jarvis.Bucket.firstLoad = 'first-load';
Jarvis.Bucket.afterRemoteLoad = 'after-remote-load';
Jarvis.Clipboard.ClipboardImg = "\r\n<svg width='100%' height='100%' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Layer_1' width='100' height='100' viewBox='0 0 100 100' overflow='visible' enable-background='new 0 0 100 100' xml:space='preserve' xmlns:xml='http://www.w3.org/XML/1998/namespace'>\r\n<g>\r\n\t<g>\r\n\t\t<linearGradient id='XMLID_5_' gradientUnits='userSpaceOnUse' x1='50' y1='14.1362' x2='50' y2='93.2161'>\r\n\t\t\t<stop offset='0' style='stop-color:#FDF58D'/>\r\n\t\t\t<stop offset='0.0662' style='stop-color:#F9DE75'/>\r\n\t\t\t<stop offset='0.1482' style='stop-color:#F5C85F'/>\r\n\t\t\t<stop offset='0.2451' style='stop-color:#F2B84E'/>\r\n\t\t\t<stop offset='0.365' style='stop-color:#F0AC43'/>\r\n\t\t\t<stop offset='0.5331' style='stop-color:#EEA63C'/>\r\n\t\t\t<stop offset='1' style='stop-color:#EEA43A'/>\r\n\t\t</linearGradient>\r\n\t\t<path fill='url(#XMLID_5_)' d='M21.546,15.589c-3.066,0-5.56,2.494-5.56,5.56V89.73c0,3.066,2.494,5.562,5.56,5.562h56.907    c3.066,0,5.56-2.495,5.56-5.562V21.149c0-3.066-2.494-5.56-5.56-5.56H21.546z'/>\r\n\t\t<path fill='#C07B5D' d='M78.453,14.872H21.546c-3.462,0-6.278,2.816-6.278,6.278V89.73c0,3.463,2.816,6.279,6.278,6.279h56.907    c3.462,0,6.278-2.816,6.278-6.279V21.15C84.731,17.688,81.915,14.872,78.453,14.872L78.453,14.872z M16.703,21.15    c0-2.675,2.168-4.843,4.843-4.843h56.907c2.675,0,4.843,2.168,4.843,4.843V89.73l0,0l0,0c0,2.676-2.168,4.845-4.843,4.845H21.546    c-2.675,0-4.843-2.169-4.843-4.845V21.15L16.703,21.15L16.703,21.15z'/>\r\n\t</g>\r\n\t<g opacity='0.31'>\r\n\t\t<path fill='#FFFFFF' d='M79.883,18.569c1.187,0,2.276,0.372,3.142,0.991c-0.658-1.893-2.454-3.254-4.571-3.254H21.546    c-2.117,0-3.912,1.361-4.57,3.254c0.865-0.619,1.954-0.991,3.141-0.991H79.883z'/>\r\n\t</g>\r\n\t<g opacity='0.1'>\r\n\t\t<path fill='#5A3D1C' d='M20.117,92.066c-1.187,0-2.275-0.372-3.141-0.991c0.658,1.893,2.453,3.254,4.57,3.254h56.907    c2.117,0,3.913-1.361,4.571-3.254c-0.865,0.619-1.955,0.991-3.142,0.991H20.117z'/>\r\n\t</g>\r\n\t<g opacity='0.2'>\r\n\t\t\r\n\t\t\t<image width='121' height='80' xlink:href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAABQCAYAAAA9Wdq3AAAACXBIWXMAAAsSAAALEgHS3X78AAAA BGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAItSURB VHja7JrNTsJQEEbbWiQoxogLjbrxNXkAntQYWYiICBEoOMXvJteGfaftOckXbFdjD3P/SpZA68l4 BEgGJAOSAcmAZEAyIBmQjGRAMiAZkAxIBiQDkgHJSAYkA5IByYBkQDIgGZCMZEAyIBmQDB7IvRU0 mUzSpj/U8Xh88FRP6kxuGtXVRNkH5fi3F9mpo87NTiRpiOwgc38itXe2l+E6Uy29KHlDRMeCd5Zt lF0Q3dlOVhcHwX3LheVS6UeivUsOgn8s38pK10fRdXZz7uBLlqlzS8Ejy60+ryT6zPEcHebgQkK/ LDPLe2X4jufq7nRytNAKgku5D5YnfY50v+d8q7fX0LyS4FfLiz7fdX9b50LMYyeXgp8t9+rmc8dD dhiqN+riN90vxc4ti6j2zg/XYU4eWm4sd5ZHy7Xue5dcDtWfup7r/3CzpvCyuk4195ZdO9DCa3hi XvYouVDdheoe6NpNzRxrdoDcWUeUc9taW5ClumHTkOF6qbrXqrmocx72JLm6xywf1IdlKqmLhi28 pqp/Ge+R65btRXJ1C5JoIdPULdQs2jrVLrnuE69MQ3JYWbfpMGQWdXRhe+Q9nfz3zU+i7UgbjjXp ZHVzvFdu5QsK3kL9f0Chq1v1qtHDIYQL+NFAByRXZDcabz//gQ7AsSaSAcmAZEAyIBmQDEgGJCMZ kAxIBiQDkgHJgGRAMpIByYBkQDIgGZAMSAYkI5lHgGRAMiAZXPArwAAbUMrNfUFAJgAAAABJRU5E rkJggg==' transform='matrix(1 0 0 1 -9.958 -15.8721)'>\r\n\t\t</image>\r\n\t</g>\r\n\t<g>\r\n\t\t<g>\r\n\t\t\t<rect x='22.561' y='22.079' fill='#73A2D7' width='54.878' height='66.299'/>\r\n\t\t\t<linearGradient id='XMLID_6_' gradientUnits='userSpaceOnUse' x1='88.3516' y1='102.9043' x2='26.8348' y2='26.4303'>\r\n\t\t\t\t<stop offset='0' style='stop-color:#ADD7F3'/>\r\n\t\t\t\t<stop offset='1' style='stop-color:#FFFFFF'/>\r\n\t\t\t</linearGradient>\r\n\t\t\t<path fill='url(#XMLID_6_)' d='M24.061,23.579c0,2.796,0,60.503,0,63.299c2.759,0,49.12,0,51.878,0c0-2.796,0-60.503,0-63.299     C73.181,23.579,26.82,23.579,24.061,23.579z'/>\r\n\t\t</g>\r\n\t\t<polygon fill='#C3D9F1' points='75.939,75.488 64.886,86.878 75.927,86.905   '/>\r\n\t\t<linearGradient id='XMLID_7_' gradientUnits='userSpaceOnUse' x1='69.7881' y1='79.8711' x2='64.2052' y2='74.7052'>\r\n\t\t\t<stop offset='0' style='stop-color:#8CB6CD'/>\r\n\t\t\t<stop offset='0.3524' style='stop-color:#B7DCF4'/>\r\n\t\t\t<stop offset='1' style='stop-color:#E5F2FB'/>\r\n\t\t</linearGradient>\r\n\t\t<polygon fill='url(#XMLID_7_)' points='64.058,74.132 75.728,73.605 74.886,75.604 64.11,86.38 63.953,83.752   '/>\r\n\t\t<path fill='#73A2D7' d='M77.439,73.942v-3.125h-1.5c-0.174,1.986-2.305,2.421-2.564,2.466c-0.135,0-10.292,0-10.292,0v10.805    c-0.001,0.265-0.079,2.402-2.334,2.726v1.564h2.683L77.439,73.942z M64.583,84.089v-9.306c1.274,0,8.915,0,8.915,0l0.055-0.008    c0.401-0.06,0.91-0.203,1.426-0.449L64.424,85.201C64.576,84.616,64.583,84.164,64.583,84.089z'/>\r\n\t</g>\r\n\t<g>\r\n\t\t<linearGradient id='XMLID_8_' gradientUnits='userSpaceOnUse' x1='42.248' y1='8.313' x2='54.025' y2='25.3589'>\r\n\t\t\t<stop offset='0' style='stop-color:#E6E6E6'/>\r\n\t\t\t<stop offset='1' style='stop-color:#979797'/>\r\n\t\t</linearGradient>\r\n\t\t<path fill='url(#XMLID_8_)' d='M39.861,11.803c-0.782,0-6.611,0-6.611,0c-2.146,0-3.893,1.747-3.893,3.894v8.885h41.287v-8.885    c0-2.147-1.746-3.894-3.892-3.894c0,0-5.696,0-6.476,0c-1.331-4.148-5.435-7.017-10.208-7.017    C45.294,4.787,41.19,7.655,39.861,11.803z M48.113,12.558c0-1.031,0.839-1.87,1.871-1.87c1.031,0,1.87,0.839,1.87,1.87    c0,1.032-0.839,1.871-1.87,1.871C48.952,14.428,48.113,13.589,48.113,12.558z'/>\r\n\t\t<path fill='#868686' d='M50.067,4.149c-2.576,0-5.002,0.776-7.017,2.245c-1.695,1.236-2.975,2.905-3.676,4.772h-6.125    c-2.499,0-4.531,2.033-4.531,4.532v8.247v1.276h1.276h40.011h1.276v-1.276v-8.247c0-2.499-2.032-4.532-4.53-4.532h-5.989    c-0.702-1.867-1.982-3.537-3.678-4.772C55.07,4.925,52.643,4.149,50.067,4.149L50.067,4.149z M29.994,15.698    c0-1.798,1.457-3.256,3.255-3.256h7.057c1.049-4.023,5.02-7.017,9.761-7.017c4.742,0,8.712,2.994,9.763,7.017h6.921    c1.797,0,3.254,1.458,3.254,3.256v8.247l0,0l0,0H29.994V15.698L29.994,15.698L29.994,15.698z M49.983,10.05    c-1.385,0-2.508,1.123-2.508,2.508c0,1.386,1.123,2.509,2.508,2.509c1.385,0,2.508-1.123,2.508-2.509    C52.491,11.173,51.368,10.05,49.983,10.05L49.983,10.05z M49.983,13.791c-0.679,0-1.232-0.553-1.232-1.233    c0-0.679,0.553-1.232,1.232-1.232c0.679,0,1.232,0.553,1.232,1.232C51.215,13.238,50.662,13.791,49.983,13.791L49.983,13.791z'/>\r\n\t</g>\r\n\t<g opacity='0.5'>\r\n\t\t<path fill='#FFFFFF' d='M66.751,12.441h-6.921c-1.051-4.023-5.021-7.017-9.763-7.017s-8.712,2.993-9.762,7.017H33.25    c-1.798,0-3.255,1.458-3.255,3.256v0.321c0.414-1.332,1.67-2.301,3.156-2.301h7.157c1.065-4.023,5.092-7.017,9.902-7.017    c4.808,0,8.834,2.993,9.9,7.017h7.02c1.221,0,2.285,0.656,2.855,1.629C69.812,13.714,68.429,12.441,66.751,12.441z'/>\r\n\t</g>\r\n</g>\r\n</svg>\r\n";
Jarvis.Clipboard.instance = null;
Jarvis.Clipboard.clipboardEl = null;
Jarvis.Clipboard.thumbnailEl = null;
FocusWheel.AppStyle.themeNameKey = '@FwThemeName';
FocusWheel.AppStyle.themes = { green: { name: 'green', title: 'Limeaid', background: 'green' }, yellow: { name: 'yellow', title: 'Citris Slice', background: '#FC0' }, white: { name: 'white', title: 'Black & White', background: '#CCC' }, metro: { name: 'metro', title: 'Metro Purple', background: '#8995D3' }, frankieblue: { name: 'frankieblue', title: 'Frankie Blue', background: '#1997FB' }, sunburst: { name: 'sunburst', title: 'Sunburst', background: '#ea5507' } };
FocusWheel.HeartBalloons.ballonsEl = null;
FocusWheel.My.kyLoadFwPage = 'LoadFwPage';
FocusWheel.My.kyNewFwPage = 'NewFwPage';
FocusWheel.My.kyStartFw = 'StartFw';
FocusWheel.My.kyCompleteFw = 'CompleteFw';
FocusWheel.My.kyEraseFw = 'EraseFw';
FocusWheel.My.kyDevNote = 'DevNote';
FocusWheel.My.changeFile = '../js/FocusWheel.js';
FocusWheel.My.lastFileTimeKey = 'FwLastFileTime';
(function () {
    SudoNsb.Storage.defaultLocal('@Testing', false);
    Snsb.defer(function() {
        MyCss.addStyleOnce((FocusWheel.My).get_fullName(), "\r\n#MyPopNote {\r\n    position: fixed;\r\n    top: 50px;\r\n    left: 300px;\r\n    width: 300px;\r\n    height: 200px;\r\n    border: 1px solid #999;\r\n    z-index: 9999;\r\n}\r\n#MyPopNote textarea {\r\n    padding: 2px 5px;\r\n    width: 290px;\r\n    height: 196px;\r\n    margin: 0;\r\n    font-family: 'Courier New';\r\n    font-size: 12pt;\r\n    background-color: #FFD;\r\n    border: none;\r\n}\r\n");
        $(document.body).on('keydown', function(e) {
            if (e.which === 78 && (e.ctrlKey || e.metaKey)) {
                FocusWheel.My._popNote(e);
            }
        });
    });
})();
FocusWheel.Fw.clickHere = 'click here to start';
FocusWheel.Fw.instance = null;
FocusWheel.Fw.pad = 8;
FocusWheel.Fw.innerRadius = 80;
FocusWheel.Fw.radius = 700 / 2 - 8;
FocusWheel.Fw.segs = 12;
FocusWheel.Fw.yattaDuration = 136000;
FocusWheel.Fw.fwTopic = '/Pnx/Item/FocusWheel';
FocusWheel.Input._editing = null;
FocusWheel.Input.data = null;
FocusWheel.Input._were = null;
FocusWheel.Input._wereMetrics = null;
(function () {
    $(function() {
        Config.appPath = '/nsb/base/App';
        Config.imgPath2 = '/nsb/base/images';
        FocusWheel.My.ping('LoadFwPage');
        PnxBaseMain.load();
        var fw = $('#FocusWheel');
        fw.wrap("<div id='FwOuter'/>");
        $('#FwOuter').wrap("<div id='FwCenter'/>");
        new FocusWheel.Fw(fw);
        PnxSite.installUserEvents();
        Snsb.defer(function() {
            SqlThings.registerLoginErrEvent(SqlThings.rawLocalTransactEw);
        });
    });
})();
})(jQuery);

//! This script was generated using Script# v0.7.4.0
