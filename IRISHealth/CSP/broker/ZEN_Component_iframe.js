/*** Zen Module: ZEN_Component_iframe ***/

self._zenClassIdx['iframe'] = '_ZEN_Component_iframe';
self._ZEN_Component_iframe = function(index,id) {
	if (index>=0) {_ZEN_Component_iframe__init(this,index,id);}
}

self._ZEN_Component_iframe__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.frameAlign = '';
	o.frameBorder = false;
	o.longdesc = '';
	o.scrolling = '';
	o.src = '';
}
function _ZEN_Component_iframe_serialize(set,s)
{
	var o = this;s[0]='3283923443';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.containerStyle;s[9]=(o.dragEnabled?1:0);s[10]=(o.dropEnabled?1:0);s[11]=(o.dynamic?1:0);s[12]=o.enclosingClass;s[13]=o.enclosingStyle;s[14]=o.error;s[15]=o.frameAlign;s[16]=(o.frameBorder?1:0);s[17]=o.height;s[18]=(o.hidden?1:0);s[19]=o.hint;s[20]=o.hintClass;s[21]=o.hintStyle;s[22]=o.label;s[23]=o.labelClass;s[24]=o.labelDisabledClass;s[25]=o.labelStyle;s[26]=o.longdesc;s[27]=o.onafterdrag;s[28]=o.onbeforedrag;s[29]=o.ondrag;s[30]=o.ondrop;s[31]=o.onhide;s[32]=o.onrefresh;s[33]=o.onshow;s[34]=o.onupdate;s[35]=o.overlayMode;s[36]=o.renderFlag;s[37]=o.scrolling;s[38]=(o.showLabel?1:0);s[39]=o.slice;s[40]=o.src;s[41]=o.title;s[42]=o.tuple;s[43]=o.valign;s[44]=(o.visible?1:0);s[45]=o.width;
}
function _ZEN_Component_iframe_getSettings(s)
{
	s['name'] = 'string';
	s['frameAlign'] = 'enum:left,right,center';
	s['frameBorder'] = 'boolean';
	s['longdesc'] = 'uri';
	s['scrolling'] = 'enum:auto,yes,no';
	s['src'] = 'uri';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_iframe_getDocument = function() {
var doc = null;
var iframe = this.findElement('iframe');
if (iframe && iframe.contentWindow && iframe.contentWindow.document) {
doc = iframe.contentWindow.document;
}
return doc;
}

self._ZEN_Component_iframe_getPage = function() {
var page = null;
var iframe = this.findElement('iframe');
if (iframe && iframe.contentWindow && iframe.contentWindow.zenPage) {
page = iframe.contentWindow.zenPage;
}
return page;
}

self._ZEN_Component_iframe_setProperty = function(property,value,value2) {
var iframe = this.findElement('iframe');
switch(property) {
case 'src':
case 'longdesc':
case 'height':
case 'width':
case 'scrolling':
this[property] = value;
if (iframe) {
iframe[property] = value;
}
break;
case 'frameBorder':
this.frameBorder = value ? true : false;
if (iframe) {
iframe.frameBorder = value ? 1 : 0;
}
break;
case 'frameAlign':
this.frameAlign = value;
if (iframe) {
iframe.align = value;
}
break;
default:
return this.invokeSuper('setProperty',arguments);
break;
}
return true;
}

self._ZEN_Component_iframe_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_iframe__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_ZEN_Component_iframe.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _ZEN_Component_iframe.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_iframe;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.iframe';
	p._type = 'iframe';
	p.serialize = _ZEN_Component_iframe_serialize;
	p.getSettings = _ZEN_Component_iframe_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_iframe_ReallyRefreshContents;
	p.getDocument = _ZEN_Component_iframe_getDocument;
	p.getPage = _ZEN_Component_iframe_getPage;
	p.setProperty = _ZEN_Component_iframe_setProperty;
}
/* EOF */