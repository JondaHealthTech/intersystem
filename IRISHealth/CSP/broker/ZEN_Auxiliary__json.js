/*** Zen Module: ZEN_Auxiliary__json ***/

self._zenClassIdx['altJSONProvider'] = '_ZEN_Auxiliary_altJSONProvider';
self._ZEN_Auxiliary_altJSONProvider = function(index,id) {
	if (index>=0) {_ZEN_Auxiliary_altJSONProvider__init(this,index,id);}
}

self._ZEN_Auxiliary_altJSONProvider__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Auxiliary_abstractController__init) ?zenMaster._ZEN_Auxiliary_abstractController__init(o,index,id):_ZEN_Auxiliary_abstractController__init(o,index,id);
	o.OnGetArray = ''; // encrypted
	o.OnGetTargetObject = ''; // encrypted
	o.OnRenderJSON = ''; // encrypted
	o.OnSubmitContent = ''; // encrypted
	o.content = '';
	o.contentType = '';
	o.documentId = '';
	o.error = '';
	o.parameters = new Object();
	o.propertyList = '';
	o.seriesNameProperty = 'caption';
	o.targetClass = '';
}
function _ZEN_Auxiliary_altJSONProvider_serialize(set,s)
{
	var o = this;s[0]='2092629197';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.OnGetArray;s[7]=o.OnGetTargetObject;s[8]=o.OnRenderJSON;s[9]=o.OnSubmitContent;s[10]=(o.alertOnError?1:0);s[11]=o.align;s[12]=o.autoRefresh;s[13]=o.aux;s[14]=o.containerStyle;s[15]=o.content;s[16]=o.contentType;s[17]=set.addObject(o.criteria,'criteria');s[18]=set.addObject(o.dataBag,'dataBag');s[19]=(o.dataLoaded?1:0);s[20]=(o.dataReadOnly?1:0);s[21]=o.defaultSeries;s[22]=o.documentId;s[23]=(o.dragEnabled?1:0);s[24]=(o.dropEnabled?1:0);s[25]=(o.dynamic?1:0);s[26]=o.enclosingClass;s[27]=o.enclosingStyle;s[28]=o.error;s[29]=o.height;s[30]=(o.hidden?1:0);s[31]=o.hint;s[32]=o.hintClass;s[33]=o.hintStyle;s[34]=o.label;s[35]=o.labelClass;s[36]=o.labelDisabledClass;s[37]=o.labelStyle;s[38]=(o.modelChanged?1:0);s[39]=o.modelError;s[40]=o.modelId;s[41]=o.onafterdrag;s[42]=o.onbeforedrag;s[43]=o.oncreate;s[44]=o.ondelete;s[45]=o.ondrag;s[46]=o.ondrop;s[47]=o.onerror;s[48]=o.onhide;s[49]=o.onnotifyController;s[50]=o.onrefresh;s[51]=o.onsave;s[52]=o.onshow;s[53]=o.onupdate;s[54]=o.overlayMode;s[55]=set.serializeArray(o,o.parameters,true,'parameters');s[56]=o.propertyList;s[57]=(o.readOnly?1:0);s[58]=o.renderFlag;s[59]=o.seriesNameProperty;s[60]=(o.showLabel?1:0);s[61]=o.slice;s[62]=o.targetClass;s[63]=o.timerid;s[64]=o.title;s[65]=o.tuple;s[66]=o.valign;s[67]=(o.visible?1:0);s[68]=o.width;
}
function _ZEN_Auxiliary_altJSONProvider_getSettings(s)
{
	s['name'] = 'string';
	s['contentType'] = 'string';
	s['documentId'] = 'string';
	s['parameters'] = 'string';
	s['propertyList'] = 'csv';
	s['seriesNameProperty'] = 'string';
	s['targetClass'] = 'className';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Auxiliary_altJSONProvider_findMetaData = function() {
if ((this._metaData) && (this._metaData.length > 0)) {
return this._metaData;
}
this._metaData = [];
var props = {};
var propertyList = zenGet(this.propertyList);
if (propertyList!='') {
var t = propertyList.toString().split(',');
for (var n = 0; n < t.length; n++) {
if (t[n] && t[n]!=='') {
this._metaData[this._metaData.length] = t[n];
props[t[n]] = true;
}
}
}
var data = this.getContentObject();
if (data) {
if (this.getContentType()=='array') {
var array = this.getContentArray();
var record = array ? array[0] : null;
if (record) {
for (var p in record) {
if (p != this.seriesNameProperty && !props[p]) {
if ('object' != typeof data[p]) {
if (p.toString().charAt(0)!='_') {
this._metaData[this._metaData.length] = p;
}
}
}
}
}
}
else {
this.getObjectMetaData(data,this._metaData,props,'');
}
}
return this._metaData;
}

self._ZEN_Auxiliary_altJSONProvider_findObjectValue = function(data,prop) {
if (!data || !prop) {
return '';
}
if (prop.toString().indexOf('.')>=0) {
var t = prop.toString().split('.');
var p1 = t[0];
t.splice(0,1);
return this.findObjectValue(data[p1],t.join('.'));
}
return data[prop];
}

self._ZEN_Auxiliary_altJSONProvider_getContentArray = function() {
var data = this.getContentObject();
return data && data.children ? data.children : null;
}

self._ZEN_Auxiliary_altJSONProvider_getContentObject = function() {
return ''==this.content ? null : this.content;
}

self._ZEN_Auxiliary_altJSONProvider_getContentType = function() {
return this.contentType;
}

self._ZEN_Auxiliary_altJSONProvider_getData = function(d1,d2,d3) {
var value = '';
var data = this.getContentObject();
if (!data) {
return '';
}
var meta = this.findMetaData();
var contentType = this.getContentType();
var row = d1;
var col = (null===d2) ? 0 : d2;
if (contentType == 'array') {
var array = this.getContentArray();
if (array && array[row]) {
var record = array[row];
if (record && meta && meta[col]) {
value = record[meta[col]];
}
}
}
else {
value = this.findObjectValue(data,meta[col]);
}
if (typeof value == 'undefined') {
value = '';
}
return value;
}

self._ZEN_Auxiliary_altJSONProvider_getDataAsArrays = function() {
var arrayData = null;
var data = this.getContentObject();
var array = this.getContentArray();
if (array) {
var meta = this.findMetaData();
var items = array.length;
var series = meta ? meta.length : 0;
arrayData = new Array(series);
for (var s = 0; s < series; s++) {
arrayData[s] = new Array(items);
for (var i = 0; i < items; i++) {
arrayData[s][i] = array[i][meta[s]];
if (arrayData[s][i]==null) {
arrayData[s][i] = '';
}
}
}
}
return arrayData;
}

self._ZEN_Auxiliary_altJSONProvider_getDataByName = function(property,series) {
var value = '';
var data = this.getContentObject();
if (!data) {
return '';
}
var meta = this.findMetaData();
if (!meta) {
return '';
}
var contentType = this.getContentType();
series = ('undefined'==typeof series) ? (parseInt(this.defaultSeries,10)-1) : parseInt(series,10);
for (var n = 0; n < meta.length; n++) {
if (meta[n] && property==meta[n]) {
if (contentType == 'array') {
var array = this.getContentArray();
if (array && array[series]) {
var record = array[series];
if (record) {
value = record[meta[n]];
}
}
}
else {
value = this.findObjectValue(data,[meta[n]]);
}
break;
}
}
if (typeof value == 'undefined') {
value = '';
}
return value;
}

self._ZEN_Auxiliary_altJSONProvider_getDataSourceCaption = function(which,text) {
return '';
}

self._ZEN_Auxiliary_altJSONProvider_getDimSize = function(dim) {
var size = 0;
var data = this.getContentObject();
var contentType = this.getContentType();
switch (dim) {
case 1:
if (contentType == 'array') {
var array = this.getContentArray();
size = array ? array.length : 0;
}
else {
size = data ? 1 : 0;
}
break;
case 2:
var meta = this.findMetaData();
size = meta ? meta.length : 0;
break;
}
return size;
}

self._ZEN_Auxiliary_altJSONProvider_getDimensions = function() {
return 2;
}

self._ZEN_Auxiliary_altJSONProvider_getError = function() {
return this.error;
}

self._ZEN_Auxiliary_altJSONProvider_getLabel = function(n,dim) {
var label = '';
var data = this.getContentObject();
if (!data) {
return '';
}
var contentType = this.getContentType();
switch (dim) {
case 1:
if (contentType == 'array') {
var array = this.getContentArray();
if (array) {
var record = array[n];
if (record) {
label = (this.seriesNameProperty!='' && record[this.seriesNameProperty]) ? record[this.seriesNameProperty] : (n+1);
}
}
}
else {
label = (this.seriesNameProperty!='' && data[this.seriesNameProperty]) ? this.findObjectValue(data,this.seriesNameProperty) : 1;
}
break;
case 2:
var meta = this.findMetaData();
label = meta ? meta[n] : (n+1);
break;
}
return label;
}

self._ZEN_Auxiliary_altJSONProvider_getObjectMetaData = function(data,metaData,props,parent) {
for (var p in data) {
if (!props[p]) {
if ('object' == typeof data[p] && data[p]!=null) {
if (!this.isArray(data[p])) {
this.getObjectMetaData(data[p],metaData,props,p);
}
}
else {
metaData[metaData.length] = ((parent!='')? parent+'.' : '')  + p;
}
}
}
}

self._ZEN_Auxiliary_altJSONProvider_getPropertyName = function(n) {
var meta = this.findMetaData();
if (!meta) {
return '';
}
return meta[n];
}

self._ZEN_Auxiliary_altJSONProvider_hasData = function() {
var data = this.getContentObject();
return data ? true : false;
}

self._ZEN_Auxiliary_altJSONProvider_isArray = function(obj) {
if (obj.constructor.toString().indexOf("Array") == -1) {
return false;
}
return true;
}

self._ZEN_Auxiliary_altJSONProvider_onloadHandler = function() {
this.raiseDataChange();
this.invokeSuper('onloadHandler',arguments);
}

self._ZEN_Auxiliary_altJSONProvider_refreshContent = function() {
return this.reloadContents();
}

self._ZEN_Auxiliary_altJSONProvider_refreshHandler = function(final,notify) {
if (final) {
if (notify) {
if (this._notify && 'function' == typeof this._notify) {
this._notify(true);
this._notify = null;
}
}
else {
if (this._timerId) {
window.clearTimeout(this._timerId);
}
this._metaData = null;
this._timer = 0;
this._timerId = null;
this.raiseDataChange();
if (this._notify && 'function' == typeof this._notify) {
this._timerId = window.setTimeout('zenPage.getComponent('+this.index+').refreshHandler(true,true);',10);
}
}
}
else if (this._timer) {
if (this._notify && 'function' == typeof this._notify) {
this._notify(false);
}
this._timerId = window.setTimeout('zenPage.getComponent('+this.index+').refreshHandler(false);',this._timer);
}
}

self._ZEN_Auxiliary_altJSONProvider_reloadContents = function() {
try {
this.error = '';
var ok = this.RefreshFromServer();
this._metaData = null;
this.raiseDataChange();
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in reloadContents method for jsonProvider');
ok = false;
}
return ok;
}

self._ZEN_Auxiliary_altJSONProvider_reloadContentsAsynch = function(notify,time) {
if (!this._notify) {
this._notify = notify;
this._timer = 0;
this._timerId = null;
this.error = '';
this.RefreshFromServerAsynch();
if (zenGet(time,0)>0) {
this._timer = time;
this._timerId = window.setTimeout('zenPage.getComponent('+this.index+').refreshHandler(false,true);',this._timer);
}
}
}

self._ZEN_Auxiliary_altJSONProvider_resetMetaData = function() {
this._metaData = null;
}

self._ZEN_Auxiliary_altJSONProvider_save = function() {
this.submitContent('save');
return '';
}

self._ZEN_Auxiliary_altJSONProvider_setContentObject = function(obj) {
this.content = obj;
this._metaData = null;
this.raiseDataChange();
}

self._ZEN_Auxiliary_altJSONProvider_setContentText = function(json) {
try {
eval('var newContent = ' + json);
this.content = newContent;
delete newContent;
this._metaData = null;
this.raiseDataChange();
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in setContentText method for jsonProvider');
}
}

self._ZEN_Auxiliary_altJSONProvider_setContentType = function(type) {
this.contentType = type;
}

self._ZEN_Auxiliary_altJSONProvider_setData = function(value,d1,d2,d3) {
var data = this.getContentObject();
if (!data) {
return;
}
var meta = this.findMetaData();
var contentType = this.getContentType();
var row = d1;
var col = (null===d2) ? 0 : d2;
if (contentType == 'array') {
var array = this.getContentArray();
if (array && array[row]) {
var record = array[row];
if (record && meta && meta[col]) {
if (record[meta[col]] !== value) {
record[meta[col]] = value;
this.raiseDataChange();
}
}
}
}
else {
if (this.findObjectValue(data,meta[col]) !== value) {
this.setObjectValue(data,meta[col],value);
this.raiseDataChange();
}
}
}

self._ZEN_Auxiliary_altJSONProvider_setDataByName = function(property,value,series) {
switch(property) {
case '':
break;
case '%id':
this.setModelId(value);
break;
case '%series':
this.setProperty('defaultSeries',value);
break;
default:
series = ('undefined'==typeof series) ? (parseInt(this.defaultSeries,10) - 1) : parseInt(series,10);
var data = this.getContentObject();
if (data) {
if (this.getContentType()=='array') {
var array = this.getContentArray();
if (array && array[series]) {
if (array[series][property] !== value) {
array[series][property] = value;
this.raiseDataChange();
}
}
else if (array && (series==0)) {
if (!array[0]) {
array[0] = {};
}
array[0][property] = value;
}
}
else {
if (this.findObjectValue(data,property) !== value) {
this.setObjectValue(data,property,value);
this.raiseDataChange();
}
}
}
break;
}
}

self._ZEN_Auxiliary_altJSONProvider_setObjectValue = function(data,prop,value) {
if (!data || !prop) {
return;
}
if (prop.toString().indexOf('.')>=0) {
var t = prop.toString().split('.');
var p1 = t[0];
t.splice(0,1);
this.setObjectValue(data[p1],t.join('.'),value);
}
else {
data[prop] = value;
}
}

self._ZEN_Auxiliary_altJSONProvider_setProperty = function(property,value,value2) {
switch(property) {
case 'content':
this.setContentText(value);
break;
case 'targetClass':
this.targetClass = value;
break;
case 'includeClassMarkup':
case 'includeWhitespace':
this[property] = !!value;
break;
default:
return this.invokeSuper('setProperty',arguments);
break;
}
return true;
}

self._ZEN_Auxiliary_altJSONProvider_submitContent = function(command,targetClass,notify,time) {
try {
var ok = true;
command = ('undefined' == typeof command) ? '' : command;
notify = ('undefined' == typeof notify) ? null : notify;
if ('undefined' != typeof targetClass && '' != targetClass) {
this.targetClass = targetClass;
}
if ('' == this.targetClass) {
alert('There is no targetClass for the jsonProvider (submitContent)');
return false;
}
var json = this.toJSON(this.content);
if (this.content && null == json) {
alert('Error creating JSON content in the jsonProvider (submitContent)');
return false;
}
json = json ? json : '';
if ('function' == typeof notify) {
if (!this._submitNotify) {
this._submitNotify = notify;
this._submitTimer = 0;
this._submitTimerId = null;
this.SubmitToServerAsync(command,json,this.targetClass);
if (zenGet(time,0)>0) {
this._submitTimer = time;
this._submitTimerId = window.setTimeout('zenPage.getComponent('+this.index+').submitHandler(false,true);',this._submitTimer);
}
}
else {
ok = false;
}
}
else {
ok = this.SubmitToServer(command,json,this.targetClass);
}
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in submitContent method for jsonProvider');
ok = false;
}
return ok;
}

self._ZEN_Auxiliary_altJSONProvider_submitHandler = function(final,notify) {
if (final) {
if (notify) {
if (this._submitNotify && 'function' == typeof this._submitNotify) {
this._submitNotify(true);
this._submitNotify = null;
}
}
else {
if (this._submitTimerId) {
window.clearTimeout(this._submitTimerId);
}
this._submitTimer = 0;
this._submitTimerId = null;
if (this._submitNotify && 'function' == typeof this._submitNotify) {
this._submitTimerId = window.setTimeout('zenPage.getComponent('+this.index+').submitHandler(true,true);',10);
}
}
}
else if (this._submitTimer) {
if (this._submitNotify && 'function' == typeof this._submitNotify) {
this._submitNotify(false);
}
this._submitTimerId = window.setTimeout('zenPage.getComponent('+this.index+').submitHandler(false);',this._submitTimer);
}
}

self._ZEN_Auxiliary_altJSONProvider_toJSON = function(obj,cycle,level) {
try {
cycle = ('undefined' == typeof cycle) ? Math.floor(Math.random()*1000000) : cycle;
level = ('undefined' == typeof level) ? 0 : level;
if (level > 100) {
alert('jsonProvider: too many levels in JSON object');
return null;
}
if ('object' == typeof obj && null != obj) {
if (null == obj.__cycle || cycle != obj.__cycle) {
obj.__cycle = cycle;
}
else if (cycle == obj.__cycle) {
return 'null';
}
}
var t = new Array();
switch (typeof obj) {
case 'boolean':
t.push(obj ? 'true' : 'false');
break;
case 'string':
var text = obj.toString();
text = text.replace(/\\/g,'\\\\'); // escape any backslash
text = text.replace(/\"/g,'\\\"'); // escape any double quotes
t.push('"' + text + '"');
break;
case 'number':
t.push(obj);
break;
case 'object':
if (null == obj) {
return 'null';
}
else if (obj.constructor == Function) {
return '';
}
else if (Object.prototype.toString.apply(obj) === '[object Array]') {
t.push('[');
for (var n = 0; n < obj.length; n++) {
var sub = this.toJSON(obj[n],cycle,level+1);
if (null == sub) return null;
t.push(((n>0)?',':'') + sub);
}
t.push(']');
}
else {
var pc = 0;
t.push('{\n');
for (var p in obj) {
if ('function' != typeof obj[p]) {
if ((p.indexOf('_')==-1)||(p=='_class')) {
var sub = this.toJSON(obj[p],cycle,level+1);
if (null == sub) return null;
t.push(((pc++>0)?',':'') + '"' + p + '":' + sub);
}
}
}
t.push('}\n');
}
break;
case 'function':
break;
case 'undefined':
t.push('null');
break
default:
break;
}
return t.join('');
}
catch(ex) {
}
return null;
}

self._ZEN_Auxiliary_altJSONProvider_DeleteFromServer = function(pID) {
	return zenInstanceMethod(this,'DeleteFromServer','L','BOOLEAN',arguments);
}

self._ZEN_Auxiliary_altJSONProvider_ExecuteAction = function(pAction,pData) {
	return zenInstanceMethod(this,'ExecuteAction','L,L','BOOLEAN',arguments);
}

self._ZEN_Auxiliary_altJSONProvider_LoadFromServer = function() {
	return zenInstanceMethod(this,'LoadFromServer','','VARCHAR',arguments);
}

self._ZEN_Auxiliary_altJSONProvider_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}

self._ZEN_Auxiliary_altJSONProvider_RefreshFromServer = function() {
	return zenInstanceMethod(this,'RefreshFromServer','','BOOLEAN',arguments);
}

self._ZEN_Auxiliary_altJSONProvider_RefreshFromServerAsynch = function() {
	zenInstanceMethod(this,'RefreshFromServerAsynch','','',arguments);
}

self._ZEN_Auxiliary_altJSONProvider_SaveToServer = function() {
	return zenInstanceMethod(this,'SaveToServer','','VARCHAR',arguments);
}

self._ZEN_Auxiliary_altJSONProvider_SubmitToServer = function(pCommand,pContent,pTargetClass) {
	return zenInstanceMethod(this,'SubmitToServer','L,L,L','BOOLEAN',arguments);
}

self._ZEN_Auxiliary_altJSONProvider_SubmitToServerAsync = function(pCommand,pContent,pTargetClass) {
	zenInstanceMethod(this,'SubmitToServerAsync','L,L,L','',arguments);
}
self._ZEN_Auxiliary_altJSONProvider__Loader = function() {
	zenLoadClass('_ZEN_Auxiliary_abstractController');
	_ZEN_Auxiliary_altJSONProvider.prototype = zenCreate('_ZEN_Auxiliary_abstractController',-1);
	var p = _ZEN_Auxiliary_altJSONProvider.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Auxiliary_altJSONProvider;
	p.superClass = ('undefined' == typeof _ZEN_Auxiliary_abstractController) ? zenMaster._ZEN_Auxiliary_abstractController.prototype:_ZEN_Auxiliary_abstractController.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Auxiliary.altJSONProvider';
	p._type = 'altJSONProvider';
	p.serialize = _ZEN_Auxiliary_altJSONProvider_serialize;
	p.getSettings = _ZEN_Auxiliary_altJSONProvider_getSettings;
	p.DeleteFromServer = _ZEN_Auxiliary_altJSONProvider_DeleteFromServer;
	p.ExecuteAction = _ZEN_Auxiliary_altJSONProvider_ExecuteAction;
	p.LoadFromServer = _ZEN_Auxiliary_altJSONProvider_LoadFromServer;
	p.ReallyRefreshContents = _ZEN_Auxiliary_altJSONProvider_ReallyRefreshContents;
	p.RefreshFromServer = _ZEN_Auxiliary_altJSONProvider_RefreshFromServer;
	p.RefreshFromServerAsynch = _ZEN_Auxiliary_altJSONProvider_RefreshFromServerAsynch;
	p.SaveToServer = _ZEN_Auxiliary_altJSONProvider_SaveToServer;
	p.SubmitToServer = _ZEN_Auxiliary_altJSONProvider_SubmitToServer;
	p.SubmitToServerAsync = _ZEN_Auxiliary_altJSONProvider_SubmitToServerAsync;
	p.findMetaData = _ZEN_Auxiliary_altJSONProvider_findMetaData;
	p.findObjectValue = _ZEN_Auxiliary_altJSONProvider_findObjectValue;
	p.getContentArray = _ZEN_Auxiliary_altJSONProvider_getContentArray;
	p.getContentObject = _ZEN_Auxiliary_altJSONProvider_getContentObject;
	p.getContentType = _ZEN_Auxiliary_altJSONProvider_getContentType;
	p.getData = _ZEN_Auxiliary_altJSONProvider_getData;
	p.getDataAsArrays = _ZEN_Auxiliary_altJSONProvider_getDataAsArrays;
	p.getDataByName = _ZEN_Auxiliary_altJSONProvider_getDataByName;
	p.getDataSourceCaption = _ZEN_Auxiliary_altJSONProvider_getDataSourceCaption;
	p.getDimSize = _ZEN_Auxiliary_altJSONProvider_getDimSize;
	p.getDimensions = _ZEN_Auxiliary_altJSONProvider_getDimensions;
	p.getError = _ZEN_Auxiliary_altJSONProvider_getError;
	p.getLabel = _ZEN_Auxiliary_altJSONProvider_getLabel;
	p.getObjectMetaData = _ZEN_Auxiliary_altJSONProvider_getObjectMetaData;
	p.getPropertyName = _ZEN_Auxiliary_altJSONProvider_getPropertyName;
	p.hasData = _ZEN_Auxiliary_altJSONProvider_hasData;
	p.isArray = _ZEN_Auxiliary_altJSONProvider_isArray;
	p.onloadHandler = _ZEN_Auxiliary_altJSONProvider_onloadHandler;
	p.refreshContent = _ZEN_Auxiliary_altJSONProvider_refreshContent;
	p.refreshHandler = _ZEN_Auxiliary_altJSONProvider_refreshHandler;
	p.reloadContents = _ZEN_Auxiliary_altJSONProvider_reloadContents;
	p.reloadContentsAsynch = _ZEN_Auxiliary_altJSONProvider_reloadContentsAsynch;
	p.resetMetaData = _ZEN_Auxiliary_altJSONProvider_resetMetaData;
	p.save = _ZEN_Auxiliary_altJSONProvider_save;
	p.setContentObject = _ZEN_Auxiliary_altJSONProvider_setContentObject;
	p.setContentText = _ZEN_Auxiliary_altJSONProvider_setContentText;
	p.setContentType = _ZEN_Auxiliary_altJSONProvider_setContentType;
	p.setData = _ZEN_Auxiliary_altJSONProvider_setData;
	p.setDataByName = _ZEN_Auxiliary_altJSONProvider_setDataByName;
	p.setObjectValue = _ZEN_Auxiliary_altJSONProvider_setObjectValue;
	p.setProperty = _ZEN_Auxiliary_altJSONProvider_setProperty;
	p.submitContent = _ZEN_Auxiliary_altJSONProvider_submitContent;
	p.submitHandler = _ZEN_Auxiliary_altJSONProvider_submitHandler;
	p.toJSON = _ZEN_Auxiliary_altJSONProvider_toJSON;
}

self._zenClassIdx['jsonProvider'] = '_ZEN_Auxiliary_jsonProvider';
self._ZEN_Auxiliary_jsonProvider = function(index,id) {
	if (index>=0) {_ZEN_Auxiliary_jsonProvider__init(this,index,id);}
}

self._ZEN_Auxiliary_jsonProvider__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Auxiliary_abstractController__init) ?zenMaster._ZEN_Auxiliary_abstractController__init(o,index,id):_ZEN_Auxiliary_abstractController__init(o,index,id);
	o.OnGetArray = ''; // encrypted
	o.OnGetTargetObject = ''; // encrypted
	o.OnRenderJSON = ''; // encrypted
	o.OnSubmitContent = ''; // encrypted
	o.content = '';
	o.contentType = '';
	o.documentId = '';
	o.error = '';
	o.parameters = new Object();
	o.propertyList = '';
	o.seriesNameProperty = 'caption';
	o.targetClass = '';
}
function _ZEN_Auxiliary_jsonProvider_serialize(set,s)
{
	var o = this;s[0]='2092629197';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.OnGetArray;s[7]=o.OnGetTargetObject;s[8]=o.OnRenderJSON;s[9]=o.OnSubmitContent;s[10]=(o.alertOnError?1:0);s[11]=o.align;s[12]=o.autoRefresh;s[13]=o.aux;s[14]=o.containerStyle;s[15]=o.content;s[16]=o.contentType;s[17]=set.addObject(o.criteria,'criteria');s[18]=set.addObject(o.dataBag,'dataBag');s[19]=(o.dataLoaded?1:0);s[20]=(o.dataReadOnly?1:0);s[21]=o.defaultSeries;s[22]=o.documentId;s[23]=(o.dragEnabled?1:0);s[24]=(o.dropEnabled?1:0);s[25]=(o.dynamic?1:0);s[26]=o.enclosingClass;s[27]=o.enclosingStyle;s[28]=o.error;s[29]=o.height;s[30]=(o.hidden?1:0);s[31]=o.hint;s[32]=o.hintClass;s[33]=o.hintStyle;s[34]=o.label;s[35]=o.labelClass;s[36]=o.labelDisabledClass;s[37]=o.labelStyle;s[38]=(o.modelChanged?1:0);s[39]=o.modelError;s[40]=o.modelId;s[41]=o.onafterdrag;s[42]=o.onbeforedrag;s[43]=o.oncreate;s[44]=o.ondelete;s[45]=o.ondrag;s[46]=o.ondrop;s[47]=o.onerror;s[48]=o.onhide;s[49]=o.onnotifyController;s[50]=o.onrefresh;s[51]=o.onsave;s[52]=o.onshow;s[53]=o.onupdate;s[54]=o.overlayMode;s[55]=set.serializeArray(o,o.parameters,true,'parameters');s[56]=o.propertyList;s[57]=(o.readOnly?1:0);s[58]=o.renderFlag;s[59]=o.seriesNameProperty;s[60]=(o.showLabel?1:0);s[61]=o.slice;s[62]=o.targetClass;s[63]=o.timerid;s[64]=o.title;s[65]=o.tuple;s[66]=o.valign;s[67]=(o.visible?1:0);s[68]=o.width;
}
function _ZEN_Auxiliary_jsonProvider_getSettings(s)
{
	s['name'] = 'string';
	s['contentType'] = 'string';
	s['documentId'] = 'string';
	s['parameters'] = 'string';
	s['propertyList'] = 'csv';
	s['seriesNameProperty'] = 'string';
	s['targetClass'] = 'className';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Auxiliary_jsonProvider_findMetaData = function() {
if ((this._metaData) && (this._metaData.length > 0)) {
return this._metaData;
}
this._metaData = [];
var props = {};
var propertyList = zenGet(this.propertyList);
if (propertyList!='') {
var t = propertyList.toString().split(',');
for (var n = 0; n < t.length; n++) {
if (t[n] && t[n]!=='') {
this._metaData[this._metaData.length] = t[n];
props[t[n]] = true;
}
}
}
var data = this.getContentObject();
if (data) {
if (this.getContentType()=='array') {
var array = this.getContentArray();
var record = array ? array[0] : null;
if (record) {
for (var p in record) {
if (p != this.seriesNameProperty && !props[p]) {
if ('object' != typeof data[p]) {
if (p.toString().charAt(0)!='_') {
this._metaData[this._metaData.length] = p;
}
}
}
}
}
}
else {
this.getObjectMetaData(data,this._metaData,props,'');
}
}
return this._metaData;
}

self._ZEN_Auxiliary_jsonProvider_findObjectValue = function(data,prop) {
if (!data || !prop) {
return '';
}
if (prop.toString().indexOf('.')>=0) {
var t = prop.toString().split('.');
var p1 = t[0];
t.splice(0,1);
return this.findObjectValue(data[p1],t.join('.'));
}
return data[prop];
}

self._ZEN_Auxiliary_jsonProvider_getContentArray = function() {
var data = this.getContentObject();
return data && data.children ? data.children : null;
}

self._ZEN_Auxiliary_jsonProvider_getContentObject = function() {
return ''==this.content ? null : this.content;
}

self._ZEN_Auxiliary_jsonProvider_getContentType = function() {
return this.contentType;
}

self._ZEN_Auxiliary_jsonProvider_getData = function(d1,d2,d3) {
var value = '';
var data = this.getContentObject();
if (!data) {
return '';
}
var meta = this.findMetaData();
var contentType = this.getContentType();
var row = d1;
var col = (null===d2) ? 0 : d2;
if (contentType == 'array') {
var array = this.getContentArray();
if (array && array[row]) {
var record = array[row];
if (record && meta && meta[col]) {
value = record[meta[col]];
}
}
}
else {
value = this.findObjectValue(data,meta[col]);
}
if (typeof value == 'undefined') {
value = '';
}
return value;
}

self._ZEN_Auxiliary_jsonProvider_getDataAsArrays = function() {
var arrayData = null;
var data = this.getContentObject();
var array = this.getContentArray();
if (array) {
var meta = this.findMetaData();
var items = array.length;
var series = meta ? meta.length : 0;
arrayData = new Array(series);
for (var s = 0; s < series; s++) {
arrayData[s] = new Array(items);
for (var i = 0; i < items; i++) {
arrayData[s][i] = array[i][meta[s]];
if (arrayData[s][i]==null) {
arrayData[s][i] = '';
}
}
}
}
return arrayData;
}

self._ZEN_Auxiliary_jsonProvider_getDataByName = function(property,series) {
var value = '';
var data = this.getContentObject();
if (!data) {
return '';
}
var meta = this.findMetaData();
if (!meta) {
return '';
}
var contentType = this.getContentType();
series = ('undefined'==typeof series) ? (parseInt(this.defaultSeries,10)-1) : parseInt(series,10);
for (var n = 0; n < meta.length; n++) {
if (meta[n] && property==meta[n]) {
if (contentType == 'array') {
var array = this.getContentArray();
if (array && array[series]) {
var record = array[series];
if (record) {
value = record[meta[n]];
}
}
}
else {
value = this.findObjectValue(data,[meta[n]]);
}
break;
}
}
if (typeof value == 'undefined') {
value = '';
}
return value;
}

self._ZEN_Auxiliary_jsonProvider_getDataSourceCaption = function(which,text) {
return '';
}

self._ZEN_Auxiliary_jsonProvider_getDimSize = function(dim) {
var size = 0;
var data = this.getContentObject();
var contentType = this.getContentType();
switch (dim) {
case 1:
if (contentType == 'array') {
var array = this.getContentArray();
size = array ? array.length : 0;
}
else {
size = data ? 1 : 0;
}
break;
case 2:
var meta = this.findMetaData();
size = meta ? meta.length : 0;
break;
}
return size;
}

self._ZEN_Auxiliary_jsonProvider_getDimensions = function() {
return 2;
}

self._ZEN_Auxiliary_jsonProvider_getError = function() {
return this.error;
}

self._ZEN_Auxiliary_jsonProvider_getLabel = function(n,dim) {
var label = '';
var data = this.getContentObject();
if (!data) {
return '';
}
var contentType = this.getContentType();
switch (dim) {
case 1:
if (contentType == 'array') {
var array = this.getContentArray();
if (array) {
var record = array[n];
if (record) {
label = (this.seriesNameProperty!='' && record[this.seriesNameProperty]) ? record[this.seriesNameProperty] : (n+1);
}
}
}
else {
label = (this.seriesNameProperty!='' && data[this.seriesNameProperty]) ? this.findObjectValue(data,this.seriesNameProperty) : 1;
}
break;
case 2:
var meta = this.findMetaData();
label = meta ? meta[n] : (n+1);
break;
}
return label;
}

self._ZEN_Auxiliary_jsonProvider_getObjectMetaData = function(data,metaData,props,parent) {
for (var p in data) {
if (!props[p]) {
if ('object' == typeof data[p] && data[p]!=null) {
if (!this.isArray(data[p])) {
this.getObjectMetaData(data[p],metaData,props,p);
}
}
else {
metaData[metaData.length] = ((parent!='')? parent+'.' : '')  + p;
}
}
}
}

self._ZEN_Auxiliary_jsonProvider_getPropertyName = function(n) {
var meta = this.findMetaData();
if (!meta) {
return '';
}
return meta[n];
}

self._ZEN_Auxiliary_jsonProvider_hasData = function() {
var data = this.getContentObject();
return data ? true : false;
}

self._ZEN_Auxiliary_jsonProvider_isArray = function(obj) {
if (obj.constructor.toString().indexOf("Array") == -1) {
return false;
}
return true;
}

self._ZEN_Auxiliary_jsonProvider_onloadHandler = function() {
this.raiseDataChange();
this.invokeSuper('onloadHandler',arguments);
}

self._ZEN_Auxiliary_jsonProvider_refreshContent = function() {
return this.reloadContents();
}

self._ZEN_Auxiliary_jsonProvider_refreshHandler = function(final,notify) {
if (final) {
if (notify) {
if (this._notify && 'function' == typeof this._notify) {
this._notify(true);
this._notify = null;
}
}
else {
if (this._timerId) {
window.clearTimeout(this._timerId);
}
this._metaData = null;
this._timer = 0;
this._timerId = null;
this.raiseDataChange();
if (this._notify && 'function' == typeof this._notify) {
this._timerId = window.setTimeout('zenPage.getComponent('+this.index+').refreshHandler(true,true);',10);
}
}
}
else if (this._timer) {
if (this._notify && 'function' == typeof this._notify) {
this._notify(false);
}
this._timerId = window.setTimeout('zenPage.getComponent('+this.index+').refreshHandler(false);',this._timer);
}
}

self._ZEN_Auxiliary_jsonProvider_reloadContents = function() {
try {
this.error = '';
var ok = this.RefreshFromServer();
this._metaData = null;
this.raiseDataChange();
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in reloadContents method for jsonProvider');
ok = false;
}
return ok;
}

self._ZEN_Auxiliary_jsonProvider_reloadContentsAsynch = function(notify,time) {
if (!this._notify) {
this._notify = notify;
this._timer = 0;
this._timerId = null;
this.error = '';
this.RefreshFromServerAsynch();
if (zenGet(time,0)>0) {
this._timer = time;
this._timerId = window.setTimeout('zenPage.getComponent('+this.index+').refreshHandler(false,true);',this._timer);
}
}
}

self._ZEN_Auxiliary_jsonProvider_resetMetaData = function() {
this._metaData = null;
}

self._ZEN_Auxiliary_jsonProvider_save = function() {
this.submitContent('save');
return '';
}

self._ZEN_Auxiliary_jsonProvider_setContentObject = function(obj) {
this.content = obj;
this._metaData = null;
this.raiseDataChange();
}

self._ZEN_Auxiliary_jsonProvider_setContentText = function(json) {
try {
eval('var newContent = ' + json);
this.content = newContent;
delete newContent;
this._metaData = null;
this.raiseDataChange();
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in setContentText method for jsonProvider');
}
}

self._ZEN_Auxiliary_jsonProvider_setContentType = function(type) {
this.contentType = type;
}

self._ZEN_Auxiliary_jsonProvider_setData = function(value,d1,d2,d3) {
var data = this.getContentObject();
if (!data) {
return;
}
var meta = this.findMetaData();
var contentType = this.getContentType();
var row = d1;
var col = (null===d2) ? 0 : d2;
if (contentType == 'array') {
var array = this.getContentArray();
if (array && array[row]) {
var record = array[row];
if (record && meta && meta[col]) {
if (record[meta[col]] !== value) {
record[meta[col]] = value;
this.raiseDataChange();
}
}
}
}
else {
if (this.findObjectValue(data,meta[col]) !== value) {
this.setObjectValue(data,meta[col],value);
this.raiseDataChange();
}
}
}

self._ZEN_Auxiliary_jsonProvider_setDataByName = function(property,value,series) {
switch(property) {
case '':
break;
case '%id':
this.setModelId(value);
break;
case '%series':
this.setProperty('defaultSeries',value);
break;
default:
series = ('undefined'==typeof series) ? (parseInt(this.defaultSeries,10) - 1) : parseInt(series,10);
var data = this.getContentObject();
if (data) {
if (this.getContentType()=='array') {
var array = this.getContentArray();
if (array && array[series]) {
if (array[series][property] !== value) {
array[series][property] = value;
this.raiseDataChange();
}
}
else if (array && (series==0)) {
if (!array[0]) {
array[0] = {};
}
array[0][property] = value;
}
}
else {
if (this.findObjectValue(data,property) !== value) {
this.setObjectValue(data,property,value);
this.raiseDataChange();
}
}
}
break;
}
}

self._ZEN_Auxiliary_jsonProvider_setObjectValue = function(data,prop,value) {
if (!data || !prop) {
return;
}
if (prop.toString().indexOf('.')>=0) {
var t = prop.toString().split('.');
var p1 = t[0];
t.splice(0,1);
this.setObjectValue(data[p1],t.join('.'),value);
}
else {
data[prop] = value;
}
}

self._ZEN_Auxiliary_jsonProvider_setProperty = function(property,value,value2) {
switch(property) {
case 'content':
this.setContentText(value);
break;
case 'targetClass':
this.targetClass = value;
break;
case 'includeClassMarkup':
case 'includeWhitespace':
this[property] = !!value;
break;
default:
return this.invokeSuper('setProperty',arguments);
break;
}
return true;
}

self._ZEN_Auxiliary_jsonProvider_submitContent = function(command,targetClass,notify,time) {
try {
var ok = true;
command = ('undefined' == typeof command) ? '' : command;
notify = ('undefined' == typeof notify) ? null : notify;
if ('undefined' != typeof targetClass && '' != targetClass) {
this.targetClass = targetClass;
}
if ('' == this.targetClass) {
alert('There is no targetClass for the jsonProvider (submitContent)');
return false;
}
var json = this.toJSON(this.content);
if (this.content && null == json) {
alert('Error creating JSON content in the jsonProvider (submitContent)');
return false;
}
json = json ? json : '';
if ('function' == typeof notify) {
if (!this._submitNotify) {
this._submitNotify = notify;
this._submitTimer = 0;
this._submitTimerId = null;
this.SubmitToServerAsync(command,json,this.targetClass);
if (zenGet(time,0)>0) {
this._submitTimer = time;
this._submitTimerId = window.setTimeout('zenPage.getComponent('+this.index+').submitHandler(false,true);',this._submitTimer);
}
}
else {
ok = false;
}
}
else {
ok = this.SubmitToServer(command,json,this.targetClass);
}
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in submitContent method for jsonProvider');
ok = false;
}
return ok;
}

self._ZEN_Auxiliary_jsonProvider_submitHandler = function(final,notify) {
if (final) {
if (notify) {
if (this._submitNotify && 'function' == typeof this._submitNotify) {
this._submitNotify(true);
this._submitNotify = null;
}
}
else {
if (this._submitTimerId) {
window.clearTimeout(this._submitTimerId);
}
this._submitTimer = 0;
this._submitTimerId = null;
if (this._submitNotify && 'function' == typeof this._submitNotify) {
this._submitTimerId = window.setTimeout('zenPage.getComponent('+this.index+').submitHandler(true,true);',10);
}
}
}
else if (this._submitTimer) {
if (this._submitNotify && 'function' == typeof this._submitNotify) {
this._submitNotify(false);
}
this._submitTimerId = window.setTimeout('zenPage.getComponent('+this.index+').submitHandler(false);',this._submitTimer);
}
}

self._ZEN_Auxiliary_jsonProvider_toJSON = function(obj,cycle,level) {
try {
cycle = ('undefined' == typeof cycle) ? Math.floor(Math.random()*1000000) : cycle;
level = ('undefined' == typeof level) ? 0 : level;
if (level > 100) {
alert('jsonProvider: too many levels in JSON object');
return null;
}
if ('object' == typeof obj && null != obj) {
if (null == obj.__cycle || cycle != obj.__cycle) {
obj.__cycle = cycle;
}
else if (cycle == obj.__cycle) {
return 'null';
}
}
var t = new Array();
switch (typeof obj) {
case 'boolean':
t.push(obj ? 'true' : 'false');
break;
case 'string':
var text = obj.toString();
text = text.replace(/\\/g,'\\\\'); // escape any backslash
text = text.replace(/\'/g,'\\\''); // escape any single quotes
t.push("'" + text + "'");
break;
case 'number':
t.push(obj);
break;
case 'object':
if (null == obj) {
return 'null';
}
else if (obj.constructor == Function) {
return '';
}
else if (Object.prototype.toString.apply(obj) === '[object Array]') {
t.push('[');
for (var n = 0; n < obj.length; n++) {
var sub = this.toJSON(obj[n],cycle,level+1);
if (null == sub) return null;
t.push(((n>0)?',':'') + sub);
}
t.push(']');
}
else {
var pc = 0;
t.push('{\n');
for (var p in obj) {
if ('function' != typeof obj[p]) {
if ((p.indexOf('_')==-1)||(p=='_class')) {
var sub = this.toJSON(obj[p],cycle,level+1);
if (null == sub) return null;
t.push(((pc++>0)?',':'') + '"' + p + '":' + sub);
}
}
}
t.push('}\n');
}
break;
case 'function':
break;
case 'undefined':
t.push('null');
break
default:
break;
}
return t.join('');
}
catch(ex) {
}
return null;
}

self._ZEN_Auxiliary_jsonProvider_DeleteFromServer = function(pID) {
	return zenInstanceMethod(this,'DeleteFromServer','L','BOOLEAN',arguments);
}

self._ZEN_Auxiliary_jsonProvider_ExecuteAction = function(pAction,pData) {
	return zenInstanceMethod(this,'ExecuteAction','L,L','BOOLEAN',arguments);
}

self._ZEN_Auxiliary_jsonProvider_LoadFromServer = function() {
	return zenInstanceMethod(this,'LoadFromServer','','VARCHAR',arguments);
}

self._ZEN_Auxiliary_jsonProvider_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}

