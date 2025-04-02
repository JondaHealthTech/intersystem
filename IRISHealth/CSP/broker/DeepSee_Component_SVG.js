/*** Zen Module: DeepSee_Component_SVG ***/

self._zenClassIdx['http://www.intersystems.com/deepsee/scoreCardColumn'] = '_DeepSee_Component_SVG_scoreCardColumn';
self._DeepSee_Component_SVG_scoreCardColumn = function(index,id) {
	if (index>=0) {_DeepSee_Component_SVG_scoreCardColumn__init(this,index,id);}
}

self._DeepSee_Component_SVG_scoreCardColumn__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_object__init) ?zenMaster._ZEN_Component_object__init(o,index,id):_ZEN_Component_object__init(o,index,id);
	o.align = '';
	o.baseValue = '';
	o.cellCaption = '';
	o.dataValue = '';
	o.display = '';
	o.format = '';
	o.headerAlign = '';
	o.label = '';
	o.rangeLower = '';
	o.rangeUpper = '';
	o.showAs = '';
	o.style = '';
	o.summary = '';
	o.summaryValue = '';
	o.targetValue = '';
	o.thresholdLower = '';
	o.thresholdUpper = '';
	o.valueColumn = false;
	o.width = '';
}
function _DeepSee_Component_SVG_scoreCardColumn_serialize(set,s)
{
	var o = this;s[0]='2110593099';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.baseValue;s[9]=o.cellCaption;s[10]=o.dataValue;s[11]=o.display;s[12]=o.format;s[13]=o.headerAlign;s[14]=o.label;s[15]=o.onupdate;s[16]=o.rangeLower;s[17]=o.rangeUpper;s[18]=o.renderFlag;s[19]=o.showAs;s[20]=o.style;s[21]=o.summary;s[22]=o.summaryValue;s[23]=o.targetValue;s[24]=o.thresholdLower;s[25]=o.thresholdUpper;s[26]=o.tuple;s[27]=(o.valueColumn?1:0);s[28]=(o.visible?1:0);s[29]=o.width;
}
function _DeepSee_Component_SVG_scoreCardColumn_getSettings(s)
{
	s['name'] = 'string';
	s['align'] = 'enum:left,right,center';
	s['baseValue'] = 'string';
	s['cellCaption'] = 'caption';
	s['dataValue'] = 'string';
	s['display'] = 'enum:itemNo,label,value,arrow,lamp,trendLine,trendBars,plotBox,hidden';
	s['format'] = 'string';
	s['headerAlign'] = 'enum:left,right,center';
	s['label'] = 'caption';
	s['rangeLower'] = 'string';
	s['rangeUpper'] = 'string';
	s['showAs'] = 'enum:value,conditional,sum,target,target%,sum%';
	s['style'] = 'style';
	s['summary'] = 'enum:sum,avg,min,max,value';
	s['summaryValue'] = 'string';
	s['targetValue'] = 'string';
	s['thresholdLower'] = 'string';
	s['thresholdUpper'] = 'string';
	s['valueColumn'] = 'boolean';
	s['width'] = 'length';
	this.invokeSuper('getSettings',arguments);
}
self._DeepSee_Component_SVG_scoreCardColumn__Loader = function() {
	zenLoadClass('_ZEN_Component_object');
	_DeepSee_Component_SVG_scoreCardColumn.prototype = zenCreate('_ZEN_Component_object',-1);
	var p = _DeepSee_Component_SVG_scoreCardColumn.prototype;
	if (null==p) {return;}
	p.constructor = _DeepSee_Component_SVG_scoreCardColumn;
	p.superClass = ('undefined' == typeof _ZEN_Component_object) ? zenMaster._ZEN_Component_object.prototype:_ZEN_Component_object.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%DeepSee.Component.SVG.scoreCardColumn';
	p._type = 'scoreCardColumn';
	p.serialize = _DeepSee_Component_SVG_scoreCardColumn_serialize;
	p.getSettings = _DeepSee_Component_SVG_scoreCardColumn_getSettings;
}

self._zenClassIdx['http://www.intersystems.com/deepsee/scoreCard'] = '_DeepSee_Component_SVG_scoreCard';
self._DeepSee_Component_SVG_scoreCard = function(index,id) {
	if (index>=0) {_DeepSee_Component_SVG_scoreCard__init(this,index,id);}
}

