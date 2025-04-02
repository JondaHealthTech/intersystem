/*** Zen Module: ZEN_Component_menuItem ***/

self._zenClassIdx['menuItem'] = '_ZEN_Component_menuItem';
self._ZEN_Component_menuItem = function(index,id) {
	if (index>=0) {_ZEN_Component_menuItem__init(this,index,id);}
}

self._ZEN_Component_menuItem__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.caption = '';
	o.disabled = false;
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
}
function _ZEN_Component_menuItem_serialize(set,s)
{
	var o = this;s[0]='3317252581';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.caption;s[9]=o.containerStyle;s[10]=(o.disabled?1:0);s[11]=(o.dragEnabled?1:0);s[12]=(o.dropEnabled?1:0);s[13]=(o.dynamic?1:0);s[14]=o.enclosingClass;s[15]=o.enclosingStyle;s[16]=o.error;s[17]=o.height;s[18]=o.help;s[19]=(o.hidden?1:0);s[20]=o.hint;s[21]=o.hintClass;s[22]=o.hintStyle;s[23]=o.image;s[24]=o.imageHeight;s[25]=o.imageWidth;s[26]=o.label;s[27]=o.labelClass;s[28]=o.labelDisabledClass;s[29]=o.labelStyle;s[30]=o.link;s[31]=o.linkResource;s[32]=o.onafterdrag;s[33]=o.onbeforedrag;s[34]=o.onclick;s[35]=o.ondrag;s[36]=o.ondrop;s[37]=o.onhide;s[38]=o.onrefresh;s[39]=o.onshow;s[40]=o.onupdate;s[41]=o.overlayMode;s[42]=o.renderFlag;s[43]=o.secureCallback;s[44]=o.secureLink;s[45]=(o.showLabel?1:0);s[46]=o.slice;s[47]=o.target;s[48]=o.title;s[49]=o.tuple;s[50]=o.valign;s[51]=(o.visible?1:0);s[52]=o.width;
}
function _ZEN_Component_menuItem_getSettings(s)
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

self._ZEN_Component_menuItem_doNothing = function() {
}

self._ZEN_Component_menuItem_getDisabled = function() {
return this.disabled;
}

self._ZEN_Component_menuItem_onActionHandler = function() {
if (this.parent.onItemActionHandler) {
this.parent.onItemActionHandler(1);
}
}

self._ZEN_Component_menuItem_onShowHelpHandler = function(mode) {
if (this.parent.onItemShowHelpHandler) {
this.parent.onItemShowHelpHandler(mode,this);
}
}

self._ZEN_Component_menuItem_setDisabled = function(flag) {
this.disabled = flag ? true : false;
var a = this.findElement("a");
zenASSERT(a,"Unable to find anchor element",arguments);
if (this.disabled) {
a.className = "menuItemDisabled";
a.disabled = true;
a.href = "#";
if (zenIsIE) {
a["onclick"]=new Function("");
}
else a.setAttribute("onclick","");
}
else {
a.className = "menuItem";
a.disabled = false;
a.href = this.secureLink;
if (zenIsIE) {
a["onclick"] = new Function(this.secureCallback);
}
else a.setAttribute("onclick",this.secureCallback);
}
}

self._ZEN_Component_menuItem_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_menuItem__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_ZEN_Component_menuItem.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _ZEN_Component_menuItem.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_menuItem;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.menuItem';
	p._type = 'menuItem';
	p.serialize = _ZEN_Component_menuItem_serialize;
	p.getSettings = _ZEN_Component_menuItem_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_menuItem_ReallyRefreshContents;
	p.doNothing = _ZEN_Component_menuItem_doNothing;
	p.getDisabled = _ZEN_Component_menuItem_getDisabled;
	p.onActionHandler = _ZEN_Component_menuItem_onActionHandler;
	p.onShowHelpHandler = _ZEN_Component_menuItem_onShowHelpHandler;
	p.setDisabled = _ZEN_Component_menuItem_setDisabled;
}
/* EOF */