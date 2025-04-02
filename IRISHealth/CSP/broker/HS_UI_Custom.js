/*** Zen Module: HS_UI_Custom ***/

self._zenClassIdx['http://www.intersystems.com/zen/hs/listBox'] = 'HS_UI_Custom_listBox';
self.HS_UI_Custom_listBox = function(index,id) {
	if (index>=0) {HS_UI_Custom_listBox__init(this,index,id);}
}

self.HS_UI_Custom_listBox__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_listBox__init) ?zenMaster._ZEN_Component_listBox__init(o,index,id):_ZEN_Component_listBox__init(o,index,id);
	o.vtScroll = true;
	o.onCreate();
}
function HS_UI_Custom_listBox_serialize(set,s)
{
	var o = this;s[0]='4225392456';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.clientType;s[9]=o.containerStyle;s[10]=o.controlClass;s[11]=o.controlStyle;s[12]=o.dataBinding;s[13]=(o.disabled?1:0);s[14]=(o.dragEnabled?1:0);s[15]=(o.dropEnabled?1:0);s[16]=(o.dynamic?1:0);s[17]=o.enclosingClass;s[18]=o.enclosingStyle;s[19]=o.error;s[20]=o.height;s[21]=(o.hidden?1:0);s[22]=o.hint;s[23]=o.hintClass;s[24]=o.hintStyle;s[25]=(o.hzScroll?1:0);s[26]=(o.invalid?1:0);s[27]=o.invalidMessage;s[28]=o.label;s[29]=o.labelClass;s[30]=o.labelDisabledClass;s[31]=o.labelStyle;s[32]=o.listHeight;s[33]=o.listWidth;s[34]=o.onafterdrag;s[35]=o.onbeforedrag;s[36]=o.onblur;s[37]=o.onchange;s[38]=o.onclick;s[39]=o.ondblclick;s[40]=o.ondrag;s[41]=o.ondrop;s[42]=o.onfocus;s[43]=o.onhide;s[44]=o.onkeydown;s[45]=o.onkeypress;s[46]=o.onkeyup;s[47]=o.onmousedown;s[48]=o.onmouseout;s[49]=o.onmouseover;s[50]=o.onmouseup;s[51]=o.onrefresh;s[52]=o.onshow;s[53]=o.onsubmit;s[54]=o.ontouchend;s[55]=o.ontouchmove;s[56]=o.ontouchstart;s[57]=o.onupdate;s[58]=o.onvalidate;s[59]=set.serializeList(o,o.options,true,'options');s[60]=o.originalValue;s[61]=o.overlayMode;s[62]=(o.readOnly?1:0);s[63]=o.renderFlag;s[64]=(o.required?1:0);s[65]=o.requiredMessage;s[66]=o.selectedIndex;s[67]=(o.showLabel?1:0);s[68]=o.slice;s[69]=o.tabIndex;s[70]=o.text;s[71]=o.title;s[72]=o.tuple;s[73]=o.valign;s[74]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[75]=(o.visible?1:0);s[76]=(o.vtScroll?1:0);s[77]=o.width;
}
function HS_UI_Custom_listBox_getSettings(s)
{
	s['name'] = 'string';
	s['vtScroll'] = 'boolean';
	this.invokeSuper('getSettings',arguments);
}

self.HS_UI_Custom_listBox_clickItem = function(idx) {
if ((this.disabled)||(this.readOnly)) return;
var args = new Array();
args[0] = idx;
this.invokeSuper('clickItem', args);
if (this.onclick != '') {
zenInvokeCallbackMethod(this.onclick,this,'onclick');
}
}

self.HS_UI_Custom_listBox_lbKeyBlur = function() {
var args = new Array();
this.invokeSuper('lbKeyBlur', args);
if (this.onblur != '') {
zenInvokeCallbackMethod(this.onblur,this,'onblur');
}
}

self.HS_UI_Custom_listBox_lbKeyDownHandler = function(evt) {
if ((this.disabled)||(this.readOnly)) return false;
var args = new Array();
args[0] = evt;
this.invokeSuper('lbKeyDownHandler', args);
var ret=true;
if (this.onkeydown != '') {
evt = evt ? evt : window.event;
ret = zenInvokeCallbackMethod(this.onkeydown,this,'onkeydown','evt',evt);
}
return ret
}

