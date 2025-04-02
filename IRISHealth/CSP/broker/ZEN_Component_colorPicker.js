/*** Zen Module: ZEN_Component_colorPicker ***/

self._zenClassIdx['colorPicker'] = '_ZEN_Component_colorPicker';
self._ZEN_Component_colorPicker = function(index,id) {
	if (index>=0) {_ZEN_Component_colorPicker__init(this,index,id);}
}

self._ZEN_Component_colorPicker__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_control__init) ?zenMaster._ZEN_Component_control__init(o,index,id):_ZEN_Component_control__init(o,index,id);
	o.cellWidth = '20';
	o.cellsPerRow = '16';
	o.colorList = '';
	o.palette = 'basic';
}
function _ZEN_Component_colorPicker_serialize(set,s)
{
	var o = this;s[0]='549375183';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.cellWidth;s[9]=o.cellsPerRow;s[10]=o.clientType;s[11]=o.colorList;s[12]=o.containerStyle;s[13]=o.controlClass;s[14]=o.controlStyle;s[15]=o.dataBinding;s[16]=(o.disabled?1:0);s[17]=(o.dragEnabled?1:0);s[18]=(o.dropEnabled?1:0);s[19]=(o.dynamic?1:0);s[20]=o.enclosingClass;s[21]=o.enclosingStyle;s[22]=o.error;s[23]=o.height;s[24]=(o.hidden?1:0);s[25]=o.hint;s[26]=o.hintClass;s[27]=o.hintStyle;s[28]=(o.invalid?1:0);s[29]=o.invalidMessage;s[30]=o.label;s[31]=o.labelClass;s[32]=o.labelDisabledClass;s[33]=o.labelStyle;s[34]=o.onafterdrag;s[35]=o.onbeforedrag;s[36]=o.onblur;s[37]=o.onchange;s[38]=o.onclick;s[39]=o.ondblclick;s[40]=o.ondrag;s[41]=o.ondrop;s[42]=o.onfocus;s[43]=o.onhide;s[44]=o.onkeydown;s[45]=o.onkeypress;s[46]=o.onkeyup;s[47]=o.onmousedown;s[48]=o.onmouseout;s[49]=o.onmouseover;s[50]=o.onmouseup;s[51]=o.onrefresh;s[52]=o.onshow;s[53]=o.onsubmit;s[54]=o.ontouchend;s[55]=o.ontouchmove;s[56]=o.ontouchstart;s[57]=o.onupdate;s[58]=o.onvalidate;s[59]=o.originalValue;s[60]=o.overlayMode;s[61]=o.palette;s[62]=(o.readOnly?1:0);s[63]=o.renderFlag;s[64]=(o.required?1:0);s[65]=o.requiredMessage;s[66]=(o.showLabel?1:0);s[67]=o.slice;s[68]=o.tabIndex;s[69]=o.title;s[70]=o.tuple;s[71]=o.valign;s[72]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[73]=(o.visible?1:0);s[74]=o.width;
}
function _ZEN_Component_colorPicker_getSettings(s)
{
	s['name'] = 'string';
	s['cellWidth'] = 'integer';
	s['cellsPerRow'] = 'integer';
	s['colorList'] = 'csv';
	s['palette'] = 'enum:basic,expanded';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_colorPicker_selectColor = function(color,notify) {
notify = (null==notify) ? false : notify;
var ctrl = this.findElement('colorPicker');
zenASSERT(ctrl,"Unable to find control.",arguments);
if (this.disabled) {
return;
}
var oldcolor = ctrl.value;
ctrl.value = color;
this.value = color;
var div;
div = this.findElement('colorPicker'+'_'+oldcolor);
if (div) {
div.className = 'colorPickerCell';
}
div = this.findElement('colorPicker'+'_'+color);
if (div) {
div.className = 'colorPickerCellSelected';
}
if (notify) {
this.onchangeHandler();
}
}

self._ZEN_Component_colorPicker_setProperty = function(property,value,value2) {
switch(property) {
case 'colorList':
this.colorList = value;
this.refreshContents();
break;
case 'value':
this.selectColor(value,false);
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_colorPicker_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_colorPicker__Loader = function() {
	zenLoadClass('_ZEN_Component_control');
	_ZEN_Component_colorPicker.prototype = zenCreate('_ZEN_Component_control',-1);
	var p = _ZEN_Component_colorPicker.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_colorPicker;
	p.superClass = ('undefined' == typeof _ZEN_Component_control) ? zenMaster._ZEN_Component_control.prototype:_ZEN_Component_control.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.colorPicker';
	p._type = 'colorPicker';
	p.serialize = _ZEN_Component_colorPicker_serialize;
	p.getSettings = _ZEN_Component_colorPicker_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_colorPicker_ReallyRefreshContents;
	p.selectColor = _ZEN_Component_colorPicker_selectColor;
	p.setProperty = _ZEN_Component_colorPicker_setProperty;
}
/* EOF */