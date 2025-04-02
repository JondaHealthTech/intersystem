/*** Zen Module: ZEN_Auxiliary ***/

self._zenClassIdx['yAxis'] = '_ZEN_Auxiliary_axis';
self._ZEN_Auxiliary_axis = function(index,id) {
	if (index>=0) {_ZEN_Auxiliary_axis__init(this,index,id);}
}

self._ZEN_Auxiliary_axis__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_object__init) ?zenMaster._ZEN_Component_object__init(o,index,id):_ZEN_Component_object__init(o,index,id);
	o.axisType = '';
	o.baseValue = '';
	o.labelAngle = '0';
	o.labelPosition = '';
	o.labelStyle = '';
	o.labelUnits = '';
	o.majorGridLines = true;
	o.majorGridStyle = '';
	o.majorUnits = '';
	o.maxValue = '';
	o.minValue = '';
	o.minorGridLines = false;
	o.minorGridStyle = '';
	o.minorUnits = '';
	o.title = '';
}
function _ZEN_Auxiliary_axis_serialize(set,s)
{
	var o = this;s[0]='538833585';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.aux;s[7]=o.axisType;s[8]=o.baseValue;s[9]=o.labelAngle;s[10]=o.labelPosition;s[11]=o.labelStyle;s[12]=o.labelUnits;s[13]=(o.majorGridLines?1:0);s[14]=o.majorGridStyle;s[15]=o.majorUnits;s[16]=o.maxValue;s[17]=o.minValue;s[18]=(o.minorGridLines?1:0);s[19]=o.minorGridStyle;s[20]=o.minorUnits;s[21]=o.onupdate;s[22]=o.renderFlag;s[23]=o.title;s[24]=o.tuple;s[25]=(o.visible?1:0);
}
function _ZEN_Auxiliary_axis_getSettings(s)
{
	s['name'] = 'string';
	s['axisType'] = 'enum:percent';
	s['baseValue'] = 'float';
	s['labelAngle'] = 'float';
	s['labelPosition'] = 'enum:left,right,top,bottom';
	s['labelStyle'] = 'svgStyle';
	s['labelUnits'] = 'float';
	s['majorGridLines'] = 'boolean';
	s['majorGridStyle'] = 'svgStyle';
	s['majorUnits'] = 'float';
	s['maxValue'] = 'float';
	s['minValue'] = 'float';
	s['minorGridLines'] = 'boolean';
	s['minorGridStyle'] = 'svgStyle';
	s['minorUnits'] = 'float';
	s['title'] = 'caption';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Auxiliary_axis_setProperty = function(property,value,value2) {
var updateChart = false;
switch(property) {
case 'minValue':
case 'maxValue':
case 'baseValue':
case 'majorUnits':
case 'minorUnits':
case 'labelUnits':
case 'labelAngle':
this[property] = (value=='') ? '' : parseFloat(value);
updateChart = true;
break;
case 'majorGridLines':
case 'minorGridLines':
this[property] = value ? true : false;
updateChart = true;
break;
case 'labelStyle':
case 'majorGridStyle':
case 'minorGridStyle':
case 'title':
case 'labelPosition':
case 'axisType':
this[property] = value;
updateChart = true;
break;
default:
return this.invokeSuper('setProperty',arguments);
}
if (updateChart && !zenIsMissing(this.parent)) {
this.parent.unrender();
this.parent.render();
}
return true;
}
self._ZEN_Auxiliary_axis__Loader = function() {
	zenLoadClass('_ZEN_Component_object');
	_ZEN_Auxiliary_axis.prototype = zenCreate('_ZEN_Component_object',-1);
	var p = _ZEN_Auxiliary_axis.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Auxiliary_axis;
	p.superClass = ('undefined' == typeof _ZEN_Component_object) ? zenMaster._ZEN_Component_object.prototype:_ZEN_Component_object.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Auxiliary.axis';
	p._type = 'axis';
	p.serialize = _ZEN_Auxiliary_axis_serialize;
	p.getSettings = _ZEN_Auxiliary_axis_getSettings;
	p.setProperty = _ZEN_Auxiliary_axis_setProperty;
}

self._zenClassIdx['column'] = '_ZEN_Auxiliary_column';
self._ZEN_Auxiliary_column = function(index,id) {
	if (index>=0) {_ZEN_Auxiliary_column__init(this,index,id);}
}

self._ZEN_Auxiliary_column__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_object__init) ?zenMaster._ZEN_Component_object__init(o,index,id):_ZEN_Component_object__init(o,index,id);
	o.OnDrawCell = ''; // encrypted
	o.OnDrawFilter = ''; // encrypted
	o.actualColName = '';
	o.cellTitle = '';
	o.colExpression = ''; // encrypted
	o.colName = '';
	o.disableSort = false;
	o.filterEnum = '';
	o.filterEnumDisplay = '';
	o.filterLabel = '';
	o.filterOp = '';
	o.filterQuery = ''; // encrypted
	o.filterTitle = '';
	o.filterType = '';
	o.filterValue = '';
	o.header = '';
	o.hidden = false;
	o.link = '';
	o.linkCaption = '';
	o.linkConfirm = '';
	o.linkImage = '';
	o.maxDate = '';
	o.minDate = '';
	o.onclick = '';
	o.seed = '';
	o.style = '';
	o.title = '';
	o.width = '';
}
function _ZEN_Auxiliary_column_serialize(set,s)
{
	var o = this;s[0]='1695533048';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.OnDrawCell;s[7]=o.OnDrawFilter;s[8]=o.actualColName;s[9]=o.aux;s[10]=o.cellTitle;s[11]=o.colExpression;s[12]=o.colName;s[13]=(o.disableSort?1:0);s[14]=o.filterEnum;s[15]=o.filterEnumDisplay;s[16]=o.filterLabel;s[17]=o.filterOp;s[18]=o.filterQuery;s[19]=o.filterTitle;s[20]=o.filterType;s[21]=o.filterValue;s[22]=o.header;s[23]=(o.hidden?1:0);s[24]=o.link;s[25]=o.linkCaption;s[26]=o.linkConfirm;s[27]=o.linkImage;s[28]=o.maxDate;s[29]=o.minDate;s[30]=o.onclick;s[31]=o.onupdate;s[32]=o.renderFlag;s[33]=o.seed;s[34]=o.style;s[35]=o.title;s[36]=o.tuple;s[37]=(o.visible?1:0);s[38]=o.width;
}
function _ZEN_Auxiliary_column_getSettings(s)
{
	s['name'] = 'string';
	s['actualColName'] = 'string';
	s['cellTitle'] = 'caption';
	s['colExpression'] = 'string';
	s['colName'] = 'string';
	s['disableSort'] = 'boolean';
	s['filterEnum'] = 'csv';
	s['filterEnumDisplay'] = 'csv';
	s['filterLabel'] = 'caption';
	s['filterOp'] = 'enum:%STARTSWITH,=,>=,<=,<>,>,<,[,IN,BETWEEN,%CONTAINS,UP[';
	s['filterQuery'] = 'sql';
	s['filterTitle'] = 'caption';
	s['filterType'] = 'enum:text,date,datetime,enum,query,custom';
	s['filterValue'] = 'value';
	s['header'] = 'caption';
	s['hidden'] = 'boolean';
	s['link'] = 'uri';
	s['linkCaption'] = 'caption';
	s['linkConfirm'] = 'caption';
	s['linkImage'] = 'uri';
	s['maxDate'] = 'string';
	s['minDate'] = 'string';
	s['onclick'] = 'eventHandler';
	s['seed'] = 'string';
	s['style'] = 'style';
	s['title'] = 'caption';
	s['width'] = 'length';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Auxiliary_column_getColName = function() {
return (''==this.actualColName) ? this.colName : this.actualColName;
}
self._ZEN_Auxiliary_column__Loader = function() {
	zenLoadClass('_ZEN_Component_object');
	_ZEN_Auxiliary_column.prototype = zenCreate('_ZEN_Component_object',-1);
	var p = _ZEN_Auxiliary_column.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Auxiliary_column;
	p.superClass = ('undefined' == typeof _ZEN_Component_object) ? zenMaster._ZEN_Component_object.prototype:_ZEN_Component_object.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Auxiliary.column';
	p._type = 'column';
	p.serialize = _ZEN_Auxiliary_column_serialize;
	p.getSettings = _ZEN_Auxiliary_column_getSettings;
	p.getColName = _ZEN_Auxiliary_column_getColName;
}

self._zenClassIdx['condition'] = '_ZEN_Auxiliary_condition';
self._ZEN_Auxiliary_condition = function(index,id) {
	if (index>=0) {_ZEN_Auxiliary_condition__init(this,index,id);}
}

self._ZEN_Auxiliary_condition__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_object__init) ?zenMaster._ZEN_Component_object__init(o,index,id):_ZEN_Component_object__init(o,index,id);
	o.cellStyle = '';
	o.colName = '';
	o.predicate = 'EQ';
	o.rowStyle = '';
	o.targetCol = '';
	o.value = '';
}
function _ZEN_Auxiliary_condition_serialize(set,s)
{
	var o = this;s[0]='926988228';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.aux;s[7]=o.cellStyle;s[8]=o.colName;s[9]=o.onupdate;s[10]=o.predicate;s[11]=o.renderFlag;s[12]=o.rowStyle;s[13]=o.targetCol;s[14]=o.tuple;s[15]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[16]=(o.visible?1:0);
}
function _ZEN_Auxiliary_condition_getSettings(s)
{
	s['name'] = 'string';
	s['cellStyle'] = 'style';
	s['colName'] = 'string';
	s['predicate'] = 'enum:GT,EQ,LT,NEQ,GTEQ,LTEQ,EXTEQ,STARTSWITH,CONTAINS';
	s['rowStyle'] = 'style';
	s['targetCol'] = 'string';
	s['value'] = 'string';
	this.invokeSuper('getSettings',arguments);
}
self._ZEN_Auxiliary_condition__Loader = function() {
	zenLoadClass('_ZEN_Component_object');
	_ZEN_Auxiliary_condition.prototype = zenCreate('_ZEN_Component_object',-1);
	var p = _ZEN_Auxiliary_condition.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Auxiliary_condition;
	p.superClass = ('undefined' == typeof _ZEN_Component_object) ? zenMaster._ZEN_Component_object.prototype:_ZEN_Component_object.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Auxiliary.condition';
	p._type = 'condition';
	p.serialize = _ZEN_Auxiliary_condition_serialize;
	p.getSettings = _ZEN_Auxiliary_condition_getSettings;
}

