/*** Zen Module: ZEN_Component__core ***/
js_zen_core = 14;

self._zenClassIdx['object'] = '_ZEN_Component_object';
self._ZEN_Component_object = function(index,id) {
	if (index>=0) {_ZEN_Component_object__init(this,index,id);}
}

self._ZEN_Component_object__init = function(o,index,id) {
	o.index = index;
	o.id = id;
	o.name = '';
	o.parent = null;
	o.composite = null;
	o.aux = '';
	o.onupdate = '';
	o.renderFlag = '0';
	o.tuple = '';
	o.visible = false;
	o.window = null;
}
function _ZEN_Component_object_serialize(set,s)
{
	var o = this;s[0]='3874650476';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.aux;s[7]=o.onupdate;s[8]=o.renderFlag;s[9]=o.tuple;s[10]=(o.visible?1:0);
}
function _ZEN_Component_object_getSettings(s)
{
	s['id'] = 'string';
	s['name'] = 'string';
	s['aux'] = 'string';
	s['onupdate'] = 'eventHandler';
}

self._ZEN_Component_object_findElement = function(subid) {
return this.window.document.getElementById(subid + '_' + this.index + (null==this.tuple||''==this.tuple?'':'.'+this.tuple));
}

self._ZEN_Component_object_fireOnUpdateEvent = function() {
if (this.onupdateHandler) {
this.onupdateHandler();
}
if ('' != this.onupdate) {
zenInvokeCallbackMethod(this.onupdate,this,'onupdate');
}
}

self._ZEN_Component_object_getProperty = function(property,key) {
if ('' != property) {
return this[property];
}
return null;
}

self._ZEN_Component_object_getSettings = function(settings) {
}

self._ZEN_Component_object_getType = function() {
return this._type;
}

self._ZEN_Component_object_invokeSuper = function(method,args) {
var val = null;
var tArgs = args || [];
try {
var oldMethod = this._methodContext;
var oldContext = this._superContext;
this._superContext = (this._superContext&&(method==this._methodContext)) ? this._superContext.superClass : this.superClass;
this._methodContext = method;
val = this._superContext[method].apply(this,tArgs);
this._superContext = oldContext;
this._methodContext = oldMethod;
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in invokeSuper.\nMethod: ' + method);
}
return val;
}

self._ZEN_Component_object_isOfType = function(type) {
var obj = this;
while (obj) {
if (obj._type == type) {
return true;
}
obj = obj.superClass;
}
return false;
}

self._ZEN_Component_object_makeId = function(subid) {
return subid + '_' + this.index + (null!=this.tuple&&''!=this.tuple ? ('.'+this.tuple) : '');
}

self._ZEN_Component_object_render = function() {
if (this.renderContents) {
try {
this.renderContents();
}
catch(ex) {
var src = 'Source: (' + this._type + ' id="' + this.id + '")\n';
zenExceptionHandler(ex,arguments,'Error invoking renderContents method.\n' + src);
}
}
}

self._ZEN_Component_object_renderSVG = function(document,parent) {
alert('ZEN ERROR\nHTML Components cannot be used within an svgFrame:\nType: '+ this._type + '; index: ' + this.index + '; id: \'' + this.id + '\'');
}

self._ZEN_Component_object_setProperty = function(property,value,value2) {
switch(property) {
case 'id':
if (zenPage) {
zenPage.setComponentId(this,value);
}
else {
this.id = value;
}
break;
case 'name':
this.name = value;
break;
case 'aux':
this.aux = value;
break;
default:
if ('' != property && (('object'!=typeof(this[property])) || (null===this[property]))) {
this[property] = value;
}
return false;
}
return true;
}
self._ZEN_Component_object__Loader = function() {
	var p = _ZEN_Component_object.prototype;
	if (null==p) {return;}
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.object';
	p._type = 'object';
	p.serialize = _ZEN_Component_object_serialize;
	p.getSettings = _ZEN_Component_object_getSettings;
	p.findElement = _ZEN_Component_object_findElement;
	p.fireOnUpdateEvent = _ZEN_Component_object_fireOnUpdateEvent;
	p.getProperty = _ZEN_Component_object_getProperty;
	p.getSettings = _ZEN_Component_object_getSettings;
	p.getType = _ZEN_Component_object_getType;
	p.invokeSuper = _ZEN_Component_object_invokeSuper;
	p.isOfType = _ZEN_Component_object_isOfType;
	p.makeId = _ZEN_Component_object_makeId;
	p.render = _ZEN_Component_object_render;
	p.renderSVG = _ZEN_Component_object_renderSVG;
	p.setProperty = _ZEN_Component_object_setProperty;
}

self._zenClassIdx['component'] = '_ZEN_Component_component';
self._ZEN_Component_component = function(index,id) {
	if (index>=0) {_ZEN_Component_component__init(this,index,id);}
}

self._ZEN_Component_component__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_object__init) ?zenMaster._ZEN_Component_object__init(o,index,id):_ZEN_Component_object__init(o,index,id);
	o.align = '';
	o.containerStyle = '';
	o.dragEnabled = false;
	o.dropEnabled = false;
	o.dynamic = false;
	o.enclosingClass = 'zendiv';
	o.enclosingStyle = '';
	o.error = '';
	o.height = '';
	o.hidden = false;
	o.hint = '';
	o.hintClass = 'zenHint';
	o.hintStyle = '';
	o.label = '';
	o.labelClass = 'zenLabel';
	o.labelDisabledClass = 'zenLabelDisabled';
	o.labelStyle = '';
	o.onafterdrag = '';
	o.onbeforedrag = '';
	o.ondrag = '';
	o.ondrop = '';
	o.onhide = '';
	o.onrefresh = '';
	o.onshow = '';
	o.overlayMode = '0';
	o.showLabel = true;
	o.slice = '';
	o.title = '';
	o.valign = '';
	o.visible = true;
	o.width = '';
}
function _ZEN_Component_component_serialize(set,s)
{
	var o = this;s[0]='2350274433';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.containerStyle;s[9]=(o.dragEnabled?1:0);s[10]=(o.dropEnabled?1:0);s[11]=(o.dynamic?1:0);s[12]=o.enclosingClass;s[13]=o.enclosingStyle;s[14]=o.error;s[15]=o.height;s[16]=(o.hidden?1:0);s[17]=o.hint;s[18]=o.hintClass;s[19]=o.hintStyle;s[20]=o.label;s[21]=o.labelClass;s[22]=o.labelDisabledClass;s[23]=o.labelStyle;s[24]=o.onafterdrag;s[25]=o.onbeforedrag;s[26]=o.ondrag;s[27]=o.ondrop;s[28]=o.onhide;s[29]=o.onrefresh;s[30]=o.onshow;s[31]=o.onupdate;s[32]=o.overlayMode;s[33]=o.renderFlag;s[34]=(o.showLabel?1:0);s[35]=o.slice;s[36]=o.title;s[37]=o.tuple;s[38]=o.valign;s[39]=(o.visible?1:0);s[40]=o.width;
}
function _ZEN_Component_component_getSettings(s)
{
	s['name'] = 'string';
	s['align'] = 'enum:left,right,center';
	s['containerStyle'] = 'style';
	s['dragEnabled'] = 'boolean';
	s['dropEnabled'] = 'boolean';
	s['enclosingClass'] = 'cssClass';
	s['enclosingStyle'] = 'style';
	s['height'] = 'length';
	s['hidden'] = 'boolean';
	s['hint'] = 'caption';
	s['hintClass'] = 'cssClass';
	s['hintStyle'] = 'style';
	s['label'] = 'caption';
	s['labelClass'] = 'cssClass';
	s['labelDisabledClass'] = 'cssClass';
	s['labelStyle'] = 'style';
	s['onafterdrag'] = 'eventHandler';
	s['onbeforedrag'] = 'eventHandler';
	s['ondrag'] = 'eventHandler';
	s['ondrop'] = 'eventHandler';
	s['onhide'] = 'eventHandler';
	s['onrefresh'] = 'eventHandler';
	s['onshow'] = 'eventHandler';
	s['showLabel'] = 'boolean';
	s['slice'] = 'integer';
	s['title'] = 'caption';
	s['valign'] = 'enum:top,bottom,middle';
	s['width'] = 'length';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_component_dragHandler = function() {
try {
var dragData = new zenDragData();
dragData.sourceComponent = this;
if ('' != this.onbeforedrag) {
if (!zenInvokeCallbackMethod(this.onbeforedrag,this,'onbeforedrag','dragData',dragData)) {
if (null == dragData.value) {
dragData = null;
}
return dragData;
}
}
if (!this.dragStartHandler ||
!this.dragStartHandler(dragData) ||
(null == dragData.value)) {
return null;
}
if ('' != this.ondrag) {
if (!zenInvokeCallbackMethod(this.ondrag,this,'ondrag','dragData',dragData)) {
return null;
}
}
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in dragHandler.');
}
return dragData;
}

self._ZEN_Component_component_dragNotifyHandler = function(dragData) {
try {
if (this.dragFinishHandler) {
this.dragFinishHandler(dragData);
}
zenInvokeCallbackMethod(this.onafterdrag,this,'onafterdrag','dragData',dragData);
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in dragNotifyHandler.');
}
}

self._ZEN_Component_component_dropHandler = function() {
try {
var dragData = ZLM.getDragData();
dragData.targetComponent = this;
if ('' != this.ondrop) {
if (!zenInvokeCallbackMethod(this.ondrop,this,'ondrop','dragData',dragData)) {
return;
}
}
if (this.dropStartHandler && !this.dropStartHandler(dragData)) {
return;
}
if (dragData.sourceComponent) {
dragData.sourceComponent.dragNotifyHandler(dragData);
}
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in dropHandler.');
}
}

self._ZEN_Component_component_exposeComponent = function() {
try {
var div = this.getEnclosingDiv();
if (!div) return;
if (div.offsetWidth == 0 || div.offsetHeight == 0) return;
if (this.onDisplayHandler) {
this.onDisplayHandler();
}
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in exposeComponent.');
}
}

self._ZEN_Component_component_getEnclosingDiv = function() {
return this.window.document.getElementById(('' == this.id) ? 'zen'+this.index : this.id);
}

self._ZEN_Component_component_getHidden = function() {
return this.hidden;
}

self._ZEN_Component_component_getHintElement = function() {
return this.window.document.getElementById('zenhint_'+this.index);
}

self._ZEN_Component_component_getLabelElement = function() {
return this.window.document.getElementById('zenlbl_'+this.index);
}

self._ZEN_Component_component_progressBarHandler = function() {
this.progressBarTimerId = null;
this._progressBarCount++;
if (this._progressBarDiv) {
var style = '';
if (null != this._progressBarDivWid) {
style += 'width: ' + this._progressBarDivWid + 'px;';
}
if (null != this._progressBarDivHgt) {
style += 'height: ' + this._progressBarDivHgt + 'px;';
}
if ('' == style) {
style = 'width: 100%';
}
this._progressBarDiv.innerHTML = '<div align="center" style="'+style+'"><table class="zenProgressBar" border="0" cellpadding="0" cellspacing="0" width="200px"><tr><td width="'+((this._progressBarCount%20)*10)+'px">&#160;</td><td class="zenProgressBarThumb" width="10px">&#160;</td><td width="99%">&#160;</td></tr></table></div>';
}
this.progressBarTimerId = self.setTimeout("zenPage.getComponent("+this.index+").progressBarHandler()",75);
}

self._ZEN_Component_component_refreshContents = function(sync) {
if (!this.visible) { return; }
switch (zenRefreshMode) {
case 0:
if (sync) {
var old = zenSynchronousMode;
zenSynchronousMode = true;
}
this.ReallyRefreshContents();
if (sync) {
zenSynchronousMode = old;
}
break;
case 1:
zenASSERT(zenThreadId!=null,'thread id should not be null',arguments);
zenASSERT(zenRefreshList,'refresh list should not be null',arguments);
zenRefreshList[zenThreadId][this.index] = this;
break;
}
}

self._ZEN_Component_component_setHidden = function(flag) {
var enc = this.getEnclosingDiv();
zenASSERT(enc,"Unable to find enclosing element.",arguments);
if (flag) {
zenInvokeCallbackMethod(this.onhide,this,'onhide');
}
else {
zenInvokeCallbackMethod(this.onshow,this,'onshow');
}
this.hidden = flag;
enc.style.display = this.hidden ? 'none' : '';
var label = this.getLabelElement();
if (label) {
label.style.display = this.hidden ? 'none' : '';
}
var hint = this.getHintElement();
if (hint) {
hint.style.display = this.hidden ? 'none' : '';
}
var labelCell = this.findElement('zenLayoutLabelCell');
if (labelCell) {
labelCell.style.display = this.hidden ? 'none' : '';
}
var wrapperCell = this.findElement('zenLayoutTableCell');
if (wrapperCell) {
wrapperCell.style.display = this.hidden ? 'none' : '';
}
if (!flag) {
if (this.exposeComponent) {
setTimeout('zenPage.getComponent('+this.index+').exposeComponent();',0);
}
}
}

self._ZEN_Component_component_setOverlayMode = function(mode) {
var enc = this.getEnclosingDiv();
if (!enc) return;
var overlay = this.window.document.getElementById('overlay_'+this.index);
if (overlay) {
enc.removeChild(overlay);
delete overlay;
}
this.overlayMode = mode;
if (mode > 0) {
var overlay = this.window.document.createElement('div');
overlay.id = 'overlay_' + this.index;
enc.appendChild(overlay);
overlay.className = (2==mode) ? 'zenOverlaySelected' : 'zenOverlay';
overlay.style.top = zenGetTop(enc) - 1 - zenGetTopScroll(enc);
overlay.style.left = zenGetLeft(enc) - 1 - zenGetLeftScroll(enc);
overlay.style.width = enc.offsetWidth;
overlay.style.height = enc.offsetHeight;
if (2==mode) {
if (overlay.style.opacity != null) {
overlay.style.background = 'yellow';
overlay.style.opacity = '0.5';
}
else if (overlay.style.filter != null) {
overlay.style.background = 'yellow';
overlay.style.filter = 'alpha(opacity=50)';
}
}
overlay.onclick = new Function("zenPage.onoverlayHandler("+this.index+");");
}
}

self._ZEN_Component_component_setProperty = function(property,value,value2) {
switch(property) {
case 'hidden':
this.setHidden(value);
break;
case 'hint':
case 'hintClass':
case 'hintStyle':
this[property] = value;
var hint = this.getHintElement();
if (hint) {
switch(property) {
case 'hint':
hint.innerHTML = value;
break;
case 'hintClass':
hint.className = value;
break;
case 'hintStyle':
hint.style.cssText = value;
break;
}
}
else if (this.parent) {
this.parent.refreshContents();
}
break;
case 'label':
case 'labelClass':
case 'labelStyle':
this[property] = value;
var label = this.getLabelElement();
if (label) {
switch(property) {
case 'label':
label.innerHTML = value;
break;
case 'labelClass':
label.className = value;
break;
case 'labelStyle':
label.style.cssText = value;
break;
}
}
else if (this.parent) {
this.parent.refreshContents();
}
break;
case 'containerStyle':
case 'align':
case 'valign':
case 'width':
case 'height':
case 'slice':
this[property] = value;
if (this.parent) {
this.parent.refreshContents();
}
break;
case 'enclosingClass':
this.enclosingClass = value;
var enc = this.getEnclosingDiv();
enc.className = value;
break;
case 'enclosingStyle':
this.enclosingStyle = value;
var enc = this.getEnclosingDiv();
enc.style.cssText = value;
break;
case 'dragEnabled':
case 'dropEnabled':
this[property] = value;
break;
default:
return this.invokeSuper('setProperty',arguments);
break;
}
return true;
}

self._ZEN_Component_component_startProgressBar = function(div) {
this.stopProgressBar();
if (!zenSynchronousMode) {
this._progressBarCount = 0;
if (div) {
this._progressBarDiv = div;
delete this._progressBarDivWid;
delete this._progressBarDivHgt;
}
else {
this._progressBarDiv = this.getEnclosingDiv();
this._progressBarDivWid = this._progressBarDiv.offsetWidth;
this._progressBarDivHgt = this._progressBarDiv.offsetHeight;
}
this.progressBarTimerId = self.setTimeout("zenPage.getComponent("+this.index+").progressBarHandler()",zenProgressBarTimeout);
}
}

self._ZEN_Component_component_stopProgressBar = function() {
if (this.progressBarTimerId) {
self.clearTimeout(this.progressBarTimerId);
this.progressBarTimerId = null;
}
}

self._ZEN_Component_component_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_component__Loader = function() {
	zenLoadClass('_ZEN_Component_object');
	_ZEN_Component_component.prototype = zenCreate('_ZEN_Component_object',-1);
	var p = _ZEN_Component_component.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_component;
	p.superClass = ('undefined' == typeof _ZEN_Component_object) ? zenMaster._ZEN_Component_object.prototype:_ZEN_Component_object.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.component';
	p._type = 'component';
	p.serialize = _ZEN_Component_component_serialize;
	p.getSettings = _ZEN_Component_component_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_component_ReallyRefreshContents;
	p.dragHandler = _ZEN_Component_component_dragHandler;
	p.dragNotifyHandler = _ZEN_Component_component_dragNotifyHandler;
	p.dropHandler = _ZEN_Component_component_dropHandler;
	p.exposeComponent = _ZEN_Component_component_exposeComponent;
	p.getEnclosingDiv = _ZEN_Component_component_getEnclosingDiv;
	p.getHidden = _ZEN_Component_component_getHidden;
	p.getHintElement = _ZEN_Component_component_getHintElement;
	p.getLabelElement = _ZEN_Component_component_getLabelElement;
	p.progressBarHandler = _ZEN_Component_component_progressBarHandler;
	p.refreshContents = _ZEN_Component_component_refreshContents;
	p.setHidden = _ZEN_Component_component_setHidden;
	p.setOverlayMode = _ZEN_Component_component_setOverlayMode;
	p.setProperty = _ZEN_Component_component_setProperty;
	p.startProgressBar = _ZEN_Component_component_startProgressBar;
	p.stopProgressBar = _ZEN_Component_component_stopProgressBar;
}

self._zenClassIdx['abstractGroup'] = '_ZEN_Component_abstractGroup';
self._ZEN_Component_abstractGroup = function(index,id) {
	if (index>=0) {_ZEN_Component_abstractGroup__init(this,index,id);}
}

self._ZEN_Component_abstractGroup__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.children = new Array();
	o.disabled = false;
}
function _ZEN_Component_abstractGroup_serialize(set,s)
{
	var o = this;s[0]='3368109280';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=set.serializeList(o,o.children,true,'children');s[9]=o.containerStyle;s[10]=(o.disabled?1:0);s[11]=(o.dragEnabled?1:0);s[12]=(o.dropEnabled?1:0);s[13]=(o.dynamic?1:0);s[14]=o.enclosingClass;s[15]=o.enclosingStyle;s[16]=o.error;s[17]=o.height;s[18]=(o.hidden?1:0);s[19]=o.hint;s[20]=o.hintClass;s[21]=o.hintStyle;s[22]=o.label;s[23]=o.labelClass;s[24]=o.labelDisabledClass;s[25]=o.labelStyle;s[26]=o.onafterdrag;s[27]=o.onbeforedrag;s[28]=o.ondrag;s[29]=o.ondrop;s[30]=o.onhide;s[31]=o.onrefresh;s[32]=o.onshow;s[33]=o.onupdate;s[34]=o.overlayMode;s[35]=o.renderFlag;s[36]=(o.showLabel?1:0);s[37]=o.slice;s[38]=o.title;s[39]=o.tuple;s[40]=o.valign;s[41]=(o.visible?1:0);s[42]=o.width;
}
function _ZEN_Component_abstractGroup_getSettings(s)
{
	s['name'] = 'string';
	s['disabled'] = 'boolean';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_abstractGroup_addChild = function(component,refresh) {
zenASSERT(component && zenIsComponent(component),'Invalid component',arguments);
if (!component.isOfType('component')) {
alert('Only HTML components can be added to groups');
return;
}
this.children[this.children.length] = component;
component.parent = this;
if (this.childrenMutated) {
this.childrenMutated();
}
if (refresh) {
this.refreshContents();
}
if (component.id!="") {
_zenIds[component.id]=component;
}
}

self._ZEN_Component_abstractGroup_addChildAfter = function(component,sibling,refresh) {
zenASSERT(component && zenIsComponent(component),'Invalid component',arguments);
if (!component.isOfType('component')) {
alert('Only HTML components can be added to groups');
return;
}
var index = this.getChildIndex(sibling);
if (index < 0) {
alert('addChildAfter: sibling is not in this group');
return;
}
this.children.splice(index+1,0,component);
component.parent = this;
if (this.childrenMutated) {
this.childrenMutated();
}
if (refresh) {
this.refreshContents();
}
if (component.id!="") {
_zenIds[component.id]=component;
}
}

self._ZEN_Component_abstractGroup_addChildBefore = function(component,sibling,refresh) {
zenASSERT(component && zenIsComponent(component),'Invalid component',arguments);
if (!component.isOfType('component')) {
alert('Only HTML components can be added to groups');
return;
}
var index = this.getChildIndex(sibling);
if (index < 0) {
alert('addChildBefore: sibling is not in this group');
return;
}
this.children.splice(index,0,component);
component.parent = this;
if (this.childrenMutated) {
this.childrenMutated();
}
if (refresh) {
this.refreshContents();
}
if (component.id!="") {
_zenIds[component.id]=component;
}
}

self._ZEN_Component_abstractGroup_exposeComponent = function() {
try {
var div = this.getEnclosingDiv();
if (!div) return;
if (div.offsetWidth == 0 || div.offsetHeight == 0) return;
if (this.onDisplayHandler) {
this.onDisplayHandler();
}
for (var n = 0; n < this.children.length; n++) {
this.children[n].exposeComponent();
}
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in exposeComponent.');
}
}

self._ZEN_Component_abstractGroup_getChildIndex = function(child) {
for (var n = 0; n < this.children.length; n++) {
if (this.children[n] == child) {
return n;
}
}
return -1;
}

self._ZEN_Component_abstractGroup_onRefreshContents = function() {
for (var n = 0; n < this.children.length; n++) {
var child = this.children[n];
if (child.onRefreshContents) child.onRefreshContents();
zenInvokeCallbackMethod(child.onrefresh,child,'onrefresh');
}
}

self._ZEN_Component_abstractGroup_onloadHandler = function() {
if (this.disabled && this.parent && !this.parent.disabled) {
this.setProperty('disabled',true);
}
}

self._ZEN_Component_abstractGroup_removeChild = function(component) {
zenPage.deleteComponent(component);
if (this.childrenMutated) {
this.childrenMutated();
}
}

self._ZEN_Component_abstractGroup_setOverlayMode = function(mode) {
this.overlayMode = mode;
for (var n = 0; n < this.children.length; n++) {
this.children[n].setOverlayMode(mode);
}
}

self._ZEN_Component_abstractGroup_setProperty = function(property,value,value2) {
switch(property) {
case 'disabled':
value = (value) ? true : false;
this.disabled = value;
for (var n = 0; n < this.children.length; n++) {
var child = this.children[n];
child.setProperty(property,value);
}
if (this.ondisabledHandler) {
this.ondisabledHandler();
}
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_abstractGroup_setPropertyAll = function(property,value,value2) {
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

self._ZEN_Component_abstractGroup_updateControlsInGroup = function() {
for (var n = 0; n < this.children.length; n++) {
var child = this.children[n];
if (child.updateControlsInGroup) {
child.updateControlsInGroup();
}
else if (child.setValue) {
if (typeof(child.src)!="undefined") {
}
else {
child.setValue(child.value);
}
}
}
}

self._ZEN_Component_abstractGroup_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_abstractGroup__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_ZEN_Component_abstractGroup.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _ZEN_Component_abstractGroup.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_abstractGroup;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.abstractGroup';
	p._type = 'abstractGroup';
	p.serialize = _ZEN_Component_abstractGroup_serialize;
	p.getSettings = _ZEN_Component_abstractGroup_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_abstractGroup_ReallyRefreshContents;
	p.addChild = _ZEN_Component_abstractGroup_addChild;
	p.addChildAfter = _ZEN_Component_abstractGroup_addChildAfter;
	p.addChildBefore = _ZEN_Component_abstractGroup_addChildBefore;
	p.exposeComponent = _ZEN_Component_abstractGroup_exposeComponent;
	p.getChildIndex = _ZEN_Component_abstractGroup_getChildIndex;
	p.onRefreshContents = _ZEN_Component_abstractGroup_onRefreshContents;
	p.onloadHandler = _ZEN_Component_abstractGroup_onloadHandler;
	p.removeChild = _ZEN_Component_abstractGroup_removeChild;
	p.setOverlayMode = _ZEN_Component_abstractGroup_setOverlayMode;
	p.setProperty = _ZEN_Component_abstractGroup_setProperty;
	p.setPropertyAll = _ZEN_Component_abstractGroup_setPropertyAll;
	p.updateControlsInGroup = _ZEN_Component_abstractGroup_updateControlsInGroup;
}

self._zenClassIdx['html'] = '_ZEN_Component_html';
self._ZEN_Component_html = function(index,id) {
	if (index>=0) {_ZEN_Component_html__init(this,index,id);}
}

self._ZEN_Component_html__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.OnDrawContent = ''; // encrypted
	o.content = '';
	o.seed = '';
}
function _ZEN_Component_html_serialize(set,s)
{
	var o = this;s[0]='400802672';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.OnDrawContent;s[7]=o.align;s[8]=o.aux;s[9]=o.containerStyle;s[10]=o.content;s[11]=(o.dragEnabled?1:0);s[12]=(o.dropEnabled?1:0);s[13]=(o.dynamic?1:0);s[14]=o.enclosingClass;s[15]=o.enclosingStyle;s[16]=o.error;s[17]=o.height;s[18]=(o.hidden?1:0);s[19]=o.hint;s[20]=o.hintClass;s[21]=o.hintStyle;s[22]=o.label;s[23]=o.labelClass;s[24]=o.labelDisabledClass;s[25]=o.labelStyle;s[26]=o.onafterdrag;s[27]=o.onbeforedrag;s[28]=o.ondrag;s[29]=o.ondrop;s[30]=o.onhide;s[31]=o.onrefresh;s[32]=o.onshow;s[33]=o.onupdate;s[34]=o.overlayMode;s[35]=o.renderFlag;s[36]=o.seed;s[37]=(o.showLabel?1:0);s[38]=o.slice;s[39]=o.title;s[40]=o.tuple;s[41]=o.valign;s[42]=(o.visible?1:0);s[43]=o.width;
}
function _ZEN_Component_html_getSettings(s)
{
	s['name'] = 'string';
	s['content'] = 'html';
	s['seed'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_html_getContent = function(content) {
return this.content;
}

self._ZEN_Component_html_setContent = function(content) {
this.setProperty('content',content);
}

self._ZEN_Component_html_setProperty = function(property,value,value2) {
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

self._ZEN_Component_html_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_html__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_ZEN_Component_html.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _ZEN_Component_html.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_html;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.html';
	p._type = 'html';
	p.serialize = _ZEN_Component_html_serialize;
	p.getSettings = _ZEN_Component_html_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_html_ReallyRefreshContents;
	p.getContent = _ZEN_Component_html_getContent;
	p.setContent = _ZEN_Component_html_setContent;
	p.setProperty = _ZEN_Component_html_setProperty;
}

self._zenClassIdx['spacer'] = '_ZEN_Component_spacer';
self._ZEN_Component_spacer = function(index,id) {
	if (index>=0) {_ZEN_Component_spacer__init(this,index,id);}
}

self._ZEN_Component_spacer__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
}
function _ZEN_Component_spacer_serialize(set,s)
{
	var o = this;s[0]='2350274433';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.containerStyle;s[9]=(o.dragEnabled?1:0);s[10]=(o.dropEnabled?1:0);s[11]=(o.dynamic?1:0);s[12]=o.enclosingClass;s[13]=o.enclosingStyle;s[14]=o.error;s[15]=o.height;s[16]=(o.hidden?1:0);s[17]=o.hint;s[18]=o.hintClass;s[19]=o.hintStyle;s[20]=o.label;s[21]=o.labelClass;s[22]=o.labelDisabledClass;s[23]=o.labelStyle;s[24]=o.onafterdrag;s[25]=o.onbeforedrag;s[26]=o.ondrag;s[27]=o.ondrop;s[28]=o.onhide;s[29]=o.onrefresh;s[30]=o.onshow;s[31]=o.onupdate;s[32]=o.overlayMode;s[33]=o.renderFlag;s[34]=(o.showLabel?1:0);s[35]=o.slice;s[36]=o.title;s[37]=o.tuple;s[38]=o.valign;s[39]=(o.visible?1:0);s[40]=o.width;
}
function _ZEN_Component_spacer_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_spacer_setProperty = function(property,value,value2) {
switch(property) {
case 'height':
case 'width':
var el = this.findElement('spacer');
this[property] = value;
if (el) {
value = ('*' == value) ? '100%' : value;
if (zenIsHTML5 && (value == ('' + parseFloat(value)))) value += 'px';
if ('height'==property) {
el.style.height = value;
}
else {
el.style.width = value;
}
}
else {
if (this.getEnclosingDiv()) {
this.refreshContents();
}
}
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_spacer_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_spacer__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_ZEN_Component_spacer.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _ZEN_Component_spacer.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_spacer;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.spacer';
	p._type = 'spacer';
	p.serialize = _ZEN_Component_spacer_serialize;
	p.getSettings = _ZEN_Component_spacer_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_spacer_ReallyRefreshContents;
	p.setProperty = _ZEN_Component_spacer_setProperty;
}

self._zenClassIdx['activeGroup'] = '_ZEN_Component_activeGroup';
self._ZEN_Component_activeGroup = function(index,id) {
	if (index>=0) {_ZEN_Component_activeGroup__init(this,index,id);}
}

self._ZEN_Component_activeGroup__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_abstractGroup__init) ?zenMaster._ZEN_Component_abstractGroup__init(o,index,id):_ZEN_Component_abstractGroup__init(o,index,id);
	o.enclosingClass = 'activeGroup';
}
function _ZEN_Component_activeGroup_serialize(set,s)
{
	var o = this;s[0]='3368109280';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=set.serializeList(o,o.children,true,'children');s[9]=o.containerStyle;s[10]=(o.disabled?1:0);s[11]=(o.dragEnabled?1:0);s[12]=(o.dropEnabled?1:0);s[13]=(o.dynamic?1:0);s[14]=o.enclosingClass;s[15]=o.enclosingStyle;s[16]=o.error;s[17]=o.height;s[18]=(o.hidden?1:0);s[19]=o.hint;s[20]=o.hintClass;s[21]=o.hintStyle;s[22]=o.label;s[23]=o.labelClass;s[24]=o.labelDisabledClass;s[25]=o.labelStyle;s[26]=o.onafterdrag;s[27]=o.onbeforedrag;s[28]=o.ondrag;s[29]=o.ondrop;s[30]=o.onhide;s[31]=o.onrefresh;s[32]=o.onshow;s[33]=o.onupdate;s[34]=o.overlayMode;s[35]=o.renderFlag;s[36]=(o.showLabel?1:0);s[37]=o.slice;s[38]=o.title;s[39]=o.tuple;s[40]=o.valign;s[41]=(o.visible?1:0);s[42]=o.width;
}
function _ZEN_Component_activeGroup_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_activeGroup_onloadHandler = function() {
this.invokeSuper('onloadHandler',arguments);
}

self._ZEN_Component_activeGroup_setProperty = function(property,value,value2) {
switch(property) {
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_activeGroup_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_activeGroup__Loader = function() {
	zenLoadClass('_ZEN_Component_abstractGroup');
	_ZEN_Component_activeGroup.prototype = zenCreate('_ZEN_Component_abstractGroup',-1);
	var p = _ZEN_Component_activeGroup.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_activeGroup;
	p.superClass = ('undefined' == typeof _ZEN_Component_abstractGroup) ? zenMaster._ZEN_Component_abstractGroup.prototype:_ZEN_Component_abstractGroup.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.activeGroup';
	p._type = 'activeGroup';
	p.serialize = _ZEN_Component_activeGroup_serialize;
	p.getSettings = _ZEN_Component_activeGroup_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_activeGroup_ReallyRefreshContents;
	p.onloadHandler = _ZEN_Component_activeGroup_onloadHandler;
	p.setProperty = _ZEN_Component_activeGroup_setProperty;
}

self._zenClassIdx['group'] = '_ZEN_Component_group';
self._ZEN_Component_group = function(index,id) {
	if (index>=0) {_ZEN_Component_group__init(this,index,id);}
}

self._ZEN_Component_group__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_abstractGroup__init) ?zenMaster._ZEN_Component_abstractGroup__init(o,index,id):_ZEN_Component_abstractGroup__init(o,index,id);
	o.cellAlign = '';
	o.cellSize = '';
	o.cellStyle = '';
	o.cellVAlign = '';
	o.groupClass = 'group';
	o.groupStyle = '';
	o.labelPosition = 'top';
	o.layout = ''; // encrypted
	o.onclick = '';
}
function _ZEN_Component_group_serialize(set,s)
{
	var o = this;s[0]='2521056755';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.cellAlign;s[9]=o.cellSize;s[10]=o.cellStyle;s[11]=o.cellVAlign;s[12]=set.serializeList(o,o.children,true,'children');s[13]=o.containerStyle;s[14]=(o.disabled?1:0);s[15]=(o.dragEnabled?1:0);s[16]=(o.dropEnabled?1:0);s[17]=(o.dynamic?1:0);s[18]=o.enclosingClass;s[19]=o.enclosingStyle;s[20]=o.error;s[21]=o.groupClass;s[22]=o.groupStyle;s[23]=o.height;s[24]=(o.hidden?1:0);s[25]=o.hint;s[26]=o.hintClass;s[27]=o.hintStyle;s[28]=o.label;s[29]=o.labelClass;s[30]=o.labelDisabledClass;s[31]=o.labelPosition;s[32]=o.labelStyle;s[33]=o.layout;s[34]=o.onafterdrag;s[35]=o.onbeforedrag;s[36]=o.onclick;s[37]=o.ondrag;s[38]=o.ondrop;s[39]=o.onhide;s[40]=o.onrefresh;s[41]=o.onshow;s[42]=o.onupdate;s[43]=o.overlayMode;s[44]=o.renderFlag;s[45]=(o.showLabel?1:0);s[46]=o.slice;s[47]=o.title;s[48]=o.tuple;s[49]=o.valign;s[50]=(o.visible?1:0);s[51]=o.width;
}
function _ZEN_Component_group_getSettings(s)
{
	s['name'] = 'string';
	s['cellAlign'] = 'enum:left,right,center,even';
	s['cellSize'] = 'enum:same,stretch';
	s['cellStyle'] = 'style';
	s['cellVAlign'] = 'enum:top,bottom,middle,even';
	s['groupClass'] = 'cssClass';
	s['groupStyle'] = 'style';
	s['labelPosition'] = 'enum:left,top';
	s['layout'] = 'string';
	s['onclick'] = 'eventHandler';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_group_setProperty = function(property,value,value2) {
switch(property) {
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_group_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_group__Loader = function() {
	zenLoadClass('_ZEN_Component_abstractGroup');
	_ZEN_Component_group.prototype = zenCreate('_ZEN_Component_abstractGroup',-1);
	var p = _ZEN_Component_group.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_group;
	p.superClass = ('undefined' == typeof _ZEN_Component_abstractGroup) ? zenMaster._ZEN_Component_abstractGroup.prototype:_ZEN_Component_abstractGroup.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.group';
	p._type = 'group';
	p.serialize = _ZEN_Component_group_serialize;
	p.getSettings = _ZEN_Component_group_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_group_ReallyRefreshContents;
	p.setProperty = _ZEN_Component_group_setProperty;
}

self._zenClassIdx['abstractDragGroupMgr'] = '_ZEN_Component_abstractDragGroupMgr';
self._ZEN_Component_abstractDragGroupMgr = function(index,id) {
	if (index>=0) {_ZEN_Component_abstractDragGroupMgr__init(this,index,id);}
}

self._ZEN_Component_abstractDragGroupMgr__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_activeGroup__init) ?zenMaster._ZEN_Component_activeGroup__init(o,index,id):_ZEN_Component_activeGroup__init(o,index,id);
	o.groupName = 'dragMgr';
}
function _ZEN_Component_abstractDragGroupMgr_serialize(set,s)
{
	var o = this;s[0]='3167446641';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=set.serializeList(o,o.children,true,'children');s[9]=o.containerStyle;s[10]=(o.disabled?1:0);s[11]=(o.dragEnabled?1:0);s[12]=(o.dropEnabled?1:0);s[13]=(o.dynamic?1:0);s[14]=o.enclosingClass;s[15]=o.enclosingStyle;s[16]=o.error;s[17]=o.groupName;s[18]=o.height;s[19]=(o.hidden?1:0);s[20]=o.hint;s[21]=o.hintClass;s[22]=o.hintStyle;s[23]=o.label;s[24]=o.labelClass;s[25]=o.labelDisabledClass;s[26]=o.labelStyle;s[27]=o.onafterdrag;s[28]=o.onbeforedrag;s[29]=o.ondrag;s[30]=o.ondrop;s[31]=o.onhide;s[32]=o.onrefresh;s[33]=o.onshow;s[34]=o.onupdate;s[35]=o.overlayMode;s[36]=o.renderFlag;s[37]=(o.showLabel?1:0);s[38]=o.slice;s[39]=o.title;s[40]=o.tuple;s[41]=o.valign;s[42]=(o.visible?1:0);s[43]=o.width;
}
function _ZEN_Component_abstractDragGroupMgr_getSettings(s)
{
	s['name'] = 'string';
	s['groupName'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_abstractDragGroupMgr_bringToFront = function(dragGroup) {
var mgr = this.getGroupManager();
var node = dragGroup.getEnclosingDiv();
if (node && mgr && mgr.bringToFront) {
mgr.bringToFront(node);
}
}

self._ZEN_Component_abstractDragGroupMgr_broadcast = function(signal,value) {
var div = this.getEnclosingDiv();
var mgr = div.firstChild.engine;
if (!mgr) return(0); // Children not yet initialized
var k = mgr.kidList;
if (!k) return(0); // No one to talk to
var lastKid = k.length-1;
switch(signal) {
case "resize":
for (var i=lastKid;i>=0;i--) if (k[i].zenObj) k[i].zenObj.onresizeHandler();
break;
case "disableResize":
for (var i=lastKid;i>=0;i--) if (k[i].zenObj) k[i].zenObj.disableResize();
break;
case "enableResize":
for (var i=lastKid;i>=0;i--) if (k[i].zenObj) k[i].zenObj.enableResize();
break;
case "disableHeaderMaxToggle":
for (var i=lastKid;i>=0;i--) if (k[i].zenObj) k[i].zenObj.disableHeaderMaxToggle();
break;
case "enableHeaderMaxToggle":
for (var i=lastKid;i>=0;i--) if (k[i].zenObj) k[i].zenObj.enableHeaderMaxToggle();
break;
case "removeDragHeader":
for (var i=lastKid;i>=0;i--) if (k[i].zenObj) k[i].zenObj.removeWindowChrome();
break;
case "restoreDragHeader":
for (var i=lastKid;i>=0;i--) if (k[i].zenObj) k[i].zenObj.resetWindowChrome();
break;
case "setBodyStyle":
for (var i=lastKid;i>=0;i--) {
if (k[i].zenObj) {
k[i].zenObj.setBodyStyle(value);
}
}
break;
case "setHeaderStyle":
for (var i=lastKid;i>=0;i--) {
if (k[i].zenObj) {
k[i].zenObj.setHeaderStyle(value);
}
}
break;
case "setHeaderLayout":
for (var i=lastKid;i>=0;i--) if (k[i].zenObj) k[i].zenObj.setProperty("headerLayout",value);
break;
case "enableCoverplate":
for (var i=lastKid;i>=0;i--) if (k[i].zenObj) k[i].zenObj.enableCoverplate();
break;
case "disableCoverplate":
for (var i=lastKid;i>=0;i--) if (k[i].zenObj) k[i].zenObj.disableCoverplate();
break;
case "processAppMessage":
for (var i=lastKid;i>=0;i--) if (k[i].zenObj) k[i].zenObj.processAppMessage(value);
break;
}
return(1);
}

self._ZEN_Component_abstractDragGroupMgr_forceRefresh = function() {
var mgr = this.getGroupManager();
if (mgr && mgr.resize) mgr.resize();
}

self._ZEN_Component_abstractDragGroupMgr_getGroupManager = function() {
if (!this.managerEngine) {
var manager = ZLM.getGroupManager(this.groupName+"_"+this.index);
if (manager) {
this.managerEngine=manager.engine;
}
}
return(this.managerEngine);
}

self._ZEN_Component_abstractDragGroupMgr_getWallpaperDiv = function() {
var mgr = this.getGroupManager();
if (mgr && mgr.getWallpaperDiv) return(mgr.getWallpaperDiv());
return(null);
}

self._ZEN_Component_abstractDragGroupMgr_onloadHandler = function() {
this.invokeSuper('onloadHandler',arguments);
this.managerEngine = null;
}

self._ZEN_Component_abstractDragGroupMgr_setProperty = function(property,value,value2) {
switch(property) {
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_abstractDragGroupMgr_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_abstractDragGroupMgr__Loader = function() {
	zenLoadClass('_ZEN_Component_activeGroup');
	_ZEN_Component_abstractDragGroupMgr.prototype = zenCreate('_ZEN_Component_activeGroup',-1);
	var p = _ZEN_Component_abstractDragGroupMgr.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_abstractDragGroupMgr;
	p.superClass = ('undefined' == typeof _ZEN_Component_activeGroup) ? zenMaster._ZEN_Component_activeGroup.prototype:_ZEN_Component_activeGroup.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.abstractDragGroupMgr';
	p._type = 'abstractDragGroupMgr';
	p.serialize = _ZEN_Component_abstractDragGroupMgr_serialize;
	p.getSettings = _ZEN_Component_abstractDragGroupMgr_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_abstractDragGroupMgr_ReallyRefreshContents;
	p.bringToFront = _ZEN_Component_abstractDragGroupMgr_bringToFront;
	p.broadcast = _ZEN_Component_abstractDragGroupMgr_broadcast;
	p.forceRefresh = _ZEN_Component_abstractDragGroupMgr_forceRefresh;
	p.getGroupManager = _ZEN_Component_abstractDragGroupMgr_getGroupManager;
	p.getWallpaperDiv = _ZEN_Component_abstractDragGroupMgr_getWallpaperDiv;
	p.onloadHandler = _ZEN_Component_abstractDragGroupMgr_onloadHandler;
	p.setProperty = _ZEN_Component_abstractDragGroupMgr_setProperty;
}

self._zenClassIdx['abstractPage'] = '_ZEN_Component_abstractPage';
self._ZEN_Component_abstractPage = function(index,id) {
	if (index>=0) {_ZEN_Component_abstractPage__init(this,index,id);}
}

self._ZEN_Component_abstractPage__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_group__init) ?zenMaster._ZEN_Component_group__init(o,index,id):_ZEN_Component_group__init(o,index,id);
	o.SVGClassList = '';
	o.UserSVGPackageList = '';
	o.backgroundTimerInterval = '1000';
	o.cellVAlign = 'top';
	o.cssLevel = '2';
	o.designMode = false;
	o.dragAndDrop = false;
	o.groupClass = 'page';
	o.height = '100%';
	o.inlineSVG = false;
	o.isPopup = false;
	o.isSoftModal = false;
	o.lastModalIndex = '0';
	o.nextIndex = '0';
	o.onoverlay = '';
	o.popupParent = '';
	o.title = '';
	o.useSVG = false;
	o.useSoftModals = true;
	o.width = '100%';
	o.zenPersistentPopup = false;
}
function _ZEN_Component_abstractPage_serialize(set,s)
{
	var o = this;s[0]='4277539460';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.SVGClassList;s[7]=o.UserSVGPackageList;s[8]=o.align;s[9]=o.aux;s[10]=o.backgroundTimerInterval;s[11]=o.cellAlign;s[12]=o.cellSize;s[13]=o.cellStyle;s[14]=o.cellVAlign;s[15]=set.serializeList(o,o.children,true,'children');s[16]=o.containerStyle;s[17]=o.cssLevel;s[18]=(o.designMode?1:0);s[19]=(o.disabled?1:0);s[20]=(o.dragAndDrop?1:0);s[21]=(o.dragEnabled?1:0);s[22]=(o.dropEnabled?1:0);s[23]=(o.dynamic?1:0);s[24]=o.enclosingClass;s[25]=o.enclosingStyle;s[26]=o.error;s[27]=o.groupClass;s[28]=o.groupStyle;s[29]=o.height;s[30]=(o.hidden?1:0);s[31]=o.hint;s[32]=o.hintClass;s[33]=o.hintStyle;s[34]=(o.inlineSVG?1:0);s[35]=(o.isPopup?1:0);s[36]=(o.isSoftModal?1:0);s[37]=o.label;s[38]=o.labelClass;s[39]=o.labelDisabledClass;s[40]=o.labelPosition;s[41]=o.labelStyle;s[42]=o.lastModalIndex;s[43]=o.layout;s[44]=o.nextIndex;s[45]=o.onafterdrag;s[46]=o.onbeforedrag;s[47]=o.onclick;s[48]=o.ondrag;s[49]=o.ondrop;s[50]=o.onhide;s[51]=o.onoverlay;s[52]=o.onrefresh;s[53]=o.onshow;s[54]=o.onupdate;s[55]=o.overlayMode;s[56]=o.popupParent;s[57]=o.renderFlag;s[58]=(o.showLabel?1:0);s[59]=o.slice;s[60]=o.title;s[61]=o.tuple;s[62]=(o.useSVG?1:0);s[63]=(o.useSoftModals?1:0);s[64]=o.valign;s[65]=(o.visible?1:0);s[66]=o.width;s[67]=(o.zenPersistentPopup?1:0);
}
function _ZEN_Component_abstractPage_getSettings(s)
{
	s['name'] = 'string';
	s['SVGClassList'] = 'string';
	s['UserSVGPackageList'] = 'string';
	s['backgroundTimerInterval'] = 'integer';
	s['dragAndDrop'] = 'boolean';
	s['inlineSVG'] = 'boolean';
	s['isPopup'] = 'boolean';
	s['isSoftModal'] = 'boolean';
	s['lastModalIndex'] = 'integer';
	s['nextIndex'] = 'integer';
	s['onoverlay'] = 'eventHandler';
	s['popupParent'] = 'integer';
	s['title'] = 'caption';
	s['useSVG'] = 'boolean';
	s['useSoftModals'] = 'boolean';
	s['zenPersistentPopup'] = 'boolean';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_abstractPage_backgroundTimerHandler = function() {
if (this._bgTaskID) {
this.MonitorBackgroundTask(this._bgTaskID);
}
}

self._ZEN_Component_abstractPage_cancelPopup = function() {
if (zenASSERT(this.isPopup,"cancelPopup called on non-popup window.",arguments)) { return; }
if (this.isSoftModal) {
var opener = this.getOpener();
var rootZenWindow = zenGetRootZenWindow();
if (rootZenWindow && rootZenWindow.zenPage) {
var rootPage = rootZenWindow.zenPage;
if (rootPage.modalStack) {
var modalGroup = rootPage.modalStack[rootPage.modalStack.length - 1];
if (modalGroup) modalGroup._canClose = true;
}
rootPage.endModal();
}
if (opener) {
if (typeof opener.zenPopupClosed == 'function') opener.zenPopupClosed();
if (opener.zenPopupWindow == self) opener.zenPopupWindow = null;
}
}
else {
window.close();
}
}

self._ZEN_Component_abstractPage_clearBackgroundTask = function() {
if (null != this._bgTimerID) {
self.clearTimeout(this._bgTimerID);
delete this._bgTimerID;
}
delete this._bgTaskID;
}

self._ZEN_Component_abstractPage_correctIELayering = function(div) {
if (zenIsIE && div) { //like SAM055
var iFrame = div._iFrame;
if (!iFrame) {
var iFrame = document.createElement("iframe");
div._iFrame = iFrame;
}
iFrame.src = '';
iFrame.frameBorder = '0';
var s = iFrame.style;
s.filter = 'alpha(opacity=0)';
s.zIndex = -1;
s.position = 'absolute';
s.top = '0px';
s.left = '0px';
s.width = '100%';
var h = div.offsetHeight;
if (div.scrollHeight>h) h=div.scrollHeight;
s.height = h+'px';
s.border = '0px solid black';
s.background = 'transparent';
div.insertBefore(iFrame,div.firstChild);
}
}

self._ZEN_Component_abstractPage_createComponent = function(name) {
return this.createComponentNS('',name);
}

self._ZEN_Component_abstractPage_createComponentNS = function(ns,name,parent,div) {
var component = null;
try {
if (div && div.zen) {
alert('ZEN ERROR:\ncreateComponentNS: Attempt to create a component within a div element already in use:\n=============\n'+ div.zen);
return null;
}
if (ns=='' && name=='axis') {
name = 'yAxis';
}
var component = zenCreateComponent(ns,name);
if (component && parent) {
parent.addChild(component);
if (div) {
div.id = 'zen' + component.index;
div.zen = component.index;
component.refreshContents(true);
}
}
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in createComponentNS.');
}
return component;
}

self._ZEN_Component_abstractPage_deleteComponent = function(comp,refresh,sync) {
zenASSERT(comp,"Attempt to delete invalid object",arguments);
refresh = ('undefined' == typeof refresh) ? true : refresh;
sync = ('undefined' == typeof sync) ? false : sync;
if (comp.onDelete) {
comp.onDelete();
}
var group = comp.parent;
if (null != group) {
for (var n = 0; n < group.children.length; n++) {
if (comp == group.children[n]) {
group.children.splice(n,1);
comp.parent = '';
if (refresh && comp.visible && ('undefined' == typeof comp.svgComponent)) {
group.refreshContents(sync);
}
break;
}
}
}
if ('' != comp.index) {
_zenIndex[comp.index] = null;
}
if ('' != comp.id) {
delete _zenIds[comp.id];
}
}

self._ZEN_Component_abstractPage_endModal = function() {
if (zenASSERT(this.modalStack && (this.modalStack.length>0),"endModal should not be called while there is no current modal component.",arguments)) { return; }
var trap = self.document.getElementById("zenMouseTrap");
if (zenASSERT(trap,"Unable to find zenMouseTrap div.",arguments)) { return; }
var component = this.modalStack[this.modalStack.length - 1];
if (component.onCanEndModalHandler) {
if (!component.onCanEndModalHandler()) {
return;
}
}
this.modalStack.length = this.modalStack.length - 1;
if (0 == this.modalStack.length) {
trap.style.display = "none";
trap.onmouseup = null;
trap.onmousedown = null;
trap.onmousemove = null;
if (this._hideEmbeds && self.document.embeds) {
this._hideEmbeds = false;
for (var n = 0; n < self.document.embeds.length; n++) {
self.document.embeds[n].style.display = '';
}
}
}
else {
trap.style.zIndex = 100 + (this.modalStack.length*10);
}
var zindex = (this.modalStack.length>0) ? (100 + (this.modalStack.length*10)) : 0;
if (component.onEndModalHandler) {
component.onEndModalHandler(zindex);
}
else {
component.setHidden(true);
}
}

self._ZEN_Component_abstractPage_fireOnLoadEvent = function() {
if (this.dragAndDrop && ZLM) {
ZLM.initDataDragDrop();
}
if (this.isSoftModal && window.frameElement && window.frameElement.ownerDocument) {
var parentWindow = (window.frameElement.ownerDocument.defaultView ? window.frameElement.ownerDocument.defaultView : window.frameElement.ownerDocument.parentWindow);
if (parentWindow) {
parentWindow.zenPopupWindow = window;
if (parentWindow.zenPage) {
var modalGroupIndex = parseInt(window.frameElement.getAttribute('zenCompIndex'));
if (!isNaN(modalGroupIndex)) {
var modalGroup = parentWindow.zenPage.getComponent(modalGroupIndex);
if (modalGroup && zenPage) zenPage._rootWindow = modalGroup._rootWindow;
}
}
}
}
for (var n = _zenIndex.length - 1; n >= 0; n--) {
if (_zenIndex[n] && _zenIndex[n].onloadHandler) {
_zenIndex[n].onloadHandler();
}
}
return true;
}

self._ZEN_Component_abstractPage_fireOnResizeEvent = function() {
if (zenPage.onresizeHandler) {
zenPage.onresizeHandler();
}
return true;
}

self._ZEN_Component_abstractPage_fireOnUnloadEvent = function() {
var hasRet = false;
var msg = '';
for (var n = _zenIndex.length - 1; n >= 0; n--) {
if (_zenIndex[n] && _zenIndex[n].onunloadHandler) {
var val = _zenIndex[n].onunloadHandler();
if (!hasRet) {
val = (null == val) ? true : ((typeof val == 'string') ? val : true);
if (typeof val == 'string') {
hasRet = true;
msg = val;
}
}
}
}
if (hasRet) {
return msg;
}
return true;
}

self._ZEN_Component_abstractPage_firePopupAction = function(action,value,close) {
if (zenASSERT(this.isPopup,"firePopupAction called on non-popup window.",arguments)) { return; }
action = zenGet(action,'ok');
value = zenGet(value);
close = zenGet(close,true);
if ('string' == typeof action) {
action = decodeURIComponent(action);
}
if ('string' == typeof value) {
value = decodeURIComponent(value);
}
if (false && window.dialogArguments && window.dialogArguments.popupActionHandler) {
window.dialogArguments.popupActionHandler(this.popupParent,window.dialogArguments._popupName,action,value);
}
var opener = this.getOpener();
if (opener && opener.zenPage && opener.zenPage.popupActionHandler) {
try {
var mode = opener.zenSynchronousMode;
opener.zenSynchronousMode = true;
opener.zenPage.popupActionHandler(this.popupParent,opener.zenPage._popupName,action,value);
opener.zenPopupWindow = null;
opener.zenSynchronousMode = mode;
}
catch(ex) {
}
}
if (close) {
if (this.isSoftModal) {
var rootZenWindow = zenGetRootZenWindow();
if (rootZenWindow && rootZenWindow.zenPage) {
var rootPage = rootZenWindow.zenPage;
if (rootPage.modalStack) {
var modalGroup = rootPage.modalStack[rootPage.modalStack.length - 1];
if (modalGroup) modalGroup._canClose = true;
}
rootPage.endModal();
}
}
else {
window.close();
}
}
delete this._popupName;
}

self._ZEN_Component_abstractPage_getComponent = function(index) {
if ('string'==typeof(index)) {
var p = index.split('.');
if (p.length>1) {
var comp = _zenIndex[p[0]];
if (comp) {
comp.tuple = p[1];
}
return comp;
}
}
return _zenIndex[index];
}

self._ZEN_Component_abstractPage_getComponentById = function(id,tuple) {
var comp = _zenIds[id];
if (comp && 'undefined' != tuple) {
comp.tuple = tuple;
}
return comp;
}

self._ZEN_Component_abstractPage_getOpener = function() {
return (this.isSoftModal ? (this._rootWindow ? this._rootWindow : window.parent) : window.opener);
}

self._ZEN_Component_abstractPage_gotoPage = function(url) {
if (null!=url && ''!=url) {
try {
if (window.location && window.location.assign) window.location.assign(zenLink(url));
else self.document.location = zenLink(url) ;
}
catch (e) {
}
}
}

self._ZEN_Component_abstractPage_launchPopupWindow = function(url,pageName,features,parms,parent) {
zenLaunchPopupWindow(url, pageName, features,parms,parent);
}

self._ZEN_Component_abstractPage_onhandleAutoLogoutWarn = function() {
return true;
}

self._ZEN_Component_abstractPage_onloadHandler = function() {
}

self._ZEN_Component_abstractPage_onoverlayHandler = function(index) {
zenInvokeCallbackMethod(this.onoverlay,this,'onoverlay','index',index);
}

self._ZEN_Component_abstractPage_popupActionHandler = function(parent,name,action,value) {
if ('' == parent || null == parent) {
if (this.onPopupAction) {
this.onPopupAction(name,action,value);
}
}
else {
var comp = this.getComponent(parent);
if (comp && comp.onPopupAction) {
comp.onPopupAction(name,action,value);
}
}
}

self._ZEN_Component_abstractPage_setBackgroundTask = function(taskid) {
this.clearBackgroundTask();
this._bgTaskID = taskid;
if (zenPage.enableAutoRefresh || (typeof zenPage.enableAutoRefresh != 'boolean')) {
this._bgTimerID = self.setTimeout("zenPage.backgroundTimerHandler()",this.backgroundTimerInterval);
}
}

self._ZEN_Component_abstractPage_setComponentId = function(obj,id) {
var div = null;
if (obj.getEnclosingDiv) {
div = obj.getEnclosingDiv();
}
if ('' != obj.id) {
delete _zenIds[obj.id];
}
obj.id = id;
if ('' != obj.id) {
_zenIds[obj.id] = obj;
}
if (div) {
div.id = (''==obj.id) ? 'zen' + obj.index : obj.id;
}
}

self._ZEN_Component_abstractPage_setTraceOption = function(name,flag) {
switch(name) {
case 'serialize':
zenDEBUGSerialize = flag;
break;
case 'js':
cspRunServerDebugWindow	= flag;
break;
case 'events':
zenDEBUGTraceEvents = flag;
if (flag) {
zenTRACE("TRACE started",this.title,'');
}
break;
}
}

self._ZEN_Component_abstractPage_startModal = function(component) {
if (zenASSERT(component&&zenIsComponent(component),"startModal called with an invalid component.",arguments)) { return; }
var trap = self.document.getElementById("zenMouseTrap");
if (zenASSERT(trap,"Unable to find zenMouseTrap div.",arguments)) { return; }
if (null == this.modalStack) {
this.modalStack = new Array();
}
this.modalStack[this.modalStack.length] = component;
trap.style.display = "";
trap.style.zIndex = 100 + (this.modalStack.length*10);
this.closeModalPending = 0;
trap.onmouseup = function() {if (zenPage.closeModalPending) {zenPage.closeModalPending = 0; zenPage.endModal();}}
trap.onmousedown = function() {zenPage.closeModalPending = 1;}
trap.onmouseout = function() {zenPage.closeModalPending = 0;}
trap.onmousemove = null;
var page = zenPage.getEnclosingDiv();
zenASSERT(page,"Unable to find enclosing div for page.",arguments);
trap.style.top="0px";
trap.style.left="0px";
if (zenIsIE) {
trap.style.position = "absolute";
trap.style.height = Math.max(document.body.scrollHeight, zenGetWindowHeight()) + 'px';
trap.style.width = Math.max(document.body.scrollWidth, zenGetWindowWidth()) + 'px';
}
else {
trap.style.position = "fixed";
trap.style.width = Math.max(document.body.clientWidth, zenGetWindowWidth()) + 'px';
trap.style.height = Math.max(document.body.clientHeight, zenGetWindowHeight()) + 'px';
}
var zindex = 101 + (this.modalStack.length*10);
if (component.onStartModalHandler) {
component.onStartModalHandler(zindex);
this.correctIELayering(self.document.getElementById('zenModalDiv'));
}
else {
var enc  = component.getEnclosingDiv();
enc.style.position = "absolute";
enc.style.zIndex = zindex;
component.setHidden(false);
this.correctIELayering(enc);
}
}

self._ZEN_Component_abstractPage_JavaInstalled = function() {
	return zenClassMethod(this,'JavaInstalled','','BOOLEAN',arguments);
}

self._ZEN_Component_abstractPage_LoadZenComponent = function(pNamespace,pName,pClassName,pCSSLevel) {
	return zenClassMethod(this,'LoadZenComponent','L,L,L,L','BOOLEAN',arguments);
}

self._ZEN_Component_abstractPage_MonitorBackgroundTask = function(pTaskID) {
	zenClassMethod(this,'MonitorBackgroundTask','L','',arguments);
}

self._ZEN_Component_abstractPage_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_abstractPage__Loader = function() {
	zenLoadClass('_ZEN_Component_group');
	_ZEN_Component_abstractPage.prototype = zenCreate('_ZEN_Component_group',-1);
	var p = _ZEN_Component_abstractPage.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_abstractPage;
	p.superClass = ('undefined' == typeof _ZEN_Component_group) ? zenMaster._ZEN_Component_group.prototype:_ZEN_Component_group.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.abstractPage';
	p._type = 'abstractPage';
	p.serialize = _ZEN_Component_abstractPage_serialize;
	p.getSettings = _ZEN_Component_abstractPage_getSettings;
	p.JavaInstalled = _ZEN_Component_abstractPage_JavaInstalled;
	p.LoadZenComponent = _ZEN_Component_abstractPage_LoadZenComponent;
	p.MonitorBackgroundTask = _ZEN_Component_abstractPage_MonitorBackgroundTask;
	p.ReallyRefreshContents = _ZEN_Component_abstractPage_ReallyRefreshContents;
	p.backgroundTimerHandler = _ZEN_Component_abstractPage_backgroundTimerHandler;
	p.cancelPopup = _ZEN_Component_abstractPage_cancelPopup;
	p.clearBackgroundTask = _ZEN_Component_abstractPage_clearBackgroundTask;
	p.correctIELayering = _ZEN_Component_abstractPage_correctIELayering;
	p.createComponent = _ZEN_Component_abstractPage_createComponent;
	p.createComponentNS = _ZEN_Component_abstractPage_createComponentNS;
	p.deleteComponent = _ZEN_Component_abstractPage_deleteComponent;
	p.endModal = _ZEN_Component_abstractPage_endModal;
	p.fireOnLoadEvent = _ZEN_Component_abstractPage_fireOnLoadEvent;
	p.fireOnResizeEvent = _ZEN_Component_abstractPage_fireOnResizeEvent;
	p.fireOnUnloadEvent = _ZEN_Component_abstractPage_fireOnUnloadEvent;
	p.firePopupAction = _ZEN_Component_abstractPage_firePopupAction;
	p.getComponent = _ZEN_Component_abstractPage_getComponent;
	p.getComponentById = _ZEN_Component_abstractPage_getComponentById;
	p.getOpener = _ZEN_Component_abstractPage_getOpener;
	p.gotoPage = _ZEN_Component_abstractPage_gotoPage;
	p.launchPopupWindow = _ZEN_Component_abstractPage_launchPopupWindow;
	p.onhandleAutoLogoutWarn = _ZEN_Component_abstractPage_onhandleAutoLogoutWarn;
	p.onloadHandler = _ZEN_Component_abstractPage_onloadHandler;
	p.onoverlayHandler = _ZEN_Component_abstractPage_onoverlayHandler;
	p.popupActionHandler = _ZEN_Component_abstractPage_popupActionHandler;
	p.setBackgroundTask = _ZEN_Component_abstractPage_setBackgroundTask;
	p.setComponentId = _ZEN_Component_abstractPage_setComponentId;
	p.setTraceOption = _ZEN_Component_abstractPage_setTraceOption;
	p.startModal = _ZEN_Component_abstractPage_startModal;
}

self._zenClassIdx['activeHGroup'] = '_ZEN_Component_activeHGroup';
self._ZEN_Component_activeHGroup = function(index,id) {
	if (index>=0) {_ZEN_Component_activeHGroup__init(this,index,id);}
}

self._ZEN_Component_activeHGroup__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_activeGroup__init) ?zenMaster._ZEN_Component_activeGroup__init(o,index,id):_ZEN_Component_activeGroup__init(o,index,id);
	o.autoExpand = '';
	o.handlePattern = '';
	o.handleThickness = '';
	o.noResize = '';
	o.onresizeLeft = '';
	o.onresizeRight = '';
	o.soundFX = '';
	o.split = '';
}
function _ZEN_Component_activeHGroup_serialize(set,s)
{
	var o = this;s[0]='2717836353';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.autoExpand;s[8]=o.aux;s[9]=set.serializeList(o,o.children,true,'children');s[10]=o.containerStyle;s[11]=(o.disabled?1:0);s[12]=(o.dragEnabled?1:0);s[13]=(o.dropEnabled?1:0);s[14]=(o.dynamic?1:0);s[15]=o.enclosingClass;s[16]=o.enclosingStyle;s[17]=o.error;s[18]=o.handlePattern;s[19]=o.handleThickness;s[20]=o.height;s[21]=(o.hidden?1:0);s[22]=o.hint;s[23]=o.hintClass;s[24]=o.hintStyle;s[25]=o.label;s[26]=o.labelClass;s[27]=o.labelDisabledClass;s[28]=o.labelStyle;s[29]=o.noResize;s[30]=o.onafterdrag;s[31]=o.onbeforedrag;s[32]=o.ondrag;s[33]=o.ondrop;s[34]=o.onhide;s[35]=o.onrefresh;s[36]=o.onresizeLeft;s[37]=o.onresizeRight;s[38]=o.onshow;s[39]=o.onupdate;s[40]=o.overlayMode;s[41]=o.renderFlag;s[42]=(o.showLabel?1:0);s[43]=o.slice;s[44]=o.soundFX;s[45]=o.split;s[46]=o.title;s[47]=o.tuple;s[48]=o.valign;s[49]=(o.visible?1:0);s[50]=o.width;
}
function _ZEN_Component_activeHGroup_getSettings(s)
{
	s['name'] = 'string';
	s['autoExpand'] = 'string';
	s['handlePattern'] = 'string';
	s['handleThickness'] = 'string';
	s['noResize'] = 'string';
	s['onresizeLeft'] = 'eventHandler';
	s['onresizeRight'] = 'eventHandler';
	s['soundFX'] = 'string';
	s['split'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_activeHGroup_getController = function() {
var div = this.findElement("activeHGroup");
if (!div) return(null);
return(div.engine);
}

self._ZEN_Component_activeHGroup_installResizeHandlers = function() {
var ctrl = this.getController();
if (ctrl) {
if (ctrl.lDiv && this.onresizeLeft) {
if (ctrl.lDiv.firstChild && ctrl.lDiv.firstChild!=ctrl.lLid) {
ZLM.setLocalAttribute(ctrl.lDiv.firstChild,"onresize",this.onresizeLeft);
}
}
if (ctrl.rDiv && this.onresizeRight) {
if (ctrl.rDiv.firstChild && ctrl.rDiv.firstChild!=ctrl.rLid) {
ZLM.setLocalAttribute(ctrl.rDiv.firstChild,"onresize",this.onresizeRight);
}
}
}
}

self._ZEN_Component_activeHGroup_onRefreshContents = function() {
ZLM.registerManagerClass("activeHGroup",ZLM_AHG.initActiveHGroup);
ZLM.initLayout();
this.installResizeHandlers();
}

self._ZEN_Component_activeHGroup_onloadHandler = function() {
this.invokeSuper('onloadHandler',arguments);
ZLM.registerManagerClass("activeHGroup",ZLM_AHG.initActiveHGroup);
ZLM.initLayout();
this.installResizeHandlers();
}

self._ZEN_Component_activeHGroup_restoreSplit = function() {
var ctrl = this.getController();
if (ctrl) ctrl.restoreSplit();
}

self._ZEN_Component_activeHGroup_setProperty = function(property,value,value2) {
var ctrl = this.getController();
switch(property) {
case "split":
this.split = value;
if (ctrl) ctrl.setSplit(value);
break;
case "autoExpand":
this.autoExpand = value;
if (ctrl) ctrl.setAutoExpand(value);
break;
case "noResize":
this.noResize = value;
if (ctrl) ctrl.setResizeFlag(value);
break;
case "handleThickness":
this.handleThickness = value;
if (ctrl) {
ctrl.setHandleThickness(value);
ctrl.sizeContainer();
}
break;
case "soundFX":
this.soundFX = value;
if (ctrl) ctrl.setSoundEffect(value);
break;
case "onresizeLeft":
this.onresizeLeft = value;
this.installResizeHandlers();
break;
case "onresizeRight":
this.onresizeRight = value;
this.installResizeHandlers();
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_activeHGroup_showLeftOnly = function() {
var ctrl = this.getController();
if (ctrl) ctrl.showLeftOnly();
}

self._ZEN_Component_activeHGroup_showRightOnly = function() {
var ctrl = this.getController();
if (ctrl) ctrl.showRightOnly();
}

self._ZEN_Component_activeHGroup_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_activeHGroup__Loader = function() {
	zenLoadClass('_ZEN_Component_activeGroup');
	_ZEN_Component_activeHGroup.prototype = zenCreate('_ZEN_Component_activeGroup',-1);
	var p = _ZEN_Component_activeHGroup.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_activeHGroup;
	p.superClass = ('undefined' == typeof _ZEN_Component_activeGroup) ? zenMaster._ZEN_Component_activeGroup.prototype:_ZEN_Component_activeGroup.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.activeHGroup';
	p._type = 'activeHGroup';
	p.serialize = _ZEN_Component_activeHGroup_serialize;
	p.getSettings = _ZEN_Component_activeHGroup_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_activeHGroup_ReallyRefreshContents;
	p.getController = _ZEN_Component_activeHGroup_getController;
	p.installResizeHandlers = _ZEN_Component_activeHGroup_installResizeHandlers;
	p.onRefreshContents = _ZEN_Component_activeHGroup_onRefreshContents;
	p.onloadHandler = _ZEN_Component_activeHGroup_onloadHandler;
	p.restoreSplit = _ZEN_Component_activeHGroup_restoreSplit;
	p.setProperty = _ZEN_Component_activeHGroup_setProperty;
	p.showLeftOnly = _ZEN_Component_activeHGroup_showLeftOnly;
	p.showRightOnly = _ZEN_Component_activeHGroup_showRightOnly;
}

self._zenClassIdx['activeVGroup'] = '_ZEN_Component_activeVGroup';
self._ZEN_Component_activeVGroup = function(index,id) {
	if (index>=0) {_ZEN_Component_activeVGroup__init(this,index,id);}
}

self._ZEN_Component_activeVGroup__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_activeGroup__init) ?zenMaster._ZEN_Component_activeGroup__init(o,index,id):_ZEN_Component_activeGroup__init(o,index,id);
	o.autoExpand = '';
	o.handlePattern = '';
	o.handleThickness = '';
	o.noResize = '';
	o.onresizeBottom = '';
	o.onresizeTop = '';
	o.soundFX = '';
	o.split = '';
}
function _ZEN_Component_activeVGroup_serialize(set,s)
{
	var o = this;s[0]='1738230644';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.autoExpand;s[8]=o.aux;s[9]=set.serializeList(o,o.children,true,'children');s[10]=o.containerStyle;s[11]=(o.disabled?1:0);s[12]=(o.dragEnabled?1:0);s[13]=(o.dropEnabled?1:0);s[14]=(o.dynamic?1:0);s[15]=o.enclosingClass;s[16]=o.enclosingStyle;s[17]=o.error;s[18]=o.handlePattern;s[19]=o.handleThickness;s[20]=o.height;s[21]=(o.hidden?1:0);s[22]=o.hint;s[23]=o.hintClass;s[24]=o.hintStyle;s[25]=o.label;s[26]=o.labelClass;s[27]=o.labelDisabledClass;s[28]=o.labelStyle;s[29]=o.noResize;s[30]=o.onafterdrag;s[31]=o.onbeforedrag;s[32]=o.ondrag;s[33]=o.ondrop;s[34]=o.onhide;s[35]=o.onrefresh;s[36]=o.onresizeBottom;s[37]=o.onresizeTop;s[38]=o.onshow;s[39]=o.onupdate;s[40]=o.overlayMode;s[41]=o.renderFlag;s[42]=(o.showLabel?1:0);s[43]=o.slice;s[44]=o.soundFX;s[45]=o.split;s[46]=o.title;s[47]=o.tuple;s[48]=o.valign;s[49]=(o.visible?1:0);s[50]=o.width;
}
function _ZEN_Component_activeVGroup_getSettings(s)
{
	s['name'] = 'string';
	s['autoExpand'] = 'string';
	s['handlePattern'] = 'string';
	s['handleThickness'] = 'string';
	s['noResize'] = 'string';
	s['onresizeBottom'] = 'eventHandler';
	s['onresizeTop'] = 'eventHandler';
	s['soundFX'] = 'string';
	s['split'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_activeVGroup_getController = function() {
var div = this.findElement("activeVGroup");
if (!div) return(null);
return(div.engine);
}

self._ZEN_Component_activeVGroup_installResizeHandlers = function() {
var ctrl = this.getController();
if (ctrl) {
if (ctrl.tDiv && this.onresizeTop) {
if (ctrl.tDiv.firstChild && ctrl.tDiv.firstChild!=ctrl.tLid) {
ZLM.setLocalAttribute(ctrl.tDiv.firstChild,"onresize",this.onresizeTop);
}
}
if (ctrl.bDiv && this.onresizeBottom) {
if (ctrl.bDiv.firstChild && ctrl.bDiv.firstChild!=ctrl.bLid) {
ZLM.setLocalAttribute(ctrl.bDiv.firstChild,"onresize",this.onresizeBottom);
}
}
}
}

self._ZEN_Component_activeVGroup_onRefreshContents = function() {
ZLM.registerManagerClass("activeHGroup",ZLM_AHG.initActiveHGroup);
ZLM.initLayout();
this.installResizeHandlers();
}

self._ZEN_Component_activeVGroup_onloadHandler = function() {
this.invokeSuper('onloadHandler',arguments);
ZLM.registerManagerClass("activeVGroup",ZLM_AVG.initActiveVGroup);
ZLM.initLayout();
this.installResizeHandlers();
}

self._ZEN_Component_activeVGroup_restoreSplit = function() {
var ctrl = this.getController();
if (ctrl) ctrl.restoreSplit();
}

self._ZEN_Component_activeVGroup_setProperty = function(property,value,value2) {
var ctrl = this.getController();
switch(property) {
case "split":
this.split = value;
if (ctrl) ctrl.setSplit(value);
break;
case "autoExpand":
this.autoExpand = value;
if (ctrl) ctrl.setAutoExpand(value);
break;
case "noResize":
this.noResize = value;
if (ctrl) ctrl.setResizeFlag(value);
break;
case "handleThickness":
this.handleThickness = value;
if (ctrl)  {
ctrl.setHandleThickness(value);
ctrl.sizeContainer();
}
break;
case "soundFX":
this.soundFX = value;
if (ctrl) ctrl.setSoundEffect(value);
break;
case "onresizeTop":
this.onresizeTop = value;
this.installResizeHandlers();
break;
case "onresizeBottom":
this.onresizeBottom = value;
this.installResizeHandlers();
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_activeVGroup_showBottomOnly = function() {
var ctrl = this.getController();
if (ctrl) ctrl.showBottomOnly();
}

self._ZEN_Component_activeVGroup_showTopOnly = function() {
var ctrl = this.getController();
if (ctrl) ctrl.showTopOnly();
}

self._ZEN_Component_activeVGroup_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_activeVGroup__Loader = function() {
	zenLoadClass('_ZEN_Component_activeGroup');
	_ZEN_Component_activeVGroup.prototype = zenCreate('_ZEN_Component_activeGroup',-1);
	var p = _ZEN_Component_activeVGroup.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_activeVGroup;
	p.superClass = ('undefined' == typeof _ZEN_Component_activeGroup) ? zenMaster._ZEN_Component_activeGroup.prototype:_ZEN_Component_activeGroup.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.activeVGroup';
	p._type = 'activeVGroup';
	p.serialize = _ZEN_Component_activeVGroup_serialize;
	p.getSettings = _ZEN_Component_activeVGroup_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_activeVGroup_ReallyRefreshContents;
	p.getController = _ZEN_Component_activeVGroup_getController;
	p.installResizeHandlers = _ZEN_Component_activeVGroup_installResizeHandlers;
	p.onRefreshContents = _ZEN_Component_activeVGroup_onRefreshContents;
	p.onloadHandler = _ZEN_Component_activeVGroup_onloadHandler;
	p.restoreSplit = _ZEN_Component_activeVGroup_restoreSplit;
	p.setProperty = _ZEN_Component_activeVGroup_setProperty;
	p.showBottomOnly = _ZEN_Component_activeVGroup_showBottomOnly;
	p.showTopOnly = _ZEN_Component_activeVGroup_showTopOnly;
}

self._zenClassIdx['buttonBar'] = '_ZEN_Component_buttonBar';
self._ZEN_Component_buttonBar = function(index,id) {
	if (index>=0) {_ZEN_Component_buttonBar__init(this,index,id);}
}

self._ZEN_Component_buttonBar__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_group__init) ?zenMaster._ZEN_Component_group__init(o,index,id):_ZEN_Component_group__init(o,index,id);
}
function _ZEN_Component_buttonBar_serialize(set,s)
{
	var o = this;s[0]='2521056755';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.cellAlign;s[9]=o.cellSize;s[10]=o.cellStyle;s[11]=o.cellVAlign;s[12]=set.serializeList(o,o.children,true,'children');s[13]=o.containerStyle;s[14]=(o.disabled?1:0);s[15]=(o.dragEnabled?1:0);s[16]=(o.dropEnabled?1:0);s[17]=(o.dynamic?1:0);s[18]=o.enclosingClass;s[19]=o.enclosingStyle;s[20]=o.error;s[21]=o.groupClass;s[22]=o.groupStyle;s[23]=o.height;s[24]=(o.hidden?1:0);s[25]=o.hint;s[26]=o.hintClass;s[27]=o.hintStyle;s[28]=o.label;s[29]=o.labelClass;s[30]=o.labelDisabledClass;s[31]=o.labelPosition;s[32]=o.labelStyle;s[33]=o.layout;s[34]=o.onafterdrag;s[35]=o.onbeforedrag;s[36]=o.onclick;s[37]=o.ondrag;s[38]=o.ondrop;s[39]=o.onhide;s[40]=o.onrefresh;s[41]=o.onshow;s[42]=o.onupdate;s[43]=o.overlayMode;s[44]=o.renderFlag;s[45]=(o.showLabel?1:0);s[46]=o.slice;s[47]=o.title;s[48]=o.tuple;s[49]=o.valign;s[50]=(o.visible?1:0);s[51]=o.width;
}
function _ZEN_Component_buttonBar_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_buttonBar_onloadHandler = function() {
this.invokeSuper('onloadHandler',arguments);
ZMS.initialize();
var div =this.getEnclosingDiv();
for(var k=div.firstChild;k!=null;k=k.nextSibling) {
if (k.nodeType==1 && k.className=="buttonBar") {
div.buttonBar=k;
ZMS.sizeButtonBar(k);
ZLM.notifyResize(document.body);
return;
}
}
}

self._ZEN_Component_buttonBar_setProperty = function(property,value,value2) {
switch(property) {
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_buttonBar_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_buttonBar__Loader = function() {
	zenLoadClass('_ZEN_Component_group');
	_ZEN_Component_buttonBar.prototype = zenCreate('_ZEN_Component_group',-1);
	var p = _ZEN_Component_buttonBar.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_buttonBar;
	p.superClass = ('undefined' == typeof _ZEN_Component_group) ? zenMaster._ZEN_Component_group.prototype:_ZEN_Component_group.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.buttonBar';
	p._type = 'buttonBar';
	p.serialize = _ZEN_Component_buttonBar_serialize;
	p.getSettings = _ZEN_Component_buttonBar_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_buttonBar_ReallyRefreshContents;
	p.onloadHandler = _ZEN_Component_buttonBar_onloadHandler;
	p.setProperty = _ZEN_Component_buttonBar_setProperty;
}

self._zenClassIdx['composite'] = '_ZEN_Component_composite';
self._ZEN_Component_composite = function(index,id) {
	if (index>=0) {_ZEN_Component_composite__init(this,index,id);}
}

self._ZEN_Component_composite__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_group__init) ?zenMaster._ZEN_Component_group__init(o,index,id):_ZEN_Component_group__init(o,index,id);
	o.childrenCreated = false;
}
function _ZEN_Component_composite_serialize(set,s)
{
	var o = this;s[0]='4096323540';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.cellAlign;s[9]=o.cellSize;s[10]=o.cellStyle;s[11]=o.cellVAlign;s[12]=set.serializeList(o,o.children,true,'children');s[13]=(o.childrenCreated?1:0);s[14]=o.containerStyle;s[15]=(o.disabled?1:0);s[16]=(o.dragEnabled?1:0);s[17]=(o.dropEnabled?1:0);s[18]=(o.dynamic?1:0);s[19]=o.enclosingClass;s[20]=o.enclosingStyle;s[21]=o.error;s[22]=o.groupClass;s[23]=o.groupStyle;s[24]=o.height;s[25]=(o.hidden?1:0);s[26]=o.hint;s[27]=o.hintClass;s[28]=o.hintStyle;s[29]=o.label;s[30]=o.labelClass;s[31]=o.labelDisabledClass;s[32]=o.labelPosition;s[33]=o.labelStyle;s[34]=o.layout;s[35]=o.onafterdrag;s[36]=o.onbeforedrag;s[37]=o.onclick;s[38]=o.ondrag;s[39]=o.ondrop;s[40]=o.onhide;s[41]=o.onrefresh;s[42]=o.onshow;s[43]=o.onupdate;s[44]=o.overlayMode;s[45]=o.renderFlag;s[46]=(o.showLabel?1:0);s[47]=o.slice;s[48]=o.title;s[49]=o.tuple;s[50]=o.valign;s[51]=(o.visible?1:0);s[52]=o.width;
}
function _ZEN_Component_composite_getSettings(s)
{
	s['name'] = 'string';
	s['childrenCreated'] = 'boolean';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_composite_getChildById = function(id) {
var cid = (''==this.id) ? 'id'+this.index : this.id;
return zenPage.getComponentById(cid+'.'+id);
}

self._ZEN_Component_composite_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_composite__Loader = function() {
	zenLoadClass('_ZEN_Component_group');
	_ZEN_Component_composite.prototype = zenCreate('_ZEN_Component_group',-1);
	var p = _ZEN_Component_composite.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_composite;
	p.superClass = ('undefined' == typeof _ZEN_Component_group) ? zenMaster._ZEN_Component_group.prototype:_ZEN_Component_group.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.composite';
	p._type = 'composite';
	p.serialize = _ZEN_Component_composite_serialize;
	p.getSettings = _ZEN_Component_composite_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_composite_ReallyRefreshContents;
	p.getChildById = _ZEN_Component_composite_getChildById;
}

self._zenClassIdx['contextMenu'] = '_ZEN_Component_contextMenu';
self._ZEN_Component_contextMenu = function(index,id) {
	if (index>=0) {_ZEN_Component_contextMenu__init(this,index,id);}
}

self._ZEN_Component_contextMenu__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_group__init) ?zenMaster._ZEN_Component_group__init(o,index,id):_ZEN_Component_group__init(o,index,id);
}
function _ZEN_Component_contextMenu_serialize(set,s)
{
	var o = this;s[0]='2521056755';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.cellAlign;s[9]=o.cellSize;s[10]=o.cellStyle;s[11]=o.cellVAlign;s[12]=set.serializeList(o,o.children,true,'children');s[13]=o.containerStyle;s[14]=(o.disabled?1:0);s[15]=(o.dragEnabled?1:0);s[16]=(o.dropEnabled?1:0);s[17]=(o.dynamic?1:0);s[18]=o.enclosingClass;s[19]=o.enclosingStyle;s[20]=o.error;s[21]=o.groupClass;s[22]=o.groupStyle;s[23]=o.height;s[24]=(o.hidden?1:0);s[25]=o.hint;s[26]=o.hintClass;s[27]=o.hintStyle;s[28]=o.label;s[29]=o.labelClass;s[30]=o.labelDisabledClass;s[31]=o.labelPosition;s[32]=o.labelStyle;s[33]=o.layout;s[34]=o.onafterdrag;s[35]=o.onbeforedrag;s[36]=o.onclick;s[37]=o.ondrag;s[38]=o.ondrop;s[39]=o.onhide;s[40]=o.onrefresh;s[41]=o.onshow;s[42]=o.onupdate;s[43]=o.overlayMode;s[44]=o.renderFlag;s[45]=(o.showLabel?1:0);s[46]=o.slice;s[47]=o.title;s[48]=o.tuple;s[49]=o.valign;s[50]=(o.visible?1:0);s[51]=o.width;
}
function _ZEN_Component_contextMenu_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_contextMenu_onRefreshContents = function() {
var pObj = this.parent;
var pDiv = pObj.getEnclosingDiv();
var eDiv = this.getEnclosingDiv();
eDiv.style.display = "none";
var newMenu = null;
for (var k=eDiv.firstChild;k!=null;k=k.nextSibling) {
if (k.nodeType==1 && k.className=="contextMenu") {
newMenu = k;
eDiv.removeChild(k);
}
}
if (!this.uninstalled) {
ZLM.setLocalAttribute(pDiv,"oncontextmenu","");
var mDiv = document.getElementById("contextMenu_"+this.index);
if (mDiv) {
if (mDiv.parentNode && mDiv.parentNode!=eDiv) {
if (mDiv.shadowDiv) mDiv.parentNode.removeChild(mDiv.shadowDiv);
mDiv.shadowDiv = null;
mDiv.parentNode.removeChild(mDiv);
}
}
}
eDiv.appendChild(newMenu);
this.reinitChildren(newMenu);
ZMS.estimateContextMenuSize(newMenu);
ZMS.setContextMenuSize(newMenu);
eDiv.item=newMenu;
if (this.hidden || this.disabled) this.setProperty("disabled",true);
if (this.uninstalled) {
this.uninstalled = false;
this.uninstall();
}
}

self._ZEN_Component_contextMenu_onloadHandler = function() {
this.invokeSuper('onloadHandler',arguments);
ZMS.initialize();
var div = this.getEnclosingDiv();
for (var k=div.firstChild;k!=null;k=k.nextSibling) {
if (k.nodeType==1 && k.className=="contextMenu") {
ZMS.estimateContextMenuSize(k);
ZMS.setContextMenuSize(k);
div.item=k;
if (this.hidden || this.disabled) this.setProperty("disabled",true);
return;
}
}
div.style.display = "none";
}

self._ZEN_Component_contextMenu_reinitChildren = function(menuDiv) {
for (var div = menuDiv.firstChild;div!=null;div=div.nextSibling) {
for (var k=div.firstChild;k!=null;k=k.nextSibling) {
if (k.nodeType==1 && k.className=="csMenuItem") {
var item = zenPage.getComponent(parseInt(div.getAttribute("zen"),10));
if (item) item.initializeClientSideProjection();
}
}
}
}

self._ZEN_Component_contextMenu_reinstall = function(pGroup) {
if (!this.uninstalled) return;
this.uninstalled = false;
var pDiv = pGroup.getEnclosingDiv();
var eDiv = this.getEnclosingDiv();
if (eDiv.parentNode) eDiv.parentNode.removeChild(eDiv);
pDiv.insertBefore(eDiv,pDiv.firstChild);
for (var k=eDiv.firstChild;k!=null;k=k.nextSibling) {
if (k.nodeType==1 && k.className=="contextMenu") {
ZMS.estimateContextMenuSize(k);
ZMS.setContextMenuSize(k);
eDiv.item=k;
if (this.hidden || this.disabled) this.setProperty("disabled",true);
return;
}
}
}

self._ZEN_Component_contextMenu_setProperty = function(property,value,value2) {
switch(property) {
case "hidden":
case "disabled":
var div = this.getEnclosingDiv();
var m = div.item;
if (value) ZMS.disableMenuNode(m);
else ZMS.enableMenuNode(m);
var cm = ZLM.getAncestor(div,"csMenuItem");
if (cm) {
var idx = cm.id.split('_')[1];
var parentPick = zenPage.getComponent(parseInt(idx,10));
if (parentPick) parentPick.setProperty("disabled",value);
}
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_contextMenu_uninstall = function() {
if (this.uninstalled) return;
alert("Uninstall...");
var pDiv = this.parent.getEnclosingDiv();
var eDiv = this.getEnclosingDiv();
ZLM.setLocalAttribute(pDiv,"oncontextmenu","");
var mDiv = document.getElementById("contextMenu_"+this.index);
if (mDiv) {
if (mDiv.parentNode && mDiv.parentNode!=eDiv) {
if (mDiv.shadowDiv) mDiv.parentNode.removeChild(mDiv.shadowDiv);
mDiv.shadowDiv = null;
mDiv.parentNode.removeChild(mDiv);
eDiv.appendChild(mDiv);
}
}
this.uninstalled = true;
}

self._ZEN_Component_contextMenu_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_contextMenu__Loader = function() {
	zenLoadClass('_ZEN_Component_group');
	_ZEN_Component_contextMenu.prototype = zenCreate('_ZEN_Component_group',-1);
	var p = _ZEN_Component_contextMenu.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_contextMenu;
	p.superClass = ('undefined' == typeof _ZEN_Component_group) ? zenMaster._ZEN_Component_group.prototype:_ZEN_Component_group.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.contextMenu';
	p._type = 'contextMenu';
	p.serialize = _ZEN_Component_contextMenu_serialize;
	p.getSettings = _ZEN_Component_contextMenu_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_contextMenu_ReallyRefreshContents;
	p.onRefreshContents = _ZEN_Component_contextMenu_onRefreshContents;
	p.onloadHandler = _ZEN_Component_contextMenu_onloadHandler;
	p.reinitChildren = _ZEN_Component_contextMenu_reinitChildren;
	p.reinstall = _ZEN_Component_contextMenu_reinstall;
	p.setProperty = _ZEN_Component_contextMenu_setProperty;
	p.uninstall = _ZEN_Component_contextMenu_uninstall;
}

self._zenClassIdx['csComboBox'] = '_ZEN_Component_csComboBox';
self._ZEN_Component_csComboBox = function(index,id) {
	if (index>=0) {_ZEN_Component_csComboBox__init(this,index,id);}
}

self._ZEN_Component_csComboBox__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_group__init) ?zenMaster._ZEN_Component_group__init(o,index,id):_ZEN_Component_group__init(o,index,id);
	o.defaultCaption = 'Select...';
	o.icon = 'images\/SmDownArrow.png';
	o.onchange = '';
	o.value = '';
}
function _ZEN_Component_csComboBox_serialize(set,s)
{
	var o = this;s[0]='1263049266';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.cellAlign;s[9]=o.cellSize;s[10]=o.cellStyle;s[11]=o.cellVAlign;s[12]=set.serializeList(o,o.children,true,'children');s[13]=o.containerStyle;s[14]=o.defaultCaption;s[15]=(o.disabled?1:0);s[16]=(o.dragEnabled?1:0);s[17]=(o.dropEnabled?1:0);s[18]=(o.dynamic?1:0);s[19]=o.enclosingClass;s[20]=o.enclosingStyle;s[21]=o.error;s[22]=o.groupClass;s[23]=o.groupStyle;s[24]=o.height;s[25]=(o.hidden?1:0);s[26]=o.hint;s[27]=o.hintClass;s[28]=o.hintStyle;s[29]=o.icon;s[30]=o.label;s[31]=o.labelClass;s[32]=o.labelDisabledClass;s[33]=o.labelPosition;s[34]=o.labelStyle;s[35]=o.layout;s[36]=o.onafterdrag;s[37]=o.onbeforedrag;s[38]=o.onchange;s[39]=o.onclick;s[40]=o.ondrag;s[41]=o.ondrop;s[42]=o.onhide;s[43]=o.onrefresh;s[44]=o.onshow;s[45]=o.onupdate;s[46]=o.overlayMode;s[47]=o.renderFlag;s[48]=(o.showLabel?1:0);s[49]=o.slice;s[50]=o.title;s[51]=o.tuple;s[52]=o.valign;s[53]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[54]=(o.visible?1:0);s[55]=o.width;
}
function _ZEN_Component_csComboBox_getSettings(s)
{
	s['name'] = 'string';
	s['defaultCaption'] = 'string';
	s['icon'] = 'uri';
	s['onchange'] = 'eventHandler';
	s['value'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_csComboBox_onloadHandler = function() {
this.invokeSuper('onloadHandler',arguments);
ZMS.initialize();
var div=this.getEnclosingDiv();
for (var k=div.firstChild;k!=null;k=k.nextSibling) {
if (k.nodeType==1 && k.className=="csComboBox") {
ZMS.organizeComboBox(k);
div.item=k;
return;
}
}
}

self._ZEN_Component_csComboBox_setProperty = function(property,value,value2) {
switch(property) {
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_csComboBox_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_csComboBox__Loader = function() {
	zenLoadClass('_ZEN_Component_group');
	_ZEN_Component_csComboBox.prototype = zenCreate('_ZEN_Component_group',-1);
	var p = _ZEN_Component_csComboBox.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_csComboBox;
	p.superClass = ('undefined' == typeof _ZEN_Component_group) ? zenMaster._ZEN_Component_group.prototype:_ZEN_Component_group.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.csComboBox';
	p._type = 'csComboBox';
	p.serialize = _ZEN_Component_csComboBox_serialize;
	p.getSettings = _ZEN_Component_csComboBox_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_csComboBox_ReallyRefreshContents;
	p.onloadHandler = _ZEN_Component_csComboBox_onloadHandler;
	p.setProperty = _ZEN_Component_csComboBox_setProperty;
}

self._zenClassIdx['csMenuBar'] = '_ZEN_Component_csMenuBar';
self._ZEN_Component_csMenuBar = function(index,id) {
	if (index>=0) {_ZEN_Component_csMenuBar__init(this,index,id);}
}

self._ZEN_Component_csMenuBar__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_group__init) ?zenMaster._ZEN_Component_group__init(o,index,id):_ZEN_Component_group__init(o,index,id);
}
function _ZEN_Component_csMenuBar_serialize(set,s)
{
	var o = this;s[0]='2521056755';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.cellAlign;s[9]=o.cellSize;s[10]=o.cellStyle;s[11]=o.cellVAlign;s[12]=set.serializeList(o,o.children,true,'children');s[13]=o.containerStyle;s[14]=(o.disabled?1:0);s[15]=(o.dragEnabled?1:0);s[16]=(o.dropEnabled?1:0);s[17]=(o.dynamic?1:0);s[18]=o.enclosingClass;s[19]=o.enclosingStyle;s[20]=o.error;s[21]=o.groupClass;s[22]=o.groupStyle;s[23]=o.height;s[24]=(o.hidden?1:0);s[25]=o.hint;s[26]=o.hintClass;s[27]=o.hintStyle;s[28]=o.label;s[29]=o.labelClass;s[30]=o.labelDisabledClass;s[31]=o.labelPosition;s[32]=o.labelStyle;s[33]=o.layout;s[34]=o.onafterdrag;s[35]=o.onbeforedrag;s[36]=o.onclick;s[37]=o.ondrag;s[38]=o.ondrop;s[39]=o.onhide;s[40]=o.onrefresh;s[41]=o.onshow;s[42]=o.onupdate;s[43]=o.overlayMode;s[44]=o.renderFlag;s[45]=(o.showLabel?1:0);s[46]=o.slice;s[47]=o.title;s[48]=o.tuple;s[49]=o.valign;s[50]=(o.visible?1:0);s[51]=o.width;
}
function _ZEN_Component_csMenuBar_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_csMenuBar_onloadHandler = function() {
this.invokeSuper('onloadHandler',arguments);
ZMS.initialize();
var div=this.getEnclosingDiv();
for (var k=div.firstChild;k!=null;k=k.nextSibling) {
if (k.nodeType==1 && k.className=="csMenuBar") {
div.item=k;
ZMS.sizeMenuBar(k);
ZMS.organizeMenuBar(k);
return;
}
}
}

self._ZEN_Component_csMenuBar_setProperty = function(property,value,value2) {
switch(property) {
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_csMenuBar_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_csMenuBar__Loader = function() {
	zenLoadClass('_ZEN_Component_group');
	_ZEN_Component_csMenuBar.prototype = zenCreate('_ZEN_Component_group',-1);
	var p = _ZEN_Component_csMenuBar.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_csMenuBar;
	p.superClass = ('undefined' == typeof _ZEN_Component_group) ? zenMaster._ZEN_Component_group.prototype:_ZEN_Component_group.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.csMenuBar';
	p._type = 'csMenuBar';
	p.serialize = _ZEN_Component_csMenuBar_serialize;
	p.getSettings = _ZEN_Component_csMenuBar_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_csMenuBar_ReallyRefreshContents;
	p.onloadHandler = _ZEN_Component_csMenuBar_onloadHandler;
	p.setProperty = _ZEN_Component_csMenuBar_setProperty;
}

self._zenClassIdx['csMenuBarItem'] = '_ZEN_Component_csMenuBarItem';
self._ZEN_Component_csMenuBarItem = function(index,id) {
	if (index>=0) {_ZEN_Component_csMenuBarItem__init(this,index,id);}
}

self._ZEN_Component_csMenuBarItem__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_group__init) ?zenMaster._ZEN_Component_group__init(o,index,id):_ZEN_Component_group__init(o,index,id);
	o.caption = '';
	o.contextKey = '';
}
function _ZEN_Component_csMenuBarItem_serialize(set,s)
{
	var o = this;s[0]='2436646091';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.caption;s[9]=o.cellAlign;s[10]=o.cellSize;s[11]=o.cellStyle;s[12]=o.cellVAlign;s[13]=set.serializeList(o,o.children,true,'children');s[14]=o.containerStyle;s[15]=o.contextKey;s[16]=(o.disabled?1:0);s[17]=(o.dragEnabled?1:0);s[18]=(o.dropEnabled?1:0);s[19]=(o.dynamic?1:0);s[20]=o.enclosingClass;s[21]=o.enclosingStyle;s[22]=o.error;s[23]=o.groupClass;s[24]=o.groupStyle;s[25]=o.height;s[26]=(o.hidden?1:0);s[27]=o.hint;s[28]=o.hintClass;s[29]=o.hintStyle;s[30]=o.label;s[31]=o.labelClass;s[32]=o.labelDisabledClass;s[33]=o.labelPosition;s[34]=o.labelStyle;s[35]=o.layout;s[36]=o.onafterdrag;s[37]=o.onbeforedrag;s[38]=o.onclick;s[39]=o.ondrag;s[40]=o.ondrop;s[41]=o.onhide;s[42]=o.onrefresh;s[43]=o.onshow;s[44]=o.onupdate;s[45]=o.overlayMode;s[46]=o.renderFlag;s[47]=(o.showLabel?1:0);s[48]=o.slice;s[49]=o.title;s[50]=o.tuple;s[51]=o.valign;s[52]=(o.visible?1:0);s[53]=o.width;
}
function _ZEN_Component_csMenuBarItem_getSettings(s)
{
	s['name'] = 'string';
	s['caption'] = 'caption';
	s['contextKey'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_csMenuBarItem_onloadHandler = function() {
this.invokeSuper('onloadHandler',arguments);
ZMS.initialize();
var div=this.getEnclosingDiv();
for (var k=div.firstChild;k!=null;k=k.nextSibling) {
if (k.nodeType==1 && k.className=="csMenuBarItem") {
ZMS.createMenuBarItemSubtree(k,20);
div.item=k;
}
}
}

self._ZEN_Component_csMenuBarItem_setProperty = function(property,value,value2) {
switch(property) {
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_csMenuBarItem_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_csMenuBarItem__Loader = function() {
	zenLoadClass('_ZEN_Component_group');
	_ZEN_Component_csMenuBarItem.prototype = zenCreate('_ZEN_Component_group',-1);
	var p = _ZEN_Component_csMenuBarItem.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_csMenuBarItem;
	p.superClass = ('undefined' == typeof _ZEN_Component_group) ? zenMaster._ZEN_Component_group.prototype:_ZEN_Component_group.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.csMenuBarItem';
	p._type = 'csMenuBarItem';
	p.serialize = _ZEN_Component_csMenuBarItem_serialize;
	p.getSettings = _ZEN_Component_csMenuBarItem_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_csMenuBarItem_ReallyRefreshContents;
	p.onloadHandler = _ZEN_Component_csMenuBarItem_onloadHandler;
	p.setProperty = _ZEN_Component_csMenuBarItem_setProperty;
}

self._zenClassIdx['csMenuItem'] = '_ZEN_Component_csMenuItem';
self._ZEN_Component_csMenuItem = function(index,id) {
	if (index>=0) {_ZEN_Component_csMenuItem__init(this,index,id);}
}

self._ZEN_Component_csMenuItem__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_group__init) ?zenMaster._ZEN_Component_group__init(o,index,id):_ZEN_Component_group__init(o,index,id);
	o.altCaption = '';
	o.altIcon = '';
	o.altKey = '';
	o.caption = '';
	o.contextKey = '';
	o.icon = '';
	o.iconDisabled = '';
	o.key = '';
	o.onclick = '';
	o.toggleMode = false;
	o.toggleState = '0';
}
function _ZEN_Component_csMenuItem_serialize(set,s)
{
	var o = this;s[0]='3501879268';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.altCaption;s[8]=o.altIcon;s[9]=o.altKey;s[10]=o.aux;s[11]=o.caption;s[12]=o.cellAlign;s[13]=o.cellSize;s[14]=o.cellStyle;s[15]=o.cellVAlign;s[16]=set.serializeList(o,o.children,true,'children');s[17]=o.containerStyle;s[18]=o.contextKey;s[19]=(o.disabled?1:0);s[20]=(o.dragEnabled?1:0);s[21]=(o.dropEnabled?1:0);s[22]=(o.dynamic?1:0);s[23]=o.enclosingClass;s[24]=o.enclosingStyle;s[25]=o.error;s[26]=o.groupClass;s[27]=o.groupStyle;s[28]=o.height;s[29]=(o.hidden?1:0);s[30]=o.hint;s[31]=o.hintClass;s[32]=o.hintStyle;s[33]=o.icon;s[34]=o.iconDisabled;s[35]=o.key;s[36]=o.label;s[37]=o.labelClass;s[38]=o.labelDisabledClass;s[39]=o.labelPosition;s[40]=o.labelStyle;s[41]=o.layout;s[42]=o.onafterdrag;s[43]=o.onbeforedrag;s[44]=o.onclick;s[45]=o.ondrag;s[46]=o.ondrop;s[47]=o.onhide;s[48]=o.onrefresh;s[49]=o.onshow;s[50]=o.onupdate;s[51]=o.overlayMode;s[52]=o.renderFlag;s[53]=(o.showLabel?1:0);s[54]=o.slice;s[55]=o.title;s[56]=(o.toggleMode?1:0);s[57]=o.toggleState;s[58]=o.tuple;s[59]=o.valign;s[60]=(o.visible?1:0);s[61]=o.width;
}
function _ZEN_Component_csMenuItem_getSettings(s)
{
	s['name'] = 'string';
	s['altCaption'] = 'string';
	s['altIcon'] = 'uri';
	s['altKey'] = 'string';
	s['caption'] = 'caption';
	s['contextKey'] = 'string';
	s['icon'] = 'uri';
	s['iconDisabled'] = 'uri';
	s['key'] = 'string';
	s['onclick'] = 'eventHandler';
	s['toggleMode'] = 'boolean';
	s['toggleState'] = 'integer';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_csMenuItem_initializeClientSideProjection = function() {
var div=this.getEnclosingDiv();
ZLM.setLocalAttribute(div,"onclick","");
for (var k=div.firstChild;k!=null;k=k.nextSibling) {
if (k.nodeType==1 && k.className=="csMenuItem") {
ZMS.createMenuItemSubtree(k,20);
div.item=k;
k.zenObj = this;
if (this.disabled) this.setProperty("disabled",this.disabled);
if (this.toggleState==1) {
this.toggleState=0;
this.setProperty("toggleState",1);
}
else this.toggleState = 0;
return;
}
}
}

self._ZEN_Component_csMenuItem_onloadHandler = function() {
this.invokeSuper('onloadHandler',arguments);
ZMS.initialize();
this.initializeClientSideProjection();
}

self._ZEN_Component_csMenuItem_setProperty = function(property,value,value2) {
switch(property) {
case "disabled":
this.disabled = value;
var div=this.getEnclosingDiv();
var item = div.item;
if (!item) return;
if (value) {
ZMS.disableMenuOptionNode(item);
}
else {
ZMS.enableMenuOptionNode(item);
}
break;
case "toggleState":
if (value!=this.toggleState) {
var div=this.getEnclosingDiv();
var item = div.item;
if (!item) return;
ZMS.toggleMode(item);
}
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_csMenuItem_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_csMenuItem__Loader = function() {
	zenLoadClass('_ZEN_Component_group');
	_ZEN_Component_csMenuItem.prototype = zenCreate('_ZEN_Component_group',-1);
	var p = _ZEN_Component_csMenuItem.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_csMenuItem;
	p.superClass = ('undefined' == typeof _ZEN_Component_group) ? zenMaster._ZEN_Component_group.prototype:_ZEN_Component_group.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.csMenuItem';
	p._type = 'csMenuItem';
	p.serialize = _ZEN_Component_csMenuItem_serialize;
	p.getSettings = _ZEN_Component_csMenuItem_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_csMenuItem_ReallyRefreshContents;
	p.initializeClientSideProjection = _ZEN_Component_csMenuItem_initializeClientSideProjection;
	p.onloadHandler = _ZEN_Component_csMenuItem_onloadHandler;
	p.setProperty = _ZEN_Component_csMenuItem_setProperty;
}

self._zenClassIdx['cssGroup'] = '_ZEN_Component_cssGroup';
self._ZEN_Component_cssGroup = function(index,id) {
	if (index>=0) {_ZEN_Component_cssGroup__init(this,index,id);}
}

self._ZEN_Component_cssGroup__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_group__init) ?zenMaster._ZEN_Component_group__init(o,index,id):_ZEN_Component_group__init(o,index,id);
	o.enclosingClass = 'cssGroup';
	o.layout = ''; // encrypted
}
function _ZEN_Component_cssGroup_serialize(set,s)
{
	var o = this;s[0]='2521056755';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.cellAlign;s[9]=o.cellSize;s[10]=o.cellStyle;s[11]=o.cellVAlign;s[12]=set.serializeList(o,o.children,true,'children');s[13]=o.containerStyle;s[14]=(o.disabled?1:0);s[15]=(o.dragEnabled?1:0);s[16]=(o.dropEnabled?1:0);s[17]=(o.dynamic?1:0);s[18]=o.enclosingClass;s[19]=o.enclosingStyle;s[20]=o.error;s[21]=o.groupClass;s[22]=o.groupStyle;s[23]=o.height;s[24]=(o.hidden?1:0);s[25]=o.hint;s[26]=o.hintClass;s[27]=o.hintStyle;s[28]=o.label;s[29]=o.labelClass;s[30]=o.labelDisabledClass;s[31]=o.labelPosition;s[32]=o.labelStyle;s[33]=o.layout;s[34]=o.onafterdrag;s[35]=o.onbeforedrag;s[36]=o.onclick;s[37]=o.ondrag;s[38]=o.ondrop;s[39]=o.onhide;s[40]=o.onrefresh;s[41]=o.onshow;s[42]=o.onupdate;s[43]=o.overlayMode;s[44]=o.renderFlag;s[45]=(o.showLabel?1:0);s[46]=o.slice;s[47]=o.title;s[48]=o.tuple;s[49]=o.valign;s[50]=(o.visible?1:0);s[51]=o.width;
}
function _ZEN_Component_cssGroup_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_cssGroup_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_cssGroup__Loader = function() {
	zenLoadClass('_ZEN_Component_group');
	_ZEN_Component_cssGroup.prototype = zenCreate('_ZEN_Component_group',-1);
	var p = _ZEN_Component_cssGroup.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_cssGroup;
	p.superClass = ('undefined' == typeof _ZEN_Component_group) ? zenMaster._ZEN_Component_group.prototype:_ZEN_Component_group.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.cssGroup';
	p._type = 'cssGroup';
	p.serialize = _ZEN_Component_cssGroup_serialize;
	p.getSettings = _ZEN_Component_cssGroup_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_cssGroup_ReallyRefreshContents;
}

self._zenClassIdx['dragGroup'] = '_ZEN_Component_dragGroup';
self._ZEN_Component_dragGroup = function(index,id) {
	if (index>=0) {_ZEN_Component_dragGroup__init(this,index,id);}
}

self._ZEN_Component_dragGroup__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_group__init) ?zenMaster._ZEN_Component_group__init(o,index,id):_ZEN_Component_group__init(o,index,id);
	o.centerHeader = false;
	o.colSpan = '1';
	o.enclosingClass = 'dragGroup';
	o.header = 'Untitled Group';
	o.headerLayout = 'ITFC';
	o.homeCol = '0';
	o.homeRow = '0';
	o.imageAppLogo = '';
	o.imageAppLogoWidth = '0';
	o.imageClose = 'images\/grayDragClose.png';
	o.imageCloseHover = '';
	o.imageCloseWidth = '16';
	o.imageContract = 'images\/grayDragContract.png';
	o.imageContractHover = '';
	o.imageContractWidth = '16';
	o.imageExpand = 'images\/grayDragExpand.png';
	o.imageExpandHover = '';
	o.imageExpandWidth = '16';
	o.imageMaximize = 'images\/grayDragMax.png';
	o.imageMaximizeHover = '';
	o.imageMaximizeWidth = '16';
	o.imageMinimize = 'images\/grayDragMin.png';
	o.imageMinimizeHover = '';
	o.imageMinimizeWidth = '16';
	o.imageResize = 'images\/grayDragResize.png';
	o.imageResizeSize = '16';
	o.layout = ''; // encrypted
	o.minWidth = '96';
	o.moveEnabled = true;
	o.onclosepending = '';
	o.onresize = '';
	o.onwindowdrop = '';
	o.onwindowgrab = '';
	o.resizeEnabled = true;
	o.rowSpan = '1';
}
function _ZEN_Component_dragGroup_serialize(set,s)
{
	var o = this;s[0]='4212258287';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.cellAlign;s[9]=o.cellSize;s[10]=o.cellStyle;s[11]=o.cellVAlign;s[12]=(o.centerHeader?1:0);s[13]=set.serializeList(o,o.children,true,'children');s[14]=o.colSpan;s[15]=o.containerStyle;s[16]=(o.disabled?1:0);s[17]=(o.dragEnabled?1:0);s[18]=(o.dropEnabled?1:0);s[19]=(o.dynamic?1:0);s[20]=o.enclosingClass;s[21]=o.enclosingStyle;s[22]=o.error;s[23]=o.groupClass;s[24]=o.groupStyle;s[25]=o.header;s[26]=o.headerLayout;s[27]=o.height;s[28]=(o.hidden?1:0);s[29]=o.hint;s[30]=o.hintClass;s[31]=o.hintStyle;s[32]=o.homeCol;s[33]=o.homeRow;s[34]=o.imageAppLogo;s[35]=o.imageAppLogoWidth;s[36]=o.imageClose;s[37]=o.imageCloseHover;s[38]=o.imageCloseWidth;s[39]=o.imageContract;s[40]=o.imageContractHover;s[41]=o.imageContractWidth;s[42]=o.imageExpand;s[43]=o.imageExpandHover;s[44]=o.imageExpandWidth;s[45]=o.imageMaximize;s[46]=o.imageMaximizeHover;s[47]=o.imageMaximizeWidth;s[48]=o.imageMinimize;s[49]=o.imageMinimizeHover;s[50]=o.imageMinimizeWidth;s[51]=o.imageResize;s[52]=o.imageResizeSize;s[53]=o.label;s[54]=o.labelClass;s[55]=o.labelDisabledClass;s[56]=o.labelPosition;s[57]=o.labelStyle;s[58]=o.layout;s[59]=o.minWidth;s[60]=(o.moveEnabled?1:0);s[61]=o.onafterdrag;s[62]=o.onbeforedrag;s[63]=o.onclick;s[64]=o.onclosepending;s[65]=o.ondrag;s[66]=o.ondrop;s[67]=o.onhide;s[68]=o.onrefresh;s[69]=o.onresize;s[70]=o.onshow;s[71]=o.onupdate;s[72]=o.onwindowdrop;s[73]=o.onwindowgrab;s[74]=o.overlayMode;s[75]=o.renderFlag;s[76]=(o.resizeEnabled?1:0);s[77]=o.rowSpan;s[78]=(o.showLabel?1:0);s[79]=o.slice;s[80]=o.title;s[81]=o.tuple;s[82]=o.valign;s[83]=(o.visible?1:0);s[84]=o.width;
}
function _ZEN_Component_dragGroup_getSettings(s)
{
	s['name'] = 'string';
	s['centerHeader'] = 'boolean';
	s['colSpan'] = 'integer';
	s['header'] = 'caption';
	s['headerLayout'] = 'string';
	s['homeCol'] = 'integer';
	s['homeRow'] = 'integer';
	s['imageAppLogo'] = 'uri';
	s['imageAppLogoWidth'] = 'integer';
	s['imageClose'] = 'uri';
	s['imageCloseHover'] = 'uri';
	s['imageCloseWidth'] = 'integer';
	s['imageContract'] = 'uri';
	s['imageContractHover'] = 'uri';
	s['imageContractWidth'] = 'integer';
	s['imageExpand'] = 'uri';
	s['imageExpandHover'] = 'uri';
	s['imageExpandWidth'] = 'integer';
	s['imageMaximize'] = 'uri';
	s['imageMaximizeHover'] = 'uri';
	s['imageMaximizeWidth'] = 'integer';
	s['imageMinimize'] = 'uri';
	s['imageMinimizeHover'] = 'uri';
	s['imageMinimizeWidth'] = 'integer';
	s['imageResize'] = 'uri';
	s['imageResizeSize'] = 'integer';
	s['minWidth'] = 'integer';
	s['moveEnabled'] = 'boolean';
	s['onclosepending'] = 'eventHandler';
	s['onresize'] = 'eventHandler';
	s['onwindowdrop'] = 'eventHandler';
	s['onwindowgrab'] = 'eventHandler';
	s['resizeEnabled'] = 'boolean';
	s['rowSpan'] = 'integer';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_dragGroup_abortClose = function() {
this.closePending = false;
}

self._ZEN_Component_dragGroup_adjustChildArea = function() {
var thisDiv = this.getEnclosingDiv();
if (!thisDiv) return;
var headerDiv = this.getHeaderDiv();
if (!headerDiv) return;
var childDiv = this.getChildDiv();
var box = thisDiv.resize;
var hgt = ZLM.getClientHeight(thisDiv);
if (!this.headerRemoved) hgt = hgt-ZLM.getOffsetHeight(headerDiv);
hgt = (hgt <= 0) ? 0 : hgt;
childDiv.style.height = hgt + 'px';
if (!this.isResizeInProgress()) {
box.style.top="";
box.style.left="";
this.adjustResizeBox();
}
}

self._ZEN_Component_dragGroup_adjustHandleWidth = function() {
if (this.centerLayout) this.verifyHeaderGeometry();
}

self._ZEN_Component_dragGroup_adjustResizeBox = function() {
var thisDiv = this.getEnclosingDiv();
if (!thisDiv) return;
var box = thisDiv.resize;
box.style.bottom="0px";
box.style.right="0px"
}

self._ZEN_Component_dragGroup_animateIcon = function(who,which) {
if (who=="close") {
if (!this.imageCloseHover) return;
if (which=="exit") {
this.setIcon(this.closer,this.imageClose,this.imageCloseWidth)
}
else {
this.setIcon(this.closer,this.imageCloseHover,this.imageCloseWidth)
}
}
else if (who=="contract") {
if (!this.imageContractHover) return;
if (which=="exit") {
this.setIcon(this.iconify,this.imageContract,this.imageContractWidth)
}
else {
this.setIcon(this.iconify,this.imageContractHover,this.imageContractWidth)
}
}
else if (who=="expand") {
if (!this.imageExpandHover) return;
if (which=="exit") {
this.setIcon(this.expander,this.imageExpand,this.imageExpandWidth)
}
else {
this.setIcon(this.expander,this.imageExpandHover,this.imageExpandWidth)
}
}
else if (who=="max") {
if (!this.imageMaximizeHover) return;
if (which=="exit") {
this.setIcon(this.maxxer,this.imageMaximize,this.imageMaximizeWidth)
}
else {
this.setIcon(this.maxxer,this.imageMaximizeHover,this.imageMaximizeWidth)
}
}
else if (who=="min") {
if (!this.imageMinimizeHover) return;
if (which=="exit") {
this.setIcon(this.minner,this.imageMinimize,this.imageMinimizeWidth)
}
else {
this.setIcon(this.minner,this.imageMinimizeHover,this.imageMinimizeWidth)
}
}
}

self._ZEN_Component_dragGroup_applyCSSSettings = function(div,value) {
if (!div) return;
var nodeStyle = div.style;
if (!nodeStyle) return;
var v = value;
if (typeof(value)=="string") {
if (value.indexOf("{")==0) { // assume JSON
v = ZLM.jsonParse(value);
if (!v) return;
}
else { // assume a CSS snippet, need to nornalize to JavaScript conventions
v = {};
var nvp = value.split(";");
for (var i=nvp.length-1;i>=0;i--) {
var item = nvp[i];
if (item && item.indexOf && item.indexOf(":")>0) {
var nvpA = item.split(":");
var attrValue = nvpA[1];
var attrCSS = nvpA[0];
if (attrCSS && attrCSS.indexOf("-")>0) {
var attrA = attrCSS.split("-");
attrCSS = attrA[0]+attrA[1].charAt(0).toUpperCase()+attrA[1].substring(1);
}
if (attrCSS) v[attrCSS]=attrValue;
}
}
}
}
for (var p in v) {
nodeStyle[p] = v[p];
}
this.adjustChildArea();
this.onresizeHandler();
}

self._ZEN_Component_dragGroup_close = function(event) {
var thisDiv = this.getEnclosingDiv();
if (!thisDiv) return;
ZLM.killEvent(event);
this.closePending=true;
if (this.onclosepending) {
zenInvokeCallbackMethod(this.onclosepending,this,'onclosepending');
}
if (this.closePending) thisDiv.layoutMgr.closePane(thisDiv);
ZLM.killEvent(event);
}

self._ZEN_Component_dragGroup_compress = function(event) {
var thisDiv = this.getEnclosingDiv();
ZLM.killEvent(event);
if (!thisDiv) return;
thisDiv.oldPrefHeight = thisDiv.prefHeight;
thisDiv.dragItem.style.display="none";
thisDiv.resize.style.display="none";
thisDiv.dragHandle.expander.style.display="block";
thisDiv.dragHandle.iconifier.style.display="none";
thisDiv.compressed=1;
thisDiv.prefHeight=ZLM.getOffsetHeight(this.getHeaderDiv());
thisDiv.layoutMgr.layoutBlock(thisDiv.layoutEngine);
}

self._ZEN_Component_dragGroup_constrainDragX = function(engine,wrapper,intendedX) {
var thisDiv=this.getEnclosingDiv();
var pad = parseInt(this.imageResizeSize)+1;
var x = parseInt(intendedX)+ pad;
if (x<thisDiv.minWidth) x = thisDiv.minWidth;
thisDiv.prefWidth=x;
return(x-pad);
}

self._ZEN_Component_dragGroup_constrainDragY = function(engine,wrapper,intendedY) {
var thisDiv=this.getEnclosingDiv();
var pad = parseInt(this.imageResizeSize)+1;
var y = parseInt(intendedY)+pad;
if (y<thisDiv.minHeight) y = thisDiv.minHeight;
thisDiv.prefHeight=y;
this.resize(thisDiv.prefWidth,thisDiv.prefHeight);
thisDiv.layoutMgr.layoutBlock(thisDiv.layoutEngine);
return(y-pad);
}

self._ZEN_Component_dragGroup_disableCoverplate = function() {
if (this.coverplate) this.coverplate.style.display="none";
}

self._ZEN_Component_dragGroup_disableDrag = function() {
var group = this.getEnclosingDiv();
if (group && group.dragHandle) {
ZLM.setLocalAttribute(group.dragHandle,"onmousedown","");
ZLM.setLocalAttribute(group.dragHandle,"ontouchstart","");
group.dragHandle.style.cursor = "auto;"
}
}

self._ZEN_Component_dragGroup_disableHeaderMaxToggle = function() {
this.enableDrag();
this.headerAsToggle=false;
}

self._ZEN_Component_dragGroup_disableResize = function() {
var group = this.getEnclosingDiv();
if (group && group.resize) {
ZLM.setLocalAttribute(group.resize,"onmousedown","");
group.resize.style.cursor = "auto;"
group.resize.style.display= "none";
}
this.noResize=true;
}

self._ZEN_Component_dragGroup_enableCoverplate = function() {
if (this.coverplate) this.coverplate.style.display="block";
}

self._ZEN_Component_dragGroup_enableDrag = function() {
var group = this.getEnclosingDiv();
if (group && group.dragHandle) {
ZLM.setLocalAttribute(group.dragHandle,"onmousedown","ZLM.drag(this.parentNode,event);");
group.resize.style.cursor = "move;"
}
}

self._ZEN_Component_dragGroup_enableHeaderMaxToggle = function() {
var group = this.getEnclosingDiv();
if (group && group.dragHandle) {
group.dragHandle.zenObj = this;
ZLM.setLocalAttribute(group.dragHandle,"onmousedown","this.zenObj.maximize(event);");
ZLM.setLocalAttribute(group.dragHandle,"ontouchstart","this.zenObj.maximize(event);");
group.dragHandle.style.cursor = "all-scroll";
this.headerAsToggle=true;
}
}

self._ZEN_Component_dragGroup_enableResize = function() {
var group = this.getEnclosingDiv();
if (group && group.resize) {
ZLM.setLocalAttribute(group.resize,"onmousedown","ZLM.drag(this,event);");
group.resize.style.cursor = "nw-resize;"
group.resize.style.display= "block";
}
this.noResize = false;
}

self._ZEN_Component_dragGroup_endDrag = function(engine,wrapper) {
var thisDiv=this.getEnclosingDiv();
if (this.coverplate) this.coverplate.style.display="none";
if (thisDiv.layoutMgr.maskPeers) thisDiv.layoutMgr.maskPeers(thisDiv.layoutEngine,false);
this.resizeDragActive=false;
thisDiv.layoutMgr.layoutBlock(thisDiv.layoutEngine);
this.syncObject();
ZLM.notifyResize(thisDiv);
this.onresizeHandler();
}

self._ZEN_Component_dragGroup_expand = function(event) {
var thisDiv = this.getEnclosingDiv();
ZLM.killEvent(event);
if (!thisDiv) return;
thisDiv.compressed=0;
thisDiv.prefHeight = thisDiv.oldPrefHeight;
thisDiv.dragItem.style.display="block";
thisDiv.resize.style.display="block";
thisDiv.dragHandle.expander.style.display="none";
thisDiv.dragHandle.iconifier.style.display="block";
thisDiv.layoutMgr.layoutBlock(thisDiv.layoutEngine);
}

self._ZEN_Component_dragGroup_getChildDiv = function() {
return this.findElement('children');
}

self._ZEN_Component_dragGroup_getCoverplateDiv = function() {
return this.findElement('coverplate');
}

self._ZEN_Component_dragGroup_getHeaderDiv = function() {
return this.findElement('header');
}

self._ZEN_Component_dragGroup_getHeaderUserDiv = function() {
return this.userDiv;
}

self._ZEN_Component_dragGroup_getState = function() {
var r = this.getEnclosingDiv();
if (!r) return(null);
var str=r.id+":"+encodeURIComponent(this.header)+":";
str=str+r.prefWidth+":"+r.prefHeight+":"+r.minWidth+":"+r.minHeight+":"+r.compressed+":"+r.maximized+":";
str=str+r.oldTop+":"+r.oldLeft+":"+r.oldWidth+":"+r.oldHeight+":"+r.oldPrefHeight;
return(str);
}

self._ZEN_Component_dragGroup_getWindowHeight = function() {
var e = this.getEnclosingDiv();
if (!e) return(0);
var d = this.findElement('header');
if (!d) return(0);
var h = ZLM.getClientHeight(e);
if (!this.headerRemoved) h = h - ZLM.getOffsetHeight(d);
return(h);
}

self._ZEN_Component_dragGroup_getWindowWidth = function() {
var div =this.getEnclosingDiv();
if (!div) return(0);
return(div.clientWidth);
}

self._ZEN_Component_dragGroup_isCompressed = function() {
var thisDiv = this.getEnclosingDiv();
if (!thisDiv) return(false);
if (thisDiv.compressed == 1) return(true);
return(false);
}

self._ZEN_Component_dragGroup_isMaximized = function() {
var thisDiv = this.getEnclosingDiv();
if (!thisDiv) return(false);
if (thisDiv.maximized == 1) return(true);
return(false);
}

self._ZEN_Component_dragGroup_isResizeInProgress = function() {
if (this.resizeDragActive==true) return(true);
return(false);
}

self._ZEN_Component_dragGroup_maximize = function(event) {
this.maximized = true;
var thisDiv = this.getEnclosingDiv();
ZLM.killEvent(event);
if (!thisDiv) return;
thisDiv.maximized = 1;
thisDiv.style.display="block";
thisDiv.dragHandle.expander.style.display="none";
thisDiv.dragHandle.iconifier.style.display="none";
thisDiv.dragHandle.maxxer.style.display="none";
thisDiv.dragHandle.minner.style.display="block";
thisDiv.dragItem.style.display="block";
thisDiv.resize.style.display="none";
this.saveGeometry();
var dskW = thisDiv.parentNode.parentNode.clientWidth-2;
var dskH = thisDiv.parentNode.parentNode.clientHeight-2;
this.resize(dskW,dskH);
ZLM.setLocalAttribute(thisDiv.dragHandle,"onmousedown","");
ZLM.setLocalAttribute(thisDiv.dragHandle,"ontouchstart","");
thisDiv.dragHandle.style.cursor="auto";
thisDiv.parentNode.style.overflow="hidden";
thisDiv.style.top="0px";
thisDiv.style.left="0px";
thisDiv.style.zIndex="100";
if (this.headerAsToggle) {
ZLM.setLocalAttribute(thisDiv.dragHandle,"onmousedown","this.zenObj.normalize(event);");
ZLM.setLocalAttribute(thisDiv.dragHandle,"ontouchstart","this.zenObj.normalize(event);");
}
ZLM.notifyResize(thisDiv);
this.onresizeHandler();
}

self._ZEN_Component_dragGroup_normalize = function(event) {
this.maximized = false;
var thisDiv = this.getEnclosingDiv();
ZLM.killEvent(event);
if (!thisDiv) return;
thisDiv.maximized = 0;
thisDiv.dragHandle.minner.style.display="none";
thisDiv.dragHandle.maxxer.style.display="block";
if (thisDiv.compressed==1) {
thisDiv.dragHandle.expander.style.display="block";
thisDiv.dragItem.style.display="none";
}
else {
thisDiv.dragHandle.iconifier.style.display="block";
if (!this.noResize) thisDiv.resize.style.display="block";
}
this.restoreGeometry();
if (this.moveEnabled) {
ZLM.setLocalAttribute(thisDiv.dragHandle,"onmousedown","ZLM.drag(this.parentNode,event);");
ZLM.setLocalAttribute(thisDiv.dragHandle,"ontouchstart","ZLM.drag(this.parentNode,event);");
}
thisDiv.dragHandle.style.cursor="move";
thisDiv.parentNode.style.overflow="auto";
thisDiv.style.zIndex="0";
thisDiv.layoutMgr.layoutBlock(thisDiv.layoutEngine);
if (this.headerAsToggle) {
ZLM.setLocalAttribute(thisDiv.dragHandle,"onmousedown","this.zenObj.maximize(event);");
ZLM.setLocalAttribute(thisDiv.dragHandle,"ontouchstart","this.zenObj.maximize(event);");
}
if (thisDiv.layoutMgr.broadcast) thisDiv.layoutMgr.broadcast("resize");
else this.onresizeHandler();
}

self._ZEN_Component_dragGroup_onGrabHandler = function() {
var thisDiv = this.getEnclosingDiv();
var mgr = thisDiv.layoutMgr;
if (mgr && mgr.broadcast) {
mgr.broadcast("enableCoverplate");
}
if (this.onwindowgrab) {
zenInvokeCallbackMethod(this.onwindowgrab,this,'onwindowgrab');
}
}

self._ZEN_Component_dragGroup_onRefreshContents = function() {
this.renderContents();
}

self._ZEN_Component_dragGroup_onReleaseHandler = function() {
var thisDiv = this.getEnclosingDiv();
if (thisDiv.layoutMgr && thisDiv.layoutMgr.broadcast) {
thisDiv.layoutMgr.broadcast("disableCoverplate");
}
if (this.onwindowdrop) {
zenInvokeCallbackMethod(this.onwindowdrop,this,'onwindowdrop');
}
}

self._ZEN_Component_dragGroup_onresizeHandler = function() {
if (this.onresize) zenInvokeCallbackMethod(this.onresize,this,'onresize');
}

self._ZEN_Component_dragGroup_processAppMessage = function(value) {
}

self._ZEN_Component_dragGroup_removeWindowChrome = function() {
this.headerRemoved = true;
this.disableResize();
var h = this.getHeaderDiv();
h.style.height="0px";
h.style.overflow="hidden";
h.style.border="none";
this.adjustChildArea();
this.onresizeHandler();
}

self._ZEN_Component_dragGroup_renderContents = function() {
var header = this.getHeaderDiv();
if (!header) return;
if (header.textCell) return;
this.coverplate = this.getCoverplateDiv();
this.renderResize();
this.renderHeader();
var thisDiv = this.getEnclosingDiv();
if (!thisDiv) return;
thisDiv.compressed = 0;
thisDiv.maximized = 0;
if (!thisDiv.prefWidth) thisDiv.prefWidth = thisDiv.offsetWidth;
if (!thisDiv.prefHeight) thisDiv.prefHeight = thisDiv.offsetHeight;
if (!thisDiv.minWidth) thisDiv.minWidth = parseInt(this.minWidth,10);
if (!thisDiv.minHeight) thisDiv.minHeight = thisDiv.iconHeight+thisDiv.resize.size+1;
thisDiv.oldTop = 0;
thisDiv.oldLeft = 0;
thisDiv.oldWidth = 0;
thisDiv.oldHeight = 0;
thisDiv.oldPrefHeight = 0;
this.adjustChildArea();
}

self._ZEN_Component_dragGroup_renderCoverplate = function() {
var g = this.getChildDiv();
try {  // if we already have one, recycle it
if (this.coverplate) {
g.removeChild(this.coverplate);
g.appendChild(this.coverplate);
return;
}
}
catch (err) {
}
var plate=ZLM.makeElement('div',{'class':'dragCoverplate'});
g.appendChild(plate);
var div = this.getEnclosingDiv();
if (div) div.coverplate=plate;
this.coverplate=plate;
}

self._ZEN_Component_dragGroup_renderHeader = function() {
var header = this.getHeaderDiv();
var group = this.getEnclosingDiv();
if (!group) return;
var q = null;
for (var p = header.firstChild; p!=null; p=q) {
q = p.nextSibling;
header.removeChild(p);
}
if (ZLM.isIE) {
group.iFrame = ZLM.simulateTag("iframe src='' frameBorder='0' style='filter:alpha(opacity=0); z-index:0; position:absolute; top:0px; left:0px; width:100%; height:100%; border: 0px solid black; background:transparent;'");
group.insertBefore(group.iFrame,group.firstChild);
header.style.position='relative';
header.style.zIndex="1";
}
if (header) {
this.headerLeft = ZLM.makeElement('div',{'class':'dragHeaderLeft'});
this.headerMiddle = ZLM.makeElement('div',{'class':'dragHeaderMiddle'});
this.headerRight = ZLM.makeElement('div',{'class':'dragHeaderRight'});
header.appendChild(this.headerLeft);
header.appendChild(this.headerMiddle);
header.appendChild(this.headerRight);
this.iconify = ZLM.makeElement('div',{'class':'dragIconifyDiv',onmouseover:'this.pane.zenObj.animateIcon("contract","enter");',onmouseout:'this.pane.zenObj.animateIcon("contract","exit");',onmousedown:'this.pane.zenObj.compress(event);',ontouchstart:'this.pane.zenObj.compress(event);'});
this.expander = ZLM.makeElement('div',{'class':'dragExpandDiv',onmouseover:'this.pane.zenObj.animateIcon("expand","enter");',onmouseout:'this.pane.zenObj.animateIcon("expand","exit");',onmousedown:'this.pane.zenObj.expand(event);',ontouchstart:'this.pane.zenObj.expand(event);'});
this.maxxer = ZLM.makeElement('div',{'class':'dragFullScreenDiv',onmouseover:'this.pane.zenObj.animateIcon("max","enter");',onmouseout:'this.pane.zenObj.animateIcon("max","exit");', onmousedown:'this.pane.zenObj.maximize(event); zenPage.setModified(true);',ontouchstart:'this.pane.zenObj.maximize(event);',title:'Maximize this widget'});
this.minner = ZLM.makeElement('div',{'class':'dragShareScreenDiv',onmouseover:'this.pane.zenObj.animateIcon("min","enter");',onmouseout:'this.pane.zenObj.animateIcon("min","exit");',onmousedown:'this.pane.zenObj.normalize(event); zenPage.setModified(true);',ontouchstart:'this.pane.zenObj.normalize(event);',title:'Minimize this widget'});
this.closer = ZLM.makeElement('div',{'class':'dragCloseDiv',onmouseover:'this.pane.zenObj.animateIcon("close","enter");',onmouseout:'this.pane.zenObj.animateIcon("close","exit");',onclick:'this.pane.zenObj.close(event);',ontouchstart:'this.pane.zenObj.close(event);',onmousedown:'ZLM.killEvent(event);',title:'Hide this widget'});
this.appLogo = ZLM.makeElement('div',{'class':'dragLogoDiv'});
this.userDiv = ZLM.makeElement('div',{'class':'dragHeaderUserSpan'});
this.headerMiddle.appendChild(this.appLogo);
this.headerMiddleVDiv = ZLM.makeElement('div',{style:'position:relative; top:50%; height:100%;'});
this.headerMiddle.appendChild(this.headerMiddleVDiv);
this.titleDiv = ZLM.makeElement("div",null,this.header);
this.titleDiv.className = "dragHeaderText";
this.headerMiddleVDiv.appendChild(this.titleDiv);
this.setAppLogo(this.imageAppLogo,this.imageAppLogoWidth);
this.setCenterLayout(this.centerLayout);
this.setContractIcon(this.imageContract,this.imageContractWidth);
this.setExpandIcon(this.imageExpand,this.imageExpandWidth);
this.setMaximizeIcon(this.imageMaximize,this.imageMaximizeWidth);
this.setMinimizeIcon(this.imageMinimize,this.imageMinimizeWidth);
this.setCloseIcon(this.imageClose,this.imageCloseWidth);
this.setHeaderLayout(this.headerLayout);
ZLM.setLocalAttribute(header,"onmousedown","ZLM.drag(this.parentNode,event);");
ZLM.setLocalAttribute(header,"ontouchstart","ZLM.touch(this.parentNode,event);");
header.maxxer = this.maxxer;
header.minner = this.minner;
header.closer = this.closer;
header.iconifier = this.iconify;
header.expander = this.expander;
header.textCell=this.titleDiv;
this.maxxer.pane = group;
this.minner.pane = group;
this.closer.pane = group;
this.expander.pane = group;
this.iconify.pane = group;
group.dragHandle=header;
group.dragItem=this.getChildDiv();
group.zenObj=this;
this.adjustHandleWidth();
this.adjustResizeBox();
this.headerDiv=header;
if (!this.moveEnabled) this.disableDrag();
}
}

self._ZEN_Component_dragGroup_renderResize = function() {
var group = this.getEnclosingDiv();
var sz = parseInt(this.imageResizeSize);
if (group) {
var resize = ZLM.simulateTag("img src='"+this.imageResize+"' style='cursor:nw-resize; position:absolute; z-index:65535; width:"+sz+"; height:"+sz+";' onmousedown='ZLM.drag(this,event);' ontouchstart='ZLM.touch(this,event);'");
resize.pane = group;
resize.size = sz;
group.appendChild(resize);
group.resize=resize;
ZLM.registerDragItem(resize,this);
if (!this.resizeEnabled) this.disableResize();
}
}

self._ZEN_Component_dragGroup_resetWindowChrome = function() {
this.headerRemoved = false;
this.enableResize();
var h = this.getHeaderDiv();
if (h) {		// DTB558
h.style.height="";
h.style.overflow="";
h.style.border="";
}
this.adjustChildArea();
this.onresizeHandler();
}

self._ZEN_Component_dragGroup_resize = function(width,height) {
if (!width.indexOf) width=width+"px";
if (!height.indexOf) height=height+"px";
var thisDiv = this.getEnclosingDiv();
if (thisDiv) {
thisDiv.style.width=width;
thisDiv.style.height=height;
/*
var s = ZLM.getComputedNodeStyle(thisDiv,"marginTop");
if (s) {
var m = parseInt(s);
var w = (thisDiv.offsetWidth-2*m)+"px";
var h = (thisDiv.offsetHeight-2*m)+"px";
thisDiv.style.width=w;
thisDiv.style.height=h;
}
*/
}
this.adjustHandleWidth();
this.adjustChildArea();
this.onresizeHandler();
}

self._ZEN_Component_dragGroup_restoreGeometry = function() {
var thisDiv = this.getEnclosingDiv();
if (!thisDiv) return;
thisDiv.style.top=this.oldTop + "px";
thisDiv.style.left=this.oldLeft + "px";
ZLM.setOffsetWidth(thisDiv,this.oldWidth);
ZLM.setOffsetHeight(thisDiv,this.oldHeight);
this.adjustHandleWidth();
this.adjustChildArea();
}

self._ZEN_Component_dragGroup_restoreState = function(str) {
var n = this.getEnclosingDiv();
if (!n) return;
var d = str.split(':');
n.prefWidth=parseInt(d[2]);
n.prefHeight=parseInt(d[3]);
n.minWidth=parseInt(d[4]);
n.minHeight=parseInt(d[5]);
n.oldTop=parseInt(d[8]);
n.oldLeft=parseInt(d[9]);
n.oldWidth=parseInt(d[10]);
n.oldHeight=parseInt(d[11]);
n.oldPrefHeight=parseInt(d[12]);
if (d[7]=="1"){
if (d[6]==1) n.compressed=1;
else n.compressed=0;
n.maximized = 1;
n.dragHandle.expander.style.display="none";
n.dragHandle.iconifier.style.display="none";
n.dragHandle.maxxer.style.display="none";
n.dragHandle.minner.style.display="block";
n.dragItem.style.display="block";
n.resize.style.display="none";
this.resize(n.parentNode.clientWidth-2,n.parentNode.clientHeight-2);
ZLM.setLocalAttribute(n.dragHandle,"onmousedown","");
n.dragHandle.style.cursor="auto";
n.parentNode.style.overflow="hidden";
n.style.top="0px";
n.style.left="0px";
n.style.zIndex="100";
ZLM.notifyResize(n);
this.onresizeHandler();
}
else {
n.maximized = 0;
n.dragHandle.minner.style.display="none";
n.dragHandle.maxxer.style.display="block";
if (d[6]=="1") {
n.compressed=1;
n.dragHandle.expander.style.display="block";
n.dragHandle.iconifier.style.display="none";
n.dragItem.style.display="none";
n.resize.style.display="none";
}
else {
n.compressed=0;
n.dragHandle.expander.style.display="none";
n.dragHandle.iconifier.style.display="block";
n.resize.style.display="block";
n.dragItem.style.display="block";
}
ZLM.setLocalAttribute(n.dragHandle,"onmousedown","ZLM.drag(this.parentNode,event);");
n.dragHandle.style.cursor="move";
n.parentNode.style.overflow="auto";
n.style.zIndex="0";
}
}

self._ZEN_Component_dragGroup_saveGeometry = function() {
var thisDiv = this.getEnclosingDiv();
if (!thisDiv) return;
this.oldTop = thisDiv.offsetTop;
this.oldLeft = thisDiv.offsetLeft;
this.oldWidth = thisDiv.offsetWidth;
this.oldHeight = thisDiv.offsetHeight;
}

self._ZEN_Component_dragGroup_setAppLogo = function(iconURL,width) {
var w=parseInt(width,10);
if (iconURL && iconURL.length>0) {
this.appLogo.style.display = 'inline';
this.appLogo.style.backgroundImage = "url("+iconURL+")";
this.appLogo.style.width = w+"px";
this.appLogo.nativeWidth = w;
}
else this.appLogo.style.display="none";
this.imageAppLogo = iconURL;
this.imageAppLogoWidth = w;
if (this.centerLayout) this.setCenterLayout(true);
}

self._ZEN_Component_dragGroup_setBodyStyle = function(value) {
this.applyCSSSettings(this.getEnclosingDiv(),value);
}

self._ZEN_Component_dragGroup_setCenterLayout = function(flag) {
var m=this.headerMiddle.style;
var v=this.headerMiddleVDiv.style;
v.position = "absolute";
v.left = (this.imageAppLogoWidth+4)+"px";
this.centerLayout=flag;
this.verifyHeaderGeometry();
}

self._ZEN_Component_dragGroup_setCloseIcon = function(iconURL,width) {
this.imageCloseWidth=this.setIcon(this.closer,iconURL,width);
this.imageClose=iconURL;
}

self._ZEN_Component_dragGroup_setContractIcon = function(iconURL,width) {
this.imageContractWidth=this.setIcon(this.iconify,iconURL,width);
this.imageContract=iconURL;
}

self._ZEN_Component_dragGroup_setExpandIcon = function(iconURL,width) {
this.imageExpandWidth=this.setIcon(this.expander,iconURL,width);
this.imageExpand=iconURL;
}

self._ZEN_Component_dragGroup_setHeaderLayout = function(layout) {
if (this.iconify.parentNode) this.iconify.parentNode.removeChild(this.iconify);
if (this.expander.parentNode) this.expander.parentNode.removeChild(this.expander);
if (this.maxxer.parentNode) this.maxxer.parentNode.removeChild(this.maxxer);
if (this.minner.parentNode) this.minner.parentNode.removeChild(this.minner);
if (this.closer.parentNode) this.closer.parentNode.removeChild(this.closer);
var section = this.headerLeft;
for (var i=0;i<layout.length;i++) {
var c=layout.charAt(i).toUpperCase();
if (c=='I') {
section.appendChild(this.iconify);
section.appendChild(this.expander);
}
else if (c=='F') {
section.appendChild(this.maxxer);
section.appendChild(this.minner);
}
else if (c=='C') {
section.appendChild(this.closer);
}
else if (c=='U') {
section.appendChild(this.userDiv);
}
else if (c=='T') {
section=this.headerRight;
}
}
this.headerLayout=layout;
this.verifyHeaderGeometry();
}

self._ZEN_Component_dragGroup_setHeaderStyle = function(value) {
this.applyCSSSettings(this.getHeaderDiv(),value);
}

self._ZEN_Component_dragGroup_setIcon = function(iconDiv,iconURL,width) {
if (!width) var w=16;
else var w=parseInt(width,10);
if (iconURL && iconURL.length>0) {
iconDiv.style.backgroundImage = "url("+iconURL+")";
iconDiv.style.width = w+"px";
iconDiv.nativeWidth = w;
}
this.verifyHeaderGeometry();
return(w);
}

self._ZEN_Component_dragGroup_setMaximizeIcon = function(iconURL,width) {
this.imageMaximizeWidth=this.setIcon(this.maxxer,iconURL,width);
this.imageMaximize=iconURL;
}

self._ZEN_Component_dragGroup_setMinimizeIcon = function(iconURL,width) {
this.imageMinimizeWidth=this.setIcon(this.minner,iconURL,width);
this.imageMinimize=iconURL;
}

self._ZEN_Component_dragGroup_setProperty = function(property,value,value2) {
switch(property) {
case 'header':
this.header = value;
this.renderHeader();
break;
case 'appLogo':
this.setAppLogo(value,value2);
break;
case 'imageClose':
this.setCloseIcon(value,value2);
break;
case 'imageCloseHover':
this.imageCloseHover = value;
break;
case 'imageMinimize':
this.setMinimizeIcon(value,value2);
break;
case 'imageMinimizeHover':
this.imageMinimizeHover = value;
break;
case 'imageMaximize':
this.setMaximizeIcon(value,value2);
break;
case 'imageMaximizeHover':
this.imageMaximizeHover = value;
break;
case 'imageExpand':
this.setExpandIcon(value,value2);
break;
case 'imageExpandHover':
this.imageExpandHover = value;
break;
case 'imageContract':
this.setContractIcon(value,value2);
break;
case 'imageContractHover':
this.imageContractHover = value;
break;
case 'colSpan':
this.colSpan = value;
break;
case 'rowSpan':
this.rowSpan = value;
break;
case 'homeRow':
this.homeRow = value;
break;
case 'homeCol':
this.homeCol = value;
break;
case 'centerLayout':
this.setCenterLayout(value);
break;
case 'headerLayout':
this.setHeaderLayout(value);
break;
case 'onresize':
this.onresize = value;
break;
case 'onclosepending':
this.onclosepending = value;
break;
case 'onwindowgrab':
this.onwindowgrab = value;
break;
case 'onwindowdrop':
this.onwindowdrop = value;
break;
case 'resizeEnabled':
this.resizeEnabled = value;
if (value) this.enableResize();
else this.disableResize();
break;
case 'moveEnabled':
this.moveEnabled = value;
if (value) this.enableDrag();
else this.disableDrag();
break;
case 'minWidth':
this.minWidth = value;
var d = this.getEnclosingDiv();
if (d) d.minWidth = parseInt(this.minWidth,10);
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_dragGroup_startDrag = function(engine,wrapper) {
var mgr = zen(this.parent.id);
if (mgr && mgr.bringToFront) {
mgr.bringToFront(this);
}
var thisDiv=this.getEnclosingDiv();
if (this.coverplate) this.coverplate.style.display="block";
if (thisDiv.layoutMgr.maskPeers) thisDiv.layoutMgr.maskPeers(thisDiv.layoutEngine,true,this);
this.resizeDragActive=true;
}

self._ZEN_Component_dragGroup_syncObject = function() {
var div = this.getEnclosingDiv();
if (!div) return;
var mgr = div.layoutMgr;
if (!mgr || !mgr.managerName || mgr.managerName!="snapGridGroup") return;
var ref = div.oRefL;  // or oRefP in portrait mode
if (div.layoutEngine.orientation=="portrait") ref = div.oRefP;
if (ref) {
this.setProperty("homeRow",ref.top);
this.setProperty("homeCol",ref.left);
this.setProperty("rowSpan",ref.height);
this.setProperty("colSpan",ref.width);
}
}

self._ZEN_Component_dragGroup_verifyHeaderGeometry = function() {
var ofsX=0;
if (this.headerLeft.hasChildNodes()==false) this.headerLeft.style.display='none';
else {
this.headerLeft.style.display='block';
var k = this.headerLeft.childNodes;
for (var i=0;i<k.length;i++) {
if (k[i]==this.iconify) {
k[i].style.left=ofsX+"px";
this.expander.style.left=ofsX+"px";
ofsX+=k[i].nativeWidth+2;
}
else if (k[i]==this.maxxer) {
k[i].style.left=ofsX+"px";
this.minner.style.left=ofsX+"px";
ofsX+=k[i].nativeWidth+2;
}
else if (k[i]==this.closer) {
k[i].style.left=ofsX+"px";
ofsX+=k[i].nativeWidth+2;
}
else if (k[i]==this.userDiv) {
k[i].style.left=ofsX+"px";
ofsX+=k[i].offsetWidth+2;
}
}
this.headerLeft.style.width=ofsX+"px";
}
if (this.centerLayout) {
var cOfsX = (this.headerDiv.offsetWidth-this.appLogo.nativeWidth-this.titleDiv.offsetWidth)/2;
if (cOfsX<ofsX)cOfsX=ofsX;
this.headerMiddle.style.left=cOfsX+"px";
}
else this.headerMiddle.style.left=(ofsX+4)+"px";
var k = this.headerRight.childNodes;
var ofsX=0;
for (var i=0;i<k.length;i++) {
if (k[i]==this.iconify) {
k[i].style.left=ofsX+"px";
this.expander.style.left=ofsX+"px";
ofsX+=k[i].nativeWidth+2;
}
else if (k[i]==this.maxxer) {
k[i].style.left=ofsX+"px";
this.minner.style.left=ofsX+"px";
ofsX+=k[i].nativeWidth+2;
}
else if (k[i]==this.closer) {
k[i].style.left=ofsX+"px";
ofsX+=k[i].nativeWidth+2;
}
else if (k[i]==this.userDiv) {
k[i].style.left=ofsX+"px";
ofsX+=k[i].offsetWidth+2;
}
}
this.headerRight.style.width=ofsX+"px";
}

self._ZEN_Component_dragGroup_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_dragGroup__Loader = function() {
	zenLoadClass('_ZEN_Component_group');
	_ZEN_Component_dragGroup.prototype = zenCreate('_ZEN_Component_group',-1);
	var p = _ZEN_Component_dragGroup.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_dragGroup;
	p.superClass = ('undefined' == typeof _ZEN_Component_group) ? zenMaster._ZEN_Component_group.prototype:_ZEN_Component_group.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.dragGroup';
	p._type = 'dragGroup';
	p.serialize = _ZEN_Component_dragGroup_serialize;
	p.getSettings = _ZEN_Component_dragGroup_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_dragGroup_ReallyRefreshContents;
	p.abortClose = _ZEN_Component_dragGroup_abortClose;
	p.adjustChildArea = _ZEN_Component_dragGroup_adjustChildArea;
	p.adjustHandleWidth = _ZEN_Component_dragGroup_adjustHandleWidth;
	p.adjustResizeBox = _ZEN_Component_dragGroup_adjustResizeBox;
	p.animateIcon = _ZEN_Component_dragGroup_animateIcon;
	p.applyCSSSettings = _ZEN_Component_dragGroup_applyCSSSettings;
	p.close = _ZEN_Component_dragGroup_close;
	p.compress = _ZEN_Component_dragGroup_compress;
	p.constrainDragX = _ZEN_Component_dragGroup_constrainDragX;
	p.constrainDragY = _ZEN_Component_dragGroup_constrainDragY;
	p.disableCoverplate = _ZEN_Component_dragGroup_disableCoverplate;
	p.disableDrag = _ZEN_Component_dragGroup_disableDrag;
	p.disableHeaderMaxToggle = _ZEN_Component_dragGroup_disableHeaderMaxToggle;
	p.disableResize = _ZEN_Component_dragGroup_disableResize;
	p.enableCoverplate = _ZEN_Component_dragGroup_enableCoverplate;
	p.enableDrag = _ZEN_Component_dragGroup_enableDrag;
	p.enableHeaderMaxToggle = _ZEN_Component_dragGroup_enableHeaderMaxToggle;
	p.enableResize = _ZEN_Component_dragGroup_enableResize;
	p.endDrag = _ZEN_Component_dragGroup_endDrag;
	p.expand = _ZEN_Component_dragGroup_expand;
	p.getChildDiv = _ZEN_Component_dragGroup_getChildDiv;
	p.getCoverplateDiv = _ZEN_Component_dragGroup_getCoverplateDiv;
	p.getHeaderDiv = _ZEN_Component_dragGroup_getHeaderDiv;
	p.getHeaderUserDiv = _ZEN_Component_dragGroup_getHeaderUserDiv;
	p.getState = _ZEN_Component_dragGroup_getState;
	p.getWindowHeight = _ZEN_Component_dragGroup_getWindowHeight;
	p.getWindowWidth = _ZEN_Component_dragGroup_getWindowWidth;
	p.isCompressed = _ZEN_Component_dragGroup_isCompressed;
	p.isMaximized = _ZEN_Component_dragGroup_isMaximized;
	p.isResizeInProgress = _ZEN_Component_dragGroup_isResizeInProgress;
	p.maximize = _ZEN_Component_dragGroup_maximize;
	p.normalize = _ZEN_Component_dragGroup_normalize;
	p.onGrabHandler = _ZEN_Component_dragGroup_onGrabHandler;
	p.onRefreshContents = _ZEN_Component_dragGroup_onRefreshContents;
	p.onReleaseHandler = _ZEN_Component_dragGroup_onReleaseHandler;
	p.onresizeHandler = _ZEN_Component_dragGroup_onresizeHandler;
	p.processAppMessage = _ZEN_Component_dragGroup_processAppMessage;
	p.removeWindowChrome = _ZEN_Component_dragGroup_removeWindowChrome;
	p.renderContents = _ZEN_Component_dragGroup_renderContents;
	p.renderCoverplate = _ZEN_Component_dragGroup_renderCoverplate;
	p.renderHeader = _ZEN_Component_dragGroup_renderHeader;
	p.renderResize = _ZEN_Component_dragGroup_renderResize;
	p.resetWindowChrome = _ZEN_Component_dragGroup_resetWindowChrome;
	p.resize = _ZEN_Component_dragGroup_resize;
	p.restoreGeometry = _ZEN_Component_dragGroup_restoreGeometry;
	p.restoreState = _ZEN_Component_dragGroup_restoreState;
	p.saveGeometry = _ZEN_Component_dragGroup_saveGeometry;
	p.setAppLogo = _ZEN_Component_dragGroup_setAppLogo;
	p.setBodyStyle = _ZEN_Component_dragGroup_setBodyStyle;
	p.setCenterLayout = _ZEN_Component_dragGroup_setCenterLayout;
	p.setCloseIcon = _ZEN_Component_dragGroup_setCloseIcon;
	p.setContractIcon = _ZEN_Component_dragGroup_setContractIcon;
	p.setExpandIcon = _ZEN_Component_dragGroup_setExpandIcon;
	p.setHeaderLayout = _ZEN_Component_dragGroup_setHeaderLayout;
	p.setHeaderStyle = _ZEN_Component_dragGroup_setHeaderStyle;
	p.setIcon = _ZEN_Component_dragGroup_setIcon;
	p.setMaximizeIcon = _ZEN_Component_dragGroup_setMaximizeIcon;
	p.setMinimizeIcon = _ZEN_Component_dragGroup_setMinimizeIcon;
	p.setProperty = _ZEN_Component_dragGroup_setProperty;
	p.startDrag = _ZEN_Component_dragGroup_startDrag;
	p.syncObject = _ZEN_Component_dragGroup_syncObject;
	p.verifyHeaderGeometry = _ZEN_Component_dragGroup_verifyHeaderGeometry;
}

self._zenClassIdx['expando'] = '_ZEN_Component_expando';
self._ZEN_Component_expando = function(index,id) {
	if (index>=0) {_ZEN_Component_expando__init(this,index,id);}
}

self._ZEN_Component_expando__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_group__init) ?zenMaster._ZEN_Component_group__init(o,index,id):_ZEN_Component_group__init(o,index,id);
	o.OnDrawContent = ''; // encrypted
	o.animate = false;
	o.caption = '';
	o.childIndent = '';
	o.expanded = true;
	o.framed = false;
	o.groupClass = 'expandoTable';
	o.imageContracted = 'images\/disclosure-contracted.gif';
	o.imageExpanded = 'images\/disclosure-expanded.gif';
	o.oncontract = '';
	o.onexpand = '';
	o.remember = false;
}
function _ZEN_Component_expando_serialize(set,s)
{
	var o = this;s[0]='1404218005';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.OnDrawContent;s[7]=o.align;s[8]=(o.animate?1:0);s[9]=o.aux;s[10]=o.caption;s[11]=o.cellAlign;s[12]=o.cellSize;s[13]=o.cellStyle;s[14]=o.cellVAlign;s[15]=o.childIndent;s[16]=set.serializeList(o,o.children,true,'children');s[17]=o.containerStyle;s[18]=(o.disabled?1:0);s[19]=(o.dragEnabled?1:0);s[20]=(o.dropEnabled?1:0);s[21]=(o.dynamic?1:0);s[22]=o.enclosingClass;s[23]=o.enclosingStyle;s[24]=o.error;s[25]=(o.expanded?1:0);s[26]=(o.framed?1:0);s[27]=o.groupClass;s[28]=o.groupStyle;s[29]=o.height;s[30]=(o.hidden?1:0);s[31]=o.hint;s[32]=o.hintClass;s[33]=o.hintStyle;s[34]=o.imageContracted;s[35]=o.imageExpanded;s[36]=o.label;s[37]=o.labelClass;s[38]=o.labelDisabledClass;s[39]=o.labelPosition;s[40]=o.labelStyle;s[41]=o.layout;s[42]=o.onafterdrag;s[43]=o.onbeforedrag;s[44]=o.onclick;s[45]=o.oncontract;s[46]=o.ondrag;s[47]=o.ondrop;s[48]=o.onexpand;s[49]=o.onhide;s[50]=o.onrefresh;s[51]=o.onshow;s[52]=o.onupdate;s[53]=o.overlayMode;s[54]=(o.remember?1:0);s[55]=o.renderFlag;s[56]=(o.showLabel?1:0);s[57]=o.slice;s[58]=o.title;s[59]=o.tuple;s[60]=o.valign;s[61]=(o.visible?1:0);s[62]=o.width;
}
function _ZEN_Component_expando_getSettings(s)
{
	s['name'] = 'string';
	s['animate'] = 'boolean';
	s['caption'] = 'caption';
	s['childIndent'] = 'length';
	s['expanded'] = 'boolean';
	s['framed'] = 'boolean';
	s['imageContracted'] = 'uri';
	s['imageExpanded'] = 'uri';
	s['oncontract'] = 'eventHandler';
	s['onexpand'] = 'eventHandler';
	s['remember'] = 'boolean';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_expando_animateExpand = function(delta,divid) {
delta = parseInt(delta);
delete this._exTimerId;
this._progress = parseInt(this._progress) + parseInt(delta);
div = this.findElement(divid);
if (this._progress > 0 && this._progress < 100) {
var h = parseInt(((this._progress / 100) * this._height));
h = (h <= 1) ? 1 : h;
div.style.height = h + 'px';
if (div.style.opacity != null) {
div.style.opacity = this._progress / 100;
}
else if (div.style.filter != null) {
div.style.filter = 'alpha(opacity=' + this._progress + ')';
}
div.scrollIntoView();
this._exTimerId = self.setTimeout("zenPage.getComponent("+this.index+").animateExpand("+(delta*1.3)+",'"+divid+"')",20);
}
else {
div.style.height = 	this._cssHeight;
if (null != div.style.opacity) {
div.style.opacity = this._cssOpacity;
}
else if (div.style.filter != null) {
div.style.filter = '';
}
div.style.overflow = this._cssOverflow;
div.style.display = this.expanded ? '' : 'none';
div.scrollIntoView();
}
}

self._ZEN_Component_expando_getExpanded = function(tuple) {
if ('undefined' != typeof tuple) {
var div = this.window.document.getElementById('expandoChildren_' + this.index + '.' + tuple);
return div ? (div.style.display=='none' ? false : true) : false;
}
return this.expanded;
}

self._ZEN_Component_expando_onloadHandler = function() {
if (this.remember) {
var exp = parseInt(zenLoadCookie(this,'expando'),10);
if (exp > 0) {
this.setExpanded(exp == 2);
}
}
}

self._ZEN_Component_expando_setExpanded = function(flag,tuple) {
this.expanded = flag;
var divid = '';
var div = null;
var img = null;
if ('undefined' == typeof tuple) {
divid = 'expandoChildren';
div = this.findElement(divid);
img = this.findElement('image');
}
else {
divid = 'expandoChildren_' + this.index + '.' + tuple;
div = this.window.document.getElementById(divid);
img = this.window.document.getElementById('image_' + this.index + '.' + tuple);
}
zenASSERT(div,'Unable to find div element for children',arguments);
if (this.expanded) {
zenInvokeCallbackMethod(this.onexpand,this,'onexpand','tuple',tuple);
}
else {
zenInvokeCallbackMethod(this.oncontract,this,'oncontract','tuple',tuple);
}
if (this.animate) {
if (this._cssHeight==undefined){
this._cssHeight = div.style.height;
}
if (this._cssOverflow==undefined){
this._cssOverflow = div.style.overflow;
}
if (div.style.opacity != null) {
if (this._cssOpacity==undefined) {
this._cssOpacity = div.style.opacity;
}
}
if (this.expanded) {
var h = div.clientHeight;
if (h > 0) {
this._height = h;
}
else if (div.style.height!='') {
this._height = div.style.height;
}
else if (null == this._height) {
this._height = 100; // guess
}
if (div.style.opacity != null) {
div.style.opacity = 0.0;
}
div.style.height = '1px';
div.style.overflow = 'hidden';
div.style.display = '';
}
else {
this._height = div.clientHeight;
div.style.overflow = 'hidden';
if (div.style.opacity != null) {
div.style.opacity = 1.0;
}
}
if (this._exTimerId) {
window.clearTimeout(this._exTimerId);
}
this._progress = this.expanded ? 0 : 100;
var delta = this.expanded ? 10 : -10;
this._exTimerId = self.setTimeout("zenPage.getComponent("+this.index+").animateExpand("+delta+",'"+divid+"')",20);
}
else {
div.style.display = this.expanded ? '' : 'none';
}
if (img) {
img.src = this.expanded ? this.imageExpanded : this.imageContracted;
}
if (this.expanded) this.exposeComponent();
if (this.remember && ('undefined' == typeof tuple)) {
zenStoreCookie(this,'expando',this.expanded ? '2' : '1');
}
}

self._ZEN_Component_expando_setProperty = function(property,value,value2) {
switch(property) {
case 'animate':
this.animate = value ? true : false;
break;
case 'expanded':
value = value ? true : false;
this.setExpanded(value);
break;
case 'childIndent':
this[property] = value;
this.refreshContents();
break;
case 'caption':
this.caption = value;
var span = this.findElement('caption');
if (span) {
span.innerHTML = this.caption;
}
break;
default:
return this.invokeSuper('setProperty',arguments);
break;
}
return true;
}

self._ZEN_Component_expando_toggleExpanded = function(tuple) {
if ('undefined' == typeof tuple) {
this.setExpanded(!this.getExpanded());
}
else {
this.setExpanded(!this.getExpanded(), tuple);
}
}

self._ZEN_Component_expando_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_expando__Loader = function() {
	zenLoadClass('_ZEN_Component_group');
	_ZEN_Component_expando.prototype = zenCreate('_ZEN_Component_group',-1);
	var p = _ZEN_Component_expando.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_expando;
	p.superClass = ('undefined' == typeof _ZEN_Component_group) ? zenMaster._ZEN_Component_group.prototype:_ZEN_Component_group.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.expando';
	p._type = 'expando';
	p.serialize = _ZEN_Component_expando_serialize;
	p.getSettings = _ZEN_Component_expando_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_expando_ReallyRefreshContents;
	p.animateExpand = _ZEN_Component_expando_animateExpand;
	p.getExpanded = _ZEN_Component_expando_getExpanded;
	p.onloadHandler = _ZEN_Component_expando_onloadHandler;
	p.setExpanded = _ZEN_Component_expando_setExpanded;
	p.setProperty = _ZEN_Component_expando_setProperty;
	p.toggleExpanded = _ZEN_Component_expando_toggleExpanded;
}

self._zenClassIdx['fieldSet'] = '_ZEN_Component_fieldSet';
self._ZEN_Component_fieldSet = function(index,id) {
	if (index>=0) {_ZEN_Component_fieldSet__init(this,index,id);}
}

self._ZEN_Component_fieldSet__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_group__init) ?zenMaster._ZEN_Component_group__init(o,index,id):_ZEN_Component_group__init(o,index,id);
	o.groupClass = 'fieldset';
	o.legend = '';
	o.title = '';
}
function _ZEN_Component_fieldSet_serialize(set,s)
{
	var o = this;s[0]='2827071724';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.cellAlign;s[9]=o.cellSize;s[10]=o.cellStyle;s[11]=o.cellVAlign;s[12]=set.serializeList(o,o.children,true,'children');s[13]=o.containerStyle;s[14]=(o.disabled?1:0);s[15]=(o.dragEnabled?1:0);s[16]=(o.dropEnabled?1:0);s[17]=(o.dynamic?1:0);s[18]=o.enclosingClass;s[19]=o.enclosingStyle;s[20]=o.error;s[21]=o.groupClass;s[22]=o.groupStyle;s[23]=o.height;s[24]=(o.hidden?1:0);s[25]=o.hint;s[26]=o.hintClass;s[27]=o.hintStyle;s[28]=o.label;s[29]=o.labelClass;s[30]=o.labelDisabledClass;s[31]=o.labelPosition;s[32]=o.labelStyle;s[33]=o.layout;s[34]=o.legend;s[35]=o.onafterdrag;s[36]=o.onbeforedrag;s[37]=o.onclick;s[38]=o.ondrag;s[39]=o.ondrop;s[40]=o.onhide;s[41]=o.onrefresh;s[42]=o.onshow;s[43]=o.onupdate;s[44]=o.overlayMode;s[45]=o.renderFlag;s[46]=(o.showLabel?1:0);s[47]=o.slice;s[48]=o.title;s[49]=o.tuple;s[50]=o.valign;s[51]=(o.visible?1:0);s[52]=o.width;
}
function _ZEN_Component_fieldSet_getSettings(s)
{
	s['name'] = 'string';
	s['legend'] = 'caption';
	s['title'] = 'caption';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_fieldSet_ondisabledHandler = function() {
var fs = this.findElement('fieldset');
fs.disabled = this.disabled;
fs.className = this.disabled ? 'fieldSetDisabled' : 'fieldSet';
}

self._ZEN_Component_fieldSet_setProperty = function(property,value,value2) {
switch(property) {
case 'legend':
var lgd = this.findElement('legend');
this.legend = value;
if (lgd) {
lgd.innerHTML = zenEscapeHTMLSafe(value);
}
break;
case 'title':
var lgd = this.findElement('legend');
this.title = value;
if (lgd) {
lgd.title = value;
}
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_fieldSet_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_fieldSet__Loader = function() {
	zenLoadClass('_ZEN_Component_group');
	_ZEN_Component_fieldSet.prototype = zenCreate('_ZEN_Component_group',-1);
	var p = _ZEN_Component_fieldSet.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_fieldSet;
	p.superClass = ('undefined' == typeof _ZEN_Component_group) ? zenMaster._ZEN_Component_group.prototype:_ZEN_Component_group.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.fieldSet';
	p._type = 'fieldSet';
	p.serialize = _ZEN_Component_fieldSet_serialize;
	p.getSettings = _ZEN_Component_fieldSet_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_fieldSet_ReallyRefreshContents;
	p.ondisabledHandler = _ZEN_Component_fieldSet_ondisabledHandler;
	p.setProperty = _ZEN_Component_fieldSet_setProperty;
}

self._zenClassIdx['hgroup'] = '_ZEN_Component_hgroup';
self._ZEN_Component_hgroup = function(index,id) {
	if (index>=0) {_ZEN_Component_hgroup__init(this,index,id);}
}

self._ZEN_Component_hgroup__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_group__init) ?zenMaster._ZEN_Component_group__init(o,index,id):_ZEN_Component_group__init(o,index,id);
	o.layout = ''; // encrypted
}
function _ZEN_Component_hgroup_serialize(set,s)
{
	var o = this;s[0]='2521056755';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.cellAlign;s[9]=o.cellSize;s[10]=o.cellStyle;s[11]=o.cellVAlign;s[12]=set.serializeList(o,o.children,true,'children');s[13]=o.containerStyle;s[14]=(o.disabled?1:0);s[15]=(o.dragEnabled?1:0);s[16]=(o.dropEnabled?1:0);s[17]=(o.dynamic?1:0);s[18]=o.enclosingClass;s[19]=o.enclosingStyle;s[20]=o.error;s[21]=o.groupClass;s[22]=o.groupStyle;s[23]=o.height;s[24]=(o.hidden?1:0);s[25]=o.hint;s[26]=o.hintClass;s[27]=o.hintStyle;s[28]=o.label;s[29]=o.labelClass;s[30]=o.labelDisabledClass;s[31]=o.labelPosition;s[32]=o.labelStyle;s[33]=o.layout;s[34]=o.onafterdrag;s[35]=o.onbeforedrag;s[36]=o.onclick;s[37]=o.ondrag;s[38]=o.ondrop;s[39]=o.onhide;s[40]=o.onrefresh;s[41]=o.onshow;s[42]=o.onupdate;s[43]=o.overlayMode;s[44]=o.renderFlag;s[45]=(o.showLabel?1:0);s[46]=o.slice;s[47]=o.title;s[48]=o.tuple;s[49]=o.valign;s[50]=(o.visible?1:0);s[51]=o.width;
}
function _ZEN_Component_hgroup_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_hgroup_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_hgroup__Loader = function() {
	zenLoadClass('_ZEN_Component_group');
	_ZEN_Component_hgroup.prototype = zenCreate('_ZEN_Component_group',-1);
	var p = _ZEN_Component_hgroup.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_hgroup;
	p.superClass = ('undefined' == typeof _ZEN_Component_group) ? zenMaster._ZEN_Component_group.prototype:_ZEN_Component_group.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.hgroup';
	p._type = 'hgroup';
	p.serialize = _ZEN_Component_hgroup_serialize;
	p.getSettings = _ZEN_Component_hgroup_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_hgroup_ReallyRefreshContents;
}

self._zenClassIdx['menu'] = '_ZEN_Component_menu';
self._ZEN_Component_menu = function(index,id) {
	if (index>=0) {_ZEN_Component_menu__init(this,index,id);}
}

self._ZEN_Component_menu__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_group__init) ?zenMaster._ZEN_Component_group__init(o,index,id):_ZEN_Component_group__init(o,index,id);
	o.caption = '';
	o.disabled = false;
	o.groupClass = 'menuTable';
	o.help = '';
	o.image = '';
	o.imageHeight = '16';
	o.imageWidth = '16';
	o.layout = 'horizontal';
	o.link = '';
	o.linkResource = '';
	o.onactivate = '';
	o.onclick = '';
	o.onshowHelp = '';
	o.secureCallback = '';
	o.secureLink = '';
	o.subMenuActive = false;
	o.subMenuLevel = '0';
	o.target = '';
}
function _ZEN_Component_menu_serialize(set,s)
{
	var o = this;s[0]='639506262';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.caption;s[9]=o.cellAlign;s[10]=o.cellSize;s[11]=o.cellStyle;s[12]=o.cellVAlign;s[13]=set.serializeList(o,o.children,true,'children');s[14]=o.containerStyle;s[15]=(o.disabled?1:0);s[16]=(o.dragEnabled?1:0);s[17]=(o.dropEnabled?1:0);s[18]=(o.dynamic?1:0);s[19]=o.enclosingClass;s[20]=o.enclosingStyle;s[21]=o.error;s[22]=o.groupClass;s[23]=o.groupStyle;s[24]=o.height;s[25]=o.help;s[26]=(o.hidden?1:0);s[27]=o.hint;s[28]=o.hintClass;s[29]=o.hintStyle;s[30]=o.image;s[31]=o.imageHeight;s[32]=o.imageWidth;s[33]=o.label;s[34]=o.labelClass;s[35]=o.labelDisabledClass;s[36]=o.labelPosition;s[37]=o.labelStyle;s[38]=o.layout;s[39]=o.link;s[40]=o.linkResource;s[41]=o.onactivate;s[42]=o.onafterdrag;s[43]=o.onbeforedrag;s[44]=o.onclick;s[45]=o.ondrag;s[46]=o.ondrop;s[47]=o.onhide;s[48]=o.onrefresh;s[49]=o.onshow;s[50]=o.onshowHelp;s[51]=o.onupdate;s[52]=o.overlayMode;s[53]=o.renderFlag;s[54]=o.secureCallback;s[55]=o.secureLink;s[56]=(o.showLabel?1:0);s[57]=o.slice;s[58]=(o.subMenuActive?1:0);s[59]=o.subMenuLevel;s[60]=o.target;s[61]=o.title;s[62]=o.tuple;s[63]=o.valign;s[64]=(o.visible?1:0);s[65]=o.width;
}
function _ZEN_Component_menu_getSettings(s)
{
	s['name'] = 'string';
	s['caption'] = 'caption';
	s['disabled'] = 'boolean';
	s['help'] = 'caption';
	s['image'] = 'uri';
	s['imageHeight'] = 'length';
	s['imageWidth'] = 'length';
	s['layout'] = 'string';
	s['link'] = 'uri';
	s['linkResource'] = 'resource';
	s['onactivate'] = 'eventHandler';
	s['onclick'] = 'eventHandler';
	s['onshowHelp'] = 'eventHandler';
	s['secureCallback'] = 'string';
	s['secureLink'] = 'string';
	s['subMenuActive'] = 'boolean';
	s['target'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_menu_onActionHandler = function() {
}

self._ZEN_Component_menu_onEndModalHandler = function(zindex) {
var hdr = this.findElement('a');
zenASSERT(hdr,"Unable to find anchor div.",arguments);
if (2 == this.subMenuLevel) {
var submenu = self.document.getElementById('zenModalDiv');
}
else {
var submenu = this.findElement('submenu');
}
zenASSERT(submenu,"Unable to find submenu div.",arguments);
hdr.className = 'menuItem';
submenu.style.display = 'none';
this.getEnclosingDiv().appendChild(submenu);
this.activeSubmenu=null;
this.subMenuActive = false;
}

self._ZEN_Component_menu_onItemActionHandler = function(depth) {
if (depth > 1) {
zenPage.endModal();
}
if (this.parent.onItemActionHandler) {
this.parent.onItemActionHandler(depth+1);
}
}

self._ZEN_Component_menu_onItemShowHelpHandler = function(mode,item) {
if (this.parent.onItemShowHelpHandler) {
this.parent.onItemShowHelpHandler(mode,item);
}
else {
if (mode) {
zenInvokeCallbackMethod(this.onshowHelp, this, 'onshowHelp', 'help',item.help);
}
else {
zenInvokeCallbackMethod(this.onshowHelp, this, 'onshowHelp', 'help','');
}
}
}

self._ZEN_Component_menu_onShowHelpHandler = function(mode) {
}

self._ZEN_Component_menu_onStartModalHandler = function(zindex) {
var trap = self.document.getElementById("zenMouseTrap");
if (zenASSERT(trap,"Unable to find zenMouseTrap div.",arguments)) { return; }
var hdr = this.findElement('a');
zenASSERT(hdr,"Unable to find anchor div.",arguments);
var submenuDiv = this.findElement('submenu');
zenASSERT(submenuDiv,"Unable to find submenu div.",arguments);
var vertical = true;
if (1==this.subMenuLevel && this.parent.layout && this.parent.layout == 'horizontal') {
vertical = false;
}
var top,right;
if (vertical) {
var top = zenGetTop(hdr);
var right = zenGetLeft(hdr) + hdr.offsetWidth;
}
else {
var top = zenGetTop(hdr) + hdr.offsetHeight;
var right = zenGetLeft(hdr);
}
var submenu = submenuDiv;
if (2 == this.subMenuLevel) {
var div = self.document.getElementById('zenModalDiv');
div.innerHTML = submenuDiv.innerHTML;
submenu = div;
}
submenu.style.position = 'absolute';
submenu.style.top = top + "px";
submenu.style.left = right + "px";
submenu.style.display = '';
this.getEnclosingDiv().style.zIndex = zindex;
hdr.style.zIndex = zindex+1;
submenu.style.zIndex = zindex+1;
document.body.appendChild(submenu);
this.activeSubmenu=submenu;
zenPage.correctIELayering(submenu);
}

self._ZEN_Component_menu_showSubMenu = function() {
var hdr = this.findElement('a');
if (null == hdr) {
return;
}
zenASSERT(hdr,"Unable to find anchor div.",arguments);
if (this.subMenuActive) {
return;
}
zenInvokeCallbackMethod(this.onactivate,this,'onactivate');
this.subMenuActive = true;
hdr.className = 'menuItemActive';
zenPage.startModal(this);
}

self._ZEN_Component_menu_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_menu__Loader = function() {
	zenLoadClass('_ZEN_Component_group');
	_ZEN_Component_menu.prototype = zenCreate('_ZEN_Component_group',-1);
	var p = _ZEN_Component_menu.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_menu;
	p.superClass = ('undefined' == typeof _ZEN_Component_group) ? zenMaster._ZEN_Component_group.prototype:_ZEN_Component_group.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.menu';
	p._type = 'menu';
	p.serialize = _ZEN_Component_menu_serialize;
	p.getSettings = _ZEN_Component_menu_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_menu_ReallyRefreshContents;
	p.onActionHandler = _ZEN_Component_menu_onActionHandler;
	p.onEndModalHandler = _ZEN_Component_menu_onEndModalHandler;
	p.onItemActionHandler = _ZEN_Component_menu_onItemActionHandler;
	p.onItemShowHelpHandler = _ZEN_Component_menu_onItemShowHelpHandler;
	p.onShowHelpHandler = _ZEN_Component_menu_onShowHelpHandler;
	p.onStartModalHandler = _ZEN_Component_menu_onStartModalHandler;
	p.showSubMenu = _ZEN_Component_menu_showSubMenu;
}

self._zenClassIdx['modalGroup'] = '_ZEN_Component_modalGroup';
self._ZEN_Component_modalGroup = function(index,id) {
	if (index>=0) {_ZEN_Component_modalGroup__init(this,index,id);}
}

self._ZEN_Component_modalGroup__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_group__init) ?zenMaster._ZEN_Component_group__init(o,index,id):_ZEN_Component_group__init(o,index,id);
	o.groupTitle = '';
	o.groupType = '';
	o.hidden = true;
	o.okCaption = 'OK';
	o.onaction = '';
	o.onhideGroup = '';
	o.onshowGroup = '';
	o.seed = '';
	o.value = '';
}
function _ZEN_Component_modalGroup_serialize(set,s)
{
	var o = this;s[0]='891749812';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.cellAlign;s[9]=o.cellSize;s[10]=o.cellStyle;s[11]=o.cellVAlign;s[12]=set.serializeList(o,o.children,true,'children');s[13]=o.containerStyle;s[14]=(o.disabled?1:0);s[15]=(o.dragEnabled?1:0);s[16]=(o.dropEnabled?1:0);s[17]=(o.dynamic?1:0);s[18]=o.enclosingClass;s[19]=o.enclosingStyle;s[20]=o.error;s[21]=o.groupClass;s[22]=o.groupStyle;s[23]=o.groupTitle;s[24]=o.groupType;s[25]=o.height;s[26]=(o.hidden?1:0);s[27]=o.hint;s[28]=o.hintClass;s[29]=o.hintStyle;s[30]=o.label;s[31]=o.labelClass;s[32]=o.labelDisabledClass;s[33]=o.labelPosition;s[34]=o.labelStyle;s[35]=o.layout;s[36]=o.okCaption;s[37]=o.onaction;s[38]=o.onafterdrag;s[39]=o.onbeforedrag;s[40]=o.onclick;s[41]=o.ondrag;s[42]=o.ondrop;s[43]=o.onhide;s[44]=o.onhideGroup;s[45]=o.onrefresh;s[46]=o.onshow;s[47]=o.onshowGroup;s[48]=o.onupdate;s[49]=o.overlayMode;s[50]=o.renderFlag;s[51]=o.seed;s[52]=(o.showLabel?1:0);s[53]=o.slice;s[54]=o.title;s[55]=o.tuple;s[56]=o.valign;s[57]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[58]=(o.visible?1:0);s[59]=o.width;
}
function _ZEN_Component_modalGroup_getSettings(s)
{
	s['name'] = 'string';
	s['groupTitle'] = 'caption';
	s['okCaption'] = 'caption';
	s['onaction'] = 'eventHandler';
	s['onhideGroup'] = 'eventHandler';
	s['onshowGroup'] = 'eventHandler';
	s['seed'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_modalGroup_actionHandler = function() {
switch(this.groupType) {
case 'calendar':
var ctrl = zenPage.getComponent(this.controlIndex);
this.value = ctrl.getValue();
zenInvokeCallbackMethod(this.onaction,this,'onaction','group',this);
break;
}
this.hideGroup();
}

self._ZEN_Component_modalGroup_constrainDragX = function(engine,wrapper,intendedX) {
if (this._dragData) {
if (this._dragData.type == 'move') {
if (intendedX < -this._dragData.startLeft) intendedX = -this._dragData.startLeft;
else if ((intendedX + this._dragData.startLeft) > this._dragData.maxLeft) intendedX = this._dragData.maxLeft-this._dragData.startLeft;
var div = this.getFloatingDiv();
div.style.left = this._dragData.startLeft + intendedX + 'px';
}
else if (this._dragData.type == 'resize') {
this._dragData.width = this._dragData.startWidth + intendedX;
if (this._dragData.width < 100) this._dragData.width = 100;
if (this._dragData.width > this._dragData.maxWidth) this._dragData.width = this._dragData.maxWidth;
}
}
return 0;
}

self._ZEN_Component_modalGroup_constrainDragY = function(engine,wrapper,intendedY) {
if (this._dragData) {
if (this._dragData.type == 'move') {
if (intendedY < -this._dragData.startTop) intendedY = -this._dragData.startTop;
else if ((intendedY + this._dragData.startTop) > this._dragData.maxTop) intendedY = this._dragData.maxTop - this._dragData.startTop;
var div = this.getFloatingDiv();
div.style.top = (this._dragData.startTop + intendedY) + 'px';
}
else if (this._dragData.type == 'resize') {
var newHeight = this._dragData.startHeight + intendedY;
if (newHeight < 100) newHeight = 100;
if (newHeight > this._dragData.maxHeight) newHeight = this._dragData.maxHeight;
var div = this.getFloatingDiv();
div.style.width = this._dragData.width + 'px';
div.style.height = newHeight + 'px';
this.updateFrameSize(this._dragData.width,newHeight);
if (div._iFrame) { // update iFrame if present
div._iFrame.style.height = div.offsetHeight + 'px';
div._iFrame.style.width = div.offsetWidth + 'px';
}
}
}
return 0;
}

self._ZEN_Component_modalGroup_endDrag = function(engine,wrapper) {
this.toggleDragMouseTrap(false);
var dragMouseTrap = this.findElement('dragMouseTrap');
if (dragMouseTrap && ZLM.getWrapper(dragMouseTrap)) {
for (var i = ZLM.stones.length-1; i >= 0; i--) {
if (ZLM.stones[i].node == dragMouseTrap) ZLM.stones.splice(i,1);
}
}
delete this._dragData;
}

self._ZEN_Component_modalGroup_getFloatingDiv = function() {
var divId='zenFloatingDiv_'+this.index;
var div = self.document.getElementById(divId);
return(div);
}

self._ZEN_Component_modalGroup_getModalBodyContent = function(update) {
var content = '';
if (this.groupType == 'static') {
var enc = this.getEnclosingDiv();
if (enc) {
var modalBody = this.findElement('modalBody');
if (modalBody) { // we have already been rendered once
if (enc.innerHTML != '') { // enc has data, so it takes primacy
content = enc.innerHTML;
}
else {
content = modalBody.innerHTML;
}
if (update) {
modalBody.innerHTML = content;
}
}
else { // we haven't been rendered yet
content = enc.innerHTML;
}
enc.innerHTML = '';
}
this._htmlStash = content;
}
return content;
}

self._ZEN_Component_modalGroup_getValue = function() {
return this.getProperty('value');
}

self._ZEN_Component_modalGroup_hideGroup = function() {
if (this.groupType == 'dialog') this._canClose = true;
var div = this.getFloatingDiv();
if (div) {
div.style.opacity = 0;
}
if ((!zenIsHTML5) || (!window.TransitionEnd)) {
if (!this._closing) {
zenPage.endModal();
this._closing = true;
}
}
}

self._ZEN_Component_modalGroup_mousedownHandler = function(evt) {
var div = this.getFloatingDiv();
evt = evt ? evt : window.event;
this._mouseMode = 'move';
var x = parseInt(div.style.left,10);
var y = parseInt(div.style.top,10);
this.deltaX = evt.clientX - x;
this.deltaY = evt.clientY - y;
div.onmousemove = this.wrapMethod('mousemoveHandler');
div.onmouseup = this.wrapMethod('mouseupHandler');
if (evt.stopPropagation) { evt.stopPropagation(); }
if (evt.preventDefault) { evt.preventDefault(); }
}

self._ZEN_Component_modalGroup_mousemoveHandler = function(evt) {
var div = this.getFloatingDiv();
evt = evt ? evt : window.event;
if (this._mouseMode == 'resize') {
var oldW = div.offsetWidth;
var oldH = div.offsetHeight;
div.style.width = parseInt(evt.clientX - this.deltaX - div.offsetLeft) + 'px';
div.style.height = parseInt(evt.clientY - this.deltaY - div.offsetTop) + 'px';
var frame = this.findElement('frame');
if (frame) {
var dw = div.offsetWidth - oldW;
var dh = div.offsetHeight - oldH;
frame.style.width = frame.offsetWidth + dw + 'px';
frame.style.height = frame.offsetHeight + dh + 'px';
}
}
else {
div.style.left = (evt.clientX - this.deltaX) + 'px';
div.style.top = (evt.clientY - this.deltaY) + 'px';
}
if (evt.stopPropagation) { evt.stopPropagation(); }
}

self._ZEN_Component_modalGroup_mouseupHandler = function(evt) {
var div = this.getFloatingDiv();
evt = evt ? evt : window.event;
div.onmousemove = null;
div.onmouseup = null;
if (evt.stopPropagation) { evt.stopPropagation(); }
}

self._ZEN_Component_modalGroup_onCanEndModalHandler = function() {
if (this.groupType != 'dialog') return true;
return !!this._canClose;
}

self._ZEN_Component_modalGroup_onDelete = function() {
var div = this.getFloatingDiv();
if (div && div.parentNode) div.parentNode.removeChild(div);
}

self._ZEN_Component_modalGroup_onDialogFrameLoad = function(contentWindow) {
if (contentWindow) {
if (contentWindow.document) this.updateTitle(contentWindow.document.title);
contentWindow.focus();
}
}

self._ZEN_Component_modalGroup_onEndModalHandler = function(zindex) {
var div = this.getFloatingDiv();
div.style.display = "none";
zenTrapTAB = (null == this._oldTrapTAB) ? false : this._oldTrapTAB;
if ((this.groupType == 'dialog') && self.zenPopupWindow) {
var iframe = this.findElement('frame');
if (iframe && (self.zenPopupWindow == iframe.contentWindow)) self.zenPopupWindow = null;
}
if (zenPage && (('dynamic' == this.groupType) || ('dialog' == this.groupType))) {
this.visible = false;
zenPage.removeChild(this);
}
div.onmousedown = null;
div.onmouseup = null;
div.onmousemove = null;
zenInvokeCallbackMethod(this.onhideGroup,this,'onhideGroup','group',this);
}

self._ZEN_Component_modalGroup_onRefreshContents = function() {
if (this.groupType == 'static') {
this.getModalBodyContent(true);
}
this.invokeSuper('onRefreshContents',arguments);
}

self._ZEN_Component_modalGroup_onStartModalHandler = function(zindex) {
var div = this.getFloatingDiv();
if (!div) {
var div = document.createElement('div');
div.id='zenFloatingDiv_'+this.index;
div.style.display="none";
if (this.groupType == 'dialog') div.className = 'modalGroupDialog';
document.body.appendChild(div);
if (zenIsIE) { //SAM055
var iFrame = document.createElement("iframe");
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
}
}
var update = false;
var resize = false;
var moveWithZLM = true;
var mainClassName = 'modalGroup';
if (this.groupType == 'dialog') mainClassName += ' modalGroupDialog';
div.className = mainClassName;
div.onmousedown = null;
div.onmouseup = null;
div.onmousemove = null;
var contents = '';
switch (this.groupType) {
case 'calendar':
var cal = zenPage.createComponent('calendar');
this.addChild(cal);
cal.setProperty('startYear',1900);
cal.setProperty('onchange','zenPage.getComponent('+this.index+').actionHandler();');
if (this._parms) {
for (var p in this._parms) {
cal.setProperty(p,this._parms[p]);
}
}
cal.setProperty('value',this.value);
this.controlIndex = cal.index;
break;
case 'msgBox':
contents = this.value;
break;
case 'dialog':
this._canClose = false;
resize = !!this._allowResize;
break;
case 'callback':
break;
default:
break;
}
var html = [];
if (('' != this.groupTitle) || (this.groupType == 'dialog')) {
var titleClass = 'modalGroupTitle' + (this.groupType == 'dialog' ? ' modalGroupDialog' : '');
var mousedownHandler = moveWithZLM ? 'startZLMMove' : 'mousedownHandler';
html.push('<div id="'+this.makeId('title')+'" class="'+titleClass+'" style="z-index:'+(zindex+(2*moveWithZLM))+';" onselectstart="return false;" onmousedown="zenPage.getComponent('+this.index+').'+mousedownHandler+'(event);" ontouchstart="zenPage.getComponent('+this.index+').'+mousedownHandler+'(event);">');
html.push('<table border="0" cellpadding="0" cellspacing="0"><tr>');
html.push('<td id="'+this.makeId('titleText')+'" style="text-align:left;" nowrap="1">' + this.groupTitle + '</td>');
html.push('</tr></table>');
html.push('</div>');
}
if ('dialog' == this.groupType) {
html.push('<div id="'+this.makeId('modalGroupBody')+'" class="modalGroupBody modalGroupDialog" style="z-index:'+zindex+';">');
var src = this.value ? this.value : '';
if ((-1 == src.indexOf('?$ZEN_POPUP=1')) && (-1 == src.indexOf('&$ZEN_POPUP=1'))) {
src += (src.indexOf('?') == -1 ? '?' : '&') + '$ZEN_POPUP=1';
}
if ((-1 == src.indexOf('?$ZEN_SOFTMODAL=1')) && (-1 == src.indexOf('&$ZEN_SOFTMODAL=1'))) {
src += (src.indexOf('?') == -1 ? '?' : '&') + '$ZEN_SOFTMODAL=1';
}
var fw = (this._width ? this._width : '700') + 'px';
var fh = (this._height ? this._height : '500') + 'px';
html.push('<iframe id="'+this.makeId('frame')+'" zenCompIndex="' + this.index + '" class="modalGroupIframe" frameborder="0" scrolling="auto" width="'+fw+'" height="'+fh+'" src="'+src+'" onload="zenPage.getComponent('+this.index+').onDialogFrameLoad(this.contentWindow);"/>');
html.push('</div>');
}
else if ('callback' == this.groupType) {
if (this._function && 'function' == typeof this._function) {
var info = this._function(this);
var style = info.style ? info.style : '';
html.push('<div class="modalGroupBody" style="overflow:auto;z-index:'+zindex+';'+style+'">');
html.push(info.content ? info.content : '');
html.push('</div>');
}
else {
html.push('<div class="modalGroupBody" style="z-index:'+zindex+';">');
html.push('No callback supplied');
html.push('</div>');
}
}
else if ('static' != this.groupType) {
if ('' != contents) {
html.push('<div class="modalGroupBody" style="z-index:'+zindex+';">');
html.push(contents);
html.push('</div>');
html.push('<div class="modalGroupFooter" style="z-index:'+zindex+';">');
html.push('<input type="button" value="'+this.okCaption+'" onclick="zenPage.endModal();" />');
html.push('</div>');
}
}
if ('static' == this.groupType) {
var staticHTML = this.getModalBodyContent(false);
html.push('<div id="' + this.makeId('modalBody') + '" class="modalGroupBody" style="z-index:'+zindex+';">');
html.push(staticHTML);
html.push('</div>');
update = true;
}
else {
for (var n = 0; n < this.children.length; n++) {
var child = this.children[n];
var divid = ('' == child.id) ? 'zen'+child.index : child.id;
html.push('<div id="'+divid+'" class="modalGroupBody" style="z-index:'+zindex+';"></div>');
}
}
div.innerHTML = html.join('');
div.style.width = (this._width == null) ? 'auto' : this._width + 'px';
div.style.height = (this._height == null) ? 'auto' : this._height + 'px';
this._width = null;
this._height = null;
var handle = document.createElement('div');
handle.className = 'modalGroupClose';
var thisIndex = this.index;
handle.onclick = function(evt) { zenPage.getComponent(thisIndex).hideGroup(); };
handle.innerHTML = '<input class="modalGroupCloseButton" type="image" src="images/closewhite.png" onmouseover="this.className=\'modalGroupCloseButtonHover\';" onmouseout="this.className=\'modalGroupCloseButton\'">';
div.insertBefore(handle,div.firstChild);
handle.style.zIndex = zindex + 3;
if (resize) {
var sz = 16;
var handle = document.createElement('div');
handle.className = 'modalGroupHandle';
handle.style.zIndex = 65536;
handle.style.width = '20px';
handle.style.height = '20px';
handle.innerHTML = '<image id="'+this.makeId('resize')+'" src="images/grayDragResize.png" style="cursor:nw-resize; z-index:65535; width:'+sz+'px; height:'+sz+'px; padding-left:2px; padding-top:2px;" onmousedown="zenPage.getComponent('+this.index+').startZLMResize(event);" ontouchstart="zenPage.getComponent('+this.index+').startZLMResize(event);">';
div.insertBefore(handle,div.firstChild);
}
if (moveWithZLM || resize) {
var dragMouseTrap = document.createElement('div');
dragMouseTrap.className = 'modalGroupDialog dragMouseTrap';
dragMouseTrap.setAttribute('id',this.makeId('dragMouseTrap'));
div.insertBefore(dragMouseTrap,div.firstChild.nextSibling);
dragMouseTrap.style.display = 'none';
dragMouseTrap.style.zIndex = zindex+1;
if (zenIsIE && !zenIsHTML5) dragMouseTrap.style.position = 'absolute';
}
if (div._iFrame) div.insertBefore(div._iFrame,div.firstChild); //SAM055
if ('static' != this.groupType) {
for (var n = 0; n < this.children.length; n++) {
var child = this.children[n];
if (child.renderContents) {
child.renderContents();
}
else {
child.refreshContents();
}
}
}
else if (update) {
this.updateControlsInGroup();
}
div.style.zIndex = zindex;
div.style.display = 'block';
var page = zenPage.getEnclosingDiv();
var top,left;
if (this._top==null) {
top = (zenGetWindowHeight() - div.offsetHeight) /2;
top += zenGetPageScrollTop();
}
else {
top = this._top;
this._top = null;
}
if (this._left==null) {
left = (page.offsetWidth - div.offsetWidth)/2;
left += zenGetPageScrollLeft();
}
else {
left = this._left;
this._left = null;
}
div.style.top = top + 'px';
div.style.left = left + 'px';
if (this.groupType == 'dialog') this.updateFrameSize();
this._closing = false;
zenInvokeCallbackMethod(this.onshowGroup,this,'onshowGroup','group',this);
this._oldTrapTAB = zenTrapTAB;
zenTrapTAB = true;
if (div._iFrame) {
div._iFrame.style.zIndex= zindex-1;
if (div._iFrame.offsetHeight < div.offsetHeight) {
div._iFrame.style.height = div.offsetHeight + 'px'; //SAM055
div._iFrame.style.top = '-1px';
}
if (div._iFrame.offsetWidth < div.offsetWidth) {
div._iFrame.style.width = div.offsetWidth + 'px';
div._iFrame.style.left = '-1px';
}
}
div.focus();
this._steps = 0;
this._mode = 'show';
for (var n = 0; n < this.children.length; n++) {
var child = this.children[n];
if (child.exposeComponent) {
setTimeout("zenPage.getComponent("+child.index+").exposeComponent();",0);
}
}
if (zenIsHTML5 && window.TransitionEnd) {
div.addEventListener('transitionend', function() { if ((this.style.opacity == 0) && zenPage) { zenPage.endModal(); } });
}
div.style.opacity = 1;
}

self._ZEN_Component_modalGroup_reveal = function() {
var div = this.getFloatingDiv();
this._steps++;
var maxSteps = 8;
if (this._mode == 'show') {
if (this._steps >= maxSteps) {
div.style.display = 'block';
div.style.opacity = 1.0;
}
else {
div.style.display = 'block';
div.style.opacity = this._steps/maxSteps;
this._timerId = self.setTimeout('zenPage.getComponent('+this.index+').reveal()',10);
}
}
else {
if ((this._steps >= maxSteps) || (zenIsIE && !zenIsHTML5)) {
div.style.display = 'none';
zenPage.endModal();
}
else {
div.style.display = 'block';
div.style.opacity = 1 - this._steps/maxSteps;
this._timerId = self.setTimeout('zenPage.getComponent('+this.index+').reveal()',10);
}
}
}

self._ZEN_Component_modalGroup_show = function(title,type,value,top,left,wid,hgt,parms) {
var enc = this.getEnclosingDiv();
this._function = null;
if (enc) {
this.groupType = 'static'
this.groupTitle = (null==title||''==title) ? this.groupTitle : title;
}
else {
this.groupType = type==null ? 'dynamic' : type;
this.value = value==null ? '' : value;
this.groupTitle = title==null ? '' : title;
if (zenPage && ('dynamic' == this.groupType)) {
zenPage.addChild(this);
}
else if ('callback' == this.groupType && 'function' == typeof value) {
this._function = value;
}
}
var scrollTop = zenGetPageScrollTop();
if (top && (top < scrollTop)) top += scrollTop;
this._top = top;
var scrollLeft = zenGetPageScrollLeft();
if (left && (left < scrollLeft)) left += scrollLeft;
this._left = left;
this._width = wid;
this._height = hgt;
this._parms = parms;
if (this.groupType == 'dialog') {
var winWidth = zenGetWindowWidth();
this._dropShadow = 8;
if ((this._width + this._dropShadow) > winWidth) {
this._left = scrollLeft;
this._width = winWidth - this._dropShadow;
}
else if ((this._width + (this._left - scrollLeft) + this._dropShadow) > winWidth) {
this._left = scrollLeft + parseInt((winWidth - this._width - this._dropShadow)/2,10);
}
var winHeight = zenGetWindowHeight();
this._height = this._height - 20;
if ((this._height + this._dropShadow) > winHeight) {
this._top = scrollTop;
this._height = winHeight - this._dropShadow;
}
else if ((this._height + (this._top - scrollTop) + this._dropShadow) > winHeight) {
this._top = scrollTop + parseInt((winHeight - this._height - this._dropShadow)/2,10);
}
if (this._parms) {
if (this._parms.rootWindow) {
this._rootWindow = this._parms.rootWindow;
delete this._parms.rootWindow;
}
this._allowResize = !!this._parms.allowResize;
}
}
if (!self.window.ZLM) zenLoadJS('zenCSLM.js');
zenPage.startModal(this);
}

self._ZEN_Component_modalGroup_startZLMDrag = function(evt) {
this.toggleDragMouseTrap(true);
var dragMouseTrap = this.findElement('dragMouseTrap');
if (!ZLM.getWrapper(dragMouseTrap)) ZLM.registerDragItem(dragMouseTrap,this);
ZLM.drag(dragMouseTrap,evt);
}

self._ZEN_Component_modalGroup_startZLMMove = function(evt) {
if (typeof this._dragData == 'undefined') {
var mainDiv = this.getFloatingDiv();
this._dragData = { "type": "move" };
this._dragData.startTop = parseInt(mainDiv.style.top,10);
this._dragData.maxTop = zenGetWindowHeight() - mainDiv.offsetHeight - this._dropShadow;
if (this._dragData.maxTop < this._dragData.startTop) this._dragData.maxTop = this._dragData.startTop;
this._dragData.startLeft = parseInt(mainDiv.style.left,10);
this._dragData.maxLeft = zenGetWindowWidth() - mainDiv.offsetWidth - this._dropShadow;
if (this._dragData.maxLeft < this._dragData.startLeft) this._dragData.maxLeft = this._dragData.startLeft;
this.startZLMDrag(evt);
}
}

self._ZEN_Component_modalGroup_startZLMResize = function(evt) {
if (typeof this._dragData == 'undefined') {
var mainDiv = this.getFloatingDiv();
var titleDiv = this.findElement('title');
this._dragData = { "type": "resize", "width": null };
this._dragData.maxWidth = zenGetWindowWidth() - parseInt(mainDiv.style.left,10);
this._dragData.maxHeight = zenGetWindowHeight() - parseInt(mainDiv.style.top,10) - (titleDiv ? titleDiv.offsetHeight : 0);
this._dragData.startWidth = parseInt(mainDiv.style.width,10);
this._dragData.startHeight = parseInt(mainDiv.style.height,10);
if (this._dragData.startWidth > this._dragData.maxWidth) this._dragData.maxWidth = this._dragData.startWidth;
if (this._dragData.startHeight > this._dragData.maxHeight) this._dragData.maxHeight = this._dragData.startHeight;
this.startZLMDrag(evt);
}
}

self._ZEN_Component_modalGroup_toggleDragMouseTrap = function(show) {
var trap = this.findElement('dragMouseTrap');
if (trap) {
if (show) {
if (zenIsIE && !zenIsHTML5) {
var mainDiv = this.getFloatingDiv();
trap.style.width = mainDiv.offsetWidth + 'px';
trap.style.height = mainDiv.offsetHeight + 'px';
}
else {
trap.style.width = zenGetWindowWidth() + 'px';
trap.style.height = zenGetWindowHeight() + 'px';
}
trap.className = 'modalGroupDialog dragMouseTrap' + (this._dragData ? ' '+this._dragData.type : '');
}
trap.style.display = (show ? 'block' : 'none');
}
}

self._ZEN_Component_modalGroup_updateFrameSize = function(width,height) {
if (this.groupType != 'dialog') return;
var frame = this.findElement('frame');
var mainDiv = this.getFloatingDiv();
if (frame && mainDiv) {
if (typeof height == 'undefined') height = parseInt(mainDiv.style.height,10);
if (typeof width == 'undefined') width = parseInt(mainDiv.style.width,10);
var titleDiv = this.findElement('title');
if (titleDiv) height -= titleDiv.offsetHeight;
frame.height = height + 'px';
frame.width = width + 'px';
}
}

self._ZEN_Component_modalGroup_updateTitle = function(newTitle) {
if (newTitle == '') {
var titleDiv = this.findElement('title');
if (titleDiv) {
var mainDiv = this.getFloatingDiv();
if (mainDiv) mainDiv.removeChild(titleDiv);
}
}
else if (newTitle != null) {
this.groupTitle = newTitle;
var titleCell = this.findElement('titleText');
if (titleCell) titleCell.innerHTML = this.groupTitle;
}
this.updateFrameSize();
}

self._ZEN_Component_modalGroup_wrapMethod = function(methodName) {
return new Function('evt','return zenPage.getComponent('+this.index+').'+methodName+'(evt);');
}

self._ZEN_Component_modalGroup_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_modalGroup__Loader = function() {
	zenLoadClass('_ZEN_Component_group');
	_ZEN_Component_modalGroup.prototype = zenCreate('_ZEN_Component_group',-1);
	var p = _ZEN_Component_modalGroup.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_modalGroup;
	p.superClass = ('undefined' == typeof _ZEN_Component_group) ? zenMaster._ZEN_Component_group.prototype:_ZEN_Component_group.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.modalGroup';
	p._type = 'modalGroup';
	p.serialize = _ZEN_Component_modalGroup_serialize;
	p.getSettings = _ZEN_Component_modalGroup_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_modalGroup_ReallyRefreshContents;
	p.actionHandler = _ZEN_Component_modalGroup_actionHandler;
	p.constrainDragX = _ZEN_Component_modalGroup_constrainDragX;
	p.constrainDragY = _ZEN_Component_modalGroup_constrainDragY;
	p.endDrag = _ZEN_Component_modalGroup_endDrag;
	p.getFloatingDiv = _ZEN_Component_modalGroup_getFloatingDiv;
	p.getModalBodyContent = _ZEN_Component_modalGroup_getModalBodyContent;
	p.getValue = _ZEN_Component_modalGroup_getValue;
	p.hideGroup = _ZEN_Component_modalGroup_hideGroup;
	p.mousedownHandler = _ZEN_Component_modalGroup_mousedownHandler;
	p.mousemoveHandler = _ZEN_Component_modalGroup_mousemoveHandler;
	p.mouseupHandler = _ZEN_Component_modalGroup_mouseupHandler;
	p.onCanEndModalHandler = _ZEN_Component_modalGroup_onCanEndModalHandler;
	p.onDelete = _ZEN_Component_modalGroup_onDelete;
	p.onDialogFrameLoad = _ZEN_Component_modalGroup_onDialogFrameLoad;
	p.onEndModalHandler = _ZEN_Component_modalGroup_onEndModalHandler;
	p.onRefreshContents = _ZEN_Component_modalGroup_onRefreshContents;
	p.onStartModalHandler = _ZEN_Component_modalGroup_onStartModalHandler;
	p.reveal = _ZEN_Component_modalGroup_reveal;
	p.show = _ZEN_Component_modalGroup_show;
	p.startZLMDrag = _ZEN_Component_modalGroup_startZLMDrag;
	p.startZLMMove = _ZEN_Component_modalGroup_startZLMMove;
	p.startZLMResize = _ZEN_Component_modalGroup_startZLMResize;
	p.toggleDragMouseTrap = _ZEN_Component_modalGroup_toggleDragMouseTrap;
	p.updateFrameSize = _ZEN_Component_modalGroup_updateFrameSize;
	p.updateTitle = _ZEN_Component_modalGroup_updateTitle;
	p.wrapMethod = _ZEN_Component_modalGroup_wrapMethod;
}

self._zenClassIdx['navigator'] = '_ZEN_Component_navigator';
self._ZEN_Component_navigator = function(index,id) {
	if (index>=0) {_ZEN_Component_navigator__init(this,index,id);}
}

self._ZEN_Component_navigator__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_group__init) ?zenMaster._ZEN_Component_group__init(o,index,id):_ZEN_Component_group__init(o,index,id);
	o.backgroundStyle = '';
	o.colorSetCaptions = new Array();
	o.colorSetNames = new Array();
	o.colorSets = new Array();
	o.columnWidth = '320';
	o.currColorSet = 'deepsee';
	o.currLevel = '0';
	o.deleteThisItemMsg = 'Delete this item';
	o.disclosureWidth = '24';
	o.enclosingClass = 'navWrapper';
	o.expanded = true;
	o.footerHeight = '0';
	o.headerHeight = '40';
	o.language = '';
	o.onarrange = '';
	o.onbuttonclick = '';
	o.onchange = '';
	o.onclosebuttonclick = '';
	o.onexpand = '';
	o.ongetcontent = '';
	o.onindent = '';
	o.onpopupaction = '';
	o.onselect = '';
	o.openThisItemMsg = 'Open this item';
	o.showDisclosure = false;
	o.showSliderValue = false;
}
function _ZEN_Component_navigator_serialize(set,s)
{
	var o = this;s[0]='975561603';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.backgroundStyle;s[9]=o.cellAlign;s[10]=o.cellSize;s[11]=o.cellStyle;s[12]=o.cellVAlign;s[13]=set.serializeList(o,o.children,true,'children');s[14]=set.serializeList(o,o.colorSetCaptions,false,'colorSetCaptions');s[15]=set.serializeList(o,o.colorSetNames,false,'colorSetNames');s[16]=set.serializeList(o,o.colorSets,false,'colorSets');s[17]=o.columnWidth;s[18]=o.containerStyle;s[19]=o.currColorSet;s[20]=o.currLevel;s[21]=o.deleteThisItemMsg;s[22]=(o.disabled?1:0);s[23]=o.disclosureWidth;s[24]=(o.dragEnabled?1:0);s[25]=(o.dropEnabled?1:0);s[26]=(o.dynamic?1:0);s[27]=o.enclosingClass;s[28]=o.enclosingStyle;s[29]=o.error;s[30]=(o.expanded?1:0);s[31]=o.footerHeight;s[32]=o.groupClass;s[33]=o.groupStyle;s[34]=o.headerHeight;s[35]=o.height;s[36]=(o.hidden?1:0);s[37]=o.hint;s[38]=o.hintClass;s[39]=o.hintStyle;s[40]=o.label;s[41]=o.labelClass;s[42]=o.labelDisabledClass;s[43]=o.labelPosition;s[44]=o.labelStyle;s[45]=o.language;s[46]=o.layout;s[47]=o.onafterdrag;s[48]=o.onarrange;s[49]=o.onbeforedrag;s[50]=o.onbuttonclick;s[51]=o.onchange;s[52]=o.onclick;s[53]=o.onclosebuttonclick;s[54]=o.ondrag;s[55]=o.ondrop;s[56]=o.onexpand;s[57]=o.ongetcontent;s[58]=o.onhide;s[59]=o.onindent;s[60]=o.onpopupaction;s[61]=o.onrefresh;s[62]=o.onselect;s[63]=o.onshow;s[64]=o.onupdate;s[65]=o.openThisItemMsg;s[66]=o.overlayMode;s[67]=o.renderFlag;s[68]=(o.showDisclosure?1:0);s[69]=(o.showLabel?1:0);s[70]=(o.showSliderValue?1:0);s[71]=o.slice;s[72]=o.title;s[73]=o.tuple;s[74]=o.valign;s[75]=(o.visible?1:0);s[76]=o.width;
}
function _ZEN_Component_navigator_getSettings(s)
{
	s['name'] = 'string';
	s['backgroundStyle'] = 'style';
	s['columnWidth'] = 'integer';
	s['deleteThisItemMsg'] = 'caption';
	s['disclosureWidth'] = 'integer';
	s['expanded'] = 'boolean';
	s['footerHeight'] = 'integer';
	s['headerHeight'] = 'integer';
	s['language'] = 'string';
	s['onarrange'] = 'eventHandler';
	s['onbuttonclick'] = 'eventHandler';
	s['onchange'] = 'eventHandler';
	s['onclosebuttonclick'] = 'eventHandler';
	s['onexpand'] = 'eventHandler';
	s['ongetcontent'] = 'eventHandler';
	s['onindent'] = 'eventHandler';
	s['onpopupaction'] = 'eventHandler';
	s['onselect'] = 'eventHandler';
	s['openThisItemMsg'] = 'caption';
	s['showDisclosure'] = 'boolean';
	s['showSliderValue'] = 'boolean';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_navigator_applyValue = function(value,display,pop) {
pop = zenGet(pop,true);
var parent = this._itemSpecStack[this.currLevel];
if (parent) {
parent.value = value;
}
var parentKey = parent ? zenGet(parent.key) : '';
this.currDisplayValue = display;
zenInvokeCallbackMethod(this.onchange,this,'onchange','value',value,'key',parentKey,'final',pop);
if (pop) {
this.slideOutOf();
}
}

self._ZEN_Component_navigator_beginWait = function() {
this.showOverlay('<img src="images/wait.gif"/>');
}

self._ZEN_Component_navigator_choiceClick = function(evt,multi,index,choiceNo,newValue) {
evt = evt ? evt : window.event;
if (!multi) {
for (var n = 0; n < 99; n++) {
var div = this.findElement('choice_'+this.currLevel+'_'+index+'_'+n);
if (div) {
div.className = 'navChoice';
}
else {
break;
}
}
}
var div = this.findElement('choice_'+this.currLevel+'_'+index+'_'+choiceNo);
if (div) {
if (multi) {
div.className = (div.className=='navChoiceSelected') ? 'navChoice' : 'navChoiceSelected';
var valueList = [];
var item = this.findItemByIndex(index);
if (item) {
valueList = item.valueList.toString().split(',');
}
var vals = [];
for (var n = 0; n < valueList.length; n++) {
var div = this.findElement('choice_'+this.currLevel+'_'+index+'_'+n);
if (div) {
if (div.className=='navChoiceSelected') {
vals[vals.length] = valueList[n];
}
}
else {
break;
}
}
newValue = vals.join(',');
}
else {
div.className = 'navChoiceSelected';
}
}
var item = this.findItemByIndex(index);
if (item) {
var key = zenGet(item.key);
if (item.value != newValue) {
item.value = newValue;
zenInvokeCallbackMethod(this.onchange,this,'onchange','value',item.value,'key',key,'final',true);
}
}
}

self._ZEN_Component_navigator_clearValue = function() {
var parent = this._itemSpecStack[this.currLevel];
if (parent) {
parent.value = '';
this.refreshTopSheet();
}
}

self._ZEN_Component_navigator_clickHandler = function(evt,index,forceDrill) {
evt = evt ? evt : window.event;
if (evt && evt.stopPropagation) {
evt.stopPropagation();
}
var item = this.findItemByIndex(index);
if (item && item.disabled) {
return;
}
this.selectItem(index,zenGet(forceDrill,false));
}

self._ZEN_Component_navigator_closeButtonClickHandler = function(evt,key) {
evt = evt ? evt : window.event;
if (evt && evt.stopPropagation) {
evt.stopPropagation();
}
zenInvokeCallbackMethod(this.onclosebuttonclick,this,'onclosebuttonclick','key',key);
}

self._ZEN_Component_navigator_collectValue = function(value,final) {
var parent = this._itemSpecStack[this.currLevel];
if (parent) {
if (!final) {
var add = true;
var valueArray = [];
valueArray = parent.value.split(',');
for (var i = 0; i < valueArray.length; i++) {
if (valueArray[i] == value) {
add = false;
valueArray.splice(i,1);
parent.value = valueArray.join(',');
break;
}
}
if (add) {
if (parent.value.length > 0) {
parent.value += ',' + value;
}
else {
parent.value += value;
}
}
this.refreshTopSheet();  // WAL083 (4) -- redraw the list after making a selection
}
value = parent.value;
}
if (final) {
this.applyValue(value,'',true);
}
}

self._ZEN_Component_navigator_colorSetChange = function(value) {
var cb = this.findElement('colorSet_'+this.currLevel);
if (cb) {
if (cb.value!=this.currColorSet) {
this.currColorSet = cb.value;
var div = this.findElement('colorTable_'+this.currLevel);
if (div) {
div.innerHTML = this.getColorTableHTML(value);
}
}
}
}

self._ZEN_Component_navigator_convertCSSToText = function(result) {
var css = [];
for (var p in result) {
if (result[p]!=='') {
css[css.length] = p + ':' + result[p] + ';';
}
}
return css.join('');
}

self._ZEN_Component_navigator_customColorChange = function(which) {
var ctrlRed = this.findElement('red');
var ctrlGreen = this.findElement('green');
var ctrlBlue = this.findElement('blue');
var sample = this.findElement('sample');
var red = parseInt(ctrlRed.value,10);
if (ctrlRed.value==='') {
red = 0;
}
else {
red = isNaN(red) ? 0 : red;
red = (red > 255) ? 255 : (red < 0) ? 0 : red;
ctrlRed.value = red;
}
var green = parseInt(ctrlGreen.value,10);
if (ctrlGreen.value==='') {
green = 0;
}
else {
green = isNaN(green) ? 0 : green;
green = (green > 255) ? 255 : (green < 0) ? 0 : green;
ctrlGreen.value = green;
}
var blue = parseInt(ctrlBlue.value,10);
if (ctrlBlue.value==='') {
blue = 0;
}
else {
blue = isNaN(blue) ? 0 : blue;
blue = (blue > 255) ? 255 : (blue < 0) ? 0 : blue;
ctrlBlue.value = blue;
}
var color = 'rgb(' + red + ',' + green + ',' + blue + ')';
sample.style.background = color;
if (which=='color') {
this._customColor = color;
}
else {
this._customBackground = color;
}
}

self._ZEN_Component_navigator_editClick = function(evt,index) {
evt = evt ? evt : window.event;
if (index!=this._editIndex) {
if (evt && evt.stopPropagation) {
evt.stopPropagation();
}
this.startEdit(index);
}
return true;
}

self._ZEN_Component_navigator_editControlApply = function(evt,index) {
evt = evt ? evt : window.event;
if (evt && evt.stopPropagation) {
evt.stopPropagation();
}
this.stopEdit(index,false);
}

self._ZEN_Component_navigator_editControlCancel = function(evt,index) {
evt = evt ? evt : window.event;
if (evt && evt.stopPropagation) {
evt.stopPropagation();
}
this.stopEdit(index,true);
}

self._ZEN_Component_navigator_editKeyPressHandler = function(evt,index) {
evt = evt ? evt : window.event;
var ret = true;
switch(evt.keyCode) {
case zenENTER:
this.stopEdit(index);
break;
}
}

self._ZEN_Component_navigator_editKeyUpHandler = function(evt,index) {
evt = evt ? evt : window.event;
if (this._editMode && this.onchange) {
var item = this.findItemByIndex(index);
if (item) {
var edit = zenGet(item.edit);
var ctrl = this.findElement('control_'+this.currLevel);
if (ctrl) {
var key = zenGet(item.key);
zenInvokeCallbackMethod(this.onchange,this,'onchange','value',ctrl.value,'key',key,'final',false);
}
}
}
return true;
}

self._ZEN_Component_navigator_endWait = function() {
this.hideOverlay();
}

self._ZEN_Component_navigator_expandHandler = function() {
var div = this.getEnclosingDiv();
if (div.removeEventListener) {
div.removeEventListener('webkitTransitionEnd', this._transEvent);
div.removeEventListener('transitionend', this._transEvent);
}
zenInvokeCallbackMethod(this.onexpand,this,'onexpand');
}

self._ZEN_Component_navigator_findItemByIndex = function(index,level) {
level = zenGet(level,this.currLevel);
var item = null;
if (this._dataStack && this._dataStack[level]) {
item = this._dataStack[level][index];
}
return item;
}

self._ZEN_Component_navigator_findTextSize = function(text,cls,style,width,newCaption) {
var newSize = 0;
if (newCaption && text.length > 25) {
text = text.substr(0,25) + '...';
newCaption.caption = text;
}
if (text!='' && text.length > 10) {
var div = this.getEnclosingDiv();
var element = document.createElement('div');
if (cls) {
element.className = cls;
}
if (style) {
element.style.cssText = style;
}
element.appendChild(document.createTextNode(text));
div.appendChild(element);
element.style.position = 'fixed';
if (element.offsetWidth > width) {
var newSize = 24;
while (element.offsetWidth > width && newSize > 8) {
newSize--;
element.style.fontSize = newSize + 'px';
}
}
div.removeChild(element);
}
return newSize;
}

self._ZEN_Component_navigator_getChooserListHTML = function(list,key,value,caption,help) {
var columnWidth = parseInt(this.columnWidth,10);
caption = zenGet(caption);
help = zenGet(help);
var html = [];
if (caption || help) {
html[html.length] = '<div style="font-style:italic;padding:5px;border-bottom:1px solid #808080;background:#FFFFFF;"><b>'
+ zenEscapeXML(caption) +
'</b><br/>' +
zenEscapeXML(help) +
'</div>';
}
html[html.length] = '<div>';
for (var n = 0; n < list.length; n++) {
var info = list[n];
if (info) {
var style = zenGet(info.style);
var ivalue = zenGet(info.value);
var idisabled = info.disabled ? true : false;
var caption = info.caption ? info.caption : ivalue;
var display = info.caption ? info.caption : '';
var help = zenGet(info.help);
if (!help) help = caption;
var hint = zenGet(info.hint)
var cls = (value==ivalue) ? 'navItemSelected' : 'navItem';
if (hint) {
style += 'height:50px;';
}
html[html.length] = '<div class="'+cls+'" title="'+zenEscapeXML(help)+'" style="'+style+';" onclick="zenPage.getComponent('+this.index+').applyValue(\''+zenEscapeJS(ivalue)+'\',\''+zenEscapeJS(display)+'\');" onmouseover="zenPage.getComponent('+this.index+').tryValue(\''+zenEscapeJS(ivalue)+'\','+this.currLevel+');" onmouseout="zenPage.getComponent('+this.index+').tryValue(\''+zenEscapeJS(value)+'\','+this.currLevel+');">';
html[html.length] = '<div class="navItemCaption'+(idisabled?'Disabled':'')+'">';
html[html.length] = zenEscapeXML(caption);
html[html.length] = '</div>';
if (hint && !idisabled) {
var cls = (value==ivalue) ? 'navItemHintSelected' : 'navItemHint';
html[html.length] = '<div class="'+cls+'" style="top:20px;left:5px;height:30px;width:'+(columnWidth-20)+'px;">';
html[html.length] = zenEscapeXML(hint);
html[html.length] = '</div>';
}
html[html.length] = '</div>';
}
}
html[html.length] = '</div>';
return html.join('');
}

self._ZEN_Component_navigator_getColorChooserHTML = function(key,value,mode) {
mode = zenGet(mode,"html");
var defValue = (mode=='svg') ? '' : 'inherit';
html = [];
html[html.length] = '<div style="background:#F0F0F0;padding:1px;position:relative;">';
html[html.length] = '<select class="navColorSet" id="'+this.makeId('colorSet_'+this.currLevel)+'" onchange="zenPage.getComponent('+this.index+').colorSetChange(\''+value+'\');">';
for (var n = 0; n < this.colorSetNames.length; n++) {
var ostyle = n%2 ? '' : 'background:#F8F8F8;';
html[html.length] = '<option style="padding:4px;'+ostyle+'" '+(this.colorSetNames[n]==this.currColorSet?'selected="1"':'')+' value="'+this.colorSetNames[n]+'">' + this.colorSetCaptions[n] + '</option>';
}
html[html.length] = '</select>';
if (mode == 'svg') {
var gradList = ["deep-silver","shade-silver","glow-silver","glow-silverHz","glow-silverDiag","deep-red","shade-red","glow-red","glow-redHz","glow-redDiag","deep-green","shade-green","glow-green","glow-greenHz","glow-greenDiag","deep-blue","shade-blue","glow-blue","glow-blueHz","glow-blueDiag","deep-yellow","shade-yellow","glow-yellow","glow-yellowHz","glow-yellowDiag","deep-purple","shade-purple","glow-purple","glow-purpleHz","glow-purpleDiag","deep-teal","shade-teal","glow-teal","glow-tealHz","glow-tealDiag","deep-orange","shade-orange","glow-orange","glow-orangeHz","glow-orangeDiag"];
html[html.length] = '<select class="navColorSet" id="'+this.makeId('gradList_'+this.currLevel)+'" onchange="zenPage.getComponent('+this.index+').applyValue(this.value);">';
html[html.length] = '<option value=""></option>';
for (var n = 0; n < gradList.length; n++) {
var ostyle = n%2 ? '' : 'background:#F8F8F8;';
html[html.length] = '<option style="padding:4px;'+ostyle+'" '+(('url(#'+gradList[n]+')')==value?'selected="yes"':'')+' value="'+'url(#'+gradList[n]+')'+'">' + gradList[n] + '</option>';
}
html[html.length] = '</select>';
}
html[html.length] = '<image class="navColorBtn" src="deepsee/ds2_x_44.png" style="margin-left:20px;bottom:2px;position:absolute;" onclick="zenPage.getComponent('+this.index+').applyValue(\''+defValue+'\');"/>';
if (zenPage.launchColorChooser) {
html[html.length] = '<image class="navColorBtn" src="deepsee/ds2_magnify_44.png" style="margin-left:45px;bottom:2px;position:absolute;" onclick="zenPage.launchColorChooser();"/>';
}
html[html.length] = '</div>';
html[html.length] = '<div id="'+this.makeId('colorTable_'+this.currLevel)+'" onmouseover="zenPage.getComponent('+this.index+').tryValue(\''+value+'\','+this.currLevel+')">';
html[html.length] = this.getColorTableHTML(mode,value);
html[html.length] = '</div>';
html[html.length] = '</table>';
return html.join('');
}

self._ZEN_Component_navigator_getColorSet = function(mode) {
var index = -1;
if (this.currColorSet!='') {
for (var n = 0; n < this.colorSetNames.length; n++) {
if (this.colorSetNames[n]==this.currColorSet) {
index = n;
break;
}
}
}
if (index < 0) {
var colors = [
[ '#FFFFFF','#000000','#0000F0','#00F000','#F00000','#F000F0','#00F0F0','#F0F000'],
[ '#C0C0C0','#404040','#4040D0','#40D040','#D04040','#D040D0','#40D0D0','#D0D040'],
[ '#D0D0D0','#606060','#6060D0','#60D060','#D06060','#D060D0','#60D0D0','#D0D060'],
[ '#E0E0E0','#808080','#8080FF','#80FF80','#FF8080','#FF80FF','#80F0F0','#FFFF80'],
[ '#F0F0F0','#909090','#B0B0FF','#B0FFB0','#FFB0B0','#FFB0FF','#B0FFFF','#FFFFB0'],
[ '#F4F4F4','#A0A0A0','#D0D0FF','#D0FFD0','#FFD0D0','#FFD0FF','#D0FFFF','#FFFFD0'],
[ '#F8F8F8','#B0B0B0','#F0F0F8','#F0F8F0','#F8F0F0','#FFF0FF','#F0FFFF','#FFFFF0'],
[ '#FFFFFF','#FEFEFE','#F0F0FF','#F0FFF0','#FFF0F0','#FFF8FF','#F8FFFF','#FFFFF8']
];
}
else {
var set = this.colorSets[index];
var t = set.toString().split(';');
var rows = 8;
var cols = 8;
var colors = [];
for (var r = 0; r < rows; r++) {
var list = [];
colors[r] = list;
for (var c = 0; c < cols; c++) {
var x = (c*rows)+r;
list[c] = t[x] ? t[x] : '#FFFFFF';
}
}
}
return colors;
}

self._ZEN_Component_navigator_getColorTableHTML = function(mode,value) {
var html = [];
var stdColors = this.getColorSet(mode);
html[html.length] = '<table class="navColorTable">';
for (var r = 0; r < stdColors.length; r++) {
html[html.length] = '<tr>';
for (var c = 0; c < stdColors[r].length; c++) {
var color = stdColors[r][c];
var bdr = (color=='inherit')?'black':'#D0D0D0';
html[html.length] = '<td title="'+color+'" style="border:1px solid '+bdr+';font-size:1px; width:28px;height:28px;background:'+color+';" onclick="zenPage.getComponent('+this.index+').applyValue(\''+color+'\');" onmouseover="zenPage.getComponent('+this.index+').tryValue(\''+color+'\','+this.currLevel+');(event.stopPropagation?event.stopPropagation():0);" onmouseout="zenPage.getComponent('+this.index+').tryValue(\''+value+'\','+this.currLevel+');">';
html[html.length] = '&#160;';
html[html.length] = '</td>';
}
html[html.length] = '</tr>';
}
html[html.length] = '</table>';
return html.join('');
}

self._ZEN_Component_navigator_getCurrSpec = function() {
return this._itemSpecStack[this.currLevel];
}

self._ZEN_Component_navigator_getFontChooserHTML = function(key,value) {
var list = [
{ caption: 'Default', value:''},
{ value:'Arial', style:'font-family:arial;'},
{ value:'Arial Narrow', style:'font-family:arial narrow;'},
{ value:'Century Schoolbook', style:'font-family:century schoolbook;'},
{ value:'Copperplate', style:'font-family:copperplate;'},
{ value:'Courier New', style:'font-family:courier new;'},
{ value:'Georgia', style:'font-family:georgia;'},
{ value:'Helvetica', style:'font-family:helvetica;'},
{ value:'Impact', style:'font-family:impact;'},
{ value:'Lucida Sans Unicode', style:'font-family:lucida sans unicode;'},
{ value:'Tahoma', style:'font-family:tahoma;'},
{ value:'Times Roman', style:'font-family:times roman;'},
{ value:'Verdana', style:'font-family:verdana;'},
{ value:'Comic Sans MS', style:'font-family:comic sans ms;'}
];
if (!this._userFontsIntialized) {
this._userFontList=this.GetUserFontList();
if (this._userFontList.split) {
this._userFonts = this._userFontList.split(",");
}
this._userFontsIntialized = true;
}
if (this._userFonts) {
var len = this._userFonts.length;
var i =0;
while (i<len && this._userFonts[i].length>0) {
var name = this._userFonts[i];
var o = {};
o.value = name;
o.style = 'font-family:'+name+';';
list.push(o);
i++;
}
}
return this.getChooserListHTML(list,key+'-font-family',value);
}

self._ZEN_Component_navigator_getGhostHTML = function(itemList,orderList,newIndex) {
var html = [];
var wid = this.columnWidth;
for (var n = 0; n < orderList.length; n++) {
var bg = (n==newIndex) ? '#D0D0FF' : '#D0D0D0';
html[html.length] = '<div class="navItem" style="background:'+bg+';width:'+wid+'px;">';
html[html.length] = itemList[orderList[n]].innerHTML;
html[html.length] = '</div>';
}
return html.join('');
}

self._ZEN_Component_navigator_getHTMLForEditor = function(index,item,active,disabled) {
var html = [];
var display = zenGet(item.display,'caption');
var edit = zenGet(item.edit,'string');
var value = zenGet(item.value);
var text = zenGet(item.text,value);
var title = zenGet(item.title);
var style = ''
switch (display) {
case 'caption-value':
case 'caption-value-vt':
case 'image-caption-value-vt':
style = 'font-size:10px;'
break;
default:
style = 'font-size:12px;'
break;
}
switch (edit) {
case 'number':
case 'integer':
case 'string':
default:
var cstyle = '';
var cwidth = 120;
if (edit=='string') {
var cwidth = parseInt(this.columnWidth,10) - 200;
if (active && !disabled) {
cwidth += 40;
}
}
if (!active || disabled) {
var newCaption = {};
var nsz = this.findTextSize(text,"navControlWrap",'font-size:18px;',cwidth+20,newCaption);
if (newCaption.caption) {
text = newCaption.caption;
}
if (nsz) {
cstyle += 'font-size:' + nsz + 'px;';
}
}
html[html.length] = '<div class="navControlWrap" style=width:'+cwidth+'px;'+cstyle+'" onclick="zenPage.getComponent('+this.index+').editClick(event,'+index+');" title="'+zenEscapeXML(title)+'">';
if (active && !disabled) {
html[html.length] = '<input id="'+this.makeId('control_'+this.currLevel)+'" "type="text" class="navControl" style="'+style+'width:'+(cwidth-44)+'px;height:22px;" value="'+zenEscapeXML(value)+'" onkeypress="zenPage.getComponent('+this.index+').editKeyPressHandler(event,'+index+');" onkeyup="return zenPage.getComponent('+this.index+').editKeyUpHandler(event,'+index+');"/>';
html[html.length] = '<image class="navControlBtn" src="deepsee/ds2_check_44.png" style="left:'+(cwidth-40)+'px;" onclick="zenPage.getComponent('+this.index+').editControlApply(event,'+index+');"/>';
html[html.length] = '<image class="navControlBtn" src="deepsee/ds2_x_44.png" style="left:'+(cwidth-20)+'px;" onclick="zenPage.getComponent('+this.index+').editControlCancel(event,'+index+');"/>';
}
else {
html[html.length] = zenEscapeXML(text);
}
html[html.length] = '</div>';
break;
case 'plotbar':
case 'plotbar-value':
var width = (edit=='plotbar-value') ? 100 : 120;
var leftAdj = 0;
var left = 0;
var minValue = parseFloat(zenGet(item.minValue,0));
var maxValue = parseFloat(zenGet(item.maxValue,1));
var range = maxValue - minValue;
var isNull = zenGet(item.value)==='';
var val = parseFloat(zenGet(item.value));
val = isNaN(val) ? 0 : val;
if (range != 0 && !isNaN(range)) {
left = 0 + ((val/range)*(width));
}
if (disabled) {
html[html.length] = zenEscapeHTML(text);
}
else {
html[html.length] = '<div class="navPlotbar" style="width:'+width+'px;">';
if (edit=='plotbar-value') {
var text = zenGet(item.text,val);
html[html.length] = '<div style="position:absolute;left:'+102+'px;">' + zenEscapeXML(text) + '</div>';
}
html[html.length] = '<div class="navPlotbarBox" style="z-index:3;left:'+(leftAdj)+'px;width:'+(width-4)+'px;">&#160;</div>';
html[html.length] = '<div class="navPlotbarValue" style="z-index:3;width:'+(left)+'px;">&#160;</div>';
html[html.length] = '</div>';
}
break;
case 'choice':
case 'choice-multi':
var valueList = zenGet(item.valueList);
var displayList = zenGet(item.displayList);
displayList = displayList=='' ? valueList : displayList;
var isMulti = (edit=='choice-multi');
var vlist = valueList.toString().split(',');
var dlist = displayList.toString().split(',');
var count = vlist.length;
if (item.imageList) {
var imageList = item.imageList.toString().split(',');
for (var xi = 0; xi < count; xi++) {
if (imageList[xi]) {
dlist[xi] = '<image src="'+imageList[xi]+'" style=""/>';
}
}
}
var styleList = zenGet(item.choiceStyles).toString().split('^');
if (isMulti) {
var currValues = {};
var cv = value.toString().split(',');
for (var n = 0; n < cv.length; n++) {
currValues[cv[n]] = true;
}
}
html[html.length] = '<div style="position:relative;height:20px;">';
if (count > 0) {
var wid = (this.columnWidth - 190) / count;
var x = 0;
for (var n = 0; n<count; n++) {
var st = zenGet(item.valueStyle);
if (n==0) {
st += 'border-top-left-radius:5px;border-bottom-left-radius:5px;';
}
if (n==(count-1)) {
st += 'border-top-right-radius:5px;border-bottom-right-radius:5px;';
}
if (styleList[n]) {
st += styleList[n];
}
var cls = 'navChoice';
var test = zenGet(vlist[n]);
if (isMulti) {
if (test&&currValues[test]) {
cls = 'navChoiceSelected';
}
}
else {
if (test==zenGet(item.value)) {
cls = 'navChoiceSelected';
}
}
cls = disabled ? (cls+'Disabled') : cls;
html[html.length] = '<div id="'+this.makeId('choice_'+this.currLevel+'_'+index+'_'+n)+'" class="'+cls+'" style="left:'+x+'px;width:'+wid+'px;border:1px solid #808080;'+st+'" ';
if (!disabled) {
html[html.length] = 'onclick="zenPage.getComponent('+this.index+').choiceClick(event,'+(isMulti?'true':'false')+','+index+','+n+',\''+zenGet(vlist[n])+'\');';
}
html[html.length] = '">'+zenGet(dlist[n])+'</div>';
x += wid;
}
}
html[html.length] = '</div>';
break;
case 'slider':
case 'slider-toggle':
var totalWidth = 130;
var width = totalWidth - 30;
var leftAdj = 0;
var left = 0;
var minValue = parseFloat(zenGet(item.minValue,0));
var maxValue = parseFloat(zenGet(item.maxValue,1));
var range = maxValue - minValue;
if (this.showSliderValue) {
var textWidth = 30;
width = width - textWidth;
item.renderWidth = width;
item.range = range;
var boxRight = 18;
}
var isNull = zenGet(item.value)==='';
var val = parseFloat(zenGet(item.value));
val = isNaN(val) ? 0 : val;
if (range != 0 && !isNaN(range)) {
left = 0 + ((val/range)*(width-20));
}
if (disabled) {
html[html.length] = zenEscapeHTML(text);
}
else {
html[html.length] = '<div class="navSlider" style="width:'+totalWidth+'px;">';
if (edit=='slider-toggle') {
html[html.length] = '<input type="checkbox" id="'+this.makeId('toggle_'+this.currLevel+'_'+index)+'" '+(!isNull?'checked="1"':'')+' style="position:absolute;right:0px;" onclick="zenPage.getComponent('+this.index+').sliderToggleClick(event,'+index+');"/>';
}
if (this.showSliderValue) {
html[html.length] = '<input type="text" value="'+val+'" class="navSliderTxt" id="'+this.makeId('sliderValue_'+this.currLevel+'_'+index)+'" style="position:absolute;right:'+boxRight+'px;" onchange="zenPage.getComponent('+this.index+').sliderValueChange(event,'+index+');"/>';
}
html[html.length] = '<div id="'+this.makeId('track_'+this.currLevel+'_'+index)+'" class="navSliderTrack" style="z-index:3;left:'+(leftAdj)+'px;width:'+(width-4)+'px;">&#160;</div>';
html[html.length] = '<div id="'+this.makeId('trackActive_'+this.currLevel+'_'+index)+'" class="navSliderTrackActive" style="z-index:3;width:'+(left)+'px;">&#160;</div>';
html[html.length] = '<div id="'+this.makeId('thumb_'+this.currLevel+'_'+index)+'" class="navSliderThumb" style="z-index:4;left:'+left+'px;" onmousedown="zenPage.getComponent('+this.index+').sliderMouseDown(event,'+index+');" ontouchstart="zenPage.getComponent('+this.index+').sliderTouchStart(event,'+index+');">'+'&#160;'+'</div>';
html[html.length] = '</div>';
}
break;
case 'stepper':
case 'stepper-value':
var showValue = edit=='stepper-value';
var width = showValue ? 80 : 40;
var left2 = showValue ? 60 : 20;
if (disabled) {
html[html.length] = zenEscapeHTML(text);
}
else {
html[html.length] = '<div class="navStepper" style="position:relative;border:1px solid #808080;width:'+width+'px;height:20px;border-radius:3px;font-size:20px;font-weight:bold;">';
html[html.length] = '<div class="navStepperBtn" style="top:50%;margin-top:-14px;position:absolute;left:0px;width:18px;text-align:center;height:20px;" onmousedown="zenPage.getComponent('+this.index+').stepperMouseDown(\'down\','+index+');" onmouseup="zenPage.getComponent('+this.index+').stepperMouseUp(\'down\','+index+');">'+'-'+'</div>';
if (showValue) {
if (!isNaN(parseFloat(text)) && Math.floor(parseFloat(text))!=parseFloat(text)) {
text = text.toFixed(2);
}
html[html.length] = '<div style="text-align:center;top:50%;margin-top:-8px;position:absolute;left:20px;width:40px;font-size:14px;text-align:center;height:20px;">';
html[html.length] = zenEscapeHTML(text);
html[html.length] = '</div>';
}
html[html.length] = '<div class="navStepperBtn" style="top:50%;margin-top:-12px;position:absolute;left:'+left2+'px;width:18px;text-align:center;height:20px;" onmousedown="zenPage.getComponent('+this.index+').stepperMouseDown(\'up\','+index+');" onmouseup="zenPage.getComponent('+this.index+').stepperMouseUp(\'up\','+index+');">'+'+'+'</div>';
html[html.length] = '</div>';
}
break;
case 'switch':
var flag = text ? true : false;
var bg = flag ? 'rgb(53,107,141)' : 'white';
var color = flag ? '#F0F0F0' : '#404040;';
if (this.language.toString().substr(0,2) == 'en') {
var onText = 'ON';
var offText = 'OFF';
}
else {
var onText = 1;
var offText = 0;
}
if (disabled) {
html[html.length] = flag ? onText : offText;
}
else {
html[html.length] = '<div style="position:relative;border:1px solid #808080;border-radius:10px;width:60px;height:20px;background:'+bg+';font-size:15px;font-weight:bold;color:'+color+';" onclick="zenPage.getComponent('+this.index+').toggleSwitch('+index+');">';
if (flag) {
html[html.length] = '<div style="padding-top:1px;position:absolute;left:0px;width:40px;text-align:center;height:20px;">'+onText+'</div>';
html[html.length] = '<div class="navSwitch" style="position:absolute;left:40px;width:20px;text-align:center;height:20px;border-radius:10px;">'+'&#160;'+'</div>';
}
else {
html[html.length] = '<div class="navSwitch" style="position:absolute;left:0px;width:20px;text-align:center;height:20px;border-radius:10px;">'+'&#160;'+'</div>';
html[html.length] = '<div style="padding-top:1px;position:absolute;left:20px;width:40px;text-align:center;height:20px;">'+offText+'</div>';
}
html[html.length] = '</div>';
}
break;
}
return html.join('');
}

self._ZEN_Component_navigator_getHTMLForItem = function(index,item,active) {
var html = [];
var itemStyle = zenGet(item.style);
var display = zenGet(item.display,'caption');
var selected = zenGet(item.selected,false);
switch (display) {
case 'info':
var cls = 'navInfo';
html[html.length] = '<div id="'+this.makeId('item_'+(this.currLevel)+'_'+index)+'" class="'+cls+'" style="width:'+this.columnWidth+'px;'+itemStyle+'">';
html[html.length] = this.getItemContent(index,item,active);
html[html.length] = '</div>';
break;
case 'section':
var cls = selected ? 'navSectionSelected' : 'navSection';
html[html.length] = '<div id="'+this.makeId('item_'+(this.currLevel)+'_'+index)+'" class="'+cls+'" style="width:'+this.columnWidth+'px;'+itemStyle+'">';
html[html.length] = this.getItemContent(index,item,active);
html[html.length] = '</div>';
break;
default:
var cls = selected ? 'navItemSelected' : 'navItem';
html[html.length] = '<div id="'+this.makeId('item_'+(this.currLevel)+'_'+index)+'" class="'+cls+'" style="width:'+this.columnWidth+'px;'+itemStyle+'" onclick="zenPage.getComponent('+this.index+').clickHandler(event,'+index+');">';
html[html.length] = this.getItemContent(index,item,active);
html[html.length] = '</div>';
break;
}
return html.join('');
}

self._ZEN_Component_navigator_getIconListHTML = function(list,key,value) {
var html = [];
html[html.length] = '<div>';
for (var n = 0; n < list.length; n++) {
var info = list[n];
if (info) {
var style = info.style ? info.style : '';
var ivalue = info.value ? info.value : '';
var idisabled = info.disabled ? info.disabled : false;
var caption = info.caption ? info.caption : ivalue;
var title = info.title ? info.title : caption;
var image = zenGet(info.image) ? info.image : '';
var cls = (value==ivalue) ? 'navIconListSelected' : 'navIconList';
if (idisabled) {
cls = 'navIconListDisabled';
}
html[html.length] = '<div class="'+cls+'" title="'+title+'" style="'+style+';" onclick="zenPage.getComponent('+this.index+').applyValue(\''+ivalue+'\');"  onmouseover="zenPage.getComponent('+this.index+').tryValue(\''+ivalue+'\','+this.currLevel+');" onmouseout="zenPage.getComponent('+this.index+').tryValue(\''+value+'\','+this.currLevel+');">';
if (image) {
html[html.length] = '<image src="'+image+'"/>';
}
html[html.length] = '</div>';
}
}
html[html.length] = '</div>';
return html.join('');
}

self._ZEN_Component_navigator_getItemContent = function(index,item,active) {
var html = [];
var id = this.makeId('control_'+this.currLevel);
var display = zenGet(item.display,'caption');
var key = zenGet(item.key);
var action = zenGet(item.action);
var caption = zenGet(item.caption);
var value = zenGet(item.value);
var text = zenGet(item.text,value);
var edit = zenGet(item.edit);
var help = zenGet(item.help);
var captionStyle = zenGet(item.captionStyle);
var valueStyle = zenGet(item.valueStyle);
var disabled = this.disabled || zenGet(item.disabled,false);
var hasCheck = ('undefined' != typeof item.checked && item.checked);
var hasClose = ('undefined' != typeof item.closeButton && item.closeButton);
var hasDrag = ('undefined' != typeof item.canDrag && item.canDrag);
var indent = parseInt(zenGet(item.indent,0),10);
var indentWidth = 20;
var tooltip = help ? ('title="'+help+'" ') : '';
var width = parseInt(this.columnWidth,10);
var itemWidth = 280 - (indent*indentWidth);		// only one value to show
var item1Width = 120 - (indent*indentWidth);		// left
var item2Width = width - (item1Width + 60);		// right
var chwid = hasCheck ? 16 : 0;
if (hasCheck) {
var checked = zenGet(item.checked,false);
caption = (checked ? '&#8226;':'&#160;')+caption;
}
var style = '';
if(!zenPage.getComponent(this.index).widgets){
zenPage.getComponent(this.index).widgets = {};
}
switch(display) {
case 'value':
style = 'top: 5px;width:'+itemWidth+'px;';
style += valueStyle;
style += (edit!='') ? 'color:#404080;' : '';
var captionText = text==='' ? '&#160;' : zenEscapeXML(text);
html[html.length] = '<div class="navItemCaption'+(disabled?'Disabled':'')+'" style="'+style+'" title="'+captionText+'">';
if (edit!='') {
html[html.length] = this.getHTMLForEditor(index,item,active,disabled);
}
else {
html[html.length] = captionText;
}
html[html.length] = '</div>';
break;
case 'info':
style = 'top: 0px; font-size:18px;left:40px;';
style += captionStyle;
html[html.length] = '<div '+tooltip+' class="navItemInfoCaption" style="'+style+'">';
html[html.length] = caption;
html[html.length] = '</div>';
html[html.length] = '<div class="navItemImage" style="'+istyle+'">';
var src = zenGet(item.image,'deepsee/ds2_info_44.png');
if (src && src!=='') {
html[html.length] = '<image src="'+src+'" style="width:24px;height:24px;opacity:0.5;"/>';
}
html[html.length] = '</div>';
style = 'top: 22px; font-weight:normal;left:40px;';
style += valueStyle;
html[html.length] = '<div class="navItemInfoValue" style="'+style+'">';
html[html.length] = text==='' ? '&#160;' : zenEscapeXML(text);
html[html.length] = '</div>';
break;
case 'html':
html[html.length] = zenGet(item.content);
break;
case 'section':
style = 'top: 8px;width:'+itemWidth+'px;';
style += captionStyle;
html[html.length] = '<div class="navSectionCaption'+(disabled?'Disabled':'')+'" style="'+style+'">';
html[html.length] = caption;
html[html.length] = '</div>';
break;
case 'value-cells':
var cellsPerRow = parseInt(zenGet(item.cellsPerRow,3),10);
cellsPerRow = (isNaN(cellsPerRow)||cellsPerRow<=0) ? 1 : cellsPerRow;
var cellCount = (item.cells&&item.cells.length) ? item.cells.length : 0;
if (cellCount) {
var cellNo = 0;
var rows = Math.floor(cellCount/cellsPerRow);
var style = '';
var cwid = this.columnWidth / cellsPerRow;
html[html.length] = '<table border="0" cellpadding="0" cellspacing="0">';
for (var r = 0; r < rows; r++) {
html[html.length] = '<tr>';
for (var c = 0; c < cellsPerRow; c++) {
var cell = item.cells[cellNo+c];
if (cell) {
html[html.length] = '<td style="width:'+cwid+'px;text-align:center;font-size:36px;color:#606060;font-weight:bold;">';
html[html.length] = zenGet(cell.value);
html[html.length] = '</td>';
}
}
html[html.length] = '</tr>';
html[html.length] = '<tr>';
for (var c = 0; c < cellsPerRow; c++) {
var cell = item.cells[cellNo+c];
if (cell) {
html[html.length] = '<td style="width:'+cwid+'px;vertical-align:top;text-align:center;padding-bottom:10px;">';
html[html.length] = zenGet(cell.caption);
html[html.length] = '</td>';
}
}
html[html.length] = '</tr>';
cellNo += cellsPerRow;
}
html[html.length] = '</table>';
}
break;
case 'caption':
default:
style = 'top: 5px;width:'+itemWidth+'px;';
if (hasDrag) {
style += 'left:'+((indent+1)*indentWidth)+'px;';
}
style += captionStyle;
html[html.length] = '<div class="navItemCaption'+(disabled?'Disabled':'')+'" style="'+style+'" title="'+caption+'">';
html[html.length] = caption;
html[html.length] = '</div>';
break;
case 'caption-value':
case 'caption-value-vt':
style = 'top: 0px; font-size:18px;';
if (hasDrag) {
style += 'left:'+((indent+1)*indentWidth)+'px;';
}
style += captionStyle;
if (tooltip==='') tooltip = 'title="'+caption+'" ';
html[html.length] = '<div '+tooltip+' class="navItemCaption'+(disabled?'Disabled':'')+'" style="'+style+'">';
html[html.length] = caption;
html[html.length] = '</div>';
style = 'top: 22px; font-weight:normal;';
style += valueStyle;
style += (edit!='') ? 'color:#404080;' : '';
html[html.length] = '<div class="navItemValue" style="'+style+'">';
if (edit!='') {
html[html.length] = this.getHTMLForEditor(index,item,active,disabled);
}
else {
html[html.length] = text==='' ? '&#160;' : zenEscapeXML(text);
}
html[html.length] = '</div>';
break;
case 'caption-value-hz':
var newCaption = {};
if (caption && tooltip=='') tooltip = 'title="'+caption+'" ';
var nsz = this.findTextSize(caption,"navItemCaption",captionStyle,item1Width,newCaption);
if (newCaption.caption) {
caption = newCaption.caption;
}
style = 'top:5px;width:'+item1Width+'px;';
if (hasDrag) {
style += 'left:'+((indent+1)*indentWidth)+'px;';
}
style += captionStyle;
if (nsz) {
style += 'font-size:' + nsz + 'px;';
}
html[html.length] = '<div '+tooltip+' class="navItemCaption'+(disabled?'Disabled':'')+'" style="'+style+'">';
html[html.length] = caption;
html[html.length] = '</div>';
style = 'top:5px;left:140px;font-weight:normal;width:'+item2Width+'px;';
style += (edit!='') ? 'color:#404080;' : '';
style += valueStyle;
if (edit==''||disabled) {
var newCaption = {};
var nsz = this.findTextSize(text,"navItemValueHz",valueStyle,item2Width-((hasClose&&!disabled)?14:0));
if (newCaption.caption) {
text = newCaption.caption;
}
if (nsz) {
style += 'font-size:' + nsz + 'px;';
}
}
if (edit=='string') {
style += 'width:'+(item2Width+40)+'px;';
}
html[html.length] = '<div class="navItemValueHz" style="'+style+'">';
if (edit!='') {
html[html.length] = this.getHTMLForEditor(index,item,active,disabled);
}
else {
html[html.length] = text==='' ? '&#160;' : zenEscapeXML(text);
}
html[html.length] = '</div>';
break;
case 'image-caption':
case 'image-caption-hz':
var newCaption = {};
if (caption && tooltip=='') tooltip = 'title="'+caption+'" ';
var nsz = this.findTextSize(caption,"navItemCaption",captionStyle,(itemWidth-55-(hasDrag?30:0)),newCaption);
if (newCaption.caption) {
caption = newCaption.caption;
}
var istyle = '';
if (hasDrag) {
istyle += 'left:'+(10+((indent+1)*indentWidth))+'px;';
}
html[html.length] = '<div class="navItemImage" style="'+istyle+'">';
var src = zenGet(item.image,'portal/lamp_48.gif');
if (src && src!=='') {
src = ('none'==src)?'':src;
html[html.length] = '<image src="'+src+'" style="width:36px;'+zenGet(item.imageStyle)+'"/>';
}
html[html.length] = '</div>';
style = 'top: 5px;';
if (hasDrag) {
style += 'left:'+(50+((indent+1)*indentWidth))+'px;';
}
else {
style += 'left:40px;';
}
style += captionStyle;
if (nsz) {
style += 'font-size:' + nsz + 'px;';
}
html[html.length] = '<div '+tooltip+'class="navItemCaption'+(disabled?'Disabled':'')+'" style="'+style+'">';
html[html.length] = caption;
html[html.length] = '</div>';
break;
case 'image-caption-value':
case 'image-caption-value-vt':
html[html.length] = '<div class="navItemImage">';
var src = zenGet(item.image,'portal/lamp_48.gif');
if (src && src!=='') {
src = ('none'==src)?'':src;
html[html.length] = '<image src="'+src+'" style="width:36px;"/>';
}
html[html.length] = '</div>';
style = 'top: 0px; left:40px;font-size:18px;';
style += captionStyle;
html[html.length] = '<div class="navItemCaption'+(disabled?'Disabled':'')+'" style="'+style+'" title="'+caption+'">';
html[html.length] = caption;
html[html.length] = '</div>';
style = 'top: 22px; left:40px;font-weight:normal;';
style += valueStyle;
html[html.length] = '<div class="navItemValue" style="'+style+'">';
html[html.length] = text;
html[html.length] = '</div>';
break;
case 'image-caption-value-hz':
html[html.length] = '<div class="navItemImage">';
var src = zenGet(item.image,'portal/lamp_48.gif');
if (src && src!=='') {
src = ('none'==src)?'':src;
html[html.length] = '<image src="'+src+'" style="width:36px;"/>';
}
html[html.length] = '</div>';
style = 'top:5px;left:40px;width:90px;font-size:18px;';
style += captionStyle;
html[html.length] = '<div class="navItemCaption'+(disabled?'Disabled':'')+'" style="'+style+'" title="'+caption+'">';
html[html.length] = caption;
html[html.length] = '</div>';
style = 'top:5px;left:160px;font-weight:normal;font-size:18px;width:100px;';
style += valueStyle;
html[html.length] = '<div class="navItemValueHz" style="'+style+'">';
html[html.length] = text;
html[html.length] = '</div>';
break;
}
if (hasDrag && !disabled) {
var hlp = $$$Text('Move this item to a new position');
html[html.length] = '<div class="navItemDragHandle" title="'+hlp+'" onmousedown="return zenPage.getComponent('+this.index+').itemDragHandleMouseDown(event,'+this.currLevel+','+index+',\''+key+'\');">';
var src = 'images/navthumb.png';
var left = indent * indentWidth;
html[html.length] = '<image style="left:'+left+'px;position:absolute;" src="'+src+'"/>';
html[html.length] = '</div>';
}
if (hasClose && !disabled) {
html[html.length] = '<div class="navItemCloseBtn" onclick="zenPage.getComponent('+this.index+').closeButtonClickHandler(event,\''+key+'\');" title="'+this.deleteThisItemMsg+'">';
var src = 'deepsee/delete_widget.png';
html[html.length] = '<image src="'+src+'" style="width:18px;"/>';
html[html.length] = '</div>';
}
if (action=='drill' && !disabled && !active) {
html[html.length] = '<div class="navItemDrillDown" onclick="zenPage.getComponent('+this.index+').clickHandler(event,'+index+',true);">';
var src = 'images/black_right_arrow.png';
html[html.length] = '<image src="'+src+'" style="width:16px;"/>';
html[html.length] = '</div>';
}
else if(action=='openButton'){
var widget = zenGet(item.widget);
var wid = widget.id;
zenPage.getComponent(this.index).widgets[wid] = widget;
var src = 'deepsee/open_widget.png'
html[html.length] = '<div class="navItemOpenBtn" onclick="zenPage.getComponent('+this.index+').widgets[\''+wid+'\'].openWidget();" title="'+this.openThisItemMsg+'">';
html[html.length] = '<image src="'+src+'" style="width:18px;"/>';
html[html.length] = '</div>';
}
else if (action=='popup' && !disabled && !active) {
var url = zenGet(item.url);
if (url) {
html[html.length] = '<div class="navItemPopup" onclick="zenPage.getComponent('+this.index+').popupButtonClickHandler(event,\''+key+'\',\''+url+'\');">';
var src = 'deepsee/ds2_magnify_44.png';
html[html.length] = '<image src="'+src+'" style="width:16px;"/>';
html[html.length] = '</div>';
}
}
return html.join('');
}

self._ZEN_Component_navigator_getItemDiv = function(level,index) {
return this.findElement('item_' + level + '_' + index);
}

self._ZEN_Component_navigator_getLevelContent = function(level,itemSpec) {
var key = itemSpec ? zenGet(itemSpec.key) : '';
var div = this.getEnclosingDiv();
var bodyHeight = div.offsetHeight;
var content = null;
if (this.ongetcontent!='') {
var value = itemSpec ? zenGet(itemSpec.value) : '';
var content = zenInvokeCallbackMethod(this.ongetcontent,this,'ongetcontent','level',level,'key',key,'value',value);
}
if (!this._title) {
this._title = [];
}
this._title[this.currLevel] = (content && content.title) ? content.title : '';
if (!this._headerButtons) {
this._headerButtons = [];
}
this._headerButtons[this.currLevel] = (content && content.headerButtons) ? content.headerButtons : null;
if (!this._footerButtons) {
this._footerButtons = [];
}
this._footerButtons[this.currLevel] = (content && content.footerButtons) ? content.footerButtons : null;
var cwid = parseInt(this.columnWidth,10) - 12;
cwid = cwid > 0 ? cwid : 1;
var chgt = bodyHeight-parseInt(this.headerHeight,10)-parseInt(this.footerHeight,10)-20;
chgt = chgt > 0 ? chgt : 1;
var html = [];
if (content) {
if (content.url) {
html[html.length] = '<iframe id="'+this.makeId('iframe_'+level)+'" onload="zenPage.getComponent('+this.index+').revealFrame(this);" class="navFrame" style="width:'+(cwid)+'px;height:'+(chgt)+'px;" src="'+content.url+'"/>';
this.beginWait();
}
else if (content.html) {
html[html.length] = content.html;
}
else if (content.childIndex !== null && this._stash && this._stash.length && this._stash[content.childIndex]) {
html[html.length] = this._stash[content.childIndex].innerHTML;
}
else if (content.items && content.items.length) {
this._contentList = content.items;
for (var n = 0; n < content.items.length; n++) {
var item = content.items[n];
html[html.length] = this.getHTMLForItem(n,item,false);
}
}
}
if (html.length==0) {
}
return html.join('');
}

self._ZEN_Component_navigator_getMasterContent = function(showExtra) {
var div = this.getEnclosingDiv();
if (!div) return;
var columnWidth = parseInt(this.columnWidth,10);
var bodyHeight = div.offsetHeight;
var chgt = bodyHeight-parseInt(this.headerHeight,10)-parseInt(this.footerHeight,10)-20;
chgt = chgt > 0 ? chgt : 1;
var html = [];
var extra = showExtra ? 1 : 0;
if (null!=this._stack) {
var left = 0;
for (var n = 0; n <= this.currLevel + extra; n++) {
html[html.length] = '<div id="'+this.makeId('panel_'+n)+'" class="navPanel" style="left:'+left+'px;width:'+columnWidth+'px;height:'+bodyHeight+'px;">';
if (parseInt(this.headerHeight,10)>0) {
html[html.length] = this.getNavHeaderHTML(n);
}
html[html.length] = '<div id="'+this.makeId('body_'+n)+'" class="navBody" style="height:'+(chgt)+'px;">';
html[html.length] = this._stack[n] ? this._stack[n] : '';
html[html.length] = '</div>';
if (parseInt(this.footerHeight,10)>0) {
html[html.length] = this.getNavFooterHTML(n);
}
html[html.length] = '</div>';
left += columnWidth;
}
}
return html.join('');
}

self._ZEN_Component_navigator_getMultiSelectIconListHTML = function(list,key,value) {
if (value) {
var valueArray = [];
var isSelectedArray = [];
valueArray = value.split(',');
for (var i = 0; i < valueArray.length; i++) {
isSelectedArray[valueArray[i]] = 'selected';
}
}
var html = [];
html[html.length] = '<div class="navItem" onclick="zenPage.getComponent('+this.index+').collectValue(\'\',true,\'\');"><div class="navItemCaption">Apply Selection</div></div>'
html[html.length] = '<div class="navItem" onclick="zenPage.getComponent('+this.index+').clearValue();"><div class="navItemCaption">Clear Selection</div></div>'
html[html.length] = '<div>';
for (var n = 0; n < list.length; n++) {
var info = list[n];
if (info) {
var style = info.style ? info.style : '';
var ivalue = info.value ? info.value : '';
var idisabled = info.disabled ? info.disabled : false;
var caption = info.caption ? info.caption : ivalue;
var title = info.title ? info.title : caption;
var image = zenGet(info.image) ? info.image : '';
var cls = (value==ivalue) ? 'navIconListSelected' : 'navIconList';
if (idisabled) {
cls = 'navIconListDisabled';
}
var isSelected = (value && isSelectedArray[ivalue]=='selected') ? 1 : 0;
var cls = isSelected ? 'navIconListSelected navMultiSelectIconListSelected' : 'navIconList';
html[html.length] = '<div class="'+cls+'" title="'+title+'" style="'+style+';" onclick="zenPage.getComponent('+this.index+').collectValue(\''+ivalue+'\',false);">';
if (image) {
html[html.length] = '<image src="'+image+'"/>';
}
html[html.length] = '</div>';
}
}
html[html.length] = '</div>';
return html.join('');
}

self._ZEN_Component_navigator_getNavFooterHTML = function(level) {
var html = [];
var footerButtons = this._footerButtons && this._footerButtons[this.currLevel] ? this._footerButtons[this.currLevel] : '';
html[html.length] = '<div class="navFooter" style="height:'+this.footerHeight+'px;">';
var h = parseInt(this.footerHeight,10);
if (footerButtons && footerButtons.length) {
var enc = this.getEnclosingDiv();
var width = enc.offsetWidth;
var bx = 15;
for (var b = 0; b < footerButtons.length; b++) {
var bInfo = footerButtons[b];
if (bInfo) {
var bKey = zenGet(bInfo.key);
var bImage = zenGet(bInfo.image);
var bCaption = zenGet(bInfo.caption);
html[html.length] = '<div title="'+bCaption+'" style="position:absolute;top:'+(h/2-6)+'px;left:'+(bx)+'px;">';
html[html.length] = '<image class="navHeaderIcon" src="'+bImage+'" onclick="zenPage.getComponent('+this.index+').headerButtonClickHandler(\''+bKey+'\','+level+');"/>';
html[html.length] = '</div>';
bx += 25;
}
}
}
html[html.length] = '</div>';
return html.join('');
}

self._ZEN_Component_navigator_getNavHeaderHTML = function(level) {
var html = [];
var backText = '';
if (level>0) {
if (this.language.toString().substr(0,2) == 'en') {
var backText = 'Back';
}
else {
var backText = '&#160;&#160;&#9664;&#160;&#160;';
}
}
var titleText = this._title && this._title[this.currLevel] ? this._title[this.currLevel] : '';
var headerButtons = this._headerButtons && this._headerButtons[this.currLevel] ? this._headerButtons[this.currLevel] : '';
html[html.length] = '<div class="navHeader" style="height:'+this.headerHeight+'px;">';
var h = parseInt(this.headerHeight,10);
var arrowWid = 80;
var arrowHgt = h * 0.8;
arrowHgt = arrowHgt > 24 ? 24 : arrowHgt;
if (backText != '') {
if (zenIsIE) {
html[html.length] = '<div class="nav-arrow-left-ie" onclick="zenPage.getComponent('+this.index+').slideOutOf();">'+backText+'</div>';
}
else {
html[html.length] = '<div class="nav-arrow-left" onclick="zenPage.getComponent('+this.index+').slideOutOf();" title="'+backText+'"></div>';
}
}
if (titleText != '') {
var newCaption = {};
var twid = parseInt(this.columnWidth,10) - 120;
var tooltip = 'title="'+titleText+'" ';
var nsz = this.findTextSize(titleText,"navTitle",'font-size:18px;',(twid),newCaption);
if (newCaption.caption) {
titleText = newCaption.caption;
}
var style = 'width:'+twid+'px;';
if (nsz) {
style = 'font-size:' + nsz + 'px;';
}
html[html.length] = '<div style="position:absolute;top:'+(h/4)+'px;left:'+(arrowWid+10)+'px;">';
html[html.length] = '<div '+tooltip+' class="navTitle" style="'+style+'">' + zenEscapeXML(titleText) + '</div>';
html[html.length] = '</div>';
}
if (headerButtons && headerButtons.length) {
var enc = this.getEnclosingDiv();
var width = enc.offsetWidth;
var bx = 0;
for (var b = headerButtons.length-1; b>=0; b--) {
var bInfo = headerButtons[b];
if (bInfo) {
var bKey = zenGet(bInfo.key);
var bImage = zenGet(bInfo.image);
var bCaption = zenGet(bInfo.caption);
html[html.length] = '<div title="'+bCaption+'" style="position:absolute;top:'+(h/2-6)+'px;left:'+(width-50-bx)+'px;">';
html[html.length] = '<image class="navHeaderIcon" src="'+bImage+'" onclick="zenPage.getComponent('+this.index+').headerButtonClickHandler(\''+bKey+'\','+level+');"/>';
html[html.length] = '</div>';
bx += 25;
}
}
}
html[html.length] = '</div>';
return html.join('');
}

self._ZEN_Component_navigator_getParentSpec = function() {
return this.currLevel>0 ? this._itemSpecStack[this.currLevel-1]:null;
}

self._ZEN_Component_navigator_getWidth = function() {
if (this.hidden) {
return 0;
}
var discWidth = this.showDisclosure?parseInt(this.disclosureWidth,10):0;
var columnWidth = this.expanded ?  parseInt(this.columnWidth,10) : 0;
return discWidth + columnWidth + (this.expanded?2:0);
}

self._ZEN_Component_navigator_giveFocusToControl = function() {
var ctrl = this.findElement('control_'+this.currLevel);
if (ctrl) {
ctrl.select();
ctrl.focus();
}
}

self._ZEN_Component_navigator_headerButtonClickHandler = function(key,level) {
zenInvokeCallbackMethod(this.onbuttonclick,this,'onbuttonclick','key',key,'level',level);
}

self._ZEN_Component_navigator_hideMessage = function() {
this.hideOverlay();
}

self._ZEN_Component_navigator_hideOverlay = function() {
var overlay = this.findElement('overlay');
if (overlay) {
overlay.innerHTML = '';
overlay.style.opacity = 0.0;
overlay.style.visibility = 'hidden';
}
}

self._ZEN_Component_navigator_itemDragHandleMouseDown = function(evt,level,index,key) {
evt = evt ? evt : window.event;
if (evt && evt.stopPropagation) {
evt.stopPropagation();
}
evt.cancelBubble = true;
evt.returnValue = false;
if (document.onmousemove != this.itemDragMouseMove) {
this._oldMouseMove = document.onmousemove;
document.onmousemove = this.itemDragMouseMove;
}
if (document.onmouseup != this.itemDragMouseUp) {
this._oldMouseUp = document.onmouseup;
document.onmouseup = this.itemDragMouseUp;
}
zenPage._dragState = {};
var dragState = zenPage._dragState;
dragState.componentIndex = this.index;
dragState.itemLevel = level;
dragState.itemIndex = index;
dragState.itemNewIndex = index;
dragState.itemKey = key;
dragState.operation = null;
dragState.moveCount = 0;
var item = this.findItemByIndex(index);
dragState.itemIndent = zenGet(item.indent);
dragState.itemNewIndent = dragState.itemIndent;
if (dragState.itemIndent==='') {
dragState.firstIndex = 0;
dragState.lastIndex = 100000;
dragState.moveMap = null;
}
else {
dragState.firstIndex = index;
for (var j = index; j >=0; j--) {
var test = this.findItemByIndex(j);
if (!test || dragState.itemIndent > zenGet(test.indent,-1)) {
break;
}
dragState.firstIndex = j;
}
dragState.lastIndex = index;
for (var j = index;; j++) {
var test = this.findItemByIndex(j);
if (!test || dragState.itemIndent > zenGet(test.indent,-1)) {
break;
}
dragState.lastIndex = j;
}
dragState.moveMap = {};
var jcount = 0;
for (var j = dragState.firstIndex; j<=dragState.lastIndex; j++) {
var test = this.findItemByIndex(j);
if (test && dragState.itemIndent == zenGet(test.indent,-1)) {
dragState.moveMap[j] = jcount++;
}
}
}
var itemId = 'item_'+level+'_'+index;
var div = this.findElement(itemId);
dragState.itemHeight = div.offsetHeight;
var ghostDiv = document.createElement('div');
div.parentNode.appendChild(ghostDiv);
dragState.ghostDiv = ghostDiv;
ghostDiv.style.position = 'absolute';
ghostDiv.style.zIndex = 9;
ghostDiv.style.top = '0px';
var dragDiv = document.createElement('div');
dragDiv.className = div.className;
dragDiv.style.cssText = div.style.cssText;
dragDiv.style.position = 'absolute';
dragDiv.style.zIndex = 10;
dragDiv.innerHTML = div.innerHTML;
div.parentNode.appendChild(dragDiv);
dragState.dragDiv = dragDiv;
dragDiv.style.opacity = 0.33;
dragState.parentOffsetTop = div.parentNode.offsetTop;
dragState.parentOffsetLeft = div.parentNode.offsetLeft;
dragState.itemHeight = div.offsetHeight;
var my = evt.clientY - dragState.parentOffsetTop;
var mx = evt.clientX - dragState.parentOffsetLeft;
dragState.startY = my;
dragState.startX = mx;
dragDiv.style.top = my - (dragState.itemHeight/2) + 'px';
var list = [];
var orderList = [];
for (var n = 0;;n++) {
var itemId = 'item_'+level+'_'+n;
var div = this.findElement(itemId);
if (div) {
list[n] = div;
orderList[n] = n;
}
else {
break;
}
}
dragState.itemList = list;
dragState.orderList = orderList;
dragState.ghostDiv.innerHTML = this.getGhostHTML(dragState.itemList,dragState.orderList,index);
return false;
}

self._ZEN_Component_navigator_itemDragMouseMove = function(evt) {
evt = evt ? evt : window.event;
evt.cancelBubble = true;
evt.returnValue = false;
var dragState = zenPage._dragState;
var nav = (!dragState||dragState.componentIndex===null)?null:zenPage.getComponent(dragState.componentIndex);
if (nav) {
var my = evt.clientY - dragState.parentOffsetTop;
var mx = evt.clientX - dragState.parentOffsetLeft - dragState.startX;
var dragDiv = dragState.dragDiv;
var list = dragState.itemList;
if (!list||!list.length) {
return;
}
var newIndex = Math.floor(my / dragState.itemHeight);
newIndex = (newIndex<0) ? 0 : newIndex;
newIndex = (newIndex>=list.length) ? list.length-1 : newIndex;
var dragIndent = Math.floor(mx / 30);
var newIcon = '';
if (!dragState.operation) {
if (newIndex!=dragState.itemIndex) {
dragState.operation = 'move';
}
else if (dragState.itemIndent!=='' && (Math.abs(mx)>10)) {
dragState.operation = 'indent';
}
}
switch (dragState.operation) {
case 'move':
newIcon = (newIndex>dragState.itemIndex)?'deepsee/ds2_arrow_south_44.png':'deepsee/ds2_arrow_north_44.png';
dragDiv.style.top = my - (dragState.itemHeight/2) + 'px';
var newIndex = Math.round(my / dragState.itemHeight);
newIndex = (newIndex<0) ? 0 : newIndex;
newIndex = (newIndex>=list.length) ? list.length-1 : newIndex;
newIndex = (newIndex>=dragState.firstIndex) ? newIndex : dragState.firstIndex;
newIndex = (newIndex<=dragState.lastIndex) ? newIndex : dragState.lastIndex;
var testItem = nav.findItemByIndex(newIndex);
var testIndent = zenGet(testItem.indent,0);
if ((dragState.itemNewIndex!=newIndex)&&(dragState.itemIndent==testIndent)) {
dragState.itemNewIndex = newIndex;
dragState.moveCount++;
var orderList = [];
for (var n = 0;n < list.length;n++) {
orderList[orderList.length] = n;
}
orderList.splice(dragState.itemIndex,1);
orderList.splice(newIndex,0,dragState.itemIndex);
dragState.ghostDiv.innerHTML = nav.getGhostHTML(dragState.itemList,orderList,newIndex);
var oldPos = dragState.moveMap ? dragState.moveMap[dragState.itemIndex] : dragState.itemIndex;
var newPos = dragState.moveMap ? dragState.moveMap[dragState.itemNewIndex] : dragState.itemNewIndex;
zenInvokeCallbackMethod(nav.onarrange,nav,'onarrange','swap',
{index:dragState.itemIndex, oldPosition:oldPos, newPosition:newPos},
'key',dragState.itemKey,'final',false);
}
break;
case 'indent':
var indent = dragState.itemIndent;
newIcon = (dragIndent < indent) ? 'deepsee/ds2_arrow_west_44.png' : 'deepsee/ds2_arrow_east_44.png';
if (dragIndent < indent) {
indent = indent <=1 ? 0 : indent-1;
}
else if (dragIndent > indent) {
indent = indent+1;
}
var currItem = nav.findItemByIndex(dragState.itemIndex);
if (indent != zenGet(currItem.indent)) {
var oldPos = dragState.moveMap ? dragState.moveMap[dragState.itemIndex] : dragState.itemIndex;
var newPos = dragState.moveMap ? dragState.moveMap[dragState.itemNewIndex] : dragState.itemNewIndex;
zenInvokeCallbackMethod(nav.onindent,nav,'onindent','swap',
{index:dragState.itemIndex, oldIndent:currItem.indent, newIndent:indent},
'key',dragState.itemKey,'final',false);
}
break;
}
if (newIcon) {
if (dragDiv.childNodes && dragDiv.childNodes.length) {
for (var n = 0; n < dragDiv.childNodes.length; n++) {
if (dragDiv.childNodes[n].className=='navItemDragHandle') {
var src = newIcon;
var left = dragState.itemIndent * 24;
dragDiv.childNodes[n].style.opacity = 1.0;
dragDiv.childNodes[n].innerHTML = '<image style="opacity:1.0;height:24px;left:'+left+'px;position:absolute;" src="'+src+'"/>';
}
}
}
}
}
}

self._ZEN_Component_navigator_itemDragMouseUp = function(evt) {
evt = evt ? evt : window.event;
var dragState = zenPage._dragState;
var nav = (!dragState||dragState.componentIndex===null)?null:zenPage.getComponent(dragState.componentIndex);
if (dragState && dragState.operation) {
switch(dragState.operation) {
case 'move':
if (dragState.moveCount) {
var oldPos = dragState.moveMap ? dragState.moveMap[dragState.itemIndex] : dragState.itemIndex;
var newPos = dragState.moveMap ? dragState.moveMap[dragState.itemNewIndex] : dragState.itemNewIndex;
if (oldPos < newPos) {
for (var pos=oldPos ; pos<newPos ; pos++) {
zenInvokeCallbackMethod(nav.onarrange,nav,'onarrange','swap',
{index:dragState.itemIndex, oldPosition:pos, newPosition:pos+1},
'key',dragState.itemKey,'final',true);
}
}
else if (newPos < oldPos) {
for (var pos=oldPos ; pos>newPos ; pos--) {
zenInvokeCallbackMethod(nav.onarrange,nav,'onarrange','swap',
{index:dragState.itemIndex, oldPosition:pos, newPosition:pos-1},
'key',dragState.itemKey,'final',true);
}
}
}
break;
case 'indent':
break;
default:
zenInvokeCallbackMethod(nav.onarrange,nav,'onarrange','swap',
{index:dragState.itemIndex, oldPosition:dragState.itemIndex, newPosition:dragState.itemIndex},
'key',dragState.itemKey,'final',true);
break;
}
}
if (this._oldMouseMove) {
document.onmousemove = this._oldMouseMove;
}
this._oldMouseMove = null;
if (this._oldMouseUp) {
document.onmouseup = this._oldMouseUp;
}
this._oldMouseUp = null;
zenPage._dragState = null;
if (nav) {
nav.refreshTopSheet();
}
}

self._ZEN_Component_navigator_onPopupAction = function(popupName,action,value) {
zenInvokeCallbackMethod(this.onpopupaction,this,'onpopupaction','key',popupName,'value',value);
}

self._ZEN_Component_navigator_onloadHandler = function() {
if (this.children && this.children.length) {
this._stash = [];
for (var n = 0; n < this.children.length; n++) {
this._stash[n] = this.children[n].getEnclosingDiv();
}
this.children.length = 0;
}
this.pushSheet(null);
this.render();
this.setHeight(this.getEnclosingDiv().offsetHeight);
}

self._ZEN_Component_navigator_parseStyle = function(style) {
var result = {};
var enc = this.getEnclosingDiv();
var encStyle = enc.style.cssText;
enc.style.cssText = style + 'visibility:hidden;';
result.displayed = true;
result.bold = false;
result.italic = false;
result.underline = false;
result.shadow = false;
result.smallCaps = false;
var list = ['color','backgroundColor','textAlign','fontFamily','fontSize','margin','padding','opacity','borderRadius','top','left','right','left','width','height','borderColor'];
for (var n = 0; n < list.length; n++) {
result[list[n]] = '';
if (enc.style[list[n]]!=='') {
result[list[n]] = enc.style[list[n]];
}
}
result.borderTop = enc.style.borderTopWidth=='0px' ? false : true;
result.borderBottom = enc.style.borderBottomWidth=='0px' ? false : true;;
result.borderLeft = enc.style.borderLeftWidth=='0px' ? false : true;;
result.borderRight = enc.style.borderRightWidth=='0px' ? false : true;;
result.borderWidth = enc.style.borderWidth;
if (result.borderTop && !isNaN(parseInt(enc.style.borderTopWidth,10))) {
result.borderWidth = enc.style.borderTopWidth;
}
else if (result.borderBottom && !isNaN(parseInt(enc.style.borderBottomWidth,10))) {
result.borderWidth = enc.style.borderBottomWidth;
}
else if (result.borderLeft && !isNaN(parseInt(enc.style.borderLeftWidth,10))) {
result.borderWidth = enc.style.borderLeftWidth;
}
else if (result.borderRight && !isNaN(parseInt(enc.style.borderRightWidth,10))) {
result.borderWidth = enc.style.borderRightWidth;
}
if (enc.style.display!='') {
result.displayed = (enc.style.display != 'none');
}
if (enc.style.fontWeight!='') {
result.bold = (enc.style.fontWeight == 'bold');
}
if (enc.style.fontStyle!='') {
result.italic = (enc.style.fontStyle == 'italic');
}
if (enc.style.fontVariant!='') {
result.smallCaps = (enc.style.fontVariant == 'small-caps');
}
if (enc.style.textDecoration!='') {
result.underline = (enc.style.textDecoration == 'underline');
}
if (enc.style.textShadow!='') {
result.shadow = (enc.style.textShadow != 'inherit') && (enc.style.textShadow != '');
}
enc.style.cssText = encStyle;
return result;
}

self._ZEN_Component_navigator_parseStyleSVG = function(style) {
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

self._ZEN_Component_navigator_popSheet = function() {
if (this._stack && this.currLevel>0) {
this.currLevel--;
this._editMode = false;
var div = this.getLevelContent(this.currLevel,this._itemSpecStack[this.currLevel]);
this._stack[this.currLevel] = div;
this._dataStack[this.currLevel] = this._contentList;
this.updateMasterPanel(true);
var columnWidth = parseInt(this.columnWidth,10);
var tray = this.findElement('tray');
if (tray) {
tray.style.left = (-this.currLevel*columnWidth) + 'px';
}
if (zenIsIE) {
this.updateMasterPanel(false);
}
else {
if (tray.addEventListener) {
this._transEvent = new Function('zenPage.getComponent('+this.index+').updateMasterPanel(false);');
tray.addEventListener('webkitTransitionEnd', this._transEvent,false);
tray.addEventListener('transitionend', this._transEvent,false);
}
}
}
return this.currLevel;
}

self._ZEN_Component_navigator_popupButtonClickHandler = function(evt,key,url) {
evt = evt ? evt : window.event;
if (evt && evt.stopPropagation) {
evt.stopPropagation();
}
var parms = {};
zenPage.launchPopupWindow(url,key,'resizable,width=800,height=600',parms,this);
}

self._ZEN_Component_navigator_pushSheet = function(itemSpec) {
if (null==this._stack) {
this.currLevel = 0;
this._stack = [];			// stack of divs
this._itemSpecStack = [];	// stack of current item spec for each level
this._dataStack = [];		// stack of contentList for each level
this._selectedStack = [];	// stack of selectedItem for each level
}
else {
this.currLevel++;
}
var div = this.getLevelContent(this.currLevel,itemSpec);
this._stack[this.currLevel] = div;
this._itemSpecStack[this.currLevel] = itemSpec;
this._dataStack[this.currLevel] = this._contentList;
this._selectedStack[this.currLevel] = -1;
this.updateMasterPanel(false);
var columnWidth = parseInt(this.columnWidth,10);
var tray = this.findElement('tray');
if (tray) {
tray.style.left = (-this.currLevel*columnWidth) + 'px';
}
}

self._ZEN_Component_navigator_raiseChange = function(key,value,final) {
zenInvokeCallbackMethod(this.onchange,this,'onchange','value',value,'key',key,'final',final);
}

self._ZEN_Component_navigator_refreshTopSheet = function() {
if (this._stack) {
var itemSpec = this._itemSpecStack[this.currLevel];
var div = this.getLevelContent(this.currLevel,itemSpec);
this._stack[this.currLevel] = div;
this._dataStack[this.currLevel] = this._contentList;
this.updateMasterPanel(false);
}
}

self._ZEN_Component_navigator_renderContents = function() {
var div = this.getEnclosingDiv();
if (!div) return;
if (this._validContent) {
return;
}
var discWidth = this.showDisclosure ? parseInt(this.disclosureWidth,10) : 0;
var bodyHeight = div.offsetHeight;
div.style.width = discWidth + (this.expanded ?  parseInt(this.columnWidth,10)+2 : 0) + 'px';
if (bodyHeight>0) {
this._validContent = true;
}
var columnWidth = parseInt(this.columnWidth,10);
var html = [];
if (this.showDisclosure) {
html[html.length] = '<div id="'+this.makeId('disclosure')+'" title="'+this.title+'" class="navDisclosureBar" style="height:'+bodyHeight+'px;width:'+this.disclosureWidth+'px;left:0px;" onclick="zenPage.getComponent('+this.index+').toggleExpanded();">';
var icon = this.expanded ? 'images/black_left_arrow.png' : 'images/black_right_arrow.png';
html[html.length] = '<image id="'+this.makeId('discIcon')+'" class="navDisclosureIcon" style="top:'+bodyHeight/2+'px;" src="'+icon+'" />';
html[html.length] = '</div>';
html[html.length] = '</div>';
}
html[html.length] = '<div id="'+this.makeId('background')+'" class="navBackground" style="left:'+discWidth+'px;height:'+bodyHeight+'px;width:'+columnWidth+'px;'+this.backgroundStyle+'"></div>';
html[html.length] = '<div id="'+this.makeId('master')+'" class="navMasterPanel" style="left:'+discWidth+'px;height:'+bodyHeight+'px;width:'+columnWidth+'px;">';
html[html.length] = '<div id="'+this.makeId('tray')+'" class="navMasterTray" style="height:'+bodyHeight+'px;">';
html[html.length] = this.getMasterContent(false);
html[html.length] = '</div>';
html[html.length] = '</div>';
html[html.length] = '<div id="'+this.makeId('overlay')+'" class="navOverlay"></div>';
div.innerHTML = html.join('');
div.style.opacity = 1.0;
div.style.transitionProperty = 'width';
div.style.webkitTransitionProperty = 'width';
div.style.MozTransitionProperty = 'width';
var tray = this.findElement('tray');
if (tray) {
tray.style.left = (-this.currLevel*columnWidth) + 'px';
}
}

self._ZEN_Component_navigator_revealFrame = function(frame) {
frame.style.opacity = 1.0;
this.endWait();
}

self._ZEN_Component_navigator_selectItem = function(index,forceDrill) {
var item = this.findItemByIndex(index);
forceDrill = zenGet(forceDrill,false);
var oldIndex = -1;
if (this._selectedStack) {
oldIndex = this._selectedStack[this.currLevel];
this._selectedStack[this.currLevel] = index;
}
if (item) {
var action = zenGet(item.action);
var key = zenGet(item.key);
var edit = zenGet(item.edit);
if (this._editMode && (this._editIndex!=index)) {
this.stopEdit(this._editIndex);
}
if (edit!='' && !forceDrill) {
if (!this.editMode) {
this.startEdit(index);
}
return;
}
switch (action) {
case 'drill':
if (key!='') {
zenInvokeCallbackMethod(this.onselect,this,'onselect','value',zenGet(item.value),'key',key,'which','drill');
var enc = this.getEnclosingDiv();
enc.scrollTop = 0;
enc.scrollLeft = 0;
this.slideInto(item);
}
break;
case 'select':
var key = zenGet(item.key);
zenInvokeCallbackMethod(this.onselect,this,'onselect','value',zenGet(item.value),'key',key,'which','select');
break;
case 'link':
if (item.value) {
try {  // Add defensive coding to avoid IE double unload bug
self.document.location = item.value;
}
catch(ex) {
}
}
break;
case 'apply':
this.applyValue(zenGet(item.value));
break;
}
}
}

self._ZEN_Component_navigator_setExpanded = function(flag) {
if (this.expanded != flag) {
this.expanded = flag;
var div = this.getEnclosingDiv();
var columnWidth = this.expanded ?  parseInt(this.columnWidth,10) : 0;
var discWidth = this.showDisclosure?parseInt(this.disclosureWidth,10):0;
div.style.width = discWidth + columnWidth + (this.expanded?2:0) + 'px';
var icon = this.expanded ? 'images/black_left_arrow.png' : 'images/black_right_arrow.png';
var image = this.findElement('discIcon');
image.src = icon;
if (this.onexpand!='') {
if (zenIsIE) {
this.expandHandler();
}
else {
if (div.addEventListener) {
this._transEvent = new Function('zenPage.getComponent('+this.index+').expandHandler();');
div.addEventListener('webkitTransitionEnd', this._transEvent,false);
div.addEventListener('transitionend', this._transEvent,false);
}
}
}
}
}

self._ZEN_Component_navigator_setHeight = function(height) {
height = height<0 ? 0 : height;
var div = this.getEnclosingDiv();
div.style.height = height + 'px';
var disc = this.findElement('disclosure');
if (disc) {
disc.style.height = height + 'px';
}
var bg = this.findElement('background');
if (bg) {
bg.style.height = height + 'px';
}
var master = this.findElement('master');
if (master && height>2) {
master.style.height = height-2 + 'px';
}
var tray = this.findElement('tray');
if (tray) {
tray.style.height = height + 'px';
}
var chgt = height-parseInt(this.headerHeight,10)-parseInt(this.footerHeight,10)-20;
chgt = chgt > 0 ? chgt : 1;
for (var n = 0;;n++) {
var panel = this.findElement('panel_'+n);
if (!panel) break;
panel.style.height = height + 'px';
var body = this.findElement('body_'+n);
if (body) {
body.style.height = chgt + 'px';
}
}
var icon = this.findElement('discIcon');
if (icon) {
icon.style.top = height/2 + 'px';
icon.style.left = (parseInt(this.disclosureWidth,10)-16)/2 + 'px';
}
var iframe = this.findElement('iframe_0');
if (iframe && height>24) {
iframe.style.height = height-24 + 'px';
}
}

self._ZEN_Component_navigator_setProperty = function(property,value,value2) {
switch(property) {
case 'disabled':
this[property] = value ? true : false;
this.refreshTopSheet();
break;
case 'columnWidth':
this.setWidth(value);
break;
case 'headerHeight':
case 'footerHeight':
case 'showDisclosure':
case 'disclosureWidth':
case 'expanded':
case 'backgroundStyle':
this[property] = value;
this.render();
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_navigator_setStyleIntoCSS = function(cssText,style,value) {
var s = cssText;
if (style!=='') {
var list = ['color','backgroundColor','fontFamily','fontSize','margin','padding','opacity','borderRadius','top','left','right','left','width','height'];
var listCSS = ['color','background-color','font-family','font-size','margin','padding','opacity','border-radius','top','left','right','left','width','height'];
var test = cssText;
switch (style) {
case 'align':
test += 'text-align:' + (value==''?'inherit':value) + ';';
break;
case 'bold':
test += 'font-weight:' + (value?'bold':'normal') + ';';
break;
case 'underline':
test += 'text-decoration:' + (value?'underline':'none') + ';';
break;
case 'italic':
test += 'font-style:' + (value?'italic':'normal') + ';';
break;
case 'smallCaps':
test += 'font-variant:' + (value?'small-caps':'normal') + ';';
break;
case 'shadow':
test += 'text-shadow:' + (value?'1px 1px 1px #808080':'inherit') + ';';
break;
case 'displayed':
test += 'display:' + (value?'block':'none') + ';';
break;
case 'borderTop':
if (!value) {
test += 'border-top-width:0px;';
}
else {
test += 'border-top-width:medium;';
}
break;
case 'borderBottom':
if (!value) {
test += 'border-bottom-width:0px;';
}
else {
test += 'border-bottom-width:medium;';
}
break;
case 'borderLeft':
if (!value) {
test += 'border-left-width:0px;';
}
else {
test += 'border-left-width:medium;';
}
break;
case 'borderRight':
if (!value) {
test += 'border-right-width:0px;';
}
else {
test += 'border-right-width:medium;';
}
break;
default:
test += style + ':' + (value!==''?value:'inherit') + ';';
break;
}
var result = this.parseStyle(test);
var s = '';
if (result.textAlign && result.textAlign!='inherit') {
s += 'text-align: ' + result.textAlign+';';
}
if (result.bold) {
s += 'font-weight: bold;';
}
if (result.italic) {
s += 'font-style: italic;';
}
if (result.smallCaps) {
s += 'font-variant: small-caps;';
}
if (result.underline) {
s += 'text-decoration: underline;';
}
if (result.shadow) {
s += 'text-shadow: 1px 1px 1px #808080;';
}
if (!result.displayed) {
s += 'display: none;';
}
if (result.borderWidth && result.borderWidth!='0px') {
s += 'border-style:solid;';
s += 'border-width:'+result.borderWidth+';';
if (!result.borderTop) {
s += 'border-top-width:0px;'
}
if (!result.borderBottom) {
s += 'border-bottom-width:0px;'
}
if (!result.borderLeft) {
s += 'border-left-width:0px;'
}
if (!result.borderRight) {
s += 'border-right-width:0px;'
}
}
if (result.borderColor && result.borderColor!='inherit') {
s += 'border-color:' + result.borderColor + ';';
}
for (var n = 0; n < list.length; n++) {
if (result[list[n]]!==null && result[list[n]]!=='' && result[list[n]]!='inherit') {
s += listCSS[n] + ':'+result[list[n]]+ ';';
}
}
}
return s;
}

self._ZEN_Component_navigator_setWidth = function(width) {
if (this.columnWidth != parseInt(width,10)) {
this.columnWidth = parseInt(width,10);
this.render();
this.refreshTopSheet();
}
}

self._ZEN_Component_navigator_showMessage = function(msg) {
this.showOverlay('<div class="bformMsg">'+msg+'</msg>');
}

self._ZEN_Component_navigator_showOverlay = function(content) {
var overlay = this.findElement('overlay');
if (overlay) {
overlay.innerHTML = content;
var div = this.getEnclosingDiv();
overlay.style.top = (div.offsetHeight - overlay.offsetHeight)/2 + 'px';
overlay.style.left = (this.columnWidth - overlay.offsetWidth)/2 + 'px';
overlay.style.visibility = 'visible';
overlay.style.opacity = 1.0;
}
}

self._ZEN_Component_navigator_slideInto = function(item) {
this.pushSheet(item);
}

self._ZEN_Component_navigator_slideOutOf = function() {
this.popSheet();
}

self._ZEN_Component_navigator_sliderChanged = function(index,newValue,final) {
var item = this.findItemByIndex(index);
var txtBox = this.findElement('sliderValue_'+this.currLevel+'_'+index);
if (txtBox && newValue!='') txtBox.value = newValue;
if (item) {
var key = zenGet(item.key);
item.value = newValue;
zenInvokeCallbackMethod(this.onchange,this,'onchange','value',item.value,'key',key,'final',final);
}
}

self._ZEN_Component_navigator_sliderMouseDown = function(evt,index) {
evt = evt ? evt : window.event;
if (document.onmousemove != this.sliderMouseMove) {
this._oldMouseMove = document.onmousemove;
document.onmousemove = this.sliderMouseMove;
}
if (document.onmouseup != this.sliderMouseUp) {
this._oldMouseUp = document.onmouseup;
document.onmouseup = this.sliderMouseUp;
}
zenPage._componentIndex = this.index;
zenPage._sliderIndex = index;
}

self._ZEN_Component_navigator_sliderMouseMove = function(evt) {
evt = evt ? evt : window.event;
var index = zenPage._sliderIndex;
var slider = zenPage._componentIndex===null?null:zenPage.getComponent(zenPage._componentIndex);
if (slider) {
var track = slider.findElement('track_'+slider.currLevel+'_'+index);
var activeTrack = slider.findElement('trackActive_'+slider.currLevel+'_'+index);
var thumb = slider.findElement('thumb_'+slider.currLevel+'_'+index);
var width = parseInt(track.offsetWidth,10) + 2; 	// border
var tleft = zenGetLeft(track);
var x = (evt.clientX-12) - tleft;
x = (x<=0) ? 0 : x;
x = (x>=(width-20))?width-20:x;
var item = slider.findItemByIndex(index);
var minValue = parseFloat(zenGet(item.minValue,0));
var maxValue = parseFloat(zenGet(item.maxValue,1));
var stepSize = parseFloat(zenGet(item.stepSize,''));
var range = maxValue - minValue;
var intVal = (stepSize==Math.floor(stepSize));
if (range != 0 && !isNaN(range)) {
var newValue = minValue + ((x/(width-20)) * range);
if (!isNaN(stepSize) && stepSize!=0) {
newValue = Math.floor(newValue/stepSize)*stepSize;
newValue = intVal ? Math.round(newValue) : newValue;
}
var value = zenGet(item.value);
if (newValue != value) {
var toggle = slider.findElement('toggle_'+slider.currLevel+'_'+index);
if (toggle && !toggle.checked) {
toggle.checked = true;
}
slider.sliderChanged(index,newValue,false);
left = (newValue/range)*(width-20);
thumb.style.left = x + 'px';
activeTrack.style.width =  x + 'px';
}
}
}
}

self._ZEN_Component_navigator_sliderMouseUp = function(evt) {
evt = evt ? evt : window.event;
var slider = zenPage._componentIndex===null?null:zenPage.getComponent(zenPage._componentIndex);
if (slider) {
var index = zenPage._sliderIndex;
var item = slider.findItemByIndex(index);
if (item) {
slider.sliderChanged(index,item.value,true);
}
}
if (this._oldMouseMove) {
document.onmousemove = this._oldMouseMove;
}
this._oldMouseMove = null;
if (this._oldMouseUp) {
document.onmouseup = this._oldMouseUp;
}
this._oldMouseUp = null;
zenPage._componentIndex = null;
zenPage._sliderIndex = null;
}

self._ZEN_Component_navigator_sliderToggleClick = function(evt,index) {
var toggle = this.findElement('toggle_'+this.currLevel+'_'+index);
if (!toggle.checked) {
this.sliderChanged(index,'',true);
}
}

self._ZEN_Component_navigator_sliderTouchEnd = function(evt) {
evt = evt ? evt : window.event;
var slider = zenPage._componentIndex===null?null:zenPage.getComponent(zenPage._componentIndex);
if (slider) {
var index = zenPage._sliderIndex;
var item = slider.findItemByIndex(index);
if (item) {
slider.sliderChanged(index,item.value,true);
}
}
document.ontouchend = this._oldTouchEnd;
this._oldTouchEnd = null;
document.ontouchend = this._oldTouchEnd;
this._oldTouchEnd = null;
evt.preventDefault();
zenPage._componentIndex = null;
zenPage._sliderIndex = null;
}

self._ZEN_Component_navigator_sliderTouchMove = function(evt) {
evt = evt ? evt : window.event;
var t=evt.touches;
var index = zenPage._sliderIndex;
var slider = zenPage._componentIndex===null?null:zenPage.getComponent(zenPage._componentIndex);
if (slider) {
var track = slider.findElement('track_'+slider.currLevel+'_'+index);
var activeTrack = slider.findElement('trackActive_'+slider.currLevel+'_'+index);
var thumb = slider.findElement('thumb_'+slider.currLevel+'_'+index);
var width = parseInt(track.offsetWidth,10) + 2; 	// border
var tleft = zenGetLeft(track);
var x = (t[0].clientX-12) - tleft;
x = (x<=0) ? 0 : x;
x = (x>=(width-20))?width-20:x;
var item = slider.findItemByIndex(index);
var minValue = parseFloat(zenGet(item.minValue,0));
var maxValue = parseFloat(zenGet(item.maxValue,1));
var stepSize = parseFloat(zenGet(item.stepSize,''));
var range = maxValue - minValue;
var intVal = (stepSize==Math.floor(stepSize));
if (range != 0 && !isNaN(range)) {
var newValue = minValue + ((x/(width-20)) * range);
if (!isNaN(stepSize) && stepSize!=0) {
newValue = Math.floor(newValue/stepSize)*stepSize;
newValue = intVal ? Math.round(newValue) : newValue;
}
var value = zenGet(item.value);
if (newValue != value) {
var toggle = slider.findElement('toggle_'+slider.currLevel+'_'+index);
if (toggle && !toggle.checked) {
toggle.checked = true;
}
slider.sliderChanged(index,newValue,false);
left = (newValue/range)*(width-20);
thumb.style.left = x + 'px';
activeTrack.style.width =  x + 'px';
}
}
}
evt.preventDefault();
}

self._ZEN_Component_navigator_sliderTouchStart = function(evt,index) {
evt = evt ? evt : window.event;
var t=evt.touches;
if (t.length==1) { // NOT the start of a multi-touch gesture...
if (document.ontouchmove != this.sliderTouchMove) {
this._oldTouchMove = document.ontouchmove;
document.ontouchmove = this.sliderTouchMove;
}
if (document.ontouchend != this.sliderTouchEnd) {
this._oldTouchEnd = document.ontouchend;
document.ontouchend = this.sliderTouchEnd;
}
zenPage._componentIndex = this.index;
zenPage._sliderIndex = index;
evt.preventDefault();
}
}

self._ZEN_Component_navigator_sliderValueChange = function(event,index) {
var item = this.findItemByIndex(index);
var minValue = parseFloat(zenGet(item.minValue,0));
var maxValue = parseFloat(zenGet(item.maxValue,1));
var stepSize = parseFloat(zenGet(item.stepSize,''));
var width = parseInt(zenGet(item.renderWidth,100));
var range = parseFloat(zenGet(item.range,1));
var defaultValue = parseFloat(zenGet(item.defaultValue,maxValue));
var oldValue = parseFloat(zenGet(item.value,defaultValue));
var intVal = (stepSize==Math.floor(stepSize)); // Integer values only?
var txtBox = event.target;
var value = txtBox.value; // At this point value is a string
if (!value || isNaN(value)) {  // if parsing would fail revert to old value
value = oldValue ;
}
else {
value = parseFloat(value);
}
if (value<minValue) value = minValue;
if (value>maxValue) value = maxValue;
if (!isNaN(stepSize) && stepSize!=0) {
value = Math.floor(value/stepSize)*stepSize;
value = intVal ? Math.round(value) : value;
}
value = parseFloat(value.toString().substring(0,5));
txtBox.value = value;
var track = this.findElement('track_'+this.currLevel+'_'+index);
var activeTrack = this.findElement('trackActive_'+this.currLevel+'_'+index);
var thumb = this.findElement('thumb_'+this.currLevel+'_'+index);
if (range != 0 && !isNaN(range)) {
if (oldValue != value) {
var toggle = this.findElement('toggle_'+this.currLevel+'_'+index);
if (toggle && !toggle.checked) {
toggle.checked = true;
}
this.sliderChanged(index,value,true);
left = (value/range)*(width-20);
thumb.style.left = left + 'px';
activeTrack.style.width =  left + 'px';
}
}
event.preventDefault();
}

self._ZEN_Component_navigator_startEdit = function(index) {
if (this._editMode&&(index!=this._editIndex)) {
this.stopEdit(this._editIndex);
}
if (!this._editMode) {
var item = this.findItemByIndex(index);
if (item) {
var div = this.getItemDiv(this.currLevel,index);
if (div) {
var content = this.getItemContent(index,item,true);
div.innerHTML = content;
}
}
this._editMode = true;
this._editIndex = index;
this.giveFocusToControl();
}
}

self._ZEN_Component_navigator_stepperAction = function(which,index,delay) {
if (this._stepperTimer) {
window.clearTimeout(this._stepperTimer);
}
var item = this.findItemByIndex(index);
if (item) {
var minValue = parseFloat(zenGet(item.minValue,0));
var maxValue = parseFloat(zenGet(item.maxValue,100));
var stepSize = parseFloat(zenGet(item.stepSize,1));
var delta = which=='down'?-stepSize:stepSize;
var oldValue = zenGet(item.value);
var startValue = isNaN(parseFloat(oldValue)) ? 0 : parseFloat(oldValue);
item.value = startValue + delta;
item.value = item.value >= maxValue ? maxValue : item.value;
item.value = item.value <= minValue ? minValue : item.value;
if (oldValue != zenGet(item.value)) {
var key = zenGet(item.key);
zenInvokeCallbackMethod(this.onchange,this,'onchange','value',item.value,'key',key,'final',false);
var div = this.getItemDiv(this.currLevel,index);
if (div) {
var content = this.getItemContent(index,item,false);
div.innerHTML = content;
}
}
if ((which=='down' && item.value>minValue)||(which=='up' && item.value<maxValue)) {
delay = (parseInt(delay,10) > 50) ? parseInt(delay,10) - 10 : 50;
this._stepperTimer = window.setTimeout("zenPage.getComponent(" + this.index + ").stepperAction(\'"+which+"\',"+index+","+delay+")",delay);
}
}
}

self._ZEN_Component_navigator_stepperMouseDown = function(which,index) {
this.stepperAction(which,index,200);
}

self._ZEN_Component_navigator_stepperMouseUp = function(which,index) {
if (this._stepperTimer) {
window.clearTimeout(this._stepperTimer);
this._stepperTimer = null;
}
var item = this.findItemByIndex(index);
if (item) {
var key = zenGet(item.key);
zenInvokeCallbackMethod(this.onchange,this,'onchange','value',item.value,'key',key,'final',true);
}
}

self._ZEN_Component_navigator_stopEdit = function(index,cancel) {
cancel = zenGet(cancel,false);
if (this._editMode) {
var item = this.findItemByIndex(index);
if (item) {
var edit = zenGet(item.edit);
var ctrl = this.findElement('control_'+this.currLevel);
if (ctrl && !cancel) {
item.value = ctrl.value;
var key = zenGet(item.key);
zenInvokeCallbackMethod(this.onchange,this,'onchange','value',ctrl.value,'key',key,'final',true);
}
var div = this.getItemDiv(this.currLevel,index);
if (div) {
var content = this.getItemContent(index,item,false);
div.innerHTML = content;
}
}
}
this._editMode = false;
this._editIndex = -1;
}

self._ZEN_Component_navigator_toggleExpanded = function() {
this.setExpanded(!this.expanded);
}

self._ZEN_Component_navigator_toggleSwitch = function(index) {
var item = this.findItemByIndex(index);
if (item) {
item.value = item.value ? false : true;
var key = zenGet(item.key);
zenInvokeCallbackMethod(this.onchange,this,'onchange','value',item.value,'key',key,'final',true);
var div = this.getItemDiv(this.currLevel,index);
if (div) {
var content = this.getItemContent(index,item,false);
div.innerHTML = content;
}
}
}

self._ZEN_Component_navigator_transformColor = function(color) {
switch(color) {
case 'url(#deep-silver)':
case 'url(#shade-silver)':
case 'url(#glow-silver)':
case 'url(#glow-silverHz)':
case 'url(#glow-silverDiag)':
return 'silver';
case 'url(#deep-red)':
case 'url(#shade-red)':
case 'url(#glow-red)':
case 'url(#glow-redHz)':
case 'url(#glow-redDiag)':
return 'red';
case 'url(#deep-green)':
case 'url(#shade-green)':
case 'url(#glow-green)':
case 'url(#glow-greenHz)':
case 'url(#glow-greenDiag)':
return 'green';
case 'url(#deep-yellow)':
case 'url(#shade-yellow)':
case 'url(#glow-yellow)':
case 'url(#glow-yellowHz)':
case 'url(#glow-yellowDiag)':
return 'yellow';
case 'url(#deep-blue)':
case 'url(#shade-blue)':
case 'url(#glow-blue)':
case 'url(#glow-blueHz)':
case 'url(#glow-blueDiag)':
return 'blue';
case 'url(#deep-teal)':
case 'url(#shade-teal)':
case 'url(#glow-teal)':
case 'url(#glow-tealHz)':
case 'url(#glow-tealDiag)':
return 'teal';
case 'url(#deep-purple)':
case 'url(#shade-purple)':
case 'url(#glow-purple)':
case 'url(#glow-purpleHz)':
case 'url(#glow-purpleDiag)':
return 'purple';
case 'url(#deep-orange)':
case 'url(#shade-orange)':
case 'url(#glow-orange)':
case 'url(#glow-orangeHz)':
case 'url(#glow-orangeDiag)':
return 'orange';
}
return color;
}

self._ZEN_Component_navigator_tryValue = function(value,tryLevel) {
if (tryLevel == this.currLevel) {
this.applyValue(value,'',false);
}
}

self._ZEN_Component_navigator_update = function(reset) {
if (reset) {
var enc = this.getEnclosingDiv();
enc.scrollTop = 0;
enc.scrollLeft = 0;
this.selectedItem = '';
this._stack = null;
this.pushSheet(null);
}
this._validContent = false;
this.render();
}

self._ZEN_Component_navigator_updateMasterPanel = function(showExtra) {
var masterDiv = this.findElement('tray');
if (masterDiv) {
if (!showExtra && this._transEvent && masterDiv.removeEventListener) {
masterDiv.removeEventListener('webkitTransitionEnd', this._transEvent);
masterDiv.removeEventListener('transitionend', this._transEvent);
this._transEvent = null;
}
masterDiv.innerHTML = this.getMasterContent(showExtra);
}
}

self._ZEN_Component_navigator_GetUserFontList = function() {
	return zenClassMethod(this,'GetUserFontList','','VARCHAR',arguments);
}

self._ZEN_Component_navigator_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_navigator__Loader = function() {
	zenLoadClass('_ZEN_Component_group');
	_ZEN_Component_navigator.prototype = zenCreate('_ZEN_Component_group',-1);
	var p = _ZEN_Component_navigator.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_navigator;
	p.superClass = ('undefined' == typeof _ZEN_Component_group) ? zenMaster._ZEN_Component_group.prototype:_ZEN_Component_group.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.navigator';
	p._type = 'navigator';
	p.serialize = _ZEN_Component_navigator_serialize;
	p.getSettings = _ZEN_Component_navigator_getSettings;
	p.GetUserFontList = _ZEN_Component_navigator_GetUserFontList;
	p.ReallyRefreshContents = _ZEN_Component_navigator_ReallyRefreshContents;
	p.applyValue = _ZEN_Component_navigator_applyValue;
	p.beginWait = _ZEN_Component_navigator_beginWait;
	p.choiceClick = _ZEN_Component_navigator_choiceClick;
	p.clearValue = _ZEN_Component_navigator_clearValue;
	p.clickHandler = _ZEN_Component_navigator_clickHandler;
	p.closeButtonClickHandler = _ZEN_Component_navigator_closeButtonClickHandler;
	p.collectValue = _ZEN_Component_navigator_collectValue;
	p.colorSetChange = _ZEN_Component_navigator_colorSetChange;
	p.convertCSSToText = _ZEN_Component_navigator_convertCSSToText;
	p.customColorChange = _ZEN_Component_navigator_customColorChange;
	p.editClick = _ZEN_Component_navigator_editClick;
	p.editControlApply = _ZEN_Component_navigator_editControlApply;
	p.editControlCancel = _ZEN_Component_navigator_editControlCancel;
	p.editKeyPressHandler = _ZEN_Component_navigator_editKeyPressHandler;
	p.editKeyUpHandler = _ZEN_Component_navigator_editKeyUpHandler;
	p.endWait = _ZEN_Component_navigator_endWait;
	p.expandHandler = _ZEN_Component_navigator_expandHandler;
	p.findItemByIndex = _ZEN_Component_navigator_findItemByIndex;
	p.findTextSize = _ZEN_Component_navigator_findTextSize;
	p.getChooserListHTML = _ZEN_Component_navigator_getChooserListHTML;
	p.getColorChooserHTML = _ZEN_Component_navigator_getColorChooserHTML;
	p.getColorSet = _ZEN_Component_navigator_getColorSet;
	p.getColorTableHTML = _ZEN_Component_navigator_getColorTableHTML;
	p.getCurrSpec = _ZEN_Component_navigator_getCurrSpec;
	p.getFontChooserHTML = _ZEN_Component_navigator_getFontChooserHTML;
	p.getGhostHTML = _ZEN_Component_navigator_getGhostHTML;
	p.getHTMLForEditor = _ZEN_Component_navigator_getHTMLForEditor;
	p.getHTMLForItem = _ZEN_Component_navigator_getHTMLForItem;
	p.getIconListHTML = _ZEN_Component_navigator_getIconListHTML;
	p.getItemContent = _ZEN_Component_navigator_getItemContent;
	p.getItemDiv = _ZEN_Component_navigator_getItemDiv;
	p.getLevelContent = _ZEN_Component_navigator_getLevelContent;
	p.getMasterContent = _ZEN_Component_navigator_getMasterContent;
	p.getMultiSelectIconListHTML = _ZEN_Component_navigator_getMultiSelectIconListHTML;
	p.getNavFooterHTML = _ZEN_Component_navigator_getNavFooterHTML;
	p.getNavHeaderHTML = _ZEN_Component_navigator_getNavHeaderHTML;
	p.getParentSpec = _ZEN_Component_navigator_getParentSpec;
	p.getWidth = _ZEN_Component_navigator_getWidth;
	p.giveFocusToControl = _ZEN_Component_navigator_giveFocusToControl;
	p.headerButtonClickHandler = _ZEN_Component_navigator_headerButtonClickHandler;
	p.hideMessage = _ZEN_Component_navigator_hideMessage;
	p.hideOverlay = _ZEN_Component_navigator_hideOverlay;
	p.itemDragHandleMouseDown = _ZEN_Component_navigator_itemDragHandleMouseDown;
	p.itemDragMouseMove = _ZEN_Component_navigator_itemDragMouseMove;
	p.itemDragMouseUp = _ZEN_Component_navigator_itemDragMouseUp;
	p.onPopupAction = _ZEN_Component_navigator_onPopupAction;
	p.onloadHandler = _ZEN_Component_navigator_onloadHandler;
	p.parseStyle = _ZEN_Component_navigator_parseStyle;
	p.parseStyleSVG = _ZEN_Component_navigator_parseStyleSVG;
	p.popSheet = _ZEN_Component_navigator_popSheet;
	p.popupButtonClickHandler = _ZEN_Component_navigator_popupButtonClickHandler;
	p.pushSheet = _ZEN_Component_navigator_pushSheet;
	p.raiseChange = _ZEN_Component_navigator_raiseChange;
	p.refreshTopSheet = _ZEN_Component_navigator_refreshTopSheet;
	p.renderContents = _ZEN_Component_navigator_renderContents;
	p.revealFrame = _ZEN_Component_navigator_revealFrame;
	p.selectItem = _ZEN_Component_navigator_selectItem;
	p.setExpanded = _ZEN_Component_navigator_setExpanded;
	p.setHeight = _ZEN_Component_navigator_setHeight;
	p.setProperty = _ZEN_Component_navigator_setProperty;
	p.setStyleIntoCSS = _ZEN_Component_navigator_setStyleIntoCSS;
	p.setWidth = _ZEN_Component_navigator_setWidth;
	p.showMessage = _ZEN_Component_navigator_showMessage;
	p.showOverlay = _ZEN_Component_navigator_showOverlay;
	p.slideInto = _ZEN_Component_navigator_slideInto;
	p.slideOutOf = _ZEN_Component_navigator_slideOutOf;
	p.sliderChanged = _ZEN_Component_navigator_sliderChanged;
	p.sliderMouseDown = _ZEN_Component_navigator_sliderMouseDown;
	p.sliderMouseMove = _ZEN_Component_navigator_sliderMouseMove;
	p.sliderMouseUp = _ZEN_Component_navigator_sliderMouseUp;
	p.sliderToggleClick = _ZEN_Component_navigator_sliderToggleClick;
	p.sliderTouchEnd = _ZEN_Component_navigator_sliderTouchEnd;
	p.sliderTouchMove = _ZEN_Component_navigator_sliderTouchMove;
	p.sliderTouchStart = _ZEN_Component_navigator_sliderTouchStart;
	p.sliderValueChange = _ZEN_Component_navigator_sliderValueChange;
	p.startEdit = _ZEN_Component_navigator_startEdit;
	p.stepperAction = _ZEN_Component_navigator_stepperAction;
	p.stepperMouseDown = _ZEN_Component_navigator_stepperMouseDown;
	p.stepperMouseUp = _ZEN_Component_navigator_stepperMouseUp;
	p.stopEdit = _ZEN_Component_navigator_stopEdit;
	p.toggleExpanded = _ZEN_Component_navigator_toggleExpanded;
	p.toggleSwitch = _ZEN_Component_navigator_toggleSwitch;
	p.transformColor = _ZEN_Component_navigator_transformColor;
	p.tryValue = _ZEN_Component_navigator_tryValue;
	p.update = _ZEN_Component_navigator_update;
	p.updateMasterPanel = _ZEN_Component_navigator_updateMasterPanel;
}

self._zenClassIdx['pane'] = '_ZEN_Component_pane';
self._ZEN_Component_pane = function(index,id) {
	if (index>=0) {_ZEN_Component_pane__init(this,index,id);}
}

self._ZEN_Component_pane__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_group__init) ?zenMaster._ZEN_Component_group__init(o,index,id):_ZEN_Component_group__init(o,index,id);
	o.paneName = '';
}
function _ZEN_Component_pane_serialize(set,s)
{
	var o = this;s[0]='3306517082';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.cellAlign;s[9]=o.cellSize;s[10]=o.cellStyle;s[11]=o.cellVAlign;s[12]=set.serializeList(o,o.children,true,'children');s[13]=o.containerStyle;s[14]=(o.disabled?1:0);s[15]=(o.dragEnabled?1:0);s[16]=(o.dropEnabled?1:0);s[17]=(o.dynamic?1:0);s[18]=o.enclosingClass;s[19]=o.enclosingStyle;s[20]=o.error;s[21]=o.groupClass;s[22]=o.groupStyle;s[23]=o.height;s[24]=(o.hidden?1:0);s[25]=o.hint;s[26]=o.hintClass;s[27]=o.hintStyle;s[28]=o.label;s[29]=o.labelClass;s[30]=o.labelDisabledClass;s[31]=o.labelPosition;s[32]=o.labelStyle;s[33]=o.layout;s[34]=o.onafterdrag;s[35]=o.onbeforedrag;s[36]=o.onclick;s[37]=o.ondrag;s[38]=o.ondrop;s[39]=o.onhide;s[40]=o.onrefresh;s[41]=o.onshow;s[42]=o.onupdate;s[43]=o.overlayMode;s[44]=o.paneName;s[45]=o.renderFlag;s[46]=(o.showLabel?1:0);s[47]=o.slice;s[48]=o.title;s[49]=o.tuple;s[50]=o.valign;s[51]=(o.visible?1:0);s[52]=o.width;
}
function _ZEN_Component_pane_getSettings(s)
{
	s['name'] = 'string';
	s['paneName'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_pane_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_pane__Loader = function() {
	zenLoadClass('_ZEN_Component_group');
	_ZEN_Component_pane.prototype = zenCreate('_ZEN_Component_group',-1);
	var p = _ZEN_Component_pane.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_pane;
	p.superClass = ('undefined' == typeof _ZEN_Component_group) ? zenMaster._ZEN_Component_group.prototype:_ZEN_Component_group.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.pane';
	p._type = 'pane';
	p.serialize = _ZEN_Component_pane_serialize;
	p.getSettings = _ZEN_Component_pane_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_pane_ReallyRefreshContents;
}

self._zenClassIdx['repeatingGroup'] = '_ZEN_Component_repeatingGroup';
self._ZEN_Component_repeatingGroup = function(index,id) {
	if (index>=0) {_ZEN_Component_repeatingGroup__init(this,index,id);}
}

self._ZEN_Component_repeatingGroup__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_group__init) ?zenMaster._ZEN_Component_group__init(o,index,id):_ZEN_Component_group__init(o,index,id);
	o.OnCreateResultSet = ''; // encrypted
	o.OnExecuteResultSet = ''; // encrypted
	o.columnName = '';
	o.countRows = '0';
	o.groupByClause = '';
	o.maxRows = '100';
	o.onclickitem = '';
	o.orderByClause = '';
	o.parameters = new Array();
	o.queryClass = ''; // encrypted
	o.queryName = '';
	o.selectedIndex = '-1';
	o.sql = ''; // encrypted
	o.tableName = ''; // encrypted
	o.whereClause = '';
}
function _ZEN_Component_repeatingGroup_serialize(set,s)
{
	var o = this;s[0]='3177419634';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.OnCreateResultSet;s[7]=o.OnExecuteResultSet;s[8]=o.align;s[9]=o.aux;s[10]=o.cellAlign;s[11]=o.cellSize;s[12]=o.cellStyle;s[13]=o.cellVAlign;s[14]=set.serializeList(o,o.children,true,'children');s[15]=o.columnName;s[16]=o.containerStyle;s[17]=o.countRows;s[18]=(o.disabled?1:0);s[19]=(o.dragEnabled?1:0);s[20]=(o.dropEnabled?1:0);s[21]=(o.dynamic?1:0);s[22]=o.enclosingClass;s[23]=o.enclosingStyle;s[24]=o.error;s[25]=o.groupByClause;s[26]=o.groupClass;s[27]=o.groupStyle;s[28]=o.height;s[29]=(o.hidden?1:0);s[30]=o.hint;s[31]=o.hintClass;s[32]=o.hintStyle;s[33]=o.label;s[34]=o.labelClass;s[35]=o.labelDisabledClass;s[36]=o.labelPosition;s[37]=o.labelStyle;s[38]=o.layout;s[39]=o.maxRows;s[40]=o.onafterdrag;s[41]=o.onbeforedrag;s[42]=o.onclick;s[43]=o.onclickitem;s[44]=o.ondrag;s[45]=o.ondrop;s[46]=o.onhide;s[47]=o.onrefresh;s[48]=o.onshow;s[49]=o.onupdate;s[50]=o.orderByClause;s[51]=o.overlayMode;s[52]=set.serializeList(o,o.parameters,true,'parameters');s[53]=o.queryClass;s[54]=o.queryName;s[55]=o.renderFlag;s[56]=o.selectedIndex;s[57]=(o.showLabel?1:0);s[58]=o.slice;s[59]=o.sql;s[60]=o.tableName;s[61]=o.title;s[62]=o.tuple;s[63]=o.valign;s[64]=(o.visible?1:0);s[65]=o.whereClause;s[66]=o.width;
}
function _ZEN_Component_repeatingGroup_getSettings(s)
{
	s['name'] = 'string';
	s['columnName'] = 'string';
	s['countRows'] = 'integer';
	s['groupByClause'] = 'string';
	s['maxRows'] = 'integer';
	s['onclickitem'] = 'eventHandler';
	s['orderByClause'] = 'string';
	s['parameters'] = 'string';
	s['queryClass'] = 'className';
	s['queryName'] = 'classMember:QUERY';
	s['selectedIndex'] = 'integer';
	s['sql'] = 'sql';
	s['tableName'] = 'string';
	s['whereClause'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_repeatingGroup_itemClickHandler = function(tuple) {
this.selectItem(tuple);
}

self._ZEN_Component_repeatingGroup_selectItem = function(tuple) {
if (this.selectedIndex >= 0) {
var div = this.findElement('div' + (parseInt(this.selectedIndex)+1));
if (div) {
div.className = 'repeatingGroup';
}
}
this.selectedIndex = tuple;
if (this.selectedIndex >= 0) {
var div = this.findElement('div' + (parseInt(this.selectedIndex)+1));
if (div) {
div.className = 'repeatingGroupSelected';
}
}
zenInvokeCallbackMethod(this.onclickitem,this,'onclickitem','item',tuple);
}

self._ZEN_Component_repeatingGroup_setProperty = function(property,value,value2) {
switch(property) {
case 'selectedIndex':
this.selectItem(parseInt(value,10));
break;
case 'parameters':
if ('' != value) {
value = value - 1;
if (this.parameters[value]) {
if (this.parameters[value].value != value2) {
this.parameters[value].value = value2;
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

self._ZEN_Component_repeatingGroup_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_repeatingGroup__Loader = function() {
	zenLoadClass('_ZEN_Component_group');
	_ZEN_Component_repeatingGroup.prototype = zenCreate('_ZEN_Component_group',-1);
	var p = _ZEN_Component_repeatingGroup.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_repeatingGroup;
	p.superClass = ('undefined' == typeof _ZEN_Component_group) ? zenMaster._ZEN_Component_group.prototype:_ZEN_Component_group.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.repeatingGroup';
	p._type = 'repeatingGroup';
	p.serialize = _ZEN_Component_repeatingGroup_serialize;
	p.getSettings = _ZEN_Component_repeatingGroup_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_repeatingGroup_ReallyRefreshContents;
	p.itemClickHandler = _ZEN_Component_repeatingGroup_itemClickHandler;
	p.selectItem = _ZEN_Component_repeatingGroup_selectItem;
	p.setProperty = _ZEN_Component_repeatingGroup_setProperty;
}

self._zenClassIdx['tab'] = '_ZEN_Component_tab';
self._ZEN_Component_tab = function(index,id) {
	if (index>=0) {_ZEN_Component_tab__init(this,index,id);}
}

self._ZEN_Component_tab__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_group__init) ?zenMaster._ZEN_Component_group__init(o,index,id):_ZEN_Component_group__init(o,index,id);
	o.caption = '';
	o.link = '';
	o.tabResource = '';
}
function _ZEN_Component_tab_serialize(set,s)
{
	var o = this;s[0]='228049762';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.caption;s[9]=o.cellAlign;s[10]=o.cellSize;s[11]=o.cellStyle;s[12]=o.cellVAlign;s[13]=set.serializeList(o,o.children,true,'children');s[14]=o.containerStyle;s[15]=(o.disabled?1:0);s[16]=(o.dragEnabled?1:0);s[17]=(o.dropEnabled?1:0);s[18]=(o.dynamic?1:0);s[19]=o.enclosingClass;s[20]=o.enclosingStyle;s[21]=o.error;s[22]=o.groupClass;s[23]=o.groupStyle;s[24]=o.height;s[25]=(o.hidden?1:0);s[26]=o.hint;s[27]=o.hintClass;s[28]=o.hintStyle;s[29]=o.label;s[30]=o.labelClass;s[31]=o.labelDisabledClass;s[32]=o.labelPosition;s[33]=o.labelStyle;s[34]=o.layout;s[35]=o.link;s[36]=o.onafterdrag;s[37]=o.onbeforedrag;s[38]=o.onclick;s[39]=o.ondrag;s[40]=o.ondrop;s[41]=o.onhide;s[42]=o.onrefresh;s[43]=o.onshow;s[44]=o.onupdate;s[45]=o.overlayMode;s[46]=o.renderFlag;s[47]=(o.showLabel?1:0);s[48]=o.slice;s[49]=o.tabResource;s[50]=o.title;s[51]=o.tuple;s[52]=o.valign;s[53]=(o.visible?1:0);s[54]=o.width;
}
function _ZEN_Component_tab_getSettings(s)
{
	s['name'] = 'string';
	s['caption'] = 'caption';
	s['link'] = 'uri';
	s['tabResource'] = 'resource';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_tab_activate = function() {
if (this.parent.getTabIndex) {
this.parent.showTab(this.parent.getTabIndex(this));
return true;
}
return false;
}

self._ZEN_Component_tab_ondisabledHandler = function() {
if (this.parent.tabDisabledHandler) {
this.parent.tabDisabledHandler(this);
}
}

self._ZEN_Component_tab_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_tab__Loader = function() {
	zenLoadClass('_ZEN_Component_group');
	_ZEN_Component_tab.prototype = zenCreate('_ZEN_Component_group',-1);
	var p = _ZEN_Component_tab.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_tab;
	p.superClass = ('undefined' == typeof _ZEN_Component_group) ? zenMaster._ZEN_Component_group.prototype:_ZEN_Component_group.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.tab';
	p._type = 'tab';
	p.serialize = _ZEN_Component_tab_serialize;
	p.getSettings = _ZEN_Component_tab_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_tab_ReallyRefreshContents;
	p.activate = _ZEN_Component_tab_activate;
	p.ondisabledHandler = _ZEN_Component_tab_ondisabledHandler;
}

self._zenClassIdx['tabFrame'] = '_ZEN_Component_tabFrame';
self._ZEN_Component_tabFrame = function(index,id) {
	if (index>=0) {_ZEN_Component_tabFrame__init(this,index,id);}
}

self._ZEN_Component_tabFrame__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_group__init) ?zenMaster._ZEN_Component_group__init(o,index,id):_ZEN_Component_group__init(o,index,id);
}
function _ZEN_Component_tabFrame_serialize(set,s)
{
	var o = this;s[0]='2521056755';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.cellAlign;s[9]=o.cellSize;s[10]=o.cellStyle;s[11]=o.cellVAlign;s[12]=set.serializeList(o,o.children,true,'children');s[13]=o.containerStyle;s[14]=(o.disabled?1:0);s[15]=(o.dragEnabled?1:0);s[16]=(o.dropEnabled?1:0);s[17]=(o.dynamic?1:0);s[18]=o.enclosingClass;s[19]=o.enclosingStyle;s[20]=o.error;s[21]=o.groupClass;s[22]=o.groupStyle;s[23]=o.height;s[24]=(o.hidden?1:0);s[25]=o.hint;s[26]=o.hintClass;s[27]=o.hintStyle;s[28]=o.label;s[29]=o.labelClass;s[30]=o.labelDisabledClass;s[31]=o.labelPosition;s[32]=o.labelStyle;s[33]=o.layout;s[34]=o.onafterdrag;s[35]=o.onbeforedrag;s[36]=o.onclick;s[37]=o.ondrag;s[38]=o.ondrop;s[39]=o.onhide;s[40]=o.onrefresh;s[41]=o.onshow;s[42]=o.onupdate;s[43]=o.overlayMode;s[44]=o.renderFlag;s[45]=(o.showLabel?1:0);s[46]=o.slice;s[47]=o.title;s[48]=o.tuple;s[49]=o.valign;s[50]=(o.visible?1:0);s[51]=o.width;
}
function _ZEN_Component_tabFrame_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_tabFrame_onloadHandler = function() {
this.invokeSuper('onloadHandler',arguments);
ZWL.initTabFrame();
}

self._ZEN_Component_tabFrame_setProperty = function(property,value,value2) {
switch(property) {
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_tabFrame_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_tabFrame__Loader = function() {
	zenLoadClass('_ZEN_Component_group');
	_ZEN_Component_tabFrame.prototype = zenCreate('_ZEN_Component_group',-1);
	var p = _ZEN_Component_tabFrame.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_tabFrame;
	p.superClass = ('undefined' == typeof _ZEN_Component_group) ? zenMaster._ZEN_Component_group.prototype:_ZEN_Component_group.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.tabFrame';
	p._type = 'tabFrame';
	p.serialize = _ZEN_Component_tabFrame_serialize;
	p.getSettings = _ZEN_Component_tabFrame_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_tabFrame_ReallyRefreshContents;
	p.onloadHandler = _ZEN_Component_tabFrame_onloadHandler;
	p.setProperty = _ZEN_Component_tabFrame_setProperty;
}

self._zenClassIdx['tabGroup'] = '_ZEN_Component_tabGroup';
self._ZEN_Component_tabGroup = function(index,id) {
	if (index>=0) {_ZEN_Component_tabGroup__init(this,index,id);}
}

self._ZEN_Component_tabGroup__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_group__init) ?zenMaster._ZEN_Component_group__init(o,index,id):_ZEN_Component_group__init(o,index,id);
	o.currTab = '1';
	o.onhideTab = '';
	o.onshowTab = '';
	o.remember = false;
	o.showBody = true;
	o.showTabBar = false;
}
function _ZEN_Component_tabGroup_serialize(set,s)
{
	var o = this;s[0]='1603362624';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.cellAlign;s[9]=o.cellSize;s[10]=o.cellStyle;s[11]=o.cellVAlign;s[12]=set.serializeList(o,o.children,true,'children');s[13]=o.containerStyle;s[14]=o.currTab;s[15]=(o.disabled?1:0);s[16]=(o.dragEnabled?1:0);s[17]=(o.dropEnabled?1:0);s[18]=(o.dynamic?1:0);s[19]=o.enclosingClass;s[20]=o.enclosingStyle;s[21]=o.error;s[22]=o.groupClass;s[23]=o.groupStyle;s[24]=o.height;s[25]=(o.hidden?1:0);s[26]=o.hint;s[27]=o.hintClass;s[28]=o.hintStyle;s[29]=o.label;s[30]=o.labelClass;s[31]=o.labelDisabledClass;s[32]=o.labelPosition;s[33]=o.labelStyle;s[34]=o.layout;s[35]=o.onafterdrag;s[36]=o.onbeforedrag;s[37]=o.onclick;s[38]=o.ondrag;s[39]=o.ondrop;s[40]=o.onhide;s[41]=o.onhideTab;s[42]=o.onrefresh;s[43]=o.onshow;s[44]=o.onshowTab;s[45]=o.onupdate;s[46]=o.overlayMode;s[47]=(o.remember?1:0);s[48]=o.renderFlag;s[49]=(o.showBody?1:0);s[50]=(o.showLabel?1:0);s[51]=(o.showTabBar?1:0);s[52]=o.slice;s[53]=o.title;s[54]=o.tuple;s[55]=o.valign;s[56]=(o.visible?1:0);s[57]=o.width;
}
function _ZEN_Component_tabGroup_getSettings(s)
{
	s['name'] = 'string';
	s['currTab'] = 'integer';
	s['onhideTab'] = 'eventHandler';
	s['onshowTab'] = 'eventHandler';
	s['remember'] = 'boolean';
	s['showBody'] = 'boolean';
	s['showTabBar'] = 'boolean';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_tabGroup_childrenMutated = function() {
if (this.currTab > this.children.length) {
this.currTab = 0;
}
}

self._ZEN_Component_tabGroup_getCurrTabNo = function() {
return parseInt(this.currTab,10);
}

self._ZEN_Component_tabGroup_getTabBarElement = function() {
return this.findElement('bar');
}

self._ZEN_Component_tabGroup_getTabBodyElement = function() {
return this.findElement('body');
}

self._ZEN_Component_tabGroup_getTabCount = function() {
return this.children.length;
}

self._ZEN_Component_tabGroup_getTabIndex = function(tab) {
return this.getChildIndex(tab) + 1;
}

self._ZEN_Component_tabGroup_ieResizeBody = function() {
var tabBody = this.findElement("body");
if (!tabBody) return;
if (this.children.length<=0) return;
if (tabBody.style.width && tabBody.style.height) return;
if (this.height) {
this.cssHeight=parseInt(this.height,10)+'px';
tabBody.style.height=this.cssHeight;
return;
}
else {
if (this.autoSizeH) var cssH = 'auto';
else var cssH = tabBody.currentStyle.height;
if (cssH == 'auto' || cssH == '') {
var minH=parseInt(tabBody.currentStyle.minHeight,10);
var ofsH = tabBody.offsetHeight;
var scrH = tabBody.scrollHeight;
if (ofsH>=scrH) {
if (ofsH==minH) return; // good enough
this.autoSizeH = true;
tabBody.style.height=minH+"px";
var style = tabBody.currentStyle; // Force display refresh
if (tabBody.scrollHeight>minH) {
tabBody.style.height=tabBody.scrollHeight;
}
}
else { // need to grow to hide scrollbars
this.autoSizeH = true;
tabBody.style.height = scrH+"px";
}
}
else {
tabBody.style.height=cssH;
}
}
}

self._ZEN_Component_tabGroup_onRefreshContents = function() {
this.invokeSuper('onRefreshContents',[]);
if (zenIsIE==1) this.ieResizeBody();
}

self._ZEN_Component_tabGroup_onloadHandler = function() {
if (this.remember) {
var tab = parseInt(zenLoadCookie(this,'currTab'),10);
if (tab > 0) {
this.showTab(tab);
}
}
if (zenIsIE==1) this.ieResizeBody();
}

self._ZEN_Component_tabGroup_setBodySize = function(height,width) {
var body = this.findElement('body');
if (body) {
if (width) {
body.style.width = width + 'px';
}
if (height) {
body.style.height = height + 'px';
}
/*
for (var n = 0; n < this.children.length; n++) {
var div = this.children[n].getEnclosingDiv();
if (div) {
if (width) {
div.style.width = width + 'px';
}
if (height) {
div.style.height = height + 'px';
}
}
}
*/
}
}

self._ZEN_Component_tabGroup_setProperty = function(property,value,value2) {
switch(property) {
case 'remember':
this.remember = value ? true : false;
break;
case 'currTab':
this.showTab(parseInt(value,10));
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_tabGroup_showNextTab = function(skipDisabled) {
if (skipDisabled==true) {
var idx= -1;
var i=parseInt(this.currTab,10);
while (i<this.children.length && idx==-1) {
if (!this.children[i].disabled) idx=i;
i++;
}
if (idx!=-1) this.showTab(idx+1);
}
else this.showTab(parseInt(this.currTab,10)+1);
}

self._ZEN_Component_tabGroup_showPreviousTab = function(skipDisabled) {
if (skipDisabled==true) {
var idx= -2;
var i=parseInt(this.currTab,10)-2;
while (i>=0 && idx==-2) {
if (!this.children[i].disabled) idx=i;
i--;
}
if (idx!=-2) this.showTab(idx+1);
}
else this.showTab(parseInt(this.currTab,10)-1);
}

self._ZEN_Component_tabGroup_showTab = function(tabno) {
if (this.currTab == tabno) return true;
if ((this.children.length >=tabno) && (this.children[tabno-1]) && (this.children[tabno-1].disabled)) return true;
if (this.currTab > 0 && this.children.length > 0) {
var ret = zenInvokeCallbackMethod(this.onhideTab,this,'onhideTab');
if (this.onhideTab != '' && ret!=null && ret==false) {
return false;
}
if (this.children[this.currTab-1]!=undefined) this.children[this.currTab-1].setHidden(true);
if (this.showTabBar) {
var btn = this.findElement('btn_' + (this.currTab));
zenASSERT(btn,"Unable to find tab bar button element (1)",arguments);
btn.className = 'tabGroupButtonOff';
}
if (this.onhideTabHandler) {
this.onhideTabHandler(this.currTab);
}
}
if (tabno <= 0 || tabno > this.children.length) {
this.currTab = 0;
return true;
}
if (this.children[tabno-1].disabled) return true;
this.currTab = tabno;
if (this.currTab > 0) {
this.children[this.currTab-1].setHidden(false);
if (this.showTabBar) {
var btn = this.findElement('btn_' + (this.currTab));
zenASSERT(btn,"Unable to find tab bar button element (2)",arguments);
btn.className = 'tabGroupButtonOn';
}
if (this.onshowTabHandler) {
this.onshowTabHandler(tabno);
}
zenInvokeCallbackMethod(this.onshowTab,this,'onshowTab');
if (zenIsIE==1 && !(zenIsHTML5==null) && !zenIsHTML5) this.ieResizeBody();
}
if (this.remember) {
zenStoreCookie(this,'currTab',this.currTab);
}
return true;
}

self._ZEN_Component_tabGroup_tabDisabledHandler = function(tab) {
var tabno = this.getTabIndex(tab);
if (tabno > 0) {
var btn = this.findElement('btn_' + tabno);
if (btn) {
if (tab.disabled) {
btn.className = 'tabGroupButtonDisabled';
}
else {
btn.className = (tabno==this.currTab) ? 'tabGroupButtonOn' : 'tabGroupButtonOff';
}
}
}
}

self._ZEN_Component_tabGroup_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_tabGroup__Loader = function() {
	zenLoadClass('_ZEN_Component_group');
	_ZEN_Component_tabGroup.prototype = zenCreate('_ZEN_Component_group',-1);
	var p = _ZEN_Component_tabGroup.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_tabGroup;
	p.superClass = ('undefined' == typeof _ZEN_Component_group) ? zenMaster._ZEN_Component_group.prototype:_ZEN_Component_group.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.tabGroup';
	p._type = 'tabGroup';
	p.serialize = _ZEN_Component_tabGroup_serialize;
	p.getSettings = _ZEN_Component_tabGroup_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_tabGroup_ReallyRefreshContents;
	p.childrenMutated = _ZEN_Component_tabGroup_childrenMutated;
	p.getCurrTabNo = _ZEN_Component_tabGroup_getCurrTabNo;
	p.getTabBarElement = _ZEN_Component_tabGroup_getTabBarElement;
	p.getTabBodyElement = _ZEN_Component_tabGroup_getTabBodyElement;
	p.getTabCount = _ZEN_Component_tabGroup_getTabCount;
	p.getTabIndex = _ZEN_Component_tabGroup_getTabIndex;
	p.ieResizeBody = _ZEN_Component_tabGroup_ieResizeBody;
	p.onRefreshContents = _ZEN_Component_tabGroup_onRefreshContents;
	p.onloadHandler = _ZEN_Component_tabGroup_onloadHandler;
	p.setBodySize = _ZEN_Component_tabGroup_setBodySize;
	p.setProperty = _ZEN_Component_tabGroup_setProperty;
	p.showNextTab = _ZEN_Component_tabGroup_showNextTab;
	p.showPreviousTab = _ZEN_Component_tabGroup_showPreviousTab;
	p.showTab = _ZEN_Component_tabGroup_showTab;
	p.tabDisabledHandler = _ZEN_Component_tabGroup_tabDisabledHandler;
}

self._zenClassIdx['vgroup'] = '_ZEN_Component_vgroup';
self._ZEN_Component_vgroup = function(index,id) {
	if (index>=0) {_ZEN_Component_vgroup__init(this,index,id);}
}

self._ZEN_Component_vgroup__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_group__init) ?zenMaster._ZEN_Component_group__init(o,index,id):_ZEN_Component_group__init(o,index,id);
}
function _ZEN_Component_vgroup_serialize(set,s)
{
	var o = this;s[0]='2521056755';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.cellAlign;s[9]=o.cellSize;s[10]=o.cellStyle;s[11]=o.cellVAlign;s[12]=set.serializeList(o,o.children,true,'children');s[13]=o.containerStyle;s[14]=(o.disabled?1:0);s[15]=(o.dragEnabled?1:0);s[16]=(o.dropEnabled?1:0);s[17]=(o.dynamic?1:0);s[18]=o.enclosingClass;s[19]=o.enclosingStyle;s[20]=o.error;s[21]=o.groupClass;s[22]=o.groupStyle;s[23]=o.height;s[24]=(o.hidden?1:0);s[25]=o.hint;s[26]=o.hintClass;s[27]=o.hintStyle;s[28]=o.label;s[29]=o.labelClass;s[30]=o.labelDisabledClass;s[31]=o.labelPosition;s[32]=o.labelStyle;s[33]=o.layout;s[34]=o.onafterdrag;s[35]=o.onbeforedrag;s[36]=o.onclick;s[37]=o.ondrag;s[38]=o.ondrop;s[39]=o.onhide;s[40]=o.onrefresh;s[41]=o.onshow;s[42]=o.onupdate;s[43]=o.overlayMode;s[44]=o.renderFlag;s[45]=(o.showLabel?1:0);s[46]=o.slice;s[47]=o.title;s[48]=o.tuple;s[49]=o.valign;s[50]=(o.visible?1:0);s[51]=o.width;
}
function _ZEN_Component_vgroup_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_vgroup_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_vgroup__Loader = function() {
	zenLoadClass('_ZEN_Component_group');
	_ZEN_Component_vgroup.prototype = zenCreate('_ZEN_Component_group',-1);
	var p = _ZEN_Component_vgroup.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_vgroup;
	p.superClass = ('undefined' == typeof _ZEN_Component_group) ? zenMaster._ZEN_Component_group.prototype:_ZEN_Component_group.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.vgroup';
	p._type = 'vgroup';
	p.serialize = _ZEN_Component_vgroup_serialize;
	p.getSettings = _ZEN_Component_vgroup_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_vgroup_ReallyRefreshContents;
}

self._zenClassIdx['corkboard'] = '_ZEN_Component_corkboard';
self._ZEN_Component_corkboard = function(index,id) {
	if (index>=0) {_ZEN_Component_corkboard__init(this,index,id);}
}

self._ZEN_Component_corkboard__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_abstractDragGroupMgr__init) ?zenMaster._ZEN_Component_abstractDragGroupMgr__init(o,index,id):_ZEN_Component_abstractDragGroupMgr__init(o,index,id);
	o.groupName = 'corkboard';
}
function _ZEN_Component_corkboard_serialize(set,s)
{
	var o = this;s[0]='3167446641';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=set.serializeList(o,o.children,true,'children');s[9]=o.containerStyle;s[10]=(o.disabled?1:0);s[11]=(o.dragEnabled?1:0);s[12]=(o.dropEnabled?1:0);s[13]=(o.dynamic?1:0);s[14]=o.enclosingClass;s[15]=o.enclosingStyle;s[16]=o.error;s[17]=o.groupName;s[18]=o.height;s[19]=(o.hidden?1:0);s[20]=o.hint;s[21]=o.hintClass;s[22]=o.hintStyle;s[23]=o.label;s[24]=o.labelClass;s[25]=o.labelDisabledClass;s[26]=o.labelStyle;s[27]=o.onafterdrag;s[28]=o.onbeforedrag;s[29]=o.ondrag;s[30]=o.ondrop;s[31]=o.onhide;s[32]=o.onrefresh;s[33]=o.onshow;s[34]=o.onupdate;s[35]=o.overlayMode;s[36]=o.renderFlag;s[37]=(o.showLabel?1:0);s[38]=o.slice;s[39]=o.title;s[40]=o.tuple;s[41]=o.valign;s[42]=(o.visible?1:0);s[43]=o.width;
}
function _ZEN_Component_corkboard_getSettings(s)
{
	s['name'] = 'string';
	s['groupName'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_corkboard_onloadHandler = function() {
this.invokeSuper('onloadHandler',arguments);
ZLM.registerManagerClass(this.groupName+"Group",ZLM_VCB.initCorkboard);
ZLM.initLayout();
}

self._ZEN_Component_corkboard_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_corkboard__Loader = function() {
	zenLoadClass('_ZEN_Component_abstractDragGroupMgr');
	_ZEN_Component_corkboard.prototype = zenCreate('_ZEN_Component_abstractDragGroupMgr',-1);
	var p = _ZEN_Component_corkboard.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_corkboard;
	p.superClass = ('undefined' == typeof _ZEN_Component_abstractDragGroupMgr) ? zenMaster._ZEN_Component_abstractDragGroupMgr.prototype:_ZEN_Component_abstractDragGroupMgr.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.corkboard';
	p._type = 'corkboard';
	p.serialize = _ZEN_Component_corkboard_serialize;
	p.getSettings = _ZEN_Component_corkboard_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_corkboard_ReallyRefreshContents;
	p.onloadHandler = _ZEN_Component_corkboard_onloadHandler;
}

self._zenClassIdx['desktop'] = '_ZEN_Component_desktop';
self._ZEN_Component_desktop = function(index,id) {
	if (index>=0) {_ZEN_Component_desktop__init(this,index,id);}
}

self._ZEN_Component_desktop__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_abstractDragGroupMgr__init) ?zenMaster._ZEN_Component_abstractDragGroupMgr__init(o,index,id):_ZEN_Component_abstractDragGroupMgr__init(o,index,id);
	o.colStyle = '';
	o.groupName = 'desktop';
	o.rowStyle = 'ALIGN_ROW_TOP';
}
function _ZEN_Component_desktop_serialize(set,s)
{
	var o = this;s[0]='3067160877';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=set.serializeList(o,o.children,true,'children');s[9]=o.colStyle;s[10]=o.containerStyle;s[11]=(o.disabled?1:0);s[12]=(o.dragEnabled?1:0);s[13]=(o.dropEnabled?1:0);s[14]=(o.dynamic?1:0);s[15]=o.enclosingClass;s[16]=o.enclosingStyle;s[17]=o.error;s[18]=o.groupName;s[19]=o.height;s[20]=(o.hidden?1:0);s[21]=o.hint;s[22]=o.hintClass;s[23]=o.hintStyle;s[24]=o.label;s[25]=o.labelClass;s[26]=o.labelDisabledClass;s[27]=o.labelStyle;s[28]=o.onafterdrag;s[29]=o.onbeforedrag;s[30]=o.ondrag;s[31]=o.ondrop;s[32]=o.onhide;s[33]=o.onrefresh;s[34]=o.onshow;s[35]=o.onupdate;s[36]=o.overlayMode;s[37]=o.renderFlag;s[38]=o.rowStyle;s[39]=(o.showLabel?1:0);s[40]=o.slice;s[41]=o.title;s[42]=o.tuple;s[43]=o.valign;s[44]=(o.visible?1:0);s[45]=o.width;
}
function _ZEN_Component_desktop_getSettings(s)
{
	s['name'] = 'string';
	s['colStyle'] = 'enum:,FILL_COLUMN,ALIGN_COLUMN_LEFT,ALIGN_COLUMN_CENTER,ALIGN_COLUMN_RIGHT,FILL_WIDTH,ALIGN_WIDTH_LEFT,ALIGN_WIDTH_CENTER,ALIGN_WIDTH_RIGHT,FILL_UNIFORM,ALIGN_UNIFORM_LEFT,ALIGN_UNIFORM_CENTER,ALIGN_UNIFORM_RIGHT';
	s['groupName'] = 'string';
	s['rowStyle'] = 'enum:FILL_ROW,ALIGN_ROW_TOP,ALIGN_ROW_CENTER,ALIGN_ROW_BOTTOM,FILL_UNIFORM,ALIGN_UNIFORM_TOP,ALIGN_UNIFORM_CENTER,ALIGN_UNIFORM_BOTTOM';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_desktop_doDeferredRefresh = function() {
var manager = this.getGroupManager();
if (manager) {
manager.resynchronize(this.getEnclosingDiv().firstChild);
}
}

self._ZEN_Component_desktop_getState = function() {
var manager = this.getGroupManager();
if (manager) {
return(manager.getStateString());
}
return(null);
}

self._ZEN_Component_desktop_onRefreshContents = function() {
setTimeout("zen('"+this.id+"').doDeferredRefresh();",0); // update AFTER the reset of the page
}

self._ZEN_Component_desktop_onloadHandler = function() {
this.invokeSuper('onloadHandler',arguments);
ZLM.registerManagerClass(this.groupName+"Group",ZLM_VDP.initDesktop);
ZLM.initLayout();
}

self._ZEN_Component_desktop_restoreState = function(layout) {
var manager = this.getGroupManager();
if (manager) {
manager.restoreState(layout);
}
}

self._ZEN_Component_desktop_setColumnStyle = function(style) {
var manager = this.getGroupManager();
if (manager) {
manager.setColumnStyle(style);
}
}

self._ZEN_Component_desktop_setHorizontalGap = function(size) {
var manager = this.getGroupManager();
if (manager) {
manager.setHorizontalGap(size);
}
}

self._ZEN_Component_desktop_setLeftMargin = function(size) {
var manager = this.getGroupManager();
if (manager) {
manager.setLeftMargin(size);
}
}

self._ZEN_Component_desktop_setProperty = function(property,value,value2) {
switch(property) {
case 'rowStyle':
this.setRowStyle(value);
break;
case 'colStyle' :
this.setColStyle(value);
break;
case 'width' :
var desk = this.getEnclosingDiv();
desk.style.width = value;
break;
case 'height' :
var desk = this.getEnclosingDiv();
desk.style.height = value;
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_desktop_setRowStyle = function(style) {
var manager = this.getGroupManager();
if (manager) {
manager.setRowStyle(style);
}
}

self._ZEN_Component_desktop_setTopMargin = function(size) {
var manager = this.getGroupManager();
if (manager) {
manager.setTopMargin(size);
}
}

self._ZEN_Component_desktop_setVerticalGap = function(size) {
var manager = this.getGroupManager();
if (manager) {
manager.setVerticalGap(size);
}
}

self._ZEN_Component_desktop_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_desktop__Loader = function() {
	zenLoadClass('_ZEN_Component_abstractDragGroupMgr');
	_ZEN_Component_desktop.prototype = zenCreate('_ZEN_Component_abstractDragGroupMgr',-1);
	var p = _ZEN_Component_desktop.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_desktop;
	p.superClass = ('undefined' == typeof _ZEN_Component_abstractDragGroupMgr) ? zenMaster._ZEN_Component_abstractDragGroupMgr.prototype:_ZEN_Component_abstractDragGroupMgr.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.desktop';
	p._type = 'desktop';
	p.serialize = _ZEN_Component_desktop_serialize;
	p.getSettings = _ZEN_Component_desktop_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_desktop_ReallyRefreshContents;
	p.doDeferredRefresh = _ZEN_Component_desktop_doDeferredRefresh;
	p.getState = _ZEN_Component_desktop_getState;
	p.onRefreshContents = _ZEN_Component_desktop_onRefreshContents;
	p.onloadHandler = _ZEN_Component_desktop_onloadHandler;
	p.restoreState = _ZEN_Component_desktop_restoreState;
	p.setColumnStyle = _ZEN_Component_desktop_setColumnStyle;
	p.setHorizontalGap = _ZEN_Component_desktop_setHorizontalGap;
	p.setLeftMargin = _ZEN_Component_desktop_setLeftMargin;
	p.setProperty = _ZEN_Component_desktop_setProperty;
	p.setRowStyle = _ZEN_Component_desktop_setRowStyle;
	p.setTopMargin = _ZEN_Component_desktop_setTopMargin;
	p.setVerticalGap = _ZEN_Component_desktop_setVerticalGap;
}

self._zenClassIdx['hmenu'] = '_ZEN_Component_hmenu';
self._ZEN_Component_hmenu = function(index,id) {
	if (index>=0) {_ZEN_Component_hmenu__init(this,index,id);}
}

self._ZEN_Component_hmenu__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_menu__init) ?zenMaster._ZEN_Component_menu__init(o,index,id):_ZEN_Component_menu__init(o,index,id);
	o.caption = '';
	o.cellAlign = 'left';
	o.disabled = false;
	o.groupClass = 'hmenuTable';
	o.help = '';
	o.image = '';
	o.imageHeight = '16';
	o.imageWidth = '16';
	o.link = '';
	o.linkResource = '';
	o.onclick = '';
	o.secureCallback = '';
	o.secureLink = '';
	o.target = '';
	o.width = '100%';
}
function _ZEN_Component_hmenu_serialize(set,s)
{
	var o = this;s[0]='639506262';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.caption;s[9]=o.cellAlign;s[10]=o.cellSize;s[11]=o.cellStyle;s[12]=o.cellVAlign;s[13]=set.serializeList(o,o.children,true,'children');s[14]=o.containerStyle;s[15]=(o.disabled?1:0);s[16]=(o.dragEnabled?1:0);s[17]=(o.dropEnabled?1:0);s[18]=(o.dynamic?1:0);s[19]=o.enclosingClass;s[20]=o.enclosingStyle;s[21]=o.error;s[22]=o.groupClass;s[23]=o.groupStyle;s[24]=o.height;s[25]=o.help;s[26]=(o.hidden?1:0);s[27]=o.hint;s[28]=o.hintClass;s[29]=o.hintStyle;s[30]=o.image;s[31]=o.imageHeight;s[32]=o.imageWidth;s[33]=o.label;s[34]=o.labelClass;s[35]=o.labelDisabledClass;s[36]=o.labelPosition;s[37]=o.labelStyle;s[38]=o.layout;s[39]=o.link;s[40]=o.linkResource;s[41]=o.onactivate;s[42]=o.onafterdrag;s[43]=o.onbeforedrag;s[44]=o.onclick;s[45]=o.ondrag;s[46]=o.ondrop;s[47]=o.onhide;s[48]=o.onrefresh;s[49]=o.onshow;s[50]=o.onshowHelp;s[51]=o.onupdate;s[52]=o.overlayMode;s[53]=o.renderFlag;s[54]=o.secureCallback;s[55]=o.secureLink;s[56]=(o.showLabel?1:0);s[57]=o.slice;s[58]=(o.subMenuActive?1:0);s[59]=o.subMenuLevel;s[60]=o.target;s[61]=o.title;s[62]=o.tuple;s[63]=o.valign;s[64]=(o.visible?1:0);s[65]=o.width;
}
function _ZEN_Component_hmenu_getSettings(s)
{
	s['name'] = 'string';
	s['caption'] = 'caption';
	s['disabled'] = 'boolean';
	s['help'] = 'caption';
	s['image'] = 'uri';
	s['imageHeight'] = 'length';
	s['imageWidth'] = 'length';
	s['link'] = 'uri';
	s['linkResource'] = 'resource';
	s['onclick'] = 'eventHandler';
	s['secureCallback'] = 'string';
	s['secureLink'] = 'string';
	s['target'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_hmenu_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_hmenu__Loader = function() {
	zenLoadClass('_ZEN_Component_menu');
	_ZEN_Component_hmenu.prototype = zenCreate('_ZEN_Component_menu',-1);
	var p = _ZEN_Component_hmenu.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_hmenu;
	p.superClass = ('undefined' == typeof _ZEN_Component_menu) ? zenMaster._ZEN_Component_menu.prototype:_ZEN_Component_menu.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.hmenu';
	p._type = 'hmenu';
	p.serialize = _ZEN_Component_hmenu_serialize;
	p.getSettings = _ZEN_Component_hmenu_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_hmenu_ReallyRefreshContents;
}

self._zenClassIdx['lookoutMenu'] = '_ZEN_Component_lookoutMenu';
self._ZEN_Component_lookoutMenu = function(index,id) {
	if (index>=0) {_ZEN_Component_lookoutMenu__init(this,index,id);}
}

self._ZEN_Component_lookoutMenu__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_tabGroup__init) ?zenMaster._ZEN_Component_tabGroup__init(o,index,id):_ZEN_Component_tabGroup__init(o,index,id);
	o.cellVAlign = 'top';
	o.enclosingClass = 'lookoutMenu';
	o.expandable = false;
	o.expanded = true;
	o.oncontract = '';
	o.onexpand = '';
}
function _ZEN_Component_lookoutMenu_serialize(set,s)
{
	var o = this;s[0]='4282856998';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.cellAlign;s[9]=o.cellSize;s[10]=o.cellStyle;s[11]=o.cellVAlign;s[12]=set.serializeList(o,o.children,true,'children');s[13]=o.containerStyle;s[14]=o.currTab;s[15]=(o.disabled?1:0);s[16]=(o.dragEnabled?1:0);s[17]=(o.dropEnabled?1:0);s[18]=(o.dynamic?1:0);s[19]=o.enclosingClass;s[20]=o.enclosingStyle;s[21]=o.error;s[22]=(o.expandable?1:0);s[23]=(o.expanded?1:0);s[24]=o.groupClass;s[25]=o.groupStyle;s[26]=o.height;s[27]=(o.hidden?1:0);s[28]=o.hint;s[29]=o.hintClass;s[30]=o.hintStyle;s[31]=o.label;s[32]=o.labelClass;s[33]=o.labelDisabledClass;s[34]=o.labelPosition;s[35]=o.labelStyle;s[36]=o.layout;s[37]=o.onafterdrag;s[38]=o.onbeforedrag;s[39]=o.onclick;s[40]=o.oncontract;s[41]=o.ondrag;s[42]=o.ondrop;s[43]=o.onexpand;s[44]=o.onhide;s[45]=o.onhideTab;s[46]=o.onrefresh;s[47]=o.onshow;s[48]=o.onshowTab;s[49]=o.onupdate;s[50]=o.overlayMode;s[51]=(o.remember?1:0);s[52]=o.renderFlag;s[53]=(o.showBody?1:0);s[54]=(o.showLabel?1:0);s[55]=(o.showTabBar?1:0);s[56]=o.slice;s[57]=o.title;s[58]=o.tuple;s[59]=o.valign;s[60]=(o.visible?1:0);s[61]=o.width;
}
function _ZEN_Component_lookoutMenu_getSettings(s)
{
	s['name'] = 'string';
	s['expandable'] = 'boolean';
	s['expanded'] = 'boolean';
	s['oncontract'] = 'eventHandler';
	s['onexpand'] = 'eventHandler';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_lookoutMenu_adjustTabs = function() {
var enc = this.getEnclosingDiv();
var encWid = (enc.offsetWidth<2) ? 2 : enc.offsetWidth;
if (enc.offsetWidth==0 && enc.offsetHeight==0) {
this.adjustTabsOffscreen();
return;
}
this.reallyAdjustTabs();
}

self._ZEN_Component_lookoutMenu_adjustTabsOffscreen = function() {
var enc = this.getEnclosingDiv();
if (enc.style.height=="") {
if (this.height) enc.style.height=this.height+"px";
}
if (enc.style.width=="") {
if (this.width) enc.style.width=this.width+"px";
}
var oldP = enc.parentNode;
document.body.appendChild(enc);
this.reallyAdjustTabs();
document.body.removeChild(enc);
oldP.appendChild(enc);
}

self._ZEN_Component_lookoutMenu_getExpanded = function() {
return this.expanded;
}

self._ZEN_Component_lookoutMenu_gripClickHandler = function() {
this.setExpanded(!this.getExpanded());
}

self._ZEN_Component_lookoutMenu_onRefreshContents = function() {
this.invokeSuper('onRefreshContents',[]);
this.adjustTabs();
}

self._ZEN_Component_lookoutMenu_onloadHandler = function() {
this.adjustTabs();
if (this.disabled && this.parent && !this.parent.disabled) {
this.setProperty('disabled',true);
}
this.invokeSuper('onloadHandler',arguments);
}

self._ZEN_Component_lookoutMenu_onshowTabHandler = function(tabno) {
this.adjustTabs();
}

self._ZEN_Component_lookoutMenu_reallyAdjustTabs = function() {
var enc = this.getEnclosingDiv();
var encWid = (enc.offsetWidth<2) ? 2 : enc.offsetWidth;
var grip = this.findElement("grip");
var gripHeight = (grip ? grip.offsetHeight : 0);
if (('' == enc.style.height) && enc.offsetHeight < 50) {
var btn = this.findElement("btn_1");
if (btn) {
enc.style.height = (btn.offsetHeight*(this.children.length+2)) + 'px';
}
else {
enc.style.height = '100px';
}
}
if (0 == this.children.length) return;
var currTab = this.currTab > 0 ? this.currTab : this.children.length;
var top = 0;
var y1 = top + gripHeight;
for (var n = 1; n <= currTab; n++) {
var btn = this.findElement("btn_" + n);
btn.style.top = y1 + "px";
btn.style.width = (encWid - 2)+"px";
y1 += btn.offsetHeight;
}
var adj = 0;
var y2 = top + enc.offsetHeight;
var btn = this.findElement("btn_1");
var btnHgt = btn.offsetHeight;
var test = y2 - ((this.children.length + 3 - currTab)*btnHgt);
if (test < y1) {
adj = y1 - test;
}
for (var n = this.children.length; n > currTab; n--) {
var btn = this.findElement("btn_" + n);
y2 -= btn.offsetHeight;
btn.style.top = (y2 +adj-btn.offsetHeight)+"px";
btn.style.width = (encWid - 2)+"px";
}
if (this.currTab > 0 && this.children.length > 0) {
var tab = this.children[this.currTab-1];
if (tab) {
var div = tab.getEnclosingDiv();
div.className = 'lookoutTab';
div.style.width = (encWid - (zenIsIE ? 2 : 4))+"px";
div.style.top = y1+"px";
var h = (y2 - y1 - btnHgt - 2);
if (h<2*btnHgt) h = 2*btnHgt;
div.style.height = h+'px';
}
}
}

self._ZEN_Component_lookoutMenu_setExpanded = function(flag) {
this.expanded = flag;
if (!this.expandable) return;
var div = this.findElement('menuChildren');
zenASSERT(div,'Unable to find div element for children',arguments);
var img = this.findElement('image');
if (this.expanded) {
zenInvokeCallbackMethod(this.onexpand,this,'onexpand');
}
else {
zenInvokeCallbackMethod(this.oncontract,this,'oncontract');
}
div.style.display = this.expanded ? '' : 'none';
if (img) {
img.src = this.expanded ? this.imageExpanded : this.imageContracted;
}
}

self._ZEN_Component_lookoutMenu_setProperty = function(property,value,value2) {
switch(property) {
case 'expanded':
value = value ? true : false;
this.setExpanded(value);
this
break;
case 'expandable':
value = value ? true : false;
this.expandable = value;
this.refreshContents();
break;
default:
return this.invokeSuper('setProperty',arguments);
break;
}
return true;
}

self._ZEN_Component_lookoutMenu_setSize = function(width,height) {
width = parseInt(width,10);
height = parseInt(height,10);
var enc = this.getEnclosingDiv();
if (this.expandable && !this.expanded) {
var grip = this.findElement("grip");
enc.style.height = (grip ? grip.offsetHeight : '0px');
enc.style.width = '12px';
}
else {
if (!isNaN(height)) {
enc.style.height = height + 'px';
}
if (!isNaN(width)) {
enc.style.width = width + 'px';
}
}
this.height = height;
this.width = width;
this.adjustTabs();
}

self._ZEN_Component_lookoutMenu_tabDisabledHandler = function(tab) {
for (var n = 0; n < this.children.length; n++) {
var child = this.children[n];
if (tab == child) {
var btn = this.findElement("btn_" + (n+1));
btn.disabled = tab.disabled;
if (this.currTab == (n+1)) {
this.showTab(0);
this.adjustTabs();
}
break;
}
}
}

self._ZEN_Component_lookoutMenu_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_lookoutMenu__Loader = function() {
	zenLoadClass('_ZEN_Component_tabGroup');
	_ZEN_Component_lookoutMenu.prototype = zenCreate('_ZEN_Component_tabGroup',-1);
	var p = _ZEN_Component_lookoutMenu.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_lookoutMenu;
	p.superClass = ('undefined' == typeof _ZEN_Component_tabGroup) ? zenMaster._ZEN_Component_tabGroup.prototype:_ZEN_Component_tabGroup.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.lookoutMenu';
	p._type = 'lookoutMenu';
	p.serialize = _ZEN_Component_lookoutMenu_serialize;
	p.getSettings = _ZEN_Component_lookoutMenu_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_lookoutMenu_ReallyRefreshContents;
	p.adjustTabs = _ZEN_Component_lookoutMenu_adjustTabs;
	p.adjustTabsOffscreen = _ZEN_Component_lookoutMenu_adjustTabsOffscreen;
	p.getExpanded = _ZEN_Component_lookoutMenu_getExpanded;
	p.gripClickHandler = _ZEN_Component_lookoutMenu_gripClickHandler;
	p.onRefreshContents = _ZEN_Component_lookoutMenu_onRefreshContents;
	p.onloadHandler = _ZEN_Component_lookoutMenu_onloadHandler;
	p.onshowTabHandler = _ZEN_Component_lookoutMenu_onshowTabHandler;
	p.reallyAdjustTabs = _ZEN_Component_lookoutMenu_reallyAdjustTabs;
	p.setExpanded = _ZEN_Component_lookoutMenu_setExpanded;
	p.setProperty = _ZEN_Component_lookoutMenu_setProperty;
	p.setSize = _ZEN_Component_lookoutMenu_setSize;
	p.tabDisabledHandler = _ZEN_Component_lookoutMenu_tabDisabledHandler;
}

self._zenClassIdx['page'] = '_ZEN_Component_page';
self._ZEN_Component_page = function(index,id) {
	if (index>=0) {_ZEN_Component_page__init(this,index,id);}
}

self._ZEN_Component_page__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_abstractPage__init) ?zenMaster._ZEN_Component_abstractPage__init(o,index,id):_ZEN_Component_abstractPage__init(o,index,id);
	o.useSoftModals = true;
}
function _ZEN_Component_page_serialize(set,s)
{
	var o = this;s[0]='4277539460';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.SVGClassList;s[7]=o.UserSVGPackageList;s[8]=o.align;s[9]=o.aux;s[10]=o.backgroundTimerInterval;s[11]=o.cellAlign;s[12]=o.cellSize;s[13]=o.cellStyle;s[14]=o.cellVAlign;s[15]=set.serializeList(o,o.children,true,'children');s[16]=o.containerStyle;s[17]=o.cssLevel;s[18]=(o.designMode?1:0);s[19]=(o.disabled?1:0);s[20]=(o.dragAndDrop?1:0);s[21]=(o.dragEnabled?1:0);s[22]=(o.dropEnabled?1:0);s[23]=(o.dynamic?1:0);s[24]=o.enclosingClass;s[25]=o.enclosingStyle;s[26]=o.error;s[27]=o.groupClass;s[28]=o.groupStyle;s[29]=o.height;s[30]=(o.hidden?1:0);s[31]=o.hint;s[32]=o.hintClass;s[33]=o.hintStyle;s[34]=(o.inlineSVG?1:0);s[35]=(o.isPopup?1:0);s[36]=(o.isSoftModal?1:0);s[37]=o.label;s[38]=o.labelClass;s[39]=o.labelDisabledClass;s[40]=o.labelPosition;s[41]=o.labelStyle;s[42]=o.lastModalIndex;s[43]=o.layout;s[44]=o.nextIndex;s[45]=o.onafterdrag;s[46]=o.onbeforedrag;s[47]=o.onclick;s[48]=o.ondrag;s[49]=o.ondrop;s[50]=o.onhide;s[51]=o.onoverlay;s[52]=o.onrefresh;s[53]=o.onshow;s[54]=o.onupdate;s[55]=o.overlayMode;s[56]=o.popupParent;s[57]=o.renderFlag;s[58]=(o.showLabel?1:0);s[59]=o.slice;s[60]=o.title;s[61]=o.tuple;s[62]=(o.useSVG?1:0);s[63]=(o.useSoftModals?1:0);s[64]=o.valign;s[65]=(o.visible?1:0);s[66]=o.width;s[67]=(o.zenPersistentPopup?1:0);
}
function _ZEN_Component_page_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_page_JavaInstalled = function() {
	return zenClassMethod(this,'JavaInstalled','','BOOLEAN',arguments);
}

self._ZEN_Component_page_LoadZenComponent = function(pNamespace,pName,pClassName,pCSSLevel) {
	return zenClassMethod(this,'LoadZenComponent','L,L,L,L','BOOLEAN',arguments);
}

self._ZEN_Component_page_MonitorBackgroundTask = function(pTaskID) {
	zenClassMethod(this,'MonitorBackgroundTask','L','',arguments);
}

self._ZEN_Component_page_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_page__Loader = function() {
	zenLoadClass('_ZEN_Component_abstractPage');
	_ZEN_Component_page.prototype = zenCreate('_ZEN_Component_abstractPage',-1);
	var p = _ZEN_Component_page.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_page;
	p.superClass = ('undefined' == typeof _ZEN_Component_abstractPage) ? zenMaster._ZEN_Component_abstractPage.prototype:_ZEN_Component_abstractPage.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.page';
	p._type = 'page';
	p.serialize = _ZEN_Component_page_serialize;
	p.getSettings = _ZEN_Component_page_getSettings;
	p.JavaInstalled = _ZEN_Component_page_JavaInstalled;
	p.LoadZenComponent = _ZEN_Component_page_LoadZenComponent;
	p.MonitorBackgroundTask = _ZEN_Component_page_MonitorBackgroundTask;
	p.ReallyRefreshContents = _ZEN_Component_page_ReallyRefreshContents;
}

self._zenClassIdx['snapGrid'] = '_ZEN_Component_snapGrid';
self._ZEN_Component_snapGrid = function(index,id) {
	if (index>=0) {_ZEN_Component_snapGrid__init(this,index,id);}
}

self._ZEN_Component_snapGrid__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_abstractDragGroupMgr__init) ?zenMaster._ZEN_Component_abstractDragGroupMgr__init(o,index,id):_ZEN_Component_abstractDragGroupMgr__init(o,index,id);
	o.cols = '3';
	o.colsLandscape = '';
	o.colsPortrait = '';
	o.groupName = 'snapGrid';
	o.rows = '2';
	o.rowsLandscape = '';
	o.rowsPortrait = '';
}
function _ZEN_Component_snapGrid_serialize(set,s)
{
	var o = this;s[0]='413071784';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=set.serializeList(o,o.children,true,'children');s[9]=o.cols;s[10]=o.colsLandscape;s[11]=o.colsPortrait;s[12]=o.containerStyle;s[13]=(o.disabled?1:0);s[14]=(o.dragEnabled?1:0);s[15]=(o.dropEnabled?1:0);s[16]=(o.dynamic?1:0);s[17]=o.enclosingClass;s[18]=o.enclosingStyle;s[19]=o.error;s[20]=o.groupName;s[21]=o.height;s[22]=(o.hidden?1:0);s[23]=o.hint;s[24]=o.hintClass;s[25]=o.hintStyle;s[26]=o.label;s[27]=o.labelClass;s[28]=o.labelDisabledClass;s[29]=o.labelStyle;s[30]=o.onafterdrag;s[31]=o.onbeforedrag;s[32]=o.ondrag;s[33]=o.ondrop;s[34]=o.onhide;s[35]=o.onrefresh;s[36]=o.onshow;s[37]=o.onupdate;s[38]=o.overlayMode;s[39]=o.renderFlag;s[40]=o.rows;s[41]=o.rowsLandscape;s[42]=o.rowsPortrait;s[43]=(o.showLabel?1:0);s[44]=o.slice;s[45]=o.title;s[46]=o.tuple;s[47]=o.valign;s[48]=(o.visible?1:0);s[49]=o.width;
}
function _ZEN_Component_snapGrid_getSettings(s)
{
	s['name'] = 'string';
	s['cols'] = 'integer';
	s['colsLandscape'] = 'integer';
	s['colsPortrait'] = 'integer';
	s['groupName'] = 'string';
	s['rows'] = 'integer';
	s['rowsLandscape'] = 'integer';
	s['rowsPortrait'] = 'integer';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_snapGrid_onloadHandler = function() {
this.invokeSuper('onloadHandler',arguments);
ZLM.registerManagerClass(this.groupName+"Group",ZLM_VSG.initSnapGrid);
ZLM.initLayout();
}

self._ZEN_Component_snapGrid_setProperty = function(property,value,value2) {
var mgr = this.getGroupManager();
switch(property) {
case "cols":
this.cols = value;
mgr.setNumberOfColumns(parseInt(value,10));
break;
case "rows":
this.rows = value;
mgr.setNumberOfRows(parseInt(value,10));
break;
case 'width':
case 'height':
this[property] = value;
eDiv = this.getEnclosingDiv();
eDiv.style[property]=value;
this.forceResize();
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_snapGrid_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_snapGrid__Loader = function() {
	zenLoadClass('_ZEN_Component_abstractDragGroupMgr');
	_ZEN_Component_snapGrid.prototype = zenCreate('_ZEN_Component_abstractDragGroupMgr',-1);
	var p = _ZEN_Component_snapGrid.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_snapGrid;
	p.superClass = ('undefined' == typeof _ZEN_Component_abstractDragGroupMgr) ? zenMaster._ZEN_Component_abstractDragGroupMgr.prototype:_ZEN_Component_abstractDragGroupMgr.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.snapGrid';
	p._type = 'snapGrid';
	p.serialize = _ZEN_Component_snapGrid_serialize;
	p.getSettings = _ZEN_Component_snapGrid_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_snapGrid_ReallyRefreshContents;
	p.onloadHandler = _ZEN_Component_snapGrid_onloadHandler;
	p.setProperty = _ZEN_Component_snapGrid_setProperty;
}

self._zenClassIdx['vmenu'] = '_ZEN_Component_vmenu';
self._ZEN_Component_vmenu = function(index,id) {
	if (index>=0) {_ZEN_Component_vmenu__init(this,index,id);}
}

self._ZEN_Component_vmenu__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_menu__init) ?zenMaster._ZEN_Component_menu__init(o,index,id):_ZEN_Component_menu__init(o,index,id);
	o.caption = '';
	o.cellVAlign = 'top';
	o.disabled = false;
	o.enclosingClass = 'vmenu';
	o.groupClass = 'vmenuTable';
	o.help = '';
	o.image = '';
	o.imageHeight = '16';
	o.imageWidth = '16';
	o.layout = 'vertical';
	o.link = '';
	o.linkResource = '';
	o.onclick = '';
	o.secureCallback = '';
	o.secureLink = '';
	o.target = '';
}
function _ZEN_Component_vmenu_serialize(set,s)
{
	var o = this;s[0]='639506262';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.caption;s[9]=o.cellAlign;s[10]=o.cellSize;s[11]=o.cellStyle;s[12]=o.cellVAlign;s[13]=set.serializeList(o,o.children,true,'children');s[14]=o.containerStyle;s[15]=(o.disabled?1:0);s[16]=(o.dragEnabled?1:0);s[17]=(o.dropEnabled?1:0);s[18]=(o.dynamic?1:0);s[19]=o.enclosingClass;s[20]=o.enclosingStyle;s[21]=o.error;s[22]=o.groupClass;s[23]=o.groupStyle;s[24]=o.height;s[25]=o.help;s[26]=(o.hidden?1:0);s[27]=o.hint;s[28]=o.hintClass;s[29]=o.hintStyle;s[30]=o.image;s[31]=o.imageHeight;s[32]=o.imageWidth;s[33]=o.label;s[34]=o.labelClass;s[35]=o.labelDisabledClass;s[36]=o.labelPosition;s[37]=o.labelStyle;s[38]=o.layout;s[39]=o.link;s[40]=o.linkResource;s[41]=o.onactivate;s[42]=o.onafterdrag;s[43]=o.onbeforedrag;s[44]=o.onclick;s[45]=o.ondrag;s[46]=o.ondrop;s[47]=o.onhide;s[48]=o.onrefresh;s[49]=o.onshow;s[50]=o.onshowHelp;s[51]=o.onupdate;s[52]=o.overlayMode;s[53]=o.renderFlag;s[54]=o.secureCallback;s[55]=o.secureLink;s[56]=(o.showLabel?1:0);s[57]=o.slice;s[58]=(o.subMenuActive?1:0);s[59]=o.subMenuLevel;s[60]=o.target;s[61]=o.title;s[62]=o.tuple;s[63]=o.valign;s[64]=(o.visible?1:0);s[65]=o.width;
}
function _ZEN_Component_vmenu_getSettings(s)
{
	s['name'] = 'string';
	s['caption'] = 'caption';
	s['disabled'] = 'boolean';
	s['help'] = 'caption';
	s['image'] = 'uri';
	s['imageHeight'] = 'length';
	s['imageWidth'] = 'length';
	s['link'] = 'uri';
	s['linkResource'] = 'resource';
	s['onclick'] = 'eventHandler';
	s['secureCallback'] = 'string';
	s['secureLink'] = 'string';
	s['target'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_vmenu_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_vmenu__Loader = function() {
	zenLoadClass('_ZEN_Component_menu');
	_ZEN_Component_vmenu.prototype = zenCreate('_ZEN_Component_menu',-1);
	var p = _ZEN_Component_vmenu.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_vmenu;
	p.superClass = ('undefined' == typeof _ZEN_Component_menu) ? zenMaster._ZEN_Component_menu.prototype:_ZEN_Component_menu.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.vmenu';
	p._type = 'vmenu';
	p.serialize = _ZEN_Component_vmenu_serialize;
	p.getSettings = _ZEN_Component_vmenu_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_vmenu_ReallyRefreshContents;
}
/* EOF */