self.HS_UI_Custom_listBox_lbKeyFocus = function() {
var args = new Array();
this.invokeSuper('lbKeyFocus', args);
if (this.onfocus != '') {
zenInvokeCallbackMethod(this.onfocus,this,'onfocus');
}
}

self.HS_UI_Custom_listBox_lbKeyPressHandler = function(evt) {
if ((this.disabled)||(this.readOnly)) return false;
var args = new Array();
args[0] = evt;
this.invokeSuper('lbKeyPressHandler', args);
var ret=true;
if (this.onkeypress != '') {
evt = evt ? evt : window.event;
ret = zenInvokeCallbackMethod(this.onkeypress,this,'onkeypress','evt',evt);
}
return ret
}

self.HS_UI_Custom_listBox_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self.HS_UI_Custom_listBox__Loader = function() {
	zenLoadClass('_ZEN_Component_listBox');
	HS_UI_Custom_listBox.prototype = zenCreate('_ZEN_Component_listBox',-1);
	var p = HS_UI_Custom_listBox.prototype;
	if (null==p) {return;}
	p.constructor = HS_UI_Custom_listBox;
	p.superClass = ('undefined' == typeof _ZEN_Component_listBox) ? zenMaster._ZEN_Component_listBox.prototype:_ZEN_Component_listBox.prototype;
	p.__ZENcomponent = true;
	p._serverClass = 'HS.UI.Custom.listBox';
	p._type = 'listBox';
	p.serialize = HS_UI_Custom_listBox_serialize;
	p.getSettings = HS_UI_Custom_listBox_getSettings;
	p.ReallyRefreshContents = HS_UI_Custom_listBox_ReallyRefreshContents;
	p.clickItem = HS_UI_Custom_listBox_clickItem;
	p.lbKeyBlur = HS_UI_Custom_listBox_lbKeyBlur;
	p.lbKeyDownHandler = HS_UI_Custom_listBox_lbKeyDownHandler;
	p.lbKeyFocus = HS_UI_Custom_listBox_lbKeyFocus;
	p.lbKeyPressHandler = HS_UI_Custom_listBox_lbKeyPressHandler;
}

self._zenClassIdx['http://www.intersystems.com/zen/hs/textList'] = 'HS_UI_Custom_textList';
self.HS_UI_Custom_textList = function(index,id) {
	if (index>=0) {HS_UI_Custom_textList__init(this,index,id);}
}

