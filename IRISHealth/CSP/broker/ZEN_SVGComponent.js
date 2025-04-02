/*** Zen Module: ZEN_SVGComponent ***/

self._zenClassIdx['svgComponent'] = '_ZEN_SVGComponent_svgComponent';
self._ZEN_SVGComponent_svgComponent = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_svgComponent__init(this,index,id);}
}

self._ZEN_SVGComponent_svgComponent__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_object__init) ?zenMaster._ZEN_Component_object__init(o,index,id):_ZEN_Component_object__init(o,index,id);
	o.boundless = false;
	o.document = null;
	o.height = '100';
	o.hidden = false;
	o.onclick = '';
	o.position = 'relative';
	o.preserveAspectRatio = '';
	o.svgComponent = null;
	o.svgGroup = null;
	o.viewBoxHeight = '';
	o.viewBoxWidth = '';
	o.visible = true;
	o.width = '100';
	o.x = '0';
	o.y = '0';
}
function _ZEN_SVGComponent_svgComponent_serialize(set,s)
{
	var o = this;s[0]='1175723986';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.aux;s[7]=(o.boundless?1:0);s[8]=o.height;s[9]=(o.hidden?1:0);s[10]=o.onclick;s[11]=o.onupdate;s[12]=o.position;s[13]=o.preserveAspectRatio;s[14]=o.renderFlag;s[15]=o.tuple;s[16]=o.viewBoxHeight;s[17]=o.viewBoxWidth;s[18]=(o.visible?1:0);s[19]=o.width;s[20]=o.x;s[21]=o.y;
}
function _ZEN_SVGComponent_svgComponent_getSettings(s)
{
	s['name'] = 'string';
	s['height'] = 'length';
	s['hidden'] = 'boolean';
	s['onclick'] = 'eventHandler';
	s['preserveAspectRatio'] = 'string';
	s['viewBoxHeight'] = 'integer';
	s['viewBoxWidth'] = 'integer';
	s['width'] = 'length';
	s['x'] = 'length';
	s['y'] = 'length';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_svgComponent_beginWaitState = function() {
if (null == this._waitTimer) {
this._waitCounter = 0;
this.drawWaitIcon(this._waitCounter,true);
this._waitTimer = window.setTimeout("zenPage.getComponent(" + this.index + ").updateWaitState()",250);
}
}

self._ZEN_SVGComponent_svgComponent_calculateViewBox = function() {
var vw = ('' == this.viewBoxWidth) ? this.width : this.viewBoxWidth;
var vh = ('' == this.viewBoxHeight) ? this.height : this.viewBoxHeight;
return '0 0 ' + vw + ' ' + vh;
}

self._ZEN_SVGComponent_svgComponent_clickHandler = function(evt) {
evt.stopPropagation();
return zenInvokeCallbackMethod(this.onclick,this,'onclick');
}

self._ZEN_SVGComponent_svgComponent_createEnclosingGroup = function(parent) {
if (this.boundless) {
this.svgGroup = this.document.createElementNS(SVGNS,'g');
this.svgGroup.setAttribute('transform','translate('+this.x+','+this.y+')');
}
else {
this.svgGroup = this.document.createElementNS(SVGNS,'svg');
this.svgGroup.setAttribute('viewBox',this.calculateViewBox());
this.svgGroup.setAttribute('preserveAspectRatio',zenIsMissing(this.preserveAspectRatio) ? 'none' : this.preserveAspectRatio);
this.svgGroup.setAttribute('width',this.width);
this.svgGroup.setAttribute('height',this.height);
this.svgGroup.setAttribute('x',this.x);
this.svgGroup.setAttribute('y',this.y);
}
this.svgGroup.setAttribute('id',(''==this.id) ? 'zen_'+this.index : this.id);
this.svgGroup.addEventListener('click',this.wrapMethod('clickHandler'),false);
if (this.hidden) {
this.svgGroup.setAttribute('style','display: none;');
}
if ('fixed' == this.position) {
var fg = this.document.getElementById('zenFixedOverlay');
fg.appendChild(this.svgGroup);
}
else {
parent.appendChild(this.svgGroup);
}
}

self._ZEN_SVGComponent_svgComponent_createOverlay = function() {
var overGroup = this.document.getElementById('zenOverlay');
zenASSERT(overGroup,'Unable to find svg overlay group for the page.',arguments);
this._overlayGroup = this.document.createElementNS(SVGNS,'g');
this._overlayGroup.setAttribute("id",'overlay_'+ this.index);
this._overlayGroup.setAttribute('style',this.hidden ? 'display: none;' : '');
overGroup.appendChild(this._overlayGroup);
var size = this.getSizeAbsolute();
var cls = 'zenSvgOverlay';
switch (this.overlayMode) {
case 1:
cls = 'zenSvgOverlay';
break;
case 2:
cls = 'zenSvgOverlaySelected';
break;
case 3:
cls = 'zenSvgOverlayDrag';
break;
}
var rect = this.document.createElementNS(SVGNS,"rect");
rect.setAttribute("x",size.x);
rect.setAttribute("y",size.y);
rect.setAttribute("width",size.width);
rect.setAttribute("height",size.height);
rect.setAttribute("class",cls);
rect.setAttribute("id","overlayRect_" + this.index);
this._overlayRect = rect;
this._overlayGroup.appendChild(rect);
rect.addEventListener('mousedown',new Function('evt','return zenPage.getComponent('+this.index+').overlayMouseDownHandler(evt);'),false);
if (this.overlayMode == 3) {
/* sizing handles */
this._handleNW = this.createSizingHandle('nw',size.x,size.y);
this._handleNE = this.createSizingHandle('ne',size.x+size.width,size.y);
this._handleSW = this.createSizingHandle('sw',size.x,size.y+size.height);
this._handleSE = this.createSizingHandle('se',size.x+size.width,size.y+size.height);
this._overlayGroup.appendChild(this._handleNE);
this._overlayGroup.appendChild(this._handleNW);
this._overlayGroup.appendChild(this._handleSW);
this._overlayGroup.appendChild(this._handleSE);
}
}

self._ZEN_SVGComponent_svgComponent_createSizingHandle = function(which,x,y) {
var sz = 8;
var rect = this.document.createElementNS(SVGNS,"rect");
rect.setAttribute("transform","translate(" + x + "," + y + ")");
rect.setAttribute("rx",1);
rect.setAttribute("x",-sz/2);
rect.setAttribute("y",-sz/2);
rect.setAttribute("width",sz);
rect.setAttribute("height",sz);
rect.setAttribute("class","zenSizingHandle");
rect.setAttribute("style","cursor: " + which + "-resize");
rect.addEventListener('mousedown',new Function('evt','which','return zenPage.getComponent('+this.index+').sizingMouseDownHandler(evt,"'+which+'");'),false);
return rect;
}

self._ZEN_SVGComponent_svgComponent_drawWaitIcon = function(counter,draw) {
if (this.svgGroup) {
if (this._waitIcon) {
while(null != this._waitIcon.firstChild) {
this._waitIcon.removeChild(this._waitIcon.firstChild);
}
try {
this.svgGroup.removeChild(this._waitIcon);
}
catch(ex) {
}
delete this._waitIcon;
}
if (draw) {
this._waitIcon = this.document.createElementNS(SVGNS,'g');
var cx = 50;
var cy = 50;
this._waitIcon.setAttribute('transform','translate('+cx+','+cy+')');
this.svgGroup.appendChild(this._waitIcon);
var circ = this.document.createElementNS(SVGNS,'circle');
circ.setAttribute('style','opacity:0.7;fill:rgb(100,100,200);');
circ.setAttribute('cx',0);
circ.setAttribute('cy',0);
circ.setAttribute('r',25);
this._waitIcon.appendChild(circ);
var rays = 13;
for (var r=0; r<rays; r++) {
var line = this.document.createElementNS(SVGNS,'line');
if (((r+counter)%rays)==0) {
line.setAttribute('style','stroke:white;stroke-width:4px;stroke-linejoin:round;stroke-linecap:round;');
}
else {
var op = 0.9 - 0.8*(((r+counter)%rays) / rays);
line.setAttribute('style','opacity:'+op+';stroke:#D0D0D0;stroke-width:4px;stroke-linejoin:round;stroke-linecap:round;');
}
line.setAttribute('x1',15);
line.setAttribute('x2',22);
line.setAttribute('y1',0);
line.setAttribute('y2',0);
line.setAttribute('transform','rotate('+(-r*(360/rays))+')');
this._waitIcon.appendChild(line);
}
}
}
}

self._ZEN_SVGComponent_svgComponent_endWaitState = function() {
if (null != this._waitTimer) {
window.clearTimeout(this._waitTimer);
delete this._waitTimer;
}
delete this._waitCounter;
this.drawWaitIcon(0,false);
}

self._ZEN_SVGComponent_svgComponent_findSVGElement = function(subid) {
if (null == this.document || '' == this.document) {
return null
}
return this.document.getElementById(subid + '_' + this.index);
}

self._ZEN_SVGComponent_svgComponent_getFrame = function() {
if (!this.parent) {		// DTB145 - broaden test for missing parent
return null;
}
else if (this.parent.isOfType('svgFrame')) {
return this.parent;
}
else {
return this.parent.getFrame();
}
}

self._ZEN_SVGComponent_svgComponent_getSizeAbsolute = function() {
var size = null;
if (this.parent && this.parent.getSizeAbsolute) {
var size = this.parent.getSizeAbsolute();
size.x += parseFloat(this.x);
size.y += parseFloat(this.y);
}
else {
var size = new Object();
size.x = parseFloat(this.x);
size.y = parseFloat(this.y);
}
size.width = parseFloat(this.width);
size.height = parseFloat(this.height);
return size;
}

self._ZEN_SVGComponent_svgComponent_overlayMouseDownHandler = function(evt) {
var frame = this.getFrame();
if (frame) {
frame.selectItem(this, evt.ctrlKey);
if (frame.canDragShapes()) {
frame.startMove(evt,this);
}
}
}

self._ZEN_SVGComponent_svgComponent_refreshContents = function() {
return;
}

self._ZEN_SVGComponent_svgComponent_renderContents = function() {
}

self._ZEN_SVGComponent_svgComponent_renderSVG = function(document,parent) {
zenASSERT(document,"SVG Document is null",arguments);
this.document = document;
this.createEnclosingGroup(parent);
this.render();
}

self._ZEN_SVGComponent_svgComponent_setOverlayMode = function(mode) {
if (!this.svgGroup) return;
var overGroup = this.document.getElementById('zenOverlay');
zenASSERT(overGroup,'Unable to find svg overlay group for the page.',arguments);
var overlay = this.document.getElementById('overlay_'+this.index);
if (overlay) {
overGroup.removeChild(overlay);
delete this._overlayGroup;
delete this._overlayRect;
delete overlay;
}
this.overlayMode = mode;
if (mode > 0 && this.position != 'fixed') {
this.createOverlay();
}
}

self._ZEN_SVGComponent_svgComponent_setPosition = function(x,y) {
x = parseFloat(x);
y = parseFloat(y);
if (this.x != x || this.y != y) {
this.x = x;
this.y = y;
if (this.svgGroup) {
this.svgGroup.setAttribute('x',this.x);
this.svgGroup.setAttribute('y',this.y);
}
}
if (this._overlayRect) {
var size = this.getSizeAbsolute();
this.updateOverlay(size.x,size.y,size.width,size.height);
}
if (this.setPositionHandler) {
this.setPositionHandler();
}
}

self._ZEN_SVGComponent_svgComponent_setProperty = function(property,value,value2) {
switch(property) {
case 'x':
this.setPosition(value,this.y);
break;
case 'y':
this.setPosition(this.x,value);
break;
case 'width':
case 'height':
if (property == 'width') {
this.setSize(value,this.height);
}
else {
this.setSize(this.width,value);
}
if (this.parent) {
this.parent.layoutChildren();
}
break;
case 'preserveAspectRatio':
this[property] = value;
if (this.svgGroup) {
this.svgGroup.setAttribute('preserveAspectRatio',zenIsMissing(this.preserveAspectRatio) ? 'none' : this.preserveAspectRatio);
}
break;
case 'viewBoxWidth':
case 'viewBoxHeight':
this[property] = (''==value) ? '' : parseInt(value,10);
if (this.svgGroup) {
this.svgGroup.setAttribute('viewBox',this.calculateViewBox());
}
break;
case 'hidden':
value = value ? true : false;
if (this.hidden != value) {
this.hidden = value;
if (this.svgGroup) {
this.svgGroup.setAttribute('style',this.hidden ? 'display: none;' : '');
}
if (this._overlayGroup) {
this._overlayGroup.setAttribute('style',this.hidden ? 'display: none;' : '');
}
if (this.svgGroup==null) {
this.parent.layoutChildren();
}
}
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_SVGComponent_svgComponent_setSize = function(w,h) {
w = parseInt(w,10);
h = parseInt(h,10);
if (this.width != w || this.height != h) {
this.width = w;
this.height = h;
if (this.svgGroup) {
this.svgGroup.setAttribute('width',this.width);
this.svgGroup.setAttribute('height',this.height);
this.svgGroup.setAttribute('viewBox',this.calculateViewBox());
}
}
if (this._overlayRect) {
var size = this.getSizeAbsolute();
this.updateOverlay(size.x,size.y,size.width,size.height);
}
if (this.setSizeHandler) {
this.setSizeHandler();
}
}

self._ZEN_SVGComponent_svgComponent_setTextNode = function(id,str) {
if (!this.document) return;
var text = this.findSVGElement(id);
if (!text) return;
var oldNode = text.firstChild;
text.removeChild(oldNode);
var textNode;
textNode = this.document.createTextNode(str);
text.appendChild(textNode);
}

self._ZEN_SVGComponent_svgComponent_sizingMouseDownHandler = function(evt,which) {
var frame = this.getFrame();
if (frame) {
frame.selectItem(this, evt.ctrlKey);
if (frame.canDragShapes()) {
frame.startResize(evt,this,which);
}
}
}

self._ZEN_SVGComponent_svgComponent_unrender = function() {
if (null == this.svgGroup) {
return;
}
if (null == this.svgGroup.childNodes || 0 == this.svgGroup.childNodes.length) {
return;
}
while(null != this.svgGroup.firstChild) {
this.svgGroup.removeChild(this.svgGroup.firstChild);
}
}

self._ZEN_SVGComponent_svgComponent_updateOverlay = function(x,y,width,height) {
if (this._overlayRect) {
var rect = this._overlayRect;
rect.setAttribute("x",x);
rect.setAttribute("y",y);
rect.setAttribute("width",width);
rect.setAttribute("height",height);
}
if (this._handleNW) {
this._handleNW.setAttribute("transform","translate(" + (x) + "," + (y) + ")");
}
if (this._handleNE) {
this._handleNE.setAttribute("transform","translate(" + (x+width) + "," + (y) + ")");
}
if (this._handleSW) {
this._handleSW.setAttribute("transform","translate(" + (x) + "," + (y+height) + ")");
}
if (this._handleSE) {
this._handleSE.setAttribute("transform","translate(" + (x+width) + "," + (y+height) + ")");
}
}

self._ZEN_SVGComponent_svgComponent_updateWaitState = function() {
this._waitCounter++;
this.drawWaitIcon(this._waitCounter,true);
this._waitTimer = window.setTimeout("zenPage.getComponent(" + this.index + ").updateWaitState()",250);
}

self._ZEN_SVGComponent_svgComponent_wrapMethod = function(methodName) {
return new Function('evt','return zenPage.getComponent('+this.index+').'+methodName+'(evt);');
}
self._ZEN_SVGComponent_svgComponent__Loader = function() {
	zenLoadClass('_ZEN_Component_object');
	_ZEN_SVGComponent_svgComponent.prototype = zenCreate('_ZEN_Component_object',-1);
	var p = _ZEN_SVGComponent_svgComponent.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_svgComponent;
	p.superClass = ('undefined' == typeof _ZEN_Component_object) ? zenMaster._ZEN_Component_object.prototype:_ZEN_Component_object.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.svgComponent';
	p._type = 'svgComponent';
	p.serialize = _ZEN_SVGComponent_svgComponent_serialize;
	p.getSettings = _ZEN_SVGComponent_svgComponent_getSettings;
	p.beginWaitState = _ZEN_SVGComponent_svgComponent_beginWaitState;
	p.calculateViewBox = _ZEN_SVGComponent_svgComponent_calculateViewBox;
	p.clickHandler = _ZEN_SVGComponent_svgComponent_clickHandler;
	p.createEnclosingGroup = _ZEN_SVGComponent_svgComponent_createEnclosingGroup;
	p.createOverlay = _ZEN_SVGComponent_svgComponent_createOverlay;
	p.createSizingHandle = _ZEN_SVGComponent_svgComponent_createSizingHandle;
	p.drawWaitIcon = _ZEN_SVGComponent_svgComponent_drawWaitIcon;
	p.endWaitState = _ZEN_SVGComponent_svgComponent_endWaitState;
	p.findSVGElement = _ZEN_SVGComponent_svgComponent_findSVGElement;
	p.getFrame = _ZEN_SVGComponent_svgComponent_getFrame;
	p.getSizeAbsolute = _ZEN_SVGComponent_svgComponent_getSizeAbsolute;
	p.overlayMouseDownHandler = _ZEN_SVGComponent_svgComponent_overlayMouseDownHandler;
	p.refreshContents = _ZEN_SVGComponent_svgComponent_refreshContents;
	p.renderContents = _ZEN_SVGComponent_svgComponent_renderContents;
	p.renderSVG = _ZEN_SVGComponent_svgComponent_renderSVG;
	p.setOverlayMode = _ZEN_SVGComponent_svgComponent_setOverlayMode;
	p.setPosition = _ZEN_SVGComponent_svgComponent_setPosition;
	p.setProperty = _ZEN_SVGComponent_svgComponent_setProperty;
	p.setSize = _ZEN_SVGComponent_svgComponent_setSize;
	p.setTextNode = _ZEN_SVGComponent_svgComponent_setTextNode;
	p.sizingMouseDownHandler = _ZEN_SVGComponent_svgComponent_sizingMouseDownHandler;
	p.unrender = _ZEN_SVGComponent_svgComponent_unrender;
	p.updateOverlay = _ZEN_SVGComponent_svgComponent_updateOverlay;
	p.updateWaitState = _ZEN_SVGComponent_svgComponent_updateWaitState;
	p.wrapMethod = _ZEN_SVGComponent_svgComponent_wrapMethod;
}

self._zenClassIdx['svgObject'] = '_ZEN_SVGComponent_svgObject';
self._ZEN_SVGComponent_svgObject = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_svgObject__init(this,index,id);}
}

self._ZEN_SVGComponent_svgObject__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_object__init) ?zenMaster._ZEN_Component_object__init(o,index,id):_ZEN_Component_object__init(o,index,id);
}
function _ZEN_SVGComponent_svgObject_serialize(set,s)
{
	var o = this;s[0]='3874650476';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.aux;s[7]=o.onupdate;s[8]=o.renderFlag;s[9]=o.tuple;s[10]=(o.visible?1:0);
}
function _ZEN_SVGComponent_svgObject_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}
self._ZEN_SVGComponent_svgObject__Loader = function() {
	zenLoadClass('_ZEN_Component_object');
	_ZEN_SVGComponent_svgObject.prototype = zenCreate('_ZEN_Component_object',-1);
	var p = _ZEN_SVGComponent_svgObject.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_svgObject;
	p.superClass = ('undefined' == typeof _ZEN_Component_object) ? zenMaster._ZEN_Component_object.prototype:_ZEN_Component_object.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.svgObject';
	p._type = 'svgObject';
	p.serialize = _ZEN_SVGComponent_svgObject_serialize;
	p.getSettings = _ZEN_SVGComponent_svgObject_getSettings;
}

self._zenClassIdx['chart'] = '_ZEN_SVGComponent_chart';
self._ZEN_SVGComponent_chart = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_chart__init(this,index,id);}
}

self._ZEN_SVGComponent_chart__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_svgComponent__init) ?zenMaster._ZEN_SVGComponent_svgComponent__init(o,index,id):_ZEN_SVGComponent_svgComponent__init(o,index,id);
	o.appearance = '2D';
	o.autoScaleText = true;
	o.axisLineStyle = '';
	o.axisTitleStyle = 'opacity:0.5;';
	o.backgroundStyle = '';
	o.bandLower = '';
	o.bandLowerStyle = '';
	o.bandUpper = '';
	o.bandUpperStyle = '';
	o.baseLineStyle = '';
	o.borderOffset = '8';
	o.borderRadius = '0';
	o.borderStyle = '';
	o.controller = '';
	o.controllerId = '';
	o.currMultiple = '';
	o.currYAxis = '0';
	o.endTime = '';
	o.gridStyle = '';
	o.hasZoom = false;
	o.hzZoomStep = '0';
	o.indicatorStyle = '';
	o.indicatorsVisible = false;
	o.labelStyle = '';
	o.labelsVisible = true;
	o.legendHeight = '';
	o.legendLabelStyle = '';
	o.legendRectStyle = '';
	o.legendStyle = '';
	o.legendTitle = '';
	o.legendVisible = 'auto';
	o.legendWidth = '';
	o.legendX = '';
	o.legendY = '';
	o.lineStyle = '';
	o.marginBottom = '';
	o.marginLeft = '';
	o.marginRight = '';
	o.marginTop = '';
	o.markerScale = '1';
	o.markerShapes = 'circle,up,down,square';
	o.markerStyle = '';
	o.markersVisible = false;
	o.maxLabelLen = '20';
	o.msgIfNoData = 'No Data';
	o.multipleTitleStyle = '';
	o.noDataFill = 'red';
	o.noDataOpacity = '1.0';
	o.noDataStroke = 'white';
	o.onelementClick = '';
	o.ongetData = '';
	o.ongetLabelX = '';
	o.ongetLabelY = '';
	o.ongetSeriesColor = '';
	o.ongetTimeEvents = '';
	o.ongetcontroller = '';
	o.onnotifyView = '';
	o.onrenderData = '';
	o.onrenderPlotArea = '';
	o.onshowTooltip = '';
	o.plotAreaStyle = '';
	o.plotEdgeStyle = '';
	o.plotStyle = '';
	o.plotToEdge = true;
	o.preserveAspectRatio = 'none';
	o.scrollButtonStyle = '';
	o.scrollLeft = '0';
	o.selectedItem = '-1';
	o.selectedItemStyle = 'stroke:darkgreen;stroke-width:3px;';
	o.selectedSeries = '-1';
	o.seriesColorScheme = 'tuscan';
	o.seriesColors = '';
	o.seriesColorsOverride = '';
	o.seriesCount = '';
	o.seriesNames = '';
	o.seriesNumber = '';
	o.seriesSize = '';
	o.seriesYAxes = '';
	o.showMultiples = false;
	o.startTime = '';
	o.stripeStyle = '';
	o.stripesVisible = false;
	o.subtitle = '';
	o.subtitleStyle = '';
	o.tag = '';
	o.textSize = 'medium';
	o.timeBased = false;
	o.title = '';
	o.titleAlign = 'center';
	o.titleBoxStyle = '';
	o.titleImage = '';
	o.titleImageStyle = '';
	o.titleStyle = '';
	o.titleX = '';
	o.titleY = '';
	o.tooltipRectStyle = '';
	o.unselectedItemStyle = 'opacity:0.5;';
	o.valueBoxStyle = '';
	o.valueLabelFormat = '';
	o.valueLabelStyle = '';
	o.valueLabelsVisible = false;
	o.warnIfNoData = false;
	o.xAxis = null;
	o.yAxis = null;
	o.yAxisList = new Array();
}
function _ZEN_SVGComponent_chart_serialize(set,s)
{
	var o = this;s[0]='1458973926';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.appearance;s[7]=(o.autoScaleText?1:0);s[8]=o.aux;s[9]=o.axisLineStyle;s[10]=o.axisTitleStyle;s[11]=o.backgroundStyle;s[12]=o.bandLower;s[13]=o.bandLowerStyle;s[14]=o.bandUpper;s[15]=o.bandUpperStyle;s[16]=o.baseLineStyle;s[17]=o.borderOffset;s[18]=o.borderRadius;s[19]=o.borderStyle;s[20]=(o.boundless?1:0);s[21]=o.controller;s[22]=o.controllerId;s[23]=o.currMultiple;s[24]=o.currYAxis;s[25]=o.endTime;s[26]=o.gridStyle;s[27]=(o.hasZoom?1:0);s[28]=o.height;s[29]=(o.hidden?1:0);s[30]=o.hzZoomStep;s[31]=o.indicatorStyle;s[32]=(o.indicatorsVisible?1:0);s[33]=o.labelStyle;s[34]=(o.labelsVisible?1:0);s[35]=o.legendHeight;s[36]=o.legendLabelStyle;s[37]=o.legendRectStyle;s[38]=o.legendStyle;s[39]=o.legendTitle;s[40]=o.legendVisible;s[41]=o.legendWidth;s[42]=o.legendX;s[43]=o.legendY;s[44]=o.lineStyle;s[45]=o.marginBottom;s[46]=o.marginLeft;s[47]=o.marginRight;s[48]=o.marginTop;s[49]=o.markerScale;s[50]=o.markerShapes;s[51]=o.markerStyle;s[52]=(o.markersVisible?1:0);s[53]=o.maxLabelLen;s[54]=o.msgIfNoData;s[55]=o.multipleTitleStyle;s[56]=o.noDataFill;s[57]=o.noDataOpacity;s[58]=o.noDataStroke;s[59]=o.onclick;s[60]=o.onelementClick;s[61]=o.ongetData;s[62]=o.ongetLabelX;s[63]=o.ongetLabelY;s[64]=o.ongetSeriesColor;s[65]=o.ongetTimeEvents;s[66]=o.ongetcontroller;s[67]=o.onnotifyView;s[68]=o.onrenderData;s[69]=o.onrenderPlotArea;s[70]=o.onshowTooltip;s[71]=o.onupdate;s[72]=o.plotAreaStyle;s[73]=o.plotEdgeStyle;s[74]=o.plotStyle;s[75]=(o.plotToEdge?1:0);s[76]=o.position;s[77]=o.preserveAspectRatio;s[78]=o.renderFlag;s[79]=o.scrollButtonStyle;s[80]=o.scrollLeft;s[81]=o.selectedItem;s[82]=o.selectedItemStyle;s[83]=o.selectedSeries;s[84]=o.seriesColorScheme;s[85]=o.seriesColors;s[86]=o.seriesColorsOverride;s[87]=o.seriesCount;s[88]=o.seriesNames;s[89]=o.seriesNumber;s[90]=o.seriesSize;s[91]=o.seriesYAxes;s[92]=(o.showMultiples?1:0);s[93]=o.startTime;s[94]=o.stripeStyle;s[95]=(o.stripesVisible?1:0);s[96]=o.subtitle;s[97]=o.subtitleStyle;s[98]=o.tag;s[99]=o.textSize;s[100]=(o.timeBased?1:0);s[101]=o.title;s[102]=o.titleAlign;s[103]=o.titleBoxStyle;s[104]=o.titleImage;s[105]=o.titleImageStyle;s[106]=o.titleStyle;s[107]=o.titleX;s[108]=o.titleY;s[109]=o.tooltipRectStyle;s[110]=o.tuple;s[111]=o.unselectedItemStyle;s[112]=o.valueBoxStyle;s[113]=o.valueLabelFormat;s[114]=o.valueLabelStyle;s[115]=(o.valueLabelsVisible?1:0);s[116]=o.viewBoxHeight;s[117]=o.viewBoxWidth;s[118]=(o.visible?1:0);s[119]=(o.warnIfNoData?1:0);s[120]=o.width;s[121]=o.x;s[122]=set.addObject(o.xAxis,'xAxis');s[123]=o.y;s[124]=set.addObject(o.yAxis,'yAxis');s[125]=set.serializeList(o,o.yAxisList,true,'yAxisList');
}
function _ZEN_SVGComponent_chart_getSettings(s)
{
	s['name'] = 'string';
	s['appearance'] = 'enum:2D,3D';
	s['autoScaleText'] = 'boolean';
	s['axisLineStyle'] = 'svgStyle';
	s['axisTitleStyle'] = 'svgStyle';
	s['backgroundStyle'] = 'svgStyle';
	s['bandLower'] = 'float';
	s['bandLowerStyle'] = 'svgStyle';
	s['bandUpper'] = 'float';
	s['bandUpperStyle'] = 'svgStyle';
	s['baseLineStyle'] = 'svgStyle';
	s['borderOffset'] = 'integer';
	s['borderRadius'] = 'integer';
	s['borderStyle'] = 'svgStyle';
	s['controllerId'] = 'id';
	s['currYAxis'] = 'integer';
	s['endTime'] = 'string';
	s['gridStyle'] = 'svgStyle';
	s['hasZoom'] = 'boolean';
	s['indicatorStyle'] = 'svgStyle';
	s['indicatorsVisible'] = 'boolean';
	s['labelStyle'] = 'svgStyle';
	s['labelsVisible'] = 'boolean';
	s['legendHeight'] = 'length';
	s['legendLabelStyle'] = 'svgStyle';
	s['legendRectStyle'] = 'svgStyle';
	s['legendStyle'] = 'svgStyle';
	s['legendTitle'] = 'caption';
	s['legendVisible'] = 'enum:auto,false,true';
	s['legendWidth'] = 'length';
	s['legendX'] = 'length';
	s['legendY'] = 'length';
	s['lineStyle'] = 'svgStyle';
	s['marginBottom'] = 'length';
	s['marginLeft'] = 'length';
	s['marginRight'] = 'length';
	s['marginTop'] = 'length';
	s['markerScale'] = 'float';
	s['markerShapes'] = 'csv';
	s['markerStyle'] = 'svgStyle';
	s['markersVisible'] = 'boolean';
	s['maxLabelLen'] = 'integer';
	s['msgIfNoData'] = 'caption';
	s['multipleTitleStyle'] = 'svgStyle';
	s['noDataFill'] = 'color';
	s['noDataOpacity'] = 'float';
	s['noDataStroke'] = 'color';
	s['onelementClick'] = 'eventHandler';
	s['ongetData'] = 'eventHandler';
	s['ongetLabelX'] = 'eventHandler';
	s['ongetLabelY'] = 'eventHandler';
	s['ongetSeriesColor'] = 'eventHandler';
	s['ongetTimeEvents'] = 'eventHandler';
	s['ongetcontroller'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	s['onrenderData'] = 'eventHandler';
	s['onrenderPlotArea'] = 'eventHandler';
	s['onshowTooltip'] = 'eventHandler';
	s['plotAreaStyle'] = 'svgStyle';
	s['plotEdgeStyle'] = 'svgStyle';
	s['plotStyle'] = 'svgStyle';
	s['plotToEdge'] = 'boolean';
	s['scrollButtonStyle'] = 'svgStyle';
	s['selectedItem'] = 'integer';
	s['selectedItemStyle'] = 'svgStyle';
	s['selectedSeries'] = 'integer';
	s['seriesColorScheme'] = 'enum:urban,tuscan,caribbean,rustbelt,bright,glow,gray,pastel,solid';
	s['seriesColors'] = 'csv';
	s['seriesColorsOverride'] = 'csv';
	s['seriesCount'] = 'integer';
	s['seriesNames'] = 'csv';
	s['seriesNumber'] = 'integer';
	s['seriesSize'] = 'integer';
	s['seriesYAxes'] = 'csv';
	s['showMultiples'] = 'boolean';
	s['startTime'] = 'string';
	s['stripeStyle'] = 'svgStyle';
	s['stripesVisible'] = 'boolean';
	s['subtitle'] = 'caption';
	s['subtitleStyle'] = 'svgStyle';
	s['textSize'] = 'enum:small,medium,large';
	s['timeBased'] = 'boolean';
	s['title'] = 'caption';
	s['titleAlign'] = 'enum:center,left,right';
	s['titleBoxStyle'] = 'svgStyle';
	s['titleImage'] = 'uri';
	s['titleImageStyle'] = 'svgStyle';
	s['titleStyle'] = 'svgStyle';
	s['titleX'] = 'length';
	s['titleY'] = 'length';
	s['tooltipRectStyle'] = 'svgStyle';
	s['unselectedItemStyle'] = 'svgStyle';
	s['valueBoxStyle'] = 'svgStyle';
	s['valueLabelFormat'] = 'string';
	s['valueLabelStyle'] = 'svgStyle';
	s['valueLabelsVisible'] = 'boolean';
	s['warnIfNoData'] = 'boolean';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_chart_acquireData = function() {
var controller = this.getController();
if (null == controller) {
this.connectToController();
controller = this.getController();
}
var seriesNumber = parseInt(this.seriesNumber);
if (controller) {
var dims = controller.getDimensions();
this.seriesSize = controller.getDimSize(1);
this.seriesCount = controller.getDimSize(2);
this._dataSeries = controller.getDataAsArrays();
if (null == this._dataSeries) {
this._dataSeries = [];
var size = !this.usePercentForRange() ? this.getSeriesSize() : this.getSeriesCount();
for (var n = 0; n < size; n++) {
this._dataSeries[n] = [];
}
}
if (!this.hasAxes()) {
var size = !this.usePercentForRange() ? this.getSeriesSize() : this.getSeriesCount();
var snames = new Array();
for (var n = 0; n < size; n++) {
snames[n] = controller.getLabel(n,1);
}
this.seriesNames = snames.join(',');
}
}
else {
var scount = this.getSeriesCount();
this._dataSeries = new Array(scount);
var sz = 0;
for (var s = 0; s < scount; s++) {
if (isNaN(seriesNumber) || (s==seriesNumber)) {
this._dataSeries[s] = this.acquireSeriesData(s);
sz = (this._dataSeries[s].length > sz) ? this._dataSeries[s].length : sz;
}
}
if (this.seriesSize==='') {
this.seriesSize = sz;
}
}
}

self._ZEN_SVGComponent_chart_acquireSeriesData = function(series) {
var data = null;
var seriesNumber = parseInt(this.seriesNumber);
if (!isNaN(seriesNumber) && (series!=seriesNumber)) {
return data;
}
if (''!=this.ongetData) {
data = zenInvokeCallbackMethod(this.ongetData,this,'ongetData','series',series);
if (null != data) {
return data;
}
}
var data = new Array(this.seriesSize);
for (var i = 0; i < this.seriesSize; i++) {
data[i] = 0;
}
return data;
}

self._ZEN_SVGComponent_chart_adjustChartTitle = function() {
switch(this.titleAlign) {
case 'left':
var tx = ('' != this.titleX) ? this.xToLogical(this.titleX) : (8/this._scaleX + this._marginLeft + this._titleImageWidth + this._titleImageLeft);
break;
case 'right':
var tx = ('' != this.titleX) ? this.xToLogical(this.titleX) : (this._plotLeft + this._rplotWidth - 8/this._scaleX);
break;
case 'center':
default:
var tx = ('' != this.titleX) ? this.xToLogical(this.titleX) : (this._plotLeft + this._rplotWidth / 2);
break;
}
var ty = 0;
var text = this.findSVGElement('chartTitle'+this.currMultiple);
if (text) {
var ty = ('' != this.titleY) ? this.yToLogical(this.titleY) : (text.getAttribute("logicalHeight")*1.2);
text.setAttribute("transform","translate("+(tx*this._scaleX)+","+(ty*this._scaleY)+")");
}
var stext = this.findSVGElement('chartSubtitle'+this.currMultiple);
if (stext) {
var ty = ty + (('' != this.titleY) ? this.yToLogical(this.titleY) : (stext.getAttribute("logicalHeight")*1.2));
stext.setAttribute("transform","translate("+(tx*this._scaleX)+","+(ty*this._scaleY)+")");
}
var trect = this.findSVGElement('chartTitleBox'+this.currMultiple);
if (trect) {
trect.setAttribute("x", this._plotLeft*this._scaleX);
trect.setAttribute("y", 2);	// 2 pixels
trect.setAttribute("width", this._rplotWidth*this._scaleX);
trect.setAttribute("height",(this._marginTop*this._scaleY) - 4);
}
if (trect) {
var parent = trect.parentNode;
parent.removeChild(trect);
parent.appendChild(trect);
}
if (text) {
var parent = text.parentNode;
parent.removeChild(text);
parent.appendChild(text);
}
if (stext) {
var parent = stext.parentNode;
parent.removeChild(stext);
parent.appendChild(stext);
}
var image = this.findSVGElement('chartTitleImage'+this.currMultiple);
if (image) {
image.setAttribute('x',(this._marginLeft+this._titleImageLeft) * this._scaleX);
image.setAttribute('y',2 + this._titleImageTop * this._scaleY);
var parent = image.parentNode;
parent.removeChild(image);
parent.appendChild(image);
}
var svgLegendGroup = this.findSVGElement('legendGroup');
if (svgLegendGroup) {
var lh = svgLegendGroup.getAttribute('height');
if (lh > this._plotHeight) {
svgLegendGroup.setAttribute('height',(this._plotHeight*this._scaleY));
}
}
}

self._ZEN_SVGComponent_chart_btnTimerHandler = function(left) {
delete this._timerId;
this.scrollHandler(left);
this._interval = (this._interval) ? this._interval + 0.5 : 1;
this._timerId = window.setTimeout("zenPage.getComponent(" + this.index + ").btnTimerHandler("+(left?'true':'false')+")",100);
}

self._ZEN_SVGComponent_chart_calculateAxisConstraints = function() {
delete this._xMinValue;
delete this._xMaxValue;
delete this._yMinValue;
delete this._yMaxValue;
this._yMaxValue = [];
this._yMinValue = [];
this._yBaseValue = [];
this._yRange = [];
var range = [];
var xOnly = false;
this._xBaseValue = this.xAxis ? this.xAxis.baseValue : '';
this._xMinValue = this.xAxis ? this.xAxis.minValue : '';
this._xMaxValue = (this.xAxis ? this.xAxis.maxValue : '');
var yaCount = this.getYAxisCount();
if ('category'==this._yGridType && 'value'==this._xGridType) {
range[0] = this.findDataRange(-1);
xOnly = true;
}
else {
for (var yAxisNo = 0; yAxisNo < yaCount; yAxisNo++) {
range[yAxisNo] = this.findDataRange(yAxisNo);
}
}
for (var yAxisNo = 0; yAxisNo < yaCount; yAxisNo++) {
var yAxis = this.getYAxis(yAxisNo);
this._yBaseValue[yAxisNo] = yAxis ? yAxis.baseValue : '';
this._yMinValue[yAxisNo] = yAxis ? yAxis.minValue : '';
this._yMaxValue[yAxisNo] = yAxis ? yAxis.maxValue : '';
if ('value'==this._yGridType && isNaN(parseFloat(this._yMajorUnits[yAxisNo]))) {
var max,min,scale;
if (!this.usePercentForRange()) {
max = isNaN(parseFloat(this._yMaxValue[yAxisNo])) ? parseFloat(range[yAxisNo].maxValue) : this._yMaxValue[yAxisNo];
min = isNaN(parseFloat(this._yMinValue[yAxisNo])) ? parseFloat(range[yAxisNo].minValue) : this._yMinValue[yAxisNo];
max = isNaN(max) ? 0 : max;
min = isNaN(min) ? 0 : min;
scale = this.findScaleUnits(max - min);
} else {
max = 100;
min = 0;
scale = 20;
}
this._yMajorUnits[yAxisNo] = scale;
if (isNaN(parseFloat(this._yLabelUnits[yAxisNo]))) {
this._yLabelUnits[yAxisNo] = this._yMajorUnits[yAxisNo];
}
if (isNaN(parseFloat(this._yMinorUnits[yAxisNo]))) {
this._yMinorUnits[yAxisNo] = this._yMajorUnits[yAxisNo] / 5;
}
}
else if ('category'==this._yGridType && isNaN(parseFloat(this._yMajorUnits[yAxisNo]))) {
var scale = 1;
var size = !this.usePercentForRange() ? this.getSeriesSize() : this.getSeriesCount();
var f = (size%5==0) ? 5 : 2;
while (size/scale > 10) {
scale *= f;
}
this._yMajorUnits[yAxisNo] = scale;
if (isNaN(parseFloat(this._yLabelUnits[yAxisNo]))) {
this._yLabelUnits[yAxisNo] = 1;
}
}
} // yAxisNo
if ('value'==this._xGridType && isNaN(parseFloat(this._xMajorUnits))) {
if ('value'==this._yGridType) {
var max = isNaN(parseFloat(this._xMaxValue)) ? parseFloat(range[0].maxValue2) : this._xMaxValue;
var min = isNaN(parseFloat(this._xMinValue)) ? parseFloat(range[0].minValue2) : this._xMinValue;
}
else {
var max = isNaN(parseFloat(this._xMaxValue)) ? parseFloat(range[0].maxValue) : this._xMaxValue;
var min = isNaN(parseFloat(this._xMinValue)) ? parseFloat(range[0].minValue) : this._xMinValue;
}
if (!this.usePercentForRange()) {
max = isNaN(max) ? 0 : max;
min = isNaN(min) ? 0 : min;
var scale = this.findScaleUnits(max - min);
}
else {
max = 100;
min = 0;
scale = 20;
}
this._xMajorUnits = scale;
if (isNaN(parseFloat(this._xLabelUnits))) {
this._xLabelUnits = this._xMajorUnits;
}
if (isNaN(parseFloat(this._xMinorUnits))) {
this._xMinorUnits = this._xMajorUnits / 5;
}
}
else if ('category'==this._xGridType && isNaN(parseFloat(this._xMajorUnits))) {
this._xMajorUnits = 1;
this._xLabelUnits = 1;
}
var	useSum = this.useSumForRange();
if (!xOnly) {
for (var yAxisNo = 0; yAxisNo < yaCount; yAxisNo++) {
var yAxis = this.getYAxis(yAxisNo);
this._yBaseValue[yAxisNo] = yAxis ? yAxis.baseValue : '';
this._yMinValue[yAxisNo] = yAxis ? yAxis.minValue : '';
this._yMaxValue[yAxisNo] = yAxis ? yAxis.maxValue : '';
if ((useSum||(parseFloat(range[yAxisNo].minValue)<0)) && this._yBaseValue[yAxisNo]==='') {
this._yBaseValue[yAxisNo] = 0;
}
if (isNaN(parseFloat(this._yMinValue[yAxisNo]))) {
var val = (false&&this.useSumForRange()) ? (isNaN(parseFloat(this._yBaseValue[yAxisNo])) ? range[yAxisNo].minValue : this._yBaseValue[yAxisNo]) : range[yAxisNo].minValue;
if (0!=this._yMajorUnits[yAxisNo]) {
val = Math.floor(val / this._yMajorUnits[yAxisNo]) * this._yMajorUnits[yAxisNo];
}
this._yMinValue[yAxisNo] = val;
}
if (isNaN(parseFloat(this._yMaxValue[yAxisNo]))) {
var val = range[yAxisNo].maxValue;
if (0!=this._yMajorUnits[yAxisNo]) {
val = Math.ceil((val*1.01) / this._yMajorUnits[yAxisNo]) * this._yMajorUnits[yAxisNo];
}
this._yMaxValue[yAxisNo] = val;
}
this._yRange[yAxisNo] = (this._yMaxValue[yAxisNo] - this._yMinValue[yAxisNo]);
} // yAxisNo
}
if ((useSum||(parseFloat(range[0].minValue)<0)) && this._xBaseValue==='') {
this._xBaseValue = 0;
}
if (this.isTimeBased()) {
var items = this.getSeriesSize();
for (var n = 0; n < items; n++) {
var time = this.getXLabelText(n,1,true);
var d = zenStringToDate(time);
if (d) {
var hms = time.toString().split(' ')[1];
if (hms) {
var t = hms.split(':');
if (t[0]) {	d.setHours(parseInt(t[0],10));}
if (t[1]) {	d.setMinutes(parseInt(t[1],10));}
if (t[2]) {	d.setSeconds(parseInt(t[2]),10);}
}
var val = d.getTime()/1000;
this._xMinValue = (isNaN(parseFloat(this._xMinValue))) ? val : (val < this._xMinValue) ? val : this._xMinValue;
this._xMaxValue = (isNaN(parseFloat(this._xMaxValue))) ? val : (val > this._xMaxValue) ? val : this._xMaxValue;
}
}
this._xRange = (this._xMaxValue - this._xMinValue);
}
else {
if (isNaN(parseFloat(this._xMinValue))) {
if ('value'==this._yGridType) {
var val = range[0].minValue2;
}
else {
var val = (false&&this.useSumForRange()) ? (isNaN(parseFloat(this._xBaseValue)) ? range[0].minValue : this._xBaseValue) : range[0].minValue;
}
if (0!=this._xMajorUnits) {
val = Math.floor(val / this._xMajorUnits) * this._xMajorUnits
}
this._xMinValue = val;
}
if (isNaN(parseFloat(this._xMaxValue))) {
var val = ('value'==this._yGridType) ? range[0].maxValue2 : range[0].maxValue;
if (0!=this._xMajorUnits) {
val = Math.ceil(val / this._xMajorUnits) * this._xMajorUnits
}
this._xMaxValue = val;
}
if (this.chartPivot && this.valueLabelsVisible && this.usePercentForRange()) { // if we have horizontal value labels, and we are a percentage bar-chart, allow some room at right to place them
this._xMaxValue *= 1.1;
}
this._xRange = (this._xMaxValue - this._xMinValue);
}
}

self._ZEN_SVGComponent_chart_calculateRangeValues = function() {
var is3D = this.is3D();
var hasAxes = this.hasAxes();
if (hasAxes) {
this.initializeAxisProperties();
this.calculateAxisConstraints();
}
var adj = (is3D ? 5:0);
if (this._xLabelOnTheBottom) {
var xAHtop = (10/this._scaleY);
var xAHbot = (hasAxes) ? this.calculateXAxisHeight() : (10/this._scaleY);
}
else {
var xAHtop = (hasAxes) ? this.calculateXAxisHeight() : (10/this._scaleY);
var xAHbot = (10/this._scaleY);
}
var computeLeft = false;
if (this.marginLeft==='') {
if (hasAxes && this._yLabelOnTheLeft) {
this._marginLeft = this.calculateYAxisWidth('left');
}
else {
this._marginLeft = 10/this._scaleX;
}
if (this._firstXLabelWidth && this._marginLeft<this._firstXLabelWidth/2) {
this._marginLeft = this._firstXLabelWidth/2;
}
}
else {
this._marginLeft = this.xToLogical(this.marginLeft);
}
if (this.marginRight==='') {
if (hasAxes && this._yLabelOnTheRight) {
this._marginRight = this.calculateYAxisWidth('right') + (this._legendWidth?this._legendWidth:0);
}
else {
this._marginRight = (this._legendWidth?this._legendWidth:(10/this._scaleX));
}
if (this._lastXLabelWidth && this._marginRight<(this._lastXLabelWidth*1.1)/2) {
this._marginRight = (this._lastXLabelWidth*1.1)/2;
}
}
else {
this._marginRight = this.xToLogical(this.marginRight);
}
if ((this._marginLeft + this._marginRight) > 100) {
this._marginRight = 100 - this._marginLeft;		// DTB197 - Keep marginLeft large, since it is the trigger to remove axes due to lack of space!
}
this._plotLeftOut = this._marginLeft;
this._plotLeft = this._plotLeftOut + adj;
this._rplotRight = 100 - this._marginRight;
this._rplotRightOut = this._rplotRight - adj;
this._rplotWidth = (100 - (this._marginLeft + this._marginRight + adj));
if (hasAxes) {
var hzScale = 1.0;
var items = !this.usePercentForRange() ? this.getSeriesSize() : this.getSeriesCount();
if (this.hzZoomStep > 0) {
var itemsPerPage = items % 2 ? items+1 : items;
var n = parseInt(this.hzZoomStep);
this.hzZoomStep = 0;
while (n > 0 && itemsPerPage >= 2) {
this.hzZoomStep++;
itemsPerPage = Math.floor(itemsPerPage/2);
n--;
}
hzScale = items / itemsPerPage;
}
this._plotWidth = this._rplotWidth * hzScale;
this._plotRight = this._plotLeft + this._plotWidth;
this._hzMaxStep = Math.floor(Math.log(items)/Math.log(2));
this._maxScrollLeft = this._plotWidth - this._rplotWidth;
this.scrollLeft = (this.scrollLeft < 0) ? 0 : this.scrollLeft;
this.scrollLeft = (this.scrollLeft > this._maxScrollLeft) ? this._maxScrollLeft : this.scrollLeft;
}
else {
this._plotWidth = this._rplotWidth;
}
if (''!==this.marginTop) {
this._marginTop = this.yToLogical(this.marginTop);
}
else {
this._marginTop = this._titleHeight + xAHtop;
if (this._marginTop < 3) {
this._marginTop = 3;
}
}
if (this.marginBottom==='') {
this._marginBottom = xAHbot + (this._controlBarH/this._scaleY)	;
}
else {
this._marginBottom = this.yToLogical(this.marginBottom) + (this._controlBarH/this._scaleY);
}
if ((this._marginBottom + this._marginTop) > 100) {
this._marginBottom = 100 - this._marginTop;
}
this._plotTop = this._marginTop;
this._plotTopOut = this._plotTop + adj;
this._plotBottomOut = 100 - this._marginBottom;
this._plotBottom = this._plotBottomOut - adj;
this._plotHeight = (100 - (this._marginTop + this._marginBottom + adj));
}

self._ZEN_SVGComponent_chart_calculateXAxisHeight = function() {
var idx=[];
var lWidth=[];
var maxWidth = 0;
var maxHeight = 0;
var dx = 0;
this._firstXLabelWidth = null;
this._lastXLabelWidth = null;
var plotWidth = this._plotWidth ? this._plotWidth : 100;
if (this.isTimeBased()) {
if (this.labelsVisible) {
var maxHeight = 20/this._scaleY;
}
}
else {
if (this.labelsVisible && this._xLabelUnits > 0) {
var tStyle = this.computeStyle('chart-xLabel',null);
if (this.labelStyle) this.integrateStyleSpec(tStyle,this.labelStyle);
if (this._xLabelStyle) this.integrateStyleSpec(tStyle,this._xLabelStyle);
var fSz = this.getComputedFontSize(tStyle, 12, 8, 16);
var txtH = fSz;
if (!this.autoScaleText) {
txtH = fSz*this.getPelToPixelVRatio();
}
this._xAxisLabelH = txtH;
var angle = 0;
if (this._xLabelAngle) angle= -this._xLabelAngle;
if (this._xGridType == 'value') {
var start = Math.ceil(Math.abs(this._xMinValue/this._xLabelUnits))*this._xLabelUnits*(this._xMinValue>=0 ? 1 : -1);
var end = Math.floor(Math.abs(this._xMaxValue/this._xLabelUnits))*this._xLabelUnits*(this._xMaxValue>=0 ? 1 : -1);
dx = this.getPlotX(start + this._xLabelUnits) - this.getPlotX(start);
var limit = 0;
for (var v = start; v <= end && limit < 100; v += this._xLabelUnits, limit++) {
idx[limit]=v;
var text =this.createXLabelNode(v, fSz, tStyle, 0, this.svgGroup);
lWidth[limit] = parseFloat(text.getAttribute("logicalWidth"));
if (lWidth[limit]>maxWidth) maxWidth=lWidth[limit];
this.svgGroup.removeChild(text);
if (v==start) {
this._firstXLabelWidth = parseFloat(text.getAttribute("logicalWidth"));
}
else if (v>=end) {
this._lastXLabelWidth = parseFloat(text.getAttribute("logicalWidth"));
}
}
}
else {
var items = !this.usePercentForRange() ? this.getSeriesSize() : this.getSeriesCount();
if (this.plotToEdge) {
dx = (items<=1) ? (plotWidth/2) : (plotWidth / (items-1));
}
else {
dx = (items<=1) ? (plotWidth/2) : (plotWidth / items);
}
var limit = 0;
for (var n = 0; n < items; n++) {
if (n%this._xLabelUnits ==0) {
idx[limit]=n;
var text =this.createXLabelNode(n, fSz, tStyle, 0, this.svgGroup);
lWidth[limit] = parseFloat(text.getAttribute("logicalWidth"));
if (lWidth[limit]>maxWidth) maxWidth=lWidth[limit];
this.svgGroup.removeChild(text);
limit++;
}
}
}
if (dx<maxWidth) { // Houston, we have a problem...
if (!this.autoScaleText || this._xGridType != 'value' ) {
var nDx = dx;
if (!this.autoScaleText) nDx = (dx*this._scaleX)/this.getPelToPixelHRatio();
angle = -90;
}
}
for (var n=0;n<idx.length;n++) {
var text = this.createXLabelNode(idx[n], fSz, tStyle, angle, this.svgGroup);
var h = parseFloat(text.getAttribute("effectiveHeight"));
if (this.plotToEdge) {
if (n==0) {
this._firstXLabelWidth = parseFloat(text.getAttribute("logicalWidth"));
}
else if (n>=idx.length-1) {
this._lastXLabelWidth = parseFloat(text.getAttribute("logicalWidth"));
}
}
if (h>maxHeight) maxHeight = h;
this.svgGroup.removeChild(text);
}
}
}
var xAxisTitleH = this.calculateXAxisTitleHeight();
this._maxXHeight = maxHeight;
var tH = xAxisTitleH*1.1 + maxHeight*1.1 + 2*this.getPelToPixelVRatio();
return(tH);
}

self._ZEN_SVGComponent_chart_calculateXAxisTitleHeight = function() {
var hgt = 0;
var xAxisTitle = this.getXAxisTitle();
if (xAxisTitle != '') {
hgt = this.renderXAxisTitle(this.svgGroup);
var xt = this.findSVGElement('xAxisTitle'+this.currMultiple);
this.svgGroup.removeChild(xt);
}
return hgt;
}

self._ZEN_SVGComponent_chart_calculateYAxisWidth = function(which) {
var yAxisNo = this.getCurrYAxis(which);
var yAxisTitle = this.getYAxisTitle(which);
var w=0;
var wTitle = 0;		// DTB197
if (zenIsMissing(this.document)) return(0);
var is3D = this.is3D();
var group = this.prepareAxisGroup('yLabelGroup'+which+this.currMultiple,this.svgGroup);
if ('' != yAxisTitle) {
var tStyle = this.computeStyle('chart-yAxisTitle',null);
if (this.axisTitleStyle) this.integrateStyleSpec(tStyle,this.axisTitleStyle);
var fSz = this.getComputedFontSize(tStyle, 12, 8, 16);
var text = this.createSVGTextNode(yAxisTitle,fSz,this.autoScaleText,"middle",-90,group);
text.setAttribute("class","chart-yAxisTitle");
this.embedStyle(text.firstChild,tStyle);
w += parseFloat(text.getAttribute("effectiveWidth"))*1.1;
wTitle = w;		// DTB197 - preserve the title-only width in case we need it later
}
var mW = 0;
if (this.labelsVisible) {
var tStyle = this.computeStyle('chart-yLabel',null);
if (this.labelStyle) this.integrateStyleSpec(tStyle,this.labelStyle);
if (this._yLabelStyle[yAxisNo]) this.integrateStyleSpec(tStyle,this._yLabelStyle[yAxisNo]);
var fSz = this.getComputedFontSize(tStyle, 12, 8, 16);
var tw = 0;
var rotate = (this._yLabelAngle[yAxisNo] != '' && this._yLabelAngle[yAxisNo] != 0);
var angle = 0;
if (this._yLabelAngle[yAxisNo]) angle= -this._yLabelAngle[yAxisNo];
if (angle>0) angle = 0;
if (angle<-60) angle = -60;
if (this._yGridType == 'value') {
var start = Math.ceil(Math.abs(this._yMinValue[yAxisNo]/this._yLabelUnits[yAxisNo]))*this._yLabelUnits[yAxisNo]*(this._yMinValue[yAxisNo]>=0 ? 1 : -1);
var end = Math.floor(Math.abs(this._yMaxValue[yAxisNo]/this._yLabelUnits[yAxisNo]))*this._yLabelUnits[yAxisNo]*(this._yMaxValue[yAxisNo]>=0 ? 1 : -1);
var limit = 0;
for (var v = start; v <= end && limit < 100; v += this._yLabelUnits[yAxisNo], limit++) {
lbl = this.getYLabelText(v,yAxisNo);
var text = this.createSVGTextNode(lbl,fSz,this.autoScaleText, "end", angle, group);
text.setAttribute("class","chart-yLabel");
this.embedStyle(text.firstChild,tStyle);
tw = parseFloat(text.getAttribute("effectiveWidth"));
mW = (mW < tw) ? tw : mW;
}
}
else {
var items = !this.usePercentForRange() ? this.getSeriesSize() : this.getSeriesCount();
if (items > 0) {
for (var n = 0; n < items; n++) {
var lbl = this.getYLabelText(n,yAxisNo);
var text = this.createSVGTextNode(lbl,fSz,this.autoScaleText, "end", angle, group);
text.setAttribute("class","chart-yLabel");
this.embedStyle(text.firstChild,tStyle);
tw = parseFloat(text.getAttribute("effectiveWidth"));
mW = (mW < tw) ? tw : mW;
}
}
}
}
w += mW + (1.5/this._scaleX);
this.prepareAxisGroup('yLabelGroup'+which+this.currMultiple);
if ((w>50)&&this.autoScaleText) {
w = 50;
} else {
if (!this.labelsVisible) {
w = wTitle + (10/this._scaleX);
}
}
return(w);
}

self._ZEN_SVGComponent_chart_chartElementClickHandler = function(evt,series,item) {
evt.stopPropagation();
if (this._tooltip) {
this.hideToolTip();
}
this.selectElement(series!==null?series:-1,item!==null?item:-1);
zenInvokeCallbackMethod(this.onelementClick,this,'onelementClick','chart',this);
}

self._ZEN_SVGComponent_chart_chartElementMouseOut = function(evt,series,item) {
evt.stopPropagation();
if (this._clientX != evt.clientX && this._clientY != evt.clientY) {
if (this._timerId) {
window.clearTimeout(this._timerId);
delete this._timerId;
}
if (this._tooltip) {
this.hideToolTip();
}
}
}

self._ZEN_SVGComponent_chart_chartElementMouseOver = function(evt,series,item) {
evt.stopPropagation();
if (this._timerId) {
window.clearTimeout(this._timerId);
delete this._timerId;
}
this._mouseOverSeries = series;
this._mouseOverItem = item;
this._clientX = evt.clientX;
this._clientY = evt.clientY;
this._timerId = window.setTimeout("zenPage.getComponent(" + this.index + ").showToolTip()",500);
}

self._ZEN_SVGComponent_chart_computeEffectiveExtents = function(x,y,w,h,angle) {
var rad = Math.PI*angle/180;
var sin = Math.sin(rad);
var cos = Math.cos(rad);
var minX = x*cos - y*sin;
var minY = x*sin + y*cos;
var maxX = minX;
var maxY = minY;
var nX = x;
var nY = y+h;
var rX = nX*cos - nY*sin;
if (rX<minX) minX=rX;
if (rX>maxX) maxX=rX;
var rY = nX*sin + nY*cos;
if (rY<minY) minY=rY;
if (rY>maxY) maxY=rY;
var nX = x+w;
var nY = y;
var rX = nX*cos - nY*sin;
if (rX<minX) minX=rX;
if (rX>maxX) maxX=rX;
var rY = nX*sin + nY*cos;
if (rY<minY) minY=rY;
if (rY>maxY) maxY=rY;
var nX = x+w;
var nY = y+h;
var rX = nX*cos - nY*sin;
if (rX<minX) minX=rX;
if (rX>maxX) maxX=rX;
var rY = nX*sin + nY*cos;
if (rY<minY) minY=rY;
if (rY>maxY) maxY=rY;
var ex = {};
ex.minX = minX;
ex.minY = minY;
ex.maxX = maxX;
ex.maxY = maxY;
ex.w=maxX-minX;
ex.h=maxY-minY;
return(ex);
}

self._ZEN_SVGComponent_chart_computeStyle = function(className,idName) {
var classSelector = "."+className;
var idSelector = "#"+idName;
var s = {}
s.attr = [];
s.value = [];
var ssa = document.styleSheets;
var ssl = ssa.length;
for(var si=0;si<ssl;si++) {
var ss=ssa[si];
var rA = null;
if (ss.href!=null && ss.href.indexOf("://")>0) {
if (ss.href.indexOf("http")!=0 && ss.href.indexOf("file")!=0) continue;
if (window.location && ss.href.indexOf(window.location.host)<0) continue;
}
if (ss.cssRules) {
rA = ss.cssRules;
}
else if (ss.rules) {
rA = ss.rules;
}
else return(s);
for (var ri=0; ri<rA.length;ri++) {
var rule = rA[ri];
if (rule.selectorText==classSelector) {
this.integrateStyleSpec(s,rule.style.cssText);
}
}
for (var ri=0; ri<rA.length;ri++) {
var rule = rA[ri];
if (rule.selectorText==idSelector) {
this.integrateStyleSpec(ss,rule.style.cssText);
}
}
}
return(s);
}

self._ZEN_SVGComponent_chart_computeXAxisTimeLine = function() {
var startTime = this.getStartTime();
var endTime = this.getEndTime();
var startDate = zenStringToDate(startTime);
var endDate = zenStringToDate(endTime);
var hms = startTime.toString().split(' ')[1];
if (hms) {
var t = hms.split(':');
if (t[0]) {	startDate.setHours(parseInt(t[0],10));}
if (t[1]) {	startDate.setMinutes(parseInt(t[1],10));}
if (t[2]) {	startDate.setSeconds(parseInt(t[2]),10);}
}
var hms = endTime.toString().split(' ')[1];
if (hms) {
var t = hms.split(':');
if (t[0]) {	endDate.setHours(parseInt(t[0],10));}
if (t[1]) {	endDate.setMinutes(parseInt(t[1],10));}
if (t[2]) {	endDate.setSeconds(parseInt(t[2],10));}
}
var spanSecs = (endDate - startDate)/1000;
var majorUnits = 'years';
var minorUnits = 'quarters';
var startUnits = 0;
var endUnits = 0;
if (spanSecs > (31536000*20)) {
majorUnits = 'decades';
minorUnits = 'years';
startUnits = Math.floor((startDate.getFullYear() - 1900) / 10);
endUnits = Math.floor((endDate.getFullYear() - 1900) / 10);
}
else if (spanSecs > (31536000*4)) {
majorUnits = 'years';
minorUnits = 'quarters';
startUnits = startDate.getFullYear() - 1900;
endUnits = endDate.getFullYear() - 1900;
}
else if (spanSecs > (31536000*2)) {
majorUnits = 'years';
minorUnits = 'months';
startUnits = startDate.getFullYear() - 1900;
endUnits = endDate.getFullYear() - 1900;
}
else if (spanSecs > (31536000)) {
majorUnits = 'quarters';
minorUnits = 'months';
startUnits = ((startDate.getFullYear()-1900)*4) + Math.floor(startDate.getMonth()/3);
endUnits = ((endDate.getFullYear()-1900)*4) + Math.floor(endDate.getMonth()/3);
}
else if (spanSecs > (24 * 3600 * 15)) {
majorUnits = 'months';
minorUnits = 'days';
startUnits = ((startDate.getFullYear()-1900)*12) + Math.floor(startDate.getMonth());
endUnits = ((endDate.getFullYear()-1900)*12) + Math.floor(endDate.getMonth());
}
else if (spanSecs > (24*60*60)) {
majorUnits = 'days';
minorUnits = 'hours';
startUnits = (startDate - this._date1900)/(24*60*60*1000);
endUnits = (endDate - this._date1900)/(24*60*60*1000);
}
else if (spanSecs > (60*60)) {
majorUnits = 'hours';
minorUnits = 'minutes';
startUnits = (startDate - this._date1900)/(60*60*1000);
endUnits = (endDate - this._date1900)/(60*60*1000);
}
else {
majorUnits = 'minutes';
minorUnits = 'seconds';
startUnits = (startDate - this._date1900)/(60*1000);
endUnits = (endDate - this._date1900)/(60*1000);
}
var plotWidth = this._rplotWidth;
this._pixPerSec = spanSecs>0 ? (plotWidth/spanSecs) : 0;
var offset = (startDate)/1000;
this._offset = offset;
this._startUnits = startUnits;
this._endUnits = endUnits;
this._majorUnits = majorUnits;
this._minorUnits = minorUnits;
}

self._ZEN_SVGComponent_chart_connectToController = function() {
this.controller = '';
if (!zenIsMissing(this.controllerId)) {
if (this.composite) {
this.controller = this.composite.getChildById(this.controllerId);
}
else {
this.controller = zenPage.getComponentById(this.controllerId);
}
if (this.controller && this.controller.register) {
this.controller.register(this);
}
else {
alert('ZEN: Unable to connect component to dataController (' + this.id + ').');
}
if (this.controller) {
if ('' == this.controller.modelError) {
this.controller.loadModel(false);
}
}
}
}

self._ZEN_SVGComponent_chart_createMarker = function(series,item,x,y,color,type,noevents) {
var marker;
var markerSize = 10;	// pixels
if (this._scaleX < 2) {
markerSize = 5;
}
switch (type) {
case 'square':
marker = this.document.createElementNS(SVGNS,"rect");
marker.setAttribute("x",-(markerSize*0.8)/2);
marker.setAttribute("y",-(markerSize*0.8)/2);
marker.setAttribute("width",(markerSize*0.8));
marker.setAttribute("height",(markerSize*0.8));
break;
case 'circle':
marker = this.document.createElementNS(SVGNS,"circle");
marker.setAttribute("cx",0);
marker.setAttribute("cy",0);
marker.setAttribute("r",markerSize/2);
break;
case 'down':
marker = this.document.createElementNS(SVGNS,"polyline");
var pts = [-markerSize/2,-markerSize/2, markerSize/2,-markerSize/2, 0,markerSize/2, -markerSize/2,-markerSize/2];
marker.setAttribute("points",pts.join(','));
break;
case 'up':
default:
marker = this.document.createElementNS(SVGNS,"polyline");
var pts = [-markerSize/2,markerSize/2, markerSize/2,markerSize/2, 0,-markerSize/2, -markerSize/2,markerSize/2];
marker.setAttribute("points",pts.join(','));
break;
}
var scale = '';
if ('' != this.markerScale) {
scale = "scale("+this.markerScale+","+this.markerScale+")";
}
marker.setAttribute("transform","translate("+(x*this._scaleX)+","+(y*this._scaleY)+")" + scale);
marker.setAttribute("isMarker",true);
marker.setAttribute("class","chart-seriesMarker");
marker.setAttribute("stroke",color);
marker.setAttribute("style",this.markerStyle + (series>=0?this.getSelectedStyle(series,item,true):''));
if (!noevents) {
marker.setAttribute('id',this.makeId('el'+this.currMultiple+'_' + series + '_' + item));
var sno = this.currMultiple=='' ? series : this.currMultiple;
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementClickHandler(evt,'+sno+','+item+');');
marker.addEventListener('click',f,false);
}
return marker;
}

self._ZEN_SVGComponent_chart_createSVGTextNode = function(caption,fontSize,autoScale,align,rotate,parentNode,txtClass,txtStyle) {
var debug=false;
var scaleX = this._scaleX;
var scaleY = this._scaleY;
var offsetAdj = 3;			// DTB197 - Pad size measurements to prevent collisions later on.
var textGroup = this.document.createElementNS(SVGNS,"g");
var text = this.document.createElementNS(SVGNS,"text");
if (debug) {
var box = this.document.createElementNS(SVGNS,"rect");
var bbox = this.document.createElementNS(SVGNS,"rect");
}
text.setAttribute("font-size",fontSize);
text.setAttribute("text-anchor",align);
if (txtClass) {
text.setAttribute("class",txtClass);
}
if (txtStyle) {
this.embedStyle(text,txtStyle);
}
text.setAttribute("x", 0);
text.setAttribute("y", 0);
var transform = ""
if (rotate!=0) {
transform = " rotate("+rotate+",0,0)";
text.setAttribute("transform",transform);
}
if (debug) {
box.setAttribute("transform",transform);
box.setAttribute("stroke","black");
box.setAttribute("stroke-width","1");
box.setAttribute("fill","none");
bbox.setAttribute("stroke","red");
bbox.setAttribute("stroke-width","1");
bbox.setAttribute("fill","yellow");
bbox.setAttribute("opacity",0.5);
}
if (caption===null) caption='';
var textNode = this.document.createTextNode(caption);
text.appendChild(textNode);
textGroup.appendChild(text);
if (debug) {
textGroup.appendChild(box);
textGroup.appendChild(bbox);
}
if (parentNode) {
parentNode.appendChild(textGroup);
var txtBB = zenGetBBox(text);
var lH = (txtBB.height/scaleY)*1.1;
var lW = (txtBB.width/scaleX)+offsetAdj;
var eH = lH;
var eW = lW;
var ex = null;
var yOfs = (txtBB.y/scaleY)*1.1;
var xOfs = (txtBB.x/scaleX)+offsetAdj;
if (rotate!=0) {
ex = this.computeEffectiveExtents(txtBB.x,txtBB.y,txtBB.width,txtBB.height,rotate);
eH = ex.h/scaleY;
eW = ex.w/scaleX;
yOfs = ex.minY/scaleY*1.1;
xOfs = ex.minX/scaleX+offsetAdj;
}
if (debug) {
box.setAttribute("x", txtBB.x);
box.setAttribute("y", txtBB.y);
box.setAttribute("width", txtBB.width);
box.setAttribute("height", txtBB.height);
bbox.setAttribute("x",xOfs*scaleX);
bbox.setAttribute("y",yOfs*scaleY);
bbox.setAttribute("width",eW*scaleX);
bbox.setAttribute("height",eH*scaleY);
}
text.setAttribute("logicalHeight",lH);
text.setAttribute("logicalWidth",lW);
textGroup.setAttribute("logicalHeight",lH);
textGroup.setAttribute("logicalWidth",lW);
text.setAttribute("effectiveHeight",eH);
text.setAttribute("effectiveWidth",eW);
textGroup.setAttribute("effectiveHeight",eH);
textGroup.setAttribute("effectiveWidth",eW);
text.setAttribute("xOffset",xOfs);
text.setAttribute("yOffset",yOfs);
textGroup.setAttribute("xOffset",xOfs);
textGroup.setAttribute("yOffset",yOfs);
}
return(textGroup);
}

self._ZEN_SVGComponent_chart_createXLabelNode = function(index,fontSize,style,angle,group) {
var align="middle";
if (angle==null) angle=0;
if (isNaN(angle)) angle=-60;
if (angle<-90) angle=-90;
if (angle>0) angle=0;
if (angle==-90) {
align='start';
}
var lbl = this.getXLabelText(index);
var text = this.createSVGTextNode(lbl,fontSize,this.autoScaleText,align,angle,group,"chart-xLabel",style);
return(text);
}

self._ZEN_SVGComponent_chart_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._ZEN_SVGComponent_chart_embedStyle = function(element,styleNVP) {
var s = styleNVP;
var styleString = '';
for (var i=0;i<s.attr.length;i++) {
var attr = s.attr[i];
switch (attr) {
case 'font-family':
styleString += attr + ':' + s.value[i] + ';';
break;
case 'text-shadow':
styleString += attr + ':' + s.value[i] + ';';
break;
default:
element.setAttribute(attr,s.value[i]);
styleString += attr + ':' + s.value[i] + ';';  // JSL4131
break;
}
}
if (styleString!='') {
element.setAttribute('style',styleString);
}
}

self._ZEN_SVGComponent_chart_findDataRange = function(yAxisNo) {
if (yAxisNo!=-1) {
yAxisNo = ('undefined' == typeof yAxisNo || isNaN(yAxisNo) || ''===yAxisNo) ? this.getCurrYAxis() : yAxisNo;
}
var range = new Object();
range.minValue = null;
range.maxValue = null;
range.minValue2 = null; // used by x/y type charts
range.maxValue2 = null;
var scount = this.getSeriesCount();
var items = this.getSeriesSize();
var	useSum = this.useSumForRange();
if (useSum) {
range.minValue = 0;
}
if (!this.usePercentForRange()) {
var hasData = false;
for (var n = 0; n < items; n++) {
var barTotal = null;
var areaTotal = null;
var barTotalNeg = null;
var areaTotalNeg = null;
for (var s = 0; s < scount; s++) {
if ((yAxisNo==-1) || (this._yAxisForSeries[s] == yAxisNo)) {
var group = this.getRangeGroupForSeries(s);
var data = this._dataSeries[s];
if (data) {
hasData = true;
var val = data[n];
if ('object'==typeof val) {
val = val.value;
}
if (!isNaN(parseFloat(val))) {
if (group=='bar') {
if (parseFloat(val)>=0) {
barTotal += parseFloat(val);
}
else {
barTotalNeg += parseFloat(val);
}
}
else if (group=='area') {
if (parseFloat(val)>=0) {
areaTotal += parseFloat(val);
}
else {
areaTotalNeg += parseFloat(val);
}
} else if (this.usePercentForRange()) {
}
else {
val = parseFloat(val);
range.minValue = (isNaN(range.minValue)) ? val : (val < range.minValue) ? val : range.minValue;
range.maxValue = (isNaN(range.maxValue)) ? val : (val > range.maxValue) ? val : range.maxValue;
}
}
}
}
}
if (!isNaN(barTotal)) {
range.minValue = (isNaN(range.minValue)) ? barTotal : (barTotal < range.minValue) ? barTotal : range.minValue;
range.maxValue = (isNaN(range.maxValue)) ? barTotal : (barTotal > range.maxValue) ? barTotal : range.maxValue;
if (useSum && barTotalNeg) {
range.minValue = (barTotalNeg < range.minValue) ? barTotalNeg : range.minValue;
}
}
if (!isNaN(areaTotal)) {
range.minValue = (isNaN(range.minValue)) ? areaTotal : (areaTotal < range.minValue) ? areaTotal : range.minValue;
range.maxValue = (isNaN(range.maxValue)) ? areaTotal : (areaTotal > range.maxValue) ? areaTotal : range.maxValue;
if (useSum && barTotalNeg) {
range.minValue = (areaTotalNeg < range.minValue) ? areaTotalNeg : range.minValue;
}
}
}
if (!hasData) {
range.minValue = 0;
range.maxValue = 0;
}
} else {
range.minValue = 0;
range.maxValue = 100;
}
return range;
}

self._ZEN_SVGComponent_chart_findScaleUnits = function(val) {
var scale = 0;
if (val > 0) {
var log = Math.LOG10E * Math.log(val);
var f = Math.floor(log);
if ((log - f) > .65) {
scale = Math.pow(10,f+1) / 5;
}
else if ((log - f) > .3) {
scale = (Math.pow(10,f) * 5) / 10;
}
else {
scale = (Math.pow(10,f) * 2) / 4;
}
}
return scale;
}

self._ZEN_SVGComponent_chart_formatNumeric = function(nStr) {
if (zenIsMissing(this.valueLabelFormat)) {
var yAxisNo = this.getCurrYAxis();
var yAxis = this.getYAxis(yAxisNo);
switch(yAxis?yAxis.axisType:'') {
case 'percent':
nStr = 100*nStr; // convert to a percentage
nStr += '%'; // convert to a string and a add percentage sign
break;
default:
nStr += ''; // convert to a string
break;
}
} else {
if (!isNaN(parseFloat(nStr))) {
nStr = zenFormatNumber(nStr,this.valueLabelFormat);
nStr += ''; // convert to a string
} else {
nStr += ''; // convert to a string (whatever it is)
}
}
x = nStr.split('.');
x1 = x[0];
x2 = x.length > 1 ? '.' + x[1] : '';
var rgx = /(\d+)(\d{3})/;
while (rgx.test(x1)) {
x1 = x1.replace(rgx, '$1' + ',' + '$2');
}
return x1 + x2;
}

self._ZEN_SVGComponent_chart_getCellInfo = function(cell,majorUnits,minorUnits,index) {
var caption = '';		// caption for cell
var startSecs = 0;		// number of secs at start of cell
var minorTicks = [];
switch(majorUnits) {
case 'decades':
var year = (parseInt(cell,10)*10) + 1900;
caption = year;
var d = new Date(year,0,1,0,0,0,0);
startSecs = d.getTime()/1000;
switch(minorUnits) {
default:
case 'years':
for (var n = 1; n <= 9; n++) {
var dt = new Date(year+n,0,1,0,0,0,0);
minorTicks[minorTicks.length] = dt.getTime()/1000;
}
break;
}
break;
case 'years':
var year = parseInt(cell,10) + 1900;
caption = year;
var d = new Date(year,0,1,0,0,0,0);
startSecs = d.getTime()/1000;
switch(minorUnits) {
default:
case 'quarters':
for (var n = 1; n <= 3; n++) {
var dt = new Date(year,n*3,1,0,0,0,0);
minorTicks[minorTicks.length] = dt.getTime()/1000;
}
break;
case 'months':
for (var n = 1; n <= 11; n++) {
var dt = new Date(year,n,1,0,0,0,0);
minorTicks[minorTicks.length] = dt.getTime()/1000;
}
break;
}
break;
case 'quarters':
var year = parseInt(Math.floor(cell/4),10) + 1900;
caption = 'Q' + (cell%4+1);
if ((cell%4==0)||index==0) {
caption += ('-' + year);
}
var d = new Date(year,(cell%4)*3,1,0,0,0,0);
startSecs = d.getTime()/1000;
for (var n = 1; n <= 2; n++) {
var dt = new Date(year,((cell%4)*3)+n,1,0,0,0,0);
minorTicks[minorTicks.length] = dt.getTime()/1000;
}
break;
case 'months':
var year = parseInt(Math.floor(cell/12),10) + 1900;
caption = _zenResource['zenMonthShortNames'].split(',')[(cell%12)];
if ((cell%12==0)||(index<=1)) {
caption += ('-' + (year));
}
var d = new Date(year,(cell%12),1,0,0,0,0);
startSecs = d.getTime()/1000;
var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
if ((year%4==0) && !(year%100==0 && year%400!=0)) {
daysInMonth[1] = 29;
}
for (var n = 1; n <= daysInMonth[cell%12]; n++) {
var dt = new Date(year,(cell%12),n,0,0,0,0);
minorTicks[minorTicks.length] = dt.getTime()/1000;
}
break;
case 'days':
var d = new Date(1900,0,1,0,0,0,0);
d.setDate(this._date1900.getDate() + Math.floor(cell));
startSecs = d.getTime()/1000;
if (this.dateFormat) {
caption = zenDateToString(d,false,this.dateFormat);
}
else {
var months = _zenResource['zenMonthShortNames'].split(',');
caption = months[d.getMonth()] + ' ' + d.getDate();
}
for (var n = 1; n < 24; n+=1) {
var dt = new Date(1900,0,1,0,0,0,0);
dt.setTime(d.getTime() + (n*3600*1000));
minorTicks[minorTicks.length] = dt.getTime()/1000;
}
break;
case 'hours':
var d = new Date(1900,0,1,0,0,0,0);
d.setHours(this._date1900.getHours() + Math.floor(cell));
startSecs = d.getTime()/1000;
caption = zenDateToString(d,true,this.dateFormat);
caption = caption.split(' ')[1];	// time only
caption = caption.split(':');
caption.length = 2;
caption = caption.join(':');
for (var n = 1; n < 6; n+=1) {
var dt = new Date(1900,0,1,0,0,0,0);
dt.setTime(d.getTime() + ((n*10)*60*1000));
minorTicks[minorTicks.length] = dt.getTime()/1000;
}
break;
case 'minutes':
var d = new Date(1900,0,1,0,0,0,0);
d.setMinutes(this._date1900.getMinutes() + Math.floor(cell));
startSecs = d.getTime()/1000;
caption = zenDateToString(d,true,this.dateFormat);
caption = caption.split(' ')[1];	// time only
caption = caption.split(':');
caption.length = 2;
caption = caption.join(':');
for (var n = 1; n < 4; n+=1) {
var dt = new Date(1900,0,1,0,0,0,0);
dt.setTime(d.getTime() + ((n*15)*1000));
minorTicks[minorTicks.length] = dt.getTime()/1000;
}
break;
}
return { caption:caption, startSecs:startSecs, minorTicks:minorTicks  };
}

self._ZEN_SVGComponent_chart_getChartElement = function(series,item) {
return this.findSVGElement('el_' + series + '_' + item);
}

self._ZEN_SVGComponent_chart_getChartElementStyle = function(series,item) {
return this.markerStyle;
}

self._ZEN_SVGComponent_chart_getChartRelatedElements = function(series,item) {
return null;
}

self._ZEN_SVGComponent_chart_getChartSubtitle = function() {
var title = '';
var controller = this.getController();
if (controller && controller.getDataSourceCaption) {
title = controller.getDataSourceCaption('subtitle',this.subtitle);
}
if (title==='') {
title = this.subtitle;
}
return title;
}

self._ZEN_SVGComponent_chart_getChartTitle = function() {
var title = '';
if (this.hasMultiples()) {
var snames = this.getSeriesNames();
title = snames[this.currMultiple] ? snames[this.currMultiple] : '';
}
else {
var controller = this.getController();
if (controller && controller.getDataSourceCaption) {
title = controller.getDataSourceCaption('title',this.title);
}
if (title==='') {
title = this.title;
}
}
return title;
}

self._ZEN_SVGComponent_chart_getColorSchemeArray = function(scheme) {
var colors;
switch(scheme) {
case 'bright':
colors = ['url(#shade-blue)','url(#shade-green)','url(#shade-red)','url(#shade-yellow)','url(#shade-purple)','url(#shade-orange)','url(#shade-teal)'];
break;
case 'glow':
colors = ['url(#glow-blueDiag)','url(#glow-greenDiag)','url(#glow-redDiag)','url(#glow-yellowDiag)','url(#glow-purpleDiag)','url(#glow-orangeDiag)','url(#glow-tealDiag)'];
break;
case 'gray':
colors = ['#F0F0F0','#C0C0C0','#A0A0A0','#808080','#606060','#D0D0D0','#B0B0B0','#909090'];
break;
case 'pastel':
colors = ['#5F9EA0','#E9967A','#EEE8AA','#98FB98','#DDA0DD','#8FBC8F','#FFE4B5','#EE82EE'];
break;
case 'urban':
colors = ['rgb(71,89,104)','rgb(169,141,109)','rgb(156,152,142)','rgb(91,89,83)','rgb(43,59,64)','rgb(71,89,83)','rgb(127,136,126)','rgb(192,204,173)'];
break;
case 'tuscan':
colors = ['rgb(231,192,80)','rgb(210,156,80)','rgb(56,85,47)','rgb(56,57,45)','rgb(55,42,15)','rgb(164,57,39)','rgb(190,226,250)','rgb(226,226,199)'];
break;
case 'caribbean':
colors = ['rgb(0,167,153)','rgb(0,220,216)','rgb(0,185,255)','rgb(0,91,102)','rgb(0,80,35)','rgb(127,166,69)','rgb(255,245,199)','rgb(230,199,145)'];
break;
case 'rustbelt':
colors = ['rgb(156,51,11)','rgb(110,11,0)','rgb(41,41,42)','rgb(62,49,46)','rgb(109,109,111)','rgb(156,157,156)','rgb(208,208,207)'];
break;
case 'solid':
default:
colors = ['blue','green','red','yellow','purple','orange','teal'];
break;
}
return colors;
}

self._ZEN_SVGComponent_chart_getComputedFontSize = function(styleNVP,defaultMedium,defaultSmall,defaultLarge) {
var s = styleNVP;
var idx = -1;
for (var i=0;i<s.attr.length;i++) {
if (s.attr[i]=='font-size') {
idx=i;
i=s.length;
}
}
var fSz = defaultMedium;
if (idx<0) {
if (this.textSize == 'large') fSz = defaultLarge;
else if (this.textSize == 'small') fSz = defaultSmall;
}
else {
fSz = parseFloat(s.value[idx]);
s.value[idx]=fSz;
}
return(fSz);
}

self._ZEN_SVGComponent_chart_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._ZEN_SVGComponent_chart_getCurrYAxis = function(which) {
var axisNo = 0;
which = ('undefined'==typeof which) ? 'left' : which;
switch(which) {
case 'right':
if (this.yAxisList[this.currYAxis] && this.yAxisList[this.currYAxis].labelPosition!='right') {
for (var n = 0; n < this.yAxisList.length; n++) {
if (this.yAxisList[n] && this.yAxisList[n].labelPosition=='right') {
axisNo = n;
break;
}
}
}
else {
axisNo = this.currYAxis;
}
break;
case 'left':
default:
var mAxisNo = null;
if (this.hasMultiples()) {
var t = this.seriesYAxes.toString().split(',');
mAxisNo = t[this.currMultiple];
}
if (mAxisNo!==null) {
axisNo = mAxisNo;
}
else {
if (this.yAxisList[this.currYAxis] && this.yAxisList[this.currYAxis].labelPosition=='right') {
for (var n = 0; n < this.yAxisList.length; n++) {
if (this.yAxisList[n] && this.yAxisList[n].labelPosition=='left') {
axisNo = n;
break;
}
}
}
else {
axisNo = this.currYAxis;
}
}
break;
}
return axisNo;
}

self._ZEN_SVGComponent_chart_getEndTime = function() {
var endTime = this.endTime;
if (!endTime) {
if (isNaN(parseInt(this._xMaxValue,10))) {
endTime = '2012-12-31';
}
else {
var dt = new Date(1900,0,1,0,0,0,0);
dt.setTime(this._xMaxValue*1000);
endTime = zenDateToString(dt,true);
}
}
return endTime;
}

self._ZEN_SVGComponent_chart_getLegendLabels = function() {
return this.getSeriesNames();
}

self._ZEN_SVGComponent_chart_getLegendRectStyle = function(s) {
return '';
}

self._ZEN_SVGComponent_chart_getLegendsCount = function(legends) {
var scount = legends.length;
var seriesNumber = parseInt(this.seriesNumber);
if (!isNaN(seriesNumber)) {
scount = 1;
}
return (!this.usePercentForRange() ? scount : this.seriesSize);
}

self._ZEN_SVGComponent_chart_getMarkerShape = function(series) {
var mk = this.markerShapes.split(',');
if (mk.length == 0) {
return 'circle';
}
return (''==mk[series%mk.length] ? 'circle' : mk[series%mk.length]);
}

self._ZEN_SVGComponent_chart_getNumericAbbreviation = function(val,min,max) {
var factor = 1;
var maxVal = factor * max;
var minVal = factor * min;
var range = maxVal-minVal;
var absmax = Math.abs(factor * max);
var absmin = Math.abs(factor * min);
var test = (absmax > absmin) ? absmax : absmin;
if (test >= 600000000) {
val = Math.round(val / 10000000)/100 + ((val!=0)?$$$Text('G','%ZEN'):'');
}
else if (test >= 600000) {
val = Math.round(val / 10000)/100 + ((val!=0)?$$$Text('M','%ZEN'):'');
}
else if (test >= 10000) {
val = Math.round(val / 10)/100 + ((val!=0)?$$$Text('K','%ZEN'):'');
}
else if (range >= 100) {  //SAM used to be test
val = Math.round(val);
}
else {
if (range>=10) {
val = Math.round(val*10)/10;
val = val.toFixed(1);
}
else if (range>=1) {
val = Math.round(val*100)/100;
val = val.toFixed(2);
}
else {
val = Math.round(val*1000)/1000;
val = val.toFixed(3);
}
}
return val;
}

self._ZEN_SVGComponent_chart_getPelToPixelHRatio = function() {
if (this.viewBoxWidth == '' && this.viewBoxHeight == '') {
return 1;
}
var physicalWidth = parseInt(this.svgGroup.getAttribute('width'),10);
return(100/physicalWidth);
}

self._ZEN_SVGComponent_chart_getPelToPixelVRatio = function() {
if (this.viewBoxWidth == '' && this.viewBoxHeight == '') {
return 1;
}
var physicalHeight = parseInt(this.svgGroup.getAttribute('height'),10);
return(100/physicalHeight);
}

self._ZEN_SVGComponent_chart_getPlotX = function(val) {
var pct = 0;
if (this._xRange != 0) {
pct = (val - this._xMinValue) / this._xRange;
}
return this._plotLeft + (pct * this._plotWidth);
}

self._ZEN_SVGComponent_chart_getPlotY = function(val,yAxisNo) {
var q = yAxisNo;
yAxisNo = ('undefined' == typeof yAxisNo || isNaN(yAxisNo) || ''===yAxisNo) ? 0 : yAxisNo;
var pct = 0;
if (this._yRange[yAxisNo] != 0) {
pct = (val - this._yMinValue[yAxisNo]) / this._yRange[yAxisNo];
}
return this._plotBottom - (pct * this._plotHeight);
}

self._ZEN_SVGComponent_chart_getRangeGroupForSeries = function(series) {
return this.useSumForRange() ? 'bar' : 'none';
}

self._ZEN_SVGComponent_chart_getRelatedElementStyle = function(series,item) {
return '';
}

self._ZEN_SVGComponent_chart_getSelectedItem = function() {
return this.selectedItem;
}

self._ZEN_SVGComponent_chart_getSelectedSeries = function() {
return this.selectedSeries;
}

self._ZEN_SVGComponent_chart_getSelectedStyle = function(series,item,isMarker) {
isMarker = zenGet(isMarker,false);
var selStyle = ''
if (this.hasSelectedItem()) {
if (series == this.selectedSeries && (('undefined'==typeof item) || item == this.selectedItem)) {
selStyle = this.selectedItemStyle;
}
else if ('2D' == this.appearance) {
selStyle = this.unselectedItemStyle;
if (isMarker) {
selStyle += 'opacity:1.0;stroke-opacity:0.6;';
}
}
}
var stype = this.getSeriesType(series);
if (stype == 'line' && !this.markersVisible) {
selStyle += 'fill:none;';
}
return selStyle;
}

self._ZEN_SVGComponent_chart_getSeriesColor = function(series) {
if (''!=this.ongetSeriesColor) {
var sclr = zenInvokeCallbackMethod(this.ongetSeriesColor,this,'ongetSeriesColor','series',series);
if (sclr) {
return sclr;
}
}
var clr = this._seriesColors;
if (clr==null || clr.length == 0) {
return 'black';
}
return (''==clr[series%clr.length] ? 'black' : clr[series%clr.length]);
}

self._ZEN_SVGComponent_chart_getSeriesCount = function() {
return this.seriesCount;
}

self._ZEN_SVGComponent_chart_getSeriesData = function(series) {
var seriesNumber = parseInt(this.seriesNumber);
if (!isNaN(seriesNumber) && (series!=seriesNumber)) {
return null;
}
return this._dataSeries ? this._dataSeries[series] : null;
}

self._ZEN_SVGComponent_chart_getSeriesNames = function() {
var names = new Array(this.seriesCount);
var controller = this.getController();
if (controller) {
for (i = 0; i < this.getSeriesNamesSize(); i++) {
names[i] = controller.getLabel(i,2);
}
}
else {
var sn = this.seriesNames.split(',');
for (i = 0; i < this.getSeriesNamesSize(); i++) {
names[i] = (null == sn[i] || '' == sn[i]) ? (parseInt(i,10)+1) : sn[i];
}
}
return names;
}

self._ZEN_SVGComponent_chart_getSeriesNamesSize = function() {
return (!this.usePercentForRange() ? this.seriesCount : this.seriesSize)
}

self._ZEN_SVGComponent_chart_getSeriesSVGGroup = function() {
return this.findSVGElement('seriesGroup'+this.currMultiple);
}

self._ZEN_SVGComponent_chart_getSeriesSize = function() {
return this.seriesSize;
}

self._ZEN_SVGComponent_chart_getSeriesType = function(series) {
return '';
}

self._ZEN_SVGComponent_chart_getStartTime = function() {
var startTime = this.startTime;
if (!startTime) {
if (isNaN(parseInt(this._xMinValue,10))) {
startTime = '2012-01-01';
}
else {
var dt = new Date(1900,0,1,0,0,0,0);
dt.setTime(this._xMinValue*1000);
startTime = zenDateToString(dt,true);
}
}
return startTime;
}

self._ZEN_SVGComponent_chart_getTimeX = function(time) {
var x = null;
if (this._pixPerSec) {
var d = zenStringToDate(time);
if (d) {
var hms = time.toString().split(' ')[1];
if (hms) {
var t = hms.split(':');
if (t[0]) {	d.setHours(parseInt(t[0],10));}
if (t[1]) {	d.setMinutes(parseInt(t[1],10));}
if (t[2]) {	d.setSeconds(parseInt(t[2],10));}
}
var startSecs = d.getTime()/1000;
x = (this._pixPerSec * (startSecs-this._offset));
}
}
return x;
}

self._ZEN_SVGComponent_chart_getToolTipInfo = function(series,item,captions,values) {
var controller = this.getController();
var oldmax = this.maxLabelLen;
this.maxLabelLen = 0;
var isPivotTable = false;
if (controller && ('%DeepSee.Component.pivotTable'==zenGet(controller._serverClass))) {
var dataSourceType = controller.dataSourceName.split('.')[controller.dataSourceName.split('.').length-1];
isPivotTable = ('pivot'==dataSourceType);
if (isPivotTable) {
var labelInfo = new zenProxy();
controller.callGetItemSpec(labelInfo,item+1,series+1);
}
}
if (this.getSeriesSize() >= 1) {
var name = '';
var yAxisNo = this.getCurrYAxis();
if (controller && controller.getDimName) {
if (isPivotTable) {
name = labelInfo.rowCaption;
}
else {
name = controller.getDimName(0);
}
}
captions[captions.length] = (''==name) ? !this.usePercentForRange() ? $$$Text('Item') : 'Series' : name;
if (null != this.chartPivot) {
values[values.length] = this.chartPivot ? this.getYLabelText(!this.usePercentForRange() ? item : series,yAxisNo,1) : this.getXLabelText(!this.usePercentForRange() ? item : series,1);
}
else {
values[values.length] = this.getYLabelText(!this.usePercentForRange() ? item : series,'',1);
}
}
if (this.getSeriesCount() >= 1) {
var name = '';
if (controller && controller.getDimName) {
if (isPivotTable) {
name = labelInfo.colCaption;
}
else {
name = controller.getDimName(1);
}
}
captions[captions.length] = (''==name) ? !this.usePercentForRange() ? 'Series' : $$$Text('Item') : name;
var names = (!this.usePercentForRange()) ? this.getSeriesNames() :  this.getLegendLabels(); // JSL4130 - for series use getSeriesName
values[values.length] = names[!this.usePercentForRange() ? series : item];
}
if (controller && controller.getFilterInfo) {
var fnames = new Array();
var fvalues = new Array();
controller.getFilterInfo(fnames,fvalues);
for (var n = 0; n < fnames.length; n++) {
captions[captions.length] = fnames[n];
values[values.length] = fvalues[n];
}
}
if (isPivotTable) {
captions[captions.length] = labelInfo.measure;
}
else if (controller && controller.getValueName) {
captions[captions.length] = controller.getValueName();
}
else {
captions[captions.length] = 'Value';
}
var data = this.getSeriesData(series);
if (data && null != data[item]) {
var val = data[item];
if ('object'==typeof val) {
val = val.value;
}
if (!isNaN(parseFloat(val))) {
if (isPivotTable && (this.valueLabelFormat=='')) { // WAL122 (2) -- check for existing value label format
var formattedVal = new zenProxy();
controller.callFormatValue(val, formattedVal, item+1, series+1);
if (formattedVal.formatted==1) {
val = formattedVal.value;
}
else {
if (parseFloat(val)!=parseInt(val)) {
val = this.formatNumeric(parseFloat(val).toFixed(2));
}
else {
val = this.formatNumeric(parseInt(val));
}
}
}
else {
if (parseFloat(val)!=parseInt(val)) {
val = this.formatNumeric(parseFloat(val).toFixed(2));
}
else {
val = this.formatNumeric(parseInt(val));
}
}
}
values[values.length] = val;
}
else {
values[values.length] = '';
}
if (isPivotTable) {
values = controller.removeMeasureLabels(values,labelInfo.measure);
}
this.maxLabelLen = oldmax;
}

self._ZEN_SVGComponent_chart_getXAxis = function() {
return this.xAxis;
}

self._ZEN_SVGComponent_chart_getXAxisTitle = function() {
var title = '';
if (this.xAxis && ''!=this.xAxis.title) {
title = this.xAxis.title;
}
else {
if (!this.isTimeBased()) {
var controller = this.getController();
if (!this.chartPivot) {
if (controller && controller.getDimName) {
title = controller.getDimName(0);
}
}
else {
if (controller && controller.getValueName) {
title = controller.getValueName();
}
}
}
}
return title;
}

self._ZEN_SVGComponent_chart_getXAxisType = function() {
return 'category';
}

self._ZEN_SVGComponent_chart_getXLabelText = function(val,base,noformat) {
noformat = zenGet(noformat,false);
if (zenIsMissing(base)) {
base = 1;  // JSL4133 - avoid NAN and change the default to adding 1
}
var label = null;
if ('category'==this._xGridType) {
var controller = this.getController();
if (controller) {
val = controller.getLabel(val,1,noformat);
}
}
if (''!=this.ongetLabelX) {
label = zenInvokeCallbackMethod(this.ongetLabelX,this,'ongetLabelX','value',val);
}
if (label===null || (typeof label == 'undefined')) {
if ('value'!=this._xGridType) {
if (!controller && ''==this.ongetLabelX) { // JSL4156 - if label supplied by controller or ongetLabelX take it as is!!!
label = val + base;
} else {
label = val;
}
}
else {
var xAxis = this.getXAxis();
switch(xAxis?xAxis.axisType:'') {
case 'percent':
label = zenFormatNumber(val,"#.%");
break;
default:
label = this.getNumericAbbreviation(val,this._xMinValue,this._xMaxValue);
break;
}
}
}
var maxlen = parseInt(this.maxLabelLen,10);
if (maxlen && label.toString().length > maxlen) {
label = label.toString().substr(0,maxlen)+'...';
}
return label;
}

self._ZEN_SVGComponent_chart_getYAxis = function(index) {
if (this.yAxis) {
return this.yAxis;
}
index = 'undefined' == typeof index ? this.currYAxis : index;
return this.yAxisList[index];
}

self._ZEN_SVGComponent_chart_getYAxisCount = function() {
if (this.yAxis) {
return 1;
}
return this.yAxisList&&this.yAxisList.length>0 ? this.yAxisList.length : 1;
}

self._ZEN_SVGComponent_chart_getYAxisIndexForSeries = function(series) {
if (this._yAxisForSeries && null!==this._yAxisForSeries[series]) {
return this._yAxisForSeries[series];
}
return -1;
}

self._ZEN_SVGComponent_chart_getYAxisTitle = function(which) {
var title = '';
var yAxis = this.getYAxis(this.getCurrYAxis(which));
if (yAxis && ''!=yAxis.title) {
title = yAxis.title;
}
else {
var controller = this.getController();
if (!this.chartPivot) {
if (this.hasMultiples()) {
var snames = this.getSeriesNames();
title = snames[this.currMultiple] ? snames[this.currMultiple] : '';
}
else if (controller && controller.getValueName) {
var yaCount = this.getYAxisCount();
title = controller.getValueName();
if (yaCount>1) {
var scount = this.getSeriesCount();
var legends = this.getLegendLabels();
for (var s = 0; s < scount; s++) {
if (this.getYAxisIndexForSeries(s)==this.getCurrYAxis(which)) {
title = legends[s];
}
}
}
}
}
else {
if (controller && controller.getDimName) {
title = controller.getDimName(0);
}
}
}
return title;
}

self._ZEN_SVGComponent_chart_getYAxisType = function() {
return 'value';
}

self._ZEN_SVGComponent_chart_getYLabelText = function(val,yAxisNo,base) {
var label = null;
if (zenIsMissing(base)) {
base = 1 // JSL4129, backwards compatibilty JSL4129 set it to 0, JSL4133, make everything 1-based when labels are not defined
}
yAxisNo = ('undefined' == typeof yAxisNo || isNaN(yAxisNo) || ''==yAxisNo) ? 0 : yAxisNo;
if ('category'==this._yGridType || !this.hasAxes()) {
var controller = this.getController();
if (controller) {
val = controller.getLabel(val,1);
}
}
if (''!=this.ongetLabelY) {
label = zenInvokeCallbackMethod(this.ongetLabelY,this,'ongetLabelY','value',val,'yAxisNo',yAxisNo);
}
if (label===null) {
if (('value'!=this._yGridType)) {
if (!controller && ''==this.ongetLabelY) { // JSL4156 - if label supplied by controller or ongetLabelY take it as is!!!
label = val+base; // JSL4129 val+base instead of val
} else {
label = val;
}
}
else {
var yAxis = this.getYAxis(yAxisNo);
switch(yAxis?yAxis.axisType:'') {
case 'percent':
label = zenFormatNumber(val,"#.%");
break;
default:
if (this._yMinValue && this._yMaxValue) { // JSL4129 guard against null or undefined min and max values
label = this.getNumericAbbreviation(val,this._yMinValue[yAxisNo],this._yMaxValue[yAxisNo]);
} else {
label = val + base; // JSL4129 if yMinValue, yMaxValue null or undefined, val + base
}
break;
}
}
}
var maxlen = parseInt(this.maxLabelLen,10);
if (maxlen && label && label.toString().length > maxlen) { // JSL4129 guard against null label, even though in the above logic, it is ensured that label is never null!
label = label.toString().substr(0,maxlen)+'...';
}
return label;
}

self._ZEN_SVGComponent_chart_hasAxes = function() {
return true;
}

self._ZEN_SVGComponent_chart_hasMultiples = function() {
return false;
}

self._ZEN_SVGComponent_chart_hasSelectedItem = function() {
return (parseInt(this.selectedSeries,10)>=0 && parseInt(this.selectedItem,10)>=0);
}

self._ZEN_SVGComponent_chart_hideToolTip = function() {
if (this._tooltip) {
if (null != this._mouseOverSeries && null != this._mouseOverItem) {
var sno = isNaN(parseInt(this.seriesNumber)) ? this._mouseOverSeries : 0;
var el = this.getChartElement(this._mouseOverSeries, this._mouseOverItem);
if (el) {
el.setAttribute('style',this.getChartElementStyle(sno, this._mouseOverItem) + this.getSelectedStyle(this._mouseOverSeries,this._mouseOverItem));
}
var rel = this.getChartRelatedElements(this._mouseOverSeries, this._mouseOverItem);
if (rel && rel.length) {
for (var n = 0; n < rel.length; n++) {
var style=this.getRelatedElementStyle(sno, this._mouseOverItem); // JSL4137
if (!style) { // JSL4137
style=this.getChartElementStyle(sno, this._mouseOverItem)
}
rel[n].setAttribute('style',style);
}
}
}
try {
this.svgGroup.removeChild(this._tooltip);
} catch(err) {
}
}
delete this._tooltip;
}

self._ZEN_SVGComponent_chart_initializeAxisProperties = function() {
this._yMajorUnits = [];
this._yMinorUnits = [];
this._yLabelUnits = [];
this._yLabelAngle = [];
this._yLabelStyle = [];
this._yLabelOnTheRight = false;
this._yLabelOnTheLeft = false;
this._xLabelOnTheTop = false;
this._xLabelOnTheBottom = false;
var yaCount = this.getYAxisCount();
for (var yAxisNo = 0; yAxisNo < yaCount; yAxisNo++) {
var yAxis = this.getYAxis(yAxisNo);
if (yAxis && yAxis.labelPosition == 'right') {
this._yLabelOnTheRight = true;
}
else {
this._yLabelOnTheLeft = true;
}
this._yMajorUnits[yAxisNo] = yAxis ? yAxis.majorUnits : '';
this._yMajorUnits[yAxisNo] = ('' == this._yMajorUnits[yAxisNo]) ? '' : this._yMajorUnits[yAxisNo];
this._yMinorUnits[yAxisNo] = yAxis ? yAxis.minorUnits : '';
this._yMinorUnits[yAxisNo] = ('' == this._yMinorUnits[yAxisNo]) ? '' : this._yMinorUnits[yAxisNo];
this._yLabelUnits[yAxisNo] = yAxis ? yAxis.labelUnits : '';
this._yLabelUnits[yAxisNo] = ('' == this._yLabelUnits[yAxisNo]) ? this._yMajorUnits[yAxisNo] : this._yLabelUnits[yAxisNo];
this._yLabelAngle[yAxisNo] = yAxis ? yAxis.labelAngle : 0;
this._yLabelStyle[yAxisNo] = yAxis ? yAxis.labelStyle : '';
} // yAxisNo
var yAxis = this.getYAxis(this.getCurrYAxis('left'));
this._yMajorGrid = yAxis ? yAxis.majorGridLines : true;
this._yMinorGrid = yAxis ? yAxis.minorGridLines : false;
this._yMajorGridStyle = yAxis ? yAxis.majorGridStyle : '';
this._yMinorGridStyle = yAxis ? yAxis.minorGridStyle : '';
if (this.xAxis && this.xAxis.labelPosition=='top') {
this._xLabelOnTheTop = true;
}
else {
this._xLabelOnTheBottom = true;
}
this._xMajorUnits = this.xAxis ? this.xAxis.majorUnits : '';
this._xMajorUnits = ('' == this._xMajorUnits) ? '' : this._xMajorUnits;
this._xMinorUnits = this.xAxis ? this.xAxis.minorUnits : '';
this._xMinorUnits = ('' == this._xMinorUnits) ? '' : this._xMinorUnits;
this._xLabelUnits = this.xAxis ? this.xAxis.labelUnits : '';
this._xLabelUnits = ('' == this._xLabelUnits) ? this._xMajorUnits : this._xLabelUnits;
this._xLabelAngle = this.xAxis ? this.xAxis.labelAngle : 0;
this._xLabelStyle = this.xAxis ? this.xAxis.labelStyle : '';
this._xMajorGrid = this.xAxis ? this.xAxis.majorGridLines : false;
this._xMinorGrid = this.xAxis ? this.xAxis.minorGridLines : false;
this._xMajorGridStyle = this.xAxis ? this.xAxis.majorGridStyle : '';
this._xMinorGridStyle = this.xAxis ? this.xAxis.minorGridStyle : '';
this._yGridType = this.getYAxisType();
this._xGridType = this.getXAxisType();
}

self._ZEN_SVGComponent_chart_integrateStyleSpec = function(styleNVP,newRule) {
var a = styleNVP.attr;
var v = styleNVP.value;
var items = newRule.toLowerCase().split(';'); // separate clauses
for (var i=0;i<items.length;i++) {
if (items[i]) {
var pair = items[i].split(':');
if (pair && pair.length==2) {
newAttr = this.stripWhitespace(pair[0]);
if (newAttr && newAttr.length>0) {
newVal = pair[1];
for (var j=0;j<a.length;j++) {
if (a[j]==newAttr) {
v[j]=newVal;
j=a.length;
}
}
if (j==a.length) {
a[j]=newAttr;
v[j]=newVal;
}
}
}
}
}
}

self._ZEN_SVGComponent_chart_is3D = function() {
return ('3D' == this.appearance);
}

self._ZEN_SVGComponent_chart_isTimeBased = function() {
return false;
}

self._ZEN_SVGComponent_chart_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_chart_notifyViewHandler = function(reason,data1,data2,data3) {
switch(reason) {
case 'dataChange':
if (zenPage._containerClosing) {
delete zenPage._containerClosing;
break;
}
case 'modelChange':
this.scrollLeft = 0;
this.hzZoomStep = 0;
this.updateChart();
break;
case 'beginWait':
if (this.beginWaitState) {
this.beginWaitState();
}
break;
case 'endWait':
if (this.endWaitState) {
this.endWaitState();
}
break;
case 'seriesChange':
break;
case 'chartUpdate':
break;
}
}

self._ZEN_SVGComponent_chart_objectToXML = function(object,tag,add,skip) {
var xml = '';
if (object) {
xml += '<' + tag;
var template = zenPage.createComponent(object._type);
var settings = {};
object.getSettings(settings);
if (add) {
for (var p in add) {
settings[p] = add[p];
}
}
var elements = [];
for (var p in settings) {
if (!skip || !skip[p]) {
var type = settings[p];
type = type.toString().split(':')[0];
var value = object.getProperty(p);
if (value!=='' && (null!==template[p]||type=='object') && value!==template.getProperty(p)) {
switch (type) {
case 'object':
case 'list':
elements[elements.length] = p;
break;
case 'boolean':
xml += ' ' + p + '="' + (value?'true':'false') + '"';
break;
case 'enum':
if (value!=='') {
if (isNaN(parseInt(value))||(value=='2D')||(value=='3D')) {
var choice = value;
}
else {
var choices = settings[p].toString().split(':')[1];
var choice = choices.split(',')[value];
}
xml += ' ' + p + '="' + zenEscapeXML(choice) + '"';
}
break;
case 'string':
default:
xml += ' ' + p + '="' + zenEscapeXML(value.toString()) + '"';
break;
}
}
}
}
if (!elements.length) {
xml += '/>';
}
else {
xml += '>\n';
for (var n = 0; n < elements.length; n++) {
var p = elements[n];
var type = settings[p];
switch(type) {
case 'list':
var ltag = p;
if (p=='yAxisList') {
ltag = 'yAxis';
}
var list = object.getProperty(p);
if (list && list.length) {
for (var j = 0; j < list.length; j++) {
xml += this.objectToXML(list[j],ltag) + '\n';
}
}
break;
case 'object':
xml += this.objectToXML(object.getProperty(p),p) + '\n';
break;
}
}
xml += '</' + tag + '>';
}
}
return xml;
}

self._ZEN_SVGComponent_chart_parseStyleSVG = function(style) {
var result = {};
var items = style.toString().toLowerCase().split(';');
for (var i=0; i<items.length; i++) {
if (items[i]) {
var pair = items[i].split(':');
if (pair && pair.length==2) {
newAttr = zenTrim(pair[0]);
if (newAttr && newAttr.length>0) {
newVal = zenTrim(pair[1]);
if (newVal !== '') {
result[newAttr] = newVal;
}
}
}
}
}
return result;
}

self._ZEN_SVGComponent_chart_pickVerticalSkips = function(flag,max) {
var fl = flag.length;
if (max>=fl || fl<3) { //room to show everyone
for (var i=1;i<fl;i++) flag[i]=1;
return;
}
flag[0] = 1;
flag[fl-1] = 1;
max -= 2;
var sIdx=1;
var eIdx=fl-2;
flag[sIdx++]=0;
flag[eIdx--]=0;
var seriesSpan = (eIdx-sIdx+1);
var rMax = Math.ceil(seriesSpan/2);
if (max>rMax) {
var show=1;
for (var i=sIdx;i<=eIdx;i++) {
flag[i] = show;
show = 1-show;
}
return;
}
else {
sIdx--;
eIdx++;
seriesSpan+=2;
var nSkip=seriesSpan-max;
var nSpans = max+1;
var skipGap = Math.floor(nSkip/nSpans);
var fill = nSkip-nSpans*skipGap;
var padIdx=Math.round(nSpans-fill)/2;
var i=sIdx;
var spanCount=0;
while (i<=eIdx && max>0) {
for (var j=0;j<skipGap;j++) {
flag[i++] = 0;
}
if (fill>0 && spanCount>=padIdx) {
flag[i++] = 0;
fill--;
}
spanCount++;
flag[i++] = 1;
max--;
}
}
}

self._ZEN_SVGComponent_chart_plotLineForSeries = function(group,s,data,stacked,chartFilled,markersVisible,hasEvents) {
var hasSelect = this.hasSelectedItem();
var seriesNumber = parseInt(this.seriesNumber);
var multipleOffset = (this.currMultiple?this.currMultiple:0);
var scaleX = this._scaleX ? this._scaleX : 1;
var scaleY = this._scaleY ? this._scaleY : 1;
var items = this.getSeriesSize();
var color = this.getSeriesColor(s+multipleOffset);
var marker = 'circle';
if (markersVisible) {
marker = this.getMarkerShape(s+multipleOffset);
}
var poly = this.document.createElementNS(SVGNS,"path");
poly.setAttribute("class","chart-seriesLine");
var path = ''; // path for this line
poly.setAttribute("fill",'none');
if (!hasEvents) {
poly.setAttribute("fill-opacity",'0.25');
}
group.appendChild(poly);
var fillToEdge = !hasEvents && chartFilled && !this.plotToEdge;
var yAxisNo = this._yAxisForSeries[s+multipleOffset];
var timeBased = this.isTimeBased();
if (!this.chartPivot) {
var dx, adj;
if (timeBased) {
dx = 0;
adj = 0;
}
else if (this.plotToEdge) {
dx = (items<=1) ? (this._plotWidth/2) : (this._plotWidth / (items-1));
adj = (items<=1) ? 0 : dx;
}
else {
dx = (items<=1) ? (this._plotWidth/2) : (this._plotWidth / items);
adj = (items<=1) ? 0 : dx/2;
}
var x = 0;
var base = 0;
if (chartFilled) {
if (isNaN(parseFloat(this._yBaseValue[yAxisNo]))) {
base = this._plotHeight;
}
else {
base = this.getPlotY(this._yBaseValue[yAxisNo],yAxisNo) - this._plotTop;
}
}
if (chartFilled) {
if (fillToEdge) {
path = 'M ' + (x*scaleX) + ' ' + (base*scaleY) + ' ';
}
else {
path = 'M ' + ((x+dx-adj)*scaleX) + ' ' + (base*scaleY) + ' ';
}
firstPoint = false;
}
else {
firstPoint = true;
}
for (var n = 0; n < items; n++) {
if (timeBased) {
if (data[s] && data[s][n] && 'object'==typeof data[s][n] && data[s][n].time) {
var time = data[s][n].time;
}
else {
var time = this.getXLabelText(n,1,true);
}
x = this.getTimeX(time);
x = x===null ? 0 : x;
if ((items>200) && (x < -0.0001 || x > 100.0001)) {
continue;
}
}
else {
x += dx;
}
if (data[s]) {
var ic = data[s].length;
var val = data[s][n];
val = (val!==null && 'object'==typeof val) ? val.value : val;
var nextVal = data[s][n+1];
nextVal = (nextVal!==null && 'object'==typeof nextVal) ? nextVal.value : nextVal;
var priorVal = (n>0) ? data[s][n-1] : null;
priorVal = (priorVal!==null && 'object'==typeof priorVal) ? priorVal.value : priorVal;
nextMissing = (n == ic-1) ? false : ((null == nextVal) || ('number' != typeof nextVal && '' == nextVal) || (isNaN(nextVal)));
nextMissing = (ic == 1) ? true : nextMissing;
prevMissing = (n == 0) ? false : ((null == priorVal) || ('number' != typeof priorVal && '' == priorVal) || (isNaN(priorVal)));
missing = (null == val) || ('number' != typeof val && '' == val) || (isNaN(val));
val = (null == val) ? 0 : val;
val = isNaN(val) ? 0 : val;
}
else {
val = 0;
missing = false;
nextMissing = false;
prevMissing = false;
}
/* JMD1125
if (stacked && val < 0) {
val = 0;
}
*/
var isNeg = (val<0);
if (stacked && s > 0) {
var dval = 0;
for (q = 0; q < s; q++) {
var v = (null == data[q]) ? 0 : ((null == data[q][n]) ? 0 : data[q][n]);
v = ('object'==typeof v) ? parseFloat(v.value) : parseFloat(v);
if ((isNeg && v < 0)||(!isNeg && v > 0)) {
dval += v;
}
}
val += dval;
}
y = this.getPlotY(val,yAxisNo) - this._plotTop;
if (missing) {
firstPoint = true;
}
else {
if (fillToEdge && n==0) {
path += 'L ' + (0*scaleX) + ' ' + (y*scaleY) + ' ';
}
if (firstPoint && chartFilled) {
path += 'M ' + ((x-adj)*scaleX) + ' ' + (base*scaleY) + ' ';
firstPoint = false;
}
path += (firstPoint ? 'M ' : 'L ') + ((x-adj)*scaleX) + ' ' + (y*scaleY) + ' ';
firstPoint = false;
if ((markersVisible || nextMissing || prevMissing)) {
var mk = this.createMarker(s,n,(x-adj),y,color,marker);
group.appendChild(mk);
if (!markersVisible) {
mk.setAttribute('fill',color);
}
if (hasEvents) {
var sno = isNaN(seriesNumber) ? s : this.seriesNumber;
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementMouseOver(evt,'+sno+','+n+');');
mk.addEventListener('mouseover',f,false);
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementMouseOut(evt,'+sno+','+n+');');
mk.addEventListener('mouseout',f,false);
}
}
if (chartFilled && (nextMissing || n == items-1)) {
if (fillToEdge) {
path += (x*scaleX) + " " + (y*scaleY) + " ";
path += (x*scaleX) + " " + (base*scaleY) + " z";
}
else {
path += ((x-adj)*scaleX) + " " + (base*scaleY) + " z";
}
}
}
}
}
else {
var dy, adj;
if (this.plotToEdge) {
dy = (items<=1) ? this._plotHeight : (this._plotHeight / (items-1));
adj = dy;
}
else {
dy = this._plotHeight / items;
adj = (dy/2);
}
var y = 0;
var base = 0;
if (chartFilled) {
if (isNaN(parseFloat(this._xBaseValue))) {
base = 0;
}
else {
base = this.getPlotX(this._xBaseValue) - this._plotLeft;
}
}
if (chartFilled) {
if (fillToEdge) {
path = 'M ' + (base*scaleX) + ' ' + (y*scaleY) + ' ';
}
else {
path = 'M ' + (base*scaleX) + ' ' + ((y+dy-adj)*scaleY) + ' ';
}
firstPoint = false;
}
else {
firstPoint = true;
}
for (var n = 0; n < items; n++) {
if (data[s]) {
var ic = data[s].length;
var val = data[s][n];
val = (val!==null && 'object'==typeof val) ? val.value : val;
var nextVal = data[s][n+1];
nextVal = (nextVal!==null && 'object'==typeof nextVal) ? nextVal.value : nextVal;
var priorVal = (n>0) ? data[s][n-1] : null;
priorVal = (priorVal!==null && 'object'==typeof priorVal) ? priorVal.value : priorVal;
nextMissing = (n == ic-1) ? false : ((null == nextVal) || ('number' != typeof nextVal && '' == nextVal) || (isNaN(nextVal)));
nextMissing = (ic == 1) ? true : nextMissing;
prevMissing = (n == 0) ? false : ((null == priorVal) || ('number' != typeof priorVal && '' == priorVal) || (isNaN(priorVal)));
missing = (null == val) || ('number' != typeof val && '' == val) || (isNaN(val));
val = (null == val) ? 0 : val;
val = isNaN(val) ? 0 : val;
}
else {
val = 0;
missing = false;
nextMissing = false;
prevMissing = false;
}
if (stacked && val < 0) {
val = 0;
}
if (stacked && s > 0) {
var dval = 0;
for (q = 0; q < s; q++) {
var v = (null == data[q]) ? 0 : ((null == data[q][n]) ? 0 : parseFloat(data[q][n]));
dval += ((v > 0) ? v : 0);
}
val += dval;
}
y += dy;
x = this.getPlotX(val) - this._plotLeft;
if (missing) {
firstPoint = true;
}
else {
if (fillToEdge && n==0) {
path += 'L ' + (x*scaleX) + ' ' + (0*scaleY) + ' ';
}
if (firstPoint && chartFilled) {
path += 'M ' + (base*scaleX) + ' ' + ((y - adj)*scaleY) + ' ';
firstPoint = false;
}
path += (firstPoint ? 'M ' : 'L ') + (x*scaleX) + ' ' + ((y - adj)*scaleY) + ' ';
firstPoint = false;
if (markersVisible || nextMissing || prevMissing) {
var mk = this.createMarker(s,n,x,y-adj,color,marker);
group.appendChild(mk);
if (!markersVisible) {
mk.setAttribute('fill',color);
}
if (hasEvents) {
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementMouseOver(evt,'+s+','+n+');');
mk.addEventListener('mouseover',f,false);
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementMouseOut(evt,'+s+','+n+');');
mk.addEventListener('mouseout',f,false);
}
}
if (chartFilled && (nextMissing || n == items-1)) {
if (fillToEdge) {
path += (x*scaleX) + " " + (y*scaleY) + " ";
path += (base*scaleX) + " " + (y*scaleY) + " z";
}
else {
path += (base*scaleX) + " " + ((y-adj)*scaleY) + " z";
}
}
}
}
}
if (path) {
poly.setAttribute("d",path);
poly.setAttribute("stroke",color);
poly.setAttribute("fill",chartFilled ? color : 'none');
}
else {
poly.setAttribute("stroke",'none');
}
if (hasEvents && !markersVisible) {
poly.setAttribute("style",this.lineStyle + this.getSelectedStyle(s) + (chartFilled?'':'fill:none;')); // JSL4176, use this.lineStyle instead of plotStyle for filled line charts - area charts
var sno = isNaN(seriesNumber) ? s : this.seriesNumber;
if (this.hasMultiples()) {
sno = this.currMultiple;
}
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementClickHandler(evt,'+sno+',0);');
poly.addEventListener('click',f,false);
poly.setAttribute('id',this.makeId('el'+this.currMultiple+'_' + sno + '_' + 0));
}
else {
poly.setAttribute("style",this.lineStyle + (chartFilled?'':'fill:none;'));
}
}

self._ZEN_SVGComponent_chart_prepareAxisGroup = function(idName,parentNode) {
var group = this.findSVGElement(idName+this.currMultiple);
if (null == group) {
group = this.document.createElementNS(SVGNS,"g");
group.setAttribute("id",this.makeId(idName+this.currMultiple));
if (parentNode != null) { // JSL4487 guard against null
parentNode.appendChild(group);
}
}
this.removeChildNodes(group);
return(group);
}

self._ZEN_SVGComponent_chart_removeChildNodes = function(node) {
while(node.firstChild) {
node.removeChild(node.firstChild);
}
}

self._ZEN_SVGComponent_chart_removeNoDataMsg = function(plotAreaGroup) {
if (!plotAreaGroup) {
var plotAreaGroup = this.findSVGElement('plotAreaGroup'+this.currMultiple);
}
var text = this.findSVGElement('textIfNoData'+this.currMultiple);
if ((plotAreaGroup)&&(text)) {
var debugrect = this.findSVGElement('rectIfNoData'+this.currMultiple);
plotAreaGroup.removeChild(text);
plotAreaGroup.removeChild(debugrect);
}
}

self._ZEN_SVGComponent_chart_renderAxes = function() {
if (zenIsMissing(this.document)) return;
var is3D = this.is3D();
var plotAreaGroup = this.findSVGElement('plotAreaGroup'+this.currMultiple);
var virtualGroup = this.findSVGElement('virtualGroup'+this.currMultiple);
zenASSERT(plotAreaGroup,'Unable to find plotAreaGroup',arguments);
var scaleX = this._scaleX ? this._scaleX : 1;
var scaleY = this._scaleY ? this._scaleY : 1;
var ystripes = null;
if (this.stripesVisible) {
ystripes = this.findSVGElement('yGridStripes'+this.currMultiple);
if (null == ystripes) {
ystripes = this.document.createElementNS(SVGNS,"path");
ystripes.setAttribute("class","chart-gridStripes");
ystripes.setAttribute("id",this.makeId('yGridStripes'+this.currMultiple));
virtualGroup.appendChild(ystripes);
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementClickHandler(evt,null,null);');
ystripes.addEventListener('click',f,false);
}
ystripes.setAttribute("style",this.stripeStyle);
}
var xstripes = null;
if (this.stripesVisible) {
xstripes = this.findSVGElement('xGridStripes'+this.currMultiple);
if (null == xstripes) {
xstripes = this.document.createElementNS(SVGNS,"path");
xstripes.setAttribute("class","chart-gridStripes");
xstripes.setAttribute("id",this.makeId('xGridStripes'+this.currMultiple));
virtualGroup.appendChild(xstripes);
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementClickHandler(evt,null,null);');
xstripes.addEventListener('click',f,false);
}
xstripes.setAttribute("style",this.stripeStyle);
}
var ygrid = this.findSVGElement('yGridLine'+this.currMultiple);
if (null == ygrid) {
ygrid = this.document.createElementNS(SVGNS,"path");
ygrid.setAttribute("class","chart-majorGridLine");
ygrid.setAttribute("id",this.makeId('yGridLine'+this.currMultiple));
virtualGroup.appendChild(ygrid);
}
ygrid.setAttribute("style",this.gridStyle + this._yMajorGridStyle + 'fill:none;');
var ygridMinor = this.findSVGElement('yGridLineMinor'+this.currMultiple);
if (null == ygridMinor) {
ygridMinor = this.document.createElementNS(SVGNS,"path");
ygridMinor.setAttribute("class","chart-minorGridLine");
ygridMinor.setAttribute("id",this.makeId('yGridLineMinor'+this.currMultiple));
virtualGroup.appendChild(ygridMinor);
}
ygridMinor.setAttribute("style",this.gridStyle + this._yMinorGridStyle + 'fill:none;');
var xgrid = this.findSVGElement('xGridLine'+this.currMultiple);
if (null == xgrid) {
xgrid = this.document.createElementNS(SVGNS,"path");
xgrid.setAttribute("class","chart-majorGridLine");
xgrid.setAttribute("id",this.makeId('xGridLine'+this.currMultiple));
virtualGroup.appendChild(xgrid);
}
xgrid.setAttribute("style",this.gridStyle + this._xMajorGridStyle + 'fill:none;');
var xgridMinor = this.findSVGElement('xGridLineMinor'+this.currMultiple);
if (null == xgridMinor) {
xgridMinor = this.document.createElementNS(SVGNS,"path");
xgridMinor.setAttribute("class","chart-minorGridLine");
xgridMinor.setAttribute("id",this.makeId('xGridLineMinor'+this.currMultiple));
virtualGroup.appendChild(xgridMinor);
}
xgridMinor.setAttribute("style",this.gridStyle + this._xMinorGridStyle + 'fill:none;');
var yAxisNo = this.getCurrYAxis('left');
if (this._yGridType == 'value') {
var start, end;
var d = '';
var sd = '';
if (this._yMajorGrid && this._yMajorUnits[yAxisNo] > 0) {
var start = Math.ceil(Math.abs(this._yMinValue[yAxisNo]/this._yMajorUnits[yAxisNo]))*this._yMajorUnits[yAxisNo]*(this._yMinValue[yAxisNo]>=0 ? 1 : -1);
var end = Math.floor(Math.abs(this._yMaxValue[yAxisNo]/this._yMajorUnits[yAxisNo]))*this._yMajorUnits[yAxisNo]*(this._yMaxValue[yAxisNo]>=0 ? 1 : -1);
var limit = 0;
var lastY = '';
for (var v = start; v <= end && limit < 200; v += this._yMajorUnits[yAxisNo], limit++) {
var y = this.getPlotY(v,yAxisNo);
if (y < this._plotBottomOut) {
if (is3D) {
d += ' M ' + (-5*scaleX) + ' ' + ((y+5)*scaleY) + ' L ';
}
else {
d += ' M ';
}
d += 0 + ' ' + y*scaleY + ' L ' + ((this._plotWidth)*scaleX) + ' ' + y*scaleY;
if (lastY != '') {
sd += ' M ';
sd += 0 + ' ' + lastY*scaleY + ' L ' + ((this._plotWidth)*scaleX) + ' ' + lastY*scaleY;
sd += ' ' + ((this._plotWidth)*scaleX) + ' ' + y*scaleY + ' L ' + 0 + ' ' + y*scaleY + ' z';
lastY = '';
}
else {
lastY = y;
}
}
}
}
if ('' != d) {
ygrid.setAttribute("d",d);
ygrid.setAttribute("visibility","visible");
}
else {
ygrid.setAttribute("visibility","hidden");
}
ygrid.setAttribute("fill","none");
if (ystripes && '' != sd) {
ystripes.setAttribute("d",sd);
ystripes.setAttribute("visibility","visible");
}
var start, end;
var d = '';
if (this._yMinorGrid && this._yMinorUnits[yAxisNo] > 0) {
var start = Math.ceil(Math.abs(this._yMinValue[yAxisNo]/this._yMinorUnits[yAxisNo]))*this._yMinorUnits[yAxisNo]*(this._yMinValue[yAxisNo]>=0 ? 1 : -1);
var end = Math.floor(Math.abs(this._yMaxValue[yAxisNo]/this._yMinorUnits[yAxisNo]))*this._yMinorUnits[yAxisNo]*(this._yMaxValue[yAxisNo]>=0 ? 1 : -1);
var limit = 0;
for (var v = start; v <= end && limit < 200; v += this._yMinorUnits[yAxisNo], limit++) {
var y = this.getPlotY(v,yAxisNo);
if (y < this._plotBottomOut) {
d += ' M ' + 0 + ' ' + y*scaleY + ' L ' + (this._plotWidth)*scaleX + ' ' + y*scaleY;
}
}
}
if ('' != d) {
ygridMinor.setAttribute("d",d);
ygridMinor.setAttribute("visibility","visible");
}
else {
ygridMinor.setAttribute("visibility","hidden");
}
}
else {
var d = '';
var dmin = '';
var items = !this.usePercentForRange() ? this.getSeriesSize() : this.getSeriesCount();
items = this.plotToEdge ? items-1 : items;
if (items > 0 && this._plotHeight>0) {
var y = this._plotTop;
var dy = this._plotHeight / items;
for (var n = 1; n < items; n++) {
y += dy;
if (this._yMajorGrid && (this._yMajorUnits[yAxisNo]>0) && (n%this._yMajorUnits[yAxisNo] ==0)) {
if (is3D) {
d += ' M ' + (-1*this._plotLeftOut/2)*scaleX + ' ' + (y+5)*scaleY + ' L ';
}
else {
d += ' M ';
}
d += 0 + ' ' + y*scaleY + ' L ' + this._plotRight*scaleX + ' ' + y*scaleY;
}
if (this._yMinorGrid && (this._yMinorUnits[yAxisNo]>0) && (n%this._yMinorUnits[yAxisNo] ==0)) {
dmin += ' M ' + 0 + ' ' + y*scaleY + ' L ' + this._plotRight*scaleX + ' ' + y*scaleY;
}
}
}
if ('' != d) {
ygrid.setAttribute("d",d);
ygrid.setAttribute("visibility","visible");
}
else {
ygrid.setAttribute("visibility","hidden");
}
ygrid.setAttribute("fill","none");
if ('' != dmin) {
ygridMinor.setAttribute("d",dmin);
ygridMinor.setAttribute("visibility","visible");
}
else {
ygridMinor.setAttribute("visibility","hidden");
}
}
if (this.isTimeBased()) {
}
else if (this._xGridType == 'value') {
var start, end;
var d = '';
var sd = '';
if (this._xMajorGrid && this._xMajorUnits > 0) {
var start = Math.ceil(Math.abs(this._xMinValue/this._xMajorUnits))*this._xMajorUnits*(this._xMinValue>=0 ? 1 : -1);
var end = Math.floor(Math.abs(this._xMaxValue/this._xMajorUnits))*this._xMajorUnits*(this._xMaxValue>=0 ? 1 : -1);
var limit = 0;
var lastX = '';
for (var v = start; v <= end && limit < 200; v += this._xMajorUnits, limit++) {
var x = this.getPlotX(v) - this._plotLeft;
d += ' M ' + x*scaleX + ' ' + this._plotTop*scaleY + ' L ' + x*scaleX + ' ' + this._plotBottom*scaleY;
if (is3D) {
d += ' ' + (x-5)*scaleX + ' ' + this._plotBottomOut*scaleY;
}
if (lastX != '') {
sd += ' M ';
sd += lastX*scaleX + ' ' + this._plotTop*scaleY + ' L ' + lastX*scaleX + ' ' + this._plotBottom*scaleY;
sd += ' ' + x*scaleX + ' ' + this._plotBottom*scaleY + ' L ' + x*scaleX + ' ' + this._plotTop*scaleY + ' z';
lastX = '';
}
else {
lastX = x;
}
}
}
if ('' != d) {
xgrid.setAttribute("d",d);
xgrid.setAttribute("visibility","visible");
}
else {
xgrid.setAttribute("visibility","hidden");
}
xgrid.setAttribute("fill","none");
if (xstripes && '' != sd) {
xstripes.setAttribute("d",sd);
xstripes.setAttribute("visibility","visible");
}
var start, end;
var d = '';
if (this._xMinorGrid && this._xMinorUnits > 0) {
var start = Math.ceil(Math.abs(this._xMinValue/this._xMinorUnits))*this._xMinorUnits*(this._xMinValue>=0 ? 1 : -1);
var end = Math.floor(Math.abs(this._xMaxValue/this._xMinorUnits))*this._xMinorUnits*(this._xMaxValue>=0 ? 1 : -1);
var limit = 0;
for (var v = start; v <= end && limit < 200; v += this._xMinorUnits, limit++) {
var x = this.getPlotX(v) - this._plotLeft;;
d += ' M ' + x*scaleX + ' ' + this._plotTop*scaleY + ' L ' + x*scaleX + ' ' + this._plotBottom*scaleY;
}
}
if ('' != d) {
xgridMinor.setAttribute("d",d);
xgridMinor.setAttribute("visibility","visible");
}
else {
xgridMinor.setAttribute("visibility","hidden");
}
}
else {
var d = '';
var dmin = '';
var items = !this.usePercentForRange() ? this.getSeriesSize() : this.getSeriesCount();
items = this.plotToEdge ? items-1 : items;
if (items > 0) {
var x = 0;
var dx = this._plotWidth / items;
for (var n = 1; n < items; n++) {
x += dx;
if (this._xMajorGrid && (this._xMajorUnits>0) && (n%this._xMajorUnits ==0)) {
d += ' M ' + x*scaleX + ' ' + this._plotTop*scaleY + ' L ' + x*scaleX + ' ' + this._plotBottom*scaleY;
if (is3D) {
d += ' ' + (x-5)*scaleX + ' ' + this._plotBottomOut*scaleY;
}
}
if (this._xMinorGrid && (this._xMinorUnits>0) && (n%this._xMinorUnits ==0)) {
dmin += ' M ' + x*scaleX + ' ' + this._plotTop*scaleY + ' L ' + x*scaleX + ' ' + this._plotBottom*scaleY;
}
}
}
if ('' != d) {
xgrid.setAttribute("d",d);
xgrid.setAttribute("visibility","visible");
}
else {
xgrid.setAttribute("visibility","hidden");
}
xgrid.setAttribute("fill","none");
if ('' != dmin) {
xgridMinor.setAttribute("d",dmin);
xgridMinor.setAttribute("visibility","visible");
}
else {
xgridMinor.setAttribute("visibility","hidden");
}
}
}

self._ZEN_SVGComponent_chart_renderBands = function() {
if (zenIsMissing(this.document)) return;
var text;
var plotAreaGroup = this.findSVGElement('plotAreaGroup'+this.currMultiple);
var virtualGroup = this.findSVGElement('virtualGroup'+this.currMultiple);
zenASSERT(plotAreaGroup,'Unable to find plotAreaGroup',arguments);
var bandUpper = this.findSVGElement('bandUpper'+this.currMultiple);
var bandLower = this.findSVGElement('bandLower'+this.currMultiple);
if (null == bandUpper) {
bandUpper = this.document.createElementNS(SVGNS,"rect");
bandUpper.setAttribute('id',this.makeId('bandUpper'+this.currMultiple));
virtualGroup.appendChild(bandUpper);
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementClickHandler(evt,null,null);');
bandUpper.addEventListener('click',f,false);
}
if (null == bandLower) {
bandLower = this.document.createElementNS(SVGNS,"rect");
bandLower.setAttribute('id',this.makeId('bandLower'+this.currMultiple));
virtualGroup.appendChild(bandLower);
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementClickHandler(evt,null,null);');
bandLower.addEventListener('click',f,false);
}
var sx = this.currMultiple=='' ? 0 : this.currMultiple;
if (typeof this.bandUpper=='object' && this.bandUpper.length) {
var bu = parseFloat(this.bandUpper[sx]);
}
else {
var bu = parseFloat(this.bandUpper);
}
if (typeof this.bandLower=='object' && this.bandLower.length) {
var bl = parseFloat(this.bandLower[sx]);
}
else {
var bl = parseFloat(this.bandLower);
}
var hide = false;
if (isNaN(bu)) {
hide = true;
}
else if (this.chartPivot) {
var w = this.getPlotX(bu) - this._plotLeft;
if (w <= 0) {
hide = true;
}
else {
w = (w > this._plotWidth) ? this._plotWidth : w;
bandUpper.setAttribute("class","chart-band");
bandUpper.setAttribute("x",w*this._scaleX);
bandUpper.setAttribute("y",this._plotTop*this._scaleY);
bandUpper.setAttribute("height",this._plotHeight*this._scaleY);
bandUpper.setAttribute("width",(this._plotWidth-w)*this._scaleX);
bandUpper.setAttribute("style",this.bandUpperStyle);
}
}
else {
var h = this.getPlotY(bu,sx) - this._plotTop;
if (h <= 0) {
hide = true;
}
else {
h = (h > this._plotHeight) ? this._plotHeight : h;
bandUpper.setAttribute("class","chart-band");
bandUpper.setAttribute("x",0*this._scaleX);
bandUpper.setAttribute("y",this._plotTop*this._scaleY);
bandUpper.setAttribute("width",this._plotWidth*this._scaleX);
bandUpper.setAttribute("height",h*this._scaleY);
bandUpper.setAttribute("style",this.bandUpperStyle);
}
}
if (hide) {
bandUpper.setAttribute("display","none");
}
else {
bandUpper.setAttribute("display","inherit");
}
var hide = false;
if (isNaN(bl)) {
hide = true;
}
else if (this.chartPivot) {
var w = this.getPlotX(bl) - this._plotLeft;
if (w <= 0) {
hide = true;
}
else {
w = (w > this._plotWidth) ? this._plotWidth : w;
bandLower.setAttribute("class","chart-band");
bandLower.setAttribute("x",0*this._scaleX);
bandLower.setAttribute("y",this._plotTop*this._scaleY);
bandLower.setAttribute("height",this._plotHeight*this._scaleY);
bandLower.setAttribute("width",w*this._scaleX);
bandLower.setAttribute("style",this.bandLowerStyle);
}
}
else {
var h = this.getPlotY(bl,sx);
if (h >= (this._plotTop+this._plotHeight)) {
hide = true;
}
else {
h = (h < this._plotTop) ? this._plotTop : h;
bandLower.setAttribute("class","chart-band");
bandLower.setAttribute("x",0*this._scaleX);
bandLower.setAttribute("y",h*this._scaleY);
bandLower.setAttribute("width",this._plotWidth*this._scaleX);
bandLower.setAttribute("height",(this._plotHeight - h + this._plotTop)*this._scaleY);
bandLower.setAttribute("style",this.bandLowerStyle);
}
}
if (hide) {
bandLower.setAttribute("display","none");
}
else {
bandLower.setAttribute("display","inherit");
}
var baseLine = this.findSVGElement('baseLine'+this.currMultiple);
if (null == baseLine) {
baseLine = this.document.createElementNS(SVGNS,"line");
baseLine.setAttribute('id',this.makeId('baseLine'+this.currMultiple));
virtualGroup.appendChild(baseLine);
}
var hide = false;
if (this.chartPivot) {
if (isNaN(parseFloat(this._xBaseValue))) {
hide = true;
}
else {
var w = this.getPlotX(this._xBaseValue) - this._plotLeft;
if (w <= 0) {
hide = true;
}
else {
baseLine.setAttribute("class","chart-baseLine");
baseLine.setAttribute("x1",w*this._scaleX);
baseLine.setAttribute("y1",this._plotTop*this._scaleY);
baseLine.setAttribute("y2",(this._plotTop+this._plotHeight)*this._scaleY);
baseLine.setAttribute("x2",w*this._scaleX);
baseLine.setAttribute("style",this.baseLineStyle);
}
}
}
else {
if (isNaN(parseFloat(this._yBaseValue[0]))) {
hide = true;
}
else {
var h = this.getPlotY(this._yBaseValue[0],0);
if (h <= 0) {
hide = true;
}
else {
baseLine.setAttribute("class","chart-baseLine");
baseLine.setAttribute("x1",0*this._scaleX);
baseLine.setAttribute("y1",h*this._scaleY);
baseLine.setAttribute("x2",this._plotWidth*this._scaleX);
baseLine.setAttribute("y2",h*this._scaleY);
baseLine.setAttribute("style",this.baseLineStyle);
}
}
}
if (hide) {
baseLine.setAttribute("display","none");
}
else {
baseLine.setAttribute("display","inherit");
}
}

self._ZEN_SVGComponent_chart_renderContents = function() {
if (zenIsMissing(this.document)) return;
if (this.hidden) return;
if (this._timerId) {
window.clearTimeout(this._timerId);
delete this._timerId;
}
if (this._tooltip) {
this.hideToolTip();
}
this._date1900 = new Date(1900,0,1,0,0,0,0);
var oldXMax = this._xMaxValue ? this._xMaxValue : null;
if (this.viewBoxWidth == '' && this.viewBoxHeight == '') {
this._scaleX = parseInt(this.width,10)/100;
this._scaleY = parseInt(this.height,10)/100;
}
else {
this._scaleX = 1;
this._scaleY = 1;
}
var scaleX = this._scaleX;
var scaleY = this._scaleY;
if (parseInt(this.width) <= 1 || parseInt(this.height) <= 1) {
return;
}
var yaCount = this.getYAxisCount();
if (this.currYAxis < 0 || this.currYAxis >= yaCount) {
alert('currYAxis is out of range for chart, ' + this.currYAxis + ', in chart \'' + this.id + '\'');
return;
}
if (!zenIsMissing(this.seriesColors)) {
var str = this.seriesColors.toString()+',';
var inParen = false;
var token = '';
this._seriesColors = [];
for (var n = 0; n < str.length; n++) {
var ch = str.charAt(n);
if (inParen) {
token += ch;
if (ch == ')') {
inParen = false;
}
}
else {
if (ch == ',') {
if (token!='') {
this._seriesColors[this._seriesColors.length] = token;
}
token = '';
}
else if (ch == '(') {
inParen = true;
token += ch;
}
else {
token += ch;
}
}
}
}
else {
this._seriesColors = this.getColorSchemeArray(this.seriesColorScheme);
}
this.acquireData();
if (this.seriesSize<=0) {
this.unrender();
return;
}
this._yAxisForSeries = [];
if (this.hasAxes() && !zenIsMissing(this.seriesYAxes)) {
var t = this.seriesYAxes.toString().split(',');
for (var s = 0; s < this.seriesCount; s++) {
var ax = t[s] ? parseInt(t[s]) : 0;
if (''===ax || isNaN(ax)) {
alert('Illegal value in seriesYAxes, ' + t[s] + ', in chart \'' + this.id + '\'');
return;
}
else if (ax < 0 || ax >= yaCount) {
alert('Out-of-range value in seriesYAxes, ' + t[s] + ', in chart \'' + this.id + '\'');
return;
}
this._yAxisForSeries[s] = ax;
}
}
else {
for (var s = 0; s < this.seriesCount; s++) {
this._yAxisForSeries[s] = 0;
}
}
if (!zenIsMissing(this.seriesColorsOverride)) {
var str = this.seriesColorsOverride.toString()+',';
var inParen = false;
var token = '';
var over = [];
for (var n = 0; n < str.length; n++) {
var ch = str.charAt(n);
if (inParen) {
token += ch;
if (ch == ')') {
inParen = false;
}
}
else {
if (ch == ',') {
over[over.length] = token ? token : '';
token = '';
}
else if (ch == '(') {
inParen = true;
token += ch;
}
else {
token += ch;
}
}
}
var c = over.length > this._seriesColors.length ? over.length : this._seriesColors.length;
for (var n = 0; n < c; n++) {
if (over[n] && over[n]!=='') {
this._seriesColors[n] = over[n];
}
else if (!this._seriesColors[n]) {
this._seriesColors[n] = 'blue';
}
}
}
if (this.hasMultiples()) {
this.unrender();
}
var borderOffset = parseInt(this.borderOffset,10); // pixels
borderOffset = (isNaN(borderOffset)||(borderOffset<0)) ? 0 : borderOffset;
borderOffset = (borderOffset>(100*scaleY*2)) ? 0 : borderOffset;
if (null == this.findSVGElement('background')) {
var pane = this.document.createElementNS(SVGNS,"rect");
pane.setAttribute("id",this.makeId('background'));
pane.setAttribute("class","chart-background");
pane.setAttribute("style",this.backgroundStyle);
pane.setAttribute("rx",this.borderRadius);
pane.setAttribute("x",0);
pane.setAttribute("y",0);
pane.setAttribute("width",100*scaleX);
pane.setAttribute("height",100*scaleY);
this.svgGroup.appendChild(pane);
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementClickHandler(evt,null,null);');
pane.addEventListener('click',f,false);
var f2 = new Function('evt','zenPage.getComponent('+this.index+').hideToolTip()');
pane.addEventListener('mousemove',f2,false);
var border = this.document.createElementNS(SVGNS,"rect");
border.setAttribute("id",this.makeId('border'));
border.setAttribute("class","chart-border");
border.setAttribute("style",this.borderStyle);
border.setAttribute("rx",this.borderRadius);
border.setAttribute("x",borderOffset);
border.setAttribute("y",borderOffset);
border.setAttribute("width",(100*scaleX)-(borderOffset*2));
border.setAttribute("height",(100*scaleY)-(borderOffset*2));
this.svgGroup.appendChild(border);
}
else {
var pane = this.findSVGElement('background');
pane.setAttribute("style",this.backgroundStyle);
pane.setAttribute("rx",this.borderRadius);
pane.setAttribute("x",0);
pane.setAttribute("y",0);
pane.setAttribute("width",100*scaleX);
pane.setAttribute("height",100*scaleY);
var border = this.findSVGElement('border');
border.setAttribute("style",this.borderStyle);
border.setAttribute("rx",this.borderRadius);
border.setAttribute("x",borderOffset);
border.setAttribute("y",borderOffset);
border.setAttribute("width",(100*scaleX)-(borderOffset*2));
border.setAttribute("height",(100*scaleY)-(borderOffset*2));
}
this._controlBarH = 0;
if (this.hasAxes() && this.hasZoom && !this.isTimeBased() && !this.chartPivot && (this.appearance=='2D')) {
this._controlBarH = 18;
}
var multiples = 1;
var rowCount = 1;
var colCount = 1;
this.currMultiple = '';
if (this.hasMultiples()) {
multiples = this.getSeriesCount();
this.currMultiple = 0;
if (this.isTimeBased()) {
rowCount = multiples;
colCount = 1;
}
else {
if (this.width <= this.height) {
colCount = Math.floor(Math.sqrt(multiples));
rowCount = Math.ceil(multiples/colCount);
}
else {
rowCount = Math.floor(Math.sqrt(multiples+1));
colCount = Math.ceil(multiples/rowCount);
}
}
}
var oldGroup = this.svgGroup;
for (var r = 0; r < rowCount; r++) {
for (var c = 0; c < colCount; c++) {
if (this.hasMultiples()) {
var frame = this.document.createElementNS(SVGNS,"svg");
var fh = 100 / rowCount;
var fw = 100 / colCount;
frame.setAttribute("x",c * fw * scaleX);
frame.setAttribute("y",r * fh * scaleY);
frame.setAttribute("width",fw * scaleX);
frame.setAttribute("height",fh * scaleY);
oldGroup.appendChild(frame);
this.svgGroup = frame;
this._scaleX = scaleX / colCount;
this._scaleY = scaleY / rowCount;
}
var titleH = this.renderTitle();
this.renderLegend();
this.calculateRangeValues();
if ( ((this._yLabelOnTheLeft&&this._yLabelOnTheRight)&&(this._plotWidth < 33)) ||
((this._yLabelOnTheLeft)&&(this._plotLeftOut > 50)) ||
((this._yLabelOnTheRight)&&(this._plotRight < 50)) ) {
this.labelsVisible = false;
this.calculateRangeValues();
}
this.renderPlotArea();
this.adjustChartTitle();
this.renderSeriesGroup();
if ('' != this.onrenderData) {
this._oldXMax = oldXMax;
var group = this.findSVGElement('seriesGroup'+this.currMultiple);
zenInvokeCallbackMethod(this.onrenderData,this,'onrenderData','chart',this,'group',group);
}
if (this.hasMultiples()) {
this.currMultiple++;
if (this.currMultiple>= multiples) break;
}
}
if (this.hasMultiples() && this.currMultiple>= multiples) {
break;
}
}
this.svgGroup = oldGroup;
this.currMultiple = '';
this._scaleX = scaleX;
this._scaleY = scaleY;
if (this.hasAxes() && this.hasZoom && !this.isTimeBased() && !this.chartPivot && (this.appearance=='2D')) {
this.renderControlBar();
}
var controller = this.getController();
if (controller && controller.sendEventToViews) {
controller.sendEventToViews('chartUpdate');
}
var done = false;									  // JSL4483
var attrs = this.parseStyleSVG(this.backgroundStyle); // JSL4483
this.setSeeThrough(attrs['opacity']);                 // JSL4483
}

self._ZEN_SVGComponent_chart_renderControlBar = function() {
if (zenIsMissing(this.document)) return;
var hgt = this._controlBarH;	// pixels
var controlBar = this.findSVGElement('controlBar');
if (null == controlBar && (parseInt(this.height) > hgt)) {
controlBar = this.document.createElementNS(SVGNS,"g");
controlBar.setAttribute("id",this.makeId('controlBar'));
controlBar.setAttribute("transform",'translate(0,'+(parseInt(this.height)-hgt)+')');
this.svgGroup.appendChild(controlBar);
}
this.renderZoomTool();
return hgt;
}

self._ZEN_SVGComponent_chart_renderLegend = function() {
if (zenIsMissing(this.document)) return;
var legends = this.getLegendLabels();
this._legendVisible = false;
if ('true' == this.legendVisible) {
this._legendVisible = true;
}
else if ('auto' == this.legendVisible) {
this._legendVisible = (legends.length > 1);
}
if (this.hasMultiples()) {
this._legendVisible = false;
}
var svgLegendGroup = this.findSVGElement('legendGroup');
if (svgLegendGroup) {
while(null != svgLegendGroup.firstChild) {
svgLegendGroup.removeChild(svgLegendGroup.firstChild);
}
}
if (!this._legendVisible) {
this._legendWidth = null;
return;
}
if (null == svgLegendGroup) {
svgLegendGroup = this.document.createElementNS(SVGNS,"svg");
svgLegendGroup.setAttribute("id",this.makeId('legendGroup'));
this.svgGroup.appendChild(svgLegendGroup);
}
var brect = this.document.createElementNS(SVGNS,"rect");
brect.setAttribute("id",this.makeId('legendRect'));
svgLegendGroup.appendChild(brect);
var scount = legends.length;
var seriesNumber = parseInt(this.seriesNumber);
if (!isNaN(seriesNumber)) {
scount = 1;
}
var x,y;
if ('' === this.legendX) {
x = zenGet(this._plotRight,0);
}
else {
x = this.xToLogical(this.legendX);
}
if ('' === this.legendY) {
y = zenGet(this._marginTop,0);
}
else {
y = this.yToLogical(this.legendY);
}
var wid,hgt,autoWid,autoHgt;
if (''===this.legendWidth) {
wid = 10;
autoWid = true;
}
else {
wid = this.xToLogical(this.legendWidth);
autoWid = false;
}
if (''===this.legendHeight) {
hgt = ((scount*3)+2);
autoHgt = true;
}
else {
hgt = this.yToLogical(this.legendHeight);
autoHgt = false;
}
svgLegendGroup.setAttribute('x',(x*this._scaleX));
svgLegendGroup.setAttribute('y',(y*this._scaleY));
svgLegendGroup.setAttribute('width',(wid*this._scaleX));
svgLegendGroup.setAttribute('height',(hgt*this._scaleY));
brect.setAttribute("class","chart-legend");
brect.setAttribute("x",0);
brect.setAttribute("y",0);
brect.setAttribute("rx",5);
brect.setAttribute("width",(wid*this._scaleX));
brect.setAttribute("height",(hgt*this._scaleY));
brect.setAttribute("style",this.legendStyle);
var legWid = 0;
var legHgt = 2;
var ty = legHgt;
var legendTitle = this.legendTitle;
if ('' == legendTitle) {
var controller = this.getController();
if (controller && controller.getDimName) {
legendTitle = controller.getDimName(1);
}
}
var start = ('' == legendTitle) ? 0 : -1;
var yaCount = this.getYAxisCount();
var legRect = [];
for (var s = start; s < this.getLegendsCount(legends); s++) {
if (s >= 0) {
if (!isNaN(seriesNumber)) {
var sno = seriesNumber;
}
else {
var sno = s;
}
var color = this.getSeriesColor(sno);
var shape = this.getMarkerShape(sno);
var plotType = this.getSeriesType(s);
legRect[s] = null;
if (!this.yAxis && yaCount>1 && this.tag != "bubbleChart" && this.tag != "xyChart") {
legRect[s] = this.document.createElementNS(SVGNS,"rect");
legRect[s].setAttribute("class",'chart-legendRect');
legRect[s].setAttribute("style",this.legendRectStyle);
svgLegendGroup.appendChild(legRect[s]);
}
if (this.markersVisible && (plotType=='line' || plotType=='')) {
var leg = this.createMarker(sno, 0, 2, ty, color, shape, true);
svgLegendGroup.appendChild(leg);
}
else {
var leg = this.document.createElementNS(SVGNS,"rect");
leg.setAttribute("x",-5);
leg.setAttribute("y",-5);
leg.setAttribute("width",10);
leg.setAttribute("height",10);
leg.setAttribute("fill",color);
leg.setAttribute("stroke",'#808080');
leg.setAttribute("stroke-width",'0.5px');
if (this.getLegendRectStyle(s)) leg.setAttribute("style", this.getLegendRectStyle(s)) // JSL4133
svgLegendGroup.appendChild(leg);
}
if (legRect[s] && this._yAxisForSeries[s] != this.currYAxis && this.tag != "bubbleChart" && this.tag != "xyChart") {
legRect[s].setAttribute("opacity",0.0);
var f = new Function('return zenPage.getComponent('+this.index+').setCurrYAxis('+this._yAxisForSeries[s]+');');
leg.addEventListener('click',f,false);
legRect[s].addEventListener('click',f,false);
}
}
var text = this.document.createElementNS(SVGNS,"text");
text.setAttribute("class","chart-legendLabel");
text.setAttribute("style",this.legendLabelStyle + ((s<0)?'font-weight:bold;opacity:0.6;':''));
text.setAttribute("x", 15);		// JMD1100 use pixels
text.setAttribute("y", ty*this._scaleY);
var label = (s<0) ? legendTitle : legends[sno];
var textNode = this.document.createTextNode(label);
text.appendChild(textNode);
svgLegendGroup.appendChild(text);
var bbox = zenGetBBox(text);
var tw = ((zenGetComputedTextLength(text)*1.3)/ this._scaleX);
legWid = (legWid > tw) ? legWid : tw;
var th = ((bbox.height*1.4/this._scaleY)<3) ? 3 : (bbox.height*1.4/this._scaleY);
text.setAttribute("x", 0);
text.setAttribute("y", 0);
text.setAttribute("transform","translate("+(20)+","+((ty+(2*th/3))*this._scaleY)+")");
if (leg) {
var xm = 10;
var ya = 1;
leg.setAttribute("transform","translate("+(xm)+","+(((ty+ya)+(2*th/3)-2)*this._scaleY)+")");
}
if (s<0) {
th = th * 1.3;
}
if (legRect[s]) {
legRect[s].setAttribute("x",2);
legRect[s].setAttribute("y",ty*this._scaleY);
legRect[s].setAttribute("height",(th*this._scaleY)-2);
}
ty += th;
legHgt += th;
}
if (autoWid) {
legWid = legWid + (15+15)/this._scaleX;
brect.setAttribute("width",((legWid-1)*this._scaleX));
svgLegendGroup.setAttribute('x',((100-legWid)*this._scaleX));
svgLegendGroup.setAttribute('width',(legWid*this._scaleX)+2);
this._legendWidth = legWid;
}
else {
this._legendWidth = null;
}
if (legRect.length) {
for (var s = start; s < scount; s++) {
if (legRect[s]) {
legRect[s].setAttribute("width",((legWid-1)*this._scaleX)-4);
}
}
}
if (autoHgt) {
legHgt += 1;
var top = this._marginTop;
var btm = this._marginBottom;
if (legHgt > (100 - (top + btm))) {
legHgt = (100 - (top + btm));
}
brect.setAttribute("height",(legHgt*this._scaleY));
svgLegendGroup.setAttribute('height',(legHgt*this._scaleY));
}
}

self._ZEN_SVGComponent_chart_renderPlotArea = function() {
if (zenIsMissing(this.document)) return;
var rect,edgeLeft,edgeBottom,axisLines;
var plotAreaGroup = this.findSVGElement('plotAreaGroup'+this.currMultiple);
var is3D = this.is3D();
var scaleX = this._scaleX ? this._scaleX : 1;
var scaleY = this._scaleY ? this._scaleY : 1;
if (null == plotAreaGroup) {
plotAreaGroup = this.document.createElementNS(SVGNS,"g");
plotAreaGroup.setAttribute("id",this.makeId('plotAreaGroup'+this.currMultiple));
this.svgGroup.appendChild(plotAreaGroup);
rect = this.document.createElementNS(SVGNS,"rect");
rect.setAttribute("id",this.makeId('plotArea'+this.currMultiple));
plotAreaGroup.appendChild(rect);
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementClickHandler(evt,null,null);');
rect.addEventListener('click',f,false);
edgeLeft = this.document.createElementNS(SVGNS,"path");
edgeLeft.setAttribute("id",this.makeId('edgeLeft'+this.currMultiple));
plotAreaGroup.appendChild(edgeLeft);
edgeBottom = this.document.createElementNS(SVGNS,"path");
edgeBottom.setAttribute("id",this.makeId('edgeBottom'+this.currMultiple));
plotAreaGroup.appendChild(edgeBottom);
}
else {
rect = this.findSVGElement('plotArea'+this.currMultiple);
edgeLeft = this.findSVGElement('edgeLeft'+this.currMultiple);
edgeBottom = this.findSVGElement('edgeBottom'+this.currMultiple);
}
zenASSERT(rect,'rect is not defined',arguments);
rect.setAttribute("class","chart-plotArea");
rect.setAttribute("style",this.plotAreaStyle);
rect.setAttribute("x",this._plotLeft*scaleX);
rect.setAttribute("y",this._plotTop*scaleY);
rect.setAttribute("width",this._rplotWidth*scaleX);
rect.setAttribute("height",this._plotHeight*scaleY);
if (!is3D) {
edgeLeft.setAttribute("visibility","hidden");
edgeBottom.setAttribute("visibility","hidden");
}
else {
edgeLeft.setAttribute("class","chart-plotEdge");
edgeLeft.setAttribute("style",'opacity: 0.5;' + this.plotEdgeStyle);
edgeLeft.setAttribute("d",'M '+(this._plotLeftOut*scaleX)+' '+(this._plotTopOut*scaleY)+' L '+(this._plotLeft*scaleX)+' '+(this._plotTop*scaleY)+' '+(this._plotLeft*scaleX)+' '+(this._plotBottom*scaleY)+' '+(this._plotLeftOut*scaleX)+' '+(this._plotBottomOut*scaleY)+' z');
edgeLeft.setAttribute("visibility","visible");
edgeBottom.setAttribute("class","chart-plotEdge");
edgeBottom.setAttribute("style",this.plotEdgeStyle);
edgeBottom.setAttribute("d",'M '+(this._plotLeftOut*scaleX)+' '+(this._plotBottomOut*scaleY)+' L '+(this._plotLeft*scaleX)+' '+(this._plotBottom*scaleY)+' '+(this._rplotRight*scaleX)+' '+(this._plotBottom*scaleY)+' '+(this._rplotRightOut*scaleX)+' '+(this._plotBottomOut*scaleY)+' z');
edgeBottom.setAttribute("visibility","visible");
}
var clipGroup = this.findSVGElement('clipGroup'+this.currMultiple);
var clipLabelGroup = this.findSVGElement('clipLabelGroup'+this.currMultiple);
var virtualGroup = this.findSVGElement('virtualGroup'+this.currMultiple);
var virtualLabelGroup = this.findSVGElement('virtualLabelGroup'+this.currMultiple);
if (clipGroup == null) {
if ('3D' == this.appearance) {
clipGroup = this.document.createElementNS(SVGNS,"g");
}
else {
clipGroup = this.document.createElementNS(SVGNS,"svg");
}
clipGroup.setAttribute("id",this.makeId('clipGroup'+this.currMultiple));
plotAreaGroup.appendChild(clipGroup);
virtualGroup = this.document.createElementNS(SVGNS,"g");
virtualGroup.setAttribute("id",this.makeId('virtualGroup'+this.currMultiple));
clipGroup.appendChild(virtualGroup);
clipLabelGroup = this.document.createElementNS(SVGNS,"svg");
clipLabelGroup.setAttribute("id",this.makeId('clipLabelGroup'+this.currMultiple));
plotAreaGroup.appendChild(clipLabelGroup);
virtualLabelGroup = this.document.createElementNS(SVGNS,"g");
virtualLabelGroup.setAttribute("id",this.makeId('virtualLabelGroup'+this.currMultiple));
clipLabelGroup.appendChild(virtualLabelGroup);
}
this._labelPadL = this.plotToEdge ? 5 : 4;
this._labelPadR = this._labelPadL;
if (this.isTimeBased()) {
this._labelPadL = 0;	// JMD1130 pt2
this._labelPadR = 0;
}
virtualGroup.setAttribute("transform",'translate('+ -(parseFloat(this.scrollLeft)*scaleX)+',0)');
virtualLabelGroup.setAttribute("transform",'translate('+ -((parseFloat(this.scrollLeft)-this._labelPadL)*scaleX)+',0)');
if ('3D' == this.appearance) {
clipGroup.setAttribute("transform",'translate('+ (this._plotLeft*scaleX)+',0)');
}
else {
clipGroup.setAttribute("x",this._plotLeft*scaleX);
clipGroup.setAttribute("y",0);
clipGroup.setAttribute("height",100*scaleY);
clipGroup.setAttribute("width",this._rplotWidth*scaleX);
}
clipLabelGroup.setAttribute("x",(this._plotLeft - this._labelPadL)*scaleX);
clipLabelGroup.setAttribute("y",0*scaleY);
clipLabelGroup.setAttribute("height",100*scaleY);
clipLabelGroup.setAttribute("width",(this._rplotWidth + (this._labelPadL+this._labelPadR))*scaleX);
if (this.hasAxes()) {
this.renderBands();
if ('' != this.onrenderPlotArea) {
zenInvokeCallbackMethod(this.onrenderPlotArea,this,'onrenderPlotArea','chart',this);
}
this.renderAxes();
if (this._yLabelOnTheLeft) {
this.renderYLabels('left');
}
if (this._yLabelOnTheRight) {
this.renderYLabels('right');
}
this.renderXLabels();
}
var	axisLines = this.findSVGElement('axisLines'+this.currMultiple);
if (null == axisLines) {
axisLines = this.document.createElementNS(SVGNS,"path");
axisLines.setAttribute("id",this.makeId('axisLines'+this.currMultiple));
plotAreaGroup.appendChild(axisLines);
}
if (this.hasAxes()) {
axisLines.setAttribute("visibility","visible");
axisLines.setAttribute("class","chart-axisLines");
axisLines.setAttribute("style",this.axisLineStyle);
axisLines.setAttribute("d",'M '+(this._plotLeftOut*scaleX)+' '+(this._plotTopOut*scaleY)+' L '+(this._plotLeftOut*scaleX)+' '+(this._plotBottomOut*scaleY)+' Z M '+(this._plotLeftOut*scaleX)+' '+(this._plotBottomOut*scaleY)+' L '+(this._rplotRightOut*scaleX)+' '+(this._plotBottomOut*scaleY));
}
else {
axisLines.setAttribute("visibility","hidden");
}
if (this.warnIfNoData) { // JSL4478
var arr = this._dataSeries[0];
if (arr.length == 0 || ((this.seriesSize == 1)&&(arr.length==1)&&((arr[0]=="")||((typeof(arr[0])=="undefined"))))) {
this.showNoDataMsg(this.msgIfNoData,plotAreaGroup,clipGroup);		// DTB150 - use new clientmethod
}
else {
this.removeNoDataMsg(plotAreaGroup);								// DTB150 use new clientmethod
}//-JSL4478
}
}

self._ZEN_SVGComponent_chart_renderSeries = function(group) {
alert('Chart: renderSeries method is unimplemented.');
}

self._ZEN_SVGComponent_chart_renderSeriesGroup = function() {
if (zenIsMissing(this.document)) return;
var is3D = this.is3D();
var seriesGroup = this.findSVGElement('seriesGroup'+this.currMultiple);
var virtualGroup = this.findSVGElement('virtualGroup'+this.currMultiple);
if (null == seriesGroup) {
if ('3D' == this.appearance) {
seriesGroup = this.document.createElementNS(SVGNS,"g");
}
else {
seriesGroup = this.document.createElementNS(SVGNS,"svg");
}
seriesGroup.setAttribute("id",this.makeId('seriesGroup'+this.currMultiple));
virtualGroup.appendChild(seriesGroup);
}
while(null != seriesGroup.firstChild) {
seriesGroup.removeChild(seriesGroup.firstChild);
}
var adj = is3D ? 5 : 0;
if ('3D' == this.appearance) {
seriesGroup.setAttribute("transform",'translate(0,'+this._plotTop*this._scaleY+')');
}
else {
seriesGroup.setAttribute("y",this._plotTop*this._scaleY);
seriesGroup.setAttribute("width",(this._plotWidth + adj)*this._scaleX);
seriesGroup.setAttribute("height",(this._plotHeight + adj)*this._scaleY);
}
this.renderTimeEvents(seriesGroup);
this.updateIndicator();
this.renderSeries(seriesGroup);
}

self._ZEN_SVGComponent_chart_renderTimeEvents = function(group) {
delete this._timeEvents;
var events = null;
if (''!=this.ongetTimeEvents) {
events = zenInvokeCallbackMethod(this.ongetTimeEvents,this,'ongetTimeEvents');
}
if (!events || !events.length) return;
this._timeEvents = events;
/*
var events = [
{ start:'2012-01-01', end:'2012-11-02', caption:'Coumadin', style:'', marker:'square'},
];
*/
var sortedEvents = [];
for (var n = 0; n < events.length; n++) {
var old = events[n];
if (old) {
sortedEvents.push({index:n, start:zenGet(old.start,null),end:zenGet(old.end,null)});
}
}
sortedEvents.sort(function(a,b) {
var aDuration = 0;
if (a.start && a.end) {
var d1 = zenStringToDate(a.start);
var d2 = zenStringToDate(a.end);
aDuration = d2-d1;
}
var bDuration = 0;
if (b.start && b.end) {
var d1 = zenStringToDate(b.start);
var d2 = zenStringToDate(b.end);
bDuration = d2-d1;
}
if (aDuration<bDuration) return 1;
if(aDuration>bDuration) return -1;
return 0;
});
var scaleX = this._scaleX;
var scaleY = this._scaleY;
var boxHgt = 6;
var markerY = 6;
var y = this._plotBottom - this._plotTop;
var markerY = y - (boxHgt*1.5);
for (var n = 0; n < sortedEvents.length; n++) {
var sortEvent = sortedEvents[n];
if (!sortEvent) continue;
var idx = sortEvent.index;
var tlEvent = events[idx];
if (tlEvent && tlEvent.start) {
var x1 = this.getTimeX(tlEvent.start);
var x2 = tlEvent.end ? this.getTimeX(tlEvent.end) : x1;
var wid = x2-x1;
var mtype = zenGet(tlEvent.marker,'circle');
if (mtype!='none') {
var line = this.document.createElementNS(SVGNS,'line');
line.setAttribute('class','chart-timeEventLine');
line.setAttribute('x1',x1*scaleX);
line.setAttribute('x2',x1*scaleX);
line.setAttribute('y1',markerY*scaleY);
line.setAttribute('y2',y*scaleY);
group.appendChild(line);
var mk = this.createMarker(-2,idx,x1,markerY,zenGet(tlEvent.markerColor,'#808080'),mtype);
group.appendChild(mk);
}
var rect = this.document.createElementNS(SVGNS,'rect');
rect.setAttribute('class','chart-timeEvent');
rect.setAttribute('style',zenGet(tlEvent.style));
rect.setAttribute('x',x1*scaleX);
rect.setAttribute('width',wid*scaleX);
rect.setAttribute('y',(y-boxHgt)*scaleY);
rect.setAttribute('height',boxHgt*scaleY);
group.appendChild(rect);
rect.setAttribute('id',this.makeId('evrect'+this.currMultiple+'_' + (-2) + '_' + idx));
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementClickHandler(evt,'+(-2)+','+idx+');');
rect.addEventListener('click',f,false);
if (tlEvent.caption) {
var tStyle = this.computeStyle('chart-timeEventLabel',null);
var fSz = this.getComputedFontSize(tStyle, 12, 8, 16);
var text = this.createSVGTextNode(tlEvent.caption,fSz,this.autoScaleText,"start",0,group);
text.setAttribute("class","chart-xLabel");
this.embedStyle(text.firstChild,tStyle);
var th = 1.1*parseFloat(text.getAttribute("effectiveHeight"));
var tw = parseFloat(text.getAttribute("effectiveWidth"));
text.setAttribute("transform","translate("+((x1+0.2)*scaleX)+","+((y-boxHgt+th)*scaleY)+")");
if (tw > (wid*0.9)) {
text.setAttribute("visibility","hidden");
}
}
}
}
}

self._ZEN_SVGComponent_chart_renderTitle = function() {
this._titleHeight = 0;
this._titleImageWidth = 0;
this._titleImageTop = 0;
this._titleImageLeft = 0;
if (zenIsMissing(this.document)) return;
var text;
var chartTitleBox = this.findSVGElement('chartTitleBox'+this.currMultiple);
if (null != chartTitleBox) {
this.svgGroup.removeChild(chartTitleBox);
chartTitleBox = null;
}
var chartTitle = this.findSVGElement('chartTitle'+this.currMultiple);
if (null != chartTitle) {
this.svgGroup.removeChild(chartTitle);
chartTitle = null;
}
var chartSubtitle = this.findSVGElement('chartSubtitle'+this.currMultiple);
if (null != chartSubtitle) {
this.svgGroup.removeChild(chartSubtitle);
chartSubtitle = null;
}
var chartImage = this.findSVGElement('chartTitleImage'+this.currMultiple);
if (null != chartImage) {
this.svgGroup.removeChild(chartImage);
chartImage = null;
}
var trect = this.document.createElementNS(SVGNS,"rect");
trect.setAttribute("class","chart-titleBox");
trect.setAttribute("id",this.makeId('chartTitleBox'+this.currMultiple));
trect.setAttribute("style",this.titleBoxStyle);
this.svgGroup.appendChild(trect);
var titleText = this.getChartTitle();
var subtitleText = this.getChartSubtitle();
var titleH = 0;
var subtitleH = 0;
var imageLeft = 0;
var imageTop = 0;
var imageWidth = 0;
var imageHeight = 0;
if (this.titleImage) {
var currUrl = window.location.href.split("/");
var imageURL = currUrl[0] + "//" + currUrl[2] + "/csp/sys/" + this.titleImage;
var imageStyle = this.titleImageStyle;
}
if (imageURL) {
imageWidth = 50;
imageHeight = 50;
if (imageStyle) {
var t = imageStyle.toString().split(';');
for (var ti = 0; ti < t.length; ti++) {
var t2 = t[ti].toString().split(':');
switch (t2[0]) {
case 'left':
imageLeft = parseInt(t2[1],10);
break;
case 'top':
imageTop = parseInt(t2[1],10);
break;
case 'width':
imageWidth = parseInt(t2[1],10);
break;
case 'height':
imageHeight = parseInt(t2[1],10);
break;
}
}
}
this._titleImageWidth = imageWidth / this._scaleX;
this._titleImageTop = imageTop / this._scaleY;
this._titleImageLeft = imageLeft / this._scaleX;
}
if (imageURL) {
var image = this.document.createElementNS(SVGNS,'image');
image.setAttribute("id",this.makeId('chartTitleImage'+this.currMultiple));
image.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href',imageURL);
image.setAttribute('preserveAspectRatio','none');
image.setAttribute('x',imageLeft);
image.setAttribute('y',imageTop);
image.setAttribute('width',imageWidth);
image.setAttribute('height',imageHeight);
this.svgGroup.appendChild(image);
}
if ('' != titleText) {
var titleStyleObj = this.computeStyle('chart-title','chartTitle');
var titleStyle = this.hasMultiples() ? (this.titleStyle+this.multipleTitleStyle) : this.titleStyle;
if (titleStyle) this.integrateStyleSpec(titleStyleObj,titleStyle);
var fSz = this.getComputedFontSize(titleStyleObj, 14, 8, 18);
var anchor = ('left'==this.titleAlign) ? 'start' : ('right'==this.titleAlign) ? 'end' : 'middle';
var text = this.createSVGTextNode(titleText,fSz,this.autoScaleText,anchor,0,this.svgGroup);
text.setAttribute("id",this.makeId('chartTitle'+this.currMultiple));
text.setAttribute("class","chart-title");
this.embedStyle(text.firstChild,titleStyleObj);
titleH = (parseFloat(text.getAttribute("logicalHeight"))* 1.2);
}
if ('' != subtitleText) {
var subtitleStyleObj = this.computeStyle('chart-subtitle',null);
var subtitleStyle = this.subtitleStyle;
if (subtitleStyle) this.integrateStyleSpec(subtitleStyleObj,subtitleStyle);
var fSz = this.getComputedFontSize(subtitleStyleObj, 9, 6, 12);
var anchor = ('left'==this.titleAlign) ? 'start' : ('right'==this.titleAlign) ? 'end' : 'middle';
var stext = this.createSVGTextNode(subtitleText,fSz,this.autoScaleText,anchor,0,this.svgGroup);
stext.setAttribute("id",this.makeId('chartSubtitle'+this.currMultiple));
stext.setAttribute("class","chart-subtitle");
this.embedStyle(stext.firstChild,subtitleStyleObj);
subtitleH = (parseFloat(stext.getAttribute("logicalHeight"))* 1.2);
}
this._titleHeight = parseFloat(titleH) + parseFloat(subtitleH);
if (this._titleHeight < (imageHeight + imageTop)/this._scaleY) {
this._titleHeight = (imageHeight + imageTop)/this._scaleY;
}
}

self._ZEN_SVGComponent_chart_renderXAxisTimeLine = function(timeCellGroup,y) {
var majorHeight = 3;
var minorHeight = 1;
var minorHeight2 = 1.5;
var scaleX = this._scaleX;
var scaleY = this._scaleY;
var plotWidth = this._rplotWidth;
var offset = this._offset;
var startUnits = this._startUnits;
var endUnits = this._endUnits;
var majorUnits = this._majorUnits;
var minorUnits = this._minorUnits;
var d = '';
var dMinor = '';
if (plotWidth>0) {
var lastLabelX = 0;
for (var cell = startUnits; cell <= endUnits; cell++) {
var info = this.getCellInfo(cell,majorUnits,minorUnits,cell-startUnits);
var x = (this._pixPerSec * (info.startSecs-offset));
d += ' M ' + x*scaleX + ' ' + this._plotTop*scaleY + ' L ' + x*scaleX + ' ' + this._plotBottom*scaleY;
var tick = this.document.createElementNS(SVGNS,'line');
tick.setAttribute('class','chart-majorTick');
tick.setAttribute('x1',x*scaleX);
tick.setAttribute('x2',x*scaleX);
tick.setAttribute('y1',y*scaleY);
if ((lastLabelX==0)||(lastLabelX<x)) {
tick.setAttribute('y2',(y+majorHeight)*scaleY);
}
else {
tick.setAttribute('y2',(y+minorHeight)*scaleY);
}
timeCellGroup.appendChild(tick);
if ('' != info.caption && ((lastLabelX==0)||(lastLabelX<x))) {
var tStyle = this.computeStyle('chart-xLabel',null);
if (this._xLabelStyle) this.integrateStyleSpec(tStyle,this._xLabelStyle);
var fSz = this.getComputedFontSize(tStyle, 12, 8, 16);
var text = this.createSVGTextNode(info.caption,fSz,this.autoScaleText,"start",0,timeCellGroup);
text.setAttribute("class","chart-xLabel");
this.embedStyle(text.firstChild,tStyle);
var h = 1.1*parseFloat(text.getAttribute("effectiveHeight"));
lastLabelX = x + parseFloat(text.getAttribute("effectiveWidth"));
text.setAttribute("transform","translate("+((x+0.2)*scaleX)+","+((y+h)*scaleY)+")");
}
var deltaPix = scaleX * (info.minorTicks[1] - info.minorTicks[0]) * this._pixPerSec;
var freq = (deltaPix<=4) ? 3 : 1;
for (var j = 0; j < info.minorTicks.length; j++) {
if ((j-freq)%freq==0) {
var xm = (this._pixPerSec * (info.minorTicks[j]-offset));
var tick = this.document.createElementNS(SVGNS,'line');
tick.setAttribute('class','chart-minorTick');
tick.setAttribute('x1',xm*scaleX);
tick.setAttribute('x2',xm*scaleX);
tick.setAttribute('y1',y*scaleY);
if (majorUnits=='months' && j%5==0) {
tick.setAttribute('y2',(y+minorHeight2)*scaleY);
}
else {
tick.setAttribute('y2',(y+minorHeight)*scaleY);
}
timeCellGroup.appendChild(tick);
if (this._xMinorGrid) {
dMinor += ' M ' + xm*scaleX + ' ' + this._plotTop*scaleY + ' L ' + xm*scaleX + ' ' + this._plotBottom*scaleY;
}
}
}
}
}
var xgrid = this.findSVGElement('xGridLineMinor'+this.currMultiple);
if (xgrid) {
if (this._xMinorGrid && dMinor) {
xgrid.setAttribute("d",dMinor);
xgrid.setAttribute("visibility","visible");
}
else {
xgrid.setAttribute("visibility","hidden");
}
}
var xgrid = this.findSVGElement('xGridLine'+this.currMultiple);
if (xgrid) {
if (this._xMajorGrid && d) {
xgrid.setAttribute("d",d);
xgrid.setAttribute("visibility","visible");
}
else {
xgrid.setAttribute("visibility","hidden");
}
}
}

self._ZEN_SVGComponent_chart_renderXAxisTitle = function(group) {
var titleAdj=0;
var xt = this.findSVGElement('xAxisTitle'+this.currMultiple);
if (xt) {
this.svgGroup.removeChild(xt);
}
var xAxisTitle = this.getXAxisTitle();
if ('' != xAxisTitle) {
var tStyle = this.computeStyle('chart-xAxisTitle',null);
if (this.axisTitleStyle) this.integrateStyleSpec(tStyle,this.axisTitleStyle);
var fSz = this.getComputedFontSize(tStyle, 12, 8, 16);
var text = this.createSVGTextNode(xAxisTitle,fSz,this.autoScaleText,"middle",0,group);
text.setAttribute("id",this.makeId('xAxisTitle'+this.currMultiple));
text.setAttribute("class","chart-xAxisTitle");
this.embedStyle(text.firstChild,tStyle);
var tx = (this._plotLeftOut + this._rplotWidth/2);
tx = isNaN(tx) ? 0 : tx;			// DTB197 - Prevent NaN error on chart load
if (this._xLabelOnTheTop) {
var ty = this._plotTopOut - (this._maxXHeight ? this._maxXHeight : 2);
}
else {
var ty = 100 - (4/this._scaleY);
}
titleAdj = parseFloat(text.getAttribute("logicalHeight"))+2*this.getPelToPixelVRatio();
text.setAttribute("transform","translate("+(tx*this._scaleX)+","+(ty*this._scaleY)+")");
}
return(titleAdj);
}

self._ZEN_SVGComponent_chart_renderXLabels = function() {
if (zenIsMissing(this.document)) return;
var is3D = this.is3D();
var virtualLabelGroup = this.findSVGElement('virtualLabelGroup'+this.currMultiple);
if (virtualLabelGroup == null) { // JSL4487
return; // JSL4487
}
var xLabelGroup = this.prepareAxisGroup('xLabelGroup',virtualLabelGroup);
this.renderXAxisTitle(this.svgGroup);
if (!this.labelsVisible) {
if (this.isTimeBased()) {
this.computeXAxisTimeLine();
}
}
else if (this.labelsVisible && this._xLabelUnits > 0) {
var tStyle = this.computeStyle('chart-xLabel',null);
if (this.labelStyle) this.integrateStyleSpec(tStyle,this.labelStyle);
if (this._xLabelStyle) this.integrateStyleSpec(tStyle,this._xLabelStyle);
var fSz = this.getComputedFontSize(tStyle, 12, 8, 16);
var th = fSz;
if (!this.autoScaleText) {
th = fSz*this.getPelToPixelVRatio();
}
var angle = 0;
if (this._xLabelAngle) angle = -this._xLabelAngle;
if (this._xLabelOnTheTop) {
var y = this._plotTopOut;
}
else {
var y = this._plotBottomOut;
}
var rotated = (this._xLabelAngle != '' && this._xLabelAngle != 0);
var idx=[];
var lWidth=[];
var maxWidth = 0;
var dx = 0;
var adj = 0;
if (this.isTimeBased()) {
this.computeXAxisTimeLine();
this.renderXAxisTimeLine(xLabelGroup,this._plotBottomOut);
}
else if (this._xGridType == 'value') {
var start = Math.ceil(Math.abs(this._xMinValue/this._xLabelUnits))*this._xLabelUnits*(this._xMinValue>=0 ? 1 : -1);
var end = Math.floor(Math.abs(this._xMaxValue/this._xLabelUnits))*this._xLabelUnits*(this._xMaxValue>=0 ? 1 : -1);
dx = this.getPlotX(start + this._xLabelUnits) - this.getPlotX(start);
var limit = 0;
for (var v = start; v <= end && limit < 100; v += this._xLabelUnits, limit++) {
idx[limit]=v;
var text =this.createXLabelNode(v, fSz, tStyle, 0, this.svgGroup);
lWidth[limit] = parseFloat(text.getAttribute("LogicalWidth"));
lWidth[limit] = parseFloat(text.getAttribute("logicalWidth"));
if (lWidth[limit]>maxWidth) maxWidth=lWidth[limit];
this.svgGroup.removeChild(text);
}
}
else {
var items = !this.usePercentForRange() ? this.getSeriesSize() : this.getSeriesCount();
if (this.plotToEdge) {
dx = (items<=1) ? (this._plotWidth/2) : (this._plotWidth / (items-1));
adj = (items<=1) ? 0 : dx;
}
else {
dx = (items<=1) ? (this._plotWidth/2) : (this._plotWidth / items);
adj = (items<=1) ? 0 : (is3D?dx:dx/2);
}
var limit = 0;
for (var n = 0; n < items; n++, limit++) {
if (n%this._xLabelUnits ==0) {
idx[limit]=n;
var text =this.createXLabelNode(n, fSz, tStyle, 0, this.svgGroup);
lWidth[limit] = parseFloat(text.getAttribute("logicalWidth"));
if (lWidth[limit]>maxWidth) maxWidth=lWidth[limit];
this.svgGroup.removeChild(text);
}
}
}
if (idx.length==0) return;
var skip = 1;
if (dx<maxWidth) { // Houston, we have a problem...
if (!this.autoScaleText || this._xGridType != 'value' ) {
var nDx = dx;
if (!this.autoScaleText) {
nDx = (dx*this._scaleX)/this.getPelToPixelHRatio();
}
angle = -90;
if (isNaN(angle)) {
if (this._xGridType == 'value') {
skip=Math.ceil(fSz/nDx);
}
else { // need to squish font
fSz = nDx;
}
}
}
else {
skip = Math.ceil(maxWidth/dx);
}
}
if (skip>idx.length-1) skip = idx.length-1;
var x=0;
for (var n=0;n<idx.length;n++) {
if (this._xGridType == 'value') {
var x = this.getPlotX(idx[n])+ ((is3D&&this.chartPivot) ? -5:0) - this._plotLeft;
}
else {
x += dx;
}
if (skip == 0) { // just one label JSL4141
var nModSkip = 0;
} else {
var nModSkip = n % skip;
}
if (nModSkip==0) {
var text =this.createXLabelNode(idx[n], fSz, tStyle, angle, xLabelGroup);
var yAdj = 0; // parseFloat(text.getAttribute("yOffset"))/this._scaleY;
var th = parseFloat(text.getAttribute("effectiveHeight"));
var ofs = 0;
if (angle!=0) {
yAdj = -2;
ofs = -2/this._scaleX;
}
else {
if (is3D && !this.plotToEdge) {
ofs = -parseFloat(text.getAttribute("effectiveWidth"))/2;
}
}
if (this._xLabelOnTheTop) {
text.setAttribute("transform","translate("+((x-adj-ofs)*this._scaleX)+","+((y*this._scaleY)-1)+")");
}
else {
text.setAttribute("transform","translate("+((x-adj-ofs)*this._scaleX)+","+((y+th-yAdj)*this._scaleY)+")");
}
}
}
}
}

self._ZEN_SVGComponent_chart_renderYAxisTitle = function(group,which,xpos) {
var yt = this.findSVGElement('yAxisTitle'+which+this.currMultiple);
if (yt) {
group.removeChild(yt);
}
var yAxisTitle = this.getYAxisTitle(which);
if ('' != yAxisTitle) {
var yAxisNo = this.getCurrYAxis(which);
var tStyle = this.computeStyle('chart-yAxisTitle',null);
if (this.axisTitleStyle) this.integrateStyleSpec(tStyle,this.axisTitleStyle);
var fSz = this.getComputedFontSize(tStyle, 12, 8, 16);
var angle = (which=='right') ? 90 : -90;
var text = this.createSVGTextNode(yAxisTitle,fSz,this.autoScaleText,"middle",angle,group);
text.setAttribute("id",this.makeId('yAxisTitle'+which+this.currMultiple));
text.setAttribute("class","chart-yAxisTitle");
this.embedStyle(text.firstChild,tStyle);
var tx = 0;
var ty = this._plotTopOut + this._plotHeight/2;
if (which=='right') {
tx = 100 - parseFloat(text.getAttribute("effectiveWidth"))*1.1;
}
else {
tx = parseFloat(text.getAttribute("effectiveWidth"))*1.1;
}
text.setAttribute("transform","translate("+(tx*this._scaleX)+","+(ty*this._scaleY)+")");
return(tx);
}
return(0);
}

self._ZEN_SVGComponent_chart_renderYLabels = function(which) {
if (zenIsMissing(this.document)) return(0);
var is3D = this.is3D();
which = ('undefined' == typeof which) ? 'left' : which;
var yLabelGroup = this.prepareAxisGroup('yLabelGroup'+which+this.currMultiple,this.svgGroup);
var yAxisNo = this.getCurrYAxis(which);
var titleWidth = this.renderYAxisTitle(yLabelGroup,which,this._rplotRightOut+(is3D?5:0));
var xoffPix = 5/this._scaleX;	// pixel offset	used for padding
var maxWidth = 0;
if (this.labelsVisible && this._yLabelUnits[yAxisNo] > 0) {
var tStyle = this.computeStyle('chart-yLabel',null);
if (this.labelStyle) this.integrateStyleSpec(tStyle,this.labelStyle);
if (this._yLabelStyle[yAxisNo]) this.integrateStyleSpec(tStyle,this._yLabelStyle[yAxisNo]);
var fSz = this.getComputedFontSize(tStyle, 12, 8, 16);
var tx = which=='left' ? (this._plotLeftOut):(this._rplotRightOut+(is3D?5:0));
var tw = 0;
var rotate = (this._yLabelAngle[yAxisNo] != '' && this._yLabelAngle[yAxisNo] != 0);
var angle = 0;
if (this._yLabelAngle[yAxisNo]) angle= -this._yLabelAngle[yAxisNo];
if (angle>0) angle = 0;
if (angle<-60) angle = -60;
if (this._yGridType == 'value') {
var start = Math.ceil(Math.abs(this._yMinValue[yAxisNo]/this._yLabelUnits[yAxisNo]))*this._yLabelUnits[yAxisNo]*(this._yMinValue[yAxisNo]>=0 ? 1 : -1);
var end = Math.floor(Math.abs(this._yMaxValue[yAxisNo]/this._yLabelUnits[yAxisNo]))*this._yLabelUnits[yAxisNo]*(this._yMaxValue[yAxisNo]>=0 ? 1 : -1);
var lbl = [];
var show = [];
var limit = 0;
for (var v = start; v <= end && limit < 100; v += this._yLabelUnits[yAxisNo], limit++) {
lbl[limit] = this.getYLabelText(v,yAxisNo);
if (this.autoScaleText) show[limit]=1;
else show[limit]=0;
}
if (!this.autoScaleText) {
var vSpace = (fSz*this.getPelToPixelVRatio()*1.23);
if (angle!=0) {
var aRad = Math.PI * (angle/180);
var cos = Math.cos(aRad);
vSpace = vSpace/cos;
}
this.pickVerticalSkips(show,Math.floor((this._plotHeight*this._scaleY)/vSpace));
}
var limit = 0;
for (var v = start; v <= end && limit < 100; v += this._yLabelUnits[yAxisNo], limit++) {
if (show[limit]==1) {
var y = this.getPlotY(v,yAxisNo) + ((is3D&&!this.chartPivot&&which=='left') ? 5:0);
var text = this.createSVGTextNode(lbl[limit],fSz,this.autoScaleText, (which=='left'?"end":"start"), angle, yLabelGroup);
text.setAttribute("class","chart-yLabel");
this.embedStyle(text.firstChild,tStyle);
var ty = y+1;
text.setAttribute("transform","translate("+(( tx + (which=='left'?-xoffPix:xoffPix) )*this._scaleX)+","+((ty)*this._scaleY)+")");
}
}
}
else {
var items = !this.usePercentForRange() ? this.getSeriesSize() : this.getSeriesCount();
if (items > 0 && this._plotHeight>0) {
var dy,adj;
if (this.plotToEdge) {
dy = (items<=1) ? (this._plotHeight/2) : (this._plotHeight / (items-1));
adj = (items<=1) ? 0 : dy;
}
else {
dy = (items<=1) ? (this._plotHeight/2) : (this._plotHeight / items);
adj = (items<=1) ? 0 : dy/2;
}
var y = this._plotTopOut;
var lastY = y;
var th = 0;
if (!this.autoScaleText) {
var mFZ = (dy*this._scaleY)/this.getPelToPixelVRatio()*1.23;
if (fSz>mFZ) {
fSz = mFZ/1.23;
}
}
for (var n = 0; n < items; n++) {
y += dy;
var text = this.createSVGTextNode(this.getYLabelText(n,yAxisNo),fSz,this.autoScaleText, (which=='left'?"end":"start"), angle, yLabelGroup);
text.setAttribute("class","chart-yLabel");
this.embedStyle(text.firstChild,tStyle);
if (angle==0) {
lh = text.getAttribute("logicalHeight");
th = lh/3;
}
var ty = y - adj + th;
text.setAttribute("transform","translate("+(( tx + (which=='left'?-xoffPix:xoffPix) )*this._scaleX)+","+(ty*this._scaleY)+")");
lastY = y;
}
}
}
}
return tx;		// DTB197 - Return the logical space needed to render the labels with no collisions
}

self._ZEN_SVGComponent_chart_renderZoomTool = function() {
var dx = 24;
var x = 10;
var y = 6;
var group = this.findSVGElement('controlBar');
var zoomIn = this.findSVGElement('zoomIn');
var zoomOut = this.findSVGElement('zoomOut');
var scrollLeft = this.findSVGElement('scrollLeft');
var scrollRight = this.findSVGElement('scrollRight');
if (null == zoomIn) {
zoomIn = this.document.createElementNS(SVGNS,"path");
zoomIn.setAttribute("id",this.makeId('zoomIn'));
zoomIn.setAttribute("d",'M 0 0 l 4.8 0 0 -4.8 4.8 0 0 4.8 4.8 0 0 4.8 -4.8 0 0 4.8 -4.8 0 0 -4.8 -4.8 0 z');
zoomIn.setAttribute("class",'chart-scrollButton');
zoomIn.setAttribute("style",this.scrollButtonStyle);
group.appendChild(zoomIn);
var f = new Function('evt','return zenPage.getComponent('+this.index+').zoomToolHandler(evt,true);');
zoomIn.addEventListener('click',f,false);
zoomOut = this.document.createElementNS(SVGNS,"path");
zoomOut.setAttribute("id",this.makeId('zoomOut'));
zoomOut.setAttribute("d",'M 0 4.8 l 13.8 0 0 -4.8 -13.8 0 z');
zoomOut.setAttribute("class",'chart-scrollButton');
zoomOut.setAttribute("style",this.scrollButtonStyle);
group.appendChild(zoomOut);
var f = new Function('evt','return zenPage.getComponent('+this.index+').zoomToolHandler(evt,false);');
zoomOut.addEventListener('click',f,false);
scrollLeft = this.document.createElementNS(SVGNS,"path");
scrollLeft.setAttribute("id",this.makeId('scrollLeft'));
scrollLeft.setAttribute("class",'chart-scrollButton');
scrollLeft.setAttribute("style",this.scrollButtonStyle);
scrollLeft.setAttribute("d",'M 0 3 l 4 -4 8 0 0 8 -8 0 z');
group.appendChild(scrollLeft);
var f = new Function('evt','return zenPage.getComponent('+this.index+').scrollHandlerDown(evt,true);');
scrollLeft.addEventListener('mousedown',f,false);
var f = new Function('evt','return zenPage.getComponent('+this.index+').scrollHandlerUp(evt);');
scrollLeft.addEventListener('mouseup',f,false);
scrollRight = this.document.createElementNS(SVGNS,"path");
scrollRight.setAttribute("d",'M 3 3 l -4 -4 -8 0 0 8 8 0 z');
scrollRight.setAttribute("id",this.makeId('scrollRight'));
scrollRight.setAttribute("class",'chart-scrollButton');
scrollRight.setAttribute("style",this.scrollButtonStyle);
group.appendChild(scrollRight);
var f = new Function('evt','return zenPage.getComponent('+this.index+').scrollHandlerDown(evt,false);');
scrollRight.addEventListener('mousedown',f,false);
var f = new Function('evt','return zenPage.getComponent('+this.index+').scrollHandlerUp(evt);');
scrollRight.addEventListener('mouseup',f,false);
var f = new Function('evt','if (parseFloat(evt.target.getAttribute("opacity"))>=0.5){evt.target.setAttribute("opacity",1.0);}return true;');
zoomIn.addEventListener('mouseover',f,false);
zoomOut.addEventListener('mouseover',f,false);
scrollLeft.addEventListener('mouseover',f,false);
scrollRight.addEventListener('mouseover',f,false);
var f = new Function('evt','if (parseFloat(evt.target.getAttribute("opacity"))>=0.5){evt.target.setAttribute("opacity",0.6);}return true;');
zoomIn.addEventListener('mouseout',f,false);
zoomOut.addEventListener('mouseout',f,false);
scrollLeft.addEventListener('mouseout',f,false);
scrollRight.addEventListener('mouseout',f,false);
}
zoomIn.setAttribute("transform","translate("+x+","+y+")");
x += dx;
zoomOut.setAttribute("transform","translate("+x+","+y+")");
x += dx;
scrollLeft.setAttribute("transform","translate("+x+","+y+")");
x += dx;
scrollRight.setAttribute("transform","translate("+x+","+y+")");
x += dx;
if (this.chartPivot || this._hzMaxStep == 0 || this.hzZoomStep == 0) {
scrollRight.setAttribute("display",'none');
scrollLeft.setAttribute("display",'none');
}
else {
scrollRight.setAttribute("display",'block');
scrollLeft.setAttribute("display",'block');
scrollRight.setAttribute("opacity",0.75);
scrollLeft.setAttribute("opacity",0.75);
var currScroll = parseFloat(this.scrollLeft);
if (currScroll >= this._maxScrollLeft) {
scrollRight.setAttribute("opacity",0.1);
}
if (currScroll <= 0) {
scrollLeft.setAttribute("opacity",0.1);
}
}
if (this.chartPivot || this._hzMaxStep == 0) {
zoomIn.setAttribute("display",'none');
zoomOut.setAttribute("display",'none');
}
else {
zoomIn.setAttribute("display",'block');
zoomOut.setAttribute("display",'block');
zoomIn.setAttribute("opacity",0.75);
zoomOut.setAttribute("opacity",0.75);
var currStep = parseInt(this.hzZoomStep);
if (currStep >= this._hzMaxStep) {
zoomIn.setAttribute("opacity",0.1);
}
if (currStep <= 0) {
zoomOut.setAttribute("opacity",0.1);
}
}
}

self._ZEN_SVGComponent_chart_revealToolTip = function() {
if (this._tooltip) {
this._tooltipAnimate = this._tooltipAnimate * 0.95;
var opacity = 1-this._tooltipAnimate;
opacity = (opacity>0.99) ? 1 : opacity;
this._tooltip.setAttribute("opacity",opacity);
if (opacity < 1) {
this._timerId = window.setTimeout("zenPage.getComponent(" + this.index + ").revealToolTip()",5);
}
}
}

self._ZEN_SVGComponent_chart_scrollHandler = function(left) {
var go = false;
this.scrollLeft = parseFloat(this.scrollLeft);
this.scrollLeft = isNaN(this.scrollLeft) ? 0 : this.scrollLeft;
var currScroll = this.scrollLeft;
var items = !this.usePercentForRange() ? this.getSeriesSize() : this.getSeriesCount();
if (this.hasMultiples()) {
items = this.getSeriesSize();
}
var int = (this._interval) ? Math.floor(this._interval) : 1;
var delta = int * (this._plotWidth / items);
if (left && currScroll > 0) {
this.scrollLeft -= delta;
this.scrollLeft = (this.scrollLeft < 1) ? 0 : this.scrollLeft;
go = true;
}
else if (!left && currScroll < this._maxScrollLeft) {
this.scrollLeft += delta;
this.scrollLeft = (this.scrollLeft > (this._maxScrollLeft-1)) ? this._maxScrollLeft : this.scrollLeft;
go = true;
}
if (go) {
var multiples = 1;
if (this.hasMultiples()) {
multiples = this.getSeriesCount();
}
this.currMultiple = '';
for (var n = 0; n < multiples; n++) {
if (this.hasMultiples()) {
this.currMultiple = n;
}
var virtualGroup = this.findSVGElement('virtualGroup'+this.currMultiple);
virtualGroup.setAttribute("transform",'translate('+ -(parseFloat(this.scrollLeft)*this._scaleX)+',0)');
var virtualLabelGroup = this.findSVGElement('virtualLabelGroup'+this.currMultiple);
virtualLabelGroup.setAttribute("transform",'translate('+ -((parseFloat(this.scrollLeft)-this._labelPadL)*this._scaleX)+',0)');
}
var scrollLeft = this.findSVGElement('scrollLeft');
var scrollRight = this.findSVGElement('scrollRight');
currScroll = parseFloat(this.scrollLeft);
if (currScroll >= this._maxScrollLeft) {
scrollRight.setAttribute("opacity",0.3);
}
else {
scrollRight.setAttribute("opacity",0.6);
}
if (currScroll <= 0) {
scrollLeft.setAttribute("opacity",0.3);
}
else {
scrollLeft.setAttribute("opacity",0.6);
}
}
}

self._ZEN_SVGComponent_chart_scrollHandlerDown = function(evt,left) {
this._interval = 1;
if (this._timerId) {
window.clearTimeout(this._timerId);
delete this._timerId;
}
this.scrollHandler(left);
this._timerId = window.setTimeout("zenPage.getComponent(" + this.index + ").btnTimerHandler("+(left?'true':'false')+")",750);
}

self._ZEN_SVGComponent_chart_scrollHandlerUp = function(evt) {
if (this._timerId) {
window.clearTimeout(this._timerId);
delete this._timerId;
}
}

self._ZEN_SVGComponent_chart_selectElement = function(series,item) {
if (this.selectedSeries != series || this.selectedItem != item) {
series = parseInt(series,10);
item = parseInt(item,10);
this.selectedSeries = series;
this.selectedItem = item;
var scount = this.getSeriesCount();
var icount = this.getSeriesSize();
if (this.showMultiples) {
for (var s = 0; s < scount; s++) {
this.currMultiple = s;
this.updateIndicator();
}
this.currMultiple = '';
}
else {
this.updateIndicator();
}
for (var s = 0; s < scount; s++) {
for (var i = 0; i < icount; i++) {
var el = this.getChartElement(s,i);
if (el) {
var isMarker = el.getAttribute('isMarker');
var style = this.getChartElementStyle(s,i)+this.getSelectedStyle(s,i,isMarker);
el.setAttribute('style',style);
var rel = this.getChartRelatedElements(s,i);
if (rel && rel.length) {
var relStyle = this.getRelatedElementStyle(s,i);
if (relStyle) {
style = relStyle;
}
for (var n = 0; n < rel.length; n++) {
rel[n].setAttribute('style',style);
}
}
}
}
}
}
}

self._ZEN_SVGComponent_chart_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_chart_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._ZEN_SVGComponent_chart_setCurrYAxis = function(axisNo) {
this.setProperty('currYAxis',axisNo);
}

self._ZEN_SVGComponent_chart_setDimToolTip = function(captions,values,x,y,final) {
if (x<0) x=0;
var style = 'stroke-opacity:0.5;stroke:darkblue;stroke-width:3;';
var sno = isNaN(parseInt(this.seriesNumber)) ? this._mouseOverSeries : 0;
var el = this.getChartElement(this._mouseOverSeries, this._mouseOverItem);
if (el) {
el.setAttribute('style',this.getChartElementStyle(sno, this._mouseOverItem) + this.getSelectedStyle(sno, this._mouseOverItem) + style);
}
var rel = this.getChartRelatedElements(this._mouseOverSeries, this._mouseOverItem);
if (rel && rel.length) {
for (var n = 0; n < rel.length; n++) {
rel[n].setAttribute('style',this.getChartElementStyle(sno, this._mouseOverItem) + style);
}
}
try {
if (this._tooltip != null) {
this.svgGroup.removeChild(this._tooltip);
}
} catch(err) {
}
if (final == true) {
try {
this.svgGroup.removeChild(this._tooltip);
} catch (ex) {
}
}
ttGroup = this.document.createElementNS(SVGNS,"svg");
this.svgGroup.appendChild(ttGroup);
ttGroup.setAttribute("x",x); // JSL4484
ttGroup.setAttribute("y",y); // JSL4484
this._tooltipAnimate = 1;
this._tooltip = ttGroup;
this._tooltip.setAttribute("opacity",0);
var brect = this.document.createElementNS(SVGNS,"rect");
brect.setAttribute("class",'chart-tooltipRect');
if (!zenIsMissing(this.tooltipRectStyle)) {
brect.setAttribute("style", this.tooltipRectStyle);
}
brect.setAttribute("x",1);
brect.setAttribute("y",1);
brect.setAttribute("rx",4);
brect.setAttribute("width",25*this._scaleX - 2);
brect.setAttribute("height",10*this._scaleY - 2);
ttGroup.appendChild(brect);
var who=navigator.userAgent;
if (who.indexOf("Firefox")>=0) {
brect.setAttribute("style",'stroke:3px;');
}
else {
ttGroup.setAttribute("style","filter: url(#dropShadow);");
}
var labelText = new Array();
var labelValue = new Array();
var tx = 0;
var ty = 1;
var lwid = 0;
var vwid = 0;
var fSz = 12;
for (var n = 0; n < captions.length; n++) {
var val = values[n];
if ((null != val) && ('' != val)) {
var tg = this.createSVGTextNode(captions[n],fSz,false,"end",0,ttGroup);
labelText[n] = tg.firstChild;
labelText[n].setAttribute("class","chart-tooltipCaption");
var tsz = labelText[n].getComputedTextLength() / this._scaleX;
lwid = (lwid > tsz) ? lwid : tsz;
var tg = this.createSVGTextNode(val,fSz,false,"start",0,ttGroup);
labelValue[n] = tg.firstChild;
labelValue[n].setAttribute("class","chart-tooltipValue");
var textNode = this.document.createTextNode(val);
var vsz = labelValue[n].getComputedTextLength() / this._scaleX;
vwid = (vwid > vsz) ? vwid : vsz;
var th = (zenGetBBox(labelValue[n]).height * 1.2) / this._scaleY;
ty += th;
labelText[n].setAttribute("y",ty*this._scaleY);
labelValue[n].setAttribute("y",ty*this._scaleY);
}
}
brect.setAttribute("height",((ty*this.getPelToPixelVRatio()) + 2)*this._scaleY);
brect.setAttribute("width",(((lwid + vwid)*this.getPelToPixelVRatio()) + 10)*this._scaleX);
for (var n = 0; n < captions.length; n++) {
if (labelText[n] && labelValue[n]) {
labelText[n].setAttribute("x",(1 + lwid)*this._scaleX);
labelValue[n].setAttribute("x",(3 + lwid)*this._scaleX);
}
}
var height = parseFloat(brect.getAttribute("height"));
var width = parseFloat(brect.getAttribute("width"));
var plotRect = this.findSVGElement('plotArea'+this.currMultiple);
var noPlotRect = 0;
if (plotRect == null) {
noPlotRect = 1;
var scaleX = this._scaleX;
var scaleY = this._scaleY;
plotRect = this.document.createElementNS(SVGNS,"rect");;
plotRect.setAttribute("class","chart-plotArea");
plotRect.setAttribute("style",this.plotAreaStyle);
plotRect.setAttribute("x",this._plotLeft*scaleX);
plotRect.setAttribute("y",this._plotTop*scaleY);
plotRect.setAttribute("width",this._rplotWidth*scaleX);
plotRect.setAttribute("height",this._plotHeight*scaleY);
}
var plotRectWidth = parseFloat(plotRect.getAttribute('width'));
var plotRectHeight = parseFloat(plotRect.getAttribute('height'));
var xPlotRect = parseFloat(plotRect.getAttribute('x'));
var yPlotRect = parseFloat(plotRect.getAttribute('y'));
if (final == false) {
if (x + width > xPlotRect + plotRectWidth ) {
this.setDimToolTip(captions, values, xPlotRect + (plotRectWidth - width), y, true);
x = xPlotRect + (plotRectWidth - width);
}
if (y + height > yPlotRect + plotRectHeight) {
this.setDimToolTip(captions, values, x, yPlotRect +(plotRectHeight-height), true);
}
}
if (noPlotRect) {
delete plotRect;
}
}

self._ZEN_SVGComponent_chart_setProperty = function(property,value1,value2) {
var value = value1;
switch(property) {
case 'backgroundStyle':
var attrs = this.parseStyleSVG(this.backgroundStyle); // JSL4483
if (zenGet(attrs['opacity']) == '') {                 // JSL4483
attrs['opacity'] = 1.0;                           // JSL4483
}                                                     // JSL4483
this.setSeeThrough(attrs['opacity']);                 // JSL4483
if (this[property]!=value) {
this.backgroundStyle = value;
var rect = this.findSVGElement('background');
if (rect) {
rect.setAttribute("style",this.backgroundStyle);
}
}
break;
case 'plotAreaStyle':
var attrs = this.parseStyleSVG(this.plotAreaStyle);
if (zenGet(attrs['opacity']) == '') {
attrs['opacity'] = 1.0;
}
this.setSeeThrough(attrs['opacity'])
if (this[property]!=value) {
this.plotAreaStyle = value;
if (this.showMultiples) {
this.render();
}
else {
var rect = this.findSVGElement('plotArea');
if (rect) {
rect.setAttribute("style",this.plotAreaStyle);
}
else {
this.render();
}
}
}
break;
case 'bandUpperStyle':
if (this[property]!=value) {
this.bandUpperStyle = value;
if (this.showMultiples) {
this.render();
}
else {
var rect = this.findSVGElement('bandUpper');
if (rect) {
rect.setAttribute("style",this.bandUpperStyle);
}
}
}
break;
case 'bandLowerStyle':
if (this[property]!=value) {
this.bandLowerStyle = value;
if (this.showMultiples) {
this.render();
}
else {
var rect = this.findSVGElement('bandLower');
if (rect) {
rect.setAttribute("style",this.bandLowerStyle);
}
}
}
break;
case 'marginTop':
case 'marginLeft':
case 'marginBottom':
case 'marginRight':
if (this[property]!==value) {
this[property] = value;
this.render();
}
break;
case 'bandUpper':
case 'bandLower':
case 'markerScale':
value = (value==='') ? '' : parseFloat(value);
if (this[property]!==value) {
this[property] = value;
this.render();
}
break;
case 'lineStyle':
case 'markerStyle':
case 'indicatorStyle':
case 'plotStyle':
case 'plotEdgeStyle':
case 'markerStyle':
case 'markerShapes':
case 'seriesColorScheme':
case 'seriesColors':
case 'seriesColorsOverride':
case 'seriesNames':
case 'seriesNumber':
case 'seriesYAxes':
case 'startTime':
case 'endTime':
case 'titleImage':
case 'titleImageStyle':
if (this[property]!=value) {
this[property] = value;
this.render();
}
break;
case 'seriesCount':
case 'seriesSize':
value = (value=='') ? '' : parseInt(value,10);
if (this[property]!=value) {
this[property] = value;
this.render();
}
break;
case 'title':
case 'titleStyle':
case 'titleAlign':
case 'subtitle':
case 'subtitleStyle':
if (this[property]!=value) {
this[property] = value;
this.render();
}
break;
case 'msgIfNoData': // JSL4478
case 'warnIfNoData': // JSL4478
case 'noDataOpacity': // JSL4478
case 'noDataFill': // JSL4478
case 'noDataStroke': // JSL4478
if (this[property]!=value) {
this[property] = value;
this.render();
}
break;
case 'gridStyle':
case 'borderStyle':
case 'axisTitleStyle':
case 'labelStyle':
case 'legendStyle':
case 'legendLabelStyle':
case 'legendRectStyle':
case 'selectedItemStyle':
case 'unselectedItemStyle':
case 'axisLineStyle':
case 'baseLineStyle':
case 'ongetData':
case 'ongetLabelX':
case 'ongetLabelY':
case 'onrenderData':
case 'onrenderPlotArea':
case 'onshowTooltip':
case 'stripeStyle':
case 'textSize':
case 'scrollButtonStyle':
case 'autoScaleText':
case 'valueLabelStyle':
case 'valueLabelFormat':
case 'valueBoxStyle':
case 'legendTitle':
if (this[property]!=value) {
this[property] = value;
this.render();
}
break;
case 'titleX':
case 'titleY':
if (this[property]!=value) {
this[property] = value;
this.render();
}
break;
case 'borderRadius':
case 'borderOffset':
case 'currYAxis':
case 'maxLabelLen':
value = parseInt(value,10);
if (this[property]!=value) {
this[property] = value;
this.render();
}
break;
case 'legendX':
case 'legendY':
case 'legendWidth':
case 'legendHeight':
if (this[property]!=value) {
this[property] = value;
this.render();
}
break;
case 'legendVisible':
value = (value === true) ? 'true' : value;
value = (false === true) ? 'false' : value;
if (this[property]!=value) {
this[property] = value;
this.unrender();
this.render();
}
break;
case 'appearance':
case 'titleBoxStyle':
if (this[property] != value) {
this[property] = value;
this.unrender();
this.render();
}
break;
case 'stripesVisible':
case 'showMultiples':
case 'labelsVisible':
case 'markersVisible':
case 'indicatorsVisible':
case 'valueLabelsVisible':
case 'plotToEdge':
case 'timeBased':
value = value ? true : false;
if (value != this[property]) {
this[property] = value;
this.unrender();
this.render();
}
break;
case 'hasZoom':
value = value ? true : false;
if (value != this[property]) {
this.hzZoomStep = 0;
this[property] = value;
this.unrender();
this.render();
}
break;
case 'controllerId':
this.setControllerId(value);
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_SVGComponent_chart_setSeeThrough = function(opacity) {
if (this.getFrame() == null) { // JSL4531
return;
}
if (this.getFrame().getEnclosingDiv()) {
var p=this.getFrame().getEnclosingDiv(); // JSL4483
} else {
var p = null;
}
if (p == null) { // JSL4531
return;
}
var c = p.firstChild;
while (c != null) {
if (c.tagName == 'DIV' && c.getAttribute('class')=='svgFrame') {
break;
}
c = c.nextSibling;
}
var frameDiv=c;
if (frameDiv) {
if (opacity < 1.0) {
frameDiv.style.backgroundColor="transparent";
} else {
frameDiv.style.backgroundColor = "white";
}
}
var p=frameDiv.parentNode
while (p != null) {
if (p.tagName=='DIV' && p.getAttribute('class')=='dragGroup') {
break;
}
p=p.parentNode;
}
var dragGroup = p;
if (dragGroup) {
if (opacity < 1.0) {
dragGroup._transparent = 1; // JSL4503 - keep track of whether dragGroup is transparent and if it is don't set to #F0F0F0 color
dragGroup.style.background="transparent";
} else {
if (!dragGroup._transparent) { // JSL4503 add test and _transparent variable
dragGroup.style.backgroundColor="#F0F0F0";
} else {
dragGroup.style.backgroundColor="transparent"; // JSL4503 set to transparet if _transparent set
}
}
if (false) {
var divToolBar = document.getElementById(dragGroup.id+'/header');
if (divToolBar) {
divToolBar.style.backgroundColor = "#F0F0F0";
divToolBar.style.opacity = opacity;
}
}
if (this.document == null) { // JSL4531
return;
}
var zenbackground = this.document.getElementById('zenBackground');
if (zenbackground == null) { // JSL4531
return;
}
if (opacity < 1.0) {
zenbackground.setAttribute('fill-opacity',0);
} else {
zenbackground.setAttribute('fill-opacity',1.0);
}
}
}

self._ZEN_SVGComponent_chart_setSizeHandler = function() {
this.render();
}

self._ZEN_SVGComponent_chart_setTimeRange = function(startTime,endTime,final) {
final = 'undefined' == typeof final ? true : final;
if (!endTime) {
startTime = startTime ? (parseInt(startTime)==startTime?startTime+'-01-01':startTime) : startTime;
var endTime = this.endTime;
endTime = endTime ? (parseInt(endTime)==endTime?endTime+'-12-31':endTime) : endTime;
var startDate = zenStringToDate(startTime);
var endDate = zenStringToDate(endTime);
startDate = startDate ? startDate : new Date(2000,0,1,0,0,0,0);
endDate = endDate ? endDate : new Date(startDate.getFullYear(),11,31,0,0,0,0);
var delta = endDate-startDate;
startDate.setTime(startDate.getTime()+delta);
endTime = zenDateToString(startDate);
}
this.startTime = startTime;
this.endTime = endTime;
if (this.showMultiples) {
if (final) {
this.render();
}
}
else {
this.renderPlotArea();
this.renderSeriesGroup();
}
}

self._ZEN_SVGComponent_chart_setXAxis = function(axis) {
var old = this.xAxis;
this.xAxis = axis;
if (null!=axis) {
axis.parent = this;
}
if (null!=old) {
old.parent = null;
}
return old;
}

self._ZEN_SVGComponent_chart_setYAxis = function(axis) {
var old = this.yAxisList[this.currYAxis];
this.yAxisList[this.currYAxis] = axis;
if (null!=axis) {
axis.parent = this;
}
if (null!=old) {
old.parent = null;
}
return old;
}

self._ZEN_SVGComponent_chart_showNoDataMsg = function(msg,plotAreaGroup,clipGroup) {
var debug= true;
if (!plotAreaGroup) {
var plotAreaGroup = this.findSVGElement('plotAreaGroup'+this.currMultiple);
}
var clipGroup = this.findSVGElement('clipGroup'+this.currMultiple);
if (!clipGroup) {
var clipGroup = this.document.createElementNS(SVGNS,"svg");
}
var text = this.findSVGElement('textIfNoData'+this.currMultiple);
if (plotAreaGroup&&clipGroup) {
if (!text) {
text = this.document.createElementNS(SVGNS,'text');
text.setAttribute("id",this.makeId('textIfNoData'+this.currMultiple));
var textNode = this.document.createTextNode(this.msgIfNoData);
text.appendChild(textNode);
if (debug) {
var debugrect=this.document.createElementNS(SVGNS,'rect')
debugrect.setAttribute("id",this.makeId('rectIfNoData'+this.currMultiple));
plotAreaGroup.appendChild(debugrect);
}
} else {
var debugrect = this.findSVGElement('rectIfNoData'+this.currMultiple);
var textNode = text.childNodes[0];
textNode.textContent = msg;
}
plotAreaGroup.appendChild(text);
text.setAttribute("stroke",this.noDataStroke);
text.setAttribute("fill","none");
var bbox = zenGetBBox(text);
var xtext = parseFloat(clipGroup.getAttribute("x"));
var ytext = parseFloat(clipGroup.getAttribute("y"));
var width = parseFloat(clipGroup.getAttribute("width"))
var height = parseFloat(clipGroup.getAttribute("height"));
text.setAttribute("x",xtext+(width/2)-(bbox.width/2));
text.setAttribute("y",ytext+(height/2));
if (debug) {
debugrect.setAttribute("fill",this.noDataFill);
debugrect.setAttribute("x",xtext+width/2-(bbox.width/2)-2);
debugrect.setAttribute("y",ytext+(height/2) - bbox.height+2);
debugrect.setAttribute("width",bbox.width+2);
debugrect.setAttribute("height",bbox.height+2);
debugrect.setAttribute("opacity", this.noDataOpacity);
}
}
}

self._ZEN_SVGComponent_chart_showToolTip = function() {
if (this._tooltip) return;
if (null == this._mouseOverSeries || null == this._mouseOverItem) return;
var captions = [];
var values = [];
this.getToolTipInfo(this._mouseOverSeries, this._mouseOverItem,captions,values);
if (this.onshowTooltip!='') {
this._tooltipCaptions = captions;
this._tooltipValues = values;
zenInvokeCallbackMethod(this.onshowTooltip,this,'onshowTooltip','chart',this);
this._tooltipCaptions = null;
this._tooltipValues = null;
}
if (captions.length == 0 || values.length == 0) return;
this.setDimToolTip(captions, values, this._clientX, this._clientY, false);
try {
} catch(ex) {
}
this._timerId = window.setTimeout("zenPage.getComponent(" + this.index + ").revealToolTip()",20);
}

self._ZEN_SVGComponent_chart_stripWhitespace = function(str) {
if (!str) return("");
var w=str.split(' ');
var start=0;
while (start<w.length && !w[start]) start++;
var end=w.length-1;
while (end>start && !w[end]) end--;
return(w.slice(start,end+1).join(''));
}

self._ZEN_SVGComponent_chart_updateChart = function() {
this.selectedSeries = -1;  // Set back to initial value JSL4331
this.render();
}

self._ZEN_SVGComponent_chart_updateIndicator = function() {
if (!this.indicatorsVisible) return;
var series = parseInt(this.selectedSeries,10);
var item = parseInt(this.selectedItem,10);
var seriesGroup = this.findSVGElement('seriesGroup'+this.currMultiple);
if (!seriesGroup) return;
var vtIndicator = this.findSVGElement('vtIndicator'+this.currMultiple);
if (null == vtIndicator) {
vtIndicator = this.document.createElementNS(SVGNS,"line");
vtIndicator.setAttribute("class","chart-indicator");
vtIndicator.setAttribute("style",this.indicatorStyle);
vtIndicator.setAttribute("id",this.makeId('vtIndicator'+this.currMultiple));
seriesGroup.appendChild(vtIndicator);
}
var hzIndicator = this.findSVGElement('hzIndicator'+this.currMultiple);
if (null == hzIndicator) {
hzIndicator = this.document.createElementNS(SVGNS,"line");
hzIndicator.setAttribute("class","chart-indicator");
hzIndicator.setAttribute("style",this.indicatorStyle);
hzIndicator.setAttribute("id",this.makeId('hzIndicator'+this.currMultiple));
seriesGroup.appendChild(hzIndicator);
}
var vtShow = false;
var hzShow = false;
vtIndicator.setAttribute("y1",0);
vtIndicator.setAttribute("y2",this._plotBottom*this._scaleY);
hzIndicator.setAttribute("x1",0);
hzIndicator.setAttribute("x2",100*this._scaleX);
var xAxisType = this.getXAxisType();
var yAxisType = this.getYAxisType();
var x, y;
if (this.hasAxes() && this._dataSeries && !this.chartStacked) {
if (series >= 0) {
var items = this.getSeriesSize();
var val = this._dataSeries[series][item];
var dval = null;
if ('object'==typeof val) {
dval = val;
val = val.value;
}
if (val !== null) {
if (this.isTimeBased()) {
vtShow = true;
hzShow = true;
var time = dval&&dval.time ? dval.time : this.getXLabelText(item,1,true);
x = this.getTimeX(time);
x = x===null ? 0 : x;
y = this.getPlotY(val) - this._plotTop;
}
else if (this.plotToEdge) {
vtShow = true;
hzShow = true;
if (xAxisType == 'value') {
if (yAxisType == 'value') {
val = this._dataSeries[0][item];
if ('object'==typeof val) {
val = val.value;
}
}
x = this.getPlotX(val) - this._plotLeft;
}
else {
var dx = (items<=1) ? (this._plotWidth/2) : (this._plotWidth / (items-1));
var adj = (items<=1) ? 0 : dx;
x = (item-1) * dx + adj;
}
if (yAxisType == 'value') {
if (xAxisType == 'value') {
if (this._dataSeries[series+1]) {
var val2 = this._dataSeries[series+1][item];
if ('object'==typeof val2) {
val2 = val2.value;
}
y = this.getPlotY(val2) - this._plotTop;
}
else {
vtShow = false;
}
}
else {
y = this.getPlotY(val) - this._plotTop;
}
}
else {
var dy = (items<=1) ? (this._plotHeight/2) : (this._plotHeight / items);
var adj = (items<=1) ? 0 : dy/2;
y = (item) * dy + adj;
}
}
else {
if (this.chartPivot) {
vtShow = true;
var dy = (items<=1) ? (this._plotHeight/2) : (this._plotHeight / items);
var adj = (items<=1) ? 0 : dy/2;
y = (item) * dy + adj;
x = this.getPlotX(val) - this._plotLeft;
}
else {
hzShow = true;
var dx = (items<=1) ? (this._plotWidth/2) : (this._plotWidth / items);
var adj = (items<=1) ? 0 : dx/2;
x = (item) * dx + adj;
y = this.getPlotY(val) - this._plotTop;
}
}
vtIndicator.setAttribute('x1',x * this._scaleX);
vtIndicator.setAttribute('x2',x * this._scaleX);
hzIndicator.setAttribute('y1',y * this._scaleY);
hzIndicator.setAttribute('y2',y * this._scaleY);
}
}
}
if (this.showMultiples) {
hzShow = false;
}
vtIndicator.setAttribute('visibility',vtShow ? 'visible' : 'hidden');
hzIndicator.setAttribute('visibility',hzShow ? 'visible' : 'hidden');
}

self._ZEN_SVGComponent_chart_usePercentForRange = function() {
return false;
}

self._ZEN_SVGComponent_chart_useSumForRange = function() {
return false;
}

self._ZEN_SVGComponent_chart_xToLogical = function(val) {
return (''==val)?val:('string'==typeof val && val.indexOf('px')>0) ? parseFloat(val)/this._scaleX : parseFloat(val);
}

self._ZEN_SVGComponent_chart_yToLogical = function(val) {
return (''==val)?val:('string'==typeof val && val.indexOf('px')>0) ? parseFloat(val)/this._scaleY : parseFloat(val);
}

self._ZEN_SVGComponent_chart_zoomToolHandler = function(evt,zoomIn) {
var currStep = parseInt(this.hzZoomStep);
if (zoomIn) {
if (currStep < this._hzMaxStep) {
this.hzZoomStep = currStep + 1;
this.updateChart();
}
}
else {
if (currStep > 0) {
this.hzZoomStep = currStep - 1;
this.updateChart();
}
}
}
self._ZEN_SVGComponent_chart__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_svgComponent');
	_ZEN_SVGComponent_chart.prototype = zenCreate('_ZEN_SVGComponent_svgComponent',-1);
	var p = _ZEN_SVGComponent_chart.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_chart;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_svgComponent) ? zenMaster._ZEN_SVGComponent_svgComponent.prototype:_ZEN_SVGComponent_svgComponent.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.chart';
	p._type = 'chart';
	p.serialize = _ZEN_SVGComponent_chart_serialize;
	p.getSettings = _ZEN_SVGComponent_chart_getSettings;
	p.acquireData = _ZEN_SVGComponent_chart_acquireData;
	p.acquireSeriesData = _ZEN_SVGComponent_chart_acquireSeriesData;
	p.adjustChartTitle = _ZEN_SVGComponent_chart_adjustChartTitle;
	p.btnTimerHandler = _ZEN_SVGComponent_chart_btnTimerHandler;
	p.calculateAxisConstraints = _ZEN_SVGComponent_chart_calculateAxisConstraints;
	p.calculateRangeValues = _ZEN_SVGComponent_chart_calculateRangeValues;
	p.calculateXAxisHeight = _ZEN_SVGComponent_chart_calculateXAxisHeight;
	p.calculateXAxisTitleHeight = _ZEN_SVGComponent_chart_calculateXAxisTitleHeight;
	p.calculateYAxisWidth = _ZEN_SVGComponent_chart_calculateYAxisWidth;
	p.chartElementClickHandler = _ZEN_SVGComponent_chart_chartElementClickHandler;
	p.chartElementMouseOut = _ZEN_SVGComponent_chart_chartElementMouseOut;
	p.chartElementMouseOver = _ZEN_SVGComponent_chart_chartElementMouseOver;
	p.computeEffectiveExtents = _ZEN_SVGComponent_chart_computeEffectiveExtents;
	p.computeStyle = _ZEN_SVGComponent_chart_computeStyle;
	p.computeXAxisTimeLine = _ZEN_SVGComponent_chart_computeXAxisTimeLine;
	p.connectToController = _ZEN_SVGComponent_chart_connectToController;
	p.createMarker = _ZEN_SVGComponent_chart_createMarker;
	p.createSVGTextNode = _ZEN_SVGComponent_chart_createSVGTextNode;
	p.createXLabelNode = _ZEN_SVGComponent_chart_createXLabelNode;
	p.disconnectFromController = _ZEN_SVGComponent_chart_disconnectFromController;
	p.embedStyle = _ZEN_SVGComponent_chart_embedStyle;
	p.findDataRange = _ZEN_SVGComponent_chart_findDataRange;
	p.findScaleUnits = _ZEN_SVGComponent_chart_findScaleUnits;
	p.formatNumeric = _ZEN_SVGComponent_chart_formatNumeric;
	p.getCellInfo = _ZEN_SVGComponent_chart_getCellInfo;
	p.getChartElement = _ZEN_SVGComponent_chart_getChartElement;
	p.getChartElementStyle = _ZEN_SVGComponent_chart_getChartElementStyle;
	p.getChartRelatedElements = _ZEN_SVGComponent_chart_getChartRelatedElements;
	p.getChartSubtitle = _ZEN_SVGComponent_chart_getChartSubtitle;
	p.getChartTitle = _ZEN_SVGComponent_chart_getChartTitle;
	p.getColorSchemeArray = _ZEN_SVGComponent_chart_getColorSchemeArray;
	p.getComputedFontSize = _ZEN_SVGComponent_chart_getComputedFontSize;
	p.getController = _ZEN_SVGComponent_chart_getController;
	p.getCurrYAxis = _ZEN_SVGComponent_chart_getCurrYAxis;
	p.getEndTime = _ZEN_SVGComponent_chart_getEndTime;
	p.getLegendLabels = _ZEN_SVGComponent_chart_getLegendLabels;
	p.getLegendRectStyle = _ZEN_SVGComponent_chart_getLegendRectStyle;
	p.getLegendsCount = _ZEN_SVGComponent_chart_getLegendsCount;
	p.getMarkerShape = _ZEN_SVGComponent_chart_getMarkerShape;
	p.getNumericAbbreviation = _ZEN_SVGComponent_chart_getNumericAbbreviation;
	p.getPelToPixelHRatio = _ZEN_SVGComponent_chart_getPelToPixelHRatio;
	p.getPelToPixelVRatio = _ZEN_SVGComponent_chart_getPelToPixelVRatio;
	p.getPlotX = _ZEN_SVGComponent_chart_getPlotX;
	p.getPlotY = _ZEN_SVGComponent_chart_getPlotY;
	p.getRangeGroupForSeries = _ZEN_SVGComponent_chart_getRangeGroupForSeries;
	p.getRelatedElementStyle = _ZEN_SVGComponent_chart_getRelatedElementStyle;
	p.getSelectedItem = _ZEN_SVGComponent_chart_getSelectedItem;
	p.getSelectedSeries = _ZEN_SVGComponent_chart_getSelectedSeries;
	p.getSelectedStyle = _ZEN_SVGComponent_chart_getSelectedStyle;
	p.getSeriesColor = _ZEN_SVGComponent_chart_getSeriesColor;
	p.getSeriesCount = _ZEN_SVGComponent_chart_getSeriesCount;
	p.getSeriesData = _ZEN_SVGComponent_chart_getSeriesData;
	p.getSeriesNames = _ZEN_SVGComponent_chart_getSeriesNames;
	p.getSeriesNamesSize = _ZEN_SVGComponent_chart_getSeriesNamesSize;
	p.getSeriesSVGGroup = _ZEN_SVGComponent_chart_getSeriesSVGGroup;
	p.getSeriesSize = _ZEN_SVGComponent_chart_getSeriesSize;
	p.getSeriesType = _ZEN_SVGComponent_chart_getSeriesType;
	p.getStartTime = _ZEN_SVGComponent_chart_getStartTime;
	p.getTimeX = _ZEN_SVGComponent_chart_getTimeX;
	p.getToolTipInfo = _ZEN_SVGComponent_chart_getToolTipInfo;
	p.getXAxis = _ZEN_SVGComponent_chart_getXAxis;
	p.getXAxisTitle = _ZEN_SVGComponent_chart_getXAxisTitle;
	p.getXAxisType = _ZEN_SVGComponent_chart_getXAxisType;
	p.getXLabelText = _ZEN_SVGComponent_chart_getXLabelText;
	p.getYAxis = _ZEN_SVGComponent_chart_getYAxis;
	p.getYAxisCount = _ZEN_SVGComponent_chart_getYAxisCount;
	p.getYAxisIndexForSeries = _ZEN_SVGComponent_chart_getYAxisIndexForSeries;
	p.getYAxisTitle = _ZEN_SVGComponent_chart_getYAxisTitle;
	p.getYAxisType = _ZEN_SVGComponent_chart_getYAxisType;
	p.getYLabelText = _ZEN_SVGComponent_chart_getYLabelText;
	p.hasAxes = _ZEN_SVGComponent_chart_hasAxes;
	p.hasMultiples = _ZEN_SVGComponent_chart_hasMultiples;
	p.hasSelectedItem = _ZEN_SVGComponent_chart_hasSelectedItem;
	p.hideToolTip = _ZEN_SVGComponent_chart_hideToolTip;
	p.initializeAxisProperties = _ZEN_SVGComponent_chart_initializeAxisProperties;
	p.integrateStyleSpec = _ZEN_SVGComponent_chart_integrateStyleSpec;
	p.is3D = _ZEN_SVGComponent_chart_is3D;
	p.isTimeBased = _ZEN_SVGComponent_chart_isTimeBased;
	p.notifyView = _ZEN_SVGComponent_chart_notifyView;
	p.notifyViewHandler = _ZEN_SVGComponent_chart_notifyViewHandler;
	p.objectToXML = _ZEN_SVGComponent_chart_objectToXML;
	p.parseStyleSVG = _ZEN_SVGComponent_chart_parseStyleSVG;
	p.pickVerticalSkips = _ZEN_SVGComponent_chart_pickVerticalSkips;
	p.plotLineForSeries = _ZEN_SVGComponent_chart_plotLineForSeries;
	p.prepareAxisGroup = _ZEN_SVGComponent_chart_prepareAxisGroup;
	p.removeChildNodes = _ZEN_SVGComponent_chart_removeChildNodes;
	p.removeNoDataMsg = _ZEN_SVGComponent_chart_removeNoDataMsg;
	p.renderAxes = _ZEN_SVGComponent_chart_renderAxes;
	p.renderBands = _ZEN_SVGComponent_chart_renderBands;
	p.renderContents = _ZEN_SVGComponent_chart_renderContents;
	p.renderControlBar = _ZEN_SVGComponent_chart_renderControlBar;
	p.renderLegend = _ZEN_SVGComponent_chart_renderLegend;
	p.renderPlotArea = _ZEN_SVGComponent_chart_renderPlotArea;
	p.renderSeries = _ZEN_SVGComponent_chart_renderSeries;
	p.renderSeriesGroup = _ZEN_SVGComponent_chart_renderSeriesGroup;
	p.renderTimeEvents = _ZEN_SVGComponent_chart_renderTimeEvents;
	p.renderTitle = _ZEN_SVGComponent_chart_renderTitle;
	p.renderXAxisTimeLine = _ZEN_SVGComponent_chart_renderXAxisTimeLine;
	p.renderXAxisTitle = _ZEN_SVGComponent_chart_renderXAxisTitle;
	p.renderXLabels = _ZEN_SVGComponent_chart_renderXLabels;
	p.renderYAxisTitle = _ZEN_SVGComponent_chart_renderYAxisTitle;
	p.renderYLabels = _ZEN_SVGComponent_chart_renderYLabels;
	p.renderZoomTool = _ZEN_SVGComponent_chart_renderZoomTool;
	p.revealToolTip = _ZEN_SVGComponent_chart_revealToolTip;
	p.scrollHandler = _ZEN_SVGComponent_chart_scrollHandler;
	p.scrollHandlerDown = _ZEN_SVGComponent_chart_scrollHandlerDown;
	p.scrollHandlerUp = _ZEN_SVGComponent_chart_scrollHandlerUp;
	p.selectElement = _ZEN_SVGComponent_chart_selectElement;
	p.sendEventToController = _ZEN_SVGComponent_chart_sendEventToController;
	p.setControllerId = _ZEN_SVGComponent_chart_setControllerId;
	p.setCurrYAxis = _ZEN_SVGComponent_chart_setCurrYAxis;
	p.setDimToolTip = _ZEN_SVGComponent_chart_setDimToolTip;
	p.setProperty = _ZEN_SVGComponent_chart_setProperty;
	p.setSeeThrough = _ZEN_SVGComponent_chart_setSeeThrough;
	p.setSizeHandler = _ZEN_SVGComponent_chart_setSizeHandler;
	p.setTimeRange = _ZEN_SVGComponent_chart_setTimeRange;
	p.setXAxis = _ZEN_SVGComponent_chart_setXAxis;
	p.setYAxis = _ZEN_SVGComponent_chart_setYAxis;
	p.showNoDataMsg = _ZEN_SVGComponent_chart_showNoDataMsg;
	p.showToolTip = _ZEN_SVGComponent_chart_showToolTip;
	p.stripWhitespace = _ZEN_SVGComponent_chart_stripWhitespace;
	p.updateChart = _ZEN_SVGComponent_chart_updateChart;
	p.updateIndicator = _ZEN_SVGComponent_chart_updateIndicator;
	p.usePercentForRange = _ZEN_SVGComponent_chart_usePercentForRange;
	p.useSumForRange = _ZEN_SVGComponent_chart_useSumForRange;
	p.xToLogical = _ZEN_SVGComponent_chart_xToLogical;
	p.yToLogical = _ZEN_SVGComponent_chart_yToLogical;
	p.zoomToolHandler = _ZEN_SVGComponent_chart_zoomToolHandler;
}

self._zenClassIdx['compassButtons'] = '_ZEN_SVGComponent_compassButtons';
self._ZEN_SVGComponent_compassButtons = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_compassButtons__init(this,index,id);}
}

self._ZEN_SVGComponent_compassButtons__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_svgComponent__init) ?zenMaster._ZEN_SVGComponent_svgComponent__init(o,index,id):_ZEN_SVGComponent_svgComponent__init(o,index,id);
	o.boundless = true;
	o.onbuttonClick = '';
}
function _ZEN_SVGComponent_compassButtons_serialize(set,s)
{
	var o = this;s[0]='3426383122';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.aux;s[7]=(o.boundless?1:0);s[8]=o.height;s[9]=(o.hidden?1:0);s[10]=o.onbuttonClick;s[11]=o.onclick;s[12]=o.onupdate;s[13]=o.position;s[14]=o.preserveAspectRatio;s[15]=o.renderFlag;s[16]=o.tuple;s[17]=o.viewBoxHeight;s[18]=o.viewBoxWidth;s[19]=(o.visible?1:0);s[20]=o.width;s[21]=o.x;s[22]=o.y;
}
function _ZEN_SVGComponent_compassButtons_getSettings(s)
{
	s['name'] = 'string';
	s['onbuttonClick'] = 'eventHandler';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_compassButtons_clickHandler = function(evt,direction) {
evt.stopPropagation();
return zenInvokeCallbackMethod(this.onbuttonClick,this,'onbuttonClick','direction',direction);
}

self._ZEN_SVGComponent_compassButtons_mouseoutHandler = function(evt,direction) {
evt.stopPropagation();
evt.target.setAttribute('class','compassButton');
}

self._ZEN_SVGComponent_compassButtons_mouseoverHandler = function(evt,direction) {
evt.stopPropagation();
evt.target.setAttribute('class','compassButtonHover');
}

self._ZEN_SVGComponent_compassButtons_renderButton = function(direction,x,y) {
var wid = 16;
var hgt = 16;
var rect = this.document.createElementNS(SVGNS,'rect');
rect.setAttribute('id',this.makeId(direction));
rect.setAttribute('class','compassButton');
rect.setAttribute('x',x - wid/2);
rect.setAttribute('y',y - hgt/2);
rect.setAttribute('width',wid);
rect.setAttribute('height',hgt);
rect.setAttribute('rx',1);
this.svgGroup.appendChild(rect);
var icon = null;
switch(direction) {
case 'left':
icon = this.document.createElementNS(SVGNS,'path');
icon.setAttribute('d','M '+(x+4)+' '+y+' L '+(x-4)+' '+y+'M '+x+' '+(y-4)+' L '+(x-4)+' '+y+' '+x+' '+(y+4));
break;
case 'right':
icon = this.document.createElementNS(SVGNS,'path');
icon.setAttribute('d','M '+(x-4)+' '+y+' L '+(x+4)+' '+y+'M '+x+' '+(y-4)+' L '+(x+4)+' '+y+' '+x+' '+(y+4));
break;
case 'up':
icon = this.document.createElementNS(SVGNS,'path');
icon.setAttribute('d','M '+(x)+' '+(y+4)+' L '+(x)+' '+(y-4)+'M '+(x-4)+' '+(y)+' L '+(x)+' '+(y-4)+' '+(x+4)+' '+(y));
break;
case 'down':
icon = this.document.createElementNS(SVGNS,'path');
icon.setAttribute('d','M '+(x)+' '+(y-4)+' L '+(x)+' '+(y+4)+'M '+(x-4)+' '+(y)+' L '+(x)+' '+(y+4)+' '+(x+4)+' '+(y));
break;
case 'home':
icon = this.document.createElementNS(SVGNS,'circle');
icon.setAttribute('cx',x);
icon.setAttribute('cy',y);
icon.setAttribute('r',wid/4);
break;
}
if (icon) {
icon.setAttribute('class','compassIcon');
this.svgGroup.appendChild(icon);
icon.addEventListener('click',new Function('evt','direction','return zenPage.getComponent('+this.index+').clickHandler(evt,"'+direction+'");'),false);
}
rect.addEventListener('click',new Function('evt','direction','return zenPage.getComponent('+this.index+').clickHandler(evt,"'+direction+'");'),false);
rect.addEventListener('mouseover',new Function('evt','direction','return zenPage.getComponent('+this.index+').mouseoverHandler(evt,"'+direction+'");'),false);
rect.addEventListener('mouseout',new Function('evt','direction','return zenPage.getComponent('+this.index+').mouseoutHandler(evt,"'+direction+'");'),false);
return rect;
}

self._ZEN_SVGComponent_compassButtons_renderContents = function() {
this.renderButton('home',0,0);
this.renderButton('up',0,-20);
this.renderButton('down',0,20);
this.renderButton('left',-20,0);
this.renderButton('right',20,0);
}

self._ZEN_SVGComponent_compassButtons_setProperty = function(property,value,value2) {
switch(property) {
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}
self._ZEN_SVGComponent_compassButtons__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_svgComponent');
	_ZEN_SVGComponent_compassButtons.prototype = zenCreate('_ZEN_SVGComponent_svgComponent',-1);
	var p = _ZEN_SVGComponent_compassButtons.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_compassButtons;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_svgComponent) ? zenMaster._ZEN_SVGComponent_svgComponent.prototype:_ZEN_SVGComponent_svgComponent.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.compassButtons';
	p._type = 'compassButtons';
	p.serialize = _ZEN_SVGComponent_compassButtons_serialize;
	p.getSettings = _ZEN_SVGComponent_compassButtons_getSettings;
	p.clickHandler = _ZEN_SVGComponent_compassButtons_clickHandler;
	p.mouseoutHandler = _ZEN_SVGComponent_compassButtons_mouseoutHandler;
	p.mouseoverHandler = _ZEN_SVGComponent_compassButtons_mouseoverHandler;
	p.renderButton = _ZEN_SVGComponent_compassButtons_renderButton;
	p.renderContents = _ZEN_SVGComponent_compassButtons_renderContents;
	p.setProperty = _ZEN_SVGComponent_compassButtons_setProperty;
}

self._zenClassIdx['connector'] = '_ZEN_SVGComponent_connector';
self._ZEN_SVGComponent_connector = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_connector__init(this,index,id);}
}

self._ZEN_SVGComponent_connector__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_svgObject__init) ?zenMaster._ZEN_SVGComponent_svgObject__init(o,index,id):_ZEN_SVGComponent_svgObject__init(o,index,id);
	o.inputs = new Array();
	o.outputs = new Array();
	o.style = '';
}
function _ZEN_SVGComponent_connector_serialize(set,s)
{
	var o = this;s[0]='934959352';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.aux;s[7]=set.serializeList(o,o.inputs,true,'inputs');s[8]=o.onupdate;s[9]=set.serializeList(o,o.outputs,true,'outputs');s[10]=o.renderFlag;s[11]=o.style;s[12]=o.tuple;s[13]=(o.visible?1:0);
}
function _ZEN_SVGComponent_connector_getSettings(s)
{
	s['name'] = 'string';
	s['inputs'] = 'string';
	s['outputs'] = 'string';
	s['style'] = 'style';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_connector_addInput = function(sprite,portno) {
if (this.inputs.length < this.getMaxInputs()) {
var port = sprite.getPort(portno);
if (port) {
if (port.addConnector(this)) {
this.inputs[this.inputs.length] = port;
this.updateConnector();
}
}
}
}

self._ZEN_SVGComponent_connector_addOutput = function(sprite,portno) {
if (this.outputs.length < this.getMaxOutputs()) {
var port = sprite.getPort(portno);
if (port) {
if (port.addConnector(this)) {
this.outputs[this.outputs.length] = port;
this.updateConnector();
}
}
}
}

self._ZEN_SVGComponent_connector_getMaxInputs = function() {
return 5;
}

self._ZEN_SVGComponent_connector_getMaxOutputs = function() {
return 5;
}

self._ZEN_SVGComponent_connector_renderConnector = function(canvas) {
if (null == this._svgPath) {
this._svgPath = canvas.document.createElementNS(SVGNS,'path');
this._svgPath.setAttribute('class','connector');
this._svgPath.setAttribute('style',this.style);
var underGroup = canvas.document.getElementById('zenUnderlay');
zenASSERT(underGroup,'Unable to find svg underlay group for the page.',arguments);
underGroup.appendChild(this._svgPath);
}
this.updateConnector();
}

self._ZEN_SVGComponent_connector_setProperty = function(property,value,value2) {
switch(property) {
case 'style':
this.style = value;
if (this._svgPath) {
this._svgPath.setAttribute('style',this.style);
}
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_SVGComponent_connector_updateConnector = function() {
if (null != this._svgPath) {
var d = '';
if (this.outputs.length > 0 && this.inputs.length > 0) {
var tsx = 0,tsy = 0;
var sx = new Array(this.outputs.length);
var sy = new Array(this.outputs.length);
for (var n = 0; n < this.outputs.length; n++) {
var port = this.outputs[n];
var sprite = port._sprite;
var size = sprite.getSizeAbsolute();
sx[n] = parseFloat(size.x + port.x);
sy[n] = parseFloat(size.y + port.y);
tsx += sx[n];
tsy += sy[n];
}
tsx = tsx / this.outputs.length;
tsy = tsy / this.outputs.length;
var tex = 0,tey = 0;
var ex = new Array(this.inputs.length);
var ey = new Array(this.inputs.length);
for (var n = 0; n < this.inputs.length; n++) {
var port = this.inputs[n];
var sprite = port._sprite;
var size = sprite.getSizeAbsolute();
ex[n] = parseFloat(size.x + port.x);
ey[n] = parseFloat(size.y + port.y);
tex += ex[n];
tey += ey[n];
}
tex = tex / this.inputs.length;
tey = tey / this.inputs.length;
var m1x = tsx;
var m1y = (tey>tsy) ? tsy + (tey-tsy)/2 : tey + (tsy-tey)/2;
var m2x = tex;
var m2y = m1y;
for (var n = 0; n < this.outputs.length; n++) {
d += 'M ' + sx[n] + ' ' + sy[n] + ' L ' + m1x + ' ' + m1y + ' ';
}
for (var n = 0; n < this.inputs.length; n++) {
d += 'M ' + ex[n] + ' ' + ey[n] + ' L ' + m2x + ' ' + m2y + ' ';
}
d += 'M ' + m1x + ' ' + m1y + ' L ' + m2x + ' ' + m2y + ' ';
}
if (d) {
this._svgPath.setAttribute('d',d);
}
}
}
self._ZEN_SVGComponent_connector__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_svgObject');
	_ZEN_SVGComponent_connector.prototype = zenCreate('_ZEN_SVGComponent_svgObject',-1);
	var p = _ZEN_SVGComponent_connector.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_connector;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_svgObject) ? zenMaster._ZEN_SVGComponent_svgObject.prototype:_ZEN_SVGComponent_svgObject.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.connector';
	p._type = 'connector';
	p.serialize = _ZEN_SVGComponent_connector_serialize;
	p.getSettings = _ZEN_SVGComponent_connector_getSettings;
	p.addInput = _ZEN_SVGComponent_connector_addInput;
	p.addOutput = _ZEN_SVGComponent_connector_addOutput;
	p.getMaxInputs = _ZEN_SVGComponent_connector_getMaxInputs;
	p.getMaxOutputs = _ZEN_SVGComponent_connector_getMaxOutputs;
	p.renderConnector = _ZEN_SVGComponent_connector_renderConnector;
	p.setProperty = _ZEN_SVGComponent_connector_setProperty;
	p.updateConnector = _ZEN_SVGComponent_connector_updateConnector;
}

self._zenClassIdx['meter'] = '_ZEN_SVGComponent_meter';
self._ZEN_SVGComponent_meter = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_meter__init(this,index,id);}
}

self._ZEN_SVGComponent_meter__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_svgComponent__init) ?zenMaster._ZEN_SVGComponent_svgComponent__init(o,index,id):_ZEN_SVGComponent_svgComponent__init(o,index,id);
	o.animate = true;
	o.controller = '';
	o.controllerId = '';
	o.dataBinding = '';
	o.disabled = false;
	o.label = '';
	o.labelStyle = '';
	o.onchange = '';
	o.ongetcontroller = '';
	o.onnotifyView = '';
	o.rangeLower = '';
	o.rangeUpper = '';
	o.scaleFactor = '1';
	o.showConditionally = false;
	o.targetValue = '';
	o.thresholdLower = '';
	o.thresholdUpper = '';
	o.value = '0';
	o.viewBoxHeight = '100';
	o.viewBoxWidth = '100';
}
function _ZEN_SVGComponent_meter_serialize(set,s)
{
	var o = this;s[0]='2082453004';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=(o.animate?1:0);s[7]=o.aux;s[8]=(o.boundless?1:0);s[9]=o.controller;s[10]=o.controllerId;s[11]=o.dataBinding;s[12]=(o.disabled?1:0);s[13]=o.height;s[14]=(o.hidden?1:0);s[15]=o.label;s[16]=o.labelStyle;s[17]=o.onchange;s[18]=o.onclick;s[19]=o.ongetcontroller;s[20]=o.onnotifyView;s[21]=o.onupdate;s[22]=o.position;s[23]=o.preserveAspectRatio;s[24]=o.rangeLower;s[25]=o.rangeUpper;s[26]=o.renderFlag;s[27]=o.scaleFactor;s[28]=(o.showConditionally?1:0);s[29]=o.targetValue;s[30]=o.thresholdLower;s[31]=o.thresholdUpper;s[32]=o.tuple;s[33]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[34]=o.viewBoxHeight;s[35]=o.viewBoxWidth;s[36]=(o.visible?1:0);s[37]=o.width;s[38]=o.x;s[39]=o.y;
}
function _ZEN_SVGComponent_meter_getSettings(s)
{
	s['name'] = 'string';
	s['animate'] = 'boolean';
	s['controllerId'] = 'id';
	s['dataBinding'] = 'string';
	s['disabled'] = 'boolean';
	s['label'] = 'caption';
	s['labelStyle'] = 'svgStyle';
	s['onchange'] = 'eventHandler';
	s['ongetcontroller'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	s['rangeLower'] = 'string';
	s['rangeUpper'] = 'string';
	s['scaleFactor'] = 'float';
	s['showConditionally'] = 'boolean';
	s['targetValue'] = 'string';
	s['thresholdLower'] = 'string';
	s['thresholdUpper'] = 'string';
	s['value'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_meter_acquireData = function() {
var controller = this.getController();
if (null == controller) {
this.connectToController();
controller = this.getController();
}
if (controller) {
this._rangeUpper = '';
this._rangeLower = '';
this._thresholdUpper = '';
this._thresholdLower = '';
this._targetValue = '';
var data = controller.getDataByName(this.dataBinding);
if (null==data) {
if (this.showConditionally && !this.hidden) {
this.setProperty('hidden',true);
}
if (!this.disabled) {
this.setProperty('disabled',true);
}
this.value = '';
}
else {
if (this.showConditionally && this.hidden) {
this.setProperty('hidden',false);
}
if (this.disabled) {
this.setProperty('disabled',false);
}
this.value = data;
var d = controller.getDataByName('%rangeUpper');
if (d&&''==this.rangeUpper) {
this._rangeUpper = d;
}
else if (''!=this.rangeUpper && isNaN(parseFloat(this.rangeUpper))) {
this._rangeUpper = controller.getDataByName(this.rangeUpper);
}
else {
this._rangeUpper = parseFloat(this.rangeUpper);
this._rangeUpper = isNaN(this._rangeUpper) ? '' : this._rangeUpper;
}
var d = controller.getDataByName('%rangeLower');
if (d&&''==this.rangeLower) {
this._rangeLower = d;
}
else if (''!=this.rangeLower && isNaN(parseFloat(this.rangeLower))) {
this._rangeLower = controller.getDataByName(this.rangeLower);
}
else {
this._rangeLower = parseFloat(this.rangeLower);
this._rangeLower = isNaN(this._rangeLower) ? '' : this._rangeLower;
}
var d = controller.getDataByName('%thresholdUpper');
if (d&&''==this.thresholdUpper) {
this._thresholdUpper = d;
}
else if (''!=this.thresholdUpper && isNaN(parseFloat(this.thresholdUpper))) {
this._thresholdUpper = controller.getDataByName(this.thresholdUpper);
}
else {
this._thresholdUpper = parseFloat(this.thresholdUpper);
this._thresholdUpper = isNaN(this._thresholdUpper) ? '' : this._thresholdUpper;
}
var d = controller.getDataByName('%thresholdLower');
if (d&&''==this.thresholdLower) {
this._thresholdLower = d;
}
else if (''!=this.thresholdLower && isNaN(parseFloat(this.thresholdLower))) {
this._thresholdLower = controller.getDataByName(this.thresholdLower);
}
else {
this._thresholdLower = parseFloat(this.thresholdLower);
this._thresholdLower = isNaN(this._thresholdLower) ? '' : this._thresholdLower;
}
if (''!=this.targetValue && isNaN(parseFloat(this.targetValue))) {
this._targetValue = controller.getDataByName(this.targetValue);
}
else {
this._targetValue = parseFloat(this.targetValue);
this._targetValue = isNaN(this._targetValue) ? '' : this._targetValue;
}
}
}
else {
this._rangeLower = parseFloat(this.rangeLower);
this._rangeUpper = parseFloat(this.rangeUpper);
this._rangeLower = isNaN(this._rangeLower) ? 0 : this._rangeLower;
this._rangeUpper = isNaN(this._rangeUpper) ? 100 : this._rangeUpper;
this._thresholdLower = parseFloat(this.thresholdLower);
this._thresholdUpper = parseFloat(this.thresholdUpper);
this._thresholdLower = isNaN(this._thresholdLower) ? 0 : this._thresholdLower;
this._thresholdUpper = isNaN(this._thresholdUpper) ? 100 : this._thresholdUpper;
this._targetValue = parseFloat(this.targetValue);
this._targetValue = isNaN(this._targetValue) ? '' : this._targetValue;
}
this._thresholdLower = (''==this._thresholdLower) ? 0 : this._thresholdLower;
this._thresholdUpper = (''==this._thresholdUpper) ? 90 : this._thresholdUpper;
this._rangeLower = (''==this._rangeLower) ? 0 : this._rangeLower;
this._rangeUpper = (''==this._rangeUpper) ? 100 : this._rangeUpper;
return this.value;
}

self._ZEN_SVGComponent_meter_connectToController = function() {
this.controller = '';
if (!zenIsMissing(this.controllerId)) {
if (this.composite) {
this.controller = this.composite.getChildById(this.controllerId);
}
else {
this.controller = zenPage.getComponentById(this.controllerId);
}
if (this.controller && this.controller.register) {
this.controller.register(this);
}
else {
alert('ZEN: Unable to connect component to dataController (' + this.id + ').');
}
if (this.controller) {
if ('' == this.controller.modelError) {
this.controller.loadModel(false);
}
}
}
}

self._ZEN_SVGComponent_meter_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._ZEN_SVGComponent_meter_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._ZEN_SVGComponent_meter_getLabelText = function() {
var label = this.label;
if ('$auto'==label) {
var controller = this.getController();
if (!controller) {
label = this.dataBinding;
}
else {
label = '';
var labelDim = 1;
if (controller.getPropertyDim) {
labelDim = controller.getPropertyDim();
}
var props = controller.getDimSize(labelDim);
for (var p1 = 0; p1 < props; p1++) {
if (controller.getPropertyName(p1)==this.dataBinding) {
label = controller.getLabel(p1,labelDim);
break;
}
}
}
}
return label;
}

self._ZEN_SVGComponent_meter_getValue = function() {
return this.getProperty('value');
}

self._ZEN_SVGComponent_meter_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_meter_notifyViewHandler = function(reason,data1,data2,data3) {
switch(reason) {
case 'dataChange':
var controller = this.getController();
var ds = controller.getProperty('defaultSeries');
if (null == data3 || ds == data3) {
var oldTU = this._thresholdUpper;
var oldTL = this._thresholdLower;
var oldRU = this._rangeUpper;
var oldRL = this._rangeLower;
this.setValue(this.acquireData());
if ((oldTU != this._thresholdUpper)||(oldRU != this._rangeUpper)||(oldTL != this._thresholdLower)||(oldRL != this._rangeLower)) {
this.unrender();
this.render();
}
}
break;
case 'seriesChange':
case 'modelChange':
this.setValue(this.acquireData());
break;
}
}

self._ZEN_SVGComponent_meter_onchangeHandler = function() {
var controller = this.getController();
if (controller && '' != this.dataBinding) {
this.sendEventToController('propertyChange',this.dataBinding,this.value);
}
zenInvokeCallbackMethod(this.onchange,this,'onchange');
}

self._ZEN_SVGComponent_meter_renderContents = function() {
this.acquireData();
this.renderMeter();
}

self._ZEN_SVGComponent_meter_renderLabel = function(x,y) {
var lblText = this.document.createElementNS(SVGNS,'text');
lblText.setAttribute('id',this.makeId('label'));
lblText.setAttribute('class','meter-label');
lblText.setAttribute('style',this.labelStyle);
lblText.setAttribute('x',x);
lblText.setAttribute('y',y);
lblText.setAttribute('text-anchor','middle');
var textNode = this.document.createTextNode(this.getLabelText());
lblText.appendChild(textNode);
this.svgGroup.appendChild(lblText);
var bbox = zenGetBBox(lblText);
if (bbox.width*1.1 > this.viewBoxWidth) {
var fSZ = bbox.height;
while (bbox.width*1.1 > this.viewBoxWidth && fSZ>3) {
fSZ *= 0.8;
lblText.setAttribute('style',this.labelStyle + 'font-size:'+fSZ+'px;');
var bbox = zenGetBBox(lblText);
}
}
}

self._ZEN_SVGComponent_meter_renderMeter = function() {
}

self._ZEN_SVGComponent_meter_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_meter_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._ZEN_SVGComponent_meter_setProperty = function(property,value,value2) {
switch(property) {
case 'scaleFactor':
case 'rangeUpper':
case 'rangeLower':
case 'thresholdUpper':
case 'thresholdLower':
this[property] = value;
this.setProperty('value',this.value);
break;
case 'label':
this.label = value;
this.unrender();
this.render();
break;
case 'labelStyle':
this.labelStyle = value;
this.unrender();
this.render();
/*
var label = this.findSVGElement('label');
if (label) {
label.setAttribute('style',this.labelStyle);
}
*/
break;
case 'animate':
this.animate = value ? true : false;
break
case 'disabled':
this.disabled = value ? true : false;
break
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_SVGComponent_meter_setValue = function(value) {
return this.setProperty('value',value);
}
self._ZEN_SVGComponent_meter__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_svgComponent');
	_ZEN_SVGComponent_meter.prototype = zenCreate('_ZEN_SVGComponent_svgComponent',-1);
	var p = _ZEN_SVGComponent_meter.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_meter;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_svgComponent) ? zenMaster._ZEN_SVGComponent_svgComponent.prototype:_ZEN_SVGComponent_svgComponent.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.meter';
	p._type = 'meter';
	p.serialize = _ZEN_SVGComponent_meter_serialize;
	p.getSettings = _ZEN_SVGComponent_meter_getSettings;
	p.acquireData = _ZEN_SVGComponent_meter_acquireData;
	p.connectToController = _ZEN_SVGComponent_meter_connectToController;
	p.disconnectFromController = _ZEN_SVGComponent_meter_disconnectFromController;
	p.getController = _ZEN_SVGComponent_meter_getController;
	p.getLabelText = _ZEN_SVGComponent_meter_getLabelText;
	p.getValue = _ZEN_SVGComponent_meter_getValue;
	p.notifyView = _ZEN_SVGComponent_meter_notifyView;
	p.notifyViewHandler = _ZEN_SVGComponent_meter_notifyViewHandler;
	p.onchangeHandler = _ZEN_SVGComponent_meter_onchangeHandler;
	p.renderContents = _ZEN_SVGComponent_meter_renderContents;
	p.renderLabel = _ZEN_SVGComponent_meter_renderLabel;
	p.renderMeter = _ZEN_SVGComponent_meter_renderMeter;
	p.sendEventToController = _ZEN_SVGComponent_meter_sendEventToController;
	p.setControllerId = _ZEN_SVGComponent_meter_setControllerId;
	p.setProperty = _ZEN_SVGComponent_meter_setProperty;
	p.setValue = _ZEN_SVGComponent_meter_setValue;
}

self._zenClassIdx['ownerDraw'] = '_ZEN_SVGComponent_ownerDraw';
self._ZEN_SVGComponent_ownerDraw = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_ownerDraw__init(this,index,id);}
}

self._ZEN_SVGComponent_ownerDraw__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_svgComponent__init) ?zenMaster._ZEN_SVGComponent_svgComponent__init(o,index,id):_ZEN_SVGComponent_svgComponent__init(o,index,id);
	o.onrender = '';
}
function _ZEN_SVGComponent_ownerDraw_serialize(set,s)
{
	var o = this;s[0]='3105724018';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.aux;s[7]=(o.boundless?1:0);s[8]=o.height;s[9]=(o.hidden?1:0);s[10]=o.onclick;s[11]=o.onrender;s[12]=o.onupdate;s[13]=o.position;s[14]=o.preserveAspectRatio;s[15]=o.renderFlag;s[16]=o.tuple;s[17]=o.viewBoxHeight;s[18]=o.viewBoxWidth;s[19]=(o.visible?1:0);s[20]=o.width;s[21]=o.x;s[22]=o.y;
}
function _ZEN_SVGComponent_ownerDraw_getSettings(s)
{
	s['name'] = 'string';
	s['onrender'] = 'eventHandler';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_ownerDraw_renderContents = function() {
if (this.svgGroup) {
zenInvokeCallbackMethod(this.onrender,this,'onrender');
}
}

self._ZEN_SVGComponent_ownerDraw_setProperty = function(property,value,value2) {
switch(property) {
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}
self._ZEN_SVGComponent_ownerDraw__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_svgComponent');
	_ZEN_SVGComponent_ownerDraw.prototype = zenCreate('_ZEN_SVGComponent_svgComponent',-1);
	var p = _ZEN_SVGComponent_ownerDraw.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_ownerDraw;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_svgComponent) ? zenMaster._ZEN_SVGComponent_svgComponent.prototype:_ZEN_SVGComponent_svgComponent.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.ownerDraw';
	p._type = 'ownerDraw';
	p.serialize = _ZEN_SVGComponent_ownerDraw_serialize;
	p.getSettings = _ZEN_SVGComponent_ownerDraw_getSettings;
	p.renderContents = _ZEN_SVGComponent_ownerDraw_renderContents;
	p.setProperty = _ZEN_SVGComponent_ownerDraw_setProperty;
}

self._zenClassIdx['port'] = '_ZEN_SVGComponent_port';
self._ZEN_SVGComponent_port = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_port__init(this,index,id);}
}

self._ZEN_SVGComponent_port__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_svgObject__init) ?zenMaster._ZEN_SVGComponent_svgObject__init(o,index,id):_ZEN_SVGComponent_svgObject__init(o,index,id);
	o.connectors = new Array();
	o.type = '';
	o.x = '0';
	o.y = '0';
}
function _ZEN_SVGComponent_port_serialize(set,s)
{
	var o = this;s[0]='2166266508';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.aux;s[7]=set.serializeList(o,o.connectors,true,'connectors');s[8]=o.onupdate;s[9]=o.renderFlag;s[10]=o.tuple;s[11]=o.type;s[12]=(o.visible?1:0);s[13]=o.x;s[14]=o.y;
}
function _ZEN_SVGComponent_port_getSettings(s)
{
	s['name'] = 'string';
	s['connectors'] = 'string';
	s['type'] = 'enum:input,output';
	s['x'] = 'float';
	s['y'] = 'float';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_port_addConnector = function(connector) {
this.connectors[this.connectors.length] = connector;
return true;
}

self._ZEN_SVGComponent_port_renderPort = function() {
if (this._sprite) {
var circle = this._sprite.document.createElementNS(SVGNS,'circle');
circle.setAttribute('class','input'==this.type?'inputPort':'outputPort');
circle.setAttribute('cx',this.x);
circle.setAttribute('cy',this.y);
circle.setAttribute('r',3);
this._svgShape = circle;
this._sprite.svgGroup.appendChild(this._svgShape);
}
}

self._ZEN_SVGComponent_port_setProperty = function(property,value,value2) {
var updateSprite = false;
switch(property) {
case 'type':
this.type = value;
break;
case 'x':
this.x = (value=='') ? '' : parseFloat(value);
if (this._svgShape) {
this._svgShape.setAttribute('cx',this.x);
this.updateConnectors();
}
break;
case 'y':
this.y = (value=='') ? '' : parseFloat(value);
if (this._svgShape) {
this._svgShape.setAttribute('cy',this.y);
this._sprite.updateConnectors();
}
break;
default:
return this.invokeSuper('setProperty',arguments);
}
if (updateSprite && this._sprite) {
this._sprite.render();
}
return true;
}

self._ZEN_SVGComponent_port_updateConnectors = function() {
for (var n = 0; n < this.connectors.length; n++) {
var connector = this.connectors[n];
connector.updateConnector();
}
}
self._ZEN_SVGComponent_port__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_svgObject');
	_ZEN_SVGComponent_port.prototype = zenCreate('_ZEN_SVGComponent_svgObject',-1);
	var p = _ZEN_SVGComponent_port.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_port;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_svgObject) ? zenMaster._ZEN_SVGComponent_svgObject.prototype:_ZEN_SVGComponent_svgObject.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.port';
	p._type = 'port';
	p.serialize = _ZEN_SVGComponent_port_serialize;
	p.getSettings = _ZEN_SVGComponent_port_getSettings;
	p.addConnector = _ZEN_SVGComponent_port_addConnector;
	p.renderPort = _ZEN_SVGComponent_port_renderPort;
	p.setProperty = _ZEN_SVGComponent_port_setProperty;
	p.updateConnectors = _ZEN_SVGComponent_port_updateConnectors;
}

self._zenClassIdx['radialNavigator'] = '_ZEN_SVGComponent_radialNavigator';
self._ZEN_SVGComponent_radialNavigator = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_radialNavigator__init(this,index,id);}
}

self._ZEN_SVGComponent_radialNavigator__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_svgComponent__init) ?zenMaster._ZEN_SVGComponent_svgComponent__init(o,index,id):_ZEN_SVGComponent_svgComponent__init(o,index,id);
	o.backgroundStyle = '';
	o.hubStyle = '';
	o.mainLabel = '';
	o.mainLabelStyle = '';
	o.nodeStyle = '';
	o.nodes = new Array();
	o.onselectNode = '';
	o.scaleNodes = false;
	o.selectedIndex = '-2';
	o.title = '';
	o.titleStyle = '';
	o.viewBoxHeight = '100';
	o.viewBoxWidth = '100';
}
function _ZEN_SVGComponent_radialNavigator_serialize(set,s)
{
	var o = this;s[0]='280725246';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.aux;s[7]=o.backgroundStyle;s[8]=(o.boundless?1:0);s[9]=o.height;s[10]=(o.hidden?1:0);s[11]=o.hubStyle;s[12]=o.mainLabel;s[13]=o.mainLabelStyle;s[14]=o.nodeStyle;s[15]=set.serializeList(o,o.nodes,true,'nodes');s[16]=o.onclick;s[17]=o.onselectNode;s[18]=o.onupdate;s[19]=o.position;s[20]=o.preserveAspectRatio;s[21]=o.renderFlag;s[22]=(o.scaleNodes?1:0);s[23]=o.selectedIndex;s[24]=o.title;s[25]=o.titleStyle;s[26]=o.tuple;s[27]=o.viewBoxHeight;s[28]=o.viewBoxWidth;s[29]=(o.visible?1:0);s[30]=o.width;s[31]=o.x;s[32]=o.y;
}
function _ZEN_SVGComponent_radialNavigator_getSettings(s)
{
	s['name'] = 'string';
	s['backgroundStyle'] = 'svgStyle';
	s['hubStyle'] = 'svgStyle';
	s['mainLabel'] = 'caption';
	s['mainLabelStyle'] = 'svgStyle';
	s['nodeStyle'] = 'svgStyle';
	s['nodes'] = 'string';
	s['onselectNode'] = 'eventHandler';
	s['scaleNodes'] = 'boolean';
	s['selectedIndex'] = 'integer';
	s['title'] = 'caption';
	s['titleStyle'] = 'svgStyle';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_radialNavigator_appendNode = function(node) {
this.nodes[this.nodes.length] = node;
this.render();
}

self._ZEN_SVGComponent_radialNavigator_clearNodes = function() {
this.selectedIndex = -2;
this.nodes.length = 0;
this.render();
}

self._ZEN_SVGComponent_radialNavigator_drawConnector = function(group,angle) {
if (this.svgGroup) {
var radius = this._ringRadius;
var x = Math.cos(angle) * radius;
var y = Math.sin(angle) * radius;
var line = this.document.createElementNS(SVGNS,'line');
line.setAttribute('class','rnavConnector');
line.setAttribute('x1',0);
line.setAttribute('y1',0);
line.setAttribute('x2',x);
line.setAttribute('y2',y);
group.appendChild(line);
}
}

self._ZEN_SVGComponent_radialNavigator_drawNode = function(group,type,angle,node,num,size) {
if (this.svgGroup) {
var x,y,size;
var radius = this._ringRadius;
var cls,id,style;
switch (type) {
case 'main':
x = 0;
y = 0;
size = 5;
cls = (-1 == this.selectedIndex) ? 'rnavHubSelected' : 'rnavHub';
style = this.hubStyle;
id = this.makeId("main");
num = -1;
break;
default:
x = Math.cos(angle) * radius;
y = Math.sin(angle) * radius;
cls = (num == this.selectedIndex) ? 'rnavNodeSelected' : 'rnavNode';
style = this.nodeStyle;
id = this.makeId("node_"+num);
lblid = this.makeId("label_"+num);
break;
}
var item = this.document.createElementNS(SVGNS,'circle');
item.setAttribute('class',cls);
item.setAttribute('id',id);
item.setAttribute('r',size);
item.setAttribute('cx',x);
item.setAttribute('cy',y);
if (node) {
item.setAttribute('style',style + node.style);
}
else {
item.setAttribute('style',style);
}
item.addEventListener('click',new Function('evt','return zenPage.getComponent('+this.index+').nodeClickHandler(evt,"'+type+'",'+num+');'),false);
item.addEventListener('mouseover',new Function('evt','return zenPage.getComponent('+this.index+').nodeMouseHandler(evt,"over",'+num+');'),false);
item.addEventListener('mouseout',new Function('evt','return zenPage.getComponent('+this.index+').nodeMouseHandler(evt,"out",'+num+');'),false);
group.appendChild(item);
if ((type != "main") && (node.label != "")) {
var tx = Math.cos(angle) * (radius+5);
var ty = Math.sin(angle) * (radius+5);
var anchor = ((tx<2)&&(tx>-2)) ? "middle" : ((tx>0) ? "start" :"end");
var yadj = (ty>=0) ? 2 : -1;
var text = this.document.createElementNS(SVGNS,'text');
text.setAttribute('class','rnavLabel');
text.setAttribute('id',lblid);
text.setAttribute('x',tx);
text.setAttribute('y',ty + yadj);
text.setAttribute('text-anchor',anchor);
var textNode = this.document.createTextNode(node.caption);
text.appendChild(textNode);
group.appendChild(text);
}
}
}

self._ZEN_SVGComponent_radialNavigator_getCurrNode = function() {
return this.getNode(this.selectedIndex);
}

self._ZEN_SVGComponent_radialNavigator_getNode = function(index) {
if (index >= 0 && index < this.nodes.length) {
return this.nodes[index];
}
return null;
}

self._ZEN_SVGComponent_radialNavigator_nodeClickHandler = function(evt,type,nodeIndex) {
evt.stopPropagation();
if (type == 'main') { nodeIndex = -1 }
this.selectNode(nodeIndex);
zenInvokeCallbackMethod(this.onselectNode,this,'onselectNode');
}

self._ZEN_SVGComponent_radialNavigator_nodeMouseHandler = function(evt,flag,nodeIndex) {
var node = this.getNode(nodeIndex);
if (null == node) {
evt.target.setAttribute("class",flag=="over" ? 'rnavHubHilight' : (this.selectedIndex==-1 ? 'rnavHubSelected' : 'rnavHub'));
}
else {
var el = this.findSVGElement('node_' + nodeIndex);
var label = this.findSVGElement('label_' + nodeIndex);
if (el) {
el.setAttribute("class",flag=="over" ? 'rnavNodeHilight' : (this.selectedIndex==nodeIndex) ? 'rnavNodeSelected' : 'rnavNode');
}
if (label) {
label.setAttribute("class",flag=="over" ? 'rnavLabelHilight' : 'rnavLabel');
}
}
}

self._ZEN_SVGComponent_radialNavigator_removeNode = function(index) {
this.nodes.splice(index,1);
this.render();
}

self._ZEN_SVGComponent_radialNavigator_renderContents = function() {
if (this.svgGroup) {
this.unrender();
var nodeCount = this.nodes.length;
var wid = 100;
var hgt = 100;
this._ringRadius = 25;
var adj = (nodeCount!=0 && nodeCount <20 && nodeCount%4==0) ? 15 : 0;
var rect = this.document.createElementNS(SVGNS,'rect');
rect.setAttribute('class','rnavBackground');
rect.setAttribute('x',0);
rect.setAttribute('y',0);
rect.setAttribute('width',wid);
rect.setAttribute('height',hgt);
rect.setAttribute('style',this.backgroundStyle);
this.svgGroup.appendChild(rect);
if ('' != this.mainLabel) {
var line = this.document.createElementNS(SVGNS,'line');
line.setAttribute('class','rnavTitleConnector');
line.setAttribute('x1',wid/2);
line.setAttribute('y1',hgt/2);
line.setAttribute('x2',wid/2-adj);
line.setAttribute('y2',9);
this.svgGroup.appendChild(line);
var text = this.document.createElementNS(SVGNS,'text');
text.setAttribute('class','rnavTitle');
text.setAttribute('x',wid/2-adj);
text.setAttribute('y',7);
text.setAttribute('style',this.mainLabelStyle);
text.setAttribute('text-anchor','middle');
var textNode = this.document.createTextNode(this.mainLabel);
text.appendChild(textNode);
this.svgGroup.appendChild(text);
}
var group = this.document.createElementNS(SVGNS,'g');
group.setAttribute('transform','translate('+(wid/2)+','+(hgt/2)+')');
this.svgGroup.appendChild(group);
if (nodeCount > 0) {
for (var n = 0; n < nodeCount; n++) {
var angle = (n-1) * ((Math.PI*2)/nodeCount);
this.drawConnector(group, angle);
}
}
var max = 0;
if (this.scaleNodes && nodeCount > 0) {
for (var n = 0; n < nodeCount; n++) {
var node = this.nodes[n];
var v = parseFloat(node.value);
if (!isNaN(v) && v > max) {
max = v;
}
}
}
if ('' != this.title || nodeCount > 0) {
this.drawNode(group,"main");
}
if (nodeCount > 0) {
var circ = this._ringRadius * 2 * Math.PI;
var nodeSize = (circ/(nodeCount*2))*0.9;
nodeSize = (nodeSize>2.5) ? 2.5 : nodeSize;
for (var n = 0; n < nodeCount; n++) {
var node = this.nodes[n];
var angle = (n-1) * ((Math.PI*2)/nodeCount);
var size = nodeSize;
if (node.value && max>0) {
size = Math.sqrt(nodeSize*nodeSize*(node.value/max));
}
this.drawNode(group, "node", angle, node, n, size);
}
}
}
}

self._ZEN_SVGComponent_radialNavigator_selectNode = function(index) {
var el = null;
switch (this.selectedIndex) {
case -2:
break;
case -1:
var el = this.findSVGElement('main');
break;
default:
var el = this.findSVGElement('node_' + this.selectedIndex);
break;
}
if (el) {
el.setAttribute('class','rnavNode');
}
var el = null;
this.selectedIndex = index;
switch (this.selectedIndex) {
case -2:
break;
case -1:
var el = this.findSVGElement('main');
if (el) {
el.setAttribute('class','rnavHubSelected');
}
break;
default:
var el = this.findSVGElement('node_' + this.selectedIndex);
if (el) {
el.setAttribute('class','rnavNodeSelected');
}
break;
}
}

self._ZEN_SVGComponent_radialNavigator_setProperty = function(property,value,value2) {
switch(property) {
case 'backgroundStyle':
case 'titleStyle':
case 'title':
case 'mainLabelStyle':
case 'mainLabel':
case 'hubStyle':
case 'nodeStyle':
case 'scaleNodes':
this[property] = value;
this.render();
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}
self._ZEN_SVGComponent_radialNavigator__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_svgComponent');
	_ZEN_SVGComponent_radialNavigator.prototype = zenCreate('_ZEN_SVGComponent_svgComponent',-1);
	var p = _ZEN_SVGComponent_radialNavigator.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_radialNavigator;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_svgComponent) ? zenMaster._ZEN_SVGComponent_svgComponent.prototype:_ZEN_SVGComponent_svgComponent.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.radialNavigator';
	p._type = 'radialNavigator';
	p.serialize = _ZEN_SVGComponent_radialNavigator_serialize;
	p.getSettings = _ZEN_SVGComponent_radialNavigator_getSettings;
	p.appendNode = _ZEN_SVGComponent_radialNavigator_appendNode;
	p.clearNodes = _ZEN_SVGComponent_radialNavigator_clearNodes;
	p.drawConnector = _ZEN_SVGComponent_radialNavigator_drawConnector;
	p.drawNode = _ZEN_SVGComponent_radialNavigator_drawNode;
	p.getCurrNode = _ZEN_SVGComponent_radialNavigator_getCurrNode;
	p.getNode = _ZEN_SVGComponent_radialNavigator_getNode;
	p.nodeClickHandler = _ZEN_SVGComponent_radialNavigator_nodeClickHandler;
	p.nodeMouseHandler = _ZEN_SVGComponent_radialNavigator_nodeMouseHandler;
	p.removeNode = _ZEN_SVGComponent_radialNavigator_removeNode;
	p.renderContents = _ZEN_SVGComponent_radialNavigator_renderContents;
	p.selectNode = _ZEN_SVGComponent_radialNavigator_selectNode;
	p.setProperty = _ZEN_SVGComponent_radialNavigator_setProperty;
}

self._zenClassIdx['rect'] = '_ZEN_SVGComponent_rect';
self._ZEN_SVGComponent_rect = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_rect__init(this,index,id);}
}

self._ZEN_SVGComponent_rect__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_svgComponent__init) ?zenMaster._ZEN_SVGComponent_svgComponent__init(o,index,id):_ZEN_SVGComponent_svgComponent__init(o,index,id);
	o.rx = '0';
	o.style = '';
}
function _ZEN_SVGComponent_rect_serialize(set,s)
{
	var o = this;s[0]='2025506602';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.aux;s[7]=(o.boundless?1:0);s[8]=o.height;s[9]=(o.hidden?1:0);s[10]=o.onclick;s[11]=o.onupdate;s[12]=o.position;s[13]=o.preserveAspectRatio;s[14]=o.renderFlag;s[15]=o.rx;s[16]=o.style;s[17]=o.tuple;s[18]=o.viewBoxHeight;s[19]=o.viewBoxWidth;s[20]=(o.visible?1:0);s[21]=o.width;s[22]=o.x;s[23]=o.y;
}
function _ZEN_SVGComponent_rect_getSettings(s)
{
	s['name'] = 'string';
	s['rx'] = 'length';
	s['style'] = 'svgStyle';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_rect_renderContents = function() {
var rect = this.document.createElementNS(SVGNS,'rect');
rect.setAttribute('id',this.makeId('rect'));
rect.setAttribute('class','rect');
rect.setAttribute('x',0);
rect.setAttribute('y',0);
rect.setAttribute('width',this.width);
rect.setAttribute('height',this.height);
rect.setAttribute('rx',this.rx);
rect.setAttribute('style',this.style);
this.svgGroup.appendChild(rect);
}

self._ZEN_SVGComponent_rect_setProperty = function(property,value,value2) {
switch(property) {
case 'rx':
case 'style':
this[property] = value;
var el = this.findSVGElement('rect');
if (el) {
el.setAttribute(property,value);
}
break;
case 'width':
case 'height':
var el = this.findSVGElement('rect');
if (el) {
el.setAttribute(property,value);
}
return this.invokeSuper('setProperty',arguments);
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}
self._ZEN_SVGComponent_rect__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_svgComponent');
	_ZEN_SVGComponent_rect.prototype = zenCreate('_ZEN_SVGComponent_svgComponent',-1);
	var p = _ZEN_SVGComponent_rect.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_rect;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_svgComponent) ? zenMaster._ZEN_SVGComponent_svgComponent.prototype:_ZEN_SVGComponent_svgComponent.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.rect';
	p._type = 'rect';
	p.serialize = _ZEN_SVGComponent_rect_serialize;
	p.getSettings = _ZEN_SVGComponent_rect_getSettings;
	p.renderContents = _ZEN_SVGComponent_rect_renderContents;
	p.setProperty = _ZEN_SVGComponent_rect_setProperty;
}

self._zenClassIdx['sprite'] = '_ZEN_SVGComponent_sprite';
self._ZEN_SVGComponent_sprite = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_sprite__init(this,index,id);}
}

self._ZEN_SVGComponent_sprite__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_svgComponent__init) ?zenMaster._ZEN_SVGComponent_svgComponent__init(o,index,id):_ZEN_SVGComponent_svgComponent__init(o,index,id);
	o.caption = '';
	o.ports = new Array();
	o.rx = '0';
	o.style = '';
}
function _ZEN_SVGComponent_sprite_serialize(set,s)
{
	var o = this;s[0]='2135105105';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.aux;s[7]=(o.boundless?1:0);s[8]=o.caption;s[9]=o.height;s[10]=(o.hidden?1:0);s[11]=o.onclick;s[12]=o.onupdate;s[13]=set.serializeList(o,o.ports,true,'ports');s[14]=o.position;s[15]=o.preserveAspectRatio;s[16]=o.renderFlag;s[17]=o.rx;s[18]=o.style;s[19]=o.tuple;s[20]=o.viewBoxHeight;s[21]=o.viewBoxWidth;s[22]=(o.visible?1:0);s[23]=o.width;s[24]=o.x;s[25]=o.y;
}
function _ZEN_SVGComponent_sprite_getSettings(s)
{
	s['name'] = 'string';
	s['caption'] = 'caption';
	s['ports'] = 'string';
	s['rx'] = 'integer';
	s['style'] = 'svgStyle';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_sprite_createPort = function(type,x,y) {
var port = zenPage.createComponent('port');
if (port) {
port.type = type;
port.x = x;
port.y = y;
port._sprite = this;
this.ports[this.ports.length] = port;
port.renderPort(this.svgGroup);
}
}

self._ZEN_SVGComponent_sprite_createPorts = function() {
this.createPort('input',this.width/2,5);
this.createPort('output',this.width/2,this.height-5);
this.createPort('input2',5,this.height/2);
this.createPort('output2',this.width-5,this.height/2);
}

self._ZEN_SVGComponent_sprite_getPort = function(portno) {
return this.ports[portno];
}

self._ZEN_SVGComponent_sprite_renderContents = function() {
var rect = this.document.createElementNS(SVGNS,'rect');
rect.setAttribute('class','spriteShadow');
rect.setAttribute('rx',this.rx);
rect.setAttribute('x',12);
rect.setAttribute('y',12);
rect.setAttribute('width',this.width-20);
rect.setAttribute('height',this.height-20);
this._svgShadowRect = rect;
this.svgGroup.appendChild(rect);
var rect = this.document.createElementNS(SVGNS,'rect');
rect.setAttribute('class','sprite');
rect.setAttribute('style',this.style);
rect.setAttribute('rx',this.rx);
rect.setAttribute('x',10);
rect.setAttribute('y',10);
rect.setAttribute('width',this.width-20);
rect.setAttribute('height',this.height-20);
this._svgShape = rect;
this.svgGroup.appendChild(rect);
var caption = this.document.createElementNS(SVGNS,'text');
caption.setAttribute('id',this.makeId('caption'));
caption.setAttribute('class','sprite-caption');
caption.setAttribute('x',this.width / 2);
caption.setAttribute('y',this.height / 2);
caption.setAttribute('text-anchor','middle');
var textNode = this.document.createTextNode(this.caption);
caption.appendChild(textNode);
this.svgGroup.appendChild(caption);
this._caption = caption;
this.createPorts();
}

self._ZEN_SVGComponent_sprite_setPositionHandler = function() {
this.updateConnectors();
}

self._ZEN_SVGComponent_sprite_setProperty = function(property,value,value2) {
switch(property) {
case 'style':
this.style = value;
if (this._svgShape) {
this._svgShape.setAttribute('style',this.style);
}
break;
case 'caption':
this.caption = value;
this.setTextNode('caption',this.caption);
break;
case 'rx':
this.rx = parseInt(value,10);
if (this._svgShape) {
this._svgShape.setAttribute('rx',this.rx);
}
if (this._svgShadowRect) {
this._svgShadowRect.setAttribute('rx',this.rx);
}
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_SVGComponent_sprite_setSizeHandler = function() {
if (this._svgShape) {
this._svgShape.setAttribute('x',10);
this._svgShape.setAttribute('y',10);
this._svgShape.setAttribute('width',this.width-20);
this._svgShape.setAttribute('height',this.height-20);
if (this._svgShadowRect) {
this._svgShadowRect.setAttribute('x',12);
this._svgShadowRect.setAttribute('y',12);
this._svgShadowRect.setAttribute('width',this.width-20);
this._svgShadowRect.setAttribute('height',this.height-20);
}
if (this._caption) {
this._caption.setAttribute('x',this.width / 2);
this._caption.setAttribute('y',this.height / 2);
}
var port;
port = this.getPort(0);
if (port) {
port.setProperty('x',this.width/2);
}
port = this.getPort(1);
if (port) {
port.setProperty('x',this.width/2);
port.setProperty('y',this.height - 5);
}
port = this.getPort(2);
if (port) {
port.setProperty('x',5);
port.setProperty('y',this.height/2);
}
port = this.getPort(3);
if (port) {
port.setProperty('x',this.width-5);
port.setProperty('y',this.height/2);
}
}
this.updateConnectors();
}

self._ZEN_SVGComponent_sprite_updateConnectors = function() {
for (var n = 0; n < this.ports.length; n++) {
var port = this.ports[n];
port.updateConnectors();
}
}
self._ZEN_SVGComponent_sprite__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_svgComponent');
	_ZEN_SVGComponent_sprite.prototype = zenCreate('_ZEN_SVGComponent_svgComponent',-1);
	var p = _ZEN_SVGComponent_sprite.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_sprite;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_svgComponent) ? zenMaster._ZEN_SVGComponent_svgComponent.prototype:_ZEN_SVGComponent_svgComponent.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.sprite';
	p._type = 'sprite';
	p.serialize = _ZEN_SVGComponent_sprite_serialize;
	p.getSettings = _ZEN_SVGComponent_sprite_getSettings;
	p.createPort = _ZEN_SVGComponent_sprite_createPort;
	p.createPorts = _ZEN_SVGComponent_sprite_createPorts;
	p.getPort = _ZEN_SVGComponent_sprite_getPort;
	p.renderContents = _ZEN_SVGComponent_sprite_renderContents;
	p.setPositionHandler = _ZEN_SVGComponent_sprite_setPositionHandler;
	p.setProperty = _ZEN_SVGComponent_sprite_setProperty;
	p.setSizeHandler = _ZEN_SVGComponent_sprite_setSizeHandler;
	p.updateConnectors = _ZEN_SVGComponent_sprite_updateConnectors;
}

self._zenClassIdx['svgFrame'] = '_ZEN_SVGComponent_svgFrame';
self._ZEN_SVGComponent_svgFrame = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_svgFrame__init(this,index,id);}
}

self._ZEN_SVGComponent_svgFrame__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.autoHeight = '';
	o.autoWidth = '';
	o.backgroundStyle = 'fill: white;';
	o.children = new Array();
	o.disabled = false;
	o.document = null;
	o.dragCanvas = false;
	o.editMode = 'none';
	o.frameStyle = '';
	o.gridX = '25';
	o.gridY = '25';
	o.height = '100';
	o.inlineSVG = false;
	o.layout = '';
	o.offsetX = '0';
	o.offsetY = '0';
	o.ondragCanvas = '';
	o.onmouseWheel = '';
	o.onmoveItem = '';
	o.onresizeItem = '';
	o.onselectItem = '';
	o.onzoom = '';
	o.parameters = new Object();
	o.selectedItem = null;
	o.selectedItems = new Array();
	o.snapToGrid = false;
	o.svgAutoSize = true;
	o.svgGroup = null;
	o.svgHeight = '';
	o.svgPage = '';
	o.svgRoot = null;
	o.svgWidth = '';
	o.svgWindow = null;
	o.width = '300';
	o.zoom = '100';
	o.zoomLevels = '10,25,50,75,100,125,150,175,200,300,400,500';
	o.zoomWithWheel = false;
}
function _ZEN_SVGComponent_svgFrame_serialize(set,s)
{
	var o = this;s[0]='2554189503';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.autoHeight;s[8]=o.autoWidth;s[9]=o.aux;s[10]=o.backgroundStyle;s[11]=set.serializeList(o,o.children,true,'children');s[12]=o.containerStyle;s[13]=(o.disabled?1:0);s[14]=(o.dragCanvas?1:0);s[15]=(o.dragEnabled?1:0);s[16]=(o.dropEnabled?1:0);s[17]=(o.dynamic?1:0);s[18]=o.editMode;s[19]=o.enclosingClass;s[20]=o.enclosingStyle;s[21]=o.error;s[22]=o.frameStyle;s[23]=o.gridX;s[24]=o.gridY;s[25]=o.height;s[26]=(o.hidden?1:0);s[27]=o.hint;s[28]=o.hintClass;s[29]=o.hintStyle;s[30]=(o.inlineSVG?1:0);s[31]=o.label;s[32]=o.labelClass;s[33]=o.labelDisabledClass;s[34]=o.labelStyle;s[35]=o.layout;s[36]=o.offsetX;s[37]=o.offsetY;s[38]=o.onafterdrag;s[39]=o.onbeforedrag;s[40]=o.ondrag;s[41]=o.ondragCanvas;s[42]=o.ondrop;s[43]=o.onhide;s[44]=o.onmouseWheel;s[45]=o.onmoveItem;s[46]=o.onrefresh;s[47]=o.onresizeItem;s[48]=o.onselectItem;s[49]=o.onshow;s[50]=o.onupdate;s[51]=o.onzoom;s[52]=o.overlayMode;s[53]=set.serializeArray(o,o.parameters,true,'parameters');s[54]=o.renderFlag;s[55]=set.addObject(o.selectedItem,'selectedItem');s[56]=set.serializeList(o,o.selectedItems,true,'selectedItems');s[57]=(o.showLabel?1:0);s[58]=o.slice;s[59]=(o.snapToGrid?1:0);s[60]=(o.svgAutoSize?1:0);s[61]=o.svgHeight;s[62]=o.svgPage;s[63]=o.svgWidth;s[64]=o.title;s[65]=o.tuple;s[66]=o.valign;s[67]=(o.visible?1:0);s[68]=o.width;s[69]=o.zoom;s[70]=o.zoomLevels;s[71]=(o.zoomWithWheel?1:0);
}
function _ZEN_SVGComponent_svgFrame_getSettings(s)
{
	s['name'] = 'string';
	s['backgroundStyle'] = 'svgStyle';
	s['disabled'] = 'boolean';
	s['dragCanvas'] = 'boolean';
	s['editMode'] = 'enum:none,select,drag';
	s['frameStyle'] = 'style';
	s['gridX'] = 'integer';
	s['gridY'] = 'integer';
	s['inlineSVG'] = 'boolean';
	s['layout'] = 'enum:vertical,horizontal,flow,none';
	s['offsetX'] = 'integer';
	s['offsetY'] = 'integer';
	s['ondragCanvas'] = 'eventHandler';
	s['onmouseWheel'] = 'eventHandler';
	s['onmoveItem'] = 'eventHandler';
	s['onresizeItem'] = 'eventHandler';
	s['onselectItem'] = 'eventHandler';
	s['onzoom'] = 'eventHandler';
	s['parameters'] = 'string';
	s['snapToGrid'] = 'boolean';
	s['svgAutoSize'] = 'boolean';
	s['svgHeight'] = 'integer';
	s['svgWidth'] = 'integer';
	s['zoom'] = 'float';
	s['zoomLevels'] = 'csv';
	s['zoomWithWheel'] = 'boolean';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_svgFrame_addChild = function(component) {
zenASSERT(component && zenIsComponent(component),'Invalid component',arguments);
if (!component.isOfType('svgComponent')) {
alert('Only SVG components can be added to svg groups');
return;
}
this.children[this.children.length] = component;
component.parent = this;
if (this.document && this.svgGroup) {
component.renderSVG(this.document,this.svgGroup);
}
}

self._ZEN_SVGComponent_svgFrame_canDragShapes = function() {
return ('drag' == this._runtimeEditMode);
}

self._ZEN_SVGComponent_svgFrame_getSVGDocument = function() {
if (this.inlineSVG) {
return document;
}
var embed = this.findElement("frame");
if (embed) {
return embed.getSVGDocument();
}
return null;
}

self._ZEN_SVGComponent_svgFrame_getSelectedItem = function() {
return ('' == this.selectedItem) ? null : this.selectedItem;
}

self._ZEN_SVGComponent_svgFrame_getSelectedItems = function() {
return this.selectedItems;
}

self._ZEN_SVGComponent_svgFrame_getZoomIndex = function(x) {
if (null == this._zoomIndex) {
var currZoom = parseFloat(this.zoom);
var zooms = this.zoomLevels.split(',');
this._zoomIndex = zooms.length-1;
for (var z = 0; z < zooms.length; z++) {
if (parseFloat(zooms[z]) > currZoom) {
this._zoomIndex = z;
break;
}
}
}
return this._zoomIndex;
}

self._ZEN_SVGComponent_svgFrame_isSelected = function(item) {
if (null == item) {
return false;
}
for (var i = 0; i < this.selectedItems.length; i++) {
if (this.selectedItems[i] == item) {
return true;
}
}
return false;
}

self._ZEN_SVGComponent_svgFrame_layoutChildren = function() {
var height = 0;
var width = 0;
switch(this.layout) {
case 'vertical':
var x=0,y=0;
for (var n = 0; n < this.children.length; n++) {
var child = this.children[n];
if ('relative' == child.position && !child.hidden) {
child.setPosition(x,y);
if (child.layoutChildren) {
child.layoutChildren();
}
y += parseInt(child.height,10);
width = (parseInt(child.width,10) > width) ? parseInt(child.width,10) : width;
}
}
height = y;
break;
case 'horizontal':
var x=0,y=0;
for (var n = 0; n < this.children.length; n++) {
var child = this.children[n];
if ('relative' == child.position && !child.hidden) {
child.setPosition(x,y);
if (child.layoutChildren) {
child.layoutChildren();
}
x += parseInt(child.width,10);
height = (parseInt(child.height,10) > height) ? parseInt(child.height,10) : height;
}
}
width = x;
break;
case 'flow':
var flowWidth = this.width;
var x=0,y=0;
for (var n = 0; n < this.children.length; n++) {
var child = this.children[n];
if ('relative' == child.position && !child.hidden) {
child.setPosition(x,y);
if (child.layoutChildren) {
child.layoutChildren();
}
var cw = parseInt(child.width,10);
if (x > 0 && (x+cw) > flowWidth) {
x = 0;
y = height;
child.setPosition(x,y);
if (child.layoutChildren) {
child.layoutChildren();
}
cw = parseInt(child.width,10);
}
x += cw;
height = ((y + parseInt(child.height,10)) > height) ? (y+parseInt(child.height,10)) : height;
width = (x > width) ? x : width;
}
}
break;
case 'none':
default:
for (var n = 0; n < this.children.length; n++) {
var child = this.children[n];
if ('relative' == child.position && !child.hidden) {
child.setPosition(child.x,child.y);
if (child.layoutChildren) {
child.layoutChildren();
}
width = ((parseInt(child.x,10)+parseInt(child.width,10)) > width) ? parseInt(child.width,10)+parseInt(child.x,10) : width;
height = ((parseInt(child.y,10)+parseInt(child.height,10)) > height) ? parseInt(child.height,10)+parseInt(child.y,10) : height;
}
}
break;
}
if (this.setBoundingBox) {
this.setBoundingBox(width, height);
}
}

self._ZEN_SVGComponent_svgFrame_mousedownHandler = function(evt) {
if (evt.target == this.svgBackground) {
this.selectItem(null);
if (this.dragCanvas) {
this.startDragCanvas(evt);
}
}
}

self._ZEN_SVGComponent_svgFrame_mousemoveHandler = function(evt) {
var currZoom = this.zoom;
var oldEvent = zenEvent;
zenEvent = evt ? evt : window.event;
switch (this._currOperation) {
case 'move':
if (this._mouseTarget) {
var size = this._mouseTarget.getSizeAbsolute();
var dx = ((evt.clientX * (100/currZoom)) + this._deltaX) - size.x;
var dy = ((evt.clientY * (100/currZoom)) + this._deltaY) - size.y;
if (dx*dx > 4 || dy*dy > 4) {
if (this.snapToGrid && this.gridX > 0 && this.gridY > 0) {
dx = Math.floor(dx / this.gridX) * this.gridX;
dy = Math.floor(dy / this.gridY) * this.gridY;
}
this._isMoved = true;
for (var i = 0; i < this.selectedItems.length; i++) {
var item = this.selectedItems[i];
var size = item.getSizeAbsolute();
item.updateOverlay(size.x + dx,size.y + dy,size.width,size.height);
}
zenInvokeCallbackMethod(this.onmoveItem,this,'onmoveItem','done',false);
}
}
break;
case 'dragCanvas':
var dx = ((evt.clientX * (100/currZoom)) + this._deltaX) - this.offsetX;
var dy = ((evt.clientY * (100/currZoom)) + this._deltaY) - this.offsetY;
if (dx*dx > 4 || dy*dy > 4) {
this._isMoved = true;
this.setOffsets(this.offsetX + dx,this.offsetY + dy);
zenInvokeCallbackMethod(this.ondragCanvas,this,'ondragCanvas','done',false);
}
break;
case 'resize':
if (this._mouseTarget) {
var size = this._mouseTarget.getSizeAbsolute();
var dx = ((evt.clientX * (100/currZoom)) + this._deltaX) - size.x;
var dy = ((evt.clientY * (100/currZoom)) + this._deltaY) - size.y;
var x,y,w,h;
if (dx*dx > 4 || dy*dy > 4) {
this._isMoved = true;
if (this.snapToGrid && this.gridX > 0 && this.gridY > 0) {
dx = Math.floor(dx / this.gridX) * this.gridX;
dy = Math.floor(dy / this.gridY) * this.gridY;
}
for (var i = 0; i < this.selectedItems.length; i++) {
var item = this.selectedItems[i];
var size = item.getSizeAbsolute();
switch(this._sizingHandle) {
case 'ne':
w = size.width + dx;
h = size.height - dy;
x = size.x;
y = (h > 0) ? size.y + dy : size.y + size.height;
break;
case 'nw':
w = size.width - dx;
h = size.height - dy;
x = (w > 0) ? size.x + dx : size.x + size.width;
y = (h > 0) ? size.y + dy : size.y + size.height;
break;
case 'se':
w = size.width + dx;
h = size.height + dy;
x = size.x;
y = size.y;
break;
case 'sw':
w = size.width - dx;
h = size.height + dy;
x = (w > 0) ? size.x + dx : size.x + size.width;
y = size.y;
break;
}
w = (w < 0) ? 0 : w;
h = (h < 0) ? 0 : h;
item.updateOverlay(x,y,w,h);
}
zenInvokeCallbackMethod(this.onresizeItem,this,'onresizeItem','done',false);
}
}
break;
default:
break;
}
zenEvent = oldEvent;
}

self._ZEN_SVGComponent_svgFrame_mouseupHandler = function(evt) {
var currZoom = this.zoom;
var oldEvent = zenEvent;
zenEvent = evt ? evt : window.event;
switch (this._currOperation) {
case 'move':
if (this._isMoved && this._mouseTarget) {
var size = this._mouseTarget.getSizeAbsolute();
var dx = ((evt.clientX * (100/currZoom)) + this._deltaX) - size.x;
var dy = ((evt.clientY * (100/currZoom)) + this._deltaY) - size.y;
if (this.snapToGrid && this.gridX > 0 && this.gridY > 0) {
dx = Math.floor(dx / this.gridX) * this.gridX;
dy = Math.floor(dy / this.gridY) * this.gridY;
}
for (var i = 0; i < this.selectedItems.length; i++) {
var item = this.selectedItems[i];
this.moveItem(item,dx,dy);
}
zenInvokeCallbackMethod(this.onmoveItem,this,'onmoveItem','done',true);
}
break;
case 'dragCanvas':
if (this._isMoved) {
var dx = ((evt.clientX * (100/currZoom)) + this._deltaX) - this.offsetX;
var dy = ((evt.clientY * (100/currZoom)) + this._deltaY) - this.offsetY;
this.setOffsets(this.offsetX + dx,this.offsetY + dy);
zenInvokeCallbackMethod(this.ondragCanvas,this,'ondragCanvas','done',true);
}
break;
case 'resize':
if (this._isMoved && this._mouseTarget) {
var size = this._mouseTarget.getSizeAbsolute();
var dx = ((evt.clientX * (100/currZoom)) + this._deltaX) - size.x;
var dy = ((evt.clientY * (100/currZoom)) + this._deltaY) - size.y;
if (this.snapToGrid && this.gridX > 0 && this.gridY > 0) {
dx = Math.floor(dx / this.gridX) * this.gridX;
dy = Math.floor(dy / this.gridY) * this.gridY;
}
var x,y,w,h;
for (var i = 0; i < this.selectedItems.length; i++) {
var item = this.selectedItems[i];
var size = item.getSizeAbsolute();
switch(this._sizingHandle) {
case 'ne':
w = size.width + dx;
h = size.height - dy;
x = 0;
y = (h > 0) ? dy : size.height;
break;
case 'nw':
w = size.width - dx;
h = size.height - dy;
x = (w > 0) ? dx : size.width;
y = (h > 0) ? dy : size.height;
break;
case 'se':
w = size.width + dx;
h = size.height + dy;
x = 0;
y = 0;
break;
case 'sw':
w = size.width - dx;
h = size.height + dy;
x = (w > 0) ? dx : size.width;
y = 0;
break;
}
w = (w < 0) ? 0 : w;
h = (h < 0) ? 0 : h;
item.setProperty('width',w);
item.setProperty('height',h);
this.moveItem(item,x,y);
}
zenInvokeCallbackMethod(this.onresizeItem,this,'onresizeItem','done',true);
}
break;
}
zenEvent = oldEvent;
this._isMoved = false;
this._mouseTarget = null;
this._currOperation = null;
this._sizingHandle = null;
this.svgRoot.removeEventListener('mousemove',this._mmHandler,false);
this.svgRoot.removeEventListener('mouseup',this._muHandler,false);
}

self._ZEN_SVGComponent_svgFrame_mousewheelHandler = function(evt) {
evt.stopPropagation();
evt.preventDefault()
var delta = 0;
var cx = evt.clientX;
var cy = evt.clientY;
if (!evt) {
evt = window.event;
}
if (evt.wheelDelta) {
delta = evt.wheelDelta/120;
if (window.opera) {	delta = -delta; }
}
else if (evt.detail) {
delta = -evt.detail/3;
cx = evt.clientX /15;
cy = evt.clientY /15;
}
if (this.zoomWithWheel) {
if (delta < 0) { this.zoomIn(cx,cy); }
else if (delta > 0) { this.zoomOut(cx,cy); }
}
zenInvokeCallbackMethod(this.onmouseWheel,this,'onmouseWheel','delta',delta);
}

self._ZEN_SVGComponent_svgFrame_moveItem = function(item,dx,dy) {
if (!item) return;
item.setPosition(parseFloat(item.x) + parseFloat(dx), parseFloat(item.y) + parseFloat(dy));
var group = item.parent;
if (group) {
switch(group.layout) {
case 'vertical':
if (group.children.length > 1) {
group.children.sort(function(a,b) { return a.y - b.y; });
group.layoutChildren();
}
break;
case 'horizontal':
if (group.children.length > 1) {
group.children.sort(function(a,b) { return a.x - b.x; });
group.layoutChildren();
}
break;
case 'flow':
if (group.children.length > 1) {
group.children.sort(function(a,b) { return a.x - b.x; });
group.children.sort(function(a,b) { return a.y - b.y; });
group.layoutChildren();
}
break;
default:
group.layoutChildren();
break;
}
}
var size = item.getSizeAbsolute();
item.updateOverlay(size.x,size.y,size.width,size.height);
}

self._ZEN_SVGComponent_svgFrame_onloadHandler = function() {
if (this.inlineSVG) {
this.svgLoadHandler(self);
}
}

self._ZEN_SVGComponent_svgFrame_removeChild = function(component) {
zenPage.deleteComponent(component);
}

self._ZEN_SVGComponent_svgFrame_renderSVG = function(document,parent) {
this.document = document;
if (null == parent) {
this.svgRoot = this.document.getElementById('zenRoot');
this.svgGroup = this.document.getElementById('zenCanvas');
var rect = this.document.createElementNS(SVGNS,'rect');
rect.setAttribute('id','zenBackground');
rect.setAttribute('x',0);
rect.setAttribute('y',0);
rect.setAttribute('width','100%');
rect.setAttribute('height','100%');
if (null != this.backgroundStyle) {
rect.setAttribute('style',this.backgroundStyle);
}
this.svgGroup.insertBefore(rect, this.svgGroup.firstChild);
this.svgBackground = rect;
}
else {
this.createEnclosingGroup(parent);
}
for (var n = 0; n < this.children.length; n++) {
var child = this.children[n];
child.renderSVG(this.document,this.svgGroup);
}
this.layoutChildren();
}

self._ZEN_SVGComponent_svgFrame_selectItem = function(item,add) {
var itemreq = item;
if (add) {
for (var i = 0; i < this.selectedItems.length; i++) {
if (this.selectedItems[i] == item) {
this.selectedItems.splice(i,1);
item.setOverlayMode(this._runtimeEditMode=='none' ? 0 : 1);
item = null;
break;
}
}
}
else {
if (item && this.isSelected(item)) {
return;
}
}
if (!add) {
for (var i = 0; i < this.selectedItems.length; i++) {
var old = this.selectedItems[i];
this.selectedItems[i] = null;
if (old) {
old.setOverlayMode(this._runtimeEditMode=='none' ? 0 : 1);
}
}
this.selectedItems.length = 0;
}
this.selectedItem = '';
if (item) {
this.selectedItem = item;
this.selectedItems[this.selectedItems.length] = item;
item.setOverlayMode(this._runtimeEditMode=='drag' ? 3 : 2);
}
if (zenPage.designMode) {
alert('selectItem: ' + top.zenPage.selectComponent);
}
var notify = true;
if (this.selectItemHandler) {
notify = this.selectItemHandler(itemreq,add);
}
if (notify) {
zenInvokeCallbackMethod(this.onselectItem,this,'onselectItem','item',itemreq);
}
}

self._ZEN_SVGComponent_svgFrame_setBoundingBox = function(width,height) {
if (this.svgAutoSize) {
width = parseInt(width,10);
height = parseInt(height,10);
var minw = (this.svgWidth == '') ? 0 : this.svgWidth;
var minh = (this.svgHeight == '') ? 0 : this.svgHeight;
this.autoWidth = (width > minw) ? width : minw;
this.autoHeight = (height > minh) ? height : minh;
this.setFrameSize(this.width,this.height);
}
}

self._ZEN_SVGComponent_svgFrame_setEditMode = function(mode) {
if (zenPage.designMode) {
this._runtimeEditMode = 'drag';
}
else {
this._runtimeEditMode = mode;
if (mode == this.editMode) {
return;
}
}
this.editMode = mode;
switch (this._runtimeEditMode) {
case 'none':
this.setOverlayMode(0);
break;
case 'select':
this.setOverlayMode(1);
this.selectItem(null);
break;
case 'drag':
this.setOverlayMode(1);
this.selectItem(null);
break;
default:
alert('setEditMode: unknown edit mode:\n' + this._runtimeEditMode);
break;
}
}

self._ZEN_SVGComponent_svgFrame_setFrameSize = function(w,h) {
try {
if (this.inlineSVG) {
return;
}
this.width = parseInt(w,10);
this.height = parseInt(h,10);
var div = this.findElement('svgdiv');
var embed = this.findElement('frame');
if (this.width <= 0) {
this.width = 1;
}
if (this.height <= 0) {
this.height = 1;
}
var cwid, chgt, cwidScaled, chgtScaled;
if (this.svgAutoSize) {
cwid = this.autoWidth;
chgt = this.autoHeight;
if ('' != this.svgWidth) {
cwid = (this.autoWidth < parseInt(this.svgWidth,10)) ? parseInt(this.svgWidth,10) : this.autoWidth;
}
if ('' != this.svgHeight) {
chgt = (this.autoHeight < parseInt(this.svgHeight,10)) ? parseInt(this.svgHeight,10) : this.autoHeight;
}
}
else {
cwid = (''==this.svgWidth) ? this.width : parseInt(this.svgWidth,10);
chgt = (''==this.svgHeight) ? this.height : parseInt(this.svgHeight,10);
}
var cwidScaled = cwid * (this.zoom / 100);
var chgtScaled = chgt * (this.zoom / 100);
var ovx = 'auto';
var ovy = 'auto';
var rwid = cwid;
var rhgt = chgt;
if (this.width >= cwidScaled) {
ovx = 'hidden';
cwidScaled = this.width;
rwid = this.width * (100 / this.zoom);
}
if (this.height >= chgtScaled) {
ovy = 'hidden';
chgtScaled = this.height;
rhgt = this.height * (100 / this.zoom);
}
if (div && embed) {
div.style.width = this.width + 'px';
div.style.overflowX = ovx;
embed.width = cwidScaled;
div.style.height = this.height + 'px';
div.style.overflowY = ovy;
embed.height = chgtScaled;
}
if (this.svgRoot) {
this.svgRoot.setAttribute('width',cwidScaled);
this.svgRoot.setAttribute('height',chgtScaled);
}
if (this.svgBackground) {
var rect = this.svgBackground;
rect.setAttribute('width',rwid);
rect.setAttribute('height',rhgt);
}
}
catch(ex) {
zenExceptionHandler(ex,arguments);
}
}

self._ZEN_SVGComponent_svgFrame_setOffsets = function(x,y) {
this.offsetX = parseFloat(x);
this.offsetY = parseFloat(y);
this.updateScalingGroup();
}

self._ZEN_SVGComponent_svgFrame_setOverlayMode = function(mode) {
this.overlayMode = mode;
for (var n = 0; n < this.children.length; n++) {
this.children[n].setOverlayMode(mode);
}
}

self._ZEN_SVGComponent_svgFrame_setProperty = function(property,value,value2) {
switch(property) {
case 'width':
this.setFrameSize(value,this.height);
break;
case 'height':
this.setFrameSize(this.width,value);
break;
case 'svgHeight':
case 'svgWidth':
value = (''==value) ? '' : parseFloat(value);
this[property] = value;
this.setFrameSize(this.width,this.height);
break;
case 'layout':
if (this.layout != value) {
this.layout = value;
this.layoutChildren();
}
break;
case 'backgroundStyle':
this.backgroundStyle = value;
if (this.svgBackground) {
this.svgBackground.setAttribute('style',this.backgroundStyle);
}
break;
case 'editMode':
this.setEditMode(value);
break;
case 'zoomLevels':
this.zoomLevels = value;
break;
case 'snapToGrid':
value = value ? true : false;
this[property] = value;
break;
case 'gridX':
case 'gridY':
value = parseInt(value,10);
this[property] = value;
break;
case 'offsetX':
value = parseFloat(value);
this.setOffsets(value,this.offsetY);
break;
case 'offsetY':
value = parseFloat(value);
this.setOffsets(this.offsetX,value);
break;
case 'svgAutoSize':
value = value ? true : false;
this.svgAutoSize = value;
this.setFrameSize(this.width,this.height);
break;
case 'frameStyle':
this.frameStyle = value;
var div = this.findElement('svgdiv');
if (div) {
div.style.cssText = this.frameStyle;
}
break;
case 'zoomWithWheel':
case 'dragCanvas':
value = value ? true : false;
this[property] = value;
break;
case 'zoom':
this.setZoom(value);
break;
default:
this.invokeSuper('setProperty',arguments);
return true;
}
return true;
}

self._ZEN_SVGComponent_svgFrame_setPropertyAll = function(property,value,value2) {
if ('disabled' == property) return;
this.setProperty(property, value, value2);
for (var n = 0; n < this.children.length; n++) {
var child = this.children[n];
if (child.setPropertyAll) {
child.setPropertyAll(property,value,value2);
}
else {
child.setProperty(property,value,value2);
}
}
}

self._ZEN_SVGComponent_svgFrame_setZoom = function(value) {
value = parseFloat(value);
value = (value < 1) ? 1 : value;
this.zoom = value;
zenInvokeCallbackMethod(this.onzoom,this,'onzoom','zoom',this.zoom);
this.updateScalingGroup();
this.layoutChildren();
this.setFrameSize(this.width,this.height);
}

self._ZEN_SVGComponent_svgFrame_setZoomIndex = function(idx,x,y) {
x = (null == x) ? this.width / 2 : x;
y = (null == y) ? this.height / 2 : y;
var zooms = this.zoomLevels.split(',');
idx = parseInt(idx,10);
idx = (idx < 0) ? 0 : idx;
idx = (idx >= zooms.length) ? zooms.length - 1: idx;
this._zoomIndex = idx;
newZoom = parseFloat(zooms[idx]);
if (this.dragCanvas) {
var deltaX = (x * (100/this.zoom)) - (x * (100/newZoom));
var deltaY = (y * (100/this.zoom)) - (y * (100/newZoom));
this.offsetX = parseFloat(this.offsetX) - parseFloat(deltaX);
this.offsetY = parseFloat(this.offsetY) - parseFloat(deltaY);
}
this.setZoom(newZoom);
}

self._ZEN_SVGComponent_svgFrame_startDragCanvas = function(evt) {
this._currOperation = 'dragCanvas';
this._isMoved = false;
var currZoom = this.zoom;
this._deltaX = this.offsetX - (evt.clientX * (100/currZoom));
this._deltaY = this.offsetY - (evt.clientY * (100/currZoom));
this._startX = this.offsetX;
this._startY = this.offsetY;
this.svgRoot.addEventListener('mousemove',this._mmHandler,false);
this.svgRoot.addEventListener('mouseup',this._muHandler,false);
}

self._ZEN_SVGComponent_svgFrame_startMove = function(evt,shape) {
this._mouseTarget = shape;
this._currOperation = 'move';
this._isMoved = false;
var currZoom = this.zoom;
var size = shape.getSizeAbsolute();
this._deltaX = size.x - (evt.clientX * (100/currZoom));
this._deltaY = size.y - (evt.clientY * (100/currZoom));
this._startX = size.x;
this._startY = size.y;
this.svgRoot.addEventListener('mousemove',this._mmHandler,false);
this.svgRoot.addEventListener('mouseup',this._muHandler,false);
}

self._ZEN_SVGComponent_svgFrame_startResize = function(evt,shape,which) {
this._mouseTarget = shape;
this._currOperation = 'resize';
this._sizingHandle = which;
this._isMoved = false;
var currZoom = this.zoom;
var size = shape.getSizeAbsolute();
this._deltaX = size.x - (evt.clientX * (100/currZoom));
this._deltaY = size.y - (evt.clientY * (100/currZoom));
this._startX = size.x;
this._startY = size.y;
this.svgRoot.addEventListener('mousemove',this._mmHandler,false);
this.svgRoot.addEventListener('mouseup',this._muHandler,false);
}

self._ZEN_SVGComponent_svgFrame_svgLoadHandler = function(win) {
var doc = this.getSVGDocument();
try {if (this.document==doc) return;} catch (ex) {}
this.document = doc;
this.svgWindow = win;
this.renderSVG(this.document,null);
this.svgBackground.addEventListener('mousedown',new Function('evt','return zenPage.getComponent('+this.index+').mousedownHandler(evt);'),false);
this.svgRoot.addEventListener('DOMMouseScroll', new Function('evt','return zenPage.getComponent('+this.index+').mousewheelHandler(evt);'), false);
this._mmHandler = new Function('evt','return zenPage.getComponent('+this.index+').mousemoveHandler(evt);');
this._muHandler = new Function('evt','return zenPage.getComponent('+this.index+').mouseupHandler(evt);');
this._mouseTarget = null;
this._currOperation = null;
this._isMoved = false;
this._deltaX = 0;
this._deltaY = 0;
this._startX = 0;
this._startY = 0;
this._runtimeEditMode = 'none';
var mode = this.editMode;
this.editMode = '';
this.setEditMode(mode);
if (this.zoom != 100) {
this.setProperty('zoom',this.zoom);
}
}

self._ZEN_SVGComponent_svgFrame_updateScalingGroup = function() {
if (this.svgBackground) {
var rect = this.svgBackground;
rect.setAttribute('x',-this.offsetX);
rect.setAttribute('y',-this.offsetY);
}
if (this.document) {
var scale = this.document.getElementById('zenScalingGroup');
if (scale) {
var xform = '';
if (this.zoom != 100) {
xform = xform + ' scale(' + parseFloat(this.zoom)/100 + ')';
}
if (this.offsetX != 0 || this.offsetY != 0) {
xform = xform + ' translate(' + parseFloat(this.offsetX) + ', ' + parseFloat(this.offsetY) + ')';
}
scale.setAttribute('transform',xform);
}
}
}

self._ZEN_SVGComponent_svgFrame_zoomIn = function(x,y) {
x = (null == x) ? this.width / 2 : x;
y = (null == y) ? this.height / 2 : y;
var newZoom = -1;
var currZoom = parseFloat(this.zoom);
var zooms = this.zoomLevels.split(',');
for (var z = 0; z < zooms.length; z++) {
if (parseFloat(zooms[z]) > currZoom) {
newZoom = parseFloat(zooms[z]);
this._zoomIndex = z;
break;
}
}
if (newZoom == -1) {
newZoom = parseFloat(zooms[zooms.length-1]);
this._zoomIndex = zooms.length-1;
}
if (this.dragCanvas) {
var deltaX = (x * (100/this.zoom)) - (x * (100/newZoom));
var deltaY = (y * (100/this.zoom)) - (y * (100/newZoom));
this.offsetX = parseFloat(this.offsetX) - parseFloat(deltaX);
this.offsetY = parseFloat(this.offsetY) - parseFloat(deltaY);
}
this.setZoom(newZoom);
}

self._ZEN_SVGComponent_svgFrame_zoomOut = function(x,y) {
x = (null == x) ? this.width / 2 : x;
y = (null == y) ? this.height / 2 : y;
var newZoom = -1;
var currZoom = parseFloat(this.zoom);
var zooms = this.zoomLevels.split(',');
for (var z = zooms.length - 1; z >= 0; z--) {
if (parseFloat(zooms[z]) < currZoom) {
newZoom = parseFloat(zooms[z]);
this._zoomIndex = z;
break;
}
}
if (newZoom == -1) {
newZoom = parseFloat(zooms[0]);
this._zoomIndex = 0;
}
if (this.dragCanvas) {
var deltaX = (x * (100/this.zoom)) - (x * (100/newZoom));
var deltaY = (y * (100/this.zoom)) - (y * (100/newZoom));
this.offsetX = parseFloat(this.offsetX) - parseFloat(deltaX);
this.offsetY = parseFloat(this.offsetY) - parseFloat(deltaY);
}
this.setZoom(newZoom);
}

self._ZEN_SVGComponent_svgFrame_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_SVGComponent_svgFrame__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_ZEN_SVGComponent_svgFrame.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _ZEN_SVGComponent_svgFrame.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_svgFrame;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.svgFrame';
	p._type = 'svgFrame';
	p.serialize = _ZEN_SVGComponent_svgFrame_serialize;
	p.getSettings = _ZEN_SVGComponent_svgFrame_getSettings;
	p.ReallyRefreshContents = _ZEN_SVGComponent_svgFrame_ReallyRefreshContents;
	p.addChild = _ZEN_SVGComponent_svgFrame_addChild;
	p.canDragShapes = _ZEN_SVGComponent_svgFrame_canDragShapes;
	p.getSVGDocument = _ZEN_SVGComponent_svgFrame_getSVGDocument;
	p.getSelectedItem = _ZEN_SVGComponent_svgFrame_getSelectedItem;
	p.getSelectedItems = _ZEN_SVGComponent_svgFrame_getSelectedItems;
	p.getZoomIndex = _ZEN_SVGComponent_svgFrame_getZoomIndex;
	p.isSelected = _ZEN_SVGComponent_svgFrame_isSelected;
	p.layoutChildren = _ZEN_SVGComponent_svgFrame_layoutChildren;
	p.mousedownHandler = _ZEN_SVGComponent_svgFrame_mousedownHandler;
	p.mousemoveHandler = _ZEN_SVGComponent_svgFrame_mousemoveHandler;
	p.mouseupHandler = _ZEN_SVGComponent_svgFrame_mouseupHandler;
	p.mousewheelHandler = _ZEN_SVGComponent_svgFrame_mousewheelHandler;
	p.moveItem = _ZEN_SVGComponent_svgFrame_moveItem;
	p.onloadHandler = _ZEN_SVGComponent_svgFrame_onloadHandler;
	p.removeChild = _ZEN_SVGComponent_svgFrame_removeChild;
	p.renderSVG = _ZEN_SVGComponent_svgFrame_renderSVG;
	p.selectItem = _ZEN_SVGComponent_svgFrame_selectItem;
	p.setBoundingBox = _ZEN_SVGComponent_svgFrame_setBoundingBox;
	p.setEditMode = _ZEN_SVGComponent_svgFrame_setEditMode;
	p.setFrameSize = _ZEN_SVGComponent_svgFrame_setFrameSize;
	p.setOffsets = _ZEN_SVGComponent_svgFrame_setOffsets;
	p.setOverlayMode = _ZEN_SVGComponent_svgFrame_setOverlayMode;
	p.setProperty = _ZEN_SVGComponent_svgFrame_setProperty;
	p.setPropertyAll = _ZEN_SVGComponent_svgFrame_setPropertyAll;
	p.setZoom = _ZEN_SVGComponent_svgFrame_setZoom;
	p.setZoomIndex = _ZEN_SVGComponent_svgFrame_setZoomIndex;
	p.startDragCanvas = _ZEN_SVGComponent_svgFrame_startDragCanvas;
	p.startMove = _ZEN_SVGComponent_svgFrame_startMove;
	p.startResize = _ZEN_SVGComponent_svgFrame_startResize;
	p.svgLoadHandler = _ZEN_SVGComponent_svgFrame_svgLoadHandler;
	p.updateScalingGroup = _ZEN_SVGComponent_svgFrame_updateScalingGroup;
	p.zoomIn = _ZEN_SVGComponent_svgFrame_zoomIn;
	p.zoomOut = _ZEN_SVGComponent_svgFrame_zoomOut;
}

self._zenClassIdx['svgGroup'] = '_ZEN_SVGComponent_svgGroup';
self._ZEN_SVGComponent_svgGroup = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_svgGroup__init(this,index,id);}
}

self._ZEN_SVGComponent_svgGroup__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_svgComponent__init) ?zenMaster._ZEN_SVGComponent_svgComponent__init(o,index,id):_ZEN_SVGComponent_svgComponent__init(o,index,id);
	o.children = new Array();
	o.disabled = false;
	o.layout = '';
}
function _ZEN_SVGComponent_svgGroup_serialize(set,s)
{
	var o = this;s[0]='431160643';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.aux;s[7]=(o.boundless?1:0);s[8]=set.serializeList(o,o.children,true,'children');s[9]=(o.disabled?1:0);s[10]=o.height;s[11]=(o.hidden?1:0);s[12]=o.layout;s[13]=o.onclick;s[14]=o.onupdate;s[15]=o.position;s[16]=o.preserveAspectRatio;s[17]=o.renderFlag;s[18]=o.tuple;s[19]=o.viewBoxHeight;s[20]=o.viewBoxWidth;s[21]=(o.visible?1:0);s[22]=o.width;s[23]=o.x;s[24]=o.y;
}
function _ZEN_SVGComponent_svgGroup_getSettings(s)
{
	s['name'] = 'string';
	s['disabled'] = 'boolean';
	s['layout'] = 'enum:vertical,horizontal,flow,none';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_svgGroup_addChild = function(component) {
zenASSERT(component && zenIsComponent(component),'Invalid component',arguments);
if (!component.isOfType('svgComponent')) {
alert('Only SVG components can be added to svg groups');
return;
}
this.children[this.children.length] = component;
component.parent = this;
if (this.document && this.svgGroup) {
component.renderSVG(this.document,this.svgGroup);
}
}

self._ZEN_SVGComponent_svgGroup_layoutChildren = function() {
var height = 0;
var width = 0;
switch(this.layout) {
case 'vertical':
var x=0,y=0;
for (var n = 0; n < this.children.length; n++) {
var child = this.children[n];
if ('relative' == child.position && !child.hidden) {
child.setPosition(x,y);
if (child.layoutChildren) {
child.layoutChildren();
}
y += parseInt(child.height,10);
width = (parseInt(child.width,10) > width) ? parseInt(child.width,10) : width;
}
}
height = y;
break;
case 'horizontal':
var x=0,y=0;
for (var n = 0; n < this.children.length; n++) {
var child = this.children[n];
if ('relative' == child.position && !child.hidden) {
child.setPosition(x,y);
if (child.layoutChildren) {
child.layoutChildren();
}
x += parseInt(child.width,10);
height = (parseInt(child.height,10) > height) ? parseInt(child.height,10) : height;
}
}
width = x;
break;
case 'flow':
var flowWidth = this.width;
var x=0,y=0;
for (var n = 0; n < this.children.length; n++) {
var child = this.children[n];
if ('relative' == child.position && !child.hidden) {
child.setPosition(x,y);
if (child.layoutChildren) {
child.layoutChildren();
}
var cw = parseInt(child.width,10);
if (x > 0 && (x+cw) > flowWidth) {
x = 0;
y = height;
child.setPosition(x,y);
if (child.layoutChildren) {
child.layoutChildren();
}
cw = parseInt(child.width,10);
}
x += cw;
height = ((y + parseInt(child.height,10)) > height) ? (y+parseInt(child.height,10)) : height;
width = (x > width) ? x : width;
}
}
break;
case 'none':
default:
for (var n = 0; n < this.children.length; n++) {
var child = this.children[n];
if ('relative' == child.position && !child.hidden) {
child.setPosition(child.x,child.y);
if (child.layoutChildren) {
child.layoutChildren();
}
width = ((parseInt(child.x,10)+parseInt(child.width,10)) > width) ? parseInt(child.width,10)+parseInt(child.x,10) : width;
height = ((parseInt(child.y,10)+parseInt(child.height,10)) > height) ? parseInt(child.height,10)+parseInt(child.y,10) : height;
}
}
break;
}
if (this.setBoundingBox) {
this.setBoundingBox(width, height);
}
}

self._ZEN_SVGComponent_svgGroup_removeChild = function(component) {
zenPage.deleteComponent(component);
}

self._ZEN_SVGComponent_svgGroup_renderSVG = function(document,parent) {
this.document = document;
if (null == parent) {
this.svgRoot = this.document.getElementById('zenRoot');
this.svgGroup = this.document.getElementById('zenCanvas');
var rect = this.document.createElementNS(SVGNS,'rect');
rect.setAttribute('id','zenBackground');
rect.setAttribute('x',0);
rect.setAttribute('y',0);
rect.setAttribute('width','100%');
rect.setAttribute('height','100%');
if (null != this.backgroundStyle) {
rect.setAttribute('style',this.backgroundStyle);
}
this.svgGroup.insertBefore(rect, this.svgGroup.firstChild);
this.svgBackground = rect;
}
else {
this.createEnclosingGroup(parent);
}
for (var n = 0; n < this.children.length; n++) {
var child = this.children[n];
child.renderSVG(this.document,this.svgGroup);
}
this.layoutChildren();
}

self._ZEN_SVGComponent_svgGroup_setBoundingBox = function(width,height) {
width = parseInt(width,10);
height = parseInt(height,10);
if (width != this.width || height != this.height) {
this.setSize(width,height);
this.parent.layoutChildren();
}
}

self._ZEN_SVGComponent_svgGroup_setOverlayMode = function(mode) {
this.overlayMode = mode;
for (var n = 0; n < this.children.length; n++) {
this.children[n].setOverlayMode(mode);
}
}

self._ZEN_SVGComponent_svgGroup_setProperty = function(property,value,value2) {
switch(property) {
case 'layout':
if (this.layout != value) {
this.layout = value;
this.layoutChildren();
}
break;
case 'width':
case 'height':
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_SVGComponent_svgGroup_setPropertyAll = function(property,value,value2) {
if ('disabled' == property) return;
this.setProperty(property, value, value2);
for (var n = 0; n < this.children.length; n++) {
var child = this.children[n];
if (child.setPropertyAll) {
child.setPropertyAll(property,value,value2);
}
else {
child.setProperty(property,value,value2);
}
}
}
self._ZEN_SVGComponent_svgGroup__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_svgComponent');
	_ZEN_SVGComponent_svgGroup.prototype = zenCreate('_ZEN_SVGComponent_svgComponent',-1);
	var p = _ZEN_SVGComponent_svgGroup.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_svgGroup;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_svgComponent) ? zenMaster._ZEN_SVGComponent_svgComponent.prototype:_ZEN_SVGComponent_svgComponent.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.svgGroup';
	p._type = 'svgGroup';
	p.serialize = _ZEN_SVGComponent_svgGroup_serialize;
	p.getSettings = _ZEN_SVGComponent_svgGroup_getSettings;
	p.addChild = _ZEN_SVGComponent_svgGroup_addChild;
	p.layoutChildren = _ZEN_SVGComponent_svgGroup_layoutChildren;
	p.removeChild = _ZEN_SVGComponent_svgGroup_removeChild;
	p.renderSVG = _ZEN_SVGComponent_svgGroup_renderSVG;
	p.setBoundingBox = _ZEN_SVGComponent_svgGroup_setBoundingBox;
	p.setOverlayMode = _ZEN_SVGComponent_svgGroup_setOverlayMode;
	p.setProperty = _ZEN_SVGComponent_svgGroup_setProperty;
	p.setPropertyAll = _ZEN_SVGComponent_svgGroup_setPropertyAll;
}

self._zenClassIdx['svgSpacer'] = '_ZEN_SVGComponent_svgSpacer';
self._ZEN_SVGComponent_svgSpacer = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_svgSpacer__init(this,index,id);}
}

self._ZEN_SVGComponent_svgSpacer__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_svgComponent__init) ?zenMaster._ZEN_SVGComponent_svgComponent__init(o,index,id):_ZEN_SVGComponent_svgComponent__init(o,index,id);
}
function _ZEN_SVGComponent_svgSpacer_serialize(set,s)
{
	var o = this;s[0]='1175723986';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.aux;s[7]=(o.boundless?1:0);s[8]=o.height;s[9]=(o.hidden?1:0);s[10]=o.onclick;s[11]=o.onupdate;s[12]=o.position;s[13]=o.preserveAspectRatio;s[14]=o.renderFlag;s[15]=o.tuple;s[16]=o.viewBoxHeight;s[17]=o.viewBoxWidth;s[18]=(o.visible?1:0);s[19]=o.width;s[20]=o.x;s[21]=o.y;
}
function _ZEN_SVGComponent_svgSpacer_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}
self._ZEN_SVGComponent_svgSpacer__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_svgComponent');
	_ZEN_SVGComponent_svgSpacer.prototype = zenCreate('_ZEN_SVGComponent_svgComponent',-1);
	var p = _ZEN_SVGComponent_svgSpacer.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_svgSpacer;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_svgComponent) ? zenMaster._ZEN_SVGComponent_svgComponent.prototype:_ZEN_SVGComponent_svgComponent.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.svgSpacer';
	p._type = 'svgSpacer';
	p.serialize = _ZEN_SVGComponent_svgSpacer_serialize;
	p.getSettings = _ZEN_SVGComponent_svgSpacer_getSettings;
}

self._zenClassIdx['tabBar'] = '_ZEN_SVGComponent_tabBar';
self._ZEN_SVGComponent_tabBar = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_tabBar__init(this,index,id);}
}

self._ZEN_SVGComponent_tabBar__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_svgComponent__init) ?zenMaster._ZEN_SVGComponent_svgComponent__init(o,index,id):_ZEN_SVGComponent_svgComponent__init(o,index,id);
	o.dynamic = false;
	o.height = '32';
	o.maxOneTabWidth = '200';
	o.onChange = '';
	o.onDeleteTab = '';
	o.onNewTab = '';
	o.selectedIndex = '0';
	o.tabCaptions = '';
}
function _ZEN_SVGComponent_tabBar_serialize(set,s)
{
	var o = this;s[0]='2227676173';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.aux;s[7]=(o.boundless?1:0);s[8]=(o.dynamic?1:0);s[9]=o.height;s[10]=(o.hidden?1:0);s[11]=o.maxOneTabWidth;s[12]=o.onChange;s[13]=o.onDeleteTab;s[14]=o.onNewTab;s[15]=o.onclick;s[16]=o.onupdate;s[17]=o.position;s[18]=o.preserveAspectRatio;s[19]=o.renderFlag;s[20]=o.selectedIndex;s[21]=o.tabCaptions;s[22]=o.tuple;s[23]=o.viewBoxHeight;s[24]=o.viewBoxWidth;s[25]=(o.visible?1:0);s[26]=o.width;s[27]=o.x;s[28]=o.y;
}
function _ZEN_SVGComponent_tabBar_getSettings(s)
{
	s['name'] = 'string';
	s['dynamic'] = 'boolean';
	s['height'] = 'length';
	s['maxOneTabWidth'] = 'integer';
	s['onChange'] = 'eventHandler';
	s['onDeleteTab'] = 'eventHandler';
	s['onNewTab'] = 'eventHandler';
	s['selectedIndex'] = 'integer';
	s['tabCaptions'] = 'caption';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_tabBar_buttonDeleteClicked = function(index) {
var delimiter = this.tabCaptions.substr(0,1);
var array = this.tabCaptions.substr(1).split(delimiter);
var caption = array.splice(index,1);
this.tabCaptions = delimiter + array.join(delimiter);
if ( this.selectedIndex>=array.length ) { this.selectedIndex = array.length-1; }
this.drawTabs();
this.skipTabClicked = true;
;
var callbackHandler = this.onDeleteTab;
if ( callbackHandler.substr(0,7) != "return " ) { callbackHandler = "return " + callbackHandler; }
zenInvokeCallbackMethod(callbackHandler,this,"onDeleteTab","index",index,"caption",caption);
;
return;
}

self._ZEN_SVGComponent_tabBar_buttonMouseOut = function(index) {
if ( index == this.selectedIndex ) {
this.document.getElementById(this.makeId("dot-"+index)).setAttribute("class","tabBarButtonDotFront");
} else {
this.document.getElementById(this.makeId("dot-"+index)).setAttribute("class","tabBarButtonDotBack");
}
this.document.getElementById(this.makeId("lineA-"+index)).setAttribute("class","tabBarButtonFore");
this.document.getElementById(this.makeId("lineB-"+index)).setAttribute("class","tabBarButtonFore");
return;
}

self._ZEN_SVGComponent_tabBar_buttonMouseOver = function(index) {
this.document.getElementById(this.makeId("dot-"+index)).setAttribute("class","tabBarButtonDotHover");
this.document.getElementById(this.makeId("lineA-"+index)).setAttribute("class","tabBarButtonForeHover");
this.document.getElementById(this.makeId("lineB-"+index)).setAttribute("class","tabBarButtonForeHover");
return;
}

self._ZEN_SVGComponent_tabBar_buttonNewClicked = function(index) {
var delimiter = this.tabCaptions.substr(0,1);
var array = this.tabCaptions.substr(1).split(delimiter);
array.splice(array.length,0,$$$Text("New Tab"));
this.tabCaptions = delimiter + array.join(delimiter);
this.drawTabs();
;
var callbackHandler = this.onNewTab;
if ( callbackHandler.substr(0,7) != "return " ) { callbackHandler = "return " + callbackHandler; }
zenInvokeCallbackMethod(callbackHandler,this,"onNewTab","index",index);
;
return;
}

self._ZEN_SVGComponent_tabBar_drawOneTab = function(index,tabWidth,isActive) {
var tabDataArray = this.tabCaptions.substr(1).split(this.tabCaptions.substr(0,1));
var TABAREAHEIGHT = parseInt(this.height);
var TABHEIGHT = TABAREAHEIGHT*0.8;			// height of the individual tabs
var TABRADIUS = TABAREAHEIGHT;				// the radius of the tab side curve
var TABTOPREDUCTION = TABAREAHEIGHT*0.8;	// The amout the tab top width is smaller than the bottom width
var TABTEXTMARGIN = TABAREAHEIGHT*0.5;		// the margin of tha tab text
var TABOVERLAP = TABAREAHEIGHT*0.4;			// the amount the top tab covers the bottom tab
if ( index<0 ) return;
if ( index>tabDataArray.length ) return;
var name = tabDataArray[index];
var caption = name;
var x = index*(tabWidth-TABOVERLAP);
var buttonWidth = this.dynamic?TABHEIGHT:0;
var group = this.document.createElementNS(SVGNS,"g");
group.setAttribute("onclick","zenPage.getComponent("+this.index+").tabClicked("+index+");");
this.svgGroup.appendChild(group);
var path = this.document.createElementNS(SVGNS,"path");
if ( isActive ) {
path.setAttribute("class","tabBarFrontTab");
} else {
path.setAttribute("class","tabBarBackTabs");
}
d = "M " + x + " " + (TABAREAHEIGHT);
d = d + " A " + TABRADIUS + " " + TABRADIUS + " 0 0 0 " + (x+(TABTOPREDUCTION)/4) + " " + (TABAREAHEIGHT-TABHEIGHT/2);
d = d + " A " + TABRADIUS + " " + TABRADIUS + " 1 0 1 " + (x+(TABTOPREDUCTION)/2) + " " + (TABAREAHEIGHT-TABHEIGHT);
d = d + " h " + (tabWidth-TABTOPREDUCTION);
d = d + " A " + TABRADIUS + " " + TABRADIUS + " 1 0 1 " + (x+tabWidth-(TABTOPREDUCTION)/4) + " " + (TABAREAHEIGHT-TABHEIGHT/2);
d = d + " A " + TABRADIUS + " " + TABRADIUS + " 0 0 0 " + (x+tabWidth) + " " + (TABAREAHEIGHT);
path.setAttribute("d",d);
group.appendChild(path);
var textValue = this.document.createElementNS(SVGNS,"text");
textValue.setAttribute("class","tabBarCaption");
textValue.appendChild(this.document.createTextNode(caption));
group.appendChild(textValue);
textValue.setAttribute("x",x+TABTEXTMARGIN);
var bboxHeight = 0;
try { bboxHeight = textValue.getBBox().height; } catch(err) {}
textValue.setAttribute("y",TABAREAHEIGHT-(TABHEIGHT/2)+(bboxHeight/2)-3);
var clipRect = this.document.getElementById("clipRect_"+(index+1));
if ( clipRect == null ) {
var clipDefs = this.document.createElementNS(SVGNS,"defs");
var clipPath = this.document.createElementNS(SVGNS,"clipPath");
clipPath.setAttribute("id","clipPath_"+(index+1));
clipRect = this.document.createElementNS(SVGNS,"rect");
clipRect.setAttribute("id","clipRect_"+(index+1));
clipPath.appendChild(clipRect);
clipDefs.appendChild(clipPath);
this.svgGroup.appendChild(clipDefs);
}
clipRect.setAttribute("x",x+TABTEXTMARGIN);
clipRect.setAttribute("y",TABAREAHEIGHT-TABHEIGHT);
clipRect.setAttribute("height",TABHEIGHT);
clipRect.setAttribute("width",Math.max(tabWidth-TABTEXTMARGIN*2-buttonWidth*3/4, 0));
textValue.setAttribute("clip-path","url(#clipPath_"+(index+1)+")");
if ( this.dynamic &&  tabDataArray.length>1 ) {
var cx = x+tabWidth-TABTEXTMARGIN/2-buttonWidth/2;
var cy = TABAREAHEIGHT-TABHEIGHT/2;
var dot = this.document.createElementNS(SVGNS,"circle");
dot.setAttribute("cx",cx);
dot.setAttribute("cy",cy);
dot.setAttribute("r",buttonWidth/4);
dot.setAttribute("id",this.makeId("dot-"+index))
if ( isActive ) {
dot.setAttribute("class","tabBarButtonDotFront");
} else {
dot.setAttribute("class","tabBarButtonDotBack");
}
group.appendChild(dot);
var line = this.document.createElementNS(SVGNS,"line");
line.setAttribute("x1",cx-buttonWidth/8);
line.setAttribute("y1",cy-buttonWidth/8);
line.setAttribute("x2",cx+buttonWidth/8);
line.setAttribute("y2",cy+buttonWidth/8);
line.setAttribute("id",this.makeId("lineA-"+index))
line.setAttribute("class","tabBarButtonFore");
group.appendChild(line);
var line = this.document.createElementNS(SVGNS,"line");
line.setAttribute("x1",cx-buttonWidth/8);
line.setAttribute("y1",cy+buttonWidth/8);
line.setAttribute("x2",cx+buttonWidth/8);
line.setAttribute("y2",cy-buttonWidth/8);
line.setAttribute("id",this.makeId("lineB-"+index))
line.setAttribute("class","tabBarButtonFore");
group.appendChild(line);
var dot = this.document.createElementNS(SVGNS,"circle");
dot.setAttribute("cx",cx);
dot.setAttribute("cy",cy);
dot.setAttribute("r",buttonWidth/4);
dot.setAttribute("style","opacity:0.01");
dot.setAttribute("onmouseover","zenPage.getComponent("+this.index+").buttonMouseOver("+index+");");
dot.setAttribute("onmouseout","zenPage.getComponent("+this.index+").buttonMouseOut("+index+");");
dot.setAttribute("onclick","zenPage.getComponent("+this.index+").buttonDeleteClicked("+index+");");
group.appendChild(dot);
}
return;
}

self._ZEN_SVGComponent_tabBar_drawPlus = function(tabWidth) {
var tabDataArray = this.tabCaptions.substr(1).split(this.tabCaptions.substr(0,1));
var TABAREAHEIGHT = parseInt(this.height);
var TABHEIGHT = TABAREAHEIGHT*0.8;			// height of the individual tabs
var TABRADIUS = TABAREAHEIGHT;				// the radius of the tab side curve
var TABTOPREDUCTION = TABAREAHEIGHT*0.8;	// The amout the tab top width is smaller than the bottom width
var TABTEXTMARGIN = TABAREAHEIGHT*0.5;		// the margin of tha tab text
var TABOVERLAP = TABAREAHEIGHT*0.4;			// the amount the top tab covers the bottom tab
var index = tabDataArray.length;
var x = index*(tabWidth-TABOVERLAP);
var buttonWidth = TABHEIGHT;
var group = this.document.createElementNS(SVGNS,"g");
this.svgGroup.appendChild(group);
if ( this.dynamic ) {
var cx = x+TABTEXTMARGIN/2+buttonWidth/2;
var cy = TABAREAHEIGHT-TABHEIGHT/2;
var dot = this.document.createElementNS(SVGNS,"circle");
dot.setAttribute("cx",cx);
dot.setAttribute("cy",cy);
dot.setAttribute("r",buttonWidth/4);
dot.setAttribute("id",this.makeId("dot-"+index))
dot.setAttribute("class","tabBarButtonDotBack");
group.appendChild(dot);
var line = this.document.createElementNS(SVGNS,"line");
line.setAttribute("x1",cx-buttonWidth/8);
line.setAttribute("y1",cy);
line.setAttribute("x2",cx+buttonWidth/8);
line.setAttribute("y2",cy);
line.setAttribute("id",this.makeId("lineA-"+index))
line.setAttribute("class","tabBarButtonFore");
group.appendChild(line);
var line = this.document.createElementNS(SVGNS,"line");
line.setAttribute("x1",cx);
line.setAttribute("y1",cy-buttonWidth/8);
line.setAttribute("x2",cx);
line.setAttribute("y2",cy+buttonWidth/8);
line.setAttribute("id",this.makeId("lineB-"+index))
line.setAttribute("class","tabBarButtonFore");
group.appendChild(line);
var dot = this.document.createElementNS(SVGNS,"circle");
dot.setAttribute("cx",cx);
dot.setAttribute("cy",cy);
dot.setAttribute("r",buttonWidth/4);
dot.setAttribute("style","opacity:0.01");
dot.setAttribute("onmouseover","zenPage.getComponent("+this.index+").buttonMouseOver("+index+");");
dot.setAttribute("onmouseout","zenPage.getComponent("+this.index+").buttonMouseOut("+index+");");
dot.setAttribute("onclick","zenPage.getComponent("+this.index+").buttonNewClicked("+index+");");
group.appendChild(dot);
}
return;
}

self._ZEN_SVGComponent_tabBar_drawTabs = function() {
var tabDataArray = this.tabCaptions.substr(1).split(this.tabCaptions.substr(0,1));
var TABAREAHEIGHT = parseInt(this.height);
var TABOVERLAP = TABAREAHEIGHT*0.4;
var tabCount = tabDataArray.length;
var tabWidth = Math.min((this.width-100+(tabCount-1)*TABOVERLAP)/tabCount,this.maxOneTabWidth);
if ( !this.svgGroup ) { return; }
for ( var child = this.svgGroup.firstChild; child != null ; child = this.svgGroup.firstChild ) {
this.svgGroup.removeChild(child);
}
var rect = this.document.createElementNS(SVGNS,"rect");
rect.setAttribute("x",0);
rect.setAttribute("y",0);
rect.setAttribute("width",this.width);
rect.setAttribute("height",TABAREAHEIGHT);
rect.setAttribute("class","tabBarBackground");
this.svgGroup.appendChild(rect);
this.selectedIndex = parseInt(this.selectedIndex);
for ( var i=0 ; i<this.selectedIndex ; i++ ) {
this.drawOneTab(i,tabWidth,false);
}
for ( var i=tabDataArray.length-1 ; i>this.selectedIndex ; i-- ) {
this.drawOneTab(i,tabWidth,false);
}
this.drawOneTab(this.selectedIndex,tabWidth,true);
if ( this.dynamic ) {
this.drawPlus(tabWidth);
}
var line = this.document.createElementNS(SVGNS,"line");
line.setAttribute("x1",0);
line.setAttribute("y1",TABAREAHEIGHT);
line.setAttribute("x2",(this.selectedIndex)*(tabWidth-TABOVERLAP));
line.setAttribute("y2",TABAREAHEIGHT);
line.setAttribute("class","tabBarBaseline");
this.svgGroup.appendChild(line);
var line = this.document.createElementNS(SVGNS,"line");
line.setAttribute("x1",(this.selectedIndex)*(tabWidth-TABOVERLAP)+tabWidth);
line.setAttribute("y1",TABAREAHEIGHT);
line.setAttribute("x2",this.width);
line.setAttribute("y2",TABAREAHEIGHT);
line.setAttribute("class","tabBarBaseline");
this.svgGroup.appendChild(line);
return;
}

self._ZEN_SVGComponent_tabBar_renderContents = function() {
this.drawTabs();
}

self._ZEN_SVGComponent_tabBar_setProperty = function(property,value,value2) {
var value = this.invokeSuper("setProperty",arguments);
this.drawTabs();
return value;
}

self._ZEN_SVGComponent_tabBar_tabClicked = function(index) {
var skipTabClick = this.skipTabClicked
this.skipTabClicked = false;
if ( skipTabClick ) { return; }
;
this.selectedIndex = index;
this.drawTabs();
;
var callbackHandler = this.onChange;
if ( callbackHandler.substr(0,7) != "return " ) { callbackHandler = "return " + callbackHandler; }
zenInvokeCallbackMethod(callbackHandler,this,"onChange","index",index);
;
return;
}
self._ZEN_SVGComponent_tabBar__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_svgComponent');
	_ZEN_SVGComponent_tabBar.prototype = zenCreate('_ZEN_SVGComponent_svgComponent',-1);
	var p = _ZEN_SVGComponent_tabBar.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_tabBar;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_svgComponent) ? zenMaster._ZEN_SVGComponent_svgComponent.prototype:_ZEN_SVGComponent_svgComponent.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.tabBar';
	p._type = 'tabBar';
	p.serialize = _ZEN_SVGComponent_tabBar_serialize;
	p.getSettings = _ZEN_SVGComponent_tabBar_getSettings;
	p.buttonDeleteClicked = _ZEN_SVGComponent_tabBar_buttonDeleteClicked;
	p.buttonMouseOut = _ZEN_SVGComponent_tabBar_buttonMouseOut;
	p.buttonMouseOver = _ZEN_SVGComponent_tabBar_buttonMouseOver;
	p.buttonNewClicked = _ZEN_SVGComponent_tabBar_buttonNewClicked;
	p.drawOneTab = _ZEN_SVGComponent_tabBar_drawOneTab;
	p.drawPlus = _ZEN_SVGComponent_tabBar_drawPlus;
	p.drawTabs = _ZEN_SVGComponent_tabBar_drawTabs;
	p.renderContents = _ZEN_SVGComponent_tabBar_renderContents;
	p.setProperty = _ZEN_SVGComponent_tabBar_setProperty;
	p.tabClicked = _ZEN_SVGComponent_tabBar_tabClicked;
}

self._zenClassIdx['timeLine'] = '_ZEN_SVGComponent_timeLine';
self._ZEN_SVGComponent_timeLine = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_timeLine__init(this,index,id);}
}

self._ZEN_SVGComponent_timeLine__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_svgComponent__init) ?zenMaster._ZEN_SVGComponent_svgComponent__init(o,index,id):_ZEN_SVGComponent_svgComponent__init(o,index,id);
	o.birthDate = '';
	o.dateFormat = 'YMD';
	o.endTime = '';
	o.marginLeft = '20';
	o.marginRight = '20';
	o.ongetdata = '';
	o.onrenderitem = '';
	o.onselect = '';
	o.selectedId = '';
	o.spanHeight = '20';
	o.startTime = '';
	o.title = '';
}
function _ZEN_SVGComponent_timeLine_serialize(set,s)
{
	var o = this;s[0]='149681120';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.aux;s[7]=o.birthDate;s[8]=(o.boundless?1:0);s[9]=o.dateFormat;s[10]=o.endTime;s[11]=o.height;s[12]=(o.hidden?1:0);s[13]=o.marginLeft;s[14]=o.marginRight;s[15]=o.onclick;s[16]=o.ongetdata;s[17]=o.onrenderitem;s[18]=o.onselect;s[19]=o.onupdate;s[20]=o.position;s[21]=o.preserveAspectRatio;s[22]=o.renderFlag;s[23]=o.selectedId;s[24]=o.spanHeight;s[25]=o.startTime;s[26]=o.title;s[27]=o.tuple;s[28]=o.viewBoxHeight;s[29]=o.viewBoxWidth;s[30]=(o.visible?1:0);s[31]=o.width;s[32]=o.x;s[33]=o.y;
}
function _ZEN_SVGComponent_timeLine_getSettings(s)
{
	s['name'] = 'string';
	s['birthDate'] = 'string';
	s['dateFormat'] = 'enum:MDY,DMY,YMD';
	s['endTime'] = 'string';
	s['marginLeft'] = 'integer';
	s['marginRight'] = 'integer';
	s['ongetdata'] = 'eventHandler';
	s['onrenderitem'] = 'eventHandler';
	s['onselect'] = 'eventHandler';
	s['selectedId'] = 'string';
	s['spanHeight'] = 'integer';
	s['startTime'] = 'string';
	s['title'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_timeLine_computeAge = function(birthDate,currDate) {
var currYear = currDate.getFullYear() ;
var currMonth = currDate.getMonth();
var currDay = currDate.getDate();
var bYear = birthDate.getFullYear() ;
var bMonth = birthDate.getMonth();
var bDay = birthDate.getDate();
var ageYears = currYear - bYear;
var ageMonths = 0;
var ageDays = 0;
var year = currYear;
var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
if ((year%4==0) && !(year%100==0 && year%400!=0)) {
daysInMonth[1] = 29;
}
var dim = daysInMonth[currMonth>0?currMonth-1:11];
if (currMonth == bMonth) {
if (currDay == bDay) {
}
else if (currDay < bDay) {
ageYears--;
ageDays = (dim+currDay) - bDay;
}
else {
ageDays = currDay - bDay;
}
}
else if (currMonth < bMonth) {
ageYears--;
ageMonths = (currMonth+12) - bMonth;
if (currDay == bDay) {
}
else if (currDay < bDay) {
ageMonths--;
ageDays = (dim+currDay) - bDay;
}
else {
ageDays = currDay - bDay;
}
}
else {
ageMonths = currMonth - bMonth;
if (currDay == bDay) {
}
else if (currDay < bDay) {
ageMonths--;
ageDays = (dim+currDay) - bDay;
}
else {
ageDays = currDay - bDay;
}
}
return {years:ageYears, months:ageMonths, days: ageDays};
}

self._ZEN_SVGComponent_timeLine_dragThumb = function(evt) {
evt.preventDefault();
evt.stopPropagation();
if (this.disabled) return;
switch (evt.type) {
case 'mousedown':
this.document.documentElement.addEventListener('mousemove',this._dragThumbFunc,false);
this.document.documentElement.addEventListener('mouseup',this._dragThumbFunc,false);
var size = this.getSizeAbsolute();
var ty = size.y + this._thumbPos;
this._deltaY = ty - evt.clientY;
this._startY = ty;
this._inDrag = true;
break;
case 'mousemove':
case 'mouseup':
var size = this.getSizeAbsolute();
var ty = size.y + this._thumbPos;
var dy = evt.clientY + this._deltaY - ty;
if (Math.abs(dy) >= 1) {
var thumb = this.findSVGElement('thumb');
var y = this._thumbPos+dy-this._thumbOffset;
y = y>this._thumbMax ? this._thumbMax : y;
y = y<this._thumbMin ? this._thumbMin : y;
thumb.setAttribute('y',y + this._thumbOffset);
this._yScroll = y * this._thumbScale;
var slideGroup = this.findSVGElement('dataSlideGroup');
if (slideGroup) {
var xOffset = zenGet(this._xOffset,0);
slideGroup.setAttribute('transform','translate('+xOffset+','+(-this._yScroll)+')');
}
}
if ('mouseup' == evt.type) {
this.document.documentElement.removeEventListener('mousemove',this._dragThumbFunc,false);
this.document.documentElement.removeEventListener('mouseup',this._dragThumbFunc,false);
this._inDrag = false;
this.render();
}
break;
}
}

self._ZEN_SVGComponent_timeLine_getCellInfo = function(cell,majorUnits,minorUnits,index) {
var caption = '';		// caption for cell
var startSecs = 0;		// number of secs at start of cell
var minorTicks = [];
switch(majorUnits) {
case 'decades':
var year = (parseInt(cell)*10) + 1900;
caption = year;
var d = new Date(year,0,1,0,0,0,0);
startSecs = d.getTime()/1000;
switch(minorUnits) {
default:
case 'years':
for (var n = 1; n <= 9; n++) {
var dt = new Date(year+n,0,1,0,0,0,0);
minorTicks[minorTicks.length] = dt.getTime()/1000;
}
break;
}
break;
case 'years':
var year = parseInt(cell) + 1900;
caption = year;
var d = new Date(year,0,1,0,0,0,0);
startSecs = d.getTime()/1000;
switch(minorUnits) {
default:
case 'quarters':
for (var n = 1; n <= 3; n++) {
var dt = new Date(year,n*3,1,0,0,0,0);
minorTicks[minorTicks.length] = dt.getTime()/1000;
}
break;
case 'months':
for (var n = 1; n <= 11; n++) {
var dt = new Date(year,n,1,0,0,0,0);
minorTicks[minorTicks.length] = dt.getTime()/1000;
}
break;
}
break;
case 'quarters':
var year = parseInt(Math.floor(cell/4)) + 1900;
caption = 'Q' + (cell%4+1);
if ((cell%4==0)||index==0) {
caption += ('-' + year);
}
var d = new Date(year,(cell%4)*3,1,0,0,0,0);
startSecs = d.getTime()/1000;
for (var n = 1; n <= 2; n++) {
var dt = new Date(year,((cell%4)*3)+n,1,0,0,0,0);
minorTicks[minorTicks.length] = dt.getTime()/1000;
}
break;
case 'months':
var year = parseInt(Math.floor(cell/12)) + 1900;
caption = _zenResource['zenMonthShortNames'].split(',')[(cell%12)];
if ((cell%12==0||cell%12==6)||(index==0)) {
caption += ('-' + (year));
}
var d = new Date(year,(cell%12),1,0,0,0,0);
startSecs = d.getTime()/1000;
var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
if ((year%4==0) && !(year%100==0 && year%400!=0)) {
daysInMonth[1] = 29;
}
for (var n = 1; n < daysInMonth[cell%12]; n++) {
var dt = new Date(year,(cell%12),n,0,0,0,0);
minorTicks[minorTicks.length] = dt.getTime()/1000;
}
break;
case 'days':
var d = new Date(1900,0,1,0,0,0,0);
d.setDate(this._date1900.getDate() + Math.floor(cell));
startSecs = d.getTime()/1000;
caption = zenDateToString(d,false,this.dateFormat);
for (var n = 1; n < 24; n+=1) {
var dt = new Date(1900,0,1,0,0,0,0);
dt.setTime(d.getTime() + (n*3600*1000));
minorTicks[minorTicks.length] = dt.getTime()/1000;
}
break;
}
return { caption:caption, startSecs:startSecs, minorTicks:minorTicks  };
}

self._ZEN_SVGComponent_timeLine_getModel = function() {
var model = null;
if (this.ongetdata!='') {
model = zenInvokeCallbackMethod(this.ongetdata,this,'ongetdata');
}
return model;
}

self._ZEN_SVGComponent_timeLine_itemClick = function(evt,newId) {
evt.preventDefault();
this.selectItem(newId);
zenInvokeCallbackMethod(this.onselect,this,'onselect','id',newId);
}

self._ZEN_SVGComponent_timeLine_renderContents = function() {
if (zenIsMissing(this.document)) return;
this._yScroll = zenGet(this._yScroll,0);
this._xOffset = 0;
this.unrender();
var width = parseInt(this.width);
var height = parseInt(this.height);
this._dragThumbFunc = new Function('evt','return zenPage.getComponent('+this.index+').dragThumb(evt);');
this._date1900 = new Date(1900,0,1,0,0,0,0);
var marginRight = parseInt(this.marginRight);
marginRight = isNaN(marginRight) ? 0 : marginRight;
var marginLeft = parseInt(this.marginLeft);
marginLeft = isNaN(marginLeft) ? 0 : marginLeft;
var marginTop = 0;
var marginBottom = 4;
var cellHeight = 25;
var ageHeight = 25;
var majorHeight = 24;
var minorHeight = 10;
var startTime = this.startTime;
var endTime = this.endTime;
var startDate = zenStringToDate(startTime);
var endDate = zenStringToDate(endTime);
if (!startDate) {
startDate = zenStringToDate('2000-01-01');
}
if (!endDate) {
endDate = zenStringToDate('2010-12-31');
}
var offset = (startDate)/1000;
this._offset = offset;
var backingRect = this.document.createElementNS(SVGNS,'rect');
backingRect.setAttribute('class','timeLine-backingRect');
backingRect.setAttribute('x',0);
backingRect.setAttribute('y',0);
backingRect.setAttribute('width',width);
backingRect.setAttribute('height',height);
this.svgGroup.appendChild(backingRect);
backingRect.addEventListener('click',new Function('evt','return zenPage.getComponent('+this.index+').itemClick(evt,\'\');'),false);
var titleRect = this.document.createElementNS(SVGNS,'rect');
titleRect.setAttribute('class','timeLine-titleBackground');
titleRect.setAttribute('x',0);
titleRect.setAttribute('y',0);
titleRect.setAttribute('width',width);
this.svgGroup.appendChild(titleRect);
var boxText = startDate.toLocaleDateString() + ' to ' + endDate.toLocaleDateString();
var lblText = this.document.createElementNS(SVGNS,'text');
lblText.setAttribute('id',this.makeId('infoBox'));
lblText.setAttribute('class','timeLine-infoBoxText');
lblText.setAttribute('x',width - 100);
lblText.setAttribute('y',10);
var textNode = this.document.createTextNode(boxText);
lblText.appendChild(textNode);
this.svgGroup.appendChild(lblText);
var bbox = zenGetBBox(lblText);
var tw = lblText.getComputedTextLength();
var th = bbox.height;
lblText.setAttribute('x',width - (tw+marginRight));
lblText.setAttribute('y',th + 2);
if (tw>width/2) {
lblText.setAttribute('style','display:none;');
}
marginTop = th+4;
var lblText = this.document.createElementNS(SVGNS,'text');
lblText.setAttribute('class','timeLine-title');
lblText.setAttribute('x',marginLeft);
lblText.setAttribute('y',10);
var textNode = this.document.createTextNode(this.title);
lblText.appendChild(textNode);
this.svgGroup.appendChild(lblText);
var bbox = zenGetBBox(lblText);
var tw = lblText.getComputedTextLength();
var th = bbox.height;
lblText.setAttribute('y',th);
marginTop = marginTop > (th+6) ? marginTop : (th+6);
titleRect.setAttribute('height',marginTop);
this._marginTop = marginTop;
this.renderTimeCells();
var dataGroup = this.document.createElementNS(SVGNS,'svg');
dataGroup.setAttribute('x',marginLeft);
dataGroup.setAttribute('width',width>(marginRight + marginLeft)?width - (marginRight + marginLeft):0);
dataGroup.setAttribute('y',marginTop+ageHeight);
dataGroup.setAttribute('height',height - (marginTop + marginBottom + cellHeight + ageHeight));
this.svgGroup.appendChild(dataGroup);
var dataSlideGroup = this.document.createElementNS(SVGNS,'g');
dataSlideGroup.setAttribute('id',this.makeId('dataSlideGroup'));
dataGroup.appendChild(dataSlideGroup);
this.renderData(dataSlideGroup,marginTop);
dataSlideGroup.setAttribute('transform','translate(0,'+(-this._yScroll)+')');
var dataHeight = height - (marginTop + marginBottom + cellHeight + ageHeight);
if (this._maxHeight > dataHeight) {
var sw = 12;
var scrollBox = this.document.createElementNS(SVGNS,'rect');
scrollBox.setAttribute('class','timeLine-scrollBox');
scrollBox.setAttribute('x',width-sw);
scrollBox.setAttribute('y',marginTop+ageHeight);
scrollBox.setAttribute('width',sw);
scrollBox.setAttribute('height',dataHeight);
this.svgGroup.appendChild(scrollBox);
var sh = (dataHeight/this._maxHeight) * dataHeight;
var maxScroll = this._maxHeight-dataHeight;
var maxSB = dataHeight-sh;
var sy = (marginTop+ageHeight) + (this._yScroll/maxScroll)*maxSB;
this._thumbPos = sy;
this._thumbHgt = sh;
this._thumbOffset = (marginTop+ageHeight);
this._thumbMin = 0;
this._thumbMax = maxSB;
this._thumbScale = (maxScroll/maxSB);
var thumb = this.document.createElementNS(SVGNS,'rect');
thumb.setAttribute('id',this.makeId('thumb'));
thumb.setAttribute('class','timeLine-scrollBar');
thumb.setAttribute('rx',2);
thumb.setAttribute('x',width-sw+1);
thumb.setAttribute('y',sy);
thumb.setAttribute('width',sw-2);
thumb.setAttribute('height',sh);
this.svgGroup.appendChild(thumb);
thumb.addEventListener('mouseover',new Function('evt','evt.target.setAttribute("class","timeLine-scrollBarHover");'),false);
thumb.addEventListener('mouseout',new Function('evt','evt.target.setAttribute("class","timeLine-scrollBar");'),false);
thumb.addEventListener('mousedown',this._dragThumbFunc,false);
}
}

self._ZEN_SVGComponent_timeLine_renderData = function(dataGroup,marginTop) {
var width = parseInt(this.width);
var height = parseInt(this.height);
this._maxHeight = 0;
this._spanItems = {};
var model = this.getModel();
var range = {};
if (this._sortedModel) {
var sortedModel = this._sortedModel;
}
else {
var sortedModel = this.sortModel(model,range);
this._sortedModel = sortedModel;
}
range.startTime = range.startTime ? range.startTime : new Date();
range.endTime = range.endTime ? range.endTime : range.startTime;
var startTime = this.startTime ? zenStringToDate(this.startTime) : range.startTime;
var endTime = this.endTime ? zenStringToDate(this.endTime) : range.endTime;
var currTime = this.currTime ? zenStringToDate(this.currTime) : startTime;
var firstGroup = null;
var offset = this._offset;
if (sortedModel) {
for (var n = 0; n < sortedModel.length; n++) {
var item = sortedModel[n];
var startSecs = item.startTime ? item.startTime.getTime()/1000 : null;
var endSecs = item.endTime ? item.endTime.getTime()/1000 : null;
if (startSecs!==null) {
item.group = this.document.createElementNS(SVGNS,'g');
dataGroup.appendChild(item.group);
if (!firstGroup) {
firstGroup = item.group;
}
if (item.id) {
this._spanItems[item.id] = item;
item.group.addEventListener('click',new Function('evt','return zenPage.getComponent('+this.index+').itemClick(evt,\''+item.id+'\');'),false);
}
var x1 = (this._pixPerSec * (startSecs-offset));
var x2 = endSecs ? ((this._pixPerSec * (endSecs-offset))) : x1;
var len = x2>x1 ? x2 - x1 : 0;
var size = {width: 0, height: 0};
this.renderOneItem(item.group,item,len,size);
item.x = x1;
item.width = size.width;
item.height = size.height;
}
}
var bands = [];
for (var n = 0; n < sortedModel.length; n++) {
var item = sortedModel[n];
if (item.group) {
var placed = false;
for (var b = 0; b < bands.length; b++) {
var overlap = false;
for (var slotNo = 0; slotNo < bands[b].length; slotNo++) {
var slot = bands[b][slotNo];
if (item.x < (slot.x+slot.width) && (item.x+item.width) > slot.x) {
overlap = true;
break;
}
}
if (!overlap) {
placed = true;
bands[b][bands[b].length] = {x:item.x,width:item.width,height:item.height};
item.band = b;
break;
}
}
if (!placed) {
item.band = bands.length;
bands[bands.length] = [{x:item.x,width:item.width,height:item.height}];
}
}
}
var y = marginTop;
var bandY = [];
for (var b = 0; b < bands.length; b++) {
bandY[b] = y;
var hgt = 10;
for (var slotNo = 0; slotNo < bands[b].length; slotNo++) {
if (bands[b][slotNo].height > hgt) {
hgt = bands[b][slotNo].height;
}
}
y += hgt+10;
}
this._maxHeight = y;
for (var n = 0; n < sortedModel.length; n++) {
var item = sortedModel[n];
var y = bandY[item.band];
if (item.group) {
item.group.setAttribute('transform','translate('+item.x+','+y+')');
}
if (firstGroup) {
var tick = this.document.createElementNS(SVGNS,'line');
tick.setAttribute('class','timeLine-connector');
tick.setAttribute('x1',item.x);
tick.setAttribute('x2',item.x);
tick.setAttribute('y1',y);
tick.setAttribute('y2',height);
dataGroup.insertBefore(tick,firstGroup);
}
}
}
}

self._ZEN_SVGComponent_timeLine_renderOneItem = function(group,item,length,size) {
var spanHeight = parseInt(this.spanHeight);
if (item.spanHeight) {
spanHeight = parseInt(item.spanHeight);
}
var userRendered = false;
if (this.onrenderitem) {
size.width = length;
size.height = spanHeight;
item.document = this.document;
userRendered = zenInvokeCallbackMethod(this.onrenderitem,this,'onrenderitem','group',group,'item',item,'size',size);
item.document = null;
}
if (!userRendered) {
if (length > 0) {
var span = this.document.createElementNS(SVGNS,'rect');
span.setAttribute('class','timeLine-span');
span.setAttribute('x',0);
span.setAttribute('y',0);
span.setAttribute('rx',0);
span.setAttribute('width',length);
span.setAttribute('height',spanHeight);
if (item.style) {
span.setAttribute('style',item.style);
}
else {
span.setAttribute('style','fill:none;');
}
group.appendChild(span);
var span = this.document.createElementNS(SVGNS,'rect');
span.setAttribute('class','timeLine-span');
span.setAttribute('x',0);
span.setAttribute('y',0);
span.setAttribute('rx',0);
span.setAttribute('width',length);
span.setAttribute('height',spanHeight);
span.setAttribute('opacity',item.style ? 0.25 : 1.0);
group.appendChild(span);
}
else {
spanHeight = 0;
}
size.width = length;
size.height = spanHeight;
var fh = spanHeight * 0.6;
fh = (fh > 12) ? 12 : fh;
if (item.tag!=='' && fh>4) {
var tag = this.document.createElementNS(SVGNS,'rect');
tag.setAttribute('class','timeLine-tag');
tag.setAttribute('x',0);
tag.setAttribute('y',0);
tag.setAttribute('rx',2);
tag.setAttribute('width',0);
tag.setAttribute('height',0);
group.appendChild(tag);
var text = this.document.createElementNS(SVGNS,"text");
group.appendChild(text);
text.setAttribute("x",0);
text.setAttribute("y",0);
text.setAttribute("text-anchor","middle");
text.setAttribute("class","timeLine-tagLabel");
text.setAttribute("style",'font-size:'+fh+'px;' + item.tagStyle);
var textNode = this.document.createTextNode(item.tag);
text.appendChild(textNode);
var bbox = zenGetBBox(text);
var tw = text.getComputedTextLength();
var th = bbox.height*1.1;
var ty = -th/2;
tw = tw < 10 ? 10 : tw;
text.setAttribute('x',(tw/2)+2);
text.setAttribute('y',ty+th-(th/4));
tag.setAttribute('x',-1);
tag.setAttribute('y',-th/2);
var bw = ((tw)*1.2)+4;
tag.setAttribute('width',bw);
tag.setAttribute('height',(th));
if (bw > size.width) {
size.width = bw;
}
}
}
if (item.caption) {
var text = this.document.createElementNS(SVGNS,"text");
group.appendChild(text);
text.setAttribute("x",2);
text.setAttribute("y",0);
text.setAttribute("class","timeLine-itemCaption");
if (item.captionStyle) {
text.setAttribute("style",item.captionStyle);
}
var textNode = this.document.createTextNode(item.caption);
text.appendChild(textNode);
var bbox = zenGetBBox(text);
var tw = text.getComputedTextLength();
var th = bbox.height * 1.2;
text.setAttribute("y",spanHeight+th);
size.width = size.width>tw ? size.width : tw;
size.height = spanHeight + th;
}
}

self._ZEN_SVGComponent_timeLine_renderTimeCells = function() {
var timeCellGroup = this.findSVGElement('timeCellGroup');
if (timeCellGroup) {
while(timeCellGroup.firstChild) {
timeCellGroup.removeChild(timeCellGroup.firstChild);
}
}
var ageCellGroup = this.findSVGElement('ageCellGroup');
if (timeCellGroup) {
while(ageCellGroup.firstChild) {
ageCellGroup.removeChild(ageCellGroup.firstChild);
}
}
var startDate = this._startDate;
var startDate = this._startDate;
var width = parseInt(this.width);
var height = parseInt(this.height);
var marginRight = parseInt(this.marginRight);
marginRight = isNaN(marginRight) ? 0 : marginRight;
var marginLeft = parseInt(this.marginLeft);
marginLeft = isNaN(marginLeft) ? 0 : marginLeft;
var marginTop = this._marginTop;
var marginBottom = 4;
var cellHeight = 25;
var ageHeight = 25;
var majorHeight = 24;
var minorHeight = 10;
var startTime = this.startTime;
var endTime = this.endTime;
var startDate = zenStringToDate(startTime);
var endDate = zenStringToDate(endTime);
if (!startDate) {
startDate = zenStringToDate('2000-01-01');
}
if (!endDate) {
endDate = zenStringToDate('2010-12-31');
}
var spanSecs = (endDate - startDate)/1000;
var majorUnits = 'years';
var minorUnits = 'quarters';
var startUnits = 0;
var endUnits = 0;
if (spanSecs > (31536000*20)) {
majorUnits = 'decades';
minorUnits = 'years';
startUnits = Math.floor((startDate.getFullYear() - 1900) / 10);
endUnits = Math.floor((endDate.getFullYear() - 1900) / 10);
}
else if (spanSecs > (31536000*4)) {
majorUnits = 'years';
minorUnits = 'quarters';
startUnits = startDate.getFullYear() - 1900;
endUnits = endDate.getFullYear() - 1900;
}
else if (spanSecs > (31536000*2)) {
majorUnits = 'years';
minorUnits = 'months';
startUnits = startDate.getFullYear() - 1900;
endUnits = endDate.getFullYear() - 1900;
}
else if (spanSecs > (31536000)) {
majorUnits = 'quarters';
minorUnits = 'months';
startUnits = ((startDate.getFullYear()-1900)*4) + Math.floor(startDate.getMonth()/4);
endUnits = ((endDate.getFullYear()-1900)*4) + Math.floor(endDate.getMonth()/4);
}
else if (spanSecs > (24 * 3600 * 10)) {
majorUnits = 'months';
minorUnits = 'days';
startUnits = ((startDate.getFullYear()-1900)*12) + Math.floor(startDate.getMonth());
endUnits = ((endDate.getFullYear()-1900)*12) + Math.floor(endDate.getMonth());
}
else {
spanSecs = spanSecs > (24*60*60) ? spanSecs :(24*60*60);
majorUnits = 'days';
minorUnits = 'hours';
startUnits = (startDate - this._date1900)/(24*60*60*1000);
endUnits = (endDate - this._date1900)/(24*60*60*1000);
}
var timeCellGroup = this.document.createElementNS(SVGNS,'g');
timeCellGroup.setAttribute('id',this.makeId('timeCellGroup'));
var cellRect = this.document.createElementNS(SVGNS,'rect');
cellRect.setAttribute('class','timeLine-cellBackground');
cellRect.setAttribute('x',0);
cellRect.setAttribute('y',0);
cellRect.setAttribute('width',width);
cellRect.setAttribute('height',cellHeight);
timeCellGroup.appendChild(cellRect);
var hasAgeBar = false;
var birthDate = this.birthDate ? zenStringToDate(this.birthDate) : null;
if (birthDate) {
hasAgeBar = true;
var startAge = this.computeAge(birthDate,startDate);
var endAge = this.computeAge(birthDate,endDate);
var ageUnits = 'years';
var ageStartUnits = startAge.years;
var ageEndUnits = endAge.years;
}
if (hasAgeBar) {
var ageCellGroup = this.document.createElementNS(SVGNS,'g');
ageCellGroup.setAttribute('id',this.makeId('ageCellGroup'));
this.svgGroup.appendChild(ageCellGroup);
var cellRect = this.document.createElementNS(SVGNS,'rect');
cellRect.setAttribute('class','timeLine-ageBackground');
cellRect.setAttribute('x',0);
cellRect.setAttribute('y',0);
cellRect.setAttribute('width',width);
cellRect.setAttribute('height',ageHeight);
ageCellGroup.appendChild(cellRect);
}
var plotWidth = width - (marginLeft+marginRight);
this._pixPerSec = spanSecs>0 ? (plotWidth/spanSecs) : 0;
var offset = (startDate)/1000;
if (plotWidth>0) {
for (var cell = startUnits; cell <= endUnits; cell++) {
var info = this.getCellInfo(cell,majorUnits,minorUnits,cell-startUnits);
var x = (this._pixPerSec * (info.startSecs-offset)) + marginLeft;
var tick = this.document.createElementNS(SVGNS,'line');
tick.setAttribute('class','timeLine-majorTick');
tick.setAttribute('x1',x);
tick.setAttribute('x2',x);
tick.setAttribute('y1',cellHeight-majorHeight);
tick.setAttribute('y2',cellHeight);
timeCellGroup.appendChild(tick);
var lblText = this.document.createElementNS(SVGNS,'text');
lblText.setAttribute('class','timeLine-tickLabel');
lblText.setAttribute('x',x+4);
lblText.setAttribute('y',cellHeight-3);
var textNode = this.document.createTextNode(info.caption);
lblText.appendChild(textNode);
timeCellGroup.appendChild(lblText);
var lastxm = 0;
for (var j = 0; j < info.minorTicks.length; j++) {
var xm = (this._pixPerSec * (info.minorTicks[j]-offset)) + marginLeft;
if (lastxm==0 || (xm-lastxm) > 3) {
var tick = this.document.createElementNS(SVGNS,'line');
tick.setAttribute('class','timeLine-minorTick');
tick.setAttribute('x1',xm);
tick.setAttribute('x2',xm);
tick.setAttribute('y1',cellHeight-majorHeight);
tick.setAttribute('y2',cellHeight-majorHeight+minorHeight);
timeCellGroup.appendChild(tick);
lastxm = xm;
}
}
}
if (hasAgeBar) {
if ((ageEndUnits-ageStartUnits)<3 && ageEndUnits>=0 && ageEndUnits < 3) {
ageUnits = 'months';
ageStartUnits = ageStartUnits*12;
ageEndUnits = (ageEndUnits+1)*12;
}
ageStartUnits = ageStartUnits < 0 ? 0 : ageStartUnits;
var lastxd = 0;
for (var cell = ageStartUnits; cell <= ageEndUnits; cell++) {
if (ageUnits == 'months') {
var unitCaption = ' mo';
var yr1 = Math.floor(cell/12);
var yr2 = Math.floor((cell+1)/12);
var m1 = Math.floor(cell%12);
var m2 = Math.floor((cell+1)%12);
var ld = new Date(birthDate.getFullYear()+yr1,m1,birthDate.getDate(),0,0,0,0);
var ld2 = new Date(birthDate.getFullYear()+yr2,m2,birthDate.getDate(),0,0,0,0);
var ageSecs = (ld.getTime()/1000);
var ageSecs2 = (ld2.getTime()/1000);
var x1 = (this._pixPerSec * (ageSecs-offset)) + marginLeft;
var x2 = (this._pixPerSec * (ageSecs2-offset)) + marginLeft;
}
else {
var unitCaption = ' yrs';
var ld = new Date(birthDate.getFullYear()+cell,birthDate.getMonth(),birthDate.getDate(),0,0,0,0);
var ld2 = new Date(birthDate.getFullYear()+cell+1,birthDate.getMonth(),birthDate.getDate(),0,0,0,0);
var ageSecs = (ld.getTime()/1000);
var ageSecs2 = (ld2.getTime()/1000);
var x1 = (this._pixPerSec * (ageSecs-offset)) + marginLeft;
var x2 = (this._pixPerSec * (ageSecs2-offset)) + marginLeft;
}
var abox = this.document.createElementNS(SVGNS,'rect');
abox.setAttribute('class',(cell%2==0)?'timeLine-ageBox-even':'timeLine-ageBox-odd');
abox.setAttribute('x',x1);
abox.setAttribute('y',0);
abox.setAttribute('width',x2-x1>0?x2-x1:0);
abox.setAttribute('height',ageHeight);
ageCellGroup.appendChild(abox);
if (lastxd==0 || ((x1-lastxd) > 10)) {
var lblText = this.document.createElementNS(SVGNS,'text');
lblText.setAttribute('class','timeLine-ageLabel');
lblText.setAttribute('x',x1+4);
lblText.setAttribute('y',ageHeight-6);
var textNode = this.document.createTextNode(cell);
lblText.appendChild(textNode);
ageCellGroup.appendChild(lblText);
var atw = lblText.getComputedTextLength();
if (lastxd==0 || (x2-x1)>(atw+10)) {
var lblText = this.document.createElementNS(SVGNS,'text');
lblText.setAttribute('class','timeLine-ageUnits');
lblText.setAttribute('x',x1+4+atw+2);
lblText.setAttribute('y',ageHeight-6);
var textNode = this.document.createTextNode(unitCaption);
lblText.appendChild(textNode);
ageCellGroup.appendChild(lblText);
}
lastxd = x1+4+atw+2;
}
}
}
}
var tcy = height - cellHeight;
timeCellGroup.setAttribute('transform','translate(0,'+tcy+')');
this.svgGroup.appendChild(timeCellGroup);
if (hasAgeBar) {
var tcy = height - (cellHeight+ageHeight);
ageCellGroup.setAttribute('transform','translate(0,'+marginTop+')');
}
else {
ageHeight = 0;
}
}

self._ZEN_SVGComponent_timeLine_selectItem = function(newId) {
if (this._spanItems && this.selectedId!=newId) {
this.selectedId=newId;
for (var id in this._spanItems) {
var item = this._spanItems[id];
if (item.group) {
var opacity = (newId===null||newId==='') ? 1.0 : (newId==id?1.0:0.5);
item.group.setAttribute('opacity',opacity);
}
}
}
}

self._ZEN_SVGComponent_timeLine_setProperty = function(property,value,value2) {
switch(property) {
case 'width':
case 'height':
return this.invokeSuper('setProperty',arguments);
case 'title':
case 'birthDate':
case 'startTime':
case 'endTime':
case 'dateFormat':
this[property] = value;
this.render();
break;
case 'spanHeight':
this[property] = parseInt(value);
this.render();
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_SVGComponent_timeLine_setTimeRange = function(startTime,endTime,reset,which) {
which = zenGet(which,'');
if (zenGet(reset,false)) {
this._sortedModel = null;
this._yScroll = 0;
which = '';
}
if (!endTime) {
startTime = startTime ? (parseInt(startTime)==startTime?startTime+'-01-01':startTime) : startTime;
var endTime = this.endTime;
endTime = endTime ? (parseInt(endTime)==endTime?endTime+'-12-31':endTime) : endTime;
var startDate = zenStringToDate(startTime);
var endDate = zenStringToDate(endTime);
startDate = startDate ? startDate : new Date(2000,0,1,0,0,0,0);
endDate = endDate ? endDate : new Date(startDate.getFullYear(),11,31,0,0,0,0);
var delta = endDate-startDate;
startDate.setTime(startDate.getTime()+delta);
endTime = zenDateToString(startDate);
}
this.startTime = startTime;
this.endTime = endTime;
if (which == 'translate') {
var slideGroup = this.findSVGElement('dataSlideGroup');
if (slideGroup && this._offset) {
var startDate = zenStringToDate(startTime);
var endDate = zenStringToDate(endTime);
if (!startDate) {
startDate = zenStringToDate('2000-01-01');
}
if (!endDate) {
endDate = zenStringToDate('2010-12-31');
}
var offset = (startDate)/1000;
var xOffset = (this._offset - offset) * this._pixPerSec;
var y = -this._yScroll;
this._xOffset = xOffset;
slideGroup.setAttribute('transform','translate('+xOffset+','+y+')');
this.renderTimeCells();
var boxText = startDate.toLocaleDateString() + ' to ' + endDate.toLocaleDateString();
this.setTextNode('infoBox',boxText);
return;
}
}
this.render();
}

self._ZEN_SVGComponent_timeLine_sortModel = function(model,range) {
var sortedModel = [];
range.startTime = null;
range.endTime = null;
if (model && model.children) {
for (var n = 0; n < model.children.length; n++) {
var newItem = {};
var item = model.children[n];
if (item.startTime) {
newItem.startTime = zenStringToDate(item.startTime);
}
else {
newItem.startTime = new Date();
}
if (item.endTime) {
newItem.endTime = zenStringToDate(item.endTime);
}
else {
newItem.startTime = newItem.startTime;
}
newItem.id = item.id ? item.id : null;
newItem.caption = item.caption ? item.caption : '';
newItem.style = item.style ? item.style : '';
newItem.captionStyle = item.captionStyle ? item.captionStyle : '';
newItem.spanHeight = item.height ? item.height : '';
newItem.tag = item.tag ? item.tag : '';
var skip = {startTime:true,endTime:true,id:true,caption:true,
style:true,captionStyle:true,height:true,tag:true};
for (var p in item) {
if (!skip[p]) {
newItem[p] = item[p] ? item[p] : '';
}
}
sortedModel[sortedModel.length] = newItem;
range.startTime = !range.startTime || newItem.startTime<range.startTime ? newItem.startTime : range.startTime;
range.endTime = !range.endTime || newItem.endTime>range.endTime ? newItem.endTime : range.endTime;
}
}
sortedModel.sort(function(a,b) { return a.startTime - b.startTime; });
return sortedModel;
}
self._ZEN_SVGComponent_timeLine__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_svgComponent');
	_ZEN_SVGComponent_timeLine.prototype = zenCreate('_ZEN_SVGComponent_svgComponent',-1);
	var p = _ZEN_SVGComponent_timeLine.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_timeLine;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_svgComponent) ? zenMaster._ZEN_SVGComponent_svgComponent.prototype:_ZEN_SVGComponent_svgComponent.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.timeLine';
	p._type = 'timeLine';
	p.serialize = _ZEN_SVGComponent_timeLine_serialize;
	p.getSettings = _ZEN_SVGComponent_timeLine_getSettings;
	p.computeAge = _ZEN_SVGComponent_timeLine_computeAge;
	p.dragThumb = _ZEN_SVGComponent_timeLine_dragThumb;
	p.getCellInfo = _ZEN_SVGComponent_timeLine_getCellInfo;
	p.getModel = _ZEN_SVGComponent_timeLine_getModel;
	p.itemClick = _ZEN_SVGComponent_timeLine_itemClick;
	p.renderContents = _ZEN_SVGComponent_timeLine_renderContents;
	p.renderData = _ZEN_SVGComponent_timeLine_renderData;
	p.renderOneItem = _ZEN_SVGComponent_timeLine_renderOneItem;
	p.renderTimeCells = _ZEN_SVGComponent_timeLine_renderTimeCells;
	p.selectItem = _ZEN_SVGComponent_timeLine_selectItem;
	p.setProperty = _ZEN_SVGComponent_timeLine_setProperty;
	p.setTimeRange = _ZEN_SVGComponent_timeLine_setTimeRange;
	p.sortModel = _ZEN_SVGComponent_timeLine_sortModel;
}

self._zenClassIdx['timeRangeControl'] = '_ZEN_SVGComponent_timeRangeControl';
self._ZEN_SVGComponent_timeRangeControl = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_timeRangeControl__init(this,index,id);}
}

self._ZEN_SVGComponent_timeRangeControl__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_svgComponent__init) ?zenMaster._ZEN_SVGComponent_svgComponent__init(o,index,id):_ZEN_SVGComponent_svgComponent__init(o,index,id);
	o.dateFormat = 'YMD';
	o.endRange = '';
	o.endTime = '2030';
	o.onchange = '';
	o.onconfig = '';
	o.startRange = '';
	o.startTime = '2015';
	o.thumbStyle = 'fill:url(#glow-silver);';
	o.timeNotation = '12h';
	o.timeScale = 'years';
}
function _ZEN_SVGComponent_timeRangeControl_serialize(set,s)
{
	var o = this;s[0]='3982150169';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.aux;s[7]=(o.boundless?1:0);s[8]=o.dateFormat;s[9]=o.endRange;s[10]=o.endTime;s[11]=o.height;s[12]=(o.hidden?1:0);s[13]=o.onchange;s[14]=o.onclick;s[15]=o.onconfig;s[16]=o.onupdate;s[17]=o.position;s[18]=o.preserveAspectRatio;s[19]=o.renderFlag;s[20]=o.startRange;s[21]=o.startTime;s[22]=o.thumbStyle;s[23]=o.timeNotation;s[24]=o.timeScale;s[25]=o.tuple;s[26]=o.viewBoxHeight;s[27]=o.viewBoxWidth;s[28]=(o.visible?1:0);s[29]=o.width;s[30]=o.x;s[31]=o.y;
}
function _ZEN_SVGComponent_timeRangeControl_getSettings(s)
{
	s['name'] = 'string';
	s['dateFormat'] = 'enum:MDY,DMY,YMD';
	s['endRange'] = 'string';
	s['endTime'] = 'string';
	s['onchange'] = 'eventHandler';
	s['onconfig'] = 'eventHandler';
	s['startRange'] = 'string';
	s['startTime'] = 'string';
	s['thumbStyle'] = 'style';
	s['timeNotation'] = 'enum:12h,24h';
	s['timeScale'] = 'enum:years,months,days,hours';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_timeRangeControl_dragGrabber = function(evt,which) {
evt.preventDefault();
evt.stopPropagation();
if (this.disabled) return;
switch (evt.type) {
case 'mousedown':
if (which==1) {
this.document.documentElement.addEventListener('mousemove',this._dragGrabber1Func,false);
this.document.documentElement.addEventListener('mouseup',this._dragGrabber1Func,false);
}
else {
this.document.documentElement.addEventListener('mousemove',this._dragGrabber2Func,false);
this.document.documentElement.addEventListener('mouseup',this._dragGrabber2Func,false);
}
this._inDrag = true;
var size = this.getSizeAbsolute();
if (which==1) {
var tx = size.x + this._thumbPos;
}
else {
var tx = size.x + this._thumbPos + this._thumbWid;
}
this._deltaX = tx - evt.clientX;
this._startX = tx;
break;
case 'mousemove':
case 'mouseup':
var size = this.getSizeAbsolute();
if (which==1) {
var tx = size.x + this._thumbPos;
}
else {
var tx = size.x + this._thumbPos + this._thumbWid;
}
var dx = evt.clientX + this._deltaX - tx;
if (Math.abs(dx) >= 1) {
if (which==1) {
var startRange = this.startRange;
var newTime = this.getTimeForPos(this._thumbPos + dx);
if (newTime != startRange) {
this.setProperty('startRange',newTime);
}
}
else {
if (dx<-this._thumbWid) {
dx = -this._thumbWid;
}
var endRange = this.endRange;
var newTime = this.getTimeForPos(this._thumbPos+this._thumbWid+dx);
if (newTime != endRange) {
this.setProperty('endRange',newTime);
}
}
}
if ('mouseup' == evt.type) {
this.onchangeHandler(true,'scale');
if (which==1) {
this.document.documentElement.removeEventListener('mousemove',this._dragGrabber1Func,false);
this.document.documentElement.removeEventListener('mouseup',this._dragGrabber1Func,false);
}
else {
this.document.documentElement.removeEventListener('mousemove',this._dragGrabber2Func,false);
this.document.documentElement.removeEventListener('mouseup',this._dragGrabber2Func,false);
}
this._inDrag = false;
}
else {
this.onchangeHandler(false,'scale');
}
break;
}
}

self._ZEN_SVGComponent_timeRangeControl_dragThumb = function(evt) {
evt.preventDefault();
evt.stopPropagation();
if (this.disabled) return;
switch (evt.type) {
case 'mousedown':
this.document.documentElement.addEventListener('mousemove',this._dragThumbFunc,false);
this.document.documentElement.addEventListener('mouseup',this._dragThumbFunc,false);
var size = this.getSizeAbsolute();
var tx = size.x + this._thumbPos;
this._deltaX = tx - evt.clientX;
this._startX = tx;
this._inDrag = true;
break;
case 'mousemove':
case 'mouseup':
var size = this.getSizeAbsolute();
var tx = size.x + this._thumbPos;
var dx = evt.clientX + this._deltaX - tx;
if (Math.abs(dx) >= 1) {
var startRange = this.startRange;
var newTime = this.getTimeForPos(this._thumbPos + dx);
if (newTime != startRange) {
var delta = zenStringToDate(newTime) - (startRange ? zenStringToDate(startRange) : (this._startSecs*1000));
if (this.endRange) {
var d = zenStringToDate(this.endRange);
d.setTime(d.getTime() + delta);
var test = (d.getTime()/1000);
if (this._endSecs && test > this._endSecs) {
var span = zenStringToDate(this.endRange) - (startRange ? zenStringToDate(startRange) : (this._startSecs*1000));
var d = new Date(1900,0,1,0,0,0,0);
d.setTime(this._endSecs*1000);
this.endRange = zenDateToString(d);
var d2 = zenStringToDate(this.endRange);
d2.setTime(d2.getTime() - span);
newTime = zenDateToString(d2);
}
else {
this.endRange = zenDateToString(d);
}
}
else {
this.endRange = newTime;
}
this.setProperty('startRange',newTime);
}
}
if ('mouseup' == evt.type) {
this.onchangeHandler(true,'translate');
this.document.documentElement.removeEventListener('mousemove',this._dragThumbFunc,false);
this.document.documentElement.removeEventListener('mouseup',this._dragThumbFunc,false);
this._inDrag = false;
}
else {
this.onchangeHandler(false,'translate');
}
break;
}
}

self._ZEN_SVGComponent_timeRangeControl_getTimeForPos = function(x) {
var width = parseInt(this.width);
var btnWid = 24;
var posSecs = 0;
if (x <= btnWid) {
posSecs = this._startSecs;
}
else if (x >= (width-btnWid)) {
posSecs = this._endSecs;
}
else {
var pct = (x-btnWid)/(width-(btnWid*2));
posSecs = Math.floor(this._startSecs + (pct*(this._endSecs-this._startSecs)));
}
var dt = new Date(1900,0,1,0,0,0,0);
dt.setTime(posSecs*1000);
var time = zenDateToString(dt);
switch (this.timeScale) {
case 'hours':
var hour = (Math.floor(posSecs/(3600)))%24;
var tzone = dt.getTimezoneOffset()/60;
hour -= tzone;
hour = hour%24;
hour = hour<0 ? 24+hour : hour;
time = time + ' ' + ((hour<10)?'0'+hour:hour) + ':00';
break;
}
return time;
}

self._ZEN_SVGComponent_timeRangeControl_onchangeHandler = function(final,which) {
zenInvokeCallbackMethod(this.onchange,this,'onchange','final',final,'which',which);
}

self._ZEN_SVGComponent_timeRangeControl_onconfigHandler = function() {
zenInvokeCallbackMethod(this.onconfig,this,'onconfig');
}

self._ZEN_SVGComponent_timeRangeControl_renderContents = function() {
if (zenIsMissing(this.document)) return;
this.unrender();
this._date1900 = new Date(1900,0,1,0,0,0,0);
this._dragThumbFunc = new Function('evt','return zenPage.getComponent('+this.index+').dragThumb(evt);');
this._dragGrabber1Func = new Function('evt','return zenPage.getComponent('+this.index+').dragGrabber(evt,1);');
this._dragGrabber2Func = new Function('evt','return zenPage.getComponent('+this.index+').dragGrabber(evt,2);');
var width = parseInt(this.width);
var height = parseInt(this.height);
if (width <=0) return;
if (height <=0) return;
var btnWid = 24;
var scrollHgt = 15;
var cellHeight = 25;
var startTime = this.startTime;
startTime = startTime ? (parseInt(startTime)==startTime?startTime+'-01-01':startTime) : startTime;
var endTime = this.endTime;
endTime = endTime ? (parseInt(endTime)==endTime?endTime+'-12-31':endTime) : endTime;
var startDate = zenStringToDate(startTime);
var endDate = zenStringToDate(endTime);
startDate = startDate ? startDate : new Date(2000,0,1,0,0,0,0);
endDate = endDate ? endDate : new Date(startDate.getFullYear(),11,31,0,0,0,0);
var units = [];
var startUnits,endUnits;
switch (this.timeScale) {
case 'months':
var minorTicks = 4;
this._timeDelta	= 7 * 24 * 3600;
startUnits = ((startDate.getFullYear()-1900)*12) + Math.floor(startDate.getMonth());
endUnits = ((endDate.getFullYear()-1900)*12) + Math.floor(endDate.getMonth());
for (var month = startUnits; month <= endUnits+1; month++) {
var year = parseInt(Math.floor(month/12)) + 1900;
var d = new Date(year,(month%12),1,0,0,0,0);
var caption = _zenResource['zenMonthShortNames'].split(',')[(month%12)];
if ((month%12==0||month%12==6)||(month==startUnits)) {
caption += ('-' + (year));
}
if ((endUnits-startUnits)<4) {
var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
if ((year%4==0) && !(year%100==0 && year%400!=0)) {
daysInMonth[1] = 29;
}
minorTicks = daysInMonth[month%12];
}
units[units.length] = {secs:d.getTime()/1000,caption:caption,unit:month,minorTicks:minorTicks};
}
break;
case 'days':
this._timeDelta	= 1 * 24 * 3600;
startUnits = (startDate - this._date1900)/(24*60*60*1000);
endUnits = (endDate - this._date1900)/(24*60*60*1000);
for (var day = startUnits; day <= endUnits+1; day++) {
var d = new Date(1900,0,1,0,0,0,0);
d.setDate(this._date1900.getDate() + day);
var caption = zenDateToString(d,false,this.dateFormat);
units[units.length] = {secs:d.getTime()/1000,caption:caption,unit:day,minorTicks:24};
}
break;
case 'hours':
this._timeDelta	= 1 * 3600;
startUnits = (startDate - this._date1900)/(60*60*1000);
endUnits = (endDate - this._date1900)/(60*60*1000);
var t = startTime ? parseInt(startTime.split(' ')[1]) : null;
var startHours = t&&!isNaN(t) ? t : 0;
var t = endTime ? parseInt(endTime.split(' ')[1]) : null;
var endHours = t&&!isNaN(t) ? t : 0;
startUnits += startHours;
endUnits += endHours;
for (var hour = startUnits; hour <= endUnits+1; hour++) {
var d = new Date(1900,0,1,0,0,0,0);
d.setTime(d.getTime() + (hour*60*60*1000));
var hours = hour%24;
var caption = '';
if (this.timeNotation=='24h') {
hours = (hours<10) ? ('0'+hours) : hours;
caption = hours+':00';
}
else {
var post = hours>=12 ? 'pm' : 'am';
hours = (hours==0) ? 12 : (hours>12) ? hours-12 : hours;
caption = hours+post;
}
units[units.length] = {secs:d.getTime()/1000,caption:caption,unit:hour,minorTicks:60};
}
break;
case 'years':
default:
this._timeDelta	= 365 * 24 * 3600;
startUnits = startDate.getFullYear();
endUnits = endDate.getFullYear();
for (var year = startUnits; year <= endUnits+1; year++) {
var d = new Date(year,0,1,0,0,0,0);
units[units.length] = {secs:d.getTime()/1000,caption:year,unit:year,minorTicks:4};
}
break;
}
var startSecs = units[0].secs;
var endSecs = units[units.length-1].secs;
var plotWidth = width - (btnWid*2);
var	timeUnits = endUnits - startUnits + 1;
var cellWidth = plotWidth / timeUnits;		// guess
var spanSecs = (endSecs-startSecs);
var pixPerSec = spanSecs>0 ? (plotWidth/spanSecs) : 0;
var marginBottom = 4;
var majorHeight = 24;
var minorHeight = 10;
var gridBottom = height - marginBottom;
var backingRect = this.document.createElementNS(SVGNS,'rect');
backingRect.setAttribute('class','trc-backingRect');
backingRect.setAttribute('x',0);
backingRect.setAttribute('y',0);
backingRect.setAttribute('width',width);
backingRect.setAttribute('height',height);
this.svgGroup.appendChild(backingRect);
var timeCellGroup = this.document.createElementNS(SVGNS,'g');
var timeCellRectGroup = this.document.createElementNS(SVGNS,'g');
var scrollGroup = this.document.createElementNS(SVGNS,'g');
var scrollRect = this.document.createElementNS(SVGNS,'rect');
scrollRect.setAttribute('class','trc-scrollTrack');
scrollRect.setAttribute('x',0);
scrollRect.setAttribute('y',0);
scrollRect.setAttribute('width',width);
scrollRect.setAttribute('height',scrollHgt);
scrollGroup.appendChild(scrollRect);
var thumbX = btnWid;
var thumbWid = 0;
var thumb = this.document.createElementNS(SVGNS,'rect');
thumb.setAttribute('class','trc-thumb');
thumb.setAttribute('style',this.thumbStyle);
thumb.setAttribute('x',thumbX);
thumb.setAttribute('y',1);
thumb.setAttribute('rx',1);
thumb.setAttribute('width',thumbWid);
thumb.setAttribute('height',scrollHgt-2);
scrollGroup.appendChild(thumb);
this._thumb = thumb;
thumb.addEventListener('mouseover',new Function('evt','evt.target.setAttribute("class","trc-thumbHover");'),false);
thumb.addEventListener('mouseout',new Function('evt','evt.target.setAttribute("class","trc-thumb");'),false);
thumb.addEventListener('mousedown',this._dragThumbFunc,false);
this._ridges = [];
for (var r = 0; r < 3; r++) {
var ridge = this.document.createElementNS(SVGNS,'rect');
ridge.setAttribute('class','trc-scrollRidge');
ridge.setAttribute('x',thumbX + thumbWid/2 + ((r-1)*3));
ridge.setAttribute('y',3);
ridge.setAttribute('width',1);
ridge.setAttribute('height',scrollHgt-6);
scrollGroup.appendChild(ridge);
this._ridges[r] = ridge;
ridge.addEventListener('mousedown',this._dragThumbFunc,false);
}
var ix = btnWid/2;
var iy = scrollHgt/2;
var f1Click = new Function('evt','return zenPage.getComponent('+this.index+').scrollBtnClick(evt,1);')
var f1Over = new Function('evt','return zenPage.getComponent('+this.index+').scrollBtnOver(evt,1);')
var f1Out = new Function('evt','return zenPage.getComponent('+this.index+').scrollBtnOut(evt,1);')
var f2Click = new Function('evt','return zenPage.getComponent('+this.index+').scrollBtnClick(evt,2);')
var f2Over = new Function('evt','return zenPage.getComponent('+this.index+').scrollBtnOver(evt,2);')
var f2Out = new Function('evt','return zenPage.getComponent('+this.index+').scrollBtnOut(evt,2);')
var brect = this.document.createElementNS(SVGNS,'rect');
brect.setAttribute('class','trc-buttonRect');
brect.setAttribute('id',this.makeId('btn1'));
brect.setAttribute('x',0);
brect.setAttribute('y',0);
brect.setAttribute('width',btnWid);
brect.setAttribute('height',scrollHgt);
scrollGroup.appendChild(brect);
brect.addEventListener('click',f1Click,false);
brect.addEventListener('mouseover',f1Over,false);
brect.addEventListener('mouseout',f1Out,false);
var icon = this.document.createElementNS(SVGNS,'path');
icon.setAttribute('class','trc-buttonIcon');
icon.setAttribute('d','M '+(ix+4)+' '+iy+' L '+(ix-4)+' '+iy+'M '+ix+' '+(iy-4)+' L '+(ix-4)+' '+iy+' '+ix+' '+(iy+4));
scrollGroup.appendChild(icon);
icon.addEventListener('click',f1Click,false);
icon.addEventListener('mouseover',f1Over,false);
icon.addEventListener('mouseout',f1Out,false);
var ix = width-(btnWid/2);
var brect = this.document.createElementNS(SVGNS,'rect');
brect.setAttribute('class','trc-buttonRect');
brect.setAttribute('id',this.makeId('btn2'));
brect.setAttribute('x',width-btnWid);
brect.setAttribute('y',0);
brect.setAttribute('width',btnWid);
brect.setAttribute('height',scrollHgt);
scrollGroup.appendChild(brect);
brect.addEventListener('click',f2Click,false);
brect.addEventListener('mouseover',f2Over,false);
brect.addEventListener('mouseout',f2Out,false);
var icon = this.document.createElementNS(SVGNS,'path');
icon.setAttribute('class','trc-buttonIcon');
icon.setAttribute('d','M '+(ix-4)+' '+iy+' L '+(ix+4)+' '+iy+'M '+ix+' '+(iy-4)+' L '+(ix+4)+' '+iy+' '+ix+' '+(iy+4));
scrollGroup.appendChild(icon);
icon.addEventListener('click',f2Click,false);
icon.addEventListener('mouseover',f2Over,false);
icon.addEventListener('mouseout',f2Out,false);
var cellRect = this.document.createElementNS(SVGNS,'rect');
cellRect.setAttribute('class','trc-cellBackground');
cellRect.setAttribute('x',btnWid);
cellRect.setAttribute('y',0);
cellRect.setAttribute('width',width>btnWid*2?(width-(btnWid*2)):0);
cellRect.setAttribute('height',cellHeight);
timeCellGroup.appendChild(cellRect);
var labelFreq = 1;
if (cellWidth < 75) {
switch (this.timeScale) {
case 'years':
default:
labelFreq = 5;
break;
case 'months':
labelFreq = 3;
if (cellWidth < 30) {
labelFreq = 12;
}
if (cellWidth < 12) {
labelFreq = 24;
}
break;
case 'days':
labelFreq = 7;
if (cellWidth < 25) {
labelFreq = 14;
}
if (cellWidth < 10) {
labelFreq = 60;
}
break;
case 'hours':
labelFreq = 3;
if (cellWidth < 25) {
labelFreq = 6;
}
break;
}
}
if (cellWidth>2) {
for (var unit = 0; unit < units.length-1; unit++) {
var info = units[unit];
var x = ((info.secs-startSecs) * pixPerSec) + btnWid;
var x2 = ((units[unit+1].secs-startSecs) * pixPerSec) + btnWid;
var cWidth = x2-x;
if (cWidth<=0) {
continue;
}
switch (this.timeScale) {
case 'years':
default:
caption = unit;
break;
case 'months':
var year = parseInt(Math.floor(unit/12)) + 1900;
caption = _zenResource['zenMonthShortNames'].split(',')[(unit%12)];
if ((unit%12==0||unit%12==6)||(unit==startUnits)) {
caption += ('-' + (year));
}
break;
case 'days':
var d = new Date(1900,0,1,0,0,0,0);
d.setDate(this._date1900.getDate() + Math.floor(unit));
caption = zenDateToString(d,false,this.dateFormat);
break;
case 'hours':
var hours = unit%24;
if (this.timeNotation=='24h') {
hours = (hours<10) ? ('0'+hours) : hours;
caption = hours+':00';
}
else {
var post = hours>=12 ? 'pm' : 'am';
hours = (hours==0) ? 12 : (hours>12) ? hours-12 : hours;
caption = hours+post;
}
break;
}
var tick = this.document.createElementNS(SVGNS,'line');
tick.setAttribute('class','trc-majorTick');
tick.setAttribute('x1',x);
tick.setAttribute('x2',x);
if (unit%labelFreq==0) {
tick.setAttribute('y1',cellHeight-majorHeight);
tick.setAttribute('y2',cellHeight);
}
else {
tick.setAttribute('y1',cellHeight-majorHeight);
tick.setAttribute('y2',cellHeight-majorHeight+minorHeight);
}
timeCellGroup.appendChild(tick);
if (unit%labelFreq==0 && info.caption) {
var lblText = this.document.createElementNS(SVGNS,'text');
lblText.setAttribute('class','trc-tickLabel');
lblText.setAttribute('x',x+4);
lblText.setAttribute('y',cellHeight-3);
var textNode = this.document.createTextNode(info.caption);
lblText.appendChild(textNode);
timeCellGroup.appendChild(lblText);
}
var minorCount = labelFreq==1?info.minorTicks:0;
if (minorCount>1) {
var freq = Math.floor(10 / (cWidth/minorCount)) + 1;
for (var j = 1; j < minorCount; j++) {
if ((j%freq)==0) {
var xm = x + (j*(cWidth/minorCount));
var tick = this.document.createElementNS(SVGNS,'line');
tick.setAttribute('class','trc-minorTick');
tick.setAttribute('x1',xm);
tick.setAttribute('x2',xm);
tick.setAttribute('y1',cellHeight-majorHeight);
tick.setAttribute('y2',cellHeight-majorHeight+minorHeight);
timeCellGroup.appendChild(tick);
}
}
}
var unitRect = this.document.createElementNS(SVGNS,'rect');
unitRect.setAttribute('class','trc-cellRect');
unitRect.setAttribute('id',this.makeId('rect_'+info.unit));
unitRect.setAttribute('x',x);
unitRect.setAttribute('y',0);
unitRect.setAttribute('width',cWidth);
unitRect.setAttribute('height',cellHeight);
timeCellRectGroup.appendChild(unitRect);
var fClick = new Function('evt','return zenPage.getComponent('+this.index+').unitRectClick(evt,'+info.unit+');')
var fOver = new Function('evt','return zenPage.getComponent('+this.index+').unitRectOver(evt,'+info.unit+');')
var fOut = new Function('evt','return zenPage.getComponent('+this.index+').unitRectOut(evt,'+info.unit+');')
unitRect.addEventListener('click',fClick,false);
unitRect.addEventListener('mouseover',fOver,false);
unitRect.addEventListener('mouseout',fOut,false);
}
}
var plate = this.document.createElementNS(SVGNS,'rect');
plate.setAttribute('class','trc-backingRect');
plate.setAttribute('x',0);
plate.setAttribute('y',0);
plate.setAttribute('width',btnWid);
plate.setAttribute('height',cellHeight);
timeCellGroup.appendChild(plate);
var plate = this.document.createElementNS(SVGNS,'rect');
plate.setAttribute('class','trc-backingRect');
plate.setAttribute('x',width-btnWid);
plate.setAttribute('y',0);
plate.setAttribute('width',btnWid);
plate.setAttribute('height',cellHeight);
timeCellGroup.appendChild(plate);
var overBefore = this.document.createElementNS(SVGNS,'rect');
overBefore.setAttribute('class','trc-cellOverlay');
overBefore.setAttribute('x',btnWid);
overBefore.setAttribute('y',0);
overBefore.setAttribute('width',0);
overBefore.setAttribute('height',cellHeight);
timeCellGroup.appendChild(overBefore);
this._overBefore = overBefore;
var overAfter = this.document.createElementNS(SVGNS,'rect');
overAfter.setAttribute('class','trc-cellOverlay');
overAfter.setAttribute('x',thumbX+thumbWid);
overAfter.setAttribute('y',0);
overAfter.setAttribute('width',0);
overAfter.setAttribute('height',cellHeight);
timeCellGroup.appendChild(overAfter);
this._overAfter = overAfter;
var outline = this.document.createElementNS(SVGNS,'path');
outline.setAttribute('class','trc-cellOutline');
timeCellGroup.appendChild(outline);
this._outline = outline;
var grabber1 = this.document.createElementNS(SVGNS,'rect');
grabber1.setAttribute('class','trc-grabber');
grabber1.setAttribute('x',thumbX-4);
grabber1.setAttribute('y',3);
grabber1.setAttribute('rx',5);
grabber1.setAttribute('width',8);
grabber1.setAttribute('height',cellHeight-6);
timeCellRectGroup.appendChild(grabber1);
this._grabber1 = grabber1;
grabber1.addEventListener('mouseover',new Function('evt','evt.target.setAttribute("class","trc-grabberHover");'),false);
grabber1.addEventListener('mouseout',new Function('evt','evt.target.setAttribute("class","trc-grabber");'),false);
grabber1.addEventListener('mousedown',this._dragGrabber1Func,false);
var grabber2 = this.document.createElementNS(SVGNS,'rect');
grabber2.setAttribute('class','trc-grabber');
grabber2.setAttribute('x',thumbX+thumbWid-4);
grabber2.setAttribute('y',3);
grabber2.setAttribute('rx',5);
grabber2.setAttribute('width',8);
grabber2.setAttribute('height',cellHeight-6);
timeCellRectGroup.appendChild(grabber2);
this._grabber2 = grabber2;
grabber2.addEventListener('mouseover',new Function('evt','evt.target.setAttribute("class","trc-grabberHover");'),false);
grabber2.addEventListener('mouseout',new Function('evt','evt.target.setAttribute("class","trc-grabber");'),false);
grabber2.addEventListener('mousedown',this._dragGrabber2Func,false);
var tcy = height - cellHeight - scrollHgt;
timeCellGroup.setAttribute('transform','translate(0,'+tcy+')');
this.svgGroup.appendChild(timeCellGroup);
timeCellRectGroup.setAttribute('transform','translate(0,'+tcy+')');
this.svgGroup.appendChild(timeCellRectGroup);
var sy = height - scrollHgt;
scrollGroup.setAttribute('transform','translate(0,'+sy+')');
this.svgGroup.appendChild(scrollGroup);
if (this.onconfig) {
var g = this.document.createElementNS(SVGNS,'g');
g.setAttribute('transform','translate(11,5) scale(0.03, -0.03)');
timeCellRectGroup.appendChild(g);
var gear = this.document.createElementNS(SVGNS,'path');
gear.setAttribute('d','M 0 0 c0 -47 -49 -74 -90 -50 -49 28 -96 -17 -60 -58 16 -18 17 -26 7 -48 -14 -33 -26 -42 -54 -42 -20 0 -23 -5 -23 -40 0 -35 3 -40 23 -40 34 0 47 -13 53 -51 4 -25 1 -39 -10 -48 -14 -12 -14 -15 1 -37 17 -27 45 -31 65 -10 10 10 20 11 43 3 35 -12 45 -24 45 -54 0 -20 5 -23 40 -23 35 0 40 3 40 23 0 28 9 40 42 54 22 10 30 9 49 -8 12 -10 23 -19 25 -19 2 0 15 12 29 26 25 25 25 25 6 52 -29 42 -5 91 47 92 19 0 22 5 22 40 0 35 -3 40 -22 40 -30 0 -41 9 -55 42 -10 22 -9 30 7 51 17 22 18 26 4 45 -17 25 -49 28 -70 7 -12 -12 -20 -12 -42 -2 -33 14 -42 25 -42 55 0 19 -5 22 -40 22 -35 0 -40 -3 -40 -22z m86 -144 c40 -19 66 -70 58 -113 -6 -27 -46 -80 -63 -82 -3 0 -17 -2 -29 -5 -36 -6 -89 23 -106 60 -24 50 -7 109 40 137 33 20 62 21 100 3z');
gear.setAttribute('class','trc-gear');
g.appendChild(gear);
var evtRect = this.document.createElementNS(SVGNS,'rect');
evtRect.setAttribute('x',-350);
evtRect.setAttribute('y',-600);
evtRect.setAttribute('width',btnWid/0.03);
evtRect.setAttribute('height',btnWid/0.03);
evtRect.setAttribute('style','fill:transparent; stroke:none;');
g.appendChild(evtRect);
var gClick = new Function('evt','return zenPage.getComponent('+this.index+').onconfigHandler();');
evtRect.addEventListener('click',gClick,false);
}
this._startSecs = startSecs;
this._endSecs = endSecs;
this._plotWidth = plotWidth;
this._spanSecs  = spanSecs;
this._pixPerSec = pixPerSec;
this.updateScrollbar();
}

self._ZEN_SVGComponent_timeRangeControl_reset = function() {
this.render();
}

self._ZEN_SVGComponent_timeRangeControl_scrollBtnClick = function(evt,which) {
evt.preventDefault();
if (this.startRange && this.endRange) {
var startDate = zenStringToDate(this.startRange);
var endDate = zenStringToDate(this.endRange);
var delta = (this._timeDelta ? this._timeDelta : 0) * 1000;
if (which==1) {
startDate.setTime(startDate.getTime()-delta);
endDate.setTime(endDate.getTime()-delta);
}
else {
startDate.setTime(startDate.getTime()+delta);
endDate.setTime(endDate.getTime()+delta);
}
this.startRange = zenDateToString(startDate);
this.endRange = zenDateToString(endDate);
this.updateScrollbar();
this.onchangeHandler(true,'translate');
}
}

self._ZEN_SVGComponent_timeRangeControl_scrollBtnOut = function(evt,which) {
evt.stopPropagation();
var btn = this.findSVGElement('btn'+which);
if (btn) {
btn.setAttribute('class','trc-buttonRect');
}
}

self._ZEN_SVGComponent_timeRangeControl_scrollBtnOver = function(evt,which) {
evt.stopPropagation();
var btn = this.findSVGElement('btn'+which);
if (btn) {
btn.setAttribute('class','trc-buttonRectHover');
}
}

self._ZEN_SVGComponent_timeRangeControl_setProperty = function(property,value,value2) {
switch(property) {
case 'width':
case 'height':
return this.invokeSuper('setProperty',arguments);
case 'startTime':
case 'endTime':
case 'dateFormat':
case 'timeNotation':
case 'thumbStyle':
this[property] = value;
this.render();
break;
case 'startRange':
case 'endRange':
this[property] = value;
this.updateScrollbar();
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_SVGComponent_timeRangeControl_setTimeRange = function(startRange,endRange) {
if (!endRange) {
startRange = startRange ? (parseInt(startRange)==startRange?startRange+'-01-01':startRange) : startRange;
var endRange = this.endRange;
endRange = endRange ? (parseInt(endRange)==endRange?endRange+'-12-31':endRange) : endRange;
var startDate = zenStringToDate(startRange);
var endDate = zenStringToDate(endRange);
startDate = startDate ? startDate : new Date(2000,0,1,0,0,0,0);
endDate = endDate ? endDate : new Date(startDate.getFullYear(),11,31,0,0,0,0);
var delta = endDate-startDate;
startDate.setTime(startDate.getTime()+delta);
endRange = zenDateToString(startDate);
}
this.startRange = startRange;
this.endRange = endRange;
this.render();
}

self._ZEN_SVGComponent_timeRangeControl_unitRectClick = function(evt,which) {
switch(this.timeScale) {
case 'years':
this.startRange = which + '-01-01';
this.endRange = which + '-12-31';
break;
case 'months':
var year = parseInt(Math.floor(which/12)) + 1900;
var month = which%12;
var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
if ((year%4==0) && !(year%100==0 && year%400!=0)) {
daysInMonth[1] = 29;
}
var dmonth = month + 1;
var dday = 1;
this.startRange = year+'-'+((dmonth<10)?'0'+dmonth:dmonth)+'-'+((dday<10)?'0'+dday:dday);
var dday = daysInMonth[month];
this.endRange = year+'-'+((dmonth<10)?'0'+dmonth:dmonth)+'-'+((dday<10)?'0'+dday:dday);
break;
case 'days':
var day = which;
var d = new Date(1900,0,1,0,0,0,0);
d.setDate(this._date1900.getDate() + Math.floor(day));
this.startRange = zenDateToString(d);
var d = new Date(1900,0,1,0,0,0,0);
d.setDate(this._date1900.getDate() + Math.floor(day) + 1);
this.endRange = zenDateToString(d);
break;
case 'hours':
var day = Math.floor(which / 24);
var hour = which % 24;
var d = new Date(1900,0,1,0,0,0,0);
d.setDate(this._date1900.getDate() + Math.floor(day));
this.startRange = zenDateToString(d) + ' ' + ((hour<10)?'0'+hour:hour) + ':00';
this.endRange = zenDateToString(d) + ' ' + ((hour<10)?'0'+hour:hour) + ':59';
break;
default:
break;
}
this.render();
this.onchangeHandler(true,'translate');
}

self._ZEN_SVGComponent_timeRangeControl_unitRectOut = function(evt,which) {
evt.stopPropagation();
if (!this._inDrag) {
var rect = this.findSVGElement('rect_'+which);
if (rect) {
rect.setAttribute('class','trc-cellRect');
}
}
}

self._ZEN_SVGComponent_timeRangeControl_unitRectOver = function(evt,which) {
evt.stopPropagation();
if (!this._inDrag) {
var rect = this.findSVGElement('rect_'+which);
if (rect) {
rect.setAttribute('class','trc-cellRectHover');
}
}
}

self._ZEN_SVGComponent_timeRangeControl_updateScrollbar = function() {
var width = parseInt(this.width);
var height = parseInt(this.height);
if (width <=0) return;
if (height <=0) return;
var btnWid = 24;
var scrollHgt = 16;
var cellHeight = 25;
var cellWidth = this._cellWidth;
var startRange = this.startRange;
var endRange = this.endRange;
var startRangeDate = zenStringToDate(startRange);
var endRangeDate = zenStringToDate(endRange);
if (!startRangeDate || !endRangeDate) {
var startX = btnWid;
var endX = btnWid;
}
else {
var startUnits = this._startUnits;
var endUnits = this._endUnits;
var	timeUnits = endUnits - startUnits + 1;
if (this.timeScale=='hours') {
var t = startRange ? parseInt(startRange.split(' ')[1]) : null;
var startHours = t&&!isNaN(t) ? t : 0;
var t = endRange ? parseInt(endRange.split(' ')[1]) : null;
var endHours = t&&!isNaN(t) ? t : 0;
if (startHours) {
startRangeDate.setTime(startRangeDate.getTime()+(startHours*3600*1000));
}
if (endHours) {
endRangeDate.setTime(endRangeDate.getTime()+(endHours*3600*1000));
}
}
var pixPerSec = this._pixPerSec;
var offset = this._startSecs;
var startX = pixPerSec * ((startRangeDate.getTime()/1000) - offset) + btnWid;
var endX = pixPerSec * ((endRangeDate.getTime()/1000) - offset) + btnWid;
startX = startX > btnWid ? startX : btnWid;
endX = endX < (width-btnWid) ? endX : width-btnWid;
endX = endX > startX ? endX : startX;
}
var thumbX = startX;
var thumbWid = endX - startX;
thumbWid = thumbWid > 0 ? thumbWid : 0;
this._thumbPos = thumbX;
this._thumbWid = thumbWid;
if (this._thumb) {
this._thumb.setAttribute('x',thumbX);
this._thumb.setAttribute('width',thumbWid<10?10:thumbWid);
}
if (this._ridges) {
for (var r = 0; r < this._ridges.length; r++) {
this._ridges[r].setAttribute('x',thumbX + thumbWid/2 + ((r-1)*3));
if (thumbWid < 10) {
this._ridges[r].setAttribute('style','display:none;');
}
else {
this._ridges[r].setAttribute('style','');
}
}
}
if (this._overBefore) {
this._overBefore.setAttribute('x',0);
this._overBefore.setAttribute('width',thumbX);
}
if (this._overAfter) {
this._overAfter.setAttribute('x',thumbX+thumbWid);
this._overAfter.setAttribute('y',0);
this._overAfter.setAttribute('width',width>(thumbX+thumbWid)?width-(thumbX+thumbWid):0);
}
if (this._outline) {
var outline = 'M '+0+','+0+' L '+thumbX+','+0;
outline += ' '+thumbX+','+(cellHeight)+' '+(thumbX+thumbWid)+','+(cellHeight);
outline += ' '+(thumbX+thumbWid)+','+0+' '+(width)+','+0;
this._outline.setAttribute('d',outline);
}
if (this._grabber1) {
this._grabber1.setAttribute('x',thumbX-3);
}
if (this._grabber2) {
this._grabber2.setAttribute('x',thumbX+thumbWid-3);
}
}
self._ZEN_SVGComponent_timeRangeControl__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_svgComponent');
	_ZEN_SVGComponent_timeRangeControl.prototype = zenCreate('_ZEN_SVGComponent_svgComponent',-1);
	var p = _ZEN_SVGComponent_timeRangeControl.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_timeRangeControl;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_svgComponent) ? zenMaster._ZEN_SVGComponent_svgComponent.prototype:_ZEN_SVGComponent_svgComponent.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.timeRangeControl';
	p._type = 'timeRangeControl';
	p.serialize = _ZEN_SVGComponent_timeRangeControl_serialize;
	p.getSettings = _ZEN_SVGComponent_timeRangeControl_getSettings;
	p.dragGrabber = _ZEN_SVGComponent_timeRangeControl_dragGrabber;
	p.dragThumb = _ZEN_SVGComponent_timeRangeControl_dragThumb;
	p.getTimeForPos = _ZEN_SVGComponent_timeRangeControl_getTimeForPos;
	p.onchangeHandler = _ZEN_SVGComponent_timeRangeControl_onchangeHandler;
	p.onconfigHandler = _ZEN_SVGComponent_timeRangeControl_onconfigHandler;
	p.renderContents = _ZEN_SVGComponent_timeRangeControl_renderContents;
	p.reset = _ZEN_SVGComponent_timeRangeControl_reset;
	p.scrollBtnClick = _ZEN_SVGComponent_timeRangeControl_scrollBtnClick;
	p.scrollBtnOut = _ZEN_SVGComponent_timeRangeControl_scrollBtnOut;
	p.scrollBtnOver = _ZEN_SVGComponent_timeRangeControl_scrollBtnOver;
	p.setProperty = _ZEN_SVGComponent_timeRangeControl_setProperty;
	p.setTimeRange = _ZEN_SVGComponent_timeRangeControl_setTimeRange;
	p.unitRectClick = _ZEN_SVGComponent_timeRangeControl_unitRectClick;
	p.unitRectOut = _ZEN_SVGComponent_timeRangeControl_unitRectOut;
	p.unitRectOver = _ZEN_SVGComponent_timeRangeControl_unitRectOver;
	p.updateScrollbar = _ZEN_SVGComponent_timeRangeControl_updateScrollbar;
}

self._zenClassIdx['barChart'] = '_ZEN_SVGComponent_barChart';
self._ZEN_SVGComponent_barChart = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_barChart__init(this,index,id);}
}

self._ZEN_SVGComponent_barChart__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_chart__init) ?zenMaster._ZEN_SVGComponent_chart__init(o,index,id):_ZEN_SVGComponent_chart__init(o,index,id);
	o.chartPivot = false;
	o.chartStacked = false;
	o.controller = '';
	o.controllerId = '';
	o.ongetcontroller = '';
	o.onnotifyView = '';
	o.plotToEdge = false;
	o.scrollLeft = '0';
}
function _ZEN_SVGComponent_barChart_serialize(set,s)
{
	var o = this;s[0]='3271590681';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.appearance;s[7]=(o.autoScaleText?1:0);s[8]=o.aux;s[9]=o.axisLineStyle;s[10]=o.axisTitleStyle;s[11]=o.backgroundStyle;s[12]=o.bandLower;s[13]=o.bandLowerStyle;s[14]=o.bandUpper;s[15]=o.bandUpperStyle;s[16]=o.baseLineStyle;s[17]=o.borderOffset;s[18]=o.borderRadius;s[19]=o.borderStyle;s[20]=(o.boundless?1:0);s[21]=(o.chartPivot?1:0);s[22]=(o.chartStacked?1:0);s[23]=o.controller;s[24]=o.controllerId;s[25]=o.currMultiple;s[26]=o.currYAxis;s[27]=o.endTime;s[28]=o.gridStyle;s[29]=(o.hasZoom?1:0);s[30]=o.height;s[31]=(o.hidden?1:0);s[32]=o.hzZoomStep;s[33]=o.indicatorStyle;s[34]=(o.indicatorsVisible?1:0);s[35]=o.labelStyle;s[36]=(o.labelsVisible?1:0);s[37]=o.legendHeight;s[38]=o.legendLabelStyle;s[39]=o.legendRectStyle;s[40]=o.legendStyle;s[41]=o.legendTitle;s[42]=o.legendVisible;s[43]=o.legendWidth;s[44]=o.legendX;s[45]=o.legendY;s[46]=o.lineStyle;s[47]=o.marginBottom;s[48]=o.marginLeft;s[49]=o.marginRight;s[50]=o.marginTop;s[51]=o.markerScale;s[52]=o.markerShapes;s[53]=o.markerStyle;s[54]=(o.markersVisible?1:0);s[55]=o.maxLabelLen;s[56]=o.msgIfNoData;s[57]=o.multipleTitleStyle;s[58]=o.noDataFill;s[59]=o.noDataOpacity;s[60]=o.noDataStroke;s[61]=o.onclick;s[62]=o.onelementClick;s[63]=o.ongetData;s[64]=o.ongetLabelX;s[65]=o.ongetLabelY;s[66]=o.ongetSeriesColor;s[67]=o.ongetTimeEvents;s[68]=o.ongetcontroller;s[69]=o.onnotifyView;s[70]=o.onrenderData;s[71]=o.onrenderPlotArea;s[72]=o.onshowTooltip;s[73]=o.onupdate;s[74]=o.plotAreaStyle;s[75]=o.plotEdgeStyle;s[76]=o.plotStyle;s[77]=(o.plotToEdge?1:0);s[78]=o.position;s[79]=o.preserveAspectRatio;s[80]=o.renderFlag;s[81]=o.scrollButtonStyle;s[82]=o.scrollLeft;s[83]=o.selectedItem;s[84]=o.selectedItemStyle;s[85]=o.selectedSeries;s[86]=o.seriesColorScheme;s[87]=o.seriesColors;s[88]=o.seriesColorsOverride;s[89]=o.seriesCount;s[90]=o.seriesNames;s[91]=o.seriesNumber;s[92]=o.seriesSize;s[93]=o.seriesYAxes;s[94]=(o.showMultiples?1:0);s[95]=o.startTime;s[96]=o.stripeStyle;s[97]=(o.stripesVisible?1:0);s[98]=o.subtitle;s[99]=o.subtitleStyle;s[100]=o.tag;s[101]=o.textSize;s[102]=(o.timeBased?1:0);s[103]=o.title;s[104]=o.titleAlign;s[105]=o.titleBoxStyle;s[106]=o.titleImage;s[107]=o.titleImageStyle;s[108]=o.titleStyle;s[109]=o.titleX;s[110]=o.titleY;s[111]=o.tooltipRectStyle;s[112]=o.tuple;s[113]=o.unselectedItemStyle;s[114]=o.valueBoxStyle;s[115]=o.valueLabelFormat;s[116]=o.valueLabelStyle;s[117]=(o.valueLabelsVisible?1:0);s[118]=o.viewBoxHeight;s[119]=o.viewBoxWidth;s[120]=(o.visible?1:0);s[121]=(o.warnIfNoData?1:0);s[122]=o.width;s[123]=o.x;s[124]=set.addObject(o.xAxis,'xAxis');s[125]=o.y;s[126]=set.addObject(o.yAxis,'yAxis');s[127]=set.serializeList(o,o.yAxisList,true,'yAxisList');
}
function _ZEN_SVGComponent_barChart_getSettings(s)
{
	s['name'] = 'string';
	s['chartPivot'] = 'boolean';
	s['chartStacked'] = 'boolean';
	s['controllerId'] = 'id';
	s['ongetcontroller'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_barChart_connectToController = function() {
this.controller = '';
if (!zenIsMissing(this.controllerId)) {
if (this.composite) {
this.controller = this.composite.getChildById(this.controllerId);
}
else {
this.controller = zenPage.getComponentById(this.controllerId);
}
if (this.controller && this.controller.register) {
this.controller.register(this);
}
else {
alert('ZEN: Unable to connect component to dataController (' + this.id + ').');
}
if (this.controller) {
if ('' == this.controller.modelError) {
this.controller.loadModel(false);
}
}
}
}

self._ZEN_SVGComponent_barChart_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._ZEN_SVGComponent_barChart_getChartElementStyle = function(series,item) {
var type = this.getSeriesType(series);
if (type=='bar') {
return this.plotStyle;
}
return this.markerStyle;
}

self._ZEN_SVGComponent_barChart_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._ZEN_SVGComponent_barChart_getSeriesType = function(series) {
return 'bar';
}

self._ZEN_SVGComponent_barChart_getXAxisType = function() {
return this.chartPivot ? 'value' : 'category';
}

self._ZEN_SVGComponent_barChart_getYAxisType = function() {
return this.chartPivot ? 'category' : 'value';
}

self._ZEN_SVGComponent_barChart_hasMultiples = function() {
return this.showMultiples;
}

self._ZEN_SVGComponent_barChart_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_barChart_plotTargetForSeries = function(group,sno,data) {
var items = this.getSeriesSize();
var is3D = this.is3D();
var adj3D = is3D ? 3 : 0;
var scaleX = this._scaleX ? this._scaleX : 1;
var scaleY = this._scaleY ? this._scaleY : 1;
var barwid, barhgt;
if (items > 0) {
if (!this.chartPivot) {
barwid = 0.9 * (this._plotWidth / items);
}
else {
barhgt = 0.9 * (this._plotHeight / items);
}
var color = this.getSeriesColor(sno);
var yAxisNo = this._yAxisForSeries[sno];
if (!this.chartPivot) {
var dx = this._plotWidth / items;
var adj = (dx/2);
var x = 0;
var base = 0;
var shift = -(barwid)/2;
if (isNaN(parseFloat(this._yBaseValue[yAxisNo]))) {
base = this._plotHeight;
}
else {
base = this.getPlotY(this._yBaseValue[yAxisNo],yAxisNo) - this._plotTop;
}
}
else {
var dy = this._plotHeight / items;
var adj = (dy/2);
var y = 0;
var base = 0;
var shift = -(barhgt)/2;
if (isNaN(parseFloat(this._xBaseValue))) {
base = 0;
}
else {
base = this.getPlotX(this._xBaseValue) - this._plotLeft;
}
}
for (var n = 0; n < items; n++) {
val = (null == data[sno]) ? 0 : ((null == data[sno][n]) ? 0 : parseFloat(data[sno][n]));
val = isNaN(val) ? 0 : val;
var bar = this.document.createElementNS(SVGNS,"rect");
bar.setAttribute("class","chart-seriesTarget");
if (!this.chartPivot) {
x += dx;
y = this.getPlotY(val,yAxisNo) - this._plotTop;
if (this.isTimeBased()) {
var time = this.getXLabelText(n);
x = this.getTimeX(time);
x = x===null ? 0 : x;
}
var top,hgt;
if (y <= base) {
top = y;
}
else {
top = base;
}
hgt = 3/scaleY;
bar.setAttribute("x",Math.round((x-adj+shift-adj3D)*scaleX)+0.5);
bar.setAttribute("y",Math.round((top+adj3D)*scaleY)+0.5);
bar.setAttribute("width",Math.round(barwid*scaleX));
bar.setAttribute("height",Math.round(hgt*scaleY));
}
else {
y += dy;
x = this.getPlotX(val) - this._plotLeft;
var left,wid;
if (x < base) {
left = base-x;
}
else {
left = x-base;
}
wid = 3/scaleX;
bar.setAttribute("x",Math.round((left-adj3D)*scaleX)+0.5);
bar.setAttribute("y",Math.round((y-adj+shift+adj3D)*scaleY)+0.5);
bar.setAttribute("width",Math.round(wid*scaleX));
bar.setAttribute("height",Math.round(barhgt*scaleY));
}
bar.setAttribute("fill",color);
group.appendChild(bar);
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementMouseOver(evt,'+sno+','+n+');');
bar.addEventListener('mouseover',f,false);
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementMouseOut(evt,'+sno+','+n+');');
bar.addEventListener('mouseout',f,false);
}
}
}

self._ZEN_SVGComponent_barChart_renderSeries = function(group) {
var x,y,val;
var scount = this.getSeriesCount();
var items = this.getSeriesSize();
var is3D = this.is3D();
var adj3D = is3D ? 3 : 0;
var seriesNumber = parseInt(this.seriesNumber);
if (!isNaN(seriesNumber)) {
scount = 1;
}
var scaleX = this._scaleX ? this._scaleX : 1;
var scaleY = this._scaleY ? this._scaleY : 1;
var multipleOffset = (this.currMultiple?this.currMultiple:0);
if (this.showMultiples) {
seriesNumber = this.currMultiple;
scount = 1;
}
var barMap = [];
var barSeriesCount = 0;
for (var s = 0; s < scount; s++) {
var plotType = this.getSeriesType(s+multipleOffset);
if (plotType=='bar') {
barMap[s] = barSeriesCount;
barSeriesCount++;
}
}
var yaList = this._yAxisForSeries;
var hasSelect = !zenIsMissing(this.selectedSeries) && !zenIsMissing(this.selectedItem) && (this.selectedSeries >= 0) && (this.selectedItem >= 0);
var barwid, barhgt;
var groupEdge;
if (is3D) {
groupEdge = this.document.createElementNS(SVGNS,"g");
group.appendChild(groupEdge);
}
var valueGroup;
if (this.valueLabelsVisible) {
valueGroup = this.document.createElementNS(SVGNS,"g");
group.appendChild(valueGroup);
}
if (items > 0) {
var barwid = 1;
if (barSeriesCount > 0) {
if (!this.chartPivot) {
if (this.chartStacked) {
barwid = 0.8 * (this._plotWidth / items);
}
else {
barwid = (0.8/barSeriesCount) * (this._plotWidth / items);
}
}
else {
if (this.chartStacked) {
barhgt = 0.8 * (this._plotHeight / items);
}
else {
barhgt = (0.8/barSeriesCount) * (this._plotHeight / items);
}
}
}
var data = new Array(scount);
if (!isNaN(seriesNumber)) {
data[0] = this.getSeriesData(seriesNumber);
}
else {
for (var s = 0; s < scount; s++) {
data[s] = this.getSeriesData(s);
}
}
if (is3D) {
var edgeArray = new Array(items);
barwid = barwid * 0.75;
}
var plotType = [];
for (var s = 0; s < scount; s++) {
plotType[s] = this.getSeriesType(s+multipleOffset);
}
for (var s = scount-1; s >=0; s--) {
if (plotType[s]=='area') {
var filled = true;
var hasEvents = false;
var hasMarkers =false;
var stacked = false;
this.plotLineForSeries(group,s,data,stacked,filled,hasMarkers,hasEvents);
}
}
for (var s = 0; s < scount; s++) {
if ((plotType[s]!='bar')) {
continue;
}
var color = this.getSeriesColor(s+multipleOffset);
var yAxisNo = this._yAxisForSeries[s+multipleOffset];
if (!this.chartPivot) {
var dx = this._plotWidth / items;
var adj = (dx/2);
var x = 0;
var base = 0;
var bs = barMap[s];
var shift = this.chartStacked ? -barwid/2 : ((bs * barwid) - (barSeriesCount*barwid)/2);
if (isNaN(parseFloat(this._yBaseValue[yAxisNo]))) {
base = this._plotHeight;
}
else {
base = this.getPlotY(this._yBaseValue[yAxisNo],yAxisNo) - this._plotTop;
}
}
else {
var dy = this._plotHeight / items;
var adj = (dy/2);
var y = 0;
var base = 0;
var bs = barMap[s];
var shift = this.chartStacked ? -barhgt/2 : ((bs * barhgt) - (barSeriesCount*barhgt)/2);
if (isNaN(parseFloat(this._xBaseValue))) {
base = 0;
}
else {
base = this.getPlotX(this._xBaseValue) - this._plotLeft;
}
}
for (var n = 0; n < items; n++) {
val = (null == data[s]) ? 0 : ((null == data[s][n]) ? 0 : parseFloat(data[s][n]));
val = isNaN(val) ? 0 : val;
/* JMD1125 plot negative bars below the line!
if (this.chartStacked && val < 0  && barSeriesCount>1) {
val = 0;
}
*/
var isNeg = (val<0);
if (this.chartStacked && s > 0) {
var dval = 0;
for (q = 0; q < s; q++) {
if (plotType[q]=='bar' && (yaList[q]==yAxisNo)) {
var v = (null == data[q]) ? 0 : ((null == data[q][n]) ? 0 : parseFloat(data[q][n]));
v = isNaN(v) ? 0 : v;
if ((isNeg && v < 0)||(!isNeg && v > 0)) {
dval += v;
}
}
}
if (!this.chartPivot) {
base = this.getPlotY(dval,yAxisNo) - this._plotTop;
}
else {
base = this.getPlotX(dval) - this._plotLeft;
}
val += dval;
}
var bar = this.document.createElementNS(SVGNS,"rect");
bar.setAttribute("class","chart-seriesBar");
if (is3D) {
var edgeSide = this.document.createElementNS(SVGNS,"path");
edgeSide.setAttribute("fill","#404040");
edgeSide.setAttribute("stroke","none");
var edgeSide2 = this.document.createElementNS(SVGNS,"path");
edgeSide2.setAttribute("class","chart-seriesBar");
edgeSide2.setAttribute("fill",color);
edgeSide2.setAttribute("fill-opacity","0.5");
edgeSide2.setAttribute("stroke","#404040");
var edgeTop = this.document.createElementNS(SVGNS,"path");
edgeTop.setAttribute("class","chart-seriesBar");
edgeTop.setAttribute("fill",color);
edgeTop.setAttribute("stroke","#404040");
if (!this.chartPivot) {
if (!this.chartStacked) {
var node = null;
if (s>0) {
node = edgeArray[n+1];
}
if (null == node) {
groupEdge.appendChild(edgeSide);
groupEdge.appendChild(edgeSide2);
groupEdge.appendChild(edgeTop);
}
else {
groupEdge.insertBefore(edgeSide2,node);
groupEdge.insertBefore(edgeSide,edgeSide2);
groupEdge.insertBefore(edgeTop,edgeSide);
}
if (0 == s) {
edgeArray[n] = edgeTop;
}
}
else {
groupEdge.appendChild(edgeSide);
groupEdge.appendChild(edgeSide2);
groupEdge.appendChild(edgeTop);
}
}
else {
if (!this.chartStacked) {
groupEdge.insertBefore(edgeSide2,edgeArray[n]?edgeArray[n]:groupEdge.firstChild);
groupEdge.insertBefore(edgeSide,edgeSide2);
groupEdge.insertBefore(edgeTop,edgeSide);
edgeArray[n] = edgeTop;
}
else {
groupEdge.insertBefore(edgeSide2,edgeArray[n]?edgeArray[n]:groupEdge.firstChild);
groupEdge.insertBefore(edgeSide,edgeSide2);
if (s == barSeriesCount-1) {
groupEdge.insertBefore(edgeTop,edgeSide);
edgeArray[n] = edgeTop;
}
else {
edgeArray[n] = edgeSide;
}
}
}
}
if (!this.chartPivot) {
x += dx;
y = this.getPlotY(val,yAxisNo) - this._plotTop;
if (this.isTimeBased()) {
var time = this.getXLabelText(n);
x = this.getTimeX(time);
x = x===null ? 0 : x;
}
var top,hgt;
if (y <= base) {
top = y;
hgt = base-y;
}
else {
top = base;
hgt = y-base;
}
bar.setAttribute("x",(x-adj+shift-adj3D)*scaleX);
bar.setAttribute("y",(top+adj3D)*scaleY);
bar.setAttribute("width",barwid*scaleX);
bar.setAttribute("height",hgt*scaleY);
if (is3D) {
edgeTop.setAttribute("d",'M '+((x-adj+shift-adj3D)*scaleX)+' '+((top+adj3D)*scaleY)+' L '+((x-adj+shift)*scaleX)+' '+((top)*scaleY)+' '+((x-adj+shift+barwid)*scaleX)+' '+((top)*scaleY)+' '+((x-adj+shift+barwid-adj3D)*scaleX)+' '+((top+adj3D)*scaleY)+' z');
edgeSide.setAttribute("d",'M '+((x-adj+shift+barwid-adj3D)*scaleX)+' '+((top+adj3D)*scaleY)+' L '+((x-adj+shift+barwid)*scaleX)+' '+((top)*scaleY)+' '+((x-adj+shift+barwid)*scaleX)+' '+((top+hgt)*scaleY)+' '+((x-adj+shift+barwid-adj3D)*scaleX)+' '+((top+adj3D+hgt)*scaleY)+' z');
edgeSide2.setAttribute("d",'M '+((x-adj+shift+barwid-adj3D)*scaleX)+' '+((top+adj3D)*scaleY)+' L '+((x-adj+shift+barwid)*scaleX)+' '+((top)*scaleY)+' '+((x-adj+shift+barwid)*scaleX)+' '+((top+hgt)*scaleY)+' '+((x-adj+shift+barwid-adj3D)*scaleX)+' '+((top+adj3D+hgt)*scaleY)+' z');
}
}
else {
y += dy;
x = this.getPlotX(val) - this._plotLeft;
var left,wid;
if (x <= base) {
left = x;
wid = base-x;
}
else {
left = base;
wid = x-base;
}
bar.setAttribute("x",(left-adj3D)*scaleX);
bar.setAttribute("y",(y-adj+shift+adj3D)*scaleY);
bar.setAttribute("width",wid*scaleX);
bar.setAttribute("height",barhgt*scaleY);
if (is3D) {
edgeTop.setAttribute("d",'M '+((left-adj3D+wid)*scaleX)+' '+((y-adj+shift+adj3D)*scaleY)+' L '+((left+wid)*scaleX)+' '+((y-adj+shift)*scaleY)+' '+((left+wid)*scaleX)+' '+((y-adj+shift+barhgt)*scaleY)+' '+((left-adj3D+wid)*scaleX)+' '+((y-adj+shift+adj3D+barhgt)*scaleY)+' z');
edgeSide.setAttribute("d",'M '+((left-adj3D)*scaleX)+' '+((y-adj+shift+adj3D)*scaleY)+' L '+((left)*scaleX)+' '+((y-adj+shift)*scaleY)+' '+((left+wid)*scaleX)+' '+((y-adj+shift)*scaleY)+' '+((left+wid-adj3D)*scaleX)+' '+((y-adj+shift+adj3D)*scaleY)+' z');
edgeSide2.setAttribute("d",'M '+((left-adj3D)*scaleX)+' '+((y-adj+shift+adj3D)*scaleY)+' L '+((left)*scaleX)+' '+((y-adj+shift)*scaleY)+' '+((left+wid)*scaleX)+' '+((y-adj+shift)*scaleY)+' '+((left+wid-adj3D)*scaleX)+' '+((y-adj+shift+adj3D)*scaleY)+' z');
}
}
bar.setAttribute("fill",color);
group.appendChild(bar);
if (this.valueLabelsVisible) {
var fSz = 10;
var align = 'middle';
var lval = (null == data[s]) ? '' : ((null == data[s][n] || ''===data[s][n]) ? '' : parseFloat(data[s][n]));
var value = '';
if (!isNaN(parseFloat(lval))) {
var format = this.valueLabelFormat;
format = format ? format : ((Math.floor(lval)!=lval)?'#,#.##':'#,#');
value = zenFormatNumber(lval,format);
}
var cbx = parseFloat(bar.getAttribute("x"));
var cby = parseFloat(bar.getAttribute("y"));
var cbw = parseFloat(bar.getAttribute("width"));
var cbh = parseFloat(bar.getAttribute("height"));
var cbxMid = cbx + cbw/2;
var cbyMid = cby + cbh/2;
var box = this.document.createElementNS(SVGNS,"rect");
box.setAttribute("class","chart-valueLabelBox");
box.setAttribute("style",this.valueBoxStyle);
valueGroup.appendChild(box);
var tg = this.createSVGTextNode(value,fSz,false,align,0,valueGroup);
var textNode = tg.firstChild;
textNode.setAttribute("class","chart-valueLabel");
textNode.setAttribute("style",this.valueLabelStyle);
var bbox = zenGetBBox(textNode);
textNode.setAttribute("text-anchor","middle");
textNode.setAttribute("x",cbxMid);
textNode.setAttribute("y",cbyMid + ((bbox.height/2)*0.8));
box.setAttribute("x", cbxMid - (bbox.width/2));
box.setAttribute("y", cbyMid - (bbox.height/2));
box.setAttribute("rx", 3);
box.setAttribute("width", bbox.width*1.1);
box.setAttribute("height", bbox.height*1.2);
}
if (hasSelect && s == this.selectedSeries && n == this.selectedItem) {
bar.setAttribute("style",this.plotStyle + this.selectedItemStyle);
if (is3D) {
edgeTop.setAttribute("style",this.plotStyle + this.selectedItemStyle);
edgeSide2.setAttribute("style",this.plotStyle + this.selectedItemStyle);
}
}
else {
bar.setAttribute("style",this.plotStyle);
if (is3D) {
edgeTop.setAttribute("style",this.plotStyle);
edgeSide2.setAttribute("style",this.plotStyle);
}
}
var sno = isNaN(seriesNumber) ? s : seriesNumber;
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementClickHandler(evt,'+sno+','+n+');');
bar.addEventListener('click',f,false);
bar.setAttribute('id',this.makeId('el_' + sno + '_' + n));
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementMouseOver(evt,'+sno+','+n+');');
bar.addEventListener('mouseover',f,false);
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementMouseOut(evt,'+sno+','+n+');');
bar.addEventListener('mouseout',f,false);
}
}
for (var s = 0; s < scount; s++) {
if (plotType[s]=='target') {
this.plotTargetForSeries(group,s,data);
}
else if (plotType[s]=='line') {
var filled = false;
var hasEvents = true;
var hasMarkers = this.markersVisible;
var stacked = false;
this.plotLineForSeries(group,s,data,stacked,filled,hasMarkers,hasEvents);
}
}
}
if (this.valueLabelsVisible) {
group.removeChild(valueGroup);
group.appendChild(valueGroup);
}
}

self._ZEN_SVGComponent_barChart_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_barChart_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._ZEN_SVGComponent_barChart_setProperty = function(property,value,value2) {
switch(property) {
case 'chartPivot':
case 'chartStacked':
this[property] = value ? true : false;
this.render();
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_SVGComponent_barChart_useSumForRange = function() {
return this.chartStacked;
}
self._ZEN_SVGComponent_barChart__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_chart');
	_ZEN_SVGComponent_barChart.prototype = zenCreate('_ZEN_SVGComponent_chart',-1);
	var p = _ZEN_SVGComponent_barChart.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_barChart;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_chart) ? zenMaster._ZEN_SVGComponent_chart.prototype:_ZEN_SVGComponent_chart.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.barChart';
	p._type = 'barChart';
	p.serialize = _ZEN_SVGComponent_barChart_serialize;
	p.getSettings = _ZEN_SVGComponent_barChart_getSettings;
	p.connectToController = _ZEN_SVGComponent_barChart_connectToController;
	p.disconnectFromController = _ZEN_SVGComponent_barChart_disconnectFromController;
	p.getChartElementStyle = _ZEN_SVGComponent_barChart_getChartElementStyle;
	p.getController = _ZEN_SVGComponent_barChart_getController;
	p.getSeriesType = _ZEN_SVGComponent_barChart_getSeriesType;
	p.getXAxisType = _ZEN_SVGComponent_barChart_getXAxisType;
	p.getYAxisType = _ZEN_SVGComponent_barChart_getYAxisType;
	p.hasMultiples = _ZEN_SVGComponent_barChart_hasMultiples;
	p.notifyView = _ZEN_SVGComponent_barChart_notifyView;
	p.plotTargetForSeries = _ZEN_SVGComponent_barChart_plotTargetForSeries;
	p.renderSeries = _ZEN_SVGComponent_barChart_renderSeries;
	p.sendEventToController = _ZEN_SVGComponent_barChart_sendEventToController;
	p.setControllerId = _ZEN_SVGComponent_barChart_setControllerId;
	p.setProperty = _ZEN_SVGComponent_barChart_setProperty;
	p.useSumForRange = _ZEN_SVGComponent_barChart_useSumForRange;
}

self._zenClassIdx['bubbleChart'] = '_ZEN_SVGComponent_bubbleChart';
self._ZEN_SVGComponent_bubbleChart = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_bubbleChart__init(this,index,id);}
}

self._ZEN_SVGComponent_bubbleChart__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_chart__init) ?zenMaster._ZEN_SVGComponent_chart__init(o,index,id):_ZEN_SVGComponent_chart__init(o,index,id);
	o.controller = '';
	o.controllerId = '';
	o.lowerLeftStyle = '';
	o.ongetcontroller = '';
	o.onnotifyView = '';
	o.opacity = '.75';
	o.radius = '3';
	o.scrollLeft = '0';
	o.showQuadrant = true;
	o.showRegression = false;
	o.tag = 'bubbleChart';
	o.upperRightStyle = '';
	o.xCenterValue = '';
	o.yCenterValue = '';
}
function _ZEN_SVGComponent_bubbleChart_serialize(set,s)
{
	var o = this;s[0]='2354617637';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.appearance;s[7]=(o.autoScaleText?1:0);s[8]=o.aux;s[9]=o.axisLineStyle;s[10]=o.axisTitleStyle;s[11]=o.backgroundStyle;s[12]=o.bandLower;s[13]=o.bandLowerStyle;s[14]=o.bandUpper;s[15]=o.bandUpperStyle;s[16]=o.baseLineStyle;s[17]=o.borderOffset;s[18]=o.borderRadius;s[19]=o.borderStyle;s[20]=(o.boundless?1:0);s[21]=o.controller;s[22]=o.controllerId;s[23]=o.currMultiple;s[24]=o.currYAxis;s[25]=o.endTime;s[26]=o.gridStyle;s[27]=(o.hasZoom?1:0);s[28]=o.height;s[29]=(o.hidden?1:0);s[30]=o.hzZoomStep;s[31]=o.indicatorStyle;s[32]=(o.indicatorsVisible?1:0);s[33]=o.labelStyle;s[34]=(o.labelsVisible?1:0);s[35]=o.legendHeight;s[36]=o.legendLabelStyle;s[37]=o.legendRectStyle;s[38]=o.legendStyle;s[39]=o.legendTitle;s[40]=o.legendVisible;s[41]=o.legendWidth;s[42]=o.legendX;s[43]=o.legendY;s[44]=o.lineStyle;s[45]=o.lowerLeftStyle;s[46]=o.marginBottom;s[47]=o.marginLeft;s[48]=o.marginRight;s[49]=o.marginTop;s[50]=o.markerScale;s[51]=o.markerShapes;s[52]=o.markerStyle;s[53]=(o.markersVisible?1:0);s[54]=o.maxLabelLen;s[55]=o.msgIfNoData;s[56]=o.multipleTitleStyle;s[57]=o.noDataFill;s[58]=o.noDataOpacity;s[59]=o.noDataStroke;s[60]=o.onclick;s[61]=o.onelementClick;s[62]=o.ongetData;s[63]=o.ongetLabelX;s[64]=o.ongetLabelY;s[65]=o.ongetSeriesColor;s[66]=o.ongetTimeEvents;s[67]=o.ongetcontroller;s[68]=o.onnotifyView;s[69]=o.onrenderData;s[70]=o.onrenderPlotArea;s[71]=o.onshowTooltip;s[72]=o.onupdate;s[73]=o.opacity;s[74]=o.plotAreaStyle;s[75]=o.plotEdgeStyle;s[76]=o.plotStyle;s[77]=(o.plotToEdge?1:0);s[78]=o.position;s[79]=o.preserveAspectRatio;s[80]=o.radius;s[81]=o.renderFlag;s[82]=o.scrollButtonStyle;s[83]=o.scrollLeft;s[84]=o.selectedItem;s[85]=o.selectedItemStyle;s[86]=o.selectedSeries;s[87]=o.seriesColorScheme;s[88]=o.seriesColors;s[89]=o.seriesColorsOverride;s[90]=o.seriesCount;s[91]=o.seriesNames;s[92]=o.seriesNumber;s[93]=o.seriesSize;s[94]=o.seriesYAxes;s[95]=(o.showMultiples?1:0);s[96]=(o.showQuadrant?1:0);s[97]=(o.showRegression?1:0);s[98]=o.startTime;s[99]=o.stripeStyle;s[100]=(o.stripesVisible?1:0);s[101]=o.subtitle;s[102]=o.subtitleStyle;s[103]=o.tag;s[104]=o.textSize;s[105]=(o.timeBased?1:0);s[106]=o.title;s[107]=o.titleAlign;s[108]=o.titleBoxStyle;s[109]=o.titleImage;s[110]=o.titleImageStyle;s[111]=o.titleStyle;s[112]=o.titleX;s[113]=o.titleY;s[114]=o.tooltipRectStyle;s[115]=o.tuple;s[116]=o.unselectedItemStyle;s[117]=o.upperRightStyle;s[118]=o.valueBoxStyle;s[119]=o.valueLabelFormat;s[120]=o.valueLabelStyle;s[121]=(o.valueLabelsVisible?1:0);s[122]=o.viewBoxHeight;s[123]=o.viewBoxWidth;s[124]=(o.visible?1:0);s[125]=(o.warnIfNoData?1:0);s[126]=o.width;s[127]=o.x;s[128]=set.addObject(o.xAxis,'xAxis');s[129]=o.xCenterValue;s[130]=o.y;s[131]=set.addObject(o.yAxis,'yAxis');s[132]=set.serializeList(o,o.yAxisList,true,'yAxisList');s[133]=o.yCenterValue;
}
function _ZEN_SVGComponent_bubbleChart_getSettings(s)
{
	s['name'] = 'string';
	s['controllerId'] = 'id';
	s['lowerLeftStyle'] = 'svgStyle';
	s['ongetcontroller'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	s['opacity'] = 'float';
	s['radius'] = 'float';
	s['showQuadrant'] = 'boolean';
	s['showRegression'] = 'boolean';
	s['tag'] = 'string';
	s['upperRightStyle'] = 'svgStyle';
	s['xCenterValue'] = 'float';
	s['yCenterValue'] = 'float';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_bubbleChart_connectToController = function() {
this.controller = '';
if (!zenIsMissing(this.controllerId)) {
if (this.composite) {
this.controller = this.composite.getChildById(this.controllerId);
}
else {
this.controller = zenPage.getComponentById(this.controllerId);
}
if (this.controller && this.controller.register) {
this.controller.register(this);
}
else {
alert('ZEN: Unable to connect component to dataController (' + this.id + ').');
}
if (this.controller) {
if ('' == this.controller.modelError) {
this.controller.loadModel(false);
}
}
}
}

self._ZEN_SVGComponent_bubbleChart_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._ZEN_SVGComponent_bubbleChart_findDataRange = function(yAxisNo) {
var range = new Object();
range.minValue = null;
range.maxValue = null;
range.minValue2 = null; // used by x/y type charts
range.maxValue2 = null;
var scount = this.getSeriesCount();
var items = this.getSeriesSize();
if (scount >= 2) {
for (var s = 0; s < 2; s++) {
var data = this._dataSeries[s];
var which = s==0?'x':'y';
if (data) {
for (var n = 0; n < items; n++) {
var val = data[n];
if (!isNaN(val)) {
val = parseFloat(val);
if (which == 'y') {
range.minValue = (null==range.minValue) ? val : (val < range.minValue) ? val : range.minValue;
range.maxValue = (null==range.maxValue) ? val : (val > range.maxValue) ? val : range.maxValue;
}
else {
range.minValue2 = (null==range.minValue2) ? val : (val < range.minValue2) ? val : range.minValue2;
range.maxValue2 = (null==range.maxValue2) ? val : (val > range.maxValue2) ? val : range.maxValue2;
}
}
}
}
}
}
return range;
}

self._ZEN_SVGComponent_bubbleChart_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._ZEN_SVGComponent_bubbleChart_getLegendLabels = function() {
var legends = [];
var names = this.getSeriesNames();
var items = this.getSeriesSize();
var cData = this.getSeriesData(3);
var cDataIndex = {};
this._hist = {};
if (cData) {
for (var n = 0; n < items; n++) {
cval = ((null === cData[n]) ? '' : cData[n]);
if (cval !== '') {
this._hist[cval] = n;
}
}
for (var n in this._hist) {
legends[legends.length] = n;
}
legends.sort();
for (var n = 0; n < legends.length; n++) {
cDataIndex[legends[n]] = n;
}
}
else {
legends[0] = names[0];
}
return legends;
}

self._ZEN_SVGComponent_bubbleChart_getSeriesNames = function() {
var names = [];
var sn = this.seriesNames.split(',');
for (i = 0; i < sn.length; i++) {
names[i] = (null == sn[i] || '' == sn[i]) ? (parseInt(i,10)+1) : sn[i];
}
return names;
}

self._ZEN_SVGComponent_bubbleChart_getToolTipInfo = function(series,item,captions,values) {
var controller = this.getController();
var xData = this.getSeriesData(0);
var yData = this.getSeriesData(1);
var rData = this.getSeriesData(2);
if (controller && controller.getDimName) {
var name = controller.getDimName(0);
if (''!==name) {
captions[captions.length] = name;
values[values.length] = controller.getLabel(item,1);
}
}
if (xData) {
captions[captions.length] = this.getXAxisTitle();
values[values.length] = xData[item];
}
if (yData) {
captions[captions.length] = this.getYAxisTitle();
values[values.length] = yData[item];
}
var controller = this.getController();
if (rData) {
if (controller) {
captions[captions.length] = controller.getLabel(2,2);
values[values.length] = rData[item];
}
}
var scount = this.getSeriesCount();
for (var s = 3; s < scount; s++) {
if (controller) {
var sData = this.getSeriesData(s);
captions[captions.length] = controller.getLabel(s,2);
values[values.length] = sData[item];
}
}
}

self._ZEN_SVGComponent_bubbleChart_getXAxisTitle = function() {
var title = '';
if (this.xAxis && ''!=this.xAxis.title) {
title = this.xAxis.title;
}
else {
var controller = this.getController();
if (controller) {
title = controller.getLabel(0,2);
}
else {
title = 'x';
}
}
return title;
}

self._ZEN_SVGComponent_bubbleChart_getXAxisType = function() {
return 'value';
}

self._ZEN_SVGComponent_bubbleChart_getYAxisTitle = function(which) {
var title = '';
var yAxis = this.getYAxis(this.currYAxis);
if (yAxis && ''!=yAxis.title) {
title = yAxis.title;
}
else {
var controller = this.getController();
if (controller) {
title = controller.getLabel(1,2);
}
else {
title = 'y';
}
}
return title;
}

self._ZEN_SVGComponent_bubbleChart_getYAxisType = function() {
return 'value';
}

self._ZEN_SVGComponent_bubbleChart_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_bubbleChart_renderBands = function() {
if (zenIsMissing(this.document)) return;
var text;
var plotAreaGroup = this.findSVGElement('plotAreaGroup');
var virtualGroup = this.findSVGElement('virtualGroup');
zenASSERT(plotAreaGroup,'Unable to find plotAreaGroup',arguments);
var scaleX = this._scaleX ? this._scaleX : 1;
var scaleY = this._scaleY ? this._scaleY : 1;
var qUR = this.findSVGElement('qUR');
var qLL = this.findSVGElement('qLL');
if (null == qUR) {
qUR = this.document.createElementNS(SVGNS,"rect");
qUR.setAttribute('id',this.makeId('qUR'));
virtualGroup.appendChild(qUR);
}
if (null == qLL) {
qLL = this.document.createElementNS(SVGNS,"rect");
qLL.setAttribute('id',this.makeId('qLL'));
virtualGroup.appendChild(qLL);
}
var xMidPoint = this.xCenterValue;
var yMidPoint = this.yCenterValue;
var hideUR = !this.showQuadrant;
var hideLL = !this.showQuadrant;
if (isNaN(parseFloat(xMidPoint))) {
xMidPoint = (this._xRange/2) + this._xMinValue
}
if (isNaN(parseFloat(yMidPoint))) {
yMidPoint = (this._yRange[0]/2) + this._yMinValue[0]
}
var h = this.getPlotY(yMidPoint,this.currYAxis) - this._plotTop;
var w = this.getPlotX(xMidPoint) - this._plotLeft;
h = (h > this._plotHeight) ? this._plotHeight : h;
w = (w > this._plotWidth) ? this._plotWidth : w;
if ((h<0)||(this._plotWidth-w)<0) {
hideUR = true;
}
else {
qUR.setAttribute("class","chart-band");
qUR.setAttribute("x",w*scaleX);
qUR.setAttribute("y",this._plotTop*scaleY);
qUR.setAttribute("width",(this._plotWidth - w)*scaleX);
qUR.setAttribute("height",h*scaleY);
qUR.setAttribute("style",'opacity:0.15;fill:#80D080;'+this.upperRightStyle);
}
if ((w<0)||(this._plotHeight-h)<0) {
hideLL = true;
}
else {
var y = this._plotTop + h;
if (h<0) { // JSL4359
y = this._plotTop;
h = 0;
}
qLL.setAttribute("class","chart-band");
qLL.setAttribute("x",0);
qLL.setAttribute("y",(y)*scaleY);
qLL.setAttribute("width",w*scaleX);
qLL.setAttribute("height",(this._plotHeight - h)*scaleY);
qLL.setAttribute("style",'opacity:0.15;fill:#D08080;'+this.lowerLeftStyle);
}
if (hideUR) {
qUR.setAttribute("display","none");
}
else {
qUR.setAttribute("display","block");
}
if (hideLL) {
qLL.setAttribute("display","none");
}
else {
qLL.setAttribute("display","block");
}
}

self._ZEN_SVGComponent_bubbleChart_renderSeries = function(group) {
var x,y,xval,yval,rval,cval,opval;
var scount = this.getSeriesCount();
var items = this.getSeriesSize();
var defRadius = parseFloat(this.radius);
var scaleX = this._scaleX ? this._scaleX : 1;
var scaleY = this._scaleY ? this._scaleY : 1;
var scaleR = (scaleX>scaleY) ? scaleY : scaleX;
this._hist = null;
this._valueLabels = [];
if (items > 0) {
var xData = this.getSeriesData(0);
var yData = this.getSeriesData(1);
var rData = this.getSeriesData(2);
var cData = this.getSeriesData(3);
var opData = this.getSeriesData(4);
var cDataIndex = {};
this._hist = {};
if (cData) {
for (var n = 0; n < items; n++) {
cval = ((null === cData[n]) ? '' : cData[n]);
if (cval !== '') {
this._hist[cval] = n;
}
}
for (var n in this._hist) {
this._valueLabels[this._valueLabels.length] = n;
}
this._valueLabels.sort();
for (var n = 0; n <  this._valueLabels.length; n++) {
cDataIndex[this._valueLabels[n]] = n;
}
}
else {
this._valueLabels[0] = 'Value';
}
var rMinValue = null;
var rMaxValue = null;
if (rData) {
for (var n = 0; n < items; n++) {
var val = rData[n];
if (!isNaN(val)) {
val = parseFloat(val);
rMinValue = (null==rMinValue) ? val : (val < rMinValue) ? val : rMinValue;
rMaxValue = (null==rMaxValue) ? val : (val > rMaxValue) ? val : rMaxValue;
}
}
}
var opMinValue = null;
var opMaxValue = null;
if (opData) {
for (var n = 0; n < items; n++) {
var val = opData[n];
if (!isNaN(val)) {
val = parseFloat(val);
opMinValue = (null==opMinValue) ? val : (val < opMinValue) ? val : opMinValue;
opMaxValue = (null==opMaxValue) ? val : (val > opMaxValue) ? val : opMaxValue;
}
}
}
var sortedList = [];
var itemCount = 0;
var xTotal = 0;
var yTotal = 0;
for (var n = 0; n < items; n++) {
rval = (null == rData) ? 0 : ((null == rData[n]) ? 0 : rData[n]);
if (rMinValue == null || rMaxValue == null) {
var r = defRadius;
}
else {
var rRange = rMaxValue - rMinValue;
var r = (rRange==0) ? defRadius : ((rval / rRange) * defRadius)+0.2;
}
opval = (null == opData) ? 0 : ((null == opData[n]) ? 0 : opData[n]);
if (opMinValue == null || opMaxValue == null) {
var op = this.opacity;
}
else {
var opRange = opMaxValue - opMinValue;
var op = (opRange==0) ? this.opacity : ((opval / opRange) * this.opacity);
}
xval = (null == xData) ? '' : ((null == xData[n]) ? '' : xData[n]);
yval = (null == yData) ? '' : ((null == yData[n]) ? '' : yData[n]);
if (xval!=='' && yval!=='') {
itemCount++;
xTotal += parseFloat(xval);
yTotal += parseFloat(yval);
}
sortedList[n] = {index:n, r:r,x:xval,y:yval,op:op};
}
var xMean = (itemCount>0) ? xTotal / itemCount : 0;
var yMean = (itemCount>0) ? yTotal / itemCount : 0;
var sortFunc = new Function('a','b','return b.r-a.r;');
sortedList.sort(sortFunc);
var sumX = 0;
var sumXX = 0;
var sumY = 0;
var sumYY = 0;
var sumXY = 0;
var sumXM2 = 0;
var sumYM2 = 0;
for (var n = 0; n < items; n++) {
var idx = sortedList[n].index;
var r = sortedList[n].r;
var opacity = sortedList[n].op;
xval = sortedList[n].x;
yval = sortedList[n].y;
if (xval==='' || yval==='') {
continue;
}
cval = (null == cData) ? '' : ((null == cData[idx]) ? '' : cData[idx]);
if (this.showRegression && !isNaN(parseFloat(xval)) && !isNaN(parseFloat(yval))) {
sumX += parseFloat(xval);
sumY += parseFloat(yval);
sumXX += parseFloat(xval*xval);
sumYY += parseFloat(yval*yval);
sumXY += parseFloat(xval*yval);
sumXM2 += (parseFloat(xval) - xMean)*(parseFloat(xval) - xMean);
sumYM2 += (parseFloat(yval) - yMean)*(parseFloat(yval) - yMean);
}
x = this.getPlotX(xval) - this._plotLeft;
y = this.getPlotY(yval,this.currYAxis) - this._plotTop;
cval = (cval===''||!cDataIndex[cval])?0:cDataIndex[cval];
var color = this.getSeriesColor(cval);
var bubble = this.document.createElementNS(SVGNS,"circle");
bubble.setAttribute("class","chart-seriesBar");
bubble.setAttribute("cx",x*scaleX);
bubble.setAttribute("cy",y*scaleY);
bubble.setAttribute("r",r*scaleR);
bubble.setAttribute("opacity",opacity);
bubble.setAttribute("fill",color);
bubble.setAttribute("stroke",'#404040');
bubble.setAttribute("stroke-width",'0.01');
group.appendChild(bubble);
if (idx == this.selectedItem) {
bubble.setAttribute("style",this.plotStyle + this.selectedItemStyle);
}
else {
bubble.setAttribute("style",this.plotStyle);
}
var sno = 0;
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementClickHandler(evt,'+sno+','+idx+');');
bubble.addEventListener('click',f,false);
bubble.setAttribute('id',this.makeId('el_' + sno + '_' + idx));
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementMouseOver(evt,'+sno+','+idx+');');
bubble.addEventListener('mouseover',f,false);
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementMouseOut(evt,'+sno+','+idx+');');
bubble.addEventListener('mouseout',f,false);
}
}
var xMin = this._xMaxValue;
var xMax = this._xMinValue;
if (this.showRegression && xMin!==null && xMax!==null && itemCount > 0) {
var N = itemCount;
var pr = (sumXY - ((sumX*sumY)/N)) / Math.sqrt(((sumXX - (sumX*sumX)/N)*(sumYY - (sumY*sumY)/N)));
var stdX = Math.sqrt(sumXM2/N);
var stdY = Math.sqrt(sumYM2/N);
var b = pr * (stdY/stdX);
var A = yMean - (b * xMean);
var yval1 = A + (b*xMin);
var yval2 = A + (b*xMax);
var y1 = this.getPlotY(yval1,this.currYAxis) - this._plotTop;
var y2 = this.getPlotY(yval2,this.currYAxis) - this._plotTop;
var x1 = this.getPlotX(xMin) - this._plotLeft;
var x2 = this.getPlotX(xMax) - this._plotLeft;
var line = this.document.createElementNS(SVGNS,"line");
line.setAttribute("class","chart-seriesLine");
line.setAttribute("style",this.lineStyle);
line.setAttribute("x1",x1*scaleX);
line.setAttribute("y1",y1*scaleY);
line.setAttribute("x2",x2*scaleX);
line.setAttribute("y2",y2*scaleY);
line.setAttribute("stroke",'#8080F0');
group.appendChild(line);
}
}

self._ZEN_SVGComponent_bubbleChart_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_bubbleChart_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._ZEN_SVGComponent_bubbleChart_setProperty = function(property,value,value2) {
switch(property) {
case 'radius':
case 'opacity':
case 'xCenterValue':
case 'yCenterValue':
this[property] = (value=='') ? '' : parseFloat(value);
this.render();
break;
case 'showRegression':
case 'showQuadrant':
this[property] = value ? true : false;
this.render();
break;
case 'upperRightStyle':
case 'lowerLeftStyle':
this[property] = value;
this.render();
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}
self._ZEN_SVGComponent_bubbleChart__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_chart');
	_ZEN_SVGComponent_bubbleChart.prototype = zenCreate('_ZEN_SVGComponent_chart',-1);
	var p = _ZEN_SVGComponent_bubbleChart.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_bubbleChart;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_chart) ? zenMaster._ZEN_SVGComponent_chart.prototype:_ZEN_SVGComponent_chart.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.bubbleChart';
	p._type = 'bubbleChart';
	p.serialize = _ZEN_SVGComponent_bubbleChart_serialize;
	p.getSettings = _ZEN_SVGComponent_bubbleChart_getSettings;
	p.connectToController = _ZEN_SVGComponent_bubbleChart_connectToController;
	p.disconnectFromController = _ZEN_SVGComponent_bubbleChart_disconnectFromController;
	p.findDataRange = _ZEN_SVGComponent_bubbleChart_findDataRange;
	p.getController = _ZEN_SVGComponent_bubbleChart_getController;
	p.getLegendLabels = _ZEN_SVGComponent_bubbleChart_getLegendLabels;
	p.getSeriesNames = _ZEN_SVGComponent_bubbleChart_getSeriesNames;
	p.getToolTipInfo = _ZEN_SVGComponent_bubbleChart_getToolTipInfo;
	p.getXAxisTitle = _ZEN_SVGComponent_bubbleChart_getXAxisTitle;
	p.getXAxisType = _ZEN_SVGComponent_bubbleChart_getXAxisType;
	p.getYAxisTitle = _ZEN_SVGComponent_bubbleChart_getYAxisTitle;
	p.getYAxisType = _ZEN_SVGComponent_bubbleChart_getYAxisType;
	p.notifyView = _ZEN_SVGComponent_bubbleChart_notifyView;
	p.renderBands = _ZEN_SVGComponent_bubbleChart_renderBands;
	p.renderSeries = _ZEN_SVGComponent_bubbleChart_renderSeries;
	p.sendEventToController = _ZEN_SVGComponent_bubbleChart_sendEventToController;
	p.setControllerId = _ZEN_SVGComponent_bubbleChart_setControllerId;
	p.setProperty = _ZEN_SVGComponent_bubbleChart_setProperty;
}

self._zenClassIdx['bullseyeChart'] = '_ZEN_SVGComponent_bullseyeChart';
self._ZEN_SVGComponent_bullseyeChart = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_bullseyeChart__init(this,index,id);}
}

self._ZEN_SVGComponent_bullseyeChart__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_chart__init) ?zenMaster._ZEN_SVGComponent_chart__init(o,index,id):_ZEN_SVGComponent_chart__init(o,index,id);
	o.controller = '';
	o.controllerId = '';
	o.labelValue = 'pctOfMax';
	o.ongetcontroller = '';
	o.onnotifyView = '';
	o.pieScale = '1';
	o.scrollLeft = '0';
}
function _ZEN_SVGComponent_bullseyeChart_serialize(set,s)
{
	var o = this;s[0]='1279815129';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.appearance;s[7]=(o.autoScaleText?1:0);s[8]=o.aux;s[9]=o.axisLineStyle;s[10]=o.axisTitleStyle;s[11]=o.backgroundStyle;s[12]=o.bandLower;s[13]=o.bandLowerStyle;s[14]=o.bandUpper;s[15]=o.bandUpperStyle;s[16]=o.baseLineStyle;s[17]=o.borderOffset;s[18]=o.borderRadius;s[19]=o.borderStyle;s[20]=(o.boundless?1:0);s[21]=o.controller;s[22]=o.controllerId;s[23]=o.currMultiple;s[24]=o.currYAxis;s[25]=o.endTime;s[26]=o.gridStyle;s[27]=(o.hasZoom?1:0);s[28]=o.height;s[29]=(o.hidden?1:0);s[30]=o.hzZoomStep;s[31]=o.indicatorStyle;s[32]=(o.indicatorsVisible?1:0);s[33]=o.labelStyle;s[34]=o.labelValue;s[35]=(o.labelsVisible?1:0);s[36]=o.legendHeight;s[37]=o.legendLabelStyle;s[38]=o.legendRectStyle;s[39]=o.legendStyle;s[40]=o.legendTitle;s[41]=o.legendVisible;s[42]=o.legendWidth;s[43]=o.legendX;s[44]=o.legendY;s[45]=o.lineStyle;s[46]=o.marginBottom;s[47]=o.marginLeft;s[48]=o.marginRight;s[49]=o.marginTop;s[50]=o.markerScale;s[51]=o.markerShapes;s[52]=o.markerStyle;s[53]=(o.markersVisible?1:0);s[54]=o.maxLabelLen;s[55]=o.msgIfNoData;s[56]=o.multipleTitleStyle;s[57]=o.noDataFill;s[58]=o.noDataOpacity;s[59]=o.noDataStroke;s[60]=o.onclick;s[61]=o.onelementClick;s[62]=o.ongetData;s[63]=o.ongetLabelX;s[64]=o.ongetLabelY;s[65]=o.ongetSeriesColor;s[66]=o.ongetTimeEvents;s[67]=o.ongetcontroller;s[68]=o.onnotifyView;s[69]=o.onrenderData;s[70]=o.onrenderPlotArea;s[71]=o.onshowTooltip;s[72]=o.onupdate;s[73]=o.pieScale;s[74]=o.plotAreaStyle;s[75]=o.plotEdgeStyle;s[76]=o.plotStyle;s[77]=(o.plotToEdge?1:0);s[78]=o.position;s[79]=o.preserveAspectRatio;s[80]=o.renderFlag;s[81]=o.scrollButtonStyle;s[82]=o.scrollLeft;s[83]=o.selectedItem;s[84]=o.selectedItemStyle;s[85]=o.selectedSeries;s[86]=o.seriesColorScheme;s[87]=o.seriesColors;s[88]=o.seriesColorsOverride;s[89]=o.seriesCount;s[90]=o.seriesNames;s[91]=o.seriesNumber;s[92]=o.seriesSize;s[93]=o.seriesYAxes;s[94]=(o.showMultiples?1:0);s[95]=o.startTime;s[96]=o.stripeStyle;s[97]=(o.stripesVisible?1:0);s[98]=o.subtitle;s[99]=o.subtitleStyle;s[100]=o.tag;s[101]=o.textSize;s[102]=(o.timeBased?1:0);s[103]=o.title;s[104]=o.titleAlign;s[105]=o.titleBoxStyle;s[106]=o.titleImage;s[107]=o.titleImageStyle;s[108]=o.titleStyle;s[109]=o.titleX;s[110]=o.titleY;s[111]=o.tooltipRectStyle;s[112]=o.tuple;s[113]=o.unselectedItemStyle;s[114]=o.valueBoxStyle;s[115]=o.valueLabelFormat;s[116]=o.valueLabelStyle;s[117]=(o.valueLabelsVisible?1:0);s[118]=o.viewBoxHeight;s[119]=o.viewBoxWidth;s[120]=(o.visible?1:0);s[121]=(o.warnIfNoData?1:0);s[122]=o.width;s[123]=o.x;s[124]=set.addObject(o.xAxis,'xAxis');s[125]=o.y;s[126]=set.addObject(o.yAxis,'yAxis');s[127]=set.serializeList(o,o.yAxisList,true,'yAxisList');
}
function _ZEN_SVGComponent_bullseyeChart_getSettings(s)
{
	s['name'] = 'string';
	s['controllerId'] = 'id';
	s['labelValue'] = 'enum:none,value,pctOfTotal,pctOfMax';
	s['ongetcontroller'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	s['pieScale'] = 'float';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_bullseyeChart_connectToController = function() {
this.controller = '';
if (!zenIsMissing(this.controllerId)) {
if (this.composite) {
this.controller = this.composite.getChildById(this.controllerId);
}
else {
this.controller = zenPage.getComponentById(this.controllerId);
}
if (this.controller && this.controller.register) {
this.controller.register(this);
}
else {
alert('ZEN: Unable to connect component to dataController (' + this.id + ').');
}
if (this.controller) {
if ('' == this.controller.modelError) {
this.controller.loadModel(false);
}
}
}
}

self._ZEN_SVGComponent_bullseyeChart_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._ZEN_SVGComponent_bullseyeChart_getChartElementStyle = function(series,item) {
var clr;
var ic = this.getSeriesSize();
if (this._legendVisible) {
var op = 1.0; // if legends are visible then let legend and slices have the same color rather than color determined by bleed-through
} else {
var op = ic>0 ? ((1-(item/ic))*0.8) : 0.8;
}
clr = this.getSeriesColor(item);
return "stroke-width: 0.5px; fill-opacity: "+op+"; stroke: " + '#F0F0F0;' + "; fill: " + clr + ";" + this.plotStyle;
}

self._ZEN_SVGComponent_bullseyeChart_getChartRelatedElements = function(series,item) {
var array = null;
var box = this.findSVGElement('box_' + series + '_' + item);
if (box) {
array = [box];
}
return array;
}

self._ZEN_SVGComponent_bullseyeChart_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._ZEN_SVGComponent_bullseyeChart_getLegendRectStyle = function(item) {
return this.getChartElementStyle(1,item);
}

self._ZEN_SVGComponent_bullseyeChart_getLegendsCount = function(legends) {
return this.seriesSize;
}

self._ZEN_SVGComponent_bullseyeChart_getRelatedElementStyle = function(series,item) {
var style="fill: white;fill-opacity: 0.1;stroke: #808080;stroke-width: 0.25px;";
return style;
}

self._ZEN_SVGComponent_bullseyeChart_getSeriesNamesSize = function() {
return this.seriesSize;
}

self._ZEN_SVGComponent_bullseyeChart_hasAxes = function() {
return false;
}

self._ZEN_SVGComponent_bullseyeChart_hasMultiples = function() {
return this.showMultiples;
}

self._ZEN_SVGComponent_bullseyeChart_is3D = function() {
return false;
}

self._ZEN_SVGComponent_bullseyeChart_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_bullseyeChart_renderSeries = function(group) {
try {
var sc = this.getSeriesCount();
var ic = this.getSeriesSize();
var items = 0;
var values = new Array();
var snames = null;
var seriesNumber = parseInt(this.seriesNumber);
if (!isNaN(seriesNumber)) {
sc = 1;
}
if (this.showMultiples) {
seriesNumber = this.currMultiple;
sc = 1;
}
if (this.showMultiples) {
var rsno = this.currMultiple;
}
else {
var rsno = isNaN(seriesNumber) ? 0 : this.seriesNumber;
}
rsno = (''===rsno) ? 0 : rsno;
var dataItems = [];
var total = 0;
var maxValue = 0;
items = ic;
for (var i = 0; i < ic; i++) {
var value = 0;
for (var s = 0; s < sc; s++) {
var data = this._dataSeries[isNaN(seriesNumber)?s:seriesNumber];
value += (data == null || data[i] == null || data[i] < 0 || isNaN(parseFloat(data[i]))) ? 0 : (parseFloat(data[i]));
}
dataItems[i] = {value:value, itemNo:i, label:this.getYLabelText(i,'',1)};
total += value;
if (value > maxValue) {
maxValue = value;
}
}
dataItems.sort(function(a,b) { return parseFloat(b.value) - parseFloat(a.value) });
while(null != group.firstChild) {
group.removeChild(group.firstChild);
}
var scaleX = this._scaleX ? this._scaleX : 1;
var scaleY = this._scaleY ? this._scaleY : 1;
if (scaleX > scaleY) {
var scaleR = scaleY;
}
else {
var scaleR = scaleX;
}
var gw = (this._plotWidth * 0.80);
var gh = (this._plotHeight * 0.80);
var sz = (gw > gh) ? gh/2 : gw/2;
var cx = this._plotWidth / 2;
var cy = this._plotHeight / 2;
sz = sz * parseFloat(this.pieScale);
var tx = 5;
var ty = 5;
for (var n = 0; n < dataItems.length; n++) {
var value = dataItems[n].value;
var itemNo = dataItems[n].itemNo;
var label = dataItems[n].label;
var style = this.getChartElementStyle(seriesNumber,itemNo);
if (value && maxValue) {
var r = Math.sqrt(sz*sz*(value/maxValue));
dataItems[n].r = r;
var circ = this.document.createElementNS(SVGNS,"circle");
group.appendChild(circ);
circ.setAttribute("cx",cx*scaleX);
circ.setAttribute("cy",cy*scaleY);
circ.setAttribute("r",r*scaleR);
circ.setAttribute("class","");
circ.setAttribute("style",style);
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementClickHandler(evt,'+rsno+','+itemNo+');');
circ.addEventListener('click',f,false);
circ.setAttribute('id',this.makeId('el_' + rsno + '_' + itemNo));
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementMouseOver(evt,'+rsno+','+itemNo+');');
circ.addEventListener('mouseover',f,false);
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementMouseOut(evt,'+rsno+','+itemNo+');');
circ.addEventListener('mouseout',f,false);
}
}
if (this.labelsVisible) {
var tx = 2;
var ty = (dataItems.length > 5) ? 10 : 20;
for (var n = 0; n < dataItems.length; n++) {
var value = dataItems[n].value;
var itemNo = dataItems[n].itemNo;
var label = dataItems[n].label;
var r = dataItems[n].r;
if (value && maxValue) {
if (label!=='') {
var box2 = this.document.createElementNS(SVGNS,"rect");
box2.setAttribute("class","chart-labelBox");
box2.setAttribute('id',this.makeId('box_' + rsno + '_' + itemNo));
group.appendChild(box2);
var box = this.document.createElementNS(SVGNS,"rect");
box.setAttribute("class","chart-labelBox");
box.setAttribute("style","fill-opacity:0.8;");
group.appendChild(box);
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementClickHandler(evt,'+rsno+','+itemNo+');');
box.addEventListener('click',f,false);
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementMouseOver(evt,'+rsno+','+itemNo+');');
box.addEventListener('mouseover',f,false);
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementMouseOut(evt,'+rsno+','+itemNo+');');
box.addEventListener('mouseout',f,false);
var text = this.document.createElementNS(SVGNS,"text");
group.appendChild(text);
text.setAttribute("x", tx*scaleX);
text.setAttribute("y", ty*scaleY);
text.setAttribute("class","chart-sliceLabel");
text.setAttribute("style",this.labelStyle);
text.addEventListener('click',f,false);
var t = label;
switch (this.labelValue) {
case 'value':
t += ' (' + zenFormatNumber(value,"#,#") + ')';
break;
case 'pctOfTotal':
t += ' (' + zenFormatNumber(value/total,"#.#%") + ')';
break;
case 'pctOfMax':
t += ' (' + zenFormatNumber(value/maxValue,"#.#%") + ')';
break;
}
var textNode = this.document.createTextNode(t);
text.appendChild(textNode);
var th = zenGetBBox(text).height / scaleY;
var tw = zenGetBBox(text).width / scaleX;
box.setAttribute('rx',3);
box.setAttribute('x',(tx*scaleX)-3);
box.setAttribute('y',(ty-(th*(1/1.1)))*scaleY);
box.setAttribute('width',(tw*scaleX)+6);
box.setAttribute('height',(th*1.13)*scaleY);
box2.setAttribute('rx',3);
box2.setAttribute('x',(tx*scaleX)-3);
box2.setAttribute('y',(ty-(th*(1/1.1)))*scaleY);
box2.setAttribute('width',(tw*scaleX)+6);
box2.setAttribute('height',(th*1.13)*scaleY);
if ((tx+tw) < cx) {
var line = this.document.createElementNS(SVGNS,"path");
var d = 'M '+(cx*scaleX)+' '+((cy-r)*scaleR)+' L '+((tx+tw)*scaleX+4)+' '+((ty-th/3)*scaleY);
line.setAttribute("class","chart-sliceLine");
line.setAttribute("style",'stroke-width: 0.5px;');
line.setAttribute("d",d);
group.appendChild(line);
var endPoint = this.document.createElementNS(SVGNS,"circle");
endPoint.setAttribute("class","chart-sliceLine");
endPoint.setAttribute("style",'fill:white;');
endPoint.setAttribute("cx",cx*scaleX);
endPoint.setAttribute("cy",(cy-r)*scaleR);
endPoint.setAttribute("r",3.5);
group.appendChild(endPoint);
}
ty += (th * 1.2) + 3;
}
}
}
}
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in bullseyeChart.renderSeries');
}
}

self._ZEN_SVGComponent_bullseyeChart_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_bullseyeChart_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._ZEN_SVGComponent_bullseyeChart_setProperty = function(property,value,value2) {
switch(property) {
case 'pieScale':
this[property] = parseFloat(value);
this.render();
break;
case 'labelValue':
this[property] = value;
this.render();
break;
default:
return this.invokeSuper('setProperty',arguments);
}
}
self._ZEN_SVGComponent_bullseyeChart__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_chart');
	_ZEN_SVGComponent_bullseyeChart.prototype = zenCreate('_ZEN_SVGComponent_chart',-1);
	var p = _ZEN_SVGComponent_bullseyeChart.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_bullseyeChart;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_chart) ? zenMaster._ZEN_SVGComponent_chart.prototype:_ZEN_SVGComponent_chart.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.bullseyeChart';
	p._type = 'bullseyeChart';
	p.serialize = _ZEN_SVGComponent_bullseyeChart_serialize;
	p.getSettings = _ZEN_SVGComponent_bullseyeChart_getSettings;
	p.connectToController = _ZEN_SVGComponent_bullseyeChart_connectToController;
	p.disconnectFromController = _ZEN_SVGComponent_bullseyeChart_disconnectFromController;
	p.getChartElementStyle = _ZEN_SVGComponent_bullseyeChart_getChartElementStyle;
	p.getChartRelatedElements = _ZEN_SVGComponent_bullseyeChart_getChartRelatedElements;
	p.getController = _ZEN_SVGComponent_bullseyeChart_getController;
	p.getLegendRectStyle = _ZEN_SVGComponent_bullseyeChart_getLegendRectStyle;
	p.getLegendsCount = _ZEN_SVGComponent_bullseyeChart_getLegendsCount;
	p.getRelatedElementStyle = _ZEN_SVGComponent_bullseyeChart_getRelatedElementStyle;
	p.getSeriesNamesSize = _ZEN_SVGComponent_bullseyeChart_getSeriesNamesSize;
	p.hasAxes = _ZEN_SVGComponent_bullseyeChart_hasAxes;
	p.hasMultiples = _ZEN_SVGComponent_bullseyeChart_hasMultiples;
	p.is3D = _ZEN_SVGComponent_bullseyeChart_is3D;
	p.notifyView = _ZEN_SVGComponent_bullseyeChart_notifyView;
	p.renderSeries = _ZEN_SVGComponent_bullseyeChart_renderSeries;
	p.sendEventToController = _ZEN_SVGComponent_bullseyeChart_sendEventToController;
	p.setControllerId = _ZEN_SVGComponent_bullseyeChart_setControllerId;
	p.setProperty = _ZEN_SVGComponent_bullseyeChart_setProperty;
}

self._zenClassIdx['diffChart'] = '_ZEN_SVGComponent_diffChart';
self._ZEN_SVGComponent_diffChart = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_diffChart__init(this,index,id);}
}

self._ZEN_SVGComponent_diffChart__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_chart__init) ?zenMaster._ZEN_SVGComponent_chart__init(o,index,id):_ZEN_SVGComponent_chart__init(o,index,id);
	o.controller = '';
	o.controllerId = '';
	o.ongetcontroller = '';
	o.onnotifyView = '';
	o.refLineStyle = 'stroke-dasharray: 1,1;';
	o.scrollLeft = '0';
	o.seriesYAxes = '';
}
function _ZEN_SVGComponent_diffChart_serialize(set,s)
{
	var o = this;s[0]='499508274';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.appearance;s[7]=(o.autoScaleText?1:0);s[8]=o.aux;s[9]=o.axisLineStyle;s[10]=o.axisTitleStyle;s[11]=o.backgroundStyle;s[12]=o.bandLower;s[13]=o.bandLowerStyle;s[14]=o.bandUpper;s[15]=o.bandUpperStyle;s[16]=o.baseLineStyle;s[17]=o.borderOffset;s[18]=o.borderRadius;s[19]=o.borderStyle;s[20]=(o.boundless?1:0);s[21]=o.controller;s[22]=o.controllerId;s[23]=o.currMultiple;s[24]=o.currYAxis;s[25]=o.endTime;s[26]=o.gridStyle;s[27]=(o.hasZoom?1:0);s[28]=o.height;s[29]=(o.hidden?1:0);s[30]=o.hzZoomStep;s[31]=o.indicatorStyle;s[32]=(o.indicatorsVisible?1:0);s[33]=o.labelStyle;s[34]=(o.labelsVisible?1:0);s[35]=o.legendHeight;s[36]=o.legendLabelStyle;s[37]=o.legendRectStyle;s[38]=o.legendStyle;s[39]=o.legendTitle;s[40]=o.legendVisible;s[41]=o.legendWidth;s[42]=o.legendX;s[43]=o.legendY;s[44]=o.lineStyle;s[45]=o.marginBottom;s[46]=o.marginLeft;s[47]=o.marginRight;s[48]=o.marginTop;s[49]=o.markerScale;s[50]=o.markerShapes;s[51]=o.markerStyle;s[52]=(o.markersVisible?1:0);s[53]=o.maxLabelLen;s[54]=o.msgIfNoData;s[55]=o.multipleTitleStyle;s[56]=o.noDataFill;s[57]=o.noDataOpacity;s[58]=o.noDataStroke;s[59]=o.onclick;s[60]=o.onelementClick;s[61]=o.ongetData;s[62]=o.ongetLabelX;s[63]=o.ongetLabelY;s[64]=o.ongetSeriesColor;s[65]=o.ongetTimeEvents;s[66]=o.ongetcontroller;s[67]=o.onnotifyView;s[68]=o.onrenderData;s[69]=o.onrenderPlotArea;s[70]=o.onshowTooltip;s[71]=o.onupdate;s[72]=o.plotAreaStyle;s[73]=o.plotEdgeStyle;s[74]=o.plotStyle;s[75]=(o.plotToEdge?1:0);s[76]=o.position;s[77]=o.preserveAspectRatio;s[78]=o.refLineStyle;s[79]=o.renderFlag;s[80]=o.scrollButtonStyle;s[81]=o.scrollLeft;s[82]=o.selectedItem;s[83]=o.selectedItemStyle;s[84]=o.selectedSeries;s[85]=o.seriesColorScheme;s[86]=o.seriesColors;s[87]=o.seriesColorsOverride;s[88]=o.seriesCount;s[89]=o.seriesNames;s[90]=o.seriesNumber;s[91]=o.seriesSize;s[92]=o.seriesYAxes;s[93]=(o.showMultiples?1:0);s[94]=o.startTime;s[95]=o.stripeStyle;s[96]=(o.stripesVisible?1:0);s[97]=o.subtitle;s[98]=o.subtitleStyle;s[99]=o.tag;s[100]=o.textSize;s[101]=(o.timeBased?1:0);s[102]=o.title;s[103]=o.titleAlign;s[104]=o.titleBoxStyle;s[105]=o.titleImage;s[106]=o.titleImageStyle;s[107]=o.titleStyle;s[108]=o.titleX;s[109]=o.titleY;s[110]=o.tooltipRectStyle;s[111]=o.tuple;s[112]=o.unselectedItemStyle;s[113]=o.valueBoxStyle;s[114]=o.valueLabelFormat;s[115]=o.valueLabelStyle;s[116]=(o.valueLabelsVisible?1:0);s[117]=o.viewBoxHeight;s[118]=o.viewBoxWidth;s[119]=(o.visible?1:0);s[120]=(o.warnIfNoData?1:0);s[121]=o.width;s[122]=o.x;s[123]=set.addObject(o.xAxis,'xAxis');s[124]=o.y;s[125]=set.addObject(o.yAxis,'yAxis');s[126]=set.serializeList(o,o.yAxisList,true,'yAxisList');
}
function _ZEN_SVGComponent_diffChart_getSettings(s)
{
	s['name'] = 'string';
	s['controllerId'] = 'id';
	s['ongetcontroller'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	s['refLineStyle'] = 'svgStyle';
	s['seriesYAxes'] = 'csv';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_diffChart_connectToController = function() {
this.controller = '';
if (!zenIsMissing(this.controllerId)) {
if (this.composite) {
this.controller = this.composite.getChildById(this.controllerId);
}
else {
this.controller = zenPage.getComponentById(this.controllerId);
}
if (this.controller && this.controller.register) {
this.controller.register(this);
}
else {
alert('ZEN: Unable to connect component to dataController (' + this.id + ').');
}
if (this.controller) {
if ('' == this.controller.modelError) {
this.controller.loadModel(false);
}
}
}
}

self._ZEN_SVGComponent_diffChart_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._ZEN_SVGComponent_diffChart_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._ZEN_SVGComponent_diffChart_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_diffChart_renderSeries = function(group) {
var scaleX = this._scaleX ? this._scaleX : 1;
var scaleY = this._scaleY ? this._scaleY : 1;
var x,y,val;
var scount = this.getSeriesCount();
var items = this.getSeriesSize();
if (items > 0) {
var data = new Array(scount);
for (var s = 0; s < scount; s++) {
data[s] = this.getSeriesData(s);
}
for (var s = scount-1; s >=0; s--) {
var color = this.getSeriesColor(s);
if (this.markersVisible) {
var marker = this.getMarkerShape(s);
}
var poly = this.document.createElementNS(SVGNS,"polyline");
poly.setAttribute("class","chart-seriesLine");
group.appendChild(poly);
var points = ''; // set of points for this line
var dx, adj;
if (this.plotToEdge) {
dx = (items<=1) ? this._plotWidth : (this._plotWidth / (items-1));
adj = dx;
}
else {
dx = this._plotWidth / items;
adj = (dx/2);
}
var x = 0;
for (var n = 0; n < items; n++) {
val = (null == data[s]) ? 0 : ((null == data[s][n]) ? 0 : parseFloat(data[s][n]));
x += dx;
y = this.getPlotY(val) - this._plotTop;
points += ((x-(adj))*scaleX) + ' ' + (y*scaleY) + ' ';
if (this.markersVisible) {
group.appendChild(this.createMarker(s,n,(x-adj),y,color,marker));
}
}
if (s > 0) {
for (var n = items-1; n >= 0; n--) {
val = (null == data[0]) ? 0 : ((null == data[0][n]) ? 0 : parseFloat(data[0][n]));
y = this.getPlotY(val) - this._plotTop;
points += ((x-(adj))*scaleX) + ' ' + (y*scaleY) + ' ';
x -= dx;
}
}
poly.setAttribute("points",points);
poly.setAttribute("stroke",color);
poly.setAttribute("style",(s==0) ? this.refLineStyle : this.plotStyle);
poly.setAttribute("fill",(s > 0) ? color : 'none');
}
}
}

self._ZEN_SVGComponent_diffChart_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_diffChart_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._ZEN_SVGComponent_diffChart_setProperty = function(property,value,value2) {
switch(property) {
case 'refLineStyle':
this[property] = value;
this.render();
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_SVGComponent_diffChart_useSumForRange = function() {
return false;
}
self._ZEN_SVGComponent_diffChart__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_chart');
	_ZEN_SVGComponent_diffChart.prototype = zenCreate('_ZEN_SVGComponent_chart',-1);
	var p = _ZEN_SVGComponent_diffChart.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_diffChart;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_chart) ? zenMaster._ZEN_SVGComponent_chart.prototype:_ZEN_SVGComponent_chart.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.diffChart';
	p._type = 'diffChart';
	p.serialize = _ZEN_SVGComponent_diffChart_serialize;
	p.getSettings = _ZEN_SVGComponent_diffChart_getSettings;
	p.connectToController = _ZEN_SVGComponent_diffChart_connectToController;
	p.disconnectFromController = _ZEN_SVGComponent_diffChart_disconnectFromController;
	p.getController = _ZEN_SVGComponent_diffChart_getController;
	p.notifyView = _ZEN_SVGComponent_diffChart_notifyView;
	p.renderSeries = _ZEN_SVGComponent_diffChart_renderSeries;
	p.sendEventToController = _ZEN_SVGComponent_diffChart_sendEventToController;
	p.setControllerId = _ZEN_SVGComponent_diffChart_setControllerId;
	p.setProperty = _ZEN_SVGComponent_diffChart_setProperty;
	p.useSumForRange = _ZEN_SVGComponent_diffChart_useSumForRange;
}

self._zenClassIdx['fuelGauge'] = '_ZEN_SVGComponent_fuelGauge';
self._ZEN_SVGComponent_fuelGauge = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_fuelGauge__init(this,index,id);}
}

self._ZEN_SVGComponent_fuelGauge__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_meter__init) ?zenMaster._ZEN_SVGComponent_meter__init(o,index,id):_ZEN_SVGComponent_meter__init(o,index,id);
	o.controller = '';
	o.controllerId = '';
	o.format = '';
	o.highLampColor = 'url(#glow-red)';
	o.levelBoxStyle = '';
	o.levelTextStyle = '';
	o.logo = 'Zen';
	o.logoStyle = '';
	o.lowLampColor = 'url(#glow-red)';
	o.needleStyle = '';
	o.ongetcontroller = '';
	o.onnotifyView = '';
	o.outerBodyStyle = '';
	o.panelStyle = '';
}
function _ZEN_SVGComponent_fuelGauge_serialize(set,s)
{
	var o = this;s[0]='2544107097';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=(o.animate?1:0);s[7]=o.aux;s[8]=(o.boundless?1:0);s[9]=o.controller;s[10]=o.controllerId;s[11]=o.dataBinding;s[12]=(o.disabled?1:0);s[13]=o.format;s[14]=o.height;s[15]=(o.hidden?1:0);s[16]=o.highLampColor;s[17]=o.label;s[18]=o.labelStyle;s[19]=o.levelBoxStyle;s[20]=o.levelTextStyle;s[21]=o.logo;s[22]=o.logoStyle;s[23]=o.lowLampColor;s[24]=o.needleStyle;s[25]=o.onchange;s[26]=o.onclick;s[27]=o.ongetcontroller;s[28]=o.onnotifyView;s[29]=o.onupdate;s[30]=o.outerBodyStyle;s[31]=o.panelStyle;s[32]=o.position;s[33]=o.preserveAspectRatio;s[34]=o.rangeLower;s[35]=o.rangeUpper;s[36]=o.renderFlag;s[37]=o.scaleFactor;s[38]=(o.showConditionally?1:0);s[39]=o.targetValue;s[40]=o.thresholdLower;s[41]=o.thresholdUpper;s[42]=o.tuple;s[43]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[44]=o.viewBoxHeight;s[45]=o.viewBoxWidth;s[46]=(o.visible?1:0);s[47]=o.width;s[48]=o.x;s[49]=o.y;
}
function _ZEN_SVGComponent_fuelGauge_getSettings(s)
{
	s['name'] = 'string';
	s['controllerId'] = 'id';
	s['format'] = 'string';
	s['highLampColor'] = 'color';
	s['levelBoxStyle'] = 'style';
	s['levelTextStyle'] = 'style';
	s['logo'] = 'caption';
	s['logoStyle'] = 'style';
	s['lowLampColor'] = 'color';
	s['needleStyle'] = 'style';
	s['ongetcontroller'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	s['outerBodyStyle'] = 'style';
	s['panelStyle'] = 'style';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_fuelGauge_connectToController = function() {
this.controller = '';
if (!zenIsMissing(this.controllerId)) {
if (this.composite) {
this.controller = this.composite.getChildById(this.controllerId);
}
else {
this.controller = zenPage.getComponentById(this.controllerId);
}
if (this.controller && this.controller.register) {
this.controller.register(this);
}
else {
alert('ZEN: Unable to connect component to dataController (' + this.id + ').');
}
if (this.controller) {
if ('' == this.controller.modelError) {
this.controller.loadModel(false);
}
}
}
}

self._ZEN_SVGComponent_fuelGauge_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._ZEN_SVGComponent_fuelGauge_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._ZEN_SVGComponent_fuelGauge_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_fuelGauge_renderMeter = function() {
var body = this.document.createElementNS(SVGNS,'path');
body.setAttribute('class','fuelGauge-body');
body.setAttribute('fill','url(#fuelGauge-bodyGrad)');
body.setAttribute('d','M 20 20 A 50 25 0 0 1 80 20 L 70 80 L 30 80 z');
body.setAttribute('style',this.outerBodyStyle);
this.svgGroup.appendChild(body);
var lamp = this.document.createElementNS(SVGNS,'circle');
lamp.setAttribute('id',this.makeId('lowLamp'));
lamp.setAttribute('class','fuelGauge-lamp');
lamp.setAttribute('fill','none');
lamp.setAttribute('cx',24.5);
lamp.setAttribute('cy',22);
lamp.setAttribute('r',1.8);
this.svgGroup.appendChild(lamp);
var lamp = this.document.createElementNS(SVGNS,'circle');
lamp.setAttribute('id',this.makeId('highLamp'));
lamp.setAttribute('class','fuelGauge-lamp');
lamp.setAttribute('fill','none');
lamp.setAttribute('cx',75.5);
lamp.setAttribute('cy',22);
lamp.setAttribute('r',1.8);
this.svgGroup.appendChild(lamp);
var tick = this.document.createElementNS(SVGNS,'line');
tick.setAttribute('class','fuelGauge-tick');
tick.setAttribute('x1',25);
tick.setAttribute('y1',25);
tick.setAttribute('x2',26);
tick.setAttribute('y2',30);
this.svgGroup.appendChild(tick);
var tick = this.document.createElementNS(SVGNS,'line');
tick.setAttribute('class','fuelGauge-tick');
tick.setAttribute('x1',37);
tick.setAttribute('y1',23);
tick.setAttribute('x2',37.4);
tick.setAttribute('y2',26);
this.svgGroup.appendChild(tick);
var tick = this.document.createElementNS(SVGNS,'line');
tick.setAttribute('class','fuelGauge-tick');
tick.setAttribute('x1',50);
tick.setAttribute('y1',22);
tick.setAttribute('x2',50);
tick.setAttribute('y2',27);
this.svgGroup.appendChild(tick);
var tick = this.document.createElementNS(SVGNS,'line');
tick.setAttribute('class','fuelGauge-tick');
tick.setAttribute('x1',63);
tick.setAttribute('y1',23);
tick.setAttribute('x2',62.6);
tick.setAttribute('y2',26);
this.svgGroup.appendChild(tick);
var tick = this.document.createElementNS(SVGNS,'line');
tick.setAttribute('class','fuelGauge-tick');
tick.setAttribute('x1',75);
tick.setAttribute('y1',25);
tick.setAttribute('x2',74);
tick.setAttribute('y2',30);
this.svgGroup.appendChild(tick);
var logo = this.document.createElementNS(SVGNS,'text');
logo.setAttribute('id',this.makeId('logo'));
logo.setAttribute('class','fuelGauge-logoText');
logo.setAttribute('style',this.logoStyle);
logo.setAttribute('x',50);
logo.setAttribute('y',43);
logo.setAttribute('text-anchor','middle');
var textNode = this.document.createTextNode(this.logo);
logo.appendChild(textNode);
this.svgGroup.appendChild(logo);
var rect = this.document.createElementNS(SVGNS,'rect');
rect.setAttribute('class','fuelGauge-levelTextBox');
rect.setAttribute('style',this.levelBoxStyle);
rect.setAttribute('fill','url(#fuelGauge-levelBoxGrad)');
rect.setAttribute('x',33);
rect.setAttribute('y',49);
rect.setAttribute('width',34);
rect.setAttribute('height',8);
rect.setAttribute('rx',1);
this.svgGroup.appendChild(rect);
var lvlText = this.document.createElementNS(SVGNS,'text');
lvlText.setAttribute('id',this.makeId('levelText'));
lvlText.setAttribute('class','fuelGauge-levelText');
lvlText.setAttribute('style',this.levelTextStyle);
lvlText.setAttribute('x',65);
lvlText.setAttribute('y',55);
lvlText.setAttribute('text-anchor','end');
var textNode = this.document.createTextNode(this.value);
lvlText.appendChild(textNode);
this.svgGroup.appendChild(lvlText);
var shadow = this.document.createElementNS(SVGNS,'line');
shadow.setAttribute('id',this.makeId('shadow'));
shadow.setAttribute('class','fuelGauge-shadow');
shadow.setAttribute('x1',50);
shadow.setAttribute('y1',28);
shadow.setAttribute('x2',50);
shadow.setAttribute('y2',60);
shadow.setAttribute('transform','rotate(1,50,166)');
this.svgGroup.appendChild(shadow);
var needle = this.document.createElementNS(SVGNS,'line');
needle.setAttribute('id',this.makeId('needle'));
needle.setAttribute('class','fuelGauge-needle');
needle.setAttribute('style',this.needleStyle);
needle.setAttribute('x1',50);
needle.setAttribute('y1',25);
needle.setAttribute('x2',50);
needle.setAttribute('y2',60);
needle.setAttribute('transform','rotate(0,50,166)');
this.svgGroup.appendChild(needle);
var nub = this.document.createElementNS(SVGNS,'path');
nub.setAttribute('class','fuelGauge-body2');
nub.setAttribute('fill','url(#fuelGauge-bodyGrad)');
nub.setAttribute('d','M 27 62 A 50 25 0 0 1 73 62 L 70 80 L 30 80 z');
this.svgGroup.appendChild(nub);
nub.setAttribute('style',this.panelStyle);
this.renderLabel('50%',95);
this.setProperty('value',this.value);
this.updateNeedle(false);
}

self._ZEN_SVGComponent_fuelGauge_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_fuelGauge_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._ZEN_SVGComponent_fuelGauge_setProperty = function(property,value,value2) {
switch(property) {
case 'value':
if (this._timerId) {
window.clearTimeout(this._timerId);
delete this._timerId;
}
this.value = value;
if ((null == this.currValue)||(isNaN(this.currValue))) {		// DTB586
this.currValue = 0;
}
var lvl = 0;
var lvl = this.value * this.scaleFactor;
var text = this.findSVGElement('levelText');
text.setAttribute("class",(lvl>=0) ? "fuelGauge-levelText" : "fuelGauge-levelTextNeg");
if ('' != this.format) {
var dval = zenFormatNumber(lvl,this.format);
}
else {
var dval = Math.round(lvl);
}
if (isNaN(dval)) {
dval = '';		// DTB586
}
this.setTextNode("levelText",dval);
var tw = (zenGetBBox(text).width);
if ((tw>30) || (lvl>=100000000) || (lvl<=-10000000)) {
lvl = "\043\043\043\043\043\043";
this.setTextNode("levelText",lvl);
}
var speed = (this.value*1 - this.currValue*1) / 4;
this.currValue = this.currValue*1 + speed;
this.updateNeedle(this.animate);
break;
case 'levelBoxStyle':
case 'levelTextStyle':
case 'needleStyle':
case 'outerBodyStyle':
case 'panelStyle':
case 'logoStyle':
case 'format':
this[property] = value;
this.unrender();
this.render();
break;
case 'logo':
this.logo = value;
this.setTextNode('logo',this.logo);
break;
case 'lowLampColor':
case 'highLampColor':
this[property] = value;
this.updateNeedle(false);
break;
case 'width':
case 'height':
return this.invokeSuper('setProperty',arguments);
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_SVGComponent_fuelGauge_updateNeedle = function(animate) {
delete this._timerId;
var range = this._rangeUpper - this._rangeLower;
var valueIsNaN = isNaN(this.value*1);		// DTB586 - Test the value for a useable value
if (animate) {
if ((Math.abs(this.value*1 - this.currValue*1)<=(range/280))) {
this.currValue = this.value*1;
}
}
else {
this.currValue = this.value*1;
}
if (isNaN(this.currValue)) {
this.currValue = 0;
}
var angle = 0;
if (range != 0) {
angle = (((this.currValue - this._rangeLower) / range) * 20) - 10;
}
if (angle <= -10) {
angle = -10;
}
if (angle >= 10) {
angle = 10;
}
var needle = this.findSVGElement('needle');
if (needle) {
needle.setAttribute("transform", "rotate(" + angle + ",50,166)");
}
var shadow = this.findSVGElement('shadow');
if (shadow) {
shadow.setAttribute("transform", "rotate(" + (angle+1) + ",50,166)");
}
var lowLamp = false;
var highLamp = false;
if (this.currValue <= this._thresholdLower) {
lowLamp = true;
}
if (this.currValue >= this._thresholdUpper) {
highLamp = true;
}
var lamp = this.findSVGElement('lowLamp');
if (lamp) {
lamp.style.visibility = (valueIsNaN ? 'hidden' : 'visible');
lamp.setAttribute("fill",lowLamp ? this.lowLampColor : 'none');
}
var lamp = this.findSVGElement('highLamp');
if (lamp) {
lamp.style.visibility = (valueIsNaN ? 'hidden' : 'visible');
lamp.setAttribute("fill",highLamp ? this.highLampColor : 'none');
}
if (animate && (this.value*1 != this.currValue*1)) {
var speed = (this.value*1 - this.currValue*1) / 4;
this.currValue = this.currValue*1 + speed;
if (!valueIsNaN) {		// DTB586
this._timerId = window.setTimeout("{var w = zenPage.getComponent(" + this.index + ");if (w) w.updateNeedle(true);}",50);
}
}
}
self._ZEN_SVGComponent_fuelGauge__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_meter');
	_ZEN_SVGComponent_fuelGauge.prototype = zenCreate('_ZEN_SVGComponent_meter',-1);
	var p = _ZEN_SVGComponent_fuelGauge.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_fuelGauge;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_meter) ? zenMaster._ZEN_SVGComponent_meter.prototype:_ZEN_SVGComponent_meter.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.fuelGauge';
	p._type = 'fuelGauge';
	p.serialize = _ZEN_SVGComponent_fuelGauge_serialize;
	p.getSettings = _ZEN_SVGComponent_fuelGauge_getSettings;
	p.connectToController = _ZEN_SVGComponent_fuelGauge_connectToController;
	p.disconnectFromController = _ZEN_SVGComponent_fuelGauge_disconnectFromController;
	p.getController = _ZEN_SVGComponent_fuelGauge_getController;
	p.notifyView = _ZEN_SVGComponent_fuelGauge_notifyView;
	p.renderMeter = _ZEN_SVGComponent_fuelGauge_renderMeter;
	p.sendEventToController = _ZEN_SVGComponent_fuelGauge_sendEventToController;
	p.setControllerId = _ZEN_SVGComponent_fuelGauge_setControllerId;
	p.setProperty = _ZEN_SVGComponent_fuelGauge_setProperty;
	p.updateNeedle = _ZEN_SVGComponent_fuelGauge_updateNeedle;
}

self._zenClassIdx['hilowChart'] = '_ZEN_SVGComponent_hilowChart';
self._ZEN_SVGComponent_hilowChart = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_hilowChart__init(this,index,id);}
}

self._ZEN_SVGComponent_hilowChart__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_chart__init) ?zenMaster._ZEN_SVGComponent_chart__init(o,index,id):_ZEN_SVGComponent_chart__init(o,index,id);
	o.chartPivot = false;
	o.controller = '';
	o.controllerId = '';
	o.invertedBarStyle = '';
	o.ongetcontroller = '';
	o.onnotifyView = '';
	o.plotToEdge = false;
	o.scrollLeft = '0';
}
function _ZEN_SVGComponent_hilowChart_serialize(set,s)
{
	var o = this;s[0]='2055414458';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.appearance;s[7]=(o.autoScaleText?1:0);s[8]=o.aux;s[9]=o.axisLineStyle;s[10]=o.axisTitleStyle;s[11]=o.backgroundStyle;s[12]=o.bandLower;s[13]=o.bandLowerStyle;s[14]=o.bandUpper;s[15]=o.bandUpperStyle;s[16]=o.baseLineStyle;s[17]=o.borderOffset;s[18]=o.borderRadius;s[19]=o.borderStyle;s[20]=(o.boundless?1:0);s[21]=(o.chartPivot?1:0);s[22]=o.controller;s[23]=o.controllerId;s[24]=o.currMultiple;s[25]=o.currYAxis;s[26]=o.endTime;s[27]=o.gridStyle;s[28]=(o.hasZoom?1:0);s[29]=o.height;s[30]=(o.hidden?1:0);s[31]=o.hzZoomStep;s[32]=o.indicatorStyle;s[33]=(o.indicatorsVisible?1:0);s[34]=o.invertedBarStyle;s[35]=o.labelStyle;s[36]=(o.labelsVisible?1:0);s[37]=o.legendHeight;s[38]=o.legendLabelStyle;s[39]=o.legendRectStyle;s[40]=o.legendStyle;s[41]=o.legendTitle;s[42]=o.legendVisible;s[43]=o.legendWidth;s[44]=o.legendX;s[45]=o.legendY;s[46]=o.lineStyle;s[47]=o.marginBottom;s[48]=o.marginLeft;s[49]=o.marginRight;s[50]=o.marginTop;s[51]=o.markerScale;s[52]=o.markerShapes;s[53]=o.markerStyle;s[54]=(o.markersVisible?1:0);s[55]=o.maxLabelLen;s[56]=o.msgIfNoData;s[57]=o.multipleTitleStyle;s[58]=o.noDataFill;s[59]=o.noDataOpacity;s[60]=o.noDataStroke;s[61]=o.onclick;s[62]=o.onelementClick;s[63]=o.ongetData;s[64]=o.ongetLabelX;s[65]=o.ongetLabelY;s[66]=o.ongetSeriesColor;s[67]=o.ongetTimeEvents;s[68]=o.ongetcontroller;s[69]=o.onnotifyView;s[70]=o.onrenderData;s[71]=o.onrenderPlotArea;s[72]=o.onshowTooltip;s[73]=o.onupdate;s[74]=o.plotAreaStyle;s[75]=o.plotEdgeStyle;s[76]=o.plotStyle;s[77]=(o.plotToEdge?1:0);s[78]=o.position;s[79]=o.preserveAspectRatio;s[80]=o.renderFlag;s[81]=o.scrollButtonStyle;s[82]=o.scrollLeft;s[83]=o.selectedItem;s[84]=o.selectedItemStyle;s[85]=o.selectedSeries;s[86]=o.seriesColorScheme;s[87]=o.seriesColors;s[88]=o.seriesColorsOverride;s[89]=o.seriesCount;s[90]=o.seriesNames;s[91]=o.seriesNumber;s[92]=o.seriesSize;s[93]=o.seriesYAxes;s[94]=(o.showMultiples?1:0);s[95]=o.startTime;s[96]=o.stripeStyle;s[97]=(o.stripesVisible?1:0);s[98]=o.subtitle;s[99]=o.subtitleStyle;s[100]=o.tag;s[101]=o.textSize;s[102]=(o.timeBased?1:0);s[103]=o.title;s[104]=o.titleAlign;s[105]=o.titleBoxStyle;s[106]=o.titleImage;s[107]=o.titleImageStyle;s[108]=o.titleStyle;s[109]=o.titleX;s[110]=o.titleY;s[111]=o.tooltipRectStyle;s[112]=o.tuple;s[113]=o.unselectedItemStyle;s[114]=o.valueBoxStyle;s[115]=o.valueLabelFormat;s[116]=o.valueLabelStyle;s[117]=(o.valueLabelsVisible?1:0);s[118]=o.viewBoxHeight;s[119]=o.viewBoxWidth;s[120]=(o.visible?1:0);s[121]=(o.warnIfNoData?1:0);s[122]=o.width;s[123]=o.x;s[124]=set.addObject(o.xAxis,'xAxis');s[125]=o.y;s[126]=set.addObject(o.yAxis,'yAxis');s[127]=set.serializeList(o,o.yAxisList,true,'yAxisList');
}
function _ZEN_SVGComponent_hilowChart_getSettings(s)
{
	s['name'] = 'string';
	s['chartPivot'] = 'boolean';
	s['controllerId'] = 'id';
	s['invertedBarStyle'] = 'svgStyle';
	s['ongetcontroller'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_hilowChart_connectToController = function() {
this.controller = '';
if (!zenIsMissing(this.controllerId)) {
if (this.composite) {
this.controller = this.composite.getChildById(this.controllerId);
}
else {
this.controller = zenPage.getComponentById(this.controllerId);
}
if (this.controller && this.controller.register) {
this.controller.register(this);
}
else {
alert('ZEN: Unable to connect component to dataController (' + this.id + ').');
}
if (this.controller) {
if ('' == this.controller.modelError) {
this.controller.loadModel(false);
}
}
}
}

self._ZEN_SVGComponent_hilowChart_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._ZEN_SVGComponent_hilowChart_getChartElementStyle = function(series,item) {
return this.plotStyle;
}

self._ZEN_SVGComponent_hilowChart_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._ZEN_SVGComponent_hilowChart_getLegendLabels = function() {
var legends = new Array(1);
var names = this.getSeriesNames();
legends[0] = names[0];
return legends;
}

self._ZEN_SVGComponent_hilowChart_getXAxisType = function() {
return this.chartPivot ? 'value' : 'category';
}

self._ZEN_SVGComponent_hilowChart_getYAxisType = function() {
return this.chartPivot ? 'category' : 'value';
}

self._ZEN_SVGComponent_hilowChart_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_hilowChart_renderSeries = function(group) {
var x,y,val;
var scount = this.getSeriesCount();
var items = this.getSeriesSize();
scount = (scount > 3) ? 3 : scount;
var hasSelect = this.hasSelectedItem();
var scaleX = this._scaleX ? this._scaleX : 1;
var scaleY = this._scaleY ? this._scaleY : 1;
if (items > 0) {
var data = new Array(scount);
for (var s = 0; s < scount; s++) {
data[s] = this.getSeriesData(s);
}
var delta,barsize,adj;
var color = this.getSeriesColor(0);
var x = 0;
var y = 0;
if (!this.chartPivot) {
if (this.plotToEdge) {
delta = (items<=1) ? this._plotWidth : (this._plotWidth / (items-1));
adj = delta;
}
else {
delta = this._plotWidth / items;
adj = (delta/2);
}
barsize = (0.25) * (this._plotWidth / items);
}
else {
if (this.plotToEdge) {
delta = (items<=1) ? this._plotHeight : (this._plotHeight / (items-1));
adj = delta;
}
else {
delta = this._plotHeight / items;
adj = (delta/2);
}
barsize = (0.25) * (this._plotHeight / items);
}
var shift = -barsize/2;
for (var n = 0; n < items; n++) {
var hi = (null == data[0]) ? 0 : ((null == data[0][n]) ? 0 : parseFloat(data[0][n]));
var low = (null == data[1]) ? 0 : ((null == data[1][n]) ? 0 : parseFloat(data[1][n]));
var close = (null == data[2]) ? 0 : ((null == data[2][n]) ? 0 : parseFloat(data[2][n]));
var bar = this.document.createElementNS(SVGNS,"rect");
bar.setAttribute("class","chart-seriesBar");
bar.setAttribute("fill",color);
var barStyle = '';
group.appendChild(bar);
var marker = null;
if (scount > 2) {
marker = this.document.createElementNS(SVGNS,"polyline");
marker.setAttribute("class","chart-seriesBar");
marker.setAttribute("style",this.plotStyle + ";fill:"+color+";");
group.appendChild(marker);
}
if (!this.chartPivot) {
x += delta;
var top = this.getPlotY(hi) - this._plotTop;
var bottom = this.getPlotY(low) - this._plotTop;
var mid = this.getPlotY(close) - this._plotTop;
if (marker) {
var points = '0,5 0,-5 5,0 0,5';
marker.setAttribute("points",points);
marker.setAttribute("transform",'translate('+((x-adj-shift)*scaleX)+','+(mid*scaleY)+')');
}
var hgt = bottom-top;
if (hgt < 0) {
var a = top;
top = bottom;
bottom = a;
hgt = -hgt;
bar.setAttribute("class","chart-seriesBarInverted");
barStyle = this.invertedBarStyle;
}
bar.setAttribute("x",(x-adj+shift)*scaleX);
bar.setAttribute("y",top*scaleY);
bar.setAttribute("width",barsize*scaleX);
bar.setAttribute("height",hgt*scaleY);
}
else {
y += delta;
var right = this.getPlotX(hi) - this._plotLeft;
var left = this.getPlotX(low) - this._plotLeft;
var mid = this.getPlotX(close) - this._plotLeft;
if (marker) {
var points = '-5,0 5,0 0,5 -5,0';
marker.setAttribute("points",points);
marker.setAttribute("transform",'translate('+(mid*scaleX)+','+((y-adj-shift)*scaleY)+')');
}
var wid = right-left;
if (wid < 0) {
var a = right;
right = left;
left = a;
wid = -wid;
bar.setAttribute("class","chart-seriesBarInverted");
barStyle = this.invertedBarStyle;
}
bar.setAttribute("x",left*scaleX);
bar.setAttribute("y",(y-adj+shift)*scaleY);
bar.setAttribute("width",wid*scaleX);
bar.setAttribute("height",barsize*scaleY);
}
if (hasSelect) {
if (0 == this.selectedSeries && n == this.selectedItem) {
bar.setAttribute("style",this.plotStyle + ";" + this.selectedItemStyle + ";" + barStyle);
}
else {
bar.setAttribute("style",this.plotStyle + ";" + this.unselectedItemStyle + ";" + barStyle);
}
}
else {
bar.setAttribute("style",this.plotStyle+";"+barStyle);
}
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementClickHandler(evt,0,'+n+');');
bar.addEventListener('click',f,false);
bar.setAttribute('id',this.makeId('el_0_' + n));
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementMouseOver(evt,'+0+','+n+');');
bar.addEventListener('mouseover',f,false);
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementMouseOut(evt,'+0+','+n+');');
bar.addEventListener('mouseout',f,false);
}
}
}

self._ZEN_SVGComponent_hilowChart_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_hilowChart_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._ZEN_SVGComponent_hilowChart_setProperty = function(property,value,value2) {
switch(property) {
case 'chartPivot':
case 'invertedBarStyle':
this[property] = value ? true : false;
this.render();
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_SVGComponent_hilowChart_useSumForRange = function() {
return this.chartStacked;
}
self._ZEN_SVGComponent_hilowChart__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_chart');
	_ZEN_SVGComponent_hilowChart.prototype = zenCreate('_ZEN_SVGComponent_chart',-1);
	var p = _ZEN_SVGComponent_hilowChart.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_hilowChart;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_chart) ? zenMaster._ZEN_SVGComponent_chart.prototype:_ZEN_SVGComponent_chart.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.hilowChart';
	p._type = 'hilowChart';
	p.serialize = _ZEN_SVGComponent_hilowChart_serialize;
	p.getSettings = _ZEN_SVGComponent_hilowChart_getSettings;
	p.connectToController = _ZEN_SVGComponent_hilowChart_connectToController;
	p.disconnectFromController = _ZEN_SVGComponent_hilowChart_disconnectFromController;
	p.getChartElementStyle = _ZEN_SVGComponent_hilowChart_getChartElementStyle;
	p.getController = _ZEN_SVGComponent_hilowChart_getController;
	p.getLegendLabels = _ZEN_SVGComponent_hilowChart_getLegendLabels;
	p.getXAxisType = _ZEN_SVGComponent_hilowChart_getXAxisType;
	p.getYAxisType = _ZEN_SVGComponent_hilowChart_getYAxisType;
	p.notifyView = _ZEN_SVGComponent_hilowChart_notifyView;
	p.renderSeries = _ZEN_SVGComponent_hilowChart_renderSeries;
	p.sendEventToController = _ZEN_SVGComponent_hilowChart_sendEventToController;
	p.setControllerId = _ZEN_SVGComponent_hilowChart_setControllerId;
	p.setProperty = _ZEN_SVGComponent_hilowChart_setProperty;
	p.useSumForRange = _ZEN_SVGComponent_hilowChart_useSumForRange;
}

self._zenClassIdx['indicatorLamp'] = '_ZEN_SVGComponent_indicatorLamp';
self._ZEN_SVGComponent_indicatorLamp = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_indicatorLamp__init(this,index,id);}
}

self._ZEN_SVGComponent_indicatorLamp__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_meter__init) ?zenMaster._ZEN_SVGComponent_meter__init(o,index,id):_ZEN_SVGComponent_meter__init(o,index,id);
	o.controller = '';
	o.controllerId = '';
	o.highStyle = 'fill: url(#glow-green);';
	o.lowStyle = 'fill: url(#glow-red);';
	o.normalStyle = 'fill: url(#glow-blue);';
	o.ongetcontroller = '';
	o.onnotifyView = '';
	o.viewBoxHeight = '25';
}
function _ZEN_SVGComponent_indicatorLamp_serialize(set,s)
{
	var o = this;s[0]='129424034';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=(o.animate?1:0);s[7]=o.aux;s[8]=(o.boundless?1:0);s[9]=o.controller;s[10]=o.controllerId;s[11]=o.dataBinding;s[12]=(o.disabled?1:0);s[13]=o.height;s[14]=(o.hidden?1:0);s[15]=o.highStyle;s[16]=o.label;s[17]=o.labelStyle;s[18]=o.lowStyle;s[19]=o.normalStyle;s[20]=o.onchange;s[21]=o.onclick;s[22]=o.ongetcontroller;s[23]=o.onnotifyView;s[24]=o.onupdate;s[25]=o.position;s[26]=o.preserveAspectRatio;s[27]=o.rangeLower;s[28]=o.rangeUpper;s[29]=o.renderFlag;s[30]=o.scaleFactor;s[31]=(o.showConditionally?1:0);s[32]=o.targetValue;s[33]=o.thresholdLower;s[34]=o.thresholdUpper;s[35]=o.tuple;s[36]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[37]=o.viewBoxHeight;s[38]=o.viewBoxWidth;s[39]=(o.visible?1:0);s[40]=o.width;s[41]=o.x;s[42]=o.y;
}
function _ZEN_SVGComponent_indicatorLamp_getSettings(s)
{
	s['name'] = 'string';
	s['controllerId'] = 'id';
	s['highStyle'] = 'svgStyle';
	s['lowStyle'] = 'svgStyle';
	s['normalStyle'] = 'svgStyle';
	s['ongetcontroller'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_indicatorLamp_connectToController = function() {
this.controller = '';
if (!zenIsMissing(this.controllerId)) {
if (this.composite) {
this.controller = this.composite.getChildById(this.controllerId);
}
else {
this.controller = zenPage.getComponentById(this.controllerId);
}
if (this.controller && this.controller.register) {
this.controller.register(this);
}
else {
alert('ZEN: Unable to connect component to dataController (' + this.id + ').');
}
if (this.controller) {
if ('' == this.controller.modelError) {
this.controller.loadModel(false);
}
}
}
}

self._ZEN_SVGComponent_indicatorLamp_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._ZEN_SVGComponent_indicatorLamp_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._ZEN_SVGComponent_indicatorLamp_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_indicatorLamp_renderMeter = function() {
var body = this.document.createElementNS(SVGNS,'rect');
body.setAttribute('class','indicatorLamp-body');
body.setAttribute('fill','black');
body.setAttribute('x',5);
body.setAttribute('y',2.5);
body.setAttribute('width',90);
body.setAttribute('height',20);
body.setAttribute('rx',2);
this.svgGroup.appendChild(body);
var rect = this.document.createElementNS(SVGNS,'rect');
rect.setAttribute('id',this.makeId('lamp'));
rect.setAttribute('class','indicatorLamp-body');
rect.setAttribute('x',5);
rect.setAttribute('y',2.5);
rect.setAttribute('width',90);
rect.setAttribute('height',20);
rect.setAttribute('rx',5);
this.svgGroup.appendChild(rect);
var label = this.document.createElementNS(SVGNS,'text');
label.setAttribute('id',this.makeId('label'));
label.setAttribute('class','indicatorLamp-text');
label.setAttribute('style',this.labelStyle);
label.setAttribute('x',50);
label.setAttribute('y',18);
label.setAttribute('text-anchor','middle');
var textNode = this.document.createTextNode(this.label);
label.appendChild(textNode);
this.svgGroup.appendChild(label);
this.updateLamp();
}

self._ZEN_SVGComponent_indicatorLamp_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_indicatorLamp_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._ZEN_SVGComponent_indicatorLamp_setProperty = function(property,value,value2) {
switch(property) {
case 'value':
this.value = value;
this.updateLamp();
break;
case 'labelStyle':
case 'lowStyle':
case 'highStyle':
case 'normalStyle':
this[property] = value;
this.updateLamp();
break;
case 'width':
case 'height':
return this.invokeSuper('setProperty',arguments);
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_SVGComponent_indicatorLamp_updateLamp = function() {
var tlower = parseFloat(this.thresholdLower);
var tupper = parseFloat(this.thresholdUpper);
var style = this.normalStyle;
var value = parseFloat(this.value);
if (parseFloat(this.rangeUpper) >= parseFloat(this.rangeLower)) {
if (value <= tlower) {
style = this.lowStyle;
}
else if (value >= tupper) {
style = this.highStyle;
}
}
else {
if (value <= tupper) {
style = this.lowStyle;
}
else if (value >= tlower) {
style = this.highStyle;
}
}
var lamp = this.findSVGElement("lamp");
lamp.setAttribute("style", style);
}
self._ZEN_SVGComponent_indicatorLamp__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_meter');
	_ZEN_SVGComponent_indicatorLamp.prototype = zenCreate('_ZEN_SVGComponent_meter',-1);
	var p = _ZEN_SVGComponent_indicatorLamp.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_indicatorLamp;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_meter) ? zenMaster._ZEN_SVGComponent_meter.prototype:_ZEN_SVGComponent_meter.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.indicatorLamp';
	p._type = 'indicatorLamp';
	p.serialize = _ZEN_SVGComponent_indicatorLamp_serialize;
	p.getSettings = _ZEN_SVGComponent_indicatorLamp_getSettings;
	p.connectToController = _ZEN_SVGComponent_indicatorLamp_connectToController;
	p.disconnectFromController = _ZEN_SVGComponent_indicatorLamp_disconnectFromController;
	p.getController = _ZEN_SVGComponent_indicatorLamp_getController;
	p.notifyView = _ZEN_SVGComponent_indicatorLamp_notifyView;
	p.renderMeter = _ZEN_SVGComponent_indicatorLamp_renderMeter;
	p.sendEventToController = _ZEN_SVGComponent_indicatorLamp_sendEventToController;
	p.setControllerId = _ZEN_SVGComponent_indicatorLamp_setControllerId;
	p.setProperty = _ZEN_SVGComponent_indicatorLamp_setProperty;
	p.updateLamp = _ZEN_SVGComponent_indicatorLamp_updateLamp;
}

self._zenClassIdx['lightBar'] = '_ZEN_SVGComponent_lightBar';
self._ZEN_SVGComponent_lightBar = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_lightBar__init(this,index,id);}
}

self._ZEN_SVGComponent_lightBar__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_meter__init) ?zenMaster._ZEN_SVGComponent_meter__init(o,index,id):_ZEN_SVGComponent_meter__init(o,index,id);
	o.controller = '';
	o.controllerId = '';
	o.highLampColor = 'url(#glow-red)';
	o.lowLampColor = 'url(#glow-red)';
	o.ongetcontroller = '';
	o.onnotifyView = '';
	o.outerBodyStyle = '';
	o.viewBoxWidth = '50';
}
function _ZEN_SVGComponent_lightBar_serialize(set,s)
{
	var o = this;s[0]='1235227394';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=(o.animate?1:0);s[7]=o.aux;s[8]=(o.boundless?1:0);s[9]=o.controller;s[10]=o.controllerId;s[11]=o.dataBinding;s[12]=(o.disabled?1:0);s[13]=o.height;s[14]=(o.hidden?1:0);s[15]=o.highLampColor;s[16]=o.label;s[17]=o.labelStyle;s[18]=o.lowLampColor;s[19]=o.onchange;s[20]=o.onclick;s[21]=o.ongetcontroller;s[22]=o.onnotifyView;s[23]=o.onupdate;s[24]=o.outerBodyStyle;s[25]=o.position;s[26]=o.preserveAspectRatio;s[27]=o.rangeLower;s[28]=o.rangeUpper;s[29]=o.renderFlag;s[30]=o.scaleFactor;s[31]=(o.showConditionally?1:0);s[32]=o.targetValue;s[33]=o.thresholdLower;s[34]=o.thresholdUpper;s[35]=o.tuple;s[36]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[37]=o.viewBoxHeight;s[38]=o.viewBoxWidth;s[39]=(o.visible?1:0);s[40]=o.width;s[41]=o.x;s[42]=o.y;
}
function _ZEN_SVGComponent_lightBar_getSettings(s)
{
	s['name'] = 'string';
	s['controllerId'] = 'id';
	s['highLampColor'] = 'color';
	s['lowLampColor'] = 'color';
	s['ongetcontroller'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	s['outerBodyStyle'] = 'style';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_lightBar_connectToController = function() {
this.controller = '';
if (!zenIsMissing(this.controllerId)) {
if (this.composite) {
this.controller = this.composite.getChildById(this.controllerId);
}
else {
this.controller = zenPage.getComponentById(this.controllerId);
}
if (this.controller && this.controller.register) {
this.controller.register(this);
}
else {
alert('ZEN: Unable to connect component to dataController (' + this.id + ').');
}
if (this.controller) {
if ('' == this.controller.modelError) {
this.controller.loadModel(false);
}
}
}
}

self._ZEN_SVGComponent_lightBar_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._ZEN_SVGComponent_lightBar_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._ZEN_SVGComponent_lightBar_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_lightBar_renderMeter = function() {
var body = this.document.createElementNS(SVGNS,'rect');
body.setAttribute('class','lightBar-body');
body.setAttribute('fill','url(#lightBar-bodyGrad)');
body.setAttribute('style',this.outerBodyStyle);
body.setAttribute('x',10);
body.setAttribute('y',8);
body.setAttribute('width',30);
body.setAttribute('height',74);
body.setAttribute('rx',5);
this.svgGroup.appendChild(body);
var lamp = this.document.createElementNS(SVGNS,'circle');
lamp.setAttribute('id',this.makeId('lowLamp'));
lamp.setAttribute('class','lightBar-lamp');
lamp.setAttribute('fill','none');
lamp.setAttribute('cx',14);
lamp.setAttribute('cy',76.5);
lamp.setAttribute('r',2);
this.svgGroup.appendChild(lamp);
var lamp = this.document.createElementNS(SVGNS,'circle');
lamp.setAttribute('id',this.makeId('highLamp'));
lamp.setAttribute('class','lightBar-lamp');
lamp.setAttribute('fill','none');
lamp.setAttribute('cx',14);
lamp.setAttribute('cy',13);
lamp.setAttribute('r',2);
this.svgGroup.appendChild(lamp);
var y = 11;
for (var n = 9; n >= 0; n--) {
var color = (n>=8 ? '#200000;' : (n>=7 ? '#202000;' : '#002000;'));
var bar = this.document.createElementNS(SVGNS,'rect');
bar.setAttribute('class','lightBar-lampOFF');
bar.setAttribute('fill',color);
bar.setAttribute('x',18);
bar.setAttribute('y',y);
bar.setAttribute('width',14);
bar.setAttribute('height',5);
bar.setAttribute('rx',2);
this.svgGroup.appendChild(bar);
var bar = this.document.createElementNS(SVGNS,'rect');
bar.setAttribute('id',this.makeId('lamp_'+n));
bar.setAttribute('class','lightBar-lampON');
bar.setAttribute('fill','none');
bar.setAttribute('x',18);
bar.setAttribute('y',y);
bar.setAttribute('width',14);
bar.setAttribute('height',5);
bar.setAttribute('rx',2);
this.svgGroup.appendChild(bar);
y += 7;
}
this.renderLabel('50%',95);
this.updateLamps(false);
}

self._ZEN_SVGComponent_lightBar_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_lightBar_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._ZEN_SVGComponent_lightBar_setProperty = function(property,value,value2) {
switch(property) {
case 'value':
if (this._timerId) {
window.clearTimeout(this._timerId);
delete this._timerId;
}
this.value = value;
if (null == this.currValue) {
this.currValue = 0;
}
var speed = (this.value*1 - this.currValue*1) / 4;
this.currValue = this.currValue*1 + speed;
this.updateLamps(this.animate);
break;
case 'outerBodyStyle':
this[property] = value;
this.unrender();
this.render();
break;
case 'lowLampColor':
case 'highLampColor':
this[property] = value;
this.updateLamps(false);
break;
case 'width':
case 'height':
return this.invokeSuper('setProperty',arguments);
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_SVGComponent_lightBar_updateLamps = function(animate) {
delete this._timerId;
var range = this._rangeUpper - this._rangeLower;
if (null == this.currValue) {
this.currValue = 0;
}
if (animate) {
if ((Math.abs(this.value*1 - this.currValue*1)<=(range/50))) {
this.currValue = this.value*1;
}
}
else {
this.currValue = this.value*1;
}
var bars = 0;
var fraction = 0;
if (range != 0) {
bars = (((this.currValue - this._rangeLower) / range) * 10);
fraction = bars - Math.floor(bars);
}
if (bars <= 0) {
bars = 0;
}
if (bars >= 10) {
bars = 10;
}
for (var n = 0; n != 10; n++) {
var off = (n >= bars);
var lamp = this.findSVGElement('lamp_' + n);
if (n <=6 ) {
lamp.setAttribute("fill",(off) ? "none" : "url(#glow-green)");
}
else if (n == 7) {
lamp.setAttribute("fill",(off) ? "none" : "url(#glow-yellow)");
}
else {
lamp.setAttribute("fill",(off) ? "none" : "url(#glow-red)");
}
if ((n == Math.floor(bars)) && (fraction != 0)) {
lamp.setAttribute("fill-opacity", (0.0 + (fraction / 1)));
}
else {
lamp.setAttribute("fill-opacity", 1.0);
}
}
var lowLamp = false;
var highLamp = false;
if (this.currValue <= this._thresholdLower) {
lowLamp = true;
}
if (this.currValue >= this._thresholdUpper) {
highLamp = true;
}
var lamp = this.findSVGElement('lowLamp');
if (lamp) {
lamp.setAttribute("fill",lowLamp ? this.lowLampColor : 'none');
}
var lamp = this.findSVGElement('highLamp');
if (lamp) {
lamp.setAttribute("fill",highLamp ? this.highLampColor : 'none');
}
if (animate && (this.value*1 != this.currValue*1)) {
var speed = (this.value*1 - this.currValue*1) / 2;
this.currValue = this.currValue*1 + speed;
this._timerId = window.setTimeout("zenPage.getComponent(" + this.index + ").updateLamps(true)",50);
}
}
self._ZEN_SVGComponent_lightBar__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_meter');
	_ZEN_SVGComponent_lightBar.prototype = zenCreate('_ZEN_SVGComponent_meter',-1);
	var p = _ZEN_SVGComponent_lightBar.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_lightBar;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_meter) ? zenMaster._ZEN_SVGComponent_meter.prototype:_ZEN_SVGComponent_meter.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.lightBar';
	p._type = 'lightBar';
	p.serialize = _ZEN_SVGComponent_lightBar_serialize;
	p.getSettings = _ZEN_SVGComponent_lightBar_getSettings;
	p.connectToController = _ZEN_SVGComponent_lightBar_connectToController;
	p.disconnectFromController = _ZEN_SVGComponent_lightBar_disconnectFromController;
	p.getController = _ZEN_SVGComponent_lightBar_getController;
	p.notifyView = _ZEN_SVGComponent_lightBar_notifyView;
	p.renderMeter = _ZEN_SVGComponent_lightBar_renderMeter;
	p.sendEventToController = _ZEN_SVGComponent_lightBar_sendEventToController;
	p.setControllerId = _ZEN_SVGComponent_lightBar_setControllerId;
	p.setProperty = _ZEN_SVGComponent_lightBar_setProperty;
	p.updateLamps = _ZEN_SVGComponent_lightBar_updateLamps;
}

self._zenClassIdx['lineChart'] = '_ZEN_SVGComponent_lineChart';
self._ZEN_SVGComponent_lineChart = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_lineChart__init(this,index,id);}
}

self._ZEN_SVGComponent_lineChart__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_chart__init) ?zenMaster._ZEN_SVGComponent_chart__init(o,index,id):_ZEN_SVGComponent_chart__init(o,index,id);
	o.chartFilled = false;
	o.chartPivot = false;
	o.chartStacked = false;
	o.controller = '';
	o.controllerId = '';
	o.ongetcontroller = '';
	o.onnotifyView = '';
	o.scrollLeft = '0';
}
function _ZEN_SVGComponent_lineChart_serialize(set,s)
{
	var o = this;s[0]='2938630375';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.appearance;s[7]=(o.autoScaleText?1:0);s[8]=o.aux;s[9]=o.axisLineStyle;s[10]=o.axisTitleStyle;s[11]=o.backgroundStyle;s[12]=o.bandLower;s[13]=o.bandLowerStyle;s[14]=o.bandUpper;s[15]=o.bandUpperStyle;s[16]=o.baseLineStyle;s[17]=o.borderOffset;s[18]=o.borderRadius;s[19]=o.borderStyle;s[20]=(o.boundless?1:0);s[21]=(o.chartFilled?1:0);s[22]=(o.chartPivot?1:0);s[23]=(o.chartStacked?1:0);s[24]=o.controller;s[25]=o.controllerId;s[26]=o.currMultiple;s[27]=o.currYAxis;s[28]=o.endTime;s[29]=o.gridStyle;s[30]=(o.hasZoom?1:0);s[31]=o.height;s[32]=(o.hidden?1:0);s[33]=o.hzZoomStep;s[34]=o.indicatorStyle;s[35]=(o.indicatorsVisible?1:0);s[36]=o.labelStyle;s[37]=(o.labelsVisible?1:0);s[38]=o.legendHeight;s[39]=o.legendLabelStyle;s[40]=o.legendRectStyle;s[41]=o.legendStyle;s[42]=o.legendTitle;s[43]=o.legendVisible;s[44]=o.legendWidth;s[45]=o.legendX;s[46]=o.legendY;s[47]=o.lineStyle;s[48]=o.marginBottom;s[49]=o.marginLeft;s[50]=o.marginRight;s[51]=o.marginTop;s[52]=o.markerScale;s[53]=o.markerShapes;s[54]=o.markerStyle;s[55]=(o.markersVisible?1:0);s[56]=o.maxLabelLen;s[57]=o.msgIfNoData;s[58]=o.multipleTitleStyle;s[59]=o.noDataFill;s[60]=o.noDataOpacity;s[61]=o.noDataStroke;s[62]=o.onclick;s[63]=o.onelementClick;s[64]=o.ongetData;s[65]=o.ongetLabelX;s[66]=o.ongetLabelY;s[67]=o.ongetSeriesColor;s[68]=o.ongetTimeEvents;s[69]=o.ongetcontroller;s[70]=o.onnotifyView;s[71]=o.onrenderData;s[72]=o.onrenderPlotArea;s[73]=o.onshowTooltip;s[74]=o.onupdate;s[75]=o.plotAreaStyle;s[76]=o.plotEdgeStyle;s[77]=o.plotStyle;s[78]=(o.plotToEdge?1:0);s[79]=o.position;s[80]=o.preserveAspectRatio;s[81]=o.renderFlag;s[82]=o.scrollButtonStyle;s[83]=o.scrollLeft;s[84]=o.selectedItem;s[85]=o.selectedItemStyle;s[86]=o.selectedSeries;s[87]=o.seriesColorScheme;s[88]=o.seriesColors;s[89]=o.seriesColorsOverride;s[90]=o.seriesCount;s[91]=o.seriesNames;s[92]=o.seriesNumber;s[93]=o.seriesSize;s[94]=o.seriesYAxes;s[95]=(o.showMultiples?1:0);s[96]=o.startTime;s[97]=o.stripeStyle;s[98]=(o.stripesVisible?1:0);s[99]=o.subtitle;s[100]=o.subtitleStyle;s[101]=o.tag;s[102]=o.textSize;s[103]=(o.timeBased?1:0);s[104]=o.title;s[105]=o.titleAlign;s[106]=o.titleBoxStyle;s[107]=o.titleImage;s[108]=o.titleImageStyle;s[109]=o.titleStyle;s[110]=o.titleX;s[111]=o.titleY;s[112]=o.tooltipRectStyle;s[113]=o.tuple;s[114]=o.unselectedItemStyle;s[115]=o.valueBoxStyle;s[116]=o.valueLabelFormat;s[117]=o.valueLabelStyle;s[118]=(o.valueLabelsVisible?1:0);s[119]=o.viewBoxHeight;s[120]=o.viewBoxWidth;s[121]=(o.visible?1:0);s[122]=(o.warnIfNoData?1:0);s[123]=o.width;s[124]=o.x;s[125]=set.addObject(o.xAxis,'xAxis');s[126]=o.y;s[127]=set.addObject(o.yAxis,'yAxis');s[128]=set.serializeList(o,o.yAxisList,true,'yAxisList');
}
function _ZEN_SVGComponent_lineChart_getSettings(s)
{
	s['name'] = 'string';
	s['chartFilled'] = 'boolean';
	s['chartPivot'] = 'boolean';
	s['chartStacked'] = 'boolean';
	s['controllerId'] = 'id';
	s['ongetcontroller'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_lineChart_connectToController = function() {
this.controller = '';
if (!zenIsMissing(this.controllerId)) {
if (this.composite) {
this.controller = this.composite.getChildById(this.controllerId);
}
else {
this.controller = zenPage.getComponentById(this.controllerId);
}
if (this.controller && this.controller.register) {
this.controller.register(this);
}
else {
alert('ZEN: Unable to connect component to dataController (' + this.id + ').');
}
if (this.controller) {
if ('' == this.controller.modelError) {
this.controller.loadModel(false);
}
}
}
}

self._ZEN_SVGComponent_lineChart_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._ZEN_SVGComponent_lineChart_getChartElementStyle = function(series,item) {
if (this.markersVisible) {
return this.markerStyle;
}
else {
return this.lineStyle;
}
}

self._ZEN_SVGComponent_lineChart_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._ZEN_SVGComponent_lineChart_getXAxisType = function() {
return this.chartPivot ? 'value' : 'category';
}

self._ZEN_SVGComponent_lineChart_getYAxisType = function() {
return this.chartPivot ? 'category' : 'value';
}

self._ZEN_SVGComponent_lineChart_hasMultiples = function() {
return this.showMultiples;
}

self._ZEN_SVGComponent_lineChart_isTimeBased = function() {
return this.chartPivot ? false : this.timeBased;
}

self._ZEN_SVGComponent_lineChart_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_lineChart_renderSeries = function(group) {
var x,y,val,missing,nextMissing,prevMissing;
var scount = this.getSeriesCount();
var items = this.getSeriesSize();
var firstPoint = false;
var hasSelect = !zenIsMissing(this.selectedSeries) && !zenIsMissing(this.selectedItem) && (this.selectedSeries >= 0) && (this.selectedItem >= 0);
var seriesNumber = parseInt(this.seriesNumber);
if (!isNaN(seriesNumber)) {
scount = 1;
}
if (this.showMultiples) {
seriesNumber = this.currMultiple;
scount = 1;
}
if (items > 0) {
var data = new Array(scount);
if (!isNaN(seriesNumber)) {
data[0] = this.getSeriesData(seriesNumber);
}
else {
for (var s = 0; s < scount; s++) {
data[s] = this.getSeriesData(s);
}
}
for (var s = scount-1; s >=0; s--) {
this.plotLineForSeries(group,s,data,this.chartStacked,this.chartFilled,this.markersVisible,true);
}
}
}

self._ZEN_SVGComponent_lineChart_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_lineChart_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._ZEN_SVGComponent_lineChart_setProperty = function(property,value,value2) {
switch(property) {
case 'chartPivot':
case 'chartFilled':
case 'chartStacked':
this[property] = value ? true : false;
this.render();
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_SVGComponent_lineChart_useSumForRange = function() {
return (''==this.seriesNumber)&&this.chartStacked;
}
self._ZEN_SVGComponent_lineChart__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_chart');
	_ZEN_SVGComponent_lineChart.prototype = zenCreate('_ZEN_SVGComponent_chart',-1);
	var p = _ZEN_SVGComponent_lineChart.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_lineChart;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_chart) ? zenMaster._ZEN_SVGComponent_chart.prototype:_ZEN_SVGComponent_chart.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.lineChart';
	p._type = 'lineChart';
	p.serialize = _ZEN_SVGComponent_lineChart_serialize;
	p.getSettings = _ZEN_SVGComponent_lineChart_getSettings;
	p.connectToController = _ZEN_SVGComponent_lineChart_connectToController;
	p.disconnectFromController = _ZEN_SVGComponent_lineChart_disconnectFromController;
	p.getChartElementStyle = _ZEN_SVGComponent_lineChart_getChartElementStyle;
	p.getController = _ZEN_SVGComponent_lineChart_getController;
	p.getXAxisType = _ZEN_SVGComponent_lineChart_getXAxisType;
	p.getYAxisType = _ZEN_SVGComponent_lineChart_getYAxisType;
	p.hasMultiples = _ZEN_SVGComponent_lineChart_hasMultiples;
	p.isTimeBased = _ZEN_SVGComponent_lineChart_isTimeBased;
	p.notifyView = _ZEN_SVGComponent_lineChart_notifyView;
	p.renderSeries = _ZEN_SVGComponent_lineChart_renderSeries;
	p.sendEventToController = _ZEN_SVGComponent_lineChart_sendEventToController;
	p.setControllerId = _ZEN_SVGComponent_lineChart_setControllerId;
	p.setProperty = _ZEN_SVGComponent_lineChart_setProperty;
	p.useSumForRange = _ZEN_SVGComponent_lineChart_useSumForRange;
}

self._zenClassIdx['percentbarChart'] = '_ZEN_SVGComponent_percentbarChart';
self._ZEN_SVGComponent_percentbarChart = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_percentbarChart__init(this,index,id);}
}

self._ZEN_SVGComponent_percentbarChart__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_chart__init) ?zenMaster._ZEN_SVGComponent_chart__init(o,index,id):_ZEN_SVGComponent_chart__init(o,index,id);
	o.appearance = '3D';
	o.chartPivot = false;
	o.controller = '';
	o.controllerId = '';
	o.ongetcontroller = '';
	o.onnotifyView = '';
	o.plotToEdge = false;
	o.scrollLeft = '0';
}
function _ZEN_SVGComponent_percentbarChart_serialize(set,s)
{
	var o = this;s[0]='485344451';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.appearance;s[7]=(o.autoScaleText?1:0);s[8]=o.aux;s[9]=o.axisLineStyle;s[10]=o.axisTitleStyle;s[11]=o.backgroundStyle;s[12]=o.bandLower;s[13]=o.bandLowerStyle;s[14]=o.bandUpper;s[15]=o.bandUpperStyle;s[16]=o.baseLineStyle;s[17]=o.borderOffset;s[18]=o.borderRadius;s[19]=o.borderStyle;s[20]=(o.boundless?1:0);s[21]=(o.chartPivot?1:0);s[22]=o.controller;s[23]=o.controllerId;s[24]=o.currMultiple;s[25]=o.currYAxis;s[26]=o.endTime;s[27]=o.gridStyle;s[28]=(o.hasZoom?1:0);s[29]=o.height;s[30]=(o.hidden?1:0);s[31]=o.hzZoomStep;s[32]=o.indicatorStyle;s[33]=(o.indicatorsVisible?1:0);s[34]=o.labelStyle;s[35]=(o.labelsVisible?1:0);s[36]=o.legendHeight;s[37]=o.legendLabelStyle;s[38]=o.legendRectStyle;s[39]=o.legendStyle;s[40]=o.legendTitle;s[41]=o.legendVisible;s[42]=o.legendWidth;s[43]=o.legendX;s[44]=o.legendY;s[45]=o.lineStyle;s[46]=o.marginBottom;s[47]=o.marginLeft;s[48]=o.marginRight;s[49]=o.marginTop;s[50]=o.markerScale;s[51]=o.markerShapes;s[52]=o.markerStyle;s[53]=(o.markersVisible?1:0);s[54]=o.maxLabelLen;s[55]=o.msgIfNoData;s[56]=o.multipleTitleStyle;s[57]=o.noDataFill;s[58]=o.noDataOpacity;s[59]=o.noDataStroke;s[60]=o.onclick;s[61]=o.onelementClick;s[62]=o.ongetData;s[63]=o.ongetLabelX;s[64]=o.ongetLabelY;s[65]=o.ongetSeriesColor;s[66]=o.ongetTimeEvents;s[67]=o.ongetcontroller;s[68]=o.onnotifyView;s[69]=o.onrenderData;s[70]=o.onrenderPlotArea;s[71]=o.onshowTooltip;s[72]=o.onupdate;s[73]=o.plotAreaStyle;s[74]=o.plotEdgeStyle;s[75]=o.plotStyle;s[76]=(o.plotToEdge?1:0);s[77]=o.position;s[78]=o.preserveAspectRatio;s[79]=o.renderFlag;s[80]=o.scrollButtonStyle;s[81]=o.scrollLeft;s[82]=o.selectedItem;s[83]=o.selectedItemStyle;s[84]=o.selectedSeries;s[85]=o.seriesColorScheme;s[86]=o.seriesColors;s[87]=o.seriesColorsOverride;s[88]=o.seriesCount;s[89]=o.seriesNames;s[90]=o.seriesNumber;s[91]=o.seriesSize;s[92]=o.seriesYAxes;s[93]=(o.showMultiples?1:0);s[94]=o.startTime;s[95]=o.stripeStyle;s[96]=(o.stripesVisible?1:0);s[97]=o.subtitle;s[98]=o.subtitleStyle;s[99]=o.tag;s[100]=o.textSize;s[101]=(o.timeBased?1:0);s[102]=o.title;s[103]=o.titleAlign;s[104]=o.titleBoxStyle;s[105]=o.titleImage;s[106]=o.titleImageStyle;s[107]=o.titleStyle;s[108]=o.titleX;s[109]=o.titleY;s[110]=o.tooltipRectStyle;s[111]=o.tuple;s[112]=o.unselectedItemStyle;s[113]=o.valueBoxStyle;s[114]=o.valueLabelFormat;s[115]=o.valueLabelStyle;s[116]=(o.valueLabelsVisible?1:0);s[117]=o.viewBoxHeight;s[118]=o.viewBoxWidth;s[119]=(o.visible?1:0);s[120]=(o.warnIfNoData?1:0);s[121]=o.width;s[122]=o.x;s[123]=set.addObject(o.xAxis,'xAxis');s[124]=o.y;s[125]=set.addObject(o.yAxis,'yAxis');s[126]=set.serializeList(o,o.yAxisList,true,'yAxisList');
}
function _ZEN_SVGComponent_percentbarChart_getSettings(s)
{
	s['name'] = 'string';
	s['chartPivot'] = 'boolean';
	s['controllerId'] = 'id';
	s['ongetcontroller'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_percentbarChart_connectToController = function() {
this.controller = '';
if (!zenIsMissing(this.controllerId)) {
if (this.composite) {
this.controller = this.composite.getChildById(this.controllerId);
}
else {
this.controller = zenPage.getComponentById(this.controllerId);
}
if (this.controller && this.controller.register) {
this.controller.register(this);
}
else {
alert('ZEN: Unable to connect component to dataController (' + this.id + ').');
}
if (this.controller) {
if ('' == this.controller.modelError) {
this.controller.loadModel(false);
}
}
}
}

self._ZEN_SVGComponent_percentbarChart_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._ZEN_SVGComponent_percentbarChart_getChartElementStyle = function(series,item) {
var type = this.getSeriesType(series);
if (type=='bar') {
return this.plotStyle;
}
return this.markerStyle;
}

self._ZEN_SVGComponent_percentbarChart_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._ZEN_SVGComponent_percentbarChart_getSeriesType = function(series) {
return 'bar';
}

self._ZEN_SVGComponent_percentbarChart_getXAxisType = function() {
return this.chartPivot ? 'value' : 'category';
}

self._ZEN_SVGComponent_percentbarChart_getYAxisType = function() {
return this.chartPivot ? 'category' : 'value';
}

self._ZEN_SVGComponent_percentbarChart_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_percentbarChart_renderSeries = function(group) {
var x,y,val;
var scount = this.getSeriesCount();
var items = this.getSeriesSize();
var is3D = this.is3D();
var adj3D = is3D ? 3 : 0;
var seriesNumber = parseInt(this.seriesNumber);
if (!isNaN(seriesNumber)) {
scount = 1;
}
var scaleX = this._scaleX ? this._scaleX : 1;
var scaleY = this._scaleY ? this._scaleY : 1;
var barMap = [];
var barSeriesCount = 0;
for (var s = 0; s < scount; s++) {
var plotType = this.getSeriesType(s);
if (plotType=='bar') {
barMap[s] = barSeriesCount;
barSeriesCount++;
}
}
var hasSelect = !zenIsMissing(this.selectedSeries) && !zenIsMissing(this.selectedItem) && (this.selectedSeries >= 0) && (this.selectedItem >= 0);
var groupEdge;
if (is3D) {
groupEdge = this.document.createElementNS(SVGNS,"g");
group.appendChild(groupEdge);
}
var valueGroup;
if (this.valueLabelsVisible) {
valueGroup = this.document.createElementNS(SVGNS,"g");
group.appendChild(valueGroup);
}
if (items > 0) {
var barwid = 1;
if (barSeriesCount > 0) {
if (!this.chartPivot) {
barwid = 0.8 * (this._plotWidth / scount);
}
else {
barhgt = 0.8 * (this._plotHeight / scount);
}
}
var data = new Array(scount);
if (!isNaN(seriesNumber)) {
data[0] = this.getSeriesData(seriesNumber);
}
else {
for (var s = 0; s < scount; s++) {
data[s] = this.getSeriesData(s);
}
}
if (is3D) {
var edgeArray = new Array(items);
barwid = barwid * 0.75;
}
var lastBarSize = [];
var lastValueLabelSize = [];
var lastValueLabel = [];
var plotType = [];
for (var s = 0; s < scount; s++) {
plotType[s] = this.getSeriesType(s);
}
for (var s = scount-1; s >=0; s--) {
if (plotType[s]=='area') {
var filled = true;
var hasEvents = false;
var hasMarkers =false;
var stacked = false;
this.plotLineForSeries(group,s,data,stacked,filled,hasMarkers,hasEvents);
}
}
var total=[];
for (q = 0; q < scount; q++) {
total[q] = 0;
if (plotType[q]=='bar') {
for (var n = 0; n < items; n++) {
var v = (null == data[q]) ? 0 : ((null == data[q][n]) ? 0 : parseFloat(data[q][n]));
v = isNaN(v) ? 0 : v;
total[q] += ((v > 0) ? v : 0);
}
}
}
var x,y;
if (!this.chartPivot) {
x = 0;
} else {
y = 0;
}
for (var s = 0; s < scount; s++) {
if (plotType[s]=='area') {
continue;
}
else if (plotType[s]=='line') {
var filled = false;
var hasEvents = true;
var hasMarkers = this.markersVisible;
var stacked = false;
this.plotLineForSeries(group,s,data,stacked,filled,hasMarkers,hasEvents);
continue;
}
var yAxisNo = this._yAxisForSeries[s];
if (this.valueLabelsVisible) {
lastBarSize[s] = 0;
lastValueLabelSize[s] = 0;
lastValueLabel[s] = null;
}
if (!this.chartPivot) {
var dx = this._plotWidth / scount;
var adj = (dx/2);
var base = 0;
var bs = barMap[s];
var shift = -barwid/2;
if (isNaN(parseFloat(this._yBaseValue[yAxisNo]))) {
base = this._plotHeight;
}
else {
base = this.getPlotY(this._yBaseValue[yAxisNo],yAxisNo) - this._plotTop;
}
}
else {
var dy = this._plotHeight / scount;
var adj = (dy/2);
var base = 0;
var bs = barMap[s];
var shift = -barhgt/2;
if (isNaN(parseFloat(this._xBaseValue))) {
base = 0;
}
else {
base = this.getPlotX(this._xBaseValue) - this._plotLeft;
}
}
var valsave = 0;
for (var n = 0; n < items; n++) {
var color = this.getSeriesColor(n);
val = (null == data[s]) ? 0 : ((null == data[s][n]) ? 0 : parseFloat(data[s][n]));
val = isNaN(val) ? 0 : val;
if (val < 0  && barSeriesCount>1) {
val = 0;
}
val = 100 * val / total[s];
var dval = 0;
var init = 0
dval=valsave;
if (!this.chartPivot) {
base = this.getPlotY(dval,yAxisNo) - this._plotTop;
}
else {
base = this.getPlotX(dval) - this._plotLeft;
}
val += dval;
valsave = val;
var bar = this.document.createElementNS(SVGNS,"rect");
bar.setAttribute("class","chart-seriesBar");
if (is3D) {
var edgeSide = this.document.createElementNS(SVGNS,"path");
edgeSide.setAttribute("fill","black");
edgeSide.setAttribute("stroke","none");
var edgeSide2 = this.document.createElementNS(SVGNS,"path");
edgeSide2.setAttribute("class","chart-seriesBar");
edgeSide2.setAttribute("fill",color);
edgeSide2.setAttribute("fill-opacity","0.5");
edgeSide2.setAttribute("stroke","black");
var edgeTop = this.document.createElementNS(SVGNS,"path");
edgeTop.setAttribute("class","chart-seriesBar");
edgeTop.setAttribute("fill",color);
edgeTop.setAttribute("stroke","black");
if (!this.chartPivot) {
groupEdge.appendChild(edgeSide);
groupEdge.appendChild(edgeSide2);
groupEdge.appendChild(edgeTop);
}
else {
groupEdge.insertBefore(edgeSide2,edgeArray[n]?edgeArray[n]:groupEdge.firstChild);
groupEdge.insertBefore(edgeSide,edgeSide2);
if (true) { //(s == barSeriesCount-1) {
groupEdge.insertBefore(edgeTop,edgeSide);
edgeArray[n] = edgeTop;
}
else {
edgeArray[n] = edgeSide;
}
}
}
if (!this.chartPivot) {
if (n==0) {
x += dx;
}
y = this.getPlotY(val,yAxisNo) - this._plotTop;
var top,hgt;
if (y <= base) {
top = y;
hgt = base-y;
}
else {
top = base;
hgt = y-base;
}
bar.setAttribute("x",(x-adj+shift-adj3D)*scaleX);
bar.setAttribute("y",(top+adj3D)*scaleY);
bar.setAttribute("width",barwid*scaleX);
bar.setAttribute("height",hgt*scaleY);
if (is3D) {
edgeTop.setAttribute("d",'M '+((x-adj+shift-adj3D)*scaleX)+' '+((top+adj3D)*scaleY)+' L '+((x-adj+shift)*scaleX)+' '+((top)*scaleY)+' '+((x-adj+shift+barwid)*scaleX)+' '+(top*scaleY)+' '+((x-adj+shift+barwid-adj3D)*scaleX)+' '+((top+adj3D)*scaleY)+' z');
edgeSide.setAttribute("d",'M '+((x-adj+shift+barwid-adj3D)*scaleX)+' '+((top+adj3D)*scaleY)+' L '+((x-adj+shift+barwid)*scaleX)+' '+(top*scaleY)+' '+((x-adj+shift+barwid)*scaleX)+' '+((top+hgt)*scaleY)+' '+((x-adj+shift+barwid-adj3D)*scaleX)+' '+((top+adj3D+hgt)*scaleY)+' z');
edgeSide2.setAttribute("d",'M '+((x-adj+shift+barwid-adj3D)*scaleX)+' '+((top+adj3D)*scaleY)+' L '+((x-adj+shift+barwid)*scaleX)+' '+(top*scaleY)+' '+((x-adj+shift+barwid)*scaleX)+' '+((top+hgt)*scaleY)+' '+((x-adj+shift+barwid-adj3D)*scaleX)+' '+((top+adj3D+hgt)*scaleY)+' z');
}
}
else {
if (n==0) {
y += dy;
}
x = this.getPlotX(val) - this._plotLeft;
var left,wid;
if (x <= base) {
left = x;
wid = base-x;
}
else {
left = base;
wid = x-base;
}
bar.setAttribute("x",(left-adj3D)*scaleX);
bar.setAttribute("y",(y-adj+shift+adj3D)*scaleY);
bar.setAttribute("width",wid*scaleX);
bar.setAttribute("height",barhgt*scaleY);
if (is3D) {
edgeTop.setAttribute("d",'M '+((left-adj3D+wid)*scaleX)+' '+((y-adj+shift+adj3D)*scaleY)+' L '+((left+wid)*scaleX)+' '+((y-adj+shift)*scaleY)+' '+((left+wid)*scaleX)+' '+((y-adj+shift+barhgt)*scaleY)+' '+((left-adj3D+wid)*scaleX)+' '+((y-adj+shift+adj3D+barhgt)*scaleY)+' z');
edgeSide.setAttribute("d",'M '+((left-adj3D)*scaleX)+' '+((y-adj+shift+adj3D)*scaleY)+' L '+((left)*scaleX)+' '+((y-adj+shift)*scaleY)+' '+((left+wid)*scaleX)+' '+((y-adj+shift)*scaleY)+' '+((left+wid-adj3D)*scaleX)+' '+((y-adj+shift+adj3D)*scaleY)+' z');
edgeSide2.setAttribute("d",'M '+((left-adj3D)*scaleX)+' '+((y-adj+shift+adj3D)*scaleY)+' L '+(left*scaleX)+' '+((y-adj+shift)*scaleY)+' '+((left+wid)*scaleX)+' '+((y-adj+shift)*scaleY)+' '+((left+wid-adj3D)*scaleX)+' '+((y-adj+shift+adj3D)*scaleY)+' z');
}
}
bar.setAttribute("fill",color);
group.appendChild(bar);
if (this.valueLabelsVisible) {
/* labels on percentBarCharts should not be marked invisible in this way
if (lastValueLabel[s] && (lastValueLabelSize[s] > lastBarSize[s])) {
lastValueLabel[s].setAttribute("display","none");
}
*/
var box = this.document.createElementNS(SVGNS,"rect");
box.setAttribute("class","chart-valueLabelBox");
box.setAttribute("style",this.valueBoxStyle);
valueGroup.appendChild(box);
var fSz = 10;
var align = 'middle';
var lval = (null == data[s]) ? '' : ((null == data[s][n] || ''===data[s][n]) ? '' : parseFloat(data[s][n]));
var value = '';
if (!isNaN(parseFloat(lval))) {
var format = this.valueLabelFormat;
format = format ? format : ((Math.floor(lval)!=lval)?'#,#.##':'#,#');
value = zenFormatNumber(lval,format);
}
var cbx = parseFloat(bar.getAttribute("x"));
var cby = parseFloat(bar.getAttribute("y"));
var cbw = parseFloat(bar.getAttribute("width"));
var cbh = parseFloat(bar.getAttribute("height"));
var cbxMid = cbx + cbw/2;
var cbyMid = cby + cbh/2;
var tg = this.createSVGTextNode(value,fSz,false,align,0,valueGroup);
var textNode = tg.firstChild;
textNode.setAttribute("class","chart-valueLabel");
textNode.setAttribute("style",this.valueLabelStyle);
var bbox = zenGetBBox(textNode);
textNode.setAttribute("text-anchor","middle");
textNode.setAttribute("x",cbxMid);
textNode.setAttribute("y",cbyMid + ((bbox.height/2)*0.8));
box.setAttribute("x", cbxMid - (bbox.width/2));
box.setAttribute("y", cbyMid - (bbox.height/2));
box.setAttribute("rx", 3);
box.setAttribute("width", bbox.width*1.1);
box.setAttribute("height", bbox.height*1.2);
if (this.chartPivot) {
lastBarSize[s] = wid;
}
else {
lastBarSize[s] = hgt;
}
}
if (hasSelect && s == this.selectedSeries && n == this.selectedItem) {
bar.setAttribute("style",this.plotStyle + this.selectedItemStyle);
if (is3D) {
edgeTop.setAttribute("style",this.plotStyle + this.selectedItemStyle);
edgeSide2.setAttribute("style",this.plotStyle + this.selectedItemStyle);
}
}
else {
bar.setAttribute("style",this.plotStyle);
if (is3D) {
edgeTop.setAttribute("style",this.plotStyle);
edgeSide2.setAttribute("style",this.plotStyle);
}
}
var sno = isNaN(seriesNumber) ? s : seriesNumber;
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementClickHandler(evt,'+sno+','+n+');');
bar.addEventListener('click',f,false);
bar.setAttribute('id',this.makeId('el_' + sno + '_' + n));
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementMouseOver(evt,'+sno+','+n+');');
bar.addEventListener('mouseover',f,false);
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementMouseOut(evt,'+sno+','+n+');');
bar.addEventListener('mouseout',f,false);
}
}
}
if (this.valueLabelsVisible) {
/* labels on percentBarCharts should not be marked invisible in this way
for (var s = 0; s < barSeriesCount; s++) {
if (lastValueLabel[s] && (lastValueLabelSize[s] > lastBarSize[s])) {
lastValueLabel[s].setAttribute("display","none");
}
}
*/
group.removeChild(valueGroup);
group.appendChild(valueGroup);
}
}

self._ZEN_SVGComponent_percentbarChart_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_percentbarChart_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._ZEN_SVGComponent_percentbarChart_setProperty = function(property,value,value2) {
switch(property) {
case 'chartPivot':
case 'chartStacked':
this[property] = value ? true : false;
this.render();
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_SVGComponent_percentbarChart_usePercentForRange = function() {
return true;
}

self._ZEN_SVGComponent_percentbarChart_useSumForRange = function() {
return true;
}
self._ZEN_SVGComponent_percentbarChart__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_chart');
	_ZEN_SVGComponent_percentbarChart.prototype = zenCreate('_ZEN_SVGComponent_chart',-1);
	var p = _ZEN_SVGComponent_percentbarChart.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_percentbarChart;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_chart) ? zenMaster._ZEN_SVGComponent_chart.prototype:_ZEN_SVGComponent_chart.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.percentbarChart';
	p._type = 'percentbarChart';
	p.serialize = _ZEN_SVGComponent_percentbarChart_serialize;
	p.getSettings = _ZEN_SVGComponent_percentbarChart_getSettings;
	p.connectToController = _ZEN_SVGComponent_percentbarChart_connectToController;
	p.disconnectFromController = _ZEN_SVGComponent_percentbarChart_disconnectFromController;
	p.getChartElementStyle = _ZEN_SVGComponent_percentbarChart_getChartElementStyle;
	p.getController = _ZEN_SVGComponent_percentbarChart_getController;
	p.getSeriesType = _ZEN_SVGComponent_percentbarChart_getSeriesType;
	p.getXAxisType = _ZEN_SVGComponent_percentbarChart_getXAxisType;
	p.getYAxisType = _ZEN_SVGComponent_percentbarChart_getYAxisType;
	p.notifyView = _ZEN_SVGComponent_percentbarChart_notifyView;
	p.renderSeries = _ZEN_SVGComponent_percentbarChart_renderSeries;
	p.sendEventToController = _ZEN_SVGComponent_percentbarChart_sendEventToController;
	p.setControllerId = _ZEN_SVGComponent_percentbarChart_setControllerId;
	p.setProperty = _ZEN_SVGComponent_percentbarChart_setProperty;
	p.usePercentForRange = _ZEN_SVGComponent_percentbarChart_usePercentForRange;
	p.useSumForRange = _ZEN_SVGComponent_percentbarChart_useSumForRange;
}

self._zenClassIdx['pieChart'] = '_ZEN_SVGComponent_pieChart';
self._ZEN_SVGComponent_pieChart = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_pieChart__init(this,index,id);}
}

self._ZEN_SVGComponent_pieChart__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_chart__init) ?zenMaster._ZEN_SVGComponent_chart__init(o,index,id):_ZEN_SVGComponent_chart__init(o,index,id);
	o.controller = '';
	o.controllerId = '';
	o.holeSize = '0';
	o.labelRadius = '';
	o.ongetcontroller = '';
	o.onnotifyView = '';
	o.pieHeight = '.33';
	o.pieScale = '1';
	o.plotBy = 'auto';
	o.rotateBy = '0';
	o.scrollLeft = '0';
	o.showPercentage = false;
	o.showValue = false;
}
function _ZEN_SVGComponent_pieChart_serialize(set,s)
{
	var o = this;s[0]='1665565137';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.appearance;s[7]=(o.autoScaleText?1:0);s[8]=o.aux;s[9]=o.axisLineStyle;s[10]=o.axisTitleStyle;s[11]=o.backgroundStyle;s[12]=o.bandLower;s[13]=o.bandLowerStyle;s[14]=o.bandUpper;s[15]=o.bandUpperStyle;s[16]=o.baseLineStyle;s[17]=o.borderOffset;s[18]=o.borderRadius;s[19]=o.borderStyle;s[20]=(o.boundless?1:0);s[21]=o.controller;s[22]=o.controllerId;s[23]=o.currMultiple;s[24]=o.currYAxis;s[25]=o.endTime;s[26]=o.gridStyle;s[27]=(o.hasZoom?1:0);s[28]=o.height;s[29]=(o.hidden?1:0);s[30]=o.holeSize;s[31]=o.hzZoomStep;s[32]=o.indicatorStyle;s[33]=(o.indicatorsVisible?1:0);s[34]=o.labelRadius;s[35]=o.labelStyle;s[36]=(o.labelsVisible?1:0);s[37]=o.legendHeight;s[38]=o.legendLabelStyle;s[39]=o.legendRectStyle;s[40]=o.legendStyle;s[41]=o.legendTitle;s[42]=o.legendVisible;s[43]=o.legendWidth;s[44]=o.legendX;s[45]=o.legendY;s[46]=o.lineStyle;s[47]=o.marginBottom;s[48]=o.marginLeft;s[49]=o.marginRight;s[50]=o.marginTop;s[51]=o.markerScale;s[52]=o.markerShapes;s[53]=o.markerStyle;s[54]=(o.markersVisible?1:0);s[55]=o.maxLabelLen;s[56]=o.msgIfNoData;s[57]=o.multipleTitleStyle;s[58]=o.noDataFill;s[59]=o.noDataOpacity;s[60]=o.noDataStroke;s[61]=o.onclick;s[62]=o.onelementClick;s[63]=o.ongetData;s[64]=o.ongetLabelX;s[65]=o.ongetLabelY;s[66]=o.ongetSeriesColor;s[67]=o.ongetTimeEvents;s[68]=o.ongetcontroller;s[69]=o.onnotifyView;s[70]=o.onrenderData;s[71]=o.onrenderPlotArea;s[72]=o.onshowTooltip;s[73]=o.onupdate;s[74]=o.pieHeight;s[75]=o.pieScale;s[76]=o.plotAreaStyle;s[77]=o.plotBy;s[78]=o.plotEdgeStyle;s[79]=o.plotStyle;s[80]=(o.plotToEdge?1:0);s[81]=o.position;s[82]=o.preserveAspectRatio;s[83]=o.renderFlag;s[84]=o.rotateBy;s[85]=o.scrollButtonStyle;s[86]=o.scrollLeft;s[87]=o.selectedItem;s[88]=o.selectedItemStyle;s[89]=o.selectedSeries;s[90]=o.seriesColorScheme;s[91]=o.seriesColors;s[92]=o.seriesColorsOverride;s[93]=o.seriesCount;s[94]=o.seriesNames;s[95]=o.seriesNumber;s[96]=o.seriesSize;s[97]=o.seriesYAxes;s[98]=(o.showMultiples?1:0);s[99]=(o.showPercentage?1:0);s[100]=(o.showValue?1:0);s[101]=o.startTime;s[102]=o.stripeStyle;s[103]=(o.stripesVisible?1:0);s[104]=o.subtitle;s[105]=o.subtitleStyle;s[106]=o.tag;s[107]=o.textSize;s[108]=(o.timeBased?1:0);s[109]=o.title;s[110]=o.titleAlign;s[111]=o.titleBoxStyle;s[112]=o.titleImage;s[113]=o.titleImageStyle;s[114]=o.titleStyle;s[115]=o.titleX;s[116]=o.titleY;s[117]=o.tooltipRectStyle;s[118]=o.tuple;s[119]=o.unselectedItemStyle;s[120]=o.valueBoxStyle;s[121]=o.valueLabelFormat;s[122]=o.valueLabelStyle;s[123]=(o.valueLabelsVisible?1:0);s[124]=o.viewBoxHeight;s[125]=o.viewBoxWidth;s[126]=(o.visible?1:0);s[127]=(o.warnIfNoData?1:0);s[128]=o.width;s[129]=o.x;s[130]=set.addObject(o.xAxis,'xAxis');s[131]=o.y;s[132]=set.addObject(o.yAxis,'yAxis');s[133]=set.serializeList(o,o.yAxisList,true,'yAxisList');
}
function _ZEN_SVGComponent_pieChart_getSettings(s)
{
	s['name'] = 'string';
	s['controllerId'] = 'id';
	s['holeSize'] = 'float';
	s['labelRadius'] = 'float';
	s['ongetcontroller'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	s['pieHeight'] = 'float';
	s['pieScale'] = 'float';
	s['plotBy'] = 'enum:auto,items,series,both';
	s['rotateBy'] = 'float';
	s['showPercentage'] = 'boolean';
	s['showValue'] = 'boolean';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_pieChart_chartMouseDownHandler = function(evt,index) {
if (this._timerId) {
window.clearTimeout(this._timerId);
delete this._timerId;
}
if (!this.showMultiples || this.getSeriesCount()==1) {
this.startSpinChart(evt,index);
}
}

self._ZEN_SVGComponent_pieChart_connectToController = function() {
this.controller = '';
if (!zenIsMissing(this.controllerId)) {
if (this.composite) {
this.controller = this.composite.getChildById(this.controllerId);
}
else {
this.controller = zenPage.getComponentById(this.controllerId);
}
if (this.controller && this.controller.register) {
this.controller.register(this);
}
else {
alert('ZEN: Unable to connect component to dataController (' + this.id + ').');
}
if (this.controller) {
if ('' == this.controller.modelError) {
this.controller.loadModel(false);
}
}
}
}

self._ZEN_SVGComponent_pieChart_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._ZEN_SVGComponent_pieChart_getChartElementStyle = function(series,item) {
var clr;
var op = '1.0';
var plotBy = this.getPlotBy();
if (this.showMultiples) {
plotBy = 'items';
}
switch (plotBy) {
case 'both':
clr = this.getSeriesColor(series);
op = (item%2) ? '1.0' : '0.85';
break;
case 'series':
clr = this.getSeriesColor(series);
break;
case 'items':
default:
clr = this.getSeriesColor(item);
break;
}
return "stroke-width: 0.25px; fill-opacity: "+op+"; stroke: " + 'gray' + "; fill: " + clr + ";" + this.plotStyle;
}

self._ZEN_SVGComponent_pieChart_getChartRelatedElements = function(series,item) {
var array = null;
var edge = this.findSVGElement('edge_' + series + '_' + item);
var innerEdge = this.findSVGElement('inedge_' + series + '_' + item);
if (edge||innerEdge) {
array = [];
if (edge) {
array[array.length] = edge;
}
if (innerEdge) {
array[array.length] = innerEdge;
}
}
return array;
}

self._ZEN_SVGComponent_pieChart_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._ZEN_SVGComponent_pieChart_getLegendLabels = function() {
var legends = new Array();
var sc = this.getSeriesCount();
var ic = this.getSeriesSize();
if ('auto' == this.plotBy && (ic == 1 || sc == 1)) {
return legends;
}
switch (this.getPlotBy()) {
case 'series':
case 'both':
var names = this.getSeriesNames();
for (i = 0; i < sc; i++) {
legends[i] = (null == names[i] || '' == names[i]) ? (parseInt(i,10)+1) : names[i];
}
break;
case 'items':
default:
for (var i = 0; i < ic; i++) {
var	lbl = this.getYLabelText(i,'',1); // JSL4129 - make 1 based
legends[i] = zenIsMissing(lbl) ? (parseInt(i,10)+1) : lbl;
}
break;
}
return legends;
}

self._ZEN_SVGComponent_pieChart_getPlotBy = function() {
var plotBy = this.plotBy;
if ('auto' == plotBy) {
var sc = this.getSeriesCount();
var ic = this.getSeriesSize();
if (sc > 1 && ic > 1) {
plotBy = 'both';
}
else if (sc == 1 && ic == 1) {
plotBy = 'both';
}
else if (sc <= 1) {
plotBy = 'items';
}
else {
plotBy = 'series';
}
}
return plotBy;
}

self._ZEN_SVGComponent_pieChart_hasAxes = function() {
return false;
}

self._ZEN_SVGComponent_pieChart_hasMultiples = function() {
return this.showMultiples;
}

self._ZEN_SVGComponent_pieChart_is3D = function() {
return false;
}

self._ZEN_SVGComponent_pieChart_mousemoveHandler = function(evt) {
this.hideToolTip();
var oldEvent = zenEvent;
zenEvent = evt ? evt : window.event;
if (this._inSpin) {
var delta = 0;
var dx = evt.clientX - this._spinX;
var dy = evt.clientY - this._spinY;
if (Math.abs(dx) > Math.abs(dy)) {
if (this._spinAngle >= 0 && this._spinAngle <= 180) {
delta = -dx;
}
else {
delta = dx;
}
}
else {
if (this._spinAngle >= 90 && this._spinAngle <= 270) {
delta = -dy;
}
else {
delta = dy;
}
}
this.rotateBy += delta;
if (Math.abs(this.rotateBy - this._startRotate) > 3) {
this._startRotate = this.rotateBy;
this.setProperty('rotateBy',this.rotateBy);
}
this._spinX = evt.clientX;
this._spinY = evt.clientY;
}
zenEvent = oldEvent;
}

self._ZEN_SVGComponent_pieChart_mouseupHandler = function(evt) {
var oldEvent = zenEvent;
zenEvent = evt ? evt : window.event;
zenEvent = oldEvent;
this._inSpin = false;
this.svgGroup.removeEventListener('mousemove',this._mmHandler,false);
this.svgGroup.removeEventListener('mouseup',this._muHandler,false);
}

self._ZEN_SVGComponent_pieChart_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_pieChart_renderContents = function() {
return this.invokeSuper('renderContents',arguments);
}

self._ZEN_SVGComponent_pieChart_renderSeries = function(group) {
try {
var sc = this.getSeriesCount();
var ic = this.getSeriesSize();
var items = 0;
var values = new Array();
var total = 0;
var snames = null;
var plotBy = this.getPlotBy();
var scaleX = this._scaleX ? this._scaleX : 1;
var scaleY = this._scaleY ? this._scaleY : 1;
var seriesNumber = parseInt(this.seriesNumber);
if (!isNaN(seriesNumber)) {
sc = 1;
}
if (this.showMultiples) {
seriesNumber = this.currMultiple;
sc = 1;
plotBy = 'items';
}
switch (plotBy) {
case 'series':
items = sc;
snames = this.getSeriesNames();
for (var s = 0; s < sc; s++) {
var data = this._dataSeries[isNaN(seriesNumber)?s:seriesNumber];
var value = 0;
for (var i = 0; i < ic; i++) {
value += (data==null || data[i] == null || data[i] < 0 || isNaN(parseFloat(data[i]))) ? 0 : (parseFloat(data[i]));
}
values[s] = value;
total += value;
}
break;
case 'items':
default:
items = ic;
for (var i = 0; i < ic; i++) {
var value = 0;
for (var s = 0; s < sc; s++) {
var data = this._dataSeries[isNaN(seriesNumber)?s:seriesNumber];
value += (data == null || data[i] == null || data[i] < 0 || isNaN(parseFloat(data[i]))) ? 0 : (parseFloat(data[i]));
}
values[i] = value;
total += value;
}
break;
case 'both':
items = sc*ic;
snames = this.getSeriesNames();
for (var s = 0; s < sc; s++) {
var data = this._dataSeries[isNaN(seriesNumber)?s:seriesNumber];
for (var i = 0; i < ic; i++) {
var value = (data == null ||data[i] == null || data[i] < 0 || isNaN(parseFloat(data[i]))) ? 0 : (parseFloat(data[i]));
values[values.length] = value;
total += value;
}
}
break;
}
var minWedge = items <= 12 ? 0.01 : items <= 24 ? 0.025 : 0.05;
var gw = (this._plotWidth * 0.55);
var gh = (this._plotHeight * 0.70);
var sz = (gw > gh) ? gh/2 : gw/2;
var cx = this._plotWidth / 2;
var cy = this._plotHeight / 2;
sz = sz * parseFloat(this.pieScale);
var hs = parseFloat(this.holeSize);
hs = (hs < 0) ? 0 : (hs > 0.9) ? 0.9 : hs;
var hole = sz * hs;
var xRadius =  sz;
var yRadius =  sz / 1.8;
var xHoleRadius =  hole;
var yHoleRadius =  hole / 1.8;
var ph = parseFloat(this.pieHeight);
ph = (ph < 0) ? 0 : (ph > 1) ? 1 : ph;
var pieHeight = (Math.round(sz * ph *1000)/1000);
var is3D = ('3D' == this.appearance);
var seriesGroup = this.getSeriesSVGGroup();
if (is3D) {
var scaleRX = scaleX;
var scaleRY = scaleY;
}
else {
if (scaleX > scaleY) {
var scaleRX = scaleY;
var scaleRY = scaleY;
}
else {
var scaleRX = scaleX;
var scaleRY = scaleX;
}
}
if ((0 == total) || (null == seriesGroup) || (null == seriesGroup.firstChild) || (items == 0) || (this._slices && (items != this._slices.length))) {
while(null != group.firstChild) {
group.removeChild(group.firstChild);
}
delete this._circle;
delete this._slices;
delete this._edges;
delete this._innerEdges;
delete this._shadow;
delete this._underEdge;
delete this._innerUnderEdge;
}
if (0 == total) {
var circ = this._circle;
if (null == circ) {
circ = this.document.createElementNS(SVGNS,"ellipse");
this._circle = circ;
group.appendChild(circ);
}
circ.setAttribute("cx",cx*scaleX);
circ.setAttribute("cy",cy*scaleY);
circ.setAttribute("rx",sz*scaleRX);
circ.setAttribute("ry",sz*scaleRY);
circ.setAttribute("style","stroke: none; fill: darkblue; opacity: 0.1;");
return;
}
if ((null == seriesGroup) ||
(null == seriesGroup.firstChild) ||
((null == this._slices) && items > 0)) {
if (null==this._slices) { this._slices = new Array(items); }
if (null==this._edges) { this._edges = new Array(items); }
if (null==this._innerEdges) { this._innerEdges = new Array(items); }
if (!is3D) {
var circ = this._circle;
if (null == circ) {
circ = this.document.createElementNS(SVGNS,"ellipse");
this._circle = circ;
group.appendChild(circ);
}
circ.setAttribute("cx",cx*scaleX);
circ.setAttribute("cy",cy*scaleY);
circ.setAttribute("rx",sz*scaleRX);
circ.setAttribute("ry",sz*scaleRY);
if (hole > 0) {
circ.setAttribute("display","none");
}
circ.setAttribute("style","stroke: none; fill: white; opacity: 0.5;");
}
else {
var shadow = this._shadow;
if (null == shadow) {
shadow = this.document.createElementNS(SVGNS,"ellipse");
this._shadow = shadow;
group.appendChild(shadow);
}
shadow.setAttribute("cx",(cx + xRadius / 20)*scaleX);
shadow.setAttribute("cy",(cy + pieHeight + yRadius / 20)*scaleY);
shadow.setAttribute("rx",xRadius*scaleRX);
shadow.setAttribute("ry",yRadius*scaleRY);
shadow.setAttribute("style","stroke: none; fill: black; opacity: 0.5;");
var edge = this._underEdge;
if (null == edge) {
edge = this.document.createElementNS(SVGNS,"path");
this._underEdge = edge;
group.appendChild(edge);
}
var X1 = (cx + (xRadius * 1));
var Y1 = (cy + (yRadius * 0));
var X2 = (cx + (xRadius * -1));
var Y2 = (cy + (yRadius * 0));
edge.setAttribute('d','M '+(X1*scaleX)+' '+(Y1*scaleY)+' A '+(xRadius*scaleX)+' '+(yRadius*scaleY)+' 0 0 1 '+(X2*scaleX)+' '+(Y2*scaleY)+' v '+(pieHeight*scaleY)+' ' + 'A '+(xRadius*scaleX)+' '+(yRadius*scaleY)+' 0 0 0 '+(X1*scaleX)+' '+ ((Y1+pieHeight)*scaleY)+ ' z');
edge.setAttribute("style","stroke: none; fill: black; opacity: 1.0;");
var edge = this._innerUnderEdge;
if (null == edge) {
edge = this.document.createElementNS(SVGNS,"path");
this._innerUnderEdge = edge;
}
var X1 = (cx + (xHoleRadius * -1));
var Y1 = (cy + (yHoleRadius * 0));
var X2 = (cx + (xHoleRadius * 1));
var Y2 = (cy + (yHoleRadius * 0));
edge.setAttribute('d','M '+(X1*scaleX)+' '+(Y1*scaleY)+' A '+(xHoleRadius*scaleX)+' '+(yHoleRadius*scaleY)+' 0 0 1 '+(X2*scaleX)+' '+(Y2*scaleY)+' v '+(pieHeight*scaleY)+' ' + 'A '+(xHoleRadius*scaleX)+' '+(yHoleRadius*scaleY)+' 0 0 0 '+(X1*scaleX)+' '+ ((Y1+pieHeight)*scaleY)+ ' z');
edge.setAttribute("style","stroke: none; fill: black; opacity: 1.0;");
}
for (var i = 0; i < items; i++) {
if (null == this._slices[i]) {
this._slices[i] = this.document.createElementNS(SVGNS,"path");
this._slices[i]._index = i;
group.appendChild(this._slices[i]);
}
}
if (is3D) {
for (var i = 0; i < items; i++) {
if (null == this._edges[i]) {
this._edges[i] = this.document.createElementNS(SVGNS,"path");
group.appendChild(this._edges[i]);
}
if (hole > 0) {
if (null == this._innerEdges[i]) {
this._innerEdges[i] = this.document.createElementNS(SVGNS,"path");
group.insertBefore(this._innerEdges[i],group.firstChild);
}
if (i >= (items-1)) {
group.insertBefore(this._innerUnderEdge,group.firstChild);
}
}
}
}
}
var value, curr;
var last = (isNaN(parseFloat(this.rotateBy)) ? 0 : (parseFloat(this.rotateBy)/360));
var lastcurr = 0;
var lasty2 = 0;
var lastx = 0;
var lastth = 0;
var pct = new Array();
var ts = '';
ts = ('large' == this.textSize) ? 'font-size:3pt;' : ts;
ts = ('small' == this.textSize) ? 'font-size:1.8pt;' : ts;
for (var i = 0; i < items; i++) {
var clr = this.getSeriesColor(('both' != plotBy) ? i : Math.floor(i/ic));
value = values[i];
curr = (total == 0) ? 0 : (value / total);
pct[i] = Math.round(curr * 100);
var slice = this._slices[i];
var edge = is3D ? this._edges[i] : null;
var innerEdge = is3D ? this._innerEdges[i] : null;
if (curr >=1) {
curr=0.99999;
pct[i] = 100;
}
var sno,ino;
switch (plotBy) {
case 'series':
sno = i;
ino = 0;
break;
case 'items':
default:
sno = 0;
ino = i;
break;
case 'both':
sno = Math.floor(i/ic);
ino = i % ic;
break;
}
if (!is3D) {
var path = "";
if (hole <= 0) {
path += "M 0 0 L "
}
else {
path += "M " + ((hole * Math.cos(last * Math.PI * 2))*scaleRX) + " " + ((hole * Math.sin(last * Math.PI * 2))*scaleRY) + " L ";
}
path += ((sz * Math.cos(last * Math.PI * 2))*scaleRX) + " " + ((sz * Math.sin(last * Math.PI * 2))*scaleRY);
if (curr >= 0.5) {
path += " A" + (sz*scaleRX) + " " + (sz*scaleRY) + " 0 1 1 " + (sz * Math.cos((last + curr) * Math.PI * 2)*scaleRX) + " " + (sz * Math.sin((last + curr) * Math.PI * 2)*scaleRY);
}
else {
path += " A" + (sz*scaleRX) + " " + (sz*scaleRY) + " 0 0 1 " + (sz * Math.cos((last + curr) * Math.PI * 2)*scaleRX) + " " + (sz * Math.sin((last + curr) * Math.PI * 2)*scaleRY);
}
if (hole <= 0) {
path += " z";
}
else {
path += "L " + (hole * Math.cos((last+curr) * Math.PI * 2)*scaleRX) + " " + (hole * Math.sin((last+curr) * Math.PI * 2)*scaleRY);
if (curr >= 0.5) {
path += " A" + (hole*scaleRX) + " " + (hole*scaleRY) + " 0 1 0 " + (hole * Math.cos(last * Math.PI * 2)*scaleRX) + " " + (hole * Math.sin(last * Math.PI * 2)*scaleRY);
}
else {
path += " A" + (hole*scaleRX) + " " + (hole*scaleRY) + " 0 0 0 " + (hole * Math.cos(last * Math.PI * 2)*scaleRX) + " " + (hole * Math.sin(last * Math.PI * 2)*scaleRY);
}
path += " z";
}
}
else {
var startAngle = (360 * last) % 360;
var endAngle = startAngle + (curr * 360);
startAngle = (Math.round(startAngle*1000)/1000);
endAngle = (Math.round(endAngle*1000)/1000);
var edgeStartAngle = (startAngle < 0) ? 0 : startAngle;
var edgeEndAngle = endAngle;
var innerEdgeStartAngle = (startAngle < 180) ? 180 : startAngle;
var innerEdgeEndAngle = (endAngle > 360) ? 360 : endAngle;
if (edge && value > 0 && edgeStartAngle < 180 || edgeEndAngle > 360) {
if (edgeStartAngle > 180 && edgeEndAngle > 360) {
edgeStartAngle = 0;
edgeEndAngle = edgeEndAngle % 360;
}
edgeEndAngle = (edgeEndAngle > 180) ? 180 : edgeEndAngle;
var startRad = edgeStartAngle * (Math.PI / 180);
var endRad = edgeEndAngle  * (Math.PI / 180);
var X1 = cx + (xRadius * Math.cos(startRad));
var Y1 = cy + (yRadius * Math.sin(startRad));
var X2 = cx + (xRadius * Math.cos(endRad));
var Y2 = cy + (yRadius * Math.sin(endRad));
X1 = (Math.round(X1*1000)/1000);
Y1 = (Math.round(Y1*1000)/1000);
X2 = (Math.round(X2*1000)/1000);
Y2 = (Math.round(Y2*1000)/1000);
edge.setAttribute('visibility','visible');
var edgeOp = 0.1 + edgeEndAngle/ 180;
edgeOp = (edgeOp > 1) ? 1 : edgeOp;
edge.setAttribute('opacity',edgeOp);
if (X1!=X2||Y1!=Y2) {
edge.setAttribute('d','M '+(X1*scaleX)+' '+(Y1*scaleY)+' A '+(Math.round(xRadius*1000*scaleX)/1000)+' '+(Math.round(yRadius*1000*scaleY)/1000)+' 0 0 1 '+(X2*scaleX)+' '+(Y2*scaleY)+' v '+(pieHeight*scaleY)+' ' + 'A '+(Math.round(xRadius*scaleX*1000)/1000)+' '+(Math.round(yRadius*scaleY*1000)/1000)+' 0 0 0 '+(X1*scaleX)+' '+((Y1+pieHeight)*scaleY)+ ' z');
}
else {
edge.setAttribute('d','M '+(X1*scaleX)+' '+(Y1*scaleY)+' A '+(Math.round(xRadius*1000*scaleX)/1000)+' '+(Math.round(yRadius*1000*scaleY)/1000)+' 0 0 1 '+(X2*scaleX)+' '+(Y2*scaleY)+' v '+(pieHeight*scaleY)+' ' + 'A '+(Math.round(xRadius*scaleX*1000)/1000)+' '+(Math.round(yRadius*scaleY*1000)/1000)+' 0 0 0 '+(X1*scaleX)+' '+((Y1+pieHeight)*scaleY)+ ' z');
edge.setAttribute('visibility','hidden');
}
}
else {
edge.setAttribute('d','M '+(X1*scaleX)+' '+(Y1*scaleY)+' A '+(Math.round(xRadius*1000*scaleX)/1000)+' '+(Math.round(yRadius*1000*scaleY)/1000)+' 0 0 1 '+(X2*scaleX)+' '+(Y2*scaleY)+' v '+(pieHeight*scaleY)+' ' + 'A '+(Math.round(xRadius*scaleX*1000)/1000)+' '+(Math.round(yRadius*scaleY*1000)/1000)+' 0 0 0 '+(X1*scaleX)+' '+((Y1+pieHeight)*scaleY)+ ' z');
edge.setAttribute('visibility','hidden');
}
if (hole > 0 && innerEdge) {
if (innerEdgeStartAngle < innerEdgeEndAngle) {
var startRad = innerEdgeStartAngle * (Math.PI / 180);
var endRad = innerEdgeEndAngle  * (Math.PI / 180);
var X1 = cx + (xHoleRadius * Math.cos(startRad));
var Y1 = cy + (yHoleRadius * Math.sin(startRad));
var X2 = cx + (xHoleRadius * Math.cos(endRad));
var Y2 = cy + (yHoleRadius * Math.sin(endRad));
innerEdge.setAttribute('visibility','visible');
innerEdge.setAttribute('opacity',0.9);
innerEdge.setAttribute('d','M '+(X1*scaleX)+' '+(Y1*scaleY)+' A '+(xHoleRadius*scaleX)+' '+(yHoleRadius*scaleY)+' 0 0 1 '+(X2*scaleX)+' '+(Y2*scaleY)+' v '+(pieHeight*scaleY)+' ' + 'A '+(xHoleRadius*scaleX)+' '+(yHoleRadius*scaleY)+' 0 0 0 '+(X1*scaleX)+' '+((Y1+pieHeight)*scaleY)+ ' z');
}
else {
innerEdge.setAttribute('d','M '+(X1*scaleX)+' '+(Y1*scaleY)+' A '+(xHoleRadius*scaleX)+' '+(yHoleRadius*scaleY)+' 0 0 1 '+(X2*scaleX)+' '+(Y2*scaleY)+' v '+(pieHeight*scaleY)+' ' + 'A '+(xHoleRadius*scaleX)+' '+(yHoleRadius*scaleY)+' 0 0 0 '+(X1*scaleX)+' '+((Y1+pieHeight)*scaleY)+ ' z');
innerEdge.setAttribute('visibility','hidden');
}
}
var startRad = startAngle * (Math.PI / 180);
var endRad = endAngle * (Math.PI / 180);
if (hole > 0) {
var hX1 = cx + (xHoleRadius * Math.cos(startRad));
var hY1 = cy + (yHoleRadius * Math.sin(startRad));
var hX2 = cx + (xHoleRadius * Math.cos(endRad));
var hY2 = cy + (yHoleRadius * Math.sin(endRad));
if (items > 1) {
hX1 = (Math.round(hX1*1000)/1000);
hY1 = (Math.round(hY1*1000)/1000);
hX2 = (Math.round(hX2*1000)/1000);
hY2 = (Math.round(hY2*1000)/1000);
}
}
var X1 = cx + (xRadius * Math.cos(startRad));
var Y1 = cy + (yRadius * Math.sin(startRad));
var X2 = cx + (xRadius * Math.cos(endRad));
var Y2 = cy + (yRadius * Math.sin(endRad));
if (items > 1) {
X1 = (Math.round(X1*1000)/1000);
Y1 = (Math.round(Y1*1000)/1000);
X2 = (Math.round(X2*1000)/1000);
Y2 = (Math.round(Y2*1000)/1000);
}
var dir = (endAngle-startAngle > 180) ? 1 : 0;
path = (hole > 0) ? 'M '+(hX1*scaleX)+' '+(hY1*scaleY) : 'M '+(cx*scaleX)+' '+(cy*scaleY);
path += ' L '+(X1*scaleX)+' '+(Y1*scaleY)+' ';
if (X1!=X2||Y1!=Y2) {
path += ' A '+(xRadius*scaleX)+' '+(yRadius*scaleY)+' 0 '+dir+' 1 '+(X2*scaleX)+' '+(Y2*scaleY);
}
if (hole > 0) {
if (hX1!=hX2 || hY1!=hY2) {
path += ' L '+(hX2*scaleX)+' '+(hY2*scaleY);
path += ' A '+(xHoleRadius*scaleX)+' '+(yHoleRadius*scaleY)+' 0 '+dir+' 0 '+(hX1*scaleX)+' '+(hY1*scaleY);
}
}
path += ' z';
}
var style = this.getChartElementStyle(sno,ino);
slice.setAttribute("d",path);
if (!is3D) {
slice.setAttribute("transform","translate(" + (cx*scaleX) + "," + (cy*scaleY) + ")");
}
if (sno == this.selectedSeries && ino == this.selectedItem) {
slice.setAttribute("style",style + this.selectedItemStyle);
if (edge) {
edge.setAttribute("style",style + this.selectedItemStyle);
}
if (innerEdge) {
innerEdge.setAttribute("style",style + this.selectedItemStyle);
}
}
else {
slice.setAttribute("style",style);
if (edge) {
edge.setAttribute("style",style);
}
if (innerEdge) {
innerEdge.setAttribute("style",style);
}
}
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartMouseDownHandler(evt,'+slice._index+');');
slice.addEventListener('mousedown',f,false);
this._mmHandler = new Function('evt','return zenPage.getComponent('+this.index+').mousemoveHandler(evt);');
this._muHandler = new Function('evt','return zenPage.getComponent('+this.index+').mouseupHandler(evt);');
if (this.showMultiples) {
var rsno = this.currMultiple;
}
else {
var rsno = isNaN(seriesNumber) ? sno : this.seriesNumber;
}
rsno = (''===rsno) ? 0 : rsno;
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementClickHandler(evt,'+rsno+','+ino+');');
slice.addEventListener('click',f,false);
slice.setAttribute('id',this.makeId('el_' + rsno + '_' + ino));
if (edge) {
edge.setAttribute('id',this.makeId('edge_' + rsno + '_' + ino));
}
if (innerEdge) {
innerEdge.setAttribute('id',this.makeId('inedge_' + rsno + '_' + ino));
}
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementMouseOver(evt,'+rsno+','+ino+');');
slice.addEventListener('mouseover',f,false);
if (edge) {
edge.addEventListener('mouseover',f,false);
}
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementMouseOut(evt,'+rsno+','+ino+');');
slice.addEventListener('mouseout',f,false);
if (edge) {
edge.addEventListener('mouseout',f,false);
}
if (this.labelsVisible || this.showPercentage || this.showValue) {
var sin = Math.sin((last + curr/2) * Math.PI * 2);
var cos = Math.cos((last + curr/2) * Math.PI * 2);
var labelRadius = parseFloat(this.labelRadius);
labelRadius = isNaN(labelRadius) ? 1.1 : labelRadius;
var ladj = 1;
if (is3D) {
ladj = (sin>=0) ? 1 : 0.6;
}
var tx = cx*scaleX + (sz*labelRadius * cos * scaleRX);
var ty = cy*scaleY + (sz*labelRadius * sin * scaleRY * ladj);
var anchor = (cos>=0) ? 'start' : 'end';
var box = this.document.createElementNS(SVGNS,"rect");
box.setAttribute("class","chart-valueLabelBox");
box.setAttribute("style",this.valueBoxStyle);
group.appendChild(box);
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementClickHandler(evt,'+rsno+','+ino+');');
box.addEventListener('click',f,false);
var text = this.document.createElementNS(SVGNS,"text");
group.appendChild(text);
text.setAttribute("x", tx);
text.setAttribute("y", ty);
text.setAttribute("class","chart-sliceLabel");
text.setAttribute("style",this.labelStyle);
text.setAttribute("text-anchor",anchor);
text.addEventListener('click',f,false);
var lbl = null;
if (!this.labelsVisible) {
lbl = '';
}
else {
switch (plotBy) {
case 'series':
lbl = snames[i];
lbl = (null == lbl) ? (parseInt(i,10)+1) : lbl;
break;
case 'items':
default:
lbl = this.getYLabelText(i);
lbl = zenIsMissing(lbl) ? (parseInt(i,10)+1) : lbl;
break;
case 'both':
var idx = Math.floor(i/ic);
lbl = this.getYLabelText(i % ic);
lbl = zenIsMissing(lbl) ? (parseInt(i%ic,10)+1) : lbl;
break;
}
}
if (this.showValue) {
var lval = values[i];
if (!isNaN(parseFloat(lval))) {
var format = this.valueLabelFormat;
format = format ? format : ((Math.floor(lval)!=lval)?'#,#.##':'#,#');
lval = zenFormatNumber(lval,format);
lbl += (lbl===''?'':' ') + lval;
}
}
if (this.showPercentage) {
if (lbl==='') {
lbl += pct[i] + '%';
}
else {
lbl += ' (' + pct[i] + '%)';
}
}
var textNode = this.document.createTextNode(lbl);
text.appendChild(textNode);
var th = zenGetBBox(text).height;
var tw = zenGetBBox(text).width;
box.setAttribute('rx',3);
if (anchor=='start') {
box.setAttribute('x',(tx)-3);
}
else {
box.setAttribute('x',((tx-tw))-3);
}
box.setAttribute('y',(ty-(th*(1/1.1))));
box.setAttribute('width',(tw)+6);
box.setAttribute('height',(th*1.13));
}
slice._angle = (360 * ((last + (curr/2)) - (isNaN(parseFloat(this.rotateBy)) ? 0 : (parseFloat(this.rotateBy)/360)))) % 360;
last += curr;
lastcurr = curr;
}
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in pieChart.renderSeries');
}
}

self._ZEN_SVGComponent_pieChart_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_pieChart_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._ZEN_SVGComponent_pieChart_setProperty = function(property,value,value2) {
switch(property) {
case 'showValue':
case 'showPercentage':
this[property] = value ? true : false;
this.render();
break;
case 'plotBy':
this.selectedItem = -1;
this.selectedSeries = -1;
this[property] = value;
this.render();
break;
case 'holeSize':
case 'pieScale':
case 'pieHeight':
this[property] = parseFloat(value);
this.render();
break;
case 'labelRadius':
this[property] = (value==='') ? '' : parseFloat(value);
this.render();
break;
case 'rotateBy':
value = parseFloat(value) % 360;
value = (value < 0) ? (360 + value) : value;
this[property] = value;
if (this.showMultiples) {
this.render();
}
else {
this.renderSeriesGroup();
}
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_SVGComponent_pieChart_startSpinChart = function(evt,index) {
var slice = null;
if (this._slices && this._slices.length) {
var slice = this._slices[index];
}
if (!slice) return;
this._inSpin = true;
this._spinIndex = index;
this.rotateBy = parseFloat(this.rotateBy);
if (isNaN(parseFloat(this.rotateBy))) {
this.rotateBy = 0;
}
var currZoom = 100;
this._spinX = evt.clientX;
this._spinY = evt.clientY;
this._startRotate = this.rotateBy;
this._spinAngle = (slice._angle + this.rotateBy) % 360;
this._spinAngle = (this._spinAngle < 0) ? (360 + this._spinAngle) : this._spinAngle;
this.svgGroup.addEventListener('mousemove',this._mmHandler,false);
this.svgGroup.addEventListener('mouseup',this._muHandler,false);
}
self._ZEN_SVGComponent_pieChart__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_chart');
	_ZEN_SVGComponent_pieChart.prototype = zenCreate('_ZEN_SVGComponent_chart',-1);
	var p = _ZEN_SVGComponent_pieChart.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_pieChart;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_chart) ? zenMaster._ZEN_SVGComponent_chart.prototype:_ZEN_SVGComponent_chart.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.pieChart';
	p._type = 'pieChart';
	p.serialize = _ZEN_SVGComponent_pieChart_serialize;
	p.getSettings = _ZEN_SVGComponent_pieChart_getSettings;
	p.chartMouseDownHandler = _ZEN_SVGComponent_pieChart_chartMouseDownHandler;
	p.connectToController = _ZEN_SVGComponent_pieChart_connectToController;
	p.disconnectFromController = _ZEN_SVGComponent_pieChart_disconnectFromController;
	p.getChartElementStyle = _ZEN_SVGComponent_pieChart_getChartElementStyle;
	p.getChartRelatedElements = _ZEN_SVGComponent_pieChart_getChartRelatedElements;
	p.getController = _ZEN_SVGComponent_pieChart_getController;
	p.getLegendLabels = _ZEN_SVGComponent_pieChart_getLegendLabels;
	p.getPlotBy = _ZEN_SVGComponent_pieChart_getPlotBy;
	p.hasAxes = _ZEN_SVGComponent_pieChart_hasAxes;
	p.hasMultiples = _ZEN_SVGComponent_pieChart_hasMultiples;
	p.is3D = _ZEN_SVGComponent_pieChart_is3D;
	p.mousemoveHandler = _ZEN_SVGComponent_pieChart_mousemoveHandler;
	p.mouseupHandler = _ZEN_SVGComponent_pieChart_mouseupHandler;
	p.notifyView = _ZEN_SVGComponent_pieChart_notifyView;
	p.renderContents = _ZEN_SVGComponent_pieChart_renderContents;
	p.renderSeries = _ZEN_SVGComponent_pieChart_renderSeries;
	p.sendEventToController = _ZEN_SVGComponent_pieChart_sendEventToController;
	p.setControllerId = _ZEN_SVGComponent_pieChart_setControllerId;
	p.setProperty = _ZEN_SVGComponent_pieChart_setProperty;
	p.startSpinChart = _ZEN_SVGComponent_pieChart_startSpinChart;
}

self._zenClassIdx['slider'] = '_ZEN_SVGComponent_slider';
self._ZEN_SVGComponent_slider = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_slider__init(this,index,id);}
}

self._ZEN_SVGComponent_slider__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_meter__init) ?zenMaster._ZEN_SVGComponent_meter__init(o,index,id):_ZEN_SVGComponent_meter__init(o,index,id);
	o.constrained = true;
	o.controller = '';
	o.controllerId = '';
	o.ongetcontroller = '';
	o.onnotifyView = '';
	o.tickMarks = '10';
	o.viewBoxWidth = '10';
}
function _ZEN_SVGComponent_slider_serialize(set,s)
{
	var o = this;s[0]='2116571183';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=(o.animate?1:0);s[7]=o.aux;s[8]=(o.boundless?1:0);s[9]=(o.constrained?1:0);s[10]=o.controller;s[11]=o.controllerId;s[12]=o.dataBinding;s[13]=(o.disabled?1:0);s[14]=o.height;s[15]=(o.hidden?1:0);s[16]=o.label;s[17]=o.labelStyle;s[18]=o.onchange;s[19]=o.onclick;s[20]=o.ongetcontroller;s[21]=o.onnotifyView;s[22]=o.onupdate;s[23]=o.position;s[24]=o.preserveAspectRatio;s[25]=o.rangeLower;s[26]=o.rangeUpper;s[27]=o.renderFlag;s[28]=o.scaleFactor;s[29]=(o.showConditionally?1:0);s[30]=o.targetValue;s[31]=o.thresholdLower;s[32]=o.thresholdUpper;s[33]=o.tickMarks;s[34]=o.tuple;s[35]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[36]=o.viewBoxHeight;s[37]=o.viewBoxWidth;s[38]=(o.visible?1:0);s[39]=o.width;s[40]=o.x;s[41]=o.y;
}
function _ZEN_SVGComponent_slider_getSettings(s)
{
	s['name'] = 'string';
	s['constrained'] = 'boolean';
	s['controllerId'] = 'id';
	s['ongetcontroller'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	s['tickMarks'] = 'integer';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_slider_btnTimerHandler = function(which) {
delete this._timerId;
var newvalue = this.findNextTickValue(which);
if (newvalue != this.value) {
this._movedByTimer = true;
this._animate = this.animate
this.animate = false;
this.setProperty('value',newvalue);
this.animate = this._animate;
this.onchangeHandler();
this._timerId = window.setTimeout("zenPage.getComponent(" + this.index + ").btnTimerHandler('"+which+"')",175);
}
}

self._ZEN_SVGComponent_slider_connectToController = function() {
this.controller = '';
if (!zenIsMissing(this.controllerId)) {
if (this.composite) {
this.controller = this.composite.getChildById(this.controllerId);
}
else {
this.controller = zenPage.getComponentById(this.controllerId);
}
if (this.controller && this.controller.register) {
this.controller.register(this);
}
else {
alert('ZEN: Unable to connect component to dataController (' + this.id + ').');
}
if (this.controller) {
if ('' == this.controller.modelError) {
this.controller.loadModel(false);
}
}
}
}

self._ZEN_SVGComponent_slider_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._ZEN_SVGComponent_slider_dragThumb = function(evt) {
evt.stopPropagation();
if (this.disabled) return;
switch (evt.type) {
case 'mousedown':
this.document.documentElement.addEventListener('mousemove',this._dragFunc,false);
this.document.documentElement.addEventListener('mouseup',this._dragFunc,false);
this._animate = this.animate
this.animate = false;
var size = this.getSizeAbsolute();
var currZoom = (size.height / 100) * 100;
var ty = size.y + this._thumbPos;
this._deltaY = ty - (evt.clientY * (100/currZoom));
this._startY = ty;
break;
case 'mousemove':
case 'mouseup':
var size = this.getSizeAbsolute();
var currZoom = size.height / 100;
var ty = size.y + this._thumbPos;
var currZoom = (size.height / 100) * 100;
var dy = ((evt.clientY * (100/currZoom)) + this._deltaY) - ty;
if (Math.abs(dy) >= 1) {
var newvalue = this.getValueForPos(this._thumbPos + dy);
if (newvalue != this.value) {
this.setProperty('value',newvalue);
}
}
if ('mouseup' == evt.type) {
this.onchangeHandler();
this.document.documentElement.removeEventListener('mousemove',this._dragFunc,false);
this.document.documentElement.removeEventListener('mouseup',this._dragFunc,false);
this.animate = this._animate;
}
break;
}
}

self._ZEN_SVGComponent_slider_findNextTickValue = function(which) {
var newvalue = this.value;
var delta = 0;
var tcount = parseInt(this.tickMarks);
tcount = (tcount > 0) ? tcount : 10;
delta = (this.rangeUpper - this.rangeLower) / tcount;
if (delta != 0) {
switch(which) {
case 'up':
newvalue = parseFloat(this.value)+delta;
newvalue = (newvalue > this.rangeUpper) ? this.rangeUpper : newvalue;
break;
case 'down':
newvalue = parseFloat(this.value)-delta;
newvalue = (newvalue < this.rangeLower) ? this.rangeLower : newvalue;
break;
}
}
return newvalue;
}

self._ZEN_SVGComponent_slider_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._ZEN_SVGComponent_slider_getValueForPos = function(p) {
p -= 18;
if (p>=54) {
p = 54;
}
if (p<=0) {
p = 0;
}
return parseFloat(this.rangeLower) + ((parseFloat(this.rangeUpper) - parseFloat(this.rangeLower)) * ((54-p)/54));
}

self._ZEN_SVGComponent_slider_mouseDownHandler = function(evt,which) {
evt.stopPropagation();
if (this.disabled) return;
if (this._timerId) {
window.clearTimeout(this._timerId);
delete this._timerId;
}
this._timerId = window.setTimeout("zenPage.getComponent(" + this.index + ").btnTimerHandler('"+which+"')",250);
if (this._upFunc) {
this.document.documentElement.removeEventListener('mouseup',this._upFunc,false);
}
this._upFunc = new Function('evt','return zenPage.getComponent('+this.index+').mouseUpHandler(evt,"'+which+'");');
this.document.documentElement.addEventListener('mouseup',this._upFunc,false);
}

self._ZEN_SVGComponent_slider_mouseUpHandler = function(evt,which) {
evt.stopPropagation();
if (this.disabled) return;
if (this._timerId) {
window.clearTimeout(this._timerId);
delete this._timerId;
}
this.document.documentElement.removeEventListener('mouseup',this._upFunc,false);
delete this._upFunc;
if (!this._movedByTimer) {
var newvalue = this.findNextTickValue(which);
if (newvalue != this.value) {
this._animate = this.animate
this.animate = false;
this.setProperty('value',newvalue);
this.animate = this._animate;
this.onchangeHandler();
}
}
delete this._movedByTimer;
}

self._ZEN_SVGComponent_slider_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_slider_renderMeter = function() {
this._dragFunc = new Function('evt','return zenPage.getComponent('+this.index+').dragThumb(evt);');
this._thumbPos = 18;
var body = this.document.createElementNS(SVGNS,'rect');
body.setAttribute('id',this.makeId('body'));
body.setAttribute('class','slider-body');
body.setAttribute('x',0);
body.setAttribute('y',8);
body.setAttribute('width',10);
body.setAttribute('height',74);
body.setAttribute('rx',2);
this.svgGroup.appendChild(body);
var tcount = parseInt(this.tickMarks,10);
if (tcount > 0) {
for (var n = 0; n < (tcount + 1); n++) {
var yt = 18 + ((54/tcount) * n);
var tick = this.document.createElementNS(SVGNS,'line');
tick.setAttribute('class','slider-tick');
tick.setAttribute('x1', 2);
tick.setAttribute('x2', 8);
tick.setAttribute('y1', yt);
tick.setAttribute('y2', yt);
this.svgGroup.appendChild(tick);
}
}
var groove = this.document.createElementNS(SVGNS,'rect');
groove.setAttribute('class','slider-groove');
groove.setAttribute('x',4.5);
groove.setAttribute('y',18);
groove.setAttribute('width',1);
groove.setAttribute('height',54);
groove.setAttribute('rx',5);
this.svgGroup.appendChild(groove);
var g = this.document.createElementNS(SVGNS,'g');
g.setAttribute('id',this.makeId('thumb'));
this.svgGroup.appendChild(g);
var thumb = this.document.createElementNS(SVGNS,'polyline');
thumb.setAttribute('class','slider-thumb');
thumb.setAttribute('id',this.makeId('thumbShape'));
thumb.setAttribute('points', '-3,-2.5 3,0 -3,2.5 -3,-2.5');
g.appendChild(thumb);
thumb.addEventListener('mouseover',new Function('evt','evt.target.setAttribute("class","slider-thumbHover");'),false);
thumb.addEventListener('mouseout',new Function('evt','evt.target.setAttribute("class","slider-thumb");'),false);
thumb.addEventListener('mousedown',this._dragFunc,false);
var btn = this.document.createElementNS(SVGNS,'polyline');
btn.setAttribute('transform', 'translate(5,10)');
btn.setAttribute('class','slider-button');
btn.setAttribute('points', '0,0 2.5,5 -2.5,5 0,0');
this.svgGroup.appendChild(btn);
btn.addEventListener('mousedown',new Function('evt','which','return zenPage.getComponent('+this.index+').mouseDownHandler(evt,"up");'),false);
btn.addEventListener('mouseover',new Function('evt','evt.target.setAttribute("class","slider-buttonHover");'),false);
btn.addEventListener('mouseout',new Function('evt','evt.target.setAttribute("class","slider-button");'),false);
var btn = this.document.createElementNS(SVGNS,'polyline');
btn.setAttribute('transform', 'translate(5,80)');
btn.setAttribute('class','slider-button');
btn.setAttribute('points', '0,0 2.5,-5 -2.5,-5 0,0');
this.svgGroup.appendChild(btn);
btn.addEventListener('mousedown',new Function('evt','which','return zenPage.getComponent('+this.index+').mouseDownHandler(evt,"down");'),false);
btn.addEventListener('mouseover',new Function('evt','evt.target.setAttribute("class","slider-buttonHover");'),false);
btn.addEventListener('mouseout',new Function('evt','evt.target.setAttribute("class","slider-button");'),false);
this.renderLabel('50%',95);
this.updateThumb(false);
}

self._ZEN_SVGComponent_slider_roundValue = function(value) {
value = parseFloat(value);
value = isNaN(value) ? 0 : value;
var tcount = parseInt(this.tickMarks,10);
var range = (this.rangeUpper - this.rangeLower);
if (this.constrained && tcount > 0 && range != 0) {
value -= parseFloat(this.rangeLower);
value = (range/tcount) * Math.round((value / range) * tcount);
value += parseFloat(this.rangeLower);
}
return value;
}

self._ZEN_SVGComponent_slider_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_slider_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._ZEN_SVGComponent_slider_setProperty = function(property,value,value2) {
switch(property) {
case 'value':
value = parseFloat(value);
value = isNaN(value) ? 0 : value;
if (this._timerId) {
window.clearTimeout(this._timerId);
delete this._timerId;
}
this.value = this.roundValue(value);
if (null == this.currValue) {
this.currValue = 0;
}
var speed = (parseFloat(this.value) - parseFloat(this.currValue)) / 4;
this.currValue = parseFloat(this.currValue) + speed;
this.updateThumb(this.animate);
break;
case 'constrained':
value = value ? true : false;
this[property] = value;
break;
case 'tickMarks':
value = parseInt(value,10);
value = isNaN(value) ? 0 : value;
this[property] = value;
this.unrender();
this.render();
break;
case 'width':
case 'height':
return this.invokeSuper('setProperty',arguments);
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_SVGComponent_slider_updateThumb = function(animate) {
delete this._timerId;
var range = this.rangeUpper - this.rangeLower;
if (null == this.currValue) {
this.currValue = 0;
}
if (animate) {
if ((Math.abs(parseFloat(this.value) - parseFloat(this.currValue))<=(range/50))) {
this.currValue = parseFloat(this.value);
}
}
else {
this.currValue = parseFloat(this.value);
}
var ypos = 0;
if (range != 0) {
ypos = 54-(((this.currValue - this.rangeLower) / range) * 54);
}
if (ypos>=54) {
ypos = 54;
}
if (ypos<=0) {
ypos = 0;
}
this._thumbPos = 18+ypos;
var thumb = this.findSVGElement('thumb');
if (thumb) {
thumb.setAttribute("transform", "translate(5," + (this._thumbPos) + ")");
}
if (animate && (parseFloat(this.value) != parseFloat(this.currValue))) {
var speed = (parseFloat(this.value) - parseFloat(this.currValue)) / 2;
this.currValue = parseFloat(this.currValue) + speed;
this._timerId = window.setTimeout("zenPage.getComponent(" + this.index + ").updateThumb(true)",50);
}
}
self._ZEN_SVGComponent_slider__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_meter');
	_ZEN_SVGComponent_slider.prototype = zenCreate('_ZEN_SVGComponent_meter',-1);
	var p = _ZEN_SVGComponent_slider.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_slider;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_meter) ? zenMaster._ZEN_SVGComponent_meter.prototype:_ZEN_SVGComponent_meter.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.slider';
	p._type = 'slider';
	p.serialize = _ZEN_SVGComponent_slider_serialize;
	p.getSettings = _ZEN_SVGComponent_slider_getSettings;
	p.btnTimerHandler = _ZEN_SVGComponent_slider_btnTimerHandler;
	p.connectToController = _ZEN_SVGComponent_slider_connectToController;
	p.disconnectFromController = _ZEN_SVGComponent_slider_disconnectFromController;
	p.dragThumb = _ZEN_SVGComponent_slider_dragThumb;
	p.findNextTickValue = _ZEN_SVGComponent_slider_findNextTickValue;
	p.getController = _ZEN_SVGComponent_slider_getController;
	p.getValueForPos = _ZEN_SVGComponent_slider_getValueForPos;
	p.mouseDownHandler = _ZEN_SVGComponent_slider_mouseDownHandler;
	p.mouseUpHandler = _ZEN_SVGComponent_slider_mouseUpHandler;
	p.notifyView = _ZEN_SVGComponent_slider_notifyView;
	p.renderMeter = _ZEN_SVGComponent_slider_renderMeter;
	p.roundValue = _ZEN_SVGComponent_slider_roundValue;
	p.sendEventToController = _ZEN_SVGComponent_slider_sendEventToController;
	p.setControllerId = _ZEN_SVGComponent_slider_setControllerId;
	p.setProperty = _ZEN_SVGComponent_slider_setProperty;
	p.updateThumb = _ZEN_SVGComponent_slider_updateThumb;
}

self._zenClassIdx['smiley'] = '_ZEN_SVGComponent_smiley';
self._ZEN_SVGComponent_smiley = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_smiley__init(this,index,id);}
}

self._ZEN_SVGComponent_smiley__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_meter__init) ?zenMaster._ZEN_SVGComponent_meter__init(o,index,id):_ZEN_SVGComponent_meter__init(o,index,id);
	o.controller = '';
	o.controllerId = '';
	o.ongetcontroller = '';
	o.onnotifyView = '';
	o.persona = 'classic';
}
function _ZEN_SVGComponent_smiley_serialize(set,s)
{
	var o = this;s[0]='1325564582';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=(o.animate?1:0);s[7]=o.aux;s[8]=(o.boundless?1:0);s[9]=o.controller;s[10]=o.controllerId;s[11]=o.dataBinding;s[12]=(o.disabled?1:0);s[13]=o.height;s[14]=(o.hidden?1:0);s[15]=o.label;s[16]=o.labelStyle;s[17]=o.onchange;s[18]=o.onclick;s[19]=o.ongetcontroller;s[20]=o.onnotifyView;s[21]=o.onupdate;s[22]=o.persona;s[23]=o.position;s[24]=o.preserveAspectRatio;s[25]=o.rangeLower;s[26]=o.rangeUpper;s[27]=o.renderFlag;s[28]=o.scaleFactor;s[29]=(o.showConditionally?1:0);s[30]=o.targetValue;s[31]=o.thresholdLower;s[32]=o.thresholdUpper;s[33]=o.tuple;s[34]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[35]=o.viewBoxHeight;s[36]=o.viewBoxWidth;s[37]=(o.visible?1:0);s[38]=o.width;s[39]=o.x;s[40]=o.y;
}
function _ZEN_SVGComponent_smiley_getSettings(s)
{
	s['name'] = 'string';
	s['controllerId'] = 'id';
	s['ongetcontroller'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	s['persona'] = 'enum:classic,alien,pirate';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_smiley_connectToController = function() {
this.controller = '';
if (!zenIsMissing(this.controllerId)) {
if (this.composite) {
this.controller = this.composite.getChildById(this.controllerId);
}
else {
this.controller = zenPage.getComponentById(this.controllerId);
}
if (this.controller && this.controller.register) {
this.controller.register(this);
}
else {
alert('ZEN: Unable to connect component to dataController (' + this.id + ').');
}
if (this.controller) {
if ('' == this.controller.modelError) {
this.controller.loadModel(false);
}
}
}
}

self._ZEN_SVGComponent_smiley_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._ZEN_SVGComponent_smiley_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._ZEN_SVGComponent_smiley_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_smiley_renderAlien = function() {
var face = this.document.createElementNS(SVGNS,'path');
face.setAttribute('id',this.makeId('face'));
face.setAttribute('class','smiley-alien-face');
face.setAttribute('style','fill: url(#smiley-faceAlienGrad);');
face.setAttribute('d',"M 1307.8479,24.348421 c -148.5,0 -353.5,93.7 -353.5,337.5 0,0.8 0,1.7 0,2.5 1.7,242.7 248.6,445.9 353.5,445.90 105.3,0 353.5,-204.62263 353.5,-448.42263 0,-243.8 -205,-337.5 -353.5,-337.5 z");
face.setAttribute('transform','scale(0.1) translate(-800,50)');
this.svgGroup.appendChild(face);
var eye = this.document.createElementNS(SVGNS,'ellipse');
eye.setAttribute('id',this.makeId('reye'));
eye.setAttribute('class','smiley-alien-eye');
eye.setAttribute('cx',33);
eye.setAttribute('cy',45);
eye.setAttribute('rx',10);
eye.setAttribute('ry',5);
eye.setAttribute('transform','rotate(45,33,45)');
this.svgGroup.appendChild(eye);
var eye = this.document.createElementNS(SVGNS,'ellipse');
eye.setAttribute('id',this.makeId('reyeInner'));
eye.setAttribute('class','smiley-alien-eye');
eye.setAttribute('style','opacity: 0.7;');
eye.setAttribute('cx',33);
eye.setAttribute('cy',45);
eye.setAttribute('rx',9);
eye.setAttribute('ry',4);
eye.setAttribute('transform','rotate(45,33,45)');
this.svgGroup.appendChild(eye);
var eye = this.document.createElementNS(SVGNS,'ellipse');
eye.setAttribute('id',this.makeId('leye'));
eye.setAttribute('class','smiley-alien-eye');
eye.setAttribute('cx',67);
eye.setAttribute('cy',45);
eye.setAttribute('rx',10);
eye.setAttribute('ry',5);
eye.setAttribute('transform','rotate(-45,67,45)');
this.svgGroup.appendChild(eye);
var eye = this.document.createElementNS(SVGNS,'ellipse');
eye.setAttribute('id',this.makeId('leyeInner'));
eye.setAttribute('class','smiley-alien-eye');
eye.setAttribute('style','opacity: 0.7;');
eye.setAttribute('cx',67);
eye.setAttribute('cy',45);
eye.setAttribute('rx',9);
eye.setAttribute('ry',4);
eye.setAttribute('transform','rotate(-45,67,45)');
this.svgGroup.appendChild(eye);
var mouth = this.document.createElementNS(SVGNS,'path');
mouth.setAttribute('id',this.makeId('mouth'));
mouth.setAttribute('class','smiley-mouth');
mouth.setAttribute('d','M 28 55 a 10 5 0 1 0 44 0');
mouth.setAttribute('transform','translate(0,12)');
this.svgGroup.appendChild(mouth);
this.renderLabel('50%',95);
this.updateMouth();
}

self._ZEN_SVGComponent_smiley_renderFace = function() {
var face = this.document.createElementNS(SVGNS,'circle');
face.setAttribute('id',this.makeId('face'));
face.setAttribute('class','smiley-face');
face.setAttribute('style','fill: url(#smiley-faceGrad);');
face.setAttribute('cx',50);
face.setAttribute('cy',45);
face.setAttribute('r',35);
this.svgGroup.appendChild(face);
var eye = this.document.createElementNS(SVGNS,'circle');
eye.setAttribute('id',this.makeId('reye'));
eye.setAttribute('class','smiley-eye');
eye.setAttribute('cx',33);
eye.setAttribute('cy',35);
eye.setAttribute('r',3);
this.svgGroup.appendChild(eye);
var eye = this.document.createElementNS(SVGNS,'circle');
eye.setAttribute('id',this.makeId('leye'));
eye.setAttribute('class','smiley-eye');
eye.setAttribute('cx',67);
eye.setAttribute('cy',35);
eye.setAttribute('r',3);
this.svgGroup.appendChild(eye);
if ('pirate'==this.persona) {
var band = this.document.createElementNS(SVGNS,'path');
band.setAttribute('class','smiley-eyeBand');
band.setAttribute('d','M 27 18 L 65 35 84.5 42 84 40 65 32 z');
this.svgGroup.appendChild(band);
var patch = this.document.createElementNS(SVGNS,'rect');
patch.setAttribute('class','smiley-eyePatch');
patch.setAttribute('x',61);
patch.setAttribute('y',30);
patch.setAttribute('width',10);
patch.setAttribute('height',10);
patch.setAttribute('rx',3);
this.svgGroup.appendChild(patch);
}
var brow = this.document.createElementNS(SVGNS,'path');
brow.setAttribute('id',this.makeId('rx'));
brow.setAttribute('class','smiley-eye');
brow.setAttribute('style','display: none;');
brow.setAttribute('d','M 31 33 L 35 37 M 31 37 L 35 33');
this.svgGroup.appendChild(brow);
var brow = this.document.createElementNS(SVGNS,'path');
brow.setAttribute('id',this.makeId('lx'));
brow.setAttribute('class','smiley-eye');
brow.setAttribute('style','display: none;');
brow.setAttribute('d','M 65 33 L 69 37 M 65 37 L 69 33');
this.svgGroup.appendChild(brow);
var brow = this.document.createElementNS(SVGNS,'path');
brow.setAttribute('id',this.makeId('rbrow'));
brow.setAttribute('class','smiley-eye');
brow.setAttribute('style','');
brow.setAttribute('d','M 28 30 a 1 1.6 -45 1 1 10 3');
this.svgGroup.appendChild(brow);
if ('pirate'!=this.persona) {
var brow = this.document.createElementNS(SVGNS,'path');
brow.setAttribute('id',this.makeId('lbrow'));
brow.setAttribute('class','smiley-eye');
brow.setAttribute('style','');
brow.setAttribute('d','M 72 30 a 1 1.6 45 1 0 -10 3');
this.svgGroup.appendChild(brow);
}
var mouth = this.document.createElementNS(SVGNS,'path');
mouth.setAttribute('id',this.makeId('mouth'));
if ('pirate'==this.persona) {
mouth.setAttribute('class','smiley-pirate-mouth');
mouth.setAttribute('style','fill: url(#teeth);');
}
else {
mouth.setAttribute('class','smiley-mouth');
}
mouth.setAttribute('d','M 28 55 a 10 5 0 1 0 44 0');
this.svgGroup.appendChild(mouth);
this.renderLabel('50%',95);
this.updateMouth();
}

self._ZEN_SVGComponent_smiley_renderMeter = function() {
switch(this.persona) {
case 'alien':
this.renderAlien();
break;
default:
this.renderFace();
break;
}
}

self._ZEN_SVGComponent_smiley_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_smiley_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._ZEN_SVGComponent_smiley_setProperty = function(property,value,value2) {
switch(property) {
case 'persona':
this.persona = value;
this.unrender();
this.render();
break;
case 'value':
this.value = value;
this.updateMouth();
break;
case 'width':
case 'height':
return this.invokeSuper('setProperty',arguments);
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_SVGComponent_smiley_updateMouth = function() {
var smile = 0;
var sweep = 1;
var xeyes = false;
var brows = false;
var range = parseFloat(this._rangeUpper) - parseFloat(this._rangeLower);
if (range != 0) {
smile = -((((parseFloat(this.value) - parseFloat(this._rangeLower)) / range) * 10) - 5);
}
if (smile >= 5) {
smile = 5;
xeyes = true;
}
if (smile <=-5) {
smile = -5;
brows = true;
}
if (smile <= 0) {
sweep = 0;
smile = -smile;
}
if (smile == 0) {
smile = 0.001;
}
var mouth = this.findSVGElement("mouth");
var path = "M 28 55 a 10 " + smile + " 0 1 " + sweep + " 44 0";
if ('pirate'==this.persona) {
path += ' z';
}
mouth.setAttribute("d", path);
if (this.persona=='alien') {
if (xeyes) {
this.findSVGElement("reye").setAttribute("style","fill:url(#glow-red);");
this.findSVGElement("leye").setAttribute("style","fill:url(#glow-red);");
}
else if (brows) {
this.findSVGElement("reye").setAttribute("style","fill:url(#glow-blue);");
this.findSVGElement("leye").setAttribute("style","fill:url(#glow-blueDiag);");
}
else {
this.findSVGElement("reye").setAttribute("style","");
this.findSVGElement("leye").setAttribute("style","");
}
return;
}
if (xeyes) {
this.findSVGElement("reye").setAttribute("style","display:none;");
this.findSVGElement("leye").setAttribute("style","display:none;");
this.findSVGElement("rx").setAttribute("style","");
this.findSVGElement("lx").setAttribute("style","");
}
else {
this.findSVGElement("reye").setAttribute("style","");
this.findSVGElement("leye").setAttribute("style","");
this.findSVGElement("rx").setAttribute("style","display:none;");
this.findSVGElement("lx").setAttribute("style","display:none;");
}
if (brows) {
this.findSVGElement("rbrow").setAttribute("style","");
if ('pirate'!=this.persona) {
this.findSVGElement("lbrow").setAttribute("style","");
}
}
else {
this.findSVGElement("rbrow").setAttribute("style","display:none;");
if ('pirate'!=this.persona) {
this.findSVGElement("lbrow").setAttribute("style","display:none;");
}
}
}
self._ZEN_SVGComponent_smiley__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_meter');
	_ZEN_SVGComponent_smiley.prototype = zenCreate('_ZEN_SVGComponent_meter',-1);
	var p = _ZEN_SVGComponent_smiley.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_smiley;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_meter) ? zenMaster._ZEN_SVGComponent_meter.prototype:_ZEN_SVGComponent_meter.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.smiley';
	p._type = 'smiley';
	p.serialize = _ZEN_SVGComponent_smiley_serialize;
	p.getSettings = _ZEN_SVGComponent_smiley_getSettings;
	p.connectToController = _ZEN_SVGComponent_smiley_connectToController;
	p.disconnectFromController = _ZEN_SVGComponent_smiley_disconnectFromController;
	p.getController = _ZEN_SVGComponent_smiley_getController;
	p.notifyView = _ZEN_SVGComponent_smiley_notifyView;
	p.renderAlien = _ZEN_SVGComponent_smiley_renderAlien;
	p.renderFace = _ZEN_SVGComponent_smiley_renderFace;
	p.renderMeter = _ZEN_SVGComponent_smiley_renderMeter;
	p.sendEventToController = _ZEN_SVGComponent_smiley_sendEventToController;
	p.setControllerId = _ZEN_SVGComponent_smiley_setControllerId;
	p.setProperty = _ZEN_SVGComponent_smiley_setProperty;
	p.updateMouth = _ZEN_SVGComponent_smiley_updateMouth;
}

self._zenClassIdx['speedometer'] = '_ZEN_SVGComponent_speedometer';
self._ZEN_SVGComponent_speedometer = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_speedometer__init(this,index,id);}
}

self._ZEN_SVGComponent_speedometer__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_meter__init) ?zenMaster._ZEN_SVGComponent_meter__init(o,index,id):_ZEN_SVGComponent_meter__init(o,index,id);
	o.controller = '';
	o.controllerId = '';
	o.highLampColor = 'url(#glow-red)';
	o.highRangeStyle = '';
	o.independentOdometer = false;
	o.innerCircleStyle = '';
	o.logo = 'Zen';
	o.lowLampColor = 'url(#glow-red)';
	o.lowRangeStyle = '';
	o.midCircleStyle = '';
	o.needleStyle = '';
	o.nubStyle = '';
	o.odometerBoxStyle = '';
	o.odometerFormat = '';
	o.odometerTextStyle = '';
	o.odometerValue = '';
	o.ongetcontroller = '';
	o.onnotifyView = '';
	o.outerCircleStyle = '';
	o.ringStyle = '';
	o.separatorStyle = '';
	o.stylized = false;
	o.thinNeedle = false;
	o.valueLabelStyle = '';
}
function _ZEN_SVGComponent_speedometer_serialize(set,s)
{
	var o = this;s[0]='41715304';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=(o.animate?1:0);s[7]=o.aux;s[8]=(o.boundless?1:0);s[9]=o.controller;s[10]=o.controllerId;s[11]=o.dataBinding;s[12]=(o.disabled?1:0);s[13]=o.height;s[14]=(o.hidden?1:0);s[15]=o.highLampColor;s[16]=o.highRangeStyle;s[17]=(o.independentOdometer?1:0);s[18]=o.innerCircleStyle;s[19]=o.label;s[20]=o.labelStyle;s[21]=o.logo;s[22]=o.lowLampColor;s[23]=o.lowRangeStyle;s[24]=o.midCircleStyle;s[25]=o.needleStyle;s[26]=o.nubStyle;s[27]=o.odometerBoxStyle;s[28]=o.odometerFormat;s[29]=o.odometerTextStyle;s[30]=o.odometerValue;s[31]=o.onchange;s[32]=o.onclick;s[33]=o.ongetcontroller;s[34]=o.onnotifyView;s[35]=o.onupdate;s[36]=o.outerCircleStyle;s[37]=o.position;s[38]=o.preserveAspectRatio;s[39]=o.rangeLower;s[40]=o.rangeUpper;s[41]=o.renderFlag;s[42]=o.ringStyle;s[43]=o.scaleFactor;s[44]=o.separatorStyle;s[45]=(o.showConditionally?1:0);s[46]=(o.stylized?1:0);s[47]=o.targetValue;s[48]=(o.thinNeedle?1:0);s[49]=o.thresholdLower;s[50]=o.thresholdUpper;s[51]=o.tuple;s[52]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[53]=o.valueLabelStyle;s[54]=o.viewBoxHeight;s[55]=o.viewBoxWidth;s[56]=(o.visible?1:0);s[57]=o.width;s[58]=o.x;s[59]=o.y;
}
function _ZEN_SVGComponent_speedometer_getSettings(s)
{
	s['name'] = 'string';
	s['controllerId'] = 'id';
	s['highLampColor'] = 'color';
	s['highRangeStyle'] = 'style';
	s['independentOdometer'] = 'boolean';
	s['innerCircleStyle'] = 'style';
	s['logo'] = 'caption';
	s['lowLampColor'] = 'color';
	s['lowRangeStyle'] = 'style';
	s['midCircleStyle'] = 'style';
	s['needleStyle'] = 'style';
	s['nubStyle'] = 'style';
	s['odometerBoxStyle'] = 'style';
	s['odometerFormat'] = 'string';
	s['odometerTextStyle'] = 'style';
	s['odometerValue'] = 'string';
	s['ongetcontroller'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	s['outerCircleStyle'] = 'style';
	s['ringStyle'] = 'style';
	s['separatorStyle'] = 'style';
	s['stylized'] = 'boolean';
	s['thinNeedle'] = 'boolean';
	s['valueLabelStyle'] = 'style';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_speedometer_connectToController = function() {
this.controller = '';
if (!zenIsMissing(this.controllerId)) {
if (this.composite) {
this.controller = this.composite.getChildById(this.controllerId);
}
else {
this.controller = zenPage.getComponentById(this.controllerId);
}
if (this.controller && this.controller.register) {
this.controller.register(this);
}
else {
alert('ZEN: Unable to connect component to dataController (' + this.id + ').');
}
if (this.controller) {
if ('' == this.controller.modelError) {
this.controller.loadModel(false);
}
}
}
}

self._ZEN_SVGComponent_speedometer_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._ZEN_SVGComponent_speedometer_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._ZEN_SVGComponent_speedometer_getNumericAbbreviation = function(val,min,max) {
var factor = 1;
var maxVal = factor * max;
var minVal = factor * min;
var absmax = Math.abs(factor * max);
var absmin = Math.abs(factor * min);
var test = (absmax > absmin) ? absmax : absmin;
if (test >= 600000000) {
val = Math.round(val / 10000000)/100 + 'G';
}
else if (test >= 600000) {
val = Math.round(val / 10000)/100 + 'M';
}
else if (test >= 10000) {
val = Math.round(val / 10)/100 + 'K';
}
else if (test >= 100) {
val = Math.round(val);
}
else {
val = Math.round(val*1000)/1000;
}
return val;
}

self._ZEN_SVGComponent_speedometer_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_speedometer_renderMeter = function() {
if (this.stylized) {
this.renderMeterStylized();
}
else {
var range = this._rangeUpper - this._rangeLower;
var delta = range / 10;
var startVal = this._rangeLower;
var val = parseFloat(startVal);
val = isNaN(val) ? 0 : val;
this._labels = new Array();
for (var n = 0; n < 11; n++) {
var dval = this.getNumericAbbreviation(val,this._rangeLower,this._rangeUpper);
this._labels[n] = dval;
val += delta;
}
this.renderMeterBaroque();
}
this.renderOdometer();
this.renderNeedle();
this.renderLabel('50%',95);
this.updateNeedle(false);
}

self._ZEN_SVGComponent_speedometer_renderMeterBaroque = function() {
var body = this.document.createElementNS(SVGNS,'circle');
body.setAttribute('class','speedometer-outerCircle');
body.setAttribute('fill','url(#speedometer-blueGrad)');
body.setAttribute('style',this.outerCircleStyle);
body.setAttribute('cx',50);
body.setAttribute('cy',43);
body.setAttribute('r',40);
this.svgGroup.appendChild(body);
var lamp = this.document.createElementNS(SVGNS,'circle');
lamp.setAttribute('id',this.makeId('lowLamp'));
lamp.setAttribute('class','speedometer-lamp');
lamp.setAttribute('fill','none');
lamp.setAttribute('cx',28);
lamp.setAttribute('cy',73);
lamp.setAttribute('r',1.6);
this.svgGroup.appendChild(lamp);
var lamp = this.document.createElementNS(SVGNS,'circle');
lamp.setAttribute('id',this.makeId('highLamp'));
lamp.setAttribute('class','speedometer-lamp');
lamp.setAttribute('fill','none');
lamp.setAttribute('cx',72);
lamp.setAttribute('cy',73);
lamp.setAttribute('r',1.6);
this.svgGroup.appendChild(lamp);
var body = this.document.createElementNS(SVGNS,'circle');
body.setAttribute('class','speedometer-midCircle');
body.setAttribute('style',this.midCircleStyle);
body.setAttribute('cx',50);
body.setAttribute('cy',43);
body.setAttribute('r',20);
this.svgGroup.appendChild(body);
var startAngle = -140;
var endAngle = 140;
var startAngleRdn = (startAngle-90) * Math.PI/180;
var endAngleRdn = (endAngle-90) * Math.PI/180;
var inRadius = 15;
var outRadius = 20;
var circle = this.document.createElementNS(SVGNS,'circle');
circle.setAttribute('class','speedometer-innerCircle');
circle.setAttribute('style',this.innerCircleStyle);
circle.setAttribute('cx',50);
circle.setAttribute('cy',43);
circle.setAttribute('r',inRadius);
this.svgGroup.appendChild(circle);
var ringOutStartX = 50 + (outRadius * Math.cos(startAngleRdn));
var ringOutStartY = 43 + (outRadius * Math.sin(startAngleRdn));
var ringOutEndX = 50 + (outRadius * Math.cos(endAngleRdn));
var ringOutEndY = 43 + (outRadius * Math.sin(endAngleRdn));
var ringInStartX = 50 + (inRadius * Math.cos(startAngleRdn));
var ringInStartY = 43 + (inRadius * Math.sin(startAngleRdn));
var ringInEndX = 50 + (inRadius * Math.cos(endAngleRdn));
var ringInEndY = 43 + (inRadius * Math.sin(endAngleRdn));
var ring = this.document.createElementNS(SVGNS,'path');
ring.setAttribute('class','speedometer-ring');
ring.setAttribute('style',this.ringStyle);
var path = 'M ' + ringOutStartX + ' ' + ringOutStartY;
path += ' A ' +outRadius+' '+outRadius+' 0 1 1 '+ringOutEndX+' '+ringOutEndY;
path += ' L ' + ringInEndX + ' ' + ringInEndY;
path += ' A ' +inRadius+' '+inRadius+' 0 1 0 '+ringInStartX+' '+ringInStartY;
path += ' z';
ring.setAttribute('d',path);
this.svgGroup.appendChild(ring);
var range = this._rangeUpper - this._rangeLower;
if (this._thresholdLower > this._rangeLower && this._thresholdLower < this._rangeUpper) {
var angle = 0;
if (range != 0) {
angle = (((this._thresholdLower - this._rangeLower) / range) * 280) - 140;
}
if (angle > -141) {
angle = (angle > 140) ? 140 : angle;
var rangeAngleRdn = (angle-90) * Math.PI/180;
var ringOutStartX = 50 + (outRadius * Math.cos(startAngleRdn));
var ringOutStartY = 43 + (outRadius * Math.sin(startAngleRdn));
var ringOutEndX = 50 + (outRadius * Math.cos(rangeAngleRdn));
var ringOutEndY = 43 + (outRadius * Math.sin(rangeAngleRdn));
var ringInStartX = 50 + (inRadius * Math.cos(startAngleRdn));
var ringInStartY = 43 + (inRadius * Math.sin(startAngleRdn));
var ringInEndX = 50 + (inRadius * Math.cos(rangeAngleRdn));
var ringInEndY = 43 + (inRadius * Math.sin(rangeAngleRdn));
var ring = this.document.createElementNS(SVGNS,'path');
ring.setAttribute('class','speedometer-lowRange');
ring.setAttribute('style',this.lowRangeStyle);
var largeArc = (angle > 50) ? 1 : 0;
var path = 'M ' + ringOutStartX + ' ' + ringOutStartY;
path += ' A ' +outRadius+' '+outRadius+' 0 '+largeArc+' 1 '+ringOutEndX+' '+ringOutEndY;
path += ' L ' + ringInEndX + ' ' + ringInEndY;
path += ' A ' +inRadius+' '+inRadius+' 0 '+largeArc+' 0 '+ringInStartX+' '+ringInStartY;
path += ' z';
ring.setAttribute('d',path);
this.svgGroup.appendChild(ring);
}
}
if (this._thresholdUpper < this._rangeUpper && this._thresholdUpper > this._rangeLower) {
var angle = 0;
if (range != 0) {
angle = (((this._thresholdUpper - this._rangeLower) / range) * 280) - 140;
}
if (angle < 139) {
angle = (angle < -140) ? -140 : angle;
var rangeAngleRdn = (angle-90) * Math.PI/180;
var ringOutStartX = 50 + (outRadius * Math.cos(rangeAngleRdn));
var ringOutStartY = 43 + (outRadius * Math.sin(rangeAngleRdn));
var ringOutEndX = 50 + (outRadius * Math.cos(endAngleRdn));
var ringOutEndY = 43 + (outRadius * Math.sin(endAngleRdn));
var ringInStartX = 50 + (inRadius * Math.cos(rangeAngleRdn));
var ringInStartY = 43 + (inRadius * Math.sin(rangeAngleRdn));
var ringInEndX = 50 + (inRadius * Math.cos(endAngleRdn));
var ringInEndY = 43 + (inRadius * Math.sin(endAngleRdn));
var ring = this.document.createElementNS(SVGNS,'path');
ring.setAttribute('class','speedometer-highRange');
ring.setAttribute('style',this.highRangeStyle);
var largeArc = (angle < -50) ? 1 : 0;
var path = 'M ' + ringOutStartX + ' ' + ringOutStartY;
path += ' A ' +outRadius+' '+outRadius+' 0 '+largeArc+' 1 '+ringOutEndX+' '+ringOutEndY;
path += ' L ' + ringInEndX + ' ' + ringInEndY;
path += ' A ' +inRadius+' '+inRadius+' 0 '+largeArc+' 0 '+ringInStartX+' '+ringInStartY;
path += ' z';
ring.setAttribute('d',path);
this.svgGroup.appendChild(ring);
}
}
var n = 0;
for (var a = -140; a<= 140; a += 28) {
var tick = this.document.createElementNS(SVGNS,'line');
tick.setAttribute('class','speedometer-tick');
tick.setAttribute('x1',50);
tick.setAttribute('y1',43 - inRadius);
tick.setAttribute('x2',50);
tick.setAttribute('y2',43 - outRadius);
tick.setAttribute('transform','rotate('+a+',50,43)');
this.svgGroup.appendChild(tick);
var tx = 50 + ((outRadius+8) * Math.cos((a-90) * (Math.PI/180)));
var ty = 43 + ((outRadius+8) * Math.sin((a-90) * (Math.PI/180)));
var lblText = this.document.createElementNS(SVGNS,'text');
lblText.setAttribute('class','speedometer-labelText');
lblText.setAttribute('style',this.valueLabelStyle);
lblText.setAttribute('x',tx);
lblText.setAttribute('y',ty);
lblText.setAttribute('text-anchor','middle');
var textNode = this.document.createTextNode(this._labels[n]);
lblText.appendChild(textNode);
this.svgGroup.appendChild(lblText);
var th = (zenGetBBox(lblText).height);
lblText.setAttribute('y',ty + (th / 2));
n++;
}
for (var a = -140; a<= 140; a += 7) {
if (a%28 != 0) {
var tick = this.document.createElementNS(SVGNS,'line');
tick.setAttribute('class','speedometer-minorTick');
tick.setAttribute('x1',50);
tick.setAttribute('y1',43 - inRadius);
tick.setAttribute('x2',50);
tick.setAttribute('y2',43 - outRadius);
tick.setAttribute('transform','rotate('+a+',50,43)');
this.svgGroup.appendChild(tick);
}
}
var n = 0;
for (var a = -140; a< 140; a += 28) {
var tick = this.document.createElementNS(SVGNS,'line');
tick.setAttribute('class','speedometer-separator');
tick.setAttribute('style',this.separatorStyle);
tick.setAttribute('x1',50);
tick.setAttribute('y1',43 - outRadius);
tick.setAttribute('x2',50);
tick.setAttribute('y2',3);
tick.setAttribute('transform','rotate('+(a+28/2)+',50,43)');
this.svgGroup.appendChild(tick);
}
if ('' != this._targetValue && (parseFloat(this._targetValue) > parseFloat(this._rangeLower))&& (parseFloat(this._targetValue) < parseFloat(this._rangeUpper))) {
var angle = -200;
if (range != 0) {
angle = (((parseFloat(this._targetValue) - this._rangeLower) / range) * 280) - 140;
}
if (angle >= -140 && angle <= 140) {
var tick = this.document.createElementNS(SVGNS,'line');
tick.setAttribute('class','speedometer-targetTick');
tick.setAttribute('x1',50);
tick.setAttribute('y1',43 - inRadius);
tick.setAttribute('x2',50);
tick.setAttribute('y2',3);
tick.setAttribute('transform','rotate('+angle+',50,43)');
this.svgGroup.appendChild(tick);
}
}
}

self._ZEN_SVGComponent_speedometer_renderMeterStylized = function() {
var body = this.document.createElementNS(SVGNS,'path');
body.setAttribute('class','speedometer-body');
body.setAttribute('fill','url(#speedometer-bodyGrad)');
body.setAttribute('d','M 40 80 A 38 38 0 1 1 60 80 z');
this.svgGroup.appendChild(body);
var lamp = this.document.createElementNS(SVGNS,'circle');
lamp.setAttribute('id',this.makeId('lowLamp'));
lamp.setAttribute('class','speedometer-lamp');
lamp.setAttribute('fill','none');
lamp.setAttribute('cx',34.5);
lamp.setAttribute('cy',72);
lamp.setAttribute('r',1.8);
this.svgGroup.appendChild(lamp);
var lamp = this.document.createElementNS(SVGNS,'circle');
lamp.setAttribute('id',this.makeId('highLamp'));
lamp.setAttribute('class','speedometer-lamp');
lamp.setAttribute('fill','none');
lamp.setAttribute('cx',65.5);
lamp.setAttribute('cy',72);
lamp.setAttribute('r',1.8);
this.svgGroup.appendChild(lamp);
var style = "Thin";
for (var a = -140; a<= 140; a += 14) {
style = ('Thick' == style) ? 'Thin' : 'Thick';
var tick = this.document.createElementNS(SVGNS,'line');
tick.setAttribute('class','speedometer-tick' + style);
tick.setAttribute('x1',50);
tick.setAttribute('y1',12);
tick.setAttribute('x2',50);
tick.setAttribute('y2',9);
tick.setAttribute('transform','rotate('+a+',50,43)');
this.svgGroup.appendChild(tick);
}
var logo = this.document.createElementNS(SVGNS,'text');
logo.setAttribute('id',this.makeId('logo'));
logo.setAttribute('class','speedometer-logoText');
logo.setAttribute('x',50);
logo.setAttribute('y',33);
logo.setAttribute('text-anchor','middle');
var textNode = this.document.createTextNode(this.logo);
logo.appendChild(textNode);
this.svgGroup.appendChild(logo);
}

self._ZEN_SVGComponent_speedometer_renderNeedle = function() {
var path;
if (this.stylized) {
if (this.thinNeedle) {
path = 'M 50 12 L 51 55 49 55 z';
}
else {
path = 'M 50 12 L 53 55 50 53 47 55 z';
}
}
else {
if (this.thinNeedle) {
path = 'M 50 20 L 51 55 49 55 z';
}
else {
path = 'M 50 20 L 53 55 50 53 47 55 z';
}
}
var shadow = this.document.createElementNS(SVGNS,'path');
shadow.setAttribute('id',this.makeId('shadow'));
shadow.setAttribute('class','speedometer-shadow');
shadow.setAttribute('d',path);
shadow.setAttribute('transform','rotate(1,50,43)');
this.svgGroup.appendChild(shadow);
var needle = this.document.createElementNS(SVGNS,'path');
needle.setAttribute('id',this.makeId('needle'));
needle.setAttribute('class','speedometer-needle');
needle.setAttribute('style',this.needleStyle);
needle.setAttribute('d',path);
needle.setAttribute('transform','rotate(0,50,43)');
this.svgGroup.appendChild(needle);
if (this.stylized) {
var nub = this.document.createElementNS(SVGNS,'path');
nub.setAttribute('class','speedometer-nub');
nub.setAttribute('fill','url(#speedometer-bodyGrad)');
nub.setAttribute('d','M 47 51 A 8 8 0 1 1 53 51 z');
}
else {
var nub = this.document.createElementNS(SVGNS,'circle');
nub.setAttribute('class','speedometer-nub');
nub.setAttribute('fill','url(#speedometer-blueGrad2)');
nub.setAttribute('style',this.nubStyle);
nub.setAttribute('cx',50);
nub.setAttribute('cy',43);
nub.setAttribute('r',4);
}
this.svgGroup.appendChild(nub);
}

self._ZEN_SVGComponent_speedometer_renderOdometer = function() {
var th = 8;
var tw = 34;
var oy = this.stylized ? 58 : 74;
var tadj = 2;
var adj = zenIsIE ? 0 : 1;
var rect = this.document.createElementNS(SVGNS,'rect');
rect.setAttribute('class','speedometer-levelTextBox');
rect.setAttribute("style",this.odometerBoxStyle);
rect.setAttribute('x',50 - tw/2);
rect.setAttribute('y',oy - th/2);
rect.setAttribute('width',tw);
rect.setAttribute('height',th);
rect.setAttribute('rx',1);
this.svgGroup.appendChild(rect);
var lvlText = this.document.createElementNS(SVGNS,'text');
lvlText.setAttribute('id',this.makeId('levelText'));
lvlText.setAttribute('x',50 + (tw/2) - 2 + adj);
lvlText.setAttribute('y',oy - (th/2) + th - tadj);
lvlText.setAttribute('text-anchor','end');
var ovalue = this.independentOdometer ? this.odometerValue : this.value;
lvlText.setAttribute("class",(ovalue>=0) ? "speedometer-levelText" : "speedometer-levelTextNeg");
lvlText.setAttribute("style",this.odometerTextStyle);
var textNode = this.document.createTextNode(ovalue);
lvlText.appendChild(textNode);
this.svgGroup.appendChild(lvlText);
this.setProperty('odometerValue',ovalue);
}

self._ZEN_SVGComponent_speedometer_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_speedometer_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._ZEN_SVGComponent_speedometer_setProperty = function(property,value,value2) {
switch(property) {
case 'rangeUpper':
case 'rangeLower':
case 'thresholdUpper':
case 'thresholdLower':
case 'thinNeedle':
case 'stylized':
case 'needleStyle':
case 'lowRangeStyle':
case 'highRangeStyle':
case 'nubStyle':
case 'outerCircleStyle':
case 'midCircleStyle':
case 'innerCircleStyle':
case 'ringStyle':
case 'separatorStyle':
case 'valueLabelStyle':
case 'odometerTextStyle':
case 'odometerBoxStyle':
case 'odometerFormat':
this[property] = value;
this.unrender();
this.render();
break;
case 'odometerValue':
var lvl = 0;
if (this.independentOdometer) {
this.odometerValue = value;
var lvl = value * this.scaleFactor;
}
else {
var lvl = this.value * this.scaleFactor;
}
var text = this.findSVGElement('levelText');
if (text) {
text.setAttribute("class",(lvl>=0) ? "speedometer-levelText" : "speedometer-levelTextNeg");
if ('' != this.odometerFormat) {
var dval = zenFormatNumber(lvl,this.odometerFormat);
}
else {
var dval = Math.round(lvl);
}
this.setTextNode("levelText",(isNaN(dval) ? '' : dval));		// DTB585
var tw = (zenGetBBox(text).width);
if ((tw>36) || (lvl>=100000000) || (lvl<=-10000000)) {
lvl = "\043\043\043\043\043\043";
this.setTextNode("levelText",lvl);
}
}
break;
case 'independentOdometer':
value = value ? true : false;
this.independentOdometer = value;
this.setProperty('odometerValue',this.independentOdometer ? this.odometerValue : this.value);
break;
case 'value':
if (this._timerId) {
window.clearTimeout(this._timerId);
delete this._timerId;
}
this.value = value;
if (null == this.currValue) {
this.currValue = 0;
}
var speed = (this.value*1 - this.currValue*1) / 4;
this.currValue = this.currValue*1 + speed;
this.updateNeedle(this.animate);
if (!this.independentOdometer) {
this.setProperty('odometerValue',value);		// DTB585
}
break;
case 'logo':
this.logo = value;
this.setTextNode('logo',this.logo);
break;
case 'lowLampColor':
case 'highLampColor':
this[property] = value;
this.updateNeedle(false);
break;
case 'width':
case 'height':
return this.invokeSuper('setProperty',arguments);
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_SVGComponent_speedometer_updateNeedle = function(animate) {
delete this._timerId;
var valueIsNaN = isNaN(this.value*1);		// DTB585 - Test thevalue for a useable value
var range = this._rangeUpper - this._rangeLower;
if ((null == this.currValue)||isNaN(this.currValue)) {
this.currValue = 0;
}
if (animate) {
if ((Math.abs(this.value*1 - this.currValue*1)<=(range/280))) {
this.currValue = this.value*1;
}
}
else {
this.currValue = this.value*1;
}
var angle = 0;
if (range != 0) {
angle = (((this.currValue - this._rangeLower) / range) * 280) - 140;
}
if (angle>=140) {
angle = 140;
}
if (angle<=-140) {
angle = -140;
}
if (valueIsNaN) {
angle = -180;		// DTB585 - Drop the needle
}
var needle = this.findSVGElement('needle');
if (needle) {
if (angle) {
needle.style.visibility = 'visible';		// DTB585
needle.setAttribute("transform", "rotate(" + angle + ",50,43)");
}
else {
needle.style.visibility = 'hidden';		// DTB585
}
}
var shadow = this.findSVGElement('shadow');
if (shadow) {
if (angle) {
shadow.style.visibility = 'visible';		// DTB585
shadow.setAttribute("transform", "translate(3,2) rotate(" + angle + ",50,43)");
}
else {
shadow.style.visibility = 'hidden';		// DTB585
}
}
var lowLamp = false;
var highLamp = false;
if (this.currValue <= this._thresholdLower) {
lowLamp = true;
}
if (this.currValue >= this._thresholdUpper) {
highLamp = true;
}
var lamp = this.findSVGElement('lowLamp');
if (lamp) {
lamp.style.visibility = (valueIsNaN ? 'hidden' : 'visible');		// DTB585
lamp.setAttribute("fill",lowLamp ? this.lowLampColor : 'none');
}
var lamp = this.findSVGElement('highLamp');
if (lamp) {
lamp.style.visibility = (valueIsNaN ? 'hidden' : 'visible');		// DTB585
lamp.setAttribute("fill",highLamp ? this.highLampColor : 'none');
}
if (animate && (this.value*1 != this.currValue*1)) {
var speed = (this.value*1 - this.currValue*1) / 4;
this.currValue = this.currValue*1 + speed;
if (!valueIsNaN) {
this._timerId = window.setTimeout("{var w = zenPage.getComponent(" + this.index + ");if (w) w.updateNeedle(true);}",50);
}
}
}
self._ZEN_SVGComponent_speedometer__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_meter');
	_ZEN_SVGComponent_speedometer.prototype = zenCreate('_ZEN_SVGComponent_meter',-1);
	var p = _ZEN_SVGComponent_speedometer.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_speedometer;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_meter) ? zenMaster._ZEN_SVGComponent_meter.prototype:_ZEN_SVGComponent_meter.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.speedometer';
	p._type = 'speedometer';
	p.serialize = _ZEN_SVGComponent_speedometer_serialize;
	p.getSettings = _ZEN_SVGComponent_speedometer_getSettings;
	p.connectToController = _ZEN_SVGComponent_speedometer_connectToController;
	p.disconnectFromController = _ZEN_SVGComponent_speedometer_disconnectFromController;
	p.getController = _ZEN_SVGComponent_speedometer_getController;
	p.getNumericAbbreviation = _ZEN_SVGComponent_speedometer_getNumericAbbreviation;
	p.notifyView = _ZEN_SVGComponent_speedometer_notifyView;
	p.renderMeter = _ZEN_SVGComponent_speedometer_renderMeter;
	p.renderMeterBaroque = _ZEN_SVGComponent_speedometer_renderMeterBaroque;
	p.renderMeterStylized = _ZEN_SVGComponent_speedometer_renderMeterStylized;
	p.renderNeedle = _ZEN_SVGComponent_speedometer_renderNeedle;
	p.renderOdometer = _ZEN_SVGComponent_speedometer_renderOdometer;
	p.sendEventToController = _ZEN_SVGComponent_speedometer_sendEventToController;
	p.setControllerId = _ZEN_SVGComponent_speedometer_setControllerId;
	p.setProperty = _ZEN_SVGComponent_speedometer_setProperty;
	p.updateNeedle = _ZEN_SVGComponent_speedometer_updateNeedle;
}

self._zenClassIdx['svgCanvas'] = '_ZEN_SVGComponent_svgCanvas';
self._ZEN_SVGComponent_svgCanvas = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_svgCanvas__init(this,index,id);}
}

self._ZEN_SVGComponent_svgCanvas__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_svgFrame__init) ?zenMaster._ZEN_SVGComponent_svgFrame__init(o,index,id):_ZEN_SVGComponent_svgFrame__init(o,index,id);
	o.children = new Array();
	o.connectors = new Array();
	o.disabled = false;
	o.layout = '';
	o.rulerHeight = '11';
	o.rulerMajor = '100';
	o.rulerMinor = '25';
	o.rulerStyle = 'stroke:gray;';
	o.rulerWidth = '8.5';
	o.showRulers = false;
}
function _ZEN_SVGComponent_svgCanvas_serialize(set,s)
{
	var o = this;s[0]='1685211143';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.autoHeight;s[8]=o.autoWidth;s[9]=o.aux;s[10]=o.backgroundStyle;s[11]=set.serializeList(o,o.children,true,'children');s[12]=set.serializeList(o,o.connectors,true,'connectors');s[13]=o.containerStyle;s[14]=(o.disabled?1:0);s[15]=(o.dragCanvas?1:0);s[16]=(o.dragEnabled?1:0);s[17]=(o.dropEnabled?1:0);s[18]=(o.dynamic?1:0);s[19]=o.editMode;s[20]=o.enclosingClass;s[21]=o.enclosingStyle;s[22]=o.error;s[23]=o.frameStyle;s[24]=o.gridX;s[25]=o.gridY;s[26]=o.height;s[27]=(o.hidden?1:0);s[28]=o.hint;s[29]=o.hintClass;s[30]=o.hintStyle;s[31]=(o.inlineSVG?1:0);s[32]=o.label;s[33]=o.labelClass;s[34]=o.labelDisabledClass;s[35]=o.labelStyle;s[36]=o.layout;s[37]=o.offsetX;s[38]=o.offsetY;s[39]=o.onafterdrag;s[40]=o.onbeforedrag;s[41]=o.ondrag;s[42]=o.ondragCanvas;s[43]=o.ondrop;s[44]=o.onhide;s[45]=o.onmouseWheel;s[46]=o.onmoveItem;s[47]=o.onrefresh;s[48]=o.onresizeItem;s[49]=o.onselectItem;s[50]=o.onshow;s[51]=o.onupdate;s[52]=o.onzoom;s[53]=o.overlayMode;s[54]=set.serializeArray(o,o.parameters,true,'parameters');s[55]=o.renderFlag;s[56]=o.rulerHeight;s[57]=o.rulerMajor;s[58]=o.rulerMinor;s[59]=o.rulerStyle;s[60]=o.rulerWidth;s[61]=set.addObject(o.selectedItem,'selectedItem');s[62]=set.serializeList(o,o.selectedItems,true,'selectedItems');s[63]=(o.showLabel?1:0);s[64]=(o.showRulers?1:0);s[65]=o.slice;s[66]=(o.snapToGrid?1:0);s[67]=(o.svgAutoSize?1:0);s[68]=o.svgHeight;s[69]=o.svgPage;s[70]=o.svgWidth;s[71]=o.title;s[72]=o.tuple;s[73]=o.valign;s[74]=(o.visible?1:0);s[75]=o.width;s[76]=o.zoom;s[77]=o.zoomLevels;s[78]=(o.zoomWithWheel?1:0);
}
function _ZEN_SVGComponent_svgCanvas_getSettings(s)
{
	s['name'] = 'string';
	s['connectors'] = 'string';
	s['disabled'] = 'boolean';
	s['layout'] = 'enum:vertical,horizontal,flow,none';
	s['rulerHeight'] = 'float';
	s['rulerMajor'] = 'integer';
	s['rulerMinor'] = 'integer';
	s['rulerStyle'] = 'style';
	s['rulerWidth'] = 'float';
	s['showRulers'] = 'boolean';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_svgCanvas_addChild = function(component) {
zenASSERT(component && zenIsComponent(component),'Invalid component',arguments);
if (!component.isOfType('svgComponent')) {
alert('Only SVG components can be added to svg groups');
return;
}
this.children[this.children.length] = component;
component.parent = this;
if (this.document && this.svgGroup) {
component.renderSVG(this.document,this.svgGroup);
}
}

self._ZEN_SVGComponent_svgCanvas_canDragShapes = function() {
return true;
}

self._ZEN_SVGComponent_svgCanvas_createConnector = function(type) {
var connector = zenPage.createComponent(type);
if (connector) {
this.connectors[this.connectors.length] = connector;
connector.renderConnector(this);
}
return connector;
}

self._ZEN_SVGComponent_svgCanvas_createSprite = function(type,x,y) {
var sprite = zenPage.createComponent(type);
if (null != sprite) {
sprite.setProperty('x',x);
sprite.setProperty('y',y);
this.addChild(sprite);
}
return sprite;
}

self._ZEN_SVGComponent_svgCanvas_drawRulers = function() {
var group = this.rulerGroup;
if (!group) return;
while(null != group.firstChild) {
group.removeChild(group.firstChild);
}
if (!this.showRulers) return;
var gridWidth = parseFloat(this.rulerWidth);
var gridHeight = parseFloat(this.rulerHeight);
var gridMajor = parseInt(this.rulerMajor);
var gridMinor = parseInt(this.rulerMinor);
var rect = this.document.createElementNS(SVGNS,'rect');
rect.setAttribute('x',0);
rect.setAttribute('y',0);
rect.setAttribute('width',gridWidth*gridMajor);
rect.setAttribute('height',gridHeight*gridMajor);
rect.setAttribute('style','fill: none; stroke:black; stroke-width:0.5; stroke-dasharray:2,2;');
group.appendChild(rect);
for (var x = 0; x < gridWidth*gridMajor; x += gridMinor) {
var isMajor = (x%gridMajor == 0);
var line = this.document.createElementNS(SVGNS,'line');
line.setAttribute('x1',x);
line.setAttribute('x2',x);
line.setAttribute('y1',0);
line.setAttribute('y2',isMajor ? 20 :10);
line.setAttribute('style',this.rulerStyle);
group.appendChild(line);
}
for (var y = 0; y < gridHeight*gridMajor; y += gridMinor) {
var isMajor = (y%gridMajor == 0);
var line = this.document.createElementNS(SVGNS,'line');
line.setAttribute('x1',0);
line.setAttribute('x2',isMajor ? 20 :10);
line.setAttribute('y1',y);
line.setAttribute('y2',y);
line.setAttribute('style',this.rulerStyle);
group.appendChild(line);
}
}

self._ZEN_SVGComponent_svgCanvas_layoutChildren = function() {
var height = 0;
var width = 0;
switch(this.layout) {
case 'vertical':
var x=0,y=0;
for (var n = 0; n < this.children.length; n++) {
var child = this.children[n];
if ('relative' == child.position && !child.hidden) {
child.setPosition(x,y);
if (child.layoutChildren) {
child.layoutChildren();
}
y += parseInt(child.height,10);
width = (parseInt(child.width,10) > width) ? parseInt(child.width,10) : width;
}
}
height = y;
break;
case 'horizontal':
var x=0,y=0;
for (var n = 0; n < this.children.length; n++) {
var child = this.children[n];
if ('relative' == child.position && !child.hidden) {
child.setPosition(x,y);
if (child.layoutChildren) {
child.layoutChildren();
}
x += parseInt(child.width,10);
height = (parseInt(child.height,10) > height) ? parseInt(child.height,10) : height;
}
}
width = x;
break;
case 'flow':
var flowWidth = this.width;
var x=0,y=0;
for (var n = 0; n < this.children.length; n++) {
var child = this.children[n];
if ('relative' == child.position && !child.hidden) {
child.setPosition(x,y);
if (child.layoutChildren) {
child.layoutChildren();
}
var cw = parseInt(child.width,10);
if (x > 0 && (x+cw) > flowWidth) {
x = 0;
y = height;
child.setPosition(x,y);
if (child.layoutChildren) {
child.layoutChildren();
}
cw = parseInt(child.width,10);
}
x += cw;
height = ((y + parseInt(child.height,10)) > height) ? (y+parseInt(child.height,10)) : height;
width = (x > width) ? x : width;
}
}
break;
case 'none':
default:
for (var n = 0; n < this.children.length; n++) {
var child = this.children[n];
if ('relative' == child.position && !child.hidden) {
child.setPosition(child.x,child.y);
if (child.layoutChildren) {
child.layoutChildren();
}
width = ((parseInt(child.x,10)+parseInt(child.width,10)) > width) ? parseInt(child.width,10)+parseInt(child.x,10) : width;
height = ((parseInt(child.y,10)+parseInt(child.height,10)) > height) ? parseInt(child.height,10)+parseInt(child.y,10) : height;
}
}
break;
}
if (this.setBoundingBox) {
this.setBoundingBox(width, height);
}
}

self._ZEN_SVGComponent_svgCanvas_removeChild = function(component) {
zenPage.deleteComponent(component);
}

self._ZEN_SVGComponent_svgCanvas_renderSVG = function(document,parent) {
this.document = document;
if (null == parent) {
this.svgRoot = this.document.getElementById('zenRoot');
this.svgGroup = this.document.getElementById('zenCanvas');
var rect = this.document.createElementNS(SVGNS,'rect');
rect.setAttribute('id','zenBackground');
rect.setAttribute('x',0);
rect.setAttribute('y',0);
rect.setAttribute('width','100%');
rect.setAttribute('height','100%');
if (null != this.backgroundStyle) {
rect.setAttribute('style',this.backgroundStyle);
}
this.svgGroup.insertBefore(rect, this.svgGroup.firstChild);
this.svgBackground = rect;
}
else {
this.createEnclosingGroup(parent);
}
for (var n = 0; n < this.children.length; n++) {
var child = this.children[n];
child.renderSVG(this.document,this.svgGroup);
}
this.layoutChildren();
}

self._ZEN_SVGComponent_svgCanvas_setOverlayMode = function(mode) {
this.overlayMode = mode;
for (var n = 0; n < this.children.length; n++) {
this.children[n].setOverlayMode(mode);
}
}

self._ZEN_SVGComponent_svgCanvas_setProperty = function(property,value,value2) {
switch(property) {
case 'showRulers':
case 'rulerWidth':
case 'rulerHeight':
case 'rulerMinor':
case 'rulerMajor':
case 'rulerStyle':
this[property] = value;
this.drawRulers();
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_SVGComponent_svgCanvas_setPropertyAll = function(property,value,value2) {
if ('disabled' == property) return;
this.setProperty(property, value, value2);
for (var n = 0; n < this.children.length; n++) {
var child = this.children[n];
if (child.setPropertyAll) {
child.setPropertyAll(property,value,value2);
}
else {
child.setProperty(property,value,value2);
}
}
}

self._ZEN_SVGComponent_svgCanvas_svgLoadHandler = function(win) {
this.invokeSuper('svgLoadHandler',arguments);
var group = this.document.createElementNS(SVGNS,'g');
this.svgGroup.insertBefore(group, this.svgBackground.nextSibling);
this.rulerGroup = group;
this.drawRulers(group);
}

self._ZEN_SVGComponent_svgCanvas_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_SVGComponent_svgCanvas__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_svgFrame');
	_ZEN_SVGComponent_svgCanvas.prototype = zenCreate('_ZEN_SVGComponent_svgFrame',-1);
	var p = _ZEN_SVGComponent_svgCanvas.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_svgCanvas;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_svgFrame) ? zenMaster._ZEN_SVGComponent_svgFrame.prototype:_ZEN_SVGComponent_svgFrame.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.svgCanvas';
	p._type = 'svgCanvas';
	p.serialize = _ZEN_SVGComponent_svgCanvas_serialize;
	p.getSettings = _ZEN_SVGComponent_svgCanvas_getSettings;
	p.ReallyRefreshContents = _ZEN_SVGComponent_svgCanvas_ReallyRefreshContents;
	p.addChild = _ZEN_SVGComponent_svgCanvas_addChild;
	p.canDragShapes = _ZEN_SVGComponent_svgCanvas_canDragShapes;
	p.createConnector = _ZEN_SVGComponent_svgCanvas_createConnector;
	p.createSprite = _ZEN_SVGComponent_svgCanvas_createSprite;
	p.drawRulers = _ZEN_SVGComponent_svgCanvas_drawRulers;
	p.layoutChildren = _ZEN_SVGComponent_svgCanvas_layoutChildren;
	p.removeChild = _ZEN_SVGComponent_svgCanvas_removeChild;
	p.renderSVG = _ZEN_SVGComponent_svgCanvas_renderSVG;
	p.setOverlayMode = _ZEN_SVGComponent_svgCanvas_setOverlayMode;
	p.setProperty = _ZEN_SVGComponent_svgCanvas_setProperty;
	p.setPropertyAll = _ZEN_SVGComponent_svgCanvas_setPropertyAll;
	p.svgLoadHandler = _ZEN_SVGComponent_svgCanvas_svgLoadHandler;
}

self._zenClassIdx['swirlChart'] = '_ZEN_SVGComponent_swirlChart';
self._ZEN_SVGComponent_swirlChart = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_swirlChart__init(this,index,id);}
}

self._ZEN_SVGComponent_swirlChart__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_chart__init) ?zenMaster._ZEN_SVGComponent_chart__init(o,index,id):_ZEN_SVGComponent_chart__init(o,index,id);
	o.animate = 'auto';
	o.controller = '';
	o.controllerId = '';
	o.gap = '30';
	o.invert = false;
	o.legendVisible = 'false';
	o.ongetcontroller = '';
	o.onnotifyView = '';
	o.plotBy = 'items';
	o.scrollLeft = '0';
	o.separateSeriesScale = false;
}
function _ZEN_SVGComponent_swirlChart_serialize(set,s)
{
	var o = this;s[0]='2805449257';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.animate;s[7]=o.appearance;s[8]=(o.autoScaleText?1:0);s[9]=o.aux;s[10]=o.axisLineStyle;s[11]=o.axisTitleStyle;s[12]=o.backgroundStyle;s[13]=o.bandLower;s[14]=o.bandLowerStyle;s[15]=o.bandUpper;s[16]=o.bandUpperStyle;s[17]=o.baseLineStyle;s[18]=o.borderOffset;s[19]=o.borderRadius;s[20]=o.borderStyle;s[21]=(o.boundless?1:0);s[22]=o.controller;s[23]=o.controllerId;s[24]=o.currMultiple;s[25]=o.currYAxis;s[26]=o.endTime;s[27]=o.gap;s[28]=o.gridStyle;s[29]=(o.hasZoom?1:0);s[30]=o.height;s[31]=(o.hidden?1:0);s[32]=o.hzZoomStep;s[33]=o.indicatorStyle;s[34]=(o.indicatorsVisible?1:0);s[35]=(o.invert?1:0);s[36]=o.labelStyle;s[37]=(o.labelsVisible?1:0);s[38]=o.legendHeight;s[39]=o.legendLabelStyle;s[40]=o.legendRectStyle;s[41]=o.legendStyle;s[42]=o.legendTitle;s[43]=o.legendVisible;s[44]=o.legendWidth;s[45]=o.legendX;s[46]=o.legendY;s[47]=o.lineStyle;s[48]=o.marginBottom;s[49]=o.marginLeft;s[50]=o.marginRight;s[51]=o.marginTop;s[52]=o.markerScale;s[53]=o.markerShapes;s[54]=o.markerStyle;s[55]=(o.markersVisible?1:0);s[56]=o.maxLabelLen;s[57]=o.msgIfNoData;s[58]=o.multipleTitleStyle;s[59]=o.noDataFill;s[60]=o.noDataOpacity;s[61]=o.noDataStroke;s[62]=o.onclick;s[63]=o.onelementClick;s[64]=o.ongetData;s[65]=o.ongetLabelX;s[66]=o.ongetLabelY;s[67]=o.ongetSeriesColor;s[68]=o.ongetTimeEvents;s[69]=o.ongetcontroller;s[70]=o.onnotifyView;s[71]=o.onrenderData;s[72]=o.onrenderPlotArea;s[73]=o.onshowTooltip;s[74]=o.onupdate;s[75]=o.plotAreaStyle;s[76]=o.plotBy;s[77]=o.plotEdgeStyle;s[78]=o.plotStyle;s[79]=(o.plotToEdge?1:0);s[80]=o.position;s[81]=o.preserveAspectRatio;s[82]=o.renderFlag;s[83]=o.scrollButtonStyle;s[84]=o.scrollLeft;s[85]=o.selectedItem;s[86]=o.selectedItemStyle;s[87]=o.selectedSeries;s[88]=(o.separateSeriesScale?1:0);s[89]=o.seriesColorScheme;s[90]=o.seriesColors;s[91]=o.seriesColorsOverride;s[92]=o.seriesCount;s[93]=o.seriesNames;s[94]=o.seriesNumber;s[95]=o.seriesSize;s[96]=o.seriesYAxes;s[97]=(o.showMultiples?1:0);s[98]=o.startTime;s[99]=o.stripeStyle;s[100]=(o.stripesVisible?1:0);s[101]=o.subtitle;s[102]=o.subtitleStyle;s[103]=o.tag;s[104]=o.textSize;s[105]=(o.timeBased?1:0);s[106]=o.title;s[107]=o.titleAlign;s[108]=o.titleBoxStyle;s[109]=o.titleImage;s[110]=o.titleImageStyle;s[111]=o.titleStyle;s[112]=o.titleX;s[113]=o.titleY;s[114]=o.tooltipRectStyle;s[115]=o.tuple;s[116]=o.unselectedItemStyle;s[117]=o.valueBoxStyle;s[118]=o.valueLabelFormat;s[119]=o.valueLabelStyle;s[120]=(o.valueLabelsVisible?1:0);s[121]=o.viewBoxHeight;s[122]=o.viewBoxWidth;s[123]=(o.visible?1:0);s[124]=(o.warnIfNoData?1:0);s[125]=o.width;s[126]=o.x;s[127]=set.addObject(o.xAxis,'xAxis');s[128]=o.y;s[129]=set.addObject(o.yAxis,'yAxis');s[130]=set.serializeList(o,o.yAxisList,true,'yAxisList');
}
function _ZEN_SVGComponent_swirlChart_getSettings(s)
{
	s['name'] = 'string';
	s['animate'] = 'enum:none,auto,manual';
	s['controllerId'] = 'id';
	s['gap'] = 'integer';
	s['invert'] = 'boolean';
	s['legendVisible'] = 'enum:auto,false,true';
	s['ongetcontroller'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	s['plotBy'] = 'enum:items,series';
	s['separateSeriesScale'] = 'boolean';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_swirlChart_connectToController = function() {
this.controller = '';
if (!zenIsMissing(this.controllerId)) {
if (this.composite) {
this.controller = this.composite.getChildById(this.controllerId);
}
else {
this.controller = zenPage.getComponentById(this.controllerId);
}
if (this.controller && this.controller.register) {
this.controller.register(this);
}
else {
alert('ZEN: Unable to connect component to dataController (' + this.id + ').');
}
if (this.controller) {
if ('' == this.controller.modelError) {
this.controller.loadModel(false);
}
}
}
}

self._ZEN_SVGComponent_swirlChart_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._ZEN_SVGComponent_swirlChart_getChartElementStyle = function(series,item) {
if (this.plotBy=='series') {
var clr = this.getSeriesColor(series);
var style = 'stroke-width: 0.25px; stroke: '+clr+'; stroke-opacity: ' + ((series%2) ? '1.0' : '0.85') + '; ';
style = style + 'fill: '+clr+'; ';
} else if (this.plotBy=='items') {
var clr = this.getSeriesColor(item);
var style = 'stroke-width: 0.25px; stroke: '+clr+'; stroke-opacity: ' + ((series%2) ? '1.0' : '0.85') + '; ';
style = style + 'fill: '+clr+'; fill-opacity: '+ ((series%2) ? '0.80' : '0.60') + '; ';
}
return  style + ' ' + this.plotStyle;
}

self._ZEN_SVGComponent_swirlChart_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._ZEN_SVGComponent_swirlChart_getLegendLabels = function() {
if (this.plotBy == 'series') {
return this.getSeriesNames();
} else {
var legends = [];
for (i=0; i < this.seriesSize; i++) {
legends[i] = this.getXLabelText(i);
}
return legends;
}
}

self._ZEN_SVGComponent_swirlChart_getLegendsCount = function(legends) {
var scount = legends.length;
var seriesNumber = parseInt(this.seriesNumber);
if (!isNaN(seriesNumber)) {
scount = 1;
}
return (this.plotBy == 'series' ? scount : this.seriesSize);
}

self._ZEN_SVGComponent_swirlChart_getSeriesNamesSize = function() {
return (this.plotBy == 'series' ? this.seriesCount : this.seriesSize)
}

self._ZEN_SVGComponent_swirlChart_getYLabelText = function(val,yAxisNo,base) {
return this.getXLabelText(val,base);
}

self._ZEN_SVGComponent_swirlChart_hasAxes = function() {
return false;
}

self._ZEN_SVGComponent_swirlChart_hasMultiples = function() {
return false;
}

self._ZEN_SVGComponent_swirlChart_is3D = function() {
return false;
}

self._ZEN_SVGComponent_swirlChart_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_swirlChart_renderSeries = function(group) {
try {
if (this.gap < 0) {
this.gap = 0;
}
if (this.gap > 135) {
this.gap = 135;
}
var scaleX = this._scaleX ? this._scaleX : 1;
var scaleY = this._scaleY ? this._scaleY : 1;
var pw = this._plotWidth; var ph = this._plotHeight;
var scaleR = (pw < ph) ? scaleX : scaleY;
var seriesCount = this.getSeriesCount();
if (this._dataSeries) { seriesCount = Math.min(seriesCount, this._dataSeries.length); }
var seriesSize = this.getSeriesSize();
if (this._dataSeries && (this._dataSeries.length>0) && this._dataSeries[0]) { seriesSize = Math.min(seriesSize, this._dataSeries[0].length); }
var seriesNames = this.getSeriesNames();
var labels = []; var labelValues = [];
var maxLabelWidth = 0;
for (var i = 0; i<seriesSize; i++) {
var text = this.document.createElementNS(SVGNS,"text");
group.appendChild(text);
labels[i] = text;
text.setAttribute("id", this.makeId("lbl_"+i));
try {
labelValues[i] = this.getXLabelText(i);
} catch (ex) {
labelValues[i] = "[undefined]";
}
var textNode = this.document.createTextNode(labelValues[i]);
text.appendChild(textNode);
var title = this.document.createElementNS(SVGNS,"title")
text.appendChild(title);
title.appendChild(this.document.createTextNode(labelValues[i]));
var style = this.labelStyle + " pointer-events: visiblePainted;"
text.setAttribute("style", style);
text.setAttribute("class","chart-valueLabel");
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementClickHandler(evt,0,'+i+');');
text.addEventListener('click',f,false);
var labelWidth = zenGetBBox(text).width/scaleX;
if (labelWidth > maxLabelWidth) { maxLabelWidth = labelWidth; }
}
var rotationStep = Math.round((360 - parseInt(this.gap)) / seriesSize);
var cx = pw*0.5; var cy = ph*0.5;
var cxs = (Math.round(cx*scaleX*1000)/1000);
var cys = (Math.round(cy*scaleY*1000)/1000);
var cxy = cxs+','+cys;
var outerRadius = ((pw < ph) ? pw : ph) * 0.41;
var smallMode = !this.labelsVisible;
if (!smallMode) {
if (this.invert) {
var innerRadius = (outerRadius - maxLabelWidth);
smallMode = (innerRadius < (outerRadius * 0.4))
} else {
var innerRadius = maxLabelWidth * 1.2;
smallMode = (innerRadius > (outerRadius * 0.9))
}
}
if (smallMode) { innerRadius = outerRadius * 0.05; }
/* debug
var inner = this.document.createElementNS(SVGNS,"circle");
group.appendChild(inner);
inner.setAttribute("cx",cxs);
inner.setAttribute("cy",cys);
inner.setAttribute("r",innerRadius*scaleX);
inner.setAttribute("stroke","grey");
inner.setAttribute("fill", "none");
var outer = this.document.createElementNS(SVGNS,"circle");
group.appendChild(outer);
outer.setAttribute("cx",cxs);
outer.setAttribute("cy",cys);
outer.setAttribute("r",outerRadius*scaleX);
outer.setAttribute("stroke","black");
outer.setAttribute("fill", "none");
var line = this.document.createElementNS(SVGNS,"line");
group.appendChild(line);
line.setAttribute("x1",cxs);
line.setAttribute("y1",cys);
line.setAttribute("x2",cxs);
line.setAttribute("y2",(cy-outerRadius)*scaleY);
line.setAttribute("stroke","red");*/
var maxValues = []; var maxValue = 0;
for (var i = 0; i < seriesCount; i++) {
maxValues[i]=0;
for (var j = 0; j < seriesSize; j++) {
var v = parseFloat(this._dataSeries[i][j]);
if (isNaN(v)) continue;
if (this.separateSeriesScale) {
if (v > maxValues[i]) { maxValues[i] = v; }
} else {
if (v > maxValue) { maxValue = v; }
}
}
}
delete this._animated;
this._animated = [];
var diffRadius = this.invert ? (innerRadius*0.9) : (outerRadius-innerRadius);
var angle = (Math.PI * 2 * (360 - parseFloat(this.gap)) / 360) / (seriesCount * seriesSize * 1.1);
var angleCos = Math.cos(angle); var angleSin = Math.sin(angle);
var rotationSubStep = (rotationStep*0.90) / seriesCount;
var startAngle = -90-(0.45*rotationStep);
for (var ino = 0; ino < seriesSize; ino++) {
if (smallMode) {
group.removeChild(labels[ino]);
} else {
var th = zenGetBBox(labels[ino]).height/scaleY;
var tx = cx + innerRadius;
var ty = cy + (th/5);
labels[ino].setAttribute("x", tx*scaleX);
labels[ino].setAttribute("y", ty*scaleY)
var angle = (ino*rotationStep-90)
labels[ino].setAttribute("transform", 'rotate('+((this.animate=="none")?angle:-90)+' '+cxy+')');
labels[ino].setAttribute("text-anchor", this.invert ? 'start' : 'end');
if (this.animate != 'none') {
this.setAnimation(labels[ino],100,-90, angle, cxy);
}
}
for (var sno = 0; sno < seriesCount; sno++) {
var value = parseFloat(this._dataSeries[sno][ino]);
if (isNaN(value) || (value == 0)) continue;
var pct = this.separateSeriesScale ? (value / maxValues[sno]) : (value / maxValue);
var slice = this.document.createElementNS(SVGNS,"path");
group.appendChild(slice);
slice.setAttribute("id", this.makeId("el_"+sno+"_"+ino));
if (this.invert && !smallMode) {
var rad1 = ((innerRadius*0.4)+((1-pct)*(0.54*innerRadius)))*scaleX;
var rad2 = innerRadius*0.95 * scaleX;
} else {
var rad1 = innerRadius*1.05 * scaleX;
var rad2 = ((innerRadius*1.05) + ((outerRadius-(innerRadius*1.05))*pct)) * scaleX;
}
var p1 = (cxs+rad1)+','+cys;
var p2 = (cxs+rad2)+','+cys;
var p3 = (cxs+(angleCos*rad2))+','+(cys+(angleSin*rad2));
var p4 = (cxs+(angleCos*rad1))+','+(cys+(angleSin*rad1));
slice.setAttribute("d", 'M '+p1+' L'+p2+' A'+rad2+','+rad2+' 0 0,1 '+p3+' L'+p4+' A'+rad1+','+rad1+' 0 0,0 '+p1+' z');
var style =  this.getChartElementStyle(sno, ino);
if (sno == this.selectedSeries && ino == this.selectedItem) {
style += this.selectedItemStyle;
}
slice.setAttribute("style", style);
angle = startAngle + (ino*rotationStep) + (sno*rotationSubStep);
slice.setAttribute("transform", 'rotate('+((this.animate == "none") ? angle : startAngle)+' '+cxy+')');
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementClickHandler(evt,'+sno+','+ino+');');
slice.addEventListener('click',f,false);
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementMouseOver(evt,'+sno+','+ino+');');
slice.addEventListener('mouseover',f,false);
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementMouseOut(evt,'+sno+','+ino+');');
slice.addEventListener('mouseout',f,false);
/*// show tooltip with series name and formatted value
var fValue = value;
if (!isNaN(value)) {
var format = this.valueLabelFormat;
format = format ? format : ((Math.floor(value)!=value)?'#,#.##':'#,#');
fValue = zenFormatNumber(value,format);
}
if ((seriesNames!=null) && (seriesNames.length>sno)) {
fValue = seriesNames[sno] + ': ' + fValue;
}
var title = this.document.createElementNS(SVGNS,"title")
slice.appendChild(title);
title.appendChild(this.document.createTextNode(fValue));*/
if (smallMode) {
var title = this.document.createElementNS(SVGNS,"title")
slice.appendChild(title);
title.appendChild(this.document.createTextNode(labelValues[i]));
}
if (this.animate != 'none') {
this.setAnimation(slice,100,startAngle, angle, cxy);
}
}
}
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in termSwirl.renderSeries');
}
}

self._ZEN_SVGComponent_swirlChart_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_swirlChart_setAnimation = function(label,steps,from,to,center) {
var delta = (to - from)/steps;
var timerNo = window.setInterval(function	() {
try {
from += delta;
if (from >= to) {
window.clearInterval(timerNo);
from = to;
}
label.setAttribute("transform","rotate("+from+" "+center+")");
} catch(err) {
alert(err.message);
}
}, 1);
}

self._ZEN_SVGComponent_swirlChart_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._ZEN_SVGComponent_swirlChart_setProperty = function(property,value,value2) {
switch(property) {
case 'invert':
case 'separateSeriesScale':
this[property] = value ? true : false;
this.render();
break;
case 'gap':
if (value < 0) {
alert(value+$$$Text(" is too small for gap whose minimum is 0"));
value = 0;
}
if (value > 135) {
alert(value+$$$Text(" is too large for gap whose maximum is 135"));
value = 135;
}
this[property] = value;
this.render();
break;
case 'animation':
this[property] = value;
this.render();
break;
case 'plotBy':
this[property] = value;
this.render();
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}
self._ZEN_SVGComponent_swirlChart__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_chart');
	_ZEN_SVGComponent_swirlChart.prototype = zenCreate('_ZEN_SVGComponent_chart',-1);
	var p = _ZEN_SVGComponent_swirlChart.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_swirlChart;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_chart) ? zenMaster._ZEN_SVGComponent_chart.prototype:_ZEN_SVGComponent_chart.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.swirlChart';
	p._type = 'swirlChart';
	p.serialize = _ZEN_SVGComponent_swirlChart_serialize;
	p.getSettings = _ZEN_SVGComponent_swirlChart_getSettings;
	p.connectToController = _ZEN_SVGComponent_swirlChart_connectToController;
	p.disconnectFromController = _ZEN_SVGComponent_swirlChart_disconnectFromController;
	p.getChartElementStyle = _ZEN_SVGComponent_swirlChart_getChartElementStyle;
	p.getController = _ZEN_SVGComponent_swirlChart_getController;
	p.getLegendLabels = _ZEN_SVGComponent_swirlChart_getLegendLabels;
	p.getLegendsCount = _ZEN_SVGComponent_swirlChart_getLegendsCount;
	p.getSeriesNamesSize = _ZEN_SVGComponent_swirlChart_getSeriesNamesSize;
	p.getYLabelText = _ZEN_SVGComponent_swirlChart_getYLabelText;
	p.hasAxes = _ZEN_SVGComponent_swirlChart_hasAxes;
	p.hasMultiples = _ZEN_SVGComponent_swirlChart_hasMultiples;
	p.is3D = _ZEN_SVGComponent_swirlChart_is3D;
	p.notifyView = _ZEN_SVGComponent_swirlChart_notifyView;
	p.renderSeries = _ZEN_SVGComponent_swirlChart_renderSeries;
	p.sendEventToController = _ZEN_SVGComponent_swirlChart_sendEventToController;
	p.setAnimation = _ZEN_SVGComponent_swirlChart_setAnimation;
	p.setControllerId = _ZEN_SVGComponent_swirlChart_setControllerId;
	p.setProperty = _ZEN_SVGComponent_swirlChart_setProperty;
}

self._zenClassIdx['textMeter'] = '_ZEN_SVGComponent_textMeter';
self._ZEN_SVGComponent_textMeter = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_textMeter__init(this,index,id);}
}

self._ZEN_SVGComponent_textMeter__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_meter__init) ?zenMaster._ZEN_SVGComponent_meter__init(o,index,id):_ZEN_SVGComponent_meter__init(o,index,id);
	o.backgroundStyle = '';
	o.controller = '';
	o.controllerId = '';
	o.format = '';
	o.highStyle = 'fill: #404080;';
	o.lowStyle = 'fill: #804040;';
	o.normalStyle = 'fill: #404040;';
	o.ongetcontroller = '';
	o.onnotifyView = '';
	o.viewBoxHeight = '25';
}
function _ZEN_SVGComponent_textMeter_serialize(set,s)
{
	var o = this;s[0]='4063758932';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=(o.animate?1:0);s[7]=o.aux;s[8]=o.backgroundStyle;s[9]=(o.boundless?1:0);s[10]=o.controller;s[11]=o.controllerId;s[12]=o.dataBinding;s[13]=(o.disabled?1:0);s[14]=o.format;s[15]=o.height;s[16]=(o.hidden?1:0);s[17]=o.highStyle;s[18]=o.label;s[19]=o.labelStyle;s[20]=o.lowStyle;s[21]=o.normalStyle;s[22]=o.onchange;s[23]=o.onclick;s[24]=o.ongetcontroller;s[25]=o.onnotifyView;s[26]=o.onupdate;s[27]=o.position;s[28]=o.preserveAspectRatio;s[29]=o.rangeLower;s[30]=o.rangeUpper;s[31]=o.renderFlag;s[32]=o.scaleFactor;s[33]=(o.showConditionally?1:0);s[34]=o.targetValue;s[35]=o.thresholdLower;s[36]=o.thresholdUpper;s[37]=o.tuple;s[38]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[39]=o.viewBoxHeight;s[40]=o.viewBoxWidth;s[41]=(o.visible?1:0);s[42]=o.width;s[43]=o.x;s[44]=o.y;
}
function _ZEN_SVGComponent_textMeter_getSettings(s)
{
	s['name'] = 'string';
	s['backgroundStyle'] = 'svgStyle';
	s['controllerId'] = 'id';
	s['format'] = 'string';
	s['highStyle'] = 'svgStyle';
	s['lowStyle'] = 'svgStyle';
	s['normalStyle'] = 'svgStyle';
	s['ongetcontroller'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_textMeter_connectToController = function() {
this.controller = '';
if (!zenIsMissing(this.controllerId)) {
if (this.composite) {
this.controller = this.composite.getChildById(this.controllerId);
}
else {
this.controller = zenPage.getComponentById(this.controllerId);
}
if (this.controller && this.controller.register) {
this.controller.register(this);
}
else {
alert('ZEN: Unable to connect component to dataController (' + this.id + ').');
}
if (this.controller) {
if ('' == this.controller.modelError) {
this.controller.loadModel(false);
}
}
}
}

self._ZEN_SVGComponent_textMeter_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._ZEN_SVGComponent_textMeter_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._ZEN_SVGComponent_textMeter_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_textMeter_renderMeter = function() {
this.unrender();
var body = this.document.createElementNS(SVGNS,'rect');
body.setAttribute('class','textMeter-body');
body.setAttribute('style',this.backgroundStyle);
body.setAttribute('x',5);
body.setAttribute('y',5);
body.setAttribute('width',90);
body.setAttribute('height',20);
body.setAttribute('rx',2);
this.svgGroup.appendChild(body);
var label = this.document.createElementNS(SVGNS,'text');
label.setAttribute('id',this.makeId('text'));
label.setAttribute('class','textMeter-text');
label.setAttribute('style',this.normalStyle);
label.setAttribute('x',50);
label.setAttribute('y',22.5);
label.setAttribute('text-anchor','middle');
var textNode = this.document.createTextNode('');
label.appendChild(textNode);
this.svgGroup.appendChild(label);
var label = this.document.createElementNS(SVGNS,'text');
label.setAttribute('id',this.makeId('label'));
label.setAttribute('class','textMeter-label');
label.setAttribute('style',this.labelStyle);
label.setAttribute('x',50);
label.setAttribute('y',12);
label.setAttribute('text-anchor','middle');
var textNode = this.document.createTextNode(this.getLabelText());
label.appendChild(textNode);
this.svgGroup.appendChild(label);
this.updateMeter();
}

self._ZEN_SVGComponent_textMeter_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_textMeter_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._ZEN_SVGComponent_textMeter_setProperty = function(property,value,value2) {
switch(property) {
case 'labelStyle':
case 'backgroundStyle':
this[property] = value;
this.render();
break;
case 'value':
this.value = value;
this.updateMeter();
break;
case 'format':
case 'lowStyle':
case 'highStyle':
case 'normalStyle':
this[property] = value;
this.updateMeter();
break;
case 'width':
case 'height':
return this.invokeSuper('setProperty',arguments);
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_SVGComponent_textMeter_updateMeter = function() {
var tlower = parseFloat(this._thresholdLower);
var tupper = parseFloat(this._thresholdUpper);
var style = this.normalStyle;
var value = parseFloat(this.value);
if (parseFloat(this._rangeUpper) >= parseFloat(this._rangeLower)) {
if (value <= tlower) {
style += this.lowStyle;
}
else if (value >= tupper) {
style += this.highStyle;
}
}
else {
if (value <= tupper) {
style += this.lowStyle;
}
else if (value >= tlower) {
style += this.highStyle;
}
}
var text = this.findSVGElement("text");
text.setAttribute("style", style);
var value = this.value;
if ('' !== this.format) {
value = zenFormatNumber(value,this.format);
}
this.setTextNode("text",value);
}
self._ZEN_SVGComponent_textMeter__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_meter');
	_ZEN_SVGComponent_textMeter.prototype = zenCreate('_ZEN_SVGComponent_meter',-1);
	var p = _ZEN_SVGComponent_textMeter.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_textMeter;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_meter) ? zenMaster._ZEN_SVGComponent_meter.prototype:_ZEN_SVGComponent_meter.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.textMeter';
	p._type = 'textMeter';
	p.serialize = _ZEN_SVGComponent_textMeter_serialize;
	p.getSettings = _ZEN_SVGComponent_textMeter_getSettings;
	p.connectToController = _ZEN_SVGComponent_textMeter_connectToController;
	p.disconnectFromController = _ZEN_SVGComponent_textMeter_disconnectFromController;
	p.getController = _ZEN_SVGComponent_textMeter_getController;
	p.notifyView = _ZEN_SVGComponent_textMeter_notifyView;
	p.renderMeter = _ZEN_SVGComponent_textMeter_renderMeter;
	p.sendEventToController = _ZEN_SVGComponent_textMeter_sendEventToController;
	p.setControllerId = _ZEN_SVGComponent_textMeter_setControllerId;
	p.setProperty = _ZEN_SVGComponent_textMeter_setProperty;
	p.updateMeter = _ZEN_SVGComponent_textMeter_updateMeter;
}

self._zenClassIdx['trafficLight'] = '_ZEN_SVGComponent_trafficLight';
self._ZEN_SVGComponent_trafficLight = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_trafficLight__init(this,index,id);}
}

self._ZEN_SVGComponent_trafficLight__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_meter__init) ?zenMaster._ZEN_SVGComponent_meter__init(o,index,id):_ZEN_SVGComponent_meter__init(o,index,id);
	o.controller = '';
	o.controllerId = '';
	o.ongetcontroller = '';
	o.onnotifyView = '';
	o.outerBodyStyle = '';
	o.viewBoxWidth = '50';
}
function _ZEN_SVGComponent_trafficLight_serialize(set,s)
{
	var o = this;s[0]='3627040886';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=(o.animate?1:0);s[7]=o.aux;s[8]=(o.boundless?1:0);s[9]=o.controller;s[10]=o.controllerId;s[11]=o.dataBinding;s[12]=(o.disabled?1:0);s[13]=o.height;s[14]=(o.hidden?1:0);s[15]=o.label;s[16]=o.labelStyle;s[17]=o.onchange;s[18]=o.onclick;s[19]=o.ongetcontroller;s[20]=o.onnotifyView;s[21]=o.onupdate;s[22]=o.outerBodyStyle;s[23]=o.position;s[24]=o.preserveAspectRatio;s[25]=o.rangeLower;s[26]=o.rangeUpper;s[27]=o.renderFlag;s[28]=o.scaleFactor;s[29]=(o.showConditionally?1:0);s[30]=o.targetValue;s[31]=o.thresholdLower;s[32]=o.thresholdUpper;s[33]=o.tuple;s[34]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[35]=o.viewBoxHeight;s[36]=o.viewBoxWidth;s[37]=(o.visible?1:0);s[38]=o.width;s[39]=o.x;s[40]=o.y;
}
function _ZEN_SVGComponent_trafficLight_getSettings(s)
{
	s['name'] = 'string';
	s['controllerId'] = 'id';
	s['ongetcontroller'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	s['outerBodyStyle'] = 'style';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_trafficLight_connectToController = function() {
this.controller = '';
if (!zenIsMissing(this.controllerId)) {
if (this.composite) {
this.controller = this.composite.getChildById(this.controllerId);
}
else {
this.controller = zenPage.getComponentById(this.controllerId);
}
if (this.controller && this.controller.register) {
this.controller.register(this);
}
else {
alert('ZEN: Unable to connect component to dataController (' + this.id + ').');
}
if (this.controller) {
if ('' == this.controller.modelError) {
this.controller.loadModel(false);
}
}
}
}

self._ZEN_SVGComponent_trafficLight_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._ZEN_SVGComponent_trafficLight_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._ZEN_SVGComponent_trafficLight_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_trafficLight_renderMeter = function() {
var body = this.document.createElementNS(SVGNS,'rect');
body.setAttribute('class','trafficLight-body');
body.setAttribute('fill','url(#trafficLight-bodyGrad)');
body.setAttribute('style',this.outerBodyStyle);
body.setAttribute('x',10);
body.setAttribute('y',8);
body.setAttribute('width',30);
body.setAttribute('height',74);
body.setAttribute('rx',5);
this.svgGroup.appendChild(body);
var lamp = this.document.createElementNS(SVGNS,'circle');
lamp.setAttribute('id',this.makeId('redLamp'));
lamp.setAttribute('class','trafficLight-lamp');
lamp.setAttribute('fill','#200000');
lamp.setAttribute('cx',25);
lamp.setAttribute('cy',22);
lamp.setAttribute('r',10);
this.svgGroup.appendChild(lamp);
var lamp = this.document.createElementNS(SVGNS,'circle');
lamp.setAttribute('id',this.makeId('yellowLamp'));
lamp.setAttribute('class','trafficLight-lamp');
lamp.setAttribute('fill','#202000');
lamp.setAttribute('cx',25);
lamp.setAttribute('cy',45);
lamp.setAttribute('r',10);
this.svgGroup.appendChild(lamp);
var lamp = this.document.createElementNS(SVGNS,'circle');
lamp.setAttribute('id',this.makeId('greenLamp'));
lamp.setAttribute('class','trafficLight-lamp');
lamp.setAttribute('fill','#002000');
lamp.setAttribute('cx',25);
lamp.setAttribute('cy',68);
lamp.setAttribute('r',10);
this.svgGroup.appendChild(lamp);
this.renderLabel(25,95);
this.updateLamps();
}

self._ZEN_SVGComponent_trafficLight_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_trafficLight_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._ZEN_SVGComponent_trafficLight_setProperty = function(property,value,value2) {
switch(property) {
case 'outerBodyStyle':
this[property] = value;
this.unrender();
this.render();
break;
case 'value':
this.value = value;
this.updateLamps();
break;
case 'width':
case 'height':
return this.invokeSuper('setProperty',arguments);
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_SVGComponent_trafficLight_updateLamps = function() {
var redState = false;
var greenState = false;
var yellowState = false;
if (parseFloat(this.rangeUpper) >=parseFloat( this.rangeLower)) {
if (parseFloat(this.value) <= parseFloat(this.thresholdLower)) {
greenState = true;
}
else if (parseFloat(this.value) >= parseFloat(this.thresholdUpper)) {
redState = true;
}
else {
yellowState = true;
}
}
else {
if (parseFloat(this.value) <= parseFloat(this.thresholdLower)) {
redState = true;
}
else if (parseFloat(this.value) >= (this.thresholdUpper)) {
greenState = true;
}
else {
yellowState = true;
}
}
var redLamp = this.findSVGElement("redLamp");
var greenLamp = this.findSVGElement("greenLamp");
var yellowLamp = this.findSVGElement("yellowLamp");
redLamp.setAttribute("fill",redState ? "url(#glow-red)" : "#200000");
greenLamp.setAttribute("fill",greenState ? "url(#glow-green)" : "#002000");
yellowLamp.setAttribute("fill",yellowState ? "url(#glow-yellow)" : "#202000");
}
self._ZEN_SVGComponent_trafficLight__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_meter');
	_ZEN_SVGComponent_trafficLight.prototype = zenCreate('_ZEN_SVGComponent_meter',-1);
	var p = _ZEN_SVGComponent_trafficLight.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_trafficLight;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_meter) ? zenMaster._ZEN_SVGComponent_meter.prototype:_ZEN_SVGComponent_meter.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.trafficLight';
	p._type = 'trafficLight';
	p.serialize = _ZEN_SVGComponent_trafficLight_serialize;
	p.getSettings = _ZEN_SVGComponent_trafficLight_getSettings;
	p.connectToController = _ZEN_SVGComponent_trafficLight_connectToController;
	p.disconnectFromController = _ZEN_SVGComponent_trafficLight_disconnectFromController;
	p.getController = _ZEN_SVGComponent_trafficLight_getController;
	p.notifyView = _ZEN_SVGComponent_trafficLight_notifyView;
	p.renderMeter = _ZEN_SVGComponent_trafficLight_renderMeter;
	p.sendEventToController = _ZEN_SVGComponent_trafficLight_sendEventToController;
	p.setControllerId = _ZEN_SVGComponent_trafficLight_setControllerId;
	p.setProperty = _ZEN_SVGComponent_trafficLight_setProperty;
	p.updateLamps = _ZEN_SVGComponent_trafficLight_updateLamps;
}

self._zenClassIdx['treeMapChart'] = '_ZEN_SVGComponent_treeMapChart';
self._ZEN_SVGComponent_treeMapChart = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_treeMapChart__init(this,index,id);}
}

self._ZEN_SVGComponent_treeMapChart__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_chart__init) ?zenMaster._ZEN_SVGComponent_chart__init(o,index,id):_ZEN_SVGComponent_chart__init(o,index,id);
	o.controller = '';
	o.controllerId = '';
	o.ongetColorScaleData = '';
	o.ongetcontroller = '';
	o.onnotifyView = '';
	o.scrollLeft = '0';
	o.showPercentage = true;
}
function _ZEN_SVGComponent_treeMapChart_serialize(set,s)
{
	var o = this;s[0]='4293693679';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.appearance;s[7]=(o.autoScaleText?1:0);s[8]=o.aux;s[9]=o.axisLineStyle;s[10]=o.axisTitleStyle;s[11]=o.backgroundStyle;s[12]=o.bandLower;s[13]=o.bandLowerStyle;s[14]=o.bandUpper;s[15]=o.bandUpperStyle;s[16]=o.baseLineStyle;s[17]=o.borderOffset;s[18]=o.borderRadius;s[19]=o.borderStyle;s[20]=(o.boundless?1:0);s[21]=o.controller;s[22]=o.controllerId;s[23]=o.currMultiple;s[24]=o.currYAxis;s[25]=o.endTime;s[26]=o.gridStyle;s[27]=(o.hasZoom?1:0);s[28]=o.height;s[29]=(o.hidden?1:0);s[30]=o.hzZoomStep;s[31]=o.indicatorStyle;s[32]=(o.indicatorsVisible?1:0);s[33]=o.labelStyle;s[34]=(o.labelsVisible?1:0);s[35]=o.legendHeight;s[36]=o.legendLabelStyle;s[37]=o.legendRectStyle;s[38]=o.legendStyle;s[39]=o.legendTitle;s[40]=o.legendVisible;s[41]=o.legendWidth;s[42]=o.legendX;s[43]=o.legendY;s[44]=o.lineStyle;s[45]=o.marginBottom;s[46]=o.marginLeft;s[47]=o.marginRight;s[48]=o.marginTop;s[49]=o.markerScale;s[50]=o.markerShapes;s[51]=o.markerStyle;s[52]=(o.markersVisible?1:0);s[53]=o.maxLabelLen;s[54]=o.msgIfNoData;s[55]=o.multipleTitleStyle;s[56]=o.noDataFill;s[57]=o.noDataOpacity;s[58]=o.noDataStroke;s[59]=o.onclick;s[60]=o.onelementClick;s[61]=o.ongetColorScaleData;s[62]=o.ongetData;s[63]=o.ongetLabelX;s[64]=o.ongetLabelY;s[65]=o.ongetSeriesColor;s[66]=o.ongetTimeEvents;s[67]=o.ongetcontroller;s[68]=o.onnotifyView;s[69]=o.onrenderData;s[70]=o.onrenderPlotArea;s[71]=o.onshowTooltip;s[72]=o.onupdate;s[73]=o.plotAreaStyle;s[74]=o.plotEdgeStyle;s[75]=o.plotStyle;s[76]=(o.plotToEdge?1:0);s[77]=o.position;s[78]=o.preserveAspectRatio;s[79]=o.renderFlag;s[80]=o.scrollButtonStyle;s[81]=o.scrollLeft;s[82]=o.selectedItem;s[83]=o.selectedItemStyle;s[84]=o.selectedSeries;s[85]=o.seriesColorScheme;s[86]=o.seriesColors;s[87]=o.seriesColorsOverride;s[88]=o.seriesCount;s[89]=o.seriesNames;s[90]=o.seriesNumber;s[91]=o.seriesSize;s[92]=o.seriesYAxes;s[93]=(o.showMultiples?1:0);s[94]=(o.showPercentage?1:0);s[95]=o.startTime;s[96]=o.stripeStyle;s[97]=(o.stripesVisible?1:0);s[98]=o.subtitle;s[99]=o.subtitleStyle;s[100]=o.tag;s[101]=o.textSize;s[102]=(o.timeBased?1:0);s[103]=o.title;s[104]=o.titleAlign;s[105]=o.titleBoxStyle;s[106]=o.titleImage;s[107]=o.titleImageStyle;s[108]=o.titleStyle;s[109]=o.titleX;s[110]=o.titleY;s[111]=o.tooltipRectStyle;s[112]=o.tuple;s[113]=o.unselectedItemStyle;s[114]=o.valueBoxStyle;s[115]=o.valueLabelFormat;s[116]=o.valueLabelStyle;s[117]=(o.valueLabelsVisible?1:0);s[118]=o.viewBoxHeight;s[119]=o.viewBoxWidth;s[120]=(o.visible?1:0);s[121]=(o.warnIfNoData?1:0);s[122]=o.width;s[123]=o.x;s[124]=set.addObject(o.xAxis,'xAxis');s[125]=o.y;s[126]=set.addObject(o.yAxis,'yAxis');s[127]=set.serializeList(o,o.yAxisList,true,'yAxisList');
}
function _ZEN_SVGComponent_treeMapChart_getSettings(s)
{
	s['name'] = 'string';
	s['controllerId'] = 'id';
	s['ongetColorScaleData'] = 'eventHandler';
	s['ongetcontroller'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	s['showPercentage'] = 'boolean';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_treeMapChart_acquireData = function() {
this.invokeSuper('acquireData')
if (this.ongetColorScaleData!='') {
delete this._colorScaleData
var seriesNumber = parseInt(this.seriesNumber);
var scount = this.getSeriesCount();
this._colorScaleData = new Array(scount);
this._colorScaleDataMax = new Array(scount);
for (var s = 0; s < scount; s++) {
if (isNaN(seriesNumber) || (s==seriesNumber)) {
var data = zenInvokeCallbackMethod(this.ongetColorScaleData,this,'ongetColorScaleData','series',s);
var max = 'x'; var min = 'x';
this._colorScaleData[s] = [];
if (data) {
for (var i = 0; i < data.length; i++) {
var v = parseFloat(data[i]);
this._colorScaleData[s][i] = v;
if ((isNaN(max) || (max < v)) && !isNaN(v)) {
max = v;
}
if ((isNaN(min) || (min > v)) && !isNaN(v)) {
min = v;
}
}
this._colorScaleDataMax[s] = { 'max':isNaN(max)?0:max, 'min':isNaN(min)?0:min };
}
}
}
}
}

self._ZEN_SVGComponent_treeMapChart_connectToController = function() {
this.controller = '';
if (!zenIsMissing(this.controllerId)) {
if (this.composite) {
this.controller = this.composite.getChildById(this.controllerId);
}
else {
this.controller = zenPage.getComponentById(this.controllerId);
}
if (this.controller && this.controller.register) {
this.controller.register(this);
}
else {
alert('ZEN: Unable to connect component to dataController (' + this.id + ').');
}
if (this.controller) {
if ('' == this.controller.modelError) {
this.controller.loadModel(false);
}
}
}
}

self._ZEN_SVGComponent_treeMapChart_convertToRGB = function(string) {
string = zenTrim(string).toLowerCase();
if (string.substr(0,4)=='rgb(') {
var arr = string.substring(4,string.length-1).split(',');
for (var i = 0; i<3; i++) {
arr[i] = parseInt(zenTrim(arr[i]));
}
return arr;
}
var isHex = string.match(/#?[0-9abcdef]{6}/g);
if (isHex && (isHex.length==1)) {
if (string.charAt(0)=='#') { string = string.substr(1); }
var arr = new Array(3);
for (var i = 0; i<3; i++) {
arr[i] = parseInt(string.substr(i*2,2),16);
}
return arr;
}
switch (string) {
case 'aliceblue': return this.convertToRGB('#f0f8ff');
case 'antiquewhite': return this.convertToRGB('#faebd7');
case 'aqua': return this.convertToRGB('#00ffff');
case 'aquamarine': return this.convertToRGB('#7fffd4');
case 'azure': return this.convertToRGB('#f0ffff');
case 'beige': return this.convertToRGB('#f5f5dc');
case 'bisque': return this.convertToRGB('#ffe4c4');
case 'black': return this.convertToRGB('#000000');
case 'blanchedalmond': return this.convertToRGB('#ffebcd');
case 'blue': return this.convertToRGB('#0000ff');
case 'blueviolet': return this.convertToRGB('#8a2be2');
case 'brown': return this.convertToRGB('#a52a2a');
case 'burlywood': return this.convertToRGB('#deb887');
case 'cadetblue': return this.convertToRGB('#5f9ea0');
case 'chartreuse': return this.convertToRGB('#7fff00');
case 'chocolate': return this.convertToRGB('#d2691e');
case 'coral': return this.convertToRGB('#ff7f50');
case 'cornflowerblue': return this.convertToRGB('#6495ed');
case 'cornsilk': return this.convertToRGB('#fff8dc');
case 'crimson': return this.convertToRGB('#dc143c');
case 'cyan': return this.convertToRGB('#00ffff');
case 'darkblue': return this.convertToRGB('#00008b');
case 'darkcyan': return this.convertToRGB('#008b8b');
case 'darkgoldenrod': return this.convertToRGB('#b8860b');
case 'darkgray': return this.convertToRGB('#a9a9a9');
case 'darkgreen': return this.convertToRGB('#006400');
case 'darkkhaki': return this.convertToRGB('#bdb76b');
case 'darkmagenta': return this.convertToRGB('#8b008b');
case 'darkolivegreen': return this.convertToRGB('#556b2f');
case 'darkorange': return this.convertToRGB('#ff8c00');
case 'darkorchid': return this.convertToRGB('#9932cc');
case 'darkred': return this.convertToRGB('#8b0000');
case 'darksalmon': return this.convertToRGB('#e9967a');
case 'darkseagreen': return this.convertToRGB('#8fbc8f');
case 'darkslateblue': return this.convertToRGB('#483d8b');
case 'darkslategray': return this.convertToRGB('#2f4f4f');
case 'darkturquoise': return this.convertToRGB('#00ced1');
case 'darkviolet': return this.convertToRGB('#9400d3');
case 'deeppink': return this.convertToRGB('#ff1493');
case 'deepskyblue': return this.convertToRGB('#00bfff');
case 'dimgray': return this.convertToRGB('#696969');
case 'dodgerblue': return this.convertToRGB('#1e90ff');
case 'firebrick': return this.convertToRGB('#b22222');
case 'floralwhite': return this.convertToRGB('#fffaf0');
case 'forestgreen': return this.convertToRGB('#228b22');
case 'fuchsia': return this.convertToRGB('#ff00ff');
case 'gainsboro': return this.convertToRGB('#dcdcdc');
case 'ghostwhite': return this.convertToRGB('#f8f8ff');
case 'gold': return this.convertToRGB('#ffd700');
case 'goldenrod': return this.convertToRGB('#daa520');
case 'gray': return this.convertToRGB('#808080');
case 'green': return this.convertToRGB('#008000');
case 'greenyellow': return this.convertToRGB('#adff2f');
case 'honeydew': return this.convertToRGB('#f0fff0');
case 'hotpink': return this.convertToRGB('#ff69b4');
case 'indianred ': return this.convertToRGB('#cd5c5c');
case 'indigo ': return this.convertToRGB('#4b0082');
case 'ivory': return this.convertToRGB('#fffff0');
case 'khaki': return this.convertToRGB('#f0e68c');
case 'lavender': return this.convertToRGB('#e6e6fa');
case 'lavenderblush': return this.convertToRGB('#fff0f5');
case 'lawngreen': return this.convertToRGB('#7cfc00');
case 'lemonchiffon': return this.convertToRGB('#fffacd');
case 'lightblue': return this.convertToRGB('#add8e6');
case 'lightcoral': return this.convertToRGB('#f08080');
case 'lightcyan': return this.convertToRGB('#e0ffff');
case 'lightgoldenrodyellow': return this.convertToRGB('#fafad2');
case 'lightgray': return this.convertToRGB('#d3d3d3');
case 'lightgreen': return this.convertToRGB('#90ee90');
case 'lightpink': return this.convertToRGB('#ffb6c1');
case 'lightsalmon': return this.convertToRGB('#ffa07a');
case 'lightseagreen': return this.convertToRGB('#20b2aa');
case 'lightskyblue': return this.convertToRGB('#87cefa');
case 'lightslategray': return this.convertToRGB('#778899');
case 'lightsteelblue': return this.convertToRGB('#b0c4de');
case 'lightyellow': return this.convertToRGB('#ffffe0');
case 'lime': return this.convertToRGB('#00ff00');
case 'limegreen': return this.convertToRGB('#32cd32');
case 'linen': return this.convertToRGB('#faf0e6');
case 'magenta': return this.convertToRGB('#ff00ff');
case 'maroon': return this.convertToRGB('#800000');
case 'mediumaquamarine': return this.convertToRGB('#66cdaa');
case 'mediumblue': return this.convertToRGB('#0000cd');
case 'mediumorchid': return this.convertToRGB('#ba55d3');
case 'mediumpurple': return this.convertToRGB('#9370db');
case 'mediumseagreen': return this.convertToRGB('#3cb371');
case 'mediumslateblue': return this.convertToRGB('#7b68ee');
case 'mediumspringgreen': return this.convertToRGB('#00fa9a');
case 'mediumturquoise': return this.convertToRGB('#48d1cc');
case 'mediumvioletred': return this.convertToRGB('#c71585');
case 'midnightblue': return this.convertToRGB('#191970');
case 'mintcream': return this.convertToRGB('#f5fffa');
case 'mistyrose': return this.convertToRGB('#ffe4e1');
case 'moccasin': return this.convertToRGB('#ffe4b5');
case 'navajowhite': return this.convertToRGB('#ffdead');
case 'navy': return this.convertToRGB('#000080');
case 'oldlace': return this.convertToRGB('#fdf5e6');
case 'olive': return this.convertToRGB('#808000');
case 'olivedrab': return this.convertToRGB('#6b8e23');
case 'orange': return this.convertToRGB('#ffa500');
case 'orangered': return this.convertToRGB('#ff4500');
case 'orchid': return this.convertToRGB('#da70d6');
case 'palegoldenrod': return this.convertToRGB('#eee8aa');
case 'palegreen': return this.convertToRGB('#98fb98');
case 'paleturquoise': return this.convertToRGB('#afeeee');
case 'palevioletred': return this.convertToRGB('#db7093');
case 'papayawhip': return this.convertToRGB('#ffefd5');
case 'peachpuff': return this.convertToRGB('#ffdab9');
case 'peru': return this.convertToRGB('#cd853f');
case 'pink': return this.convertToRGB('#ffc0cb');
case 'plum': return this.convertToRGB('#dda0dd');
case 'powderblue': return this.convertToRGB('#b0e0e6');
case 'purple': return this.convertToRGB('#800080');
case 'red': return this.convertToRGB('#ff0000');
case 'rosybrown': return this.convertToRGB('#bc8f8f');
case 'royalblue': return this.convertToRGB('#4169e1');
case 'saddlebrown': return this.convertToRGB('#8b4513');
case 'salmon': return this.convertToRGB('#fa8072');
case 'sandybrown': return this.convertToRGB('#f4a460');
case 'seagreen': return this.convertToRGB('#2e8b57');
case 'seashell': return this.convertToRGB('#fff5ee');
case 'sienna': return this.convertToRGB('#a0522d');
case 'silver': return this.convertToRGB('#c0c0c0');
case 'skyblue': return this.convertToRGB('#87ceeb');
case 'slateblue': return this.convertToRGB('#6a5acd');
case 'slategray': return this.convertToRGB('#708090');
case 'snow': return this.convertToRGB('#fffafa');
case 'springgreen': return this.convertToRGB('#00ff7f');
case 'steelblue': return this.convertToRGB('#4682b4');
case 'tan': return this.convertToRGB('#d2b48c');
case 'teal': return this.convertToRGB('#008080');
case 'thistle': return this.convertToRGB('#d8bfd8');
case 'tomato': return this.convertToRGB('#ff6347');
case 'turquoise': return this.convertToRGB('#40e0d0');
case 'violet': return this.convertToRGB('#ee82ee');
case 'wheat': return this.convertToRGB('#f5deb3');
case 'white': return this.convertToRGB('#ffffff');
case 'whitesmoke': return this.convertToRGB('#f5f5f5');
case 'yellow': return this.convertToRGB('#ffff00');
case 'yellowgreen': return this.convertToRGB('#9acd32');
}
throw "Unsupported color format: '"+string+"'";
}

self._ZEN_SVGComponent_treeMapChart_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._ZEN_SVGComponent_treeMapChart_getChartElementStyle = function(series,item) {
var clr;
var op = '1.0';
clr = this.getSeriesColor(item, series, item);
return "stroke-width: 0.25px; fill-opacity: "+op+"; stroke: " + 'gray' + "; fill: " + clr + ";" + this.plotStyle;
}

self._ZEN_SVGComponent_treeMapChart_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._ZEN_SVGComponent_treeMapChart_getFGColor = function(background) {
try {
var rgb = this.convertToRGB(background);
} catch (err) {
return 'black';
}
var tBright = (rgb[0]*rgb[0]*0.241)+(rgb[1]*rgb[1]*0.691)+(rgb[2]*rgb[2]*0.068);
return (tBright>16900) ? "black" : "white";
}

self._ZEN_SVGComponent_treeMapChart_getLegendLabels = function() {
var legends = [];
var sc = this.getSeriesCount();
var ic = this.getSeriesSize();
if ((ic == 1 || sc == 1)) {
return legends;
}
for (var i = 0; i < ic; i++) {
var	lbl = this.getYLabelText(i,'',1);
legends[i] = zenIsMissing(lbl) ? (parseInt(i,10)+1) : lbl;
}
return legends;
}

self._ZEN_SVGComponent_treeMapChart_getSeriesColor = function(index,series,itemNo) {
if ((''!=this.ongetColorScaleData) && (series!=null) && (itemNo!=null)) {
if (this._colorScaleData[series].length>itemNo) {
var value = this._colorScaleData[series][itemNo];
var max = this._colorScaleDataMax[series];
var pct = ((max['max']==max['min']) ? 0 : (value - max['min']) / (max['max'] - max['min']));
} else {
var pct = 0;
}
var colors = !zenIsMissing(this.seriesColors) ? this._seriesColors : [this._seriesColors[0]];
if (colors==null || colors.length == 0) {
colors = ['rgb(0,0,0)', 'rgb(0,255,0)'];
} else if (colors.length == 1) {
colors = ['rgb(0,0,0)', colors[0]];
}
var colorsRGB = new Array(colors.length);
for (var i = 0; i<colors.length; i++) {
try {
colorsRGB[i] = this.convertToRGB(colors[i]);
} catch (err) {
alert(err);
return 'black';
}
}
if ((colors.length == 2) || (pct==0)) {
var index = 0;
} else {
var maxIndex = colors.length-1;
var index = Math.floor(pct * maxIndex);
index = (index == maxIndex) ? index-1 : index;
pct = (pct - (index / maxIndex)) * maxIndex;
}
var scaledColor = new Array(3);
for (i = 0; i < 3; i++) {
low = parseInt(colorsRGB[index][i]);
high = parseInt(colorsRGB[index+1][i]);
scaledColor[i] = Math.round(low + (pct * (high-low)));
}
return 'rgb('+scaledColor.join(',')+')';
}
var sclr = this.invokeSuper('getSeriesColor',arguments)
return sclr
}

self._ZEN_SVGComponent_treeMapChart_getToolTipInfo = function(series,item,captions,values) {
this.invokeSuper('getToolTipInfo',arguments);
if ((this.ongetColorScaleData!="") && (series!=null) && (item!=null)
&& this._colorScaleData && (this._colorScaleData.length>series)
&& this._colorScaleData[series] && (this._colorScaleData[series].length>item)) {
if (captions[captions.length-1]=='Value') {
captions[captions.length-1] = 'Value (size)';
}
captions[captions.length] = $$$Text("Value (color)");
var val = this._colorScaleData[series][item];
if (!isNaN(parseFloat(val))) {
if (parseFloat(val)!=parseInt(val)) {
val = this.formatNumeric(parseFloat(val).toFixed(2));
}
else {
val = this.formatNumeric(parseInt(val));
}
}
values[values.length] = val;
}
}

self._ZEN_SVGComponent_treeMapChart_hasAxes = function() {
return false;
}

self._ZEN_SVGComponent_treeMapChart_hasMultiples = function() {
return this.showMultiples;
}

self._ZEN_SVGComponent_treeMapChart_is3D = function() {
return false;
}

self._ZEN_SVGComponent_treeMapChart_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_treeMapChart_plotItems = function(group,dataItems,width,height,x,y,qCount,seriesNumber) {
var sum = 0;
for (var n = 0; n < dataItems.length; n++) {
var val = parseFloat(dataItems[n].value);
sum += (isNaN(val)?0:val);
}
var plotOne = false;
if (dataItems.length >= 2) {
var a0 = parseFloat(dataItems[0].value);
if (a0 > (sum/2)) {
plotOne = true;
}
}
var svgWidth = parseInt(this.width);
var svgHeight = parseInt(this.height);
if (svgWidth > svgHeight) {
var wFactor = 0.6;
var hFactor = 1.0;
}
else {
var wFactor = 1.0;
var hFactor = 0.6;
}
if ((width*wFactor*this._scaleX) >= (height*hFactor*this._scaleY)) {
var vertical = true;
var size = height;
var ratio = width / size;
}
else {
var vertical = false;
var size = width;
var ratio = height / size;
}
if (dataItems.length < qCount) {
qCount = dataItems.length;
}
if (plotOne) {
var a0 = parseFloat(dataItems[0].value);
var edge = (a0/sum)*size*ratio;
if (vertical) {
var x1 = x;
var y1 = y;
var w1 = edge;
var h1 = size;
}
else {
var x1 = x;
var y1 = y;
var w1 = size;
var h1 = edge;
}
var itemNo = dataItems[0].itemNo;
this.plotOneBox(group,seriesNumber,itemNo,x1,y1,w1,h1,a0);
dataItems.splice(0,1);
if (dataItems.length>0) {
if (vertical) {
this.plotItems(group,dataItems,width-edge,height,x+edge,y,qCount,seriesNumber);
}
else {
this.plotItems(group,dataItems,width,height-edge,x,y+edge,qCount,seriesNumber);
}
}
}
else {
var a = [];
var idx = [];
var split = [];
var asum = 0;
for (var n = 0; n < qCount; n++) {
a[n] = parseFloat(dataItems[n].value);
asum += a[n];
}
if (asum>0) {
var edge = (asum/sum)*size*ratio;
for (var n = 0; n < qCount; n++) {
split[n] = a[n]/asum;
}
var xi = [];
var yi = [];
var wi = [];
var hi = [];
for (var n = 0; n < qCount; n++) {
if (vertical) {
xi[n] = x;
yi[n] = n>0 ? (y + (split[n-1]*size)) : y;
wi[n] = edge;
hi[n] = split[n]*size;
}
else {
xi[n] = n>0 ? (x + (split[n-1]*size)) : x;
yi[n] = y;
wi[n] = split[n]*size;
hi[n] = edge;
}
}
for (var n = 0; n < qCount; n++) {
var itemNo = dataItems[n].itemNo;
this.plotOneBox(group,seriesNumber,itemNo,xi[n],yi[n],wi[n],hi[n],a[n]);
}
dataItems.splice(0,qCount);
if (dataItems.length>0) {
if (vertical) {
this.plotItems(group,dataItems,width-edge,height,x+edge,y,qCount,seriesNumber);
}
else {
this.plotItems(group,dataItems,width,height-edge,x,y+edge,qCount,seriesNumber);
}
}
}
}
}

self._ZEN_SVGComponent_treeMapChart_plotOneBox = function(group,seriesNo,itemNo,x,y,width,height,value) {
var clr = this.getSeriesColor(itemNo, seriesNo, itemNo);
var scaleX = this._scaleX ? this._scaleX : 1;
var scaleY = this._scaleY ? this._scaleY : 1;
if (this.showMultiples) {
var rsno = this.currMultiple;
}
else {
var rsno = seriesNo;
}
rsno = (''===rsno) ? 0 : rsno;
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementClickHandler(evt,'+rsno+','+itemNo+');');
var rect = this.document.createElementNS(SVGNS,"rect");
rect.setAttribute("x",x*scaleX);
rect.setAttribute("y",y*scaleY);
rect.setAttribute("width",width*scaleX);
rect.setAttribute("height",height*scaleY);
rect.setAttribute('id',this.makeId('el_' + rsno + '_' + itemNo));
var selectedStyle = "";
if (rsno == this.selectedSeries && itemNo == this.selectedItem) {
selectedStyle=this.selectedItemStyle+";";
}
rect.setAttribute("style",'stroke:#808080;stroke-width:0.1;fill:'+clr+';'+ ((this.plotStyle)? this.plotStyle + ';' : '')+selectedStyle);
group.appendChild(rect);
rect.addEventListener('click',f,false);
var borderWidth = 3;
var wx = borderWidth/scaleX;
var hx = borderWidth/scaleY;
if ((borderWidth>0)&&(width>(wx*2))&&(height>(hx*2))) {
var rect = this.document.createElementNS(SVGNS,"rect");
rect.setAttribute("x",(x+wx)*scaleX);
rect.setAttribute("y",(y+hx)*scaleY);
rect.setAttribute("width",(width-(wx*2))*scaleX);
rect.setAttribute("height",(height-(hx*2))*scaleY);
rect.setAttribute("style",'stroke:none;fill:url(#glow-silverDiag);opacity:0.2;');
rect.setAttribute('id',this.makeId('el_' + rsno + '_' + itemNo));
group.appendChild(rect);
rect.addEventListener('click',f,false);
}
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementMouseOver(evt,'+rsno+','+itemNo+');');
rect.addEventListener('mouseover',f,false);
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementMouseOut(evt,'+rsno+','+itemNo+');');
rect.addEventListener('mouseout',f,false);
var textColor = (this.labelStyle || (this.ongetColorScaleData=='')) ? '' : ('fill: '+this.getFGColor(clr)+';'); // BDB435
if (this.labelsVisible) {
lbl = this.getYLabelText(itemNo);
var text = this.document.createElementNS(SVGNS,"text");
group.appendChild(text);
text.setAttribute("text-anchor","middle");
text.setAttribute("x",(parseFloat(x)+(width/2))*scaleX);
text.setAttribute("y",(parseFloat(y)+(height/2))*scaleY);
text.setAttribute("class","chart-valueLabel");		// DTB109
var textNode = this.document.createTextNode(lbl);
text.appendChild(textNode);
if (this.labelStyle) {
text.setAttribute("style",this.labelStyle);
var tw = zenGetComputedTextLength(text)/scaleX;
var th = zenGetBBox(text).height/scaleY;
}
else {
var fSize = 20;
text.setAttribute("style","font-size:"+fSize+"px;"+textColor);
var tw = zenGetComputedTextLength(text)/scaleX;
var th = zenGetBBox(text).height/scaleY;
var attempts = 0;
while (tw > (width*0.9) && attempts < 5) {
fSize *= 0.8;
text.setAttribute("style","font-size:"+fSize+"px;opacity:0.75;"+textColor);
tw = zenGetComputedTextLength(text)/scaleX;
th = zenGetBBox(text).height/scaleY;
attempts++;
}
}
if (tw > (width*0.9) || (th > height*0.9)) {
text.setAttribute("style","display: none;");
}
else {
if (this.showPercentage) {
var text2 = this.document.createElementNS(SVGNS,"text");
text2.setAttribute("text-anchor","middle");
text2.setAttribute("x",(parseFloat(x)+(width/2))*scaleX);
text2.setAttribute("y",(parseFloat(y)+(height/2)+th)*scaleY);
text2.setAttribute("class","chart-sliceLabel");
if (this.labelStyle) {
text2.setAttribute("style",this.labelStyle);
}
else {
text2.setAttribute("style","font-size:"+fSize+"px;opacity:0.35;"+textColor);
}
var pct = this._totalValue ? (100*value/this._totalValue).toFixed(2) : '';
var t = pct + '%';
var textNode = this.document.createTextNode(t);
text2.appendChild(textNode);
group.appendChild(text2);
var tw2 = zenGetComputedTextLength(text2)/scaleX;
var th2 = zenGetBBox(text2).height/scaleY;
if (tw2 > (width*0.9) || (th2 > height*0.9)) {
text2.setAttribute("style","display: none;");
}
}
}
} else {
if (this.showPercentage) {
var fSize = 20;
var text = this.document.createElementNS(SVGNS,"text");
text.setAttribute("text-anchor","middle");
text.setAttribute("x",(parseFloat(x)+(width/2))*scaleX);
text.setAttribute("y",(parseFloat(y)+(height/2))*scaleY);
text.setAttribute("class","chart-sliceLabel");
if (this.labelStyle) {
text.setAttribute("style",this.labelStyle);
}
else {
text.setAttribute("style","font-size:"+fSize+"px;opacity:0.35;"+textColor);
}
var pct = this._totalValue ? (100*value/this._totalValue).toFixed(2) : '';
var t = pct + '%';
var textNode = this.document.createTextNode(t);
text.appendChild(textNode);
group.appendChild(text);
var tw = zenGetComputedTextLength(text)/scaleX;
var th = zenGetBBox(text).height/scaleY;
var attempts = 0;
while (tw > (width*0.9) && attempts < 5) {
fSize *= 0.8;
text.setAttribute("style","font-size:"+fSize+"px;opacity:0.75;"+textColor);
tw = zenGetComputedTextLength(text)/scaleX;
th = zenGetBBox(text).height/scaleY;
attempts++;
}
if (tw > (width*0.9) || (th > height*0.9)) {
text.setAttribute("style","display: none;");
}
}
}
}

self._ZEN_SVGComponent_treeMapChart_renderSeries = function(group) {
try {
var sc = this.getSeriesCount();
var ic = this.getSeriesSize();
var items = 0;
var values = new Array();
var snames = null;
var seriesNumber = parseInt(this.seriesNumber);
if (!isNaN(seriesNumber)) {
sc = 1;
}
if (this.showMultiples) {
seriesNumber = this.currMultiple;
sc = 1;
}
var dataItems = [];
var total = 0;
items = ic;
for (var i = 0; i < ic; i++) {
var value = 0;
for (var s = 0; s < sc; s++) {
var data = this._dataSeries[isNaN(seriesNumber)?s:seriesNumber];
value += (data == null || data[i] == null || data[i] < 0 || isNaN(parseFloat(data[i]))) ? 0 : (parseFloat(data[i]));
}
dataItems[i] = {value:value, itemNo:i};
total += value;
}
this._totalValue = total;
dataItems.sort(function(a,b) { return parseFloat(b.value) - parseFloat(a.value) });
while(null != group.firstChild) {
group.removeChild(group.firstChild);
}
var qCount = 2;
this.plotItems(group,dataItems,this._plotWidth,this._plotHeight,0,0,qCount,isNaN(seriesNumber)?0:seriesNumber);
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in treeMapChart.renderSeries');
}
}

self._ZEN_SVGComponent_treeMapChart_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_treeMapChart_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._ZEN_SVGComponent_treeMapChart_setProperty = function(property,value,value2) {
switch(property) {
case 'showPercentage':
this[property] = value ? true : false;
this.render();
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}
self._ZEN_SVGComponent_treeMapChart__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_chart');
	_ZEN_SVGComponent_treeMapChart.prototype = zenCreate('_ZEN_SVGComponent_chart',-1);
	var p = _ZEN_SVGComponent_treeMapChart.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_treeMapChart;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_chart) ? zenMaster._ZEN_SVGComponent_chart.prototype:_ZEN_SVGComponent_chart.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.treeMapChart';
	p._type = 'treeMapChart';
	p.serialize = _ZEN_SVGComponent_treeMapChart_serialize;
	p.getSettings = _ZEN_SVGComponent_treeMapChart_getSettings;
	p.acquireData = _ZEN_SVGComponent_treeMapChart_acquireData;
	p.connectToController = _ZEN_SVGComponent_treeMapChart_connectToController;
	p.convertToRGB = _ZEN_SVGComponent_treeMapChart_convertToRGB;
	p.disconnectFromController = _ZEN_SVGComponent_treeMapChart_disconnectFromController;
	p.getChartElementStyle = _ZEN_SVGComponent_treeMapChart_getChartElementStyle;
	p.getController = _ZEN_SVGComponent_treeMapChart_getController;
	p.getFGColor = _ZEN_SVGComponent_treeMapChart_getFGColor;
	p.getLegendLabels = _ZEN_SVGComponent_treeMapChart_getLegendLabels;
	p.getSeriesColor = _ZEN_SVGComponent_treeMapChart_getSeriesColor;
	p.getToolTipInfo = _ZEN_SVGComponent_treeMapChart_getToolTipInfo;
	p.hasAxes = _ZEN_SVGComponent_treeMapChart_hasAxes;
	p.hasMultiples = _ZEN_SVGComponent_treeMapChart_hasMultiples;
	p.is3D = _ZEN_SVGComponent_treeMapChart_is3D;
	p.notifyView = _ZEN_SVGComponent_treeMapChart_notifyView;
	p.plotItems = _ZEN_SVGComponent_treeMapChart_plotItems;
	p.plotOneBox = _ZEN_SVGComponent_treeMapChart_plotOneBox;
	p.renderSeries = _ZEN_SVGComponent_treeMapChart_renderSeries;
	p.sendEventToController = _ZEN_SVGComponent_treeMapChart_sendEventToController;
	p.setControllerId = _ZEN_SVGComponent_treeMapChart_setControllerId;
	p.setProperty = _ZEN_SVGComponent_treeMapChart_setProperty;
}

self._zenClassIdx['xyChart'] = '_ZEN_SVGComponent_xyChart';
self._ZEN_SVGComponent_xyChart = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_xyChart__init(this,index,id);}
}

self._ZEN_SVGComponent_xyChart__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_chart__init) ?zenMaster._ZEN_SVGComponent_chart__init(o,index,id):_ZEN_SVGComponent_chart__init(o,index,id);
	o.chartPivot = false;
	o.controller = '';
	o.controllerId = '';
	o.independentXSeries = false;
	o.markersVisible = true;
	o.ongetcontroller = '';
	o.onnotifyView = '';
	o.scrollLeft = '0';
	o.seriesYAxes = '';
	o.tag = 'xyChart';
}
function _ZEN_SVGComponent_xyChart_serialize(set,s)
{
	var o = this;s[0]='1256472380';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.appearance;s[7]=(o.autoScaleText?1:0);s[8]=o.aux;s[9]=o.axisLineStyle;s[10]=o.axisTitleStyle;s[11]=o.backgroundStyle;s[12]=o.bandLower;s[13]=o.bandLowerStyle;s[14]=o.bandUpper;s[15]=o.bandUpperStyle;s[16]=o.baseLineStyle;s[17]=o.borderOffset;s[18]=o.borderRadius;s[19]=o.borderStyle;s[20]=(o.boundless?1:0);s[21]=(o.chartPivot?1:0);s[22]=o.controller;s[23]=o.controllerId;s[24]=o.currMultiple;s[25]=o.currYAxis;s[26]=o.endTime;s[27]=o.gridStyle;s[28]=(o.hasZoom?1:0);s[29]=o.height;s[30]=(o.hidden?1:0);s[31]=o.hzZoomStep;s[32]=(o.independentXSeries?1:0);s[33]=o.indicatorStyle;s[34]=(o.indicatorsVisible?1:0);s[35]=o.labelStyle;s[36]=(o.labelsVisible?1:0);s[37]=o.legendHeight;s[38]=o.legendLabelStyle;s[39]=o.legendRectStyle;s[40]=o.legendStyle;s[41]=o.legendTitle;s[42]=o.legendVisible;s[43]=o.legendWidth;s[44]=o.legendX;s[45]=o.legendY;s[46]=o.lineStyle;s[47]=o.marginBottom;s[48]=o.marginLeft;s[49]=o.marginRight;s[50]=o.marginTop;s[51]=o.markerScale;s[52]=o.markerShapes;s[53]=o.markerStyle;s[54]=(o.markersVisible?1:0);s[55]=o.maxLabelLen;s[56]=o.msgIfNoData;s[57]=o.multipleTitleStyle;s[58]=o.noDataFill;s[59]=o.noDataOpacity;s[60]=o.noDataStroke;s[61]=o.onclick;s[62]=o.onelementClick;s[63]=o.ongetData;s[64]=o.ongetLabelX;s[65]=o.ongetLabelY;s[66]=o.ongetSeriesColor;s[67]=o.ongetTimeEvents;s[68]=o.ongetcontroller;s[69]=o.onnotifyView;s[70]=o.onrenderData;s[71]=o.onrenderPlotArea;s[72]=o.onshowTooltip;s[73]=o.onupdate;s[74]=o.plotAreaStyle;s[75]=o.plotEdgeStyle;s[76]=o.plotStyle;s[77]=(o.plotToEdge?1:0);s[78]=o.position;s[79]=o.preserveAspectRatio;s[80]=o.renderFlag;s[81]=o.scrollButtonStyle;s[82]=o.scrollLeft;s[83]=o.selectedItem;s[84]=o.selectedItemStyle;s[85]=o.selectedSeries;s[86]=o.seriesColorScheme;s[87]=o.seriesColors;s[88]=o.seriesColorsOverride;s[89]=o.seriesCount;s[90]=o.seriesNames;s[91]=o.seriesNumber;s[92]=o.seriesSize;s[93]=o.seriesYAxes;s[94]=(o.showMultiples?1:0);s[95]=o.startTime;s[96]=o.stripeStyle;s[97]=(o.stripesVisible?1:0);s[98]=o.subtitle;s[99]=o.subtitleStyle;s[100]=o.tag;s[101]=o.textSize;s[102]=(o.timeBased?1:0);s[103]=o.title;s[104]=o.titleAlign;s[105]=o.titleBoxStyle;s[106]=o.titleImage;s[107]=o.titleImageStyle;s[108]=o.titleStyle;s[109]=o.titleX;s[110]=o.titleY;s[111]=o.tooltipRectStyle;s[112]=o.tuple;s[113]=o.unselectedItemStyle;s[114]=o.valueBoxStyle;s[115]=o.valueLabelFormat;s[116]=o.valueLabelStyle;s[117]=(o.valueLabelsVisible?1:0);s[118]=o.viewBoxHeight;s[119]=o.viewBoxWidth;s[120]=(o.visible?1:0);s[121]=(o.warnIfNoData?1:0);s[122]=o.width;s[123]=o.x;s[124]=set.addObject(o.xAxis,'xAxis');s[125]=o.y;s[126]=set.addObject(o.yAxis,'yAxis');s[127]=set.serializeList(o,o.yAxisList,true,'yAxisList');
}
function _ZEN_SVGComponent_xyChart_getSettings(s)
{
	s['name'] = 'string';
	s['chartPivot'] = 'boolean';
	s['controllerId'] = 'id';
	s['independentXSeries'] = 'boolean';
	s['ongetcontroller'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	s['seriesYAxes'] = 'csv';
	s['tag'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_xyChart_connectToController = function() {
this.controller = '';
if (!zenIsMissing(this.controllerId)) {
if (this.composite) {
this.controller = this.composite.getChildById(this.controllerId);
}
else {
this.controller = zenPage.getComponentById(this.controllerId);
}
if (this.controller && this.controller.register) {
this.controller.register(this);
}
else {
alert('ZEN: Unable to connect component to dataController (' + this.id + ').');
}
if (this.controller) {
if ('' == this.controller.modelError) {
this.controller.loadModel(false);
}
}
}
}

self._ZEN_SVGComponent_xyChart_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._ZEN_SVGComponent_xyChart_findDataRange = function(yAxisNo) {
var range = new Object();
range.minValue = null;
range.maxValue = null;
range.minValue2 = null; // used by x/y type charts
range.maxValue2 = null;
var scount = this.getSeriesCount();
var items = this.getSeriesSize();
if (scount <= 1) {
range.minValue2 = 0;
range.maxValue2 = items;
if (scount == 1) {
var data = this._dataSeries[0];
for (var n = 0; n < items; n++) {
var val = data[n];
if (!isNaN(val)) {
val = parseFloat(val);
range.minValue = (null==range.minValue) ? val : (val < range.minValue) ? val : range.minValue;
range.maxValue = (null==range.maxValue) ? val : (val > range.maxValue) ? val : range.maxValue;
}
}
}
}
else {
for (var s = 0; s < scount; s++) {
var data = this._dataSeries[s];
var which = this.independentXSeries?(s%2==0?'x':'y'):(s==0?'x':'y');
if (data) {
for (var n = 0; n < items; n++) {
var val = data[n];
val = parseFloat(val);
if (!isNaN(val)) {
if (which == 'y') {
range.minValue = (null==range.minValue) ? val : (val < range.minValue) ? val : range.minValue;
range.maxValue = (null==range.maxValue) ? val : (val > range.maxValue) ? val : range.maxValue;
}
else {
range.minValue2 = (null==range.minValue2) ? val : (val < range.minValue2) ? val : range.minValue2;
range.maxValue2 = (null==range.maxValue2) ? val : (val > range.maxValue2) ? val : range.maxValue2;
}
}
}
}
}
/*
var data = this._dataSeries[0];
for (var n = 0; n < items; n++) {
var val = data[n];
if (!isNaN(val)) {
val = parseFloat(val);
range.minValue2 = (null==range.minValue2) ? val : (val < range.minValue2) ? val : range.minValue2;
range.maxValue2 = (null==range.maxValue2) ? val : (val > range.maxValue2) ? val : range.maxValue2;
}
}
for (var s = 1; s < scount; s++) {
var data = this._dataSeries[s];
for (var n = 0; n < items; n++) {
var val = data[n];
if (!isNaN(val)) {
val = parseFloat(val);
range.minValue = (null==range.minValue) ? val : (val < range.minValue) ? val : range.minValue;
range.maxValue = (null==range.maxValue) ? val : (val > range.maxValue) ? val : range.maxValue;
}
}
}
*/
}
if (this.chartPivot) {
tmin=range.minValue
tmax=range.maxValue
range.minValue=range.minValue2
range.maxValue=range.maxValue2
range.minValue2=tmin
range.maxValue2=tmax
}
return range;
}

self._ZEN_SVGComponent_xyChart_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._ZEN_SVGComponent_xyChart_getLegendLabels = function() {
var legends = [];
var names = this.getSeriesNames();
var scount = this.getSeriesCount();
if (scount>1) {
if (this.independentXSeries) {
scount = Math.ceil(scount / 2);
}
else {
scount = scount - 1;
}
}
if (this.independentXSeries) {
for (var i = 1; i < scount+1;i++) {
var c = ((i-1)*2)+1;
legends.push((null == names[c] || '' == names[c]) ? (parseInt(i,10)+1) : names[c]);
}
}
else {
for (var i = 1; i < scount+1; i++) {
legends.push((null == names[i] || '' == names[i]) ? (parseInt(i,10)+1) : names[i]);
}
}
return legends;
}

self._ZEN_SVGComponent_xyChart_getToolTipInfo = function(series,item,captions,values) {
var controller = this.getController();
if (this.getSeriesSize() > 1) {
var xData = [];
var yData = [];
var name = '';
var names = this.getSeriesNames();
var scount = this.getSeriesCount();
if (this.independentXSeries) {
scount = Math.ceil(scount / 2);
for (var s = 0; s < scount; s++) {
xData[s] = this.getSeriesData(s*2);
yData[s] = this.getSeriesData((s*2)+1);
}
}
else {
xData[0] = this.getSeriesData(0);
for (var s = 1; s < scount; s++) {
yData[s] = this.getSeriesData(s);
}
}
var format = this.valueLabelFormat ? this.valueLabelFormat : '#,#.##';
if (this.independentXSeries) {
if (names[series*2+1]) {
captions.push(names[series*2+1]);
var val = zenGet(yData[series][item]);
values.push(val!=='' ? zenFormatNumber(val.toString(),format) : '');
}
if (names[series*2]) {
captions.push(names[series*2]);
var val = zenGet(xData[series][item]);
values.push(val!=='' ? zenFormatNumber(val.toString(),format) : '');
}
}
else {
if (names[series]) {
captions.push(names[series]);
var val = zenGet(yData[series][item]);
values.push(val!=='' ? zenFormatNumber(val.toString(),format) : '');
}
if (names[0]) {
captions.push(names[0]);
var val = zenGet(xData[0][item]);
values.push(val!=='' ? zenFormatNumber(val.toString(),format) : '');
}
}
}
if (controller && controller.getFilterInfo) {
var fnames = new Array();
var fvalues = new Array();
controller.getFilterInfo(fnames,fvalues);
for (var n = 0; n < fnames.length; n++) {
captions.push(fnames[n]);
values.push(fvalues[n]);
}
}
}

self._ZEN_SVGComponent_xyChart_getXAxisType = function() {
return 'value';
}

self._ZEN_SVGComponent_xyChart_getYAxisType = function() {
return 'value';
}

self._ZEN_SVGComponent_xyChart_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_xyChart_renderSeries = function(group) {
var scaleX = this._scaleX ? this._scaleX : 1;
var scaleY = this._scaleY ? this._scaleY : 1;
var hasEvents = true;
var x,y,xval,yval;
var scount = this.getSeriesCount();
var items = this.getSeriesSize();
if (items > 0) {
var xData = [];
var yData = [];
if (scount <= 1) {
xData[0] = new Array(items);
for (var n = 0; n < items; n++) {
xData[0][n] = n;
}
yData[0] = this.getSeriesData(0);
scount = 1;
var startSeries = 0;
}
else if (this.independentXSeries) {
scount = Math.ceil(scount / 2);
for (var s = 0; s < scount; s++) {
xData[s] = this.getSeriesData(s*2);
yData[s] = this.getSeriesData((s*2)+1);
}
var startSeries = 0;
}
else {
xData[0] = this.getSeriesData(0);
for (var s = 1; s < scount; s++) {
yData[s] = this.getSeriesData(s);
}
var startSeries = 1;
}
for (var s = startSeries; s < scount; s++) {
var ms = this.independentXSeries ? s : s-1;
var xs = this.independentXSeries ? s : 0;
var ys = s;
var color = this.getSeriesColor(ms);
if (this.markersVisible) {
var marker = this.getMarkerShape(ms);
}
var poly = this.document.createElementNS(SVGNS,"polyline");
poly.setAttribute("class","chart-seriesLine");
group.appendChild(poly);
var points = ''; // set of points for this line
for (var n = 0; n < items; n++) {
if (!this.chartPivot) {
xval = (null == xData[xs]) ? '' : ((null == xData[xs][n]) ? '' : xData[xs][n]);
yval = (null == yData[ys]) ? '' : ((null == yData[ys][n]) ? '' : yData[ys][n]);
} else {
xval = (null == yData[ys]) ? '' : ((null == yData[ys][n]) ? '' : yData[ys][n]);
yval = (null == xData[xs]) ? '' : ((null == xData[xs][n]) ? '' : xData[xs][n]);
}
x = this.getPlotX(xval) - this._plotLeft;
y = this.getPlotY(yval) - this._plotTop;
if ('' !== yval) {
points += (x*scaleX) + ' ' + (y*scaleY) + ' ';
}
if (this.markersVisible) {
if ('' !== yval) {
var mk = this.createMarker(s,n,x,y,color,marker);
group.appendChild(mk);
}
if (hasEvents) {
var sno = s;
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementMouseOver(evt,'+sno+','+n+');');
mk.addEventListener('mouseover',f,false);
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementMouseOut(evt,'+sno+','+n+');');
mk.addEventListener('mouseout',f,false);
}
}
}
poly.setAttribute("points",points);
poly.setAttribute("stroke",color);
poly.setAttribute("fill",'none');
poly.setAttribute("style",this.plotStyle);
}
}
}

self._ZEN_SVGComponent_xyChart_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_xyChart_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._ZEN_SVGComponent_xyChart_setProperty = function(property,value,value2) {
switch(property) {
case 'independentXSeries':
this[property] = value ? true : false;
this.render();
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}
self._ZEN_SVGComponent_xyChart__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_chart');
	_ZEN_SVGComponent_xyChart.prototype = zenCreate('_ZEN_SVGComponent_chart',-1);
	var p = _ZEN_SVGComponent_xyChart.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_xyChart;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_chart) ? zenMaster._ZEN_SVGComponent_chart.prototype:_ZEN_SVGComponent_chart.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.xyChart';
	p._type = 'xyChart';
	p.serialize = _ZEN_SVGComponent_xyChart_serialize;
	p.getSettings = _ZEN_SVGComponent_xyChart_getSettings;
	p.connectToController = _ZEN_SVGComponent_xyChart_connectToController;
	p.disconnectFromController = _ZEN_SVGComponent_xyChart_disconnectFromController;
	p.findDataRange = _ZEN_SVGComponent_xyChart_findDataRange;
	p.getController = _ZEN_SVGComponent_xyChart_getController;
	p.getLegendLabels = _ZEN_SVGComponent_xyChart_getLegendLabels;
	p.getToolTipInfo = _ZEN_SVGComponent_xyChart_getToolTipInfo;
	p.getXAxisType = _ZEN_SVGComponent_xyChart_getXAxisType;
	p.getYAxisType = _ZEN_SVGComponent_xyChart_getYAxisType;
	p.notifyView = _ZEN_SVGComponent_xyChart_notifyView;
	p.renderSeries = _ZEN_SVGComponent_xyChart_renderSeries;
	p.sendEventToController = _ZEN_SVGComponent_xyChart_sendEventToController;
	p.setControllerId = _ZEN_SVGComponent_xyChart_setControllerId;
	p.setProperty = _ZEN_SVGComponent_xyChart_setProperty;
}

self._zenClassIdx['xyClusterChart'] = '_ZEN_SVGComponent_xyClusterChart';
self._ZEN_SVGComponent_xyClusterChart = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_xyClusterChart__init(this,index,id);}
}

self._ZEN_SVGComponent_xyClusterChart__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_chart__init) ?zenMaster._ZEN_SVGComponent_chart__init(o,index,id):_ZEN_SVGComponent_chart__init(o,index,id);
	o.controller = '';
	o.controllerId = '';
	o.markersVisible = true;
	o.ongetcontroller = '';
	o.onnotifyView = '';
	o.scrollLeft = '0';
}
function _ZEN_SVGComponent_xyClusterChart_serialize(set,s)
{
	var o = this;s[0]='1458973926';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.appearance;s[7]=(o.autoScaleText?1:0);s[8]=o.aux;s[9]=o.axisLineStyle;s[10]=o.axisTitleStyle;s[11]=o.backgroundStyle;s[12]=o.bandLower;s[13]=o.bandLowerStyle;s[14]=o.bandUpper;s[15]=o.bandUpperStyle;s[16]=o.baseLineStyle;s[17]=o.borderOffset;s[18]=o.borderRadius;s[19]=o.borderStyle;s[20]=(o.boundless?1:0);s[21]=o.controller;s[22]=o.controllerId;s[23]=o.currMultiple;s[24]=o.currYAxis;s[25]=o.endTime;s[26]=o.gridStyle;s[27]=(o.hasZoom?1:0);s[28]=o.height;s[29]=(o.hidden?1:0);s[30]=o.hzZoomStep;s[31]=o.indicatorStyle;s[32]=(o.indicatorsVisible?1:0);s[33]=o.labelStyle;s[34]=(o.labelsVisible?1:0);s[35]=o.legendHeight;s[36]=o.legendLabelStyle;s[37]=o.legendRectStyle;s[38]=o.legendStyle;s[39]=o.legendTitle;s[40]=o.legendVisible;s[41]=o.legendWidth;s[42]=o.legendX;s[43]=o.legendY;s[44]=o.lineStyle;s[45]=o.marginBottom;s[46]=o.marginLeft;s[47]=o.marginRight;s[48]=o.marginTop;s[49]=o.markerScale;s[50]=o.markerShapes;s[51]=o.markerStyle;s[52]=(o.markersVisible?1:0);s[53]=o.maxLabelLen;s[54]=o.msgIfNoData;s[55]=o.multipleTitleStyle;s[56]=o.noDataFill;s[57]=o.noDataOpacity;s[58]=o.noDataStroke;s[59]=o.onclick;s[60]=o.onelementClick;s[61]=o.ongetData;s[62]=o.ongetLabelX;s[63]=o.ongetLabelY;s[64]=o.ongetSeriesColor;s[65]=o.ongetTimeEvents;s[66]=o.ongetcontroller;s[67]=o.onnotifyView;s[68]=o.onrenderData;s[69]=o.onrenderPlotArea;s[70]=o.onshowTooltip;s[71]=o.onupdate;s[72]=o.plotAreaStyle;s[73]=o.plotEdgeStyle;s[74]=o.plotStyle;s[75]=(o.plotToEdge?1:0);s[76]=o.position;s[77]=o.preserveAspectRatio;s[78]=o.renderFlag;s[79]=o.scrollButtonStyle;s[80]=o.scrollLeft;s[81]=o.selectedItem;s[82]=o.selectedItemStyle;s[83]=o.selectedSeries;s[84]=o.seriesColorScheme;s[85]=o.seriesColors;s[86]=o.seriesColorsOverride;s[87]=o.seriesCount;s[88]=o.seriesNames;s[89]=o.seriesNumber;s[90]=o.seriesSize;s[91]=o.seriesYAxes;s[92]=(o.showMultiples?1:0);s[93]=o.startTime;s[94]=o.stripeStyle;s[95]=(o.stripesVisible?1:0);s[96]=o.subtitle;s[97]=o.subtitleStyle;s[98]=o.tag;s[99]=o.textSize;s[100]=(o.timeBased?1:0);s[101]=o.title;s[102]=o.titleAlign;s[103]=o.titleBoxStyle;s[104]=o.titleImage;s[105]=o.titleImageStyle;s[106]=o.titleStyle;s[107]=o.titleX;s[108]=o.titleY;s[109]=o.tooltipRectStyle;s[110]=o.tuple;s[111]=o.unselectedItemStyle;s[112]=o.valueBoxStyle;s[113]=o.valueLabelFormat;s[114]=o.valueLabelStyle;s[115]=(o.valueLabelsVisible?1:0);s[116]=o.viewBoxHeight;s[117]=o.viewBoxWidth;s[118]=(o.visible?1:0);s[119]=(o.warnIfNoData?1:0);s[120]=o.width;s[121]=o.x;s[122]=set.addObject(o.xAxis,'xAxis');s[123]=o.y;s[124]=set.addObject(o.yAxis,'yAxis');s[125]=set.serializeList(o,o.yAxisList,true,'yAxisList');
}
function _ZEN_SVGComponent_xyClusterChart_getSettings(s)
{
	s['name'] = 'string';
	s['controllerId'] = 'id';
	s['ongetcontroller'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_xyClusterChart_connectToController = function() {
this.controller = '';
if (!zenIsMissing(this.controllerId)) {
if (this.composite) {
this.controller = this.composite.getChildById(this.controllerId);
}
else {
this.controller = zenPage.getComponentById(this.controllerId);
}
if (this.controller && this.controller.register) {
this.controller.register(this);
}
else {
alert('ZEN: Unable to connect component to dataController (' + this.id + ').');
}
if (this.controller) {
if ('' == this.controller.modelError) {
this.controller.loadModel(false);
}
}
}
}

self._ZEN_SVGComponent_xyClusterChart_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._ZEN_SVGComponent_xyClusterChart_findDataRange = function(yAxisNo) {
var range = new Object();
range.minValue = null;
range.maxValue = null;
range.minValue2 = null; // used by x/y type charts
range.maxValue2 = null;
var scount = this.getSeriesCount();
var items = this.getSeriesSize();
for (var s = 0; s < scount; s += 2) {
var data = this._dataSeries[s];
for (var n = 1; n < items; n++) {
var val = data[n];
if (!isNaN(val)) {
val = parseFloat(val);
range.minValue2 = (null==range.minValue2) ? val : (val < range.minValue2) ? val : range.minValue2;
range.maxValue2 = (null==range.maxValue2) ? val : (val > range.maxValue2) ? val : range.maxValue2;
}
}
}
for (var s = 1; s < scount; s += 2) {
var data = this._dataSeries[s];
for (var n = 1; n < items; n++) {
var val = data[n];
if (!isNaN(val)) {
val = parseFloat(val);
range.minValue = (null==range.minValue) ? val : (val < range.minValue) ? val : range.minValue;
range.maxValue = (null==range.maxValue) ? val : (val > range.maxValue) ? val : range.maxValue;
}
}
}
return range;
}

self._ZEN_SVGComponent_xyClusterChart_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._ZEN_SVGComponent_xyClusterChart_getLegendLabels = function() {
var scount = this.getSeriesCount();
if (scount>1) {
scount = scount - 1;
}
var legends = new Array(scount);
var names = this.getSeriesNames();
for (i = 0; i < scount; i++) {
legends[i] = (null == names[i] || '' == names[i]) ? (parseInt(i,10)+1) : names[i];
}
return legends;
}

self._ZEN_SVGComponent_xyClusterChart_getXAxisType = function() {
return 'value';
}

self._ZEN_SVGComponent_xyClusterChart_getYAxisType = function() {
return 'value';
}

self._ZEN_SVGComponent_xyClusterChart_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_xyClusterChart_renderSeries = function(group) {
var x,y,xval,yval;
var scount = this.getSeriesCount()/2;
var items =  this.getSeriesSize();
if (items > 0) {
var xData = new Array();
var yData = new Array();
for (var s = 0; s < scount; s++) {
xData[s] = this.getSeriesData(2*s);
yData[s] = this.getSeriesData((2*s) + 1);
}
for (var s = 0; s < scount; s++) {
var color = this.getSeriesColor(s);
if (this.markersVisible) {
var marker = this.getMarkerShape(s);
}
var poly = this.document.createElementNS(SVGNS,"polyline");
poly.setAttribute("class","chart-seriesLine");
group.appendChild(poly);
var points = ''; // set of points for this line
items = xData[s][0];
for (var n = 1; n <= items; n++) {
xval = (null == xData[s]) ? 0 : ((null == xData[s][n]) ? 0 : xData[s][n]);
yval = (null == yData[s]) ? 0 : ((null == yData[s][n]) ? 0 : yData[s][n]);
x = this.getPlotX(xval) - this._plotLeft;
y = this.getPlotY(yval) - this._plotTop;
points += x + ' ' + y + ' ';
if (this.markersVisible) {
group.appendChild(this.createMarker(s,n,x,y,color,marker));
}
}
poly.setAttribute("points",points);
poly.setAttribute("stroke",color);
poly.setAttribute("fill",'none');
poly.setAttribute("style",this.plotStyle);
}
}
}

self._ZEN_SVGComponent_xyClusterChart_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_xyClusterChart_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._ZEN_SVGComponent_xyClusterChart_setProperty = function(property,value,value2) {
switch(property) {
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}
self._ZEN_SVGComponent_xyClusterChart__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_chart');
	_ZEN_SVGComponent_xyClusterChart.prototype = zenCreate('_ZEN_SVGComponent_chart',-1);
	var p = _ZEN_SVGComponent_xyClusterChart.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_xyClusterChart;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_chart) ? zenMaster._ZEN_SVGComponent_chart.prototype:_ZEN_SVGComponent_chart.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.xyClusterChart';
	p._type = 'xyClusterChart';
	p.serialize = _ZEN_SVGComponent_xyClusterChart_serialize;
	p.getSettings = _ZEN_SVGComponent_xyClusterChart_getSettings;
	p.connectToController = _ZEN_SVGComponent_xyClusterChart_connectToController;
	p.disconnectFromController = _ZEN_SVGComponent_xyClusterChart_disconnectFromController;
	p.findDataRange = _ZEN_SVGComponent_xyClusterChart_findDataRange;
	p.getController = _ZEN_SVGComponent_xyClusterChart_getController;
	p.getLegendLabels = _ZEN_SVGComponent_xyClusterChart_getLegendLabels;
	p.getXAxisType = _ZEN_SVGComponent_xyClusterChart_getXAxisType;
	p.getYAxisType = _ZEN_SVGComponent_xyClusterChart_getYAxisType;
	p.notifyView = _ZEN_SVGComponent_xyClusterChart_notifyView;
	p.renderSeries = _ZEN_SVGComponent_xyClusterChart_renderSeries;
	p.sendEventToController = _ZEN_SVGComponent_xyClusterChart_sendEventToController;
	p.setControllerId = _ZEN_SVGComponent_xyClusterChart_setControllerId;
	p.setProperty = _ZEN_SVGComponent_xyClusterChart_setProperty;
}

self._zenClassIdx['comboChart'] = '_ZEN_SVGComponent_comboChart';
self._ZEN_SVGComponent_comboChart = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_comboChart__init(this,index,id);}
}

self._ZEN_SVGComponent_comboChart__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_barChart__init) ?zenMaster._ZEN_SVGComponent_barChart__init(o,index,id):_ZEN_SVGComponent_barChart__init(o,index,id);
	o.controller = '';
	o.controllerId = '';
	o.ongetcontroller = '';
	o.onnotifyView = '';
	o.scrollLeft = '0';
	o.seriesTypes = '';
}
function _ZEN_SVGComponent_comboChart_serialize(set,s)
{
	var o = this;s[0]='4088684616';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.appearance;s[7]=(o.autoScaleText?1:0);s[8]=o.aux;s[9]=o.axisLineStyle;s[10]=o.axisTitleStyle;s[11]=o.backgroundStyle;s[12]=o.bandLower;s[13]=o.bandLowerStyle;s[14]=o.bandUpper;s[15]=o.bandUpperStyle;s[16]=o.baseLineStyle;s[17]=o.borderOffset;s[18]=o.borderRadius;s[19]=o.borderStyle;s[20]=(o.boundless?1:0);s[21]=(o.chartPivot?1:0);s[22]=(o.chartStacked?1:0);s[23]=o.controller;s[24]=o.controllerId;s[25]=o.currMultiple;s[26]=o.currYAxis;s[27]=o.endTime;s[28]=o.gridStyle;s[29]=(o.hasZoom?1:0);s[30]=o.height;s[31]=(o.hidden?1:0);s[32]=o.hzZoomStep;s[33]=o.indicatorStyle;s[34]=(o.indicatorsVisible?1:0);s[35]=o.labelStyle;s[36]=(o.labelsVisible?1:0);s[37]=o.legendHeight;s[38]=o.legendLabelStyle;s[39]=o.legendRectStyle;s[40]=o.legendStyle;s[41]=o.legendTitle;s[42]=o.legendVisible;s[43]=o.legendWidth;s[44]=o.legendX;s[45]=o.legendY;s[46]=o.lineStyle;s[47]=o.marginBottom;s[48]=o.marginLeft;s[49]=o.marginRight;s[50]=o.marginTop;s[51]=o.markerScale;s[52]=o.markerShapes;s[53]=o.markerStyle;s[54]=(o.markersVisible?1:0);s[55]=o.maxLabelLen;s[56]=o.msgIfNoData;s[57]=o.multipleTitleStyle;s[58]=o.noDataFill;s[59]=o.noDataOpacity;s[60]=o.noDataStroke;s[61]=o.onclick;s[62]=o.onelementClick;s[63]=o.ongetData;s[64]=o.ongetLabelX;s[65]=o.ongetLabelY;s[66]=o.ongetSeriesColor;s[67]=o.ongetTimeEvents;s[68]=o.ongetcontroller;s[69]=o.onnotifyView;s[70]=o.onrenderData;s[71]=o.onrenderPlotArea;s[72]=o.onshowTooltip;s[73]=o.onupdate;s[74]=o.plotAreaStyle;s[75]=o.plotEdgeStyle;s[76]=o.plotStyle;s[77]=(o.plotToEdge?1:0);s[78]=o.position;s[79]=o.preserveAspectRatio;s[80]=o.renderFlag;s[81]=o.scrollButtonStyle;s[82]=o.scrollLeft;s[83]=o.selectedItem;s[84]=o.selectedItemStyle;s[85]=o.selectedSeries;s[86]=o.seriesColorScheme;s[87]=o.seriesColors;s[88]=o.seriesColorsOverride;s[89]=o.seriesCount;s[90]=o.seriesNames;s[91]=o.seriesNumber;s[92]=o.seriesSize;s[93]=o.seriesTypes;s[94]=o.seriesYAxes;s[95]=(o.showMultiples?1:0);s[96]=o.startTime;s[97]=o.stripeStyle;s[98]=(o.stripesVisible?1:0);s[99]=o.subtitle;s[100]=o.subtitleStyle;s[101]=o.tag;s[102]=o.textSize;s[103]=(o.timeBased?1:0);s[104]=o.title;s[105]=o.titleAlign;s[106]=o.titleBoxStyle;s[107]=o.titleImage;s[108]=o.titleImageStyle;s[109]=o.titleStyle;s[110]=o.titleX;s[111]=o.titleY;s[112]=o.tooltipRectStyle;s[113]=o.tuple;s[114]=o.unselectedItemStyle;s[115]=o.valueBoxStyle;s[116]=o.valueLabelFormat;s[117]=o.valueLabelStyle;s[118]=(o.valueLabelsVisible?1:0);s[119]=o.viewBoxHeight;s[120]=o.viewBoxWidth;s[121]=(o.visible?1:0);s[122]=(o.warnIfNoData?1:0);s[123]=o.width;s[124]=o.x;s[125]=set.addObject(o.xAxis,'xAxis');s[126]=o.y;s[127]=set.addObject(o.yAxis,'yAxis');s[128]=set.serializeList(o,o.yAxisList,true,'yAxisList');
}
function _ZEN_SVGComponent_comboChart_getSettings(s)
{
	s['name'] = 'string';
	s['controllerId'] = 'id';
	s['ongetcontroller'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	s['seriesTypes'] = 'csv';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_comboChart_connectToController = function() {
this.controller = '';
if (!zenIsMissing(this.controllerId)) {
if (this.composite) {
this.controller = this.composite.getChildById(this.controllerId);
}
else {
this.controller = zenPage.getComponentById(this.controllerId);
}
if (this.controller && this.controller.register) {
this.controller.register(this);
}
else {
alert('ZEN: Unable to connect component to dataController (' + this.id + ').');
}
if (this.controller) {
if ('' == this.controller.modelError) {
this.controller.loadModel(false);
}
}
}
}

self._ZEN_SVGComponent_comboChart_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._ZEN_SVGComponent_comboChart_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._ZEN_SVGComponent_comboChart_getRangeGroupForSeries = function(series) {
var group = '';
var multipleOffset = (this.currMultiple?this.currMultiple:0);
switch (this.getSeriesType(series+multipleOffset)) {
case 'target':
case 'bar':
if (this.useSumForRange()) {
group = 'bar';
}
else {
group = 'none';
}
break;
case 'area':
group = 'none';
break;
case 'line':
default:
group = 'none';
break;
}
return group;
}

self._ZEN_SVGComponent_comboChart_getSeriesType = function(series) {
var t = this.seriesTypes.toString().split(',');
var type = t[series] ? t[series] : (this.isTimeBased()?'line':'bar');
return type;
}

self._ZEN_SVGComponent_comboChart_isCombo = function() {
return true;
}

self._ZEN_SVGComponent_comboChart_isTimeBased = function() {
return this.chartPivot ? false : this.timeBased;
}

self._ZEN_SVGComponent_comboChart_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_comboChart_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_comboChart_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._ZEN_SVGComponent_comboChart_setProperty = function(property,value,value2) {
switch(property) {
case 'seriesTypes':
this[property] = value;
this.render();
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}
self._ZEN_SVGComponent_comboChart__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_barChart');
	_ZEN_SVGComponent_comboChart.prototype = zenCreate('_ZEN_SVGComponent_barChart',-1);
	var p = _ZEN_SVGComponent_comboChart.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_comboChart;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_barChart) ? zenMaster._ZEN_SVGComponent_barChart.prototype:_ZEN_SVGComponent_barChart.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.comboChart';
	p._type = 'comboChart';
	p.serialize = _ZEN_SVGComponent_comboChart_serialize;
	p.getSettings = _ZEN_SVGComponent_comboChart_getSettings;
	p.connectToController = _ZEN_SVGComponent_comboChart_connectToController;
	p.disconnectFromController = _ZEN_SVGComponent_comboChart_disconnectFromController;
	p.getController = _ZEN_SVGComponent_comboChart_getController;
	p.getRangeGroupForSeries = _ZEN_SVGComponent_comboChart_getRangeGroupForSeries;
	p.getSeriesType = _ZEN_SVGComponent_comboChart_getSeriesType;
	p.isCombo = _ZEN_SVGComponent_comboChart_isCombo;
	p.isTimeBased = _ZEN_SVGComponent_comboChart_isTimeBased;
	p.notifyView = _ZEN_SVGComponent_comboChart_notifyView;
	p.sendEventToController = _ZEN_SVGComponent_comboChart_sendEventToController;
	p.setControllerId = _ZEN_SVGComponent_comboChart_setControllerId;
	p.setProperty = _ZEN_SVGComponent_comboChart_setProperty;
}

self._zenClassIdx['xyFitChart'] = '_ZEN_SVGComponent_xyFitChart';
self._ZEN_SVGComponent_xyFitChart = function(index,id) {
	if (index>=0) {_ZEN_SVGComponent_xyFitChart__init(this,index,id);}
}

self._ZEN_SVGComponent_xyFitChart__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_xyChart__init) ?zenMaster._ZEN_SVGComponent_xyChart__init(o,index,id):_ZEN_SVGComponent_xyChart__init(o,index,id);
	o.X0Max = '';
	o.X0Min = '';
	o.controller = '';
	o.controllerId = '';
	o.hasFit = true;
	o.ongetcontroller = '';
	o.onnotifyView = '';
	o.scrollLeft = '0';
}
function _ZEN_SVGComponent_xyFitChart_serialize(set,s)
{
	var o = this;s[0]='255729597';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.X0Max;s[7]=o.X0Min;s[8]=o.appearance;s[9]=(o.autoScaleText?1:0);s[10]=o.aux;s[11]=o.axisLineStyle;s[12]=o.axisTitleStyle;s[13]=o.backgroundStyle;s[14]=o.bandLower;s[15]=o.bandLowerStyle;s[16]=o.bandUpper;s[17]=o.bandUpperStyle;s[18]=o.baseLineStyle;s[19]=o.borderOffset;s[20]=o.borderRadius;s[21]=o.borderStyle;s[22]=(o.boundless?1:0);s[23]=(o.chartPivot?1:0);s[24]=o.controller;s[25]=o.controllerId;s[26]=o.currMultiple;s[27]=o.currYAxis;s[28]=o.endTime;s[29]=o.gridStyle;s[30]=(o.hasFit?1:0);s[31]=(o.hasZoom?1:0);s[32]=o.height;s[33]=(o.hidden?1:0);s[34]=o.hzZoomStep;s[35]=(o.independentXSeries?1:0);s[36]=o.indicatorStyle;s[37]=(o.indicatorsVisible?1:0);s[38]=o.labelStyle;s[39]=(o.labelsVisible?1:0);s[40]=o.legendHeight;s[41]=o.legendLabelStyle;s[42]=o.legendRectStyle;s[43]=o.legendStyle;s[44]=o.legendTitle;s[45]=o.legendVisible;s[46]=o.legendWidth;s[47]=o.legendX;s[48]=o.legendY;s[49]=o.lineStyle;s[50]=o.marginBottom;s[51]=o.marginLeft;s[52]=o.marginRight;s[53]=o.marginTop;s[54]=o.markerScale;s[55]=o.markerShapes;s[56]=o.markerStyle;s[57]=(o.markersVisible?1:0);s[58]=o.maxLabelLen;s[59]=o.msgIfNoData;s[60]=o.multipleTitleStyle;s[61]=o.noDataFill;s[62]=o.noDataOpacity;s[63]=o.noDataStroke;s[64]=o.onclick;s[65]=o.onelementClick;s[66]=o.ongetData;s[67]=o.ongetLabelX;s[68]=o.ongetLabelY;s[69]=o.ongetSeriesColor;s[70]=o.ongetTimeEvents;s[71]=o.ongetcontroller;s[72]=o.onnotifyView;s[73]=o.onrenderData;s[74]=o.onrenderPlotArea;s[75]=o.onshowTooltip;s[76]=o.onupdate;s[77]=o.plotAreaStyle;s[78]=o.plotEdgeStyle;s[79]=o.plotStyle;s[80]=(o.plotToEdge?1:0);s[81]=o.position;s[82]=o.preserveAspectRatio;s[83]=o.renderFlag;s[84]=o.scrollButtonStyle;s[85]=o.scrollLeft;s[86]=o.selectedItem;s[87]=o.selectedItemStyle;s[88]=o.selectedSeries;s[89]=o.seriesColorScheme;s[90]=o.seriesColors;s[91]=o.seriesColorsOverride;s[92]=o.seriesCount;s[93]=o.seriesNames;s[94]=o.seriesNumber;s[95]=o.seriesSize;s[96]=o.seriesYAxes;s[97]=(o.showMultiples?1:0);s[98]=o.startTime;s[99]=o.stripeStyle;s[100]=(o.stripesVisible?1:0);s[101]=o.subtitle;s[102]=o.subtitleStyle;s[103]=o.tag;s[104]=o.textSize;s[105]=(o.timeBased?1:0);s[106]=o.title;s[107]=o.titleAlign;s[108]=o.titleBoxStyle;s[109]=o.titleImage;s[110]=o.titleImageStyle;s[111]=o.titleStyle;s[112]=o.titleX;s[113]=o.titleY;s[114]=o.tooltipRectStyle;s[115]=o.tuple;s[116]=o.unselectedItemStyle;s[117]=o.valueBoxStyle;s[118]=o.valueLabelFormat;s[119]=o.valueLabelStyle;s[120]=(o.valueLabelsVisible?1:0);s[121]=o.viewBoxHeight;s[122]=o.viewBoxWidth;s[123]=(o.visible?1:0);s[124]=(o.warnIfNoData?1:0);s[125]=o.width;s[126]=o.x;s[127]=set.addObject(o.xAxis,'xAxis');s[128]=o.y;s[129]=set.addObject(o.yAxis,'yAxis');s[130]=set.serializeList(o,o.yAxisList,true,'yAxisList');
}
function _ZEN_SVGComponent_xyFitChart_getSettings(s)
{
	s['name'] = 'string';
	s['X0Max'] = 'float';
	s['X0Min'] = 'float';
	s['controllerId'] = 'id';
	s['hasFit'] = 'boolean';
	s['ongetcontroller'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_SVGComponent_xyFitChart_connectToController = function() {
this.controller = '';
if (!zenIsMissing(this.controllerId)) {
if (this.composite) {
this.controller = this.composite.getChildById(this.controllerId);
}
else {
this.controller = zenPage.getComponentById(this.controllerId);
}
if (this.controller && this.controller.register) {
this.controller.register(this);
}
else {
alert('ZEN: Unable to connect component to dataController (' + this.id + ').');
}
if (this.controller) {
if ('' == this.controller.modelError) {
this.controller.loadModel(false);
}
}
}
}

self._ZEN_SVGComponent_xyFitChart_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._ZEN_SVGComponent_xyFitChart_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._ZEN_SVGComponent_xyFitChart_getSeriesCount = function() {
if (this.hasFit) {
return 3;
}
return 2;
}

self._ZEN_SVGComponent_xyFitChart_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_xyFitChart_renderLine = function(group) {
var x,y,val,missing,nextMissing,prevMissing;
var items = this.getSeriesSize();
var firstPoint = false;
var hasSelect = !zenIsMissing(this.selectedSeries) && !zenIsMissing(this.selectedItem) && (this.selectedSeries >= 0) && (this.selectedItem >= 0);
var seriesNumber = 2;
if (items < 1)
return;
var data = this.getSeriesData(seriesNumber);
var color = this.getSeriesColor(2);
var poly = this.document.createElementNS(SVGNS,"path");
poly.setAttribute("class","chart-seriesLine");
var path = ''; // path for this line
poly.setAttribute("fill",'none');
group.appendChild(poly);
var dx, adj;
var x1 = this.X0Min;
var xn = this.X0Max;
var w = xn - x1;
if (this.plotToEdge) {
dx = (items<=1) ? (w/2) : (w / (items-1));
adj = (items<=1) ? 0 : dx;
} else {
dx = (items<=1) ? (w/2) : (w / items);
adj = (items<=1) ? 0 : dx/2;
}
var x = x1
var base = 0;
firstPoint = true;
for (var n = 0; n < items; n++) {
nextMissing = (null == data || (n == items-1)) ? false : ((null == data[n+1]) || ('number' != typeof data[n+1] && '' == data[n+1]) || (isNaN(data[n+1])));
nextMissing = (items == 1) ? true : nextMissing;
prevMissing = (null == data || (n == 0)) ? false : ((null == data[n-1]) || ('number' != typeof data[n-1] && '' == data[n-1]) || (isNaN(data[n-1])));
missing = (null == data) ? false : ((null == data[n]) || ('number' != typeof data[n] && '' == data[n]) || (isNaN(data[n])));
val = (null == data) ? 0 : ((null == data[n]) ? 0 : parseFloat(data[n]));
val = isNaN(val) ? 0 : parseFloat(val);
x += dx;
y = this.getPlotY(val) - this._plotTop;
if (missing) {
firstPoint = true;
} else {
path += (firstPoint ? 'M ' : 'L ') + (x-adj) + ' ' + y + ' ';
firstPoint = false;
}
}
poly.setAttribute("d",path);
poly.setAttribute("stroke",color);
if (this.linePlotStyle = null)
this.linePlotStyle = this.plotStyle
if (hasSelect && seriesNumber == this.selectedSeries) {
poly.setAttribute("style",this.linePlotStyle + this.selectedItemStyle);
}
else {
poly.setAttribute("style",this.linePlotStyle);
}
var sno = seriesNumber;
var f = new Function('evt','series','item','return zenPage.getComponent('+this.index+').chartElementClickHandler(evt,'+sno+',0);');
poly.addEventListener('click',f,false);
poly.setAttribute('id',this.makeId('el_' + sno + '_' + 0));
}

self._ZEN_SVGComponent_xyFitChart_renderPoints = function(group) {
var x,y,val;
var scount = this.getSeriesCount() - 1;
var items = this.getSeriesSize();
if (items <= 0)
return;
var xData;
var yData = new Array();
xData = this.getSeriesData(0);
for (var n = 0; n < items; n++) {
xData[n] = this.getPlotX(xData[n]);
}
yData = this.getSeriesData(1);
var color = this.getSeriesColor(0);
if (this.markersVisible) {
var marker = this.getMarkerShape(0);
}
var poly = this.document.createElementNS(SVGNS,"polyline");
poly.setAttribute("class","chart-seriesLine");
group.appendChild(poly);
var points = ''; // set of points for this line
this.X0Min = undefined;
this.X0Max = undefined;
for (var n = 0; n < items; n++) {
val = (null == yData) ? 0 : ((null == yData[n]) ? 0 : yData[n]);
x = xData[n] - this._plotLeft;
y = this.getPlotY(val) - this._plotTop;
points += x + ' ' + y + ' ';
if ((this.X0Min == undefined) || (x < this.X0Min)) {
this.X0Min = x;
}
if ((this.X0Max == undefined) || (x > this.X0Max)) {
this.X0Max = x;
}
if (this.markersVisible) {
group.appendChild(this.createMarker(1,n,x,y,color,marker));
}
}
poly.setAttribute("points",points);
poly.setAttribute("stroke",color);
poly.setAttribute("fill",'none');
poly.setAttribute("style",this.plotStyle);
}

self._ZEN_SVGComponent_xyFitChart_renderSeries = function(group) {
this.renderPoints(group);
if (this.hasFit) {
this.renderLine(group);
}
}

self._ZEN_SVGComponent_xyFitChart_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._ZEN_SVGComponent_xyFitChart_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}
self._ZEN_SVGComponent_xyFitChart__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_xyChart');
	_ZEN_SVGComponent_xyFitChart.prototype = zenCreate('_ZEN_SVGComponent_xyChart',-1);
	var p = _ZEN_SVGComponent_xyFitChart.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_SVGComponent_xyFitChart;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_xyChart) ? zenMaster._ZEN_SVGComponent_xyChart.prototype:_ZEN_SVGComponent_xyChart.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.SVGComponent.xyFitChart';
	p._type = 'xyFitChart';
	p.serialize = _ZEN_SVGComponent_xyFitChart_serialize;
	p.getSettings = _ZEN_SVGComponent_xyFitChart_getSettings;
	p.connectToController = _ZEN_SVGComponent_xyFitChart_connectToController;
	p.disconnectFromController = _ZEN_SVGComponent_xyFitChart_disconnectFromController;
	p.getController = _ZEN_SVGComponent_xyFitChart_getController;
	p.getSeriesCount = _ZEN_SVGComponent_xyFitChart_getSeriesCount;
	p.notifyView = _ZEN_SVGComponent_xyFitChart_notifyView;
	p.renderLine = _ZEN_SVGComponent_xyFitChart_renderLine;
	p.renderPoints = _ZEN_SVGComponent_xyFitChart_renderPoints;
	p.renderSeries = _ZEN_SVGComponent_xyFitChart_renderSeries;
	p.sendEventToController = _ZEN_SVGComponent_xyFitChart_sendEventToController;
	p.setControllerId = _ZEN_SVGComponent_xyFitChart_setControllerId;
}
/* EOF */