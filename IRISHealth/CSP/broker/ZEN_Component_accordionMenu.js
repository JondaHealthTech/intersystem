/*** Zen Module: ZEN_Component_accordionMenu ***/

self._zenClassIdx['accordionMenu'] = '_ZEN_Component_accordionMenu';
self._ZEN_Component_accordionMenu = function(index,id) {
	if (index>=0) {_ZEN_Component_accordionMenu__init(this,index,id);}
}

self._ZEN_Component_accordionMenu__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.controller = '';
	o.controllerId = '';
	o.enclosingClass = 'zam-menu';
	o.ongetcontroller = '';
	o.ongetdata = '';
	o.onnotifyView = '';
	o.onselect = '';
	o.selectedIndex = '';
	o.style = '';
}
function _ZEN_Component_accordionMenu_serialize(set,s)
{
	var o = this;s[0]='1609725225';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.containerStyle;s[9]=o.controller;s[10]=o.controllerId;s[11]=(o.dragEnabled?1:0);s[12]=(o.dropEnabled?1:0);s[13]=(o.dynamic?1:0);s[14]=o.enclosingClass;s[15]=o.enclosingStyle;s[16]=o.error;s[17]=o.height;s[18]=(o.hidden?1:0);s[19]=o.hint;s[20]=o.hintClass;s[21]=o.hintStyle;s[22]=o.label;s[23]=o.labelClass;s[24]=o.labelDisabledClass;s[25]=o.labelStyle;s[26]=o.onafterdrag;s[27]=o.onbeforedrag;s[28]=o.ondrag;s[29]=o.ondrop;s[30]=o.ongetcontroller;s[31]=o.ongetdata;s[32]=o.onhide;s[33]=o.onnotifyView;s[34]=o.onrefresh;s[35]=o.onselect;s[36]=o.onshow;s[37]=o.onupdate;s[38]=o.overlayMode;s[39]=o.renderFlag;s[40]=o.selectedIndex;s[41]=(o.showLabel?1:0);s[42]=o.slice;s[43]=o.style;s[44]=o.title;s[45]=o.tuple;s[46]=o.valign;s[47]=(o.visible?1:0);s[48]=o.width;
}
function _ZEN_Component_accordionMenu_getSettings(s)
{
	s['name'] = 'string';
	s['controllerId'] = 'id';
	s['ongetcontroller'] = 'eventHandler';
	s['ongetdata'] = 'eventHandler';
	s['onnotifyView'] = 'eventHandler';
	s['onselect'] = 'eventHandler';
	s['selectedIndex'] = 'string';
	s['style'] = 'style';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_accordionMenu_adjustParentMenuSize = function(menuId,level,id) {
var sizingDiv = self.document.getElementById(menuId + '_menuSizing');
var t2 = id.toString().split(',');
while (t2.length>1) {
t2.length--;
var parentId = menuId+':'+t2.join(',');
var parentDiv = self.document.getElementById('children_'+parentId);
if (parentDiv) {
sizingDiv.innerHTML = parentDiv.innerHTML;
parentDiv.style.height = sizingDiv.offsetHeight + 'px';
}
}
}

self._ZEN_Component_accordionMenu_connectToController = function() {
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

self._ZEN_Component_accordionMenu_disconnectFromController = function() {
if (this.controller && this.controller.unregister) {
this.controller.unregister(this);
}
this.controller = '';
}

self._ZEN_Component_accordionMenu_getController = function() {
if (this.ongetcontroller) {
return zenInvokeCallbackMethod(this.ongetcontroller,this,'ongetcontroller','view',this);
}
return (null == this.controller || '' == this.controller) ? null : this.controller;
}

self._ZEN_Component_accordionMenu_getMenuHTML = function(content,menuId) {
var html = [];
var menuInfo = {menuId:menuId, itemId:0};
html[html.length] = '<div style="height:0px;overflow:hidden;">';
html[html.length] = '<div id="'+menuId+'_menuSizing">';
html[html.length] = '</div>';
html[html.length] = '</div>';
if (content && content.children && content.children.length) {
html[html.length] = this.getMenuHTMLForArray(menuInfo,content.children,1,'');
}
return html.join('');
}

self._ZEN_Component_accordionMenu_getMenuHTMLForArray = function(menuInfo,array,level,parentId) {
if (level>3) {
alert('Menus cannot have more than 3 levels');
return '';
}
var html = [];
for (var n = 0; n < array.length; n++) {
var info = array[n];
var itemId = (parentId===''?'':parentId+',') + n;
var id = menuInfo.menuId + ':' + itemId;
var image = zenGet(info.image);
var style = zenGet(info.style);
var imageStyle = 'width:32px;' + zenGet(info.imageStyle);
var cls = (itemId==this.selectedIndex) ? 'zam-menuItemSelected' : 'zam-menuItem';
html[html.length] = '<div class="'+cls+'" id="menu_'+id+'">';
html[html.length] = '<div class="zam-menuItemInner" id="inner_'+id+'" style="'+style+'">';
html[html.length] = '<a class="zam-caption-'+level+'" id="caption_'+id+'" onclick="zenPage.getComponent('+this.index+').menuClickHandler(event,\''+id+'\',\''+zenGet(info.key)+'\',\''+zenGet(info.action)+'\',\''+zenGet(info.targetId)+'\');">';
if (image!='') {
html[html.length] = '<image src="'+image+'" style="'+imageStyle+'"/>&#160;';
}
html[html.length] = zenGet(info.caption);
html[html.length] = '</a>'
html[html.length] = '</div>';
if (info.children && info.children.length) {
var hgt = ((itemId==this.selectedIndex.split(',')[level-1])||level>1) ? 'auto' : '0px';
var opa = ((itemId==this.selectedIndex.split(',')[level-1])||level>1) ? '1.0' : '0.0';
html[html.length] = '<div class="zam-menuChildren" id="children_'+id+'" style="height:'+hgt+';opacity:'+opa+';">';
html[html.length] = this.getMenuHTMLForArray(menuInfo,info.children,level+1,itemId);
html[html.length] = '</div>';
}
html[html.length] = '</div>';
}
return html.join('');
}

self._ZEN_Component_accordionMenu_getModel = function() {
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

self._ZEN_Component_accordionMenu_menuActionHandler = function(itemId,key,action,targetId) {
zenInvokeCallbackMethod(this.onselect,this,'onselect','key',key,'action',action,'targetId',targetId);
}

self._ZEN_Component_accordionMenu_menuClickHandler = function(evt,id,key,action,targetId) {
if (evt.stopPropagation) {
evt.stopPropagation();
}
var t = id.toString().split(':');
var menuId = t[0];
var itemId = t[1];	// csv list of #s
var level = itemId.toString().split(',');
this.selectItem(itemId);
this.menuActionHandler(id,key,action,targetId);
}

self._ZEN_Component_accordionMenu_notifyView = function(reason,data1,data2,data3) {
var ret = true;
if (this.onnotifyView) {
ret = zenInvokeCallbackMethod(this.onnotifyView,this,'onnotifyEvent','reason',reason,'data1',data1,'data2',data2,'data3',data3);
}
if (ret && this.notifyViewHandler) {
this.notifyViewHandler(reason,data1,data2,data3);
}
}

self._ZEN_Component_accordionMenu_notifyViewHandler = function(reason,data1,data2,data3) {
switch(reason) {
case 'dataChange':
this.render();
break;
case 'seriesChange':
break;
case 'modelChange':
this.render();
break;
}
}

self._ZEN_Component_accordionMenu_renderContents = function() {
try {
var model = this.getModel();
var encDiv = this.getEnclosingDiv();
if (encDiv == null) return;
if (model) {
var menuId = this.id=='' ? this.index : this.id;
encDiv.innerHTML = this.getMenuHTML(model,menuId);
}
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in renderContents.');
}
}

self._ZEN_Component_accordionMenu_selectItem = function(index) {
var menuId = this.id=='' ? this.index : this.id;
var itemId = index;	// csv list of #s
var level = itemId.toString().split(',');
var id = menuId + ':' + itemId;
if (this.selectedIndex) {
var selDiv = self.document.getElementById('menu_'+menuId+':'+this.selectedIndex);
if (selDiv) {
selDiv.className = 'zam-menuItem';
}
}
this.selectedIndex = itemId;
if (this.selectedIndex) {
var selDiv = self.document.getElementById('menu_'+menuId+':'+this.selectedIndex);
if (selDiv) {
selDiv.className = 'zam-menuItemSelected';
}
}
var childDiv = self.document.getElementById('children_'+id);
if (childDiv) {
var sizingDiv = self.document.getElementById(menuId + '_menuSizing');
var func = new Function('zenPage.getComponent('+this.index+').adjustParentMenuSize(\''+menuId+'\','+level+',\''+itemId+'\');');
window.setTimeout(func,500);	// !!!!! (use transition notification)
if (childDiv.offsetHeight) {
childDiv.style.height = '0px';
childDiv.style.opacity = 0.0;
}
else {
sizingDiv.innerHTML = childDiv.innerHTML;
childDiv.style.height = sizingDiv.offsetHeight + 'px';
childDiv.style.opacity = 1.0;
}
}
if (level < 2) {
var t2 = itemId.toString().split(',');
var thisId = t2[t2.length-1];
t2.length--;
var baseId = t2.join(',');
for (var ix = 0;;ix++) {
if (ix!=thisId) {
var testId = menuId+':'+(baseId===''?'':baseId+',') + ix;
var iDiv = self.document.getElementById('menu_'+testId);
if (!iDiv) {
break;
}
var iChildDiv = self.document.getElementById('children_'+testId);
if (iChildDiv) {
iChildDiv.style.height = '0px';
}
}
}
}
}

self._ZEN_Component_accordionMenu_sendEventToController = function(reason,data1,data2,data3) {
var controller = this.getController();
if (controller && controller.notifyController) {
controller.notifyController(this,reason,data1,data2,data3);
}
}

self._ZEN_Component_accordionMenu_setControllerId = function(id) {
this.disconnectFromController();
this.controllerId = id;
this.connectToController();
}

self._ZEN_Component_accordionMenu_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_accordionMenu__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_ZEN_Component_accordionMenu.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _ZEN_Component_accordionMenu.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_accordionMenu;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.accordionMenu';
	p._type = 'accordionMenu';
	p.serialize = _ZEN_Component_accordionMenu_serialize;
	p.getSettings = _ZEN_Component_accordionMenu_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_accordionMenu_ReallyRefreshContents;
	p.adjustParentMenuSize = _ZEN_Component_accordionMenu_adjustParentMenuSize;
	p.connectToController = _ZEN_Component_accordionMenu_connectToController;
	p.disconnectFromController = _ZEN_Component_accordionMenu_disconnectFromController;
	p.getController = _ZEN_Component_accordionMenu_getController;
	p.getMenuHTML = _ZEN_Component_accordionMenu_getMenuHTML;
	p.getMenuHTMLForArray = _ZEN_Component_accordionMenu_getMenuHTMLForArray;
	p.getModel = _ZEN_Component_accordionMenu_getModel;
	p.menuActionHandler = _ZEN_Component_accordionMenu_menuActionHandler;
	p.menuClickHandler = _ZEN_Component_accordionMenu_menuClickHandler;
	p.notifyView = _ZEN_Component_accordionMenu_notifyView;
	p.notifyViewHandler = _ZEN_Component_accordionMenu_notifyViewHandler;
	p.renderContents = _ZEN_Component_accordionMenu_renderContents;
	p.selectItem = _ZEN_Component_accordionMenu_selectItem;
	p.sendEventToController = _ZEN_Component_accordionMenu_sendEventToController;
	p.setControllerId = _ZEN_Component_accordionMenu_setControllerId;
}
/* EOF */