/*** Zen Module: ZEN_Component_dataGrid ***/

self._zenClassIdx['dataGrid'] = '_ZEN_Component_dataGrid';
self._ZEN_Component_dataGrid = function(index,id) {
	if (index>=0) {_ZEN_Component_dataGrid__init(this,index,id);}
}

self._ZEN_Component_dataGrid__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_control__init) ?zenMaster._ZEN_Component_control__init(o,index,id):_ZEN_Component_control__init(o,index,id);
	o.alwaysString = false;
	o.canResizeColumns = true;
	o.cellHoverColor = '#EEEEEE';
	o.checkedRows = '';
	o.columnDescriptors = new Array();
	o.columnHeaderStyle = '';
	o.columnLabelSpan = true;
	o.columnWidth = '';
	o.controller = '';
	o.controllerId = '';
	o.currCellBackground = '#D0D0FF';
	o.currCellColor = '#000000';
	o.currColumn = '1';
	o.currPage = '1';
	o.currRow = '1';
	o.enclosingClass = 'dataGrid';
	o.evenRowBackground = '#F8F8F8';
	o.evenRowColor = '';
	o.filterKey = '';
	o.format = '';
	o.gridStatusStyle = '';
	o.gridTitle = '';
	o.gridTitleStyle = '';
	o.hasFormulas = false;
	o.lblErrorAdjustSizes = 'Error in adjustSizes.';
	o.lblErrorRenderCells = 'Error in renderCells.';
	o.lblErrorRenderContents = 'Error in renderContents.';
	o.lblErrorRenderSkeleton = 'Error in renderSkeleton.';
	o.lblErrorSelectCell = 'Error in selectCell.';
	o.lblSearch = 'Search';
	o.lblWorking = 'Working';
	o.multiSelect = false;
	o.oddRowBackground = '';
	o.oddRowColor = '';
	o.onaction = '';
	o.onchangecell = '';
	o.ondrawcell = '';
	o.onfiltercell = '';
	o.ongetcontroller = '';
	o.ongetfunctions = '';
	o.ongetlookupdata = '';
	o.ongetstatus = '';
	o.ongettitle = '';
	o.onheaderclick = '';
	o.onnotifyView = '';
	o.onselectcell = '';
	o.onselectrow = '';
	o.pageSize = '0';
	o.pagingMode = 'client';
	o.rowDescriptors = new Array();
	o.rowHeaderStyle = '';
	o.rowHeight = '';
	o.rowLabelSpan = true;
	o.rowLabelWidth = '';
	o.selectMode = 'rows';
	o.selectedRange = '';
	o.showColumnLabels = true;
	o.showRowLabels = true;
	o.showRowSelector = false;
	o.showZebra = true;
	o.sortColumn = '0';
	o.sortMode = 'client';
	o.sortOrder = '';
	o.style = '';
	o.summaryRow = null;
	o.useEngine = true;
	o.valueColumn = '1';
	o.onCreate();
}
function _ZEN_Component_dataGrid_serialize(set,s)
{
	var o = this;s[0]='1729460960';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=(o.alwaysString?1:0);s[8]=o.aux;s[9]=(o.canResizeColumns?1:0);s[10]=o.cellHoverColor;s[11]=o.checkedRows;s[12]=o.clientType;s[13]=set.serializeList(o,o.columnDescriptors,true,'columnDescriptors');s[14]=o.columnHeaderStyle;s[15]=(o.columnLabelSpan?1:0);s[16]=o.columnWidth;s[17]=o.containerStyle;s[18]=o.controlClass;s[19]=o.controlStyle;s[20]=o.controller;s[21]=o.controllerId;s[22]=o.currCellBackground;s[23]=o.currCellColor;s[24]=o.currColumn;s[25]=o.currPage;s[26]=o.currRow;s[27]=o.dataBinding;s[28]=(o.disabled?1:0);s[29]=(o.dragEnabled?1:0);s[30]=(o.dropEnabled?1:0);s[31]=(o.dynamic?1:0);s[32]=o.enclosingClass;s[33]=o.enclosingStyle;s[34]=o.error;s[35]=o.evenRowBackground;s[36]=o.evenRowColor;s[37]=o.filterKey;s[38]=o.format;s[39]=o.gridStatusStyle;s[40]=o.gridTitle;s[41]=o.gridTitleStyle;s[42]=(o.hasFormulas?1:0);s[43]=o.height;s[44]=(o.hidden?1:0);s[45]=o.hint;s[46]=o.hintClass;s[47]=o.hintStyle;s[48]=(o.invalid?1:0);s[49]=o.invalidMessage;s[50]=o.label;s[51]=o.labelClass;s[52]=o.labelDisabledClass;s[53]=o.labelStyle;s[54]=o.lblErrorAdjustSizes;s[55]=o.lblErrorRenderCells;s[56]=o.lblErrorRenderContents;s[57]=o.lblErrorRenderSkeleton;s[58]=o.lblErrorSelectCell;s[59]=o.lblSearch;s[60]=o.lblWorking;s[61]=(o.multiSelect?1:0);s[62]=o.oddRowBackground;s[63]=o.oddRowColor;s[64]=o.onaction;s[65]=o.onafterdrag;s[66]=o.onbeforedrag;s[67]=o.onblur;s[68]=o.onchange;s[69]=o.onchangecell;s[70]=o.onclick;s[71]=o.ondblclick;s[72]=o.ondrag;s[73]=o.ondrawcell;s[74]=o.ondrop;s[75]=o.onfiltercell;s[76]=o.onfocus;s[77]=o.ongetcontroller;s[78]=o.ongetfunctions;s[79]=o.ongetlookupdata;s[80]=o.ongetstatus;s[81]=o.ongettitle;s[82]=o.onheaderclick;s[83]=o.onhide;s[84]=o.onkeydown;s[85]=o.onkeypress;s[86]=o.onkeyup;s[87]=o.onmousedown;s[88]=o.onmouseout;s[89]=o.onmouseover;s[90]=o.onmouseup;s[91]=o.onnotifyView;s[92]=o.onrefresh;s[93]=o.onselectcell;s[94]=o.onselectrow;s[95]=o.onshow;s[96]=o.onsubmit;s[97]=o.ontouchend;s[98]=o.ontouchmove;s[99]=o.ontouchstart;s[100]=o.onupdate;s[101]=o.onvalidate;s[102]=o.originalValue;s[103]=o.overlayMode;s[104]=o.pageSize;s[105]=o.pagingMode;s[106]=(o.readOnly?1:0);s[107]=o.renderFlag;s[108]=(o.required?1:0);s[109]=o.requiredMessage;s[110]=set.serializeList(o,o.rowDescriptors,true,'rowDescriptors');s[111]=o.rowHeaderStyle;s[112]=o.rowHeight;s[113]=(o.rowLabelSpan?1:0);s[114]=o.rowLabelWidth;s[115]=o.selectMode;s[116]=o.selectedRange;s[117]=(o.showColumnLabels?1:0);s[118]=(o.showLabel?1:0);s[119]=(o.showRowLabels?1:0);s[120]=(o.showRowSelector?1:0);s[121]=(o.showZebra?1:0);s[122]=o.slice;s[123]=o.sortColumn;s[124]=o.sortMode;s[125]=o.sortOrder;s[126]=o.style;s[127]=set.addObject(o.summaryRow,'summaryRow');s[128]=o.tabIndex;s[129]=o.title;s[130]=o.tuple;s[131]=(o.useEngine?1:0);s[132]=o.valign;s[133]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[134]=o.valueColumn;s[135]=(o.visible?1:0);s[136]=o.width;
}
function _ZEN_Component_dataGrid_getSettings(s)
{
	s['name'] = 'string';
	s['alwaysString'] = 'boolean';
	s['canResizeColumns'] = 'boolean';
	s['cellHoverColor'] = 'string';
	s['checkedRows'] = 'csv';
	s['columnHeaderStyle'] = 'style';
	s['columnLabelSpan'] = 'boolean';
	s['columnWidth'] = 'integer';
	s['controllerId'] = 'id';
	s['currCellBackground'] = 'style';
	s['currCellColor'] = 'style';
	s['currColumn'] = 'integer';
	s['currPage'] = 'integer';
	s['currRow'] = 'integer';
	s['evenRowBackground'] = 'style';
	s['evenRowColor'] = 'style';
	s['filterKey'] = 'string';
	s['format'] = 'string';
	s['gridStatusStyle'] = 'style';
	s['gridTitle'] = 'caption';
	s['gridTitleStyle'] = 'style';
	s['hasFormulas'] = 'boolean';
	s['lblErrorAdjustSizes'] = 'caption';
	s['lblErrorRenderCells'] = 'caption';
	s['lblErrorRenderContents'] = 'caption';
	s['lblErrorRenderSkeleton'] = 'caption';
	s['lblErrorSelectCell'] = 'caption';
	s['lblSearch'] = 'caption';
	s['lblWorking'] = 'caption';
	s['multiSelect'] = 'boolean';
	s['oddRowBackground'] = 'style';
	s['oddRowColor'] = 'style';
	s['onaction'] = 'eventHandler';
	s['onchangecell'] = 'eventHandler';
	s['ondrawcell'] = 'eventHandler';
	s['onfiltercell'] = 'eventHandler';
	s['ongetcontroller'] = 'eventHandler';
	s['ongetfunctions'] = 'eventHandler';
	s['ongetlookupdata'] = 'eventHandler';
	s['ongetstatus'] = 'eventHandler';
	s['ongettitle'] = 'eventHandler';
	s['onheaderclick'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	s['onselectcell'] = 'eventHandler';
	s['onselectrow'] = 'eventHandler';
	s['pageSize'] = 'integer';
	s['pagingMode'] = 'enum:client,server';
	s['rowHeaderStyle'] = 'style';
	s['rowHeight'] = 'integer';
	s['rowLabelSpan'] = 'boolean';
	s['rowLabelWidth'] = 'integer';
	s['selectMode'] = 'enum:rows,cells';
	s['selectedRange'] = 'csv';
	s['showColumnLabels'] = 'boolean';
	s['showRowLabels'] = 'boolean';
	s['showRowSelector'] = 'boolean';
	s['showZebra'] = 'boolean';
	s['sortColumn'] = 'integer';
	s['sortMode'] = 'enum:client,server';
	s['sortOrder'] = 'enum:asc,desc';
	s['style'] = 'style';
	s['useEngine'] = 'boolean';
	s['valueColumn'] = 'integer';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_dataGrid_adjustSizes = function() {
try {
var inResize = zenPage._componentIndex!=null && zenPage._columnIndex>=0;
var controller = this.getController();
var cols = this.getColumnCount();
var rows = this.getRowsOnPage();
var hdrLabels = this.getRowHeaderLabels();
var encDiv = this.getEnclosingDiv();
var titleDiv = this.findElement('title');
if (!window.getComputedStyle) this.defineGetComputedStyle();
var sz = this.initializeSizingObject(inResize,encDiv,titleDiv);
if (inResize) this.adjustSizesInColumnResize(sz);
var pagingDiv = this.findElement('paging');
var statusDiv = this.findElement('status');
this.adjustSizesAreasPagingStatus(sz, pagingDiv,statusDiv);
var offset = this.getRowOffset();
if (!inResize) {
this.adjustSizesColumnHeaders(sz,cols);
this.adjustSizesRowHeaders(sz,rows,hdrLabels);
if (this.summaryRow) this.adjustSizesSummaryRow(sz, cols);
this.adjustSizesDataCells(sz, cols, rows);
}
encDiv.style.visibility = 'hidden';
this._last_rHdrWid = sz.rHdrWid;
this._last_cHdrHgt = sz.cHdrHgt;
this._last_cSumHgt = sz.cSumHgt;
this._last_cbWid = sz.cbWid;
this._last_cwid = sz.cwid;
this._last_rhgt = sz.rhgt;
var cx = 0;
if (this.showRowSelector) {
var outer = this.findElement('ch_0_'+'cb');
if (outer) {
outer.style.left = cx + 'px';
outer.style.width = (sz.cbWid-1) + 'px';
outer.style.height = (sz.cHdrHgt-1) + 'px';
var inner = outer.firstChild;
if (inner.offsetHeight < outer.offsetHeight) {
inner.style.top = (outer.offsetHeight-inner.offsetHeight)/2 + 'px';
}
else {
inner.style.top = 0 + 'px';
}
}
cx += sz.cbWid;
}
for (var c = 0; c < cols; c++) {
if (c >= sz.firstCol) {
var cInfo = this.getColumnInfo(c);
var cInfo2 = cInfo;
var d = 0;
while (cInfo2) {
var outer = this.findElement('ch_'+d+'_'+c);
if (outer) {
outer.style.left = cx + 'px';
if (this.columnLabelSpan) {
var awid = 0;
for (var aw = c; aw < c + (cInfo2._colSpan?cInfo2._colSpan:1); aw++) {
awid += sz.cwid[aw];
}
outer.style.width = (awid-1) + 'px';
}
else {
outer.style.width = (sz.cwid[c]-1) + 'px';
}
outer.style.top = sz.cHdrHgt*(cInfo2._depth?cInfo2._depth:0) + 'px';
outer.style.height = ((sz.cHdrHgt)*(cInfo2._rowSpan?cInfo2._rowSpan:1)-1) + 'px';
var inner = outer.firstChild;
if (outer.getAttribute('centered')) {
inner.style.left = ((inner.offsetWidth < outer.offsetWidth) ? (outer.offsetWidth-inner.offsetWidth)/2 : 0) + 'px';
}
cInfo2 = cInfo2._parent;
}
else {
cInfo2 = null;
}
d++;
}
}
cx += sz.cwid[c];
if (c >= sz.firstCol) {
var rsz = this.findElement('rsz_'+c);
if (rsz) {
rsz.style.left = (cx-2) + 'px';
rsz.style.top = sz.cHdrHgt*(cInfo._depth?cInfo._depth:0) + 'px';
rsz.style.height = (sz.cHdrHgt-1)*(cInfo._rowSpan?cInfo._rowSpan:1) + 'px';
}
}
}
var rOffset = [];
var rx = 0;
for (var rh = 0; rh<sz.rowDepth; rh++) {
rOffset[rh] = rx;
rx += sz.rHdrWid[sz.rowDepth-rh-1];
}
if (hdrLabels.length) {
for (var hx = 0; hx < hdrLabels.length && hx < sz.rowDepth; hx++) {
var outer = this.findElement('nub_'+hx);
if (outer) {
outer.style.width = sz.rHdrWid[sz.rowDepth - hx - 1] + 'px';
outer.style.left = rOffset[hx] + 'px';
outer.style.height = (sz.cHdrHgt-1) + 'px';
}
}
}
var cy = 0;
for (var ri = 0; ri < rows; ri++) {
var r = this._sortIndex ? this._sortIndex[ri+offset].row : ri+offset;
var rInfo = this.getRowInfo(r);
var rInfo2 = rInfo;
var d = 0;
while (rInfo2) {
var outer = this.findElement('rh_'+d+'_'+ri);
if (outer) {
outer.style.top = cy + 'px';
if (this.rowLabelSpan && this.sortColumn==0) {
var ahgt = 0;
for (var ah = ri; ah < ri + (rInfo2._rowSpan?rInfo2._rowSpan:1); ah++) {
ahgt += sz.rhgt[ah];
}
outer.style.height = (ahgt-1) + 'px';
}
else {
outer.style.height = (sz.rhgt[ri]-1) + 'px';
}
var awid = 0;
var cspan = (rInfo2._colSpan?rInfo2._colSpan:1);
var rdep = (rInfo2._depth?rInfo2._depth:0);
for (var aw = rdep; aw < rdep + cspan; aw++) {
awid += sz.rHdrWid[sz.rowDepth - aw - 1];
}
outer.style.width = awid + 'px';
outer.style.left = rOffset[rdep] + 'px';
var inner = outer.firstChild;
if (inner.offsetHeight < outer.offsetHeight) {
inner.style.top = (outer.offsetHeight-inner.offsetHeight)/2 + 'px';
}
else {
inner.style.top = 0 + 'px';
}
if (outer.getAttribute('centered')) {
inner.style.left = ((inner.offsetWidth < outer.offsetWidth) ? (outer.offsetWidth-inner.offsetWidth)/2 : 0) + 'px';
}
rInfo2 = rInfo2._parent;
}
else {
rInfo2 = null;
}
d++;
}
cy += sz.rhgt[ri];
}
var totalHgt = 0;
var totalWid = 0;
var cy = 0;
var cbWidStr = (sz.cbWid-1) + 'px';
for (var ri = 0; ri < rows; ri++) {
var r = this._sortIndex ? this._sortIndex[ri+offset].row : ri+offset;
var cx = 0;
if (this.showRowSelector) {
var outer = this.findElement('c_'+ri+':'+'cb');
if (outer) {
outer.style.top = cy + 'px';
outer.style.left = cx + 'px';
outer.style.width = cbWidStr;
outer.style.height = (sz.rhgt[ri]-1) + 'px';
var inner = outer.firstChild;
if (inner.offsetHeight < outer.offsetHeight) {
inner.style.top = (outer.offsetHeight-inner.offsetHeight)/2 + 'px';
}
if (inner.offsetWidth < outer.offsetWidth) {
inner.style.left = (outer.offsetWidth-inner.offsetWidth)/2 + 'px';
}
}
cx += sz.cbWid;
if (ri==0) {
totalWid += sz.cbWid;
}
}
for (var c = 0; c < cols; c++) {
if (c >= sz.firstCol) {
var outer = this.findElement('c_'+ri+':'+c);
if (outer) {
outer.style.top = cy + 'px';
outer.style.height = sz.rhgt[ri]-1 + 'px';
outer.style.left = cx + 'px';
outer.style.width = sz.cwid[c]-1 + 'px';
var inner = outer.firstChild;
if (inner.offsetHeight < outer.offsetHeight) {
inner.style.top = (outer.offsetHeight-inner.offsetHeight)/2 + 'px';
}
if (outer.getAttribute('centered')) {
inner.style.left = ((inner.offsetWidth < outer.offsetWidth) ? (outer.offsetWidth-inner.offsetWidth)/2 : 0) + 'px';
}
}
}
cx += sz.cwid[c];
if (ri==0) {
totalWid += sz.cwid[c];
}
}
cy += sz.rhgt[ri];
totalHgt += sz.rhgt[ri];
}
if (this.summaryRow) {
var outer = this.findElement('rh_sum');
if (outer) {
outer.style.top = '0px';
outer.style.height = (sz.cSumHgt-1) + 'px';
outer.style.width = (sz.rHdrWid[0]-1) + 'px';
var inner = outer.firstChild;
if (inner.offsetHeight < outer.offsetHeight) {
inner.style.top = (outer.offsetHeight-inner.offsetHeight)/2 + 'px';
}
}
var cx = 0;
if (this.showRowSelector) {
var outer = this.findElement('sum_cb');
if (outer) {
outer.style.left = cx + 'px';
outer.style.width = (sz.cbWid-1) + 'px';
outer.style.height = (sz.cSumHgt-1) + 'px';
var inner = outer.firstChild;
if (inner.offsetHeight < outer.offsetHeight) {
inner.style.top = (outer.offsetHeight-inner.offsetHeight)/2 + 'px';
}
}
cx += sz.cbWid;
}
for (var c = 0; c < cols; c++) {
if (c >= sz.firstCol) {
var outer = this.findElement('sum_'+c);
if (outer) {
outer.style.top = 0 + 'px';
outer.style.left = cx + 'px';
outer.style.width = (sz.cwid[c]-1) + 'px';
outer.style.height = (sz.cSumHgt-1) + 'px';
}
}
cx += sz.cwid[c];
}
}
var cellPadH = 1;
var cellPadW = 1;
var nubDiv = this.findElement('nub');
var rhDiv = this.findElement('rowHdrs');
var chDiv = this.findElement('colHdrs');
var cellDiv = this.findElement('cells');
var vtDiv = this.findElement('vtScroll');
var hzDiv = this.findElement('hzScroll');
var vtInnerDiv = this.findElement('vtScrollInner');
var hzInnerDiv = this.findElement('hzScrollInner');
var cellsInner = this.findElement('cellsInner');
var sumDiv = this.findElement('summary');
var sumHdrDiv = this.findElement('summaryHdr');
var scrollWid = 22;
var scrollHgt = 22;
var colHeaderHgt = sz.cHdrHgt * sz.colDepth;
var rowHeaderWid = 0;
for (var rh = 0; rh < sz.rowDepth; rh++) {
rowHeaderWid += sz.rHdrWid[rh];
}
var dataWid = sz.encWid > (rowHeaderWid+scrollWid) ? (sz.encWid-(rowHeaderWid+scrollWid)-4): 0;
var dataHgt = sz.encHgt > (sz.titleHgt+colHeaderHgt+scrollHgt+sz.cSumHgt) ? (sz.encHgt-(sz.titleHgt+colHeaderHgt+scrollHgt+sz.cSumHgt)-4): 0;
if (totalHgt > dataHgt) {
var summaryHgt = sz.cSumHgt;
var summaryTop = sz.titleHgt + colHeaderHgt + dataHgt;
}
else {
var summaryHgt = 0;
var dataHgt = sz.encHgt > (sz.titleHgt + colHeaderHgt + scrollHgt + summaryHgt) ? (sz.encHgt-(sz.titleHgt + colHeaderHgt + scrollHgt + summaryHgt)-4): 0;
var summaryTop = sz.titleHgt + colHeaderHgt + totalHgt;
}
var rsz = this.findElement('rszlabel');
if (rsz) {
rsz.style.top = sz.titleHgt + 'px';
rsz.style.height = (colHeaderHgt) + 'px';
}
var nubDivTop = sz.titleHgt;
var nubDivLeft = 0;
var nubDivWid = rowHeaderWid;
var nubDivHgt = colHeaderHgt;
var chDivTop = sz.titleHgt;
var chDivLeft = rowHeaderWid;
var chDivWid = dataWid;
var chDivHgt = colHeaderHgt;
var rhDivTop = sz.titleHgt+colHeaderHgt;
var rhDivLeft = 0;
var rhDivWid = rowHeaderWid;
var rhDivHgt = dataHgt;
var dataDivTop = sz.titleHgt+colHeaderHgt;
var dataDivLeft = rowHeaderWid;
var dataDivWid = dataWid;
var dataDivHgt = dataHgt;
var sumHdrDivTop = summaryTop;
var sumHdrDivLeft = 0;
var sumHdrDivWid = rowHeaderWid;
var sumHdrDivHgt = sz.cSumHgt;
var sumDivTop = summaryTop;
var sumDivLeft = rowHeaderWid;
var sumDivWid = totalWid < dataDivWid ? totalWid : dataDivWid;
var sumDivHgt = sz.cSumHgt;
var vtDivTop = sz.titleHgt+colHeaderHgt;
var vtDivLeft = dataDivLeft + dataDivWid;
var vtDivWid = scrollWid;
var vtDivHgt = dataHgt;
var hzDivTop = dataDivTop + dataDivHgt + summaryHgt;
var hzDivLeft = dataDivLeft;
var hzDivWid = dataDivWid;
var hzDivHgt = scrollHgt;
if (titleDiv) {
titleDiv.style.width = (rowHeaderWid+dataWid+scrollWid-6) + 'px';
}
if (statusDiv) {
statusDiv.style.top = (hzDivTop + scrollHgt) + 'px';
statusDiv.style.width = (rowHeaderWid+dataWid+scrollWid-6) + 'px';
}
if (nubDiv) {
nubDiv.style.top = nubDivTop + 'px';
nubDiv.style.left = nubDivLeft + 'px';
nubDiv.style.width = nubDivWid + 'px';
nubDiv.style.height = nubDivHgt + 'px';
}
if (rhDiv) {
rhDiv.style.top = rhDivTop + 'px';
rhDiv.style.left = rhDivLeft + 'px';
rhDiv.style.width = rhDivWid + 'px';
rhDiv.style.height = rhDivHgt + 'px';
}
if (chDiv) {
chDiv.style.top =  chDivTop + 'px';
chDiv.style.left = chDivLeft + 'px';
chDiv.style.width = chDivWid + 'px';
chDiv.style.height = chDivHgt + 'px';
}
if (sumDiv) {
sumDiv.style.top =  sumDivTop + 'px';
sumDiv.style.left = sumDivLeft + 'px';
sumDiv.style.width = sumDivWid + 'px';
sumDiv.style.height = sumDivHgt + 'px';
}
if (sumHdrDiv) {
sumHdrDiv.style.top =  sumHdrDivTop + 'px';
sumHdrDiv.style.left = sumHdrDivLeft + 'px';
sumHdrDiv.style.width = sumHdrDivWid + 'px';
sumHdrDiv.style.height = sumHdrDivHgt + 'px';
}
if (cellDiv) {
cellDiv.style.top = dataDivTop + 'px';
cellDiv.style.left = dataDivLeft + 'px';
cellDiv.style.width = dataDivWid + 'px';
cellDiv.style.height = dataDivHgt + 'px';
var cellsUnderDiv = this.findElement('cellsUnder');
if (cellsUnderDiv) {
cellsUnderDiv.style.top = dataDivTop + 'px';
cellsUnderDiv.style.left = dataDivLeft + 'px';
cellsUnderDiv.style.width = dataDivWid + 'px';
cellsUnderDiv.style.height = dataDivHgt + 'px';
}
}
if (vtDiv) {
vtDiv.style.top = vtDivTop + 'px';
vtDiv.style.left = vtDivLeft + 'px';
vtDiv.style.width = vtDivWid + 'px';
vtDiv.style.height = vtDivHgt + 'px';
}
if (hzDiv) {
hzDiv.style.top = hzDivTop + 'px';
hzDiv.style.left = hzDivLeft + 'px';
hzDiv.style.width = hzDivWid + 'px';
hzDiv.style.height = hzDivHgt + 'px';
}
if (vtInnerDiv) {
vtInnerDiv.style.height = totalHgt + 'px';
vtDiv.style.opacity = totalHgt>vtDivHgt?1.0:0.5;
}
if (hzInnerDiv) {
hzInnerDiv.style.width = totalWid + 'px';
hzDiv.style.opacity = totalWid>hzDivWid?1.0:0.5;
}
if (cellsInner) {
var handler = new Function('evt','zenPage.getComponent('+this.index+').wheelHandler(evt);');
if (cellsInner.addEventListener) {
cellsInner.addEventListener('DOMMouseScroll', handler, false);
cellsInner.addEventListener('mousewheel', handler, false);
}
else if(cellsInner.attachEvent) {
cellsInner.attachEvent('onmousewheel', handler);
}
}
if (this.currRow>0 && this.selectedRange=='' && 'rows' == this.selectMode) {
var p = [this.currRow,1,this.currRow,this.getColumnCount()];
this.selectedRange = p.join(',');
}
encDiv.style.display = 'block';
encDiv.style.visibility = 'visible';
this.highlightCells(true);
if (this.selectedRange!='') {
var p = this.selectedRange.split(',');
this.moveCellSelector(p[0],p[1],p[2],p[3]);
}
else {
this.moveCellSelector(this.currRow,this.currColumn);
}
encDiv.style.opacity = 1.0;
}
catch(ex) {
zenExceptionHandler(ex,arguments,this.lblErrorAdjustSizes);
}
}

self._ZEN_Component_dataGrid_adjustSizesAreasPagingStatus = function(sz,pagingDiv,statusDiv) {
if (pagingDiv) {
pagingDiv.innerHTML = this.getPagingHTML();
var pagingInnerDiv = this.findElement('pagingDiv');
if (pagingInnerDiv) {
pagingDiv.style.width = pagingInnerDiv.offsetWidth + 'px';
if (pagingInnerDiv.offsetWidth > sz.encWid) {
pagingDiv.style.display = 'none';
}
else {
pagingDiv.style.display = 'block';
}
}
}
var statusHgt = statusDiv ? statusDiv.offsetHeight : 0;
var pgHgt = (pagingDiv?pagingDiv.offsetHeight:0);
statusHgt = statusHgt > pgHgt ? statusHgt : pgHgt;
sz.encHgt -= statusHgt;
}

self._ZEN_Component_dataGrid_adjustSizesColumnHeaders = function(sz,cols) {
var cDesc = this.getColumnDescriptors();
var cDescIdx = 0;
var cDescLen = 0;
if (cDesc.length) cDescLen = cDesc.length;
for (var c = 0; c < cols; c++) {
var desc = null;
while (cDesc && cDescIdx<cDescLen && cDesc[cDescIdx].hidden ) cDescIdx++;
if (cDescIdx < cDescLen) desc = cDesc[cDescIdx];
cDescIdx++;
var outer = this.findElement('ch_0_'+c);
if (outer) {
var cell = outer.firstChild;
var cw = cell.offsetWidth;
if (this._columnWidths && this._columnWidths[c]) {
cw = this._columnWidths[c];
}
else {
if (desc && desc.width && desc.width!="") {
cw = parseInt(desc.width);
}
else {
if (this.columnWidth!=='') {
cw = parseInt(this.columnWidth,10);
}
}
}
sz.cwid[c] = cw;
var ch = cell.offsetHeight;
sz.cHdrHgt = (ch > sz.cHdrHgt) ? ch : sz.cHdrHgt;
}
}
}

self._ZEN_Component_dataGrid_adjustSizesDataCells = function(sz,cols,rows) {
for (var r = 0; r < rows; r++) {
var rh = 0;
for (var c = 0; c < cols; c++) {
var outer = this.findElement('c_'+r+':'+c);
if (outer) {
var cell = outer.firstChild;
var cw = cell.offsetWidth;
if (this._columnWidths && this._columnWidths[c]) {
cw = this._columnWidths[c];
}
var ch = cell.offsetHeight;
sz.cwid[c] = (!sz.cwid[c] || cw > sz.cwid[c]) ? cw : sz.cwid[c];
sz.rhgt[r] = (!sz.rhgt[r] || ch > sz.rhgt[r]) ? ch : sz.rhgt[r];
}
}
}
}

self._ZEN_Component_dataGrid_adjustSizesInColumnResize = function(sz) {
sz.rHdrWid = this._last_rHdrWid;
sz.cHdrHgt = this._last_cHdrHgt;
sz.cSumHgt = this._last_cSumHgt;
sz.cbWid = this._last_cbWid;
sz.cwid = this._last_cwid;
sz.rhgt = this._last_rhgt;
sz.firstCol = zenPage._columnIndex;
sz.cwid[sz.firstCol] = this._columnWidths[sz.firstCol];
}

self._ZEN_Component_dataGrid_adjustSizesRowHeaders = function(sz,rows,hdrLabels) {
var hlLen = hdrLabels.length;
if (hlLen) {
for (var hx = 0; hx < hlLen; hx++) {
var outer = this.findElement('nub_'+hx);
if (outer) {
var cell = outer.firstChild;
var rw = cell.offsetWidth;
sz.rHdrWid[hx] = (rw > sz.rHdrWid[hx]) ? rw : sz.rHdrWid[hx];
}
}
}
for (var r = 0; r < rows; r++) {
var d = 0;
var searchId = 'rh_'+d+'_'+r;
if (this.showRowLabels==false) searchId = 'c_'+r+':'+d;
var outer = this.findElement(searchId);
while (outer) {
var cell = outer.firstChild;
var rh = cell.offsetHeight;
if (sz.rHdrHgt>0) rh = sz.rHdrHgt;
sz.rhgt[r] = rh;
var rw = cell.offsetWidth;
sz.rHdrWid[d] = (rw > sz.rHdrWid[d]) ? rw : sz.rHdrWid[d];
d++;
var searchId = 'rh_'+d+'_'+r;
if (this.showRowLabels==false) searchId = 'c_'+r+':'+d;
var outer = this.findElement(searchId);
}
}
}

self._ZEN_Component_dataGrid_adjustSizesSummaryRow = function(sz,cols) {
var outer = this.findElement('rh_sum');
if (outer) {
var cell = outer.firstChild;
var rh = cell.offsetHeight;
sz.cSumHgt = rh;
var rw = cell.offsetWidth;
sz.rHdrWid[0] = (rw > sz.rHdrWid[0]) ? rw : sz.rHdrWid[0];
}
for (var c = 0; c < cols; c++) {
var outer = this.findElement('sum_'+c);
if (outer) {
var cell = outer.firstChild;
var cw = cell.offsetWidth;
if (this._columnWidths && this._columnWidths[c]) {
cw = this._columnWidths[c];
}
sz.cwid[c] = cw > sz.cwid[c] ? cw : sz.cwid[c];
var ch = cell.offsetHeight;
sz.cSumHgt = (ch > sz.cSumHgt) ? ch : sz.cSumHgt;
}
}
}

self._ZEN_Component_dataGrid_applyFilter = function() {
this._selectedIndex = -1;
var ctrl = this.findElement('filter');
if (ctrl) {
var table = this.findElement('table');
var tw = table ? table.offsetWidth : 150;
var div = this.findElement('lookupResults');
if (div) {
div.innerHTML = this.getLookupTableHTML(this._group._spec,ctrl.value);
div.scrollTop = 0;
var table = this.findElement('table');
if (table) {
table.style.width = tw + 'px';
}
}
ctrl.focus();
}
}

self._ZEN_Component_dataGrid_applyValue = function(value,text) {
if (this._applyFunction && 'function' == typeof this._applyFunction) {
this._applyFunction(value,text);
this._applyFunction = null;
}
else {
var cancel = false;
if (this.onchangecell) {
var ret = zenInvokeCallbackMethod(this.onchangecell,this,'onchangecell','value',value);
value = ret;
if (ret==null) cancel = true;
}
var r = parseInt(this.currRow,10) + this.getRowOffset()-1;
var c = parseInt(this.currColumn,10)-1;
var currValue = this.getCellValue(r,c);
if (!cancel && (value != currValue)) {
this.setCellValue(value, r, c);
if (this.onchange) {
zenInvokeCallbackMethod(this.onchange,this,'onchange','which','cell');
}
}
}
zenPage.endModal();
}

self._ZEN_Component_dataGrid_beginWait = function() {
this.showOverlay('<div class="dgWaitBox">'+this.lblWorking+'...</div>');
}

self._ZEN_Component_dataGrid_buildColumnIndex = function() {
this._columnDescIndex = null;
this._columnLeafIndex = null;
this._columnCount = 0;
this._columnDepth = 1;
var controller = this.getController();
var dcount = this.getColumnDescriptorCount();
if (dcount<=0) {
this._columnCount = controller ? controller.getDimSize(2) : 1;
}
else {
var list = [];
var dimInfo = { depth: 1 };
var array = this.getColumnDescriptors();
this.buildColumnLeafIndex(array,list,dimInfo,1,null);
this._columnDepth = dimInfo.depth;
this._columnDescIndex = [];
for (var n = 0; n < list.length; n++) {
var info = list[n];
this._columnDescIndex[this._columnDescIndex.length] = info;
}
this._columnCount = this._columnDescIndex.length;
}
}

self._ZEN_Component_dataGrid_buildColumnLeafIndex = function(columnArray,list,dimInfo,depth,parent) {
var count = 0;
for (var n = 0; n < columnArray.length; n++) {
var info = columnArray[n];
if (info && !info.hidden) {
info._rowSpan = 0;	// set later
info._depth = -1;
info._key = depth+':'+n;
info._parent = parent;
if (info.columns && info.columns.length) {
var cc = this.buildColumnLeafIndex(info.columns,list,dimInfo,depth+1,info);
count += cc;
info._colSpan = cc;
}
else {
list[list.length] = info;
count++;
if (depth>dimInfo.depth) {
dimInfo.depth = depth;
}
info._colSpan = 1;
}
}
}
if (depth==1) {
for (var n = 0; n<list.length; n++) {
var info = list[n];
var chain = [];
var p = info;
while (p) {
chain[chain.length] = p;
p = p._parent;
}
for (j = chain.length-1; j>=0; j--) {
var info = chain[j];
info._depth = chain.length - j - 1;
if (j > 0) {
info._rowSpan = 1;
}
else {
info._rowSpan = dimInfo.depth - chain.length + 1;
}
}
}
}
return count;
}

self._ZEN_Component_dataGrid_buildRowIndex = function() {
this._rowDescIndex = null;
this._rowLeafIndex = null;
this._rowCount = 0;
this._rowDepth = 1;
var controller = this.getController();
var dcount = this.getRowDescriptorCount();
if (dcount<=0) {
this._rowCount = controller ? controller.getDimSize(1) : 1;
}
else {
var list = [];
var dimInfo = { depth: 1 };
var array = this.getRowDescriptors();
this.buildRowLeafIndex(array,list,dimInfo,1,null);
this._rowDepth = dimInfo.depth;
this._rowDescIndex = [];
for (var n = 0; n < list.length; n++) {
var info = list[n];
this._rowDescIndex[this._rowDescIndex.length] = info;
}
this._rowCount = this._rowDescIndex.length;
}
}

self._ZEN_Component_dataGrid_buildRowLeafIndex = function(rowArray,list,dimInfo,depth,parent) {
var count = 0;
for (var n = 0; n < rowArray.length; n++) {
var info = rowArray[n];
if (info) {
info._colSpan = 1;	// set later
info._depth = -1;
info._key = depth+':'+n;
info._parent = parent;
if (info.rows && info.rows.length) {
var cc = this.buildRowLeafIndex(info.rows,list,dimInfo,depth+1,info);
count += cc;
info._rowSpan = cc;
}
else {
list[list.length] = info;
count++;
if (depth>dimInfo.depth) {
dimInfo.depth = depth;
}
info._rowSpan = 1;
}
}
}
if (depth==1) {
for (var n = 0; n<list.length; n++) {
var info = list[n];
var chain = [];
var p = info;
while (p) {
chain[chain.length] = p;
p = p._parent;
}
for (j = chain.length-1; j>=0; j--) {
var info = chain[j];
info._depth = chain.length - j - 1;
if (j > 0) {
info._colSpan = 1;
}
else {
info._colSpan = dimInfo.depth - chain.length + 1;
}
}
}
}
return count;
}

self._ZEN_Component_dataGrid_buildSortIndex = function() {
var col = parseInt(this.sortColumn,10)-1;
var cc = this.getColumnCount();
var okey = this.filterKey.toString();
var key = this.filterKey.toString().toLowerCase();
if ((col >= 0) || key!='') {
this._sortIndex = [];
var rows = this.getRowCount(false);
for (var r = 0; r < rows; r++) {
var include = true;
if (key!='') {
include = false;
for (c = 0; c < cc; c++) {
var val = this.getCellValue(r,c);
if (this.onfiltercell!='') {
var info = {
row:r,
col:c,
value:val,
key:okey
};
include = zenInvokeCallbackMethod(this.onfiltercell,this,'onfiltercell','info',info);
if (include) {
break;
}
}
else if (val.toString().toLowerCase().indexOf(key)>=0) {
include = true;
break;
}
}
}
if (include) {
this._sortIndex[this._sortIndex.length] = {row:r, value:col>=0?this.getCellValue(r,col):''};
}
}
if (col >=0 && this._sortIndex.length>0) {
this._sortIndex.sort(function(a,b) { return (a.value)>(b.value)?1:-1});
if ('desc'==this.sortOrder) {
this._sortIndex.reverse();
}
}
}
}

self._ZEN_Component_dataGrid_cbClick = function(which) {
this.checkedRows = '';
var rows = this.getRowsOnPage();
var cbAll = this.findElement('cball');
if (which=='all') {
if (cbAll) {
for (var r = 0; r < rows; r++) {
var cb = this.findElement('cb_'+r);
if (cb) {
cb.checked = cbAll.checked;
}
}
if (cbAll.checked) {
this.checkedRows = 'all';
}
}
}
else {
if (cbAll) {
cbAll.checked = false;
}
var list = [];
for (var r = 0; r < rows; r++) {
var cb = this.findElement('cb_'+r);
if (cb && cb.checked) {
list[list.length] = r + 1;
}
}
this.checkedRows = list.join(',');
}
zenInvokeCallbackMethod(this.onselectrow,this,'onselectrow','range',this.checkedRows);
}

self._ZEN_Component_dataGrid_cellActionHandler = function(r,name,value) {
zenInvokeCallbackMethod(this.onaction,this,'onaction','row',r,'name',name,'value',value);
}

self._ZEN_Component_dataGrid_cellClickHandler = function(row,col,evt) {
evt = evt ? evt : window.event;
this.focus();
this.selectCell(row,col,true,evt.shiftKey);
}

self._ZEN_Component_dataGrid_cellDblClickHandler = function(row,col,evt) {
var edit = true;
if ('' != this.ondblclick) {
edit = zenFireEvent(this.index, this.ondblclick, 'ondblclick', evt);
}
if (edit) {
this.editCell();
}
}

self._ZEN_Component_dataGrid_cellEditBlur = function() {
this.stopEditCell();
}

self._ZEN_Component_dataGrid_cellEditKeyHandler = function(evt) {
evt = evt ? evt : window.event;
var ret = true;
/* !!!
if ('' != this.oneditkeydown) {
ret = zenFireEvent(this.index, this.oneditkeydown, 'oneditkeydown', evt);
if (!ret) {
return false;
}
}
*/
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
this.killEvent(evt);
}
return ret;
}

self._ZEN_Component_dataGrid_cellEditKeyUpHandler = function(evt) {
evt = evt ? evt : window.event;
var ret = true;
if ('' != this.oneditkeyup) {
ret = zenFireEvent(this.index, this.oneditkeyup, 'oneditkeyup', evt);
}
return ret;
}

self._ZEN_Component_dataGrid_cellInputClickHandler = function(event) {
this.F2Mode = true;
this.killEvent(event);
}

self._ZEN_Component_dataGrid_cellMouseOut = function(row,col,evt) {
evt = evt ? evt : window.event;
if ('rows' == this.selectMode) {
var startCol = 0;
var endCol = this.getColumnCount();
}
else {
var startCol = col-1;
var endCol = startCol;
}
for (var c = startCol; c <= endCol; c++) {
var outer = this.findElement('c_'+(row-1)+':'+(c));
if (outer) {
var div = this.findElement('overlay');
if (div) {
var orig = outer.getAttribute('origStyle');
div.style.cssText = orig;
outer.style.backgroundColor = div.style.backgroundColor;
}
}
}
}

self._ZEN_Component_dataGrid_cellMouseOver = function(row,col,evt) {
evt = evt ? evt : window.event;
if ('rows' == this.selectMode) {
var startCol = 0;
var endCol = this.getColumnCount();
}
else {
var startCol = col-1;
var endCol = startCol;
}
for (var c = startCol; c <= endCol; c++) {
var outer = this.findElement('c_'+(row-1)+':'+(c));
if (outer) {
outer.style.backgroundColor = this.cellHoverColor;
}
}
}

self._ZEN_Component_dataGrid_cellScrollHz = function() {
var hzScroll = this.findElement('hzScroll');
var topRight = this.findElement('colHdrs');
var bottomRight = this.findElement('cells');
var summary = this.findElement('summary');
if (topRight && hzScroll) {
topRight.scrollLeft = hzScroll.scrollLeft;
}
if (bottomRight && hzScroll) {
bottomRight.scrollLeft = hzScroll.scrollLeft;
}
if (summary && hzScroll) {
summary.scrollLeft = hzScroll.scrollLeft;
}
}

self._ZEN_Component_dataGrid_cellScrollVt = function() {
var vtScroll = this.findElement('vtScroll');
var bottomLeft = this.findElement('rowHdrs');
var bottomRight = this.findElement('cells');
if (bottomLeft && vtScroll) {
bottomLeft.scrollTop = vtScroll.scrollTop;
}
if (bottomRight && vtScroll) {
bottomRight.scrollTop = vtScroll.scrollTop;
}
}

self._ZEN_Component_dataGrid_columnClickHandler = function(evt,col) {
evt = evt ? evt : window.event;
col = parseInt(col,10) + 1;
var ok = true;
if ('' != this.onheaderclick) {
ok = zenInvokeCallbackMethod(this.onheaderclick,this,'onheaderClick','which','column','index',col);
}
if (ok) {
this.highlightCells(false);
var p = [1,col,this.getRowCount(),col];
this.selectedRange = p.join(',');
this.selectCell(1,col,true,true);
}
}

self._ZEN_Component_dataGrid_columnDblClickHandler = function(evt,col) {
evt = evt ? evt : window.event;
/*
if (colInfo && colInfo.disableSort) {
if ('' != this.onheaderClick) {
zenInvokeCallbackMethod(this.onheaderClick,this,'onheaderClick');
}
return;
}
*/
if (this.sortColumn == (col+1)) {
switch (this.sortOrder) {
case 'asc':
this.sortOrder = 'desc';
break;
case 'desc':
this.sortOrder = '';
this.sortColumn = 0;
break;
default:
this.sortOrder = 'asc';
break;
}
}
else {
this.sortColumn = col+1;
this.sortOrder = 'asc';
}
if (this.sortMode == 'client') {
this.updateCells(false,true);
}
return true;
}

self._ZEN_Component_dataGrid_connectToController = function() {
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

self._ZEN_Component_dataGrid_defineGetComputedStyle = function() {
if (!window.getComputedStyle) {
window.getComputedStyle = function(el, pseudo) {
this.el = el;
this.getPropertyValue = function(prop) {
var re = /(\-([a-z]){1})/g;
if (prop == 'float') prop = 'styleFloat';
if (re.test(prop)) {
prop = prop.replace(re, function () {
return arguments[2].toUpperCase();
});
}
return el.currentStyle[prop] ? el.currentStyle[prop] : null;
}
return this;
}
}
}

self._ZEN_Component_dataGrid_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._ZEN_Component_dataGrid_editCell = function(defval,which) {
var value;
var r = parseInt(this.currRow,10);
var c = parseInt(this.currColumn,10);
which = ('undefined'==typeof which) ? 'cell' : which;
defval = ('undefined'==typeof defval) ? null : defval;
if ((which=='cell') && !this.isCellEditable(r,c)) {
return;
}
var cellCurr = null;
if (r > 0 && c > 0) {
switch(which) {
case 'row':
break;
case 'column':
break;
default:
cellCurr = this.findElement('c_'+(r-1)+':'+(c-1));
value = defval ? defval : this.getCellEditData(r-1,c-1);
break;
}
this.currEditType = which;
var div = this.getCellSelector();
if (cellCurr && div) {
var isLookup = false;
var cInfo = this.getColumnInfo(c-1);
var type = cInfo.type ? cInfo.type : 'string';
var html = [];
switch(type) {
case 'lookup':
this.showPopup();
break;
case 'image':
break;
case 'string':
default:
html[html.length] = '<input id="'+this.makeId('cellEditor')+'" class="dgCellEditor" type="text" onclick="zenPage.getComponent('+this.index+').cellInputClickHandler(event);" onkeydown="zenPage.getComponent('+this.index+').cellEditKeyHandler(event);" onkeyup="zenPage.getComponent('+this.index+').cellEditKeyUpHandler(event);" onblur="zenPage.getComponent('+this.index+').cellEditBlur();"/>';
break;
}
div.innerHTML = html.join('');
var celledit = this.getCellEditor();
if (celledit) {
celledit.value = value;
celledit.style.width = cellCurr.clientWidth-1 + 'px';
celledit.style.height = cellCurr.clientHeight-1 + 'px';
var inner = cellCurr.firstChild;
if (inner) {
celledit.style.fontFamily = cellCurr.style.fontFamily;
celledit.style.fontSize = inner.style.fontSize;
celledit.style.color = cellCurr.style.color;
}
celledit.style.padding = '0px';
this.cellHasFocus = true;
if (celledit.focus) {
celledit.focus();
}
if (defval) {
if (celledit.setSelectionRange) {
var ln = value.toString().length;
celledit.setSelectionRange(ln,ln);
}
else { // ie!
celledit.value = celledit.value;
}
}
if (!defval && celledit.select) {
celledit.select();
}
}
}
}
}

self._ZEN_Component_dataGrid_endWait = function() {
this.hideOverlay();
}

self._ZEN_Component_dataGrid_evaluate = function(expr,row,col) {
var value = '';
if (this._engine) {
value = this._engine.evaluate(expr,row,col);
value = (value===null) ? expr : value;
}
return value;
}

self._ZEN_Component_dataGrid_extractUserStyleSetting = function(styleStr,attr) {
var value = null;
if (styleStr.length) {
var styleS = styleStr.split(" ").join("");
var styleArr = styleStr.split(";");
var len = styleArr.length;
for (var i=0;i<len;i++) {
var nvp = styleArr[i].split(":");
if (nvp[0]==attr) value=nvp[1];
}
}
return(value);
}

self._ZEN_Component_dataGrid_filterKeyDown = function(evt) {
evt = evt ? evt : window.event;
var ret = true;
switch(evt.keyCode) {
case zenESC:
ret = false;
zenPage.endModal();
break;
case zenENTER:
ret = false;
var spec = this._group._spec;
var array = spec ? spec.data : null;
if (this._selectedIndex>=0 && array && array[this._selectedIndex]) {
var rno = this._rowIndex[this._selectedIndex]
var record = array[rno];
if ('object' == typeof record) {
var id = spec.idProperty&&spec.idProperty!=='' ? record[spec.idProperty] : null;
var text = spec.textProperty&&spec.textProperty!=='' ? record[spec.textProperty] : null;
id = (null === id) ? n : id;
text = (null === text) ? id : text;
}
else {
var id = record;
var text = record;
}
this.applyValue(id,text);
}
break;
case zenDOWN:
var index = this._selectedIndex>=0 ? this._selectedIndex+1 : 0;
if (index < this._itemCount) {
this.selectPopupItem(index);
}
ret = false;
break;
case zenUP:
var index = this._selectedIndex>=1 ? this._selectedIndex-1 : 0;
if (index >= 0) {
this.selectPopupItem(index);
}
ret = false;
break;
case zenPAGEUP:
this.selectPopupItem(0);
ret = false;
break;
case zenPAGEDN:
this.selectPopupItem(this._itemCount - 1);
ret = false;
break;
default:
break;
}
if (!ret) {
this.killEvent(evt);
}
return ret;
}

self._ZEN_Component_dataGrid_filterKeyUp = function(evt) {
evt = evt ? evt : window.event;
var ret = true;
switch(evt.keyCode) {
case zenESC:
case zenENTER:
case zenDOWN:
case zenUP:
case zenPAGEUP:
case zenPAGEDN:
ret = false;
break;
default:
this.applyFilter();
break;
}
return ret;
}

self._ZEN_Component_dataGrid_focus = function() {
if (this._popupVisible) {
return;
}
var inv = this.findElement('invisible');
if (inv) {
setTimeout("document.getElementById('"+inv.id+"').focus();",100)
}
}

self._ZEN_Component_dataGrid_getCellColumnCount = function() {
return this.getColumnCount();
}

self._ZEN_Component_dataGrid_getCellColumnName = function(c) {
var cInfo = this.getColumnInfo(c);
return cInfo && cInfo.name ? cInfo.name : '';
}

self._ZEN_Component_dataGrid_getCellContent = function(value,r,c) {
var userInfo = null;
if (this.ondrawcell) {
userInfo = zenInvokeCallbackMethod(this.ondrawcell,this,'ondrawcell','value',value,'row',r+1,'col',c+1);
}
return userInfo;
}

self._ZEN_Component_dataGrid_getCellData = function(r,c) {
var controller = this.getController();
var cInfo = this.getColumnInfo(c);
var value = '';
if (cInfo && ('undefined'!=typeof cInfo.value) && cInfo.value!=='') {
value = cInfo.value;
}
else if (controller) {
value = controller.getData(r,c);
}
return value;
}

self._ZEN_Component_dataGrid_getCellEditData = function(r,c) {
r = parseInt(r,10) + this.getRowOffset();
var rx = this._sortIndex ? this._sortIndex[r].row : r;
if (this.hasFormulas) {
return this.getCellData(rx,c);
}
else {
return this.getCellValue(rx,c);
}
}

self._ZEN_Component_dataGrid_getCellEditor = function() {
return this.findElement('cellEditor');
}

self._ZEN_Component_dataGrid_getCellExternalData = function(r,prop) {
var controller = this.getController();
var rx = this._sortIndex ? this._sortIndex[parseInt(r,10)].row : r;
var value = controller ? controller.getDataByName(prop,rx) : '';
return value;
}

self._ZEN_Component_dataGrid_getCellRowCount = function() {
return this.getRowCount(false);
}

self._ZEN_Component_dataGrid_getCellSelector = function() {
return this.findElement('selector');
}

self._ZEN_Component_dataGrid_getCellValue = function(r,c) {
var value = '';
var array = this.getColumnDescriptors();
if (this._engine && array && array.length>0) {
value = this._engine.getCellValue(r,c);
}
else {
var controller = this.getController();
value = controller ? controller.getData(r,c) : '';
}
if ('undefined' == typeof value) {
value = '';
}
return value;
}

self._ZEN_Component_dataGrid_getColumnCount = function() {
return this._columnCount ? this._columnCount : 1;
}

self._ZEN_Component_dataGrid_getColumnDescriptor = function(c) {
var array = this.getColumnDescriptors();
return array ? array[c] : null;
}

self._ZEN_Component_dataGrid_getColumnDescriptorCount = function() {
var array = this.getColumnDescriptors();
return array ? array.length : 0;
}

self._ZEN_Component_dataGrid_getColumnDescriptors = function() {
var controller = this.getController();
if (controller && controller.getColumnDescriptors) {
return controller.getColumnDescriptors();
}
return this.columnDescriptors;
}

self._ZEN_Component_dataGrid_getColumnInfo = function(c) {
var cInfo = null;
if (this._columnDescIndex) {
cInfo = this._columnDescIndex[c];
}
else {
var array = this.getColumnDescriptors();
cInfo = array ? array[c] : null;
}
if (cInfo) {
cInfo._index = c;
}
else {
var controller = this.getController();
cInfo = { caption: controller?controller.getLabel(c,2):'', _index:c };
}
return cInfo;
}

self._ZEN_Component_dataGrid_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._ZEN_Component_dataGrid_getCurrColumn = function() {
return parseInt(this.currColumn,10);
}

self._ZEN_Component_dataGrid_getCurrPage = function() {
if (this.pagingMode=='server') {
var controller = this.getController();
if (controller && controller.getCurrPage) {
return controller.getCurrPage();
}
return 1;
}
return parseInt(this.currPage,10);
}

self._ZEN_Component_dataGrid_getCurrRow = function() {
return parseInt(this.currRow,10);
}

self._ZEN_Component_dataGrid_getDesignMode = function() {
return false;
}

self._ZEN_Component_dataGrid_getLookupTableHTML = function(spec,filter) {
filter = zenGet(filter);
filter = filter.toString().toLowerCase();
var array = spec ? spec.data : null;
var value = spec ? spec.value : null;
this._selectedIndex = -1;
this._itemCount = 0;
this._rowIndex = [];
var styles = null;
if (spec.styleList && spec.styleList!=='') {
styles = spec.styleList.toString().split(',');
}
var html = [];
if (!array || !array.length) {
html[html.length] = '<div>';
html[html.length] = $$$Text('Nothing to show!');
html[html.length] = '</div>';
}
else {
html[html.length] = '<table id="'+this.makeId('table')+'" class="dgLookupResultTable" cellspacing="0" border="0" cellpadding="0">';
for (var n = 0; n < array.length; n++) {
var record = array[n];
if ('object' == typeof record) {
var id = spec.idProperty&&spec.idProperty!=='' ? record[spec.idProperty] : null;
var text = spec.textProperty&&spec.textProperty!=='' ? record[spec.textProperty] : null;
id = (null === id || 'undefined' == typeof id) ? n : id;
text = (null === text || 'undefined' == typeof text) ? id : text;
var image = spec.imageProperty&&spec.imageProperty!=='' ? record[spec.imageProperty] : null;
}
else {
var id = record;
var text = record;
var image = null;
}
var values = [];
if ('object' == typeof record) {
if (image) {
}
else if (spec.propertyList && spec.propertyList!=='') {
var t = spec.propertyList.toString().split(',');
for (var i = 0; i < t.length; i++) {
values[i] = record[t[i]];
}
}
else {
values[0] = text;
}
}
else {
values[0] = record;
}
var skip = false;
if (filter!='') {
skip = true;
for (var i = 0; i < values.length; i++) {
if (values[i].toString().toLowerCase().indexOf(filter)>=0) {
skip = false;
break;
}
}
}
if (!skip) {
this._rowIndex[this._itemCount] = n;
var cls = this._itemCount%2 ? 'dgLookupEven' : 'dgLookupOdd';
if (id == value) {
cls = 'dgLookupSelected';
this._selectedIndex = this._itemCount;
}
html[html.length] = '<tr class="'+cls+'" id="'+this.makeId('tr_'+this._itemCount)+'" onclick="zenPage.getComponent('+this.index+').applyValue(\''+id+'\',\''+text+'\');">';
if (image) {
html[html.length] = '<td>' + '<image class="dgLookupImage" src="'+image+'"/>' + '</td>';
}
else {
for (var i = 0; i < values.length; i++) {
var style = styles&&styles[i] ? styles[i] : '';
html[html.length] = '<td style="'+style+'">' + zenEscapeXML(values[i]) + '</td>';
}
}
html[html.length] = '</tr>';
this._itemCount++;
}
}
html[html.length] = '</table>';
}
return html.join('');
}

self._ZEN_Component_dataGrid_getPageCount = function() {
var pageCount = 1;
var pageSize = this.getPageSize();
if (pageSize > 0) {
var rows = this.getRowCount();
pageCount = Math.ceil(rows / pageSize);
}
return pageCount;
}

self._ZEN_Component_dataGrid_getPageSize = function() {
if (this.pagingMode=='server') {
var controller = this.getController();
if (controller && controller.getPageSize) {
return controller.getPageSize();
}
return 0;
}
return parseInt(this.pageSize,10);
}

self._ZEN_Component_dataGrid_getPagingHTML = function() {
var html = [];
var pageSize = this.getPageSize();
if (pageSize > 0) {
var pageCount = this.getPageCount();
if (pageCount>1) {
var currPage = this.getCurrPage();
var btnPad = 5;
var btnWid = 18;
var buttons = [];
for (var n = 0; n < pageCount; n++) {
buttons.splice(n,0,n+1);
}
if (pageCount > 7) {
if (currPage < 5) {
var startNo = null;
var endNo = 5;
}
else if (currPage > pageCount - 5) {
var startNo = pageCount - 5;
var endNo = null;
}
else {
var startNo = currPage - 2;
var endNo = currPage + 1;
}
if (endNo!==null) {
for (var n = endNo+1; n < pageCount; n++) {
buttons.splice(endNo,1);
}
buttons.splice(endNo,0,'');
}
if (startNo!==null) {
for (var n = 1; n < startNo; n++) {
buttons.splice(1,1);
}
buttons.splice(1,0,'');
}
}
var prevChar = '&#9668;';
var nextChar = '&#9658;';
buttons.splice(0,0,prevChar);
buttons[buttons.length] = nextChar;
var x = 0;
var wid = (btnWid + btnPad) * buttons.length;
html[html.length] = '<div class="dgPageDiv" id="'+this.makeId('pagingDiv')+'" style="width:'+wid+'px;">';
for (var n = 0; n < buttons.length; n++) {
x += btnWid + btnPad;
if (buttons[n] == '') {
html[html.length] = '<div style="position:absolute;text-align:center;width:'+btnWid+'px;top:2px;left:'+x+'px;">...</div>';
}
else {
var cls = (currPage==buttons[n]) ? 'dgPageButtonCurr' : 'dgPageButton';
var onclick = '';
if (buttons[n]==prevChar) {
if (currPage<=1) {
cls = 'dgPageButtonDis';
}
else {
onclick = 'onclick="zenPage.getComponent('+this.index+').prevPage();"';
}
}
else if (buttons[n]==nextChar) {
if (currPage<pageCount) {
onclick = 'onclick="zenPage.getComponent('+this.index+').nextPage();"';
}
else {
cls = 'dgPageButtonDis';
}
}
else {
onclick = 'onclick="zenPage.getComponent('+this.index+').setCurrPage('+buttons[n]+');"';
}
html[html.length] = '<input type="button" class="'+cls+'" style="width:'+btnWid+'px;top:2px;left:'+x+'px;" '+onclick+' value="'+buttons[n]+'" />';
}
}
html[html.length] = '</div>';
}
}
return html.join('');
}

self._ZEN_Component_dataGrid_getPopupContent = function(group) {
var spec = group._spec;
var html = [];
var showFilter = true;
var hstyle = showFilter ? 'white-space:nowrap;' : 'height:0px; width:0px; overflow:hidden; font-size:0px; line-height:0px';
html[html.length] = '<div style="'+hstyle+'" nowrap="1">'
html[html.length] = '<input id="'+this.makeId('filter')+'" class="dgLookupFilter" onkeydown="return zenPage.getComponent('+this.index+').filterKeyDown(event);" onkeyup="return zenPage.getComponent('+this.index+').filterKeyUp(event);" type="text"/>';
html[html.length] = '</div>';
html[html.length] = '<div id="'+this.makeId('lookupResults')+'" class="dgLookupResults" style="height:200px; overflow-x:auto;overflow-y:scroll;" id="'+this.makeId('results')+'">';
html[html.length] = this.getLookupTableHTML(spec);
html[html.length] = '</div>';
var info = {
style:'width:auto;background:#F0F0F0;',
content: html.join('')
};
return info;
}

self._ZEN_Component_dataGrid_getRowCount = function(filtered) {
if (this.pagingMode=='server') {
var controller = this.getController();
if (controller && controller.getRecordCount) {
return controller.getRecordCount();
}
return 0;
}
filtered = 'undefined' == typeof filtered ? true : filtered;
if (filtered && this.filterKey !='' && this._sortIndex) {
return this._sortIndex.length;
}
return this._rowCount ? this._rowCount : 1;
}

self._ZEN_Component_dataGrid_getRowDescriptor = function(r) {
var array = this.getRowDescriptors();
return array ? array[r] : null;
}

self._ZEN_Component_dataGrid_getRowDescriptorCount = function() {
var array = this.getRowDescriptors();
return array ? array.length : 0;
}

self._ZEN_Component_dataGrid_getRowDescriptors = function() {
var controller = this.getController();
if (controller && controller.getRowDescriptors) {
return controller.getRowDescriptors();
}
return this.rowDescriptors;
}

self._ZEN_Component_dataGrid_getRowHeaderLabels = function() {
var hdrLabels = [];
var controller = this.getController();
if (controller && controller.getRowCaptions) {
hdrLabels = controller.getRowCaptions();
}
return hdrLabels;
}

self._ZEN_Component_dataGrid_getRowInfo = function(r) {
var rInfo = null;
if (this._rowDescIndex) {
rInfo = this._rowDescIndex[r];
}
else {
var array = this.getRowDescriptors();
rInfo = array ? array[r] : null;
}
if (rInfo) {
rInfo._index = r;
}
else {
var controller = this.getController();
rInfo = { caption: controller?controller.getLabel(r,1):'', _index:r };
}
return rInfo;
}

self._ZEN_Component_dataGrid_getRowOffset = function() {
return (parseInt(this.currPage,10)-1) * parseInt(this.pageSize,10);
}

self._ZEN_Component_dataGrid_getRowValue = function(row) {
var r = parseInt(row,10) - 1 + this.getRowOffset();
var rx = this._sortIndex ? this._sortIndex[r].row : r;
var c = parseInt(this.valueColumn,10) - 1;
return this.getCellValue(rx,c);
}

self._ZEN_Component_dataGrid_getRowsOnPage = function() {
var pageSize = this.getPageSize();
if (pageSize <= 0) {
var rows = this.getRowCount();
}
else {
var rc = this.getRowCount();
var currPage = this.getCurrPage();
if (rc <= 0) {
var rows = 0;
}
else if (currPage < this.getPageCount()) {
var rows = pageSize;
}
else {
var rows = rc % pageSize;
rows = (rows <= 0) ? pageSize : rows;
}
}
return rows;
}

self._ZEN_Component_dataGrid_getSearchDiv = function() {
return this.findElement('lookupResults');
}

self._ZEN_Component_dataGrid_gridKeyBlur = function() {
this.hasFocus = false;
this.selectCell(this.currRow,this.currColumn,false,false);
}

self._ZEN_Component_dataGrid_gridKeyDownHandler = function(evt) {
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
this.editCell(this.getCellEditData(row-1,col-1));
}
break;
case zenPAGEUP:
ret = false;
this.prevPage();
break;
case zenPAGEDN:
ret = false;
this.nextPage();
break;
case zenEND:
ret = false;
this.moveToCell(evt.ctrlKey ? 'ctrl-end' : 'end',evt.shiftKey);
break;
case zenHOME:
ret = false;
this.moveToCell(evt.ctrlKey ? 'ctrl-home' : 'home',evt.shiftKey);
break;
case zenUP:
ret = false;
this.moveToCell('up',evt.shiftKey);
break;
case zenDOWN:
ret = false;
this.moveToCell('down',evt.shiftKey);
break;
case zenLEFT:
ret = false;
this.moveToCell('left',evt.shiftKey);
break;
case zenRIGHT:
ret = false;
this.moveToCell('right',evt.shiftKey);
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
this.killEvent(evt);
}
return ret;
}

