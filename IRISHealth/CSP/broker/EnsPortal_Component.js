/*** Zen Module: EnsPortal_Component ***/

self._zenClassIdx['packageText'] = 'EnsPortal_Component_packageText';
self.EnsPortal_Component_packageText = function(index,id) {
	if (index>=0) {EnsPortal_Component_packageText__init(this,index,id);}
}

self.EnsPortal_Component_packageText__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_control__init) ?zenMaster._ZEN_Component_control__init(o,index,id):_ZEN_Component_control__init(o,index,id);
	o.controlClass = 'comboboxInput';
	o.invalidDateMessage = 'Invalid Date';
	o.maxDate = '';
	o.minDate = '';
	o.onshowPopup = '';
}
function EnsPortal_Component_packageText_serialize(set,s)
{
	var o = this;s[0]='2348336950';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.clientType;s[9]=o.containerStyle;s[10]=o.controlClass;s[11]=o.controlStyle;s[12]=o.dataBinding;s[13]=(o.disabled?1:0);s[14]=(o.dragEnabled?1:0);s[15]=(o.dropEnabled?1:0);s[16]=(o.dynamic?1:0);s[17]=o.enclosingClass;s[18]=o.enclosingStyle;s[19]=o.error;s[20]=o.height;s[21]=(o.hidden?1:0);s[22]=o.hint;s[23]=o.hintClass;s[24]=o.hintStyle;s[25]=(o.invalid?1:0);s[26]=o.invalidDateMessage;s[27]=o.invalidMessage;s[28]=o.label;s[29]=o.labelClass;s[30]=o.labelDisabledClass;s[31]=o.labelStyle;s[32]=o.maxDate;s[33]=o.minDate;s[34]=o.onafterdrag;s[35]=o.onbeforedrag;s[36]=o.onblur;s[37]=o.onchange;s[38]=o.onclick;s[39]=o.ondblclick;s[40]=o.ondrag;s[41]=o.ondrop;s[42]=o.onfocus;s[43]=o.onhide;s[44]=o.onkeydown;s[45]=o.onkeypress;s[46]=o.onkeyup;s[47]=o.onmousedown;s[48]=o.onmouseout;s[49]=o.onmouseover;s[50]=o.onmouseup;s[51]=o.onrefresh;s[52]=o.onshow;s[53]=o.onshowPopup;s[54]=o.onsubmit;s[55]=o.ontouchend;s[56]=o.ontouchmove;s[57]=o.ontouchstart;s[58]=o.onupdate;s[59]=o.onvalidate;s[60]=o.originalValue;s[61]=o.overlayMode;s[62]=(o.readOnly?1:0);s[63]=o.renderFlag;s[64]=(o.required?1:0);s[65]=o.requiredMessage;s[66]=(o.showLabel?1:0);s[67]=o.slice;s[68]=o.tabIndex;s[69]=o.title;s[70]=o.tuple;s[71]=o.valign;s[72]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[73]=(o.visible?1:0);s[74]=o.width;
}
function EnsPortal_Component_packageText_getSettings(s)
{
	s['name'] = 'string';
	s['invalidDateMessage'] = 'caption';
	s['maxDate'] = 'string';
	s['minDate'] = 'string';
	s['onshowPopup'] = 'eventHandler';
	this.invokeSuper('getSettings',arguments);
}

self.EnsPortal_Component_packageText_applyDate = function(group) {
var value = group.getValue();
var oldval = this.value;
var ctrl = this.findElement('control');
ctrl.value = value;
this.value = value;
if (oldval != this.value) {
this.onchangeHandler();
}
}

self.EnsPortal_Component_packageText_isValid = function() {
var value = this.getValue();
if ('' == value) return true;
var d = zenParseDate(value);
if (-1 == d) return false;
if (('' != this.minDate)||('' != this.maxDate)) {
var currD = zenStringToDate(value);
}
if ('' != this.minDate) {
var minD = zenStringToDate(this.minDate);
if (minD.getTime() > currD.getTime()) return false;
}
if ('' != this.maxDate) {
var maxD = zenStringToDate(this.maxDate);
if (maxD.getTime() < currD.getTime()) return false;
}
return true;
}

self.EnsPortal_Component_packageText_ondatechangeHandler = function() {
var ctrl = this.findElement('control');
zenASSERT(ctrl,'Unable to find input element',arguments);
var v = zenParseDate(ctrl.value);
ctrl.value = (-1 == v) ? this.invalidDateMessage : v;
this.onchangeHandler();
}

self.EnsPortal_Component_packageText_setProperty = function(property,value,value2) {
var el = this.findElement('control');
switch(property) {
case 'value':
this.value = value;
if (el) {
el.value = value;
}
break;
case 'disabled':
case 'readOnly':
this.invokeSuper('setProperty',arguments);
var btn = this.findElement('btn');
if (btn) {
btn.disabled = this.readOnly || this.disabled;
}
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self.EnsPortal_Component_packageText_showDateSelector = function() {
if (this.disabled || this.readOnly) return;
var ctrl = this.findElement('control');
zenASSERT(ctrl,'Unable to find input element',arguments);
var value = ctrl.value;
var top,left;
var top = zenGetTop(ctrl) + ctrl.offsetHeight - zenGetTopScroll(ctrl);
var left = zenGetLeft(ctrl) - zenGetLeftScroll(ctrl);
top += document.body.scrollTop;
left += document.body.scrollLeft;
var group = zenPage.createComponent('modalGroup');
group.setProperty('onaction','zenPage.getComponent('+this.index+').applyDate(group);');
var calParms = new Object();
if ('' != this.minDate) {
var minD = zenParseDate(this.minDate);
if (-1 != minD) {
var year = parseInt(minD.substr(0,4),10);
calParms['minDate'] = this.minDate;
calParms['startYear'] = year;
}
}
if ('' != this.maxDate) {
var maxD = zenParseDate(this.maxDate);
if (-1 != maxD) {
var year = parseInt(maxD.substr(0,4),10);
calParms['maxDate'] = this.maxDate;
calParms['endYear'] = year;
}
}
zenInvokeCallbackMethod(this.onshowPopup,this,'onshowPopup','settings',calParms);
group.show('','calendar',value,top,left,null,null,calParms);
}

self.EnsPortal_Component_packageText_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self.EnsPortal_Component_packageText__Loader = function() {
	zenLoadClass('_ZEN_Component_control');
	EnsPortal_Component_packageText.prototype = zenCreate('_ZEN_Component_control',-1);
	var p = EnsPortal_Component_packageText.prototype;
	if (null==p) {return;}
	p.constructor = EnsPortal_Component_packageText;
	p.superClass = ('undefined' == typeof _ZEN_Component_control) ? zenMaster._ZEN_Component_control.prototype:_ZEN_Component_control.prototype;
	p.__ZENcomponent = true;
	p._serverClass = 'EnsPortal.Component.packageText';
	p._type = 'packageText';
	p.serialize = EnsPortal_Component_packageText_serialize;
	p.getSettings = EnsPortal_Component_packageText_getSettings;
	p.ReallyRefreshContents = EnsPortal_Component_packageText_ReallyRefreshContents;
	p.applyDate = EnsPortal_Component_packageText_applyDate;
	p.isValid = EnsPortal_Component_packageText_isValid;
	p.ondatechangeHandler = EnsPortal_Component_packageText_ondatechangeHandler;
	p.setProperty = EnsPortal_Component_packageText_setProperty;
	p.showDateSelector = EnsPortal_Component_packageText_showDateSelector;
}

self._zenClassIdx['categorySelector'] = 'EnsPortal_Component_categorySelector';
self.EnsPortal_Component_categorySelector = function(index,id) {
	if (index>=0) {EnsPortal_Component_categorySelector__init(this,index,id);}
}

self.EnsPortal_Component_categorySelector__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Portal_selector__init) ?zenMaster._ZEN_Portal_selector__init(o,index,id):_ZEN_Portal_selector__init(o,index,id);
}
function EnsPortal_Component_categorySelector_serialize(set,s)
{
	var o = this;s[0]='1137397267';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.clientType;s[9]=o.containerStyle;s[10]=o.context;s[11]=o.controlClass;s[12]=o.controlStyle;s[13]=o.dataBinding;s[14]=(o.disabled?1:0);s[15]=(o.dragEnabled?1:0);s[16]=(o.dropEnabled?1:0);s[17]=(o.dynamic?1:0);s[18]=o.enclosingClass;s[19]=o.enclosingStyle;s[20]=o.error;s[21]=o.height;s[22]=(o.hidden?1:0);s[23]=o.hint;s[24]=o.hintClass;s[25]=o.hintStyle;s[26]=(o.invalid?1:0);s[27]=o.invalidMessage;s[28]=o.label;s[29]=o.labelClass;s[30]=o.labelDisabledClass;s[31]=o.labelStyle;s[32]=(o.multiSelect?1:0);s[33]=o.onafterdrag;s[34]=o.onbeforedrag;s[35]=o.onblur;s[36]=o.onchange;s[37]=o.onclick;s[38]=o.ondblclick;s[39]=o.ondrag;s[40]=o.ondrop;s[41]=o.onfocus;s[42]=o.onhide;s[43]=o.onkeydown;s[44]=o.onkeypress;s[45]=o.onkeyup;s[46]=o.onmousedown;s[47]=o.onmouseout;s[48]=o.onmouseover;s[49]=o.onmouseup;s[50]=o.onrefresh;s[51]=o.onshow;s[52]=o.onsubmit;s[53]=o.ontouchend;s[54]=o.ontouchmove;s[55]=o.ontouchstart;s[56]=o.onupdate;s[57]=o.onvalidate;s[58]=o.originalValue;s[59]=o.overlayMode;s[60]=(o.readOnly?1:0);s[61]=o.renderFlag;s[62]=(o.required?1:0);s[63]=o.requiredMessage;s[64]=o.separator;s[65]=(o.showLabel?1:0);s[66]=o.size;s[67]=o.slice;s[68]=o.tabIndex;s[69]=o.title;s[70]=o.tuple;s[71]=o.valign;s[72]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[73]=(o.visible?1:0);s[74]=o.width;
}
function EnsPortal_Component_categorySelector_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self.EnsPortal_Component_categorySelector_updateCategoryOptions = function() {
var newCatValue = document.getElementById('userEnteredCategoryID').value;
var newCats = newCatValue.split(",");
for (var newCat of newCats) {
if (newCat!='') {
/* find if already defined since selecting if defined
will lead to it being unselected. */
var addCat = true;
var addAfterOption = '';
var collection = document.getElementsByClassName('selectorModalBox');
if ((collection)&&(collection.length==1)) {
var options = collection[0].getElementsByClassName('selectorItem');
for (var i = 0; i < options.length; i++) {
if (options.item(i).text == zenEscapeHTML(newCat)) {
addCat = false;
break;
} else {
if (options.item(i).text.localeCompare(newCat)>0) {
break;
} else {
addAfterOption = i;
}
}
}
if (addCat) {
this.selectItem(newCat);
/* Add to the options list in the correct place
Create same as ObjectScript in %RenderDropdown */
var newOption = document.createElement('a');
newOption.setAttribute('class', 'selectorItem');
newOption.setAttribute('href', '#');
newOption.setAttribute('title', newCat);
newOption.setAttribute('onclick', 'zenPage.getComponent('+this.index+').selectItem(\''+zenEscapeJS(newCat)+'\');return true;');
var newOptionInput = document.createElement('input');
newOptionInput.setAttribute('id','multiSelect.'+this.index+'.'+zenEscapeHTML(newCat));
newOptionInput.setAttribute('type','checkbox');
newOptionInput.setAttribute('checked',true);
var newOptionText = document.createTextNode(zenEscapeHTML(newCat));
newOption.appendChild(newOptionInput);
newOption.appendChild(newOptionText);
if ((options.length===0)||(addAfterOption===(options.length-1))) {
collection[0].appendChild(newOption);
} else {
if (addAfterOption === '') {
options.item(0).parentNode.insertBefore(newOption, options.item(0));
} else {
options.item(addAfterOption).parentNode.insertBefore(newOption, options.item(addAfterOption).nextSibling);
}
}
} else {
alert(zenEscapeJS(newCat)+' category already exists');
}
document.getElementById('userEnteredCategoryID').value = '';
}
}
}
}

self.EnsPortal_Component_categorySelector_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}

self.EnsPortal_Component_categorySelector_RenderDropdownContent = function(pIndex,pContext,pSearchKey,pMultiSelect,pSeparator) {
	return zenClassMethod(this,'RenderDropdownContent','L,L,L,B,L','BOOLEAN',arguments);
}
self.EnsPortal_Component_categorySelector__Loader = function() {
	zenLoadClass('_ZEN_Portal_selector');
	EnsPortal_Component_categorySelector.prototype = zenCreate('_ZEN_Portal_selector',-1);
	var p = EnsPortal_Component_categorySelector.prototype;
	if (null==p) {return;}
	p.constructor = EnsPortal_Component_categorySelector;
	p.superClass = ('undefined' == typeof _ZEN_Portal_selector) ? zenMaster._ZEN_Portal_selector.prototype:_ZEN_Portal_selector.prototype;
	p.__ZENcomponent = true;
	p._serverClass = 'EnsPortal.Component.categorySelector';
	p._type = 'categorySelector';
	p.serialize = EnsPortal_Component_categorySelector_serialize;
	p.getSettings = EnsPortal_Component_categorySelector_getSettings;
	p.ReallyRefreshContents = EnsPortal_Component_categorySelector_ReallyRefreshContents;
	p.RenderDropdownContent = EnsPortal_Component_categorySelector_RenderDropdownContent;
	p.updateCategoryOptions = EnsPortal_Component_categorySelector_updateCategoryOptions;
}

self._zenClassIdx['ExternalLanguageServerSelector'] = 'EnsPortal_Component_ExternalLanguageServerSelector';
self.EnsPortal_Component_ExternalLanguageServerSelector = function(index,id) {
	if (index>=0) {EnsPortal_Component_ExternalLanguageServerSelector__init(this,index,id);}
}