self._ZEN_Auxiliary_jsonProvider_RefreshFromServer = function() {
	return zenInstanceMethod(this,'RefreshFromServer','','BOOLEAN',arguments);
}

self._ZEN_Auxiliary_jsonProvider_RefreshFromServerAsynch = function() {
	zenInstanceMethod(this,'RefreshFromServerAsynch','','',arguments);
}

self._ZEN_Auxiliary_jsonProvider_SaveToServer = function() {
	return zenInstanceMethod(this,'SaveToServer','','VARCHAR',arguments);
}

self._ZEN_Auxiliary_jsonProvider_SubmitToServer = function(pCommand,pContent,pTargetClass) {
	return zenInstanceMethod(this,'SubmitToServer','L,L,L','BOOLEAN',arguments);
}

self._ZEN_Auxiliary_jsonProvider_SubmitToServerAsync = function(pCommand,pContent,pTargetClass) {
	zenInstanceMethod(this,'SubmitToServerAsync','L,L,L','',arguments);
}
self._ZEN_Auxiliary_jsonProvider__Loader = function() {
	zenLoadClass('_ZEN_Auxiliary_abstractController');
	_ZEN_Auxiliary_jsonProvider.prototype = zenCreate('_ZEN_Auxiliary_abstractController',-1);
	var p = _ZEN_Auxiliary_jsonProvider.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Auxiliary_jsonProvider;
	p.superClass = ('undefined' == typeof _ZEN_Auxiliary_abstractController) ? zenMaster._ZEN_Auxiliary_abstractController.prototype:_ZEN_Auxiliary_abstractController.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Auxiliary.jsonProvider';
	p._type = 'jsonProvider';
	p.serialize = _ZEN_Auxiliary_jsonProvider_serialize;
	p.getSettings = _ZEN_Auxiliary_jsonProvider_getSettings;
	p.DeleteFromServer = _ZEN_Auxiliary_jsonProvider_DeleteFromServer;
	p.ExecuteAction = _ZEN_Auxiliary_jsonProvider_ExecuteAction;
	p.LoadFromServer = _ZEN_Auxiliary_jsonProvider_LoadFromServer;
	p.ReallyRefreshContents = _ZEN_Auxiliary_jsonProvider_ReallyRefreshContents;
	p.RefreshFromServer = _ZEN_Auxiliary_jsonProvider_RefreshFromServer;
	p.RefreshFromServerAsynch = _ZEN_Auxiliary_jsonProvider_RefreshFromServerAsynch;
	p.SaveToServer = _ZEN_Auxiliary_jsonProvider_SaveToServer;
	p.SubmitToServer = _ZEN_Auxiliary_jsonProvider_SubmitToServer;
	p.SubmitToServerAsync = _ZEN_Auxiliary_jsonProvider_SubmitToServerAsync;
	p.findMetaData = _ZEN_Auxiliary_jsonProvider_findMetaData;
	p.findObjectValue = _ZEN_Auxiliary_jsonProvider_findObjectValue;
	p.getContentArray = _ZEN_Auxiliary_jsonProvider_getContentArray;
	p.getContentObject = _ZEN_Auxiliary_jsonProvider_getContentObject;
	p.getContentType = _ZEN_Auxiliary_jsonProvider_getContentType;
	p.getData = _ZEN_Auxiliary_jsonProvider_getData;
	p.getDataAsArrays = _ZEN_Auxiliary_jsonProvider_getDataAsArrays;
	p.getDataByName = _ZEN_Auxiliary_jsonProvider_getDataByName;
	p.getDataSourceCaption = _ZEN_Auxiliary_jsonProvider_getDataSourceCaption;
	p.getDimSize = _ZEN_Auxiliary_jsonProvider_getDimSize;
	p.getDimensions = _ZEN_Auxiliary_jsonProvider_getDimensions;
	p.getError = _ZEN_Auxiliary_jsonProvider_getError;
	p.getLabel = _ZEN_Auxiliary_jsonProvider_getLabel;
	p.getObjectMetaData = _ZEN_Auxiliary_jsonProvider_getObjectMetaData;
	p.getPropertyName = _ZEN_Auxiliary_jsonProvider_getPropertyName;
	p.hasData = _ZEN_Auxiliary_jsonProvider_hasData;
	p.isArray = _ZEN_Auxiliary_jsonProvider_isArray;
	p.onloadHandler = _ZEN_Auxiliary_jsonProvider_onloadHandler;
	p.refreshContent = _ZEN_Auxiliary_jsonProvider_refreshContent;
	p.refreshHandler = _ZEN_Auxiliary_jsonProvider_refreshHandler;
	p.reloadContents = _ZEN_Auxiliary_jsonProvider_reloadContents;
	p.reloadContentsAsynch = _ZEN_Auxiliary_jsonProvider_reloadContentsAsynch;
	p.resetMetaData = _ZEN_Auxiliary_jsonProvider_resetMetaData;
	p.save = _ZEN_Auxiliary_jsonProvider_save;
	p.setContentObject = _ZEN_Auxiliary_jsonProvider_setContentObject;
	p.setContentText = _ZEN_Auxiliary_jsonProvider_setContentText;
	p.setContentType = _ZEN_Auxiliary_jsonProvider_setContentType;
	p.setData = _ZEN_Auxiliary_jsonProvider_setData;
	p.setDataByName = _ZEN_Auxiliary_jsonProvider_setDataByName;
	p.setObjectValue = _ZEN_Auxiliary_jsonProvider_setObjectValue;
	p.setProperty = _ZEN_Auxiliary_jsonProvider_setProperty;
	p.submitContent = _ZEN_Auxiliary_jsonProvider_submitContent;
	p.submitHandler = _ZEN_Auxiliary_jsonProvider_submitHandler;
	p.toJSON = _ZEN_Auxiliary_jsonProvider_toJSON;
}

