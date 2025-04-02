/*** Zen Module: ZEN_Component_buttonView ***/

self._zenClassIdx['buttonView'] = '_ZEN_Component_buttonView';
self._ZEN_Component_buttonView = function(index,id) {
	if (index>=0) {_ZEN_Component_buttonView__init(this,index,id);}
}

self._ZEN_Component_buttonView__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.OnGetButtonInfo = ''; // encrypted
	o.columns = '4';
	o.onselect = '';
	o.seed = '';
	o.value = '';
}
function _ZEN_Component_buttonView_serialize(set,s)
{
	var o = this;s[0]='904465301';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.OnGetButtonInfo;s[7]=o.align;s[8]=o.aux;s[9]=o.columns;s[10]=o.containerStyle;s[11]=(o.dragEnabled?1:0);s[12]=(o.dropEnabled?1:0);s[13]=(o.dynamic?1:0);s[14]=o.enclosingClass;s[15]=o.enclosingStyle;s[16]=o.error;s[17]=o.height;s[18]=(o.hidden?1:0);s[19]=o.hint;s[20]=o.hintClass;s[21]=o.hintStyle;s[22]=o.label;s[23]=o.labelClass;s[24]=o.labelDisabledClass;s[25]=o.labelStyle;s[26]=o.onafterdrag;s[27]=o.onbeforedrag;s[28]=o.ondrag;s[29]=o.ondrop;s[30]=o.onhide;s[31]=o.onrefresh;s[32]=o.onselect;s[33]=o.onshow;s[34]=o.onupdate;s[35]=o.overlayMode;s[36]=o.renderFlag;s[37]=o.seed;s[38]=(o.showLabel?1:0);s[39]=o.slice;s[40]=o.title;s[41]=o.tuple;s[42]=o.valign;s[43]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[44]=(o.visible?1:0);s[45]=o.width;
}
function _ZEN_Component_buttonView_getSettings(s)
{
	s['name'] = 'string';
	s['columns'] = 'integer';
	s['onselect'] = 'eventHandler';
	s['seed'] = 'string';
	s['value'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_buttonView_itemClicked = function(idx) {
var item = this.findElement('item_' + idx);
if (item) {
if ('bvwItemDisabled' == item.className) return;
if ('bvwItemDisabledAlways' == item.className) return;
var value = item.getAttribute('bvwValue');
var group = item.getAttribute('bvwGroup');
if ('bvwItemSelected' == item.className) {
this.value = '';
var n = 1;
while (true) {
n++;
var el = this.findElement('item_' + n);
if (!el) break;
if (((''==group)||(group == el.getAttribute('bvwGroup')))) {
if ('bvwItemDisabledAlways' != el.className) {
el.className = 'bvwItem';
}
}
else if (el.className == 'bvwItemSelected') {
this.value += el.getAttribute('bvwGroup') + ':' +  el.getAttribute('bvwValue') + ';';
}
}
}
else {
if (value == -1) {
this.resetItems();
}
else {
var n = 1;
while (true) {
n++;
var el = this.findElement('item_' + n);
if (!el) break;
if ((n != idx)&&((''==group)||(group == el.getAttribute('bvwGroup')))) {
if ('bvwItemDisabledAlways' != el.className) {
el.className = 'bvwItemDisabled';
}
}
}
item.className = 'bvwItemSelected';
if ('' == group) {
this.value = ':' +  value + ';';
}
else {
this.value += group + ':' +  value + ';';
}
}
}
}
var rst = this.findElement('item_1');
if (rst) {
if ('' != this.value) {
rst.className = 'bvwItemReset';
}
else {
rst.className = 'bvwItemDisabled';
}
}
zenInvokeCallbackMethod(this.onselect,this,'onselect','value',this.value);
}

self._ZEN_Component_buttonView_resetItems = function() {
var rst = this.findElement('item_1');
if (rst) {
rst.className = 'bvwItemDisabled';
}
var n = 1;
while (true) {
n++;
var item = this.findElement('item_' + n);
if (null == item) break;
if ('bvwItemDisabledAlways' != item.className) {
item.className = 'bvwItem';
}
}
this.value = '';
}

self._ZEN_Component_buttonView_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_buttonView__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_ZEN_Component_buttonView.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _ZEN_Component_buttonView.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_buttonView;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.buttonView';
	p._type = 'buttonView';
	p.serialize = _ZEN_Component_buttonView_serialize;
	p.getSettings = _ZEN_Component_buttonView_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_buttonView_ReallyRefreshContents;
	p.itemClicked = _ZEN_Component_buttonView_itemClicked;
	p.resetItems = _ZEN_Component_buttonView_resetItems;
}
/* EOF */