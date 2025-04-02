/*** Zen Module: ZEN_Component_toolbar ***/

self._zenClassIdx['toolbar'] = '_ZEN_Component_toolbar';
self._ZEN_Component_toolbar = function(index,id) {
	if (index>=0) {_ZEN_Component_toolbar__init(this,index,id);}
}

self._ZEN_Component_toolbar__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.controller = '';
	o.controllerId = '';
	o.enclosingClass = 'ztb-menu';
	o.imageStyle = '';
	o.onchange = '';
	o.ongetcontroller = '';
	o.ongetdata = '';
	o.onnotifyView = '';
	o.onpagechange = '';
	o.onselect = '';
	o.scrollOffset = '0';
	o.selectedIndex = '-1';
	o.style = '';
}
function _ZEN_Component_toolbar_serialize(set,s)
{
	var o = this;s[0]='3671614128';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.containerStyle;s[9]=o.controller;s[10]=o.controllerId;s[11]=(o.dragEnabled?1:0);s[12]=(o.dropEnabled?1:0);s[13]=(o.dynamic?1:0);s[14]=o.enclosingClass;s[15]=o.enclosingStyle;s[16]=o.error;s[17]=o.height;s[18]=(o.hidden?1:0);s[19]=o.hint;s[20]=o.hintClass;s[21]=o.hintStyle;s[22]=o.imageStyle;s[23]=o.label;s[24]=o.labelClass;s[25]=o.labelDisabledClass;s[26]=o.labelStyle;s[27]=o.onafterdrag;s[28]=o.onbeforedrag;s[29]=o.onchange;s[30]=o.ondrag;s[31]=o.ondrop;s[32]=o.ongetcontroller;s[33]=o.ongetdata;s[34]=o.onhide;s[35]=o.onnotifyView;s[36]=o.onpagechange;s[37]=o.onrefresh;s[38]=o.onselect;s[39]=o.onshow;s[40]=o.onupdate;s[41]=o.overlayMode;s[42]=o.renderFlag;s[43]=o.scrollOffset;s[44]=o.selectedIndex;s[45]=(o.showLabel?1:0);s[46]=o.slice;s[47]=o.style;s[48]=o.title;s[49]=o.tuple;s[50]=o.valign;s[51]=(o.visible?1:0);s[52]=o.width;
}
function _ZEN_Component_toolbar_getSettings(s)
{
	s['name'] = 'string';
	s['controllerId'] = 'id';
	s['imageStyle'] = 'style';
	s['onchange'] = 'eventHandler';
	s['ongetcontroller'] = 'eventHandler';
	s['ongetdata'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	s['onpagechange'] = 'eventHandler';
	s['onselect'] = 'eventHandler';
	s['scrollOffset'] = 'integer';
	s['selectedIndex'] = 'integer';
	s['style'] = 'style';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_toolbar_choiceClick = function(evt,index,choiceNo,newValue) {
evt = evt ? evt : window.event;
for (var n = 0; n < 99; n++) {
var div = this.findElement('choice_'+index+'_'+n);
if (div) {
div.className = 'ztb-choice';
}
else {
break;
}
}
var div = this.findElement('choice_'+index+'_'+choiceNo);
if (div) {
div.className = 'ztb-choiceSelected';
}
var model = this.getModel();
if (model && model.children && model.children.length) {
var item = model.children[index];
if (item) {
var key = zenGet(item.key);
if (item.value != newValue) {
item.value = newValue;
zenInvokeCallbackMethod(this.onchange,this,'onchange','value',item.value,'key',key,'final',true);
}
}
}
}

self._ZEN_Component_toolbar_connectToController = function() {
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

self._ZEN_Component_toolbar_controlChange = function(id,index) {
var ctrl = this.findElement('control_'+id);
if (ctrl && ctrl.className=='ztb-controlDefault') {
return;
}
var newValue = ctrl.value;
var model = this.getModel();
if (model && model.children && model.children.length) {
var item = model.children[index];
if (item) {
var key = zenGet(item.key);
if (item.value != newValue) {
item.value = newValue;
zenInvokeCallbackMethod(this.onchange,this,'onchange','value',item.value,'key',key,'final',true);
}
}
}
}

self._ZEN_Component_toolbar_controlFocus = function(id) {
var ctrl = this.findElement('control_'+id);
if (ctrl && ctrl.className=='ztb-controlDefault') {
ctrl.className = 'ztb-control';
ctrl.value = '';
}
}

self._ZEN_Component_toolbar_controlKeyPress = function(evt,id,index) {
evt = evt ? evt : window.event;
if (evt.keyCode == zenENTER) {
this.controlChange(id, index);
}
}

self._ZEN_Component_toolbar_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._ZEN_Component_toolbar_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._ZEN_Component_toolbar_getMenuHTML = function(content,menuId) {
var html = [];
var encDiv = this.getEnclosingDiv();
html[html.length] = '<div id="'+this.makeId('mouseTrap')+'" class="ztb-mouseTrap" onclick="zenPage.getComponent('+this.index+').hideAll();">';
html[html.length] = '</div>';
html[html.length] = '<div id="'+this.makeId('menuBar')+'" class="ztb-menuBar">';
if (content && content.children && content.children.length) {
for (var n = 0; n < content.children.length; n++) {
var info = content.children[n];
var id = n;
var hasChildren = (info.children && info.children.length);
html[html.length] = this.getTopItemHTML(info,n);
if (hasChildren) {
html[html.length] = '<div class="ztb-menuChildren" id="'+this.makeId('children_'+id)+'" style="height:0px;opacity:'+1.0+';">';
for (var j = 0; j < info.children.length; j++) {
var cinfo = info.children[j];
var image = zenGet(cinfo.image);
var ctype = zenGet(cinfo.type);
var cseparator = zenGet(cinfo.separator);
var cid = n + "_" + j;
html[html.length] = '<div class="ztb-menuItem-2" id="'+this.makeId('menu_'+cid)+'">';
if (cseparator) {
html[html.length] = '<hr/>'
}
else {
html[html.length] = '<div class="ztb-menuItemInner" id="'+this.makeId('inner_'+cid)+'">';
html[html.length] = '<a class="ztb-caption-2" id="'+this.makeId('caption_'+cid)+'" onclick="zenPage.getComponent('+this.index+').menuClickHandler(event,\''+ctype+'\',\''+cid+'\',\''+zenGet(cinfo.key)+'\',\''+zenGet(cinfo.action)+'\',\''+zenGet(cinfo.targetId)+'\');">';
if (image!='') {
html[html.length] = '<image src="'+image+'"/>';
}
html[html.length] = zenGet(cinfo.caption);
html[html.length] = '</a>'
html[html.length] = '</div>';
}
html[html.length] = '</div>';
}
html[html.length] = '</div>';
}
}
}
var style = this.style;
html[html.length] = '<div class="ztb-menuItem-1" id="'+this.makeId('scrollLeft')+'" style="width:24px;display:none;">';
html[html.length] = '<div class="ztb-menuItemInner" id="'+this.makeId('scrollLeftInner')+'">';
html[html.length] = '<a class="ztb-caption-1" style="'+style+'" onclick="zenPage.getComponent('+this.index+').scrollClickHandler(event,\'left\');">';
html[html.length] = '&laquo';
html[html.length] = '</a>'
html[html.length] = '</div>';
html[html.length] = '</div>';
var style = this.style;
html[html.length] = '<div class="ztb-menuItem-1" id="'+this.makeId('scrollRight')+'" style="width:24px;display:none;">';
html[html.length] = '<div class="ztb-menuItemInner" id="'+this.makeId('scrollRightInner')+'">';
html[html.length] = '<a class="ztb-caption-1" style="'+style+'" onclick="zenPage.getComponent('+this.index+').scrollClickHandler(event,\'right\');">';
html[html.length] = '&raquo';
html[html.length] = '</a>'
html[html.length] = '</div>';
html[html.length] = '</div>';
html[html.length] = '</div>';
return html.join('');
}

self._ZEN_Component_toolbar_getModel = function() {
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
model = controller.getContentObject();
}
else {
}
}
}
return model;
}

