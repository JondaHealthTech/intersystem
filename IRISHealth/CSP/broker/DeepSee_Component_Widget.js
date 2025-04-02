/*** Zen Module: DeepSee_Component_Widget ***/

self._zenClassIdx['http://www.intersystems.com/deepsee/abstractControlPanel'] = '_DeepSee_Component_Widget_abstractControlPanel';
self._DeepSee_Component_Widget_abstractControlPanel = function(index,id) {
	if (index>=0) {_DeepSee_Component_Widget_abstractControlPanel__init(this,index,id);}
}

self._DeepSee_Component_Widget_abstractControlPanel__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.controller = '';
	o.controllerId = '';
	o.ongetcontroller = '';
	o.onnotifyView = '';
}
function _DeepSee_Component_Widget_abstractControlPanel_serialize(set,s)
{
	var o = this;s[0]='1651304131';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.containerStyle;s[9]=o.controller;s[10]=o.controllerId;s[11]=(o.dragEnabled?1:0);s[12]=(o.dropEnabled?1:0);s[13]=(o.dynamic?1:0);s[14]=o.enclosingClass;s[15]=o.enclosingStyle;s[16]=o.error;s[17]=o.height;s[18]=(o.hidden?1:0);s[19]=o.hint;s[20]=o.hintClass;s[21]=o.hintStyle;s[22]=o.label;s[23]=o.labelClass;s[24]=o.labelDisabledClass;s[25]=o.labelStyle;s[26]=o.onafterdrag;s[27]=o.onbeforedrag;s[28]=o.ondrag;s[29]=o.ondrop;s[30]=o.ongetcontroller;s[31]=o.onhide;s[32]=o.onnotifyView;s[33]=o.onrefresh;s[34]=o.onshow;s[35]=o.onupdate;s[36]=o.overlayMode;s[37]=o.renderFlag;s[38]=(o.showLabel?1:0);s[39]=o.slice;s[40]=o.title;s[41]=o.tuple;s[42]=o.valign;s[43]=(o.visible?1:0);s[44]=o.width;
}
function _DeepSee_Component_Widget_abstractControlPanel_getSettings(s)
{
	s['name'] = 'string';
	s['controllerId'] = 'id';
	s['ongetcontroller'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	this.invokeSuper('getSettings',arguments);
}

self._DeepSee_Component_Widget_abstractControlPanel_connectToController = function() {
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

self._DeepSee_Component_Widget_abstractControlPanel_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._DeepSee_Component_Widget_abstractControlPanel_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._DeepSee_Component_Widget_abstractControlPanel_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._DeepSee_Component_Widget_abstractControlPanel_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._DeepSee_Component_Widget_abstractControlPanel_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._DeepSee_Component_Widget_abstractControlPanel_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._DeepSee_Component_Widget_abstractControlPanel__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_DeepSee_Component_Widget_abstractControlPanel.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _DeepSee_Component_Widget_abstractControlPanel.prototype;
	if (null==p) {return;}
	p.constructor = _DeepSee_Component_Widget_abstractControlPanel;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%DeepSee.Component.Widget.abstractControlPanel';
	p._type = 'abstractControlPanel';
	p.serialize = _DeepSee_Component_Widget_abstractControlPanel_serialize;
	p.getSettings = _DeepSee_Component_Widget_abstractControlPanel_getSettings;
	p.ReallyRefreshContents = _DeepSee_Component_Widget_abstractControlPanel_ReallyRefreshContents;
	p.connectToController = _DeepSee_Component_Widget_abstractControlPanel_connectToController;
	p.disconnectFromController = _DeepSee_Component_Widget_abstractControlPanel_disconnectFromController;
	p.getController = _DeepSee_Component_Widget_abstractControlPanel_getController;
	p.notifyView = _DeepSee_Component_Widget_abstractControlPanel_notifyView;
	p.sendEventToController = _DeepSee_Component_Widget_abstractControlPanel_sendEventToController;
	p.setControllerId = _DeepSee_Component_Widget_abstractControlPanel_setControllerId;
}

self._zenClassIdx['http://www.intersystems.com/deepsee/widget'] = '_DeepSee_Component_Widget_widget';
self._DeepSee_Component_Widget_widget = function(index,id) {
	if (index>=0) {_DeepSee_Component_Widget_widget__init(this,index,id);}
}

self._DeepSee_Component_Widget_widget__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_dragGroup__init) ?zenMaster._ZEN_Component_dragGroup__init(o,index,id):_ZEN_Component_dragGroup__init(o,index,id);
	o.backgroundColor = '#F0F0F0';
	o.clickActions = new Array();
	o.clickActive = new Array();
	o.clickFilterSpec = '';
	o.clickTargetProperties = new Array();
	o.clickTargets = new Array();
	o.colorToolbar = '#F0F0F0';
	o.controlIndices = new Array();
	o.currFilterSpec = '';
	o.currItemNo = '';
	o.currSeriesNo = '';
	o.currValue = '';
	o.currValueName = '';
	o.dataSource = '';
	o.filterDefault = new Object();
	o.filterState = new Object();
	o.filterText = new Object();
	o.forceToolbar = false;
	o.hasInitialFilters = false;
	o.headerLayout = 'CIFT';
	o.imageClose = 'images\/MacCloseX.png';
	o.imageContract = 'images\/MacIconifyDash.png';
	o.imageExpand = 'images\/MacIconifyDash.png';
	o.imageMaximize = 'images\/MacFullScreenPlus.png';
	o.imageMinimize = 'images\/MacIconifyDash.png';
	o.isClosed = false;
	o.linkWidgetKey = '';
	o.maximized = false;
	o.opacity = '1';
	o.opacityToolbar = '1';
	o.prevHomeCol = '';
	o.prevHomeRow = '';
	o.previewMode = false;
	o.sessionCookie = '';
	o.settings = new Object();
	o.showSidebar = false;
	o.showToolbar = true;
	o.showToolbarBottomBorder = true;
	o.showToolbarOnlyWhenMaximized = false;
	o.sidebarContent = '';
	o.sidebarWidth = '25%';
	o.subtype = '';
	o.widgetKey = '';
	o.widgetLayout = '';
}
function _DeepSee_Component_Widget_widget_serialize(set,s)
{
	var o = this;s[0]='1822821506';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.backgroundColor;s[9]=o.cellAlign;s[10]=o.cellSize;s[11]=o.cellStyle;s[12]=o.cellVAlign;s[13]=(o.centerHeader?1:0);s[14]=set.serializeList(o,o.children,true,'children');s[15]=set.serializeList(o,o.clickActions,false,'clickActions');s[16]=set.serializeList(o,o.clickActive,false,'clickActive');s[17]=o.clickFilterSpec;s[18]=set.serializeList(o,o.clickTargetProperties,false,'clickTargetProperties');s[19]=set.serializeList(o,o.clickTargets,false,'clickTargets');s[20]=o.colSpan;s[21]=o.colorToolbar;s[22]=o.containerStyle;s[23]=set.serializeList(o,o.controlIndices,false,'controlIndices');s[24]=o.currFilterSpec;s[25]=o.currItemNo;s[26]=o.currSeriesNo;s[27]=o.currValue;s[28]=o.currValueName;s[29]=o.dataSource;s[30]=(o.disabled?1:0);s[31]=(o.dragEnabled?1:0);s[32]=(o.dropEnabled?1:0);s[33]=(o.dynamic?1:0);s[34]=o.enclosingClass;s[35]=o.enclosingStyle;s[36]=o.error;s[37]=set.serializeArray(o,o.filterDefault,false,'filterDefault');s[38]=set.serializeArray(o,o.filterState,false,'filterState');s[39]=set.serializeArray(o,o.filterText,false,'filterText');s[40]=(o.forceToolbar?1:0);s[41]=o.groupClass;s[42]=o.groupStyle;s[43]=(o.hasInitialFilters?1:0);s[44]=o.header;s[45]=o.headerLayout;s[46]=o.height;s[47]=(o.hidden?1:0);s[48]=o.hint;s[49]=o.hintClass;s[50]=o.hintStyle;s[51]=o.homeCol;s[52]=o.homeRow;s[53]=o.imageAppLogo;s[54]=o.imageAppLogoWidth;s[55]=o.imageClose;s[56]=o.imageCloseHover;s[57]=o.imageCloseWidth;s[58]=o.imageContract;s[59]=o.imageContractHover;s[60]=o.imageContractWidth;s[61]=o.imageExpand;s[62]=o.imageExpandHover;s[63]=o.imageExpandWidth;s[64]=o.imageMaximize;s[65]=o.imageMaximizeHover;s[66]=o.imageMaximizeWidth;s[67]=o.imageMinimize;s[68]=o.imageMinimizeHover;s[69]=o.imageMinimizeWidth;s[70]=o.imageResize;s[71]=o.imageResizeSize;s[72]=(o.isClosed?1:0);s[73]=o.label;s[74]=o.labelClass;s[75]=o.labelDisabledClass;s[76]=o.labelPosition;s[77]=o.labelStyle;s[78]=o.layout;s[79]=o.linkWidgetKey;s[80]=(o.maximized?1:0);s[81]=o.minWidth;s[82]=(o.moveEnabled?1:0);s[83]=o.onafterdrag;s[84]=o.onbeforedrag;s[85]=o.onclick;s[86]=o.onclosepending;s[87]=o.ondrag;s[88]=o.ondrop;s[89]=o.onhide;s[90]=o.onrefresh;s[91]=o.onresize;s[92]=o.onshow;s[93]=o.onupdate;s[94]=o.onwindowdrop;s[95]=o.onwindowgrab;s[96]=o.opacity;s[97]=o.opacityToolbar;s[98]=o.overlayMode;s[99]=o.prevHomeCol;s[100]=o.prevHomeRow;s[101]=(o.previewMode?1:0);s[102]=o.renderFlag;s[103]=(o.resizeEnabled?1:0);s[104]=o.rowSpan;s[105]=o.sessionCookie;s[106]=set.serializeArray(o,o.settings,false,'settings');s[107]=(o.showLabel?1:0);s[108]=(o.showSidebar?1:0);s[109]=(o.showToolbar?1:0);s[110]=(o.showToolbarBottomBorder?1:0);s[111]=(o.showToolbarOnlyWhenMaximized?1:0);s[112]=o.sidebarContent;s[113]=o.sidebarWidth;s[114]=o.slice;s[115]=o.subtype;s[116]=o.title;s[117]=o.tuple;s[118]=o.valign;s[119]=(o.visible?1:0);s[120]=o.widgetKey;s[121]=o.widgetLayout;s[122]=o.width;
}
function _DeepSee_Component_Widget_widget_getSettings(s)
{
	s['name'] = 'string';
	s['backgroundColor'] = 'color';
	s['clickActions'] = 'string';
	s['clickActive'] = 'string';
	s['clickFilterSpec'] = 'string';
	s['clickTargetProperties'] = 'string';
	s['clickTargets'] = 'string';
	s['colorToolbar'] = 'color';
	s['controlIndices'] = 'integer';
	s['currFilterSpec'] = 'string';
	s['currItemNo'] = 'integer';
	s['currSeriesNo'] = 'integer';
	s['currValue'] = 'string';
	s['currValueName'] = 'string';
	s['dataSource'] = 'string';
	s['filterDefault'] = 'string';
	s['filterState'] = 'string';
	s['filterText'] = 'string';
	s['forceToolbar'] = 'boolean';
	s['hasInitialFilters'] = 'boolean';
	s['isClosed'] = 'boolean';
	s['linkWidgetKey'] = 'integer';
	s['maximized'] = 'boolean';
	s['opacity'] = 'float';
	s['opacityToolbar'] = 'float';
	s['prevHomeCol'] = 'integer';
	s['prevHomeRow'] = 'integer';
	s['previewMode'] = 'boolean';
	s['sessionCookie'] = 'string';
	s['settings'] = 'string';
	s['showSidebar'] = 'boolean';
	s['showToolbar'] = 'boolean';
	s['showToolbarBottomBorder'] = 'boolean';
	s['showToolbarOnlyWhenMaximized'] = 'boolean';
	s['sidebarContent'] = 'html';
	s['sidebarWidth'] = 'length';
	s['subtype'] = 'string';
	s['widgetKey'] = 'integer';
	s['widgetLayout'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._DeepSee_Component_Widget_widget_adjustContentSize = function(load,width,height) {
}

self._DeepSee_Component_Widget_widget_adjustSizes = function(load) {
if (this.isResizeInProgress()) {
zenPage.setModified(true);
return;
}
var div = this.getChildDiv();
if (null == div) {
return;
}
var head = this.findComponent('header');
var main = this.findComponent('main');
var foot = this.findComponent('footer');
var side = this.findComponent('sidebar');
var sideDiv = side ? side.getEnclosingDiv() : null;
var headH = (head && head.getEnclosingDiv()) ? head.getEnclosingDiv().offsetHeight : 0;
var footH = 0;
if (foot && (''==foot.content)) {
var ft = foot.getEnclosingDiv();
if (ft) {
ft.style.display = 'none';
}
footH = 0;
}
else {
footH = 0;
}
if (head && head.children.length == 0) {
var hd = head.getEnclosingDiv();
if (hd) {
hd.style.display = 'none';
}
headH = 0;
}
else if (head) {
var hd = head.getEnclosingDiv();
if (hd) {
var iesx = div.offsetWidth-5;
iesx = (iesx < 5) ? 0 : iesx;
hd.style.width = iesx + 'px';
var state = this.getState().split(':');
var maximized = state[7];
if (maximized==0 && this.showToolbarOnlyWhenMaximized) {
hd.style.display = 'none';
headH = 0;
}
else if (this.showToolbar) {
hd.style.display = 'block';
if (this.showToolbarBottomBorder) {
hd.style.borderBottom = '';		// DTB171 - Expose default css styling
}
else {
hd.style.borderBottom = 'none';	// DTB171 - Override default to hide border
}
}
}
}
var sideW = 0;
var sidebarWidth = (this.sidebarWidth != '') ? this.sidebarWidth : '15%';		// DTB171 - Add default of 15% sidebar if it is shown with no width setting
if (this.showSidebar) {
if (sidebarWidth.toString().indexOf('%')!=-1) {
var pct = parseFloat(sidebarWidth)/100;
sideW = Math.floor(pct * div.offsetWidth);		// DTB171 - Make sure the percentage result is an integer
}
else {
sideW = parseFloat(sidebarWidth);
}
}
var adjW = 0;
var adjH = 0;
var contentHgt = div.offsetHeight - headH - footH - adjH;
contentHgt = (contentHgt < 0) ? 0 : contentHgt;
if (sideDiv) {
if (sideW <= 0) {
sideDiv.style.display = 'none';
}
else {
sideDiv.style.display = '';
sideDiv.style.width = sideW + 'px';
sideDiv.style.height = contentHgt + 'px';
if (sideDiv.offsetHeight>contentHgt) {
var sideHgtDiff = sideDiv.offsetHeight - contentHgt;
sideDiv.style.height = (contentHgt - sideHgtDiff) + 'px';
}
sideW = sideDiv.offsetWidth;
}
}
var contentWid = div.offsetWidth - sideW - adjW;
contentWid = (contentWid < 0) ? 0 : contentWid;
this.adjustContentSize(load,contentWid,contentHgt);
}

self._DeepSee_Component_Widget_widget_applyFilters = function(refresh) {
var dc = this.getDataController();
if (null == dc) return;
if (!this.getEnclosingDiv()) return;
if (dc._type == 'pivotTable') {
var pivot = dc;
if (!pivot) return;
for (var f = pivot.filters.length - 1; f >= 0 ; f--) {
if (pivot.filters[f].transient) {
pivot.filters.splice(f,1);
}
}
if (this.clickFilterSpec) {
if ('$$$CLEAR'==this.clickFilterSpec) {
this.clickFilterSpec = '';
pivot.contextFilterSpec = '';
}
else {
pivot.contextFilterSpec = this.clickFilterSpec;
}
}
var n = 0;
var filterState = this.getFilterStateArray();
var filterText = this.getFilterTextArray();
for (var f in filterState) {
var isAdvanced = true;
var value = filterState[f];
var text = filterText[f] ? filterText[f] : value;
if (''!=dc.kpi) {
var spec = f;
}
else {
var spec = this.constructMDXClause(f,value);
isAdvanced = (spec == value);
}
if ('' !== spec) {
var parm = zenPage.createComponentNS('http://www.intersystems.com/deepsee','pivotLevel');
parm.transient = true; // mark that we added this filter
parm.advanced = isAdvanced; // mark as advanced so that we can use complex spec!
parm.spec = (isAdvanced ? spec : f + '.Members');		// DP-420389
parm.value = value;
parm.text = text;
parm.key = value;
parm.caption = '';	// this gets filled in by pivotTable
parm.baseSpec = f;
pivot.filters[pivot.filters.length] = parm;
}
}
if (refresh) {
if (pivot.isDrillThrough) {
pivot.mdx = '';
}
pivot.selectedRange = '';
pivot.executeQuery(true);
}
}
else {
var filterState = this.getFilterStateArray();
var filterText = this.getFilterTextArray();
var proxy = new zenProxy();
for (var f in filterState) {
var value = filterState[f];
if ('' !== value) {
proxy[f] = value;
}
}
dc.criteria = proxy;
dc.update();
}
this.onApplyFilters(refresh);
}

self._DeepSee_Component_Widget_widget_applyPivotVariable = function(varName,value) {
var pivot = this.getDataController();
if (!pivot || !pivot.pivotVariables) {
return;
}
pivot.pivotVariables[varName.toString().toLowerCase()] = value;
pivot.executeQuery(pivot.autoExecute);
}

self._DeepSee_Component_Widget_widget_applySetting = function(action,value) {
}

self._DeepSee_Component_Widget_widget_closeWidget = function() {
this.isClosed = true;
if (this.maximized) {
this.normalize(event || window.event);
}
this.updateMenuBar();
document.getElementById(this.id).style.display = "none";
}

self._DeepSee_Component_Widget_widget_componentToJSON = function(obj,level,skip) {
try {
skip = skip ? skip : {};
level = zenGet(level,0);
if (level > 100) {
alert('componentToJSON: too many levels in JSON object');
return null;
}
var t = [];
switch (typeof obj) {
case 'boolean':
t[t.length] = obj ? 'true' : 'false';
break;
case 'string':
var text = obj.toString();
text = text.replace(/\\/g,'\\\\'); // escape any backslash
text = text.replace(/\'/g,'\\\''); // escape any single quotes
t[t.length] = '\'' + text + '\'';
break;
case 'number':
t[t.length] = obj;
break;
case 'object':
if (null == obj) {
return 'null';
}
else if (Object.prototype.toString.call( obj[p] ) === '[object Function]') {		// DTB625 - Do not test the constructor directly
return '';
}
else if (Object.prototype.toString.call( obj ) === '[object Array]') {		// DTB625 - Do not test the constructor directly
t[t.length] = '[';
for (var n = 0; n < obj.length; n++) {
var sub = this.componentToJSON(obj[n],level+1,skip);
if (null == sub) {
return null;
}
t[t.length] = ((n>0)?',':'') + sub;
}
t[t.length] = ']';
}
else {
var settings = null;
if (obj.getSettings) {
settings = {};
obj.getSettings(settings);
}
var proto = null;
if (obj._type) {
switch (obj._type) {
case 'scoreCard':
case 'scoreCardColumn':
case 'chartLegend':
case 'pivotTable':
case 'pivotLevel':
case 'queryChunk': // WAL094
proto = zenPage.createComponentNS('http://www.intersystems.com/deepsee',obj._type);
break;
default:
proto = zenPage.createComponent(obj._type);
if (obj._type=='pieChart') {
proto.labelsVisible = false;
proto.showMultiples = true; // Prodlog 110052 JSL4169
}
if (obj._type=='treeMapChart' || obj._type=='donutChart') { // JSL4169
proto.showMultiples = true; // Prodlog 110052 JSL4169
}
break;
}
}
var pc = 0;
t[t.length] = '{';
for (var p in obj) {
if ((p=='_type')&& !skip[p]) {		// DTB147 - remove _type if it is in the skip list
t[t.length] = ((pc++>0)?',':'') + p + ':\'' + obj[p] + '\'';
}
else if ((obj[p])&&('function' != typeof obj[p])) {
try {
var isArray = (Object.prototype.toString.call( obj[p] ) === '[object Array]')		// DTB625 - Do not test the constructor directly
var isType = !!(obj[p]._type);
if (!settings||settings[p]||
(obj[p] && 'object'== typeof obj[p] && (isArray || isType))) {
if ((p.indexOf('_')==-1) && !skip[p] && (!settings || settings[p]!='eventHandler')) {
if (!proto || (obj[p]!==proto[p])) {
var sub = this.componentToJSON(obj[p],level+1,skip);
if (null===sub) {
return null;
}
if (sub!=="''" && sub!='null') {
t[t.length] = ((pc++>0)?',':'') + p + ':' + sub;
}
}
}
}
}
catch(ex) {
}
}
}
t[t.length] = '}';
}
break;
case 'function':
break;
default:
break;
}
return t.join('');
}
catch(ex) {
alert('Error in componentToJSON: ' + level + "; " + ex.message);
}
return null;
}

self._DeepSee_Component_Widget_widget_constructMDXClause = function(filter,value) {
var spec = '';
if ('' !== value) {
if (filter=='$NAMEDFILTER') {
return value;
}
if (value.substr(0,8).toUpperCase()=='%SEARCH.') {
return value;
}
var isnot = false;
if (value.substr(0,5)=='%NOT ') {
value = value.substr(5);
isnot = true;
}
var isrange = value.indexOf(']:&[')>0;
if (isrange) {
spec = '%OR(' + filter + '.' + value + ')';
}
else if (value.charAt(0)=='&' && value.charAt(value.length-1) == ']') {
if (isnot) {
spec = filter + '.' + value + '.%NOT';
}
else {
spec = filter + '.' + value;
}
}
else if (value.charAt(0)=='{' && value.charAt(value.length-1) == '}') {
spec = isnot ? '(' : '%OR({';
value = value.substr(1,value.length-2);
var t = value.split('],&['); // !!!
for (var i=0;i<t.length;i++) {
var m = t[i];
if ( i>0 ) {
m = '&[' + m;
}
if (i<(t.length-1)) {
m = m + ']';
}
if (isnot) {
spec = spec + ((i>0)?',':'') + filter + '.' + m + '.%NOT';
}
else {
spec = spec + ((i>0)?',':'') + filter + '.' + m;
}
}
if (isnot) {
spec = spec + ')';
}
else {
spec = spec + '})';
}
}
}
return spec;
}

self._DeepSee_Component_Widget_widget_controlEventHandler = function(which,action,targetProp,value,text) {
if (zenPage.trace) {
alert('Control event received by: '+this.name+'\n' + '\nWhich: '+ which + '\nAction: '+ action + '\nValue: ' + value);
}
var filterState = this.getFilterStateArray();
var filterText = this.getFilterTextArray();
switch(action) {
case 'reloadDashboard':
if (zenPage.reloadDashboard) {
zenPage.reloadDashboard();
}
break;
case 'refresh':
this.applyFilters(true);
break;
case 'showListing':
this.showListing(targetProp);
break;
case 'showGeoListing':
this.showGeoListing(targetProp);
break;
case 'showDimensions':
this.showDimensions();
break;
case 'clickFilter':
this.clickFilterSpec = value;
this.applyFilters(true);
break;
case 'setFilter':
case 'applyFilter':
if ('' === targetProp) break;
if (null == filterState[targetProp]) {
var found = false;
var tpu = targetProp.toString().toUpperCase();
for (var x in filterState) {
if (x.toString().toUpperCase() == tpu) {
found = true;
targetProp = x;
break;
}
}
if (!found) {
break;
}
}
filterState[targetProp] = value;
filterText[targetProp] = text ? text : '';
this.clickFilterSpec = '';		// DTB427 - Clear previous onclick filters
this.syncFilters(targetProp,value,text);
if ('applyFilter' == action) {
this.applyFilters(true);
var master = this.getMasterWidget();
if (master) {
master.syncMaster(this);
master.syncFilters(targetProp,value);
}
if (zenPage.getSlaveList) {
var slaves = zenPage.getSlaveList(this);
for (var n = 0; n < slaves.length; n++) {
slaves[n].syncSlave(this,false);
slaves[n].syncFilters(targetProp,value);
}
}
}
break;
case 'applyVariable':
if (this.applyPivotVariable) {
var varName = targetProp.toString().toLowerCase().split('$variable.')[1];
this.applyPivotVariable(varName,value);
}
break;
case 'setRowCount':
case 'setRowSort':
case 'setColumnCount':
case 'setColumnSort':
this.applySetting(action,value);
break;
case 'showBreakdown':
this.showBreakdown(targetProp);
break;
case 'setDataSource':
value = targetProp;
case 'chooseDataSource':
var dc = this.getDataController();
if (value=='') {
var widgetDef = this.getDefinition(this.widgetKey);
value = widgetDef.dataSource;
}
if (this.dataSource!=value) {
var overrides = this.getOverrides();
var pivotOverrides = overrides['pivot'];
var msg = zenPage.SetDataSource(this,dc,value,pivotOverrides);
if (msg) {
alert(msg);
}
this.applyFilters(true);
}
break;
case 'setRowSpec':
value = targetProp;
case 'chooseRowSpec':
var dc = this.getDataController();
if (dc._type == 'pivotTable') {
dc.overrideRowSpec = value;
dc.overrideRowText = text;
if (dc.removeAllDrillLevels) {
dc.removeAllDrillLevels();
}
this.applyFilters(true);
}
break;
case 'setColumnSpec':
value = targetProp;
case 'chooseColumnSpec':
var dc = this.getDataController();
if (dc._type == 'pivotTable') {
dc.overrideColumnSpec = value;
dc.overrideColumnText = text;
this.applyFilters(true);
}
break;
case 'setChartType':
this.changeChartType(targetProp);
break;
case 'chooseChartType':
this.changeChartType(value);
break;
case 'printWidget':
if (this.exportPDF) {
if (value) {
this.exportPDF(true,false);
}
else {
this.exportPDF();
}
}
break;
default:
if (zenPage.actionHandler) {
zenPage.actionHandler(this,this.dataSource,action);
}
break;
}
this.updateControlState();
}

self._DeepSee_Component_Widget_widget_executeDrillDown = function(dataSource) {
}

self._DeepSee_Component_Widget_widget_findComponent = function(id) {
return zenPage.getComponentById(this.id + '/' + id);
}

self._DeepSee_Component_Widget_widget_getDataController = function() {
return null;
}

self._DeepSee_Component_Widget_widget_getDefinition = function(key) {
key = zenGet(key,this.widgetKey);
var widgetDef = null;
if (zenPage.getWidgetDefinition) {
widgetDef = zenPage.getWidgetDefinition(key);
}
return widgetDef;
}

self._DeepSee_Component_Widget_widget_getFilterState = function(delim1,delim2) {
delim1 = ('undefined'==typeof delim1) ? '\t' : delim1;
delim2 = ('undefined'==typeof delim2) ? '\n' : delim2;
var filterState = this.getFilterStateArray();
var state = '';
for (var f in filterState) {
var value = filterState[f];
state += f + delim1 + value + delim2;
}
return state;
}

self._DeepSee_Component_Widget_widget_getFilterStateArray = function() {
var widget = this.getMasterWidget();
if (widget && widget !== this) {
return widget.getFilterStateArray();
}
return this.filterState;
}

self._DeepSee_Component_Widget_widget_getFilterTableForPrinting = function(parms) {
var table = this.getDataController();
var filterNames = [];
var filterValues = [];
var filterLabels = [];		// DTB551
if (''!==table.kpi) {
if (table&&table.filters) {
for (var n = 0; n < table.filters.length; n++) {
var filter = table.filters[n];
if (filter.text!='') {
filterNames[filterNames.length] = this.GetKpiFilterCaption(this.dataSource,filter.spec);		// DTB367
var val = filter.text.toString();
if ('&'==val.charAt(0)) {
val = val.substring(2,val.length-1);
}
filterValues[filterValues.length] = val;
}
}
}
else {
for (var filter in this.filterText) {
var filterValue = this.filterText[filter]
if (filterValue) {
filterNames[filterNames.length] = filter;
filterValues[filterValues.length] = filterValue;
}
}
}
for (prop in table.pivotVariables) {
filterNames[filterNames.length]= prop;
filterValues[filterValues.length] = table.pivotVariables[prop];
}
}
else if ((''!=table.cubeName) && (''!=table.queryKey)) {
table.getFilterInfo(filterNames,filterValues,filterLabels);		// DTB551 - Add filter labels
table.getPivotVariableInfo(filterNames,filterValues);		// DTB489
}
for (f in filterLabels) {
if (filterLabels[f]) {
filterNames[f] = filterLabels[f];
}
}
var resolvedFilterNames = [];
var resolvedFilterName = '';
for (f in filterNames) {
resolvedFilterNames[f] = this.ResolveText(filterNames[f]);
}
var util = zenPage.getComponentById("svgUtil");
return util.prepareFilterTable(resolvedFilterNames,filterValues,parms);		// DTB405 - Pass parms through to the utility
}

self._DeepSee_Component_Widget_widget_getFilterTextArray = function() {
var widget = this.getMasterWidget();
if (widget && widget !== this) {
return widget.getFilterTextArray();
}
return this.filterText;
}

self._DeepSee_Component_Widget_widget_getMasterWidget = function() {
if (zenPage.findWidgetByKey && this.linkWidgetKey!='') {
return zenPage.findWidgetByKey(this.linkWidgetKey);
}
return null;
}

self._DeepSee_Component_Widget_widget_getOverrideSkipList = function(type) {
switch (type) {
case 'pivot':
var skip = {
autoExecute:true,
calculatedMembers:true,
changesPending:true,
columnAxisOptions:true,
columnLevels:true,
columnList:true,		// DTB375
controller:true,
controllerId:true,
crossJoinRowLimit:true,
cubeName:true,
currListingPage:true,
currPage:true,
currentQueryText:true,
dataSourceName:true,
drillLevels:true,
dropEnabled:true,
filters:true,
formatRules:true,
height:true,
hidden:true,
initialExecute:true,
kpi:true,			// DTB375
listing:true,
listingFields:true,
listingFilters:true,
listingSelect:true,
listingSortColumn:true,
listingSortDir:true,
measures:true,
parameters:true,
parent:true,
pivotVariables:true,
resolvedQueryText:true,
rowAxisOptions:true,
rowLevels:true,
selectedRange:true,
showPivotStats:true,
showStatus:true,
singleTable:true,
sortColumn:true,
sortDir:true,
superClass:true,
width:true,
window:true,
parent:true,
window:true,
};
break
case 'legend':
var skip = {
chart:true,
chartId:true,
controller:true,
controllerId:true,
parent:true,
window:true
}
break
case 'chart':
var skip = {
controller:true,
controllerId:true,
endTime:true,
height:true,
onelementClick:true,
parent:true,
selectedItem:true,
selectedItemStyle:true,
selectedRange:true,		// DTB378
selectedSeries:true,
seriesCount:true,
seriesNames:true,
seriesSize:true,
startTime:true,
superClass:true,
width:true,
window:true
}
break
}
return skip;
}

self._DeepSee_Component_Widget_widget_getOverrides = function() {
return {};
}

self._DeepSee_Component_Widget_widget_getParameterValue = function(parm) {
var value = '';
switch(parm) {
case 'CURRVALUE':
value = this.currValue;
break;
case 'VALUELIST':
value = this.currValue;
break;
case 'ROWSPEC':
break;
case 'COLUMNSPEC':
break;
case 'FILTERS':
value = encodeURIComponent(this.getFilterState());
break;
}
return value;
}

self._DeepSee_Component_Widget_widget_getSVGFrame = function() {
var svgFrameContainer = document.getElementById(this.id+'/svgFrame');
if (svgFrameContainer) {
var svgFrameId = 'svgdiv_'+svgFrameContainer.getAttribute('zen'); // magic id
return document.getElementById(svgFrameId);
}
return null;
}

self._DeepSee_Component_Widget_widget_getSettingDisplayValue = function(setting,value) {
var settingLists = this.getSettingLists(setting);
var vlist = settingLists['vlist'].split(',');
var dlist = settingLists['dlist'].split(',');
var dvalue = '';
for (var i=0; i < vlist.length; i++) {
if (value==vlist[i]) {
dvalue = dlist[i];
break;
}
}
if (dvalue) {
return dvalue;
}
else {
return value;
}
}

self._DeepSee_Component_Widget_widget_getSettingLists = function(setting) {
var settingLists = new Object();
vlist = setting.type.toString().split('^')[1];
dlist = zenGet(setting.displayList);
var valueList = vlist.toString().split(',');
var newdlist = '';
var newvlist = '';
var noCaptions = true;
for (var i=0; i < valueList.length; ++i) {
var currItem = valueList[i].toString().split(':');
if (i!=0) {
newdlist += ',';
newvlist += ',';
}
newdlist += currItem[0];
if (currItem.length>1) {
newvlist += currItem[1];
noCaptions = false;
}
else {
newvlist += currItem[0];
}
}
vlist = newvlist;
if (!noCaptions) {
dlist = newdlist;
}
settingLists['vlist'] = vlist;
settingLists['dlist'] = dlist;
return settingLists;
}

self._DeepSee_Component_Widget_widget_getSubtypeClass = function() {
return '';
}

self._DeepSee_Component_Widget_widget_hasOverrides = function() {
return false;
}

self._DeepSee_Component_Widget_widget_hideToolbar = function(flag) {
var head = this.findComponent('header');
if (head) {
var div = head.getEnclosingDiv();
if (div) {
if (this.showToolbar != !flag) {
this.showToolbar = !flag;
if (this.showToolbar) {
div.style.display = 'block';
if (this.showToolbarBottomBorder) {
div.style.borderBottom = '';		// DTB171 - Expose default css styling
}
else {
div.style.borderBottom = 'none';	// DTB171 - Override default to hide border
}
}
else {
div.style.display = 'none';
}
this.adjustSizes();
}
}
}
}

self._DeepSee_Component_Widget_widget_initializeHomeRowCol = function() {
this.prevHomeRow = this.homeRow;
this.prevHomeCol = this.homeCol;
}

self._DeepSee_Component_Widget_widget_isMasterWidget = function(widgetId) {
return (widgetId==zenPage.printMasterWidgetId);
}

self._DeepSee_Component_Widget_widget_isReady = function() {
return true;
}

self._DeepSee_Component_Widget_widget_navCloseButtonClick = function(key) {
var keyNo = '';
var keyName = '';
if (key.toString().indexOf(':')>0) {
var t = key.split(':');
key = t[0];
keyName = t[1];
keyNo = parseInt(t[1]);
}
switch(key) {
case 'widget-common-theme':
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
if (widgetDef && zenPage.DeleteTheme) {
if (confirm($$$FormatText($$$Text('Do you wish to delete the theme \'%1?\'?'),keyName))) {
var msg = zenPage.DeleteTheme(keyName);
if (msg) {
alert(msg);
}
var nav = zenPage.getNavigator();
if (nav) {
if (zen('jsonOptionWhich')) {
zen('jsonOptionWhich').value = '';
}
nav.refreshTopSheet();
}
}
}
break;
case 'widget-common-control':
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
if (widgetDef) {
if (confirm('Do you wish to delete this control?')) {
zenPage.setModified(true);
zenPage.recreateWidget(zenPage.currWidgetKey,'RemoveControl',keyNo);
}
}
break;
case 'widget-common-dataProperty':
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
if (widgetDef) {
if (confirm('Do you wish to delete this data property?')) {
widgetDef.dataProperties.splice(keyNo,1);
zenPage.setModified(true);
zenPage.recreateWidget(zenPage.currWidgetKey);
}
}
break;
}
}

self._DeepSee_Component_Widget_widget_navDataArrange = function(key,swap,final) {
var keyNo = '';
if (key.toString().indexOf(':')>0) {
var t = key.split(':');
key = t[0];
keyNo = parseInt(t[1]);
}
switch (key) {
case 'widget-common-control':
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
if (final && widgetDef && widgetDef.controls && widgetDef.controls.length) {
var oldList = widgetDef.controls;
var newList = [];
for (var n = 0; n < oldList.length; n++) {
newList[n] = oldList[n];
}
var x = newList[swap.oldPosition];
newList[swap.oldPosition] = newList[swap.newPosition];
newList[swap.newPosition] = x;
widgetDef.controls = newList;
if (widgetDef.controls[swap.newPosition].location=='dashboard') {
zenPage._forceReload = 1;
}
zenPage.setModified(true);
zenPage.recreateWidget(zenPage.currWidgetKey);
}
break;
case 'widget-common-dataProperty':
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
if (final && widgetDef && widgetDef.controls && widgetDef.controls.length) {
var oldList = widgetDef.dataProperties;
var newList = [];
for (var n = 0; n < oldList.length; n++) {
newList[n] = oldList[n];
}
var x = newList[swap.oldPosition];
newList[swap.oldPosition] = newList[swap.newPosition];
newList[swap.newPosition] = x;
widgetDef.dataProperties = newList;
zenPage.setModified(true);
zenPage.recreateWidget(zenPage.currWidgetKey);
}
break;
}
}

self._DeepSee_Component_Widget_widget_navDataChange = function(key,value,final) {
var keyNo = '';
if (key.toString().indexOf(':')>0) {
var t = key.split(':');
key = t[0];
keyNo = parseInt(t[1]);
}
var keyType = '';
if (key.toString().indexOf('/')>0) {
var t = key.split('/');
key = t[0];
keyType = t[1];
}
var kt = key.toString().split('-');
kt.splice(0,2);
var k2 = kt.join('-');
var target = kt[0];
switch(target) {
case 'portletSettings':
if (final) {
var attr = keyType;
}
case 'settings':
if (final) {
var kt = k2.toString().split('-');
if ('portletSettings'!=target) {
var attr = kt[1];
}
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
if (value===false) {
value = 0;
}
else if (value===true) {
value = 1;
}
widgetDef.properties[attr] = value;
if (attr == 'showDimensions') {
zenPage._forceReload = 1;
}
zenPage.recreateWidget(zenPage.currWidgetKey);
if (attr == 'opacity') { // JSL4483
this.setProperty('opacity',value);
}
}
break;
case 'control':
if (final) {
var kt = k2.toString().split('-');
var attr = kt[1];
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
var control = null;
if (widgetDef && widgetDef.controls && widgetDef.controls.length) {
control = widgetDef.controls[keyNo];
if (control && (control[attr]!= value)) {
var oldAction = control.action;
var newAction = (attr=='action') ? value : oldAction;
if (attr=='action') {
if ((oldAction=='setFilter' && newAction!='applyFilter') ||
(oldAction=='applyFilter' && newAction!='setFilter')) {
control.targetProperty = '';
control.targetPropertyDisplay = '';
}
}
else if ((attr=='targetProperty')||(attr=='location')) {
if (control.action=='applyFilter' || control.action=='setFilter') {
zenPage._forceReload = true;
}
}
else if (attr=='location') {
zenPage._forceReload = true;
}
control[attr] = value;
switch(attr) {
case 'action':
case 'type':
case 'location':
case 'targetProperty':
case 'activeWhen':
control[attr+'Display'] = zenPage.getNavigator().currDisplayValue;
break;
}
zenPage.recreateWidget(zenPage.currWidgetKey,'EditControl',keyNo);
}
}
}
break;
case 'theme':
if (final) {
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
if (widgetDef && widgetDef.theme!=value) {
this.resetOverrides(true);
widgetDef.theme = value;
zenPage._forceReload = true;
zenPage.recreateWidget(zenPage.currWidgetKey);
}
}
break;
case 'dataProperty':
if (final) {
var kt = k2.toString().split('-');
var attr = kt[1];
if (attr=='hidden') {
attr = 'display';
value = (value?'hidden':'');
}
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
var dp = null;
if (widgetDef && widgetDef.dataProperties && widgetDef.dataProperties.length) {
dp = widgetDef.dataProperties[keyNo];
if (dp && (dp[attr]!= value)) {
dp[attr] = value;
zenPage.recreateWidget(zenPage.currWidgetKey);
}
}
}
break;
default:
switch(k2) {
case 'dataSource':
case 'drillDownDataSource':
case 'dataLink':
var prop;
switch (key) {
case 'widget-common-drillDownDataSource':
prop = 'drillDownDataSource';
break;
case 'widget-common-dataLink':
prop = 'dataLink';
break;
default:
prop = 'dataSource';
break;
}
if (final) {
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
if (widgetDef && widgetDef[prop] != value) {
widgetDef[prop] = value;
if (prop=='dataLink') {
zenPage._forceReload = true;
}
else {
zenPage.setModified(true);
}
zenPage.recreateWidget(zenPage.currWidgetKey);
}
}
break;
case 'name':
if (final) {
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
if (widgetDef && widgetDef.name!=value) {
var model = zenPage.getDefinition();
if (model) {
for (var n = 0; n < model.widgets.length; n++) {
if (value == model.widgets[n].name) {
alert($$$Text('There is already a widget with this name','%DeepSee'));
return;
}
}
for (var n = 0; n < model.widgets.length; n++) {
if (widgetDef.name == model.widgets[n].dataLink && model.widgets[n].dataLink!=='') {
model.widgets[n].dataLink = value;
}
}
}
widgetDef.name = value;
zenPage.setModified(true);
}
}
break;
case 'title':
if (final) {
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
widgetDef.title = value;
zenPage.setModified(true);
}
this.setProperty('header',value);
break;
case 'showToolbar':
case 'showToolbarBottomBorder':		// DTB171
case 'showToolbarOnlyWhenMaximized': // WAL105
case 'sidebarContent':
case 'showSidebar':
case 'sidebarWidth':		// DTB122
case 'colorToolbar':
case 'opacityToolbar':
if (final) {
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
widgetDef[k2] = value;
zenPage.setModified(true);
}
this.setProperty(k2,value);
break;
}
break;
}
}

self._DeepSee_Component_Widget_widget_navGetContentForLevel = function(level,key,value) {
var content = { title: key, items:[] };
var keyNo = 0;
if (key.toString().indexOf(':')>0) {
var t = key.split(':');
key = t[0];
keyNo = parseInt(t[1]);
}
var keyType = '';
if (key.toString().indexOf('/')>0) {
var t = key.split('/');
key = t[0];
keyType = t[1];
}
var navigator = zenPage.getNavigator();
switch (keyType) {
case 'ColorSVG':
content.title = $$$Text('Color','%DeepSee');
content.html = navigator.getColorChooserHTML(key,value,'svg');
return content;
case 'Format':
content.title = $$$Text('Numeric Format','%DeepSee');
var list = [
{ caption:$$$Text('###','%DeepSee'), value:'###'},
{ caption:$$$Text('###.#','%DeepSee'), value:'###.#'},
{ caption:$$$Text('###.##','%DeepSee'), value:'###.##'},
{ caption:$$$Text('###.###','%DeepSee'), value:'###.###'},
{ caption:$$$Text('#,##','%DeepSee'), value:'#,##'},
{ caption:$$$Text('#,##.#','%DeepSee'), value:'#,##.#'},
{ caption:$$$Text('#,##.##','%DeepSee'), value:'#,##.##'},
{ caption:$$$Text('#,##.###','%DeepSee'), value:'#,##.###'},
{ caption:$$$Text('##.##%','%DeepSee'), value:'##.##%'},
];
content.html = navigator.getChooserListHTML(list,key,value,$$$Text('Format','%DeepSee'),$$$Text('Choose a numeric format','%DeepSee'));
return content;
}
switch (key) {
case 'WidgetSettings':
content.title = $$$Text('Widget','%DeepSee');
content.items[content.items.length] = {display:'caption', caption:$$$Text('Reset Styles','%DeepSee'), action:'select', key:'widget-common-reset', help:$$$Text('Reset the style of this widget','%DeepSee'), disabled:!this.hasOverrides()};
var widgetType = '';
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
if (widgetDef) {
content.items[content.items.length] = {display:'section', caption:$$$Text('General Settings','%DeepSee')};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Name','%DeepSee'), edit:'string', value:zenGet(widgetDef.name),	key:'widget-common-name'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Title','%DeepSee'), edit:'string', value:zenGet(widgetDef.title),	key:'widget-common-title'};
var swvalue = zenGet(widgetDef.showToolbar)==true ? $$$Text('On','%DeepSee') : $$$Text('Off','%DeepSee');
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Toolbar','%DeepSee'), action:'drill',	key:'widget-common-toolbar', value:swvalue }; // JSL4483 - change to drill
var showSidebarValue = (true==zenGet(widgetDef.showSidebar)) ? $$$Text('On','%DeepSee') : $$$Text('Off','%DeepSee');
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Sidebar','%DeepSee'), action:'drill',	key:'widget-common-sidebar', value:showSidebarValue };
content.items[content.items.length] = {display:'image-caption', caption:$$$Text('Type & Data Source','%DeepSee'), image:'deepsee/ds2_gear_44.png', action:'drill', key:'widget-common-typeAndData'};
content.items[content.items.length] = {display:'image-caption', image:'deepsee/ds2_equalizer_44.png', caption:$$$Text('Widget Settings','%DeepSee'), action:'drill', key:'widget-common-settings'};
content.items[content.items.length] = {display:'image-caption', image:'deepsee/ds2_wrench2_44.png', caption:$$$Text('Controls','%DeepSee'), action:'drill', key:'widget-common-controls', help:$$$Text('Add controls and filters to this widget','%DeepSee')};
switch (this._type) {
case 'pivot':
case 'meter':
case 'map':
content.items[content.items.length] = {display:'image-caption', image:'deepsee/ds2_target_44.png', caption:$$$Text('Data Properties','%DeepSee'), action:'drill', key:'widget-common-dataProperties', help:$$$Text('Add data properties to this widget','%DeepSee')};
break;
}
}
break;
case 'widget-common-toolbar':
content.title =  $$$Text('Toolbar Settings','%DeepSee');
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
var forceToolbar = false;
if (zenGet(widgetDef.type)=="controlPanel") forceToolbar = true;
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Toolbar','%DeepSee'), edit:'switch', value:zenGet(widgetDef.showToolbar),	key:'widget-common-showToolbar', disabled:forceToolbar };
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Bottom Border','%DeepSee'), edit:'switch', value:zenGet(widgetDef.showToolbarBottomBorder),	key:'widget-common-showToolbarBottomBorder'};		// DTB171
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Show Maximized','%DeepSee'), help:$$$Text('If on, only display toolbar when widget is maximized'), edit:'switch', value:zenGet(widgetDef.showToolbarOnlyWhenMaximized),	key:'widget-common-showToolbarOnlyWhenMaximized'};
var fillColor = navigator.transformColor(zenGet(this.colorToolbar)!="" ? this.colorToolbar : "#F0F0F0");
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Toolbar Color','%DeepSee'), action:'drill',  key:'widget-common-colorToolbar', help:$$$Text('Specify color of toolbar','%DeepSee'), valueStyle:'width:80px;border-radius:5px;border:1px solid #B0B0B0;background:'+fillColor+';'}; // JSL4479
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Toolbar Opacity','%DeepSee'), edit:'slider', value:zenGet(this.opacityToolbar),	key:'widget-common-opacityToolbar', minValue:0, maxValue:1};
break;
case 'widget-common-sidebar':		// DTB122 - add case to show the actual sidebar options
content.title = $$$Text('Sidebar Settings','%DeepSee');
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Sidebar','%DeepSee'), edit:'switch', value:this.showSidebar,key:'widget-common-showSidebar'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Sidebar Content','%DeepSee'), edit:'string', value:this.sidebarContent,key:'widget-common-sidebarContent'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Sidebar Width','%DeepSee'), edit:'string', value:this.sidebarWidth,key:'widget-common-sidebarWidth'};
break;
case 'widget-common-colorToolbar':
content.title = $$$Text('Color','%DeepSee');
content.html = navigator.getColorChooserHTML(key,value);
case 'widget-common-theme':
content.title = $$$Text('Themes','%DeepSee');
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
var theme = '';
if (widgetDef) {
theme = widgetDef.theme;
}
var options = zenPage.fetchOptionList('widget-themes','');
var list = options.children;
content.items[content.items.length] = {display:'info', caption:$$$Text('Theme','%DeepSee'), value:$$$Text('The Theme provides the base styles for this widget','%DeepSee')};
for (var n = 0; n < list.length; n++) {
var ivalue = zenGet(list[n].value);
var caption = list[n].caption ? list[n].caption : ivalue;
var style = ivalue==''?'font-style:italic;':'';
content.items[content.items.length] = {display:'value', selected:theme==ivalue, key:key+':'+ivalue, value:ivalue, action:'apply', text:caption, style:style, closeButton:(ivalue!='')};
}
break;
case 'widget-common-typeAndData':
content.title = $$$Text('Type and Data','%DeepSee');
var widgetType = '';
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
if (widgetDef) {
widgetSubtype = widgetDef.subtype;
}
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Widget Type','%DeepSee'), value:widgetSubtype, action:'drill', key:'widget-common-widgetSubtype', help:$$$Text('Set the type of this widget','%DeepSee')};
var sname = zenGet(widgetDef.dataSource).toString();
sname = sname.split('/');
sname = sname[sname.length-1];
sname = sname.split('.')[0];
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Data Source','%DeepSee'), edit:'string', value:zenGet(widgetDef.dataSource), text:sname, title:zenGet(widgetDef.dataSource), action:'popup', key:'widget-common-dataSource', help:$$$Text('Set the data source for this widget','%DeepSee'), url:'_DeepSee.UI.Dialog.finderDialog.zen?MODE=datasources', disabled:(zenGet(widgetDef.dataLink)?true:false)};
content.items[content.items.length] = {display:'caption', caption:$$$Text('Reset Data Source','%DeepSee'), action:'select', key:'widget-common-resetDataSource', help:$$$Text('Clear any local changes to the data source','%DeepSee'), disabled:(zenGet(widgetDef.localDataSource)=='')};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Link to','%DeepSee'), value:zenGet(widgetDef.dataLink), action:'drill', key:'widget-common-dataLink', help:$$$Text('Use same data source as another widget on the dashboard','%DeepSee')};
var sname = zenGet(widgetDef.drillDownDataSource).toString();
sname = sname.split('/');
sname = sname[sname.length-1];
sname = sname.split('.')[0];
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Drilldown Target','%DeepSee'), edit:'string', value:zenGet(widgetDef.drillDownDataSource),text:sname,title:zenGet(widgetDef.drillDownDataSource), action:'popup', key:'widget-common-drillDownDataSource', help:$$$Text('Dashboard to display when drilling into this widget','%DeepSee'), url:'_DeepSee.UI.Dialog.finderDialog.zen?MODE=dashboards'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Widget Theme','%DeepSee'), value:zenGet(widgetDef.theme), action:'drill', key:'widget-common-theme', help:$$$Text('Theme that supplies the base styles for this widget','%DeepSee'), text:zenGet(widgetDef.theme).split('.')[0]};
break;
case 'widget-common-dataLink':
content.title = $$$Text('Widgets','%DeepSee');
var model = zenPage.getDefinition();
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
var list = [];
list[list.length] = { caption:$$$Text('None','%DeepSee'), value:''};
if (model) {
for (var n = 0; n < model.widgets.length; n++) {
if (widgetDef.name != model.widgets[n].name && model.widgets[n].name!=='') {
list[list.length] = { value:model.widgets[n].name};
}
}
}
content.html = zenPage.getNavigator().getChooserListHTML(list,key,zenGet(widgetDef.dataLink),$$$Text('Link To','%DeepSee'),$$$Text('Choose a widget to link to','%DeepSee'));
break;
case 'widget-common-widgetSubtype':
content.title = $$$Text('Widget Type','%DeepSee');
var widgetType = '';
var widgetSubtype = '';
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
if (widgetDef) {
widgetType = widgetDef.type;
widgetSubtype = widgetDef.subtype;
}
var types = zenPage.getWidgetTypes();
if (types && types.children) {
for (var n = 0; n < types.children.length; n++) {
var type = types.children[n];
if (type.name == widgetType) {
if (type.children) {
content.items[content.items.length] = {display:'section', caption:type.title };
for (var j = 0; j < type.children.length; j++) {
var subtype = type.children[j];
content.items[content.items.length] = {display:'image-caption', image:subtype.image, caption:subtype.title, value:subtype.name, action:'select', key:key};
}
}
else {
content.items[content.items.length] = {display:'section', caption:type.title };
content.items[content.items.length] = {display:'image-caption', image:type.image, caption:types.children[n].title, value:type.name, action:'select', key:key};
}
}
}
}
break;
case 'widget-common-settings':
content.title = $$$Text('Widget Settings','%DeepSee');
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
var widgetProperties = [];
if (widgetDef.type=='portlet') {
widgetProperties = widgetDef.properties;
}
var options = zenPage.fetchOptionList('widget-settings',widgetDef.type+":"+widgetDef.subtype,widgetProperties);
if (options && options.children && options.children.length) {
var list = options.children;
for (var n = 0; n < list.length; n++) {
var setting = list[n];
if (!setting.hidden) {
var value = zenGet(widgetDef.properties[setting.value],setting.defValue);
var type = setting.type.toString().split('^')[0];
var edit = '';
var action = '';
var vlist = '';
var dlist = '';
var text = value;
var valueStyle = '';
var special = '';
var minValue = null;
var maxValue = null;
var navKey = null;
switch(type) {
case '%Boolean':
edit = 'switch';
value = (value&&value!=='0') ? true : false;
text = value;
break;
case 'ColorSVG':
action = 'drill';
special = '/ColorSVG';
text = '';
valueStyle = 'width:80px;border-radius:5px;border:1px solid #B0B0B0;background:'+value+';'
break;
case 'Format':
action = 'drill';
special = '/Format';
edit = 'string';
break;
case 'Opacity':
edit = 'slider';
minValue = 0.0;
maxValue = 1.0;
break;
case 'DRILL':
action = 'drill';
special = '/'+setting.value;
text = this.getSettingDisplayValue(setting,value);
navKey = 'widget-common-portletSettings'+special+':'+n;
break;
case 'ENUM':
edit = 'choice';
var settingLists = this.getSettingLists(setting); // WAL095 -- use helper method
vlist = settingLists['vlist'];
dlist = settingLists['dlist'];
break;
case '%String':
default:
edit = 'string';
break;
}
if (navKey==null) {
navKey = 'widget-common-settings-'+setting.value+special;
}
if (minValue != null) {
content.items[content.items.length] = {display:'caption-value-hz', edit:edit, action:action, caption:setting.caption, value:value,text:text, help:setting.hint, key:navKey,valueList:vlist, displayList:dlist, valueStyle:valueStyle};
} else {
content.items[content.items.length] = {display:'caption-value-hz', edit:edit, action:action, caption:setting.caption, value:value,text:text, help:setting.hint, key:navKey,valueList:vlist, displayList:dlist, valueStyle:valueStyle, minValue:minValue, maxValue:maxValue};
}
}
}
}
else {
content.items[content.items.length] = {display:'info', caption:$$$Text('Widget has no settings','%DeepSee')};
}
break;
case 'widget-common-portletSettings':
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
var widgetProperties = widgetDef.properties;
var options = zenPage.fetchOptionList('widget-settings',widgetDef.type+":"+widgetDef.subtype,widgetProperties);
if (options && options.children && options.children.length) {
var list = options.children;
var setting = list[keyNo];
var settingLists = this.getSettingLists(setting);
vlist = settingLists['vlist'].split(',');
dlist = settingLists['dlist'].split(',');
}
var list = [];
for (var i = 0; i < vlist.length; ++i) {
list[i] = {
"caption":dlist[i],
"value":vlist[i],
"style":''
}
}
content.title = setting.caption;
content.html = zenPage.getNavigator().getChooserListHTML(list,'','','',$$$Text('Choose a value for this setting','%DeepSee'));
break;
case 'widget-common-controls':
content.title = $$$Text('Controls','%DeepSee');
content.headerButtons = [
{key:'widget-common-controlAdd', caption:$$$Text('Add Control','%DeepSee'), image:'deepsee/ds2_plus_44_w.png'}
];
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
if (widgetDef && widgetDef.controls.length == 0) {
content.items[content.items.length] = {display:'info', caption:$$$Text('Widget has no Controls','%DeepSee'), value:$$$Text('Press the Add button to add a Control','%DeepSee'),captionStyle:'color:darkred;white-space: normal;width:260px;', style:'height:150px;'};
}
if (widgetDef && widgetDef.controls) {
for (var n = 0; n < widgetDef.controls.length; n++) {
var control = widgetDef.controls[n];
var image = 'deepsee/ds2_wrench2_44.png';
var caption = control.label;
switch(control.action) {
case 'refresh':
caption = caption ? caption : $$$Text('Refresh');
break;
case 'printWidget':
caption = caption ? caption : $$$Text('Print Widget');
break;
case 'showListing':
caption = caption ? caption : $$$Text('Show Listing');
break;
}
if (caption==='') {
caption = control.action;
}
content.items[content.items.length] = {display:'image-caption', image:image, caption:caption, action:'drill', key:'widget-common-control:'+n, canDrag:true, closeButton:true};
}
}
break;
case 'widget-common-control':
content.title = $$$Text('Control','%DeepSee');
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
var control = null;
if (widgetDef && widgetDef.controls && widgetDef.controls.length) {
control = widgetDef.controls[keyNo];
}
if (control) {
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Label','%DeepSee'), value:zenGet(control.label), edit:'string', action:'drill', key:'widget-common-control-label:'+keyNo, help:$$$Text('Label to display for this control','%DeepSee')};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Action','%DeepSee'), value:zenGet(control.action), action:'drill', key:'widget-common-control-action:'+keyNo, help:$$$Text('Define what this control does','%DeepSee'), text:zenGet(control.actionDisplay)};
switch(control.action) {
case 'setFilter':
case 'applyFilter':
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Filter','%DeepSee'), value:zenGet(control.targetProperty), action:'drill', key:'widget-common-control-targetProperty:'+keyNo, help:$$$Text('Filter to apply the action to','%DeepSee'), text:zenGet(control.targetPropertyDisplay)};
break;
case 'applyVariable':
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Pivot Variable','%DeepSee'), value:zenGet(control.targetProperty), action:'drill', key:'widget-common-control-targetProperty:'+keyNo, help:$$$Text('Pivot variable to apply the action to','%DeepSee'), text:zenGet(control.targetPropertyDisplay)};
break;
case 'viewDashboard':
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Dashboard','%DeepSee'), edit:'string', value:zenGet(control.targetProperty), action:'popup', key:'widget-common-control-targetProperty:'+keyNo, help:$$$Text('Dashboard to navigate to','%DeepSee'), url:'_DeepSee.UI.Dialog.finderDialog.zen?MODE=dashboards'};
break;
case 'setDataSource':
var sname = zenGet(control.targetProperty).toString();
sname = sname.split('/');
sname = sname[sname.length-1];
sname = sname.split('.')[0];
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('DataSource','%DeepSee'), edit:'string', value:zenGet(control.targetProperty), text:sname, title:zenGet(control.targetProperty), action:'popup', key:'widget-common-control-targetProperty:'+keyNo, help:$$$Text('Set the alternate data source for this control','%DeepSee'), url:'_DeepSee.UI.Dialog.finderDialog.zen?MODE=datasources'};
break;
case 'chooseDataSource':
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('DataSource List','%DeepSee'), value:zenGet(control.targetProperty), edit:'string', key:'widget-common-control-targetProperty:'+keyNo, help:$$$Text('Term list supplying the list of data sources','%DeepSee'), action:'popup', url:'_DeepSee.UI.Dialog.finderDialog.zen?MODE=termlists'};
break;
case 'setRowSpec':
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Row Spec','%DeepSee'), edit:'string', value:zenGet(control.targetProperty), title:zenGet(control.targetProperty), action:'popup', key:'widget-common-control-targetProperty:'+keyNo, help:$$$Text('Set the alternate set of rows for this control','%DeepSee')};
break;
case 'chooseRowSpec':
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Row Spec List','%DeepSee'), value:zenGet(control.targetProperty), edit:'string', key:'widget-common-control-targetProperty:'+keyNo, help:$$$Text('Term list supplying the list of row specs','%DeepSee'), action:'popup', url:'_DeepSee.UI.Dialog.finderDialog.zen?MODE=termlists'};
break;
case 'setColumnSpec':
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Column Spec','%DeepSee'), edit:'string', value:zenGet(control.targetProperty), title:zenGet(control.targetProperty), action:'popup', key:'widget-common-control-targetProperty:'+keyNo, help:$$$Text('Set the alternate set of columns for this control','%DeepSee')};
break;
case 'chooseColumnSpec':
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Column Spec List','%DeepSee'), value:zenGet(control.targetProperty), edit:'string', key:'widget-common-control-targetProperty:'+keyNo, help:$$$Text('Term list supplying the list of column specs','%DeepSee'), action:'popup', url:'_DeepSee.UI.Dialog.finderDialog.zen?MODE=termlists'};
break;
case 'setChartType':
case 'chooseChartType':
content.items[content.items.length] = {display:'caption-value-hz', action:'drill', caption:$$$Text('Chart Type','%DeepSee'), value:zenGet(control.targetProperty), key:'widget-common-control-targetProperty:'+keyNo, help:$$$Text('Chart Type to Use','%DeepSee')};
break;
case 'navigate':
case 'newWindow':
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('URL','%DeepSee'), value:zenGet(control.targetProperty), edit:'string', key:'widget-common-control-targetProperty:'+keyNo, help:$$$Text('URL to navigate to','%DeepSee')};
break;
case 'showListing':
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Listing','%DeepSee'), value:zenGet(control.targetProperty), action:'drill', key:'widget-common-control-targetProperty:'+keyNo, help:$$$Text('Listing to display','%DeepSee'), text:zenGet(control.targetPropertyDisplay)};
break;
case 'showGeoListing':
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Geo-listing','%DeepSee'), value:zenGet(control.targetProperty), action:'drill', key:'widget-common-control-targetProperty:'+keyNo, help:$$$Text('Listing to display','%DeepSee'), text:zenGet(control.targetPropertyDisplay)};
break;
case 'showBreakdown':
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Analysis','%DeepSee'), value:zenGet(control.targetProperty), action:'drill', key:'widget-common-control-targetProperty:'+keyNo, help:$$$Text('Analysis window to show','%DeepSee'), text:zenGet(control.targetPropertyDisplay)};
break;
}
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Type','%DeepSee'), value:zenGet(control.type), action:'drill', key:'widget-common-control-type:'+keyNo, help:$$$Text('What type of control to display','%DeepSee'),text:zenGet(control.typeDisplay)};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Location','%DeepSee'), value:zenGet(control.location), action:'drill', key:'widget-common-control-location:'+keyNo, help:$$$Text('Where to place this control','%DeepSee'), text:zenGet(control.locationDisplay)};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Target','%DeepSee'), value:zenGet(control.target), edit:'string', action:'drill', key:'widget-common-control-target:'+keyNo, help:$$$Text('Name of widget to apply the action to. Use * for all, blank for this widget.','%DeepSee')};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Active When','%DeepSee'), value:zenGet(control.activeWhen), action:'drill', key:'widget-common-control-activeWhen:'+keyNo, help:$$$Text('When is this control enabled','%DeepSee'), text:zenGet(control.activeWhenDisplay)};
if (control.type=='timer') {
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Time (sec)','%DeepSee'), value:zenGet(control.timeout), edit:'string', key:'widget-common-control-timeout:'+keyNo, help:$$$Text('Time period for timer','%DeepSee')};
}
else {
if ((control.type=='custom')||(control.type=='dropdown')) {
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Value List','%DeepSee'), value:zenGet(control.valueList), edit:'string', key:'widget-common-control-valueList:'+keyNo};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Display List','%DeepSee'), value:zenGet(control.displayList), edit:'string', key:'widget-common-control-displayList:'+keyNo};
}
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Read Only','%DeepSee'), value:zenGet(control.readOnly), edit:'switch', key:'widget-common-control-readOnly:'+keyNo};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Size','%DeepSee'), value:zenGet(control.size), edit:'string', key:'widget-common-control-size:'+keyNo, help:$$$Text('Size of this control','%DeepSee')};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Tooltip','%DeepSee'), value:zenGet(control.title), edit:'string', key:'widget-common-control-title:'+keyNo, help:$$$Text('Tooltip for this control','%DeepSee')};
var url = '_DeepSee.UI.Dialog.DashboardEditDefaultValue.zen?DASHBOARD='+encodeURIComponent(zenPage.dashboardName);
url += '&DATASOURCE='+encodeURIComponent(widgetDef.dataSource);
url += '&VALUE='+encodeURIComponent(control.value);
url += '&TEXT='+encodeURIComponent(control.text);
url += '&FILTER='+encodeURIComponent(control.targetProperty);
var displayValue = ((control.text) ? control.text : zenGet(control.value));
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Default Value','%DeepSee'), value:displayValue, title:zenGet(control.value), action:'popup', key:'widget-common-control-value:'+keyNo, help:$$$Text('Default value for control','%DeepSee'),url:url};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Required','%DeepSee'), value:zenGet(control.valueRequired), edit:'switch', key:'widget-common-control-valueRequired:'+keyNo};		// DTB140 - Add switch to toggle valueRequired
}
if (control.type=='custom') {
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Custom Control','%DeepSee'), value:zenGet(control.controlClass), edit:'string', key:'widget-common-control-controlClass:'+keyNo, help:$$$Text('Type of custom control','%DeepSee')};
}
}
break;
case 'widget-common-control-label':
content.title = $$$Text('Icons','%DeepSee');
var options = zenPage.fetchOptionList('user-icons','');
var list = options.children;
content.html = zenPage.getNavigator().getIconListHTML(list,key,'');
break;
case 'widget-common-control-target':
content.title = $$$Text('Control Targets','%DeepSee');
var model = zenPage.getDefinition();
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
var control = null;
if (widgetDef && widgetDef.controls && widgetDef.controls.length) {
control = widgetDef.controls[keyNo];
}
var list = [];
list[list.length] = { caption:$$$Text('This Widget','%DeepSee'), value:''};
list[list.length] = { caption:$$$Text('All Widgets','%DeepSee'), value:'*'};
if (model) {
for (var n = 0; n < model.widgets.length; n++) {
if (widgetDef.name != model.widgets[n].name) {
list[list.length] = { value:model.widgets[n].name};
}
}
}
content.html = zenPage.getNavigator().getChooserListHTML(list,key,zenGet(control.target),$$$Text('Target','%DeepSee'),$$$Text('Choose a target for this control','%DeepSee'));
break;
case 'widget-common-control-action':
content.title = $$$Text('Control Action','%DeepSee');
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
var control = null;
if (widgetDef && widgetDef.controls && widgetDef.controls.length) {
control = widgetDef.controls[keyNo];
}
var options = zenPage.fetchOptionList('control-actions',widgetDef.dataSource);
var list = options.children;
content.html = zenPage.getNavigator().getChooserListHTML(list,key,zenGet(control.action),$$$Text('Action','%DeepSee'),$$$Text('The Action setting defines what this control does','%DeepSee'));
break;
case 'widget-common-control-targetProperty':
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
var control = null;
if (widgetDef && widgetDef.controls && widgetDef.controls.length) {
control = widgetDef.controls[keyNo];
}
switch(control.action) {
case 'applyFilter':
case 'setFilter':
content.title = $$$Text('Filter','%DeepSee');
var options = zenPage.fetchOptionList('control-filters',widgetDef.dataSource);
var list = options.children;
content.html = zenPage.getNavigator().getChooserListHTML(list,key,zenGet(control.targetProperty),$$$Text('Filter','%DeepSee'),$$$Text('Select a Filter Value','%DeepSee'));
break;
case 'applyVariable':
content.title = $$$Text('Pivot Variable','%DeepSee');
var options = zenPage.fetchOptionList('control-pivotVariables',widgetDef.dataSource);
var list = options.children;
content.html = zenPage.getNavigator().getChooserListHTML(list,key,zenGet(control.targetProperty),$$$Text('Pivot Variable','%DeepSee'),$$$Text('Select a Pivot Variable','%DeepSee'));
break;
case 'showListing':
content.title = $$$Text('Listing','%DeepSee');
var options = zenPage.fetchOptionList('control-listing',widgetDef.dataSource);
var list = options.children;
content.html = zenPage.getNavigator().getChooserListHTML(list,key,'');
break;
case 'showGeoListing':
content.title = $$$Text('GeoListing','%DeepSee');
var options = zenPage.fetchOptionList('control-geolisting',widgetDef.dataSource);
var list = options.children;
content.html = zenPage.getNavigator().getChooserListHTML(list,key,'');
break;
case 'showBreakdown':
content.title = $$$Text('Analysis','%DeepSee');
var options = zenPage.fetchOptionList('control-breakdown',widgetDef.dataSource);
var list = options.children;
content.html = zenPage.getNavigator().getChooserListHTML(list,key,'');
break;
case 'setChartType':
case 'chooseChartType':
content.title = $$$Text('Choose Chart Type','%DeepSee');
var widgetType = '';
var widgetSubtype = '';
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
if (widgetDef) {
widgetType = widgetDef.type;
widgetSubtype = widgetDef.subtype;
}
var types = zenPage.getWidgetTypes();
var list = [];
if (types && types.children) {
for (var n = 0; n < types.children.length; n++) {
var type = types.children[n];
if (type.name == widgetType) {
if (type.children) {
content.items[content.items.length] = {display:'section', caption:type.title };
for (var j = 0; j < type.children.length; j++) {
var subtype = type.children[j];
var listValue = subtype.name;
if (listValue == 'pivot') listValue = 'table';
list[list.length] = { image:subtype.image, value:listValue, style:''};
}
}
}
}
if (control.action == 'setChartType') {
var contentHTML = zenPage.getNavigator().getIconListHTML(list,key,'');
}
else if (control.action == 'chooseChartType') {
var contentHTML = zenPage.getNavigator().getMultiSelectIconListHTML(list,key,value);
}
content.html = contentHTML;
}
break;
}
break;
case 'widget-common-control-location':
content.title = $$$Text('Control Location','%DeepSee');
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
var control = null;
if (widgetDef && widgetDef.controls && widgetDef.controls.length) {
control = widgetDef.controls[keyNo];
}
var list = [
{ caption:$$$Text('Widget','%DeepSee'), value:'widget',hint:$$$Text('Place this control in the widget toolbar','%DeepSee')},
{ caption:$$$Text('Dashboard','%DeepSee'), value:'dashboard',hint:$$$Text('Place this control in the dashboard widget list','%DeepSee')},
{ caption:$$$Text('Click','%DeepSee'), value:'click',hint:$$$Text('This control responds to clicking on the widget','%DeepSee')},
];
content.html = zenPage.getNavigator().getChooserListHTML(list,key,zenGet(control.location),$$$Text('Location','%DeepSee'),$$$Text('The Location setting defines where this control is displayed','%DeepSee'));
break;
case 'widget-common-control-type':
content.title = $$$Text('Control Type','%DeepSee');
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
var control = null;
if (widgetDef && widgetDef.controls && widgetDef.controls.length) {
control = widgetDef.controls[keyNo];
}
var list = [
{ caption:$$$Text('Auto','%DeepSee'), value:'auto',hint:$$$Text('Automatically display the best control','%DeepSee')},
{ caption:$$$Text('Search Box','%DeepSee'), value:'searchBox',hint:$$$Text('Display a search box','%DeepSee')},
{ caption:$$$Text('Dropdown','%DeepSee'), value:'dropdown',hint:$$$Text('Display a simple dropdown','%DeepSee')},
{ caption:$$$Text('Radio','%DeepSee'), value:'radioSet',hint:$$$Text('Display a simple set of radio buttons','%DeepSee')},
{ caption:$$$Text('Button','%DeepSee'), value:'button',hint:$$$Text('Display a button','%DeepSee')},
{ caption:$$$Text('Hidden','%DeepSee'), value:'hidden',hint:$$$Text('This control is hidden','%DeepSee')},
{ caption:$$$Text('Timer','%DeepSee'), value:'timer',hint:$$$Text('Invoke the control action using a timer','%DeepSee')},
{ caption:$$$Text('Custom','%DeepSee'), value:'custom',hint:$$$Text('Display a custom control','%DeepSee')},
];
content.html = zenPage.getNavigator().getChooserListHTML(list,key,zenGet(control.type),$$$Text('Type','%DeepSee'),$$$Text('The Type setting defines what type of control is displayed','%DeepSee'));
break;
case 'widget-common-control-activeWhen':
content.title = $$$Text('Active When','%DeepSee');
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
var control = null;
if (widgetDef && widgetDef.controls && widgetDef.controls.length) {
control = widgetDef.controls[keyNo];
}
var list = [
{ caption:$$$Text('Always','%DeepSee'), value:'',hint:$$$Text('Always enable the control','%DeepSee')},
{ caption:$$$Text('Item Selected','%DeepSee'), value:'itemSelected',hint:$$$Text('Only enable the control when an item is selected','%DeepSee')},
{ caption:$$$Text('1 Listing Item Selected','%DeepSee'), value:'listingSelected1',hint:$$$Text('Only enable the control when one item in a listing is selected','%DeepSee')},
{ caption:$$$Text('Listing Item Selected','%DeepSee'), value:'listingSelected',hint:$$$Text('Only enable the control when an item in a listing is selected','%DeepSee')},
];
content.html = zenPage.getNavigator().getChooserListHTML(list,key,zenGet(control.activeWhen),$$$Text('Active When','%DeepSee'),$$$Text('The Active When setting defines when the control is enabled','%DeepSee'));
break;
case 'widget-common-dataProperties':
content.title = $$$Text('Data Properties','%DeepSee');
content.headerButtons = [
{key:'widget-common-dataPropertyAdd', caption:$$$Text('Add Data Property','%DeepSee'), image:'deepsee/ds2_plus_44_w.png'}
];
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
if (widgetDef && widgetDef.dataProperties.length == 0) {
content.items[content.items.length] = {display:'info', caption:$$$Text('Widget has no Data Properties','%DeepSee'), value:$$$Text('Press the Add button to add a Data Property','%DeepSee'),captionStyle:'color:darkred;white-space: normal;width:260px;', style:'height:150px;'};
}
if (widgetDef && widgetDef.dataProperties) {
for (var n = 0; n < widgetDef.dataProperties.length; n++) {
var dp = widgetDef.dataProperties[n];
var image = 'deepsee/ds2_target_44.png';
var caption = dp.dataValue;
content.items[content.items.length] = {display:'image-caption', image:image, caption:caption, action:'drill', key:'widget-common-dataProperty:'+n, canDrag:true, closeButton:true};
}
}
break;
case 'widget-common-dataProperty':
content.title = $$$Text('Data Property','%DeepSee');
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
var dp = null;
if (widgetDef && widgetDef.dataProperties && widgetDef.dataProperties.length) {
dp = widgetDef.dataProperties[keyNo];
}
if (dp) {
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Hidden','%DeepSee'), value:zenGet(dp.display)=='hidden', edit:'switch', key:'widget-common-dataProperty-hidden:'+keyNo};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Name','%DeepSee'), value:zenGet(dp.name), edit:'string', key:'widget-common-dataProperty-name:'+keyNo, help:$$$Text('Name of this data property','%DeepSee')};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Label','%DeepSee'), value:zenGet(dp.label), edit:'string', action:'drill', key:'widget-common-dataProperty-label:'+keyNo, help:$$$Text('Label to display for this data property','%DeepSee')};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Data Value','%DeepSee'), value:zenGet(dp.dataValue), edit:'string', action:'drill', key:'widget-common-dataProperty-dataValue:'+keyNo, help:$$$Text('Data value for this property','%DeepSee')};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Value Column','%DeepSee'), value:zenGet(dp.valueColumn), edit:'switch', key:'widget-common-dataProperty-valueColumn:'+keyNo};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Format','%DeepSee'), value:zenGet(dp.format), edit:'string', action:'drill', key:'widget-common-dataProperty-format:'+keyNo, help:$$$Text('Optional formatting to apply','%DeepSee')};
}
break;
case 'widget-common-dataProperty-dataValue':
content.title = $$$Text('Properties','%DeepSee');
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
var options = zenPage.fetchOptionList('widget-property',widgetDef.dataSource);
if (options && options.children) {
var list = options.children;
content.html = navigator.getChooserListHTML(list,key,value);
}
break;
case 'widget-common-dataProperty-label':
content.title = $$$Text('Label','%DeepSee');
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
var dp = null;
if (widgetDef && widgetDef.dataProperties && widgetDef.dataProperties.length) {
dp = widgetDef.dataProperties[keyNo];
}
var list = [
{ caption:$$$Text('Auto','%DeepSee'), value:'$auto',hint:$$$Text('Select a default label automatically','%DeepSee')},
];
content.html = zenPage.getNavigator().getChooserListHTML(list,key,zenGet(dp.label),$$$Text('Label','%DeepSee'),$$$Text('Select a label for this data property','%DeepSee'));
break;
case 'widget-common-dataProperty-format':
content.title = $$$Text('Numeric Format','%DeepSee');
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
var dp = null;
if (widgetDef && widgetDef.dataProperties && widgetDef.dataProperties.length) {
dp = widgetDef.dataProperties[keyNo];
}
var list = [
{ caption:$$$Text('###','%DeepSee'), value:'###'},
{ caption:$$$Text('###.#','%DeepSee'), value:'###.#'},
{ caption:$$$Text('###.##','%DeepSee'), value:'###.##'},
{ caption:$$$Text('###.###','%DeepSee'), value:'###.###'},
{ caption:$$$Text('#,##','%DeepSee'), value:'#,##'},
{ caption:$$$Text('#,##.#','%DeepSee'), value:'#,##.#'},
{ caption:$$$Text('#,##.##','%DeepSee'), value:'#,##.##'},
{ caption:$$$Text('#,##.###','%DeepSee'), value:'#,##.###'},
{ caption:$$$Text('##.##%','%DeepSee'), value:'##.##%'},
];
content.html = navigator.getChooserListHTML(list,key,zenGet(dp.format),$$$Text('Format','%DeepSee'),$$$Text('Choose a numeric format','%DeepSee'));
break;
}
return content;
}

self._DeepSee_Component_Widget_widget_navHeaderButtonClick = function(key) {
var keyNo = '';
if (key.toString().indexOf(':')>0) {
var t = key.split(':');
key = t[0];
keyNo = parseInt(t[1]);
}
switch(key) {
case 'widget-common-controlAdd':
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
zenPage.addControlDef();
break;
case 'widget-common-dataPropertyAdd':
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
zenPage.addDataPropertyDef();
break;
}
}

self._DeepSee_Component_Widget_widget_navPopupAction = function(key,value) {
var keyNo = '';
if (key.toString().indexOf(':')>0) {
var t = key.split(':');
key = t[0];
keyNo = parseInt(t[1]);
}
switch(key) {
case 'widget-common-control-targetProperty':
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
if (widgetDef) {
control = widgetDef.controls[keyNo];
if (control) {
control.targetProperty = value;
zenPage.setModified(true);
zenPage.recreateWidget(zenPage.currWidgetKey);
}
}
break;
case 'widget-common-control-value':
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
if (widgetDef) {
control = widgetDef.controls[keyNo];
if (control) {
if ((value.defaultValue)||(''==value.defaultValue)) {
control.value = value.defaultValue;
control.text = value.defaultText;
}
else {
control.value = value;
}
zenPage.setModified(true);
zenPage._forceReload = true;
zenPage.recreateWidget(zenPage.currWidgetKey);
}
}
break;
case 'widget-common-dataSource':
case 'widget-common-drillDownDataSource':
var prop;
switch (key) {
case 'widget-common-drillDownDataSource':
prop = 'drillDownDataSource';
break;
default:
prop = 'dataSource';
break;
}
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
if (widgetDef && widgetDef[prop] != value) {
widgetDef[prop] = value;
zenPage.setModified(true);
zenPage.recreateWidget(zenPage.currWidgetKey);
}
break;
}
}

self._DeepSee_Component_Widget_widget_navSelectItem = function(key,value,which) {
var kt = key.toString().split('-');
kt.splice(0,1);
var k2 = kt.join('-');
if (which == 'select') {
switch(k2) {
case 'print-setup':
if (zenPage.showPDFOptions) {
zenPage.showPDFOptions();
}
break;
case 'common-widgetSubtype':
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
if (widgetDef) {
if (value!=widgetDef.subtype) {
if (confirm('Do you wish to change the type of this widget?')) {
this.subtype = value;
widgetDef.subtype = value;
for (var p in widgetDef.overrides) {
widgetDef.overrides[p] = '';
}
this.resetOverrides(false,false);
zenPage.setModified(true);
zenPage.recreateWidget(zenPage.currWidgetKey);
}
}
}
zenPage.getNavigator().popSheet();
break;
case 'common-reset':
if (confirm($$$Text('Do you want to reset the style of this widget?'))) {
zenPage.setModified(true);
this.resetOverrides();
}
break;
case 'common-resetDataSource':
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
if (widgetDef && widgetDef.localDataSource) {
if (confirm($$$Text('Do you want to reset the data source for this widget?'))) {
zenPage.setModified(true);
widgetDef.localDataSource = '';
widgetDef.resetDataSource = true;
zenPage.recreateWidget(zenPage.currWidgetKey);
}
}
break;
case 'common-saveToCatalog':
if (zenPage.saveWidgetToCatalog) {
zenPage.saveWidgetToCatalog();
}
break;
case 'common-saveToTheme':
if (zenPage.saveWidgetToTheme) {
zenPage.saveWidgetToTheme();
}
break;
default:
break;
}
}
}

self._DeepSee_Component_Widget_widget_normalize = function(event) {
this.invokeSuper('normalize',arguments);
if (zenPage.invokeAdjustSizes) {
zenPage.invokeAdjustSizes(this);
}
}

self._DeepSee_Component_Widget_widget_onApplyFilters = function(refresh) {
}

self._DeepSee_Component_Widget_widget_onSetHighlight = function(flag) {
}

self._DeepSee_Component_Widget_widget_onloadHandler = function() {
for (var n = 0; n < this.controlIndices.length; n++) {
var control = zenPage.getComponent(this.controlIndices[n]);
if (control && control.name == 'applyVariable') {
control.onchangeHandler(); // JSL4419
}
}
this.adjustSizes(true);
this.updateControlState();
if (this.hasInitialFilters) {
var dc = this.getDataController();
var initialExecute = (dc._type=="pivotTable") ? dc.initialExecute : true;
this.applyFilters(initialExecute);
this.hasInitialFilters = false;
}
this.setProperty('opacity',this.opacity); // JSL4483
this.setProperty('backgroundColor',this.backgroundColor); // JSL4483
var legendDiv = document.getElementById(this.id+'/chartLegend'); // JSL4503
if (legendDiv != null) { // JSL4503
dragGroupDiv = this.getEnclosingDiv(); // JSL4503
if (dragGroupDiv != null && dragGroupDiv._transparent) { // JSL4503
dragGroupDiv.style.background = 'transparent'; // JSL4503
} // JSL4503
} // JSL4503
return this.invokeSuper('onloadHandler',arguments);
}

self._DeepSee_Component_Widget_widget_openWidget = function() {
document.getElementById(this.id).style.display = "block";
this.isClosed = false;
this.updateMenuBar();
}

self._DeepSee_Component_Widget_widget_prepareSvgPrintParameters = function(parms) {
var util = zen('svgUtil');
if (parms.PAGESIZE) {
var printPageUnit = parms.PAGESIZE.substring(parms.PAGESIZE.indexOf(' ')+1);
}
else {
var printPageUnit = 'pt';
}
parms.marginLeft = (parms.MARGINLEFT) ? util.convertSizeToPoint(parms.MARGINLEFT + printPageUnit).value+'pt' : '36pt';
parms.marginRight = (parms.MARGINRIGHT) ? util.convertSizeToPoint(parms.MARGINRIGHT + printPageUnit).value+'pt' : '36pt';
parms.marginTop = (parms.MARGINTOP) ? util.convertSizeToPoint(parms.MARGINTOP + printPageUnit).value+'pt' : '36pt';
parms.marginBottom = (parms.MARGINBOTTOM) ? util.convertSizeToPoint(parms.MARGINBOTTOM + printPageUnit).value+'pt' : '36pt';
if (parms.PAGESIZE) {
var printPageSize = parms.PAGESIZE.substring(0,parms.PAGESIZE.indexOf(' '));
if ('landscape'==parms.ORIENTATION) {
parms.pageWidth = printPageSize.substring(printPageSize.indexOf('x')+1) + printPageUnit;
parms.pageHeight = printPageSize.substring(0,printPageSize.indexOf('x')) + printPageUnit;
}
else {
parms.pageWidth = printPageSize.substring(0,printPageSize.indexOf('x')) + printPageUnit;
parms.pageHeight = printPageSize.substring(printPageSize.indexOf('x')+1) + printPageUnit;
}
}
else {
parms.pageWidth = '8.5in';
parms.pageHeight = '11in';
}
if (parms.TITLE) {
var resolvedTitle = this.ResolveText(parms.TITLE)		// DTB555 - Resolve translated text from the client
var printTitle = {caption:resolvedTitle,
style:{
fontWeight:"bold",
fontSize:"12pt",
textAlign:"left",
padding:"2pt"}
};
var foPrintTitle = util.buildFOBlock(printTitle);
}
if (('on' == parms.SUBTITLEON) && ('' != parms.SUBTITLE)) {
var resolvedSubtitle = this.ResolveText(parms.SUBTITLE)		// DTB555 - Resolve translated text from the client
var printSubtitle = {caption:resolvedSubtitle,
style:{
fontWeight:"bold",
fontSize:"8pt",
textAlign:"left",
padding:"2pt"}
};
var foPrintSubtitle = util.buildFOBlock(printSubtitle);
}
if ('on' == parms.SHOWUSER) {
var printUser = {caption:zenPage.userName,
style:{
fontWeight:"bold",
fontSize:"8pt",
textAlign:"left",
padding:"2pt"}
};
var foPrintUser = util.buildFOBlock(printUser);
}
if ('on' == parms.SHOWDATE) {
var dateObj = new Date;
var printDate = {caption:dateObj.toLocaleString(),
style:{
fontWeight:"bold",
fontSize:"8pt",
textAlign:"left",
padding:"2pt"}
};
var foPrintDate = util.buildFOBlock(printDate);
}
var filterTableStyle = (parms.FILTERTABLESTYLE) ? util.parseCssStyleString(parms.FILTERTABLESTYLE) : {};
var filterTitle = {caption:$$$Text("Filter Values"),
style:{
backgroundColor:((filterTableStyle['background-color']) ? filterTableStyle['background-color'] :'#B9B9B9'),
fontWeight:((filterTableStyle['font-weight']) ? filterTableStyle['font-weight'].trim() :'bold'),
fontSize:((filterTableStyle['font-size']) ? util.convertSizeToPoint(filterTableStyle['font-size']).value+'pt' :'8pt'),
textAlign:((filterTableStyle['text-align']) ? filterTableStyle['text-align'].trim() :"center"),
padding:((filterTableStyle['padding']) ? util.convertSizeToPoint(filterTableStyle['padding']).value+'pt' :'2pt'),
color:(filterTableStyle['color'] ? filterTableStyle['color'] : '') }
};
if (filterTableStyle['font-style']) {
filterTitle.style.fontStyle = filterTableStyle['font-style'];
}
if (filterTableStyle['font-family']) {
filterTitle.style.fontFamily = filterTableStyle['font-family'];
}
var postFilterSpacer = {caption:"",
style:{padding:"2pt"}
};
var foFilterTable = '';
if ((parms.filterTable)&&(parms.filterTable.rows)&&(parms.filterTable.rows.length)) {
foFilterTable = util.buildFOBlock(filterTitle) +'\n'+
util.buildFOTable(parms.filterTable) +'\n'+
util.buildFOBlock(postFilterSpacer);
}
if (parms.printMultiple) {
parms.title = zenPage.getDefinition().title;
if (typeof foPrintTitle == 'undefined') {
var widgetTitle = {caption:this.getDefinition().title,
style:{
fontWeight:"bold",
fontSize:"8pt",
textAlign:"left",
padding:"2pt"}
};
var foPrintTitle = util.buildFOBlock(widgetTitle);
}
}
parms.foIntro = ((typeof foPrintTitle != 'undefined') ? foPrintTitle : '') +
((typeof foPrintSubtitle != 'undefined') ? '\n' + foPrintSubtitle : '') +
((typeof foPrintUser != 'undefined') ? '\n' + foPrintUser : '') +
((typeof foPrintDate != 'undefined') ? '\n' + foPrintDate : '') +
((typeof foFilterTable != 'undefined') ? '\n' + foFilterTable : '')		// DTB385 - Check for the correct item!
;
}

self._DeepSee_Component_Widget_widget_printSVGContent = function(svgFrameId,parms,svgContent,filename) {
if (!parms) {
var parms = {};
}
var util = zenPage.getComponentById("svgUtil");
var isMasterWidget = this.isMasterWidget(this.id);		// DTB252 - check to see if the page settings are expected from this widget
if (!filename) {
var name = this.id + '-print'+zenPage.tempFileToken;	// DTB252 - Normalize the file name to the widget ID. DTB355 - Add session-derived token
}
else {
var name = filename;
}
var fullName = util.makeSVGFileName(name+".xsl");
parms.fileName = fullName;
if (!parms.printMultiple) {
var outName = util.makeSVGFileName(name+".pdf");
}
if (parms.printMultiple) {
if (isMasterWidget) {
var parsedWidth = util.parseSize(parms.pageWidth);
var parsedHeight = util.parseSize(parms.pageHeight);
zenPage.printPageSize = parsedWidth.value + 'x' + parsedHeight.value + ' ' + parsedWidth.units;
zenPage.printPageOrientation = 'portrait';		// Always assume portrait orientation in svg printing
zenPage.printMarginLeft = (parseFloat(parms.marginLeft)/72)+'in';
zenPage.printMarginRight = (parseFloat(parms.marginRight)/72)+'in';
zenPage.printMarginTop = (parseFloat(parms.marginTop)/72)+'in';
zenPage.printMarginBottom = (parseFloat(parms.marginBottom)/72)+'in';
}
else {
parms.marginLeft = (zenPage.printMarginLeft) ? util.convertSizeToPoint(zenPage.printMarginLeft).value+'pt' : '36pt';
parms.marginRight = (zenPage.printMarginRight) ? util.convertSizeToPoint(zenPage.printMarginRight).value+'pt' : '36pt';
parms.marginTop = (zenPage.printMarginTop) ? util.convertSizeToPoint(zenPage.printMarginTop).value+'pt' : '36pt';
parms.marginBottom = (zenPage.printMarginBottom) ? util.convertSizeToPoint(zenPage.printMarginBottom).value+'pt' : '36pt';
var pageSizeString = zenPage.printPageSize;
var pageSize = pageSizeString.substring(0,pageSizeString.indexOf(' '));
var pageUnit = pageSizeString.substring(pageSizeString.indexOf(' ')+1);
if ('portrait'==zenPage.printPageOrientation) {
parms.pageWidth = pageSize.substring(0,pageSize.indexOf('x')) + pageUnit;
parms.pageHeight = pageSize.substring(pageSize.indexOf('x')+1) + pageUnit;		// DTB263 - Add unit
}
else {
parms.pageWidth = pageSize.substring(pageSize.indexOf('x')+1) + pageUnit;		// DTB263 - Add unit
parms.pageHeight = pageSize.substring(0,pageSize.indexOf('x')) + pageUnit;
}
}
}
parms.imageWidth = util.calculateMaxImageWidth(parms);
parms.imageHeight = util.calculateMaxImageHeight(parms);		// DTB561 - This limits the maximum height of printable image content
parms.omitPageNumbers = !(parms.printMultiple);
if (svgContent) {
util.saveDOMToXSLFile(svgContent, parms);
}
else {
util.saveToXSLFile(svgFrameId, parms);
}
if ((outName)&&(!parms.printMultiple)) {
util.ConvertXSLToPDF(fullName,outName);
var url = '_DeepSee.UI.MDXPDF.zen';
url = url + '?FILEPDFROOT=' + encodeURIComponent(outName.split('.').slice(0,-1).join('.') || outName);
if (zenPage.pdfPreserveTempFiles) {
url += '&$NODELETE=1';
}
window.open(url,'pdf','');
}
}

self._DeepSee_Component_Widget_widget_processAppMessage = function(value) {
var messageType = value.messageType;
switch (messageType) {
case 'setSVGFrameBorder':
var svgFrame=this.getSVGFrame(); // JSL4489
if (svgFrame != null) {
svgFrame.style.border = value.border;
}
break;
default:
break;
}
}

self._DeepSee_Component_Widget_widget_raiseEventHandler = function(action) {
if (zenPage.trace) {
alert('Widget raised event: '+this.name+'\n' + '\nAction: '+ action + '\nValue: ' + this.currValue + "\nFilter: " + this.currFilterSpec);
}
if (zenPage.dashboardEventHandler) {
for (var n = 0; n < this.clickTargets.length; n++) {
var target = this.clickTargets[n];
var taction = this.clickActions[n];
var tprop = this.clickTargetProperties[n];
var tactiveWhen = this.clickActive[n];		// DTB584
if (target == '') {
target = this.name;
}
switch(taction) {
case 'setFilter':
case 'applyFilter':
taction = 'clickFilter';
break;
}
if ((("itemSelected"==tactiveWhen) && (""!=this.currValue)) || (""==tactiveWhen)) {
var ok = zenPage.dashboardEventHandler(this,'click',this.currFilterSpec,taction,target,tprop);
}
if (!ok) {
break;
}
}
}
}

self._DeepSee_Component_Widget_widget_resetOverrides = function(themeOnly,recreate) {
}

self._DeepSee_Component_Widget_widget_resize = function(width,height) {
var spacing = 4;
if (!width.indexOf) width=(Math.floor(width)-spacing)+"px";
if (!height.indexOf) height=(Math.floor(height)-spacing)+"px";
var thisDiv = this.getEnclosingDiv();
if (thisDiv) {
thisDiv.style.width=width;
thisDiv.style.height=height;
this.adjustHandleWidth();
this.adjustChildArea();
this.onresizeHandler();
}
}

self._DeepSee_Component_Widget_widget_selectWidget = function(evt) {
if (zenPage.widgetSelected) {
evt = evt ? evt : window.event;
zenPage.widgetSelected(evt,this.widgetKey);
}
}

self._DeepSee_Component_Widget_widget_setFilterState = function(state) {
delim1 = '\t';
delim2 = '\n';
var widget = this.getMasterWidget();
if (widget && widget === this) {
return;
}
var filterState = this.getFilterStateArray();
for (var p in filterState) {
delete filterState[p];
}
var t = state.toString().split(delim2);
for (var n = 0; n < t.length; n++) {
var p = t[n].toString().split(delim1);
if (p[0]) {
filterState[p[0]] = p[1];
}
}
}

self._DeepSee_Component_Widget_widget_setHighlight = function(flag) {
var div = this.getEnclosingDiv();
if (!div) {
return;
}
var header = this.findElement('header');
if (flag) {
var prefix = '';
var who=navigator.userAgent;
if (who.indexOf("WebKit")>=0) {
prefix = '-webkit-';
}
else if (who.indexOf("Firefox")>=0) {
prefix = '-moz-';
}
var titleBarColor;
var titleBarOpacity;
var textColor;
if (zenPage.selectedTitleBarColor) {
titleBarColor = zenPage.selectedTitleBarColor;
}
else {
titleBarColor = 'rgb(53,107,141)';
}
if (zenPage.selectedTitleBarOpacity || (parseInt(zenPage.selectedTitleBarOpacity)==0)) {
titleBarOpacity = zenPage.selectedTitleBarOpacity;
}
else {
titleBarOpacity = 1;
}
if (zenPage.selectedTitleBarTextColor) {
textColor = zenPage.selectedTitleBarTextColor;
}
else {
textColor = 'white';
}
var rgba = ZLM.convertColorToRGBA(titleBarColor, titleBarOpacity);
header.style.background = 'rgba('+rgba+')';
header.style.color = textColor;
div.style.border = '2px solid ' + 'rgba('+rgba+')';
}
else {
zenPage.setTitleBarColorAndOpacity();
if (zenPage.widgetBordersToggle) {		// DTB171 - Check the page setting when deselecting a widget
div.style.border = '';				// DTB171 - Expose default css styling
}
else {
div.style.border = 'none';			// DTB171 - Override default border to remove it
}
}
this.onSetHighlight(flag);
}

self._DeepSee_Component_Widget_widget_setModifiedIfDragged = function() {
if (this.homeRow !== this.prevHomeRow || this.homeCol !== this.prevHomeCol) {
zenPage.setModified(true);
}
}

self._DeepSee_Component_Widget_widget_setOpacity = function(opacity) {
var svgFrame=this.getSVGFrame(); // JSL4489 - simplify logic, encapsulate in getSVGFrame
if (svgFrame != null) {
if (opacity < 1.0) {
svgFrame.style.background="transparent";
} else {
svgFrame.style.backgroundColor = "white";
}
}
var dragGroup = document.getElementById(this.id);
if (dragGroup) {
if (opacity < 1.0 || dragGroup._transparent) { // JSL4503 - see if someone set dragGroup to transparent as background
dragGroup.style.background="transparent";
} else {
dragGroup.style.backgroundColor=this.backgroundColor;
}
}
}

self._DeepSee_Component_Widget_widget_setProperty = function(property,value,value2) {
switch(property) {
case 'sidebarContent':
this.sidebarContent = value;
var side = this.findComponent('sidebar');
side.setContent(value);
break;
case 'showSidebar':
this.showSidebar = value?true:false;
var side = this.findComponent('sidebar');
side.setHidden(!this.showSidebar);
this.adjustSizes();
break;
case 'sidebarWidth':			// DTB122 - add case to handle sidebarWidth and update
this.sidebarWidth = value;
this.adjustSizes();
break;
case 'showToolbar':
this.hideToolbar(!value);
break;
case 'showToolbarBottomBorder':		// DTB171
this.showToolbarBottomBorder = value;
this.adjustSizes();
break;
case 'showToolbarOnlyWhenMaximized':	// DTB171
this.showToolbarOnlyWhenMaximized = value;
this.adjustSizes();
break;
case 'colorToolbar':
this.colorToolbar = value; // JSL4483
this.setToolbarProperty('background-color',value);
break;
case 'opacityToolbar':
this.opacityToolbar = value; // JSL4483
this.setToolbarProperty('opacity', value);
break;
case 'opacity':
this.setOpacity(value);	// JSL4483
break;
case 'backgroundColor':
this.backgroundColor = value; // JSL4483
this.setOpacity(this.opacity);
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._DeepSee_Component_Widget_widget_setToolbarProperty = function(property,value) {
var id=this.id; // our widget id
var divToolBar = document.getElementById(id+'/bkgheader');
if (divToolBar) {
divToolBar.style[property] = value;
}
}

self._DeepSee_Component_Widget_widget_showBreakdown = function(analysisClass) {
}

self._DeepSee_Component_Widget_widget_showDimensions = function() {
}

self._DeepSee_Component_Widget_widget_showDragHeader = function(flag) {
var header = this.findElement('header');
if (flag) {
this.resetWindowChrome();
if (!zenPage.dashboardResize) this.disableResize();
}
else {
this.removeWindowChrome();
if (zenPage.dashboardResize) this.enableResize();
}
}

self._DeepSee_Component_Widget_widget_showGeoListing = function(listing) {
}

self._DeepSee_Component_Widget_widget_showListing = function(listing) {
}

self._DeepSee_Component_Widget_widget_syncFilters = function(targetProp,value,text) {
var head = this.findComponent('header');
var bind = 'filter' + "/" + targetProp;
if (head) {
for (var n = 0; n < head.children.length; n++) {
var child = head.children[n];
if (child && child.dataBinding && bind==child.dataBinding) {
if ((zenPage._sourceControl==null)||(zenPage._sourceControl != child)) {
child.setValue(value);
if (child.setTextValue && zenPage._sourceControl && zenPage._sourceControl.text) {
child.setTextValue(zenPage._sourceControl.text);
}
else if (child.setTextValue && typeof text != 'undefined') {
child.setTextValue(text);
}
}
}
}
}
}

self._DeepSee_Component_Widget_widget_syncMaster = function(slave) {
this.applyFilters(true);
if (zenPage.getSlaveList) {
var slaves = zenPage.getSlaveList(this);
for (var n = 0; n < slaves.length; n++) {
if (slave !== slaves[n]) {
slaves[n].syncSlave(this,false);
}
}
}
}

self._DeepSee_Component_Widget_widget_syncSlave = function(master,dataChange) {
if (dataChange) {
this.syncSlaveData(master);
}
else {
this.applyFilters(true);
}
/*
if (zenPage.getSlaveList) {
var slaves = zenPage.getSlaveList(this);
for (var n = 0; n < slaves.length; n++) {
slaves[n].syncSlave(this,dataChange);
}
}
*/
}

self._DeepSee_Component_Widget_widget_syncSlaveData = function(master) {
var masterDC = master.getDataController();
var slaveDC = this.getDataController();
if (masterDC && slaveDC && slaveDC.copyState) {
slaveDC.copyState(masterDC);
this.applyFilters(true);
}
}

self._DeepSee_Component_Widget_widget_updateControlState = function() {
for (var n = 0; n < this.controlIndices.length; n++) {
var control = zenPage.getComponent(this.controlIndices[n]);
if (control && control.name == 'showListing') {
control.setDisabled(true);
}
}
}

self._DeepSee_Component_Widget_widget_updateMenuBar = function() {
zenPage.widgetSelected(event, "WidgetList");
this.selectWidget(event || window.event);
zenPage.getNavigator().expandHandler();
}

self._DeepSee_Component_Widget_widget_GetKpiFilterCaption = function(pKPIName,pSpec) {
	return zenClassMethod(this,'GetKpiFilterCaption','L,L','VARCHAR',arguments);
}

self._DeepSee_Component_Widget_widget_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}

self._DeepSee_Component_Widget_widget_ResolveText = function(pEncodedText) {
	return zenInstanceMethod(this,'ResolveText','L','VARCHAR',arguments);
}
self._DeepSee_Component_Widget_widget__Loader = function() {
	zenLoadClass('_ZEN_Component_dragGroup');
	_DeepSee_Component_Widget_widget.prototype = zenCreate('_ZEN_Component_dragGroup',-1);
	var p = _DeepSee_Component_Widget_widget.prototype;
	if (null==p) {return;}
	p.constructor = _DeepSee_Component_Widget_widget;
	p.superClass = ('undefined' == typeof _ZEN_Component_dragGroup) ? zenMaster._ZEN_Component_dragGroup.prototype:_ZEN_Component_dragGroup.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%DeepSee.Component.Widget.widget';
	p._type = 'widget';
	p.serialize = _DeepSee_Component_Widget_widget_serialize;
	p.getSettings = _DeepSee_Component_Widget_widget_getSettings;
	p.GetKpiFilterCaption = _DeepSee_Component_Widget_widget_GetKpiFilterCaption;
	p.ReallyRefreshContents = _DeepSee_Component_Widget_widget_ReallyRefreshContents;
	p.ResolveText = _DeepSee_Component_Widget_widget_ResolveText;
	p.adjustContentSize = _DeepSee_Component_Widget_widget_adjustContentSize;
	p.adjustSizes = _DeepSee_Component_Widget_widget_adjustSizes;
	p.applyFilters = _DeepSee_Component_Widget_widget_applyFilters;
	p.applyPivotVariable = _DeepSee_Component_Widget_widget_applyPivotVariable;
	p.applySetting = _DeepSee_Component_Widget_widget_applySetting;
	p.closeWidget = _DeepSee_Component_Widget_widget_closeWidget;
	p.componentToJSON = _DeepSee_Component_Widget_widget_componentToJSON;
	p.constructMDXClause = _DeepSee_Component_Widget_widget_constructMDXClause;
	p.controlEventHandler = _DeepSee_Component_Widget_widget_controlEventHandler;
	p.executeDrillDown = _DeepSee_Component_Widget_widget_executeDrillDown;
	p.findComponent = _DeepSee_Component_Widget_widget_findComponent;
	p.getDataController = _DeepSee_Component_Widget_widget_getDataController;
	p.getDefinition = _DeepSee_Component_Widget_widget_getDefinition;
	p.getFilterState = _DeepSee_Component_Widget_widget_getFilterState;
	p.getFilterStateArray = _DeepSee_Component_Widget_widget_getFilterStateArray;
	p.getFilterTableForPrinting = _DeepSee_Component_Widget_widget_getFilterTableForPrinting;
	p.getFilterTextArray = _DeepSee_Component_Widget_widget_getFilterTextArray;
	p.getMasterWidget = _DeepSee_Component_Widget_widget_getMasterWidget;
	p.getOverrideSkipList = _DeepSee_Component_Widget_widget_getOverrideSkipList;
	p.getOverrides = _DeepSee_Component_Widget_widget_getOverrides;
	p.getParameterValue = _DeepSee_Component_Widget_widget_getParameterValue;
	p.getSVGFrame = _DeepSee_Component_Widget_widget_getSVGFrame;
	p.getSettingDisplayValue = _DeepSee_Component_Widget_widget_getSettingDisplayValue;
	p.getSettingLists = _DeepSee_Component_Widget_widget_getSettingLists;
	p.getSubtypeClass = _DeepSee_Component_Widget_widget_getSubtypeClass;
	p.hasOverrides = _DeepSee_Component_Widget_widget_hasOverrides;
	p.hideToolbar = _DeepSee_Component_Widget_widget_hideToolbar;
	p.initializeHomeRowCol = _DeepSee_Component_Widget_widget_initializeHomeRowCol;
	p.isMasterWidget = _DeepSee_Component_Widget_widget_isMasterWidget;
	p.isReady = _DeepSee_Component_Widget_widget_isReady;
	p.navCloseButtonClick = _DeepSee_Component_Widget_widget_navCloseButtonClick;
	p.navDataArrange = _DeepSee_Component_Widget_widget_navDataArrange;
	p.navDataChange = _DeepSee_Component_Widget_widget_navDataChange;
	p.navGetContentForLevel = _DeepSee_Component_Widget_widget_navGetContentForLevel;
	p.navHeaderButtonClick = _DeepSee_Component_Widget_widget_navHeaderButtonClick;
	p.navPopupAction = _DeepSee_Component_Widget_widget_navPopupAction;
	p.navSelectItem = _DeepSee_Component_Widget_widget_navSelectItem;
	p.normalize = _DeepSee_Component_Widget_widget_normalize;
	p.onApplyFilters = _DeepSee_Component_Widget_widget_onApplyFilters;
	p.onSetHighlight = _DeepSee_Component_Widget_widget_onSetHighlight;
	p.onloadHandler = _DeepSee_Component_Widget_widget_onloadHandler;
	p.openWidget = _DeepSee_Component_Widget_widget_openWidget;
	p.prepareSvgPrintParameters = _DeepSee_Component_Widget_widget_prepareSvgPrintParameters;
	p.printSVGContent = _DeepSee_Component_Widget_widget_printSVGContent;
	p.processAppMessage = _DeepSee_Component_Widget_widget_processAppMessage;
	p.raiseEventHandler = _DeepSee_Component_Widget_widget_raiseEventHandler;
	p.resetOverrides = _DeepSee_Component_Widget_widget_resetOverrides;
	p.resize = _DeepSee_Component_Widget_widget_resize;
	p.selectWidget = _DeepSee_Component_Widget_widget_selectWidget;
	p.setFilterState = _DeepSee_Component_Widget_widget_setFilterState;
	p.setHighlight = _DeepSee_Component_Widget_widget_setHighlight;
	p.setModifiedIfDragged = _DeepSee_Component_Widget_widget_setModifiedIfDragged;
	p.setOpacity = _DeepSee_Component_Widget_widget_setOpacity;
	p.setProperty = _DeepSee_Component_Widget_widget_setProperty;
	p.setToolbarProperty = _DeepSee_Component_Widget_widget_setToolbarProperty;
	p.showBreakdown = _DeepSee_Component_Widget_widget_showBreakdown;
	p.showDimensions = _DeepSee_Component_Widget_widget_showDimensions;
	p.showDragHeader = _DeepSee_Component_Widget_widget_showDragHeader;
	p.showGeoListing = _DeepSee_Component_Widget_widget_showGeoListing;
	p.showListing = _DeepSee_Component_Widget_widget_showListing;
	p.syncFilters = _DeepSee_Component_Widget_widget_syncFilters;
	p.syncMaster = _DeepSee_Component_Widget_widget_syncMaster;
	p.syncSlave = _DeepSee_Component_Widget_widget_syncSlave;
	p.syncSlaveData = _DeepSee_Component_Widget_widget_syncSlaveData;
	p.updateControlState = _DeepSee_Component_Widget_widget_updateControlState;
	p.updateMenuBar = _DeepSee_Component_Widget_widget_updateMenuBar;
}

self._zenClassIdx['http://www.intersystems.com/deepsee/calendar'] = '_DeepSee_Component_Widget_calendar';
self._DeepSee_Component_Widget_calendar = function(index,id) {
	if (index>=0) {_DeepSee_Component_Widget_calendar__init(this,index,id);}
}

self._DeepSee_Component_Widget_calendar__init = function(o,index,id) {
	('undefined' == typeof _DeepSee_Component_Widget_widget__init) ?zenMaster._DeepSee_Component_Widget_widget__init(o,index,id):_DeepSee_Component_Widget_widget__init(o,index,id);
	o.opacity = '1';
	o.opacityToolbar = '1';
}
function _DeepSee_Component_Widget_calendar_serialize(set,s)
{
	var o = this;s[0]='1822821506';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.backgroundColor;s[9]=o.cellAlign;s[10]=o.cellSize;s[11]=o.cellStyle;s[12]=o.cellVAlign;s[13]=(o.centerHeader?1:0);s[14]=set.serializeList(o,o.children,true,'children');s[15]=set.serializeList(o,o.clickActions,false,'clickActions');s[16]=set.serializeList(o,o.clickActive,false,'clickActive');s[17]=o.clickFilterSpec;s[18]=set.serializeList(o,o.clickTargetProperties,false,'clickTargetProperties');s[19]=set.serializeList(o,o.clickTargets,false,'clickTargets');s[20]=o.colSpan;s[21]=o.colorToolbar;s[22]=o.containerStyle;s[23]=set.serializeList(o,o.controlIndices,false,'controlIndices');s[24]=o.currFilterSpec;s[25]=o.currItemNo;s[26]=o.currSeriesNo;s[27]=o.currValue;s[28]=o.currValueName;s[29]=o.dataSource;s[30]=(o.disabled?1:0);s[31]=(o.dragEnabled?1:0);s[32]=(o.dropEnabled?1:0);s[33]=(o.dynamic?1:0);s[34]=o.enclosingClass;s[35]=o.enclosingStyle;s[36]=o.error;s[37]=set.serializeArray(o,o.filterDefault,false,'filterDefault');s[38]=set.serializeArray(o,o.filterState,false,'filterState');s[39]=set.serializeArray(o,o.filterText,false,'filterText');s[40]=(o.forceToolbar?1:0);s[41]=o.groupClass;s[42]=o.groupStyle;s[43]=(o.hasInitialFilters?1:0);s[44]=o.header;s[45]=o.headerLayout;s[46]=o.height;s[47]=(o.hidden?1:0);s[48]=o.hint;s[49]=o.hintClass;s[50]=o.hintStyle;s[51]=o.homeCol;s[52]=o.homeRow;s[53]=o.imageAppLogo;s[54]=o.imageAppLogoWidth;s[55]=o.imageClose;s[56]=o.imageCloseHover;s[57]=o.imageCloseWidth;s[58]=o.imageContract;s[59]=o.imageContractHover;s[60]=o.imageContractWidth;s[61]=o.imageExpand;s[62]=o.imageExpandHover;s[63]=o.imageExpandWidth;s[64]=o.imageMaximize;s[65]=o.imageMaximizeHover;s[66]=o.imageMaximizeWidth;s[67]=o.imageMinimize;s[68]=o.imageMinimizeHover;s[69]=o.imageMinimizeWidth;s[70]=o.imageResize;s[71]=o.imageResizeSize;s[72]=(o.isClosed?1:0);s[73]=o.label;s[74]=o.labelClass;s[75]=o.labelDisabledClass;s[76]=o.labelPosition;s[77]=o.labelStyle;s[78]=o.layout;s[79]=o.linkWidgetKey;s[80]=(o.maximized?1:0);s[81]=o.minWidth;s[82]=(o.moveEnabled?1:0);s[83]=o.onafterdrag;s[84]=o.onbeforedrag;s[85]=o.onclick;s[86]=o.onclosepending;s[87]=o.ondrag;s[88]=o.ondrop;s[89]=o.onhide;s[90]=o.onrefresh;s[91]=o.onresize;s[92]=o.onshow;s[93]=o.onupdate;s[94]=o.onwindowdrop;s[95]=o.onwindowgrab;s[96]=o.opacity;s[97]=o.opacityToolbar;s[98]=o.overlayMode;s[99]=o.prevHomeCol;s[100]=o.prevHomeRow;s[101]=(o.previewMode?1:0);s[102]=o.renderFlag;s[103]=(o.resizeEnabled?1:0);s[104]=o.rowSpan;s[105]=o.sessionCookie;s[106]=set.serializeArray(o,o.settings,false,'settings');s[107]=(o.showLabel?1:0);s[108]=(o.showSidebar?1:0);s[109]=(o.showToolbar?1:0);s[110]=(o.showToolbarBottomBorder?1:0);s[111]=(o.showToolbarOnlyWhenMaximized?1:0);s[112]=o.sidebarContent;s[113]=o.sidebarWidth;s[114]=o.slice;s[115]=o.subtype;s[116]=o.title;s[117]=o.tuple;s[118]=o.valign;s[119]=(o.visible?1:0);s[120]=o.widgetKey;s[121]=o.widgetLayout;s[122]=o.width;
}
function _DeepSee_Component_Widget_calendar_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._DeepSee_Component_Widget_calendar_adjustContentSize = function(load,width,height) {
var calendar = this.findComponent('calendar');
if (calendar) {
var calendarDiv = calendar.getEnclosingDiv();
calendarDiv.style.width = width-10 + 'px';
calendarDiv.style.height = height + 'px';
var hdr = calendar.findElement('header');
var hh = (hdr) ? hdr.offsetHeight : calendar.headerHeight;
var ch = calendar.cellHeight;
switch(calendar.view) {
case 'month':
ch = Math.floor((height - parseInt(hh) - 20) / (7*3));
break;
default:
var intervals = 8;
ch = Math.floor((height - parseInt(hh) - 20) / (intervals));
break;
}
if (ch != calendar.cellHeight) {
calendar.cellHeight = ch;
calendar.refreshContents();
}
}
}

self._DeepSee_Component_Widget_calendar_applyFilter = function(name,value) {
}

self._DeepSee_Component_Widget_calendar_changeViewHandler = function() {
this.adjustSizes(false);
}

self._DeepSee_Component_Widget_calendar_GetKpiFilterCaption = function(pKPIName,pSpec) {
	return zenClassMethod(this,'GetKpiFilterCaption','L,L','VARCHAR',arguments);
}

self._DeepSee_Component_Widget_calendar_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}

self._DeepSee_Component_Widget_calendar_ResolveText = function(pEncodedText) {
	return zenInstanceMethod(this,'ResolveText','L','VARCHAR',arguments);
}
self._DeepSee_Component_Widget_calendar__Loader = function() {
	zenLoadClass('_DeepSee_Component_Widget_widget');
	_DeepSee_Component_Widget_calendar.prototype = zenCreate('_DeepSee_Component_Widget_widget',-1);
	var p = _DeepSee_Component_Widget_calendar.prototype;
	if (null==p) {return;}
	p.constructor = _DeepSee_Component_Widget_calendar;
	p.superClass = ('undefined' == typeof _DeepSee_Component_Widget_widget) ? zenMaster._DeepSee_Component_Widget_widget.prototype:_DeepSee_Component_Widget_widget.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%DeepSee.Component.Widget.calendar';
	p._type = 'calendar';
	p.serialize = _DeepSee_Component_Widget_calendar_serialize;
	p.getSettings = _DeepSee_Component_Widget_calendar_getSettings;
	p.GetKpiFilterCaption = _DeepSee_Component_Widget_calendar_GetKpiFilterCaption;
	p.ReallyRefreshContents = _DeepSee_Component_Widget_calendar_ReallyRefreshContents;
	p.ResolveText = _DeepSee_Component_Widget_calendar_ResolveText;
	p.adjustContentSize = _DeepSee_Component_Widget_calendar_adjustContentSize;
	p.applyFilter = _DeepSee_Component_Widget_calendar_applyFilter;
	p.changeViewHandler = _DeepSee_Component_Widget_calendar_changeViewHandler;
}

self._zenClassIdx['http://www.intersystems.com/deepsee/controlPanel'] = '_DeepSee_Component_Widget_controlPanel';
self._DeepSee_Component_Widget_controlPanel = function(index,id) {
	if (index>=0) {_DeepSee_Component_Widget_controlPanel__init(this,index,id);}
}

self._DeepSee_Component_Widget_controlPanel__init = function(o,index,id) {
	('undefined' == typeof _DeepSee_Component_Widget_widget__init) ?zenMaster._DeepSee_Component_Widget_widget__init(o,index,id):_DeepSee_Component_Widget_widget__init(o,index,id);
	o.opacity = '1';
	o.opacityToolbar = '1';
	o.showTitleBar = true;
	o.showToolbarBottomBorder = false;
}
function _DeepSee_Component_Widget_controlPanel_serialize(set,s)
{
	var o = this;s[0]='3015267099';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.backgroundColor;s[9]=o.cellAlign;s[10]=o.cellSize;s[11]=o.cellStyle;s[12]=o.cellVAlign;s[13]=(o.centerHeader?1:0);s[14]=set.serializeList(o,o.children,true,'children');s[15]=set.serializeList(o,o.clickActions,false,'clickActions');s[16]=set.serializeList(o,o.clickActive,false,'clickActive');s[17]=o.clickFilterSpec;s[18]=set.serializeList(o,o.clickTargetProperties,false,'clickTargetProperties');s[19]=set.serializeList(o,o.clickTargets,false,'clickTargets');s[20]=o.colSpan;s[21]=o.colorToolbar;s[22]=o.containerStyle;s[23]=set.serializeList(o,o.controlIndices,false,'controlIndices');s[24]=o.currFilterSpec;s[25]=o.currItemNo;s[26]=o.currSeriesNo;s[27]=o.currValue;s[28]=o.currValueName;s[29]=o.dataSource;s[30]=(o.disabled?1:0);s[31]=(o.dragEnabled?1:0);s[32]=(o.dropEnabled?1:0);s[33]=(o.dynamic?1:0);s[34]=o.enclosingClass;s[35]=o.enclosingStyle;s[36]=o.error;s[37]=set.serializeArray(o,o.filterDefault,false,'filterDefault');s[38]=set.serializeArray(o,o.filterState,false,'filterState');s[39]=set.serializeArray(o,o.filterText,false,'filterText');s[40]=(o.forceToolbar?1:0);s[41]=o.groupClass;s[42]=o.groupStyle;s[43]=(o.hasInitialFilters?1:0);s[44]=o.header;s[45]=o.headerLayout;s[46]=o.height;s[47]=(o.hidden?1:0);s[48]=o.hint;s[49]=o.hintClass;s[50]=o.hintStyle;s[51]=o.homeCol;s[52]=o.homeRow;s[53]=o.imageAppLogo;s[54]=o.imageAppLogoWidth;s[55]=o.imageClose;s[56]=o.imageCloseHover;s[57]=o.imageCloseWidth;s[58]=o.imageContract;s[59]=o.imageContractHover;s[60]=o.imageContractWidth;s[61]=o.imageExpand;s[62]=o.imageExpandHover;s[63]=o.imageExpandWidth;s[64]=o.imageMaximize;s[65]=o.imageMaximizeHover;s[66]=o.imageMaximizeWidth;s[67]=o.imageMinimize;s[68]=o.imageMinimizeHover;s[69]=o.imageMinimizeWidth;s[70]=o.imageResize;s[71]=o.imageResizeSize;s[72]=(o.isClosed?1:0);s[73]=o.label;s[74]=o.labelClass;s[75]=o.labelDisabledClass;s[76]=o.labelPosition;s[77]=o.labelStyle;s[78]=o.layout;s[79]=o.linkWidgetKey;s[80]=(o.maximized?1:0);s[81]=o.minWidth;s[82]=(o.moveEnabled?1:0);s[83]=o.onafterdrag;s[84]=o.onbeforedrag;s[85]=o.onclick;s[86]=o.onclosepending;s[87]=o.ondrag;s[88]=o.ondrop;s[89]=o.onhide;s[90]=o.onrefresh;s[91]=o.onresize;s[92]=o.onshow;s[93]=o.onupdate;s[94]=o.onwindowdrop;s[95]=o.onwindowgrab;s[96]=o.opacity;s[97]=o.opacityToolbar;s[98]=o.overlayMode;s[99]=o.prevHomeCol;s[100]=o.prevHomeRow;s[101]=(o.previewMode?1:0);s[102]=o.renderFlag;s[103]=(o.resizeEnabled?1:0);s[104]=o.rowSpan;s[105]=o.sessionCookie;s[106]=set.serializeArray(o,o.settings,false,'settings');s[107]=(o.showLabel?1:0);s[108]=(o.showSidebar?1:0);s[109]=(o.showTitleBar?1:0);s[110]=(o.showToolbar?1:0);s[111]=(o.showToolbarBottomBorder?1:0);s[112]=(o.showToolbarOnlyWhenMaximized?1:0);s[113]=o.sidebarContent;s[114]=o.sidebarWidth;s[115]=o.slice;s[116]=o.subtype;s[117]=o.title;s[118]=o.tuple;s[119]=o.valign;s[120]=(o.visible?1:0);s[121]=o.widgetKey;s[122]=o.widgetLayout;s[123]=o.width;
}
function _DeepSee_Component_Widget_controlPanel_getSettings(s)
{
	s['name'] = 'string';
	s['showTitleBar'] = 'boolean';
	s['showToolbarBottomBorder'] = 'boolean';
	this.invokeSuper('getSettings',arguments);
}

self._DeepSee_Component_Widget_controlPanel_adjustContentSize = function(load,width,height) {
if (this.subtype == 'verticalControls' ) return;
var header = this.findComponent('header');
var headerDiv = header.getEnclosingDiv();
headerDiv.style.width = width + 20 + 'px';
headerDiv.style.height = (headerDiv.style.height ? parseInt(headerDiv.style.height) : 0) + height + 20 + 'px';
}

self._DeepSee_Component_Widget_controlPanel_applyFilter = function(name,value) {
}

self._DeepSee_Component_Widget_controlPanel_extractTDNodes = function(tableRoot,tdArray) {
if (tableRoot && tableRoot.tagName=='TD') tdArray.push({node:tableRoot,content:tableRoot.innerHTML});
else {
for (var n=tableRoot.firstChild; n; n = n.nextSibling) {
this.extractTDNodes(n,tdArray);
}
}
}

self._DeepSee_Component_Widget_controlPanel_getDataController = function() {
return this.findComponent('controller');
}

self._DeepSee_Component_Widget_controlPanel_isReady = function() {
var controller = this.getDataController();
if (controller && controller.hasData) {
return controller.hasData();
}
return true;
}

self._DeepSee_Component_Widget_controlPanel_navSelectItem = function(key,value,final) {
var forceUpdate = false;
if (key=='widget-common-widgetSubtype') {
if (value != this.subtype) forceUpdate = true;
}
this.invokeSuper('navSelectItem',arguments);
if (forceUpdate) {
var header = this.findComponent('header');
var headerDiv = header.getEnclosingDiv();
for (var t = headerDiv.firstChild; t && t.tagName!='TABLE'; t=t.nextSibling);
if (t) {
for (var tb = t.firstChild; tb && tb.tagName!='TBODY'; tb=tb.nextSibling);
if (tb) {
var tdArray = []
this.extractTDNodes(t,tdArray);
tb.innerHTML="";
if (this.subtype == "horizontalControls") {
t.style.width="";
var tr = document.createElement('tr');
var len = tdArray.length;
for (var i=0;i<len;i++) {
var td = tdArray[i].node;
td.innerHTML = tdArray[i].content;
td.style.paddingRight = "6px";
td.style.textAlign = "";
tr.appendChild(td);
}
tb.appendChild(tr);
}
else { //verticalControls
var len = tdArray.length;
for (var i=0;i<len;i++) {
var tr = document.createElement('tr');
var td = tdArray[i].node;
td.innerHTML = tdArray[i].content;
td.style.paddingRight = "0px";
tr.appendChild(td);
tb.appendChild(tr);
}
}
}
}
}
}

self._DeepSee_Component_Widget_controlPanel_GetKpiFilterCaption = function(pKPIName,pSpec) {
	return zenClassMethod(this,'GetKpiFilterCaption','L,L','VARCHAR',arguments);
}

self._DeepSee_Component_Widget_controlPanel_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}

self._DeepSee_Component_Widget_controlPanel_ResolveText = function(pEncodedText) {
	return zenInstanceMethod(this,'ResolveText','L','VARCHAR',arguments);
}
self._DeepSee_Component_Widget_controlPanel__Loader = function() {
	zenLoadClass('_DeepSee_Component_Widget_widget');
	_DeepSee_Component_Widget_controlPanel.prototype = zenCreate('_DeepSee_Component_Widget_widget',-1);
	var p = _DeepSee_Component_Widget_controlPanel.prototype;
	if (null==p) {return;}
	p.constructor = _DeepSee_Component_Widget_controlPanel;
	p.superClass = ('undefined' == typeof _DeepSee_Component_Widget_widget) ? zenMaster._DeepSee_Component_Widget_widget.prototype:_DeepSee_Component_Widget_widget.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%DeepSee.Component.Widget.controlPanel';
	p._type = 'controlPanel';
	p.serialize = _DeepSee_Component_Widget_controlPanel_serialize;
	p.getSettings = _DeepSee_Component_Widget_controlPanel_getSettings;
	p.GetKpiFilterCaption = _DeepSee_Component_Widget_controlPanel_GetKpiFilterCaption;
	p.ReallyRefreshContents = _DeepSee_Component_Widget_controlPanel_ReallyRefreshContents;
	p.ResolveText = _DeepSee_Component_Widget_controlPanel_ResolveText;
	p.adjustContentSize = _DeepSee_Component_Widget_controlPanel_adjustContentSize;
	p.applyFilter = _DeepSee_Component_Widget_controlPanel_applyFilter;
	p.extractTDNodes = _DeepSee_Component_Widget_controlPanel_extractTDNodes;
	p.getDataController = _DeepSee_Component_Widget_controlPanel_getDataController;
	p.isReady = _DeepSee_Component_Widget_controlPanel_isReady;
	p.navSelectItem = _DeepSee_Component_Widget_controlPanel_navSelectItem;
}

self._zenClassIdx['http://www.intersystems.com/deepsee/map'] = '_DeepSee_Component_Widget_map';
self._DeepSee_Component_Widget_map = function(index,id) {
	if (index>=0) {_DeepSee_Component_Widget_map__init(this,index,id);}
}

self._DeepSee_Component_Widget_map__init = function(o,index,id) {
	('undefined' == typeof _DeepSee_Component_Widget_widget__init) ?zenMaster._DeepSee_Component_Widget_widget__init(o,index,id):_DeepSee_Component_Widget_widget__init(o,index,id);
	o.opacity = '1';
	o.opacityToolbar = '1';
}
function _DeepSee_Component_Widget_map_serialize(set,s)
{
	var o = this;s[0]='1822821506';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.backgroundColor;s[9]=o.cellAlign;s[10]=o.cellSize;s[11]=o.cellStyle;s[12]=o.cellVAlign;s[13]=(o.centerHeader?1:0);s[14]=set.serializeList(o,o.children,true,'children');s[15]=set.serializeList(o,o.clickActions,false,'clickActions');s[16]=set.serializeList(o,o.clickActive,false,'clickActive');s[17]=o.clickFilterSpec;s[18]=set.serializeList(o,o.clickTargetProperties,false,'clickTargetProperties');s[19]=set.serializeList(o,o.clickTargets,false,'clickTargets');s[20]=o.colSpan;s[21]=o.colorToolbar;s[22]=o.containerStyle;s[23]=set.serializeList(o,o.controlIndices,false,'controlIndices');s[24]=o.currFilterSpec;s[25]=o.currItemNo;s[26]=o.currSeriesNo;s[27]=o.currValue;s[28]=o.currValueName;s[29]=o.dataSource;s[30]=(o.disabled?1:0);s[31]=(o.dragEnabled?1:0);s[32]=(o.dropEnabled?1:0);s[33]=(o.dynamic?1:0);s[34]=o.enclosingClass;s[35]=o.enclosingStyle;s[36]=o.error;s[37]=set.serializeArray(o,o.filterDefault,false,'filterDefault');s[38]=set.serializeArray(o,o.filterState,false,'filterState');s[39]=set.serializeArray(o,o.filterText,false,'filterText');s[40]=(o.forceToolbar?1:0);s[41]=o.groupClass;s[42]=o.groupStyle;s[43]=(o.hasInitialFilters?1:0);s[44]=o.header;s[45]=o.headerLayout;s[46]=o.height;s[47]=(o.hidden?1:0);s[48]=o.hint;s[49]=o.hintClass;s[50]=o.hintStyle;s[51]=o.homeCol;s[52]=o.homeRow;s[53]=o.imageAppLogo;s[54]=o.imageAppLogoWidth;s[55]=o.imageClose;s[56]=o.imageCloseHover;s[57]=o.imageCloseWidth;s[58]=o.imageContract;s[59]=o.imageContractHover;s[60]=o.imageContractWidth;s[61]=o.imageExpand;s[62]=o.imageExpandHover;s[63]=o.imageExpandWidth;s[64]=o.imageMaximize;s[65]=o.imageMaximizeHover;s[66]=o.imageMaximizeWidth;s[67]=o.imageMinimize;s[68]=o.imageMinimizeHover;s[69]=o.imageMinimizeWidth;s[70]=o.imageResize;s[71]=o.imageResizeSize;s[72]=(o.isClosed?1:0);s[73]=o.label;s[74]=o.labelClass;s[75]=o.labelDisabledClass;s[76]=o.labelPosition;s[77]=o.labelStyle;s[78]=o.layout;s[79]=o.linkWidgetKey;s[80]=(o.maximized?1:0);s[81]=o.minWidth;s[82]=(o.moveEnabled?1:0);s[83]=o.onafterdrag;s[84]=o.onbeforedrag;s[85]=o.onclick;s[86]=o.onclosepending;s[87]=o.ondrag;s[88]=o.ondrop;s[89]=o.onhide;s[90]=o.onrefresh;s[91]=o.onresize;s[92]=o.onshow;s[93]=o.onupdate;s[94]=o.onwindowdrop;s[95]=o.onwindowgrab;s[96]=o.opacity;s[97]=o.opacityToolbar;s[98]=o.overlayMode;s[99]=o.prevHomeCol;s[100]=o.prevHomeRow;s[101]=(o.previewMode?1:0);s[102]=o.renderFlag;s[103]=(o.resizeEnabled?1:0);s[104]=o.rowSpan;s[105]=o.sessionCookie;s[106]=set.serializeArray(o,o.settings,false,'settings');s[107]=(o.showLabel?1:0);s[108]=(o.showSidebar?1:0);s[109]=(o.showToolbar?1:0);s[110]=(o.showToolbarBottomBorder?1:0);s[111]=(o.showToolbarOnlyWhenMaximized?1:0);s[112]=o.sidebarContent;s[113]=o.sidebarWidth;s[114]=o.slice;s[115]=o.subtype;s[116]=o.title;s[117]=o.tuple;s[118]=o.valign;s[119]=(o.visible?1:0);s[120]=o.widgetKey;s[121]=o.widgetLayout;s[122]=o.width;
}
function _DeepSee_Component_Widget_map_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._DeepSee_Component_Widget_map_adjustContentSize = function(load,width,height) {
var map = this.findComponent('map');
if (map) {
var mapDiv = map.getEnclosingDiv();
width = width > 10 ? width : 0;
mapDiv.style.width = width-10 + 'px';
mapDiv.style.height = height + 'px';
}
}

self._DeepSee_Component_Widget_map_applyFilter = function(name,value) {
}

self._DeepSee_Component_Widget_map_getDataController = function() {
return this.findComponent('controller');
}

self._DeepSee_Component_Widget_map_isReady = function() {
var controller = this.getDataController();
if (controller && controller.hasData) {
return controller.hasData();
}
return true;
}

self._DeepSee_Component_Widget_map_GetKpiFilterCaption = function(pKPIName,pSpec) {
	return zenClassMethod(this,'GetKpiFilterCaption','L,L','VARCHAR',arguments);
}

self._DeepSee_Component_Widget_map_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}

self._DeepSee_Component_Widget_map_ResolveText = function(pEncodedText) {
	return zenInstanceMethod(this,'ResolveText','L','VARCHAR',arguments);
}
self._DeepSee_Component_Widget_map__Loader = function() {
	zenLoadClass('_DeepSee_Component_Widget_widget');
	_DeepSee_Component_Widget_map.prototype = zenCreate('_DeepSee_Component_Widget_widget',-1);
	var p = _DeepSee_Component_Widget_map.prototype;
	if (null==p) {return;}
	p.constructor = _DeepSee_Component_Widget_map;
	p.superClass = ('undefined' == typeof _DeepSee_Component_Widget_widget) ? zenMaster._DeepSee_Component_Widget_widget.prototype:_DeepSee_Component_Widget_widget.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%DeepSee.Component.Widget.map';
	p._type = 'map';
	p.serialize = _DeepSee_Component_Widget_map_serialize;
	p.getSettings = _DeepSee_Component_Widget_map_getSettings;
	p.GetKpiFilterCaption = _DeepSee_Component_Widget_map_GetKpiFilterCaption;
	p.ReallyRefreshContents = _DeepSee_Component_Widget_map_ReallyRefreshContents;
	p.ResolveText = _DeepSee_Component_Widget_map_ResolveText;
	p.adjustContentSize = _DeepSee_Component_Widget_map_adjustContentSize;
	p.applyFilter = _DeepSee_Component_Widget_map_applyFilter;
	p.getDataController = _DeepSee_Component_Widget_map_getDataController;
	p.isReady = _DeepSee_Component_Widget_map_isReady;
}

self._zenClassIdx['http://www.intersystems.com/deepsee/meter'] = '_DeepSee_Component_Widget_meter';
self._DeepSee_Component_Widget_meter = function(index,id) {
	if (index>=0) {_DeepSee_Component_Widget_meter__init(this,index,id);}
}

self._DeepSee_Component_Widget_meter__init = function(o,index,id) {
	('undefined' == typeof _DeepSee_Component_Widget_widget__init) ?zenMaster._DeepSee_Component_Widget_widget__init(o,index,id):_DeepSee_Component_Widget_widget__init(o,index,id);
	o.meterCount = '';
	o.opacity = '1';
	o.opacityToolbar = '1';
}
function _DeepSee_Component_Widget_meter_serialize(set,s)
{
	var o = this;s[0]='1652015752';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.backgroundColor;s[9]=o.cellAlign;s[10]=o.cellSize;s[11]=o.cellStyle;s[12]=o.cellVAlign;s[13]=(o.centerHeader?1:0);s[14]=set.serializeList(o,o.children,true,'children');s[15]=set.serializeList(o,o.clickActions,false,'clickActions');s[16]=set.serializeList(o,o.clickActive,false,'clickActive');s[17]=o.clickFilterSpec;s[18]=set.serializeList(o,o.clickTargetProperties,false,'clickTargetProperties');s[19]=set.serializeList(o,o.clickTargets,false,'clickTargets');s[20]=o.colSpan;s[21]=o.colorToolbar;s[22]=o.containerStyle;s[23]=set.serializeList(o,o.controlIndices,false,'controlIndices');s[24]=o.currFilterSpec;s[25]=o.currItemNo;s[26]=o.currSeriesNo;s[27]=o.currValue;s[28]=o.currValueName;s[29]=o.dataSource;s[30]=(o.disabled?1:0);s[31]=(o.dragEnabled?1:0);s[32]=(o.dropEnabled?1:0);s[33]=(o.dynamic?1:0);s[34]=o.enclosingClass;s[35]=o.enclosingStyle;s[36]=o.error;s[37]=set.serializeArray(o,o.filterDefault,false,'filterDefault');s[38]=set.serializeArray(o,o.filterState,false,'filterState');s[39]=set.serializeArray(o,o.filterText,false,'filterText');s[40]=(o.forceToolbar?1:0);s[41]=o.groupClass;s[42]=o.groupStyle;s[43]=(o.hasInitialFilters?1:0);s[44]=o.header;s[45]=o.headerLayout;s[46]=o.height;s[47]=(o.hidden?1:0);s[48]=o.hint;s[49]=o.hintClass;s[50]=o.hintStyle;s[51]=o.homeCol;s[52]=o.homeRow;s[53]=o.imageAppLogo;s[54]=o.imageAppLogoWidth;s[55]=o.imageClose;s[56]=o.imageCloseHover;s[57]=o.imageCloseWidth;s[58]=o.imageContract;s[59]=o.imageContractHover;s[60]=o.imageContractWidth;s[61]=o.imageExpand;s[62]=o.imageExpandHover;s[63]=o.imageExpandWidth;s[64]=o.imageMaximize;s[65]=o.imageMaximizeHover;s[66]=o.imageMaximizeWidth;s[67]=o.imageMinimize;s[68]=o.imageMinimizeHover;s[69]=o.imageMinimizeWidth;s[70]=o.imageResize;s[71]=o.imageResizeSize;s[72]=(o.isClosed?1:0);s[73]=o.label;s[74]=o.labelClass;s[75]=o.labelDisabledClass;s[76]=o.labelPosition;s[77]=o.labelStyle;s[78]=o.layout;s[79]=o.linkWidgetKey;s[80]=(o.maximized?1:0);s[81]=o.meterCount;s[82]=o.minWidth;s[83]=(o.moveEnabled?1:0);s[84]=o.onafterdrag;s[85]=o.onbeforedrag;s[86]=o.onclick;s[87]=o.onclosepending;s[88]=o.ondrag;s[89]=o.ondrop;s[90]=o.onhide;s[91]=o.onrefresh;s[92]=o.onresize;s[93]=o.onshow;s[94]=o.onupdate;s[95]=o.onwindowdrop;s[96]=o.onwindowgrab;s[97]=o.opacity;s[98]=o.opacityToolbar;s[99]=o.overlayMode;s[100]=o.prevHomeCol;s[101]=o.prevHomeRow;s[102]=(o.previewMode?1:0);s[103]=o.renderFlag;s[104]=(o.resizeEnabled?1:0);s[105]=o.rowSpan;s[106]=o.sessionCookie;s[107]=set.serializeArray(o,o.settings,false,'settings');s[108]=(o.showLabel?1:0);s[109]=(o.showSidebar?1:0);s[110]=(o.showToolbar?1:0);s[111]=(o.showToolbarBottomBorder?1:0);s[112]=(o.showToolbarOnlyWhenMaximized?1:0);s[113]=o.sidebarContent;s[114]=o.sidebarWidth;s[115]=o.slice;s[116]=o.subtype;s[117]=o.title;s[118]=o.tuple;s[119]=o.valign;s[120]=(o.visible?1:0);s[121]=o.widgetKey;s[122]=o.widgetLayout;s[123]=o.width;
}
function _DeepSee_Component_Widget_meter_getSettings(s)
{
	s['name'] = 'string';
	s['meterCount'] = 'integer';
	this.invokeSuper('getSettings',arguments);
}

self._DeepSee_Component_Widget_meter_adjustContentSize = function(load,width,height) {
var svg = this.findComponent('svgFrame');
if (!svg) return;
var adjW = 2;
var adjH = 2;
var svgDiv = svg.getEnclosingDiv();
svgDiv.style.width = width + 'px';
svgDiv.style.height = height + 'px';
var svgWid = width - adjW;
var svgHgt = height - adjH;
svg.setProperty("width",svgWid+'px');
svg.setProperty("height",svgHgt+'px');
if (svgHgt <= 0 || svgWid <= 0) {
return;
}
var meterCount = this.getMeterCount();
var mCount = 0;
for (var n = 0; n < meterCount; n++) {
meter = this.findComponent('svgMeter' + (n+1));
if (meter && !meter.hidden) {
mCount++;
}
}
if (mCount > 0) {
var xw = Math.round((svgWid-10) / mCount);
var mh = (xw > svgHgt) ? svgHgt : xw;
while (mh < (svgHgt*0.35) && (xw < svgWid)) {
xw = Math.round(xw * 1.05);
xw = (xw > svgWid) ? svgWid : xw;
mh = (xw > svgHgt) ? svgHgt : xw;
}
for (var n = 0; n < meterCount; n++) {
meter = this.findComponent('svgMeter' + (n+1));
if (meter && !meter.hidden) {
var aspect = (meter.viewBoxHeight>0) ? meter.viewBoxWidth / meter.viewBoxHeight : 1;
if (aspect > 1) {
var mw = xw;
mh = mw / aspect;
}
else {
var mw = mh * aspect;
}
meter.setProperty("width",mw);
meter.setProperty("height",mh);
}
}
}
}

self._DeepSee_Component_Widget_meter_exportPDF = function(printMultiple,preserveTempFiles) {
var parms = {};
var table = this.getDataController();
var widgetDef = this.getDefinition();
printMultiple = (printMultiple) ? printMultiple : false;				// DTB251 - For multi-tab browser display
preserveTempFiles = (preserveTempFiles) ? preserveTempFiles : false;	// DTB251 - For merging into a single PDF
var filterNames = [];
var filterValues = [];
if (''!==table.kpi) {
if (table&&table.filters) {
for (var n = 0; n < table.filters.length; n++) {
var filter = table.filters[n];
if (filter.text!='') {
filterNames[filterNames.length] = filter.spec;
var val = filter.text.toString();
if ('&'==val.charAt(0)) {
val = val.substring(2,val.length-1);
}
filterValues[filterValues.length] = val;
}
}
}
else {
for (var filter in this.filterText) {
var filterValue = this.filterText[filter]
if (filterValue) {
filterNames[filterNames.length] = filter;
filterValues[filterValues.length] = filterValue;
}
}
}
for (prop in table.pivotVariables) {
filterNames[filterNames.length]= prop;
filterValues[filterValues.length] = table.pivotVariables[prop];
}
}
else if ((''!=table.cubeName) && (''!=table.queryKey)) {
table.getFilterInfo(filterNames, filterValues);
}
var util = zenPage.getComponentById("svgUtil");
parms.title = widgetDef.title;
parms.filterTable = util.prepareFilterTable(filterNames,filterValues);
parms.preserveTempFiles = preserveTempFiles;		// DTB251 - Add option to preserve temp files
parms.printMultiple = printMultiple;				// DTB251 - Communicate multiple widget print to the printer
this.prepareSvgPrintParameters(parms);				// DTB565 - Normalize the printing parameters
this.printSVGContent(this.id+'/svgFrame',parms);
}

self._DeepSee_Component_Widget_meter_getDataController = function() {
return this.findComponent('controller');
}

self._DeepSee_Component_Widget_meter_getMeter = function(n) {
n = zenGet(n,0);
return this.findComponent('svgMeter' + (n+1));
}

self._DeepSee_Component_Widget_meter_getMeterCount = function() {
return parseInt(this.meterCount);
}

self._DeepSee_Component_Widget_meter_getOverrides = function() {
var overrides = {};
var widgetDef = this.getDefinition();
if (widgetDef) {
for (var n = 0; n < widgetDef.dataProperties.length; n++) {
var dataProp = widgetDef.dataProperties[n];
if (dataProp.override) {
var meter = this.getMeter(n);
if (meter) {
if (widgetDef.themeOverrides && widgetDef.themeOverrides[meter._type]) {
overrides[meter._type] = widgetDef.themeOverrides[meter._type];
}
if (dataProp.override) {
overrides[meter._type] = dataProp.override;
}
}
}
}
}
return overrides;
}

self._DeepSee_Component_Widget_meter_hasOverrides = function() {
var result = false;
var widgetDef = this.getDefinition();
if (widgetDef) {
for (var n = 0; n < widgetDef.dataProperties.length; n++) {
var dataProp = widgetDef.dataProperties[n];
if (dataProp.override) {
result = true;
break;
}
}
}
return result;
}

self._DeepSee_Component_Widget_meter_meterSelected = function(meter) {
if (this._selectedMeter != meter) {
this._selectedMeter = meter;
var nav = zenPage.getNavigator();
if (nav) {
nav.refreshTopSheet();
}
}
}

self._DeepSee_Component_Widget_meter_navCloseButtonClick = function(key) {
var ckey = key;
var keyNo = '';
if (ckey.toString().indexOf(':')>0) {
var t = ckey.split(':');
ckey = t[0];
keyNo = parseInt(t[1]);
}
switch(ckey) {
case 'widget-meter-Settings':
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
if (widgetDef) {
if (confirm('Do you wish to delete this meter?')) {
widgetDef.dataProperties.splice(keyNo,1);
zenPage.setModified(true);
zenPage.recreateWidget(zenPage.currWidgetKey);
var nav = zenPage.getNavigator();
if (nav) {
nav.refreshTopSheet();
}
}
}
break;
default:
this.invokeSuper('navCloseButtonClick',arguments);
break;
}
}

self._DeepSee_Component_Widget_meter_navDataChange = function(key,value,final) {
var ckey = key;
var navigator = zenPage.getNavigator();
var legend = this.findComponent('chartLegend');
var title = '';
var keyNo = '';
if (ckey.toString().indexOf(':')>0) {
var t = key.split(':');
ckey = t[0];
keyNo = parseInt(t[1]);
}
var kt = ckey.toString().split('-');
kt.splice(0,1);
var k2 = kt.join('-');
var target = kt[0];
switch (target) {
case 'common':
this.invokeSuper('navDataChange',arguments);
break;
case 'meter':
var attr = k2.toString().split('-')[1];
var widgetDef = this.getDefinition();
var dataProp = widgetDef.dataProperties[keyNo];
var meter = this._selectedMeter;
if (!meter) {
break;
}
var isOverride = false;
var recreate = false;
switch (attr) {
case 'labelStyle':
case 'normalStyle':
case 'valueLabelStyle':
case 'odometerTextStyle':
case 'lowStyle':
case 'highStyle':
case 'backgroundStyle':
case 'odometerBoxStyle':
case 'nubStyle':
case 'separatorStyle':
case 'needleStyle':
case 'outerCircleStyle':
case 'innerCircleStyle':
case 'midCircleStyle':
case 'ringStyle':
case 'outerBodyStyle':
isOverride = true;
t = k2.toString().split('-');
t.splice(0,2);
var styleProp = t.join('-');
title = styleProp;
var styleValues = {};
if (styleProp && styleProp.length) {
switch(styleProp) {
case 'textStyle':
var cv = value.toString().split(',');
for (var n = 0; n < cv.length; n++) {
styleValues[cv[n]] = true;
}
styleProp = null;
break;
case 'opacity':
value = value >=1 ? '' : value;
this.setOpacity(value);  // JSL4483
break;
case 'font-size':
value = (value==='') ? value : (parseFloat(value) + 'px');
break;
case 'stroke-dasharray':
switch (value) {
case 'dotted':
value = '1,6';
break;
case 'dashed':
value = '10,10';
break;
case 'solid':
default:
value = '';
break;
}
break;
}
var style = meter.getProperty(attr);
var info = navigator.parseStyleSVG(style);
if (styleProp) {
info[styleProp] = value;
}
if (styleValues.bold) {
info['font-weight'] = 'bold';
}
else {
delete info['font-weight'];
}
if (styleValues.italic) {
info['font-style'] = 'italic';
}
else {
delete info['font-style'];
}
if (styleValues.shadow) {
info['text-shadow'] = '1px 1px 1px #808080';
}
else {
delete info['text-shadow'];
}
style = navigator.convertCSSToText(info);
meter.setProperty(attr,style);
var spec = navigator.getParentSpec();
spec.value = style;
}
break;
case 'label':
case 'rangeUpper':
case 'rangeLower':
case 'thresholdUpper':
case 'thresholdLower':
case 'targetValue':
isOverride = true;
dataProp[attr] = value;
meter.setProperty(attr,value);
break;
case 'dataValue':
isOverride = true;
dataProp[attr] = value;
recreate = true;
break;
case 'persona':
isOverride = true;
meter.setProperty(attr,value);
break;
case 'thinNeedle':
isOverride = true;
meter.setProperty(attr,value?true:false);
break;
case 'MeterType':
if (!zenPage._oldMeterType) {
zenPage._oldMeterType = meter._type;
}
var svg = this.findComponent('svgFrame');
this.setMeterType(svg,meter,value);
isOverride = true;
break;
default:
alert('Unhandled attr ' + attr);
break;
}
if (final) {
if (ckey == 'widget-meter-MeterType') {
delete zenPage._oldMeterType;
}
zenPage.setModified(true);
var widgetDef = this.getDefinition();
if (widgetDef && (isOverride||recreate)) {
var dataProp = widgetDef.dataProperties[keyNo];
var skip = {
parent:true, window:true, controller:true, controllerId:true,
superClass:true, seriesSize:true, seriesCount:true,
odometerFormat:true,
label:true
}
var jsonOver = this.componentToJSON(meter,0,skip);
dataProp.subtype = meter._type;
if (zenGet(widgetDef.themeOverrides[meter._type])!=jsonOver) {
dataProp.override = jsonOver;
}
else {
dataProp.override = '';
}
if (recreate) {
if (zenPage.recreateWidget) {
zenPage.recreateWidget(this.widgetKey);
}
}
}
}
break;
default:
break;
}
}

self._DeepSee_Component_Widget_meter_navGetContentForLevel = function(level,key,value) {
var content = { title: $$$Text('Settings','%DeepSee'), items:[] };
var navigator = zenPage.getNavigator();
var title = '';
var ckey = key; // local copy
var keyNo = '';
if (ckey.toString().indexOf(':')>0) {
var t = ckey.split(':');
ckey = t[0];
keyNo = parseInt(t[1]);
}
switch (ckey) {
case 'WidgetSettings':
content = this.invokeSuper('navGetContentForLevel',arguments);
content.items[content.items.length] = {display:'section', caption:$$$Text('Meter Settings','%DeepSee') };
content.items[content.items.length] = {display:'image-caption-hz', image:'deepsee/ds2_dashboard_44.png', caption:$$$Text('Meters','%DeepSee'), action:'drill', key:'widget-meter-List'};
break;
case 'widget-meter-List':
content.title = $$$Text('Meters','%DeepSee');
content.headerButtons = [
{key:'meter-meterAdd', caption:$$$Text('Add Meter','%DeepSee'), image:'deepsee/ds2_plus_44_w.png'}
];
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
if (widgetDef && widgetDef.dataProperties && widgetDef.dataProperties.length) {
for (var n = 0; n < widgetDef.dataProperties.length; n++) {
var dataProp = widgetDef.dataProperties[n];
if (dataProp) {
var caption = dataProp.label ? dataProp.label : dataProp.dataValue;
var meter = this.getMeter(n);
caption = (caption=='$auto' && meter) ? meter.getLabelText() : caption;
caption = caption ? caption : ('Meter ' + (n+1));
content.items[content.items.length] = {display:'image-caption-hz', image:'deepsee/ds2_dashboard_44.png', caption:caption, action:'drill', key:'widget-meter-Settings:'+n, canDrag:false, closeButton:true};
}
}
}
else {
content.items[content.items.length] = {display:'info', caption:$$$Text('Widget has no meters','%DeepSee'), value:'Press the Add button to add a Meter', captionStyle:'color:darkred;white-space: normal;width:260px;', style:'height:150px;' };
}
break;
case 'widget-meter-Settings':
content.title = $$$Text('Meter Settings','%DeepSee');
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
if (widgetDef && widgetDef.dataProperties[keyNo]) {
var dataProp = widgetDef.dataProperties[keyNo];
var meter = this._selectedMeter;
if (!meter) {
content.html = '<div style="padding:10px;font-size:20px;color:#804040;font-style:italic;">' + $$$Text('Please select a meter') + '</div>';
}
else {
var svg = this.findComponent('svgFrame');
if (!(window.navigator.userAgent.indexOf('Edge')>0)&&(!zenIsIE)) {
svg.selectItem(meter);
}
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Type','%DeepSee'),value:zenGet(meter._type), action:'drill', key:'widget-meter-MeterType:'+keyNo};
content.items[content.items.length] = {display:'section', caption:$$$Text('Data and Range','%DeepSee')};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Data Property','%DeepSee'),value:zenGet(dataProp.dataValue), edit:'string', action:'drill', key:'widget-meter-dataValue:'+keyNo};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Label','%DeepSee'),value:zenGet(dataProp.label), edit:'string', action:'drill', key:'widget-meter-label:'+keyNo};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Label Style','%DeepSee'),value:zenGet(meter.labelStyle), action:'drill', key:'widget-meter-labelStyle:'+keyNo, text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Upper Range','%DeepSee'),value:zenGet(dataProp.rangeUpper), edit:'string', action:'drill',key:'widget-meter-rangeUpper:'+keyNo};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Lower Range','%DeepSee'),value:zenGet(dataProp.rangeLower), edit:'string', action:'drill',key:'widget-meter-rangeLower:'+keyNo};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Upper Threshold','%DeepSee'),value:zenGet(dataProp.thresholdUpper), edit:'string', action:'drill',key:'widget-meter-thresholdUpper:'+keyNo};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Lower Threshold','%DeepSee'),value:zenGet(dataProp.thresholdLower), edit:'string', action:'drill',key:'widget-meter-thresholdLower:'+keyNo};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Target Value','%DeepSee'),value:zenGet(dataProp.targetValue), edit:'string', action:'drill',key:'widget-meter-targetValue:'+keyNo};
content.items[content.items.length] = {display:'section', caption:$$$Text('Styles','%DeepSee')};
content.items[content.items.length] = {display:'caption', caption:$$$Text('Apply Style to All Meters','%DeepSee'), action:'select', key:'widget-meter-ApplyStyle:'+keyNo, style:'color:darkblue;'};
switch(meter && meter._type) {
case 'trafficLight':
case 'lightBar':
case 'fuelGauge':
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Body Style','%DeepSee'),value:zenGet(meter.outerBodyStyle), action:'drill', key:'widget-meter-outerBodyStyle:'+keyNo, text:''};
break;
case 'speedometer':
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Outer Circle','%DeepSee'),value:zenGet(meter.outerCircleStyle), action:'drill', key:'widget-meter-outerCircleStyle:'+keyNo, text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Middle Circle','%DeepSee'),value:zenGet(meter.midCircleStyle), action:'drill', key:'widget-meter-midCircleStyle:'+keyNo, text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Ring','%DeepSee'),value:zenGet(meter.ringStyle), action:'drill', key:'widget-meter-ringStyle:'+keyNo, text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Inner Circle','%DeepSee'),value:zenGet(meter.innerCircleStyle), action:'drill', key:'widget-meter-innerCircleStyle:'+keyNo, text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Nub','%DeepSee'),value:zenGet(meter.nubStyle), action:'drill', key:'widget-meter-nubStyle:'+keyNo, text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Needle','%DeepSee'),value:zenGet(meter.needleStyle), action:'drill', key:'widget-meter-needleStyle:'+keyNo, text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Separators','%DeepSee'),value:zenGet(meter.separatorStyle), action:'drill', key:'widget-meter-separatorStyle:'+keyNo, text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Thin Needle','%DeepSee'),value:zenGet(meter.thinNeedle), edit:'switch', key:'widget-meter-thinNeedle:'+keyNo};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Odometer Box','%DeepSee'),value:zenGet(meter.odometerBoxStyle), action:'drill', key:'widget-meter-odometerBoxStyle:'+keyNo, text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Odometer Style','%DeepSee'),value:zenGet(meter.odometerTextStyle), action:'drill', key:'widget-meter-odometerTextStyle:'+keyNo, text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Value Labels','%DeepSee'),value:zenGet(meter.valueLabelStyle), action:'drill', key:'widget-meter-valueLabelStyle:'+keyNo, text:''};
break;
case 'smiley':
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Persona','%DeepSee'),value:zenGet(meter.persona), edit:'choice', key:'widget-meter-persona:'+keyNo, valueList:'classic,alien,pirate',displayList:'Classic,Alien,Pirate'};
break;
case 'textMeter':
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Background','%DeepSee'),value:zenGet(meter.backgroundStyle), action:'drill', key:'widget-meter-backgroundStyle:'+keyNo, text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Style','%DeepSee'),value:zenGet(meter.normalStyle), action:'drill', key:'widget-meter-normalStyle:'+keyNo, text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Low Style','%DeepSee'),value:zenGet(meter.lowStyle), action:'drill', key:'widget-meter-lowStyle:'+keyNo, text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('High Style','%DeepSee'),value:zenGet(meter.highStyle), action:'drill', key:'widget-meter-highStyle:'+keyNo, text:''};
break;
}
}
if (ckey == 'widget-meter-General') {
content.title = $$$Text('General Meter Settings','%DeepSee');
content.items[content.items.length] = {display:'image-caption-hz', image:'deepsee/ds2_dashboard_44.png', caption:$$$Text('Meters','%DeepSee'), action:'drill', key:'widget-meter-List'};
}
}
break;
case 'widget-meter-label':
content.title = $$$Text('Label','%DeepSee');
var meter = this._selectedMeter;
var list = [
{ caption:$$$Text('Auto','%DeepSee'), value:'$auto',hint:$$$Text('Select a default label automatically','%DeepSee')},
];
content.html = zenPage.getNavigator().getChooserListHTML(list,key,zenGet(meter.label),$$$Text('Label','%DeepSee'),$$$Text('Select a label for this data property','%DeepSee'));
break;
case 'widget-meter-dataValue':
case 'widget-meter-rangeUpper':
case 'widget-meter-rangeLower':
case 'widget-meter-thresholdUpper':
case 'widget-meter-thresholdLower':
case 'widget-meter-targetValue':
content.title = $$$Text('Properties','%DeepSee');
/*
var list = [];
var controller = this.getDataController();
var pcount  = controller.getDimSize(2);
for (var n = 0; n < pcount; n++) {
list[list.length] = {value:controller.getLabel(n,2)};
}
content.html = navigator.getChooserListHTML(list,key,value);
*/
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
var options = zenPage.fetchOptionList('widget-property',widgetDef.dataSource);
if (options && options.children) {
var list = options.children;
content.html = navigator.getChooserListHTML(list,key,value);
}
break;
case 'widget-meter-outerBodyStyle':
case 'widget-meter-outerCircleStyle':
case 'widget-meter-midCircleStyle':
case 'widget-meter-ringStyle':
case 'widget-meter-innerCircleStyle':
case 'widget-meter-nubStyle':
case 'widget-meter-separatorStyle':
case 'widget-meter-odometerBoxStyle':
case 'widget-meter-needleStyle':
case 'widget-meter-backgroundStyle':
var attr = ckey.toString().split('-')[2];
title = $$$Text('Style','%DeepSee');
var meter = this._selectedMeter;
if (!meter) {
break;
}
var style = zenGet(meter[attr]);
var info = navigator.parseStyleSVG(style);
var fill = info['fill'] ? info['fill'] : 'transparent';
var stroke = info['stroke'] ? info['stroke'] : 'none';
var strokeWidth = zenGet(info['stroke-width']);
var opacity = zenGet(info['opacity']);
var strokeDashArray = info['stroke-dasharray'];
switch (strokeDashArray) {
case '1,6':
strokeDashArray = 'dotted';
break;
case '10,10':
strokeDashArray = 'dashed';
break;
default:
strokeDashArray = 'solid';
break;
}
opacity = opacity==='' ? 1.0 : opacity;
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Fill','%DeepSee'), action:'drill', value:fill,	key:ckey+'-fill:'+keyNo, valueStyle:'width:80px;border-radius:5px;border:1px solid #B0B0B0;background:'+fill+';', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Opacity','%DeepSee'), edit:'slider', value:opacity,	key:ckey+'-opacity:'+keyNo};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Line','%DeepSee'), action:'drill', value:'',	key:ckey+'-stroke:'+keyNo, valueStyle:'width:80px;border-radius:5px;border:1px solid #B0B0B0;background:'+stroke+';'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Line Width','%DeepSee'), edit:'slider-toggle', value:strokeWidth,	key:ckey+'-stroke-width:'+keyNo, minValue:0, maxValue:25, stepSize:0.25};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Line Style','%DeepSee'), edit:'choice', value:strokeDashArray,	key:ckey+'-stroke-dasharray:'+keyNo, valueList:'solid,dashed,dotted', displayList:'solid,dashed,dotted'};
break;
case 'widget-meter-labelStyle':
case 'widget-meter-normalStyle':
case 'widget-meter-lowStyle':
case 'widget-meter-highStyle':
case 'widget-meter-valueLabelStyle':
case 'widget-meter-odometerTextStyle':
var attr = ckey.toString().split('-')[2];
title = $$$Text('Style','%DeepSee');
var meter = this._selectedMeter;
if (!meter) {
break;
}
var style = zenGet(meter[attr]);
var info = navigator.parseStyleSVG(style);
var fill = info['fill'] ? info['fill'] : 'transparent';
var stroke = info['stroke'] ? info['stroke'] : 'none';
var strokeWidth = zenGet(info['stroke-width']);
var fontFamily = zenGet(info['font-family']);
var fontSize = zenGet(info['font-size']);
fontSize = fontSize ? parseFloat(fontSize) : fontSize;
var opacity = zenGet(info['opacity']);
opacity = opacity==='' ? 1.0 : opacity;
var shadow = zenGet(info['text-shadow']);
shadow = shadow ? true : false;
var bold = zenGet(info['font-weight']);
bold = bold ? true : false;
var italic = zenGet(info['font-style']);
italic = italic ? true : false;
var fs = [];
if (bold) { fs[fs.length] = 'bold'; }
if (italic) { fs[fs.length] = 'italic'; }
if (shadow) { fs[fs.length] = 'shadow'; }
var fontStyle = fs.join(',');
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Color','%DeepSee'), action:'drill', value:fill,	key:ckey+'-fill:'+keyNo, valueStyle:'width:80px;border-radius:5px;border:1px solid #B0B0B0;background:'+fill+';', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Stroke','%DeepSee'), action:'drill', value:stroke,	key:ckey+'-stroke:'+keyNo, valueStyle:'width:80px;border-radius:5px;border:1px solid #B0B0B0;background:'+stroke+';', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Stroke Width','%DeepSee'), edit:'slider-toggle', value:strokeWidth,	key:ckey+'-stroke-width:'+keyNo, minValue:0, maxValue:5, stepSize:0.05};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Opacity','%DeepSee'), edit:'slider', value:opacity,	key:ckey+'-opacity:'+keyNo};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Font','%DeepSee'), action:'drill', value:fontFamily,	key:ckey+'-font-family:'+keyNo, style:'font-family:'+fontFamily+';'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Text Size','%DeepSee'), edit:'slider-toggle', value:fontSize,	key:ckey+'-font-size:'+keyNo, minValue:4, maxValue:50, stepSize:1};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Text Style','%DeepSee'), edit:'choice-multi', value:fontStyle,	key:ckey+'-textStyle:'+keyNo, valueList:'bold,italic,shadow', displayList:'B,I,S', valueStyle:'font-size:12px;font-family:times new roman;', choiceStyles:'font-weight:900;^font-style:italic;^text-shadow:1px 1px 2px #F0F0F0;'};
break;
case 'widget-meter-labelStyle-fill':
case 'widget-meter-labelStyle-stroke':
case 'widget-meter-valueLabelStyle-fill':
case 'widget-meter-valueLabelStyle-stroke':
case 'widget-meter-odometerTextStyle-fill':
case 'widget-meter-odometerTextStyle-stroke':
case 'widget-meter-normalStyle-fill':
case 'widget-meter-normalStyle-stroke':
case 'widget-meter-lowStyle-fill':
case 'widget-meter-lowStyle-stroke':
case 'widget-meter-highStyle-fill':
case 'widget-meter-highStyle-stroke':
case 'widget-meter-backgroundStyle-fill':
case 'widget-meter-backgroundStyle-stroke':
case 'widget-meter-odometerBoxStyle-fill':
case 'widget-meter-odometerBoxStyle-stroke':
case 'widget-meter-separatorStyle-fill':
case 'widget-meter-separatorStyle-stroke':
case 'widget-meter-nubStyle-fill':
case 'widget-meter-nubStyle-stroke':
case 'widget-meter-needleStyle-fill':
case 'widget-meter-needleStyle-stroke':
case 'widget-meter-outerCircleStyle-fill':
case 'widget-meter-outerCircleStyle-stroke':
case 'widget-meter-innerCircleStyle-fill':
case 'widget-meter-innerCircleStyle-stroke':
case 'widget-meter-midCircleStyle-fill':
case 'widget-meter-midCircleStyle-stroke':
case 'widget-meter-ringStyle-fill':
case 'widget-meter-ringStyle-stroke':
case 'widget-meter-outerBodyStyle-fill':
case 'widget-meter-outerBodyStyle-stroke':
var attr = ckey.toString().split('-')[2];
title = $$$Text('Style','%DeepSee');
var k2 = (keyNo === '') ? '' : ':' + keyNo;
content.html = navigator.getColorChooserHTML(attr+k2,value,'svg');
break;
case 'widget-meter-valueLabelStyle-font-family':
case 'widget-meter-odometerTextStyle-font-family':
case 'widget-meter-labelStyle-font-family':
case 'widget-meter-normalStyle-font-family':
case 'widget-meter-lowStyle-font-family':
case 'widget-meter-highStyle-font-family':
var attr = ckey.toString().split('-')[2];
title = $$$Text('Font','%DeepSee');
var k2 = (keyNo === '') ? '' : ':' + keyNo;
content.html = navigator.getFontChooserHTML(attr+k2,value);
break;
case 'widget-meter-MeterType':
content.title = $$$Text('Meter Type','%DeepSee');
var meter = this._selectedMeter;
if (!meter) {
break;
}
var list = [
{ image:'', value:'', caption:$$$Text('Default','%DeepSee')},
{ image:'deepsee/speedo_48.gif', value:'speedometer', caption:$$$Text('Speedometer','%DeepSee')},
{ image:'deepsee/fuel_48.gif', value:'fuelGauge', caption:$$$Text('Fuel Gauge','%DeepSee')},
{ image:'deepsee/text_box_48.gif', value:'textMeter', caption:$$$Text('Text Meter','%DeepSee')},
{ image:'deepsee/caution_48.gif', value:'trafficLight', caption:$$$Text('Traffic Light','%DeepSee')},
{ image:'deepsee/lightbar_48.gif', value:'lightBar', caption:$$$Text('Light Bar','%DeepSee')},
{ image:'deepsee/smiley_48.gif', value:'smiley', caption:$$$Text('Smiley','%DeepSee')},
];
content.html = navigator.getIconListHTML(list,key,zenGet(meter._type));
break;
default:
var kt = ckey.toString().split('-');
switch(kt[1]) {
case 'common':
content = this.invokeSuper('navGetContentForLevel',arguments);
break;
}
break;
}
return content;
}

self._DeepSee_Component_Widget_meter_navHeaderButtonClick = function(key) {
var ckey = key;
var keyNo = '';
if (ckey.toString().indexOf(':')>0) {
var t = ckey.split(':');
ckey = t[0];
keyNo = parseInt(t[1]);
}
var kt = ckey.toString().split('-');
var target = kt[0];
switch(target) {
case 'meter':
switch(ckey) {
case 'meter-meterAdd':
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
var dp = this.newDataProperty();
widgetDef.dataProperties[widgetDef.dataProperties.length] = dp;
zenPage.setModified(true);
if (zenPage.recreateWidget) {
zenPage.recreateWidget(this.widgetKey);
}
var nav = zenPage.getNavigator();
if (nav) {
nav.refreshTopSheet();
}
break;
}
break;
default:
this.invokeSuper('navHeaderButtonClick',arguments);
break;
}
}

self._DeepSee_Component_Widget_meter_navSelectItem = function(key,value,which) {
var ckey = key;
var keyNo = '';
if (ckey.toString().indexOf(':')>0) {
var t = ckey.split(':');
ckey = t[0];
keyNo = parseInt(t[1]);
}
var kt = ckey.toString().split('-');
var target = kt[1];
switch(target) {
case 'meter':
if (which == 'drill') {
switch(ckey) {
case 'widget-meter-Settings':
this._selectedMeter = this.getMeter(keyNo);
break;
}
}
else if (which == 'select') {
switch(ckey) {
case 'widget-meter-ApplyStyle':
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
var masterMeter = this.getMeter(keyNo);
var masterMeter = this._selectedMeter;
if (!masterMeter) {
break;
}
for (var n = 0; n < widgetDef.dataProperties.length; n++) {
if (n!=keyNo) {
var meter = this.getMeter(n);
if (meter._type == masterMeter._type) {
widgetDef.dataProperties[n].override = widgetDef.dataProperties[keyNo].override;
}
}
}
zenPage.setModified(true);
if (zenPage.recreateWidget) {
zenPage.recreateWidget(this.widgetKey);
}
var nav = zenPage.getNavigator();
if (nav) {
nav.refreshTopSheet();
}
break;
}
}
break;
default:
this.invokeSuper('navSelectItem',arguments);
break;
}
}

self._DeepSee_Component_Widget_meter_newDataProperty = function() {
return {
"_class":"%DeepSee.Dashboard.DataProperty",
"align":"",
"baseValue":"",
"dataValue":"",
"display":"value",
"format":"",
"label":"$auto",
"name":"",
"override":"",
"rangeLower":"",
"rangeUpper":"",
"showAs":"value",
"style":"",
"subtype":"",
"summary":"",
"summaryValue":"",
"targetValue":"",
"thresholdLower":"",
"thresholdUpper":"",
"valueColumn":false,
"width":""
}
}

self._DeepSee_Component_Widget_meter_onSetHighlight = function(flag) {
var svg = this.findComponent('svgFrame');
if (svg) {
svg.setProperty('editMode',flag?'select':'none');
}
}

self._DeepSee_Component_Widget_meter_resetOverrides = function(themeOnly,recreate) {
var widgetDef = this.getDefinition();
if (widgetDef) {
for (var n = 0; n < widgetDef.dataProperties.length; n++) {
var dataProp = widgetDef.dataProperties[n];
if (dataProp.override) {
zenPage.setModified(true);
dataProp.override = '';
}
}
if (zenPage.recreateWidget) {
zenPage.recreateWidget(this.widgetKey);
}
}
}

self._DeepSee_Component_Widget_meter_setMeterType = function(svg,meter,type) {
if (''==type) {
if ('undefined' != typeof zenPage._oldMeterType) {
type = zenPage._oldMeterType;
}
else {
return;
}
}
if (null==meter) return;
var newType = type;
if (newType != meter._type) {
var newMeter = zenPage.createComponent(newType);
newMeter.setProperty('controllerId',meter.controllerId);
newMeter.setProperty('width',meter.width * (newMeter.viewBoxWidth/meter.viewBoxWidth));
newMeter.setProperty('height',meter.height * (newMeter.viewBoxHeight/meter.viewBoxHeight));
newMeter.label = meter.label;
newMeter.labelStyle = meter.labelStyle;
newMeter.targetValue = meter.targetValue;
newMeter.rangeUpper = meter.rangeUpper;
newMeter.rangeLower = meter.rangeLower;
newMeter.thresholdUpper = meter.thresholdUpper;
newMeter.thresholdLower = meter.thresholdLower;
newMeter.scaleFactor = meter.scaleFactor;
newMeter.animate = meter.animate;
newMeter.disabled = meter.disabled;
newMeter.dataBinding = meter.dataBinding;
newMeter.showConditionally = meter.showConditionally;
var idx = 0;
for (var n = 0; n < svg.children.length; n++) {
if (svg.children[n].id == meter.id) {
idx = n;
break;
}
}
meter.unrender();
svg.children.splice(idx,0,newMeter);
newMeter.parent = svg;
if (svg.document && svg.svgGroup) {
newMeter.renderSVG(svg.document,svg.svgGroup);
}
svg.removeChild(meter);
newMeter.setProperty('id',meter.id);
if (this._selectedMeter==meter) {
this._selectedMeter = newMeter;
}
meter = newMeter;
svg.layoutChildren();
}
}

self._DeepSee_Component_Widget_meter_GetKpiFilterCaption = function(pKPIName,pSpec) {
	return zenClassMethod(this,'GetKpiFilterCaption','L,L','VARCHAR',arguments);
}

self._DeepSee_Component_Widget_meter_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}

self._DeepSee_Component_Widget_meter_ResolveText = function(pEncodedText) {
	return zenInstanceMethod(this,'ResolveText','L','VARCHAR',arguments);
}
self._DeepSee_Component_Widget_meter__Loader = function() {
	zenLoadClass('_DeepSee_Component_Widget_widget');
	_DeepSee_Component_Widget_meter.prototype = zenCreate('_DeepSee_Component_Widget_widget',-1);
	var p = _DeepSee_Component_Widget_meter.prototype;
	if (null==p) {return;}
	p.constructor = _DeepSee_Component_Widget_meter;
	p.superClass = ('undefined' == typeof _DeepSee_Component_Widget_widget) ? zenMaster._DeepSee_Component_Widget_widget.prototype:_DeepSee_Component_Widget_widget.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%DeepSee.Component.Widget.meter';
	p._type = 'meter';
	p.serialize = _DeepSee_Component_Widget_meter_serialize;
	p.getSettings = _DeepSee_Component_Widget_meter_getSettings;
	p.GetKpiFilterCaption = _DeepSee_Component_Widget_meter_GetKpiFilterCaption;
	p.ReallyRefreshContents = _DeepSee_Component_Widget_meter_ReallyRefreshContents;
	p.ResolveText = _DeepSee_Component_Widget_meter_ResolveText;
	p.adjustContentSize = _DeepSee_Component_Widget_meter_adjustContentSize;
	p.exportPDF = _DeepSee_Component_Widget_meter_exportPDF;
	p.getDataController = _DeepSee_Component_Widget_meter_getDataController;
	p.getMeter = _DeepSee_Component_Widget_meter_getMeter;
	p.getMeterCount = _DeepSee_Component_Widget_meter_getMeterCount;
	p.getOverrides = _DeepSee_Component_Widget_meter_getOverrides;
	p.hasOverrides = _DeepSee_Component_Widget_meter_hasOverrides;
	p.meterSelected = _DeepSee_Component_Widget_meter_meterSelected;
	p.navCloseButtonClick = _DeepSee_Component_Widget_meter_navCloseButtonClick;
	p.navDataChange = _DeepSee_Component_Widget_meter_navDataChange;
	p.navGetContentForLevel = _DeepSee_Component_Widget_meter_navGetContentForLevel;
	p.navHeaderButtonClick = _DeepSee_Component_Widget_meter_navHeaderButtonClick;
	p.navSelectItem = _DeepSee_Component_Widget_meter_navSelectItem;
	p.newDataProperty = _DeepSee_Component_Widget_meter_newDataProperty;
	p.onSetHighlight = _DeepSee_Component_Widget_meter_onSetHighlight;
	p.resetOverrides = _DeepSee_Component_Widget_meter_resetOverrides;
	p.setMeterType = _DeepSee_Component_Widget_meter_setMeterType;
}

self._zenClassIdx['http://www.intersystems.com/deepsee/pivot'] = '_DeepSee_Component_Widget_pivot';
self._DeepSee_Component_Widget_pivot = function(index,id) {
	if (index>=0) {_DeepSee_Component_Widget_pivot__init(this,index,id);}
}

self._DeepSee_Component_Widget_pivot__init = function(o,index,id) {
	('undefined' == typeof _DeepSee_Component_Widget_widget__init) ?zenMaster._DeepSee_Component_Widget_widget__init(o,index,id):_DeepSee_Component_Widget_widget__init(o,index,id);
	o.chartToggle = 'none';
	o.dataColors = new Object();
	o.hasDataColors = false;
	o.hasDimTree = true;
	o.labelsVisible = false;
	o.legendPosition = '';
	o.listingView = 'table';
	o.opacity = '1';
	o.opacityToolbar = '1';
	o.origChartSubtitle = '';
	o.origChartTitle = '';
	o.origChartXAxisTitle = '';
	o.origChartYAxisTitles = new Array();
	o.pivotName = '';
	o.pivotView = 'table';
	o.showDimTree = false;
	o.themeChartProperties = 'backgroundStyle,plotAreaStyle,plotEdgeStyle,titleAlign,titleStyle,subtitleStyle,titleBoxStyle,borderStyle,stripesVisible,stripeStyle,seriesColorsOverride,seriesColorScheme,gridStyle,labelStyle,maxLabelLen,axisTitleStyle,valueLabelStyle,valueBoxStyle,plotStyle,lineStyle,markerStyle';
	o.viewType = 'pivot';
}
function _DeepSee_Component_Widget_pivot_serialize(set,s)
{
	var o = this;s[0]='2121805451';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.backgroundColor;s[9]=o.cellAlign;s[10]=o.cellSize;s[11]=o.cellStyle;s[12]=o.cellVAlign;s[13]=(o.centerHeader?1:0);s[14]=o.chartToggle;s[15]=set.serializeList(o,o.children,true,'children');s[16]=set.serializeList(o,o.clickActions,false,'clickActions');s[17]=set.serializeList(o,o.clickActive,false,'clickActive');s[18]=o.clickFilterSpec;s[19]=set.serializeList(o,o.clickTargetProperties,false,'clickTargetProperties');s[20]=set.serializeList(o,o.clickTargets,false,'clickTargets');s[21]=o.colSpan;s[22]=o.colorToolbar;s[23]=o.containerStyle;s[24]=set.serializeList(o,o.controlIndices,false,'controlIndices');s[25]=o.currFilterSpec;s[26]=o.currItemNo;s[27]=o.currSeriesNo;s[28]=o.currValue;s[29]=o.currValueName;s[30]=set.serializeArray(o,o.dataColors,false,'dataColors');s[31]=o.dataSource;s[32]=(o.disabled?1:0);s[33]=(o.dragEnabled?1:0);s[34]=(o.dropEnabled?1:0);s[35]=(o.dynamic?1:0);s[36]=o.enclosingClass;s[37]=o.enclosingStyle;s[38]=o.error;s[39]=set.serializeArray(o,o.filterDefault,false,'filterDefault');s[40]=set.serializeArray(o,o.filterState,false,'filterState');s[41]=set.serializeArray(o,o.filterText,false,'filterText');s[42]=(o.forceToolbar?1:0);s[43]=o.groupClass;s[44]=o.groupStyle;s[45]=(o.hasDataColors?1:0);s[46]=(o.hasDimTree?1:0);s[47]=(o.hasInitialFilters?1:0);s[48]=o.header;s[49]=o.headerLayout;s[50]=o.height;s[51]=(o.hidden?1:0);s[52]=o.hint;s[53]=o.hintClass;s[54]=o.hintStyle;s[55]=o.homeCol;s[56]=o.homeRow;s[57]=o.imageAppLogo;s[58]=o.imageAppLogoWidth;s[59]=o.imageClose;s[60]=o.imageCloseHover;s[61]=o.imageCloseWidth;s[62]=o.imageContract;s[63]=o.imageContractHover;s[64]=o.imageContractWidth;s[65]=o.imageExpand;s[66]=o.imageExpandHover;s[67]=o.imageExpandWidth;s[68]=o.imageMaximize;s[69]=o.imageMaximizeHover;s[70]=o.imageMaximizeWidth;s[71]=o.imageMinimize;s[72]=o.imageMinimizeHover;s[73]=o.imageMinimizeWidth;s[74]=o.imageResize;s[75]=o.imageResizeSize;s[76]=(o.isClosed?1:0);s[77]=o.label;s[78]=o.labelClass;s[79]=o.labelDisabledClass;s[80]=o.labelPosition;s[81]=o.labelStyle;s[82]=(o.labelsVisible?1:0);s[83]=o.layout;s[84]=o.legendPosition;s[85]=o.linkWidgetKey;s[86]=o.listingView;s[87]=(o.maximized?1:0);s[88]=o.minWidth;s[89]=(o.moveEnabled?1:0);s[90]=o.onafterdrag;s[91]=o.onbeforedrag;s[92]=o.onclick;s[93]=o.onclosepending;s[94]=o.ondrag;s[95]=o.ondrop;s[96]=o.onhide;s[97]=o.onrefresh;s[98]=o.onresize;s[99]=o.onshow;s[100]=o.onupdate;s[101]=o.onwindowdrop;s[102]=o.onwindowgrab;s[103]=o.opacity;s[104]=o.opacityToolbar;s[105]=o.origChartSubtitle;s[106]=o.origChartTitle;s[107]=o.origChartXAxisTitle;s[108]=set.serializeList(o,o.origChartYAxisTitles,false,'origChartYAxisTitles');s[109]=o.overlayMode;s[110]=o.pivotName;s[111]=o.pivotView;s[112]=o.prevHomeCol;s[113]=o.prevHomeRow;s[114]=(o.previewMode?1:0);s[115]=o.renderFlag;s[116]=(o.resizeEnabled?1:0);s[117]=o.rowSpan;s[118]=o.sessionCookie;s[119]=set.serializeArray(o,o.settings,false,'settings');s[120]=(o.showDimTree?1:0);s[121]=(o.showLabel?1:0);s[122]=(o.showSidebar?1:0);s[123]=(o.showToolbar?1:0);s[124]=(o.showToolbarBottomBorder?1:0);s[125]=(o.showToolbarOnlyWhenMaximized?1:0);s[126]=o.sidebarContent;s[127]=o.sidebarWidth;s[128]=o.slice;s[129]=o.subtype;s[130]=o.themeChartProperties;s[131]=o.title;s[132]=o.tuple;s[133]=o.valign;s[134]=o.viewType;s[135]=(o.visible?1:0);s[136]=o.widgetKey;s[137]=o.widgetLayout;s[138]=o.width;
}
function _DeepSee_Component_Widget_pivot_getSettings(s)
{
	s['name'] = 'string';
	s['chartToggle'] = 'enum:able,chart,none';
	s['dataColors'] = 'string';
	s['hasDataColors'] = 'boolean';
	s['hasDimTree'] = 'boolean';
	s['labelsVisible'] = 'boolean';
	s['legendPosition'] = 'enum:op,left,bottom,right,none';
	s['listingView'] = 'string';
	s['origChartSubtitle'] = 'string';
	s['origChartTitle'] = 'string';
	s['origChartXAxisTitle'] = 'string';
	s['origChartYAxisTitles'] = 'string';
	s['pivotName'] = 'string';
	s['pivotView'] = 'string';
	s['showDimTree'] = 'boolean';
	s['themeChartProperties'] = 'string';
	s['viewType'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._DeepSee_Component_Widget_pivot_adjustContentSize = function(load,width,height) {
var svg = this.findComponent('svgFrame');
var chart = this.findComponent('svgChart');
var rangeControl = this.findComponent('rangeControl');
var legend = this.findComponent('chartLegend');
var pivot = this.findComponent('table');
var map = this.findComponent('map');
var dtree = this.findComponent('dtree');
var resetIcon = this.findComponent('reset');
var dtreeWrap = this.findComponent('dtreewrapper');
if (svg) {
var svgParentDiv = svg.parent.getEnclosingDiv();
}
var pwidth = width;
if (this.pivotView == 'table') { // JSL4531 - check for chart
if (svgParentDiv) {
svgParentDiv.style.width = '0px';
svgParentDiv.style.height = '0px';
}
this.setProperty('backgroundColor', this.backgroundColor); // JSL4483
this.setProperty('opacity',this.opacity); // JSL4483
} else if (this.pivotView == 'chart') { // JSL4531
if (chart) {
if (svgParentDiv) {
svgParentDiv.style.width = width + 'px';
svgParentDiv.style.height = height + 'px';
}
var attrs = chart.parseStyleSVG(chart.backgroundStyle); // JSL4531
if (zenGet(attrs['opacity']) == '') {                 // JSL4531
attrs['opacity'] = 1.0;                           // JSL4531
}                                                     // JSL4531
chart.setSeeThrough(attrs['opacity']);                 // JSL4531
}
}
if (chart) {
if (zenPage.chartSeriesScheme && zenPage.chartSeriesScheme!=='') {
chart.seriesColorScheme = zenPage.chartSeriesScheme;
chart.seriesColors = '';
}
if (zenPage.chartSeriesColors && zenPage.chartSeriesColors!=='') {
chart.seriesColors = zenPage.chartSeriesColors;
}
}
if (load && pivot.isDrillThrough) {
this.viewType = 'listing';
}
if (this.viewType == 'listing') {
if (svg && svg.getEnclosingDiv()) {
svg.setHidden(true);
}
if (chart) {
chart.setProperty('hidden',true);
}
if (rangeControl) {
rangeControl.setProperty('hidden',true);
}
if (legend && legend.getEnclosingDiv()) {
legend.setHidden(true);
}
if (dtree && dtree.getEnclosingDiv()) {
dtree.setHidden(true);
}
if (resetIcon && resetIcon.getEnclosingDiv()) {
resetIcon.setHidden(true);
}
if (this.listingView == 'map') {
pivot.listingType = 'map';
pivot.setHidden(true);
if (map) {
var mapDiv = map.getEnclosingDiv();
mapDiv.style.display = 'block';
mapDiv.style.width = width-10 + 'px';
mapDiv.style.height = height + 'px';
map.adjustContentSize(load, width, height);
}
}
else {
if (pivot) {
var pivotDiv = pivot.getEnclosingDiv();
if (pivotDiv) {
if (dtree && dtree.getEnclosingDiv() && this.showDimTree) {
pwidth = width - dtree.getEnclosingDiv().offsetWidth;
}
pwidth = (pwidth<3) ? 3 : pwidth;
pivotDiv.style.width = (pwidth-3) + 'px';
pivotDiv.style.height = height + 'px';
pivot.adjustTableLayout();
if (dtreeWrap) {
dtreeWrap.getEnclosingDiv().style.height = height + 'px';
dtreeWrap.getEnclosingDiv().style.overflow = 'auto';
}
}
pivot.listingType = 'table';
pivot.setHidden(false);
}
if (map) {
var mapDiv = map.getEnclosingDiv();
if (mapDiv) {
mapDiv.style.display = 'none';
}
}
}
}
else {
if (map) {
var mapDiv = map.getEnclosingDiv();
if (mapDiv) {
mapDiv.style.display = 'none';
}
}
if (this.pivotView == 'table') {
if (svg && svg.getEnclosingDiv()) {
svg.setHidden(true);
}
if (chart) {
chart.setProperty('hidden',true);
}
if (rangeControl) {
rangeControl.setProperty('hidden',true);
}
if (legend && legend.getEnclosingDiv()) {
legend.setHidden(true);
}
if (dtree && dtree.getEnclosingDiv()) {
dtree.setHidden(this.showDimTree ? false : true);
}
if (resetIcon && resetIcon.getEnclosingDiv()) {
resetIcon.setHidden(this.showDimTree ? false : true);
}
if (pivot) {
pivot.listingType = 'table';
pivot.setHidden(false);
var pivotDiv = pivot.getEnclosingDiv();
if (pivotDiv) {
if (dtree && dtree.getEnclosingDiv() && this.showDimTree) {
pwidth = width - dtree.getEnclosingDiv().offsetWidth;
}
pwidth = (pwidth<3) ? 3 : pwidth;
pivotDiv.style.width = (pwidth-3) + 'px';
pivotDiv.style.height = height + 'px';
pivot.adjustTableLayout();
if (dtreeWrap) {
dtreeWrap.getEnclosingDiv().style.height = height + 'px';
dtreeWrap.getEnclosingDiv().style.overflow = 'auto';
}
}
}
}
else {
if (pivot) {
pivot.listingType = 'table';
pivot.setHidden(true);
}
if (dtree && dtree.getEnclosingDiv()) {
dtree.setHidden(true);
}
if (resetIcon && resetIcon.getEnclosingDiv()) {
resetIcon.setHidden(true);
}
if (svg) {
var legwid = 0;
var leghgt = 0;
if (legend) {
var legendDiv = legend.getEnclosingDiv();
if (legendDiv) {
var legendAttrs = legend.parseStyleSVG(legend.legendStyle);
legendDiv.style.position = 'absolute';
legend.setHidden(this.legendPosition=='none' || this.legendPosition=='');
switch(this.legendPosition) {
case 'top':
var borderWidth = parseInt(legendDiv.style.borderBottomWidth,10) + parseInt(legendDiv.style.borderTopWidth,10);
borderWidth = !isNaN(borderWidth) ? borderWidth : 2;
legendDiv.style.height = (legendAttrs['height']) ? legendAttrs['height'] : '20%';
leghgt = legendDiv.offsetHeight;
legendDiv.style.top = 0 + 'px';
legendDiv.style.left = 0 + 'px';
legendDiv.style.width = ((width>borderWidth)?(width - borderWidth):0) + 'px';
break;
case 'bottom':
var borderWidth = parseInt(legendDiv.style.borderBottomWidth,10) + parseInt(legendDiv.style.borderTopWidth,10);
borderWidth = !isNaN(borderWidth) ? borderWidth : 2;
legendDiv.style.height = (legendAttrs['height']) ? legendAttrs['height'] : '20%';
leghgt = legendDiv.offsetHeight;
legendDiv.style.top = ((height>leghgt)?(height-leghgt):0) + 'px';
legendDiv.style.left = 0 + 'px';
legendDiv.style.width = ((width>borderWidth)?(width - borderWidth):0) + 'px';
break;
case 'left':
var borderHeight = parseInt(legendDiv.style.borderBottomWidth,10) + parseInt(legendDiv.style.borderTopWidth,10);
borderHeight = !isNaN(borderHeight) ? borderHeight : 2;
legendDiv.style.width = (legendAttrs['width']) ? legendAttrs['width'] : '20%';
legwid = legendDiv.offsetWidth;
legendDiv.style.top = 0 + 'px';
legendDiv.style.left = 0 + 'px';
legendDiv.style.height = ((height>borderHeight)?(height-borderHeight):0) + 'px';
break;
case 'right':
var borderHeight = parseInt(legendDiv.style.borderBottomWidth,10) + parseInt(legendDiv.style.borderTopWidth,10);
borderHeight = !isNaN(borderHeight) ? borderHeight : 2;
legendDiv.style.width = (legendAttrs['width']) ? legendAttrs['width'] : '20%';
legendDiv.style.top = 0 + 'px';
legwid = legendDiv.offsetWidth;
legendDiv.style.left = ((width>legwid)?(width-legwid):0) + 'px';
legendDiv.style.height = ((height>borderHeight)?(height-borderHeight):0) + 'px';
break;
}
}
}
var svgWid = width - legwid;
var svgHgt = height - leghgt;
svgWid = (svgWid < 1) ? 1 : svgWid;
svgHgt = (svgHgt < 1) ? 1 : svgHgt;
var svgDiv = svg.getEnclosingDiv();
if (svgDiv) {
svgDiv.style.position = 'absolute';
switch(this.legendPosition) {
case 'top':
svgDiv.style.top = leghgt + 'px';
svgDiv.style.left = 0 + 'px';
break;
case 'left':
svgDiv.style.top = 0 + 'px';
svgDiv.style.left = legwid + 'px';
break;
case 'bottom':
case 'right':
default:
svgDiv.style.top = 0 + 'px';
svgDiv.style.left = 0 + 'px';
break;
}
if (chart && chart.hidden) {
chart.setProperty('hidden',false);
}
if (svg.hidden) {
svg.setHidden(false);
}
if (svgWid != svg.width) {
svg.setProperty("width",svgWid+'px');
}
if (svgHgt != svg.height) {
svg.setProperty("height",svgHgt+'px');
}
}
if (chart) {
var timeBased = chart.isTimeBased()
if (rangeControl) {
if (svgWid != rangeControl.width) {
rangeControl.setProperty("width",svgWid);
rangeControl.render();
}
if (rangeControl.hidden != !timeBased) {
rangeControl.setProperty('hidden',!timeBased);
}
}
var rangeHeight = timeBased ? (rangeControl?parseInt(rangeControl.height):0) : 0;
var chartHgt = svgHgt - rangeHeight;
if (svgWid != chart.width || chartHgt != chart.height) {
if (svgWid != chart.width) {
chart.height = chartHgt;
chart.setProperty("width",svgWid);
}
else {
chart.setProperty("height",svgHgt);
}
}
if (chart.hidden) {
chart.setProperty('hidden',false);
}
if ((svgWid < 150 || chartHgt < 150)) {
chart.setProperty('labelsVisible',false);
}
else {
chart.setProperty('labelsVisible',this.labelsVisible);
}
}
}
}
}
}

self._DeepSee_Component_Widget_pivot_applySetting = function(action,value) {
var table = this.getDataController();
if (!table) return;
switch(action) {
case 'setRowCount':
if (''===value) {
table.rowAxisOptions.headEnabled = false;
}
else {
table.rowAxisOptions.headEnabled = true;
table.rowAxisOptions.headCount = value;
}
table.executeQuery(true);
break;
case 'setRowSort':
if (''!==value) {
table.rowAxisOptions.orderEnabled = true;
table.rowAxisOptions.orderDirection = value;
}
table.executeQuery(true);
break;
case 'setColumnCount':
if (''===value) {
table.columnAxisOptions.headEnabled = false;
}
else {
table.columnAxisOptions.headEnabled = true;
table.columnAxisOptions.headCount = value;
}
table.executeQuery(true);
break;
case 'setColumnSort':
if (''!==value) {
table.columnAxisOptions.orderEnabled = true;
table.columnAxisOptions.orderDirection = value;
}
table.executeQuery(true);
break;
}
}

self._DeepSee_Component_Widget_pivot_cellClickHandler = function(pivot) {
this.currItemNo = '';
this.currSeriesNo = '';
this.currFilterSpec = '';
this._targetPivot = pivot;
window.setTimeout('zenPage.getComponent('+this.index+').realCellClickHandler();',1);
pivot.showMessage($$$Text('Working...'),'');
}

self._DeepSee_Component_Widget_pivot_changeChartType = function(value) {
var pivot = this.getDataController();
if ((this.pivotView == 'table')&&(value!='')) {
this.toggleChart();
}
if (value == 'table') {
this.toggleChart();		// DTB113 - use toggleChart
this.adjustSizes(false);
this.updateControlState();
return;
}
var svg = this.findComponent('svgFrame');
var chart = this.findComponent('svgChart');
var timeBased = chart.isTimeBased();
var registeredItems = pivot._registeredCounter;
this.chartDataChange(zenPage.getNavigator(),svg,chart,'chart-ChartType',value,1);
if (pivot._registeredCounter > registeredItems) {
pivot.unregister(chart); // WAL083 (5) -- unregister the old chart so the pivot table doesn't try to update it
}
if (!timeBased) {
this.adjustSizes(false);
}
this.updateControlState(); // WAL083 (2)
}

self._DeepSee_Component_Widget_pivot_chartClickHandler = function(chart) {
var controller = this.getDataController();
var series = chart.getSelectedSeries();
var item = chart.getSelectedItem();
if ((series>(-1)) && (item>(-1))) {
this.currFilterSpec = controller.getFilterForCells(item+1,series+1);
}
else {
this.currFilterSpec = "";
}
this.currItemNo = parseInt(item) + 1;
this.currSeriesNo = parseInt(series) + 1;
this.currValueName = 'Value';
this.currValue = '';
if (controller && controller.getValueName) {
this.currValueName = controller.getValueName();
}
var data = chart.getSeriesData(series);
if (data && null != data[item]) {
this.currValue = data[item];
}
if (controller && controller.selectCellRange) {
controller.selectCellRange(this.currItemNo,this.currSeriesNo,this.currItemNo,this.currSeriesNo);
}
this.updateControlState();
this.raiseEventHandler('click');
}

self._DeepSee_Component_Widget_pivot_chartCloseButtonClick = function(navigator,chart,key) {
var t = key.toString().split(':');
switch(t[0]) {
case 'chart-yAxis':
if (confirm('Do you wish to remove this y axis?')) {
var axisNo = parseInt(t[1]);
var isEmpty = true;
var st = chart.seriesYAxes.toString().split(',');
for (var d = 0; d < st.length; d++) {
if (st[d] == axisNo) {
st[d] = 0;
}
else if (st[d]) {
isEmpty = false;
}
}
chart.seriesYAxes = isEmpty ? '' : st.join(',');
chart.yAxisList.splice(axisNo,1);
chart.currYAxis = 0;
chart.unrender();
chart.render();
navigator.refreshTopSheet();
}
break;
default:
break;
}
}

self._DeepSee_Component_Widget_pivot_chartCreateLength = function(value,units) {
var len = '';
value = ('undefined' == typeof value)||(''===value) ? 0 : value;
switch(units) {
case '%':
len = value;
break;
case 'px':
len = value + 'px';
break;
}
return len;
}

self._DeepSee_Component_Widget_pivot_chartDataArrange = function(navigator,chart,key,swap,final) {
var keyNo = 0;
if (key.toString().indexOf(':')>0) {
var t = key.split(':');
key = t[0];
keyNo = parseInt(t[1]);
}
switch(key) {
case 'chart-seriesDetail':
if (!this._oldColors) {
this._oldColors = zenGet(chart.seriesColorsOverride);
}
if (!this._oldTypes) {
this._oldTypes = zenGet(chart.seriesTypes);
}
if (!this._oldMarkers) {
this._oldMarkers = zenGet(chart.markerShapes);
}
var seriesColors = this.chartParseColorList(this._oldColors);
var newList = [];
for (var n = 0; n < seriesColors.length; n++) {
newList[n] = seriesColors[n];
}
var x = newList[swap.oldPosition];
newList[swap.oldPosition] = newList[swap.newPosition];
newList[swap.newPosition] = x;
chart.setProperty('seriesColorsOverride',newList.join(','));
var types = this._oldTypes.toString().split(',');
var newList = [];
for (var n = 0; n < types.length; n++) {
newList[n] = types[n];
}
var x = newList[swap.oldPosition];
newList[swap.oldPosition] = newList[swap.newPosition];
newList[swap.newPosition] = x;
chart.setProperty('seriesTypes',newList.join(','));
var shapes = this._oldMarkers.toString().split(',');
var newList = [];
for (var n = 0; n < shapes.length; n++) {
newList[n] = shapes[n];
}
var x = newList[swap.oldPosition];
newList[swap.oldPosition] = newList[swap.newPosition];
newList[swap.newPosition] = x;
chart.setProperty('markerShapes',newList.join(','));
if (final) {
delete this._oldColors;
delete this._oldTypes;
delete this._oldMarkers;
}
break;
case 'chart-yAxis':
if (!this._oldYAxis) {
this._oldYAxis = zenGet(chart.yAxisList);
}
var newList = [];
for (var n = 0; n < this._oldYAxis.length; n++) {
newList[n] = this._oldYAxis[n];
}
var x = newList[swap.oldPosition];
newList[swap.oldPosition] = newList[swap.newPosition];
newList[swap.newPosition] = x;
chart.yAxisList = newList;
chart.render();
if (final) {
delete this._oldYAxis;
}
break;
default:
break;
}
}

self._DeepSee_Component_Widget_pivot_chartDataChange = function(navigator,svg,chart,key,value,final) {
var keyNo = 0;
if (key.toString().indexOf(':')>0) {
var t = key.split(':');
key = t[0];
keyNo = parseInt(t[1]);
}
var t = key.toString().split('-');
var attr = t[1];
var object = chart;
var apply = final || (chart.getSeriesSize()<50);
var which = '';
if (attr == 'xAxis') {
which = attr;
t.splice(0,1);
key = t.join('-');
var t = key.toString().split('-');
var attr = t[1];
object = chart.xAxis;
if (!object.parent) {
object.parent = chart;
}
}
else if (attr == 'yAxis') {
which = attr;
t.splice(0,1);
key = t.join('-');
var t = key.toString().split('-');
var attr = t[1];
object = chart.yAxisList[keyNo];
if (!object.parent) {
object.parent = chart;
}
}
switch (attr) {
case 'msgIfNoData': // JSL4478
case 'warnIfNoData': // JSL4478
case 'noDataOpacity': // JSL4478
case 'noDataFill': // JSL4478
case 'noDataStroke': // JSL4478
if (apply) {
chart.setProperty(attr,value); // JSL4478
}
break;
case 'ChartType':
if (apply) {
this.chartSetChartType(svg,chart,value);
}
break;
case 'seriesCount':
case 'seriesSize':
if (final) {
this[attr] = parseInt(value);
chart.setProperty(key,value);
this.updateChartData();
}
break;
case 'width':
case 'height':
zen('svg').setProperty(attr,value);
chart.setProperty(attr,value);
break;
case 'marginTop':
case 'marginTopUnits':
if (apply) {
var refresh = false;
this[attr] = value;
if (attr=='marginTop' && this.marginTopUnits=='auto') {
this.marginTopUnits = '%';
refresh = true;
}
object.setProperty('marginTop',this.chartCreateLength(this.marginTop,this.marginTopUnits));
if (refresh) {
navigator.refreshTopSheet();
}
}
break;
case 'marginBottom':
case 'marginBottomUnits':
if (apply) {
var refresh = false;
this[attr] = value;
if (attr=='marginBottom' && this.marginBottomUnits=='auto') {
this.marginBottomUnits = '%';
refresh = true;
}
object.setProperty('marginBottom',this.chartCreateLength(this.marginBottom,this.marginBottomUnits));
if (refresh) {
navigator.refreshTopSheet();
}
}
break;
case 'marginLeft':
case 'marginLeftUnits':
if (apply) {
var refresh = false;
this[attr] = value;
if (attr=='marginLeft' && this.marginLeftUnits=='auto') {
this.marginLeftUnits = '%';
refresh = true;
}
object.setProperty('marginLeft',this.chartCreateLength(this.marginLeft,this.marginLeftUnits));
if (refresh) {
navigator.refreshTopSheet();
}
}
break;
case 'marginRight':
case 'marginRightUnits':
if (apply) {
var refresh = false;
this[attr] = value;
if (attr=='marginRight' && this.marginRightUnits=='auto') {
this.marginRightUnits = '%';
refresh = true;
}
object.setProperty('marginRight',this.chartCreateLength(this.marginRight,this.marginRightUnits));
if (refresh) {
navigator.refreshTopSheet();
}
}
break;
case 'title':
if (apply) {
if (typeof this.origChartTitle != 'undefined') {
if (which == 'xAxis') {
this.origChartXAxisTitle = value;
}
else if (which == 'yAxis') {
this.origChartYAxisTitles[keyNo] = value;
}
else {
this.origChartTitle = value;
}
}
object.setProperty(attr,value);
}
break;
case 'subtitle':
if (apply) {
if (typeof this.origChartSubtitle != 'undefined') {
this.origChartSubtitle = value;
}
object.setProperty(attr,value);
}
break;
case 'title':
case 'seriesCount':
case 'seriesSize':
case 'radius':
case 'legendVisible':
case 'gap':
default:
if (apply) {
object.setProperty(attr,value);
}
break;
case 'labelsVisible':
case 'maxLabelLen':
if (apply) {
object.setProperty(attr,value);
}
break;
case 'titleImageStyle':
case 'backgroundStyle':
case 'plotAreaStyle':
case 'titleStyle':
case 'subtitleStyle':
case 'labelStyle':
case 'axisTitleStyle':
case 'valueLabelStyle':
case 'valueBoxStyle':
case 'stripeStyle':
case 'bandUpperStyle':
case 'bandLowerStyle':
case 'borderStyle':
case 'upperRightStyle':
case 'lowerLeftStyle':
case 'lineStyle':
case 'markerStyle':
case 'indicatorStyle':
case 'axisLineStyle':
case 'baseLineStyle':
case 'plotStyle':
case 'plotEdgeStyle':
case 'legendStyle':
case 'gridStyle':
case 'titleBoxStyle':
case 'legendStyle':
case 'legendLabelStyle':
case 'legendRectStyle':
case 'majorGridStyle':
case 'minorGridStyle':
if (apply) {
t.splice(0,2);
var styleProp = t.join('-');
var styleValues = {};
if (styleProp && styleProp.length) {
switch(styleProp) {
case 'textStyle':
var cv = value.toString().split(',');
for (var n = 0; n < cv.length; n++) {
styleValues[cv[n]] = true;
}
styleProp = null;
break;
case 'opacity':
value = value >=1 ? '' : value;
chart.setSeeThrough(value); // JSL4483
break;
case 'stroke-dasharray':
switch (value) {
case 'dotted':
value = '1,2';
break;
case 'dashed':
value = '10,10';
break;
case 'solid':
default:
value = '';
break;
}
break;
}
var style = object.getProperty(attr);
var info = navigator.parseStyleSVG(style);
if (styleProp) {
info[styleProp] = value;
}
else {
if (styleValues.bold) {
info['font-weight'] = 'bold';
}
else {
delete info['font-weight'];
}
if (styleValues.italic) {
info['font-style'] = 'italic';
}
else {
delete info['font-style'];
}
if (styleValues.smallCaps) {
info['font-variant'] = 'small-caps';
}
else {
delete info['font-variant'];
}
if (styleValues.shadow) {
info['text-shadow'] = '1px 1px 1px #808080';
}
else {
delete info['text-shadow'];
}
}
if (info['font-size']) {
info['font-size'] = parseInt(info['font-size']) + 'px';
}
style = navigator.convertCSSToText(info);
object.setProperty(attr,style);
if (which=='yAxis') {
}
var spec = navigator.getParentSpec();
spec.value = style;
}
}
break;
case 'seriesDetail':
if (apply) {
t.splice(0,2);
var styleProp = t.join('-');
switch (styleProp) {
case 'fill':
var seriesColors = this.chartParseColorList(zenGet(chart.seriesColorsOverride));
seriesColors[this._seriesNo] = value;
chart.setProperty('seriesColorsOverride',seriesColors.join(','));
break;
case 'plotType':
var types = zenGet(chart.seriesTypes).toString().split(',');
types[this._seriesNo] = value;
chart.setProperty('seriesTypes',types.join(','));
break;
case 'markerShape':
var shapes = zenGet(chart.markerShapes).toString().split(',');
shapes[this._seriesNo] = value;
chart.setProperty('markerShapes',shapes.join(','));
break;
case 'name':
var names = zenGet(chart.seriesNames).toString().split(',');
names[this._seriesNo] = value;
chart.setProperty('seriesNames',names.join(','));
zen('chartData').setProperty('propertyList',names.join(','));
this.updateChartData();
break;
case 'yAxisNo':
var axes = zenGet(chart.seriesYAxes).toString().split(',');
axes[this._seriesNo] = value;
for (var n = 0; n < axes.length; n++) {
axes[n] = axes[n]&&axes[n]!=='' ? axes[n] : 0;
}
chart.setProperty('seriesYAxes',axes.join(','));
break;
}
}
break;
}
return true;
}

self._DeepSee_Component_Widget_pivot_chartGetContentForLevel = function(navigator,chart,level,key,value) {
var title = $$$Text('Chart Settings','%ZEN');
var content = { title: title, items:[] };
var settings = {};
chart.getSettings(settings);
var keyNo = 0;
if (key.toString().indexOf(':')>0) {
var t = key.split(':');
key = t[0];
keyNo = parseInt(t[1]);
}
var t = key.toString().split('-');
var attr = t[1];
switch (key) {
case 'chart-ChartSettings':
content.items[content.items.length] = {display:'image-caption', image:'deepsee/ds2_linechart_44.png',caption:$$$Text('Chart Type','%ZEN'), action:'drill', key:'chart-ChartType'};
content.items[content.items.length] = {display:'image-caption', image:'deepsee/ds2_wrench2_44.png',caption:$$$Text('Size &amp; Appearance','%ZEN'), action:'drill', key:'chart-ChartSize'};
content.items[content.items.length] = {display:'image-caption', image:'deepsee/ds2_text_44.png',caption:$$$Text('Titles &amp; Labels','%ZEN'), action:'drill', key:'chart-ChartLabels'};
content.items[content.items.length] = {display:'image-caption', image:'deepsee/ds2_text_44.png',caption:$$$Text('No Data Warning','%ZEN'), action:'drill', key:'chart-ChartNoData'}; // JSL4478
content.items[content.items.length] = {display:'image-caption', image:'deepsee/ds2_palette_44.png', caption:$$$Text('Colors &amp; Style','%ZEN'), action:'drill', key:'chart-ChartColors'};
if (chart.hasAxes()) {
content.items[content.items.length] = {display:'image-caption', image:'deepsee/ds2_ruler_44.png', caption:$$$Text('x Axis','%ZEN'), action:'drill', key:'chart-xAxis'};
content.items[content.items.length] = {display:'image-caption', image:'deepsee/ds2_ruler_44.png', caption:$$$Text('y Axis','%ZEN'), action:'drill', key:'chart-yAxisList'};
}
content.items[content.items.length] = {display:'image-caption', image:'deepsee/ds2_bar_chart_44.png', caption:$$$Text('Series Details','%ZEN'), action:'drill', key:'chart-seriesList'};
break;
case 'chart-ChartSize':
title = $$$Text('Size and Appearance','%ZEN');
content.items[content.items.length] = {display:'caption', caption:$$$Text('Margins','%ZEN'), action:'drill', key:'chart-ChartMargins'};
if ((chart._type!='bubbleChart')) {
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Multiples','%ZEN'), edit:'switch', value:zenGet(chart.showMultiples),	key:'chart-showMultiples'};
}
if (!chart.timeBased && typeof settings['chartPivot'] != 'undefined') {
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Pivot','%ZEN'), edit:'switch', value:zenGet(chart.chartPivot),	key:'chart-chartPivot'};
}
if (typeof settings['chartStacked'] != 'undefined') {
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Stacked','%ZEN'), edit:'switch', value:zenGet(chart.chartStacked),	key:'chart-chartStacked'};
}
if (typeof settings['chartFilled'] != 'undefined') {
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Filled','%ZEN'), edit:'switch', value:zenGet(chart.chartFilled),	key:'chart-chartFilled'};
}
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Appearance','%ZEN'), edit:'choice', value:zenGet(chart.appearance),  key:'chart-appearance',valueList:'2D,3D', displayList:'2D,3D'};
if (typeof settings['pieHeight'] != 'undefined') {
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Pie Height','%ZEN'), edit:'slider', value:zenGet(chart.pieHeight),	key:'chart-pieHeight', maxValue:1.0};
}
if (typeof settings['pieScale'] != 'undefined') {
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Pie Size','%ZEN'), edit:'slider', value:zenGet(chart.pieScale),	key:'chart-pieScale', maxValue:2.0};
}
if (typeof settings['holeSize'] != 'undefined') {
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Pie Hole Size','%ZEN'), edit:'slider', value:zenGet(chart.holeSize),	key:'chart-holeSize', maxValue:1.0};
}
else {
if (!chart.timeBased && (chart._type!='treeMapChart')) {
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Zoom','%ZEN'), edit:'switch', value:zenGet(chart.hasZoom),	key:'chart-hasZoom'};
}
}
if (typeof settings['separateSeriesScale'] != 'undefined') {
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Separate Series Scale','%ZEN'), edit:'switch', value:zenGet(chart.separateSeriesScale),	key:'chart-separateSeriesScale'};
}
if (typeof settings['invert'] != 'undefined') {
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Invert','%ZEN'), edit:'switch', value:zenGet(chart.invert),	key:'chart-invert'};
}
if (typeof settings['gap'] != 'undefined') {
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Gap','%ZEN'), edit:'slider', value:zenGet(chart.gap),	key:'chart-gap', minValue:0, maxValue:135, stepSize:1};
}
if (typeof settings['plotBy'] != 'undefined') {
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Plot By','%ZEN'), edit:'choice', value:zenGet(chart.plotBy),	key:'chart-plotBy', valueList:'items,series', displayList:'items,series' };
}
if (typeof settings['showQuadrant'] != 'undefined') {
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Quadrant','%ZEN'), edit:'switch', value:zenGet(chart.showQuadrant),	key:'chart-showQuadrant'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Radius','%ZEN'), edit:'slider', value:zenGet(chart.radius),	key:'chart-radius', minValue:1, maxValue:20, stepSize:1};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Opacity','%ZEN'), edit:'slider', value:zenGet(chart.opacity),	key:'chart-opacity', minValue:0, maxValue:1, stepSize:0.1};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Regression','%ZEN'), edit:'switch', value:zenGet(chart.showRegression),	key:'chart-showRegression'};
}
break;
case 'chart-ChartMargins':
title = $$$Text('Chart Margins','%ZEN');
var info = this.chartParseLength(chart.marginTop);
this.marginTopUnits = info.units;
this.marginTop = info.value;
var info = this.chartParseLength(chart.marginBottom);
this.marginBottomUnits = info.units;
this.marginBottomTop = info.value;
var info = this.chartParseLength(chart.marginLeft);
this.marginLeftUnits = info.units;
this.marginLeft = info.value;
var info = this.chartParseLength(chart.marginRight);
this.marginRightUnits = info.units;
this.marginRightTop = info.value;
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Top','%ZEN'), edit:'slider', value:this.marginTop,	key:'chart-marginTop', minValue:0, maxValue:100, stepSize:1};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Top Units','%ZEN'), edit:'choice', value:this.marginTopUnits,	key:'chart-marginTopUnits', valueList:'auto,%,px', displayList:$$$Text('Auto,%,px','%ZEN')};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Left','%ZEN'), edit:'slider', value:this.marginLeft,	key:'chart-marginLeft', minValue:0, maxValue:100, stepSize:1};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Left Units','%ZEN'), edit:'choice', value:this.marginLeftUnits,	key:'chart-marginLeftUnits', valueList:'auto,%,px', displayList:$$$Text('Auto,%,px','%ZEN')};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Right','%ZEN'), edit:'slider', value:this.marginRight,	key:'chart-marginRight', minValue:0, maxValue:100, stepSize:1};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Right Units','%ZEN'), edit:'choice', value:this.marginRightUnits,	key:'chart-marginRightUnits', valueList:'auto,%,px', displayList:$$$Text('Auto,%,px','%ZEN')};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Bottom','%ZEN'), edit:'slider', value:this.marginBottom,	key:'chart-marginBottom', minValue:0, maxValue:100, stepSize:1};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Bottom Units','%ZEN'), edit:'choice', value:this.marginBottomUnits,	key:'chart-marginBottomUnits', valueList:'auto,%,px', displayList:$$$Text('Auto,%,px','%ZEN')};
break;
case 'chart-ChartLabels':
title = $$$Text('Chart Labels','%ZEN');
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Text Size','%ZEN'), edit:'choice', value:zenGet(chart.textSize),  key:'chart-textSize',valueList:'small,medium,large', displayList:$$$Text('Small,Medium,Large','%ZEN')};
content.items[content.items.length] = {display:'section', caption:$$$Text('Titles','%ZEN')};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Title','%ZEN'), edit:'string', value:zenGet(this.origChartTitle,zenGet(chart.title)),  key:'chart-title'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Title Style','%ZEN'), action:'drill', value:zenGet(chart.titleStyle),	key:'chart-titleStyle', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Subtitle','%ZEN'), edit:'string', value:zenGet(this.origChartSubtitle,zenGet(chart.subtitle)),  key:'chart-subtitle'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Subtitle Style','%ZEN'), action:'drill', value:zenGet(chart.subtitleStyle),	key:'chart-subtitleStyle', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Title Align','%ZEN'), edit:'choice', value:zenGet(chart.titleAlign),	key:'chart-titleAlign', valueList:'left,center,right', displayList:'&#9664;,&#9632;,&#9654;'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Title Box','%ZEN'), action:'drill', value:zenGet(chart.titleBoxStyle),	key:'chart-titleBoxStyle', text:''};
if (zenPage.fetchOptionList) {
content.items[content.items.length] = {display:'caption', caption:$$$Text('Title Image','%ZEN'), action:'drill', value:zenGet(chart.titleImage),	key:'chart-titleImage'};
var imageLeft = 0;
var imageTop = 0;
var imageWidth = 50;
var imageHeight = 50;
var imageStyle = chart.titleImageStyle;
if (imageStyle) {
var t = imageStyle.toString().split(';');
for (var ti = 0; ti < t.length; ti++) {
var t2 = t[ti].toString().split(':');
switch (t2[0]) {
case 'left':
imageLeft = parseInt(t2[1]);
break;
case 'top':
imageTop = parseInt(t2[1]);
break;
case 'width':
imageWidth = parseInt(t2[1]);
break;
case 'height':
imageHeight = parseInt(t2[1]);
break;
}
}
}
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Image Width','%ZEN'), edit:'slider-toggle', value:imageWidth, key:'chart-titleImageStyle-width', minValue:0, maxValue:150};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Image Height','%ZEN'), edit:'slider-toggle', value:imageHeight, key:'chart-titleImageStyle-height', minValue:0, maxValue:150};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Image Top','%ZEN'), edit:'slider-toggle', value:imageTop, key:'chart-titleImageStyle-top', minValue:0, maxValue:150};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Image Left','%ZEN'), edit:'slider-toggle', value:imageHeight, key:'chart-titleImageStyle-left', minValue:0, maxValue:150};
}
content.items[content.items.length] = {display:'section', caption:$$$Text('Labels','%ZEN')};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Labels','%ZEN'), edit:'switch', value:zenGet(chart.labelsVisible),	key:'chart-labelsVisible'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Label Style','%ZEN'), action:'drill', value:zenGet(chart.labelStyle),	key:'chart-labelStyle', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Label Length','%ZEN'), edit:'stepper-value', value:zenGet(chart.maxLabelLen),	key:'chart-maxLabelLen', minValue:1, maxValue:50};
if (typeof settings['holeSize'] == 'undefined') {
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Axis Title','%ZEN'), action:'drill', value:zenGet(chart.axisTitleStyle),	key:'chart-axisTitleStyle', text:''};
if (typeof settings['labelValue'] != 'undefined') {
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Value Label','%ZEN'), edit:'choice', value:zenGet(chart.labelValue),	key:'chart-labelValue', displayList:$$$Text(',#,%Sum,%Max','%ZEN'),valueList:'none,value,pctOfTotal,pctOfMax' };
}
else {
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Value Labels','%ZEN'), edit:'switch', value:zenGet(chart.valueLabelsVisible),	key:'chart-valueLabelsVisible'};
}
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Value Style','%ZEN'), action:'drill', value:zenGet(chart.valueLabelStyle),	key:'chart-valueLabelStyle', text:''};
}
if (typeof settings['showValue'] != 'undefined') {
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Show Value','%ZEN'), edit:'switch', value:zenGet(chart.showValue),	key:'chart-showValue' };
}
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Value Format','%ZEN'), edit:'string', action:'drill', value:zenGet(chart.valueLabelFormat),	key:'chart-valueLabelFormat'};
if (typeof settings['showPercentage'] != 'undefined') {
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Show %','%ZEN'), edit:'switch', value:zenGet(chart.showPercentage),	key:'chart-showPercentage' };
}
if (typeof settings['labelRadius'] != 'undefined') {
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Label Position','%ZEN'), edit:'slider-toggle', value:zenGet(chart.labelRadius),	key:'chart-labelRadius', maxValue:1.5, minValue:0.5};
}
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Value Box Style','%ZEN'), action:'drill', value:zenGet(chart.valueBoxStyle),	key:'chart-valueBoxStyle', text:''};
break;
case 'chart-titleImage':
title = $$$Text('Title Image','%ZEN');		// DTB236
if (zenPage.fetchOptionList) {
var options = zenPage.fetchOptionList('image-list','');
var list = options.children;
content.html = zenPage.getNavigator().getIconListHTML(list,key,'');
}
break;
case 'chart-valueLabelFormat':
title = $$$Text('Numeric Format','%ZEN');
var list = [
{ caption:$$$Text('###','%ZEN'), value:'###'},
{ caption:$$$Text('###.#','%ZEN'), value:'###.#'},
{ caption:$$$Text('###.##','%ZEN'), value:'###.##'},
{ caption:$$$Text('###.###','%ZEN'), value:'###.###'},
{ caption:$$$Text('#,##','%ZEN'), value:'#,##'},
{ caption:$$$Text('#,##.#','%ZEN'), value:'#,##.#'},
{ caption:$$$Text('#,##.##','%ZEN'), value:'#,##.##'},
{ caption:$$$Text('#,##.###','%ZEN'), value:'#,##.###'},
{ caption:$$$Text('##.##%','%ZEN'), value:'##.##%'},
];
content.html = navigator.getChooserListHTML(list,key,zenGet(chart.valueLabelFormat),$$$Text('Format','%ZEN'),$$$Text('Choose a numeric format','%ZEN'));
break;
case 'chart-ChartLegends':
title = $$$Text('Chart Legends','%ZEN');
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Legend','%ZEN'), edit:'choice', value:zenGet(chart.legendVisible),	key:'chart-legendVisible', valueList:'auto,true,false', displayList:$$$Text('Auto,On,Off','%ZEN')};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Legend Title','%ZEN'), edit:'string', value:zenGet(chart.legendTitle),  key:'chart-legendTitle'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Legend Style','%ZEN'), action:'drill', value:zenGet(chart.legendStyle),	key:'chart-legendStyle', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Legend Label','%ZEN'), action:'drill', value:zenGet(chart.legendLabelStyle),	key:'chart-legendLabelStyle', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Legend Rect','%ZEN'), action:'drill', value:zenGet(chart.legendRectStyle),	key:'chart-legendRectStyle', text:''};
break;
case 'chart-ChartColors':
title = $$$Text('Chart Colors','%ZEN');
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Series Scheme','%ZEN'), action:'drill', value:zenGet(chart.seriesColorScheme),	key:'chart-seriesColorScheme'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Background','%ZEN'), action:'drill', value:zenGet(chart.backgroundStyle),	key:'chart-backgroundStyle', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Plot Area','%ZEN'), action:'drill', value:zenGet(chart.plotAreaStyle),	key:'chart-plotAreaStyle', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Plot Style','%ZEN'), action:'drill', value:zenGet(chart.plotStyle),	key:'chart-plotStyle', text:''};
if (typeof settings['holeSize'] == 'undefined') {
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Grid Style','%ZEN'), action:'drill', value:zenGet(chart.gridStyle),	key:'chart-gridStyle', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Axis Line Style','%ZEN'), action:'drill', value:zenGet(chart.axisLineStyle),	key:'chart-axisLineStyle', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Base Line Style','%ZEN'), action:'drill', value:zenGet(chart.baseLineStyle),	key:'chart-baseLineStyle', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Line Style','%ZEN'), action:'drill', value:zenGet(chart.lineStyle),	key:'chart-lineStyle', text:''};
if (chart._type == 'lineChart' || chart._type == 'comboChart' || chart._type == 'xyChart') {
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Markers Visible','%ZEN'), value:zenGet(chart.markersVisible),	key:'chart-markersVisible', edit:'switch'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Marker Size','%ZEN'), edit:'slider', value:zenGet(chart.markerScale),	key:'chart-markerScale', maxValue:3.0};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Marker Style','%ZEN'), action:'drill', value:zenGet(chart.markerStyle),	key:'chart-markerStyle', text:''};
}
if (chart._type == 'lineChart') {
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Indicators','%ZEN'), edit:'switch', value:zenGet(chart.indicatorsVisible),	key:'chart-indicatorsVisible'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Indicator Style','%ZEN'), action:'drill', value:zenGet(chart.indicatorStyle),	key:'chart-indicatorStyle', text:''};
}
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Band Upper','%ZEN'), edit:'number', value:zenGet(chart.bandUpper),	key:'chart-bandUpper'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Upper Style','%ZEN'), action:'drill', value:zenGet(chart.bandUpperStyle),	key:'chart-bandUpperStyle', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Band Lower','%ZEN'), edit:'number', value:zenGet(chart.bandLower),	key:'chart-bandLower'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Lower Style','%ZEN'), action:'drill', value:zenGet(chart.bandLowerStyle),	key:'chart-bandLowerStyle', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Stripes','%ZEN'), edit:'switch', value:zenGet(chart.stripesVisible),	key:'chart-stripesVisible'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Stripe Style','%ZEN'), action:'drill', value:zenGet(chart.stripeStyle),	key:'chart-stripeStyle', text:''};
}
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Border Style','%ZEN'), action:'drill', value:zenGet(chart.borderStyle),	key:'chart-borderStyle', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Border Offset','%ZEN'), edit:'slider', value:zenGet(chart.borderOffset),	key:'chart-borderOffset', minValue:0, maxValue:25, stepSize:1};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Border Radius','%ZEN'), edit:'slider', value:zenGet(chart.borderRadius),	key:'chart-borderRadius', minValue:0, maxValue:25, stepSize:1};
if (typeof settings['upperRightStyle'] != 'undefined') {
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Upper Right','%ZEN'), action:'drill', value:zenGet(chart.upperRightStyle),	key:'chart-upperRightStyle', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Lower Left','%ZEN'), action:'drill', value:zenGet(chart.lowerLeftStyle),	key:'chart-lowerLeftStyle', text:''};
}
if (chart.appearance == '3D') {
if (typeof settings['holeSize'] == 'undefined') {
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('3D Edge Style','%ZEN'), action:'drill', value:zenGet(chart.plotEdgeStyle),	key:'chart-plotEdgeStyle', text:''};
}
}
break;
case 'chart-seriesList':
title = $$$Text('Data Series','%ZEN');
var colors = chart.getColorSchemeArray(chart.seriesColorScheme);
var seriesColors = this.chartParseColorList(zenGet(chart.seriesColorsOverride));
if ('undefined' == typeof this.seriesCount) {
var scount = 8;
}
else {
var scount = parseInt(this.seriesCount);
}
var types = zenGet(chart.seriesTypes).toString().split(',');
scount = scount < 8 ? 8 : scount;
for (var n = 0; n < scount; n++) {
var fill = colors&&colors.length ? colors[n%colors.length] : 'none';
if (seriesColors && seriesColors[n]) {
fill = seriesColors[n];
}
var fillColor = navigator.transformColor(fill);
var scaption = $$$Text('Series','%ZEN') + ' ' + (n+1);
if (chart._type == 'comboChart') {
scaption = (types[n] ? types[n] : (chart.isTimeBased()?'line':'bar')) + ' ' + (n+1);
}
content.items[content.items.length] = {display:'caption-value-hz', caption:scaption, action:'drill', key:'chart-seriesDetail:'+n, valueStyle:'width:80px;border-radius:5px;border:1px solid #B0B0B0;background:'+fillColor+';',value:fill, text:'', canDrag:true};
}
break;
case 'chart-seriesDetail':
title = $$$Text('Data Series','%ZEN') + ' ' + (keyNo+1);
this._seriesNo = keyNo;
var list = zenGet(chart.seriesNames).toString().split(',');
var sname = list[this._seriesNo] ? list[this._seriesNo] : '';
var seriesColors = this.chartParseColorList(zenGet(chart.seriesColorsOverride));
var fill = seriesColors[keyNo] ? seriesColors[keyNo] : 'none';
var fillColor = navigator.transformColor(fill);
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Color','%ZEN'), action:'drill', value:'', key:key+'-fill', valueStyle:'width:80px;border-radius:5px;border:1px solid #B0B0B0;background:'+fillColor+';',value:fill,text:''};
var list = chart.yAxisList;
if (list && list.length>1) {
var axes = zenGet(chart.seriesYAxes).toString().split(',');
var yNo = (axes[this._seriesNo]&&axes[this._seriesNo]!=='') ? axes[this._seriesNo] : 0;
var vlist = [];
var dlist = [];
for (var n = 0; n < list.length; n++) {
vlist[n] = n;
dlist[n] = n+1;
}
vlist = vlist.join(',');
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('y Axis','%ZEN'), edit:'choice', value:yNo,	key:key+'-yAxisNo', valueList:vlist,displayList:dlist};
}
if (chart._type == 'comboChart') {
var types = zenGet(chart.seriesTypes).toString().split(',');
var plotType = types[this._seriesNo] ? types[this._seriesNo] : 'bar';
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Plot Type','%ZEN'), edit:'choice', value:plotType,	key:key+'-plotType', valueList:'bar,line,area,target', displayList:$$$Text('Bar,Line,Area,Tgt','%ZEN')};
}
if (chart._type == 'lineChart' || chart._type == 'comboChart') {
var markers = zenGet(chart.markerShapes).toString().split(',');
if (markers.length>0) {
var markerShape = markers[this._seriesNo%markers.length] ? markers[this._seriesNo%markers.length] : 'circle';
}
else {
var markerShape = 'circle';
}
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Marker Shape','%ZEN'), edit:'choice', value:markerShape,	key:key+'-markerShape', valueList:'circle,up,down,square', displayList:'&#x25CF;,&#x25B2;,&#x25BC;,&#x25A0;'};
}
break;
case 'chart-yAxisList':
var list = chart.yAxisList;
if (!list) {
chart.yAxisList = [];
}
if (!list.length) {
var axis = zenPage.createComponent('axis');
chart.yAxisList[0] = axis;
list = chart.yAxisList;
}
if (list.length < 8) {
content.headerButtons = [
{key:'chart-addYAxis', caption:$$$Text('Add Y Axis','%ZEN'), image:'deepsee/ds2_plus_44_w.png'}
];
}
for (var n = 0; n < list.length; n++) {
content.items[content.items.length] = {display:'caption', caption:$$$Text('yAxis ','%ZEN') + ((list.length>1)?(n+1):''), action:'drill', key:'chart-yAxis:'+n, closeButton:true, canDrag:true};
}
break;
case 'chart-yAxis':
case 'chart-xAxis':
var k2 = '';
switch(attr) {
case 'xAxis':
title = $$$Text('x Axis','%ZEN');
var axis = chart.xAxis;
if (null == axis) {
var axis = zenPage.createComponent('axis');
chart.xAxis = axis;
axis.parent = chart;
}
var vlist = 'top,bottom';
var dlist = 'Top,Bottom';
var labelPos = zenGet(axis.labelPosition);
labelPos = labelPos ? labelPos : 'bottom';
var axisTitle = zenGet(this.origChartXAxisTitle,zenGet(axis.title));
break;
default:
title = $$$Text('y Axis','%ZEN');
k2 = ':'+keyNo;
var axis = chart.yAxisList[keyNo];
if (!axis.parent) {
axis.parent = chart;
}
/*
if (chart.yAxisList.length>1) {
content.headerButtons = [
{key:'chart-removeYAxis', caption:$$$Text('Remove','%ZEN'), image:'deepsee/ds2_x_44_w.png'}
];
}
*/
var vlist = 'left,right';
var dlist = 'Left,Right';
var labelPos = zenGet(axis.labelPosition);
labelPos = labelPos ? labelPos : 'left';
if (this.origChartYAxisTitles && this.origChartYAxisTitles[keyNo]) {
var axisTitle = this.origChartYAxisTitles[keyNo];
}
else {
var axisTitle = zenGet(axis.title);
}
break;
}
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Axis Title','%ZEN'), edit:'string', value:axisTitle,  key:key+'-title'+k2};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Major Grid','%ZEN'), edit:'switch', value:zenGet(axis.majorGridLines),key:key+'-majorGridLines'+k2};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Major Style','%ZEN'), action:'drill', value:zenGet(chart.majorGridStyle),	key:key+'-majorGridStyle'+k2, text:'' };
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Minor Grid','%ZEN'), edit:'switch', value:zenGet(axis.minorGridLines),key:key+'-minorGridLines'+k2};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Minor Style','%ZEN'), action:'drill', value:zenGet(chart.minorGridStyle),	key:key+'-minorGridStyle'+k2, text:'' };
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Label Position','%ZEN'), edit:'choice', value:labelPos,key:key+'-labelPosition'+k2, valueList:vlist, displayList:dlist};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Label Style','%ZEN'), action:'drill', value:zenGet(axis.labelStyle),	key:key+'-labelStyle'+k2, text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Label Angle','%ZEN'), edit:'slider-toggle', value:zenGet(axis.labelAngle),  key:key+'-labelAngle'+k2, minValue:0, maxValue:90};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Axis Type','%ZEN'), edit:'choice', value:zenGet(axis.axisType),key:key+'-axisType'+k2, valueList:',percent', displayList:$$$Text('Auto,%','%ZEN')};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Min Value','%ZEN'), edit:'string', value:zenGet(axis.minValue),  key:key+'-minValue'+k2};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Max Value','%ZEN'), edit:'string', value:zenGet(axis.maxValue),  key:key+'-maxValue'+k2};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Base Value','%ZEN'), edit:'string', value:zenGet(axis.baseValue),  key:key+'-baseValue'+k2};
break;
case 'chart-ChartNoData': // JSL4478
title = $$$Text('Chart No Data Warning','%ZEN');
var noDataMsg = chart.msgIfNoData;
var warnIfNoData = chart.warnIfNoData;
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('No Data Message','%ZEN'), edit:'string', value:noDataMsg,  key:'chart-msgIfNoData'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Warn if no data?','%ZEN'), edit:'switch', value:warnIfNoData, key:'chart-warnIfNoData'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Background opacity','%ZEN'), edit:'slider', value:zenGet(chart.noDataOpacity),	key:'chart-noDataOpacity', maxValue:1.0};
var background = chart.noDataFill;
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Background color','%ZEN'), action:'drill', key:'chart-noDataFill', valueStyle:'width:80px;border-radius:5px;border:1px solid #B0B0B0;background:'+background+';'};
var foreground = chart.noDataStroke;
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Message color','%ZEN'), action:'drill', key:'chart-noDataStroke', valueStyle:'width:80px;border-radius:5px;border:1px solid #B0B0B0;background:'+foreground+';'};
break;
case 'chart-noDataFill':
case 'chart-noDataStroke':
var html = navigator.getColorChooserHTML(key+k2,value,'svg');
content.html = html;
break;
case 'chart-ChartType':
title = $$$Text('Chart Type','%ZEN');
var list = [
{ image:'deepsee/ds_chart_line.png', value:'lineChart', caption:$$$Text('Line Chart','%ZEN')},
{ image:'deepsee/ds_chart_marker.png', value:'lineChartMarkers', caption:$$$Text('Line Chart Marker','%ZEN')},
{ image:'deepsee/ds_chart_bar.png', value:'barChart', caption:$$$Text('Bar Chart','%ZEN')},
{ image:'deepsee/ds_chart_bar_stack.png', value:'barChartStacked', caption:$$$Text('Stacked Bar Chart','%ZEN')},
{ image:'deepsee/ds_chart_column.png', value:'columnChart', caption:$$$Text('Column Chart','%ZEN')},
{ image:'deepsee/ds_chart_bar3D.png', value:'columnChart3D', caption:$$$Text('Column Chart 3D','%ZEN')},
{ image:'deepsee/ds_chart_column_stack.png', value:'columnChartStacked', caption:$$$Text('Stacked Column Chart','%ZEN')},
{ image:'deepsee/ds_chart_area.png', value:'areaChart', caption:$$$Text('Area Chart','%ZEN')},
{ image:'deepsee/ds_chart_combo.png', value:'comboChart', caption:$$$Text('Combo Chart','%ZEN')},
{ image:'deepsee/ds_chart_pie.png', value:'pieChart', caption:$$$Text('Pie Chart','%ZEN')},
{ image:'deepsee/ds_chart_pie3d.png', value:'pieChart3D', caption:$$$Text('Pie Chart 3D','%ZEN')},
{ image:'deepsee/ds_chart_donut.png', value:'donutChart', caption:$$$Text('Donut Chart','%ZEN')},
{ image:'deepsee/ds_chart_donut3d.png', value:'donutChart3D', caption:$$$Text('Donut Chart 3D','%ZEN')},
{ image:'deepsee/ds_chart_bubble.png', value:'bubbleChart', caption:$$$Text('Bubble Chart','%ZEN')},
{ image:'deepsee/ds_chart_treemap.png', value:'treeMapChart', caption:$$$Text('TreeMap Chart','%ZEN')},
{ image:'deepsee/ds_chart_xy.png', value:'xyChart', caption:$$$Text('X-Y Chart','%ZEN')},
{ image:'deepsee/ds_chart_hilow.png', value:'hiLowChart', caption:$$$Text('HiLow Chart','%ZEN')},
{ image:'deepsee/ds_chart_time.png', value:'timeChart', caption:$$$Text('Time Chart','%ZEN')},
{ image:'deepsee/ds_chart_bullseye.png', value:'bullseyeChart', caption:$$$Text('Bullseye Chart','%ZEN')},
{ image:'deepsee/ds_chart_swirl.png', value:'swirlChart', caption:$$$Text('Swirl Chart','%ZEN')},
];
content.html = navigator.getIconListHTML(list,key,zenGet(this.chartType));
break;
case 'chart-seriesColorScheme':
title = $$$Text('Color Scheme','%ZEN');
var list = [
{ caption:$$$Text('Bright','%ZEN'), value:'bright'},
{ caption:$$$Text('Caribbean','%ZEN'), value:'caribbean'},
{ caption:$$$Text('Gray','%ZEN'), value:'gray'},
{ caption:$$$Text('Pastel','%ZEN'), value:'pastel'},
{ caption:$$$Text('Rust belt','%ZEN'), value:'rustbelt'},
{ caption:$$$Text('Tuscan','%ZEN'), value:'tuscan'},
{ caption:$$$Text('Urban','%ZEN'), value:'urban'}
];
content.html = navigator.getChooserListHTML(list,key,zenGet(chart.seriesColorScheme));
break;
case 'chart-titleStyle':
case 'chart-subtitleStyle':
case 'chart-labelStyle':
case 'chart-axisTitleStyle':
case 'chart-valueLabelStyle':
case 'chart-legendLabelStyle':
case 'chart-xAxis-labelStyle':
case 'chart-yAxis-labelStyle':
switch (key) { // JSL4541 - use $$$Text to localize title
case 'chart-titleStyle':
title = $$$Text('Title Style','%ZEN');
break;
case 'chart-subtitleStyle':
title = $$$Text('Subtitle Style','%ZEN');
break;
case 'chart-labelStyle':
title = $$$Text('Label Style','%ZEN');
break;
case 'chart-axisTitleStyle':
title = $$$Text('Axis Title Style','%ZEN');
break;
case 'chart-valueLabelStyle':
title = $$$Text('Value Label Style','%ZEN');
break;
case 'chart-legendLabelStyle':
title = $$$Text('Legend Label Style','%ZEN');
break;
case 'chart-xAxis-labelStyle':
title = $$$Text('xAxis Label Style','%ZEN');
break;
case 'chart-yAxis-labelStyle':
title = $$$Text('yAxis Label Style','%ZEN');
break;
default:
title = key.split('-')[1]; // JSL4541 - not localized and we punt
}
var style = '';
var which = key.split('-')[1];
switch(which) {
case 'xAxis':
style = chart.xAxis.labelStyle;
break;
case 'yAxis':
style = chart.yAxisList[keyNo].labelStyle;
break;
default:
style = zenGet(chart[attr]);
break;
}
var info = navigator.parseStyleSVG(style);
var fill = info['fill'] ? info['fill'] : 'transparent';
var fillColor = navigator.transformColor(fill);
var stroke = info['stroke'] ? info['stroke'] : 'none';
var strokeWidth = zenGet(info['stroke-width']);
var fontFamily = zenGet(info['font-family']);
var fontSize = zenGet(info['font-size']);
var opacity = zenGet(info['opacity']);
opacity = opacity==='' ? 1.0 : opacity;
var shadow = zenGet(info['text-shadow']);
shadow = shadow ? true : false;
var bold = zenGet(info['font-weight']);
bold = bold ? true : false;
var italic = zenGet(info['font-style']);
italic = italic ? true : false;
var smallCaps = zenGet(info['font-variant']);
smallCaps = smallCaps ? true : false;
var fs = [];
if (bold) { fs[fs.length] = 'bold'; }
if (italic) { fs[fs.length] = 'italic'; }
if (smallCaps) { fs[fs.length] = 'smallCaps'; }
if (shadow) { fs[fs.length] = 'shadow'; }
var fontStyle = fs.join(',');
var k2 = '';
if (key=='chart-yAxis-labelStyle') {
k2 = ':' + keyNo;
}
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Color','%ZEN'), action:'drill', value:fill,	key:key+'-fill'+k2, valueStyle:'width:80px;border-radius:5px;border:1px solid #B0B0B0;background:'+fillColor+';', value:fill,text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Stroke','%ZEN'), action:'drill', value:stroke,	key:key+'-stroke'+k2, valueStyle:'width:80px;border-radius:5px;border:1px solid #B0B0B0;background:'+stroke+';', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Stroke Width','%ZEN'), edit:'slider-toggle', value:strokeWidth,	key:key+'-stroke-width'+k2, minValue:0, maxValue:5, stepSize:0.05};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Opacity','%ZEN'), edit:'slider', value:opacity,	key:key+'-opacity'+k2};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Font','%ZEN'), action:'drill', value:fontFamily,	key:key+'-font-family'+k2, valueStyle:'font-family:'+fontFamily+';'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Text Size','%ZEN'), edit:'slider-toggle', value:fontSize,	key:key+'-font-size'+k2, minValue:2, maxValue:100, stepSize:1};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Text Style','%ZEN'), edit:'choice-multi', value:fontStyle,	key:key+'-textStyle'+k2, valueList:'bold,italic,smallCaps,shadow', displayList:'B,I,Cc,S', valueStyle:'font-size:12px;font-family:times new roman;', choiceStyles:'font-weight:900;^font-style:italic;^font-variant:small-caps;^text-shadow:1px 1px 2px #F0F0F0;'};
break;
case 'chart-backgroundStyle':
case 'chart-plotAreaStyle':
case 'chart-stripeStyle':
case 'chart-bandUpperStyle':
case 'chart-bandLowerStyle':
case 'chart-borderStyle':
case 'chart-plotStyle':
case 'chart-lineStyle':
case 'chart-markerStyle':
case 'chart-indicatorStyle':
case 'chart-axisLineStyle':
case 'chart-baseLineStyle':
case 'chart-plotEdgeStyle':
case 'chart-legendStyle':
case 'chart-gridStyle':
case 'chart-titleBoxStyle':
case 'chart-legendStyle':
case 'chart-legendRectStyle':
case 'chart-upperRightStyle':
case 'chart-lowerLeftStyle':
case 'chart-xAxis-majorGridStyle':
case 'chart-xAxis-minorGridStyle':
case 'chart-yAxis-majorGridStyle':
case 'chart-yAxis-minorGridStyle':
case 'chart-valueBoxStyle':
switch (key) { // JSL4541 - localize title
case 'chart-backgroundStyle':
title = $$$Text('Background Style','%ZEN');
break;
case 'chart-plotAreaStyle':
title = $$$Text('PlotArea Style','%ZEN');
break;
case 'chart-stripeStyle':
title = $$$Text('Stripe Style','%ZEN');
break;
case 'chart-bandUpperStyle':
title = $$$Text('Upper Band Style','%ZEN');
break;
case 'chart-bandLowerStyle':
title = $$$Text('Lower Band Style','%ZEN');
break;
case 'chart-borderStyle':
title = $$$Text('Border Style','%ZEN');
break;
case 'chart-plotStyle':
title = $$$Text('Plot Style','%ZEN');
break;
case 'chart-lineStyle':
title = $$$Text('Line Style','%ZEN');
break;
case 'chart-markerStyle':
title = $$$Text('Marker Style','%ZEN');
break;
case 'chart-indicatorStyle':
title = $$$Text('Indicator Style','%ZEN');
break;
case 'chart-axisLineStyle':
title = $$$Text('Axis Line Style','%ZEN');
break;
case 'chart-baseLineStyle':
title = $$$Text('Baseline Style','%ZEN');
break;
case 'chart-plotEdgeStyle':
title = $$$Text('Plot Edge Style','%ZEN');
break;
case 'chart-legendStyle':
title = $$$Text('Legend Style','%ZEN');
break;
case 'chart-gridStyle':
title = $$$Text('Grid Style','%ZEN');
break;
case 'chart-titleBoxStyle':
title = $$$Text('Titlebox Style','%ZEN');
break;
case 'chart-legendStyle':
title = $$$Text('Legend Style','%ZEN');
break;
case 'chart-legendRectStyle':
title = $$$Text('Legend Rect Style','%ZEN');
break;
case 'chart-upperRightStyle':
title = $$$Text('Upper Right Style','%ZEN');
break;
case 'chart-lowerLeftStyle':
title = $$$Text('Lower Left Style','%ZEN');
break;
case 'chart-xAxis-majorGridStyle':
title = $$$Text('xAxis Major Grid Style','%ZEN');
break;
case 'chart-xAxis-minorGridStyle':
title = $$$Text('xAxis Minor Grid Style','%ZEN');
break;
case 'chart-yAxis-majorGridStyle':
title = $$$Text('yAxis Major Grid Style','%ZEN');
break;
case 'chart-yAxis-minorGridStyle':
title = $$$Text('yAxis Minor Grid Style','%ZEN');
break;
case 'chart-valueBoxStyle':
title = $$$Text('Value Box Style','%ZEN');
break;
default: // no localization so punt
title = key.split('-')[1];
}
var style = '';
var which = key.split('-')[1];
switch(which) {
case 'xAxis':
attr = t[2];
style = chart.xAxis[attr];
break;
case 'xAxis':
attr = t[2];
style = chart.yAxisList[keyNo][attr];
break;
default:
style = zenGet(chart[attr]);
break;
}
var info = navigator.parseStyleSVG(style);
var k2 = '';
if (which=='yAxis') {
k2 = ':' + keyNo;
}
var fill = info['fill'] ? info['fill'] : 'transparent';
var fillColor = navigator.transformColor(fill);
var stroke = info['stroke'] ? info['stroke'] : 'none';
var strokeWidth = zenGet(info['stroke-width']);
var opacity = zenGet(info['opacity']);
var strokeDashArray = info['stroke-dasharray'];
switch (strokeDashArray) {
case '1,2':
strokeDashArray = 'dotted';
break;
case '10,10':
strokeDashArray = 'dashed';
break;
default:
strokeDashArray = 'solid';
break;
}
opacity = opacity==='' ? 1.0 : opacity;
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Fill','%ZEN'), action:'drill', value:fill,	key:key+'-fill'+k2, valueStyle:'width:80px;border-radius:5px;border:1px solid #B0B0B0;background:'+fillColor+';', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Opacity','%ZEN'), edit:'slider', value:opacity,	key:key+'-opacity'+k2};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Line','%ZEN'), action:'drill', value:'',	key:key+'-stroke'+k2, valueStyle:'width:80px;border-radius:5px;border:1px solid #B0B0B0;background:'+stroke+';'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Line Width','%ZEN'), edit:'slider-toggle', value:strokeWidth,	key:key+'-stroke-width'+k2, minValue:0, maxValue:25, stepSize:0.25};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Line Style','%ZEN'), edit:'choice', value:strokeDashArray,	key:key+'-stroke-dasharray'+k2, valueList:'solid,dashed,dotted', displayList:$$$Text('solid,dashed,dotted','%ZEN')};
break;
case 'chart-backgroundStyle-fill':
case 'chart-backgroundStyle-stroke':
case 'chart-plotAreaStyle-fill':
case 'chart-plotAreaStyle-stroke':
case 'chart-stripeStyle-fill':
case 'chart-stripeStyle-stroke':
case 'chart-bandUpperStyle-fill':
case 'chart-bandUpperStyle-stroke':
case 'chart-bandLowerStyle-fill':
case 'chart-bandLowerStyle-stroke':
case 'chart-borderStyle-fill':
case 'chart-borderStyle-stroke':
case 'chart-upperRightStyle-fill':
case 'chart-upperRightStyle-stroke':
case 'chart-lowerLeftStyle-fill':
case 'chart-lowerLeftStyle-stroke':
case 'chart-titleStyle-fill':
case 'chart-titleStyle-stroke':
case 'chart-subtitleStyle-fill':
case 'chart-subtitleStyle-stroke':
case 'chart-labelStyle-fill':
case 'chart-labelStyle-stroke':
case 'chart-legendLabelStyle-fill':
case 'chart-legendLabelStyle-stroke':
case 'chart-axisTitleStyle-fill':
case 'chart-axisTitleStyle-stroke':
case 'chart-valueLabelStyle-fill':
case 'chart-valueLabelStyle-stroke':
case 'chart-valueBoxStyle-fill':
case 'chart-valueBoxStyle-stroke':
case 'chart-lineStyle-fill':
case 'chart-lineStyle-stroke':
case 'chart-markerStyle-fill':
case 'chart-markerStyle-stroke':
case 'chart-indicatorStyle-fill':
case 'chart-indicatorStyle-stroke':
case 'chart-axisLineStyle-fill':
case 'chart-axisLineStyle-stroke':
case 'chart-baseLineStyle-fill':
case 'chart-baseLineStyle-stroke':
case 'chart-plotStyle-fill':
case 'chart-plotStyle-stroke':
case 'chart-plotEdgeStyle-fill':
case 'chart-plotEdgeStyle-stroke':
case 'chart-legendStyle-fill':
case 'chart-legendStyle-stroke':
case 'chart-gridStyle-fill':
case 'chart-gridStyle-stroke':
case 'chart-titleBoxStyle-fill':
case 'chart-titleBoxStyle-stroke':
case 'chart-legendStyle-fill':
case 'chart-legendStyle-stroke':
case 'chart-legendRectStyle-fill':
case 'chart-legendRectStyle-stroke':
case 'chart-seriesDetail-fill':
case 'chart-xAxis-labelStyle-fill':
case 'chart-xAxis-labelStyle-stroke':
case 'chart-xAxis-majorGridStyle-fill':
case 'chart-xAxis-majorGridStyle-stroke':
case 'chart-xAxis-minorGridStyle-fill':
case 'chart-xAxis-minorGridStyle-stroke':
case 'chart-yAxis-labelStyle-fill':
case 'chart-yAxis-labelStyle-stroke':
case 'chart-yAxis-majorGridStyle-fill':
case 'chart-yAxis-majorGridStyle-stroke':
case 'chart-yAxis-minorGridStyle-fill':
case 'chart-yAxis-minorGridStyle-stroke':
switch (key) { // JSL4541 - localize title
case 'chart-backgroundStyle-fill':
title = $$$Text('Background Style Fill','%ZEN');
break;
case 'chart-backgroundStyle-stroke':
title = $$$Text('Background Style Stroke','%ZEN');
break;
case 'chart-plotAreaStyle-fill':
title = $$$Text('Plot Area Style Fill','%ZEN');
break;
case 'chart-plotAreaStyle-stroke':
title = $$$Text('Plot Area Style Stroke','%ZEN');
break;
case 'chart-stripeStyle-fill':
title = $$$Text('Stripe Style Fill','%ZEN');
break;
case 'chart-stripeStyle-stroke':
title = $$$Text('Stripe Style Stroke','%ZEN');
break;
case 'chart-bandUpperStyle-fill':
title = $$$Text('Upper Band Style Fill','%ZEN');
break;
case 'chart-bandUpperStyle-stroke':
title = $$$Text('Upper Band Style Stroke','%ZEN');
break;
case 'chart-bandLowerStyle-fill':
title = $$$Text('Lower Band Style Fill','%ZEN');
break;
case 'chart-bandLowerStyle-stroke':
title = $$$Text('Lower Band Style Stroke','%ZEN');
break;
case 'chart-borderStyle-fill':
title = $$$Text('Border Style Fill','%ZEN');
break;
case 'chart-borderStyle-stroke':
title = $$$Text('Border Style Stroke','%ZEN');
break;
case 'chart-upperRightStyle-fill':
title = $$$Text('Upper Right Style Fill','%ZEN');
break;
case 'chart-upperRightStyle-stroke':
title = $$$Text('Upper Right Style Stroke','%ZEN');
break;
case 'chart-lowerLeftStyle-fill':
title = $$$Text('Lower Left Style Fill','%ZEN');
break;
case 'chart-lowerLeftStyle-stroke':
title = $$$Text('Lower Left Style Stroke','%ZEN');
break;
case 'chart-titleStyle-fill':
title = $$$Text('Title Style Fill','%ZEN');
break;
case 'chart-titleStyle-stroke':
title = $$$Text('Title Style Stroke','%ZEN');
break;
case 'chart-subtitleStyle-fill':
title = $$$Text('Subtitle Style Fill','%ZEN');
break;
case 'chart-subtitleStyle-stroke':
title = $$$Text('Subtitle Style Stroke','%ZEN');
break;
case 'chart-labelStyle-fill':
title = $$$Text('Label Style Fill','%ZEN');
break;
case 'chart-labelStyle-stroke':
title = $$$Text('Label Style Stroke','%ZEN');
break
case 'chart-legendLabelStyle-fill':
title = $$$Text('Legend Label Style Fill','%ZEN');
break;
case 'chart-legendLabelStyle-stroke':
title = $$$Text('Legend Label Style Stroke','%ZEN');
break;
case 'chart-axisTitleStyle-fill':
title = $$$Text('Axis Title Style Fill','%ZEN');
break;
case 'chart-axisTitleStyle-stroke':
title = $$$Text('Axis Title Style Stroke','%ZEN');
break;
case 'chart-valueLabelStyle-fill':
title = $$$Text('Value Label Style Fill','%ZEN');
break;
case 'chart-valueLabelStyle-stroke':
title = $$$Text('Value Label Style Stroke','%ZEN');
break;
case 'chart-valueBoxStyle-fill':
title = $$$Text('Value Box Style Fill','%ZEN');
break;
case 'chart-valueBoxStyle-stroke':
title = $$$Text('Value Box Style Stroke','%ZEN');
break;
case 'chart-lineStyle-fill':
title = $$$Text('Line Style Fill','%ZEN');
break;
case 'chart-lineStyle-stroke':
title = $$$Text('Line Style Stroke','%ZEN');
break;
case 'chart-markerStyle-fill':
title = $$$Text('Marker Style Fill','%ZEN');
break;
case 'chart-markerStyle-stroke':
title = $$$Text('Marker Style Stroke','%ZEN');
break;
case 'chart-indicatorStyle-fill':
title = $$$Text('Indicator Style Fill','%ZEN');
break;
case 'chart-indicatorStyle-stroke':
title = $$$Text('Indicator Style Stroke','%ZEN');
break;
case 'chart-axisLineStyle-fill':
title = $$$Text('Axis Line Style Fill','%ZEN');
break;
case 'chart-axisLineStyle-stroke':
title = $$$Text('Axis Line Style Stroke','%ZEN');
break;
case 'chart-baseLineStyle-fill':
title = $$$Text('Baseline Style Fill','%ZEN');
break;
case 'chart-baseLineStyle-stroke':
title = $$$Text('Baseline Style Stroke','%ZEN');
break;
case 'chart-plotStyle-fill':
title = $$$Text('Plot Style Fill','%ZEN');
break;
case 'chart-plotStyle-stroke':
title = $$$Text('Plot Style Stroke','%ZEN');
break;
case 'chart-plotEdgeStyle-fill':
title = $$$Text('Plot Edge Style Fill','%ZEN');
break;
case 'chart-plotEdgeStyle-stroke':
title = $$$Text('Plot Edge Style Stroke','%ZEN');
break;
case 'chart-legendStyle-fill':
title = $$$Text('Legend Style Fill','%ZEN');
break;
case 'chart-legendStyle-stroke':
title = $$$Text('Legend Style Stroke','%ZEN');
break;
case 'chart-gridStyle-fill':
title = $$$Text('Grid Style Fill','%ZEN');
break;
case 'chart-gridStyle-stroke':
title = $$$Text('Grid Style Stroke','%ZEN');
break;
case 'chart-titleBoxStyle-fill':
title = $$$Text('Title Box Style Fill','%ZEN');
break;
case 'chart-titleBoxStyle-stroke':
title = $$$Text('Title Box Style Stroke','%ZEN');
break;
case 'chart-legendRectStyle-fill':
title = $$$Text('Legend Rectangle Style Fill','%ZEN');
break;
case 'chart-legendRectStyle-stroke':
title = $$$Text('Legend Rectangle Style Stroke','%ZEN');
break;
case 'chart-seriesDetail-fill':
title = $$$Text('Series Detail Style Fill','%ZEN');
break;
case 'chart-xAxis-labelStyle-fill':
title = $$$Text('xAxis Label Style Fill','%ZEN');
break;
case 'chart-xAxis-labelStyle-stroke':
title = $$$Text('xAxis Label Style Stroke','%ZEN');
break;
case 'chart-xAxis-majorGridStyle-fill':
title = $$$Text('xAxis Major Grid Style Fill','%ZEN');
break;
case 'chart-xAxis-majorGridStyle-stroke':
title = $$$Text('xAxis Major Grid Style Stroke','%ZEN');
break;
case 'chart-xAxis-minorGridStyle-fill':
title = $$$Text('xAxis Minor Grid Style Fill','%ZEN');
break;
case 'chart-xAxis-minorGridStyle-stroke':
title = $$$Text('xAxis Minor Grid Style Stroke','%ZEN');
break;
case 'chart-yAxis-labelStyle-fill':
title = $$$Text('yAxis Label Style Fill','%ZEN');
break;
case 'chart-yAxis-labelStyle-stroke':
title = $$$Text('yAxis Label Style Stroke','%ZEN');
break;
case 'chart-yAxis-majorGridStyle-fill':
title = $$$Text('yAxis Major Grid Style Fill','%ZEN');
break;
case 'chart-yAxis-majorGridStyle-stroke':
title = $$$Text('yAxis Major Grid Style Stroke','%ZEN');
break;
case 'chart-yAxis-minorGridStyle-fill':
title = $$$Text('yAxis Minor Grid Style Fill','%ZEN');
break;
case 'chart-yAxis-minorGridStyle-stroke':
title = $$$Text('yAxis Minor Grid Style Stroke','%ZEN');
break;
default:
title = key.split('-')[1] + ' ' + key.split('-')[2]; // don't localize punt
}
var which = key.split('-')[1];
switch(which) {
case 'xAxis':
break;
case 'xAxis':
break;
default:
break;
}
var k2 = (keyNo === '') ? '' : ':' + keyNo;
var html = navigator.getColorChooserHTML(key+k2,value,'svg');
content.html = html;
break;
case 'chart-titleStyle-font-family':
case 'chart-subtitleStyle-font-family':
case 'chart-labelStyle-font-family':
case 'chart-axisTitleStyle-font-family':
case 'chart-valueLabelStyle-font-family':
case 'chart-legendLabelStyle-font-family':
case 'chart-xAxis-labelStyle-font-family':
case 'chart-yAxis-labelStyle-font-family':
switch (key) { // JSL4541, localize using $$$Text
case 'chart-titleStyle-font-family':
title = $$$Text('Title Style Font Family','%ZEN');
break;
case 'chart-subtitleStyle-font-family':
title = $$$Text('Subtitle Style Font Family','%ZEN');
break;
case 'chart-labelStyle-font-family':
title = $$$Text('Label Style Font Family','%ZEN');
break;
case 'chart-axisTitleStyle-font-family':
title = $$$Text('Axis Title Style Font Family','%ZEN');
break;
case 'chart-valueLabelStyle-font-family':
title = $$$Text('Value Label Style Font Family','%ZEN');
break;
case 'chart-legendLabelStyle-font-family':
title = $$$Text('Legend Label Style Font Family','%ZEN');
break;
case 'chart-xAxis-labelStyle-font-family':
title = $$$Text('yAxis Label Style Font Family','%ZEN');
break;
case 'chart-yAxis-labelStyle-font-family':
title = $$$Text('yAxis Label Style Font Family','%ZEN');
break;
default:
title = key.split('-')[1] + ' Font'; // don't localize, punt
}
var which = key.split('-')[1];
switch(which) {
case 'xAxis':
break;
case 'xAxis':
break;
default:
break;
}
var k2 = (keyNo === '') ? '' : ':' + keyNo;
content.html = navigator.getFontChooserHTML(key+k2,value);
break;
}
content.title = title;
return content;
}

self._DeepSee_Component_Widget_pivot_chartGetSeriesColor = function(series) {
var b = 120 + (series*15);
b = b>255?255:b;
var color = 'rgb(160,160,'+b+')';
var dim = 2;
var controller = this.findComponent('table');
var chart = this.findComponent('svgChart');
if (chart && chart._type=='xyChart') {
series = parseInt(series,10) + 1;
}
if (chart && !chart.hasAxes() && controller.getDimSize(2)==1) {
dim = 1;
}
var name = controller.getLabel(series,dim);
if (name && controller.hideMeasures && (controller.hiddenMeasureText.length>=1)) {
var nameText = name.split('/');
for (var i = 0; i < nameText.length; ++i) {
for (var j = 0; j < controller.hiddenMeasureText.length; ++j) {
if (nameText[i] == controller.hiddenMeasureText[j]) {
nameText.splice(i,1);
break;
}
}
}
name = nameText.join('/');
}
if (typeof name != 'undefined') {
name = name.toString().toLowerCase();
}
if (name && this.dataColors[name]) {
color = this.dataColors[name];
}
return color;
}

self._DeepSee_Component_Widget_pivot_chartGetSeriesColorsAsString = function(chart) {
var colors=[];
for (var series=0; series < chart.getSeriesCount(); series++) {
var color = this.chartGetSeriesColor(series);
colors[series] = color;
}
return colors.join('~');
}

self._DeepSee_Component_Widget_pivot_chartHeaderButtonClick = function(navigator,chart,key) {
switch(key) {
case 'chart-addYAxis':
var axis = zenPage.createComponent('axis');
axis.parent = chart;
chart.yAxisList[chart.yAxisList.length] = axis;
navigator.refreshTopSheet();
break;
default:
break;
}
}

self._DeepSee_Component_Widget_pivot_chartParseColorList = function(colors) {
var colorList = [];
var str = colors.toString()+',';
var inParen = false;
var token = '';
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
colorList[colorList.length] = token ? token : '';
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
return colorList;
}

self._DeepSee_Component_Widget_pivot_chartParseLength = function(length,info) {
var units = (length==''?'auto':((length.toString().indexOf('px')>=0)?'px':'%'));
var	value = (units=='auto'?'':parseInt(length));
return {value:value, units:units};
}

self._DeepSee_Component_Widget_pivot_chartRangeChange = function(final) {
if (final) {
var chart = this.findComponent('svgChart');
var rangeControl = this.findComponent('rangeControl');
chart.setTimeRange(rangeControl.startRange,rangeControl.endRange,final);
}
}

self._DeepSee_Component_Widget_pivot_chartRenderHandler = function() {
var chart = this.findComponent('svgChart');
var timeBased = chart.isTimeBased();
if (timeBased && !chart.currMultiple && !chart._oldXMax) {
var rangeControl = this.findComponent('rangeControl');
if (isNaN(parseInt(chart._xMinValue,10))) {
rangeControl.setProperty('startRange','2012-01-01');
}
else {
var dt = new Date(1900,0,1,0,0,0,0);
dt.setTime(chart._xMinValue*1000);
rangeControl.setProperty('startRange',zenDateToString(dt));
rangeControl.setProperty('startTime',parseInt(zenDateToString(dt).substr(0,4))-1);		// DTB501 - Set a resaonable start point
}
if (isNaN(parseInt(chart._xMaxValue,10))) {
rangeControl.setProperty('endRange','2012-12-31');
}
else {
var dt = new Date(1900,0,1,0,0,0,0);
dt.setTime(chart._xMaxValue*1000);
rangeControl.setProperty('endRange',zenDateToString(dt));
rangeControl.setProperty('endTime',parseInt(zenDateToString(dt).substr(0,4))+1);		// DTB501 - Set a resaonable end point
}
}
}

self._DeepSee_Component_Widget_pivot_chartSetChartType = function(svg,chart,type) {
if (''==type) {
if (zenPage._oldChartType) {
type = zenPage._oldChartType;
}
else {
return;
}
}
if (null==chart) return;
var newType = '';
var change = false; // JSL4165
switch(type) {
case 'pivot':
change = true;
type = chart._type;
newType = type;
break;
case 'barChart':
case 'barChart3D':
case 'columnChart':
case 'columnChart3D':
case 'barChartStacked':
case 'columnChartStacked':
newType = 'barChart';
break;
case 'lineChart':
case 'lineChartMarkers':
case 'areaChart':
newType = 'lineChart';
break;
case 'hiLowChart':
newType = 'hilowChart';
break;
case 'xyChart':
newType = 'xyChart';
break;
case 'timeChart':
case 'comboChart':
newType = 'comboChart';
break;
case 'bubbleChart':
newType = 'bubbleChart';
break;
case 'bullseyeChart':
newType = 'bullseyeChart';
break;
case 'treeMapChart':
newType = 'treeMapChart';
break;
case 'pieChart':
case 'pieChart3D':
case 'donutChart':
case 'donutChart3D':
newType = 'pieChart';
break;
case 'swirlChart':
newType = 'swirlChart';
break;
default:
alert('Unhandled type(1) in setChartType: ' + type);
return;
}
if (newType != chart._type || change) {
var newChart = zenPage.createComponent(newType);
newChart.setProperty('controllerId',chart.controllerId);
newChart.setProperty('width',chart.width);
newChart.setProperty('height',chart.height);
newChart.appearance = chart.appearance;
newChart.legendVisible= chart.legendVisible;
newChart.titleStyle = chart.titleStyle;
newChart.titleBoxStyle = chart.titleBoxStyle;
newChart.subtitleStyle = chart.subtitleStyle;
newChart.borderRadius = chart.borderRadius;
newChart.borderStyle = chart.borderStyle;
newChart.backgroundStyle = chart.backgroundStyle;
newChart.plotAreaStyle = chart.plotAreaStyle;
newChart.plotEdgeStyle = chart.plotEdgeStyle;
newChart.selectedItemStyle = chart.selectedItemStyle;
newChart.unselectedItemStyle = chart.unselectedItemStyle;
newChart.titleAlign = chart.titleAlign;
newChart.title = chart.title;
newChart.subtitle = chart.subtitle;
newChart.legendTitle = chart.legendTitle;
newChart.stripesVisible = chart.stripesVisible;
newChart.stripeStyle = chart.stripeStyle;
newChart.seriesColors = chart.seriesColors;
newChart.seriesColorScheme = chart.seriesColorScheme;
newChart.seriesColorsOverride = chart.seriesColorsOverride;
newChart.seriesNames = chart.seriesNames;
newChart.markerScale = chart.markerScale;
newChart.gridStyle = chart.gridStyle;
newChart.lineStyle = chart.lineStyle;
newChart.markerStyle = chart.markerStyle;
newChart.indicatorStyle = chart.indicatorStyle;
newChart.indicatorsVisible = chart.indicatorsVisible;
newChart.markerShapes = chart.markerShapes;
newChart.axisLineStyle = chart.axisLineStyle;
newChart.bandUpper = chart.bandUpper;
newChart.bandUpperStyle = chart.bandUpperStyle;
newChart.bandLower = chart.bandLower;
newChart.bandLowerStyle = chart.bandLowerStyle;
newChart.seriesYAxes = chart.seriesYAxes;
newChart.baseLineStyle = chart.baseLineStyle;
newChart.titleImage = chart.titleImage;
newChart.titleImageStyle = chart.titleImageStyle;
newChart.marginRight = chart.marginRight;
newChart.marginLeft = chart.marginLeft;
newChart.marginTop = chart.marginTop;
newChart.marginBottom = chart.marginBottom;
newChart.valueLabelsVisible = chart.valueLabelsVisible;
newChart.valueLabelStyle = chart.valueLabelStyle;
newChart.valueBoxStyle = chart.valueBoxStyle;
newChart.valueLabelFormat = chart.valueLabelFormat;
newChart.onelementClick = chart.onelementClick;
newChart.labelStyle = chart.labelStyle;
newChart.ongetSeriesColor = chart.ongetSeriesColor;
newChart.onrenderData = chart.onrenderData;
newChart.msgIfNoData = chart.msgIfNoData; // JSL4478
newChart.warnIfNoData = chart.warnIfNoData; // JSL4478
newChart.noDataOpacity = chart.noDataOpacity; // JSL4478
newChart.noDataFill = chart.noDataFill; // JSL4478
if (false) {
newChart.invert = chart.invert;
newChart.gap = chart.gap;
newChart.plotBy = chart.plotBy;
newChart.separateSeriesScale = chart.separateSeriesScale;
newChart.ongetLabelX = chart.ongetLabelX;
}
if (chart.xAxis) {
newChart.xAxis = chart.xAxis;
}
if (chart.yAxisList) {
newChart.yAxisList = [];
for (var ya = 0; ya < chart.yAxisList.length; ya++) {
var axis = chart.yAxisList[ya];
if (axis && axis._type) {
var newAxis = zenPage.createComponent(axis._type);
newAxis.minValue = axis.minValue;
newAxis.maxValue = axis.maxValue;
newAxis.title = axis.title;
newAxis.baseValue = axis.baseValue;
newAxis.majorUnits = axis.majorUnits;
newAxis.minorUnits = axis.minorUnits;
newAxis.labelUnits = axis.labelUnits;
newAxis.labelAngle = axis.labelAngle;
newAxis.labelStyle = axis.labelStyle;
newAxis.majorGridLines = axis.majorGridLines;
newAxis.minorGridLines = axis.minorGridLines;
newAxis.majorGridStyle = axis.majorGridStyle;
newAxis.minorGridStyle = axis.minorGridStyle;
newAxis.labelPosition = axis.labelPosition;
newAxis.axisType = axis.axisType;
newChart.yAxisList[newChart.yAxisList.length] = newAxis;
}
}
}
chart.unrender();
for (var n = 0; n < svg.children.length; n++) {
if (svg.children[n] == chart) {
svg.children.splice(n,0,newChart);
newChart.parent = svg;
if (svg.document && svg.svgGroup) {
newChart.renderSVG(svg.document,svg.svgGroup);
}
break;
}
}
svg.removeChild(chart);
newChart.setProperty('id',chart.id);
chart = newChart;
}
chart.appearance = '2D';
chart.timeBased = false;
switch(type) {
case 'barChart':
chart.chartPivot = true;
chart.chartStacked = false;
chart.plotToEdge = false;
chart.xAxis.majorGridLines = false;
if (chart.yAxisList[0]) {
chart.yAxisList[0].majorGridLines = true;
}
break;
case 'barChart3D':
chart.appearance = '3D';
chart.chartPivot = true;
chart.chartStacked = false;
chart.plotToEdge = false;
chart.xAxis.majorGridLines = false;
if (chart.yAxisList[0]) {
chart.yAxisList[0].majorGridLines = true;
}
break;
case 'columnChart3D':
chart.appearance = '3D';
chart.chartPivot = false;
chart.chartStacked = false;
chart.plotToEdge = false;
chart.xAxis.majorGridLines = false;
if (chart.yAxisList[0]) {
chart.yAxisList[0].majorGridLines = true;
}
break;
case 'columnChart':
chart.chartPivot = false;
chart.chartStacked = false;
chart.plotToEdge = false;
chart.xAxis.majorGridLines = true;
if (chart.yAxisList[0]) {
chart.yAxisList[0].majorGridLines = false;
}
break;
case 'barChartStacked':
chart.chartPivot = true;
chart.chartStacked = true;
chart.plotToEdge = false;
chart.xAxis.majorGridLines = false;
if (chart.yAxisList[0]) {
chart.yAxisList[0].majorGridLines = true;
}
break;
case 'columnChartStacked':
chart.chartPivot = false;
chart.chartStacked = true;
chart.plotToEdge = false;
chart.xAxis.majorGridLines = true;
if (chart.yAxisList[0]) {
chart.yAxisList[0].majorGridLines = false;
}
break;
case 'timeChart':
chart.markersVisible = false;
chart.chartPivot = false;
chart.chartStacked = false;
chart.chartFilled = false;
chart.plotToEdge = true;
chart.seriesTypes = 'line,line,line,line,line,line,line,line';
chart.xAxis.majorGridLines = false;
if (chart.yAxisList[0]) {
chart.yAxisList[0].majorGridLines = true;
}
chart.timeBased = true;
chart.hasZoom = false;
break;
case 'lineChart':
chart.markersVisible = false;
chart.chartPivot = false;
chart.chartStacked = false;
chart.chartFilled = false;
chart.plotToEdge = true;
chart.xAxis.majorGridLines = false;
if (chart.yAxisList[0]) {
chart.yAxisList[0].majorGridLines = true;
}
break;
case 'lineChartMarkers':
chart.markersVisible = true;
chart.chartPivot = false;
chart.chartStacked = false;
chart.chartFilled = false;
chart.plotToEdge = true;
chart.xAxis.majorGridLines = false;
if (chart.yAxisList[0]) {
chart.yAxisList[0].majorGridLines = true;
}
break;
case 'areaChart':
chart.markersVisible = false;
chart.chartPivot = false;
chart.chartStacked = true;
chart.chartFilled = true;
chart.plotToEdge = true;
chart.xAxis.majorGridLines = false;
if (chart.yAxisList[0]) {
chart.yAxisList[0].majorGridLines = true;
}
break;
case 'hiLowChart':
chart.markersVisible = false;
chart.chartPivot = false;
chart.plotToEdge = false;
chart.xAxis.majorGridLines = false;
if (chart.yAxisList[0]) {
chart.yAxisList[0].majorGridLines = true;
}
break;
case 'comboChart':
chart.markersVisible = true;
chart.chartPivot = false;
chart.plotToEdge = false;
chart.seriesTypes = 'bar,bar,line';
chart.xAxis.majorGridLines = false;
if (chart.yAxisList[0]) {
chart.yAxisList[0].majorGridLines = true;
}
break;
case 'xyChart':
chart.markersVisible = true;
chart.chartPivot = false;
chart.plotToEdge = true;
chart.xAxis.majorGridLines = false;
if (chart.yAxisList[0]) {
chart.yAxisList[0].majorGridLines = true;
}
break;
case 'pieChart':
chart.holeSize = 0;
chart.marginLeft = "";
chart.showMultiples = true;
chart.labelsVisible = false;
break;
case 'pieChart3D':
chart.holeSize = 0;
chart.appearance = '3D';
chart.marginLeft = "";
chart.showMultiples = true;
chart.labelsVisible = false;
break;
case 'donutChart':
chart.holeSize = 0.25;
chart.marginLeft = "";
chart.showMultiples = true;
chart.labelsVisible = false;
break;
case 'donutChart3D':
chart.holeSize = 0.25;
chart.appearance = '3D';
chart.marginLeft = "";
chart.showMultiples = true;
chart.labelsVisible = false;
break;
case 'bubbleChart':
break;
case 'bullseyeChart':
break;
case 'treeMapChart':
break;
case 'swirlChart':
chart.animate = 'none';
chart.ongetLabelX = "return zenPage.getComponentById('"+chart.id+"').seriesNames.split(',')[value];";
break;
default:
alert('Unhandled type in setChartType: ' + type);
break;
}
if (chart.markersVisible == true) { // JSL4486
chart.plotToEdge = false;       // JSL4486
}
chart.hzZoomStep = 0;
chart.scrollLeft = 0;
chart.unrender();
chart.render();
}

self._DeepSee_Component_Widget_pivot_closeExportMenu = function(menuId) {
var dropMenu = document.getElementById(menuId);
var trap = self.document.getElementById("zenMouseTrap");
if ((dropMenu) && (dropMenu.style.display != "none")) {
var dropMenuIcon = dropMenu.previousElementSibling;
dropMenu.style.display = "none";
dropMenuIcon.setAttribute("class","dsptIconDropdown");
trap.style.display = "none";
trap.style.zIndex = "";
trap.onmouseup = null;
trap.onmousedown = null;
trap.onmouseout = null;
}
}

self._DeepSee_Component_Widget_pivot_componentSetDisabled = function(componentId,flag) {
var component = zenPage.getComponentById(componentId);
if (component && component.setDisabled) {
component.setDisabled(flag);
}
}

self._DeepSee_Component_Widget_pivot_drillHandler = function(pivot) {
if (zenPage.getSlaveList) {
var slaves = zenPage.getSlaveList(this);
for (var n = 0; n < slaves.length; n++) {
slaves[n].syncSlave(this,true);
}
}
var table = this.getDataController();
if (!table) return false;
var div = this.getEnclosingDiv();
this.applyFilters(false);
table.executeQuery(true);
this.updateControlState();
return true;
}

self._DeepSee_Component_Widget_pivot_executeDrillDown = function(dataSource) {
var pivot = this.getDataController();
if (!pivot) {
return;
}
if (!pivot.canDrillDown) {
alert($$$Text('This pivot does not support drill down.','%DeepSee'));
return;
}
if (this.pivotView == 'chart') {
var chart = this.findComponent('svgChart');
if (chart && !isNaN(parseInt(chart.selectedItem,10))) {
var idx = parseInt(chart.selectedItem,10);
chart.selectedItem = -1;
pivot.rowDblClickHandler(null,1,idx+1);
this.updateControlState();
}
}
else {
var select = pivot.getSelectedRange();
if (select) {
pivot.rowDblClickHandler(null,1,parseInt(select[0]));
this.updateControlState();
}
}
}

self._DeepSee_Component_Widget_pivot_executeDrillUp = function() {
var pivot = this.getDataController();
if (!pivot) {
return;
}
if (this.pivotView == 'chart') {
var chart = this.findComponent('svgChart');
if (chart) {
chart.selectedItem = -1;
}
}
var prevDrillLevel = pivot.getDrillLevel()-1;
pivot.removeDrillLevel(prevDrillLevel);
this.updateControlState();
}

self._DeepSee_Component_Widget_pivot_exportCSV = function(simple) {
var table = this.getDataController();
if (table) {
var csvUtil = zenPage.getComponentById('csvUtil');
var mdx = table.GetCurrentQueryText('export');
var exportParams = csvUtil.prepareTableParms(table);
var widgetDef = this.getDefinition();
if (widgetDef) {
if (widgetDef.title) {
exportParams.title = widgetDef.title;
}
if (widgetDef.properties) {
if (widgetDef.properties.printTitle) {
exportParams.title = widgetDef.properties.printTitle;
}
if (widgetDef.properties.printSubtitle) {
exportParams.subtitle = widgetDef.properties.printSubtitle;
}
if (widgetDef.properties.printSubtitleOn) {
exportParams.subtitleOn = widgetDef.properties.printSubtitleOn;
}
if (widgetDef.properties.showUser) {
exportParams.showUser = widgetDef.properties.showUser;
}
if (widgetDef.properties.showDate) {
exportParams.showDate = widgetDef.properties.showDate;
}
if (widgetDef.properties.showFilters) {
exportParams.showFilters = widgetDef.properties.showFilters;
}
if (widgetDef.properties.showListingFilters) {
exportParams.showListingFilters = widgetDef.properties.showListingFilters;
}
}
}
exportParams.simple = (simple ? 1 : 0)
csvUtil.downloadCSV(mdx,exportParams);
}
}

self._DeepSee_Component_Widget_pivot_exportExcel = function() {
var table = this.getDataController();
var widgetDef = this.getDefinition();
if (table && widgetDef) { // JSL4455 - use dashboard filter label name if available
for (m=0; m < widgetDef.controls.length; m++) {
var control = widgetDef.controls[m];
if (control.action == 'applyFilter')  { // at filter control
for (var n = 0; n < table.filters.length; n++) { // walk filters look for a match
var filter = table.filters[n];
if (control.label && control.targetProperty == filter.baseSpec) {
filter._label = control.label;
}
}
}
}
}
if (''!==table.kpi) {
var filterNames = [];
var filterValues = [];
var filterLabels = []; // JSL4455
var fq = '';
for (var n = 0; n < table.filters.length; n++) {
var filter = table.filters[n];
var pnonce = zenPage.CreateParameterNonce(filter.spec+':'+filter.value);
if (pnonce.toString().indexOf('ERROR:')>=0) {
alert(pnonce);
return;
}
fq += '&FILTER='+pnonce;
if (filter.text!='') {
filterNames[filterNames.length] = this.GetKpiFilterCaption(this.dataSource,filter.spec);		// DTB367
var val = filter.text.toString();
if ('&'==val.charAt(0)) {
val = val.substring(2,val.length-1);
}
filterValues[filterValues.length] = val;
filterLabels[filterLabels.length] = filter._label; // JSL4455
}
}
table.getPivotVariableInfo(filterNames,filterValues);		// DTB489 - Use common API to fill in pivot variable info
var cl = '';
if (table.columnList!=='') {
cl = '&COLUMNLIST=' + encodeURIComponent(table.columnList);
}
var url = zenLink('_DeepSee.UI.MDXExcel.zen?KPI=' + encodeURIComponent(table.kpi) + '&SOURCE='+ encodeURIComponent(table.dataSourceName) + fq + cl);
if (filterNames.length > 0) {
url += '&FILTERNAMES='+zenPage.CreateParameterNonce(filterNames.join('\n'));		// DTB916
url += '&FILTERVALUES='+zenPage.CreateParameterNonce(filterValues.join('\n'));		// DTB797
url += '&FILTERLABELS='+zenPage.CreateParameterNonce(filterLabels.join('\n')); // JSL4455	// DTB916
}
url += '&ROWCAPTIONS='+encodeURIComponent(table.getRowCaptions().join('\n'));
if (table.hiddenMeasureText && table.hiddenMeasureText.length > 0) {
url += '&HIDDENMEASURES='+encodeURIComponent(table.hiddenMeasureText.join('\n'));
}
if (table.measureLocation) {
url += '&MEASURELOCATION='+encodeURIComponent(table.measureLocation);
}
var title = (widgetDef.title ? widgetDef.title : table.printTitle);
var subtitle = table.printSubtitle;
var showDate = table.showDate;
if (widgetDef && widgetDef.properties) {
if (widgetDef.properties.printTitle) {
title = widgetDef.properties.printTitle;
}
if (widgetDef.properties.printSubtitle) {
subtitle = widgetDef.properties.printSubtitle;
}
if (widgetDef.properties.printSubtitle) {
showDate = widgetDef.properties.showDate;
}
}
url += '&TITLE='+encodeURIComponent(title);
url += '&SUBTITLE='+encodeURIComponent(subtitle);
url += '&SHOWDATE='+encodeURIComponent(showDate);	// DTB830
if (table.isDrillThrough) {
url += '&LISTING=1';
url += '&SELECTEDRANGE='+encodeURIComponent(table.getSelectedRange());
url += '&SELECTEDITEMS='+zenPage.CreateParameterNonce(table.getSelectedItems().toString());		// DTB916
url += '&LISTINGSORTCOLUMN='+encodeURIComponent(table.listingSortColumn);
url += '&LISTINGSORTDIR='+encodeURIComponent(table.listingSortDir);
}
window.open(url,'excel','');
}
else if ((''!=table.cubeName) && (''!=table.queryKey)) {
var filterNames = [];
var filterValues = [];
var filterLabels = []; // JSL4455
table.getFilterInfo(filterNames, filterValues, filterLabels);		// DTB551 - Retrieve labels through the method
table.getPivotVariableInfo(filterNames,filterValues);		// DTB489 - Use common API to fill in pivot variable info
var nonce = '';
var mdx = table.GetCurrentQueryText("resolved");  // WAL075 -- use getter method
if (mdx.toString().length > 500) {
nonce = zenPage.CreateQueryNonce(mdx);
if (nonce.toString().indexOf('ERROR:')>=0) {
alert(nonce);
return;
}
}
if (nonce) {
var url = '_DeepSee.UI.MDXExcel.zen?NONCE=' + encodeURIComponent(nonce);
}
else {
var url = '_DeepSee.UI.MDXExcel.zen?MDX=' + encodeURIComponent(mdx);
}
if (table.listing!='') {
url += '&LISTINGNAME='+encodeURIComponent(table.listing);
}
if (table.rowTotals) {
url += '&ROWTOTALS=1';
}
if (table.columnTotals) {
url += '&COLUMNTOTALS=1';
}
if (table.rowTotalAgg!='') {
url += '&ROWTOTALAGG=' + table.rowTotalAgg;
}
if (table.columnTotalAgg!='') {
url += '&COLUMNTOTALAGG=' + table.columnTotalAgg;
}
if (filterNames.length > 0) {
url += '&FILTERNAMES='+zenPage.CreateParameterNonce(filterNames.join('\n'));		// DTB916
url += '&FILTERVALUES='+zenPage.CreateParameterNonce(filterValues.join('\n'));		// DTB797
url += '&FILTERLABELS='+zenPage.CreateParameterNonce(filterLabels.join('\n')); // JSL4455	// DTB916
}
url += '&ROWCAPTIONS='+encodeURIComponent(table.getRowCaptions().join('\n'));
if (table.hiddenMeasureText && table.hiddenMeasureText.length > 0) {
url += '&HIDDENMEASURES='+encodeURIComponent(table.hiddenMeasureText.join('\n'));
}
if (table.measureLocation) {
url += '&MEASURELOCATION='+encodeURIComponent(table.measureLocation);
}
var title = (widgetDef.title ? widgetDef.title : table.printTitle);
var subtitle = table.printSubtitle;
var showDate = table.showDate;
if (widgetDef && widgetDef.properties) {
if (widgetDef.properties.printTitle) {
title = widgetDef.properties.printTitle;
}
if (widgetDef.properties.printSubtitle) {
subtitle = widgetDef.properties.printSubtitle;
}
if (widgetDef.properties.printSubtitle) {
showDate = widgetDef.properties.showDate;
}
}
url += '&TITLE='+encodeURIComponent(title);
url += '&SUBTITLE='+encodeURIComponent(subtitle);
url += '&SHOWDATE='+encodeURIComponent(showDate);		// DTB830
window.open(url,'excel','');
}
}

self._DeepSee_Component_Widget_pivot_exportPDF = function(printMultiple,preserveTempFiles,filename) {
var url = '';
var parms = {};
var filters = [];
var isMasterWidget = this.isMasterWidget(this.id);	// DTB252 - check to see if the page settings are expected from this widget
printMultiple = (printMultiple) ? printMultiple : false;				// DTB251 - For multi-tab browser display
preserveTempFiles = (((preserveTempFiles) ? preserveTempFiles : false)||zenPage.pdfPreserveTempFiles);	// DTB251 - For merging into a single PDF		// DTB810 - Read the current temp file preserve setting
var table = this.getDataController();
var widgetDef = this.getDefinition();
if (table && widgetDef) {
for (m=0; m < widgetDef.controls.length; m++) {
var control = widgetDef.controls[m];
if (control.action == 'applyFilter')  { // at filter control
for (var n = 0; n < table.filters.length; n++) { // walk filters look for a match
var filter = table.filters[n];
if (control.label && control.targetProperty == filter.baseSpec) {
filter._label = control.label;
}
}
}
}
}
if (''!==table.kpi) {
var filterNames = [];
var filterValues = [];
for (var n = 0; n < table.filters.length; n++) {
var filter = table.filters[n];
filters[filters.length] = encodeURIComponent(this.GetKpiFilterCaption(this.dataSource,filter.spec))+':'+encodeURIComponent(filter.value);		// DTB386
if (filter.text!='') {
filterNames[filterNames.length] = this.GetKpiFilterCaption(this.dataSource,filter.spec);		// DTB386
var val = filter.text.toString();
if ('&'==val.charAt(0)) {
val = val.substring(2,val.length-1);
}
filterValues[filterValues.length] = val;
}
}
for (prop in table.pivotVariables) { // JSL4376
filterNames[filterNames.length]= prop;
filterValues[filterValues.length] = table.pivotVariables[prop];
}
if (table.columnList!=='') {
parms.COLUMNLIST = table.columnList;
}
url = '_DeepSee.UI.MDXPDF.zen'
parms.KPI = table.kpi;
parms.SOURCE = table.dataSourceName;
if (table.isDrillThrough) {
url += '?LISTING=1';
}
}
else if ((''!=table.cubeName) && (''!=table.queryKey)) {
var filterNames = [];
var filterValues = [];
table.getFilterInfo(filterNames, filterValues);
var mdx = table.GetCurrentQueryText("resolved");  // WAL075 -- use getter method
var nonce = '';
if (mdx.toString().length > 10) {
nonce = zenPage.CreateQueryNonce(mdx); // JSL4500
if (nonce.toString().indexOf('ERROR:')>=0) {
alert(nonce);
return;
}
}
if (nonce) {
parms.NONCE = nonce;
}
else {
parms.MDX = mdx;
}
url = '_DeepSee.UI.MDXPDF.zen';
if (table.rowTotals) {
parms.ROWTOTALS = 1;
parms.ROWTOTALAGG = table.columnTotalAgg;
}
if (table.columnTotals) {
parms.COLUMNTOTALS = 1;
parms.COLUMNTOTALAGG = table.rowTotalAgg;
}
if (table.listing!='') {
parms.LISTINGNAME = table.listing;
}
var div = this.findComponent('test').getEnclosingDiv();
var style = table.columnHeaderStyle;
if (style!='') {
div.style.cssText = style;
var bg = div.style.backgroundColor != '' ? 'background-color:'+div.style.backgroundColor+';' : '';
parms.COLUMNSTYLE = zenPage.CreateParameterNonce(style + bg);		// DTB916
}
var style = table.rowHeaderStyle;
if (style!='') {
div.style.cssText = style;
var bg = div.style.backgroundColor != '' ? 'background-color:'+div.style.backgroundColor+';' : '';
parms.ROWSTYLE = zenPage.CreateParameterNonce(style + bg);		// DTB916
}
var style = table.cellStyle;
if (style!='') {
div.style.cssText = style;
var bg = div.style.backgroundColor != '' ? 'background-color:'+div.style.backgroundColor+';' : '';
parms.CELLSTYLE = zenPage.CreateParameterNonce(style + bg);
}
}
if (this.pivotView=='chart' && !table.isDrillThrough) {
url = '_DeepSee.UI.ChartPDF.zen';
var directSVG = true;		// DTB464 - Note that the chart plans to directly print its SVG content
var chart = this.findComponent('svgChart');
var xml = '';
if (chart) {
chart.controller = table; // JSL4146
if (directSVG) {
parms.SERIESNAMES = chart.getSeriesNames();
}
else {
var pnonce = '';
pnonce = zenPage.CreateParameterNonce(""+chart.getSeriesNames()); // JSL4146 JSL4171
if (pnonce.toString().indexOf('ERROR:')>=0) {
alert(pnonce);
return;
}
parms.SERIESNAMES = pnonce; // JSL4171
}
if (this.hasDataColors) {
parms.DATADRIVENSERIESCOLORS = this.chartGetSeriesColorsAsString(chart); // JSL4232 data-driven series colors
}
var oldXTitle = false;
if (chart.xAxis && ''==chart.xAxis.title) {
chart.xAxis.title = chart.getXAxisTitle();
oldXTitle = true;
}
var oldYAxisTitle = [];
var hasLeft = false;
var hasRight = false;
for (var ya = 0; ya < chart.yAxisList.length; ya++) {
var yAxis = chart.yAxisList[ya];
if (yAxis && ''==yAxis.title) {
var which = yAxis.labelPosition=='right'?'right':'left';
if (yAxis.labelPosition=='right') {
if (!hasRight) {
chart.yAxisList[ya].title = chart.getYAxisTitle('right');
oldYAxisTitle[ya] = true;
hasRight = true;
}
}
else {
if (!hasLeft) {
chart.yAxisList[ya].title = chart.getYAxisTitle('left');
oldYAxisTitle[ya] = true;
hasLeft = true;
}
}
}
}
var add = {xAxis:'object', yAxisList:'list'};
var skip = this.getOverrideSkipList('chart');
var xml = chart.objectToXML(chart,chart._type,add,skip);
if (oldXTitle) {
chart.xAxis.title = '';
}
for (var ya = 0; ya < chart.yAxisList.length; ya++) {
if (oldYAxisTitle[ya]) {
chart.yAxisList[ya].title = '';
}
}
}
var xnonce = '';
if (xml.toString().length > 10) { // PDF export involves a lot of param and avoiding long URLs is more of a problem
xnonce = zenPage.CreateQueryNonce(xml,'XML');
if (xnonce.toString().indexOf('ERROR:')>=0) {
alert(xnonce);
return;
}
}
if (xnonce) {
parms.XNONCE = xnonce;
}
else {
parms.XML = xml;
}
var legend = this.findComponent('chartLegend');
if (legend) {
parms.LEGENDPOSITION = this.legendPosition; // JSL4163
parms.LEGENDLABELS = legend.legendLabels;
parms.LEGENDTITLE = legend.legendTitle;
var legendLabelArray=parms.LEGENDLABELS.split(",");
parms.LEGENDCOLORS = '';
var sep = "";
for (var i=0; i < legendLabelArray.length; i++) {
parms.LEGENDCOLORS += sep + chart.getSeriesColor(i);
sep = ";"
}
if (directSVG) {
parms.LEGENDSTYLE = legend.legendStyle
}
else {
var pnonce = '';
pnonce = zenPage.CreateParameterNonce(""+legend.legendStyle);     // JSL4171
if (pnonce.toString().indexOf('ERROR:')>=0) {
alert(pnonce);
return;
}
parms.LEGENDSTYLE = pnonce; // JSL4171
}
}
parms.WIDGETTITLE = widgetDef.title // JSL4146
} else {
if (table.isDrillThrough) {
/* JSL4250 */
var listingFilters=table.listingFilters.join(",")
var lfArray = [];
for (var n = 0; n < table.listingFilters.length; n++) {
var listingFilter = table.listingFilters[n];
lfArray[lfArray.length] = listingFilter.spec;
}
}
}
parms.TITLE = this.dataSource;		// DP-416074 - Initialize title to datasource
if (table) {
if (table.printTitle) {
parms.TITLE = table.printTitle;
}
if (table.printSubtitle) {
parms.SUBTITLE = table.printSubtitle;
}
parms.ROWCAPTIONS = table.getRowCaptions().join('\n');
if (table.showZebra) {
parms.ZEBRA = 1;
}
parms.EVENROWSTYLE = zenPage.CreateParameterNonce(table.evenRowStyle); // JSL4280	// DTB916
parms.LABELWIDTH = table.printLabelWidth;
parms.CELLWIDTH = table.printCellWidth;
parms.ROWCAPTION = table.rowCaptionText;
if (table.printPageSize) {
parms.PAGESIZE = table.printPageSize;
}
if (table.printOrientation) {
parms.ORIENTATION = table.printOrientation;
}
if (typeof table.printSubtitleOn) {
parms.SUBTITLEON = table.printSubtitleOn;	// DTB228 - Use parameter name MDXPDF expects
}
if (table.showUser) {
parms.SHOWUSER = table.showUser
}
if (table.maxRows) {
parms.MAXROWS = table.maxRows;
}
if (table.borderLeftCell) {
parms.BORDERLEFTCELL = table.borderLeftCell;
}
if (table.borderRightCell) {
parms.BORDERRIGHTCELL = table.borderRightCell;
}
if (table.borderTopCell) {
parms.BORDERTOPCELL = table.borderTopCell;
}
if (table.borderBottomCell) {
parms.BORDERBOTTOMCELL = table.borderBottomCell;
}
if (table.fontFamilyCell!='') {
parms.FONTFAMILYCELL = table.fontFamilyCell;
}
if (table.fontSizeCell!='') {
parms.FONTSIZECELL = table.fontSizeCell;
}
if (table.borderLeftCol) {
parms.BORDERLEFTCOL = table.borderLeftCol;
}
if (table.borderRightCol) {
parms.BORDERRIGHTCOL = table.borderRightCol;
}
if (table.borderTopCol) {
parms.BORDERTOPCOL = table.borderTopCol;
}
if (table.borderBottomCol) {
parms.BORDERBOTTOMCOL = table.borderBottomCol;
}
if (table.fontFamilyCol!='') {
parms.FONTFAMILYCOL = table.fontFamilyCol;
}
if (table.fontSizeCol!='') {
parms.FONTSIZECOL = table.fontSizeCol;
}
if (table.borderLeftRow) {
parms.BORDERLEFTROW = table.borderLeftRow;
}
if (table.borderRightRow) {
parms.BORDERRIGHTROW = table.borderRightRow;
}
if (table.borderTopRow) {
parms.BORDERTOPROW = table.borderTopRow;
}
if (table.borderBottomRow) {
parms.BORDERBOTTOMROW = table.borderBottomRow;
}
if (table.fontFamilyRow!='') {
parms.FONTFAMILYROW = table.fontFamilyRow;
}
if (table.fontSizeRow!='') {
parms.FONTSIZEROW = table.fontSizeRow;
}
if (table.showFilters) {
parms.SHOWFILTERS = table.showFilters;
}
if (table.showListingFilters) { // JSL4250
parms.SHOWLISTINGFILTERS = table.showListingFilters;
}
if (table.listingFontSize) { // JSL4279
parms.LISTINGFONTSIZE = table.listingFontSize;
}
if (table.showZebraStripes) { // JSL4256
parms.SHOWZEBRASTRIPES = table.showZebraStripes;
}
if (table.showDate) { // JSL4250
parms.SHOWDATE = table.showDate;
}
if (table.printMarginTop) {
parms.MARGINTOP = table.printMarginTop;
}
if (table.printMarginBottom) {
parms.MARGINBOTTOM = table.printMarginBottom;
}
if (table.printMarginLeft) {
parms.MARGINLEFT = table.printMarginLeft;
}
if (table.printMarginRight) {
parms.MARGINRIGHT = table.printMarginRight;
}
}
if (widgetDef && widgetDef.properties) {
if (widgetDef.properties.printTitle) {
parms.TITLE = widgetDef.properties.printTitle;
}
else if (widgetDef.title) {
parms.TITLE = widgetDef.title;
}
if (widgetDef.properties.printSubtitle) {
parms.SUBTITLE = widgetDef.properties.printSubtitle;
}
if (widgetDef.properties.printPageSize) {
parms.PAGESIZE = widgetDef.properties.printPageSize;
}
if (widgetDef.properties.printOrientation) {
parms.ORIENTATION = widgetDef.properties.printOrientation;
}
if (widgetDef.properties.printSubtitleOn) {
parms.SUBTITLEON = widgetDef.properties.printSubtitleOn;	// DTB228 - Use parameter name MDXPDF expects
}
if (widgetDef.properties.showUser) { // JSL4320
parms.SHOWUSER = widgetDef.properties.showUser;
}
if (widgetDef.properties.printMarginTop) {
parms.MARGINTOP = widgetDef.properties.printMarginTop;
}
if (widgetDef.properties.printMarginBottom) {
parms.MARGINBOTTOM = widgetDef.properties.printMarginBottom;
}
if (widgetDef.properties.printMarginLeft) {
parms.MARGINLEFT = widgetDef.properties.printMarginLeft;
}
if (widgetDef.properties.printMarginRight) {
parms.MARGINRIGHT = widgetDef.properties.printMarginRight;
}
if (widgetDef.properties.maxRows) {
parms.MAXROWS = widgetDef.properties.maxRows;
}
if (widgetDef.properties.borderLeftCell) {
parms.BORDERLEFTCELL = widgetDef.properties.borderLeftCell;
}
if (widgetDef.properties.borderRightCell) {
parms.BORDERRIGHTCELL = widgetDef.properties.borderRightCell;
}
if (widgetDef.properties.borderTopCell) {
parms.BORDERTOPCELL = widgetDef.properties.borderTopCell;
}
if (widgetDef.properties.borderBottomCell) {
parms.BORDERBOTTOMCELL = widgetDef.properties.borderBottomCell;
}
if (widgetDef.properties.fontFamilyCell) {
parms.FONTFAMILYCELL = widgetDef.properties.fontFamilyCell;
}
if (widgetDef.properties.fontSizeCell) {
parms.FONTSIZECELL = widgetDef.properties.fontSizeCell;
}
if (widgetDef.properties.borderLeftCol) {
parms.BORDERLEFTCOL = widgetDef.properties.borderLeftCol;
}
if (widgetDef.properties.borderRightCol) {
parms.BORDERRIGHTCOL = widgetDef.properties.borderRightCol;
}
if (widgetDef.properties.borderTopCol) {
parms.BORDERTOPCOL = widgetDef.properties.borderTopCol;
}
if (widgetDef.properties.borderBottomCol) {
parms.BORDERBOTTOMCOL = widgetDef.properties.borderBottomCol;
}
if (widgetDef.properties.fontFamilyCol) {
parms.FONTFAMILYCOL = widgetDef.properties.fontFamilyCol;
}
if (widgetDef.properties.fontSizeCol) {
parms.FONTSIZECOL = widgetDef.properties.fontSizeCol;
}
if (widgetDef.properties.borderLeftRow) {
parms.BORDERLEFTROW = widgetDef.properties.borderLeftRow;
}
if (widgetDef.properties.borderRightRow) {
parms.BORDERRIGHTROW = widgetDef.properties.borderRightRow;
}
if (widgetDef.properties.borderTopRow) {
parms.BORDERTOPROW = widgetDef.properties.borderTopRow;
}
if (widgetDef.properties.borderBottomRow) {
parms.BORDERBOTTOMROW = widgetDef.properties.borderBottomRow;
}
if (widgetDef.properties.fontFamilyRow) {
parms.FONTFAMILYROW = widgetDef.properties.fontFamilyRow;
}
if (widgetDef.properties.fontSizeRow) {
parms.FONTSIZEROW = widgetDef.properties.fontSizeRow;
}
if (widgetDef.properties.showFilters) {
parms.SHOWFILTERS = widgetDef.properties.showFilters;
}
if (widgetDef.properties.showListingFilters) { // JSL4520
parms.SHOWLISTINGFILTERS = widgetDef.properties.showListingFilters;
}
if (widgetDef.properties.showDate) { // JSL4520
parms.SHOWDATE = widgetDef.properties.showDate;
}
if (widgetDef.properties.listingFontSize) { // JSL4279
parms.LISTINGFONTSIZE = widgetDef.properties.listingFontSize;
}
if (widgetDef.properties.showZebraStripes) { // JSL4526
parms.SHOWZEBRASTRIPES = widgetDef.properties.showZebraStripes;
}
if (widgetDef.properties.filterTableStyle) {
parms.FILTERTABLESTYLE = zenPage.CreateParameterNonce(widgetDef.properties.filterTableStyle);		// DTB916
}
if (widgetDef.properties.filterTableCaptionStyle) {
parms.FILTERTABLECAPTIONSTYLE = zenPage.CreateParameterNonce(widgetDef.properties.filterTableCaptionStyle);		// DTB916
}
if (widgetDef.properties.filterTableItemStyle) {
parms.FILTERTABLEITEMSTYLE = zenPage.CreateParameterNonce(widgetDef.properties.filterTableItemStyle);		// DTB916
}
if (widgetDef.properties.nowDisplayFormat) {
parms.NOWDISPLAYFORMAT = widgetDef.properties.nowDisplayFormat;
}
}
if (table.getSelectedRange()) {
parms.SELECTEDRANGE = table.getSelectedRange();
}
if (table.getSelectedItems()) {
parms.SELECTEDITEMS = zenPage.CreateParameterNonce(table.getSelectedItems().toString());		// DTB916
}
if (table.listingSortColumn) {
parms.LISTINGSORTCOLUMN = table.listingSortColumn;
}
if (table.listingSortDir) {
parms.LISTINGSORTDIR = table.listingSortDir;
}
var filterNames = [];
var filterValues = [];
table.getFilterInfo(filterNames,filterValues);
for (prop in table.pivotVariables) { // JSL4376
filterNames[filterNames.length]= prop;
filterValues[filterValues.length] = table.pivotVariables[prop];
}
if (preserveTempFiles) {
parms.$NODELETE = 1
parms.preserveTempFiles = preserveTempFiles;		// DTB345
}
if (printMultiple) {
if (isMasterWidget) {
if (parms.PAGESIZE) {
zenPage.printPageSize = parms.PAGESIZE;
}
else {
parms.PAGESIZE = zenPage.printPageSize;
}
if (parms.ORIENTATION) {
zenPage.printPageOrientation = parms.ORIENTATION;
}
else {
parms.ORIENTATION = zenPage.printPageOrientation;
}
if (parms.MARGINTOP) {
zenPage.printMarginTop = parseFloat(parms.MARGINTOP)+'in';
}
else {
parms.MARGINTOP = parseFloat(zenPage.printMarginTop);
}
if (parms.MARGINBOTTOM) {
zenPage.printMarginBottom = parseFloat(parms.MARGINBOTTOM)+'in';
}
else {
parms.MARGINBOTTOM = parseFloat(zenPage.printMarginBottom);
}
if (parms.MARGINLEFT) {
zenPage.printMarginLeft = parseFloat(parms.MARGINLEFT)+'in';
}
else {
parms.MARGINLEFT = parseFloat(zenPage.printMarginLeft);
}
if (parms.MARGINRIGHT) {
zenPage.printMarginRight = parseFloat(parms.MARGINRIGHT)+'in';
}
else {
parms.MARGINRIGHT = parseFloat(zenPage.printMarginRight);
}
}
else {
if (zenPage.printPageSize) {
parms.PAGESIZE = zenPage.printPageSize;
}
if (zenPage.printPageOrientation) {
parms.ORIENTATION = zenPage.printPageOrientation;
}
if (zenPage.printMarginTop) {
parms.MARGINTOP = parseFloat(zenPage.printMarginTop) + 0.5;
}
if (zenPage.printMarginBottom) {
parms.MARGINBOTTOM = parseFloat(zenPage.printMarginBottom);
}
if (zenPage.printMarginLeft) {
parms.MARGINLEFT = parseFloat(zenPage.printMarginLeft);
}
if (zenPage.printMarginRight) {
parms.MARGINRIGHT = parseFloat(zenPage.printMarginRight);
}
}
}
if (url) {
url = zenLink(url);
var count = 0;
var questionflag = url.indexOf('?') >= 0;
for (var p in parms) {
if (parms[p]!=='') {
url += (count || questionflag ?'&':'?') + p + '=' + encodeURIComponent(parms[p]);
count++;
}
}
if (''!==table.kpi) {
for (var n = 0; n < filters.length; n++) {
url += '&FILTER=' + filters[n];
}
}
if (filterNames.length > 0) { // JSL4182
url += '&FILTERNAMES='+zenPage.CreateParameterNonce(filterNames.join('\n'));		// DTB916
url += '&FILTERVALUES='+zenPage.CreateParameterNonce(filterValues.join('\n'));		// DTB916
}
if (lfArray) {
if (lfArray.length > 0) {
url += '&LISTINGFILTERS='+zenPage.CreateParameterNonce(lfArray.join('\n'));		// DTB916
}
}
parms.filterTable = this.getFilterTableForPrinting(parms);		// DTB346	// DTB405 - Pass parameters
parms.printMultiple = (printMultiple) ? true : false;		// DTB346 - Force boolean value
parms.title = '';		// DP-416074 - Clear out the overall report title
this.prepareSvgPrintParameters(parms);						// DTB367 - Normalize the printing parameters
if ((this.pivotView=='chart') && !table.isDrillThrough) {
if ((!this.legendPosition)||('none'==this.legendPosition)) {
this.printSVGContent(this.id + '/svgFrame',parms,'',filename);		// DTB684 - Add filename
}
else {
var svgUtil = zen('svgUtil');
var chartDocument = svgUtil.getSVGDOMRoot(this.id + '/svgFrame');
var legendSVG = svgUtil.createSVGTableFromZenComponent(this.id + '/chartLegend');
var legendId = legendSVG.childNodes[0].id;
svgUtil.addSVGLegendToChart(chartDocument,legendSVG,this.legendPosition);
this.printSVGContent(this.id + '/svgFrame',parms,chartDocument,filename);		// DTB684 - Add filename
svgUtil.removeSVGLegendFromChart(chartDocument,legendId,this.legendPosition);		// DTB356 - Add legend position to call
}
}
else {
if ((table.isDrillThrough)||(table.rowCount>table.pageSize)) {
if (printMultiple) {
var printMode = ((this.pivotView=='chart') && !table.isDrillThrough) ? this.pivotView : 'table';
this.GenerateXSLFO(this.id,url,printMode,filename);		// DTB684 - Add filename
}
else {
if (!filename) {
window.open(url,'pdf','');
}
else {
window.open(url+'&$REPORTNAME='+filename+'&$NODELETE=1','pdf','');
}
}
}
else {
var svgUtil = zen('svgUtil');
var tableId = this.id + '/table';
svgUtil.setPrintParameters(parms);
var svgTable = svgUtil.createSVGTableFromZenComponent(tableId);
var svgTableDiv = document.createElement('div');
svgTableDiv.appendChild(svgTable);
if (svgTable) {
parms.imageWidth = svgTable.getAttribute('width');
var maxHeight = svgUtil.calculateMaxImageHeight(parms);
maxHeight = svgUtil.convertSizeToPoint(maxHeight);
if (svgTable.getAttribute('height') > maxHeight.value) {
if (printMultiple) {
var printMode = ((this.pivotView=='chart') && !table.isDrillThrough) ? this.pivotView : 'table';
this.GenerateXSLFO(this.id,url,printMode,filename);		// DTB684 - Add filename
}
else {
if (!filename) {		// DTB734
window.open(url,'pdf','');
}
else {
window.open(url+'&$REPORTNAME='+filename+'&$NODELETE=1','pdf','');
}
}
}
else {
this.printSVGContent(tableId,parms,svgTableDiv,filename);		// DTB345 - Simplify with modified printSVGContent		// DTB684 - Add filename
}
}
}
}
}
}

self._DeepSee_Component_Widget_pivot_getDataController = function() {
return this.findComponent('table');
}

self._DeepSee_Component_Widget_pivot_getOverrides = function() {
var overrides = {};
var def = this.getDefinition();
if (def) {
if (def.themeOverrides['pivot']) {
overrides['pivot'] = def.themeOverrides['pivot'];
}
if (def.overrides['pivot']) {
overrides['pivot'] = def.overrides['pivot'];
}
if (def.themeOverrides['legend']) {
overrides['legend'] = def.themeOverrides['legend'];
}
if (def.overrides['legend']) {
overrides['legend'] = def.overrides['legend'];
}
var chart = this.findComponent('svgChart');
if (def.themeOverrides['chart']) {
overrides['chart'] = def.themeOverrides['chart'];
}
if (chart) {
var newTheme = {};
var props = this.themeChartProperties.toString().split(',');
for (var n = 0; n < props.length; n++) {
var prop = props[n];
newTheme[prop] = chart[prop];
}
var json = ZLM.jsonStringify(newTheme);
if (json=='{}') {
delete overrides['chart'];
}
else {
overrides['chart'] = json;
}
}
}
return overrides;
}

self._DeepSee_Component_Widget_pivot_getParameterValue = function(parm) {
var pivot = this.getDataController();
var value = '';
switch(parm) {
case 'CURRVALUE':
value=this.getProperty('currValue'); // WAL188 && Sascha Kisser
break;
case 'VALUELIST':
var list = pivot.getSelectedItems();
if (list) {
for (var n = 0; n < list.length; n++) {
if (list[n] && list[n]!='' && 'string'==typeof list[n]) {
list[n] = list[n].replace(/\,/g,'\\,');
}
}
}
value = list ? list.join(',') : '';
break;
case 'ROWSPEC':
var range = pivot.getSelectedRange();
if (range) {
var itemInfo = new zenProxy();
var ok = pivot.GetItemSpec(itemInfo,pivot.cubeName,pivot.queryKey,pivot.sortDir, pivot.sortColumn,'row',range[0]);
if (!ok) {
if (itemInfo.error) {
alert(itemInfo.error);
}
return;
}
value = itemInfo.spec;
}
break;
case 'COLUMNSPEC':
var range = pivot.getSelectedRange();
if (range) {
var itemInfo = new zenProxy();
var ok = pivot.GetItemSpec(itemInfo,pivot.cubeName,pivot.queryKey,pivot.sortDir, pivot.sortColumn,'col',range[1]);
if (!ok) {
if (itemInfo.error) {
alert(itemInfo.error);
}
return;
}
value = itemInfo.spec;
}
break;
case 'VARIABLES':
value = this.getPivotVariableState();
break;
default:
value = this.invokeSuper('getParameterValue',arguments);
break;
}
return value;
}

self._DeepSee_Component_Widget_pivot_getPivot = function() {
return this.findComponent('table');
}

self._DeepSee_Component_Widget_pivot_getPivotVariableState = function(delim1,delim2) {
var table = this.getDataController();
if (table) {
delim1 = ('undefined'==typeof delim1) ? '\t' : delim1;
delim2 = ('undefined'==typeof delim2) ? '\n' : delim2;
var pivotVariables = table.pivotVariables;
var state = '';
for (var p in pivotVariables) {
var value = pivotVariables[p];
state += p + delim1 + value + delim2;
}
return state;
}
}

self._DeepSee_Component_Widget_pivot_getSubtypeClass = function() {
var type = '';
var chart = this.findComponent('svgChart');
if (chart) {
type = chart._type;
}
return type;
}

self._DeepSee_Component_Widget_pivot_hasOverrides = function() {
var def = this.getDefinition();
var cls = this.getSubtypeClass();
return (def&&((cls&&def.overrides[cls])||def.overrides['legend']||def.overrides['pivot'])) ? true : false;
}

self._DeepSee_Component_Widget_pivot_listingSelectHandler = function(pivot) {
this.updateControlState();
}

self._DeepSee_Component_Widget_pivot_markerClicked = function(marker) {
var table = this.getDataController();
if (!table) return;
var map = this.findComponent('map');
if (map) {
var index = marker._id;
var data = table.getContent();
if (data && data.listingRows && data.listingRows[index]) {
var row = data.listingRows[index];
var content = [];
for (var prop in row) {
if (prop!='Latitude' && prop!='Longitude') {
var propName = prop.replace(/_/g,' ');
content[content.length] = '<div style="color:#606080; font-size:8pt;">'+zenEscapeXML(propName)+'</div>';
content[content.length] = '<div style="color:#404040; font-size:10pt;padding-bottom:2px;">'+zenEscapeXML(row[prop])+'</div>';
}
}
map.createInfoWindow(marker,content.join(''));
}
}
}

self._DeepSee_Component_Widget_pivot_navCloseButtonClick = function(key) {
var ckey = key;
var kt = ckey.toString().split('-');
kt.splice(0,1);
var k2 = kt.join('-');
var target = kt[0];
switch(target) {
case 'chart':
var chart = this.findComponent('svgChart');
var k3 = k2.split(':')[0];
if (k3=='chart-yAxis') {
var yc = chart.yAxisList.length;
}
this.chartCloseButtonClick(zenPage.getNavigator(),chart,k2);
if (k3=='chart-yAxis' && yc != chart.yAxisList.length) {
zenPage.setModified(true);
this.navDataChange('widget-chart-yAxisRemove','',true);
}
break;
default:
this.invokeSuper('navCloseButtonClick',arguments);
break;
}
}

self._DeepSee_Component_Widget_pivot_navDataChange = function(key,value,final) {
var navigator = zenPage.getNavigator();
var legend = this.findComponent('chartLegend');
var ckey = key;
var kt = ckey.toString().split('-');
kt.splice(0,1);
var k2 = kt.join('-');
var target = kt[0];
switch (target) {
case 'common':
this.invokeSuper('navDataChange',arguments);
break;
case 'chart':
if (this.pivotView == 'table') {
break; // don't process a data change to chart if we are viewing a table JSL4165
}
if (ckey == 'widget-chart-dataColorList') {
if (final) {
var widgetDef = this.getDefinition();
if (widgetDef && widgetDef.dataColorList!=value) {
widgetDef.dataColorList = value;
zenPage.recreateWidget(zenPage.currWidgetKey);
}
}
break;
}
if (ckey == 'widget-chart-ChartType') {
if (!zenPage._oldChartType) {
var widgetDef = this.getDefinition();
if (widgetDef && widgetDef.subtype) {
zenPage._oldChartType = widgetDef.subtype;
}
}
}
var svg = this.findComponent('svgFrame');
var chart = this.findComponent('svgChart');
var timeBased = chart.isTimeBased();
if (k2!='chart-yAxisRemove') {
this.chartDataChange(zenPage.getNavigator(),svg,chart,k2,value,final);
}
if (k2=='chart-ChartType' && (timeBased!=chart.isTimeBased())) {
this.adjustSizes(false);
}
else if (k2=='chart-labelsVisible') {
this.labelsVisible = value;
}
if (final) {
var widgetDef = this.getDefinition();
if (widgetDef) {
if (ckey == 'widget-chart-ChartType') {
delete zenPage._oldChartType;
widgetDef.subtype = value;
}
var skip = this.getOverrideSkipList('chart');
if (widgetDef.themeOverrides['chart']) {
var themeObj = ZLM.jsonParse(widgetDef.themeOverrides['chart']);
if (themeObj) {
for (var p in themeObj) {
if (chart[p]==themeObj[p]) {
skip[p] = true;
}
}
}
}
var jsonOver = this.componentToJSON(chart,0,skip);
widgetDef.overrides[chart._type] = jsonOver;
}
}
break;
case 'pivot':
var pivot = this.getPivot();
this.pivotTableDataChange(zenPage.getNavigator(),pivot,k2,value,final);
if (final) {
var widgetDef = this.getDefinition();
if (widgetDef) {
var skip = this.getOverrideSkipList('pivot');
var jsonOver = this.componentToJSON(pivot,0,skip);
if (zenGet(widgetDef.themeOverrides['pivot'])!=jsonOver) {
widgetDef.overrides['pivot'] = jsonOver;
}
else {
delete widgetDef.overrides['pivot'];
}
}
}
break;
case 'legend':
switch(k2) {
case 'legend-legendPosition':
this.legendPosition = value;
if (legend) {
switch(this.legendPosition) {
case 'top':
case 'bottom':
legend.setProperty('orientation','horizontal');
break;
case 'left':
case 'right':
legend.setProperty('orientation','vertical');
break;
}
}
this.adjustSizes(false);
if (final) {
var widgetDef = this.getDefinition();
widgetDef.properties['legendPos'] = this.legendPosition;
zenPage.setModified(true);
}
break;
case 'legend-textStyle':
var styleValues = {};
var cv = value.toString().split(',');
for (var n = 0; n < cv.length; n++) {
styleValues[cv[n]] = true;
}
var list = ['bold','underline','italic','shadow'];
if (legend) {
var style = zenGet(legend.legendStyle);
var kt = k2.toString().split('-');
kt.splice(0,1);
var k3 = kt.join('-');
for (var n = 0; n < list.length; n++) {
style = navigator.setStyleIntoCSS(zenGet(style),list[n],styleValues[list[n]]?true:false);
}
legend.setProperty('legendStyle',style);
this.adjustSizes(false);
}
break;
case 'legend-color':
case 'legend-background':
case 'legend-font-family':
case 'legend-opacity':
if (legend) {
var kt = k2.toString().split('-');
kt.splice(0,1);
var k3 = kt.join('-');
var style = zenGet(legend.legendStyle);
style = navigator.setStyleIntoCSS(style,k3,value);
legend.setProperty('legendStyle',style);
this.adjustSizes(false);
/* comment out JSL4483
if (k2 == 'legend-opacity') {
var legendDiv = document.getElementById(this.id+'/chartLegend');
if (legendDiv != null) {
legendDiv.style.background = 'transparent';
}
}
*/
}
break;
case 'legend-border-opacity':		// DTB171 - Add opacity
case 'legend-border-stroke-width':
value = isNaN(value) ? 0 : value;		// DTB215 - Do not allow NaN to get saved
case 'legend-border-stroke':
case 'legend-border-stroke-dasharray':
if (legend) {
var kt = k2.toString().split('-');
kt.splice(0,2);
var borderKey = kt.join('-');
legend.setBorderStyle(borderKey,value);
this.adjustSizes(false);		// DTB171 - Cause legend to respond to sliders
}
break;
case 'legend-border-radius':
case 'legend-font-size':
case 'legend-padding':
case 'legend-margin':
case 'legend-top':
case 'legend-left':
case 'legend-height':
case 'legend-width':
value = value!=='' ? value+'px' : value;
if (legend) {
var kt = k2.toString().split('-');
kt.splice(0,1);
var k3 = kt.join('-');
var style = zenGet(legend.legendStyle);
style = navigator.setStyleIntoCSS(style,k3,value);
legend.setProperty('legendStyle',style);
this.adjustSizes(false);		// DTB171
}
break;
case 'legend-title':
if (legend) {
legend.setProperty('legendTitle',value);
this.adjustSizes(false);
}
break;
case 'legend-showTitle':
if (legend) {
legend.setProperty('showLegendTitle',value);
this.adjustSizes(false);
}
break;
case 'legend-legendBoxShadow':
if (legend) {
if (value) {
legend.setProperty('legendBoxStyle','');
}
else {
legend.setProperty('legendBoxStyle','box-shadow:0px 0px;');
}
}
break;
}
if (final) {
var widgetDef = this.getDefinition();
if (widgetDef) {
var skip = this.getOverrideSkipList('legend');
var jsonOver = this.componentToJSON(legend,0,skip);
if (zenGet(widgetDef.themeOverrides['legend'])!=jsonOver) {
widgetDef.overrides['legend'] = jsonOver;
}
else {
delete widgetDef.overrides['legend'];
}
}
}
break;
default:
break;
}
}

self._DeepSee_Component_Widget_pivot_navGetContentForLevel = function(level,key,value) {
var content = { title: $$$Text('Settings','%DeepSee'), items:[] };
var navigator = zenPage.getNavigator();
var title = '';
var ckey = key; // local copy
var keyNo = '';
if (ckey.toString().indexOf(':')>0) {
var t = ckey.split(':');
ckey = t[0];
keyNo = parseInt(t[1]);
}
switch (ckey) {
case 'WidgetSettings':
content = this.invokeSuper('navGetContentForLevel',arguments);
content.items[content.items.length] = {display:'section', caption:$$$Text('Chart and Pivot','%DeepSee') };
content.items[content.items.length] = {display:'image-caption-hz', image:'deepsee/ds2_list_44.png', caption:$$$Text('Table Settings','%DeepSee'), action:'drill', key:'widget-pivot-PivotSettings'};
content.items[content.items.length] = {display:'image-caption-hz', image:'deepsee/ds2_bar_chart_44.png', caption:$$$Text('Chart Settings','%DeepSee'), action:'drill', key:'widget-chart-ChartSettings'};
content.items[content.items.length] = {display:'image-caption-hz', image:'deepsee/ds2_cards_44.png', caption:$$$Text('Chart Legend','%DeepSee'), action:'drill', key:'widget-legend-ChartLegend'};
content.items[content.items.length] = {display:'image-caption-hz', image:'deepsee/ds2_printer_44.png', caption:$$$Text('Print Setup','%DeepSee'), action:'select', key:'widget-print-setup'};
break;
case 'widget-legend-ChartLegend':
content.title = $$$Text('Chart Legend','%DeepSee');
var legend = this.findComponent('chartLegend');
var which = 'widget-legend';
var idx = '';
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Position','%DeepSee'), edit:'choice', value:this.legendPosition, key:which+'-legendPosition', valueList:'none,top,bottom,left,right', displayList:'&#248,&#9650;,&#9660;,&#9664;,&#9654;'};
var info = navigator.parseStyle(legend.legendStyle);
var color = info.color;
var background = info.backgroundColor;
var fontFamily = info.fontFamily;
var fontSize = info.fontSize;
var opacity = info.opacity;
var align = zenGet(info.textAlign);
var fs = [];
if (info.bold) { fs[fs.length] = 'bold'; }
if (info.underline) { fs[fs.length] = 'underline'; }
if (info.italic) { fs[fs.length] = 'italic'; }
if (info.shadow) { fs[fs.length] = 'shadow'; }
var fontStyle = fs.join(',');
var opacity = zenGet(info.opacity);
opacity = opacity === '' ? 1.0 : opacity;
var radius = zenGet(info.radius);
var showBoxShadow = (''==legend.legendBoxStyle);		// DTB170 - Read style to decide whether to display the shadow on the series box
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Title','%DeepSee'), edit:'string', value:zenGet(legend.legendTitle),key:which+'-title'+idx};  // + WAL098 -- allow legend title to be specified
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Show Title','%DeepSee'), edit:'switch', value:zenGet(legend.showLegendTitle),key:which+'-showTitle'+idx };  // + WAL098 -- allow legend title to be toggled on/off
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Border','%DeepSee'), action:'drill', value:'',	key:which+'-border'+idx};					// DTB169 - Add legend border drill control
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Background','%DeepSee'), action:'drill', value:'',	key:which+'-background'+idx, valueStyle:'width:80px;border-radius:5px;border:1px solid #B0B0B0;background:'+background+';'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Opacity','%DeepSee'), edit:'slider', value:opacity,	key:which+'-opacity'+idx, minValue:0, maxValue:1 };
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Font','%DeepSee'), action:'drill', value:fontFamily,	key:which+'-font-family'+idx, valueStyle:'font-size:13px;font-family:'+fontFamily+';'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Font Size','%DeepSee'), edit:'slider-toggle', value:fontSize,	key:which+'-font-size'+idx, minValue:2, maxValue:75, stepSize:1};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Text Color','%DeepSee'), action:'drill', value:'',	key:which+'-color'+idx, valueStyle:'width:80px;border-radius:5px;border:1px solid #B0B0B0;background:'+color+';'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Text Style','%DeepSee'), edit:'choice-multi', value:fontStyle,	key:which+'-textStyle'+idx, valueList:'bold,italic,underline,shadow', displayList:'B,I,U,S', valueStyle:'font-size:12px;font-family:times new roman;',  choiceStyles:'font-weight:900;^font-style:italic;^text-decoration:underline;^text-shadow:1px 1px 2px #F0F0F0;'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Padding','%DeepSee'), edit:'slider-toggle', value:zenGet(info.padding),	key:which+'-padding'+idx, minValue:0, maxValue:25};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Width','%DeepSee'), edit:'slider-toggle', value:zenGet(info.width),	key:which+'-width'+idx, minValue:0, maxValue:1200};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Height','%DeepSee'), edit:'slider-toggle', value:zenGet(info.height),	key:which+'-height'+idx, minValue:0, maxValue:250};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Show Box Shadow','%DeepSee'), edit:'switch', value:showBoxShadow,key:which+'-legendBoxShadow'+idx };		// DTB170
break;
case 'widget-legend-color':
content.title = $$$Text('Legend Text Color','%DeepSee');
content.html = navigator.getColorChooserHTML(ckey,value,'html');
break;
case 'widget-legend-background':
content.title = $$$Text('Legend Background Color','%DeepSee');
content.html = navigator.getColorChooserHTML(ckey,value,'html');
break;
case 'widget-legend-border-stroke':
content.title = $$$Text('Legend Border Color','%DeepSee');
content.html = navigator.getColorChooserHTML(ckey,value,'html');
break;
case 'widget-legend-border':
var legend = this.findComponent('chartLegend');
if (legend) {
content.title = $$$Text('Legend Border Style','%DeepSee');
var info = navigator.parseStyleSVG(legend.legendBorderStyle);
var opacity = zenGet(info['opacity']);		// DTB171 - Add opacity
var stroke = zenGet(info['border-color']);
var strokeWidth = zenGet(info['border-width']);
var strokeDashArray = (''!=zenGet(info['border-style'])) ? info['border-style'] : 'solid';
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Opacity','%DeepSee'), edit:'slider-toggle', value:opacity,	key:ckey+'-opacity', minValue:0, maxValue:1 };
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Line','%ZEN'), action:'drill', value:'',	key:ckey+'-stroke', valueStyle:'width:80px;border-radius:5px;border:1px solid #B0B0B0;background:'+stroke+';'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Line Width','%ZEN'), edit:'slider-toggle', value:strokeWidth,	key:ckey+'-stroke-width', minValue:0, maxValue:25, stepSize:0.25};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Line Style','%ZEN'), edit:'choice', value:strokeDashArray,	key:ckey+'-stroke-dasharray', valueList:'solid,dashed,dotted', displayList:$$$Text('solid,dashed,dotted','%ZEN')};
}
break;
case 'widget-legend-font-family':
content.title = $$$Text('Legend Font','%DeepSee');
content.html = navigator.getFontChooserHTML(which+'-font-family',value);
break;
default:
var kt = ckey.toString().split('-');
switch(kt[1]) {
case 'common':
content = this.invokeSuper('navGetContentForLevel',arguments);
break;
case 'pivot':
var pivot = this.getPivot();
var kt = ckey.toString().split('-');
kt.splice(0,1);
var k2 = kt.join('-');
k2 = (keyNo==='') ? k2 : (k2 + ':' + keyNo);
content = this.pivotTableGetContentForLevel(zenPage.getNavigator(),pivot,level,k2,'');
if (content.items) {
for (var n = 0; n < content.items.length; n++) {
var k = content.items[n].key;
if (k) {
content.items[n].key = 'widget-' + k;
}
}
}
break;
case 'chart':
var chart = this.findComponent('svgChart');
if (chart) {
var kt = ckey.toString().split('-');
kt.splice(0,1);
var k2 = kt.join('-');
k2 = (keyNo==='') ? k2 : (k2 + ':' + keyNo);
content = this.chartGetContentForLevel(zenPage.getNavigator(),chart,level,k2,value);
if (k2=='chart-ChartColors') {
var widgetDef = this.getDefinition();
content.items.push({display:'section', caption:$$$Text('Data-driven Colors','%DeepSee')});
content.items.push({display:'caption-value-hz', caption:$$$Text('Termlist','%DeepSee'), edit:'string', value:zenGet(widgetDef.dataColorList),  key:'chart-dataColorList', title:$$$Text('Name of the termlist containing the list of values and colors','%DeepSee'),action:'popup',url:'_DeepSee.UI.Dialog.finderDialog.zen?MODE=termlists'});
}
if (content.items) {
for (var n = 0; n < content.items.length; n++) {
var k = content.items[n].key;
if (k) {
content.items[n].key = 'widget-' + k;
}
}
}
}
break;
}
break;
}
return content;
}

self._DeepSee_Component_Widget_pivot_navHeaderButtonClick = function(key) {
var ckey = key;
var kt = ckey.toString().split('-');
var target = kt[0];
switch(target) {
case 'chart':
var chart = this.findComponent('svgChart');
this.chartHeaderButtonClick(zenPage.getNavigator(),chart,ckey);
break;
default:
this.invokeSuper('navHeaderButtonClick',arguments);
break;
}
}

self._DeepSee_Component_Widget_pivot_navPopupAction = function(key,value) {
var keyNo = '';
if (key.toString().indexOf(':')>0) {
var t = key.split(':');
var controlKey = t[0];  // WAL059 -- Don't change the arguments before passing them to super class
keyNo = parseInt(t[1]);
}
switch(controlKey) {
case 'widget-chart-dataColorList':
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
if (widgetDef && widgetDef.dataColorList != value) {
widgetDef.dataColorList = value;
zenPage.setModified(true);
zenPage.recreateWidget(zenPage.currWidgetKey);
}
break;
default:
this.invokeSuper('navPopupAction',arguments);
break;
}
}

self._DeepSee_Component_Widget_pivot_onApplyFilters = function(refresh) {
if (('chart'==this.pivotView)&&(''!=this.getPivot().error)) {
this.toggleChart();
}
else if (this.subtypeIsChart(this.subtype) &&
(!this.getPivot().error) &&
('table'==this.pivotView) &&
('none'==this.chartToggle)) {
this.toggleChart();
}
/* JMD1210
if (this.viewType != 'pivot') {
this.viewType = 'pivot';
}
*/
this.adjustSizes(false);
}

self._DeepSee_Component_Widget_pivot_onloadHandler = function() {
if (('chart'==this.pivotView)&&(''!=this.getPivot().error)) {
this.toggleChart();
}
return this.invokeSuper('onloadHandler',arguments); // JSL4419
}

self._DeepSee_Component_Widget_pivot_pivotTableCloseButtonClick = function(navigator,pivot,key) {
}

self._DeepSee_Component_Widget_pivot_pivotTableDataArrange = function(navigator,pivot,key,swap,final) {
}

self._DeepSee_Component_Widget_pivot_pivotTableDataChange = function(navigator,pivot,key,value,final) {
var keyNo = 0;
if (key.toString().indexOf(':')>0) {
var t = key.split(':');
key = t[0];
keyNo = parseInt(t[1]);
}
var t = key.toString().split('-');
t.splice(0,1);
var attr = t[0];
t.splice(0,1);
var k2 = t.join('-');
var object = pivot;
switch (attr) {
case 'showZebra':
case 'showRowCaption':
case 'rowTotals':
case 'columnTotals':
case 'rowTotalAgg':
case 'rowTotalSource':
case 'columnTotalAgg':
case 'cellWidth':
case 'cellHeight':
case 'showEmptyRows':
case 'showEmptyColumns':
case 'rowLabelSpan':
case 'columnLabelSpan':
default:
object.setProperty(attr,value);
if (final) {
object.executeQuery(true);
}
break;
case 'table':
switch (k2) {
case 'background':
var dragGroup = document.getElementById(this.id);
dragGroup.style.backgroundColor = value;
this.setProperty('backgroundColor', value);
break;
case 'opacity': // JSL4483
this.opacity = value;
if (value < 1.0) {
this.setProperty('opacity', value);
this.setBkgOpacity(value);
} else {
}
break;
}
break;
case 'evenRowStyle':
case 'rowHeaderStyle':
case 'columnHeaderStyle':
case 'cellStyle':
var style = zenGet(object[attr]);
switch(k2) {
case 'color':
case 'background':
case 'font-family':
case 'opacity':
case 'displayed':
case 'text-align':
style = navigator.setStyleIntoCSS(style,k2,value);
break;
case 'textStyle':
var styleValues = {};
var cv = value.toString().split(',');
for (var n = 0; n < cv.length; n++) {
styleValues[cv[n]] = true;
}
var list = ['bold','underline','italic','smallCaps','shadow'];
for (var n = 0; n < list.length; n++) {
style = navigator.setStyleIntoCSS(style,list[n],styleValues[list[n]]?true:false);
}
break;
case 'border-radius':
case 'font-size':
case 'padding':
case 'margin':
case 'top':
case 'left':
case 'height':
case 'width':
value = value!=='' ? value+'px' : value;
style = navigator.setStyleIntoCSS(zenGet(style),k2,value);
break;
}
object.setProperty(attr,style);
if (final) {
object.executeQuery(true);
}
break;
}
}

self._DeepSee_Component_Widget_pivot_pivotTableGetContentForLevel = function(navigator,pivot,level,key,value) {
var title = $$$Text('Pivot Table Options','%DeepSee');
var content = { title: title, items:[] };
var widgetDef = this.getDefinition(); // JSL4483
var keyNo = '';
if (key.toString().indexOf(':')>0) {
var t = key.split(':');
key = t[0];
keyNo = parseInt(t[1]);
}
var t = key.toString().split('-');
t.splice(0,1);
var attr = t.join('-');
switch (key) {
case 'pivot-PivotSettings':
content.items[content.items.length] = {display:'caption', caption:$$$Text('Size &amp; Appearance','%DeepSee'), action:'drill', key:'pivot-PivotTableSize'};
content.items[content.items.length] = {display:'caption', caption:$$$Text('Colors &amp; Style','%DeepSee'), action:'drill', key:'pivot-PivotTableColors'};
break;
case 'pivot-PivotTableSize':
title = $$$Text('Size and Appearance','%DeepSee');
var aggregateLabels = {'sum':$$$Text('Sum','%DeepSee'),
'count':$$$Text('Count','%DeepSee'),
'avg':$$$Text('Average','%DeepSee'),
'min':$$$Text('Min','%DeepSee'),
'max':$$$Text('Max','%DeepSee'),
'pct':$$$Text('Percentage','%DeepSee')};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Cell Width','%DeepSee'), edit:'string', value:zenGet(pivot.cellWidth),  key:'pivot-cellWidth'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Cell Height','%DeepSee'), edit:'string', value:zenGet(pivot.cellHeight),  key:'pivot-cellHeight'};
content.items[content.items.length] = {display:'section', caption:$$$Text('Rows','%DeepSee')};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Show Empty','%DeepSee'), edit:'switch', value:zenGet(pivot.showEmptyRows),  key:'pivot-showEmptyRows'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Span Labels','%DeepSee'), edit:'switch', value:zenGet(pivot.rowLabelSpan),  key:'pivot-rowLabelSpan'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Row Totals','%DeepSee'), edit:'switch', value:zenGet(pivot.rowTotals),  key:'pivot-rowTotals'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Row Summary','%DeepSee'), action:'drill', value:aggregateLabels[zenGet(pivot.rowTotalAgg)],  key:'pivot-rowTotalAgg'};			// DTB124 - show value from localized list
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Sum Over','%DeepSee'), edit:'choice', value:zenGet(pivot.rowTotalSource),  key:'pivot-rowTotalSource', valueList:'page,all', displayList:$$$Text('Page,All Rows','%DeepSee')};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Row Caption','%DeepSee'), edit:'switch', value:zenGet(pivot.showRowCaption),  key:'pivot-showRowCaption'};
content.items[content.items.length] = {display:'section', caption:$$$Text('Columns','%DeepSee')};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Show Empty','%DeepSee'), edit:'switch', value:zenGet(pivot.showEmptyColumns),  key:'pivot-showEmptyColumns'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Span Labels','%DeepSee'), edit:'switch', value:zenGet(pivot.columnLabelSpan),  key:'pivot-columnLabelSpan'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Column Totals','%DeepSee'), edit:'switch', value:zenGet(pivot.columnTotals),  key:'pivot-columnTotals'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Column Summary','%DeepSee'), action:'drill', value:aggregateLabels[zenGet(pivot.columnTotalAgg)],  key:'pivot-columnTotalAgg'};	// DTB124 - show value from localized list
break;
case 'pivot-rowTotalAgg':
case 'pivot-columnTotalAgg':
title = $$$Text('Summary','%DeepSee');
var list = [
{ caption:$$$Text('Sum','%DeepSee'), value:'sum', hint:$$$Text('Show the sum of the values','%DeepSee')},
{ caption:$$$Text('Count','%DeepSee'), value:'count', hint:$$$Text('Show the number of values','%DeepSee')},
{ caption:$$$Text('Average','%DeepSee'), value:'avg', hint:$$$Text('Show the average of the values','%DeepSee')},
{ caption:$$$Text('Min','%DeepSee'), value:'min', hint:$$$Text('Show the smallest of the values','%DeepSee')},
{ caption:$$$Text('Max','%DeepSee'), value:'max', hint:$$$Text('Show the largest of the values','%DeepSee')},
{ caption:$$$Text('Percentage','%DeepSee'), value:'pct', hint:$$$Text('Show the percentage total of the values','%DeepSee')},
];
content.html = navigator.getChooserListHTML(list,key,zenGet(pivot[attr]),$$$Text('Summary','%DeepSee'),$$$Text('The Summary setting defines how to display row and column totals','%DeepSee'));
break;
case 'pivot-PivotTableColors':
title = $$$Text('Colors and Style','%DeepSee');
var which = key; // JSL4483
var idx = ''; // JSL4483
var background = this.backgroundColor; // JSL4483
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Cell Style','%DeepSee'), action:'drill', value:zenGet(pivot.cellStyle),	key:'pivot-cellStyle', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Row Style','%DeepSee'), action:'drill', value:zenGet(pivot.rowHeaderStyle),	key:'pivot-rowHeaderStyle', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Column Style','%DeepSee'), action:'drill', value:zenGet(pivot.columnHeaderStyle),	key:'pivot-columnHeaderStyle', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Stripes','%DeepSee'), edit:'switch', value:zenGet(pivot.showZebra),  key:'pivot-showZebra'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Stripe Style','%DeepSee'), action:'drill', value:zenGet(pivot.evenRowStyle),	key:'pivot-evenRowStyle', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Background','%DeepSee'), action:'drill', value:'',	key:'pivot-table-background'+idx, valueStyle:'width:80px;border-radius:5px;border:1px solid #B0B0B0;background:'+background+';'}; // JSL4483
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Opacity','%DeepSee'), edit:'slider', value:this.opacity,	key:'pivot-table-opacity'+idx, minValue:0, maxValue:1}; // JSL4483
break;
case 'pivot-evenRowStyle':
case 'pivot-rowHeaderStyle':
case 'pivot-columnHeaderStyle':
case 'pivot-cellStyle':
title = $$$Text('Style','%DeepSee');
var style = zenGet(pivot[attr]);
var info = navigator.parseStyle(style);
var color = info.color;
var background = info.backgroundColor;
var fontFamily = info.fontFamily;
var fontSize = info.fontSize;
var align = zenGet(info.textAlign);
var fs = [];
if (info.bold) { fs[fs.length] = 'bold'; }
if (info.underline) { fs[fs.length] = 'underline'; }
if (info.italic) { fs[fs.length] = 'italic'; }
if (info.smallCaps) { fs[fs.length] = 'smallCaps'; }
if (info.shadow) { fs[fs.length] = 'shadow'; }
var fontStyle = fs.join(',');
var opacity = zenGet(info.opacity);
opacity = opacity === '' ? 1.0 : opacity;
var which = key;
var idx = '';
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Color','%DeepSee'), action:'drill', value:'',	key:which+'-color'+idx, valueStyle:'width:80px;border-radius:5px;border:1px solid #B0B0B0;background:'+color+';'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Background','%DeepSee'), action:'drill', value:'',	key:which+'-background'+idx, valueStyle:'width:80px;border-radius:5px;border:1px solid #B0B0B0;background:'+background+';'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Font','%DeepSee'), action:'drill', value:fontFamily,	key:which+'-font-family'+idx, valueStyle:'font-size:13px;font-family:'+fontFamily+';'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Font Size','%DeepSee'), edit:'slider-toggle', value:fontSize,	key:which+'-font-size'+idx, minValue:2, maxValue:75, stepSize:1};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Text Style','%DeepSee'), edit:'choice-multi', value:fontStyle,	key:which+'-textStyle'+idx, valueList:'bold,italic,underline,smallCaps,shadow', displayList:'B,I,U,Cc,S', valueStyle:'font-size:12px;font-family:times new roman;',  choiceStyles:'font-weight:900;^font-style:italic;^text-decoration:underline;^font-variant:small-caps;^text-shadow:1px 1px 2px #F0F0F0;'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Align','%DeepSee'), edit:'choice', value:align,	key:which+'-text-align'+idx, valueList:'left,center,right', displayList:'&#9664;,&#9632;,&#9654;'};
break;
case 'pivot-evenRowStyle-color':
case 'pivot-rowHeaderStyle-color':
case 'pivot-columnHeaderStyle-color':
case 'pivot-cellStyle-color':
var t = key.toString().split('-');
var which = t[1];
title = $$$Text('Color','%DeepSee');
content.html = navigator.getColorChooserHTML(key,value,'html');
break;
case 'pivot-evenRowStyle-background':
case 'pivot-rowHeaderStyle-background':
case 'pivot-columnHeaderStyle-background':
case 'pivot-cellStyle-background':
var t = key.toString().split('-');
var which = t[1];
title = $$$Text('Background','%DeepSee');
content.html = navigator.getColorChooserHTML(key,value,'html');
break;
case 'pivot-table-background':
var t = key.toString().split('-');
var which = t[1];
title = $$$Text('Background','%DeepSee');
content.html = navigator.getColorChooserHTML(key,value,'html');
break;
case 'pivot-evenRowStyle-font-family':
case 'pivot-rowHeaderStyle-font-family':
case 'pivot-columnHeaderStyle-font-family':
case 'pivot-cellStyle-font-family':
var t = key.toString().split('-');
var which = t[1];
title = $$$Text('Font','%DeepSee');
content.html = navigator.getFontChooserHTML(which+'-font-family',value);
break;
}
content.title = title;
return content;
}

self._DeepSee_Component_Widget_pivot_pivotTableHeaderButtonClick = function(navigator,pivot,key) {
switch(key) {
default:
break;
}
}

self._DeepSee_Component_Widget_pivot_realCellClickHandler = function() {
var pivot = this._targetPivot;
pivot.hideMessage();
this.currItemNo = '';
this.currSeriesNo = '';
this.currFilterSpec = '';
var controller = this.getDataController();
if (pivot.selectedRange && '' !== pivot.selectedRange) {
var p = pivot.selectedRange.toString().split(',');
this.currItemNo = (null!=p[0]) ? parseInt(p[0]) : '';
this.currSeriesNo = (null!=p[1]) ? parseInt(p[1]) : '';
this.currFilterSpec = controller.getFilterForCells(p[0],p[1],p[2],p[3],zenGet(p[4]),zenGet(p[5]));
}
this.currValueName = 'Value';
this.currValue = '';
if (p && controller && controller.getValueName) {
this.currValueName = controller.getValueName();
var data = controller.getDataAsArrays();
if (data && null != data[p[1]-1]) {
this.currValue = data[p[1]-1][p[0]-1];
}
}
this.updateControlState();
this.raiseEventHandler('click');
}

self._DeepSee_Component_Widget_pivot_resetOverrides = function(themeOnly,recreate) {
themeOnly = zenGet(themeOnly,false);
recreate = zenGet(recreate,true);
var def = this.getDefinition();
if (def && def.overrides) {
for (var p in def.overrides) {
delete def.overrides[p];
}
if (themeOnly) {
var chart = this.findComponent('svgChart');
var cls = this.getSubtypeClass();
if (chart && cls!='') {
var widgetDef = def;
var skip = this.getOverrideSkipList('chart');
if (widgetDef.themeOverrides['chart']) {
var themeObj = ZLM.jsonParse(widgetDef.themeOverrides['chart']);
if (themeObj) {
for (var p in themeObj) {
if (chart[p]==themeObj[p]) {
skip[p] = true;
}
}
}
}
var jsonOver = this.componentToJSON(chart,0,skip);
widgetDef.overrides[cls] = jsonOver;
}
}
if (recreate && zenPage.recreateWidget) {
zenPage.recreateWidget(this.widgetKey);
}
}
}

self._DeepSee_Component_Widget_pivot_resetPivot = function() {
var pivot = this.findComponent('table');
if (pivot) {
pivot.popState();
}
}

self._DeepSee_Component_Widget_pivot_setBkgOpacity = function(opacity) {
if (typeof(opacity) == 'undefined') {
opacity = 1.0;
}
var dragGroup = document.getElementById(this.id);
if (dragGroup) {
var backgroundColor = this.backgroundColor; // JSL4483
if (backgroundColor) {
var rgba = ZLM.convertColorToRGBA(backgroundColor,opacity);
dragGroup.style.backgroundColor = 'rgba('+rgba+')';
} else {
dragGroup.style.backgroundColor = 'rgba(255,255,255,'+opacity+')';
}
}
}

self._DeepSee_Component_Widget_pivot_setProperty = function(property,value,value2) {
var widgetDef = this.getDefinition(); // JSL4483
if (this.pivotView != 'table') {
return this.invokeSuper('setProperty',arguments); // not a pivot table but a chart, use widget setProperty
} else {
}
switch(property) {
case 'opacity':
if (widgetDef) {
widgetDef.opacity = value; // JSL4483
}
this.opacity = value // JSL4483 for pivots
this.setBkgOpacity(value);	// JSL4483
break;
case 'backgroundColor':
if (widgetDef) {
widgetDef.backgroundColor = value; // JSL4483
}
this.backgroundColor = value; // JSL4483
this.setBkgOpacity(this.opacity);
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._DeepSee_Component_Widget_pivot_showBreakdown = function(analysisClass) {
var pivot = this.getDataController();
if ('' == pivot.selectedRange) {
alert($$$Text('Please select a cell to display a breakdown for.','%DeepSee'));
return false;
}
var tWITH = '';
for (var n = 0; n < pivot.calculatedMembers.length; n++) {
var mbr = pivot.calculatedMembers[n];
if (mbr.dimension!='' && mbr.memberName!='') {
var dim = mbr.dimension.toString();
var name = mbr.memberName.toString();
dim = (dim.charAt(0)=='[') ? dim.substr(1,dim.length-2) : dim;
name = (name.charAt(0)=='[') ? name.substr(1,name.length-2) : name;
tWITH += " MEMBER ["+dim+"].["+name+"] AS \'" + mbr.valueExpression + "\'";
}
}
var msr = '';
if (pivot.measures.length > 0) {
msr = pivot.measures[0].spec;
}
var parms = {
CUBE:pivot.cubeName,
KEY:pivot.queryKey,
WITH:tWITH,
MEASURE:msr,
RANGE:pivot.selectedRange
};
if ((analysisClass == null) || (analysisClass == '')) {
zenLaunchPopupWindow('_DeepSee.UI.Dialog.PivotAnalysis.zen','BreakDown','status,scrollbars,resizable=yes,width=800,height=600',parms);
}
else {
zenLaunchPopupWindow(analysisClass,'BreakDown','status,scrollbars,resizable=yes,width=800,height=600',parms);
}
}

self._DeepSee_Component_Widget_pivot_showDimensions = function() {
if (!this.hasDimTree) {
return;
}
var pivot = this.getDataController();
if (!pivot) {
return;
}
if (this.viewType == 'listing' && this.listingView == 'table') {
pivot.setListing('','table');
if (pivot.setDrillThrough(false)) {
this.viewType = 'table'
}
}
this.showDimTree = !this.showDimTree;
this.adjustSizes(false);
this.updateControlState();
}

self._DeepSee_Component_Widget_pivot_showGeoListing = function(listing) {
var pivot = this.getDataController();
if (!pivot) {
return;
}
if (this.viewType == 'listing' && this.listingView == 'map') {
pivot.setListing(listing,'table');
if (pivot.setDrillThrough(false)) {
this.viewType = 'table'
}
}
else {
if (!pivot.canDrillThrough()) {
alert($$$Text('This pivot does not support listings.','%DeepSee'));
return;
}
pivot.setListing(listing,'map');
if (pivot.setDrillThrough(true,true)) {
this.viewType = 'listing'
}
this.listingView = 'map';
}
this.adjustSizes(false);
this.updateControlState();
}

self._DeepSee_Component_Widget_pivot_showListing = function(listing) {
var pivot = this.getDataController();
if (!pivot) {
return;
}
if (this.viewType == 'listing' && this.listingView == 'table') {
pivot.setListing(listing,'table');
if (pivot.setDrillThrough(false)) {
this.viewType = 'table';
}
}
else {
if (!pivot.canDrillThrough()) {
alert($$$Text('This pivot does not support listings.','%DeepSee'));
return;
}
pivot.setListing(listing,'table');
if (pivot.setDrillThrough(true, true)) {
this.viewType = 'listing'
}
this.listingView = 'table';
}
this.adjustSizes(false);
if (zenIsIE && (this.pivotView=='chart')) {
var chart = this.findComponent('svgChart');
if (chart) {
chart.renderContents();
}
}
for (var n = 0; n < this.controlIndices.length; n++) {
var control = zenPage.getComponent(this.controlIndices[n]);
if ((control && ('showListing'==control.name))&&(setTimeout)) {
control.setDisabled(true);
setTimeout(this.componentSetDisabled, 500, control.id, false);		//  DTB841 - Call the new clientMethod
}
}
this.updateControlState();
}

self._DeepSee_Component_Widget_pivot_subtypeIsChart = function(subtype) {
var chartTypes = {
'areaChart':true,
'barChart':true,
'barChartStacked':true,
'bubbleChart':true,
'bullseyeChart':true,
'columnChart':true,
'columnChart3D':true,
'columnChartStacked':true,
'comboChart':true,
'donutChart':true,
'donutChart3D':true,
'hilowChart':true,
'lineChart':true,
'lineChartMarkers':true,
'pieChart':true,
'pieChart3D':true,
'swirlChart':true,
'timeChart':true,
'treeMapChart':true,
'xyChart':true
}
if (chartTypes[subtype]) {
return true;
} else {
return false;
}
}

self._DeepSee_Component_Widget_pivot_toggleChart = function() {
var pivot = this.getDataController();
var svg = this.findComponent('svgFrame');
var chart = this.findComponent('svgChart');
var legend = this.findComponent('chartLegend');
if (this.pivotView == 'chart') {
this.pivotView = 'table';
this.viewType = 'pivot';		// DTB113
pivot.listingType = 'table';	// DTB113
pivot.setDrillThrough(false, true);
}
else {
this.pivotView = 'chart';
this.viewType = 'pivot';
pivot.listingType = 'table';
pivot.setDrillThrough(false, true);
if (chart) {
var range = pivot.selectedRange;
if ('' == range) {
chart.selectElement(-1,-1);
}
else {
var r = range.toString().split(',');
chart.selectElement(parseInt(r[1])-1,parseInt(r[0])-1);
}
}
if (legend) {
self.setTimeout("zenPage.getComponent("+legend.index+").renderContents()",10);
}
}
this.adjustSizes(false);
this.updateControlState();
}

self._DeepSee_Component_Widget_pivot_toggleExportMenu = function(menuId) {
var dropMenu = document.getElementById(menuId);
var trap = document.getElementById("zenMouseTrap");
var widgetHtml = document.getElementById(this.id);
if ((dropMenu) && (dropMenu.style)) {
var dropMenuIcon = dropMenu.previousElementSibling;
if (dropMenu.style.display === "none") {
widgetHtml.style.zIndex = '';
trap.style.zIndex = 100;
trap.style.display = "block";
trap.onmouseup = new Function("if (zenPage.closeModalPending) {zenPage.closeModalPending = 0; zenPage.getComponentById('"+this.id+"').closeExportMenu('"+menuId+"');}")
trap.onmousedown = function() {zenPage.closeModalPending = 1;}
trap.onmouseout = function() {zenPage.closeModalPending = 0;}
trap.onmousemove = null;
dropMenu.style.zIndex = 101;
dropMenu.style.display = "block";
dropMenuIcon.setAttribute("class","dsptIconDropdownSelect");
} else {
this.closeExportMenu(menuId);
}
}
}

self._DeepSee_Component_Widget_pivot_updateControlState = function() {
var pivot = this.getDataController();
for (var n = 0; n < this.controlIndices.length; n++) {
var control = zenPage.getComponent(this.controlIndices[n]);
if (zenPage.activeWhenArray && control && control.aux && zenPage.activeWhenArray[control.aux]) {
var activeWhen = zenPage.activeWhenArray[control.aux];
switch (activeWhen) {
case 'itemSelected':
var isPivot = true;
if (this.viewType != 'pivot' && this.viewType != 'table') {
isPivot = false;
}
control.setDisabled(!isPivot || !pivot.getSelectedRange());
break;
case 'listingSelected':
var isListing = true;
if (this.viewType != 'listing') {
isListing = false;
}
control.setDisabled(!isListing || pivot.getSelectedItems().length==0);
break;
case 'listingSelected1':
var isListing = true;
if (this.viewType != 'listing') {
isListing = false;
}
control.setDisabled(!isListing || pivot.getSelectedItems().length!=1);
break;
default:
control.setDisabled(false);
break;
}
if (control.disabled && control.controlClass == 'dsActionButton') {
control.setProperty('controlClass','dsActionButtonDisabled');
}
else if (!control.disabled && control.controlClass == 'dsActionButtonDisabled') {
control.setProperty('controlClass','dsActionButton');
}
}
if (control && ('showListing'==control.name)) {
var msgShow = $$$Text('Show detail listing','%DeepSee');
var msgHide = $$$Text('Hide detail listing','%DeepSee');
if ((this.viewType == 'listing') && (this.listingView == 'table')) {
setTimeout(this.componentSetDisabled,500, control.id, false);		// DTB841 - Call the new clientMethod
if (control.src=='deepsee/ds2_binoculars_44.png') {
control.setProperty('src','deepsee/ds2_dialpad_44.png');
}
if (!control.title || control.title == msgShow || control.title == msgHide) {
control.setProperty('title',msgHide);
}
}
else {
if (control.src=='deepsee/ds2_dialpad_44.png') {
control.setProperty('src','deepsee/ds2_binoculars_44.png');
}
if (!control.title || control.title == msgShow || control.title == msgHide) {
control.setProperty('title',msgShow);
}
}
}
else if (control && control.name == 'showGeoListing') {
var msgShow = $$$Text('Show map listing','%DeepSee');
var msgHide = $$$Text('Hide map listing','%DeepSee');
if (this.viewType == 'listing' && this.listingView == 'map') {
control.setProperty('src','deepsee/ds2_dialpad_44.png');
if (!control.title || control.title == msgShow || control.title == msgHide) {
control.setProperty('title',msgHide);
}
}
else {
control.setProperty('src','deepsee/ds2_planet_44.png');
if (!control.title || control.title == msgShow || control.title == msgHide) {
control.setProperty('title',msgShow);
}
}
}
}
var toggle = zen(this.id + '_chartToggle');
if (toggle) {
if (this.pivotView == 'chart') {
toggle.setProperty('src','deepsee/ds2_list_44.png');
}
else {
toggle.setProperty('src','deepsee/ds2_linechart_44.png');
}
}
var toggle = zen(this.id + '_showDimensions');
if (toggle) {
if (this.pivotView == 'chart') {
toggle.setProperty('controlStyle','opacity:0.5;');
}
else {
toggle.setProperty('controlStyle','');
}
}
var dd = zen(this.id + '_drillDown');
if (dd) {
dd.render();
}
}

self._DeepSee_Component_Widget_pivot_GenerateXSLFO = function(pWidgetID,pUrl,pMode,pFileName) {
	return zenInstanceMethod(this,'GenerateXSLFO','L,L,L,L','STATUS',arguments);
}

self._DeepSee_Component_Widget_pivot_GetKpiFilterCaption = function(pKPIName,pSpec) {
	return zenClassMethod(this,'GetKpiFilterCaption','L,L','VARCHAR',arguments);
}

self._DeepSee_Component_Widget_pivot_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}

self._DeepSee_Component_Widget_pivot_ResolveText = function(pEncodedText) {
	return zenInstanceMethod(this,'ResolveText','L','VARCHAR',arguments);
}
self._DeepSee_Component_Widget_pivot__Loader = function() {
	zenLoadClass('_DeepSee_Component_Widget_widget');
	_DeepSee_Component_Widget_pivot.prototype = zenCreate('_DeepSee_Component_Widget_widget',-1);
	var p = _DeepSee_Component_Widget_pivot.prototype;
	if (null==p) {return;}
	p.constructor = _DeepSee_Component_Widget_pivot;
	p.superClass = ('undefined' == typeof _DeepSee_Component_Widget_widget) ? zenMaster._DeepSee_Component_Widget_widget.prototype:_DeepSee_Component_Widget_widget.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%DeepSee.Component.Widget.pivot';
	p._type = 'pivot';
	p.serialize = _DeepSee_Component_Widget_pivot_serialize;
	p.getSettings = _DeepSee_Component_Widget_pivot_getSettings;
	p.GenerateXSLFO = _DeepSee_Component_Widget_pivot_GenerateXSLFO;
	p.GetKpiFilterCaption = _DeepSee_Component_Widget_pivot_GetKpiFilterCaption;
	p.ReallyRefreshContents = _DeepSee_Component_Widget_pivot_ReallyRefreshContents;
	p.ResolveText = _DeepSee_Component_Widget_pivot_ResolveText;
	p.adjustContentSize = _DeepSee_Component_Widget_pivot_adjustContentSize;
	p.applySetting = _DeepSee_Component_Widget_pivot_applySetting;
	p.cellClickHandler = _DeepSee_Component_Widget_pivot_cellClickHandler;
	p.changeChartType = _DeepSee_Component_Widget_pivot_changeChartType;
	p.chartClickHandler = _DeepSee_Component_Widget_pivot_chartClickHandler;
	p.chartCloseButtonClick = _DeepSee_Component_Widget_pivot_chartCloseButtonClick;
	p.chartCreateLength = _DeepSee_Component_Widget_pivot_chartCreateLength;
	p.chartDataArrange = _DeepSee_Component_Widget_pivot_chartDataArrange;
	p.chartDataChange = _DeepSee_Component_Widget_pivot_chartDataChange;
	p.chartGetContentForLevel = _DeepSee_Component_Widget_pivot_chartGetContentForLevel;
	p.chartGetSeriesColor = _DeepSee_Component_Widget_pivot_chartGetSeriesColor;
	p.chartGetSeriesColorsAsString = _DeepSee_Component_Widget_pivot_chartGetSeriesColorsAsString;
	p.chartHeaderButtonClick = _DeepSee_Component_Widget_pivot_chartHeaderButtonClick;
	p.chartParseColorList = _DeepSee_Component_Widget_pivot_chartParseColorList;
	p.chartParseLength = _DeepSee_Component_Widget_pivot_chartParseLength;
	p.chartRangeChange = _DeepSee_Component_Widget_pivot_chartRangeChange;
	p.chartRenderHandler = _DeepSee_Component_Widget_pivot_chartRenderHandler;
	p.chartSetChartType = _DeepSee_Component_Widget_pivot_chartSetChartType;
	p.closeExportMenu = _DeepSee_Component_Widget_pivot_closeExportMenu;
	p.componentSetDisabled = _DeepSee_Component_Widget_pivot_componentSetDisabled;
	p.drillHandler = _DeepSee_Component_Widget_pivot_drillHandler;
	p.executeDrillDown = _DeepSee_Component_Widget_pivot_executeDrillDown;
	p.executeDrillUp = _DeepSee_Component_Widget_pivot_executeDrillUp;
	p.exportCSV = _DeepSee_Component_Widget_pivot_exportCSV;
	p.exportExcel = _DeepSee_Component_Widget_pivot_exportExcel;
	p.exportPDF = _DeepSee_Component_Widget_pivot_exportPDF;
	p.getDataController = _DeepSee_Component_Widget_pivot_getDataController;
	p.getOverrides = _DeepSee_Component_Widget_pivot_getOverrides;
	p.getParameterValue = _DeepSee_Component_Widget_pivot_getParameterValue;
	p.getPivot = _DeepSee_Component_Widget_pivot_getPivot;
	p.getPivotVariableState = _DeepSee_Component_Widget_pivot_getPivotVariableState;
	p.getSubtypeClass = _DeepSee_Component_Widget_pivot_getSubtypeClass;
	p.hasOverrides = _DeepSee_Component_Widget_pivot_hasOverrides;
	p.listingSelectHandler = _DeepSee_Component_Widget_pivot_listingSelectHandler;
	p.markerClicked = _DeepSee_Component_Widget_pivot_markerClicked;
	p.navCloseButtonClick = _DeepSee_Component_Widget_pivot_navCloseButtonClick;
	p.navDataChange = _DeepSee_Component_Widget_pivot_navDataChange;
	p.navGetContentForLevel = _DeepSee_Component_Widget_pivot_navGetContentForLevel;
	p.navHeaderButtonClick = _DeepSee_Component_Widget_pivot_navHeaderButtonClick;
	p.navPopupAction = _DeepSee_Component_Widget_pivot_navPopupAction;
	p.onApplyFilters = _DeepSee_Component_Widget_pivot_onApplyFilters;
	p.onloadHandler = _DeepSee_Component_Widget_pivot_onloadHandler;
	p.pivotTableCloseButtonClick = _DeepSee_Component_Widget_pivot_pivotTableCloseButtonClick;
	p.pivotTableDataArrange = _DeepSee_Component_Widget_pivot_pivotTableDataArrange;
	p.pivotTableDataChange = _DeepSee_Component_Widget_pivot_pivotTableDataChange;
	p.pivotTableGetContentForLevel = _DeepSee_Component_Widget_pivot_pivotTableGetContentForLevel;
	p.pivotTableHeaderButtonClick = _DeepSee_Component_Widget_pivot_pivotTableHeaderButtonClick;
	p.realCellClickHandler = _DeepSee_Component_Widget_pivot_realCellClickHandler;
	p.resetOverrides = _DeepSee_Component_Widget_pivot_resetOverrides;
	p.resetPivot = _DeepSee_Component_Widget_pivot_resetPivot;
	p.setBkgOpacity = _DeepSee_Component_Widget_pivot_setBkgOpacity;
	p.setProperty = _DeepSee_Component_Widget_pivot_setProperty;
	p.showBreakdown = _DeepSee_Component_Widget_pivot_showBreakdown;
	p.showDimensions = _DeepSee_Component_Widget_pivot_showDimensions;
	p.showGeoListing = _DeepSee_Component_Widget_pivot_showGeoListing;
	p.showListing = _DeepSee_Component_Widget_pivot_showListing;
	p.subtypeIsChart = _DeepSee_Component_Widget_pivot_subtypeIsChart;
	p.toggleChart = _DeepSee_Component_Widget_pivot_toggleChart;
	p.toggleExportMenu = _DeepSee_Component_Widget_pivot_toggleExportMenu;
	p.updateControlState = _DeepSee_Component_Widget_pivot_updateControlState;
}

self._zenClassIdx['http://www.intersystems.com/deepsee/portlet'] = '_DeepSee_Component_Widget_portlet';
self._DeepSee_Component_Widget_portlet = function(index,id) {
	if (index>=0) {_DeepSee_Component_Widget_portlet__init(this,index,id);}
}

self._DeepSee_Component_Widget_portlet__init = function(o,index,id) {
	('undefined' == typeof _DeepSee_Component_Widget_widget__init) ?zenMaster._DeepSee_Component_Widget_widget__init(o,index,id):_DeepSee_Component_Widget_widget__init(o,index,id);
	o.opacity = '1';
	o.opacityToolbar = '1';
}
function _DeepSee_Component_Widget_portlet_serialize(set,s)
{
	var o = this;s[0]='1822821506';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.backgroundColor;s[9]=o.cellAlign;s[10]=o.cellSize;s[11]=o.cellStyle;s[12]=o.cellVAlign;s[13]=(o.centerHeader?1:0);s[14]=set.serializeList(o,o.children,true,'children');s[15]=set.serializeList(o,o.clickActions,false,'clickActions');s[16]=set.serializeList(o,o.clickActive,false,'clickActive');s[17]=o.clickFilterSpec;s[18]=set.serializeList(o,o.clickTargetProperties,false,'clickTargetProperties');s[19]=set.serializeList(o,o.clickTargets,false,'clickTargets');s[20]=o.colSpan;s[21]=o.colorToolbar;s[22]=o.containerStyle;s[23]=set.serializeList(o,o.controlIndices,false,'controlIndices');s[24]=o.currFilterSpec;s[25]=o.currItemNo;s[26]=o.currSeriesNo;s[27]=o.currValue;s[28]=o.currValueName;s[29]=o.dataSource;s[30]=(o.disabled?1:0);s[31]=(o.dragEnabled?1:0);s[32]=(o.dropEnabled?1:0);s[33]=(o.dynamic?1:0);s[34]=o.enclosingClass;s[35]=o.enclosingStyle;s[36]=o.error;s[37]=set.serializeArray(o,o.filterDefault,false,'filterDefault');s[38]=set.serializeArray(o,o.filterState,false,'filterState');s[39]=set.serializeArray(o,o.filterText,false,'filterText');s[40]=(o.forceToolbar?1:0);s[41]=o.groupClass;s[42]=o.groupStyle;s[43]=(o.hasInitialFilters?1:0);s[44]=o.header;s[45]=o.headerLayout;s[46]=o.height;s[47]=(o.hidden?1:0);s[48]=o.hint;s[49]=o.hintClass;s[50]=o.hintStyle;s[51]=o.homeCol;s[52]=o.homeRow;s[53]=o.imageAppLogo;s[54]=o.imageAppLogoWidth;s[55]=o.imageClose;s[56]=o.imageCloseHover;s[57]=o.imageCloseWidth;s[58]=o.imageContract;s[59]=o.imageContractHover;s[60]=o.imageContractWidth;s[61]=o.imageExpand;s[62]=o.imageExpandHover;s[63]=o.imageExpandWidth;s[64]=o.imageMaximize;s[65]=o.imageMaximizeHover;s[66]=o.imageMaximizeWidth;s[67]=o.imageMinimize;s[68]=o.imageMinimizeHover;s[69]=o.imageMinimizeWidth;s[70]=o.imageResize;s[71]=o.imageResizeSize;s[72]=(o.isClosed?1:0);s[73]=o.label;s[74]=o.labelClass;s[75]=o.labelDisabledClass;s[76]=o.labelPosition;s[77]=o.labelStyle;s[78]=o.layout;s[79]=o.linkWidgetKey;s[80]=(o.maximized?1:0);s[81]=o.minWidth;s[82]=(o.moveEnabled?1:0);s[83]=o.onafterdrag;s[84]=o.onbeforedrag;s[85]=o.onclick;s[86]=o.onclosepending;s[87]=o.ondrag;s[88]=o.ondrop;s[89]=o.onhide;s[90]=o.onrefresh;s[91]=o.onresize;s[92]=o.onshow;s[93]=o.onupdate;s[94]=o.onwindowdrop;s[95]=o.onwindowgrab;s[96]=o.opacity;s[97]=o.opacityToolbar;s[98]=o.overlayMode;s[99]=o.prevHomeCol;s[100]=o.prevHomeRow;s[101]=(o.previewMode?1:0);s[102]=o.renderFlag;s[103]=(o.resizeEnabled?1:0);s[104]=o.rowSpan;s[105]=o.sessionCookie;s[106]=set.serializeArray(o,o.settings,false,'settings');s[107]=(o.showLabel?1:0);s[108]=(o.showSidebar?1:0);s[109]=(o.showToolbar?1:0);s[110]=(o.showToolbarBottomBorder?1:0);s[111]=(o.showToolbarOnlyWhenMaximized?1:0);s[112]=o.sidebarContent;s[113]=o.sidebarWidth;s[114]=o.slice;s[115]=o.subtype;s[116]=o.title;s[117]=o.tuple;s[118]=o.valign;s[119]=(o.visible?1:0);s[120]=o.widgetKey;s[121]=o.widgetLayout;s[122]=o.width;
}
function _DeepSee_Component_Widget_portlet_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._DeepSee_Component_Widget_portlet_adjustContentSize = function(load,width,height) {
var portlet = this.findComponent('portlet');
if (portlet) {
var portletDiv = portlet.getEnclosingDiv();
portletDiv.style.width = width-10 + 'px';
portletDiv.style.height = height + 'px';
if (portlet.adjustContentSize) {
portlet.adjustContentSize(load,width,height);
}
}
}

self._DeepSee_Component_Widget_portlet_exportExcel = function() {
var table = this.getDataController();
var widgetDef = this.getDefinition();
if (table && widgetDef) { // JSL4455 - use dashboard filter label name if available
for (m=0; m < widgetDef.controls.length; m++) {
var control = widgetDef.controls[m];
if (control.action == 'applyFilter')  { // at filter control
for (var n = 0; n < table.filters.length; n++) { // walk filters look for a match
var filter = table.filters[n];
if (control.label && control.targetProperty == filter.baseSpec) {
filter._label = control.label;
}
}
}
}
}
if (''!==table.kpi) {
var filterNames = [];
var filterValues = [];
var filterLabels = []; // JSL4455
var fq = '';
for (var n = 0; n < table.filters.length; n++) {
var filter = table.filters[n];
fq += '&FILTER='+encodeURIComponent(filter.spec)+':'+encodeURIComponent(filter.value);
if (filter.text!='') {
filterNames[filterNames.length] = filter.spec;
var val = filter.text.toString();
if ('&'==val.charAt(0)) {
val = val.substring(2,val.length-1);
}
filterValues[filterValues.length] = val;
filterLabels[filterLabels.length] = filter._label; // JSL4455
}
}
for (prop in table.pivotVariables) { // JSL4376
filterNames[filterNames.length]= prop;
filterValues[filterValues.length] = table.pivotVariables[prop];
}
var cl = '';
if (table.columnList!=='') {
cl = '&COLUMNLIST=' + encodeURIComponent(table.columnList);
}
var url = zenLink('_DeepSee.UI.MDXExcel.zen?KPI=' + encodeURIComponent(table.kpi) + '&SOURCE='+ encodeURIComponent(table.dataSourceName) + fq + cl);
if (filterNames.length > 0) {
url += '&FILTERNAMES='+zenPage.CreateParameterNonce(filterNames.join('\n')); //APV017
url += '&FILTERVALUES='+zenPage.CreateParameterNonce(filterValues.join('\n')); //APV017
url += '&FILTERLABELS='+encodeURIComponent(filterLabels.join('\n')); // JSL4455
}
var title = table.printTitle;
var subtitle = table.printSubtitle;
if (title=='') {
title = widgetDef.title;
}
url += '&TITLE='+encodeURIComponent(title);
url += '&SUBTITLE='+encodeURIComponent(subtitle);
if (table.isDrillThrough) {
url += '&LISTING=1';
url += '&SELECTEDRANGE='+encodeURIComponent(table.getSelectedRange());
url += '&SELECTEDITEMS='+encodeURIComponent(table.getSelectedItems());
url += '&LISTINGSORTCOLUMN='+encodeURIComponent(table.listingSortColumn);
url += '&LISTINGSORTDIR='+encodeURIComponent(table.listingSortDir);
}
window.open(url,'excel','');
}
else if ((''!=table.cubeName) && (''!=table.queryKey)) {
var filterNames = [];
var filterValues = [];
var filterLabels = []; // JSL4455
table.getFilterInfo(filterNames, filterValues);
for (var n = 0; n < table.filters.length; n++) { // JSL4455
var filter = table.filters[n];
filterLabels[filterLabels.length] = filter._label; // JSL4455
}
for (prop in table.pivotVariables) { // JSL4376
filterNames[filterNames.length]= prop;
filterValues[filterValues.length] = table.pivotVariables[prop];
}
var nonce = '';
var mdx = table.GetCurrentQueryText("resolved");  // WAL075 -- use getter method
if (mdx.toString().length > 500) {
nonce = zenPage.CreateQueryNonce(mdx);
if (nonce.toString().indexOf('ERROR:')>=0) {
alert(nonce);
return;
}
}
if (nonce) {
var url = '_DeepSee.UI.MDXExcel.zen?NONCE=' + encodeURIComponent(nonce);
}
else {
var url = '_DeepSee.UI.MDXExcel.zen?MDX=' + encodeURIComponent(mdx);
}
if (table.listing!='') {
url += '&LISTINGNAME='+encodeURIComponent(table.listing);
}
if (table.rowTotals) {
url += '&ROWTOTALS=1';
}
if (table.columnTotals) {
url += '&COLUMNTOTALS=1';
}
if (table.rowTotalAgg!='') {
url += '&ROWTOTALAGG=' + table.rowTotalAgg;
}
if (table.columnTotalAgg!='') {
url += '&COLUMNTOTALAGG=' + table.columnTotalAgg;
}
if (filterNames.length > 0) {
url += '&FILTERNAMES='+zenPage.CreateParameterNonce(filterNames.join('\n')); //APV017
url += '&FILTERVALUES='+zenPage.CreateParameterNonce(filterValues.join('\n')); //APV017
url += '&FILTERLABELS='+encodeURIComponent(filterLabels.join('\n')); // JSL4455
}
var title = table.printTitle;
var subtitle = table.printSubtitle;
if (title=='') {
title = widgetDef.title;
}
url += '&TITLE='+encodeURIComponent(title);
url += '&SUBTITLE='+encodeURIComponent(subtitle);
window.open(url,'excel','');
}
}

self._DeepSee_Component_Widget_portlet_exportPDF = function() {
var url = '';
var parms = {};
var filters = [];
var table = this.getDataController();
var widgetDef = this.getDefinition();
if (''!==table.kpi) {
var filterNames = [];
var filterValues = [];
for (var n = 0; n < table.filters.length; n++) {
var filter = table.filters[n];
filters[filters.length] = encodeURIComponent(filter.spec)+':'+encodeURIComponent(filter.value);
if (filter.text!='') {
filterNames[filterNames.length] = filter.spec;
var val = filter.text.toString();
if ('&'==val.charAt(0)) {
val = val.substring(2,val.length-1);
}
filterValues[filterValues.length] = val;
}
}
for (prop in table.pivotVariables) { // JSL4376
filterNames[filterNames.length]= prop;
filterValues[filterValues.length] = table.pivotVariables[prop];
}
if (table.columnList!=='') {
parms.COLUMNLIST = table.columnList;
}
url = '_DeepSee.UI.MDXPDF.zen'
parms.KPI = table.kpi;
parms.SOURCE = table.dataSourceName;
if (filterNames.length > 0) {
parms.FILTERNAMES = zenPage.CreateParameterNonce(filterNames.join('\n')); //APV017
parms.FILTERVALUES = zenPage.CreateParameterNonce(filterValues.join('\n')); //APV017
}
if (table.isDrillThrough) {
url += '?LISTING=1';
}
}
else if ((''!=table.cubeName) && (''!=table.queryKey)) {
var filterNames = [];
var filterValues = [];
table.getFilterInfo(filterNames, filterValues);
var mdx = table.GetCurrentQueryText("resolved");  // WAL075 -- use getter method
var nonce = '';
if (mdx.toString().length > 10) {
nonce = zenPage.CreateQueryNonce(mdx);
if (nonce.toString().indexOf('ERROR:')>=0) {
alert(nonce);
return;
}
}
if (nonce) {
parms.NONCE = nonce;
}
else {
parms.MDX = mdx;
}
url = '_DeepSee.UI.MDXPDF.zen';
if (table.rowTotals) {
parms.ROWTOTALS = 1;
parms.ROWTOTALAGG = table.columnTotalAgg;
}
if (table.columnTotals) {
parms.COLUMNTOTALS = 1;
parms.COLUMNTOTALAGG = table.rowTotalAgg;
}
if (table.listing!='') {
parms.LISTINGNAME = table.listing;
}
if (filterNames.length > 0) {
parms.FILTERNAMES = zenPage.CreateParameterNonce(filterNames.join('\n')); //APV017
parms.FILTERVALUES = zenPage.CreateParameterNonce(filterValues.join('\n')); //APV017
}
var div = this.findComponent('test').getEnclosingDiv();
var style = table.columnHeaderStyle;
if (style!='') {
div.style.cssText = style;
var bg = div.style.backgroundColor != '' ? 'background-color:'+div.style.backgroundColor+';' : '';
parms.COLUMNSTYLE = style + bg;
}
var style = table.rowHeaderStyle;
if (style!='') {
div.style.cssText = style;
var bg = div.style.backgroundColor != '' ? 'background-color:'+div.style.backgroundColor+';' : '';
parms.ROWSTYLE = style + bg;
}
var style = table.cellStyle;
if (style!='') {
div.style.cssText = style;
var bg = div.style.backgroundColor != '' ? 'background-color:'+div.style.backgroundColor+';' : '';
parms.CELLSTYLE = style + bg;
}
}
if (this.pivotView=='chart' && !table.isDrillThrough) {
url = '_DeepSee.UI.ChartPDF.zen';
var chart = this.findComponent('svgChart');
var xml = '';
if (chart) {
chart.controller = table; // JSL4146
var pnonce = '';
pnonce = zenPage.CreateParameterNonce(""+chart.getSeriesNames()); // JSL4146 JSL4171
if (pnonce.toString().indexOf('ERROR:')>=0) {
alert(pnonce);
return;
}
parms.SERIESNAMES = pnonce; // JSL4171
if (this.hasDataColors) {
parms.DATADRIVENSERIESCOLORS = this.chartGetSeriesColorsAsString(chart); // JSL4232 data-driven series colors
}
var oldXTitle = false;
if (chart.xAxis && ''==chart.xAxis.title) {
chart.xAxis.title = chart.getXAxisTitle();
oldXTitle = true;
}
var oldYAxisTitle = [];
var hasLeft = false;
var hasRight = false;
for (var ya = 0; ya < chart.yAxisList.length; ya++) {
var yAxis = chart.yAxisList[ya];
if (yAxis && ''==yAxis.title) {
var which = yAxis.labelPosition=='right'?'right':'left';
if (yAxis.labelPosition=='right') {
if (!hasRight) {
chart.yAxisList[ya].title = chart.getYAxisTitle('right');
oldYAxisTitle[ya] = true;
hasRight = true;
}
}
else {
if (!hasLeft) {
chart.yAxisList[ya].title = chart.getYAxisTitle('left');
oldYAxisTitle[ya] = true;
hasLeft = true;
}
}
}
}
var add = {xAxis:'object', yAxisList:'list'};
var skip = {
controllerId:true, seriesCount:true, seriesSize:true,
onelementClick:true
};
var xml = chart.objectToXML(chart,chart._type,add,skip);
if (oldXTitle) {
chart.xAxis.title = '';
}
for (var ya = 0; ya < chart.yAxisList.length; ya++) {
if (oldYAxisTitle[ya]) {
chart.yAxisList[ya].title = '';
}
}
}
var xnonce = '';
if (xml.toString().length > 10) { // PDF export involves a lot of param and avoiding long URLs is more of a problem
xnonce = zenPage.CreateQueryNonce(xml,'XML');
if (xnonce.toString().indexOf('ERROR:')>=0) {
alert(xnonce);
return;
}
}
if (xnonce) {
parms.XNONCE = xnonce;
}
else {
parms.XML = xml;
}
var legend = this.findComponent('chartLegend');
if (legend) {
parms.LEGENDPOSITION = this.legendPosition; // JSL4163
parms.LEGENDLABELS = legend.legendLabels;
parms.LEGENDTITLE = legend.legendTitle;
var legendLabelArray=parms.LEGENDLABELS.split(",");
parms.LEGENDCOLORS = '';
var sep = "";
for (var i=0; i < legendLabelArray.length; i++) {
parms.LEGENDCOLORS += sep + chart.getSeriesColor(i);
sep = ";"
}
var pnonce = '';
pnonce = zenPage.CreateParameterNonce(""+legend.legendStyle);     // JSL4171
if (pnonce.toString().indexOf('ERROR:')>=0) {
alert(pnonce);
return;
}
parms.LEGENDSTYLE = pnonce; // JSL4171
}
parms.WIDGETTITLE = widgetDef.title // JSL4146
} else {
if (table.isDrillThrough) {
/* JSL4250 */var listingFilters=table.listingFilters.join(",")
var lfArray = [];
for (var n = 0;n < table.listingFilters.length;n++) {
var listingFilter = table.listingFilters[n];
lfArray[lfArray.length] = listingFilter.spec;
}
}
}
if (table) {
parms.TITLE = table.printTitle;
if (parms.TITLE == "") {
if (widgetDef) {
parms.TITLE = widgetDef.title;
}
}
parms.SUBTITLE = table.printSubtitle;
if (table.showZebra) {
parms.ZEBRA = 1;
}
parms.EVENROWSTYLE = table.evenRowStyle; // JSL4280
parms.LABELWIDTH = table.printLabelWidth;
parms.CELLWIDTH = table.printCellWidth;
parms.ROWCAPTION = table.rowCaptionText;
if (table.printPageSize) {
parms.PAGESIZE = table.printPageSize;
}
if (table.printOrientation) {
parms.ORIENTATION = table.printOrientation;
}
if (typeof table.printSubtitleOn) {
parms.PRINTSUBTITLEON = table.printSubtitleOn;
}
if (table.showUser) {
parms.SHOWUSER = table.showUser
}
if (table.maxRows) {
parms.MAXROWS = table.maxRows;
}
if (table.borderLeftCell) {
parms.BORDERLEFTCELL = table.borderLeftCell;
}
if (table.borderRightCell) {
parms.BORDERRIGHTCELL = table.borderRightCell;
}
if (table.borderTopCell) {
parms.BORDERTOPCELL = table.borderTopCell;
}
if (table.borderBottomCell) {
parms.BORDERBOTTOMCELL = table.borderBottomCell;
}
if (table.borderLeftCol) {
parms.BORDERLEFTCOL = table.borderLeftCol;
}
if (table.borderRightCol) {
parms.BORDERRIGHTCOL = table.borderRightCol;
}
if (table.borderTopCol) {
parms.BORDERTOPCOL = table.borderTopCol;
}
if (table.borderBottomCol) {
parms.BORDERBOTTOMCOL = table.borderBottomCol;
}
if (table.borderLeftRow) {
parms.BORDERLEFTROW = table.borderLeftRow;
}
if (table.borderRightRow) {
parms.BORDERRIGHTROW = table.borderRightRow;
}
if (table.borderTopRow) {
parms.BORDERTOPROW = table.borderTopRow;
}
if (table.borderBottomRow) {
parms.BORDERBOTTOMROW = table.borderBottomRow;
}
if (table.showFilters) {
parms.SHOWFILTERS = table.showFilters;
}
if (table.showListingFilters) { // JSL4250
parms.SHOWLISTINGFILTERS = table.showListingFilters;
}
if (table.listingFontSize) { // JSL4279
parms.LISTINGFONTSIZE = table.listingFontSize;
}
if (table.showZebraStripes) { // JSL4256
parms.SHOWZEBRASTRIPES = table.showZebraStripes;
}
if (table.showDate) { // JSL4250
parms.SHOWDATE = table.showDate;
}
if (table.printMarginTop) {
parms.MARGINTOP = table.printMarginTop;
}
if (table.printMarginBottom) {
parms.MARGINBOTTOM = table.printMarginBottom;
}
if (table.printMarginLeft) {
parms.MARGINLEFT = table.printMarginLeft;
}
if (table.printMarginRight) {
parms.MARGINRIGHT = table.printMarginRight;
}
}
if (widgetDef && widgetDef.properties) {
if (widgetDef.properties.printTitle) {
parms.TITLE = widgetDef.properties.printTitle;
}
if (widgetDef.properties.printSubtitle) {
parms.SUBTITLE = widgetDef.properties.printSubtitle;
}
if (widgetDef.properties.printPageSize) {
parms.PAGESIZE = widgetDef.properties.printPageSize;
}
if (widgetDef.properties.printOrientation) {
parms.ORIENTATION = widgetDef.properties.printOrientation;
}
if (widgetDef.properties.printSubtitleOn) {
parms.PRINTSUBTITLEON = widgetDef.properties.printSubtitleOn;
}
if (widgetDef.properties.showUser) { // JSL4320
parms.SHOWUSER = widgetDef.properties.showUser;
}
if (widgetDef.properties.printMarginTop) {
parms.MARGINTOP = widgetDef.properties.printMarginTop;
}
if (widgetDef.properties.printMarginBottom) {
parms.MARGINBOTTOM = widgetDef.properties.printMarginBottom;
}
if (widgetDef.properties.printMarginLeft) {
parms.MARGINLEFT = widgetDef.properties.printMarginLeft;
}
if (widgetDef.properties.printMarginRight) {
parms.MARGINRIGHT = widgetDef.properties.printMarginRight;
}
if (widgetDef.properties.maxRows) {
parms.MAXROWS = widgetDef.properties.maxRows;
}
if (widgetDef.properties.borderLeftCell) {
parms.BORDERLEFTCELL = widgetDef.properties.borderLeftCell;
}
if (widgetDef.properties.borderRightCell) {
parms.BORDERRIGHTCELL = widgetDef.properties.borderRightCell;
}
if (widgetDef.properties.borderTopCell) {
parms.BORDERTOPCELL = widgetDef.properties.borderTopCell;
}
if (widgetDef.properties.borderBottomCell) {
parms.BORDERBOTTOMCELL = widgetDef.properties.borderBottomCell;
}
if (widgetDef.properties.borderLeftCol) {
parms.BORDERLEFTCOL = widgetDef.properties.borderLeftCol;
}
if (widgetDef.properties.borderRightCol) {
parms.BORDERRIGHTCOL = widgetDef.properties.borderRightCol;
}
if (widgetDef.properties.borderTopCol) {
parms.BORDERTOPCOL = widgetDef.properties.borderTopCol;
}
if (widgetDef.properties.borderBottomCol) {
parms.BORDERBOTTOMCOL = widgetDef.properties.borderBottomCol;
}
if (widgetDef.properties.borderLeftRow) {
parms.BORDERLEFTROW = widgetDef.properties.borderLeftRow;
}
if (widgetDef.properties.borderRightRow) {
parms.BORDERRIGHTROW = widgetDef.properties.borderRightRow;
}
if (widgetDef.properties.borderTopRow) {
parms.BORDERTOPROW = widgetDef.properties.borderTopRow;
}
if (widgetDef.properties.borderBottomRow) {
parms.BORDERBOTTOMROW = widgetDef.properties.borderBottomRow;
}
if (widgetDef.properties.showFilters) {
parms.SHOWFILTERS = widgetDef.properties.showFilters;
}
if (widgetDef.properties.showListingFilters) { // JSL4520
parms.SHOWLISTINGFILTERS = widgetDef.properties.showListingFilters;
}
if (widgetDef.properties.showDate) { // JSL4520
parms.SHOWDATE = widgetDef.properties.showDate;
}
if (widgetDef.properties.listingFontSize) { // JSL4279
parms.LISTINGFONTSIZE = widgetDef.properties.listingFontSize;
}
if (widgetDef.properties.showZebraStripes) { // JSL4526
parms.SHOWZEBRASTRIPES = widgetDef.properties.showZebraStripes;
}
if (widgetDef.properties.filterTableStyle) {
parms.FILTERTABLESTYLE = widgetDef.properties.filterTableStyle;
}
if (widgetDef.properties.filterTableCaptionStyle) {
parms.FILTERTABLECAPTIONSTYLE = widgetDef.properties.filterTableCaptionStyle;
}
if (widgetDef.properties.filterTableItemStyle) {
parms.FILTERTABLEITEMSTYLE = widgetDef.properties.filterTableItemStyle;
}
if (widgetDef.properties.nowDisplayFormat) {
parms.NOWDISPLAYFORMAT = widgetDef.properties.nowDisplayFormat;
}
}
if (table.getSelectedRange()) {
parms.SELECTEDRANGE = table.getSelectedRange();
}
if (table.getSelectedItems()) {
parms.SELECTEDITEMS = table.getSelectedItems();
}
if (table.listingSortColumn) {
parms.LISTINGSORTCOLUMN = table.listingSortColumn;
}
if (table.listingSortDir) {
parms.LISTINGSORTDIR = table.listingSortDir;
}
var filterNames = [];
var filterValues = [];
table.getFilterInfo(filterNames,filterValues);
for (prop in table.pivotVariables) { // JSL4376
filterNames[filterNames.length]= prop;
filterValues[filterValues.length] = table.pivotVariables[prop];
}
/* JSL4196 comment out
var fq = '';
for (var n = 0; n < table.filters.length; n++) {
var filter = table.filters[n];
fq += '&FILTER='+encodeURIComponent(filter.spec)+':'+encodeURIComponent(filter.value);
if (filter.text!='') {
filterNames[filterNames.length] = filter.spec;
var val = filter.text.toString();
if ('&'==val.charAt(0)) {
val = val.substring(2,val.length-1);
}
filterValues[filterValues.length] = val;
}
}
*/
if (url) {
url = zenLink(url);
var count = 0;
var questionflag = url.indexOf('?') >= 0;
for (var p in parms) {
if (parms[p]!=='') {
url += (count || questionflag ?'&':'?') + p + '=' + encodeURIComponent(parms[p]);
count++;
}
}
/* JSL4196 comment out
for (var n = 0; n < filters.length; n++) {
url += '&FILTER=' + filters[n];
}
*/
if (filterNames.length > 0) { // JSL4182
url += '&FILTERNAMES='+zenPage.CreateParameterNonce((filterNames.join('\n'))); //APV017
url += '&FILTERVALUES='+zenPage.CreateParameterNonce((filterValues.join('\n'))); //APV017
}
if (lfArray) {
if (lfArray.length > 0) {
url += '&LISTINGFILTERS='+encodeURIComponent(lfArray.join('\n'));
}
}
window.open(url,'pdf','');
}
}

self._DeepSee_Component_Widget_portlet_getDataController = function() {
return this.findComponent('controller');
}

self._DeepSee_Component_Widget_portlet_onApplyFilters = function(refresh) {
var portlet = this.findComponent('portlet');
if (portlet && portlet.onApplyFilters) {
portlet.onApplyFilters(refresh,this);
}
}

self._DeepSee_Component_Widget_portlet_GetKpiFilterCaption = function(pKPIName,pSpec) {
	return zenClassMethod(this,'GetKpiFilterCaption','L,L','VARCHAR',arguments);
}

self._DeepSee_Component_Widget_portlet_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}

self._DeepSee_Component_Widget_portlet_ResolveText = function(pEncodedText) {
	return zenInstanceMethod(this,'ResolveText','L','VARCHAR',arguments);
}
self._DeepSee_Component_Widget_portlet__Loader = function() {
	zenLoadClass('_DeepSee_Component_Widget_widget');
	_DeepSee_Component_Widget_portlet.prototype = zenCreate('_DeepSee_Component_Widget_widget',-1);
	var p = _DeepSee_Component_Widget_portlet.prototype;
	if (null==p) {return;}
	p.constructor = _DeepSee_Component_Widget_portlet;
	p.superClass = ('undefined' == typeof _DeepSee_Component_Widget_widget) ? zenMaster._DeepSee_Component_Widget_widget.prototype:_DeepSee_Component_Widget_widget.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%DeepSee.Component.Widget.portlet';
	p._type = 'portlet';
	p.serialize = _DeepSee_Component_Widget_portlet_serialize;
	p.getSettings = _DeepSee_Component_Widget_portlet_getSettings;
	p.GetKpiFilterCaption = _DeepSee_Component_Widget_portlet_GetKpiFilterCaption;
	p.ReallyRefreshContents = _DeepSee_Component_Widget_portlet_ReallyRefreshContents;
	p.ResolveText = _DeepSee_Component_Widget_portlet_ResolveText;
	p.adjustContentSize = _DeepSee_Component_Widget_portlet_adjustContentSize;
	p.exportExcel = _DeepSee_Component_Widget_portlet_exportExcel;
	p.exportPDF = _DeepSee_Component_Widget_portlet_exportPDF;
	p.getDataController = _DeepSee_Component_Widget_portlet_getDataController;
	p.onApplyFilters = _DeepSee_Component_Widget_portlet_onApplyFilters;
}

self._zenClassIdx['http://www.intersystems.com/deepsee/scoreCardWidget'] = '_DeepSee_Component_Widget_scoreCardWidget';
self._DeepSee_Component_Widget_scoreCardWidget = function(index,id) {
	if (index>=0) {_DeepSee_Component_Widget_scoreCardWidget__init(this,index,id);}
}

self._DeepSee_Component_Widget_scoreCardWidget__init = function(o,index,id) {
	('undefined' == typeof _DeepSee_Component_Widget_widget__init) ?zenMaster._DeepSee_Component_Widget_widget__init(o,index,id):_DeepSee_Component_Widget_widget__init(o,index,id);
	o.opacity = '1';
	o.opacityToolbar = '1';
}
function _DeepSee_Component_Widget_scoreCardWidget_serialize(set,s)
{
	var o = this;s[0]='1822821506';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.backgroundColor;s[9]=o.cellAlign;s[10]=o.cellSize;s[11]=o.cellStyle;s[12]=o.cellVAlign;s[13]=(o.centerHeader?1:0);s[14]=set.serializeList(o,o.children,true,'children');s[15]=set.serializeList(o,o.clickActions,false,'clickActions');s[16]=set.serializeList(o,o.clickActive,false,'clickActive');s[17]=o.clickFilterSpec;s[18]=set.serializeList(o,o.clickTargetProperties,false,'clickTargetProperties');s[19]=set.serializeList(o,o.clickTargets,false,'clickTargets');s[20]=o.colSpan;s[21]=o.colorToolbar;s[22]=o.containerStyle;s[23]=set.serializeList(o,o.controlIndices,false,'controlIndices');s[24]=o.currFilterSpec;s[25]=o.currItemNo;s[26]=o.currSeriesNo;s[27]=o.currValue;s[28]=o.currValueName;s[29]=o.dataSource;s[30]=(o.disabled?1:0);s[31]=(o.dragEnabled?1:0);s[32]=(o.dropEnabled?1:0);s[33]=(o.dynamic?1:0);s[34]=o.enclosingClass;s[35]=o.enclosingStyle;s[36]=o.error;s[37]=set.serializeArray(o,o.filterDefault,false,'filterDefault');s[38]=set.serializeArray(o,o.filterState,false,'filterState');s[39]=set.serializeArray(o,o.filterText,false,'filterText');s[40]=(o.forceToolbar?1:0);s[41]=o.groupClass;s[42]=o.groupStyle;s[43]=(o.hasInitialFilters?1:0);s[44]=o.header;s[45]=o.headerLayout;s[46]=o.height;s[47]=(o.hidden?1:0);s[48]=o.hint;s[49]=o.hintClass;s[50]=o.hintStyle;s[51]=o.homeCol;s[52]=o.homeRow;s[53]=o.imageAppLogo;s[54]=o.imageAppLogoWidth;s[55]=o.imageClose;s[56]=o.imageCloseHover;s[57]=o.imageCloseWidth;s[58]=o.imageContract;s[59]=o.imageContractHover;s[60]=o.imageContractWidth;s[61]=o.imageExpand;s[62]=o.imageExpandHover;s[63]=o.imageExpandWidth;s[64]=o.imageMaximize;s[65]=o.imageMaximizeHover;s[66]=o.imageMaximizeWidth;s[67]=o.imageMinimize;s[68]=o.imageMinimizeHover;s[69]=o.imageMinimizeWidth;s[70]=o.imageResize;s[71]=o.imageResizeSize;s[72]=(o.isClosed?1:0);s[73]=o.label;s[74]=o.labelClass;s[75]=o.labelDisabledClass;s[76]=o.labelPosition;s[77]=o.labelStyle;s[78]=o.layout;s[79]=o.linkWidgetKey;s[80]=(o.maximized?1:0);s[81]=o.minWidth;s[82]=(o.moveEnabled?1:0);s[83]=o.onafterdrag;s[84]=o.onbeforedrag;s[85]=o.onclick;s[86]=o.onclosepending;s[87]=o.ondrag;s[88]=o.ondrop;s[89]=o.onhide;s[90]=o.onrefresh;s[91]=o.onresize;s[92]=o.onshow;s[93]=o.onupdate;s[94]=o.onwindowdrop;s[95]=o.onwindowgrab;s[96]=o.opacity;s[97]=o.opacityToolbar;s[98]=o.overlayMode;s[99]=o.prevHomeCol;s[100]=o.prevHomeRow;s[101]=(o.previewMode?1:0);s[102]=o.renderFlag;s[103]=(o.resizeEnabled?1:0);s[104]=o.rowSpan;s[105]=o.sessionCookie;s[106]=set.serializeArray(o,o.settings,false,'settings');s[107]=(o.showLabel?1:0);s[108]=(o.showSidebar?1:0);s[109]=(o.showToolbar?1:0);s[110]=(o.showToolbarBottomBorder?1:0);s[111]=(o.showToolbarOnlyWhenMaximized?1:0);s[112]=o.sidebarContent;s[113]=o.sidebarWidth;s[114]=o.slice;s[115]=o.subtype;s[116]=o.title;s[117]=o.tuple;s[118]=o.valign;s[119]=(o.visible?1:0);s[120]=o.widgetKey;s[121]=o.widgetLayout;s[122]=o.width;
}
function _DeepSee_Component_Widget_scoreCardWidget_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._DeepSee_Component_Widget_scoreCardWidget_adjustContentSize = function(load,width,height) {
var svg = this.findComponent('svgFrame');
if (!svg) return;
var adjW = 4;
var adjH = 0;
var svgDiv = svg.getEnclosingDiv();
svgDiv.style.width = width + 'px';
svgDiv.style.height = height + 'px';
var svgWid = width - adjW;
var svgHgt = height - adjH;
if (svgWid != svg.width) {
svg.setProperty("width",svgWid+'px');
}
if (svgHgt != svg.height) {
svg.setProperty("height",svgHgt+'px');
}
var card = this.findComponent('scoreCard');
if (card) {
if (card.hidden) {
card.setProperty("hidden",false);
}
if (card.cardHeight) {
if (card.cardHeight != card.height) {
card.setProperty("height",card.cardHeight);
}
}
else {
if (svgHgt != card.height) {
card.setProperty("height",svgHgt);
}
}
if (svgWid != card.width) {
card.setProperty("width",svgWid);
}
}
}

self._DeepSee_Component_Widget_scoreCardWidget_exportPDF = function(printMultiple,preserveTempFiles) {
var parms = {};
var table = this.getDataController();
var widgetDef = this.getDefinition();
printMultiple = (printMultiple) ? printMultiple : false;				// DTB251 - For multi-tab browser display
preserveTempFiles = (preserveTempFiles) ? preserveTempFiles : false;	// DTB251 - For merging into a single PDF
var filterNames = [];
var filterValues = [];
if (''!==table.kpi) {
if (table&&table.filters) {
for (var n = 0; n < table.filters.length; n++) {
var filter = table.filters[n];
if (filter.text!='') {
filterNames[filterNames.length] = filter.spec;
var val = filter.text.toString();
if ('&'==val.charAt(0)) {
val = val.substring(2,val.length-1);
}
filterValues[filterValues.length] = val;
}
}
}
else {
for (var filter in this.filterText) {
var filterValue = this.filterText[filter]
if (filterValue) {
filterNames[filterNames.length] = filter;
filterValues[filterValues.length] = filterValue;
}
}
}
for (prop in table.pivotVariables) {
filterNames[filterNames.length]= prop;
filterValues[filterValues.length] = table.pivotVariables[prop];
}
}
else if ((''!=table.cubeName) && (''!=table.queryKey)) {
table.getFilterInfo(filterNames, filterValues);
}
var util = zenPage.getComponentById("svgUtil");
parms.title = widgetDef.title;
parms.filterTable = util.prepareFilterTable(filterNames,filterValues);
parms.preserveTempFiles = preserveTempFiles;		// DTB251 - Add option to preserve temp files
parms.printMultiple = printMultiple;				// DTB251 - Communicate multiple widget print to the printer
this.prepareSvgPrintParameters(parms);				// DTB565 - Normalize the printing parameters
this.printSVGContent(this.id+'/svgFrame',parms);
}

self._DeepSee_Component_Widget_scoreCardWidget_getDataController = function() {
return this.findComponent('controller');
}

self._DeepSee_Component_Widget_scoreCardWidget_getOverrides = function() {
var overrides = {};
var def = this.getDefinition();
if (def) {
if (def.themeOverrides['scoreCard']) {
overrides['scoreCard'] = def.themeOverrides['scoreCard'];
}
if (def.overrides['scoreCard']) {
overrides['scoreCard'] = def.overrides['scoreCard'];
}
}
return overrides;
}

self._DeepSee_Component_Widget_scoreCardWidget_hasOverrides = function() {
var def = this.getDefinition();
return (def&&def.overrides['scoreCard']) ? true : false;
}

self._DeepSee_Component_Widget_scoreCardWidget_isReady = function() {
var controller = this.getDataController();
if (controller && controller.hasData) {
return controller.hasData();
}
return true;
}

self._DeepSee_Component_Widget_scoreCardWidget_navCloseButtonClick = function(key) {
var ckey = key;
var kt = ckey.toString().split('-');
kt.splice(0,1);
var k2 = kt.join('-');
var target = kt[0];
switch(target) {
case 'card':
var chart = this.findComponent('scoreCard');
var oc = chart.columns.length;
this.scorecardCloseButtonClick(zenPage.getNavigator(),chart,k2);
if (oc!=chart.columns.length) {
zenPage.setModified(true);
this.navDataChange('widget-card-columnRemove','',true);
}
break;
default:
this.invokeSuper('navCloseButtonClick',arguments);
break;
}
}

self._DeepSee_Component_Widget_scoreCardWidget_navDataArrange = function(key,swap,final) {
var kt = key.toString().split('-');
kt.splice(0,1);
var k2 = kt.join('-');
var chart = this.findComponent('scoreCard');
this.scorecardDataArrange(zenPage.getNavigator(),chart,k2,swap,final);
if (final) {
zenPage.setModified(true);
this.navDataChange('widget-card-columnMoved','',true);
}
}

self._DeepSee_Component_Widget_scoreCardWidget_navDataChange = function(key,value,final) {
var ckey = key;
var kt = ckey.toString().split('-');
kt.splice(0,1);
var k2 = kt.join('-');
var target = kt[0];
switch (target) {
case 'common':
this.invokeSuper('navDataChange',arguments);
break;
case 'card':
var svg = this.findComponent('svgFrame');
var chart = this.findComponent('scoreCard');
this.scorecardDataChange(zenPage.getNavigator(),svg,chart,k2,value,final);
if (final) {
var widgetDef = this.getDefinition();
if (widgetDef) {
skip = {
parent:true, window:true, controller:true,
superClass:true, controllerId:true, height:true,
seriesSize:true, seriesCount:true,
seriesNames:true, yAxisList:true
}
var jsonOver = this.componentToJSON(chart,0,skip);
if (zenGet(widgetDef.themeOverrides['scoreCard'])!=jsonOver) {
widgetDef.overrides['scoreCard'] = jsonOver;
}
else {
delete widgetDef.overrides['scoreCard'];
}
}
}
break;
}
}

self._DeepSee_Component_Widget_scoreCardWidget_navGetContentForLevel = function(level,key,value) {
var content = { title:'', items:[] };
var ckey = key;		// make local copy of key
var keyNo = 0;
if (ckey.toString().indexOf(':')>0) {
var t = ckey.split(':');
ckey = t[0];
keyNo = parseInt(t[1]);
}
switch (ckey) {
case 'WidgetSettings':
content = this.invokeSuper('navGetContentForLevel',arguments);
content.items[content.items.length] = {display:'section', caption:$$$Text('Scorecard Settings','%DeepSee') };
content.items[content.items.length] = {display:'image-caption-hz', image:'deepsee/spreadsheet_48.gif', caption:$$$Text('Scorecard','%DeepSee'), action:'drill', key:'widget-card-ScoreCardSettings'};
break;
default:
var kt = ckey.toString().split('-');
switch(kt[1]) {
case 'common':
content = this.invokeSuper('navGetContentForLevel',arguments);
break;
case 'card':
var chart = this.findComponent('scoreCard');
if (!chart) {
content.items[content.items.length] = {display:'info', caption:$$$Text('Scorecard is not Connected to a Data Source','%DeepSee'), captionStyle:'color:darkred;white-space: normal;width:260px;', style:'height:150px;' };
}
else {
var kt = ckey.toString().split('-');
kt.splice(0,1);
var k2 = kt.join('-');
k2 = (keyNo==='') ? k2 : (k2 + ':' + keyNo);
content = this.scorecardGetContentForLevel(zenPage.getNavigator(),chart,level,k2,'');
if (content.items) {
for (var n = 0; n < content.items.length; n++) {
var k = content.items[n].key;
if (k) {
content.items[n].key = 'widget-' + k;
}
}
}
}
break;
}
}
return content;
}

self._DeepSee_Component_Widget_scoreCardWidget_navHeaderButtonClick = function(key) {
var ckey = key;
var kt = ckey.toString().split('-');
var target = kt[0];
switch(target) {
case 'card':
var chart = this.findComponent('scoreCard');
this.scorecardHeaderButtonClick(zenPage.getNavigator(),chart,key);
break;
default:
this.invokeSuper('navHeaderButtonClick',arguments);
break;
}
}

self._DeepSee_Component_Widget_scoreCardWidget_onApplyFilters = function(refresh) {
if (this.currSeriesNo > 0) {
var card = this.findComponent('scoreCard');
if (card) {
card.selectRow(-1);
}
this.currSeriesNo = null;
this.currValue = null;
}
}

self._DeepSee_Component_Widget_scoreCardWidget_resetOverrides = function(themeOnly,recreate) {
var def = this.getDefinition();
if (def && def.overrides['scoreCard']) {
delete def.overrides['scoreCard'];
if (zenPage.recreateWidget) {
zenPage.recreateWidget(this.widgetKey);
}
}
}

self._DeepSee_Component_Widget_scoreCardWidget_rowClickHandler = function(row,value) {
this.currValue = value;
this.currSeriesNo = parseInt(row) + 1;
this.raiseEventHandler('click');
}

self._DeepSee_Component_Widget_scoreCardWidget_scorecardCloseButtonClick = function(navigator,chart,key) {
var t = key.toString().split(':');
switch(t[0]) {
case 'card-column':
if (confirm('Do you wish to remove this column?')) {
var columnNo = parseInt(t[1]);
chart.columns.splice(columnNo,1);
chart.render();
navigator.refreshTopSheet();
}
break;
default:
break;
}
}

self._DeepSee_Component_Widget_scoreCardWidget_scorecardDataArrange = function(navigator,chart,key,swap,final) {
if (!this._oldList) {
this._oldList = chart.columns;
}
var newList = [];
for (var n = 0; n < this._oldList.length; n++) {
newList[n] = this._oldList[n];
}
var x = newList[swap.oldPosition];
newList[swap.oldPosition] = newList[swap.newPosition];
newList[swap.newPosition] = x;
chart.columns = newList;
chart.render();
if (final) {
delete this._oldList;
}
}

self._DeepSee_Component_Widget_scoreCardWidget_scorecardDataChange = function(navigator,svg,chart,key,value,final) {
var keyNo = 0;
if (key.toString().indexOf(':')>0) {
var t = key.split(':');
key = t[0];
keyNo = parseInt(t[1]);
}
var t = key.toString().split('-');
var attr = t[1];
var object = chart;
if (attr == 'column') {
t.splice(0,1);
var attr = t[1];
object = chart.columns[keyNo];
}
switch (attr) {
case 'seriesCount':
case 'seriesSize':
if (final) {
this[attr] = parseInt(value);
chart.setProperty(attr,value);
this.updateChartData();
}
break;
case 'width':
case 'height':
if (object._type=='scoreCardColumn') {
object.setProperty(attr,value);
chart.render();
}
else {
zen('svg').setProperty(attr,value);
chart.setProperty(attr,value);
}
break;
case 'title':
case 'subtitle':
case 'seriesCount':
case 'seriesSize':
case 'cardSize':
default:
object.setProperty(attr,value);
if (object._type=='scoreCardColumn') {
chart.render();
}
break;
case 'titleImageStyle':
case 'backgroundStyle':
case 'stripeStyle':
case 'gridStyle':
case 'titleStyle':
case 'subtitleStyle':
case 'columnHeaderStyle':
case 'labelStyle':
case 'valueLabelStyle':
case 'lampLabelStyle':
case 'cellCaptionStyle':
case 'trendLineStyle':
case 'trendBarsStyle':
case 'arrowStyle':
case 'plotBoxStyle':
case 'plotBoxValueStyle':
case 'plotBoxValueStyleNeg':
case 'plotBoxLowerStyle':
case 'plotBoxMidStyle':
case 'targetLineStyle':
case 'titleBoxStyle':
case 'style':
t.splice(0,2);
var styleProp = t.join('-');
var styleValues = {};
if (styleProp && styleProp.length) {
switch(styleProp) {
case 'textStyle':
var cv = value.toString().split(',');
for (var n = 0; n < cv.length; n++) {
styleValues[cv[n]] = true;
}
styleProp = null;
break;
case 'opacity':
value = value >=1 ? '' : value;
break;
case 'stroke-dasharray':
switch (value) {
case 'dotted':
value = '3,3';
break;
case 'dashed':
value = '10,10';
break;
case 'solid':
default:
value = '';
break;
}
break;
}
var style = object.getProperty(attr);
var info = navigator.parseStyleSVG(style);
if (styleProp) {
info[styleProp] = value;
}
if (styleValues.bold) {
info['font-weight'] = 'bold';
}
else {
delete info['font-weight'];
}
if (styleValues.italic) {
info['font-style'] = 'italic';
}
else {
delete info['font-style'];
}
if (styleValues.smallCaps) {
info['font-variant'] = 'small-caps';
}
else {
delete info['font-variant'];
}
if (styleValues.shadow) {
info['text-shadow'] = '1px 1px 1px #808080';
}
else {
delete info['text-shadow'];
}
style = navigator.convertCSSToText(info);
object.setProperty(attr,style);
if (object._type=='scoreCardColumn') {
chart.render();
}
var spec = navigator.getParentSpec();
spec.value = style;
}
break;
case 'lampColor':
case 'lampColorNeg':
chart.setProperty(attr,value);
break;
case 'seriesDetail':
t.splice(0,1);
var styleProp = t.join('-');
switch (styleProp) {
case 'fill':
var seriesColors = this.parseColorList(zenGet(chart.seriesColorsOverride));
seriesColors[this._seriesNo] = value;
chart.setProperty('seriesColorsOverride',seriesColors.join(','));
break;
case 'plotType':
var types = zenGet(chart.seriesTypes).toString().split(',');
types[this._seriesNo] = value;
chart.setProperty('seriesTypes',types.join(','));
break;
case 'markerShape':
var shapes = zenGet(chart.markerShapes).toString().split(',');
shapes[this._seriesNo] = value;
chart.setProperty('markerShapes',shapes.join(','));
break;
case 'name':
var names = zenGet(chart.seriesNames).toString().split(',');
names[this._seriesNo] = value;
chart.setProperty('seriesNames',names.join(','));
zen('chartData').setProperty('propertyList',names.join(','));
break;
case 'yAxisNo':
var axes = zenGet(chart.seriesYAxes).toString().split(',');
axes[this._seriesNo] = value;
for (var n = 0; n < axes.length; n++) {
axes[n] = axes[n]&&axes[n]!=='' ? axes[n] : 0;
}
chart.setProperty('seriesYAxes',axes.join(','));
break;
}
break;
}
}

self._DeepSee_Component_Widget_scoreCardWidget_scorecardGetContentForLevel = function(navigator,chart,level,key,value) {
var title = $$$Text('Scorecard Options','%DeepSee');
var content = { title: title, items:[] };
var settings = {};
chart.getSettings(settings);
var keyNo = '';
if (key.toString().indexOf(':')>0) {
var t = key.split(':');
key = t[0];
keyNo = parseInt(t[1]);
}
var t = key.toString().split('-');
t.splice(0,1);
var attr = t.join('-');
switch (key) {
case 'card-ScoreCardSettings':
content.items[content.items.length] = {display:'caption', caption:$$$Text('Size &amp; Appearance','%DeepSee'), action:'drill', key:'card-ScoreCardSize'};
content.items[content.items.length] = {display:'caption', caption:$$$Text('Titles','%DeepSee'), action:'drill', key:'card-ScoreCardTitle'};
content.items[content.items.length] = {display:'caption', caption:$$$Text('Colors &amp; Style','%DeepSee'), action:'drill', key:'card-ScoreCardColors'};
content.items[content.items.length] = {display:'caption', caption:$$$Text('Columns','%DeepSee'), action:'drill', key:'card-ScoreCardColumnList'};
break;
case 'card-ScoreCardSize':
title = $$$Text('Size and Appearance','%DeepSee');
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Size','%DeepSee'), edit:'choice', value:zenGet(chart.cardSize),  key:'card-cardSize',valueList:',big', displayList:$$$Text('Regular,Big','%DeepSee')};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Show Title','%DeepSee'), edit:'switch', value:zenGet(chart.titleVisible),  key:'card-titleVisible'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Show Headers','%DeepSee'), edit:'switch', value:zenGet(chart.headersVisible),  key:'card-headersVisible'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Show Footers','%DeepSee'), edit:'switch', value:zenGet(chart.footersVisible),  key:'card-footersVisible'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Row Height','%DeepSee'), edit:'slider-toggle', value:zenGet(chart.rowHeight),	key:'card-rowHeight', minValue:1, maxValue:150 };
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Arrow Size','%DeepSee'), edit:'slider', value:zenGet(chart.arrowSize),	key:'card-arrowSize', minValue:0, maxValue:1 };
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Lamp Size','%DeepSee'), edit:'slider', value:zenGet(chart.lampSize),	key:'card-lampSize', minValue:0, maxValue:1 };
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('TrendLine Hgt','%DeepSee'), edit:'slider', value:zenGet(chart.trendLineHeight),	key:'card-trendLineHeight', minValue:0, maxValue:1 };
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('TrendBars Hgt','%DeepSee'), edit:'slider', value:zenGet(chart.trendBarsHeight),	key:'card-trendBarsHeight', minValue:0, maxValue:1 };
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Plotbox Height','%DeepSee'), edit:'slider', value:zenGet(chart.plotBoxHeight),	key:'card-plotBoxHeight', minValue:0, maxValue:1 };
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Plotbox Value','%DeepSee'), edit:'slider', value:zenGet(chart.plotBoxValueHeight),	key:'card-plotBoxValueHeight', minValue:0, maxValue:1 };
var list = chart.columns;
if (!list) {
chart.columns = [];
}
if (list.length) {
content.items[content.items.length] = {display:'section', caption:$$$Text('Column Widths','%DeepSee')};
}
for (var n = 0; n < list.length; n++) {
var column = list[n];
var name = zenGet(column.label);
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Column ','%DeepSee') + (n+1), edit:'slider-toggle', value:zenGet(column.width),	key:'card-column-width:'+n, minValue:0, maxValue:500 };
}
break;
case 'card-ScoreCardTitle':
title = $$$Text('Titles','%DeepSee');
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Title','%DeepSee'), edit:'string', value:zenGet(chart.title),  key:'card-title'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Title Style','%DeepSee'), action:'drill', value:zenGet(chart.titleStyle),	key:'card-titleStyle', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Subtitle','%DeepSee'), edit:'string', value:zenGet(chart.subtitle),  key:'card-subtitle'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Subtitle Style','%DeepSee'), action:'drill', value:zenGet(chart.subtitleStyle),	key:'card-subtitleStyle', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Title Align','%DeepSee'), edit:'choice', value:zenGet(chart.titleAlign),	key:'card-titleAlign', valueList:'left,center,right', displayList:'&#9664;,&#9632;,&#9654;'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Title Box','%DeepSee'), action:'drill', value:zenGet(chart.titleBoxStyle),	key:'card-titleBoxStyle', text:''};
content.items[content.items.length] = {display:'caption', caption:$$$Text('Title Image','%DeepSee'), action:'drill', value:zenGet(chart.titleImage),	key:'card-titleImage'};
var imageLeft = 0;
var imageTop = 0;
var imageWidth = 50;
var imageHeight = 50;
var imageStyle = chart.titleImageStyle;
if (imageStyle) {
var t = imageStyle.toString().split(';');
for (var ti = 0; ti < t.length; ti++) {
var t2 = t[ti].toString().split(':');
switch (t2[0]) {
case 'left':
imageLeft = parseInt(t2[1]);
break;
case 'top':
imageTop = parseInt(t2[1]);
break;
case 'width':
imageWidth = parseInt(t2[1]);
break;
case 'height':
imageHeight = parseInt(t2[1]);
break;
}
}
}
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Image Width','%DeepSee'), edit:'slider-toggle', value:imageWidth, key:'card-titleImageStyle-width', minValue:0, maxValue:150};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Image Height','%DeepSee'), edit:'slider-toggle', value:imageHeight, key:'card-titleImageStyle-height', minValue:0, maxValue:150};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Image Top','%DeepSee'), edit:'slider-toggle', value:imageTop, key:'card-titleImageStyle-top', minValue:0, maxValue:150};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Image Left','%DeepSee'), edit:'slider-toggle', value:imageHeight, key:'card-titleImageStyle-left', minValue:0, maxValue:150};
break;
case 'card-titleImage':
title = $$$Text('Title Image','%DeepSee');		// DTB236
var options = zenPage.fetchOptionList('image-list','');
var list = options.children;
content.html = zenPage.getNavigator().getIconListHTML(list,key,'');
break;
case 'card-ScoreCardColors':
title = $$$Text('Scorecard Colors','%DeepSee');
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Background','%DeepSee'), action:'drill', value:zenGet(chart.backgroundStyle),	key:'card-backgroundStyle', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Stripe Style','%DeepSee'), action:'drill', value:zenGet(chart.stripeStyle),	key:'card-stripeStyle', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Separator Style','%DeepSee'), action:'drill', value:zenGet(chart.gridStyle),	key:'card-gridStyle', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Label Style','%DeepSee'), action:'drill', value:zenGet(chart.labelStyle),	key:'card-labelStyle', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Value Style','%DeepSee'), action:'drill', value:zenGet(chart.valueLabelStyle),	key:'card-valueLabelStyle', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Cell Caption Style','%DeepSee'), action:'drill', value:zenGet(chart.cellCaptionStyle),	key:'card-cellCaptionStyle', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Header Style','%DeepSee'), action:'drill', value:zenGet(chart.columnHeaderStyle),	key:'card-columnHeaderStyle', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('TrendLine Style','%DeepSee'), action:'drill', value:zenGet(chart.trendLineStyle),	key:'card-trendLineStyle', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('TrendBars Style','%DeepSee'), action:'drill', value:zenGet(chart.trendBarsStyle),	key:'card-trendBarsStyle', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Arrow Style','%DeepSee'), action:'drill', value:zenGet(chart.arrowStyle),	key:'card-arrowStyle', text:''};
var fill = zenGet(chart.lampColor);
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Lamp Color','%DeepSee'), action:'drill', value:'',	key:'card-lampColor-fill', valueStyle:'width:80px;border-radius:5px;border:1px solid #B0B0B0;background:'+fill+';'};
var fill = zenGet(chart.lampColorNeg);
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Lamp Negative','%DeepSee'), action:'drill', value:'',	key:'card-lampColorNeg-fill', valueStyle:'width:80px;border-radius:5px;border:1px solid #B0B0B0;background:'+fill+';'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Lamp Value Style','%DeepSee'), action:'drill', value:zenGet(chart.lampLabelStyle),	key:'card-lampLabelStyle', text:''};
content.items[content.items.length] = {display:'caption', caption:$$$Text('Plotbox','%DeepSee'), 	action:'drill', key:'card-ScoreCardPlotBox'};
break;
case 'card-ScoreCardPlotBox':
title = $$$Text('Plotbox Styles','%DeepSee');
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Value Style','%DeepSee'), action:'drill', value:zenGet(chart.plotBoxValueStyle),	key:'card-plotBoxValueStyle', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Box Style','%DeepSee'), action:'drill', value:zenGet(chart.plotBoxStyle),	key:'card-plotBoxStyle', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Lower Style','%DeepSee'), action:'drill', value:zenGet(chart.plotBoxLowerStyle),	key:'card-plotBoxLowerStyle', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Mid Style','%DeepSee'), action:'drill', value:zenGet(chart.plotBoxMidStyle),	key:'card-plotBoxMidStyle', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Target Line','%DeepSee'), action:'drill', value:zenGet(chart.targetLineStyle),	key:'card-targetLineStyle', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Below Base Style','%DeepSee'), action:'drill', value:zenGet(chart.plotBoxValueStyleNeg),	key:'card-plotBoxValueStyleNeg', text:''};
break;
case 'card-ScoreCardColumnList':
title = $$$Text('Columns','%DeepSee');
content.headerButtons = [
{key:'card-addColumn', caption:$$$Text('Add Column','%DeepSee'), image:'deepsee/ds2_plus_44_w.png'}
];
var list = chart.columns;
if (!list) {
chart.columns = [];
list = chart.columns;
}
if (list.length == 0) {
content.items[content.items.length] = {display:'info', caption:$$$Text('Scorecard has no Columns','%DeepSee'), value:'Press the Add button to add a Column', captionStyle:'color:darkred;white-space: normal;width:260px;', style:'height:150px;' };
}
for (var n = 0; n < list.length; n++) {
var column = list[n];
var name = zenGet(column.label);
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Column ','%DeepSee') + (n+1), value:name, action:'drill', key:'card-column:'+n, closeButton:true, canDrag:true};
}
break;
case 'card-column':
title = $$$Text('Column','%DeepSee');
var column = chart.columns[keyNo];
content.items[content.items.length] = {display:'info', caption:$$$Text('Column','%DeepSee'), value:'Set the options for a score card column'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Display','%DeepSee'), action:'drill', value:zenGet(column.display),  key:key+'-display:'+keyNo};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Value','%DeepSee'), edit:'string', action:'drill', value:zenGet(column.dataValue),  key:key+'-dataValue:'+keyNo};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Label','%DeepSee'), edit:'string', value:zenGet(column.label),  key:key+'-label:'+keyNo};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Cell Caption','%DeepSee'), edit:'string', value:zenGet(column.cellCaption),  key:key+'-cellCaption:'+keyNo};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Header Align','%DeepSee'), edit:'choice', value:zenGet(column.headerAlign),	key:key+'-headerAlign:'+keyNo, valueList:'left,center,right,', displayList:'&#9664;,&#9632;,&#9654;,'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Align','%DeepSee'), edit:'choice', value:zenGet(column.align),	key:key+'-align:'+keyNo, valueList:'left,center,right,', displayList:'&#9664;,&#9632;,&#9654;,'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Width','%DeepSee'), edit:'slider-toggle', value:zenGet(column.width), key:key+'-width:'+keyNo, minValue:0, maxValue:500};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Show As','%DeepSee'), action:'drill', value:zenGet(column.showAs),  key:key+'-showAs:'+keyNo};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Summary','%DeepSee'), action:'drill', value:zenGet(column.summary),  key:key+'-summary:'+keyNo};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Format','%DeepSee'), edit:'string', action:'drill', value:zenGet(column.format),  key:key+'-format:'+keyNo};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Style','%DeepSee'), action:'drill', value:zenGet(column.style),	key:key+'-style:'+keyNo, text:''};
content.items[content.items.length] = {display:'section', caption:$$$Text('Range and Target','%DeepSee')};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Min Value','%DeepSee'), edit:'string', value:zenGet(column.rangeLower),  key:key+'-rangeLower:'+keyNo, action:'drill'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Max Value','%DeepSee'), edit:'string', value:zenGet(column.rangeUpper),  key:key+'-rangeUpper:'+keyNo, action:'drill'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Target Value','%DeepSee'), edit:'string', value:zenGet(column.targetValue),  key:key+'-targetValue:'+keyNo, action:'drill'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Lower','%DeepSee'), edit:'string', value:zenGet(column.thresholdLower),  key:key+'-thresholdLower:'+keyNo, action:'drill'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Upper','%DeepSee'), edit:'string', value:zenGet(column.thresholdUpper),  key:key+'-thresholdUpper:'+keyNo, action:'drill'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Base Value','%DeepSee'), edit:'string', value:zenGet(column.baseValue),  key:key+'-baseValue:'+keyNo,action:'drill'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Value Column','%DeepSee'), edit:'switch', value:zenGet(column.valueColumn),  key:key+'-valueColumn:'+keyNo, hint:$$$Text('Make this the value column','%DeepSee')};
break;
case 'card-column-dataValue':
case 'card-column-targetValue':
case 'card-column-baseValue':
case 'card-column-rangeLower':
case 'card-column-rangeUpper':
case 'card-column-thresholdLower':
case 'card-column-thresholdUpper':
title = $$$Text('Properties','%DeepSee');
var p = key.toString().split('-');
var propName = p[p.length-1];
var column = chart.columns[keyNo];
var widgetDef = this.getDefinition(zenPage.currWidgetKey);
var options = zenPage.fetchOptionList('widget-property',widgetDef.dataSource);
var list = options.children;
content.html = navigator.getChooserListHTML(list,key,zenGet(column[propName]));
break;
case 'card-column-format':
title = $$$Text('Numeric Format','%DeepSee');
var column = chart.columns[keyNo];
var list = [
{ caption:$$$Text('###','%DeepSee'), value:'###'},
{ caption:$$$Text('###.#','%DeepSee'), value:'###.#'},
{ caption:$$$Text('###.##','%DeepSee'), value:'###.##'},
{ caption:$$$Text('###.###','%DeepSee'), value:'###.###'},
{ caption:$$$Text('#,##','%DeepSee'), value:'#,##'},
{ caption:$$$Text('#,##.#','%DeepSee'), value:'#,##.#'},
{ caption:$$$Text('#,##.##','%DeepSee'), value:'#,##.##'},
{ caption:$$$Text('#,##.###','%DeepSee'), value:'#,##.###'},
{ caption:$$$Text('##.##%','%DeepSee'), value:'##.##%'},
];
content.html = navigator.getChooserListHTML(list,key,zenGet(column.display),$$$Text('Format','%DeepSee'),$$$Text('Choose a numeric format','%DeepSee'));
break;
case 'card-column-display':
title = $$$Text('Column Display','%DeepSee');
var column = chart.columns[keyNo];
var list = [
{ caption:$$$Text('Item Number','%DeepSee'), value:'itemNo', hint:$$$Text('Show the item number','%DeepSee')},
{ caption:$$$Text('Label','%DeepSee'), value:'label', hint:$$$Text('Show the item label','%DeepSee')},
{ caption:$$$Text('Value','%DeepSee'), value:'value', hint:$$$Text('Show the item value','%DeepSee')},
{ caption:$$$Text('Arrow','%DeepSee'), value:'arrow', hint:$$$Text('Show an arrow based on the value','%DeepSee')},
{ caption:$$$Text('Lamp','%DeepSee'), value:'lamp', hint:$$$Text('Show a lamp based on the value','%DeepSee')},
{ caption:$$$Text('Lamp with Value','%DeepSee'), value:'lamp-value', hint:$$$Text('Show a lamp and the value','%DeepSee')},
{ caption:$$$Text('Trend Line','%DeepSee'), value:'trendLine', hint:$$$Text('Show a trendline based on a comma list of values','%DeepSee')},
{ caption:$$$Text('Trend Bars','%DeepSee'), value:'trendBars', hint:$$$Text('Show a column chart based on a comma list of values','%DeepSee')},
{ caption:$$$Text('Plotbox','%DeepSee'), value:'plotBox', hint:$$$Text('Show a plot box based on the value','%DeepSee')},
{ caption:$$$Text('Hidden','%DeepSee'), value:'hidden', hint:$$$Text('Do not show this column','%DeepSee')}
];
content.html = navigator.getChooserListHTML(list,key,zenGet(column.display),$$$Text('Display','%DeepSee'),$$$Text('The Display setting defines how to display this item','%DeepSee'));
break;
case 'card-column-showAs':
title = $$$Text('Column Show As','%DeepSee');
var column = chart.columns[keyNo];
var list = [
{ caption:$$$Text('Value','%DeepSee'), value:'value',hint:$$$Text('Base the display on the value of this item.','%DeepSee')},
{ caption:$$$Text('Conditional','%DeepSee'), value:'conditional',hint:$$$Text('Do not show this item if its value does not exist','%DeepSee')},
{ caption:$$$Text('Sum','%DeepSee'), value:'sum',hint:$$$Text('Base the display on the sum of all values for this item.','%DeepSee')},
{ caption:$$$Text('Sum%','%DeepSee'), value:'sum%',hint:$$$Text('Base the display on the percentage of the total for this item.','%DeepSee')},
{ caption:$$$Text('Target','%DeepSee'), value:'target',hint:$$$Text('Base the display on the target value for this item.','%DeepSee')},
{ caption:$$$Text('Target %','%DeepSee'), value:'target%',hint:$$$Text('Base the display on the percentage of the target value of this item.','%DeepSee')}
];
content.html = navigator.getChooserListHTML(list,key,zenGet(column.showAs),$$$Text('Show As','%DeepSee'),$$$Text('The ShowAs setting defines what value to display for this item','%DeepSee'));
break;
case 'card-column-summary':
title = $$$Text('Column Summary','%DeepSee');
var column = chart.columns[keyNo];
var list = [
{ caption:$$$Text('None','%DeepSee'), value:''},
{ caption:$$$Text('Sum','%DeepSee'), value:'sum'},
{ caption:$$$Text('Average','%DeepSee'), value:'avg'},
{ caption:$$$Text('Min','%DeepSee'), value:'min'},
{ caption:$$$Text('Max','%DeepSee'), value:'max'},
{ caption:$$$Text('Value','%DeepSee'), value:'value'}
];
content.html = navigator.getChooserListHTML(list,key,zenGet(column.summary),$$$Text('Summary','%DeepSee'),$$$Text('Specify what summary value to show for this column','%DeepSee'));
break;
case 'card-titleStyle':
case 'card-subtitleStyle':
case 'card-columnHeaderStyle':
case 'card-labelStyle':
case 'card-valueLabelStyle':
case 'card-lampLabelStyle':
case 'card-cellCaptionStyle':
title = $$$Text('Style','%DeepSee');
var style = zenGet(chart[attr]);
var info = navigator.parseStyleSVG(style);
var fill = info['fill'] ? info['fill'] : 'transparent';
var stroke = info['stroke'] ? info['stroke'] : 'none';
var strokeWidth = zenGet(info['stroke-width']);
var fontFamily = zenGet(info['font-family']);
var fontSize = zenGet(info['font-size']);
var opacity = zenGet(info['opacity']);
opacity = opacity==='' ? 1.0 : opacity;
var shadow = zenGet(info['text-shadow']);
shadow = shadow ? true : false;
var bold = zenGet(info['font-weight']);
bold = bold ? true : false;
var italic = zenGet(info['font-style']);
italic = italic ? true : false;
var smallCaps = zenGet(info['font-variant']);
smallCaps = smallCaps ? true : false;
var fs = [];
if (bold) { fs[fs.length] = 'bold'; }
if (italic) { fs[fs.length] = 'italic'; }
if (smallCaps) { fs[fs.length] = 'smallCaps'; }
if (shadow) { fs[fs.length] = 'shadow'; }
var fontStyle = fs.join(',');
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Color','%DeepSee'), action:'drill', value:fill,	key:key+'-fill', valueStyle:'width:80px;border-radius:5px;border:1px solid #B0B0B0;background:'+fill+';', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Stroke','%DeepSee'), action:'drill', value:stroke,	key:key+'-stroke', valueStyle:'width:80px;border-radius:5px;border:1px solid #B0B0B0;background:'+stroke+';', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Stroke Width','%DeepSee'), edit:'slider-toggle', value:strokeWidth,	key:key+'-stroke-width', minValue:0, maxValue:5, stepSize:0.05};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Opacity','%DeepSee'), edit:'slider', value:opacity,	key:key+'-opacity'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Font','%DeepSee'), action:'drill', value:fontFamily,	key:key+'-font-family', style:'font-family:'+fontFamily+';'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Text Size','%DeepSee'), edit:'slider-toggle', value:fontSize,	key:key+'-font-size', minValue:4, maxValue:100, stepSize:1};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Text Style','%DeepSee'), edit:'choice-multi', value:fontStyle,	key:key+'-textStyle', valueList:'bold,italic,smallCaps,shadow', displayList:'B,I,Cc,S', valueStyle:'font-size:12px;font-family:times new roman;', choiceStyles:'font-weight:900;^font-style:italic;^font-variant:small-caps;^text-shadow:1px 1px 2px #F0F0F0;'};
break;
case 'card-backgroundStyle':
case 'card-trendLineStyle':
case 'card-trendBarsStyle':
case 'card-arrowStyle':
case 'card-plotBoxStyle':
case 'card-plotBoxValueStyle':
case 'card-plotBoxValueStyleNeg':
case 'card-plotBoxLowerStyle':
case 'card-plotBoxMidStyle':
case 'card-targetLineStyle':
case 'card-stripeStyle':
case 'card-gridStyle':
case 'card-titleBoxStyle':
case 'card-lampColor':
case 'card-lampColorNeg':
case 'card-column-style':
title = $$$Text('Style','%DeepSee');
if (key=='card-column-style') {
var style = chart.columns[keyNo].style;
}
else {
var style = zenGet(chart[attr]);
}
var info = navigator.parseStyleSVG(style);
var fill = info['fill'] ? info['fill'] : 'transparent';
var stroke = info['stroke'] ? info['stroke'] : 'none';
var strokeWidth = zenGet(info['stroke-width']);
var opacity = zenGet(info['opacity']);
var strokeDashArray = info['stroke-dasharray'];
switch (strokeDashArray) {
case '3,3':
strokeDashArray = 'dotted';
break;
case '10,10':
strokeDashArray = 'dashed';
break;
default:
strokeDashArray = 'solid';
break;
}
opacity = opacity==='' ? 1.0 : opacity;
var k2 = '';
if (key=='card-column-style') {
k2 = ':' + keyNo;
}
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Fill','%DeepSee'), action:'drill', value:fill,	key:key+'-fill'+k2, valueStyle:'width:80px;border-radius:5px;border:1px solid #B0B0B0;background:'+fill+';', text:''};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Opacity','%DeepSee'), edit:'slider', value:opacity,	key:key+'-opacity'+k2};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Line','%DeepSee'), action:'drill', value:'',	key:key+'-stroke'+k2, valueStyle:'width:80px;border-radius:5px;border:1px solid #B0B0B0;background:'+stroke+';'};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Line Width','%DeepSee'), edit:'slider-toggle', value:strokeWidth,	key:key+'-stroke-width'+k2, minValue:0, maxValue:25, stepSize:0.25};
content.items[content.items.length] = {display:'caption-value-hz', caption:$$$Text('Line Style','%DeepSee'), edit:'choice', value:strokeDashArray,	key:key+'-stroke-dasharray'+k2, valueList:'solid,dashed,dotted', displayList:'solid,dashed,dotted'};
break;
case 'card-backgroundStyle-fill':
case 'card-backgroundStyle-stroke':
case 'card-titleStyle-fill':
case 'card-titleStyle-stroke':
case 'card-subtitleStyle-fill':
case 'card-subtitleStyle-stroke':
case 'card-columnHeaderStyle-fill':
case 'card-columnHeaderStyle-stroke':
case 'card-labelStyle-fill':
case 'card-labelStyle-stroke':
case 'card-valueLabelStyle-fill':
case 'card-valueLabelStyle-stroke':
case 'card-cellCaptionStyle-fill':
case 'card-cellCaptionStyle-stroke':
case 'card-lampLabelStyle-fill':
case 'card-lampLabelStyle-stroke':
case 'card-trendLineStyle-fill':
case 'card-trendLineStyle-stroke':
case 'card-trendBarsStyle-fill':
case 'card-trendBarsStyle-stroke':
case 'card-arrowStyle-fill':
case 'card-arrowStyle-stroke':
case 'card-lampColor-fill':
case 'card-lampColorNeg-fill':
case 'card-plotBoxStyle-fill':
case 'card-plotBoxStyle-stroke':
case 'card-plotBoxValueStyle-fill':
case 'card-plotBoxValueStyle-stroke':
case 'card-plotBoxValueStyleNeg-fill':
case 'card-plotBoxValueStyleNeg-stroke':
case 'card-plotBoxLowerStyle-fill':
case 'card-plotBoxLowerStyle-stroke':
case 'card-plotBoxMidStyle-fill':
case 'card-plotBoxMidStyle-stroke':
case 'card-targetLineStyle-fill':
case 'card-targetLineStyle-stroke':
case 'card-gridStyle-fill':
case 'card-gridStyle-stroke':
case 'card-stripeStyle-fill':
case 'card-stripeStyle-stroke':
case 'card-titleBoxStyle-fill':
case 'card-titleBoxStyle-stroke':
case 'card-column-style-fill':
case 'card-column-style-stroke':
title = $$$Text('Color','%DeepSee');
var k2 = (keyNo === '') ? '' : ':' + keyNo;
content.html = navigator.getColorChooserHTML(attr+k2,value,'svg');
break;
case 'card-titleStyle-font-family':
case 'card-subtitleStyle-font-family':
case 'card-columnHeaderStyle-font-family':
case 'card-labelStyle-font-family':
case 'card-valueLabelStyle-font-family':
case 'card-cellCaptionStyle-font-family':
case 'card-lampLabelStyle-font-family':
title = $$$Text('Font','%DeepSee');
var k2 = (keyNo === '') ? '' : ':' + keyNo;
content.html = navigator.getFontChooserHTML(attr+k2,value);
break;
}
content.title = title;
return content;
}

self._DeepSee_Component_Widget_scoreCardWidget_scorecardHeaderButtonClick = function(navigator,chart,key) {
switch(key) {
case 'card-addColumn':
var column = zenPage.createComponentNS("http://www.intersystems.com/deepsee",'scoreCardColumn');
column.parent = chart;
chart.columns[chart.columns.length] = column;
navigator.refreshTopSheet();
break;
default:
break;
}
}

self._DeepSee_Component_Widget_scoreCardWidget_GetKpiFilterCaption = function(pKPIName,pSpec) {
	return zenClassMethod(this,'GetKpiFilterCaption','L,L','VARCHAR',arguments);
}

self._DeepSee_Component_Widget_scoreCardWidget_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}

self._DeepSee_Component_Widget_scoreCardWidget_ResolveText = function(pEncodedText) {
	return zenInstanceMethod(this,'ResolveText','L','VARCHAR',arguments);
}
self._DeepSee_Component_Widget_scoreCardWidget__Loader = function() {
	zenLoadClass('_DeepSee_Component_Widget_widget');
	_DeepSee_Component_Widget_scoreCardWidget.prototype = zenCreate('_DeepSee_Component_Widget_widget',-1);
	var p = _DeepSee_Component_Widget_scoreCardWidget.prototype;
	if (null==p) {return;}
	p.constructor = _DeepSee_Component_Widget_scoreCardWidget;
	p.superClass = ('undefined' == typeof _DeepSee_Component_Widget_widget) ? zenMaster._DeepSee_Component_Widget_widget.prototype:_DeepSee_Component_Widget_widget.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%DeepSee.Component.Widget.scoreCardWidget';
	p._type = 'scoreCardWidget';
	p.serialize = _DeepSee_Component_Widget_scoreCardWidget_serialize;
	p.getSettings = _DeepSee_Component_Widget_scoreCardWidget_getSettings;
	p.GetKpiFilterCaption = _DeepSee_Component_Widget_scoreCardWidget_GetKpiFilterCaption;
	p.ReallyRefreshContents = _DeepSee_Component_Widget_scoreCardWidget_ReallyRefreshContents;
	p.ResolveText = _DeepSee_Component_Widget_scoreCardWidget_ResolveText;
	p.adjustContentSize = _DeepSee_Component_Widget_scoreCardWidget_adjustContentSize;
	p.exportPDF = _DeepSee_Component_Widget_scoreCardWidget_exportPDF;
	p.getDataController = _DeepSee_Component_Widget_scoreCardWidget_getDataController;
	p.getOverrides = _DeepSee_Component_Widget_scoreCardWidget_getOverrides;
	p.hasOverrides = _DeepSee_Component_Widget_scoreCardWidget_hasOverrides;
	p.isReady = _DeepSee_Component_Widget_scoreCardWidget_isReady;
	p.navCloseButtonClick = _DeepSee_Component_Widget_scoreCardWidget_navCloseButtonClick;
	p.navDataArrange = _DeepSee_Component_Widget_scoreCardWidget_navDataArrange;
	p.navDataChange = _DeepSee_Component_Widget_scoreCardWidget_navDataChange;
	p.navGetContentForLevel = _DeepSee_Component_Widget_scoreCardWidget_navGetContentForLevel;
	p.navHeaderButtonClick = _DeepSee_Component_Widget_scoreCardWidget_navHeaderButtonClick;
	p.onApplyFilters = _DeepSee_Component_Widget_scoreCardWidget_onApplyFilters;
	p.resetOverrides = _DeepSee_Component_Widget_scoreCardWidget_resetOverrides;
	p.rowClickHandler = _DeepSee_Component_Widget_scoreCardWidget_rowClickHandler;
	p.scorecardCloseButtonClick = _DeepSee_Component_Widget_scoreCardWidget_scorecardCloseButtonClick;
	p.scorecardDataArrange = _DeepSee_Component_Widget_scoreCardWidget_scorecardDataArrange;
	p.scorecardDataChange = _DeepSee_Component_Widget_scoreCardWidget_scorecardDataChange;
	p.scorecardGetContentForLevel = _DeepSee_Component_Widget_scoreCardWidget_scorecardGetContentForLevel;
	p.scorecardHeaderButtonClick = _DeepSee_Component_Widget_scoreCardWidget_scorecardHeaderButtonClick;
}

self._zenClassIdx['http://www.intersystems.com/deepsee/worksheet'] = '_DeepSee_Component_Widget_worksheet';
self._DeepSee_Component_Widget_worksheet = function(index,id) {
	if (index>=0) {_DeepSee_Component_Widget_worksheet__init(this,index,id);}
}

self._DeepSee_Component_Widget_worksheet__init = function(o,index,id) {
	('undefined' == typeof _DeepSee_Component_Widget_widget__init) ?zenMaster._DeepSee_Component_Widget_widget__init(o,index,id):_DeepSee_Component_Widget_widget__init(o,index,id);
	o.opacity = '1';
	o.opacityToolbar = '1';
}
function _DeepSee_Component_Widget_worksheet_serialize(set,s)
{
	var o = this;s[0]='1822821506';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.backgroundColor;s[9]=o.cellAlign;s[10]=o.cellSize;s[11]=o.cellStyle;s[12]=o.cellVAlign;s[13]=(o.centerHeader?1:0);s[14]=set.serializeList(o,o.children,true,'children');s[15]=set.serializeList(o,o.clickActions,false,'clickActions');s[16]=set.serializeList(o,o.clickActive,false,'clickActive');s[17]=o.clickFilterSpec;s[18]=set.serializeList(o,o.clickTargetProperties,false,'clickTargetProperties');s[19]=set.serializeList(o,o.clickTargets,false,'clickTargets');s[20]=o.colSpan;s[21]=o.colorToolbar;s[22]=o.containerStyle;s[23]=set.serializeList(o,o.controlIndices,false,'controlIndices');s[24]=o.currFilterSpec;s[25]=o.currItemNo;s[26]=o.currSeriesNo;s[27]=o.currValue;s[28]=o.currValueName;s[29]=o.dataSource;s[30]=(o.disabled?1:0);s[31]=(o.dragEnabled?1:0);s[32]=(o.dropEnabled?1:0);s[33]=(o.dynamic?1:0);s[34]=o.enclosingClass;s[35]=o.enclosingStyle;s[36]=o.error;s[37]=set.serializeArray(o,o.filterDefault,false,'filterDefault');s[38]=set.serializeArray(o,o.filterState,false,'filterState');s[39]=set.serializeArray(o,o.filterText,false,'filterText');s[40]=(o.forceToolbar?1:0);s[41]=o.groupClass;s[42]=o.groupStyle;s[43]=(o.hasInitialFilters?1:0);s[44]=o.header;s[45]=o.headerLayout;s[46]=o.height;s[47]=(o.hidden?1:0);s[48]=o.hint;s[49]=o.hintClass;s[50]=o.hintStyle;s[51]=o.homeCol;s[52]=o.homeRow;s[53]=o.imageAppLogo;s[54]=o.imageAppLogoWidth;s[55]=o.imageClose;s[56]=o.imageCloseHover;s[57]=o.imageCloseWidth;s[58]=o.imageContract;s[59]=o.imageContractHover;s[60]=o.imageContractWidth;s[61]=o.imageExpand;s[62]=o.imageExpandHover;s[63]=o.imageExpandWidth;s[64]=o.imageMaximize;s[65]=o.imageMaximizeHover;s[66]=o.imageMaximizeWidth;s[67]=o.imageMinimize;s[68]=o.imageMinimizeHover;s[69]=o.imageMinimizeWidth;s[70]=o.imageResize;s[71]=o.imageResizeSize;s[72]=(o.isClosed?1:0);s[73]=o.label;s[74]=o.labelClass;s[75]=o.labelDisabledClass;s[76]=o.labelPosition;s[77]=o.labelStyle;s[78]=o.layout;s[79]=o.linkWidgetKey;s[80]=(o.maximized?1:0);s[81]=o.minWidth;s[82]=(o.moveEnabled?1:0);s[83]=o.onafterdrag;s[84]=o.onbeforedrag;s[85]=o.onclick;s[86]=o.onclosepending;s[87]=o.ondrag;s[88]=o.ondrop;s[89]=o.onhide;s[90]=o.onrefresh;s[91]=o.onresize;s[92]=o.onshow;s[93]=o.onupdate;s[94]=o.onwindowdrop;s[95]=o.onwindowgrab;s[96]=o.opacity;s[97]=o.opacityToolbar;s[98]=o.overlayMode;s[99]=o.prevHomeCol;s[100]=o.prevHomeRow;s[101]=(o.previewMode?1:0);s[102]=o.renderFlag;s[103]=(o.resizeEnabled?1:0);s[104]=o.rowSpan;s[105]=o.sessionCookie;s[106]=set.serializeArray(o,o.settings,false,'settings');s[107]=(o.showLabel?1:0);s[108]=(o.showSidebar?1:0);s[109]=(o.showToolbar?1:0);s[110]=(o.showToolbarBottomBorder?1:0);s[111]=(o.showToolbarOnlyWhenMaximized?1:0);s[112]=o.sidebarContent;s[113]=o.sidebarWidth;s[114]=o.slice;s[115]=o.subtype;s[116]=o.title;s[117]=o.tuple;s[118]=o.valign;s[119]=(o.visible?1:0);s[120]=o.widgetKey;s[121]=o.widgetLayout;s[122]=o.width;
}
function _DeepSee_Component_Widget_worksheet_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._DeepSee_Component_Widget_worksheet_adjustContentSize = function(load,width,height) {
var grid = this.findComponent('grid');
if (grid) {
grid.setSize(width - 10,height);
if (load) {
this.applyModelToGrid();
}
}
}

self._DeepSee_Component_Widget_worksheet_applyFilter = function(name,value) {
}

self._DeepSee_Component_Widget_worksheet_applyFilters = function(refresh) {
var json = zen(this.id+'/json');
if (json) {
json.reloadContents();
}
this.getGrid().render();
this.onApplyFilters(refresh);
}

self._DeepSee_Component_Widget_worksheet_applyModelToGrid = function() {
var model = this.getModel();
var grid = this.getGrid();
if (model) {
grid.style = zenGet(model.style);
grid.format = zenGet(model.format);
grid.selectMode = zenGet(model.selectMode);
grid.columnWidth = zenGet(model.columnWidth,150);
grid.columnHeaderStyle = zenGet(model.columnHeaderStyle);
grid.rowHeaderStyle = zenGet(model.rowHeaderStyle);
grid.showZebra = zenGet(model.showZebra) ? true : false;
grid.evenRowBackground = zenGet(model.evenRowBackground,'#F8F8F8');
grid.evenRowColor = zenGet(model.evenRowColor);
grid.oddRowBackground = zenGet(model.oddRowBackground);
grid.oddRowColor = zenGet(model.oddRowColor);
grid.currCellBackground = zenGet(model.currCellBackground,'#D0D0FF');
grid.currCellColor = zenGet(model.currCellColor,'black');
grid.render();
}
}

self._DeepSee_Component_Widget_worksheet_exportPDF = function() {
if ('' != this.dataSource) {
var url = '_DeepSee.UI.WorksheetPDF.zen?WORKSHEET=' + encodeURIComponent(this.dataSource);
window.open(url,"_blank");
}
}

self._DeepSee_Component_Widget_worksheet_getCellOverride = function(row,col) {
var info = null;
var model = this.getModel();
if (model && model.cells && model.cells.length) {
for (var n = 0; n < model.cells.length; n++) {
var cell = model.cells[n];
if (cell && cell.row==row && cell.column == col) {
info = {};
if (cell.format) {
info.format = cell.format;
}
if (cell.style) {
info.style = cell.style;
}
break;
}
}
}
return info;
}

self._DeepSee_Component_Widget_worksheet_getColumnDescriptors = function() {
var model = this.getModel();
if (model && model.columnHeaders) {
return model.columnHeaders;
}
return null;
}

self._DeepSee_Component_Widget_worksheet_getData = function(d1,d2,d3) {
var value = '';
var model = this.getModel();
if (model && model.values) {
value = model.values[d1] ? model.values[d1][d2] : '';
}
return value;
}

self._DeepSee_Component_Widget_worksheet_getDataByName = function(prop,series) {
var value = '';
var model = this.getModel();
if (model && model.values) {
var cols = model.values[series].length;
var col = -1;
for (var n = 0; n < cols; n++) {
if (model.columnHeaders[n].name == prop) {
col = n;
break;
}
}
if (col>=0) {
value = model.values[series][col];
}
}
return value;
}

self._DeepSee_Component_Widget_worksheet_getDimSize = function(dim) {
var model = this.getModel();
if (model) {
switch (dim) {
case 1:
return (model.rowHeaders && model.rowHeaders.length) ? model.rowHeaders.length : 1;
case 2:
return (model.columnHeaders && model.columnHeaders.length) ? model.columnHeaders.length : 1;
}
}
return '';
}

self._DeepSee_Component_Widget_worksheet_getGrid = function() {
return zen(this.id+'/grid');
}

self._DeepSee_Component_Widget_worksheet_getLabel = function(n,dim) {
var model = this.getModel();
switch (dim) {
case 1:
if (model && model.rowHeaders) {
return model.rowHeaders[n].name;
}
break;
case 2:
if (model && model.columnHeaders) {
return model.columnHeaders[n].name;
}
break;
}
return '';
}

self._DeepSee_Component_Widget_worksheet_getModel = function() {
return zen(this.id+'/json').getContentObject();
}

self._DeepSee_Component_Widget_worksheet_getPropertyName = function(n) {
var model = this.getModel();
if (model && model.columnHeaders && model.columnHeaders[n]) {
return model.columnHeaders[n].name;
}
return '';
}

self._DeepSee_Component_Widget_worksheet_getRowDescriptors = function() {
var model = this.getModel();
if (model && model.rowHeaders) {
return model.rowHeaders;
}
return null;
}

self._DeepSee_Component_Widget_worksheet_notifyController = function(source,reason,prop,value,row) {
var model = this.getModel();
if (model && model.values) {
var cols = model.values[row].length;
var col = -1;
for (var n = 0; n < cols; n++) {
if (model.columnHeaders[n].name == prop) {
col = n;
break;
}
}
if (col>=0) {
if (model.values[row][col] != value) {
this.setModified(true);
}
model.values[row][col] = value;
this.selectCell(row+1,col+1);
}
}
return value;
}

self._DeepSee_Component_Widget_worksheet_GetKpiFilterCaption = function(pKPIName,pSpec) {
	return zenClassMethod(this,'GetKpiFilterCaption','L,L','VARCHAR',arguments);
}

self._DeepSee_Component_Widget_worksheet_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}

self._DeepSee_Component_Widget_worksheet_ResolveText = function(pEncodedText) {
	return zenInstanceMethod(this,'ResolveText','L','VARCHAR',arguments);
}
self._DeepSee_Component_Widget_worksheet__Loader = function() {
	zenLoadClass('_DeepSee_Component_Widget_widget');
	_DeepSee_Component_Widget_worksheet.prototype = zenCreate('_DeepSee_Component_Widget_widget',-1);
	var p = _DeepSee_Component_Widget_worksheet.prototype;
	if (null==p) {return;}
	p.constructor = _DeepSee_Component_Widget_worksheet;
	p.superClass = ('undefined' == typeof _DeepSee_Component_Widget_widget) ? zenMaster._DeepSee_Component_Widget_widget.prototype:_DeepSee_Component_Widget_widget.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%DeepSee.Component.Widget.worksheet';
	p._type = 'worksheet';
	p.serialize = _DeepSee_Component_Widget_worksheet_serialize;
	p.getSettings = _DeepSee_Component_Widget_worksheet_getSettings;
	p.GetKpiFilterCaption = _DeepSee_Component_Widget_worksheet_GetKpiFilterCaption;
	p.ReallyRefreshContents = _DeepSee_Component_Widget_worksheet_ReallyRefreshContents;
	p.ResolveText = _DeepSee_Component_Widget_worksheet_ResolveText;
	p.adjustContentSize = _DeepSee_Component_Widget_worksheet_adjustContentSize;
	p.applyFilter = _DeepSee_Component_Widget_worksheet_applyFilter;
	p.applyFilters = _DeepSee_Component_Widget_worksheet_applyFilters;
	p.applyModelToGrid = _DeepSee_Component_Widget_worksheet_applyModelToGrid;
	p.exportPDF = _DeepSee_Component_Widget_worksheet_exportPDF;
	p.getCellOverride = _DeepSee_Component_Widget_worksheet_getCellOverride;
	p.getColumnDescriptors = _DeepSee_Component_Widget_worksheet_getColumnDescriptors;
	p.getData = _DeepSee_Component_Widget_worksheet_getData;
	p.getDataByName = _DeepSee_Component_Widget_worksheet_getDataByName;
	p.getDimSize = _DeepSee_Component_Widget_worksheet_getDimSize;
	p.getGrid = _DeepSee_Component_Widget_worksheet_getGrid;
	p.getLabel = _DeepSee_Component_Widget_worksheet_getLabel;
	p.getModel = _DeepSee_Component_Widget_worksheet_getModel;
	p.getPropertyName = _DeepSee_Component_Widget_worksheet_getPropertyName;
	p.getRowDescriptors = _DeepSee_Component_Widget_worksheet_getRowDescriptors;
	p.notifyController = _DeepSee_Component_Widget_worksheet_notifyController;
}
/* EOF */