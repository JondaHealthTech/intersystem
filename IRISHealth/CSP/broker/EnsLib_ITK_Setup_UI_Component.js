/*** Zen Module: EnsLib_ITK_Setup_UI_Component ***/

self._zenClassIdx['consumerEditor'] = 'EnsLib_ITK_Setup_UI_Component_consumerEditor';
self.EnsLib_ITK_Setup_UI_Component_consumerEditor = function(index,id) {
	if (index>=0) {EnsLib_ITK_Setup_UI_Component_consumerEditor__init(this,index,id);}
}

self.EnsLib_ITK_Setup_UI_Component_consumerEditor__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_composite__init) ?zenMaster._ZEN_Component_composite__init(o,index,id):_ZEN_Component_composite__init(o,index,id);
	o.obj = null;
}
function EnsLib_ITK_Setup_UI_Component_consumerEditor_serialize(set,s)
{
	var o = this;s[0]='3713462257';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.cellAlign;s[9]=o.cellSize;s[10]=o.cellStyle;s[11]=o.cellVAlign;s[12]=set.serializeList(o,o.children,true,'children');s[13]=(o.childrenCreated?1:0);s[14]=o.containerStyle;s[15]=(o.disabled?1:0);s[16]=(o.dragEnabled?1:0);s[17]=(o.dropEnabled?1:0);s[18]=(o.dynamic?1:0);s[19]=o.enclosingClass;s[20]=o.enclosingStyle;s[21]=o.error;s[22]=o.groupClass;s[23]=o.groupStyle;s[24]=o.height;s[25]=(o.hidden?1:0);s[26]=o.hint;s[27]=o.hintClass;s[28]=o.hintStyle;s[29]=o.label;s[30]=o.labelClass;s[31]=o.labelDisabledClass;s[32]=o.labelPosition;s[33]=o.labelStyle;s[34]=o.layout;s[35]=set.addObject(o.obj,'obj');s[36]=o.onafterdrag;s[37]=o.onbeforedrag;s[38]=o.onclick;s[39]=o.ondrag;s[40]=o.ondrop;s[41]=o.onhide;s[42]=o.onrefresh;s[43]=o.onshow;s[44]=o.onupdate;s[45]=o.overlayMode;s[46]=o.renderFlag;s[47]=(o.showLabel?1:0);s[48]=o.slice;s[49]=o.title;s[50]=o.tuple;s[51]=o.valign;s[52]=(o.visible?1:0);s[53]=o.width;
}
function EnsLib_ITK_Setup_UI_Component_consumerEditor_getSettings(s)
{
	s['name'] = 'string';
	s['obj'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self.EnsLib_ITK_Setup_UI_Component_consumerEditor_createChildren = function(form) {
var hgroup = zenPage.createComponent('hgroup');
var hdn = zenPage.createComponent('hidden');
hdn.name='ConsumerName';
hdn.setProperty('id', this.id+'.hdn'+hdn.name);
hgroup.addChild(hdn);
var txt = zenPage.createComponent('text');
txt.name="DisplayText";
txt.setProperty('id',this.id+".txt"+txt.name);
txt.size=30;
txt.onchange = "zenPage.settingChanged('"+escape(this.index)+"','"+escape(form.index)+"');"
txt.onkeyup = "zenPage.settingChanged('"+escape(this.index)+"','"+escape(form.index)+"');"
hgroup.addChild(txt);
var btn = zenPage.createComponent('image');
btn.src="deepsee/zoom_24.png";
btn.setProperty('id',this.id+"."+"btn"+txt.name);
btn.title="Edit services accepted by this consumer.";
btn.onclick="zenPage.getComponentById('"+this.id+"').showConsumerDetails();"
hgroup.addChild(btn);
var pop = zenPage.createComponent('hidden');
pop.name='PopupName';
pop.setProperty('id', this.id+'.hdn'+pop.name);
hgroup.addChild(pop);
this.addChild(hgroup);
this.childrenCreated = true;
return '';
}

self.EnsLib_ITK_Setup_UI_Component_consumerEditor_getProperty = function(property,key) {
switch(property) {
case 'value':
var hdn = this.getChildById('hdnConsumerName');
var sel = this.getChildById('txtDisplayText');
var pop = this.getChildById('hdPopupName');
if (hdn && sel && pop) return hdn.getValue() + "|" + sel.getValue() + "|" + pop.getValue();
default:
return this.invokeSuper('getProperty',arguments);
}
}

self.EnsLib_ITK_Setup_UI_Component_consumerEditor_getValue = function() {
return this.getProperty('value');
}

self.EnsLib_ITK_Setup_UI_Component_consumerEditor_onPopupAction = function(popupName,action,value) {
}

self.EnsLib_ITK_Setup_UI_Component_consumerEditor_onRefreshContents = function() {
var old = zenPage.composites[this.id];
this.setValue(old.getValue());
zenPage.composites[this.id] = this;
}

self.EnsLib_ITK_Setup_UI_Component_consumerEditor_setProperty = function(property,value,value2) {
switch(property) {
case 'value':
var items = value.split("|")
var hdn = this.getChildById('hdnConsumerName')
if (hdn) {
hdn.setValue(items[0]);
}
var sel = this.getChildById('txtDisplayText')
if (sel) {
sel.setValue(items[1]);
}
var popup = this.getChildById('hdnPopupName')
if (popup && items.length > 2) {
popup.setValue(items[2]);
}
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self.EnsLib_ITK_Setup_UI_Component_consumerEditor_setValue = function(value,value2) {
this.setProperty('value',value,value2);
}

self.EnsLib_ITK_Setup_UI_Component_consumerEditor_showConsumerDetails = function() {
var name = this.getChildById('hdnConsumerName').getValue();
var popup = this.getChildById('hdnPopupName').getValue();
var parms = {
CONSUMERNAME:name
};
zenPage.launchPopupWindow(zenLink('EnsLib.ITK.Setup.UI.' + popup + '.zen'),zenPage.addPopupSuffix('EditConsumerRegistry'),'status,scrollbars,resizable=yes,width=1000,height=600',parms);
}

self.EnsLib_ITK_Setup_UI_Component_consumerEditor_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self.EnsLib_ITK_Setup_UI_Component_consumerEditor__Loader = function() {
	zenLoadClass('_ZEN_Component_composite');
	EnsLib_ITK_Setup_UI_Component_consumerEditor.prototype = zenCreate('_ZEN_Component_composite',-1);
	var p = EnsLib_ITK_Setup_UI_Component_consumerEditor.prototype;
	if (null==p) {return;}
	p.constructor = EnsLib_ITK_Setup_UI_Component_consumerEditor;
	p.superClass = ('undefined' == typeof _ZEN_Component_composite) ? zenMaster._ZEN_Component_composite.prototype:_ZEN_Component_composite.prototype;
	p.__ZENcomponent = true;
	p._serverClass = 'EnsLib.ITK.Setup.UI.Component.consumerEditor';
	p._type = 'consumerEditor';
	p.serialize = EnsLib_ITK_Setup_UI_Component_consumerEditor_serialize;
	p.getSettings = EnsLib_ITK_Setup_UI_Component_consumerEditor_getSettings;
	p.ReallyRefreshContents = EnsLib_ITK_Setup_UI_Component_consumerEditor_ReallyRefreshContents;
	p.createChildren = EnsLib_ITK_Setup_UI_Component_consumerEditor_createChildren;
	p.getProperty = EnsLib_ITK_Setup_UI_Component_consumerEditor_getProperty;
	p.getValue = EnsLib_ITK_Setup_UI_Component_consumerEditor_getValue;
	p.onPopupAction = EnsLib_ITK_Setup_UI_Component_consumerEditor_onPopupAction;
	p.onRefreshContents = EnsLib_ITK_Setup_UI_Component_consumerEditor_onRefreshContents;
	p.setProperty = EnsLib_ITK_Setup_UI_Component_consumerEditor_setProperty;
	p.setValue = EnsLib_ITK_Setup_UI_Component_consumerEditor_setValue;
	p.showConsumerDetails = EnsLib_ITK_Setup_UI_Component_consumerEditor_showConsumerDetails;
}
/* EOF */