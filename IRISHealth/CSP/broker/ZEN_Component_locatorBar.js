/*** Zen Module: ZEN_Component_locatorBar ***/

self._zenClassIdx['locatorBar'] = '_ZEN_Component_locatorBar';
self._ZEN_Component_locatorBar = function(index,id) {
	if (index>=0) {_ZEN_Component_locatorBar__init(this,index,id);}
}

self._ZEN_Component_locatorBar__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.OnDrawBar = ''; // encrypted
	o.OnGetQuickLinks = ''; // encrypted
	o.links = new Array();
	o.seed = '';
}
function _ZEN_Component_locatorBar_serialize(set,s)
{
	var o = this;s[0]='2234137214';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.OnDrawBar;s[7]=o.OnGetQuickLinks;s[8]=o.align;s[9]=o.aux;s[10]=o.containerStyle;s[11]=(o.dragEnabled?1:0);s[12]=(o.dropEnabled?1:0);s[13]=(o.dynamic?1:0);s[14]=o.enclosingClass;s[15]=o.enclosingStyle;s[16]=o.error;s[17]=o.height;s[18]=(o.hidden?1:0);s[19]=o.hint;s[20]=o.hintClass;s[21]=o.hintStyle;s[22]=o.label;s[23]=o.labelClass;s[24]=o.labelDisabledClass;s[25]=o.labelStyle;s[26]=set.serializeList(o,o.links,true,'links');s[27]=o.onafterdrag;s[28]=o.onbeforedrag;s[29]=o.ondrag;s[30]=o.ondrop;s[31]=o.onhide;s[32]=o.onrefresh;s[33]=o.onshow;s[34]=o.onupdate;s[35]=o.overlayMode;s[36]=o.renderFlag;s[37]=o.seed;s[38]=(o.showLabel?1:0);s[39]=o.slice;s[40]=o.title;s[41]=o.tuple;s[42]=o.valign;s[43]=(o.visible?1:0);s[44]=o.width;
}
function _ZEN_Component_locatorBar_getSettings(s)
{
	s['name'] = 'string';
	s['links'] = 'string';
	s['seed'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_locatorBar_onupdateHandler = function() {
this.refreshContents();
}

self._ZEN_Component_locatorBar_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_locatorBar__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_ZEN_Component_locatorBar.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _ZEN_Component_locatorBar.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_locatorBar;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.locatorBar';
	p._type = 'locatorBar';
	p.serialize = _ZEN_Component_locatorBar_serialize;
	p.getSettings = _ZEN_Component_locatorBar_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_locatorBar_ReallyRefreshContents;
	p.onupdateHandler = _ZEN_Component_locatorBar_onupdateHandler;
}
/* EOF */