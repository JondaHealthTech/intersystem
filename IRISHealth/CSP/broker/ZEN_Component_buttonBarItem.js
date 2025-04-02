/*** Zen Module: ZEN_Component_buttonBarItem ***/

self._zenClassIdx['buttonBarItem'] = '_ZEN_Component_buttonBarItem';
self._ZEN_Component_buttonBarItem = function(index,id) {
	if (index>=0) {_ZEN_Component_buttonBarItem__init(this,index,id);}
}

self._ZEN_Component_buttonBarItem__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.caption = '';
	o.icon = '';
	o.iconDisabled = '';
	o.onclick = '';
}
function _ZEN_Component_buttonBarItem_serialize(set,s)
{
	var o = this;s[0]='2544737851';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.caption;s[9]=o.containerStyle;s[10]=(o.dragEnabled?1:0);s[11]=(o.dropEnabled?1:0);s[12]=(o.dynamic?1:0);s[13]=o.enclosingClass;s[14]=o.enclosingStyle;s[15]=o.error;s[16]=o.height;s[17]=(o.hidden?1:0);s[18]=o.hint;s[19]=o.hintClass;s[20]=o.hintStyle;s[21]=o.icon;s[22]=o.iconDisabled;s[23]=o.label;s[24]=o.labelClass;s[25]=o.labelDisabledClass;s[26]=o.labelStyle;s[27]=o.onafterdrag;s[28]=o.onbeforedrag;s[29]=o.onclick;s[30]=o.ondrag;s[31]=o.ondrop;s[32]=o.onhide;s[33]=o.onrefresh;s[34]=o.onshow;s[35]=o.onupdate;s[36]=o.overlayMode;s[37]=o.renderFlag;s[38]=(o.showLabel?1:0);s[39]=o.slice;s[40]=o.title;s[41]=o.tuple;s[42]=o.valign;s[43]=(o.visible?1:0);s[44]=o.width;
}
function _ZEN_Component_buttonBarItem_getSettings(s)
{
	s['name'] = 'string';
	s['caption'] = 'string';
	s['icon'] = 'uri';
	s['iconDisabled'] = 'uri';
	s['onclick'] = 'eventHandler';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_buttonBarItem_setProperty = function(property,value,value2) {
switch(property) {
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_buttonBarItem_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_buttonBarItem__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_ZEN_Component_buttonBarItem.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _ZEN_Component_buttonBarItem.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_buttonBarItem;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.buttonBarItem';
	p._type = 'buttonBarItem';
	p.serialize = _ZEN_Component_buttonBarItem_serialize;
	p.getSettings = _ZEN_Component_buttonBarItem_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_buttonBarItem_ReallyRefreshContents;
	p.setProperty = _ZEN_Component_buttonBarItem_setProperty;
}
/* EOF */