self.HS_UI_Custom_textList__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_composite__init) ?zenMaster._ZEN_Component_composite__init(o,index,id):_ZEN_Component_composite__init(o,index,id);
	o.allowMultiple = false;
	o.display = new Array();
	o.endString = '';
	o.entity = 'entry';
	o.inListBox = false;
	o.listHeight = '400';
	o.listWidth = '310';
	o.msgInvalidEntry = 'is invalid.  Please delete and re-select.';
	o.msgMultipleNotAllowed = 'Multiple entries are not allowed here.';
	o.onSelect = '';
	o.queryClass = '';
	o.queryName = '';
	o.sql = ''; // encrypted
	o.value = new Array();
	o.vtScroll = false;
}
function HS_UI_Custom_textList_serialize(set,s)
{
	var o = this;s[0]='1191410357';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=(o.allowMultiple?1:0);s[8]=o.aux;s[9]=o.cellAlign;s[10]=o.cellSize;s[11]=o.cellStyle;s[12]=o.cellVAlign;s[13]=set.serializeList(o,o.children,true,'children');s[14]=(o.childrenCreated?1:0);s[15]=o.containerStyle;s[16]=(o.disabled?1:0);s[17]=zenArrayToList(o.display,'\x05');s[18]=(o.dragEnabled?1:0);s[19]=(o.dropEnabled?1:0);s[20]=(o.dynamic?1:0);s[21]=o.enclosingClass;s[22]=o.enclosingStyle;s[23]=o.endString;s[24]=o.entity;s[25]=o.error;s[26]=o.groupClass;s[27]=o.groupStyle;s[28]=o.height;s[29]=(o.hidden?1:0);s[30]=o.hint;s[31]=o.hintClass;s[32]=o.hintStyle;s[33]=(o.inListBox?1:0);s[34]=o.label;s[35]=o.labelClass;s[36]=o.labelDisabledClass;s[37]=o.labelPosition;s[38]=o.labelStyle;s[39]=o.layout;s[40]=o.listHeight;s[41]=o.listWidth;s[42]=o.msgInvalidEntry;s[43]=o.msgMultipleNotAllowed;s[44]=o.onSelect;s[45]=o.onafterdrag;s[46]=o.onbeforedrag;s[47]=o.onclick;s[48]=o.ondrag;s[49]=o.ondrop;s[50]=o.onhide;s[51]=o.onrefresh;s[52]=o.onshow;s[53]=o.onupdate;s[54]=o.overlayMode;s[55]=o.queryClass;s[56]=o.queryName;s[57]=o.renderFlag;s[58]=(o.showLabel?1:0);s[59]=o.slice;s[60]=o.sql;s[61]=o.title;s[62]=o.tuple;s[63]=o.valign;s[64]=zenArrayToList(o.value,'\x05');s[65]=(o.visible?1:0);s[66]=(o.vtScroll?1:0);s[67]=o.width;
}
function HS_UI_Custom_textList_getSettings(s)
{
	s['name'] = 'string';
	s['allowMultiple'] = 'boolean';
	s['display'] = 'list';
	s['endString'] = 'string';
	s['entity'] = 'caption';
	s['inListBox'] = 'boolean';
	s['listHeight'] = 'integer';
	s['listWidth'] = 'integer';
	s['msgInvalidEntry'] = 'caption';
	s['msgMultipleNotAllowed'] = 'caption';
	s['onSelect'] = 'eventHandler';
	s['queryClass'] = 'className';
	s['queryName'] = 'classMember:QUERY';
	s['sql'] = 'sql';
	s['value'] = 'list';
	s['vtScroll'] = 'boolean';
	this.invokeSuper('getSettings',arguments);
}

self.HS_UI_Custom_textList_addValue = function(logical,display,delay) {
var txtCtrl=this.getChildById("txt");
var textArr=txtCtrl.getValue().split(";");
var last=textArr.length-1;
var space=last>0?' ':'';
var text=txtCtrl.getValue();
var lastChar=text.lastIndexOf(";")+1;
txtCtrl.setValue(text.substring(0,lastChar)+space);
this.display[last]='';
if (this.allowMultiple) {
var oldDisp=txtCtrl.getValue();
var displayText=oldDisp+display+"; ";
var last=this.value.length;
if ((last > 0)&&(this.display[last-1] == '')) last=last-1;
} else {
var displayText=display;
var last=0;
}
this.value[last]=logical;
this.display[last]=zenPage.getComponentById(this.getProperty("id")).format(display);
if (delay == undefined) {
zenPage.getComponentById(this.getProperty("id")).displayText(displayText);
} else {
setTimeout("zenPage.getComponentById('"+this.getProperty("id")+"').displayText('"+displayText+"')",delay);
}
}

self.HS_UI_Custom_textList_displayText = function(display) {
var txtCtrl=this.getChildById('txt');
txtCtrl.focus();
txtCtrl.setValue(display);
}

self.HS_UI_Custom_textList_focus = function() {
this.getChildById('txt').focus();
}

self.HS_UI_Custom_textList_focusList = function() {
var lst=this.getChildById('lst');
if (!lst.getHidden()) {
zenThis.composite.setInListBox(true);
lst.focus();
}
}

self.HS_UI_Custom_textList_format = function(text) {
return zenPage.getComponentById(this.getProperty("id")).trim(text).toUpperCase();
}

self.HS_UI_Custom_textList_getDisplayValue = function(value) {
var lstAll=this.getChildById('lstAll');
var optionCount=lstAll.getOptionCount();
for (i=0; i<optionCount; i++) {
if (value == lstAll.getOptionValue(i)) {
return lstAll.getOptionText(i);
}
}
return ''
}

self.HS_UI_Custom_textList_getInListBox = function(flag) {
return this.inListBox;
}

self.HS_UI_Custom_textList_getValue = function() {
return this.value;
}

