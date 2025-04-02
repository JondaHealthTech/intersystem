/*** Zen Module: ZEN_Component_calendar ***/

self._zenClassIdx['calendar'] = '_ZEN_Component_calendar';
self._ZEN_Component_calendar = function(index,id) {
	if (index>=0) {_ZEN_Component_calendar__init(this,index,id);}
}

self._ZEN_Component_calendar__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_control__init) ?zenMaster._ZEN_Component_control__init(o,index,id):_ZEN_Component_control__init(o,index,id);
	o.dayList = '';
	o.defaultTime = '';
	o.endYear = '';
	o.firstDayOfWeek = '0';
	o.fixedMonth = false;
	o.gapWidth = '40px';
	o.isRange = false;
	o.listOfValues = new Array();
	o.maxDate = '';
	o.minDate = '';
	o.month = '';
	o.monthList = '';
	o.multiSelect = false;
	o.rangeSelect = false;
	o.showTime = false;
	o.startYear = '';
	o.timeCaption = '';
	o.year = '';
}
function _ZEN_Component_calendar_serialize(set,s)
{
	var o = this;s[0]='302118545';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.clientType;s[9]=o.containerStyle;s[10]=o.controlClass;s[11]=o.controlStyle;s[12]=o.dataBinding;s[13]=o.dayList;s[14]=o.defaultTime;s[15]=(o.disabled?1:0);s[16]=(o.dragEnabled?1:0);s[17]=(o.dropEnabled?1:0);s[18]=(o.dynamic?1:0);s[19]=o.enclosingClass;s[20]=o.enclosingStyle;s[21]=o.endYear;s[22]=o.error;s[23]=o.firstDayOfWeek;s[24]=(o.fixedMonth?1:0);s[25]=o.gapWidth;s[26]=o.height;s[27]=(o.hidden?1:0);s[28]=o.hint;s[29]=o.hintClass;s[30]=o.hintStyle;s[31]=(o.invalid?1:0);s[32]=o.invalidMessage;s[33]=(o.isRange?1:0);s[34]=o.label;s[35]=o.labelClass;s[36]=o.labelDisabledClass;s[37]=o.labelStyle;s[38]=set.serializeList(o,o.listOfValues,false,'listOfValues');s[39]=o.maxDate;s[40]=o.minDate;s[41]=o.month;s[42]=o.monthList;s[43]=(o.multiSelect?1:0);s[44]=o.onafterdrag;s[45]=o.onbeforedrag;s[46]=o.onblur;s[47]=o.onchange;s[48]=o.onclick;s[49]=o.ondblclick;s[50]=o.ondrag;s[51]=o.ondrop;s[52]=o.onfocus;s[53]=o.onhide;s[54]=o.onkeydown;s[55]=o.onkeypress;s[56]=o.onkeyup;s[57]=o.onmousedown;s[58]=o.onmouseout;s[59]=o.onmouseover;s[60]=o.onmouseup;s[61]=o.onrefresh;s[62]=o.onshow;s[63]=o.onsubmit;s[64]=o.ontouchend;s[65]=o.ontouchmove;s[66]=o.ontouchstart;s[67]=o.onupdate;s[68]=o.onvalidate;s[69]=o.originalValue;s[70]=o.overlayMode;s[71]=(o.rangeSelect?1:0);s[72]=(o.readOnly?1:0);s[73]=o.renderFlag;s[74]=(o.required?1:0);s[75]=o.requiredMessage;s[76]=(o.showLabel?1:0);s[77]=(o.showTime?1:0);s[78]=o.slice;s[79]=o.startYear;s[80]=o.tabIndex;s[81]=o.timeCaption;s[82]=o.title;s[83]=o.tuple;s[84]=o.valign;s[85]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[86]=(o.visible?1:0);s[87]=o.width;s[88]=o.year;
}
function _ZEN_Component_calendar_getSettings(s)
{
	s['name'] = 'string';
	s['dayList'] = 'csv';
	s['defaultTime'] = 'string';
	s['endYear'] = 'integer';
	s['firstDayOfWeek'] = 'integer';
	s['fixedMonth'] = 'boolean';
	s['gapWidth'] = 'length';
	s['isRange'] = 'boolean';
	s['listOfValues'] = 'string';
	s['maxDate'] = 'string';
	s['minDate'] = 'string';
	s['month'] = 'integer';
	s['monthList'] = 'csv';
	s['multiSelect'] = 'boolean';
	s['rangeSelect'] = 'boolean';
	s['showTime'] = 'boolean';
	s['startYear'] = 'integer';
	s['timeCaption'] = 'caption';
	s['year'] = 'integer';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_calendar_changeMonth = function() {
var selYear = this.findElement('calendarYear');
var selMonth = this.findElement('calendarMonth');
if (!selYear || !selMonth) return;
var year = selYear.value;
var month = selMonth.value;
this.year = ('' == year) ? this.year : year;
this.month = ('' == month) ? this.month : month;
this.renderCalendar();
}

self._ZEN_Component_calendar_findEndYear = function() {
var ret = null;
if ('' == this.endYear) {
if ('' != this.maxDate) {
var maxD = zenParseDate(this.maxDate);
if (-1 != maxD) {
ret = parseInt(maxD.substr(0,4),10);
}
}
if (null == ret) {
var now = new Date();
ret = now.getFullYear() + 30;
}
}
else {
ret = this.endYear;
}
return ret;
}

self._ZEN_Component_calendar_findStartYear = function() {
var ret = null;
if ('' == this.startYear) {
if ('' != this.minDate) {
var minD = zenParseDate(this.minDate);
if (-1 != minD) {
ret = parseInt(minD.substr(0,4),10);
}
}
if (null == ret) {
var now = new Date();
ret = now.getFullYear() - 10;
}
}
else {
ret = this.startYear;
}
return ret;
}

self._ZEN_Component_calendar_nextMonth = function() {
if (this.readOnly || this.disabled) return;
if (this.month == 12 && this.year == this.endYear) return;
this.month++;
if (this.month > 12) {
this.month = 1;
this.year++;
}
var selYear = this.findElement('calendarYear');
var selMonth = this.findElement('calendarMonth');
selYear.value = this.year;
selMonth.value = this.month;
this.renderCalendar();
}

self._ZEN_Component_calendar_parseDate = function(value) {
var tYear = parseInt(value.substr(0,4),10);
var tMonth = parseInt(value.substr(5,2),10);
var tDay = parseInt(value.substr(8,2),10);
var tTime = '';
if (this.showTime) {
var tTime = value.substr(11);
tTime = zenNormalizeTime(tTime);
}
if (tYear >= this.findStartYear() && tYear <= this.findEndYear() &&
tMonth >= 1 && tMonth <= 12 &&
tDay >= 1 && tDay <= 31) {
var d = new Date(tYear,tMonth-1,tDay);
this.year = d.getFullYear();
this.month = d.getMonth() + 1;
var selYear = this.findElement('calendarYear');
var selMonth = this.findElement('calendarMonth');
if (selYear && selMonth) {
selYear.value = this.year;
selMonth.value = this.month;
}
if (this.showTime) {
var ctrl = this.findElement('time');
if (ctrl) {
ctrl.value = tTime;
}
}
value = this.year+'-'+(this.month<10?'0':'')+this.month+'-'+(d.getDate()<10?'0':'')+d.getDate()+(''==tTime?'':' ')+tTime;
}
else {
value = '';
}
return value;
}

self._ZEN_Component_calendar_prevMonth = function() {
if (this.readOnly || this.disabled) return;
if (this.month == 1 && this.year == this.findStartYear()) return;
this.month--;
if (this.month <= 0) {
this.month = 12;
this.year--;
}
var selYear = this.findElement('calendarYear');
var selMonth = this.findElement('calendarMonth');
selYear.value = this.year;
selMonth.value = this.month;
this.renderCalendar();
}

self._ZEN_Component_calendar_renderCalendar = function() {
var div = this.findElement('calendarDiv');
if (!div) return;
zenASSERT(div,"Unable to find calendarDiv.",arguments);
var html = new Array();
html[html.length] = '<table class="calendar" width="100%" border="0" cellpadding="0" cellspacing="0">';
var days = this.dayList.split(',');
html[html.length] = '<tr>';
for (var d = 0; d < 7; d++) {
var dnum = (d + parseInt(this.firstDayOfWeek,10)) % 7;
var dname = (days[dnum]==null || days[dnum]=='') ? '&#160;' : days[dnum];
html[html.length] = '<th '+(this.disabled?'class="calendarDisabled"':'')+'>' + dname + '</th>';
}
html[html.length] = '</tr>';
var tYear = parseInt(this.value.substr(0,4),10);
var tMonth = parseInt(this.value.substr(5,2),10);
var tDay = parseInt(this.value.substr(8,2),10);
if ('' != this.minDate) {
var minD = zenParseDate(this.minDate);
if (-1 != minD) {
var minYear = parseInt(minD.substr(0,4),10);
var minMonth = parseInt(minD.substr(5,2),10);
var minDay = parseInt(minD.substr(8,2),10);
}
}
if ('' != this.maxDate) {
var maxD = zenParseDate(this.maxDate);
if (-1 != maxD) {
var maxYear = parseInt(maxD.substr(0,4),10);
var maxMonth = parseInt(maxD.substr(5,2),10);
var maxDay = parseInt(maxD.substr(8,2),10);
}
}
var currMonth = new Date(this.year,this.month - 1);
var firstDay = currMonth.getDay();
var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
var now = new Date();
if (this.year%4 == 0) {
if (this.year%100 == 0 && this.year%400 != 0) {
}
else {
daysInMonth[1] = 29;
}
}
var adj = firstDay - parseInt(this.firstDayOfWeek,10);
adj = (adj < 0) ? adj + 7 : adj;
var prevCell = 41 - adj;
var nextCell = 42 - adj;
if (this.fixedMonth) {
prevCell = -100;
nextCell = -100;
}
var val = '';
var dayno = parseInt(this.firstDayOfWeek,10) - firstDay;
dayno = dayno > 0 ? dayno - 7: dayno;
for (var r = 0; r < 6; r++) {
html[html.length] = '<tr>';
for (var d = 0; d < 7; d++) {
var dnum = (d + parseInt(this.firstDayOfWeek,10)) % 7;
dayno++;
var cell = (dayno>0 && dayno <= daysInMonth[this.month-1]) ? dayno : '';
if ('' == cell) {
if (dayno == prevCell) {
html[html.length] = '<td class="' + (this.disabled?"calendarDisabled":"calendarLink") + '" onclick="zenPage.getComponent(' + this.index + ').prevMonth();">&#171;</td>';
}
else if (dayno == nextCell) {
html[html.length] = '<td class="' + (this.disabled?"calendarDisabled":"calendarLink") + '" onclick="zenPage.getComponent(' + this.index + ').nextMonth();">&#187;</td>';
}
else {
html[html.length] = '<td class="'+(this.disabled?"calendarDisabled":"calendarEmpty")+'">&#160;</td>';
}
}
else {
var onclk = ' onmousedown="zenPage.getComponent(' + this.index + ').selectDay('+dayno+',event);"';
var style;
if (this.disabled) {
style = 'class="calendarDisabled"';
}
else if (maxYear && ((this.year > maxYear) || (this.year == maxYear && this.month > maxMonth) || (this.year == maxYear && this.month == maxMonth && dayno > maxDay))) {
style = 'class="calendarDisabled"';
onclk = '';
}
else if (minYear && ((this.year < minYear) || (this.year == minYear && this.month < minMonth) || (this.year == minYear && this.month == minMonth && dayno < minDay))) {
style = 'class="calendarDisabled"';
onclk = '';
}
else if (this.year == tYear && this.month == tMonth && dayno == tDay) {
style = 'class="calendarSelected"';
}
else if (this.year == now.getFullYear() && this.month == (now.getMonth()+1) && dayno == now.getDate()) {
style = 'class="calendarToday"';
}
else {
style = 'class="calendarDay'+dnum+'"';
}
if (this.multiSelect && !this.isRange && this.listOfValues.length > 1) {
for (var n = 0; n < this.listOfValues.length; n++) {
var tListYear = parseInt(this.listOfValues[n].substr(0,4),10);
var tListMonth = parseInt(this.listOfValues[n].substr(5,2),10);
var tListDay = parseInt(this.listOfValues[n].substr(8,2),10);
if (this.year == tListYear && this.month == tListMonth && dayno == tListDay) {
style = 'class="calendarSelected"';
}
}
}
if (this.rangeSelect && this.isRange && this.listOfValues.length == 2) {
var test = this.year+'-'+(this.month<10?'0':'')+this.month+'-'+(dayno<10?'0':'')+dayno;
if (test >= this.listOfValues[0] && test <= this.listOfValues[1]) {
style = 'class="calendarSelected"';
}
}
html[html.length] = '<td ' + style + onclk + '>' + cell + '</td>';
}
}
html[html.length] = '</tr>';
}
html[html.length] = '</table>';
div.innerHTML = html.join("");
}

self._ZEN_Component_calendar_renderCalendarAll = function() {
if (this.getEnclosingDiv() == null) return;
if ('' == this.monthList) {
this.monthList = zenText('zenMonthNames');
}
if ('' == this.dayList) {
this.dayList = zenText('zenDayShortNames');
}
if (zenIsMissing(this.startYear)) this.startYear = this.findStartYear();
if (zenIsMissing(this.year)) {
var now = new Date();
this.year = now.getFullYear();
}
if (zenIsMissing(this.month)) {
var now = new Date();
this.month = now.getMonth()+1;
}
var year = this.year;
var month = this.month;
var tTime = '';
if ('' != this.value) {
year = parseInt(this.value.substr(0,4),10);
month = parseInt(this.value.substr(5,2),10);
}
if (this.showTime) {
var tTime = this.value.substr(11);
tTime = zenNormalizeTime(tTime);
if ('' == tTime && '' != this.defaultTime) {
tTime = this.defaultTime;
}
}
var html = new Array();
html[html.length] = '<input type="hidden" id="'+this.makeId('control')+'" name="'+ this.sysName() +'" value="'+this.value+'"\/>';
html[html.length] = '<table class="calendarOutline" title="'+this.title+'" border="1" cellspacing="0" cellpadding="0">';
html[html.length] = '<tr><td align="left">';
var months = this.monthList.split(',');
if (this.fixedMonth) {
var mname = (months[month-1]==null ? '' : months[month-1]);
html[html.length] = '<span class="calendarLabel">' + mname + '</span>';
}
else {
html[html.length] = '<select class="calendarSelect" id="'+this.makeId('calendarMonth')+'" onchange="zenPage.getComponent('+this.index+').changeMonth();">';
for (var m = 0; m < 12; m++) {
var mname = (months[m]==null ? '' : months[m]);
html[html.length] = '<option value="'+(m+1)+'" '+ ((m+1)==month ? 'selected="1"' : '') +'>'+mname+'<\/option>';
}
html[html.length] = '</select>';
}
html[html.length] = '</td><td class="calendarGap" width="'+this.gapWidth+'">&#160;</td><td align="right">';
if (this.fixedMonth) {
html[html.length] = '<span class="calendarLabel">' + year + '</span>';
}
else {
html[html.length] = '<select class="calendarSelect" id="'+this.makeId('calendarYear')+'" onchange="zenPage.getComponent('+this.index+').changeMonth();">';
for (y = this.findStartYear(); y <= this.findEndYear(); y++) {
html[html.length] = '<option value="'+y+'" '+(y==year ? 'selected="1"' : '') + '>'+y+'<\/option>';
}
html[html.length] = '</select>';
}
html[html.length] = '</td></tr><tr><td align="center" colspan="3">';
html[html.length] = '<div id="'+this.makeId('calendarDiv')+'"></div>';
html[html.length] = '</td></tr></table>';
if (this.showTime) {
html[html.length] = '<div class="calendarTimeDiv" id="'+this.makeId('timeDiv')+'">'+this.timeCaption+'<input id="'+this.makeId('time')+'" type="text" size="6" '+(this.disabled?'disabled ':'')+(this.readOnly?'readonly ':'')+'onkeypress="zenPage.getComponent('+this.index+').timeKeyHandler(event);" onchange="zenPage.getComponent('+this.index+').timeChangeHandler(event);" value="'+tTime+'"/></div>';
}
this.getEnclosingDiv().innerHTML = html.join('');
this.renderCalendar();
}

self._ZEN_Component_calendar_renderContents = function() {
this.renderCalendarAll();
}

self._ZEN_Component_calendar_selectDay = function(day,evt) {
if (this.readOnly || this.disabled) return;
if (null == day) {
this.listOfValues.length = 0;
day = parseInt(this.value.substr(8,2),10);
if (isNaN(day)) {
var now = new Date();
day = now.getDate();
}
}
this.value = this.year + '-' + ((this.month < 10) ? '0' : '') + this.month + '-' + ((day < 10) ? '0' : '') + day;
evt = evt ? evt : window.event;
if (this.rangeSelect && (this.multiSelect && evt && !evt.ctrlKey)) {
if (evt && evt.shiftKey && this.listOfValues.length >= 1) {
this.isRange = true;
this.listOfValues.length = 2;
this.listOfValues[1] = this.value;
if (this.listOfValues[0]>this.listOfValues[1]) {
var swap = this.listOfValues[0];
this.listOfValues[0] = this.listOfValues[1];
this.listOfValues[1] = swap;
}
}
else {
this.isRange = false;
this.listOfValues.length = 0;
this.listOfValues[0] = this.value;
}
}
else if (this.multiSelect) {
if (evt && evt.ctrlKey && !this.isRange) {
var exists = false;
for (var n = 0; n < this.listOfValues.length; n++) {
if (this.listOfValues[n] == this.value) {
exists = true;
break;
}
}
if (!exists) {
this.listOfValues[this.listOfValues.length] = this.value;
}
}
else {
this.listOfValues.length = 1;
this.listOfValues[0] = this.value;
}
this.isRange = false;
}
else {
this.isRange = false;
this.listOfValues.length = 1;
this.listOfValues[0] = this.value;
}
if (this.showTime) {
var t = this.findElement('time').value;
t = zenNormalizeTime(t);
if ('' == t && '' != this.defaultTime) {
t = this.defaultTime; // if null, initialize time with defaultTime
}
if ('' != t) {
this.value += ' ' + t;
}
this.findElement('time').value = t;
}
this.findElement('control').value = this.value;
this.renderCalendar();
this.onchangeHandler();
}

self._ZEN_Component_calendar_setProperty = function(property,value,value2) {
var el = this.findElement('control');
switch(property) {
case 'value':
this.listOfValues.length = 0;
this.isRange = false;
if (value != '') {
value = this.parseDate(value);
this.listOfValues[this.listOfValues.length] = value;
}
if (el) el.value = value;
this.value = value;
this.renderCalendar();
break;
case 'month':
value = parseInt(value,10);
value = (value < 1) ? 1 : value;
value = (value > 12) ? 12 : value;
this.month = value;
this.renderCalendarAll();
break;
case 'year':
value = parseInt(value,10);
value = (value < this.findStartYear()) ? this.findStartYear() : value;
value = (value > this.findEndYear()) ? this.findEndYear() : value;
this.year = value;
this.renderCalendarAll();
break;
case 'readOnly':
value = value ? true : false;
this.readOnly = value;
if (el) el.readOnly = value;
break;
case 'startYear':
if ('' != value) {
value = parseInt(value,10);
if (isNaN(value)) {
value = '';
}
else {
value = value < 1600 ? 1600 : value;
}
}
this.startYear = value;
this.renderCalendarAll();
break;
case 'endYear':
if ('' != value) {
value = parseInt(value,10);
if (isNaN(value)) {
value = '';
}
else {
value = parseInt(value,10);
value = value > 9999 ? 9999 : value;
}
}
this.endYear = value;
this.renderCalendarAll();
break;
case 'minDate':
case 'maxDate':
if (value != '') {
var v = zenParseDate(value);
value = (-1 == v) ? '' : v;
}
this[property] = value;
this.renderCalendarAll();
break;
case 'monthList':
this.monthList = value;
this.renderCalendarAll();
break;
case 'dayList':
this.dayList = value;
this.renderCalendar();
break;
case 'timeCaption':
this.timeCaption = value;
this.renderCalendar();
break;
case 'firstDayOfWeek':
value = parseInt(value,10);
value = (value < 0) ? 0 : value;
value = (value > 6) ? 6 : value;
this.firstDayOfWeek = value;
this.renderCalendar();
break;
case 'gapWidth':
this.gapWidth = value;
this.renderCalendarAll();
break;
case 'fixedMonth':
this.fixedMonth = value ? true : false;
this.renderCalendarAll();
break;
case 'showTime':
this.showTime = value ? true : false;
this.renderCalendarAll();
break;
case 'defaultTime':
this.defaultTime = zenNormalizeTime(value);
this.renderCalendarAll();
case 'multiSelect':
this.multiSelect = value ? true : false;
break;
case 'rangeSelect':
this.rangeSelect = value ? true : false;
break;
case 'disabled':
value = value ? true : false;
this.disabled = value;
var year = this.findElement('calendarYear');
var month = this.findElement('calendarMonth');
year.disabled = value;
month.disabled = value;
el.disabled = value;
if (this.showTime) {
this.renderCalendarAll();
}
else {
this.renderCalendar();
}
return this.invokeSuper('setProperty',arguments);
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_calendar_timeChangeHandler = function(evt) {
evt = evt ? evt : window.event;
this.selectDay(null,evt);
return true;
}

self._ZEN_Component_calendar_timeKeyHandler = function(evt) {
evt = evt ? evt : window.event;
switch(evt.keyCode) {
case zenENTER:
this.selectDay(null,evt);
return false;
default:
break;
}
return true;
}

self._ZEN_Component_calendar_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_calendar__Loader = function() {
	zenLoadClass('_ZEN_Component_control');
	_ZEN_Component_calendar.prototype = zenCreate('_ZEN_Component_control',-1);
	var p = _ZEN_Component_calendar.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_calendar;
	p.superClass = ('undefined' == typeof _ZEN_Component_control) ? zenMaster._ZEN_Component_control.prototype:_ZEN_Component_control.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.calendar';
	p._type = 'calendar';
	p.serialize = _ZEN_Component_calendar_serialize;
	p.getSettings = _ZEN_Component_calendar_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_calendar_ReallyRefreshContents;
	p.changeMonth = _ZEN_Component_calendar_changeMonth;
	p.findEndYear = _ZEN_Component_calendar_findEndYear;
	p.findStartYear = _ZEN_Component_calendar_findStartYear;
	p.nextMonth = _ZEN_Component_calendar_nextMonth;
	p.parseDate = _ZEN_Component_calendar_parseDate;
	p.prevMonth = _ZEN_Component_calendar_prevMonth;
	p.renderCalendar = _ZEN_Component_calendar_renderCalendar;
	p.renderCalendarAll = _ZEN_Component_calendar_renderCalendarAll;
	p.renderContents = _ZEN_Component_calendar_renderContents;
	p.selectDay = _ZEN_Component_calendar_selectDay;
	p.setProperty = _ZEN_Component_calendar_setProperty;
	p.timeChangeHandler = _ZEN_Component_calendar_timeChangeHandler;
	p.timeKeyHandler = _ZEN_Component_calendar_timeKeyHandler;
}
/* EOF */