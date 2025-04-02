/*** Zen Module: ZEN_Component_csComboBoxItem ***/

self._zenClassIdx['csComboBoxItem'] = '_ZEN_Component_csComboBoxItem';
self._ZEN_Component_csComboBoxItem = function(index,id) {
	if (index>=0) {_ZEN_Component_csComboBoxItem__init(this,index,id);}
}

self._ZEN_Component_csComboBoxItem__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.caption = '';
	o.contextKey = '';
	o.value = '';
}
function _ZEN_Component_csComboBoxItem_serialize(set,s)
{
	var o = this;s[0]='836917544';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.caption;s[9]=o.containerStyle;s[10]=o.contextKey;s[11]=(o.dragEnabled?1:0);s[12]=(o.dropEnabled?1:0);s[13]=(o.dynamic?1:0);s[14]=o.enclosingClass;s[15]=o.enclosingStyle;s[16]=o.error;s[17]=o.height;s[18]=(o.hidden?1:0);s[19]=o.hint;s[20]=o.hintClass;s[21]=o.hintStyle;s[22]=o.label;s[23]=o.labelClass;s[24]=o.labelDisabledClass;s[25]=o.labelStyle;s[26]=o.onafterdrag;s[27]=o.onbeforedrag;s[28]=o.ondrag;s[29]=o.ondrop;s[30]=o.onhide;s[31]=o.onrefresh;s[32]=o.onshow;s[33]=o.onupdate;s[34]=o.overlayMode;s[35]=o.renderFlag;s[36]=(o.showLabel?1:0);s[37]=o.slice;s[38]=o.title;s[39]=o.tuple;s[40]=o.valign;s[41]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[42]=(o.visible?1:0);s[43]=o.width;
}
function _ZEN_Component_csComboBoxItem_getSettings(s)
{
	s['name'] = 'string';
	s['caption'] = 'caption';
	s['contextKey'] = 'string';
	s['value'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_csComboBoxItem_onloadHandler = function() {
ZMS.initialize();
var div=this.getEnclosingDiv();
for (var k=div.firstChild;k!=null;k=k.nextSibling) {
if (k.nodeType==1 && k.className=="csComboBoxItem") {
ZMS.createComboItemSubtree(k);
div.item=k;
return;
}
}
}

self._ZEN_Component_csComboBoxItem_setProperty = function(property,value,value2) {
switch(property) {
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_csComboBoxItem_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_csComboBoxItem__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_ZEN_Component_csComboBoxItem.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _ZEN_Component_csComboBoxItem.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_csComboBoxItem;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.csComboBoxItem';
	p._type = 'csComboBoxItem';
	p.serialize = _ZEN_Component_csComboBoxItem_serialize;
	p.getSettings = _ZEN_Component_csComboBoxItem_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_csComboBoxItem_ReallyRefreshContents;
	p.onloadHandler = _ZEN_Component_csComboBoxItem_onloadHandler;
	p.setProperty = _ZEN_Component_csComboBoxItem_setProperty;
}
/* EOF */