self.HS_UI_Custom_textList_hideList = function(defer) {
if (defer) {
setTimeout("zenPage.getComponentById('"+this.getProperty("id")+"').hideList(0)",200);
} else if (this.getInListBox()) {
zenThis.composite.setInListBox(false);
} else {
this.getChildById('lst').setHidden(1);
}
}

self.HS_UI_Custom_textList_listGotFocus = function() {
if (!this.getInListBox()) {
zenThis.composite.select();
}
}

self.HS_UI_Custom_textList_listKeyHandler = function(evt) {
if (evt.keyCode == zenESC) {
this.getChildById('lst').setHidden(1);
}
if ((evt.keyCode == zenENTER)||(evt.keyCode == zenTAB)) {
zenThis.composite.select();
}
}

self.HS_UI_Custom_textList_match = function(text,prior,show) {
var lst=this.getChildById("lst");
lst.resetOptions();
if (text == "") {
if (show) lst.setHidden(1);
} else if (text != prior||show) {
var lstAll=this.getChildById("lstAll");
var optionCount=lstAll.getOptionCount();
for (i=0; i<optionCount; i++) {
var optionText=lstAll.getOptionText(i);
if (text == optionText.substring(0,text.length).toUpperCase()) {
lst.appendOption(lstAll.getOptionValue(i),optionText);
}
}
var lstCnt=lst.getOptionCount()
if ( lstCnt > 0) {
var height=lst.getOptionCount()*16+2;
if (height > this.listHeight) height=this.listHeight;
lst.setProperty('listHeight', height);
lst.selectItem(0);
}
if (show) { lst.setHidden(lstCnt==0); }
}
}

self.HS_UI_Custom_textList_refreshList = function(sync) {
this.getChildById('lstAll').refreshContents(sync);
}

self.HS_UI_Custom_textList_refreshSelection = function() {
var textCtrl=this.getChildById("txt");
var textArr=textCtrl.getValue().split(";");
var textCount=textArr.length;
var priorCount=this.value.length;
var newValue = new Array();
var newDisplay = new Array();
var k=-1; var next=0;
for (idx=0; idx<textCount; idx++) {
var text=zenThis.composite.format(textArr[idx])
var valFound=""
var dispFound=""
for (j=next; j<priorCount; j++) {
var display=this.display[j]
if ((text==display)&&(text != '')) {
valFound=this.value[j];
dispFound=text;
next=j+1;
break;
}
}
if (valFound == '') {
zenThis.composite.match(text,'',0);
var lst=this.getChildById("lst");
if (lst.getOptionCount() == 1) {
var optionText=zenThis.composite.format(lst.getOptionText(0));
if (optionText == text) {
valFound=lst.getOptionValue(0);
dispFound=text;
}
}
}
newValue[++k]=valFound;
newDisplay[k]=dispFound;
if ((this.value.length > 0)||(valFound != '')) {
if (valFound != this.value[k]) {
zenThis.composite.tlSelect(k+1, valFound);
}
}
}
this.value=newValue;
this.display=newDisplay;
}

self.HS_UI_Custom_textList_select = function() {
var lst=this.getChildById("lst");
var idx=lst.selectedIndex;
if (idx > -1) {
zenThis.composite.addValue(lst.getOptionValue(idx),zenThis.composite.truncate(lst.getOptionText(idx)),0);
lst.setHidden(1);
lst.selectedIndex=-1
zenThis.composite.tlSelect(this.value.length,this.value[this.value.length-1]);
}
}

self.HS_UI_Custom_textList_setInListBox = function(flag) {
this.inListBox=flag;
}

self.HS_UI_Custom_textList_textKeyHandler = function(textCtrl) {
var BACKSP=8;
if ((zenEvent.keyCode >= 16)&&(zenEvent.keyCode <= 20)) return;
switch (zenEvent.keyCode) {
case zenENTER: zenThis.composite.select();return;
case zenDOWN: zenThis.composite.focusList();return;
case zenESC: this.getChildById('lst').setHidden(1);return;
case zenLEFT: return;
case zenRIGHT: return;
case zenUP: return;
}
var textCtrl=this.getChildById("txt");
var textArr=textCtrl.getValue().split(";")
var last=textArr.length-1;
var text=zenThis.composite.format(textArr[last]);
if ((last>0)&&(!this.allowMultiple)) {
alert(this.msgMultipleNotAllowed);
textCtrl.setValue(textArr[last-1]);
this.display[last]='';
return;
}
zenThis.composite.refreshSelection();
var prior=text.length==1?"":this.display[last]
this.display[last]=text;
var charCode = zenEvent.charCode ? zenEvent.charCode : zenEvent.keyCode;
if ((charCode > 32)||(zenEvent.keyCode==zenDELETE)||(zenEvent.keyCode==BACKSP)) {
zenThis.composite.match(text,prior,1);
}
}