self._zenClassIdx['altJSONSQLProvider'] = '_ZEN_Auxiliary_altJSONSQLProvider';
self._ZEN_Auxiliary_altJSONSQLProvider = function(index,id) {
	if (index>=0) {_ZEN_Auxiliary_altJSONSQLProvider__init(this,index,id);}
}

self._ZEN_Auxiliary_altJSONSQLProvider__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Auxiliary_jsonProvider__init) ?zenMaster._ZEN_Auxiliary_jsonProvider__init(o,index,id):_ZEN_Auxiliary_jsonProvider__init(o,index,id);
	o.OnCreateResultSet = ''; // encrypted
	o.OnExecuteResultSet = ''; // encrypted
	o.OnGetSQL = ''; // encrypted
	o.arrayName = 'children';
	o.columnName = '';
	o.countRows = '0';
	o.currPage = '1';
	o.groupByClause = '';
	o.maxRows = '100';
	o.orderByClause = '';
	o.pageSize = '25';
	o.queryClass = ''; // encrypted
	o.queryName = '';
	o.recordCount = '';
	o.sql = ''; // encrypted
	o.tableName = ''; // encrypted
	o.whereClause = '';
}
function _ZEN_Auxiliary_altJSONSQLProvider_serialize(set,s)
{
	var o = this;s[0]='320028001';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.OnCreateResultSet;s[7]=o.OnExecuteResultSet;s[8]=o.OnGetArray;s[9]=o.OnGetSQL;s[10]=o.OnGetTargetObject;s[11]=o.OnRenderJSON;s[12]=o.OnSubmitContent;s[13]=(o.alertOnError?1:0);s[14]=o.align;s[15]=o.arrayName;s[16]=o.autoRefresh;s[17]=o.aux;s[18]=o.columnName;s[19]=o.containerStyle;s[20]=o.content;s[21]=o.contentType;s[22]=o.countRows;s[23]=set.addObject(o.criteria,'criteria');s[24]=o.currPage;s[25]=set.addObject(o.dataBag,'dataBag');s[26]=(o.dataLoaded?1:0);s[27]=(o.dataReadOnly?1:0);s[28]=o.defaultSeries;s[29]=o.documentId;s[30]=(o.dragEnabled?1:0);s[31]=(o.dropEnabled?1:0);s[32]=(o.dynamic?1:0);s[33]=o.enclosingClass;s[34]=o.enclosingStyle;s[35]=o.error;s[36]=o.groupByClause;s[37]=o.height;s[38]=(o.hidden?1:0);s[39]=o.hint;s[40]=o.hintClass;s[41]=o.hintStyle;s[42]=o.label;s[43]=o.labelClass;s[44]=o.labelDisabledClass;s[45]=o.labelStyle;s[46]=o.maxRows;s[47]=(o.modelChanged?1:0);s[48]=o.modelError;s[49]=o.modelId;s[50]=o.onafterdrag;s[51]=o.onbeforedrag;s[52]=o.oncreate;s[53]=o.ondelete;s[54]=o.ondrag;s[55]=o.ondrop;s[56]=o.onerror;s[57]=o.onhide;s[58]=o.onnotifyController;s[59]=o.onrefresh;s[60]=o.onsave;s[61]=o.onshow;s[62]=o.onupdate;s[63]=o.orderByClause;s[64]=o.overlayMode;s[65]=o.pageSize;s[66]=set.serializeArray(o,o.parameters,true,'parameters');s[67]=o.propertyList;s[68]=o.queryClass;s[69]=o.queryName;s[70]=(o.readOnly?1:0);s[71]=o.recordCount;s[72]=o.renderFlag;s[73]=o.seriesNameProperty;s[74]=(o.showLabel?1:0);s[75]=o.slice;s[76]=o.sql;s[77]=o.tableName;s[78]=o.targetClass;s[79]=o.timerid;s[80]=o.title;s[81]=o.tuple;s[82]=o.valign;s[83]=(o.visible?1:0);s[84]=o.whereClause;s[85]=o.width;
}
function _ZEN_Auxiliary_altJSONSQLProvider_getSettings(s)
{
	s['name'] = 'string';
	s['arrayName'] = 'string';
	s['columnName'] = 'string';
	s['countRows'] = 'integer';
	s['currPage'] = 'integer';
	s['groupByClause'] = 'string';
	s['maxRows'] = 'integer';
	s['orderByClause'] = 'string';
	s['pageSize'] = 'integer';
	s['queryClass'] = 'className';
	s['queryName'] = 'classMember:QUERY';
	s['recordCount'] = 'integer';
	s['sql'] = 'sql';
	s['tableName'] = 'string';
	s['whereClause'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Auxiliary_altJSONSQLProvider_getCurrPage = function() {
return this.currPage!=='' ? parseInt(this.currPage) : '';
}

self._ZEN_Auxiliary_altJSONSQLProvider_getPageSize = function() {
return this.pageSize!=='' ? parseInt(this.pageSize) : '';
}

self._ZEN_Auxiliary_altJSONSQLProvider_getRecordCount = function() {
return this.recordCount!=='' ? parseInt(this.recordCount) : '';
}

self._ZEN_Auxiliary_altJSONSQLProvider_setCurrPage = function(page) {
this.currPage = parseInt(page);
}

self._ZEN_Auxiliary_altJSONSQLProvider_DeleteFromServer = function(pID) {
	return zenInstanceMethod(this,'DeleteFromServer','L','BOOLEAN',arguments);
}

self._ZEN_Auxiliary_altJSONSQLProvider_ExecuteAction = function(pAction,pData) {
	return zenInstanceMethod(this,'ExecuteAction','L,L','BOOLEAN',arguments);
}

self._ZEN_Auxiliary_altJSONSQLProvider_LoadFromServer = function() {
	return zenInstanceMethod(this,'LoadFromServer','','VARCHAR',arguments);
}

self._ZEN_Auxiliary_altJSONSQLProvider_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}

self._ZEN_Auxiliary_altJSONSQLProvider_RefreshFromServer = function() {
	return zenInstanceMethod(this,'RefreshFromServer','','BOOLEAN',arguments);
}

self._ZEN_Auxiliary_altJSONSQLProvider_RefreshFromServerAsynch = function() {
	zenInstanceMethod(this,'RefreshFromServerAsynch','','',arguments);
}

self._ZEN_Auxiliary_altJSONSQLProvider_SaveToServer = function() {
	return zenInstanceMethod(this,'SaveToServer','','VARCHAR',arguments);
}

self._ZEN_Auxiliary_altJSONSQLProvider_SubmitToServer = function(pCommand,pContent,pTargetClass) {
	return zenInstanceMethod(this,'SubmitToServer','L,L,L','BOOLEAN',arguments);
}

self._ZEN_Auxiliary_altJSONSQLProvider_SubmitToServerAsync = function(pCommand,pContent,pTargetClass) {
	zenInstanceMethod(this,'SubmitToServerAsync','L,L,L','',arguments);
}
self._ZEN_Auxiliary_altJSONSQLProvider__Loader = function() {
	zenLoadClass('_ZEN_Auxiliary_jsonProvider');
	_ZEN_Auxiliary_altJSONSQLProvider.prototype = zenCreate('_ZEN_Auxiliary_jsonProvider',-1);
	var p = _ZEN_Auxiliary_altJSONSQLProvider.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Auxiliary_altJSONSQLProvider;
	p.superClass = ('undefined' == typeof _ZEN_Auxiliary_jsonProvider) ? zenMaster._ZEN_Auxiliary_jsonProvider.prototype:_ZEN_Auxiliary_jsonProvider.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Auxiliary.altJSONSQLProvider';
	p._type = 'altJSONSQLProvider';
	p.serialize = _ZEN_Auxiliary_altJSONSQLProvider_serialize;
	p.getSettings = _ZEN_Auxiliary_altJSONSQLProvider_getSettings;
	p.DeleteFromServer = _ZEN_Auxiliary_altJSONSQLProvider_DeleteFromServer;
	p.ExecuteAction = _ZEN_Auxiliary_altJSONSQLProvider_ExecuteAction;
	p.LoadFromServer = _ZEN_Auxiliary_altJSONSQLProvider_LoadFromServer;
	p.ReallyRefreshContents = _ZEN_Auxiliary_altJSONSQLProvider_ReallyRefreshContents;
	p.RefreshFromServer = _ZEN_Auxiliary_altJSONSQLProvider_RefreshFromServer;
	p.RefreshFromServerAsynch = _ZEN_Auxiliary_altJSONSQLProvider_RefreshFromServerAsynch;
	p.SaveToServer = _ZEN_Auxiliary_altJSONSQLProvider_SaveToServer;
	p.SubmitToServer = _ZEN_Auxiliary_altJSONSQLProvider_SubmitToServer;
	p.SubmitToServerAsync = _ZEN_Auxiliary_altJSONSQLProvider_SubmitToServerAsync;
	p.getCurrPage = _ZEN_Auxiliary_altJSONSQLProvider_getCurrPage;
	p.getPageSize = _ZEN_Auxiliary_altJSONSQLProvider_getPageSize;
	p.getRecordCount = _ZEN_Auxiliary_altJSONSQLProvider_getRecordCount;
	p.setCurrPage = _ZEN_Auxiliary_altJSONSQLProvider_setCurrPage;
}

self._zenClassIdx['jsonArrayProvider'] = '_ZEN_Auxiliary_jsonArrayProvider';
self._ZEN_Auxiliary_jsonArrayProvider = function(index,id) {
	if (index>=0) {_ZEN_Auxiliary_jsonArrayProvider__init(this,index,id);}
}

self._ZEN_Auxiliary_jsonArrayProvider__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Auxiliary_jsonProvider__init) ?zenMaster._ZEN_Auxiliary_jsonProvider__init(o,index,id):_ZEN_Auxiliary_jsonProvider__init(o,index,id);
	o.arrayName = 'children';
	o.controller = '';
	o.controllerId = '';
	o.ongetcontroller = '';
	o.onnotifyView = '';
}
function _ZEN_Auxiliary_jsonArrayProvider_serialize(set,s)
{
	var o = this;s[0]='503773279';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.OnGetArray;s[7]=o.OnGetTargetObject;s[8]=o.OnRenderJSON;s[9]=o.OnSubmitContent;s[10]=(o.alertOnError?1:0);s[11]=o.align;s[12]=o.arrayName;s[13]=o.autoRefresh;s[14]=o.aux;s[15]=o.containerStyle;s[16]=o.content;s[17]=o.contentType;s[18]=o.controller;s[19]=o.controllerId;s[20]=set.addObject(o.criteria,'criteria');s[21]=set.addObject(o.dataBag,'dataBag');s[22]=(o.dataLoaded?1:0);s[23]=(o.dataReadOnly?1:0);s[24]=o.defaultSeries;s[25]=o.documentId;s[26]=(o.dragEnabled?1:0);s[27]=(o.dropEnabled?1:0);s[28]=(o.dynamic?1:0);s[29]=o.enclosingClass;s[30]=o.enclosingStyle;s[31]=o.error;s[32]=o.height;s[33]=(o.hidden?1:0);s[34]=o.hint;s[35]=o.hintClass;s[36]=o.hintStyle;s[37]=o.label;s[38]=o.labelClass;s[39]=o.labelDisabledClass;s[40]=o.labelStyle;s[41]=(o.modelChanged?1:0);s[42]=o.modelError;s[43]=o.modelId;s[44]=o.onafterdrag;s[45]=o.onbeforedrag;s[46]=o.oncreate;s[47]=o.ondelete;s[48]=o.ondrag;s[49]=o.ondrop;s[50]=o.onerror;s[51]=o.ongetcontroller;s[52]=o.onhide;s[53]=o.onnotifyController;s[54]=o.onnotifyView;s[55]=o.onrefresh;s[56]=o.onsave;s[57]=o.onshow;s[58]=o.onupdate;s[59]=o.overlayMode;s[60]=set.serializeArray(o,o.parameters,true,'parameters');s[61]=o.propertyList;s[62]=(o.readOnly?1:0);s[63]=o.renderFlag;s[64]=o.seriesNameProperty;s[65]=(o.showLabel?1:0);s[66]=o.slice;s[67]=o.targetClass;s[68]=o.timerid;s[69]=o.title;s[70]=o.tuple;s[71]=o.valign;s[72]=(o.visible?1:0);s[73]=o.width;
}
function _ZEN_Auxiliary_jsonArrayProvider_getSettings(s)
{
	s['name'] = 'string';
	s['arrayName'] = 'string';
	s['controllerId'] = 'id';
	s['ongetcontroller'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Auxiliary_jsonArrayProvider_connectToController = function() {
this.controller = '';
if (!zenIsMissing(this.controllerId)) {
if (this.composite) {
this.controller = this.composite.getChildById(this.controllerId);
}
else {
this.controller = zenPage.getComponentById(this.controllerId);
}
if (this.controller && this.controller.register) {
this.controller.register(this);
}
else {
alert('ZEN: Unable to connect component to dataController (' + this.id + ').');
}
if (this.controller) {
if ('' == this.controller.modelError) {
this.controller.loadModel(false);
}
}
}
}

self._ZEN_Auxiliary_jsonArrayProvider_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._ZEN_Auxiliary_jsonArrayProvider_getContentArray = function() {
var data = this.getContentObject();
return data && data[this.arrayName] ? data[this.arrayName] : null;
}

self._ZEN_Auxiliary_jsonArrayProvider_getContentObject = function() {
var controller = this.getController();
if (null == controller) {
this.connectToController();
controller = this.getController();
}
return controller&&controller.getContentObject ? controller.getContentObject() : null;
}

self._ZEN_Auxiliary_jsonArrayProvider_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._ZEN_Auxiliary_jsonArrayProvider_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._ZEN_Auxiliary_jsonArrayProvider_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._ZEN_Auxiliary_jsonArrayProvider_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._ZEN_Auxiliary_jsonArrayProvider_DeleteFromServer = function(pID) {
	return zenInstanceMethod(this,'DeleteFromServer','L','BOOLEAN',arguments);
}

self._ZEN_Auxiliary_jsonArrayProvider_ExecuteAction = function(pAction,pData) {
	return zenInstanceMethod(this,'ExecuteAction','L,L','BOOLEAN',arguments);
}

self._ZEN_Auxiliary_jsonArrayProvider_LoadFromServer = function() {
	return zenInstanceMethod(this,'LoadFromServer','','VARCHAR',arguments);
}

self._ZEN_Auxiliary_jsonArrayProvider_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}

self._ZEN_Auxiliary_jsonArrayProvider_RefreshFromServer = function() {
	return zenInstanceMethod(this,'RefreshFromServer','','BOOLEAN',arguments);
}

self._ZEN_Auxiliary_jsonArrayProvider_RefreshFromServerAsynch = function() {
	zenInstanceMethod(this,'RefreshFromServerAsynch','','',arguments);
}

self._ZEN_Auxiliary_jsonArrayProvider_SaveToServer = function() {
	return zenInstanceMethod(this,'SaveToServer','','VARCHAR',arguments);
}

self._ZEN_Auxiliary_jsonArrayProvider_SubmitToServer = function(pCommand,pContent,pTargetClass) {
	return zenInstanceMethod(this,'SubmitToServer','L,L,L','BOOLEAN',arguments);
}

self._ZEN_Auxiliary_jsonArrayProvider_SubmitToServerAsync = function(pCommand,pContent,pTargetClass) {
	zenInstanceMethod(this,'SubmitToServerAsync','L,L,L','',arguments);
}
self._ZEN_Auxiliary_jsonArrayProvider__Loader = function() {
	zenLoadClass('_ZEN_Auxiliary_jsonProvider');
	_ZEN_Auxiliary_jsonArrayProvider.prototype = zenCreate('_ZEN_Auxiliary_jsonProvider',-1);
	var p = _ZEN_Auxiliary_jsonArrayProvider.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Auxiliary_jsonArrayProvider;
	p.superClass = ('undefined' == typeof _ZEN_Auxiliary_jsonProvider) ? zenMaster._ZEN_Auxiliary_jsonProvider.prototype:_ZEN_Auxiliary_jsonProvider.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Auxiliary.jsonArrayProvider';
	p._type = 'jsonArrayProvider';
	p.serialize = _ZEN_Auxiliary_jsonArrayProvider_serialize;
	p.getSettings = _ZEN_Auxiliary_jsonArrayProvider_getSettings;
	p.DeleteFromServer = _ZEN_Auxiliary_jsonArrayProvider_DeleteFromServer;
	p.ExecuteAction = _ZEN_Auxiliary_jsonArrayProvider_ExecuteAction;
	p.LoadFromServer = _ZEN_Auxiliary_jsonArrayProvider_LoadFromServer;
	p.ReallyRefreshContents = _ZEN_Auxiliary_jsonArrayProvider_ReallyRefreshContents;
	p.RefreshFromServer = _ZEN_Auxiliary_jsonArrayProvider_RefreshFromServer;
	p.RefreshFromServerAsynch = _ZEN_Auxiliary_jsonArrayProvider_RefreshFromServerAsynch;
	p.SaveToServer = _ZEN_Auxiliary_jsonArrayProvider_SaveToServer;
	p.SubmitToServer = _ZEN_Auxiliary_jsonArrayProvider_SubmitToServer;
	p.SubmitToServerAsync = _ZEN_Auxiliary_jsonArrayProvider_SubmitToServerAsync;
	p.connectToController = _ZEN_Auxiliary_jsonArrayProvider_connectToController;
	p.disconnectFromController = _ZEN_Auxiliary_jsonArrayProvider_disconnectFromController;
	p.getContentArray = _ZEN_Auxiliary_jsonArrayProvider_getContentArray;
	p.getContentObject = _ZEN_Auxiliary_jsonArrayProvider_getContentObject;
	p.getController = _ZEN_Auxiliary_jsonArrayProvider_getController;
	p.notifyView = _ZEN_Auxiliary_jsonArrayProvider_notifyView;
	p.sendEventToController = _ZEN_Auxiliary_jsonArrayProvider_sendEventToController;
	p.setControllerId = _ZEN_Auxiliary_jsonArrayProvider_setControllerId;
}

self._zenClassIdx['jsonMDXProvider'] = '_ZEN_Auxiliary_jsonMDXProvider';
self._ZEN_Auxiliary_jsonMDXProvider = function(index,id) {
	if (index>=0) {_ZEN_Auxiliary_jsonMDXProvider__init(this,index,id);}
}

self._ZEN_Auxiliary_jsonMDXProvider__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Auxiliary_altJSONProvider__init) ?zenMaster._ZEN_Auxiliary_altJSONProvider__init(o,index,id):_ZEN_Auxiliary_altJSONProvider__init(o,index,id);
	o.LastSessionKey = '0';
	o.OnCreateResultSet = ''; // encrypted
	o.OnExecuteResultSet = ''; // encrypted
	o.OnGetMDX = ''; // encrypted
	o.absolutePositioning = '0';
	o.allowPreviewInteraction = true;
	o.analyzerMode = false;
	o.autoExecute = true;
	o.backgroundOpacity = '.12';
	o.canDrillDown = true;
	o.canUseListingFields = false;
	o.cellHeight = '22';
	o.cellWidth = '120';
	o.changesPending = false;
	o.columnLabelSpan = true;
	o.columnTotalAgg = 'sum';
	o.columnTotals = false;
	o.columnsTruncated = '0';
	o.crossJoinRowLimit = '2000';
	o.cubeKey = '';
	o.currListingPage = '-1';
	o.currPage = '1';
	o.dataSource = 'automatic';
	o.headFunctionAdded = false;
	o.hideMeasures = '1';
	o.initialExecute = true;
	o.isDrillThrough = false;
	o.isPaging = false;
	o.jsonRows = '2500';
	o.listingEnabled = true;
	o.listingPageSize = '100';
	o.listingSortColumn = '0';
	o.listingSortDir = 'ASC';
	o.listingType = 'table';
	o.maxChartSize = '400';
	o.mdxQuery = '';
	o.measureLocation = 'columns';
	o.pageSize = '100';
	o.pivotNonce = '624968526';
	o.pivotTable = '';
	o.previewMode = false;
	o.previewRowCount = '25';
	o.printOrientation = '1';
	o.queryKey = '';
	o.queryPending = false;
	o.queryStatus = '0';
	o.recordCount = '';
	o.reinitialized = false;
	o.rowLabelSpan = true;
	o.rowTotalAgg = 'sum';
	o.rowTotalSource = 'page';
	o.rowTotals = false;
	o.rowsTruncated = false;
	o.selectedCellBackground = 'rgb(47,98,128)';
	o.selectedCellColor = 'white';
	o.showEmptyColumns = false;
	o.showEmptyRows = false;
	o.showPivot = true;
	o.showPivotStats = true;
	o.showPlan = false;
	o.showQuery = false;
	o.showRowCaption = true;
	o.showStatus = true;
	o.showZebra = false;
	o.singleTable = false;
	o.sortColumn = '0';
	o.sortDir = 'ASC';
	o.staleCache = false;
	o.tableStyle = 'background-color:white';
}
function _ZEN_Auxiliary_jsonMDXProvider_serialize(set,s)
{
	var o = this;s[0]='3569790235';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.LastCube;s[7]=o.LastQueryKey;s[8]=o.LastSessionKey;s[9]=o.OnCreateResultSet;s[10]=o.OnExecuteResultSet;s[11]=o.OnGetArray;s[12]=o.OnGetMDX;s[13]=o.OnGetTargetObject;s[14]=o.OnRenderJSON;s[15]=o.OnSubmitContent;s[16]=o.absolutePositioning;s[17]=(o.alertOnError?1:0);s[18]=o.align;s[19]=(o.allowPreviewInteraction?1:0);s[20]=(o.analyzerMode?1:0);s[21]=(o.autoExecute?1:0);s[22]=o.autoRefresh;s[23]=o.aux;s[24]=o.backgroundImage;s[25]=o.backgroundOpacity;s[26]=o.borderBottomCell;s[27]=o.borderBottomCol;s[28]=o.borderBottomRow;s[29]=o.borderLeftCell;s[30]=o.borderLeftCol;s[31]=o.borderLeftRow;s[32]=o.borderRightCell;s[33]=o.borderRightCol;s[34]=o.borderRightRow;s[35]=o.borderTopCell;s[36]=o.borderTopCol;s[37]=o.borderTopRow;s[38]=set.serializeList(o,o.calculatedMembers,true,'calculatedMembers');s[39]=(o.canDrillDown?1:0);s[40]=(o.canUseListingFields?1:0);s[41]=o.caption;s[42]=o.cellCount;s[43]=o.cellHeight;s[44]=o.cellStyle;s[45]=o.cellWidth;s[46]=(o.changesPending?1:0);s[47]=o.colorScale;s[48]=set.addObject(o.columnAxisOptions,'columnAxisOptions');s[49]=o.columnCount;s[50]=o.columnHeaderStyle;s[51]=(o.columnLabelSpan?1:0);s[52]=set.serializeList(o,o.columnLevels,true,'columnLevels');s[53]=o.columnList;s[54]=o.columnTotalAgg;s[55]=(o.columnTotals?1:0);s[56]=o.columnsTruncated;s[57]=o.containerStyle;s[58]=o.content;s[59]=o.contentType;s[60]=o.contextFilterSpec;s[61]=set.addObject(o.criteria,'criteria');s[62]=o.crossJoinRowLimit;s[63]=o.cubeKey;s[64]=o.cubeName;s[65]=o.currListingPage;s[66]=o.currPage;s[67]=set.serializeArray(o,o.currentQueryText,true,'currentQueryText');s[68]=o.data;s[69]=set.addObject(o.dataBag,'dataBag');s[70]=(o.dataLoaded?1:0);s[71]=(o.dataReadOnly?1:0);s[72]=o.dataSource;s[73]=o.dataSourceName;s[74]=o.defaultListing;s[75]=o.defaultSeries;s[76]=o.documentId;s[77]=(o.dragEnabled?1:0);s[78]=set.serializeList(o,o.drillLevels,true,'drillLevels');s[79]=set.serializeList(o,o.drillRowNumbers,false,'drillRowNumbers');s[80]=(o.dropEnabled?1:0);s[81]=(o.dynamic?1:0);s[82]=o.enclosingClass;s[83]=o.enclosingStyle;s[84]=o.error;s[85]=o.evenRowStyle;s[86]=o.filterTableCaptionStyle;s[87]=o.filterTableItemStyle;s[88]=o.filterTableStyle;s[89]=set.serializeList(o,o.filters,true,'filters');s[90]=o.fontFamilyCell;s[91]=o.fontFamilyCol;s[92]=o.fontFamilyRow;s[93]=o.fontSizeCell;s[94]=o.fontSizeCol;s[95]=o.fontSizeRow;s[96]=set.serializeList(o,o.formatRules,true,'formatRules');s[97]=(o.headFunctionAdded?1:0);s[98]=o.height;s[99]=(o.hidden?1:0);s[100]=set.serializeList(o,o.hiddenMeasureText,false,'hiddenMeasureText');s[101]=o.hideMeasures;s[102]=o.hint;s[103]=o.hintClass;s[104]=o.hintStyle;s[105]=(o.initialExecute?1:0);s[106]=(o.isDrillThrough?1:0);s[107]=(o.isPaging?1:0);s[108]=o.jsonRows;s[109]=o.kpi;s[110]=o.label;s[111]=o.labelClass;s[112]=o.labelDisabledClass;s[113]=o.labelStyle;s[114]=o.listing;s[115]=(o.listingEnabled?1:0);s[116]=set.serializeList(o,o.listingFields,true,'listingFields');s[117]=set.serializeList(o,o.listingFilters,true,'listingFilters');s[118]=o.listingFontSize;s[119]=o.listingKey;s[120]=o.listingPageSize;s[121]=o.listingRowCount;s[122]=o.listingRows;s[123]=o.listingSelect;s[124]=o.listingSortColumn;s[125]=o.listingSortDir;s[126]=o.listingType;s[127]=o.maxChartSize;s[128]=o.maxRows;s[129]=o.mdx;s[130]=o.mdxQuery;s[131]=o.measureLocation;s[132]=set.serializeList(o,o.measures,true,'measures');s[133]=(o.modelChanged?1:0);s[134]=o.modelError;s[135]=o.modelId;s[136]=o.nowDisplayFormat;s[137]=o.onafterdrag;s[138]=o.onbeforedrag;s[139]=o.oncellClick;s[140]=o.oncellDblClick;s[141]=o.oncreate;s[142]=o.ondelete;s[143]=o.ondrag;s[144]=o.ondrill;s[145]=o.ondrop;s[146]=o.onerror;s[147]=o.onhide;s[148]=o.onlistingSelect;s[149]=o.onnotifyController;s[150]=o.onrefresh;s[151]=o.onsave;s[152]=o.onshow;s[153]=o.onupdate;s[154]=o.overlayMode;s[155]=o.overrideColumnSpec;s[156]=o.overrideColumnText;s[157]=o.overrideRowSpec;s[158]=o.overrideRowText;s[159]=o.pageSize;s[160]=set.serializeArray(o,o.parameters,true,'parameters');s[161]=o.pivotNonce;s[162]=o.pivotSelect;s[163]=o.pivotTable;s[164]=set.serializeArray(o,o.pivotVariables,false,'pivotVariables');s[165]=(o.previewMode?1:0);s[166]=o.previewRowCount;s[167]=o.printCellWidth;s[168]=o.printLabelWidth;s[169]=o.printMarginBottom;s[170]=o.printMarginLeft;s[171]=o.printMarginRight;s[172]=o.printMarginTop;s[173]=o.printOrientation;s[174]=o.printPageSize;s[175]=o.printSubtitle;s[176]=o.printSubtitleOn;s[177]=o.printTitle;s[178]=o.progressMessage;s[179]=o.propertyList;s[180]=o.queryCalls;s[181]=o.queryComplete;s[182]=o.queryKey;s[183]=(o.queryPending?1:0);s[184]=o.queryStatus;s[185]=(o.readOnly?1:0);s[186]=o.recordCount;s[187]=(o.reinitialized?1:0);s[188]=o.renderFlag;s[189]=set.serializeArray(o,o.resolvedQueryText,true,'resolvedQueryText');s[190]=set.addObject(o.rowAxisOptions,'rowAxisOptions');s[191]=set.serializeList(o,o.rowCaptionList,false,'rowCaptionList');s[192]=o.rowCaptionText;s[193]=o.rowCount;s[194]=o.rowHeaderStyle;s[195]=(o.rowLabelSpan?1:0);s[196]=set.serializeList(o,o.rowLevels,true,'rowLevels');s[197]=o.rowTotalAgg;s[198]=o.rowTotalSource;s[199]=(o.rowTotals?1:0);s[200]=(o.rowsTruncated?1:0);s[201]=o.selectedCellBackground;s[202]=o.selectedCellColor;s[203]=o.selectedRange;s[204]=o.selectedRowValues;s[205]=o.seriesNameProperty;s[206]=o.showDate;s[207]=(o.showEmptyColumns?1:0);s[208]=(o.showEmptyRows?1:0);s[209]=o.showFilters;s[210]=(o.showLabel?1:0);s[211]=o.showListingFilters;s[212]=(o.showPivot?1:0);s[213]=(o.showPivotStats?1:0);s[214]=(o.showPlan?1:0);s[215]=(o.showQuery?1:0);s[216]=(o.showRowCaption?1:0);s[217]=(o.showStatus?1:0);s[218]=o.showUser;s[219]=(o.showZebra?1:0);s[220]=o.showZebraStripes;s[221]=(o.singleTable?1:0);s[222]=o.slice;s[223]=o.sortColumn;s[224]=o.sortDir;s[225]=o.sqlRestriction;s[226]=(o.staleCache?1:0);s[227]=o.tableStyle;s[228]=o.targetClass;s[229]=o.timerid;s[230]=o.title;s[231]=o.totalValue;s[232]=o.tuple;s[233]=o.userMDX;s[234]=o.valign;s[235]=o.valueColumn;s[236]=(o.visible?1:0);s[237]=o.width;
}
function _ZEN_Auxiliary_jsonMDXProvider_getSettings(s)
{
	s['name'] = 'string';
	s['cubeKey'] = 'string';
	s['mdxQuery'] = 'string';
	s['pivotTable'] = 'string';
	s['queryKey'] = 'string';
	s['recordCount'] = 'integer';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Auxiliary_jsonMDXProvider_DeleteFromServer = function(pID) {
	return zenInstanceMethod(this,'DeleteFromServer','L','BOOLEAN',arguments);
}

self._ZEN_Auxiliary_jsonMDXProvider_DeleteLastResult = function() {
	return zenInstanceMethod(this,'DeleteLastResult','','VARCHAR',arguments);
}

self._ZEN_Auxiliary_jsonMDXProvider_ExecuteAction = function(pAction,pData) {
	return zenInstanceMethod(this,'ExecuteAction','L,L','BOOLEAN',arguments);
}

self._ZEN_Auxiliary_jsonMDXProvider_FormatValue = function(pCubeName,pQueryKey,pValue,pFormattedValue,pRowNo,pColNo) {
	return zenClassMethod(this,'FormatValue','L,L,L,O,L,L','BOOLEAN',arguments);
}

self._ZEN_Auxiliary_jsonMDXProvider_GetCurrentQueryText = function(pWhich) {
	return zenInstanceMethod(this,'GetCurrentQueryText','L','VARCHAR',arguments);
}

self._ZEN_Auxiliary_jsonMDXProvider_GetItemCaption = function(pCubeName,pSpec) {
	return zenClassMethod(this,'GetItemCaption','L,L','VARCHAR',arguments);
}

self._ZEN_Auxiliary_jsonMDXProvider_GetItemSpec = function(pSpec,pCubeName,pQueryKey,pSortDir,pSortColumn,pAxisName,pItemNo,pItemNoSorted) {
	return zenClassMethod(this,'GetItemSpec','O,L,L,L,L,L,L,B','BOOLEAN',arguments);
}

self._ZEN_Auxiliary_jsonMDXProvider_GetPivotVariableData = function(pCubeName,pVariableName,pValue) {
	return zenClassMethod(this,'GetPivotVariableData','L,L,L','HANDLE',arguments);
}

self._ZEN_Auxiliary_jsonMDXProvider_GetQueryStatus = function(pObject,pCubeName,pQueryKey,pKPI) {
	return zenClassMethod(this,'GetQueryStatus','O,L,L,L','BOOLEAN',arguments);
}

self._ZEN_Auxiliary_jsonMDXProvider_GetQueryText = function(pCubeName,pQueryKey,pEncrypt) {
	return zenClassMethod(this,'GetQueryText','L,L,B','VARCHAR',arguments);
}

self._ZEN_Auxiliary_jsonMDXProvider_GetSlicerSpecForCells = function(pSpec,pCubeName,pQueryKey,pStartRow,pStartCol,pEndRow,pEndCol,pAllRows,pAllCols,pSortCol,pSortDir) {
	return zenClassMethod(this,'GetSlicerSpecForCells','O,L,L,L,L,L,L,B,B,L,L','BOOLEAN',arguments);
}

self._ZEN_Auxiliary_jsonMDXProvider_KillQuery = function(pCubeName,pQueryKey,pNonce) {
	return zenClassMethod(this,'KillQuery','L,L,L','BOOLEAN',arguments);
}

self._ZEN_Auxiliary_jsonMDXProvider_LoadFromServer = function() {
	return zenInstanceMethod(this,'LoadFromServer','','VARCHAR',arguments);
}

self._ZEN_Auxiliary_jsonMDXProvider_ParseMDXExpression = function(pExpression,pCubeName) {
	return zenClassMethod(this,'ParseMDXExpression','L,L','VARCHAR',arguments);
}

self._ZEN_Auxiliary_jsonMDXProvider_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}

