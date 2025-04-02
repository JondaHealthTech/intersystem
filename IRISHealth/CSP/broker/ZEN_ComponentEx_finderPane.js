/*** Zen Module: ZEN_ComponentEx_finderPane ***/

self._zenClassIdx['finderPane'] = '_ZEN_ComponentEx_finderPane';
self._ZEN_ComponentEx_finderPane = function(index,id) {
	if (index>=0) {_ZEN_ComponentEx_finderPane__init(this,index,id);}
}

self._ZEN_ComponentEx_finderPane__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.animate = true;
	o.caption = '';
	o.columnWidth = '';
	o.folderIcon = 'portal\/folder_48.gif';
	o.hilightTop = false;
	o.itemIcon = 'portal\/document_48.gif';
	o.listColumns = '';
	o.msgNoPriv = 'You do not have privilege to view this page.';
	o.oncancel = '';
	o.ondblclick = '';
	o.ondrawdetails = '';
	o.ondrawempty = '';
	o.ondrawitem = '';
	o.ongetdata = '';
	o.ongeticon = '';
	o.onlazyload = '';
	o.onselectitem = '';
	o.parameters = new Object();
	o.selectFirstOnIconDrillDown = true;
	o.selectedList = '';
	o.upIcon = 'portal\/up_48.gif';
	o.viewType = 'columns';
}
function _ZEN_ComponentEx_finderPane_serialize(set,s)
{
	var o = this;s[0]='3879434117';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=(o.animate?1:0);s[8]=o.aux;s[9]=o.caption;s[10]=o.columnWidth;s[11]=o.containerStyle;s[12]=(o.dragEnabled?1:0);s[13]=(o.dropEnabled?1:0);s[14]=(o.dynamic?1:0);s[15]=o.enclosingClass;s[16]=o.enclosingStyle;s[17]=o.error;s[18]=o.folderIcon;s[19]=o.height;s[20]=(o.hidden?1:0);s[21]=(o.hilightTop?1:0);s[22]=o.hint;s[23]=o.hintClass;s[24]=o.hintStyle;s[25]=o.itemIcon;s[26]=o.label;s[27]=o.labelClass;s[28]=o.labelDisabledClass;s[29]=o.labelStyle;s[30]=o.listColumns;s[31]=o.msgNoPriv;s[32]=o.onafterdrag;s[33]=o.onbeforedrag;s[34]=o.oncancel;s[35]=o.ondblclick;s[36]=o.ondrag;s[37]=o.ondrawdetails;s[38]=o.ondrawempty;s[39]=o.ondrawitem;s[40]=o.ondrop;s[41]=o.ongetdata;s[42]=o.ongeticon;s[43]=o.onhide;s[44]=o.onlazyload;s[45]=o.onrefresh;s[46]=o.onselectitem;s[47]=o.onshow;s[48]=o.onupdate;s[49]=o.overlayMode;s[50]=set.serializeArray(o,o.parameters,true,'parameters');s[51]=o.renderFlag;s[52]=(o.selectFirstOnIconDrillDown?1:0);s[53]=o.selectedList;s[54]=(o.showLabel?1:0);s[55]=o.slice;s[56]=o.title;s[57]=o.tuple;s[58]=o.upIcon;s[59]=o.valign;s[60]=o.viewType;s[61]=(o.visible?1:0);s[62]=o.width;
}
function _ZEN_ComponentEx_finderPane_getSettings(s)
{
	s['name'] = 'string';
	s['animate'] = 'boolean';
	s['caption'] = 'caption';
	s['columnWidth'] = 'length';
	s['folderIcon'] = 'uri';
	s['hilightTop'] = 'boolean';
	s['itemIcon'] = 'uri';
	s['listColumns'] = 'csv';
	s['msgNoPriv'] = 'caption';
	s['oncancel'] = 'eventHandler';
	s['ondblclick'] = 'eventHandler';
	s['ondrawdetails'] = 'eventHandler';
	s['ondrawempty'] = 'eventHandler';
	s['ondrawitem'] = 'eventHandler';
	s['ongetdata'] = 'eventHandler';
	s['ongeticon'] = 'eventHandler';
	s['onlazyload'] = 'eventHandler';
	s['onselectitem'] = 'eventHandler';
	s['parameters'] = 'string';
	s['selectFirstOnIconDrillDown'] = 'boolean';
	s['selectedList'] = 'csv';
	s['upIcon'] = 'uri';
	s['viewType'] = 'enum:icons,list,columns';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_ComponentEx_finderPane_animateScroll = function(delta,which) {
delete this._timerId;
var enc = this.getEnclosingDiv();
if (Math.abs(enc.scrollLeft - this._scrollTarget) < 10) {
enc.scrollLeft = this._scrollTarget;
if ('left' == which) {
this.render();
}
}
else {
enc.scrollLeft = enc.scrollLeft + parseFloat(delta);
this._timerId = self.setTimeout("zenPage.getComponent("+this.index+").animateScroll("+delta+",'"+which+"')",20);
}
}

self._ZEN_ComponentEx_finderPane_cancelEvent = function(evt) {
evt ? evt : window.event
evt.cancelBubble = true;
if (evt.stopPropagation) {
evt.stopPropagation();
}
return true;
}

self._ZEN_ComponentEx_finderPane_getColumnsViewContent = function(graph) {
var html = new Array();
var selectedList = this.selectedList.split(',');
var wid = '';
var cwid = parseFloat(this.columnWidth);
cwid = (isNaN(cwid)||cwid<=0) ? 200 : cwid;
wid = 'style="width:' + ((selectedList.length+1)*cwid) + 'px;"';
html[html.length] = '<div '+wid+' id="'+this.makeId('wrapper')+'" class="finderColumnWrapper">';
for (var n = 0; n <= selectedList.length; n++) {
html[html.length] = this.getFinderColumnHTML(graph,n,selectedList);
}
html[html.length] = '</div>';
return html.join('');
}

self._ZEN_ComponentEx_finderPane_getFinderColumnHTML = function(graph,column,selectedList) {
var msgToolTip = $$$Text("Click this item for additional options or details.","%ZEN");
var spanToolTip = $$$Text("Navigate to this item.","%ZEN");
var list = '';
var array = graph.children;
var detailItem = null;
for (var c = 0; c < column; c++) {
list = list + (''==list?'':',') + selectedList[c];
var child = array[selectedList[c]];
array = (child && child.children) ? child.children : null;
if (array == null) {
detailItem = child;
break;
}
}
if (''==this.ondrawdetails && (!array || array.length==0)) {
return;
}
var wid = '';
var cwid = parseFloat(this.columnWidth);
cwid = (isNaN(cwid)||cwid<=0) ? 150 : cwid;
wid = 'style="width:'+cwid+'px;left:'+(column*(cwid+1))+'px;"';
var click = '';
var dblclick = '';
var keypress = '';
var spanclick = '';
var html = new Array();
if (array && array.length>0) {
html[html.length] = '<div class="finderColumn" id="'+this.makeId('fc_'+column)+'" '+wid+'>';
for (var n = 0; n < array.length; n++) {
var item = array[n];
var selected = (''!=selectedList[column] && selectedList[column]==n);
var hasKids = item.children && item.children.length > 0;
var list2 = list + (''==list?'':',') + n;
var cls = ((column+n)%2) ? 'finderItem' : 'finderItemOdd';
cls = selected ? 'finderItemSelected' : cls;
var enabled = ('undefined' == typeof item.disabled || 0==item.disabled);
if (enabled) {
click = 'onclick="return false;" onmousedown="return zenPage.getComponent('+this.index+').itemClickHandler(event,\''+list2+'\');";'
dblclick = ' ondblclick="return zenPage.getComponent('+this.index+').itemDblClickHandler(event,\''+list2+'\');";'
keypress = ' onkeydown="return zenPage.getComponent('+this.index+').itemKeyPressHandler(event,\''+list2+'\');";'
}
else {
click = 'onclick="return false;";'
dblclick = '';
keypress = '';
cls = selected ? 'finderItemDisabled' : 'finderItemDisabled';
}
var style = '';
if (item.style && '' != item.style) {
style = ' style="'+item.style+'" ';
}
html[html.length] = '<div class="'+cls+'"'+style+'>';
var tip = '';
if (item.title && '' != item.title) {
tip = 'title="'+item.title+'" ';
}
else {
tip = 'title="'+msgToolTip+'" ';
}
var aid = 'id="'+this.makeId('a_'+list2)+'" ';
html[html.length] = '<a '+aid+tip+(enabled?'href="#" ':'')+click +dblclick+keypress+ '>';
var usercode = '';
if (this.ondrawitem) {
item.column = c;
usercode = zenInvokeCallbackMethod(this.ondrawitem,this,'ondrawitem','item',item);
delete item.column;
}
if (usercode && '' != usercode) {
html[html.length] = usercode;
}
else {
if (hasKids) {
html[html.length] = zenEscapeHTMLSafe(item.name);
html[html.length] = '&#160;&#187;';
}
else {
var lbl = zenEscapeHTML(item.caption ? item.caption : item.name);
if (enabled) {
spanclick = ' onclick="zenPage.getComponent('+this.index+').itemDblClickHandler(event,\''+list2+'\');return true;";'
html[html.length] = '<span title="'+spanToolTip+'" onmousedown="return zenPage.getComponent('+this.index+').cancelEvent(event);" '+spanclick+' onmouseover="this.style.textDecoration=\'underline\';" onmouseout="this.style.textDecoration=\'none\';">' + lbl + '</span>';
}
else {
html[html.length] = lbl;
}
}
}
html[html.length] = '</a></div>';
}
}
else {
html[html.length] = '<div class="finderDetailColumn" id="'+this.makeId('fc_'+column)+'" '+wid+'>';
if (selectedList.length > (column+1)) {
selectedList.length = column;
}
if (1 == column && null == detailItem) {
detailItem = (''!=selectedList[0]) ? graph.children[selectedList[0]] : null;
}
var item = detailItem;
var usercode = zenInvokeCallbackMethod(this.ondrawdetails,this,'ondrawdetails','item',item,'finder',this,'index',list2);
html[html.length] = usercode;
}
html[html.length] = '<br/>';
html[html.length] = '</div>';
return html.join('');
}

self._ZEN_ComponentEx_finderPane_getIconsViewContent = function(graph) {
var html = new Array();
var array = graph.children;
var baseIdx = '';
var hasUp = false;
if ('' != this.selectedList) {
var t = this.selectedList.split(',');
for (var n = 0; n < t.length - 1; n++) {
var child = array[t[n]];
if (child && child.children) {
hasUp = true;
baseIdx = baseIdx + ((''==baseIdx)?'':',') + t[n];
array = child.children;
}
else {
break;
}
}
}
html[html.length] = '<div class="finderIconsWrapper">';
if (hasUp) {
var title = $$$Text('Go up one level','%ZEN');
var btnUp = $$$Text('Up','%ZEN');
var imgsrc = this.upIcon;
html[html.length] = '<a class="finderIconItem" title="'+title+'" href="#" onclick="zenPage.getComponent('+this.index+').iconGoUp(event);">';
html[html.length] = '<img src="'+imgsrc+'" /><br/>' + btnUp;
html[html.length] = '</a>';
}
for (var n = 0; n < array.length; n++) {
var idx = baseIdx + ((''==baseIdx)?'':',') + n;
var item = array[n];
var hasKids = item.children && item.children.length>0;
var title = item.title ? item.title : '';
var imgsrc = item.icon ? item.icon : (hasKids ? this.folderIcon : this.itemIcon);
var enabled = ('undefined' == typeof item.disabled || 0==item.disabled);
if ('' != this.ongeticon) {
var usericon = zenInvokeCallbackMethod(this.ongeticon,this,'ongeticon','item',item,'finder',this,'index',idx);
if ('' != usericon) {
imgsrc = usericon;
}
}
var cls = (idx == this.selectedList) ? 'finderIconItemSelected' : 'finderIconItem';
if (item.name) {
var name = zenEscapeHTML(item.caption ? item.caption : item.name);
if (enabled) {
html[html.length] = '<a id="'+this.makeId('icon_' + idx)+'" class="'+cls+'" title="'+title+'" href="#" onclick="return false;" onmousedown="zenPage.getComponent('+this.index+').iconClickHandler(event,\''+idx+'\');" ondblclick="zenPage.getComponent('+this.index+').iconDblClickHandler(event,\''+idx+'\');" onkeydown="zenPage.getComponent('+this.index+').iconKeyPressHandler(event,\''+idx+'\');">'+
((''!=imgsrc) ? '<img src="'+imgsrc+'" /><br/>':'') + name;
}
else {
html[html.length] = '<a id="'+this.makeId('icon_' + idx)+'" class="'+cls+'" style="color:#D0D0D0;" title="'+title+'" href="#" onclick="return false;">'+
((''!=imgsrc) ? '<img style="opacity:0.25;" src="'+imgsrc+'" /><br/>':'') + name;
}
if (hasKids) {
html[html.length] = '&#160;&#187;';
}
if ('' != this.ondrawdetails) {
var usercode = zenInvokeCallbackMethod(this.ondrawdetails,this,'ondrawdetails','item',item,'finder',this,'index',idx);
if ('' != usercode) {
html[html.length] = '<div id="'+ this.makeId('detail_'+idx)+'">' + usercode + '&#160;</div>';
}
}
html[html.length] = '</a>';
}
}
html[html.length] = '</div>';
return html.join('');
}

self._ZEN_ComponentEx_finderPane_getItem = function(addr) {
var graph = this.getObjectGraph();
var item = graph;
var s = addr.toString().split(',');
for (var n = 0; n < s.length; n++) {
if (isNaN(s[n])) break;
item = item.children[s[n]];
}
return item;
}

self._ZEN_ComponentEx_finderPane_getListRowsHTML = function(array,selectedList,level,parentIdx) {
var html = new Array();
for (var n = 0; n < array.length; n++) {
var item = array[n];
var idx = (''==parentIdx ? '' : parentIdx+',') + n;
var hasKids = item.children && item.children.length > 0;
var indent = (level == 0) ? '' : '<img height="1px" width="'+(level*16)+'px" src="images/spacer.gif"/>';
var expanded = hasKids && (item._expanded != false);
var enabled = ('undefined' == typeof item.disabled || 0==item.disabled);
var disc = '<img width="16px" src="' + (hasKids ? (expanded ? 'images/arrow1D.gif' : 'images/arrow1R.gif') : 'images/spacer.gif') + '" onmousedown="zenPage.getComponent('+this.index+').rowDisclosureClick(event,\''+idx+'\');"/>';
var cls;
if (this.hilightTop && level == 0) {
cls = 'finderListTopRow';
}
else {
cls = this._rowCount%2 ? 'finderListRowEven' :  'finderListRowOdd';
}
var dcls = cls;
if (idx == this.selectedList) {
cls = 'finderListRowSelected';
}
this._rowCount++;
var tip = '';
if (item.title && '' != item.title) {
tip = 'title="'+item.title+'" ';
}
var name = (item.caption ? item.caption : (item.name ? item.name : ''));
var colProps = null;
if ('' != this.listColumns) {
colProps = this.listColumns.split(',');
var prop = colProps[0];
if ('' != prop) {
name = item[prop];
name = (name ? name : '');
}
}
name = zenEscapeHTML(name);
if (enabled) {
if (hasKids) {
var dbl = 'zenPage.getComponent('+this.index+').rowDisclosureClick(event,\''+idx+'\')';
}
else {
var dbl = 'return zenPage.getComponent('+this.index+').itemDblClickHandler(event,\''+idx+'\');';
}
html[html.length] = '<tr '+tip+'defclass="'+dcls+'" class="'+cls+'" id="'+this.makeId('row_'+idx)+'" onclick="return zenPage.getComponent('+this.index+').rowClickHandler(event,\''+idx+'\');" ondblclick="'+dbl+'">';
}
else {
html[html.length] = '<tr '+tip+'defclass="'+dcls+'" class="'+cls+'" style="color:#D0D0D0;" id="'+this.makeId('row_'+idx)+'" >';
}
html[html.length] = '<td width="10">' + '&#160;' + '</td>';
html[html.length] = '<td width="40%" ' + (hasKids ? 'style="font-weight: bold;"' :'')+ '>' + indent + disc + '&#160;' + '<a class="finderListName" href="#" onclick="return false;" '+(enabled?'':'style="color:#D0D0D0;"')+'>'+name + '</a></td>';
if (colProps) {
for (var c = 1; c < colProps.length; c++) {
var prop = colProps[c]
if ('' != prop) {
var text = item[prop];
text = (text ? text : '');
html[html.length] = '<td>' + text + '&#160;</td>';
}
}
}
if ('' != this.ondrawdetails) {
var usercode = zenInvokeCallbackMethod(this.ondrawdetails,this,'ondrawdetails','item',item,'finder',this,'index',idx);
html[html.length] = '<td  width="20%" id="'+ this.makeId('detail_'+idx)+'">' + usercode + '&#160;</td>';
}
html[html.length] = '</tr>';
if (hasKids && expanded) {
html[html.length] = this.getListRowsHTML(item.children,selectedList,level+1,idx);
}
}
return html.join('');
}

self._ZEN_ComponentEx_finderPane_getListViewContent = function(graph) {
var html = new Array();
var array = graph.children;
var selectedList = this.selectedList.split(',');
this._rowCount = 0;
html[html.length] = '<div class="finderListWrapper" id="'+this.makeId('listWrapper')+'">';
html[html.length] = '<table class="finderListTable" border="0" cellspacing="0" cellpadding="0">';
html[html.length] = this.getListRowsHTML(array,selectedList,0,'');
html[html.length] = '</table>';
html[html.length] = '</div>';
return html.join('');
}

self._ZEN_ComponentEx_finderPane_getObjectGraph = function() {
return zenInvokeCallbackMethod(this.ongetdata,this,'ongetdata');
}

self._ZEN_ComponentEx_finderPane_giveFocus = function(list) {
try {
this._timerId = null;
var el = this.findElement('a_'+list);
if (el) {
el.focus();
}
}
catch(ex) {
}
}

self._ZEN_ComponentEx_finderPane_iconClickHandler = function(evt,list) {
var item = this.getItem(list);
if (item && item.children && item.children.length > 0) {
this.selectedList = list + (this.selectFirstOnIconDrillDown?',0':',-1');
this.render();
return;
}
if (list == this.selectedList) {
return true;
}
if (item && (item.disabled == 1)) {
alert(this.msgNoPriv);
return false;
}
if ('' != this.onselectitem) {
var ret = zenInvokeCallbackMethod(this.onselectitem,this,'onselectitem','item',item);
if (!ret) {
return false;
}
}
this.selectedList = list;
this.render(); // quick way!!
return true;
}

self._ZEN_ComponentEx_finderPane_iconDblClickHandler = function(evt,list) {
var item = this.getItem(list);
if (item.disabled == 1) {
alert(this.msgNoPriv);
return;
}
if (item.children && item.children.length > 0) {
this.selectedList = this.selectedList + ',-1';
this.render();
return;
}
if ('' != this.ondblclick) {
zenInvokeCallbackMethod(this.ondblclick,this,'ondblclick','item',item);
}
return true;
}

self._ZEN_ComponentEx_finderPane_iconGoUp = function(evt) {
if ('' != this.selectedList) {
var t = this.selectedList.split(',');
t.length = t.length - 1;
this.selectedList = t.join(',');
if ('' != this.onselectitem) {
var item = this.getItem(this.selectedList);
var ret = zenInvokeCallbackMethod(this.onselectitem,this,'onselectitem','item',item);
if (!ret) {
return false;
}
}
this.render();
}
return true;
}

self._ZEN_ComponentEx_finderPane_iconKeyPressHandler = function(evt,list) {
evt = evt ? evt : event;
switch(evt.keyCode) {
case zenENTER:
this.iconClickHandler(evt,list);
break;
}
}

self._ZEN_ComponentEx_finderPane_itemClickHandler = function(evt,list) {
if (list == this.selectedList) {
return true;
}
var scroll = new Array();
var s = list.toString().split(',');
for (var n = 0; n < s.length; n++) {
var panel = this.findElement('fc_' + n);
if (panel) {
scroll[n] = panel.scrollTop;
}
}
if ('' != this.onselectitem) {
var item = this.getItem(list);
var ret = zenInvokeCallbackMethod(this.onselectitem,this,'onselectitem','item',item);
if (!ret) {
return false;
}
}
var t = this.selectedList.toString().split(',');
this.selectedList = list;
if (this.animate) {
if (false && s.length > 2 && (s.length < t.length)) {
this.scrollFinder('left');
return true;
}
}
if ((''!=this.onlazyload) && item.children && (item.children.length>0) && (item.children[0]._isEmpty)) {
var newChildren = zenInvokeCallbackMethod(this.onlazyload,this,'onlazyload','item',item);
if (newChildren) {
item.children = newChildren;
}
}
this.render();
for (var n = 0; n < s.length; n++) {
var panel = this.findElement('fc_' + n);
if (panel) {
panel.scrollTop = scroll[n];
}
}
this.scrollFinder('right');
if (this._timerId2) {
self.clearTimeout(this._timerId2);
}
this._timerId2 = self.setTimeout('zenPage.getComponent('+this.index+').giveFocus("'+list+'");',20);
return true;
}

self._ZEN_ComponentEx_finderPane_itemDblClickHandler = function(evt,list) {
evt ? evt : window.event
evt.cancelBubble = true;
if (evt.stopPropagation) {
evt.stopPropagation();
}
if ('' != this.ondblclick) {
var item = this.getItem(list);
zenInvokeCallbackMethod(this.ondblclick,this,'ondblclick','item',item);
}
return true;
}

self._ZEN_ComponentEx_finderPane_itemKeyPressHandler = function(evt,list) {
evt = evt ? evt : event;
switch(evt.keyCode) {
case zenENTER:
var item = this.getItem(list);
if (item.children && item.children.length>0) {
list += ',0';
if (this.getItem(list)) {
this.itemClickHandler(evt,list);
break;
}
}
if (this.viewType == 'columns') {
this.itemDblClickHandler(evt,list);
}
else {
this.itemClickHandler(evt,list);
}
break;
case zenUP:
var t = list.split(',');
var n = parseInt(t[t.length-1]);
if (!isNaN(n) && n>0) {
t[t.length-1] = n - 1;
list = t.join(',');
this.itemClickHandler(evt,list);
}
break;
case zenDOWN:
var t = list.split(',');
var n = parseInt(t[t.length-1]);
if (!isNaN(n)) {
t[t.length-1] = n + 1;
list = t.join(',');
if (this.getItem(list)) {
this.itemClickHandler(evt,list);
}
}
break;
case zenRIGHT:
var item = this.getItem(list);
if (item.children && item.children.length>0) {
list += ',0';
if (this.getItem(list)) {
this.itemClickHandler(evt,list);
}
}
break;
case zenLEFT:
var t = list.split(',');
t.length--;
list = t.join(',');
if (this.getItem(list)) {
this.itemClickHandler(evt,list);
}
break;
case zenESC:
zenInvokeCallbackMethod(this.oncancel,this,'oncancel');
break;
}
return true;
}

self._ZEN_ComponentEx_finderPane_renderContents = function() {
var div = this.getEnclosingDiv();
if (!div) return;
var graph = this.getObjectGraph();
if (null == graph) {
var usercode = '';
if (''!=this.ondrawempty) {
usercode = zenInvokeCallbackMethod(this.ondrawempty,this,'ondrawempty');
}
div.innerHTML = usercode;
return;
}
var html = '';
switch (this.viewType) {
case 'list':
html = this.getListViewContent(graph);
break;
case 'icons':
html = this.getIconsViewContent(graph);
break;
case 'columns':
default:
html = this.getColumnsViewContent(graph);
break;
}
div.innerHTML = html;
}

self._ZEN_ComponentEx_finderPane_rowClickHandler = function(evt,idx) {
if ('' != this.selectedList) {
var tr = this.findElement('row_' + this.selectedList);
if (tr) {
tr.className = tr.getAttribute('defClass');
}
if ('' != this.ondrawdetails) {
var td = this.findElement('detail_' + this.selectedList);
if (td) {
td.innerHTML = zenInvokeCallbackMethod(this.ondrawdetails,this,'ondrawdetails','item',item,'finder',this,'index',idx) + '&nbsp';
}
}
}
if ('' != this.onselectitem) {
var item = this.getItem(idx);
if (item.disabled == 1) {
alert(this.msgNoPriv);
return false;
}
var ret = zenInvokeCallbackMethod(this.onselectitem,this,'onselectitem','item',item);
if (!ret) {
return true;
}
}
this.selectedList = idx;
if ('' != this.selectedList) {
var tr = this.findElement('row_' + this.selectedList);
if (tr) {
tr.className = 'finderListRowSelected';
}
if ('' != this.ondrawdetails) {
var td = this.findElement('detail_' + this.selectedList);
if (td) {
td.innerHTML = zenInvokeCallbackMethod(this.ondrawdetails,this,'ondrawdetails','item',item,'finder',this,'index',idx) + '&nbsp';
}
}
}
return true;
}

self._ZEN_ComponentEx_finderPane_rowDisclosureClick = function(evt,idx) {
var item = this.getItem(idx);
if (item) {
item._expanded = ('undefined' == typeof item._expanded || item._expanded) ? false : true;
var scroll = null;
var wrap = this.findElement('listWrapper');
if (wrap) {
scroll = wrap.scrollTop;
}
this.render();
wrap = this.findElement('listWrapper');
if (wrap && scroll != null) {
wrap.scrollTop = scroll;
}
}
}

self._ZEN_ComponentEx_finderPane_scrollFinder = function(which) {
var enc = this.getEnclosingDiv();
var wrapper = this.findElement('wrapper')
if (enc && wrapper) {
var	scroll;
if ('right' == which) {
scroll = wrapper.offsetWidth - enc.offsetWidth;
}
else {
scroll = 0;
}
scroll = scroll < 0 ? 0 : scroll;
if (enc.scrollLeft == scroll) {
if (scroll != 0) {
this.render();
}
return;
}
if (!this.animate) {
enc.scrollLeft = scroll;
}
else {
if (this._timerId) {
window.clearTimeout(this._timerId);
}
this._scrollTarget = scroll;
var delta = (this._scrollTarget - enc.scrollLeft) / 10;
this._timerId = self.setTimeout("zenPage.getComponent("+this.index+").animateScroll("+delta+",'"+which+"')",20);
}
}
}

self._ZEN_ComponentEx_finderPane_setProperty = function(property,value,value2) {
switch(property) {
case 'columnWidth':
this.columnWidth = value;
this.render();
break;
case 'caption':
this.caption = value;
break;
case 'viewType':
this.setViewType(value);
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_ComponentEx_finderPane_setViewType = function(type) {
if (type != this.viewType) {
switch(type) {
case 'icons':
case 'list':
case 'columns':
this.viewType = type;
this.render();
break;
default:
alert('Finder: unsupported viewType: ' + type);
break;
}
}
}

self._ZEN_ComponentEx_finderPane_update = function(reset) {
if (reset) {
var enc = this.getEnclosingDiv();
enc.scrollTop = 0;
enc.scrollLeft = 0;
this.selectedList = '';
}
this.render();
}

self._ZEN_ComponentEx_finderPane_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_ComponentEx_finderPane__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_ZEN_ComponentEx_finderPane.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _ZEN_ComponentEx_finderPane.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_ComponentEx_finderPane;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.ComponentEx.finderPane';
	p._type = 'finderPane';
	p.serialize = _ZEN_ComponentEx_finderPane_serialize;
	p.getSettings = _ZEN_ComponentEx_finderPane_getSettings;
	p.ReallyRefreshContents = _ZEN_ComponentEx_finderPane_ReallyRefreshContents;
	p.animateScroll = _ZEN_ComponentEx_finderPane_animateScroll;
	p.cancelEvent = _ZEN_ComponentEx_finderPane_cancelEvent;
	p.getColumnsViewContent = _ZEN_ComponentEx_finderPane_getColumnsViewContent;
	p.getFinderColumnHTML = _ZEN_ComponentEx_finderPane_getFinderColumnHTML;
	p.getIconsViewContent = _ZEN_ComponentEx_finderPane_getIconsViewContent;
	p.getItem = _ZEN_ComponentEx_finderPane_getItem;
	p.getListRowsHTML = _ZEN_ComponentEx_finderPane_getListRowsHTML;
	p.getListViewContent = _ZEN_ComponentEx_finderPane_getListViewContent;
	p.getObjectGraph = _ZEN_ComponentEx_finderPane_getObjectGraph;
	p.giveFocus = _ZEN_ComponentEx_finderPane_giveFocus;
	p.iconClickHandler = _ZEN_ComponentEx_finderPane_iconClickHandler;
	p.iconDblClickHandler = _ZEN_ComponentEx_finderPane_iconDblClickHandler;
	p.iconGoUp = _ZEN_ComponentEx_finderPane_iconGoUp;
	p.iconKeyPressHandler = _ZEN_ComponentEx_finderPane_iconKeyPressHandler;
	p.itemClickHandler = _ZEN_ComponentEx_finderPane_itemClickHandler;
	p.itemDblClickHandler = _ZEN_ComponentEx_finderPane_itemDblClickHandler;
	p.itemKeyPressHandler = _ZEN_ComponentEx_finderPane_itemKeyPressHandler;
	p.renderContents = _ZEN_ComponentEx_finderPane_renderContents;
	p.rowClickHandler = _ZEN_ComponentEx_finderPane_rowClickHandler;
	p.rowDisclosureClick = _ZEN_ComponentEx_finderPane_rowDisclosureClick;
	p.scrollFinder = _ZEN_ComponentEx_finderPane_scrollFinder;
	p.setProperty = _ZEN_ComponentEx_finderPane_setProperty;
	p.setViewType = _ZEN_ComponentEx_finderPane_setViewType;
	p.update = _ZEN_ComponentEx_finderPane_update;
}
/* EOF */