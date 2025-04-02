/*** Zen Module: ZEN_Auxiliary__mvc ***/

self._zenClassIdx['abstractController'] = '_ZEN_Auxiliary_abstractController';
self._ZEN_Auxiliary_abstractController = function(index,id) {
	if (index>=0) {_ZEN_Auxiliary_abstractController__init(this,index,id);}
}

self._ZEN_Auxiliary_abstractController__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.alertOnError = true;
	o.autoRefresh = '';
	o.criteria = null;
	o.dataBag = null;
	o.dataLoaded = false;
	o.dataReadOnly = false;
	o.defaultSeries = '1';
	o.modelChanged = true;
	o.modelError = '';
	o.modelId = '';
	o.oncreate = '';
	o.ondelete = '';
	o.onerror = '';
	o.onnotifyController = '';
	o.onsave = '';
	o.readOnly = false;
	o.timerid = '';
	o.visible = false;
}
function _ZEN_Auxiliary_abstractController_serialize(set,s)
{
	var o = this;s[0]='134501672';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=(o.alertOnError?1:0);s[7]=o.align;s[8]=o.autoRefresh;s[9]=o.aux;s[10]=o.containerStyle;s[11]=set.addObject(o.criteria,'criteria');s[12]=set.addObject(o.dataBag,'dataBag');s[13]=(o.dataLoaded?1:0);s[14]=(o.dataReadOnly?1:0);s[15]=o.defaultSeries;s[16]=(o.dragEnabled?1:0);s[17]=(o.dropEnabled?1:0);s[18]=(o.dynamic?1:0);s[19]=o.enclosingClass;s[20]=o.enclosingStyle;s[21]=o.error;s[22]=o.height;s[23]=(o.hidden?1:0);s[24]=o.hint;s[25]=o.hintClass;s[26]=o.hintStyle;s[27]=o.label;s[28]=o.labelClass;s[29]=o.labelDisabledClass;s[30]=o.labelStyle;s[31]=(o.modelChanged?1:0);s[32]=o.modelError;s[33]=o.modelId;s[34]=o.onafterdrag;s[35]=o.onbeforedrag;s[36]=o.oncreate;s[37]=o.ondelete;s[38]=o.ondrag;s[39]=o.ondrop;s[40]=o.onerror;s[41]=o.onhide;s[42]=o.onnotifyController;s[43]=o.onrefresh;s[44]=o.onsave;s[45]=o.onshow;s[46]=o.onupdate;s[47]=o.overlayMode;s[48]=(o.readOnly?1:0);s[49]=o.renderFlag;s[50]=(o.showLabel?1:0);s[51]=o.slice;s[52]=o.timerid;s[53]=o.title;s[54]=o.tuple;s[55]=o.valign;s[56]=(o.visible?1:0);s[57]=o.width;
}
function _ZEN_Auxiliary_abstractController_getSettings(s)
{
	s['name'] = 'string';
	s['alertOnError'] = 'boolean';
	s['autoRefresh'] = 'integer';
	s['criteria'] = 'string';
	s['defaultSeries'] = 'integer';
	s['modelId'] = 'string';
	s['oncreate'] = 'eventHandler';
	s['ondelete'] = 'eventHandler';
	s['onerror'] = 'eventHandler';
	s['onnotifyController'] = 'eventHandler';
	s['onsave'] = 'eventHandler';
	s['readOnly'] = 'boolean';
	s['timerid'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Auxiliary_abstractController_autoRefreshHandler = function() {
this.update();
this.startAutoRefresh();
}

self._ZEN_Auxiliary_abstractController_clearAutoRefresh = function() {
if (this.timerid) {
window.clearTimeout(this.timerid);
this.timerid = null;
}
}

self._ZEN_Auxiliary_abstractController_createNewObject = function() {
}

self._ZEN_Auxiliary_abstractController_deleteId = function(id) {
return false;
}

self._ZEN_Auxiliary_abstractController_execValidationCode = function(property,value) {
return '';
}

self._ZEN_Auxiliary_abstractController_getData = function(d1,d2,d3) {
if (!this.dataLoaded) {
return null;
}
return this.dataBag.getValueByPosition(parseInt(d1,10),(null==d2) ? 1 : parseInt(d2,10));
}

self._ZEN_Auxiliary_abstractController_getDataAsArrays = function() {
if (!this.dataLoaded) {
return null;
}
return this.dataBag.getValuesAsArrays();
}

self._ZEN_Auxiliary_abstractController_getDataAsObject = function(series) {
if (!this.dataLoaded) {
return null;
}
series = (null==series) ? 0 : series;
return this.dataBag.getValuesAsObject(series);
}

self._ZEN_Auxiliary_abstractController_getDataByName = function(property,series) {
if (this.dataLoaded) {
series = ('undefined'==typeof series) ? (this.defaultSeries-1) : parseInt(series,10);
switch(property) {
case '%id':
return this.modelId;
case '%series':
return this.defaultSeries;
default:
return this.dataBag.getValue(property,series);
}
}
return null;
}

self._ZEN_Auxiliary_abstractController_getDimSize = function(dim) {
return this.dataBag.getDimSize(dim);
}

self._ZEN_Auxiliary_abstractController_getDimensions = function() {
return 2;
}

self._ZEN_Auxiliary_abstractController_getError = function() {
return this.modelError;
}

self._ZEN_Auxiliary_abstractController_getLabel = function(n,dim) {
switch (dim) {
case 1:
return this.dataBag.getPropertyLabel(n);
case 2:
return this.dataBag.getSeriesLabel(n);
}
return '';
}

self._ZEN_Auxiliary_abstractController_getModelId = function() {
return this.modelId;
}

self._ZEN_Auxiliary_abstractController_getPropertyName = function(n) {
return this.dataBag.getPropertyName(n);
}

self._ZEN_Auxiliary_abstractController_getTypeByName = function(property) {
var type = '';
if (this.dataLoaded) {
var n = this.dataBag.getPropertyIndex(property);
if (n >= 0) {
type = this.dataBag.getPropertyType(n);
}
}
return type;
}

self._ZEN_Auxiliary_abstractController_hasData = function() {
return this.dataLoaded;
}

self._ZEN_Auxiliary_abstractController_invokeAction = function(action,data) {
this.modelError = '';
var ok = this.ExecuteAction(action,data);
return(this.modelError == '');
}

self._ZEN_Auxiliary_abstractController_isModelReadOnly = function() {
return this.dataReadOnly || this.readOnly;
}

self._ZEN_Auxiliary_abstractController_isPropertyValid = function(property,value) {
var msg = '';
msg = this.execValidationCode(property, value);
return msg;
}

self._ZEN_Auxiliary_abstractController_loadModel = function(force) {
}

self._ZEN_Auxiliary_abstractController_notifyController = function(source,reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyController) {
ret = zenInvokeCallbackMethod(this.onnotifyController,this,'onnotifyController','reason',reason,'data1',data1,'data2',data2);
}
if (ret) {
switch (reason) {
case 'propertyChange':
this.setDataByName(data1,data2,data3);
this.sendEventToViews('dataChange',source,data1,data2,data3);
break;
}
}
}

self._ZEN_Auxiliary_abstractController_onDelete = function() {
this.clearAutoRefresh();
}

self._ZEN_Auxiliary_abstractController_onloadHandler = function() {
if ('' != this.modelError) {
zenInvokeCallbackMethod(this.onerror,this,'onerror');
}
this.startAutoRefresh();
}

self._ZEN_Auxiliary_abstractController_raiseDataChange = function() {
if (this._listeners) {
for (var n = 0; n < this._listeners.length; n++) {
if (this._listeners[n]) {
this._listeners[n].notifyView('dataChange',null);
}
}
}
}

self._ZEN_Auxiliary_abstractController_register = function(component) {
if (null == this._listeners) {
this._listeners = new Array();
}
this._listeners[this._listeners.length] = component;
}

self._ZEN_Auxiliary_abstractController_save = function() {
return '';
}

self._ZEN_Auxiliary_abstractController_sendEventToViews = function(reason,source,data1,data2,data3) {
if (this._listeners) {
for (var n = 0; n < this._listeners.length; n++) {
if (this._listeners[n] && (this._listeners[n]!=source)) {
this._listeners[n].notifyView(reason,data1,data2,data3);
}
}
}
}

self._ZEN_Auxiliary_abstractController_setData = function(value,d1,d2,d3) {
if (this.dataLoaded) {
this.dataBag.setValueByPosition(value,parseInt(d1,10),(null==d2) ? 1 : parseInt(d2,10));
}
}

self._ZEN_Auxiliary_abstractController_setDataByName = function(property,value,series) {
switch(property) {
case '%id':
this.setModelId(value);
break;
case '%series':
this.setProperty('defaultSeries',value);
break;
default:
this.dataBag.setValue(property,value,(null==series) ? (this.defaultSeries-1) : (series-1));
break;
}
}

self._ZEN_Auxiliary_abstractController_setModelId = function(id) {
this.setProperty('modelId',id);
}

self._ZEN_Auxiliary_abstractController_setProperty = function(property,value,value2) {
switch(property) {
case 'modelId':
this.modelId = value;
this.loadModel(true);
this.sendEventToViews('dataChange');
break;
case 'alertOnError':
this.alertOnError = value ? true : false;
break;
case 'readOnly':
this.readOnly = value ? true : false;
this.sendEventToViews('dataChange');
break;
case 'defaultSeries':
this.defaultSeries = parseInt(value,10);
this.sendEventToViews('seriesChange');
break;
case 'autoRefresh':
this.autoRefresh = parseInt(value,10);
this.startAutoRefresh();
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Auxiliary_abstractController_startAutoRefresh = function() {
this.clearAutoRefresh();
if (0 != this.autoRefresh) {
this.timerid = window.setTimeout('zenPage.getComponent('+this.index+').autoRefreshHandler();',this.autoRefresh);
}
}

self._ZEN_Auxiliary_abstractController_unregister = function(component) {
if (this._listeners) {
for (var n = 0; n < this._listeners.length; n++) {
if (this._listeners[this._listeners.length] == component) {
this._listeners.splice(n,1);
break;
}
}
}
}

self._ZEN_Auxiliary_abstractController_update = function() {
this.loadModel(true);
this.sendEventToViews('dataChange');
}

self._ZEN_Auxiliary_abstractController_DeleteFromServer = function(pID) {
	return zenInstanceMethod(this,'DeleteFromServer','L','BOOLEAN',arguments);
}

self._ZEN_Auxiliary_abstractController_ExecuteAction = function(pAction,pData) {
	return zenInstanceMethod(this,'ExecuteAction','L,L','BOOLEAN',arguments);
}

self._ZEN_Auxiliary_abstractController_LoadFromServer = function() {
	return zenInstanceMethod(this,'LoadFromServer','','VARCHAR',arguments);
}

self._ZEN_Auxiliary_abstractController_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}

self._ZEN_Auxiliary_abstractController_SaveToServer = function() {
	return zenInstanceMethod(this,'SaveToServer','','VARCHAR',arguments);
}
self._ZEN_Auxiliary_abstractController__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_ZEN_Auxiliary_abstractController.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _ZEN_Auxiliary_abstractController.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Auxiliary_abstractController;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Auxiliary.abstractController';
	p._type = 'abstractController';
	p.serialize = _ZEN_Auxiliary_abstractController_serialize;
	p.getSettings = _ZEN_Auxiliary_abstractController_getSettings;
	p.DeleteFromServer = _ZEN_Auxiliary_abstractController_DeleteFromServer;
	p.ExecuteAction = _ZEN_Auxiliary_abstractController_ExecuteAction;
	p.LoadFromServer = _ZEN_Auxiliary_abstractController_LoadFromServer;
	p.ReallyRefreshContents = _ZEN_Auxiliary_abstractController_ReallyRefreshContents;
	p.SaveToServer = _ZEN_Auxiliary_abstractController_SaveToServer;
	p.autoRefreshHandler = _ZEN_Auxiliary_abstractController_autoRefreshHandler;
	p.clearAutoRefresh = _ZEN_Auxiliary_abstractController_clearAutoRefresh;
	p.createNewObject = _ZEN_Auxiliary_abstractController_createNewObject;
	p.deleteId = _ZEN_Auxiliary_abstractController_deleteId;
	p.execValidationCode = _ZEN_Auxiliary_abstractController_execValidationCode;
	p.getData = _ZEN_Auxiliary_abstractController_getData;
	p.getDataAsArrays = _ZEN_Auxiliary_abstractController_getDataAsArrays;
	p.getDataAsObject = _ZEN_Auxiliary_abstractController_getDataAsObject;
	p.getDataByName = _ZEN_Auxiliary_abstractController_getDataByName;
	p.getDimSize = _ZEN_Auxiliary_abstractController_getDimSize;
	p.getDimensions = _ZEN_Auxiliary_abstractController_getDimensions;
	p.getError = _ZEN_Auxiliary_abstractController_getError;
	p.getLabel = _ZEN_Auxiliary_abstractController_getLabel;
	p.getModelId = _ZEN_Auxiliary_abstractController_getModelId;
	p.getPropertyName = _ZEN_Auxiliary_abstractController_getPropertyName;
	p.getTypeByName = _ZEN_Auxiliary_abstractController_getTypeByName;
	p.hasData = _ZEN_Auxiliary_abstractController_hasData;
	p.invokeAction = _ZEN_Auxiliary_abstractController_invokeAction;
	p.isModelReadOnly = _ZEN_Auxiliary_abstractController_isModelReadOnly;
	p.isPropertyValid = _ZEN_Auxiliary_abstractController_isPropertyValid;
	p.loadModel = _ZEN_Auxiliary_abstractController_loadModel;
	p.notifyController = _ZEN_Auxiliary_abstractController_notifyController;
	p.onDelete = _ZEN_Auxiliary_abstractController_onDelete;
	p.onloadHandler = _ZEN_Auxiliary_abstractController_onloadHandler;
	p.raiseDataChange = _ZEN_Auxiliary_abstractController_raiseDataChange;
	p.register = _ZEN_Auxiliary_abstractController_register;
	p.save = _ZEN_Auxiliary_abstractController_save;
	p.sendEventToViews = _ZEN_Auxiliary_abstractController_sendEventToViews;
	p.setData = _ZEN_Auxiliary_abstractController_setData;
	p.setDataByName = _ZEN_Auxiliary_abstractController_setDataByName;
	p.setModelId = _ZEN_Auxiliary_abstractController_setModelId;
	p.setProperty = _ZEN_Auxiliary_abstractController_setProperty;
	p.startAutoRefresh = _ZEN_Auxiliary_abstractController_startAutoRefresh;
	p.unregister = _ZEN_Auxiliary_abstractController_unregister;
	p.update = _ZEN_Auxiliary_abstractController_update;
}

self._zenClassIdx['dataController'] = '_ZEN_Auxiliary_dataController';
self._ZEN_Auxiliary_dataController = function(index,id) {
	if (index>=0) {_ZEN_Auxiliary_dataController__init(this,index,id);}
}

self._ZEN_Auxiliary_dataController__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Auxiliary_abstractController__init) ?zenMaster._ZEN_Auxiliary_abstractController__init(o,index,id):_ZEN_Auxiliary_abstractController__init(o,index,id);
	o.modelClass = '';
	o.validationCode = '';
}
function _ZEN_Auxiliary_dataController_serialize(set,s)
{
	var o = this;s[0]='3410361924';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=(o.alertOnError?1:0);s[7]=o.align;s[8]=o.autoRefresh;s[9]=o.aux;s[10]=o.containerStyle;s[11]=set.addObject(o.criteria,'criteria');s[12]=set.addObject(o.dataBag,'dataBag');s[13]=(o.dataLoaded?1:0);s[14]=(o.dataReadOnly?1:0);s[15]=o.defaultSeries;s[16]=(o.dragEnabled?1:0);s[17]=(o.dropEnabled?1:0);s[18]=(o.dynamic?1:0);s[19]=o.enclosingClass;s[20]=o.enclosingStyle;s[21]=o.error;s[22]=o.height;s[23]=(o.hidden?1:0);s[24]=o.hint;s[25]=o.hintClass;s[26]=o.hintStyle;s[27]=o.label;s[28]=o.labelClass;s[29]=o.labelDisabledClass;s[30]=o.labelStyle;s[31]=(o.modelChanged?1:0);s[32]=o.modelClass;s[33]=o.modelError;s[34]=o.modelId;s[35]=o.onafterdrag;s[36]=o.onbeforedrag;s[37]=o.oncreate;s[38]=o.ondelete;s[39]=o.ondrag;s[40]=o.ondrop;s[41]=o.onerror;s[42]=o.onhide;s[43]=o.onnotifyController;s[44]=o.onrefresh;s[45]=o.onsave;s[46]=o.onshow;s[47]=o.onupdate;s[48]=o.overlayMode;s[49]=(o.readOnly?1:0);s[50]=o.renderFlag;s[51]=(o.showLabel?1:0);s[52]=o.slice;s[53]=o.timerid;s[54]=o.title;s[55]=o.tuple;s[56]=o.validationCode;s[57]=o.valign;s[58]=(o.visible?1:0);s[59]=o.width;
}
function _ZEN_Auxiliary_dataController_getSettings(s)
{
	s['name'] = 'string';
	s['modelClass'] = 'className';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Auxiliary_dataController_createNewObject = function() {
this.modelError = '';
this.dataLoaded = false;
if ('' == this.modelClass) {
return;
}
this.modelId = '';
var id = this.LoadFromServer();
this.dataLoaded = true;
zenInvokeCallbackMethod(this.oncreate,this,'oncreate');
this.sendEventToViews('dataChange');
}

self._ZEN_Auxiliary_dataController_deleteId = function(id) {
this.modelError = '';
if (this.isModelReadOnly() || '' == id) return false;
var ok = this.DeleteFromServer(id);
zenInvokeCallbackMethod(this.ondelete,this,'ondelete','id',id,'deleted',ok);
if (ok) {
if (this.modelId == id) {
this.modelId = '';
this.sendEventToViews('dataChange');
}
}
return ok;
}

self._ZEN_Auxiliary_dataController_execValidationCode = function(property,value) {
try {
if (this.dataLoaded && '' != this.validationCode) {
var code = this.validationCode + '\nreturn \'\'';
var func = new Function('property','value',code);
return func(property,value);
}
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in dataModel validation code.\nProperty: ' + property);
}
return '';
}

self._ZEN_Auxiliary_dataController_getModelClass = function() {
return this.modelClass;
}

self._ZEN_Auxiliary_dataController_loadModel = function(force) {
this.modelError = '';
if ('' == this.modelClass) {
this.dataLoaded = false;
return;
}
if (force || !this.dataLoaded) {
var id = this.LoadFromServer();
this.modelId = id;
if ('' != this.modelError) {
zenInvokeCallbackMethod(this.onerror,this,'onerror');
}
}
}

self._ZEN_Auxiliary_dataController_save = function() {
var id = '';
this.modelError = '';
if (this.dataLoaded && !this.isModelReadOnly()) {
this.modelId = this.SaveToServer();
id = this.modelId;
zenInvokeCallbackMethod(this.onsave,this,'onsave','id',this.modelId);
this.sendEventToViews('dataChange');
}
return (''==this.modelError) ? id : '';
}

self._ZEN_Auxiliary_dataController_setModelClass = function(cls,id) {
if (null!=id) {
this.modelId = id;
}
this.setProperty('modelClass',cls);
}

self._ZEN_Auxiliary_dataController_setProperty = function(property,value,value2) {
switch(property) {
case 'modelClass':
this.modelClass = value;
this.modelChanged = true;
this.loadModel(true);
this.sendEventToViews('modelChange');
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Auxiliary_dataController_DeleteFromServer = function(pID) {
	return zenInstanceMethod(this,'DeleteFromServer','L','BOOLEAN',arguments);
}

self._ZEN_Auxiliary_dataController_ExecuteAction = function(pAction,pData) {
	return zenInstanceMethod(this,'ExecuteAction','L,L','BOOLEAN',arguments);
}

self._ZEN_Auxiliary_dataController_LoadFromServer = function() {
	return zenInstanceMethod(this,'LoadFromServer','','VARCHAR',arguments);
}

self._ZEN_Auxiliary_dataController_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}

self._ZEN_Auxiliary_dataController_SaveToServer = function() {
	return zenInstanceMethod(this,'SaveToServer','','VARCHAR',arguments);
}
self._ZEN_Auxiliary_dataController__Loader = function() {
	zenLoadClass('_ZEN_Auxiliary_abstractController');
	_ZEN_Auxiliary_dataController.prototype = zenCreate('_ZEN_Auxiliary_abstractController',-1);
	var p = _ZEN_Auxiliary_dataController.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Auxiliary_dataController;
	p.superClass = ('undefined' == typeof _ZEN_Auxiliary_abstractController) ? zenMaster._ZEN_Auxiliary_abstractController.prototype:_ZEN_Auxiliary_abstractController.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Auxiliary.dataController';
	p._type = 'dataController';
	p.serialize = _ZEN_Auxiliary_dataController_serialize;
	p.getSettings = _ZEN_Auxiliary_dataController_getSettings;
	p.DeleteFromServer = _ZEN_Auxiliary_dataController_DeleteFromServer;
	p.ExecuteAction = _ZEN_Auxiliary_dataController_ExecuteAction;
	p.LoadFromServer = _ZEN_Auxiliary_dataController_LoadFromServer;
	p.ReallyRefreshContents = _ZEN_Auxiliary_dataController_ReallyRefreshContents;
	p.SaveToServer = _ZEN_Auxiliary_dataController_SaveToServer;
	p.createNewObject = _ZEN_Auxiliary_dataController_createNewObject;
	p.deleteId = _ZEN_Auxiliary_dataController_deleteId;
	p.execValidationCode = _ZEN_Auxiliary_dataController_execValidationCode;
	p.getModelClass = _ZEN_Auxiliary_dataController_getModelClass;
	p.loadModel = _ZEN_Auxiliary_dataController_loadModel;
	p.save = _ZEN_Auxiliary_dataController_save;
	p.setModelClass = _ZEN_Auxiliary_dataController_setModelClass;
	p.setProperty = _ZEN_Auxiliary_dataController_setProperty;
}
/* EOF */