self._ZEN_Component_dataGrid_gridKeyFocus = function() {
this.hasFocus = true;
this.selectCell(this.currRow,this.currColumn,false,true);
}

self._ZEN_Component_dataGrid_gridKeyPressHandler = function(evt) {
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
var charCode = ('undefined' == typeof evt.charCode) || (evt.charCode===null) ? evt.keyCode : evt.charCode;
if (charCode >= 32) {
ret = false;
if (this.isCellEditable(row,col)) {
var seed = charCode ? String.fromCharCode(charCode) : null;
this.editCell(seed);
}
}
}
if (!ret) {
this.killEvent(evt);
}
return ret;
}

self._ZEN_Component_dataGrid_hideGroupHandler = function() {
this._popupVisible = false;
this.focus();
}

self._ZEN_Component_dataGrid_hideMessage = function() {
this.hideOverlay();
}

self._ZEN_Component_dataGrid_hideOverlay = function() {
var div = this.findElement('overlay');
if (div) {
div.innerHTML = '';
div.style.opacity = 0.0;
div.style.display = 'none';
}
}

self._ZEN_Component_dataGrid_highlightCells = function(flag) {
if (this.selectedRange!='') {
var p = this.selectedRange.split(',');
}
else {
p = [this.currRow,this.currColumn,this.currRow,this.currColumn];
}
for (var r = parseInt(p[0],10); r<=parseInt(p[2],10);r++) {
var outer = this.findElement('rh_0_'+(r-1));
if (outer) {
outer.className = flag ? 'dgHdrSelected' : 'dgHdr';
}
}
if (!flag || this.selectMode!='rows') {
for (var c = parseInt(p[1],10); c<=parseInt(p[3],10);c++) {
var outer = this.findElement('ch_0_'+(c-1));
if (outer) {
outer.className = flag ? 'dgHdrSelected' : 'dgHdr';
}
}
}
var cellCurr = this.findElement('c_'+(parseInt(this.currRow,10)-1)+':'+(parseInt(this.currColumn,10)-1));
if (cellCurr) {
if (flag) {
cellCurr.style.color = this.currCellColor;
cellCurr.style.backgroundColor = this.currCellBackground;
}
else {
var div = this.findElement('overlay');
if (div) {
var orig = cellCurr.getAttribute('origStyle');
div.style.cssText = orig;
cellCurr.style.color = div.style.color;
cellCurr.style.backgroundColor = div.style.backgroundColor;
}
}
}
}