self._ZEN_Component_toolbar_getPagingHTML = function(index,pageNo) {
var html = [];
var info = null;
var content = this.getModel();
if (content && content.children) {
info = content.children[index];
}
if (!info) {
return '';
}
var id = index;
var caption = zenGet(info.caption);
var style = zenGet(info.style);
var image = zenGet(info.image);
html[html.length] = '<div>';
html[html.length] = '<table class="ztb-pages" cellspacing="0" border="0" cellpadding="0">';
html[html.length] = '<tr>';
var startPage = zenGet(info.minValue,1);
if ('undefined' == typeof pageNo) {
var currPage = zenGet(info.value,startPage);
}
else {
var currPage = parseInt(pageNo);
}
var endPage = zenGet(info.maxValue,startPage);
var pageCount = endPage - startPage + 1;
var maxPages = 10;		// after this show gaps
var centerStart = -1;
var centerEnd = 100000;
if (pageCount > maxPages) {
if (currPage > (startPage+3)) {
centerStart = currPage - 3;
if (centerStart > endPage-5) {
centerStart = endPage-5;
}
}
if (currPage < endPage) {
centerEnd = currPage + 3;
if (centerEnd < (startPage+6)) {
centerEnd = startPage+6;
}
}
}
if (image!='') {
html[html.length] = '<td><image class="ztb-image" id="'+this.makeId('image_'+id)+'" src="'+image+'" style="'+imageStyle+'"/></td>';
}
if (caption!='') {
html[html.length] = '<td id="'+this.makeId('td_'+id)+'" style="padding-right:10px;'+style+'">';
html[html.length] = caption;
html[html.length] = '</td>';
}
if (centerStart > 1) {
html[html.length] = '<td class="ztb-pageNo" style="'+style+'" onclick="zenPage.getComponent('+this.index+').pageChangeHandler(event,\''+id+'\',\''+zenGet(info.key)+'\',\''+(parseInt(currPage)-1)+'\');" >';
html[html.length] = '&#171;';
html[html.length] = '</td>';
}
for (var page = startPage; page <= endPage; page++) {
var skip = false;
if ((centerStart!=-1 || centerEnd!=100000) && page!=startPage && page!= endPage) {
if (page <= centerStart || page >= centerEnd) {
skip = true;
}
}
if (!skip) {
if (page == currPage) {
html[html.length] = '<td class="ztb-pageNoCurr" style="'+style+'">';
}
else {
html[html.length] = '<td class="ztb-pageNo" style="'+style+'" onclick="zenPage.getComponent('+this.index+').pageChangeHandler(event,\''+id+'\',\''+zenGet(info.key)+'\',\''+page+'\');" >';
}
html[html.length] = page;
html[html.length] = '</td>';
}
else if (page==centerStart || page==centerEnd) {
html[html.length] = '<td>';
html[html.length] = '&#8230;';
html[html.length] = '</td>';
}
}
if (currPage < endPage) {
html[html.length] = '<td class="ztb-pageNo" style="'+style+'" onclick="zenPage.getComponent('+this.index+').pageChangeHandler(event,\''+id+'\',\''+zenGet(info.key)+'\',\''+(parseInt(currPage)+1)+'\');" >';
html[html.length] = '&#187;';
html[html.length] = '</td>';
}
html[html.length] = '</tr>';
html[html.length] = '</table>';
html[html.length] = '</div>';
return html.join('');
}

