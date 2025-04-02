/*** Zen Module: HS_Test_UI_Component ***/

self._zenClassIdx['http://www.intersystems.com/zen/hs/asyncOperation'] = 'HS_Test_UI_Component_asyncOperation';
self.HS_Test_UI_Component_asyncOperation = function(index,id) {
	if (index>=0) {HS_Test_UI_Component_asyncOperation__init(this,index,id);}
}

self.HS_Test_UI_Component_asyncOperation__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_composite__init) ?zenMaster._ZEN_Component_composite__init(o,index,id):_ZEN_Component_composite__init(o,index,id);
	o.logger = null;
}
function HS_Test_UI_Component_asyncOperation_serialize(set,s)
{
	var o = this;s[0]='1863418708';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.cellAlign;s[9]=o.cellSize;s[10]=o.cellStyle;s[11]=o.cellVAlign;s[12]=set.serializeList(o,o.children,true,'children');s[13]=(o.childrenCreated?1:0);s[14]=o.containerStyle;s[15]=(o.disabled?1:0);s[16]=(o.dragEnabled?1:0);s[17]=(o.dropEnabled?1:0);s[18]=(o.dynamic?1:0);s[19]=o.enclosingClass;s[20]=o.enclosingStyle;s[21]=o.error;s[22]=o.groupClass;s[23]=o.groupStyle;s[24]=o.height;s[25]=(o.hidden?1:0);s[26]=o.hint;s[27]=o.hintClass;s[28]=o.hintStyle;s[29]=o.label;s[30]=o.labelClass;s[31]=o.labelDisabledClass;s[32]=o.labelPosition;s[33]=o.labelStyle;s[34]=o.layout;s[35]=set.addObject(o.logger,'logger');s[36]=o.onafterdrag;s[37]=o.onbeforedrag;s[38]=o.onclick;s[39]=o.ondrag;s[40]=o.ondrop;s[41]=o.onhide;s[42]=o.onrefresh;s[43]=o.onshow;s[44]=o.onupdate;s[45]=o.overlayMode;s[46]=o.renderFlag;s[47]=(o.showLabel?1:0);s[48]=o.slice;s[49]=o.title;s[50]=o.tuple;s[51]=o.valign;s[52]=(o.visible?1:0);s[53]=o.width;
}
function HS_Test_UI_Component_asyncOperation_getSettings(s)
{
	s['name'] = 'string';
	s['logger'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self.HS_Test_UI_Component_asyncOperation_execute = function(buttonToDisable,callback) {
var txtGroupID = this.getChildById('txtGroupID')
txtGroupID.setProperty("value",'');
var txtTimerSearchID = this.getChildById('txtTimerSearchID')
txtTimerSearchID.setProperty("value",'');
this.toggleButton(buttonToDisable,1);
var SearchId = callback();
if(SearchId=='Failed') {
return;
}
if(SearchId == '') {
this.toggleButton(buttonToDisable,0);
} else {
this.timeout();
}
}

self.HS_Test_UI_Component_asyncOperation_timeout = function() {
var timer = this.getChildById('timer');
var SearchId = this.getChildById("txtTimerSearchID").value;
if(SearchId=='Failed') {
this.getChildById('lblTimerTicks').setProperty("value",'');
zen('btnSend').setProperty('disabled',false);
return;
}
if(SearchId=='') {
status='Waiting'
} else {
status = this.GetSearchStatus(SearchId);
}
var txtTimerCount = this.getChildById('txtTimerCount')
timerCount = txtTimerCount.value;
timerCount = ++timerCount;
var lblTimerTicks = this.getChildById('lblTimerTicks')
if (status == "Waiting") {
var timeoutMilliseconds=(timerCount>5) ?2500:1000;
timer.timeout= timeoutMilliseconds;
var numTicks = ((timerCount - 1) % 31) +1
var ticks = "...............................".substring(0,numTicks)
lblTimerTicks.setProperty("value",ticks);
timer.startTimer();
} else {
lblTimerTicks.setProperty("value",'');
timerCount=0;
}
txtTimerCount.setProperty("value",timerCount);
}

self.HS_Test_UI_Component_asyncOperation_toggleButton = function(pButton,pDisabled) {
pButton.setProperty('disabled',pDisabled);
}

self.HS_Test_UI_Component_asyncOperation_GetSearchStatus = function(SearchId) {
	return zenInstanceMethod(this,'GetSearchStatus','L','VARCHAR',arguments);
}

self.HS_Test_UI_Component_asyncOperation_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self.HS_Test_UI_Component_asyncOperation__Loader = function() {
	zenLoadClass('_ZEN_Component_composite');
	HS_Test_UI_Component_asyncOperation.prototype = zenCreate('_ZEN_Component_composite',-1);
	var p = HS_Test_UI_Component_asyncOperation.prototype;
	if (null==p) {return;}
	p.constructor = HS_Test_UI_Component_asyncOperation;
	p.superClass = ('undefined' == typeof _ZEN_Component_composite) ? zenMaster._ZEN_Component_composite.prototype:_ZEN_Component_composite.prototype;
	p.__ZENcomponent = true;
	p._serverClass = 'HS.Test.UI.Component.asyncOperation';
	p._type = 'asyncOperation';
	p.serialize = HS_Test_UI_Component_asyncOperation_serialize;
	p.getSettings = HS_Test_UI_Component_asyncOperation_getSettings;
	p.GetSearchStatus = HS_Test_UI_Component_asyncOperation_GetSearchStatus;
	p.ReallyRefreshContents = HS_Test_UI_Component_asyncOperation_ReallyRefreshContents;
	p.execute = HS_Test_UI_Component_asyncOperation_execute;
	p.timeout = HS_Test_UI_Component_asyncOperation_timeout;
	p.toggleButton = HS_Test_UI_Component_asyncOperation_toggleButton;
}

self._zenClassIdx['http://www.intersystems.com/zen/hs/loggingCheckbox'] = 'HS_Test_UI_Component_loggingCheckbox';
self.HS_Test_UI_Component_loggingCheckbox = function(index,id) {
	if (index>=0) {HS_Test_UI_Component_loggingCheckbox__init(this,index,id);}
}

self.HS_Test_UI_Component_loggingCheckbox__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_composite__init) ?zenMaster._ZEN_Component_composite__init(o,index,id):_ZEN_Component_composite__init(o,index,id);
}
function HS_Test_UI_Component_loggingCheckbox_serialize(set,s)
{
	var o = this;s[0]='4096323540';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.cellAlign;s[9]=o.cellSize;s[10]=o.cellStyle;s[11]=o.cellVAlign;s[12]=set.serializeList(o,o.children,true,'children');s[13]=(o.childrenCreated?1:0);s[14]=o.containerStyle;s[15]=(o.disabled?1:0);s[16]=(o.dragEnabled?1:0);s[17]=(o.dropEnabled?1:0);s[18]=(o.dynamic?1:0);s[19]=o.enclosingClass;s[20]=o.enclosingStyle;s[21]=o.error;s[22]=o.groupClass;s[23]=o.groupStyle;s[24]=o.height;s[25]=(o.hidden?1:0);s[26]=o.hint;s[27]=o.hintClass;s[28]=o.hintStyle;s[29]=o.label;s[30]=o.labelClass;s[31]=o.labelDisabledClass;s[32]=o.labelPosition;s[33]=o.labelStyle;s[34]=o.layout;s[35]=o.onafterdrag;s[36]=o.onbeforedrag;s[37]=o.onclick;s[38]=o.ondrag;s[39]=o.ondrop;s[40]=o.onhide;s[41]=o.onrefresh;s[42]=o.onshow;s[43]=o.onupdate;s[44]=o.overlayMode;s[45]=o.renderFlag;s[46]=(o.showLabel?1:0);s[47]=o.slice;s[48]=o.title;s[49]=o.tuple;s[50]=o.valign;s[51]=(o.visible?1:0);s[52]=o.width;
}
function HS_Test_UI_Component_loggingCheckbox_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self.HS_Test_UI_Component_loggingCheckbox_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self.HS_Test_UI_Component_loggingCheckbox__Loader = function() {
	zenLoadClass('_ZEN_Component_composite');
	HS_Test_UI_Component_loggingCheckbox.prototype = zenCreate('_ZEN_Component_composite',-1);
	var p = HS_Test_UI_Component_loggingCheckbox.prototype;
	if (null==p) {return;}
	p.constructor = HS_Test_UI_Component_loggingCheckbox;
	p.superClass = ('undefined' == typeof _ZEN_Component_composite) ? zenMaster._ZEN_Component_composite.prototype:_ZEN_Component_composite.prototype;
	p.__ZENcomponent = true;
	p._serverClass = 'HS.Test.UI.Component.loggingCheckbox';
	p._type = 'loggingCheckbox';
	p.serialize = HS_Test_UI_Component_loggingCheckbox_serialize;
	p.getSettings = HS_Test_UI_Component_loggingCheckbox_getSettings;
	p.ReallyRefreshContents = HS_Test_UI_Component_loggingCheckbox_ReallyRefreshContents;
}

