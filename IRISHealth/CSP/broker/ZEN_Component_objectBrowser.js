/*** Zen Module: ZEN_Component_objectBrowser ***/

self._zenClassIdx['objectBrowser'] = '_ZEN_Component_objectBrowser';
self._ZEN_Component_objectBrowser = function(index,id) {
	if (index>=0) {_ZEN_Component_objectBrowser__init(this,index,id);}
}

self._ZEN_Component_objectBrowser__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.onselect = '';
	o.rootObjectId = '';
	o.sourcePage = null;
	o.onCreate();
}
function _ZEN_Component_objectBrowser_serialize(set,s)
{
	var o = this;s[0]='710316054';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.containerStyle;s[9]=(o.dragEnabled?1:0);s[10]=(o.dropEnabled?1:0);s[11]=(o.dynamic?1:0);s[12]=o.enclosingClass;s[13]=o.enclosingStyle;s[14]=o.error;s[15]=o.height;s[16]=(o.hidden?1:0);s[17]=o.hint;s[18]=o.hintClass;s[19]=o.hintStyle;s[20]=o.label;s[21]=o.labelClass;s[22]=o.labelDisabledClass;s[23]=o.labelStyle;s[24]=o.onafterdrag;s[25]=o.onbeforedrag;s[26]=o.ondrag;s[27]=o.ondrop;s[28]=o.onhide;s[29]=o.onrefresh;s[30]=o.onselect;s[31]=o.onshow;s[32]=o.onupdate;s[33]=o.overlayMode;s[34]=o.renderFlag;s[35]=o.rootObjectId;s[36]=(o.showLabel?1:0);s[37]=o.slice;s[38]=set.addObject(o.sourcePage,'sourcePage');s[39]=o.title;s[40]=o.tuple;s[41]=o.valign;s[42]=(o.visible?1:0);s[43]=o.width;
}
function _ZEN_Component_objectBrowser_getSettings(s)
{
	s['name'] = 'string';
	s['onselect'] = 'eventHandler';
	s['rootObjectId'] = 'string';
	s['sourcePage'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_objectBrowser_getCurrObject = function() {
var page = this.sourcePage ? this.sourcePage : zenPage;
return page.getComponent(this.currObject);
}

self._ZEN_Component_objectBrowser_onCreate = function() {
this.currObject = 1;
}

self._ZEN_Component_objectBrowser_renderBrowser = function() {
var div = this.findElement('objectBrowser');
zenASSERT(div,"Unable to find div.",arguments);
var page = this.sourcePage ? this.sourcePage : zenPage;
var root = page.getComponentById(this.rootObjectId);
if (!root) {
root = page;
}
var html = new Array();
html[html.length] = '<ul class="objectBrowser">';
this.renderObject(root,html,1)
html[html.length] = '</ul>';
div.innerHTML = html.join("");
}

self._ZEN_Component_objectBrowser_renderContents = function() {
this.renderBrowser();
}

self._ZEN_Component_objectBrowser_renderObject = function(obj,html,level) {
var style = '';
if (obj.index == this.currObject) {
style = 'style="border: 1px solid black; background: yellow;"';
}
html[html.length] = '<li '+style+' onclick="zenPage.getComponent('+this.index+').selectObject('+obj.index+');">&#160;';
html[html.length] = obj._type + ((obj.id&&obj.id!='') ? (' <i>'+obj.id+'</i>') : '');
html[html.length] = '&#160;</li>';
if (obj.children && !obj.isOfType('composite')) {
html[html.length] = '<ul class="objectBrowser">';
for (var n in obj.children) {
this.renderObject(obj.children[n],html,level+1);
}
html[html.length] = '</ul>';
}
}

self._ZEN_Component_objectBrowser_selectObject = function(index) {
var page = this.sourcePage ? this.sourcePage : zenPage;
this.setCurrObject(page.getComponent(index));
}

self._ZEN_Component_objectBrowser_setCurrObject = function(obj) {
zenASSERT(obj&&zenIsComponent(obj),"Invalid component.",arguments);
this.currObject = obj.index;
this.renderBrowser();
zenInvokeCallbackMethod(this.onselect,this,'onselect');
}

self._ZEN_Component_objectBrowser_update = function() {
this.renderBrowser();
}

self._ZEN_Component_objectBrowser_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_objectBrowser__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_ZEN_Component_objectBrowser.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _ZEN_Component_objectBrowser.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_objectBrowser;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.objectBrowser';
	p._type = 'objectBrowser';
	p.serialize = _ZEN_Component_objectBrowser_serialize;
	p.getSettings = _ZEN_Component_objectBrowser_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_objectBrowser_ReallyRefreshContents;
	p.getCurrObject = _ZEN_Component_objectBrowser_getCurrObject;
	p.onCreate = _ZEN_Component_objectBrowser_onCreate;
	p.renderBrowser = _ZEN_Component_objectBrowser_renderBrowser;
	p.renderContents = _ZEN_Component_objectBrowser_renderContents;
	p.renderObject = _ZEN_Component_objectBrowser_renderObject;
	p.selectObject = _ZEN_Component_objectBrowser_selectObject;
	p.setCurrObject = _ZEN_Component_objectBrowser_setCurrObject;
	p.update = _ZEN_Component_objectBrowser_update;
}
/* EOF */