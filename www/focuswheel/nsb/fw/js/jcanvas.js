﻿/*
jCanvas v14.01.22
Copyright 2014 Caleb Evans
Released under the MIT license
*/
(function (f, ta, ua, Ta, ea, ja, na, w, z, g, r) {
    function J(d) { var c; if (O.future.inheritance) for (c in d) d.hasOwnProperty(c) && (this[c] = d[c]); else Z(this, d) } function O(d) { var c; if (d) Z($, d); else for (c in $) $.hasOwnProperty(c) && delete $[c]; na && na.warn && !va.jCanvas && (va.jCanvas = w, na.warn("The jCanvas() method has been deprecated and will be removed in a future release.")); return this } function wa() { } function ka(d) { return "string" === aa(d) } function K(d) { return d && d.getContext ? d.getContext("2d") : g } function la(d) {
        d = Z({},
d); d.masks = d.masks.slice(0); return d
    } function fa(d, c) { var a; d.save(); a = la(c.transforms); c.savedTransforms.push(a) } function xa(d, c, a, b) { a[b] && (ca(a[b]) ? c[b] = a[b].call(d, a) : c[b] = a[b]) } function T(d, c, a) {
        xa(d, c, a, "fillStyle"); xa(d, c, a, "strokeStyle"); c.lineWidth = a.strokeWidth; a.rounded ? c.lineCap = c.lineJoin = "round" : (c.lineCap = a.strokeCap, c.lineJoin = a.strokeJoin, c.miterLimit = a.miterLimit); c.shadowOffsetX = a.shadowX; c.shadowOffsetY = a.shadowY; c.shadowBlur = a.shadowBlur; c.shadowColor = a.shadowColor; c.globalAlpha =
a.opacity; c.globalCompositeOperation = a.compositing; a.imageSmoothing && (c.webkitImageSmoothingEnabled = c.mozImageSmoothingEnabled = a.imageSmoothing)
    } function ya(d, c, a) { a.mask && (a.autosave && fa(d, c), d.clip(), c.transforms.masks.push(a._args)) } function X(d, c, a) {
        a.closed && c.closePath(); a.shadowStroke && 0 !== a.strokeWidth ? (c.stroke(), c.fill(), c.shadowColor = "transparent", c.shadowBlur = 0, c.stroke()) : (c.fill(), "transparent" !== a.fillStyle && (c.shadowColor = "transparent"), 0 !== a.strokeWidth && c.stroke()); a.closed || c.closePath();
        a._transformed && c.restore(); a.mask && (d = D(d), ya(c, d, a))
    } function za(d, c, a) { c._toRad = c.inDegrees ? H / 180 : 1; d.translate(c.x, c.y); d.rotate(c.rotate * c._toRad); d.translate(-c.x, -c.y); a && (a.rotate += c.rotate * c._toRad) } function Aa(d, c, a) { 1 !== c.scale && (c.scaleX = c.scaleY = c.scale); d.translate(c.x, c.y); d.scale(c.scaleX, c.scaleY); d.translate(-c.x, -c.y); a && (a.scaleX *= c.scaleX, a.scaleY *= c.scaleY) } function Ba(d, c, a) {
        c.translate && (c.translateX = c.translateY = c.translate); d.translate(c.translateX, c.translateY); a && (a.translateX +=
c.translateX, a.translateY += c.translateY)
    } function S(d, c, a, b, e) { a._toRad = a.inDegrees ? H / 180 : 1; a._transformed = w; c.save(); a.fromCenter || a._centered || b === r || (e === r && (e = b), a.x += b / 2, a.y += e / 2, a._centered = w); a.rotate && za(c, a, g); 1 === a.scale && 1 === a.scaleX && 1 === a.scaleY || Aa(c, a, g); (a.translate || a.translateX || a.translateY) && Ba(c, a, g) } function D(d) {
        var c = ba.dataCache, a; c._canvas === d && c._data ? a = c._data : (a = f.data(d, "jCanvas"), a || (a = { canvas: d, layers: [], layer: { names: {}, groups: {} }, eventHooks: {}, intersecting: [], lastIntersected: g,
            cursor: f(d).css("cursorColor"), drag: { layer: g, dragging: z }, event: { type: g, x: g, y: g }, events: {}, transforms: la(oa), savedTransforms: [], animating: z, animated: g, pixelRatio: 1, scaled: z
        }, f.data(d, "jCanvas", a)), c._canvas = d, c._data = a); return a
    } function Ca(d, c, a) { for (var b in O.events) O.events.hasOwnProperty(b) && (a[b] || a.cursors && a.cursors[b]) && Da(d, c, a, b) } function Da(d, c, a, b) { window.ontouchstart !== r && Y.touchEvents[b] && (b = Y.touchEvents[b]); O.events[b](d, c); a._event = w } function Ea(d, c, a) {
        var b, e, h; if (a.draggable || a.cursors) {
            b =
["mousedown", "mousemove", "mouseup"]; for (h = 0; h < b.length; h += 1) e = b[h], Da(d, c, a, e); c.events.mouseoutdrag || (d.bind("mouseout.jCanvas", function () { var a = c.drag.layer; a && (c.drag = {}, Q(d, c, a, "dragcancel"), d.drawLayers()) }), c.events.mouseoutdrag = w); a._event = w
        } 
    } function pa(d, c, a, b) { d = c.layer.names; b ? b.name !== r && ka(a.name) && a.name !== b.name && delete d[a.name] : b = a; ka(b.name) && (d[b.name] = a) } function qa(d, c, a, b) {
        d = c.layer.groups; var e, h, k, f; if (!b) b = a; else if (b.groups !== r && a.groups !== g) for (h = 0; h < a.groups.length; h +=
1) if (e = a.groups[h], c = d[e]) { for (f = 0; f < c.length; f += 1) if (c[f] === a) { k = f; c.splice(f, 1); break } 0 === c.length && delete d[e] } if (b.groups !== r && b.groups !== g) for (h = 0; h < b.groups.length; h += 1) e = b.groups[h], c = d[e], c || (c = d[e] = [], c.name = e), k === r && (k = c.length), c.splice(k, 0, a)
    } function ra(d, c, a, b, e) { b[a] && c._running && !c._running[a] && (c._running[a] = w, b[a].call(d[0], c, e), c._running[a] = z) } function Q(d, c, a, b, e) {
        if (!a.disableEvents) {
            if ("mouseout" !== b) {
                var h; a.cursors && (h = a.cursors[b]); -1 !== f.inArray(h, V.cursors) && (h = V.prefix +
h); h && d.css({ cursor: h })
            } ra(d, a, b, a, e); ra(d, a, b, c.eventHooks, e); ra(d, a, b, O.eventHooks, e)
        } 
    } function P(d, c, a, b) {
        var e = c._layer ? a : c; c._args = a; c.canvas = d; if (c.draggable || c.dragGroups) c.layer = w, c.draggable = w; c._method = b ? b : c.method ? f.fn[c.method] : c.type ? f.fn[Y.drawings[c.type]] : function () { }; c.layer && !c._layer && (a = f(d), d = D(d), b = d.layers, e.name === g || ka(e.name) && d.layer.names[e.name] === r) && (e = new J(c), e.layer = w, e._layer = w, e._running = {}, e.data = e.data !== g ? Z({}, e.data) : {}, e.groups = e.groups !== g ? e.groups.slice(0) :
[], pa(a, d, e), qa(a, d, e), Ca(a, d, e), Ea(a, d, e), c._event = e._event, e._method === f.fn.drawText && a.measureText(e), e.index === g && (e.index = b.length), b.splice(e.index, 0, e), c._args = e, Q(a, d, e, "add")); return e
    } function Fa(d, c) { var a, b; for (b = 0; b < V.props.length; b += 1) a = V.props[b], d[a] !== r && (d["_" + a] = d[a], V.propsObj[a] = w, c && delete d[a]) } function Ua(d, c, a) {
        var b, e, h, k; for (b in a) if (a.hasOwnProperty(b) && (e = a[b], ca(e) && (a[b] = e.call(d, c, b)), "object" === aa(e))) {
            for (h in e) e.hasOwnProperty(h) && (k = e[h], c[b] !== r && (c[b + "." + h] =
c[b][h], a[b + "." + h] = k)); delete a[b]
        } return a
    } function Ga(d) { var c, a, b = [], e = 1; d.match(/^([a-z]+|#[0-9a-f]+)$/gi) && ("transparent" === d && (d = "rgba(0,0,0,0)"), a = ta.head, c = a.style.color, a.style.color = d, d = f.css(a, "color"), a.style.color = c); d.match(/^rgb/gi) && (b = d.match(/(\d+(\.\d+)?)/gi), d.match(/%/gi) && (e = 2.55), b[0] *= e, b[1] *= e, b[2] *= e, b[3] = b[3] !== r ? ja(b[3]) : 1); return b } function Va(d) {
        var c = 3, a; "array" !== aa(d.start) && (d.start = Ga(d.start), d.end = Ga(d.end)); d.now = []; if (1 !== d.start[3] || 1 !== d.end[3]) c = 4; for (a = 0; a <
c; a += 1) d.now[a] = d.start[a] + (d.end[a] - d.start[a]) * d.pos, 3 > a && (d.now[a] = Wa(d.now[a])); 1 !== d.start[3] || 1 !== d.end[3] ? d.now = "rgba(" + d.now.join(",") + ")" : (d.now.slice(0, 3), d.now = "rgb(" + d.now.join(",") + ")"); d.elem.nodeName ? d.elem.style[d.prop] = d.now : d.elem[d.prop] = d.now
    } function Xa(d) {
        O.events[d] = function (c, a) {
            var b, e; e = a.event; b = "mouseover" === d || "mouseout" === d ? "mousemove" : d; a.events[b] || (c.bind(b + ".jCanvas", function (a) { e.x = a.offsetX; e.y = a.offsetY; e.type = b; e.event = a; c.drawLayers({ resetFire: w }); a.preventDefault() }),
a.events[b] = w)
        } 
    } function U(d, c, a) { var b, e, h, k; if (a = a._args) d = D(d), b = d.event, b.x !== g && b.y !== g && (h = b.x * d.pixelRatio, k = b.y * d.pixelRatio, e = c.isPointInPath(h, k) || c.isPointInStroke && c.isPointInStroke(h, k)), c = d.transforms, a.eventX = a.mouseX = b.x, a.eventY = a.mouseY = b.y, a.event = b.event, b = d.transforms.rotate, h = a.eventX, k = a.eventY, 0 !== b ? (a._eventX = h * N(-b) - k * R(-b), a._eventY = k * N(-b) + h * R(-b)) : (a._eventX = h, a._eventY = k), a._eventX /= c.scaleX, a._eventY /= c.scaleY, e && d.intersecting.push(a), a.intersects = e } function Ha(d) {
        for (; 0 >
d; ) d += 2 * H; return d
    } function Ia(d, c, a, b) { var e, h, k, f, B, t, g; a === b ? g = t = 0 : (t = a.x, g = a.y); b.inDegrees || 360 !== b.end || (b.end = 2 * H); b.start *= a._toRad; b.end *= a._toRad; b.start -= H / 2; b.end -= H / 2; B = H / 180 * 1; b.ccw && (B *= -1); e = b.x + b.radius * N(b.start + B); h = b.y + b.radius * R(b.start + B); k = b.x + b.radius * N(b.start); f = b.y + b.radius * R(b.start); ga(d, c, a, b, e, h, k, f); c.arc(b.x + t, b.y + g, b.radius, b.start, b.end, b.ccw); e = b.x + b.radius * N(b.end + B); B = b.y + b.radius * R(b.end + B); h = b.x + b.radius * N(b.end); k = b.y + b.radius * R(b.end); ha(d, c, a, b, h, k, e, B) }
    function Ja(d, c, a, b, e, h, k, f) { var B, t; b.arrowRadius && !a.closed && (t = Ya(f - h, k - e), t -= H, d = a.strokeWidth * N(t), B = a.strokeWidth * R(t), a = k + b.arrowRadius * N(t + b.arrowAngle / 2), e = f + b.arrowRadius * R(t + b.arrowAngle / 2), h = k + b.arrowRadius * N(t - b.arrowAngle / 2), b = f + b.arrowRadius * R(t - b.arrowAngle / 2), c.moveTo(a - d, e - B), c.lineTo(k - d, f - B), c.lineTo(h - d, b - B), c.moveTo(k - d, f - B), c.lineTo(k + d, f + B), c.moveTo(k, f)) } function ga(d, c, a, b, e, h, k, f) {
        b._arrowAngleConverted || (b.arrowAngle *= a._toRad, b._arrowAngleConverted = w); b.startArrow && Ja(d,
c, a, b, e, h, k, f)
    } function ha(d, c, a, b, e, h, k, f) { b._arrowAngleConverted || (b.arrowAngle *= a._toRad, b._arrowAngleConverted = w); b.endArrow && Ja(d, c, a, b, e, h, k, f) } function Ka(d, c, a, b) { var e, h, k; e = 2; ga(d, c, a, b, b.x2 + a.x, b.y2 + a.y, b.x1 + a.x, b.y1 + a.y); for (b.x1 !== r && b.y1 !== r && c.moveTo(b.x1 + a.x, b.y1 + a.y); w; ) if (h = b["x" + e], k = b["y" + e], h !== r && k !== r) c.lineTo(h + a.x, k + a.y), e += 1; else break; e -= 1; ha(d, c, a, b, b["x" + (e - 1)] + a.x, b["y" + (e - 1)] + a.y, b["x" + e] + a.x, b["y" + e] + a.y) } function La(d, c, a, b) {
        var e, h, k, f, B; e = 2; ga(d, c, a, b, b.cx1 + a.x,
b.cy1 + a.y, b.x1 + a.x, b.y1 + a.y); for (b.x1 !== r && b.y1 !== r && c.moveTo(b.x1 + a.x, b.y1 + a.y); w; ) if (h = b["x" + e], k = b["y" + e], f = b["cx" + (e - 1)], B = b["cy" + (e - 1)], h !== r && k !== r && f !== r && B !== r) c.quadraticCurveTo(f + a.x, B + a.y, h + a.x, k + a.y), e += 1; else break; e -= 1; ha(d, c, a, b, b["cx" + (e - 1)] + a.x, b["cy" + (e - 1)] + a.y, b["x" + e] + a.x, b["y" + e] + a.y)
    } function Ma(d, c, a, b) {
        var e, h, k, f, B, t, g, F; e = 2; h = 1; ga(d, c, a, b, b.cx1 + a.x, b.cy1 + a.y, a.x1 + a.x, a.y1 + a.y); for (a.x1 !== r && a.y1 !== r && c.moveTo(a.x1 + a.x, a.y1 + a.y); w; ) if (k = b["x" + e], f = b["y" + e], B = b["cx" + h], t = b["cy" +
h], g = b["cx" + (h + 1)], F = b["cy" + (h + 1)], k !== r && f !== r && B !== r && t !== r && g !== r && F !== r) c.bezierCurveTo(B + a.x, t + a.y, g + a.x, F + a.y, k + a.x, f + a.y), e += 1, h += 2; else break; e -= 1; h -= 2; ha(d, c, a, b, b["cx" + (h + 1)] + a.x, b["cy" + (h + 1)] + a.y, b["x" + e] + a.x, b["y" + e] + a.y)
    } function Na(d, c, a) { c *= d._toRad; c -= H / 2; return a * N(c) } function Oa(d, c, a) { c *= d._toRad; c -= H / 2; return a * R(c) } function Pa(d, c, a, b) {
        var e, h, k, f, g, t, E; a === b ? g = f = 0 : (f = a.x, g = a.y); e = 1; h = f = t = b.x + f; k = g = E = b.y + g; ga(d, c, a, b, h + Na(a, b.a1, b.l1), k + Oa(a, b.a1, b.l1), h, k); for (b.x !== r && b.y !==
r && c.moveTo(h, k); w; ) if (h = b["a" + e], k = b["l" + e], h !== r && k !== r) f = t, g = E, t += Na(a, h, k), E += Oa(a, h, k), c.lineTo(t, E), e += 1; else break; ha(d, c, a, b, f, g, t, E)
    } function Qa(d, c) { isNaN(Number(c.fontSize)) || (c.fontSize += "px"); d.font = c.fontStyle + " " + c.fontSize + " " + c.fontFamily } function Ra(d, c, a, b) {
        var e, h; e = ba.propCache; if (e.text === a.text && e.fontStyle === a.fontStyle && e.fontSize === a.fontSize && e.fontFamily === a.fontFamily && e.maxWidth === a.maxWidth && e.lineHeight === a.lineHeight) a.width = e.width, a.height = e.height; else {
            a.width =
c.measureText(b[0]).width; for (h = 1; h < b.length; h += 1) e = c.measureText(b[h]).width, e > a.width && (a.width = e); c = d.style.fontSize; d.style.fontSize = a.fontSize; a.height = ja(f.css(d, "fontSize")) * b.length * a.lineHeight; d.style.fontSize = c
        } 
    } function Sa(d, c) {
        var a = c.maxWidth, b = c.text.split("\n"), e = [], h, k, f, g, t; for (f = 0; f < b.length; f += 1) {
            g = b[f]; t = g.split(" "); h = []; k = ""; if (1 === t.length || d.measureText(g).width < a) h = [g]; else {
                for (g = 0; g < t.length; g += 1) d.measureText(k + t[g]).width > a && ("" !== k && h.push(k), k = ""), k += t[g], g !== t.length -
1 && (k += " "); h.push(k)
            } e = e.concat(h.join("\n").replace(/( (\n))|( $)/gi, "$2").split("\n"))
        } return e
    } var ma, $, Z = f.extend, ia = f.inArray, aa = f.type, ca = f.isFunction, H = ea.PI, Wa = ea.round, R = ea.sin, N = ea.cos, Ya = ea.atan2, sa = Ta.prototype.slice, Za = f.event.fix, Y = {}, ba = { dataCache: {}, propCache: {}, imageCache: {} }, oa = { rotate: 0, scaleX: 1, scaleY: 1, translateX: 0, translateY: 0, masks: [] }, va = { jCanvas: z }, V = {}; f.fn.jCanvas = O; O.events = {}; O.eventHooks = {}; O.future = { inheritance: !1 }; ma = new function () {
        Z(this, { align: "center", arrowAngle: 90,
            arrowRadius: 0, autosave: w, baseline: "middle", bringToFront: z, ccw: z, closed: z, compositing: "source-over", concavity: 0, cornerRadius: 0, count: 1, cropFromCenter: w, cursors: g, disableEvents: z, draggable: z, dragGroups: g, groups: g, data: g, dx: g, dy: g, end: 360, eventX: g, eventY: g, fillStyle: "transparent", fontStyle: "normal", fontSize: "12pt", fontFamily: "sans-serif", fromCenter: w, height: g, imageSmoothing: w, inDegrees: w, index: g, lineHeight: 1, layer: z, mask: z, maxWidth: g, miterLimit: 10, name: g, opacity: 1, r1: g, r2: g, radius: 0, repeat: "repeat",
            respectAlign: z, rotate: 0, rounded: z, scale: 1, scaleX: 1, scaleY: 1, shadowBlur: 0, shadowColor: "transparent", shadowStroke: z, shadowX: 0, shadowY: 0, sHeight: g, sides: 0, source: "", spread: 0, start: 0, strokeCap: "butt", strokeJoin: "miter", strokeStyle: "transparent", strokeWidth: 1, sWidth: g, sx: g, sy: g, text: "", translate: 0, translateX: 0, translateY: 0, type: g, visible: w, width: g, x: 0, y: 0
        })
    }; wa.prototype = ma; $ = new wa; J.prototype = $; O.extend = function (d) {
        d.name && (d.props && Z(ma, d.props), f.fn[d.name] = function a(b) {
            var e, h, k, f; for (h = 0; h < this.length; h +=
1) if (e = this[h], k = K(e)) f = new J(b), P(e, f, b, a), T(e, k, f), d.fn.call(e, k, f); return this
        }, d.type && (Y.drawings[d.type] = d.name)); return f.fn[d.name]
    }; f.fn.getEventHooks = function () { var d; d = {}; 0 !== this.length && (d = this[0], d = D(d), d = d.eventHooks); return d }; f.fn.setEventHooks = function (d) { var c, a; for (c = 0; c < this.length; c += 1) f(this[c]), a = D(this[c]), Z(a.eventHooks, d); return this }; f.fn.getLayers = function (d) {
        var c, a, b, e, h = []; if (0 !== this.length) if (c = this[0], a = D(c), a = a.layers, ca(d)) for (e = 0; e < a.length; e += 1) b = a[e], d.call(c,
b) && h.push(b); else h = a; return h
    }; f.fn.getLayer = function (d) { var c, a, b, e; if (0 !== this.length) if (c = this[0], a = D(c), c = a.layers, e = aa(d), d && d.layer) b = d; else if ("number" === e) 0 > d && (d = c.length + d), b = c[d]; else if ("regexp" === e) for (a = 0; a < c.length; a += 1) { if (ka(c[a].name) && c[a].name.match(d)) { b = c[a]; break } } else b = a.layer.names[d]; return b }; f.fn.getLayerGroup = function (d) {
        var c, a, b, e = aa(d); if (0 !== this.length) if (c = this[0], "array" === e) b = d; else if ("regexp" === e) for (a in c = D(c), c = c.layer.groups, c) { if (a.match(d)) { b = c[a]; break } } else c =
D(c), b = c.layer.groups[d]; return b
    }; f.fn.getLayerIndex = function (d) { var c = this.getLayers(); d = this.getLayer(d); return ia(d, c) }; f.fn.setLayer = function (d, c) {
        var a, b, e, h, k, g, B; for (b = 0; b < this.length; b += 1) if (a = f(this[b]), e = D(this[b]), h = f(this[b]).getLayer(d)) {
            pa(a, e, h, c); qa(a, e, h, c); for (k in c) c.hasOwnProperty(k) && (g = c[k], B = aa(g), "object" === B ? h[k] = Z({}, g) : "array" === B ? h[k] = g.slice(0) : "string" === B ? 0 === g.indexOf("+=") ? h[k] += ja(g.substr(2)) : 0 === g.indexOf("-=") ? h[k] -= ja(g.substr(2)) : h[k] = g : h[k] = g); Ca(a, e, h); Ea(a,
e, h); f.isEmptyObject(c) === z && Q(a, e, h, "change", c)
        } return this
    }; f.fn.setLayers = function (d, c) { var a, b, e, h; for (b = 0; b < this.length; b += 1) for (a = f(this[b]), e = a.getLayers(c), h = 0; h < e.length; h += 1) a.setLayer(e[h], d); return this }; f.fn.setLayerGroup = function (d, c) { var a, b, e, h; for (b = 0; b < this.length; b += 1) if (a = f(this[b]), e = a.getLayerGroup(d)) for (h = 0; h < e.length; h += 1) a.setLayer(e[h], c); return this }; f.fn.moveLayer = function (d, c) {
        var a, b, e, h, k; for (b = 0; b < this.length; b += 1) if (a = f(this[b]), e = D(this[b]), h = e.layers, k = a.getLayer(d)) k.index =
ia(k, h), h.splice(k.index, 1), h.splice(c, 0, k), 0 > c && (c = h.length + c), k.index = c, Q(a, e, k, "move"); return this
    }; f.fn.removeLayer = function (d) { var c, a, b, e, h; for (a = 0; a < this.length; a += 1) if (c = f(this[a]), b = D(this[a]), e = c.getLayers(), h = c.getLayer(d)) h.index = ia(h, e), e.splice(h.index, 1), pa(c, b, h, { name: g }), qa(c, b, h, { groups: g }), Q(c, b, h, "remove"); return this }; f.fn.removeLayers = function (d) {
        var c, a, b, e, h, k; for (a = 0; a < this.length; a += 1) {
            c = f(this[a]); b = D(this[a]); e = c.getLayers(d); for (k = 0; k < e.length; k += 1) h = e[k], c.removeLayer(h),
k -= 1; b.layer.names = {}; b.layer.groups = {}
        } return this
    }; f.fn.removeLayerGroup = function (d) { var c, a, b, e; if (d !== r) for (a = 0; a < this.length; a += 1) if (c = f(this[a]), D(this[a]), c.getLayers(), b = c.getLayerGroup(d)) for (b = b.slice(0), e = 0; e < b.length; e += 1) c.removeLayer(b[e]); return this }; f.fn.addLayerToGroup = function (d, c) { var a, b, e, h = [c]; for (b = 0; b < this.length; b += 1) a = f(this[b]), e = a.getLayer(d), e.groups && (h = e.groups.slice(0), -1 === ia(c, e.groups) && h.push(c)), a.setLayer(e, { groups: h }); return this }; f.fn.removeLayerFromGroup =
function (d, c) { var a, b, e, h = [], k; for (b = 0; b < this.length; b += 1) a = f(this[b]), e = a.getLayer(d), e.groups && (k = ia(c, e.groups), -1 !== k && (h = e.groups.slice(0), h.splice(k, 1), a.setLayer(e, { groups: h }))); return this }; V.cursors = ["grab", "grabbing", "zoom-in", "zoom-out"]; V.prefix = function () { var d = getComputedStyle(ta.documentElement, ""); return "-" + (sa.call(d).join("").match(/-(moz|webkit|ms)-/) || "" === d.OLink && ["", "o"])[1] + "-" } (); f.fn.triggerLayerEvent = function (d, c) {
    var a, b, e; for (b = 0; b < this.length; b += 1) a = f(this[b]), e = D(this[b]),
(d = a.getLayer(d)) && Q(a, e, d, c); return this
}; f.fn.drawLayer = function (d) { var c, a, b; for (c = 0; c < this.length; c += 1) a = f(this[c]), K(this[c]), (b = a.getLayer(d)) && b.visible && b._method && (b._next = g, b._method.call(a, b)); return this }; f.fn.drawLayers = function (d) {
    var c, a, b = Z({}, d), e, h, k, L, B, t; b.index || (b.index = 0); for (c = 0; c < this.length; c += 1) if (d = f(this[c]), a = K(this[c])) {
        L = D(this[c]); b.clear !== z && d.clearCanvas(); a = L.layers; for (k = b.index; k < a.length && (e = a[k], e.index = k, b.resetFire && (e._fired = z), B = d, t = e, h = k + 1, t && t.visible &&
t._method && (t._next = h ? h : g, t._method.call(B, t)), e._masks = L.transforms.masks.slice(0), e._method !== f.fn.drawImage || !e.visible); k += 1); e = L; var E = h = t = B = void 0; B = g; for (t = e.intersecting.length - 1; 0 <= t; t -= 1) if (B = e.intersecting[t], B._masks) { for (E = B._masks.length - 1; 0 <= E; E -= 1) if (h = B._masks[E], !h.intersects) { B.intersects = z; break } if (B.intersects) break } e = B; B = L.event; t = B.type; if (L.drag.layer) {
            h = d; var E = L, F = t, y = void 0, u = void 0, p = void 0, C = p = void 0, m = void 0, p = y = y = p = void 0, p = E.drag, C = (u = p.layer) && u.dragGroups || [], y = E.layers;
            if ("mousemove" === F || "touchmove" === F) { if (p.dragging || (p.dragging = w, u.dragging = w, u.bringToFront && (y.splice(u.index, 1), u.index = y.push(u)), u._startX = u.x, u._startY = u.y, u._endX = u._eventX, u._endY = u._eventY, Q(h, E, u, "dragstart")), p.dragging) for (y = u._eventX - (u._endX - u._startX), p = u._eventY - (u._endY - u._startY), u.dx = y - u.x, u.dy = p - u.y, u.x = y, u.y = p, Q(h, E, u, "drag"), y = 0; y < C.length; y += 1) if (p = C[y], m = E.layer.groups[p], u.groups && m) for (p = 0; p < m.length; p += 1) m[p] !== u && (m[p].x += u.dx, m[p].y += u.dy) } else if ("mouseup" === F || "touchend" ===
F) p.dragging && (u.dragging = z, p.dragging = z, Q(h, E, u, "dragstop")), E.drag = {}
        } h = L.lastIntersected; h === g || e === h || !h._hovered || h._fired || L.drag.dragging || (L.lastIntersected = g, h._fired = w, h._hovered = z, Q(d, L, h, "mouseout"), d.css({ cursor: L.cursor })); e && (e[t] || Y.mouseEvents[t] && (t = Y.mouseEvents[t]), e._event && e.intersects && (L.lastIntersected = e, !(e.mouseover || e.mouseout || e.cursors) || L.drag.dragging || e._hovered || e._fired || (e._fired = w, e._hovered = w, Q(d, L, e, "mouseover")), e._fired || (e._fired = w, B.type = g, Q(d, L, e, t)), !e.draggable ||
e.disableEvents || "mousedown" !== t && "touchstart" !== t || (L.drag.layer = e))); e !== g || L.drag.dragging || d.css({ cursor: L.cursor }); k === a.length && (L.intersecting.length = 0, L.transforms = la(oa), L.savedTransforms.length = 0)
    } return this
}; f.fn.addLayer = function (d) { var c, a; for (c = 0; c < this.length; c += 1) if (a = K(this[c])) a = new J(d), a.layer = w, P(this[c], a, d); return this }; V.props = ["width", "height", "opacity", "lineHeight"]; V.propsObj = {}; f.fn.animateLayer = function () {
    function d(a, b, c) {
        return function () {
            var d, e; for (e = 0; e < V.props.length; e +=
1) d = V.props[e], c[d] = c["_" + d]; for (var k in c) c.hasOwnProperty(k) && -1 !== k.indexOf(".") && delete c[k]; b.animating && b.animated !== c || a.drawLayers(); c._animating = z; b.animating = z; b.animated = g; h[4] && h[4].call(a[0], c); Q(a, b, c, "animateend")
        } 
    } function c(a, b, c) {
        return function (d, e) {
            var k, f, g = !1; "_" === e.prop[0] && (g = !0, e.prop = e.prop.replace("_", ""), c[e.prop] = c["_" + e.prop]); -1 !== e.prop.indexOf(".") && (k = e.prop.split("."), f = k[0], k = k[1], c[f] && (c[f][k] = e.now)); c._pos !== e.pos && (c._pos = e.pos, c._animating || b.animating ||
(c._animating = w, b.animating = w, b.animated = c), b.animating && b.animated !== c || a.drawLayers()); h[5] && h[5].call(a[0], d, e, c); Q(a, b, c, "animate", e); g && (e.prop = "_" + e.prop)
        } 
    } var a, b, e, h = sa.call(arguments, 0), k, L; "object" === aa(h[2]) ? (h.splice(2, 0, h[2].duration || g), h.splice(3, 0, h[3].easing || g), h.splice(4, 0, h[4].complete || g), h.splice(5, 0, h[5].step || g)) : (h[2] === r ? (h.splice(2, 0, g), h.splice(3, 0, g), h.splice(4, 0, g)) : ca(h[2]) && (h.splice(2, 0, g), h.splice(3, 0, g)), h[3] === r ? (h[3] = g, h.splice(4, 0, g)) : ca(h[3]) && h.splice(3, 0, g));
    for (b = 0; b < this.length; b += 1) if (a = f(this[b]), e = K(this[b])) e = D(this[b]), (k = a.getLayer(h[0])) && k._method !== f.fn.draw && (L = Z({}, h[1]), L = Ua(this[b], k, L), Fa(L, w), Fa(k), k.style = V.propsObj, f(k).animate(L, { duration: h[2], easing: f.easing[h[3]] ? h[3] : g, complete: d(a, e, k), step: c(a, e, k) }), Q(a, e, k, "animatestart")); return this
}; f.fn.animateLayerGroup = function (d) {
    var c, a, b = sa.call(arguments, 0), e, h; for (a = 0; a < this.length; a += 1) if (c = f(this[a]), e = c.getLayerGroup(d)) for (h = 0; h < e.length; h += 1) b[0] = e[h], c.animateLayer.apply(c,
b); return this
}; f.fn.delayLayer = function (d, c) { var a, b, e, h; c = c || 0; for (b = 0; b < this.length; b += 1) if (a = f(this[b]), e = D(this[b]), h = a.getLayer(d)) f(h).delay(c), Q(a, e, h, "delay"); return this }; f.fn.delayLayerGroup = function (d, c) { var a, b, e, h, k; c = c || 0; for (b = 0; b < this.length; b += 1) if (a = f(this[b]), e = a.getLayerGroup(d)) for (k = 0; k < e.length; k += 1) h = e[k], a.delayLayer(h, c); return this }; f.fn.stopLayer = function (d, c) {
    var a, b, e, h; for (b = 0; b < this.length; b += 1) if (a = f(this[b]), e = D(this[b]), h = a.getLayer(d)) f(h).stop(c), Q(a, e, h, "stop");
    return this
}; f.fn.stopLayerGroup = function (d, c) { var a, b, e, h, k; for (b = 0; b < this.length; b += 1) if (a = f(this[b]), e = a.getLayerGroup(d)) for (k = 0; k < e.length; k += 1) h = e[k], a.stopLayer(h, c); return this }; (function (d) { var c; for (c = 0; c < d.length; c += 1) f.fx.step[d[c]] = Va })("color backgroundColor borderColor borderTopColor borderRightColor borderBottomColor borderLeftColor fillStyle outlineColor strokeStyle shadowColor".split(" ")); Y.touchEvents = { mousedown: "touchstart", mouseup: "touchend", mousemove: "touchmove" }; Y.mouseEvents =
{ touchstart: "mousedown", touchend: "mouseup", touchmove: "mousemove" }; (function (d) { var c; for (c = 0; c < d.length; c += 1) Xa(d[c]) })("click dblclick mousedown mouseup mousemove mouseover mouseout touchstart touchmove touchend".split(" ")); f.event.fix = function (d) {
    var c, a; d = Za.call(f.event, d); if (c = d.originalEvent) if (a = c.changedTouches, d.pageX !== r && d.offsetX === r) { if (c = f(d.currentTarget).offset()) d.offsetX = d.pageX - c.left, d.offsetY = d.pageY - c.top } else a && (c = f(d.currentTarget).offset()) && (d.offsetX = a[0].pageX - c.left,
d.offsetY = a[0].pageY - c.top); return d
}; Y.drawings = { arc: "drawArc", bezier: "drawBezier", ellipse: "drawEllipse", "function": "draw", image: "drawImage", line: "drawLine", path: "drawPath", polygon: "drawPolygon", slice: "drawSlice", quadratic: "drawQuadratic", rectangle: "drawRect", text: "drawText", vector: "drawVector" }; f.fn.draw = function c(a) {
    var b, e, h = new J(a); if (Y.drawings[h.type]) this[Y.drawings[h.type]](a); else for (b = 0; b < this.length; b += 1) if (f(this[b]), e = K(this[b])) h = new J(a), P(this[b], h, a, c), h.visible && h.fn && h.fn.call(this[b],
e, h); return this
}; f.fn.clearCanvas = function a(b) { var e, h, k = new J(b); for (e = 0; e < this.length; e += 1) if (h = K(this[e])) k.width === g || k.height === g ? (h.save(), h.setTransform(1, 0, 0, 1, 0, 0), h.clearRect(0, 0, this[e].width, this[e].height), h.restore()) : (P(this[e], k, b, a), S(this[e], h, k, k.width, k.height), h.clearRect(k.x - k.width / 2, k.y - k.height / 2, k.width, k.height), k._transformed && h.restore()); return this }; f.fn.saveCanvas = function b(e) {
    var h, k, f, g, t; for (h = 0; h < this.length; h += 1) if (k = K(this[h])) for (g = D(this[h]), f = new J(e), P(this[h],
f, e, b), t = 0; t < f.count; t += 1) fa(k, g); return this
}; f.fn.restoreCanvas = function e(h) { var k, f, g, t, E; for (k = 0; k < this.length; k += 1) if (f = K(this[k])) for (t = D(this[k]), g = new J(h), P(this[k], g, h, e), E = 0; E < g.count; E += 1) { var F = f, y = t; 0 === y.savedTransforms.length ? y.transforms = la(oa) : (F.restore(), y.transforms = y.savedTransforms.pop()) } return this }; f.fn.rotateCanvas = function h(f) { var g, B, t, E; for (g = 0; g < this.length; g += 1) if (B = K(this[g])) E = D(this[g]), t = new J(f), P(this[g], t, f, h), t.autosave && fa(B, E), za(B, t, E.transforms); return this };
    f.fn.scaleCanvas = function k(f) { var g, t, E, F; for (g = 0; g < this.length; g += 1) if (t = K(this[g])) F = D(this[g]), E = new J(f), P(this[g], E, f, k), E.autosave && fa(t, F), Aa(t, E, F.transforms); return this }; f.fn.translateCanvas = function L(f) { var g, E, F, y; for (g = 0; g < this.length; g += 1) if (E = K(this[g])) y = D(this[g]), F = new J(f), P(this[g], F, f, L), F.autosave && fa(E, y), Ba(E, F, y.transforms); return this }; f.fn.drawRect = function B(f) {
        var g, F, y, u, p, C, m, A; for (g = 0; g < this.length; g += 1) if (F = K(this[g])) y = new J(f), P(this[g], y, f, B), y.visible && (T(this[g],
F, y), S(this[g], F, y, y.width, y.height), F.beginPath(), u = y.x - y.width / 2, p = y.y - y.height / 2, (A = y.cornerRadius) ? (C = y.x + y.width / 2, m = y.y + y.height / 2, 0 > C - u - 2 * A && (A = (C - u) / 2), 0 > m - p - 2 * A && (A = (m - p) / 2), F.moveTo(u + A, p), F.lineTo(C - A, p), F.arc(C - A, p + A, A, 3 * H / 2, 2 * H, z), F.lineTo(C, m - A), F.arc(C - A, m - A, A, 0, H / 2, z), F.lineTo(u + A, m), F.arc(u + A, m - A, A, H / 2, H, z), F.lineTo(u, p + A), F.arc(u + A, p + A, A, H, 3 * H / 2, z), y.closed = w) : F.rect(u, p, y.width, y.height), U(this[g], F, y), X(this[g], F, y)); return this
    }; f.fn.drawArc = function t(f) {
        var g, y, u; for (g = 0; g <
this.length; g += 1) if (y = K(this[g])) u = new J(f), P(this[g], u, f, t), u.visible && (T(this[g], y, u), S(this[g], y, u, 2 * u.radius), y.beginPath(), Ia(this[g], y, u, u), U(this[g], y, u), X(this[g], y, u)); return this
    }; f.fn.drawEllipse = function E(f) {
        var g, u, p, C, m; for (g = 0; g < this.length; g += 1) if (u = K(this[g])) p = new J(f), P(this[g], p, f, E), p.visible && (T(this[g], u, p), S(this[g], u, p, p.width, p.height), C = 4 / 3 * p.width, m = p.height, u.beginPath(), u.moveTo(p.x, p.y - m / 2), u.bezierCurveTo(p.x - C / 2, p.y - m / 2, p.x - C / 2, p.y + m / 2, p.x, p.y + m / 2), u.bezierCurveTo(p.x +
C / 2, p.y + m / 2, p.x + C / 2, p.y - m / 2, p.x, p.y - m / 2), U(this[g], u, p), p.closed = w, X(this[g], u, p)); return this
    }; f.fn.drawPolygon = function F(g) {
        var f, p, C, m, A, M, G, v, n, l; for (f = 0; f < this.length; f += 1) if (p = K(this[f])) if (C = new J(g), P(this[f], C, g, F), C.visible) {
            T(this[f], p, C); S(this[f], p, C, 2 * C.radius); A = 2 * H / C.sides; M = A / 2; m = M + H / 2; G = C.radius * N(M); p.beginPath(); for (l = 0; l < C.sides; l += 1) v = C.x + C.radius * N(m), n = C.y + C.radius * R(m), p.lineTo(v, n), C.concavity && (v = C.x + (G + -G * C.concavity) * N(m + M), n = C.y + (G + -G * C.concavity) * R(m + M), p.lineTo(v,
n)), m += A; U(this[f], p, C); C.closed = w; X(this[f], p, C)
        } return this
    }; f.fn.drawSlice = function y(g) {
        var p, C, m, A, M; for (p = 0; p < this.length; p += 1) if (f(this[p]), C = K(this[p])) m = new J(g), P(this[p], m, g, y), m.visible && (T(this[p], C, m), S(this[p], C, m, 2 * m.radius), m.start *= m._toRad, m.end *= m._toRad, m.start -= H / 2, m.end -= H / 2, m.start = Ha(m.start), m.end = Ha(m.end), m.end < m.start && (m.end += 2 * H), A = (m.start + m.end) / 2, M = m.radius * m.spread * N(A), A = m.radius * m.spread * R(A), m.x += M, m.y += A, C.beginPath(), C.arc(m.x, m.y, m.radius, m.start, m.end, m.ccw),
C.lineTo(m.x, m.y), U(this[p], C, m), m.closed = w, X(this[p], C, m)); return this
    }; f.fn.drawLine = function u(f) { var g, m, A; for (g = 0; g < this.length; g += 1) if (m = K(this[g])) A = new J(f), P(this[g], A, f, u), A.visible && (T(this[g], m, A), S(this[g], m, A), m.beginPath(), Ka(this[g], m, A, A), U(this[g], m, A), X(this[g], m, A)); return this }; f.fn.drawQuadratic = function p(g) {
        var f, A, M; for (f = 0; f < this.length; f += 1) if (A = K(this[f])) M = new J(g), P(this[f], M, g, p), M.visible && (T(this[f], A, M), S(this[f], A, M), A.beginPath(), La(this[f], A, M, M), U(this[f], A, M),
X(this[f], A, M)); return this
    }; f.fn.drawBezier = function C(f) { var g, M, G; for (g = 0; g < this.length; g += 1) if (M = K(this[g])) G = new J(f), P(this[g], G, f, C), G.visible && (T(this[g], M, G), S(this[g], M, G), M.beginPath(), Ma(this[g], M, G, G), U(this[g], M, G), X(this[g], M, G)); return this }; f.fn.drawVector = function m(g) { var f, G, v; for (f = 0; f < this.length; f += 1) if (G = K(this[f])) v = new J(g), P(this[f], v, g, m), v.visible && (T(this[f], G, v), S(this[f], G, v), G.beginPath(), Pa(this[f], G, v, v), U(this[f], G, v), X(this[f], G, v)); return this }; f.fn.drawPath =
function A(f) { var g, v, n, l, x; for (g = 0; g < this.length; g += 1) if (v = K(this[g])) if (n = new J(f), P(this[g], n, f, A), n.visible) { T(this[g], v, n); S(this[g], v, n); v.beginPath(); for (l = 1; w; ) if (x = n["p" + l], x !== r) x = new J(x), "line" === x.type ? Ka(this[g], v, n, x) : "quadratic" === x.type ? La(this[g], v, n, x) : "bezier" === x.type ? Ma(this[g], v, n, x) : "vector" === x.type ? Pa(this[g], v, n, x) : "arc" === x.type && Ia(this[g], v, n, x), l += 1; else break; U(this[g], v, n); X(this[g], v, n) } return this }; f.fn.drawText = function M(G) {
    var v, n, l, x, W, s, r; for (v = 0; v < this.length; v +=
1) if (f(this[v]), n = K(this[v])) if (l = new J(G), x = P(this[v], l, G, M), l.visible) {
        T(this[v], n, l); n.textBaseline = l.baseline; n.textAlign = l.align; Qa(n, l); W = l.maxWidth !== g ? Sa(n, l) : l.text.toString().split("\n"); Ra(this[v], n, l, W); x && (x.width = l.width, x.height = l.height); S(this[v], n, l, l.width, l.height); s = l.x; "left" === l.align ? l.respectAlign ? l.x += l.width / 2 : s -= l.width / 2 : "right" === l.align && (l.respectAlign ? l.x -= l.width / 2 : s += l.width / 2); for (x = 0; x < W.length; x += 1) n.shadowColor = l.shadowColor, r = l.y + x * l.height / W.length - (W.length -
1) * l.height / W.length / 2, n.fillText(W[x], s, r), "transparent" !== l.fillStyle && (n.shadowColor = "transparent"), n.strokeText(W[x], s, r); r = 0; "top" === l.baseline ? r += l.height / 2 : "bottom" === l.baseline && (r -= l.height / 2); l._event && (n.beginPath(), n.rect(l.x - l.width / 2, l.y - l.height / 2 + r, l.width, l.height), U(this[v], n, l), n.closePath()); l._transformed && n.restore()
    } ba.propCache = l; return this
}; f.fn.measureText = function (g) {
    var f, v; f = this.getLayer(g); if (!f || f && !f._layer) f = new J(g); if (g = K(this[0])) Qa(g, f), v = Sa(g, f), Ra(this[0],
g, f, v); return f
}; f.fn.drawImage = function G(v) {
    function n(l, n, s, q, v) {
        return function () {
            var x = f(l); T(l, n, q); q.width === g && q.sWidth === g && (q.width = q.sWidth = I.width); q.height === g && q.sHeight === g && (q.height = q.sHeight = I.height); v && (v.width = q.width, v.height = q.height); q.sWidth !== g && q.sHeight !== g && q.sx !== g && q.sy !== g ? (q.width === g && (q.width = q.sWidth), q.height === g && (q.height = q.sHeight), q.cropFromCenter || (q.sx += q.sWidth / 2, q.sy += q.sHeight / 2), 0 > q.sy - q.sHeight / 2 && (q.sy = q.sHeight / 2), q.sy + q.sHeight / 2 > I.height && (q.sy =
I.height - q.sHeight / 2), 0 > q.sx - q.sWidth / 2 && (q.sx = q.sWidth / 2), q.sx + q.sWidth / 2 > I.width && (q.sx = I.width - q.sWidth / 2), S(l, n, q, q.width, q.height), n.drawImage(I, q.sx - q.sWidth / 2, q.sy - q.sHeight / 2, q.sWidth, q.sHeight, q.x - q.width / 2, q.y - q.height / 2, q.width, q.height)) : (S(l, n, q, q.width, q.height), n.drawImage(I, q.x - q.width / 2, q.y - q.height / 2, q.width, q.height)); n.beginPath(); n.rect(q.x - q.width / 2, q.y - q.height / 2, q.width, q.height); U(l, n, q); n.closePath(); q._transformed && n.restore(); ya(n, s, q); q.layer ? Q(x, s, v, "load") : q.load && q.load.call(x[0],
v); q.layer && (v._masks = s.transforms.masks.slice(0), q._next && x.drawLayers({ clear: z, resetFire: w, index: q._next }))
        } 
    } var l, x, W, s, da, H, I, O, N, R = ba.imageCache; for (x = 0; x < this.length; x += 1) if (l = this[x], W = K(this[x])) s = D(this[x]), da = new J(v), H = P(this[x], da, v, G), da.visible && (N = da.source, O = N.getContext, N.src || O ? I = N : N && (R[N] !== r ? I = R[N] : (I = new ua, I.src = N, R[N] = I)), I && (I.complete || O ? n(l, W, s, da, H)() : (f(I).bind("load", n(l, W, s, da, H)), I.src = I.src))); return this
}; f.fn.createPattern = function (G) {
    function v() {
        s = l.createPattern(r,
x.repeat); x.load && x.load.call(n[0], s)
    } var n = this, l, x, r, s, w; (l = K(n[0])) ? (x = new J(G), w = x.source, ca(w) ? (r = f("<canvas />")[0], r.width = x.width, r.height = x.height, G = K(r), w.call(r, G), v()) : (G = w.getContext, w.src || G ? r = w : (r = new ua, r.src = w), r.complete || G ? v() : (f(r).bind("load", v), r.src = r.src))) : s = g; return s
}; f.fn.createGradient = function (f) {
    var v, n = [], l, x, w, s, z, D, I; f = new J(f); if (v = K(this[0])) {
        f.x1 = f.x1 || 0; f.y1 = f.y1 || 0; f.x2 = f.x2 || 0; f.y2 = f.y2 || 0; v = f.r1 !== g && f.r2 !== g ? v.createRadialGradient(f.x1, f.y1, f.r1, f.x2, f.y2,
f.r2) : v.createLinearGradient(f.x1, f.y1, f.x2, f.y2); for (s = 1; f["c" + s] !== r; s += 1) f["s" + s] !== r ? n.push(f["s" + s]) : n.push(g); l = n.length; n[0] === g && (n[0] = 0); n[l - 1] === g && (n[l - 1] = 1); for (s = 0; s < l; s += 1) { if (n[s] !== g) { D = 1; I = 0; x = n[s]; for (z = s + 1; z < l; z += 1) if (n[z] !== g) { w = n[z]; break } else D += 1; x > w && (n[z] = n[s]) } else n[s] === g && (I += 1, n[s] = x + (w - x) / D * I); v.addColorStop(n[s], f["c" + (s + 1)]) } 
    } else v = g; return v
}; f.fn.setPixels = function v(f) {
    var l, x, r, s, w, z, I, D, H; for (x = 0; x < this.length; x += 1) if (l = this[x], r = K(l)) {
        s = new J(f); P(l, s, f, v);
        S(this[x], r, s, s.width, s.height); if (s.width === g || s.height === g) s.width = l.width, s.height = l.height, s.x = s.width / 2, s.y = s.height / 2; if (0 !== s.width && 0 !== s.height) { z = r.getImageData(s.x - s.width / 2, s.y - s.height / 2, s.width, s.height); I = z.data; H = I.length; if (s.each) for (D = 0; D < H; D += 4) w = { r: I[D], g: I[D + 1], b: I[D + 2], a: I[D + 3] }, s.each.call(l, w, s), I[D] = w.r, I[D + 1] = w.g, I[D + 2] = w.b, I[D + 3] = w.a; r.putImageData(z, s.x - s.width / 2, s.y - s.height / 2); r.restore() } 
    } return this
}; f.fn.getCanvasImage = function (f, n) {
    var l, x = g; 0 !== this.length && (l =
this[0], l.toDataURL && (n === r && (n = 1), x = l.toDataURL("image/" + f, n))); return x
}; f.fn.detectPixelRatio = function (g) {
    var n, l, r, z, s, J, H; for (l = 0; l < this.length; l += 1) n = this[l], f(this[l]), r = K(n), H = D(this[l]), H.scaled || (z = window.devicePixelRatio || 1, s = r.webkitBackingStorePixelRatio || r.mozBackingStorePixelRatio || r.msBackingStorePixelRatio || r.oBackingStorePixelRatio || r.backingStorePixelRatio || 1, z /= s, 1 !== z && (s = n.width, J = n.height, n.width = s * z, n.height = J * z, n.style.width = s + "px", n.style.height = J + "px", r.scale(z, z)), H.pixelRatio =
z, H.scaled = w, g && g.call(n, z)); return this
}; O.clearCache = function () { for (var f in ba) ba.hasOwnProperty(f) && (ba[f] = {}) }; f.support.canvas = f("<canvas />")[0].getContext !== r; O.defaults = ma; O.prefs = $; O.setGlobalProps = T; O.transformShape = S; O.detectEvents = U; O.closePath = X; f.jCanvas = O
})(jQuery, document, Image, Array, Math, parseFloat, console, !0, !1, null);