self._ZEN_Component_dataGrid_initEngine = function() {
if (!this._engine) {
this._engine = new dsFormulaEngine(this);
if (this.ongetfunctions) {
var funcSet = zenInvokeCallbackMethod(this.ongetfunctions,this,'ongetfunctions');
if (funcSet) {
this._engine.parser.setFunctionSet(funcSet);
}
}
}
}

self._ZEN_Component_dataGrid_initializeSizingObject = function(inResize,encDiv,titleDiv) {
var sz = {};
var style = window.getComputedStyle(encDiv,null);
var bdLeft = parseInt(style.getPropertyValue("border-left-width"),10);
var bdRight = parseInt(style.getPropertyValue("border-right-width"),10);
var bdTop = parseInt(style.getPropertyValue("border-top-width"),10);
var bdBottom = parseInt(style.getPropertyValue("border-bottom-width"),10);
sz.encHgt = encDiv.offsetHeight - (bdLeft + bdRight);
sz.encWid = encDiv.offsetWidth - (bdTop + bdBottom);
sz.colDepth = (this._columnDepth?this._columnDepth:1);
sz.rowDepth = (this._rowDepth?this._rowDepth:1);
sz.rHdrWid = [];
for (var rh = 0; rh < sz.rowDepth; rh++) {
sz.rHdrWid[rh] = (this.rowLabelWidth=='') ? 0 : parseInt(this.rowLabelWidth,10);
}
sz.cHdrHgt = 0;
var uHeight = this.extractUserStyleSetting(this.columnHeaderStyle,"height");
if (uHeight && uHeight.indexOf("px")>0) {
sz.cHdrHgt = parseInt(uHeight,10);
}
sz.cwid = [];
sz.cSumHgt = 0;
sz.rHdrHgt = 0;
var uHeight = this.extractUserStyleSetting(this.rowHeaderStyle,"height");
if (uHeight && uHeight.indexOf("px")>0) {
sz.rHdrHgt = parseInt(uHeight,10);
}
if (this.rowHeight!='') {
var rh = parseInt(this.rowHeight,10);
if (rh>sz.rHdrHgt) sz.rHdrHgt = rh;
}
sz.rhgt = [];
sz.firstCol = 0;
sz.titleHgt = titleDiv ? titleDiv.offsetHeight : 0;
if (!inResize && this.showRowSelector) {
var outer = this.findElement('ch_0_'+'cb');
if (outer) {
var cell = outer.firstChild;
sz.cbWid = cell.offsetWidth;
}
}
else {
sz.cbWid = 0;
}
return(sz);
}