self._zenClassIdx['dataBag'] = '_ZEN_Auxiliary_dataBag';
self._ZEN_Auxiliary_dataBag = function(index,id) {
	if (index>=0) {_ZEN_Auxiliary_dataBag__init(this,index,id);}
}

self._ZEN_Auxiliary_dataBag__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_object__init) ?zenMaster._ZEN_Component_object__init(o,index,id):_ZEN_Component_object__init(o,index,id);
	o.clientData = new Array();
	o.labelList = '';
	o.propertyList = '';
	o.propertyTypes = '';
	o.seriesCount = '1';
	o.seriesNames = '';
}
function _ZEN_Auxiliary_dataBag_serialize(set,s)
{
	var o = this;s[0]='3918096302';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.aux;s[7]=zenArrayToList(o.clientData,'\x05');s[8]=o.labelList;s[9]=o.onupdate;s[10]=o.propertyList;s[11]=o.propertyTypes;s[12]=o.renderFlag;s[13]=o.seriesCount;s[14]=o.seriesNames;s[15]=o.tuple;s[16]=(o.visible?1:0);
}
function _ZEN_Auxiliary_dataBag_getSettings(s)
{
	s['name'] = 'string';
	s['labelList'] = 'csv';
	s['propertyList'] = 'csv';
	s['propertyTypes'] = 'csv';
	s['seriesNames'] = 'csv';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Auxiliary_dataBag_clear = function() {
for (var n = 0; n < this.clientData.length; n++) {
this.clientData[n] = '';
}
}

self._ZEN_Auxiliary_dataBag_getDimSize = function(dim) {
switch(dim) {
case 1:
return this.getPropertyCount();
case 2:
return this.getSeriesCount();
}
return 0;
}

self._ZEN_Auxiliary_dataBag_getPropertyCount = function() {
return ((this.clientData) && (this.seriesCount != 0)) ? (Math.floor(this.clientData.length / this.seriesCount)) : 0;
}

self._ZEN_Auxiliary_dataBag_getPropertyIndex = function(property) {
if (''==this.propertyList || ''==property) { return -1; }
if (null == this._propertyIndex) {
this._propertyIndex = new Object();
var props = this.propertyList.split(',');
for (var n=0; n < props.length; n++) {
this._propertyIndex[props[n].split(':')[0]] = n;
}
}
return this._propertyIndex[property];
}

self._ZEN_Auxiliary_dataBag_getPropertyLabel = function(n) {
if ('' == this.labelList) { return ''; }
var labels = this.labelList.split(',');
var lbl = (null == labels[n]) ? '' : labels[n].split(':')[0];
return ('' == lbl) ? this.getPropertyName(n) : lbl;
}

self._ZEN_Auxiliary_dataBag_getPropertyName = function(n) {
if (''==this.propertyList) { return ''; }
var props = this.propertyList.split(',');
return (null == props[n]) ? '' : props[n].split(':')[0];
}

self._ZEN_Auxiliary_dataBag_getPropertyType = function(n) {
if ('' == this.propertyTypes) { return ''; }
var props = this.propertyTypes.split(',');
return (null == props[n]) ? '' : props[n].split(':')[0];
}

self._ZEN_Auxiliary_dataBag_getSeriesCount = function() {
return this.seriesCount;
}

self._ZEN_Auxiliary_dataBag_getSeriesLabel = function(n) {
if ('' == this.seriesNames) { return ('Series ' + (n+1)); }
var labels = this.seriesNames.split(',');
var lbl = (null == labels[n]) ? '' : labels[n].split(':')[0];
return ('' == lbl) ? ('Series ' + (n+1)) : lbl;
}

self._ZEN_Auxiliary_dataBag_getValue = function(property,series) {
series = (null == series) ? 0 : series;
var data = null;
var index = this.getPropertyIndex(property);
if (index>=0) {
var idx = index + (series * this.getPropertyCount());
data = this.clientData[idx];
}
return data;
}

self._ZEN_Auxiliary_dataBag_getValueByPosition = function(n,series) {
series = (null == series) ? 0 : series;
var idx = n + (series * this.getPropertyCount());
return this.clientData[idx];
}

self._ZEN_Auxiliary_dataBag_getValuesAsArrays = function() {
var data = new Array(this.seriesCount);
var pc = this.getPropertyCount();
var idx = 0;
for (var i = 0; i < this.seriesCount; i++) {
data[i] = new Array(pc);
for (var j = 0; j < pc; j++) {
data[i][j] = this.clientData[idx++];
}
}
return data;
}

self._ZEN_Auxiliary_dataBag_getValuesAsObject = function(series) {
if (''==this.propertyList) { return null; }
var obj = new zenProxy();
var props = this.propertyList.split(',');
for (var n = 0; n < props.length; n++) {
if (props[n] && props[n]!='') {
var prop = props[n].split(':')[0];
obj[prop] = this.getValue(prop, series);
}
}
return obj;
}

self._ZEN_Auxiliary_dataBag_setProperty = function(property,value,value2) {
switch(property) {
case 'propertyList':
if (this._propertyIndex) {
delete this._propertyIndex;
}
this.propertyList = value;
break;
case 'propertyTypes':
this.propertyTypes = value;
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Auxiliary_dataBag_setValue = function(property,value,series) {
var index = this.getPropertyIndex(property);
if (index>=0) {
series = (null == series) ? 0 : series;
this.clientData[index + (series * this.getPropertyCount())] = value;
}
}

self._ZEN_Auxiliary_dataBag_setValueByPosition = function(value,n,series) {
if (n>=0) {
series = (null == series) ? 0 : series;
var idx = n + (series * this.getPropertyCount());
this.clientData[idx] = value;
}
}
self._ZEN_Auxiliary_dataBag__Loader = function() {
	zenLoadClass('_ZEN_Component_object');
	_ZEN_Auxiliary_dataBag.prototype = zenCreate('_ZEN_Component_object',-1);
	var p = _ZEN_Auxiliary_dataBag.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Auxiliary_dataBag;
	p.superClass = ('undefined' == typeof _ZEN_Component_object) ? zenMaster._ZEN_Component_object.prototype:_ZEN_Component_object.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Auxiliary.dataBag';
	p._type = 'dataBag';
	p.serialize = _ZEN_Auxiliary_dataBag_serialize;
	p.getSettings = _ZEN_Auxiliary_dataBag_getSettings;
	p.clear = _ZEN_Auxiliary_dataBag_clear;
	p.getDimSize = _ZEN_Auxiliary_dataBag_getDimSize;
	p.getPropertyCount = _ZEN_Auxiliary_dataBag_getPropertyCount;
	p.getPropertyIndex = _ZEN_Auxiliary_dataBag_getPropertyIndex;
	p.getPropertyLabel = _ZEN_Auxiliary_dataBag_getPropertyLabel;
	p.getPropertyName = _ZEN_Auxiliary_dataBag_getPropertyName;
	p.getPropertyType = _ZEN_Auxiliary_dataBag_getPropertyType;
	p.getSeriesCount = _ZEN_Auxiliary_dataBag_getSeriesCount;
	p.getSeriesLabel = _ZEN_Auxiliary_dataBag_getSeriesLabel;
	p.getValue = _ZEN_Auxiliary_dataBag_getValue;
	p.getValueByPosition = _ZEN_Auxiliary_dataBag_getValueByPosition;
	p.getValuesAsArrays = _ZEN_Auxiliary_dataBag_getValuesAsArrays;
	p.getValuesAsObject = _ZEN_Auxiliary_dataBag_getValuesAsObject;
	p.setProperty = _ZEN_Auxiliary_dataBag_setProperty;
	p.setValue = _ZEN_Auxiliary_dataBag_setValue;
	p.setValueByPosition = _ZEN_Auxiliary_dataBag_setValueByPosition;
}

self._zenClassIdx['dataSet'] = '_ZEN_Auxiliary_dataSet';
self._ZEN_Auxiliary_dataSet = function(index,id) {
	if (index>=0) {_ZEN_Auxiliary_dataSet__init(this,index,id);}
}

self._ZEN_Auxiliary_dataSet__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_object__init) ?zenMaster._ZEN_Component_object__init(o,index,id):_ZEN_Component_object__init(o,index,id);
	o.clientData = new Array();
	o.clientLabels = new Array();
	o.clientSize = new Array();
	o.dimensions = '0';
}
function _ZEN_Auxiliary_dataSet_serialize(set,s)
{
	var o = this;s[0]='3632646936';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.aux;s[7]=zenArrayToList(o.clientData,'\x05');s[8]=zenArrayToList(o.clientLabels,'\x05');s[9]=zenArrayToList(o.clientSize,'\x05');s[10]=o.dimensions;s[11]=o.onupdate;s[12]=o.renderFlag;s[13]=o.tuple;s[14]=(o.visible?1:0);
}
function _ZEN_Auxiliary_dataSet_getSettings(s)
{
	s['name'] = 'string';
	s['dimensions'] = 'integer';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Auxiliary_dataSet_clear = function() {
var cells;
switch (this.dimensions) {
case 0:
cells = 1;
break;
case 1:
cells = parseInt(this.clientSize[0],10);
break;
case 2:
cells = parseInt(this.clientSize[1],10) * parseInt(this.clientSize[0],10);
break;
case 3:
cells = parseInt(this.clientSize[2],10) * parseInt(this.clientSize[1],10) * parseInt(this.clientSize[0],10);
break;
}
for (var n = 0; n < this.clientData.length; n++) {
this.clientData[n] = '';
}
}

self._ZEN_Auxiliary_dataSet_getData = function(d1,d2,d3) {
var data = '';
switch(this.dimensions) {
case 0:
data = this.clientData[0];
break;
case 1:
var sz1 = parseInt(this.clientSize[0],10);
data = (d1<0||d1>=sz1||d2>0||d3>0)?'':this.clientData[d1];
break;
case 2:
var sz1 = parseInt(this.clientSize[0],10);
var sz2 = parseInt(this.clientSize[1],10);
data = (d1<0||d1>=sz1||d2<0||d2>=sz2||d3>0)?'':this.clientData[(d2*sz1)+d1];
break;
case 3:
var sz1 = parseInt(this.clientSize[0],10);
var sz2 = parseInt(this.clientSize[1],10);
var sz3 = parseInt(this.clientSize[2],10);
data = (d1<0||d1>=sz1||d2<0||d2>=sz2||d3<0||d3>=sz3)?'':this.clientData[(d3*sz2*sz1)+(d2*sz1)+d1];
break;
}
return (null == data) ? '' : data;
}

self._ZEN_Auxiliary_dataSet_getDimSize = function(dim) {
zenASSERT(dim>=1&&dim<=3,'dim must be between 1 and 3',arguments);
var sz = (null==this.clientSize[dim-1]) ? 1 : parseInt(this.clientSize[dim-1],10);
return (null == sz) ? 1 : sz;
}

self._ZEN_Auxiliary_dataSet_getDimensions = function() {
return this.dimensions;
}

self._ZEN_Auxiliary_dataSet_getLabel = function(n,dim) {
var label = '';
switch(dim) {
case 0:
label = this.clientLabels[0];
break;
case 1:
var sz1 = parseInt(this.clientSize[0],10);
label = (n<0||n>=sz1)?'':this.clientLabels[n];
break;
case 2:
var sz1 = parseInt(this.clientSize[0],10);
var sz2 = parseInt(this.clientSize[1],10);
label = (n<0||n>=sz2)?'':this.clientLabels[sz1+n];
break;
case 3:
var sz1 = parseInt(this.clientSize[0],10);
var sz2 = parseInt(this.clientSize[1],10);
var sz3 = parseInt(this.clientSize[2],10);
label = (n<0||n>=sz3)?'':this.clientLabels[sz2+sz1+n];
break;
}
return (null == label) ? '' : label;
}

self._ZEN_Auxiliary_dataSet_insert = function(dim,index) {
zenASSERT(dim>=1&&dim<=this.dimensions,'dim must be between 1 and the current number of dimensions',arguments);
var temp;
if (index >= this.getDimSize(dim)) {
return;
}
switch (dim) {
case 1:
this.redim(this.getDimensions(),this.getDimSize(1)+1,this.getDimSize(2),this.getDimSize(3));
break;
case 2:
this.redim(this.getDimensions(),this.getDimSize(1),this.getDimSize(2)+1,this.getDimSize(3));
break;
case 3:
this.redim(this.getDimensions(),this.getDimSize(1),this.getDimSize(2),this.getDimSize(3)+1);
break;
}
if (index<0) {
return;
}
for (var n = this.getDimSize(dim)-1; n > index; n--) {
this.setLabel(this.getLabel(n-1,dim),n,dim);
}
this.setLabel('',index,dim);
switch (this.dimensions) {
case 1:
for (var n = this.getDimSize(1)-1; n > index; n--) {
this.setData(this.getData(n-1),n);
}
break;
case 2:
switch (dim) {
case 1:
var size = this.getDimSize(2);
for (var k = 0; k < size; k++) {
for (var n = this.getDimSize(1)-1; n > index; n--) {
this.setData(this.getData(n-1,k),n,k);
}
this.setData('',index,k);
}
break;
case 2:
var size = this.getDimSize(1);
for (var k = 0; k < size; k++) {
for (var n = this.getDimSize(2)-1; n > index; n--) {
this.setData(this.getData(k,n-1),k,n);
}
this.setData('',k,index);
}
break;
}
break;
case 3:
switch (dim) {
case 1:
var pages = this.getDimSize(3);
var size = this.getDimSize(2);
for (var pg = 0; pg < pages; pg++) {
for (var k = 0; k < size; k++) {
for (var n = this.getDimSize(1)-1; n > index; n--) {
this.setData(this.getData(n-1,k,pg),n,k,pg);
}
this.setData('',index,k,pg);
}
}
break;
case 2:
var pages = this.getDimSize(3);
var size = this.getDimSize(1);
for (var pg = 0; pg < pages; pg++) {
for (var k = 0; k < size; k++) {
for (var n = this.getDimSize(2)-1; n > index; n--) {
this.setData(this.getData(k,n-1,pg),k,n,pg);
}
this.setData('',k,index,pg);
}
}
break;
case 3:
var pages = this.getDimSize(2);
var size = this.getDimSize(1);
for (var pg = 0; pg < pages; pg++) {
for (var k = 0; k < size; k++) {
for (var n = this.getDimSize(3)-1; n > index; n--) {
this.setData(this.getData(k,pg,n-1),k,pg,n);
}
this.setData('',k,pg,index);
}
}
break;
}
break;
}
}

self._ZEN_Auxiliary_dataSet_redim = function(dims,sz1,sz2,sz3) {
zenASSERT(dims>=0&&dims<=3,'dims is out of range',arguments);
sz1 = (null==sz1 || parseInt(sz1,10) < 1) ? 1 : parseInt(sz1,10);
sz2 = (null==sz2 || parseInt(sz2,10) < 1) ? 1 : parseInt(sz2,10);
sz3 = (null==sz3 || parseInt(sz3,10) < 1) ? 1 : parseInt(sz3,10);
var newData = new Array();
var newSize = new Array();
var newLabels = new Array();
switch (dims) {
case 0:
newData[0] = this.getData(1,1,1);
break;
case 1:
for (var d1=0; d1<sz1; d1++) {
newData[d1] = this.getData(d1);
}
newSize[0] = sz1;
break;
case 2:
for (var d2=0; d2<sz2; d2++) {
for (var d1=0; d1<sz1; d1++) {
newData[(d2*sz1)+d1] = this.getData(d1,d2);
}
}
newSize[0] = sz1;
newSize[1] = sz2;
break;
case 3:
for (var d3=0; d3<sz3; d3++) {
for (var d2=0; d2<sz2; d2++) {
for (var d1=0; d1<sz1; d1++) {
newData[(d3*sz2*sz1)+(d2*sz1)+d1] = this.getData(d1,d2,d3);
}
}
}
newSize[0] = sz1;
newSize[1] = sz2;
newSize[2] = sz3;
break;
}
var lbl = 0;
if (dims > 0) {
for (var n=0; n<sz1; n++) {
newLabels[lbl++] = this.getLabel(n,1);
}
}
if (dims > 1) {
for (var n=0; n<sz2; n++) {
newLabels[lbl++] = this.getLabel(n,2);
}
}
if (dims > 2) {
for (var n=0; n<sz3; n++) {
newLabels[lbl++] = this.getLabel(n,3);
}
}
this.dimensions = dims;
this.clientData = newData;
this.clientSize = newSize;
this.clientLabels = newLabels;
}

self._ZEN_Auxiliary_dataSet_remove = function(dim,index) {
zenASSERT(dim>=1&&dim<=this.dimensions,'dim must be between 1 and the current number of dimensions',arguments);
var temp;
if (index >= this.getDimSize(dim)) {
return;
}
if (index>=0) {
for (var n = index; n < this.getDimSize(dim)-1; n++) {
this.setLabel(this.getLabel(n+1,dim),n,dim);
}
switch (this.dimensions) {
case 1:
for (var n = index; n < this.getDimSize(1)-1; n++) {
this.setData(this.getData(n+1),n);
}
break;
case 2:
switch (dim) {
case 1:
var size = this.getDimSize(2);
for (var k = 0; k < size; k++) {
for (var n = index; n < this.getDimSize(1)-1; n++) {
this.setData(this.getData(n+1,k),n,k);
}
}
break;
case 2:
var size = this.getDimSize(1);
for (var k = 0; k < size; k++) {
for (var n = index; n < this.getDimSize(2)-1; n++) {
this.setData(this.getData(k,n+1),k,n);
}
}
break;
}
break;
case 3:
switch (dim) {
case 1:
var pages = this.getDimSize(3);
var size = this.getDimSize(2);
for (var pg = 0; pg < pages; pg++) {
for (var k = 0; k < size; k++) {
for (var n = index; n < this.getDimSize(1)-1; n++) {
this.setData(this.getData(n+1,k,pg),n,k,pg);
}
}
}
break;
case 2:
var pages = this.getDimSize(3);
var size = this.getDimSize(1);
for (var pg = 0; pg < pages; pg++) {
for (var k = 0; k < size; k++) {
for (var n = index; n < this.getDimSize(2)-1; n++) {
this.setData(this.getData(k,n+1,pg),k,n,pg);
}
}
}
break;
case 3:
var pages = this.getDimSize(2);
var size = this.getDimSize(1);
for (var pg = 0; pg < pages; pg++) {
for (var k = 0; k < size; k++) {
for (var n = index; n < this.getDimSize(3)-1; n++) {
this.setData(this.getData(k,pg,n+1),k,pg,n);
}
}
}
break;
}
break;
}
}
if (this.getDimSize(dim)>0) {
switch (dim) {
case 1:
this.redim(this.getDimensions(),this.getDimSize(1)-1,this.getDimSize(2),this.getDimSize(3));
break;
case 2:
this.redim(this.getDimensions(),this.getDimSize(1),this.getDimSize(2)-1,this.getDimSize(3));
break;
case 3:
this.redim(this.getDimensions(),this.getDimSize(1),this.getDimSize(2),this.getDimSize(3)-1);
break;
}
}
}

self._ZEN_Auxiliary_dataSet_setData = function(value,d1,d2,d3) {
var sz1 = parseInt(this.clientSize[0],10);
var sz2 = parseInt(this.clientSize[1],10);
var sz3 = parseInt(this.clientSize[2],10);
switch(this.dimensions) {
case 0:
this.clientData[0] = value;
break;
case 1:
if (d1>=0 && d1 < sz1) {
this.clientData[d1] = value;
}
break;
case 2:
if (d1>=0 && d1 < sz1 && d2>=0 && d2 < sz2) {
this.clientData[(d2*sz1)+d1] = value;
}
break;
case 3:
if (d1>=0 && d1 < sz1 && d2>=0 && d2 < sz2 && d3>=0 && d3 < sz3) {
this.clientData[(d3*sz2*sz1)+(d2*sz1)+d1] = value;
}
break;
}
}

self._ZEN_Auxiliary_dataSet_setLabel = function(label,n,dim) {
var sz1 = parseInt(this.clientSize[0],10);
var sz2 = parseInt(this.clientSize[1],10);
var sz3 = parseInt(this.clientSize[2],10);
switch(dim) {
case 0:
this.clientLabels[0] = label;
break;
case 1:
if (n>=0&&n<sz1) {
this.clientLabels[n] = label;
}
break;
case 2:
if (n>=0&&n<sz2) {
this.clientLabels[sz1+n] = label;
}
break;
case 3:
if (n>=0&&n<sz3) {
this.clientLabels[sz2+sz1+n] = label;
}
break;
}
return (null == label) ? '' : label;
}

self._ZEN_Auxiliary_dataSet_swap = function(dim,item1,item2,labels) {
zenASSERT(dim>=1&&dim<=this.dimensions,'dim must be between 1 and the current number of dimensions',arguments);
var temp;
if (item1 < 0 || item2 < 0 ||
item1 >= this.getDimSize(dim) || item2 >= this.getDimSize(dim)) {
return;
}
switch (this.dimensions) {
case 1:
temp = this.getData(item1);
this.setData(this.getData(item2),item1);
this.setData(temp,item2);
if (labels) {
temp = this.getLabel(item1,dim);
this.setLabel(this.getLabel(item2,dim),item1);
this.setLabel(temp,item2,dim);
}
break;
case 2:
switch (dim) {
case 1:
var size = this.getDimSize(2);
for (var n = 0; n < size; n++) {
temp = this.getData(item1,n);
this.setData(this.getData(item2,n),item1,n);
this.setData(temp,item2,n);
}
break;
case 2:
var size = this.getDimSize(1);
for (var n = 0; n < size; n++) {
temp = this.getData(n,item1);
this.setData(this.getData(n,item2),n,item1);
this.setData(temp,n,item2);
}
break;
}
if (labels) {
temp = this.getLabel(item1,dim);
this.setLabel(this.getLabel(item2,dim),item1,dim);
this.setLabel(temp,item2,dim);
}
break;
case 3:
switch (dim) {
case 1:
var pages = this.getDimSize(3);
var size = this.getDimSize(2);
for (var pg = 0; pg < pages; pg++) {
for (var n = 0; n < size; n++) {
temp = this.getData(item1,n,pg);
this.setData(this.getData(item2,n,pg),item1,n,pg);
this.setData(temp,item2,n,pg);
}
}
break;
case 2:
var pages = this.getDimSize(3);
var size = this.getDimSize(1);
for (var pg = 0; pg < pages; pg++) {
for (var n = 0; n < size; n++) {
temp = this.getData(n,item1,pg);
this.setData(this.getData(n,item2,pg),n,item1,pg);
this.setData(temp,n,item2,pg);
}
}
break;
case 3:
var pages = this.getDimSize(2);
var size = this.getDimSize(1);
for (var pg = 0; pg < pages; pg++) {
for (var n = 0; n < size; n++) {
temp = this.getData(n,pg,item1);
this.setData(this.getData(n,pg,item2),n,pg,item1);
this.setData(temp,n,pg,item2);
}
}
break;
}
if (labels) {
temp = this.getLabel(item1,dim);
this.setLabel(this.getLabel(item2,dim),item1,dim);
this.setLabel(temp,item2,dim);
}
break;
}
}
self._ZEN_Auxiliary_dataSet__Loader = function() {
	zenLoadClass('_ZEN_Component_object');
	_ZEN_Auxiliary_dataSet.prototype = zenCreate('_ZEN_Component_object',-1);
	var p = _ZEN_Auxiliary_dataSet.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Auxiliary_dataSet;
	p.superClass = ('undefined' == typeof _ZEN_Component_object) ? zenMaster._ZEN_Component_object.prototype:_ZEN_Component_object.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Auxiliary.dataSet';
	p._type = 'dataSet';
	p.serialize = _ZEN_Auxiliary_dataSet_serialize;
	p.getSettings = _ZEN_Auxiliary_dataSet_getSettings;
	p.clear = _ZEN_Auxiliary_dataSet_clear;
	p.getData = _ZEN_Auxiliary_dataSet_getData;
	p.getDimSize = _ZEN_Auxiliary_dataSet_getDimSize;
	p.getDimensions = _ZEN_Auxiliary_dataSet_getDimensions;
	p.getLabel = _ZEN_Auxiliary_dataSet_getLabel;
	p.insert = _ZEN_Auxiliary_dataSet_insert;
	p.redim = _ZEN_Auxiliary_dataSet_redim;
	p.remove = _ZEN_Auxiliary_dataSet_remove;
	p.setData = _ZEN_Auxiliary_dataSet_setData;
	p.setLabel = _ZEN_Auxiliary_dataSet_setLabel;
	p.swap = _ZEN_Auxiliary_dataSet_swap;
}

self._zenClassIdx['gridCell'] = '_ZEN_Auxiliary_gridCell';
self._ZEN_Auxiliary_gridCell = function(index,id) {
	if (index>=0) {_ZEN_Auxiliary_gridCell__init(this,index,id);}
}

self._ZEN_Auxiliary_gridCell__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_object__init) ?zenMaster._ZEN_Component_object__init(o,index,id):_ZEN_Component_object__init(o,index,id);
	o.column = '';
	o.format = '';
	o.page = '';
	o.readOnly = false;
	o.row = '';
	o.style = '';
	o.title = '';
}
function _ZEN_Auxiliary_gridCell_serialize(set,s)
{
	var o = this;s[0]='202151710';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.aux;s[7]=o.column;s[8]=o.format;s[9]=o.onupdate;s[10]=o.page;s[11]=(o.readOnly?1:0);s[12]=o.renderFlag;s[13]=o.row;s[14]=o.style;s[15]=o.title;s[16]=o.tuple;s[17]=(o.visible?1:0);
}
function _ZEN_Auxiliary_gridCell_getSettings(s)
{
	s['name'] = 'string';
	s['column'] = 'integer';
	s['format'] = 'string';
	s['page'] = 'integer';
	s['readOnly'] = 'boolean';
	s['row'] = 'integer';
	s['style'] = 'style';
	s['title'] = 'caption';
	this.invokeSuper('getSettings',arguments);
}
self._ZEN_Auxiliary_gridCell__Loader = function() {
	zenLoadClass('_ZEN_Component_object');
	_ZEN_Auxiliary_gridCell.prototype = zenCreate('_ZEN_Component_object',-1);
	var p = _ZEN_Auxiliary_gridCell.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Auxiliary_gridCell;
	p.superClass = ('undefined' == typeof _ZEN_Component_object) ? zenMaster._ZEN_Component_object.prototype:_ZEN_Component_object.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Auxiliary.gridCell';
	p._type = 'gridCell';
	p.serialize = _ZEN_Auxiliary_gridCell_serialize;
	p.getSettings = _ZEN_Auxiliary_gridCell_getSettings;
}

