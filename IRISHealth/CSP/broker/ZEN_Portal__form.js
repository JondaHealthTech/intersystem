/*** Zen Module: ZEN_Portal__form ***/

self._zenClassIdx['assistedText'] = '_ZEN_Portal_assistedText';
self._ZEN_Portal_assistedText = function(index,id) {
	if (index>=0) {_ZEN_Portal_assistedText__init(this,index,id);}
}

self._ZEN_Portal_assistedText__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_control__init) ?zenMaster._ZEN_Component_control__init(o,index,id):_ZEN_Component_control__init(o,index,id);
	o.OnUpdateDataServer = ''; // encrypted
	o.controlClass = 'assistedText';
	o.controlType = 'custom';
	o.controlWidth = '';
	o.hideGhost = false;
	o.isSuggestedDataComplete = false;
	o.listSize = '5';
	o.onUpdateDataClient = '';
	o.placeholder = '';
	o.separator = ',';
	o.triggerChars = '.';
	o.onCreate();
}
function _ZEN_Portal_assistedText_serialize(set,s)
{
	var o = this;s[0]='2773506197';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.OnUpdateDataServer;s[7]=o.align;s[8]=o.aux;s[9]=o.clientType;s[10]=o.containerStyle;s[11]=o.controlClass;s[12]=o.controlStyle;s[13]=o.controlType;s[14]=o.controlWidth;s[15]=o.dataBinding;s[16]=(o.disabled?1:0);s[17]=(o.dragEnabled?1:0);s[18]=(o.dropEnabled?1:0);s[19]=(o.dynamic?1:0);s[20]=o.enclosingClass;s[21]=o.enclosingStyle;s[22]=o.error;s[23]=o.height;s[24]=(o.hidden?1:0);s[25]=(o.hideGhost?1:0);s[26]=o.hint;s[27]=o.hintClass;s[28]=o.hintStyle;s[29]=(o.invalid?1:0);s[30]=o.invalidMessage;s[31]=(o.isSuggestedDataComplete?1:0);s[32]=o.label;s[33]=o.labelClass;s[34]=o.labelDisabledClass;s[35]=o.labelStyle;s[36]=o.listSize;s[37]=o.onUpdateDataClient;s[38]=o.onafterdrag;s[39]=o.onbeforedrag;s[40]=o.onblur;s[41]=o.onchange;s[42]=o.onclick;s[43]=o.ondblclick;s[44]=o.ondrag;s[45]=o.ondrop;s[46]=o.onfocus;s[47]=o.onhide;s[48]=o.onkeydown;s[49]=o.onkeypress;s[50]=o.onkeyup;s[51]=o.onmousedown;s[52]=o.onmouseout;s[53]=o.onmouseover;s[54]=o.onmouseup;s[55]=o.onrefresh;s[56]=o.onshow;s[57]=o.onsubmit;s[58]=o.ontouchend;s[59]=o.ontouchmove;s[60]=o.ontouchstart;s[61]=o.onupdate;s[62]=o.onvalidate;s[63]=o.originalValue;s[64]=o.overlayMode;s[65]=o.placeholder;s[66]=(o.readOnly?1:0);s[67]=o.renderFlag;s[68]=(o.required?1:0);s[69]=o.requiredMessage;s[70]=o.separator;s[71]=(o.showLabel?1:0);s[72]=o.slice;s[73]=o.tabIndex;s[74]=o.title;s[75]=o.triggerChars;s[76]=o.tuple;s[77]=o.valign;s[78]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[79]=(o.visible?1:0);s[80]=o.width;
}
function _ZEN_Portal_assistedText_getSettings(s)
{
	s['name'] = 'string';
	s['controlType'] = 'string';
	s['controlWidth'] = 'string';
	s['hideGhost'] = 'boolean';
	s['isSuggestedDataComplete'] = 'boolean';
	s['listSize'] = 'integer';
	s['onUpdateDataClient'] = 'eventHandler';
	s['placeholder'] = 'string';
	s['separator'] = 'string';
	s['triggerChars'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Portal_assistedText_controlClicked = function() {
this.doAction(1);
return;
}

self._ZEN_Portal_assistedText_controlGotFocus = function() {
if ( this.controlHasFocus != true ) {
this.originalValue = this.findElement("control").value;
}
this.controlHasFocus = true;
return;
}

self._ZEN_Portal_assistedText_controlKeyPressed = function(event) {
var doAction = true;
if ( event.keyCode==39 ) {
if ( this.iFrameCreated ) { this.findElement("selectorIFrame").style.display = "none;"; }
this.findElement("selector").style.display = "none";
}
if ( event.keyCode==9 ) {
if ( this.findElement("selector").style.display == "block") {
if ( this.iFrameCreated ) { this.findElement("selectorIFrame").style.display = "none"; }
this.findElement("selector").style.display = "none";
ZLM.killEvent(event);
}
}
if ( event.keyCode==13 ) {
if ( this.findElement("selector").style.display == "block") {
if ( this.iFrameCreated ) { this.findElement("selectorIFrame").style.display = "none"; }
this.findElement("selector").style.display = "none";
} else {
if ( this.originalTextValue != this.findElement("control").value ) {
this.onchangeHandler();
this.originalTextValue = this.findElement("control").value;
}
}
}
if ( event.keyCode==27 ) {
setTimeout("zenPage.getComponent("+this.index+").deferredEscapeAction()",1);
return;
}
if ( event.keyCode==38 ) {
if ( this.findElement("selector").style.display != "none" ) {
if ( this.findElement("selector").selectedIndex < 0 ) {
this.findElement("selector").selectedIndex = this.findElement("selector").options.length-1;
} else {
this.findElement("selector").selectedIndex--;
}
this.selectorChanged();
doAction = false;
}
}
if ( event.keyCode==40 ) {
if ( this.findElement("selector").style.display != "none" ) {
if ( this.findElement("selector").selectedIndex < (this.findElement("selector").options.length-1) ) {
this.findElement("selector").selectedIndex++;
}
this.selectorChanged();
doAction = false;
}
}
if ( doAction ) {
window.setTimeout("zenPage.getComponent("+this.index+").doAction()",1);
window.setTimeout("zenPage.getComponent("+this.index+").deferredSaveCurrentTextValue('"+event.keyCode+"')",1);
}
return;
}

self._ZEN_Portal_assistedText_controlOnBlur = function(event) {
this.controlHasFocus = false;
this.blurHandler = setTimeout("zenPage.getComponent("+this.index+").deferredLostFocus();",0);
return;
}

self._ZEN_Portal_assistedText_deferredComboUpdate = function() {
this.setComboOptions(this.findElement("selector"),this.propertyListFiltered.join(this.separator),false);
this.findElement("selector").selectedIndex = -1;
return;
}

self._ZEN_Portal_assistedText_deferredEscapeAction = function() {
this.findElement("control").value = this.currentTextValue;
if ( this.iFrameCreated ) { this.findElement("selectorIFrame").style.display = "none"; }
this.findElement("selector").style.display = "none";
return;
}

self._ZEN_Portal_assistedText_deferredLostFocus = function() {
if ( this.controlHasFocus == true ) {
return;
}
if ( this.iFrameCreated ) { this.findElement("selectorIFrame").style.display = "none"; }
this.findElement("selector").style.display = "none";
if ( this.findElement("control").value != this.originalValue ) {
this.value = this.findElement("control").value;
var onchangeHandler = this.onchange;
if ( onchangeHandler.substr(0,7) != "return " ) { onchangeHandler = "return " + onchangeHandler; }
data = zenInvokeCallbackMethod(onchangeHandler,this,'onchange');
}
this.originalValue = "";
this.controlHasFocus = false;
return;
}

self._ZEN_Portal_assistedText_deferredSaveCurrentTextValue = function(keyCode) {
this.currentTextValue = this.findElement("control").value;
return;
}

self._ZEN_Portal_assistedText_doAction = function(skipModifiedCheck) {
var textValue = this.findElement("control").value;
if ( !skipModifiedCheck ) {
if ( textValue == this.currentTextValue ) return;
}
var lastIndex = -1;
if ( (this.controlType=="custom")&&(this.triggerChars=="") ) {
lastIndex = textValue.length-1;
} else {
var triggerChars = this.controlType=="custom" ? this.triggerChars : ".";
for ( var i=0 ; i<triggerChars.length ; i++ ) {
lastIndex = Math.max(lastIndex,textValue.lastIndexOf(triggerChars.charAt(i)));
}
}
var base = textValue.substr(0,lastIndex+1);
if ( base != this.base ) {
this.updateData(base);
var updatedData = true;
} else {
var updatedData = false;
}
var textProperty = textValue.substr(lastIndex+1);
var textPropertyLength = textProperty.length;
var propertyFound = "";
var propertyListFiltered = new Array();
if ( this.isSuggestedDataComplete ) {
propertyListFiltered = this.propertyListComplete;
}
var extactMatchFound = false;
for ( var i=0 ; i<this.propertyListComplete.length ; i++ ) {
if ( this.propertyListComplete[i].substr(0,textPropertyLength) == textProperty ) {
if ( !this.isSuggestedDataComplete ) {
propertyListFiltered[propertyListFiltered.length] = base + this.propertyListComplete[i];
}
if ( propertyFound == "" ) {
propertyFound = (this.isSuggestedDataComplete?"":base) + this.propertyListComplete[i];
exactMatchFound = (propertyFound == textValue);
}
}
}
if ( propertyListFiltered.length < 1 ) {
if ( this.iFrameCreated ) { this.findElement("selectorIFrame").style.display = "none"; }
this.findElement("selector").style.display = "none";
} else if ( (propertyListFiltered.length==1) && (exactMatchFound==true) ) {
if ( this.iFrameCreated ) { this.findElement("selectorIFrame").style.display = "none"; }
this.findElement("selector").style.display = "none";
} else if ( (updatedData==false) && (exactMatchFound==true) ) {
if ( this.iFrameCreated ) { this.findElement("selectorIFrame").style.display = "none"; }
this.findElement("selector").style.display = "none";
} else {
if ((!this.iFrameCreated)) { //SAM055
var div = this.findElement("selectorParent");
var iFrame = document.createElement("iframe");
iFrame.id = this.makeId('selectorIFrame');
iFrame.src = '';
iFrame.frameBorder = '0';
var s = iFrame.style;
s.filter = 'alpha(opacity=0)';
s.zIndex = '0';
s.position = 'absolute';
s.top = '0px';
s.left = '0px';
s.width = '100%';
s.height = '100%';
s.border = '0px solid black';
s.background = 'transparent';
div._iFrame = iFrame;
div.insertBefore(div._iFrame,div.firstChild);
this.iFrameCreated = true;
}
this.findElement("selectorIFrame").style.display = "block";
this.setSelectorStyle();
this.findElement("selector").style.display = "block";
this.propertyListFiltered = propertyListFiltered;
setTimeout("zenPage.getComponent("+this.index+").deferredComboUpdate()",0);
}
return;
}

self._ZEN_Portal_assistedText_getSelection = function(ctrl) {
var selectionObject = {};
if (document.selection) {
ctrl.focus ();
var Sel = document.selection.createRange();
selectionObject.text = Sel.text;
Sel.moveStart ('character', -ctrl.value.length);
selectionObject.end = Sel.text.length;
selectionObject.start = selectionObject.end - selectionObject.text.length;
} else if (ctrl.selectionStart || ctrl.selectionStart == '0') {
selectionObject.start = ctrl.selectionStart;
selectionObject.end = ctrl.selectionEnd;
selectionObject.text = ctrl.value.substring(selectionObject.start,selectionObject.end);
}
return selectionObject;
}

self._ZEN_Portal_assistedText_onCreate = function() {
this.originalTextValue = this.value;
return;
}

self._ZEN_Portal_assistedText_selectorChanged = function() {
var select = this.findElement("selector")
if ( this.findElement("selector").selectedIndex == -1 ) {
this.findElement("control").value = this.currentTextValue;
} else {
this.findElement("control").value = select.options[select.selectedIndex].text;
}
return;
}

self._ZEN_Portal_assistedText_selectorDblClicked = function() {
this.doAction();
this.controlHasFocus = true;
this.findElement("control").focus();
return;
}

self._ZEN_Portal_assistedText_selectorGotFocus = function() {
this.controlHasFocus = true;
this.findElement("control").focus();
return;
}

self._ZEN_Portal_assistedText_setComboOptions = function(combo,options,insertBlank) {
if ( zenIsIE ) {
while ( combo.options.length > 0 ) { combo.options.remove(0); }
if ( insertBlank ) { combo.options.add(new Option("")); }
var optionsArray = options.split(this.separator)
for ( var i=0 ; i<optionsArray.length ; i++ ) {
var opt = new Option(optionsArray[i]);
combo.options.add(opt);
}
} else {
var optionsArray = options.split(this.separator)
var innerHTML = "";
if ( insertBlank ) { innerHTML = "<option></option>"; }
for ( i=0 ; i<optionsArray.length ; i++ ) {
innerHTML = innerHTML + "<option>" + optionsArray[i] + "</option>"
}
combo.innerHTML = innerHTML;
}
return;
}

self._ZEN_Portal_assistedText_setProperty = function(property,value,value2) {
switch(property) {
case 'disabled':
this.findElement('control').disabled = value;
break;
case 'controlWidth':
this.findElement('control').style.width = value;
break;
case 'controlType':
this.controlType = value;
this.updateData(this.base)
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Portal_assistedText_setSelection = function(ctrl,pos1,pos2) {
if(ctrl.setSelectionRange) {
ctrl.focus();
ctrl.setSelectionRange(pos1,pos2);
} else if (ctrl.createTextRange) {
var range = ctrl.createTextRange();
range.collapse(true);
range.moveEnd('character', pos2);
range.moveStart('character', pos1);
range.select();
}
}

self._ZEN_Portal_assistedText_setSelectorStyle = function() {
var control = this.findElement("control");
var selector = this.findElement("selector");
selector.style.top = (control.offsetHeight+4) + "px";
selector.style.width = control.offsetWidth + "px";
selector.style.fontFamily = ZLM.getComputedNodeStyle(control,"fontFamily");
selector.style.fontSize = ZLM.getComputedNodeStyle(control,"fontSize");
selector.style.zIndex = 32765;
return;
}

self._ZEN_Portal_assistedText_updateData = function(base) {
this.base = base;
var data = "";
if ( this.controlType != "custom" ) {
if ( this.controlType == "classname" ) {
data = this.ServerGetClassPackageList(base);
} else if ( this.controlType.substr(0,9) == "property:" ) {
data = this.ServerGetPropertyList(base,this.controlType.substr(9));
}
} else if ( this.onUpdateDataClient != "" ) {
var onUpdateDataClient = this.onUpdateDataClient;
if ( onUpdateDataClient.substr(0,7) != "return " ) { onUpdateDataClient = "return " + onUpdateDataClient; }
data = zenInvokeCallbackMethod(onUpdateDataClient,this,'onUpdateDataClient',"base",base);
}
this.propertyListComplete = new Array();
this.separator=data.charAt(0);
this.propertyListComplete = data.substr(1).split(this.separator);
return;
}

self._ZEN_Portal_assistedText_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}

self._ZEN_Portal_assistedText_ServerGetClassPackageList = function(pBase) {
	return zenClassMethod(this,'ServerGetClassPackageList','L','VARCHAR',arguments);
}

self._ZEN_Portal_assistedText_ServerGetPropertyList = function(pBase,pClassname) {
	return zenClassMethod(this,'ServerGetPropertyList','L,L','VARCHAR',arguments);
}
self._ZEN_Portal_assistedText__Loader = function() {
	zenLoadClass('_ZEN_Component_control');
	_ZEN_Portal_assistedText.prototype = zenCreate('_ZEN_Component_control',-1);
	var p = _ZEN_Portal_assistedText.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Portal_assistedText;
	p.superClass = ('undefined' == typeof _ZEN_Component_control) ? zenMaster._ZEN_Component_control.prototype:_ZEN_Component_control.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Portal.assistedText';
	p._type = 'assistedText';
	p.serialize = _ZEN_Portal_assistedText_serialize;
	p.getSettings = _ZEN_Portal_assistedText_getSettings;
	p.ReallyRefreshContents = _ZEN_Portal_assistedText_ReallyRefreshContents;
	p.ServerGetClassPackageList = _ZEN_Portal_assistedText_ServerGetClassPackageList;
	p.ServerGetPropertyList = _ZEN_Portal_assistedText_ServerGetPropertyList;
	p.controlClicked = _ZEN_Portal_assistedText_controlClicked;
	p.controlGotFocus = _ZEN_Portal_assistedText_controlGotFocus;
	p.controlKeyPressed = _ZEN_Portal_assistedText_controlKeyPressed;
	p.controlOnBlur = _ZEN_Portal_assistedText_controlOnBlur;
	p.deferredComboUpdate = _ZEN_Portal_assistedText_deferredComboUpdate;
	p.deferredEscapeAction = _ZEN_Portal_assistedText_deferredEscapeAction;
	p.deferredLostFocus = _ZEN_Portal_assistedText_deferredLostFocus;
	p.deferredSaveCurrentTextValue = _ZEN_Portal_assistedText_deferredSaveCurrentTextValue;
	p.doAction = _ZEN_Portal_assistedText_doAction;
	p.getSelection = _ZEN_Portal_assistedText_getSelection;
	p.onCreate = _ZEN_Portal_assistedText_onCreate;
	p.selectorChanged = _ZEN_Portal_assistedText_selectorChanged;
	p.selectorDblClicked = _ZEN_Portal_assistedText_selectorDblClicked;
	p.selectorGotFocus = _ZEN_Portal_assistedText_selectorGotFocus;
	p.setComboOptions = _ZEN_Portal_assistedText_setComboOptions;
	p.setProperty = _ZEN_Portal_assistedText_setProperty;
	p.setSelection = _ZEN_Portal_assistedText_setSelection;
	p.setSelectorStyle = _ZEN_Portal_assistedText_setSelectorStyle;
	p.updateData = _ZEN_Portal_assistedText_updateData;
}

self._zenClassIdx['selector'] = '_ZEN_Portal_selector';
self._ZEN_Portal_selector = function(index,id) {
	if (index>=0) {_ZEN_Portal_selector__init(this,index,id);}
}

self._ZEN_Portal_selector__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_control__init) ?zenMaster._ZEN_Component_control__init(o,index,id):_ZEN_Component_control__init(o,index,id);
	o.context = '';
	o.controlClass = 'selectorInput';
	o.multiSelect = false;
	o.onkeyup = '';
	o.separator = ',';
	o.size = '';
}
function _ZEN_Portal_selector_serialize(set,s)
{
	var o = this;s[0]='1137397267';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.clientType;s[9]=o.containerStyle;s[10]=o.context;s[11]=o.controlClass;s[12]=o.controlStyle;s[13]=o.dataBinding;s[14]=(o.disabled?1:0);s[15]=(o.dragEnabled?1:0);s[16]=(o.dropEnabled?1:0);s[17]=(o.dynamic?1:0);s[18]=o.enclosingClass;s[19]=o.enclosingStyle;s[20]=o.error;s[21]=o.height;s[22]=(o.hidden?1:0);s[23]=o.hint;s[24]=o.hintClass;s[25]=o.hintStyle;s[26]=(o.invalid?1:0);s[27]=o.invalidMessage;s[28]=o.label;s[29]=o.labelClass;s[30]=o.labelDisabledClass;s[31]=o.labelStyle;s[32]=(o.multiSelect?1:0);s[33]=o.onafterdrag;s[34]=o.onbeforedrag;s[35]=o.onblur;s[36]=o.onchange;s[37]=o.onclick;s[38]=o.ondblclick;s[39]=o.ondrag;s[40]=o.ondrop;s[41]=o.onfocus;s[42]=o.onhide;s[43]=o.onkeydown;s[44]=o.onkeypress;s[45]=o.onkeyup;s[46]=o.onmousedown;s[47]=o.onmouseout;s[48]=o.onmouseover;s[49]=o.onmouseup;s[50]=o.onrefresh;s[51]=o.onshow;s[52]=o.onsubmit;s[53]=o.ontouchend;s[54]=o.ontouchmove;s[55]=o.ontouchstart;s[56]=o.onupdate;s[57]=o.onvalidate;s[58]=o.originalValue;s[59]=o.overlayMode;s[60]=(o.readOnly?1:0);s[61]=o.renderFlag;s[62]=(o.required?1:0);s[63]=o.requiredMessage;s[64]=o.separator;s[65]=(o.showLabel?1:0);s[66]=o.size;s[67]=o.slice;s[68]=o.tabIndex;s[69]=o.title;s[70]=o.tuple;s[71]=o.valign;s[72]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[73]=(o.visible?1:0);s[74]=o.width;
}
function _ZEN_Portal_selector_getSettings(s)
{
	s['name'] = 'string';
	s['context'] = 'uri';
	s['multiSelect'] = 'boolean';
	s['onkeyup'] = 'eventHandler';
	s['separator'] = 'string';
	s['size'] = 'integer';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Portal_selector_adjustDropdownPosition = function() {
if (!this._isModal) return;
var width = '';
var top = '';
var left = '';
var div = this.getModalDiv();
if (div) {
div.style.position = 'absolute';
var height = 250 + (2 * zenIsIE);
div.style.height = height + 'px';
var modalHeight = div.offsetHeight;
var screenHeight = zenGetWindowHeight();
var spaceUp,spaceDown;
var isDown = true;
var el = this.findElement('div');
if (el) {
var selectorBox = div.firstElementChild;
if (selectorBox) selectorBox.style.height = '';
width = el.offsetWidth;
var winScrollTop = zenGetPageScrollTop();
var elPos = zenGetPageOffsets(el);
spaceUp = elPos.top - winScrollTop;
spaceDown = screenHeight - spaceUp - el.offsetHeight - 2;
if ((modalHeight + 2) > spaceDown) { // dropdown won't fit as is
if (spaceDown > spaceUp) { // beneath is best option but must shorten menu
div.style.height = (spaceDown - 2) + 'px';
if (selectorBox) {
var innerDiff = selectorBox.offsetHeight - 250;
selectorBox.style.height = (spaceDown - 2 - innerDiff) + 'px';
}
top = elPos.top + el.offsetHeight + 2;
}
else { // open dropdown upwards
if ((modalHeight + 2) > spaceUp) {
div.style.height = (spaceUp - 2) + 'px';
if (selectorBox) {
var innerDiff = selectorBox.offsetHeight - 250;
selectorBox.style.height = (spaceUp - 2 - innerDiff) + 'px';
}
top = 0;
}
else {
top = elPos.top - modalHeight - 10;
}
isDown = false;
}
}
else {  // Dropdown is fine where it is but need to be in page coordinates
top = elPos.top + el.offsetHeight + 2;
}
left = elPos.left;
}
if (width == '') width = 300;
if (zenIsIE) {
if (top != '') {
top = top + (2 * isDown);
}
if (left != '') {
left = left + 2;
}
if (width != '') {
width = width + 2;
}
}
if (top != '') {
div.style.top = top + 'px';
}
if (left != '') {
div.style.left = left + 'px';
}
div.style.width = width + 'px';
}
}

self._ZEN_Portal_selector_adjustSize = function() {
var el = this.findElement('control');
var icon = this.findElement('icon');
var div = this.findElement('div');
if (el && icon && div) {
div.style.opacity = 1.0;
icon.style.width = el.offsetHeight + 'px';
icon.style.height = el.offsetHeight + 'px';
div.style.height = el.offsetHeight+2 + 'px';
if (el.offsetWidth == 0) { // don't try anything if we don't have client geometry
div.style.width = '';
el.style.width = '';
}
else {
div.style.width = el.offsetWidth + (this._iconHidden ? (zenIsIE * -2) : (el.offsetHeight+4)+(2*zenIsChrome)) + 'px';
if (this._iconHidden) {
el.style.width = (div.offsetWidth - 2 - (zenIsIE * 4)) + 'px';
if (el.style.height == '') {
el.style.height = (parseInt(div.style.height,10) - 3 - (zenIsIE * 2)) + 'px';
}
}
}
}
}

self._ZEN_Portal_selector_getModalDiv = function() {
return self.document.getElementById('zenModalDiv');
}

self._ZEN_Portal_selector_onDisplayHandler = function() {
this.adjustSize();
}

self._ZEN_Portal_selector_onEndModalHandler = function(zindex) {
var div = this.getModalDiv();
delete this._html;
this._isModal = false;
div.style.cssText = "display:none;";
div.className = "";
div.mousedown = null;
div.mouseup = null;
}

self._ZEN_Portal_selector_onStartModalHandler = function(zindex) {
var div = this.getModalDiv();
zenASSERT(div,'Unable to find modal div',arguments);
div.innerHTML = this._html;
this._isModal = true;
div.style.zIndex = zindex;
div.style.display = "";
div.scrollTop = 0;
this.adjustDropdownPosition();
zenPage.lastModalIndex = this.index;
}

self._ZEN_Portal_selector_onkeyupHandler = function(event,index) {
if ((event) && (index) && (event.type == 'keyup')) {
var keyCode = (zenIsIE ? event.keyCode : event.which);
var selector = zenPage.getComponent(index);
if (selector) {
switch(keyCode) {
case zenDOWN:
if (!selector._isModal) {
selector.showSelector();
}
break;
case zenESC:
if (selector._isModal) {
zenPage.endModal(selector);
}
break;
}
}
}
}

self._ZEN_Portal_selector_onloadHandler = function() {
this.adjustSize();
}

self._ZEN_Portal_selector_onresizeHandler = function() {
if (this._isModal) this.adjustDropdownPosition();
}

self._ZEN_Portal_selector_selectItem = function(value) {
if (!this.multiSelect) {
if (null != value) {
this.setValue(value);
}
zenPage.endModal(this);
var el = this.findElement('control');
try {
el.focus();
}
catch(ex) {
}
}
else {
var currVal = this.getValue();
var currArray = new Array();
var currValues = new Object();
if (currVal != '') {
currArray = currVal.split(this.separator);
for (var i=0; i<currArray.length; i++) {
if (currArray[i] != '') {
currValues[currArray[i]] = true;
}
}
}
if (value != null) {
currValues[value] = !currValues[value];
}
var newValues = new Array();
for (var i in currValues) {
if (currValues[i]) {
newValues[newValues.length] = i;
}
var checkbox = document.getElementById('multiSelect.'+this.index+'.'+i);
if (checkbox) {
checkbox.checked = currValues[i];
}
}
this.setValue(newValues.join(this.separator));
}
this.onchangeHandler();
}

self._ZEN_Portal_selector_setProperty = function(property,value,value2) {
var el = this.findElement('control');
switch(property) {
case 'size':
this.size = value;
if (el) { el.size = value; }
break;
case 'context':
this.context = value;
var hideIcon = (value == '') || this.disabled || this.readOnly;
this.toggleIconDisplay(hideIcon);
break;
case 'readOnly':
case 'disabled':
var hideIcon = (!!value) || (property == 'readOnly' ? this.disabled : this.readOnly) || (this.context == '');
this.toggleIconDisplay(hideIcon);
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Portal_selector_showDropdown = function(html) {
this._html = html;
zenPage.startModal(this);
}

self._ZEN_Portal_selector_showSelector = function() {
if (!(this.disabled || this.readOnly || (this.context == ''))) {
var context = this.context.toString();
var t = context.split('@');
if (t.length > 1) {
var context = t[0];
for (var n = 1; n < t.length; n++) {
var t2 = t[n].split('&'); // pull off value
var id = t2[0];
var ctrl = zenPage.getComponentById(id);
t2[0] = (ctrl && ctrl.getValue) ? ctrl.getValue() : '';
context += t2.join('&');
}
}
var multiSelect = (this.multiSelect ? 1 : 0);
zenPage._selectorHTML = '';
var ok = this.RenderDropdownContent(this.index,context,this.getValue(),this.multiSelect,this.separator);
if (zenPage._selectorHTML) {
this.showDropdown(zenPage._selectorHTML);
}
}
}

self._ZEN_Portal_selector_toggleIconDisplay = function(hide) {
var icon = this.findElement('icon');
if (icon) {
if (('undefined' !== typeof this._iconHidden) && ((!!this._iconHidden) == (!!hide))) return;
var control = this.findElement('control');
if (control) {
if (hide) {
var div = this.findElement('div');
if (div && (div.style.width != '') && (parseInt(div.style.width,10) > control.size)) {
control.style.width = div.style.width;
}
else {
control.style.width = (control.offsetWidth + control.offsetHeight) + 'px';
}
}
else {
control.style.width = '';
control.style.height = '';
}
}
icon.style.display = hide ? 'none' : '';
this._iconHidden = !!hide;
this.adjustSize();
}
}

self._ZEN_Portal_selector_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}

self._ZEN_Portal_selector_RenderDropdownContent = function(pIndex,pContext,pSearchKey,pMultiSelect,pSeparator) {
	return zenClassMethod(this,'RenderDropdownContent','L,L,L,B,L','BOOLEAN',arguments);
}
self._ZEN_Portal_selector__Loader = function() {
	zenLoadClass('_ZEN_Component_control');
	_ZEN_Portal_selector.prototype = zenCreate('_ZEN_Component_control',-1);
	var p = _ZEN_Portal_selector.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Portal_selector;
	p.superClass = ('undefined' == typeof _ZEN_Component_control) ? zenMaster._ZEN_Component_control.prototype:_ZEN_Component_control.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Portal.selector';
	p._type = 'selector';
	p.serialize = _ZEN_Portal_selector_serialize;
	p.getSettings = _ZEN_Portal_selector_getSettings;
	p.ReallyRefreshContents = _ZEN_Portal_selector_ReallyRefreshContents;
	p.RenderDropdownContent = _ZEN_Portal_selector_RenderDropdownContent;
	p.adjustDropdownPosition = _ZEN_Portal_selector_adjustDropdownPosition;
	p.adjustSize = _ZEN_Portal_selector_adjustSize;
	p.getModalDiv = _ZEN_Portal_selector_getModalDiv;
	p.onDisplayHandler = _ZEN_Portal_selector_onDisplayHandler;
	p.onEndModalHandler = _ZEN_Portal_selector_onEndModalHandler;
	p.onStartModalHandler = _ZEN_Portal_selector_onStartModalHandler;
	p.onkeyupHandler = _ZEN_Portal_selector_onkeyupHandler;
	p.onloadHandler = _ZEN_Portal_selector_onloadHandler;
	p.onresizeHandler = _ZEN_Portal_selector_onresizeHandler;
	p.selectItem = _ZEN_Portal_selector_selectItem;
	p.setProperty = _ZEN_Portal_selector_setProperty;
	p.showDropdown = _ZEN_Portal_selector_showDropdown;
	p.showSelector = _ZEN_Portal_selector_showSelector;
	p.toggleIconDisplay = _ZEN_Portal_selector_toggleIconDisplay;
}
/* EOF */