self._ZEN_Component_toolbar_getTopItemHTML = function(info,index) {
var html = [];
var id = index;
var image = zenGet(info.image);
var cellHTML = zenGet(info.html);
var caption = zenGet(info.caption);
var value = zenGet(info.value);
var type = zenGet(info.type,'item');
var selected = zenGet(info.selected,false);
if (selected) {
this.selectedIndex = index;
}
var isSelected = (index == this.selectedIndex);
var hasChildren = (info.children && info.children.length);
var cls = isSelected ? 'ztb-menuItemSelected-1' : 'ztb-menuItem-1';
var style = this.style + zenGet(info.style);
var imageStyle = this.imageStyle + zenGet(info.imageStyle);
html[html.length] = '<div class="'+cls+'" id="'+this.makeId('menu_'+id)+'">';
switch (type) {
case 'separator':
html[html.length] = '<div class="ztb-hz-separator" id="'+this.makeId('inner_'+id)+'">&#160;</div>';
break;
case 'field':
html[html.length] = '<div style="color:#F0F0F0;" class="ztb-menuItemInner" id="'+this.makeId('inner_'+id)+'">';
html[html.length] = zenEscapeXML(value);
html[html.length] = '</div>';
break;
case 'string':
html[html.length] = '<div class="ztb-menuItemInner" id="'+this.makeId('inner_'+id)+'">';
html[html.length] = '<a class="ztb-caption-1" style="'+style+'" id="'+this.makeId('caption_'+id)+'">';
var tcls = 'ztb-control';
var val = value;
if (val==='') {
var defValue = zenGet(info.defaultValue);
if (defValue!=='') {
val = defValue;
tcls = 'ztb-controlDefault';
}
}
html[html.length] = '<input id="'+this.makeId('control_'+id)+'" type="text" size="20" class="'+tcls+'" value="'+zenEscapeXML(val)+'" onfocus="zenPage.getComponent('+this.index+').controlFocus(\''+id+'\');" onchange="zenPage.getComponent('+this.index+').controlChange(\''+id+'\',\''+index+'\');" onkeypress="zenPage.getComponent('+this.index+').controlKeyPress(event,\''+id+'\',\''+index+'\');" />';
html[html.length] = '</a>';
html[html.length] = '</div>';
break;
case 'choice':
html[html.length] = '<div class="ztb-menuItemInner" id="'+this.makeId('inner_'+id)+'">';
var valueList = zenGet(info.valueList);
var displayList = zenGet(info.displayList);
displayList = displayList=='' ? valueList : displayList;
var value = zenGet(info.value,zenGet(info.caption));
var vlist = valueList.toString().split(',');
var dlist = displayList.toString().split(',');
var count = vlist.length;
html[html.length] = '<a class="ztb-message" style="'+style+'" ">';
html[html.length] = '<table style="width:100%;" cellspacing="0" border="0" cellpadding="0">';
html[html.length] = '<tr>';
if (count > 0) {
for (var n = 0; n<count; n++) {
var st = '';
if (n==0) {
st += 'border-top-left-radius:5px;border-bottom-left-radius:5px;';
}
if (n==(count-1)) {
st += 'border-top-right-radius:5px;border-bottom-right-radius:5px;';
}
if (zenGet(vlist[n])==value) {
var cls = 'ztb-choiceSelected';
}
else {
var cls = 'ztb-choice';
}
html[html.length] = '<td id="'+this.makeId('choice_'+index+'_'+n)+'" class="'+cls+'" style="border:1px solid #808080;'+st+'" onclick="zenPage.getComponent('+this.index+').choiceClick(event,'+index+','+n+',\''+zenGet(vlist[n])+'\');">'+zenGet(dlist[n])+'</td>';
}
}
html[html.length] = '</tr></table>';
html[html.length] = '</a>'
html[html.length] = '</div>';
break;
case 'pages':
html[html.length] = '<div class="ztb-menuItemInner" id="'+this.makeId('inner_'+id)+'">';
html[html.length] = this.getPagingHTML(index);
html[html.length] = '</div>';
break;
case 'message':
case 'item':
case 'tab':
default:
html[html.length] = '<div class="ztb-menuItemInner" id="'+this.makeId('inner_'+id)+'">';
if (type == 'message') {
html[html.length] = '<a class="ztb-message" style="'+style+'" id="'+this.makeId('caption_'+id)+'">';
}
else {
html[html.length] = '<a class="ztb-caption-1" style="'+style+'" id="'+this.makeId('caption_'+id)+'" onclick="zenPage.getComponent('+this.index+').menuClickHandler(event,\''+type+'\',\''+id+'\',\''+zenGet(info.key)+'\',\''+zenGet(info.action)+'\',\''+zenGet(info.targetId)+'\');">';
}
if (cellHTML!='') {
html[html.length] = cellHTML;
}
else  {
html[html.length] = '<table cellspacing="0" border="0" cellpadding="0">';
html[html.length] = '<tr>';
if (image!='') {
html[html.length] = '<td><image class="ztb-image" id="'+this.makeId('image_'+id)+'" src="'+image+'" style="'+imageStyle+'"/></td>';
}
if (caption!='') {
html[html.length] = '<td id="'+this.makeId('td_'+id)+'" style="'+style+'">';
html[html.length] = caption;
if (hasChildren) {
html[html.length] = '&#160;&#9660;';
}
html[html.length] = '</td>';
}
html[html.length] = '</tr>';
html[html.length] = '</table>';
}
html[html.length] = '</a>'
html[html.length] = '</div>';
}
html[html.length] = '</div>';
return html.join('');
}