self._zenClassIdx['gridColumn'] = '_ZEN_Auxiliary_gridColumn';
self._ZEN_Auxiliary_gridColumn = function(index,id) {
	if (index>=0) {_ZEN_Auxiliary_gridColumn__init(this,index,id);}
}

self._ZEN_Auxiliary_gridColumn__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_object__init) ?zenMaster._ZEN_Component_object__init(o,index,id):_ZEN_Component_object__init(o,index,id);
	o.columnName = '';
	o.format = '';
	o.hidden = false;
	o.label = '';
	o.logicalValue = '';
	o.lookupSpec = '';
	o.priority = '1';
	o.readOnly = false;
	o.style = '';
	o.title = '';
	o.type = '';
	o.value = '';
	o.valueList = '';
	o.width = '';
}
function _ZEN_Auxiliary_gridColumn_serialize(set,s)
{
	var o = this;s[0]='4055020808';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.aux;s[7]=o.columnName;s[8]=o.format;s[9]=(o.hidden?1:0);s[10]=o.label;s[11]=o.logicalValue;s[12]=o.lookupSpec;s[13]=o.onupdate;s[14]=o.priority;s[15]=(o.readOnly?1:0);s[16]=o.renderFlag;s[17]=o.style;s[18]=o.title;s[19]=o.tuple;s[20]=o.type;s[21]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[22]=o.valueList;s[23]=(o.visible?1:0);s[24]=o.width;
}
function _ZEN_Auxiliary_gridColumn_getSettings(s)
{
	s['name'] = 'string';
	s['columnName'] = 'string';
	s['format'] = 'string';
	s['hidden'] = 'boolean';
	s['label'] = 'caption';
	s['logicalValue'] = 'string';
	s['lookupSpec'] = 'string';
	s['priority'] = 'integer';
	s['readOnly'] = 'boolean';
	s['style'] = 'style';
	s['title'] = 'caption';
	s['type'] = 'string';
	s['value'] = 'string';
	s['valueList'] = 'csv';
	s['width'] = 'length';
	this.invokeSuper('getSettings',arguments);
}
self._ZEN_Auxiliary_gridColumn__Loader = function() {
	zenLoadClass('_ZEN_Component_object');
	_ZEN_Auxiliary_gridColumn.prototype = zenCreate('_ZEN_Component_object',-1);
	var p = _ZEN_Auxiliary_gridColumn.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Auxiliary_gridColumn;
	p.superClass = ('undefined' == typeof _ZEN_Component_object) ? zenMaster._ZEN_Component_object.prototype:_ZEN_Component_object.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Auxiliary.gridColumn';
	p._type = 'gridColumn';
	p.serialize = _ZEN_Auxiliary_gridColumn_serialize;
	p.getSettings = _ZEN_Auxiliary_gridColumn_getSettings;
}

