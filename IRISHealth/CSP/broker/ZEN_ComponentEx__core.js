/*** Zen Module: ZEN_ComponentEx__core ***/

self._zenClassIdx['documentView'] = '_ZEN_ComponentEx_documentView';
self._ZEN_ComponentEx_documentView = function(index,id) {
	if (index>=0) {_ZEN_ComponentEx_documentView__init(this,index,id);}
}

self._ZEN_ComponentEx_documentView__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_abstractGroup__init) ?zenMaster._ZEN_Component_abstractGroup__init(o,index,id):_ZEN_Component_abstractGroup__init(o,index,id);
	o.blockStyle = '';
	o.controller = '';
	o.controllerId = '';
	o.documentStyle = '';
	o.enclosingClass = 'dvEnclosingClass';
	o.evenRowStyle = 'background:#F8F8F8;';
	o.headerRowStyle = 'background:#E0E0FF;';
	o.oddRowStyle = '';
	o.ongetcontroller = '';
	o.ongetdata = '';
	o.ongetlayout = '';
	o.onnotifyView = '';
	o.paraStyle = '';
	o.tableBorder = false;
	o.tableStyle = '';
	o.titleStyle = '';
	o.useLayout = true;
}
function _ZEN_ComponentEx_documentView_serialize(set,s)
{
	var o = this;s[0]='842889377';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.blockStyle;s[9]=set.serializeList(o,o.children,true,'children');s[10]=o.containerStyle;s[11]=o.controller;s[12]=o.controllerId;s[13]=(o.disabled?1:0);s[14]=o.documentStyle;s[15]=(o.dragEnabled?1:0);s[16]=(o.dropEnabled?1:0);s[17]=(o.dynamic?1:0);s[18]=o.enclosingClass;s[19]=o.enclosingStyle;s[20]=o.error;s[21]=o.evenRowStyle;s[22]=o.headerRowStyle;s[23]=o.height;s[24]=(o.hidden?1:0);s[25]=o.hint;s[26]=o.hintClass;s[27]=o.hintStyle;s[28]=o.label;s[29]=o.labelClass;s[30]=o.labelDisabledClass;s[31]=o.labelStyle;s[32]=o.oddRowStyle;s[33]=o.onafterdrag;s[34]=o.onbeforedrag;s[35]=o.ondrag;s[36]=o.ondrop;s[37]=o.ongetcontroller;s[38]=o.ongetdata;s[39]=o.ongetlayout;s[40]=o.onhide;s[41]=o.onnotifyView;s[42]=o.onrefresh;s[43]=o.onshow;s[44]=o.onupdate;s[45]=o.overlayMode;s[46]=o.paraStyle;s[47]=o.renderFlag;s[48]=(o.showLabel?1:0);s[49]=o.slice;s[50]=(o.tableBorder?1:0);s[51]=o.tableStyle;s[52]=o.title;s[53]=o.titleStyle;s[54]=o.tuple;s[55]=(o.useLayout?1:0);s[56]=o.valign;s[57]=(o.visible?1:0);s[58]=o.width;
}
function _ZEN_ComponentEx_documentView_getSettings(s)
{
	s['name'] = 'string';
	s['blockStyle'] = 'style';
	s['controllerId'] = 'id';
	s['documentStyle'] = 'style';
	s['evenRowStyle'] = 'style';
	s['headerRowStyle'] = 'style';
	s['oddRowStyle'] = 'style';
	s['ongetcontroller'] = 'eventHandler';
	s['ongetdata'] = 'eventHandler';
	s['ongetlayout'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	s['paraStyle'] = 'style';
	s['tableBorder'] = 'boolean';
	s['tableStyle'] = 'style';
	s['titleStyle'] = 'style';
	s['useLayout'] = 'boolean';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_ComponentEx_documentView_connectToController = function() {
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

self._ZEN_ComponentEx_documentView_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._ZEN_ComponentEx_documentView_eval = function(data,expr,context) {
var value = '';
expr = zenGet(expr);
var prop = expr.toString();
if (prop.charAt(0)=='=') {
prop = prop.substring(1,prop.length);
if (prop.charAt(0)=='[' && prop.charAt(prop.length-1)==']') {
prop = prop.substring(1,prop.length-1);
}
if (prop!='') {
if (prop.charAt(0)=='$') {
value = zenGet(context[prop],'N/A');
}
else {
var source = data;
if (context) {
source = context.$loopVal;
}
var plist = prop.toString().split('.');
if (plist.length > 0) {
for (var n = 0; n < plist.length &&(''!==typeof source); n++) {
var pname = plist[n].toString();
var i1 = pname.indexOf('[');
var idx = '';
if (i1>=0) {
var i2 = pname.indexOf(']');
if (i2>=0) {
idx = pname.substring(i1+1,i2);
pname = pname.substring(0,i1);
}
}
if (idx==='') {
source = zenGet(source[pname]);
}
else {
source = zenGet(source[pname][idx]);
}
if (n < plist.length-1 && ('object'!=typeof source)) {
source = "";
}
}
value = source;
}
}
}
}
else {
value = prop;
}
return value;
}

self._ZEN_ComponentEx_documentView_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._ZEN_ComponentEx_documentView_getLayout = function() {
var model = null;
if (this.ongetlayout!='') {
model = zenInvokeCallbackMethod(this.ongetlayout,this,'ongetlayout');
}
return model;
}

self._ZEN_ComponentEx_documentView_getSourceData = function() {
var model = null;
if (this.ongetdata!='') {
model = zenInvokeCallbackMethod(this.ongetdata,this,'ongetdata');
}
else {
var controller = this.getController();
if (null == controller) {
this.connectToController();
controller = this.getController();
}
if (controller) {
if (controller.getContentObject) {
var data = controller.getContentObject();
if (controller.contentType=='array') {
var model = data&&data.children ? data.children : null;
}
else if (controller.contentType=='object') {
var model = data;
}
}
else {
}
}
}
return model;
}

self._ZEN_ComponentEx_documentView_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._ZEN_ComponentEx_documentView_renderChart = function(key,data,sect,context,display) {
var html = [];
var value = this.eval(data,zenGet(sect.value),context);
var style = this.paraStyle;
if (sect.namedStyle) {
style += this.resolveNamedStyle(sect.namedStyle);
}
style += zenGet(sect.style);
var cHeight = zenGet(sect.chartHeight);
cHeight = (cHeight==='') ? 100 : cHeight;
var cWidth = zenGet(sect.chartWidth);
cWidth = (cWidth==='') ? 200 : cWidth;
var comp = zenPage.createComponent('svgFrame');
comp.backgroundStyle = 'fill:none;';
comp.frameStyle = 'border:none;';
comp.height = cHeight;
comp.width = cWidth;
var chart = zenPage.createComponent('barChart');
chart.height = cHeight;
chart.width = cWidth;
chart.backgroundStyle = 'fill:transparent;stroke:none;';
chart.plotAreaStyle = 'fill:none;';
chart.labelsVisible = false;
chart.legendVisible = false;
if (!this._chartData) {
this._chartData = {};
}
var cdata = value;
if ('object' != typeof cdata) {
cdata = cdata.toString().split(',');
}
this._chartData[key] = cdata;
chart.seriesCount = 1;
chart.seriesSize = cdata.length;
chart.ongetData = 'return zenPage.getComponent('+this.index+')._chartData[\''+key+'\'];';
comp.addChild(chart);
this.addChild(comp);
html[html.length] = '<div class="dvPara" style="position:relative;'+style+'">';
html[html.length] = '<div class="zenDiv" id="zen'+comp.index+'" zen="'+comp.index+'">';
html[html.length] = '</div>';
html[html.length] = '</div>';
var chartHTML = html.join('');
var html = [];
if (display=='td') {
if (this.tableBorder) {
style = 'border-right: 1px solid #808080;border-bottom: 1px solid #808080;' + style;
}
style = 'padding:2px;' + style;
html[html.length] = '<td style="'+style+'">';
html[html.length] = chartHTML;
html[html.length] = '</td>';
}
else {
if (display=='tdg') {
var tdstyle = 'padding-right:4px;';
html[html.length] = '<td style="'+tdstyle+'">';
}
if (sect.title) {
var tstyle = this.titleStyle;
if (sect.titleNamedStyle) {
tstyle += this.resolveNamedStyle(sect.titleNamedStyle);
}
tstyle += zenGet(sect.titleStyle);
html[html.length] = '<div class="dvTitle" style="'+tstyle+'">';
html[html.length] = this.eval(data,sect.title,context);
html[html.length] = '</div>';
}
html[html.length] = '<div class="dvPara" style="position:relative;'+style+'">';
html[html.length] = chartHTML;
html[html.length] = '</div>';
if (display=='tdg') {
html[html.length] = '</td>';
}
}
return html.join('');
}

self._ZEN_ComponentEx_documentView_renderContents = function() {
if (this.getEnclosingDiv() == null) return;
for (var n = 0; n < this.children.length; n++) {
}
var layout = this.getLayout();
var data = this.getSourceData();
var html = [];
var style = this.documentStyle;
html[html.length] = '<div class="dvBody" style="'+style+'">';
if (!this.useLayout) {
var counter = {count:0};
html[html.length] = this.renderGeneric(data,0,counter);
}
else {
if (layout && layout.children) {
var key = '';
html[html.length] = this.renderList(key,data,layout.children,null,'div');
}
else {
html[html.length] = 'No layout defined.';
}
}
html[html.length] = '</div>';
this.getEnclosingDiv().innerHTML = html.join('');
var mode = zenRefreshMode;
zenRefreshMode = 0;
for (var n = 0; n < this.children.length; n++) {
if (this.children[n].getEnclosingDiv()) {
this.children[n].refreshContents(true);
}
}
zenRefreshMode = mode;
}

self._ZEN_ComponentEx_documentView_renderGeneric = function(data,level,counter) {
var html = [];
if (data) {
var indent = level * 10;
var bg = counter.count%2==0 ? 'none' : '#F0F0F0';
html[html.length] = '<div style="padding-left:'+indent+'px;background:'+bg+';">';
for (var p in data) {
counter.count++;
html[html.length] = '<div class="dvGenericTitle">' + p + '</div>';
var val = data[p];
if (val===null || val==='') {
html[html.length] = '<div class="dvGenericValue" style="color:#D08080;">' + '{none}' + '</div>';
}
else if (typeof val == 'object') {
if ('undefined' != typeof val.length) {
for (var n = 0; n < val.length; n++) {
var val2 = val[n];
if (typeof val2 == 'object') {
html[html.length] = this.renderGeneric(val2,level+1,counter);
}
else {
html[html.length] = '<div class="dvGenericValue" style="color:#8080D0;">' + val2 + '</div>';
}
}
}
else {
html[html.length] = this.renderGeneric(data[p],level+1,counter);
}
}
else {
html[html.length] = '<div class="dvGenericValue">' + data[p] + '</div>';
}
}
html[html.length] = '</div>';
}
return html.join('');
}

self._ZEN_ComponentEx_documentView_renderImage = function(key,data,sect,context,display) {
var html = [];
var src = this.eval(data,zenGet(sect.src),context);
var value = this.eval(data,zenGet(sect.value),context);
var style = this.paraStyle;
if (sect.namedStyle) {
style += this.resolveNamedStyle(sect.namedStyle);
}
style += zenGet(sect.style);
var istyle = '';
if (sect.imageNamedStyle) {
istyle += this.resolveNamedStyle(sect.imageNamedStyle);
}
istyle += zenGet(sect.imageStyle);
var repeat = this.eval(data,zenGet(sect.repeatCount,1),context);
repeat = (''===repeat) ? 1 : repeat;
if (display=='td') {
if (this.tableBorder) {
style = 'border-right: 1px solid #808080;border-bottom: 1px solid #808080;' + style;
}
style = 'padding:2px;' + style;
html[html.length] = '<td style="'+style+'">';
if (src=='') {
html[html.length] = '&#160;';
}
else {
for (var r = 0; r < repeat; r++) {
html[html.length] = '<image src="'+src+'" style="'+istyle+'"/>';
}
}
html[html.length] = '</td>';
}
else {
if (display=='tdg') {
var tdstyle = 'padding-right:4px;';
html[html.length] = '<td style="'+tdstyle+'">';
}
if (sect.title) {
var tstyle = this.titleStyle;
if (sect.titleNamedStyle) {
tstyle += this.resolveNamedStyle(sect.titleNamedStyle);
}
tstyle += zenGet(sect.titleStyle);
html[html.length] = '<div class="dvTitle" style="'+tstyle+'">';
html[html.length] = this.eval(data,sect.title,context);
html[html.length] = '</div>';
}
html[html.length] = '<div class="dvPara" style="position:relative;'+style+'">';
if (src=='') {
html[html.length] = '&#160;';
}
else {
for (var r = 0; r < repeat; r++) {
html[html.length] = '<image src="'+src+'" style="'+istyle+'"/>';
}
}
if (value!=='') {
html[html.length] = '<div style="z-index:2;position:absolute;top:5px;">';
html[html.length] = value;
html[html.length] = '</div>';
}
html[html.length] = '</div>';
if (display=='tdg') {
html[html.length] = '</td>';
}
}
return html.join('');
}

self._ZEN_ComponentEx_documentView_renderList = function(key,data,list,context,display) {
var html = [];
for (var n = 0; n < list.length; n++) {
var sect = list[n];
var type = zenGet(sect.type,'para');
var blockStyle = this.blockStyle;
if (sect.blockNamedStyle) {
blockStyle += this.resolveNamedStyle(sect.blockNamedStyle);
}
blockStyle += zenGet(sect.blockStyle);
var ckey = key + (key===''?'':':') + n;
switch (type) {
case 'table':
case 'vgroup':
case 'hgroup':
if (display=='td') {
var tdstyle = '';
if (this.tableBorder) {
tdstyle += 'border-right: 1px solid #808080;border-bottom: 1px solid #808080;';
}
html[html.length] = '<td style="'+tdstyle+'">';
}
else {
html[html.length] = '<div class="dvBlock" style="'+blockStyle+'">';
if (sect.title) {
var tstyle = this.titleStyle;
if (sect.titleNamedStyle) {
tstyle += this.resolveNamedStyle(sect.titleNamedStyle);
}
tstyle += zenGet(sect.titleStyle);
html[html.length] = '<div class="dvTitle" style="'+tstyle+'">';
html[html.length] = this.eval(data,sect.title,context);
html[html.length] = '</div>';
}
}
if (type=='table') {
var style = '';
if (this.tableBorder && display!='td') {
style += 'border-top: 1px solid #808080;border-left: 1px solid #808080;';
}
style += zenGet(this.tableStyle) + zenGet(sect.style);
html[html.length] = '<table class="dvTable" border="0" cellspacing="0" cellpadding="0" style="'+style+'">';
var hdrs = [];
var hasHeader = false;
if (sect.children && sect.children.length) {
for (var c = 0; c < sect.children.length; c++) {
var column = sect.children[c];
var hdr = zenGet(column.title);
if (hdr!=='') {
hasHeader = true;
}
else {
hdr = '&#160;';
}
hdrs[hdrs.length] = hdr;
}
}
if (hasHeader) {
var hstyle = this.headerRowStyle;
html[html.length] = '<tr style="'+hstyle+'">';
for (var c = 0; c < hdrs.length; c++) {
var thstyle = '';
if (this.tableBorder) {
thstyle = 'border-right: 1px solid #808080;border-bottom: 1px solid #808080;' + thstyle;
}
html[html.length] = '<th style="'+thstyle+'">';
html[html.length] = (hdrs[c] ? hdrs[c] : '&#160;');
html[html.length] = '</th>';
}
html[html.length] = '</tr>';
}
}
else if(type=='hgroup') {
var style = '';
style += zenGet(sect.style);
html[html.length] = '<table class="dvTable" border="0" cellspacing="0" cellpadding="0" style="'+style+'">';
}
var loop = this.eval(data,sect.value,context);
if (typeof loop == 'string') {
loop = loop.split(',');
}
var context2 = {};
for (var j = 0; j < loop.length; j++) {
if (zenGet(sect.value)!='') {
context2.$parent = context;
context2.$loopVal = loop[j];
context2.$loopNo = j;
context2.$loop = sect.value;
}
else {
context2 = context;
}
if (sect.children) {
if (type=='table') {
var rstyle = j%2==0 ? this.oddRowStyle : this.evenRowStyle;
html[html.length] = '<tr style="'+rstyle+'">';
}
var d2 = 'div';
switch(type) {
case 'table':
d2 = 'td';
break;
case 'hgroup':
d2 = 'tdg';
break;
}
html[html.length] = this.renderList(ckey,data,sect.children,context2,d2);
if (type=='table') {
html[html.length] = '</tr>';
}
}
}
if (type=='table'||type=='hgroup') {
html[html.length] = '</table>';
html[html.length] = '</div>';		// section
}
if (display=='td') {
html[html.length] = '</td>';
}
break;
case 'image':
html[html.length] = '<div class="dvBlock" style="'+blockStyle+'">';
html[html.length] = this.renderImage(ckey,data,sect,context,display);
html[html.length] = '</div>';
break;
case 'chart':
html[html.length] = '<div class="dvBlock" style="'+blockStyle+'">';
html[html.length] = this.renderChart(ckey,data,sect,context,display);
html[html.length] = '</div>';
break;
case 'para':
default:
html[html.length] = '<div class="dvBlock" style="'+blockStyle+'">';
html[html.length] = this.renderPara(ckey,data,sect,context,display);
html[html.length] = '</div>';
break;
}
}
return html.join('');
}

self._ZEN_ComponentEx_documentView_renderPara = function(key,data,sect,context,display) {
var html = [];
var style = this.paraStyle;
if (sect.namedStyle) {
style += this.resolveNamedStyle(sect.namedStyle);
}
style += zenGet(sect.style);
var value = this.eval(data,zenGet(sect.value),context);
var format = zenGet(sect.format);
if (format) {
value = zenFormatNumber(value,format);
}
if (display=='td') {
if (this.tableBorder) {
style = 'border-right: 1px solid #808080;border-bottom: 1px solid #808080;' + style;
}
style = 'padding:2px;vertical-align:top;' + style;
html[html.length] = '<td style="'+style+'">';
html[html.length] = value==='' ? '&#160;' : value;
html[html.length] = '</td>';
}
else {
if (display=='tdg') {
var tdstyle = 'padding-right:4px;vertical-align:top;';
html[html.length] = '<td style="'+tdstyle+'">';
}
if (sect.title) {
var tstyle = this.titleStyle;
if (sect.titleNamedStyle) {
tstyle += this.resolveNamedStyle(sect.titleNamedStyle);
}
tstyle += zenGet(sect.titleStyle);
html[html.length] = '<div class="dvTitle" style="'+tstyle+'">';
html[html.length] = this.eval(data,sect.title,context);
html[html.length] = '</div>';
}
html[html.length] = '<div class="dvPara" style="'+style+'">';
html[html.length] = value==='' ? '&#160;' : value;
html[html.length] = '</div>';
if (display=='tdg') {
html[html.length] = '</td>';
}
}
return html.join('');
}

self._ZEN_ComponentEx_documentView_resolveNamedStyle = function(namedStyle,data,context) {
var style = '';
var name = this.eval(data,namedStyle,context);
if (name) {
var layout = this.getLayout();
if (layout && layout.namedStyles && layout.namedStyles[name]) {
style = layout.namedStyles[name];
}
}
return style;
}

self._ZEN_ComponentEx_documentView_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._ZEN_ComponentEx_documentView_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._ZEN_ComponentEx_documentView_setProperty = function(property,value,value2) {
switch(property) {
case 'useLayout':
this[property] = value?true:false;
this.render();
break;
case 'documentStyle':
case 'titleStyle':
case 'blockStyle':
case 'paraStyle':
case 'tableStyle':
case 'headerRowStyle':
case 'oddRowStyle':
case 'evenRowStyle':
case 'tableBorder':
this[property] = value;
this.render();
break;
default:
this.invokeSuper('setProperty',arguments);
break;
}
}

self._ZEN_ComponentEx_documentView_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_ComponentEx_documentView__Loader = function() {
	zenLoadClass('_ZEN_Component_abstractGroup');
	_ZEN_ComponentEx_documentView.prototype = zenCreate('_ZEN_Component_abstractGroup',-1);
	var p = _ZEN_ComponentEx_documentView.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_ComponentEx_documentView;
	p.superClass = ('undefined' == typeof _ZEN_Component_abstractGroup) ? zenMaster._ZEN_Component_abstractGroup.prototype:_ZEN_Component_abstractGroup.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.ComponentEx.documentView';
	p._type = 'documentView';
	p.serialize = _ZEN_ComponentEx_documentView_serialize;
	p.getSettings = _ZEN_ComponentEx_documentView_getSettings;
	p.ReallyRefreshContents = _ZEN_ComponentEx_documentView_ReallyRefreshContents;
	p.connectToController = _ZEN_ComponentEx_documentView_connectToController;
	p.disconnectFromController = _ZEN_ComponentEx_documentView_disconnectFromController;
	p.eval = _ZEN_ComponentEx_documentView_eval;
	p.getController = _ZEN_ComponentEx_documentView_getController;
	p.getLayout = _ZEN_ComponentEx_documentView_getLayout;
	p.getSourceData = _ZEN_ComponentEx_documentView_getSourceData;
	p.notifyView = _ZEN_ComponentEx_documentView_notifyView;
	p.renderChart = _ZEN_ComponentEx_documentView_renderChart;
	p.renderContents = _ZEN_ComponentEx_documentView_renderContents;
	p.renderGeneric = _ZEN_ComponentEx_documentView_renderGeneric;
	p.renderImage = _ZEN_ComponentEx_documentView_renderImage;
	p.renderList = _ZEN_ComponentEx_documentView_renderList;
	p.renderPara = _ZEN_ComponentEx_documentView_renderPara;
	p.resolveNamedStyle = _ZEN_ComponentEx_documentView_resolveNamedStyle;
	p.sendEventToController = _ZEN_ComponentEx_documentView_sendEventToController;
	p.setControllerId = _ZEN_ComponentEx_documentView_setControllerId;
	p.setProperty = _ZEN_ComponentEx_documentView_setProperty;
}
/* EOF */