self._ZEN_Auxiliary_jsonMDXProvider_RefreshFromServer = function() {
	return zenInstanceMethod(this,'RefreshFromServer','','BOOLEAN',arguments);
}

self._ZEN_Auxiliary_jsonMDXProvider_RefreshFromServerAsynch = function() {
	zenInstanceMethod(this,'RefreshFromServerAsynch','','',arguments);
}

self._ZEN_Auxiliary_jsonMDXProvider_SaveToServer = function() {
	return zenInstanceMethod(this,'SaveToServer','','VARCHAR',arguments);
}

self._ZEN_Auxiliary_jsonMDXProvider_SetCurrentQueryText = function(pWhich,pMDX) {
	return zenInstanceMethod(this,'SetCurrentQueryText','L,L','STATUS',arguments);
}

self._ZEN_Auxiliary_jsonMDXProvider_SubmitToServer = function(pCommand,pContent,pTargetClass) {
	return zenInstanceMethod(this,'SubmitToServer','L,L,L','BOOLEAN',arguments);
}

self._ZEN_Auxiliary_jsonMDXProvider_SubmitToServerAsync = function(pCommand,pContent,pTargetClass) {
	zenInstanceMethod(this,'SubmitToServerAsync','L,L,L','',arguments);
}

self._ZEN_Auxiliary_jsonMDXProvider_SynthesizeMDX = function(pSC,pRS,pParms,pFilterInfo,pAdvancedFilters,pQueryText,pAxes,pDataReady,pComplexQuery,pExecuteBaseQuery,pShowAll) {
	return zenInstanceMethod(this,'SynthesizeMDX','L,O,L,L,L,L,L,B,B,B,B','VARCHAR',arguments);
}
self._ZEN_Auxiliary_jsonMDXProvider__Loader = function() {
	zenLoadClass('_ZEN_Auxiliary_altJSONProvider');
	_ZEN_Auxiliary_jsonMDXProvider.prototype = zenCreate('_ZEN_Auxiliary_altJSONProvider',-1);
	var p = _ZEN_Auxiliary_jsonMDXProvider.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Auxiliary_jsonMDXProvider;
	p.superClass = ('undefined' == typeof _ZEN_Auxiliary_altJSONProvider) ? zenMaster._ZEN_Auxiliary_altJSONProvider.prototype:_ZEN_Auxiliary_altJSONProvider.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Auxiliary.jsonMDXProvider';
	p._type = 'jsonMDXProvider';
	p.serialize = _ZEN_Auxiliary_jsonMDXProvider_serialize;
	p.getSettings = _ZEN_Auxiliary_jsonMDXProvider_getSettings;
	p.DeleteFromServer = _ZEN_Auxiliary_jsonMDXProvider_DeleteFromServer;
	p.DeleteLastResult = _ZEN_Auxiliary_jsonMDXProvider_DeleteLastResult;
	p.ExecuteAction = _ZEN_Auxiliary_jsonMDXProvider_ExecuteAction;
	p.FormatValue = _ZEN_Auxiliary_jsonMDXProvider_FormatValue;
	p.GetCurrentQueryText = _ZEN_Auxiliary_jsonMDXProvider_GetCurrentQueryText;
	p.GetItemCaption = _ZEN_Auxiliary_jsonMDXProvider_GetItemCaption;
	p.GetItemSpec = _ZEN_Auxiliary_jsonMDXProvider_GetItemSpec;
	p.GetPivotVariableData = _ZEN_Auxiliary_jsonMDXProvider_GetPivotVariableData;
	p.GetQueryStatus = _ZEN_Auxiliary_jsonMDXProvider_GetQueryStatus;
	p.GetQueryText = _ZEN_Auxiliary_jsonMDXProvider_GetQueryText;
	p.GetSlicerSpecForCells = _ZEN_Auxiliary_jsonMDXProvider_GetSlicerSpecForCells;
	p.KillQuery = _ZEN_Auxiliary_jsonMDXProvider_KillQuery;
	p.LoadFromServer = _ZEN_Auxiliary_jsonMDXProvider_LoadFromServer;
	p.ParseMDXExpression = _ZEN_Auxiliary_jsonMDXProvider_ParseMDXExpression;
	p.ReallyRefreshContents = _ZEN_Auxiliary_jsonMDXProvider_ReallyRefreshContents;
	p.RefreshFromServer = _ZEN_Auxiliary_jsonMDXProvider_RefreshFromServer;
	p.RefreshFromServerAsynch = _ZEN_Auxiliary_jsonMDXProvider_RefreshFromServerAsynch;
	p.SaveToServer = _ZEN_Auxiliary_jsonMDXProvider_SaveToServer;
	p.SetCurrentQueryText = _ZEN_Auxiliary_jsonMDXProvider_SetCurrentQueryText;
	p.SubmitToServer = _ZEN_Auxiliary_jsonMDXProvider_SubmitToServer;
	p.SubmitToServerAsync = _ZEN_Auxiliary_jsonMDXProvider_SubmitToServerAsync;
	p.SynthesizeMDX = _ZEN_Auxiliary_jsonMDXProvider_SynthesizeMDX;
}