self._zenClassIdx['columnDescriptor'] = '_ZEN_Auxiliary_gridColumnDescriptor';
self._ZEN_Auxiliary_gridColumnDescriptor = function(index,id) {
	if (index>=0) {_ZEN_Auxiliary_gridColumnDescriptor__init(this,index,id);}
}

self._ZEN_Auxiliary_gridColumnDescriptor__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_object__init) ?zenMaster._ZEN_Component_object__init(o,index,id):_ZEN_Component_object__init(o,index,id);
	o.align = '';
	o.caption = '';
	o.columns = new Array();
	o.format = '';
	o.headerAlign = '';
	o.headerStyle = '';
	o.height = '';
	o.hidden = false;
	o.image = '';
	o.ongetlookupspec = '';
	o.priority = '';
	o.readOnly = false;
	o.style = '';
	o.type = 'string';
	o.value = '';
	o.width = '';
}
function _ZEN_Auxiliary_gridColumnDescriptor_serialize(set,s)
{
	var o = this;s[0]='1243097719';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.caption;s[9]=set.serializeList(o,o.columns,true,'columns');s[10]=o.format;s[11]=o.headerAlign;s[12]=o.headerStyle;s[13]=o.height;s[14]=(o.hidden?1:0);s[15]=o.image;s[16]=o.ongetlookupspec;s[17]=o.onupdate;s[18]=o.priority;s[19]=(o.readOnly?1:0);s[20]=o.renderFlag;s[21]=o.style;s[22]=o.tuple;s[23]=o.type;s[24]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[25]=(o.visible?1:0);s[26]=o.width;
}
function _ZEN_Auxiliary_gridColumnDescriptor_getSettings(s)
{
	s['name'] = 'string';
	s['align'] = 'enum:left,right,center';
	s['caption'] = 'caption';
	s['format'] = 'string';
	s['headerAlign'] = 'enum:left,right,center';
	s['headerStyle'] = 'string';
	s['height'] = 'length';
	s['hidden'] = 'boolean';
	s['image'] = 'uri';
	s['ongetlookupspec'] = 'eventHandler';
	s['priority'] = 'integer';
	s['readOnly'] = 'boolean';
	s['style'] = 'string';
	s['type'] = 'enum:string,image,button,checkbox,link,lookup,user';
	s['value'] = 'string';
	s['width'] = 'length';
	this.invokeSuper('getSettings',arguments);
}
self._ZEN_Auxiliary_gridColumnDescriptor__Loader = function() {
	zenLoadClass('_ZEN_Component_object');
	_ZEN_Auxiliary_gridColumnDescriptor.prototype = zenCreate('_ZEN_Component_object',-1);
	var p = _ZEN_Auxiliary_gridColumnDescriptor.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Auxiliary_gridColumnDescriptor;
	p.superClass = ('undefined' == typeof _ZEN_Component_object) ? zenMaster._ZEN_Component_object.prototype:_ZEN_Component_object.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Auxiliary.gridColumnDescriptor';
	p._type = 'gridColumnDescriptor';
	p.serialize = _ZEN_Auxiliary_gridColumnDescriptor_serialize;
	p.getSettings = _ZEN_Auxiliary_gridColumnDescriptor_getSettings;
}

