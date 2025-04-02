/*** Zen Module: ZEN_Component_canvas ***/

self._zenClassIdx['canvas'] = '_ZEN_Component_canvas';
self._ZEN_Component_canvas = function(index,id) {
	if (index>=0) {_ZEN_Component_canvas__init(this,index,id);}
}

self._ZEN_Component_canvas__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.content = '';
	o.onrender = '';
}
function _ZEN_Component_canvas_serialize(set,s)
{
	var o = this;s[0]='1285664679';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.containerStyle;s[9]=o.content;s[10]=(o.dragEnabled?1:0);s[11]=(o.dropEnabled?1:0);s[12]=(o.dynamic?1:0);s[13]=o.enclosingClass;s[14]=o.enclosingStyle;s[15]=o.error;s[16]=o.height;s[17]=(o.hidden?1:0);s[18]=o.hint;s[19]=o.hintClass;s[20]=o.hintStyle;s[21]=o.label;s[22]=o.labelClass;s[23]=o.labelDisabledClass;s[24]=o.labelStyle;s[25]=o.onafterdrag;s[26]=o.onbeforedrag;s[27]=o.ondrag;s[28]=o.ondrop;s[29]=o.onhide;s[30]=o.onrefresh;s[31]=o.onrender;s[32]=o.onshow;s[33]=o.onupdate;s[34]=o.overlayMode;s[35]=o.renderFlag;s[36]=(o.showLabel?1:0);s[37]=o.slice;s[38]=o.title;s[39]=o.tuple;s[40]=o.valign;s[41]=(o.visible?1:0);s[42]=o.width;
}
function _ZEN_Component_canvas_getSettings(s)
{
	s['name'] = 'string';
	s['content'] = 'html';
	s['onrender'] = 'eventHandler';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_canvas_getContext = function() {
var canvas = this.findElement('canvas');
return canvas.getContext ? canvas.getContext('2d') : null;
}

self._ZEN_Component_canvas_renderContents = function() {
var ctx = this.getContext();
zenInvokeCallbackMethod(this.onrender,this,'onrender','context',ctx);
}

self._ZEN_Component_canvas_setProperty = function(property,value,value2) {
switch(property) {
case 'content':
var canvas = this.findElement('canvas');
canvas.innerHTML = value;
break;
case 'onrender':
this.onrender = value;
break;
default:
return this.invokeSuper('setProperty',arguments);
break;
}
return true;
}

self._ZEN_Component_canvas_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_canvas__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_ZEN_Component_canvas.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _ZEN_Component_canvas.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_canvas;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.canvas';
	p._type = 'canvas';
	p.serialize = _ZEN_Component_canvas_serialize;
	p.getSettings = _ZEN_Component_canvas_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_canvas_ReallyRefreshContents;
	p.getContext = _ZEN_Component_canvas_getContext;
	p.renderContents = _ZEN_Component_canvas_renderContents;
	p.setProperty = _ZEN_Component_canvas_setProperty;
}
/* EOF */