self._ZEN_Component_dataGrid_isCellEditable = function(r,c) {
if ('rows' == this.selectMode || this.readOnly) {
return false;
}
var canEdit = true;
var cInfo = this.getColumnInfo(parseInt(c,10)-1);
if (cInfo) {
switch(cInfo.type) {
case 'image':
case 'button':
case 'link':
case 'checkbox':
canEdit = false;
break;
default:
canEdit = !cInfo.readOnly;
break;
}
}
return canEdit;
}

self._ZEN_Component_dataGrid_isCellVisible = function(r,c) {
return true;
}

self._ZEN_Component_dataGrid_killEvent = function(evt) {
if (evt.preventDefault) {
evt.preventDefault();
}
if (evt.stopPropagation) {
evt.stopPropagation();
}
else {
evt.cancelBubble = true;
}
}

self._ZEN_Component_dataGrid_moveCellSelector = function(startRow,startCol,endRow,endCol) {
endRow = zenGet(endRow,startRow);
endCol = zenGet(endCol,startCol);
var div = this.findElement('selector');
if (!div) return;
var szHandle = this.findElement('sizeHandle');
var actionIcon = this.findElement('action');
div.className = this.hasFocus||this._handleMove ? 'dgSelectorFocus' : 'dgSelector';
var cellsDiv = this.findElement('cells');
var vtScroll = this.findElement('vtScroll');
var hzScroll = this.findElement('hzScroll');
if (szHandle) {
szHandle.style.display = 'none';
}
if (actionIcon) {
actionIcon.style.display = 'none';
}
if (startRow <= 0 || startCol <= 0) {
div.style.display = 'none';
cellsDiv.scrollTop = 0;
cellsDiv.scrollLeft = 0;
vtScroll.scrollTop = 0;
hzScroll.scrollLeft = 0;
}
else {
var cellTL = this.findElement('c_'+(startRow-1)+':'+(startCol-1));
if (!cellTL) {
div.style.display = 'none';
}
else {
div.style.display = 'block';
if (endRow == startRow && endCol == startCol) {
var cellBR = cellTL;
}
else {
var cellBR = this.findElement('c_'+(endRow-1)+':'+(endCol-1));
}
if (cellTL&&cellBR) {
var top = cellTL.offsetTop;
var left = cellTL.offsetLeft;
var hgt = (cellBR.offsetTop - cellTL.offsetTop) + cellBR.offsetHeight;
var wid = (cellBR.offsetLeft - cellTL.offsetLeft) + cellBR.offsetWidth;
div.style.top = top-1 + 'px';
div.style.left = left-1 + 'px';
div.style.width = wid-2 + 'px';
div.style.height = hgt-2 + 'px';
if (szHandle) {
szHandle.style.display = 'block';
szHandle.style.top = top+hgt-3 + 'px';
szHandle.style.left = left+wid-3 + 'px';
}
var cellCurr = this.findElement('c_'+(parseInt(this.currRow,10)-1)+':'+(parseInt(this.currColumn,10)-1));
if (cellCurr) {
if (actionIcon) {
var cInfo = this.getColumnInfo(parseInt(this.currColumn,10)-1);
if (!cInfo || cInfo.type != 'lookup' || cInfo.readOnly) {
actionIcon.style.display = 'none';
}
else {
actionIcon.style.display = 'block';
actionIcon.style.top = cellCurr.offsetTop + 'px';
actionIcon.style.left = (cellCurr.offsetLeft + cellCurr.offsetWidth - actionIcon.offsetWidth) + 'px';
actionIcon.style.height = (cellCurr.offsetHeight-2) + 'px';
}
}
var top = cellCurr.offsetTop;
var bottom = cellCurr.offsetTop + cellCurr.offsetHeight;
if (bottom > (cellsDiv.offsetHeight+cellsDiv.scrollTop)) {
cellsDiv.scrollTop = (bottom - cellsDiv.offsetHeight);
vtScroll.scrollTop = (bottom - cellsDiv.offsetHeight);
}
else if (top < cellsDiv.scrollTop) {
cellsDiv.scrollTop = top;
vtScroll.scrollTop = top;
}
var left = cellCurr.offsetLeft;
var right = cellCurr.offsetLeft + cellCurr.offsetWidth;
if (right > (cellsDiv.offsetWidth+cellsDiv.scrollLeft)) {
cellsDiv.scrollLeft = (right - cellsDiv.offsetWidth);
hzScroll.scrollLeft = (right - cellsDiv.offsetWidth);
}
else if (left < cellsDiv.scrollLeft) {
cellsDiv.scrollLeft = left;
hzScroll.scrollLeft = left;
}
}
}
}
}
}