self._zenClassIdx['gridRow'] = '_ZEN_Auxiliary_gridRow';
self._ZEN_Auxiliary_gridRow = function(index,id) {
	if (index>=0) {_ZEN_Auxiliary_gridRow__init(this,index,id);}
}

self._ZEN_Auxiliary_gridRow__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_object__init) ?zenMaster._ZEN_Component_object__init(o,index,id):_ZEN_Component_object__init(o,index,id);
	o.format = '';
	o.height = '';
	o.hidden = false;
	o.label = '';
	o.priority = '1';
	o.readOnly = false;
	o.rowName = '';
	o.style = '';
	o.title = '';
	o.value = '';
}
function _ZEN_Auxiliary_gridRow_serialize(set,s)
{
	var o = this;s[0]='894075313';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.aux;s[7]=o.format;s[8]=o.height;s[9]=(o.hidden?1:0);s[10]=o.label;s[11]=o.onupdate;s[12]=o.priority;s[13]=(o.readOnly?1:0);s[14]=o.renderFlag;s[15]=o.rowName;s[16]=o.style;s[17]=o.title;s[18]=o.tuple;s[19]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[20]=(o.visible?1:0);
}
function _ZEN_Auxiliary_gridRow_getSettings(s)
{
	s['name'] = 'string';
	s['format'] = 'string';
	s['height'] = 'length';
	s['hidden'] = 'boolean';
	s['label'] = 'caption';
	s['priority'] = 'integer';
	s['readOnly'] = 'boolean';
	s['rowName'] = 'string';
	s['style'] = 'style';
	s['title'] = 'caption';
	s['value'] = 'string';
	this.invokeSuper('getSettings',arguments);
}
self._ZEN_Auxiliary_gridRow__Loader = function() {
	zenLoadClass('_ZEN_Component_object');
	_ZEN_Auxiliary_gridRow.prototype = zenCreate('_ZEN_Component_object',-1);
	var p = _ZEN_Auxiliary_gridRow.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Auxiliary_gridRow;
	p.superClass = ('undefined' == typeof _ZEN_Component_object) ? zenMaster._ZEN_Component_object.prototype:_ZEN_Component_object.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Auxiliary.gridRow';
	p._type = 'gridRow';
	p.serialize = _ZEN_Auxiliary_gridRow_serialize;
	p.getSettings = _ZEN_Auxiliary_gridRow_getSettings;
}

