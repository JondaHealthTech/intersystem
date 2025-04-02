/*** Zen Module: HS_UI_Component ***/

self._zenClassIdx['http://www.intersystems.com/zen/hs/SMPFinderPane'] = 'HS_UI_Component_SMPFinderPane';
self.HS_UI_Component_SMPFinderPane = function(index,id) {
	if (index>=0) {HS_UI_Component_SMPFinderPane__init(this,index,id);}
}

self.HS_UI_Component_SMPFinderPane__init = function(o,index,id) {
	('undefined' == typeof _ZEN_ComponentEx_finderPane__init) ?zenMaster._ZEN_ComponentEx_finderPane__init(o,index,id):_ZEN_ComponentEx_finderPane__init(o,index,id);
	o.msgNoPriv = 'You do not have privilege to view this page.';
	o.versionNumber = '20241';
}
function HS_UI_Component_SMPFinderPane_serialize(set,s)
{
	var o = this;s[0]='606656506';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=(o.animate?1:0);s[8]=o.aux;s[9]=o.caption;s[10]=o.columnWidth;s[11]=o.containerStyle;s[12]=(o.dragEnabled?1:0);s[13]=(o.dropEnabled?1:0);s[14]=(o.dynamic?1:0);s[15]=o.enclosingClass;s[16]=o.enclosingStyle;s[17]=o.error;s[18]=o.folderIcon;s[19]=o.height;s[20]=(o.hidden?1:0);s[21]=(o.hilightTop?1:0);s[22]=o.hint;s[23]=o.hintClass;s[24]=o.hintStyle;s[25]=o.itemIcon;s[26]=o.label;s[27]=o.labelClass;s[28]=o.labelDisabledClass;s[29]=o.labelStyle;s[30]=o.listColumns;s[31]=o.msgNoPriv;s[32]=o.onafterdrag;s[33]=o.onbeforedrag;s[34]=o.oncancel;s[35]=o.ondblclick;s[36]=o.ondrag;s[37]=o.ondrawdetails;s[38]=o.ondrawempty;s[39]=o.ondrawitem;s[40]=o.ondrop;s[41]=o.ongetdata;s[42]=o.ongeticon;s[43]=o.onhide;s[44]=o.onlazyload;s[45]=o.onrefresh;s[46]=o.onselectitem;s[47]=o.onshow;s[48]=o.onupdate;s[49]=o.overlayMode;s[50]=set.serializeArray(o,o.parameters,true,'parameters');s[51]=o.renderFlag;s[52]=(o.selectFirstOnIconDrillDown?1:0);s[53]=o.selectedList;s[54]=(o.showLabel?1:0);s[55]=o.slice;s[56]=o.title;s[57]=o.tuple;s[58]=o.upIcon;s[59]=o.valign;s[60]=o.versionNumber;s[61]=o.viewType;s[62]=(o.visible?1:0);s[63]=o.width;
}
function HS_UI_Component_SMPFinderPane_getSettings(s)
{
	s['name'] = 'string';
	s['versionNumber'] = 'integer';
	this.invokeSuper('getSettings',arguments);
}

self.HS_UI_Component_SMPFinderPane_getFinderColumnHTML = function(graph,column,selectedList) {
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
if ((this.versionNumber > 20191)) {
html[html.length] = item.name;
html[html.length] = '<div style="width:5%;float:right;"><img src="portal/images/icon-arrow-blue-right.png" width="5" height="10"/></div>';
} else {
html[html.length] = item.name + ' &#187;';
}
}
else {
var lbl = item.caption ? item.caption : item.name;
if (enabled) {
spanclick = ' onclick="zenPage.getComponent('+this.index+').itemDblClickHandler(event,\''+list2+'\');return true;";'
displayText = '<span title="'+spanToolTip+'" onmousedown="return zenPage.getComponent('+this.index+').cancelEvent(event);" '+spanclick+' onmouseover="this.style.textDecoration=\'underline\';" onmouseout="this.style.textDecoration=\'none\';">' + lbl + '</span>';
html[html.length] = displayText;
if ((this.versionNumber > 20191)) {
html[html.length] = '<div style="width:5%;float:right;"><img src="portal/images/icon_info.png" width="10" height="10"/></div>';
}
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

self.HS_UI_Component_SMPFinderPane_getListRowsHTML = function(array,selectedList,level,parentIdx) {
var html = new Array();
for (var n = 0; n < array.length; n++) {
var item = array[n];
var idx = (''==parentIdx ? '' : parentIdx+',') + n;
var hasKids = item.children && item.children.length > 0;
var indent = (level == 0) ? '' : '<img height="1px" width="'+(level*16)+'px" src="images/spacer.gif"/>';
var expanded = hasKids && (item._expanded != false);
var enabled = ('undefined' == typeof item.disabled || 0==item.disabled);
var disc = '<img width="8" height="6" src="' + (hasKids ? (expanded ? 'images/icon-arrow-blue-down.png' : 'images/icon-arrow-blue-right.png') : 'images/spacer.gif') + '" onmousedown="zenPage.getComponent('+this.index+').rowDisclosureClick(event,\''+idx+'\');"/>';
var cls;
if (this.hilightTop && level == 0) {
cls = 'finderListTopRow';
}
else {
cls = 'finderListRowEven';
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
html[html.length] = '<td width="10">' + '&#160;&#160;' + '</td>';
if (hasKids) {
var cls = (enabled?'finderListCategory':'finderListDisabled');
html[html.length] = '<td width="40%" class="'+cls+'">' + indent + disc + '&#160;&#160;'+name + '</td>';
} else {
var cls = (enabled?'finderListName':'finderListDisabled');
html[html.length] = '<td width="40%">' + indent + disc + '&#160;' + '<a class="'+cls+'" href="#" onclick="return false;" >'+name + '</a></td>';
}
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

self.HS_UI_Component_SMPFinderPane_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self.HS_UI_Component_SMPFinderPane__Loader = function() {
	zenLoadClass('_ZEN_ComponentEx_finderPane');
	HS_UI_Component_SMPFinderPane.prototype = zenCreate('_ZEN_ComponentEx_finderPane',-1);
	var p = HS_UI_Component_SMPFinderPane.prototype;
	if (null==p) {return;}
	p.constructor = HS_UI_Component_SMPFinderPane;
	p.superClass = ('undefined' == typeof _ZEN_ComponentEx_finderPane) ? zenMaster._ZEN_ComponentEx_finderPane.prototype:_ZEN_ComponentEx_finderPane.prototype;
	p.__ZENcomponent = true;
	p._serverClass = 'HS.UI.Component.SMPFinderPane';
	p._type = 'SMPFinderPane';
	p.serialize = HS_UI_Component_SMPFinderPane_serialize;
	p.getSettings = HS_UI_Component_SMPFinderPane_getSettings;
	p.ReallyRefreshContents = HS_UI_Component_SMPFinderPane_ReallyRefreshContents;
	p.getFinderColumnHTML = HS_UI_Component_SMPFinderPane_getFinderColumnHTML;
	p.getListRowsHTML = HS_UI_Component_SMPFinderPane_getListRowsHTML;
}
/* EOF */