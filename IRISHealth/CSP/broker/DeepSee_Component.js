/*** Zen Module: DeepSee_Component ***/

self._zenClassIdx['http://www.intersystems.com/deepsee/calculatedMember'] = '_DeepSee_Component_calculatedMember';
self._DeepSee_Component_calculatedMember = function(index,id) {
	if (index>=0) {_DeepSee_Component_calculatedMember__init(this,index,id);}
}

self._DeepSee_Component_calculatedMember__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_object__init) ?zenMaster._ZEN_Component_object__init(o,index,id):_ZEN_Component_object__init(o,index,id);
	o.dimension = '';
	o.formatString = '';
	o.memberName = '';
	o.solveOrder = '';
	o.valueExpression = '';
}
function _DeepSee_Component_calculatedMember_serialize(set,s)
{
	var o = this;s[0]='1203954184';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.aux;s[7]=o.dimension;s[8]=o.formatString;s[9]=o.memberName;s[10]=o.onupdate;s[11]=o.renderFlag;s[12]=o.solveOrder;s[13]=o.tuple;s[14]=o.valueExpression;s[15]=(o.visible?1:0);
}
function _DeepSee_Component_calculatedMember_getSettings(s)
{
	s['name'] = 'string';
	s['dimension'] = 'string';
	s['formatString'] = 'string';
	s['memberName'] = 'string';
	s['solveOrder'] = 'string';
	s['valueExpression'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._DeepSee_Component_calculatedMember_clone = function(ascomp) {
var clone;
if (ascomp) {
clone = zenPage.createComponentNS('http://www.intersystems.com/deepsee','calculatedMember');
}
else {
clone = new Object();
clone.clone = _DeepSee_Component_calculatedMember_clone;
}
clone.dimension = this.dimension;
clone.memberName = this.memberName;
clone.valueExpression = this.valueExpression;
clone.formatString = this.formatString;
return clone;
}
self._DeepSee_Component_calculatedMember__Loader = function() {
	zenLoadClass('_ZEN_Component_object');
	_DeepSee_Component_calculatedMember.prototype = zenCreate('_ZEN_Component_object',-1);
	var p = _DeepSee_Component_calculatedMember.prototype;
	if (null==p) {return;}
	p.constructor = _DeepSee_Component_calculatedMember;
	p.superClass = ('undefined' == typeof _ZEN_Component_object) ? zenMaster._ZEN_Component_object.prototype:_ZEN_Component_object.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%DeepSee.Component.calculatedMember';
	p._type = 'calculatedMember';
	p.serialize = _DeepSee_Component_calculatedMember_serialize;
	p.getSettings = _DeepSee_Component_calculatedMember_getSettings;
	p.clone = _DeepSee_Component_calculatedMember_clone;
}

self._zenClassIdx['http://www.intersystems.com/deepsee/controlDefinition'] = '_DeepSee_Component_controlDefinition';
self._DeepSee_Component_controlDefinition = function(index,id) {
	if (index>=0) {_DeepSee_Component_controlDefinition__init(this,index,id);}
}

self._DeepSee_Component_controlDefinition__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_object__init) ?zenMaster._ZEN_Component_object__init(o,index,id):_ZEN_Component_object__init(o,index,id);
	o.action = '';
	o.activeWhen = '';
	o.controlClass = '';
	o.displayList = '';
	o.label = '';
	o.location = 'widget';
	o.readOnly = false;
	o.size = '';
	o.target = '';
	o.targetProperty = '';
	o.text = '';
	o.timeout = '';
	o.title = '';
	o.type = '';
	o.value = '';
	o.valueList = '';
	o.valueRequired = false;
}
function _DeepSee_Component_controlDefinition_serialize(set,s)
{
	var o = this;s[0]='4191578076';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.action;s[7]=o.activeWhen;s[8]=o.aux;s[9]=o.controlClass;s[10]=o.displayList;s[11]=o.label;s[12]=o.location;s[13]=o.onupdate;s[14]=(o.readOnly?1:0);s[15]=o.renderFlag;s[16]=o.size;s[17]=o.target;s[18]=o.targetProperty;s[19]=o.text;s[20]=o.timeout;s[21]=o.title;s[22]=o.tuple;s[23]=o.type;s[24]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[25]=o.valueList;s[26]=(o.valueRequired?1:0);s[27]=(o.visible?1:0);
}
function _DeepSee_Component_controlDefinition_getSettings(s)
{
	s['name'] = 'string';
	s['action'] = 'string';
	s['activeWhen'] = 'string';
	s['controlClass'] = 'string';
	s['displayList'] = 'string';
	s['label'] = 'string';
	s['location'] = 'string';
	s['readOnly'] = 'string';
	s['size'] = 'string';
	s['target'] = 'string';
	s['targetProperty'] = 'string';
	s['text'] = 'string';
	s['timeout'] = 'string';
	s['title'] = 'string';
	s['type'] = 'string';
	s['value'] = 'string';
	s['valueList'] = 'string';
	s['valueRequired'] = 'string';
	this.invokeSuper('getSettings',arguments);
}
self._DeepSee_Component_controlDefinition__Loader = function() {
	zenLoadClass('_ZEN_Component_object');
	_DeepSee_Component_controlDefinition.prototype = zenCreate('_ZEN_Component_object',-1);
	var p = _DeepSee_Component_controlDefinition.prototype;
	if (null==p) {return;}
	p.constructor = _DeepSee_Component_controlDefinition;
	p.superClass = ('undefined' == typeof _ZEN_Component_object) ? zenMaster._ZEN_Component_object.prototype:_ZEN_Component_object.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%DeepSee.Component.controlDefinition';
	p._type = 'controlDefinition';
	p.serialize = _DeepSee_Component_controlDefinition_serialize;
	p.getSettings = _DeepSee_Component_controlDefinition_getSettings;
}

self._zenClassIdx['http://www.intersystems.com/deepsee/dataPropertyDefinition'] = '_DeepSee_Component_dataPropertyDefinition';
self._DeepSee_Component_dataPropertyDefinition = function(index,id) {
	if (index>=0) {_DeepSee_Component_dataPropertyDefinition__init(this,index,id);}
}

self._DeepSee_Component_dataPropertyDefinition__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_object__init) ?zenMaster._ZEN_Component_object__init(o,index,id):_ZEN_Component_object__init(o,index,id);
	o.align = '';
	o.baseValue = '';
	o.dataValue = '';
	o.display = '';
	o.format = '';
	o.label = '';
	o.rangeLower = '';
	o.rangeUpper = '';
	o.showAs = '';
	o.style = '';
	o.subtype = '';
	o.summary = '';
	o.summaryValue = '';
	o.targetValue = '';
	o.thresholdLower = '';
	o.thresholdUpper = '';
	o.valueColumn = false;
	o.width = '';
}
function _DeepSee_Component_dataPropertyDefinition_serialize(set,s)
{
	var o = this;s[0]='2490247049';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.baseValue;s[9]=o.dataValue;s[10]=o.display;s[11]=o.format;s[12]=o.label;s[13]=o.onupdate;s[14]=o.rangeLower;s[15]=o.rangeUpper;s[16]=o.renderFlag;s[17]=o.showAs;s[18]=o.style;s[19]=o.subtype;s[20]=o.summary;s[21]=o.summaryValue;s[22]=o.targetValue;s[23]=o.thresholdLower;s[24]=o.thresholdUpper;s[25]=o.tuple;s[26]=(o.valueColumn?1:0);s[27]=(o.visible?1:0);s[28]=o.width;
}
function _DeepSee_Component_dataPropertyDefinition_getSettings(s)
{
	s['name'] = 'string';
	s['align'] = 'enum:left,right,center';
	s['baseValue'] = 'string';
	s['dataValue'] = 'string';
	s['display'] = 'enum:itemNo,label,value,arrow,lamp,trendLine,plotBox,hidden';
	s['format'] = 'string';
	s['label'] = 'caption';
	s['rangeLower'] = 'string';
	s['rangeUpper'] = 'string';
	s['showAs'] = 'enum:value,sum,target,target%,sum%';
	s['style'] = 'style';
	s['subtype'] = 'string';
	s['summary'] = 'enum:sum,avg,min,max,value';
	s['summaryValue'] = 'enum:sum,avg,min,max,value';
	s['targetValue'] = 'string';
	s['thresholdLower'] = 'string';
	s['thresholdUpper'] = 'string';
	s['valueColumn'] = 'boolean';
	s['width'] = 'length';
	this.invokeSuper('getSettings',arguments);
}
self._DeepSee_Component_dataPropertyDefinition__Loader = function() {
	zenLoadClass('_ZEN_Component_object');
	_DeepSee_Component_dataPropertyDefinition.prototype = zenCreate('_ZEN_Component_object',-1);
	var p = _DeepSee_Component_dataPropertyDefinition.prototype;
	if (null==p) {return;}
	p.constructor = _DeepSee_Component_dataPropertyDefinition;
	p.superClass = ('undefined' == typeof _ZEN_Component_object) ? zenMaster._ZEN_Component_object.prototype:_ZEN_Component_object.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%DeepSee.Component.dataPropertyDefinition';
	p._type = 'dataPropertyDefinition';
	p.serialize = _DeepSee_Component_dataPropertyDefinition_serialize;
	p.getSettings = _DeepSee_Component_dataPropertyDefinition_getSettings;
}

self._zenClassIdx['http://www.intersystems.com/deepsee/dataSeriesDefinition'] = '_DeepSee_Component_dataSeriesDefinition';
self._DeepSee_Component_dataSeriesDefinition = function(index,id) {
	if (index>=0) {_DeepSee_Component_dataSeriesDefinition__init(this,index,id);}
}

self._DeepSee_Component_dataSeriesDefinition__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_object__init) ?zenMaster._ZEN_Component_object__init(o,index,id):_ZEN_Component_object__init(o,index,id);
	o.color = '';
	o.hasLegend = true;
	o.markerShape = '';
	o.type = '';
	o.yAxisIndex = '0';
}
function _DeepSee_Component_dataSeriesDefinition_serialize(set,s)
{
	var o = this;s[0]='4220101867';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.aux;s[7]=o.color;s[8]=(o.hasLegend?1:0);s[9]=o.markerShape;s[10]=o.onupdate;s[11]=o.renderFlag;s[12]=o.tuple;s[13]=o.type;s[14]=(o.visible?1:0);s[15]=o.yAxisIndex;
}
function _DeepSee_Component_dataSeriesDefinition_getSettings(s)
{
	s['name'] = 'string';
	s['color'] = 'string';
	s['hasLegend'] = 'string';
	s['markerShape'] = 'string';
	s['type'] = 'string';
	s['yAxisIndex'] = 'string';
	this.invokeSuper('getSettings',arguments);
}
self._DeepSee_Component_dataSeriesDefinition__Loader = function() {
	zenLoadClass('_ZEN_Component_object');
	_DeepSee_Component_dataSeriesDefinition.prototype = zenCreate('_ZEN_Component_object',-1);
	var p = _DeepSee_Component_dataSeriesDefinition.prototype;
	if (null==p) {return;}
	p.constructor = _DeepSee_Component_dataSeriesDefinition;
	p.superClass = ('undefined' == typeof _ZEN_Component_object) ? zenMaster._ZEN_Component_object.prototype:_ZEN_Component_object.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%DeepSee.Component.dataSeriesDefinition';
	p._type = 'dataSeriesDefinition';
	p.serialize = _DeepSee_Component_dataSeriesDefinition_serialize;
	p.getSettings = _DeepSee_Component_dataSeriesDefinition_getSettings;
}

self._zenClassIdx['http://www.intersystems.com/deepsee/pivotCondition'] = '_DeepSee_Component_pivotCondition';
self._DeepSee_Component_pivotCondition = function(index,id) {
	if (index>=0) {_DeepSee_Component_pivotCondition__init(this,index,id);}
}

self._DeepSee_Component_pivotCondition__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_object__init) ?zenMaster._ZEN_Component_object__init(o,index,id):_ZEN_Component_object__init(o,index,id);
	o.icon = '';
	o.iconCount = '1';
	o.operator = '';
	o.range = '';
	o.style = '';
	o.text = '';
	o.value = '';
}
function _DeepSee_Component_pivotCondition_serialize(set,s)
{
	var o = this;s[0]='2958741692';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.aux;s[7]=o.icon;s[8]=o.iconCount;s[9]=o.onupdate;s[10]=o.operator;s[11]=o.range;s[12]=o.renderFlag;s[13]=o.style;s[14]=o.text;s[15]=o.tuple;s[16]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[17]=(o.visible?1:0);
}
function _DeepSee_Component_pivotCondition_getSettings(s)
{
	s['name'] = 'string';
	s['icon'] = 'uri';
	s['iconCount'] = 'integer';
	s['operator'] = 'enum:=,<>,>,<,>=,<=,BETWEEN,IN,IS NULL';
	s['range'] = 'string';
	s['style'] = 'style';
	s['text'] = 'string';
	s['value'] = 'csv';
	this.invokeSuper('getSettings',arguments);
}
self._DeepSee_Component_pivotCondition__Loader = function() {
	zenLoadClass('_ZEN_Component_object');
	_DeepSee_Component_pivotCondition.prototype = zenCreate('_ZEN_Component_object',-1);
	var p = _DeepSee_Component_pivotCondition.prototype;
	if (null==p) {return;}
	p.constructor = _DeepSee_Component_pivotCondition;
	p.superClass = ('undefined' == typeof _ZEN_Component_object) ? zenMaster._ZEN_Component_object.prototype:_ZEN_Component_object.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%DeepSee.Component.pivotCondition';
	p._type = 'pivotCondition';
	p.serialize = _DeepSee_Component_pivotCondition_serialize;
	p.getSettings = _DeepSee_Component_pivotCondition_getSettings;
}

self._zenClassIdx['http://www.intersystems.com/deepsee/pivotLevel'] = '_DeepSee_Component_pivotLevel';
self._DeepSee_Component_pivotLevel = function(index,id) {
	if (index>=0) {_DeepSee_Component_pivotLevel__init(this,index,id);}
}

self._DeepSee_Component_pivotLevel__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_object__init) ?zenMaster._ZEN_Component_object__init(o,index,id):_ZEN_Component_object__init(o,index,id);
	o.advanced = false;
	o.aggEnabled = false;
	o.aggFunction = '';
	o.aggFunctionParm = '';
	o.baseSpec = '';
	o.caption = '';
	o.childLevels = new Array();
	o.drillLevel = '0';
	o.drilldownSpec = '';
	o.enabled = true;
	o.filterDim = '';
	o.filterEnabled = false;
	o.filterExpression = '';
	o.filterHier = '';
	o.headCount = '';
	o.headEnabled = false;
	o.key = '';
	o.levelCaption = '';
	o.levelFormat = '';
	o.levelHeaderStyle = '';
	o.levelStyle = '';
	o.levelSummary = '';
	o.levelType = '';
	o.orderDirection = 'BDESC';
	o.orderEnabled = false;
	o.orderExpression = '';
	o.position = '';
	o.spec = '';
	o.suppress8020 = false;
	o.text = '';
	o.transient = false;
	o.value = '';
}
function _DeepSee_Component_pivotLevel_serialize(set,s)
{
	var o = this;s[0]='2692284612';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=(o.advanced?1:0);s[7]=(o.aggEnabled?1:0);s[8]=o.aggFunction;s[9]=o.aggFunctionParm;s[10]=o.aux;s[11]=o.baseSpec;s[12]=o.caption;s[13]=set.serializeList(o,o.childLevels,true,'childLevels');s[14]=o.drillLevel;s[15]=o.drilldownSpec;s[16]=(o.enabled?1:0);s[17]=o.filterDim;s[18]=(o.filterEnabled?1:0);s[19]=o.filterExpression;s[20]=o.filterHier;s[21]=o.headCount;s[22]=(o.headEnabled?1:0);s[23]=o.key;s[24]=o.levelCaption;s[25]=o.levelFormat;s[26]=o.levelHeaderStyle;s[27]=o.levelStyle;s[28]=o.levelSummary;s[29]=o.levelType;s[30]=o.onupdate;s[31]=o.orderDirection;s[32]=(o.orderEnabled?1:0);s[33]=o.orderExpression;s[34]=o.position;s[35]=o.renderFlag;s[36]=o.spec;s[37]=(o.suppress8020?1:0);s[38]=o.text;s[39]=(o.transient?1:0);s[40]=o.tuple;s[41]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[42]=(o.visible?1:0);
}
function _DeepSee_Component_pivotLevel_getSettings(s)
{
	s['name'] = 'string';
	s['advanced'] = 'boolean';
	s['aggEnabled'] = 'boolean';
	s['aggFunction'] = 'string';
	s['aggFunctionParm'] = 'string';
	s['baseSpec'] = 'string';
	s['caption'] = 'caption';
	s['drillLevel'] = 'integer';
	s['drilldownSpec'] = 'string';
	s['enabled'] = 'boolean';
	s['filterDim'] = 'integer';
	s['filterEnabled'] = 'boolean';
	s['filterExpression'] = 'string';
	s['filterHier'] = 'integer';
	s['headCount'] = 'integer';
	s['headEnabled'] = 'boolean';
	s['key'] = 'string';
	s['levelCaption'] = 'string';
	s['levelFormat'] = 'string';
	s['levelHeaderStyle'] = 'style';
	s['levelStyle'] = 'style';
	s['levelSummary'] = 'string';
	s['levelType'] = 'enum:value,space,mdx';
	s['orderDirection'] = 'string';
	s['orderEnabled'] = 'boolean';
	s['orderExpression'] = 'string';
	s['position'] = 'integer';
	s['spec'] = 'string';
	s['suppress8020'] = 'boolean';
	s['text'] = 'caption';
	s['transient'] = 'boolean';
	s['value'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._DeepSee_Component_pivotLevel_clone = function(ascomp) {
var clone;
if (ascomp) {
clone = zenPage.createComponentNS('http://www.intersystems.com/deepsee','pivotLevel');
}
else {
clone = new Object();
clone.clone = _DeepSee_Component_pivotLevel_clone;
}
clone.spec = this.spec;
clone.key = this.key;
clone.value = this.value;
clone.text = this.text;
clone.caption = this.caption;
clone.advanced = this.advanced;
clone.filterDim = this.filterDim;
clone.filterHier = this.filterHier;
clone.suppress8020 = this.suppress8020;
clone.drilldownSpec = this.drilldownSpec;
clone.headEnabled = this.headEnabled;
clone.headCount = this.headCount;
clone.filterEnabled = this.filterEnabled;
clone.filterExpression = this.filterExpression;
clone.orderEnabled = this.orderEnabled;
clone.orderExpression = this.orderExpression;
clone.orderDirection = this.orderDirection;
clone.drillLevel = this.drillLevel;
clone.aggEnabled = this.aggEnabled;
clone.aggFunction = this.aggFunction;
clone.aggFunctionParm = this.aggFunctionParm;
clone.levelCaption = this.levelCaption;
clone.levelFormat = this.levelFormat;
clone.levelType = this.levelType;
clone.levelStyle = this.levelStyle;
clone.levelHeaderStyle = this.levelHeaderStyle;
clone.levelSummary = this.levelSummary;
clone.enabled = this.enabled;
clone.transient = this.transient;
clone.childLevels = new Array();
for (var n = 0; n < this.childLevels.length; n++) {
clone.childLevels[n] = this.childLevels[n].clone(ascomp ? true : false);
}
return clone;
}
self._DeepSee_Component_pivotLevel__Loader = function() {
	zenLoadClass('_ZEN_Component_object');
	_DeepSee_Component_pivotLevel.prototype = zenCreate('_ZEN_Component_object',-1);
	var p = _DeepSee_Component_pivotLevel.prototype;
	if (null==p) {return;}
	p.constructor = _DeepSee_Component_pivotLevel;
	p.superClass = ('undefined' == typeof _ZEN_Component_object) ? zenMaster._ZEN_Component_object.prototype:_ZEN_Component_object.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%DeepSee.Component.pivotLevel';
	p._type = 'pivotLevel';
	p.serialize = _DeepSee_Component_pivotLevel_serialize;
	p.getSettings = _DeepSee_Component_pivotLevel_getSettings;
	p.clone = _DeepSee_Component_pivotLevel_clone;
}

self._zenClassIdx['http://www.intersystems.com/deepsee/queryChunk'] = '_DeepSee_Component_queryChunk';
self._DeepSee_Component_queryChunk = function(index,id) {
	if (index>=0) {_DeepSee_Component_queryChunk__init(this,index,id);}
}

self._DeepSee_Component_queryChunk__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_object__init) ?zenMaster._ZEN_Component_object__init(o,index,id):_ZEN_Component_object__init(o,index,id);
	o.chunkText = ''; // encrypted
}
function _DeepSee_Component_queryChunk_serialize(set,s)
{
	var o = this;s[0]='1757668847';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.aux;s[7]=o.chunkText;s[8]=o.onupdate;s[9]=o.renderFlag;s[10]=o.tuple;s[11]=(o.visible?1:0);
}
function _DeepSee_Component_queryChunk_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._DeepSee_Component_queryChunk_clone = function(ascomp) {
var clone;
if (ascomp) {
clone = zenPage.createComponentNS('http://www.intersystems.com/deepsee','queryChunk');
}
else {
clone = new Object();
clone.clone = _DeepSee_Component_queryChunk_clone;
}
clone.chunkText = this.chunkText;
return clone;
}
self._DeepSee_Component_queryChunk__Loader = function() {
	zenLoadClass('_ZEN_Component_object');
	_DeepSee_Component_queryChunk.prototype = zenCreate('_ZEN_Component_object',-1);
	var p = _DeepSee_Component_queryChunk.prototype;
	if (null==p) {return;}
	p.constructor = _DeepSee_Component_queryChunk;
	p.superClass = ('undefined' == typeof _ZEN_Component_object) ? zenMaster._ZEN_Component_object.prototype:_ZEN_Component_object.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%DeepSee.Component.queryChunk';
	p._type = 'queryChunk';
	p.serialize = _DeepSee_Component_queryChunk_serialize;
	p.getSettings = _DeepSee_Component_queryChunk_getSettings;
	p.clone = _DeepSee_Component_queryChunk_clone;
}

self._zenClassIdx['http://www.intersystems.com/deepsee/chartLegend'] = '_DeepSee_Component_chartLegend';
self._DeepSee_Component_chartLegend = function(index,id) {
	if (index>=0) {_DeepSee_Component_chartLegend__init(this,index,id);}
}

self._DeepSee_Component_chartLegend__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.chartId = '';
	o.controller = '';
	o.controllerId = '';
	o.enclosingClass = 'dslegendDiv';
	o.legendBorderStyle = '';
	o.legendBoxStyle = '';
	o.legendLabels = '';
	o.legendPosition = '';
	o.legendStyle = '';
	o.legendTitle = '';
	o.ongetcontroller = '';
	o.onnotifyView = '';
	o.orientation = 'vertical';
	o.showLegendTitle = true;
}
function _DeepSee_Component_chartLegend_serialize(set,s)
{
	var o = this;s[0]='3497836560';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.chartId;s[9]=o.containerStyle;s[10]=o.controller;s[11]=o.controllerId;s[12]=(o.dragEnabled?1:0);s[13]=(o.dropEnabled?1:0);s[14]=(o.dynamic?1:0);s[15]=o.enclosingClass;s[16]=o.enclosingStyle;s[17]=o.error;s[18]=o.height;s[19]=(o.hidden?1:0);s[20]=o.hint;s[21]=o.hintClass;s[22]=o.hintStyle;s[23]=o.label;s[24]=o.labelClass;s[25]=o.labelDisabledClass;s[26]=o.labelStyle;s[27]=o.legendBorderStyle;s[28]=o.legendBoxStyle;s[29]=o.legendLabels;s[30]=o.legendPosition;s[31]=o.legendStyle;s[32]=o.legendTitle;s[33]=o.onafterdrag;s[34]=o.onbeforedrag;s[35]=o.ondrag;s[36]=o.ondrop;s[37]=o.ongetcontroller;s[38]=o.onhide;s[39]=o.onnotifyView;s[40]=o.onrefresh;s[41]=o.onshow;s[42]=o.onupdate;s[43]=o.orientation;s[44]=o.overlayMode;s[45]=o.renderFlag;s[46]=(o.showLabel?1:0);s[47]=(o.showLegendTitle?1:0);s[48]=o.slice;s[49]=o.title;s[50]=o.tuple;s[51]=o.valign;s[52]=(o.visible?1:0);s[53]=o.width;
}
function _DeepSee_Component_chartLegend_getSettings(s)
{
	s['name'] = 'string';
	s['chartId'] = 'id';
	s['controllerId'] = 'id';
	s['legendBorderStyle'] = 'style';
	s['legendBoxStyle'] = 'style';
	s['legendLabels'] = 'csv';
	s['legendPosition'] = 'enum:op,left,bottom,right,none';
	s['legendStyle'] = 'style';
	s['legendTitle'] = 'caption';
	s['ongetcontroller'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	s['orientation'] = 'enum:orizontal,vertical';
	s['showLegendTitle'] = 'boolean';
	this.invokeSuper('getSettings',arguments);
}

self._DeepSee_Component_chartLegend_acquireData = function() {
var controller = this.getController();
if (null == controller) {
this.connectToController();
controller = this.getController();
}
}

self._DeepSee_Component_chartLegend_connectToController = function() {
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

self._DeepSee_Component_chartLegend_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._DeepSee_Component_chartLegend_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._DeepSee_Component_chartLegend_itemClick = function(idx) {
if (this.chart && this.chart.getYAxisIndexForSeries) {
var ya = this.chart.getYAxisIndexForSeries(idx);
if (ya >= 0) {
this.chart.setCurrYAxis(ya);
}
}
}

self._DeepSee_Component_chartLegend_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._DeepSee_Component_chartLegend_notifyViewHandler = function(reason,data1,data2,data3) {
switch(reason) {
case 'dataChange':
case 'chartUpdate':
this.renderContents();
break;
case 'seriesChange':
case 'modelChange':
this.renderContents();
break;
}
}

self._DeepSee_Component_chartLegend_parseStyleSVG = function(style) {
var result = {};
var items = style.toString().toLowerCase().split(';');
for (var i=0; i<items.length; i++) {
if (items[i]) {
var pair = items[i].split(':');
if (pair && pair.length==2) {
newAttr = zenTrim(pair[0]);
if (newAttr && newAttr.length>0) {
newVal = zenTrim(pair[1]);
if (newVal !== '') {
result[newAttr] = newVal;
}
}
}
}
}
return result;
}

self._DeepSee_Component_chartLegend_renderContents = function() {
if (this.getEnclosingDiv() == null) return;
this.chart = null;
if (this.chartId!='') {
if (this.composite) {
this.chart = this.composite.getChildById(this.chartId);
}
else {
this.chart = zenPage.getComponentById(this.chartId);
}
}
this.acquireData();
var html = [];
var chart = this.chart;
var title = this.legendTitle; // WAL098 -- pick up title from legend settings
var legends = null;
this.legendLabels = ""; // JSL4252
this.legendTitle = ""; // JSL4291
var titleAxis=1;
if (chart) {
var yaCount = chart.getYAxisCount();
var currYAxis = chart.currYAxis;
var controller = this.getController();
this.legendTitle=title;
if (controller && chart.hasMultiples && chart.hasMultiples() && !chart.hasAxes()) {
var sz = controller.getDimSize(1);
legends = [];
for (var n = 0; n < sz; n++) {
legends[legends.length] = controller.getLabel(n,1);
}
titleAxis=0;
}
else if (controller && !chart.hasAxes()) {
var sz = controller.getDimSize(2);
legends = [];
for (var n = 0; n < sz; n++) {
legends[legends.length] = controller.getLabel(n,2);
}
}
else if (chart._type == 'bubbleChart') {
legends = [controller.getLabel(2,2)];
}
else {
legends = chart.getLegendLabels();
}
if ((title=='') && controller && controller.getDimName) {
title=controller.getDimName(titleAxis);
if (title=='') {
title=$$$Text("Measures");
}
}
if (!this.showLegendTitle) title = ''; // + WAL098 -- don't use title if user has configured legend title to off
}
var containsMeasures = ((controller.measureLocation=="columns") && (titleAxis==1)) || ((controller.measureLocation=="rows") && (titleAxis==0))
if (legends && controller && controller.hideMeasures && (controller.hiddenMeasureText.length>=1) && containsMeasures) {
for (var i = 0; i < legends.length; ++i) {
var legendText = legends[i].split('/');
for (var j = 0; j < legendText.length; ++j) {
for (var k = 0; k < controller.hiddenMeasureText.length; ++k) {
if (legendText[j] == controller.hiddenMeasureText[k]) {
legendText.splice(j,1);
break;
}
}
}
legends[i] = legendText.join('/');
}
}
this.legendLabels = legends.join(","); // JSL4252
var enclosingDiv = this.getEnclosingDiv();
var legendBoxStyle = zenGet(this.legendBoxStyle);		// DTB170
var attrs = this.parseStyleSVG(this.legendStyle); // JSL4483
var backgroundColor = attrs['background-color']; // JSL4483
var opacity = attrs['opacity'];
if (typeof(backgroundColor)=='undefined' && typeof(opacity) != 'undefined' && opacity < 1.0) {
backgroundColor = 'rgb(255,255,255)';
attrs['background-color'] = backgroundColor;
}
var legendStyle = '';
var legendPadding = '';
var legendPaddingLeft = '';
var legendPaddingRight = '';
for (var attr in attrs) {
if ('padding' == attr) {
legendPadding = 'padding:' + attrs[attr] +';';
legendPaddingLeft = 'padding-left:' + attrs[attr] + '; padding-top:' + attrs[attr] + '; padding-bottom:' + attrs[attr];
legendPaddingRight = 'padding-right:' + attrs[attr] + '; padding-top:' + attrs[attr] + '; padding-bottom:' + attrs[attr];
}
else if (typeof(opacity) != 'undefined' && opacity < 1.0) { // change background-color to rgba value
if (attr == 'opacity') continue;
if (attr == 'background-color') {
var rgba = ZLM.convertColorToRGBA(backgroundColor, opacity);
legendStyle += attr + ':' + 'rgba('+rgba+')' + ';';
} else {
legendStyle += attr + ':' + attrs[attr]+';';
}
}
else {
legendStyle += attr + ':' + attrs[attr]+';';
}
}
var legendBorderStyle = '';
var legBorderAttrs = this.parseStyleSVG(this.legendBorderStyle);
var legBorderOpacity = legBorderAttrs['opacity'];
for (var attr in legBorderAttrs) {
if (typeof(legBorderOpacity) != 'undefined' && legBorderOpacity < 1.0) { // change background-color to rgba value
if (attr == 'opacity') continue;
if (attr == 'border-color') {
var rgba = ZLM.convertColorToRGBA(legBorderAttrs[attr], legBorderOpacity);
legendBorderStyle += attr + ':' + 'rgba('+rgba+')' + ';';
} else {
legendBorderStyle += attr + ':' + legBorderAttrs[attr]+';';
}
}
else {
legendBorderStyle += attr + ':' + legBorderAttrs[attr]+';';
}
}
enclosingDiv.style.cssText += legendBorderStyle;
if (this.orientation == 'vertical') {
html[html.length] = '<table style="'+legendStyle+'" class="dslegendTable" border="0" cellpadding="3" cellspacing="0">'; // JSL4504 - use normalized legendStyle
if (title != '') {
if (''!=legendBorderStyle) {
var bottomBorderStyle = '';
var legendBorderArray = this.parseStyleSVG(legendBorderStyle);
for (var key in legendBorderArray) {
var bottomKey = key;
var bottomKeyArray = bottomKey.split('-');
bottomKeyArray.splice(1,0,'bottom');
bottomKey = bottomKeyArray.join('-');
bottomBorderStyle += bottomKey + ':' + legendBorderArray[key] + ';';
}
html[html.length] = '<tr><th colspan="2" style="' + bottomBorderStyle + legendPadding +'">'+zenEscapeXML(title)+'</th></tr>';
}
else {
html[html.length] = '<tr><th colspan="2" style="'+legendPadding+'">'+zenEscapeXML(title)+'</th></tr>';
}
}
if (legends && chart) {
for (var r = 0; r < legends.length; r++) {
var style = '';
if (yaCount>1 && chart.getYAxisIndexForSeries(r)==chart.currYAxis) {
style += 'font-weight: bold;';
}
html[html.length] = '<tr style="'+style+'" onclick="zenPage.getComponent('+this.index+').itemClick('+r+');">';
var color = chart.getSeriesColor(r);
color = this.transformColor(color);
html[html.length] = '<td align="left" width="20" title="'+zenEscapeXML(legends[r])+'" style="'+legendPaddingLeft+'"><div class="dslegendBox" style="background:'+color+';'+legendBoxStyle+'">&#160;</div></td>';	// DTB170 - include styling for the legend box
html[html.length] = '<td align="left" style="'+legendPaddingRight+'">'+zenEscapeXML(legends[r])+'</td>';
html[html.length] = '</tr>';
}
}
html[html.length] = '</table>';
}
else {
var colCount = 1;
var rowCount = 1;
var items = 0;
if (legends && chart) {
items = legends.length;
if (items > 6) {
rowCount = 3;
}
else if (items > 3) {
rowCount = 2;
}
colCount = Math.ceil(items / rowCount);
}
html[html.length] = '<table style="'+legendStyle+'" class="dslegendTable" border="0" cellpadding="3" cellspacing="0">'; // JSL4504 - normalized legendStyle
if (title != '') {
if (''!=legendBorderStyle) {
var bottomBorderStyle = '';
var legendBorderArray = this.parseStyleSVG(legendBorderStyle);
for (var key in legendBorderArray) {
var bottomKey = key;
var bottomKeyArray = bottomKey.split('-');
bottomKeyArray.splice(1,0,'bottom');
bottomKey = bottomKeyArray.join('-');
bottomBorderStyle += bottomKey + ':' + legendBorderArray[key] + ';';
}
html[html.length] = '<tr><th style="' + bottomBorderStyle + legendPadding +'" colspan="'+(2*(colCount>3?3:colCount))+'">'+zenEscapeXML(title)+'</th><th style="' + bottomBorderStyle + legendPadding +'" colspan="'+(1+(colCount>3?(2*(colCount-3)):0))+'">&#160;</th></tr>';
}
else {
html[html.length] = '<tr><th colspan="'+(2*(colCount>3?3:colCount))+'" style="'+legendPadding+'">'+zenEscapeXML(title)+'</th><th colspan="'+(1+(colCount>3?(2*(colCount-3)):0))+'" style="'+legendPadding+'">&#160;</th></tr>';
}
}
if (items) {
for (var r = 0; r < rowCount; r++) {
html[html.length] = '<tr>';
for (var c = 0; c < colCount; c++) {
itemNo = (c * rowCount) + r;
if (itemNo >= items) {
html[html.length] = '<td colspan="2">&#160;</td>';
}
else {
var style = '';
if (yaCount>1 && chart.getYAxisIndexForSeries(itemNo)==chart.currYAxis) {
style += 'font-weight: bold;';
}
var color = chart.getSeriesColor(itemNo);
color = this.transformColor(color);
html[html.length] = '<td onclick="zenPage.getComponent('+this.index+').itemClick('+itemNo+');" style="'+style+legendPaddingLeft+'" align="left" width="18" title="'+zenEscapeXML(legends[itemNo])+'"><div class="dslegendBox" style="background:'+color+';'+legendBoxStyle+'">&#160;</div></td>';		// DTB170 - include styling for the legend box
html[html.length] = '<td onclick="zenPage.getComponent('+this.index+').itemClick('+itemNo+');" style="'+style+legendPaddingRight+'" align="left" nowrap="1">'+zenEscapeXML(legends[itemNo])+'&#160;</td>';
}
}
html[html.length] = '<td align="left" width="50%">&#160;</td>';
html[html.length] = '</tr>';
}
}
html[html.length] = '</table>';
}
var enc = this.getEnclosingDiv();
enc.innerHTML = html.join('');
if (enc.firstChild) {
var attrs = this.parseStyleSVG(this.legendStyle); // JSL4483
var opacity = attrs['opacity'];
if (typeof(opacity)=='undefined') {
opacity = 1.0;
}
this.setOpacity(opacity); // JSL4483
}
}

self._DeepSee_Component_chartLegend_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._DeepSee_Component_chartLegend_setBorderStyle = function(borderStyleAttribute,value) {
var legendArray = this.parseStyleSVG(this.legendBorderStyle);
switch(borderStyleAttribute) {
case 'stroke':
legendArray['border-color'] = value;
break;
case 'stroke-width':
legendArray['border-width'] = value + 'px';
break;
case 'stroke-dasharray':
legendArray['border-style'] = value;
break;
case 'opacity':						// DTB171 - Add opacity
legendArray['opacity'] = value;
break;
}
this.legendBorderStyle = '';
for (var key in legendArray) {
this.legendBorderStyle += key + ':' + legendArray[key] + ';';
}
this.renderContents();
}

self._DeepSee_Component_chartLegend_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._DeepSee_Component_chartLegend_setOpacity = function(opacity) {
var widgetId = this.id.split('/')[0];
var dragGroup = document.getElementById(widgetId);
var legendDiv = document.getElementById(widgetId+'/chartLegend');
if (typeof(opacity)!='undefined' && opacity < 1.0) {
if (dragGroup != null) {
dragGroup.style.background="transparent";
}
if (legendDiv != null) {
dragGroup._transparent = 1; // JSL4503
var attrs = this.parseStyleSVG(this.legendStyle); // JSL4483
var backgroundColor = attrs['background-color']; // JSL4483
if (backgroundColor) {
var rgba = ZLM.convertColorToRGBA(backgroundColor, opacity);
legendDiv.style.backgroundColor = 'rgba('+rgba+')';
} else {
legendDiv.style.backgroundColor = 'rgba(255,255,255,'+opacity+')';
}
if (legendDiv.firstChild) {
legendDiv.firstChild.style.backgroundColor = 'rgba(255,255,255,0)';
}
} else {
}
} else {
if (legendDiv) {
if (legendDiv.firstChild) {
legendDiv.style.backgroundColor = legendDiv.firstChild.style.backgroundColor; // From Joe's code - some magic
}
if (dragGroup != null && !dragGroup._transparent) { // JSL4503 don't set background color to #F0F0F0 if dragGroup has been set to transparent
dragGroup.style.backgroundColor = '#F0F0F0';
}
}
}
}

self._DeepSee_Component_chartLegend_setProperty = function(property,value,value2) {
switch(property) {
case 'chartId':
this.chartId = value;
this.renderContents();
break;
case 'orientation': // JSL4503 - don't process orientation in same switch tag as legendStyle
case 'legendTitle': //  WAL098 - make sure to render contents for the legendTitle as well
case 'showLegendTitle': // WAL098 - same with showing/hiding the title
this[property] = value;
this.renderContents();
break;
case 'legendStyle':
this[property] = value;
this.renderContents();
var attrs = this.parseStyleSVG(value); // JSL4483
var opacity = attrs['opacity']; // JSL4483
this.setOpacity(opacity); // JSL4483
break;
case 'legendBoxStyle':
this[property] = value;
this.renderContents();
break;
default:
this.invokeSuper('setProperty',arguments);
break;
}
}

self._DeepSee_Component_chartLegend_transformColor = function(color) {
switch(color) {
case 'url(#deep-silver)':
case 'url(#shade-silver)':
case 'url(#glow-silver)':
case 'url(#glow-silverHz)':
case 'url(#glow-silverDiag)':
return 'silver';
case 'url(#deep-red)':
case 'url(#shade-red)':
case 'url(#glow-red)':
case 'url(#glow-redHz)':
case 'url(#glow-redDiag)':
return 'red';
case 'url(#deep-green)':
case 'url(#shade-green)':
case 'url(#glow-green)':
case 'url(#glow-greenHz)':
case 'url(#glow-greenDiag)':
return 'green';
case 'url(#deep-yellow)':
case 'url(#shade-yellow)':
case 'url(#glow-yellow)':
case 'url(#glow-yellowHz)':
case 'url(#glow-yellowDiag)':
return 'yellow';
case 'url(#deep-blue)':
case 'url(#shade-blue)':
case 'url(#glow-blue)':
case 'url(#glow-blueHz)':
case 'url(#glow-blueDiag)':
return 'blue';
case 'url(#deep-teal)':
case 'url(#shade-teal)':
case 'url(#glow-teal)':
case 'url(#glow-tealHz)':
case 'url(#glow-tealDiag)':
return 'teal';
case 'url(#deep-purple)':
case 'url(#shade-purple)':
case 'url(#glow-purple)':
case 'url(#glow-purpleHz)':
case 'url(#glow-purpleDiag)':
return 'purple';
case 'url(#deep-orange)':
case 'url(#shade-orange)':
case 'url(#glow-orange)':
case 'url(#glow-orangeHz)':
case 'url(#glow-orangeDiag)':
return 'orange';
}
return color;
}

self._DeepSee_Component_chartLegend_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._DeepSee_Component_chartLegend__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_DeepSee_Component_chartLegend.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _DeepSee_Component_chartLegend.prototype;
	if (null==p) {return;}
	p.constructor = _DeepSee_Component_chartLegend;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%DeepSee.Component.chartLegend';
	p._type = 'chartLegend';
	p.serialize = _DeepSee_Component_chartLegend_serialize;
	p.getSettings = _DeepSee_Component_chartLegend_getSettings;
	p.ReallyRefreshContents = _DeepSee_Component_chartLegend_ReallyRefreshContents;
	p.acquireData = _DeepSee_Component_chartLegend_acquireData;
	p.connectToController = _DeepSee_Component_chartLegend_connectToController;
	p.disconnectFromController = _DeepSee_Component_chartLegend_disconnectFromController;
	p.getController = _DeepSee_Component_chartLegend_getController;
	p.itemClick = _DeepSee_Component_chartLegend_itemClick;
	p.notifyView = _DeepSee_Component_chartLegend_notifyView;
	p.notifyViewHandler = _DeepSee_Component_chartLegend_notifyViewHandler;
	p.parseStyleSVG = _DeepSee_Component_chartLegend_parseStyleSVG;
	p.renderContents = _DeepSee_Component_chartLegend_renderContents;
	p.sendEventToController = _DeepSee_Component_chartLegend_sendEventToController;
	p.setBorderStyle = _DeepSee_Component_chartLegend_setBorderStyle;
	p.setControllerId = _DeepSee_Component_chartLegend_setControllerId;
	p.setOpacity = _DeepSee_Component_chartLegend_setOpacity;
	p.setProperty = _DeepSee_Component_chartLegend_setProperty;
	p.transformColor = _DeepSee_Component_chartLegend_transformColor;
}

self._zenClassIdx['http://www.intersystems.com/deepsee/coverView'] = '_DeepSee_Component_coverView';
self._DeepSee_Component_coverView = function(index,id) {
	if (index>=0) {_DeepSee_Component_coverView__init(this,index,id);}
}

self._DeepSee_Component_coverView__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.backgroundStyle = '';
	o.controller = '';
	o.controllerId = '';
	o.defaultCategory = 'Others';
	o.designMode = false;
	o.enclosingClass = 'dsCoverDiv';
	o.onactivate = '';
	o.ongetcontroller = '';
	o.ongetdata = '';
	o.ongetdetails = '';
	o.ongetitemcontext = '';
	o.onnotifyView = '';
	o.onselect = '';
	o.onselectelement = '';
	o.selectedElement = '';
	o.selectedIndex = '-1';
	o.zoomLevel = '1';
}
function _DeepSee_Component_coverView_serialize(set,s)
{
	var o = this;s[0]='31660264';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.backgroundStyle;s[9]=o.containerStyle;s[10]=o.controller;s[11]=o.controllerId;s[12]=o.defaultCategory;s[13]=(o.designMode?1:0);s[14]=(o.dragEnabled?1:0);s[15]=(o.dropEnabled?1:0);s[16]=(o.dynamic?1:0);s[17]=o.enclosingClass;s[18]=o.enclosingStyle;s[19]=o.error;s[20]=o.height;s[21]=(o.hidden?1:0);s[22]=o.hint;s[23]=o.hintClass;s[24]=o.hintStyle;s[25]=o.label;s[26]=o.labelClass;s[27]=o.labelDisabledClass;s[28]=o.labelStyle;s[29]=o.onactivate;s[30]=o.onafterdrag;s[31]=o.onbeforedrag;s[32]=o.ondrag;s[33]=o.ondrop;s[34]=o.ongetcontroller;s[35]=o.ongetdata;s[36]=o.ongetdetails;s[37]=o.ongetitemcontext;s[38]=o.onhide;s[39]=o.onnotifyView;s[40]=o.onrefresh;s[41]=o.onselect;s[42]=o.onselectelement;s[43]=o.onshow;s[44]=o.onupdate;s[45]=o.overlayMode;s[46]=o.renderFlag;s[47]=o.selectedElement;s[48]=o.selectedIndex;s[49]=(o.showLabel?1:0);s[50]=o.slice;s[51]=o.title;s[52]=o.tuple;s[53]=o.valign;s[54]=(o.visible?1:0);s[55]=o.width;s[56]=o.zoomLevel;
}
function _DeepSee_Component_coverView_getSettings(s)
{
	s['name'] = 'string';
	s['backgroundStyle'] = 'style';
	s['controllerId'] = 'id';
	s['defaultCategory'] = 'caption';
	s['designMode'] = 'boolean';
	s['onactivate'] = 'eventHandler';
	s['ongetcontroller'] = 'eventHandler';
	s['ongetdata'] = 'eventHandler';
	s['ongetdetails'] = 'eventHandler';
	s['ongetitemcontext'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	s['onselect'] = 'eventHandler';
	s['onselectelement'] = 'eventHandler';
	s['selectedIndex'] = 'integer';
	this.invokeSuper('getSettings',arguments);
}

self._DeepSee_Component_coverView_activateCover = function(evt,index,action) {
evt = evt ? evt : event;
if (evt && evt.stopPropagation) {
evt.stopPropagation();
}
this.selectedIndex = parseInt(index);
var ok = true;
if (this.onactivate!='') {
ok = zenInvokeCallbackMethod(this.onactivate,this,'onactivate','index',index,'action',action);
this.hidePopup();
}
return ok;
}

self._DeepSee_Component_coverView_connectToController = function() {
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

self._DeepSee_Component_coverView_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._DeepSee_Component_coverView_escapeJS = function(str) {
return str.toString().replace(/\'/g,'\\\'');
}

self._DeepSee_Component_coverView_evalSpec = function(spec) {
var specObject = null;
if (spec == '') {
specObject = {};
}
else if (typeof spec == 'object') {
specObject = spec;
}
else {
try {
eval('specObject = ' + spec);
}
catch(ex) {
specObject = ex.message;
}
}
return specObject;
}

self._DeepSee_Component_coverView_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._DeepSee_Component_coverView_getCoverArt = function(index,book,popupMode) {
popupMode = zenGet(popupMode,false);
var html = [];
var title = book.title ? book.title : '';
var tooltip = book.tooltip ? book.tooltip : '';
var spec = book.spec ? book.spec : '';
var specObject = this.evalSpec(spec);
if (typeof specObject == 'string') {
return specObject;
}
else if (!specObject || typeof specObject != 'object') {
return 'Invalid cover spec';
}
var context = null;
if (this.ongetitemcontext!='') {
context = zenInvokeCallbackMethod(this.ongetitemcontext,this,'ongetitemcontext','index',index);
}
var style = '';
if (this.zoomLevel>2) {
var style = '-webkit-transform:scale(2.5,2.5);top:150px;left:125px;';
style += '-moz-transform:scale(2.5,2.5);top:150px;left:125px;';
style += '-ms-transform:scale(2.5,2.5);top:150px;left:125px;';
}
else if (this.zoomLevel>1) {
var style = '-webkit-transform:scale(1.5,1.5);top:50px;left:50px;';
style += '-moz-transform:scale(1.5,1.5);top:50px;left:50px;';
style += '-ms-transform:scale(1.5,1.5);top:50px;left:50px;';
}
html[html.length] = '<div class="bookCover" id="'+this.makeId('cover_'+index)+'" style="'+style+'"';
if (!popupMode) {
html[html.length] = ' title="'+zenEscapeXML(tooltip)+'" onclick="zenPage.getComponent('+this.index+').itemClick('+index+');" onmouseover="zenPage.getComponent('+this.index+').showActivateButton('+index+');" onmouseout="zenPage.getComponent('+this.index+').hideActivateButton('+index+');"';
}
else {
html[html.length] = ' onclick="zenPage.getComponent('+this.index+').activateCover(event,'+index+',\'navigate\');"';
}
html[html.length] = '>';
if (popupMode || (!this.designMode && this.onactivate)) {
var cls = popupMode ? 'bookCover-activatePopup' : 'bookCover-activate';
html[html.length] = '<div id="'+this.makeId('activate:'+(popupMode?-1:index))+'" class="'+cls+'" onclick="zenPage.getComponent('+this.index+').activateCover(event,'+index+',\'navigate\');" >';
html[html.length] = '<image src="deepsee/ds2_arrow_east_44.png"/>';
html[html.length] = '</div>';
}
if (this.designMode && index==0) {
html[html.length] = '<div id="'+this.makeId('selector')+'" style="display:none;" class="bookCoverSelector" onmousedown="zenPage.getComponent('+this.index+').selectorMouseDown(event);" >';
html[html.length] = '</div>';
}
for (var n = 0; n < 4; n++) {
html[html.length] = '<div id="'+this.makeId('sizeHandle:'+n)+'" style="display:none;" class="bookCoverSizeHandle" onmousedown="zenPage.getComponent('+this.index+').sizeHandleMouseDown(event);" >';
html[html.length] = '</div>';
}
if (specObject.background) {
var item = specObject.background;
var click = !this.designMode ? '' : 'onclick="zenPage.getComponent('+this.index+').selectElement(\'background\');"';
html[html.length] = '<div id="'+this.makeId('background:'+index)+'" class="bookCoverBackground" style="'+zenGet(item.style)+'" '+click+'>';
if (zenGet(item.src)!='') {
var istyle = zenGet(item.imageStyle);
html[html.length] = '<image style="'+istyle+'" src="'+item.src+'"/>';
}
else {
html[html.length] = '&#160;';
}
html[html.length] = '</div>';
}
if (specObject.header) {
var item = specObject.header;
var click = !this.designMode ? '' : 'onclick="zenPage.getComponent('+this.index+').selectElement(\'header\');"';
html[html.length] = '<div id="'+this.makeId('header:'+index)+'" class="bookCoverHeader" style="'+zenGet(item.style)+'" '+click+'>'+this.getText(item.text,context)+'</div>';
}
if (specObject.footer) {
var item = specObject.footer;
var click = !this.designMode ? '' : 'onclick="zenPage.getComponent('+this.index+').selectElement(\'footer\');"';
html[html.length] = '<div id="'+this.makeId('footer:'+index)+'" class="bookCoverFooter" style="'+zenGet(item.style)+'" '+click+'>'+this.getText(item.text,context)+'</div>';
}
if (specObject.image) {
var item = specObject.image;
if (zenGet(item.src)!='') {
var istyle = 'width:96px;height:96px;' + zenGet(item.imageStyle);
var click = !this.designMode ? '' : 'onclick="zenPage.getComponent('+this.index+').selectElement(\'image\');"';
html[html.length] = '<div id="'+this.makeId('image:'+index)+'" class="bookCoverImage" style="'+zenGet(item.style)+'" '+click+'><image style="'+istyle+'" src="'+item.src+'"/>'+(zenGet(item.text,context)==''?'':('<br/>'+this.getText(item.text,context)))+'</div>';
}
}
if (specObject.subtitle) {
var item = specObject.subtitle;
var click = !this.designMode ? '' : 'onclick="zenPage.getComponent('+this.index+').selectElement(\'subtitle\');"';
html[html.length] = '<div id="'+this.makeId('subtitle:'+index)+'" class="bookCoverSubtitle" style="'+zenGet(item.style)+'" '+click+'>'+this.getText(item.text,context)+'</div>';
}
if (specObject.title) {
var item = specObject.title;
var click = !this.designMode ? '' : 'onclick="zenPage.getComponent('+this.index+').selectElement(\'title\');"';
html[html.length] = '<div id="'+this.makeId('title:'+index)+'" class="bookCoverTitle" style="'+zenGet(item.style)+'" '+click+'>'+this.getText(item.text,context)+'</div>';
}
html[html.length] = '</div>';
return html.join('');
}

self._DeepSee_Component_coverView_getCoverObject = function(index) {
var book = null;
var data = this.getModel();
if (data) {
book = data[index];
}
return book;
}

self._DeepSee_Component_coverView_getModel = function() {
var model = null;
if (this.ongetdata!='') {
model = zenInvokeCallbackMethod(this.ongetdata,this,'ongetdata');
}
else {
var controller = this.getController();
if (null == controller) {
this.connectToController();
controller = this.getController();
}
if (controller) {
if (controller.getContentObject) {
var data = controller.getContentObject();
var model = data&&data.children ? data.children : null;
}
else {
}
}
}
return model;
}

self._DeepSee_Component_coverView_getText = function(text,context) {
text = zenGet(text);
if (text==='') {
text = '&#160;';
}
else if (context && context[text]) {
text = zenEscapeXML(context[text]);
}
else {
text = zenEscapeXML(text);
}
return text;
}

self._DeepSee_Component_coverView_hideActivateButton = function(index) {
var div = this.findElement('activate:'+index);
if (div) {
if (zenPage.cssLevel<3) {
div.style.display = 'none';
}
div.style.opacity = 0.0;
}
}

self._DeepSee_Component_coverView_hidePopup = function() {
var trapDiv = this.findElement('mouseTrap');
var popupDiv = this.findElement('popup');
trapDiv.style.height = '0px';
trapDiv.style.opacity = 0.0;
popupDiv.style.height = '0px';
popupDiv.style.opacity = 0.0;
if (zenPage.cssLevel<3) {
trapDiv.style.display = 'none';
popupDiv.style.display = 'none';
}
}

self._DeepSee_Component_coverView_itemClick = function(idx) {
var info = null;
var data = this.getModel();
if (data) {
info = data[parseInt(idx)];
}
var ok = this.selectCover(idx);
if (ok && !this.designMode && this.onactivate && zenGet(info.active,1)) {
this.showPopup(idx);
}
}

self._DeepSee_Component_coverView_moveSelector = function(targetDiv) {
var div = this.findElement('selector');
if (!div) return;
var szHandle = [];
for (var n = 0; n < 4; n++) {
szHandle[n] = this.findElement('sizeHandle:'+n);
}
if (!targetDiv) {
div.style.display = 'none';
for (var n = 0; n < 4; n++) {
if (szHandle[n]) {
szHandle[n].style.display = 'none';
}
}
}
else {
div.style.display = 'block';
var top = targetDiv.offsetTop;
var left = targetDiv.offsetLeft;
var hgt = targetDiv.offsetHeight;
var wid = targetDiv.offsetWidth;
if (left < 0) {
top += 4;
left += 4;
}
div.style.top = top + 'px';
div.style.left = left + 'px';
div.style.width = wid + 'px';
div.style.height = hgt + 'px';
for (var n = 0; n < 4; n++) {
var adj = 3;
if (szHandle[n]) {
szHandle[n].style.display = 'block';
switch(n) {
case 0:
szHandle[n].style.top = top-adj + 'px';
szHandle[n].style.left = left-adj + 'px';
break;
case 1:
szHandle[n].style.top = top-adj + 'px';
szHandle[n].style.left = left+wid-adj + 'px';
break;
case 2:
szHandle[n].style.top = top+hgt-adj + 'px';
szHandle[n].style.left = left+wid-adj + 'px';
break;
case 3:
szHandle[n].style.top = top+hgt-adj + 'px';
szHandle[n].style.left = left-adj + 'px';
break;
}
}
}
}
}

self._DeepSee_Component_coverView_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._DeepSee_Component_coverView_notifyViewHandler = function(reason,data1,data2,data3) {
switch(reason) {
case 'dataChange':
case 'chartUpdate':
this.renderContents();
break;
case 'seriesChange':
case 'modelChange':
this.renderContents();
break;
}
}

self._DeepSee_Component_coverView_parseStyle = function(style) {
var result = {};
var enc = this.getEnclosingDiv();
var encStyle = enc.style.cssText;
enc.style.cssText = style + 'visibility:hidden;';
result.bold = false;
result.italic = false;
result.underline = false;
result.shadow = false;
result.smallCaps = false;
var list = ['color','backgroundColor','textAlign','fontFamily','fontSize','margin','padding','opacity'];
for (var n = 0; n < list.length; n++) {
result[list[n]] = '';
if (enc.style[list[n]]!=='') {
result[list[n]] = enc.style[list[n]];
}
}
if (enc.style.fontWeight!='') {
result.bold = (enc.style.fontWeight == 'bold');
}
if (enc.style.fontStyle!='') {
result.italic = (enc.style.fontStyle == 'italic');
}
if (enc.style.fontVariant!='') {
result.smallCaps = (enc.style.fontVariant == 'small-caps');
}
if (enc.style.textDecoration!='') {
result.underline = (enc.style.textDecoration == 'underline');
}
if (enc.style.textShadow!='') {
result.shadow = (enc.style.textShadow != 'inherit') && (enc.style.textShadow != '');
}
enc.style.cssText = encStyle;
return result;
}

self._DeepSee_Component_coverView_renderContents = function() {
if (this.getEnclosingDiv() == null) return;
var html = [];
html[html.length] = '<div id="'+this.makeId('mouseTrap')+'" class="bookCover-mouseTrap" onclick="zenPage.getComponent('+this.index+').hidePopup();">';
html[html.length] = '</div>';
html[html.length] = '<div id="'+this.makeId('popup')+'" class="bookCover-popup" style="">';
html[html.length] = '</div>';
var categories = {};
var data = this.getModel();
if (data) {
if (this.designMode) {
var n = 0;
var book = data[n];
var cat = ' ';
if (!categories[cat]) {
categories[cat] = [];
}
categories[cat][categories[cat].length] = {index:n, book:book};
}
else {
categories['<none>'] = [];
for (var n = 0; n < data.length; n++) {
var book = data[n];
var cat = book.category&&book.category!=='' ? book.category : '<none>';
if (!categories[cat]) {
categories[cat] = [];
}
categories[cat][categories[cat].length] = {index:n, book:book};
}
}
}
for (var cat in categories) {
if (categories[cat].length) {
var catName = (cat=='<none>') ? this.defaultCategory : cat;
html[html.length] = '<div class="bookCoverCategory">';
html[html.length] = '<div class="bookCoverCategoryTitle" style="'+this.backgroundStyle+'">'+zenEscapeXML(catName)+'</div>';
html[html.length] = '<div class="bookCoverSet">';
for (var n = 0; n < categories[cat].length; n++) {
var info = categories[cat][n];
html[html.length] = this.getCoverArt(info.index,info.book,false);
}
html[html.length] = '</div>';
html[html.length] = '</div>';
}
}
var div = this.getEnclosingDiv();
div.innerHTML = html.join('');
var info = this.parseStyle(this.backgroundStyle);
for (var p in info) {
switch (p) {
case 'color':
case 'backgroundColor':
div.style[p] = info[p] ? info[p] : '';
break;
default:
break;
}
}
if (this.designMode && this.selectedElement) {
this.selectElement(this.selectedElement,false);
}
}

self._DeepSee_Component_coverView_selectCover = function(index,force) {
if (this.selectedIndex>=0) {
var div = this.findElement('cover_'+this.selectedIndex);
if (div) {
div.style.border = '';
}
}
this.selectedIndex = parseInt(index);
var ok = true;
if (this.onselect!='' && !force) {
ok = zenInvokeCallbackMethod(this.onselect,this,'onselect','index',index);
}
if (this.selectedIndex>=0) {
var div = this.findElement('cover_'+this.selectedIndex);
if (div && !this.designMode) {
div.style.border = '4px solid #FFEEAA';
}
}
return ok;
}

self._DeepSee_Component_coverView_selectElement = function(which,notify) {
notify = zenGet(notify,true);
this.selectedElement = which;
var targetDiv = null;
switch(which) {
case 'title':
targetDiv = this.findElement('title:'+this.selectedIndex);
break;
case 'subtitle':
targetDiv = this.findElement('subtitle:'+this.selectedIndex);
break;
case 'image':
targetDiv = this.findElement('image:'+this.selectedIndex);
break;
case 'header':
targetDiv = this.findElement('header:'+this.selectedIndex);
break;
case 'footer':
targetDiv = this.findElement('footer:'+this.selectedIndex);
break;
case 'background':
targetDiv = this.findElement('background:'+this.selectedIndex);
break;
}
this.moveSelector(targetDiv);
if (notify) {
zenInvokeCallbackMethod(this.onselectelement,this,'onselectelement','which',which);
}
}

self._DeepSee_Component_coverView_selectorMouseDown = function(evt) {
evt = evt ? evt : window.event;
this.selectElement('');
}

self._DeepSee_Component_coverView_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._DeepSee_Component_coverView_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._DeepSee_Component_coverView_setCoverObject = function(index,book) {
var data = this.getModel();
if (data) {
data[index] = book;
this.render();
this.selectCover(this.selectedIndex,true);
}
return book;
}

self._DeepSee_Component_coverView_setProperty = function(property,value,value2) {
switch(property) {
case 'backgroundStyle':
this[property] = value;
this.render();
break;
case 'zoomLevel':
this[property] = value;
this.render();
break;
default:
this.invokeSuper('setProperty',arguments);
break;
}
}

self._DeepSee_Component_coverView_showActivateButton = function(index) {
var div = this.findElement('activate:'+index);
if (div) {
div.style.display = 'block';
div.style.opacity = 1.0;
}
}

self._DeepSee_Component_coverView_showPopup = function(index) {
var details = [];
if (this.ongetdetails) {
details = zenInvokeCallbackMethod(this.ongetdetails,this,'ongetdetails','index',index);
}
var title = '';
for (var n = 0; n < details.length; n++) {
var detail = details[n];
switch(detail.key) {
case 'title':
title = detail.value;
details.splice(n,1);
break;
}
}
var trapDiv = this.findElement('mouseTrap');
var popupDiv = this.findElement('popup');
trapDiv.style.display = 'block';
trapDiv.style.opacity = 0.6;
trapDiv.style.width = '10000px';
trapDiv.style.height = '10000px';
var width = 500;
var height = 320;
var x = (zenGetWindowWidth()-width)/2;
var y = (zenGetWindowHeight()-height)/2;
popupDiv.style.left = x + 'px';
popupDiv.style.top = y + 'px';
popupDiv.style.width = width + 'px';
popupDiv.style.height = height + 'px';
popupDiv.style.overflow = 'hidden';
popupDiv.style.border = '';
popupDiv.style.display = 'block';
var html = [];
html[html.length] = '<table style="position:absolute;top:0px;background:rgb(53,107,141);width:'+width+'px;">';
html[html.length] = '<tr>'
if (title) {
html[html.length] = '<td style="color:#F0F0F0;font-weight:bold;padding:2px;">' + zenEscapeXML(title) + '</td>';
}
html[html.length] = '<td style="text-align:right;"><image class="bookCover-popupButton" src="deepsee/ds2_x_44_w.png" style="padding:4px;width:16px;height:16px;" title="'+$$$Text('Close this window')+'" onclick="zenPage.getComponent('+this.index+').hidePopup();"/></td>';
html[html.length] = '</tr>'
html[html.length] = '</div>';
var book = null;
var data = this.getModel();
if (data) {
book = data[index];
if (book) {
html[html.length] = '<div style="position:absolute;top:30px;width:100px;">';
html[html.length] = this.getCoverArt(index,book,true);
html[html.length] = '</div>';
}
}
var iconOptions = {};
html[html.length] = '<div style="position:absolute;top:40px;left:180px;">';
for (var n = 0; n < details.length; n++) {
var detail = details[n];
if (detail.key.toString().charAt(0)=='$') {
iconOptions[detail.key] = detail.value;
}
else {
html[html.length] = '<div class="bookCover-popupLabel">' + zenEscapeXML(detail.caption) + '</div>';
html[html.length] = '<div class="bookCover-popupValue">' + zenEscapeXML(detail.value) + '</div>';
}
}
html[html.length] = '</div>';
var options = [];
if (zenGet(iconOptions.$navigate,true)) {
options[options.length] = {key:'navigate', caption:$$$Text('View this item'), image:'deepsee/ds2_magnify_44.png'};
}
if (zenGet(iconOptions.$configure,true)) {
options[options.length] = {key:'configure', caption:$$$Text('Configure this item'),image:'deepsee/ds2_gear_44.png'};
}
if (zenGet(iconOptions.$designCover,true)) {
options[options.length] = {key:'designCover', caption:$$$Text('Change the cover design'),image:'deepsee/ds2_bookmarks_44.png'};
}
if (zenGet(iconOptions.$addFavorite,true)) {
options[options.length] = {key:'addFavorite', caption:$$$Text('Add this item to Favorites'), image:'deepsee/ds2_star_44.png'};
}
if (zenGet(iconOptions.$remove,true)) {
options[options.length] = {key:'remove', caption:$$$Text('Delete this item'), image:'deepsee/ds2_x_44.png'};
}
html[html.length] = '<div style="background:#F0F0F0;position:absolute;height:34px;top:'+(height-34)+'px;width:'+width+'px;">&#160;&#160;&#160;';
for (var n = 0; n < options.length; n++) {
var option = options[n];
html[html.length] = '<image class="bookCover-popupButton" src="'+option.image+'" style="padding:4px;width:24px;height:24px;" title="'+option.caption+'" onclick="zenPage.getComponent('+this.index+').activateCover(event,'+index+',\''+option.key+'\');"/>&#160;&#160;';
}
html[html.length] = '</div>';
popupDiv.innerHTML = html.join('');
popupDiv.style.display = 'block';
popupDiv.style.opacity = 1.0;
}

self._DeepSee_Component_coverView_specToString = function(specObj) {
var specList = [];
var list = ['background','header','title','image','subtitle','footer'];
var attrs = ['text','style','src','imageStyle'];
for (var n = 0; n < list.length; n++) {
var name = list[n];
if (specObj[name]) {
var spec = [];
for (var a = 0; a < attrs.length; a++) {
if (zenGet(specObj[name][attrs[a]])!='') {
spec[spec.length] = attrs[a]+':\'' + this.escapeJS(specObj[name][attrs[a]]) + '\'';
}
}
specList[specList.length] = name+': {' + spec.join(',') + '}';
}
}
return '{' + specList.join(',') + '}';
}

self._DeepSee_Component_coverView_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._DeepSee_Component_coverView__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_DeepSee_Component_coverView.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _DeepSee_Component_coverView.prototype;
	if (null==p) {return;}
	p.constructor = _DeepSee_Component_coverView;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%DeepSee.Component.coverView';
	p._type = 'coverView';
	p.serialize = _DeepSee_Component_coverView_serialize;
	p.getSettings = _DeepSee_Component_coverView_getSettings;
	p.ReallyRefreshContents = _DeepSee_Component_coverView_ReallyRefreshContents;
	p.activateCover = _DeepSee_Component_coverView_activateCover;
	p.connectToController = _DeepSee_Component_coverView_connectToController;
	p.disconnectFromController = _DeepSee_Component_coverView_disconnectFromController;
	p.escapeJS = _DeepSee_Component_coverView_escapeJS;
	p.evalSpec = _DeepSee_Component_coverView_evalSpec;
	p.getController = _DeepSee_Component_coverView_getController;
	p.getCoverArt = _DeepSee_Component_coverView_getCoverArt;
	p.getCoverObject = _DeepSee_Component_coverView_getCoverObject;
	p.getModel = _DeepSee_Component_coverView_getModel;
	p.getText = _DeepSee_Component_coverView_getText;
	p.hideActivateButton = _DeepSee_Component_coverView_hideActivateButton;
	p.hidePopup = _DeepSee_Component_coverView_hidePopup;
	p.itemClick = _DeepSee_Component_coverView_itemClick;
	p.moveSelector = _DeepSee_Component_coverView_moveSelector;
	p.notifyView = _DeepSee_Component_coverView_notifyView;
	p.notifyViewHandler = _DeepSee_Component_coverView_notifyViewHandler;
	p.parseStyle = _DeepSee_Component_coverView_parseStyle;
	p.renderContents = _DeepSee_Component_coverView_renderContents;
	p.selectCover = _DeepSee_Component_coverView_selectCover;
	p.selectElement = _DeepSee_Component_coverView_selectElement;
	p.selectorMouseDown = _DeepSee_Component_coverView_selectorMouseDown;
	p.sendEventToController = _DeepSee_Component_coverView_sendEventToController;
	p.setControllerId = _DeepSee_Component_coverView_setControllerId;
	p.setCoverObject = _DeepSee_Component_coverView_setCoverObject;
	p.setProperty = _DeepSee_Component_coverView_setProperty;
	p.showActivateButton = _DeepSee_Component_coverView_showActivateButton;
	p.showPopup = _DeepSee_Component_coverView_showPopup;
	p.specToString = _DeepSee_Component_coverView_specToString;
}

self._zenClassIdx['http://www.intersystems.com/deepsee/deepseeCSVProvider'] = '_DeepSee_Component_deepseeCSVProvider';
self._DeepSee_Component_deepseeCSVProvider = function(index,id) {
	if (index>=0) {_DeepSee_Component_deepseeCSVProvider__init(this,index,id);}
}

self._DeepSee_Component_deepseeCSVProvider__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
}
function _DeepSee_Component_deepseeCSVProvider_serialize(set,s)
{
	var o = this;s[0]='2350274433';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.containerStyle;s[9]=(o.dragEnabled?1:0);s[10]=(o.dropEnabled?1:0);s[11]=(o.dynamic?1:0);s[12]=o.enclosingClass;s[13]=o.enclosingStyle;s[14]=o.error;s[15]=o.height;s[16]=(o.hidden?1:0);s[17]=o.hint;s[18]=o.hintClass;s[19]=o.hintStyle;s[20]=o.label;s[21]=o.labelClass;s[22]=o.labelDisabledClass;s[23]=o.labelStyle;s[24]=o.onafterdrag;s[25]=o.onbeforedrag;s[26]=o.ondrag;s[27]=o.ondrop;s[28]=o.onhide;s[29]=o.onrefresh;s[30]=o.onshow;s[31]=o.onupdate;s[32]=o.overlayMode;s[33]=o.renderFlag;s[34]=(o.showLabel?1:0);s[35]=o.slice;s[36]=o.title;s[37]=o.tuple;s[38]=o.valign;s[39]=(o.visible?1:0);s[40]=o.width;
}
function _DeepSee_Component_deepseeCSVProvider_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._DeepSee_Component_deepseeCSVProvider_downloadCSV = function(mdx,exportParams) {
window.open(zenLink('_DeepSee.UI.MDXCSV.zen?FILEROOT=' +
this.exportMDXToCSV(mdx,exportParams)),'csv','');
}

self._DeepSee_Component_deepseeCSVProvider_exportMDXToCSV = function(mdx,params,fileName) {
if (!fileName) {
fileName = Math.random().toString(36).substring(2) + '.csv';
}
return this.ExportCSV(mdx,fileName,JSON.stringify(params));
}

self._DeepSee_Component_deepseeCSVProvider_prepareTableParms = function(table) {
var exportParams = {};
if (!table) {
return exportParams;
}
if (''!=table.kpi) {
var filterNames = [];
var filterValues = [];
var filterKeys = [];
for (var n = 0; n < table.filters.length; n++) {
var filter = table.filters[n];
if (filter.text!='') {
filterNames[filterNames.length] = this.GetKpiFilterCaption(table.dataSourceName,filter.spec);
var val = filter.text.toString();
if ('&'==val.charAt(0)) {
val = val.substring(2,val.length-1);
}
filterValues[filterValues.length] = val;
filterKeys[filterKeys.length] = {spec:filter.spec,key:filter.key};
}
}
exportParams.filterNames = filterNames;
exportParams.filterValues = filterValues;
exportParams.filterKeys = filterKeys;
exportParams.kpi = table.kpi;
exportParams.columnList = table.columnList;
exportParams.isDrillThrough = table.isDrillThrough;
exportParams.listing = table.listing;
exportParams.selectedRange = table.selectedRange;
exportParams.selectedItems = table.selectedRowValues;
exportParams.listingSortColumn = table.sortColumn;
exportParams.listingSortDir = table.sortDir;
}
else if ((''!=table.cubeName) && (''!=table.queryKey)) {
var filterNames = [];
var filterValues = [];
table.getFilterInfo(filterNames, filterValues);
if (table.cubeKey) {
exportParams.cubeKey = table.cubeKey;
}
if (table.rowTotals) {
exportParams.rowTotals = 1;
}
if (table.columnTotals) {
exportParams.columnTotals = 1;
}
if (''!=table.rowTotalAgg) {
exportParams.rowTotalAgg = table.rowTotalAgg;
}
if (''!=table.columnTotalAgg) {
exportParams.columnTotalAgg = table.columnTotalAgg;
}
if (''!=table.listing) {
exportParams.listing = table.listing;
}
if (filterNames.length > 0) {
exportParams.filterNames = filterNames;
exportParams.filterValues = filterValues;
}
if (''!=table.cubeName) {
exportParams.cubeName = table.cubeName;
}
var title = table.printTitle;
if (title=='') {
title = table.name;
if (title!='') {
var s = title.toString().split('.');
s.length = s.length-1;
title = s.join('.');
}
else {
title = table.cubeName;
}
}
exportParams.title = title;
exportParams.subtitle = table.printSubtitle;
exportParams.subtitleOn = table.printSubtitleOn;
exportParams.showDate = table.showDate;
exportParams.showUser = table.showUser;
exportParams.showFilters = table.showFilters;
exportParams.showListingFilters = table.showListingFilters;
var pivotVarNames=[];
var pivotVarValues=[];
table.getPivotVariablesValues(pivotVarNames, pivotVarValues);
if (pivotVarNames.length) {
exportParams.pivotVarNames = pivotVarNames;
exportParams.pivotVarValues = pivotVarValues;
}
}
return exportParams;
}

self._DeepSee_Component_deepseeCSVProvider_ExportCSV = function(pMDX,pFileName,pParmsJSON,pStatus) {
	return zenClassMethod(this,'ExportCSV','L,L,L,L','VARCHAR',arguments);
}

self._DeepSee_Component_deepseeCSVProvider_GetKpiFilterCaption = function(pKPIName,pSpec) {
	return zenClassMethod(this,'GetKpiFilterCaption','L,L','VARCHAR',arguments);
}

self._DeepSee_Component_deepseeCSVProvider_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}

self._DeepSee_Component_deepseeCSVProvider_ScopeFileName = function(rawName) {
	return zenClassMethod(this,'ScopeFileName','L','VARCHAR',arguments);
}
self._DeepSee_Component_deepseeCSVProvider__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_DeepSee_Component_deepseeCSVProvider.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _DeepSee_Component_deepseeCSVProvider.prototype;
	if (null==p) {return;}
	p.constructor = _DeepSee_Component_deepseeCSVProvider;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%DeepSee.Component.deepseeCSVProvider';
	p._type = 'deepseeCSVProvider';
	p.serialize = _DeepSee_Component_deepseeCSVProvider_serialize;
	p.getSettings = _DeepSee_Component_deepseeCSVProvider_getSettings;
	p.ExportCSV = _DeepSee_Component_deepseeCSVProvider_ExportCSV;
	p.GetKpiFilterCaption = _DeepSee_Component_deepseeCSVProvider_GetKpiFilterCaption;
	p.ReallyRefreshContents = _DeepSee_Component_deepseeCSVProvider_ReallyRefreshContents;
	p.ScopeFileName = _DeepSee_Component_deepseeCSVProvider_ScopeFileName;
	p.downloadCSV = _DeepSee_Component_deepseeCSVProvider_downloadCSV;
	p.exportMDXToCSV = _DeepSee_Component_deepseeCSVProvider_exportMDXToCSV;
	p.prepareTableParms = _DeepSee_Component_deepseeCSVProvider_prepareTableParms;
}

self._zenClassIdx['http://www.intersystems.com/deepsee/drillIndicator'] = '_DeepSee_Component_drillIndicator';
self._DeepSee_Component_drillIndicator = function(index,id) {
	if (index>=0) {_DeepSee_Component_drillIndicator__init(this,index,id);}
}

self._DeepSee_Component_drillIndicator__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.ondrilldown = '';
	o.ondrillup = '';
	o.pivotId = '';
}
function _DeepSee_Component_drillIndicator_serialize(set,s)
{
	var o = this;s[0]='2487307951';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.containerStyle;s[9]=(o.dragEnabled?1:0);s[10]=(o.dropEnabled?1:0);s[11]=(o.dynamic?1:0);s[12]=o.enclosingClass;s[13]=o.enclosingStyle;s[14]=o.error;s[15]=o.height;s[16]=(o.hidden?1:0);s[17]=o.hint;s[18]=o.hintClass;s[19]=o.hintStyle;s[20]=o.label;s[21]=o.labelClass;s[22]=o.labelDisabledClass;s[23]=o.labelStyle;s[24]=o.onafterdrag;s[25]=o.onbeforedrag;s[26]=o.ondrag;s[27]=o.ondrilldown;s[28]=o.ondrillup;s[29]=o.ondrop;s[30]=o.onhide;s[31]=o.onrefresh;s[32]=o.onshow;s[33]=o.onupdate;s[34]=o.overlayMode;s[35]=o.pivotId;s[36]=o.renderFlag;s[37]=(o.showLabel?1:0);s[38]=o.slice;s[39]=o.title;s[40]=o.tuple;s[41]=o.valign;s[42]=(o.visible?1:0);s[43]=o.width;
}
function _DeepSee_Component_drillIndicator_getSettings(s)
{
	s['name'] = 'string';
	s['ondrilldown'] = 'eventHandler';
	s['ondrillup'] = 'eventHandler';
	s['pivotId'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._DeepSee_Component_drillIndicator_drillDownHandler = function() {
zenInvokeCallbackMethod(this.ondrilldown,this,'ondrilldown');
}

self._DeepSee_Component_drillIndicator_drillUpHandler = function() {
zenInvokeCallbackMethod(this.ondrillup,this,'ondrillup');
}

self._DeepSee_Component_drillIndicator_renderContents = function() {
try {
var encDiv = this.getEnclosingDiv();
if (encDiv == null) return;
var html = [];
var msgUp = $$$Text('Drill up one level','%DeepSee');
var msgDown = $$$Text('Drill down into the selected item','%DeepSee');
html[html.length] = '<div style="white-space:nowrap;" nowrap="1">';
var pivot = null;
if (this.pivotId) {
pivot = zen(this.pivotId);
}
if (pivot) {
var level = pivot.getDrillLevel();
if (pivot.getDrillLevel()>0) {
if (pivot.isDrillThrough) {
html[html.length] = '<image src="deepsee/ds2_arrow_north_44.png" style="opacity:0.5;"/>';
}
else {
html[html.length] = '<image title="'+msgUp+'" src="deepsee/ds2_arrow_north_44.png" onclick="zenPage.getComponent('+this.index+').drillUpHandler();"/>';
}
var start = (level>1) ? level-1 : 0;
if (start>0) {
html[html.length] = '...';
}
var drillText
for (var n = start; n < level; n++) {
drillText = pivot.drillLevels[n].text
if ( (drillText.indexOf('<') > -1) && (drillText.indexOf('>') > -1) ) {
drillText = drillText.replace('<', "&lt;");
drillText = drillText.replace('>', "&gt;");
}
html[html.length] = (n>start?'|':'')+drillText;
}
}
if ((!pivot.selectedRange)||(pivot.isDrillThrough)) {
html[html.length] = '<image src="deepsee/ds2_arrow_south_44.png" style="opacity:0.5;"/>';
}
else {
html[html.length] = '<image title="'+msgDown+'" src="deepsee/ds2_arrow_south_44.png" onclick="zenPage.getComponent('+this.index+').drillDownHandler();"/>';
}
}
html[html.length] = '</div>';
encDiv.innerHTML = html.join('');
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in renderContents.');
}
}

self._DeepSee_Component_drillIndicator_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._DeepSee_Component_drillIndicator__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_DeepSee_Component_drillIndicator.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _DeepSee_Component_drillIndicator.prototype;
	if (null==p) {return;}
	p.constructor = _DeepSee_Component_drillIndicator;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%DeepSee.Component.drillIndicator';
	p._type = 'drillIndicator';
	p.serialize = _DeepSee_Component_drillIndicator_serialize;
	p.getSettings = _DeepSee_Component_drillIndicator_getSettings;
	p.ReallyRefreshContents = _DeepSee_Component_drillIndicator_ReallyRefreshContents;
	p.drillDownHandler = _DeepSee_Component_drillIndicator_drillDownHandler;
	p.drillUpHandler = _DeepSee_Component_drillIndicator_drillUpHandler;
	p.renderContents = _DeepSee_Component_drillIndicator_renderContents;
}

self._zenClassIdx['http://www.intersystems.com/deepsee/mapView'] = '_DeepSee_Component_mapView';
self._DeepSee_Component_mapView = function(index,id) {
	if (index>=0) {_DeepSee_Component_mapView__init(this,index,id);}
}

self._DeepSee_Component_mapView__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.controller = '';
	o.controllerId = '';
	o.infoProperties = new Array();
	o.isListing = false;
	o.latitude = '42.36';
	o.latitudeProperty = 'Latitude';
	o.longitude = '288.92';
	o.longitudeProperty = 'Longitude';
	o.mapType = 'ROADMAP';
	o.markersDraggable = false;
	o.onclickmarker = '';
	o.ongetcontroller = '';
	o.onnotifyView = '';
	o.zoom = '12';
}
function _DeepSee_Component_mapView_serialize(set,s)
{
	var o = this;s[0]='2740555083';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.containerStyle;s[9]=o.controller;s[10]=o.controllerId;s[11]=(o.dragEnabled?1:0);s[12]=(o.dropEnabled?1:0);s[13]=(o.dynamic?1:0);s[14]=o.enclosingClass;s[15]=o.enclosingStyle;s[16]=o.error;s[17]=o.height;s[18]=(o.hidden?1:0);s[19]=o.hint;s[20]=o.hintClass;s[21]=o.hintStyle;s[22]=set.serializeList(o,o.infoProperties,true,'infoProperties');s[23]=(o.isListing?1:0);s[24]=o.label;s[25]=o.labelClass;s[26]=o.labelDisabledClass;s[27]=o.labelStyle;s[28]=o.latitude;s[29]=o.latitudeProperty;s[30]=o.longitude;s[31]=o.longitudeProperty;s[32]=o.mapType;s[33]=(o.markersDraggable?1:0);s[34]=o.onafterdrag;s[35]=o.onbeforedrag;s[36]=o.onclickmarker;s[37]=o.ondrag;s[38]=o.ondrop;s[39]=o.ongetcontroller;s[40]=o.onhide;s[41]=o.onnotifyView;s[42]=o.onrefresh;s[43]=o.onshow;s[44]=o.onupdate;s[45]=o.overlayMode;s[46]=o.renderFlag;s[47]=(o.showLabel?1:0);s[48]=o.slice;s[49]=o.title;s[50]=o.tuple;s[51]=o.valign;s[52]=(o.visible?1:0);s[53]=o.width;s[54]=o.zoom;
}
function _DeepSee_Component_mapView_getSettings(s)
{
	s['name'] = 'string';
	s['controllerId'] = 'id';
	s['isListing'] = 'boolean';
	s['latitude'] = 'float';
	s['latitudeProperty'] = 'string';
	s['longitude'] = 'float';
	s['longitudeProperty'] = 'string';
	s['mapType'] = 'enum:ROADMAP,SATELLITE,HYBRID,TERRAIN';
	s['markersDraggable'] = 'boolean';
	s['onclickmarker'] = 'eventHandler';
	s['ongetcontroller'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	s['zoom'] = 'integer';
	this.invokeSuper('getSettings',arguments);
}

self._DeepSee_Component_mapView_acquireData = function() {
var controller = this.getController();
if (null == controller) {
this.connectToController();
controller = this.getController();
}
this._markerData = [];
if (controller && !this.isListing) {
var dims = controller.getDimensions();
if ((this.latitudeProperty == '')||(this.longitudeProperty == '')) {
return;
}
var invert = controller.getSelectedRange;
if (!invert) {
var seriesSize = controller.getDimSize(1);
var seriesCount = controller.getDimSize(2);
var labelDim = 2;
var latCol = -1;
var longCol = -1;
for (var p = 0; p < seriesSize; p++) {
var pname = controller.getPropertyName(p);
if (pname == this.latitudeProperty) {
latCol = p;
}
if (pname == this.longitudeProperty) {
longCol = p;
}
}
}
else {
var seriesSize = controller.getDimSize(2);
var seriesCount = controller.getDimSize(1);
var labelDim = 1;
}
for (var n = 0; n < seriesCount; n++) {
var sname = controller.getLabel(n,labelDim);
if (!invert) {
if (latCol<0 || longCol<0) {
break;
}
var lat = controller.getData(latCol,n);
var long = controller.getData(longCol,n);
}
else {
var lat = controller.getDataByName(this.latitudeProperty,n);
var long = controller.getDataByName(this.longitudeProperty,n);
}
if (!isNaN(parseFloat(lat)) && !isNaN(parseFloat(long))) {
this._markerData[this._markerData.length] = {
index: n,
title: sname,
latitude: lat,
longitude: long
};
}
}
}
}

self._DeepSee_Component_mapView_addMarker = function(id,latitude,longitude,title) {
var marker = null;
var map = this.getMapObject();
if (map && !isNaN(parseFloat(latitude)) && !isNaN(parseFloat(longitude))) {
var mapLatlng = new google.maps.LatLng(parseFloat(latitude), parseFloat(longitude));
marker = new google.maps.Marker({
position: mapLatlng,
map: map,
draggable: this.markersDraggable,
title:title.toString()});
var index = this._markers.length;
this._markers[index] = marker;
marker._id = id;
marker._index = index;
if (this.markersDraggable) {
var code = new Function('zenPage.getComponent('+this.index+').markerDragEndHandler("'+index+'");');
google.maps.event.addListener(marker, 'dragend', code);
}
var code = new Function('zenPage.getComponent('+this.index+').markerClickHandler("'+index+'");');
google.maps.event.addListener(marker, 'click', code);
}
return marker;
}

self._DeepSee_Component_mapView_adjustContentSize = function(load,width,height) {
var mapDiv = this.getEnclosingDiv();
width = width > 10 ? width : 0;
mapDiv.style.width = width-10 + 'px';
mapDiv.style.height = height + 'px';
var map = this.getMapObject();
if (map) {
var center = map.getCenter();
google.maps.event.trigger(map,'resize');
map.setCenter(center);
}
}

self._DeepSee_Component_mapView_adjustMapBounds = function() {
var map = this.getMapObject();
if (map) {
if (this._markers && this._markers.length) {
var latlngbounds = new google.maps.LatLngBounds();
for (var n = 0; n < this._markers.length; n++) {
var marker = this._markers[n];
if (marker) {
latlngbounds.extend(marker.getPosition());
}
}
map.setCenter(latlngbounds.getCenter());
map.fitBounds(latlngbounds);
}
}
}

self._DeepSee_Component_mapView_clearMarkers = function() {
try {
if (this._markers) {
for (var n = 0; n < this._markers.length; n++) {
this.removeMarker(this._markers[n]);
}
}
this._markers = [];
}
catch(ex) {
alert('Error in mapView.clearMarkers ' + ex.message);
}
}

self._DeepSee_Component_mapView_connectToController = function() {
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

self._DeepSee_Component_mapView_createInfoWindow = function(marker,content) {
var map = this.getMapObject();
if (map && marker) {
if (this._currInfoWindow) {
this._currInfoWindow.close();
delete this._currInfoWindow;
}
var infoWindow = new google.maps.InfoWindow({content: content});
infoWindow.open(map,marker);
this._currInfoWindow = infoWindow;
}
}

self._DeepSee_Component_mapView_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._DeepSee_Component_mapView_dragendHandler = function() {
var map = this.getMapObject();
if (map) {
var latLng = map.getCenter();
this.latitude = latLng.lat();
this.longitude = latLng.lng();
}
}

self._DeepSee_Component_mapView_geocodeAddressHandler = function(results,status) {
if (status == google.maps.GeocoderStatus.OK) {
var map = this.getMapObject();
if (map) {
map.setCenter(results[0].geometry.location);
}
}
else {
alert("Address not found: " + status);
}
}

self._DeepSee_Component_mapView_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._DeepSee_Component_mapView_getDataSet = function() {
var controller = this.getController();
return (controller ? controller : this.dataSet);
}

self._DeepSee_Component_mapView_getInfoPropContent = function(index) {
var html = [];
var msg = '';
var controller = this.getController();
if (null == controller) {
msg = $$$Text('Not connected');
}
else if (controller.modelError) {
msg = controller.modelError;
}
if (msg!='') {
html[html.length] = 'Error:<br/>' + msg;
return html.join('');
}
html[html.length] = '<table cellpadding="0" border="0" cellspacing="0" style="font-family:arial;font-size:12px;color:#404040;">';
for (var n = 0; n < this.infoProperties.length; n++) {
var info = this.infoProperties[n];
var label = info.label;
var value = info.dataValue ? controller.getDataByName(info.dataValue, index) : '';
if ( (!isNaN(value)) && (!isNaN(parseFloat(value))) ) { // JSL4416 add test for value being non-numeric
var format = (''===info.format) ? '#,#' : info.format;
var value = zenFormatNumber(value,format);
}
var style = info.style ? info.style : '';
var align = info.align ? info.align : 'right';
html[html.length] = '<tr>';
html[html.length] = '<th style="text-align: '+align+';padding:2px;">';
html[html.length] = zenEscapeXML(label);
html[html.length] = '</th>';
html[html.length] = '<td style="text-align: right;padding:2px;'+style+'">';
html[html.length] = zenEscapeXML(value);
html[html.length] = '</td>';
html[html.length] = '</tr>';
}
html[html.length] = '</table>';
return html.join('');
}

self._DeepSee_Component_mapView_getMapObject = function() {
return this._mapObject;
}

self._DeepSee_Component_mapView_getMapTypeId = function(type) {
if (('undefined' == typeof google)||('undefined' == typeof google.maps)) {
return '';
}
var mapType = google.maps.MapTypeId.ROADMAP;
switch (type) {
case 'HYBRID':
mapType = google.maps.MapTypeId.HYBRID;
break;
case 'SATELLITE':
mapType = google.maps.MapTypeId.SATELLITE;
break;
case 'TERRAIN':
mapType = google.maps.MapTypeId.TERRAIN;
break;
case 'ROADMAP':
default:
break;
}
return mapType;
}

self._DeepSee_Component_mapView_getMarker = function(index) {
return this._markers ? this._markers[index] : null;
}

self._DeepSee_Component_mapView_initMap = function(mapDiv) {
if (('undefined' == typeof google)||('undefined' == typeof google.maps)) {
mapDiv.innerHTML = $$$Text('Unable to load google map api.');
return;
}
var mapTypeId = this.getMapTypeId(this.mapType);
var mapLatlng = new google.maps.LatLng(parseFloat(this.latitude), parseFloat(this.longitude));
var mapOptions = {
zoom: parseInt(this.zoom,10),
center: mapLatlng,
mapTypeId: mapTypeId
}
var map = new google.maps.Map(mapDiv, mapOptions);
this._mapObject = map;
this._markers = [];
var code = new Function('zenPage.getComponent('+this.index+').zoomChangedHandler();');
google.maps.event.addListener(map, 'zoom_changed', code);
var code = new Function('zenPage.getComponent('+this.index+').dragendHandler();');
google.maps.event.addListener(map, 'dragend', code);
}

self._DeepSee_Component_mapView_markerClickHandler = function(index) {
var map = this.getMapObject();
if (map) {
var marker = this.getMarker(index);
if (marker) {
if (this.onclickmarker!='') {
zenInvokeCallbackMethod(this.onclickmarker,this,'onclickmarker','marker',marker);
}
else if (this.infoProperties.length > 0) {
var content = this.getInfoPropContent(marker._id);
if (content) {
this.createInfoWindow(marker,content);
}
}
}
}
}

self._DeepSee_Component_mapView_markerDragEndHandler = function(index) {
var map = this.getMapObject();
if (map) {
var marker = this.getMarker(index);
if (marker) {
this.createInfoWindow(marker,'Marker moved to:<br/>' + marker.getPosition());
}
}
}

self._DeepSee_Component_mapView_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._DeepSee_Component_mapView_notifyViewHandler = function(reason,data1,data2,data3) {
switch(reason) {
case 'dataChange':
case 'modelChange':
var controller = this.getController();
if (controller.listingType && controller.listingType == 'map') {
this.showGeoMarkers();
return;
}
this.acquireData();
this.syncMarkers();
break;
case 'seriesChange':
break;
}
}

self._DeepSee_Component_mapView_panToAddress = function(address) {
if (('undefined' == typeof google)||('undefined' == typeof google.maps)) {
return '';
}
var callback = new Function('results','status','zenPage.getComponent('+this.index+').geocodeAddressHandler(results,status)');
var geocoder = new google.maps.Geocoder();
geocoder.geocode({ 'address': address}, callback);
}

self._DeepSee_Component_mapView_removeMarker = function(marker) {
try {
marker.setMap(null);
}
catch(ex) {
}
}

self._DeepSee_Component_mapView_renderContents = function() {
this._mapObject = null;
var mapDiv = this.getEnclosingDiv();
if (mapDiv == null) return;
var width = isNaN(parseFloat(this.width)) ? 200 : parseFloat(this.width);
var height = isNaN(parseFloat(this.height)) ? 200 : parseFloat(this.height);
if ('' == this.enclosingStyle) {
mapDiv.style.width = width + 'px';
mapDiv.style.height = height + 'px';
}
this.acquireData();
this.initMap(mapDiv);
this.syncMarkers();
}

self._DeepSee_Component_mapView_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._DeepSee_Component_mapView_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._DeepSee_Component_mapView_setProperty = function(property,value,value2) {
var map = this.getMapObject();
switch(property) {
case 'latitude':
case 'longitude':
this[property] = value;
if (map) {
var mapLatlng = new google.maps.LatLng(parseFloat(this.latitude), parseFloat(this.longitude));
map.panTo(mapLatlng);
}
break;
case 'zoom':
this[property] = value;
if (map) {
map.setZoom(parseInt(this.zoom,10));
}
break;
case 'markersDraggable':
this[property] = value ? true : false;
this.syncMarkers();
break;
case 'mapType':
this[property] = value;
if (map) {
var mapTypeId = this.getMapTypeId(this.mapType);
map.setMapTypeId(mapTypeId);
}
break;
case 'onclickmarker':
this[property] = value;
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._DeepSee_Component_mapView_showGeoMarkers = function() {
var maxPoints = 10000;
var numPoints = 0;
this.clearMarkers();
var controller = this.getController();
var data = controller.getContent();
if (data && data.listingRows) {
var points = {};
for (n = 0; n < data.listingRows.length; n++) {
var row = data.listingRows[n];
if ('undefined' != typeof row.Latitude && 'undefined' != typeof row.Longitude) {
if (!isNaN(parseFloat(row.Latitude))&&!isNaN(parseFloat(row.Longitude))) {
var addr = row.Latitude+','+row.Longitude;
if (points[addr]) {
points[addr][points[addr].length] = n;
}
else {
points[addr] = [n];
}
}
}
}
for (var addr in points) {
var count = points[addr].length;
var n = points[addr][0];
var row = data.listingRows[n];
this.addMarker(n,parseFloat(row.Latitude),parseFloat(row.Longitude),$$$FormatText($$$Text('%1 item(s)'),count));
numPoints++;
if (numPoints>maxPoints) {
break;
}
}
}
this.adjustMapBounds();
}

self._DeepSee_Component_mapView_syncMarkers = function() {
var controller = this.getController();
if (null == controller) {
return;
}
this.clearMarkers();
if (this._markerData) {
for (var n = 0; n < this._markerData.length; n++) {
var md = this._markerData[n];
if (md) {
this.addMarker(md.index,md.latitude,md.longitude,md.title);
}
}
}
this.adjustMapBounds();
}

self._DeepSee_Component_mapView_zoomChangedHandler = function() {
var map = this.getMapObject();
if (map) {
this.zoom = map.getZoom();
}
}

self._DeepSee_Component_mapView_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._DeepSee_Component_mapView__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_DeepSee_Component_mapView.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _DeepSee_Component_mapView.prototype;
	if (null==p) {return;}
	p.constructor = _DeepSee_Component_mapView;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%DeepSee.Component.mapView';
	p._type = 'mapView';
	p.serialize = _DeepSee_Component_mapView_serialize;
	p.getSettings = _DeepSee_Component_mapView_getSettings;
	p.ReallyRefreshContents = _DeepSee_Component_mapView_ReallyRefreshContents;
	p.acquireData = _DeepSee_Component_mapView_acquireData;
	p.addMarker = _DeepSee_Component_mapView_addMarker;
	p.adjustContentSize = _DeepSee_Component_mapView_adjustContentSize;
	p.adjustMapBounds = _DeepSee_Component_mapView_adjustMapBounds;
	p.clearMarkers = _DeepSee_Component_mapView_clearMarkers;
	p.connectToController = _DeepSee_Component_mapView_connectToController;
	p.createInfoWindow = _DeepSee_Component_mapView_createInfoWindow;
	p.disconnectFromController = _DeepSee_Component_mapView_disconnectFromController;
	p.dragendHandler = _DeepSee_Component_mapView_dragendHandler;
	p.geocodeAddressHandler = _DeepSee_Component_mapView_geocodeAddressHandler;
	p.getController = _DeepSee_Component_mapView_getController;
	p.getDataSet = _DeepSee_Component_mapView_getDataSet;
	p.getInfoPropContent = _DeepSee_Component_mapView_getInfoPropContent;
	p.getMapObject = _DeepSee_Component_mapView_getMapObject;
	p.getMapTypeId = _DeepSee_Component_mapView_getMapTypeId;
	p.getMarker = _DeepSee_Component_mapView_getMarker;
	p.initMap = _DeepSee_Component_mapView_initMap;
	p.markerClickHandler = _DeepSee_Component_mapView_markerClickHandler;
	p.markerDragEndHandler = _DeepSee_Component_mapView_markerDragEndHandler;
	p.notifyView = _DeepSee_Component_mapView_notifyView;
	p.notifyViewHandler = _DeepSee_Component_mapView_notifyViewHandler;
	p.panToAddress = _DeepSee_Component_mapView_panToAddress;
	p.removeMarker = _DeepSee_Component_mapView_removeMarker;
	p.renderContents = _DeepSee_Component_mapView_renderContents;
	p.sendEventToController = _DeepSee_Component_mapView_sendEventToController;
	p.setControllerId = _DeepSee_Component_mapView_setControllerId;
	p.setProperty = _DeepSee_Component_mapView_setProperty;
	p.showGeoMarkers = _DeepSee_Component_mapView_showGeoMarkers;
	p.syncMarkers = _DeepSee_Component_mapView_syncMarkers;
	p.zoomChangedHandler = _DeepSee_Component_mapView_zoomChangedHandler;
}

self._zenClassIdx['http://www.intersystems.com/deepsee/pivotController'] = '_DeepSee_Component_pivotController';
self._DeepSee_Component_pivotController = function(index,id) {
	if (index>=0) {_DeepSee_Component_pivotController__init(this,index,id);}
}

self._DeepSee_Component_pivotController__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.miniAnalyzer = false;
	o.pivotTableId = '';
	o.rowsHeight = '75px';
	o.selectedColumn = '';
	o.selectedItem = '';
}
function _DeepSee_Component_pivotController_serialize(set,s)
{
	var o = this;s[0]='3005637731';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.containerStyle;s[9]=(o.dragEnabled?1:0);s[10]=(o.dropEnabled?1:0);s[11]=(o.dynamic?1:0);s[12]=o.enclosingClass;s[13]=o.enclosingStyle;s[14]=o.error;s[15]=o.height;s[16]=(o.hidden?1:0);s[17]=o.hint;s[18]=o.hintClass;s[19]=o.hintStyle;s[20]=o.label;s[21]=o.labelClass;s[22]=o.labelDisabledClass;s[23]=o.labelStyle;s[24]=(o.miniAnalyzer?1:0);s[25]=o.onafterdrag;s[26]=o.onbeforedrag;s[27]=o.ondrag;s[28]=o.ondrop;s[29]=o.onhide;s[30]=o.onrefresh;s[31]=o.onshow;s[32]=o.onupdate;s[33]=o.overlayMode;s[34]=o.pivotTableId;s[35]=o.renderFlag;s[36]=o.rowsHeight;s[37]=o.selectedColumn;s[38]=o.selectedItem;s[39]=(o.showLabel?1:0);s[40]=o.slice;s[41]=o.title;s[42]=o.tuple;s[43]=o.valign;s[44]=(o.visible?1:0);s[45]=o.width;
}
function _DeepSee_Component_pivotController_getSettings(s)
{
	s['name'] = 'string';
	s['miniAnalyzer'] = 'boolean';
	s['pivotTableId'] = 'id';
	s['rowsHeight'] = 'string';
	s['selectedColumn'] = 'string';
	s['selectedItem'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._DeepSee_Component_pivotController_addBlankLevel = function(which) {
if (!this.pivotTable) return;
var pivot = this.pivotTable;
var listingFields = false;
var treeItem = null;
if (zenPage.getSelectedTreeValue) {
treeItem = zenPage.getSelectedTreeValue();
if (treeItem && (treeItem.value=='' || (treeItem.value=='%FILTER' && which!='filters'))) {
treeItem = null;
}
}
var array = null;
var value = treeItem ? treeItem.value : '';
var isPivotVariable = false;
var varName = '';
isPivotVariable = (value.toString().toLowerCase().substr(0,10)=='$variable.');
if (isPivotVariable) {
var dimName = '';
varName = value.substr(11);
}
else {
var s = value.toString().split('.');
var dimName = s[0] ? s[0].toUpperCase() : '';
}
switch(which) {
case 'fields':
array = pivot.listingFields;
listingFields = true;
break;
case 'rows':
array = pivot.rowLevels;
break;
case 'cols':
array = pivot.columnLevels;
break;
case 'msrs':
if (treeItem) {
array = pivot.measures;
}
break;
case 'filters':
var fmsg = this.isValidFilter(dimName,value);
if (fmsg) {
alert(fmsg);
return;
}
if (treeItem) {
array = pivot.filters;
}
break;
}
var isField = (value.toString().substr(0,9)=='$$$FIELD:');
if (isField) {
if (!listingFields) {
return;
}
pivot.listing = '$$$CUSTOM';
}
else if (!isField && listingFields) {
return;
}
if (null!=array) {
if (!listingFields) {
pivot.pushState();
}
var drillLevel = pivot.getDrillLevel();
var parm = zenPage.createComponentNS('http://www.intersystems.com/deepsee','pivotLevel');
parm.drillLevel = drillLevel;
if (isField) {
var t = value.toString().split(':');
t.splice(0,1);							// Remove the $$$FIELD token
var fieldExpr = t.splice(0,1)[0];		// DTB309 - The field expression cannot contain the ':' character, so it will now be the first piece
value = '$$$FIELD:'+t.join(':');		// DTB309 - Remaining is the name, which may contain ':'. Replace the $$$FIELD token in front
pivot.listing = '$$$CUSTOM';
parm.spec = fieldExpr;					// Field expression for building the custom SQL query
parm.value = value;						// DTB309 - Logical value. Store for lookup in other locales
parm.text = treeItem.text;				// Current display value
} else if (treeItem) {
parm.spec = value;
parm.text = treeItem.text;
if (treeItem.value == '%FILTER') {
parm.advanced = true;
}
}
else {
parm.spec = '';
parm.text = '';
parm.levelType = 'space';
}
array[array.length] = parm;
if (isPivotVariable && parm) {
parm.levelType = 'mdx';
parm.value = value;
}
if ('filters' == which) {
if (zenPage.UpdateFilterControls) {
var msg = zenPage.UpdateFilterControls(pivot.cubeName,zen('filterGroup'),pivot);
if (''!==msg) {
alert(msg);
}
}
}
if (!listingFields || pivot.isDrillThrough) {
pivot.executeQuery(pivot.autoExecute);
}
else {
this.updateState('fields');
}
}
}

self._DeepSee_Component_pivotController_addChildToElement = function(which,key) {
if (!this.pivotTable) return;
var pivot = this.pivotTable;
var treeItem = null;
if (zenPage.getSelectedTreeValue) {
treeItem = zenPage.getSelectedTreeValue();
if (treeItem && (treeItem.value=='' || (treeItem.value=='%FILTER' && which!='filters'))) {
treeItem = null;
}
}
if (!treeItem) {
return;
}
var idx = key.toString().split('_');
var array = null;
switch(which) {
case 'rows':
array = pivot.rowLevels;
break;
case 'cols':
array = pivot.columnLevels;
break;
default:
break;
}
if (null!=array) {
var target = null;
for (var n = 0; n < idx.length; n++) {
target = array[idx[n]];
if (null == target) break;
if (null != idx[n+1]) {
array = array[idx[n]].childLevels;
}
}
if (target) {
pivot.pushState();
var drillLevel = pivot.getDrillLevel();
var parm = zenPage.createComponentNS('http://www.intersystems.com/deepsee','pivotLevel');
parm.drillLevel = drillLevel;
parm.spec = treeItem.value;
parm.text = treeItem.text;
target.childLevels[target.childLevels.length] = parm;
pivot.executeQuery(pivot.autoExecute);
}
}
}

self._DeepSee_Component_pivotController_addLevel = function(which) {
}

self._DeepSee_Component_pivotController_buildIconList = function() {
if (true) {
this._iconList = {
iconJoin16:'deepsee/ds2_arrow_southeast_44.png',
iconUp16:'deepsee/ds2_arrow_north_44.png',
iconDown16:'deepsee/ds2_arrow_south_44.png',
iconAdd16:'deepsee/ds2_plus_44.png',
iconColumn16:'deepsee/ds2_gear_44.png',
iconColumn16on:'deepsee/ds2_gear2_44.png',
iconClose16:'deepsee/ds2_x_44.png',
iconHome24:'deepsee/ds2_house_44.png',
iconBack24:'deepsee/ds2_arrow_west_44.png',
iconForward24:'deepsee/ds2_arrow_east_44.png',
iconRefresh24:'deepsee/ds2_refresh_44.png',
iconRefresh24on:'deepsee/ds2_redo_44.png',
iconCopy24:'deepsee/ds2_upload_44.png',
iconPaste24:'deepsee/ds2_download_44.png',
iconPasteDown24:'deepsee/ds2_arrow_southeast_44.png',
iconSwap24:'deepsee/ds2_circle_bothways_44.png',
iconListing24On:'deepsee/ds2_list_44.png',
iconListing24:'deepsee/ds2_binoculars_44.png',
iconAnalysis24:'deepsee/ds2_stats_44.png',
iconScript24:'deepsee/ds2_sketchbook_44.png',
iconScript24on:'deepsee/ds2_compose_44.png',
iconExcel24:'deepsee/ds2_action_44.png',
iconPrinter24:'deepsee/ds2_printer_44.png',
iconCSV24:'deepsee/open_widget.png',		// DP-402897
iconPivotOptions24:'deepsee/ds2_wrench2_44.png',
iconPrintConfig24:'deepsee/ds2_ruler_44.png',
iconChartOptions24:'deepsee/ds2_linechart_44.png',
iconFormat24:'deepsee/ds2_sun_44.png',
iconFormat24on:'deepsee/ds2_sun_44.png',
iconCancel24:'deepsee/ds2_circle_x_44.png',
iconAutoExec24on:'deepsee/ds2_todo_44.png',
iconAutoExec24:'deepsee/ds2_todo_44.png'
}
}
else {
this._iconList = {
iconJoin16:'deepsee/ds_join_16.gif',
iconUp16:'deepsee/up_16.png',
iconDown16:'deepsee/up_16.png',
iconAdd16:'deepsee/add_16.png',
iconColumn16:'deepsee/column_16.gif',
iconColumn16on:'deepsee/column_fav_16.gif',
iconClose16:'deepsee/close_a_16.gif',
iconHome24:'deepsee/home_24.png',
iconBack24:'deepsee/ds_back_24.gif',
iconForward24:'deepsee/ds_forward_24.gif',
iconRefresh24:'deepsee/loop_24.gif',
iconRefresh24on:'deepsee/loop_fav_24.gif',
iconCopy24:'portal/copy_24.gif',
iconPaste24:'portal/paste_24.gif',
iconPasteDown24:'portal/paste_down_24.gif',
iconSwap24:'deepsee/swap_24.gif',
iconListing24On:'deepsee/table_header_24.gif',
iconListing24:'deepsee/views_24.gif',
iconAnalysis24:'deepsee/show_wireframe_zoom_24.gif',
iconScript24:'deepsee/script_24.png',
iconScript24on:'deepsee/script_fav_24.gif',
iconExcel24:'deepsee/excel_24.gif',
iconPrinter24:'deepsee/printer_24.png',
iconPivotOptions24:'deepsee/gear_24.png',
iconPrintConfig24:'deepsee/printer_config_24.gif',
iconChartOptions24:'deepsee/line_chart_24.png',
iconFormat24:'deepsee/vcq_24.gif',
iconFormat24on:'deepsee/vcq_fav_24.gif',
iconCancel24:'deepsee/cancel_24.png',
iconAutoExec24on:'deepsee/window_refresh_24.gif',
iconAutoExec24:'deepsee/window_lock_24.gif'
}
}
}

self._DeepSee_Component_pivotController_clearLevels = function(which) {
if (!this.pivotTable) return;
var pivot = this.pivotTable;
var filterChanged = false;
var listingFields = false;
var array = null;
var options = null;
switch(which) {
case 'rows':
array = 'rowLevels';
options = pivot.rowAxisOptions;
break;
case 'cols':
array = 'columnLevels';
options = pivot.columnAxisOptions;
break;
case 'msrs':
array = 'measures';
break;
case 'fields':
array = 'listingFields';
listingFields = true;
break;
case 'filters':
array = 'filters';
filterChanged = true;
break;
}
if ((null!=options && (options.headEnabled || options.orderEnabled || options.filterEnabled))
|| ((null!=array) && pivot[array] && pivot[array].length > 0)) {
if (which == this.selectedColumn) {
this.selectedItem = '';
this.selectedColumn = '';
}
if (!listingFields) {
pivot.pushState();
}
if (null!=options) {
options.headEnabled = false;
options.orderEnabled = false;
options.filterEnabled = false;
options.aggEnabled = false;
}
if ((null!=array) && pivot[array] && pivot[array].length > 0) {
pivot[array] = new Array();
}
if (!listingFields && pivot.isDrillThrough) {
pivot.mdx = '';
pivot.isDrillThrough = false;
}
if (!listingFields || pivot.isDrillThrough) {
pivot.executeQuery(pivot.autoExecute);
}
else {
this.updateState('fields');
}
}
if (filterChanged) {
if (zenPage.UpdateFilterControls) {
var msg = zenPage.UpdateFilterControls(pivot.cubeName,zen('filterGroup'),pivot);
if (''!==msg) {
alert(msg);
}
}
}
}

self._DeepSee_Component_pivotController_copyItem = function() {
if (this.selectedColumn=='') return;
var pivot = this.getPivotTable();
var array = null;
switch(this.selectedColumn) {
case 'fields':
array = pivot.listingFields;
break;
case 'rows':
array = pivot.rowLevels;
break;
case 'cols':
array = pivot.columnLevels;
break;
case 'msrs':
array = pivot.measures;
break;
case 'filters':
array = pivot.filters;
break;
}
if (array && this.selectedItem !== '') {
var key = this.selectedItem;
var idx = key.toString().split('_');
for (var n = 0; n < (idx.length - 1); n++) {
if (null != idx[n+1]) {
array = array[idx[n]].childLevels;
}
}
var no = parseInt(idx[idx.length-1]);
if (array[no]) {
this._clipboard = array[no].clone();
this.updateState(this.selectedColumn);
}
}
}

self._DeepSee_Component_pivotController_drillThrough = function() {
var pivot = this.getPivotTable();
pivot.drillThrough();
this.updateToolbar();
}

self._DeepSee_Component_pivotController_dropStartHandler = function(dragData) {
var value = dragData.value;
var text = dragData.text;
var pivot = this.pivotTable;
var noExec = false;
if (!pivot) return;
var drillLevel = pivot.getDrillLevel();
if (value.indexOf('%SHARED')>-1) {
var valueArray = value.toString().split('.');
for (n in valueArray) {
if (valueArray[n].indexOf('%SHARED')>-1) {
valueArray.splice(n,1);
}
}
value = valueArray.join('.');
}
if (value.toString().substr(0,2)=='@@') {
return;
}
var isField = (value.toString().substr(0,9)=='$$$FIELD:');
if (value.toString().substr(0,11)=='$$$LISTING:') {
return;
}
var isPivotVariable = false;
var varName = '';
if (!isField) {
isPivotVariable = (value.toString().toLowerCase().substr(0,10)=='$variable.');
if (isPivotVariable) {
varName = value.substr(11);
}
}
if (dragData._targetType) {
tgtType = dragData._targetType;
}
else {
var el = ZLM.getDragInnerDestination();
var tgtId = el.id;
while ('' == tgtId) {
el = el.parentNode;
tgtId = el.id;
if (!el.parentNode) {
break;
}
}
var tgtIndex = -1;
var tgtType = '';
var parentIndex = -1;
var idx;
if (tgtId) {
idx = tgtId.split('_');
tgtIndex = isNaN(idx[1]) ? -1 : idx[1];
tgtType = idx[0];
}
else if ('' == tgtId) {
return;
}
dragData.targetItem = tgtId;
}
if (isPivotVariable) {
var dimName = '';
}
else {
var s = value.toString().split('.');
var dimName = s[0] ? s[0].toUpperCase() : '';
}
var changed = false;
var filterChanged = false;
if (isPivotVariable) {
filterChanged = true;
}
if (isField) {
var t = value.toString().split(':');
t.splice(0,1);							// Remove the $$$FIELD token
var fieldExpr = t.splice(0,1)[0];		// DTB309 - The field expression cannot contain the ':' character, so it will now be the first piece
value = '$$$FIELD:'+t.join(':');		// DTB309 - Remaining is the name, which may contain ':'. Replace the $$$FIELD token in front
pivot.listing = '$$$CUSTOM';
if ((tgtType=='fields')||(tgtType=='fieldsappend')) {
if (('fields' == tgtType)&&tgtIndex >= 0 && pivot.listingFields[tgtIndex]) {
pivot.listingFields[tgtIndex].spec = fieldExpr;		// Field expression for building the custom SQL query
pivot.listingFields[tgtIndex].value = value;		// DTB309 - Logical value. Store for lookup in other locales
pivot.listingFields[tgtIndex].text = text;			// Current display value
}
else {
var msr = zenPage.createComponentNS('http://www.intersystems.com/deepsee','pivotLevel');
msr.spec = fieldExpr;		// Field expression for building the custom SQL query
msr.value = value;			// DTB309 - Logical value. Store for lookup in other locales
msr.text = text;			// Current display value
pivot.listingFields[pivot.listingFields.length] = msr;
}
if (pivot.controller) {
pivot.controller.updateState('fields');
}
if (pivot.isDrillThrough) {
pivot.executeQuery(pivot.autoExecute);
}
}
else {
alert($$$Text('Custom listing fields can only be added to listings'));
}
return;
}
switch(tgtType) {
case 'msrs':
case 'msrsappend':
if ((dimName == '[MEASURES]')||(dimName == 'MEASURES')||
(dimName == '[%QUALITYMEASURE]')||(dimName == '%QUALITYMEASURE')) {
pivot.pushState();
if (('msrs' == tgtType)&&tgtIndex >= 0 && pivot.measures[tgtIndex]) {
pivot.measures[tgtIndex].spec = value;
pivot.measures[tgtIndex].text = text;
pivot.measures[tgtIndex].drillLevel = drillLevel;
}
else {
var msr = zenPage.createComponentNS('http://www.intersystems.com/deepsee','pivotLevel');
msr.spec = value;
msr.text = text;
msr.drillLevel = drillLevel;
pivot.measures[pivot.measures.length] = msr;
}
changed = true;
}
else {
alert($$$Text("Only measures can be placed in the measures list"));
}
break;
case 'rows':
case 'rowschild':
case 'rowsappend':
case 'cols':
case 'colschild':
case 'colsappend':
if (value == '%FILTER') {
alert($$$Text("Named filters can only be placed in the filters list"));
}
else {
var parm = null;
pivot.pushState();
var array = (('rows'==tgtType)||('rowsappend'==tgtType)||('rowschild'==tgtType)) ? pivot.rowLevels : pivot.columnLevels;
var target = null;
for (var n = 1; n < idx.length; n++) {
target = array[idx[n]];
if (null == target) break;
if (null != idx[n+1]) {
array = array[idx[n]].childLevels;
}
}
if (target) {
if (('rowsappend'==tgtType)||('colsappend'==tgtType)) {
parm = zenPage.createComponentNS('http://www.intersystems.com/deepsee','pivotLevel');
parm.spec = value;
parm.text = text;
parm.drillLevel = drillLevel;
array[array.length] = parm;
}
else if (('rowschild'==tgtType)||('colschild'==tgtType)) {
parm = zenPage.createComponentNS('http://www.intersystems.com/deepsee','pivotLevel');
parm.spec = value;
parm.text = text;
parm.drillLevel = drillLevel;
target.childLevels[target.childLevels.length] = parm;
}
else {
target.spec = value;
target.text = text;
}
}
else {
parm = zenPage.createComponentNS('http://www.intersystems.com/deepsee','pivotLevel');
parm.spec = value;
parm.text = text;
parm.drillLevel = drillLevel;
array[array.length] = parm;
}
if (isPivotVariable && parm) {
parm.levelType = 'mdx';
parm.value = value;
}
changed = true;
}
break;
case 'filters':
case 'filtersappend':
var fmsg = this.isValidFilter(dimName,value);
if (fmsg) {
alert(fmsg);
return false;
}
if ((dimName != '[MEASURES]')&&(dimName != 'MEASURES')&&(dimName != '[%QUALITYMEASURE]')&&(dimName != '%QUALITYMEASURE')) {
var parm = null;
pivot.pushState();
if (value.toUpperCase().indexOf('.MEMBERS') != -1) {
noExec = true;
}
if (('filters' == tgtType)&&tgtIndex >= 0 && pivot.filters[tgtIndex]) {
parm = pivot.filters[tgtIndex];
parm.spec = value;
parm.text = text;
parm.value = '';
parm.key = '';
}
else {
var parm = zenPage.createComponentNS('http://www.intersystems.com/deepsee','pivotLevel');
parm.spec = value;
parm.text = text;
parm.drillLevel = drillLevel;
pivot.filters[pivot.filters.length] = parm;
}
if (value == '%FILTER') {
parm.advanced = true;
}
changed = true;
filterChanged = true;
if (isPivotVariable && parm) {
parm.levelType = 'mdx';
parm.value = value;
}
}
break;
default:
break;
}
if (filterChanged) {
if (zenPage.UpdateFilterControls) {
var msg = zenPage.UpdateFilterControls(pivot.cubeName,zen('filterGroup'),pivot);
if (''!==msg) {
alert(msg);
}
}
}
if (changed) {
if (pivot.isDrillThrough) {
pivot.mdx = '';
}
pivot.selectedRange = '';
pivot.sortColumn = 0;
pivot.sortDir = 'ASC';
if (!noExec) {
pivot.executeQuery(pivot.autoExecute);
}
else {
pivot.updateController();
}
}
return true;
}

self._DeepSee_Component_pivotController_enableItem = function(evt,which,item) {
evt = evt ? evt : window.event;
if (evt.preventDefault) {
evt.preventDefault();
}
var pivot = this.getPivotTable();
var array = null;
switch(which) {
case 'filters':
array = pivot.filters;
break;
}
if (array && array[item]) {
array[item].enabled = !array[item].enabled;
this.updateState(which);
pivot.executeQuery(pivot.autoExecute);
if (zenPage.UpdateFilterControls) {
var msg = zenPage.UpdateFilterControls(pivot.cubeName,zen('filterGroup'),pivot);
}
}
}

self._DeepSee_Component_pivotController_getColumnsHTML = function() {
var pivot = this.pivotTable;
var drillLevel = pivot?pivot.getDrillLevel():0;
var html = [];
var hlpCol = $$$Text('Specify items to display for the columns in the table');
var hlpAddCol = $$$Text('Add a column to the table');
var hlpClear = $$$Text('Clear this list');
var hlpAddBlank = $$$Text('Add the selected element in the member tree to this list');
var hlpColOptions = $$$Text('Set options for columns within the table');
var hlpMoveUp = $$$Text('Move current element up in this list');
var hlpMoveDown = $$$Text('Move current element down in this list');
var msgDropCol = $$$Text('Drop column here');
html[html.length] = '<table class="dsptcHeaderTable" title="'+hlpCol+'" cellspacing="0" id="cols_header">';
html[html.length] = '<tr><td>' + $$$Text('Columns') + '</td>';
html[html.length] = '<td align="right" width="90%" nowrap="1">';
var enb = this.itemCanMoveUp('cols',this.selectedItem);
html[html.length] = this.getIconHTML('colUp',enb,'iconUp16',hlpMoveUp,'zenPage.getComponent('+this.index+').moveItemUp(\'cols\');');
html[html.length] = '&#160;';
var enb = this.itemCanMoveDown('cols',this.selectedItem);
html[html.length] = this.getIconHTML('colDown',enb,'iconDown16',hlpMoveDown,'zenPage.getComponent('+this.index+').moveItemDown(\'cols\');');
html[html.length] = '&#160;';
html[html.length] = this.getIconHTML('colAdd',true,'iconAdd16',hlpAddBlank,'zenPage.getComponent('+this.index+').addBlankLevel(\'cols\');');
html[html.length] = '&#160;';
var img = (pivot.columnAxisOptions.suppress8020||pivot.columnAxisOptions.headEnabled||pivot.columnAxisOptions.orderEnabled||pivot.columnAxisOptions.filterEnabled||pivot.columnAxisOptions.aggEnabled) ? 'iconColumn16on' : 'iconColumn16';
html[html.length] = this.getIconHTML('colClear',true,img,hlpColOptions,'zenPage.getComponent('+this.index+').setAxisOptions(\'cols\');');
var enb = (this.pivotTable.columnLevels && this.pivotTable.columnLevels.length>0);
html[html.length] = '&#160;';
html[html.length] = this.getIconHTML('colClose',enb,'iconClose16',hlpClear,'zenPage.getComponent('+this.index+').clearLevels(\'cols\');');
html[html.length] = '</td>';
html[html.length] = '</tr></table>';
var cls = (this.selectedColumn=='cols'&&this.selectedItem=='') ? 'dsptcBodySelected' : 'dsptcBody';
html[html.length] = '<div class="'+cls+'" style="height:'+this.rowsHeight+'" id="cols_body">'; // WAL194
html[html.length] = this.getLevelHTML('cols',msgDropCol,this.pivotTable.columnLevels,'');
html[html.length] = '</div>';
return html.join('');
}

self._DeepSee_Component_pivotController_getDrillLevelHTML = function() {
var pivot = this.pivotTable;
var hlpRemove = $$$Text("Remove this drill level");
var html = [];
if (pivot.drillLevels.length > 0) {
html[html.length] = '<table><tr>';
html[html.length] = '<td class="dsptDrillCaption" nowrap="1">' + $$$Text('Drill down:') + '</td>';
for (var n = 0; n < pivot.drillLevels.length; n++) {
var cj = pivot.drillLevels[n].text.toString().split('/');
var t = cj[cj.length-1].split(':');
if (!t[1]) {
t[1] = '';
}
if ( (t[1].indexOf('<') > -1) && (t[1].indexOf('>') > -1) ) {
t[1] = t[1].replace('<', "&lt;");
t[1] = t[1].replace('>', "&gt;");
}
html[html.length] = '<td class="dsptDrillItem" nowrap="1" valign="middle">';
html[html.length] = '<table border="0" cellspacing="0"><tr>';
html[html.length] = '<td onclick="zenPage.getComponent('+this.index+').gotoDrillLevel('+n+');"><div class="dsptDrillDim">'+t[0]+'</div><div class="dsptDrillMbr">' + t[1] +'</div></td>';
html[html.length] = '<td>';
html[html.length] = this.getIconHTML('drill_'+n,true,'iconClose16',hlpRemove,'zenPage.getComponent('+this.index+').removeDrillLevel('+n+');');
html[html.length] = '</td>';
html[html.length] = '</tr></table>';
html[html.length] = '</td>';
}
html[html.length] = '</tr></table>';
}
return html.join('');
}

self._DeepSee_Component_pivotController_getDropdownIconHTML = function(id,enabled,imgId,help,options) {
var cls = enabled ? 'dsptIconDropdown' : 'dsptIconDisabled';
var imgUrl = this.getIcon(imgId);
var style = 'padding-right:4px;';
if (imgId.indexOf('24')>=0) {
style += 'height:22px;';
}
else if (imgId.indexOf('16')>=0) {
style += 'height:12px;';
}
if (imgId.indexOf('Swap')>=0) {
style += 'width:22px;';
}
var dropId = (id?this.makeId(id+'DropDown'):'');
var html = [];
html.push('<div id="'+(id?this.makeId(id):'')+'">');
html.push('<img style="'+style+'" class="'+cls+'" title="'+help+'" onclick="zenPage.toggleExportMenu(\''+dropId+'\');" src="'+imgUrl+'"/>');
html.push('<div id="'+dropId+'" class="dsptIconDropdownMenu" style="display:none;">');
for ( n=0; n<options.length; n++) {
var optionDef = '';
optionDef += '<a';
optionDef += (options[n].click) ? ' onclick="zenPage.toggleExportMenu(\''+dropId+'\');'+options[n].click+'"' : '';
optionDef += (options[n].hover) ? ' title="'+options[n].hover+'"' : '';
optionDef += '>';
optionDef += options[n].name
optionDef += '</a>';
html.push(optionDef);
}
html.push('</div>');		// Drop-down div
html.push('</div>');		// Overall div
return html;
}

self._DeepSee_Component_pivotController_getFieldsHTML = function() {
var pivot = this.pivotTable;
var drillLevel = pivot?pivot.getDrillLevel():0;
var html = [];
var hlpRow = $$$Text('Specify columns to display within a listing');
var hlpAddRow = $$$Text('Add a field to the listing');
var hlpClear = $$$Text('Clear this list');
var hlpAddBlank = $$$Text('Add the selected field in the member tree to this listing');
var hlpMoveUp = $$$Text('Move current element up in this list');
var hlpMoveDown = $$$Text('Move current element down in this list');
var msgDropRow = $$$Text('Drop custom listing field here');
html[html.length] = '<table class="dsptcHeaderTable" title="'+hlpRow+'" cellspacing="0" id="rows_header"><tr><td>' + $$$Text('Custom Listing Fields') + '</td>';
html[html.length] = '<td align="right" width="90%" nowrap="1">';
var enb = this.itemCanMoveUp('fields',this.selectedItem);
html[html.length] = this.getIconHTML('fieldUp',enb,'iconUp16',hlpMoveUp,'zenPage.getComponent('+this.index+').moveItemUp(\'fields\');');
html[html.length] = '&#160;';
var enb = this.itemCanMoveDown('fields',this.selectedItem);
html[html.length] = this.getIconHTML('fieldDown',enb,'iconDown16',hlpMoveDown,'zenPage.getComponent('+this.index+').moveItemDown(\'fields\');');
html[html.length] = '&#160;';
html[html.length] = this.getIconHTML('fieldAdd',true,'iconAdd16',hlpAddBlank,'zenPage.getComponent('+this.index+').addBlankLevel(\'fields\');');
html[html.length] = '&#160;';
var enb = (this.pivotTable.listingFields && this.pivotTable.listingFields.length > 0);
html[html.length] = this.getIconHTML('fieldClear',enb,'iconClose16',hlpClear,'zenPage.getComponent('+this.index+').clearLevels(\'fields\');');
html[html.length] = '</td>';
html[html.length] = '</tr></table>';
var cls = (this.selectedColumn=='fields'&&this.selectedItem=='') ? 'dsptcBodySelected' : 'dsptcBody';
var style = this.pivotTable.listing=='$$$CUSTOM' ? '' : 'background:#F0F0F0;';
html[html.length] = '<div class="'+cls+'" style="'+style+'" id="fields_body">';
html[html.length] = this.getLevelHTML('fields',msgDropRow,this.pivotTable.listingFields,0);
html[html.length] = '</div>';
return html.join('');
}

self._DeepSee_Component_pivotController_getFiltersHTML = function() {
var html = [];
var img = 'iconColumn16';
var hlpFilter = $$$Text('Specify what is used to filter the table');
var hlpAddFil = $$$Text('Add a filter to the table');
var hlpClear = $$$Text('Clear this list');
var hlpAddBlank = $$$Text('Add the selected element in the member tree to this list');
var hlpMoveUp = $$$Text('Move current element up in this list');
var hlpMoveDown = $$$Text('Move current element down in this list');
var hlpFilterOptions = $$$Text('Add advanced filter to the table');
var msgDropFil = $$$Text('Drop filter here');
var hlpFilterOptions = $$$Text('Add advanced filter to the table');
html[html.length] = '<table class="dsptcHeaderTable" title="'+hlpFilter+'" cellspacing="0" id="filters_header"><tr><td>' + $$$Text('Filters','%DeepSee') + '</td>';
html[html.length] = '<td align="right" width="90%" nowrap="1">';
var enb = this.itemCanMoveUp('filters',this.selectedItem);
html[html.length] = this.getIconHTML('ftrUp',enb,'iconUp16',hlpMoveUp,'zenPage.getComponent('+this.index+').moveItemUp(\'filters\');');
html[html.length] = '&#160;';
var enb = this.itemCanMoveDown('filters',this.selectedItem);
html[html.length] = this.getIconHTML('ftrDown',enb,'iconDown16',hlpMoveDown,'zenPage.getComponent('+this.index+').moveItemDown(\'filters\');');
html[html.length] = '&#160;';
html[html.length] = this.getIconHTML('ftrAdd',true,'iconAdd16',hlpAddBlank,'zenPage.getComponent('+this.index+').addBlankLevel(\'filters\');');
html[html.length] = '&#160;';
html[html.length] = this.getIconHTML('ftrOptions',true,img,hlpFilterOptions,'zenPage.getComponent('+this.index+').setFilterOptions();');
html[html.length] = '&#160;';
var enb = (this.pivotTable.filters && this.pivotTable.filters.length > 0);
html[html.length] = this.getIconHTML('ftrClear',enb,'iconClose16',hlpClear,'zenPage.getComponent('+this.index+').clearLevels(\'filters\');');
html[html.length] = '</td>' + '</tr></table>';
var cls = (this.selectedColumn=='filters'&&this.selectedItem=='') ? 'dsptcBodySelected' : 'dsptcBody';
html[html.length] = '<div class="'+cls+'" style="height:'+this.rowsHeight+'" id="filters_body">'; // WAL194
html[html.length] = this.getLevelHTML('filters',msgDropFil,this.pivotTable.filters,'');
html[html.length] = '</div>';
return html.join('');
}

self._DeepSee_Component_pivotController_getHeaderHTML = function() {
var pivot = this.pivotTable;
var html = [];
html[html.length] = '<div class="dsptcHeaderDiv">';
var hlpReset = $$$Text("Reset the table");
var hlpCancel = $$$Text("Cancel a running query");
var hlpRefresh = $$$Text("Refresh the table");
var hlpRefresh2 = $$$Text("Refresh the table-there are unapplied changes to this pivot");
var hlpOptions = $$$Text("Set options for the pivot table");
var hlpQuery = $$$Text("Show the current query for the pivot table");
var hlpDrill = $$$Text("Show a detail listing for the current selected cell(s)");
var hlpPivot = $$$Text("Show the pivot table");
var hlpBack = $$$Text("Go back to previous view");
var hlpForward = $$$Text("Go forward to next view");
var hlpSwap = $$$Text("Swap rows and columns");
var hlpFormat = $$$Text("Define conditional formatting rules");
var hlpChart = $$$Text("Modify chart appearance");
var hlpExcel = $$$Text("Microsoft Excel (.xls)");
var hlpExport = $$$Text("Export current results");
var hlpAnalyze = $$$Text("Show an analysis of the current selected cell(s)");
var hlpPDF = $$$Text("Export current results to printable PDF format");
var hlpCSV = $$$Text("Comma delimited (.csv)");		// DP-402897
var hlpEnhCSV = $$$Text("Comma delimited with filters and additional pivot information (.csv)")		// DP-402897
var hlpConfigPDF = $$$Text("Configure PDF export for this pivot");
var hlpCopy = $$$Text("Copy the selected pivot level item");
var hlpPaste = $$$Text("Paste pivot level after selected pivot level item");
var hlpPasteUnder = $$$Text("Paste pivot level under the selected pivot level item");
var hlpAutoExecOn = $$$Text("Turn on auto-execute mode");
var hlpAutoExecOff = $$$Text("Turn off auto-execute mode");
var space = '<span class="iconSep">|</span>'
html[html.length] = '<table><tr>';
html[html.length] = '<td nowrap="1"><div class="dsptIconBar">';
if (zenPage.showDimensionTree) {
var title = $$$Text('Toggle display of dimension tree','%DeepSee');
var arrow = zenPage.showDimensions ? '&#171;' : '&#187;';
html[html.length] = '<span id="dimArrow" title="'+title+'" class="dsptcArrow" onclick="zenPage.showDimensionTree(!zenPage.showDimensions);">'+arrow+'</span>&#160;';
}
html[html.length] = this.getIconHTML('icReset',true,'iconHome24',hlpReset,'zenPage.getComponent('+this.index+').resetTable();');
if ("automatic"==pivot.dataSource) {
html[html.length] = this.getIconHTML('icBack',pivot.canGoBack(),'iconBack24',hlpBack,'zenPage.getComponent('+this.index+').getPivotTable().goBack();');
html[html.length] = this.getIconHTML('icFwd',pivot.canGoForward(),'iconForward24',hlpForward,'zenPage.getComponent('+this.index+').getPivotTable().goForward();');
}
var icon = pivot.changesPending ? 'iconRefresh24on' : 'iconRefresh24';
html[html.length] = this.getIconHTML('icRefresh',true,icon,hlpRefresh,'zenPage.getComponent('+this.index+').getPivotTable().executeQuery(true);');
html[html.length] = space;
var enb = (this.selectedColumn!='');
html[html.length] = this.getIconHTML('icCopy',enb,'iconCopy24',hlpCopy,'zenPage.getComponent('+this.index+').copyItem();');
var enb = this._clipboard&&this.selectedColumn!='';
html[html.length] = this.getIconHTML('icPaste',enb,'iconPaste24',hlpPaste,'zenPage.getComponent('+this.index+').pasteItem(\'after\');');
var enb = this._clipboard&&(this.selectedColumn=='rows'||this.selectedColumn=='cols')&&this.selectedItem!='';
html[html.length] = this.getIconHTML('icPasteDown',enb,'iconPasteDown24',hlpPasteUnder,'zenPage.getComponent('+this.index+').pasteItem(\'under\');');
var enb = ((pivot.drillLevels.length==0)&&((pivot.rowLevels&&pivot.rowLevels.length>0)||(pivot.columnLevels&&pivot.columnLevels.length>0)));
html[html.length] = this.getIconHTML('icSwap',enb,'iconSwap24',hlpSwap,'zenPage.getComponent('+this.index+').swapRows();');
html[html.length] = space;
if (pivot.canDrillThrough()) {
var icon = pivot.isDrillThrough ? 'iconListing24On':'iconListing24';
var enb = pivot.isDrillThrough ? true : ''!==pivot.selectedRange;
var hlp = pivot.isDrillThrough ? hlpPivot : hlpDrill;
html[html.length] = this.getIconHTML('icListing',enb,icon,hlpDrill,'zenPage.getComponent('+this.index+').drillThrough();');
}
if (zenPage.showBreakdown) {
html[html.length] = this.getIconHTML('icBreakdown',''!==pivot.selectedRange,'iconAnalysis24',hlpAnalyze,'zenPage.showBreakdown();');
}
if (zenPage.showQuery) {
icon = pivot.dataSource=='automatic' ? 'iconScript24' : 'iconScript24on';
html[html.length] = this.getIconHTML('icQuery',true,icon,hlpQuery,'zenPage.showQuery();');
}
if (zenPage.exportExcel) {
if (zenPage.exportCSV) {
var dropDownOptions = [
{"name":"Excel","click":"zenPage.exportExcel();","hover":hlpExcel},
{"name":"CSV","click":"zenPage.exportCSV(true);","hover":hlpCSV},
{"name":$$$Text("CSV with Heading"),"click":"zenPage.exportCSV();","hover":hlpEnhCSV}
];
var menuHtml = this.getDropdownIconHTML('exportMenu',true,'iconExcel24',hlpExport,dropDownOptions);
html.push('</div></td><td>');
for ( n=0; n<menuHtml.length; n++) {
html[html.length] = menuHtml[n];
}
html.push('</td><td><div class="dsptIconBar">');
}
else {
html[html.length] = this.getIconHTML('icExcel',true,'iconExcel24',hlpExcel,'zenPage.exportExcel();');
}
}
if (zenPage.exportPDF && zenPage.hasPDF) {
html[html.length] = this.getIconHTML('icPDF',true,'iconPrinter24',hlpPDF,'zenPage.exportPDF();');
}
html[html.length] = space;
if (zenPage.showPivotOptions) {
html[html.length] = this.getIconHTML('icOptions',true,'iconPivotOptions24',hlpOptions,'zenPage.showPivotOptions();');
}
if (zenPage.exportPDF && zenPage.hasPDF) {
html[html.length] = this.getIconHTML('icPrintConfig',true,'iconPrintConfig24',hlpConfigPDF,'zenPage.showPDFOptions();');
}
if (zenPage.showChartOptions) {
html[html.length] = this.getIconHTML('icChartOptions',true,'iconChartOptions24',hlpChart,'zenPage.showChartOptions();');
}
if (zenPage.showFormatOptions) {
var icon = pivot.hasFormatRules() ? 'iconFormat24on' : 'iconFormat24';
html[html.length] = this.getIconHTML('icFormat',true,icon,hlpFormat,'zenPage.showFormatOptions();');
}
html[html.length] = space;
if (false && zenPage.toggleAutoExecute) {
var icon = pivot.autoExecute ? 'iconAutoExec24on' : 'iconAutoExec24';
var hlp = pivot.autoExecute ? hlpAutoExecOff : hlpAutoExecOn;
html[html.length] = this.getIconHTML('icAutoExec',true,icon,hlpAutoExecOff,'zenPage.toggleAutoExecute();');
}
html[html.length] = this.getIconHTML('icCancel',true,'iconCancel24',hlpCancel,'zenPage.getComponent('+this.index+').getPivotTable().cancelQuery();');
html[html.length] = '</div></td>';
html[html.length] = '<td nowrap="1"><div id="'+this.makeId('message')+'"/></td>';
html[html.length] = '<td id="'+this.makeId('drillLevels')+'">';
html[html.length] = this.getDrillLevelHTML();
html[html.length] = '</td>';
html[html.length] = '</tr></table>';
html[html.length] = '</div>';
return html.join('');
}

self._DeepSee_Component_pivotController_getIcon = function(id) {
if (!this._iconList) {
this.buildIconList();
}
var icon = this._iconList[id];
return icon ? icon : 'deepsee/cube_48.gif';
}

self._DeepSee_Component_pivotController_getIconHTML = function(id,enabled,imgId,help,click) {
var cls = enabled ? 'dsptIcon' : 'dsptIconDisabled';
if (click!='') {
click = 'if(this.className==\'dsptIcon\'){'+click+'} return false;';
}
else {
click = 'return false;';
}
var url = this.getIcon(imgId);
var style = 'padding-right:4px;';
if (imgId.indexOf('24')>=0) {
style += 'height:22px;';
}
else if (imgId.indexOf('16')>=0) {
style += 'height:12px;';
}
if (imgId.indexOf('Swap')>=0) {
style += 'width:22px;';
}
return '<img id="'+(id?this.makeId(id):'')+'" style="'+style+'" class="'+cls+'" title="'+help+'" onclick="'+click+'" src="'+url+'"/>';
}

self._DeepSee_Component_pivotController_getLevelHTML = function(which,dropMsg,array,drillLevel,depth,parent) {
drillLevel = ('undefined' == typeof drillLevel) ? '' : drillLevel;
depth = ('undefined' == typeof depth) ? 0 : depth;
var html = new Array();
var childrenAllowed = ('rows'==which || 'cols'==which);
var optionsAllowed = ('rows'==which || 'cols'==which || 'msrs'==which);
var hlpAddChild = $$$Text('Drop an item here to make it a child of this item');
var hlpOptions = $$$Text('Set options for this item');
var hlpAdvancedFilter = $$$Text('Edit this advanced filter');
var hlpRemove = $$$Text('Remove this item');
var selectedItem = '';
if ((this.selectedColumn==which)&&(this.selectedItem!='')) {
selectedItem = this.selectedItem;
}
var key = '';
if (array) {
for (var n = 0; n < array.length; n++) {
var level = array[n];
level._index = n;
if (null != parent) {
level._parent = parent;
}
if (!level.transient) {
key = n;
var p = level._parent;
while (null != p) {
key = p._index + '_' + key;
p = p._parent;
}
if ((drillLevel=='')||(level.drillLevel == drillLevel)) {
var cls = (key==selectedItem && selectedItem !== '') ? 'dsptcItemSelected' : 'dsptcItem';
html[html.length] = '<div class="'+cls+'" style="padding-left:'+(5+depth*10)+'px;" id="'+which+'_'+key+'" onclick="zenPage.getComponent('+this.index+').selectItem(\''+which+'\',\''+key+'\');">';
var text = (level.caption && '' !==level.caption) ? level.caption : level.text;
if (text.length && text.length > 25) {
text = text.substr(0,25)+'...';
}
var tstyle = '';
switch(level.levelType) {
case 'value':
text = (level.levelCaption && '' !==level.levelCaption) ? level.levelCaption : level.value.toString().substring(0,15);
tstyle = 'color:#408040;'
break;
case 'mdx':
if (level.value.toString().toLowerCase().substr(0,10)=='$variable.') {
text = (level.levelCaption && '' !==level.levelCaption) ? level.levelCaption : level.value.substr(10);
}
else {
text = (level.levelCaption && '' !==level.levelCaption) ? level.levelCaption : 'MDX';
}
tstyle = 'color:#404080;'
break;
case 'space':
text = 'space';
tstyle = 'color:#808080;'
break;
}
if ('filters' == which) {
if (zenGet(level.enabled,true)) {
var checked = 'checked="checked" ';
}
else {
var checked = '';
tstyle += 'color:#808080;';
}
html[html.length] = '<input title="'+$$$Text('Enable this filter') + '" type="checkbox" '+checked +' onclick="zenPage.getComponent('+this.index+').enableItem(event,\''+which+'\',\''+key+'\');return false;" />';
}
html[html.length] = '<a href="#" onclick="zenPage.getComponent('+this.index+').selectItem(\''+which+'\',\''+key+'\');return false;" style="'+tstyle+'">' + zenEscapeXML(text) + '</a>';
if (childrenAllowed) {
html[html.length] = '<a id="'+which+'child_'+key+'" href="#" onclick="return false;">&#160;' + '<img class="dsptIcon" style="height:12px;" src="'+this.getIcon('iconJoin16')+'" title="'+hlpAddChild+'" onclick="zenPage.getComponent('+this.index+').addChildToElement(\''+which+'\',\''+key+'\');" />' + '&#160;</a>';
}
if (optionsAllowed) {
if (true || (level.spec.toString().indexOf('.')==-1)||(level.spec.toUpperCase().indexOf('.MEMBERS')!=-1)||(level.spec.toUpperCase().indexOf('.ALLMEMBERS')!=-1)||(level.spec.toUpperCase().indexOf('.%TOPMEMBERS')!=-1)) {
var img = (level.levelCaption!=''||level.levelFormat!=''||level.levelStyle!=''||level.levelHeaderStyle!=''||level.levelSummary!=''||level.headEnabled||level.orderEnabled||level.filterEnabled||level.aggEnabled||level.aggFunction) ? 'iconColumn16on' : 'iconColumn16';
html[html.length] = this.getIconHTML('',true,img,hlpOptions,'zenPage.getComponent('+this.index+').setLevelOptions(\''+which+'\',\''+key+'\');');
}
}
else if ('filters' == which && (level.advanced)) {
if (true || level.spec != '%FILTER') {
var img = 'iconColumn16on';
html[html.length] = this.getIconHTML('',true,img,hlpAdvancedFilter,'zenPage.getComponent('+this.index+').setFilterOptions(\''+key+'\');');
}
}
html[html.length] = this.getIconHTML('',true,'iconClose16',hlpRemove,'zenPage.getComponent('+this.index+').removeLevel(\''+which+'\',\''+key+'\');');
html[html.length] = '</div>';
if (level.childLevels && level.childLevels.length > 0) {
html[html.length] = this.getLevelHTML(which,dropMsg,level.childLevels,drillLevel,depth+1,level);
}
}
}
}
}
html[html.length] = '<div id="'+which+'append_'+key+'" class="dsptcDrop" style="padding-left:'+(5+depth*10)+'px;"><a href="#" onclick="zenPage.getComponent('+this.index+').selectItem(\''+which+'\',\'\');return false;">' + dropMsg + '</a></div>';
return html.join('');
}

self._DeepSee_Component_pivotController_getMeasuresHTML = function() {
var html = [];
var pivot = this.pivotTable;
var hlpMsr = $$$Text('Specify measures to display');
var hlpAddMsr = $$$Text('Add a measure to the table');
var hlpClear = $$$Text('Clear this list');
var hlpAddBlank = $$$Text('Add the selected element in the member tree to this list');
var hlpMoveUp = $$$Text('Move current element up in this list');
var hlpMoveDown = $$$Text('Move current element down in this list');
var hlpMsrOptions = $$$Text('Set options for measures within the table');
var msgDropMsr = $$$Text('Drop measure here');
html[html.length] = '<table class="dsptcHeaderTable" title="'+hlpMsr+'" cellspacing="0" id="msrs_header"><tr><td>' + $$$Text('Measures') + '</td><td align="right" width="90%" nowrap="1">&#160;';
var enb = this.itemCanMoveUp('msrs',this.selectedItem);
html[html.length] = this.getIconHTML('msrUp',enb,'iconUp16',hlpMoveUp,'zenPage.getComponent('+this.index+').moveItemUp(\'msrs\');');
html[html.length] = '&#160;';
var enb = this.itemCanMoveDown('msrs',this.selectedItem);
html[html.length] = this.getIconHTML('msrDown',enb,'iconDown16',hlpMoveDown,'zenPage.getComponent('+this.index+').moveItemDown(\'msrs\');');
html[html.length] = '&#160;';
html[html.length] = this.getIconHTML('msrAdd',true,'iconAdd16',hlpAddBlank,'zenPage.getComponent('+this.index+').addBlankLevel(\'msrs\');');
html[html.length] = '&#160;';
var img = ((pivot.measureLocation=='rows')||(pivot.hideMeasures!=1)) ? 'iconColumn16on' : 'iconColumn16';
html[html.length] = this.getIconHTML('msrOptions',true,img,hlpMsrOptions,'zenPage.getComponent('+this.index+').setAxisOptions(\'msrs\');');
var enb = (this.pivotTable.measures && this.pivotTable.measures.length > 0);
html[html.length] = this.getIconHTML('msrClear',enb,'iconClose16',hlpClear,'zenPage.getComponent('+this.index+').clearLevels(\'msrs\');');
html[html.length] = '</td>' + '</tr></table>';
var cls = (this.selectedColumn=='msrs'&&this.selectedItem=='') ? 'dsptcBodySelected' : 'dsptcBody';
html[html.length] = '<div class="'+cls+'" style="height:'+this.rowsHeight+'" id="msrs_body">'; // WAL194
html[html.length] = this.getLevelHTML('msrs',msgDropMsr,this.pivotTable.measures,'');
html[html.length] = '</div>';
return html.join('');
}

self._DeepSee_Component_pivotController_getPivotTable = function() {
return this.pivotTable;
}

self._DeepSee_Component_pivotController_getRowsHTML = function() {
var pivot = this.pivotTable;
var drillLevel = pivot?pivot.getDrillLevel():0;
var html = [];
var hlpRow = $$$Text('Specify items to display for the rows in the table');
var hlpAddRow = $$$Text('Add a row to the table');
var hlpClear = $$$Text('Clear this list');
var hlpAddBlank = $$$Text('Add the selected element in the member tree to this list');
var hlpRowOptions = $$$Text('Set options for rows within the table');
var hlpMoveUp = $$$Text('Move current element up in this list');
var hlpMoveDown = $$$Text('Move current element down in this list');
var msgDropRow = $$$Text('Drop row here');
html[html.length] = '<table class="dsptcHeaderTable" title="'+hlpRow+'" cellspacing="0" id="rows_header"><tr><td>' + $$$Text('Rows') + '</td>';
html[html.length] = '<td align="right" width="90%" nowrap="1">';
var enb = this.itemCanMoveUp('rows',this.selectedItem);
html[html.length] = this.getIconHTML('rowUp',enb,'iconUp16',hlpMoveUp,'zenPage.getComponent('+this.index+').moveItemUp(\'rows\');');
html[html.length] = '&#160;';
var enb = this.itemCanMoveDown('rows',this.selectedItem);
html[html.length] = this.getIconHTML('rowDown',enb,'iconDown16',hlpMoveDown,'zenPage.getComponent('+this.index+').moveItemDown(\'rows\');');
html[html.length] = '&#160;';
html[html.length] = this.getIconHTML('rowAdd',true,'iconAdd16',hlpAddBlank,'zenPage.getComponent('+this.index+').addBlankLevel(\'rows\');');
html[html.length] = '&#160;';
var img = (pivot.rowAxisOptions.suppress8020||pivot.rowAxisOptions.headEnabled||pivot.rowAxisOptions.orderEnabled||pivot.rowAxisOptions.filterEnabled||pivot.rowAxisOptions.aggEnabled) ? 'iconColumn16on' : 'iconColumn16';
html[html.length] = this.getIconHTML('rowOptions',true,img,hlpRowOptions,'zenPage.getComponent('+this.index+').setAxisOptions(\'rows\');');
html[html.length] = '&#160;';
var enb = (this.pivotTable.rowLevels && this.pivotTable.rowLevels.length > 0);
html[html.length] = this.getIconHTML('rowClear',enb,'iconClose16',hlpClear,'zenPage.getComponent('+this.index+').clearLevels(\'rows\');');
html[html.length] = '</td>';
html[html.length] = '</tr></table>';
var cls = (this.selectedColumn=='rows'&&this.selectedItem=='') ? 'dsptcBodySelected' : 'dsptcBody';
html[html.length] = '<div class="'+cls+'" style="height:'+this.rowsHeight+'" id="rows_body">'; // WAL194
html[html.length] = this.getLevelHTML('rows',msgDropRow,this.pivotTable.rowLevels,drillLevel);
html[html.length] = '</div>';
return html.join('');
}

self._DeepSee_Component_pivotController_gotoDrillLevel = function(idx) {
if (!this.pivotTable) return;
this.pivotTable.gotoDrillLevel(idx);
}

self._DeepSee_Component_pivotController_hideMessage = function() {
var div = this.findElement('message');
if (div) {
div.innerHTML = '';
div.style.display = 'none';
}
}

self._DeepSee_Component_pivotController_isValidFilter = function(dimName,value) {
var msg = '';
if ((dimName == '[MEASURES]')||(dimName == 'MEASURES')||(dimName == '[%QUALITYMEASURE]')||(dimName == '%QUALITYMEASURE')) {
msg = $$$Text('Measure cannot be used as a filter');
}
else if (value.toUpperCase().indexOf('.%TOPMEMBERS') != -1) {
msg = $$$Text('Only a level within a dimension can be used as a filter');
}
else if (value.toUpperCase().indexOf('.CURRENTMEMBER') != -1) {
msg = $$$Text('Dimension property cannot be used as a filter');
}
else if (value.toUpperCase().substr(0,5) == '%KPI(') {
msg = $$$Text('Plug-in cannot be used as a filter');
}
return msg;
}

self._DeepSee_Component_pivotController_itemCanMoveDown = function(which,key) {
if (this.selectedColumn!=which) return false;
var pivot = this.getPivotTable();
var array = null;
switch(this.selectedColumn) {
case 'fields':
array = pivot.listingFields;
break;
case 'rows':
array = pivot.rowLevels;
break;
case 'cols':
array = pivot.columnLevels;
break;
case 'msrs':
array = pivot.measures;
break;
case 'filters':
array = pivot.filters;
break;
}
if (array && key !== '') {
var idx = key.toString().split('_');
for (var n = 0; n < (idx.length - 1); n++) {
if (null != idx[n+1]) {
array = array[idx[n]].childLevels;
}
}
var no = parseInt(idx[idx.length-1]);
if (array[no] && no < (array.length - 1)) {
return true;
}
}
return false;
}

self._DeepSee_Component_pivotController_itemCanMoveUp = function(which,key) {
if (this.selectedColumn!=which) return false;
var pivot = this.getPivotTable();
var array = null;
switch(this.selectedColumn) {
case 'fields':
array = pivot.listingFields;
break;
case 'rows':
array = pivot.rowLevels;
break;
case 'cols':
array = pivot.columnLevels;
break;
case 'msrs':
array = pivot.measures;
break;
case 'filters':
array = pivot.filters;
break;
}
if (array && key !== '') {
var idx = key.toString().split('_');
for (var n = 0; n < (idx.length - 1); n++) {
if (null != idx[n+1]) {
array = array[idx[n]].childLevels;
}
}
var no = parseInt(idx[idx.length-1]);
if (array[no] && no > 0) {
return true;
}
}
return false;
}

self._DeepSee_Component_pivotController_moveItemDown = function(which) {
if (this.selectedColumn!=which) return;
var filterChanged = false;
var pivot = this.getPivotTable();
var array = null;
switch(this.selectedColumn) {
case 'fields':
array = pivot.listingFields;
break;
case 'rows':
array = pivot.rowLevels;
break;
case 'cols':
array = pivot.columnLevels;
break;
case 'msrs':
array = pivot.measures;
break;
case 'filters':
array = pivot.filters;
break;
}
if (array && this.selectedItem !== '') {
var key = this.selectedItem;
var idx = key.toString().split('_');
for (var n = 0; n < (idx.length - 1); n++) {
if (null != idx[n+1]) {
array = array[idx[n]].childLevels;
}
}
var no = parseInt(idx[idx.length-1]);
if (array[no] && no < (array.length - 1)) {
var swap = array[no+1];
if (swap) {
pivot.pushState();
array[no+1] = array[no];
array[no] = swap;
idx[idx.length-1] = no + 1;
this.selectedItem = idx.join('_');
pivot.executeQuery(pivot.autoExecute);
this.updateState(this.selectedColumn);
if (this.selectedColumn=='filters') {
filterChanged = true;
}
}
}
}
if (filterChanged) {
if (zenPage.UpdateFilterControls) {
var msg = zenPage.UpdateFilterControls(pivot.cubeName,zen('filterGroup'),pivot);
if (''!==msg) {
alert(msg);
}
}
}
}

self._DeepSee_Component_pivotController_moveItemUp = function(which) {
if (this.selectedColumn!=which) return;
var filterChanged = false;
var pivot = this.getPivotTable();
var array = null;
switch(this.selectedColumn) {
case 'fields':
array = pivot.listingFields;
break;
case 'rows':
array = pivot.rowLevels;
break;
case 'cols':
array = pivot.columnLevels;
break;
case 'msrs':
array = pivot.measures;
break;
case 'filters':
array = pivot.filters;
break;
}
if (array && this.selectedItem !== '') {
var key = this.selectedItem;
var idx = key.toString().split('_');
for (var n = 0; n < (idx.length - 1); n++) {
if (null != idx[n+1]) {
array = array[idx[n]].childLevels;
}
}
var no = parseInt(idx[idx.length-1]);
if (array[no] && no > 0) {
var swap = array[no-1];
if (swap) {
pivot.pushState();
array[no-1] = array[no];
array[no] = swap;
idx[idx.length-1] = no - 1;
this.selectedItem = idx.join('_');
pivot.executeQuery(pivot.autoExecute);
this.updateState();
if (this.selectedColumn=='filters') {
filterChanged = true;
}
}
}
}
if (filterChanged) {
if (zenPage.UpdateFilterControls) {
var msg = zenPage.UpdateFilterControls(pivot.cubeName,zen('filterGroup'),pivot);
if (''!==msg) {
alert(msg);
}
}
}
}

self._DeepSee_Component_pivotController_onPopupAction = function(popupName,action,value) {
if (!this.pivotTable) return;
var pivot = this.pivotTable;
switch(popupName) {
case 'NamedFilter':
if (null != this._target) {
if (value != this._target.text) {
this._target.text = value;
if (zenPage.updateMemberTree) {
zenPage.updateMemberTree();
}
}
}
pivot.executeQuery(pivot.autoExecute);
break;
case 'FilterOptions':
if (''!=value) {
pivot.pushState();
if (null != this._target) {
parm = this._target;
}
else {
var parm = zenPage.createComponentNS('http://www.intersystems.com/deepsee','pivotLevel');
pivot.filters[pivot.filters.length] = parm;
parm.text = $$$Text('Advanced filter');
if (action=='apply') {
this._target = parm;
}
}
parm.spec = value;
parm.advanced = true;
var drillLevel = pivot.getDrillLevel();
parm.drillLevel = drillLevel;
if (pivot.isDrillThrough) {
pivot.mdx = '';
pivot.isDrillThrough = false;
}
pivot.selectedRange = '';
pivot.executeQuery(pivot.autoExecute);
}
break;
case 'MeasureOptions':
pivot.measureLocation = value.measureLocation;
pivot.hideMeasures = value.hideMeasures;
pivot.executeQuery(pivot.autoExecute);
break;
case 'AxisOptions':
case 'LevelOptions':
if (this._newTarget) {
pivot.pushState();
this._target.headEnabled = this._newTarget.headEnabled;
this._target.headCount = this._newTarget.headCount;
this._target.orderEnabled = this._newTarget.orderEnabled;
this._target.orderExpression = this._newTarget.orderExpression;
this._target.orderDirection = this._newTarget.orderDirection;
this._target.filterEnabled = this._newTarget.filterEnabled;
this._target.filterExpression = this._newTarget.filterExpression;
this._target.aggEnabled = this._newTarget.aggEnabled;
this._target.aggFunction = this._newTarget.aggFunction;
this._target.aggFunctionParm = this._newTarget.aggFunctionParm;
this._target.levelCaption = this._newTarget.levelCaption;
this._target.levelFormat = this._newTarget.levelFormat;
this._target.levelType = this._newTarget.levelType;
this._target.value = this._newTarget.value;
this._target.levelStyle = this._newTarget.levelStyle;
this._target.levelHeaderStyle = this._newTarget.levelHeaderStyle;
this._target.levelSummary = this._newTarget.levelSummary;
this._target.suppress8020 = this._newTarget.suppress8020;
this._target.spec = this._newTarget.spec;
this._target.drilldownSpec = this._newTarget.drilldownSpec;
if (pivot.isDrillThrough) {
pivot.mdx = '';
pivot.isDrillThrough = false;
}
pivot.executeQuery(pivot.autoExecute);
delete this._newTarget;
}
break;
}
}

self._DeepSee_Component_pivotController_onloadHandler = function() {
this.setProperty('pivotTableId',this.pivotTableId);
}

self._DeepSee_Component_pivotController_pasteItem = function(where) {
if (!this._clipboard) return;
var pivot = this.getPivotTable();
var array = null;
switch(this.selectedColumn) {
case 'fields':vot
array = pi.listingFields;
break;
case 'rows':
array = pivot.rowLevels;
break;
case 'cols':
array = pivot.columnLevels;
break;
case 'msrs':
array = pivot.measures;
break;
case 'filters':
array = pivot.filters;
break;
}
if ('%FILTER'==this._clipboard.spec && this.selectedColumn!='filters') {
alert($$$Text('Named filters can only be placed in the filters list'));
return;
}
if (array) {
var key = this.selectedItem;
if (this.selectedItem=='') {
var no = 0;
}
else {
var idx = key.toString().split('_');
for (var n = 0; n < (idx.length - 1); n++) {
if (null != idx[n+1]) {
array = array[idx[n]].childLevels;
}
}
var no = parseInt(idx[idx.length-1]);
}
if (array[no] || array.length==0) {
pivot.pushState();
var newItem = this._clipboard.clone(true);
if ('under'==where) {
if (!array[no].childLevels) {
array[no].childLevels = [];
}
array[no].childLevels.splice(0,0,newItem);
}
else {
array.splice(no+1,0,newItem);
if (this.selectedItem!='') {
idx[idx.length-1] = no + 1;
this.selectedItem = idx.join('_');
}
}
pivot.executeQuery(pivot.autoExecute);
this.updateState(this.selectedColumn);
}
}
}

self._DeepSee_Component_pivotController_removeDrillLevel = function(idx) {
if (!this.pivotTable) return;
this.pivotTable.removeDrillLevel(idx);
}

self._DeepSee_Component_pivotController_removeLevel = function(which,key) {
if (!this.pivotTable) return;
var pivot = this.pivotTable;
var filterChanged = false;
var listingFields = false;
var array = null;
switch(which) {
case 'fields':
array = pivot.listingFields;
listingFields = true;
break;
case 'rows':
array = pivot.rowLevels;
break;
case 'cols':
array = pivot.columnLevels;
break;
case 'msrs':
array = pivot.measures;
break;
case 'filters':
array = pivot.filters;
filterChanged = true;
break;
}
if (array) {
var idx = key.toString().split('_');
for (var n = 0; n < (idx.length - 1); n++) {
if (null != idx[n+1]) {
array = array[idx[n]].childLevels;
}
}
if (array[idx[idx.length-1]]) {
if (array[idx[idx.length-1]].spec && array[idx[idx.length-1]].spec.toString().toLowerCase().substr(0,10)=='$variable.') {
filterChanged = true;
}
if (which == this.selectedColumn) {
this.selectedItem = '';
this.selectedColumn = '';
}
if (!listingFields) {
pivot.pushState();
}
else {
pivot.listing = '$$$CUSTOM';
}
array.splice(idx[idx.length-1],1);
if (!listingFields && pivot.isDrillThrough) {
pivot.mdx = '';
pivot.isDrillThrough = false;
}
pivot.executeQuery(pivot.autoExecute);
}
}
if (filterChanged) {
if (zenPage.UpdateFilterControls) {
var msg = zenPage.UpdateFilterControls(pivot.cubeName,zen('filterGroup'),pivot);
if (''!==msg) {
alert(msg);
}
}
}
}

self._DeepSee_Component_pivotController_renderContents = function() {
if (this.getEnclosingDiv() == null) return;
this.getEnclosingDiv().style.visibility = 'hidden';
var html = new Array();
var pivot = this.pivotTable;
if (pivot) {
html[html.length] = '<div style="height:34px;" id="'+this.makeId('toolbar')+'">';
html[html.length] = this.getHeaderHTML();
html[html.length] = '</div>';
}
html[html.length] = '<div id="controllerTableArea">'; // WAL176
html[html.length] = '<div style="'+((!pivot||!pivot.isDrillThrough||!pivot.canDrillThrough()||!pivot.canUseListingFields)?'':'display:none;')+'" id="'+this.makeId('pivotColumns')+'"><table class="dsptcTable" border="0" cellpadding="3" cellspacing="0"><tr>';
if (null == pivot) {
html[html.length] = '<td align="left" valign="center" nowrap="1">&#160;';
html[html.length] = $$$Text('Not connected');
html[html.length] = '</td>';
}
else {
var drillLevel = pivot.getDrillLevel();
var manual = pivot.dataSource=='manual';
var style = manual ? 'style="background:#F0F0F0;"' : '';
html[html.length] = '<td valign="top" '+style+' id="'+this.makeId('rowsTD')+'">';
html[html.length] = this.getRowsHTML();
html[html.length] = '</td>';
html[html.length] = '<td valign="top" '+style+' id="'+this.makeId('columnsTD')+'">';
html[html.length] = this.getColumnsHTML();
html[html.length] = '</td>';
html[html.length] = '<td valign="top" '+style+' id="'+this.makeId('measuresTD')+'">';
html[html.length] = this.getMeasuresHTML();
html[html.length] = '</td>';
html[html.length] = '<td valign="top" id="'+this.makeId('filtersTD')+'">';
html[html.length] = this.getFiltersHTML();
html[html.length] = '</td>';
}
html[html.length] = '</tr></table></div>';
if (pivot && pivot.canDrillThrough() && pivot.canUseListingFields) {
html[html.length] = '<div style="'+(pivot.isDrillThrough?'':'display:none;')+'" id="'+this.makeId('listingColumns')+'"><table class="dsptcTable" border="0" cellpadding="3" cellspacing="0"><tr>';
html[html.length] = '<td valign="top" id="'+this.makeId('fieldsTD')+'">';
html[html.length] = this.getFieldsHTML();
html[html.length] = '</td>';
html[html.length] = '</tr></table></div>';
}
if (this.miniAnalyzer!=true) { // WAL238 -- don't draw resize bars for mini-Analyzer
html[html.length] = '<div id="col_1_2" class="hzResizeBar" onmousedown="ZLM.drag(this,event);">';
html[html.length] = '</div>';
html[html.length] = '<div id="col_2_3" class="hzResizeBar" onmousedown="ZLM.drag(this,event);">';
html[html.length] = '</div>';
html[html.length] = '<div id="col_3_4" class="hzResizeBar" onmousedown="ZLM.drag(this,event);">';
html[html.length] = '</div>';
html[html.length] = '<div id="bottomResize" class="vtResizeBar" onmousedown="ZLM.drag(this,event);">';
html[html.length] = '</div>';
}
html[html.length] = '</div>';
this.getEnclosingDiv().innerHTML = html.join('');
this.getEnclosingDiv().style.visibility = 'visible';
}

self._DeepSee_Component_pivotController_resetTable = function() {
this.selectedItem = '';
this.selectedColumn = '';
var pivot = this.getPivotTable();
pivot.resetTable();
if (pivot.canUseListingFields) {
var divPivot = this.findElement('pivotColumns');
var divListing = this.findElement('listingColumns');
if (divPivot) {
divPivot.style.display = 'block';
}
if (divListing) {
divListing.style.display = 'none';
}
}
}

self._DeepSee_Component_pivotController_selectItem = function(which,item) {
this.selectedColumn = which;
this.selectedItem = item;
this.updateState(which);
}

self._DeepSee_Component_pivotController_setAxisOptions = function(which) {
if (!this.pivotTable) return;
var pivot = this.pivotTable;
var target = null;
switch(which) {
case 'rows':
target = pivot.rowAxisOptions;
break;
case 'cols':
target = pivot.columnAxisOptions;
break;
case 'msrs':
var parms = new Object();
this._target = target;
parms.MODE = 'measures';
parms.INDEX = this.index;
parms.TEXT = which;
parms.SPEC = '';
parms.CUBE = pivot.cubeName;
parms.MEASURELOCATION = pivot.measureLocation;
parms.HIDEMEASURES = pivot.hideMeasures;  // + WAL114
parms.PIVOTNAME = '';
if (zenPage.pivotName) {
parms.PIVOTNAME = zenPage.pivotName;
}
zenLaunchPopupWindow('_DeepSee.UI.Dialog.PivotLevelOptions.zen','MeasureOptions','status=no,scrollbars,resizable=yes,width=500,height=600',parms,this);
break;
}
if (target) {
var parms = new Object();
this._target = target;
parms.MODE = 'axis';
parms.INDEX = this.index;
parms.TEXT = which;
parms.SPEC = '';
parms.CUBE = pivot.cubeName;
parms.HEAD = target.headEnabled ? 1 : 0;
parms.HEADCOUNT = target.headCount;
parms.FILTER = target.filterEnabled ? 1 : 0;
parms.FILTEREXPR = target.filterExpression;
parms.ORDER = target.orderEnabled ? 1 : 0;
parms.ORDEREXPR = target.orderExpression;
parms.ORDERDIR = target.orderDirection;
parms.SUPPRESS = target.suppress8020 ? 1 : 0;
parms.DRILLDOWNSPEC = target.drilldownSpec;
parms.AGG = target.aggEnabled ? 1 : 0;
parms.AGGFUNC = target.aggFunction;
parms.AGGFUNCPARM = target.aggFunctionParm;
parms.LEVELCAPTION = target.levelCaption;
parms.LEVELFORMAT = target.levelFormat;
parms.LEVELTYPE = target.levelType;
parms.LEVELSTYLE = target.levelStyle;
parms.LEVELHEADERSTYLE = target.levelHeaderStyle;
parms.LEVELSUMMARY = target.levelSummary;
parms.PIVOTNAME = '';
if (zenPage.pivotName) {
parms.PIVOTNAME = zenPage.pivotName;
}
zenLaunchPopupWindow('_DeepSee.UI.Dialog.PivotLevelOptions.zen','AxisOptions','status=no,scrollbars,resizable=yes,width=500,height=600',parms,this);
}
}

self._DeepSee_Component_pivotController_setFilterOptions = function(idx) {
if (!this.pivotTable) return;
var pivot = this.pivotTable;
var expression = '';
this._target = null;
if (null != idx) {
this._target = pivot.filters[idx];
expression = pivot.filters[idx].spec;
}
if (expression == '%FILTER') {
var parms = {
NAMEDFILTER:1,
CUBE:pivot.cubeName,
EXPRESSION:'',
FILTERNAME:pivot.filters[idx].text
};
zenLaunchPopupWindow('_DeepSee.UI.Dialog.AdvancedFilter.zen','NamedFilter','status=no,scrollbars,resizable=yes,width=700,height=600',parms,this);
}
else {
var parms = {
CUBE:pivot.cubeName,
EXPRESSION:expression
};
zenLaunchPopupWindow('_DeepSee.UI.Dialog.AdvancedFilter.zen','FilterOptions','status=no,scrollbars,resizable=yes,width=900,height=600',parms,this);
}
}

self._DeepSee_Component_pivotController_setLevelOptions = function(which,key) {
if (!this.pivotTable) return;
var pivot = this.pivotTable;
var array = null;
switch(which) {
case 'rows':
array = pivot.rowLevels;
break;
case 'cols':
array = pivot.columnLevels;
break;
case 'msrs':
array = pivot.measures;
break;
}
if (array) {
var target = null;
var idx = key.toString().split('_');
for (var n = 0; n < idx.length; n++) {
target = array[idx[n]];
if (null != idx[n+1]) {
array = array[idx[n]].childLevels;
}
}
if (target) {
var parms = new Object();
this._target = target;
parms.MODE = 'level';
parms.INDEX = this.index;
parms.TEXT = target.text;
parms.SPEC = target.spec;
parms.CUBE = pivot.cubeName;
parms.HEAD = target.headEnabled ? 1 : 0;
parms.HEADCOUNT = target.headCount;
parms.FILTER = target.filterEnabled ? 1 : 0;
parms.FILTEREXPR = target.filterExpression;
parms.ORDER = target.orderEnabled ? 1 : 0;
parms.ORDEREXPR = target.orderExpression;
parms.ORDERDIR = target.orderDirection;
parms.SUPPRESS = target.suppress8020 ? 1 : 0;
parms.DRILLDOWNSPEC = target.drilldownSpec;
parms.AGG = target.aggEnabled ? 1 : 0;
parms.AGGFUNC = target.aggFunction;
parms.AGGFUNCPARM = target.aggFunctionParm;
parms.LEVELCAPTION = target.levelCaption;
parms.LEVELFORMAT = target.levelFormat;
parms.LEVELTYPE = target.levelType;
parms.VALUE = target.value;
parms.LEVELSTYLE = target.levelStyle;
parms.LEVELHEADERSTYLE = target.levelHeaderStyle;
parms.LEVELSUMMARY = target.levelSummary;
parms.PIVOTNAME = '';
if (zenPage.pivotName) {
parms.PIVOTNAME = zenPage.pivotName;
}
zenLaunchPopupWindow('_DeepSee.UI.Dialog.PivotLevelOptions.zen','LevelOptions','status=no,scrollbars,resizable=yes,width=500,height=650',parms,this);
}
}
}

self._DeepSee_Component_pivotController_setProperty = function(property,value,value2) {
switch(property) {
case 'pivotTableId':
if (this.pivotTable && this.pivotTable.removeController) {
this.pivotTable.removeController();
this.pivotTable = null;
}
this.pivotTableId = value;
if (this.composite) {
this.pivotTable = this.composite.getChildById(this.pivotTableId);
}
else {
this.pivotTable = zenPage.getComponentById(this.pivotTableId);
}
if (this.pivotTable && this.pivotTable.addController) {
this.pivotTable.addController(this);
}
this.renderContents();
break;
default:
this.invokeSuper('setProperty',arguments);
break;
}
}

self._DeepSee_Component_pivotController_showMessage = function(pivot,msg,pct,listing,units) {
units = zenGet(units,'%');
var div = this.findElement('message');
if (div) {
var html = '';
html += '<table class="dspctMessage"><tr>';
if (listing) {
html += '<td><i>' + msg + '</i></td>';
}
else {
pct = parseFloat(pct);
pct = isNaN(pct) ? '0' : (Math.round(pct*100)/100);
html += '<td style="font-size:10pt;"><i>' + msg + '</i></td>';
html += '<td class="dsptPct" style="font-size:12pt;font-weight:bold;">' + pct + '<span style="font-size:12pt;">'+units+'</span></td>';
var pos = (pivot.queryCalls % 10) * 10;
html += '<td style="width:100px;border:1px solid darkblue;overflow:hidden;"><div style="border:1px solid #808080;border-radius:3px; background:rgb(47,98,128); color:rgb(47,98,128); font-size: 8pt; width:10px; left:'+pos+'px;position:relative;">X</div></td>';
}
html += '</tr></table>';
div.innerHTML = html;
div.style.display = 'block';
}
}

self._DeepSee_Component_pivotController_swapRows = function() {
this.getPivotTable().swapRowsAndColumns();
var icon = this.findElement('icSwap');
if (icon) {
this._swapAngle = (null == this._swapAngle) ? 360 : this._swapAngle+360;
icon.style.WebkitTransform='rotate('+this._swapAngle+'deg)';
}
}

self._DeepSee_Component_pivotController_updateIcon = function(id,enabled,image,hlp) {
var icon = this.findElement(id);
if (icon) {
icon.className = enabled ? 'dsptIcon' : 'dsptIconDisabled';
if (image) {
icon.src = this.getIcon(image);
}
if (hlp) {
icon.title = hlp;
}
}
}

self._DeepSee_Component_pivotController_updateState = function(which) {
which = zenGet(which);
var pivot = this.pivotTable;
pivot.SetCurrentQueryText('current',pivot.SynthesizeMDX());
pivot.SetCurrentQueryText('resolved',pivot.SynthesizeMDX());
var manual = pivot.dataSource == 'manual';
this.updateToolbar();
var div = this.findElement('rowsTD');
div.style.background = manual ? '#F0F0F0' : '';
if (div && (which==''||which=='rows')) {
div.innerHTML = this.getRowsHTML();
}
var div = this.findElement('columnsTD');
div.style.background = manual ? '#F0F0F0' : '';
if (div && (which==''||which=='cols')) {
div.innerHTML = this.getColumnsHTML();
}
var div = this.findElement('measuresTD');
div.style.background = manual ? '#F0F0F0' : '';
if (div && (which==''||which=='msrs')) {
div.innerHTML = this.getMeasuresHTML();
}
var div = this.findElement('filtersTD');
if (div && (which==''||which=='filters')) {
div.innerHTML = this.getFiltersHTML();
}
var div = this.findElement('fieldsTD');
if (div && (which==''||which=='fields')) {
div.innerHTML = this.getFieldsHTML();
}
var div = this.findElement('drillLevels');
if (div && (which=='')) {
div.innerHTML = this.getDrillLevelHTML();
}
if (zenPage.setModified) {
zenPage.setModified(true);
}
}

self._DeepSee_Component_pivotController_updateToolbar = function() {
var hlpDrill = $$$Text("Show a detail listing for the current selected cell(s)");
var hlpPivot = $$$Text("Show the pivot table");
var hlpAutoExecOn = $$$Text("Turn on auto-execute mode");
var hlpAutoExecOff = $$$Text("Turn off auto-execute mode");
if (zenPage.showDimensionTree) {
var span = self.document.getElementById('dimArrow');
if (span) {
span.innerHTML = zenPage.showDimensions ? '&#171;' : '&#187;';
}
}
var pivot = this.pivotTable;
this.updateIcon('icBack',pivot.canGoBack());
this.updateIcon('icFwd',pivot.canGoForward());
var icon = pivot.changesPending ? 'iconRefresh24on' : 'iconRefresh24';
this.updateIcon('icRefresh',true,icon);
var divPivot = this.findElement('pivotColumns');
var divListing = this.findElement('listingColumns');
if (pivot.isDrillThrough && pivot.canUseListingFields) {
if (divPivot) {
divPivot.style.display = 'none';
}
if (divListing) {
divListing.style.display = 'block';
}
}
else {
if (divPivot) {
divPivot.style.display = 'block';
}
if (divListing) {
divListing.style.display = 'none';
}
}
var enb = (this.selectedColumn!='');
this.updateIcon('icCopy',enb);
var enb = this._clipboard&&this.selectedColumn!='';
this.updateIcon('icPaste',enb);
var enb = this._clipboard&&(this.selectedColumn=='rows'||this.selectedColumn=='cols')&&this.selectedItem!='';
this.updateIcon('icPasteDown',enb);
var enb = ((pivot.drillLevels.length==0)&&((pivot.rowLevels&&pivot.rowLevels.length>0)||(pivot.columnLevels&&pivot.columnLevels.length>0)));
this.updateIcon('icSwap',enb);
var icon = pivot.dataSource=='automatic' ? 'iconScript24' : 'iconScript24on';
this.updateIcon('icQuery',true,icon);
var icon = pivot.isDrillThrough ? 'iconListing24On':'iconListing24';
var enb = pivot.isDrillThrough ? true : ''!==pivot.selectedRange;
var hlp = pivot.isDrillThrough ? hlpPivot : hlpDrill;
this.updateIcon('icListing',enb,icon,hlp);
this.updateIcon('icBreakdown',''!==pivot.selectedRange);
var icon = pivot.hasFormatRules() ? 'iconFormat24on' : 'iconFormat24';
this.updateIcon('icFormat',true,icon);
var icon = pivot.autoExecute ? 'iconAutoExec24on' : 'iconAutoExec24';
var hlp = pivot.autoExecute ? hlpAutoExecOff : hlpAutoExecOn;
this.updateIcon('icAutoExec',true,icon,hlp);
}

self._DeepSee_Component_pivotController_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._DeepSee_Component_pivotController__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_DeepSee_Component_pivotController.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _DeepSee_Component_pivotController.prototype;
	if (null==p) {return;}
	p.constructor = _DeepSee_Component_pivotController;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%DeepSee.Component.pivotController';
	p._type = 'pivotController';
	p.serialize = _DeepSee_Component_pivotController_serialize;
	p.getSettings = _DeepSee_Component_pivotController_getSettings;
	p.ReallyRefreshContents = _DeepSee_Component_pivotController_ReallyRefreshContents;
	p.addBlankLevel = _DeepSee_Component_pivotController_addBlankLevel;
	p.addChildToElement = _DeepSee_Component_pivotController_addChildToElement;
	p.addLevel = _DeepSee_Component_pivotController_addLevel;
	p.buildIconList = _DeepSee_Component_pivotController_buildIconList;
	p.clearLevels = _DeepSee_Component_pivotController_clearLevels;
	p.copyItem = _DeepSee_Component_pivotController_copyItem;
	p.drillThrough = _DeepSee_Component_pivotController_drillThrough;
	p.dropStartHandler = _DeepSee_Component_pivotController_dropStartHandler;
	p.enableItem = _DeepSee_Component_pivotController_enableItem;
	p.getColumnsHTML = _DeepSee_Component_pivotController_getColumnsHTML;
	p.getDrillLevelHTML = _DeepSee_Component_pivotController_getDrillLevelHTML;
	p.getDropdownIconHTML = _DeepSee_Component_pivotController_getDropdownIconHTML;
	p.getFieldsHTML = _DeepSee_Component_pivotController_getFieldsHTML;
	p.getFiltersHTML = _DeepSee_Component_pivotController_getFiltersHTML;
	p.getHeaderHTML = _DeepSee_Component_pivotController_getHeaderHTML;
	p.getIcon = _DeepSee_Component_pivotController_getIcon;
	p.getIconHTML = _DeepSee_Component_pivotController_getIconHTML;
	p.getLevelHTML = _DeepSee_Component_pivotController_getLevelHTML;
	p.getMeasuresHTML = _DeepSee_Component_pivotController_getMeasuresHTML;
	p.getPivotTable = _DeepSee_Component_pivotController_getPivotTable;
	p.getRowsHTML = _DeepSee_Component_pivotController_getRowsHTML;
	p.gotoDrillLevel = _DeepSee_Component_pivotController_gotoDrillLevel;
	p.hideMessage = _DeepSee_Component_pivotController_hideMessage;
	p.isValidFilter = _DeepSee_Component_pivotController_isValidFilter;
	p.itemCanMoveDown = _DeepSee_Component_pivotController_itemCanMoveDown;
	p.itemCanMoveUp = _DeepSee_Component_pivotController_itemCanMoveUp;
	p.moveItemDown = _DeepSee_Component_pivotController_moveItemDown;
	p.moveItemUp = _DeepSee_Component_pivotController_moveItemUp;
	p.onPopupAction = _DeepSee_Component_pivotController_onPopupAction;
	p.onloadHandler = _DeepSee_Component_pivotController_onloadHandler;
	p.pasteItem = _DeepSee_Component_pivotController_pasteItem;
	p.removeDrillLevel = _DeepSee_Component_pivotController_removeDrillLevel;
	p.removeLevel = _DeepSee_Component_pivotController_removeLevel;
	p.renderContents = _DeepSee_Component_pivotController_renderContents;
	p.resetTable = _DeepSee_Component_pivotController_resetTable;
	p.selectItem = _DeepSee_Component_pivotController_selectItem;
	p.setAxisOptions = _DeepSee_Component_pivotController_setAxisOptions;
	p.setFilterOptions = _DeepSee_Component_pivotController_setFilterOptions;
	p.setLevelOptions = _DeepSee_Component_pivotController_setLevelOptions;
	p.setProperty = _DeepSee_Component_pivotController_setProperty;
	p.showMessage = _DeepSee_Component_pivotController_showMessage;
	p.swapRows = _DeepSee_Component_pivotController_swapRows;
	p.updateIcon = _DeepSee_Component_pivotController_updateIcon;
	p.updateState = _DeepSee_Component_pivotController_updateState;
	p.updateToolbar = _DeepSee_Component_pivotController_updateToolbar;
}

self._zenClassIdx['http://www.intersystems.com/deepsee/pivotTable'] = '_DeepSee_Component_pivotTable';
self._DeepSee_Component_pivotTable = function(index,id) {
	if (index>=0) {_DeepSee_Component_pivotTable__init(this,index,id);}
}

self._DeepSee_Component_pivotTable__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.LastCube = '';
	o.LastQueryKey = '';
	o.LastSessionKey = '0';
	o.absolutePositioning = '0';
	o.allowPreviewInteraction = true;
	o.analyzerMode = false;
	o.autoExecute = true;
	o.backgroundImage = '';
	o.backgroundOpacity = '.12';
	o.borderBottomCell = '';
	o.borderBottomCol = '';
	o.borderBottomRow = '';
	o.borderLeftCell = '';
	o.borderLeftCol = '';
	o.borderLeftRow = '';
	o.borderRightCell = '';
	o.borderRightCol = '';
	o.borderRightRow = '';
	o.borderTopCell = '';
	o.borderTopCol = '';
	o.borderTopRow = '';
	o.calculatedMembers = new Array();
	o.canDrillDown = true;
	o.canUseListingFields = false;
	o.caption = '';
	o.cellCount = '';
	o.cellHeight = '22';
	o.cellStyle = '';
	o.cellWidth = '120';
	o.changesPending = false;
	o.colorScale = '';
	o.columnAxisOptions = null;
	o.columnCount = '';
	o.columnHeaderStyle = '';
	o.columnLabelSpan = true;
	o.columnLevels = new Array();
	o.columnList = '';
	o.columnTotalAgg = 'sum';
	o.columnTotals = false;
	o.columnsTruncated = '0';
	o.contextFilterSpec = '';
	o.crossJoinRowLimit = '2000';
	o.cubeKey = '';
	o.cubeName = '';
	o.currListingPage = '-1';
	o.currPage = '1';
	o.currentQueryText = new Object();
	o.data = '';
	o.dataSource = 'automatic';
	o.dataSourceName = '';
	o.defaultListing = '';
	o.drillLevels = new Array();
	o.drillRowNumbers = new Array();
	o.enclosingClass = 'dsPivotEnclosingDiv';
	o.evenRowStyle = '';
	o.filterTableCaptionStyle = '';
	o.filterTableItemStyle = '';
	o.filterTableStyle = '';
	o.filters = new Array();
	o.fontFamilyCell = '';
	o.fontFamilyCol = '';
	o.fontFamilyRow = '';
	o.fontSizeCell = '';
	o.fontSizeCol = '';
	o.fontSizeRow = '';
	o.formatRules = new Array();
	o.headFunctionAdded = false;
	o.hiddenMeasureText = new Array();
	o.hideMeasures = '1';
	o.initialExecute = true;
	o.isDrillThrough = false;
	o.isPaging = false;
	o.jsonRows = '2500';
	o.kpi = '';
	o.listing = '';
	o.listingEnabled = true;
	o.listingFields = new Array();
	o.listingFilters = new Array();
	o.listingFontSize = '';
	o.listingKey = '';
	o.listingPageSize = '100';
	o.listingRowCount = '';
	o.listingRows = '';
	o.listingSelect = '';
	o.listingSortColumn = '0';
	o.listingSortDir = 'ASC';
	o.listingType = 'table';
	o.maxChartSize = '400';
	o.maxRows = '';
	o.mdx = ''; // encrypted
	o.measureLocation = 'columns';
	o.measures = new Array();
	o.nowDisplayFormat = '';
	o.oncellClick = '';
	o.oncellDblClick = '';
	o.ondrill = '';
	o.onlistingSelect = '';
	o.overrideColumnSpec = '';
	o.overrideColumnText = '';
	o.overrideRowSpec = '';
	o.overrideRowText = '';
	o.pageSize = '100';
	o.parameters = new Object();
	o.pivotNonce = '886737057';
	o.pivotSelect = '';
	o.pivotVariables = new Object();
	o.previewMode = false;
	o.previewRowCount = '25';
	o.printCellWidth = '';
	o.printLabelWidth = '';
	o.printMarginBottom = '';
	o.printMarginLeft = '';
	o.printMarginRight = '';
	o.printMarginTop = '';
	o.printOrientation = '1';
	o.printPageSize = '';
	o.printSubtitle = '';
	o.printSubtitleOn = '';
	o.printTitle = '';
	o.progressMessage = '';
	o.queryCalls = '';
	o.queryComplete = '';
	o.queryKey = '';
	o.queryPending = false;
	o.queryStatus = '0';
	o.reinitialized = false;
	o.resolvedQueryText = new Object();
	o.rowAxisOptions = null;
	o.rowCaptionList = new Array();
	o.rowCaptionText = '';
	o.rowCount = '';
	o.rowHeaderStyle = '';
	o.rowLabelSpan = true;
	o.rowLevels = new Array();
	o.rowTotalAgg = 'sum';
	o.rowTotalSource = 'page';
	o.rowTotals = false;
	o.rowsTruncated = false;
	o.selectedCellBackground = 'rgb(47,98,128)';
	o.selectedCellColor = 'white';
	o.selectedRange = '';
	o.selectedRowValues = '';
	o.showDate = '';
	o.showEmptyColumns = false;
	o.showEmptyRows = false;
	o.showFilters = '';
	o.showListingFilters = '';
	o.showPivot = true;
	o.showPivotStats = true;
	o.showPlan = false;
	o.showQuery = false;
	o.showRowCaption = true;
	o.showStatus = true;
	o.showUser = '';
	o.showZebra = false;
	o.showZebraStripes = '';
	o.singleTable = false;
	o.sortColumn = '0';
	o.sortDir = 'ASC';
	o.sqlRestriction = '';
	o.staleCache = false;
	o.tableStyle = 'background-color:white';
	o.totalValue = '';
	o.userMDX = '';
	o.valueColumn = '';
}
function _DeepSee_Component_pivotTable_serialize(set,s)
{
	var o = this;s[0]='1337331493';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.LastCube;s[7]=o.LastQueryKey;s[8]=o.LastSessionKey;s[9]=o.absolutePositioning;s[10]=o.align;s[11]=(o.allowPreviewInteraction?1:0);s[12]=(o.analyzerMode?1:0);s[13]=(o.autoExecute?1:0);s[14]=o.aux;s[15]=o.backgroundImage;s[16]=o.backgroundOpacity;s[17]=o.borderBottomCell;s[18]=o.borderBottomCol;s[19]=o.borderBottomRow;s[20]=o.borderLeftCell;s[21]=o.borderLeftCol;s[22]=o.borderLeftRow;s[23]=o.borderRightCell;s[24]=o.borderRightCol;s[25]=o.borderRightRow;s[26]=o.borderTopCell;s[27]=o.borderTopCol;s[28]=o.borderTopRow;s[29]=set.serializeList(o,o.calculatedMembers,true,'calculatedMembers');s[30]=(o.canDrillDown?1:0);s[31]=(o.canUseListingFields?1:0);s[32]=o.caption;s[33]=o.cellCount;s[34]=o.cellHeight;s[35]=o.cellStyle;s[36]=o.cellWidth;s[37]=(o.changesPending?1:0);s[38]=o.colorScale;s[39]=set.addObject(o.columnAxisOptions,'columnAxisOptions');s[40]=o.columnCount;s[41]=o.columnHeaderStyle;s[42]=(o.columnLabelSpan?1:0);s[43]=set.serializeList(o,o.columnLevels,true,'columnLevels');s[44]=o.columnList;s[45]=o.columnTotalAgg;s[46]=(o.columnTotals?1:0);s[47]=o.columnsTruncated;s[48]=o.containerStyle;s[49]=o.contextFilterSpec;s[50]=o.crossJoinRowLimit;s[51]=o.cubeKey;s[52]=o.cubeName;s[53]=o.currListingPage;s[54]=o.currPage;s[55]=set.serializeArray(o,o.currentQueryText,true,'currentQueryText');s[56]=o.data;s[57]=o.dataSource;s[58]=o.dataSourceName;s[59]=o.defaultListing;s[60]=(o.dragEnabled?1:0);s[61]=set.serializeList(o,o.drillLevels,true,'drillLevels');s[62]=set.serializeList(o,o.drillRowNumbers,false,'drillRowNumbers');s[63]=(o.dropEnabled?1:0);s[64]=(o.dynamic?1:0);s[65]=o.enclosingClass;s[66]=o.enclosingStyle;s[67]=o.error;s[68]=o.evenRowStyle;s[69]=o.filterTableCaptionStyle;s[70]=o.filterTableItemStyle;s[71]=o.filterTableStyle;s[72]=set.serializeList(o,o.filters,true,'filters');s[73]=o.fontFamilyCell;s[74]=o.fontFamilyCol;s[75]=o.fontFamilyRow;s[76]=o.fontSizeCell;s[77]=o.fontSizeCol;s[78]=o.fontSizeRow;s[79]=set.serializeList(o,o.formatRules,true,'formatRules');s[80]=(o.headFunctionAdded?1:0);s[81]=o.height;s[82]=(o.hidden?1:0);s[83]=set.serializeList(o,o.hiddenMeasureText,false,'hiddenMeasureText');s[84]=o.hideMeasures;s[85]=o.hint;s[86]=o.hintClass;s[87]=o.hintStyle;s[88]=(o.initialExecute?1:0);s[89]=(o.isDrillThrough?1:0);s[90]=(o.isPaging?1:0);s[91]=o.jsonRows;s[92]=o.kpi;s[93]=o.label;s[94]=o.labelClass;s[95]=o.labelDisabledClass;s[96]=o.labelStyle;s[97]=o.listing;s[98]=(o.listingEnabled?1:0);s[99]=set.serializeList(o,o.listingFields,true,'listingFields');s[100]=set.serializeList(o,o.listingFilters,true,'listingFilters');s[101]=o.listingFontSize;s[102]=o.listingKey;s[103]=o.listingPageSize;s[104]=o.listingRowCount;s[105]=o.listingRows;s[106]=o.listingSelect;s[107]=o.listingSortColumn;s[108]=o.listingSortDir;s[109]=o.listingType;s[110]=o.maxChartSize;s[111]=o.maxRows;s[112]=o.mdx;s[113]=o.measureLocation;s[114]=set.serializeList(o,o.measures,true,'measures');s[115]=o.nowDisplayFormat;s[116]=o.onafterdrag;s[117]=o.onbeforedrag;s[118]=o.oncellClick;s[119]=o.oncellDblClick;s[120]=o.ondrag;s[121]=o.ondrill;s[122]=o.ondrop;s[123]=o.onhide;s[124]=o.onlistingSelect;s[125]=o.onrefresh;s[126]=o.onshow;s[127]=o.onupdate;s[128]=o.overlayMode;s[129]=o.overrideColumnSpec;s[130]=o.overrideColumnText;s[131]=o.overrideRowSpec;s[132]=o.overrideRowText;s[133]=o.pageSize;s[134]=set.serializeArray(o,o.parameters,true,'parameters');s[135]=o.pivotNonce;s[136]=o.pivotSelect;s[137]=set.serializeArray(o,o.pivotVariables,false,'pivotVariables');s[138]=(o.previewMode?1:0);s[139]=o.previewRowCount;s[140]=o.printCellWidth;s[141]=o.printLabelWidth;s[142]=o.printMarginBottom;s[143]=o.printMarginLeft;s[144]=o.printMarginRight;s[145]=o.printMarginTop;s[146]=o.printOrientation;s[147]=o.printPageSize;s[148]=o.printSubtitle;s[149]=o.printSubtitleOn;s[150]=o.printTitle;s[151]=o.progressMessage;s[152]=o.queryCalls;s[153]=o.queryComplete;s[154]=o.queryKey;s[155]=(o.queryPending?1:0);s[156]=o.queryStatus;s[157]=(o.reinitialized?1:0);s[158]=o.renderFlag;s[159]=set.serializeArray(o,o.resolvedQueryText,true,'resolvedQueryText');s[160]=set.addObject(o.rowAxisOptions,'rowAxisOptions');s[161]=set.serializeList(o,o.rowCaptionList,false,'rowCaptionList');s[162]=o.rowCaptionText;s[163]=o.rowCount;s[164]=o.rowHeaderStyle;s[165]=(o.rowLabelSpan?1:0);s[166]=set.serializeList(o,o.rowLevels,true,'rowLevels');s[167]=o.rowTotalAgg;s[168]=o.rowTotalSource;s[169]=(o.rowTotals?1:0);s[170]=(o.rowsTruncated?1:0);s[171]=o.selectedCellBackground;s[172]=o.selectedCellColor;s[173]=o.selectedRange;s[174]=o.selectedRowValues;s[175]=o.showDate;s[176]=(o.showEmptyColumns?1:0);s[177]=(o.showEmptyRows?1:0);s[178]=o.showFilters;s[179]=(o.showLabel?1:0);s[180]=o.showListingFilters;s[181]=(o.showPivot?1:0);s[182]=(o.showPivotStats?1:0);s[183]=(o.showPlan?1:0);s[184]=(o.showQuery?1:0);s[185]=(o.showRowCaption?1:0);s[186]=(o.showStatus?1:0);s[187]=o.showUser;s[188]=(o.showZebra?1:0);s[189]=o.showZebraStripes;s[190]=(o.singleTable?1:0);s[191]=o.slice;s[192]=o.sortColumn;s[193]=o.sortDir;s[194]=o.sqlRestriction;s[195]=(o.staleCache?1:0);s[196]=o.tableStyle;s[197]=o.title;s[198]=o.totalValue;s[199]=o.tuple;s[200]=o.userMDX;s[201]=o.valign;s[202]=o.valueColumn;s[203]=(o.visible?1:0);s[204]=o.width;
}
function _DeepSee_Component_pivotTable_getSettings(s)
{
	s['name'] = 'string';
	s['LastCube'] = 'string';
	s['LastQueryKey'] = 'string';
	s['LastSessionKey'] = 'integer';
	s['absolutePositioning'] = 'string';
	s['allowPreviewInteraction'] = 'boolean';
	s['analyzerMode'] = 'boolean';
	s['autoExecute'] = 'boolean';
	s['backgroundImage'] = 'uri';
	s['backgroundOpacity'] = 'float';
	s['borderBottomCell'] = 'string';
	s['borderBottomCol'] = 'string';
	s['borderBottomRow'] = 'string';
	s['borderLeftCell'] = 'string';
	s['borderLeftCol'] = 'string';
	s['borderLeftRow'] = 'string';
	s['borderRightCell'] = 'string';
	s['borderRightCol'] = 'string';
	s['borderRightRow'] = 'string';
	s['borderTopCell'] = 'string';
	s['borderTopCol'] = 'string';
	s['borderTopRow'] = 'string';
	s['calculatedMembers'] = 'string';
	s['caption'] = 'string';
	s['cellHeight'] = 'integer';
	s['cellStyle'] = 'style';
	s['cellWidth'] = 'integer';
	s['changesPending'] = 'boolean';
	s['colorScale'] = 'string';
	s['columnAxisOptions'] = 'string';
	s['columnHeaderStyle'] = 'style';
	s['columnLabelSpan'] = 'boolean';
	s['columnLevels'] = 'string';
	s['columnList'] = 'csv';
	s['columnTotalAgg'] = 'string';
	s['columnTotals'] = 'boolean';
	s['contextFilterSpec'] = 'string';
	s['crossJoinRowLimit'] = 'integer';
	s['cubeName'] = 'className';
	s['currListingPage'] = 'integer';
	s['currPage'] = 'integer';
	s['currentQueryText'] = 'string';
	s['dataSource'] = 'enum:manual,automatic';
	s['dataSourceName'] = 'string';
	s['defaultListing'] = 'string';
	s['drillLevels'] = 'string';
	s['drillRowNumbers'] = 'string';
	s['evenRowStyle'] = 'style';
	s['filterTableCaptionStyle'] = 'style';
	s['filterTableItemStyle'] = 'style';
	s['filterTableStyle'] = 'style';
	s['filters'] = 'string';
	s['fontFamilyCell'] = 'string';
	s['fontFamilyCol'] = 'string';
	s['fontFamilyRow'] = 'string';
	s['fontSizeCell'] = 'string';
	s['fontSizeCol'] = 'string';
	s['fontSizeRow'] = 'string';
	s['formatRules'] = 'string';
	s['headFunctionAdded'] = 'boolean';
	s['hiddenMeasureText'] = 'string';
	s['hideMeasures'] = 'string';
	s['initialExecute'] = 'boolean';
	s['isPaging'] = 'boolean';
	s['jsonRows'] = 'integer';
	s['kpi'] = 'string';
	s['listing'] = 'string';
	s['listingEnabled'] = 'boolean';
	s['listingFields'] = 'string';
	s['listingFilters'] = 'string';
	s['listingFontSize'] = 'string';
	s['listingPageSize'] = 'integer';
	s['listingRows'] = 'integer';
	s['listingSelect'] = 'enum:single,multi';
	s['listingSortColumn'] = 'integer';
	s['listingSortDir'] = 'enum:SC,DESC';
	s['listingType'] = 'enum:table,map';
	s['maxChartSize'] = 'integer';
	s['maxRows'] = 'integer';
	s['measureLocation'] = 'enum:ows,columns';
	s['measures'] = 'string';
	s['nowDisplayFormat'] = 'string';
	s['oncellClick'] = 'eventHandler';
	s['oncellDblClick'] = 'eventHandler';
	s['ondrill'] = 'eventHandler';
	s['onlistingSelect'] = 'eventHandler';
	s['overrideColumnSpec'] = 'string';
	s['overrideColumnText'] = 'string';
	s['overrideRowSpec'] = 'string';
	s['overrideRowText'] = 'string';
	s['pageSize'] = 'integer';
	s['parameters'] = 'string';
	s['pivotSelect'] = 'enum:single,multi';
	s['pivotVariables'] = 'string';
	s['previewMode'] = 'boolean';
	s['previewRowCount'] = 'integer';
	s['printCellWidth'] = 'float';
	s['printLabelWidth'] = 'float';
	s['printMarginBottom'] = 'float';
	s['printMarginLeft'] = 'float';
	s['printMarginRight'] = 'float';
	s['printMarginTop'] = 'float';
	s['printOrientation'] = 'string';
	s['printPageSize'] = 'string';
	s['printSubtitle'] = 'string';
	s['printSubtitleOn'] = 'string';
	s['printTitle'] = 'string';
	s['progressMessage'] = 'string';
	s['reinitialized'] = 'boolean';
	s['resolvedQueryText'] = 'string';
	s['rowAxisOptions'] = 'string';
	s['rowCaptionList'] = 'string';
	s['rowHeaderStyle'] = 'style';
	s['rowLabelSpan'] = 'boolean';
	s['rowLevels'] = 'string';
	s['rowTotalAgg'] = 'string';
	s['rowTotalSource'] = 'string';
	s['rowTotals'] = 'boolean';
	s['rowsTruncated'] = 'boolean';
	s['selectedCellBackground'] = 'style';
	s['selectedCellColor'] = 'style';
	s['selectedRange'] = 'csv';
	s['showDate'] = 'string';
	s['showEmptyColumns'] = 'boolean';
	s['showEmptyRows'] = 'boolean';
	s['showFilters'] = 'string';
	s['showListingFilters'] = 'string';
	s['showPivot'] = 'boolean';
	s['showPivotStats'] = 'boolean';
	s['showPlan'] = 'boolean';
	s['showQuery'] = 'boolean';
	s['showRowCaption'] = 'boolean';
	s['showStatus'] = 'boolean';
	s['showUser'] = 'string';
	s['showZebra'] = 'boolean';
	s['showZebraStripes'] = 'string';
	s['singleTable'] = 'boolean';
	s['sortColumn'] = 'integer';
	s['sortDir'] = 'enum:SC,DESC';
	s['sqlRestriction'] = 'string';
	s['staleCache'] = 'boolean';
	s['tableStyle'] = 'style';
	s['valueColumn'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._DeepSee_Component_pivotTable_absoluteAdjustLayout = function() {
try {
var enc = this.getEnclosingDiv();
var outer = this.findElement('outerDiv');
var singleTable = this.findElement('dsPivotCompleteTable');
var singleTableDiv = this.findElement('dsPivotCompleteTableDiv');
var vtScroll = this.findElement('vtScroll');
var hzScroll = this.findElement('hzScroll');
var vtScrollInner = this.findElement('vtScrollInner');
var hzScrollInner = this.findElement('hzScrollInner');
var errorDiv = this.findElement('errorDiv');
var	status = this.findElement('statusDiv');
var dataTable = this.findElement('dataTable');
var dataTableDiv = this.findElement('dataTableDiv');
var sideTable = this.findElement('sideTable');
var topTable = this.findElement('topTable');
var nubTable = this.findElement('nubTable');
var adjustArray=[];
var topHeights=[];
var topWidths=[];
var topOffsets = undefined;		// DTB842 - Offsets will be initialized on the first pass of the loop
var multipleRows=0;
var maxRow=0;
var childOffsetWidth="";
var childOffsetHeight="";
var parentOffsetWidth="";
var parentOffsetHeight="";
if (topTable) {		// DTB867 - Test for existence of the topTable
for (var cell=0;cell<topTable.children.length;cell++) {
var tempNew = topTable.children[cell];
var tempOld = document.getElementById(tempNew.id.substring(3,tempNew.id.length));
if ((tempNew) && (tempOld)) {
if ((childOffsetHeight=="") && (childOffsetWidth=="")) {
var childOffsetStyle=window.getComputedStyle(tempOld.children[0].children[0]);
childOffsetHeight=parseInt(childOffsetStyle.paddingTop)+parseInt(childOffsetStyle.paddingBottom);
childOffsetWidth=parseInt(childOffsetStyle.paddingRight)+parseInt(childOffsetStyle.paddingLeft);
}
if ((parentOffsetHeight=="") && (parentOffsetWidth=="")) {
var parentOffsetStyle=window.getComputedStyle(tempOld);
parentOffsetHeight=parseInt(parentOffsetStyle.borderTopWidth)+parseInt(parentOffsetStyle.borderBottomWidth);
parentOffsetWidth=parseInt(parentOffsetStyle.borderRightWidth)+parseInt(parentOffsetStyle.borderLeftWidth);
}
var idArray=tempOld.id.split("_");
if (idArray[0]=="coltotal") {
var colNum=101;
var rowNum=maxRow;
for (r=rowNum;r>=1;r--) {
topOffsets[r][colNum] = topOffsets[r][topOffsets[r].length-1];		// DTB850 - Set the column total offset to be the final offset previously logged
}
} else {
var colNum=parseInt(idArray[1].split(":")[1]);
var rowNum=parseInt(idArray[1].split(":")[0]);
}
if (!(topOffsets)) {
topOffsets = [];
for (r=rowNum;r>=1;r--) {
topOffsets[r] = [];
topOffsets[r][colNum] = 0;
}
}
var rect=tempOld.getBoundingClientRect()
tempWidth=rect.width;
tempHeight=rect.height;
var tempAdjust={};
tempAdjust.id=tempNew.id;
tempAdjust.height=tempHeight-parentOffsetHeight;
tempAdjust.width=tempWidth-parentOffsetWidth;
tempAdjust.left=topOffsets[rowNum][colNum];		// DTB842 - Directly look up the offset for this cell
tempAdjust.offsetHeight=childOffsetHeight;
tempAdjust.offsetWidth=childOffsetWidth;
adjustArray.push(tempAdjust);
colSpan=tempOld.colSpan ? parseInt(tempOld.colSpan) : 1;
rowSpan=tempOld.rowSpan ? parseInt(tempOld.rowSpan) : 1;
multipleRows = rowNum>1 ? 1 : multipleRows;
maxRow = rowNum>maxRow ? rowNum: maxRow;
for (var r=rowNum;r>=1;r--) {
topOffsets[r][colNum+colSpan] = topOffsets[r][colNum] + tempWidth
}
for (var r=rowNum;r>(rowNum-rowSpan);r--) {
if (topWidths[r]) {
topWidths[r]+=tempWidth;
} else {
topWidths[r]=tempWidth;
}
}
for (var c=colNum;c<(colNum+colSpan);c++) {
if (!topHeights[c]) {
topHeights[c]=[];
}
topHeights[c][rowNum]=tempHeight;
}
}
}
}
if (multipleRows) {
var childrenLength=topTable.children.length;
for (var cell=childrenLength-1;cell>=0;cell--) {
var tempNew = topTable.children[cell];
var tempOld = document.getElementById(tempNew.id.substring(3,tempNew.id.length));
if ((tempNew) && (tempOld)) {
var idArray=tempOld.id.split("_");
if (idArray[0]=="coltotal") {
var colNum=101;
var rowNum=maxRow;
} else {
var colNum=parseInt(idArray[1].split(":")[1]);
var rowNum=parseInt(idArray[1].split(":")[0]);
}
var tempHeight=0;
for (var r=rowNum+1;r<topHeights[colNum].length;r++) {
tempHeight+=topHeights[colNum][r];
}
adjustArray[adjustArray.length-(adjustArray.length-cell)].top=tempHeight;
}
}
}
var totalLeft=0;
if (nubTable) {		// DTB783 - Test for existence of the nubTable
for (var cell=0;cell<nubTable.children[0].children.length;cell++) {
var tempNew = nubTable.children[0].children[cell];
var tempOld = document.getElementById(tempNew.id.substring(3,tempNew.id.length));
if ((tempNew) && (tempOld)) {
var offsetStyle=window.getComputedStyle(tempNew);
offsetHeight=parseInt(offsetStyle.borderTopWidth)+parseInt(offsetStyle.borderBottomWidth)+parseInt(offsetStyle.paddingTop)+parseInt(offsetStyle.paddingBottom);
offsetWidth=parseInt(offsetStyle.borderRightWidth)+parseInt(offsetStyle.borderLeftWidth)+parseInt(offsetStyle.paddingRight)+parseInt(offsetStyle.paddingLeft);
var rect=tempOld.getBoundingClientRect()
tempWidth=rect.width;
tempHeight=rect.height;
var tempAdjust={};
tempAdjust.id=tempNew.id;
tempAdjust.height=tempHeight;
tempAdjust.width=tempWidth;
tempAdjust.left=totalLeft;
tempAdjust.offsetHeight=offsetHeight;
tempAdjust.offsetWidth=offsetWidth;
adjustArray.push(tempAdjust);
totalLeft+=tempWidth;
}
}
}
var sideHeights=[];
var sideWidths=[];
var multipleCols=0;
var maxCol=0;
var childOffsetWidth="";
var childOffsetHeight="";
var parentOffsetWidth="";
var parentOffsetHeight="";
if (sideTable) {		// DTB783 - Test for existence of the sideTable
for (var cell=0;cell<sideTable.children.length;cell++) {
var tempNew = sideTable.children[cell];
var tempOld = document.getElementById(tempNew.id.substring(3,tempNew.id.length));
if ((tempNew) && (tempOld)) {
if ((childOffsetHeight=="") && (childOffsetWidth=="")) {
var childOffsetStyle=window.getComputedStyle(tempOld.children[0]);
childOffsetHeight=parseInt(childOffsetStyle.paddingTop)+parseInt(childOffsetStyle.paddingBottom);
childOffsetWidth=parseInt(childOffsetStyle.paddingRight)+parseInt(childOffsetStyle.paddingLeft);
}
if ((parentOffsetHeight=="") && (parentOffsetWidth=="")) {
var parentOffsetStyle=window.getComputedStyle(tempOld);
parentOffsetHeight=parseInt(parentOffsetStyle.borderTopWidth)+parseInt(parentOffsetStyle.borderBottomWidth);
parentOffsetWidth=parseInt(parentOffsetStyle.borderRightWidth)+parseInt(parentOffsetStyle.borderLeftWidth);
}
var idArray=tempOld.id.split("_");
if (idArray[0]=="rowtotal") {
var colNum=maxCol;
var rowNum = (this.currPage*100)+1;		// DTB861 - Assign a row total just after the final row ID for the current page
} else {
var colNum=parseInt(idArray[1].split(":")[0]);
var rowNum=parseInt(idArray[1].split(":")[1]);
}
var rect=tempOld.getBoundingClientRect()
tempWidth=rect.width;
tempHeight=rect.height;
var tempAdjust={};
tempAdjust.id=tempNew.id;
tempAdjust.height=tempHeight-parentOffsetHeight;
tempAdjust.width=tempWidth-parentOffsetWidth;
tempAdjust.top=sideHeights[colNum];
tempAdjust.offsetHeight=childOffsetHeight;
tempAdjust.offsetWidth=childOffsetWidth;
adjustArray.push(tempAdjust);
colSpan=tempOld.colSpan ? parseInt(tempOld.colSpan) : 1;
rowSpan=tempOld.rowSpan ? parseInt(tempOld.rowSpan) : 1;
multipleCols = colNum>1 ? 1 : multipleCols;
maxCol = colNum>maxCol ? colNum : maxCol;
for (var c=colNum;c>(colNum-colSpan);c--) {
if (sideHeights[c]) {
sideHeights[c]+=tempHeight;
} else {
sideHeights[c]=tempHeight;
}
}
for (var r=rowNum;r<(rowNum+rowSpan);r++) {
if (!sideWidths[r]) {
sideWidths[r]=[];
}
sideWidths[r][colNum]=tempWidth;
}
}
}
}
if (multipleCols) {
var childrenLength=sideTable.children.length;
for (var cell=0;cell<sideTable.children.length;cell++) {
var tempNew = sideTable.children[cell];
var tempOld = document.getElementById(tempNew.id.substring(3,tempNew.id.length));
if ((tempNew) && (tempOld)) {
var idArray=tempOld.id.split("_");
if (idArray[0]=="rowtotal") {
var colNum=maxCol;
var rowNum = (this.currPage*100)+1;		// DTB861 - Assign a row total just after the final row ID for the current page
} else {
var colNum=parseInt(idArray[1].split(":")[0]);
var rowNum=parseInt(idArray[1].split(":")[1]);
}
var tempLeft=0;
for (var c=colNum+1;c<sideWidths[rowNum].length;c++) {
tempLeft+=sideWidths[rowNum][c];
}
adjustArray[adjustArray.length-(childrenLength-cell)].left=tempLeft;
}
}
}
for (var pos in adjustArray) {
var tempAdjust=adjustArray[pos];
this.adjustCellSize(tempAdjust.id,tempAdjust.height,tempAdjust.width,tempAdjust.top,tempAdjust.left,tempAdjust.offsetHeight,tempAdjust.offsetWidth);
}
var totalTop=0;
for (var colNum in topHeights) {
var tempTop=0;
for (var rowNum in topHeights[colNum]) {
tempTop+=topHeights[colNum][rowNum]
}
totalTop = tempTop>totalTop ? tempTop : totalTop;
}
var totalSide=0;
for (var rowNum in sideWidths) {
var tempSide=0;
for (var colNum in sideWidths[rowNum]) {
tempSide+=sideWidths[rowNum][colNum]
}
totalSide = tempSide>totalSide ? tempSide : totalSide;
}
if (sideTable) {		// DTB783 - Protect against missing sideTable
sideTable.style.top=totalTop+'px';
sideTable.style.height=(dataTableDiv ? (parseInt(dataTableDiv.style.height)-totalTop) : 0)+'px';
sideTable.style.width=totalSide+'px';
}
if (topTable) {		// DTB783 - Protect against missing topTable
topTable.style.height=totalTop+'px';
topTable.style.left=totalSide+'px';
topTable.style.width=(dataTableDiv ? (parseInt(dataTableDiv.style.width)-totalSide) : 0)+'px'
}
if (nubTable) {		// DTB783 - Protect against missing nubTable
nubTable.style.height=totalTop+'px';
nubTable.style.width=totalSide+'px';
nubTable.children[0].style.height=totalTop+'px';
nubTable.children[0].style.width=totalSide+'px';
}
}
catch(ex) {
alert('Error in absoluteAdjustLayout: ' + ex.message);
}
}

self._DeepSee_Component_pivotTable_addController = function(ctrl) {
this.controller = ctrl;
}

self._DeepSee_Component_pivotTable_addPivotCoverPane = function(parentDiv) {
if (!parentDiv) {		// DTB783 - Protect against a call with a null prentDiv. Do nothing in this case.
return;
}
var newDiv = document.createElement('div');
var coverPaneId = this.makeId('pivotCoverPane');
var coverPane = document.getElementById(coverPaneId);
var tileColCount = 4;
var tileRowCount = 3;
if (!coverPane) {
newDiv.setAttribute('id',coverPaneId);
newDiv.setAttribute('class','coverPaneInactive');
var svgWatermark = document.createElementNS(SVGNS,'svg');
svgWatermark.setAttribute('id',this.makeId('previewWatermark'));
svgWatermark.setAttribute('height',parentDiv.offsetHeight);
svgWatermark.setAttribute('width',parentDiv.offsetWidth);
var svgTextGroup = document.createElementNS(SVGNS,'g');
var tileWidth = parentDiv.offsetWidth/tileColCount;
var tileHeight = parentDiv.offsetHeight/tileRowCount;
for ( r = 0 ; r<tileRowCount ; r++ ) {
for ( c = 0 ; c<tileColCount ; c++ ) {
var svgText = document.createElementNS(SVGNS,'text');
var centerX = tileWidth*c + (tileWidth/2);
var centerY = tileHeight*r + (tileHeight/2);
svgText.setAttribute('transform','rotate(-30 '+centerX+','+centerY+')');
svgText.setAttribute('font-size',(tileHeight/(1.1*3.16))+'px');
svgText.setAttribute('text-anchor','middle');
svgText.setAttribute('alignment-baseline','central');
svgText.setAttribute('x',centerX);
svgText.setAttribute('y',centerY);
svgText.appendChild(document.createTextNode('PREVIEW'));
svgTextGroup.appendChild(svgText);
}
}
svgWatermark.appendChild(svgTextGroup);
newDiv.appendChild(svgWatermark);
newDiv.style.zIndex=2;		// DTB710 - Add zIndex to make sure this div is on top
if (this.allowPreviewInteraction) {
newDiv.style.pointerEvents='none';
}
parentDiv.style.position='relative';
parentDiv.appendChild(newDiv);
}
}

self._DeepSee_Component_pivotTable_adjustCellSize = function(cellid,height,width,top,left,offsetHeight,offsetWidth) {
var celldiv=document.getElementById(cellid);
var child=celldiv.children[0];
var tempStyle=celldiv.style;
if (child) {
child=child.style;
child.height=((height-offsetHeight)!=undefined ? (height-offsetHeight) : child.height)+'px';
child.width=((width-offsetWidth)!=undefined ? (width-offsetWidth) : child.width)+'px';
tempStyle.height=(height!=undefined ? height: tempStyle.height)+'px';
tempStyle.width=(width!=undefined ? width: tempStyle.width)+'px';
} else {
tempStyle.height=((height-offsetHeight)!=undefined ? (height-offsetHeight) : tempStyle.height)+'px';
tempStyle.width=((width-offsetWidth)!=undefined ? (width-offsetWidth) : tempStyle.width)+'px';
}
tempStyle.top=(top!=undefined ? top : tempStyle.top)+'px';
tempStyle.left=(left!=undefined ? left : tempStyle.left)+'px';
}

self._DeepSee_Component_pivotTable_adjustTableLayout = function() {
try {
if (this.singleTable) {
this.singleTableAdjustLayout();
return;
}
var who=navigator.userAgent;
var isWebKit = who.indexOf("WebKit")>=0;
var fudgeW = isWebKit ? 0 : 0;
var fudgeH = isWebKit ? 0 : 0;
var colLevels = 1;
var minCellWidth = this.cellWidth!=='' ? parseInt(this.cellWidth,10) : 0;
var oldIE = false;
if (zenPage.cssLevel<3) {
fudgeH = 0;
oldIE = zenIsIE;
}
var enc = this.getEnclosingDiv();
var outer = this.findElement('outerDiv');
var topLeft = this.findElement('topLeftDiv');
var topRight = this.findElement('topRightDiv');
var bottomLeft = this.findElement('bottomLeftDiv');
var bottomRight = this.findElement('bottomRightDiv');
var vtScroll = this.findElement('vtScroll');
var hzScroll = this.findElement('hzScroll');
var vtScrollInner = this.findElement('vtScrollInner');
var hzScrollInner = this.findElement('hzScrollInner');
var errorDiv = this.findElement('errorDiv');
var nubDiv = this.findElement('nubDiv');
var	status = this.findElement('statusDiv');
if (vtScroll) {
vtScroll.style.display = 'block';
}
if (hzScroll) {
hzScroll.style.display = 'block';
if (zenIsIE) {
hzScroll.style.height = '30px';
}
}
vtScrollWid = vtScroll ? vtScroll.offsetWidth : 0;
hzScrollHgt = hzScroll ? hzScroll.offsetHeight : 0;
var topTable = this.findElement('topTable');
var leftTable = this.findElement('leftTable');
var dataTable = this.findElement('dataTable');
if (!dataTable) {
if (vtScroll) {
vtScroll.style.display = 'none';
}
if (hzScroll) {
hzScroll.style.display = 'none';
}
}
var errHgt = errorDiv ? errorDiv.offsetHeight : 0;
var dtHgt = dataTable ? dataTable.offsetHeight : 0;
var dtWid = dataTable ? dataTable.offsetWidth : 0;
if (vtScrollInner) {
vtScrollInner.style.height = dtHgt + 'px';
}
if (hzScrollInner) {
hzScrollInner.style.width = dtWid + 'px';
}
if (outer) {
outer.style.height = enc.offsetHeight + 'px';
outer.style.width = enc.offsetWidth + 'px';
}
var st_h = 0;
if (status) {
st_h = status.offsetHeight;
status.style.top = (enc.offsetHeight - st_h) + 'px';
status.style.left = '0px';
status.style.right = '0px';
}
if (errorDiv) {
errorDiv.style.bottom = st_h + 'px';
errorDiv.style.left = '0px';
errorDiv.style.right = '0px';
}
var tl_t,tl_l,tl_w,tl_h;
var tr_t,tr_l,tr_w,tr_h;
var bl_t,bl_l,bl_w,bl_h;
var br_t,br_l,br_w,br_h;
tl_t = 0;
tl_l = 0;
tl_w = leftTable ? leftTable.offsetWidth : 0;
tl_h = topTable ? topTable.offsetHeight : 0;
if (nubDiv && nubDiv.offsetWidth > (tl_w + 5)) {
tl_w = nubDiv.offsetWidth;
leftTable.style.width = tl_w + 'px';
}
var w = (parseInt(enc.offsetWidth) - tl_w - 3 - vtScrollWid);
w = (w > 0) ? w : 0;
tr_t = 0;
tr_l = tl_w;
tr_w = w;
tr_h = tl_h;
var h = (parseInt(enc.offsetHeight) - tr_h - 3 - st_h - 0 - hzScrollHgt - errHgt);
h = (h > 0) ? h : 0;
bl_t = tl_h + 0;
bl_l = 0;
bl_w = tl_w
bl_h = h;
br_t = bl_t;
br_l = bl_w;
br_w = w;
br_h = h;
var nubadj = zenIsIE ? -1 : 0;
if (topLeft) {
topLeft.style.top = tl_t + 'px';
topLeft.style.left = tl_l + 'px';
topLeft.style.width = ((tl_w>0)?(tl_w - 1 - nubadj):0) + 'px';
topLeft.style.height = ((tl_h>0)?(tl_h-1):0) + 'px';
}
if (topRight) {
topRight.style.top = tr_t + 'px';
topRight.style.left = tr_l + 'px';
topRight.style.width = tr_w + 'px';
topRight.style.height = tr_h + 'px';
}
if (bottomLeft) {
bottomLeft.style.top = bl_t + 'px';
bottomLeft.style.left = bl_l + 'px';
bottomLeft.style.width = bl_w + 'px';
bottomLeft.style.height = bl_h + 'px';
}
if (bottomRight) {
bottomRight.style.top = br_t + 'px';
bottomRight.style.left = br_l + 'px';
bottomRight.style.width = br_w + 'px';
bottomRight.style.height = br_h + 'px';
}
if (vtScroll) {
vtScroll.style.top = br_t + 'px';
vtScroll.style.right = '0px';
vtScroll.style.height = br_h + 'px';
}
if (hzScroll) {
hzScroll.style.bottom = (st_h + errHgt) + 'px';
hzScroll.style.right = vtScrollWid + 'px';
hzScroll.style.width = br_w + 'px';
}
if (outer) {
outer.style.visibility = 'visible';
}
if (dataTable && dataTable.offsetWidth >= 0) {
if (!leftTable) {
var ttw = 0;
var hasRows = false;
for (var c = 1;;c++) {
var r = 1;
var cell = this.findElement('cell_1_'+c);
var c1 = this.findElement('col_'+r+':'+c);
if ((!cell || !c1)&&c>1) break;
if (cell && c1) {
hasRows = true;
var cellSz = this.computeDivSize(cell.firstChild,isWebKit);
cellw = cellSz.width;
var hdrSz = this.computeDivSize(c1.firstChild,isWebKit);
hw = hdrSz.width;
if (!isWebKit) {
for (var rx = 2;;rx++) {
var cellx = this.findElement('cell_'+rx+'_'+c);
if (!cellx) break;
var cellxSz = this.computeDivSize(cellx.firstChild,isWebKit);
cellxw = cellxSz.width;
cellw = cellw>cellxw ? cellw : cellxw;
}
}
cellw = (hw>cellw) ? hw : cellw;
if (cellw>0) {
c1.style.width = cellw+fudgeW + 'px';
cell.style.width = cellw+fudgeW + 'px';
ttw += cellw;
}
}
}
if (!hasRows) {
var ttw = 0;
for (var c = 1;;c++) {
var r = 1;
var c1 = this.findElement('col_'+r+':'+c);
if (!c1) break;
var hdrSz = this.computeDivSize(c1.firstChild,isWebKit);
cellw = hdrSz.width;
c1.style.width = cellw+fudgeW + 'px';
ttw += cellw;
}
}
if (!oldIE) {
topTable.style.width = (ttw) + 'px';
dataTable.style.width = topTable.offsetWidth + 'px';
if (!isWebKit && !hasRows) {
dataTable.style.tableLayout = 'fixed';
}
}
else {
topTable.style.width = (ttw) + 'px';
dataTable.style.width = topTable.offsetWidth + 'px';
self.setTimeout("zenPage.getComponent("+this.index+").ieLayout()",10);
}
}
else {
if (!oldIE) {
topTable.style.width = 'auto';
dataTable.style.width = topTable.offsetWidth + 'px';
}
else {
dataTable.style.width = topTable.offsetWidth + 'px';
}
var ttw = 0;
for (var c = 1;;c++) {
var r = 1;
var cr = 1; // JMD1462 + (this.pageSize * (this.currPage-1));
var cell = this.findElement('cell_'+cr+'_'+c);
var c1 = this.findElement('col_'+r+':'+c);
if (cell && !c1) {
for (r=2;r<10;r++) {
var c1 = this.findElement('col_'+r+':'+c);
if (c1) break;
}
}
if (!cell || !c1) break;
var cellSz = this.computeDivSize(cell.firstChild,isWebKit);
cellw = cellSz.width;
var hdrSz = this.computeDivSize(c1.firstChild,isWebKit);
hw = hdrSz.width;
if (!isWebKit) {
for (var rx = 2;;rx++) {
var cellx = this.findElement('cell_'+rx+'_'+c);
if (!cellx) break;
var cellxSz = this.computeDivSize(cellx.firstChild,isWebKit);
cellxw = cellxSz.width;
cellw = cellw>cellxw ? cellw : cellxw;
}
}
var rtot = this.findElement('rtot_'+c);
if (rtot) {
var rtotSz = this.computeDivSize(rtot.firstChild,isWebKit);
var rtotw = rtotSz.width;
cellw = cellw>rtotw ? cellw : rtotw;
}
cellw = (hw>cellw) ? hw : cellw;
cellw = (cellw<minCellWidth) ? minCellWidth : cellw;
if (cellw>0) {
c1.style.width = cellw+fudgeW + 'px';
cell.style.width = cellw+fudgeW + 'px';
if (zenIsIE) {
c1.firstChild.innerHTML = c1.firstChild.innerHTML;
cell.firstChild.innerHTML = cell.firstChild.innerHTML;
}
ttw += cellw;
}
r++;
for (;;r++) {
var cn = this.findElement('col_'+r+':'+c);
if (!cn) break;
colLevels++;
var span = parseInt(cn.colSpan);
if (cellw>0) {
cn.style.width = ((cellw+fudgeW)*span)-1+'px';
}
var adj = zenIsIE ? 0 : 4;
var span = parseInt(cn.colSpan);
var divw = cellw * span;
cn.firstChild.style.width = ((divw>adj)?(divw-adj):0) + 'px';
}
}
var gtotal = this.findElement('gtot');
if (gtotal) {
var gtSz = this.computeDivSize(gtotal.firstChild,isWebKit);
var gtxw = gtSz.width;
hw = hw>gtxw ? hw : gtxw;
}
if (hw) {
hw = (hw>minCellWidth) ? hw : minCellWidth;  // enforce min cell width
}
else {
var hw = minCellWidth;
}
var c1 = this.findElement('coltotal');
if (c1) {
var hdrSz = this.computeDivSize(c1.firstChild,isWebKit);
var hxw = hdrSz.width;
hw = hw>hxw ? hw : hxw;
for (var rt = 1;;rt++) {
var cell = this.findElement('ctot_'+rt);
if (!cell) break;
var cellSz = this.computeDivSize(cell.firstChild,isWebKit);
cellxw = cellSz.width;
cellw = cellw>cellxw ? cellw : cellxw;
cellw = (hw>cellw) ? hw : cellw;
if (cellw>0) {
cell.style.width = cellw+fudgeW + 'px';
}
}
if (cellw>0) {
c1.style.width = cellw+fudgeW + 'px';
ttw += cellw;
}
}
if (!oldIE) {
var fdg = Math.round(ttw*0.05);
fdg = fdg<10 ?10 : fdg;
if (colLevels>1) {
fdg = 100;
}
topTable.style.width = (ttw+fdg) + 'px';
}
else {
topTable.style.width = (ttw) + 'px';
}
dataTable.style.width = topTable.offsetWidth + 'px';
topTable.style.width = dataTable.offsetWidth + 'px';
for (var r = 1;;r++) {
var r1 = this.findElement('row_1:'+r);
var c1 = this.findElement('ctot_'+r);
if (!c1) {
var c1 = this.findElement('cell_'+r+'_1');
}
if (!c1||!r1) break;
var rh = r1.firstChild.offsetHeight;
var cellh = c1.firstChild.offsetHeight;
if (cellh > rh) {
r1.style.height = cellh+1 + 'px';
c1.style.height = cellh+1 + 'px';
}
else if (cellh < rh) {
c1.style.height = rh+1 + 'px';
r1.style.height = rh+1 + 'px';
}
r1.parentNode.style.height = c1.offsetHeight + 'px';
c1.parentNode.style.height = c1.offsetHeight + 'px';
if (oldIE) {
var ieHeight = Math.max(0,c1.offsetHeight-4);
for (var c = 2;;c++) {
var cx = this.findElement('cell_'+r+'_'+c);
if (!cx) break;
cx.firstChild.style.height = ieHeight + 'px';
}
}
}
var c1 = this.findElement('rtot_'+1);
var r1 = this.findElement('rowtotal');
if (c1 && r1) {
var rh = r1.firstChild.offsetHeight;
var cellh = c1.firstChild.offsetHeight;
if (cellh > rh) {
r1.style.height = cellh+1 + 'px';
c1.style.height = cellh+1 + 'px';
}
else if (cellh < rh) {
c1.style.height = rh+1 + 'px';
r1.style.height = rh+1 + 'px';
}
r1.parentNode.style.height = c1.offsetHeight + 'px';
c1.parentNode.style.height = c1.offsetHeight + 'px';
}
}
}
tl_w = leftTable ? leftTable.offsetWidth : 0;
tl_h = topTable ? topTable.offsetHeight : 0;
var h = (parseInt(enc.offsetHeight) - tr_h - 3 - st_h - 0 - hzScrollHgt - errHgt);
h = (h > 0) ? h : 0;
bl_t = tl_h + 0;
bl_l = 0;
bl_w = tl_w
bl_h = h;
br_t = bl_t;
br_l = bl_w;
br_w = w;
br_h = h;
if (topLeft) {
topLeft.style.height = ((tl_h>0)?(tl_h-1):0) + 'px';
}
if (topRight) {
topRight.style.height = ((tl_h>0)?(tl_h):0) + 'px';
}
if (bottomLeft) {
bottomLeft.style.top = bl_t + 'px';
bottomLeft.style.height = bl_h + 'px';
}
if (bottomRight) {
bottomRight.style.top = br_t + 'px';
bottomRight.style.height = br_h + 'px';
}
if (vtScroll) {
vtScroll.style.top = br_t + 'px';
vtScroll.style.height = br_h + 'px';
}
var dtHgt = dataTable ? dataTable.offsetHeight : 0;
var dtWid = dataTable ? dataTable.offsetWidth : 0;
if (vtScrollInner) {
vtScrollInner.style.height = dtHgt + 'px';
vtScroll.style.visibility = (dtHgt<br_h) ? 'hidden' : 'visible';
}
if (hzScrollInner) {
hzScrollInner.style.width = dtWid + 'px';
hzScroll.style.visibility = (dtWid<br_w) ? 'hidden' : 'visible';
}
var rcTable = this.findElement('rcTable');
if (rcTable) {
for (var r = 1;;r++) {
var r1 = this.findElement('row_'+r+':1');
if (!r1) break;
var rcap = this.findElement('rcap_' + r);
if (rcap) {
rcap.style.width = (r1.offsetWidth>2?r1.offsetWidth-2:0) + 'px';
}
}
}
if (dataTable) {
var handler = new Function('evt','zenPage.getComponent('+this.index+').wheelHandler(evt);');
if (dataTable.addEventListener) {
dataTable.addEventListener('DOMMouseScroll', handler, false);
dataTable.addEventListener('mousewheel', handler, false);
}
else if(dataTable.attachEvent) {
dataTable.attachEvent('onmousewheel', handler);
}
}
}
catch(ex) {
alert('Error in adjustTableLayout: ' + ex.message);
}
}

self._DeepSee_Component_pivotTable_allClick = function(evt) {
evt = evt ? evt : window.event;
if (evt) {
if (evt.stopPropagation) {
evt.stopPropagation();
}
else {
evt.cancelBubble = true;
}
}
var cbAll = this.findElement('cb_all');
for (var r = 1;;r++) {
var cb = this.findElement('cb_'+r);
if (cb) {
cb.checked = cbAll.checked;
var tr = this.findElement('tr_'+r);
if (tr) {
if (cb.checked) {
tr.className = 'selectedRow';
}
else {
var rowno = tr.getAttribute('rowno');
tr.className = rowno%2 ? 'evenRow' : 'oddRow';
}
}
}
else {
break;
}
}
zenInvokeCallbackMethod(this.onlistingSelect,this,'onlistingSelect','pivot',this);
}

self._DeepSee_Component_pivotTable_allClickPivot = function(evt) {
evt = evt ? evt : window.event;
if (evt) {
if (evt.stopPropagation) {
evt.stopPropagation();
}
else {
evt.cancelBubble = true;
}
}
var cbAll = this.findElement('cb_all');
for (var r = 1;;r++) {
var cb = this.findElement('cb_'+r);
if (cb) {
cb.checked = cbAll.checked;
var th = this.findElement('row_1:'+r);
if (th) {
if (cb.checked) {
th.style.background = '#B0B0F0';
this.selectCellRange(r,1,r,this.columnCount,false,true,true);	// DTB101
}
else {
th.style.background = '';
for (var c = 1; c <= this.columnCount; c++) {
var cell = this.findElement('cell_'+r+'_'+c);
if (cell) {
var color = cell._oldColor ? cell._oldColor : '';
cell.style.color = color;
var bg = cell._oldBackground ? cell._oldBackground : '';
cell.style.background = bg;
}
}
}
}
}
else {
break;
}
}
}

self._DeepSee_Component_pivotTable_callFormatValue = function(value,formattedValue,rowItem,columnItem) {
var ok = this.FormatValue(this.cubeName, this.queryKey, value, formattedValue, rowItem, columnItem);
}

self._DeepSee_Component_pivotTable_callGetItemSpec = function(labelInfo,rowItem,columnItem) {
var itemInfoRow = new zenProxy();
var ok = this.GetItemSpec(itemInfoRow,this.cubeName,this.queryKey,this.sortDir,this.sortColumn,'row',rowItem,0);
var itemInfoCol = new zenProxy();
var ok = this.GetItemSpec(itemInfoCol,this.cubeName,this.queryKey,this.sortDir,this.sortColumn,'col',columnItem,0);
labelInfo.rowCaption = itemInfoRow.tooltipText=='%Search' ? $$$Text('Series') : itemInfoRow.tooltipText;
labelInfo.colCaption = itemInfoCol.tooltipText=='%Search' ? $$$Text('Series') : itemInfoCol.tooltipText;
if (itemInfoRow.measure != '') {
labelInfo.measure = itemInfoRow.measure;
}
else if (itemInfoCol.measure != '') {
labelInfo.measure = itemInfoCol.measure;
}
else {
labelInfo.measure = $$$Text("Value");
}
}

self._DeepSee_Component_pivotTable_callbackExportRStoPDF = function(dc) {
if ((zenPage._rsStart)&&(zenPage._rsStart[dc.pivotZenId])) {delete zenPage._rsStart[dc.pivotZenId]};		// Reset the pending timestamp
var table = zenGetComponent(dc.pivotZenId);
table.hideMessage();
if (!dc) {
return;
}
var jsRS = dc.getCurrentData();
if (jsRS.isError()) {
alert(jsRS.getErrorMessage());
return;
}
var svgUtil = new _DeepSee_Component_deepseeSvgImageProvider;
svgUtil.setPrintParameters(dc.parms);
var svgPrintFrame = svgUtil.createSVGTableFromResultSet(jsRS,table.id,dc.parms);
var svgTableDiv = document.createElement('div');
svgTableDiv.appendChild(svgPrintFrame);
dc.parms.imageWidth = svgPrintFrame.getAttribute('width');
dc.parms.svgUtil = svgUtil;		// Make this imageprovider available in all contexts through the parms object
setTimeout(svgUtil.printSVGContent,0,'',dc.parms,svgTableDiv);
}

self._DeepSee_Component_pivotTable_callbackRSPending = function(dc) {
if (!zenPage._rsStart) {
zenPage._rsStart = [];
}
if (!zenPage._rsStart[dc.pivotZenId]) {
zenPage._rsStart[dc.pivotZenId] = Date.now();
}
var elapsedSecs = Math.floor((Date.now() - zenPage._rsStart[dc.pivotZenId])/1000)
zenGetComponent(dc.pivotZenId).controller.showMessage(zenGetComponent(dc.pivotZenId),'Export PDF... ',elapsedSecs,'',' seconds');
}

self._DeepSee_Component_pivotTable_canDrillThrough = function() {
if (''===this.kpi) {
return this.listingEnabled;
}
else if(''!==this.kpi) {
return true;
}
return false;
}

self._DeepSee_Component_pivotTable_canGoBack = function() {
return this._historyStack ? true : false;
}

self._DeepSee_Component_pivotTable_canGoForward = function() {
if (null == this._history || null == this._history[this._historyStack+1]) {
return false;
}
return true;
}

self._DeepSee_Component_pivotTable_cancelQuery = function() {
if (null == this._inCancel) {
if (this._queryTimerId) {
this._inCancel = true;
this.stopQueryTimer();
this.showMessage($$$Text('Cancelling...'),'');
this.sendEventToViews('endWait');
var ok = this.KillQuery(this.cubeName,this.queryKey,'');
if (!ok) {
alert($$$Text('Unable to cancel query...'));
}
delete this._inCancel;
this.resetTable();
}
else if (this._runningQuery && false) {
this._inCancel = true;
this.stopQueryTimer();
var ok = this.KillQuery('','',this.pivotNonce);
if (!ok) {
alert($$$Text('Unable to cancel query...'));
}
delete this._inCancel;
}
}
}

self._DeepSee_Component_pivotTable_cbClick = function(evt,currCb) {
evt = evt ? evt : window.event;
if (evt) {
if (evt.stopPropagation) {
evt.stopPropagation();
}
else {
evt.cancelBubble = true;
}
}
var cbAll = this.findElement('cb_all');
if (cbAll) {
cbAll.checked = false;
}
for (var r = 1;;r++) {
var cb = this.findElement('cb_'+r);
var tr = this.findElement('tr_'+r);
if (cb && tr) {
if ('single' == this.listingSelect && cb !== currCb) {
cb.checked = false;
}
if (cb.checked) {
tr.className = 'selectedRow';
}
else {
var rowno = tr.getAttribute('rowno');
tr.className = rowno%2 ? 'evenRow' : 'oddRow';
}
}
else {
break;
}
}
zenInvokeCallbackMethod(this.onlistingSelect,this,'onlistingSelect','pivot',this);
}

self._DeepSee_Component_pivotTable_cbClickPivot = function(evt,currCb) {
evt = evt ? evt : window.event;
if (evt) {
if (evt.stopPropagation) {
evt.stopPropagation();
}
else {
evt.cancelBubble = true;
}
}
var cbAll = this.findElement('cb_all');
if (cbAll) {
cbAll.checked = false;
}
for (var r = 1;;r++) {
var cb = this.findElement('cb_'+r);
var tr = this.findElement('tr_'+r);
if (cb && tr) {
if ('single' == this.pivotSelect && cb !== currCb) {
cb.checked = false;
}
var th = this.findElement('row_1:'+r);
if (cb.checked) {
th.style.background = '#B0B0F0';
this.selectCellRange(r,1,r,this.columnCount,false,true,true);	// DTB101
}
else {
th.style.background = '';
for (var c = 1; c <= this.columnCount; c++) {
var cell = this.findElement('cell_'+r+'_'+c);
if (cell) {
var color = cell._oldColor ? cell._oldColor : '';
cell.style.color = color;
var bg = cell._oldBackground ? cell._oldBackground : '';
cell.style.background = bg;
}
}
}
}
else {
break;
}
}
}

self._DeepSee_Component_pivotTable_cellClickHandler = function(evt,row,col) {
evt = evt ? evt : window.event;
if (evt.shiftKey && '' != this.selectedRange) {
var p = this.selectedRange.split(',');
p[0] = (row < p[0]) ? row : p[0];
p[1] = (col < p[1]) ? col : p[1];
p[2] = (row > p[2]) ? row : p[2];
p[3] = (col > p[3]) ? col : p[3];
this.selectCellRange(p[0],p[1],p[2],p[3],false,false);
}
else {
this.selectCellRange(row,col,row,col,false,false);
}
this.updateToolbar();
zenInvokeCallbackMethod(this.oncellClick,this,'oncellClick','pivot',this);
return true;
}

self._DeepSee_Component_pivotTable_cellDblClickHandler = function(evt,row,col) {
evt = evt ? evt : window.event;
zenInvokeCallbackMethod(this.oncellDblClick,this,'oncellDblClick','pivot',this);
return true;
}

self._DeepSee_Component_pivotTable_cellMouseDownHandler = function(evt) {
evt = evt ? evt : window.event;
if (evt.shiftKey && evt.preventDefault) {
evt.preventDefault();
}
return true;
}

self._DeepSee_Component_pivotTable_cellScrollHz = function() {
var hzScroll = this.findElement('hzScroll');
if ((this.absolutePositioning==1)&&(!this.isDrillThrough)) {
this.findElement('topTable').scrollLeft = hzScroll.scrollLeft;
this.findElement('dataTableDiv').scrollLeft = hzScroll.scrollLeft;
return
}
if (this.singleTable) {
var singleTableDiv = this.findElement('dataTableDiv');
singleTableDiv.scrollLeft = hzScroll.scrollLeft;
return;
}
var topRight = this.findElement('topRightDiv');
var bottomRight = this.findElement('bottomRightDiv');
if (topRight && hzScroll) {
topRight.scrollLeft = hzScroll.scrollLeft;
}
if (bottomRight && hzScroll) {
bottomRight.scrollLeft = hzScroll.scrollLeft;
}
}

self._DeepSee_Component_pivotTable_cellScrollVt = function() {
var vtScroll = this.findElement('vtScroll');
if ((this.absolutePositioning==1)&&(!this.isDrillThrough)) {
this.findElement('sideTable').scrollTop = vtScroll.scrollTop;
this.findElement('dataTableDiv').scrollTop = vtScroll.scrollTop;
return
}
if (this.singleTable) {
var singleTableDiv = this.findElement('dataTableDiv');
singleTableDiv.scrollTop = vtScroll.scrollTop;
return;
}
var bottomLeft = this.findElement('bottomLeftDiv');
var bottomRight = this.findElement('bottomRightDiv');
if (bottomLeft && vtScroll) {
bottomLeft.scrollTop = vtScroll.scrollTop;
}
if (bottomRight && vtScroll) {
bottomRight.scrollTop = vtScroll.scrollTop;
}
}

self._DeepSee_Component_pivotTable_columnClickHandler = function(evt,col) {
evt = evt ? evt : window.event;
if (evt.shiftKey && '' != this.selectedRange) {
return this.cellClickHandler(evt,1,col);
}
this.selectCellRange(1,col,this.rowCount,col,true,false);
zenInvokeCallbackMethod(this.oncellClick,this,'oncellClick','pivot',this);
this.updateToolbar();
return true;
}

self._DeepSee_Component_pivotTable_columnDblClickHandler = function(evt,col) {
evt = evt ? evt : window.event;
if (col != this.sortColumn) {
this.sortColumn = col;
this.sortDir = 'ASC';
}
else if ('ASC'==this.sortDir) {
this.sortDir = 'DESC';
}
else {
this.sortColumn = 0;
this.sortDir = 'ASC';
}
this.selectedRange = '';
this.showMessage($$$Text('sorting...'),'',true);
this.deferredExecuteQuery(true);
return true;
}

self._DeepSee_Component_pivotTable_computeCaption = function(item,noformat) {
noformat = zenGet(noformat,false);
var caption = (item.caption!=='') ? item.caption : '';
if (item.type && item.key) {
switch(item.type) {
case 'month':
var year = item.key.toString().substr(0,4);
var month = item.key.toString().substr(4,2);
if (noformat) {
caption = year + '-' + month;
}
else {
caption = item.caption ? item.caption : year + '-' + month;
}
break;
case 'quarter':
var year = item.key.toString().substr(0,4);
var quarter = item.key.toString().substr(4,1);
var month = (quarter-1) * 3;
month = (month < 10) ? ('0'+month) : month;
if (noformat) {
caption = year + '-' + month;
}
else {
caption = item.caption ? item.caption : year + '-' + month;
}
break;
case 'day':
if (noformat) {
caption = this.dateFromHorolog(item.key);
}
else {
caption = item.caption ? item.caption : this.dateFromHorolog(item.key);
}
break;
}
}
return caption;
}

self._DeepSee_Component_pivotTable_computeDivSize = function(theDiv,isWebKit) {
var size = {width:0, height:0};
if (isWebKit) {
size.width = theDiv.offsetWidth;
size.height = theDiv.offsetHeight;
return size;
}
var div = this.getEnclosingDiv();
var element = document.createElement('div');
element.className = theDiv.className;
element.style.position = 'absolute';
element.style.top = '0px';
if (window.getComputedStyle) {
var cStyle = window.getComputedStyle(theDiv,null);
var fSize = cStyle.getPropertyValue('font-size');
element.style.fontSize = fSize;
var fWeight = cStyle.getPropertyValue('font-weight');
element.style.fontWeight = fWeight;
var fFamily = cStyle.getPropertyValue('font-family');
element.style.fontFamily = fFamily;
}
else if (theDiv.currentStyle) {
element.style.fontSize = theDiv.currentStyle['font-size'] ? theDiv.currentStyle['font-size'] : '';
element.style.fontWeight = theDiv.currentStyle['font-weight'] ? theDiv.currentStyle['font-weight'] : '';
element.style.fontFamily = theDiv.currentStyle['font-family'] ? theDiv.currentStyle['font-family'] : '';
}
element.innerHTML = theDiv.innerHTML;
div.appendChild(element);
size.width = element.offsetWidth;
size.height = element.offsetHeight;
div.removeChild(element);
return size;
}

self._DeepSee_Component_pivotTable_computeTotals = function() {
var data = this.getContent();
if (!data) return;
if (!this.rowTotals && !this.columnTotals) return;
this.rowTotalAgg = this.rowTotalAgg=='' ? 'sum' : this.rowTotalAgg;
this.columnTotalAgg = this.columnTotalAgg=='' ? 'sum' : this.columnTotalAgg;
var gtotal = null;
var grandTotal = data.grandTotal ? data.grandTotal : 0;
if (this.rowTotals && this.rowTotalSource!='all') {
var colTotals = [];
var startRow = (parseInt(this.currPage,10)-1) * parseInt(this.pageSize,10);
var endRow = startRow + parseInt(this.pageSize,10) - 1;
endRow = endRow>(data.rowCount-1)?(data.rowCount-1):endRow;
for (var r = startRow; r<=endRow; r++) {
for (var c = 0; c<data.columnCount; c++) {
var idx = (r*data.columnCount)+c;
var val = (null==data.cells[idx]) ? null : parseFloat(data.cells[idx]);
val = isNaN(val) ? null : val;
if (null != val) {
if (null == colTotals[c]) {
colTotals[c] = {};
}
colTotals[c].count = (colTotals[c].count?colTotals[c].count:0) + 1;
colTotals[c].sum = (colTotals[c].sum?colTotals[c].sum:0) + val;
colTotals[c].min = (colTotals[c].min&&colTotals[c].min<val?colTotals[c].min:val);
colTotals[c].max = (colTotals[c].max&&colTotals[c].max>val?colTotals[c].max:val);
}
}
}
for (var c = 0; c<data.columnCount; c++) {
if (null != colTotals[c]) {
colTotals[c].avg =(colTotals[c].count?colTotals[c].sum/colTotals[c].count:'');
colTotals[c].pct =(grandTotal?colTotals[c].sum/grandTotal:'');
}
}
}
if (this.rowTotals) {
for (var c = 0; c<data.columnCount; c++) {
var rowTotalAgg = this.rowTotalAgg;
var td = this.findElement('rtot_'+(c+1));
var tddiv = this.findElement('rtotd_'+(c+1));
if (td&&tddiv) {
var agg = td.getAttribute('agg');
if (agg && agg!=='') {
rowTotalAgg = agg;
}
var fmt = td.getAttribute('format');
fmt = fmt ? fmt : '#,#';
if (rowTotalAgg=='pct') {
fmt = '#,#.##%';
}
else if (rowTotalAgg=='count') {
fmt = '#,#';
}
styleObj = { color: '' };
if (rowTotalAgg=='none') {
var val = '';
}
else if (this.rowTotalSource=='all') {
var val = (data&&data.columnTotals&&data.columnTotals[c])?data.columnTotals[c][rowTotalAgg] : null;
}
else {
var val = colTotals&&colTotals[c]?colTotals[c][rowTotalAgg]:null;
}
var disp = ((null!=val)?zenFormatNumber(val,fmt,styleObj):'');
if (disp.toString().indexOf(')')==-1) {
disp += '&#160;';
}
tddiv.innerHTML = '&#160;'+disp+'&#160;';
tddiv.title = val;
if (styleObj.color && styleObj.color!='') {
tddiv.style.color = styleObj.color;
}
}
}
}
if (this.columnTotals) {
for (var r = 0; r<data.rowCount; r++) {
var td = this.findElement('ctot_'+(r+1));
var tddiv = this.findElement('ctotd_'+(r+1));
if (td&&tddiv) {
var columnTotalAgg = this.columnTotalAgg;
var agg = td.getAttribute('agg');
if (agg && agg!=='') {
columnTotalAgg = agg;
}
var fmt = td.getAttribute('format');
fmt = fmt ? fmt : '#,#';
if (columnTotalAgg=='pct') {
fmt = '#,#.##%';
}
else if (columnTotalAgg=='count') {
fmt = '#,#';
}
styleObj = { color: '' };
var rIndex = td.getAttribute('row')-1;
if (columnTotalAgg=='none') {
var val = '';
}
else {
var val = (data&&data.rowTotals&&data.rowTotals[rIndex])?data.rowTotals[rIndex][columnTotalAgg] : null;
}
if (null != val) {
gtotal = (gtotal?gtotal:0) + val;
}
var disp = ((null!=val)?zenFormatNumber(val,fmt,styleObj):'');
if (disp.toString().indexOf(')')==-1) {
disp += '&#160;';
}
tddiv.innerHTML = '&#160;'+disp+'&#160;';
if (styleObj.color && styleObj.color!='') {
tddiv.style.color = styleObj.color;
}
}
}
}
var td = this.findElement('gtot');
var tddiv = this.findElement('gtotd');
if (td&&tddiv) {
var fmt = td.getAttribute('format');
fmt = fmt ? fmt : '#,#';
if (this.columnTotalAgg=='pct') {
fmt = '#,#.##%';
}
styleObj = { color: '' };
if (this.columnTotals&&this.rowTotals&&grandTotal&&(this.rowTotalSource=='all')) {
gtotal = grandTotal;
}
var disp = ((null!=gtotal)?zenFormatNumber(gtotal,fmt,styleObj):'');
if (disp.toString().indexOf(')')==-1) {
disp += '&#160;';
}
tddiv.innerHTML = '&#160;'+disp+'&#160;';
if (styleObj.color && styleObj.color!='') {
tddiv.style.color = styleObj.color;
}
}
}

self._DeepSee_Component_pivotTable_copyState = function(master) {
this.rowLevels = new Array();
for (n = 0; n < master.rowLevels.length; n++) {
this.rowLevels[this.rowLevels.length] = master.rowLevels[n].clone(true);
}
this.columnLevels = new Array();
for (n = 0; n < master.columnLevels.length; n++) {
this.columnLevels[this.columnLevels.length] = master.columnLevels[n].clone(true);
}
/*
this.filters = new Array();
for (n = 0; n < master.filters.length; n++) {
this.filters[this.filters.length] = master.filters[n].clone(true);
}
*/
this.measures = new Array();
for (n = 0; n < master.measures.length; n++) {
this.measures[this.measures.length] = master.measures[n].clone(true);
}
this.drillLevels = new Array();
this.drillRowNumbers = new Array();
for (n = 0; n < master.drillLevels.length; n++) {
this.drillLevels[this.drillLevels.length] = master.drillLevels[n].clone(true);
this.drillRowNumbers[this.drillRowNumbers.length] = master.drillRowNumbers[n];
}
}

self._DeepSee_Component_pivotTable_dateFromHorolog = function(val) {
if (''!==val && !isNaN(val) && 'NOW' != val) {
var text = val;
var days1970 = parseInt(val) - 47117;
var date = new Date((days1970 * 24 * 3600 * 1000));
var mon = date.getUTCMonth();
mon = (mon<9?'0':'') + (mon+1);
var day = date.getUTCDate();
day = (day<10?'0':'') + (day);
var yr = date.getUTCFullYear();
val = yr+'-'+mon+'-'+day;
}
return val;
}

self._DeepSee_Component_pivotTable_deferredExecuteQuery = function(force) {
window.setTimeout('zenPage.getComponent('+this.index+').executeQuery('+(force?'true':'false')+');',10);
}

self._DeepSee_Component_pivotTable_dragFinishHandler = function(dragData) {
var srcId = ZLM.getDragInnerSource().id;
var srcIndex = -1;
var srcType = '';
if (srcId) {
if (srcId.indexOf('rowdim_')!=-1) {
srcType = 'rowLevel';
srcIndex = srcId.split('_')[2];
}
else if (srcId.indexOf('coldim_')!=-1) {
srcType = 'colLevel';
srcIndex = srcId.split('_')[2];
}
else if (srcId.indexOf('row')!=-1) {
srcType = 'row';
}
else if (srcId.indexOf('col')!=-1) {
srcType = 'col';
}
else if (srcId.indexOf('filters')!=-1) {
srcType = 'filter';
}
else if (srcId.indexOf('measure')!=-1) {
srcType = 'measure';
}
else if (srcId.indexOf('filter_')!=-1) {
srcType = 'filter';
srcIndex = srcId.split('_')[1];
}
}
else if ('' == srcId) {
srcType = 'rowLevel'; // !!! we don't get an id for the nub!!!
}
var changed = false;
switch(srcType) {
case 'rowLevel':
if (srcIndex > 0 && this.rowLevels[srcIndex-1]) {
this.pushState();
changed = true;
this.rowLevels.splice(srcIndex-1,1);
}
break;
case 'colLevel':
if (srcIndex > 0 && this.columnLevels[srcIndex-1]) {
this.pushState();
changed = true;
this.columnLevels.splice(srcIndex-1,1);
}
break;
case 'filter':
if (srcIndex > 0 && this.filters[srcIndex-1]) {
this.pushState();
changed = true;
this.filters.splice(srcIndex-1,1);
}
break;
case 'measure':
if (this.measures) {
this.pushState();
changed = true;
this.measures = new Array();
}
break;
default:
break;
}
if (changed) {
this.executeQuery(this.autoExecute);
}
}

self._DeepSee_Component_pivotTable_dragStartHandler = function(dragData) {
var ok = false;
var dragItem = this._dragSource;
if (null != dragItem) {
dragData.sourceItem = dragItem;
delete this._dragSource;
var t = dragItem.split(':');
var n = t[1] - 1;
var tgtType = t[0];
switch(tgtType) {
case 'rowLevel':
if (this.rowLevels[n]) {
ok = true;
dragData.value = this.rowLevels[n].spec;
dragData.text = this.rowLevels[n].text;
}
break;
case 'colLevel':
if (this.columnLevels[n]) {
ok = true;
dragData.value = this.columnLevels[n].spec;
dragData.text = this.columnLevels[n].text;
}
break;
case 'row':
case 'col':
break;
case 'filter':
if (this.filters[n]) {
ok = true;
dragData.value = this.filters[n].spec;
dragData.text = this.filters[n].text;
}
break;
case 'measure':
if (this.measures[0]) {
ok = true;
dragData.value = this.measures[0].spec;
dragData.text = this.measures[0].text;
}
break;
}
if (ok) {
ZLM.setDragCaption(dragData.text);
}
}
return ok;
}

self._DeepSee_Component_pivotTable_drillThrough = function() {
return this.setDrillThrough(!this.isDrillThrough);
}

self._DeepSee_Component_pivotTable_dropStartHandler = function(dragData) {
var value = dragData.value;
var text = dragData.text;
var tgtId = ZLM.getDragInnerDestination().id;
if ('' == tgtId) {
tgtId = ZLM.getDragInnerDestination().parentNode.id;
}
var tgtIndex = -1;
var tgtType = '';
var grpIndex = -1;
if (tgtId) {
if (tgtId.indexOf('rowdim_')!=-1) {
tgtType = 'rowLevel';
grpIndex = tgtId.split('_')[1];
tgtIndex = tgtId.split('_')[2];
}
else if (tgtId.indexOf('coldim_')!=-1) {
tgtType = 'colLevel';
grpIndex = tgtId.split('_')[1];
tgtIndex = tgtId.split('_')[2];
}
else if (tgtId.indexOf('row')!=-1) {
tgtType = 'row';
grpIndex = tgtId.split('_')[1];
tgtIndex = tgtId.split('_')[2];
}
else if (tgtId.indexOf('col')!=-1) {
tgtType = 'col';
grpIndex = tgtId.split('_')[1];
tgtIndex = tgtId.split('_')[2];
}
else if (tgtId.indexOf('filters')!=-1) {
tgtType = 'filter';
}
else if (tgtId.indexOf('measure')!=-1) {
tgtType = 'measure';
}
else if (tgtId.indexOf('filter_')!=-1) {
tgtType = 'filter';
tgtIndex = tgtId.split('_')[1];
}
}
else if ('' == tgtId) {
tgtType = 'rowLevel'; // we don't get an id for the nub!!!
}
dragData.targetItem = tgtIndex;
var s = value.toString().split('.');
var dimName = s[0] ? s[0].toUpperCase() : '';
var changed = false;
switch(tgtType) {
case 'row':
var t = grpIndex.toString().split(':');
var levelno = t[0];
var itemno = t[1];
if (levelno > 1) {
break;
}
var th = ZLM.getDragInnerDestination().parentNode;
if (th && th.getAttribute('rowNo')) {
itemno = th.getAttribute('rowNo');
}
var itemInfo = new zenProxy();
var ok = this.GetItemSpec(itemInfo,this.cubeName,this.queryKey,this.sortDir,this.sortColumn,tgtType,itemno,1);  // WAL088 - note that itemno is already sorted
if (!ok) {
if (itemInfo.error) {
alert(itemInfo.error);
}
return;
}
this.pushState();
if (itemInfo.spec != '') {
var drill = zenPage.createComponentNS('http://www.intersystems.com/deepsee','pivotLevel');
drill.spec = itemInfo.spec;
drill.text = itemInfo.text;
this.drillLevels[this.drillLevels.length] = drill;
this.drillRowNumbers[this.drillRowNumbers.length] = itemno;
}
var parm = zenPage.createComponentNS('http://www.intersystems.com/deepsee','pivotLevel');
parm.spec = value;
parm.text = text;
parm.drillLevel = this.getDrillLevel();
this.rowLevels[this.rowLevels.length] = parm;
var ret = zenInvokeCallbackMethod(this.ondrill,this,'ondrill','pivot',this);
if (!ret) {
changed = true;
}
else {
changed = false;
}
break;
case 'col':
break;
case 'measure':
if ((dimName == '[MEASURES]')||(dimName == 'MEASURES')) {
this.pushState();
if (this.measures[0]) {
this.measures[0].spec = value;
this.measures[0].text = text;
}
else {
var msr = zenPage.createComponentNS('http://www.intersystems.com/deepsee','pivotLevel');
msr.spec = value;
msr.text = text;
this.measures[0] = msr;
}
changed = true;
}
break;
case 'rowLevel':
this.pushState();
if (tgtIndex > 0 && this.rowLevels[tgtIndex-1]) {
this.rowLevels[tgtIndex-1].spec = value;
this.rowLevels[tgtIndex-1].text = text;
}
else {
var parm = zenPage.createComponentNS('http://www.intersystems.com/deepsee','pivotLevel');
parm.spec = value;
parm.text = text;
this.rowLevels[this.rowLevels.length] = parm;
}
changed = true;
break;
case 'colLevel':
this.pushState();
if (tgtIndex > 0 && this.columnLevels[tgtIndex-1]) {
this.columnLevels[tgtIndex-1].spec = value;
this.columnLevels[tgtIndex-1].text = text;
}
else {
var parm = zenPage.createComponentNS('http://www.intersystems.com/deepsee','pivotLevel');
parm.spec = value;
parm.text = text;
this.columnLevels[this.columnLevels.length] = parm;
}
changed = true;
break;
case 'filter':
if ((dimName != '[MEASURES]')&&(dimName != 'MEASURES')) {
this.pushState();
if (tgtIndex > 0 && this.filters[tgtIndex-1]) {
this.filters[tgtIndex-1].spec = value;
this.filters[tgtIndex-1].text = text;
this.filters[tgtIndex-1].value = '';
this.filters[tgtIndex-1].key = '';
}
else {
var parm = zenPage.createComponentNS('http://www.intersystems.com/deepsee','pivotLevel');
parm.spec = value;
parm.text = text;
this.filters[this.filters.length] = parm;
}
changed = true;
}
break;
default:
break;
}
if (changed) {
this.sortColumn = 0;
this.sortDir = 'ASC';
this.selectedRange = '';
this.executeQuery(this.autoExecute);
}
return true;
}

self._DeepSee_Component_pivotTable_executeListing = function() {
this.showMessage($$$Text('Generating listing...'),'',true);
this.refreshContents();
}

self._DeepSee_Component_pivotTable_executeQuery = function(force) {
if (force) {
this.currPage = 1;
this.currListingPage = -1;
this.isPaging = false;
this.queryKey = '';
}
else if (!this.autoExecute && !this.isPaging) {
this.changesPending = true;
this.updateController();
return;
}
this.changesPending = false;
this.queryCalls = 0;
this.queryStatus = 0;
if (this.isDrillThrough) {
this.showMessage($$$Text('Generating listing...'),'',true);
}
else {
this.showMessage($$$Text('Working...'),this.queryComplete);
}
this._runningQuery = true;
var prevCanDrillDown = this.canDrillDown;
this.refreshContents(true);
this.canDrillDown = prevCanDrillDown;
this.updateController();
if (zenPage.previewMode) {
this.previewMode = zenPage.previewMode;
}
if (this.previewMode) {
this.crossJoinRowLimit = parseInt(this.pageSize,10) * 20;
}
}

self._DeepSee_Component_pivotTable_exportToPDF = function(parms) {
this.selectCellRange();		// Turn off cell selection to avoid picking up styling problems
this.updateToolbar();
var query = this.GetCurrentQueryText();
var application = '/api/deepsee/v2';
var pageMeta = zenPage.getPageMeta();		// DP-420135 - Use metadata set into the page
var namespace = pageMeta[0];
var configuration = {};
configuration.type = 'MDX';
configuration.initialMDX = query;
configuration.pivotName = '';
configuration.showTotals = false;
var host = 'http://' + window.location.host;
configuration.connection = new DeepSeeConnection('','',host,application,namespace);
var jsDC = new DeepSeeDataController(configuration,this.callbackExportRStoPDF,this.callbackRSPending);
jsDC.parms = parms;
jsDC.pivotZenId = parseInt(this.index);		// Store the Zen index of this table to retrieve the component in the DC context
if (!zenPage._rsStart) {zenPage._rsStart = []};
zenPage._rsStart[parseInt(this.index)] = Date.now();	// Note the start time in case the pending callback needs to report the elapsed wait time.
jsDC.runQuery();
}

self._DeepSee_Component_pivotTable_filterLabelClick = function(evt,filterValue) {
var ctrl = this._cbIndex[(''==filterValue)?' ':filterValue];
ctrl.checked = !ctrl.checked;
this.filterItemClick(evt,filterValue);
}

self._DeepSee_Component_pivotTable_firstPage = function() {
if (this.isDrillThrough) {
if (1 != this.currListingPage) {
this.currListingPage = 1;
this.isPaging = true;
this.showMessage($$$Text('working...'),'',true);
this.deferredExecuteQuery();
}
}
else {
if (1 != this.currPage) {
this.currPage = 1;
this.isPaging = true;
this.executeQuery();
}
}
}

self._DeepSee_Component_pivotTable_getColumnDescriptors = function() {
var data = this.getContent();
var isListing = (data && data._isListing);
if (this._columnDescriptors && this._isListingCol==isListing) {
return this._columnDescriptors;
}
this._isListingCol = isListing;
var list = [];
if (isListing) {
for (var p in data.listingRows[0]) {
list[list.length] = {caption:p};
}
}
else {
if (data && data.axes && data.axes[0]) {
var groups = data.axes[0].groups;
if (groups && groups.length) {
this.processAxisColumns(list,groups,data.axes[0].tuples);
}
else {
for (var t = 0; t < data.axes[0].tuples.length; t++) {
var caption = data.axes[0].tuples[t].caption;
list[list.length] = {caption:caption};
}
}
}
}
this._columnDescriptors = list;
return list;
}

self._DeepSee_Component_pivotTable_getContent = function() {
return this.data;
}

self._DeepSee_Component_pivotTable_getCurrPage = function() {
return parseInt(this.currPage);
}

self._DeepSee_Component_pivotTable_getData = function(d1,d2,d3) {
var value = '';
var data = this.getContent();
if (!data || !data.cells) {
return '';
}
var row = d1;
var col = (null===d2) ? 0 : d2;
value = data.cells[(row*data.columnCount) + col];
return value;
}

self._DeepSee_Component_pivotTable_getDataAsArrays = function() {
var array = null;
var data = this.getContent();
if (data) {
var items = data.rowCount;
var series = data.columnCount;
if (series) {
array = new Array(series);
for (var s = 0; s < series; s++) {
array[s] = new Array(items);
for (var i = 0; i < items; i++) {
var idx = (i*series) + s;
array[s][i] = data.cells[idx];
}
}
}
}
return array;
}

self._DeepSee_Component_pivotTable_getDataByName = function(property,series) {
var value = '';
var data = this.getContent();
if (!data) {
return '';
}
series = ('undefined'==typeof series) ? 0 : parseInt(series,10);
if (!isNaN(parseFloat(property))) {
return parseFloat(property);
}
if ((property.toString().substr(0,2)=='=[')&&(property.toString().substr(property.length-1,1)==']')) {
property = property.substr(2,property.length-3);
}
var colNo = -1;
var axis = data.axes[0];
if (axis && axis.tuples) {
if (axis.tuples.length==1 && axis.tuples[0].caption=='' && property==data.defaultCaption) {
colNo = 0;
}
else {
for (var n = 0; n < axis.tuples.length; n++) {
if (this.getLabel(n,2) == property) {		// DTB559 - Add support for retrieving nested labels and try to match that
colNo = n;
break;
}
}
}
}
switch (property) {
case '%rangeUpper':
if (data.rowTotals && data.rowTotals[0]) {
value = data.rowTotals[0].max;
if (value) {
value = Math.pow(10,Math.ceil(Math.log(value)/Math.log(10)));
}
}
break;
case '%rangeLower':
case '%thresholdUpper':
case '%thresholdLower':
break;
default:
if (colNo<0) {
value = property;
}
else {
var colCount = data.columnCount;
if (colNo>=0 && colCount) {
value = data.cells[(series*colCount) + colNo];
}
}
break;
}
return value;
}

self._DeepSee_Component_pivotTable_getDataSourceCaption = function(which,title) {
var caption = '';
switch (title) {
case '$caption':
caption = this.caption!==''?this.caption:null;
break;
/*
case '$date':
var d = new Date();
caption = zenDateToString(d,'yyyy-mm-dd');
break;
*/
case '':
switch (which) {
case 'title':
caption = this.caption;
break;
case 'subtitle':
break;
}
break;
}
return caption;
}

self._DeepSee_Component_pivotTable_getDimGrouping = function(dim) {
var ret = false;
var data = this.getContent();
if (!data) return false;
switch (dim) {
case 1:
var axis = data.axes[1];
break;
case 2:
var axis = data.axes[0];
break;
}
if (axis) {
ret = axis.hasGroups ? true : false;
}
return ret;
}

self._DeepSee_Component_pivotTable_getDimName = function(dim) {
var name = '';
var drillLevel = this.drillLevels.length;
switch(dim) {
case 0:
if (this.overrideRowSpec) {
name = this.overrideRowText;
}
else if (this.rowLevels) {
var nc = 0;
for (var n = 0; n < this.rowLevels.length; n++) {
var level = this.rowLevels[n];
if (level.drillLevel == drillLevel) {
if (nc++ >= 3) {
name += '...';
break;
}
var text = level.caption ? level.caption : level.text;
var childLevel = level.childLevels ? level.childLevels[0] : null;
while (childLevel) {
if (childLevel.caption) {
text = text + ((text=='')?'':'/') + childLevel.caption;
}
else if (childLevel.text) {
text = text + ((text=='')?'':'/') + childLevel.text;
}
childLevel = childLevel.childLevels ? childLevel.childLevels[0] : null;
}
if (text) {
name = name + ((name=='')?'':' & ') + text;
}
}
}
}
break;
case 1:
if (this.overrideColumnSpec) {
name = this.overrideColumnText;
}
else if (this.columnLevels && (this.columnLevels.length == 1)) {
name = this.columnLevels[0].text;
}
break;
}
return name;
}

self._DeepSee_Component_pivotTable_getDimSize = function(dim) {
var size = 0;
var data = this.getContent();
switch (dim) {
case 1:
size = data ? data.rowCount : 0;
var maxChartSize = this.maxChartSize;		// DTB384 - Use the pivot setting
if (maxChartSize>0) {
size = size>maxChartSize ? maxChartSize : size;
}
break;
case 2:
size = data ? data.columnCount : 0;
break;
}
return size;
}

self._DeepSee_Component_pivotTable_getDimensions = function() {
return 2;
}

self._DeepSee_Component_pivotTable_getDrillLevel = function() {
return this.drillLevels.length;
}

self._DeepSee_Component_pivotTable_getFilterForCells = function(r1,c1,r2,c2,allRows,allCols) {
allRows = ('undefined' == typeof allRows) ? false : (parseInt(allRows,10)==1);
allCols = ('undefined' == typeof allCols) ? false : (parseInt(allCols,10)==1);
var filter = '';
if (''!=this.kpi) return filter;
if (''==this.cubeKey || ''==this.queryKey) return filter;
c2 = ('undefined' == typeof c2) ? c1 : c2;
r2 = ('undefined' == typeof r2) ? r1 : r2;
r1 = parseInt(r1)
r2 = parseInt(r2)
var proxy = new zenProxy();
var ok = this.GetSlicerSpecForCells(proxy,this.cubeKey,this.queryKey,r1,c1,r2,c2,allRows,allCols,this.sortColumn,this.sortDir);
if (proxy.nokey) {
this.executeQuery(true);
return '';
}
if (!ok) {
alert(proxy.error);
}
else {
filter = proxy.filter;
}
return filter;
}

self._DeepSee_Component_pivotTable_getFilterInfo = function(fnames,fvalues,flabels) {
for (var n = 0; n < this.filters.length; n++) {
var filter = this.filters[n];
if (('' != filter.key)&&(filter.enabled)) {		// DTB634
if ('' === filter.caption) {
if ('' != filter.baseSpec) {
filter.caption = this.GetItemCaption(this.cubeName,filter.baseSpec);
}
else if ('' != filter.spec) {
var baseSpec = '';
var baseSpecArray = filter.spec.split('.').slice(0,-1);
baseSpec = baseSpecArray.join('.');
filter.caption = this.GetItemCaption(this.cubeName,baseSpec);
}
}
if (filter.caption && filter.caption.toString().indexOf('%OR(')<0) {
fnames[fnames.length] = filter.caption;
var text = filter.text.toString();
var t = text.split('&#160;');
text = t.join(' ');
fvalues[fvalues.length] = text;
if (flabels) {
flabels[flabels.length] = ((filter._label) ? filter._label : filter.caption);
}
}
}
}
if (this.contextFilterSpec) {
var contextArray = this.ParseMDXExpression(this.contextFilterSpec,this.cubeKey).split('\n');
var counter = 0;
for (n in contextArray) {
counter++
fnames[fnames.length] = $$$Text('Other Filter ') + counter.toString();
fvalues[fvalues.length] = contextArray[n];
if (flabels) {
flabels[flabels.length] = '';
}
}
}
if (this.getDrillLevel()>0) {
for (var d=0 ; d < this.getDrillLevel() ; d++) {
fnames[fnames.length] = $$$Text('Drilldown Level','%DeepSee') + ' ' + (d+1);		//DTB309 - Localize label
fvalues[fvalues.length] = this.drillLevels[d].text;
if (flabels) {		// DTB648
flabels[flabels.length] = '';
}
}
}
if ((this.isDrillThrough)&&(this.listingFilters.length)) {		// DTB157 - add condition to test for existence of any listingFilters
fnames[fnames.length] = '- ' + $$$Text('Selected Cell Context','%DeepSee') + ' -';
fvalues[fvalues.length] = ' ';
if (flabels) {		// DTB648
flabels[flabels.length] = '';
}
for (var f=0 ; f < this.listingFilters.length ; f++) {
fnames[fnames.length] = 'Cell Context ' + f;			// N.B. This is not displayed, and so is not localized
fvalues[fvalues.length] = this.listingFilters[f].spec;
if (flabels) {		// DTB648
flabels[flabels.length] = '';
}
}
}
}

self._DeepSee_Component_pivotTable_getLabel = function(n,dim,noformat) {
try {
var label = '';
var data = this.getContent();
if (!data) {
return '';
}
noformat = zenGet(noformat,false);
switch (dim) {
case 1:
var axis = data.axes[1];
if (axis) {
var tuple = axis.tuples[n];
label = tuple ? this.computeCaption(tuple,noformat) : 'N/A';		// DTB387 - Add noformat
if (tuple && tuple.g && axis.groups) {
var group = axis.groups[parseInt(tuple.g,10)];
while (group) {
var caption = this.computeCaption(group,noformat);
if (caption!=='') {
label = caption + '/' + label;
}
if (group.g) {
group = axis.groups[parseInt(group.g,10)];
}
else {
group = null;
}
}
}
}
break;
case 2:
var axis = data.axes[0];
if (axis) {
var tuple = axis.tuples[n];
label = tuple ? this.computeCaption(tuple,noformat) : '';
if (tuple && tuple.g && axis.groups) {
var group = axis.groups[parseInt(tuple.g,10)];
while (group) {
var caption = this.computeCaption(group,noformat);
if (caption!=='') {
label = caption + '/' + label;
}
if (group.g) {
group = axis.groups[parseInt(group.g,10)];
}
else {
group = null;
}
}
}
if (label==='') {
label = data.defaultCaption;
}
}
break;
}
}
catch(ex) {
alert('Error in pivot.getLabel: ' + ex.message);
}
return label;
}

self._DeepSee_Component_pivotTable_getListingPageCount = function() {
var rc = parseInt(this.listingRowCount,10);
if (!isNaN(rc) && rc > 0 && this.listingPageSize > 0) {
return Math.floor(rc / this.listingPageSize) + ((rc % this.listingPageSize) ? 1 : 0);
}
return 1;
}

self._DeepSee_Component_pivotTable_getPageCount = function() {
var rc = parseInt(this.rowCount,10);
if (!isNaN(rc) && rc > 0 && this.pageSize > 0) {
return Math.floor(rc / this.pageSize) + ((rc % this.pageSize) ? 1 : 0);
}
return 1;
}

self._DeepSee_Component_pivotTable_getPageSize = function() {
return parseInt(this.pageSize);
}

self._DeepSee_Component_pivotTable_getPivotVariableInfo = function(pnames,pvalues) {
for (variableName in this.pivotVariables) {
var pdata = new zenProxy;
pdata = this.GetPivotVariableData(this.cubeName,variableName+'.variable',this.pivotVariables[variableName]);
if (pdata.text) {
pnames[pnames.length] = pdata.caption;
pvalues[pvalues.length] = pdata.text;
}
if (pdata.error) {
alert(pdata.error)
}
}
}

self._DeepSee_Component_pivotTable_getPivotVariablesValues = function(pnames,pvalues) {
for (variableName in this.pivotVariables) {
var pdata = new zenProxy;
pdata = this.GetPivotVariableData(this.cubeName,variableName+'.variable',this.pivotVariables[variableName]);
if (pdata.value) {
pnames[pnames.length] = variableName;
pvalues[pvalues.length] = pdata.value;
}
if (pdata.error) {
alert(pdata.error)
}
}
}

self._DeepSee_Component_pivotTable_getPropertyDim = function() {
return 2;
}

self._DeepSee_Component_pivotTable_getPropertyName = function(n) {
return this.getLabel(n,2);
}

self._DeepSee_Component_pivotTable_getRecordCount = function() {
var data = this.getContent();
var isListing = (data && data._isListing);
if (isListing) {
return data.listingRows.length;
}
return parseInt(this.rowCount,10);
}

self._DeepSee_Component_pivotTable_getRowCaptions = function() {
if (this.rowCaptionList.length > 0) {
return this.rowCaptionList;
}
var rowCaptions = [];
var data = this.getContent();
if (data && data.rowCaptions) {
rowCaptions = data.rowCaptions;
}
return rowCaptions;
}

self._DeepSee_Component_pivotTable_getRowDescriptors = function() {
var data = this.getContent();
var isListing = (data && data._isListing);
if (this._rowDescriptors && this._isListingRow == isListing) {
return this._rowDescriptors;
}
this._isListingRow = isListing;
var list = [];
if (isListing) {
var maxRows = parseInt(this.listingPageSize);
for (var n=0;n<maxRows && n<data.listingRows.length; n++) {
list[list.length] = {caption:n+1};
}
}
else {
if (data && data.axes && data.axes[1]) {
var groups = data.axes[1].groups;
if (groups && groups.length) {
this.processAxisRows(list,groups,data.axes[1].tuples);
}
else {
for (var t = 0; t < data.axes[1].tuples.length; t++) {
var caption = data.axes[1].tuples[t].caption;
list[list.length] = {caption:caption};
}
}
}
}
this._rowDescriptors = list;
return list;
}

self._DeepSee_Component_pivotTable_getSelectedItems = function() {
var cellSelection = this.selectedRange.split(',');
var firstRow = this.isDrillThrough ? 1 : cellSelection[0];
var array = new Array();
for (var r = firstRow;;r++) {		// DTB898 - Use the start point which works in both MDX and drillthrough mode
var cb = this.findElement('cb_'+r);
var tr = this.findElement('tr_'+r);
var dtr = this.findElement('dtr_'+r);
if (tr||dtr) {
if (cb) {
if (cb.checked) {
if ((''!=this.valueColumn) || (this.isDrillThrough)) {
var value = dtr ? dtr.getAttribute('value') : tr.getAttribute('value');
}
else {
var div = tr.getElementsByTagName('div');
var value = div[0].innerText;	// tr should contain only one div
}
array[array.length] = value;
if ('single' == this.listingSelect) {
break;
}
}
}
else if (!this.isDrillThrough) {	// pivot mode
if ('' != this.selectedRange) {
var inSelectedRange = ((r >= cellSelection[0]) && (r <= cellSelection[2]));
}
else {
var inSelectedRange = false;
}
if (inSelectedRange) {
if (''!=this.valueColumn) {
var value = dtr ? dtr.getAttribute('value') : tr.getAttribute('value');
}
else {
var div = tr.getElementsByTagName('div');
var value = div[0].innerText || div[0].textContent;	// tr should contain only one div
if ('\n'==value[0]) {
value = value.slice(1,value.length);
}
value = value.trim();
}
array[array.length] = value;
}
}
}
else {
break;
}
}
return array;
}

self._DeepSee_Component_pivotTable_getSelectedRange = function() {
if (''==this.selectedRange) {
return null;
}
return this.selectedRange.split(',');
}

self._DeepSee_Component_pivotTable_getValueName = function() {
if (this.overrideColumnSpec) {
return this.overrideColumnText;
}
else if (this.measures.length==1 && '' != this.measures[0].text) {
return this.measures[0].text;
}
else if (this.columnLevels && (this.columnLevels.length > 0)) {
return $$$Text('Value');
}
return this.getLabel(0,2);
}

self._DeepSee_Component_pivotTable_goBack = function(notify) {
this.pushState();
this._historyStack--;
this.popState();
if (notify) {
zenInvokeCallbackMethod(this.ondrill,this,'ondrill','pivot',this);
}
}

self._DeepSee_Component_pivotTable_goForward = function() {
if (null == this._history || null == this._history[this._historyStack+1]) {
return;
}
this._historyStack += 2;
this.popState();
}

self._DeepSee_Component_pivotTable_gotoDrillLevel = function(idx) {
idx = parseInt(idx);
if (this.drillLevels.length == idx + 1) return;
this.pushState();
this.drillLevels.length = idx + 1;
for (var n = this.rowLevels.length - 1; n >=0; n--) {
if (this.rowLevels[n].drillLevel > (idx+1)) {
this.rowLevels.splice(n,1);
}
}
this.isDrillThrough = false;
this.selectedRange = '';
this.sortColumn = 0;
this.sortDir = 'ASC';
this.mdx = '';
var ret = zenInvokeCallbackMethod(this.ondrill,this,'ondrill','pivot',this);
if (!ret) {
this.executeQuery(true);
}
}

self._DeepSee_Component_pivotTable_gotoPage = function(page) {
page = parseInt(page);
if (page >= 1 && page != this.currPage && page <= this.getPageCount()) {
this.currPage = page;
this.isPaging = true;
this.executeQuery();
}
}

self._DeepSee_Component_pivotTable_hasFormatRules = function() {
return (this.colorScale || (this.formatRules && this.formatRules.length > 0)) ? true : false;
}

self._DeepSee_Component_pivotTable_hideMessage = function() {
self.document.body.style.cursor = 'auto';
if (!this.isDrillThrough && this.controller && this.controller.hideMessage) {
this.controller.hideMessage();
return;
}
var div = this.findElement('message');
if (div) {
div.innerHTML = '';
div.style.display = 'none';
}
}

self._DeepSee_Component_pivotTable_ieLayout = function() {
var dataTable = this.findElement('dataTable');
dataTable.style.tableLayout = 'fixed';
}

self._DeepSee_Component_pivotTable_itemMouseDown = function(evt,idx) {
if (this.dragEnabled) {
evt = evt ? evt : window.event;
if (evt.preventDefault) {
evt.preventDefault();
}
this._dragSource = idx;
}
}

self._DeepSee_Component_pivotTable_itemMouseUp = function(evt) {
if (this.dragEnabled) {
evt = evt ? evt : window.event;
if (evt.preventDefault) {
evt.preventDefault();
}
delete this._dragSource;
}
}

self._DeepSee_Component_pivotTable_lastPage = function() {
if (this.isDrillThrough) {
if (this.getListingPageCount() != this.currListingPage) {
this.currListingPage = this.getListingPageCount();
this.isPaging = true;
this.showMessage($$$Text('working...'),'',true);
this.deferredExecuteQuery();
}
}
else {
if (this.getPageCount() != this.currPage) {
this.currPage = this.getPageCount();
this.isPaging = true;
this.executeQuery();
}
}
}

self._DeepSee_Component_pivotTable_listingHeaderDblClickHandler = function(evt,col) {
evt = evt ? evt : window.event;
if (col != this.listingSortColumn) {
this.listingSortColumn = col;
this.listingSortDir = 'ASC';
}
else if ('ASC'==this.listingSortDir) {
this.listingSortDir = 'DESC';
}
else {
this.listingSortColumn = 0;
this.listingSortDir = 'ASC';
}
this.currListingPage = -1;
this.showMessage($$$Text('sorting...'),'',true);
this.deferredExecuteQuery(true);
return true;
}

self._DeepSee_Component_pivotTable_newDataHandler = function() {
delete this._rowDescriptors;
delete this._columnDescriptors;
this.computeTotals();
}

self._DeepSee_Component_pivotTable_nextPage = function() {
if (this.isDrillThrough) {
if (this.currListingPage < this.getListingPageCount()) {
this.currListingPage++;
this.isPaging = true;
this.showMessage($$$Text('working...'),'',true);
this.deferredExecuteQuery();
}
}
else {
if (this.currPage < this.getPageCount()) {
this.currPage++;
this.isPaging = true;
this.executeQuery();
}
}
}

self._DeepSee_Component_pivotTable_onloadHandler = function() {
this._registeredCounter = 0; // + WAL259
this.adjustTableLayout();
if (('' != this.queryKey) && (!this.queryStatus || this.queryStatus < 100 || this.queryKey.toString().indexOf('SLAVE:')>=0)) {
this.showMessage($$$Text('Working...'),this.queryComplete);
this.sendEventToViews('beginWait');
this.startQueryTimer();
}
else if (this.queryPending) {
this.sendEventToViews('beginWait');
this.showPendingMsg(true);
this.startQueryTimer();
}
else {
this.computeTotals();
}
}

self._DeepSee_Component_pivotTable_onunloadHandler = function() {
var modeTemp = zenSynchronousMode;
zenSynchronousMode = false;
this.DeleteLastResult();
zenSynchronousMode = modeTemp;
}

self._DeepSee_Component_pivotTable_onupdateHandler = function() {
this._runningQuery = false;
if (!zenPage._noUpdate && !this.hidden) {
this.adjustTableLayout();
}
var ready = true;
if (('' != this.queryKey) && (!this.queryStatus || this.queryStatus < 100)) {
this.progressMessage = (!this.progressMessage) ? $$$Text('Working...') : this.progressMessage;
this.showMessage('',this.queryComplete);
this.sendEventToViews('beginWait');
this.showPendingMsg(false);
this.startQueryTimer();
ready = false;
}
else {
this.hideMessage();
this.progressMessage = '';
if (this.queryPending) {
this.sendEventToViews('beginWait');
this.showPendingMsg(true,'update');
this.startQueryTimer();
}
else {
this.showPendingMsg(false);
}
}
if (!zenPage._noUpdate && ready) {
this.raiseDataChange();
if (zenPage.adjustSizes && !this.hidden) {
zenPage.adjustSizes();
}
}
if ('' != this.selectedRange && !this.isDrillThrough) {
var p = this.selectedRange.split(',');
this.selectCellRange(p[0],p[1],p[2],p[3],false,false,true);
}
}

self._DeepSee_Component_pivotTable_popState = function() {
if (null == this._history || this._historyStack == 0) {
return;
}
this._historyStack--;
var state = this._history[this._historyStack];
this.rowAxisOptions = state.rowAxisOptions.clone(true);
this.columnAxisOptions = state.columnAxisOptions.clone(true);
this.overrideRowSpec = state.overrideRowSpec;
this.overrideRowText = state.overrideRowText;
this.overrideColumnSpec = state.overrideColumnSpec;
this.overrideColumnText = state.overrideColumnText;
this.rowLevels = new Array();
for (n = 0; n < state.rowLevels.length; n++) {
this.rowLevels[this.rowLevels.length] = state.rowLevels[n].clone(true);
}
this.columnLevels = new Array();
for (n = 0; n < state.columnLevels.length; n++) {
this.columnLevels[this.columnLevels.length] = state.columnLevels[n].clone(true);
}
this.filters = new Array();
for (n = 0; n < state.filters.length; n++) {
this.filters[this.filters.length] = state.filters[n].clone(true);
}
this.measures = new Array();
for (n = 0; n < state.measures.length; n++) {
this.measures[this.measures.length] = state.measures[n].clone(true);
}
this.drillLevels = new Array();
this.drillRowNumbers = new Array(); // WAL224
for (n = 0; n < state.drillLevels.length; n++) {
this.drillLevels[this.drillLevels.length] = state.drillLevels[n].clone(true);
this.drillRowNumbers[this.drillRowNumbers.length] = state.drillRowNumbers[n];
}
this.listingFilters = new Array();
for (n = 0; n < state.listingFilters.length; n++) {
this.listingFilters[this.listingFilters.length] = state.listingFilters[n].clone(true);
}
if (state.isDrillThrough) {
this.selectedRange = state.selectedRange;
this.isDrillThrough = true;
this.executeListing();
}
else {
if (this.isDrillThrough) {
this.mdx = '';
this.isDrillThrough = false;
}
this.executeQuery(true);
}
this.updateController();
if (zenPage.UpdateFilterControls) {
var msg = zenPage.UpdateFilterControls(this.cubeName,zen('filterGroup'),this);
if (''!==msg) {
alert(msg);
}
}
}

self._DeepSee_Component_pivotTable_previousPage = function() {
if (this.isDrillThrough) {
if (this.currListingPage > 1) {
this.currListingPage--;
this.isPaging = true;
this.showMessage($$$Text('working...'),'',true);
this.deferredExecuteQuery();
}
}
else {
if (this.currPage > 1) {
this.currPage--;
this.isPaging = true;
this.executeQuery();
}
}
}

self._DeepSee_Component_pivotTable_processAxisColumns = function(list,groups,tuples) {
for (var n = 0; n < groups.length; n++) {
var idx = list.length;
list[idx] = {caption:groups[n].caption};
if (groups[n].groups) {
var glist = [];
list[idx].columns = glist;
this.processAxisColumns(glist,groups[n].groups,tuples);
}
else if (groups[n].tuples) {
var glist = [];
list[idx].columns = glist;
for (var t = 0; t < groups[n].tuples.length; t++) {
var caption = tuples[groups[n].tuples[t]-1].caption;
glist[glist.length] = { caption:caption};
}
}
}
}

self._DeepSee_Component_pivotTable_processAxisRows = function(list,groups,tuples) {
for (var n = 0; n < groups.length; n++) {
var idx = list.length;
list[idx] = {caption:groups[n].caption};
if (groups[n].groups) {
var glist = [];
list[idx].rows = glist;
this.processAxisRows(glist,groups[n].groups,tuples);
}
else if (groups[n].tuples) {
var glist = [];
list[idx].rows = glist;
for (var t = 0; t < groups[n].tuples.length; t++) {
var caption = tuples[groups[n].tuples[t]-1].caption;
glist[glist.length] = { caption:caption};
}
}
}
}

self._DeepSee_Component_pivotTable_pushState = function() {
if (null == this._history) {
this._history = new Array();
this._historyStack = 0;
}
var state = new Object();
state.rowAxisOptions = this.rowAxisOptions.clone();
state.columnAxisOptions = this.columnAxisOptions.clone();
state.overrideRowSpec = this.overrideRowSpec;
state.overrideRowText = this.overrideRowText;
state.overrideColumnSpec = this.overrideColumnSpec;
state.overrideColumnText = this.overrideColumnText;
state.rowLevels = new Array();
for (n = 0; n < this.rowLevels.length; n++) {
state.rowLevels[n] = this.rowLevels[n].clone();
}
state.columnLevels = new Array();
for (n = 0; n < this.columnLevels.length; n++) {
state.columnLevels[n] = this.columnLevels[n].clone();
}
state.filters = new Array();
for (n = 0; n < this.filters.length; n++) {
state.filters[n] = this.filters[n].clone();
}
state.measures = new Array();
for (n = 0; n < this.measures.length; n++) {
state.measures[n] = this.measures[n].clone();
}
state.drillLevels = new Array();
state.drillRowNumbers = new Array(); // WAL224
for (n = 0; n < this.drillLevels.length; n++) {
state.drillLevels[n] = this.drillLevels[n].clone();
state.drillRowNumbers[n] = this.drillRowNumbers[n]; // WAL224
}
state.listingFilters = new Array();
for (n = 0; n < this.listingFilters.length; n++) {
state.listingFilters[n] = this.listingFilters[n].clone();
}
state.isDrillThrough = this.isDrillThrough;
state.selectedRange = this.selectedRange;
this._history[this._historyStack] = state;
this._historyStack++;
}

self._DeepSee_Component_pivotTable_queryTimerHandler = function() {
this._queryTimerId = null;
if (this._inCancel) {
return;
}
if (this._needsRefresh) {
delete this._needsRefresh;
this.executeQuery();
this.sendEventToViews('beginWait');
this.startQueryTimer();
return;
}
var proxy = new zenProxy();
proxy.id = this.id;
var oldStatus = this.queryStatus;
var ok = this.GetQueryStatus(proxy,this.cubeKey,this.queryKey,this.kpi);
if (ok) {
this.queryStatus = parseInt(proxy.queryStatus,10);
this.queryComplete = proxy.queryComplete;		// DP-408943 - Maintain direct value in state variable
this.queryComplete = isNaN(this.queryComplete) ? 0 : this.queryComplete;
this.queryPending = (proxy.queryPending==1)?true:false;
if (proxy.error) {
this.sendEventToViews('endWait');
this.hideMessage();
}
var doRefresh = 0;		// DTB823 - Signal flag to decide behavior after all tests
if (this.queryStatus >= 100) {
if (this.queryPending) {
this.showPendingMsg(true,'timer');
doRefresh = 1;		// DTB823
}
else {
this.showPendingMsg(false);
this.sendEventToViews('endWait');
doRefresh = 1;		// DTB823
}
}
else if (this.queryStatus < 0) {
this.sendEventToViews('endWait');
this.hideMessage();
alert($$$Text('Error on server!'));
return;
}
else if (this.kpi != '') {
if (this.queryComplete>=0) {
this.showMessage($$$Text('Calculating...'),this.queryComplete);
}
else if ((this.queryStatus!=oldStatus)) {
doRefresh = 1;		// DTB823
}
this.sendEventToViews('beginWait');
}
else {
if (this.queryStatus<100) {
doRefresh = 1;
}
if (this.queryStatus >= 50) {
this.showMessage($$$Text('Preparing final result...'),100);
}
if (this.queryStatus < 30) {
this.showMessage($$$Text('Computing axes...'),this.queryComplete);
}
else {
this.showMessage($$$Text('Calculating...'),this.queryComplete);
}
this.sendEventToViews('beginWait');
}
if (doRefresh) {
this.refreshContents();
}
else {
this.startQueryTimer();
}
}
else {
this.sendEventToViews('endWait');
if (!zenPage.limitPopups) {
alert('Error from server.');
}
}
}

self._DeepSee_Component_pivotTable_raiseDataChange = function() {
if (this._listeners) {
for (var n = 0; n < this._listeners.length; n++) {
if (this._listeners[n]) {
this._listeners[n].notifyView('dataChange',null);
}
}
}
}

self._DeepSee_Component_pivotTable_register = function(component) {
if(null == this._registeredCounter) {
this._registeredCounter = 1;
}
else {
this._registeredCounter += 1;
}
if (null == this._listeners) {
this._listeners = new Array();
}
this._listeners[this._listeners.length] = component;
}

self._DeepSee_Component_pivotTable_removeAllDrillLevels = function() {
if ( (this.drillLevels) && (this.drillLevels.length>0) ) {
for (var level = (this.drillLevels.length-1) ; level>=0 ; level--) {
this.removeDrillLevel(level)
}
}
}

self._DeepSee_Component_pivotTable_removeController = function() {
this.controller = null;
}

self._DeepSee_Component_pivotTable_removeDrillLevel = function(idx,evt) {
var prevCanDrillDown = this.canDrillDown;
idx = parseInt(idx);
this.pushState();
var drillRowNumber = this.drillRowNumbers.splice(idx,1);
this.drillLevels.splice(idx,1);
if (evt !== undefined) {
if (typeof evt.stopPropagation != "undefined") {
evt.stopPropagation();
} else {
evt.cancelBubble = true;
}
}
for (var n = this.rowLevels.length - 1; n >=0; n--) {
if (this.rowLevels[n].drillLevel == (idx+1)) {
this.rowLevels.splice(n,1);
}
else if (this.rowLevels[n].drillLevel > (idx+1)) {
this.rowLevels[n].drillLevel--;
}
}
this.isDrillThrough = false;
this.selectedRange = drillRowNumber + ',1,' + drillRowNumber + ',' + this.columnCount + ',0,0';
this.sortColumn = 0;
this.sortDir = 'ASC';
this.mdx = '';
var ret = zenInvokeCallbackMethod(this.ondrill,this,'ondrill','pivot',this);
if (!ret) {
this.executeQuery(true);
}
this.canDrillDown = prevCanDrillDown;
}

self._DeepSee_Component_pivotTable_removeMeasureLabels = function(values,measureCaption) {
if (values && measureCaption) {
for (i=1; i < values.length; ++i) {
var valueText = values[i].toString().split('/');		// DP-416572 - values[i] could be a numeric!
for (var j = 0; j < valueText.length; ++j) {
if (this.hiddenMeasureText.length>=1) {
for (var k = 0; k < this.hiddenMeasureText.length; ++k) {
if (valueText[j] == this.hiddenMeasureText[k]) {
valueText.splice(j,1);
break;
}
}
}
else if (valueText[j] == measureCaption) {
valueText.splice(j,1);
break;
}
}
values[i] = valueText.join('/');
}
}
return values;
}

self._DeepSee_Component_pivotTable_resetTable = function() {
this.pushState();
this.isPaging = false;
this.currPage = 1;
this.currListingPage = -1;
this.queryKey = '';
this.queryCalls = 0;
this.measures = new Array();
this.measureLocation = 'columns';
this.selectedRange = '';
this.sortColumn = 0;
this.sortDir = 'ASC';
this.filters = new Array();
this.rowLevels = new Array();
this.columnLevels = new Array();
this.drillLevels = new Array();
this.drillRowNumbers = new Array(); // WAL224
this.listingFilters = new Array();
this.crossJoinRowLimit = parseInt(this.pageSize,10) * 20; 	// JMD1129, JMD1304
this.pivotVariables = {};
this.LastSessionKey = 0;
this.LastCube = '';
this.LastQueryKey = '';
this.overrideRowSpec = '';
this.overrideColumnSpec = '';
this.overrideRowText = '';
this.overrideColumnText = '';
this.rowAxisOptions = zenPage.createComponentNS('http://www.intersystems.com/deepsee','pivotLevel');
this.columnAxisOptions = zenPage.createComponentNS('http://www.intersystems.com/deepsee','pivotLevel');
if (this.isDrillThrough) {
this.mdx = '';
this.isDrillThrough = false;
this.executeQuery(true);
}
else {
this.executeQuery();
}
if (zenPage.UpdateFilterControls) {
var msg = zenPage.UpdateFilterControls(this.cubeName,zen('filterGroup'),this);
if (''!==msg) {
alert(msg);
}
}
}

self._DeepSee_Component_pivotTable_rowClickHandler = function(evt,row) {
evt = evt ? evt : window.event;
if (evt.shiftKey && '' != this.selectedRange) {
return this.cellClickHandler(evt,row,1);
}
this.selectCellRange(row,1,row,this.columnCount,false,true);
zenInvokeCallbackMethod(this.oncellClick,this,'oncellClick','pivot',this);
this.updateToolbar();
return true;
}

self._DeepSee_Component_pivotTable_rowDblClickHandler = function(evt,level,row) {
evt = evt ? evt : window.event;
if (level == 1 && this.canDrillDown) {
var itemInfo = new zenProxy();
var ok = this.GetItemSpec(itemInfo,this.cubeName,this.queryKey,this.sortDir,this.sortColumn,'row',row,1); // WAL088 - note that itemno is already sorted
if (!ok) {
if (itemInfo.error) {
alert(itemInfo.error);
}
return;
}
var drilldownSpec = itemInfo.childSpec;
var dspec = this.rowAxisOptions.drilldownSpec;
if (dspec) {
if (dspec == 'none') {
return;
}
else {
var t = dspec.toString().split('^');
drilldownSpec = t[this.getDrillLevel()];
drilldownSpec = drilldownSpec ? drilldownSpec : '';
}
}
if (drilldownSpec == '' || drilldownSpec == 'none') {
return;
}
this.pushState();
if (itemInfo.spec != '') {
var drill = zenPage.createComponentNS('http://www.intersystems.com/deepsee','pivotLevel');
drill.spec = itemInfo.spec;
drill.text = itemInfo.text;
this.drillLevels[this.drillLevels.length] = drill;
this.drillRowNumbers[this.drillRowNumbers.length] = row;
}
var parm = zenPage.createComponentNS('http://www.intersystems.com/deepsee','pivotLevel');
parm.spec = drilldownSpec;
parm.text = itemInfo.text;
parm.drillLevel = this.getDrillLevel();
this.rowLevels[this.rowLevels.length] = parm;
this.sortColumn = 0;
this.sortDir = 'ASC';
this.selectedRange = '';
var ret = zenInvokeCallbackMethod(this.ondrill,this,'ondrill','pivot',this);
if (!ret) {
this.executeQuery(this.autoExecute);
}
}
return true;
}

self._DeepSee_Component_pivotTable_selectCellRange = function(startRow,startCol,endRow,endCol,allRows,allCols,selectOnly) {
allRows = 'undefined' == typeof allRows ? false : allRows;
allCols = 'undefined' == typeof allCols ? false : allCols;
selectOnly = 'undefined' == typeof selectOnly ? false : selectOnly;
if (!selectOnly && ('' != this.selectedRange)) {
var p = this.selectedRange.split(',');
for (var r = parseInt(p[0]); r <= parseInt(p[2]); r++) {
for (var c = parseInt(p[1]); c <= parseInt(p[3]); c++) {
var cell = this.findElement('cell_'+r+'_'+c);
if (cell) {
var color = cell._oldColor ? cell._oldColor : '';
cell.style.color = color;
cell._oldcolor = null;		// PFS018
var bg = cell._oldBackground ? cell._oldBackground : '';
cell.style.background = bg;
cell._oldBackground = null;		// PFS018
}
}
}
}
var total = 0;
var cellCount = 0;
if ('' == startRow) {
this.selectedRange = '';
}
else {
this.selectedRange = startRow + ',' + startCol + ',' + endRow + ',' + endCol + ',' + (allRows?1:0) + ',' + (allCols?1:0);
var p = this.selectedRange.split(',');
for (var r = parseInt(p[0]); r <= parseInt(p[2]); r++) {
for (var c = parseInt(p[1]); c <= parseInt(p[3]); c++) {
var cell = this.findElement('cell_'+r+'_'+c);
if (cell) {
cellCount++;
if (cell.getAttribute && cell.getAttribute('zenValue')) {
total += parseFloat(cell.getAttribute('zenValue'));
}
if (cell._oldColor == null) {
cell._oldColor = cell.style.color ? cell.style.color : '';
}
if (cell._oldBackground == null) {
cell._oldBackground = cell.style.background ? cell.style.background : '';
}
cell.style.color = this.selectedCellColor;
cell.style.background = this.selectedCellBackground;
}
}
}
}
var format = ('number'!=typeof total) ? '' : (total == parseInt(total,10)) ?  '#,#' : '#,#.##';
if (isNaN(parseInt(total,10))) {
this.totalValue = '';
}
else {
this.totalValue = zenFormatNumber(total,format);
}
this.cellCount = zenFormatNumber(cellCount,'#,#');
var span = this.findElement('total');
if (span) {
span.innerHTML = this.totalValue;
}
var span = this.findElement('cellCount');
if (span) {
span.innerHTML = this.cellCount;
}
}

self._DeepSee_Component_pivotTable_sendEventToViews = function(reason,source,data1,data2,data3) {
if (this._listeners) {
for (var n = 0; n < this._listeners.length; n++) {
if (this._listeners[n] && (this._listeners[n]!=source)) {
this._listeners[n].notifyView(reason,data1,data2,data3);
}
}
}
}

self._DeepSee_Component_pivotTable_setCurrPage = function(page) {
this.gotoPage(page);
}

self._DeepSee_Component_pivotTable_setDrillThrough = function(flag,force) {
force = ('undefined' == typeof force) ? false : force;
if (!this.canDrillThrough()) {
return false;
}
if (flag == this.isDrillThrough && !force) {
return false;
}
if (flag) {
if ('' == this.selectedRange && '' == this.kpi) {
alert($$$Text('Please select a cell to display a listing for.\nNote that you can select multiple adjacent cells by holding the Shift key down while clicking the mouse.'));
return false;
}
this.selectedRowValues = '';
if ('' != this.kpi) {
var list = this.getSelectedItems();
if (list) {
for (var n = 0; n < list.length; n++) {
if (list[n] && list[n]!='' && 'string'==typeof list[n]) {
list[n] = list[n].replace(/\,/g,'\\,');
}
}
}
this.selectedRowValues = list ? list.join(',') : '';
}
this.pushState();
this.listingSortColumn = '';
this.listingSortDir = 'ASC';
this.isDrillThrough = true;
this.executeListing();
}
else {
if (this.drillLevels.length==0) {
this.pushState();
}
this.mdx = '';
this.queryKey = '';
this.isDrillThrough = false;
this.executeQuery(true);
}
return true;
}

self._DeepSee_Component_pivotTable_setListing = function(listing,type) {
if (listing) {
this.listing = listing;
}
else {
this.listing = this.defaultListing;		// DTB732 (2) - Reset to default listing if nothing is selected
}
if (type=='map' || type == 'table') {
this.listingType = type;
}
}

self._DeepSee_Component_pivotTable_setPivotDisabled = function(setDisabled) {
var coverPaneId = this.makeId('pivotCoverPane');
var coverPane = document.getElementById(coverPaneId);
var svgWatermark = this.findElement('previewWatermark');
if (coverPane) {
if (setDisabled) {
this.selectCellRange('');
coverPane.setAttribute('class','coverPaneActive');
svgWatermark.setAttribute('visibility','visible');
}
else {
coverPane.setAttribute('class','coverPaneInactive');
svgWatermark.setAttribute('visibility','hidden');
}
}
}

self._DeepSee_Component_pivotTable_setProperty = function(property,value,value2) {
switch(property) {
case 'showStatus':
case 'pivot':
case 'rowTotals':
case 'columnTotals':
case 'showEmptyRows':
case 'showEmptyColumns':
case 'rowLabelSpan':
case 'columnLabelSpan':
value = value ? true : false;
if (this[property] != value) {
this[property] = value;
this.executeQuery();
}
break;
case 'currPage':
this.gotoPage(value);
break;
case 'pageSize':
if (value != this.pageSize) {
this.currPage = 1; // go back to start
this.selectedRange = '';
this.pageSize = value;
this.executeQuery();
}
break;
case 'colorScale':
if (value != this.colorScale) {
this.selectedRange = '';
this.colorScale = value;
this.executeQuery();
}
break;
case 'rowTotalSource':
case 'showZebra':
case 'showRowCaption':
case 'evenRowStyle':
case 'cellStyle':
case 'columnHeaderStyle':
case 'rowHeaderStyle':
case 'rowTotalAgg':
case 'columnTotalAgg':
case 'cellWidth':
case 'cellHeight':
case 'backgroundImage':
case 'backgroundOpacity':
if (this[property] != value) {
this[property] = value;
this.executeQuery();
}
break;
case 'text':
case 'value':
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._DeepSee_Component_pivotTable_showAllRows = function() {
this.crossJoinRowLimit = 0;
if (this.previewMode) {
this.previewMode = !this.previewMode;
this.executeQuery(true);
}
else {
this.executeQuery(true);
}
}

self._DeepSee_Component_pivotTable_showIKnowMeasureValue = function(cubeName,measure,objId) {
var parms = {
CUBE:cubeName,
MEASURE:measure,
OBJIDS:objId
};
zenLaunchPopupWindow('_iKnow.DeepSee.UI.MeasureValue.zen',measure,'status,scrollbars,resizable=yes,width=800,height=600',parms);
}

self._DeepSee_Component_pivotTable_showMDXQuery = function() {
this.setProperty('showQuery',!this.getProperty('showQuery'));
this.refreshContents();
}

self._DeepSee_Component_pivotTable_showMessage = function(msg,pct,listing) {
self.document.body.style.cursor = 'wait';
if (!msg) {
msg = this.progressMessage;
}
else {
this.progressMessage = (msg = $$$Text(msg));
}
var units = '%';
if (this.queryStatus < 30) {
units = $$$Text(' items');
}
else if (this.queryStatus >= 50) {
pct = 100;
}
if (!this.isDrillThrough && this.controller && this.controller.showMessage) {
this.controller.showMessage(this,msg,pct,listing,units);
return;
}
var div = this.findElement('message');
if (div) {
var html = '';
var icon = "deepsee/insert_table_clock_64.png";
html += '<table><tr><td width="80" valign="middle" align="center">';
html += '<img src="'+icon+'"/><br/><br/>';
html += '</td><td width="200" valign="top">';
if (listing) {
html += '<div><i>' + msg + '</i></div>';
}
else {
pct = !pct ? '0' : parseInt(pct,10);
if (!isNaN(this.queryStatus) && this.queryStatus >= 50 && this.queryStatus < 100) {
icon = "deepsee/insert_table_fav_64.png";
}
else if (!isNaN(this.queryStatus) && this.queryStatus < 35) {
icon = "deepsee/insert_table_64.png";
}
html += '<div><i>' + msg + '</i></div>';
html += '<div class="dsptPct">' + pct + '<span style="font-size:0.8em;">'+units+'</span></div>';
html += '<div style="font-size:0.8em; color: darkblue;"><i>' + $$$Text('Cells Calculated') + '</i></div>';
var pos = (this.queryCalls % 10) * 10;
html += '<div style="width:100px;border-top:1px solid darkblue;"><div style="border:1px solid black; background: darkblue; color:darkblue; font-size: 8pt; width:10px; left:'+pos+'px;position:relative;">X</div></div>';
}
html += '</td>';
html += '</tr></table>';
div.innerHTML = html;
div.style.display = 'block';
}
}

self._DeepSee_Component_pivotTable_showPendingMsg = function(flag,msg) {
var div = this.findElement('pending');
if (div) {
if (flag) {
div.style.display = 'block';
}
else {
div.style.display = 'none';
}
}
}

self._DeepSee_Component_pivotTable_singleTableAdjustLayout = function() {
try {
var enc = this.getEnclosingDiv();
var outer = this.findElement('outerDiv');
var singleTable = this.findElement('dsPivotCompleteTable');
var singleTableDiv = this.findElement('dsPivotCompleteTableDiv');
var dataTable = this.findElement('dataTable');
var dataTableDiv = this.findElement('dataTableDiv');
var vtScroll = this.findElement('vtScroll');
var hzScroll = this.findElement('hzScroll');
var vtScrollInner = this.findElement('vtScrollInner');
var hzScrollInner = this.findElement('hzScrollInner');
var errorDiv = this.findElement('errorDiv');
var	status = this.findElement('statusDiv');
if (vtScroll) {
vtScroll.style.display = 'block';
}
if (hzScroll) {
hzScroll.style.display = 'block';
if (zenIsIE) {
hzScroll.style.height = '30px';
}
}
if (singleTable) {
singleTable.style.visibility='visible';
}
if (dataTable) {
dataTable.style.visibility='visible';
}
if (this.previewMode&&!this.allowPreviewInteraction) {
vtScroll.style.display = 'none';
hzScroll.style.display = 'none';
}
vtScrollWid = vtScroll ? vtScroll.offsetWidth : 0;
hzScrollHgt = hzScroll ? hzScroll.offsetHeight : 0;
if (!singleTable) {
if (vtScroll) {
vtScroll.style.display = 'none';
}
if (hzScroll) {
hzScroll.style.display = 'none';
}
}
var errHgt = errorDiv ? errorDiv.offsetHeight : 0;
var dtHgt = dataTable ? dataTable.offsetHeight : singleTable ? singleTable.offsetHeight : 0;
var dtWid = dataTable ? dataTable.offsetWidth : singleTable ? singleTable.offsetWidth : 0;
if (vtScrollInner) {
vtScrollInner.style.height = dtHgt + 'px';
}
if (hzScrollInner) {
hzScrollInner.style.width = dtWid + 'px';
}
if (outer && enc) {
outer.style.height = enc.offsetHeight + 'px';
outer.style.width = enc.offsetWidth + 'px';
}
var st_h = 0;
var st_w = 0
if (status && enc) {
st_h = status.offsetHeight;
st_w = status.offsetWidth;
status.style.top = (enc.offsetHeight - st_h) + 'px';
status.style.left = '0px';
status.style.right = '0px';
/*
if (status.children.length) {
status.style.display = 'block';
}
else {
status.style.display = 'none';
}
*/
}
if (errorDiv) {
errorDiv.style.bottom = st_h + 'px';
errorDiv.style.left = '0px';
errorDiv.style.right = '0px';
}
if (dataTableDiv && outer && hzScroll && vtScroll) {
dataTableDiv.style.width = outer.offsetWidth - hzScroll.offsetHeight + 'px';
if (this.kpi==='' && status) {
dataTableDiv.style.height = outer.offsetHeight - status.offsetHeight - vtScroll.offsetWidth + 'px';
}
else {
dataTableDiv.style.height = outer.offsetHeight - vtScroll.offsetWidth + 'px';
}
}
if (singleTableDiv && outer && hzScroll && vtScroll) {
singleTableDiv.style.width = outer.offsetWidth - hzScroll.offsetHeight + 'px';
if (this.kpi==='' && status) {
singleTableDiv.style.height = outer.offsetHeight - status.offsetHeight - vtScroll.offsetWidth + 'px';
}
else {
singleTableDiv.style.height = outer.offsetHeight - vtScroll.offsetWidth + 'px';
}
}
var singleTableWidth = singleTable ? singleTable.offsetWidth : 0;
var singleTableHeight = singleTable ? singleTable.offsetHeight : 0;
if (status) {
if (status.children.length || (singleTableDiv.clientHeight < singleTableDiv.scrollHeight)) {
status.style.display = 'block';
}
else {
status.style.display = 'none';
}
}
if (vtScroll && outer) {
vtScroll.style.right = '0px';
if (this.kpi==='' && status) {
vtScroll.style.height = outer.offsetHeight - status.offsetHeight - hzScroll.offsetHeight + 'px';
}
else {
vtScroll.style.height = outer.offsetHeight - hzScroll.offsetHeight + 'px';
}
}
if (hzScroll && outer) {
if ( (this.kpi==='') && status  && (st_w!=0) ) {
hzScroll.style.bottom = status.offsetHeight + 'px';
hzScroll.style.width = st_w - vtScroll.offsetWidth + 'px';
}
else {
hzScroll.style.bottom = '0px';
hzScroll.style.width = (enc.offsetWidth - vtScroll.offsetWidth) + 'px';
}
}
if (outer) {
outer.style.visibility = 'visible';
}
if (singleTableDiv) {
singleTableDiv.style.visibility = 'visible';
}
if (vtScroll && dataTableDiv && (dataTableDiv.clientHeight >= dataTableDiv.scrollHeight)) {
vtScroll.style.display = 'none';
}
if (hzScroll && dataTableDiv && (dataTableDiv.clientWidth >= dataTableDiv.scrollWidth)) {
hzScroll.style.display = 'none';
}
if (singleTable) {
var handler = new Function('evt','zenPage.getComponent('+this.index+').wheelHandler(evt);');
if (singleTable.addEventListener) {
singleTable.addEventListener('DOMMouseScroll', handler, false);
singleTable.addEventListener('mousewheel', handler, false);
}
else if(singleTable.attachEvent) {
singleTable.attachEvent('onmousewheel', handler);
}
}
if (singleTable) {
singleTable.style.height=singleTableDiv.style.height;
singleTable.style.width=singleTableDiv.style.width;
}
if (dataTableDiv) {
dataTableDiv.style.height=singleTableDiv.style.height;
dataTableDiv.style.width=singleTableDiv.style.width;
dataTableDiv.style.visibility='visible';
}
if (!errorDiv) {
if (this.absolutePositioning==1) {
this.absoluteAdjustLayout();
}
if (singleTableDiv) {		// DTB783 - Do not add the pivot coverPane if there is no table div
this.addPivotCoverPane(singleTableDiv);		// DTB701
this.setPivotDisabled((this.previewMode||this.headFunctionAdded)&&this.rowsTruncated);		// DTB714 - Adjust coverPane test conditions
}
}
}
catch(ex) {
alert('Error in singleTableAdjustLayout: ' + ex.message);
}
}

self._DeepSee_Component_pivotTable_startQueryTimer = function(needsRefresh) {
this.stopQueryTimer();
var interval = 200;
if (zenGet(needsRefresh,false)) {
this.sendEventToViews('beginWait');
this.showPendingMsg(true);
this._needsRefresh = true;
var interval = 50;
}
this.queryCalls++;
if (this.queryCalls > 5) {
interval = 800;
}
this._queryTimerId = self.setTimeout("zenPage.getComponent("+this.index+").queryTimerHandler()",interval);
}

self._DeepSee_Component_pivotTable_stopQueryTimer = function() {
if (this._queryTimerId) {
this.showPendingMsg(false);
self.clearTimeout(this._queryTimerId);
this._queryTimerId = null;
}
}

self._DeepSee_Component_pivotTable_swapRowsAndColumns = function() {
if (this.drillLevels.length>0) {
return;
}
if (this.rowLevels.length > 0 || this.columnLevels.length > 0) {
this.pushState();
var temp = this.rowLevels;
this.rowLevels = this.columnLevels;
this.columnLevels = temp;
temp = this.rowAxisOptions;
this.rowAxisOptions = this.columnAxisOptions;
this.columnAxisOptions = temp;
this.currPage = 1;
this.currListingPage = -1;
this.selectedRange = '';
this.sortColumn = 0;
this.sortDir = 'ASC';
this.executeQuery(this.autoExecute);
}
}

self._DeepSee_Component_pivotTable_unregister = function(component) {
if (this._listeners) {
for (var n = 0; n < this._listeners.length; n++) {
if (this._listeners[n] == component) {
this._listeners.splice(n,1);
break;
}
}
}
}

self._DeepSee_Component_pivotTable_updateController = function() {
if (this.controller && this.controller.updateState) {
this.controller.updateState();
}
}

self._DeepSee_Component_pivotTable_updateToolbar = function() {
if (this.controller && this.controller.updateToolbar) {
this.controller.updateToolbar();
}
}

self._DeepSee_Component_pivotTable_wheelHandler = function(evt) {
evt = evt ? evt : window.event;
var wheelDelta = evt.detail ? evt.detail * -1 : evt.wheelDelta;
var vtScroll = this.findElement('vtScroll');
if (vtScroll) {
var c1 = this.findElement('cell_1_1');
var d = c1 ? c1.offsetHeight : 40;
vtScroll.scrollTop = vtScroll.scrollTop + ((wheelDelta>0) ? -d : d);
this.cellScrollVt();
}
}

self._DeepSee_Component_pivotTable_DeleteLastResult = function() {
	return zenInstanceMethod(this,'DeleteLastResult','','VARCHAR',arguments);
}

self._DeepSee_Component_pivotTable_FormatValue = function(pCubeName,pQueryKey,pValue,pFormattedValue,pRowNo,pColNo) {
	return zenClassMethod(this,'FormatValue','L,L,L,O,L,L','BOOLEAN',arguments);
}

self._DeepSee_Component_pivotTable_GetCurrentQueryText = function(pWhich) {
	return zenInstanceMethod(this,'GetCurrentQueryText','L','VARCHAR',arguments);
}

self._DeepSee_Component_pivotTable_GetItemCaption = function(pCubeName,pSpec) {
	return zenClassMethod(this,'GetItemCaption','L,L','VARCHAR',arguments);
}

self._DeepSee_Component_pivotTable_GetItemSpec = function(pSpec,pCubeName,pQueryKey,pSortDir,pSortColumn,pAxisName,pItemNo,pItemNoSorted) {
	return zenClassMethod(this,'GetItemSpec','O,L,L,L,L,L,L,B','BOOLEAN',arguments);
}

self._DeepSee_Component_pivotTable_GetPivotVariableData = function(pCubeName,pVariableName,pValue) {
	return zenClassMethod(this,'GetPivotVariableData','L,L,L','HANDLE',arguments);
}

self._DeepSee_Component_pivotTable_GetQueryStatus = function(pObject,pCubeName,pQueryKey,pKPI) {
	return zenClassMethod(this,'GetQueryStatus','O,L,L,L','BOOLEAN',arguments);
}

self._DeepSee_Component_pivotTable_GetQueryText = function(pCubeName,pQueryKey,pEncrypt) {
	return zenClassMethod(this,'GetQueryText','L,L,B','VARCHAR',arguments);
}

self._DeepSee_Component_pivotTable_GetSlicerSpecForCells = function(pSpec,pCubeName,pQueryKey,pStartRow,pStartCol,pEndRow,pEndCol,pAllRows,pAllCols,pSortCol,pSortDir) {
	return zenClassMethod(this,'GetSlicerSpecForCells','O,L,L,L,L,L,L,B,B,L,L','BOOLEAN',arguments);
}

self._DeepSee_Component_pivotTable_KillQuery = function(pCubeName,pQueryKey,pNonce) {
	return zenClassMethod(this,'KillQuery','L,L,L','BOOLEAN',arguments);
}

self._DeepSee_Component_pivotTable_ParseMDXExpression = function(pExpression,pCubeName) {
	return zenClassMethod(this,'ParseMDXExpression','L,L','VARCHAR',arguments);
}

self._DeepSee_Component_pivotTable_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}

self._DeepSee_Component_pivotTable_SetCurrentQueryText = function(pWhich,pMDX) {
	return zenInstanceMethod(this,'SetCurrentQueryText','L,L','STATUS',arguments);
}

self._DeepSee_Component_pivotTable_SynthesizeMDX = function(pSC,pRS,pParms,pFilterInfo,pAdvancedFilters,pQueryText,pAxes,pDataReady,pComplexQuery,pExecuteBaseQuery,pShowAll) {
	return zenInstanceMethod(this,'SynthesizeMDX','L,O,L,L,L,L,L,B,B,B,B','VARCHAR',arguments);
}
self._DeepSee_Component_pivotTable__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_DeepSee_Component_pivotTable.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _DeepSee_Component_pivotTable.prototype;
	if (null==p) {return;}
	p.constructor = _DeepSee_Component_pivotTable;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%DeepSee.Component.pivotTable';
	p._type = 'pivotTable';
	p.serialize = _DeepSee_Component_pivotTable_serialize;
	p.getSettings = _DeepSee_Component_pivotTable_getSettings;
	p.DeleteLastResult = _DeepSee_Component_pivotTable_DeleteLastResult;
	p.FormatValue = _DeepSee_Component_pivotTable_FormatValue;
	p.GetCurrentQueryText = _DeepSee_Component_pivotTable_GetCurrentQueryText;
	p.GetItemCaption = _DeepSee_Component_pivotTable_GetItemCaption;
	p.GetItemSpec = _DeepSee_Component_pivotTable_GetItemSpec;
	p.GetPivotVariableData = _DeepSee_Component_pivotTable_GetPivotVariableData;
	p.GetQueryStatus = _DeepSee_Component_pivotTable_GetQueryStatus;
	p.GetQueryText = _DeepSee_Component_pivotTable_GetQueryText;
	p.GetSlicerSpecForCells = _DeepSee_Component_pivotTable_GetSlicerSpecForCells;
	p.KillQuery = _DeepSee_Component_pivotTable_KillQuery;
	p.ParseMDXExpression = _DeepSee_Component_pivotTable_ParseMDXExpression;
	p.ReallyRefreshContents = _DeepSee_Component_pivotTable_ReallyRefreshContents;
	p.SetCurrentQueryText = _DeepSee_Component_pivotTable_SetCurrentQueryText;
	p.SynthesizeMDX = _DeepSee_Component_pivotTable_SynthesizeMDX;
	p.absoluteAdjustLayout = _DeepSee_Component_pivotTable_absoluteAdjustLayout;
	p.addController = _DeepSee_Component_pivotTable_addController;
	p.addPivotCoverPane = _DeepSee_Component_pivotTable_addPivotCoverPane;
	p.adjustCellSize = _DeepSee_Component_pivotTable_adjustCellSize;
	p.adjustTableLayout = _DeepSee_Component_pivotTable_adjustTableLayout;
	p.allClick = _DeepSee_Component_pivotTable_allClick;
	p.allClickPivot = _DeepSee_Component_pivotTable_allClickPivot;
	p.callFormatValue = _DeepSee_Component_pivotTable_callFormatValue;
	p.callGetItemSpec = _DeepSee_Component_pivotTable_callGetItemSpec;
	p.callbackExportRStoPDF = _DeepSee_Component_pivotTable_callbackExportRStoPDF;
	p.callbackRSPending = _DeepSee_Component_pivotTable_callbackRSPending;
	p.canDrillThrough = _DeepSee_Component_pivotTable_canDrillThrough;
	p.canGoBack = _DeepSee_Component_pivotTable_canGoBack;
	p.canGoForward = _DeepSee_Component_pivotTable_canGoForward;
	p.cancelQuery = _DeepSee_Component_pivotTable_cancelQuery;
	p.cbClick = _DeepSee_Component_pivotTable_cbClick;
	p.cbClickPivot = _DeepSee_Component_pivotTable_cbClickPivot;
	p.cellClickHandler = _DeepSee_Component_pivotTable_cellClickHandler;
	p.cellDblClickHandler = _DeepSee_Component_pivotTable_cellDblClickHandler;
	p.cellMouseDownHandler = _DeepSee_Component_pivotTable_cellMouseDownHandler;
	p.cellScrollHz = _DeepSee_Component_pivotTable_cellScrollHz;
	p.cellScrollVt = _DeepSee_Component_pivotTable_cellScrollVt;
	p.columnClickHandler = _DeepSee_Component_pivotTable_columnClickHandler;
	p.columnDblClickHandler = _DeepSee_Component_pivotTable_columnDblClickHandler;
	p.computeCaption = _DeepSee_Component_pivotTable_computeCaption;
	p.computeDivSize = _DeepSee_Component_pivotTable_computeDivSize;
	p.computeTotals = _DeepSee_Component_pivotTable_computeTotals;
	p.copyState = _DeepSee_Component_pivotTable_copyState;
	p.dateFromHorolog = _DeepSee_Component_pivotTable_dateFromHorolog;
	p.deferredExecuteQuery = _DeepSee_Component_pivotTable_deferredExecuteQuery;
	p.dragFinishHandler = _DeepSee_Component_pivotTable_dragFinishHandler;
	p.dragStartHandler = _DeepSee_Component_pivotTable_dragStartHandler;
	p.drillThrough = _DeepSee_Component_pivotTable_drillThrough;
	p.dropStartHandler = _DeepSee_Component_pivotTable_dropStartHandler;
	p.executeListing = _DeepSee_Component_pivotTable_executeListing;
	p.executeQuery = _DeepSee_Component_pivotTable_executeQuery;
	p.exportToPDF = _DeepSee_Component_pivotTable_exportToPDF;
	p.filterLabelClick = _DeepSee_Component_pivotTable_filterLabelClick;
	p.firstPage = _DeepSee_Component_pivotTable_firstPage;
	p.getColumnDescriptors = _DeepSee_Component_pivotTable_getColumnDescriptors;
	p.getContent = _DeepSee_Component_pivotTable_getContent;
	p.getCurrPage = _DeepSee_Component_pivotTable_getCurrPage;
	p.getData = _DeepSee_Component_pivotTable_getData;
	p.getDataAsArrays = _DeepSee_Component_pivotTable_getDataAsArrays;
	p.getDataByName = _DeepSee_Component_pivotTable_getDataByName;
	p.getDataSourceCaption = _DeepSee_Component_pivotTable_getDataSourceCaption;
	p.getDimGrouping = _DeepSee_Component_pivotTable_getDimGrouping;
	p.getDimName = _DeepSee_Component_pivotTable_getDimName;
	p.getDimSize = _DeepSee_Component_pivotTable_getDimSize;
	p.getDimensions = _DeepSee_Component_pivotTable_getDimensions;
	p.getDrillLevel = _DeepSee_Component_pivotTable_getDrillLevel;
	p.getFilterForCells = _DeepSee_Component_pivotTable_getFilterForCells;
	p.getFilterInfo = _DeepSee_Component_pivotTable_getFilterInfo;
	p.getLabel = _DeepSee_Component_pivotTable_getLabel;
	p.getListingPageCount = _DeepSee_Component_pivotTable_getListingPageCount;
	p.getPageCount = _DeepSee_Component_pivotTable_getPageCount;
	p.getPageSize = _DeepSee_Component_pivotTable_getPageSize;
	p.getPivotVariableInfo = _DeepSee_Component_pivotTable_getPivotVariableInfo;
	p.getPivotVariablesValues = _DeepSee_Component_pivotTable_getPivotVariablesValues;
	p.getPropertyDim = _DeepSee_Component_pivotTable_getPropertyDim;
	p.getPropertyName = _DeepSee_Component_pivotTable_getPropertyName;
	p.getRecordCount = _DeepSee_Component_pivotTable_getRecordCount;
	p.getRowCaptions = _DeepSee_Component_pivotTable_getRowCaptions;
	p.getRowDescriptors = _DeepSee_Component_pivotTable_getRowDescriptors;
	p.getSelectedItems = _DeepSee_Component_pivotTable_getSelectedItems;
	p.getSelectedRange = _DeepSee_Component_pivotTable_getSelectedRange;
	p.getValueName = _DeepSee_Component_pivotTable_getValueName;
	p.goBack = _DeepSee_Component_pivotTable_goBack;
	p.goForward = _DeepSee_Component_pivotTable_goForward;
	p.gotoDrillLevel = _DeepSee_Component_pivotTable_gotoDrillLevel;
	p.gotoPage = _DeepSee_Component_pivotTable_gotoPage;
	p.hasFormatRules = _DeepSee_Component_pivotTable_hasFormatRules;
	p.hideMessage = _DeepSee_Component_pivotTable_hideMessage;
	p.ieLayout = _DeepSee_Component_pivotTable_ieLayout;
	p.itemMouseDown = _DeepSee_Component_pivotTable_itemMouseDown;
	p.itemMouseUp = _DeepSee_Component_pivotTable_itemMouseUp;
	p.lastPage = _DeepSee_Component_pivotTable_lastPage;
	p.listingHeaderDblClickHandler = _DeepSee_Component_pivotTable_listingHeaderDblClickHandler;
	p.newDataHandler = _DeepSee_Component_pivotTable_newDataHandler;
	p.nextPage = _DeepSee_Component_pivotTable_nextPage;
	p.onloadHandler = _DeepSee_Component_pivotTable_onloadHandler;
	p.onunloadHandler = _DeepSee_Component_pivotTable_onunloadHandler;
	p.onupdateHandler = _DeepSee_Component_pivotTable_onupdateHandler;
	p.popState = _DeepSee_Component_pivotTable_popState;
	p.previousPage = _DeepSee_Component_pivotTable_previousPage;
	p.processAxisColumns = _DeepSee_Component_pivotTable_processAxisColumns;
	p.processAxisRows = _DeepSee_Component_pivotTable_processAxisRows;
	p.pushState = _DeepSee_Component_pivotTable_pushState;
	p.queryTimerHandler = _DeepSee_Component_pivotTable_queryTimerHandler;
	p.raiseDataChange = _DeepSee_Component_pivotTable_raiseDataChange;
	p.register = _DeepSee_Component_pivotTable_register;
	p.removeAllDrillLevels = _DeepSee_Component_pivotTable_removeAllDrillLevels;
	p.removeController = _DeepSee_Component_pivotTable_removeController;
	p.removeDrillLevel = _DeepSee_Component_pivotTable_removeDrillLevel;
	p.removeMeasureLabels = _DeepSee_Component_pivotTable_removeMeasureLabels;
	p.resetTable = _DeepSee_Component_pivotTable_resetTable;
	p.rowClickHandler = _DeepSee_Component_pivotTable_rowClickHandler;
	p.rowDblClickHandler = _DeepSee_Component_pivotTable_rowDblClickHandler;
	p.selectCellRange = _DeepSee_Component_pivotTable_selectCellRange;
	p.sendEventToViews = _DeepSee_Component_pivotTable_sendEventToViews;
	p.setCurrPage = _DeepSee_Component_pivotTable_setCurrPage;
	p.setDrillThrough = _DeepSee_Component_pivotTable_setDrillThrough;
	p.setListing = _DeepSee_Component_pivotTable_setListing;
	p.setPivotDisabled = _DeepSee_Component_pivotTable_setPivotDisabled;
	p.setProperty = _DeepSee_Component_pivotTable_setProperty;
	p.showAllRows = _DeepSee_Component_pivotTable_showAllRows;
	p.showIKnowMeasureValue = _DeepSee_Component_pivotTable_showIKnowMeasureValue;
	p.showMDXQuery = _DeepSee_Component_pivotTable_showMDXQuery;
	p.showMessage = _DeepSee_Component_pivotTable_showMessage;
	p.showPendingMsg = _DeepSee_Component_pivotTable_showPendingMsg;
	p.singleTableAdjustLayout = _DeepSee_Component_pivotTable_singleTableAdjustLayout;
	p.startQueryTimer = _DeepSee_Component_pivotTable_startQueryTimer;
	p.stopQueryTimer = _DeepSee_Component_pivotTable_stopQueryTimer;
	p.swapRowsAndColumns = _DeepSee_Component_pivotTable_swapRowsAndColumns;
	p.unregister = _DeepSee_Component_pivotTable_unregister;
	p.updateController = _DeepSee_Component_pivotTable_updateController;
	p.updateToolbar = _DeepSee_Component_pivotTable_updateToolbar;
	p.wheelHandler = _DeepSee_Component_pivotTable_wheelHandler;
}

self._zenClassIdx['http://www.intersystems.com/deepsee/deepseeSvgImageProvider'] = '_DeepSee_Component_deepseeSvgImageProvider';
self._DeepSee_Component_deepseeSvgImageProvider = function(index,id) {
	if (index>=0) {_DeepSee_Component_deepseeSvgImageProvider__init(this,index,id);}
}

self._DeepSee_Component_deepseeSvgImageProvider__init = function(o,index,id) {
	('undefined' == typeof _ZEN_ComponentEx_svgImageProvider__init) ?zenMaster._ZEN_ComponentEx_svgImageProvider__init(o,index,id):_ZEN_ComponentEx_svgImageProvider__init(o,index,id);
	o.printParameters = '';
}
function _DeepSee_Component_deepseeSvgImageProvider_serialize(set,s)
{
	var o = this;s[0]='2758698000';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.containerStyle;s[9]=(o.dragEnabled?1:0);s[10]=(o.dropEnabled?1:0);s[11]=(o.dynamic?1:0);s[12]=o.enclosingClass;s[13]=o.enclosingStyle;s[14]=o.error;s[15]=o.height;s[16]=(o.hidden?1:0);s[17]=o.hint;s[18]=o.hintClass;s[19]=o.hintStyle;s[20]=o.label;s[21]=o.labelClass;s[22]=o.labelDisabledClass;s[23]=o.labelStyle;s[24]=o.onafterdrag;s[25]=o.onbeforedrag;s[26]=o.ondrag;s[27]=o.ondrop;s[28]=o.onhide;s[29]=o.onrefresh;s[30]=o.onshow;s[31]=o.onupdate;s[32]=o.overlayMode;s[33]=o.printParameters;s[34]=o.renderFlag;s[35]=(o.showLabel?1:0);s[36]=o.slice;s[37]=o.title;s[38]=o.tuple;s[39]=o.valign;s[40]=(o.visible?1:0);s[41]=o.width;
}
function _DeepSee_Component_deepseeSvgImageProvider_getSettings(s)
{
	s['name'] = 'string';
	s['printParameters'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._DeepSee_Component_deepseeSvgImageProvider_addSVGLegendToChart = function(chartDocument,legendSVG,legendPosition) {
if ((!legendPosition)||('none'==legendPosition)) {
return;
}
var chartSVG = null;
var chartScalingGroup = null;
for (var p=chartDocument.firstChild; p!=null; p=p.nextSibling) {
if ('svg'==p.nodeName) {
chartSVG = p;
}
}
if (chartSVG) {
for (var g=chartSVG.firstChild; g!=null; g=g.nextSibling) {
if (('g'==g.nodeName)&&('zenScalingGroup'==g.id)) {
chartScalingGroup = g;
}
}
}
else {
return;
}
if (!chartScalingGroup) {
return;
}
var legendGroup = legendSVG.childNodes[0]
var cw = parseFloat(chartSVG.getAttribute('width'));
var ch = parseFloat(chartSVG.getAttribute('height'));
var lw = parseFloat(legendSVG.getAttribute('width'));
var lh = parseFloat(legendSVG.getAttribute('height'));
if ('left'==legendPosition) {
chartScalingGroup.setAttribute('transform','translate('+lw+' 0)');
chartSVG.setAttribute('width',cw+lw);
if (lh > ch) {
chartSVG.setAttribute('height',lh);
}
}
else if ('top'==legendPosition) {
chartScalingGroup.setAttribute('transform','translate(0 '+lh+')');
chartSVG.setAttribute('height',ch+lh);
if (lw > cw) {
chartSVG.setAttribute('width',lh);
}
}
else if ('right'==legendPosition) {
legendGroup.setAttribute('transform','translate('+cw+' 0)');
chartSVG.setAttribute('width',cw+lw);
if (lh > ch) {
chartSVG.setAttribute('height',lh);
}
}
else if ('bottom'==legendPosition) {
legendGroup.setAttribute('transform','translate(0 '+ch+')');
chartSVG.setAttribute('height',ch+lh);
if (lw > cw) {
chartSVG.setAttribute('width',lh);
}
}
chartSVG.appendChild(legendGroup);
return chartDocument;
}

self._DeepSee_Component_deepseeSvgImageProvider_applyHTMLStyleToSVG = function(svgNode,htmlStyle,forBatik,suppressPadding) {
var nodeHeight = parseFloat(svgNode.getAttribute('height'));
var nodeWidth = parseFloat(svgNode.getAttribute('width'));
var nodeX = (svgNode.getAttribute('x') ? parseFloat(svgNode.getAttribute('x')) : 0);
var nodeY = (svgNode.getAttribute('y') ? parseFloat(svgNode.getAttribute('y')) : 0);
var fontSize = htmlStyle.fontSize;
var fontFamily = htmlStyle.fontFamily;
var printParameters = this.getPrintParameters();
if (printParameters) {
if (svgNode.id.indexOf('col')>=0) {
if (printParameters.FONTSIZECOL) {
fontSize = this.convertSizeToPoint(printParameters.FONTSIZECOL).value;
}
if (printParameters.FONTFAMILYCOL) {
fontFamily = printParameters.FONTFAMILYCOL
}
}
else if (svgNode.id.indexOf('row')>=0) {
if (printParameters.FONTSIZEROW) {
fontSize = this.convertSizeToPoint(printParameters.FONTSIZEROW).value;
}
if (printParameters.FONTFAMILYROW) {
fontFamily = printParameters.FONTFAMILYROW
}
}
else if (svgNode.id.indexOf('cell')>=0) {
if (printParameters.FONTSIZECELL) {
fontSize = this.convertSizeToPoint(printParameters.FONTSIZECELL).value;
}
if (printParameters.FONTFAMILYCELL) {
fontFamily = printParameters.FONTFAMILYCELL
}
}
}
if ('text'==svgNode.nodeName) {
if (fontSize) {
svgNode.setAttribute('style',zenGet(svgNode.getAttribute('style'))+'font-size:'+fontSize+';');		// DTB744 - Prevent null from ending up in the style
}
if (fontFamily) {
svgNode.setAttribute('style',zenGet(svgNode.getAttribute('style'))+'font-family:'+fontFamily+';');		// DTB744 - Prevent null from ending up in the style
}
svgNode.setAttribute('font-weight',(htmlStyle.fontWeight)?htmlStyle.fontWeight:'normal');	// DTB350
if (htmlStyle.color) {
svgNode.setAttribute('fill',htmlStyle.color);
svgNode.setAttribute('stroke',htmlStyle.color);
}
svgNode.setAttribute('stroke-width',0);
var textAlign = htmlStyle.textAlign;
var textAnchor = '';
var maxPadding = (suppressPadding ? 0 : 2);		// DTB407
if (nodeWidth) {
if (textAlign.indexOf('left')>=0) {
textAnchor = 'start';
svgNode.setAttribute('x',nodeX + Math.min(nodeWidth*0.1,maxPadding));		// DTB407 - Impose a maximum padding
}
else if (textAlign.indexOf('center')>=0) {
textAnchor = 'middle';
svgNode.setAttribute('x',nodeX + (nodeWidth*0.5));
}
else if (textAlign.indexOf('right')>=0) {
textAnchor = 'end';
svgNode.setAttribute('x',nodeX + Math.max(nodeWidth*0.9,nodeWidth-maxPadding));		// DTB407 - Impose a maximum padding
}
else {
textAnchor = 'start';
svgNode.setAttribute('x',nodeX + Math.min(nodeWidth*0.1,maxPadding));		// DTB407 - Impose a maximum padding
}
}
if (nodeHeight) {
svgNode.setAttribute('y',nodeY + (nodeHeight+parseFloat((fontSize ? fontSize : 0)))*0.5);
}
svgNode.setAttribute('text-anchor',textAnchor);
}
else {
var htmlBackground = ( htmlStyle.backgroundColor ? htmlStyle.backgroundColor : htmlStyle.fill );
if ((htmlBackground) &&
(('rgba(0,0,0,0)'==htmlBackground.replace(/ /g,'') ||
('transparent'==htmlBackground))) &&
(htmlStyle.backgroundImage) &&
(htmlStyle.backgroundImage.indexOf('linear-gradient')>=0)) {
htmlBackground = 'rgb(232,232,232)';
}
else if ((htmlBackground) && ('transparent'==htmlBackground)) {
htmlBackground = 'rgb(255,255,255)';
}
svgNode.setAttribute('fill',htmlBackground);
svgNode.setAttribute('stroke','#000000');
}
if (forBatik) {
var svgFill = svgNode.getAttribute('fill');
if ((svgFill)&&(svgFill.indexOf("rgba(")>=0)) { // Batik doesn't take RGBA values
var tmp = svgFill.split("rgba(");
for (var i=1;i<tmp.length;i++) {
var balance = tmp[i];
var tmp2 = balance.split(")");
var args = tmp2[0].split(",");
if (0==args[3].trim()) {
tmp2[0]='255,255,255';
}
else {
tmp2[0]=args[0]+","+args[1]+","+args[2];
}
tmp[i] = tmp2.join(")");
}
svgNode.setAttribute('fill',tmp.join("rgb("));
}
}
}

self._DeepSee_Component_deepseeSvgImageProvider_calculateMaxImageHeight = function(metaDataJS) {
var permittedScaling = 1.25;
var imageHeight = 0;
var requestedImageHeight = 0;
if (metaDataJS.imageHeight) {
requestedImageHeight = this.convertSizeToPoint(metaDataJS.imageHeight);
}
var settings = this.reconcileDefaults(metaDataJS);
var pageHeight = this.convertSizeToPoint(settings.pageHeight);
var marginTop = this.convertSizeToPoint(settings.marginTop);
var marginBottom = this.convertSizeToPoint(settings.marginBottom);
var calcImageHeight = (pageHeight.value - (marginTop.value + marginBottom.value));
calcImageHeight -= 72;
if (('on' == metaDataJS.SUBTITLEON) && ('' != metaDataJS.SUBTITLE)) {
calcImageHeight -= 16;
}
if ('on'==metaDataJS.SHOWUSER) {
calcImageHeight -= 16;
}
if ('on' == metaDataJS.SHOWDATE) {
calcImageHeight -= 16;
}
if ((metaDataJS.filterTable)&&(metaDataJS.filterTable.rows)) {
var filterTableStyle = (metaDataJS.FILTERTABLESTYLE) ? this.parseCssStyleString(metaDataJS.FILTERTABLESTYLE) : {};
var filterTabTitleFontSize = 2*((filterTableStyle['font-size']) ? this.convertSizeToPoint(filterTableStyle['font-size']).value : 8);		// Reserve double the font size for each row
filterTabTitleFontSize += 4;		// Assume 2pt padding
var filterTableCaptionStyle = (metaDataJS.FILTERTABLECAPTIONSTYLE) ? this.parseCssStyleString(metaDataJS.FILTERTABLECAPTIONSTYLE) : {};
var filterTableItemStyle = (metaDataJS.FILTERTABLEITEMSTYLE) ? this.parseCssStyleString(metaDataJS.FILTERTABLEITEMSTYLE) : {};
var filterTabHeaderFontSize = 16;
if (filterTableCaptionStyle['font-size']) {
filterTabHeaderFontSize = 2*this.convertSizeToPoint(filterTableCaptionStyle['font-size']).value;
}
filterTabHeaderFontSize += 4;		// Assume 2pt padding
var filterTabItemFontSize = 12;
if (filterTableItemStyle['font-size']) {
filterTabItemFontSize = 2*this.convertSizeToPoint(filterTableItemStyle['font-size']).value;
}
filterTabItemFontSize += 4;		// Assume 2pt padding
calcImageHeight -= filterTabTitleFontSize;		// "Filter Values" text
calcImageHeight -= filterTabHeaderFontSize;		// Headers text
calcImageHeight -= (filterTabItemFontSize*metaDataJS.filterTable.rows.length);		// Value rows
}
if ((requestedImageHeight) && ((permittedScaling*requestedImageHeight.value) < calcImageHeight)) {
imageHeight = permittedScaling*requestedImageHeight.value;
}
else {
imageHeight = calcImageHeight;
}
return imageHeight + 'pt';
}

self._DeepSee_Component_deepseeSvgImageProvider_calculateMaxImageWidth = function(metaDataJS) {
var permittedScaling = 1.25;
var imageWidth = 0;
var requestedImageWidth = 0;
if (metaDataJS.imageWidth) {
requestedImageWidth = this.convertSizeToPoint(metaDataJS.imageWidth);
}
var settings = this.reconcileDefaults(metaDataJS);
var pageWidth = this.convertSizeToPoint(settings.pageWidth);
var marginLeft = this.convertSizeToPoint(settings.marginLeft);
var marginRight = this.convertSizeToPoint(settings.marginRight);
var calcImageWidth = (pageWidth.value - (marginLeft.value + marginRight.value));
if ((requestedImageWidth) && ((permittedScaling*requestedImageWidth.value) < calcImageWidth)) {
imageWidth = permittedScaling*requestedImageWidth.value;
}
else {
imageWidth = calcImageWidth;
}
return imageWidth + 'pt';
}

self._DeepSee_Component_deepseeSvgImageProvider_clipSvgContent = function(svgContent,height,width,clipTargetId,clipX,clipY) {
var clippedTargetId = 'clipPrintFrame';
var clippedFrame = this.createSvgTableFrame(clippedTargetId,height,width);
height = +height; width = +width; clipX = +clipX; clipY = +clipY;		// Normalize to numeric
var svgFrame = svgContent.querySelector('svg');
if (svgFrame.querySelector('defs')) {
svgFrame.removeChild(svgContent.querySelector('defs'));
}
var frameHeight = svgFrame.height.baseVal.value;
var frameWidth = svgFrame.width.baseVal.value;
svgContent.querySelector('g[id*='+clipTargetId+']').setAttribute('transform','translate(-'+clipX+',-'+clipY+')');
clippedFrame.querySelector('g[id*='+clippedTargetId+']').setAttribute('transform','translate(-'+clipX+',-'+clipY+')');
var scaleFactor = frameWidth/this.parseSize(width).value;
var clipHeight = this.parseSize(height).value*scaleFactor;
var clipWidth = this.parseSize(width).value*scaleFactor;
var svgClipRect = document.createElementNS(SVGNS,'rect');
svgClipRect.setAttribute('x',0);
svgClipRect.setAttribute('y',0);
svgClipRect.setAttribute('height',clipHeight);
svgClipRect.setAttribute('width',clipWidth);
svgClipRect.setAttribute('stroke','#000000');
var svgClipPath = document.createElementNS(SVGNS,'clipPath');
svgClipPath.appendChild(svgClipRect);
svgClipPath.id = "clipWindow";
var svgDef = document.createElementNS(SVGNS,'defs');
svgDef.appendChild(svgClipPath);
clippedFrame.appendChild(svgDef);
clippedFrame.setAttribute('clip-path','url(#clipWindow)');
clippedFrame.setAttribute('height',clipHeight);
var clippedTable = clippedFrame.querySelector('g[id*='+clippedTargetId+'_table]');
nodes = svgFrame.querySelectorAll('g[id*=rcap] > rect, g[id*=col] > rect, g[id*=cell] > rect,g[id*=row] > rect');
nodes.forEach( function(node) {
if ((node.getAttribute('x') >= clipX) && (node.getAttribute('x') < (clipX+width)) &&
(node.getAttribute('y') >= clipY) && (node.getAttribute('y') < (clipY+height))) {
clippedTable.appendChild(node.parentNode);
}
}
);
var enclosingDiv = document.createElement('div');
enclosingDiv.appendChild(clippedFrame);
return enclosingDiv;
}

self._DeepSee_Component_deepseeSvgImageProvider_convertHTMLCellToSVGRect = function(htmlCell,geometry) {
var svgCell = document.createElementNS(SVGNS,'g');
var idString = 'svg_';
if (htmlCell.id) {
idString += htmlCell.id;
}
else {
if (!zenPage._cellIdNo) {
zenPage._cellIdNo = 0;
}
idString += 'Cell'+zenPage._cellIdNo;
zenPage._cellIdNo++;
}
svgCell.id = idString;
var htmlStyle = window.getComputedStyle(htmlCell,null);
var svgRect = document.createElementNS(SVGNS,'rect');
svgRect.id = svgCell.id + '_rect';
for (g in geometry) {
svgRect.setAttribute(g,geometry[g]);
}
this.applyHTMLStyleToSVG(svgRect,htmlStyle,1);
svgCell.appendChild(svgRect);
if ('DIV'==htmlCell.childNodes[0].nodeName) {
var childDiv = htmlCell.childNodes[0];
var divClass = childDiv.getAttribute('class');
if ('dslegendBox'==divClass) {
var divStyle = window.getComputedStyle(childDiv,null);
this.applyHTMLStyleToSVG(svgRect,divStyle,1);
}
else {
if (1==childDiv.childNodes.length) {
if (htmlCell.innerText) {
var htmlTextStr = htmlCell.innerText.trim();
}
else if (htmlCell.textContent) {
var htmlTextStr = htmlCell.textContent.trim();
}
if (htmlTextStr) {
var svgText = this.createSVGTextNode(htmlTextStr,svgCell.id+'_text',geometry,htmlStyle);
svgCell.appendChild(svgText);
}
}
else if (2==childDiv.childNodes.length) {
var firstNode = childDiv.childNodes[0];
var secondNode = childDiv.childNodes[1];
if ('IMG'==secondNode.nodeName) {
var svgImage = document.createElementNS(SVGNS,"image");
svgImage.id = svgCell.id + '_image';
svgImage.setAttribute('xlink:href',secondNode.src);
for (g in geometry) {
svgImage.setAttribute(g,geometry[g]);
}
svgCell.appendChild(svgImage);
} else if ('#text'==secondNode.nodeName) {
if (secondNode.innerText) {
var htmlTextStr = secondNode.innerText.trim();
}
else if (secondNode.textContent) {
var htmlTextStr = secondNode.textContent.trim();
}
if (htmlTextStr) {
var svgText = this.createSVGTextNode(htmlTextStr,svgCell.id+'_text',geometry,htmlStyle);
svgCell.appendChild(svgText);
}
}
}
}
}
else if ('#text'==htmlCell.childNodes[0].nodeName) {
if (htmlCell.innerText) {
var htmlTextStr = htmlCell.innerText.trim();
}
else if (htmlCell.textContent) {
var htmlTextStr = htmlCell.textContent.trim();
}
var svgText = this.createSVGTextNode(htmlTextStr,svgCell.id+'_text',geometry,htmlStyle);
svgCell.appendChild(svgText);
}
return svgCell;
}

self._DeepSee_Component_deepseeSvgImageProvider_convertHTMLTableToSVG = function(table,defaultId) {
var tableId = (table.id ? table.id : defaultId)
var svgFrame = document.createElementNS(SVGNS,'svg');
var svgFrameId = 'svg_' + tableId;
svgFrame.id = svgFrameId;
svgFrame.setAttribute('xmlns:xlink','http://www.w3.org/1999/xlink');
svgFrame.setAttribute('height',table.offsetHeight);
svgFrame.setAttribute('width',table.offsetWidth);
svgFrame.setAttribute('xmlns',SVGNS);
var svgTable = document.createElementNS(SVGNS,'g');
svgTable.id = 'svg_' + tableId + '_table';
svgTable.setAttribute('x',0);
svgTable.setAttribute('y',0);
var svgTableBorder = document.createElementNS(SVGNS,'rect');
svgTableBorder.id = 'svg_' + tableId + '_border';
svgTableBorder.setAttribute('stroke','#000000');
svgTableBorder.setAttribute('stroke-width',3);
svgTableBorder.setAttribute('fill','#ffffff');
svgTableBorder.setAttribute('height',table.offsetHeight);
svgTableBorder.setAttribute('width',table.offsetWidth);
svgTable.appendChild(svgTableBorder);
svgFrame.appendChild(svgTable);
this.dumpDOMTreeGeometry(table,svgTable);
return svgFrame;
}

self._DeepSee_Component_deepseeSvgImageProvider_convertSizeToPoint = function(sizeStr) {
var size = this.parseSize(sizeStr);
if ('pt'==size.units) {
}
else if ('in'==size.units) {
size.value = size.value*72;
size.units = 'pt';
}
else if ('mm'==size.units) {
size.value = Math.round(size.value/0.352777778);
size.units = 'pt';
}
else if ('px'==size.units) {
size.value = size.value*(72/this.getPPI());
size.units = 'pt';
}
else if (''==size.units) {
size.units = 'pt';
}
else {
size.units = 'pt';
}
if (isNaN(size.value)) {
size.value = 0;
size.units = 'pt';
}
return size;
}

self._DeepSee_Component_deepseeSvgImageProvider_createSVGTableFromResultSet = function(jsRS,htmlTemplateId,parms) {
parms.isTable = true;		// At this point this is known to be a table. Flag it.
var templateTable = zenGetComponentById(htmlTemplateId);
var pivotZenId = templateTable.index;
var svgTemplateTable = this.createSVGTableFromZenComponent(htmlTemplateId);
if (parseFloat(svgTemplateTable.getAttribute('height')) < parseFloat(svgTemplateTable.getAttribute('width'))) {
return svgTemplateTable;
}
var rowGeometryTemplate = {colWidths:[]};
var dataTable = svgTemplateTable.childNodes[0];
rowGeometryTemplate.height = svgTemplateTable.querySelector('g[id*=svg_cell_1_'+jsRS.getColumnCount()+']').childNodes[0].height.baseVal.value;
var rcaps = svgTemplateTable.querySelectorAll('g[id*=svg_rcap]');
var colHdrs = svgTemplateTable.querySelectorAll('g[id*=svg_col]');
var cbShift = 0;
if ((!rcaps.length)) {
cbShift = -colHdrs[0].firstChild.getAttribute('x');
colHdrs.forEach( function(node) {
for (child in node.children) {
if (node.children[child].getAttribute) {
node.children[child].setAttribute('x',cbShift + parseFloat(node.children[child].getAttribute('x')));
}
}
}
)
}
rcaps.forEach( function(node) {
rowGeometryTemplate.colWidths.push(parseFloat(node.childNodes[0].getAttribute('width')));
}
)
svgTemplateTable.querySelectorAll('g[id*=svg_cell_1_]').forEach( function(node) {
rowGeometryTemplate.colWidths.push(parseFloat(node.childNodes[0].getAttribute('width')));
}
)
var sampleHeader = document.querySelector('th[id*=col_1][id$=_'+pivotZenId+']');
var sampleCell = document.querySelector('td[id*=cell_1][id$=_'+pivotZenId+']');
var headerHTMLStyle = window.getComputedStyle(sampleHeader,null);
var cellHTMLStyle = window.getComputedStyle(sampleCell,null);
var svgPrintFrame = document.createElementNS(SVGNS,'svg');
svgPrintFrame.id = 'svg_frame';
svgPrintFrame.setAttribute('xmlns:xlink','http://www.w3.org/1999/xlink');
svgPrintFrame.setAttribute('xmlns',SVGNS);
var svgInnerTable = document.createElementNS(SVGNS,'g');
svgInnerTable.id = 'svg_table';
svgInnerTable.setAttribute('x',0);
svgInnerTable.setAttribute('y',0);
svgPrintFrame.appendChild(svgInnerTable);
var svgTableBorder = document.createElementNS(SVGNS,'rect');
svgTableBorder.id = 'svg_border';
svgTableBorder.setAttribute('stroke','#000000');
svgTableBorder.setAttribute('stroke-width',3);
svgTableBorder.setAttribute('fill','#ffffff');
svgInnerTable.appendChild(svgTableBorder);
rcaps.forEach( function(node) {
var nodeCopy = node.cloneNode(true);
nodeCopy.id += 'copy';
svgInnerTable.appendChild(nodeCopy);
}
)
colHdrs.forEach( function(node) {
var nodeCopy = node.cloneNode(true);
nodeCopy.id += 'copy';
svgInnerTable.appendChild(nodeCopy);
}
)
var svgWorkSpace = this.createTempSvgContainer();
svgWorkSpace.appendChild(svgPrintFrame);
var headerHeight = svgPrintFrame.getBBox().height;
svgWorkSpace.removeChild(svgPrintFrame);
parms.tableGeometry = {'headerHeight':headerHeight,'cellHeight':rowGeometryTemplate.height};
var currCol = 0
var currNodeGeometry = {};
var currRowLabels = null;
var currValue = null;
currNodeGeometry.height = rowGeometryTemplate.height;		// Same for all cells
var rowCount = jsRS.getRowCount();
var colCount = jsRS.getColumnCount();
for ( var r = 1; r <= rowCount; r++) {
currNodeGeometry.x = 0;
currNodeGeometry.y = headerHeight + ( currNodeGeometry.height * (r-1));
currCol = 0;
currRowLabels = jsRS.getOrdinalLabel(2,r);
for (l in currRowLabels) {
currValue = currRowLabels[(currRowLabels.length - l)-1];
currNodeGeometry.width = rowGeometryTemplate.colWidths[currCol];
svgInnerTable.appendChild(this.createSVGTextCell(currValue,'svg_print_row_'+l+'_'+r,currNodeGeometry,headerHTMLStyle));
currNodeGeometry.x += currNodeGeometry.width;
currCol++;
}
for ( var c = 1; c <= colCount; c++) {
currValue = jsRS.getOrdinalValue(r,c,true);		// Fetch the formatted value
currNodeGeometry.width = rowGeometryTemplate.colWidths[currCol];
svgInnerTable.appendChild(this.createSVGTextCell(currValue,'svg_print_cell_'+r+'_'+c,currNodeGeometry,cellHTMLStyle));
currNodeGeometry.x += currNodeGeometry.width;
currCol++;
}
}
svgWorkSpace.appendChild(svgPrintFrame);
var printBBox = svgPrintFrame.getBBox();
svgPrintFrame.setAttribute('height',printBBox.height);
svgPrintFrame.setAttribute('width',printBBox.width);
svgTableBorder.setAttribute('height',printBBox.height);
svgTableBorder.setAttribute('width',printBBox.width);
svgWorkSpace.removeChild(svgPrintFrame);
return svgPrintFrame;
}

self._DeepSee_Component_deepseeSvgImageProvider_createSVGTableFromZenComponent = function(componentId) {
this.createTempSvgContainer();		// DTB407 - Establish a workspace for physical property calculation
var svgContent = null;
if (!componentId) {
return svgContent;
}
var component = zenPage.getComponentById(componentId);
var mainDiv = component.getEnclosingDiv();
var tables = mainDiv.getElementsByTagName('table');
var totalWidth = 0;
var totalHeight = 0;
if (component.isDrillThrough) {
svgContent = this.convertHTMLTableToSVG(tables[0],componentId);
var topHeight = parseFloat(svgContent.getAttribute('height'));
var totalWidth = parseFloat(svgContent.getAttribute('width'));
var svgCellsTable = this.convertHTMLTableToSVG(tables[1],componentId);
svgCellsTable.childNodes[0].setAttribute('transform','translate(0 ' + topHeight + ')');
svgContent.appendChild(svgCellsTable.childNodes[0]);
totalHeight = topHeight + parseFloat(svgCellsTable.getAttribute('height'));
svgContent.setAttribute('height',totalHeight);
svgContent.setAttribute('width',totalWidth);
}
else if (tables.length==4) {
var svgTables = [];
var leftWidth = 0;
var topHeight = 0;
var dataWidth = 0;
var dataHeight = 0;
for (var t=0; t<tables.length; t++) {
svgTables[t] = this.convertHTMLTableToSVG(tables[t],componentId);
if (t==0) {
svgContent = svgTables[0];
}
else {
svgContent.appendChild(svgTables[t].childNodes[0]);
}
groupId = svgTables[t].id;
if (groupId.indexOf('leftTable')>=0) {
leftWidth = parseFloat(svgTables[t].getAttribute('width'));
}
else if (groupId.indexOf('topTable')>=0) {
topHeight = parseFloat(svgTables[t].getAttribute('height'));
}
else if (groupId.indexOf('dataTable')>=0) {
dataHeight = parseFloat(svgTables[t].getAttribute('height'));
dataWidth = parseFloat(svgTables[t].getAttribute('width'));
}
}
var groupId='';
totalWidth = leftWidth + dataWidth;
totalHeight = topHeight + dataHeight;
svgContent.setAttribute('height',totalHeight);
svgContent.setAttribute('width',totalWidth);
var totalRect = document.createElementNS(SVGNS,'rect');
totalRect.setAttribute('height',totalHeight);
totalRect.setAttribute('width',totalWidth);
totalRect.setAttribute('stroke-width',1);
totalRect.setAttribute('stroke','#000000');
for (var g=0; g<svgContent.childNodes.length; g++) {
groupId = svgContent.childNodes[g].id
if (groupId.indexOf('dataTable')>=0) {
svgContent.childNodes[g].setAttribute('transform','translate(' + leftWidth + ' ' + topHeight + ')');
}
else if (groupId.indexOf('leftTable')>=0) {
svgContent.childNodes[g].setAttribute('transform','translate(0 ' + topHeight + ')');
}
else if (groupId.indexOf('topTable')>=0) {
svgContent.childNodes[g].setAttribute('transform','translate(' + leftWidth + ' 0)');
}
}
}
else if (tables.length<4) {		// DTB647 - Change condition to capture SVG from HTML
svgContent = this.convertHTMLTableToSVG(tables[0],componentId);
}
else {
alert('Unexpected table format in SVG conversion.');
}
this.destroyTempSvgContainer();		// DTB407 - Remove the temporary workspace now that the table is complete
return svgContent;
}

self._DeepSee_Component_deepseeSvgImageProvider_createSVGTextCell = function(text,id,geometry,htmlStyle) {
var svgCell = document.createElementNS(SVGNS,'g');
svgCell.id = id;
var svgRect = document.createElementNS(SVGNS,'rect');
svgRect.id = svgCell.id + '_rect';
for (g in geometry) {
svgRect.setAttribute(g,geometry[g]);
}
this.applyHTMLStyleToSVG(svgRect,htmlStyle,1);
svgCell.appendChild(svgRect);
svgCell.appendChild(this.createSVGTextNode(text,svgCell.id + '_text',geometry,htmlStyle));
return svgCell;
}

self._DeepSee_Component_deepseeSvgImageProvider_createSVGTextNode = function(text,id,geometry,htmlStyle) {
var svgText = document.createElementNS(SVGNS,"text");
var svgWorkspace = this.getTempSvgContainer();		// DTB407
text += '';		// Enforce text type for the incoming target value
if (id) {
svgText.id = id;
}
var x = 0;
var y = 0;
var height = 0;
var width = 0;
if (geometry) {
x = (geometry.x) ? parseFloat(geometry.x) : 0;
y = (geometry.y) ? parseFloat(geometry.y) : 0;
height = (geometry.height) ? parseFloat(geometry.height) : 0;
width = (geometry.width) ? parseFloat(geometry.width) : 0;
}
svgText.setAttribute('x',x);
svgText.setAttribute('y',y);
svgText.setAttribute('height',height);
svgText.setAttribute('width',width);
this.applyHTMLStyleToSVG(svgText,htmlStyle,1);
var textNode = document.createTextNode(text);
svgText.appendChild(textNode);
if (svgWorkspace) {
svgWorkspace.appendChild(svgText);
var textBBox = svgText.getBBox();
if ( (textBBox.width/geometry.width)>=1 ) {
svgWorkspace.removeChild(svgText);
var words = text.split(' ');
if (words.length > 1) {
var wrappedSvgText = this.wrapSvgText(words,id,geometry,htmlStyle);
if (wrappedSvgText) {
svgText = wrappedSvgText;
}
}
svgWorkspace.appendChild(svgText);
var textBBox = svgText.getBBox();
}
var scalingFactor = 1;		// DTB744 - Introduce a scaling factor that can be used to tune spatial tests and scaling. We don't want to have to change this from '1'!
if ( (((textBBox.width)/geometry.width)>=scalingFactor) || (((textBBox.height)/geometry.height)>=scalingFactor) ) {
if (((textBBox.width)/geometry.width)>=((textBBox.height)/geometry.height)) {
var scalingTransform = 'scale('+(scalingFactor*geometry.width/(textBBox.width))+')';
}
else {
var scalingTransform = 'scale('+(scalingFactor*geometry.height/(textBBox.height))+')';
}
if (!svgText.getAttribute('transform')) {
svgText.setAttribute('transform',scalingTransform);
}
else {
svgText.setAttribute('transform',svgText.getAttribute('transform') + ' ' + scalingTransform);
}
}
svgWorkspace.removeChild(svgText);
}
return svgText;
}

self._DeepSee_Component_deepseeSvgImageProvider_createSvgTableFrame = function(refId,height,width) {
refId = (refId ? refId : 'printFrame');
var svgFrame = document.createElementNS(SVGNS,'svg');
var svgFrameId = 'svg_' + refId;
svgFrame.id = svgFrameId;
svgFrame.setAttribute('xmlns:xlink','http://www.w3.org/1999/xlink');
svgFrame.setAttribute('height',height);
svgFrame.setAttribute('width',width);
svgFrame.setAttribute('xmlns',SVGNS);
var svgTable = document.createElementNS(SVGNS,'g');
svgTable.id = 'svg_' + refId + '_table';
svgTable.setAttribute('x',0);
svgTable.setAttribute('y',0);
var svgTableBorder = document.createElementNS(SVGNS,'rect');
svgTableBorder.id = 'svg_' + refId + '_border';
svgTableBorder.setAttribute('stroke','#000000');
svgTableBorder.setAttribute('stroke-width',3);
svgTableBorder.setAttribute('fill','#ffffff');
svgTableBorder.setAttribute('height',height);
svgTableBorder.setAttribute('width',width);
svgTable.appendChild(svgTableBorder);
svgFrame.appendChild(svgTable);
return svgFrame;
}

self._DeepSee_Component_deepseeSvgImageProvider_createTempSvgContainer = function() {
var svg = this.getTempSvgContainer();
if (!svg) {
var body = document.getElementById('zenBody');
svg = document.createElementNS(SVGNS,'svg');
svg.setAttribute('id','tempSVGContainer');
if ((svg)&&(body)) {
body.appendChild(svg);
}
}
return svg;
}

self._DeepSee_Component_deepseeSvgImageProvider_destroyTempSvgContainer = function() {
var body = document.getElementById('zenBody');
var svg = this.getTempSvgContainer();
if ((svg)&&(body)) {
body.removeChild(svg);
}
}

self._DeepSee_Component_deepseeSvgImageProvider_dumpDOMNodeGeometry = function(node,level,stem,last,pst,psl,svgGroup) {
var printStr='';
var branchStr='';
if (node.scrollTop!=0 || node.scrollLeft!=0) {
pst+=node.scrollTop;
psl+=node.scrollLeft;
}
if ((('TD'==node.nodeName)||('TH'==node.nodeName))&& !(node.querySelector('input[id*=cb]'))){
var geometry = {};
geometry.x = (node.offsetLeft-psl);
geometry.y = (node.offsetTop-pst);
geometry.width = (node.offsetWidth);
geometry.height = (node.offsetHeight);
var svgCell = this.convertHTMLCellToSVGRect(node, geometry);
if (svgCell) {
svgGroup.appendChild(svgCell);
}
}
var lastKid=null;
for (var i=node.childNodes.length-1; i>=0;i--) {
var n=node.childNodes[i];
if (n.nodeType==1) {
lastKid=n;
i= -1;
}
}
if (lastKid==null) {
return;
}
if (last) {
stem+='0';
}
else {
stem+='1';
}
level++;
if (ZLM.isPositionAnchor(node) || node.tagName=='TABLE') {
pst-=node.offsetTop;
psl-=node.offsetLeft;
}
for (var i=0;i<node.childNodes.length;i++) {
var n=node.childNodes[i];
if ((n.nodeType==1)||(n.nodeType==3)) {
this.dumpDOMNodeGeometry(n,level,stem,n==lastKid,pst,psl,svgGroup);
}
}
}

self._DeepSee_Component_deepseeSvgImageProvider_dumpDOMTreeGeometry = function(root,svgGroup) {
this.dumpDOMNodeGeometry(root,0,"",true,0,0,svgGroup);
}

self._DeepSee_Component_deepseeSvgImageProvider_getPPI = function() {
var div = document.createElement("div");
div.style.width="1in";
var body = document.getElementsByTagName("body")[0];
body.appendChild(div);
var ppi = document.defaultView.getComputedStyle(div, null).getPropertyValue('width');
body.removeChild(div);
return parseFloat(ppi);
}

self._DeepSee_Component_deepseeSvgImageProvider_getPrintParameters = function() {
return (this.printParameters) ? this.printParameters : null;
}

self._DeepSee_Component_deepseeSvgImageProvider_getTempSvgContainer = function() {
return document.getElementById('tempSVGContainer');
}

self._DeepSee_Component_deepseeSvgImageProvider_mergeTempXSLFiles = function(parms,targetFileName,tempFiles) {
svgUtil = new _DeepSee_Component_deepseeSvgImageProvider;
svgUtil.MergeXSLFiles(targetFileName,targetFileName,tempFiles.join('||'));
if (!parms.preserveTempFiles) {
for (var fileNo in tempFiles) {
purgeFile = svgUtil.makeSVGFileName(tempFiles[fileNo]);
svgUtil.RemoveFile(purgeFile);
}
}
setTimeout(svgUtil.producePDF,0,parms,targetFileName,parms.outName);
}

self._DeepSee_Component_deepseeSvgImageProvider_parseCssStyleString = function(cssString) {
var cssOBJ = {};
var cssArray = cssString.split(';')
for (n=0 ; n<cssArray.length-1 ; n++) {
var cssDef = cssArray[n];
var name = cssDef.split(':')[0];
var value = cssDef.split(':')[1];
cssOBJ[name] = value;
}
return cssOBJ;
}

self._DeepSee_Component_deepseeSvgImageProvider_parseSize = function(size) {
sizeStr = size+'';		// DTB405 - Force string type for parsing
var sizeParsed = {};
sizeParsed.value = parseFloat(sizeStr);
if (('0'==(''+sizeParsed.value)[0])&&('0'!=sizeStr[0])) {
sizeStr = '0' + sizeStr;
}
while (('0'==sizeStr[(''+sizeParsed.value).length])||('.'==sizeStr[(''+sizeParsed.value).length])) {
sizeParsed.value += sizeStr[(''+sizeParsed.value).length];
}
sizeParsed.units = sizeStr.substring((''+sizeParsed.value).length).trim();
return sizeParsed;
}

self._DeepSee_Component_deepseeSvgImageProvider_prepareFilterTable = function(filterNames,filterValues,parms) {
var parms  = (parms) ? parms : {};
var svgFilterTable = {};
var printMode = (parms.SHOWFILTERS);	// DTB405
var headerStyle = {fontWeight:"bold",
fontSize:"8pt",
padding:"2pt"};
var cellOddStyle = {fontSize:"6pt",
padding:"2pt"};
var cellEvenStyle = {fontSize:"6pt",
backgroundColor:"#E0E0E0",
padding:"2pt"};
var cellSpacerStyle = {padding:"2pt"};
var filterTableCaptionStyle = (parms.FILTERTABLECAPTIONSTYLE) ? this.parseCssStyleString(parms.FILTERTABLECAPTIONSTYLE) : {};
var filterTableItemStyle = (parms.FILTERTABLEITEMSTYLE) ? this.parseCssStyleString(parms.FILTERTABLEITEMSTYLE) : {};
if (filterTableCaptionStyle['color']) {
headerStyle.color = filterTableCaptionStyle['color'];
}
if (filterTableCaptionStyle['background-color']) {
headerStyle.backgroundColor = filterTableCaptionStyle['background-color'];
}
if (filterTableCaptionStyle['font-family']) {
headerStyle.fontFamily = filterTableCaptionStyle['font-family'].trim();
}
if (filterTableCaptionStyle['font-size']) {
headerStyle.fontSize = this.convertSizeToPoint(filterTableCaptionStyle['font-size']).value;
}
if (filterTableCaptionStyle['text-align']) {
headerStyle.textAlign = filterTableCaptionStyle['text-align'].trim();
}
if (filterTableCaptionStyle['padding']) {
headerStyle.padding = this.convertSizeToPoint(filterTableCaptionStyle['padding']).value;
}
if (filterTableCaptionStyle['font-style']) {
headerStyle.fontStyle = filterTableCaptionStyle['font-style'].trim();
}
if (filterTableCaptionStyle['font-weight']) {
headerStyle.fontWeight = filterTableCaptionStyle['font-weight'].trim();
}
if (filterTableCaptionStyle['text-decoration']) {
headerStyle.textDecoration = filterTableCaptionStyle['text-decoration'];
}
if (filterTableItemStyle['color']) {
cellEvenStyle.color = filterTableItemStyle['color'];
cellOddStyle.color = filterTableItemStyle['color'];
}
if (filterTableItemStyle['background-color']) {
cellEvenStyle.backgroundColor = filterTableItemStyle['background-color'];
cellOddStyle.backgroundColor = filterTableItemStyle['background-color'];
}
if (filterTableItemStyle['font-family']) {
cellEvenStyle.fontFamily = filterTableItemStyle['font-family'].trim();
cellOddStyle.fontFamily = filterTableItemStyle['font-family'].trim();
}
if (filterTableItemStyle['font-size']) {
cellEvenStyle.fontSize = this.convertSizeToPoint(filterTableItemStyle['font-size']).value;
cellOddStyle.fontSize = this.convertSizeToPoint(filterTableItemStyle['font-size']).value;
}
if (filterTableItemStyle['text-align']) {
cellEvenStyle.textAlign = filterTableItemStyle['text-align'].trim();
cellOddStyle.textAlign = filterTableItemStyle['text-align'].trim();
}
if (filterTableItemStyle['padding']) {
cellEvenStyle.padding = this.convertSizeToPoint(filterTableItemStyle['padding']).value;
cellOddStyle.padding = this.convertSizeToPoint(filterTableItemStyle['padding']).value;
}
if (filterTableItemStyle['font-style']) {
cellEvenStyle.fontStyle = filterTableItemStyle['font-style'].trim();
cellOddStyle.fontStyle = filterTableItemStyle['font-style'].trim();
}
if (filterTableItemStyle['font-weight']) {
cellEvenStyle.fontWeight = filterTableItemStyle['font-weight'].trim();
cellOddStyle.fontWeight = filterTableItemStyle['font-weight'].trim();
}
if (filterTableItemStyle['text-decoration']) {
cellEvenStyle.textDecoration = filterTableItemStyle['text-decoration'];
cellOddStyle.textDecoration = filterTableItemStyle['text-decoration'];
}
if (filterNames.length) {
if ('byTitle'==printMode) {
var svgFilterTable={
header:[{caption:""}],
rows:[]
};
for (f=0 ; f<filterNames.length ; f++) {
svgFilterTable.rows[svgFilterTable.rows.length] = {
cells: [
{ caption:filterNames[f]+' = '+zenEscapeXML(filterValues[f]),		// DTB512
style:cellOddStyle}
]
};
}
}
else if ('off'==printMode) {
var svgFilterTable={};
}
else {
var svgFilterTable={
header: [
{ caption:$$$Text("Filter"),
style:headerStyle
},
{ caption:$$$Text("Value"),
style:headerStyle
}
],
rows:[]
};
for (f=0 ; f<filterNames.length ; f++) {
svgFilterTable.rows[svgFilterTable.rows.length] = {
cells: [
{ caption:filterNames[f],
style: (f%2) ? cellOddStyle : cellEvenStyle},
{ caption:zenEscapeXML(filterValues[f]),		// DTB512
style: (f%2) ? cellOddStyle : cellEvenStyle}
]
};
}
}
}
return svgFilterTable;
}

self._DeepSee_Component_deepseeSvgImageProvider_printSVGContent = function(svgFrameId,parms,svgContent,filename) {
var svgUtil = new _DeepSee_Component_deepseeSvgImageProvider;
if (!parms) {
var parms = {};
}
if (zenPage) {
var printSessionId = zenPage.sessionCookie.substring(zenPage.sessionCookie.length-10,zenPage.sessionCookie.length)
}
else {
var printSessionId = Math.floor(Math.random()* Math.pow(10,10));
}
if (!filename) {
var name = 'svgImageProvider-print'+printSessionId;	// Add session-derived token to generated name
}
else {
var name = filename;
}
parms.fileNameRoot = name;
var fullName = svgUtil.makeSVGFileName(name+".xsl");
parms.targetFileName = fullName;
var outName = svgUtil.makeSVGFileName(name+".pdf");
parms.outName = outName;
parms.imageWidth = svgUtil.calculateMaxImageWidth(parms);
parms.imageHeight = svgUtil.calculateMaxImageHeight(parms);		// DTB561 - This limits the maximum height of printable image content
parms.omitPageNumbers = true;
var scaledImgWidth = svgContent.querySelector('svg').getAttribute('width');
var scaleFactor = scaledImgWidth/svgUtil.parseSize(parms.imageWidth).value;
var scaledImgHeight = svgUtil.parseSize(parms.imageHeight).value*scaleFactor;
var tabGeo = parms.tableGeometry;
if (tabGeo) {
scaledImgHeight = Math.floor((scaledImgHeight-tabGeo.headerHeight)/tabGeo.cellHeight)*tabGeo.cellHeight + tabGeo.headerHeight;
}
else {
scaledImgHeight = parms.imageHeight;
}
var totalSvgHeight = svgContent.querySelector('svg').height.baseVal.value;
if ((parms.isTable) && (totalSvgHeight > scaledImgHeight)) {
parms.omitPageNumbers = false;				// Remove suppression of the page numbers in the report
parms.fileName = parms.targetFileName;		// The primary document file is the targetFileName
var currSvgPrintContent = svgUtil.clipSvgContent(svgContent,scaledImgHeight,scaledImgWidth,'svg_table',0,0);
svgUtil.saveDOMToXSLFile(currSvgPrintContent, parms);		// First page, print just the limited first page
parms.filterTable = {};
parms.FILTERNAMES = '';
parms.FILTERVALUES = '';
parms.foIntro = null;
var currPageName = '';
var followingPages = [];
var pageNo = 1;
var clipX = 0;					// The clip in the x-direction will always begin at zero
var clipY = scaledImgHeight;	// Store the first page image height as the initial clipY
parms.imageHeight = svgUtil.calculateMaxImageHeight(parms);
if (tabGeo) {
scaledImgHeight = Math.floor(svgUtil.parseSize(parms.imageHeight).value*scaleFactor/tabGeo.cellHeight)*tabGeo.cellHeight;
}
else {
scaledImgHeight = svgUtil.parseSize(parms.imageHeight).value*scaleFactor;
}
parms.svgContent = svgContent;
parms.scaledImgHeight = scaledImgHeight;
parms.scaledImgWidth = scaledImgWidth;
parms.totalSvgHeight = totalSvgHeight;
setTimeout(svgUtil.printSVGFollowingPage,0,parms, pageNo, clipX, clipY, followingPages)
}
else {
parms.fileName = parms.targetFileName;		// The single-page document file uses the targetFileName
if (svgContent) {
svgUtil.saveDOMToXSLFile(svgContent, parms);
}
else {
svgUtil.saveToXSLFile(svgFrameId, parms);
}
setTimeout(svgUtil.producePDF,0,parms,parms.fileName,parms.outName);
}
}

self._DeepSee_Component_deepseeSvgImageProvider_printSVGFollowingPage = function(parms,pageNo,clipX,clipY,tempFiles) {
svgUtil = new _DeepSee_Component_deepseeSvgImageProvider;
tempFiles = (tempFiles ? tempFiles : []);
currPageName = parms.fileNameRoot + '-page' + pageNo + '.xsl';
tempFiles.push(currPageName);
parms.fileName = currPageName;
var currSvgPrintContent = svgUtil.clipSvgContent(parms.svgContent,parms.scaledImgHeight,parms.scaledImgWidth,'svg_table',0,clipY);
svgUtil.saveDOMToXSLFile(currSvgPrintContent, parms);		// Save clipped page
clipY += parms.scaledImgHeight
if (clipY < parms.totalSvgHeight) {
pageNo++;
setTimeout(svgUtil.printSVGFollowingPage,0,parms,pageNo,clipX,clipY,tempFiles);
}
else {
setTimeout(svgUtil.mergeTempXSLFiles,0,parms,parms.targetFileName,tempFiles);
}
}

self._DeepSee_Component_deepseeSvgImageProvider_producePDF = function(parms,fileName,outName) {
svgUtil = new _DeepSee_Component_deepseeSvgImageProvider;
if ((fileName)&&(outName)) {
svgUtil.ConvertXSLToPDF(fileName,outName);
var url = '_DeepSee.UI.MDXPDF.zen';
url = url + '?FILEPDFROOT=' + encodeURIComponent(outName.split('.').slice(0,-1).join('.') || outName);
if (parms.preserveTempFiles) {
url += '&$NODELETE=1';
}
url += '&CSPSHARE=1&CSPCHD='+encodeURIComponent(zenPage.sessionCookie);		// DTB556 - Add session cookie
window.open(url,'pdf','');
}
}

self._DeepSee_Component_deepseeSvgImageProvider_removeSVGLegendFromChart = function(chartDocument,legendGroupId,legendPosition) {
var chartSVG = null;
for (var p=chartDocument.firstChild; p!=null; p=p.nextSibling) {
if ('svg'==p.nodeName) {
chartSVG = p;
}
}
if (chartSVG) {
for (var g=chartSVG.firstChild; g!=null; g=g.nextSibling) {
if (('g'==g.nodeName)&&('zenScalingGroup'==g.id)) {
chartScalingGroup = g;
}
}
}
else {
return;
}
for (var p=chartSVG.firstChild; p!=null; p=p.nextSibling) {
if (legendGroupId==p.id) {
if (('left'==legendPosition)||('right'==legendPosition)) {
var lw = p.getBBox().width;
var cw = chartSVG.getAttribute('width');
chartSVG.setAttribute('width',cw-lw);
}
else if (('top'==legendPosition)||('bottom'==legendPosition)) {
var lh = p.getBBox().height;
var ch = chartSVG.getAttribute('height');
chartSVG.setAttribute('height',ch-lh);
}
else {
}
chartSVG.removeChild(p);
}
}
if (!chartScalingGroup) {
return;
}
chartScalingGroup.setAttribute('transform','');
return chartDocument;
}

self._DeepSee_Component_deepseeSvgImageProvider_setPrintParameters = function(parms) {
this.printParameters = parms;
}

self._DeepSee_Component_deepseeSvgImageProvider_wrapSvgText = function(words,id,geometry,htmlStyle) {
var returnSvg = null;
var svgWorkspace = this.getTempSvgContainer();
var svgTextGroup = document.createElementNS(SVGNS,'g');
svgTextGroup.setAttribute('id',id);
var x = 0;
var y = 0;
var height = 0;
var width = 0;
if (geometry) {
x = (geometry.x) ? parseFloat(geometry.x) : 0;
y = (geometry.y) ? parseFloat(geometry.y) : 0;
height = (geometry.height) ? parseFloat(geometry.height) : 0;
width = (geometry.width) ? parseFloat(geometry.width) : 0;
}
try {
var svgTextSpace = document.createElementNS(SVGNS,"text");
var spaceNode = document.createTextNode('"          "');		// DTB407 - 10 spaces in quotes
svgTextSpace.appendChild(spaceNode);
svgTextGroup.appendChild(svgTextSpace);
svgWorkspace.appendChild(svgTextGroup);
svgTextSpace.setAttribute('x',x);
svgTextSpace.setAttribute('y',y);
svgTextSpace.setAttribute('height',height);
svgTextSpace.setAttribute('width',width);
this.applyHTMLStyleToSVG(svgTextSpace,htmlStyle,1);
var spaceWidth = svgTextSpace.getBBox().width/10;
svgWorkspace.removeChild(svgTextGroup);
svgTextGroup.removeChild(svgTextSpace);
var currWordCount = 0;
var currWordWidth = 0;
var currLineWidth = 0;
var currLineCount = 0;
var currLineText = '';
var svgTempText = null;
var textNode = null;
var svgLines = [];
var lineHeight = 0;		// DTB744
for ( var w=0 ; w < words.length ; w++ ) {
currWordCount++;
svgTempText = document.createElementNS(SVGNS,"text");
textNode = document.createTextNode(words[w]);
svgTempText.appendChild(textNode);
this.applyHTMLStyleToSVG(svgTempText,htmlStyle,1,1);		// DTB744 - Test sizes with styling in place
svgTextGroup.appendChild(svgTempText);
svgWorkspace.appendChild(svgTextGroup);
currWordWidth = svgTempText.getBBox().width;
currWordHeight = svgTempText.getBBox().height;
currLineWidth += (((currWordCount>1) ? spaceWidth : 0) + currWordWidth);
lineHeight = Math.max(currWordHeight,lineHeight);		// DTB744 - Store the largest text height as the line height
if ((currLineWidth > geometry.width ) && (currWordCount > 1)) {
svgLines.push(currLineText);
currLineText = '';
currLineWidth = currWordWidth;		// DTB744 - This is the beginning of a new line
currWordCount = 1;		// DTB744 - The line now has one word in it!
currLineCount++;
}
currLineText += (((currWordCount>1) ? ' ' : '') + words[w]);
svgWorkspace.removeChild(svgTextGroup);
svgTextGroup.removeChild(svgTempText);
}
svgLines.push(currLineText);
if (svgLines.length>1) {
returnSvg = document.createElementNS(SVGNS,"g");
var lineHeight = Math.min(lineHeight, height/(svgLines.length));		// DTB744 - Make sure the lines fit within the box!
for ( lineNo in svgLines) {
var svgLine = document.createElementNS(SVGNS,"text");
svgLine.setAttribute('id',id + ':line' + lineNo);
lineText = document.createTextNode(svgLines[lineNo]);
svgLine.appendChild(lineText);
svgTextGroup.appendChild(svgLine);
svgWorkspace.appendChild(svgTextGroup);
svgLine.setAttribute('x',0);
svgLine.setAttribute('y',(lineHeight*lineNo));
svgLine.setAttribute('height',lineHeight);
svgLine.setAttribute('width',width);
this.applyHTMLStyleToSVG(svgLine,htmlStyle,1,1);		// DTB744 - Suppress padding in the individual line
returnSvg.appendChild(svgLine);
}
var horizontalAlignmentOffset = ( (htmlStyle.textAlign.indexOf('left')>=0) ? 2 : 0);		// DTB744 -
var verticalAlignmentOffset = (height-(svgLines.length*lineHeight))/2 ;		// DTB744 - The group as a whole cannot take advantage of the alignment-baseline, so this has to be taken care of in the translation
returnSvg.setAttribute('transform','translate('+ (x+horizontalAlignmentOffset) +','+ (y+verticalAlignmentOffset) +')');		// DTB - Use a translation transform to position all of the relatively positioned text as a unit
}
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in wrapSvgText');
if (svgTextGroup.parentNode == svgWorkspace) {
svgWorkspace.removeChild(svgTextGroup);
}
}
return returnSvg;
}

self._DeepSee_Component_deepseeSvgImageProvider_ConvertXSLToPDF = function(pInFile,pOutFile) {
	zenClassMethod(this,'ConvertXSLToPDF','L,L','',arguments);
}

self._DeepSee_Component_deepseeSvgImageProvider_GenerateRootName = function(dir) {
	return zenClassMethod(this,'GenerateRootName','L','VARCHAR',arguments);
}

self._DeepSee_Component_deepseeSvgImageProvider_MergeXSLFiles = function(pOutFile,pTargetFile,pSourceFiles,pSessionId) {
	return zenClassMethod(this,'MergeXSLFiles','L,L,L,L','STATUS',arguments);
}

self._DeepSee_Component_deepseeSvgImageProvider_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}

self._DeepSee_Component_deepseeSvgImageProvider_ReceiveFragment = function(outputFile,src) {
	return zenClassMethod(this,'ReceiveFragment','L,O','STATUS',arguments);
}

self._DeepSee_Component_deepseeSvgImageProvider_RemoveFile = function(pFileName) {
	return zenClassMethod(this,'RemoveFile','L','STATUS',arguments);
}

self._DeepSee_Component_deepseeSvgImageProvider_ScopeFileName = function(rawName) {
	return zenClassMethod(this,'ScopeFileName','L','VARCHAR',arguments);
}
self._DeepSee_Component_deepseeSvgImageProvider__Loader = function() {
	zenLoadClass('_ZEN_ComponentEx_svgImageProvider');
	_DeepSee_Component_deepseeSvgImageProvider.prototype = zenCreate('_ZEN_ComponentEx_svgImageProvider',-1);
	var p = _DeepSee_Component_deepseeSvgImageProvider.prototype;
	if (null==p) {return;}
	p.constructor = _DeepSee_Component_deepseeSvgImageProvider;
	p.superClass = ('undefined' == typeof _ZEN_ComponentEx_svgImageProvider) ? zenMaster._ZEN_ComponentEx_svgImageProvider.prototype:_ZEN_ComponentEx_svgImageProvider.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%DeepSee.Component.deepseeSvgImageProvider';
	p._type = 'deepseeSvgImageProvider';
	p.serialize = _DeepSee_Component_deepseeSvgImageProvider_serialize;
	p.getSettings = _DeepSee_Component_deepseeSvgImageProvider_getSettings;
	p.ConvertXSLToPDF = _DeepSee_Component_deepseeSvgImageProvider_ConvertXSLToPDF;
	p.GenerateRootName = _DeepSee_Component_deepseeSvgImageProvider_GenerateRootName;
	p.MergeXSLFiles = _DeepSee_Component_deepseeSvgImageProvider_MergeXSLFiles;
	p.ReallyRefreshContents = _DeepSee_Component_deepseeSvgImageProvider_ReallyRefreshContents;
	p.ReceiveFragment = _DeepSee_Component_deepseeSvgImageProvider_ReceiveFragment;
	p.RemoveFile = _DeepSee_Component_deepseeSvgImageProvider_RemoveFile;
	p.ScopeFileName = _DeepSee_Component_deepseeSvgImageProvider_ScopeFileName;
	p.addSVGLegendToChart = _DeepSee_Component_deepseeSvgImageProvider_addSVGLegendToChart;
	p.applyHTMLStyleToSVG = _DeepSee_Component_deepseeSvgImageProvider_applyHTMLStyleToSVG;
	p.calculateMaxImageHeight = _DeepSee_Component_deepseeSvgImageProvider_calculateMaxImageHeight;
	p.calculateMaxImageWidth = _DeepSee_Component_deepseeSvgImageProvider_calculateMaxImageWidth;
	p.clipSvgContent = _DeepSee_Component_deepseeSvgImageProvider_clipSvgContent;
	p.convertHTMLCellToSVGRect = _DeepSee_Component_deepseeSvgImageProvider_convertHTMLCellToSVGRect;
	p.convertHTMLTableToSVG = _DeepSee_Component_deepseeSvgImageProvider_convertHTMLTableToSVG;
	p.convertSizeToPoint = _DeepSee_Component_deepseeSvgImageProvider_convertSizeToPoint;
	p.createSVGTableFromResultSet = _DeepSee_Component_deepseeSvgImageProvider_createSVGTableFromResultSet;
	p.createSVGTableFromZenComponent = _DeepSee_Component_deepseeSvgImageProvider_createSVGTableFromZenComponent;
	p.createSVGTextCell = _DeepSee_Component_deepseeSvgImageProvider_createSVGTextCell;
	p.createSVGTextNode = _DeepSee_Component_deepseeSvgImageProvider_createSVGTextNode;
	p.createSvgTableFrame = _DeepSee_Component_deepseeSvgImageProvider_createSvgTableFrame;
	p.createTempSvgContainer = _DeepSee_Component_deepseeSvgImageProvider_createTempSvgContainer;
	p.destroyTempSvgContainer = _DeepSee_Component_deepseeSvgImageProvider_destroyTempSvgContainer;
	p.dumpDOMNodeGeometry = _DeepSee_Component_deepseeSvgImageProvider_dumpDOMNodeGeometry;
	p.dumpDOMTreeGeometry = _DeepSee_Component_deepseeSvgImageProvider_dumpDOMTreeGeometry;
	p.getPPI = _DeepSee_Component_deepseeSvgImageProvider_getPPI;
	p.getPrintParameters = _DeepSee_Component_deepseeSvgImageProvider_getPrintParameters;
	p.getTempSvgContainer = _DeepSee_Component_deepseeSvgImageProvider_getTempSvgContainer;
	p.mergeTempXSLFiles = _DeepSee_Component_deepseeSvgImageProvider_mergeTempXSLFiles;
	p.parseCssStyleString = _DeepSee_Component_deepseeSvgImageProvider_parseCssStyleString;
	p.parseSize = _DeepSee_Component_deepseeSvgImageProvider_parseSize;
	p.prepareFilterTable = _DeepSee_Component_deepseeSvgImageProvider_prepareFilterTable;
	p.printSVGContent = _DeepSee_Component_deepseeSvgImageProvider_printSVGContent;
	p.printSVGFollowingPage = _DeepSee_Component_deepseeSvgImageProvider_printSVGFollowingPage;
	p.producePDF = _DeepSee_Component_deepseeSvgImageProvider_producePDF;
	p.removeSVGLegendFromChart = _DeepSee_Component_deepseeSvgImageProvider_removeSVGLegendFromChart;
	p.setPrintParameters = _DeepSee_Component_deepseeSvgImageProvider_setPrintParameters;
	p.wrapSvgText = _DeepSee_Component_deepseeSvgImageProvider_wrapSvgText;
}

self._zenClassIdx['http://www.intersystems.com/deepsee/dsdynaTree'] = '_DeepSee_Component_dsdynaTree';
self._DeepSee_Component_dsdynaTree = function(index,id) {
	if (index>=0) {_DeepSee_Component_dsdynaTree__init(this,index,id);}
}

self._DeepSee_Component_dsdynaTree__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_dynaTree__init) ?zenMaster._ZEN_Component_dynaTree__init(o,index,id):_ZEN_Component_dynaTree__init(o,index,id);
}
function _DeepSee_Component_dsdynaTree_serialize(set,s)
{
	var o = this;s[0]='1332587112';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.OnGetNodeInfo;s[7]=o.OnGetTreeInfo;s[8]=o.align;s[9]=o.aux;s[10]=o.childIndent;s[11]=o.containerStyle;s[12]=o.dataGlobal;s[13]=(o.dragEnabled?1:0);s[14]=(o.dropEnabled?1:0);s[15]=(o.dynamic?1:0);s[16]=o.enclosingClass;s[17]=o.enclosingStyle;s[18]=o.error;s[19]=o.height;s[20]=(o.hidden?1:0);s[21]=o.hint;s[22]=o.hintClass;s[23]=o.hintStyle;s[24]=o.imageContracted;s[25]=o.imageExpanded;s[26]=o.imageFolderClosed;s[27]=o.imageFolderOpen;s[28]=o.imageNode;s[29]=o.label;s[30]=o.labelClass;s[31]=o.labelDisabledClass;s[32]=o.labelStyle;s[33]=o.nodeCount;s[34]=o.onafterdrag;s[35]=o.onbeforedrag;s[36]=o.onchange;s[37]=o.onclick;s[38]=o.ondblclick;s[39]=o.ondrag;s[40]=o.ondrop;s[41]=o.onhide;s[42]=o.onrefresh;s[43]=o.onshow;s[44]=o.onupdate;s[45]=o.overlayMode;s[46]=set.serializeArray(o,o.parameters,true,'parameters');s[47]=o.renderFlag;s[48]=o.selectedIndex;s[49]=(o.showFolders?1:0);s[50]=(o.showLabel?1:0);s[51]=(o.showLines?1:0);s[52]=o.slice;s[53]=o.text;s[54]=o.title;s[55]=o.tuple;s[56]=o.valign;s[57]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[58]=(o.visible?1:0);s[59]=o.width;
}
function _DeepSee_Component_dsdynaTree_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._DeepSee_Component_dsdynaTree_LoadSubTree = function(pNodeNo,pLevel,pValue,pState) {
	zenInstanceMethod(this,'LoadSubTree','L,L,L,L','',arguments);
}

self._DeepSee_Component_dsdynaTree_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._DeepSee_Component_dsdynaTree__Loader = function() {
	zenLoadClass('_ZEN_Component_dynaTree');
	_DeepSee_Component_dsdynaTree.prototype = zenCreate('_ZEN_Component_dynaTree',-1);
	var p = _DeepSee_Component_dsdynaTree.prototype;
	if (null==p) {return;}
	p.constructor = _DeepSee_Component_dsdynaTree;
	p.superClass = ('undefined' == typeof _ZEN_Component_dynaTree) ? zenMaster._ZEN_Component_dynaTree.prototype:_ZEN_Component_dynaTree.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%DeepSee.Component.dsdynaTree';
	p._type = 'dsdynaTree';
	p.serialize = _DeepSee_Component_dsdynaTree_serialize;
	p.getSettings = _DeepSee_Component_dsdynaTree_getSettings;
	p.LoadSubTree = _DeepSee_Component_dsdynaTree_LoadSubTree;
	p.ReallyRefreshContents = _DeepSee_Component_dsdynaTree_ReallyRefreshContents;
}

self._zenClassIdx['http://www.intersystems.com/deepsee/styleEdit'] = '_DeepSee_Component_styleEdit';
self._DeepSee_Component_styleEdit = function(index,id) {
	if (index>=0) {_DeepSee_Component_styleEdit__init(this,index,id);}
}

self._DeepSee_Component_styleEdit__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_control__init) ?zenMaster._ZEN_Component_control__init(o,index,id):_ZEN_Component_control__init(o,index,id);
	o.caption = '';
	o.colorSetCaptions = new Array();
	o.colorSetNames = new Array();
	o.colorSets = new Array();
	o.currColorSet = '';
	o.enclosingClass = '';
	o.features = '';
	o.isDropdownVisible = false;
	o.mode = 'style';
}
function _DeepSee_Component_styleEdit_serialize(set,s)
{
	var o = this;s[0]='680950752';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.caption;s[9]=o.clientType;s[10]=set.serializeList(o,o.colorSetCaptions,false,'colorSetCaptions');s[11]=set.serializeList(o,o.colorSetNames,false,'colorSetNames');s[12]=set.serializeList(o,o.colorSets,false,'colorSets');s[13]=o.containerStyle;s[14]=o.controlClass;s[15]=o.controlStyle;s[16]=o.currColorSet;s[17]=o.dataBinding;s[18]=(o.disabled?1:0);s[19]=(o.dragEnabled?1:0);s[20]=(o.dropEnabled?1:0);s[21]=(o.dynamic?1:0);s[22]=o.enclosingClass;s[23]=o.enclosingStyle;s[24]=o.error;s[25]=o.features;s[26]=o.height;s[27]=(o.hidden?1:0);s[28]=o.hint;s[29]=o.hintClass;s[30]=o.hintStyle;s[31]=(o.invalid?1:0);s[32]=o.invalidMessage;s[33]=(o.isDropdownVisible?1:0);s[34]=o.label;s[35]=o.labelClass;s[36]=o.labelDisabledClass;s[37]=o.labelStyle;s[38]=o.mode;s[39]=o.onafterdrag;s[40]=o.onbeforedrag;s[41]=o.onblur;s[42]=o.onchange;s[43]=o.onclick;s[44]=o.ondblclick;s[45]=o.ondrag;s[46]=o.ondrop;s[47]=o.onfocus;s[48]=o.onhide;s[49]=o.onkeydown;s[50]=o.onkeypress;s[51]=o.onkeyup;s[52]=o.onmousedown;s[53]=o.onmouseout;s[54]=o.onmouseover;s[55]=o.onmouseup;s[56]=o.onrefresh;s[57]=o.onshow;s[58]=o.onsubmit;s[59]=o.ontouchend;s[60]=o.ontouchmove;s[61]=o.ontouchstart;s[62]=o.onupdate;s[63]=o.onvalidate;s[64]=o.originalValue;s[65]=o.overlayMode;s[66]=(o.readOnly?1:0);s[67]=o.renderFlag;s[68]=(o.required?1:0);s[69]=o.requiredMessage;s[70]=(o.showLabel?1:0);s[71]=o.slice;s[72]=o.tabIndex;s[73]=o.title;s[74]=o.tuple;s[75]=o.valign;s[76]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[77]=(o.visible?1:0);s[78]=o.width;
}
function _DeepSee_Component_styleEdit_getSettings(s)
{
	s['name'] = 'string';
	s['caption'] = 'caption';
	s['colorSetCaptions'] = 'string';
	s['colorSetNames'] = 'string';
	s['colorSets'] = 'string';
	s['currColorSet'] = 'string';
	s['features'] = 'csv';
	s['isDropdownVisible'] = 'boolean';
	s['mode'] = 'enum:style,color';
	this.invokeSuper('getSettings',arguments);
}

self._DeepSee_Component_styleEdit_adjustDropdownPosition = function() {
var div = this.getDropDownDiv();
zenASSERT(div,'Unable to find dropdown div',arguments);
var input = this.getEnclosingDiv();
zenASSERT(input,'Unable to find input element',arguments);
var inputHeight = input.offsetHeight;
var winScrollTop = zenGetPageScrollTop();
var top,left;
var controlOffsets = zenGetPageOffsets(input);
left = controlOffsets.left;
if (div.nativeHeight) div.style.height = div.nativeHeight + "px";
var divHeight = Math.max(div.offsetHeight,224); // ensure we handle the height being 0
var winHeight = zenGetWindowHeight();
var uSpace = controlOffsets.top - winScrollTop;
var dSpace = winHeight - uSpace - inputHeight - 2;
if (divHeight > dSpace) { // dropdown won't fit as is
if (dSpace > uSpace) { // beneath is best option but must shorten menu
if (!div.nativeHeight) div.nativeHeight = divHeight;
div.style.height = (dSpace - 2) + 'px';
top = controlOffsets.top + inputHeight;
}
else { // open dropdown upwards
if (divHeight > uSpace) {
if (!div.nativeHeight) div.nativeHeight = divHeight;
div.style.height= (uSpace-2) + 'px';
}
top = controlOffsets.top - Math.max(div.offsetHeight,divHeight);
}
}
else {  // Dropdown is fine where it is but needs to be in page coordinates
top = controlOffsets.top + inputHeight;
}
var winWidth = zenGetWindowWidth();
var winScrollLeft = zenGetPageScrollLeft();
var divWidth = Math.max(div.offsetWidth,204);
if (((left - winScrollLeft) + divWidth) > winWidth) {
left = winScrollLeft + winWidth - divWidth;
var scrollHeight = (document.documentElement ? Math.max(document.documentElement.scrollHeight,document.body.scrollHeight) : document.body.scrollHeight);
if (scrollHeight > winHeight) {
left -= 20;
}
}
div.style.top = top + 'px';
div.style.left = left + 'px';
}

self._DeepSee_Component_styleEdit_colorSetChange = function(which) {
var cb = this.findElement('colorSet');
if (cb) {
if (cb.value!=this.currColorSet) {
this.currColorSet = cb.value;
var div = this.findElement('colorTable');
if (div) {
div.innerHTML = this.getColorTableHTML(which);
}
}
}
}

self._DeepSee_Component_styleEdit_customColorChange = function(which) {
var ctrlRed = this.findElement('red');
var ctrlGreen = this.findElement('green');
var ctrlBlue = this.findElement('blue');
var sample = this.findElement('sample');
var red = parseInt(ctrlRed.value,10);
if (ctrlRed.value==='') {
red = 0;
}
else {
red = isNaN(red) ? 0 : red;
red = (red > 255) ? 255 : (red < 0) ? 0 : red;
ctrlRed.value = red;
}
var green = parseInt(ctrlGreen.value,10);
if (ctrlGreen.value==='') {
green = 0;
}
else {
green = isNaN(green) ? 0 : green;
green = (green > 255) ? 255 : (green < 0) ? 0 : green;
ctrlGreen.value = green;
}
var blue = parseInt(ctrlBlue.value,10);
if (ctrlBlue.value==='') {
blue = 0;
}
else {
blue = isNaN(blue) ? 0 : blue;
blue = (blue > 255) ? 255 : (blue < 0) ? 0 : blue;
ctrlBlue.value = blue;
}
var color = 'rgb(' + red + ',' + green + ',' + blue + ')';
sample.style.background = color;
if (which=='color') {
this._customColor = color;
}
else {
this._customBackground = color;
}
}

self._DeepSee_Component_styleEdit_getColorSet = function() {
var index = -1;
if (this.currColorSet!='') {
for (var n = 0; n < this.colorSetNames.length; n++) {
if (this.colorSetNames[n]==this.currColorSet) {
index = n;
break;
}
}
}
if (index < 0) {
var colors = [
[ 'inherit','#000000','#0000F0','#00F000','#F00000','#F000F0','#00F0F0','#F0F000'],
[ '#C0C0C0','#404040','#4040D0','#40D040','#D04040','#D040D0','#40D0D0','#D0D040'],
[ '#D0D0D0','#606060','#6060D0','#60D060','#D06060','#D060D0','#60D0D0','#D0D060'],
[ '#E0E0E0','#808080','#8080FF','#80FF80','#FF8080','#FF80FF','#80F0F0','#FFFF80'],
[ '#F0F0F0','#909090','#B0B0FF','#B0FFB0','#FFB0B0','#FFB0FF','#B0FFFF','#FFFFB0'],
[ '#F4F4F4','#A0A0A0','#D0D0FF','#D0FFD0','#FFD0D0','#FFD0FF','#D0FFFF','#FFFFD0'],
[ '#F8F8F8','#B0B0B0','#F0F0F8','#F0F8F0','#F8F0F0','#FFF0FF','#F0FFFF','#FFFFF0'],
[ '#FFFFFF','#FEFEFE','#F0F0FF','#F0FFF0','#FFF0F0','#FFF8FF','#F8FFFF','#FFFFF8']
];
}
else {
var set = this.colorSets[index];
var t = set.toString().split(';');
var rows = 8;
var cols = 8;
var colors = [];
for (var r = 0; r < rows; r++) {
var list = [];
colors[r] = list;
for (var c = 0; c < cols; c++) {
var x = (c*rows)+r;
list[c] = t[x] ? t[x] : '#FFFFFF';
}
}
}
return colors;
}

self._DeepSee_Component_styleEdit_getColorTableHTML = function(which) {
var html = [];
var stdColors = this.getColorSet();
html[html.length] = '<table class="seColorTable">';
for (var r = 0; r < stdColors.length; r++) {
html[html.length] = '<tr>';
for (var c = 0; c < stdColors[r].length; c++) {
var color = stdColors[r][c];
var bdr = (color=='inherit')?'black':'#D0D0D0';
html[html.length] = '<td title="'+color+'" style="border:1px solid '+bdr+';font-size:1px; width:17px;height:17px;background:'+color+';" onclick="zenPage.getComponent('+this.index+').selectColor(\''+which+'\',\''+color+'\');">';
html[html.length] = '&#160;';
html[html.length] = '</td>';
}
html[html.length] = '</tr>';
}
html[html.length] = '</table>';
return html.join('');
}

self._DeepSee_Component_styleEdit_getDropDownDiv = function() {
return self.document.getElementById('zenModalDiv');
}

self._DeepSee_Component_styleEdit_hideDropDown = function() {
if (this._timerId) {
self.clearTimeout(this._timerId);
}
this._steps = 0;
this._mode = 'hide';
this._timerId = self.setTimeout('zenPage.getComponent('+this.index+').reveal()',10);
}

self._DeepSee_Component_styleEdit_onEndModalHandler = function(zindex) {
if (this._timerId) {
self.clearTimeout(this._timerId);
this._timerId = null;
}
var div = this.getDropDownDiv();
div.style.cssText = "display:none;";
div.className = "";
div.mousedown = null;
div.mouseup = null;
this.isDropdownVisible = false;
this.keyMode = null;
}

self._DeepSee_Component_styleEdit_onStartModalHandler = function(zindex) {
var div = this.getDropDownDiv();
zenASSERT(div,'Unable to find dropdown div',arguments);
div.onmousedown = new Function("event","zenPage.getComponent("+this.index+").mouseDown=true;");
div.onmouseup = new Function("event","zenPage.getComponent("+this.index+").mouseDown=null;");
div.className = 'seDropdown';
div.style.overflow = 'hidden';
div.style.overflowY = 'auto';
div.style.zIndex = zindex;
div.style.display = "";
this.adjustDropdownPosition();
this.renderDropdown();
}

self._DeepSee_Component_styleEdit_onresizeHandler = function() {
if (this.isDropdownVisible) {
this.adjustDropdownPosition();
}
}

self._DeepSee_Component_styleEdit_parseStyle = function(style) {
var result = {};
var enc = this.getEnclosingDiv();
var encStyle = enc.style.cssText;
enc.style.cssText = style + 'display:none;';
result.color = '';
result.background = '';
result.bold = false;
result.italic = false;
result.underline = false;
result.fontSize = '';
result.fontFamily = '';
if (enc.style.color!='') {
result.color = enc.style.color;
}
if (enc.style.backgroundColor!='') {
result.background = enc.style.backgroundColor;
}
if (enc.style.textAlign!='') {
result.textAlign = enc.style.textAlign;
}
if (enc.style.fontWeight!='') {
result.bold = (enc.style.fontWeight == 'bold');
}
if (enc.style.fontStyle!='') {
result.italic = (enc.style.fontStyle == 'italic');
}
if (enc.style.textDecoration!='') {
result.underline = (enc.style.textDecoration == 'underline');
}
if (enc.style.fontFamily!='') {
result.fontFamily = enc.style.fontFamily;
}
if (enc.style.fontSize!='') {
result.fontSize = enc.style.fontSize;
}
enc.style.cssText = encStyle;
return result;
}

self._DeepSee_Component_styleEdit_renderContents = function() {
if (this.getEnclosingDiv() == null) return;
var enc = this.getEnclosingDiv();
if (this.mode=='color') {
var result = this.value;
}
else {
var result = this.parseStyle(this.value);
}
var features = null;
if (this.mode=='style') {
if (this.features=='') {
features = { font: true, background: true, color: true, align: true, reset: true };
}
else {
features = { font: false, background: false, color: false, align: false, reset: false };
var f = this.features.toString().split(',');
for (var n = 0; n < f.length; n++) {
if (f[n]!='') {
features[f[n]] = true;
}
}
}
}
var html=[];
html[html.length] = '<div class="seBox" style="position:relative;">';
html[html.length] = '<table border="0" cellpadding="0" cellspacing="0">';
html[html.length] = '<tr>';
if (this.mode=='color') {
var style = 'background:#C0C0C0;box-shadow:1px 1px 2px #808080; border-radius:4px;width:25px;height:20px;padding-bottom:2px;padding-top:2px;border:1px solid #808080;background:'+(result==''?'#C0C0C0':result)+';text-align:center;';
html[html.length] = '<td style="padding:4px;vertical-align:middle;font-family:arial;font-size:12pt;font-weight:bold;"><div id="'+this.makeId('background')+'" title="'+$$$Text('Set background color')+'" style="'+style+'" onclick="zenPage.getComponent('+this.index+').showDropdown(\'background\');" >';
html[html.length] = '&#160;';
html[html.length] = '</div></td>';
}
else {
if (features['font']) {
var fontName = result.fontFamily ? result.fontFamily : '';
var style = 'background:'+(result.background==''?'#C0C0C0':result.background)+
';color:'+(result.color==''?'#404040':result.color)+
';box-shadow:1px 1px 2px #808080; border-radius:4px;width:70px;height:20px;overflow:hidden;padding-bottom:2px;padding-top:2px;border:1px solid #808080;text-align:left;vertical-align:middle;';
html[html.length] = '<td style="padding:4px;font-family:'+fontName+';font-size:11pt;"><div id="'+this.makeId('font')+'" title="'+$$$Text('Set font')+'" style="'+style+'" onclick="zenPage.getComponent('+this.index+').showDropdown(\'font\');" >';
html[html.length] = fontName.toString().split(' ')[0];
html[html.length] = '</div>'
if (!zenIsIE) {
html[html.length] = '<div style="position:absolute; top:15px; left:65px;" onclick="zenPage.getComponent('+this.index+').showDropdown(\'font\');"><image src="images/disclosure-expanded.gif"/></div>';
}
html[html.length] = '</td>';
var fontSize = result.fontSize ? result.fontSize : '';
var style = 'background:white;box-shadow:1px 1px 2px #808080; border-radius:4px;width:35px;height:20px;overflow:hidden;padding-bottom:2px;padding-top:2px;border:1px solid #808080;text-align:left;vertical-align:middle;';
html[html.length] = '<td style="padding:4px;font-family:arial;font-size:9pt;"><div id="'+this.makeId('fontSize')+'" title="'+$$$Text('Set font size')+'" style="'+style+'" onclick="zenPage.getComponent('+this.index+').showDropdown(\'fontSize\');" >';
html[html.length] = fontSize;
html[html.length] = '</div>'
if (!zenIsIE) {
html[html.length] = '<div style="position:absolute; top:15px; left:110px;" onclick="zenPage.getComponent('+this.index+').showDropdown(\'fontSize\');"><image src="images/disclosure-expanded.gif"/></div>';
}
html[html.length] = '</td>';
}
if (features['background']) {
var style = 'background:#C0C0C0;box-shadow:1px 1px 2px #808080; border-radius:4px;width:25px;height:20px;padding-bottom:2px;padding-top:2px;border:1px solid #808080;background:'+(result.background==''?'#C0C0C0':result.background)+';text-align:center;';
html[html.length] = '<td style="padding:4px;vertical-align:middle;font-family:arial;font-size:12pt;font-weight:bold;"><div id="'+this.makeId('background')+'" title="'+$$$Text('Set background color')+'" style="'+style+'" onclick="zenPage.getComponent('+this.index+').showDropdown(\'background\');" >';
html[html.length] = '&#160;';
html[html.length] = '</div></td>';
}
if (features['color']) {
var style = 'background:#404040;box-shadow:1px 1px 1px #808080; border-radius:4px;width:25px;height:20px;padding-bottom:2px;padding-top:2px;border:1px solid #808080;background:'+(result.color==''?'#404040':result.color)+';text-align:center;';
html[html.length] = '<td style="color:#808080;text-shadow:1px 1px 3px white; padding:4px;vertical-align:middle;font-family:arial;font-size:12pt;font-weight:bold;"><div id="'+this.makeId('color')+'" title="'+$$$Text('Set foreground color')+'" style="'+style+'" onclick="zenPage.getComponent('+this.index+').showDropdown(\'color\');" >';
html[html.length] = 'a';
html[html.length] = '</div></td>';
}
if (features['align']) {
html[html.length] = '<td style="width:10px;">&#160;</td>';
var src = result.bold ? 'portal/boldButtonB.png' : 'portal/boldButton.png';
html[html.length] = '<td style="padding:4px;">'
html[html.length] = '<input type="image" id="'+this.makeId('bold')+'" onclick="zenPage.getComponent('+this.index+').textStyle(\'bold\');" src="'+src+'"/>';
var src = result.italic ? 'portal/italicButtonB.png' : 'portal/italicButton.png';
html[html.length] = '<input type="image" id="'+this.makeId('italic')+'" onclick="zenPage.getComponent('+this.index+').textStyle(\'italic\');" src="'+src+'"/>';
var src = result.underline ? 'portal/underlineButtonB.png' : 'portal/underlineButton.png';
html[html.length] = '<input type="image" id="'+this.makeId('underline')+'" onclick="zenPage.getComponent('+this.index+').textStyle(\'underline\');" src="'+src+'"/>';
html[html.length] = '<br/>';
var src = result.textAlign =='left' ? 'portal/justLeftButtonB.png' : 'portal/justLeftButton.png';
html[html.length] = '<input type="image" id="'+this.makeId('alignLeft')+'" onclick="zenPage.getComponent('+this.index+').textAlign(\'left\');" src="'+src+'"/>';
var src = result.textAlign =='center' ? 'portal/justCenterButtonB.png' : 'portal/justCenterButton.png';
html[html.length] = '<input type="image" id="'+this.makeId('alignCenter')+'" onclick="zenPage.getComponent('+this.index+').textAlign(\'center\');" src="'+src+'"/>';
var src = result.textAlign =='right' ? 'portal/justRightButtonB.png' : 'portal/justRightButton.png';
html[html.length] = '<input type="image" id="'+this.makeId('alignRight')+'" onclick="zenPage.getComponent('+this.index+').textAlign(\'right\');" src="'+src+'"/>';
html[html.length] = '</td>';
}
if (features['reset']) {
html[html.length] = '<td style="padding:0px;">'
var hlpReset = $$$Text('Reset styles');
html[html.length] = '<input title="'+hlpReset+'" type="image" onclick="zenPage.getComponent('+this.index+').resetStyles();" onmouseover="this.style.background=\'#FFEEAA\';" onmouseout="this.style.background=\'none\';" src="images/MacCloseX.png"/>';
html[html.length] = '</td>';
}
}
html[html.length] = '</tr>';
html[html.length] = '</table>';
html[html.length] = '</div>';
enc.innerHTML = html.join('');
}

self._DeepSee_Component_styleEdit_renderDropdown = function() {
var which = this._whichDropdown;
var div = this.getDropDownDiv();
if (this._timerId) {
self.clearTimeout(this._timerId);
this._timerId = null;
}
var html = [];
var caption = '&#160;';
if (this.mode == 'style') {
switch(which) {
case 'font':
caption = $$$Text('Font family');
break;
case 'fontSize':
caption = $$$Text('Font size');
break;
case 'background':
caption = $$$Text('Background');
var result = this.parseStyle(this.value);
this._customBackground = result.background;
break;
case 'color':
caption = $$$Text('Text color');
var result = this.parseStyle(this.value);
this._customColor = result.color;
break;
}
}
else if (this.mode=='color') {
caption = this.caption ? this.caption : $$$Text('Color');
this._customBackground = this.value ? this.value : null;
}
html[html.length] = '<table border="0" cellspacing="0" cellpadding="0" style="width:100%;"><tr style="background:#F0F0F0;border-bottom:1px solid #D8D8D8;"><td nowrap="1" style="color:#808080; font-size:8pt;padding-left:4px;">'+caption+'<td style="text-align:right;width:99%;"><image src="deepsee/ds2_x_44.png" style="height:16px;padding:2px;" onclick="zenPage.getComponent('+this.index+').hideDropDown();"  onmouseover="this.style.background=\'#FFEEAA\';" onmouseout="this.style.background=\'none\';"/>&#160;</td></tr></table>';
var msgDefault = $$$Text('Default');
switch(which) {
case 'font':
var stdFonts = ['arial','courier new','century schoolbook','helvetica','times roman','verdana','comic sans ms'];
html[html.length] = '<table style="width:100%;">';
html[html.length] = '<td onclick="zenPage.getComponent('+this.index+').selectFont(\''+which+'\',\'inherit\');"><div onmouseover="this.style.background=\'#FFEEAA\';" onmouseout="this.style.background=\'none\';">'+msgDefault+'</div></td>';
for (var r = 0; r < stdFonts.length; r++) {
html[html.length] = '<tr>';
var font = stdFonts[r];
html[html.length] = '<td style="font-family:'+font+';" onclick="zenPage.getComponent('+this.index+').selectFont(\''+which+'\',\''+font+'\');"><div onmouseover="this.style.background=\'#FFEEAA\';" onmouseout="this.style.background=\'none\';">'+font+'</div></td>';
html[html.length] = '</tr>';
}
html[html.length] = '</table>';
break;
case 'fontSize':
var stdSizes = [6,7,8,9,10,11,12,13,14,15,16,18,20,24,30,40,48];
html[html.length] = '<div style="padding:2px;overflow:hidden;">';
html[html.length] = '<a style="font-family:'+font+';" onclick="zenPage.getComponent('+this.index+').selectFontSize(\''+which+'\',\'inherit\');" onmouseover="this.style.background=\'#FFEEAA\';" onmouseout="this.style.background=\'none\';">'+msgDefault+'</a><br/>';
for (var r = 0; r < stdSizes.length; r++) {
var font = 'arial';
var size = stdSizes[r] + 'pt';
html[html.length] = '<a style="font-family:'+font+';font-size:'+size+';" onclick="zenPage.getComponent('+this.index+').selectFontSize(\''+which+'\',\''+size+'\');" onmouseover="this.style.background=\'#FFEEAA\';" onmouseout="this.style.background=\'none\';">'+size+'</a> ';
}
html[html.length] = '</div';
break;
case 'color':
case 'background':
html[html.length] = '<div style="background:#F0F0F0;padding:1px;">';
html[html.length] = '<select class="seColorSet" id="'+this.makeId('colorSet')+'" onchange="zenPage.getComponent('+this.index+').colorSetChange(\''+which+'\');">';
for (var n = 0; n < this.colorSetNames.length; n++) {
html[html.length] = '<option '+(this.colorSetNames[n]==this.currColorSet?'selected="1"':'')+' value="'+this.colorSetNames[n]+'">' + this.colorSetCaptions[n] + '</option>';
}
html[html.length] = '</select>';
html[html.length] = '</div>';
html[html.length] = '<div id="'+this.makeId('colorTable')+'">';
html[html.length] = this.getColorTableHTML(which);
html[html.length] = '</div>';
html[html.length] = '<table border="0" cellspacing="1" cellpadding="0" style="margin-top:5px;width:100%;font-size:10px;color:#606060;">';
bdr = '#808080';
var r=255,g=255,b=255;
if (which == 'color') {
var clr = this._customColor ? this._customColor : 'white';
if (clr.toString().substr(0,4)=='rgb(') {
var t= clr.substr(4,clr.length).split(',');
r = parseInt(t[0],10);
g = parseInt(t[1],10);
b = parseInt(t[2],10);
}
}
else {
var clr = this._customBackground ? this._customBackground : 'white';
if (clr.toString().substr(0,4)=='rgb(') {
var t= clr.substr(4,clr.length).split(',');
r = parseInt(t[0],10);
g = parseInt(t[1],10);
b = parseInt(t[2],10);
}
}
html[html.length] = '<tr><td title="'+$$$Text('Custom color')+'" id="'+this.makeId('sample')+'" style="border:1px solid '+bdr+';background:'+clr+';font-size:1px; width:16px;height:16px;" onclick="zenPage.getComponent('+this.index+').selectColor(\''+which+'\',\'custom\');">&#160;</td>';
var press = 'onkeyup="zenPage.getComponent('+this.index+').customColorChange(\''+which+'\');"';
html[html.length] = '<td>&#160;<input id="'+this.makeId('red')+'" type="text" style="border:none;background:#800000;color:#F0F0F0;width:40px;font-size:10px;" value="'+r+'" '+press+'/></td>';
html[html.length] = '<td><input id="'+this.makeId('green')+'" type="text" style="border:none;background:#008000;color:#F0F0F0;width:40px;font-size:10px;" value="'+g+'" '+press+'/></td>';
html[html.length] = '<td><input id="'+this.makeId('blue')+'" type="text" style="border:none;background:#000080;color:#F0F0F0;width:40px;font-size:10px;" value="'+b+'" '+press+'/></td>';
html[html.length] = '<td style="width:20%;">&#160;</td>';
html[html.length] = '</tr>';
html[html.length] = '</table>';
break;
}
div.innerHTML = html.join('');
this._steps = 0;
this._mode = 'show';
this._timerId = self.setTimeout('zenPage.getComponent('+this.index+').reveal()',10);
}

self._DeepSee_Component_styleEdit_resetStyles = function() {
this.setValue('');
this.onchangeHandler();
}

self._DeepSee_Component_styleEdit_reveal = function() {
var div = this.getDropDownDiv();
this._steps++;
var maxSteps = 20;
if (this._mode == 'show') {
if (this._steps >= maxSteps) {
div.style.display = 'block';
div.style.opacity = 1.0;
}
else {
div.style.display = 'block';
div.style.opacity = this._steps/maxSteps;
this._timerId = self.setTimeout('zenPage.getComponent('+this.index+').reveal()',10);
}
}
else {
if (this._steps >= maxSteps) {
div.style.display = 'none';
zenPage.endModal();
}
else {
div.style.display = 'block';
div.style.opacity = 1 - this._steps/maxSteps;
this._timerId = self.setTimeout('zenPage.getComponent('+this.index+').reveal()',10);
}
}
}

self._DeepSee_Component_styleEdit_selectColor = function(which,color) {
var div = this.findElement(which);
var custom = (color=='custom');
if (custom) {
if (which=='color') {
color = this._customColor ? this._customColor : 'white';
}
else {
color = this._customBackground ? this._customBackground : 'white';
}
}
switch(which) {
case 'color':
this.setStyle('color',color);
break;
case 'background':
this.setStyle('background',color);
break;
}
if (this.mode=='color') {
var result = {background:this.value?this.value:''};
}
else {
var result = this.parseStyle(this.value);
}
if (div) {
switch(which) {
case 'color':
div.style.background = result.color;
var fontDiv = this.findElement('font');
if (fontDiv) {
fontDiv.style.color = result.color==''?'#404040':result.color;
}
break;
case 'background':
div.style.background = result.background;
var fontDiv = this.findElement('font');
if (fontDiv) {
fontDiv.style.background = result.background==''?'#C0C0C0':result.background;
}
break;
}
}
this.hideDropDown();
}

self._DeepSee_Component_styleEdit_selectFont = function(which,font) {
var div = this.findElement(which);
switch(which) {
case 'font':
this.setStyle('font-family',font);
break;
}
var result = this.parseStyle(this.value);
if (div) {
switch(which) {
case 'font':
div.style.fontFamily = result.fontFamily;
div.innerHTML = result.fontFamily.toString().split(' ')[0];
break;
}
}
this.hideDropDown();
}

self._DeepSee_Component_styleEdit_selectFontSize = function(which,size) {
var div = this.findElement(which);
switch(which) {
case 'fontSize':
this.setStyle('font-size',size);
break;
}
var result = this.parseStyle(this.value);
if (div) {
switch(which) {
case 'fontSize':
div.innerHTML = result.fontSize;
break;
}
}
this.hideDropDown();
}

self._DeepSee_Component_styleEdit_setProperty = function(property,value,value2) {
switch(property) {
case 'value':
this.value = value;
this.render();
break;
default:
break;
}
}

self._DeepSee_Component_styleEdit_setStyle = function(style,value) {
if (style!='') {
var color = '';	// for color mode
if (this.mode=='color') {
var test = this.value ? ('background:' + this.value+';') : '';
}
else {
var test = this.value;
}
switch (style) {
case 'align':
test += 'text-align:' + (value==''?'inherit':value) + ';';
break;
case 'bold':
test += 'font-weight:' + (value?'bold':'normal') + ';';
break;
case 'underline':
test += 'text-decoration:' + (value?'underline':'none') + ';';
break;
case 'italic':
test += 'font-style:' + (value?'italic':'normal') + ';';
break;
case 'color':
test += 'color:' + (value&&value!=''?value:'inherit') + ';';
break;
case 'background':
test += 'background:' + (value&&value!=''?value:'inherit') + ';';
break;
case 'font-family':
test += 'font-family:' + (value&&value!=''?value:'inherit') + ';';
break;
case 'font-size':
test += 'font-size:' + (value&&value!=''?value:'inherit') + ';';
break;
default:
break;
}
var result = this.parseStyle(test);
var s = '';
if (result.textAlign && result.textAlign!='inherit') {
s += 'text-align: ' + result.textAlign+';';
}
if (result.bold) {
s += 'font-weight: bold;';
}
if (result.italic) {
s += 'font-style: italic;';
}
if (result.underline) {
s += 'text-decoration: underline;';
}
if (result.color) {
if (result.color&&result.color!==''&&result.color!='inherit') {
s += 'color:'+result.color+ ';';
}
}
if (result.background) {
if (result.background&&result.background!==''&&result.background!='inherit') {
s += 'background:'+ result.background + ';';
color = result.background;	// for color mode
}
}
if (result.fontFamily && result.fontFamily!='inherit') {
s += 'font-family:'+(result.fontFamily&&result.fontFamily!==''?result.fontFamily:'inherit')+ ';';
}
if (result.fontSize && result.fontSize!='inherit') {
s += 'font-size:'+(result.fontSize&&result.fontSize!==''?result.fontSize:'inherit')+ ';';
}
if (this.mode=='color') {
this.value = color;
}
else {
this.value = s;
}
this.onchangeHandler();
}
}

self._DeepSee_Component_styleEdit_showDropdown = function(which) {
if (!this.disabled && !this.readOnly) {
this._whichDropdown = which;
zenPage.startModal(this);
}
}

self._DeepSee_Component_styleEdit_textAlign = function(which) {
var elLeft = this.findElement('alignLeft');
var elCenter = this.findElement('alignCenter');
var elRight = this.findElement('alignRight');
switch(which) {
case 'left':
var sel = elLeft.src.indexOf('justLeftButtonB.png')!=-1;
this.setStyle('align',sel?'':'left');
break;
case 'center':
var sel = elCenter.src.indexOf('justCenterButtonB.png')!=-1;
this.setStyle('align',sel?'':'center');
break;
case 'right':
var sel = elRight.src.indexOf('justRightButtonB.png')!=-1;
this.setStyle('align',sel?'':'right');
break;
}
var result = this.parseStyle(this.value);
elLeft.src = result.textAlign=='left' ? 'portal/justLeftButtonB.png' : 'portal/justLeftButton.png';
elCenter.src = result.textAlign=='center' ? 'portal/justCenterButtonB.png' : 'portal/justCenterButton.png';
elRight.src = result.textAlign=='right' ? 'portal/justRightButtonB.png' : 'portal/justRightButton.png';
}

self._DeepSee_Component_styleEdit_textStyle = function(which) {
switch(which) {
case 'bold':
var el = this.findElement('bold');
var sel = el.src.indexOf('boldButtonB.png')!=-1;
this.setStyle('bold',!sel);
var result = this.parseStyle(this.value);
el.src = result.bold ? 'portal/boldButtonB.png' : 'portal/boldButton.png';
break;
case 'italic':
var el = this.findElement('italic');
var sel = el.src.indexOf('italicButtonB.png')!=-1;
this.setStyle('italic',!sel);
var result = this.parseStyle(this.value);
el.src = result.italic ? 'portal/italicButtonB.png' : 'portal/italicButton.png';
break;
case 'underline':
var el = this.findElement('underline');
var sel = el.src.indexOf('underlineButtonB.png')!=-1;
this.setStyle('underline',!sel);
var result = this.parseStyle(this.value);
el.src = result.underline ? 'portal/underlineButtonB.png' : 'portal/underlineButton.png';
break;
}
}

self._DeepSee_Component_styleEdit_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._DeepSee_Component_styleEdit__Loader = function() {
	zenLoadClass('_ZEN_Component_control');
	_DeepSee_Component_styleEdit.prototype = zenCreate('_ZEN_Component_control',-1);
	var p = _DeepSee_Component_styleEdit.prototype;
	if (null==p) {return;}
	p.constructor = _DeepSee_Component_styleEdit;
	p.superClass = ('undefined' == typeof _ZEN_Component_control) ? zenMaster._ZEN_Component_control.prototype:_ZEN_Component_control.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%DeepSee.Component.styleEdit';
	p._type = 'styleEdit';
	p.serialize = _DeepSee_Component_styleEdit_serialize;
	p.getSettings = _DeepSee_Component_styleEdit_getSettings;
	p.ReallyRefreshContents = _DeepSee_Component_styleEdit_ReallyRefreshContents;
	p.adjustDropdownPosition = _DeepSee_Component_styleEdit_adjustDropdownPosition;
	p.colorSetChange = _DeepSee_Component_styleEdit_colorSetChange;
	p.customColorChange = _DeepSee_Component_styleEdit_customColorChange;
	p.getColorSet = _DeepSee_Component_styleEdit_getColorSet;
	p.getColorTableHTML = _DeepSee_Component_styleEdit_getColorTableHTML;
	p.getDropDownDiv = _DeepSee_Component_styleEdit_getDropDownDiv;
	p.hideDropDown = _DeepSee_Component_styleEdit_hideDropDown;
	p.onEndModalHandler = _DeepSee_Component_styleEdit_onEndModalHandler;
	p.onStartModalHandler = _DeepSee_Component_styleEdit_onStartModalHandler;
	p.onresizeHandler = _DeepSee_Component_styleEdit_onresizeHandler;
	p.parseStyle = _DeepSee_Component_styleEdit_parseStyle;
	p.renderContents = _DeepSee_Component_styleEdit_renderContents;
	p.renderDropdown = _DeepSee_Component_styleEdit_renderDropdown;
	p.resetStyles = _DeepSee_Component_styleEdit_resetStyles;
	p.reveal = _DeepSee_Component_styleEdit_reveal;
	p.selectColor = _DeepSee_Component_styleEdit_selectColor;
	p.selectFont = _DeepSee_Component_styleEdit_selectFont;
	p.selectFontSize = _DeepSee_Component_styleEdit_selectFontSize;
	p.setProperty = _DeepSee_Component_styleEdit_setProperty;
	p.setStyle = _DeepSee_Component_styleEdit_setStyle;
	p.showDropdown = _DeepSee_Component_styleEdit_showDropdown;
	p.textAlign = _DeepSee_Component_styleEdit_textAlign;
	p.textStyle = _DeepSee_Component_styleEdit_textStyle;
}

self._zenClassIdx['http://www.intersystems.com/deepsee/searchBox'] = '_DeepSee_Component_searchBox';
self._DeepSee_Component_searchBox = function(index,id) {
	if (index>=0) {_DeepSee_Component_searchBox__init(this,index,id);}
}

self._DeepSee_Component_searchBox__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_abstractComboBox__init) ?zenMaster._ZEN_Component_abstractComboBox__init(o,index,id):_ZEN_Component_abstractComboBox__init(o,index,id);
	o.appendPivotVariables = false;
	o.calendar = '';
	o.dataSourceName = '';
	o.dateFormat = 'mmm d, y';
	o.descriptionProperty = '';
	o.displayList = '';
	o.displayMode = 'list';
	o.filterName = '';
	o.firstDayOfWeek = '';
	o.iconApply = 'deepsee\/ds2_checkmark_16.png';
	o.iconCancel = 'deepsee\/ds2_circlex_22.png';
	o.iconSearch = 'deepsee\/ds2_magnify_18.png';
	o.listOfCMbrText = new Array();
	o.listOfCMbrValues = new Array();
	o.listOfText = new Array();
	o.listOfValues = new Array();
	o.loadingMessage = 'Loading...';
	o.maxRows = '500';
	o.multiSelect = true;
	o.onshowdropdown = '';
	o.previewMode = false;
	o.priorText = new Array();
	o.priorValues = new Array();
	o.relatedFilterKeys = new Array();
	o.relatedFilterSpecs = new Array();
	o.searchText = '';
	o.selectMode = '';
	o.selectType = '';
	o.useSearch = false;
	o.valueList = '';
	o.valueRequired = false;
}
function _DeepSee_Component_searchBox_serialize(set,s)
{
	var o = this;s[0]='2890890310';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=(o.appendPivotVariables?1:0);s[8]=o.autocomplete;s[9]=o.aux;s[10]=o.buttonCaption;s[11]=o.buttonImage;s[12]=o.buttonImageDown;s[13]=o.buttonTitle;s[14]=o.calendar;s[15]=o.clientType;s[16]=o.comboType;s[17]=o.containerStyle;s[18]=o.controlClass;s[19]=o.controlStyle;s[20]=o.dataBinding;s[21]=o.dataSourceName;s[22]=o.dateFormat;s[23]=o.delay;s[24]=o.descriptionProperty;s[25]=(o.disabled?1:0);s[26]=o.displayList;s[27]=o.displayMode;s[28]=(o.dragEnabled?1:0);s[29]=(o.dropEnabled?1:0);s[30]=o.dropdownHeight;s[31]=o.dropdownWidth;s[32]=(o.dynamic?1:0);s[33]=(o.editable?1:0);s[34]=o.enclosingClass;s[35]=o.enclosingStyle;s[36]=o.error;s[37]=o.filterName;s[38]=o.firstDayOfWeek;s[39]=o.height;s[40]=(o.hidden?1:0);s[41]=o.hint;s[42]=o.hintClass;s[43]=o.hintStyle;s[44]=(o.hzScroll?1:0);s[45]=o.iconApply;s[46]=o.iconCancel;s[47]=o.iconSearch;s[48]=o.inputtype;s[49]=(o.invalid?1:0);s[50]=o.invalidMessage;s[51]=(o.isDropdownVisible?1:0);s[52]=o.label;s[53]=o.labelClass;s[54]=o.labelDisabledClass;s[55]=o.labelStyle;s[56]=set.serializeList(o,o.listOfCMbrText,false,'listOfCMbrText');s[57]=set.serializeList(o,o.listOfCMbrValues,false,'listOfCMbrValues');s[58]=set.serializeList(o,o.listOfText,false,'listOfText');s[59]=set.serializeList(o,o.listOfValues,false,'listOfValues');s[60]=o.loadingMessage;s[61]=o.maxRows;s[62]=o.maxlength;s[63]=(o.multiSelect?1:0);s[64]=o.onafterdrag;s[65]=o.onbeforedrag;s[66]=o.onblur;s[67]=o.onchange;s[68]=o.onclick;s[69]=o.ondblclick;s[70]=o.ondrag;s[71]=o.ondrop;s[72]=o.onfocus;s[73]=o.onhide;s[74]=o.onkeydown;s[75]=o.onkeypress;s[76]=o.onkeyup;s[77]=o.onmousedown;s[78]=o.onmouseout;s[79]=o.onmouseover;s[80]=o.onmouseup;s[81]=o.onrefresh;s[82]=o.onshow;s[83]=o.onshowdropdown;s[84]=o.onsubmit;s[85]=o.ontouchend;s[86]=o.ontouchmove;s[87]=o.ontouchstart;s[88]=o.onupdate;s[89]=o.onvalidate;s[90]=o.originalValue;s[91]=o.overlayMode;s[92]=o.placeholder;s[93]=(o.previewMode?1:0);s[94]=set.serializeList(o,o.priorText,false,'priorText');s[95]=set.serializeList(o,o.priorValues,false,'priorValues');s[96]=(o.readOnly?1:0);s[97]=set.serializeList(o,o.relatedFilterKeys,false,'relatedFilterKeys');s[98]=set.serializeList(o,o.relatedFilterSpecs,false,'relatedFilterSpecs');s[99]=o.renderFlag;s[100]=(o.required?1:0);s[101]=o.requiredMessage;s[102]=(o.scrollIntoView?1:0);s[103]=o.searchText;s[104]=o.selectMode;s[105]=o.selectType;s[106]=o.selectedIndex;s[107]=(o.showLabel?1:0);s[108]=o.size;s[109]=o.slice;s[110]=(o.spellcheck?1:0);s[111]=o.tabIndex;s[112]=o.text;s[113]=o.title;s[114]=o.tuple;s[115]=(o.unrestricted?1:0);s[116]=(o.useSearch?1:0);s[117]=o.valign;s[118]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[119]=o.valueList;s[120]=(o.valueRequired?1:0);s[121]=(o.visible?1:0);s[122]=o.width;
}
function _DeepSee_Component_searchBox_getSettings(s)
{
	s['name'] = 'string';
	s['appendPivotVariables'] = 'boolean';
	s['calendar'] = 'string';
	s['dataSourceName'] = 'string';
	s['dateFormat'] = 'string';
	s['descriptionProperty'] = 'string';
	s['displayList'] = 'csv';
	s['displayMode'] = 'enum:ist,calendar,custom,measure';
	s['filterName'] = 'string';
	s['firstDayOfWeek'] = 'integer';
	s['iconApply'] = 'string';
	s['iconCancel'] = 'string';
	s['iconSearch'] = 'string';
	s['listOfCMbrText'] = 'string';
	s['listOfCMbrValues'] = 'string';
	s['listOfText'] = 'string';
	s['listOfValues'] = 'string';
	s['loadingMessage'] = 'caption';
	s['maxRows'] = 'integer';
	s['multiSelect'] = 'boolean';
	s['onshowdropdown'] = 'eventHandler';
	s['previewMode'] = 'boolean';
	s['priorText'] = 'string';
	s['priorValues'] = 'string';
	s['relatedFilterKeys'] = 'string';
	s['relatedFilterSpecs'] = 'string';
	s['searchText'] = 'string';
	s['selectMode'] = 'string';
	s['selectType'] = 'string';
	s['useSearch'] = 'boolean';
	s['valueList'] = 'csv';
	s['valueRequired'] = 'boolean';
	this.invokeSuper('getSettings',arguments);
}

self._DeepSee_Component_searchBox_adjustDropDownWidth = function() {
var div = this.getDropDownDiv();
var list = this.findElement('list');
if (list) {
div.style.width = list.offsetWidth + 'px'; // JSL4502 this original code makes searchbox too wide?
}
}

self._DeepSee_Component_searchBox_adjustDropdownPosition = function() {
this.invokeSuper('adjustDropdownPosition',arguments);
var div = this.getDropDownDiv();
var left = zenGetLeft(div);
var ww = zenGetWindowWidth();
if ((left + div.offsetWidth) > ww) {
div.style.left = (ww-div.offsetWidth)+'px';
}
}

self._DeepSee_Component_searchBox_applyCalendar = function() {
if ( (''==this.value) && this.valueRequired ) {
alert($$$Text('A value is required for this control.'));
}
else {
this.onchangeHandler();
this._applied = true;
zenPage.endModal();
delete this._applied;
}
}

self._DeepSee_Component_searchBox_applyChange = function() {
if ( (''==this.value) && this.valueRequired ) {
alert($$$Text('A value is required for this control.'));
}
else {
this.onchangeHandler();
this._applied = true;
zenPage.endModal();
delete this._applied;
}
}

self._DeepSee_Component_searchBox_applyMeasure = function() {
this.listOfValues.length = 0;
this.listOfText.length = 0;
var msrOp = this.findElement('msrOp').value;
var msrParm = this.findElement('msrParm').value;
if (msrParm=='') {
var val = '';
var text = '';
}
else {
var val = '%SEARCH.&['+this.filterName+msrOp+msrParm+']';
var text = msrOp+msrParm;
}
this.value = val;
this.text = text;
this.listOfValues[this.listOfValues.length] = val;
this.listOfText[this.listOfText.length] = text;
var td = this.findElement('input');
if (td) {
td.innerHTML = this.text + '&#160;';
td.title = this.text;
}
var hidden = this.findElement('hidden');
hidden.value = this.value;
this.updateTooltip();
this.onchangeHandler();
this._applied = true;
zenPage.endModal();
delete this._applied;
}

self._DeepSee_Component_searchBox_cancelChanges = function(close) {
close = ('undefined' == typeof close ? true : close);
this.value = this._value;
this.text = this._text;
this.listOfValues = this._listOfValues.slice(0);
this.listOfText = this._listOfText.slice(0);
var hidden = this.findElement('hidden');
hidden.value = this.value;
var td = this.findElement('input');
if (td) {
td.innerHTML = this.text + '&#160;';
td.title = this.text;
}
if (close) {
if ( (''==this.value) && this.valueRequired ) {
alert($$$Text('A value is required for this control.'));
}
else {
zenPage.endModal()
};
}
}

self._DeepSee_Component_searchBox_cbNowClick = function(isCB,which) {
var cb1 = self.document.getElementById('cbNow1');
var cb2 = self.document.getElementById('cbNow2');
var offset1 = self.document.getElementById('offsetNow1');
var offset2 = self.document.getElementById('offsetNow2');
if (!isCB) {
if (which==1 && cb1) {
cb1.checked = !cb1.checked;
}
else if (which==2 && cb2) {
cb2.checked = !cb2.checked;
}
}
var cal1 = zen('cal');
if (cb1 && cb1.checked) {
cal1.setDisabled(true);
offset1.disabled = false;
}
else {
cal1.setDisabled(false);
offset1.disabled = true;
}
var cal2 = zen('cal2');
if (cb2 && cb2.checked) {
cal2.setDisabled(true);
offset2.disabled = false;
}
else {
cal2.setDisabled(false);
offset2.disabled = true;
}
this.dateRangeChange(which);
}

self._DeepSee_Component_searchBox_dateChange = function(ctrl,clear) {
this.listOfValues.length = 0;
this.listOfText.length = 0;
if (clear) {
this.resetItems();
}
for (var n = 0; n < ctrl.listOfValues.length; n++) {
var val = ctrl.listOfValues[n];
if (''!==val) {
var text = val;
var h = this.dateToHorolog(val);
val = '&['+h+']';
this.listOfValues[this.listOfValues.length] = val;
this.listOfText[this.listOfText.length] = this.dateFormat ? zenFormatDate(text,this.dateFormat) : text;
}
}
this.text = this.listOfText[0] ? this.listOfText[0] : '';
this.value = this.listOfValues.join(',');
if (ctrl.isRange && this.listOfValues.length==2) {
this.value = this.listOfValues.join(':');
this.text = this.listOfText.join(':');
}
else if (this.listOfValues.length>1) {
this.value = '{' + this.value + '}';
this.text = this.listOfText.join('+ ');
}
if (this.selectMode=='not' && ''!==this.value) {
this.value = '%NOT ' + this.value;
this.text = 'NOT&#160;' + this.text;
}
if (''!=this.value) {
var ctrlAll = this.findElement('cball');
if (ctrlAll) {
ctrlAll.checked = false;
}
}
var hidden = this.findElement('hidden');
hidden.value = this.value;
var td = this.findElement('input');
if (td) {
td.innerHTML = this.text + '&#160;';
td.title = this.text;
}
this.updateTooltip();
}

self._DeepSee_Component_searchBox_dateFromHorolog = function(val,nowInfo) {
var date = null;
if (nowInfo) {
nowInfo.now = false;
nowInfo.offset = '';
}
if (val.toString().indexOf('NOW')>=0) {
var date = new Date();
var tMinus = parseInt(val.split('-')[1]);
var tPlus = parseInt(val.split('+')[1]);
if (tMinus) {
date.setDate(date.getDate() - tMinus);
if (nowInfo) {
nowInfo.offset = '-'+tMinus;
}
}
else if (tPlus) {
date.setDate(date.getDate() + tPlus);
if (nowInfo) {
nowInfo.offset = '+'+tPlus;
}
}
if (nowInfo) {
nowInfo.now = true;
}
}
else if (''!==val && !isNaN(val)) {
var days1970 = parseInt(val,10) - 47117;
var date = new Date((days1970 * 24 * 3600 * 1000));
}
if (date) {
var mon = date.getUTCMonth();
mon = (mon<9?'0':'') + (mon+1);
var day = date.getUTCDate();
day = (day<10?'0':'') + (day);
var yr = date.getUTCFullYear();
val = yr+'-'+mon+'-'+day;
}
return val;
}

self._DeepSee_Component_searchBox_dateRangeChange = function(which) {
var cal1 = zen('cal');
var cal2 = zen('cal2');
var cb1 = self.document.getElementById('cbNow1');
var cb2 = self.document.getElementById('cbNow2');
var now1 = (cb1 && cb1.checked);
var now2 = (cb2 && cb2.checked);
var offset1 = self.document.getElementById('offsetNow1');
var offset2 = self.document.getElementById('offsetNow2');
var nowOffset1 = '';
var nowOffset2 = '';
if (offset1) {
offset1.value = (!offset1.value||isNaN(parseInt(offset1.value,10))) ? '' : parseInt(offset1.value,10);
offset1.value = offset1.value>0 ? ('+'+offset1.value) : offset1.value;
offset1.value = offset1.value==0 ? '' : offset1.value;
nowOffset1 = offset1.value;
}
if (offset2) {
offset2.value = (!offset2.value||isNaN(parseInt(offset2.value,10))) ? '' : parseInt(offset2.value,10);
offset2.value = offset2.value>0 ? ('+'+offset2.value) : offset2.value;
offset2.value = offset2.value==0 ? '' : offset2.value;
nowOffset2 = offset2.value;
}
this.listOfValues.length = 0;
this.listOfText.length = 0;
if (!now1 && !now2 && (cal1.getValue()!='')&&(cal2.getValue()!='')) {
if (which == 1) {
if (cal1.getValue()>cal2.getValue()) {
cal2.setValue(cal1.getValue());
}
}
else if (which == 2) {
if (cal1.getValue()>cal2.getValue()) {
cal1.setValue(cal2.getValue());
}
}
}
var format = this.dateFormat;
var c1text = now1 ? this.resolveNowOffset(nowOffset1,this.selectType) : (format?zenFormatDate(cal1.getValue(),format):cal1.getValue());
var c2text = now2 ? this.resolveNowOffset(nowOffset2,this.selectType) : (format?zenFormatDate(cal2.getValue(),format):cal2.getValue());
var c1value = now1 ? ('&[NOW'+nowOffset1+']') : c1text=="" ? "" : '&[' + this.dateToHorolog(cal1.getValue()) + ']';		// DTB148 - use original value, not calculated text.
var c2value = now2 ? ('&[NOW'+nowOffset2+']') : c2text=="" ? "" : '&[' + this.dateToHorolog(cal2.getValue()) + ']';		// DTB148
var c1title = now1 ? ($$$Text('NOW')+nowOffset1) : (format?zenFormatDate(cal1.getValue(),format):cal1.getValue());
var c2title = now2 ? ($$$Text('NOW')+nowOffset2) : (format?zenFormatDate(cal2.getValue(),format):cal2.getValue());
if (now1 && now2 && (nowOffset1==nowOffset2)) {
c2text = '';
c2value = '';
c2title = '';		// DTB121
}
this.value = c1value + ((c1value!=''&&c2value!='')?':':'') + c2value;
this.text = c1text + ((c1text!=''&&c2text!='')?':':'') + c2text;
this.title = c1title + ((c1title!=''&&c2title!='')?':':'') + c2title;
var hidden = this.findElement('hidden');
hidden.value = this.value;
var td = this.findElement('input');
if (td) {
td.innerHTML = this.text + '&#160;';
}
this.updateTooltip();
}

self._DeepSee_Component_searchBox_dateToHorolog = function(val) {
if (''!==val && val!='NOW') {
var text = val;
var t = val.toString().split('-');
var year = parseInt(t[0],10);
var month = parseInt(t[1],10)-1;
var day = parseInt(t[2],10);
var date = new Date(Date.UTC(year,month,day));
val = Math.round(((date.getTime()) / 1000) / 86400) + 47117;
}
return val;
}

self._DeepSee_Component_searchBox_doSearch = function() {
this.updateInput();
var ctrl = this.findElement('search');
this.searchText = ctrl.value;
for (var n = 0; n < this.listOfValues.length; n++) {
this.priorValues.push(this.listOfValues[n]);
this.priorText.push(this.listOfText[n]);
}
this.loadDropdown(ctrl.value,true);
}

self._DeepSee_Component_searchBox_findDisplayValue = function(value) {
if ('' === value) {
return '';
}
var text = value;
if ((null!=zenPage._sourceControl)&&('undefined'!=typeof zenPage._sourceControl.text)) {
text = zenPage._sourceControl.text;
}
return text;
}

self._DeepSee_Component_searchBox_inputKeyHandler = function(evt) {
evt = evt ? evt : window.event;
var idx = parseInt(this.selectedIndex,10);
if (this.isDropdownVisible) {
switch(evt.keyCode) {
case zenESC:
if (evt.preventDefault) {
evt.preventDefault();
}
this.cancelChanges();
return false;
case zenENTER:
if (this.keyMode) {
this.clearTimer();
this.keyMode = true;
this.showDropdown();
}
else {
this.applyChange();
}
return false;
default:
this.keyMode = true;
break;
}
}
else {
switch(evt.keyCode) {
case zenESC:
if (zenPage.modalStack.length>0) {
this.cancelChanges();
}
return false;
case zenDOWN:
case zenENTER:
this.clearTimer();
this.keyMode = true;
this.showDropdown();
return false;
default:
this.startTimer();
this.useSearch = true;
break;
}
}
return zenInvokeCallbackMethod(this.onkeydown,this,'onkeydown');
}

self._DeepSee_Component_searchBox_isAnyItemSelected = function() {
var any = false;
if (this.priorValues.length>0) {
any = true;
}
else {
for (n=1;;n++) {
var cb = this.findElement('cb_'+n);
if (!cb) break;
if (cb.checked) {
any = true;
break;
}
}
}
return any;
}

self._DeepSee_Component_searchBox_itemClick = function(evt,idx,iscb) {
evt = evt ? evt : window.event;
isall = false;
var removeItem = false; // + WAL181
var ctrlAll = this.findElement('cball');
var ctrlNOT = this.findElement('cbNOT');
var wasRange = false;
if (''==idx) {
var ctrl = ctrlAll;
isall = true;
this.selectMode = '';
if (ctrlNOT) {
ctrlNOT.checked = false;
}
var ctrlRange = this.findElement('cbRange');
if (ctrlRange) {
wasRange = ctrlRange.checked;
ctrlRange.checked = false;
}
}
else {
var ctrl = this.findElement('cb_'+idx);
if ((ctrl.checked == false) && ('calendar' != this.displayMode) && ('range' != this.selectMode) && (iscb)) { // WAL214 -- only set flag if checkbox
removeItem = true;
}
}
if (!iscb && ctrl) {
ctrl.checked = !ctrl.checked;
}
if ('calendar' == this.displayMode) {
var cal = zenPage.getComponentById('cal');
cal.setValue('');
this.dateChange(cal,false);
if (''==idx) {
if (ctrlAll) {
ctrlAll.checked = true;
}
this.resetItems();
}
else {
if (ctrlNOT) {
ctrlNOT.checked = false;
this.selectMode = '';
}
if (ctrlAll) {
ctrlAll.checked = false;
}
this.resetItems(idx);
}
this.updateInput();
if (wasRange) {
this.renderDropdown();
}
return;
}
var multi = iscb;
if (ctrl && ctrl.checked && isall) {
this.resetItems();
}
else if (ctrl && ctrl.checked && !isall) {
if (ctrlAll) {		// DTB140 - this may not have been added
ctrlAll.checked = false;
}
if (!this.multiSelect || (!evt.ctrlKey && !multi)) {
this.resetItems(idx);
}
}
else if (ctrl && !ctrl.checked) {
var any = this.isAnyItemSelected();
if (!any) {
if (ctrlAll) {		// DTB140 - this may not have been added
ctrlAll.checked = true;
}
if (ctrlNOT) {
ctrlNOT.checked = false;
}
}
}
this.updateInput();
if (removeItem) {
this.removeItem(idx);
}
}

self._DeepSee_Component_searchBox_loadDropdown = function(value,show) {
try {
zenFireEvent(this.index, this.onshowdropdown, 'onshowdropdown');
var actualValue = this.value;
value = (null == value) ? '' : value.toString();
var hlpApply = $$$Text("Use new values for this filter","%DeepSee")
var hlpCancel = $$$Text("Do not change this filter value","%DeepSee")
if (('calendar' != this.displayMode)&&('measure' != this.displayMode)) {
value = this.searchText;
if (this.searchKeyLen >= 0) {
value = ('string'==typeof value) ? value.substr(0,this.searchKeyLen) : value;
}
}
else {
value = actualValue;
}
this.dataLoaded = false;
this.lastValue = value;
var needToLoad = true;
var rangeSelect = this.selectMode == 'range';
if (show) {
zenPage.lastModalIndex = this.index;
var div = this.getDropDownDiv();
if ('calendar' != this.displayMode) {
div.innerHTML = '<span class="comboboxLoading">' + this.loadingMessage + '</span>';
}
else {
needToLoad = false;
div.innerHTML = '<span class="comboboxLoading">' + this.loadingMessage + '</span>';
var v1 = '';
var v2 = '';
var nowInfo1 = {};
var nowInfo2 = {};
var cal = zenPage.createComponent('calendar');
cal.setProperty('id','cal');
cal.setProperty('startYear',1900);
cal.setProperty('firstDayOfWeek',this.firstDayOfWeek);		// DTB246
if (rangeSelect) {
cal.setProperty('onchange','zenPage.getComponent('+this.index+').dateRangeChange(1);');
cal.setProperty('multiSelect',false);
cal.setProperty('rangeSelect',false);
}
else {
cal.setProperty('onchange','zenPage.getComponent('+this.index+').dateChange(zenThis,true);');
cal.setProperty('multiSelect',true);
cal.setProperty('rangeSelect',true);
}
if (rangeSelect) {
var cal2 = zenPage.createComponent('calendar');
cal2.setProperty('id','cal2');
cal2.setProperty('startYear',1900);
cal2.setProperty('onchange','zenPage.getComponent('+this.index+').dateRangeChange(2);');
cal2.setProperty('multiSelect',false);
cal2.setProperty('rangeSelect',false);
}
if (rangeSelect) {
if (''!=actualValue) {
var t = actualValue.toString().split(']:&[');
if (t.length < 2) {
v1 = t[0].substring(2,t[0].length-1);
v2 = '';
}
else {
v1 = t[0].substring(2);
v2 = t[1].substring(0,t[1].length-1);
}
cal.setValue(this.dateFromHorolog(v1,nowInfo1));
cal2.setValue(this.dateFromHorolog(v2,nowInfo2));
}
else {
cal.setValue('');
cal2.setValue('');
}
}
else {
if (''!==value) {
if ('%NOT ' == value.substring(0,5)) {
this.selectMode = 'not';
value = value.substring(5);
}
var isRange = false;
cal.listOfValues.length = 0;
var vlist;
if (value.charAt(0)=='{') {
value = value.substring(1,value.length-1);
vlist = value.split(',');
}
else if (value.split(':').length == 2) {
isRange = true;
vlist = value.split(':');
}
else {
vlist = [value];
}
for (var n = 0; n < vlist.length; n++) {
var v = vlist[n].toString();
v = v==''?'':v.substring(2,v.length-1);
value = this.dateFromHorolog(v);
cal.listOfValues[cal.listOfValues.length] = value;
if (n==0) {
value = ('string' == typeof value) ? value : '';
cal.setProperty('value',value);
}
}
cal.isRange = isRange;
this.dateChange(cal,true);
}
else {
cal.isRange = false;
cal.setProperty('value','');
this.dateChange(cal,true);
}
}
var html = new Array();
html[html.length] = '<table class="searchBoxHeader" cellpadding="0" border="0"><tr>';
html[html.length] = '<td width="99%" nowrap="1">&#160;</td>';
html[html.length] = '<td><img title="'+hlpApply+'" class="dsptIcon" src="'+this.iconApply+'" onclick="zenPage.getComponent('+this.index+').applyCalendar();" /></td>';
html[html.length] = '<td><img title="'+hlpCancel+'" class="dsptIcon" src="'+this.iconCancel+'" onclick="zenPage.getComponent('+this.index+').cancelChanges();"/></td>';
html[html.length] = '</tr></table>';
/* place all and not options above calendar */
var selAll = (""==actualValue)&&(""==this.selectMode) ? 'checked="1"' : '';
var selNOT = ("not"==this.selectMode) ? 'checked="1"' : '';
var selRange = ("range"==this.selectMode) ? 'checked="1"' : '';
var selNow1 = (nowInfo1.now) ? 'checked="1"' : '';
var selNow2 = (nowInfo2.now) ? 'checked="1"' : '';
var disNow1 = (!selNow1) ? 'disabled="disabled"' : '';
var disNow2 = (!selNow2) ? 'disabled="disabled"' : '';
var msgAll = $$$Text("All","%DeepSee")
var msgValRequired = $$$Text("Required","%DeepSee")
var msgNOT = $$$Text("Exclude","%DeepSee")
var msgRange = $$$Text("Range","%DeepSee")
var hlpAll = $$$Text("Show all members within this category","%DeepSee")
var hlpValRequired = $$$Text("At least one member must be selected in this category","%DeepSee")
var hlpNOT = $$$Text("Exclude the selected items","%DeepSee")
var hlpRange = $$$Text("Show everything that is between the start and end values","%DeepSee")
html[html.length] = '<table class="searchBoxTable" width="100%" border="0" cellspacing="0"><tr class="searchBoxItemBar">';
if (!this.valueRequired) {
html[html.length] = '<td align="left" nowrap="1">';
html[html.length] = '<input type="checkbox" '+selAll+' id="'+this.makeId('cball')+'" onclick="zenPage.getComponent('+this.index+').itemClick(event,\'\',true);"/>';
html[html.length] = '<span onclick="zenPage.getComponent('+this.index+').itemClick(event,\'\',false);" title="'+hlpAll+'">';
html[html.length] = msgAll;
html[html.length] = '</span>';
}
else {
html[html.length] = '<td align="left" nowrap="1">';
html[html.length] = '<span onclick="zenPage.getComponent('+this.index+').itemClick(event,\'\',false);" title="'+hlpValRequired+'">';
html[html.length] = msgValRequired;
html[html.length] = '</span>';
}
html[html.length] = '</td>';
html[html.length] = '<td align="right" nowrap="1">';
html[html.length] = '<input type="checkbox" '+selNOT+' id="'+this.makeId('cbNOT')+'" onclick="zenPage.getComponent('+this.index+').notClick(true);"/>';
html[html.length] = '<span onclick="zenPage.getComponent('+this.index+').notClick(false);" title="'+hlpNOT+'">';
html[html.length] = msgNOT;
html[html.length] = '</span></td>';
html[html.length] = '<td align="right" nowrap="1">';
html[html.length] = '<input type="checkbox" '+selRange+' id="'+this.makeId('cbRange')+'" onclick="zenPage.getComponent('+this.index+').rangeClick(true);"/>';
html[html.length] = '<span onclick="zenPage.getComponent('+this.index+').rangeClick(false);" title="'+hlpRange+'">';
html[html.length] = msgRange;
html[html.length] = '</span></td>';
if (rangeSelect) {
html[html.length] = '<td width="90%">&#160;</td>';
}
html[html.length] = '</tr></table>';
if (!rangeSelect) {
html[html.length] = '<table style="background:#F0F0F0;" class="searchBoxTable" cellpadding="0" border="0" cellspacing="0">';
for (var n = 0; n < this.listOfCMbrValues.length; n++) {
var cls = (n%2) ? 'Even':'Odd';
var clr = (n%2) ? 'white':'';
var val = this.listOfCMbrValues[n];
var txt = this.listOfCMbrText[n];
var sel = (val == actualValue);
html[html.length] = '<tr id="'+this.makeId('item_'+(n+1))+'" zenValue="'+zenEscapeXML(val)+'" zenText="'+zenEscapeXML(txt)+'" class="searchBoxItem'+cls+'"><td>';
html[html.length] = '<input '+(sel?'checked="true" ':'')+'id="'+this.makeId('cb_'+(n+1))+'" type="checkbox" onclick="zenPage.getComponent('+this.index+').itemClick(event,'+(n+1)+',true);" />';
html[html.length] = '</td><td nowrap="1" width="99%" onclick="zenPage.getComponent('+this.index+').itemClick(event,'+(n+1)+',false);">'+zenEscapeXML(txt) + '</td></tr>';
}
html[html.length] = '</table>';
}
if (rangeSelect) {
html[html.length] = '<table style=""><tr><td><span style="font-size:8pt;color:#606060;">'+$$$Text('From')+'</span>';
}
var divid = ('' == cal.id) ? 'zen'+cal.index : cal.id;
html[html.length] = '<div id="'+divid+'" style="background:#F0F0F0;"></div>';
if (rangeSelect) {
html[html.length] = '<input id="cbNow1" '+selNow1+' type="checkbox" onclick="zenPage.getComponent('+this.index+').cbNowClick(true,1);"/><span onclick="zenPage.getComponent('+this.index+').cbNowClick(false,1);" style="font-size:10pt;color:#404040;padding:2px;">'+$$$Text('NOW')+'</span>';
html[html.length] = '&#160;<input id="offsetNow1" '+disNow1+' value="'+zenGet(nowInfo1.offset)+'" type="input" placeHolder="&#177;'+$$$Text('days')+'" size="3" onchange="zenPage.getComponent('+this.index+').offsetNowChange(1);" />';
html[html.length] = '</td><td><span style="font-size:8pt;color:#606060;">'+$$$Text('To')+'</span>';
var divid2 = ('' == cal2.id) ? 'zen'+cal2.index : cal2.id;
html[html.length] = '<div id="'+divid2+'" style="background:#F0F0F0;"></div>';
html[html.length] = '<input id="cbNow2" '+selNow2+' type="checkbox" onclick="zenPage.getComponent('+this.index+').cbNowClick(true,2);"/><span onclick="zenPage.getComponent('+this.index+').cbNowClick(false,2);" style="font-size:10pt;color:#404040;padding:2px;">'+$$$Text('NOW')+'</span>';
html[html.length] = '&#160;<input id="offsetNow2" '+disNow2+' value="'+zenGet(nowInfo2.offset)+'" type="input" placeHolder="&#177;'+$$$Text('days')+'" size="3" onchange="zenPage.getComponent('+this.index+').offsetNowChange(2);" />';
html[html.length] = '</td></tr></table>';
}
div.innerHTML = html.join('');
cal.renderContents();
if (rangeSelect) {
cal2.renderContents();
}
var calDiv = cal.getEnclosingDiv();
div.style.overflow = 'hidden';
var cw = 222 * (rangeSelect?2.1:1);
div.style.width = cw+'px';
div.style.height = 'auto';
div.style.boxShadow = '5px 5px 5px #808080';
if (cal && nowInfo1.now) {
cal.setDisabled(true);
}
if (cal2 && nowInfo2.now) {
cal2.setDisabled(true);
}
}
zenPage.correctIELayering(this.getDropDownDiv());
}
if (needToLoad) {
this.LoadDropDownContents(value,show?0:1);
}
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in loadDropdown');
}
}

self._DeepSee_Component_searchBox_msrAllClick = function(evt,iscb) {
evt = evt ? evt : window.event;
isall = false;
var ctrlAll = this.findElement('cball');
if (!iscb) {
ctrlAll.checked = !ctrlAll.checked;
}
if (ctrlAll.checked) {
var ctrlOp = this.findElement('msrOp');
var ctrlParm = this.findElement('msrParm');
ctrlOp.value = '';
ctrlParm.value = '';
}
}

self._DeepSee_Component_searchBox_msrChange = function() {
var ctrlAll = this.findElement('cball');
var ctrlOp = this.findElement('msrOp');
var ctrlParm = this.findElement('msrParm');
ctrlAll.checked = (ctrlOp.value=='')||(ctrlParm.value=='');
}

self._DeepSee_Component_searchBox_msrKeyPress = function(evt) {
evt = evt ? evt : window.event;
switch(evt.keyCode) {
case zenESC:
if (evt.preventDefault) {
evt.preventDefault();
}
this.cancelChanges();
return false;
case zenENTER:
this.applyMeasure();
break;
}
return true;
}

self._DeepSee_Component_searchBox_notClick = function(iscb) {
var ctrlAll = this.findElement('cball');
var ctrlNOT = this.findElement('cbNOT');
var ctrlRange = this.findElement('cbRange');
var wasRange = false;
if (!iscb) {
ctrlNOT.checked = !ctrlNOT.checked;
}
if (ctrlNOT.checked) {
this.selectMode = 'not';
if (ctrlAll) {		// DTB140 - this may not have been added
ctrlAll.checked = false;
}
if (ctrlRange) {
wasRange = ctrlRange.checked;
ctrlRange.checked = false;
}
}
else {
this.itemClick('','',false);
}
if ('calendar' == this.displayMode) {
if (this.isAnyItemSelected()) {
ctrlNOT.checked = false;
this.selectMode = '';
}
var cal = zenPage.getComponentById('cal');
this.dateChange(cal,false);
if (wasRange) {
this.renderDropdown();
}
}
this.updateInput();
}

self._DeepSee_Component_searchBox_offsetNowChange = function(which) {
if (this.selectType=='day') {
this.dateRangeChange(which);
}
else {
this.rangeChange(which);
}
}

self._DeepSee_Component_searchBox_onEndModalHandler = function(zindex) {
if (!this._applied) {
this.cancelChanges(false);
}
this.invokeSuper('onEndModalHandler',arguments);
}

self._DeepSee_Component_searchBox_rangeChange = function(which) {
var ctrlR1 = this.findElement('range1');
var ctrlR2 = this.findElement('range2');
var offset1 = self.document.getElementById('offsetNow1');
var offset2 = self.document.getElementById('offsetNow2');
if (offset1) {
offset1.disabled=('&[NOW]'!=ctrlR1.value);
}
if (offset2) {
offset2.disabled=('&[NOW]'!=ctrlR2.value);
}
if (ctrlR1&&ctrlR2&&false) {
if (('&[NOW]'!=ctrlR1.value) && ('&[NOW]'!=ctrlR2.value)) {
if (which==1) {
if (ctrlR1.selectedIndex>ctrlR2.selectedIndex) {
ctrlR2.selectedIndex = ctrlR1.selectedIndex;
}
}
else {
if (ctrlR1.selectedIndex>ctrlR2.selectedIndex) {
ctrlR1.selectedIndex = ctrlR2.selectedIndex;
}
}
}
}
this.updateInput();
}

self._DeepSee_Component_searchBox_rangeClick = function(iscb) {
var ctrlAll = this.findElement('cball');
var ctrlNOT = this.findElement('cbNOT');
var ctrlRange = this.findElement('cbRange');
if (!iscb) {
ctrlRange.checked = !ctrlRange.checked;
}
if (ctrlRange.checked) {
this.selectMode = 'range';
if (ctrlAll) {
ctrlAll.checked = false;
}
if (ctrlNOT) {
ctrlNOT.checked = false;
}
}
else {
this.itemClick('','',false);
}
this.renderDropdown();
}

self._DeepSee_Component_searchBox_rememberValues = function() {
this._value = this.value;
this._text = this.text;
this._listOfValues = this.listOfValues.slice(0);
this._listOfText = this.listOfText.slice(0);
}

self._DeepSee_Component_searchBox_removeItem = function(idx) {
var removeValue = '';
var cb = this.findElement('cb_'+idx);
if (!cb) return;
var tr = this.findElement('item_'+idx);
if (tr) {
removeValue = tr.getAttribute('zenValue');
}
for (var n = 0; n < this.listOfValues.length; n++) {
if (this.listOfValues[n]==removeValue) {
this.listOfValues.splice(n,1);
this.listOfText.splice(n,1);
}
}
for (var n = 0; n < this.priorValues.length; n++) {
if (this.priorValues[n]==removeValue) {
this.priorValues.splice(n,1);
this.priorText.splice(n,1);
}
}
this.text = this.listOfText[0] ? zenEscapeXML(this.listOfText[0]) : '';
this.value = this.listOfValues.join(',');
if (this.listOfValues.length>1) {
this.value = '{' + this.value + '}';
this.text = zenEscapeXML(this.listOfText.join('+ '));
}
if (this.selectMode=='not' && '' != this.value) {
this.value = '%NOT ' + this.value;
this.text = 'NOT&#160;' + this.text;
}
this.title = this.text;
var hidden = this.findElement('hidden');
hidden.value = this.value;
var td = this.findElement('input');
if (td) {
td.innerHTML = this.text + '&#160;';
}
this.updateTooltip();
}

self._DeepSee_Component_searchBox_renderDropdown = function() {
this.searchText = '';
this.rememberValues();
this.priorValues.length = 0;
this.priorText.length = 0;
var value = '';
this.loadDropdown(value,true);
}

self._DeepSee_Component_searchBox_resetItems = function(skip) {
skip = ('undefined' == typeof skip) ? -1 : skip;
for (n=1;;n++) {
var cb = this.findElement('cb_'+n);
if (!cb) break;
if (skip==-1 || n!=skip) {
cb.checked = false;
}
}
if (skip==-1) {
this.priorValues.length = 0;
this.priorText.length = 0;
}
}

self._DeepSee_Component_searchBox_resolveNowOffset = function(offset,type) {
offset = Number(offset);		// Supports offset coming in as a string, eg: '+5'
var val = '';
date = new Date();
if ('gregorian'==this.calendar) {		// DTB181 - Each calendar must be processed differently
if ('day'==type) {
var dateODBC = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
var offsetDateHoro = this.dateToHorolog(dateODBC) + offset;
val = zenFormatDate(this.dateFromHorolog(offsetDateHoro),this.dateFormat);
}
else if ('month'==type) {
var monthNumber = date.getFullYear()*12 + date.getMonth() + 1 + offset;
var offsetYear = Math.floor(monthNumber/12);
var offsetMonth = monthNumber%12;
if (''!=this.dateFormat) {
val = zenFormatDate(offsetYear + '-' + offsetMonth,this.dateFormat);
}
else {
val = zenFormatDate(offsetYear + '-' + offsetMonth,'mmm-y');
}
}
else if ('year'==type) {
val = date.getFullYear() + offset;
}
}
if (''==val) {
val = $$$Text('NOW') + (offset>0 ? ('+'+offset) : (offset<0 ? offset : '') )  ;		// DTB181 - Do not add anything if offset is 0
}
return val;
}

self._DeepSee_Component_searchBox_searchKeyPress = function(evt) {
evt = evt ? evt : event;
var ctrl = this.findElement('search');
if (ctrl.style.color != '') {
ctrl.style.color = '';
ctrl.value = '';
}
switch(evt.keyCode) {
case zenENTER:
this.doSearch();
break;
case zenESC:
this.cancelChanges();
break;
}
return true;
}

self._DeepSee_Component_searchBox_selectCustomItem = function(text,val) {
this.listOfValues.length = 0;
this.listOfText.length = 0;
this.value = val;
this.text = text;
var td = this.findElement('input');
if (td) {
td.innerHTML = this.text + '&#160;';
td.title = this.text;
}
var hidden = this.findElement('hidden');
hidden.value = this.value;
this.onchangeHandler();
this._applied = true;
zenPage.endModal();
}

self._DeepSee_Component_searchBox_setTextValue = function(text) {
this.text = text;
var td = this.findElement('input');
if (td) {
td.innerHTML = this.text + '&#160;';
td.title = this.text;
}
}

self._DeepSee_Component_searchBox_updateInput = function() {
this.listOfValues.length = 0;
this.listOfText.length = 0;
if ('range' == this.selectMode) {
this.value = '';
this.text = '';
this.title = '';
var ctrlR1 = this.findElement('range1');
var ctrlR2 = this.findElement('range2');
var offset1 = self.document.getElementById('offsetNow1');
var offset2 = self.document.getElementById('offsetNow2')
var usesOffset = false;
var nowOffset1 = '';
var nowOffset2 = '';
if (offset1) {
usesOffset = true;
offset1.value = (!offset1.value||isNaN(parseInt(offset1.value,10))) ? '' : parseInt(offset1.value,10);
offset1.value = offset1.value>0 ? ('+'+offset1.value) : offset1.value;
offset1.value = offset1.value==0 ? '' : offset1.value;
nowOffset1 = offset1.value;
}
if (offset2) {
usesOffset = true;
offset2.value = (!offset2.value||isNaN(parseInt(offset2.value,10))) ? '' : parseInt(offset2.value,10);
offset2.value = offset2.value>0 ? ('+'+offset2.value) : offset2.value;
offset2.value = offset2.value==0 ? '' : offset2.value;
nowOffset2 = offset2.value;
}
if ((usesOffset)&&(ctrlR1&&ctrlR2)) {
var format = this.dateFormat;
var c1text = !offset1.disabled ? this.resolveNowOffset(nowOffset1,this.selectType) : ctrlR1.options[ctrlR1.selectedIndex].text;
var c2text = !offset2.disabled ? this.resolveNowOffset(nowOffset2,this.selectType) : ctrlR2.options[ctrlR2.selectedIndex].text;
var c1value = !offset1.disabled ? ('&[NOW'+nowOffset1+']') : c1text=="" ? "" : ctrlR1.value;
var c2value = !offset2.disabled ? ('&[NOW'+nowOffset2+']') : c2text=="" ? "" : ctrlR2.value;
var c1title = !offset1.disabled ? ($$$Text('NOW')+nowOffset1) : ctrlR1.options[ctrlR1.selectedIndex].text;
var c2title = !offset2.disabled ? ($$$Text('NOW')+nowOffset2) : ctrlR2.options[ctrlR2.selectedIndex].text;
if (!offset1.disabled&&!offset2.disabled&&(nowOffset1==nowOffset2)) {
c2text = '';
c2value = '';
}
this.text = c1text + ((c1text!=''&&c2text!='')?':':'') + c2text;
this.value = c1value + ((c1value!=''&&c2value!='')?':':'') + c2value;
this.title = c1title + ((c1title!=''&&c2title!='')?':':'') + c2title;
}
else if (ctrlR1&&ctrlR2) {
this.text = ctrlR1.options[ctrlR1.selectedIndex].text +":"+ ctrlR2.options[ctrlR2.selectedIndex].text;
this.value = ctrlR1.value +":"+ ctrlR2.value;
this.title = this.text;
}
}
else if (('not'==this.selectMode)&&('calendar'==this.displayMode)) {
}
else {
this.value = '';
this.text = '';
this.title = '';
var ctrlAll = this.findElement('cball');
if (!ctrlAll || !ctrlAll.checked) {
for (n=1;;n++) {
var cb = this.findElement('cb_'+n);
if (!cb) break;
if (cb.checked) {
var tr = this.findElement('item_'+n);
if (tr) {
this.listOfValues[this.listOfValues.length] = tr.getAttribute('zenValue');
this.listOfText[this.listOfText.length] = tr.getAttribute('zenText');
}
}
}
var vlist = {};
for (var n = 0; n < this.listOfValues.length; n++) {
if (this.listOfValues[n]) {
vlist[this.listOfValues[n]] = true;
}
}
for (var n = 0; n < this.priorValues.length; n++) {
if ((this.priorValues[n])&&!vlist[this.priorValues[n]]&&this.multiSelect) {
this.listOfValues.push(this.priorValues[n]);
this.listOfText.push(this.priorText[n]);
vlist[this.priorValues[n]] = true;
}
}
this.text = this.listOfText[0] ? zenEscapeXML(this.listOfText[0]) : '';
this.value = this.listOfValues.join(',');
if (this.listOfValues.length>1) {
this.value = '{' + this.value + '}';
this.text = zenEscapeXML(this.listOfText.join('+ '));
}
if (this.selectMode=='not' && '' != this.value) {
this.value = '%NOT ' + this.value;
this.text = 'NOT&#160;' + this.text;
}
}
this.title = this.text;		// DTB121
}
var hidden = this.findElement('hidden');
hidden.value = this.value;
var td = this.findElement('input');
if (td) {
td.innerHTML = this.text + '&#160;';
}
this.updateTooltip();
}

self._DeepSee_Component_searchBox_updateTooltip = function() {
var input = this.findElement('input');		// DTB121 - use 'input' not 'search'!
if (input) {
if (''==this.title) {
input.title = this.text.replace(/&#160;/g,' ');		// DTB551 - Text might have an escaped space
}
else {
input.title = this.title;
}
}
}

self._DeepSee_Component_searchBox_LoadDropDownContents = function(searchParm,cached) {
	zenInstanceMethod(this,'LoadDropDownContents','L,B','',arguments);
}

self._DeepSee_Component_searchBox_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._DeepSee_Component_searchBox__Loader = function() {
	zenLoadClass('_ZEN_Component_abstractComboBox');
	_DeepSee_Component_searchBox.prototype = zenCreate('_ZEN_Component_abstractComboBox',-1);
	var p = _DeepSee_Component_searchBox.prototype;
	if (null==p) {return;}
	p.constructor = _DeepSee_Component_searchBox;
	p.superClass = ('undefined' == typeof _ZEN_Component_abstractComboBox) ? zenMaster._ZEN_Component_abstractComboBox.prototype:_ZEN_Component_abstractComboBox.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%DeepSee.Component.searchBox';
	p._type = 'searchBox';
	p.serialize = _DeepSee_Component_searchBox_serialize;
	p.getSettings = _DeepSee_Component_searchBox_getSettings;
	p.LoadDropDownContents = _DeepSee_Component_searchBox_LoadDropDownContents;
	p.ReallyRefreshContents = _DeepSee_Component_searchBox_ReallyRefreshContents;
	p.adjustDropDownWidth = _DeepSee_Component_searchBox_adjustDropDownWidth;
	p.adjustDropdownPosition = _DeepSee_Component_searchBox_adjustDropdownPosition;
	p.applyCalendar = _DeepSee_Component_searchBox_applyCalendar;
	p.applyChange = _DeepSee_Component_searchBox_applyChange;
	p.applyMeasure = _DeepSee_Component_searchBox_applyMeasure;
	p.cancelChanges = _DeepSee_Component_searchBox_cancelChanges;
	p.cbNowClick = _DeepSee_Component_searchBox_cbNowClick;
	p.dateChange = _DeepSee_Component_searchBox_dateChange;
	p.dateFromHorolog = _DeepSee_Component_searchBox_dateFromHorolog;
	p.dateRangeChange = _DeepSee_Component_searchBox_dateRangeChange;
	p.dateToHorolog = _DeepSee_Component_searchBox_dateToHorolog;
	p.doSearch = _DeepSee_Component_searchBox_doSearch;
	p.findDisplayValue = _DeepSee_Component_searchBox_findDisplayValue;
	p.inputKeyHandler = _DeepSee_Component_searchBox_inputKeyHandler;
	p.isAnyItemSelected = _DeepSee_Component_searchBox_isAnyItemSelected;
	p.itemClick = _DeepSee_Component_searchBox_itemClick;
	p.loadDropdown = _DeepSee_Component_searchBox_loadDropdown;
	p.msrAllClick = _DeepSee_Component_searchBox_msrAllClick;
	p.msrChange = _DeepSee_Component_searchBox_msrChange;
	p.msrKeyPress = _DeepSee_Component_searchBox_msrKeyPress;
	p.notClick = _DeepSee_Component_searchBox_notClick;
	p.offsetNowChange = _DeepSee_Component_searchBox_offsetNowChange;
	p.onEndModalHandler = _DeepSee_Component_searchBox_onEndModalHandler;
	p.rangeChange = _DeepSee_Component_searchBox_rangeChange;
	p.rangeClick = _DeepSee_Component_searchBox_rangeClick;
	p.rememberValues = _DeepSee_Component_searchBox_rememberValues;
	p.removeItem = _DeepSee_Component_searchBox_removeItem;
	p.renderDropdown = _DeepSee_Component_searchBox_renderDropdown;
	p.resetItems = _DeepSee_Component_searchBox_resetItems;
	p.resolveNowOffset = _DeepSee_Component_searchBox_resolveNowOffset;
	p.searchKeyPress = _DeepSee_Component_searchBox_searchKeyPress;
	p.selectCustomItem = _DeepSee_Component_searchBox_selectCustomItem;
	p.setTextValue = _DeepSee_Component_searchBox_setTextValue;
	p.updateInput = _DeepSee_Component_searchBox_updateInput;
	p.updateTooltip = _DeepSee_Component_searchBox_updateTooltip;
}
/* EOF */