self._zenClassIdx['rowDescriptor'] = '_ZEN_Auxiliary_gridRowDescriptor';
self._ZEN_Auxiliary_gridRowDescriptor = function(index,id) {
	if (index>=0) {_ZEN_Auxiliary_gridRowDescriptor__init(this,index,id);}
}

self._ZEN_Auxiliary_gridRowDescriptor__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_object__init) ?zenMaster._ZEN_Component_object__init(o,index,id):_ZEN_Component_object__init(o,index,id);
	o.caption = '';
	o.format = '';
	o.height = '';
	o.priority = '';
	o.readOnly = false;
	o.rows = new Array();
	o.style = '';
	o.width = '';
}
function _ZEN_Auxiliary_gridRowDescriptor_serialize(set,s)
{
	var o = this;s[0]='1535949533';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.aux;s[7]=o.caption;s[8]=o.format;s[9]=o.height;s[10]=o.onupdate;s[11]=o.priority;s[12]=(o.readOnly?1:0);s[13]=o.renderFlag;s[14]=set.serializeList(o,o.rows,true,'rows');s[15]=o.style;s[16]=o.tuple;s[17]=(o.visible?1:0);s[18]=o.width;
}
function _ZEN_Auxiliary_gridRowDescriptor_getSettings(s)
{
	s['name'] = 'string';
	s['caption'] = 'caption';
	s['format'] = 'string';
	s['height'] = 'length';
	s['priority'] = 'integer';
	s['readOnly'] = 'boolean';
	s['style'] = 'string';
	s['width'] = 'length';
	this.invokeSuper('getSettings',arguments);
}
self._ZEN_Auxiliary_gridRowDescriptor__Loader = function() {
	zenLoadClass('_ZEN_Component_object');
	_ZEN_Auxiliary_gridRowDescriptor.prototype = zenCreate('_ZEN_Component_object',-1);
	var p = _ZEN_Auxiliary_gridRowDescriptor.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Auxiliary_gridRowDescriptor;
	p.superClass = ('undefined' == typeof _ZEN_Component_object) ? zenMaster._ZEN_Component_object.prototype:_ZEN_Component_object.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Auxiliary.gridRowDescriptor';
	p._type = 'gridRowDescriptor';
	p.serialize = _ZEN_Auxiliary_gridRowDescriptor_serialize;
	p.getSettings = _ZEN_Auxiliary_gridRowDescriptor_getSettings;
}