self._ZEN_Component_toolbar_hideAll = function() {
var content = this.getModel();
if (content && content.children && content.children.length) {
for (var n = 0; n < content.children.length; n++) {
var childDiv = this.findElement('children_'+n);
if (childDiv) {
childDiv.style.display = 'none';
childDiv.style.height = 0 + 'px';
childDiv.style.opacity = 0.0;
}
}
}
var trapDiv = this.findElement('mouseTrap');
trapDiv.style.display = 'none';
}

self._ZEN_Component_toolbar_menuActionHandler = function(itemId,type,key,action,targetId) {
if (type=='tab') {
if (itemId == (parseInt(itemId,10))) {
if (this.selectedIndex!=itemId) {
var menuDiv = this.findElement('menu_'+this.selectedIndex);
if (menuDiv) {
menuDiv.className = 'ztb-menuItem-1';
}
this.selectedIndex = itemId;
var menuDiv = this.findElement('menu_'+this.selectedIndex);
if (menuDiv) {
menuDiv.className = 'ztb-menuItemSelected-1';
}
}
}
}
zenInvokeCallbackMethod(this.onselect,this,'onselect','key',key,'action',action,'targetId',targetId);
}

self._ZEN_Component_toolbar_menuClickHandler = function(evt,type,id,key,action,targetId) {
if (evt.stopPropagation) {
evt.stopPropagation();
}
if (zenIsIE) {
this.hideAll();
}
var trapDiv = this.findElement('mouseTrap');
var menuDiv = this.findElement('menu_'+id);
var childDiv = this.findElement('children_'+id);
if (childDiv) {
trapDiv.style.display = 'block';
trapDiv.style.width = '10000px';
trapDiv.style.height = '10000px';
childDiv.style.display = 'block';
childDiv.style.left = menuDiv.offsetLeft + 'px';
var adj = 2;
childDiv.style.top = menuDiv.offsetTop + menuDiv.offsetHeight + adj + 'px';
childDiv.style.height = 'auto';
childDiv.style.opacity = 1.0;
}
else {
if (!zenIsIE) {
this.hideAll();
}
}
this.menuActionHandler(id,type,key,action,targetId);
}