self._zenClassIdx['http://www.intersystems.com/zen/hs/messageLog'] = 'HS_Test_UI_Component_messageLog';
self.HS_Test_UI_Component_messageLog = function(index,id) {
	if (index>=0) {HS_Test_UI_Component_messageLog__init(this,index,id);}
}

self.HS_Test_UI_Component_messageLog__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_composite__init) ?zenMaster._ZEN_Component_composite__init(o,index,id):_ZEN_Component_composite__init(o,index,id);
	o.IsConnectathon = false;
}
function HS_Test_UI_Component_messageLog_serialize(set,s)
{
	var o = this;s[0]='2373033053';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=(o.IsConnectathon?1:0);s[7]=o.align;s[8]=o.aux;s[9]=o.cellAlign;s[10]=o.cellSize;s[11]=o.cellStyle;s[12]=o.cellVAlign;s[13]=set.serializeList(o,o.children,true,'children');s[14]=(o.childrenCreated?1:0);s[15]=o.containerStyle;s[16]=(o.disabled?1:0);s[17]=(o.dragEnabled?1:0);s[18]=(o.dropEnabled?1:0);s[19]=(o.dynamic?1:0);s[20]=o.enclosingClass;s[21]=o.enclosingStyle;s[22]=o.error;s[23]=o.groupClass;s[24]=o.groupStyle;s[25]=o.height;s[26]=(o.hidden?1:0);s[27]=o.hint;s[28]=o.hintClass;s[29]=o.hintStyle;s[30]=o.label;s[31]=o.labelClass;s[32]=o.labelDisabledClass;s[33]=o.labelPosition;s[34]=o.labelStyle;s[35]=o.layout;s[36]=o.onafterdrag;s[37]=o.onbeforedrag;s[38]=o.onclick;s[39]=o.ondrag;s[40]=o.ondrop;s[41]=o.onhide;s[42]=o.onrefresh;s[43]=o.onshow;s[44]=o.onupdate;s[45]=o.overlayMode;s[46]=o.renderFlag;s[47]=(o.showLabel?1:0);s[48]=o.slice;s[49]=o.title;s[50]=o.tuple;s[51]=o.valign;s[52]=(o.visible?1:0);s[53]=o.width;
}
function HS_Test_UI_Component_messageLog_getSettings(s)
{
	s['name'] = 'string';
	s['IsConnectathon'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self.HS_Test_UI_Component_messageLog_ClearResult = function() {
	zenInstanceMethod(this,'ClearResult','','',arguments);
}

self.HS_Test_UI_Component_messageLog_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self.HS_Test_UI_Component_messageLog__Loader = function() {
	zenLoadClass('_ZEN_Component_composite');
	HS_Test_UI_Component_messageLog.prototype = zenCreate('_ZEN_Component_composite',-1);
	var p = HS_Test_UI_Component_messageLog.prototype;
	if (null==p) {return;}
	p.constructor = HS_Test_UI_Component_messageLog;
	p.superClass = ('undefined' == typeof _ZEN_Component_composite) ? zenMaster._ZEN_Component_composite.prototype:_ZEN_Component_composite.prototype;
	p.__ZENcomponent = true;
	p._serverClass = 'HS.Test.UI.Component.messageLog';
	p._type = 'messageLog';
	p.serialize = HS_Test_UI_Component_messageLog_serialize;
	p.getSettings = HS_Test_UI_Component_messageLog_getSettings;
	p.ClearResult = HS_Test_UI_Component_messageLog_ClearResult;
	p.ReallyRefreshContents = HS_Test_UI_Component_messageLog_ReallyRefreshContents;
}

self._zenClassIdx['http://www.intersystems.com/zen/hs/patientSelect'] = 'HS_Test_UI_Component_patientSelect';
self.HS_Test_UI_Component_patientSelect = function(index,id) {
	if (index>=0) {HS_Test_UI_Component_patientSelect__init(this,index,id);}
}

self.HS_Test_UI_Component_patientSelect__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_composite__init) ?zenMaster._ZEN_Component_composite__init(o,index,id):_ZEN_Component_composite__init(o,index,id);
	o.onselect = '';
}
function HS_Test_UI_Component_patientSelect_serialize(set,s)
{
	var o = this;s[0]='3203662223';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.cellAlign;s[9]=o.cellSize;s[10]=o.cellStyle;s[11]=o.cellVAlign;s[12]=set.serializeList(o,o.children,true,'children');s[13]=(o.childrenCreated?1:0);s[14]=o.containerStyle;s[15]=(o.disabled?1:0);s[16]=(o.dragEnabled?1:0);s[17]=(o.dropEnabled?1:0);s[18]=(o.dynamic?1:0);s[19]=o.enclosingClass;s[20]=o.enclosingStyle;s[21]=o.error;s[22]=o.groupClass;s[23]=o.groupStyle;s[24]=o.height;s[25]=(o.hidden?1:0);s[26]=o.hint;s[27]=o.hintClass;s[28]=o.hintStyle;s[29]=o.label;s[30]=o.labelClass;s[31]=o.labelDisabledClass;s[32]=o.labelPosition;s[33]=o.labelStyle;s[34]=o.layout;s[35]=o.onafterdrag;s[36]=o.onbeforedrag;s[37]=o.onclick;s[38]=o.ondrag;s[39]=o.ondrop;s[40]=o.onhide;s[41]=o.onrefresh;s[42]=o.onselect;s[43]=o.onshow;s[44]=o.onupdate;s[45]=o.overlayMode;s[46]=o.renderFlag;s[47]=(o.showLabel?1:0);s[48]=o.slice;s[49]=o.title;s[50]=o.tuple;s[51]=o.valign;s[52]=(o.visible?1:0);s[53]=o.width;
}
function HS_Test_UI_Component_patientSelect_getSettings(s)
{
	s['name'] = 'string';
	s['onselect'] = 'eventHandler';
	this.invokeSuper('getSettings',arguments);
}