self._zenClassIdx['locatorLink'] = '_ZEN_Auxiliary_locatorLink';
self._ZEN_Auxiliary_locatorLink = function(index,id) {
	if (index>=0) {_ZEN_Auxiliary_locatorLink__init(this,index,id);}
}

self._ZEN_Auxiliary_locatorLink__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_object__init) ?zenMaster._ZEN_Component_object__init(o,index,id):_ZEN_Component_object__init(o,index,id);
	o.caption = '';
	o.href = '';
	o.target = '_top';
	o.title = '';
}
function _ZEN_Auxiliary_locatorLink_serialize(set,s)
{
	var o = this;s[0]='3717784072';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.aux;s[7]=o.caption;s[8]=o.href;s[9]=o.onupdate;s[10]=o.renderFlag;s[11]=o.target;s[12]=o.title;s[13]=o.tuple;s[14]=(o.visible?1:0);
}
function _ZEN_Auxiliary_locatorLink_getSettings(s)
{
	s['name'] = 'string';
	s['caption'] = 'caption';
	s['href'] = 'uri';
	s['target'] = 'string';
	s['title'] = 'caption';
	this.invokeSuper('getSettings',arguments);
}
self._ZEN_Auxiliary_locatorLink__Loader = function() {
	zenLoadClass('_ZEN_Component_object');
	_ZEN_Auxiliary_locatorLink.prototype = zenCreate('_ZEN_Component_object',-1);
	var p = _ZEN_Auxiliary_locatorLink.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Auxiliary_locatorLink;
	p.superClass = ('undefined' == typeof _ZEN_Component_object) ? zenMaster._ZEN_Component_object.prototype:_ZEN_Component_object.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Auxiliary.locatorLink';
	p._type = 'locatorLink';
	p.serialize = _ZEN_Auxiliary_locatorLink_serialize;
	p.getSettings = _ZEN_Auxiliary_locatorLink_getSettings;
}

