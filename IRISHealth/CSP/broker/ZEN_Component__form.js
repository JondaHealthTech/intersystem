/*** Zen Module: ZEN_Component__form ***/

self._zenClassIdx['control'] = '_ZEN_Component_control';
self._ZEN_Component_control = function(index,id) {
	if (index>=0) {_ZEN_Component_control__init(this,index,id);}
}

self._ZEN_Component_control__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.clientType = '';
	o.controlClass = '';
	o.controlStyle = '';
	o.dataBinding = '';
	o.disabled = false;
	o.invalid = false;
	o.invalidMessage = 'out-of-range or invalid value.';
	o.onblur = '';
	o.onchange = '';
	o.onclick = '';
	o.ondblclick = '';
	o.onfocus = '';
	o.onkeydown = '';
	o.onkeypress = '';
	o.onkeyup = '';
	o.onmousedown = '';
	o.onmouseout = '';
	o.onmouseover = '';
	o.onmouseup = '';
	o.onsubmit = '';
	o.ontouchend = '';
	o.ontouchmove = '';
	o.ontouchstart = '';
	o.onvalidate = '';
	o.originalValue = '';
	o.readOnly = false;
	o.required = false;
	o.requiredMessage = 'required.';
	o.tabIndex = '';
	o.value = '';
}
function _ZEN_Component_control_serialize(set,s)
{
	var o = this;s[0]='3989876153';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.clientType;s[9]=o.containerStyle;s[10]=o.controlClass;s[11]=o.controlStyle;s[12]=o.dataBinding;s[13]=(o.disabled?1:0);s[14]=(o.dragEnabled?1:0);s[15]=(o.dropEnabled?1:0);s[16]=(o.dynamic?1:0);s[17]=o.enclosingClass;s[18]=o.enclosingStyle;s[19]=o.error;s[20]=o.height;s[21]=(o.hidden?1:0);s[22]=o.hint;s[23]=o.hintClass;s[24]=o.hintStyle;s[25]=(o.invalid?1:0);s[26]=o.invalidMessage;s[27]=o.label;s[28]=o.labelClass;s[29]=o.labelDisabledClass;s[30]=o.labelStyle;s[31]=o.onafterdrag;s[32]=o.onbeforedrag;s[33]=o.onblur;s[34]=o.onchange;s[35]=o.onclick;s[36]=o.ondblclick;s[37]=o.ondrag;s[38]=o.ondrop;s[39]=o.onfocus;s[40]=o.onhide;s[41]=o.onkeydown;s[42]=o.onkeypress;s[43]=o.onkeyup;s[44]=o.onmousedown;s[45]=o.onmouseout;s[46]=o.onmouseover;s[47]=o.onmouseup;s[48]=o.onrefresh;s[49]=o.onshow;s[50]=o.onsubmit;s[51]=o.ontouchend;s[52]=o.ontouchmove;s[53]=o.ontouchstart;s[54]=o.onupdate;s[55]=o.onvalidate;s[56]=o.originalValue;s[57]=o.overlayMode;s[58]=(o.readOnly?1:0);s[59]=o.renderFlag;s[60]=(o.required?1:0);s[61]=o.requiredMessage;s[62]=(o.showLabel?1:0);s[63]=o.slice;s[64]=o.tabIndex;s[65]=o.title;s[66]=o.tuple;s[67]=o.valign;s[68]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[69]=(o.visible?1:0);s[70]=o.width;
}
function _ZEN_Component_control_getSettings(s)
{
	s['name'] = 'string';
	s['clientType'] = 'enum:string,boolean,integer,float';
	s['controlClass'] = 'cssClass';
	s['controlStyle'] = 'style';
	s['dataBinding'] = 'string';
	s['disabled'] = 'boolean';
	s['invalid'] = 'boolean';
	s['invalidMessage'] = 'caption';
	s['onblur'] = 'eventHandler';
	s['onchange'] = 'eventHandler';
	s['onclick'] = 'eventHandler';
	s['ondblclick'] = 'eventHandler';
	s['onfocus'] = 'eventHandler';
	s['onkeydown'] = 'eventHandler';
	s['onkeypress'] = 'eventHandler';
	s['onkeyup'] = 'eventHandler';
	s['onmousedown'] = 'eventHandler';
	s['onmouseout'] = 'eventHandler';
	s['onmouseover'] = 'eventHandler';
	s['onmouseup'] = 'eventHandler';
	s['onsubmit'] = 'eventHandler';
	s['ontouchend'] = 'eventHandler';
	s['ontouchmove'] = 'eventHandler';
	s['ontouchstart'] = 'eventHandler';
	s['onvalidate'] = 'eventHandler';
	s['originalValue'] = 'value';
	s['readOnly'] = 'boolean';
	s['required'] = 'boolean';
	s['requiredMessage'] = 'caption';
	s['tabIndex'] = 'integer';
	s['value'] = 'value';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_control_dragStartHandler = function(dragData) {
if (!this.getDragData(dragData)) {
return false;
}
var icon = this.getEnclosingDiv().cloneNode(true);
icon.style.position="absolute";
icon.style.border ="1px solid darkgray";
icon.style.background ="#D0D0F0";
ZLM.setDragAvatar(icon);
return true;
}

self._ZEN_Component_control_dropStartHandler = function(dragData) {
this.setValue(dragData.toString());
return true;
}

self._ZEN_Component_control_focus = function() {
var el = this.findElement('control');
if (el) {
try {
el.focus();
}
catch(ex) {
}
}
}

self._ZEN_Component_control_getDisabled = function() {
return this.getProperty('disabled');
}

self._ZEN_Component_control_getDragData = function(dragData) {
dragData.value = this.getValue();
if (null != this.text) {
dragData.text = this.text;
}
else {
dragData.text = dragData.value;
}
return true;
}

self._ZEN_Component_control_getForm = function() {
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

self._ZEN_Component_control_getInvalidReason = function() {
if (this.required && zenIsMissing(this.getValue())) {
return this.label + ' ' + this.requiredMessage;
}
return this.label + ' ' + this.invalidMessage;
}

self._ZEN_Component_control_getProperty = function(property,key) {
var el = this.findElement('control');
switch(property) {
case 'value':
if (el) {
this.value = this.unformatValue ? this.unformatValue(el.value) : el.value;
}
return this.normalizeValue(this.value);
}
return this.invokeSuper('getProperty',arguments);
}

self._ZEN_Component_control_getReadOnly = function() {
return this.getProperty('readOnly');
}

self._ZEN_Component_control_getValue = function() {
return this.getProperty('value');
}

self._ZEN_Component_control_isModified = function() {
return this.value != this.originalValue;
}

self._ZEN_Component_control_isValid = function() {
return true;
}

self._ZEN_Component_control_normalizeValue = function(val) {
switch(this.clientType) {
case 'boolean':
if ((''==val)&&('string'==typeof val)) { val = false; }
else if (('true'==val)||('on'==val)) { val = true; }
else if (('false'==val)||('off'==val)||('0'==val)) { val = false; }
else { val = val ? true : false; }
break;
case 'integer':
if (!((''==val)&&('string'==typeof val))) {
val = parseInt(val,10);
val = isNaN(val) ? '' : val;
}
break;
case 'float':
if (!((''==val)&&('string'==typeof val))) {
val = parseFloat(val);
val = isNaN(val) ? '' : val;
}
break;
case 'string':
val = zenTrim(val);
break;
}
return val;
}

self._ZEN_Component_control_onSerialize = function() {
var el = this.findElement('control');
if (el) {
this.value = this.normalizeValue(this.unformatValue ? this.unformatValue(el.value) : el.value);
}
}

self._ZEN_Component_control_onchangeHandler = function() {
var value = this.getValue();
var form = this.getForm();
if (form) {
form.controlChangeHandler(this);
}
if (this.invalid && this.validationHandler()) {
this.setProperty('invalid',false);
}
zenInvokeCallbackMethod(this.onchange,this,'onchange');
}

self._ZEN_Component_control_select = function() {
var el = this.findElement('control');
if (el) {
el.select();
}
}

self._ZEN_Component_control_setDisabled = function(flag) {
this.setProperty('disabled',flag);
}

self._ZEN_Component_control_setProperty = function(property,value,value2) {
var retVal = true;
var el = this.findElement('control');
switch(property) {
case 'value':
value = this.normalizeValue(value);
if (el) {
el.value = this.formatValue ? this.formatValue(value) : value;
}
this.value = value;
break;
case 'clientType':
this.clientType = value;
break;
case 'originalValue':
this.originalValue = this.value;
break;
case 'required':
value = (value) ? true : false;
this.required = value;
break;
case 'invalid':
value = (value) ? true : false;
this.invalid = value;
var errClass = 'zenInvalid'
if (this.controlClass) errClass = this.controlClass+' zenInvalid';
if (el) { el.className = (value ? errClass : this.controlClass);}
break;
case 'controlClass':
this.controlClass = value;
var errClass = 'zenInvalid'
if (this.controlClass) errClass = this.controlClass+' zenInvalid';
if (el) { el.className = (this.invalid ? errClass : this.controlClass);}
break;
case 'controlStyle':
this.controlStyle = value;
if (el) { el.style.cssText = value;	}
break;
case 'disabled':
value = (value) ? true : false;
if (el) { el.disabled = value;	}
this.disabled = value;
var lbl = this.getLabelElement();
if (lbl) {
if (this.disabled) {
lbl.className = (''==this.labelDisabledClass) ? 'zenLabelDisabled' : this.labelDisabledClass ;
}
else {
lbl.className = (''==this.labelClass) ? 'zenLabel' : this.labelClass;
}
}
break;
case 'readOnly':
value = (value) ? true : false;
if (el) { el.readOnly = value;	}
this.readOnly = value;
break;
case 'title':
if (el) { el.title = value;	}
this.title = value;
var label = this.getLabelElement();
if (label) {
label.title = value;
}
break;
case 'onchange':
this.onchange = value;
break;
case 'onclick':
case 'ondblclick':
case 'onfocus':
case 'onblur':
case 'onkeypress':
case 'onkeydown':
case 'onkeyup':
case 'onmouseout':
case 'onmouseover':
case 'onmouseup':
case 'onmousedown':
case 'ontouchstart':
case 'ontouchmove':
case 'ontouchend':
this[property] = value;
if (el) {
var expr = value.toString();
expr = expr.replace(/\\/g,'\\\\'); // escape any backslash
expr = expr.replace(/\"/g,'\\\"'); // escape any quotes
expr = expr.replace(/\'/g,"\\\'"); // escape any single quotes
el[property] = new Function('event','return zenFireEvent('+this.index+',"'+expr+'","'+property+'",event)');
}
break;
default:
var oldSyncMode = zenSynchronousMode;
zenSynchronousMode = true;
retVal = this.invokeSuper('setProperty',arguments);
zenSynchronousMode = oldSyncMode;
}
return retVal;
}

self._ZEN_Component_control_setReadOnly = function(flag) {
this.setProperty('readOnly',flag);
}

self._ZEN_Component_control_setValue = function(value,value2) {
var oldValue = this.value;
this.setProperty('value',value,value2);
var form = this.getForm();
if (form && form.propagateChanges) {
if (this._initialized && oldValue===this.value) return;
this.onchangeHandler();
this._initialized = true;
}
}

self._ZEN_Component_control_sysName = function() {
var name = '';
if (''==this.name) {
name = '$V_' + ((this.composite) ? (this.composite.id=='' ? this.composite.index : this.composite.id)+'.':'') + this.id;
}
else if (('Cache'==this.name.substr(0,5))||('IRIS'==this.name.substr(0,4))) {
name = this.name;
}
else {
name = '$V_' + this.name;
}
return name;
}

self._ZEN_Component_control_validationHandler = function() {
if (this.readOnly || this.disabled) {
return true;
}
if (zenIsMissing(this.getValue())) {
return !this.required;
}
if (this.onvalidate) {
return zenInvokeCallbackMethod(this.onvalidate,this,'onvalidate');
}
return this.isValid();
}

self._ZEN_Component_control_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_control__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_ZEN_Component_control.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _ZEN_Component_control.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_control;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.control';
	p._type = 'control';
	p.serialize = _ZEN_Component_control_serialize;
	p.getSettings = _ZEN_Component_control_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_control_ReallyRefreshContents;
	p.dragStartHandler = _ZEN_Component_control_dragStartHandler;
	p.dropStartHandler = _ZEN_Component_control_dropStartHandler;
	p.focus = _ZEN_Component_control_focus;
	p.getDisabled = _ZEN_Component_control_getDisabled;
	p.getDragData = _ZEN_Component_control_getDragData;
	p.getForm = _ZEN_Component_control_getForm;
	p.getInvalidReason = _ZEN_Component_control_getInvalidReason;
	p.getProperty = _ZEN_Component_control_getProperty;
	p.getReadOnly = _ZEN_Component_control_getReadOnly;
	p.getValue = _ZEN_Component_control_getValue;
	p.isModified = _ZEN_Component_control_isModified;
	p.isValid = _ZEN_Component_control_isValid;
	p.normalizeValue = _ZEN_Component_control_normalizeValue;
	p.onSerialize = _ZEN_Component_control_onSerialize;
	p.onchangeHandler = _ZEN_Component_control_onchangeHandler;
	p.select = _ZEN_Component_control_select;
	p.setDisabled = _ZEN_Component_control_setDisabled;
	p.setProperty = _ZEN_Component_control_setProperty;
	p.setReadOnly = _ZEN_Component_control_setReadOnly;
	p.setValue = _ZEN_Component_control_setValue;
	p.sysName = _ZEN_Component_control_sysName;
	p.validationHandler = _ZEN_Component_control_validationHandler;
}

self._zenClassIdx['abstractListBox'] = '_ZEN_Component_abstractListBox';
self._ZEN_Component_abstractListBox = function(index,id) {
	if (index>=0) {_ZEN_Component_abstractListBox__init(this,index,id);}
}

self._ZEN_Component_abstractListBox__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_control__init) ?zenMaster._ZEN_Component_control__init(o,index,id):_ZEN_Component_control__init(o,index,id);
	o.controlClass = 'listBox';
	o.hzScroll = false;
	o.listHeight = '';
	o.listWidth = '';
	o.selectedIndex = '-1';
	o.text = '';
	o.onCreate();
}
function _ZEN_Component_abstractListBox_serialize(set,s)
{
	var o = this;s[0]='3855577123';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.clientType;s[9]=o.containerStyle;s[10]=o.controlClass;s[11]=o.controlStyle;s[12]=o.dataBinding;s[13]=(o.disabled?1:0);s[14]=(o.dragEnabled?1:0);s[15]=(o.dropEnabled?1:0);s[16]=(o.dynamic?1:0);s[17]=o.enclosingClass;s[18]=o.enclosingStyle;s[19]=o.error;s[20]=o.height;s[21]=(o.hidden?1:0);s[22]=o.hint;s[23]=o.hintClass;s[24]=o.hintStyle;s[25]=(o.hzScroll?1:0);s[26]=(o.invalid?1:0);s[27]=o.invalidMessage;s[28]=o.label;s[29]=o.labelClass;s[30]=o.labelDisabledClass;s[31]=o.labelStyle;s[32]=o.listHeight;s[33]=o.listWidth;s[34]=o.onafterdrag;s[35]=o.onbeforedrag;s[36]=o.onblur;s[37]=o.onchange;s[38]=o.onclick;s[39]=o.ondblclick;s[40]=o.ondrag;s[41]=o.ondrop;s[42]=o.onfocus;s[43]=o.onhide;s[44]=o.onkeydown;s[45]=o.onkeypress;s[46]=o.onkeyup;s[47]=o.onmousedown;s[48]=o.onmouseout;s[49]=o.onmouseover;s[50]=o.onmouseup;s[51]=o.onrefresh;s[52]=o.onshow;s[53]=o.onsubmit;s[54]=o.ontouchend;s[55]=o.ontouchmove;s[56]=o.ontouchstart;s[57]=o.onupdate;s[58]=o.onvalidate;s[59]=o.originalValue;s[60]=o.overlayMode;s[61]=(o.readOnly?1:0);s[62]=o.renderFlag;s[63]=(o.required?1:0);s[64]=o.requiredMessage;s[65]=o.selectedIndex;s[66]=(o.showLabel?1:0);s[67]=o.slice;s[68]=o.tabIndex;s[69]=o.text;s[70]=o.title;s[71]=o.tuple;s[72]=o.valign;s[73]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[74]=(o.visible?1:0);s[75]=o.width;
}
function _ZEN_Component_abstractListBox_getSettings(s)
{
	s['name'] = 'string';
	s['hzScroll'] = 'boolean';
	s['listHeight'] = 'length';
	s['listWidth'] = 'length';
	s['selectedIndex'] = 'integer';
	s['text'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_abstractListBox_clickItem = function(idx) {
if (this.disabled) return;
if (this.readOnly) return;
var change = (idx != this.selectedIndex);
this.focus();
this.selectItem(idx);
if (change) {
this.onchangeHandler();
}
}

self._ZEN_Component_abstractListBox_dblClickItem = function(idx) {
if (this.disabled) return;
zenInvokeCallbackMethod(this.ondblclick,this,'ondblclick');
}

self._ZEN_Component_abstractListBox_deferredScrollIntoView = function() {
zenScrollIntoView(this.encPending,this.divPending,this.hzScrollPending);
delete this.divPending;
delete this.encPending;
delete this.hzScrollPending;
}

self._ZEN_Component_abstractListBox_dragStartHandler = function(dragData) {
var ok = false;
var dragItem = this._dragSource;
if (null != dragItem) {
delete this._dragSource;
var anchor = this.findElement('item_' + dragItem);
if (anchor) {
dragData.sourceItem = dragItem;
ok = true;
dragData.value = this.getOptionValue(dragItem);
dragData.text = this.getOptionText(dragItem);
var icon = anchor.cloneNode(true);
icon.style.position ="absolute";
icon.style.width = this.getEnclosingDiv().offsetWidth + 'px';
icon.style.border = "1px solid darkgray";
ZLM.setDragAvatar(icon);
}
}
return ok;
}

self._ZEN_Component_abstractListBox_focus = function() {
var inv = this.findElement('invisible');
if (inv) {
inv.focus();
}
}

self._ZEN_Component_abstractListBox_getItemEl = function(idx) {
return this.findElement('item_' + idx);
}

self._ZEN_Component_abstractListBox_getOptionCount = function() {
return 0;
}

self._ZEN_Component_abstractListBox_getOptionText = function(idx) {
return '';
}

self._ZEN_Component_abstractListBox_getOptionValue = function(idx) {
return '';
}

self._ZEN_Component_abstractListBox_itemMouseDown = function(evt,idx) {
if (this.dragEnabled) {
evt = evt ? evt : window.event;
if (evt.preventDefault) {
evt.preventDefault();
}
this._dragSource = idx;
var change = (idx != this.selectedIndex);
this.selectItem(idx);
if (change) {
this.onchangeHandler();
}
return false;
}
return true;
}

self._ZEN_Component_abstractListBox_itemMouseUp = function(evt) {
if (this.dragEnabled) {
evt = evt ? evt : window.event;
if (evt.preventDefault) {
evt.preventDefault();
}
delete this._dragSource;
return false;
}
return true;
}

self._ZEN_Component_abstractListBox_lbKeyBlur = function() {
this.hasFocus = false;
this.selectItem(this.selectedIndex);
}

self._ZEN_Component_abstractListBox_lbKeyDownHandler = function(evt) {
if (this.disabled) return false;
if (this.readOnly) return false;
evt = evt ? evt : window.event;
var ret = true;
var row = this.currRow;
var col = this.currColumn;
if (this.onkeydown != '') {
ret = zenInvokeCallbackMethod(this.onkeydown,this,'onkeydown','evt',evt);
if (!ret) return;
}
switch(evt.keyCode) {
case zenENTER:
break;
case zenPAGEUP:
ret = false;
this.moveToItem('pageup');
break;
case zenPAGEDN:
ret = false;
this.moveToItem('pagedn');
break;
case zenEND:
ret = false;
this.moveToItem('end');
break;
case zenHOME:
ret = false;
this.moveToItem('home');
break;
case zenUP:
ret = false;
this.moveToItem('up');
break;
case zenDOWN:
ret = false;
this.moveToItem('down');
break;
default:
break;
}
if (!ret) {
if (evt.preventDefault) {
evt.preventDefault();
}
evt.cancelBubble = true;
}
return ret;
}

self._ZEN_Component_abstractListBox_lbKeyFocus = function() {
this.hasFocus = true;
this.selectItem(this.selectedIndex);
}

self._ZEN_Component_abstractListBox_lbKeyPressHandler = function(evt) {
if (this.disabled) return false;
if (this.readOnly) return false;
evt = evt ? evt : window.event;
var ret = true;
if (this.onkeypress != '') {
ret = zenInvokeCallbackMethod(this.onkeypress,this,'onkeypress','evt',evt);
if (!ret) return;
}
switch(evt.keyCode) {
default:
if (evt.ctrlKey || evt.altKey) {
break;
}
var charCode = evt.charCode ? evt.charCode : evt.keyCode;
if (charCode >= 32) {
ret = false;
var ch = evt.charCode ? String.fromCharCode(evt.charCode) : null;
if (!ch && zenIsIE) ch = String.fromCharCode(charCode);
if ('string' == typeof ch) {
ch = ch.toUpperCase();
var size = this.getOptionCount();
var found = false;
var start = this.selectedIndex+1;
for (var pass = 0; pass < 2 && !found; pass++) {
for (var i = start; i < size; i++) {
var t = this.getOptionText(i);
if ('string' == typeof t) {
if (t.charAt(0).toUpperCase() == ch) {
this.selectItem(i);
found = true;
break;
}
}
}
start = 0;
}
}
}
break;
}
return ret;
}

self._ZEN_Component_abstractListBox_moveToItem = function(dir) {
var ret = false;
var idx = this.selectedIndex;
var size = this.getOptionCount();
switch(dir) {
case 'up':
if (idx > 0) {
ret = true;
this.selectItem(idx-1);
}
break;
case 'down':
if (idx < size-1) {
ret = true;
this.selectItem(idx+1);
}
break;
case 'home':
if (size > 0) {
ret = true;
this.selectItem(0);
}
break;
case 'end':
if (size > 0) {
ret = true;
this.selectItem(size - 1);
}
break;
case 'pageup':
if (size > 0) {
ret = true;
idx = idx > 10 ? idx - 10 : 0;
this.selectItem(idx);
}
break;
case 'pagedn':
if (size > 0) {
ret = true;
idx = idx < (size - 10) ? idx + 10 : size-1;
this.selectItem(idx);
}
break;
}
if (idx != this.selectedIndex) {
this.onchangeHandler();
}
return ret;
}

self._ZEN_Component_abstractListBox_onCreate = function() {
this.hasFocus = false;
}

self._ZEN_Component_abstractListBox_selectItem = function(idx) {
var hidden = this.findElement('hidden');
zenASSERT(hidden,'Unable to find hidden element',arguments);
var value,text;
if (this.selectedIndex != -1) {
var div = this.getItemEl(this.selectedIndex);
if (div) {
div.className = 'listBoxItem';
}
}
var size = this.getOptionCount();
if (idx < 0 || idx > size) {
this.selectedIndex = -1;
value = '';
text = '';
}
else {
this.selectedIndex = idx;
value = this.getOptionValue(idx);
text = this.getOptionText(idx);
}
if (this.selectedIndex != -1) {
var div = this.getItemEl(this.selectedIndex);
if (div) {
div.className = (this.hasFocus&&!this.disabled) ? 'listBoxItemFocus' : 'listBoxItemSelected';
if (this.hasFocus) {
if (!this.divPending) {
setTimeout("zenPage.getComponent("+this.index+").deferredScrollIntoView();",100);
}
this.divPending=div;
this.encPending=this.findElement('list');
this.hzScrollPending=!this.hzScroll;
}
}
}
hidden.value = value;
this.value = value;
this.text = text;
}

self._ZEN_Component_abstractListBox_setProperty = function(property,value,value2) {
var hidden = this.findElement('hidden');
switch(property) {
case 'selectedIndex':
value = parseInt(value);
this.selectItem(value);
break;
case 'listHeight':
this.listHeight = value;
var list = this.findElement('list');
if (list) {
list.style.height = value;
}
break;
case 'listWidth':
this.listWidth = value;
var list = this.findElement('list');
if (list) {
list.style.width = value;
}
break;
case 'value':
var size = this.getOptionCount();
for (var idx = 0; idx < size; idx++) {
if (value == this.getOptionValue(idx)) {
this.selectItem(idx);
}
}
break;
case 'text':
break;
case 'disabled':
value = (value) ? true : false;
this.disabled = value;
var list = this.findElement('list');
if (list) {
list.className = this.disabled ? 'listBoxDisabled' : this.controlClass;
}
this.selectItem(this.selectedIndex);
this.invokeSuper('setProperty',arguments);
break;
case 'readOnly':
value = (value) ? true : false;
this.readOnly = value;
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_abstractListBox_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_abstractListBox__Loader = function() {
	zenLoadClass('_ZEN_Component_control');
	_ZEN_Component_abstractListBox.prototype = zenCreate('_ZEN_Component_control',-1);
	var p = _ZEN_Component_abstractListBox.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_abstractListBox;
	p.superClass = ('undefined' == typeof _ZEN_Component_control) ? zenMaster._ZEN_Component_control.prototype:_ZEN_Component_control.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.abstractListBox';
	p._type = 'abstractListBox';
	p.serialize = _ZEN_Component_abstractListBox_serialize;
	p.getSettings = _ZEN_Component_abstractListBox_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_abstractListBox_ReallyRefreshContents;
	p.clickItem = _ZEN_Component_abstractListBox_clickItem;
	p.dblClickItem = _ZEN_Component_abstractListBox_dblClickItem;
	p.deferredScrollIntoView = _ZEN_Component_abstractListBox_deferredScrollIntoView;
	p.dragStartHandler = _ZEN_Component_abstractListBox_dragStartHandler;
	p.focus = _ZEN_Component_abstractListBox_focus;
	p.getItemEl = _ZEN_Component_abstractListBox_getItemEl;
	p.getOptionCount = _ZEN_Component_abstractListBox_getOptionCount;
	p.getOptionText = _ZEN_Component_abstractListBox_getOptionText;
	p.getOptionValue = _ZEN_Component_abstractListBox_getOptionValue;
	p.itemMouseDown = _ZEN_Component_abstractListBox_itemMouseDown;
	p.itemMouseUp = _ZEN_Component_abstractListBox_itemMouseUp;
	p.lbKeyBlur = _ZEN_Component_abstractListBox_lbKeyBlur;
	p.lbKeyDownHandler = _ZEN_Component_abstractListBox_lbKeyDownHandler;
	p.lbKeyFocus = _ZEN_Component_abstractListBox_lbKeyFocus;
	p.lbKeyPressHandler = _ZEN_Component_abstractListBox_lbKeyPressHandler;
	p.moveToItem = _ZEN_Component_abstractListBox_moveToItem;
	p.onCreate = _ZEN_Component_abstractListBox_onCreate;
	p.selectItem = _ZEN_Component_abstractListBox_selectItem;
	p.setProperty = _ZEN_Component_abstractListBox_setProperty;
}

self._zenClassIdx['button'] = '_ZEN_Component_button';
self._ZEN_Component_button = function(index,id) {
	if (index>=0) {_ZEN_Component_button__init(this,index,id);}
}

self._ZEN_Component_button__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_control__init) ?zenMaster._ZEN_Component_control__init(o,index,id):_ZEN_Component_control__init(o,index,id);
	o.caption = '';
	o.controlClass = 'button';
}
function _ZEN_Component_button_serialize(set,s)
{
	var o = this;s[0]='4026129515';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.caption;s[9]=o.clientType;s[10]=o.containerStyle;s[11]=o.controlClass;s[12]=o.controlStyle;s[13]=o.dataBinding;s[14]=(o.disabled?1:0);s[15]=(o.dragEnabled?1:0);s[16]=(o.dropEnabled?1:0);s[17]=(o.dynamic?1:0);s[18]=o.enclosingClass;s[19]=o.enclosingStyle;s[20]=o.error;s[21]=o.height;s[22]=(o.hidden?1:0);s[23]=o.hint;s[24]=o.hintClass;s[25]=o.hintStyle;s[26]=(o.invalid?1:0);s[27]=o.invalidMessage;s[28]=o.label;s[29]=o.labelClass;s[30]=o.labelDisabledClass;s[31]=o.labelStyle;s[32]=o.onafterdrag;s[33]=o.onbeforedrag;s[34]=o.onblur;s[35]=o.onchange;s[36]=o.onclick;s[37]=o.ondblclick;s[38]=o.ondrag;s[39]=o.ondrop;s[40]=o.onfocus;s[41]=o.onhide;s[42]=o.onkeydown;s[43]=o.onkeypress;s[44]=o.onkeyup;s[45]=o.onmousedown;s[46]=o.onmouseout;s[47]=o.onmouseover;s[48]=o.onmouseup;s[49]=o.onrefresh;s[50]=o.onshow;s[51]=o.onsubmit;s[52]=o.ontouchend;s[53]=o.ontouchmove;s[54]=o.ontouchstart;s[55]=o.onupdate;s[56]=o.onvalidate;s[57]=o.originalValue;s[58]=o.overlayMode;s[59]=(o.readOnly?1:0);s[60]=o.renderFlag;s[61]=(o.required?1:0);s[62]=o.requiredMessage;s[63]=(o.showLabel?1:0);s[64]=o.slice;s[65]=o.tabIndex;s[66]=o.title;s[67]=o.tuple;s[68]=o.valign;s[69]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[70]=(o.visible?1:0);s[71]=o.width;
}
function _ZEN_Component_button_getSettings(s)
{
	s['name'] = 'string';
	s['caption'] = 'caption';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_button_setProperty = function(property,value,value2) {
switch(property) {
case 'caption':
this.caption = value;
var el = this.findElement('control');
if (el) {
el.value = this.caption;
}
break;
case 'value':
this.value = value;
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_button_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_button__Loader = function() {
	zenLoadClass('_ZEN_Component_control');
	_ZEN_Component_button.prototype = zenCreate('_ZEN_Component_control',-1);
	var p = _ZEN_Component_button.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_button;
	p.superClass = ('undefined' == typeof _ZEN_Component_control) ? zenMaster._ZEN_Component_control.prototype:_ZEN_Component_control.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.button';
	p._type = 'button';
	p.serialize = _ZEN_Component_button_serialize;
	p.getSettings = _ZEN_Component_button_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_button_ReallyRefreshContents;
	p.setProperty = _ZEN_Component_button_setProperty;
}

self._zenClassIdx['checkbox'] = '_ZEN_Component_checkbox';
self._ZEN_Component_checkbox = function(index,id) {
	if (index>=0) {_ZEN_Component_checkbox__init(this,index,id);}
}

self._ZEN_Component_checkbox__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_control__init) ?zenMaster._ZEN_Component_control__init(o,index,id):_ZEN_Component_control__init(o,index,id);
	o.caption = '';
	o.captionClass = 'checkboxCaption';
	o.clientType = 'boolean';
	o.controlClass = 'checkbox';
	o.readonlyNobox = false;
}
function _ZEN_Component_checkbox_serialize(set,s)
{
	var o = this;s[0]='1435909128';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.caption;s[9]=o.captionClass;s[10]=o.clientType;s[11]=o.containerStyle;s[12]=o.controlClass;s[13]=o.controlStyle;s[14]=o.dataBinding;s[15]=(o.disabled?1:0);s[16]=(o.dragEnabled?1:0);s[17]=(o.dropEnabled?1:0);s[18]=(o.dynamic?1:0);s[19]=o.enclosingClass;s[20]=o.enclosingStyle;s[21]=o.error;s[22]=o.height;s[23]=(o.hidden?1:0);s[24]=o.hint;s[25]=o.hintClass;s[26]=o.hintStyle;s[27]=(o.invalid?1:0);s[28]=o.invalidMessage;s[29]=o.label;s[30]=o.labelClass;s[31]=o.labelDisabledClass;s[32]=o.labelStyle;s[33]=o.onafterdrag;s[34]=o.onbeforedrag;s[35]=o.onblur;s[36]=o.onchange;s[37]=o.onclick;s[38]=o.ondblclick;s[39]=o.ondrag;s[40]=o.ondrop;s[41]=o.onfocus;s[42]=o.onhide;s[43]=o.onkeydown;s[44]=o.onkeypress;s[45]=o.onkeyup;s[46]=o.onmousedown;s[47]=o.onmouseout;s[48]=o.onmouseover;s[49]=o.onmouseup;s[50]=o.onrefresh;s[51]=o.onshow;s[52]=o.onsubmit;s[53]=o.ontouchend;s[54]=o.ontouchmove;s[55]=o.ontouchstart;s[56]=o.onupdate;s[57]=o.onvalidate;s[58]=o.originalValue;s[59]=o.overlayMode;s[60]=(o.readOnly?1:0);s[61]=(o.readonlyNobox?1:0);s[62]=o.renderFlag;s[63]=(o.required?1:0);s[64]=o.requiredMessage;s[65]=(o.showLabel?1:0);s[66]=o.slice;s[67]=o.tabIndex;s[68]=o.title;s[69]=o.tuple;s[70]=o.valign;s[71]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[72]=(o.visible?1:0);s[73]=o.width;
}
function _ZEN_Component_checkbox_getSettings(s)
{
	s['name'] = 'string';
	s['caption'] = 'caption';
	s['captionClass'] = 'cssClass';
	s['readonlyNobox'] = 'boolean';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_checkbox_clickCaption = function() {
if (this.disabled) return;
if (this.readOnly) return;
var cb = this.findElement('control');
zenASSERT(cb,'Unable to find checkbox element',arguments);
cb.checked = !cb.checked;
var hidden = this.findElement('hidden');
zenASSERT(hidden,'Unable to find hidden element',arguments);
hidden.value = cb.checked ? '1' : '0';
this.value = cb.checked;
zenInvokeCallbackMethod(this.onclick,this,'onclick');
this.onchangeHandler();
}

self._ZEN_Component_checkbox_clickCheckbox = function() {
if (this.readOnly) return false;
var cb = this.findElement('control');
zenASSERT(cb,'Unable to find checkbox element',arguments);
var hidden = this.findElement('hidden');
zenASSERT(hidden,'Unable to find hidden element',arguments);
hidden.value = cb.checked ? '1' : '0';
this.value = cb.checked;
zenInvokeCallbackMethod(this.onclick,this,'onclick');
this.onchangeHandler();
return true;
}

self._ZEN_Component_checkbox_getProperty = function(property,key) {
switch(property) {
case 'value':
return this.normalizeValue(this.value);
}
return this.invokeSuper('getProperty',arguments);
}

self._ZEN_Component_checkbox_onSerialize = function() {
var cb = this.findElement('control');
if (cb) {
this.value = cb.checked;
}
}

self._ZEN_Component_checkbox_setProperty = function(property,value,value2) {
var el = this.findElement('control');
var hidden = this.findElement('hidden');
switch(property) {
case 'value':
value = this.normalizeValue(value);
this.value = value;
if (el) { el.checked = value; }
if (hidden) { hidden.value = value ? '1' : '0'; }
break;
case 'caption':
var caption = this.findElement('caption');
this.caption = value;
if (caption) { caption.innerHTML = zenEscapeHTMLSafe(value); }
break;
case 'captionClass':
var caption = this.findElement('caption');
this.captionClass = value;
if (caption) { caption.className = value; }
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_checkbox_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_checkbox__Loader = function() {
	zenLoadClass('_ZEN_Component_control');
	_ZEN_Component_checkbox.prototype = zenCreate('_ZEN_Component_control',-1);
	var p = _ZEN_Component_checkbox.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_checkbox;
	p.superClass = ('undefined' == typeof _ZEN_Component_control) ? zenMaster._ZEN_Component_control.prototype:_ZEN_Component_control.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.checkbox';
	p._type = 'checkbox';
	p.serialize = _ZEN_Component_checkbox_serialize;
	p.getSettings = _ZEN_Component_checkbox_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_checkbox_ReallyRefreshContents;
	p.clickCaption = _ZEN_Component_checkbox_clickCaption;
	p.clickCheckbox = _ZEN_Component_checkbox_clickCheckbox;
	p.getProperty = _ZEN_Component_checkbox_getProperty;
	p.onSerialize = _ZEN_Component_checkbox_onSerialize;
	p.setProperty = _ZEN_Component_checkbox_setProperty;
}

self._zenClassIdx['dateSelect'] = '_ZEN_Component_dateSelect';
self._ZEN_Component_dateSelect = function(index,id) {
	if (index>=0) {_ZEN_Component_dateSelect__init(this,index,id);}
}

self._ZEN_Component_dateSelect__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_control__init) ?zenMaster._ZEN_Component_control__init(o,index,id):_ZEN_Component_control__init(o,index,id);
	o.controlClass = 'dateSelect';
	o.format = 'MDY';
	o.maxYear = '';
	o.minYear = '';
	o.monthList = '';
	o.shortMonth = false;
	o.showMonthNumber = false;
}
function _ZEN_Component_dateSelect_serialize(set,s)
{
	var o = this;s[0]='3501050812';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.clientType;s[9]=o.containerStyle;s[10]=o.controlClass;s[11]=o.controlStyle;s[12]=o.dataBinding;s[13]=(o.disabled?1:0);s[14]=(o.dragEnabled?1:0);s[15]=(o.dropEnabled?1:0);s[16]=(o.dynamic?1:0);s[17]=o.enclosingClass;s[18]=o.enclosingStyle;s[19]=o.error;s[20]=o.format;s[21]=o.height;s[22]=(o.hidden?1:0);s[23]=o.hint;s[24]=o.hintClass;s[25]=o.hintStyle;s[26]=(o.invalid?1:0);s[27]=o.invalidMessage;s[28]=o.label;s[29]=o.labelClass;s[30]=o.labelDisabledClass;s[31]=o.labelStyle;s[32]=o.maxYear;s[33]=o.minYear;s[34]=o.monthList;s[35]=o.onafterdrag;s[36]=o.onbeforedrag;s[37]=o.onblur;s[38]=o.onchange;s[39]=o.onclick;s[40]=o.ondblclick;s[41]=o.ondrag;s[42]=o.ondrop;s[43]=o.onfocus;s[44]=o.onhide;s[45]=o.onkeydown;s[46]=o.onkeypress;s[47]=o.onkeyup;s[48]=o.onmousedown;s[49]=o.onmouseout;s[50]=o.onmouseover;s[51]=o.onmouseup;s[52]=o.onrefresh;s[53]=o.onshow;s[54]=o.onsubmit;s[55]=o.ontouchend;s[56]=o.ontouchmove;s[57]=o.ontouchstart;s[58]=o.onupdate;s[59]=o.onvalidate;s[60]=o.originalValue;s[61]=o.overlayMode;s[62]=(o.readOnly?1:0);s[63]=o.renderFlag;s[64]=(o.required?1:0);s[65]=o.requiredMessage;s[66]=(o.shortMonth?1:0);s[67]=(o.showLabel?1:0);s[68]=(o.showMonthNumber?1:0);s[69]=o.slice;s[70]=o.tabIndex;s[71]=o.title;s[72]=o.tuple;s[73]=o.valign;s[74]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[75]=(o.visible?1:0);s[76]=o.width;
}
function _ZEN_Component_dateSelect_getSettings(s)
{
	s['name'] = 'string';
	s['format'] = 'enum:MDY,DMY,YMD,DM,MD,YM,MY,Y,M';
	s['maxYear'] = 'integer';
	s['minYear'] = 'integer';
	s['monthList'] = 'csv';
	s['shortMonth'] = 'boolean';
	s['showMonthNumber'] = 'boolean';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_dateSelect_focus = function() {
var el = null;
switch (this.format.charAt(0)) {
case 'Y':
el = this.findElement('year');
break;
case 'M':
el = this.findElement('month');
break;
case 'D':
el = this.findElement('day');
break;
}
if (el) {
try {
el.focus();
}
catch(ex) {
}
}
}

self._ZEN_Component_dateSelect_getDay = function() {
var day = this.findElement('day');
return (day ? day.value : '');
}

self._ZEN_Component_dateSelect_getMonth = function() {
var month = this.findElement('month');
return (month ? month.value : '');
}

self._ZEN_Component_dateSelect_getYear = function() {
var year = this.findElement('year');
return (year ? year.value : '');
}

self._ZEN_Component_dateSelect_isCompleteDate = function() {
var year = this.findElement('year');
var month = this.findElement('month');
var day = this.findElement('day');
var control = 0;
var blank = 0;
if (year) {
control++;
if (year.value=="") { blank++; }
}
if (month) {
control++;
if (month.value=="") { blank++; }
}
if (day) {
control++;
if (day.value=="") { blank++; }
}
if ((blank>0)&&(blank!=control)) {
return false;
}
return true;
}

self._ZEN_Component_dateSelect_isValid = function() {
var d = zenParseDate(this.getValue());
if (-1 == d) return false;
return true;
}

self._ZEN_Component_dateSelect_ondatechangeHandler = function(which) {
var year = this.findElement('year');
var month = this.findElement('month');
var day = this.findElement('day');
switch(which) {
case 'year':
if (year.value=='') {
if (month) { month.value = ''; }
if (day) { day.value = ''; }
}
break;
case 'month':
if (month.value=='') {
if (year) { year.value = ''; }
if (day) { day.value = ''; }
}
break;
case 'day':
if (day.value=='') {
if (month) { month.value = ''; }
if (year) { year.value = ''; }
}
break;
}
var yearVal = year ? parseInt(year.value) : '';
var monthVal = month ? parseInt(month.value) : '';
var dayVal = day ? parseInt(day.value) : '';
yearVal = isNaN(yearVal) ? '' : yearVal;
monthVal = isNaN(monthVal) ? '' : monthVal;
dayVal = isNaN(dayVal) ? '' : dayVal;
if ((yearVal=='')&&(this.format=='MD' || this.format=='DM' || this.format=='M')) {
var now = new Date();
yearVal = now.getFullYear();
}
if ((dayVal=='')&&(this.format=='YM' || this.format=='MY' || this.format=='M' || this.format=='Y')) {
dayVal = 1;
}
if ((monthVal=='')&&(this.format=='Y')) {
monthVal = 1;
}
var complete = this.isCompleteDate();
if (!complete) {
this.value = 'missing';
}
else if ((yearVal=='')&&(monthVal=='')&&(dayVal=='')) {
this.value = '';
}
else {
var d = new Date(yearVal,monthVal-1,dayVal);
d.setYear(yearVal);
d.setMonth(monthVal-1);
d.setDate(dayVal);
if (d.getMonth() != (monthVal - 1)) {
d.setDate((monthVal==2) ? 28 : 30);
if (day) {
day.value = (monthVal==2) ? 28 : 30;
}
d.setMonth(monthVal - 1);
}
this.value = zenDateToString(d);
}
if (day && 'day' != which) {
this.updateDayList();
}
var el = this.findElement('control');
if (el) {
el.value = this.value;
}
this.onchangeHandler();
}

self._ZEN_Component_dateSelect_setProperty = function(property,value,value2) {
var el = this.findElement('control'); // hidden
var year = this.findElement('year');
var month = this.findElement('month');
var day = this.findElement('day');
switch(property) {
case 'value':
var yearVal = '';
var monthVal = '';
var dayVal = '';
if (value != '') {
var now = new Date();
value = value.toString();
yearVal = parseInt(value.substr(0,4),10);
yearVal = (isNaN(yearVal) ? now.getFullYear() : yearVal);
monthVal = parseInt(value.substr(5,2),10);
monthVal = (isNaN(monthVal) ? 1 : monthVal);
dayVal = parseInt(value.substr(8,2),10);
dayVal = (isNaN(dayVal) ? 1 : dayVal);
}
if (el) { el.value = value; }
if (year) { year.value = yearVal; }
if (month) { month.value = monthVal; }
if (day) {
day.value = dayVal;
this.updateDayList();
}
break;
case 'minYear':
case 'maxYear':
this[property] = value;
this.updateYearList();
break;
case 'controlClass':
this.controlClass = value;
if (year) { year.className = (this.invalid ? 'zenInvalid' : this.controlClass);}
if (month) { month.className = (this.invalid ? 'zenInvalid' : this.controlClass);}
if (day) { day.className = (this.invalid ? 'zenInvalid' : this.controlClass);}
break;
case 'controlStyle':
this.controlStyle = value;
if (year) { year.style.cssText = value;	}
if (month) { month.style.cssText = value; }
if (day) { day.style.cssText = value;	}
break;
case 'disabled':
value = (value) ? true : false;
this.disabled = value;
var d = (this.readOnly || this.disabled);
if (year) { year.disabled = d; }
if (month) { month.disabled = d; }
if (day) { day.disabled = d; }
var lbl = this.getLabelElement();
if (lbl) {
if (this.disabled) {
lbl.className = 'zenLabelDisabled';
}
else {
lbl.className = (''==this.labelClass) ? 'zenLabel' : this.labelClass;
}
}
break;
case 'readOnly':
value = (value) ? true : false;
this.readOnly = value;
var d = (this.readOnly || this.disabled);
if (year) { year.disabled = d; }
if (month) { month.disabled = d; }
if (day) { day.disabled = d; }
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_dateSelect_updateDayList = function() {
var year = this.getYear();
if (year=='') {
var now = new Date();
year = now.getFullYear();
}
var month = this.getMonth();
if (month=='') {
month = 1;
}
var day = this.findElement('day');
if (day) {
var tDay = day.value;
day.options.length = 0;
var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
if (year%4 == 0) {
if (year%100 == 0 && year%400 != 0) {
}
else {
daysInMonth[1] = 29;
}
}
day.options[day.options.length] = new Option('','');
for (var d = 1; d <= daysInMonth[month-1]; d++) {
day.options[day.options.length] = new Option(d,d,false,d==tDay);
}
}
}

self._ZEN_Component_dateSelect_updateYearList = function() {
var year = this.findElement('year');
if (year) {
var now = new Date();
var tYear = parseInt(this.value.substr(0,4),10);
year.options.length = 0;
var minY = parseInt(this.minYear,10);
var maxY = parseInt(this.maxYear,10);
minY = isNaN(minY) ? 1900 : minY;
maxY = isNaN(maxY) ? (now.getFullYear() + 20) : maxY;
minY = (minY < 1840) ? 1840 : minY;
maxY = (maxY > 3000) ? 3000 : maxY;
year.options[year.options.length] = new Option('','');
for (var y = minY; y <= maxY; y++) {
year.options[year.options.length] = new Option(y,y,false,y==tYear);
}
}
}

self._ZEN_Component_dateSelect_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_dateSelect__Loader = function() {
	zenLoadClass('_ZEN_Component_control');
	_ZEN_Component_dateSelect.prototype = zenCreate('_ZEN_Component_control',-1);
	var p = _ZEN_Component_dateSelect.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_dateSelect;
	p.superClass = ('undefined' == typeof _ZEN_Component_control) ? zenMaster._ZEN_Component_control.prototype:_ZEN_Component_control.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.dateSelect';
	p._type = 'dateSelect';
	p.serialize = _ZEN_Component_dateSelect_serialize;
	p.getSettings = _ZEN_Component_dateSelect_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_dateSelect_ReallyRefreshContents;
	p.focus = _ZEN_Component_dateSelect_focus;
	p.getDay = _ZEN_Component_dateSelect_getDay;
	p.getMonth = _ZEN_Component_dateSelect_getMonth;
	p.getYear = _ZEN_Component_dateSelect_getYear;
	p.isCompleteDate = _ZEN_Component_dateSelect_isCompleteDate;
	p.isValid = _ZEN_Component_dateSelect_isValid;
	p.ondatechangeHandler = _ZEN_Component_dateSelect_ondatechangeHandler;
	p.setProperty = _ZEN_Component_dateSelect_setProperty;
	p.updateDayList = _ZEN_Component_dateSelect_updateDayList;
	p.updateYearList = _ZEN_Component_dateSelect_updateYearList;
}

self._zenClassIdx['dateText'] = '_ZEN_Component_dateText';
self._ZEN_Component_dateText = function(index,id) {
	if (index>=0) {_ZEN_Component_dateText__init(this,index,id);}
}

self._ZEN_Component_dateText__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_control__init) ?zenMaster._ZEN_Component_control__init(o,index,id):_ZEN_Component_control__init(o,index,id);
	o.controlClass = 'dateTextInput';
	o.dayList = '';
	o.defaultTime = '';
	o.firstDayOfWeek = '0';
	o.format = 'YMD';
	o.image = 'portal\/calendar_48.gif';
	o.invalidDateMessage = 'Invalid Date';
	o.maxDate = '';
	o.minDate = '';
	o.monthList = '';
	o.onshowPopup = '';
	o.separator = '-';
	o.showTime = false;
	o.size = '15';
	o.timeCaption = '';
}
function _ZEN_Component_dateText_serialize(set,s)
{
	var o = this;s[0]='1363603186';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.clientType;s[9]=o.containerStyle;s[10]=o.controlClass;s[11]=o.controlStyle;s[12]=o.dataBinding;s[13]=o.dayList;s[14]=o.defaultTime;s[15]=(o.disabled?1:0);s[16]=(o.dragEnabled?1:0);s[17]=(o.dropEnabled?1:0);s[18]=(o.dynamic?1:0);s[19]=o.enclosingClass;s[20]=o.enclosingStyle;s[21]=o.error;s[22]=o.firstDayOfWeek;s[23]=o.format;s[24]=o.height;s[25]=(o.hidden?1:0);s[26]=o.hint;s[27]=o.hintClass;s[28]=o.hintStyle;s[29]=o.image;s[30]=(o.invalid?1:0);s[31]=o.invalidDateMessage;s[32]=o.invalidMessage;s[33]=o.label;s[34]=o.labelClass;s[35]=o.labelDisabledClass;s[36]=o.labelStyle;s[37]=o.maxDate;s[38]=o.minDate;s[39]=o.monthList;s[40]=o.onafterdrag;s[41]=o.onbeforedrag;s[42]=o.onblur;s[43]=o.onchange;s[44]=o.onclick;s[45]=o.ondblclick;s[46]=o.ondrag;s[47]=o.ondrop;s[48]=o.onfocus;s[49]=o.onhide;s[50]=o.onkeydown;s[51]=o.onkeypress;s[52]=o.onkeyup;s[53]=o.onmousedown;s[54]=o.onmouseout;s[55]=o.onmouseover;s[56]=o.onmouseup;s[57]=o.onrefresh;s[58]=o.onshow;s[59]=o.onshowPopup;s[60]=o.onsubmit;s[61]=o.ontouchend;s[62]=o.ontouchmove;s[63]=o.ontouchstart;s[64]=o.onupdate;s[65]=o.onvalidate;s[66]=o.originalValue;s[67]=o.overlayMode;s[68]=(o.readOnly?1:0);s[69]=o.renderFlag;s[70]=(o.required?1:0);s[71]=o.requiredMessage;s[72]=o.separator;s[73]=(o.showLabel?1:0);s[74]=(o.showTime?1:0);s[75]=o.size;s[76]=o.slice;s[77]=o.tabIndex;s[78]=o.timeCaption;s[79]=o.title;s[80]=o.tuple;s[81]=o.valign;s[82]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[83]=(o.visible?1:0);s[84]=o.width;
}
function _ZEN_Component_dateText_getSettings(s)
{
	s['name'] = 'string';
	s['dayList'] = 'csv';
	s['defaultTime'] = 'string';
	s['firstDayOfWeek'] = 'integer';
	s['format'] = 'enum:MDY,DMY,YMD';
	s['image'] = 'uri';
	s['invalidDateMessage'] = 'caption';
	s['maxDate'] = 'string';
	s['minDate'] = 'string';
	s['monthList'] = 'csv';
	s['onshowPopup'] = 'eventHandler';
	s['separator'] = 'enum:-,/,., ';
	s['showTime'] = 'boolean';
	s['size'] = 'integer';
	s['timeCaption'] = 'caption';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_dateText_adjustSize = function() {
var el = this.findElement('control');
var icon = this.findElement('icon');
var div = this.findElement('div');
if (el && icon && div) {
div.style.opacity = 1.0;
icon.style.width = el.offsetHeight + 'px';
icon.style.height = el.offsetHeight + 'px';
div.style.height = el.offsetHeight+2 + 'px';
div.style.width = el.offsetWidth + el.offsetHeight+4 + 'px';
}
}

self._ZEN_Component_dateText_applyDate = function(group) {
var value = group.getValue();
var oldval = this.value;
var ctrl = this.findElement('control');
ctrl.value = this.formatValue(value);
this.value = value;
if (oldval != this.value) {
this.onchangeHandler();
}
}

self._ZEN_Component_dateText_formatValue = function(val) {
if ('' != val) {
if (-1 == val) {
val = this.invalidDateMessage;
}
else {
val = zenParseDate(val,this.showTime,this.format,this.separator);
}
}
return val
}

self._ZEN_Component_dateText_isValid = function() {
var value = this.getValue();
if ('' == value) return true;
var d = zenParseDate(value,this.showTime);
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

self._ZEN_Component_dateText_keydownHandler = function(evt) {
var ret = true;
evt = evt ? evt : event;
if (evt.keyCode==zenESC) {
if (event) {
event.returnValue = false;
return false;
}
}
if ('' != this.onkeydown) {
var oldEvent = zenEvent;
zenEvent = evt;
ret = zenInvokeCallbackMethod(this.onkeydown,this,'onkeydown');
zenEvent = oldEvent;
}
return ret;
}

self._ZEN_Component_dateText_onDisplayHandler = function() {
this.adjustSize();
}

self._ZEN_Component_dateText_onRefreshContents = function() {
this.setValue(this.value);
}

self._ZEN_Component_dateText_ondatechangeHandler = function() {
var ctrl = this.findElement('control');
zenASSERT(ctrl,'Unable to find input element',arguments);
var v = zenParseDate(this.unformatValue(ctrl.value),this.showTime,this.format,this.separator);
ctrl.value = (-1 == v) ? this.invalidDateMessage : v;
this.onchangeHandler();
}

self._ZEN_Component_dateText_onloadHandler = function() {
this.setValue(this.value);
this.adjustSize();
}

self._ZEN_Component_dateText_setProperty = function(property,value,value2) {
var el = this.findElement('control');
switch(property) {
case 'value':
this.value = value;
if (el) {
el.value = this.formatValue(value);
}
break;
case 'format':
case 'separator':
this[property] = value;
if (el) {
el.value = this.formatValue(this.value);
}
break;
case 'showTime':
value = value ? true : false;
this.showTime = value;
break;
case 'defaultTime':
this.defaultTime = zenNormalizeTime(value);
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

self._ZEN_Component_dateText_showDateSelector = function(defaultTime) {
if (this.disabled || this.readOnly) return;
var ctrl = this.findElement('control');
zenASSERT(ctrl,'Unable to find input element',arguments);
var value = ctrl.value;
var left = zenGetLeft(ctrl) - zenGetLeftScroll(ctrl);
left += zenGetPageScrollLeft(this.window);
var group = zenPage.createComponent('modalGroup');
group.setProperty('onaction','zenPage.getComponent('+this.index+').applyDate(group);');
var iHgt = ctrl.offsetHeight;
var wScrollTop = zenGetPageScrollTop();
var top;
var obj = zenGetPageOffsets(ctrl);
var dHgt = 200; //have to use default height of calendar popup, as it hasn't been rendered so far
var hgt = zenGetWindowHeight();
var uSpace = obj.top - wScrollTop;
var dSpace = hgt-uSpace-iHgt-2;
if (dHgt>dSpace) { // dropdown won't fit as is
if (dSpace>uSpace) {
top = obj.top+iHgt;
}
else {
top = obj.top-dHgt;
}
}
else {  // Dropdown is fine where it is but need to be in page coordinates
top = obj.top+iHgt;
}
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
if ('' != value) {
value = this.unformatValue(value);
value = (-1 == value) ? '' : value;
}
if ('' == value) {
var now = new Date();
calParms['year'] = now.getFullYear();
calParms['month'] = now.getMonth() + 1;
}
calParms['dayList'] = this.dayList;
calParms['monthList'] = this.monthList;
calParms['firstDayOfWeek'] = this.firstDayOfWeek;
if (this.showTime) {
calParms['timeCaption'] = this.timeCaption;
calParms['showTime'] = this.showTime;
calParms['defaultTime'] = this.defaultTime;
}
zenInvokeCallbackMethod(this.onshowPopup,this,'onshowPopup','settings',calParms);
group.show('','calendar',value,top,left,null,null,calParms);
}

self._ZEN_Component_dateText_unformatValue = function(val) {
if (this.invalidDateMessage == val) {
val = -1;
}
else if ('' != val) {
var v=val.toString();
v=v.replace(/\//g,'-');
v=v.replace(/\./g,'-');
v=v.replace(/ /g,'-');
var t = v.split('-');
if (t.length>2) {
switch (this.format) {
case 'DMY':
val = t[2] + this.separator + t[1] + this.separator + t[0];
break;
case 'MDY':
val = t[2] + this.separator + t[0] + this.separator + t[1];
break;
case 'YMD':
val = t[0] + this.separator + t[1] + this.separator + t[2];
break;
}
}
if (this.showTime && t[3]) {
val += ' ' + zenNormalizeTime(t[3]);
}
val = zenParseDate(val,this.showTime,'YMD','-');
}
return val
}

self._ZEN_Component_dateText_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_dateText__Loader = function() {
	zenLoadClass('_ZEN_Component_control');
	_ZEN_Component_dateText.prototype = zenCreate('_ZEN_Component_control',-1);
	var p = _ZEN_Component_dateText.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_dateText;
	p.superClass = ('undefined' == typeof _ZEN_Component_control) ? zenMaster._ZEN_Component_control.prototype:_ZEN_Component_control.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.dateText';
	p._type = 'dateText';
	p.serialize = _ZEN_Component_dateText_serialize;
	p.getSettings = _ZEN_Component_dateText_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_dateText_ReallyRefreshContents;
	p.adjustSize = _ZEN_Component_dateText_adjustSize;
	p.applyDate = _ZEN_Component_dateText_applyDate;
	p.formatValue = _ZEN_Component_dateText_formatValue;
	p.isValid = _ZEN_Component_dateText_isValid;
	p.keydownHandler = _ZEN_Component_dateText_keydownHandler;
	p.onDisplayHandler = _ZEN_Component_dateText_onDisplayHandler;
	p.onRefreshContents = _ZEN_Component_dateText_onRefreshContents;
	p.ondatechangeHandler = _ZEN_Component_dateText_ondatechangeHandler;
	p.onloadHandler = _ZEN_Component_dateText_onloadHandler;
	p.setProperty = _ZEN_Component_dateText_setProperty;
	p.showDateSelector = _ZEN_Component_dateText_showDateSelector;
	p.unformatValue = _ZEN_Component_dateText_unformatValue;
}

self._zenClassIdx['fileUpload'] = '_ZEN_Component_fileUpload';
self._ZEN_Component_fileUpload = function(index,id) {
	if (index>=0) {_ZEN_Component_fileUpload__init(this,index,id);}
}

self._ZEN_Component_fileUpload__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_control__init) ?zenMaster._ZEN_Component_control__init(o,index,id):_ZEN_Component_control__init(o,index,id);
	o.accept = '';
	o.controlClass = 'fileUpload';
	o.maxlength = '';
	o.multiple = false;
	o.size = '';
}
function _ZEN_Component_fileUpload_serialize(set,s)
{
	var o = this;s[0]='2663703804';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.accept;s[7]=o.align;s[8]=o.aux;s[9]=o.clientType;s[10]=o.containerStyle;s[11]=o.controlClass;s[12]=o.controlStyle;s[13]=o.dataBinding;s[14]=(o.disabled?1:0);s[15]=(o.dragEnabled?1:0);s[16]=(o.dropEnabled?1:0);s[17]=(o.dynamic?1:0);s[18]=o.enclosingClass;s[19]=o.enclosingStyle;s[20]=o.error;s[21]=o.height;s[22]=(o.hidden?1:0);s[23]=o.hint;s[24]=o.hintClass;s[25]=o.hintStyle;s[26]=(o.invalid?1:0);s[27]=o.invalidMessage;s[28]=o.label;s[29]=o.labelClass;s[30]=o.labelDisabledClass;s[31]=o.labelStyle;s[32]=o.maxlength;s[33]=(o.multiple?1:0);s[34]=o.onafterdrag;s[35]=o.onbeforedrag;s[36]=o.onblur;s[37]=o.onchange;s[38]=o.onclick;s[39]=o.ondblclick;s[40]=o.ondrag;s[41]=o.ondrop;s[42]=o.onfocus;s[43]=o.onhide;s[44]=o.onkeydown;s[45]=o.onkeypress;s[46]=o.onkeyup;s[47]=o.onmousedown;s[48]=o.onmouseout;s[49]=o.onmouseover;s[50]=o.onmouseup;s[51]=o.onrefresh;s[52]=o.onshow;s[53]=o.onsubmit;s[54]=o.ontouchend;s[55]=o.ontouchmove;s[56]=o.ontouchstart;s[57]=o.onupdate;s[58]=o.onvalidate;s[59]=o.originalValue;s[60]=o.overlayMode;s[61]=(o.readOnly?1:0);s[62]=o.renderFlag;s[63]=(o.required?1:0);s[64]=o.requiredMessage;s[65]=(o.showLabel?1:0);s[66]=o.size;s[67]=o.slice;s[68]=o.tabIndex;s[69]=o.title;s[70]=o.tuple;s[71]=o.valign;s[72]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[73]=(o.visible?1:0);s[74]=o.width;
}
function _ZEN_Component_fileUpload_getSettings(s)
{
	s['name'] = 'string';
	s['accept'] = 'csv';
	s['maxlength'] = 'integer';
	s['multiple'] = 'boolean';
	s['size'] = 'integer';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_fileUpload_setProperty = function(property,value,value2) {
var el = this.findElement('control');
switch(property) {
case 'size':
this.size = value;
if (el) { el.size = value; }
break;
case 'accept':
this.accept = value;
if (el) { el.accept = value; }
break;
case 'maxlength':
this.maxlength = value;
if (el) { el.maxlength = value; }
break;
case 'value':
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_fileUpload_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_fileUpload__Loader = function() {
	zenLoadClass('_ZEN_Component_control');
	_ZEN_Component_fileUpload.prototype = zenCreate('_ZEN_Component_control',-1);
	var p = _ZEN_Component_fileUpload.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_fileUpload;
	p.superClass = ('undefined' == typeof _ZEN_Component_control) ? zenMaster._ZEN_Component_control.prototype:_ZEN_Component_control.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.fileUpload';
	p._type = 'fileUpload';
	p.serialize = _ZEN_Component_fileUpload_serialize;
	p.getSettings = _ZEN_Component_fileUpload_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_fileUpload_ReallyRefreshContents;
	p.setProperty = _ZEN_Component_fileUpload_setProperty;
}

self._zenClassIdx['hbutton'] = '_ZEN_Component_hbutton';
self._ZEN_Component_hbutton = function(index,id) {
	if (index>=0) {_ZEN_Component_hbutton__init(this,index,id);}
}

self._ZEN_Component_hbutton__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_control__init) ?zenMaster._ZEN_Component_control__init(o,index,id):_ZEN_Component_control__init(o,index,id);
	o.OnDrawContent = ''; // encrypted
	o.content = '';
	o.controlClass = 'button';
	o.seed = '';
}
function _ZEN_Component_hbutton_serialize(set,s)
{
	var o = this;s[0]='4127186831';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.OnDrawContent;s[7]=o.align;s[8]=o.aux;s[9]=o.clientType;s[10]=o.containerStyle;s[11]=o.content;s[12]=o.controlClass;s[13]=o.controlStyle;s[14]=o.dataBinding;s[15]=(o.disabled?1:0);s[16]=(o.dragEnabled?1:0);s[17]=(o.dropEnabled?1:0);s[18]=(o.dynamic?1:0);s[19]=o.enclosingClass;s[20]=o.enclosingStyle;s[21]=o.error;s[22]=o.height;s[23]=(o.hidden?1:0);s[24]=o.hint;s[25]=o.hintClass;s[26]=o.hintStyle;s[27]=(o.invalid?1:0);s[28]=o.invalidMessage;s[29]=o.label;s[30]=o.labelClass;s[31]=o.labelDisabledClass;s[32]=o.labelStyle;s[33]=o.onafterdrag;s[34]=o.onbeforedrag;s[35]=o.onblur;s[36]=o.onchange;s[37]=o.onclick;s[38]=o.ondblclick;s[39]=o.ondrag;s[40]=o.ondrop;s[41]=o.onfocus;s[42]=o.onhide;s[43]=o.onkeydown;s[44]=o.onkeypress;s[45]=o.onkeyup;s[46]=o.onmousedown;s[47]=o.onmouseout;s[48]=o.onmouseover;s[49]=o.onmouseup;s[50]=o.onrefresh;s[51]=o.onshow;s[52]=o.onsubmit;s[53]=o.ontouchend;s[54]=o.ontouchmove;s[55]=o.ontouchstart;s[56]=o.onupdate;s[57]=o.onvalidate;s[58]=o.originalValue;s[59]=o.overlayMode;s[60]=(o.readOnly?1:0);s[61]=o.renderFlag;s[62]=(o.required?1:0);s[63]=o.requiredMessage;s[64]=o.seed;s[65]=(o.showLabel?1:0);s[66]=o.slice;s[67]=o.tabIndex;s[68]=o.title;s[69]=o.tuple;s[70]=o.valign;s[71]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[72]=(o.visible?1:0);s[73]=o.width;
}
function _ZEN_Component_hbutton_getSettings(s)
{
	s['name'] = 'string';
	s['content'] = 'html';
	s['seed'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_hbutton_getContent = function(content) {
return this.content;
}

self._ZEN_Component_hbutton_setContent = function(content) {
this.setProperty('content',content);
}

self._ZEN_Component_hbutton_setProperty = function(property,value,value2) {
switch(property) {
case 'content':
var div = this.getEnclosingDiv();
zenASSERT(div!=null,'Unable to find html div element.',arguments);
value = value ? value : '';
this.content = value.toString();
if (-1 == this.content.search(/#\(/)) {
div.innerHTML = value;
}
else {
this.refreshContents();
}
break;
case 'seed':
if (this.seed != value) {
this.seed = value;
this.refreshContents();
}
break;
default:
return this.invokeSuper('setProperty',arguments);
break;
}
return true;
}

self._ZEN_Component_hbutton_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_hbutton__Loader = function() {
	zenLoadClass('_ZEN_Component_control');
	_ZEN_Component_hbutton.prototype = zenCreate('_ZEN_Component_control',-1);
	var p = _ZEN_Component_hbutton.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_hbutton;
	p.superClass = ('undefined' == typeof _ZEN_Component_control) ? zenMaster._ZEN_Component_control.prototype:_ZEN_Component_control.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.hbutton';
	p._type = 'hbutton';
	p.serialize = _ZEN_Component_hbutton_serialize;
	p.getSettings = _ZEN_Component_hbutton_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_hbutton_ReallyRefreshContents;
	p.getContent = _ZEN_Component_hbutton_getContent;
	p.setContent = _ZEN_Component_hbutton_setContent;
	p.setProperty = _ZEN_Component_hbutton_setProperty;
}

self._zenClassIdx['hidden'] = '_ZEN_Component_hidden';
self._ZEN_Component_hidden = function(index,id) {
	if (index>=0) {_ZEN_Component_hidden__init(this,index,id);}
}

self._ZEN_Component_hidden__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_control__init) ?zenMaster._ZEN_Component_control__init(o,index,id):_ZEN_Component_control__init(o,index,id);
	o.hidden = true;
}
function _ZEN_Component_hidden_serialize(set,s)
{
	var o = this;s[0]='3989876153';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.clientType;s[9]=o.containerStyle;s[10]=o.controlClass;s[11]=o.controlStyle;s[12]=o.dataBinding;s[13]=(o.disabled?1:0);s[14]=(o.dragEnabled?1:0);s[15]=(o.dropEnabled?1:0);s[16]=(o.dynamic?1:0);s[17]=o.enclosingClass;s[18]=o.enclosingStyle;s[19]=o.error;s[20]=o.height;s[21]=(o.hidden?1:0);s[22]=o.hint;s[23]=o.hintClass;s[24]=o.hintStyle;s[25]=(o.invalid?1:0);s[26]=o.invalidMessage;s[27]=o.label;s[28]=o.labelClass;s[29]=o.labelDisabledClass;s[30]=o.labelStyle;s[31]=o.onafterdrag;s[32]=o.onbeforedrag;s[33]=o.onblur;s[34]=o.onchange;s[35]=o.onclick;s[36]=o.ondblclick;s[37]=o.ondrag;s[38]=o.ondrop;s[39]=o.onfocus;s[40]=o.onhide;s[41]=o.onkeydown;s[42]=o.onkeypress;s[43]=o.onkeyup;s[44]=o.onmousedown;s[45]=o.onmouseout;s[46]=o.onmouseover;s[47]=o.onmouseup;s[48]=o.onrefresh;s[49]=o.onshow;s[50]=o.onsubmit;s[51]=o.ontouchend;s[52]=o.ontouchmove;s[53]=o.ontouchstart;s[54]=o.onupdate;s[55]=o.onvalidate;s[56]=o.originalValue;s[57]=o.overlayMode;s[58]=(o.readOnly?1:0);s[59]=o.renderFlag;s[60]=(o.required?1:0);s[61]=o.requiredMessage;s[62]=(o.showLabel?1:0);s[63]=o.slice;s[64]=o.tabIndex;s[65]=o.title;s[66]=o.tuple;s[67]=o.valign;s[68]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[69]=(o.visible?1:0);s[70]=o.width;
}
function _ZEN_Component_hidden_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_hidden_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_hidden__Loader = function() {
	zenLoadClass('_ZEN_Component_control');
	_ZEN_Component_hidden.prototype = zenCreate('_ZEN_Component_control',-1);
	var p = _ZEN_Component_hidden.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_hidden;
	p.superClass = ('undefined' == typeof _ZEN_Component_control) ? zenMaster._ZEN_Component_control.prototype:_ZEN_Component_control.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.hidden';
	p._type = 'hidden';
	p.serialize = _ZEN_Component_hidden_serialize;
	p.getSettings = _ZEN_Component_hidden_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_hidden_ReallyRefreshContents;
}

self._zenClassIdx['image'] = '_ZEN_Component_image';
self._ZEN_Component_image = function(index,id) {
	if (index>=0) {_ZEN_Component_image__init(this,index,id);}
}

self._ZEN_Component_image__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_control__init) ?zenMaster._ZEN_Component_control__init(o,index,id):_ZEN_Component_control__init(o,index,id);
	o.alt = '';
	o.src = '';
	o.srcDisabled = '';
	o.srcMissing = '';
	o.streamId = ''; // encrypted
	o.text = '';
}
function _ZEN_Component_image_serialize(set,s)
{
	var o = this;s[0]='479689791';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.alt;s[8]=o.aux;s[9]=o.clientType;s[10]=o.containerStyle;s[11]=o.controlClass;s[12]=o.controlStyle;s[13]=o.dataBinding;s[14]=(o.disabled?1:0);s[15]=(o.dragEnabled?1:0);s[16]=(o.dropEnabled?1:0);s[17]=(o.dynamic?1:0);s[18]=o.enclosingClass;s[19]=o.enclosingStyle;s[20]=o.error;s[21]=o.height;s[22]=(o.hidden?1:0);s[23]=o.hint;s[24]=o.hintClass;s[25]=o.hintStyle;s[26]=(o.invalid?1:0);s[27]=o.invalidMessage;s[28]=o.label;s[29]=o.labelClass;s[30]=o.labelDisabledClass;s[31]=o.labelStyle;s[32]=o.onafterdrag;s[33]=o.onbeforedrag;s[34]=o.onblur;s[35]=o.onchange;s[36]=o.onclick;s[37]=o.ondblclick;s[38]=o.ondrag;s[39]=o.ondrop;s[40]=o.onfocus;s[41]=o.onhide;s[42]=o.onkeydown;s[43]=o.onkeypress;s[44]=o.onkeyup;s[45]=o.onmousedown;s[46]=o.onmouseout;s[47]=o.onmouseover;s[48]=o.onmouseup;s[49]=o.onrefresh;s[50]=o.onshow;s[51]=o.onsubmit;s[52]=o.ontouchend;s[53]=o.ontouchmove;s[54]=o.ontouchstart;s[55]=o.onupdate;s[56]=o.onvalidate;s[57]=o.originalValue;s[58]=o.overlayMode;s[59]=(o.readOnly?1:0);s[60]=o.renderFlag;s[61]=(o.required?1:0);s[62]=o.requiredMessage;s[63]=(o.showLabel?1:0);s[64]=o.slice;s[65]=o.src;s[66]=o.srcDisabled;s[67]=o.srcMissing;s[68]=o.streamId;s[69]=o.tabIndex;s[70]=o.text;s[71]=o.title;s[72]=o.tuple;s[73]=o.valign;s[74]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[75]=(o.visible?1:0);s[76]=o.width;
}
function _ZEN_Component_image_getSettings(s)
{
	s['name'] = 'string';
	s['alt'] = 'caption';
	s['src'] = 'uri';
	s['srcDisabled'] = 'uri';
	s['srcMissing'] = 'uri';
	s['streamId'] = 'string';
	s['text'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_image_getDragData = function(dragData) {
dragData.value = this.text;
dragData.text = this.text;
return true;
}

self._ZEN_Component_image_imageClick = function(evt) {
if (!this.disabled) {
zenFireEvent(this.index, this.onclick, 'onclick', evt);
}
}

self._ZEN_Component_image_itemMouseDown = function(evt) {
if (this.dragEnabled) {
evt = evt ? evt : window.event;
if (evt.preventDefault) {
evt.preventDefault();
}
return false;
}
return true;
}

self._ZEN_Component_image_itemMouseUp = function(evt) {
if (this.dragEnabled) {
evt = evt ? evt : window.event;
if (evt.preventDefault) {
evt.preventDefault();
}
return false;
}
return true;
}

self._ZEN_Component_image_setProperty = function(property,value,value2) {
var el = this.findElement('image');
switch(property) {
case 'src':
this.src = value;
if (!this.disabled || '' == this.srcDisabled) {
el.src = value;
}
break;
case 'srcDisabled':
this.srcDisabled = value;
if (this.disabled) {
el.src = value;
}
break;
case 'disabled':
value = value ? true : false;
this.disabled = value;
if (!this.disabled || '' == this.srcDisabled) {
if ('' != this.value) {
this.setProperty('value',this.value);
}
else {
try {
el.src = this.src;
el.style.opacity = (this.disabled ? 0.5 : 1.0);
if (zenIsIE) {
el.style.filter = (this.disabled ? 'alpha(opacity=50)' : 'alpha(opacity=100)');
}
}
catch(ex) { } // ignore browser errors (HCR311)
}
}
else {
el.src = this.srcDisabled;
}
break;
case 'value':
if (this.value===value) {
break;
}
this.value = value;
if (!this.disabled || '' == this.srcDisabled) {
if ('' == this.value) {
el.src = this.srcMissing;
}
else {
el.src = '%25CSP.StreamServer.cls?STREAMOID=' + escape(this.value);
}
}
break;
case 'width':
case 'height':
this[property] = value;
if (el) {
el[property] = value;
}
break;
case 'controlStyle':
this.controlStyle = value;
if (el) { el.style.cssText = value;	}
break;
case 'title':
this.title = value;
if (el) { el.title = value;	}
break;
default:
return this.invokeSuper('setProperty',arguments);
break;
}
return true;
}

self._ZEN_Component_image_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_image__Loader = function() {
	zenLoadClass('_ZEN_Component_control');
	_ZEN_Component_image.prototype = zenCreate('_ZEN_Component_control',-1);
	var p = _ZEN_Component_image.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_image;
	p.superClass = ('undefined' == typeof _ZEN_Component_control) ? zenMaster._ZEN_Component_control.prototype:_ZEN_Component_control.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.image';
	p._type = 'image';
	p.serialize = _ZEN_Component_image_serialize;
	p.getSettings = _ZEN_Component_image_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_image_ReallyRefreshContents;
	p.getDragData = _ZEN_Component_image_getDragData;
	p.imageClick = _ZEN_Component_image_imageClick;
	p.itemMouseDown = _ZEN_Component_image_itemMouseDown;
	p.itemMouseUp = _ZEN_Component_image_itemMouseUp;
	p.setProperty = _ZEN_Component_image_setProperty;
}

self._zenClassIdx['label'] = '_ZEN_Component_label';
self._ZEN_Component_label = function(index,id) {
	if (index>=0) {_ZEN_Component_label__init(this,index,id);}
}

self._ZEN_Component_label__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_control__init) ?zenMaster._ZEN_Component_control__init(o,index,id):_ZEN_Component_control__init(o,index,id);
	o.controlClass = 'labelText';
}
function _ZEN_Component_label_serialize(set,s)
{
	var o = this;s[0]='3989876153';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.clientType;s[9]=o.containerStyle;s[10]=o.controlClass;s[11]=o.controlStyle;s[12]=o.dataBinding;s[13]=(o.disabled?1:0);s[14]=(o.dragEnabled?1:0);s[15]=(o.dropEnabled?1:0);s[16]=(o.dynamic?1:0);s[17]=o.enclosingClass;s[18]=o.enclosingStyle;s[19]=o.error;s[20]=o.height;s[21]=(o.hidden?1:0);s[22]=o.hint;s[23]=o.hintClass;s[24]=o.hintStyle;s[25]=(o.invalid?1:0);s[26]=o.invalidMessage;s[27]=o.label;s[28]=o.labelClass;s[29]=o.labelDisabledClass;s[30]=o.labelStyle;s[31]=o.onafterdrag;s[32]=o.onbeforedrag;s[33]=o.onblur;s[34]=o.onchange;s[35]=o.onclick;s[36]=o.ondblclick;s[37]=o.ondrag;s[38]=o.ondrop;s[39]=o.onfocus;s[40]=o.onhide;s[41]=o.onkeydown;s[42]=o.onkeypress;s[43]=o.onkeyup;s[44]=o.onmousedown;s[45]=o.onmouseout;s[46]=o.onmouseover;s[47]=o.onmouseup;s[48]=o.onrefresh;s[49]=o.onshow;s[50]=o.onsubmit;s[51]=o.ontouchend;s[52]=o.ontouchmove;s[53]=o.ontouchstart;s[54]=o.onupdate;s[55]=o.onvalidate;s[56]=o.originalValue;s[57]=o.overlayMode;s[58]=(o.readOnly?1:0);s[59]=o.renderFlag;s[60]=(o.required?1:0);s[61]=o.requiredMessage;s[62]=(o.showLabel?1:0);s[63]=o.slice;s[64]=o.tabIndex;s[65]=o.title;s[66]=o.tuple;s[67]=o.valign;s[68]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[69]=(o.visible?1:0);s[70]=o.width;
}
function _ZEN_Component_label_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_label_getProperty = function(property,key) {
var el = this.findElement('label');
switch(property) {
case 'value':
if (el) {
this.value = this.unformatValue ? this.unformatValue(el.value) : el.value;
}
return this.normalizeValue(this.value);
}
return this.invokeSuper('getProperty',arguments);
}

self._ZEN_Component_label_onSerialize = function() {
var el = this.findElement('label');
if (el) {
this.value = this.normalizeValue(this.unformatValue ? this.unformatValue(el.value) : el.value);
}
}

self._ZEN_Component_label_setProperty = function(property,value,value2) {
var el = this.findElement('label');
var span = this.findElement('control');
switch(property) {
case 'value':
this.value = value;
if (el) {el.value = value;}
if (span) {span.innerHTML =  zenEscapeHTMLSafe(value);}
break;
case 'controlClass':
this.controlClass = value;
if (span) { span.className = this.controlClass;}
break;
case 'controlStyle':
this.controlStyle = value;
if (span) { span.style.cssText = value;	}
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_label_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_label__Loader = function() {
	zenLoadClass('_ZEN_Component_control');
	_ZEN_Component_label.prototype = zenCreate('_ZEN_Component_control',-1);
	var p = _ZEN_Component_label.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_label;
	p.superClass = ('undefined' == typeof _ZEN_Component_control) ? zenMaster._ZEN_Component_control.prototype:_ZEN_Component_control.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.label';
	p._type = 'label';
	p.serialize = _ZEN_Component_label_serialize;
	p.getSettings = _ZEN_Component_label_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_label_ReallyRefreshContents;
	p.getProperty = _ZEN_Component_label_getProperty;
	p.onSerialize = _ZEN_Component_label_onSerialize;
	p.setProperty = _ZEN_Component_label_setProperty;
}

self._zenClassIdx['listControl'] = '_ZEN_Component_listControl';
self._ZEN_Component_listControl = function(index,id) {
	if (index>=0) {_ZEN_Component_listControl__init(this,index,id);}
}

self._ZEN_Component_listControl__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_control__init) ?zenMaster._ZEN_Component_control__init(o,index,id):_ZEN_Component_control__init(o,index,id);
	o.choiceColumn = '2';
	o.displayList = '';
	o.maxRows = '500';
	o.parameters = new Array();
	o.queryClass = '';
	o.queryName = '';
	o.sql = ''; // encrypted
	o.valueColumn = '1';
	o.valueList = '';
}
function _ZEN_Component_listControl_serialize(set,s)
{
	var o = this;s[0]='4006206086';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.choiceColumn;s[9]=o.clientType;s[10]=o.containerStyle;s[11]=o.controlClass;s[12]=o.controlStyle;s[13]=o.dataBinding;s[14]=(o.disabled?1:0);s[15]=o.displayList;s[16]=(o.dragEnabled?1:0);s[17]=(o.dropEnabled?1:0);s[18]=(o.dynamic?1:0);s[19]=o.enclosingClass;s[20]=o.enclosingStyle;s[21]=o.error;s[22]=o.height;s[23]=(o.hidden?1:0);s[24]=o.hint;s[25]=o.hintClass;s[26]=o.hintStyle;s[27]=(o.invalid?1:0);s[28]=o.invalidMessage;s[29]=o.label;s[30]=o.labelClass;s[31]=o.labelDisabledClass;s[32]=o.labelStyle;s[33]=o.maxRows;s[34]=o.onafterdrag;s[35]=o.onbeforedrag;s[36]=o.onblur;s[37]=o.onchange;s[38]=o.onclick;s[39]=o.ondblclick;s[40]=o.ondrag;s[41]=o.ondrop;s[42]=o.onfocus;s[43]=o.onhide;s[44]=o.onkeydown;s[45]=o.onkeypress;s[46]=o.onkeyup;s[47]=o.onmousedown;s[48]=o.onmouseout;s[49]=o.onmouseover;s[50]=o.onmouseup;s[51]=o.onrefresh;s[52]=o.onshow;s[53]=o.onsubmit;s[54]=o.ontouchend;s[55]=o.ontouchmove;s[56]=o.ontouchstart;s[57]=o.onupdate;s[58]=o.onvalidate;s[59]=o.originalValue;s[60]=o.overlayMode;s[61]=set.serializeList(o,o.parameters,true,'parameters');s[62]=o.queryClass;s[63]=o.queryName;s[64]=(o.readOnly?1:0);s[65]=o.renderFlag;s[66]=(o.required?1:0);s[67]=o.requiredMessage;s[68]=(o.showLabel?1:0);s[69]=o.slice;s[70]=o.sql;s[71]=o.tabIndex;s[72]=o.title;s[73]=o.tuple;s[74]=o.valign;s[75]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[76]=o.valueColumn;s[77]=o.valueList;s[78]=(o.visible?1:0);s[79]=o.width;
}
function _ZEN_Component_listControl_getSettings(s)
{
	s['name'] = 'string';
	s['displayList'] = 'csv';
	s['maxRows'] = 'integer';
	s['parameters'] = 'string';
	s['queryClass'] = 'className';
	s['queryName'] = 'classMember:QUERY';
	s['sql'] = 'sql';
	s['valueList'] = 'csv';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_listControl_setProperty = function(property,value,value2) {
switch(property) {
case 'maxRows':
case 'valueList':
case 'displayList':
this[property] = value;
this.refreshContents(true);
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_listControl_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_listControl__Loader = function() {
	zenLoadClass('_ZEN_Component_control');
	_ZEN_Component_listControl.prototype = zenCreate('_ZEN_Component_control',-1);
	var p = _ZEN_Component_listControl.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_listControl;
	p.superClass = ('undefined' == typeof _ZEN_Component_control) ? zenMaster._ZEN_Component_control.prototype:_ZEN_Component_control.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.listControl';
	p._type = 'listControl';
	p.serialize = _ZEN_Component_listControl_serialize;
	p.getSettings = _ZEN_Component_listControl_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_listControl_ReallyRefreshContents;
	p.setProperty = _ZEN_Component_listControl_setProperty;
}

self._zenClassIdx['lookup'] = '_ZEN_Component_lookup';
self._ZEN_Component_lookup = function(index,id) {
	if (index>=0) {_ZEN_Component_lookup__init(this,index,id);}
}

self._ZEN_Component_lookup__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_control__init) ?zenMaster._ZEN_Component_control__init(o,index,id):_ZEN_Component_control__init(o,index,id);
	o.context = '';
	o.displayBinding = '';
	o.idProperty = '';
	o.imageProperty = '';
	o.lookupIcon = 'deepsee\/zoom_16.png';
	o.multiSelect = false;
	o.noResultsMessage = 'Nothing to show!';
	o.ongetdata = '';
	o.onshowPopup = '';
	o.popupLabel = 'Search';
	o.propertyList = '';
	o.separator = ',';
	o.showFilter = true;
	o.size = '';
	o.styleList = '';
	o.text = '';
	o.textProperty = '';
}
function _ZEN_Component_lookup_serialize(set,s)
{
	var o = this;s[0]='3274885201';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.clientType;s[9]=o.containerStyle;s[10]=o.context;s[11]=o.controlClass;s[12]=o.controlStyle;s[13]=o.dataBinding;s[14]=(o.disabled?1:0);s[15]=o.displayBinding;s[16]=(o.dragEnabled?1:0);s[17]=(o.dropEnabled?1:0);s[18]=(o.dynamic?1:0);s[19]=o.enclosingClass;s[20]=o.enclosingStyle;s[21]=o.error;s[22]=o.height;s[23]=(o.hidden?1:0);s[24]=o.hint;s[25]=o.hintClass;s[26]=o.hintStyle;s[27]=o.idProperty;s[28]=o.imageProperty;s[29]=(o.invalid?1:0);s[30]=o.invalidMessage;s[31]=o.label;s[32]=o.labelClass;s[33]=o.labelDisabledClass;s[34]=o.labelStyle;s[35]=o.lookupIcon;s[36]=(o.multiSelect?1:0);s[37]=o.noResultsMessage;s[38]=o.onafterdrag;s[39]=o.onbeforedrag;s[40]=o.onblur;s[41]=o.onchange;s[42]=o.onclick;s[43]=o.ondblclick;s[44]=o.ondrag;s[45]=o.ondrop;s[46]=o.onfocus;s[47]=o.ongetdata;s[48]=o.onhide;s[49]=o.onkeydown;s[50]=o.onkeypress;s[51]=o.onkeyup;s[52]=o.onmousedown;s[53]=o.onmouseout;s[54]=o.onmouseover;s[55]=o.onmouseup;s[56]=o.onrefresh;s[57]=o.onshow;s[58]=o.onshowPopup;s[59]=o.onsubmit;s[60]=o.ontouchend;s[61]=o.ontouchmove;s[62]=o.ontouchstart;s[63]=o.onupdate;s[64]=o.onvalidate;s[65]=o.originalValue;s[66]=o.overlayMode;s[67]=o.popupLabel;s[68]=o.propertyList;s[69]=(o.readOnly?1:0);s[70]=o.renderFlag;s[71]=(o.required?1:0);s[72]=o.requiredMessage;s[73]=o.separator;s[74]=(o.showFilter?1:0);s[75]=(o.showLabel?1:0);s[76]=o.size;s[77]=o.slice;s[78]=o.styleList;s[79]=o.tabIndex;s[80]=o.text;s[81]=o.textProperty;s[82]=o.title;s[83]=o.tuple;s[84]=o.valign;s[85]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[86]=(o.visible?1:0);s[87]=o.width;
}
function _ZEN_Component_lookup_getSettings(s)
{
	s['name'] = 'string';
	s['context'] = 'uri';
	s['displayBinding'] = 'string';
	s['idProperty'] = 'string';
	s['imageProperty'] = 'string';
	s['lookupIcon'] = 'uri';
	s['multiSelect'] = 'boolean';
	s['noResultsMessage'] = 'caption';
	s['ongetdata'] = 'eventHandler';
	s['onshowPopup'] = 'eventHandler';
	s['popupLabel'] = 'caption';
	s['propertyList'] = 'csv';
	s['separator'] = 'string';
	s['showFilter'] = 'boolean';
	s['size'] = 'integer';
	s['styleList'] = 'csv';
	s['text'] = 'string';
	s['textProperty'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_lookup_adjustSize = function() {
var wrapperDiv = this.findElement('wrapper');
var textDiv = this.findElement('text');
var imageDiv = this.findElement('image');
if (wrapperDiv && textDiv) {
var hgt = textDiv.offsetHeight;
hgt = hgt < 18 ? 18 : hgt;
var wid = textDiv.offsetWidth;
wid = wid < 50 ? 50 : wid;
wrapperDiv.style.width = (wid+25) + 'px';
wrapperDiv.style.height = (hgt+2) + 'px';
if (imageDiv) {
imageDiv.style.top = (hgt-16)/2 + 'px';
}
}
}

self._ZEN_Component_lookup_applyFilter = function() {
this._selectedIndex = -1;
var ctrl = this.findElement('filter');
if (ctrl) {
var table = this.findElement('table');
var tw = table ? table.offsetWidth : 150;
var div = this.findElement('lookupResults');
if (div) {
div.innerHTML = this.getLookupTableHTML(this._group._spec,ctrl.value);
div.scrollTop = 0;
var table = this.findElement('table');
if (table) {
table.style.width = tw + 'px';
}
}
ctrl.focus();
}
}

self._ZEN_Component_lookup_applyValue = function(value,text) {
if (this._applyFunction && 'function' == typeof this._applyFunction) {
this._applyFunction(value,text);
this._applyFunction = null;
zenPage.endModal();
}
else {
this.setValue(value,text);
var form = this.getForm();
if (form) {
var controller = form.getController();
if (controller) {
if (''!=this.displayBinding) {
form.sendEventToController('propertyChange',this.displayBinding,text);
}
if (''!=this.dataBinding) {
form.sendEventToController('propertyChange',this.dataBinding,value);
}
}
}
zenInvokeCallbackMethod(this.onchange,this,'onchange');
zenPage.endModal();
this.focus();
}
}

self._ZEN_Component_lookup_filterKeyDown = function(evt) {
evt = evt ? evt : window.event;
var ret = true;
switch(evt.keyCode) {
case zenESC:
ret = false;
zenPage.endModal();
break;
case zenENTER:
ret = false;
var spec = this._group._spec;
var array = spec ? spec.data : null;
if (this._selectedIndex>=0 && array && array[this._selectedIndex]) {
var rno = this._rowIndex[this._selectedIndex]
var record = array[rno];
if ('object' == typeof record) {
var id = spec.idProperty&&spec.idProperty!=='' ? record[spec.idProperty] : null;
var text = spec.textProperty&&spec.textProperty!=='' ? record[spec.textProperty] : null;
id = (null === id) ? n : id;
text = (null === text) ? id : text;
}
else {
var id = record;
var text = record;
}
this.applyValue(id,text);
}
break;
case zenDOWN:
var index = this._selectedIndex>=0 ? this._selectedIndex+1 : 0;
if (index < this._itemCount) {
this.selectPopupItem(index);
}
ret = false;
break;
case zenUP:
var index = this._selectedIndex>=1 ? this._selectedIndex-1 : 0;
if (index >= 0) {
this.selectPopupItem(index);
}
ret = false;
break;
case zenPAGEUP:
this.selectPopupItem(0);
ret = false;
break;
case zenPAGEDN:
this.selectPopupItem(this._itemCount - 1);
ret = false;
break;
default:
break;
}
if (!ret) {
if (evt.preventDefault) {
evt.preventDefault();
}
evt.cancelBubble = true;
}
return ret;
}

self._ZEN_Component_lookup_filterKeyUp = function(evt) {
evt = evt ? evt : window.event;
var ret = true;
switch(evt.keyCode) {
case zenESC:
case zenENTER:
case zenDOWN:
case zenUP:
case zenPAGEUP:
case zenPAGEDN:
ret = false;
break;
default:
this.applyFilter();
break;
}
return ret;
}

self._ZEN_Component_lookup_focus = function() {
var inv = this.findElement('anchor');
if (inv) {
inv.focus();
}
}

self._ZEN_Component_lookup_getLookupTableHTML = function(spec,filter) {
filter = zenGet(filter);
filter = filter.toString().toLowerCase();
var array = spec ? spec.data : null;
var value = spec ? spec.value : null;
this._selectedIndex = -1;
this._itemCount = 0;
this._rowIndex = [];
var styles = null;
if (spec.styleList && spec.styleList!=='') {
styles = spec.styleList.toString().split(',');
}
var html = [];
if (!array || !array.length) {
html.push('<div>');
html.push(this.noResultsMessage?this.noResultsMessage:$$$Text('Nothing to show!','%Utility'));
html.push('</div>');
}
else {
html.push('<table id="'+this.makeId('table')+'" class="lookupResultTable" cellspacing="0" border="0" cellpadding="0">');
for (var n = 0; n < array.length; n++) {
var record = array[n];
if ('object' == typeof record) {
var id = spec.idProperty&&spec.idProperty!=='' ? record[spec.idProperty] : null;
var text = spec.textProperty&&spec.textProperty!=='' ? record[spec.textProperty] : null;
id = (null === id) ? n : id;
text = (null === text) ? id : text;
var image = spec.imageProperty&&spec.imageProperty!=='' ? record[spec.imageProperty] : null;
}
else {
var id = record;
var text = record;
var image = null;
}
var values = [];
if ('object' == typeof record) {
if (image) {
}
else if (spec.propertyList && spec.propertyList!=='') {
var t = spec.propertyList.toString().split(',');
for (var i = 0; i < t.length; i++) {
values[i] = record[t[i]];
}
}
else {
values[0] = text;
}
}
else {
values[0] = record;
}
var skip = false;
if (filter!='') {
skip = true;
for (var i = 0; i < values.length; i++) {
if (values[i].toString().toLowerCase().indexOf(filter)>=0) {
skip = false;
break;
}
}
}
if (!skip) {
this._rowIndex[this._itemCount] = n;
var cls = this._itemCount%2 ? 'lookupEven' : 'lookupOdd';
if (id == value) {
cls = 'lookupSelected';
this._selectedIndex = this._itemCount;
}
html.push('<tr class="'+cls+'" id="'+this.makeId('tr_'+this._itemCount)+'" onclick="zenPage.getComponent('+this.index+').applyValue(\''+id+'\',\''+zenEscapeHTML(zenEscapeJS(text))+'\');">');
if (image) {
html.push('<td>' + '<image class="lookupImage" src="'+image+'"/>' + '</td>');
}
else {
for (var i = 0; i < values.length; i++) {
var style = styles&&styles[i] ? styles[i] : '';
html.push('<td class="lookupItem" style="'+style+'">' + zenEscapeXML(values[i]) + '</td>');
}
}
html.push('</tr>');
this._itemCount++;
}
}
html.push('</table>');
}
return html.join('');
}

self._ZEN_Component_lookup_getPopupContent = function(group) {
var spec = group._spec;
var html = [];
var hstyle = this.showFilter ? 'white-space:nowrap;' : 'height:0px; width:0px; overflow:hidden; font-size:0px; line-height:0px';
html.push('<div style="'+hstyle+'" nowrap="1">');
html.push('<input id="'+this.makeId('filter')+'" class="lookupFilter" onkeydown="return zenPage.getComponent('+this.index+').filterKeyDown(event);" onkeyup="return zenPage.getComponent('+this.index+').filterKeyUp(event);" type="text"/>');
html.push('</div>');
html.push('<div id="'+this.makeId('lookupResults')+'" class="lookupResults" style="height:200px; overflow-x:auto;overflow-y:scroll;" id="'+this.makeId('results')+'">');
html.push(this.getLookupTableHTML(spec));
html.push('</div>');
var info = {
style:'width:auto;background:#F0F0F0;',
content: html.join('')
};
return info;
}

self._ZEN_Component_lookup_getProperty = function(property,key) {
switch(property) {
case 'value':
return this.value;
}
return this.invokeSuper('getProperty',arguments);
}

self._ZEN_Component_lookup_getSearchDiv = function() {
return this.findElement('lookupResults');
}

self._ZEN_Component_lookup_renderContents = function() {
var div = this.getEnclosingDiv();
if (!div) return;
var text = this.value;
if (text.toString().length > 22) {
text = text.substr(0,20)+'...';
}
var html = [];
html.push('<div class="lookupDiv" id="'+this.makeId('wrapper')+'" onclick="zenPage.getComponent('+this.index+').focus();">');
var width = '';
if (this.size!=='') {
width = parseInt(this.size) * 10;
}
if (width != '') {
width = 'width:'+width+'px;';
}
var active = !this.readOnly && !this.disabled;
html.push('<div style="position:absolute;left:1px;top:1px;white-space:nowrap;'+width+'" nowrap="1" id="'+this.makeId('text')+'" onclick="zenPage.getComponent('+this.index+').focus();">');
html.push(zenEscapeXML(text));
html.push('</div>');
var click = active ? 'zenPage.getComponent('+this.index+').selectorClick();return false;' : 'return false;';
var keydown = active ? 'return zenPage.getComponent('+this.index+').selectorKeyDown(event);' : '';
html.push('<div class="lookupBtn'+((active)?'':'Inactive')+'" style="width:16px;height:16px;position:absolute;right:0px;" id="'+this.makeId('image')+'">');
html.push('<a id="'+this.makeId('anchor')+'" href="#" onclick="'+click+'" onkeydown="'+keydown+'"><image style="border:none;" src="'+this.lookupIcon+'"/></a>');
html.push('</div>');
html.push('</div>');
div.innerHTML = html.join('');
this.adjustSize();
}

self._ZEN_Component_lookup_selectPopupItem = function(index) {
if ('undefined' != typeof this._selectedIndex && this._selectedIndex>=0) {
var tr = this.findElement('tr_'+this._selectedIndex);
if (tr) {
tr.className = index%2 ? 'lookupOdd' : 'lookupEven';
}
}
this._selectedIndex = index;
if (this._selectedIndex>=0) {
var tr = this.findElement('tr_'+this._selectedIndex);
if (tr) {
tr.className = 'lookupSelected';
}
}
var div = this.findElement('lookupResults');
if (tr && div) {
var top = tr.offsetTop;
var bottom = tr.offsetTop + tr.offsetHeight;
if (bottom > (div.offsetHeight+div.scrollTop)) {
div.scrollTop = (bottom - div.offsetHeight);
}
else if (top < div.scrollTop) {
div.scrollTop = top;
}
}
}

self._ZEN_Component_lookup_selectorClick = function() {
if (this.disabled || this.readOnly) return;
var wrapperDiv = this.findElement('wrapper');
var value = this.value;
var contextParms = {};
if ('' != this.context) {
var context = this.context.toString();
var t = context.split('?');
if (t.length > 1) {
var parmList = t[1];
var t2 = parmList.split('&');
for (var n = 0; n < t2.length; n++) {
var t3 = t2[n].split('=');
var name = t3[0];
var value = t3[1];
if (value.charAt(0)=='@') {
var id = value.substr(1,value.length);
var ctrl = zenPage.getComponentById(id);
value = (ctrl && ctrl.getValue) ? ctrl.getValue() : '';
}
if (name!='') {
contextParms[name] = value;
}
}
}
}
var top,left;
var top = zenGetTop(wrapperDiv) + wrapperDiv.offsetHeight - zenGetTopScroll(wrapperDiv);
var left = zenGetLeft(wrapperDiv) - zenGetLeftScroll(wrapperDiv);
var array = zenInvokeCallbackMethod(this.ongetdata,this,'ongetdata','context',contextParms);
top += zenGetPageScrollTop(this.window);
left += zenGetPageScrollLeft(this.window);
var spec = {
title:(this.popupLabel!='')?this.popupLabel:this.label,
data:array,
idProperty:this.idProperty,
textProperty:this.textProperty,
imageProperty:this.imageProperty,
propertyList:this.propertyList,
styleList:this.styleList,
top:top,
left:left,
value:value
};
this.showPopup(spec);
}

self._ZEN_Component_lookup_selectorKeyDown = function(evt) {
evt = evt ? evt : window.event;
var ret = true;
if ('' != this.onkeydown) {
ret = zenFireEvent(this.index, this.onkeydown, 'onkeydown', evt);
if (!ret) return ret;
}
switch(evt.keyCode) {
case zenDOWN:
case zenENTER:
ret = false;
this.selectorClick();
break;
default:
break;
}
if (!ret) {
if (evt.preventDefault) {
evt.preventDefault();
}
evt.cancelBubble = true;
}
return ret;
}

self._ZEN_Component_lookup_setProperty = function(property,value,value2) {
switch(property) {
case 'value':
this.value = value;
this.text = value2 ? value2 : this.text;
var textDiv = this.findElement('text');
if (textDiv) {
var text = this.text;
if (text.toString().length > 22) {
text = text.substr(0,20)+'...';
}
textDiv.innerHTML = zenEscapeXML(text);
this.adjustSize();
}
break;
case 'idProperty':
case 'textProperty':
case 'imageProperty':
case 'propertyList':
case 'styleList':
case 'context':
case 'multiSelect':
case 'popupLabel':
this[property] = value;
break;
case 'showFilter':
this[property] = value ? true : false;
break;
case 'lookupIcon':
this[property] = value;
this.render();
break;
case 'size':
this[property] = value;
this.adjustSize();
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_lookup_showGroupHandler = function() {
zenInvokeCallbackMethod(this.onshowPopup,this,'onshowPopup');
var div = this._group.getFloatingDiv();
if (div) {
var table = this.findElement('table');
var tw = table ? table.offsetWidth : 150;
if (tw < 150) {
tw = 150;
if (table) {
table.style.width = tw + 'px';
}
}
var sd = this.getSearchDiv();
if (sd) {
sd.style.width = tw + 20 + 'px';
div.style.border = '5px solid rgb(53,107,141)';
div.style.width = sd.offsetWidth + (10) + 'px';
var ctrl = this.findElement('filter');
if (ctrl) {
ctrl.style.width = sd.offsetWidth<160?sd.offsetWidth-40:140 + 'px';
}
}
}
var ctrl = this.findElement('filter');
if (ctrl) {
ctrl.focus();
}
if (this._selectedIndex>=0) {
this.selectPopupItem(this._selectedIndex);
}
}

self._ZEN_Component_lookup_showPopup = function(spec) {
spec = spec ? spec : {};
var value = zenGet(spec.value,'');
var top = spec.top ? spec.top : null;
var left = spec.left ? spec.left : null;
if (spec.parentDiv) {
top = zenGetTop(spec.parentDiv) + spec.parentDiv.offsetHeight - zenGetTopScroll(spec.parentDiv);
left = zenGetLeft(spec.parentDiv) - zenGetLeftScroll(spec.parentDiv);
}
var hgt = zenGetWindowHeight();
var dSpace = hgt-top;
var dropDownHgt = 275;
if (dropDownHgt > dSpace) {
top = hgt - dropDownHgt;
}
var group = this._group;
if (!group) {
group = zenPage.createComponent('modalGroup');
}
this._group = group;
group.onshowGroup = 'zenPage.getComponent('+this.index+').showGroupHandler();';
group._spec = spec;
var func = new Function('group','return zenPage.getComponent('+this.index+').getPopupContent(group);');
this._applyFunction = null;
if (spec.applyFunction && 'function' == typeof spec.applyFunction) {
this._applyFunction = spec.applyFunction;
}
group.show(spec.title?spec.title:(this.popupLabel?this.popupLabel:$$$Text('Search','%Utility')),'callback',func,top,left);
}

self._ZEN_Component_lookup_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_lookup__Loader = function() {
	zenLoadClass('_ZEN_Component_control');
	_ZEN_Component_lookup.prototype = zenCreate('_ZEN_Component_control',-1);
	var p = _ZEN_Component_lookup.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_lookup;
	p.superClass = ('undefined' == typeof _ZEN_Component_control) ? zenMaster._ZEN_Component_control.prototype:_ZEN_Component_control.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.lookup';
	p._type = 'lookup';
	p.serialize = _ZEN_Component_lookup_serialize;
	p.getSettings = _ZEN_Component_lookup_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_lookup_ReallyRefreshContents;
	p.adjustSize = _ZEN_Component_lookup_adjustSize;
	p.applyFilter = _ZEN_Component_lookup_applyFilter;
	p.applyValue = _ZEN_Component_lookup_applyValue;
	p.filterKeyDown = _ZEN_Component_lookup_filterKeyDown;
	p.filterKeyUp = _ZEN_Component_lookup_filterKeyUp;
	p.focus = _ZEN_Component_lookup_focus;
	p.getLookupTableHTML = _ZEN_Component_lookup_getLookupTableHTML;
	p.getPopupContent = _ZEN_Component_lookup_getPopupContent;
	p.getProperty = _ZEN_Component_lookup_getProperty;
	p.getSearchDiv = _ZEN_Component_lookup_getSearchDiv;
	p.renderContents = _ZEN_Component_lookup_renderContents;
	p.selectPopupItem = _ZEN_Component_lookup_selectPopupItem;
	p.selectorClick = _ZEN_Component_lookup_selectorClick;
	p.selectorKeyDown = _ZEN_Component_lookup_selectorKeyDown;
	p.setProperty = _ZEN_Component_lookup_setProperty;
	p.showGroupHandler = _ZEN_Component_lookup_showGroupHandler;
	p.showPopup = _ZEN_Component_lookup_showPopup;
}

self._zenClassIdx['radioButton'] = '_ZEN_Component_radioButton';
self._ZEN_Component_radioButton = function(index,id) {
	if (index>=0) {_ZEN_Component_radioButton__init(this,index,id);}
}

self._ZEN_Component_radioButton__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_control__init) ?zenMaster._ZEN_Component_control__init(o,index,id):_ZEN_Component_control__init(o,index,id);
	o.caption = '';
	o.captionClass = 'radioButtonCaption';
	o.controlClass = 'radio';
	o.optionValue = '';
}
function _ZEN_Component_radioButton_serialize(set,s)
{
	var o = this;s[0]='3395787608';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.caption;s[9]=o.captionClass;s[10]=o.clientType;s[11]=o.containerStyle;s[12]=o.controlClass;s[13]=o.controlStyle;s[14]=o.dataBinding;s[15]=(o.disabled?1:0);s[16]=(o.dragEnabled?1:0);s[17]=(o.dropEnabled?1:0);s[18]=(o.dynamic?1:0);s[19]=o.enclosingClass;s[20]=o.enclosingStyle;s[21]=o.error;s[22]=o.height;s[23]=(o.hidden?1:0);s[24]=o.hint;s[25]=o.hintClass;s[26]=o.hintStyle;s[27]=(o.invalid?1:0);s[28]=o.invalidMessage;s[29]=o.label;s[30]=o.labelClass;s[31]=o.labelDisabledClass;s[32]=o.labelStyle;s[33]=o.onafterdrag;s[34]=o.onbeforedrag;s[35]=o.onblur;s[36]=o.onchange;s[37]=o.onclick;s[38]=o.ondblclick;s[39]=o.ondrag;s[40]=o.ondrop;s[41]=o.onfocus;s[42]=o.onhide;s[43]=o.onkeydown;s[44]=o.onkeypress;s[45]=o.onkeyup;s[46]=o.onmousedown;s[47]=o.onmouseout;s[48]=o.onmouseover;s[49]=o.onmouseup;s[50]=o.onrefresh;s[51]=o.onshow;s[52]=o.onsubmit;s[53]=o.ontouchend;s[54]=o.ontouchmove;s[55]=o.ontouchstart;s[56]=o.onupdate;s[57]=o.onvalidate;s[58]=o.optionValue;s[59]=o.originalValue;s[60]=o.overlayMode;s[61]=(o.readOnly?1:0);s[62]=o.renderFlag;s[63]=(o.required?1:0);s[64]=o.requiredMessage;s[65]=(o.showLabel?1:0);s[66]=o.slice;s[67]=o.tabIndex;s[68]=o.title;s[69]=o.tuple;s[70]=o.valign;s[71]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[72]=(o.visible?1:0);s[73]=o.width;
}
function _ZEN_Component_radioButton_getSettings(s)
{
	s['name'] = 'string';
	s['caption'] = 'caption';
	s['captionClass'] = 'cssClass';
	s['optionValue'] = 'value';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_radioButton_clickButton = function() {
if (this.disabled) return false;
if (this.readOnly) return false;
var btn = this.findElement('control');
zenASSERT(btn,'Unable to find radio element',arguments);
var changed = false;
if (btn.checked) {
for (var n in _zenIndex) {
if (_zenIndex[n] && _zenIndex[n].name == this.name && _zenIndex[n]._type == this._type) {
_zenIndex[n].value = this.optionValue;
var hidden = _zenIndex[n].findElement('hidden');
if (hidden) {
if (hidden.value != this.optionValue) {
changed = true;
hidden.value = this.optionValue;
}
}
}
}
}
zenInvokeCallbackMethod(this.onclick,this,'onclick');
if (changed) {
this.onchangeHandler();
}
return true;
}

self._ZEN_Component_radioButton_clickCaption = function() {
if (this.disabled) return;
if (this.readOnly) return;
var rb = this.findElement('control');
zenASSERT(rb,'Unable to find radioButton element',arguments);
if (rb.checked) return;
rb.checked = true;
this.clickButton();
}

self._ZEN_Component_radioButton_getProperty = function(property,key) {
var el = this.findElement('hidden');
switch(property) {
case 'value':
if (el) {
this.value = el.value;
}
return this.normalizeValue(this.value);
}
return this.invokeSuper('getProperty',arguments);
}

self._ZEN_Component_radioButton_onSerialize = function() {
return;
}

self._ZEN_Component_radioButton_setProperty = function(property,value,value2) {
switch(property) {
case 'readOnly':
case 'disabled':
value = (value) ? true : false;
if (this[property] != value) {
this[property] = value;
var rb = this.findElement('control');
if (rb) {rb.disabled = (this.disabled||this.readOnly); }
var caption = this.findElement('caption');
if (caption) {caption.className = this.disabled ? 'radioButtonCaptionDisabled' : this.captionClass; }
}
break;
case 'optionValue':
this.optionValue = value;
var rb = this.findElement('control');
rb.value = value;
rb.checked = (this.optionValue == this.value);
break;
case 'value':
for (var n in _zenIndex) {
if (_zenIndex[n] && _zenIndex[n].name == this.name && _zenIndex[n]._type == this._type) {
_zenIndex[n].value = value;
var rb = _zenIndex[n].findElement('control');
var hidden = _zenIndex[n].findElement('hidden');
if (hidden) {
hidden.value = value;
}
rb.checked = (_zenIndex[n].optionValue == value);
}
}
break;
case 'caption':
var caption = this.findElement('caption');
this.caption = value;
caption.innerHTML = zenEscapeHTMLSafe(value);
break;
case 'captionClass':
var caption = this.findElement('caption');
this.captionClass = value;
if (caption && !this.disabled) {
caption.className = value;
}
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_radioButton_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_radioButton__Loader = function() {
	zenLoadClass('_ZEN_Component_control');
	_ZEN_Component_radioButton.prototype = zenCreate('_ZEN_Component_control',-1);
	var p = _ZEN_Component_radioButton.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_radioButton;
	p.superClass = ('undefined' == typeof _ZEN_Component_control) ? zenMaster._ZEN_Component_control.prototype:_ZEN_Component_control.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.radioButton';
	p._type = 'radioButton';
	p.serialize = _ZEN_Component_radioButton_serialize;
	p.getSettings = _ZEN_Component_radioButton_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_radioButton_ReallyRefreshContents;
	p.clickButton = _ZEN_Component_radioButton_clickButton;
	p.clickCaption = _ZEN_Component_radioButton_clickCaption;
	p.getProperty = _ZEN_Component_radioButton_getProperty;
	p.onSerialize = _ZEN_Component_radioButton_onSerialize;
	p.setProperty = _ZEN_Component_radioButton_setProperty;
}

self._zenClassIdx['text'] = '_ZEN_Component_text';
self._ZEN_Component_text = function(index,id) {
	if (index>=0) {_ZEN_Component_text__init(this,index,id);}
}

self._ZEN_Component_text__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_control__init) ?zenMaster._ZEN_Component_control__init(o,index,id):_ZEN_Component_control__init(o,index,id);
	o.autocomplete = 'on';
	o.controlClass = 'text';
	o.inputtype = 'text';
	o.maxlength = '';
	o.placeholder = '';
	o.size = '';
	o.spellcheck = true;
}
function _ZEN_Component_text_serialize(set,s)
{
	var o = this;s[0]='983448644';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.autocomplete;s[8]=o.aux;s[9]=o.clientType;s[10]=o.containerStyle;s[11]=o.controlClass;s[12]=o.controlStyle;s[13]=o.dataBinding;s[14]=(o.disabled?1:0);s[15]=(o.dragEnabled?1:0);s[16]=(o.dropEnabled?1:0);s[17]=(o.dynamic?1:0);s[18]=o.enclosingClass;s[19]=o.enclosingStyle;s[20]=o.error;s[21]=o.height;s[22]=(o.hidden?1:0);s[23]=o.hint;s[24]=o.hintClass;s[25]=o.hintStyle;s[26]=o.inputtype;s[27]=(o.invalid?1:0);s[28]=o.invalidMessage;s[29]=o.label;s[30]=o.labelClass;s[31]=o.labelDisabledClass;s[32]=o.labelStyle;s[33]=o.maxlength;s[34]=o.onafterdrag;s[35]=o.onbeforedrag;s[36]=o.onblur;s[37]=o.onchange;s[38]=o.onclick;s[39]=o.ondblclick;s[40]=o.ondrag;s[41]=o.ondrop;s[42]=o.onfocus;s[43]=o.onhide;s[44]=o.onkeydown;s[45]=o.onkeypress;s[46]=o.onkeyup;s[47]=o.onmousedown;s[48]=o.onmouseout;s[49]=o.onmouseover;s[50]=o.onmouseup;s[51]=o.onrefresh;s[52]=o.onshow;s[53]=o.onsubmit;s[54]=o.ontouchend;s[55]=o.ontouchmove;s[56]=o.ontouchstart;s[57]=o.onupdate;s[58]=o.onvalidate;s[59]=o.originalValue;s[60]=o.overlayMode;s[61]=o.placeholder;s[62]=(o.readOnly?1:0);s[63]=o.renderFlag;s[64]=(o.required?1:0);s[65]=o.requiredMessage;s[66]=(o.showLabel?1:0);s[67]=o.size;s[68]=o.slice;s[69]=(o.spellcheck?1:0);s[70]=o.tabIndex;s[71]=o.title;s[72]=o.tuple;s[73]=o.valign;s[74]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[75]=(o.visible?1:0);s[76]=o.width;
}
function _ZEN_Component_text_getSettings(s)
{
	s['name'] = 'string';
	s['autocomplete'] = 'string';
	s['inputtype'] = 'enum:text,email,tel,password,url,search';
	s['maxlength'] = 'integer';
	s['placeholder'] = 'caption';
	s['size'] = 'integer';
	s['spellcheck'] = 'boolean';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_text_setProperty = function(property,value,value2) {
var el = this.findElement('control');
switch(property) {
case 'size':
this.size = value;
if (el) { el.size = value; }
break;
case 'maxlength':
this.maxlength = value;
if (el) { el.maxlength = value; }
break;
case 'inputtype':
case 'placeholder':
case 'spellcheck':
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_text_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_text__Loader = function() {
	zenLoadClass('_ZEN_Component_control');
	_ZEN_Component_text.prototype = zenCreate('_ZEN_Component_control',-1);
	var p = _ZEN_Component_text.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_text;
	p.superClass = ('undefined' == typeof _ZEN_Component_control) ? zenMaster._ZEN_Component_control.prototype:_ZEN_Component_control.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.text';
	p._type = 'text';
	p.serialize = _ZEN_Component_text_serialize;
	p.getSettings = _ZEN_Component_text_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_text_ReallyRefreshContents;
	p.setProperty = _ZEN_Component_text_setProperty;
}

self._zenClassIdx['textarea'] = '_ZEN_Component_textarea';
self._ZEN_Component_textarea = function(index,id) {
	if (index>=0) {_ZEN_Component_textarea__init(this,index,id);}
}

self._ZEN_Component_textarea__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_control__init) ?zenMaster._ZEN_Component_control__init(o,index,id):_ZEN_Component_control__init(o,index,id);
	o.cols = '';
	o.controlClass = 'textarea';
	o.modFlag = false;
	o.rows = '';
	o.spellcheck = true;
}
function _ZEN_Component_textarea_serialize(set,s)
{
	var o = this;s[0]='3301753478';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.clientType;s[9]=o.cols;s[10]=o.containerStyle;s[11]=o.controlClass;s[12]=o.controlStyle;s[13]=o.dataBinding;s[14]=(o.disabled?1:0);s[15]=(o.dragEnabled?1:0);s[16]=(o.dropEnabled?1:0);s[17]=(o.dynamic?1:0);s[18]=o.enclosingClass;s[19]=o.enclosingStyle;s[20]=o.error;s[21]=o.height;s[22]=(o.hidden?1:0);s[23]=o.hint;s[24]=o.hintClass;s[25]=o.hintStyle;s[26]=(o.invalid?1:0);s[27]=o.invalidMessage;s[28]=o.label;s[29]=o.labelClass;s[30]=o.labelDisabledClass;s[31]=o.labelStyle;s[32]=(o.modFlag?1:0);s[33]=o.onafterdrag;s[34]=o.onbeforedrag;s[35]=o.onblur;s[36]=o.onchange;s[37]=o.onclick;s[38]=o.ondblclick;s[39]=o.ondrag;s[40]=o.ondrop;s[41]=o.onfocus;s[42]=o.onhide;s[43]=o.onkeydown;s[44]=o.onkeypress;s[45]=o.onkeyup;s[46]=o.onmousedown;s[47]=o.onmouseout;s[48]=o.onmouseover;s[49]=o.onmouseup;s[50]=o.onrefresh;s[51]=o.onshow;s[52]=o.onsubmit;s[53]=o.ontouchend;s[54]=o.ontouchmove;s[55]=o.ontouchstart;s[56]=o.onupdate;s[57]=o.onvalidate;s[58]=o.originalValue;s[59]=o.overlayMode;s[60]=(o.readOnly?1:0);s[61]=o.renderFlag;s[62]=(o.required?1:0);s[63]=o.requiredMessage;s[64]=o.rows;s[65]=(o.showLabel?1:0);s[66]=o.slice;s[67]=(o.spellcheck?1:0);s[68]=o.tabIndex;s[69]=o.title;s[70]=o.tuple;s[71]=o.valign;s[72]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[73]=(o.visible?1:0);s[74]=o.width;
}
function _ZEN_Component_textarea_getSettings(s)
{
	s['name'] = 'string';
	s['cols'] = 'integer';
	s['modFlag'] = 'boolean';
	s['rows'] = 'integer';
	s['spellcheck'] = 'boolean';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_textarea_isModified = function() {
return (''==this.originalValue) ? this.modFlag : (this.originalValue != this.value);
}

self._ZEN_Component_textarea_onchangeHandler = function() {
this.modFlag = true;
return this.invokeSuper('onchangeHandler',arguments);
}

self._ZEN_Component_textarea_onloadHandler = function() {
var el = this.findElement('control');
if (el) {
el.value = this.value;
}
}

self._ZEN_Component_textarea_setProperty = function(property,value,value2) {
var el = this.findElement('control');
switch(property) {
case 'originalValue':
this.modFlag = false;
if ('string'==typeof this.value && this.value.length < 50) {
this.originalValue = this.value;
}
else {
this.originalValue = '';
}
break;
case 'rows':
this.rows = value;
if (el) { el.rows = value; }
break;
case 'cols':
this.cols = value;
if (el) { el.cols = value; }
break;
case 'spellcheck':
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_textarea_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_textarea__Loader = function() {
	zenLoadClass('_ZEN_Component_control');
	_ZEN_Component_textarea.prototype = zenCreate('_ZEN_Component_control',-1);
	var p = _ZEN_Component_textarea.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_textarea;
	p.superClass = ('undefined' == typeof _ZEN_Component_control) ? zenMaster._ZEN_Component_control.prototype:_ZEN_Component_control.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.textarea';
	p._type = 'textarea';
	p.serialize = _ZEN_Component_textarea_serialize;
	p.getSettings = _ZEN_Component_textarea_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_textarea_ReallyRefreshContents;
	p.isModified = _ZEN_Component_textarea_isModified;
	p.onchangeHandler = _ZEN_Component_textarea_onchangeHandler;
	p.onloadHandler = _ZEN_Component_textarea_onloadHandler;
	p.setProperty = _ZEN_Component_textarea_setProperty;
}

self._zenClassIdx['abstractComboBox'] = '_ZEN_Component_abstractComboBox';
self._ZEN_Component_abstractComboBox = function(index,id) {
	if (index>=0) {_ZEN_Component_abstractComboBox__init(this,index,id);}
}

self._ZEN_Component_abstractComboBox__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_text__init) ?zenMaster._ZEN_Component_text__init(o,index,id):_ZEN_Component_text__init(o,index,id);
	o.buttonCaption = '';
	o.buttonImage = 'images\/combobox.png';
	o.buttonImageDown = 'images\/comboboxpress.png';
	o.buttonTitle = '';
	o.comboType = 'image';
	o.controlClass = 'comboboxInput';
	o.delay = '250';
	o.dropdownHeight = '';
	o.dropdownWidth = '';
	o.editable = false;
	o.hzScroll = false;
	o.isDropdownVisible = false;
	o.scrollIntoView = true;
	o.selectedIndex = '-1';
	o.text = '';
	o.unrestricted = false;
}
function _ZEN_Component_abstractComboBox_serialize(set,s)
{
	var o = this;s[0]='1206993897';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.autocomplete;s[8]=o.aux;s[9]=o.buttonCaption;s[10]=o.buttonImage;s[11]=o.buttonImageDown;s[12]=o.buttonTitle;s[13]=o.clientType;s[14]=o.comboType;s[15]=o.containerStyle;s[16]=o.controlClass;s[17]=o.controlStyle;s[18]=o.dataBinding;s[19]=o.delay;s[20]=(o.disabled?1:0);s[21]=(o.dragEnabled?1:0);s[22]=(o.dropEnabled?1:0);s[23]=o.dropdownHeight;s[24]=o.dropdownWidth;s[25]=(o.dynamic?1:0);s[26]=(o.editable?1:0);s[27]=o.enclosingClass;s[28]=o.enclosingStyle;s[29]=o.error;s[30]=o.height;s[31]=(o.hidden?1:0);s[32]=o.hint;s[33]=o.hintClass;s[34]=o.hintStyle;s[35]=(o.hzScroll?1:0);s[36]=o.inputtype;s[37]=(o.invalid?1:0);s[38]=o.invalidMessage;s[39]=(o.isDropdownVisible?1:0);s[40]=o.label;s[41]=o.labelClass;s[42]=o.labelDisabledClass;s[43]=o.labelStyle;s[44]=o.maxlength;s[45]=o.onafterdrag;s[46]=o.onbeforedrag;s[47]=o.onblur;s[48]=o.onchange;s[49]=o.onclick;s[50]=o.ondblclick;s[51]=o.ondrag;s[52]=o.ondrop;s[53]=o.onfocus;s[54]=o.onhide;s[55]=o.onkeydown;s[56]=o.onkeypress;s[57]=o.onkeyup;s[58]=o.onmousedown;s[59]=o.onmouseout;s[60]=o.onmouseover;s[61]=o.onmouseup;s[62]=o.onrefresh;s[63]=o.onshow;s[64]=o.onsubmit;s[65]=o.ontouchend;s[66]=o.ontouchmove;s[67]=o.ontouchstart;s[68]=o.onupdate;s[69]=o.onvalidate;s[70]=o.originalValue;s[71]=o.overlayMode;s[72]=o.placeholder;s[73]=(o.readOnly?1:0);s[74]=o.renderFlag;s[75]=(o.required?1:0);s[76]=o.requiredMessage;s[77]=(o.scrollIntoView?1:0);s[78]=o.selectedIndex;s[79]=(o.showLabel?1:0);s[80]=o.size;s[81]=o.slice;s[82]=(o.spellcheck?1:0);s[83]=o.tabIndex;s[84]=o.text;s[85]=o.title;s[86]=o.tuple;s[87]=(o.unrestricted?1:0);s[88]=o.valign;s[89]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[90]=(o.visible?1:0);s[91]=o.width;
}
function _ZEN_Component_abstractComboBox_getSettings(s)
{
	s['name'] = 'string';
	s['buttonCaption'] = 'caption';
	s['buttonImage'] = 'uri';
	s['buttonImageDown'] = 'uri';
	s['buttonTitle'] = 'caption';
	s['comboType'] = 'enum:image,button,timer';
	s['delay'] = 'integer';
	s['dropdownHeight'] = 'length';
	s['dropdownWidth'] = 'length';
	s['editable'] = 'boolean';
	s['hzScroll'] = 'boolean';
	s['isDropdownVisible'] = 'boolean';
	s['scrollIntoView'] = 'boolean';
	s['selectedIndex'] = 'integer';
	s['text'] = 'string';
	s['unrestricted'] = 'boolean';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_abstractComboBox_adjustDropdownPosition = function() {
var div = this.getDropDownDiv();
zenASSERT(div,'Unable to find dropdown div',arguments);
var input = this.findElement('input');
zenASSERT(input,'Unable to find input element',arguments);
var iHgt = input.offsetHeight;
var wScrollTop = zenGetPageScrollTop();
var top,right;
var obj = zenGetPageOffsets(input);
if (div.nativeHeight) div.style.height=div.nativeHeight+"px";
var dHgt = div.offsetHeight;
var hgt = zenGetWindowHeight();
var uSpace = obj.top - wScrollTop;
var dSpace = hgt-uSpace-iHgt-2;
if (dHgt>dSpace) { // dropdown won't fit as is
if (dSpace>uSpace) { // beneath is best option but must shorten menu
if (!div.nativeHeight) div.nativeHeight = dHgt;
div.style.height = (dSpace - 2) + "px";
top = obj.top+iHgt;
}
else { // open dropdown upwards
if (dHgt>uSpace) {
if (!div.nativeHeight) div.nativeHeight = dHgt;
div.style.height=(uSpace-2)+"px";
}
top = obj.top-div.offsetHeight;
}
}
else {  // Dropdown is fine where it is but need to be in page coordinates
top = obj.top+iHgt;
}
div.style.top = top + "px";
div.style.left = obj.left + "px";
}

self._ZEN_Component_abstractComboBox_clearTimer = function() {
if ("timer" == this.comboType) {
if (this.actionTimerId) {
self.clearTimeout(this.actionTimerId);
this.actionTimerId = null;
}
}
}

self._ZEN_Component_abstractComboBox_comboboxButtonDown = function(evt) {
evt = evt ? evt : window.event;
if (evt.preventDefault) {
evt.preventDefault();
}
if (!this.disabled && !this.readOnly) {
var btn = this.findElement('btn');
if (btn) {
btn.src = this.buttonImageDown;
}
this.buttonIsDown = true;
}
}

self._ZEN_Component_abstractComboBox_comboboxButtonUp = function() {
if (!this.disabled && !this.readOnly && this.buttonIsDown) {
var btn = this.findElement('btn');
if (btn) {
btn.src = this.buttonImage;
}
}
}

self._ZEN_Component_abstractComboBox_comboboxMouseOut = function() {
if (!this.disabled && !this.readOnly && this.buttonIsDown) {
var btn = this.findElement('btn');
if (btn) {
btn.src = this.buttonImage;
}
}
}

self._ZEN_Component_abstractComboBox_comboboxMouseOver = function() {
if (!this.disabled && !this.readOnly && this.buttonIsDown) {
var btn = this.findElement('btn');
if (btn) {
btn.src = this.buttonImageDown;
}
}
}

self._ZEN_Component_abstractComboBox_dragStartHandler = function(dragData) {
if (!this.getDragData(dragData) || (''==this.text)) {
return false;
}
ZLM.setDragCaption(this.text);
return true;
}

self._ZEN_Component_abstractComboBox_findDisplayValue = function(value) {
if ('' === value) {
return '';
}
var text = null;
var count = this.getOptionCount();
for (var idx = 0; idx < count; idx++) {
if (value == this.getOptionValue(idx)) {
text = this.getOptionText(idx);
break;
}
}
return text;
}

self._ZEN_Component_abstractComboBox_findSelectedItem = function(force) {
force = ('undefined'!=force)?force:false;
if ((force||this.isDropdownVisible) && this.value != '') {
var count = this.getOptionCount();
for (var idx = 0; idx < count; idx++) {
if (this.value == this.getOptionValue(idx)) {
this.selectItem(idx,true,false);
break;
}
}
}
}

self._ZEN_Component_abstractComboBox_focus = function() {
zenFocus(this.findElement('input'));
}

self._ZEN_Component_abstractComboBox_getCacheDiv = function() {
return this.findElement('cache');
}

self._ZEN_Component_abstractComboBox_getDropDownDiv = function() {
return self.document.getElementById('zenModalDiv');
}

self._ZEN_Component_abstractComboBox_getItemEl = function(idx) {
return this.findElement('item_' + idx);
}

self._ZEN_Component_abstractComboBox_getOptionCount = function() {
return 0;
}

self._ZEN_Component_abstractComboBox_getOptionText = function(idx) {
return '';
}

self._ZEN_Component_abstractComboBox_getOptionValue = function(idx) {
return '';
}

self._ZEN_Component_abstractComboBox_inputBlurHandler = function(evt) {
evt = evt ? evt : window.event;
this.clearTimer();
if (this.isDropdownVisible && (!this.mouseDown)) {
var div = this.getDropDownDiv();
if (div && (div.style.display != 'none')) {
zenPage.endModal();
}
else {
this.isDropDownVisible = false;
}
}
zenInvokeCallbackMethod(this.onblur,this,'onblur');
return true;
}

self._ZEN_Component_abstractComboBox_inputChangeHandler = function() {
if (this.unrestricted) {
if (this.editable) {
var hidden = this.findElement('hidden');
var input = this.findElement('input');
this.value = input.value;
hidden.value = input.value;
}
this.onchangeHandler();
}
}

self._ZEN_Component_abstractComboBox_inputKeyHandler = function(evt) {
evt = evt ? evt : window.event;
var idx = parseInt(this.selectedIndex,10);
if (this.isDropdownVisible) {
switch(evt.keyCode) {
case zenHOME:
this.clearTimer();
this.keyMode = true;
if (evt.preventDefault) {
evt.preventDefault();
}
this.selectItem(0,true,false);
return false;
case zenEND:
this.clearTimer();
this.keyMode = true;
if (evt.preventDefault) {
evt.preventDefault();
}
this.selectItem(this.getOptionCount()-1,true,false);
return false;
case zenUP:
this.clearTimer();
this.keyMode = true;
if (evt.preventDefault) {
evt.preventDefault();
}
if (idx > 0) {
this.selectItem(idx - 1,true,false);
}
return false;
case zenDOWN:
this.clearTimer();
this.keyMode = true;
if (evt.preventDefault) {
evt.preventDefault();
}
if (idx < (this.getOptionCount()-1)) {
this.selectItem(idx + 1,true,false);
}
return false;
case zenPAGEUP:
this.clearTimer();
this.keyMode = true;
if (evt.preventDefault) {
evt.preventDefault();
}
if (idx > 0) {
this.selectItem((idx > 10) ? idx - 10 : 0,true,false);
}
return false;
case zenPAGEDN:
this.clearTimer();
this.keyMode = true;
if (evt.preventDefault) {
evt.preventDefault();
}
var count = this.getOptionCount();
if (idx < (count-1)) {
this.selectItem((idx < count - 10) ? idx + 10 : count - 1,true,false);
}
return false;
case zenESC:
if (evt.preventDefault) {
evt.preventDefault();
}
zenPage.endModal();
return false;
case zenENTER:
this.clearTimer();
if (this.keyMode) {
zenPage.endModal();
this.selectItem(idx,false,true);
}
else {
this.renderDropdown();
}
return false;
default:
this.startTimer();
this.keyMode = null;
break;
}
}
else {
switch(evt.keyCode) {
case zenDOWN:
case zenENTER:
this.clearTimer();
this.keyMode = true;
this.showDropdown();
return false;
default:
this.startTimer();
break;
}
}
return zenInvokeCallbackMethod(this.onkeydown,this,'onkeydown');
}

self._ZEN_Component_abstractComboBox_itemMouseDown = function(evt,idx) {
evt = evt ? evt : window.event;
if (evt.preventDefault) {
evt.preventDefault();
}
this.mouseDown = true;
}

self._ZEN_Component_abstractComboBox_itemMouseUp = function(evt,idx) {
evt = evt ? evt : window.event;
if (evt.preventDefault) {
evt.preventDefault();
}
zenPage.endModal();
this.selectItem(idx,false,true);
zenFocus(this.findElement('input'));
this.mouseDown = false;
}

self._ZEN_Component_abstractComboBox_onDelete = function() {
this.clearTimer();
}

self._ZEN_Component_abstractComboBox_onEndModalHandler = function(zindex) {
this.clearTimer();
var div = this.getDropDownDiv();
var cache = this.getCacheDiv();
if (cache) {
if ('' != div.innerHTML) {
cache.style.cssText='display: none;';
cache.innerHTML = div.innerHTML;
div.innerHTML = '';
this._hasCache = true;
}
else {
cache.innerHTML = '';
delete this._hasCache;
}
}
div.style.cssText = "display:none;";
div.className = "";
div.mousedown = null;
div.mouseup = null;
this.isDropdownVisible = false;
this.keyMode = null;
zenFocus(this.findElement('input'));
}

self._ZEN_Component_abstractComboBox_onStartModalHandler = function(zindex) {
var div = this.getDropDownDiv();
zenASSERT(div,'Unable to find dropdown div',arguments);
var input = this.findElement('input');
zenASSERT(input,'Unable to find input element',arguments);
div.onmousedown = new Function("event","zenPage.getComponent("+this.index+").mouseDown=true;");
div.onmouseup = new Function("event","zenPage.getComponent("+this.index+").mouseDown=null;");
div.className = 'comboboxDropDown';
if (!this.hzScroll) {
div.style.overflowX = 'hidden';
}
if (zenIsHTML5 && (this.dropdownHeight == (''+parseFloat(this.dropdownHeight)))) this.dropdownHeight += 'px';
div.style.height = this.dropdownHeight;
if ('' == this.dropdownWidth) {
var enc = this.getEnclosingDiv();
div.style.width = enc.offsetWidth + 'px';
}
else {
if (zenIsHTML5 && (this.dropdownWidth == (''+parseFloat(this.dropdownWidth)))) this.dropdownWidth += 'px';
div.style.width = this.dropdownWidth;
}
div.style.zIndex = zindex;
div.style.display = "";
this.adjustDropdownPosition();
this.renderDropdown();
}

self._ZEN_Component_abstractComboBox_onloadHandler = function() {
this.findSelectedItem(true);
}

self._ZEN_Component_abstractComboBox_onresizeHandler = function() {
if (this.isDropdownVisible) {
this.adjustDropdownPosition();
}
}

self._ZEN_Component_abstractComboBox_renderDropdown = function() {
var div = this.getDropDownDiv();
zenASSERT(div,'Unable to find DropDown element',arguments);
div.innerHTML = "";
}

self._ZEN_Component_abstractComboBox_selectItem = function(idx,show,update) {
var out = zenPage.getComponentById('events');
var input = this.findElement('input');
var hidden = this.findElement('hidden');
zenASSERT(input,'Unable to find input element',arguments);
zenASSERT(hidden,'Unable to find hidden element',arguments);
var value,text;
if (parseInt(this.selectedIndex,10) >= 0) {
var el = this.getItemEl(parseInt(this.selectedIndex,10));
if (el) {
el.className = 'comboboxItem';
}
}
var size = this.getOptionCount();
if (idx < 0 || idx > size) {
this.selectedIndex = -1;
value = '';
text = '';
}
else {
idx = parseInt(idx,10);
this.selectedIndex = idx;
value = this.getOptionValue(idx);
text = this.getOptionText(idx);
var el = this.getItemEl(this.selectedIndex);
if (el) {
el.className = 'comboboxItemSelected';
if (show && this.scrollIntoView) {
if (this.selectedIndex == 0) {
this.getDropDownDiv().scrollTop = 0;
}
else {
zenScrollIntoView(this.getDropDownDiv(),el,!this.hzScroll);
}
}
}
}
if (update) {
this.value = value;
this.text = text;
hidden.value = value;
input.value = text;
this.onchangeHandler();
}
}

self._ZEN_Component_abstractComboBox_setProperty = function(property,value,value2) {
var input = this.findElement('input');
var hidden = this.findElement('hidden');
var btn = this.findElement('btn');
switch(property) {
case 'value':
this.value = value;
if (hidden) { hidden.value = value; }
if (input) { input.value = ''; }
if (this.unrestricted) {
if (input) { input.value = (null==value2) ? value : value2; }
}
else {
var text = this.findDisplayValue(this.value);
if (null != text) {
if (input) { input.value = text; }
this.text = text;
}
}
break;
case 'text':
break;
case 'unrestricted':
value = (value) ? true : false;
this.unrestricted = value;
break;
case 'controlStyle':
this.controlStyle = value;
if (input) { input.style.cssText = value;	}
break;
case 'disabled':
value = (value) ? true : false;
if (input) {input.disabled = value;}
if (btn) {btn.disabled = value; }
this.disabled = value;
this.invokeSuper('setProperty',arguments);
break;
case 'readOnly':
value = (value) ? true : false;
if (input) {input.readOnly = this.editable ? value : true;}
if (btn) { btn.disabled = value; }
this.readOnly = value;
break;
case 'buttonImage':
this.buttonImage = value;
var btn = this.findElement('btn');
if (btn) { btn.src = this.buttonImage; }
break;
case 'buttonImageDown':
this.buttonImageDown = value;
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_abstractComboBox_showDropdown = function() {
if (!this.disabled && !this.readOnly) {
this.buttonIsDown = false;
zenPage.startModal(this);
this.keyMode = true;
}
}

self._ZEN_Component_abstractComboBox_startTimer = function() {
if ("timer" == this.comboType) {
this.clearTimer();
this.actionTimerId = self.setTimeout("zenPage.getComponent("+this.index+").timerHandler()",this.delay);
}
}

self._ZEN_Component_abstractComboBox_timerHandler = function() {
if (this.isDropdownVisible) {
this.renderDropdown();
}
else {
this.showDropdown();
}
}

self._ZEN_Component_abstractComboBox_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_abstractComboBox__Loader = function() {
	zenLoadClass('_ZEN_Component_text');
	_ZEN_Component_abstractComboBox.prototype = zenCreate('_ZEN_Component_text',-1);
	var p = _ZEN_Component_abstractComboBox.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_abstractComboBox;
	p.superClass = ('undefined' == typeof _ZEN_Component_text) ? zenMaster._ZEN_Component_text.prototype:_ZEN_Component_text.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.abstractComboBox';
	p._type = 'abstractComboBox';
	p.serialize = _ZEN_Component_abstractComboBox_serialize;
	p.getSettings = _ZEN_Component_abstractComboBox_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_abstractComboBox_ReallyRefreshContents;
	p.adjustDropdownPosition = _ZEN_Component_abstractComboBox_adjustDropdownPosition;
	p.clearTimer = _ZEN_Component_abstractComboBox_clearTimer;
	p.comboboxButtonDown = _ZEN_Component_abstractComboBox_comboboxButtonDown;
	p.comboboxButtonUp = _ZEN_Component_abstractComboBox_comboboxButtonUp;
	p.comboboxMouseOut = _ZEN_Component_abstractComboBox_comboboxMouseOut;
	p.comboboxMouseOver = _ZEN_Component_abstractComboBox_comboboxMouseOver;
	p.dragStartHandler = _ZEN_Component_abstractComboBox_dragStartHandler;
	p.findDisplayValue = _ZEN_Component_abstractComboBox_findDisplayValue;
	p.findSelectedItem = _ZEN_Component_abstractComboBox_findSelectedItem;
	p.focus = _ZEN_Component_abstractComboBox_focus;
	p.getCacheDiv = _ZEN_Component_abstractComboBox_getCacheDiv;
	p.getDropDownDiv = _ZEN_Component_abstractComboBox_getDropDownDiv;
	p.getItemEl = _ZEN_Component_abstractComboBox_getItemEl;
	p.getOptionCount = _ZEN_Component_abstractComboBox_getOptionCount;
	p.getOptionText = _ZEN_Component_abstractComboBox_getOptionText;
	p.getOptionValue = _ZEN_Component_abstractComboBox_getOptionValue;
	p.inputBlurHandler = _ZEN_Component_abstractComboBox_inputBlurHandler;
	p.inputChangeHandler = _ZEN_Component_abstractComboBox_inputChangeHandler;
	p.inputKeyHandler = _ZEN_Component_abstractComboBox_inputKeyHandler;
	p.itemMouseDown = _ZEN_Component_abstractComboBox_itemMouseDown;
	p.itemMouseUp = _ZEN_Component_abstractComboBox_itemMouseUp;
	p.onDelete = _ZEN_Component_abstractComboBox_onDelete;
	p.onEndModalHandler = _ZEN_Component_abstractComboBox_onEndModalHandler;
	p.onStartModalHandler = _ZEN_Component_abstractComboBox_onStartModalHandler;
	p.onloadHandler = _ZEN_Component_abstractComboBox_onloadHandler;
	p.onresizeHandler = _ZEN_Component_abstractComboBox_onresizeHandler;
	p.renderDropdown = _ZEN_Component_abstractComboBox_renderDropdown;
	p.selectItem = _ZEN_Component_abstractComboBox_selectItem;
	p.setProperty = _ZEN_Component_abstractComboBox_setProperty;
	p.showDropdown = _ZEN_Component_abstractComboBox_showDropdown;
	p.startTimer = _ZEN_Component_abstractComboBox_startTimer;
	p.timerHandler = _ZEN_Component_abstractComboBox_timerHandler;
}

self._zenClassIdx['dataListBox'] = '_ZEN_Component_dataListBox';
self._ZEN_Component_dataListBox = function(index,id) {
	if (index>=0) {_ZEN_Component_dataListBox__init(this,index,id);}
}

self._ZEN_Component_dataListBox__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_abstractListBox__init) ?zenMaster._ZEN_Component_abstractListBox__init(o,index,id):_ZEN_Component_abstractListBox__init(o,index,id);
	o.OnCreateResultSet = ''; // encrypted
	o.OnDrawItem = ''; // encrypted
	o.OnExecuteResultSet = ''; // encrypted
	o.choiceColumn = '2';
	o.columnName = '';
	o.contentType = 'text';
	o.countRows = '0';
	o.displayColumns = '';
	o.groupByClause = '';
	o.itemCount = '';
	o.maxRows = '100';
	o.multiColumn = true;
	o.orderByClause = '';
	o.parameters = new Array();
	o.queryClass = ''; // encrypted
	o.queryName = '';
	o.sql = ''; // encrypted
	o.sqlLookup = ''; // encrypted
	o.tableName = ''; // encrypted
	o.valueColumn = '1';
	o.whereClause = '';
	o.onCreate();
}
function _ZEN_Component_dataListBox_serialize(set,s)
{
	var o = this;s[0]='2500860464';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.OnCreateResultSet;s[7]=o.OnDrawItem;s[8]=o.OnExecuteResultSet;s[9]=o.align;s[10]=o.aux;s[11]=o.choiceColumn;s[12]=o.clientType;s[13]=o.columnName;s[14]=o.containerStyle;s[15]=o.contentType;s[16]=o.controlClass;s[17]=o.controlStyle;s[18]=o.countRows;s[19]=o.dataBinding;s[20]=(o.disabled?1:0);s[21]=o.displayColumns;s[22]=(o.dragEnabled?1:0);s[23]=(o.dropEnabled?1:0);s[24]=(o.dynamic?1:0);s[25]=o.enclosingClass;s[26]=o.enclosingStyle;s[27]=o.error;s[28]=o.groupByClause;s[29]=o.height;s[30]=(o.hidden?1:0);s[31]=o.hint;s[32]=o.hintClass;s[33]=o.hintStyle;s[34]=(o.hzScroll?1:0);s[35]=(o.invalid?1:0);s[36]=o.invalidMessage;s[37]=o.itemCount;s[38]=o.label;s[39]=o.labelClass;s[40]=o.labelDisabledClass;s[41]=o.labelStyle;s[42]=o.listHeight;s[43]=o.listWidth;s[44]=o.maxRows;s[45]=(o.multiColumn?1:0);s[46]=o.onafterdrag;s[47]=o.onbeforedrag;s[48]=o.onblur;s[49]=o.onchange;s[50]=o.onclick;s[51]=o.ondblclick;s[52]=o.ondrag;s[53]=o.ondrop;s[54]=o.onfocus;s[55]=o.onhide;s[56]=o.onkeydown;s[57]=o.onkeypress;s[58]=o.onkeyup;s[59]=o.onmousedown;s[60]=o.onmouseout;s[61]=o.onmouseover;s[62]=o.onmouseup;s[63]=o.onrefresh;s[64]=o.onshow;s[65]=o.onsubmit;s[66]=o.ontouchend;s[67]=o.ontouchmove;s[68]=o.ontouchstart;s[69]=o.onupdate;s[70]=o.onvalidate;s[71]=o.orderByClause;s[72]=o.originalValue;s[73]=o.overlayMode;s[74]=set.serializeList(o,o.parameters,true,'parameters');s[75]=o.queryClass;s[76]=o.queryName;s[77]=(o.readOnly?1:0);s[78]=o.renderFlag;s[79]=(o.required?1:0);s[80]=o.requiredMessage;s[81]=o.selectedIndex;s[82]=(o.showLabel?1:0);s[83]=o.slice;s[84]=o.sql;s[85]=o.sqlLookup;s[86]=o.tabIndex;s[87]=o.tableName;s[88]=o.text;s[89]=o.title;s[90]=o.tuple;s[91]=o.valign;s[92]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[93]=o.valueColumn;s[94]=(o.visible?1:0);s[95]=o.whereClause;s[96]=o.width;
}
function _ZEN_Component_dataListBox_getSettings(s)
{
	s['name'] = 'string';
	s['columnName'] = 'string';
	s['contentType'] = 'enum:text,html';
	s['countRows'] = 'integer';
	s['groupByClause'] = 'string';
	s['itemCount'] = 'integer';
	s['maxRows'] = 'integer';
	s['multiColumn'] = 'boolean';
	s['orderByClause'] = 'string';
	s['parameters'] = 'string';
	s['queryClass'] = 'className';
	s['queryName'] = 'classMember:QUERY';
	s['sql'] = 'sql';
	s['sqlLookup'] = 'sql';
	s['tableName'] = 'string';
	s['whereClause'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_dataListBox_executeQuery = function() {
this.refreshContents();
}

self._ZEN_Component_dataListBox_getOptionCount = function() {
return !zenIsMissing(this.itemCount) ? this.itemCount : 0;
}

self._ZEN_Component_dataListBox_getOptionText = function(idx) {
var value = '';
var item = self.document.getElementById('item_' + idx + '_' + this.index);
if (item) {
value = item.getAttribute('zenText');
}
return value;
}

self._ZEN_Component_dataListBox_getOptionValue = function(idx) {
var value = '';
var item = self.document.getElementById('item_' + idx + '_' + this.index);
if (item) {
value = item.getAttribute('zenValue');
}
return value;
}

self._ZEN_Component_dataListBox_setProperty = function(property,value,value2) {
switch(property) {
case 'itemCount':
this.itemCount = value;
break;
case 'parameters':
if ('' != value) {
value = value - 1;
if (this.parameters[value]) {
if (this.parameters[value].value != value2) {
this.parameters[value].value = value2;
this.executeQuery();
}
}
}
break;
default:
return this.invokeSuper('setProperty',arguments);
break;
}
return true;
}

self._ZEN_Component_dataListBox_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_dataListBox__Loader = function() {
	zenLoadClass('_ZEN_Component_abstractListBox');
	_ZEN_Component_dataListBox.prototype = zenCreate('_ZEN_Component_abstractListBox',-1);
	var p = _ZEN_Component_dataListBox.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_dataListBox;
	p.superClass = ('undefined' == typeof _ZEN_Component_abstractListBox) ? zenMaster._ZEN_Component_abstractListBox.prototype:_ZEN_Component_abstractListBox.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.dataListBox';
	p._type = 'dataListBox';
	p.serialize = _ZEN_Component_dataListBox_serialize;
	p.getSettings = _ZEN_Component_dataListBox_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_dataListBox_ReallyRefreshContents;
	p.executeQuery = _ZEN_Component_dataListBox_executeQuery;
	p.getOptionCount = _ZEN_Component_dataListBox_getOptionCount;
	p.getOptionText = _ZEN_Component_dataListBox_getOptionText;
	p.getOptionValue = _ZEN_Component_dataListBox_getOptionValue;
	p.setProperty = _ZEN_Component_dataListBox_setProperty;
}

self._zenClassIdx['form'] = '_ZEN_Component_form';
self._ZEN_Component_form = function(index,id) {
	if (index>=0) {_ZEN_Component_form__init(this,index,id);}
}

self._ZEN_Component_form__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_group__init) ?zenMaster._ZEN_Component_group__init(o,index,id):_ZEN_Component_group__init(o,index,id);
	o.OnLoadForm = ''; // encrypted
	o.OnSubmitForm = ''; // encrypted
	o.action = '';
	o.autoValidate = true;
	o.autocomplete = true;
	o.controller = '';
	o.controllerId = '';
	o.enctype = '';
	o.groupClass = 'form';
	o.groupStyle = 'padding: 5px;';
	o.invalidMessage = 'This form contains invalid values. Please correct the following field(s) and try again.';
	o.key = '';
	o.messageTargetId = '';
	o.method = '';
	o.nextPage = '';
	o.noModelMessage = '';
	o.onchange = '';
	o.ondefault = '';
	o.ongetcontroller = '';
	o.oninvalid = '';
	o.onnotifyView = '';
	o.onreset = '';
	o.onsubmit = '';
	o.onvalidate = '';
	o.propagateChanges = false;
	o.readOnlyMessage = 'This data is read only.';
	o.target = '';
}
function _ZEN_Component_form_serialize(set,s)
{
	var o = this;s[0]='1397618957';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.OnLoadForm;s[7]=o.OnSubmitForm;s[8]=o.action;s[9]=o.align;s[10]=(o.autoValidate?1:0);s[11]=(o.autocomplete?1:0);s[12]=o.aux;s[13]=o.cellAlign;s[14]=o.cellSize;s[15]=o.cellStyle;s[16]=o.cellVAlign;s[17]=set.serializeList(o,o.children,true,'children');s[18]=o.containerStyle;s[19]=o.controller;s[20]=o.controllerId;s[21]=(o.disabled?1:0);s[22]=(o.dragEnabled?1:0);s[23]=(o.dropEnabled?1:0);s[24]=(o.dynamic?1:0);s[25]=o.enclosingClass;s[26]=o.enclosingStyle;s[27]=o.enctype;s[28]=o.error;s[29]=o.groupClass;s[30]=o.groupStyle;s[31]=o.height;s[32]=(o.hidden?1:0);s[33]=o.hint;s[34]=o.hintClass;s[35]=o.hintStyle;s[36]=o.invalidMessage;s[37]=o.key;s[38]=o.label;s[39]=o.labelClass;s[40]=o.labelDisabledClass;s[41]=o.labelPosition;s[42]=o.labelStyle;s[43]=o.layout;s[44]=o.messageTargetId;s[45]=o.method;s[46]=o.nextPage;s[47]=o.noModelMessage;s[48]=o.onafterdrag;s[49]=o.onbeforedrag;s[50]=o.onchange;s[51]=o.onclick;s[52]=o.ondefault;s[53]=o.ondrag;s[54]=o.ondrop;s[55]=o.ongetcontroller;s[56]=o.onhide;s[57]=o.oninvalid;s[58]=o.onnotifyView;s[59]=o.onrefresh;s[60]=o.onreset;s[61]=o.onshow;s[62]=o.onsubmit;s[63]=o.onupdate;s[64]=o.onvalidate;s[65]=o.overlayMode;s[66]=(o.propagateChanges?1:0);s[67]=o.readOnlyMessage;s[68]=o.renderFlag;s[69]=(o.showLabel?1:0);s[70]=o.slice;s[71]=o.target;s[72]=o.title;s[73]=o.tuple;s[74]=o.valign;s[75]=(o.visible?1:0);s[76]=o.width;
}
function _ZEN_Component_form_getSettings(s)
{
	s['name'] = 'string';
	s['action'] = 'uri';
	s['autoValidate'] = 'boolean';
	s['autocomplete'] = 'boolean';
	s['controllerId'] = 'id';
	s['enctype'] = 'string';
	s['invalidMessage'] = 'caption';
	s['key'] = 'string';
	s['messageTargetId'] = 'id';
	s['method'] = 'enum:post,get';
	s['nextPage'] = 'uri';
	s['noModelMessage'] = 'caption';
	s['onchange'] = 'eventHandler';
	s['ondefault'] = 'eventHandler';
	s['ongetcontroller'] = 'eventHandler';
	s['oninvalid'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	s['onreset'] = 'eventHandler';
	s['onsubmit'] = 'eventHandler';
	s['onvalidate'] = 'eventHandler';
	s['propagateChanges'] = 'boolean';
	s['readOnlyMessage'] = 'caption';
	s['target'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_form_bindValues = function(dataBinding,clear) {
if (this._propagatingChanges==1) return;
var controller = this.getController();
if (controller) {
if (!controller.hasData()) {
this.showMessage(this.noModelMessage);
}
else {
this.showMessage('');
}
var controls = this.getControlList();
for (var n = 0; n < controls.length; n++) {
var ctrl = controls[n];
if (ctrl) {
ctrl.setProperty('invalid',false);
}
if (ctrl && !zenIsMissing(ctrl.dataBinding) && (null==dataBinding || dataBinding==ctrl.dataBinding)) {
var data = controller.getDataByName(ctrl.dataBinding);
if (ctrl.onDataModelChange) {
ctrl.onDataModelChange(controller.modelClass,controller.modelId);
}
if ((clear||ctrl.clearOnLoad) && ctrl.clearCache) {
ctrl.clearCache();
}
if (null==data) {
if ('%id' != ctrl.dataBinding) {
ctrl.setProperty('disabled',true);
}
this._propagatingChanges = 1;
ctrl.setValue('');
this._propagatingChanges = 0;
}
else {
ctrl.setProperty('disabled',false);
var text = '';
if (!zenIsMissing(ctrl.displayBinding)) {
var text = controller.getDataByName(ctrl.displayBinding);
text = text==null ? '' : text;
this._propagatingChanges = 1;
ctrl.setValue(data,text);
this._propagatingChanges = 0;
} else {
this._propagatingChanges = 1;
ctrl.setValue(data);
this._propagatingChanges = 0;
}
}
}
}
}
else {
this.showMessage('');
}
}

self._ZEN_Component_form_clearModified = function(reset) {
var controls = this.getControlList();
for (var n = 0; n < controls.length; n++) {
var child = controls[n];
child.setProperty('originalValue','');
if (reset) {
child.setProperty('value','');
this.controlChangeHandler(child,false);
}
}
zenInvokeCallbackMethod(this.onchange,this,'onchange','control',null);
}

self._ZEN_Component_form_connectToController = function() {
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

self._ZEN_Component_form_controlChangeHandler = function(control,fire) {
if ('undefined' == typeof fire || fire) {
zenInvokeCallbackMethod(this.onchange,this,'onchange','control',control);
}
var controller = this.getController();
if (controller && '' != control.dataBinding) {
this.sendEventToController('propertyChange',control.dataBinding,control.value);
}
}

self._ZEN_Component_form_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._ZEN_Component_form_getControlList = function(sortBy) {
var controlList = (null != sortBy) ? new Object() : new Array();
var done = false;
var parent = new Array();
var cno = new Array();
var level = 0;
parent[0] = this;
cno[0] = 0;
do {
var child = parent[level].children[cno[level]];
if (child) {
if (child.isOfType('control')) {
switch (sortBy) {
case 'name':
if (null != child.name && '' != child.name) {
controlList[child.name] = child;
}
break;
case 'id':
if (null != child.id && '' != child.id) {
controlList[child.id] = child;
}
break;
default:
controlList[controlList.length] = child;
break;
}
}
else if (child.isOfType('group') && (child.children.length > 0)) {
level++;
parent[level] = child;
cno[level] = 0;
continue;
}
}
var found = false;
while (!found) {
cno[level]++;
if (cno[level] < parent[level].children.length) {
found = true;
}
else if (level > 0) {
level--;
}
else {
found = true;
done = true;
}
}
} while(!done);
return controlList;
}

self._ZEN_Component_form_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._ZEN_Component_form_getFormElement = function() {
var form = this.findElement('form');
zenASSERT(form,"Unable to find form element",arguments);
return form;
}

self._ZEN_Component_form_getValuesAsObject = function() {
var controls = this.getControlList('name');
var obj = new zenProxy();
for (var name in controls) {
obj[name] = controls[name].getValue();
}
return obj;
}

self._ZEN_Component_form_isModified = function() {
var flag = false;
var controls = this.getControlList();
for (var n = 0; n < controls.length; n++) {
var child = controls[n];
if (child.isModified()) {
flag = true;
break;
}
}
return flag;
}

self._ZEN_Component_form_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._ZEN_Component_form_notifyViewHandler = function(reason,data1,data2,data3) {
switch(reason) {
case 'dataChange':
var controller = this.getController();
var ds = controller.getProperty('defaultSeries');
if (null == data3 || ds == data3) {
this.bindValues(data1,false);
}
break;
case 'seriesChange':
this.bindValues(null,true);
break;
case 'modelChange':
this.bindValues(null,true);
break;
}
}

self._ZEN_Component_form_onloadHandler = function() {
this.connectToController();
var controller = this.getController();
if (controller && !controller.hasData()) {
this.bindValues(null,false);
}
this.clearModified();
if (!this.autocomplete) {
var zenThis = this;
setTimeout(function() {zenThis.undoAutofill();},250);
}
}

self._ZEN_Component_form_reload = function(key) {
this.key = key;
var ctrl = this.findElement('formKey');
zenASSERT(ctrl,"Unable to find formKey element",arguments);
ctrl.value = key;
if ('' != this.OnLoadForm) {
this.ReloadForm(this.index, this.key);
}
}

self._ZEN_Component_form_reset = function() {
this.getFormElement().reset();
this.clearModified(true);
}

self._ZEN_Component_form_save = function() {
var id = '';
var controller = this.getController();
if (controller && ''!=controller.getProperty('modelClass')) {
if (controller.isModelReadOnly()) {
alert(this.readOnlyMessage);
return id;
}
if (!this.validate()) {
return id;
}
id = controller.save();
}
return id;
}

self._ZEN_Component_form_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._ZEN_Component_form_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._ZEN_Component_form_setProperty = function(property,value,value2) {
switch(property) {
case 'target':
case 'enctype':
case 'action':
case 'method':
var form = this.getFormElement();
form[property] = value;
break;
case 'messageTargetId':
case 'noModelMessage':
case 'invalidMessage':
case 'readOnlyMessage':
case 'propagateChanges':
form[property] = value;
break;
case 'key':
this.reload(value);
break;
case 'nextPage':
var next = this.findElement('nextPage');
zenASSERT(next,"Unable to find nextPage element",arguments);
next.value = value;
this.nextPage = value;
break;
case 'OnSubmitForm':
var m = this.findElement('submitMethod');
zenASSERT(m,"Unable to find submitMethod element",arguments);
m.value = value;
this.OnSubmitForm = value;
break;
case 'autoValidate':
this.autoValidate = value ? true : false;
break;
case 'controllerId':
this.setControllerId(value);
this.bindValues();
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_form_setValuesByName = function(values) {
var controls = this.getControlList('name');
for (var name in values) {
if (controls[name]) {
controls[name].setValue(values[name]);
}
}
}

self._ZEN_Component_form_showMessage = function(message) {
if (!zenIsMissing(this.messageTargetId)) {
var ctrl = zenPage.getComponentById(this.messageTargetId);
if (ctrl) {
ctrl.setProperty('value',message);
return true;
}
}
return false;
}

self._ZEN_Component_form_submit = function(action) {
var canSubmit = true;
var controls = this.getControlList();
for (var n = 0; n < controls.length; n++) {
var child = controls[n];
if (child.onsubmit) {
zenInvokeCallbackMethod(child.onsubmit,child,'onsubmit');
}
}
var controller = this.getController();
if (controller && ''!=controller.getProperty('modelClass')) {
if (controller.isModelReadOnly()) {
alert(this.readOnlyMessage);
return
}
}
if (this.autoValidate && !this.validate()) {
return;
}
if ('' != this.onsubmit) {
canSubmit = zenInvokeCallbackMethod(this.onsubmit,this,'onsubmit');
}
if (canSubmit) {
var controller = this.getController();
if (controller && ''!=controller.getProperty('modelClass')) {
var formKey = this.findElement('formKey');
var modelClass = this.findElement('modelClass');
formKey.value = controller.getProperty('modelId');
modelClass.value = controller.getProperty('modelClass');
}
var ctrl = this.findElement('action');
ctrl.value = (null == action) ? 'submit' : action;
this.getFormElement().submit();
}
}

self._ZEN_Component_form_submitHandler = function() {
zenInvokeCallbackMethod(this.ondefault,this,'ondefault');
return false;
}

self._ZEN_Component_form_undoAutofill = function() {
var controls = this.getControlList();
for (var n = 0; n < controls.length; n++) {
var child = controls[n];
var ov = child.getProperty('originalValue');
child.setValue(ov);
}
}

self._ZEN_Component_form_validate = function() {
var valid = true;
var invalidList = new Array();
var invalidMessage = new Object();
if ('' != this.onvalidate) {
valid = zenInvokeCallbackMethod(this.onvalidate,this,'onvalidate','invalidList',invalidList);
}
var controller = this.getController();
if (valid) {
var controls = this.getControlList();
for (var n = 0; n < controls.length; n++) {
var child = controls[n];
var dcMsg = '';
child.setProperty('invalid',false);
if (controller && ('' != child.dataBinding)) {
dcMsg = controller.isPropertyValid(child.dataBinding, child.getValue());
}
if ('' != dcMsg) {
invalidMessage[invalidList.length] = dcMsg;
invalidList[invalidList.length] = child;
}
else {
if (!child.validationHandler()) {
invalidList[invalidList.length] = child;
}
}
}
}
if (invalidList.length > 0) {
valid = false;
if ('' != this.oninvalid) {
valid = zenInvokeCallbackMethod(this.oninvalid,this,'oninvalid','invalidList',invalidList);
}
else {
var msg = this.invalidMessage + '\n-------------------\n';
for (var n = 0; n < invalidList.length; n++) {
var ctrl = invalidList[n];
ctrl.setProperty('invalid',true);
if (n==0) {
ctrl.focus();
}
if (null == invalidMessage[n] || '' == invalidMessage[n]) {
msg += ctrl.getInvalidReason() + '\n';
}
else {
msg += invalidMessage[n] + '\n';
}
}
alert(msg);
}
}
return valid;
}

self._ZEN_Component_form_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}

self._ZEN_Component_form_ReloadForm = function(pFormIndex,pKey) {
	zenInstanceMethod(this,'ReloadForm','L,L','',arguments);
}
self._ZEN_Component_form__Loader = function() {
	zenLoadClass('_ZEN_Component_group');
	_ZEN_Component_form.prototype = zenCreate('_ZEN_Component_group',-1);
	var p = _ZEN_Component_form.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_form;
	p.superClass = ('undefined' == typeof _ZEN_Component_group) ? zenMaster._ZEN_Component_group.prototype:_ZEN_Component_group.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.form';
	p._type = 'form';
	p.serialize = _ZEN_Component_form_serialize;
	p.getSettings = _ZEN_Component_form_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_form_ReallyRefreshContents;
	p.ReloadForm = _ZEN_Component_form_ReloadForm;
	p.bindValues = _ZEN_Component_form_bindValues;
	p.clearModified = _ZEN_Component_form_clearModified;
	p.connectToController = _ZEN_Component_form_connectToController;
	p.controlChangeHandler = _ZEN_Component_form_controlChangeHandler;
	p.disconnectFromController = _ZEN_Component_form_disconnectFromController;
	p.getControlList = _ZEN_Component_form_getControlList;
	p.getController = _ZEN_Component_form_getController;
	p.getFormElement = _ZEN_Component_form_getFormElement;
	p.getValuesAsObject = _ZEN_Component_form_getValuesAsObject;
	p.isModified = _ZEN_Component_form_isModified;
	p.notifyView = _ZEN_Component_form_notifyView;
	p.notifyViewHandler = _ZEN_Component_form_notifyViewHandler;
	p.onloadHandler = _ZEN_Component_form_onloadHandler;
	p.reload = _ZEN_Component_form_reload;
	p.reset = _ZEN_Component_form_reset;
	p.save = _ZEN_Component_form_save;
	p.sendEventToController = _ZEN_Component_form_sendEventToController;
	p.setControllerId = _ZEN_Component_form_setControllerId;
	p.setProperty = _ZEN_Component_form_setProperty;
	p.setValuesByName = _ZEN_Component_form_setValuesByName;
	p.showMessage = _ZEN_Component_form_showMessage;
	p.submit = _ZEN_Component_form_submit;
	p.submitHandler = _ZEN_Component_form_submitHandler;
	p.undoAutofill = _ZEN_Component_form_undoAutofill;
	p.validate = _ZEN_Component_form_validate;
}

self._zenClassIdx['listBox'] = '_ZEN_Component_listBox';
self._ZEN_Component_listBox = function(index,id) {
	if (index>=0) {_ZEN_Component_listBox__init(this,index,id);}
}

self._ZEN_Component_listBox__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_abstractListBox__init) ?zenMaster._ZEN_Component_abstractListBox__init(o,index,id):_ZEN_Component_abstractListBox__init(o,index,id);
	o.options = new Array();
	o.onCreate();
}
function _ZEN_Component_listBox_serialize(set,s)
{
	var o = this;s[0]='3033147388';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.clientType;s[9]=o.containerStyle;s[10]=o.controlClass;s[11]=o.controlStyle;s[12]=o.dataBinding;s[13]=(o.disabled?1:0);s[14]=(o.dragEnabled?1:0);s[15]=(o.dropEnabled?1:0);s[16]=(o.dynamic?1:0);s[17]=o.enclosingClass;s[18]=o.enclosingStyle;s[19]=o.error;s[20]=o.height;s[21]=(o.hidden?1:0);s[22]=o.hint;s[23]=o.hintClass;s[24]=o.hintStyle;s[25]=(o.hzScroll?1:0);s[26]=(o.invalid?1:0);s[27]=o.invalidMessage;s[28]=o.label;s[29]=o.labelClass;s[30]=o.labelDisabledClass;s[31]=o.labelStyle;s[32]=o.listHeight;s[33]=o.listWidth;s[34]=o.onafterdrag;s[35]=o.onbeforedrag;s[36]=o.onblur;s[37]=o.onchange;s[38]=o.onclick;s[39]=o.ondblclick;s[40]=o.ondrag;s[41]=o.ondrop;s[42]=o.onfocus;s[43]=o.onhide;s[44]=o.onkeydown;s[45]=o.onkeypress;s[46]=o.onkeyup;s[47]=o.onmousedown;s[48]=o.onmouseout;s[49]=o.onmouseover;s[50]=o.onmouseup;s[51]=o.onrefresh;s[52]=o.onshow;s[53]=o.onsubmit;s[54]=o.ontouchend;s[55]=o.ontouchmove;s[56]=o.ontouchstart;s[57]=o.onupdate;s[58]=o.onvalidate;s[59]=set.serializeList(o,o.options,true,'options');s[60]=o.originalValue;s[61]=o.overlayMode;s[62]=(o.readOnly?1:0);s[63]=o.renderFlag;s[64]=(o.required?1:0);s[65]=o.requiredMessage;s[66]=o.selectedIndex;s[67]=(o.showLabel?1:0);s[68]=o.slice;s[69]=o.tabIndex;s[70]=o.text;s[71]=o.title;s[72]=o.tuple;s[73]=o.valign;s[74]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[75]=(o.visible?1:0);s[76]=o.width;
}
function _ZEN_Component_listBox_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_listBox_appendOption = function(value,text,style) {
var option = zenPage.createComponent('option');
if (value != null) option.value = value;
option.text = (text != null) ? text : option.value;
if (style != null) option.style = style;
this.options[this.options.length] = option;
this.renderListBox();
}

self._ZEN_Component_listBox_dropStartHandler = function(dragData) {
var value = dragData.value;
var text = dragData.text;
if (this != dragData.sourceComponent) {
this.appendOption(value,text);
}
else {
var tgtId = ZLM.getDragInnerDestination().id;
var tgtIndex = -1;
if (tgtId && tgtId.indexOf('item')!=-1) {
tgtIndex = tgtId.split('_')[1];
}
dragData.targetItem = tgtIndex;
var srcIndex = dragData.sourceItem;
this.moveOption(srcIndex,tgtIndex);
}
return true;
}

self._ZEN_Component_listBox_getOptionCount = function() {
return this.options.length;
}

self._ZEN_Component_listBox_getOptionText = function(idx) {
return this.options[idx].text;
}

self._ZEN_Component_listBox_getOptionValue = function(idx) {
return this.options[idx].value;
}

self._ZEN_Component_listBox_insertOption = function(index,value,text,style) {
var option = zenPage.createComponent('option');
if (value != null) option.value = value;
option.text = (text != null) ? text : option.value;
if (style != null) option.style = style;
this.options.splice(index,0,option);
this.renderListBox();
}

self._ZEN_Component_listBox_moveOption = function(index,newIndex) {
if (index < 0 || index > this.options.length) return;
if (newIndex < 0 || newIndex > this.options.length) {
newIndex = this.options.length;
}
if (index == newIndex) return;
var option = this.options[index];
this.options.splice(index,1);
this.options.splice(newIndex,0,option);
this.renderListBox();
}

self._ZEN_Component_listBox_onRefreshContents = function() {
this.renderListBox();
}

self._ZEN_Component_listBox_onloadHandler = function() {
this.renderListBox();
}

self._ZEN_Component_listBox_removeOption = function(index) {
this.options.splice(index,1);
if (this.selectedIndex >= this.options.length) {
this.selectedIndex = -1;
}
this.renderListBox();
}

self._ZEN_Component_listBox_renderListBox = function() {
var div = this.findElement('list');
zenASSERT(div,'Unable to find listBox element',arguments);
var html = new Array();
var option,val,text,cls,style;
var hasSel = false;
for (var n = 0; n < this.options.length; n++) {
option = this.options[n];
val = option.value;
text = (option.text!='') ? option.text : option.value;
if (!hasSel && this.value == option.value) {
this.selectedIndex = n;
cls = 'listBoxItemSelected';
hasSel = true;
}
else {
cls = 'listBoxItem';
}
var mouseEvents = '';
if (zenPage.dragAndDrop) {
mouseEvents = ' onmousedown="return zenPage.getComponent('+this.index+').itemMouseDown(event,'+n+');"';
mouseEvents += ' onmouseup="return zenPage.getComponent('+this.index+').itemMouseUp(event);"';
}
style = (option.style=='') ? '' : ('style="'+option.style+'"');
html[html.length] = '<div'+ mouseEvents + ' class="'+cls+'" id="'+this.makeId('item_'+n)+'" onclick="zenPage.getComponent('+this.index+').clickItem('+n+');return false;" ondblclick="zenPage.getComponent('+this.index+').dblClickItem('+n+');" '+style+'>&#160;'+text+'&#160;<\/div>';
}
div.innerHTML = html.join("");
}

self._ZEN_Component_listBox_resetOptions = function() {
this.options.length = 0;
this.selectedIndex = -1;
this.text = '';
this.setValue('');
this.renderListBox();
}

self._ZEN_Component_listBox_setOption = function(index,value,text,style) {
var option = this.options[index];
if (null != option) {
if (value != null) option.value = value;
option.text = (text != null) ? text : option.value;
if (style != null) option.style = style;
this.renderListBox();
}
}

self._ZEN_Component_listBox_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_listBox__Loader = function() {
	zenLoadClass('_ZEN_Component_abstractListBox');
	_ZEN_Component_listBox.prototype = zenCreate('_ZEN_Component_abstractListBox',-1);
	var p = _ZEN_Component_listBox.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_listBox;
	p.superClass = ('undefined' == typeof _ZEN_Component_abstractListBox) ? zenMaster._ZEN_Component_abstractListBox.prototype:_ZEN_Component_abstractListBox.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.listBox';
	p._type = 'listBox';
	p.serialize = _ZEN_Component_listBox_serialize;
	p.getSettings = _ZEN_Component_listBox_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_listBox_ReallyRefreshContents;
	p.appendOption = _ZEN_Component_listBox_appendOption;
	p.dropStartHandler = _ZEN_Component_listBox_dropStartHandler;
	p.getOptionCount = _ZEN_Component_listBox_getOptionCount;
	p.getOptionText = _ZEN_Component_listBox_getOptionText;
	p.getOptionValue = _ZEN_Component_listBox_getOptionValue;
	p.insertOption = _ZEN_Component_listBox_insertOption;
	p.moveOption = _ZEN_Component_listBox_moveOption;
	p.onRefreshContents = _ZEN_Component_listBox_onRefreshContents;
	p.onloadHandler = _ZEN_Component_listBox_onloadHandler;
	p.removeOption = _ZEN_Component_listBox_removeOption;
	p.renderListBox = _ZEN_Component_listBox_renderListBox;
	p.resetOptions = _ZEN_Component_listBox_resetOptions;
	p.setOption = _ZEN_Component_listBox_setOption;
}

self._zenClassIdx['loginForm'] = '_ZEN_Component_loginForm';
self._ZEN_Component_loginForm = function(index,id) {
	if (index>=0) {_ZEN_Component_loginForm__init(this,index,id);}
}

self._ZEN_Component_loginForm__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_group__init) ?zenMaster._ZEN_Component_group__init(o,index,id):_ZEN_Component_group__init(o,index,id);
	o.enctype = '';
	o.groupClass = 'form';
	o.groupStyle = 'padding: 5px;';
	o.ondefault = '';
	o.onsubmit = '';
}
function _ZEN_Component_loginForm_serialize(set,s)
{
	var o = this;s[0]='1508707589';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.cellAlign;s[9]=o.cellSize;s[10]=o.cellStyle;s[11]=o.cellVAlign;s[12]=set.serializeList(o,o.children,true,'children');s[13]=o.containerStyle;s[14]=(o.disabled?1:0);s[15]=(o.dragEnabled?1:0);s[16]=(o.dropEnabled?1:0);s[17]=(o.dynamic?1:0);s[18]=o.enclosingClass;s[19]=o.enclosingStyle;s[20]=o.enctype;s[21]=o.error;s[22]=o.groupClass;s[23]=o.groupStyle;s[24]=o.height;s[25]=(o.hidden?1:0);s[26]=o.hint;s[27]=o.hintClass;s[28]=o.hintStyle;s[29]=o.label;s[30]=o.labelClass;s[31]=o.labelDisabledClass;s[32]=o.labelPosition;s[33]=o.labelStyle;s[34]=o.layout;s[35]=o.onafterdrag;s[36]=o.onbeforedrag;s[37]=o.onclick;s[38]=o.ondefault;s[39]=o.ondrag;s[40]=o.ondrop;s[41]=o.onhide;s[42]=o.onrefresh;s[43]=o.onshow;s[44]=o.onsubmit;s[45]=o.onupdate;s[46]=o.overlayMode;s[47]=o.renderFlag;s[48]=(o.showLabel?1:0);s[49]=o.slice;s[50]=o.title;s[51]=o.tuple;s[52]=o.valign;s[53]=(o.visible?1:0);s[54]=o.width;
}
function _ZEN_Component_loginForm_getSettings(s)
{
	s['name'] = 'string';
	s['enctype'] = 'string';
	s['ondefault'] = 'eventHandler';
	s['onsubmit'] = 'eventHandler';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_loginForm_controlChangeHandler = function(control,fire) {
if ('undefined' == typeof fire || fire) {
zenInvokeCallbackMethod(this.onchange,this,'onchange','control',control);
}
}

self._ZEN_Component_loginForm_getController = function() {
return null;
}

self._ZEN_Component_loginForm_getFormElement = function() {
var form = this.findElement('form');
zenASSERT(form,"Unable to find form element",arguments);
return form;
}

self._ZEN_Component_loginForm_handleKey = function(e) {
var charCode;
charCode = window.event ? event.keyCode : e.which;
if(charCode == 13) {
this.submit();
var evt  = window.event ? event : e;
if (evt.stopPropagation) evt.stopPropagation();
if (evt.cancelBubble!=null) evt.cancelBubble=true;
if (evt.preventDefault) evt.preventDefault();
else evt.returnValue=false;
return(false);
}
}

self._ZEN_Component_loginForm_reset = function() {
this.getFormElement().reset();
}

self._ZEN_Component_loginForm_setProperty = function(property,value,value2) {
switch(property) {
case 'nextPage':
case 'action':
break;
case 'enctype':
var form = this.getFormElement();
form[property] = value;
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_loginForm_submit = function(action) {
var canSubmit = true;
if ('' != this.onsubmit) {
canSubmit = zenInvokeCallbackMethod(this.onsubmit,this,'onsubmit');
}
if (canSubmit) {
this.getFormElement().submit();
}
}

self._ZEN_Component_loginForm_submitHandler = function() {
if (''==this.ondefault) {
this.submit('');
}
else {
zenInvokeCallbackMethod(this.ondefault,this,'ondefault');
}
return false;
}

self._ZEN_Component_loginForm_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_loginForm__Loader = function() {
	zenLoadClass('_ZEN_Component_group');
	_ZEN_Component_loginForm.prototype = zenCreate('_ZEN_Component_group',-1);
	var p = _ZEN_Component_loginForm.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_loginForm;
	p.superClass = ('undefined' == typeof _ZEN_Component_group) ? zenMaster._ZEN_Component_group.prototype:_ZEN_Component_group.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.loginForm';
	p._type = 'loginForm';
	p.serialize = _ZEN_Component_loginForm_serialize;
	p.getSettings = _ZEN_Component_loginForm_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_loginForm_ReallyRefreshContents;
	p.controlChangeHandler = _ZEN_Component_loginForm_controlChangeHandler;
	p.getController = _ZEN_Component_loginForm_getController;
	p.getFormElement = _ZEN_Component_loginForm_getFormElement;
	p.handleKey = _ZEN_Component_loginForm_handleKey;
	p.reset = _ZEN_Component_loginForm_reset;
	p.setProperty = _ZEN_Component_loginForm_setProperty;
	p.submit = _ZEN_Component_loginForm_submit;
	p.submitHandler = _ZEN_Component_loginForm_submitHandler;
}

self._zenClassIdx['multiSelectSet'] = '_ZEN_Component_multiSelectSet';
self._ZEN_Component_multiSelectSet = function(index,id) {
	if (index>=0) {_ZEN_Component_multiSelectSet__init(this,index,id);}
}

self._ZEN_Component_multiSelectSet__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_listControl__init) ?zenMaster._ZEN_Component_listControl__init(o,index,id):_ZEN_Component_listControl__init(o,index,id);
	o.captionClass = 'multiSelectSetCaption';
	o.emptyCaption = 'None';
	o.layout = 'vertical';
	o.optionCount = '0';
	o.titleList = '';
}
function _ZEN_Component_multiSelectSet_serialize(set,s)
{
	var o = this;s[0]='2208157786';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.captionClass;s[9]=o.choiceColumn;s[10]=o.clientType;s[11]=o.containerStyle;s[12]=o.controlClass;s[13]=o.controlStyle;s[14]=o.dataBinding;s[15]=(o.disabled?1:0);s[16]=o.displayList;s[17]=(o.dragEnabled?1:0);s[18]=(o.dropEnabled?1:0);s[19]=(o.dynamic?1:0);s[20]=o.emptyCaption;s[21]=o.enclosingClass;s[22]=o.enclosingStyle;s[23]=o.error;s[24]=o.height;s[25]=(o.hidden?1:0);s[26]=o.hint;s[27]=o.hintClass;s[28]=o.hintStyle;s[29]=(o.invalid?1:0);s[30]=o.invalidMessage;s[31]=o.label;s[32]=o.labelClass;s[33]=o.labelDisabledClass;s[34]=o.labelStyle;s[35]=o.layout;s[36]=o.maxRows;s[37]=o.onafterdrag;s[38]=o.onbeforedrag;s[39]=o.onblur;s[40]=o.onchange;s[41]=o.onclick;s[42]=o.ondblclick;s[43]=o.ondrag;s[44]=o.ondrop;s[45]=o.onfocus;s[46]=o.onhide;s[47]=o.onkeydown;s[48]=o.onkeypress;s[49]=o.onkeyup;s[50]=o.onmousedown;s[51]=o.onmouseout;s[52]=o.onmouseover;s[53]=o.onmouseup;s[54]=o.onrefresh;s[55]=o.onshow;s[56]=o.onsubmit;s[57]=o.ontouchend;s[58]=o.ontouchmove;s[59]=o.ontouchstart;s[60]=o.onupdate;s[61]=o.onvalidate;s[62]=o.optionCount;s[63]=o.originalValue;s[64]=o.overlayMode;s[65]=set.serializeList(o,o.parameters,true,'parameters');s[66]=o.queryClass;s[67]=o.queryName;s[68]=(o.readOnly?1:0);s[69]=o.renderFlag;s[70]=(o.required?1:0);s[71]=o.requiredMessage;s[72]=(o.showLabel?1:0);s[73]=o.slice;s[74]=o.sql;s[75]=o.tabIndex;s[76]=o.title;s[77]=o.titleList;s[78]=o.tuple;s[79]=o.valign;s[80]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[81]=o.valueColumn;s[82]=o.valueList;s[83]=(o.visible?1:0);s[84]=o.width;
}
function _ZEN_Component_multiSelectSet_getSettings(s)
{
	s['name'] = 'string';
	s['captionClass'] = 'cssClass';
	s['emptyCaption'] = 'caption';
	s['layout'] = 'enum:horizontal,vertical';
	s['optionCount'] = 'integer';
	s['titleList'] = 'csv';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_multiSelectSet_clickItem = function(choice) {
if (this.disabled) return false;
if (this.readOnly) return false;
var checkBox = this.findElement('textCheckbox_' + choice);
zenASSERT(checkBox,'Unable to find checkbox element.',arguments);
this.updateValue();
zenInvokeCallbackMethod(this.onclick,this,'onclick');
this.onchangeHandler();
return true;
}

self._ZEN_Component_multiSelectSet_onloadHandler = function() {
if (this.value && this.value.indexOf(',')>0) this.setValue(this.value);
}

self._ZEN_Component_multiSelectSet_onupdateHandler = function() {
if (this.value && this.value.indexOf(',')>0) this.setValue(this.value);
}

self._ZEN_Component_multiSelectSet_selectAll = function() {
this.selectUniform(true);
}

self._ZEN_Component_multiSelectSet_selectNone = function() {
this.selectUniform(false);
}

self._ZEN_Component_multiSelectSet_selectUniform = function(flag) {
for (var n = 0; n < this.optionCount; n++) {
var checkBox = this.findElement('textCheckbox_' + ((parseInt(n,10))+1));
if (checkBox) {
checkBox.checked = flag;
}
}
this.updateValue();
}

self._ZEN_Component_multiSelectSet_setCaptionClass = function(cls) {
for (var n = 0; n < this.optionCount; n++) {
var caption = this.findElement('caption_' + ((parseInt(n,10))+1));
if (caption) { caption.className = cls; }
}
}

self._ZEN_Component_multiSelectSet_setProperty = function(property,value,value2) {
switch(property) {
case 'value':
this.value = value;
this.selectUniform(false);
var a=value.split(",");
var len=a.length;
var n=1;
var checkBox = null;
while ((checkBox = this.findElement('textCheckbox_'+n))!=null) {
for (var i=0;i<len;i++) {
if (checkBox.value==a[i]) {
checkBox.checked=true;
i=len;
}
}
n++;
}
this.updateValue();
var hidden = this.findElement('hidden');
if (hidden) { hidden.value = this.value; }
break;
case 'readOnly':
case 'disabled':
value = (value) ? true : false;
if (this[property] != value) {
this[property] = value;
for (var n = 0; n < this.optionCount; n++) {
var checkBox = this.findElement('textCheckbox_' + ((n*1)+1));
if (checkBox) {checkBox.disabled = (this.disabled||this.readOnly); }
}
if ('disabled' == property) {
this.setCaptionClass(this.disabled ? 'multiSelectSetCaptionDisabled' : this.captionClass);
}
}
break;
case 'captionClass':
this.captionClass = value;
if (!this.disabled) {
this.setCaptionClass(this.captionClass);
}
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_multiSelectSet_updateValue = function() {
var v=[];
var n=1;
var checkBox = null;
while ((checkBox = this.findElement('textCheckbox_'+n))!=null) {
if (checkBox.checked==true) v.push(checkBox.value);
n++;
}
this.value = v.join(',');
var hidden = this.findElement('hidden');
zenASSERT(hidden,'Unable to find hidden element.',arguments);
if (hidden.value != this.value) {
hidden.value = this.value;
}
}

self._ZEN_Component_multiSelectSet_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_multiSelectSet__Loader = function() {
	zenLoadClass('_ZEN_Component_listControl');
	_ZEN_Component_multiSelectSet.prototype = zenCreate('_ZEN_Component_listControl',-1);
	var p = _ZEN_Component_multiSelectSet.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_multiSelectSet;
	p.superClass = ('undefined' == typeof _ZEN_Component_listControl) ? zenMaster._ZEN_Component_listControl.prototype:_ZEN_Component_listControl.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.multiSelectSet';
	p._type = 'multiSelectSet';
	p.serialize = _ZEN_Component_multiSelectSet_serialize;
	p.getSettings = _ZEN_Component_multiSelectSet_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_multiSelectSet_ReallyRefreshContents;
	p.clickItem = _ZEN_Component_multiSelectSet_clickItem;
	p.onloadHandler = _ZEN_Component_multiSelectSet_onloadHandler;
	p.onupdateHandler = _ZEN_Component_multiSelectSet_onupdateHandler;
	p.selectAll = _ZEN_Component_multiSelectSet_selectAll;
	p.selectNone = _ZEN_Component_multiSelectSet_selectNone;
	p.selectUniform = _ZEN_Component_multiSelectSet_selectUniform;
	p.setCaptionClass = _ZEN_Component_multiSelectSet_setCaptionClass;
	p.setProperty = _ZEN_Component_multiSelectSet_setProperty;
	p.updateValue = _ZEN_Component_multiSelectSet_updateValue;
}

self._zenClassIdx['password'] = '_ZEN_Component_password';
self._ZEN_Component_password = function(index,id) {
	if (index>=0) {_ZEN_Component_password__init(this,index,id);}
}

self._ZEN_Component_password__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_text__init) ?zenMaster._ZEN_Component_text__init(o,index,id):_ZEN_Component_text__init(o,index,id);
	o.autocomplete = 'new-password';
	o.controlClass = 'password';
}
function _ZEN_Component_password_serialize(set,s)
{
	var o = this;s[0]='983448644';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.autocomplete;s[8]=o.aux;s[9]=o.clientType;s[10]=o.containerStyle;s[11]=o.controlClass;s[12]=o.controlStyle;s[13]=o.dataBinding;s[14]=(o.disabled?1:0);s[15]=(o.dragEnabled?1:0);s[16]=(o.dropEnabled?1:0);s[17]=(o.dynamic?1:0);s[18]=o.enclosingClass;s[19]=o.enclosingStyle;s[20]=o.error;s[21]=o.height;s[22]=(o.hidden?1:0);s[23]=o.hint;s[24]=o.hintClass;s[25]=o.hintStyle;s[26]=o.inputtype;s[27]=(o.invalid?1:0);s[28]=o.invalidMessage;s[29]=o.label;s[30]=o.labelClass;s[31]=o.labelDisabledClass;s[32]=o.labelStyle;s[33]=o.maxlength;s[34]=o.onafterdrag;s[35]=o.onbeforedrag;s[36]=o.onblur;s[37]=o.onchange;s[38]=o.onclick;s[39]=o.ondblclick;s[40]=o.ondrag;s[41]=o.ondrop;s[42]=o.onfocus;s[43]=o.onhide;s[44]=o.onkeydown;s[45]=o.onkeypress;s[46]=o.onkeyup;s[47]=o.onmousedown;s[48]=o.onmouseout;s[49]=o.onmouseover;s[50]=o.onmouseup;s[51]=o.onrefresh;s[52]=o.onshow;s[53]=o.onsubmit;s[54]=o.ontouchend;s[55]=o.ontouchmove;s[56]=o.ontouchstart;s[57]=o.onupdate;s[58]=o.onvalidate;s[59]=o.originalValue;s[60]=o.overlayMode;s[61]=o.placeholder;s[62]=(o.readOnly?1:0);s[63]=o.renderFlag;s[64]=(o.required?1:0);s[65]=o.requiredMessage;s[66]=(o.showLabel?1:0);s[67]=o.size;s[68]=o.slice;s[69]=(o.spellcheck?1:0);s[70]=o.tabIndex;s[71]=o.title;s[72]=o.tuple;s[73]=o.valign;s[74]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[75]=(o.visible?1:0);s[76]=o.width;
}
function _ZEN_Component_password_getSettings(s)
{
	s['name'] = 'string';
	s['autocomplete'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_password_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_password__Loader = function() {
	zenLoadClass('_ZEN_Component_text');
	_ZEN_Component_password.prototype = zenCreate('_ZEN_Component_text',-1);
	var p = _ZEN_Component_password.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_password;
	p.superClass = ('undefined' == typeof _ZEN_Component_text) ? zenMaster._ZEN_Component_text.prototype:_ZEN_Component_text.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.password';
	p._type = 'password';
	p.serialize = _ZEN_Component_password_serialize;
	p.getSettings = _ZEN_Component_password_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_password_ReallyRefreshContents;
}

self._zenClassIdx['radioSet'] = '_ZEN_Component_radioSet';
self._ZEN_Component_radioSet = function(index,id) {
	if (index>=0) {_ZEN_Component_radioSet__init(this,index,id);}
}

self._ZEN_Component_radioSet__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_listControl__init) ?zenMaster._ZEN_Component_listControl__init(o,index,id):_ZEN_Component_listControl__init(o,index,id);
	o.captionClass = 'radioSetCaption';
	o.emptyCaption = 'None';
	o.layout = 'horizontal';
	o.optionCount = '0';
	o.titleList = '';
}
function _ZEN_Component_radioSet_serialize(set,s)
{
	var o = this;s[0]='2208157786';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.captionClass;s[9]=o.choiceColumn;s[10]=o.clientType;s[11]=o.containerStyle;s[12]=o.controlClass;s[13]=o.controlStyle;s[14]=o.dataBinding;s[15]=(o.disabled?1:0);s[16]=o.displayList;s[17]=(o.dragEnabled?1:0);s[18]=(o.dropEnabled?1:0);s[19]=(o.dynamic?1:0);s[20]=o.emptyCaption;s[21]=o.enclosingClass;s[22]=o.enclosingStyle;s[23]=o.error;s[24]=o.height;s[25]=(o.hidden?1:0);s[26]=o.hint;s[27]=o.hintClass;s[28]=o.hintStyle;s[29]=(o.invalid?1:0);s[30]=o.invalidMessage;s[31]=o.label;s[32]=o.labelClass;s[33]=o.labelDisabledClass;s[34]=o.labelStyle;s[35]=o.layout;s[36]=o.maxRows;s[37]=o.onafterdrag;s[38]=o.onbeforedrag;s[39]=o.onblur;s[40]=o.onchange;s[41]=o.onclick;s[42]=o.ondblclick;s[43]=o.ondrag;s[44]=o.ondrop;s[45]=o.onfocus;s[46]=o.onhide;s[47]=o.onkeydown;s[48]=o.onkeypress;s[49]=o.onkeyup;s[50]=o.onmousedown;s[51]=o.onmouseout;s[52]=o.onmouseover;s[53]=o.onmouseup;s[54]=o.onrefresh;s[55]=o.onshow;s[56]=o.onsubmit;s[57]=o.ontouchend;s[58]=o.ontouchmove;s[59]=o.ontouchstart;s[60]=o.onupdate;s[61]=o.onvalidate;s[62]=o.optionCount;s[63]=o.originalValue;s[64]=o.overlayMode;s[65]=set.serializeList(o,o.parameters,true,'parameters');s[66]=o.queryClass;s[67]=o.queryName;s[68]=(o.readOnly?1:0);s[69]=o.renderFlag;s[70]=(o.required?1:0);s[71]=o.requiredMessage;s[72]=(o.showLabel?1:0);s[73]=o.slice;s[74]=o.sql;s[75]=o.tabIndex;s[76]=o.title;s[77]=o.titleList;s[78]=o.tuple;s[79]=o.valign;s[80]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[81]=o.valueColumn;s[82]=o.valueList;s[83]=(o.visible?1:0);s[84]=o.width;
}
function _ZEN_Component_radioSet_getSettings(s)
{
	s['name'] = 'string';
	s['captionClass'] = 'cssClass';
	s['emptyCaption'] = 'caption';
	s['layout'] = 'enum:horizontal,vertical';
	s['optionCount'] = 'integer';
	s['titleList'] = 'csv';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_radioSet_clickItem = function(choice) {
if (this.disabled) return false;
if (this.readOnly) return false;
var changed = false;
var radio = this.findElement('textRadio_' + choice);
zenASSERT(radio,'Unable to find radio element.',arguments);
radio.checked = true;
this.value = radio.value;
var hidden = this.findElement('hidden');
zenASSERT(hidden,'Unable to find hidden element.',arguments);
if (hidden.value != this.value) {
hidden.value = this.value;
changed = true;
}
zenInvokeCallbackMethod(this.onclick,this,'onclick');
if (changed) {
this.onchangeHandler();
}
return true;
}

self._ZEN_Component_radioSet_setCaptionClass = function(cls) {
for (var n = 0; n < this.optionCount; n++) {
var caption = this.findElement('caption_' + ((parseInt(n,10))+1));
if (caption) { caption.className = cls; }
}
}

self._ZEN_Component_radioSet_setProperty = function(property,value,value2) {
switch(property) {
case 'optionCount':
if (parseInt(value) != this.optionCount) {
this.optionCount = value;
this.setValue(this.value);
}
break;
case 'value':
this.value = value;
for (var n = 0; n < this.optionCount; n++) {
var radio = this.findElement('textRadio_' + ((parseInt(n,10))+1));
if (radio) {
radio.checked = (radio.value == this.value);
}
}
var hidden = this.findElement('hidden');
if (hidden) { hidden.value = this.value; }
break;
case 'readOnly':
case 'disabled':
value = (value) ? true : false;
if (this[property] != value) {
this[property] = value;
for (var n = 0; n < this.optionCount; n++) {
var radio = this.findElement('textRadio_' + ((n*1)+1));
if (radio) {radio.disabled = (this.disabled||this.readOnly); }
}
if ('disabled' == property) {
this.setCaptionClass(this.disabled ? 'radioSetCaptionDisabled' : this.captionClass);
}
}
break;
case 'captionClass':
this.captionClass = value;
if (!this.disabled) {
this.setCaptionClass(this.captionClass);
}
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_radioSet_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_radioSet__Loader = function() {
	zenLoadClass('_ZEN_Component_listControl');
	_ZEN_Component_radioSet.prototype = zenCreate('_ZEN_Component_listControl',-1);
	var p = _ZEN_Component_radioSet.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_radioSet;
	p.superClass = ('undefined' == typeof _ZEN_Component_listControl) ? zenMaster._ZEN_Component_listControl.prototype:_ZEN_Component_listControl.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.radioSet';
	p._type = 'radioSet';
	p.serialize = _ZEN_Component_radioSet_serialize;
	p.getSettings = _ZEN_Component_radioSet_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_radioSet_ReallyRefreshContents;
	p.clickItem = _ZEN_Component_radioSet_clickItem;
	p.setCaptionClass = _ZEN_Component_radioSet_setCaptionClass;
	p.setProperty = _ZEN_Component_radioSet_setProperty;
}

self._zenClassIdx['select'] = '_ZEN_Component_select';
self._ZEN_Component_select = function(index,id) {
	if (index>=0) {_ZEN_Component_select__init(this,index,id);}
}

self._ZEN_Component_select__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_listControl__init) ?zenMaster._ZEN_Component_listControl__init(o,index,id):_ZEN_Component_listControl__init(o,index,id);
	o.controlClass = 'select';
	o.emptyText = '';
	o.showEmpty = true;
	o.size = '';
}
function _ZEN_Component_select_serialize(set,s)
{
	var o = this;s[0]='3765564944';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.choiceColumn;s[9]=o.clientType;s[10]=o.containerStyle;s[11]=o.controlClass;s[12]=o.controlStyle;s[13]=o.dataBinding;s[14]=(o.disabled?1:0);s[15]=o.displayList;s[16]=(o.dragEnabled?1:0);s[17]=(o.dropEnabled?1:0);s[18]=(o.dynamic?1:0);s[19]=o.emptyText;s[20]=o.enclosingClass;s[21]=o.enclosingStyle;s[22]=o.error;s[23]=o.height;s[24]=(o.hidden?1:0);s[25]=o.hint;s[26]=o.hintClass;s[27]=o.hintStyle;s[28]=(o.invalid?1:0);s[29]=o.invalidMessage;s[30]=o.label;s[31]=o.labelClass;s[32]=o.labelDisabledClass;s[33]=o.labelStyle;s[34]=o.maxRows;s[35]=o.onafterdrag;s[36]=o.onbeforedrag;s[37]=o.onblur;s[38]=o.onchange;s[39]=o.onclick;s[40]=o.ondblclick;s[41]=o.ondrag;s[42]=o.ondrop;s[43]=o.onfocus;s[44]=o.onhide;s[45]=o.onkeydown;s[46]=o.onkeypress;s[47]=o.onkeyup;s[48]=o.onmousedown;s[49]=o.onmouseout;s[50]=o.onmouseover;s[51]=o.onmouseup;s[52]=o.onrefresh;s[53]=o.onshow;s[54]=o.onsubmit;s[55]=o.ontouchend;s[56]=o.ontouchmove;s[57]=o.ontouchstart;s[58]=o.onupdate;s[59]=o.onvalidate;s[60]=o.originalValue;s[61]=o.overlayMode;s[62]=set.serializeList(o,o.parameters,true,'parameters');s[63]=o.queryClass;s[64]=o.queryName;s[65]=(o.readOnly?1:0);s[66]=o.renderFlag;s[67]=(o.required?1:0);s[68]=o.requiredMessage;s[69]=(o.showEmpty?1:0);s[70]=(o.showLabel?1:0);s[71]=o.size;s[72]=o.slice;s[73]=o.sql;s[74]=o.tabIndex;s[75]=o.title;s[76]=o.tuple;s[77]=o.valign;s[78]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[79]=o.valueColumn;s[80]=o.valueList;s[81]=(o.visible?1:0);s[82]=o.width;
}
function _ZEN_Component_select_getSettings(s)
{
	s['name'] = 'string';
	s['emptyText'] = 'caption';
	s['showEmpty'] = 'boolean';
	s['size'] = 'integer';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_select_getOptionText = function(idx) {
var el = this.findElement('control');
if (el && idx >= 0) {
var opt = el.options[idx];
return (null == opt) ? '' : opt.text;
}
return '';
}

self._ZEN_Component_select_getOptionValue = function(idx) {
var el = this.findElement('control');
if (el && idx >= 0) {
var opt = el.options[idx];
return (null == opt) ? '' : opt.value;
}
return '';
}

self._ZEN_Component_select_getSelectedIndex = function(idx) {
var el = this.findElement('control');
if (el) {
return el.selectedIndex;
}
return -1;
}

self._ZEN_Component_select_setProperty = function(property,value,value2) {
var el = this.findElement('control');
switch(property) {
case 'disabled':
value = (value) ? true : false;
this.disabled = value;
var d = (this.readOnly || this.disabled);
if (el) { el.disabled = d; }
var lbl = this.getLabelElement();
if (lbl) {
if (this.disabled) {
lbl.className = 'zenLabelDisabled';
}
else {
lbl.className = (''==this.labelClass) ? 'zenLabel' : this.labelClass;
}
}
break;
case 'readOnly':
value = (value) ? true : false;
this.readOnly = value;
var d = (this.readOnly || this.disabled);
if (el) { el.disabled = d; }
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_select_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_select__Loader = function() {
	zenLoadClass('_ZEN_Component_listControl');
	_ZEN_Component_select.prototype = zenCreate('_ZEN_Component_listControl',-1);
	var p = _ZEN_Component_select.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_select;
	p.superClass = ('undefined' == typeof _ZEN_Component_listControl) ? zenMaster._ZEN_Component_listControl.prototype:_ZEN_Component_listControl.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.select';
	p._type = 'select';
	p.serialize = _ZEN_Component_select_serialize;
	p.getSettings = _ZEN_Component_select_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_select_ReallyRefreshContents;
	p.getOptionText = _ZEN_Component_select_getOptionText;
	p.getOptionValue = _ZEN_Component_select_getOptionValue;
	p.getSelectedIndex = _ZEN_Component_select_getSelectedIndex;
	p.setProperty = _ZEN_Component_select_setProperty;
}

self._zenClassIdx['submit'] = '_ZEN_Component_submit';
self._ZEN_Component_submit = function(index,id) {
	if (index>=0) {_ZEN_Component_submit__init(this,index,id);}
}

self._ZEN_Component_submit__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_button__init) ?zenMaster._ZEN_Component_button__init(o,index,id):_ZEN_Component_button__init(o,index,id);
	o.action = 'submit';
	o.nextPage = '';
}
function _ZEN_Component_submit_serialize(set,s)
{
	var o = this;s[0]='3730710936';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.action;s[7]=o.align;s[8]=o.aux;s[9]=o.caption;s[10]=o.clientType;s[11]=o.containerStyle;s[12]=o.controlClass;s[13]=o.controlStyle;s[14]=o.dataBinding;s[15]=(o.disabled?1:0);s[16]=(o.dragEnabled?1:0);s[17]=(o.dropEnabled?1:0);s[18]=(o.dynamic?1:0);s[19]=o.enclosingClass;s[20]=o.enclosingStyle;s[21]=o.error;s[22]=o.height;s[23]=(o.hidden?1:0);s[24]=o.hint;s[25]=o.hintClass;s[26]=o.hintStyle;s[27]=(o.invalid?1:0);s[28]=o.invalidMessage;s[29]=o.label;s[30]=o.labelClass;s[31]=o.labelDisabledClass;s[32]=o.labelStyle;s[33]=o.nextPage;s[34]=o.onafterdrag;s[35]=o.onbeforedrag;s[36]=o.onblur;s[37]=o.onchange;s[38]=o.onclick;s[39]=o.ondblclick;s[40]=o.ondrag;s[41]=o.ondrop;s[42]=o.onfocus;s[43]=o.onhide;s[44]=o.onkeydown;s[45]=o.onkeypress;s[46]=o.onkeyup;s[47]=o.onmousedown;s[48]=o.onmouseout;s[49]=o.onmouseover;s[50]=o.onmouseup;s[51]=o.onrefresh;s[52]=o.onshow;s[53]=o.onsubmit;s[54]=o.ontouchend;s[55]=o.ontouchmove;s[56]=o.ontouchstart;s[57]=o.onupdate;s[58]=o.onvalidate;s[59]=o.originalValue;s[60]=o.overlayMode;s[61]=(o.readOnly?1:0);s[62]=o.renderFlag;s[63]=(o.required?1:0);s[64]=o.requiredMessage;s[65]=(o.showLabel?1:0);s[66]=o.slice;s[67]=o.tabIndex;s[68]=o.title;s[69]=o.tuple;s[70]=o.valign;s[71]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[72]=(o.visible?1:0);s[73]=o.width;
}
function _ZEN_Component_submit_getSettings(s)
{
	s['name'] = 'string';
	s['action'] = 'string';
	s['nextPage'] = 'uri';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_submit_onclickHandler = function() {
var form = this.getForm();
zenASSERT(form,"Submit button is not part of a form",arguments);
if (form) {
if ('' != this.nextPage) {
form.setProperty('nextPage',this.nextPage);
}
zenInvokeCallbackMethod(this.onclick,this,'onclick');
form.submit(this.action);
}
}

self._ZEN_Component_submit_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_submit__Loader = function() {
	zenLoadClass('_ZEN_Component_button');
	_ZEN_Component_submit.prototype = zenCreate('_ZEN_Component_button',-1);
	var p = _ZEN_Component_submit.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_submit;
	p.superClass = ('undefined' == typeof _ZEN_Component_button) ? zenMaster._ZEN_Component_button.prototype:_ZEN_Component_button.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.submit';
	p._type = 'submit';
	p.serialize = _ZEN_Component_submit_serialize;
	p.getSettings = _ZEN_Component_submit_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_submit_ReallyRefreshContents;
	p.onclickHandler = _ZEN_Component_submit_onclickHandler;
}

self._zenClassIdx['combobox'] = '_ZEN_Component_combobox';
self._ZEN_Component_combobox = function(index,id) {
	if (index>=0) {_ZEN_Component_combobox__init(this,index,id);}
}

self._ZEN_Component_combobox__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_abstractComboBox__init) ?zenMaster._ZEN_Component_abstractComboBox__init(o,index,id):_ZEN_Component_abstractComboBox__init(o,index,id);
	o.displayList = '';
	o.options = new Array();
	o.valueList = '';
}
function _ZEN_Component_combobox_serialize(set,s)
{
	var o = this;s[0]='2269554070';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.autocomplete;s[8]=o.aux;s[9]=o.buttonCaption;s[10]=o.buttonImage;s[11]=o.buttonImageDown;s[12]=o.buttonTitle;s[13]=o.clientType;s[14]=o.comboType;s[15]=o.containerStyle;s[16]=o.controlClass;s[17]=o.controlStyle;s[18]=o.dataBinding;s[19]=o.delay;s[20]=(o.disabled?1:0);s[21]=o.displayList;s[22]=(o.dragEnabled?1:0);s[23]=(o.dropEnabled?1:0);s[24]=o.dropdownHeight;s[25]=o.dropdownWidth;s[26]=(o.dynamic?1:0);s[27]=(o.editable?1:0);s[28]=o.enclosingClass;s[29]=o.enclosingStyle;s[30]=o.error;s[31]=o.height;s[32]=(o.hidden?1:0);s[33]=o.hint;s[34]=o.hintClass;s[35]=o.hintStyle;s[36]=(o.hzScroll?1:0);s[37]=o.inputtype;s[38]=(o.invalid?1:0);s[39]=o.invalidMessage;s[40]=(o.isDropdownVisible?1:0);s[41]=o.label;s[42]=o.labelClass;s[43]=o.labelDisabledClass;s[44]=o.labelStyle;s[45]=o.maxlength;s[46]=o.onafterdrag;s[47]=o.onbeforedrag;s[48]=o.onblur;s[49]=o.onchange;s[50]=o.onclick;s[51]=o.ondblclick;s[52]=o.ondrag;s[53]=o.ondrop;s[54]=o.onfocus;s[55]=o.onhide;s[56]=o.onkeydown;s[57]=o.onkeypress;s[58]=o.onkeyup;s[59]=o.onmousedown;s[60]=o.onmouseout;s[61]=o.onmouseover;s[62]=o.onmouseup;s[63]=o.onrefresh;s[64]=o.onshow;s[65]=o.onsubmit;s[66]=o.ontouchend;s[67]=o.ontouchmove;s[68]=o.ontouchstart;s[69]=o.onupdate;s[70]=o.onvalidate;s[71]=set.serializeList(o,o.options,true,'options');s[72]=o.originalValue;s[73]=o.overlayMode;s[74]=o.placeholder;s[75]=(o.readOnly?1:0);s[76]=o.renderFlag;s[77]=(o.required?1:0);s[78]=o.requiredMessage;s[79]=(o.scrollIntoView?1:0);s[80]=o.selectedIndex;s[81]=(o.showLabel?1:0);s[82]=o.size;s[83]=o.slice;s[84]=(o.spellcheck?1:0);s[85]=o.tabIndex;s[86]=o.text;s[87]=o.title;s[88]=o.tuple;s[89]=(o.unrestricted?1:0);s[90]=o.valign;s[91]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[92]=o.valueList;s[93]=(o.visible?1:0);s[94]=o.width;
}
function _ZEN_Component_combobox_getSettings(s)
{
	s['name'] = 'string';
	s['displayList'] = 'csv';
	s['valueList'] = 'csv';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_combobox_appendOption = function(value,text,style) {
var option = zenPage.createComponent('option');
if (value != null) option.value = value;
option.text = (text != null) ? text : option.value;
if (style != null) option.style = style;
this.options[this.options.length] = option;
}

self._ZEN_Component_combobox_getOption = function(idx) {
return ('' == this.valueList) ? this.options[idx] : null;
}

self._ZEN_Component_combobox_getOptionCount = function() {
var valueList = this.valueList;
valueList = valueList.replace(/\\,/g,'\x01');
return ('' == valueList) ? this.options.length : valueList.split(',').length;
}

self._ZEN_Component_combobox_getOptionText = function(idx) {
var text;
if ('' != this.valueList) {
if ('' != this.displayList) {
var displayList = this.displayList;
displayList = displayList.replace(/\\,/g,'\x01');
text = displayList.split(',')[idx];
text = text.replace(/\x01/g,',');
}
else {
var valueList = this.valueList;
valueList = valueList.replace(/\\,/g,'\x01');
text = valueList.split(',')[idx];
text = text.replace(/\x01/g,',');
}
}
else {
text = this.options[idx].text;
}
return (null == text) ? '' : text;
}

self._ZEN_Component_combobox_getOptionValue = function(idx) {
var value;
if ('' != this.valueList) {
var valueList = this.valueList;
valueList = valueList.replace(/\\,/g,'\x01');
value = valueList.split(',')[idx];
value = value.replace(/\x01/g,',');
}
else {
value = this.options[idx].value;
}
return (null == value) ? '' : value;
}

self._ZEN_Component_combobox_removeOption = function(index) {
this.options.splice(index,1);
}

self._ZEN_Component_combobox_renderDropdown = function() {
var div = this.getDropDownDiv();
zenASSERT(div,'Unable to find DropDown element',arguments);
var html = new Array();
html[html.length] = '<table class="comboboxTable" width="100%" border="0" cellpadding="0" cellspacing="0">';
if ('' != this.valueList) {
var valueList = this.valueList;
valueList = valueList.replace(/\\,/g,'\x01');
var displayList = this.displayList;
displayList = displayList.replace(/\\,/g,'\x01');
var values = valueList.split(',');
var texts = (''==displayList) ? values : displayList.split(',');
for (var n = 0; n < values.length; n++) {
var val = values[n];
val = val.replace(/\x01/g,',');
var text = texts[n];
text = text.replace(/\x01/g,',');
text = (''==text) ? '&#160;' : zenEscapeHTMLSafe(text);
html[html.length] = '<tr id="item_'+n+'_'+this.index+'" class="comboboxItem" onmousedown="zenPage.getComponent('+this.index+').itemMouseDown(event,'+n+');" onmouseup="zenPage.getComponent('+this.index+').itemMouseUp(event,'+n+');"><td width="100%"><a href="#">'+text+'<\/a><\/td><\/tr>';
}
}
else {
for (var n = 0; n < this.options.length; n++) {
var option = this.options[n];
var val = option.value;
var text = option.text.toString();
text = ('' == text) ? '&#160;' : zenEscapeHTMLSafe(text);
html[html.length] = '<tr id="item_'+n+'_'+this.index+'" class="comboboxItem" onmousedown="zenPage.getComponent('+this.index+').itemMouseDown(event,'+n+');" onmouseup="zenPage.getComponent('+this.index+').itemMouseUp(event,'+n+');"><td style="'+zenEscapeHTML(option.style)+'" width="100%"><a href="#">'+text+'<\/a><\/td><\/tr>';
}
}
html[html.length] = '<\/table>';
div.innerHTML = html.join("");
zenPage.lastModalIndex = this.index;
var input = this.findElement('input');
zenASSERT(input,'Unable to find input element',arguments);
input.focus();
this.isDropdownVisible = (div.style.display != 'none');
this.findSelectedItem();
}

self._ZEN_Component_combobox_resetOptions = function() {
this.valueList = '';
this.displayList = '';
this.options.length = 0;
this.selectedIndex = -1;
this.text = '';
this.setValue('');
}

self._ZEN_Component_combobox_setOption = function(index,value,text,style) {
var option = this.options[index];
if (null != option) {
if (value != null) option.value = value;
option.text = (text != null) ? text : option.value;
if (style != null) option.style = style;
}
}

self._ZEN_Component_combobox_setProperty = function(property,value,value2) {
switch(property) {
case 'valueList':
if (this.valueList != value) {
this.valueList = value;
this.setValue(this.getValue());
}
break;
case 'displayList':
if (this.displayList != value) {
this.displayList = value;
this.setValue(this.getValue());
}
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_combobox_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_combobox__Loader = function() {
	zenLoadClass('_ZEN_Component_abstractComboBox');
	_ZEN_Component_combobox.prototype = zenCreate('_ZEN_Component_abstractComboBox',-1);
	var p = _ZEN_Component_combobox.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_combobox;
	p.superClass = ('undefined' == typeof _ZEN_Component_abstractComboBox) ? zenMaster._ZEN_Component_abstractComboBox.prototype:_ZEN_Component_abstractComboBox.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.combobox';
	p._type = 'combobox';
	p.serialize = _ZEN_Component_combobox_serialize;
	p.getSettings = _ZEN_Component_combobox_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_combobox_ReallyRefreshContents;
	p.appendOption = _ZEN_Component_combobox_appendOption;
	p.getOption = _ZEN_Component_combobox_getOption;
	p.getOptionCount = _ZEN_Component_combobox_getOptionCount;
	p.getOptionText = _ZEN_Component_combobox_getOptionText;
	p.getOptionValue = _ZEN_Component_combobox_getOptionValue;
	p.removeOption = _ZEN_Component_combobox_removeOption;
	p.renderDropdown = _ZEN_Component_combobox_renderDropdown;
	p.resetOptions = _ZEN_Component_combobox_resetOptions;
	p.setOption = _ZEN_Component_combobox_setOption;
	p.setProperty = _ZEN_Component_combobox_setProperty;
}

self._zenClassIdx['dataCombo'] = '_ZEN_Component_dataCombo';
self._ZEN_Component_dataCombo = function(index,id) {
	if (index>=0) {_ZEN_Component_dataCombo__init(this,index,id);}
}

self._ZEN_Component_dataCombo__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_abstractComboBox__init) ?zenMaster._ZEN_Component_abstractComboBox__init(o,index,id):_ZEN_Component_abstractComboBox__init(o,index,id);
	o.OnCreateResultSet = ''; // encrypted
	o.OnExecuteResultSet = ''; // encrypted
	o.auxColumn = '1';
	o.cached = false;
	o.choiceColumn = '2';
	o.clearOnLoad = false;
	o.columnHeaders = '';
	o.columnName = '';
	o.conditions = new Array();
	o.contentType = 'text';
	o.countRows = '0';
	o.dataLoaded = false;
	o.displayColumns = '';
	o.emptyText = '';
	o.groupByClause = '';
	o.itemCount = '0';
	o.loadingMessage = '';
	o.maxRows = '100';
	o.modelClass = '';
	o.multiColumn = true;
	o.onshowDropdown = '';
	o.orderByClause = '';
	o.parameters = new Array();
	o.queryClass = ''; // encrypted
	o.queryName = '';
	o.searchKeyLen = '0';
	o.showEmpty = true;
	o.showQuery = ''; // encrypted
	o.sql = ''; // encrypted
	o.sqlLookup = ''; // encrypted
	o.tableName = ''; // encrypted
	o.valueColumn = '1';
	o.whereClause = '';
}
function _ZEN_Component_dataCombo_serialize(set,s)
{
	var o = this;s[0]='3827919566';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.OnCreateResultSet;s[7]=o.OnExecuteResultSet;s[8]=o.align;s[9]=o.autocomplete;s[10]=o.aux;s[11]=o.auxColumn;s[12]=o.buttonCaption;s[13]=o.buttonImage;s[14]=o.buttonImageDown;s[15]=o.buttonTitle;s[16]=(o.cached?1:0);s[17]=o.choiceColumn;s[18]=(o.clearOnLoad?1:0);s[19]=o.clientType;s[20]=o.columnHeaders;s[21]=o.columnName;s[22]=o.comboType;s[23]=set.serializeList(o,o.conditions,true,'conditions');s[24]=o.containerStyle;s[25]=o.contentType;s[26]=o.controlClass;s[27]=o.controlStyle;s[28]=o.countRows;s[29]=o.dataBinding;s[30]=(o.dataLoaded?1:0);s[31]=o.delay;s[32]=(o.disabled?1:0);s[33]=o.displayColumns;s[34]=(o.dragEnabled?1:0);s[35]=(o.dropEnabled?1:0);s[36]=o.dropdownHeight;s[37]=o.dropdownWidth;s[38]=(o.dynamic?1:0);s[39]=(o.editable?1:0);s[40]=o.emptyText;s[41]=o.enclosingClass;s[42]=o.enclosingStyle;s[43]=o.error;s[44]=o.groupByClause;s[45]=o.height;s[46]=(o.hidden?1:0);s[47]=o.hint;s[48]=o.hintClass;s[49]=o.hintStyle;s[50]=(o.hzScroll?1:0);s[51]=o.inputtype;s[52]=(o.invalid?1:0);s[53]=o.invalidMessage;s[54]=(o.isDropdownVisible?1:0);s[55]=o.itemCount;s[56]=o.label;s[57]=o.labelClass;s[58]=o.labelDisabledClass;s[59]=o.labelStyle;s[60]=o.loadingMessage;s[61]=o.maxRows;s[62]=o.maxlength;s[63]=o.modelClass;s[64]=(o.multiColumn?1:0);s[65]=o.onafterdrag;s[66]=o.onbeforedrag;s[67]=o.onblur;s[68]=o.onchange;s[69]=o.onclick;s[70]=o.ondblclick;s[71]=o.ondrag;s[72]=o.ondrop;s[73]=o.onfocus;s[74]=o.onhide;s[75]=o.onkeydown;s[76]=o.onkeypress;s[77]=o.onkeyup;s[78]=o.onmousedown;s[79]=o.onmouseout;s[80]=o.onmouseover;s[81]=o.onmouseup;s[82]=o.onrefresh;s[83]=o.onshow;s[84]=o.onshowDropdown;s[85]=o.onsubmit;s[86]=o.ontouchend;s[87]=o.ontouchmove;s[88]=o.ontouchstart;s[89]=o.onupdate;s[90]=o.onvalidate;s[91]=o.orderByClause;s[92]=o.originalValue;s[93]=o.overlayMode;s[94]=set.serializeList(o,o.parameters,true,'parameters');s[95]=o.placeholder;s[96]=o.queryClass;s[97]=o.queryName;s[98]=(o.readOnly?1:0);s[99]=o.renderFlag;s[100]=(o.required?1:0);s[101]=o.requiredMessage;s[102]=(o.scrollIntoView?1:0);s[103]=o.searchKeyLen;s[104]=o.selectedIndex;s[105]=(o.showEmpty?1:0);s[106]=(o.showLabel?1:0);s[107]=o.showQuery;s[108]=o.size;s[109]=o.slice;s[110]=(o.spellcheck?1:0);s[111]=o.sql;s[112]=o.sqlLookup;s[113]=o.tabIndex;s[114]=o.tableName;s[115]=o.text;s[116]=o.title;s[117]=o.tuple;s[118]=(o.unrestricted?1:0);s[119]=o.valign;s[120]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[121]=o.valueColumn;s[122]=(o.visible?1:0);s[123]=o.whereClause;s[124]=o.width;
}
function _ZEN_Component_dataCombo_getSettings(s)
{
	s['name'] = 'string';
	s['auxColumn'] = 'string';
	s['cached'] = 'boolean';
	s['clearOnLoad'] = 'boolean';
	s['columnHeaders'] = 'csv';
	s['columnName'] = 'string';
	s['conditions'] = 'string';
	s['contentType'] = 'enum:text,html';
	s['countRows'] = 'integer';
	s['emptyText'] = 'caption';
	s['groupByClause'] = 'string';
	s['loadingMessage'] = 'caption';
	s['maxRows'] = 'integer';
	s['multiColumn'] = 'boolean';
	s['onshowDropdown'] = 'eventHandler';
	s['orderByClause'] = 'string';
	s['parameters'] = 'string';
	s['queryClass'] = 'className';
	s['queryName'] = 'classMember:QUERY';
	s['searchKeyLen'] = 'integer';
	s['showEmpty'] = 'boolean';
	s['showQuery'] = 'boolean';
	s['sql'] = 'sql';
	s['tableName'] = 'string';
	s['whereClause'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_dataCombo_clearCache = function() {
this.dataLoaded = false;
delete this._hasCache;
var cache = this.getCacheDiv();
if (cache) {
cache.innerHTML = '';
}
}

self._ZEN_Component_dataCombo_executeQuery = function(param) {
this.loadDropdown(param,false);
}

self._ZEN_Component_dataCombo_findDisplayValue = function(value) {
var text = this.invokeSuper('findDisplayValue',arguments);
if (null == text && ('' != this.sqlLookup)) {
var form = this.getForm();
if (form) {
var controller = form.getController();
if (controller) {
this.modelClass = controller.getProperty('modelClass');
}
}
text = this.LookupDisplayValue(value);
}
return text;
}

self._ZEN_Component_dataCombo_getAuxValue = function() {
if (this.selectedIndex < 0) return '';
var value = this.getOptionAux(this.selectedIndex);
return (null==value) ? '' : value;
}

self._ZEN_Component_dataCombo_getOptionAux = function(idx) {
var value = '';
var tr = self.document.getElementById('item_' + idx + '_' + this.index);
if (tr) {
value = tr.getAttribute('zenAux');
}
return value;
}

self._ZEN_Component_dataCombo_getOptionCount = function() {
return (this.itemCount!=null) ? this.itemCount : 0;
}

self._ZEN_Component_dataCombo_getOptionText = function(idx) {
var value = '';
var tr = self.document.getElementById('item_' + idx + '_' + this.index);
if (tr) {
value = tr.getAttribute('zenText');
}
return value;
}

self._ZEN_Component_dataCombo_getOptionValue = function(idx) {
var value = '';
var tr = self.document.getElementById('item_' + idx + '_' + this.index);
if (tr) {
value = tr.getAttribute('zenValue');
}
return value;
}

self._ZEN_Component_dataCombo_loadDropdown = function(value,show) {
value = (null == value) ? '' : value;
if (show) {
ret = zenInvokeCallbackMethod(this.onshowDropdown,this,'onshowDropdown');
if (null != ret) {
value = ret;
}
}
if (this.searchKeyLen >= 0) {
value = value.substr(0,this.searchKeyLen);
}
var cache = this.getCacheDiv();
if (this.cached && cache.innerHTML != '') {
this._hasCache = true;
if (null == this.lastValue && value == '') {
this.lastValue = '';
}
}
else this._hasCache = false;
if (cache) {
if ((this._hasCache) && this.dataLoaded && (this.lastValue == value)) {
if (show) {
var div = this.getDropDownDiv();
div.innerHTML = cache.innerHTML;
cache.innerHTML = '';
delete this._hasCache;
var input = this.findElement('input');
if (input) {
input.focus();
}
this.isDropdownVisible = true;
this.findSelectedItem();
}
return;
}
else {
cache.innerHTML = '';
delete this._hasCache;
}
}
this.dataLoaded = false;
this.lastValue = value;
if (show) {
zenPage.lastModalIndex = this.index;
var div = this.getDropDownDiv();
this.startProgressBar(div);
div.innerHTML = '<span class="comboboxLoading">' + this.loadingMessage + '</span>';
}
this.modelClass = '';
var form = this.getForm();
if (form) {
var controller = form.getController();
if (controller) {
this.modelClass = controller.getProperty('modelClass');
}
}
this.LoadDropDownContents(value,show?0:1);
}

self._ZEN_Component_dataCombo_renderDropdown = function() {
var input = this.findElement('input');
zenASSERT(input,'Unable to find input element',arguments);
var value = input.value;
this.loadDropdown(value,true);
}

self._ZEN_Component_dataCombo_restoreConditionalStyle = function(trEl) {
trEl.setAttribute("style",zenGet(trEl.oldStyle));
for (var i = 0; i < trEl.children.length; i++) {
this.restoreConditionalStyle(trEl.children[i]);
}
}

self._ZEN_Component_dataCombo_selectItem = function(idx,show,update) {
var out = zenPage.getComponentById('events');
var input = this.findElement('input');
var hidden = this.findElement('hidden');
zenASSERT(input,'Unable to find input element',arguments);
zenASSERT(hidden,'Unable to find hidden element',arguments);
var value,text;
if (parseInt(this.selectedIndex,10) >= 0) {
var el = this.getItemEl(parseInt(this.selectedIndex,10));
if (el) {
el.className = 'comboboxItem';
this.restoreConditionalStyle(el);
}
}
var size = this.getOptionCount();
if (idx < 0 || idx > size) {
this.selectedIndex = -1;
value = '';
text = '';
}
else {
idx = parseInt(idx,10);
this.selectedIndex = idx;
value = this.getOptionValue(idx);
text = this.getOptionText(idx);
var el = this.getItemEl(this.selectedIndex);
if (el) {
el.className = 'comboboxItemSelected';
this.storeConditionalStyle(el);
if (show && this.scrollIntoView) {
if (this.selectedIndex == 0) {
this.getDropDownDiv().scrollTop = 0;
}
else {
zenScrollIntoView(this.getDropDownDiv(),el,!this.hzScroll);
}
}
}
}
if (update) {
this.value = value;
this.text = text;
hidden.value = value;
input.value = text;
this.onchangeHandler();
}
}

self._ZEN_Component_dataCombo_setProperty = function(property,value,value2) {
switch(property) {
case 'itemCount':
break;
case 'parameters':
if ('' != value) {
value = value - 1;
if (this.parameters[value]) {
if (this.parameters[value].value != value2) {
this.parameters[value].value = value2;
this.clearCache();
}
}
}
break;
default:
return this.invokeSuper('setProperty',arguments);
break;
}
return true;
}

self._ZEN_Component_dataCombo_storeConditionalStyle = function(trEl) {
trEl.oldStyle = trEl.getAttribute("style");
trEl.setAttribute("style","");
for (var i = 0; i < trEl.children.length; i++) {
this.storeConditionalStyle(trEl.children[i]);
}
}

self._ZEN_Component_dataCombo_LoadDropDownContents = function(searchParm,cached) {
	zenInstanceMethod(this,'LoadDropDownContents','L,B','',arguments);
}

self._ZEN_Component_dataCombo_LookupDisplayValue = function(value) {
	return zenInstanceMethod(this,'LookupDisplayValue','L','VARCHAR',arguments);
}

self._ZEN_Component_dataCombo_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_dataCombo__Loader = function() {
	zenLoadClass('_ZEN_Component_abstractComboBox');
	_ZEN_Component_dataCombo.prototype = zenCreate('_ZEN_Component_abstractComboBox',-1);
	var p = _ZEN_Component_dataCombo.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_dataCombo;
	p.superClass = ('undefined' == typeof _ZEN_Component_abstractComboBox) ? zenMaster._ZEN_Component_abstractComboBox.prototype:_ZEN_Component_abstractComboBox.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.dataCombo';
	p._type = 'dataCombo';
	p.serialize = _ZEN_Component_dataCombo_serialize;
	p.getSettings = _ZEN_Component_dataCombo_getSettings;
	p.LoadDropDownContents = _ZEN_Component_dataCombo_LoadDropDownContents;
	p.LookupDisplayValue = _ZEN_Component_dataCombo_LookupDisplayValue;
	p.ReallyRefreshContents = _ZEN_Component_dataCombo_ReallyRefreshContents;
	p.clearCache = _ZEN_Component_dataCombo_clearCache;
	p.executeQuery = _ZEN_Component_dataCombo_executeQuery;
	p.findDisplayValue = _ZEN_Component_dataCombo_findDisplayValue;
	p.getAuxValue = _ZEN_Component_dataCombo_getAuxValue;
	p.getOptionAux = _ZEN_Component_dataCombo_getOptionAux;
	p.getOptionCount = _ZEN_Component_dataCombo_getOptionCount;
	p.getOptionText = _ZEN_Component_dataCombo_getOptionText;
	p.getOptionValue = _ZEN_Component_dataCombo_getOptionValue;
	p.loadDropdown = _ZEN_Component_dataCombo_loadDropdown;
	p.renderDropdown = _ZEN_Component_dataCombo_renderDropdown;
	p.restoreConditionalStyle = _ZEN_Component_dataCombo_restoreConditionalStyle;
	p.selectItem = _ZEN_Component_dataCombo_selectItem;
	p.setProperty = _ZEN_Component_dataCombo_setProperty;
	p.storeConditionalStyle = _ZEN_Component_dataCombo_storeConditionalStyle;
}

self._zenClassIdx['dynaForm'] = '_ZEN_Component_dynaForm';
self._ZEN_Component_dynaForm = function(index,id) {
	if (index>=0) {_ZEN_Component_dynaForm__init(this,index,id);}
}

self._ZEN_Component_dynaForm__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_form__init) ?zenMaster._ZEN_Component_form__init(o,index,id):_ZEN_Component_form__init(o,index,id);
	o.OnGetPropertyInfo = ''; // encrypted
	o.controller = '';
	o.controllerId = '';
	o.defaultGroupId = '';
	o.injectControls = 'after';
	o.ongetcontroller = '';
	o.onnotifyView = '';
}
function _ZEN_Component_dynaForm_serialize(set,s)
{
	var o = this;s[0]='417270009';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.OnGetPropertyInfo;s[7]=o.OnLoadForm;s[8]=o.OnSubmitForm;s[9]=o.action;s[10]=o.align;s[11]=(o.autoValidate?1:0);s[12]=(o.autocomplete?1:0);s[13]=o.aux;s[14]=o.cellAlign;s[15]=o.cellSize;s[16]=o.cellStyle;s[17]=o.cellVAlign;s[18]=set.serializeList(o,o.children,true,'children');s[19]=o.containerStyle;s[20]=o.controller;s[21]=o.controllerId;s[22]=o.defaultGroupId;s[23]=(o.disabled?1:0);s[24]=(o.dragEnabled?1:0);s[25]=(o.dropEnabled?1:0);s[26]=(o.dynamic?1:0);s[27]=o.enclosingClass;s[28]=o.enclosingStyle;s[29]=o.enctype;s[30]=o.error;s[31]=o.groupClass;s[32]=o.groupStyle;s[33]=o.height;s[34]=(o.hidden?1:0);s[35]=o.hint;s[36]=o.hintClass;s[37]=o.hintStyle;s[38]=o.injectControls;s[39]=o.invalidMessage;s[40]=o.key;s[41]=o.label;s[42]=o.labelClass;s[43]=o.labelDisabledClass;s[44]=o.labelPosition;s[45]=o.labelStyle;s[46]=o.layout;s[47]=o.messageTargetId;s[48]=o.method;s[49]=o.nextPage;s[50]=o.noModelMessage;s[51]=o.onafterdrag;s[52]=o.onbeforedrag;s[53]=o.onchange;s[54]=o.onclick;s[55]=o.ondefault;s[56]=o.ondrag;s[57]=o.ondrop;s[58]=o.ongetcontroller;s[59]=o.onhide;s[60]=o.oninvalid;s[61]=o.onnotifyView;s[62]=o.onrefresh;s[63]=o.onreset;s[64]=o.onshow;s[65]=o.onsubmit;s[66]=o.onupdate;s[67]=o.onvalidate;s[68]=o.overlayMode;s[69]=(o.propagateChanges?1:0);s[70]=o.readOnlyMessage;s[71]=o.renderFlag;s[72]=(o.showLabel?1:0);s[73]=o.slice;s[74]=o.target;s[75]=o.title;s[76]=o.tuple;s[77]=o.valign;s[78]=(o.visible?1:0);s[79]=o.width;
}
function _ZEN_Component_dynaForm_getSettings(s)
{
	s['name'] = 'string';
	s['controllerId'] = 'id';
	s['defaultGroupId'] = 'id';
	s['injectControls'] = 'enum:before,after';
	s['ongetcontroller'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_dynaForm_connectToController = function() {
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

self._ZEN_Component_dynaForm_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._ZEN_Component_dynaForm_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._ZEN_Component_dynaForm_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._ZEN_Component_dynaForm_notifyViewHandler = function(reason,data1,data2,data3) {
switch(reason) {
case 'modelChange':
if (null != this.controller) {
var ok = this.RecreateForm(this.controller);
}
break;
default:
return this.invokeSuper('notifyViewHandler',arguments);
}
return true;
}

self._ZEN_Component_dynaForm_onRefreshContents = function() {
this.bindValues(null,true);
}

self._ZEN_Component_dynaForm_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._ZEN_Component_dynaForm_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._ZEN_Component_dynaForm_setProperty = function(property,value,value2) {
switch(property) {
case 'defaultGroupId':
form[property] = value;
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_dynaForm_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}

self._ZEN_Component_dynaForm_RecreateForm = function(pController) {
	return zenInstanceMethod(this,'RecreateForm','O','BOOLEAN',arguments);
}

self._ZEN_Component_dynaForm_ReloadForm = function(pFormIndex,pKey) {
	zenInstanceMethod(this,'ReloadForm','L,L','',arguments);
}
self._ZEN_Component_dynaForm__Loader = function() {
	zenLoadClass('_ZEN_Component_form');
	_ZEN_Component_dynaForm.prototype = zenCreate('_ZEN_Component_form',-1);
	var p = _ZEN_Component_dynaForm.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_dynaForm;
	p.superClass = ('undefined' == typeof _ZEN_Component_form) ? zenMaster._ZEN_Component_form.prototype:_ZEN_Component_form.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.dynaForm';
	p._type = 'dynaForm';
	p.serialize = _ZEN_Component_dynaForm_serialize;
	p.getSettings = _ZEN_Component_dynaForm_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_dynaForm_ReallyRefreshContents;
	p.RecreateForm = _ZEN_Component_dynaForm_RecreateForm;
	p.ReloadForm = _ZEN_Component_dynaForm_ReloadForm;
	p.connectToController = _ZEN_Component_dynaForm_connectToController;
	p.disconnectFromController = _ZEN_Component_dynaForm_disconnectFromController;
	p.getController = _ZEN_Component_dynaForm_getController;
	p.notifyView = _ZEN_Component_dynaForm_notifyView;
	p.notifyViewHandler = _ZEN_Component_dynaForm_notifyViewHandler;
	p.onRefreshContents = _ZEN_Component_dynaForm_onRefreshContents;
	p.sendEventToController = _ZEN_Component_dynaForm_sendEventToController;
	p.setControllerId = _ZEN_Component_dynaForm_setControllerId;
	p.setProperty = _ZEN_Component_dynaForm_setProperty;
}
/* EOF */