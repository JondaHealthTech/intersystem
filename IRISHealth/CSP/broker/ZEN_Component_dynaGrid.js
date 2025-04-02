/*** Zen Module: ZEN_Component_dynaGrid ***/

self._zenClassIdx['dynaGrid'] = '_ZEN_Component_dynaGrid';
self._ZEN_Component_dynaGrid = function(index,id) {
	if (index>=0) {_ZEN_Component_dynaGrid__init(this,index,id);}
}

self._ZEN_Component_dynaGrid__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_control__init) ?zenMaster._ZEN_Component_control__init(o,index,id):_ZEN_Component_control__init(o,index,id);
	o.OnCreateDataSet = ''; // encrypted
	o.borders = 'all';
	o.cells = new Array();
	o.columnHeaderStyle = '';
	o.columnWidth = '100';
	o.columns = new Array();
	o.controller = '';
	o.controllerId = '';
	o.currColumn = '1';
	o.currPage = '1';
	o.currRow = '1';
	o.dataSet = null;
	o.editLabels = false;
	o.format = '';
	o.gridClass = 'dynaGrid';
	o.gridLabel = '';
	o.multiSelect = false;
	o.nowrap = true;
	o.onarrowclick = '';
	o.onchangecell = '';
	o.onchangepage = '';
	o.onclickcolumn = '';
	o.onclicklabel = '';
	o.onclickrow = '';
	o.ondblclick = '';
	o.ondrawcell = '';
	o.oneditcell = '';
	o.oneditkeydown = '';
	o.oneditkeyup = '';
	o.ongetcellvalue = '';
	o.ongetcontroller = '';
	o.onnotifyView = '';
	o.onrender = '';
	o.onselectcell = '';
	o.rowHeaderStyle = '';
	o.rowLabelWidth = '100';
	o.rows = new Array();
	o.scrollIntoView = true;
	o.selectedCellBackground = 'rgb(47,98,128)';
	o.selectedCellColor = 'white';
	o.selectedRange = '';
	o.selectedRangeBackground = 'rgb(87,138,168)';
	o.showArrows = false;
	o.showColumnLabels = true;
	o.showRowLabels = true;
	o.showZebra = false;
	o.style = '';
	o.onCreate();
}
function _ZEN_Component_dynaGrid_serialize(set,s)
{
	var o = this;s[0]='1830897643';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.OnCreateDataSet;s[7]=o.align;s[8]=o.aux;s[9]=o.borders;s[10]=set.serializeList(o,o.cells,true,'cells');s[11]=o.clientType;s[12]=o.columnHeaderStyle;s[13]=o.columnWidth;s[14]=set.serializeList(o,o.columns,true,'columns');s[15]=o.containerStyle;s[16]=o.controlClass;s[17]=o.controlStyle;s[18]=o.controller;s[19]=o.controllerId;s[20]=o.currColumn;s[21]=o.currPage;s[22]=o.currRow;s[23]=o.dataBinding;s[24]=set.addObject(o.dataSet,'dataSet');s[25]=(o.disabled?1:0);s[26]=(o.dragEnabled?1:0);s[27]=(o.dropEnabled?1:0);s[28]=(o.dynamic?1:0);s[29]=(o.editLabels?1:0);s[30]=o.enclosingClass;s[31]=o.enclosingStyle;s[32]=o.error;s[33]=o.format;s[34]=o.gridClass;s[35]=o.gridLabel;s[36]=o.height;s[37]=(o.hidden?1:0);s[38]=o.hint;s[39]=o.hintClass;s[40]=o.hintStyle;s[41]=(o.invalid?1:0);s[42]=o.invalidMessage;s[43]=o.label;s[44]=o.labelClass;s[45]=o.labelDisabledClass;s[46]=o.labelStyle;s[47]=(o.multiSelect?1:0);s[48]=(o.nowrap?1:0);s[49]=o.onafterdrag;s[50]=o.onarrowclick;s[51]=o.onbeforedrag;s[52]=o.onblur;s[53]=o.onchange;s[54]=o.onchangecell;s[55]=o.onchangepage;s[56]=o.onclick;s[57]=o.onclickcolumn;s[58]=o.onclicklabel;s[59]=o.onclickrow;s[60]=o.ondblclick;s[61]=o.ondrag;s[62]=o.ondrawcell;s[63]=o.ondrop;s[64]=o.oneditcell;s[65]=o.oneditkeydown;s[66]=o.oneditkeyup;s[67]=o.onfocus;s[68]=o.ongetcellvalue;s[69]=o.ongetcontroller;s[70]=o.onhide;s[71]=o.onkeydown;s[72]=o.onkeypress;s[73]=o.onkeyup;s[74]=o.onmousedown;s[75]=o.onmouseout;s[76]=o.onmouseover;s[77]=o.onmouseup;s[78]=o.onnotifyView;s[79]=o.onrefresh;s[80]=o.onrender;s[81]=o.onselectcell;s[82]=o.onshow;s[83]=o.onsubmit;s[84]=o.ontouchend;s[85]=o.ontouchmove;s[86]=o.ontouchstart;s[87]=o.onupdate;s[88]=o.onvalidate;s[89]=o.originalValue;s[90]=o.overlayMode;s[91]=(o.readOnly?1:0);s[92]=o.renderFlag;s[93]=(o.required?1:0);s[94]=o.requiredMessage;s[95]=o.rowHeaderStyle;s[96]=o.rowLabelWidth;s[97]=set.serializeList(o,o.rows,true,'rows');s[98]=(o.scrollIntoView?1:0);s[99]=o.selectedCellBackground;s[100]=o.selectedCellColor;s[101]=o.selectedRange;s[102]=o.selectedRangeBackground;s[103]=(o.showArrows?1:0);s[104]=(o.showColumnLabels?1:0);s[105]=(o.showLabel?1:0);s[106]=(o.showRowLabels?1:0);s[107]=(o.showZebra?1:0);s[108]=o.slice;s[109]=o.style;s[110]=o.tabIndex;s[111]=o.title;s[112]=o.tuple;s[113]=o.valign;s[114]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[115]=(o.visible?1:0);s[116]=o.width;
}
function _ZEN_Component_dynaGrid_getSettings(s)
{
	s['name'] = 'string';
	s['borders'] = 'enum:all,none';
	s['columnHeaderStyle'] = 'style';
	s['columnWidth'] = 'length';
	s['controllerId'] = 'id';
	s['currColumn'] = 'integer';
	s['currPage'] = 'integer';
	s['currRow'] = 'integer';
	s['editLabels'] = 'boolean';
	s['format'] = 'string';
	s['gridClass'] = 'cssClass';
	s['gridLabel'] = 'caption';
	s['multiSelect'] = 'boolean';
	s['nowrap'] = 'boolean';
	s['onarrowclick'] = 'eventHandler';
	s['onchangecell'] = 'eventHandler';
	s['onchangepage'] = 'eventHandler';
	s['onclickcolumn'] = 'eventHandler';
	s['onclicklabel'] = 'eventHandler';
	s['onclickrow'] = 'eventHandler';
	s['ondblclick'] = 'eventHandler';
	s['ondrawcell'] = 'eventHandler';
	s['oneditcell'] = 'eventHandler';
	s['oneditkeydown'] = 'eventHandler';
	s['oneditkeyup'] = 'eventHandler';
	s['ongetcellvalue'] = 'eventHandler';
	s['ongetcontroller'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	s['onrender'] = 'eventHandler';
	s['onselectcell'] = 'eventHandler';
	s['rowHeaderStyle'] = 'style';
	s['rowLabelWidth'] = 'length';
	s['scrollIntoView'] = 'boolean';
	s['selectedCellBackground'] = 'style';
	s['selectedCellColor'] = 'style';
	s['selectedRange'] = 'csv';
	s['selectedRangeBackground'] = 'style';
	s['showArrows'] = 'boolean';
	s['showColumnLabels'] = 'boolean';
	s['showRowLabels'] = 'boolean';
	s['showZebra'] = 'boolean';
	s['style'] = 'style';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_dynaGrid_adjustSizes = function() {
try {
var dataSet = this.getDataSet();
var cols = dataSet.getDimSize(2);
var rows = dataSet.getDimSize(1);
var encDiv = this.getEnclosingDiv();
var wrapper = this.findElement("wrapper");
var tbl = this.findElement("table");
var dEdgeW = this.getEdgeWidth(encDiv,0,1,1);
var wEdgeW = this.getEdgeWidth(wrapper,0,1,1);
var tEdgeW = this.getEdgeWidth(tbl,1,1,1);
var colW = parseFloat(this.columnWidth);
var rlW = parseFloat(this.rowLabelWidth);
var defWidth=null;
if (window.getComputedStyle) var defWidth=this.getCSSWidthSpec(encDiv);
else var defWidth=encDiv.currentStyle.width;
var insideW=null;
if (encDiv.offsetWidth>0) var insideW=encDiv.offsetWidth-dEdgeW;
else {
if (!(defWidth.indexOf) || defWidth.indexOf("px")>0) var insideW=parseFloat(defWidth)-dEdgeW;
}
if (this.showRowLabels && insideW && this.rowLabelWidth.indexOf("%")>0) {
rlW = Math.floor(insideW*rlW/100);
}
var cHead=[]; //Array of nodes governing size of individual columns
if (this.showRowLabels) {  // If the first column is row labels, pick it up
if (this.showColumnLabels) {
var th = this.findElement("gridLabel");
if (th) cHead.push(th);
}
else {
var div = this.findElement("thRow_1");
if (div) cHead.push(div);
}
}
for (var c = 0; c < cols; c++) { // now get top cells for all the data columns
if (this.showColumnLabels) {
var th = this.findElement("thCol_"+(c+1));
cHead.push(th);
}
else {
var div = this.findElement("td_1_" + (c+1));
if (div && div.parentNode) {
cHead.push(div.parentNode);
}
else {
cHead.push(null);
}
}
}
var wide = [];
var unit = [];
var sumPercent = 0; // total percentage widths
var sumFixed = 0; // total pixels reserved for the interior of fixed width columns
var edgeSum = 0; // total pixels reserved for cell separators and row labels (if any)
var minWedge = 100; // smallest percentage specified wedge
if (this.showRowLabels) edgeSum = rlW+this.getEdgeWidth(cHead[0],0,1,1);
for (var c = 0; c < cols; c++) {
var cinfo = this.getColumnInfo(c);
if (cinfo && cinfo.hidden) continue;
edgeSum += cHead[c] ? this.getEdgeWidth(cHead[c],0,1,1) : 0;
if (cinfo && !isNaN(parseFloat(cinfo.width))) {
wide[c] = parseFloat(cinfo.width);
unit[c] = cinfo.width.indexOf ? (cinfo.width.indexOf('%')<0) : true;
if (unit[c]) sumFixed += wide[c];
else {
sumPercent+=wide[c];
if (wide[c]<minWedge) minWedge=wide[c];
}
}
else {
if (!isNaN(parseFloat(colW))){
wide[c] = colW;
unit[c] = true;
sumFixed += colW;
} else {
}
}
}
if (sumPercent>0) { // extra processing required
if (sumPercent==100 || sumFixed==0) {
var percentScale = 100 / sumPercent;
if (insideW==null) {
var oneUnit=(colW/(minWedge))*percentScale;
for (var c=0;c<wide.length;c++) {
if (!unit[c]) {
wide[c]=Math.floor(wide[c]*oneUnit);
unit[c]=true;
}
}
}
else {
var space=percentScale*(insideW-edgeSum)/100;
for (var c=0;c<wide.length;c++) {
wide[c]=Math.floor(space*wide[c]);
unit[c]=true;
}
}
}
else {
var oneUnit=sumFixed/(100-sumPercent);
for (var c=0;c<wide.length;c++) {
if (!unit[c]) {
wide[c]=Math.floor(wide[c]*oneUnit);
unit[c]=true;
}
}
}
}
if (this.showRowLabels && insideW==null && this.rowLabelWidth.indexOf("%")>0) {
insideW=0;
for (var c=0;c<wide.length;c++) insideW+=wide[c];
edgeSum -= rlW;
rlW = Math.floor(insideW*rlW/100);
edgeSum += rlW;
}
if (this.showRowLabels) {
cHead[0].style.width=rlW+"px";
var ofs=1;
}
else {
ofs=0;
}
var w=edgeSum;
var dyn=false;
for (var c = 0; c < cols; c++) {
var cinfo = this.getColumnInfo(c);
if ((cinfo && !cinfo.hidden) || !cinfo) {
if (wide[c]<0) wide[c]=0;
if (cHead[ofs] && (!isNaN(wide[c]))) {
cHead[ofs].style.width=wide[c]+"px";
}
if (!isNaN(wide[c])){
w+=wide[c];
} else {
dyn=true;
}
}
ofs++;
}
if (dyn){
wrapper.style.width="100%";
encDiv.style.width="100%";
} else {
wrapper.style.width=(w+(this.showArrows?30:0))+"px";
}
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in adjustSizes.');
}
}

self._ZEN_Component_dynaGrid_arrowHandler = function(which) {
zenInvokeCallbackMethod(this.onarrowclick,this,'onarrowclick','which',which);
}

self._ZEN_Component_dynaGrid_cellClickHandler = function(row,col,evt) {
evt = evt ? evt : window.event;
if (this.multiSelect) {
if (evt.ctrlKey && '' != this.selectedRange) {
var p = this.selectedRange.split(',');
p[0] = (row < p[0]) ? row : p[0];
p[1] = (col < p[1]) ? col : p[1];
p[2] = (row > p[2]) ? row : p[2];
p[3] = (col > p[3]) ? col : p[3];
this.selectCellRange(p[0],p[1],p[2],p[3]);
}
else {
this.selectCellRange(row,col,row,col);
}
}
this.selectCell(row,col,true);
this.focus();
}

self._ZEN_Component_dynaGrid_cellDblClickHandler = function(row,col,evt) {
var edit = true;
if ('' != this.ondblclick) {
edit = zenFireEvent(this.index, this.ondblclick, 'ondblclick', evt);
}
if (edit) {
this.editCell();
}
}

self._ZEN_Component_dynaGrid_cellEditKeyHandler = function(evt) {
evt = evt ? evt : window.event;
var ret = true;
if ('' != this.oneditkeydown) {
ret = zenFireEvent(this.index, this.oneditkeydown, 'oneditkeydown', evt);
if (!ret) {
return false;
}
}
this._modKey = false;
switch(evt.keyCode) {
case zenF2:
ret = false;
this.F2Mode = !this.F2Mode;
break;
case zenUP:
ret = false;
this.stopEditCell(false);
this.moveToCell('up');
this.focus();
break;
case zenDOWN:
ret = false;
this.stopEditCell(false);
this.moveToCell('down');
this.focus();
break;
case zenLEFT:
if (!this.F2Mode) {
ret = false;
this.stopEditCell(false);
this.moveToCell('left');
this.focus();
}
break;
case zenRIGHT:
if (!this.F2Mode) {
ret = false;
this.stopEditCell(false);
this.moveToCell('right');
this.focus();
}
break;
case zenESC:
ret = false;
this.stopEditCell(true);
this.focus();
break;
case zenENTER:
ret = false;
this.stopEditCell(false);
this.focus();
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

self._ZEN_Component_dynaGrid_cellEditKeyUpHandler = function(evt) {
evt = evt ? evt : window.event;
var ret = true;
if ('' != this.oneditkeyup) {
ret = zenFireEvent(this.index, this.oneditkeyup, 'oneditkeyup', evt);
}
return ret;
}

self._ZEN_Component_dynaGrid_columnLabelDblClickHandler = function(col) {
if (this.editLabels) {
this.editCell(null,'column');
}
}

self._ZEN_Component_dynaGrid_columnLabelHandler = function(col) {
this.focus();
this.selectCell(-1,col,true);
if (this.multiSelect) {
this.selectCellRange(1,col,this.getRowCount(),col);
}
zenInvokeCallbackMethod(this.onclickcolumn,this,'onclickcolumn','column',col);
}

self._ZEN_Component_dynaGrid_connectToController = function() {
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

self._ZEN_Component_dynaGrid_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._ZEN_Component_dynaGrid_editCell = function(defval,which) {
var value;
var r = this.currRow;
var c = this.currColumn;
which = ('undefined'==typeof which) ? 'cell' : which;
defval = ('undefined'==typeof defval) ? null : defval;
if ((which=='cell') && !this.isCellEditable(r,c)) {
return;
}
if (r > 0 && c > 0) {
switch(which) {
case 'row':
var div = this.findElement("thRow_"+r);
zenASSERT(div,"Unable to find div element",arguments);
var dataSet = this.getDataSet();
value = (dataSet) ? dataSet.getLabel(r-1,1) : '';
div.innerHTML = this.getEditCellHTML(r,0,value,'row');
break;
case 'column':
var div = this.findElement("thCol_"+c);
zenASSERT(div,"Unable to find div element",arguments);
var dataSet = this.getDataSet();
value = (dataSet) ? dataSet.getLabel(c-1,2) : '';
div.innerHTML = this.getEditCellHTML(0,c,value,'column');
break;
default:
var div = this.findElement("td_"+r + "_" + c);
zenASSERT(div,"Unable to find div element",arguments);
value = (null!=defval) ? defval : this.getCellValue(r,c);
div.innerHTML = this.getEditCellHTML(r,c,value);
break;
}
this.oldOnclick = div.onclick;
div.onclick = '';
this.currDiv = div;
this.currEditType = which;
var style = '';
if (div.parentNode && div.parentNode.style) {
if (div.parentNode.style.fontSize!='') {
style += 'font-size:' + div.parentNode.style.fontSize + ';';
}
if (div.parentNode.style.fontFamily!='') {
style += 'font-family:' + div.parentNode.style.fontFamily + ';';
}
}
var celledit = this.window.document.getElementById("cellEditor");
var w = div.parentNode.offsetWidth-1;
var h = div.parentNode.offsetHeight-(zenIsIE ? 4 : 2);
if (div.parentNode.style.paddingTop) {
var pad = parseInt(div.parentNode.style.paddingTop);
if (!isNaN(pad)) {
h -= pad;
}
}
if (div.parentNode.style.paddingBottom) {
var pad = parseInt(div.parentNode.style.paddingBottom);
if (!isNaN(pad)) {
h -= pad;
}
}
celledit.style.cssText = 'width:'+w+'px;height:'+h+'px;' + style;
this.cellHasFocus = true;
if (celledit.focus) {
celledit.focus();
}
if ('undefined' != typeof value) {
if (celledit.setSelectionRange) {
var ln = value.toString().length;
celledit.setSelectionRange(ln,ln);
}
else { // ie!
var v = celledit.value;
celledit.value = '';
celledit.value = v;
}
}
if (null == defval && celledit.select) {
celledit.select();
}
}
}

self._ZEN_Component_dynaGrid_focus = function() {
var scrollTop,scrollLeft;
if(typeof pageYOffset!= 'undefined'){
scrollTop=pageYOffset;
scrollLeft=pageXOffset;
}
else{
var B= document.body; //IE 'quirks'
var D= document.documentElement; //IE with doctype
D= (D.clientHeight)? D: B;
scrollTop=D.scrollTop;
scrollLeft=D.scrollLeft;
}
var inv = this.findElement('invisible');
var div = this.getEnclosingDiv();
if (inv) {
inv.focus();
}
window.scrollTo(scrollLeft,scrollTop);
}

self._ZEN_Component_dynaGrid_getCSSWidthSpec = function(node) {
try {
var r = [];
r[0]={};
r[0].selectorText="this";
r[0].style=node.style;
var rule=null;
if (node.id!=null) {
var id="#"+node.id;
for(var i=document.styleSheets.length-1;i>=0;i--) {
var s={};
s.ss=document.styleSheets[i];
if (s.ss.href!=null && s.ss.href.indexOf("://")>0) {
if (s.ss.href.indexOf("http")!=0 && s.ss.href.indexOf("file")!=0) continue;
if (window.location && s.ss.href.indexOf(window.location.host)<0) continue;
}
if (s.ss && s.ss.cssRules) s.rules=s.ss.cssRules;
else s.rules=s.ss.rules;
if (!s.rules) continue;
for (var j=s.rules.length-1;j>=0;j--) {
if (s.rules[j].selectorText==id) rule=s.rules[j];
}
}
}
if (rule!=null) r.push(rule);
rule=null;
className="."+node.className;
for(var i=document.styleSheets.length-1;i>=0;i--) {
var s={};
s.ss=document.styleSheets[i];
if (s.ss.href!=null && s.ss.href.indexOf("://")>0) {
if (s.ss.href.indexOf("http")!=0 && s.ss.href.indexOf("file")!=0) continue;
if (window.location && s.ss.href.indexOf(window.location.host)<0) continue;
}
if (s.ss.cssRules) s.rules=s.ss.cssRules;
else s.rules=s.ss.rules;
if (!s.rules) continue;
for (var j=s.rules.length-1;j>=0;j--) {
var selectorText = s.rules[j].selectorText;
if (selectorText && selectorText.indexOf(className)>=0) {
r.push(s.rules[j]);
}
}
}
for (var i=0;i<r.length;i++) {
if (r[i].style.width) return(r[i].style.width);
}
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in getCSSWidthSpec');
}
return("auto");
}

self._ZEN_Component_dynaGrid_getCellContents = function(data,r,c) {
var usercode = '';
if (this.ondrawcell) {
this.row = r;
this.column = c;
usercode = zenInvokeCallbackMethod(this.ondrawcell,this,'ondrawcell','data',data);
delete this.row;
delete this.column;
}
if (usercode && '' != usercode) {
data = usercode;
}
else {
if ('' === data) {
data = '&#160;';
}
else {
data = zenEscapeXML(data);
}
}
return data;
}

self._ZEN_Component_dynaGrid_getCellEditor = function() {
return this.window.document.getElementById("cellEditor");
}

self._ZEN_Component_dynaGrid_getCellInfo = function(page,row,col) {
var cinfo = null;
for (var n = 0; n < this.cells.length; n++) {
var item = this.cells[n];
if (item && (item.page==(page+1)||item.page==='') && item.row == (row+1) && item.column == (col+1)) {
cinfo = item;
break;
}
}
return cinfo;
}

self._ZEN_Component_dynaGrid_getCellProperty = function(pageno,rowno,colno,property) {
if (pageno < 1 || rowno < 1 || colno < 1) return '';
var cinfo = this.getCellInfo(pageno-1,rowno-1,colno-1);
if (null == cinfo) {
return '';
}
return cinfo.getProperty(property);
}

self._ZEN_Component_dynaGrid_getCellValue = function(r,c) {
var dataSet = this.getDataSet();
return zenIsMissing(dataSet) ? '' : dataSet.getData(r-1,c-1,this.currPage-1);
}

self._ZEN_Component_dynaGrid_getColumnCount = function() {
var dataSet = this.getDataSet();
return zenIsMissing(dataSet) ? 0 : dataSet.getDimSize(2);
}

self._ZEN_Component_dynaGrid_getColumnInfo = function(c) {
return this.columns[c];
}

self._ZEN_Component_dynaGrid_getColumnProperty = function(colno,property) {
if (colno < 1) return '';
var cinfo = this.columns[colno-1];
if (null == cinfo) return ''
return cinfo.getProperty(property);
}

self._ZEN_Component_dynaGrid_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._ZEN_Component_dynaGrid_getCurrColumn = function() {
return this.currColumn;
}

self._ZEN_Component_dynaGrid_getCurrRow = function() {
return this.currRow;
}

self._ZEN_Component_dynaGrid_getDataSet = function() {
var controller = this.getController();
return (controller ? controller : this.dataSet);
}

self._ZEN_Component_dynaGrid_getEdgeWidth = function(node,margins,borders,padding) {
var t=0;
try {
if (!node) {
var s = '';
}
else if (node.currentStyle) { // IE Style
var s=node.currentStyle;
}
else { //W3C style
var s=window.getComputedStyle(node,null);
}
if (s==null) {
}
else {
if (margins) {
var x=parseInt(s.marginLeft,10);
if (!isNaN(x)) t+=x;
var x=parseInt(s.marginRight,10);
if (!isNaN(x)) t+=x;
}
if (borders && s.borderStyle!="none") {
var x=parseInt(s.borderRightWidth,10);
if (!isNaN(x)) t+=x;
var x=parseInt(s.borderLeftWidth,10);
if (!isNaN(x)) t+=x;
}
if (padding) {
var x=parseInt(s.paddingRight,10);
if (!isNaN(x)) t+=x;
var x=parseInt(s.paddingLeft,10);
if (!isNaN(x)) t+=x;
}
}
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in getEdgeWidth.');
}
return(t);
}

self._ZEN_Component_dynaGrid_getEditCellHTML = function(r,c,value,which) {
which = ('undefined'==typeof which) ? 'cell' : which;
var html = '';
var usercode = '';
if (this.oneditcell) {
usercode = zenInvokeCallbackMethod(this.oneditcell,this,'oneditcell','value',value,'which',which);
}
if (usercode && '' != usercode) {
html = usercode;
}
else {
html = '<input class="dynaGridInput" id="cellEditor" type="text" value="'+zenEscapeXML(value)+'" onkeydown="zenPage.getComponent('+this.index+').cellEditKeyHandler(event);" onkeyup="zenPage.getComponent('+this.index+').cellEditKeyUpHandler(event);" onblur="zenPage.getComponent('+this.index+').stopEditCell();" />';
}
return html;
}

self._ZEN_Component_dynaGrid_getPageCount = function() {
var dataSet = this.getDataSet();
return zenIsMissing(dataSet) ? 0 : dataSet.getDimSize(3);
}

self._ZEN_Component_dynaGrid_getRowCount = function() {
var dataSet = this.getDataSet();
return zenIsMissing(dataSet) ? 0 : dataSet.getDimSize(1);
}

self._ZEN_Component_dynaGrid_getRowInfo = function(r) {
return this.rows[r];
}

self._ZEN_Component_dynaGrid_getRowProperty = function(rowno,property) {
if (rowno < 1) return '';
var rinfo = this.getRowInfo(rowno-1);
if (null == rinfo) return ''
return rinfo.getProperty(property);
}

self._ZEN_Component_dynaGrid_getSelectedRange = function() {
if (''==this.selectedRange) {
return null;
}
return this.selectedRange.split(',');
}

self._ZEN_Component_dynaGrid_gridKeyBlur = function() {
this.hasFocus = false;
this.selectCell(this.currRow,this.currColumn,false);
}

self._ZEN_Component_dynaGrid_gridKeyDownHandler = function(evt) {
evt = evt ? evt : window.event;
var ret = true;
var row = this.currRow;
var col = this.currColumn;
this._modKey = evt.ctrlKey;
if ('' != this.onkeydown) {
ret = zenFireEvent(this.index, this.onkeydown, 'onkeydown', evt);
if (!ret) return ret;
}
switch(evt.keyCode) {
case zenENTER:
ret = false;
if (this.isCellEditable(row,col)) {
this.editCell();
}
break;
case zenF2:
ret = false;
if (this.isCellEditable(row,col)) {
this.F2Mode = true;
this.editCell();
}
break;
case zenPAGEUP:
case zenPAGEDN:
break;
case zenEND:
ret = false;
this.moveToCell(evt.ctrlKey ? 'ctrl-end' : 'end');
break;
case zenHOME:
ret = false;
this.moveToCell(evt.ctrlKey ? 'ctrl-home' : 'home');
break;
case zenUP:
ret = false;
this.moveToCell('up');
break;
case zenDOWN:
ret = false;
this.moveToCell('down');
break;
case zenLEFT:
ret = false;
this.moveToCell('left');
break;
case zenRIGHT:
ret = false;
this.moveToCell('right');
break;
case zenDELETE:
this.editCell('');
break;
case zenTAB:
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

self._ZEN_Component_dynaGrid_gridKeyFocus = function() {
this.hasFocus = true;
this.selectCell(this.currRow,this.currColumn,false);
}

self._ZEN_Component_dynaGrid_gridKeyPressHandler = function(evt) {
evt = evt ? evt : window.event;
var ret = true;
var row = this.currRow;
var col = this.currColumn;
if ('' != this.onkeypress) {
ret = zenFireEvent(this.index, this.onkeypress, 'onkeypress', evt);
if (!ret) return ret;
}
if (evt.ctrlKey || evt.altKey) {
}
else {
var charCode = (('undefined'==typeof evt.charCode) || (evt.charCode===null)) ? evt.keyCode : evt.charCode;
if (charCode >= 32) {
ret = false;
if (this.isCellEditable(row,col)) {
var seed = charCode ? String.fromCharCode(charCode) : null;
this.editCell(seed);
}
}
}
if (!ret) {
if (evt.preventDefault) {
evt.preventDefault();
}
evt.cancelBubble = true;
}
return ret;
}

self._ZEN_Component_dynaGrid_gridLabelHandler = function() {
this.focus();
zenInvokeCallbackMethod(this.onclicklabel,this,'onclicklabel');
}

self._ZEN_Component_dynaGrid_isCellEditable = function(r,c) {
if (this.disabled) return false;
var rinfo = this.getRowInfo(r-1);
var rro = (null!=rinfo) ? rinfo.readOnly : false;
var rhide = (null!=rinfo) ? rinfo.hidden : false;
var cinfo = this.getColumnInfo(c-1);
var cro = (null!=cinfo) ? cinfo.readOnly : false;
var chide = (null!=cinfo) ? cinfo.hidden : false;
return !this.readOnly && !cro && !rro && !chide && !rhide;
}

self._ZEN_Component_dynaGrid_isCellVisible = function(r,c) {
var rinfo = this.getRowInfo(r-1);
var rhide = (null!=rinfo) ? rinfo.hidden : false;
var cinfo = this.getColumnInfo(c-1);
var chide = (null!=cinfo) ? cinfo.hidden : false;
return !chide && !rhide;
}

self._ZEN_Component_dynaGrid_moveToCell = function(dir) {
var ret = false;
var row = this.currRow;
var col = this.currColumn;
var rowCount = this.getRowCount();
var colCount = this.getColumnCount();
switch(dir) {
case 'up':
row--;
while (row > 0) {
if (this.isCellVisible(row,col)) {
this.selectCell(row,col,true);
ret = true;
break;
}
row--;
}
break;
case 'down':
row++;
while (row <= rowCount) {
if (this.isCellVisible(row,col)) {
this.selectCell(row, col,true);
ret = true;
break;
}
row++;
}
break;
case 'left':
col--;
while (col > 0) {
if (this.isCellVisible(row,col)) {
this.selectCell(row, col,true);
ret = true;
break;
}
col--;
}
break;
case 'right':
col++;
while (col <= colCount) {
if (this.isCellVisible(row,col)) {
this.selectCell(row, col,true);
ret = true;
break;
}
col++;
}
break;
case 'home':
row = 1;
while (row < rowCount) {
if (this.isCellVisible(row,col)) {
this.selectCell(row, col,true);
ret = true;
break;
}
row++;
}
break;
case 'end':
row = rowCount;
while (row > 0) {
if (this.isCellVisible(row,col)) {
this.selectCell(row, col,true);
ret = true;
break;
}
row--;
}
break;
case 'ctrl-home':
col = 1;
while (col < colCount) {
if (this.isCellVisible(row,col)) {
this.selectCell(row, col,true);
ret = true;
break;
}
col++;
}
break;
case 'ctrl-end':
col = colCount;
while (col > 0) {
if (this.isCellVisible(row,col)) {
this.selectCell(row, col,true);
ret = true;
break;
}
col--;
}
break;
}
if (this.multiSelect && ret) {
if (this._modKey && '' != this.selectedRange) {
var p = this.selectedRange.split(',');
p[0] = (row < p[0]) ? row : p[0];
p[1] = (col < p[1]) ? col : p[1];
p[2] = (row > p[2]) ? row : p[2];
p[3] = (col > p[3]) ? col : p[3];
this.selectCellRange(p[0],p[1],p[2],p[3]);
}
else {
this.selectCellRange(row,col,row,col);
}
this._modKey = false;
}
return ret;
}

self._ZEN_Component_dynaGrid_nextPage = function() {
var dataSet = this.getDataSet();
if (dataSet.getDimensions() < 3) {
return;
}
var page = this.getProperty('currPage')*1;
page = (page>=dataSet.getDimSize(3)) ? 1 : (page+1);
if (this.onchangepage!='') {
if (!zenInvokeCallbackMethod(this.onchangepage,this,'onchangepage','page',page)) {
return;
}
}
this.setProperty('currPage',page);
}

self._ZEN_Component_dynaGrid_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._ZEN_Component_dynaGrid_notifyViewHandler = function(reason,data1,data2,data3) {
switch(reason) {
case 'dataChange':
case 'modelChange':
this.render();
break;
case 'seriesChange':
break;
}
}

self._ZEN_Component_dynaGrid_onCreate = function() {
this.currDiv = null;
this.hasFocus = false;
this.cellHasFocus = false;
this.F2Mode = false;
this.currEditType = null;
}

self._ZEN_Component_dynaGrid_previousPage = function() {
var dataSet = this.getDataSet();
if (dataSet.getDimensions() < 3) {
return;
}
var page = this.getProperty('currPage')*1;
page = (page == 1) ? dataSet.getDimSize(3) : (page-1);
if (this.onchangepage!='') {
if (!zenInvokeCallbackMethod(this.onchangepage,this,'onchangepage','page',page)) {
return;
}
}
this.setProperty('currPage',page);
}

self._ZEN_Component_dynaGrid_renderContents = function() {
try {
var controller = this.getController();
if (null == controller) {
this.connectToController();
}
zenInvokeCallbackMethod(this.onrender,this,'onrender');
var encDiv = this.getEnclosingDiv();
if (encDiv == null) return;
var html = new Array();
html[html.length] = '<div id="'+this.makeId('wrapper')+'" class="dynaGridWrapper">';
html[html.length] = '<input type="hidden" id="'+this.makeId('control')+'" name="'+this.name+'" value="'+this.value+'"/>';
var gcls = this.disabled ? 'dynaGridDisabled' : this.gridClass;
html[html.length] = '<table id="'+this.makeId('table')+'" class="'+gcls+'" border="0" cellspacing="0" cellpadding="0">';
var dataSet = this.getDataSet();
var cols = dataSet.getDimSize(2);
if (cols < 2) {
this.F2Mode = true;
}
else {
this.F2Mode = false;
}
if (zenIsMissing(dataSet)) {
html[html.length] = '<tr><td>dynaGrid has no data.</td></tr>';
}
else {
zenASSERT(dataSet.getDimensions()>0,"dataSet must have at least one dimension.",arguments);
var cellInfo = null;
if (this.cells.length) {
cellInfo = [];
for (var k = 0; k < this.cells.length; k++) {
var info = this.cells[k];
var page = parseInt(info.page!==''?info.page:1,10);
var row = parseInt(info.row!==''?info.row:1,10);
var col = parseInt(info.column!==''?info.column:1,10);
if (!cellInfo[page]) {
cellInfo[page] = [];
}
if (!cellInfo[page][row]) {
cellInfo[page][row] = [];
}
cellInfo[page][row][col] = info;
}
}
if (this.showColumnLabels) {
html[html.length] = '<tr>';
if (this.showRowLabels) {
var glbl;
if (dataSet.getDimensions() > 2) {
glbl = dataSet.getLabel(this.currPage-1,3);
glbl = (''==glbl? this.currPage : glbl);
glbl = '<a onclick="zenPage.getComponent('+this.index+').previousPage();">&#171;</a>' + '&#160;' + '<a onclick="zenPage.getComponent('+this.index+').nextPage();">&#187;</a>&#160;' + glbl;
}
else {
glbl = (''==this.gridLabel?'&#160;':this.gridLabel);
}
var glblstyle = this.columnHeaderStyle;
if (this.borders=='none') {
glblstyle += 'border:none;';
}
html[html.length] = '<th nowrap="1" id="gridLabel_'+this.index+'" style="'+glblstyle+'" class="dynaGridLabel"'+'onclick="zenPage.getComponent('+this.index+').gridLabelHandler();">'+glbl+'</th>';
}
for (var c = 0; c < cols; c++) {
var cinfo = this.getColumnInfo(c);
if (cinfo && cinfo.hidden) continue;
var data = cinfo ? cinfo.label : '';
data = ('' == data) ? dataSet.getLabel(c,2) : data;
data = ('' == data) ? '&#160;' : data;
var thstyle = this.columnHeaderStyle;
if (this.borders=="none") {
thstyle += 'border: none;';
}
var thtip = '';
var dbl = 'ondblclick="zenPage.getComponent('+this.index+').columnLabelDblClickHandler('+(c+1)+');"';
html[html.length] = '<th nowrap="1" style="'+thstyle+'" id="thCol_'+(c+1)+'_'+this.index+'" class="dynaGridColumn"'+' '+dbl+' onclick="zenPage.getComponent('+this.index+').columnLabelHandler('+(c+1)+');">' + data + '</th>';
}
if (this.showArrows) {
var rowCount = 2;
for (var r = 0; r < dataSet.getDimSize(1); r++) {
var rinfo = this.getRowInfo(r);
if (rinfo && rinfo.hidden) continue;
rowCount++;
}
html[html.length] = '<td class="dynaGridArrow" style="width: 24px; text-align:center;padding:2px;" rowspan="'+rowCount+'" title="'+$$$Text('Add column')+'" onclick="zenPage.getComponent('+this.index+').arrowHandler(\'columns\');">' + '<input type="image" src="images/arrowBR.png"/>' + '</td>';
}
html[html.length] = '</tr>';
}
for (var r = 0; r < dataSet.getDimSize(1); r++) {
var rinfo = this.getRowInfo(r);
if (rinfo && rinfo.hidden) continue;
var rprio = (null!=rinfo && rinfo.priority!=='') ? parseInt(rinfo.priority,10) : 1;
var rformat = (null!=rinfo&&''!==rinfo.format) ? rinfo.format : this.format;
var rstyle = '';
if (this.borders=="none") {
rstyle += 'border: none;';
}
rstyle += this.style + ((null!=rinfo&&null!=rinfo.style) ? rinfo.style : '');
var rvalue = (null!=rinfo&&null!=rinfo.value) ? rinfo.value : '';
var rtip = (null!=rinfo&&null!=rinfo.title) ? rinfo.title : '';
var rro = (null!=rinfo&&null!=rinfo.readOnly) ? rinfo.readOnly : false;
var rhgt = (null!=rinfo&&null!=rinfo.height) ? (''!=rinfo.height?' height="'+rinfo.height+'"':'') : '';
var rcls = '';
if (this.showZebra) {
rcls = ' class="'+((r%2)?'dynaGridRowOdd':'dynaGridRowEven')+'"';
}
html[html.length] = '<tr'+rhgt+rcls+'>';
if (this.showRowLabels) {
var thstyle = this.rowHeaderStyle;
if (this.borders=="none") {
thstyle += 'border: none;';
}
if (this.showZebra) {
thstyle += 'background: none;';
}
var data = rinfo ? rinfo.label : '';
data = ('' == data) ? dataSet.getLabel(r,1) : data;
data = ('' == data) ? '&#160;' : data;
var dbl = 'ondblclick="zenPage.getComponent('+this.index+').rowLabelDblClickHandler('+(r+1)+');"';
html[html.length] = '<th nowrap="1" style="'+thstyle+'" id="thRow_'+(r+1)+'_'+this.index+'" class="dynaGridRow"'+' '+dbl+' onclick="zenPage.getComponent('+this.index+').rowLabelHandler('+(r+1)+');">' + data + '</th>';
}
for (var c = 0; c < cols; c++) {
var cinfo = this.getColumnInfo(c);
if (cinfo && cinfo.hidden) continue;
var tdstyle = rstyle;
var tdformat = rformat;
var tdvalue = rvalue;
var cprio = 1;
var tdtip = rtip;
var cro = (null!=cinfo) ? cinfo.readOnly : false;
if (null!=cinfo) {
cprio = (cinfo.priority==='') ? 1 : parseInt(cinfo.priority,10);
if ('undefined' != typeof cinfo.value && cinfo.value!=='') {
if (cprio >= rprio) {
tdvalue = cinfo.value;
}
}
if ('undefined' != typeof cinfo.format && cinfo.format!=='') {
if (cprio >= rprio) {
tdformat = cinfo.format;
}
}
if (cprio >= rprio) {
tdstyle = tdstyle + cinfo.style;
}
else {
tdstyle = cinfo.style + tdstyle;
}
if (cprio >= rprio) {
tdtip = (''!=cinfo.title) ? cinfo.title : tdtip;
}
}
var events = ' onclick="zenPage.getComponent('+this.index+').cellClickHandler('+(r+1)+','+(c+1)+',event);" ondblclick="zenPage.getComponent('+this.index+').cellDblClickHandler('+(r+1)+','+(c+1)+',event);"'
var data = dataSet.getData(r,c,this.currPage-1);
if (data==='' && tdvalue!=='') {
data = tdvalue;
}
if (this.ongetcellvalue!='') {
var ndata = zenInvokeCallbackMethod(this.ongetcellvalue,this,'ongetcellvalue','row',r+1,'col',c+1,'data',data);
if (ndata !== null) {
data = ndata;
}
}
var page = 0;
if (cellInfo && cellInfo[page+1]&&cellInfo[page+1][r+1]&&cellInfo[page+1][r+1][c+1]) {
var clinfo = cellInfo[page+1][r+1][c+1];
if (clinfo.style!='') {
tdstyle = clinfo.style;
}
if (clinfo.format!='') {
tdformat = clinfo.format;
}
if(clinfo.title!='') {
tdtip=clinfo.title;
}
}
data = data!==null ? data : '';
data = this.getCellContents(data,r+1,c+1);
if ('' != tdstyle) {
tdstyle = ' style="'+tdstyle+'"';
}
if ('' != tdtip) {
tdtip = ' title="'+tdtip+'"';
}
var cls = (this.currRow == (r+1) && this.currColumn == (c+1)) ? ' class="selected"' : '';
data = (tdformat!='') ? zenFormatNumber(data,tdformat) : data;
html[html.length] = '<td ' + (this.nowrap ? 'nowrap="1" ' : '') + 'valign="middle"'+tdstyle+tdtip+'>';
html[html.length] = '<div id="td_'+(r+1)+'_'+(c+1)+'_'+this.index+'" '+events+cls+'>'+data+'</div>';
html[html.length] = '</td>';
}
html[html.length] = '</tr>';
}
}
if (this.showArrows) {
var colCount = cols + 1;
html[html.length] = '<tr>';
html[html.length] = '<td class="dynaGridArrow" style="text-align:center;padding:2px;" colspan="'+colCount+'"  title="'+$$$Text('Add row')+'" onclick="zenPage.getComponent('+this.index+').arrowHandler(\'rows\');">' + '<input type="image" src="images/arrowBD.png"/>' + '</td>';
html[html.length] = '</tr>';
}
html[html.length] = '</table>';
html[html.length] = '<div style="top:0px;left:0px;position:absolute; display:block; height:0px; width:0px; overflow:hidden; font-size:0px; line-height:0px" >';
html[html.length] = '<input type="text" tabindex="'+this.tabIndex+'" id="'+this.makeId('invisible')+'"  onkeydown="return zenPage.getComponent('+this.index+').gridKeyDownHandler(event);" onkeypress="return zenPage.getComponent('+this.index+').gridKeyPressHandler(event);" onfocus="zenPage.getComponent('+this.index+').gridKeyFocus();" onblur="zenPage.getComponent('+this.index+').gridKeyBlur();"/>';
html[html.length] = '</div>';
html[html.length] = '</div>';
encDiv.innerHTML = html.join('');
this.adjustSizes();
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in renderContents.');
}
}

self._ZEN_Component_dynaGrid_rowLabelDblClickHandler = function(row) {
if (this.editLabels) {
this.editCell(null,'row');
}
}

self._ZEN_Component_dynaGrid_rowLabelHandler = function(row) {
this.focus();
this.selectCell(row,-1,true);
if (this.multiSelect) {
this.selectCellRange(row,1,row,this.getColumnCount());
}
zenInvokeCallbackMethod(this.onclickrow,this,'onclickrow','row',row);
}

self._ZEN_Component_dynaGrid_selectCell = function(r,c,notify) {
try {
if (this.currRow > 0 && this.currColumn > 0) {
var div = this.findElement("td_"+this.currRow + "_" + this.currColumn);
if (div) {
div.className = '';
}
}
this.currRow = r;
this.currColumn = c;
if (notify) {
this.selectCellHandler(r,c);
}
if (this.currRow > 0 && this.currColumn > 0) {
var div = this.findElement("td_"+this.currRow + "_" + this.currColumn);
if (div) {
div.className = this.hasFocus ? 'focus' : 'selected';
if (this.hasFocus && this.scrollIntoView) {
var flag = false;
if (this.currColumn == 1) {
var lbl = this.findElement((this.currRow==1) ? "gridLabel" : "thRow_"+this.currRow);
if (lbl) {
zenScrollIntoView(this.getEnclosingDiv(),lbl);
flag = true;
}
}
else if (this.currRow == 1) {
var lbl = this.findElement((this.currColumn==1) ? "gridLabel" : "thCol_"+this.currColumn);
if (lbl) {
zenScrollIntoView(this.getEnclosingDiv(),lbl);
flag = true;
}
}
if (!flag) {
zenScrollIntoView(this.getEnclosingDiv(),div.parentNode);
}
}
}
}
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in selectCell.');
}
}

self._ZEN_Component_dynaGrid_selectCellHandler = function(r,c) {
zenInvokeCallbackMethod(this.onselectcell,this,'onselectcell','row',r,'col',c);
}

self._ZEN_Component_dynaGrid_selectCellRange = function(startRow,startCol,endRow,endCol) {
if ('' != this.selectedRange) {
var p = this.selectedRange.split(',');
for (var r = parseInt(p[0]); r <= parseInt(p[2]); r++) {
for (var c = parseInt(p[1]); c <= parseInt(p[3]); c++) {
var cell = this.findElement('td_'+r+'_'+c);
if (cell) {
var color = cell._oldColor ? cell._oldColor : '';
cell.style.color = color;
var bg = cell._oldBackground ? cell._oldBackground : '';
cell.style.background = bg;
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
this.selectedRange = startRow + ',' + startCol + ',' + endRow + ',' + endCol;
var p = this.selectedRange.split(',');
for (var r = parseInt(p[0]); r <= parseInt(p[2]); r++) {
for (var c = parseInt(p[1]); c <= parseInt(p[3]); c++) {
var cell = this.findElement('td_'+r+'_'+c);
if (cell) {
cellCount++;
if (cell.getAttribute && cell.getAttribute('zenValue')) {
total += parseFloat(cell.getAttribute('zenValue'));
}
cell._oldColor = cell.style.color;
cell._oldBackground = cell.style.background;
cell.style.color = this.selectedCellColor;
if (c==this.currColumn && r == this.currRow) {
cell.style.background = this.selectedCellBackground;
}
else {
cell.style.background = this.selectedRangeBackground;
}
}
}
}
}
}

self._ZEN_Component_dynaGrid_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._ZEN_Component_dynaGrid_setCellProperty = function(pageno,rowno,colno,property,value) {
if (pageno < 1 || rowno < 1 || colno < 1) return;
var cinfo = this.getCellInfo(pageno-1,rowno-1,colno-1);
if (null == cinfo) {
cinfo = zenPage.createComponent('gridCell');
cinfo.page = pageno;
cinfo.row = rowno;
cinfo.column = colno;
this.cells[this.cells.length] = cinfo;
}
cinfo.setProperty(property,value);
this.render();
return true;
}

self._ZEN_Component_dynaGrid_setCellValue = function(value,r,c) {
var dataSet = this.getDataSet();
if (!zenIsMissing(dataSet)) {
dataSet.setData(value,r-1,c-1,this.currPage-1);
if (this.ongetcellvalue!='') {
var ndata = zenInvokeCallbackMethod(this.ongetcellvalue,this,'ongetcellvalue','row',r,'col',c,'data',value);
if (ndata !== null) {
value = ndata;
}
}
var controller = this.getController();
if (controller) {
var series = c;
if (controller.OnRenderJSON) series--; //adjust for JSON provider
this.sendEventToController('propertyChange',controller.getPropertyName(r-1),value,series);
}
}
var div = this.findElement("td_"+r + "_" + c);
if (div) {
value = this.getCellContents(value,r,c);
var rinfo = this.getRowInfo(r);
var cinfo = this.getColumnInfo(c);
var format = (cinfo&&cinfo.format!='') ? cinfo.format : (rinfo&&rinfo.format!='') ? rinfo.format : this.format;
format = ('undefined' == typeof format) ? '' : format;
value = (format!=='') ? zenFormatNumber(value,format) : value;
div.innerHTML = value;
}
}

self._ZEN_Component_dynaGrid_setColumnProperty = function(colno,property,value) {
if (colno < 1) return;
var cinfo = this.getColumnInfo(colno-1);
if (null == cinfo) {
cinfo = zenPage.createComponent('gridColumn');
this.columns[colno-1] = cinfo;
}
cinfo.setProperty(property,value);
if ('width' == property) {
this.adjustSizes();
}
else {
this.render();
}
return true;
}

self._ZEN_Component_dynaGrid_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._ZEN_Component_dynaGrid_setLabelValue = function(value,which,index) {
var dataSet = this.getDataSet();
if (!zenIsMissing(dataSet)) {
dataSet.setLabel(value,index-1,(which=='row') ? 1 : 2);
var controller = this.getController();
if (controller) {
}
}
if (which == 'row') {
var div = this.findElement("thRow_"+index);
}
else {
var div = this.findElement("thCol_"+index);
}
if (div) {
div.innerHTML = value;
}
}

self._ZEN_Component_dynaGrid_setProperty = function(property,value,value2) {
switch(property) {
case 'value':
var el = this.findElement('control');
if (el) {
el.value = value;
}
this.value = value;
break;
case 'nowrap':
case 'readOnly':
case 'disabled':
case 'showColumnLabels':
case 'showRowLabels':
case 'showZebra':
value = value ? true : false;
this[property] = value;
this.render();
break;
case 'currPage':
case 'rowLabelWidth':
case 'format':
case 'style':
case 'columnHeaderStyle':
case 'rowHeaderStyle':
case 'borders':
case 'selectedRangeBackground':
case 'selectedCellBackground':
case 'selectedCellColor':
case 'rowHeaderStyle':
this[property] = value;
this.render();
break;
case 'gridLabel':
this.gridLabel = value;
var th = this.findElement("gridLabel");
if (th) {
th.innerHTML = (''==this.gridLabel) ? '&#160;' : this.gridLabel;
}
break;
case 'controllerId':
this.setControllerId(value);
break;
case 'editLabels':
this.editLabels = value;
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_dynaGrid_setRowProperty = function(rowno,property,value) {
if (rowno < 1) return;
var rinfo = this.getRowInfo(rowno-1);
if (null == rinfo) {
rinfo = zenPage.createComponent('gridRow');
this.rows[rowno-1] = rinfo;
}
rinfo.setProperty(property,value);
this.render();
return true;
}

self._ZEN_Component_dynaGrid_stopEditCell = function(cancel) {
cancel = (null==cancel) ? false : cancel;
var value;
var type = 'cell';
if (this.currDiv && this.cellHasFocus) {
this.cellHasFocus = false;
this.F2Mode = false;
var cell = this.window.document.getElementById("cellEditor");
zenASSERT(cell,"Unable to find cellEditor control",arguments);
if (cell) {
if (this.currEditType == 'row') {
type = 'row';
var dataSet = this.getDataSet();
var oldLabel = (dataSet) ? dataSet.getLabel(this.currRow-1,1) : '';
value = !cancel ? cell.value : oldLabel;
this.currDiv.onclick = this.oldOnclick;
this.setLabelValue(value,'row',this.currRow);
cell.value = '';
}
else if (this.currEditType == 'column') {
type = 'column';
var dataSet = this.getDataSet();
var oldLabel = (dataSet) ? dataSet.getLabel(this.currColumn-1,2) : '';
value = !cancel ? cell.value : oldLabel;
this.currDiv.onclick = this.oldOnclick;
this.setLabelValue(value,'column',this.currColumn);
cell.value = '';
}
else {
value = !cancel ? cell.value : this.getCellValue(this.currRow, this.currColumn);
this.currDiv.onclick = this.oldOnclick;
this.setCellValue(value, this.currRow, this.currColumn);
cell.value = '';
}
if (!cancel) {
zenInvokeCallbackMethod(this.onchangecell,this,'onchangecell','which',type);
}
}
this.currDiv = null;
this.currEditType = null;
zenInvokeCallbackMethod(this.onchange,this,'onchange','which',type);
this.focus();
}
}

self._ZEN_Component_dynaGrid_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_dynaGrid__Loader = function() {
	zenLoadClass('_ZEN_Component_control');
	_ZEN_Component_dynaGrid.prototype = zenCreate('_ZEN_Component_control',-1);
	var p = _ZEN_Component_dynaGrid.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_dynaGrid;
	p.superClass = ('undefined' == typeof _ZEN_Component_control) ? zenMaster._ZEN_Component_control.prototype:_ZEN_Component_control.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.dynaGrid';
	p._type = 'dynaGrid';
	p.serialize = _ZEN_Component_dynaGrid_serialize;
	p.getSettings = _ZEN_Component_dynaGrid_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_dynaGrid_ReallyRefreshContents;
	p.adjustSizes = _ZEN_Component_dynaGrid_adjustSizes;
	p.arrowHandler = _ZEN_Component_dynaGrid_arrowHandler;
	p.cellClickHandler = _ZEN_Component_dynaGrid_cellClickHandler;
	p.cellDblClickHandler = _ZEN_Component_dynaGrid_cellDblClickHandler;
	p.cellEditKeyHandler = _ZEN_Component_dynaGrid_cellEditKeyHandler;
	p.cellEditKeyUpHandler = _ZEN_Component_dynaGrid_cellEditKeyUpHandler;
	p.columnLabelDblClickHandler = _ZEN_Component_dynaGrid_columnLabelDblClickHandler;
	p.columnLabelHandler = _ZEN_Component_dynaGrid_columnLabelHandler;
	p.connectToController = _ZEN_Component_dynaGrid_connectToController;
	p.disconnectFromController = _ZEN_Component_dynaGrid_disconnectFromController;
	p.editCell = _ZEN_Component_dynaGrid_editCell;
	p.focus = _ZEN_Component_dynaGrid_focus;
	p.getCSSWidthSpec = _ZEN_Component_dynaGrid_getCSSWidthSpec;
	p.getCellContents = _ZEN_Component_dynaGrid_getCellContents;
	p.getCellEditor = _ZEN_Component_dynaGrid_getCellEditor;
	p.getCellInfo = _ZEN_Component_dynaGrid_getCellInfo;
	p.getCellProperty = _ZEN_Component_dynaGrid_getCellProperty;
	p.getCellValue = _ZEN_Component_dynaGrid_getCellValue;
	p.getColumnCount = _ZEN_Component_dynaGrid_getColumnCount;
	p.getColumnInfo = _ZEN_Component_dynaGrid_getColumnInfo;
	p.getColumnProperty = _ZEN_Component_dynaGrid_getColumnProperty;
	p.getController = _ZEN_Component_dynaGrid_getController;
	p.getCurrColumn = _ZEN_Component_dynaGrid_getCurrColumn;
	p.getCurrRow = _ZEN_Component_dynaGrid_getCurrRow;
	p.getDataSet = _ZEN_Component_dynaGrid_getDataSet;
	p.getEdgeWidth = _ZEN_Component_dynaGrid_getEdgeWidth;
	p.getEditCellHTML = _ZEN_Component_dynaGrid_getEditCellHTML;
	p.getPageCount = _ZEN_Component_dynaGrid_getPageCount;
	p.getRowCount = _ZEN_Component_dynaGrid_getRowCount;
	p.getRowInfo = _ZEN_Component_dynaGrid_getRowInfo;
	p.getRowProperty = _ZEN_Component_dynaGrid_getRowProperty;
	p.getSelectedRange = _ZEN_Component_dynaGrid_getSelectedRange;
	p.gridKeyBlur = _ZEN_Component_dynaGrid_gridKeyBlur;
	p.gridKeyDownHandler = _ZEN_Component_dynaGrid_gridKeyDownHandler;
	p.gridKeyFocus = _ZEN_Component_dynaGrid_gridKeyFocus;
	p.gridKeyPressHandler = _ZEN_Component_dynaGrid_gridKeyPressHandler;
	p.gridLabelHandler = _ZEN_Component_dynaGrid_gridLabelHandler;
	p.isCellEditable = _ZEN_Component_dynaGrid_isCellEditable;
	p.isCellVisible = _ZEN_Component_dynaGrid_isCellVisible;
	p.moveToCell = _ZEN_Component_dynaGrid_moveToCell;
	p.nextPage = _ZEN_Component_dynaGrid_nextPage;
	p.notifyView = _ZEN_Component_dynaGrid_notifyView;
	p.notifyViewHandler = _ZEN_Component_dynaGrid_notifyViewHandler;
	p.onCreate = _ZEN_Component_dynaGrid_onCreate;
	p.previousPage = _ZEN_Component_dynaGrid_previousPage;
	p.renderContents = _ZEN_Component_dynaGrid_renderContents;
	p.rowLabelDblClickHandler = _ZEN_Component_dynaGrid_rowLabelDblClickHandler;
	p.rowLabelHandler = _ZEN_Component_dynaGrid_rowLabelHandler;
	p.selectCell = _ZEN_Component_dynaGrid_selectCell;
	p.selectCellHandler = _ZEN_Component_dynaGrid_selectCellHandler;
	p.selectCellRange = _ZEN_Component_dynaGrid_selectCellRange;
	p.sendEventToController = _ZEN_Component_dynaGrid_sendEventToController;
	p.setCellProperty = _ZEN_Component_dynaGrid_setCellProperty;
	p.setCellValue = _ZEN_Component_dynaGrid_setCellValue;
	p.setColumnProperty = _ZEN_Component_dynaGrid_setColumnProperty;
	p.setControllerId = _ZEN_Component_dynaGrid_setControllerId;
	p.setLabelValue = _ZEN_Component_dynaGrid_setLabelValue;
	p.setProperty = _ZEN_Component_dynaGrid_setProperty;
	p.setRowProperty = _ZEN_Component_dynaGrid_setRowProperty;
	p.stopEditCell = _ZEN_Component_dynaGrid_stopEditCell;
}
/* EOF */