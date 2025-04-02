/*** Zen Module: ZEN_Component_helpBox ***/

self._zenClassIdx['helpBox'] = '_ZEN_Component_helpBox';
self._ZEN_Component_helpBox = function(index,id) {
	if (index>=0) {_ZEN_Component_helpBox__init(this,index,id);}
}

self._ZEN_Component_helpBox__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
}
function _ZEN_Component_helpBox_serialize(set,s)
{
	var o = this;s[0]='2350274433';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.containerStyle;s[9]=(o.dragEnabled?1:0);s[10]=(o.dropEnabled?1:0);s[11]=(o.dynamic?1:0);s[12]=o.enclosingClass;s[13]=o.enclosingStyle;s[14]=o.error;s[15]=o.height;s[16]=(o.hidden?1:0);s[17]=o.hint;s[18]=o.hintClass;s[19]=o.hintStyle;s[20]=o.label;s[21]=o.labelClass;s[22]=o.labelDisabledClass;s[23]=o.labelStyle;s[24]=o.onafterdrag;s[25]=o.onbeforedrag;s[26]=o.ondrag;s[27]=o.ondrop;s[28]=o.onhide;s[29]=o.onrefresh;s[30]=o.onshow;s[31]=o.onupdate;s[32]=o.overlayMode;s[33]=o.renderFlag;s[34]=(o.showLabel?1:0);s[35]=o.slice;s[36]=o.title;s[37]=o.tuple;s[38]=o.valign;s[39]=(o.visible?1:0);s[40]=o.width;
}
function _ZEN_Component_helpBox_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_helpBox_showHelp = function(flag,title,msg) {
var div = this.findElement('helpBoxDiv');
zenASSERT(ctrl,"Unable to find div element.",arguments);
if (flag) {
div.className = 'helpBoxOn';
title = (!title || ''==title) ? 'Help' : title;
msg = (!msg || ''==msg) ? '&#160;' : msg;
div.innerHTML = '<div class="helpBoxTitle">'+title+'</div><div class="helpBoxMsg">'+msg+'</div>';
}
else {
div.className = 'helpBoxOff';
div.innerHTML = '&#160;';
}
}

self._ZEN_Component_helpBox_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_helpBox__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_ZEN_Component_helpBox.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _ZEN_Component_helpBox.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_helpBox;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.helpBox';
	p._type = 'helpBox';
	p.serialize = _ZEN_Component_helpBox_serialize;
	p.getSettings = _ZEN_Component_helpBox_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_helpBox_ReallyRefreshContents;
	p.showHelp = _ZEN_Component_helpBox_showHelp;
}
/* EOF */