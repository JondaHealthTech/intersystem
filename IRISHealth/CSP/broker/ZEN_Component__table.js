/*** Zen Module: ZEN_Component__table ***/

self._zenClassIdx['simpleTablePane'] = '_ZEN_Component_simpleTablePane';
self._ZEN_Component_simpleTablePane = function(index,id) {
	if (index>=0) {_ZEN_Component_simpleTablePane__init(this,index,id);}
}

self._ZEN_Component_simpleTablePane__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.OnCreateResultSet = ''; // encrypted
	o.OnExecuteResultSet = ''; // encrypted
	o.columnName = '';
	o.countRows = '0';
	o.enableToggleSelect = false;
	o.groupByClause = '';
	o.hasFocus = false;
	o.initialExecute = true;
	o.maxRows = '100';
	o.multiSelect = false;
	o.ondblclick = '';
	o.onmouseoverClass = '';
	o.onmultiselect = '';
	o.onselectrow = '';
	o.onunselectrow = '';
	o.orderByClause = '';
	o.queryClass = ''; // encrypted
	o.queryName = '';
	o.rowSelect = true;
	o.selectedIndex = '-1';
	o.selectedRows = '';
	o.showRowNumbers = false;
	o.showRowSelector = true;
	o.showZebra = false;
	o.sql = ''; // encrypted
	o.tableName = ''; // encrypted
	o.value = '';
	o.whereClause = '';
}
function _ZEN_Component_simpleTablePane_serialize(set,s)
{
	var o = this;s[0]='327969827';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.OnCreateResultSet;s[7]=o.OnExecuteResultSet;s[8]=o.align;s[9]=o.aux;s[10]=o.columnName;s[11]=o.containerStyle;s[12]=o.countRows;s[13]=(o.dragEnabled?1:0);s[14]=(o.dropEnabled?1:0);s[15]=(o.dynamic?1:0);s[16]=(o.enableToggleSelect?1:0);s[17]=o.enclosingClass;s[18]=o.enclosingStyle;s[19]=o.error;s[20]=o.groupByClause;s[21]=(o.hasFocus?1:0);s[22]=o.height;s[23]=(o.hidden?1:0);s[24]=o.hint;s[25]=o.hintClass;s[26]=o.hintStyle;s[27]=(o.initialExecute?1:0);s[28]=o.label;s[29]=o.labelClass;s[30]=o.labelDisabledClass;s[31]=o.labelStyle;s[32]=o.maxRows;s[33]=(o.multiSelect?1:0);s[34]=o.onafterdrag;s[35]=o.onbeforedrag;s[36]=o.ondblclick;s[37]=o.ondrag;s[38]=o.ondrop;s[39]=o.onhide;s[40]=o.onmouseoverClass;s[41]=o.onmultiselect;s[42]=o.onrefresh;s[43]=o.onselectrow;s[44]=o.onshow;s[45]=o.onunselectrow;s[46]=o.onupdate;s[47]=o.orderByClause;s[48]=o.overlayMode;s[49]=o.queryClass;s[50]=o.queryName;s[51]=o.renderFlag;s[52]=(o.rowSelect?1:0);s[53]=o.selectedIndex;s[54]=o.selectedRows;s[55]=(o.showLabel?1:0);s[56]=(o.showRowNumbers?1:0);s[57]=(o.showRowSelector?1:0);s[58]=(o.showZebra?1:0);s[59]=o.slice;s[60]=o.sql;s[61]=o.tableName;s[62]=o.title;s[63]=o.tuple;s[64]=o.valign;s[65]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[66]=(o.visible?1:0);s[67]=o.whereClause;s[68]=o.width;
}
function _ZEN_Component_simpleTablePane_getSettings(s)
{
	s['name'] = 'string';
	s['columnName'] = 'string';
	s['countRows'] = 'integer';
	s['enableToggleSelect'] = 'boolean';
	s['groupByClause'] = 'string';
	s['initialExecute'] = 'boolean';
	s['maxRows'] = 'integer';
	s['multiSelect'] = 'boolean';
	s['ondblclick'] = 'eventHandler';
	s['onmouseoverClass'] = 'cssClass';
	s['onmultiselect'] = 'eventHandler';
	s['onselectrow'] = 'eventHandler';
	s['onunselectrow'] = 'eventHandler';
	s['orderByClause'] = 'string';
	s['queryClass'] = 'className';
	s['queryName'] = 'classMember:QUERY';
	s['rowSelect'] = 'boolean';
	s['selectedIndex'] = 'integer';
	s['selectedRows'] = 'string';
	s['showRowNumbers'] = 'boolean';
	s['showRowSelector'] = 'boolean';
	s['showZebra'] = 'boolean';
	s['sql'] = 'sql';
	s['tableName'] = 'string';
	s['value'] = 'string';
	s['whereClause'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_simpleTablePane_cbClick = function(cb,row) {
this.ignoreClick = true; // transient flag
this.selectMultiRow(row,cb.checked);
zenInvokeCallbackMethod(this.onmultiselect,this,'onmultiselect');
}

self._ZEN_Component_simpleTablePane_cbHeaderClick = function(cb) {
this.selectAllMultiRows(cb.checked);
zenInvokeCallbackMethod(this.onmultiselect,this,'onmultiselect');
}

self._ZEN_Component_simpleTablePane_clickHandler = function(row) {
this.selectRow(row,false,'click');
this.focus();
}

self._ZEN_Component_simpleTablePane_dblclickHandler = function() {
zenInvokeCallbackMethod(this.ondblclick,this,'ondblclick');
}

self._ZEN_Component_simpleTablePane_focus = function() {
}

self._ZEN_Component_simpleTablePane_getValue = function() {
return this.getProperty('value');
}

self._ZEN_Component_simpleTablePane_isRowSelected = function(row) {
var idx = row;
if (!isNaN(this.pageSize)) {
idx = row + ((this.currPage-1) * this.pageSize);
}
var list = this.selectedRows.split(',');
return (list[idx]!=null && list[idx]!='');
}

self._ZEN_Component_simpleTablePane_onRefreshContents = function() {
this.stopProgressBar();
if (!this.rowSelect) {
var idx = this.selectedIndex;
this.selectedIndex = -1; // force change
this.selectRow(idx,false);
}
else {
this.selectedIndex = -1;
}
if (this.navigator && this.navigator.updateState) {
this.navigator.updateState();
}
if (this.hasFocus) {
self.setTimeout("zenPage.getComponent("+this.index+").focus()",50);
}
}

self._ZEN_Component_simpleTablePane_onmouseHandler = function(row,over) {
if (this.onmouseoverClass == '') {
return;
}
if (!this._rowClassIndex) {
this._rowClassIndex = new Object();
}
var tr = this.findElement('tr_'+row);
if (tr) {
if (tr.className.indexOf('tpSelected') == -1) {
if (over) {
this._rowClassIndex[row] = tr.className;
var otherClasses = '';
var restrictedNames = ',' + (this.showZebra ? 'tpOdd,tpEven,' : '') + this.onmouseoverClass + ',';
var test = tr.className.split(' ');
for (var i = 0; i < test.length; i++) {
if ((test[i] != '') && (restrictedNames.indexOf(','+test[i]+',') == -1)) {
otherClasses = otherClasses + ' ' + test[i];
}
}
tr.className = this.onmouseoverClass + otherClasses;
}
else {
if ((this._rowClassIndex[row] != '') && (this._rowClassIndex[row] != null)) {
tr.className = this._rowClassIndex[row];
delete this._rowClassIndex[row];
}
else if (this.showZebra) {
if (tr.className.indexOf('tpOdd') > -1) {
tr.className = 'tpOdd';
}
else if (tr.className.indexOf('tpEven') > -1) {
tr.className = 'tpEven';
}
else {
tr.className = '';
}
}
else {
tr.className = '';
}
}
}
else if (typeof tr.className == 'string') {
var classes = tr.className.split(' ');
var newClasses = [];
while (classes.length > 0) {
var currClass = classes.shift();
if ((currClass != '') && (currClass != 'tpSelected')) {
newClasses[newClasses.length] = currClass;
}
}
var newClass = newClasses.join(' ');
if (newClass != '') {
this._rowClassIndex[row] = newClass;
}
else {
delete this._rowClassIndex[row];
}
}
}
}

self._ZEN_Component_simpleTablePane_onupdateHandler = function() {
if (this.showZebra) { // PL66143
var tBody = this.window.document.getElementById("tpBody_"+this.index);
if (tBody) tBody.style.backgroundColor="transparent";
}
if (this.refreshRequired && this.executeQuery) {
this.refreshRequired = false;
this.executeQuery(true);
return;
}
if (this.navigator && this.navigator.updateState) {
this.navigator.updateState();
}
}

self._ZEN_Component_simpleTablePane_refreshTable = function(sync) {
if (null == this.progressBarTimerId) {
this.refreshContents(sync);
this.startProgressBar();
}
}

self._ZEN_Component_simpleTablePane_selectAllMultiRows = function(flag) {
var rowCount = ('' == this.pageSize || 0 == this.pageSize) ? parseInt(this.rowCount.split(' ')[0]) : this.pageSize;
for (var row = 0; row < rowCount; row++) {
this.selectMultiRow(row, flag);
}
}

self._ZEN_Component_simpleTablePane_selectMultiRow = function(row,flag) {
var idx = row;
if (!isNaN(this.pageSize)) {
idx = row + ((this.currPage-1) * this.pageSize);
}
var rcb = this.findElement('cb_'+row);
if (rcb) {
rcb.checked = flag;
var val = '';
var tr = this.findElement("tr_" + row);
if (tr) {
val = tr.getAttribute('zenValue');
}
var list = this.selectedRows.split(',');
list[idx] = flag ? val : '';
this.selectedRows = list.join(',');
}
}

self._ZEN_Component_simpleTablePane_selectRow = function(row,scroll,which) {
if (!this.rowSelect) {
if (this.multiSelect && !this.ignoreClick) {
this.selectMultiRow(row,!this.isRowSelected(row));
zenInvokeCallbackMethod(this.onmultiselect,this,'onmultiselect');
}
this.ignoreClick = false;
return;
}
this.ignoreClick = false;
var changed = (row != this.selectedIndex);
if ((this.selectedIndex >= 0)&&(changed || this.enableToggleSelect)) {
var tr = this.findElement("tr_" + this.selectedIndex);
if (tr) {
tr.className = this.trClass ? this.trClass : '';
}
var selector = this.findElement("selector_" + this.selectedIndex);
if (selector) {
selector.innerHTML="&#160;";
}
which = ('undefined' == typeof which) ? '' : which;
zenInvokeCallbackMethod(this.onunselectrow,this,'onunselectrow','which',which);
this.selectedIndex = -1;
this.value = ""; // PFD, 2013/02/04 - Clear the value property
if (!changed) return;
}
this.selectedIndex = row;
if (changed || this.enableToggleSelect) {
this.value = '';
if (this.selectedIndex >= 0) {
var tr = this.findElement("tr_" + this.selectedIndex);
if (tr) {
if (this._rowClassIndex && (this._rowClassIndex[row] != null)) {
this.trClass = this._rowClassIndex[row];
delete this._rowClassIndex[row];
}
else {
this.trClass = tr.className;
}
tr.className = 'tpSelected';
if (scroll) {
zenScrollIntoView(this.findElement('tpBody'),tr);
}
this.value = tr.getAttribute('zenValue');
}
var selector = this.findElement("selector_" + this.selectedIndex);
if (selector) {
selector.innerHTML="&#187;";
}
}
if (this.enableToggleSelect || changed) {
which = ('undefined' == typeof which) ? '' : which;
zenInvokeCallbackMethod(this.onselectrow,this,'onselectrow','which',which);
}
}
else if (this.onmouseoverClass && (this.onmouseoverClass != '')) {
if (!this._rowClassIndex) {
this._rowClassIndex =  new Object();
}
var thisClass = '';
if (tr && tr.className) {
thisClass = tr.className;
}
this._rowClassIndex[row] = thisClass;
}
}

self._ZEN_Component_simpleTablePane_setProperty = function(property,value,value2) {
switch(property) {
case 'enableToggleSelect':
value = value ? true : false;
if (value != this.enableToggleSelect) {
this.enableToggleSelect = value;
this.refreshTable();
}
break;
case 'rowSelect':
value = value ? true : false;
if (value != this.rowSelect) {
this.rowSelect = value;
this.refreshTable();
}
break;
case 'multiSelect':
value = value ? true : false;
if (value != this.multiSelect) {
this.multiSelect = value;
this.refreshTable();
}
break;
case 'selectedRows':
if (value != this.selectedRows) {
this.selectedRows = value;
if (this.multiSelect) {
this.updateRowSelectBoxes();
}
}
break;
case 'selectedIndex':
this.selectRow(value,false);
break;
case 'showRowNumbers':
value = value ? true : false;
if (value != this.showRowNumbers) {
this.showRowNumbers = value;
this.refreshTable();
}
break;
case 'showRowSelector':
value = value ? true : false;
if (value != this.showRowSelector) {
this.showRowSelector = value;
this.refreshTable();
}
break;
case 'showZebra':
value = value ? true : false;
if (value != this.showZebra) {
this.showZebra = value;
this.refreshTable();
}
break;
case 'initialExecute':
this.initialExecute = value ? true : false;
break;
case 'value': // readonly
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_simpleTablePane_updateRowSelectBoxes = function() {
var list = this.selectedRows.split(',');
var rowCount = (this.pageSize > this.rowCount) ? this.pageSize : this.rowCount;
for (var row = 0; row < rowCount; row++) {
var idx = row + ((this.currPage-1) * this.pageSize);
var sel = (list[idx]!=null && list[idx]!='') ? true : false;
var rcb = this.findElement('cb_'+row);
if (rcb) {
rcb.checked = sel;
}
}
}

self._ZEN_Component_simpleTablePane_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_simpleTablePane__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_ZEN_Component_simpleTablePane.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _ZEN_Component_simpleTablePane.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_simpleTablePane;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.simpleTablePane';
	p._type = 'simpleTablePane';
	p.serialize = _ZEN_Component_simpleTablePane_serialize;
	p.getSettings = _ZEN_Component_simpleTablePane_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_simpleTablePane_ReallyRefreshContents;
	p.cbClick = _ZEN_Component_simpleTablePane_cbClick;
	p.cbHeaderClick = _ZEN_Component_simpleTablePane_cbHeaderClick;
	p.clickHandler = _ZEN_Component_simpleTablePane_clickHandler;
	p.dblclickHandler = _ZEN_Component_simpleTablePane_dblclickHandler;
	p.focus = _ZEN_Component_simpleTablePane_focus;
	p.getValue = _ZEN_Component_simpleTablePane_getValue;
	p.isRowSelected = _ZEN_Component_simpleTablePane_isRowSelected;
	p.onRefreshContents = _ZEN_Component_simpleTablePane_onRefreshContents;
	p.onmouseHandler = _ZEN_Component_simpleTablePane_onmouseHandler;
	p.onupdateHandler = _ZEN_Component_simpleTablePane_onupdateHandler;
	p.refreshTable = _ZEN_Component_simpleTablePane_refreshTable;
	p.selectAllMultiRows = _ZEN_Component_simpleTablePane_selectAllMultiRows;
	p.selectMultiRow = _ZEN_Component_simpleTablePane_selectMultiRow;
	p.selectRow = _ZEN_Component_simpleTablePane_selectRow;
	p.setProperty = _ZEN_Component_simpleTablePane_setProperty;
	p.updateRowSelectBoxes = _ZEN_Component_simpleTablePane_updateRowSelectBoxes;
}

self._zenClassIdx['tableNavigatorBar'] = '_ZEN_Component_tableNavigatorBar';
self._ZEN_Component_tableNavigatorBar = function(index,id) {
	if (index>=0) {_ZEN_Component_tableNavigatorBar__init(this,index,id);}
}

self._ZEN_Component_tableNavigatorBar__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.maxButtons = '5';
	o.maxPageSize = '1000';
	o.maxRows = '1000';
	o.msgFilter = '';
	o.msgFirstPage = '';
	o.msgFound = '';
	o.msgLastPage = '';
	o.msgMaxRows = '';
	o.msgNextPage = '';
	o.msgOf = '';
	o.msgPage = '';
	o.msgPageSize = '';
	o.msgPreviousPage = '';
	o.navmaxRows = '100000';
	o.onMaxRowsChange = '';
	o.onPageSizeChange = '';
	o.onfilterChange = '';
	o.saveSizeMax = false;
	o.showFilter = false;
	o.showMaxRows = false;
	o.showPageSize = false;
	o.tablePaneId = '';
}
function _ZEN_Component_tableNavigatorBar_serialize(set,s)
{
	var o = this;s[0]='4227344744';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.containerStyle;s[9]=(o.dragEnabled?1:0);s[10]=(o.dropEnabled?1:0);s[11]=(o.dynamic?1:0);s[12]=o.enclosingClass;s[13]=o.enclosingStyle;s[14]=o.error;s[15]=o.height;s[16]=(o.hidden?1:0);s[17]=o.hint;s[18]=o.hintClass;s[19]=o.hintStyle;s[20]=o.label;s[21]=o.labelClass;s[22]=o.labelDisabledClass;s[23]=o.labelStyle;s[24]=o.maxButtons;s[25]=o.maxPageSize;s[26]=o.maxRows;s[27]=o.msgFilter;s[28]=o.msgFirstPage;s[29]=o.msgFound;s[30]=o.msgLastPage;s[31]=o.msgMaxRows;s[32]=o.msgNextPage;s[33]=o.msgOf;s[34]=o.msgPage;s[35]=o.msgPageSize;s[36]=o.msgPreviousPage;s[37]=o.navmaxRows;s[38]=o.onMaxRowsChange;s[39]=o.onPageSizeChange;s[40]=o.onafterdrag;s[41]=o.onbeforedrag;s[42]=o.ondrag;s[43]=o.ondrop;s[44]=o.onfilterChange;s[45]=o.onhide;s[46]=o.onrefresh;s[47]=o.onshow;s[48]=o.onupdate;s[49]=o.overlayMode;s[50]=o.renderFlag;s[51]=(o.saveSizeMax?1:0);s[52]=(o.showFilter?1:0);s[53]=(o.showLabel?1:0);s[54]=(o.showMaxRows?1:0);s[55]=(o.showPageSize?1:0);s[56]=o.slice;s[57]=o.tablePaneId;s[58]=o.title;s[59]=o.tuple;s[60]=o.valign;s[61]=(o.visible?1:0);s[62]=o.width;
}
function _ZEN_Component_tableNavigatorBar_getSettings(s)
{
	s['name'] = 'string';
	s['maxButtons'] = 'integer';
	s['maxPageSize'] = 'integer';
	s['maxRows'] = 'integer';
	s['msgFilter'] = 'caption';
	s['msgFirstPage'] = 'caption';
	s['msgFound'] = 'caption';
	s['msgLastPage'] = 'caption';
	s['msgMaxRows'] = 'caption';
	s['msgNextPage'] = 'caption';
	s['msgOf'] = 'caption';
	s['msgPage'] = 'caption';
	s['msgPageSize'] = 'caption';
	s['msgPreviousPage'] = 'caption';
	s['navmaxRows'] = 'integer';
	s['onMaxRowsChange'] = 'eventHandler';
	s['onPageSizeChange'] = 'eventHandler';
	s['onfilterChange'] = 'eventHandler';
	s['saveSizeMax'] = 'boolean';
	s['showFilter'] = 'boolean';
	s['showMaxRows'] = 'boolean';
	s['showPageSize'] = 'boolean';
	s['tablePaneId'] = 'id';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_tableNavigatorBar_connect = function() {
this.setProperty('tablePaneId',this.tablePaneId);
if (this.showMaxRows) {
if (null == this.tablePane) return;
this.maxRows = this.tablePane.getProperty("maxRows");
}
}

self._ZEN_Component_tableNavigatorBar_gotoPage = function(where) {
if (null == this.tablePane) return;
switch(where) {
case 'first':
this.tablePane.firstPage();
break;
case 'last':
this.tablePane.lastPage();
break;
case 'next':
this.tablePane.nextPage();
break;
case 'prev':
this.tablePane.previousPage();
break;
default:
var page = parseInt(where,10);
if (!isNaN(page)) {
this.tablePane.gotoPage(page);
}
break;
}
return true;
}

self._ZEN_Component_tableNavigatorBar_onfilterHandler = function(value) {
zenInvokeCallbackMethod(this.onfilterChange,this,'onfilterChange','value',value);
}

self._ZEN_Component_tableNavigatorBar_onloadHandler = function() {
this.connect();
}

self._ZEN_Component_tableNavigatorBar_onmaxRowsHandler = function(ctrl) {
var size = parseInt(ctrl.value,10);
size = isNaN(size) ? this.maxRows : size;
size = (size < 0) ? this.maxRows : size;
size = (size > this.navmaxRows) ? this.navmaxRows : size;
ctrl.value = size;
ctrl.focus();
if (null == this.tablePane) return;
this.tablePane.setProperty('maxRows',size);
this.tablePane.executeQuery();
if (this.saveSizeMax) {
zenInvokeCallbackMethod(this.onMaxRowsChange,this,'onMaxRowsChange','value',size);
}
}

self._ZEN_Component_tableNavigatorBar_onpageSizeHandler = function(ctrl) {
var size = parseInt(ctrl.value,10);
size = isNaN(size) ? 0 : size;
size = (size < 0) ? 0 : size;
size = (size > this.maxPageSize) ? this.maxPageSize : size;
ctrl.value = size;
ctrl.focus();
if (null == this.tablePane) return;
this.tablePane.setProperty('pageSize',size);
if (this.saveSizeMax) {
zenInvokeCallbackMethod(this.onPageSizeChange,this,'onPageSizeChange','value',size);
}
}

self._ZEN_Component_tableNavigatorBar_renderButtons = function() {
if (this.getEnclosingDiv() == null) { return ''; }
var table = this.tablePane;
if (null == table) { return ''; }
var pageNo = table.getProperty('currPage');
var pageCount = table.getPageCount();
var html = new Array();
html[html.length] = '<span class="tnbrPagingButtons">';
html[html.length] = '&#160;' + this.msgPage + ':&#160;';
if (pageNo > 1) {
html[html.length] = '<a title="'+this.msgFirstPage+'" class="tnbrPageLink" style="cursor:pointer;" onmousedown="zenPage.getComponent(' + this.index + ').gotoPage(\'first\');"><b>|&#8249;</b></a>';
html[html.length] = '<a title="'+this.msgPreviousPage+'" class="tnbrPageLink" style="cursor:pointer" onmousedown="zenPage.getComponent(' + this.index + ').gotoPage(\'prev\');"><b>&#8249;&#8249;</b></a>';
}
else {
html[html.length] = '<a class="tnbrPageLinkDisabled"><b>|&#8249;</b></a>';
html[html.length] = '<a class="tnbrPageLinkDisabled"><b>&#8249;&#8249;</b></a>';
}
var maxButtons = parseInt(this.maxButtons,10);
maxButtons = (maxButtons < 1) ? 1 : maxButtons;
var startPage = ((Math.floor((pageNo-1)/maxButtons)) * maxButtons) + 1;
var endPage = startPage + (maxButtons - 1);
endPage = (endPage>pageCount) ? pageCount : endPage;
for (var p = startPage; p <= endPage; p++) {
var cls = (p==pageNo) ? 'tnbrPageLinkCurr' : 'tnbrPageLink';
html[html.length] = '<a class="'+cls+'" style="cursor:pointer;" onmousedown="return zenPage.getComponent(' + this.index + ').gotoPage('+p+');">'+p+'</a>';
}
if (pageNo < pageCount) {
html[html.length] = '<a title="'+this.msgNextPage+'" class="tnbrPageLink" style="cursor:pointer;" onmousedown="zenPage.getComponent(' + this.index + ').gotoPage(\'next\');"><b>&#8250;&#8250;</b></a>';
html[html.length] = '<a title="'+this.msgLastPage+'" class="tnbrPageLink" style="cursor:pointer;" onmousedown="zenPage.getComponent(' + this.index + ').gotoPage(\'last\');"><b>&#8250;|</b></a>';
}
else {
html[html.length] = '<a class="tnbrPageLinkDisabled"><b>&#8250;&#8250;</b></a>';
html[html.length] = '<a class="tnbrPageLinkDisabled"><b>&#8250;|</b></a>';
}
html[html.length] = this.msgOf + '&#160;' + pageCount + '&#160;';
return html.join('');
}

self._ZEN_Component_tableNavigatorBar_renderContents = function() {
if (this.getEnclosingDiv() == null) return;
var html = new Array();
html[html.length] = '<table class="tnbrTable" border="0" cellpadding="3" cellspacing="0"><tr>';
html[html.length] = '<td align="left" valign="center" nowrap>&#160;';
var table = this.tablePane;
if (null == table) {
if (this.tablePaneId!='') {
var target=null;
if (this.composite) {
target = this.composite.getChildById(this.tablePaneId);
}
else {
target = zenPage.getComponentById(this.tablePaneId);
}
if (target) {
this.connect();
table = this.tablePane;
}
}
}
if (null == table) {
html[html.length] = 'Not connected';
}
else {
var rowCount = table.getProperty('rowCount');
var pageSize = table.getProperty('pageSize');
var maxRows = table.getProperty('maxRows');
if (this.showFilter) {
html[html.length] = '<span class="tnbrFilter">';
html[html.length] = this.msgFilter + ':&#160;';
html[html.length] = '<input id="'+this.makeId('filter')+'" type="text" size="8" onchange="zenPage.getComponent('+this.index+').onfilterHandler(this.value);" title="' + this.title + '"/>&#160;';
html[html.length] = '</span>';
}
if (this.showPageSize) {
html[html.length] = '<span class="tnbrFilter">';
html[html.length] = this.msgPageSize + ':&#160;';
html[html.length] = '<input id="'+this.makeId('pgsize')+'" type="text" size="4" onchange="zenPage.getComponent('+this.index+').onpageSizeHandler(this);" value="'+pageSize+'"/>&#160;';
html[html.length] = '</span>';
}
if (this.showMaxRows) {
html[html.length] = '<span class="tnbrFilter">';
html[html.length] = this.msgMaxRows + ':&#160;';
html[html.length] = '<input id="'+this.makeId('maxrows')+'" type="text" size="4" onchange="zenPage.getComponent('+this.index+').onmaxRowsHandler(this);" value="'+maxRows+'"/>&#160;';
html[html.length] = '</span>';
}
html[html.length] = '<span class="tnbrFound">';
html[html.length] = this.msgFound + ':&#160;<span id="'+this.makeId('rowCount')+'">' + rowCount;
html[html.length] = '</span></span>&#160;';
html[html.length] = '<span id="'+this.makeId('tnbrPagingSpan')+'">';
html[html.length] = this.renderButtons();
html[html.length] = '</span>';
}
html[html.length] = '</td>';
html[html.length] = '<td align="right" width="5%">&#160;</td></tr></table>';
this.getEnclosingDiv().innerHTML = html.join('');
}

self._ZEN_Component_tableNavigatorBar_setProperty = function(property,value,value2) {
switch(property) {
case 'tablePaneId':
if (this.tablePane && this.tablePane.removeNavigator) {
this.tablePane.removeNavigator();
this.tablePane = null;
}
this.tablePaneId = value;
if (this.composite) {
this.tablePane = this.composite.getChildById(this.tablePaneId);
}
else {
this.tablePane = zenPage.getComponentById(this.tablePaneId);
}
if (this.tablePane && this.tablePane.addNavigator) {
this.tablePane.addNavigator(this);
}
this.updateState();
break;
case 'maxButtons':
this.maxButtons = parseInt(value,10);
this.render();
break;
case 'showFilter':
this.showFilter = value ? true : false;
this.render();
break;
case 'maxPageSize':
this.maxPageSize = parseInt(value,10);
break;
case 'maxRows':
this.maxRows = parseInt(value,10);
break;
case 'navmaxRows':
this.navmaxRows = parseInt(value,10);
break;
default:
this.invokeSuper('setProperty',arguments);
break;
}
}

self._ZEN_Component_tableNavigatorBar_updateState = function() {
var span = this.findElement('tnbrPagingSpan');
if (span) {
span.innerHTML = this.renderButtons();
if (this.tablePane) {
var ctrl = this.findElement('pgsize');
if (ctrl) {
ctrl.value = this.tablePane.getProperty('pageSize');
}
var sp = this.findElement('rowCount');
if (sp) {
sp.innerHTML = this.tablePane.getProperty('rowCount');
}
}
}
else {
this.renderContents();
}
}

self._ZEN_Component_tableNavigatorBar_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_tableNavigatorBar__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_ZEN_Component_tableNavigatorBar.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _ZEN_Component_tableNavigatorBar.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_tableNavigatorBar;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.tableNavigatorBar';
	p._type = 'tableNavigatorBar';
	p.serialize = _ZEN_Component_tableNavigatorBar_serialize;
	p.getSettings = _ZEN_Component_tableNavigatorBar_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_tableNavigatorBar_ReallyRefreshContents;
	p.connect = _ZEN_Component_tableNavigatorBar_connect;
	p.gotoPage = _ZEN_Component_tableNavigatorBar_gotoPage;
	p.onfilterHandler = _ZEN_Component_tableNavigatorBar_onfilterHandler;
	p.onloadHandler = _ZEN_Component_tableNavigatorBar_onloadHandler;
	p.onmaxRowsHandler = _ZEN_Component_tableNavigatorBar_onmaxRowsHandler;
	p.onpageSizeHandler = _ZEN_Component_tableNavigatorBar_onpageSizeHandler;
	p.renderButtons = _ZEN_Component_tableNavigatorBar_renderButtons;
	p.renderContents = _ZEN_Component_tableNavigatorBar_renderContents;
	p.setProperty = _ZEN_Component_tableNavigatorBar_setProperty;
	p.updateState = _ZEN_Component_tableNavigatorBar_updateState;
}

self._zenClassIdx['tablePane'] = '_ZEN_Component_tablePane';
self._ZEN_Component_tablePane = function(index,id) {
	if (index>=0) {_ZEN_Component_tablePane__init(this,index,id);}
}

self._ZEN_Component_tablePane__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_simpleTablePane__init) ?zenMaster._ZEN_Component_simpleTablePane__init(o,index,id):_ZEN_Component_simpleTablePane__init(o,index,id);
	o.OnCreateResultSet = ''; // encrypted
	o.OnExecuteResultSet = ''; // encrypted
	o.autoExecute = true;
	o.bodyHeight = '';
	o.caption = '';
	o.cellSpacing = '0';
	o.clearSnapshot = false;
	o.columnName = '';
	o.columns = new Array();
	o.conditions = new Array();
	o.countRows = '0';
	o.currColumn = '';
	o.currPage = '1';
	o.dataSource = 'query';
	o.extraColumnWidth = '30';
	o.filtersDisabled = false;
	o.fixedHeaders = false;
	o.groupByClause = '';
	o.headerLayout = 'filtersOnTop';
	o.invalidMessage = 'Invalid Date';
	o.lastFilter = '';
	o.lastUpdate = '';
	o.maxRows = '100';
	o.msgNoResult = 'No Results';
	o.nowrap = true;
	o.onheaderClick = '';
	o.onkeypress = '';
	o.orderByClause = '';
	o.pageSize = '0';
	o.parameters = new Array();
	o.permitClientSQL = ''; // encrypted
	o.queryClass = ''; // encrypted
	o.queryName = '';
	o.refreshRequired = false;
	o.rowCount = '';
	o.showFilters = true;
	o.showQuery = ''; // encrypted
	o.showValueInTooltip = false;
	o.snapshotId = '';
	o.sortOrder = '';
	o.sql = ''; // encrypted
	o.suppressExceptionOnClientSQL = false;
	o.tableName = ''; // encrypted
	o.unlockSession = false;
	o.useKeys = false;
	o.useSnapshot = false;
	o.valueColumn = '';
	o.whereClause = '';
}
function _ZEN_Component_tablePane_serialize(set,s)
{
	var o = this;s[0]='1851244562';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.OnCreateResultSet;s[7]=o.OnExecuteResultSet;s[8]=o.align;s[9]=(o.autoExecute?1:0);s[10]=o.aux;s[11]=o.bodyHeight;s[12]=o.caption;s[13]=o.cellSpacing;s[14]=(o.clearSnapshot?1:0);s[15]=o.columnName;s[16]=set.serializeList(o,o.columns,true,'columns');s[17]=set.serializeList(o,o.conditions,true,'conditions');s[18]=o.containerStyle;s[19]=o.countRows;s[20]=o.currColumn;s[21]=o.currPage;s[22]=o.dataSource;s[23]=(o.dragEnabled?1:0);s[24]=(o.dropEnabled?1:0);s[25]=(o.dynamic?1:0);s[26]=(o.enableToggleSelect?1:0);s[27]=o.enclosingClass;s[28]=o.enclosingStyle;s[29]=o.error;s[30]=o.extraColumnWidth;s[31]=(o.filtersDisabled?1:0);s[32]=(o.fixedHeaders?1:0);s[33]=o.groupByClause;s[34]=(o.hasFocus?1:0);s[35]=o.headerLayout;s[36]=o.height;s[37]=(o.hidden?1:0);s[38]=o.hint;s[39]=o.hintClass;s[40]=o.hintStyle;s[41]=(o.initialExecute?1:0);s[42]=o.invalidMessage;s[43]=o.label;s[44]=o.labelClass;s[45]=o.labelDisabledClass;s[46]=o.labelStyle;s[47]=o.lastFilter;s[48]=o.lastUpdate;s[49]=o.maxRows;s[50]=o.msgNoResult;s[51]=(o.multiSelect?1:0);s[52]=(o.nowrap?1:0);s[53]=o.onafterdrag;s[54]=o.onbeforedrag;s[55]=o.ondblclick;s[56]=o.ondrag;s[57]=o.ondrop;s[58]=o.onheaderClick;s[59]=o.onhide;s[60]=o.onkeypress;s[61]=o.onmouseoverClass;s[62]=o.onmultiselect;s[63]=o.onrefresh;s[64]=o.onselectrow;s[65]=o.onshow;s[66]=o.onunselectrow;s[67]=o.onupdate;s[68]=o.orderByClause;s[69]=o.overlayMode;s[70]=o.pageSize;s[71]=set.serializeList(o,o.parameters,true,'parameters');s[72]=o.permitClientSQL;s[73]=o.queryClass;s[74]=o.queryName;s[75]=(o.refreshRequired?1:0);s[76]=o.renderFlag;s[77]=o.rowCount;s[78]=(o.rowSelect?1:0);s[79]=o.selectedIndex;s[80]=o.selectedRows;s[81]=(o.showFilters?1:0);s[82]=(o.showLabel?1:0);s[83]=o.showQuery;s[84]=(o.showRowNumbers?1:0);s[85]=(o.showRowSelector?1:0);s[86]=(o.showValueInTooltip?1:0);s[87]=(o.showZebra?1:0);s[88]=o.slice;s[89]=o.snapshotId;s[90]=o.sortOrder;s[91]=o.sql;s[92]=(o.suppressExceptionOnClientSQL?1:0);s[93]=o.tableName;s[94]=o.title;s[95]=o.tuple;s[96]=(o.unlockSession?1:0);s[97]=(o.useKeys?1:0);s[98]=(o.useSnapshot?1:0);s[99]=o.valign;s[100]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[101]=o.valueColumn;s[102]=(o.visible?1:0);s[103]=o.whereClause;s[104]=o.width;
}
function _ZEN_Component_tablePane_getSettings(s)
{
	s['name'] = 'string';
	s['autoExecute'] = 'boolean';
	s['bodyHeight'] = 'length';
	s['caption'] = 'caption';
	s['cellSpacing'] = 'integer';
	s['columnName'] = 'string';
	s['columns'] = 'string';
	s['conditions'] = 'string';
	s['countRows'] = 'integer';
	s['currColumn'] = 'string';
	s['currPage'] = 'integer';
	s['dataSource'] = 'enum:query,columns';
	s['extraColumnWidth'] = 'length';
	s['filtersDisabled'] = 'boolean';
	s['fixedHeaders'] = 'boolean';
	s['groupByClause'] = 'string';
	s['headerLayout'] = 'enum:filtersOnTop,headersOnTop';
	s['invalidMessage'] = 'caption';
	s['lastUpdate'] = 'string';
	s['maxRows'] = 'integer';
	s['msgNoResult'] = 'caption';
	s['nowrap'] = 'boolean';
	s['onheaderClick'] = 'eventHandler';
	s['onkeypress'] = 'eventHandler';
	s['orderByClause'] = 'string';
	s['pageSize'] = 'integer';
	s['parameters'] = 'string';
	s['permitClientSQL'] = 'boolean';
	s['queryClass'] = 'className';
	s['queryName'] = 'classMember:QUERY';
	s['showFilters'] = 'boolean';
	s['showQuery'] = 'boolean';
	s['showValueInTooltip'] = 'boolean';
	s['sortOrder'] = 'enum:asc,desc';
	s['sql'] = 'sql';
	s['suppressExceptionOnClientSQL'] = 'boolean';
	s['tableName'] = 'string';
	s['unlockSession'] = 'boolean';
	s['useKeys'] = 'boolean';
	s['useSnapshot'] = 'boolean';
	s['valueColumn'] = 'string';
	s['whereClause'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_tablePane_addNavigator = function(nav) {
this.navigator = nav;
}

self._ZEN_Component_tablePane_anchorDiv = function() {
if (!this.useKeys) return;
var node = this.getEnclosingDiv();
var position = null;
if (node.currentStyle) // IE Style
position = node.currentStyle.position;
else if (window.getComputedStyle) {
var styleObj = window.getComputedStyle(node,null);
if (styleObj) position = styleObj.position;
}
if (!(position=="absolute" || position=="relative")) {
node.style.position = "relative";
node.style.top = "0px";
node.style.left = "0px";
}
}

self._ZEN_Component_tablePane_appendColumn = function(colName) {
var column = zenPage.createComponent('column');
column.colName = colName ? colName : '';
this.columns[this.columns.length] = column;
return column;
}

self._ZEN_Component_tablePane_applyFilters = function() {
if (this.autoExecute && !this.filtersDisabled) {
this.executeQuery();
return true;
}
return false;
}

self._ZEN_Component_tablePane_disableColumnFilters = function(flag) {
this.filtersDisabled = flag;
for (var n in this.columns) {
var column = this.columns[n];
if ('' != column.getColName() && '' != column.filterType) {
var n = 1;
while((ctrl = this.findElement("filter"+n+"_" + column.getColName())) != null) {
ctrl.disabled = flag;
n++;
}
}
}
}

self._ZEN_Component_tablePane_executeQuery = function(remember,sync) {
if (!remember) {
this.currPage = 1; // go back to first page
}
this.selectAllMultiRows(false);
if (this.useSnapshot) {
this.clearSnapshot = true; // force query execution
this.refreshTable(sync);
this.clearSnapshot = false;
}
else {
this.refreshTable(sync);
}
}

self._ZEN_Component_tablePane_filterChanged = function(filterName,refresh,type,index) {
for (var n in this.columns) {
var column = this.columns[n];
if (filterName == column.getColName() && '' != column.filterType) {
var ctrl = this.findElement("filter1_" + filterName);
if (ctrl){
if ('date'==type && 1==index) {
ctrl.value = zenParseDate(ctrl.value);
if (-1 == ctrl.value) {
ctrl.value = this.invalidMessage;
refresh = false;
}
}
column.filterValue = ctrl.value;
this.lastFilter = filterName;
}
var ctrl2 = this.findElement("filter2_" + filterName);
if (ctrl2){
if ('date'==type && 2==index) {
ctrl2.value = zenParseDate(ctrl2.value);
if (-1 == ctrl2.value) {
ctrl2.value = this.invalidMessage;
refresh = false;
}
}
column.filterValue = column.filterValue + "," + ctrl2.value;
}
break;
}
}
if (refresh) {
this.applyFilters();
var ctrl = this.findElement((index==2) ? "filter2_" : "filter1_" + filterName);
if (ctrl){
ctrl.focus();
}
}
}

self._ZEN_Component_tablePane_filterKeyPressed = function(evt,filterName,type,index) {
evt = evt ? evt : window.event;
switch(evt.keyCode) {
case zenENTER:
this.filterChanged(filterName,true,type,index);
return false;
}
return true;
}

self._ZEN_Component_tablePane_findChildByClass = function(node,className) {
for (var tNode=node.firstChild;tNode!=null; tNode=tNode.nextSibling) {
if (tNode.nodeType==1 && tNode.className==className) return(tNode);
}
return(null);
}

self._ZEN_Component_tablePane_findChildByTag = function(node,tagName) {
for (var tNode=node.firstChild;tNode!=null; tNode=tNode.nextSibling) {
if (tNode.nodeType==1 && tNode.tagName==tagName) return(tNode);
}
return(null);
}

self._ZEN_Component_tablePane_findDescendantByClass = function(node,className) {
for (var tNode=node.firstChild;tNode!=null; tNode=tNode.nextSibling) {
if (tNode.nodeType==1) {
if (tNode.className==className) return(tNode);
var tRecurse = this.findDescendantByClass(tNode,className);
if (tRecurse!=null) return(tRecurse);
}
}
return(null);
}

self._ZEN_Component_tablePane_firstPage = function() {
if (1 != this.currPage) {
this.selectRow(-1);
this.currPage = 1;
this.refreshTable();
}
}

self._ZEN_Component_tablePane_focus = function() {
var inv = this.findElement('invisible');
if (inv) {
if (this.selectedIndex >= 0) {
var tr = this.findElement("tr_" + this.selectedIndex);
if (tr) {
var offsetTop = tr.offsetTop;
inv.style.top = offsetTop+"px";
if (zenIsIE) inv.style.width="0px";
}
}
inv.focus();
}
}

self._ZEN_Component_tablePane_getColumnFilters = function() {
var out = new Object();
for (var n in this.columns) {
var column = this.columns[n];
if ('' != column.getColName() && '' != column.filterType) {
out[column.getColName()] = column.filterValue;
}
}
return out;
}

self._ZEN_Component_tablePane_getFilterValue = function(cname) {
var value = '';
for (var n in this.columns) {
var column = this.columns[n];
if (cname == column.getColName()) {
value = column.filterValue;
break;
}
}
return value;
}

self._ZEN_Component_tablePane_getInsideWidth = function(element) {
var baseW = element.offsetWidth;
return(baseW);
}

self._ZEN_Component_tablePane_getPageCount = function() {
var rc = parseInt(this.rowCount,10);
if (!isNaN(rc) && rc > 0 && this.pageSize > 0) {
return Math.floor(rc / this.pageSize) + ((rc % this.pageSize) ? 1 : 0);
}
return 1;
}

self._ZEN_Component_tablePane_getRenderedRowData = function(row) {
var rowId = "tr_"+row;
var rowDiv = this.findElement(rowId);
if (!rowDiv) return(null);
var len = this.columns.length;
if (len==0) return(null);
var rowObj = {};
var colIdx=0;
for (var k=rowDiv.firstChild;k!=null;k=k.nextSibling) {
if (k.nodeType==1) {
if (k.textContent) var value=k.textContent;
else var value=k.innerText;
if (value) value=value.replace(/^[ \t\u00A0]+|[ \t\u00A0]+$/,"");
if (k.className=='tpSel' || k.className=='tpCB') {}
else if (k.className=='tpRNum') {
rowObj["rowNum"]=value;
}
else {
if (colIdx>=len) {
return(rowObj);
}
var c = this.columns[colIdx];
while (c && (c.colName=='' || c.hidden)) {
colIdx++;
c = this.columns[colIdx];
}
if (colIdx<len) {
rowObj[c.colName]=value;
colIdx++;
}
}
}
}
return(rowObj);
}

self._ZEN_Component_tablePane_getRowData = function(row) {
if (row < 0) return null;
this._rowData = null;
if (this.useSnapshot) {
row = parseInt(row,10) + (parseInt(this.currPage,10)-1)*parseInt(this.pageSize,10);
var fetch = this.FetchRowFromSnapshot(this.index,this.snapshotId,row+1,this.currColumn,this.sortOrder);
}
var data = this._rowData;
delete this._rowData;
return data;
}

self._ZEN_Component_tablePane_gotoPage = function(page) {
if (page >= 1 && page != this.currPage && page <= this.getPageCount()) {
this.selectRow(-1);
this.currPage = page;
this.refreshTable();
}
}

self._ZEN_Component_tablePane_headerClick = function(name) {
var colInfo = null;
for (var c = 0; c < this.columns.length; c++) {
colInfo = this.columns[c];
if (colInfo && colInfo.colName==name) {
break;
}
colInfo = null;
}
if (colInfo && colInfo.disableSort) {
if ('' != this.onheaderClick) {
zenInvokeCallbackMethod(this.onheaderClick,this,'onheaderClick');
}
return;
}
if (this.currColumn == name) {
switch (this.sortOrder) {
case 'asc':
this.sortOrder = 'desc';
break;
case 'desc':
var th = this.findElement('th_'+this.currColumn);
if (th) {
th.className = '';
}
this.sortOrder = '';
this.currColumn = '';
break;
default:
this.sortOrder = 'asc';
break;
}
}
else {
if ('' != this.currColumn) {
var th = this.findElement('th_'+this.currColumn);
if (th) {
th.className = '';
}
}
this.currColumn = name;
if ('' != this.currColumn) {
var th = this.findElement('th_'+this.currColumn);
if (th) {
th.className = 'tpHdrSelected';
}
this.sortOrder = 'asc';
}
else {
this.sortOrder = '';
}
}
var go = this.useSnapshot;
if ('' != this.onheaderClick) {
go = zenInvokeCallbackMethod(this.onheaderClick,this,'onheaderClick');
}
if (go) {
this.currPage = 1; // go back to first page
this.selectAllMultiRows(false);
this.refreshTable();
}
return true;
}

self._ZEN_Component_tablePane_lastPage = function() {
if (this.getPageCount() != this.currPage) {
this.selectRow(-1);
this.currPage = this.getPageCount();
this.refreshTable();
}
}

self._ZEN_Component_tablePane_launchConfirmDialog = function(url,pageName,features,parms) {
zenLaunchPopupWindow(url, pageName, features, parms,this)
}

self._ZEN_Component_tablePane_nextPage = function(giveFocus) {
if (this.currPage < this.getPageCount()) {
this.selectRow(-1);
this.currPage++;
this.hasFocus = (giveFocus) ? true : false;
this.refreshTable();
}
}

self._ZEN_Component_tablePane_onDisplayHandler = function() {
this.anchorDiv();
if (this.findElement("tpBody")) {
this.packRows(); // PL 68773
this.resizeHeaders();
}
}

self._ZEN_Component_tablePane_onPopupAction = function(popupName,action,value) {
if (action=="ok"){
if (value!=""){
if (!zenPage.useSoftModals) { // Ensure the window is closed before running the code
setTimeout(value,50);
}
else {
eval(value);
}
}
}
}

self._ZEN_Component_tablePane_onloadHandler = function() {
this.anchorDiv();
if (this.findElement("tpBody")) {
this.resizeHeaders();
this.packRows(); // PL 68773
}
var index = this.selectedIndex;
this.selectedIndex = -1;
this.selectRow(index,false);
}

self._ZEN_Component_tablePane_packRows = function() {
if (this.hidden) return;
if (zenIsIE) {
this.packRowsIE();
return;
}
if (!(this.bodyHeight || this.fixedHeaders)) return; // If it wasn't set, this isn't an issue
if (!navigator) return; // Should never be true in a runtime situation
var isWebkit=(navigator.userAgent.indexOf("WebKit")>=0);
var isFF3=(navigator.userAgent.indexOf("Firefox")>=0);
if (!(isFF3 || isWebkit)) return; // Either early Firefox or unsupported platform
var eDiv=this.getEnclosingDiv();
if (eDiv.offsetWidth==0 || eDiv.offsetHeight==0) return; // Not yet visible
var tDiv=this.findElement("tpTable"); // used to be eDiv.firstChild;
var tHead=this.findElement("tpHead");
var tBody=this.findElement("tpBody");
if (isFF3) { // Wants to spread rows
var oldBodyH=tBody.offsetHeight;
if (!eDiv.forcedHeight) eDiv.baseHeight=eDiv.style.height;
eDiv.style.height=eDiv.clientHeight+"px";
tBody.style.height="";
eDiv.forcedHeight=true;
if (tBody.offsetHeight>oldBodyH) { // no correction needed, revert settings
var h="20.0em";
if (this.bodyHeight) h=this.bodyHeight;
tBody.style.height=h;
eDiv.style.height=eDiv.baseHeight;
eDiv.forcedHeight=false;
}
}
else { // Webkit shortens the table height to match the rows
if (!eDiv.targetBodyHeight) {
var h="20.0em";
if (this.bodyHeight) h=this.bodyHeight;
var tmp=document.createElement("DIV");
tmp.style.position="absolute";
tmp.style.height=h;
tmp.style.display="block";
document.body.appendChild(tmp);
eDiv.targetBodyHeight=tmp.clientHeight;
document.body.removeChild(tmp);
}
if (tBody.clientHeight<eDiv.targetBodyHeight) {
if (!eDiv.forcedHeight) {
eDiv.baseHeight=eDiv.style.height;
eDiv.forcedHeight=true;
var h=eDiv.clientHeight+eDiv.targetBodyHeight-tBody.clientHeight;
eDiv.style.height=h+"px";
}
}
else if (eDiv.forcedHeight) {
eDiv.style.height=eDiv.baseHeight;
eDiv.forcedHeight=false;
}
}
}

self._ZEN_Component_tablePane_packRowsIE = function() {
var eDiv=this.getEnclosingDiv();
var tDiv=eDiv.firstChild;
var tHead=this.findElement("tpHead");
var tBody=this.findElement("tpBody");
if (!this.bodyHeight && tBody.currentStyle.height=="auto") {
eDiv.forcedHeight=false;
return;
}
var pseudoShow = false;
var parentNode = eDiv.parentNode;
var insPt = eDiv.nextSibling;
if (tBody.offsetHeight<1 && tBody.offsetWidth<1 && eDiv.currentStyle.display!="none") { // obscured for some reason
pseudoShow = true;
document.body.appendChild(eDiv);
}
eDiv.style.backgroundColor=tBody.currentStyle.backgroundColor;
eDiv.style.display='inline-block';
var oldBodyH=tBody.offsetHeight;
if (!eDiv.forcedHeight) eDiv.baseHeight=eDiv.style.height;
eDiv.style.height=eDiv.clientHeight+"px";
if (!this.fixedHeaders) tBody.style.height="";
if (this.bodyHeight) {
eDiv.style.height=this.bodyHeight;
eDiv.style.overflow="auto";
eDiv.style.height=eDiv.offsetHeight+tBody.offsetTop+tHead.offsetTop+"px";
}
eDiv.forcedHeight=true;
if (tBody.offsetHeight>=oldBodyH) { // no correction needed, revert settings
var h="20.0em";
if (this.bodyHeight) {
if (this.fixedHeaders) {
h=this.bodyHeight;
if (zenPage.cssLevel<3) tBody.style.height=h;
eDiv.style.height=eDiv.baseHeight;
}
}
eDiv.forcedHeight=false;
}
if (pseudoShow) { // obscured for some reason
parentNode.insertBefore(eDiv,insPt);
}
}

self._ZEN_Component_tablePane_previousPage = function(giveFocus) {
if (this.currPage > 1) {
this.selectRow(-1);
this.currPage--;
this.hasFocus = (giveFocus) ? true : false;
this.refreshTable();
}
}

self._ZEN_Component_tablePane_refreshTable = function(sync) {
if (null == this.progressBarTimerId) {
this.refreshContents();
this.startProgressBar();
}
}

self._ZEN_Component_tablePane_removeNavigator = function() {
this.navigator = null;
}

self._ZEN_Component_tablePane_resetColumnFilters = function() {
for (var n in this.columns) {
var column = this.columns[n];
if ('' != column.getColName() && '' != column.filterType) {
column.filterValue = '';
var ctrl = this.findElement("filter1_" + column.getColName());
if (ctrl) {
ctrl.value = '';
}
var ctrl2 = this.findElement("filter2_" + column.getColName());
if (ctrl2) {
ctrl2.value = '';
}
}
}
}

self._ZEN_Component_tablePane_resizeHeaders = function() {
if (!zenIsIE) return;
if (navigator.userAgent.indexOf("Trident/4.")>=0) {
var tDiv = this.getEnclosingDiv();
var revertedAuto=0;
if (tDiv.forcedWidth==tDiv.currentStyle.width) {
tDiv.style.width="auto";
revertedAuto = 1;
}
if (tDiv.currentStyle.width=="auto" || revertedAuto) {
var tHeadDiv = this.findChildByClass(tDiv,"tpTable");
var tHead=this.findChildByClass(tHeadDiv,"tpHead");
var tRow=this.findChildByTag(tHead,"TR");
var zeroWidth=0;
var percentWidth=0;
if (tRow && tRow.firstChild) {
var cWidth=[];
for (var k=tRow.firstChild;k!=null;k=k.nextSibling) {
if (k.nodeType==1 && k.tagName=="TH") {
var o = {}
o.node = k;
if (!revertedAuto) o.ow = this.getInsideWidth(k);
o.sw = k.currentStyle.width;
o.txt = k.innerText;
if (o.ow<=0 && !revertedAuto) zeroWidth++;
if (o.sw && (o.sw.indexOf('%')>0 || o.sw=='auto')) percentWidth++;
cWidth.push(o);
}
}
}
if (zeroWidth>=percentWidth) { // Dealing with columncollapse situation
var wideGroup = tDiv.parentNode;
var sparePixels = 0;
var baseWidth = tDiv.offsetWidth;
while (wideGroup!=document.body && wideGroup.parentNode && sparePixels==0) {
if (wideGroup.offsetWidth>baseWidth) {
var totalUsed = 0;
for (var k=wideGroup.firstChild;k!=null;k=k.nextSibling) {
if (k.nodeType==1) totalUsed+=k.offsetWidth;
}
sparePixels = wideGroup.offsetWidth-totalUsed;
}
if (sparePixels==0) wideGroup = wideGroup.parentNode;
}
if (sparePixels>0) {
var newWidth = tDiv.offsetWidth+sparePixels+"px";
tDiv.style.width=newWidth;
tDiv.forcedWidth=newWidth;
}
}
}
}
if (navigator.userAgent.indexOf("Trident/4.")>=0 || navigator.userAgent.indexOf("MSIE 7")>=0) {
var tDiv=this.getEnclosingDiv();
var tHeadDiv = this.findChildByClass(tDiv,"tpTable");
var tBodyDiv = this.findChildByClass(tDiv,"tpBodyFixed");
if (tHeadDiv==null || tBodyDiv==null) return;
var tEmpty = this.findDescendantByClass(tBodyDiv,"tpNoResults");
if (!tEmpty) {
var tBody=this.findChildByTag(this.findChildByClass(tBodyDiv,"tpTable"),"TBODY");
var tRow=this.findChildByTag(tBody,"TR");
if (tRow) {
var kid = [];
for (var k=tRow.firstChild;k!=null;k=k.nextSibling) {
if (k.nodeType==1 && k.tagName=="TD") {
var o = {};
var csw = k.currentStyle.width;
var ow = k.offsetWidth;
o.csw = csw;
o.ow = ow;
o.k = k;
o.p=false;
k.minWidth=csw;
if (ow>0) k.width=ow+"px";
kid.push(o);
}
}
}
}
}
if (zenIsIE && this.fixedHeaders && (!zenIsHTML5)) {
var tDiv=this.getEnclosingDiv();
var tHeadDiv = this.findChildByClass(tDiv,"tpTable");
var tBodyDiv = this.findChildByClass(tDiv,"tpBodyFixed");
if (tHeadDiv==null || tBodyDiv==null) return;
tHeadDiv.style.tableLayout="fixed";
tHeadDiv.style.width="";
var tEmpty = this.findDescendantByClass(tBodyDiv,"tpNoResults");
var tOdds = this.findDescendantByClass(tBodyDiv,"tpOdd");
if (!tOdds) {
var tRows = this.findDescendantByClass(tBodyDiv,"tpRow");
if (!tRows) {
var tEvens = this.findDescendantByClass(tBodyDiv,"tpEven");
if (!tEvens) {
var tSelects = this.findDescendantByClass(tBodyDiv,"tpSelected");
if (!tSelects) {
tEmpty = true;
}
}
}
}
if (tEmpty) {
var tmp=tBodyDiv.clientWidth;
tHeadDiv.style.width=tmp +"px";
return;
}
var tHead=this.findChildByClass(tHeadDiv,"tpHead");
var tBody=this.findChildByTag(this.findChildByClass(tBodyDiv,"tpTable"),"TBODY");
var tRow=this.findChildByTag(tBody,"TR");
if (tRow==null) return; //PL 64254
tHeadDiv.style.width="0";
var tmp=tHeadDiv.currentStyle.width;
var scrolledBody=false;
var gap = tBodyDiv.offsetWidth-tBodyDiv.clientWidth;
if (tBodyDiv.clientWidth>0 && gap>10) scrolledBody=true;
var cWidth=[];
for (var k=tRow.firstChild;k!=null;k=k.nextSibling) {
if (k.nodeType==1 && k.tagName=="TD") {
cWidth.push(this.getInsideWidth(k));
if (k.offsetWidth<0) return; //PL 64254C
if (k.className=="tpNoResults") return; //PL 64254B
}
}
for (k=tHead.firstChild;k!=null;k=k.nextSibling) {
if (k.nodeType==1 && k.tagName=="TR") {
var idx=0;
for (var n=k.firstChild;n!=null;n=n.nextSibling) {
if (n.nodeType==1 && n.tagName=="TH") {
if (idx<cWidth.length) {
var w=cWidth[idx++];
if (w<=0) {
n.style.display="none";
}
else {
n.style.display="block";
n.style.width = w+"px";
n.width=n.style.width;
n.minWidth=n.style.width;
}
}
else {
if (scrolledBody) {
var pad = n.offsetWidth-n.clientWidth;
n.style.width=(gap + pad - 2)+"px";
n.style.display="block";
}
else {
n.style.display="none";
}
}
n.style.overflow='hidden';
}
}
}
}
}
}

self._ZEN_Component_tablePane_setColumnFilters = function(state) {
for (var n in state) {
this.setFilterValue(n,state[n]);
}
}

self._ZEN_Component_tablePane_setDateFilter = function(group) {
var value = group.getValue();
var seed = group.seed.split(':');
var cname = seed[0];
var index = seed[1];
var ctrl = this.findElement("filter"+index+"_" + cname);
if (ctrl) {
ctrl.value = value;
this.filterChanged(cname,true);
}
}

self._ZEN_Component_tablePane_setFilterValue = function(cname,value) {
for (var n in this.columns) {
var column = this.columns[n];
if (cname == column.getColName()) {
column.filterValue = value;
if ('' != column.filterType) {
var multi = this.findElement("filter2_" + column.getColName());
var s = value.split(',');
var n = 1;
while((ctrl = this.findElement("filter"+n+"_" + column.getColName())) != null) {
ctrl.value = !multi ? value : (s[n-1] ? s[n-1] : '');
n++;
}
}
break;
}
}
}

self._ZEN_Component_tablePane_setOffsetWidth = function(element,width) {
element.style.width=width+"px";
var delta = element.offsetWidth-width;
var newSize = width-delta;
if (newSize<1) newSize=1;
element.style.width= newSize+"px";
}

self._ZEN_Component_tablePane_setProperty = function(property,value,value2) {
switch(property) {
case 'parameters':
if ('' != value) {
value = value - 1;
if (this.parameters[value]) {
if (this.parameters[value].value != value2) {
this.parameters[value].value = value2;
this.executeQuery();
}
}
}
break;
case 'currPage':
this.gotoPage(value);
break;
case 'pageSize':
if (value != this.pageSize) {
this.currPage = 1; // go back to start
this.pageSize = value;
this.refreshTable();
}
break;
case 'nowrap':
case 'showValueInTooltip':
value = value ? true : false;
if (value != this[property]) {
this[property] = value;
this.refreshTable();
}
break;
case 'headerLayout':
case 'fixedHeaders':
case 'bodyHeight':
case 'extraColumnWidth':
case 'caption':
case 'useKeys':
if (value != this[property]) {
this[property] = value;
this.refreshTable();
}
break;
case 'showFilters':
this.showColumnFilters(value ? true : false);
break;
case 'filtersDisabled':
this.disableColumnFilters(value ? true : false);
break;
case 'useSnapshot':
value = value ? true : false;
if (value != this.useSnapshot) {
this.useSnapshot = value;
this.pageSize = this.useSnapshot ? this.pageSize : 0;
this.refreshTable();
}
break;
default:
return this.invokeSuper('setProperty',arguments);
break;
}
return true;
}

self._ZEN_Component_tablePane_showColumnFilters = function(flag) {
this.showFilters = flag;
var tr = this.findElement('filterRow');
if (tr) {
tr.style.display = flag ? '' : 'none';
}
}

self._ZEN_Component_tablePane_showDateSelector = function(cname,index,type,minDate,maxDate) {
if (this.filtersDisabled) return false;
var ctrl = this.findElement("filter"+index+"_" + cname);
zenASSERT(ctrl,'Unable to find filter element',arguments);
var value = ctrl.value;
var top,left;
var top = zenGetTop(ctrl) + ctrl.offsetHeight - zenGetTopScroll(ctrl);
var left = zenGetLeft(ctrl) - zenGetLeftScroll(ctrl);
top += zenGetPageScrollTop();
left += zenGetPageScrollLeft();
var group = zenPage.createComponent('modalGroup');
group.setProperty('seed',cname+":"+index);
group.setProperty('onaction','zenPage.getComponent('+this.index+').setDateFilter(group);');
if ('datetime' == type) {
var calParms = new Object();
if ('' != minDate) {
var minD = zenParseDate(minDate);
if (-1 != minD) {
var year = parseInt(minD.substr(0,4),10);
calParms['minDate'] =minDate;
calParms['startYear'] = year;
}
}
if ('' != maxDate) {
var maxD = zenParseDate(maxDate);
if (-1 != maxD) {
var year = parseInt(maxD.substr(0,4),10);
calParms['maxDate'] = maxDate;
calParms['endYear'] = year;
}
}
calParms['showTime'] = true;
group.show('','calendar',value,top,left,null,null,calParms);
}
else {
group.show('','calendar',value,top,left);
}
}

self._ZEN_Component_tablePane_tpKeyDownHandler = function(evt) {
evt = evt ? evt : window.event;
var ret = true;
var row = this.selectedIndex;
var rows = (''!=this.rowCount) ? parseInt(this.rowCount.split(' ')[0]) : '';
var rowcount = ((''!=rows)&&('' == this.pageSize || 0 == this.pageSize)) ? rows : this.pageSize;
if ((''!=rows)&&(rowcount > rows)) {
rowcount = rows;
}
if ('' != this.onkeypress) {
ret = zenInvokeCallbackMethod(this.onkeypress,this,'onkeypress','evt',evt);
}
if (!ret) {
return false;
}
switch(evt.keyCode) {
case zenENTER:
break;
case zenPAGEUP:
this.previousPage(true);
break;
case zenPAGEDN:
this.nextPage(true);
break;
case zenEND:
if (evt.ctrlKey) {
this.lastPage();
}
else {
this.selectRow(rowcount-1,true,'keypress');
}
break;
case zenHOME:
ret = false;
if (evt.ctrlKey) {
this.firstPage();
}
else {
this.selectRow(0,true,'keypress');
}
break;
case zenUP:
ret = false;
if (row > 0) {
this.selectRow(row-1,true,'keypress');
}
break;
case zenDOWN:
ret = false;
if (row < rowcount-1) {
this.selectRow(row+1,true,'keypress');
}
break;
case zenDELETE:
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

self._ZEN_Component_tablePane_tpKeyPressHandler = function(evt) {
evt = evt ? evt : window.event;
var ret = true;
if ('' != this.onkeypress) {
ret = zenInvokeCallbackMethod(this.onkeypress,this,'onkeypress','evt',evt);
}
return ret;
}

self._ZEN_Component_tablePane_FetchRowFromSnapshot = function(pIndex,pID,pRow,pCurrColumn,pSortOrder) {
	return zenClassMethod(this,'FetchRowFromSnapshot','L,L,L,L,L','BOOLEAN',arguments);
}

self._ZEN_Component_tablePane_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_tablePane__Loader = function() {
	zenLoadClass('_ZEN_Component_simpleTablePane');
	_ZEN_Component_tablePane.prototype = zenCreate('_ZEN_Component_simpleTablePane',-1);
	var p = _ZEN_Component_tablePane.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_tablePane;
	p.superClass = ('undefined' == typeof _ZEN_Component_simpleTablePane) ? zenMaster._ZEN_Component_simpleTablePane.prototype:_ZEN_Component_simpleTablePane.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.tablePane';
	p._type = 'tablePane';
	p.serialize = _ZEN_Component_tablePane_serialize;
	p.getSettings = _ZEN_Component_tablePane_getSettings;
	p.FetchRowFromSnapshot = _ZEN_Component_tablePane_FetchRowFromSnapshot;
	p.ReallyRefreshContents = _ZEN_Component_tablePane_ReallyRefreshContents;
	p.addNavigator = _ZEN_Component_tablePane_addNavigator;
	p.anchorDiv = _ZEN_Component_tablePane_anchorDiv;
	p.appendColumn = _ZEN_Component_tablePane_appendColumn;
	p.applyFilters = _ZEN_Component_tablePane_applyFilters;
	p.disableColumnFilters = _ZEN_Component_tablePane_disableColumnFilters;
	p.executeQuery = _ZEN_Component_tablePane_executeQuery;
	p.filterChanged = _ZEN_Component_tablePane_filterChanged;
	p.filterKeyPressed = _ZEN_Component_tablePane_filterKeyPressed;
	p.findChildByClass = _ZEN_Component_tablePane_findChildByClass;
	p.findChildByTag = _ZEN_Component_tablePane_findChildByTag;
	p.findDescendantByClass = _ZEN_Component_tablePane_findDescendantByClass;
	p.firstPage = _ZEN_Component_tablePane_firstPage;
	p.focus = _ZEN_Component_tablePane_focus;
	p.getColumnFilters = _ZEN_Component_tablePane_getColumnFilters;
	p.getFilterValue = _ZEN_Component_tablePane_getFilterValue;
	p.getInsideWidth = _ZEN_Component_tablePane_getInsideWidth;
	p.getPageCount = _ZEN_Component_tablePane_getPageCount;
	p.getRenderedRowData = _ZEN_Component_tablePane_getRenderedRowData;
	p.getRowData = _ZEN_Component_tablePane_getRowData;
	p.gotoPage = _ZEN_Component_tablePane_gotoPage;
	p.headerClick = _ZEN_Component_tablePane_headerClick;
	p.lastPage = _ZEN_Component_tablePane_lastPage;
	p.launchConfirmDialog = _ZEN_Component_tablePane_launchConfirmDialog;
	p.nextPage = _ZEN_Component_tablePane_nextPage;
	p.onDisplayHandler = _ZEN_Component_tablePane_onDisplayHandler;
	p.onPopupAction = _ZEN_Component_tablePane_onPopupAction;
	p.onloadHandler = _ZEN_Component_tablePane_onloadHandler;
	p.packRows = _ZEN_Component_tablePane_packRows;
	p.packRowsIE = _ZEN_Component_tablePane_packRowsIE;
	p.previousPage = _ZEN_Component_tablePane_previousPage;
	p.refreshTable = _ZEN_Component_tablePane_refreshTable;
	p.removeNavigator = _ZEN_Component_tablePane_removeNavigator;
	p.resetColumnFilters = _ZEN_Component_tablePane_resetColumnFilters;
	p.resizeHeaders = _ZEN_Component_tablePane_resizeHeaders;
	p.setColumnFilters = _ZEN_Component_tablePane_setColumnFilters;
	p.setDateFilter = _ZEN_Component_tablePane_setDateFilter;
	p.setFilterValue = _ZEN_Component_tablePane_setFilterValue;
	p.setOffsetWidth = _ZEN_Component_tablePane_setOffsetWidth;
	p.setProperty = _ZEN_Component_tablePane_setProperty;
	p.showColumnFilters = _ZEN_Component_tablePane_showColumnFilters;
	p.showDateSelector = _ZEN_Component_tablePane_showDateSelector;
	p.tpKeyDownHandler = _ZEN_Component_tablePane_tpKeyDownHandler;
	p.tpKeyPressHandler = _ZEN_Component_tablePane_tpKeyPressHandler;
}

self._zenClassIdx['tableNavigator'] = '_ZEN_Component_tableNavigator';
self._ZEN_Component_tableNavigator = function(index,id) {
	if (index>=0) {_ZEN_Component_tableNavigator__init(this,index,id);}
}

self._ZEN_Component_tableNavigator__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_composite__init) ?zenMaster._ZEN_Component_composite__init(o,index,id):_ZEN_Component_composite__init(o,index,id);
	o.msgFirstPage = '';
	o.msgLastPage = '';
	o.msgNextPage = '';
	o.msgOf = '';
	o.msgPage = '';
	o.msgPreviousPage = '';
	o.tablePaneId = '';
}
function _ZEN_Component_tableNavigator_serialize(set,s)
{
	var o = this;s[0]='2161216579';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.cellAlign;s[9]=o.cellSize;s[10]=o.cellStyle;s[11]=o.cellVAlign;s[12]=set.serializeList(o,o.children,true,'children');s[13]=(o.childrenCreated?1:0);s[14]=o.containerStyle;s[15]=(o.disabled?1:0);s[16]=(o.dragEnabled?1:0);s[17]=(o.dropEnabled?1:0);s[18]=(o.dynamic?1:0);s[19]=o.enclosingClass;s[20]=o.enclosingStyle;s[21]=o.error;s[22]=o.groupClass;s[23]=o.groupStyle;s[24]=o.height;s[25]=(o.hidden?1:0);s[26]=o.hint;s[27]=o.hintClass;s[28]=o.hintStyle;s[29]=o.label;s[30]=o.labelClass;s[31]=o.labelDisabledClass;s[32]=o.labelPosition;s[33]=o.labelStyle;s[34]=o.layout;s[35]=o.msgFirstPage;s[36]=o.msgLastPage;s[37]=o.msgNextPage;s[38]=o.msgOf;s[39]=o.msgPage;s[40]=o.msgPreviousPage;s[41]=o.onafterdrag;s[42]=o.onbeforedrag;s[43]=o.onclick;s[44]=o.ondrag;s[45]=o.ondrop;s[46]=o.onhide;s[47]=o.onrefresh;s[48]=o.onshow;s[49]=o.onupdate;s[50]=o.overlayMode;s[51]=o.renderFlag;s[52]=(o.showLabel?1:0);s[53]=o.slice;s[54]=o.tablePaneId;s[55]=o.title;s[56]=o.tuple;s[57]=o.valign;s[58]=(o.visible?1:0);s[59]=o.width;
}
function _ZEN_Component_tableNavigator_getSettings(s)
{
	s['name'] = 'string';
	s['msgFirstPage'] = 'caption';
	s['msgLastPage'] = 'caption';
	s['msgNextPage'] = 'caption';
	s['msgOf'] = 'caption';
	s['msgPage'] = 'caption';
	s['msgPreviousPage'] = 'caption';
	s['tablePaneId'] = 'id';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_tableNavigator_checkEnter = function(event) {
if (zenIsIE) {
var keynum = 0;
if (window.event) {
keynum = event.keyCode;
}
else {
if (event.which) {
keynum = event.which;
}
}
var keychar = String.fromCharCode(keynum);
if ("\r" == keychar) {
event.srcElement.blur();
return false;
}
}
}

self._ZEN_Component_tableNavigator_gotoPage = function(where) {
if (null == this.tablePane) return;
switch(where) {
case 'first':
this.tablePane.firstPage();
break;
case 'last':
this.tablePane.lastPage();
break;
case 'next':
this.tablePane.nextPage();
break;
case 'prev':
this.tablePane.previousPage();
break;
default:
var page = parseInt(where,10);
if (!isNaN(page)) {
this.tablePane.gotoPage(page);
}
break;
}
}

self._ZEN_Component_tableNavigator_renderContents = function() {
this.setProperty('tablePaneId',this.tablePaneId);
}

self._ZEN_Component_tableNavigator_setProperty = function(property,value,value2) {
switch(property) {
case 'tablePaneId':
if (this.tablePane && this.tablePane.removeNavigator) {
this.tablePane.removeNavigator();
this.tablePane = null;
}
this.tablePaneId = value;
if (this.composite) {
this.tablePane = this.composite.getChildById(this.tablePaneId);
}
else {
this.tablePane = zenPage.getComponentById(this.tablePaneId);
}
if (this.tablePane && this.tablePane.addNavigator) {
this.tablePane.addNavigator(this);
}
this.updateState();
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_tableNavigator_updateState = function() {
var btnFirst = this.getChildById('btnFirst');
var btnPrev = this.getChildById('btnPrev');
var btnNext = this.getChildById('btnNext');
var btnLast = this.getChildById('btnLast');
var ctrlPageNo = this.getChildById('pageNo');
var ctrlPageCount = this.getChildById('pageCount');
zenASSERT(ctrlPageNo,'tableNavigator: Unable to find pageNo control',arguments);
var table = this.tablePane;
if (null == table) {
ctrlPageNo.setProperty('disabled',true);
ctrlPageCount.setProperty('disabled',true);
btnFirst.setProperty('disabled',true);
btnPrev.setProperty('disabled',true);
btnNext.setProperty('disabled',true);
btnLast.setProperty('disabled',true);
return;
}
var pageNo = table.getProperty('currPage');
var pageCount = table.getPageCount();
ctrlPageNo.setValue(pageNo);
ctrlPageCount.setValue(pageCount);
ctrlPageNo.setProperty('disabled',pageCount==1);
ctrlPageCount.setProperty('disabled',false);
btnFirst.setProperty('disabled',pageNo==1);
btnPrev.setProperty('disabled',pageNo==1);
btnNext.setProperty('disabled',pageNo==pageCount);
btnLast.setProperty('disabled',pageNo==pageCount);
}

self._ZEN_Component_tableNavigator_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_tableNavigator__Loader = function() {
	zenLoadClass('_ZEN_Component_composite');
	_ZEN_Component_tableNavigator.prototype = zenCreate('_ZEN_Component_composite',-1);
	var p = _ZEN_Component_tableNavigator.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_tableNavigator;
	p.superClass = ('undefined' == typeof _ZEN_Component_composite) ? zenMaster._ZEN_Component_composite.prototype:_ZEN_Component_composite.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.tableNavigator';
	p._type = 'tableNavigator';
	p.serialize = _ZEN_Component_tableNavigator_serialize;
	p.getSettings = _ZEN_Component_tableNavigator_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_tableNavigator_ReallyRefreshContents;
	p.checkEnter = _ZEN_Component_tableNavigator_checkEnter;
	p.gotoPage = _ZEN_Component_tableNavigator_gotoPage;
	p.renderContents = _ZEN_Component_tableNavigator_renderContents;
	p.setProperty = _ZEN_Component_tableNavigator_setProperty;
	p.updateState = _ZEN_Component_tableNavigator_updateState;
}
/* EOF */