self.HS_Test_UI_Component_patientSelect_selectPatient = function() {
patientID = zenThis.composite.getChildById("cmbPatientID2").getValue();
zenThis.composite.getChildById("txtPatientID2").setValue(patientID);
if (zenThis.onselect) zenInvokeCallbackMethod(this.onselect, this, 'onselect');
}

self.HS_Test_UI_Component_patientSelect_updatePatientID = function() {
var value = zenThis.value;
var newvalue = zenThis.composite.NormalizePatientID(value);
zenThis.setProperty("value",newvalue);
}

self.HS_Test_UI_Component_patientSelect_NormalizePatientID = function(pPatientID) {
	return zenClassMethod(this,'NormalizePatientID','L','VARCHAR',arguments);
}

self.HS_Test_UI_Component_patientSelect_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self.HS_Test_UI_Component_patientSelect__Loader = function() {
	zenLoadClass('_ZEN_Component_composite');
	HS_Test_UI_Component_patientSelect.prototype = zenCreate('_ZEN_Component_composite',-1);
	var p = HS_Test_UI_Component_patientSelect.prototype;
	if (null==p) {return;}
	p.constructor = HS_Test_UI_Component_patientSelect;
	p.superClass = ('undefined' == typeof _ZEN_Component_composite) ? zenMaster._ZEN_Component_composite.prototype:_ZEN_Component_composite.prototype;
	p.__ZENcomponent = true;
	p._serverClass = 'HS.Test.UI.Component.patientSelect';
	p._type = 'patientSelect';
	p.serialize = HS_Test_UI_Component_patientSelect_serialize;
	p.getSettings = HS_Test_UI_Component_patientSelect_getSettings;
	p.NormalizePatientID = HS_Test_UI_Component_patientSelect_NormalizePatientID;
	p.ReallyRefreshContents = HS_Test_UI_Component_patientSelect_ReallyRefreshContents;
	p.selectPatient = HS_Test_UI_Component_patientSelect_selectPatient;
	p.updatePatientID = HS_Test_UI_Component_patientSelect_updatePatientID;
}
/* EOF */