self._ZEN_Component_toolbar_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._ZEN_Component_toolbar_pageChangeHandler = function(evt,itemId,key,page) {
page = parseInt(page);
var divInner = this.findElement('inner_'+itemId);
if (divInner) {
var height = divInner.offsetHeight;
divInner.innerHTML = this.getPagingHTML(itemId,page);
divInner.style.height = height + 'px';
}
zenInvokeCallbackMethod(this.onpagechange,this,'onpagechange','key',key,'page',page);
}

self._ZEN_Component_toolbar_renderContents = function() {
try {
var encDiv = this.getEnclosingDiv();
if (encDiv == null) return;
var model = this.getModel();
if (model && model.children && model.children.length) {
var menuId = this.id=='' ? this.index : this.id;
encDiv.innerHTML = this.getMenuHTML(model,menuId);
var width = encDiv.offsetWidth;
var infoList = [];
for (var n = 0; n < model.children.length; n++) {
var info = model.children[n];
var div = this.findElement('menu_'+n);
info._width = div ? div.offsetWidth : 0;
info._height = div ? div.offsetHeight : 0;
infoList[n] = info;
}
var totalWidth = 0;
var height = 0;
for (var n = 0; n < infoList.length; n++) {
var info = infoList[n];
height = info._height > height ? info._height : height;
totalWidth += parseInt(info._width);
}
var scrollWid = 36;
var hasScroll = (totalWidth>(width-scrollWid*2));
if (!hasScroll) {
this.scrollOffset = 0;
}
var firstItem = parseInt(this.scrollOffset);
encDiv.style.height = (height) + 'px';
var menuBar = this.findElement('menuBar');
if (menuBar) {
menuBar.style.height = (height) + 'px';
}
var left = 0;
this._maxScroll = 0;
var hiddenItems = firstItem;
for (var n = 0; n < firstItem; n++) {
var div = this.findElement('menu_'+n);
div.style.display = 'none';
}
for (var n = firstItem; n < infoList.length; n++) {
var info = infoList[n];
var div = this.findElement('menu_'+n);
if ((n>firstItem) && ((left + info._width) > (width-scrollWid*2))) {
div.style.display = 'none';
hiddenItems++;
}
else {
var adj = 1;
div.style.display = 'block';
div.style.left = left + 'px';
div.style.height = (height-adj) + 'px';
var divInner = this.findElement('inner_'+n);
if (divInner) {
divInner.style.height = (height-adj) + 'px';
if (info.image) {
var image = this.findElement('image_'+n);
if (image) {
}
}
}
var td = this.findElement('td_'+n);
if (td) {
td.style.height = (height-adj-6) + 'px';
}
left += parseInt(info._width);
}
}
if (hasScroll) {
this._maxScroll = hiddenItems;
var adj = 2;
var scrollLeft = this.findElement('scrollLeft');
var scrollRight = this.findElement('scrollRight');
var scrollLeftIn = this.findElement('scrollLeftInner');
var scrollRightIn = this.findElement('scrollRightInner');
scrollLeft.style.display = 'block';
scrollRight.style.display = 'block';
scrollLeft.style.left = left + 'px';
scrollLeftIn.style.height = (height-adj) + 'px';
scrollLeftIn.style.width = scrollWid + 'px';
if (firstItem==0) {
scrollLeftIn.innerHTML = '';
}
if (firstItem==0) {
scrollLeftIn.innerHTML = '';
}
left += scrollLeft.offsetWidth;
scrollRight.style.left = left + 'px';
scrollRightIn.style.height = (height-adj) + 'px';
scrollRightIn.style.width = scrollWid + 'px';
if ((hiddenItems-firstItem)<=0) {
scrollRightIn.innerHTML = '';
}
}
}
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in renderContents.');
}
}