self.HS_UI_Custom_textList_tlSelect = function(current,value) {
if (this.onSelect != '') {
zenInvokeCallbackMethod(zenThis.composite.onSelect,zenThis.composite,'onSelect','current',current,'value',value);
}
}

self.HS_UI_Custom_textList_trim = function(text) {
var len=text.length;
while (text.substring(0,1) == ' ') { text = text.substring(1, len) };
while (text.substring(len-1,len) == ' ') { text = text.substring(0, len-1) };
return text
}

self.HS_UI_Custom_textList_truncate = function(text) {
var display=text;
if (this.endString != '') {
var end=text.indexOf(this.endString);
if (end > 0) {
display=text.substring(0,end)
}
}
return display;
}

self.HS_UI_Custom_textList_validate = function() {
var textArr=this.getChildById("txt").getValue().split(";")
var selectCount=this.value.length;
var msg='';
for (i=0; i<selectCount; i++) {
if (this.value[i] == '') {
var display=zenPage.getComponentById(this.getProperty("id")).format(textArr[i]);
if (display != '') {
msg=msg+this.entity+' '+zenPage.getComponentById(this.getProperty("id")).trim(textArr[i])+' '+this.msgInvalidEntry+"\n";
}
}
}
return msg
}

self.HS_UI_Custom_textList_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self.HS_UI_Custom_textList__Loader = function() {
	zenLoadClass('_ZEN_Component_composite');
	HS_UI_Custom_textList.prototype = zenCreate('_ZEN_Component_composite',-1);
	var p = HS_UI_Custom_textList.prototype;
	if (null==p) {return;}
	p.constructor = HS_UI_Custom_textList;
	p.superClass = ('undefined' == typeof _ZEN_Component_composite) ? zenMaster._ZEN_Component_composite.prototype:_ZEN_Component_composite.prototype;
	p.__ZENcomponent = true;
	p._serverClass = 'HS.UI.Custom.textList';
	p._type = 'textList';
	p.serialize = HS_UI_Custom_textList_serialize;
	p.getSettings = HS_UI_Custom_textList_getSettings;
	p.ReallyRefreshContents = HS_UI_Custom_textList_ReallyRefreshContents;
	p.addValue = HS_UI_Custom_textList_addValue;
	p.displayText = HS_UI_Custom_textList_displayText;
	p.focus = HS_UI_Custom_textList_focus;
	p.focusList = HS_UI_Custom_textList_focusList;
	p.format = HS_UI_Custom_textList_format;
	p.getDisplayValue = HS_UI_Custom_textList_getDisplayValue;
	p.getInListBox = HS_UI_Custom_textList_getInListBox;
	p.getValue = HS_UI_Custom_textList_getValue;
	p.hideList = HS_UI_Custom_textList_hideList;
	p.listGotFocus = HS_UI_Custom_textList_listGotFocus;
	p.listKeyHandler = HS_UI_Custom_textList_listKeyHandler;
	p.match = HS_UI_Custom_textList_match;
	p.refreshList = HS_UI_Custom_textList_refreshList;
	p.refreshSelection = HS_UI_Custom_textList_refreshSelection;
	p.select = HS_UI_Custom_textList_select;
	p.setInListBox = HS_UI_Custom_textList_setInListBox;
	p.textKeyHandler = HS_UI_Custom_textList_textKeyHandler;
	p.tlSelect = HS_UI_Custom_textList_tlSelect;
	p.trim = HS_UI_Custom_textList_trim;
	p.truncate = HS_UI_Custom_textList_truncate;
	p.validate = HS_UI_Custom_textList_validate;
}
/* EOF */