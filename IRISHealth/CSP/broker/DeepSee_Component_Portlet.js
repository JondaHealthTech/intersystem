/*** Zen Module: DeepSee_Component_Portlet ***/

self._zenClassIdx['http://www.intersystems.com/deepsee/abstractPortlet'] = '_DeepSee_Component_Portlet_abstractPortlet';
self._DeepSee_Component_Portlet_abstractPortlet = function(index,id) {
	if (index>=0) {_DeepSee_Component_Portlet_abstractPortlet__init(this,index,id);}
}

self._DeepSee_Component_Portlet_abstractPortlet__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.controller = '';
	o.controllerId = '';
	o.ongetcontroller = '';
	o.onnotifyView = '';
}
function _DeepSee_Component_Portlet_abstractPortlet_serialize(set,s)
{
	var o = this;s[0]='1651304131';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.containerStyle;s[9]=o.controller;s[10]=o.controllerId;s[11]=(o.dragEnabled?1:0);s[12]=(o.dropEnabled?1:0);s[13]=(o.dynamic?1:0);s[14]=o.enclosingClass;s[15]=o.enclosingStyle;s[16]=o.error;s[17]=o.height;s[18]=(o.hidden?1:0);s[19]=o.hint;s[20]=o.hintClass;s[21]=o.hintStyle;s[22]=o.label;s[23]=o.labelClass;s[24]=o.labelDisabledClass;s[25]=o.labelStyle;s[26]=o.onafterdrag;s[27]=o.onbeforedrag;s[28]=o.ondrag;s[29]=o.ondrop;s[30]=o.ongetcontroller;s[31]=o.onhide;s[32]=o.onnotifyView;s[33]=o.onrefresh;s[34]=o.onshow;s[35]=o.onupdate;s[36]=o.overlayMode;s[37]=o.renderFlag;s[38]=(o.showLabel?1:0);s[39]=o.slice;s[40]=o.title;s[41]=o.tuple;s[42]=o.valign;s[43]=(o.visible?1:0);s[44]=o.width;
}
function _DeepSee_Component_Portlet_abstractPortlet_getSettings(s)
{
	s['name'] = 'string';
	s['controllerId'] = 'id';
	s['ongetcontroller'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	this.invokeSuper('getSettings',arguments);
}

self._DeepSee_Component_Portlet_abstractPortlet_connectToController = function() {
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

self._DeepSee_Component_Portlet_abstractPortlet_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._DeepSee_Component_Portlet_abstractPortlet_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._DeepSee_Component_Portlet_abstractPortlet_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._DeepSee_Component_Portlet_abstractPortlet_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._DeepSee_Component_Portlet_abstractPortlet_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._DeepSee_Component_Portlet_abstractPortlet_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._DeepSee_Component_Portlet_abstractPortlet__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_DeepSee_Component_Portlet_abstractPortlet.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _DeepSee_Component_Portlet_abstractPortlet.prototype;
	if (null==p) {return;}
	p.constructor = _DeepSee_Component_Portlet_abstractPortlet;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%DeepSee.Component.Portlet.abstractPortlet';
	p._type = 'abstractPortlet';
	p.serialize = _DeepSee_Component_Portlet_abstractPortlet_serialize;
	p.getSettings = _DeepSee_Component_Portlet_abstractPortlet_getSettings;
	p.ReallyRefreshContents = _DeepSee_Component_Portlet_abstractPortlet_ReallyRefreshContents;
	p.connectToController = _DeepSee_Component_Portlet_abstractPortlet_connectToController;
	p.disconnectFromController = _DeepSee_Component_Portlet_abstractPortlet_disconnectFromController;
	p.getController = _DeepSee_Component_Portlet_abstractPortlet_getController;
	p.notifyView = _DeepSee_Component_Portlet_abstractPortlet_notifyView;
	p.sendEventToController = _DeepSee_Component_Portlet_abstractPortlet_sendEventToController;
	p.setControllerId = _DeepSee_Component_Portlet_abstractPortlet_setControllerId;
}
/* EOF */