self._zenClassIdx['jsonSQLProvider'] = '_ZEN_Auxiliary_jsonSQLProvider';
self._ZEN_Auxiliary_jsonSQLProvider = function(index,id) {
	if (index>=0) {_ZEN_Auxiliary_jsonSQLProvider__init(this,index,id);}
}

self._ZEN_Auxiliary_jsonSQLProvider__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Auxiliary_jsonProvider__init) ?zenMaster._ZEN_Auxiliary_jsonProvider__init(o,index,id):_ZEN_Auxiliary_jsonProvider__init(o,index,id);
	o.OnCreateResultSet = ''; // encrypted
	o.OnExecuteResultSet = ''; // encrypted
	o.OnGetSQL = ''; // encrypted
	o.arrayName = 'children';
	o.columnName = '';
	o.countRows = '0';
	o.currPage = '1';
	o.groupByClause = '';
	o.maxRows = '100';
	o.orderByClause = '';
	o.pageSize = '25';
	o.queryClass = ''; // encrypted
	o.queryName = '';
	o.recordCount = '';
	o.sql = ''; // encrypted
	o.tableName = ''; // encrypted
	o.whereClause = '';
}
function _ZEN_Auxiliary_jsonSQLProvider_serialize(set,s)
{
	var o = this;s[0]='320028001';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.OnCreateResultSet;s[7]=o.OnExecuteResultSet;s[8]=o.OnGetArray;s[9]=o.OnGetSQL;s[10]=o.OnGetTargetObject;s[11]=o.OnRenderJSON;s[12]=o.OnSubmitContent;s[13]=(o.alertOnError?1:0);s[14]=o.align;s[15]=o.arrayName;s[16]=o.autoRefresh;s[17]=o.aux;s[18]=o.columnName;s[19]=o.containerStyle;s[20]=o.content;s[21]=o.contentType;s[22]=o.countRows;s[23]=set.addObject(o.criteria,'criteria');s[24]=o.currPage;s[25]=set.addObject(o.dataBag,'dataBag');s[26]=(o.dataLoaded?1:0);s[27]=(o.dataReadOnly?1:0);s[28]=o.defaultSeries;s[29]=o.documentId;s[30]=(o.dragEnabled?1:0);s[31]=(o.dropEnabled?1:0);s[32]=(o.dynamic?1:0);s[33]=o.enclosingClass;s[34]=o.enclosingStyle;s[35]=o.error;s[36]=o.groupByClause;s[37]=o.height;s[38]=(o.hidden?1:0);s[39]=o.hint;s[40]=o.hintClass;s[41]=o.hintStyle;s[42]=o.label;s[43]=o.labelClass;s[44]=o.labelDisabledClass;s[45]=o.labelStyle;s[46]=o.maxRows;s[47]=(o.modelChanged?1:0);s[48]=o.modelError;s[49]=o.modelId;s[50]=o.onafterdrag;s[51]=o.onbeforedrag;s[52]=o.oncreate;s[53]=o.ondelete;s[54]=o.ondrag;s[55]=o.ondrop;s[56]=o.onerror;s[57]=o.onhide;s[58]=o.onnotifyController;s[59]=o.onrefresh;s[60]=o.onsave;s[61]=o.onshow;s[62]=o.onupdate;s[63]=o.orderByClause;s[64]=o.overlayMode;s[65]=o.pageSize;s[66]=set.serializeArray(o,o.parameters,true,'parameters');s[67]=o.propertyList;s[68]=o.queryClass;s[69]=o.queryName;s[70]=(o.readOnly?1:0);s[71]=o.recordCount;s[72]=o.renderFlag;s[73]=o.seriesNameProperty;s[74]=(o.showLabel?1:0);s[75]=o.slice;s[76]=o.sql;s[77]=o.tableName;s[78]=o.targetClass;s[79]=o.timerid;s[80]=o.title;s[81]=o.tuple;s[82]=o.valign;s[83]=(o.visible?1:0);s[84]=o.whereClause;s[85]=o.width;
}
function _ZEN_Auxiliary_jsonSQLProvider_getSettings(s)
{
	s['name'] = 'string';
	s['arrayName'] = 'string';
	s['columnName'] = 'string';
	s['countRows'] = 'integer';
	s['currPage'] = 'integer';
	s['groupByClause'] = 'string';
	s['maxRows'] = 'integer';
	s['orderByClause'] = 'string';
	s['pageSize'] = 'integer';
	s['queryClass'] = 'className';
	s['queryName'] = 'classMember:QUERY';
	s['recordCount'] = 'integer';
	s['sql'] = 'sql';
	s['tableName'] = 'string';
	s['whereClause'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Auxiliary_jsonSQLProvider_getCurrPage = function() {
return this.currPage!=='' ? parseInt(this.currPage) : '';
}

self._ZEN_Auxiliary_jsonSQLProvider_getPageSize = function() {
return this.pageSize!=='' ? parseInt(this.pageSize) : '';
}

self._ZEN_Auxiliary_jsonSQLProvider_getRecordCount = function() {
return this.recordCount!=='' ? parseInt(this.recordCount) : '';
}

self._ZEN_Auxiliary_jsonSQLProvider_setCurrPage = function(page) {
this.currPage = parseInt(page);
}

self._ZEN_Auxiliary_jsonSQLProvider_DeleteFromServer = function(pID) {
	return zenInstanceMethod(this,'DeleteFromServer','L','BOOLEAN',arguments);
}

self._ZEN_Auxiliary_jsonSQLProvider_ExecuteAction = function(pAction,pData) {
	return zenInstanceMethod(this,'ExecuteAction','L,L','BOOLEAN',arguments);
}

self._ZEN_Auxiliary_jsonSQLProvider_LoadFromServer = function() {
	return zenInstanceMethod(this,'LoadFromServer','','VARCHAR',arguments);
}

self._ZEN_Auxiliary_jsonSQLProvider_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}

self._ZEN_Auxiliary_jsonSQLProvider_RefreshFromServer = function() {
	return zenInstanceMethod(this,'RefreshFromServer','','BOOLEAN',arguments);
}

self._ZEN_Auxiliary_jsonSQLProvider_RefreshFromServerAsynch = function() {
	zenInstanceMethod(this,'RefreshFromServerAsynch','','',arguments);
}

self._ZEN_Auxiliary_jsonSQLProvider_SaveToServer = function() {
	return zenInstanceMethod(this,'SaveToServer','','VARCHAR',arguments);
}

self._ZEN_Auxiliary_jsonSQLProvider_SubmitToServer = function(pCommand,pContent,pTargetClass) {
	return zenInstanceMethod(this,'SubmitToServer','L,L,L','BOOLEAN',arguments);
}

self._ZEN_Auxiliary_jsonSQLProvider_SubmitToServerAsync = function(pCommand,pContent,pTargetClass) {
	zenInstanceMethod(this,'SubmitToServerAsync','L,L,L','',arguments);
}
self._ZEN_Auxiliary_jsonSQLProvider__Loader = function() {
	zenLoadClass('_ZEN_Auxiliary_jsonProvider');
	_ZEN_Auxiliary_jsonSQLProvider.prototype = zenCreate('_ZEN_Auxiliary_jsonProvider',-1);
	var p = _ZEN_Auxiliary_jsonSQLProvider.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Auxiliary_jsonSQLProvider;
	p.superClass = ('undefined' == typeof _ZEN_Auxiliary_jsonProvider) ? zenMaster._ZEN_Auxiliary_jsonProvider.prototype:_ZEN_Auxiliary_jsonProvider.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Auxiliary.jsonSQLProvider';
	p._type = 'jsonSQLProvider';
	p.serialize = _ZEN_Auxiliary_jsonSQLProvider_serialize;
	p.getSettings = _ZEN_Auxiliary_jsonSQLProvider_getSettings;
	p.DeleteFromServer = _ZEN_Auxiliary_jsonSQLProvider_DeleteFromServer;
	p.ExecuteAction = _ZEN_Auxiliary_jsonSQLProvider_ExecuteAction;
	p.LoadFromServer = _ZEN_Auxiliary_jsonSQLProvider_LoadFromServer;
	p.ReallyRefreshContents = _ZEN_Auxiliary_jsonSQLProvider_ReallyRefreshContents;
	p.RefreshFromServer = _ZEN_Auxiliary_jsonSQLProvider_RefreshFromServer;
	p.RefreshFromServerAsynch = _ZEN_Auxiliary_jsonSQLProvider_RefreshFromServerAsynch;
	p.SaveToServer = _ZEN_Auxiliary_jsonSQLProvider_SaveToServer;
	p.SubmitToServer = _ZEN_Auxiliary_jsonSQLProvider_SubmitToServer;
	p.SubmitToServerAsync = _ZEN_Auxiliary_jsonSQLProvider_SubmitToServerAsync;
	p.getCurrPage = _ZEN_Auxiliary_jsonSQLProvider_getCurrPage;
	p.getPageSize = _ZEN_Auxiliary_jsonSQLProvider_getPageSize;
	p.getRecordCount = _ZEN_Auxiliary_jsonSQLProvider_getRecordCount;
	p.setCurrPage = _ZEN_Auxiliary_jsonSQLProvider_setCurrPage;
}
/* EOF */