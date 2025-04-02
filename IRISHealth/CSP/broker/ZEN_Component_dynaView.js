/*** Zen Module: ZEN_Component_dynaView ***/

self._zenClassIdx['dynaView'] = '_ZEN_Component_dynaView';
self._ZEN_Component_dynaView = function(index,id) {
	if (index>=0) {_ZEN_Component_dynaView__init(this,index,id);}
}

self._ZEN_Component_dynaView__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.OnGetViewContents = ''; // encrypted
	o.itemCount = '0';
	o.onchange = '';
	o.onclick = '';
	o.onclickHeader = '';
	o.ondblclick = '';
	o.onselect = '';
	o.parameters = new Object();
	o.rows = '5';
	o.selectedIndex = '-1';
	o.text = '';
	o.value = '';
	o.viewType = 'list';
	o.onCreate();
}
function _ZEN_Component_dynaView_serialize(set,s)
{
	var o = this;s[0]='1606379073';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.OnGetViewContents;s[7]=o.align;s[8]=o.aux;s[9]=o.containerStyle;s[10]=(o.dragEnabled?1:0);s[11]=(o.dropEnabled?1:0);s[12]=(o.dynamic?1:0);s[13]=o.enclosingClass;s[14]=o.enclosingStyle;s[15]=o.error;s[16]=o.height;s[17]=(o.hidden?1:0);s[18]=o.hint;s[19]=o.hintClass;s[20]=o.hintStyle;s[21]=o.itemCount;s[22]=o.label;s[23]=o.labelClass;s[24]=o.labelDisabledClass;s[25]=o.labelStyle;s[26]=o.onafterdrag;s[27]=o.onbeforedrag;s[28]=o.onchange;s[29]=o.onclick;s[30]=o.onclickHeader;s[31]=o.ondblclick;s[32]=o.ondrag;s[33]=o.ondrop;s[34]=o.onhide;s[35]=o.onrefresh;s[36]=o.onselect;s[37]=o.onshow;s[38]=o.onupdate;s[39]=o.overlayMode;s[40]=set.serializeArray(o,o.parameters,true,'parameters');s[41]=o.renderFlag;s[42]=o.rows;s[43]=o.selectedIndex;s[44]=(o.showLabel?1:0);s[45]=o.slice;s[46]=o.text;s[47]=o.title;s[48]=o.tuple;s[49]=o.valign;s[50]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[51]=o.viewType;s[52]=(o.visible?1:0);s[53]=o.width;
}
function _ZEN_Component_dynaView_getSettings(s)
{
	s['name'] = 'string';
	s['onchange'] = 'eventHandler';
	s['onclick'] = 'eventHandler';
	s['onclickHeader'] = 'eventHandler';
	s['ondblclick'] = 'eventHandler';
	s['onselect'] = 'eventHandler';
	s['parameters'] = 'string';
	s['rows'] = 'integer';
	s['selectedIndex'] = 'integer';
	s['text'] = 'string';
	s['value'] = 'string';
	s['viewType'] = 'enum:details,list';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_dynaView_dvKeyBlur = function() {
this.hasFocus = false;
this.selectItem(this.selectedIndex);
}

self._ZEN_Component_dynaView_dvKeyDownHandler = function(evt) {
if (this.disabled) return false;
evt = evt ? evt : window.event;
var ret = true;
var row = this.currRow;
var col = this.currColumn;
switch(evt.keyCode) {
case zenENTER:
zenInvokeCallbackMethod(this.onselect,this,'onselect');
break;
case zenPAGEUP:
ret = !this.moveToItem('pageup');
break;
case zenPAGEDN:
ret = !this.moveToItem('pagedn');
break;
case zenEND:
ret = !this.moveToItem('end');
break;
case zenHOME:
ret = !this.moveToItem('home');
break;
case zenUP:
ret = !this.moveToItem('up');
break;
case zenDOWN:
ret = !this.moveToItem('down');
break;
case zenRIGHT:
ret = !this.moveToItem('right');
break;
case zenLEFT:
ret = !this.moveToItem('left');
break;
default:
break;
}
if (!ret) {
if (evt.preventDefault) {
evt.preventDefault();
}
evt.cancelBubble = true;
}
return ret;
}

self._ZEN_Component_dynaView_dvKeyFocus = function() {
this.hasFocus = true;
this.selectItem(this.selectedIndex);
}

self._ZEN_Component_dynaView_dvKeyPressHandler = function(evt) {
if (this.disabled) return false;
evt = evt ? evt : window.event;
var ret = true;
switch(evt.keyCode) {
default:
break;
}
return ret;
}

self._ZEN_Component_dynaView_focus = function() {
var inv = this.findElement('invisible');
if (inv) {
inv.focus();
}
}

self._ZEN_Component_dynaView_headerClicked = function(headerName) {
zenInvokeCallbackMethod(this.onclickHeader,headerName,'onclickHeader');
}

self._ZEN_Component_dynaView_itemClicked = function(idx) {
this.focus();
this.selectItem(idx,false);
zenInvokeCallbackMethod(this.onclick,this,'onclick');
}

self._ZEN_Component_dynaView_itemDblClicked = function(idx) {
zenInvokeCallbackMethod(this.ondblclick,this,'ondblclick');
zenInvokeCallbackMethod(this.onselect,this,'onselect');
}

self._ZEN_Component_dynaView_moveToItem = function(dir) {
var ret = false;
var idx = this.selectedIndex;
var size = this.itemCount;
switch (this.viewType) {
case 'list':
switch(dir) {
case 'up':
if (idx > 0) {
ret = true;
this.selectItem(idx-1);
}
break;
case 'down':
if (idx < size-1) {
ret = true;
this.selectItem(idx+1);
}
break;
case 'left':
if (idx >= this.rows) {
ret = true;
this.selectItem(idx - this.rows);
}
break;
case 'right':
if (idx+this.rows < size) {
ret = true;
this.selectItem(idx + this.rows);
}
break;
case 'home':
if (size > 0) {
ret = true;
this.selectItem(0);
}
break;
case 'end':
if (size > 0) {
ret = true;
this.selectItem(size - 1);
}
break;
}
break;
case 'details':
switch(dir) {
case 'up':
if (idx > 0) {
ret = true;
this.selectItem(idx-1);
}
break;
case 'down':
if (idx < size-1) {
ret = true;
this.selectItem(idx+1);
}
break;
case 'home':
if (size > 0) {
ret = true;
this.selectItem(0);
}
break;
case 'end':
if (size > 0) {
ret = true;
this.selectItem(size - 1);
}
break;
case 'pageup':
if (size > 0) {
ret = true;
idx = idx > 10 ? idx - 10 : 0;
this.selectItem(idx);
}
break;
case 'pagedn':
if (size > 0) {
ret = true;
idx = idx < (size - 10) ? idx + 10 : size-1;
this.selectItem(idx);
}
break;
}
break;
}
return ret;
}

self._ZEN_Component_dynaView_onCreate = function() {
this.hasFocus = false;
}

self._ZEN_Component_dynaView_selectItem = function(idx,scroll) {
scroll = (null == scroll) ? true : scroll;
if ((idx != this.selectedIndex) && (-1 != this.selectedIndex)) {
var td = this.findElement('td_' + this.selectedIndex);
if (td) {
td.className = 'dynaViewItem';
}
}
this.selectedIndex = idx;
this.text = '';
this.value = '';
if (-1 != this.selectedIndex) {
var td = this.findElement('td_' + this.selectedIndex);
if (td) {
td.className = this.hasFocus ? 'dynaViewItemFocus' : 'dynaViewItemSelected';
this.text = td.getAttribute('zenText');
this.value = td.getAttribute('zenValue');
if (scroll) {
if ('details' == this.viewType && 0==this.selectedIndex) {
this.getEnclosingDiv().scrollTop = 0;
}
else {
zenScrollIntoView(this.getEnclosingDiv(),td);
}
}
}
}
zenInvokeCallbackMethod(this.onchange,this,'onchange');
}

self._ZEN_Component_dynaView_setProperty = function(property,value,value2) {
switch(property) {
case 'rows':
if (this.rows != value) {
this.rows = value;
this.refreshContents(true);
this.selectItem(this.selectedIndex);
}
break;
case 'viewType':
if (this.viewType != value) {
this.viewType = value;
this.refreshContents(true);
this.selectItem(this.selectedIndex);
}
break;
case 'parameters':
if ('' != value) {
if (this.parameters[value]) {
if (this.parameters[value].value != value2) {
this.parameters[value].value = value2;
this.refreshContents();
}
}
}
break;
case 'text':
case 'value':
break;
case 'selectedIndex':
this.selectItem(value,true);
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_dynaView_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_dynaView__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_ZEN_Component_dynaView.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _ZEN_Component_dynaView.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_dynaView;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.dynaView';
	p._type = 'dynaView';
	p.serialize = _ZEN_Component_dynaView_serialize;
	p.getSettings = _ZEN_Component_dynaView_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_dynaView_ReallyRefreshContents;
	p.dvKeyBlur = _ZEN_Component_dynaView_dvKeyBlur;
	p.dvKeyDownHandler = _ZEN_Component_dynaView_dvKeyDownHandler;
	p.dvKeyFocus = _ZEN_Component_dynaView_dvKeyFocus;
	p.dvKeyPressHandler = _ZEN_Component_dynaView_dvKeyPressHandler;
	p.focus = _ZEN_Component_dynaView_focus;
	p.headerClicked = _ZEN_Component_dynaView_headerClicked;
	p.itemClicked = _ZEN_Component_dynaView_itemClicked;
	p.itemDblClicked = _ZEN_Component_dynaView_itemDblClicked;
	p.moveToItem = _ZEN_Component_dynaView_moveToItem;
	p.onCreate = _ZEN_Component_dynaView_onCreate;
	p.selectItem = _ZEN_Component_dynaView_selectItem;
	p.setProperty = _ZEN_Component_dynaView_setProperty;
}
/* EOF */