self._DeepSee_Component_SVG_scoreCard__init = function(o,index,id) {
	('undefined' == typeof _ZEN_SVGComponent_chart__init) ?zenMaster._ZEN_SVGComponent_chart__init(o,index,id):_ZEN_SVGComponent_chart__init(o,index,id);
	o.arrowSize = '.8';
	o.arrowStyle = '';
	o.cardHeight = '0';
	o.cardSize = '';
	o.cellCaptionStyle = '';
	o.columnHeaderStyle = '';
	o.columns = new Array();
	o.controller = '';
	o.controllerId = '';
	o.footersVisible = true;
	o.headersVisible = true;
	o.lampColor = '#80F080';
	o.lampColorNeg = '#F08080';
	o.lampLabelStyle = '';
	o.lampSize = '.6';
	o.onclickrow = '';
	o.ongetcontroller = '';
	o.onnotifyView = '';
	o.pivotData = false;
	o.plotBoxHeight = '.8';
	o.plotBoxLowerStyle = '';
	o.plotBoxMidStyle = '';
	o.plotBoxStyle = '';
	o.plotBoxValueHeight = '.5';
	o.plotBoxValueStyle = 'fill:rgb(47,98,128);';
	o.plotBoxValueStyleNeg = 'fill:rgb(128,47,47);';
	o.rowHeight = '';
	o.scrollLeft = '0';
	o.selectedIndex = '-1';
	o.targetLineStyle = '';
	o.titleAlign = 'left';
	o.titleImage = '';
	o.titleImageStyle = '';
	o.titleVisible = true;
	o.trendBarsHeight = '.8';
	o.trendBarsStyle = '';
	o.trendLineHeight = '.8';
	o.trendLineStyle = '';
}
function _DeepSee_Component_SVG_scoreCard_serialize(set,s)
{
	var o = this;s[0]='2969961952';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.appearance;s[7]=o.arrowSize;s[8]=o.arrowStyle;s[9]=(o.autoScaleText?1:0);s[10]=o.aux;s[11]=o.axisLineStyle;s[12]=o.axisTitleStyle;s[13]=o.backgroundStyle;s[14]=o.bandLower;s[15]=o.bandLowerStyle;s[16]=o.bandUpper;s[17]=o.bandUpperStyle;s[18]=o.baseLineStyle;s[19]=o.borderOffset;s[20]=o.borderRadius;s[21]=o.borderStyle;s[22]=(o.boundless?1:0);s[23]=o.cardHeight;s[24]=o.cardSize;s[25]=o.cellCaptionStyle;s[26]=o.columnHeaderStyle;s[27]=set.serializeList(o,o.columns,true,'columns');s[28]=o.controller;s[29]=o.controllerId;s[30]=o.currMultiple;s[31]=o.currYAxis;s[32]=o.endTime;s[33]=(o.footersVisible?1:0);s[34]=o.gridStyle;s[35]=(o.hasZoom?1:0);s[36]=(o.headersVisible?1:0);s[37]=o.height;s[38]=(o.hidden?1:0);s[39]=o.hzZoomStep;s[40]=o.indicatorStyle;s[41]=(o.indicatorsVisible?1:0);s[42]=o.labelStyle;s[43]=(o.labelsVisible?1:0);s[44]=o.lampColor;s[45]=o.lampColorNeg;s[46]=o.lampLabelStyle;s[47]=o.lampSize;s[48]=o.legendHeight;s[49]=o.legendLabelStyle;s[50]=o.legendRectStyle;s[51]=o.legendStyle;s[52]=o.legendTitle;s[53]=o.legendVisible;s[54]=o.legendWidth;s[55]=o.legendX;s[56]=o.legendY;s[57]=o.lineStyle;s[58]=o.marginBottom;s[59]=o.marginLeft;s[60]=o.marginRight;s[61]=o.marginTop;s[62]=o.markerScale;s[63]=o.markerShapes;s[64]=o.markerStyle;s[65]=(o.markersVisible?1:0);s[66]=o.maxLabelLen;s[67]=o.msgIfNoData;s[68]=o.multipleTitleStyle;s[69]=o.noDataFill;s[70]=o.noDataOpacity;s[71]=o.noDataStroke;s[72]=o.onclick;s[73]=o.onclickrow;s[74]=o.onelementClick;s[75]=o.ongetData;s[76]=o.ongetLabelX;s[77]=o.ongetLabelY;s[78]=o.ongetSeriesColor;s[79]=o.ongetTimeEvents;s[80]=o.ongetcontroller;s[81]=o.onnotifyView;s[82]=o.onrenderData;s[83]=o.onrenderPlotArea;s[84]=o.onshowTooltip;s[85]=o.onupdate;s[86]=(o.pivotData?1:0);s[87]=o.plotAreaStyle;s[88]=o.plotBoxHeight;s[89]=o.plotBoxLowerStyle;s[90]=o.plotBoxMidStyle;s[91]=o.plotBoxStyle;s[92]=o.plotBoxValueHeight;s[93]=o.plotBoxValueStyle;s[94]=o.plotBoxValueStyleNeg;s[95]=o.plotEdgeStyle;s[96]=o.plotStyle;s[97]=(o.plotToEdge?1:0);s[98]=o.position;s[99]=o.preserveAspectRatio;s[100]=o.renderFlag;s[101]=o.rowHeight;s[102]=o.scrollButtonStyle;s[103]=o.scrollLeft;s[104]=o.selectedIndex;s[105]=o.selectedItem;s[106]=o.selectedItemStyle;s[107]=o.selectedSeries;s[108]=o.seriesColorScheme;s[109]=o.seriesColors;s[110]=o.seriesColorsOverride;s[111]=o.seriesCount;s[112]=o.seriesNames;s[113]=o.seriesNumber;s[114]=o.seriesSize;s[115]=o.seriesYAxes;s[116]=(o.showMultiples?1:0);s[117]=o.startTime;s[118]=o.stripeStyle;s[119]=(o.stripesVisible?1:0);s[120]=o.subtitle;s[121]=o.subtitleStyle;s[122]=o.tag;s[123]=o.targetLineStyle;s[124]=o.textSize;s[125]=(o.timeBased?1:0);s[126]=o.title;s[127]=o.titleAlign;s[128]=o.titleBoxStyle;s[129]=o.titleImage;s[130]=o.titleImageStyle;s[131]=o.titleStyle;s[132]=(o.titleVisible?1:0);s[133]=o.titleX;s[134]=o.titleY;s[135]=o.tooltipRectStyle;s[136]=o.trendBarsHeight;s[137]=o.trendBarsStyle;s[138]=o.trendLineHeight;s[139]=o.trendLineStyle;s[140]=o.tuple;s[141]=o.unselectedItemStyle;s[142]=o.valueBoxStyle;s[143]=o.valueLabelFormat;s[144]=o.valueLabelStyle;s[145]=(o.valueLabelsVisible?1:0);s[146]=o.viewBoxHeight;s[147]=o.viewBoxWidth;s[148]=(o.visible?1:0);s[149]=(o.warnIfNoData?1:0);s[150]=o.width;s[151]=o.x;s[152]=set.addObject(o.xAxis,'xAxis');s[153]=o.y;s[154]=set.addObject(o.yAxis,'yAxis');s[155]=set.serializeList(o,o.yAxisList,true,'yAxisList');
}
function _DeepSee_Component_SVG_scoreCard_getSettings(s)
{
	s['name'] = 'string';
	s['arrowSize'] = 'float';
	s['arrowStyle'] = 'svgStyle';
	s['cardSize'] = 'string';
	s['cellCaptionStyle'] = 'svgStyle';
	s['columnHeaderStyle'] = 'svgStyle';
	s['controllerId'] = 'id';
	s['footersVisible'] = 'boolean';
	s['headersVisible'] = 'boolean';
	s['lampColor'] = 'string';
	s['lampColorNeg'] = 'string';
	s['lampLabelStyle'] = 'svgStyle';
	s['lampSize'] = 'float';
	s['onclickrow'] = 'eventHandler';
	s['ongetcontroller'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	s['pivotData'] = 'boolean';
	s['plotBoxHeight'] = 'float';
	s['plotBoxLowerStyle'] = 'svgStyle';
	s['plotBoxMidStyle'] = 'svgStyle';
	s['plotBoxStyle'] = 'svgStyle';
	s['plotBoxValueHeight'] = 'float';
	s['plotBoxValueStyle'] = 'svgStyle';
	s['plotBoxValueStyleNeg'] = 'svgStyle';
	s['rowHeight'] = 'integer';
	s['selectedIndex'] = 'integer';
	s['targetLineStyle'] = 'svgStyle';
	s['titleAlign'] = 'enum:center,left,right';
	s['titleImage'] = 'uri';
	s['titleImageStyle'] = 'svgStyle';
	s['titleVisible'] = 'boolean';
	s['trendBarsHeight'] = 'float';
	s['trendBarsStyle'] = 'svgStyle';
	s['trendLineHeight'] = 'float';
	s['trendLineStyle'] = 'svgStyle';
	this.invokeSuper('getSettings',arguments);
}

self._DeepSee_Component_SVG_scoreCard_connectToController = function() {
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

self._DeepSee_Component_SVG_scoreCard_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._DeepSee_Component_SVG_scoreCard_evaluate = function(expr,data,r) {
var value = '';
try {
if ('undefined' != typeof dsFormulaParser && (expr.toString().charAt(0)=='=')) {
var parser = new dsFormulaParser();
var funcSet = {
max: new Function('args','return zenPage.getComponent('+this.index+').getMaxValue(args);'),
min: new Function('args','return zenPage.getComponent('+this.index+').getMinValue(args);'),
count: new Function('args','return zenPage.getComponent('+this.index+').getCountValue(args);'),
sum: new Function('args','return zenPage.getComponent('+this.index+').getSumValue(args);'),
avg: new Function('args','return zenPage.getComponent('+this.index+').getAvgValue(args);')
}
parser.setFunctionSet(funcSet);
parser.parse(expr.toString().substring(1));
if (parser.errorHTML != '') {
value = dsFormulaLastError ? dsFormulaLastError : 'error';
}
else {
self._widgetData = data;
self._widgetRow = r;
var lookup = new Function('key','return zenPage.getComponent('+this.index+').lookup(key);');
value = parser.eval(lookup);
self._widgetData = null;
self._widgetRow = null;
}
}
else {
if (''!==expr && 0==expr) {
value = 0;
}
else if ('"'==expr.toString().charAt(0) && '"'==expr.toString().charAt(expr.length-1)) {
value = expr.toString().substring(1,expr.length-1);
}
else if (''!==expr) {
if (isNaN(expr)) {
var exprU = expr.toString().toUpperCase();
value = (null == data[exprU]) ? '' : ((null == data[exprU][r]) ? '' : data[exprU][r]);
}
else {
value = expr;
}
}
}
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in scoreCard.evaluate');
throw {message:'Error in evaluate method'};
value = '';
}
return value;
}

self._DeepSee_Component_SVG_scoreCard_getAvgValue = function(args) {
var avg = '';
var count = this.getCountValue(args);
if (count > 0) {
var sum = this.getSumValue(args);
avg = sum / count;
}
return avg;
}

self._DeepSee_Component_SVG_scoreCard_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._DeepSee_Component_SVG_scoreCard_getCountValue = function(args) {
var count = 0;
for (var n = 0; n < args.length; n++) {
var prop = args[n];
var val = 0;
if (null != prop && '' !== prop) {
var ident = prop.toString().substring(1,prop.length-1).toUpperCase();
if (!isNaN(parseFloat(prop))) {
val++;
}
else if (''!=ident && this._dataCount && this._dataCount[ident]) {
val = this._dataCount[ident];
}
}
count += val;
}
return count;
}

self._DeepSee_Component_SVG_scoreCard_getMaxValue = function(args) {
var max = null;
for (var n = 0; n < args.length; n++) {
var val = null;
var prop = args[n];
if (null != prop && '' !== prop) {
var ident = prop.toString().substring(1,prop.length-1).toUpperCase();
if (!isNaN(parseFloat(prop))) {
val = parseFloat(prop);
}
else if (''!=ident && this._dataMaxValue && this._dataMaxValue[ident]) {
val = this._dataMaxValue[ident];
}
}
max = (null==max) ? val : (null==val) ? max : (max>val) ? max : val;
}
return (null!==max) ? max : '';
}

self._DeepSee_Component_SVG_scoreCard_getMinValue = function(args) {
var min = null;
for (var n = 0; n < args.length; n++) {
var prop = args[n];
var val = null;
if (null != prop && '' !== prop) {
var ident = prop.toString().substring(1,prop.length-1).toUpperCase();
if (!isNaN(parseFloat(prop))) {
val = parseFloat(prop);
}
else if (''!=ident && this._dataMinValue && this._dataMinValue[ident]) {
val = this._dataMinValue[ident];
}
}
min = (null==min) ? val : (null==val) ?min : (min<val) ? min : val;
}
return (null!==min) ? min : '';
}

self._DeepSee_Component_SVG_scoreCard_getPropName = function(prop) {
if (!isNaN(parseFloat(prop))) {
return '';
}
prop = prop.toString();
if (prop.charAt(0)=='=') {
prop = prop.substring(1,prop.length-1);
}
if (prop.charAt(0)=='[') {
var index = prop.indexOf(']');
if (index>0) {
prop = prop.substring(1,index);
}
}
return prop;
}

self._DeepSee_Component_SVG_scoreCard_getRowValue = function(row) {
var value = (this._rowValues ? (this._rowValues[row]?this._rowValues[row]:'') : '');
return value;
}

self._DeepSee_Component_SVG_scoreCard_getSumValue = function(args) {
var sum = 0;
for (var n = 0; n < args.length; n++) {
var prop = args[n];
var val = 0;
if (null != prop && '' !== prop) {
var ident = prop.toString().substring(1,prop.length-1).toUpperCase();
if (!isNaN(parseFloat(prop))) {
val = parseFloat(prop);
}
else if (''!=ident && this._dataSum && this._dataSum[ident]) {
val = parseFloat(this._dataSum[ident]);
}
}
if (null !== val) {
sum += val;
}
}
return sum;
}

self._DeepSee_Component_SVG_scoreCard_hasAxes = function() {
return false;
}

self._DeepSee_Component_SVG_scoreCard_lookup = function(key) {
key = key.toString().toUpperCase();
key = key.substr(1,key.length-2);
return (null == self._widgetData[key]) ? "" : ((null == self._widgetData[key][self._widgetRow]) ? "" : self._widgetData[key][self._widgetRow]);
}

self._DeepSee_Component_SVG_scoreCard_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._DeepSee_Component_SVG_scoreCard_renderContents = function() {
try {
if (!this.hidden) {
this.acquireData();
if (this.svgGroup) {
this.unrender();
this.renderScoreCard();
}
}
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in scoreCard.renderContents');
}
}

self._DeepSee_Component_SVG_scoreCard_renderScoreCard = function() {
try {
var msg = null;
this.cardHeight = 0;
var smallTitle = false;
var controller = this.getController();
if (null == controller) {
msg = $$$Text('Not connected to data source');
}
else if ('' !== zenGet(controller.modelError)) {
msg = controller.modelError;
smallTitle = true;
}
else if (this.columns.length == 0) {
msg = $$$Text('There are no columns defined for this scorecard...');
}
else if (controller.hasData && !controller.hasData()) {
msg = $$$Text('loading...');
}
var marginTop = (this.titleVisible || this.headersVisible) ? 5 : 0;
var marginRight = 10;
var marginLeft = 10;
var titleText = this.title;
var subtitleText = this.subtitle;
var titleStyle = this.titleStyle;
this._rowValues = new Array();
var cellInfoEx = [];
var rect = this.document.createElementNS(SVGNS,'rect');
rect.setAttribute('id',this.makeId('background'));
rect.setAttribute('class','scoreCardBackground');
rect.setAttribute("style",this.backgroundStyle);
rect.setAttribute('x',0);
rect.setAttribute('y',0);
rect.setAttribute('width',this.width);
rect.setAttribute('height',this.height);
this.svgGroup.appendChild(rect);
var y = marginTop;
var scount = this.getSeriesCount();
var ssize = this.getSeriesSize();
var rowCount = !this.pivotData ? scount : ssize;
var data = new Object();
this._dataMinValue = new Object();
this._dataMaxValue = new Object();
this._dataCount = new Object();
this._dataSum = new Object();
var colDataMinValue = new Array();
var colDataMaxValue = new Array();
if (controller) {
if (!this.pivotData) {
for (i = 0; i < ssize; i++) {
var name = controller.getPropertyName(i);
if (name && '' !== name) {
name = name.toString().toUpperCase();
data[name] = new Array();
for (var n = 0; n < scount; n++) {
var val = this._dataSeries[n] ? this._dataSeries[n][i] : '';
data[name][n] = val;
}
}
}
}
else {
for (i = 0; i < scount; i++) {
var name = controller.getPropertyName(i);
if (name && '' !== name) {
name = name.toString().toUpperCase();
data[name] = new Array();
for (var n = 0; n < ssize; n++) {
var val = this._dataSeries[i] ? this._dataSeries[i][n] : '';
data[name][n] = val;
}
}
}
}
}
for (var prop in data) {
for (var r = 0; r < rowCount; r++) {
var propU = prop.toString().toUpperCase();
var val = data[propU][r];
if (!isNaN(parseFloat(val))) {
val = parseFloat(val);
this._dataMinValue[propU] = ((null==this._dataMinValue[propU])||(val<this._dataMinValue[propU])) ? val : this._dataMinValue[propU];
this._dataMaxValue[propU] = ((null==this._dataMaxValue[propU])||(val>this._dataMaxValue[propU])) ? val : this._dataMaxValue[propU];
this._dataCount[propU] = (null==this._dataCount[propU]) ? 1 : this._dataCount[propU]+1;
this._dataSum[propU] = (this._dataSum[propU] && 'number'==typeof this._dataSum[propU]) ? this._dataSum[propU]+val : val;
}
}
}
var columnDefs = new Array();
for (var c = 0; c < this.columns.length; c++) {
var column = this.columns[c];
if ('title' == column.display) {
if ('' !== column.label) {
titleText = column.label;
}
else if ('' !== column.dataValue) {
var prop = this.getPropName(column.dataValue);
var propU = prop.toString().toUpperCase();
titleText = ('' === prop || null == data[propU]) ? column.dataValue : ((null == data[propU][0]) ? column.dataValue : data[propU][0]);
}
}
else {
var hidden = false;
if ('conditional'==column.showAs) {
if ('' !== column.dataValue) {
var prop = this.getPropName(column.dataValue);
if (prop!=='') {
var propU = prop.toString().toUpperCase();
hidden = null==data[propU];
}
}
}
if (!hidden) {
columnDefs[columnDefs.length] = column;
}
}
}
var hasFooter = false;
var hasScale = false;
for (var r = 0; r < rowCount; r++) {
cellInfoEx[r] = [];
this._rowValues[r] = '';
for (var c = 0; c < columnDefs.length; c++) {
var column = columnDefs[c];
var val = (''===column.dataValue) ? '' : this.evaluate(column.dataValue,data,r);
if (!isNaN(parseFloat(val))) {
val = parseFloat(val);
colDataMinValue[c] = ((null==colDataMinValue[c])||(val<colDataMinValue[c])) ? val : colDataMinValue[c];
colDataMaxValue[c] = ((null==colDataMaxValue[c])||(val>colDataMaxValue[c])) ? val : colDataMaxValue[c];
}
if (column.valueColumn) {
this._rowValues[r] = val;
}
if ((r==0)&&((''!==column.summary)||('plotBox'!==column.display))) {
hasFooter = this.footersVisible ? true : false;
if ('plotBox'!==column.display) {
hasScale = this.footersVisible ? true : false;
}
}
}
}
if (null != msg) {
titleText = msg;
subtitleText = '';
titleStyle = 'font-size:20pt;fill:darkred;';
y += 10;
}
var imageLeft = 0;
var imageTop = 0;
var imageWidth = 0;
var imageHeight = 0;
if (this.titleImage) {
var currUrl = window.location.href.split("/");
var imageURL = currUrl[0] + "//" + currUrl[2] + "/csp/sys/" + this.titleImage;
var imageStyle = this.titleImageStyle;
}
if (imageURL) {
imageWidth = 50;
imageHeight = 50;
if (imageStyle) {
var t = imageStyle.toString().split(';');
for (var ti = 0; ti < t.length; ti++) {
var t2 = t[ti].toString().split(':');
switch (t2[0]) {
case 'left':
imageLeft = parseInt(t2[1]);
break;
case 'top':
imageTop = parseInt(t2[1]);
break;
case 'width':
imageWidth = parseInt(t2[1]);
break;
case 'height':
imageHeight = parseInt(t2[1]);
break;
}
}
}
}
switch (this.titleAlign) {
case 'right':
var tx = parseInt(this.width) - marginRight;
var anch = 'end';
break;
case 'center':
var tx = parseInt(this.width) / 2;
var anch = 'middle';
break;
case 'left':
default:
var tx = marginLeft + (imageLeft) + imageWidth;
var anch = 'start';
break;
}
if (this.titleVisible || msg!=null) {
var trect = this.document.createElementNS(SVGNS,"rect");
trect.setAttribute("class","chart-titleBox");
trect.setAttribute("id",this.makeId('chartTitleBox'));
trect.setAttribute("style",this.titleBoxStyle);
this.svgGroup.appendChild(trect);
if ('' !== titleText) {
var title = this.document.createElementNS(SVGNS,'text');
title.setAttribute('class','scoreCardTitle');
title.setAttribute('style',titleStyle + (smallTitle?'font-size:8pt;':''));
var textNode = this.document.createTextNode(titleText);
title.appendChild(textNode);
this.svgGroup.appendChild(title);
var th = zenGetBBox(title).height;
y += th;
title.setAttribute('x',tx);
title.setAttribute('y',y);
title.setAttribute('text-anchor',anch);
if (null != msg) {
y += 10;
}
}
if ('' !== subtitleText) {
var subtitle = this.document.createElementNS(SVGNS,'text');
subtitle.setAttribute('class','scoreCardSubtitle');
subtitle.setAttribute('style',this.subtitleStyle);
var textNode = this.document.createTextNode(subtitleText);
subtitle.appendChild(textNode);
this.svgGroup.appendChild(subtitle);
var th = Math.floor(zenGetBBox(subtitle).height * 1.2);
y += th;
subtitle.setAttribute('x',tx);
subtitle.setAttribute('y',y-3);
subtitle.setAttribute('text-anchor',anch);
}
trect.setAttribute("x", 0);
trect.setAttribute("y", 0);
trect.setAttribute("width", this.width);
trect.setAttribute("height",y?(y+10):0);
} // title
if (null != msg) {
this.cardHeight = y;
return;
}
if (imageURL) {
var image = document.createElementNS(SVGNS,'image');
image.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href',imageURL);
image.setAttribute('preserveAspectRatio','none');
image.setAttribute('x',imageLeft);
image.setAttribute('y',imageTop);
image.setAttribute('width',imageWidth);
image.setAttribute('height',imageHeight);
this.svgGroup.appendChild(image);
if (y < (imageHeight + imageTop)) {
y = imageHeight + imageTop;
trect.setAttribute("height",y?(y+imageTop):0);
}
}
if (this.titleVisible || imageHeight) {
y += 5;
}
var padding = parseFloat(this.width) / 10;
padding = (padding < 5) ? 5 : padding;
padding = (padding > 20) ? 20 : padding;
var width = parseFloat(this.width) - (marginLeft + marginRight) - ((columnDefs.length-1) * padding);
var colWidth = 100; // place holder
var colMaxWidths = new Array(columnDefs.length);
var colHeaderWidths = new Array(columnDefs.length);
var nameToPosition = null;
var x = marginLeft;
var headerHeight = 0;
var headerBoxes = [];
if (this.headersVisible) {
for (var c = 0; c < columnDefs.length; c++) {
var column = columnDefs[c];
var label = column.label;
if (label=='$auto' && column.dataValue != '') {
var axisNo = this.pivotData ? 2 : 1;
label = '';
if (!nameToPosition) {
nameToPosition = {};
var props = controller.getDimSize(axisNo);
for (var p1 = 0; p1 < props; p1++) {
var pn = controller.getPropertyName(p1);
if (pn!='') {
nameToPosition[pn] = p1;
}
}
}
var propx = this.getPropName(column.dataValue);
if (propx!='') {
var p1 = nameToPosition[propx];
if ('undefined' != typeof p1) {
label = controller.getLabel(p1,axisNo);
}
else {
label = propx;
}
}
} else if (label=='$auto' && column.display=='label') {
label = controller.rowCaptionList.join('/')
}
var align = column.align;
var hdrAlign = column.headerAlign;
if ('' !== label && 'hidden' != column.display) {
var svg = this.document.createElementNS(SVGNS,'svg');
this.svgGroup.appendChild(svg);
headerBoxes[c] = svg;
var th = 0;
var totalH = 0;
var headers = new Array();
var labelt = label.split('\\n');
for (var t = 0;t < labelt.length;t++) {
var header = this.document.createElementNS(SVGNS,'text');
headers[headers.length] = header;
header.setAttribute('class','scoreCardHeader');
header.setAttribute('style',this.columnHeaderStyle);
if (column.display == 'value' || column.display == '') {
header.setAttribute('text-anchor','end');
header.setAttribute('x','98%');
}
else {
header.setAttribute('x',0);
}
if (hdrAlign=='left') {
header.setAttribute('x','5%');
header.setAttribute('text-anchor','start');
}
else if (hdrAlign=='right') {
header.setAttribute('x','95%');
header.setAttribute('text-anchor','end');
}
else if (hdrAlign=='center') {
header.setAttribute('x','50%');
header.setAttribute('text-anchor','middle');
}
var textNode = this.document.createTextNode(labelt[t]);
header.appendChild(textNode);
svg.appendChild(header);
var bbox = zenGetBBox(header);
th = bbox.height * 1.2;
totalH += th;
var tw = bbox.width * 1.2;
colHeaderWidths[c] = (null == colHeaderWidths[c] || tw > colHeaderWidths[c]) ? tw : colHeaderWidths[c];
}
if (0 == headerHeight) {
headerHeight = totalH;
}
svg.setAttribute('x',x);
svg.setAttribute('y',y);
svg.setAttribute('width',colWidth + 'px');
svg.setAttribute('height',headerHeight + 'px');
var hy = headerHeight - 3
for (var h = headers.length-1;h >= 0;h--) {
headers[h].setAttribute('y',hy);
hy -= (th*0.8);
}
}
if ('hidden'!= column.display) {
x += parseFloat(colWidth) + padding;
}
}
y += 2 + headerHeight;
} // headers
var line = this.document.createElementNS(SVGNS,'line');
line.setAttribute('x1',0);
line.setAttribute('x1',this.width);
line.setAttribute('y1',y);
line.setAttribute('y2',y);
line.setAttribute('class','scoreCardSeparator');
line.setAttribute('style',this.gridStyle);
this.svgGroup.appendChild(line);
if (columnDefs.length == 0) {
this.cardHeight = y;
return;
}
var rowHeight = this.rowHeight;
if (''==rowHeight) {
var text = this.document.createElementNS(SVGNS,'text');
text.setAttribute('class',this.cardSize=='big' ? 'scoreCardLabelBig' : 'scoreCardLabel');
text.setAttribute('x',0);
text.setAttribute('y',20);
var textNode = this.document.createTextNode('Ap');
text.appendChild(textNode);
this.svgGroup.appendChild(text);
rowHeight = zenGetBBox(text).height * 1.5;
this.svgGroup.removeChild(text);
}
rowHeight = parseInt(rowHeight);
rowHeight = (rowHeight < 0) ? 0 : rowHeight;
var plotMinValues = new Array(columnDefs.length);
var plotMaxValues = new Array(columnDefs.length);
var plotBaseValues = new Array(columnDefs.length);
var summaryValues = new Array(columnDefs.length);
var rowCells = new Array(rowCount); // array of svg elements
for (var r = 0; r < rowCount; r++) {
y += rowHeight;
var itemNo = (r+1);
var label = '';
if (controller) {
if (this.pivotData) {
label = controller.getLabel(r,1);
}
else {
label = controller.getLabel(r,2);
}
}
var rect = this.document.createElementNS(SVGNS,'rect');
rect.setAttribute('id',this.makeId('row_'+r));
rect.setAttribute('class',(r == this.selectedIndex) ? 'scoreCardRowSelected' : r%2?'scoreCardRowEven':'scoreCardRowOdd');
if (r%2==0) {
rect.setAttribute('style',this.stripeStyle);
}
rect.setAttribute('x',0);
rect.setAttribute('y',y-rowHeight);
rect.setAttribute('width',this.width);
rect.setAttribute('height',rowHeight);
this.svgGroup.appendChild(rect);
var eventHandler = new Function('evt','row','return zenPage.getComponent('+this.index+').rowClickHandler(evt,"'+r+'");');
rect.addEventListener('click',eventHandler,false);
var x = marginLeft;
rowCells[r] = new Array(columnDefs.length);
for (var c = 0; c < columnDefs.length; c++) {
var column = columnDefs[c];
var value = '';
var minValue = 0;
var maxValue = 100;
var baseValue = null;
var targetValue = 0;
var thresholdLower = 0;
var thresholdUpper = 0;
var rangeUpper = null;
var rangeLower = null;
var isPct = false;
var align = column.align;
var hdrAlign = column.headerAlign;
var prop = this.getPropName(column.dataValue);
value = this.evaluate(column.dataValue,data,r);
var colStyle = column.style;
if ('' != colStyle && (colStyle.toString().charAt(0)=='=')) {
colStyle = this.evaluate(colStyle,data,r);
}
if (''!==value && !isNaN(value)) {
if (''!==column.dataValue) {
maxValue = colDataMaxValue[c];
}
if (''!==column.dataValue) {
minValue = colDataMinValue[c];
}
if (minValue > 0) {
minValue = 0;
}
var v = this.evaluate(column.targetValue,data,r);
if (''!==v && !isNaN(v)) {
targetValue = v;
}
var v = this.evaluate(column.rangeLower,data,r);
if (''!==v && !isNaN(v)) {
rangeLower = v;
}
var v = this.evaluate(column.rangeUpper,data,r);
if (''!==v && !isNaN(v)) {
rangeUpper = v;
}
if ('' !== column.baseValue) {
var v = this.evaluate(column.baseValue,data,r);
if (''!==v && !isNaN(v)) {
baseValue = v;
}
}
if (null != rangeUpper) {
maxValue = rangeUpper;
}
if (null != rangeLower) {
minValue = rangeLower;
}
if ('' != column.thresholdLower) {
var v = this.evaluate(column.thresholdLower,data,r);
if (''!==v && !isNaN(v)) {
thresholdLower = v;
}
}
if ('' != column.thresholdUpper) {
var v = this.evaluate(column.thresholdUpper,data,r);
if (''!==v && !isNaN(v)) {
thresholdUpper = v;
}
}
var propU = prop.toString().toUpperCase();
switch(column.showAs) {
case 'sum':
value = (''==propU || null==this._dataSum[propU]) ? 0 : this._dataSum[propU];
break;
case 'sum%':
var dsum = (''==propU || null==this._dataSum[propU]) ? 0 : this._dataSum[propU];
value = (dsum!=0) ? (value / dsum) : 0;
isPct = true;
break;
case 'target':
value = targetValue;
break;
case 'target%':
value = (targetValue>0) ? (value / targetValue) : 0;
maxValue = (targetValue>0) ? (maxValue / targetValue) : 0;
isPct = true;
break;
case 'value':
case 'hidden':
default:
break;
}
}
if (isPct) {
var format = (''===column.format) ? '#.##%' : column.format;
var valueFmt = ('number'== typeof value) ? zenFormatNumber(value,format) : value;
}
else {
var format = (''===column.format) ? '#,#' : column.format;
if (parseFloat(value) == value) {
var valueFmt = zenFormatNumber(value,format);
}
else {
var valueFmt = value;
}
}
var display = column.display;
var avalue = parseFloat(value);
if (!isNaN(avalue)) {
switch(column.summary) {
case 'sum':
case 'avg':
summaryValues[c] = (summaryValues[c]?summaryValues[c]+avalue:avalue);
break;
case 'min':
summaryValues[c] = (summaryValues[c]?(summaryValues[c]<avalue?summaryValues[c]:avalue):avalue);
break;
case 'max':
summaryValues[c] = (summaryValues[c]?(summaryValues[c]>avalue?summaryValues[c]:avalue):avalue);
break;
case 'value':
default:
summaryValues[c] = '';
break;
}
}
if ('hidden' != display) {
var svg = this.document.createElementNS(SVGNS,'svg');
svg.setAttribute('x',x);
svg.setAttribute('y',y-rowHeight);
if (colWidth!='') {
svg.setAttribute('width',colWidth + 'px');
}
if (rowHeight!='') {
svg.setAttribute('height',rowHeight + 'px');
}
this.svgGroup.appendChild(svg);
rowCells[r][c] = svg;
}
var cellCaption = zenGet(column.cellCaption);
if ('' != cellCaption && (cellCaption.toString().charAt(0)=='=')) {
cellCaption = this.evaluate(cellCaption,data,r);
}
var cellCaptionH = 0;
if (cellCaption && display!='hidden' && rowHeight > 10) {
var text = this.document.createElementNS(SVGNS,'text');
text.setAttribute('class','scoreCardCellCaption');
text.setAttribute('style',this.cellCaptionStyle);
text.setAttribute('x',0);
text.setAttribute('y',(rowHeight*0.9));
if (align=='right') {
text.setAttribute('x','95%');
text.setAttribute('text-anchor','end');
}
else if (align=='center') {
text.setAttribute('x','50%');
text.setAttribute('text-anchor','middle');
}
var textNode = this.document.createTextNode(cellCaption);
text.appendChild(textNode);
svg.appendChild(text);
var tw = zenGetBBox(text).width *1.2;
cellCaptionH = zenGetBBox(text).height;
colMaxWidths[c] = (null == colMaxWidths[c] || tw > colMaxWidths[c]) ? tw : colMaxWidths[c];
}
switch(display) {
case 'hidden':
colWidth = 0;
break;
case 'trendLine':
var vals = value.toString().split(',');
cellInfoEx[r][c] = { vals:vals, cellCaptionH:cellCaptionH};
colMaxWidths[c] = width / 10;
break;
case 'trendBars':
var vals = value.toString().split(',');
cellInfoEx[r][c] = { vals:vals, cellCaptionH:cellCaptionH};
colMaxWidths[c] = width / 10;
break;
case 'arrow':
if (minValue < 0) {
var arrowValue = (isNaN(parseFloat(value))) ? 0 : ((parseFloat(value))/maxValue);
}
else {
var arrowValue = (isNaN(parseFloat(value))) ? 0 : ((parseFloat(value)-minValue)/maxValue);
}
if (!isNaN(parseFloat(arrowValue)) && parseFloat(arrowValue)!=0) {
var path = this.document.createElementNS(SVGNS,'path');
path.setAttribute('class','scoreCardArrow');
path.setAttribute('style',this.arrowStyle + colStyle);
var cx = (rowHeight-cellCaptionH)*0.5;
var p1 = (rowHeight-cellCaptionH)*(0.5-(parseFloat(this.arrowSize)/2));
var p2 = (rowHeight-cellCaptionH)*(0.5+(parseFloat(this.arrowSize)/2));
if (parseFloat(arrowValue)>0) {
var d = 'M '+cx+' '+p1+' L '+p1+' '+p2+' '+p2+' '+p2+' z'; // up
}
else {
var d = 'M '+cx+' '+p2+' L '+p1+' '+p1+' '+p2+' '+p1+' z'; // down
}
path.setAttribute('d',d);
svg.appendChild(path);
path.addEventListener('click',eventHandler,false);
cellInfoEx[r][c] = { shape: path, width:cx*2 };
}
colMaxWidths[c] = rowHeight;
break;
case 'lamp':
case 'lamp-value':
if (maxValue < 0) {
var lampValue = (isNaN(parseFloat(value))) ? 0 : -((parseFloat(value))/maxValue);
}
else {
var lampValue = (isNaN(parseFloat(value))) ? 0 : ((parseFloat(value))/maxValue);
}
if (!isNaN(parseFloat(lampValue)) && parseFloat(lampValue)!=0) {
var g = this.document.createElementNS(SVGNS,'g');
svg.appendChild(g);
var lamp = this.document.createElementNS(SVGNS,'circle');
lamp.setAttribute('class','scoreCardLamp');
if (lampValue > 0) {
var lcr = (this.lampColor == "") ? '#80F080' : this.lampColor;
}
else {
var lcr = (this.lampColorNeg == "") ? '#F08080' : this.lampColorNeg;
lampValue = -lampValue;
}
var ls = 'fill:'+lcr+';';
lamp.setAttribute('fill-opacity',lampValue);
var rad = ((rowHeight-cellCaptionH)*0.5*parseFloat(this.lampSize));
lamp.setAttribute('cx',rad);
lamp.setAttribute('cy',((rowHeight-cellCaptionH)*0.5));
lamp.setAttribute('r',rad);
if (''!=colStyle) {
ls = ls + colStyle;
}
lamp.setAttribute('style',ls);
g.appendChild(lamp);
lamp.addEventListener('click',eventHandler,false);
var text = null;
if (display=='lamp-value') {
text = this.document.createElementNS(SVGNS,'text');
text.setAttribute('class',this.cardSize=='big' ? 'scoreCardValueBig' : 'scoreCardValue');
text.setAttribute('style',this.lampLabelStyle);
text.setAttribute('text-anchor','middle');
var textNode = this.document.createTextNode(valueFmt);
text.appendChild(textNode);
g.appendChild(text);
var tw = zenGetBBox(text).width*1.2;
var th = zenGetBBox(text).height;
text.setAttribute('x',rad);
text.setAttribute('y',((rowHeight-cellCaptionH)*0.5)+((th*0.7)/2));
if (tw>(rad*1.8)) {
var oldNode = text.firstChild;
text.removeChild(oldNode);
textNode = this.document.createTextNode('#');
text.appendChild(textNode);
text.setAttribute('style',this.lampLabelStyle+'font-size:10px;');
var th = zenGetBBox(text).height;
text.setAttribute('y',((rowHeight-cellCaptionH)*0.5)+((th*0.7)/2));
}
}
cellInfoEx[r][c] = { shape: g, width:rad*2 };
}
colMaxWidths[c] = rowHeight;
break;
case 'plotBox':
var range = (maxValue-minValue);
if (range == 0) break;
var outerX = 95;
var middleX = (isNaN(parseFloat(thresholdUpper))) ? 0 : ((parseFloat(thresholdUpper)-minValue)/range)*outerX;
var innerX = (isNaN(parseFloat(thresholdLower))) ? 0 : ((parseFloat(thresholdLower)-minValue)/range)*outerX;
var targetX = (isNaN(parseFloat(targetValue))) ? 0 : ((parseFloat(targetValue)-minValue)/range)*outerX;
if ('' === baseValue) {
var valueX1 = 0;
var valueX2 = (isNaN(parseFloat(value))) ? 0 : ((parseFloat(value)-minValue)/range)*outerX;
}
else {
var valueX1 = (isNaN(parseFloat(baseValue))) ? 0 : ((parseFloat(baseValue)-minValue)/range)*outerX;
var valueX2 = (isNaN(parseFloat(value))) ? 0 : ((parseFloat(value)-minValue)/range)*outerX;
}
if (r==0) {
plotMinValues[c] = minValue;
plotMaxValues[c] = maxValue;
plotBaseValues[c] = baseValue;
}
cellInfoEx[r][c] = {
outerX:outerX,
middleX:middleX,
innerX:innerX,
targetX:targetX,
valueX1:valueX1,
valueX2:valueX2,
cellCaptionH:cellCaptionH,
eventHandler:eventHandler };
break;
case 'label':
var text = this.document.createElementNS(SVGNS,'text');
text.setAttribute('class',this.cardSize=='big' ? 'scoreCardLabelBig' : 'scoreCardLabel');
text.setAttribute('style',this.labelStyle + colStyle);
text.setAttribute('x',0);
text.setAttribute('y',((rowHeight-cellCaptionH)*0.8));
if (align=='right') {
text.setAttribute('x','95%');
text.setAttribute('text-anchor','end');
}
else if (align=='center') {
text.setAttribute('x','50%');
text.setAttribute('text-anchor','middle');
}
var textNode = this.document.createTextNode(label);
text.appendChild(textNode);
svg.appendChild(text);
var tw = zenGetBBox(text).width *1.2;
var th = zenGetBBox(text).height;
colMaxWidths[c] = (null == colMaxWidths[c] || tw > colMaxWidths[c]) ? tw : colMaxWidths[c];
cellInfoEx[r][c] = { text: text, height:th, cellCaptionH:cellCaptionH };
break;
case 'value':
case 'itemNo':
default:
var text = this.document.createElementNS(SVGNS,'text');
text.setAttribute('class',this.cardSize=='big' ? 'scoreCardValueBig' : 'scoreCardValue');
text.setAttribute('style',this.valueLabelStyle + colStyle);
text.setAttribute('y',((rowHeight-cellCaptionH)*0.8));
if (align=='left') {
text.setAttribute('x','5%');
text.setAttribute('text-anchor','start');
}
else if (align=='center') {
text.setAttribute('x','50%');
text.setAttribute('text-anchor','middle');
}
else {
text.setAttribute('x','95%');
text.setAttribute('text-anchor','end');
}
if ('itemNo'==display) {
var itemFmt = format ? zenFormatNumber(itemNo,format):(itemNo+".");
var textNode = this.document.createTextNode(itemFmt);
}
else {
var textNode = this.document.createTextNode(valueFmt);
}
text.appendChild(textNode);
svg.appendChild(text);
var tw = zenGetBBox(text).width*1.2;
var th = zenGetBBox(text).height;
colMaxWidths[c] = (null == colMaxWidths[c] || tw > colMaxWidths[c]) ? tw : colMaxWidths[c];
cellInfoEx[r][c] = { text: text, height:th,cellCaptionH:cellCaptionH };
break;
}
if ('hidden' != display) {
x += parseFloat(colWidth) + padding;
}
} // row
}
var footerBoxes = null;
if (hasFooter) {
var rect = this.document.createElementNS(SVGNS,'rect');
rect.setAttribute('class',rowCount%2?'scoreCardRowEven':'scoreCardRowOdd');
rect.setAttribute('x',0);
rect.setAttribute('y',y);
rect.setAttribute('width',this.width);
rect.setAttribute('height',rowHeight);
this.svgGroup.appendChild(rect);
var line = this.document.createElementNS(SVGNS,'line');
line.setAttribute('x1',0);
line.setAttribute('x1',this.width);
line.setAttribute('y1',y);
line.setAttribute('y2',y);
line.setAttribute('class','scoreCardSeparator');
line.setAttribute('style',this.gridStyle);
this.svgGroup.appendChild(line);
var summaryData = {};
for (var c = 0; c < columnDefs.length; c++) {
var column = columnDefs[c];
if ('' !== column.label) {
var lu = column.label.toString().toUpperCase();
summaryData[lu] = [summaryValues[c]];
}
}
var x = marginLeft;
footerBoxes = new Array(columnDefs.length);
for (var c = 0; c < columnDefs.length; c++) {
var column = columnDefs[c];
var align = column.align;
var hdrAlign = column.headerAlign;
if ('hidden' != column.display) {
var footerValue = '';
if (''!==column.summary) {
footerValue = (null==summaryValues[c])?'':summaryValues[c];
if ('avg'==column.summary) {
footerValue = (rowCount>0) ? footerValue/rowCount : 0;
}
else if ('value'==column.summary) {
var v = this.evaluate(column.summaryValue,summaryData,0);
if (''!==v && !isNaN(v)) {
footerValue = v;
}
}
}
if ('' !== footerValue) {
if ('target%' == column.showAs || 'sum%' == column.showAs) {
var format = (''===column.format) ? '#,#.##%' : column.format;
}
else {
var format = (''===column.format) ? '#,#' : column.format;
}
var valueFmt = zenFormatNumber(footerValue,format);
var svg = this.document.createElementNS(SVGNS,'svg');
this.svgGroup.appendChild(svg);
footerBoxes[c] = svg;
var footer = this.document.createElementNS(SVGNS,'text');
footer.setAttribute('class',this.cardSize=='big' ? 'scoreCardLabelBig' : 'scoreCardLabel');
footer.setAttribute('y',(rowHeight*0.75));
footer.setAttribute('x','95%');
if (align=='left') {
footer.setAttribute('x','5%');
footer.setAttribute('text-anchor','start');
}
else if (align=='center') {
footer.setAttribute('x','50%');
footer.setAttribute('text-anchor','middle');
}
else {
footer.setAttribute('x','95%');
footer.setAttribute('text-anchor','end');
}
footer.setAttribute('style','font-weight:bold;');
var textNode = this.document.createTextNode(valueFmt);
footer.appendChild(textNode);
svg.appendChild(footer);
var tw = zenGetBBox(footer).width * 1.2;
colHeaderWidths[c] = (null == colHeaderWidths[c] || tw > colHeaderWidths[c]) ? tw : colHeaderWidths[c];
svg.setAttribute('x',x);
svg.setAttribute('y',y);
svg.setAttribute('width',colWidth + 'px');
svg.setAttribute('height',rowHeight + 'px');
footer.setAttribute('y',rowHeight - 3);
}
x += parseFloat(colWidth) + padding;
}
}
y += rowHeight;
}
var colWidths = new Array(columnDefs.length);
var budget = width * 0.9;
var unbudgeted = 0;
for (var c = 0; c < columnDefs.length; c++) {
var column = columnDefs[c];
if ('hidden' == column.display) {
colWidths[c] = 0;
}
else {
var w = parseFloat(column.width);
if (isNaN(w)) {
if (null == colMaxWidths[c]) {
unbudgeted++;
}
else {
w = colMaxWidths[c];
if ('number'!=typeof w) {
w = 0;
}
w = (null!=colHeaderWidths[c] && w<colHeaderWidths[c]) ? colHeaderWidths[c] : w;
w = (w<0) ? 0 : w;
colWidths[c] = w;
budget -= w;
}
}
else if(column.width.toString().indexOf('%') > 0) {
w = (w/100) * width;
w = (w<0) ? 0 : w;
colWidths[c] = w;
budget -= w;
}
else {
w = (w<0) ? 0 : w;
colWidths[c] = w;
budget -= w;
}
}
}
budget = budget < 0 ? 0 : budget;
if (unbudgeted > 0) {
for (var c = 0; c < columnDefs.length; c++) {
if (null == colWidths[c]) {
colWidths[c] = budget / unbudgeted;
colWidths[c] = (colWidths[c] < (width/3)) ? colWidths[c] : width/3;
colWidths[c] = (colWidths[c] > 20) ? colWidths[c] : 20;
}
}
}
var x = padding/2;
for (var c = 0; c < headerBoxes.length; c++) {
var svg = headerBoxes[c];
if (svg) {
svg.setAttribute('x',x);
svg.setAttribute('width',colWidths[c]);
for (var hn = 0; hn < svg.childNodes.length; hn++) {
var anc = svg.childNodes[hn] ? svg.childNodes[hn].getAttribute('text-anchor') : '';
if (anc=='end') {
svg.childNodes[hn].setAttribute('x',colWidths[c]);
}
else if (anc=='middle') {
svg.childNodes[hn].setAttribute('x',colWidths[c]/2);
}
}
}
var svg = footerBoxes ? footerBoxes[c] : null;
if (svg) {
svg.setAttribute('x',x);
svg.setAttribute('width',colWidths[c]);
for (var hn = 0; hn < svg.childNodes.length; hn++) {
var anc = svg.childNodes[hn] ? svg.childNodes[hn].getAttribute('text-anchor') : '';
if (anc=='end') {
svg.childNodes[hn].setAttribute('x',colWidths[c]);
}
else if (anc=='middle') {
svg.childNodes[hn].setAttribute('x',colWidths[c]/2);
}
}
}
/*
var drect = this.document.createElementNS(SVGNS,'rect');
drect.setAttribute('style','fill: none; stroke:red;');
drect.setAttribute('x',x);
drect.setAttribute('y',20);
drect.setAttribute('width',colWidths[c] + 'px');
drect.setAttribute('height',10 + 'px');
this.svgGroup.appendChild(drect);
*/
if (colWidths[c] > 0) {
x += colWidths[c] + padding;
}
}
for (var r = 0; r < rowCells.length; r++) {
var x = padding/2;
for (var c = 0; c < rowCells[r].length; c++) {
var svg = rowCells[r][c];
if (svg) {
svg.setAttribute('x',x);
svg.setAttribute('width',colWidths[c]);
for (var hn = 0; hn < svg.childNodes.length; hn++) {
var anc = svg.childNodes[hn] ? svg.childNodes[hn].getAttribute('text-anchor') : '';
if (anc=='end') {
svg.childNodes[hn].setAttribute('x',colWidths[c]);
}
else if (anc=='middle') {
svg.childNodes[hn].setAttribute('x',colWidths[c]/2);
}
}
}
var column = columnDefs[c];
var colStyle = column.style;
var display = column.display;
var	cellScaleX = parseInt(colWidths[c])/100;
var align = column.align;
if (cellInfoEx && cellInfoEx[r] && cellInfoEx[r][c]) {
switch(display) {
case 'label':
case 'value':
case 'itemNo':
default:
var text = cellInfoEx[r][c].text;
var hgt = cellInfoEx[r][c].height;
var cellCaptionH = zenGet(cellInfoEx[r][c].cellCaptionH);
cellCaptionH = cellCaptionH ? cellCaptionH : 0;
if (text && hgt) {
text.setAttribute('y',(rowHeight/2)+(hgt*0.35)-(cellCaptionH/2));
}
break;
case 'lamp':
case 'lamp-value':
case 'arrow':
var shape = cellInfoEx[r][c].shape;
var wid = cellInfoEx[r][c].width;
var text = cellInfoEx[r][c].text;
if (shape && wid) {
var dx = 0;
switch(align) {
case 'right':
dx = colWidths[c] - wid;
break;
case 'center':
dx = colWidths[c]/2 - wid/2;
break;
}
shape.setAttribute('transform','translate('+dx+',0)');
}
break;
case 'trendLine':
var vals = cellInfoEx[r][c].vals;
var path = this.document.createElementNS(SVGNS,'path');
path.setAttribute('class','scoreCardTrendLine');
path.setAttribute('style',this.trendLineStyle + colStyle);
svg.appendChild(path);
var cellCaptionH = cellInfoEx[r][c].cellCaptionH;
var cellScaleY = parseInt(rowHeight-cellCaptionH)/100;
var tlPct = parseFloat(this.trendLineHeight);
var tlBot = 50 + (50 * tlPct);
var tlHeight = (100 * tlPct);
var min = null;
var max = null;
for (var j = 0; j < vals.length; j++) {
var v = parseFloat(vals[j]);
if (!isNaN(v)) {
min = (min==null || v < min) ? v : min;
max = (max==null || v > max) ? v : max;
}
}
var d = '';
if (vals.length > 1 && min!=null && max!=null && max>min) {
var px = 0;
var seg = 100 / (vals.length-1);
var inSegment = 0;		// DTB106
var start = 0;			// DTB106
for (var j = 0; j < vals.length; j++) {
var v = parseFloat(vals[j]);
if (!isNaN(v)) {
v = Math.round(tlBot - (tlHeight*((v - min) / (max - min))));
if (!inSegment) {
inSegment = 1;
start = j
d += d.length ? ' ' : '';
d += 'M ' + (px*cellScaleX).toFixed(2) + ' ' + (v*cellScaleY);
}
else {
if (j-1 == start) {
d += ' L';
}
d += ' ' + (px*cellScaleX).toFixed(2) + ' ' + (v*cellScaleY);
}
}
else {
inSegment = 0;
}
px += seg;
}
}
if (vals.length == 1 && min!=null && max!=null && max>min) {
var v = parseFloat(vals[0]);
if (!isNaN(v)) {
v = Math.round(tlBot - (tlHeight*((v - min) / (max - min))));
d = 'M 0 ' + (v*cellScaleY) + ' L '+(100*cellScaleX)+' ' + (v*cellScaleY);
}
}
path.setAttribute('d',d);
break;
case 'trendBars':
var vals = cellInfoEx[r][c].vals;
var cellCaptionH = cellInfoEx[r][c].cellCaptionH;
var cellScaleY = parseInt(rowHeight-cellCaptionH)/100;
var tbPct = parseFloat(this.trendBarsHeight);
var tbBot = 50 + (50 * tbPct);
var tbHeight = (100 * tbPct);
var min = null;
var max = null;
for (var j = 0; j < vals.length; j++) {
var v = parseFloat(vals[j]);
if (!isNaN(v)) {
min = (min==null || v < min) ? v : min;
max = (max==null || v > max) ? v : max;
}
}
var d = '';
if (vals.length > 0 && min!=null && max!=null && max>min) {
var px = 0;
var seg = 100 / (vals.length);
for (var j = 0; j < vals.length; j++) {
var v = parseFloat(vals[j]);
if (!isNaN(v)) {
v = Math.round(tbBot - (tbHeight*((v - min) / (max - min))));
var bar = this.document.createElementNS(SVGNS,'rect');
bar.setAttribute('class','scoreCardTrendBars');
bar.setAttribute('style',this.trendBarsStyle + colStyle);
bar.setAttribute('x',Math.round(px*cellScaleX));
bar.setAttribute('y',Math.round(v*cellScaleY));
bar.setAttribute('width',Math.round(seg*cellScaleX) - (seg>2?2:0));
var bh = tbHeight-v;
bh = (bh<0) ? 0 : bh;
bar.setAttribute('height',Math.round(bh*cellScaleY)+0.5);
svg.appendChild(bar);
}
px += seg;
}
}
break;
case 'plotBox':
var innerX = cellInfoEx[r][c].innerX;
var middleX = cellInfoEx[r][c].middleX;
var outerX = cellInfoEx[r][c].outerX;
var targetX = cellInfoEx[r][c].targetX;
var valueX1 = cellInfoEx[r][c].valueX1;
var valueX2 = cellInfoEx[r][c].valueX2;
var eventHandler = cellInfoEx[r][c].eventHandler;
var cellCaptionH = cellInfoEx[r][c].cellCaptionH;
var cellScaleY = parseInt(rowHeight-cellCaptionH)/100;
var boxPct = parseFloat(this.plotBoxHeight);
var boxTop = 50 - (50 * boxPct);
var boxHeight = (100 * boxPct);
var outerBox = this.document.createElementNS(SVGNS,'rect');
outerBox.setAttribute('class','scoreCardPlotBoxOuter');
outerBox.setAttribute('style',this.plotBoxStyle);
outerBox.setAttribute('x',Math.round(0*cellScaleX));
outerBox.setAttribute('y',Math.round(boxTop*cellScaleY));
outerBox.setAttribute('width',Math.round(outerX*cellScaleX));
outerBox.setAttribute('height',Math.round(boxHeight*cellScaleY));
svg.appendChild(outerBox);
outerBox.addEventListener('click',eventHandler,false);
if (middleX > 0) {
var middleBox = this.document.createElementNS(SVGNS,'rect');
middleBox.setAttribute('class','scoreCardPlotBoxMiddle');
middleBox.setAttribute('style',this.plotBoxMidStyle);
middleBox.setAttribute('x',Math.round(innerX*cellScaleX));
middleBox.setAttribute('y',Math.round(boxTop*cellScaleY));
middleBox.setAttribute('width',Math.round((middleX - innerX)*cellScaleX));
middleBox.setAttribute('height',Math.round(boxHeight*cellScaleY));
svg.appendChild(middleBox);
middleBox.addEventListener('click',eventHandler,false);
}
if (innerX > 0) {
var innerBox = this.document.createElementNS(SVGNS,'rect');
innerBox.setAttribute('class','scoreCardPlotBoxInner');
innerBox.setAttribute('style',this.plotBoxLowerStyle);
innerBox.setAttribute('x',0);
innerBox.setAttribute('y',Math.round(boxTop*cellScaleY));
innerBox.setAttribute('width',Math.round(innerX*cellScaleX));
innerBox.setAttribute('height',Math.round(boxHeight*cellScaleY));
svg.appendChild(innerBox);
innerBox.addEventListener('click',eventHandler,false);
}
if (valueX2 >= 0 && valueX1 <= 100) {
var valueBox = this.document.createElementNS(SVGNS,'path');
valueBox.setAttribute('class','scoreCardPlotBoxValue');
if (valueX2 >= valueX1) {
valueBox.setAttribute('style',this.plotBoxValueStyle + colStyle);
}
else {
valueBox.setAttribute('style',this.plotBoxValueStyleNeg + colStyle);
}
var vboxPct = parseFloat(this.plotBoxValueHeight);
var vboxTop = 50 - (50 * vboxPct);
var vboxBottom = 50 + (50 * vboxPct);
valueX1 = valueX1 < 0 ? 0 : valueX1;
if (valueX2 > outerX) {
var d = 'M '+Math.round(valueX1*cellScaleX)+' '+Math.round(vboxTop*cellScaleY)+' L '+Math.round((outerX+4)*cellScaleX)+' '+Math.round(vboxTop*cellScaleY)+' '+Math.round((outerX+2)*cellScaleX)+' '+Math.round(50*cellScaleY)+' '+Math.round((outerX+4)*cellScaleX)+' '+Math.round(50*cellScaleY)+' '+Math.round((outerX+2)*cellScaleX)+' '+Math.round(vboxBottom*cellScaleY)+' '+Math.round(valueX1*cellScaleX)+' '+Math.round(vboxBottom*cellScaleY)+' z';
}
else {
var d = 'M '+Math.round(valueX1*cellScaleX)+' '+Math.round(vboxTop*cellScaleY)+' L '+Math.round(valueX2*cellScaleX)+' '+Math.round(vboxTop*cellScaleY)+' '+Math.round(valueX2*cellScaleX)+' '+Math.round(vboxBottom*cellScaleY)+' '+Math.round(valueX1*cellScaleX)+' '+Math.round(vboxBottom*cellScaleY)+' z';
}
valueBox.setAttribute('d',d);
svg.appendChild(valueBox);
valueBox.addEventListener('click',eventHandler,false);
}
if (targetX > 0) {
var target = this.document.createElementNS(SVGNS,'line');
target.setAttribute('class','scoreCardPlotBoxTarget');
target.setAttribute('style',this.targetLineStyle);
target.setAttribute('x1',Math.round(targetX*cellScaleX));
target.setAttribute('x2',Math.round(targetX*cellScaleX));
target.setAttribute('y1',Math.round((boxTop+5)*cellScaleY));
target.setAttribute('y2',Math.round((boxTop+boxHeight-5)*cellScaleY));
svg.appendChild(target);
}
break;
} // end switch(display)
}
if (colWidths[c] > 0) {
x += colWidths[c] + padding;
}
}
}
this.cardHeight = y;
if (hasScale) {
var x = padding/2;
for (var c = 0; c < columnDefs.length; c++) {
var column = columnDefs[c];
if ('plotBox' == column.display && ('undefined'!=typeof plotMinValues[c]) && ('undefined'!=typeof plotMaxValues[c])) {
var scale = this.document.createElementNS(SVGNS,'path');
scale.setAttribute('class','scoreCardScale');
var sx1 = x;
var sx2 = x + (colWidths[c]*0.95);
var sy1 = y - rowHeight + 2;
var sy2 = y - rowHeight + 8;
var baseValue = (plotBaseValues[c]!=null) ? plotBaseValues[c] : '';
var sxb = '';
if ('' !== baseValue) {
sxb = x + ((baseValue-plotMinValues[c])/(plotMaxValues[c]-plotMinValues[c])*(colWidths[c]*0.95));
}
var path = "M " + sx1 + ' ' + sy1 + ' L ' + sx2 + ' ' + sy1;
path += "M " + sx1 + ' ' + sy1 + ' L ' + sx1 + ' ' + sy2;
path += "M " + sx2 + ' ' + sy1 + ' L ' + sx2 + ' ' + sy2;
if (''!==sxb) {
path += "M " + sxb + ' ' + sy1 + ' L ' + sxb + ' ' + sy2;
}
else {
for (var t = 1; t < 4; t++) {
var tx = (sx2-sx1) * (t/4) + sx1;
path += "M " + tx + ' ' + sy1 + ' L ' + tx + ' ' + sy2;
}
}
scale.setAttribute('d',path);
this.svgGroup.appendChild(scale);
var format = ''===column.format ? "#,#" : column.format;
var minv = zenFormatNumber(plotMinValues[c],format);
var maxv = zenFormatNumber(plotMaxValues[c],format);
if (''===baseValue) {
var lt = [{x:sx1,text:minv},{x:sx2,text:maxv}];
}
else {
var basev = zenFormatNumber(baseValue,format);
var lt = [{x:sx1,text:minv},{x:sx2,text:maxv},{x:sxb,text:basev}];
}
for (var n = 0; n < lt.length; n++) {
var slabel = this.document.createElementNS(SVGNS,'text');
slabel.setAttribute('class','scoreCardScaleLabel');
slabel.setAttribute('text-anchor','middle');
var textNode = this.document.createTextNode(lt[n].text);
slabel.appendChild(textNode);
this.svgGroup.appendChild(slabel);
var th = zenGetBBox(title).height;
slabel.setAttribute('x',lt[n].x);
slabel.setAttribute('y',y - rowHeight + 17);
}
}
if (colWidths[c] > 0) {
x += colWidths[c] + padding;
}
}
}
this.setProperty("height",this.cardHeight ? this.cardHeight : 0);
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in scoreCard.renderScoreCard');
}
this._dataMinValue = null;
this._dataMaxValue = null;
this._dataCount = null;
this._dataSum = null;
}

self._DeepSee_Component_SVG_scoreCard_rowClickHandler = function(evt,row) {
evt.stopPropagation();
this.selectRow(row);
var value = (this._rowValues ? (this._rowValues[row]?this._rowValues[row]:'') : '');
zenInvokeCallbackMethod(this.onclickrow,this,'onclickrow','row',row,'value',value);
}

self._DeepSee_Component_SVG_scoreCard_selectRow = function(row) {
if (this.selectedIndex >= 0) {
var rect = this.findSVGElement('row_'+this.selectedIndex);
if (rect) {
rect.setAttribute('class',this.selectedIndex%2?'scoreCardRowEven':'scoreCardRowOdd');
if (this.selectedIndex%2==0) {
rect.setAttribute('style',this.stripeStyle);
}
}
}
this.selectedIndex = row;
if (this.selectedIndex >= 0) {
var rect = this.findSVGElement('row_'+this.selectedIndex);
if (rect) {
rect.setAttribute('class','scoreCardRowSelected');
rect.setAttribute('style','');
}
}
}

self._DeepSee_Component_SVG_scoreCard_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._DeepSee_Component_SVG_scoreCard_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._DeepSee_Component_SVG_scoreCard_setProperty = function(property,value,value2) {
switch(property) {
case 'headersVisible':
case 'footersVisible':
case 'titleVisible':
case 'cardSize':
case 'rowHeight':
case 'cellCaptionStyle':
case 'lampLabelStyle':
case 'plotBoxStyle':
case 'plotBoxValueStyle':
case 'plotBoxValueStyleNeg':
case 'plotBoxLowerStyle':
case 'plotBoxMidStyle':
case 'arrowStyle':
case 'lampColor':
case 'lampColorNeg':
case 'trendLineStyle':
case 'trendBarsStyle':
case 'targetLineStyle':
case 'columnHeaderStyle':
case 'trendLineHeight':
case 'trendBarsHeight':
case 'plotBoxHeight':
case 'plotBoxValueHeight':
case 'lampSize':
case 'arrowSize':
case 'onclickrow':
case 'titleImage':
case 'titleImageStyle':
this[property] = value;
this.render();
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}
self._DeepSee_Component_SVG_scoreCard__Loader = function() {
	zenLoadClass('_ZEN_SVGComponent_chart');
	_DeepSee_Component_SVG_scoreCard.prototype = zenCreate('_ZEN_SVGComponent_chart',-1);
	var p = _DeepSee_Component_SVG_scoreCard.prototype;
	if (null==p) {return;}
	p.constructor = _DeepSee_Component_SVG_scoreCard;
	p.superClass = ('undefined' == typeof _ZEN_SVGComponent_chart) ? zenMaster._ZEN_SVGComponent_chart.prototype:_ZEN_SVGComponent_chart.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%DeepSee.Component.SVG.scoreCard';
	p._type = 'scoreCard';
	p.serialize = _DeepSee_Component_SVG_scoreCard_serialize;
	p.getSettings = _DeepSee_Component_SVG_scoreCard_getSettings;
	p.connectToController = _DeepSee_Component_SVG_scoreCard_connectToController;
	p.disconnectFromController = _DeepSee_Component_SVG_scoreCard_disconnectFromController;
	p.evaluate = _DeepSee_Component_SVG_scoreCard_evaluate;
	p.getAvgValue = _DeepSee_Component_SVG_scoreCard_getAvgValue;
	p.getController = _DeepSee_Component_SVG_scoreCard_getController;
	p.getCountValue = _DeepSee_Component_SVG_scoreCard_getCountValue;
	p.getMaxValue = _DeepSee_Component_SVG_scoreCard_getMaxValue;
	p.getMinValue = _DeepSee_Component_SVG_scoreCard_getMinValue;
	p.getPropName = _DeepSee_Component_SVG_scoreCard_getPropName;
	p.getRowValue = _DeepSee_Component_SVG_scoreCard_getRowValue;
	p.getSumValue = _DeepSee_Component_SVG_scoreCard_getSumValue;
	p.hasAxes = _DeepSee_Component_SVG_scoreCard_hasAxes;
	p.lookup = _DeepSee_Component_SVG_scoreCard_lookup;
	p.notifyView = _DeepSee_Component_SVG_scoreCard_notifyView;
	p.renderContents = _DeepSee_Component_SVG_scoreCard_renderContents;
	p.renderScoreCard = _DeepSee_Component_SVG_scoreCard_renderScoreCard;
	p.rowClickHandler = _DeepSee_Component_SVG_scoreCard_rowClickHandler;
	p.selectRow = _DeepSee_Component_SVG_scoreCard_selectRow;
	p.sendEventToController = _DeepSee_Component_SVG_scoreCard_sendEventToController;
	p.setControllerId = _DeepSee_Component_SVG_scoreCard_setControllerId;
	p.setProperty = _DeepSee_Component_SVG_scoreCard_setProperty;
}
/* EOF */