self._ZEN_Component_dataGrid_moveToCell = function(dir,updateRange) {
var ret = false;
updateRange = 'undefined' == typeof updateRange ? false : updateRange;
var row = this.currRow;
var col = this.currColumn;
var colCount = this.getColumnCount();
var rowCount = this.getRowsOnPage();
switch(dir) {
case 'up':
row--;
while (row > 0) {
if (this.isCellVisible(row,col)) {
if (col >= 0) {
this.selectCell(row,col,true,updateRange);
}
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
if (col >= 0) {
this.selectCell(row,col,true,updateRange);
}
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
if (row < 0) {
}
else {
this.selectCell(row, col,true,updateRange);
}
ret = true;
break;
}
col--;
}
break;
case 'right':
col++;
while (col <= colCount) {
if (col>0 && this.isCellVisible(row,col)) {
if (row >= 0) {
this.selectCell(row, col,true,updateRange);
}
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
if (col >= 0) {
this.selectCell(row, col,true,updateRange);
}
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
if (col >= 0) {
this.selectCell(row, col,true,updateRange);
}
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
if (row >= 0) {
this.selectCell(row, col,true,updateRange);
}
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
if (row < 0) {
}
else {
this.selectCell(row, col,true,updateRange);
}
ret = true;
break;
}
col--;
}
break;
}
return ret;
}

self._ZEN_Component_dataGrid_nextPage = function() {
this.setCurrPage(parseInt(this.currPage,10) + 1);
}

self._ZEN_Component_dataGrid_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._ZEN_Component_dataGrid_notifyViewHandler = function(reason,data1,data2,data3) {
switch(reason) {
case 'dataChange':
if (!this._inSetValue) {
this.updateGrid(false);
}
break;
case 'seriesChange':
break;
case 'modelChange':
this.updateGrid();
break;
}
}

self._ZEN_Component_dataGrid_onCreate = function() {
this.hasFocus = false;
this.cellHasFocus = false;
this.F2Mode = false;
this.currEditType = null;
}

self._ZEN_Component_dataGrid_prevPage = function() {
this.setCurrPage(parseInt(this.currPage,10) - 1);
}

self._ZEN_Component_dataGrid_reallyUpdateCells = function() {
delete this._updateTimer;
this.renderCells(true);
this.adjustSizes();
this.endWait();
}

self._ZEN_Component_dataGrid_recalc = function() {
if (this._engine) {
this._engine.recalc();
}
}

