/*** Zen Module: ZEN_ComponentEx_schedulePane ***/

self._zenClassIdx['schedulePane'] = '_ZEN_ComponentEx_schedulePane';
self._ZEN_ComponentEx_schedulePane = function(index,id) {
	if (index>=0) {_ZEN_ComponentEx_schedulePane__init(this,index,id);}
}

self._ZEN_ComponentEx_schedulePane__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.OnGetScheduleInfo = ''; // encrypted
	o.caption = '';
	o.cellHeight = '30';
	o.date = '';
	o.dateFormat = '-1';
	o.dayList = '';
	o.endTime = '1080';
	o.firstDayOfWeek = '0';
	o.headerHeight = '40';
	o.interval = '30';
	o.monthList = '';
	o.onchangeview = '';
	o.onselectitem = '';
	o.parameters = new Object();
	o.selectedInterval = '';
	o.selectedTime = '';
	o.shortDayList = '';
	o.shortMonthList = '';
	o.startTime = '480';
	o.view = 'day';
}
function _ZEN_ComponentEx_schedulePane_serialize(set,s)
{
	var o = this;s[0]='1805296010';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.OnGetScheduleInfo;s[7]=o.align;s[8]=o.aux;s[9]=o.caption;s[10]=o.cellHeight;s[11]=o.containerStyle;s[12]=o.date;s[13]=o.dateFormat;s[14]=o.dayList;s[15]=(o.dragEnabled?1:0);s[16]=(o.dropEnabled?1:0);s[17]=(o.dynamic?1:0);s[18]=o.enclosingClass;s[19]=o.enclosingStyle;s[20]=o.endTime;s[21]=o.error;s[22]=o.firstDayOfWeek;s[23]=o.headerHeight;s[24]=o.height;s[25]=(o.hidden?1:0);s[26]=o.hint;s[27]=o.hintClass;s[28]=o.hintStyle;s[29]=o.interval;s[30]=o.label;s[31]=o.labelClass;s[32]=o.labelDisabledClass;s[33]=o.labelStyle;s[34]=o.monthList;s[35]=o.onafterdrag;s[36]=o.onbeforedrag;s[37]=o.onchangeview;s[38]=o.ondrag;s[39]=o.ondrop;s[40]=o.onhide;s[41]=o.onrefresh;s[42]=o.onselectitem;s[43]=o.onshow;s[44]=o.onupdate;s[45]=o.overlayMode;s[46]=set.serializeArray(o,o.parameters,true,'parameters');s[47]=o.renderFlag;s[48]=o.selectedInterval;s[49]=o.selectedTime;s[50]=o.shortDayList;s[51]=o.shortMonthList;s[52]=(o.showLabel?1:0);s[53]=o.slice;s[54]=o.startTime;s[55]=o.title;s[56]=o.tuple;s[57]=o.valign;s[58]=o.view;s[59]=(o.visible?1:0);s[60]=o.width;
}
function _ZEN_ComponentEx_schedulePane_getSettings(s)
{
	s['name'] = 'string';
	s['caption'] = 'caption';
	s['cellHeight'] = 'length';
	s['date'] = 'string';
	s['dateFormat'] = 'integer';
	s['dayList'] = 'csv';
	s['endTime'] = 'integer';
	s['firstDayOfWeek'] = 'integer';
	s['headerHeight'] = 'length';
	s['interval'] = 'integer';
	s['monthList'] = 'csv';
	s['onchangeview'] = 'eventHandler';
	s['onselectitem'] = 'eventHandler';
	s['parameters'] = 'string';
	s['shortDayList'] = 'csv';
	s['shortMonthList'] = 'csv';
	s['startTime'] = 'integer';
	s['view'] = 'enum:day,week,month';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_ComponentEx_schedulePane_getDropTimeSlot = function() {
var tgtId = ZLM.getDragInnerDestination().id;
var tgtIndex = -1;
var tgtType = '';
if (tgtId) {
var div = self.document.getElementById(tgtId);
if (div && div.getAttribute('zenTime')) {
return div.getAttribute('zenTime');
}
}
return '';
}

self._ZEN_ComponentEx_schedulePane_mouseClickHandler = function(evt,type,time,cellId,userId,duration) {
evt = evt ? evt : window.event;
var multi = evt.ctrlKey && userId == null;
this.selectedInterval = duration;
this.selectItem(cellId, multi, time);
zenInvokeCallbackMethod(this.onselectitem,this,'onselectitem','id',userId,'time',this.selectedTime);
return true;
}

self._ZEN_ComponentEx_schedulePane_mouseDownHandler = function(evt) {
evt = evt ? evt : window.event;
if (evt.preventDefault) {
evt.preventDefault();
}
evt.cancelBubble = true;
return false;
}

self._ZEN_ComponentEx_schedulePane_moveToNewDay = function(delta) {
var curr;
if ('' == this.date) {
curr = new Date();
}
else {
curr = zenStringToDate(this.date);
}
var newDate = curr;
if (delta==28||delta==-28){
newDate.setMonth(curr.getMonth()+(delta/28));
} else {
newDate.setTime(parseInt(curr.getTime()) + (86400*1000*delta));
}
this.date = zenDateToString(newDate);
this.refreshContents();
}

self._ZEN_ComponentEx_schedulePane_nextPeriod = function() {
var delta;
switch (this.view) {
case 'week':
case '':
delta = 7;
break;
case 'month':
delta = 28;
break;
default:
delta = 1;
break;
}
this.moveToNewDay(delta);
}

self._ZEN_ComponentEx_schedulePane_onRefreshContents = function() {
delete this._selectedItems;
this.selectedTime = 0;
this.selectedInterval = 0;
}

self._ZEN_ComponentEx_schedulePane_previousPeriod = function() {
var delta;
switch (this.view) {
case 'week':
case '':
delta = -7;
break;
case 'month':
delta = -28;
break;
default:
delta = -1;
break;
}
this.moveToNewDay(delta);
}

self._ZEN_ComponentEx_schedulePane_selectItem = function(id,multi,time) {
if (this._selectedItems) {
if ('month' != this.view) {
if (this._selectedItems[0]) {
if (this._selectedItems[0].toString().charAt(0)=='u' || id.toString().charAt(0)=='u') {
multi = false;
}
else {
var idDay = id.split(':')[0];
var sDay = this._selectedItems[0].toString().split(':')[0];
if (sDay != idDay) {
multi = false;
}
}
}
}
if (!multi) {
for (var n = 0; n < this._selectedItems.length; n++) {
var div = this.findElement(this._selectedItems[n]);
if (div && div._oldClass) {
div.className = div._oldClass;
}
}
delete this._selectedItems;
}
}
if (id) {
if (!this._selectedItems) {
this._selectedItems = new Array();
}
this._selectedItems[this._selectedItems.length] = id;
if (multi && this._selectedItems.length > 1) {
this.selectedTime = (this.selectedTime == 0 || time < this.selectedTime) ? time : this.selectedTime;
this._selectedItems.sort();
var sDay,start,end;
if ('month' == this.view) {
sDay = this._selectedItems[0];
start = this._selectedItems[0];
end = this._selectedItems[this._selectedItems.length-1];
}
else {
sDay = this._selectedItems[0].toString().split(':')[0];
start = this._selectedItems[0].toString().split(':')[1];
end = this._selectedItems[this._selectedItems.length-1].toString().split(':')[1];
}
var newList = new Array();
for (var n = start; n <= end; n++) {
var nid = ('month' == this.view) ? n : (sDay+":"+n);
newList[newList.length] = nid;
var div = this.findElement(nid);
if (div) {
switch (div.className) {
case 'scheduleSlot':
div._oldClass = div.className;
div.className = 'scheduleSlotHi';
break;
case 'scheduleSlotBooked':
div._oldClass = div.className;
div.className = 'scheduleSlotBookedHi';
break;
case 'scheduleSlotUnavailable':
div._oldClass = div.className;
div.className = 'scheduleSlotUnavailableHi';
break;
case 'scheduleMonthCell':
case 'scheduleMonthCellGray':
div._oldClass = div.className;
div.className = 'scheduleMonthCellHi';
break;
}
}
}
this._selectedItems = newList;
this.selectedInterval = this._selectedItems.length * parseInt(this.interval);
}
else {
this.selectedTime = time;
var div = this.findElement(id);
if (div) {
switch (div.className) {
case 'scheduleSlot':
div._oldClass = div.className;
div.className = 'scheduleSlotHi';
break;
case 'scheduleSlotBooked':
div._oldClass = div.className;
div.className = 'scheduleSlotBookedHi';
break;
case 'scheduleSlotUnavailable':
div._oldClass = div.className;
div.className = 'scheduleSlotUnavailableHi';
break;
case 'scheduleMonthCell':
case 'scheduleMonthCellGray':
div._oldClass = div.className;
div.className = 'scheduleMonthCellHi';
break;
}
}
}
}
else {
this.selectedTime = 0;
this.selectedInterval = 0;
}
}

self._ZEN_ComponentEx_schedulePane_setDate = function(date) {
this.setProperty('date',date);
}

self._ZEN_ComponentEx_schedulePane_setInterval = function(interval) {
this.setProperty('interval',interval);
}

self._ZEN_ComponentEx_schedulePane_setProperty = function(property,value,value2) {
switch(property) {
case 'date':
if (this.date != value) {
this.date = value;
this.refreshContents();
}
break;
case 'view':
if (this.view != value) {
this.view = value;
this.refreshContents();
}
break;
case 'interval':
if (this.interval != value) {
this.interval = value;
this.refreshContents();
}
break;
case 'caption':
this.caption = value;
var el = this.findElement('caption');
if (el) {
el.innerHTML = this.caption;
}
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_ComponentEx_schedulePane_setView = function(view) {
if (view != this.view) {
this.setProperty('view',view);
zenInvokeCallbackMethod(this.onchangeview,this,'onchangeview');
}
}

self._ZEN_ComponentEx_schedulePane_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_ComponentEx_schedulePane__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_ZEN_ComponentEx_schedulePane.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _ZEN_ComponentEx_schedulePane.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_ComponentEx_schedulePane;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.ComponentEx.schedulePane';
	p._type = 'schedulePane';
	p.serialize = _ZEN_ComponentEx_schedulePane_serialize;
	p.getSettings = _ZEN_ComponentEx_schedulePane_getSettings;
	p.ReallyRefreshContents = _ZEN_ComponentEx_schedulePane_ReallyRefreshContents;
	p.getDropTimeSlot = _ZEN_ComponentEx_schedulePane_getDropTimeSlot;
	p.mouseClickHandler = _ZEN_ComponentEx_schedulePane_mouseClickHandler;
	p.mouseDownHandler = _ZEN_ComponentEx_schedulePane_mouseDownHandler;
	p.moveToNewDay = _ZEN_ComponentEx_schedulePane_moveToNewDay;
	p.nextPeriod = _ZEN_ComponentEx_schedulePane_nextPeriod;
	p.onRefreshContents = _ZEN_ComponentEx_schedulePane_onRefreshContents;
	p.previousPeriod = _ZEN_ComponentEx_schedulePane_previousPeriod;
	p.selectItem = _ZEN_ComponentEx_schedulePane_selectItem;
	p.setDate = _ZEN_ComponentEx_schedulePane_setDate;
	p.setInterval = _ZEN_ComponentEx_schedulePane_setInterval;
	p.setProperty = _ZEN_ComponentEx_schedulePane_setProperty;
	p.setView = _ZEN_ComponentEx_schedulePane_setView;
}
/* EOF */