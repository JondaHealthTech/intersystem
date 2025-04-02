/*** Zen Module: ZEN_Component_timer ***/

self._zenClassIdx['timer'] = '_ZEN_Component_timer';
self._ZEN_Component_timer = function(index,id) {
	if (index>=0) {_ZEN_Component_timer__init(this,index,id);}
}

self._ZEN_Component_timer__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.ontimeout = '';
	o.timeout = '';
	o.timerid = '';
	o.visible = false;
}
function _ZEN_Component_timer_serialize(set,s)
{
	var o = this;s[0]='2891691551';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.containerStyle;s[9]=(o.dragEnabled?1:0);s[10]=(o.dropEnabled?1:0);s[11]=(o.dynamic?1:0);s[12]=o.enclosingClass;s[13]=o.enclosingStyle;s[14]=o.error;s[15]=o.height;s[16]=(o.hidden?1:0);s[17]=o.hint;s[18]=o.hintClass;s[19]=o.hintStyle;s[20]=o.label;s[21]=o.labelClass;s[22]=o.labelDisabledClass;s[23]=o.labelStyle;s[24]=o.onafterdrag;s[25]=o.onbeforedrag;s[26]=o.ondrag;s[27]=o.ondrop;s[28]=o.onhide;s[29]=o.onrefresh;s[30]=o.onshow;s[31]=o.ontimeout;s[32]=o.onupdate;s[33]=o.overlayMode;s[34]=o.renderFlag;s[35]=(o.showLabel?1:0);s[36]=o.slice;s[37]=o.timeout;s[38]=o.timerid;s[39]=o.title;s[40]=o.tuple;s[41]=o.valign;s[42]=(o.visible?1:0);s[43]=o.width;
}
function _ZEN_Component_timer_getSettings(s)
{
	s['name'] = 'string';
	s['ontimeout'] = 'eventHandler';
	s['timeout'] = 'integer';
	s['timerid'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_timer_clearTimer = function() {
if (this.timerid) {
window.clearTimeout(this.timerid);
this.timerid = null;
}
}

self._ZEN_Component_timer_onDelete = function() {
this.clearTimer();
}

self._ZEN_Component_timer_onloadHandler = function() {
this.startTimer();
}

self._ZEN_Component_timer_setProperty = function(property,value,value2) {
switch(property) {
case 'timeout':
value = parseInt(value,10);
value = isNaN(value) ? 0 : value;
this.timeout = value;
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_timer_startTimer = function() {
this.clearTimer();
if (0 != this.timeout && this.ontimeout && this.ontimer != '') {
var code = this.ontimeout;
code = code.replace(/\"/g,'\\\"');
this.timerid = window.setTimeout('zenFireEvent('+this.index+',"'+code+'","ontimeout");',this.timeout);
}
}

self._ZEN_Component_timer_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_timer__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_ZEN_Component_timer.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _ZEN_Component_timer.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_timer;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.timer';
	p._type = 'timer';
	p.serialize = _ZEN_Component_timer_serialize;
	p.getSettings = _ZEN_Component_timer_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_timer_ReallyRefreshContents;
	p.clearTimer = _ZEN_Component_timer_clearTimer;
	p.onDelete = _ZEN_Component_timer_onDelete;
	p.onloadHandler = _ZEN_Component_timer_onloadHandler;
	p.setProperty = _ZEN_Component_timer_setProperty;
	p.startTimer = _ZEN_Component_timer_startTimer;
}
/* EOF */