self._ZEN_Component_dataGrid_renderCells = function(recalc) {
try {
recalc = zenGet(recalc,false);
var controller = this.getController();
var html = [];
if (!this._rowDescIndex) {
this.buildRowIndex();
}
if (!this._columnDescIndex) {
this.buildColumnIndex();
}
this._sortIndex = null;
if (recalc) {
this.recalc();
}
if (this.filterKey!='' || (this.sortMode=='client' && this.sortOrder!='' && this.sortColumn>0)) {
this.buildSortIndex();
}
var dataIndexCorrected = false;
var array = this.getColumnDescriptors();
if (this._engine && array && array.length>0) {
var dataIndexCorrected = true;
}
var cols = this.getColumnCount();
var rows = this.getRowsOnPage();
if (parseInt(this.currRow,10) > rows) {
this.currRow = rows;
this.selectedRange = '';
}
var cellPadH = 1;
var cellPadW = 1;
var cellHgt = parseInt(this.rowHeight,10);
cellHgt = isNaN(cellHgt) ? 20 : cellHgt;
var cellWid = parseInt(this.columnWidth,10);
cellWid = isNaN(cellWid) ? 50 : cellWid;
var colHeaderHgt = 40;
var uHeight = this.extractUserStyleSetting(this.columnHeaderStyle,"height");
if (uHeight && uHeight.indexOf("px")>0) {
this.columnHeaderStyle = "display:block;"+this.columnHeaderStyle;
colHeaderHgt = parseInt(uHeight,10);
}
var rowHeaderWid = 150;
var offset = this.getRowOffset();
if (!this._columnWidths) {
this._columnWidths = [];
}
if (this.showRowSelector) {
if (this.checkedRows == 'all') {
var cbAll = true;
}
else {
var cbAll = false;
var cbList = {};
var list = this.checkedRows.toString().split(',');
for (var t = 0; t < list.length; t++) {
cbList[list[t]-1] = true;
}
}
}
var colParents = {};
var rowParents = {};
var div = this.findElement('colHdrs');
if (div) {
html = [];
var cy = 0;
var cx = cellPadW;
/* check box */
if (this.showRowSelector) {
var checked = cbAll ? 'checked="1"' : '';
html[html.length] = '<div id="'+this.makeId('ch_0_'+'cb')+'" class="dgHdr" style="top:'+cy+'px;left:'+cx+'px;width:'+cellWid+'px;height:'+colHeaderHgt+'px;" >';
html[html.length] = '<div class="dgHdrColInner">';
html[html.length] = '<input '+checked+' type="checkbox" id="'+this.makeId('cball')+'" onclick="zenPage.getComponent('+this.index+').cbClick(\'all\');" />'
html[html.length] = '</div>';
html[html.length] = '</div>';
}
if (this.canResizeColumns) {
html[html.length] = '<div id="'+this.makeId('rszlabel')+'" class="dgResize" onmousedown="zenPage.getComponent('+this.index+').resizeMouseDown(event,-1);" ondblclick="zenPage.getComponent('+this.index+').resizeMouseDblClick(event,-1);">&#160;</div>';
}
for (var c = 0; c < cols; c++) {
var cInfo = this.getColumnInfo(c);
if (cInfo) {
var label = cInfo.caption ? cInfo.caption : cInfo.name ? cInfo.name : '';
var align = cInfo.headerAlign ? cInfo.headerAlign : '';
if (align == '') {
align = cInfo.align ? cInfo.align : '';
}
var hstyle = cInfo.headerStyle ? cInfo.headerStyle : '';
}
else {
var label = '';
var align = '';
var hstyle = '';
}
var ctr = '';
var istyle = '';
switch(align) {
case 'left':
istyle = 'left:0px;';
break;
case 'right':
istyle = 'right:0px;';
break;
case 'center':
ctr = 'centered="1"';
break;
}
var style = this.columnHeaderStyle + hstyle;
style = (style.toString().indexOf('background')>=0) ? (style + 'background-image:none;') : style;
html[html.length] = '<div id="'+this.makeId('ch_0_'+c)+'" class="dgHdr" '+ctr+' style="'+style+'top:'+cy+'px;left:'+cx+'px;width:'+cellWid+'px;height:'+colHeaderHgt+'px;" onclick="zenPage.getComponent('+this.index+').columnClickHandler(event,'+c+');" ondblclick="zenPage.getComponent('+this.index+').columnDblClickHandler(event,'+c+');">';
html[html.length] = '<div class="dgHdrColInner" style="'+istyle+'">';
if (this.sortOrder!='' && c == this.sortColumn-1) {
html[html.length] = '<span style="font-weight:bold;">' + (this.sortOrder=='asc' ? '&darr;' : '&uarr;') + '</span>';
}
else {
html[html.length] = '&#160;';
}
html[html.length] = (label==='')?'&#160;':zenEscapeXML(label);
html[html.length] = '</div>';
html[html.length] = '</div>';
if (this.canResizeColumns) {
html[html.length] = '<div id="'+this.makeId('rsz_'+c)+'" class="dgResize" onmousedown="zenPage.getComponent('+this.index+').resizeMouseDown(event,'+c+');" ondblclick="zenPage.getComponent('+this.index+').resizeMouseDblClick(event,'+c+');">&#160;</div>';
}
var parent = cInfo._parent;
var pdepth = 0;
while (parent && !colParents[parent._key]) {
pdepth++;
if (this.columnLabelSpan) {
colParents[parent._key] = true;
}
var style = this.columnHeaderStyle;
var istyle = '';
html[html.length] = '<div id="'+this.makeId('ch_'+pdepth+'_'+c)+'" class="dgHdr" '+ctr+' style="'+style+'top:'+cy+'px;left:'+cx+'px;width:'+cellWid+'px;height:'+colHeaderHgt+'px;" onclick="zenPage.getComponent('+this.index+').columnClickHandler(event,'+c+');">';
html[html.length] = '<div class="dgHdrColInner" style="'+istyle+'">';
html[html.length] = '&#160;';
html[html.length] = zenEscapeXML(parent.caption);
html[html.length] = '</div>';
html[html.length] = '</div>';
parent = parent._parent;
}
cx += (cellWid+cellPadW);
}
div.innerHTML = html.join('');
}
var hdrLabels = this.getRowHeaderLabels();
if (hdrLabels.length) {
var div = this.findElement('nub');
if (div) {
html = [];
for (var hx = 0; hx < hdrLabels.length; hx++) {
var style = '';
html[html.length] = '<div id="'+this.makeId('nub_'+hx)+'" class="dgHdr" style="'+style+'">';
html[html.length] = '<div class="dgHdrRowInner">';
html[html.length] = zenEscapeXML(hdrLabels[hx]);
html[html.length] = '</div>';
html[html.length] = '</div>';
}
div.innerHTML = html.join('');
}
}
var div = this.findElement('rowHdrs');
if (div) {
html = [];
var cy = 0;
var cx = 0;
for (var ri = 0; ri < rows; ri++) {
var r = this._sortIndex ? this._sortIndex[ri+offset].row : ri+offset;
var rInfo = this.getRowInfo(r);
if (rInfo) {
var label = rInfo.caption ? rInfo.caption : rInfo.name ? rInfo.name : '';
}
else {
var label = r + 1;
}
var style = this.rowHeaderStyle;
style = (style.toString().indexOf('background')>=0) ? (style + 'background-image:none;') : style;
html[html.length] = '<div id="'+this.makeId('rh_0_'+ri)+'" class="dgHdr" style="'+style+'top:'+cy+'px;left:'+cx+'px;width:'+rowHeaderWid+'px;height:'+cellHgt+'px;" onclick="zenPage.getComponent('+this.index+').rowClickHandler(event,'+ri+');" ondblclick="zenPage.getComponent('+this.index+').rowDblClickHandler(event,'+ri+');">';
html[html.length] = '<div class="dgHdrRowInner">';
html[html.length] = (label==='') ? '&#160;' : zenEscapeXML(label);
html[html.length] = '</div>';
html[html.length] = '</div>';
var parent = rInfo._parent;
var pdepth = 0;
while (parent && !rowParents[parent._key]) {
pdepth++;
if (this.rowLabelSpan && this.sortColumn==0) {
rowParents[parent._key] = true;
}
var style = this.rowHeaderStyle;
var istyle = '';
html[html.length] = '<div id="'+this.makeId('rh_'+pdepth+'_'+ri)+'" class="dgHdr" style="'+style+'top:'+cy+'px;left:'+cx+'px;width:'+rowHeaderWid+'px;height:'+cellHgt+'px;" onclick="zenPage.getComponent('+this.index+').rowClickHandler(event,'+ri+');" ondblclick="zenPage.getComponent('+this.index+').rowDblClickHandler(event,'+ri+');">';
html[html.length] = '<div class="dgHdrRowInner">';
html[html.length] = zenEscapeXML(parent.caption);
html[html.length] = '</div>';
html[html.length] = '</div>';
parent = parent._parent;
}
cy += (cellHgt+cellPadH);
}
div.innerHTML = html.join('');
}
var div = this.findElement('cellsInner');
if (div) {
html = [];
var cy = 0;
for (var ri = 0; ri < rows; ri++) {
var r = this._sortIndex ? this._sortIndex[ri+offset].row : ri+offset;
var rInfo = this.getRowInfo(r);
var rFormat = rInfo&&rInfo.format ? rInfo.format : '';
var rStyle = rInfo&&rInfo.style ? rInfo.style : '';
var rPrio = rInfo&&rInfo.priority ? rInfo.priority : 0;
var cx = cellPadW;
/* check box */
if (this.showRowSelector) {
var style = rStyle;
var istyle = '';
html[html.length] = '<div id="'+this.makeId('c_'+ri+':'+'cb')+'" class="dgCell" style="'+style+'">';
html[html.length] = '<div class="dgCellInner" style="'+istyle+'">';
var checked = cbAll||(cbList&&cbList[r]) ? 'checked="1"' : '';
html[html.length] = '<input '+checked+' type="checkbox" id="'+this.makeId('cb_'+r)+'" onclick="zenPage.getComponent('+this.index+').cbClick('+r+');" />';
html[html.length] = '</div>';
html[html.length] = '</div>';
cx += (cellWid+cellPadW);
}
for (var c = 0; c < cols; c++) {
var cInfo = this.getColumnInfo(c);
var cFormat = cInfo&&cInfo.format ? cInfo.format : '';
var cStyle = cInfo&&cInfo.style ? cInfo.style : '';
var cPrio = cInfo&&cInfo.priority ? cInfo.priority : 1;
var cType = cInfo&&cInfo.type ? cInfo.type : 'string';
var cAlign = cInfo&&cInfo.align ? cInfo.align : '';
var cName = cInfo&&cInfo.name ? cInfo.name : '';
var cImage = cInfo&&cInfo.image ? cInfo.image : '';
if (!dataIndexCorrected && cInfo && cInfo._key) {
var dataColIdx = parseInt(cInfo._key.split(":")[1])
var value = this.getCellValue(r,dataColIdx);
}
else {
var value = this.getCellValue(r,c);
}
var userContent = '';
var userInfo = this.getCellContent(value,r,c);
if (userInfo) {
if ('object' == typeof userInfo) {
if ('undefined' != typeof userInfo.content) {
cType = 'user';
userContent = userInfo.content;
cAlign = 'left';
}
else {
value = 'undefined' != typeof userInfo.value ? userInfo.value : value;
cType = 'undefined' != typeof userInfo.type ? userInfo.type : cType;
}
cAlign = 'undefined' != typeof userInfo.align ? userInfo.align : cAlign;
cStyle = 'undefined' != typeof userInfo.style ? userInfo.style : cStyle;
cFormat = 'undefined' != typeof userInfo.format ? userInfo.format : cFormat;
cImage = 'undefined' != typeof userInfo.image ? userInfo.image : cImage;
}
else {
cType = 'user';
userContent = userInfo;
cAlign = 'left';
}
}
var format = (cPrio>rPrio) ? cFormat : rFormat;
format = format ? format : this.format;
var cellStyle = this.style + ((cPrio>rPrio) ? rStyle+cStyle : cStyle+rStyle);
var sinfo = {};
if (cellStyle!='') {
var so = this.splitStyle(cellStyle,sinfo);
var cellStyleInner = so.inner;
cellStyle = so.outer;
}
else {
var cellStyleInner = '';
}
if (cAlign=='') {
if (sinfo.textAlign) {
var align = sinfo.textAlign;
}
else if (cType=='image' || cType=='button' || cType=='checkbox' || cType=='link') {
var align = 'center';
}
else {
var align = 'number'==typeof value ? 'right' : 'left';
}
}
else {
var align = cAlign;
}
var ctr = '';
var istyle = '';
switch(align) {
case 'left':
istyle = 'left:0px;';
break;
case 'right':
istyle = 'right:0px;';
break;
case 'center':
ctr = 'centered="1"';
break;
}
var events = ' onclick="zenPage.getComponent('+this.index+').cellClickHandler('+(ri+1)+','+(c+1)+',event);" ondblclick="zenPage.getComponent('+this.index+').cellDblClickHandler('+(ri+1)+','+(c+1)+',event);" onmouseover="zenPage.getComponent('+this.index+').cellMouseOver('+(ri+1)+','+(c+1)+',event);" onmouseout="zenPage.getComponent('+this.index+').cellMouseOut('+(ri+1)+','+(c+1)+',event);"'
var style = 'top:'+cy+'px;left:'+cx+'px;width:'+cellWid+'px;height:'+cellHgt+'px;text-align:'+align+';';
if (this.showZebra) {
if (ri%2) {
style += (this.evenRowColor!='') ? 'color:'+this.evenRowColor+';' : '';
style += (this.evenRowBackground!='') ? 'background-color:'+this.evenRowBackground+';' : '';
}
else {
style += (this.oddRowColor!='') ? 'color:'+this.oddRowColor+';' : '';
style += (this.oddRowBackground!='') ? 'background-color:'+this.oddRowBackground+';' : '';
}
}
style += cellStyle;
istyle += cellStyleInner;
html[html.length] = '<div id="'+this.makeId('c_'+ri+':'+c)+'" class="dgCell" '+ctr+' style="'+style+'" '+events+' origStyle="'+style+'">';
switch(cType) {
case 'image':
html[html.length] = '<div class="dgCellInnerImage" style="'+istyle+'">';
if (''===value) {
var ic = 1;
}
else {
var ic = parseInt(value,10);
ic = !value || value<0 ? 0 : (value > 10) ? 10 : value;
}
if (cImage) {
if (cImage.toString().charAt(0)=='=') {
cImage = this.evaluate(cImage,ri,c);
}
if (cImage) {
for (var icx = 0; icx < ic; icx++) {
html[html.length] = '<image src="'+cImage+'"/>';
}
}
}
html[html.length] = '</div>';
break;
case 'checkbox':
var checked = value ? true : false;
html[html.length] = '<div class="dgCellInnerImage" style="'+istyle+'">';
html[html.length] = '<input type="checkbox" '+(checked?'checked="1"':'')+' onclick="zenPage.getComponent('+this.index+').cellActionHandler('+(ri+1)+',\''+cName+'\',this.checked);" />';
html[html.length] = '</div>';
break;
case 'button':
if (cImage) {
html[html.length] = '<div class="dgCellInnerImage" style="'+istyle+'">';
if (cImage.toString().charAt(0)=='=') {
cImage = this.evaluate(cImage,ri,c);
}
if (cImage) {
html[html.length] = '<input type="image" src="'+cImage+'" onclick="zenPage.getComponent('+this.index+').cellActionHandler('+(ri+1)+',\''+cName+'\',true);"/>';
}
html[html.length] = '</div>';
}
else if (value!=='') {
html[html.length] = '<input class="dgCellInnerImage" type="button" value="'+value+'"onclick="zenPage.getComponent('+this.index+').cellActionHandler('+(ri+1)+',\''+cName+'\',true);" />';
}
break;
case 'link':
if (value!=='') {
html[html.length] = '<a href="#" class="dgCellInnerImage" onclick="zenPage.getComponent('+this.index+').cellActionHandler('+(ri+1)+',\''+cName+'\',true);return false;">'+value+'</a>';
}
else {
html[html.length] = '<div class="dgCellInnerImage" style="'+istyle+'">';
html[html.length] = '</div>';
}
break;
case 'user':
html[html.length] = '<div class="dgCellInner" style="'+istyle+'">';
html[html.length] = userContent;
html[html.length] = '</div>';
break;
case 'string':
default:
html[html.length] = '<div class="dgCellInner" style="'+istyle+'">';
if (value.toString().charAt(0)=='\'') {
html[html.length] = value.toString().substring(1);
}
else {
html[html.length] = zenEscapeXML((format=='' || this.alwaysString ) ? value : zenFormatNumber(value,format)); // JSL4534
}
html[html.length] = '</div>';
break;
}
html[html.length] = '</div>';
cx += (cellWid+cellPadW);
}
cy += (cellHgt+cellPadH);
}
div.innerHTML = html.join('');
}
var div = this.findElement('summaryHdr');
if (div) {
html = [];
var label = this.summaryRow.caption ? this.summaryRow.caption : this.name;
html[html.length] = '<div id="'+this.makeId('rh_sum')+'" class="dgHdr">';
html[html.length] = '<div class="dgHdrRowInner">';
html[html.length] = zenEscapeXML(label);
html[html.length] = '</div>';
html[html.length] = '</div>';
div.innerHTML = html.join('');
}
var div = this.findElement('summary');
if (div) {
html = [];
var cy = 0;
var cx = cellPadW;
/* check box */
if (this.showRowSelector) {
html[html.length] = '<div id="'+this.makeId('sum_cb')+'" class="dgHdr" style="top:'+cy+'px;left:'+cx+'px;width:'+cellWid+'px;height:'+colHeaderHgt+'px;" >';
html[html.length] = '<div class="dgHdrColInner">';
html[html.length] = '&#160;'
html[html.length] = '</div>';
html[html.length] = '</div>';
}
for (var c = 0; c < cols; c++) {
var cInfo = this.getColumnInfo(c);
var label = '';
html[html.length] = '<div id="'+this.makeId('sum_'+c)+'" class="dgHdr" style="top:'+cy+'px;left:'+cx+'px;width:'+cellWid+'px;height:'+colHeaderHgt+'px;">';
html[html.length] = '<div class="dgHdrColInner">';
html[html.length] = zenEscapeXML(label);
html[html.length] = '</div>';
html[html.length] = '</div>';
cx += (cellWid+cellPadW);
}
div.innerHTML = html.join('');
}
}
catch(ex) {
zenExceptionHandler(ex,arguments,this.lblErrorRenderCells);
}
}

self._ZEN_Component_dataGrid_renderContents = function() {
try {
var controller = this.getController();
if (null == controller) {
this.connectToController();
controller = this.getController();
}
var encDiv = this.getEnclosingDiv();
if (encDiv == null) return;
this.buildRowIndex();
this.buildColumnIndex();
if (this.useEngine) this.initEngine();
this.renderSkeleton();
this.renderCells(true);
this.adjustSizes();
}
catch(ex) {
zenExceptionHandler(ex,arguments,this.lblErrorRenderContents);
}
}

self._ZEN_Component_dataGrid_renderSkeleton = function() {
try {
var encDiv = this.getEnclosingDiv();
var encHgt = encDiv.offsetHeight;
var encWid = encDiv.offsetWidth;
var html = [];
html[html.length] = '<div id="'+this.makeId('wrapper')+'" class="dgWrapper" onclick="zenPage.getComponent('+this.index+').focus();">';
html[html.length] = '<div style="top:0px;left:0px;position:absolute; display:block; height:0px; width:0px; overflow:hidden; font-size:0px; line-height:0px;" >';
html[html.length] = '<input type="text" tabindex="'+this.tabIndex+'" id="'+this.makeId('invisible')+'" onkeydown="return zenPage.getComponent('+this.index+').gridKeyDownHandler(event);" onkeypress="return zenPage.getComponent('+this.index+').gridKeyPressHandler(event);" onfocus="zenPage.getComponent('+this.index+').gridKeyFocus();" onblur="zenPage.getComponent('+this.index+').gridKeyBlur();"/>';
html[html.length] = '</div>';
html[html.length] = '<div id="'+this.makeId('overlay')+'" class="dgOverlay"></div>';
var titleHTML = null;
if (this.ongettitle!='') {
titleHTML = zenInvokeCallbackMethod(this.ongettitle,this,'ongettitle');
}
else if (this.gridTitle != '') {
titleHTML = zenEscapeHTML(this.gridTitle);
}
if (titleHTML) {
html[html.length] = '<div id="'+this.makeId('title')+'" style="'+this.gridTitleStyle+'" class="dgTitle">';
html[html.length] = titleHTML;
html[html.length] = '</div>';
}
var cellHgt = parseInt(this.rowHeight,10);
cellHgt = isNaN(cellHgt) ? 20 : cellHgt;
var cellWid = parseInt(this.columnWidth,10);
var cellPadH = 1;
var cellPadW = 1;
var scrollWid = 22;
var scrollHgt = 22;
var colHeaderHgt = 40;
var rowHeaderWid = 125;
var dataWid = encWid > (rowHeaderWid+scrollWid) ? (encWid-(rowHeaderWid+scrollWid)-4): 0;
var dataHgt = encHgt > (colHeaderHgt+scrollHgt) ? (encHgt-(colHeaderHgt+scrollHgt)-4): 0;;
var nubDivTop = 0;
var nubDivLeft = 0;
var nubDivWid = rowHeaderWid;
var nubDivHgt = colHeaderHgt;
var chDivTop = 0;
var chDivLeft = rowHeaderWid;
var chDivWid = dataWid;
var chDivHgt = colHeaderHgt;
var rhDivTop = colHeaderHgt;
var rhDivLeft = 0;
var rhDivWid = rowHeaderWid;
var rhDivHgt = dataHgt;
var dataDivTop = colHeaderHgt;
var dataDivLeft = rowHeaderWid;
var dataDivWid = dataWid;
var dataDivHgt = dataHgt;
html[html.length] = '<div id="'+this.makeId('nub')+'" class="dgNub" style="top:'+nubDivTop+'px;left:'+nubDivLeft+'px;width:'+nubDivWid+'px;height:'+(nubDivHgt-1)+'px;">';
html[html.length] = '&#160;';
html[html.length] = '</div>';
if (this.showColumnLabels) {
html[html.length] = '<div id="'+this.makeId('colHdrs')+'" class="dgDivColumnHeader" style="top:'+chDivTop+'px;left:'+chDivLeft+'px;width:'+chDivWid+'px;height:'+(chDivHgt-1)+'px;">';
html[html.length] =	'</div>';
}
if (this.showRowLabels) {
html[html.length] = '<div id="'+this.makeId('rowHdrs')+'" class="dgDiv" style="top:'+rhDivTop+'px;left:'+rhDivLeft+'px;width:'+rhDivWid+'px;height:'+rhDivHgt+'px;"/>';
html[html.length] = '</div>';
}
html[html.length] = '<div id="'+this.makeId('cellsUnder')+'" class="dgCellsUnder" style="top:'+dataDivTop+'px;left:'+dataDivLeft+'px;width:'+dataDivWid+'px;height:'+dataDivHgt+'px;">';
html[html.length] = '</div>';
html[html.length] = '<div id="'+this.makeId('cells')+'" class="dgDivCells" style="top:'+dataDivTop+'px;left:'+dataDivLeft+'px;width:'+dataDivWid+'px;height:'+dataDivHgt+'px;">';
html[html.length] = '<div id="'+this.makeId('selector')+'" class="dgSelector" onclick="zenPage.getComponent('+this.index+').selectorClickHandler(event);" ondblclick="zenPage.getComponent('+this.index+').selectorDblClickHandler(event);" >';
html[html.length] = '</div>';
if (true) {
html[html.length] = '<div id="'+this.makeId('action')+'" class="dgAction" onclick="zenPage.getComponent('+this.index+').showPopup();">';
html[html.length] = '</div>';
}
if (this.multiSelect) {
html[html.length] = '<div id="'+this.makeId('sizeHandle')+'" class="dgSizeHandle" onmousedown="zenPage.getComponent('+this.index+').sizeHandleMouseDown(event);" >';
html[html.length] = '</div>';
}
html[html.length] = '<div id="'+this.makeId('cellsInner')+'">';
html[html.length] = '</div>';
html[html.length] = '</div>';
html[html.length] = '<div id="'+this.makeId('vtScroll')+'" class="dgVtScroll" style="top:'+dataDivTop+'px;left:'+(dataDivLeft+dataDivWid)+'px;height:'+dataDivHgt+'px;" onscroll="zenPage.getComponent('+this.index+').cellScrollVt();">';
html[html.length] = '<div id="'+this.makeId('vtScrollInner')+'" class="dgVtScrollInner" >&#160;</div>';
html[html.length] = '</div>';
html[html.length] = '<div id="'+this.makeId('hzScroll')+'" class="dgHzScroll" style="top:'+(dataDivTop+dataDivHgt+1)+'px;left:'+(dataDivLeft+1)+'px;width:'+dataDivWid+'px;" onscroll="zenPage.getComponent('+this.index+').cellScrollHz();">';
html[html.length] = '<div id="'+this.makeId('hzScrollInner')+'" class="dgHzScrollInner" >&#160;</div>';
html[html.length] = '</div>';
if (this.summaryRow) {
if (this.showRowLabels) {
html[html.length] = '<div id="'+this.makeId('summaryHdr')+'" class="dgDivSummaryHeader" />';
html[html.length] = '</div>';
}
html[html.length] = '<div id="'+this.makeId('summary')+'" class="dgDivSummary"/>';
html[html.length] = '</div>';
}
var statusHTML = '';
if (this.ongetstatus!='') {
statusHTML = zenInvokeCallbackMethod(this.ongetstatus,this,'ongetstatus');
}
html[html.length] = '<div id="'+this.makeId('status')+'" style="'+this.gridStatusStyle+'" class="dgStatus">';
html[html.length] = statusHTML;
html[html.length] = '<div id="'+this.makeId('paging')+'" style="position:absolute;right:20px;width:0px;">';
html[html.length] = '</div>';
html[html.length] = '</div>';
html[html.length] = '</div>';
encDiv.innerHTML = html.join('');
}
catch(ex) {
zenExceptionHandler(ex,arguments,this.lblErrorRenderSkeleton);
}
}