self._ZEN_Component_toolbar_scrollClickHandler = function(evt,which) {
if (which == 'left') {
if (this.scrollOffset > 0) {
this.scrollOffset--;
this.render();
}
}
else {
if (this.scrollOffset < this._maxScroll) {
this.scrollOffset++;
this.render();
}
}
}

self._ZEN_Component_toolbar_selectTab = function(key) {
var index = -1;
var content = this.getModel();
if (key!=='' && content && content.children && content.children.length) {
for (var n = 0; n < content.children.length; n++) {
if (content.children[n].key == key) {
index = n;
break;
}
}
}
this.setProperty('selectedIndex',index);
}

self._ZEN_Component_toolbar_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._ZEN_Component_toolbar_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._ZEN_Component_toolbar_setProperty = function(property,value,value2) {
switch(property) {
case 'style':
case 'imageStyle':
case 'selectedIndex':
this[property] = value;
this.render();
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_toolbar_setWidth = function(width) {
var encDiv = this.getEnclosingDiv();
if (encDiv) {
encDiv.style.width = width + 'px';
this.render();
}
}

self._ZEN_Component_toolbar_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_toolbar__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_ZEN_Component_toolbar.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _ZEN_Component_toolbar.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_toolbar;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.toolbar';
	p._type = 'toolbar';
	p.serialize = _ZEN_Component_toolbar_serialize;
	p.getSettings = _ZEN_Component_toolbar_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_toolbar_ReallyRefreshContents;
	p.choiceClick = _ZEN_Component_toolbar_choiceClick;
	p.connectToController = _ZEN_Component_toolbar_connectToController;
	p.controlChange = _ZEN_Component_toolbar_controlChange;
	p.controlFocus = _ZEN_Component_toolbar_controlFocus;
	p.controlKeyPress = _ZEN_Component_toolbar_controlKeyPress;
	p.disconnectFromController = _ZEN_Component_toolbar_disconnectFromController;
	p.getController = _ZEN_Component_toolbar_getController;
	p.getMenuHTML = _ZEN_Component_toolbar_getMenuHTML;
	p.getModel = _ZEN_Component_toolbar_getModel;
	p.getPagingHTML = _ZEN_Component_toolbar_getPagingHTML;
	p.getTopItemHTML = _ZEN_Component_toolbar_getTopItemHTML;
	p.hideAll = _ZEN_Component_toolbar_hideAll;
	p.menuActionHandler = _ZEN_Component_toolbar_menuActionHandler;
	p.menuClickHandler = _ZEN_Component_toolbar_menuClickHandler;
	p.notifyView = _ZEN_Component_toolbar_notifyView;
	p.pageChangeHandler = _ZEN_Component_toolbar_pageChangeHandler;
	p.renderContents = _ZEN_Component_toolbar_renderContents;
	p.scrollClickHandler = _ZEN_Component_toolbar_scrollClickHandler;
	p.selectTab = _ZEN_Component_toolbar_selectTab;
	p.sendEventToController = _ZEN_Component_toolbar_sendEventToController;
	p.setControllerId = _ZEN_Component_toolbar_setControllerId;
	p.setProperty = _ZEN_Component_toolbar_setProperty;
	p.setWidth = _ZEN_Component_toolbar_setWidth;
}
/* EOF */