self.EnsPortal_Component_ExternalLanguageServerSelector__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_composite__init) ?zenMaster._ZEN_Component_composite__init(o,index,id):_ZEN_Component_composite__init(o,index,id);
	o.Types = '';
}
function EnsPortal_Component_ExternalLanguageServerSelector_serialize(set,s)
{
	var o = this;s[0]='714979114';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.Types;s[7]=o.align;s[8]=o.aux;s[9]=o.cellAlign;s[10]=o.cellSize;s[11]=o.cellStyle;s[12]=o.cellVAlign;s[13]=set.serializeList(o,o.children,true,'children');s[14]=(o.childrenCreated?1:0);s[15]=o.containerStyle;s[16]=(o.disabled?1:0);s[17]=(o.dragEnabled?1:0);s[18]=(o.dropEnabled?1:0);s[19]=(o.dynamic?1:0);s[20]=o.enclosingClass;s[21]=o.enclosingStyle;s[22]=o.error;s[23]=o.groupClass;s[24]=o.groupStyle;s[25]=o.height;s[26]=(o.hidden?1:0);s[27]=o.hint;s[28]=o.hintClass;s[29]=o.hintStyle;s[30]=o.label;s[31]=o.labelClass;s[32]=o.labelDisabledClass;s[33]=o.labelPosition;s[34]=o.labelStyle;s[35]=o.layout;s[36]=o.onafterdrag;s[37]=o.onbeforedrag;s[38]=o.onclick;s[39]=o.ondrag;s[40]=o.ondrop;s[41]=o.onhide;s[42]=o.onrefresh;s[43]=o.onshow;s[44]=o.onupdate;s[45]=o.overlayMode;s[46]=o.renderFlag;s[47]=(o.showLabel?1:0);s[48]=o.slice;s[49]=o.title;s[50]=o.tuple;s[51]=o.valign;s[52]=(o.visible?1:0);s[53]=o.width;
}
function EnsPortal_Component_ExternalLanguageServerSelector_getSettings(s)
{
	s['name'] = 'string';
	s['Types'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self.EnsPortal_Component_ExternalLanguageServerSelector_createChildren = function(form) {
var hgroup = zenPage.createComponent('hgroup');
var sel = zenPage.createComponent('selector');
sel.name="ELSNames";
sel.setProperty('id',this.id+".sel"+sel.name);
sel.size=30;
sel.setProperty('context',"Ens.ContextSearch/ExternalLanguageServers");
sel.onchange = "zenPage.settingChanged('"+escape(this.index)+"','"+escape(form.index)+"');"
sel.onkeyup = "zenPage.settingChanged('"+escape(this.index)+"','"+escape(form.index)+"');"
hgroup.addChild(sel);
if (this.hasPermissionsForLinks()) {
var btn = zenPage.createComponent('image');
btn.src="deepsee/zoom_24.png";
btn.setProperty('id',this.id+".btnExternalLanguageServer");
btn.title="Show details for the selected External Language Server.";
btn.onclick="if (zenPage.stopTimers) {zenPage.stopTimers()}; zenPage.getComponentById('"+this.id+"').showELSDetails(); if (zenPage.startTimers) {zenPage.startTimers(2000)};"
hgroup.addChild(btn);
}
this.addChild(hgroup);
if (this.hasPermissionsForLinks()) {
var link = zenPage.createComponent('link');
link.style='font-size:10pt;';
link.setProperty('id',this.id+".lnkExternalLanguageServers");
link.setProperty('labelClass','ribbonSortOption');
link.caption='External Language Servers Page';
link.title = 'Click here to go to the External Language Servers configuration page';
link.href='#';
link.onclick="if (zenPage.stopTimers) {zenPage.stopTimers()}; zenPage.getComponentById('"+this.id+"').showELSNames(); if (zenPage.startTimers) {zenPage.startTimers(2000)};"
this.addChild(link);
}
this.childrenCreated = true;
return '';
}

self.EnsPortal_Component_ExternalLanguageServerSelector_getProperty = function(property,key) {
switch(property) {
case 'readOnly':
var sel = this.getChildById('selELSNames');
if (sel) return sel.getReadOnly();
break;
case 'value':
var sel = this.getChildById('selELSNames');
if (sel) return sel.getValue();
default:
return this.invokeSuper('getProperty',arguments);
}
}

self.EnsPortal_Component_ExternalLanguageServerSelector_getValue = function() {
return this.getProperty('value');
}

self.EnsPortal_Component_ExternalLanguageServerSelector_onRefreshContents = function() {
if (this.Types != "") {
var sel = this.getChildById('selELSNames');
var context = "Ens.ContextSearch/ExternalLanguageServers?Types="+this.Types;
sel.context = context;
}
if (this.hasPermissionsForLinks()) {
var btn = this.getChildById("btnExternalLanguageServer");
if (btn) {
btn.hidden = false;
}
var lnk = this.getChildById("lnkExternalLanguageServers");
if (lnk) {
lnk.hidden = false;
}
}
var old = zenPage.composites[this.id];
this.setValue(old.getValue());
zenPage.composites[this.id] = this;
}

self.EnsPortal_Component_ExternalLanguageServerSelector_setProperty = function(property,value,value2) {
switch(property) {
case 'readOnly':
var sel = this.getChildById('selELSNames');
if (sel) sel.setReadOnly(value);
break;
case 'value':
var sel = this.getChildById('selELSNames');
if (sel) {
sel.setValue(value);
}
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self.EnsPortal_Component_ExternalLanguageServerSelector_setValue = function(value,value2) {
this.setProperty('value',value,value2);
}

self.EnsPortal_Component_ExternalLanguageServerSelector_showELSDetails = function() {
var name = this.getChildById('selELSNames').getValue();
if ((name === '')) {
alert($$$Text('Click here after selecting a External Language Server Name to see the External Language Server definition'));
return;
}
try {
if (!this.hasPermissionsForLinks()) {
alert($$$Text('Insufficient Privilege to see the External Language Server Details page'));
return;
}
} catch (ex) {/* link to management page will still enforce privilege required */}
var link = '/csp/sys/mgr/%25CSP.UI.Portal.ExternalLanguageServer.zen?PID='+encodeURIComponent(name)
if (!this.hasEditPermission()) {
link += '&IsEditForm=0';
}
var link = zenLink(link);
window.open(link);
}

self.EnsPortal_Component_ExternalLanguageServerSelector_showELSNames = function() {
try {
if (!this.hasPermissionsForLinks()) {
alert($$$Text('Insufficient Privilege to see the External Language Servers page'));
return;
}
} catch (ex) {/* link to management page will still enforce privilege required */}
var link = zenLink('/csp/sys/mgr/%25CSP.UI.Portal.ExternalLanguageServers.zen');
window.open(link);
}

self.EnsPortal_Component_ExternalLanguageServerSelector_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}

self.EnsPortal_Component_ExternalLanguageServerSelector_hasEditPermission = function() {
	return zenClassMethod(this,'hasEditPermission','','BOOLEAN',arguments);
}

self.EnsPortal_Component_ExternalLanguageServerSelector_hasPermissionsForLinks = function() {
	return zenClassMethod(this,'hasPermissionsForLinks','','BOOLEAN',arguments);
}
self.EnsPortal_Component_ExternalLanguageServerSelector__Loader = function() {
	zenLoadClass('_ZEN_Component_composite');
	EnsPortal_Component_ExternalLanguageServerSelector.prototype = zenCreate('_ZEN_Component_composite',-1);
	var p = EnsPortal_Component_ExternalLanguageServerSelector.prototype;
	if (null==p) {return;}
	p.constructor = EnsPortal_Component_ExternalLanguageServerSelector;
	p.superClass = ('undefined' == typeof _ZEN_Component_composite) ? zenMaster._ZEN_Component_composite.prototype:_ZEN_Component_composite.prototype;
	p.__ZENcomponent = true;
	p._serverClass = 'EnsPortal.Component.ExternalLanguageServerSelector';
	p._type = 'ExternalLanguageServerSelector';
	p.serialize = EnsPortal_Component_ExternalLanguageServerSelector_serialize;
	p.getSettings = EnsPortal_Component_ExternalLanguageServerSelector_getSettings;
	p.ReallyRefreshContents = EnsPortal_Component_ExternalLanguageServerSelector_ReallyRefreshContents;
	p.createChildren = EnsPortal_Component_ExternalLanguageServerSelector_createChildren;
	p.getProperty = EnsPortal_Component_ExternalLanguageServerSelector_getProperty;
	p.getValue = EnsPortal_Component_ExternalLanguageServerSelector_getValue;
	p.hasEditPermission = EnsPortal_Component_ExternalLanguageServerSelector_hasEditPermission;
	p.hasPermissionsForLinks = EnsPortal_Component_ExternalLanguageServerSelector_hasPermissionsForLinks;
	p.onRefreshContents = EnsPortal_Component_ExternalLanguageServerSelector_onRefreshContents;
	p.setProperty = EnsPortal_Component_ExternalLanguageServerSelector_setProperty;
	p.setValue = EnsPortal_Component_ExternalLanguageServerSelector_setValue;
	p.showELSDetails = EnsPortal_Component_ExternalLanguageServerSelector_showELSDetails;
	p.showELSNames = EnsPortal_Component_ExternalLanguageServerSelector_showELSNames;
}

self._zenClassIdx['http://www.intersystems.com/EnsPortal/activityGraph'] = 'EnsPortal_Component_activityGraph';
self.EnsPortal_Component_activityGraph = function(index,id) {
	if (index>=0) {EnsPortal_Component_activityGraph__init(this,index,id);}
}

self.EnsPortal_Component_activityGraph__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_composite__init) ?zenMaster._ZEN_Component_composite__init(o,index,id):_ZEN_Component_composite__init(o,index,id);
	o.autoUpdate = true;
}
function EnsPortal_Component_activityGraph_serialize(set,s)
{
	var o = this;s[0]='1812545692';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=(o.autoUpdate?1:0);s[8]=o.aux;s[9]=o.cellAlign;s[10]=o.cellSize;s[11]=o.cellStyle;s[12]=o.cellVAlign;s[13]=set.serializeList(o,o.children,true,'children');s[14]=(o.childrenCreated?1:0);s[15]=o.containerStyle;s[16]=(o.disabled?1:0);s[17]=(o.dragEnabled?1:0);s[18]=(o.dropEnabled?1:0);s[19]=(o.dynamic?1:0);s[20]=o.enclosingClass;s[21]=o.enclosingStyle;s[22]=o.error;s[23]=o.groupClass;s[24]=o.groupStyle;s[25]=o.height;s[26]=(o.hidden?1:0);s[27]=o.hint;s[28]=o.hintClass;s[29]=o.hintStyle;s[30]=o.label;s[31]=o.labelClass;s[32]=o.labelDisabledClass;s[33]=o.labelPosition;s[34]=o.labelStyle;s[35]=o.layout;s[36]=o.onafterdrag;s[37]=o.onbeforedrag;s[38]=o.onclick;s[39]=o.ondrag;s[40]=o.ondrop;s[41]=o.onhide;s[42]=o.onrefresh;s[43]=o.onshow;s[44]=o.onupdate;s[45]=o.overlayMode;s[46]=o.renderFlag;s[47]=(o.showLabel?1:0);s[48]=o.slice;s[49]=o.title;s[50]=o.tuple;s[51]=o.valign;s[52]=(o.visible?1:0);s[53]=o.width;
}
function EnsPortal_Component_activityGraph_getSettings(s)
{
	s['name'] = 'string';
	s['autoUpdate'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self.EnsPortal_Component_activityGraph_changeTimeFrame = function() {
var timeFrame = this.getChildById('rbTimeFrame').getValue();
this.getChildById('timeFrame').value = timeFrame;
var json = this.getChildById('jsonHistory');
json.reloadContents();
if (this.autoUpdate && zenPage && (zenPage.enableAutoRefresh || (typeof zenPage.enableAutoRefresh != 'boolean'))) {
this.getChildById('graphTimer').startTimer();
}
}

self.EnsPortal_Component_activityGraph_onloadHandler = function() {
this.invokeSuper('onloadHandler',arguments);
if (self.zenPage && self.zenPage.enableAutoRefresh) {
var graphTimer = this.getChildById('graphTimer');
if (graphTimer) {
graphTimer.setProperty('timeout',15000);
graphTimer.startTimer();
}
}
}

self.EnsPortal_Component_activityGraph_setConfigName = function(confName) {
var json = this.getChildById('jsonHistory');
this.getChildById('configName').value = confName;
if (confName == '') {
this.getChildById('chartRecent').title = $$$Text('History');
} else {
this.getChildById('chartRecent').title = confName;
}
json.reloadContents();
if (zenPage && (zenPage.enableAutoRefresh || (typeof zenPage.enableAutoRefresh != 'boolean'))) {
this.getChildById('graphTimer').startTimer();
}
}

self.EnsPortal_Component_activityGraph_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self.EnsPortal_Component_activityGraph__Loader = function() {
	zenLoadClass('_ZEN_Component_composite');
	EnsPortal_Component_activityGraph.prototype = zenCreate('_ZEN_Component_composite',-1);
	var p = EnsPortal_Component_activityGraph.prototype;
	if (null==p) {return;}
	p.constructor = EnsPortal_Component_activityGraph;
	p.superClass = ('undefined' == typeof _ZEN_Component_composite) ? zenMaster._ZEN_Component_composite.prototype:_ZEN_Component_composite.prototype;
	p.__ZENcomponent = true;
	p._serverClass = 'EnsPortal.Component.activityGraph';
	p._type = 'activityGraph';
	p.serialize = EnsPortal_Component_activityGraph_serialize;
	p.getSettings = EnsPortal_Component_activityGraph_getSettings;
	p.ReallyRefreshContents = EnsPortal_Component_activityGraph_ReallyRefreshContents;
	p.changeTimeFrame = EnsPortal_Component_activityGraph_changeTimeFrame;
	p.onloadHandler = EnsPortal_Component_activityGraph_onloadHandler;
	p.setConfigName = EnsPortal_Component_activityGraph_setConfigName;
}

self._zenClassIdx['bplSelector'] = 'EnsPortal_Component_bplSelector';
self.EnsPortal_Component_bplSelector = function(index,id) {
	if (index>=0) {EnsPortal_Component_bplSelector__init(this,index,id);}
}

self.EnsPortal_Component_bplSelector__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_composite__init) ?zenMaster._ZEN_Component_composite__init(o,index,id):_ZEN_Component_composite__init(o,index,id);
}
function EnsPortal_Component_bplSelector_serialize(set,s)
{
	var o = this;s[0]='4096323540';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.cellAlign;s[9]=o.cellSize;s[10]=o.cellStyle;s[11]=o.cellVAlign;s[12]=set.serializeList(o,o.children,true,'children');s[13]=(o.childrenCreated?1:0);s[14]=o.containerStyle;s[15]=(o.disabled?1:0);s[16]=(o.dragEnabled?1:0);s[17]=(o.dropEnabled?1:0);s[18]=(o.dynamic?1:0);s[19]=o.enclosingClass;s[20]=o.enclosingStyle;s[21]=o.error;s[22]=o.groupClass;s[23]=o.groupStyle;s[24]=o.height;s[25]=(o.hidden?1:0);s[26]=o.hint;s[27]=o.hintClass;s[28]=o.hintStyle;s[29]=o.label;s[30]=o.labelClass;s[31]=o.labelDisabledClass;s[32]=o.labelPosition;s[33]=o.labelStyle;s[34]=o.layout;s[35]=o.onafterdrag;s[36]=o.onbeforedrag;s[37]=o.onclick;s[38]=o.ondrag;s[39]=o.ondrop;s[40]=o.onhide;s[41]=o.onrefresh;s[42]=o.onshow;s[43]=o.onupdate;s[44]=o.overlayMode;s[45]=o.renderFlag;s[46]=(o.showLabel?1:0);s[47]=o.slice;s[48]=o.title;s[49]=o.tuple;s[50]=o.valign;s[51]=(o.visible?1:0);s[52]=o.width;
}
function EnsPortal_Component_bplSelector_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self.EnsPortal_Component_bplSelector_createChildren = function(form) {
var hgroup = zenPage.createComponent('hgroup');
var ctrllb = zenPage.createComponent('label');
ctrllb.name="BPLClass";
ctrllb.setProperty('id',this.id+".lbl"+ctrllb.name);
hgroup.addChild(ctrllb);
var btn = zenPage.createComponent('image');
btn.src="deepsee/zoom_24.png";
btn.setProperty('id',this.id+"."+"btn"+ctrllb.name);
btn.title="Go to Business Process definition";
btn.onclick="if (zenPage.stopTimers) {zenPage.stopTimers()}; zenPage.getComponentById('"+this.id+"').showBPLDetails(); if (zenPage.startTimers) {zenPage.startTimers(2000)};"
hgroup.addChild(btn);
this.addChild(hgroup);
this.childrenCreated = true;
return '';
}

self.EnsPortal_Component_bplSelector_getProperty = function(property,key) {
switch(property) {
case 'value':
var lbl = this.getChildById('lblBPLClass')
if (lbl) return lbl.getValue();
default:
return this.invokeSuper('getProperty',arguments);
}
}

self.EnsPortal_Component_bplSelector_getValue = function() {
return this.getProperty('value');
}

self.EnsPortal_Component_bplSelector_onRefreshContents = function() {
var old = zenPage.composites[this.id];
this.setValue(old.getValue());
zenPage.composites[this.id] = this;
}

self.EnsPortal_Component_bplSelector_setProperty = function(property,value,value2) {
switch(property) {
case 'value':
var lbl = this.getChildById('lblBPLClass')
if (lbl) {
lbl.setValue(value);
}
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self.EnsPortal_Component_bplSelector_setValue = function(value,value2) {
this.setProperty('value',value,value2);
}

self.EnsPortal_Component_bplSelector_showBPLDetails = function() {
var name = this.getChildById('lblBPLClass').getValue();
var link = zenLink('EnsPortal.BPLEditor.zen');
link += (link.indexOf('?') > -1) ? '&' : '?';
link += 'BP=' + encodeURIComponent(name + '.bpl');
window.open(link);
}

self.EnsPortal_Component_bplSelector_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self.EnsPortal_Component_bplSelector__Loader = function() {
	zenLoadClass('_ZEN_Component_composite');
	EnsPortal_Component_bplSelector.prototype = zenCreate('_ZEN_Component_composite',-1);
	var p = EnsPortal_Component_bplSelector.prototype;
	if (null==p) {return;}
	p.constructor = EnsPortal_Component_bplSelector;
	p.superClass = ('undefined' == typeof _ZEN_Component_composite) ? zenMaster._ZEN_Component_composite.prototype:_ZEN_Component_composite.prototype;
	p.__ZENcomponent = true;
	p._serverClass = 'EnsPortal.Component.bplSelector';
	p._type = 'bplSelector';
	p.serialize = EnsPortal_Component_bplSelector_serialize;
	p.getSettings = EnsPortal_Component_bplSelector_getSettings;
	p.ReallyRefreshContents = EnsPortal_Component_bplSelector_ReallyRefreshContents;
	p.createChildren = EnsPortal_Component_bplSelector_createChildren;
	p.getProperty = EnsPortal_Component_bplSelector_getProperty;
	p.getValue = EnsPortal_Component_bplSelector_getValue;
	p.onRefreshContents = EnsPortal_Component_bplSelector_onRefreshContents;
	p.setProperty = EnsPortal_Component_bplSelector_setProperty;
	p.setValue = EnsPortal_Component_bplSelector_setValue;
	p.showBPLDetails = EnsPortal_Component_bplSelector_showBPLDetails;
}

self._zenClassIdx['classpathsTable'] = 'EnsPortal_Component_classpathsTable';
self.EnsPortal_Component_classpathsTable = function(index,id) {
	if (index>=0) {EnsPortal_Component_classpathsTable__init(this,index,id);}
}

self.EnsPortal_Component_classpathsTable__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_composite__init) ?zenMaster._ZEN_Component_composite__init(o,index,id):_ZEN_Component_composite__init(o,index,id);
	o.classpaths = '';
	o.currFile = '0';
	o.currFileName = '';
	o.inFileSelect = false;
	o.readOnly = false;
	o.wildcard = '*';
}
function EnsPortal_Component_classpathsTable_serialize(set,s)
{
	var o = this;s[0]='3204214022';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.cellAlign;s[9]=o.cellSize;s[10]=o.cellStyle;s[11]=o.cellVAlign;s[12]=set.serializeList(o,o.children,true,'children');s[13]=(o.childrenCreated?1:0);s[14]=o.classpaths;s[15]=o.containerStyle;s[16]=o.currFile;s[17]=o.currFileName;s[18]=(o.disabled?1:0);s[19]=(o.dragEnabled?1:0);s[20]=(o.dropEnabled?1:0);s[21]=(o.dynamic?1:0);s[22]=o.enclosingClass;s[23]=o.enclosingStyle;s[24]=o.error;s[25]=o.groupClass;s[26]=o.groupStyle;s[27]=o.height;s[28]=(o.hidden?1:0);s[29]=o.hint;s[30]=o.hintClass;s[31]=o.hintStyle;s[32]=(o.inFileSelect?1:0);s[33]=o.label;s[34]=o.labelClass;s[35]=o.labelDisabledClass;s[36]=o.labelPosition;s[37]=o.labelStyle;s[38]=o.layout;s[39]=o.onafterdrag;s[40]=o.onbeforedrag;s[41]=o.onclick;s[42]=o.ondrag;s[43]=o.ondrop;s[44]=o.onhide;s[45]=o.onrefresh;s[46]=o.onshow;s[47]=o.onupdate;s[48]=o.overlayMode;s[49]=(o.readOnly?1:0);s[50]=o.renderFlag;s[51]=(o.showLabel?1:0);s[52]=o.slice;s[53]=o.title;s[54]=o.tuple;s[55]=o.valign;s[56]=(o.visible?1:0);s[57]=o.width;s[58]=o.wildcard;
}
function EnsPortal_Component_classpathsTable_getSettings(s)
{
	s['name'] = 'string';
	s['classpaths'] = 'string';
	s['currFile'] = 'string';
	s['currFileName'] = 'string';
	s['inFileSelect'] = 'string';
	s['readOnly'] = 'boolean';
	s['wildcard'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self.EnsPortal_Component_classpathsTable_addFile = function() {
var paths = this.classpaths;
if ((""!=paths) && (paths.slice(-1)!="|")) {
paths = (paths + "|")
this.classpaths = paths;
}
this.switchCurrFile(paths.split("|").length);
}

self.EnsPortal_Component_classpathsTable_createChildren = function(form) {
var html = zenPage.createComponent('html');
html.setProperty('id',this.id+".htmlClasspaths");
html.refreshContents = function() {
var div = this.getEnclosingDiv();
if (div) div.innerHTML = this.content;
};
this.addChild(html);
this.childrenCreated = true;
return '';
}

self.EnsPortal_Component_classpathsTable_getForm = function() {
var form = null;
var parent = this.parent;
while (parent) {
if (parent.isOfType('form') || parent.isOfType('loginForm')) {
form = parent;
break;
}
parent = parent.parent;
}
return form;
}

self.EnsPortal_Component_classpathsTable_getProperty = function(property,key) {
switch(property) {
case 'readOnly':
return this.readOnly;
break;
case 'value':
return this.getValue();
default:
return this.invokeSuper('getProperty',arguments);
}
}

self.EnsPortal_Component_classpathsTable_getValue = function() {
if (this.inFileSelect) {
this.inFileSelect = 0;
return this.currFileName;
} else {
return this.classpaths;
}
}

self.EnsPortal_Component_classpathsTable_refreshClasspaths = function() {
var html = this.getChildById("htmlClasspaths");
if (html) {
} else {
var html = zenPage.createComponent('html');
html.setProperty('id',this.id+".htmlClasspaths");
this.addChild(html);
}
var content = this.GetContents();
html.content = content;
if (this.getEnclosingDiv() == null) return;
comp = zenPage.getComponentById(this.id);
if ((comp != null)) {
comp.refreshContents();
}
return;
}

self.EnsPortal_Component_classpathsTable_setCurrFile = function(switchTo) {
this.currFile = switchTo;
this.refreshClasspaths();
}

self.EnsPortal_Component_classpathsTable_setModified = function() {
var form = this.getForm();
zenPage.settingChanged(this.index,(form ? form.index : ''));
}

self.EnsPortal_Component_classpathsTable_setProperty = function(property,value,value2) {
switch(property) {
case 'readOnly':
case 'disabled':
this.readOnly = value;
this.refreshClasspaths();
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self.EnsPortal_Component_classpathsTable_setValue = function(value,value2) {
if (this.currFile && (this.currFile > 0)) {
this.SetDefaultDir(value);
filename = this.UseIRISHost(value);
this.saveFile(this.currFile,filename);
this.refreshClasspaths();
} else if (this.classpaths == "") {
this.classpaths = this.GetPathsToDisplay(value);
this.refreshClasspaths();
}
}

self.EnsPortal_Component_classpathsTable_showFileSelect = function(filename) {
if (!this.CanViewFileSystem()) {
alert($$$TextJS("You are not permitted to perform this action"));
return false;
}
if (zenPage && (typeof zenPage.selectFile == 'function')) {
if ((filename != null) && (filename != "")) {
this.currFileName = filename;
} else {
this.currFileName = this.GetDefaultDir();
}
this.inFileSelect = 1;
zenPage.selectFile(this.index);
}
}

self.EnsPortal_Component_classpathsTable_switchCurrFile = function(switchTo,value) {
var current = this.currFile;
if (current != switchTo) {
if ((current > 0) && (value != null)) {
var x = this.saveFile(current,value);
}
this.setModified();
}
this.setCurrFile(switchTo);
return;
}

self.EnsPortal_Component_classpathsTable_CanViewFileSystem = function() {
	return zenInstanceMethod(this,'CanViewFileSystem','','BOOLEAN',arguments);
}

self.EnsPortal_Component_classpathsTable_GetContents = function() {
	return zenInstanceMethod(this,'GetContents','','VARCHAR',arguments);
}

self.EnsPortal_Component_classpathsTable_GetDefaultDir = function() {
	return zenClassMethod(this,'GetDefaultDir','','VARCHAR',arguments);
}

self.EnsPortal_Component_classpathsTable_GetFullFilepath = function(pFilename) {
	return zenClassMethod(this,'GetFullFilepath','L','VARCHAR',arguments);
}

self.EnsPortal_Component_classpathsTable_GetPathsToDisplay = function(pClasspaths) {
	return zenClassMethod(this,'GetPathsToDisplay','L','VARCHAR',arguments);
}

self.EnsPortal_Component_classpathsTable_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}

self.EnsPortal_Component_classpathsTable_SetDefaultDir = function(pPathname) {
	zenClassMethod(this,'SetDefaultDir','L','',arguments);
}

self.EnsPortal_Component_classpathsTable_UseIRISHost = function(pFilename) {
	return zenClassMethod(this,'UseIRISHost','L','VARCHAR',arguments);
}

self.EnsPortal_Component_classpathsTable_deleteFile = function(pNumber) {
	return zenInstanceMethod(this,'deleteFile','L','BOOLEAN',arguments);
}

self.EnsPortal_Component_classpathsTable_saveFile = function(pNumber,pValue) {
	return zenInstanceMethod(this,'saveFile','L,L','BOOLEAN',arguments);
}
self.EnsPortal_Component_classpathsTable__Loader = function() {
	zenLoadClass('_ZEN_Component_composite');
	EnsPortal_Component_classpathsTable.prototype = zenCreate('_ZEN_Component_composite',-1);
	var p = EnsPortal_Component_classpathsTable.prototype;
	if (null==p) {return;}
	p.constructor = EnsPortal_Component_classpathsTable;
	p.superClass = ('undefined' == typeof _ZEN_Component_composite) ? zenMaster._ZEN_Component_composite.prototype:_ZEN_Component_composite.prototype;
	p.__ZENcomponent = true;
	p._serverClass = 'EnsPortal.Component.classpathsTable';
	p._type = 'classpathsTable';
	p.serialize = EnsPortal_Component_classpathsTable_serialize;
	p.getSettings = EnsPortal_Component_classpathsTable_getSettings;
	p.CanViewFileSystem = EnsPortal_Component_classpathsTable_CanViewFileSystem;
	p.GetContents = EnsPortal_Component_classpathsTable_GetContents;
	p.GetDefaultDir = EnsPortal_Component_classpathsTable_GetDefaultDir;
	p.GetFullFilepath = EnsPortal_Component_classpathsTable_GetFullFilepath;
	p.GetPathsToDisplay = EnsPortal_Component_classpathsTable_GetPathsToDisplay;
	p.ReallyRefreshContents = EnsPortal_Component_classpathsTable_ReallyRefreshContents;
	p.SetDefaultDir = EnsPortal_Component_classpathsTable_SetDefaultDir;
	p.UseIRISHost = EnsPortal_Component_classpathsTable_UseIRISHost;
	p.addFile = EnsPortal_Component_classpathsTable_addFile;
	p.createChildren = EnsPortal_Component_classpathsTable_createChildren;
	p.deleteFile = EnsPortal_Component_classpathsTable_deleteFile;
	p.getForm = EnsPortal_Component_classpathsTable_getForm;
	p.getProperty = EnsPortal_Component_classpathsTable_getProperty;
	p.getValue = EnsPortal_Component_classpathsTable_getValue;
	p.refreshClasspaths = EnsPortal_Component_classpathsTable_refreshClasspaths;
	p.saveFile = EnsPortal_Component_classpathsTable_saveFile;
	p.setCurrFile = EnsPortal_Component_classpathsTable_setCurrFile;
	p.setModified = EnsPortal_Component_classpathsTable_setModified;
	p.setProperty = EnsPortal_Component_classpathsTable_setProperty;
	p.setValue = EnsPortal_Component_classpathsTable_setValue;
	p.showFileSelect = EnsPortal_Component_classpathsTable_showFileSelect;
	p.switchCurrFile = EnsPortal_Component_classpathsTable_switchCurrFile;
}

self._zenClassIdx['credentialsSelector'] = 'EnsPortal_Component_credentialsSelector';
self.EnsPortal_Component_credentialsSelector = function(index,id) {
	if (index>=0) {EnsPortal_Component_credentialsSelector__init(this,index,id);}
}

self.EnsPortal_Component_credentialsSelector__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_composite__init) ?zenMaster._ZEN_Component_composite__init(o,index,id):_ZEN_Component_composite__init(o,index,id);
}
function EnsPortal_Component_credentialsSelector_serialize(set,s)
{
	var o = this;s[0]='4096323540';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.cellAlign;s[9]=o.cellSize;s[10]=o.cellStyle;s[11]=o.cellVAlign;s[12]=set.serializeList(o,o.children,true,'children');s[13]=(o.childrenCreated?1:0);s[14]=o.containerStyle;s[15]=(o.disabled?1:0);s[16]=(o.dragEnabled?1:0);s[17]=(o.dropEnabled?1:0);s[18]=(o.dynamic?1:0);s[19]=o.enclosingClass;s[20]=o.enclosingStyle;s[21]=o.error;s[22]=o.groupClass;s[23]=o.groupStyle;s[24]=o.height;s[25]=(o.hidden?1:0);s[26]=o.hint;s[27]=o.hintClass;s[28]=o.hintStyle;s[29]=o.label;s[30]=o.labelClass;s[31]=o.labelDisabledClass;s[32]=o.labelPosition;s[33]=o.labelStyle;s[34]=o.layout;s[35]=o.onafterdrag;s[36]=o.onbeforedrag;s[37]=o.onclick;s[38]=o.ondrag;s[39]=o.ondrop;s[40]=o.onhide;s[41]=o.onrefresh;s[42]=o.onshow;s[43]=o.onupdate;s[44]=o.overlayMode;s[45]=o.renderFlag;s[46]=(o.showLabel?1:0);s[47]=o.slice;s[48]=o.title;s[49]=o.tuple;s[50]=o.valign;s[51]=(o.visible?1:0);s[52]=o.width;
}
function EnsPortal_Component_credentialsSelector_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self.EnsPortal_Component_credentialsSelector_createChildren = function(form) {
var hgroup = zenPage.createComponent('hgroup');
var sel = zenPage.createComponent('selector');
sel.name="Credentials";
sel.setProperty('id',this.id+".sel"+sel.name);
sel.size=30;
sel.setProperty('context',"Ens.ContextSearch/Credentials");
sel.onchange = "zenPage.settingChanged('"+escape(this.index)+"','"+escape(form.index)+"');"
sel.onkeyup = "zenPage.settingChanged('"+escape(this.index)+"','"+escape(form.index)+"');"
hgroup.addChild(sel);
var btn = zenPage.createComponent('image');
btn.src="deepsee/zoom_24.png";
btn.setProperty('id',this.id+"."+"btn"+sel.name);
btn.title="Show details for the selected Credentials.";
btn.onclick="if (zenPage.stopTimers) {zenPage.stopTimers()}; zenPage.getComponentById('"+this.id+"').showCredentialsDetails(); if (zenPage.startTimers) {zenPage.startTimers(2000)};"
hgroup.addChild(btn);
this.addChild(hgroup);
/*  Removed by HCR306
var link = zenPage.createComponent('link');
link.enclosingStyle="font-size:10pt;";
link.labelClass="ribbonSortOption";
link.caption="Credentials Configuration Page";
link.title="Click here to go to the Credentials configuration page.";
link.href="EnsPortal.Credentials.zen";
this.addChild(link);
*/
this.childrenCreated = true;
return '';
}

self.EnsPortal_Component_credentialsSelector_getProperty = function(property,key) {
switch(property) {
case 'readOnly':
var sel = this.getChildById('selCredentials');
if (sel) return sel.getReadOnly();
break;
case 'value':
var sel = this.getChildById('selCredentials');
if (sel) return sel.getValue();
default:
return this.invokeSuper('getProperty',arguments);
}
}

self.EnsPortal_Component_credentialsSelector_getValue = function() {
return this.getProperty('value');
}

self.EnsPortal_Component_credentialsSelector_onRefreshContents = function() {
var old = zenPage.composites[this.id];
this.setValue(old.getValue());
zenPage.composites[this.id] = this;
}

self.EnsPortal_Component_credentialsSelector_setProperty = function(property,value,value2) {
switch(property) {
case 'readOnly':
var sel = this.getChildById('selCredentials');
if (sel) sel.setReadOnly(value);
break;
case 'value':
var sel = this.getChildById('selCredentials');
if (sel) {
sel.setValue(value);
}
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self.EnsPortal_Component_credentialsSelector_setValue = function(value,value2) {
this.setProperty('value',value,value2);
}

self.EnsPortal_Component_credentialsSelector_showCredentialsDetails = function() {
var name = this.getChildById('selCredentials').getValue();
if (''==name) {
alert($$$Text('Click here after selecting a pair of credentials, to see the credentials\' details'));
return;
}
var link = zenLink('EnsPortal.Credentials.zen');
link += (link.indexOf('?') > -1) ? '&' : '?';
link += 'ID=' + encodeURIComponent(name);
window.open(link);
}

self.EnsPortal_Component_credentialsSelector_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self.EnsPortal_Component_credentialsSelector__Loader = function() {
	zenLoadClass('_ZEN_Component_composite');
	EnsPortal_Component_credentialsSelector.prototype = zenCreate('_ZEN_Component_composite',-1);
	var p = EnsPortal_Component_credentialsSelector.prototype;
	if (null==p) {return;}
	p.constructor = EnsPortal_Component_credentialsSelector;
	p.superClass = ('undefined' == typeof _ZEN_Component_composite) ? zenMaster._ZEN_Component_composite.prototype:_ZEN_Component_composite.prototype;
	p.__ZENcomponent = true;
	p._serverClass = 'EnsPortal.Component.credentialsSelector';
	p._type = 'credentialsSelector';
	p.serialize = EnsPortal_Component_credentialsSelector_serialize;
	p.getSettings = EnsPortal_Component_credentialsSelector_getSettings;
	p.ReallyRefreshContents = EnsPortal_Component_credentialsSelector_ReallyRefreshContents;
	p.createChildren = EnsPortal_Component_credentialsSelector_createChildren;
	p.getProperty = EnsPortal_Component_credentialsSelector_getProperty;
	p.getValue = EnsPortal_Component_credentialsSelector_getValue;
	p.onRefreshContents = EnsPortal_Component_credentialsSelector_onRefreshContents;
	p.setProperty = EnsPortal_Component_credentialsSelector_setProperty;
	p.setValue = EnsPortal_Component_credentialsSelector_setValue;
	p.showCredentialsDetails = EnsPortal_Component_credentialsSelector_showCredentialsDetails;
}

self._zenClassIdx['directorySelector'] = 'EnsPortal_Component_directorySelector';
self.EnsPortal_Component_directorySelector = function(index,id) {
	if (index>=0) {EnsPortal_Component_directorySelector__init(this,index,id);}
}

self.EnsPortal_Component_directorySelector__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_composite__init) ?zenMaster._ZEN_Component_composite__init(o,index,id):_ZEN_Component_composite__init(o,index,id);
}
function EnsPortal_Component_directorySelector_serialize(set,s)
{
	var o = this;s[0]='4096323540';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.cellAlign;s[9]=o.cellSize;s[10]=o.cellStyle;s[11]=o.cellVAlign;s[12]=set.serializeList(o,o.children,true,'children');s[13]=(o.childrenCreated?1:0);s[14]=o.containerStyle;s[15]=(o.disabled?1:0);s[16]=(o.dragEnabled?1:0);s[17]=(o.dropEnabled?1:0);s[18]=(o.dynamic?1:0);s[19]=o.enclosingClass;s[20]=o.enclosingStyle;s[21]=o.error;s[22]=o.groupClass;s[23]=o.groupStyle;s[24]=o.height;s[25]=(o.hidden?1:0);s[26]=o.hint;s[27]=o.hintClass;s[28]=o.hintStyle;s[29]=o.label;s[30]=o.labelClass;s[31]=o.labelDisabledClass;s[32]=o.labelPosition;s[33]=o.labelStyle;s[34]=o.layout;s[35]=o.onafterdrag;s[36]=o.onbeforedrag;s[37]=o.onclick;s[38]=o.ondrag;s[39]=o.ondrop;s[40]=o.onhide;s[41]=o.onrefresh;s[42]=o.onshow;s[43]=o.onupdate;s[44]=o.overlayMode;s[45]=o.renderFlag;s[46]=(o.showLabel?1:0);s[47]=o.slice;s[48]=o.title;s[49]=o.tuple;s[50]=o.valign;s[51]=(o.visible?1:0);s[52]=o.width;
}
function EnsPortal_Component_directorySelector_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self.EnsPortal_Component_directorySelector_createChildren = function(form) {
var hgroup = zenPage.createComponent('hgroup');
var text = zenPage.createComponent('text');
text.setProperty('id',this.id + '.txtDirectoryValue');
text.setProperty('size',35);
text.onchange = "zenPage.settingChanged('"+escape(this.index)+"','"+escape(form.index)+"');"
text.onkeyup = "zenPage.settingChanged('"+escape(this.index)+"','"+escape(form.index)+"');"
hgroup.addChild(text);
var btn = zenPage.createComponent('image');
btn.src = 'deepsee/zoom_24.png';
btn.setProperty('id',this.id + '.btnDirectoryValue');
btn.title = $$$Text('Select a directory');
btn.onclick = 'zenIndex('+this.index+').showDirectorySelect();'
hgroup.addChild(btn);
this.addChild(hgroup);
this.childrenCreated = true;
return '';
}

self.EnsPortal_Component_directorySelector_getForm = function() {
var text = this.getChildById('txtDirectoryValue');
if (text) return text.getForm();
return null;
}

self.EnsPortal_Component_directorySelector_getProperty = function(property,key) {
switch(property) {
case 'readOnly':
var txt = this.getChildById('txtDirectoryValue');
var btn = this.getChildById('btnDirectoryValue');
if (txt && btn) return (txt.getReadOnly() && btn.getProperty('disabled'));
break;
case 'value':
var txt = this.getChildById('txtDirectoryValue');
if (txt) return txt.getValue();
default:
return this.invokeSuper('getProperty',arguments);
}
}

self.EnsPortal_Component_directorySelector_getValue = function() {
return this.getProperty('value');
}

self.EnsPortal_Component_directorySelector_onDisplayHandler = function() {
var buttonEnabled = (zenPage && zenPage.canViewFileSystem && this.disabled==false && !this.getProperty('readOnly'));
var button = this.getChildById('btnDirectoryValue');
if (button) button.setDisabled(!buttonEnabled);
}

self.EnsPortal_Component_directorySelector_onRefreshContents = function() {
var old = zenPage.composites[this.id];
this.setValue(old.getValue());
zenPage.composites[this.id] = this;
}

self.EnsPortal_Component_directorySelector_setProperty = function(property,value,value2) {
switch(property) {
case 'readOnly':
var txt = this.getChildById('txtDirectoryValue');
if (txt) txt.setReadOnly(value);
var btn = this.getChildById('btnDirectoryValue');
if (btn) btn.setDisabled(value);
break;
case 'value':
var txt = this.getChildById('txtDirectoryValue');
if (txt) {
txt.setValue(value);
}
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self.EnsPortal_Component_directorySelector_setValue = function(value,value2) {
this.setProperty('value',value,value2);
}

self.EnsPortal_Component_directorySelector_showDirectorySelect = function() {
if (zenPage && (typeof zenPage.selectDirectory == 'function')) {
zenPage.selectDirectory(this.index);
}
}

self.EnsPortal_Component_directorySelector_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self.EnsPortal_Component_directorySelector__Loader = function() {
	zenLoadClass('_ZEN_Component_composite');
	EnsPortal_Component_directorySelector.prototype = zenCreate('_ZEN_Component_composite',-1);
	var p = EnsPortal_Component_directorySelector.prototype;
	if (null==p) {return;}
	p.constructor = EnsPortal_Component_directorySelector;
	p.superClass = ('undefined' == typeof _ZEN_Component_composite) ? zenMaster._ZEN_Component_composite.prototype:_ZEN_Component_composite.prototype;
	p.__ZENcomponent = true;
	p._serverClass = 'EnsPortal.Component.directorySelector';
	p._type = 'directorySelector';
	p.serialize = EnsPortal_Component_directorySelector_serialize;
	p.getSettings = EnsPortal_Component_directorySelector_getSettings;
	p.ReallyRefreshContents = EnsPortal_Component_directorySelector_ReallyRefreshContents;
	p.createChildren = EnsPortal_Component_directorySelector_createChildren;
	p.getForm = EnsPortal_Component_directorySelector_getForm;
	p.getProperty = EnsPortal_Component_directorySelector_getProperty;
	p.getValue = EnsPortal_Component_directorySelector_getValue;
	p.onDisplayHandler = EnsPortal_Component_directorySelector_onDisplayHandler;
	p.onRefreshContents = EnsPortal_Component_directorySelector_onRefreshContents;
	p.setProperty = EnsPortal_Component_directorySelector_setProperty;
	p.setValue = EnsPortal_Component_directorySelector_setValue;
	p.showDirectorySelect = EnsPortal_Component_directorySelector_showDirectorySelect;
}

self._zenClassIdx['dtlSelector'] = 'EnsPortal_Component_dtlSelector';
self.EnsPortal_Component_dtlSelector = function(index,id) {
	if (index>=0) {EnsPortal_Component_dtlSelector__init(this,index,id);}
}

self.EnsPortal_Component_dtlSelector__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_composite__init) ?zenMaster._ZEN_Component_composite__init(o,index,id):_ZEN_Component_composite__init(o,index,id);
}
function EnsPortal_Component_dtlSelector_serialize(set,s)
{
	var o = this;s[0]='4096323540';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.cellAlign;s[9]=o.cellSize;s[10]=o.cellStyle;s[11]=o.cellVAlign;s[12]=set.serializeList(o,o.children,true,'children');s[13]=(o.childrenCreated?1:0);s[14]=o.containerStyle;s[15]=(o.disabled?1:0);s[16]=(o.dragEnabled?1:0);s[17]=(o.dropEnabled?1:0);s[18]=(o.dynamic?1:0);s[19]=o.enclosingClass;s[20]=o.enclosingStyle;s[21]=o.error;s[22]=o.groupClass;s[23]=o.groupStyle;s[24]=o.height;s[25]=(o.hidden?1:0);s[26]=o.hint;s[27]=o.hintClass;s[28]=o.hintStyle;s[29]=o.label;s[30]=o.labelClass;s[31]=o.labelDisabledClass;s[32]=o.labelPosition;s[33]=o.labelStyle;s[34]=o.layout;s[35]=o.onafterdrag;s[36]=o.onbeforedrag;s[37]=o.onclick;s[38]=o.ondrag;s[39]=o.ondrop;s[40]=o.onhide;s[41]=o.onrefresh;s[42]=o.onshow;s[43]=o.onupdate;s[44]=o.overlayMode;s[45]=o.renderFlag;s[46]=(o.showLabel?1:0);s[47]=o.slice;s[48]=o.title;s[49]=o.tuple;s[50]=o.valign;s[51]=(o.visible?1:0);s[52]=o.width;
}
function EnsPortal_Component_dtlSelector_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self.EnsPortal_Component_dtlSelector_createChildren = function(form) {
var hgroup = zenPage.createComponent('hgroup');
var sel = zenPage.createComponent('selector');
sel.name = 'DTL';
sel.setProperty('id',this.id+'.transformSelector');
sel.size = 30;
sel.setProperty('context','Ens.ContextSearch/SubclassOf?class=Ens.DataTransform&abstract=0');
sel.onchange = "zenPage.settingChanged('"+escape(this.index)+"','"+escape(form.index)+"');"
sel.onkeyup = "zenPage.settingChanged('"+escape(this.index)+"','"+escape(form.index)+"');"
hgroup.addChild(sel);
var btn = zenPage.createComponent('image');
btn.src = 'deepsee/zoom_24.png';
btn.setProperty('id',this.id+'.transformDetails');
btn.title = $$$Text('Show details for the selected Transform.','Ensemble');
btn.onclick = "if (zenPage.stopTimers) {zenPage.stopTimers()}; zenPage.getComponentById('"+this.id+"').showDTL(); if (zenPage.startTimers) {zenPage.startTimers(2000)};"
hgroup.addChild(btn);
this.addChild(hgroup);
this.childrenCreated = true;
return '';
}

self.EnsPortal_Component_dtlSelector_getProperty = function(property,key) {
switch(property) {
case 'readOnly':
var sel = this.getChildById('transformSelector');
if (sel) return sel.getReadOnly();
break;
case 'value':
var selector = this.getChildById('transformSelector');
if (selector) {
return selector.getValue();
}
default:
return this.invokeSuper('getProperty',arguments);
}
}

self.EnsPortal_Component_dtlSelector_getValue = function() {
return this.getProperty('value');
}

self.EnsPortal_Component_dtlSelector_onRefreshContents = function() {
var old = zenPage.composites[this.id];
this.setValue(old.getValue());
zenPage.composites[this.id] = this;
}

self.EnsPortal_Component_dtlSelector_setProperty = function(property,value,value2) {
switch(property) {
case 'readOnly':
var sel = this.getChildById('transformSelector');
if (sel) sel.setReadOnly(value);
break;
case 'value':
var selector = this.getChildById('transformSelector');
if (selector) {
selector.setValue(value);
}
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self.EnsPortal_Component_dtlSelector_setValue = function(value,value2) {
this.setProperty('value',value,value2);
}

self.EnsPortal_Component_dtlSelector_showDTL = function() {
var name = this.getChildById('transformSelector').getValue();
if (name == '') {
alert($$$Text('Please select a valid transform'));
return;
}
var link = zenLink('EnsPortal.DTLEditor.zen');
link += (link.indexOf('?') > -1) ? '&' : '?';
link += 'DT=' + encodeURIComponent(name + '.dtl');
window.open(link);
}

self.EnsPortal_Component_dtlSelector_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self.EnsPortal_Component_dtlSelector__Loader = function() {
	zenLoadClass('_ZEN_Component_composite');
	EnsPortal_Component_dtlSelector.prototype = zenCreate('_ZEN_Component_composite',-1);
	var p = EnsPortal_Component_dtlSelector.prototype;
	if (null==p) {return;}
	p.constructor = EnsPortal_Component_dtlSelector;
	p.superClass = ('undefined' == typeof _ZEN_Component_composite) ? zenMaster._ZEN_Component_composite.prototype:_ZEN_Component_composite.prototype;
	p.__ZENcomponent = true;
	p._serverClass = 'EnsPortal.Component.dtlSelector';
	p._type = 'dtlSelector';
	p.serialize = EnsPortal_Component_dtlSelector_serialize;
	p.getSettings = EnsPortal_Component_dtlSelector_getSettings;
	p.ReallyRefreshContents = EnsPortal_Component_dtlSelector_ReallyRefreshContents;
	p.createChildren = EnsPortal_Component_dtlSelector_createChildren;
	p.getProperty = EnsPortal_Component_dtlSelector_getProperty;
	p.getValue = EnsPortal_Component_dtlSelector_getValue;
	p.onRefreshContents = EnsPortal_Component_dtlSelector_onRefreshContents;
	p.setProperty = EnsPortal_Component_dtlSelector_setProperty;
	p.setValue = EnsPortal_Component_dtlSelector_setValue;
	p.showDTL = EnsPortal_Component_dtlSelector_showDTL;
}

self._zenClassIdx['fileSelector'] = 'EnsPortal_Component_fileSelector';
self.EnsPortal_Component_fileSelector = function(index,id) {
	if (index>=0) {EnsPortal_Component_fileSelector__init(this,index,id);}
}

self.EnsPortal_Component_fileSelector__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_composite__init) ?zenMaster._ZEN_Component_composite__init(o,index,id):_ZEN_Component_composite__init(o,index,id);
	o.wildcard = '*';
}
function EnsPortal_Component_fileSelector_serialize(set,s)
{
	var o = this;s[0]='2393260446';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.cellAlign;s[9]=o.cellSize;s[10]=o.cellStyle;s[11]=o.cellVAlign;s[12]=set.serializeList(o,o.children,true,'children');s[13]=(o.childrenCreated?1:0);s[14]=o.containerStyle;s[15]=(o.disabled?1:0);s[16]=(o.dragEnabled?1:0);s[17]=(o.dropEnabled?1:0);s[18]=(o.dynamic?1:0);s[19]=o.enclosingClass;s[20]=o.enclosingStyle;s[21]=o.error;s[22]=o.groupClass;s[23]=o.groupStyle;s[24]=o.height;s[25]=(o.hidden?1:0);s[26]=o.hint;s[27]=o.hintClass;s[28]=o.hintStyle;s[29]=o.label;s[30]=o.labelClass;s[31]=o.labelDisabledClass;s[32]=o.labelPosition;s[33]=o.labelStyle;s[34]=o.layout;s[35]=o.onafterdrag;s[36]=o.onbeforedrag;s[37]=o.onclick;s[38]=o.ondrag;s[39]=o.ondrop;s[40]=o.onhide;s[41]=o.onrefresh;s[42]=o.onshow;s[43]=o.onupdate;s[44]=o.overlayMode;s[45]=o.renderFlag;s[46]=(o.showLabel?1:0);s[47]=o.slice;s[48]=o.title;s[49]=o.tuple;s[50]=o.valign;s[51]=(o.visible?1:0);s[52]=o.width;s[53]=o.wildcard;
}
function EnsPortal_Component_fileSelector_getSettings(s)
{
	s['name'] = 'string';
	s['wildcard'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self.EnsPortal_Component_fileSelector_createChildren = function(form) {
var hgroup = zenPage.createComponent('hgroup');
var text = zenPage.createComponent('text');
text.setProperty('id',this.id + '.txtFileValue');
text.setProperty('size',35);
text.onchange = "zenPage.settingChanged('"+escape(this.index)+"','"+escape(form.index)+"');"
text.onkeyup = "zenPage.settingChanged('"+escape(this.index)+"','"+escape(form.index)+"');"
hgroup.addChild(text);
var btn = zenPage.createComponent('image');
btn.src = 'deepsee/zoom_24.png';
btn.setProperty('id',this.id + '.btnFileValue');
btn.title = $$$Text('Select a file');
btn.onclick = 'zenIndex('+this.index+').showFileSelect();'
hgroup.addChild(btn);
this.addChild(hgroup);
this.childrenCreated = true;
return '';
}

self.EnsPortal_Component_fileSelector_getForm = function() {
var text = this.getChildById('txtFileValue');
if (text) return text.getForm();
return null;
}

self.EnsPortal_Component_fileSelector_getProperty = function(property,key) {
switch(property) {
case 'readOnly':
var txt = this.getChildById('txtFileValue');
var btn = this.getChildById('btnFileValue');
if (txt && btn) return (txt.getReadOnly() && btn.getProperty('disabled'));
break;
case 'value':
var txt = this.getChildById('txtFileValue');
if (txt) return txt.getValue();
default:
return this.invokeSuper('getProperty',arguments);
}
}

self.EnsPortal_Component_fileSelector_getValue = function() {
return this.getProperty('value');
}

self.EnsPortal_Component_fileSelector_onDisplayHandler = function() {
var buttonEnabled = (zenPage && zenPage.canViewFileSystem && this.disabled==false && !this.getProperty('readOnly'));
var button = this.getChildById('btnFileValue');
if (button) button.setDisabled(!buttonEnabled);
}

self.EnsPortal_Component_fileSelector_onRefreshContents = function() {
var old = zenPage.composites[this.id];
this.setValue(old.getValue());
zenPage.composites[this.id] = this;
}

self.EnsPortal_Component_fileSelector_setProperty = function(property,value,value2) {
switch(property) {
case 'readOnly':
var txt = this.getChildById('txtFileValue');
if (txt) txt.setReadOnly(value);
var btn = this.getChildById('btnFileValue');
if (btn) btn.setDisabled(value);
break;
case 'value':
var txt = this.getChildById('txtFileValue');
if (txt) {
txt.setValue(value);
}
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self.EnsPortal_Component_fileSelector_setValue = function(value,value2) {
this.setProperty('value',value,value2);
}

self.EnsPortal_Component_fileSelector_showFileSelect = function() {
if (zenPage && (typeof zenPage.selectFile == 'function')) {
zenPage.selectFile(this.index);
}
}

self.EnsPortal_Component_fileSelector_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self.EnsPortal_Component_fileSelector__Loader = function() {
	zenLoadClass('_ZEN_Component_composite');
	EnsPortal_Component_fileSelector.prototype = zenCreate('_ZEN_Component_composite',-1);
	var p = EnsPortal_Component_fileSelector.prototype;
	if (null==p) {return;}
	p.constructor = EnsPortal_Component_fileSelector;
	p.superClass = ('undefined' == typeof _ZEN_Component_composite) ? zenMaster._ZEN_Component_composite.prototype:_ZEN_Component_composite.prototype;
	p.__ZENcomponent = true;
	p._serverClass = 'EnsPortal.Component.fileSelector';
	p._type = 'fileSelector';
	p.serialize = EnsPortal_Component_fileSelector_serialize;
	p.getSettings = EnsPortal_Component_fileSelector_getSettings;
	p.ReallyRefreshContents = EnsPortal_Component_fileSelector_ReallyRefreshContents;
	p.createChildren = EnsPortal_Component_fileSelector_createChildren;
	p.getForm = EnsPortal_Component_fileSelector_getForm;
	p.getProperty = EnsPortal_Component_fileSelector_getProperty;
	p.getValue = EnsPortal_Component_fileSelector_getValue;
	p.onDisplayHandler = EnsPortal_Component_fileSelector_onDisplayHandler;
	p.onRefreshContents = EnsPortal_Component_fileSelector_onRefreshContents;
	p.setProperty = EnsPortal_Component_fileSelector_setProperty;
	p.setValue = EnsPortal_Component_fileSelector_setValue;
	p.showFileSelect = EnsPortal_Component_fileSelector_showFileSelect;
}

self._zenClassIdx['lookuptableSelector'] = 'EnsPortal_Component_lookuptableSelector';
self.EnsPortal_Component_lookuptableSelector = function(index,id) {
	if (index>=0) {EnsPortal_Component_lookuptableSelector__init(this,index,id);}
}

self.EnsPortal_Component_lookuptableSelector__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_composite__init) ?zenMaster._ZEN_Component_composite__init(o,index,id):_ZEN_Component_composite__init(o,index,id);
}
function EnsPortal_Component_lookuptableSelector_serialize(set,s)
{
	var o = this;s[0]='4096323540';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.cellAlign;s[9]=o.cellSize;s[10]=o.cellStyle;s[11]=o.cellVAlign;s[12]=set.serializeList(o,o.children,true,'children');s[13]=(o.childrenCreated?1:0);s[14]=o.containerStyle;s[15]=(o.disabled?1:0);s[16]=(o.dragEnabled?1:0);s[17]=(o.dropEnabled?1:0);s[18]=(o.dynamic?1:0);s[19]=o.enclosingClass;s[20]=o.enclosingStyle;s[21]=o.error;s[22]=o.groupClass;s[23]=o.groupStyle;s[24]=o.height;s[25]=(o.hidden?1:0);s[26]=o.hint;s[27]=o.hintClass;s[28]=o.hintStyle;s[29]=o.label;s[30]=o.labelClass;s[31]=o.labelDisabledClass;s[32]=o.labelPosition;s[33]=o.labelStyle;s[34]=o.layout;s[35]=o.onafterdrag;s[36]=o.onbeforedrag;s[37]=o.onclick;s[38]=o.ondrag;s[39]=o.ondrop;s[40]=o.onhide;s[41]=o.onrefresh;s[42]=o.onshow;s[43]=o.onupdate;s[44]=o.overlayMode;s[45]=o.renderFlag;s[46]=(o.showLabel?1:0);s[47]=o.slice;s[48]=o.title;s[49]=o.tuple;s[50]=o.valign;s[51]=(o.visible?1:0);s[52]=o.width;
}
function EnsPortal_Component_lookuptableSelector_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self.EnsPortal_Component_lookuptableSelector_createChildren = function(form) {
var hgroup = zenPage.createComponent('hgroup');
var sel = zenPage.createComponent('selector');
sel.name="LookupTables";
sel.setProperty('id',this.id+".sel"+sel.name);
sel.size=30;
sel.setProperty('context',"Ens.ContextSearch/LookupTables");
sel.onchange = "zenPage.settingChanged('"+escape(this.index)+"','"+escape(form.index)+"');"
sel.onkeyup = "zenPage.settingChanged('"+escape(this.index)+"','"+escape(form.index)+"');"
hgroup.addChild(sel);
var btn = zenPage.createComponent('image');
btn.src="deepsee/zoom_24.png";
btn.setProperty('id',this.id+"."+"btn"+sel.name);
btn.title="Show the Lookup Tables management page.";
btn.onclick="if (zenPage.stopTimers) {zenPage.stopTimers()}; zenPage.getComponentById('"+this.id+"').showLookupTableDetails(); if (zenPage.startTimers) {zenPage.startTimers(2000)};"
hgroup.addChild(btn);
this.addChild(hgroup);
this.childrenCreated = true;
return '';
}

self.EnsPortal_Component_lookuptableSelector_getProperty = function(property,key) {
switch(property) {
case 'readOnly':
var sel = this.getChildById('selLookupTables');
if (sel) return sel.getReadOnly();
break;
case 'value':
var sel = this.getChildById('selLookupTables');
if (sel) return sel.getValue();
default:
return this.invokeSuper('getProperty',arguments);
}
}

self.EnsPortal_Component_lookuptableSelector_getValue = function() {
return this.getProperty('value');
}

self.EnsPortal_Component_lookuptableSelector_onRefreshContents = function() {
var old = zenPage.composites[this.id];
this.setValue(old.getValue());
zenPage.composites[this.id] = this;
}

self.EnsPortal_Component_lookuptableSelector_setProperty = function(property,value,value2) {
switch(property) {
case 'readOnly':
var sel = this.getChildById('selLookupTables');
if (sel) sel.setReadOnly(value);
break;
case 'value':
var sel = this.getChildById('selLookupTables');
if (sel) {
sel.setValue(value);
}
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self.EnsPortal_Component_lookuptableSelector_setValue = function(value,value2) {
this.setProperty('value',value,value2);
}

self.EnsPortal_Component_lookuptableSelector_showLookupTableDetails = function() {
var name = this.getChildById('selLookupTables').getValue();
if ((name.charAt(0) !== '@')) {
alert($$$Text('Click here after selecting a Lookup Table, to see the Lookup Table management page'));
return;
}
try {
if (!zenPage.hasPermissionForLink('%Ens_LookupTables','READ')) {
alert($$$Text('Insufficient Privilege to see the Lookup Table management page'));
return;
}
/* ContextSearch prepends @ */
if (name.charAt(0) === '@') name = name.slice(1);
} catch (ex) {/* link to management page will still enforce privilege required */}
var link = zenLink('EnsPortal.LookupSettings.zen');
link += (link.indexOf('?') > -1) ? '&' : '?';
link += 'LookupTable=' + encodeURIComponent(name);
window.open(link);
}

self.EnsPortal_Component_lookuptableSelector_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self.EnsPortal_Component_lookuptableSelector__Loader = function() {
	zenLoadClass('_ZEN_Component_composite');
	EnsPortal_Component_lookuptableSelector.prototype = zenCreate('_ZEN_Component_composite',-1);
	var p = EnsPortal_Component_lookuptableSelector.prototype;
	if (null==p) {return;}
	p.constructor = EnsPortal_Component_lookuptableSelector;
	p.superClass = ('undefined' == typeof _ZEN_Component_composite) ? zenMaster._ZEN_Component_composite.prototype:_ZEN_Component_composite.prototype;
	p.__ZENcomponent = true;
	p._serverClass = 'EnsPortal.Component.lookuptableSelector';
	p._type = 'lookuptableSelector';
	p.serialize = EnsPortal_Component_lookuptableSelector_serialize;
	p.getSettings = EnsPortal_Component_lookuptableSelector_getSettings;
	p.ReallyRefreshContents = EnsPortal_Component_lookuptableSelector_ReallyRefreshContents;
	p.createChildren = EnsPortal_Component_lookuptableSelector_createChildren;
	p.getProperty = EnsPortal_Component_lookuptableSelector_getProperty;
	p.getValue = EnsPortal_Component_lookuptableSelector_getValue;
	p.onRefreshContents = EnsPortal_Component_lookuptableSelector_onRefreshContents;
	p.setProperty = EnsPortal_Component_lookuptableSelector_setProperty;
	p.setValue = EnsPortal_Component_lookuptableSelector_setValue;
	p.showLookupTableDetails = EnsPortal_Component_lookuptableSelector_showLookupTableDetails;
}

self._zenClassIdx['mftconnectionSelector'] = 'EnsPortal_Component_mftconnectionSelector';
self.EnsPortal_Component_mftconnectionSelector = function(index,id) {
	if (index>=0) {EnsPortal_Component_mftconnectionSelector__init(this,index,id);}
}

self.EnsPortal_Component_mftconnectionSelector__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_composite__init) ?zenMaster._ZEN_Component_composite__init(o,index,id):_ZEN_Component_composite__init(o,index,id);
}
function EnsPortal_Component_mftconnectionSelector_serialize(set,s)
{
	var o = this;s[0]='4096323540';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.cellAlign;s[9]=o.cellSize;s[10]=o.cellStyle;s[11]=o.cellVAlign;s[12]=set.serializeList(o,o.children,true,'children');s[13]=(o.childrenCreated?1:0);s[14]=o.containerStyle;s[15]=(o.disabled?1:0);s[16]=(o.dragEnabled?1:0);s[17]=(o.dropEnabled?1:0);s[18]=(o.dynamic?1:0);s[19]=o.enclosingClass;s[20]=o.enclosingStyle;s[21]=o.error;s[22]=o.groupClass;s[23]=o.groupStyle;s[24]=o.height;s[25]=(o.hidden?1:0);s[26]=o.hint;s[27]=o.hintClass;s[28]=o.hintStyle;s[29]=o.label;s[30]=o.labelClass;s[31]=o.labelDisabledClass;s[32]=o.labelPosition;s[33]=o.labelStyle;s[34]=o.layout;s[35]=o.onafterdrag;s[36]=o.onbeforedrag;s[37]=o.onclick;s[38]=o.ondrag;s[39]=o.ondrop;s[40]=o.onhide;s[41]=o.onrefresh;s[42]=o.onshow;s[43]=o.onupdate;s[44]=o.overlayMode;s[45]=o.renderFlag;s[46]=(o.showLabel?1:0);s[47]=o.slice;s[48]=o.title;s[49]=o.tuple;s[50]=o.valign;s[51]=(o.visible?1:0);s[52]=o.width;
}
function EnsPortal_Component_mftconnectionSelector_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self.EnsPortal_Component_mftconnectionSelector_createChildren = function(form) {
var hgroup = zenPage.createComponent('hgroup');
var sel = zenPage.createComponent('selector');
sel.name="MFTConnections";
sel.setProperty('id',this.id+".sel"+sel.name);
sel.size=30;
sel.setProperty('context',"Ens.MFT.ContextSearch/Connections");
sel.onchange = "zenPage.settingChanged('"+escape(this.index)+"','"+escape(form.index)+"');"
sel.onkeyup = "zenPage.settingChanged('"+escape(this.index)+"','"+escape(form.index)+"');"
hgroup.addChild(sel);
var btn = zenPage.createComponent('image');
btn.src="deepsee/zoom_24.png";
btn.setProperty('id',this.id+"."+"btn"+sel.name);
btn.title="Show the Managed File Transfer Connections configuration page.";
btn.onclick="if (zenPage.stopTimers) {zenPage.stopTimers()}; zenPage.getComponentById('"+this.id+"').showMFTConnectionsDetails(); if (zenPage.startTimers) {zenPage.startTimers(2000)};"
hgroup.addChild(btn);
this.addChild(hgroup);
this.childrenCreated = true;
return '';
}

self.EnsPortal_Component_mftconnectionSelector_getProperty = function(property,key) {
switch(property) {
case 'readOnly':
var sel = this.getChildById('selMFTConnections');
if (sel) return sel.getReadOnly();
break;
case 'value':
var sel = this.getChildById('selMFTConnections');
if (sel) return sel.getValue();
default:
return this.invokeSuper('getProperty',arguments);
}
}

self.EnsPortal_Component_mftconnectionSelector_getValue = function() {
return this.getProperty('value');
}

self.EnsPortal_Component_mftconnectionSelector_onRefreshContents = function() {
var old = zenPage.composites[this.id];
this.setValue(old.getValue());
zenPage.composites[this.id] = this;
}

self.EnsPortal_Component_mftconnectionSelector_setProperty = function(property,value,value2) {
switch(property) {
case 'readOnly':
var sel = this.getChildById('selMFTConnections');
if (sel) sel.setReadOnly(value);
break;
case 'value':
var sel = this.getChildById('selMFTConnections');
if (sel) {
sel.setValue(value);
}
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self.EnsPortal_Component_mftconnectionSelector_setValue = function(value,value2) {
this.setProperty('value',value,value2);
}

self.EnsPortal_Component_mftconnectionSelector_showMFTConnectionsDetails = function() {
try {
if (!zenPage.hasPermissionForLink('%Admin_Secure','USE')) {
alert($$$Text('Insufficient Privilege to see the MFT Connection management page'));
return;
}
} catch (ex) {/* link to management page will still enforce privilege required */}
var link = zenLink('/csp/sys/sec/%25CSP.UI.Portal.MFT.ConnectionList.zen');
window.open(link);
}

self.EnsPortal_Component_mftconnectionSelector_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self.EnsPortal_Component_mftconnectionSelector__Loader = function() {
	zenLoadClass('_ZEN_Component_composite');
	EnsPortal_Component_mftconnectionSelector.prototype = zenCreate('_ZEN_Component_composite',-1);
	var p = EnsPortal_Component_mftconnectionSelector.prototype;
	if (null==p) {return;}
	p.constructor = EnsPortal_Component_mftconnectionSelector;
	p.superClass = ('undefined' == typeof _ZEN_Component_composite) ? zenMaster._ZEN_Component_composite.prototype:_ZEN_Component_composite.prototype;
	p.__ZENcomponent = true;
	p._serverClass = 'EnsPortal.Component.mftconnectionSelector';
	p._type = 'mftconnectionSelector';
	p.serialize = EnsPortal_Component_mftconnectionSelector_serialize;
	p.getSettings = EnsPortal_Component_mftconnectionSelector_getSettings;
	p.ReallyRefreshContents = EnsPortal_Component_mftconnectionSelector_ReallyRefreshContents;
	p.createChildren = EnsPortal_Component_mftconnectionSelector_createChildren;
	p.getProperty = EnsPortal_Component_mftconnectionSelector_getProperty;
	p.getValue = EnsPortal_Component_mftconnectionSelector_getValue;
	p.onRefreshContents = EnsPortal_Component_mftconnectionSelector_onRefreshContents;
	p.setProperty = EnsPortal_Component_mftconnectionSelector_setProperty;
	p.setValue = EnsPortal_Component_mftconnectionSelector_setValue;
	p.showMFTConnectionsDetails = EnsPortal_Component_mftconnectionSelector_showMFTConnectionsDetails;
}

self._zenClassIdx['partnerSelector'] = 'EnsPortal_Component_partnerSelector';
self.EnsPortal_Component_partnerSelector = function(index,id) {
	if (index>=0) {EnsPortal_Component_partnerSelector__init(this,index,id);}
}

self.EnsPortal_Component_partnerSelector__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_composite__init) ?zenMaster._ZEN_Component_composite__init(o,index,id):_ZEN_Component_composite__init(o,index,id);
}
function EnsPortal_Component_partnerSelector_serialize(set,s)
{
	var o = this;s[0]='4096323540';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.cellAlign;s[9]=o.cellSize;s[10]=o.cellStyle;s[11]=o.cellVAlign;s[12]=set.serializeList(o,o.children,true,'children');s[13]=(o.childrenCreated?1:0);s[14]=o.containerStyle;s[15]=(o.disabled?1:0);s[16]=(o.dragEnabled?1:0);s[17]=(o.dropEnabled?1:0);s[18]=(o.dynamic?1:0);s[19]=o.enclosingClass;s[20]=o.enclosingStyle;s[21]=o.error;s[22]=o.groupClass;s[23]=o.groupStyle;s[24]=o.height;s[25]=(o.hidden?1:0);s[26]=o.hint;s[27]=o.hintClass;s[28]=o.hintStyle;s[29]=o.label;s[30]=o.labelClass;s[31]=o.labelDisabledClass;s[32]=o.labelPosition;s[33]=o.labelStyle;s[34]=o.layout;s[35]=o.onafterdrag;s[36]=o.onbeforedrag;s[37]=o.onclick;s[38]=o.ondrag;s[39]=o.ondrop;s[40]=o.onhide;s[41]=o.onrefresh;s[42]=o.onshow;s[43]=o.onupdate;s[44]=o.overlayMode;s[45]=o.renderFlag;s[46]=(o.showLabel?1:0);s[47]=o.slice;s[48]=o.title;s[49]=o.tuple;s[50]=o.valign;s[51]=(o.visible?1:0);s[52]=o.width;
}
function EnsPortal_Component_partnerSelector_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self.EnsPortal_Component_partnerSelector_createChildren = function(form) {
var hgroup = zenPage.createComponent('hgroup');
var sel = zenPage.createComponent('selector');
sel.name="BusinessPartner";
sel.setProperty('id',this.id+".sel"+sel.name);
sel.size=30;
sel.setProperty('context',"Ens.ContextSearch/BusinessPartners");
sel.onchange = "zenPage.settingChanged('"+escape(this.index)+"','"+escape(form.index)+"');"
sel.onkeyup = "zenPage.settingChanged('"+escape(this.index)+"','"+escape(form.index)+"');"
hgroup.addChild(sel);
var btn = zenPage.createComponent('image');
btn.src="deepsee/zoom_24.png";
btn.setProperty('id',this.id+"."+"btn"+sel.name);
btn.title="Show details for the selected Business Partner.";
btn.onclick="if (zenPage.stopTimers) {zenPage.stopTimers()}; zenPage.getComponentById('"+this.id+"').showPartnerDetails(); if (zenPage.startTimers) {zenPage.startTimers(2000)};"
hgroup.addChild(btn);
this.addChild(hgroup);
/*  Removed by HCR306
var link = zenPage.createComponent('link');
link.enclosingStyle="font-size:10pt;";
link.labelClass="ribbonSortOption";
link.caption="Business Partners Configuration Page";
link.title="Click here to go to the Business Partners configuration page.";
link.href="EnsPortal.BusinessPartners.zen";
this.addChild(link);
*/
this.childrenCreated = true;
return '';
}

self.EnsPortal_Component_partnerSelector_getProperty = function(property,key) {
switch(property) {
case 'readOnly':
var sel = this.getChildById('selBusinessPartner');
if (sel) return sel.getReadOnly();
break;
case 'value':
var sel = this.getChildById('selBusinessPartner');
if (sel) return sel.getValue();
default:
return this.invokeSuper('getProperty',arguments);
}
}

self.EnsPortal_Component_partnerSelector_getValue = function() {
return this.getProperty('value');
}

self.EnsPortal_Component_partnerSelector_onRefreshContents = function() {
var old = zenPage.composites[this.id];
this.setValue(old.getValue());
zenPage.composites[this.id] = this;
}

self.EnsPortal_Component_partnerSelector_setProperty = function(property,value,value2) {
switch(property) {
case 'readOnly':
var sel = this.getChildById('selBusinessPartner');
if (sel) sel.setReadOnly(value);
break;
case 'value':
var sel = this.getChildById('selBusinessPartner');
if (sel) {
sel.setValue(value);
}
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self.EnsPortal_Component_partnerSelector_setValue = function(value,value2) {
this.setProperty('value',value,value2);
}

self.EnsPortal_Component_partnerSelector_showPartnerDetails = function() {
var name = this.getChildById('selBusinessPartner').getValue();
if (''==name) {
alert($$$Text('Click here after selecting a business partner to see the business partner\'s details'));
return;
}
var parms = {
NAME:name
};
zenLaunchPopupWindow(zenLink('EnsPortal.Dialog.BusinessPartnerDetails.zen'),'','status,scrollbars,resizable=yes,width=700,height=800',parms);
}

self.EnsPortal_Component_partnerSelector_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self.EnsPortal_Component_partnerSelector__Loader = function() {
	zenLoadClass('_ZEN_Component_composite');
	EnsPortal_Component_partnerSelector.prototype = zenCreate('_ZEN_Component_composite',-1);
	var p = EnsPortal_Component_partnerSelector.prototype;
	if (null==p) {return;}
	p.constructor = EnsPortal_Component_partnerSelector;
	p.superClass = ('undefined' == typeof _ZEN_Component_composite) ? zenMaster._ZEN_Component_composite.prototype:_ZEN_Component_composite.prototype;
	p.__ZENcomponent = true;
	p._serverClass = 'EnsPortal.Component.partnerSelector';
	p._type = 'partnerSelector';
	p.serialize = EnsPortal_Component_partnerSelector_serialize;
	p.getSettings = EnsPortal_Component_partnerSelector_getSettings;
	p.ReallyRefreshContents = EnsPortal_Component_partnerSelector_ReallyRefreshContents;
	p.createChildren = EnsPortal_Component_partnerSelector_createChildren;
	p.getProperty = EnsPortal_Component_partnerSelector_getProperty;
	p.getValue = EnsPortal_Component_partnerSelector_getValue;
	p.onRefreshContents = EnsPortal_Component_partnerSelector_onRefreshContents;
	p.setProperty = EnsPortal_Component_partnerSelector_setProperty;
	p.setValue = EnsPortal_Component_partnerSelector_setValue;
	p.showPartnerDetails = EnsPortal_Component_partnerSelector_showPartnerDetails;
}

self._zenClassIdx['ruleSelector'] = 'EnsPortal_Component_ruleSelector';
self.EnsPortal_Component_ruleSelector = function(index,id) {
	if (index>=0) {EnsPortal_Component_ruleSelector__init(this,index,id);}
}

self.EnsPortal_Component_ruleSelector__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_composite__init) ?zenMaster._ZEN_Component_composite__init(o,index,id):_ZEN_Component_composite__init(o,index,id);
	o.ruleEditorBaseURL = '\/ui\/interop\/rule-editor\/index.html?$NAMESPACE=ENSLIB';
}
function EnsPortal_Component_ruleSelector_serialize(set,s)
{
	var o = this;s[0]='3728682564';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.cellAlign;s[9]=o.cellSize;s[10]=o.cellStyle;s[11]=o.cellVAlign;s[12]=set.serializeList(o,o.children,true,'children');s[13]=(o.childrenCreated?1:0);s[14]=o.containerStyle;s[15]=(o.disabled?1:0);s[16]=(o.dragEnabled?1:0);s[17]=(o.dropEnabled?1:0);s[18]=(o.dynamic?1:0);s[19]=o.enclosingClass;s[20]=o.enclosingStyle;s[21]=o.error;s[22]=o.groupClass;s[23]=o.groupStyle;s[24]=o.height;s[25]=(o.hidden?1:0);s[26]=o.hint;s[27]=o.hintClass;s[28]=o.hintStyle;s[29]=o.label;s[30]=o.labelClass;s[31]=o.labelDisabledClass;s[32]=o.labelPosition;s[33]=o.labelStyle;s[34]=o.layout;s[35]=o.onafterdrag;s[36]=o.onbeforedrag;s[37]=o.onclick;s[38]=o.ondrag;s[39]=o.ondrop;s[40]=o.onhide;s[41]=o.onrefresh;s[42]=o.onshow;s[43]=o.onupdate;s[44]=o.overlayMode;s[45]=o.renderFlag;s[46]=o.ruleEditorBaseURL;s[47]=(o.showLabel?1:0);s[48]=o.slice;s[49]=o.title;s[50]=o.tuple;s[51]=o.valign;s[52]=(o.visible?1:0);s[53]=o.width;
}
function EnsPortal_Component_ruleSelector_getSettings(s)
{
	s['name'] = 'string';
	s['ruleEditorBaseURL'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self.EnsPortal_Component_ruleSelector_createChildren = function(form) {
var hgroup = zenPage.createComponent('hgroup');
var sel = zenPage.createComponent('selector');
sel.name="Rule";
sel.setProperty('id',this.id+".sel"+sel.name);
sel.size=30;
sel.setProperty('context',"Ens.ContextSearch/RuleNames");
sel.onchange = "zenPage.settingChanged('"+escape(this.index)+"','"+escape(form.index)+"');"
sel.onkeyup = "zenPage.settingChanged('"+escape(this.index)+"','"+escape(form.index)+"');"
hgroup.addChild(sel);
var btn = zenPage.createComponent('image');
btn.src="deepsee/zoom_24.png";
btn.setProperty('id',this.id+"."+"btn"+sel.name);
btn.title="Show details for the selected Rule.";
btn.onclick="if (zenPage.stopTimers) {zenPage.stopTimers()}; zenPage.getComponentById('"+this.id+"').showRuleDetails(); if (zenPage.startTimers) {zenPage.startTimers(2000)};"
hgroup.addChild(btn);
this.addChild(hgroup);
this.childrenCreated = true;
return '';
}

self.EnsPortal_Component_ruleSelector_getProperty = function(property,key) {
switch(property) {
case 'readOnly':
var sel = this.getChildById('selRule');
if (sel) return sel.getReadOnly();
break;
case 'value':
var sel = this.getChildById('selRule');
if (sel) return sel.getValue();
default:
return this.invokeSuper('getProperty',arguments);
}
}

self.EnsPortal_Component_ruleSelector_getValue = function() {
return this.getProperty('value');
}

self.EnsPortal_Component_ruleSelector_onRefreshContents = function() {
var old = zenPage.composites[this.id];
this.setValue(old.getValue());
zenPage.composites[this.id] = this;
}

self.EnsPortal_Component_ruleSelector_setProperty = function(property,value,value2) {
switch(property) {
case 'readOnly':
var sel = this.getChildById('selRule');
if (sel) sel.setReadOnly(value);
break;
case 'value':
var sel = this.getChildById('selRule');
if (sel) {
sel.setValue(value);
}
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self.EnsPortal_Component_ruleSelector_setValue = function(value,value2) {
this.setProperty('value',value,value2);
}

self.EnsPortal_Component_ruleSelector_showRuleDetails = function() {
var name = this.getChildById('selRule').getValue();
if (''==name) {
alert($$$Text('Click here after selecting a rule to see the rule\'s details'));
}
else { // make sure we are using a class name, not an alias, when popping up the rule editor;
var link = zenLink(zenPage.ruleEditorBaseURL);
link += (link.indexOf('?') > -1) ? '&' : '?';
var className = this.GetClassName(name);
if (className.length > 0) {
link += 'rule=' + encodeURIComponent(className);
window.open(link);
}
else {
if (confirm($$$FormatText($$$Text('The rule %1 does not exist; would you like to create it?'),name))) {
link += 'rule=' + encodeURIComponent(name) + '&NEW=1';
window.open(link);
}
}
}
}

self.EnsPortal_Component_ruleSelector_GetClassName = function(id) {
	return zenClassMethod(this,'GetClassName','L','VARCHAR',arguments);
}

self.EnsPortal_Component_ruleSelector_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self.EnsPortal_Component_ruleSelector__Loader = function() {
	zenLoadClass('_ZEN_Component_composite');
	EnsPortal_Component_ruleSelector.prototype = zenCreate('_ZEN_Component_composite',-1);
	var p = EnsPortal_Component_ruleSelector.prototype;
	if (null==p) {return;}
	p.constructor = EnsPortal_Component_ruleSelector;
	p.superClass = ('undefined' == typeof _ZEN_Component_composite) ? zenMaster._ZEN_Component_composite.prototype:_ZEN_Component_composite.prototype;
	p.__ZENcomponent = true;
	p._serverClass = 'EnsPortal.Component.ruleSelector';
	p._type = 'ruleSelector';
	p.serialize = EnsPortal_Component_ruleSelector_serialize;
	p.getSettings = EnsPortal_Component_ruleSelector_getSettings;
	p.GetClassName = EnsPortal_Component_ruleSelector_GetClassName;
	p.ReallyRefreshContents = EnsPortal_Component_ruleSelector_ReallyRefreshContents;
	p.createChildren = EnsPortal_Component_ruleSelector_createChildren;
	p.getProperty = EnsPortal_Component_ruleSelector_getProperty;
	p.getValue = EnsPortal_Component_ruleSelector_getValue;
	p.onRefreshContents = EnsPortal_Component_ruleSelector_onRefreshContents;
	p.setProperty = EnsPortal_Component_ruleSelector_setProperty;
	p.setValue = EnsPortal_Component_ruleSelector_setValue;
	p.showRuleDetails = EnsPortal_Component_ruleSelector_showRuleDetails;
}

self._zenClassIdx['scheduleSelector'] = 'EnsPortal_Component_scheduleSelector';
self.EnsPortal_Component_scheduleSelector = function(index,id) {
	if (index>=0) {EnsPortal_Component_scheduleSelector__init(this,index,id);}
}

self.EnsPortal_Component_scheduleSelector__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_composite__init) ?zenMaster._ZEN_Component_composite__init(o,index,id):_ZEN_Component_composite__init(o,index,id);
}
function EnsPortal_Component_scheduleSelector_serialize(set,s)
{
	var o = this;s[0]='4096323540';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.cellAlign;s[9]=o.cellSize;s[10]=o.cellStyle;s[11]=o.cellVAlign;s[12]=set.serializeList(o,o.children,true,'children');s[13]=(o.childrenCreated?1:0);s[14]=o.containerStyle;s[15]=(o.disabled?1:0);s[16]=(o.dragEnabled?1:0);s[17]=(o.dropEnabled?1:0);s[18]=(o.dynamic?1:0);s[19]=o.enclosingClass;s[20]=o.enclosingStyle;s[21]=o.error;s[22]=o.groupClass;s[23]=o.groupStyle;s[24]=o.height;s[25]=(o.hidden?1:0);s[26]=o.hint;s[27]=o.hintClass;s[28]=o.hintStyle;s[29]=o.label;s[30]=o.labelClass;s[31]=o.labelDisabledClass;s[32]=o.labelPosition;s[33]=o.labelStyle;s[34]=o.layout;s[35]=o.onafterdrag;s[36]=o.onbeforedrag;s[37]=o.onclick;s[38]=o.ondrag;s[39]=o.ondrop;s[40]=o.onhide;s[41]=o.onrefresh;s[42]=o.onshow;s[43]=o.onupdate;s[44]=o.overlayMode;s[45]=o.renderFlag;s[46]=(o.showLabel?1:0);s[47]=o.slice;s[48]=o.title;s[49]=o.tuple;s[50]=o.valign;s[51]=(o.visible?1:0);s[52]=o.width;
}
function EnsPortal_Component_scheduleSelector_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self.EnsPortal_Component_scheduleSelector_createChildren = function(form) {
var hgroup = zenPage.createComponent('hgroup');
var sel = zenPage.createComponent('selector');
sel.name="Schedule";
sel.setProperty('id',this.id+".sel"+sel.name);
sel.size=30;
sel.setProperty('context',"Ens.ContextSearch/ScheduleNames");
sel.onchange = "zenPage.settingChanged('"+escape(this.index)+"','"+escape(form.index)+"');"
sel.onkeyup = "zenPage.settingChanged('"+escape(this.index)+"','"+escape(form.index)+"');"
hgroup.addChild(sel);
var btn = zenPage.createComponent('image');
btn.src="deepsee/zoom_24.png";
btn.setProperty('id',this.id+"."+"btn"+sel.name);
btn.title="Launch the Schedule Spec Editor to create, edit or view a schedule.";
btn.onclick="if (zenPage.stopTimers) {zenPage.stopTimers()}; zenPage.getComponentById('"+this.id+"').showScheduleDetails(); if (zenPage.startTimers) {zenPage.startTimers(2000)};"
hgroup.addChild(btn);
this.addChild(hgroup);
this.childrenCreated = true;
return '';
}

self.EnsPortal_Component_scheduleSelector_getProperty = function(property,key) {
switch(property) {
case 'readOnly':
var sel = this.getChildById('selSchedule');
if (sel) return sel.getReadOnly();
break;
case 'value':
var sel = this.getChildById('selSchedule');
if (sel) return sel.getValue();
default:
return this.invokeSuper('getProperty',arguments);
}
}

self.EnsPortal_Component_scheduleSelector_getValue = function() {
return this.getProperty('value');
}

self.EnsPortal_Component_scheduleSelector_onRefreshContents = function() {
var old = zenPage.composites[this.id];
this.setValue(old.getValue());
zenPage.composites[this.id] = this;
}

self.EnsPortal_Component_scheduleSelector_setProperty = function(property,value,value2) {
switch(property) {
case 'readOnly':
var sel = this.getChildById('selSchedule');
if (sel) sel.setReadOnly(value);
break;
case 'value':
var sel = this.getChildById('selSchedule');
if (sel) {
sel.setValue(value);
}
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self.EnsPortal_Component_scheduleSelector_setValue = function(value,value2) {
this.setProperty('value',value,value2);
}

self.EnsPortal_Component_scheduleSelector_showScheduleDetails = function() {
var name = this.getChildById('selSchedule').getValue();
if (name.charAt(0) == '@') { // it is the name of a named schedule
var parms = {
scheduleId:name,
editMode:"ProductionConfigPopup"
};
}
else { // it is the specification string for an unnamed schedule
var parms = {
schedule:name,
editMode:"ProductionConfigPopup"
};
}
zenLaunchPopupWindow(zenLink('EnsPortal.ScheduleEditor.zen'),'ScheduleDetails','status,scrollbars,resizable=yes,width=1200,height=700',parms);
}

self.EnsPortal_Component_scheduleSelector_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self.EnsPortal_Component_scheduleSelector__Loader = function() {
	zenLoadClass('_ZEN_Component_composite');
	EnsPortal_Component_scheduleSelector.prototype = zenCreate('_ZEN_Component_composite',-1);
	var p = EnsPortal_Component_scheduleSelector.prototype;
	if (null==p) {return;}
	p.constructor = EnsPortal_Component_scheduleSelector;
	p.superClass = ('undefined' == typeof _ZEN_Component_composite) ? zenMaster._ZEN_Component_composite.prototype:_ZEN_Component_composite.prototype;
	p.__ZENcomponent = true;
	p._serverClass = 'EnsPortal.Component.scheduleSelector';
	p._type = 'scheduleSelector';
	p.serialize = EnsPortal_Component_scheduleSelector_serialize;
	p.getSettings = EnsPortal_Component_scheduleSelector_getSettings;
	p.ReallyRefreshContents = EnsPortal_Component_scheduleSelector_ReallyRefreshContents;
	p.createChildren = EnsPortal_Component_scheduleSelector_createChildren;
	p.getProperty = EnsPortal_Component_scheduleSelector_getProperty;
	p.getValue = EnsPortal_Component_scheduleSelector_getValue;
	p.onRefreshContents = EnsPortal_Component_scheduleSelector_onRefreshContents;
	p.setProperty = EnsPortal_Component_scheduleSelector_setProperty;
	p.setValue = EnsPortal_Component_scheduleSelector_setValue;
	p.showScheduleDetails = EnsPortal_Component_scheduleSelector_showScheduleDetails;
}

self._zenClassIdx['sqlParametersTable'] = 'EnsPortal_Component_sqlParametersTable';
self.EnsPortal_Component_sqlParametersTable = function(index,id) {
	if (index>=0) {EnsPortal_Component_sqlParametersTable__init(this,index,id);}
}

self.EnsPortal_Component_sqlParametersTable__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_composite__init) ?zenMaster._ZEN_Component_composite__init(o,index,id):_ZEN_Component_composite__init(o,index,id);
	o.classSettingName = '';
	o.containerClass = '';
	o.currParam = '';
	o.currParamNum = '0';
	o.inParamInfo = false;
	o.params = '';
	o.prependAsterix = '0';
	o.query = '';
	o.querySetting = '';
	o.readOnly = false;
}
function EnsPortal_Component_sqlParametersTable_serialize(set,s)
{
	var o = this;s[0]='2646825411';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.cellAlign;s[9]=o.cellSize;s[10]=o.cellStyle;s[11]=o.cellVAlign;s[12]=set.serializeList(o,o.children,true,'children');s[13]=(o.childrenCreated?1:0);s[14]=o.classSettingName;s[15]=o.containerClass;s[16]=o.containerStyle;s[17]=o.currParam;s[18]=o.currParamNum;s[19]=(o.disabled?1:0);s[20]=(o.dragEnabled?1:0);s[21]=(o.dropEnabled?1:0);s[22]=(o.dynamic?1:0);s[23]=o.enclosingClass;s[24]=o.enclosingStyle;s[25]=o.error;s[26]=o.groupClass;s[27]=o.groupStyle;s[28]=o.height;s[29]=(o.hidden?1:0);s[30]=o.hint;s[31]=o.hintClass;s[32]=o.hintStyle;s[33]=(o.inParamInfo?1:0);s[34]=o.label;s[35]=o.labelClass;s[36]=o.labelDisabledClass;s[37]=o.labelPosition;s[38]=o.labelStyle;s[39]=o.layout;s[40]=o.onafterdrag;s[41]=o.onbeforedrag;s[42]=o.onclick;s[43]=o.ondrag;s[44]=o.ondrop;s[45]=o.onhide;s[46]=o.onrefresh;s[47]=o.onshow;s[48]=o.onupdate;s[49]=o.overlayMode;s[50]=o.params;s[51]=o.prependAsterix;s[52]=o.query;s[53]=o.querySetting;s[54]=(o.readOnly?1:0);s[55]=o.renderFlag;s[56]=(o.showLabel?1:0);s[57]=o.slice;s[58]=o.title;s[59]=o.tuple;s[60]=o.valign;s[61]=(o.visible?1:0);s[62]=o.width;
}
function EnsPortal_Component_sqlParametersTable_getSettings(s)
{
	s['name'] = 'string';
	s['classSettingName'] = 'string';
	s['containerClass'] = 'string';
	s['currParam'] = 'string';
	s['currParamNum'] = 'string';
	s['inParamInfo'] = 'string';
	s['params'] = 'string';
	s['prependAsterix'] = 'string';
	s['query'] = 'string';
	s['querySetting'] = 'string';
	s['readOnly'] = 'boolean';
	this.invokeSuper('getSettings',arguments);
}

self.EnsPortal_Component_sqlParametersTable_addParam = function() {
var params = this.params;
if ((""!=params) && (params.slice(-1)!=",")) {
params = (params + ",")
this.params = params;
}
this.switchCurrParam(params.split(",").length);
}

self.EnsPortal_Component_sqlParametersTable_createChildren = function(form) {
var html = zenPage.createComponent('html');
html.setProperty('id',this.id+".htmlParams");
html.refreshContents = function() {
var div = this.getEnclosingDiv();
if (div) div.innerHTML = this.content;
};
this.addChild(html);
this.childrenCreated = true;
return '';
}

self.EnsPortal_Component_sqlParametersTable_getForm = function() {
var form = null;
var parent = this.parent;
while (parent) {
if (parent.isOfType('form') || parent.isOfType('loginForm')) {
form = parent;
break;
}
parent = parent.parent;
}
return form;
}

self.EnsPortal_Component_sqlParametersTable_getProperty = function(property,key) {
switch(property) {
case 'readOnly':
return this.readOnly;
break;
case 'value':
return this.getValue();
default:
return this.invokeSuper('getProperty',arguments);
}
}

self.EnsPortal_Component_sqlParametersTable_getValue = function() {
if (this.inParamInfo) {
this.inParamInfo = 0;
return this.currParam;
} else {
return this.params;
}
}

self.EnsPortal_Component_sqlParametersTable_refreshParams = function() {
var html = this.getChildById("htmlParams");
if (html) {
} else {
var html = zenPage.createComponent('html');
html.setProperty('id',this.id+".htmlParams");
this.addChild(html);
}
var content = this.GetContents();
html.content = content;
if (this.getEnclosingDiv() == null) return;
comp = zenPage.getComponentById(this.id);
if ((comp != null)) {
comp.refreshContents();
}
return;
}

self.EnsPortal_Component_sqlParametersTable_setCurrParam = function(switchTo) {
this.currParamNum = switchTo;
this.refreshParams();
}

self.EnsPortal_Component_sqlParametersTable_setModified = function() {
var form = this.getForm();
zenPage.settingChanged(this.index,(form ? form.index : ''));
}

self.EnsPortal_Component_sqlParametersTable_setProperty = function(property,value,value2) {
switch(property) {
case 'readOnly':
case 'disabled':
this.readOnly = value;
this.refreshParams();
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self.EnsPortal_Component_sqlParametersTable_setValue = function(value,value2) {
if (this.currParamNum && (this.currParamNum > 0)) {
this.saveParam(this.currParamNum,value);
this.refreshParams();
} else if (this.params == "") {
this.params = this.GetParamsToDisplay(value);
this.refreshParams();
}
}

self.EnsPortal_Component_sqlParametersTable_showParamInfo = function(param,paramnum) {
var queryId = 'sett'+this.querySetting;
var relatedQueryCtl = zenPage.getComponentById(queryId);
if (relatedQueryCtl) {
this.query = relatedQueryCtl.getValue()
}
var containerClassId = 'sett'+this.classSettingName;
var relatedcontainerClassCtl = zenPage.getComponentById(containerClassId);
if (relatedcontainerClassCtl) {
this.containerClass = relatedcontainerClassCtl.getValue()
}
var parms = {
QUERY:this.query,
CONTAINER:this.containerClass,
QUERYPARAM:param,
QUERYPARAMNUM:paramnum,
PREPENDASTERIX: this.prependAsterix
};
if (zenPage && (typeof zenPage.selectParam == 'function')) {
if ((param != null) && (param != "")) {
this.currParam = param;
} else {
this.currParam = '';
}
this.inParamInfo = 1;
zenPage.selectParam(this.index,parms);
}
}

self.EnsPortal_Component_sqlParametersTable_switchCurrParam = function(switchTo,value) {
var current = this.currParamNum;
if (current != switchTo) {
if ((current > 0) && (value != null)) {
var x = this.saveParam(current,value);
}
this.setModified();
}
this.setCurrParam(switchTo);
return;
}

self.EnsPortal_Component_sqlParametersTable_uiDeleteParam = function(paramNum,id) {
var msg = $$$Text("Do you want to delete this parameter?");
if (!confirm(msg)) return;
zenPage.getComponentById(id).deleteParam(paramNum);
zenPage.getComponentById(id).setModified();
zenPage.getComponentById(id).refreshParams();
}

self.EnsPortal_Component_sqlParametersTable_GetContents = function() {
	return zenInstanceMethod(this,'GetContents','','VARCHAR',arguments);
}

self.EnsPortal_Component_sqlParametersTable_GetParamsToDisplay = function(pParams) {
	return zenClassMethod(this,'GetParamsToDisplay','L','VARCHAR',arguments);
}

self.EnsPortal_Component_sqlParametersTable_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}

self.EnsPortal_Component_sqlParametersTable_deleteParam = function(pNumber) {
	return zenInstanceMethod(this,'deleteParam','L','BOOLEAN',arguments);
}

self.EnsPortal_Component_sqlParametersTable_saveParam = function(pNumber,pValue) {
	return zenInstanceMethod(this,'saveParam','L,L','BOOLEAN',arguments);
}
self.EnsPortal_Component_sqlParametersTable__Loader = function() {
	zenLoadClass('_ZEN_Component_composite');
	EnsPortal_Component_sqlParametersTable.prototype = zenCreate('_ZEN_Component_composite',-1);
	var p = EnsPortal_Component_sqlParametersTable.prototype;
	if (null==p) {return;}
	p.constructor = EnsPortal_Component_sqlParametersTable;
	p.superClass = ('undefined' == typeof _ZEN_Component_composite) ? zenMaster._ZEN_Component_composite.prototype:_ZEN_Component_composite.prototype;
	p.__ZENcomponent = true;
	p._serverClass = 'EnsPortal.Component.sqlParametersTable';
	p._type = 'sqlParametersTable';
	p.serialize = EnsPortal_Component_sqlParametersTable_serialize;
	p.getSettings = EnsPortal_Component_sqlParametersTable_getSettings;
	p.GetContents = EnsPortal_Component_sqlParametersTable_GetContents;
	p.GetParamsToDisplay = EnsPortal_Component_sqlParametersTable_GetParamsToDisplay;
	p.ReallyRefreshContents = EnsPortal_Component_sqlParametersTable_ReallyRefreshContents;
	p.addParam = EnsPortal_Component_sqlParametersTable_addParam;
	p.createChildren = EnsPortal_Component_sqlParametersTable_createChildren;
	p.deleteParam = EnsPortal_Component_sqlParametersTable_deleteParam;
	p.getForm = EnsPortal_Component_sqlParametersTable_getForm;
	p.getProperty = EnsPortal_Component_sqlParametersTable_getProperty;
	p.getValue = EnsPortal_Component_sqlParametersTable_getValue;
	p.refreshParams = EnsPortal_Component_sqlParametersTable_refreshParams;
	p.saveParam = EnsPortal_Component_sqlParametersTable_saveParam;
	p.setCurrParam = EnsPortal_Component_sqlParametersTable_setCurrParam;
	p.setModified = EnsPortal_Component_sqlParametersTable_setModified;
	p.setProperty = EnsPortal_Component_sqlParametersTable_setProperty;
	p.setValue = EnsPortal_Component_sqlParametersTable_setValue;
	p.showParamInfo = EnsPortal_Component_sqlParametersTable_showParamInfo;
	p.switchCurrParam = EnsPortal_Component_sqlParametersTable_switchCurrParam;
	p.uiDeleteParam = EnsPortal_Component_sqlParametersTable_uiDeleteParam;
}

self._zenClassIdx['sslConfigSelector'] = 'EnsPortal_Component_sslConfigSelector';
self.EnsPortal_Component_sslConfigSelector = function(index,id) {
	if (index>=0) {EnsPortal_Component_sslConfigSelector__init(this,index,id);}
}

self.EnsPortal_Component_sslConfigSelector__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_composite__init) ?zenMaster._ZEN_Component_composite__init(o,index,id):_ZEN_Component_composite__init(o,index,id);
}
function EnsPortal_Component_sslConfigSelector_serialize(set,s)
{
	var o = this;s[0]='4096323540';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.cellAlign;s[9]=o.cellSize;s[10]=o.cellStyle;s[11]=o.cellVAlign;s[12]=set.serializeList(o,o.children,true,'children');s[13]=(o.childrenCreated?1:0);s[14]=o.containerStyle;s[15]=(o.disabled?1:0);s[16]=(o.dragEnabled?1:0);s[17]=(o.dropEnabled?1:0);s[18]=(o.dynamic?1:0);s[19]=o.enclosingClass;s[20]=o.enclosingStyle;s[21]=o.error;s[22]=o.groupClass;s[23]=o.groupStyle;s[24]=o.height;s[25]=(o.hidden?1:0);s[26]=o.hint;s[27]=o.hintClass;s[28]=o.hintStyle;s[29]=o.label;s[30]=o.labelClass;s[31]=o.labelDisabledClass;s[32]=o.labelPosition;s[33]=o.labelStyle;s[34]=o.layout;s[35]=o.onafterdrag;s[36]=o.onbeforedrag;s[37]=o.onclick;s[38]=o.ondrag;s[39]=o.ondrop;s[40]=o.onhide;s[41]=o.onrefresh;s[42]=o.onshow;s[43]=o.onupdate;s[44]=o.overlayMode;s[45]=o.renderFlag;s[46]=(o.showLabel?1:0);s[47]=o.slice;s[48]=o.title;s[49]=o.tuple;s[50]=o.valign;s[51]=(o.visible?1:0);s[52]=o.width;
}
function EnsPortal_Component_sslConfigSelector_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self.EnsPortal_Component_sslConfigSelector_createChildren = function(form) {
var hgroup = zenPage.createComponent('hgroup');
var sel = zenPage.createComponent('selector');
sel.name="SSL";
sel.setProperty('id',this.id+".sel"+sel.name);
sel.size=30;
sel.setProperty('context',"Ens.ContextSearch/SSLConfigs");
sel.onchange = "zenPage.settingChanged('"+escape(this.index)+"','"+escape(form.index)+"');"
sel.onkeyup = "zenPage.settingChanged('"+escape(this.index)+"','"+escape(form.index)+"');"
hgroup.addChild(sel);
var btn = zenPage.createComponent('image');
btn.src="deepsee/zoom_24.png";
btn.setProperty('id',this.id+"."+"btn"+sel.name);
btn.title="Show details for the selected SSL/TLS Configuration.";
btn.onclick="if (zenPage.stopTimers) {zenPage.stopTimers()}; zenPage.getComponentById('"+this.id+"').showSSLDetails(); if (zenPage.startTimers) {zenPage.startTimers(2000)};"
hgroup.addChild(btn);
this.addChild(hgroup);
/*  Removed by HCR306
var link = zenPage.createComponent('link');
link.enclosingStyle="font-size:10pt;";
link.labelClass="ribbonSortOption";
link.caption="SSL/TLS Configuration Page";
link.title="Click here to go to the SSL/TLS Configuration page.";
link.href="/csp/sys/sec/%25CSP.UI.Portal.SSLList.cls";
this.addChild(link);
*/
this.childrenCreated = true;
return '';
}

self.EnsPortal_Component_sslConfigSelector_getProperty = function(property,key) {
switch(property) {
case 'readOnly':
var sel = this.getChildById('selSSL');
if (sel) return sel.getReadOnly();
break;
case 'value':
var sel = this.getChildById('selSSL');
if (sel) return sel.getValue();
default:
return this.invokeSuper('getProperty',arguments);
}
}

self.EnsPortal_Component_sslConfigSelector_getValue = function() {
return this.getProperty('value');
}

self.EnsPortal_Component_sslConfigSelector_onRefreshContents = function() {
var old = zenPage.composites[this.id];
this.setValue(old.getValue());
zenPage.composites[this.id] = this;
}

self.EnsPortal_Component_sslConfigSelector_setProperty = function(property,value,value2) {
switch(property) {
case 'readOnly':
var sel = this.getChildById('selSSL');
if (sel) sel.setReadOnly(value);
break;
case 'value':
var sel = this.getChildById('selSSL');
if (sel) {
sel.setValue(value);
}
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self.EnsPortal_Component_sslConfigSelector_setValue = function(value,value2) {
this.setProperty('value',value,value2);
}

self.EnsPortal_Component_sslConfigSelector_showSSLDetails = function() {
var name = this.getChildById('selSSL').getValue();
if (''==name) {
alert($$$Text('Click here after selecting an SSL/TLS configuration to see the configuration\'s details'));
return;
}
var link = zenLink('/csp/sys/sec/_CSP.UI.Portal.SSL.zen');
link += (link.indexOf('?') > -1) ? '&' : '?';
link += 'PID=' + encodeURIComponent(name);
window.open(link);
}

self.EnsPortal_Component_sslConfigSelector_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self.EnsPortal_Component_sslConfigSelector__Loader = function() {
	zenLoadClass('_ZEN_Component_composite');
	EnsPortal_Component_sslConfigSelector.prototype = zenCreate('_ZEN_Component_composite',-1);
	var p = EnsPortal_Component_sslConfigSelector.prototype;
	if (null==p) {return;}
	p.constructor = EnsPortal_Component_sslConfigSelector;
	p.superClass = ('undefined' == typeof _ZEN_Component_composite) ? zenMaster._ZEN_Component_composite.prototype:_ZEN_Component_composite.prototype;
	p.__ZENcomponent = true;
	p._serverClass = 'EnsPortal.Component.sslConfigSelector';
	p._type = 'sslConfigSelector';
	p.serialize = EnsPortal_Component_sslConfigSelector_serialize;
	p.getSettings = EnsPortal_Component_sslConfigSelector_getSettings;
	p.ReallyRefreshContents = EnsPortal_Component_sslConfigSelector_ReallyRefreshContents;
	p.createChildren = EnsPortal_Component_sslConfigSelector_createChildren;
	p.getProperty = EnsPortal_Component_sslConfigSelector_getProperty;
	p.getValue = EnsPortal_Component_sslConfigSelector_getValue;
	p.onRefreshContents = EnsPortal_Component_sslConfigSelector_onRefreshContents;
	p.setProperty = EnsPortal_Component_sslConfigSelector_setProperty;
	p.setValue = EnsPortal_Component_sslConfigSelector_setValue;
	p.showSSLDetails = EnsPortal_Component_sslConfigSelector_showSSLDetails;
}
/* EOF */