self._ZEN_Component_dataGrid_resizeMouseDblClick = function(evt,index) {
evt = evt ? evt : window.event;
if (this._columnWidths) {
delete this._columnWidths[index];
this.adjustSizes();
}
}

self._ZEN_Component_dataGrid_resizeMouseDown = function(evt,index) {
evt = evt ? evt : window.event;
if (evt.preventDefault) {
evt.preventDefault();
}
if (document.onmousemove != this.resizeMouseMove) {
this._oldMouseMove = document.onmousemove;
document.onmousemove = this.resizeMouseMove;
}
if (document.onmouseup != this.resizeMouseUp) {
this._oldMouseUp = document.onmouseup;
document.onmouseup = this.resizeMouseUp;
}
zenPage._startX = evt.clientX;
if (index < 0) {
var rnub = this.findElement('nub');
if (rnub) {
var rowDepth = (this._rowDepth?this._rowDepth:1);
zenPage._startWid = rnub.offsetWidth/rowDepth;
}
else {
zenPage._startWid = 0;
}
}
else {
var ch = this.findElement('ch_0_'+index);
if (ch) {
zenPage._startWid = ch.offsetWidth;
}
}
zenPage._componentIndex = this.index;
zenPage._columnIndex = index;
}

self._ZEN_Component_dataGrid_resizeMouseMove = function(evt) {
evt = evt ? evt : window.event;
var index = zenPage._columnIndex;
var dataGrid = zenPage._componentIndex===null?null:zenPage.getComponent(zenPage._componentIndex);
if (dataGrid) {
if (index < 0) {
dataGrid.rowLabelWidth = zenPage._startWid + (evt.clientX - zenPage._startX);
dataGrid.adjustSizes();
}
else {
var ch = dataGrid.findElement('ch_0_'+index);
if (ch) {
dataGrid._columnWidths[index] = zenPage._startWid + (evt.clientX - zenPage._startX);
dataGrid._columnWidths[index] = dataGrid._columnWidths[index] <= 1 ? 1 : dataGrid._columnWidths[index];
dataGrid.adjustSizes();
}
}
}
}

self._ZEN_Component_dataGrid_resizeMouseUp = function(evt) {
evt = evt ? evt : window.event;
var index = zenPage._columnIndex;
var dataGrid = zenPage._componentIndex===null?null:zenPage.getComponent(zenPage._componentIndex);
if (this._oldMouseMove) {
document.onmousemove = this._oldMouseMove;
}
this._oldMouseMove = null;
if (this._oldMouseUp) {
document.onmouseup = this._oldMouseUp;
}
this._oldMouseUp = null;
zenPage._componentIndex = null;
zenPage._columnIndex = null;
zenPage._startX = null;
zenPage._startWid = null;
if (dataGrid) {
dataGrid.adjustSizes();
}
}

self._ZEN_Component_dataGrid_rowClickHandler = function(evt,row) {
evt = evt ? evt : window.event;
row = parseInt(row,10) + 1;
var ok = true;
if ('' != this.onheaderclick) {
ok = zenInvokeCallbackMethod(this.onheaderclick,this,'onheaderClick','which','row','index',row);
}
if (ok) {
this.highlightCells(false);
var p = [row,1,row,this.getColumnCount()];
this.selectedRange = p.join(',');
this.selectCell(row,1,true,true);
}
}

self._ZEN_Component_dataGrid_rowDblClickHandler = function(evt,row) {
evt = evt ? evt : window.event;
}

self._ZEN_Component_dataGrid_selectCell = function(row,col,notify,updateRange) {
try {
var oldRange = this.selectedRange;
var newRange = this.selectedRange;
if (this.multiSelect) {
if (updateRange && '' != newRange) {
var p = newRange.split(',');
if (parseInt(this.currRow,10) == parseInt(p[2],10)) {
if (row >= p[0]) {
p[2] = row;
}
else {
p[0] = row;
}
}
else {
if (row <= parseInt(p[2],10)) {
p[0] = row;
}
else {
p[2] = row;
}
}
if ('rows' == this.selectMode) {
p[1] = 1;
p[3] = this.getColumnCount();
}
else {
if (this.currColumn == p[3]) {
if (col >= parseInt(p[1],10)) {
p[3] = col;
}
else {
p[1] = col;
}
}
else {
if (col <= parseInt(p[3],10)) {
p[1] = col;
}
else {
p[3] = col;
}
}
}
newRange = p.join(',');
}
else {
var p = [row,col,row,col];
if ('rows' == this.selectMode) {
p[1] = 1;
p[3] = this.getColumnCount();
}
newRange = p.join(',');
}
}
else if ('rows' == this.selectMode) {
var p = [row,1,row,this.getColumnCount()];
newRange = p.join(',');
}
else {
newRange = '';
}
this.highlightCells(false);
this.selectedRange = newRange;
this.currRow = row;
this.currColumn = col;
if (notify) {
this.selectCellHandler(row,col);
}
this.highlightCells(true);
if (this.selectedRange!='') {
var p = this.selectedRange.split(',');
this.moveCellSelector(p[0],p[1],p[2],p[3]);
}
else {
this.moveCellSelector(row,col);
}
}
catch(ex) {
zenExceptionHandler(ex,arguments,this.lblErrorSelectCell);
}
}

self._ZEN_Component_dataGrid_selectCellHandler = function(r,c) {
zenInvokeCallbackMethod(this.onselectcell,this,'onselectcell','row',r,'col',c);
}

self._ZEN_Component_dataGrid_selectPopupItem = function(index) {
if ('undefined' != typeof this._selectedIndex && this._selectedIndex>=0) {
var tr = this.findElement('tr_'+this._selectedIndex);
if (tr) {
tr.className = index%2 ? 'dgLookupOdd' : 'dgLookupEven';
}
}
this._selectedIndex = index;
if (this._selectedIndex>=0) {
var tr = this.findElement('tr_'+this._selectedIndex);
if (tr) {
tr.className = 'dgLookupSelected';
}
}
var div = this.findElement('dgLookupResults');
if (tr && div) {
var top = tr.offsetTop;
var bottom = tr.offsetTop + tr.offsetHeight;
if (bottom > (div.offsetHeight+div.scrollTop)) {
div.scrollTop = (bottom - div.offsetHeight);
}
else if (top < div.scrollTop) {
div.scrollTop = top;
}
}
}

self._ZEN_Component_dataGrid_selectorClickHandler = function(evt) {
evt = evt ? evt : window.event;
this.focus();
}

self._ZEN_Component_dataGrid_selectorDblClickHandler = function(evt) {
this.cellDblClickHandler(this.currRow,this.currColumn,evt);
}

self._ZEN_Component_dataGrid_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._ZEN_Component_dataGrid_setCellValue = function(value,r,c) {
var controller = this.getController();
if (controller) {
if (!this.alwaysString && (!isNaN(parseFloat(value)) && (value==parseFloat(value)))) { // JSL4534
value = parseFloat(value);
}
var propName = null;
var cInfo = this.getColumnInfo(parseInt(c,10));
if (cInfo && cInfo.value) {
propName = '';
var t = cInfo.value.toString();
if (t.substr(0,3)=='=[@') {
propName = t.substr(3,t.length-4);
}
}
if (propName == null) {
propName = controller.getPropertyName(parseInt(c,10));
}
if (propName && propName !== '') {
this._inSetValue = true;
var rx = this._sortIndex ? this._sortIndex[parseInt(r,10)].row : (parseInt(r,10));
this.sendEventToController('propertyChange',propName,value,rx);
this._inSetValue = false;
}
}
this.updateCells(false,true,10);
}

self._ZEN_Component_dataGrid_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._ZEN_Component_dataGrid_setCurrPage = function(page) {
page = parseInt(page,10);
if (page < 1) {
page = 1;
}
else if (page > this.getPageCount()) {
page = this.getPageCount();
}
if (page != this.currPage) {
if (this.pagingMode=='server') {
var controller = this.getController();
if (controller && controller.setCurrPage) {
controller.setCurrPage(page);
}
this.currPage = page;
if (controller.reloadContents) {
controller.reloadContents();
}
}
else {
this.currPage = page;
this.updateCells();
}
}
}

self._ZEN_Component_dataGrid_setFilterKey = function(key,update) {
update = zenGet(update,true);
if (this.filterKey != key) {
this.filterKey = key;
if (update) {
this.updateCells(false,true,200);
}
}
}

self._ZEN_Component_dataGrid_setPageSize = function(pageSize) {
this.pageSize = parseInt(pageSize,10);
this.render();
}

