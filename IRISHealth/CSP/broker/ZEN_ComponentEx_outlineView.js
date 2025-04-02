/*** Zen Module: ZEN_ComponentEx_outlineView ***/

self._zenClassIdx['outlineView'] = '_ZEN_ComponentEx_outlineView';
self._ZEN_ComponentEx_outlineView = function(index,id) {
	if (index>=0) {_ZEN_ComponentEx_outlineView__init(this,index,id);}
}

self._ZEN_ComponentEx_outlineView__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.childIndent = '30';
	o.lineSpacing = '10';
	o.maxLevels = '5';
	o.ondeletenode = '';
	o.ondrawnode = '';
	o.oneditcomplete = '';
	o.ongetdata = '';
	o.ongetnodechildren = '';
	o.ongetnodeeditor = '';
	o.ongetnodestyle = '';
	o.onmovenode = '';
	o.onselectnode = '';
	o.selectedItem = '-1';
	o.selectedItems = new Array();
	o.showVirtualNodes = false;
}
function _ZEN_ComponentEx_outlineView_serialize(set,s)
{
	var o = this;s[0]='3012006761';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.childIndent;s[9]=o.containerStyle;s[10]=(o.dragEnabled?1:0);s[11]=(o.dropEnabled?1:0);s[12]=(o.dynamic?1:0);s[13]=o.enclosingClass;s[14]=o.enclosingStyle;s[15]=o.error;s[16]=o.height;s[17]=(o.hidden?1:0);s[18]=o.hint;s[19]=o.hintClass;s[20]=o.hintStyle;s[21]=o.label;s[22]=o.labelClass;s[23]=o.labelDisabledClass;s[24]=o.labelStyle;s[25]=o.lineSpacing;s[26]=o.maxLevels;s[27]=o.onafterdrag;s[28]=o.onbeforedrag;s[29]=o.ondeletenode;s[30]=o.ondrag;s[31]=o.ondrawnode;s[32]=o.ondrop;s[33]=o.oneditcomplete;s[34]=o.ongetdata;s[35]=o.ongetnodechildren;s[36]=o.ongetnodeeditor;s[37]=o.ongetnodestyle;s[38]=o.onhide;s[39]=o.onmovenode;s[40]=o.onrefresh;s[41]=o.onselectnode;s[42]=o.onshow;s[43]=o.onupdate;s[44]=o.overlayMode;s[45]=o.renderFlag;s[46]=o.selectedItem;s[47]=set.serializeList(o,o.selectedItems,false,'selectedItems');s[48]=(o.showLabel?1:0);s[49]=(o.showVirtualNodes?1:0);s[50]=o.slice;s[51]=o.title;s[52]=o.tuple;s[53]=o.valign;s[54]=(o.visible?1:0);s[55]=o.width;
}
function _ZEN_ComponentEx_outlineView_getSettings(s)
{
	s['name'] = 'string';
	s['childIndent'] = 'integer';
	s['lineSpacing'] = 'integer';
	s['maxLevels'] = 'integer';
	s['ondeletenode'] = 'eventHandler';
	s['ondrawnode'] = 'eventHandler';
	s['oneditcomplete'] = 'eventHandler';
	s['ongetdata'] = 'eventHandler';
	s['ongetnodechildren'] = 'eventHandler';
	s['ongetnodeeditor'] = 'eventHandler';
	s['ongetnodestyle'] = 'eventHandler';
	s['onmovenode'] = 'eventHandler';
	s['onselectnode'] = 'eventHandler';
	s['showVirtualNodes'] = 'boolean';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_ComponentEx_outlineView_adjustChildren = function(node,level,hidden) {
var contracted = ('undefined' == typeof node._contracted) ? false : node._contracted;
var hidden = ('undefined' == typeof hidden) ? false : hidden;
var totalH = 0;
var xIndent = parseInt(this.childIndent);
var ySpace = parseInt(this.lineSpacing);
var x = parseInt(node._x) + parseInt(xIndent);
var y = parseInt(node._y) + parseInt(node._div.offsetHeight);
var children = this.getNodeChildren(node);
if (children) {
for (var n = 0; n < children.length; n++) {
var child = children[n];
if (!hidden && !contracted) {
child._div.style.display = '';
child._link.style.display = '';
y += ySpace;
totalH += ySpace;
this.moveNode(child, x, y);
var childH = this.adjustChildren(child,level+1);
y += childH + child._div.offsetHeight;
totalH += childH + child._div.offsetHeight;
}
else {
child._div.style.display = 'none';
child._link.style.display = 'none';
this.adjustChildren(child,level+1,true);
}
}
}
return totalH;
}

self._ZEN_ComponentEx_outlineView_canIndentNode = function(nodeIndex) {
try {
if ('undefined' == typeof nodeIndex) {
nodeIndex = this.selectedItem;
}
var node = this.getNode(nodeIndex);
if (!node || !node._parent) {
return false;
}
if ('' != this.onmovenode) {
if (!zenInvokeCallbackMethod(this.onmovenode,this,'onmovenode','node',node,'which','in')) {
return false;
}
}
var parent = node._parent;
var pchildren = this.getNodeChildren(parent);
var idx = node._childNo;
if (pchildren.length > 1) {
var sibling = pchildren[idx-1];
if (sibling) {
return true;
}
}
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in outdentNode.');
}
return false;
}

self._ZEN_ComponentEx_outlineView_canMoveNodeDown = function(nodeIndex) {
try {
if ('undefined' == typeof nodeIndex) {
nodeIndex = this.selectedItem;
}
var node = this.getNode(nodeIndex);
if (!node || !node._parent) {
return false;
}
if ('' != this.onmovenode) {
if (!zenInvokeCallbackMethod(this.onmovenode,this,'onmovenode','node',node,'which','down')) {
return false;
}
}
var parent = node._parent;
var idx = node._childNo;
var pchildren = this.getNodeChildren(parent);
if (idx < pchildren.length - 1) {
var sibling = pchildren[idx+1];
if ('' != this.onmovenode) {
if (!zenInvokeCallbackMethod(this.onmovenode,this,'onmovenode','node',sibling,'which','down')) {
return false;
}
}
return true;
}
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in canMoveNodeDown');
}
return false;
}

self._ZEN_ComponentEx_outlineView_canMoveNodeUp = function(nodeIndex) {
try {
if ('undefined' == typeof nodeIndex) {
nodeIndex = this.selectedItem;
}
var node = this.getNode(nodeIndex);
if (!node || !node._parent) {
return false;
}
if ('' != this.onmovenode) {
if (!zenInvokeCallbackMethod(this.onmovenode,this,'onmovenode','node',node,'which','up')) {
return false;
}
}
var parent = node._parent;
var idx = node._childNo;
if (idx > 0) {
var pchildren = this.getNodeChildren(parent);
var sibling = pchildren[idx-1];
if ('' != this.onmovenode) {
if (!zenInvokeCallbackMethod(this.onmovenode,this,'onmovenode','node',sibling,'which','down')) {
return false;
}
}
return true;
}
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in canMoveNodeUp');
}
return false;
}

self._ZEN_ComponentEx_outlineView_canOutdentNode = function(nodeIndex) {
try {
if ('undefined' == typeof nodeIndex) {
nodeIndex = this.selectedItem;
}
var node = this.getNode(nodeIndex);
if (!node || !node._parent || node._level <= 1) {
return false;
}
if ('' != this.onmovenode) {
if (!zenInvokeCallbackMethod(this.onmovenode,this,'onmovenode','node',node,'which','out')) {
return false;
}
}
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in outdentNode.');
}
return true;
}

self._ZEN_ComponentEx_outlineView_connectNodes = function(node) {
try {
node._div = this.findElement('node_' + node._index);
if (node._parent) {
node._link = this.findElement('nodeLink_' + node._index);
}
var children = this.getNodeChildren(node);
if (children) {
for (var n = 0; n < children.length; n++) {
var child = children[n];
this.connectNodes(child);
}
}
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in connectNodes.');
}
}

self._ZEN_ComponentEx_outlineView_contractNode = function(nodeIndex,flag) {
try {
if ('undefined' == typeof flag) {
flag = true;
}
if ('undefined' == typeof nodeIndex) {
nodeIndex = this.selectedItem;
}
var node = this.getNode(nodeIndex);
if (!node) {
return;
}
if ('' != this.onmovenode) {
if (!zenInvokeCallbackMethod(this.onmovenode,this,'onmovenode','node',node,'which',flag?'expand':'contract')) {
return;
}
}
node._contracted = flag;
this.updateLayout();
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in contractNode.');
}
}

self._ZEN_ComponentEx_outlineView_decorateTree = function(node,parent,level) {
if ('undefined' == typeof parent) {
this.nodeIndex = new Array();
}
else {
node._parent = parent;
}
if ('undefined' == typeof level) {
level = 0;
}
node._level = level;
node._index = this.nodeIndex.length;
this.nodeIndex[this.nodeIndex.length] = node;
var children = this.getNodeChildren(node);
if (children) {
for (var n = 0; n < children.length; n++) {
var child = children[n];
child._childNo = n;
this.decorateTree(child, node, level + 1);
}
if (this.showVirtualNodes && children.length > 0) {
this._counter = this._counter ? this._counter+1 : 1; // !!!
var closeNode = new Object();
this.getNodeChildren(closeNode,true);
closeNode._parent = node;
var idx = children.length;
children[idx] = closeNode;
closeNode.caption = 'VIRTUAL ' + this._counter;
closeNode._childNo = idx;
closeNode._relatedNode = node; // this is set for virtual nodes
closeNode._type = 'virtual';
closeNode._level = level + 1;
closeNode._index = this.nodeIndex.length;
this.nodeIndex[this.nodeIndex.length] = closeNode;
}
}
}

self._ZEN_ComponentEx_outlineView_dragStartHandler = function(dragData) {
var ok = false;
var dragItem = this._dragSource;
if (null != dragItem) {
delete this._dragSource;
var node = this.getNode(dragItem);
if (node) {
dragData.sourceItem = node._index;
ok = true;
dragData.value = node._index; // !!! function
dragData.text = node.caption;
var icon = node._div.cloneNode(true);
icon.style.position ="absolute";
icon.style.width = node._div.offsetWidth + 'px';
icon.style.border = "1px solid darkgray";
ZLM.setDragAvatar(icon);
}
}
return ok;
}

self._ZEN_ComponentEx_outlineView_dropStartHandler = function(dragData) {
var value = dragData.value;
var text = dragData.text;
var tgtId = ZLM.getDragInnerDestination().id;
var srcId = ZLM.getDragInnerSource().id;
var t = tgtId.toString().split('_');
var tgtIndex = -1;
var tgtAction = '';
switch(t[0]) {
case 'node':
tgtAction = 'r';
tgtIndex = t[1];
break;
case 'drop':
tgtAction = t[2];
tgtIndex = t[1];
break;
default:
break;
}
dragData.targetItem = tgtIndex;
var srcIndex = dragData.sourceItem;
var fromSelf = (this == dragData.sourceComponent);
switch(tgtAction) {
case 'r':
var node = this.getNode(tgtIndex);
if (node) {
node.caption = dragData.text;
node._div.innerHTML = this.getNodeContent(node,false); //!!!
}
break;
}
return true;
}

self._ZEN_ComponentEx_outlineView_editNode = function(nodeIndex) {
try {
if ('undefined' == typeof nodeIndex) {
nodeIndex = this.selectedItem;
}
var node = this.getNode(nodeIndex);
if (!node) {
return;
}
node._focusId = '';
this._editNode = node;
var html = '';
if (this.ongetnodeeditor) {
html = zenInvokeCallbackMethod(this.ongetnodeeditor,this,'ongetnodeeditor','node',node);
}
if (html == '') {
return;
}
this._editorHTML = html;
this._nodeDiv = node._div;
if (html != '') {
zenPage.startModal(this);
}
if ('' != node._focusId) {
var ctrl = self.document.getElementById(node._focusId);
if (ctrl) {
try {
ctrl.focus();
ctrl.select();
}
catch(ex) {
}
}
}
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in editNode.');
}
}

self._ZEN_ComponentEx_outlineView_expandNode = function(nodeIndex) {
try {
if ('undefined' == typeof nodeIndex) {
nodeIndex = this.selectedItem;
}
this.contractNode(nodeIndex,false);
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in expandNode.');
}
}

self._ZEN_ComponentEx_outlineView_getDropDownDiv = function() {
return self.document.getElementById('zenModalDiv');
}

self._ZEN_ComponentEx_outlineView_getNode = function(nodeIndex) {
return this.nodeIndex ? this.nodeIndex[nodeIndex] : null;
}

self._ZEN_ComponentEx_outlineView_getNodeChildren = function(node,create) {
if (null == node) return null;
if ('' != this.ongetnodechildren) {
return zenInvokeCallbackMethod(this.ongetnodechildren,this,'ongetnodechildren','node',node,'create',create);
}
if (create && !node.children) {
node.children = new Array();
}
return node.children;
}

self._ZEN_ComponentEx_outlineView_getNodeContent = function(node,selected) {
var usercode = '';
if (this.ondrawnode) {
usercode = zenInvokeCallbackMethod(this.ondrawnode,this,'ondrawnode','node',node,'selected',selected);
}
if (usercode && ('' != usercode)) {
data = usercode;
}
else {
data = '<nobr>' + (node.caption ? node.caption : '') + '</nobr>';
}
return data;
}

self._ZEN_ComponentEx_outlineView_getNodeHTML = function(node,level) {
var html = new Array();
var className = (node._index==this.selectedItem) ? 'zovNodeSelected' : 'zovNode';
var style = this.getNodeStyle(node, (node._index==this.selectedItem));
var id = this.makeId('node_' + node._index);
html[html.length] = '<div ' +
'id="'+id+'" ' +
'class="'+className+'" ' +
'style="'+style+'position:absolute;" ' +
'onmouseover="return zenPage.getComponent('+this.index+').nodeMouseHandler(event,\'over\','+node._index+');" ' +
'onmouseout="return zenPage.getComponent('+this.index+').nodeMouseHandler(event,\'out\','+node._index+');" ' +
'onclick="return zenPage.getComponent('+this.index+').nodeClickHandler(event,'+node._index+');" ';
if (this.dragEnabled) {
html[html.length] = 'onmouseover="return zenPage.getComponent('+this.index+').nodeMouseDownHandler(event,'+node._index+');" ';
html[html.length] = 'onmouseout="return zenPage.getComponent('+this.index+').nodeMouseUpHandler(event,'+node._index+');" ';
}
html[html.length] = '>';
html[html.length] = this.getNodeContent(node, (node._index==this.selectedItem));
html[html.length] = '</div>';
if (node._parent) {
var lid = this.makeId('nodeLink_' + node._index);
html[html.length] = '<div class="zovLink" style="position:absolute;" id="'+lid+'" > </div>';
}
var children = this.getNodeChildren(node);
if (children) {
for (var n = 0; n < children.length; n++) {
var child = children[n];
html[html.length] = this.getNodeHTML(child, level+1);
}
}
return html.join('');
}

self._ZEN_ComponentEx_outlineView_getNodeStyle = function(node,selected) {
var style = '';
if (this.ongetnodestyle) {
style = zenInvokeCallbackMethod(this.ongetnodestyle,this,'ongetnodestyle','node',node,'selected',selected);
}
return style;
}

self._ZEN_ComponentEx_outlineView_getSelectedItem = function() {
return (-1 == this.selectedItem) ? null : this.selectedItem;
}

self._ZEN_ComponentEx_outlineView_getSelectedItems = function() {
return this.selectedItems;
}

self._ZEN_ComponentEx_outlineView_getTreeGraph = function() {
return zenInvokeCallbackMethod(this.ongetdata,this,'ongetdata');
}

self._ZEN_ComponentEx_outlineView_getTreeHTML = function() {
var html = new Array();
this.removeVirtualNodes();
this.nodeIndex = new Array();
var graph = this.getTreeGraph();
if (graph) {
this.decorateTree(graph);
html[html.length] = this.getNodeHTML(graph,0);
}
return html.join('');
}

self._ZEN_ComponentEx_outlineView_indentNode = function(nodeIndex) {
try {
if ('undefined' == typeof nodeIndex) {
nodeIndex = this.selectedItem;
}
var node = this.getNode(nodeIndex);
if (!node || !node._parent) {
return;
}
if ('' != this.onmovenode) {
if (!zenInvokeCallbackMethod(this.onmovenode,this,'onmovenode','node',node,'which','in')) {
return;
}
}
var parent = node._parent;
var pchildren = this.getNodeChildren(parent);
var idx = node._childNo;
if (pchildren.length > 1) {
var sibling = pchildren[idx-1];
if (sibling) {
var schildren = this.getNodeChildren(sibling,true);
schildren[schildren.length] = node;
node._childNo = schildren.length - 1;
node._parent = sibling;
node._level = node._level + 1;
pchildren.splice(idx,1);
for (n = idx; n < pchildren.length; n++) {
pchildren[n]._childNo = n;
}
this.renderContents();
}
}
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in indentNode.');
}
}

self._ZEN_ComponentEx_outlineView_isSelected = function(item) {
if (null == item) {
return false;
}
for (var i = 0; i < this.selectedItems.length; i++) {
if (this.selectedItems[i] == item) {
return true;
}
}
return false;
}

self._ZEN_ComponentEx_outlineView_moveNode = function(node,x,y) {
var index = node._index;
node._x = parseInt(x+0.5);
node._y = parseInt(y+0.5);
var div = node._div;
var x = node._x;
var y = node._y;
div.style.left = x + 'px';
div.style.top = y +'px';
if ((div.offsetLeft + div.offsetWidth) > (this._width + 60)) {
this._width = div.offsetLeft + div.offsetWidth + 60;
}
var link = node._link;
if (link && node._parent) {
var x = node._parent._x + 5;
var y = node._parent._y + node._parent._div.offsetHeight;
var h = node._y - y + div.offsetHeight/2;
var w = node._x - x;
link.style.left = x + 'px';
link.style.top = y +'px';
link.style.height = h + 'px';
link.style.width = w + 'px';
}
}

self._ZEN_ComponentEx_outlineView_moveNodeDown = function(nodeIndex) {
try {
if ('undefined' == typeof nodeIndex) {
nodeIndex = this.selectedItem;
}
var node = this.getNode(nodeIndex);
if (!node || !node._parent) {
return;
}
if ('' != this.onmovenode) {
if (!zenInvokeCallbackMethod(this.onmovenode,this,'onmovenode','node',node,'which','down')) {
return;
}
}
var parent = node._parent;
var idx = node._childNo;
var pchildren = this.getNodeChildren(parent);
if (idx < pchildren.length - 1) {
var sibling = pchildren[idx+1];
if ('' != this.onmovenode) {
if (!zenInvokeCallbackMethod(this.onmovenode,this,'onmovenode','node',sibling,'which','down')) {
return;
}
}
sibling._childNo = idx;
node._childNo = idx+1;
pchildren[idx] = sibling;
pchildren[idx+1] = node;
this.updateLayout();
}
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in moveNodeDown.');
}
}

self._ZEN_ComponentEx_outlineView_moveNodeUp = function(nodeIndex) {
try {
if ('undefined' == typeof nodeIndex) {
nodeIndex = this.selectedItem;
}
var node = this.getNode(nodeIndex);
if (!node || !node._parent) {
return;
}
if ('' != this.onmovenode) {
if (!zenInvokeCallbackMethod(this.onmovenode,this,'onmovenode','node',node,'which','up')) {
return;
}
}
var parent = node._parent;
var idx = node._childNo;
if (idx > 0) {
var pchildren = this.getNodeChildren(parent);
var sibling = pchildren[idx-1];
if ('' != this.onmovenode) {
if (!zenInvokeCallbackMethod(this.onmovenode,this,'onmovenode','node',sibling,'which','down')) {
return;
}
}
sibling._childNo = idx;
node._childNo = idx-1;
pchildren[idx] = sibling;
pchildren[idx-1] = node;
this.updateLayout();
}
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in moveNodeUp.');
}
}

self._ZEN_ComponentEx_outlineView_nodeClickHandler = function(evt,nodeIndex) {
evt = evt ? evt : window.event;
if (evt.preventDefault) { evt.preventDefault();	}
else {evt.returnValue = false; }
if (evt.stopPropagation) { evt.stopPropagation(); }
else { evt.cancelBubble = true;	}
this.selectItem(nodeIndex,evt.ctrlKey);
return true;
}

self._ZEN_ComponentEx_outlineView_nodeMouseDownHandler = function(evt,nodeIndex) {
if (this.dragEnabled) {
evt = evt ? evt : window.event;
if (evt.preventDefault) {
evt.preventDefault();
}
this._dragSource = nodeIndex;
if (nodeIndex != this.selectedItem) {
this.selectItem(nodeIndex,evt.ctrlKey);
}
return false;
}
return true;
}

self._ZEN_ComponentEx_outlineView_nodeMouseHandler = function(evt,flag,nodeIndex) {
evt = evt ? evt : window.event;
if (evt.preventDefault) { evt.preventDefault();	}
else {evt.returnValue = false; }
if (evt.stopPropagation) { evt.stopPropagation(); }
else { evt.cancelBubble = true;	}
var node = this.getNode(nodeIndex);
if (nodeIndex != this.selectedItem) {
node._div.className = (flag=='over') ? 'zovNodeHover' : 'zovNode';
}
else {
node._div.className = 'zovNodeSelected';
}
}

self._ZEN_ComponentEx_outlineView_nodeMouseUpHandler = function(evt) {
if (this.dragEnabled) {
evt = evt ? evt : window.event;
if (evt.preventDefault) {
evt.preventDefault();
}
delete this._dragSource;
return false;
}
return true;
}

self._ZEN_ComponentEx_outlineView_onEndModalHandler = function(zindex) {
var ok = false;
if ('' != this.oneditcomplete) {
var ok = zenInvokeCallbackMethod(this.oneditcomplete,this,'oneditcomplete','node',this._editNode);
}
var div = this.getDropDownDiv();
delete this._nodeDiv;
delete this.editNode;
div.style.cssText = "display:none;";
div.className = "";
div.mousedown = null;
div.mouseup = null;
if (ok) {
this.renderContents();
}
}

self._ZEN_ComponentEx_outlineView_onStartModalHandler = function(zindex) {
var div = this.getDropDownDiv();
zenASSERT(div,'Unable to find dropdown div',arguments);
div.innerHTML = this._editorHTML;
if (this._nodeDiv) {
var el = this._nodeDiv;
div.className = el.className;
div.style.cssText = el.style.cssText;
div.style.position = 'fixed';
div.style.background = '#FFEEAA';
var top = zenGetTop(el) + zenGetTopScroll(el);
var left = zenGetLeft(el) - zenGetLeftScroll(el);
div.style.top = top + 'px';
div.style.left = left + 'px';
div.style.width = 'auto';
div.style.height = 'auto';
}
div.style.zIndex = zindex;
div.style.display = "";
zenPage.lastModalIndex = this.index;
}

self._ZEN_ComponentEx_outlineView_outdentNode = function(nodeIndex) {
try {
if ('undefined' == typeof nodeIndex) {
nodeIndex = this.selectedItem;
}
var node = this.getNode(nodeIndex);
if (!node || !node._parent || node._level <= 1) {
return;
}
if ('' != this.onmovenode) {
if (!zenInvokeCallbackMethod(this.onmovenode,this,'onmovenode','node',node,'which','out')) {
return;
}
}
var parent = node._parent;
var grandparent = parent._parent;
var idx = node._childNo;
var pidx = parent._childNo;
var gpchildren = this.getNodeChildren(grandparent);
gpchildren.splice(pidx+1,0,node);
node._parent = grandparent;
for (n = pidx; n < gpchildren.length; n++) {
gpchildren[n]._childNo = n;
}
node._level = parent._level;
var pchildren = this.getNodeChildren(parent);
pchildren.splice(idx,1);
for (n = idx; n < pchildren.length; n++) {
var sibling = pchildren[n];
sibling._parent = node;
var children = this.getNodeChildren(node,true);
children[children.length] = sibling;
sibling._childNo = children.length - 1;
}
pchildren.splice(idx,pchildren.length - idx);
this.renderContents();
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in outdentNode.');
}
}

self._ZEN_ComponentEx_outlineView_removeNode = function(nodeIndex) {
try {
if ('undefined' == typeof nodeIndex) {
nodeIndex = this.selectedItem;
}
var node = this.getNode(nodeIndex);
if (!node || !node._parent) {
return;
}
if ('' != this.ondeletenode) {
if (!zenInvokeCallbackMethod(this.ondeletenode,this,'onmovenode','node',node)) {
return;
}
}
var parent = node._parent;
var idx = node._childNo;
var pchildren = this.getNodeChildren(parent);
pchildren.splice(idx,1);
for (n = idx; n < pchildren.length; n++) {
pchildren[n]._childNo = n;
}
this.selectedItems.length = 0;
this.selectedItem = -1;
this.renderContents();
}
catch(ex) {
zenExceptionHandler(ex,arguments,'Error in removeNode.');
}
}

self._ZEN_ComponentEx_outlineView_removeVirtualNodes = function() {
if (this.nodeIndex) {
for (var n = 0; n < this.nodeIndex.length; n++) {
var node = this.nodeIndex[n];
if (node._relatedNode) {
var children = this.getNodeChildren(node._parent);
if (children) {
children.splice(node._childNo,1)
}
delete node;
}
}
}
}

self._ZEN_ComponentEx_outlineView_renderContents = function() {
var div = this.getEnclosingDiv();
if (!div) return;
this._height = 0;
this._width = 0;
div.innerHTML = '';
var graph = this.getTreeGraph();
var html = new Array();
html[html.length] = '<div style="width:100%;height:100%;" onclick="return zenPage.getComponent('+this.index+').selectItem(null);">';
html[html.length] = '<div className="zovDiv" ' +
'id="'+this.makeId('wrapper')+'" ' +
'style="top:0px;left:0px;width:0px;height:0px;position:relative;" ' +
'>';
html[html.length] = this.getTreeHTML();
html[html.length] = '</div>'
html[html.length] = '</div>';
div.innerHTML = html.join('');
this._wrapper = this.findElement('wrapper');
var h = 50;
if (graph) {
this.connectNodes(graph);
h = graph._div.offsetHeight + parseInt(this.lineSpacing);;
this.moveNode(graph,5,5);
h += this.adjustChildren(graph,0);
}
this._height = h;
this._wrapper.style.width = this._width + 'px';
this._wrapper.style.height = this._height + 'px';
}

self._ZEN_ComponentEx_outlineView_selectItem = function(item,add) {
var itemreq = item;
var	reselect = false;
add = false; /// !!! no multi-select for now!!!
if (add) {
for (var i = 0; i < this.selectedItems.length; i++) {
if (this.selectedItems[i] == item) {
this.selectedItems.splice(i,1);
var node = this.getNode(item);
if (node) {
node._div.className = 'zovNode';
node._div.innerHTML = this.getNodeContent(node, false);
}
break;
}
}
}
else {
if (item && this.isSelected(item)) {
reselect = true;
}
}
if (!add) {
for (var i = 0; i < this.selectedItems.length; i++) {
var old = this.selectedItems[i];
this.selectedItems[i] = null;
var node = this.getNode(old);
if (node) {
node._div.className = 'zovNode';
node._div.innerHTML = this.getNodeContent(node, false);
}
}
this.selectedItems.length = 0;
}
this.selectedItem = -1;
if (null != item) {
this.selectedItem = item;
this.selectedItems[this.selectedItems.length] = item;
var node = this.getNode(item);
if (node) {
node._div.className = 'zovNodeSelected';
node._div.innerHTML = this.getNodeContent(node, (node._index==this.selectedItem));
}
}
else {
node = null;
}
var notify = true;
if (this.selectItemHandler) {
notify = this.selectItemHandler(node,add);
}
this.updateLayout();
if (notify && !reselect) {
zenInvokeCallbackMethod(this.onselectnode,this,'onselectnode','node',node);
}
}

self._ZEN_ComponentEx_outlineView_updateLayout = function() {
var graph = this.getTreeGraph();
var h = graph._div.offsetHeight + parseInt(this.lineSpacing);
this._height = h + this.adjustChildren(graph,0);
var div = this._wrapper;
div.style.width = this._width + 'px';
div.style.height = this._height + 'px';
}

self._ZEN_ComponentEx_outlineView_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_ComponentEx_outlineView__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_ZEN_ComponentEx_outlineView.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _ZEN_ComponentEx_outlineView.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_ComponentEx_outlineView;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.ComponentEx.outlineView';
	p._type = 'outlineView';
	p.serialize = _ZEN_ComponentEx_outlineView_serialize;
	p.getSettings = _ZEN_ComponentEx_outlineView_getSettings;
	p.ReallyRefreshContents = _ZEN_ComponentEx_outlineView_ReallyRefreshContents;
	p.adjustChildren = _ZEN_ComponentEx_outlineView_adjustChildren;
	p.canIndentNode = _ZEN_ComponentEx_outlineView_canIndentNode;
	p.canMoveNodeDown = _ZEN_ComponentEx_outlineView_canMoveNodeDown;
	p.canMoveNodeUp = _ZEN_ComponentEx_outlineView_canMoveNodeUp;
	p.canOutdentNode = _ZEN_ComponentEx_outlineView_canOutdentNode;
	p.connectNodes = _ZEN_ComponentEx_outlineView_connectNodes;
	p.contractNode = _ZEN_ComponentEx_outlineView_contractNode;
	p.decorateTree = _ZEN_ComponentEx_outlineView_decorateTree;
	p.dragStartHandler = _ZEN_ComponentEx_outlineView_dragStartHandler;
	p.dropStartHandler = _ZEN_ComponentEx_outlineView_dropStartHandler;
	p.editNode = _ZEN_ComponentEx_outlineView_editNode;
	p.expandNode = _ZEN_ComponentEx_outlineView_expandNode;
	p.getDropDownDiv = _ZEN_ComponentEx_outlineView_getDropDownDiv;
	p.getNode = _ZEN_ComponentEx_outlineView_getNode;
	p.getNodeChildren = _ZEN_ComponentEx_outlineView_getNodeChildren;
	p.getNodeContent = _ZEN_ComponentEx_outlineView_getNodeContent;
	p.getNodeHTML = _ZEN_ComponentEx_outlineView_getNodeHTML;
	p.getNodeStyle = _ZEN_ComponentEx_outlineView_getNodeStyle;
	p.getSelectedItem = _ZEN_ComponentEx_outlineView_getSelectedItem;
	p.getSelectedItems = _ZEN_ComponentEx_outlineView_getSelectedItems;
	p.getTreeGraph = _ZEN_ComponentEx_outlineView_getTreeGraph;
	p.getTreeHTML = _ZEN_ComponentEx_outlineView_getTreeHTML;
	p.indentNode = _ZEN_ComponentEx_outlineView_indentNode;
	p.isSelected = _ZEN_ComponentEx_outlineView_isSelected;
	p.moveNode = _ZEN_ComponentEx_outlineView_moveNode;
	p.moveNodeDown = _ZEN_ComponentEx_outlineView_moveNodeDown;
	p.moveNodeUp = _ZEN_ComponentEx_outlineView_moveNodeUp;
	p.nodeClickHandler = _ZEN_ComponentEx_outlineView_nodeClickHandler;
	p.nodeMouseDownHandler = _ZEN_ComponentEx_outlineView_nodeMouseDownHandler;
	p.nodeMouseHandler = _ZEN_ComponentEx_outlineView_nodeMouseHandler;
	p.nodeMouseUpHandler = _ZEN_ComponentEx_outlineView_nodeMouseUpHandler;
	p.onEndModalHandler = _ZEN_ComponentEx_outlineView_onEndModalHandler;
	p.onStartModalHandler = _ZEN_ComponentEx_outlineView_onStartModalHandler;
	p.outdentNode = _ZEN_ComponentEx_outlineView_outdentNode;
	p.removeNode = _ZEN_ComponentEx_outlineView_removeNode;
	p.removeVirtualNodes = _ZEN_ComponentEx_outlineView_removeVirtualNodes;
	p.renderContents = _ZEN_ComponentEx_outlineView_renderContents;
	p.selectItem = _ZEN_ComponentEx_outlineView_selectItem;
	p.updateLayout = _ZEN_ComponentEx_outlineView_updateLayout;
}
/* EOF */