self._zenClassIdx['option'] = '_ZEN_Auxiliary_option';
self._ZEN_Auxiliary_option = function(index,id) {
	if (index>=0) {_ZEN_Auxiliary_option__init(this,index,id);}
}

self._ZEN_Auxiliary_option__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_object__init) ?zenMaster._ZEN_Component_object__init(o,index,id):_ZEN_Component_object__init(o,index,id);
	o.style = '';
	o.text = '';
	o.value = '';
}
function _ZEN_Auxiliary_option_serialize(set,s)
{
	var o = this;s[0]='142189274';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.aux;s[7]=o.onupdate;s[8]=o.renderFlag;s[9]=o.style;s[10]=o.text;s[11]=o.tuple;s[12]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[13]=(o.visible?1:0);
}
function _ZEN_Auxiliary_option_getSettings(s)
{
	s['name'] = 'string';
	s['style'] = 'style';
	s['text'] = 'caption';
	s['value'] = 'string';
	this.invokeSuper('getSettings',arguments);
}
self._ZEN_Auxiliary_option__Loader = function() {
	zenLoadClass('_ZEN_Component_object');
	_ZEN_Auxiliary_option.prototype = zenCreate('_ZEN_Component_object',-1);
	var p = _ZEN_Auxiliary_option.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Auxiliary_option;
	p.superClass = ('undefined' == typeof _ZEN_Component_object) ? zenMaster._ZEN_Component_object.prototype:_ZEN_Component_object.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Auxiliary.option';
	p._type = 'option';
	p.serialize = _ZEN_Auxiliary_option_serialize;
	p.getSettings = _ZEN_Auxiliary_option_getSettings;
}

self._zenClassIdx['parameter'] = '_ZEN_Auxiliary_parameter';
self._ZEN_Auxiliary_parameter = function(index,id) {
	if (index>=0) {_ZEN_Auxiliary_parameter__init(this,index,id);}
}

self._ZEN_Auxiliary_parameter__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_object__init) ?zenMaster._ZEN_Component_object__init(o,index,id):_ZEN_Component_object__init(o,index,id);
	o.value = '';
}
function _ZEN_Auxiliary_parameter_serialize(set,s)
{
	var o = this;s[0]='1426937607';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.aux;s[7]=o.onupdate;s[8]=o.renderFlag;s[9]=o.tuple;s[10]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[11]=(o.visible?1:0);
}
function _ZEN_Auxiliary_parameter_getSettings(s)
{
	s['name'] = 'string';
	s['value'] = 'string';
	this.invokeSuper('getSettings',arguments);
}
self._ZEN_Auxiliary_parameter__Loader = function() {
	zenLoadClass('_ZEN_Component_object');
	_ZEN_Auxiliary_parameter.prototype = zenCreate('_ZEN_Component_object',-1);
	var p = _ZEN_Auxiliary_parameter.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Auxiliary_parameter;
	p.superClass = ('undefined' == typeof _ZEN_Component_object) ? zenMaster._ZEN_Component_object.prototype:_ZEN_Component_object.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Auxiliary.parameter';
	p._type = 'parameter';
	p.serialize = _ZEN_Auxiliary_parameter_serialize;
	p.getSettings = _ZEN_Auxiliary_parameter_getSettings;
}

self._zenClassIdx['radialNode'] = '_ZEN_Auxiliary_radialNode';
self._ZEN_Auxiliary_radialNode = function(index,id) {
	if (index>=0) {_ZEN_Auxiliary_radialNode__init(this,index,id);}
}

self._ZEN_Auxiliary_radialNode__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_object__init) ?zenMaster._ZEN_Component_object__init(o,index,id):_ZEN_Component_object__init(o,index,id);
	o.caption = '';
	o.onclick = '';
	o.style = '';
	o.value = '';
}
function _ZEN_Auxiliary_radialNode_serialize(set,s)
{
	var o = this;s[0]='3102894841';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.aux;s[7]=o.caption;s[8]=o.onclick;s[9]=o.onupdate;s[10]=o.renderFlag;s[11]=o.style;s[12]=o.tuple;s[13]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[14]=(o.visible?1:0);
}
function _ZEN_Auxiliary_radialNode_getSettings(s)
{
	s['name'] = 'string';
	s['caption'] = 'string';
	s['onclick'] = 'eventHandler';
	s['style'] = 'svgStyle';
	s['value'] = 'string';
	this.invokeSuper('getSettings',arguments);
}
self._ZEN_Auxiliary_radialNode__Loader = function() {
	zenLoadClass('_ZEN_Component_object');
	_ZEN_Auxiliary_radialNode.prototype = zenCreate('_ZEN_Component_object',-1);
	var p = _ZEN_Auxiliary_radialNode.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Auxiliary_radialNode;
	p.superClass = ('undefined' == typeof _ZEN_Component_object) ? zenMaster._ZEN_Component_object.prototype:_ZEN_Component_object.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Auxiliary.radialNode';
	p._type = 'radialNode';
	p.serialize = _ZEN_Auxiliary_radialNode_serialize;
	p.getSettings = _ZEN_Auxiliary_radialNode_getSettings;
}
/* EOF */