self._ZEN_Component_dataGrid_setProperty = function(property,value,value2) {
switch(property) {
case 'value':
this.value = value;
break;
case 'enclosingStyle':
this.enclosingStyle = value;
this.getEnclosingDiv().style.cssText = value;
this.render();
break;
case 'readOnly':
case 'disabled':
case 'showColumnLabels':
case 'showRowLabels':
case 'showZebra':
case 'showRowSelector':
case 'canResizeColumns':
case 'rowLabelSpan':
case 'columnLabelSpan':
value = value ? true : false;
this[property] = value;
this.render();
break;
case 'style':
case 'selectMode':
case 'currPage':
case 'rowLabelWidth':
case 'format':
case 'style':
case 'columnHeaderStyle':
case 'rowHeaderStyle':
case 'selectedRangeBackground':
case 'selectedCellBackground':
case 'selectedCellColor':
case 'rowHeaderStyle':
case 'rowHeight':
case 'gridTitle':
case 'gridTitleStyle':
case 'evenRowBackground':
case 'evenRowColor':
case 'oddRowBackground':
case 'oddRowColor':
case 'columnWidth':
case 'currCellColor':
case 'currCellBackground':
this[property] = value;
this.render();
break;
case 'controllerId':
this.setControllerId(value);
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_dataGrid_setSize = function(width,height) {
var div = this.getEnclosingDiv();
div.style.width = width + 'px';
div.style.height = height + 'px';
this.adjustSizes();
}

self._ZEN_Component_dataGrid_showGroupHandler = function() {
var div = this._group.getFloatingDiv();
if (div) {
var table = this.findElement('table');
var tw = table ? table.offsetWidth : 150;
if (tw < 150) {
tw = 150;
if (table) {
table.style.width = tw + 'px';
}
}
var sd = this.getSearchDiv();
if (sd) {
sd.style.width = tw + 20 + 'px';
div.style.border = '5px solid rgb(53,107,141)';
div.style.width = sd.offsetWidth + (10) + 'px';
var ctrl = this.findElement('filter');
if (ctrl) {
ctrl.style.width = sd.offsetWidth<160?sd.offsetWidth-40:140 + 'px';
}
}
}
var ctrl = this.findElement('filter');
if (ctrl) {
ctrl.focus();
}
if (this._selectedIndex>=0) {
this.selectPopupItem(this._selectedIndex);
}
}

self._ZEN_Component_dataGrid_showMessage = function(msg) {
this.showOverlay('<div class="dgMsg">'+msg+'</msg>');
}

self._ZEN_Component_dataGrid_showOverlay = function(content) {
var div = this.findElement('overlay');
if (div) {
var encDiv = this.getEnclosingDiv();
div.innerHTML = content;
div.style.display = 'block';
div.style.opacity = 1.0;
div.style.top = encDiv.offsetHeight/3 - div.offsetHeight/2 + 'px';
div.style.left = encDiv.offsetWidth/4 - div.offsetWidth/2 + 'px';
}
}

self._ZEN_Component_dataGrid_showPopup = function(spec) {
spec = spec ? spec : {};
var value = zenGet(spec.value,'');
var top = spec.top ? spec.top : null;
var left = spec.left ? spec.left : null;
spec.idProperty = spec.idProperty ? spec.idProperty : 'id';
spec.textProperty = spec.textProperty ? spec.textProperty : 'text';
var contextParms = {};
var cInfo = this.getColumnInfo(this.currColumn - 1);
if (cInfo) {
contextParms.name = cInfo.name;
contextParms.aux = cInfo.aux;
}
spec.data = zenInvokeCallbackMethod(this.ongetlookupdata,this,'ongetlookupdata','context',contextParms);
if (spec.parentDiv) {
top = zenGetTop(spec.parentDiv) + spec.parentDiv.offsetHeight - zenGetTopScroll(spec.parentDiv);
left = zenGetLeft(spec.parentDiv) - zenGetLeftScroll(spec.parentDiv);
}
var hgt = zenGetWindowHeight();
var dSpace = hgt-top;
var dropDownHgt = 275;
if (dropDownHgt > dSpace) {
top = hgt - dropDownHgt;
}
var group = this._group;
if (!group) {
group = zenPage.createComponent('modalGroup');
}
this._group = group;
group.onshowGroup = 'zenPage.getComponent('+this.index+').showGroupHandler();';
group.onhideGroup = 'zenPage.getComponent('+this.index+').hideGroupHandler();';
group._spec = spec
var func = new Function('group','return zenPage.getComponent('+this.index+').getPopupContent(group);');
this._applyFunction = null;
if (spec.applyFunction && 'function' == typeof spec.applyFunction) {
this._applyFunction = spec.applyFunction;
}
this._popupVisible = true;
group.show(spec.title?spec.title:this.lblSearch,'callback',func,top,left);
}

self._ZEN_Component_dataGrid_sizeHandleMouseDown = function(evt) {
evt = evt ? evt : window.event;
if (document.onmousemove != this.resizeMouseMove) {
this._oldMouseMove = document.onmousemove;
document.onmousemove = this.sizeHandleMouseMove;
}
if (document.onmouseup != this.resizeMouseUp) {
this._oldMouseUp = document.onmouseup;
document.onmouseup = this.sizeHandleMouseUp;
}
zenPage._startX = evt.clientX;
zenPage._startY = evt.clientY;
zenPage._componentIndex = this.index;
this._handleMove = true;
}

self._ZEN_Component_dataGrid_sizeHandleMouseMove = function(evt) {
evt = evt ? evt : window.event;
var dataGrid = zenPage._componentIndex===null?null:zenPage.getComponent(zenPage._componentIndex);
if (dataGrid) {
var deltaX = 40;
var deltaY = 20;
if (evt.clientX > (zenPage._startX + deltaX)) {
dataGrid.selectCell(dataGrid.currRow,dataGrid.currColumn+1,false,true);
zenPage._startX = evt.clientX;
}
else if (evt.clientX < (zenPage._startX - deltaX)) {
dataGrid.selectCell(dataGrid.currRow,dataGrid.currColumn-1,false,true);
zenPage._startX = evt.clientX;
}
if (evt.clientY > (zenPage._startY + deltaY)) {
dataGrid.selectCell(dataGrid.currRow+1,dataGrid.currColumn,false,true);
zenPage._startY = evt.clientY;
}
if (evt.clientY < (zenPage._startY - deltaY)) {
dataGrid.selectCell(dataGrid.currRow-1,dataGrid.currColumn,false,true);
zenPage._startY = evt.clientY;
}
}
}

self._ZEN_Component_dataGrid_sizeHandleMouseUp = function(evt) {
evt = evt ? evt : window.event;
var dataGrid = zenPage._componentIndex===null?null:zenPage.getComponent(zenPage._componentIndex);
dataGrid._handleMove = false;
dataGrid.focus();
if (this._oldMouseMove) {
document.onmousemove = this._oldMouseMove;
}
this._oldMouseMove = null;
if (this._oldMouseUp) {
document.onmouseup = this._oldMouseUp;
}
this._oldMouseUp = null;
zenPage._componentIndex = null;
zenPage._startX = null;
zenPage._startY = null;
}

self._ZEN_Component_dataGrid_splitStyle = function(style,info) {
var result = { inner:'', outer:'', background:'' };
var enc = this.getEnclosingDiv();
var encStyle = enc.style.cssText;
enc.style.cssText = style;
if (info && enc.style.textAlign!='') {
info.textAlign = enc.style.textAlign;
}
if (enc.style.fontSize!='') {
result.inner += 'font-size:' + enc.style.fontSize + ';';
enc.style.fontSize = '';
}
if (enc.style.padding!='') {
result.inner += 'padding:' + enc.style.padding + ';';
enc.style.padding = '';
}
if (enc.style.margin!='') {
result.inner += 'margin:' + enc.style.margin + ';';
enc.style.margin = '';
}
if (enc.style.background!='') {
background = enc.style.background;
}
result.outer = enc.style.cssText;
enc.style.cssText = encStyle;
return result;
}

self._ZEN_Component_dataGrid_stopEditCell = function(cancel) {
cancel = (null==cancel) ? false : cancel;
var value;
var type = 'cell';
var div = this.getCellSelector();
if (div && this.cellHasFocus) {
this.cellHasFocus = false;
this.F2Mode = false;
var cell = this.getCellEditor();
if (cell) {
switch(this.currEditType) {
case 'row':
break;
case 'column':
break;
default:
value = cancel ? (this.getCellValue(parseInt(this.currRow,10)-1,parseInt(this.currColumn,10)-1)) : cell.value;
if (!cancel) {
if (this.onchangecell) {
var ret = zenInvokeCallbackMethod(this.onchangecell,this,'onchangecell','value',value);
if (ret!==null) {
value = ret;
}
else {
cancel = true;
}
}
}
if (!cancel) {
this.setCellValue(value, parseInt(this.currRow,10) + this.getRowOffset() - 1, parseInt(this.currColumn,10) - 1);
}
break;
}
}
div.innerHTML = '';
this.currEditType = null;
if (!cancel && this.onchange) {
zenInvokeCallbackMethod(this.onchange,this,'onchange','which',type);
}
this.focus();
}
}

self._ZEN_Component_dataGrid_updateCells = function(immediate,reindex,delay) {
delay = zenGet(delay,1);
if (reindex) {
this.buildRowIndex();
this.buildColumnIndex();
}
if (this._updateTimer) {
window.clearTimeout(this._updateTimer);
delete this._updateTimer;
}
this.beginWait();
if (immediate) {
this.reallyUpdateCells();
}
else {
this._updateTimer = window.setTimeout('zenPage.getComponent('+this.index+').reallyUpdateCells();',delay);
}
}

self._ZEN_Component_dataGrid_updateGrid = function(reset) {
reset = 'undefined' == typeof reset ? true : reset;
if (reset) {
delete this._columnWidths;
this.selectedRange = '';
this.currColumn = 1;
this.currRow = 1;
this.sortOrder = '';
this.sortColumn = 0;
this.currPage = 1;
this.filterKey = '';
}
this.render();
}

self._ZEN_Component_dataGrid_wheelHandler = function(evt) {
evt = evt ? evt : window.event;
var wheelDelta = evt.detail ? evt.detail * -1 : evt.wheelDelta;
var vtScroll = this.findElement('vtScroll');
if (vtScroll) {
var c1 = this.findElement('cell_1:1');
var d = c1 ? c1.offsetHeight : 40;
vtScroll.scrollTop = vtScroll.scrollTop + ((wheelDelta>0) ? -d : d);
this.cellScrollVt();
}
}

self._ZEN_Component_dataGrid_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_dataGrid__Loader = function() {
	zenLoadClass('_ZEN_Component_control');
	_ZEN_Component_dataGrid.prototype = zenCreate('_ZEN_Component_control',-1);
	var p = _ZEN_Component_dataGrid.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_dataGrid;
	p.superClass = ('undefined' == typeof _ZEN_Component_control) ? zenMaster._ZEN_Component_control.prototype:_ZEN_Component_control.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.dataGrid';
	p._type = 'dataGrid';
	p.serialize = _ZEN_Component_dataGrid_serialize;
	p.getSettings = _ZEN_Component_dataGrid_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_dataGrid_ReallyRefreshContents;
	p.adjustSizes = _ZEN_Component_dataGrid_adjustSizes;
	p.adjustSizesAreasPagingStatus = _ZEN_Component_dataGrid_adjustSizesAreasPagingStatus;
	p.adjustSizesColumnHeaders = _ZEN_Component_dataGrid_adjustSizesColumnHeaders;
	p.adjustSizesDataCells = _ZEN_Component_dataGrid_adjustSizesDataCells;
	p.adjustSizesInColumnResize = _ZEN_Component_dataGrid_adjustSizesInColumnResize;
	p.adjustSizesRowHeaders = _ZEN_Component_dataGrid_adjustSizesRowHeaders;
	p.adjustSizesSummaryRow = _ZEN_Component_dataGrid_adjustSizesSummaryRow;
	p.applyFilter = _ZEN_Component_dataGrid_applyFilter;
	p.applyValue = _ZEN_Component_dataGrid_applyValue;
	p.beginWait = _ZEN_Component_dataGrid_beginWait;
	p.buildColumnIndex = _ZEN_Component_dataGrid_buildColumnIndex;
	p.buildColumnLeafIndex = _ZEN_Component_dataGrid_buildColumnLeafIndex;
	p.buildRowIndex = _ZEN_Component_dataGrid_buildRowIndex;
	p.buildRowLeafIndex = _ZEN_Component_dataGrid_buildRowLeafIndex;
	p.buildSortIndex = _ZEN_Component_dataGrid_buildSortIndex;
	p.cbClick = _ZEN_Component_dataGrid_cbClick;
	p.cellActionHandler = _ZEN_Component_dataGrid_cellActionHandler;
	p.cellClickHandler = _ZEN_Component_dataGrid_cellClickHandler;
	p.cellDblClickHandler = _ZEN_Component_dataGrid_cellDblClickHandler;
	p.cellEditBlur = _ZEN_Component_dataGrid_cellEditBlur;
	p.cellEditKeyHandler = _ZEN_Component_dataGrid_cellEditKeyHandler;
	p.cellEditKeyUpHandler = _ZEN_Component_dataGrid_cellEditKeyUpHandler;
	p.cellInputClickHandler = _ZEN_Component_dataGrid_cellInputClickHandler;
	p.cellMouseOut = _ZEN_Component_dataGrid_cellMouseOut;
	p.cellMouseOver = _ZEN_Component_dataGrid_cellMouseOver;
	p.cellScrollHz = _ZEN_Component_dataGrid_cellScrollHz;
	p.cellScrollVt = _ZEN_Component_dataGrid_cellScrollVt;
	p.columnClickHandler = _ZEN_Component_dataGrid_columnClickHandler;
	p.columnDblClickHandler = _ZEN_Component_dataGrid_columnDblClickHandler;
	p.connectToController = _ZEN_Component_dataGrid_connectToController;
	p.defineGetComputedStyle = _ZEN_Component_dataGrid_defineGetComputedStyle;
	p.disconnectFromController = _ZEN_Component_dataGrid_disconnectFromController;
	p.editCell = _ZEN_Component_dataGrid_editCell;
	p.endWait = _ZEN_Component_dataGrid_endWait;
	p.evaluate = _ZEN_Component_dataGrid_evaluate;
	p.extractUserStyleSetting = _ZEN_Component_dataGrid_extractUserStyleSetting;
	p.filterKeyDown = _ZEN_Component_dataGrid_filterKeyDown;
	p.filterKeyUp = _ZEN_Component_dataGrid_filterKeyUp;
	p.focus = _ZEN_Component_dataGrid_focus;
	p.getCellColumnCount = _ZEN_Component_dataGrid_getCellColumnCount;
	p.getCellColumnName = _ZEN_Component_dataGrid_getCellColumnName;
	p.getCellContent = _ZEN_Component_dataGrid_getCellContent;
	p.getCellData = _ZEN_Component_dataGrid_getCellData;
	p.getCellEditData = _ZEN_Component_dataGrid_getCellEditData;
	p.getCellEditor = _ZEN_Component_dataGrid_getCellEditor;
	p.getCellExternalData = _ZEN_Component_dataGrid_getCellExternalData;
	p.getCellRowCount = _ZEN_Component_dataGrid_getCellRowCount;
	p.getCellSelector = _ZEN_Component_dataGrid_getCellSelector;
	p.getCellValue = _ZEN_Component_dataGrid_getCellValue;
	p.getColumnCount = _ZEN_Component_dataGrid_getColumnCount;
	p.getColumnDescriptor = _ZEN_Component_dataGrid_getColumnDescriptor;
	p.getColumnDescriptorCount = _ZEN_Component_dataGrid_getColumnDescriptorCount;
	p.getColumnDescriptors = _ZEN_Component_dataGrid_getColumnDescriptors;
	p.getColumnInfo = _ZEN_Component_dataGrid_getColumnInfo;
	p.getController = _ZEN_Component_dataGrid_getController;
	p.getCurrColumn = _ZEN_Component_dataGrid_getCurrColumn;
	p.getCurrPage = _ZEN_Component_dataGrid_getCurrPage;
	p.getCurrRow = _ZEN_Component_dataGrid_getCurrRow;
	p.getDesignMode = _ZEN_Component_dataGrid_getDesignMode;
	p.getLookupTableHTML = _ZEN_Component_dataGrid_getLookupTableHTML;
	p.getPageCount = _ZEN_Component_dataGrid_getPageCount;
	p.getPageSize = _ZEN_Component_dataGrid_getPageSize;
	p.getPagingHTML = _ZEN_Component_dataGrid_getPagingHTML;
	p.getPopupContent = _ZEN_Component_dataGrid_getPopupContent;
	p.getRowCount = _ZEN_Component_dataGrid_getRowCount;
	p.getRowDescriptor = _ZEN_Component_dataGrid_getRowDescriptor;
	p.getRowDescriptorCount = _ZEN_Component_dataGrid_getRowDescriptorCount;
	p.getRowDescriptors = _ZEN_Component_dataGrid_getRowDescriptors;
	p.getRowHeaderLabels = _ZEN_Component_dataGrid_getRowHeaderLabels;
	p.getRowInfo = _ZEN_Component_dataGrid_getRowInfo;
	p.getRowOffset = _ZEN_Component_dataGrid_getRowOffset;
	p.getRowValue = _ZEN_Component_dataGrid_getRowValue;
	p.getRowsOnPage = _ZEN_Component_dataGrid_getRowsOnPage;
	p.getSearchDiv = _ZEN_Component_dataGrid_getSearchDiv;
	p.gridKeyBlur = _ZEN_Component_dataGrid_gridKeyBlur;
	p.gridKeyDownHandler = _ZEN_Component_dataGrid_gridKeyDownHandler;
	p.gridKeyFocus = _ZEN_Component_dataGrid_gridKeyFocus;
	p.gridKeyPressHandler = _ZEN_Component_dataGrid_gridKeyPressHandler;
	p.hideGroupHandler = _ZEN_Component_dataGrid_hideGroupHandler;
	p.hideMessage = _ZEN_Component_dataGrid_hideMessage;
	p.hideOverlay = _ZEN_Component_dataGrid_hideOverlay;
	p.highlightCells = _ZEN_Component_dataGrid_highlightCells;
	p.initEngine = _ZEN_Component_dataGrid_initEngine;
	p.initializeSizingObject = _ZEN_Component_dataGrid_initializeSizingObject;
	p.isCellEditable = _ZEN_Component_dataGrid_isCellEditable;
	p.isCellVisible = _ZEN_Component_dataGrid_isCellVisible;
	p.killEvent = _ZEN_Component_dataGrid_killEvent;
	p.moveCellSelector = _ZEN_Component_dataGrid_moveCellSelector;
	p.moveToCell = _ZEN_Component_dataGrid_moveToCell;
	p.nextPage = _ZEN_Component_dataGrid_nextPage;
	p.notifyView = _ZEN_Component_dataGrid_notifyView;
	p.notifyViewHandler = _ZEN_Component_dataGrid_notifyViewHandler;
	p.onCreate = _ZEN_Component_dataGrid_onCreate;
	p.prevPage = _ZEN_Component_dataGrid_prevPage;
	p.reallyUpdateCells = _ZEN_Component_dataGrid_reallyUpdateCells;
	p.recalc = _ZEN_Component_dataGrid_recalc;
	p.renderCells = _ZEN_Component_dataGrid_renderCells;
	p.renderContents = _ZEN_Component_dataGrid_renderContents;
	p.renderSkeleton = _ZEN_Component_dataGrid_renderSkeleton;
	p.resizeMouseDblClick = _ZEN_Component_dataGrid_resizeMouseDblClick;
	p.resizeMouseDown = _ZEN_Component_dataGrid_resizeMouseDown;
	p.resizeMouseMove = _ZEN_Component_dataGrid_resizeMouseMove;
	p.resizeMouseUp = _ZEN_Component_dataGrid_resizeMouseUp;
	p.rowClickHandler = _ZEN_Component_dataGrid_rowClickHandler;
	p.rowDblClickHandler = _ZEN_Component_dataGrid_rowDblClickHandler;
	p.selectCell = _ZEN_Component_dataGrid_selectCell;
	p.selectCellHandler = _ZEN_Component_dataGrid_selectCellHandler;
	p.selectPopupItem = _ZEN_Component_dataGrid_selectPopupItem;
	p.selectorClickHandler = _ZEN_Component_dataGrid_selectorClickHandler;
	p.selectorDblClickHandler = _ZEN_Component_dataGrid_selectorDblClickHandler;
	p.sendEventToController = _ZEN_Component_dataGrid_sendEventToController;
	p.setCellValue = _ZEN_Component_dataGrid_setCellValue;
	p.setControllerId = _ZEN_Component_dataGrid_setControllerId;
	p.setCurrPage = _ZEN_Component_dataGrid_setCurrPage;
	p.setFilterKey = _ZEN_Component_dataGrid_setFilterKey;
	p.setPageSize = _ZEN_Component_dataGrid_setPageSize;
	p.setProperty = _ZEN_Component_dataGrid_setProperty;
	p.setSize = _ZEN_Component_dataGrid_setSize;
	p.showGroupHandler = _ZEN_Component_dataGrid_showGroupHandler;
	p.showMessage = _ZEN_Component_dataGrid_showMessage;
	p.showOverlay = _ZEN_Component_dataGrid_showOverlay;
	p.showPopup = _ZEN_Component_dataGrid_showPopup;
	p.sizeHandleMouseDown = _ZEN_Component_dataGrid_sizeHandleMouseDown;
	p.sizeHandleMouseMove = _ZEN_Component_dataGrid_sizeHandleMouseMove;
	p.sizeHandleMouseUp = _ZEN_Component_dataGrid_sizeHandleMouseUp;
	p.splitStyle = _ZEN_Component_dataGrid_splitStyle;
	p.stopEditCell = _ZEN_Component_dataGrid_stopEditCell;
	p.updateCells = _ZEN_Component_dataGrid_updateCells;
	p.updateGrid = _ZEN_Component_dataGrid_updateGrid;
	p.wheelHandler = _ZEN_Component_dataGrid_wheelHandler;
}
/* EOF */