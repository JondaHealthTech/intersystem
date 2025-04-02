/*** Zen Module: ZEN_Component_dynaTree ***/

self._zenClassIdx['dynaTree'] = '_ZEN_Component_dynaTree';
self._ZEN_Component_dynaTree = function(index,id) {
	if (index>=0) {_ZEN_Component_dynaTree__init(this,index,id);}
}

self._ZEN_Component_dynaTree__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.OnGetNodeInfo = ''; // encrypted
	o.OnGetTreeInfo = ''; // encrypted
	o.childIndent = '20';
	o.dataGlobal = ''; // encrypted
	o.imageContracted = '';
	o.imageExpanded = '';
	o.imageFolderClosed = '';
	o.imageFolderOpen = '';
	o.imageNode = '';
	o.nodeCount = '0';
	o.onchange = '';
	o.onclick = '';
	o.ondblclick = '';
	o.parameters = new Object();
	o.selectedIndex = '-1';
	o.showFolders = true;
	o.showLines = false;
	o.text = '';
	o.value = '';
}
function _ZEN_Component_dynaTree_serialize(set,s)
{
	var o = this;s[0]='1332587112';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.OnGetNodeInfo;s[7]=o.OnGetTreeInfo;s[8]=o.align;s[9]=o.aux;s[10]=o.childIndent;s[11]=o.containerStyle;s[12]=o.dataGlobal;s[13]=(o.dragEnabled?1:0);s[14]=(o.dropEnabled?1:0);s[15]=(o.dynamic?1:0);s[16]=o.enclosingClass;s[17]=o.enclosingStyle;s[18]=o.error;s[19]=o.height;s[20]=(o.hidden?1:0);s[21]=o.hint;s[22]=o.hintClass;s[23]=o.hintStyle;s[24]=o.imageContracted;s[25]=o.imageExpanded;s[26]=o.imageFolderClosed;s[27]=o.imageFolderOpen;s[28]=o.imageNode;s[29]=o.label;s[30]=o.labelClass;s[31]=o.labelDisabledClass;s[32]=o.labelStyle;s[33]=o.nodeCount;s[34]=o.onafterdrag;s[35]=o.onbeforedrag;s[36]=o.onchange;s[37]=o.onclick;s[38]=o.ondblclick;s[39]=o.ondrag;s[40]=o.ondrop;s[41]=o.onhide;s[42]=o.onrefresh;s[43]=o.onshow;s[44]=o.onupdate;s[45]=o.overlayMode;s[46]=set.serializeArray(o,o.parameters,true,'parameters');s[47]=o.renderFlag;s[48]=o.selectedIndex;s[49]=(o.showFolders?1:0);s[50]=(o.showLabel?1:0);s[51]=(o.showLines?1:0);s[52]=o.slice;s[53]=o.text;s[54]=o.title;s[55]=o.tuple;s[56]=o.valign;s[57]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[58]=(o.visible?1:0);s[59]=o.width;
}
function _ZEN_Component_dynaTree_getSettings(s)
{
	s['name'] = 'string';
	s['childIndent'] = 'length';
	s['dataGlobal'] = 'glvn';
	s['imageContracted'] = 'uri';
	s['imageExpanded'] = 'uri';
	s['imageFolderClosed'] = 'uri';
	s['imageFolderOpen'] = 'uri';
	s['imageNode'] = 'uri';
	s['onchange'] = 'eventHandler';
	s['onclick'] = 'eventHandler';
	s['ondblclick'] = 'eventHandler';
	s['parameters'] = 'string';
	s['selectedIndex'] = 'integer';
	s['showFolders'] = 'boolean';
	s['showLines'] = 'boolean';
	s['text'] = 'string';
	s['value'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_dynaTree_dragStartHandler = function(dragData) {
var ok = false;
var dragItem = this._dragSource;
if (null != dragItem) {
dragData.sourceItem = dragItem;
delete this._dragSource;
var anchor = this.findElement('a_' + dragItem);
if (anchor) {
ok = true;
dragData.value = this.getNodeValue(dragItem);
if ('' == dragData.value) {
return false;
}
dragData.text = this.getNodeText(dragItem);
var icon = anchor.parentNode.cloneNode(true);
icon.style.position="absolute";
icon.style.border ="1px solid darkgray";
icon.style.background ="#D0D0F0";
icon.style.zIndex = 10;
icon.style.boxShadow ="2px 2px 2px #808080";
ZLM.setDragAvatar(icon);
}
}
return ok;
}

self._ZEN_Component_dynaTree_expandAll = function(flag) {
var n = 0;
while(this.findElement('a_' + n)) {
var div = this.findElement('exp_' + n);
if (div) {
var img = this.findElement('image_' + n);
var icon = this.findElement('icon_' + n);
div.style.display = flag ? '' : 'none';
if (img) {
img.src = this.getExpandoImage(img.src, flag);
}
if (icon) {
if (this.showFolders||this.showLines) {
icon.src = flag ? this.imageFolderOpen : this.imageFolderClosed;
}
else {
icon.src = '';
}
}
}
n++;
}
}

self._ZEN_Component_dynaTree_getExpandoImage = function(src,expanded) {
if (this.showLines) {
if (src.indexOf('plus-') != -1) {
return expanded ? src.split('plus-').join('minus-') : src;
}
else {
return expanded ? src : src.split('minus-').join('plus-');
}
}
return expanded ? this.imageExpanded : this.imageContracted;
}

self._ZEN_Component_dynaTree_getNodeParent = function(nodeNo) {
var p = null;
var anchor = this.findElement('a_' + nodeNo);
if (anchor) {
p = anchor.getAttribute('zenParent');
}
return (p==null) ? -1 : p;
}

self._ZEN_Component_dynaTree_getNodeText = function(nodeNo) {
if (null == nodeNo) { nodeNo = this.selectedIndex; }
var anchor = this.findElement('a_' + nodeNo);
if (anchor) {
return anchor.getAttribute('zenText');
}
return null;
}

self._ZEN_Component_dynaTree_getNodeValue = function(nodeNo) {
if (null == nodeNo) { nodeNo = this.selectedIndex; }
var anchor = this.findElement('a_' + nodeNo);
if (anchor) {
return anchor.getAttribute('zenValue');
}
return null;
}

self._ZEN_Component_dynaTree_getSelectedIndex = function() {
return this.selectedIndex;
}

self._ZEN_Component_dynaTree_getValue = function() {
var val = null;
if (this.selectedIndex >=0) {
var anchor = this.findElement('a_' + this.selectedIndex);
if (anchor) {
val = anchor.getAttribute('zenValue');
}
}
return (val == null) ? '' : val;
}

self._ZEN_Component_dynaTree_isNodeExpanded = function(nodeNo) {
var div = this.findElement('exp_' + nodeNo);
zenASSERT(div,'Unable to find div element for children',arguments);
var expanded = (div.style.display == '');
return expanded;
}

self._ZEN_Component_dynaTree_itemClicked = function(idx,level) {
this.selectItem(idx);
var ret = zenInvokeCallbackMethod(this.onclick,this,'onclick','level',level);
return (null==ret) ? true : ret;
}

self._ZEN_Component_dynaTree_itemDblClicked = function(idx,level) {
var ret = zenInvokeCallbackMethod(this.ondblclick,this,'ondblclick','level',level);
return (null==ret) ? true : ret;
}

self._ZEN_Component_dynaTree_itemKeyPress = function(evt,idx,canExpand) {
if (canExpand) {
if ((32 == evt.charCode) || (32 == evt.keyCode)) {
this.toggleExpanded(idx);
return true;
}
}
return false;
}

self._ZEN_Component_dynaTree_itemMouseDown = function(evt,idx) {
if (this.dragEnabled) {
evt = evt ? evt : window.event;
if (evt.preventDefault) {
evt.preventDefault();
}
this._dragSource = idx;
this.selectItem(idx);
}
}

self._ZEN_Component_dynaTree_itemMouseUp = function(evt) {
if (this.dragEnabled) {
evt = evt ? evt : window.event;
if (evt.preventDefault) {
evt.preventDefault();
}
delete this._dragSource;
}
}

self._ZEN_Component_dynaTree_reloadNode = function(nodeNo) {
var anchor = this.findElement('a_' + nodeNo);
var div = this.findElement('exp_' + nodeNo);
if (anchor && div) {
anchor.setAttribute('zenLoad',0);
var state = anchor.getAttribute('zenState');
var value = anchor.getAttribute('zenValue');
var level = parseInt(anchor.getAttribute('zenLevel'));
div.innerHTML = '<div style="font-size:8pt; color: blue; padding-left:'+((level+2)*16)+ 'px;">loading...</div>';
this.LoadSubTree(nodeNo,level,value,state);
return true;
}
return false;
}

self._ZEN_Component_dynaTree_selectItem = function(idx) {
if (-1 != this.selectedIndex) {
var anchor = this.findElement('a_' + this.selectedIndex);
if (anchor) {
anchor.className = 'dynaTreeItem';
}
}
this.selectedIndex = idx;
this.text = '';
this.value = '';
if (-1 != this.selectedIndex) {
var anchor = this.findElement('a_' + this.selectedIndex);
if (anchor) {
anchor.className = 'dynaTreeItemSelected';
this.text = anchor.getAttribute('zenText');
this.value = anchor.getAttribute('zenValue');
}
}
zenInvokeCallbackMethod(this.onchange,this,'onchange');
}

self._ZEN_Component_dynaTree_setNodeStyle = function(nodeNo,style) {
var anchor = this.findElement('a_' + nodeNo);
if (anchor) {
anchor.style.cssText = style;
}
}

self._ZEN_Component_dynaTree_setNodeText = function(nodeNo,text) {
var anchor = this.findElement('a_' + nodeNo);
if (anchor) {
anchor.setAttribute('zenText',text);
anchor.innerHTML = text + '&#160;';
}
}

self._ZEN_Component_dynaTree_setNodeValue = function(nodeNo,value) {
var anchor = this.findElement('a_' + nodeNo);
if (anchor) {
anchor.setAttribute('zenValue',value);
}
}

self._ZEN_Component_dynaTree_setProperty = function(property,value,value2) {
switch(property) {
case 'OnGetTreeInfo':
if (this.OnGetTreeInfo != value) {
this.OnGetTreeInfo = value;
this.refreshContents(true);
}
break;
case 'OnGetNodeInfo':
if (this.OnGetNodeInfo != value) {
this.OnGetNodeInfo = value;
this.refreshContents(true);
}
break;
case 'showFolders':
case 'childIndent':
case 'imageExpanded':
case 'imageContracted':
case 'imageFolderOpen':
case 'imageFolderClosed':
if (this[property] != value) {
this[property] = value;
this.refreshContents();
}
break;
case 'showLines':
value = value ? true : false;
if (this.showLines != value) {
this.showLines = value;
this.refreshContents();
}
break;
case 'parameters':
if ('' != value) {
if (this.parameters[value]) {
if (this.parameters[value].value != value2) {
this.parameters[value].value = value2;
this.refreshContents();
}
}
}
break;
case 'text':
case 'value':
break;
case 'selectedIndex':
this.selectItem(value);
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_Component_dynaTree_toggleExpanded = function(nodeNo) {
var anchor = this.findElement('a_' + nodeNo);
var div = this.findElement('exp_' + nodeNo);
zenASSERT(div,'Unable to find div element for children',arguments);
var img = this.findElement('image_' + nodeNo);
var icon = this.findElement('icon_' + nodeNo);
var expanded = !(div.style.display == '');
div.style.display = expanded ? '' : 'none';
if (img) {
img.src = this.getExpandoImage(img.src, expanded);
}
if (icon) {
if (this.showFolders||this.showLines) {
icon.src = expanded ? this.imageFolderOpen : this.imageFolderClosed;
}
else {
icon.src = '';
}
}
if (anchor && expanded && (1 == parseInt(anchor.getAttribute('zenLoad')))) {
anchor.setAttribute('zenLoad',0);
var state = anchor.getAttribute('zenState');
var value = anchor.getAttribute('zenValue');
var level = parseInt(anchor.getAttribute('zenLevel'));
div.innerHTML = '<div style="font-size:8pt; color: blue; padding-left:'+((level+2)*16)+ 'px;">loading...</div>';
this.LoadSubTree(nodeNo,level,value,state);
}
return false;
}

self._ZEN_Component_dynaTree_LoadSubTree = function(pNodeNo,pLevel,pValue,pState) {
	zenInstanceMethod(this,'LoadSubTree','L,L,L,L','',arguments);
}

self._ZEN_Component_dynaTree_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_dynaTree__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_ZEN_Component_dynaTree.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _ZEN_Component_dynaTree.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_dynaTree;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.dynaTree';
	p._type = 'dynaTree';
	p.serialize = _ZEN_Component_dynaTree_serialize;
	p.getSettings = _ZEN_Component_dynaTree_getSettings;
	p.LoadSubTree = _ZEN_Component_dynaTree_LoadSubTree;
	p.ReallyRefreshContents = _ZEN_Component_dynaTree_ReallyRefreshContents;
	p.dragStartHandler = _ZEN_Component_dynaTree_dragStartHandler;
	p.expandAll = _ZEN_Component_dynaTree_expandAll;
	p.getExpandoImage = _ZEN_Component_dynaTree_getExpandoImage;
	p.getNodeParent = _ZEN_Component_dynaTree_getNodeParent;
	p.getNodeText = _ZEN_Component_dynaTree_getNodeText;
	p.getNodeValue = _ZEN_Component_dynaTree_getNodeValue;
	p.getSelectedIndex = _ZEN_Component_dynaTree_getSelectedIndex;
	p.getValue = _ZEN_Component_dynaTree_getValue;
	p.isNodeExpanded = _ZEN_Component_dynaTree_isNodeExpanded;
	p.itemClicked = _ZEN_Component_dynaTree_itemClicked;
	p.itemDblClicked = _ZEN_Component_dynaTree_itemDblClicked;
	p.itemKeyPress = _ZEN_Component_dynaTree_itemKeyPress;
	p.itemMouseDown = _ZEN_Component_dynaTree_itemMouseDown;
	p.itemMouseUp = _ZEN_Component_dynaTree_itemMouseUp;
	p.reloadNode = _ZEN_Component_dynaTree_reloadNode;
	p.selectItem = _ZEN_Component_dynaTree_selectItem;
	p.setNodeStyle = _ZEN_Component_dynaTree_setNodeStyle;
	p.setNodeText = _ZEN_Component_dynaTree_setNodeText;
	p.setNodeValue = _ZEN_Component_dynaTree_setNodeValue;
	p.setProperty = _ZEN_Component_dynaTree_setProperty;
	p.toggleExpanded = _ZEN_Component_dynaTree_toggleExpanded;
}
/* EOF */