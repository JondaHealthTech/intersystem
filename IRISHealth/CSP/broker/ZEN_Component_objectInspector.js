/*** Zen Module: ZEN_Component_objectInspector ***/

self._zenClassIdx['objectInspector'] = '_ZEN_Component_objectInspector';
self._ZEN_Component_objectInspector = function(index,id) {
	if (index>=0) {_ZEN_Component_objectInspector__init(this,index,id);}
}

self._ZEN_Component_objectInspector__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_dynaGrid__init) ?zenMaster._ZEN_Component_dynaGrid__init(o,index,id):_ZEN_Component_dynaGrid__init(o,index,id);
	o.controller = '';
	o.controllerId = '';
	o.currMember = '';
	o.currMemberType = '';
	o.gridClass = 'inspectorGrid';
	o.gridLabel = 'Property';
	o.idEditable = false;
	o.onedit = '';
	o.ongetcontroller = '';
	o.onnotifyView = '';
	o.onselect = '';
	o.readOnly = false;
	o.rowLabelWidth = '150';
	o.showAll = false;
	o.onCreate();
}
function _ZEN_Component_objectInspector_serialize(set,s)
{
	var o = this;s[0]='1261455703';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.OnCreateDataSet;s[7]=o.align;s[8]=o.aux;s[9]=o.borders;s[10]=set.serializeList(o,o.cells,true,'cells');s[11]=o.clientType;s[12]=o.columnHeaderStyle;s[13]=o.columnWidth;s[14]=set.serializeList(o,o.columns,true,'columns');s[15]=o.containerStyle;s[16]=o.controlClass;s[17]=o.controlStyle;s[18]=o.controller;s[19]=o.controllerId;s[20]=o.currColumn;s[21]=o.currMember;s[22]=o.currMemberType;s[23]=o.currPage;s[24]=o.currRow;s[25]=o.dataBinding;s[26]=set.addObject(o.dataSet,'dataSet');s[27]=(o.disabled?1:0);s[28]=(o.dragEnabled?1:0);s[29]=(o.dropEnabled?1:0);s[30]=(o.dynamic?1:0);s[31]=(o.editLabels?1:0);s[32]=o.enclosingClass;s[33]=o.enclosingStyle;s[34]=o.error;s[35]=o.format;s[36]=o.gridClass;s[37]=o.gridLabel;s[38]=o.height;s[39]=(o.hidden?1:0);s[40]=o.hint;s[41]=o.hintClass;s[42]=o.hintStyle;s[43]=(o.idEditable?1:0);s[44]=(o.invalid?1:0);s[45]=o.invalidMessage;s[46]=o.label;s[47]=o.labelClass;s[48]=o.labelDisabledClass;s[49]=o.labelStyle;s[50]=(o.multiSelect?1:0);s[51]=(o.nowrap?1:0);s[52]=o.onafterdrag;s[53]=o.onarrowclick;s[54]=o.onbeforedrag;s[55]=o.onblur;s[56]=o.onchange;s[57]=o.onchangecell;s[58]=o.onchangepage;s[59]=o.onclick;s[60]=o.onclickcolumn;s[61]=o.onclicklabel;s[62]=o.onclickrow;s[63]=o.ondblclick;s[64]=o.ondrag;s[65]=o.ondrawcell;s[66]=o.ondrop;s[67]=o.onedit;s[68]=o.oneditcell;s[69]=o.oneditkeydown;s[70]=o.oneditkeyup;s[71]=o.onfocus;s[72]=o.ongetcellvalue;s[73]=o.ongetcontroller;s[74]=o.onhide;s[75]=o.onkeydown;s[76]=o.onkeypress;s[77]=o.onkeyup;s[78]=o.onmousedown;s[79]=o.onmouseout;s[80]=o.onmouseover;s[81]=o.onmouseup;s[82]=o.onnotifyView;s[83]=o.onrefresh;s[84]=o.onrender;s[85]=o.onselect;s[86]=o.onselectcell;s[87]=o.onshow;s[88]=o.onsubmit;s[89]=o.ontouchend;s[90]=o.ontouchmove;s[91]=o.ontouchstart;s[92]=o.onupdate;s[93]=o.onvalidate;s[94]=o.originalValue;s[95]=o.overlayMode;s[96]=(o.readOnly?1:0);s[97]=o.renderFlag;s[98]=(o.required?1:0);s[99]=o.requiredMessage;s[100]=o.rowHeaderStyle;s[101]=o.rowLabelWidth;s[102]=set.serializeList(o,o.rows,true,'rows');s[103]=(o.scrollIntoView?1:0);s[104]=o.selectedCellBackground;s[105]=o.selectedCellColor;s[106]=o.selectedRange;s[107]=o.selectedRangeBackground;s[108]=(o.showAll?1:0);s[109]=(o.showArrows?1:0);s[110]=(o.showColumnLabels?1:0);s[111]=(o.showLabel?1:0);s[112]=(o.showRowLabels?1:0);s[113]=(o.showZebra?1:0);s[114]=o.slice;s[115]=o.style;s[116]=o.tabIndex;s[117]=o.title;s[118]=o.tuple;s[119]=o.valign;s[120]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[121]=(o.visible?1:0);s[122]=o.width;
}
function _ZEN_Component_objectInspector_getSettings(s)
{
	s['name'] = 'string';
	s['controllerId'] = 'id';
	s['currMember'] = 'string';
	s['currMemberType'] = 'string';
	s['idEditable'] = 'boolean';
	s['onedit'] = 'eventHandler';
	s['ongetcontroller'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	s['onselect'] = 'eventHandler';
	s['readOnly'] = 'boolean';
	s['showAll'] = 'boolean';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_objectInspector_acquireData = function() {
if (!this._dataLoaded) {
var obj = this.currObject;
this._labels = new Array();
this._data = new Array();
this._dataTypes = new Object();  // indexed by property
if (null == obj) {
}
else if (obj instanceof Array) {
/* !!!
for (var n = 0; n < obj.length; n++) {
var mbr = n;
var cls = '';
var btn = '';
var dblclk = '';
if (mbr == this.currMember) {
cls = 'class="objectInspectorSelected"';
if (!this.readOnly) {
btn = '<input type="button" class="objectInspectorButton" value="" onclick="zenPage.getComponent('+this.index+').editArrayItem(\''+mbr+'\');">';
dblclk = 'ondblclick="zenPage.getComponent('+this.index+').editArrayItem(\''+mbr+'\');"';
}
}
var val;
var lblCls;
lblCls = 'objectInspectorSetting';
val = obj[n];
val = (null != val) ? val : '<i>null</i>';
val = (typeof(val) == 'function') ? '<i>method</i>' : val;
if (val.length && val.length > 30) {
val = val.substr(0,30) + '&#8230;'; // clip
}
html[html.length] = '<tr '+cls+' '+dblclk+' onclick="zenPage.getComponent('+this.index+').selectMember(\''+mbr+'\',\''+mbrType+'\');"><td width="50%" class="'+lblCls+'" title="'+mbr+'">&#160;'+mbr+'&#160;</td><td nowrap width="50%">'+btn+'&#160;'+val+'&#160;</td></tr>';
}
*/
}
else {
var settings = new Object();
obj.getSettings(settings);
var props = new Array();
if ('undefined' != typeof obj._type) {
this._labels[this._labels.length] = 'type';
this._data[this._data.length] = obj._type;
this._dataTypes['type'] = 'readonly';
this._labels[this._labels.length] = 'index';
this._data[this._data.length] = obj.index;
this._dataTypes['index'] = 'readonly';
}
for (var mbr in obj) {
if ((this.showAll || (null!=settings[mbr]) || ('parent'==mbr)) && (mbr != 'index') && (mbr != '_type') && (mbr != 'constructor')) {
props[props.length] = mbr;
}
}
props.sort();
for (var i = 0; i < props.length; i++) {
var mbr = props[i];
var mbrType = settings[mbr];
if (mbr == this.currMember) {
}
if (settings[mbr] && obj.getProperty) {
val = obj.getProperty(mbr);
}
else {
val = obj[mbr];
}
val = this.getDisplayValue(val);
this._labels[this._labels.length] = mbr;
this._data[this._data.length] = val;
if ('id' == mbr && !this.idEditable) {
this._dataTypes[mbr] = 'readonly';
}
else {
this._dataTypes[mbr] = mbrType;
}
}
}
this._dataLoaded = true;
}
}

self._ZEN_Component_objectInspector_applyValue = function(property,value) {
var obj = this.getCurrObject();
var mbrType = this._dataTypes ? this._dataTypes[property] : null;
mbrType = (null == mbrType) ? 'string' : mbrType;
if (mbrType == 'boolean') {
value = zenBool(value);
}
var handled = obj.setProperty(property,value);
if (!handled && obj.refreshContents) {
obj.refreshContents();
}
}

self._ZEN_Component_objectInspector_connectToController = function() {
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

self._ZEN_Component_objectInspector_dblClickHandler = function() {
var r = this.currRow - 1;
var type = this.getRowType(r);
var mbr = this.getRowMemberName(r);
if ('boolean' == type && 1==this.currColumn) {
var b = !zenBool(this.getData(r,0));
this.setCellValue(b, this.currRow, 1);
}
else if ('readonly' != type) {
this.editMember(mbr);
}
}

self._ZEN_Component_objectInspector_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._ZEN_Component_objectInspector_editMember = function(name) {
if (typeof this.currObject[this.currMember] == 'object') {
this.setCurrObject(this.currObject[this.currMember]);
return;
}
if ('' != this.onedit) {
zenInvokeCallbackMethod(this.onedit,this,'onedit');
return;
}
var obj = this.getCurrObject();
var mbr = name!=""?name:this.getCurrMember();
if (zenPage && obj && '' != mbr) {
var value = obj.getProperty(mbr);
var mbrType = this.getCurrMemberType();
if (mbrType == 'boolean') {
value = (value) ? '1' : '0';
}
var parms = new Object();
parms.property = mbr;
parms.className = obj._serverClass;
parms.value = value;
parms.type = mbrType;
zenPage.launchPopupWindow('%ZEN.Dialog.componentValueEditor.cls','ValueEditor','resizable,width=500,height=500',parms,this);
}
}

self._ZEN_Component_objectInspector_getCellContents = function(data,r,c) {
if (c == 2) {
var mbr = this.getRowMemberName(r-1);
var type = this.getRowType(r-1);
data = '<div id="'+this.makeId('puBtn_'+r)+'" class="objectInspectorButtonDiv" style="display:none;">';
if ('readonly' != type) {
data += '<input class="objectInspectorButton" title="Launch the Value Editor" type="button" onclick="zenPage.getComponent('+this.index+').editMember(\''+mbr+'\');"/>';
}
data += '</div>';
}
else {
var usercode = '';
if (this.ondrawcell) {
this.row = r;
this.column = c;
usercode = zenInvokeCallbackMethod(this.ondrawcell,this,'ondrawcell','data',data);
delete this.row;
delete this.column;
}
if (usercode && '' != usercode) {
data = usercode;
}
else {
if ('' == data) {
data = '&#160;';
}
else {
data = zenEscapeXML(data);
}
}
}
return data;
}

self._ZEN_Component_objectInspector_getColumnInfo = function(c) {
var info = null;
if (1 == c) {
info = new Object();
info.readOnly = true;
info.width = 20;
info.style = 'padding:0px;height:20px;text-align:center;';
info.label = '';
}
return info;
}

self._ZEN_Component_objectInspector_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._ZEN_Component_objectInspector_getCurrMember = function() {
return this.currMember;
}

self._ZEN_Component_objectInspector_getCurrMemberType = function() {
return this.currMemberType;
}

self._ZEN_Component_objectInspector_getCurrObject = function() {
return this.currObject;
}

self._ZEN_Component_objectInspector_getData = function(d1,d2,d3) {
var data = (0==d2) ? this._data[d1] : null;
return (null == data) ? '' : data;
}

self._ZEN_Component_objectInspector_getDataSet = function() {
return this;
}

self._ZEN_Component_objectInspector_getDimSize = function(dim) {
this.acquireData();
switch(dim) {
case 1:
return this._data.length;
case 2:
return 2;
default:
return 0;
}
}

self._ZEN_Component_objectInspector_getDimensions = function() {
return 2;
}

self._ZEN_Component_objectInspector_getDisplayValue = function(val) {
switch(typeof val) {
case 'function':
val = '(method)';
break;
case 'object':
val = '(object)';
break;
case 'boolean':
val = val ? 'true' : 'false';
break;
case 'undefined':
val = '(null)';
break;
case 'string':
case 'number':
break;
}
val = (null != val) ? val : '(null)';
return val;
}

self._ZEN_Component_objectInspector_getEditCellHTML = function(r,c,value,which) {
var html = '';
var type = this.getRowType(r-1);
switch(type) {
case 'boolean':
value = zenBool(value);
html = '<select class="dynaGridInput" id="cellEditor" type="text" onblur="zenPage.getComponent('+this.index+').stopEditCell();" onchange="zenPage.getComponent('+this.index+').stopEditCell();"><option value="true"'+(value?' selected':'')+'>true</option><option value="false" '+(!value?' selected':'')+'>false</option></select>';
break;
default:
html = '<input class="dynaGridInput" id="cellEditor" type="text" value="'+zenEscapeXML(value)+'" onkeydown="zenPage.getComponent('+this.index+').cellEditKeyHandler(event);" onblur="zenPage.getComponent('+this.index+').stopEditCell();">';
break;
}
var usercode = '';
if (this.oneditcell) {
usercode = zenInvokeCallbackMethod(this.oneditcell,this,'oneditcell','value',value);
}
if (usercode && '' != usercode) {
html = usercode;
}
else {
}
return html;
}

self._ZEN_Component_objectInspector_getLabel = function(n,dim) {
var label = null;
switch(dim) {
case 1:
label = this._labels[n];
break;
case 2:
label = (0==n) ? 'Value' : '';
break;
default:
break;
}
return (null == label) ? '' : label;
}

self._ZEN_Component_objectInspector_getRowInfo = function(r) {
var type = this.getRowType(r);
var info = new Object();
if ('readonly' == type) {
info.readOnly = true;
}
info.title = this.getRowMemberName(r);
info.format = '';
info.label = info.title;
return info;
}

self._ZEN_Component_objectInspector_getRowMemberName = function(r) {
var lbl = this._labels ? this._labels[r] : '';
return (null == lbl) ? '' : lbl;
}

self._ZEN_Component_objectInspector_getRowType = function(r) {
var type = '';
var mbr = this.getRowMemberName(r);
if ('' != mbr) {
type = this._dataTypes[mbr];
}
return type;
}

self._ZEN_Component_objectInspector_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._ZEN_Component_objectInspector_onCreate = function() {
this.ondblclick = 'zenPage.getComponent('+this.index+').dblClickHandler();'
this.currObject = null;
this.currMember = '';
return this.invokeSuper('onCreate',arguments);
}

self._ZEN_Component_objectInspector_onPopupAction = function(popupName,action,value) {
switch(popupName) {
case 'ValueEditor':
switch (action) {
case 'ok':
case 'apply':
var mbr = this.getCurrMember();
var r = 0;
for (var n = 0; n < this._labels.length; n++) {
if (this._labels[n] == mbr) {
r = n+1;
break;
}
}
if (r > 0) {
this.setCellValue(value, r, 1);
}
if ('ok' == action) {
this.setCurrMember('');
}
break;
}
break;
}
}

self._ZEN_Component_objectInspector_renderInspector = function() {
this._dataLoaded = false;
this.render();
}

self._ZEN_Component_objectInspector_selectCellHandler = function(r,c) {
var type = this.getRowType(r-1);
this.currMemberType = type;
this.currMember = this.getRowMemberName(r-1);
zenInvokeCallbackMethod(this.onselect,this,'onedit');
if (this._oldRow) {
var oldbtn = this.findElement('puBtn_'+this._oldRow);
if (oldbtn) {
oldbtn.style.display = 'none';
}
}
this._oldRow = r;
var newbtn = this.findElement('puBtn_'+r);
if (newbtn) {
newbtn.style.display = '';
}
}

self._ZEN_Component_objectInspector_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._ZEN_Component_objectInspector_setCellValue = function(value,r,c) {
var type = this.getRowType(r-1);
if ('boolean' == type) {
value = zenBool(value);
}
value = this.getDisplayValue(value);
return this.invokeSuper('setCellValue',arguments);
}

self._ZEN_Component_objectInspector_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._ZEN_Component_objectInspector_setCurrMember = function(name) {
this.currMember = name;
var r = 0;
for (var n = 0; n < this._labels.length; n++) {
if (this._labels[n] == name) {
r = n+1;
break;
}
}
if (r > 0) {
this.selectCell(r, 1);
}
}

self._ZEN_Component_objectInspector_setCurrObject = function(obj) {
this.currObject = obj;
this.currMember = '';
this.renderInspector();
}

self._ZEN_Component_objectInspector_setData = function(value,d1,d2,d3) {
var property = this._labels[d1];
this._data[d1] = this.getDisplayValue(value);
this.applyValue(property,value);
}

self._ZEN_Component_objectInspector_showCellButton = function(r,c) {
return true;
}

self._ZEN_Component_objectInspector_update = function() {
this.renderInspector();
}

self._ZEN_Component_objectInspector_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_objectInspector__Loader = function() {
	zenLoadClass('_ZEN_Component_dynaGrid');
	_ZEN_Component_objectInspector.prototype = zenCreate('_ZEN_Component_dynaGrid',-1);
	var p = _ZEN_Component_objectInspector.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_objectInspector;
	p.superClass = ('undefined' == typeof _ZEN_Component_dynaGrid) ? zenMaster._ZEN_Component_dynaGrid.prototype:_ZEN_Component_dynaGrid.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.objectInspector';
	p._type = 'objectInspector';
	p.serialize = _ZEN_Component_objectInspector_serialize;
	p.getSettings = _ZEN_Component_objectInspector_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_objectInspector_ReallyRefreshContents;
	p.acquireData = _ZEN_Component_objectInspector_acquireData;
	p.applyValue = _ZEN_Component_objectInspector_applyValue;
	p.connectToController = _ZEN_Component_objectInspector_connectToController;
	p.dblClickHandler = _ZEN_Component_objectInspector_dblClickHandler;
	p.disconnectFromController = _ZEN_Component_objectInspector_disconnectFromController;
	p.editMember = _ZEN_Component_objectInspector_editMember;
	p.getCellContents = _ZEN_Component_objectInspector_getCellContents;
	p.getColumnInfo = _ZEN_Component_objectInspector_getColumnInfo;
	p.getController = _ZEN_Component_objectInspector_getController;
	p.getCurrMember = _ZEN_Component_objectInspector_getCurrMember;
	p.getCurrMemberType = _ZEN_Component_objectInspector_getCurrMemberType;
	p.getCurrObject = _ZEN_Component_objectInspector_getCurrObject;
	p.getData = _ZEN_Component_objectInspector_getData;
	p.getDataSet = _ZEN_Component_objectInspector_getDataSet;
	p.getDimSize = _ZEN_Component_objectInspector_getDimSize;
	p.getDimensions = _ZEN_Component_objectInspector_getDimensions;
	p.getDisplayValue = _ZEN_Component_objectInspector_getDisplayValue;
	p.getEditCellHTML = _ZEN_Component_objectInspector_getEditCellHTML;
	p.getLabel = _ZEN_Component_objectInspector_getLabel;
	p.getRowInfo = _ZEN_Component_objectInspector_getRowInfo;
	p.getRowMemberName = _ZEN_Component_objectInspector_getRowMemberName;
	p.getRowType = _ZEN_Component_objectInspector_getRowType;
	p.notifyView = _ZEN_Component_objectInspector_notifyView;
	p.onCreate = _ZEN_Component_objectInspector_onCreate;
	p.onPopupAction = _ZEN_Component_objectInspector_onPopupAction;
	p.renderInspector = _ZEN_Component_objectInspector_renderInspector;
	p.selectCellHandler = _ZEN_Component_objectInspector_selectCellHandler;
	p.sendEventToController = _ZEN_Component_objectInspector_sendEventToController;
	p.setCellValue = _ZEN_Component_objectInspector_setCellValue;
	p.setControllerId = _ZEN_Component_objectInspector_setControllerId;
	p.setCurrMember = _ZEN_Component_objectInspector_setCurrMember;
	p.setCurrObject = _ZEN_Component_objectInspector_setCurrObject;
	p.setData = _ZEN_Component_objectInspector_setData;
	p.showCellButton = _ZEN_Component_objectInspector_showCellButton;
	p.update = _ZEN_Component_objectInspector_update;
}
/* EOF */