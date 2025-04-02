/*** Zen Module: CSP_UI_Component ***/

self._zenClassIdx['RoleMemberTab'] = '_CSP_UI_Component_RoleMemberTab';
self._CSP_UI_Component_RoleMemberTab = function(index,id) {
	if (index>=0) {_CSP_UI_Component_RoleMemberTab__init(this,index,id);}
}

self._CSP_UI_Component_RoleMemberTab__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.PID = '';
	o.Type = '';
	o.avaList = 'avaList';
	o.readOnly = false;
	o.selList = 'selList';
}
function _CSP_UI_Component_RoleMemberTab_serialize(set,s)
{
	var o = this;s[0]='2054183597';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.PID;s[7]=o.Type;s[8]=o.align;s[9]=o.aux;s[10]=o.avaList;s[11]=o.containerStyle;s[12]=(o.dragEnabled?1:0);s[13]=(o.dropEnabled?1:0);s[14]=(o.dynamic?1:0);s[15]=o.enclosingClass;s[16]=o.enclosingStyle;s[17]=o.error;s[18]=o.height;s[19]=(o.hidden?1:0);s[20]=o.hint;s[21]=o.hintClass;s[22]=o.hintStyle;s[23]=o.label;s[24]=o.labelClass;s[25]=o.labelDisabledClass;s[26]=o.labelStyle;s[27]=o.onafterdrag;s[28]=o.onbeforedrag;s[29]=o.ondrag;s[30]=o.ondrop;s[31]=o.onhide;s[32]=o.onrefresh;s[33]=o.onshow;s[34]=o.onupdate;s[35]=o.overlayMode;s[36]=(o.readOnly?1:0);s[37]=o.renderFlag;s[38]=o.selList;s[39]=(o.showLabel?1:0);s[40]=o.slice;s[41]=o.title;s[42]=o.tuple;s[43]=o.valign;s[44]=(o.visible?1:0);s[45]=o.width;
}
function _CSP_UI_Component_RoleMemberTab_getSettings(s)
{
	s['name'] = 'string';
	s['PID'] = 'string';
	s['Type'] = 'string';
	s['avaList'] = 'string';
	s['readOnly'] = 'boolean';
	s['selList'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._CSP_UI_Component_RoleMemberTab_clearList = function(listID,isPage) {
if (isPage == 1) {
var list = document.getElementById(listID);
} else {
var list = this.findElement(listID);
}
for (var i=list.options.length-1;i>=1;i--) {
list.remove(i);
}
}

self._CSP_UI_Component_RoleMemberTab_doAssignRole = function(grantOption) {
var oldSynchronousMode = zenSynchronousMode;
zenSynchronousMode = true;
if (this.Type == "Users") {
var delim = "*";
} else {
var delim = ","
}
var roleList = this.getSelList(delim,false,false);
if (roleList == "") {
var msg = $$$Text("No role selected. Nothing to assign.");
alert(msg);
return false;
}
var st = this.AssignRoles(this.PID,roleList,grantOption);
if (st != 1) {
alert(st);
} else {
this.refreshContents();
}
zenSynchronousMode = oldSynchronousMode;
}

self._CSP_UI_Component_RoleMemberTab_doChangeGrantOption = function(roleID,isChecked) {
var oldSynchronousMode = zenSynchronousMode;
zenSynchronousMode = true;
var st = this.AssignRoles(this.PID,roleID,isChecked);
if (st != 1) {
alert(st);
this.refreshContents();
}
zenSynchronousMode = oldSynchronousMode;
}

self._CSP_UI_Component_RoleMemberTab_doRadioChange = function(newVal) {
this.Type = newVal;
this.UpdateType(newVal);
this.refreshContents();
}

self._CSP_UI_Component_RoleMemberTab_doRemoveAllRoles = function() {
var oldSynchronousMode = zenSynchronousMode;
zenSynchronousMode = true;
var st = this.RemoveAllRoles(this.PID);
if (st != 1) {
alert(st);
} else {
this.refreshContents();
}
zenSynchronousMode = oldSynchronousMode;
}

self._CSP_UI_Component_RoleMemberTab_doRemoveRole = function(roleID,type) {
var oldSynchronousMode = zenSynchronousMode;
zenSynchronousMode = true;
var st = this.RemoveRole(this.PID,roleID,type);
if (st != 1) {
alert(st);
} else {
this.refreshContents();
}
zenSynchronousMode = oldSynchronousMode;
}

self._CSP_UI_Component_RoleMemberTab_doSelectBoxMove = function(flag,isPage) {
if (isPage == 1) {
var avaList = document.getElementById(this.avaList);
var selList = document.getElementById(this.selList);
} else {
var avaList = this.findElement(this.avaList);
var selList = this.findElement(this.selList);
}
switch (flag) {
case "selectOne":
this.doSelectBoxMoveList(avaList,selList);
break;
case "deselectOne":
this.doSelectBoxMoveList(selList,avaList);
break;
case "selectAll":
this.doSelectBoxMoveAll(avaList,selList);
break;
case "deselectAll":
this.doSelectBoxMoveAll(selList,avaList);
break;
case "moveUp":
this.doSelectBoxMoveItem(selList,true);
break;
case "moveDown":
this.doSelectBoxMoveItem(selList,false);
break;
}
if (this.onSelectBoxMove) {
ok = this.onSelectBoxMove(flag, isPage);
}
}

self._CSP_UI_Component_RoleMemberTab_doSelectBoxMoveAll = function(from,to) {
var len = from.options.length;
for(var i=0;i<len;i++) {
var o = from.options[i];
if (o.value != "_") to.options[to.options.length] =  new Option(o.text,o.value,false,true);
}
var len = len - 1;
for(var i=len;i>=0;i--) {
var o = from.options[i];
if (o.value != "_") from.options[i] = null;
}
to.selectedIndex = to.options.length-1;
to.focus;
}

self._CSP_UI_Component_RoleMemberTab_doSelectBoxMoveItem = function(list,bUp) {
var currentIdx = list.selectedIndex;
if (currentIdx == -1) return false;
if (list.options[currentIdx].value == "_") return false;
var newIdx = bUp ? currentIdx - 1 : currentIdx + 1;
if (newIdx < 1 || newIdx > (list.options.length - 1) ) return false;
var sSwap = list[newIdx].value;
var sSwapText = list[newIdx].text;
var sTarget = list[currentIdx].value;
var sTargetText = list[currentIdx].text;
list[newIdx].value = sTarget;
list[newIdx].text = sTargetText;
list[currentIdx].value = sSwap;
list[currentIdx].text = sSwapText;
list.selectedIndex = newIdx;
return false;
}

self._CSP_UI_Component_RoleMemberTab_doSelectBoxMoveList = function(from,to) {
var len = from.options.length;
var o;
for(var i=0;i<len;i++) {
o = from.options[i];
if (o.selected) {
if (o.value != "_") {
to.options[to.options.length] = new Option(o.text,o.value,false,true);
}
}
}
for(var i=len-1;i>=0;i--) {
o = from.options[i];
if (o.selected) {
if (o.value != "_") {
from.options[i] = null;
}
}
}
from.selectedIndex = from.options.length > 1 ? 1 : -1
}

self._CSP_UI_Component_RoleMemberTab_getSelList = function(delim,includeLeadingDelim,isPage) {
if (isPage == 1) {
var selList = document.getElementById(this.selList);
} else {
var selList = this.findElement(this.selList);
}
var returnList = ""
for (var i = 1; i < selList.length; i++) {
if (includeLeadingDelim || (returnList != "")) returnList = returnList + delim;
returnList = returnList + selList.options[i].value;
}
return returnList;
}

self._CSP_UI_Component_RoleMemberTab_AssignRoles = function(PID,MemberList,GrantOption) {
	return zenInstanceMethod(this,'AssignRoles','L,L,B','VARCHAR',arguments);
}

self._CSP_UI_Component_RoleMemberTab_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}

self._CSP_UI_Component_RoleMemberTab_RemoveAllRoles = function(PID) {
	return zenInstanceMethod(this,'RemoveAllRoles','L','VARCHAR',arguments);
}

self._CSP_UI_Component_RoleMemberTab_RemoveRole = function(PID,Member,Type) {
	return zenInstanceMethod(this,'RemoveRole','L,L,L','VARCHAR',arguments);
}

self._CSP_UI_Component_RoleMemberTab_UpdateType = function(newVal) {
	return zenClassMethod(this,'UpdateType','L','STATUS',arguments);
}
self._CSP_UI_Component_RoleMemberTab__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_CSP_UI_Component_RoleMemberTab.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _CSP_UI_Component_RoleMemberTab.prototype;
	if (null==p) {return;}
	p.constructor = _CSP_UI_Component_RoleMemberTab;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%CSP.UI.Component.RoleMemberTab';
	p._type = 'RoleMemberTab';
	p.serialize = _CSP_UI_Component_RoleMemberTab_serialize;
	p.getSettings = _CSP_UI_Component_RoleMemberTab_getSettings;
	p.AssignRoles = _CSP_UI_Component_RoleMemberTab_AssignRoles;
	p.ReallyRefreshContents = _CSP_UI_Component_RoleMemberTab_ReallyRefreshContents;
	p.RemoveAllRoles = _CSP_UI_Component_RoleMemberTab_RemoveAllRoles;
	p.RemoveRole = _CSP_UI_Component_RoleMemberTab_RemoveRole;
	p.UpdateType = _CSP_UI_Component_RoleMemberTab_UpdateType;
	p.clearList = _CSP_UI_Component_RoleMemberTab_clearList;
	p.doAssignRole = _CSP_UI_Component_RoleMemberTab_doAssignRole;
	p.doChangeGrantOption = _CSP_UI_Component_RoleMemberTab_doChangeGrantOption;
	p.doRadioChange = _CSP_UI_Component_RoleMemberTab_doRadioChange;
	p.doRemoveAllRoles = _CSP_UI_Component_RoleMemberTab_doRemoveAllRoles;
	p.doRemoveRole = _CSP_UI_Component_RoleMemberTab_doRemoveRole;
	p.doSelectBoxMove = _CSP_UI_Component_RoleMemberTab_doSelectBoxMove;
	p.doSelectBoxMoveAll = _CSP_UI_Component_RoleMemberTab_doSelectBoxMoveAll;
	p.doSelectBoxMoveItem = _CSP_UI_Component_RoleMemberTab_doSelectBoxMoveItem;
	p.doSelectBoxMoveList = _CSP_UI_Component_RoleMemberTab_doSelectBoxMoveList;
	p.getSelList = _CSP_UI_Component_RoleMemberTab_getSelList;
}

self._zenClassIdx['SQLPrivileges'] = '_CSP_UI_Component_SQLPrivileges';
self._CSP_UI_Component_SQLPrivileges = function(index,id) {
	if (index>=0) {_CSP_UI_Component_SQLPrivileges__init(this,index,id);}
}

self._CSP_UI_Component_SQLPrivileges__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.PID = '';
	o.avaList = 'avaList';
	o.namespace = '';
	o.nsDisplayList = '';
	o.nsValueList = '';
	o.readOnly = false;
	o.selList = 'selList';
}
function _CSP_UI_Component_SQLPrivileges_serialize(set,s)
{
	var o = this;s[0]='1498503031';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.PID;s[7]=o.align;s[8]=o.aux;s[9]=o.avaList;s[10]=o.containerStyle;s[11]=(o.dragEnabled?1:0);s[12]=(o.dropEnabled?1:0);s[13]=(o.dynamic?1:0);s[14]=o.enclosingClass;s[15]=o.enclosingStyle;s[16]=o.error;s[17]=o.height;s[18]=(o.hidden?1:0);s[19]=o.hint;s[20]=o.hintClass;s[21]=o.hintStyle;s[22]=o.label;s[23]=o.labelClass;s[24]=o.labelDisabledClass;s[25]=o.labelStyle;s[26]=o.namespace;s[27]=o.nsDisplayList;s[28]=o.nsValueList;s[29]=o.onafterdrag;s[30]=o.onbeforedrag;s[31]=o.ondrag;s[32]=o.ondrop;s[33]=o.onhide;s[34]=o.onrefresh;s[35]=o.onshow;s[36]=o.onupdate;s[37]=o.overlayMode;s[38]=(o.readOnly?1:0);s[39]=o.renderFlag;s[40]=o.selList;s[41]=(o.showLabel?1:0);s[42]=o.slice;s[43]=o.title;s[44]=o.tuple;s[45]=o.valign;s[46]=(o.visible?1:0);s[47]=o.width;
}
function _CSP_UI_Component_SQLPrivileges_getSettings(s)
{
	s['name'] = 'string';
	s['PID'] = 'string';
	s['avaList'] = 'string';
	s['namespace'] = 'string';
	s['nsDisplayList'] = 'string';
	s['nsValueList'] = 'string';
	s['readOnly'] = 'boolean';
	s['selList'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._CSP_UI_Component_SQLPrivileges_changeNS = function(sel) {
var newVal = sel.options[sel.selectedIndex].value;
zenPage.changeNS(newVal);
}

self._CSP_UI_Component_SQLPrivileges_clearList = function(listID,isPage) {
if (isPage == 1) {
var list = document.getElementById(listID);
} else {
var list = this.findElement(listID);
}
for (var i=list.options.length-1;i>=1;i--) {
list.remove(i);
}
}

self._CSP_UI_Component_SQLPrivileges_doAssignPriv = function(grantOption) {
var oldSynchronousMode = zenSynchronousMode;
zenSynchronousMode = true;
var privList = this.getSelList(",",false,false);
if (privList == "") {
var msg = $$$Text("No role selected. Nothing to assign.");
alert(msg);
return false;
}
var st = this.AssignPrivs(this.PID,privList,grantOption,this.namespace);
if (st != 1) {
alert(st);
} else {
this.refreshContents();
}
zenSynchronousMode = oldSynchronousMode;
}

self._CSP_UI_Component_SQLPrivileges_doChangeGrantOption = function(priv,isChecked) {
var oldSynchronousMode = zenSynchronousMode;
zenSynchronousMode = true;
var st = this.AssignPrivs(this.PID,priv,Number(isChecked),this.namespace)
if (st != 1) {
alert(st);
this.refreshContents();
}
zenSynchronousMode = oldSynchronousMode;
}

self._CSP_UI_Component_SQLPrivileges_doRemoveAllPrivs = function() {
var oldSynchronousMode = zenSynchronousMode;
zenSynchronousMode = true;
var st = this.RemoveAllPrivs(this.PID,this.namespace);
if (st != 1) {
alert(st);
} else {
this.refreshContents();
}
zenSynchronousMode = oldSynchronousMode;
}

self._CSP_UI_Component_SQLPrivileges_doRemovePriv = function(priv) {
var oldSynchronousMode = zenSynchronousMode;
zenSynchronousMode = true;
var st = this.RemovePriv(this.PID,priv,this.namespace);
if (st != 1) {
alert(st);
} else {
this.refreshContents();
}
zenSynchronousMode = oldSynchronousMode;
}

self._CSP_UI_Component_SQLPrivileges_doSelectBoxMove = function(flag,isPage) {
if (isPage == 1) {
var avaList = document.getElementById(this.avaList);
var selList = document.getElementById(this.selList);
} else {
var avaList = this.findElement(this.avaList);
var selList = this.findElement(this.selList);
}
switch (flag) {
case "selectOne":
this.doSelectBoxMoveList(avaList,selList);
break;
case "deselectOne":
this.doSelectBoxMoveList(selList,avaList);
break;
case "selectAll":
this.doSelectBoxMoveAll(avaList,selList);
break;
case "deselectAll":
this.doSelectBoxMoveAll(selList,avaList);
break;
case "moveUp":
this.doSelectBoxMoveItem(selList,true);
break;
case "moveDown":
this.doSelectBoxMoveItem(selList,false);
break;
}
if (this.onSelectBoxMove) {
ok = this.onSelectBoxMove(flag, isPage);
}
}

self._CSP_UI_Component_SQLPrivileges_doSelectBoxMoveAll = function(from,to) {
var len = from.options.length;
for(var i=0;i<len;i++) {
var o = from.options[i];
if (o.value != "_") to.options[to.options.length] =  new Option(o.text,o.value,false,true);
}
var len = len - 1;
for(var i=len;i>=0;i--) {
var o = from.options[i];
if (o.value != "_") from.options[i] = null;
}
to.selectedIndex = to.options.length-1;
to.focus;
}

self._CSP_UI_Component_SQLPrivileges_doSelectBoxMoveItem = function(list,bUp) {
var currentIdx = list.selectedIndex;
if (currentIdx == -1) return false;
if (list.options[currentIdx].value == "_") return false;
var newIdx = bUp ? currentIdx - 1 : currentIdx + 1;
if (newIdx < 1 || newIdx > (list.options.length - 1) ) return false;
var sSwap = list[newIdx].value;
var sSwapText = list[newIdx].text;
var sTarget = list[currentIdx].value;
var sTargetText = list[currentIdx].text;
list[newIdx].value = sTarget;
list[newIdx].text = sTargetText;
list[currentIdx].value = sSwap;
list[currentIdx].text = sSwapText;
list.selectedIndex = newIdx;
return false;
}

self._CSP_UI_Component_SQLPrivileges_doSelectBoxMoveList = function(from,to) {
var len = from.options.length;
var o;
for(var i=0;i<len;i++) {
o = from.options[i];
if (o.selected) {
if (o.value != "_") {
to.options[to.options.length] = new Option(o.text,o.value,false,true);
}
}
}
for(var i=len-1;i>=0;i--) {
o = from.options[i];
if (o.selected) {
if (o.value != "_") {
from.options[i] = null;
}
}
}
from.selectedIndex = from.options.length > 1 ? 1 : -1
}

self._CSP_UI_Component_SQLPrivileges_getSelList = function(delim,includeLeadingDelim,isPage) {
if (isPage == 1) {
var selList = document.getElementById(this.selList);
} else {
var selList = this.findElement(this.selList);
}
var returnList = ""
for (var i = 1; i < selList.length; i++) {
if (includeLeadingDelim || (returnList != "")) returnList = returnList + delim;
returnList = returnList + selList.options[i].value;
}
return returnList;
}

self._CSP_UI_Component_SQLPrivileges_AssignPrivs = function(PID,Privs,GrantOption,Namespace) {
	return zenInstanceMethod(this,'AssignPrivs','L,L,B,L','VARCHAR',arguments);
}

self._CSP_UI_Component_SQLPrivileges_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}

self._CSP_UI_Component_SQLPrivileges_RemoveAllPrivs = function(PID,Namespace) {
	return zenInstanceMethod(this,'RemoveAllPrivs','L,L','VARCHAR',arguments);
}

self._CSP_UI_Component_SQLPrivileges_RemovePriv = function(PID,Privs,Namespace) {
	return zenInstanceMethod(this,'RemovePriv','L,L,L','VARCHAR',arguments);
}
self._CSP_UI_Component_SQLPrivileges__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_CSP_UI_Component_SQLPrivileges.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _CSP_UI_Component_SQLPrivileges.prototype;
	if (null==p) {return;}
	p.constructor = _CSP_UI_Component_SQLPrivileges;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%CSP.UI.Component.SQLPrivileges';
	p._type = 'SQLPrivileges';
	p.serialize = _CSP_UI_Component_SQLPrivileges_serialize;
	p.getSettings = _CSP_UI_Component_SQLPrivileges_getSettings;
	p.AssignPrivs = _CSP_UI_Component_SQLPrivileges_AssignPrivs;
	p.ReallyRefreshContents = _CSP_UI_Component_SQLPrivileges_ReallyRefreshContents;
	p.RemoveAllPrivs = _CSP_UI_Component_SQLPrivileges_RemoveAllPrivs;
	p.RemovePriv = _CSP_UI_Component_SQLPrivileges_RemovePriv;
	p.changeNS = _CSP_UI_Component_SQLPrivileges_changeNS;
	p.clearList = _CSP_UI_Component_SQLPrivileges_clearList;
	p.doAssignPriv = _CSP_UI_Component_SQLPrivileges_doAssignPriv;
	p.doChangeGrantOption = _CSP_UI_Component_SQLPrivileges_doChangeGrantOption;
	p.doRemoveAllPrivs = _CSP_UI_Component_SQLPrivileges_doRemoveAllPrivs;
	p.doRemovePriv = _CSP_UI_Component_SQLPrivileges_doRemovePriv;
	p.doSelectBoxMove = _CSP_UI_Component_SQLPrivileges_doSelectBoxMove;
	p.doSelectBoxMoveAll = _CSP_UI_Component_SQLPrivileges_doSelectBoxMoveAll;
	p.doSelectBoxMoveItem = _CSP_UI_Component_SQLPrivileges_doSelectBoxMoveItem;
	p.doSelectBoxMoveList = _CSP_UI_Component_SQLPrivileges_doSelectBoxMoveList;
	p.getSelList = _CSP_UI_Component_SQLPrivileges_getSelList;
}

self._zenClassIdx['SQLTables'] = '_CSP_UI_Component_SQLTables';
self._CSP_UI_Component_SQLTables = function(index,id) {
	if (index>=0) {_CSP_UI_Component_SQLTables__init(this,index,id);}
}

self._CSP_UI_Component_SQLTables__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.PID = '';
	o.avaList = 'avaList';
	o.includeSystem = '0';
	o.namespace = '';
	o.nsDisplayList = '';
	o.nsValueList = '';
	o.pageType = '';
	o.readOnly = false;
	o.resultsMaxPage = '';
	o.resultsPage = '1';
	o.resultsPageSize = '100';
	o.selList = 'selList';
	o.showSystemBox = false;
	o.tab = '';
	o.type = '';
	o.usePaging = true;
}
function _CSP_UI_Component_SQLTables_serialize(set,s)
{
	var o = this;s[0]='1392894067';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.PID;s[7]=o.align;s[8]=o.aux;s[9]=o.avaList;s[10]=o.containerStyle;s[11]=(o.dragEnabled?1:0);s[12]=(o.dropEnabled?1:0);s[13]=(o.dynamic?1:0);s[14]=o.enclosingClass;s[15]=o.enclosingStyle;s[16]=o.error;s[17]=o.height;s[18]=(o.hidden?1:0);s[19]=o.hint;s[20]=o.hintClass;s[21]=o.hintStyle;s[22]=o.includeSystem;s[23]=o.label;s[24]=o.labelClass;s[25]=o.labelDisabledClass;s[26]=o.labelStyle;s[27]=o.namespace;s[28]=o.nsDisplayList;s[29]=o.nsValueList;s[30]=o.onafterdrag;s[31]=o.onbeforedrag;s[32]=o.ondrag;s[33]=o.ondrop;s[34]=o.onhide;s[35]=o.onrefresh;s[36]=o.onshow;s[37]=o.onupdate;s[38]=o.overlayMode;s[39]=o.pageType;s[40]=(o.readOnly?1:0);s[41]=o.renderFlag;s[42]=o.resultsMaxPage;s[43]=o.resultsPage;s[44]=o.resultsPageSize;s[45]=o.selList;s[46]=(o.showLabel?1:0);s[47]=(o.showSystemBox?1:0);s[48]=o.slice;s[49]=o.tab;s[50]=o.title;s[51]=o.tuple;s[52]=o.type;s[53]=(o.usePaging?1:0);s[54]=o.valign;s[55]=(o.visible?1:0);s[56]=o.width;
}
function _CSP_UI_Component_SQLTables_getSettings(s)
{
	s['name'] = 'string';
	s['PID'] = 'string';
	s['avaList'] = 'string';
	s['includeSystem'] = 'integer';
	s['namespace'] = 'string';
	s['nsDisplayList'] = 'string';
	s['nsValueList'] = 'string';
	s['pageType'] = 'enum:Users,Roles';
	s['readOnly'] = 'boolean';
	s['resultsMaxPage'] = 'integer';
	s['resultsPage'] = 'integer';
	s['resultsPageSize'] = 'integer';
	s['selList'] = 'string';
	s['showSystemBox'] = 'boolean';
	s['tab'] = 'integer';
	s['type'] = 'string';
	s['usePaging'] = 'boolean';
	this.invokeSuper('getSettings',arguments);
}

self._CSP_UI_Component_SQLTables_changeNS = function(sel) {
var newVal = sel.options[sel.selectedIndex].value;
zenPage.changeNS(newVal);
}

self._CSP_UI_Component_SQLTables_changeSysItems = function(chbox) {
var newVal = Number(chbox.checked);
this.includeSystem = newVal;
this.SetIncludeSystem(newVal);
this.refreshContents();
}

self._CSP_UI_Component_SQLTables_clearList = function(listID,isPage) {
if (isPage == 1) {
var list = document.getElementById(listID);
} else {
var list = this.findElement(listID);
}
for (var i=list.options.length-1;i>=1;i--) {
list.remove(i);
}
}

self._CSP_UI_Component_SQLTables_doLaunchColumns = function(PID,objName) {
var url = zenLink('%CSP.UI.Portal.Dialog.ColumnPriv.zen?Type='+this.type+'&PID='+encodeURIComponent(PID)+'&IncludeSystem='+this.includeSystem+'&ObjName='+encodeURIComponent(objName)+'&$NAMESPACE='+encodeURIComponent(this.namespace));
zenLaunchPopupWindow(url,this.type+'-UserColumns','status,scrollbars,resizable=yes,width=900,height=700');
}

self._CSP_UI_Component_SQLTables_doLaunchMLConfigurations = function(PID,objName,objPriv) {
var url = zenLink('%CSP.UI.Portal.Dialog.MLConfigurationPriv.zen?Type='+this.type+'&PID='+encodeURIComponent(PID)+'&IncludeSystem='+this.includeSystem+'&ObjName='+encodeURIComponent(objName)+'&ObjPriv='+encodeURIComponent(objPriv)+'&$NAMESPACE='+encodeURIComponent(this.namespace));
zenLaunchPopupWindow(url,this.type+'-UserSchemas','status,scrollbars,resizable=yes,width=700,height=700');
}

self._CSP_UI_Component_SQLTables_doLaunchSchemas = function(PID,objName,objPriv) {
var url = zenLink('%CSP.UI.Portal.Dialog.SchemaPriv.zen?Type='+this.type+'&PID='+encodeURIComponent(PID)+'&IncludeSystem='+this.includeSystem+'&ObjName='+encodeURIComponent(objName)+'&ObjPriv='+encodeURIComponent(objPriv)+'&$NAMESPACE='+encodeURIComponent(this.namespace));
zenLaunchPopupWindow(url,this.type+'-UserSchemas','status,scrollbars,resizable=yes,width=700,height=700');
}

self._CSP_UI_Component_SQLTables_doRevokeObj = function(PID,tblname,grantedby) {
var oldSynchronousMode = zenSynchronousMode;
zenSynchronousMode = true;
var st = this.RevokeRow(this.namespace,PID,tblname,"*",this.tab,this.pageType,grantedby);
if (st != "") {
alert(st);
} else {
this.refreshContents();
}
zenSynchronousMode = oldSynchronousMode;
}

self._CSP_UI_Component_SQLTables_doSelectBoxMove = function(flag,isPage) {
if (isPage == 1) {
var avaList = document.getElementById(this.avaList);
var selList = document.getElementById(this.selList);
} else {
var avaList = this.findElement(this.avaList);
var selList = this.findElement(this.selList);
}
switch (flag) {
case "selectOne":
this.doSelectBoxMoveList(avaList,selList);
break;
case "deselectOne":
this.doSelectBoxMoveList(selList,avaList);
break;
case "selectAll":
this.doSelectBoxMoveAll(avaList,selList);
break;
case "deselectAll":
this.doSelectBoxMoveAll(selList,avaList);
break;
case "moveUp":
this.doSelectBoxMoveItem(selList,true);
break;
case "moveDown":
this.doSelectBoxMoveItem(selList,false);
break;
}
if (this.onSelectBoxMove) {
ok = this.onSelectBoxMove(flag, isPage);
}
}

self._CSP_UI_Component_SQLTables_doSelectBoxMoveAll = function(from,to) {
var len = from.options.length;
for(var i=0;i<len;i++) {
var o = from.options[i];
if (o.value != "_") to.options[to.options.length] =  new Option(o.text,o.value,false,true);
}
var len = len - 1;
for(var i=len;i>=0;i--) {
var o = from.options[i];
if (o.value != "_") from.options[i] = null;
}
to.selectedIndex = to.options.length-1;
to.focus;
}

self._CSP_UI_Component_SQLTables_doSelectBoxMoveItem = function(list,bUp) {
var currentIdx = list.selectedIndex;
if (currentIdx == -1) return false;
if (list.options[currentIdx].value == "_") return false;
var newIdx = bUp ? currentIdx - 1 : currentIdx + 1;
if (newIdx < 1 || newIdx > (list.options.length - 1) ) return false;
var sSwap = list[newIdx].value;
var sSwapText = list[newIdx].text;
var sTarget = list[currentIdx].value;
var sTargetText = list[currentIdx].text;
list[newIdx].value = sTarget;
list[newIdx].text = sTargetText;
list[currentIdx].value = sSwap;
list[currentIdx].text = sSwapText;
list.selectedIndex = newIdx;
return false;
}

self._CSP_UI_Component_SQLTables_doSelectBoxMoveList = function(from,to) {
var len = from.options.length;
var o;
for(var i=0;i<len;i++) {
o = from.options[i];
if (o.selected) {
if (o.value != "_") {
to.options[to.options.length] = new Option(o.text,o.value,false,true);
}
}
}
for(var i=len-1;i>=0;i--) {
o = from.options[i];
if (o.selected) {
if (o.value != "_") {
from.options[i] = null;
}
}
}
from.selectedIndex = from.options.length > 1 ? 1 : -1
}

self._CSP_UI_Component_SQLTables_getSelList = function(delim,includeLeadingDelim,isPage) {
if (isPage == 1) {
var selList = document.getElementById(this.selList);
} else {
var selList = this.findElement(this.selList);
}
var returnList = ""
for (var i = 1; i < selList.length; i++) {
if (includeLeadingDelim || (returnList != "")) returnList = returnList + delim;
returnList = returnList + selList.options[i].value;
}
return returnList;
}

self._CSP_UI_Component_SQLTables_gotoPage = function(pageNo) {
if (pageNo > this.resultsMaxPage) {
pageNo = this.resultsMaxPage;
} else if (pageNo < 1) {
pageNo = 1;
}
var pageChanged = this.resultsPage = pageNo;
this.resultsPage = pageNo;
this.findElement('pageNo').value = pageNo;
if (pageChanged) {
this.refreshContents();
}
}

self._CSP_UI_Component_SQLTables_nextPage = function() {
this.gotoPage(parseInt(this.resultsPage)+1);
}

self._CSP_UI_Component_SQLTables_prevPage = function() {
this.gotoPage(parseInt(this.resultsPage)-1);
}

self._CSP_UI_Component_SQLTables_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}

self._CSP_UI_Component_SQLTables_RevokeRow = function(NAMESPACE,Grantee,cbState,sActs,tab,sType,GrantedBy) {
	return zenClassMethod(this,'RevokeRow','L,L,L,L,L,L,L','VARCHAR',arguments);
}

self._CSP_UI_Component_SQLTables_SetIncludeSystem = function(newVal) {
	zenClassMethod(this,'SetIncludeSystem','L','',arguments);
}
self._CSP_UI_Component_SQLTables__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_CSP_UI_Component_SQLTables.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _CSP_UI_Component_SQLTables.prototype;
	if (null==p) {return;}
	p.constructor = _CSP_UI_Component_SQLTables;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%CSP.UI.Component.SQLTables';
	p._type = 'SQLTables';
	p.serialize = _CSP_UI_Component_SQLTables_serialize;
	p.getSettings = _CSP_UI_Component_SQLTables_getSettings;
	p.ReallyRefreshContents = _CSP_UI_Component_SQLTables_ReallyRefreshContents;
	p.RevokeRow = _CSP_UI_Component_SQLTables_RevokeRow;
	p.SetIncludeSystem = _CSP_UI_Component_SQLTables_SetIncludeSystem;
	p.changeNS = _CSP_UI_Component_SQLTables_changeNS;
	p.changeSysItems = _CSP_UI_Component_SQLTables_changeSysItems;
	p.clearList = _CSP_UI_Component_SQLTables_clearList;
	p.doLaunchColumns = _CSP_UI_Component_SQLTables_doLaunchColumns;
	p.doLaunchMLConfigurations = _CSP_UI_Component_SQLTables_doLaunchMLConfigurations;
	p.doLaunchSchemas = _CSP_UI_Component_SQLTables_doLaunchSchemas;
	p.doRevokeObj = _CSP_UI_Component_SQLTables_doRevokeObj;
	p.doSelectBoxMove = _CSP_UI_Component_SQLTables_doSelectBoxMove;
	p.doSelectBoxMoveAll = _CSP_UI_Component_SQLTables_doSelectBoxMoveAll;
	p.doSelectBoxMoveItem = _CSP_UI_Component_SQLTables_doSelectBoxMoveItem;
	p.doSelectBoxMoveList = _CSP_UI_Component_SQLTables_doSelectBoxMoveList;
	p.getSelList = _CSP_UI_Component_SQLTables_getSelList;
	p.gotoPage = _CSP_UI_Component_SQLTables_gotoPage;
	p.nextPage = _CSP_UI_Component_SQLTables_nextPage;
	p.prevPage = _CSP_UI_Component_SQLTables_prevPage;
}

self._zenClassIdx['abstractRoleTab'] = '_CSP_UI_Component_abstractRoleTab';
self._CSP_UI_Component_abstractRoleTab = function(index,id) {
	if (index>=0) {_CSP_UI_Component_abstractRoleTab__init(this,index,id);}
}

self._CSP_UI_Component_abstractRoleTab__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.PID = '';
	o.avaList = 'avaList';
	o.readOnly = false;
	o.selList = 'selList';
	o.type = '';
}
function _CSP_UI_Component_abstractRoleTab_serialize(set,s)
{
	var o = this;s[0]='3855861879';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.PID;s[7]=o.align;s[8]=o.aux;s[9]=o.avaList;s[10]=o.containerStyle;s[11]=(o.dragEnabled?1:0);s[12]=(o.dropEnabled?1:0);s[13]=(o.dynamic?1:0);s[14]=o.enclosingClass;s[15]=o.enclosingStyle;s[16]=o.error;s[17]=o.height;s[18]=(o.hidden?1:0);s[19]=o.hint;s[20]=o.hintClass;s[21]=o.hintStyle;s[22]=o.label;s[23]=o.labelClass;s[24]=o.labelDisabledClass;s[25]=o.labelStyle;s[26]=o.onafterdrag;s[27]=o.onbeforedrag;s[28]=o.ondrag;s[29]=o.ondrop;s[30]=o.onhide;s[31]=o.onrefresh;s[32]=o.onshow;s[33]=o.onupdate;s[34]=o.overlayMode;s[35]=(o.readOnly?1:0);s[36]=o.renderFlag;s[37]=o.selList;s[38]=(o.showLabel?1:0);s[39]=o.slice;s[40]=o.title;s[41]=o.tuple;s[42]=o.type;s[43]=o.valign;s[44]=(o.visible?1:0);s[45]=o.width;
}
function _CSP_UI_Component_abstractRoleTab_getSettings(s)
{
	s['name'] = 'string';
	s['PID'] = 'string';
	s['avaList'] = 'string';
	s['readOnly'] = 'boolean';
	s['selList'] = 'string';
	s['type'] = 'enum:ApplicationRole,MatchRole,UserRole,RoleRole';
	this.invokeSuper('getSettings',arguments);
}

self._CSP_UI_Component_abstractRoleTab_clearList = function(listID,isPage) {
if (isPage == 1) {
var list = document.getElementById(listID);
} else {
var list = this.findElement(listID);
}
for (var i=list.options.length-1;i>=1;i--) {
list.remove(i);
}
}

self._CSP_UI_Component_abstractRoleTab_doRemoveAllRoles = function(type) {
var oldSynchronousMode = zenSynchronousMode;
zenSynchronousMode = true;
var st = this.RemoveAllRoles(this.PID,type);
if (st != 1) {
alert(st);
} else {
this.refreshContents();
}
zenSynchronousMode = oldSynchronousMode;
}

self._CSP_UI_Component_abstractRoleTab_doRemoveRole = function(roleID) {
var oldSynchronousMode = zenSynchronousMode;
zenSynchronousMode = true;
var st = this.RemoveRole(this.PID,roleID,this.type);
if (st != 1) {
alert(st);
} else {
this.refreshContents();
}
zenSynchronousMode = oldSynchronousMode;
}

self._CSP_UI_Component_abstractRoleTab_doSelectBoxMove = function(flag,isPage) {
if (isPage == 1) {
var avaList = document.getElementById(this.avaList);
var selList = document.getElementById(this.selList);
} else {
var avaList = this.findElement(this.avaList);
var selList = this.findElement(this.selList);
}
switch (flag) {
case "selectOne":
this.doSelectBoxMoveList(avaList,selList);
break;
case "deselectOne":
this.doSelectBoxMoveList(selList,avaList);
break;
case "selectAll":
this.doSelectBoxMoveAll(avaList,selList);
break;
case "deselectAll":
this.doSelectBoxMoveAll(selList,avaList);
break;
case "moveUp":
this.doSelectBoxMoveItem(selList,true);
break;
case "moveDown":
this.doSelectBoxMoveItem(selList,false);
break;
}
if (this.onSelectBoxMove) {
ok = this.onSelectBoxMove(flag, isPage);
}
}

self._CSP_UI_Component_abstractRoleTab_doSelectBoxMoveAll = function(from,to) {
var len = from.options.length;
for(var i=0;i<len;i++) {
var o = from.options[i];
if (o.value != "_") to.options[to.options.length] =  new Option(o.text,o.value,false,true);
}
var len = len - 1;
for(var i=len;i>=0;i--) {
var o = from.options[i];
if (o.value != "_") from.options[i] = null;
}
to.selectedIndex = to.options.length-1;
to.focus;
}

self._CSP_UI_Component_abstractRoleTab_doSelectBoxMoveItem = function(list,bUp) {
var currentIdx = list.selectedIndex;
if (currentIdx == -1) return false;
if (list.options[currentIdx].value == "_") return false;
var newIdx = bUp ? currentIdx - 1 : currentIdx + 1;
if (newIdx < 1 || newIdx > (list.options.length - 1) ) return false;
var sSwap = list[newIdx].value;
var sSwapText = list[newIdx].text;
var sTarget = list[currentIdx].value;
var sTargetText = list[currentIdx].text;
list[newIdx].value = sTarget;
list[newIdx].text = sTargetText;
list[currentIdx].value = sSwap;
list[currentIdx].text = sSwapText;
list.selectedIndex = newIdx;
return false;
}

self._CSP_UI_Component_abstractRoleTab_doSelectBoxMoveList = function(from,to) {
var len = from.options.length;
var o;
for(var i=0;i<len;i++) {
o = from.options[i];
if (o.selected) {
if (o.value != "_") {
to.options[to.options.length] = new Option(o.text,o.value,false,true);
}
}
}
for(var i=len-1;i>=0;i--) {
o = from.options[i];
if (o.selected) {
if (o.value != "_") {
from.options[i] = null;
}
}
}
from.selectedIndex = from.options.length > 1 ? 1 : -1
}

self._CSP_UI_Component_abstractRoleTab_getSelList = function(delim,includeLeadingDelim,isPage) {
if (isPage == 1) {
var selList = document.getElementById(this.selList);
} else {
var selList = this.findElement(this.selList);
}
var returnList = ""
for (var i = 1; i < selList.length; i++) {
if (includeLeadingDelim || (returnList != "")) returnList = returnList + delim;
returnList = returnList + selList.options[i].value;
}
return returnList;
}

self._CSP_UI_Component_abstractRoleTab_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._CSP_UI_Component_abstractRoleTab__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_CSP_UI_Component_abstractRoleTab.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _CSP_UI_Component_abstractRoleTab.prototype;
	if (null==p) {return;}
	p.constructor = _CSP_UI_Component_abstractRoleTab;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%CSP.UI.Component.abstractRoleTab';
	p._type = 'abstractRoleTab';
	p.serialize = _CSP_UI_Component_abstractRoleTab_serialize;
	p.getSettings = _CSP_UI_Component_abstractRoleTab_getSettings;
	p.ReallyRefreshContents = _CSP_UI_Component_abstractRoleTab_ReallyRefreshContents;
	p.clearList = _CSP_UI_Component_abstractRoleTab_clearList;
	p.doRemoveAllRoles = _CSP_UI_Component_abstractRoleTab_doRemoveAllRoles;
	p.doRemoveRole = _CSP_UI_Component_abstractRoleTab_doRemoveRole;
	p.doSelectBoxMove = _CSP_UI_Component_abstractRoleTab_doSelectBoxMove;
	p.doSelectBoxMoveAll = _CSP_UI_Component_abstractRoleTab_doSelectBoxMoveAll;
	p.doSelectBoxMoveItem = _CSP_UI_Component_abstractRoleTab_doSelectBoxMoveItem;
	p.doSelectBoxMoveList = _CSP_UI_Component_abstractRoleTab_doSelectBoxMoveList;
	p.getSelList = _CSP_UI_Component_abstractRoleTab_getSelList;
}

self._zenClassIdx['certificateViewer'] = '_CSP_UI_Component_certificateViewer';
self._CSP_UI_Component_certificateViewer = function(index,id) {
	if (index>=0) {_CSP_UI_Component_certificateViewer__init(this,index,id);}
}

self._CSP_UI_Component_certificateViewer__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.Certificate = '';
	o.SubjectOnly = false;
}
function _CSP_UI_Component_certificateViewer_serialize(set,s)
{
	var o = this;s[0]='3626437315';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.Certificate;s[7]=(o.SubjectOnly?1:0);s[8]=o.align;s[9]=o.aux;s[10]=o.containerStyle;s[11]=(o.dragEnabled?1:0);s[12]=(o.dropEnabled?1:0);s[13]=(o.dynamic?1:0);s[14]=o.enclosingClass;s[15]=o.enclosingStyle;s[16]=o.error;s[17]=o.height;s[18]=(o.hidden?1:0);s[19]=o.hint;s[20]=o.hintClass;s[21]=o.hintStyle;s[22]=o.label;s[23]=o.labelClass;s[24]=o.labelDisabledClass;s[25]=o.labelStyle;s[26]=o.onafterdrag;s[27]=o.onbeforedrag;s[28]=o.ondrag;s[29]=o.ondrop;s[30]=o.onhide;s[31]=o.onrefresh;s[32]=o.onshow;s[33]=o.onupdate;s[34]=o.overlayMode;s[35]=o.renderFlag;s[36]=(o.showLabel?1:0);s[37]=o.slice;s[38]=o.title;s[39]=o.tuple;s[40]=o.valign;s[41]=(o.visible?1:0);s[42]=o.width;
}
function _CSP_UI_Component_certificateViewer_getSettings(s)
{
	s['name'] = 'string';
	s['Certificate'] = 'string';
	s['SubjectOnly'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._CSP_UI_Component_certificateViewer_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._CSP_UI_Component_certificateViewer__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_CSP_UI_Component_certificateViewer.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _CSP_UI_Component_certificateViewer.prototype;
	if (null==p) {return;}
	p.constructor = _CSP_UI_Component_certificateViewer;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%CSP.UI.Component.certificateViewer';
	p._type = 'certificateViewer';
	p.serialize = _CSP_UI_Component_certificateViewer_serialize;
	p.getSettings = _CSP_UI_Component_certificateViewer_getSettings;
	p.ReallyRefreshContents = _CSP_UI_Component_certificateViewer_ReallyRefreshContents;
}

self._zenClassIdx['ApplicationRoles'] = '_CSP_UI_Component_ApplicationRoles';
self._CSP_UI_Component_ApplicationRoles = function(index,id) {
	if (index>=0) {_CSP_UI_Component_ApplicationRoles__init(this,index,id);}
}

self._CSP_UI_Component_ApplicationRoles__init = function(o,index,id) {
	('undefined' == typeof _CSP_UI_Component_abstractRoleTab__init) ?zenMaster._CSP_UI_Component_abstractRoleTab__init(o,index,id):_CSP_UI_Component_abstractRoleTab__init(o,index,id);
	o.avaList = 'avaList';
	o.selList = 'selList';
}
function _CSP_UI_Component_ApplicationRoles_serialize(set,s)
{
	var o = this;s[0]='3855861879';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.PID;s[7]=o.align;s[8]=o.aux;s[9]=o.avaList;s[10]=o.containerStyle;s[11]=(o.dragEnabled?1:0);s[12]=(o.dropEnabled?1:0);s[13]=(o.dynamic?1:0);s[14]=o.enclosingClass;s[15]=o.enclosingStyle;s[16]=o.error;s[17]=o.height;s[18]=(o.hidden?1:0);s[19]=o.hint;s[20]=o.hintClass;s[21]=o.hintStyle;s[22]=o.label;s[23]=o.labelClass;s[24]=o.labelDisabledClass;s[25]=o.labelStyle;s[26]=o.onafterdrag;s[27]=o.onbeforedrag;s[28]=o.ondrag;s[29]=o.ondrop;s[30]=o.onhide;s[31]=o.onrefresh;s[32]=o.onshow;s[33]=o.onupdate;s[34]=o.overlayMode;s[35]=(o.readOnly?1:0);s[36]=o.renderFlag;s[37]=o.selList;s[38]=(o.showLabel?1:0);s[39]=o.slice;s[40]=o.title;s[41]=o.tuple;s[42]=o.type;s[43]=o.valign;s[44]=(o.visible?1:0);s[45]=o.width;
}
function _CSP_UI_Component_ApplicationRoles_getSettings(s)
{
	s['name'] = 'string';
	s['avaList'] = 'string';
	s['selList'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._CSP_UI_Component_ApplicationRoles_clearList = function(listID,isPage) {
if (isPage == 1) {
var list = document.getElementById(listID);
} else {
var list = this.findElement(listID);
}
for (var i=list.options.length-1;i>=1;i--) {
list.remove(i);
}
}

self._CSP_UI_Component_ApplicationRoles_doAssignRole = function(type,grantOption) {
var oldSynchronousMode = zenSynchronousMode;
zenSynchronousMode = true;
var matchrole = "";
if (type == 'MatchRole') {
matchrole = this.findElement('MatchRole').value;
if (matchrole == "") {
var msg = $$$Text("Please select a Matching Role.");
alert(msg);
this.findElement('MatchRole').focus();
return false;
}
}
var privs = this.getSelList(":",true,false);
if (privs == "") {
var msg = $$$Text("No role selected. Nothing to assign.");
alert(msg);
return false;
}
var st = this.AssignRole(this.PID,privs,matchrole);
if (st != 1) {
alert(st);
} else {
this.refreshContents();
}
zenSynchronousMode = oldSynchronousMode;
}

self._CSP_UI_Component_ApplicationRoles_doSelectBoxMove = function(flag,isPage) {
if (isPage == 1) {
var avaList = document.getElementById(this.avaList);
var selList = document.getElementById(this.selList);
} else {
var avaList = this.findElement(this.avaList);
var selList = this.findElement(this.selList);
}
switch (flag) {
case "selectOne":
this.doSelectBoxMoveList(avaList,selList);
break;
case "deselectOne":
this.doSelectBoxMoveList(selList,avaList);
break;
case "selectAll":
this.doSelectBoxMoveAll(avaList,selList);
break;
case "deselectAll":
this.doSelectBoxMoveAll(selList,avaList);
break;
case "moveUp":
this.doSelectBoxMoveItem(selList,true);
break;
case "moveDown":
this.doSelectBoxMoveItem(selList,false);
break;
}
if (this.onSelectBoxMove) {
ok = this.onSelectBoxMove(flag, isPage);
}
}

self._CSP_UI_Component_ApplicationRoles_doSelectBoxMoveAll = function(from,to) {
var len = from.options.length;
for(var i=0;i<len;i++) {
var o = from.options[i];
if (o.value != "_") to.options[to.options.length] =  new Option(o.text,o.value,false,true);
}
var len = len - 1;
for(var i=len;i>=0;i--) {
var o = from.options[i];
if (o.value != "_") from.options[i] = null;
}
to.selectedIndex = to.options.length-1;
to.focus;
}

self._CSP_UI_Component_ApplicationRoles_doSelectBoxMoveItem = function(list,bUp) {
var currentIdx = list.selectedIndex;
if (currentIdx == -1) return false;
if (list.options[currentIdx].value == "_") return false;
var newIdx = bUp ? currentIdx - 1 : currentIdx + 1;
if (newIdx < 1 || newIdx > (list.options.length - 1) ) return false;
var sSwap = list[newIdx].value;
var sSwapText = list[newIdx].text;
var sTarget = list[currentIdx].value;
var sTargetText = list[currentIdx].text;
list[newIdx].value = sTarget;
list[newIdx].text = sTargetText;
list[currentIdx].value = sSwap;
list[currentIdx].text = sSwapText;
list.selectedIndex = newIdx;
return false;
}

self._CSP_UI_Component_ApplicationRoles_doSelectBoxMoveList = function(from,to) {
var len = from.options.length;
var o;
for(var i=0;i<len;i++) {
o = from.options[i];
if (o.selected) {
if (o.value != "_") {
to.options[to.options.length] = new Option(o.text,o.value,false,true);
}
}
}
for(var i=len-1;i>=0;i--) {
o = from.options[i];
if (o.selected) {
if (o.value != "_") {
from.options[i] = null;
}
}
}
from.selectedIndex = from.options.length > 1 ? 1 : -1
}

self._CSP_UI_Component_ApplicationRoles_getSelList = function(delim,includeLeadingDelim,isPage) {
if (isPage == 1) {
var selList = document.getElementById(this.selList);
} else {
var selList = this.findElement(this.selList);
}
var returnList = ""
for (var i = 1; i < selList.length; i++) {
if (includeLeadingDelim || (returnList != "")) returnList = returnList + delim;
returnList = returnList + selList.options[i].value;
}
return returnList;
}

self._CSP_UI_Component_ApplicationRoles_AssignRole = function(PID,NewMatchElement,MatchRole) {
	return zenInstanceMethod(this,'AssignRole','L,L,L','VARCHAR',arguments);
}

self._CSP_UI_Component_ApplicationRoles_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}

self._CSP_UI_Component_ApplicationRoles_RemoveAllRoles = function(PID,Type) {
	return zenInstanceMethod(this,'RemoveAllRoles','L,L','VARCHAR',arguments);
}

self._CSP_UI_Component_ApplicationRoles_RemoveRole = function(PID,ElementId) {
	return zenInstanceMethod(this,'RemoveRole','L,L','VARCHAR',arguments);
}
self._CSP_UI_Component_ApplicationRoles__Loader = function() {
	zenLoadClass('_CSP_UI_Component_abstractRoleTab');
	_CSP_UI_Component_ApplicationRoles.prototype = zenCreate('_CSP_UI_Component_abstractRoleTab',-1);
	var p = _CSP_UI_Component_ApplicationRoles.prototype;
	if (null==p) {return;}
	p.constructor = _CSP_UI_Component_ApplicationRoles;
	p.superClass = ('undefined' == typeof _CSP_UI_Component_abstractRoleTab) ? zenMaster._CSP_UI_Component_abstractRoleTab.prototype:_CSP_UI_Component_abstractRoleTab.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%CSP.UI.Component.ApplicationRoles';
	p._type = 'ApplicationRoles';
	p.serialize = _CSP_UI_Component_ApplicationRoles_serialize;
	p.getSettings = _CSP_UI_Component_ApplicationRoles_getSettings;
	p.AssignRole = _CSP_UI_Component_ApplicationRoles_AssignRole;
	p.ReallyRefreshContents = _CSP_UI_Component_ApplicationRoles_ReallyRefreshContents;
	p.RemoveAllRoles = _CSP_UI_Component_ApplicationRoles_RemoveAllRoles;
	p.RemoveRole = _CSP_UI_Component_ApplicationRoles_RemoveRole;
	p.clearList = _CSP_UI_Component_ApplicationRoles_clearList;
	p.doAssignRole = _CSP_UI_Component_ApplicationRoles_doAssignRole;
	p.doSelectBoxMove = _CSP_UI_Component_ApplicationRoles_doSelectBoxMove;
	p.doSelectBoxMoveAll = _CSP_UI_Component_ApplicationRoles_doSelectBoxMoveAll;
	p.doSelectBoxMoveItem = _CSP_UI_Component_ApplicationRoles_doSelectBoxMoveItem;
	p.doSelectBoxMoveList = _CSP_UI_Component_ApplicationRoles_doSelectBoxMoveList;
	p.getSelList = _CSP_UI_Component_ApplicationRoles_getSelList;
}

self._zenClassIdx['SMPDynaTree'] = '_CSP_UI_Component_SMPDynaTree';
self._CSP_UI_Component_SMPDynaTree = function(index,id) {
	if (index>=0) {_CSP_UI_Component_SMPDynaTree__init(this,index,id);}
}

self._CSP_UI_Component_SMPDynaTree__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_dynaTree__init) ?zenMaster._ZEN_Component_dynaTree__init(o,index,id):_ZEN_Component_dynaTree__init(o,index,id);
}
function _CSP_UI_Component_SMPDynaTree_serialize(set,s)
{
	var o = this;s[0]='1332587112';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.OnGetNodeInfo;s[7]=o.OnGetTreeInfo;s[8]=o.align;s[9]=o.aux;s[10]=o.childIndent;s[11]=o.containerStyle;s[12]=o.dataGlobal;s[13]=(o.dragEnabled?1:0);s[14]=(o.dropEnabled?1:0);s[15]=(o.dynamic?1:0);s[16]=o.enclosingClass;s[17]=o.enclosingStyle;s[18]=o.error;s[19]=o.height;s[20]=(o.hidden?1:0);s[21]=o.hint;s[22]=o.hintClass;s[23]=o.hintStyle;s[24]=o.imageContracted;s[25]=o.imageExpanded;s[26]=o.imageFolderClosed;s[27]=o.imageFolderOpen;s[28]=o.imageNode;s[29]=o.label;s[30]=o.labelClass;s[31]=o.labelDisabledClass;s[32]=o.labelStyle;s[33]=o.nodeCount;s[34]=o.onafterdrag;s[35]=o.onbeforedrag;s[36]=o.onchange;s[37]=o.onclick;s[38]=o.ondblclick;s[39]=o.ondrag;s[40]=o.ondrop;s[41]=o.onhide;s[42]=o.onrefresh;s[43]=o.onshow;s[44]=o.onupdate;s[45]=o.overlayMode;s[46]=set.serializeArray(o,o.parameters,true,'parameters');s[47]=o.renderFlag;s[48]=o.selectedIndex;s[49]=(o.showFolders?1:0);s[50]=(o.showLabel?1:0);s[51]=(o.showLines?1:0);s[52]=o.slice;s[53]=o.text;s[54]=o.title;s[55]=o.tuple;s[56]=o.valign;s[57]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[58]=(o.visible?1:0);s[59]=o.width;
}
function _CSP_UI_Component_SMPDynaTree_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._CSP_UI_Component_SMPDynaTree_dragStartHandler = function(dragData) {
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
icon.style.border ="1px solid #cbcbcb";
icon.style.background ="#ffffff";
icon.style.padding = "4px 50px";
icon.style.zIndex = 10;
icon.style.boxShadow ="-2px 2px 4px rgba(0,0,0,.10)";
ZLM.setDragAvatar(icon);
}
}
return ok;
}

self._CSP_UI_Component_SMPDynaTree_LoadSubTree = function(pNodeNo,pLevel,pValue,pState) {
	zenInstanceMethod(this,'LoadSubTree','L,L,L,L','',arguments);
}

self._CSP_UI_Component_SMPDynaTree_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._CSP_UI_Component_SMPDynaTree__Loader = function() {
	zenLoadClass('_ZEN_Component_dynaTree');
	_CSP_UI_Component_SMPDynaTree.prototype = zenCreate('_ZEN_Component_dynaTree',-1);
	var p = _CSP_UI_Component_SMPDynaTree.prototype;
	if (null==p) {return;}
	p.constructor = _CSP_UI_Component_SMPDynaTree;
	p.superClass = ('undefined' == typeof _ZEN_Component_dynaTree) ? zenMaster._ZEN_Component_dynaTree.prototype:_ZEN_Component_dynaTree.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%CSP.UI.Component.SMPDynaTree';
	p._type = 'SMPDynaTree';
	p.serialize = _CSP_UI_Component_SMPDynaTree_serialize;
	p.getSettings = _CSP_UI_Component_SMPDynaTree_getSettings;
	p.LoadSubTree = _CSP_UI_Component_SMPDynaTree_LoadSubTree;
	p.ReallyRefreshContents = _CSP_UI_Component_SMPDynaTree_ReallyRefreshContents;
	p.dragStartHandler = _CSP_UI_Component_SMPDynaTree_dragStartHandler;
}

self._zenClassIdx['http://www.intersystems.com/zen/hs/SMPFinderPane'] = '_CSP_UI_Component_SMPFinderPane';
self._CSP_UI_Component_SMPFinderPane = function(index,id) {
	if (index>=0) {_CSP_UI_Component_SMPFinderPane__init(this,index,id);}
}

self._CSP_UI_Component_SMPFinderPane__init = function(o,index,id) {
	('undefined' == typeof _ZEN_ComponentEx_finderPane__init) ?zenMaster._ZEN_ComponentEx_finderPane__init(o,index,id):_ZEN_ComponentEx_finderPane__init(o,index,id);
	o.msgNoPriv = 'You do not have privilege to view this page.';
}
function _CSP_UI_Component_SMPFinderPane_serialize(set,s)
{
	var o = this;s[0]='3879434117';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=(o.animate?1:0);s[8]=o.aux;s[9]=o.caption;s[10]=o.columnWidth;s[11]=o.containerStyle;s[12]=(o.dragEnabled?1:0);s[13]=(o.dropEnabled?1:0);s[14]=(o.dynamic?1:0);s[15]=o.enclosingClass;s[16]=o.enclosingStyle;s[17]=o.error;s[18]=o.folderIcon;s[19]=o.height;s[20]=(o.hidden?1:0);s[21]=(o.hilightTop?1:0);s[22]=o.hint;s[23]=o.hintClass;s[24]=o.hintStyle;s[25]=o.itemIcon;s[26]=o.label;s[27]=o.labelClass;s[28]=o.labelDisabledClass;s[29]=o.labelStyle;s[30]=o.listColumns;s[31]=o.msgNoPriv;s[32]=o.onafterdrag;s[33]=o.onbeforedrag;s[34]=o.oncancel;s[35]=o.ondblclick;s[36]=o.ondrag;s[37]=o.ondrawdetails;s[38]=o.ondrawempty;s[39]=o.ondrawitem;s[40]=o.ondrop;s[41]=o.ongetdata;s[42]=o.ongeticon;s[43]=o.onhide;s[44]=o.onlazyload;s[45]=o.onrefresh;s[46]=o.onselectitem;s[47]=o.onshow;s[48]=o.onupdate;s[49]=o.overlayMode;s[50]=set.serializeArray(o,o.parameters,true,'parameters');s[51]=o.renderFlag;s[52]=(o.selectFirstOnIconDrillDown?1:0);s[53]=o.selectedList;s[54]=(o.showLabel?1:0);s[55]=o.slice;s[56]=o.title;s[57]=o.tuple;s[58]=o.upIcon;s[59]=o.valign;s[60]=o.viewType;s[61]=(o.visible?1:0);s[62]=o.width;
}
function _CSP_UI_Component_SMPFinderPane_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._CSP_UI_Component_SMPFinderPane_getFinderColumnHTML = function(graph,column,selectedList) {
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
var style = 'style="display: flex; justify-content: space-between;" ';
html[html.length] = '<a '+aid+style+tip+(enabled?'href="#" ':'')+click +dblclick+keypress+ '>';
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
html[html.length] = item.name;
html[html.length] = '<div class="columnImageSpace"><img src="portal/images/icon-arrow-blue-right.png" style="padding-left: 3px;" width="5" height="10"/></div>';
}
else {
var lbl = item.caption ? item.caption : item.name;
if (enabled) {
spanclick = ' onclick="zenPage.getComponent('+this.index+').itemDblClickHandler(event,\''+list2+'\');return true;";'
html[html.length] = '<span title="'+spanToolTip+'" onmousedown="return zenPage.getComponent('+this.index+').cancelEvent(event);" '+spanclick+' onmouseover="this.style.textDecoration=\'underline\';" onmouseout="this.style.textDecoration=\'none\';">' + lbl + '</span>';
html[html.length] = '<div class="columnImageSpace"><img src="portal/images/icon_info.png" width="10" height="10"/></div>';
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

self._CSP_UI_Component_SMPFinderPane_getListRowsHTML = function(array,selectedList,level,parentIdx) {
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

self._CSP_UI_Component_SMPFinderPane_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._CSP_UI_Component_SMPFinderPane__Loader = function() {
	zenLoadClass('_ZEN_ComponentEx_finderPane');
	_CSP_UI_Component_SMPFinderPane.prototype = zenCreate('_ZEN_ComponentEx_finderPane',-1);
	var p = _CSP_UI_Component_SMPFinderPane.prototype;
	if (null==p) {return;}
	p.constructor = _CSP_UI_Component_SMPFinderPane;
	p.superClass = ('undefined' == typeof _ZEN_ComponentEx_finderPane) ? zenMaster._ZEN_ComponentEx_finderPane.prototype:_ZEN_ComponentEx_finderPane.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%CSP.UI.Component.SMPFinderPane';
	p._type = 'SMPFinderPane';
	p.serialize = _CSP_UI_Component_SMPFinderPane_serialize;
	p.getSettings = _CSP_UI_Component_SMPFinderPane_getSettings;
	p.ReallyRefreshContents = _CSP_UI_Component_SMPFinderPane_ReallyRefreshContents;
	p.getFinderColumnHTML = _CSP_UI_Component_SMPFinderPane_getFinderColumnHTML;
	p.getListRowsHTML = _CSP_UI_Component_SMPFinderPane_getListRowsHTML;
}

self._zenClassIdx['UserRoles'] = '_CSP_UI_Component_UserRoles';
self._CSP_UI_Component_UserRoles = function(index,id) {
	if (index>=0) {_CSP_UI_Component_UserRoles__init(this,index,id);}
}

self._CSP_UI_Component_UserRoles__init = function(o,index,id) {
	('undefined' == typeof _CSP_UI_Component_abstractRoleTab__init) ?zenMaster._CSP_UI_Component_abstractRoleTab__init(o,index,id):_CSP_UI_Component_abstractRoleTab__init(o,index,id);
	o.avaList = 'avaList';
	o.selList = 'selList';
}
function _CSP_UI_Component_UserRoles_serialize(set,s)
{
	var o = this;s[0]='3855861879';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.PID;s[7]=o.align;s[8]=o.aux;s[9]=o.avaList;s[10]=o.containerStyle;s[11]=(o.dragEnabled?1:0);s[12]=(o.dropEnabled?1:0);s[13]=(o.dynamic?1:0);s[14]=o.enclosingClass;s[15]=o.enclosingStyle;s[16]=o.error;s[17]=o.height;s[18]=(o.hidden?1:0);s[19]=o.hint;s[20]=o.hintClass;s[21]=o.hintStyle;s[22]=o.label;s[23]=o.labelClass;s[24]=o.labelDisabledClass;s[25]=o.labelStyle;s[26]=o.onafterdrag;s[27]=o.onbeforedrag;s[28]=o.ondrag;s[29]=o.ondrop;s[30]=o.onhide;s[31]=o.onrefresh;s[32]=o.onshow;s[33]=o.onupdate;s[34]=o.overlayMode;s[35]=(o.readOnly?1:0);s[36]=o.renderFlag;s[37]=o.selList;s[38]=(o.showLabel?1:0);s[39]=o.slice;s[40]=o.title;s[41]=o.tuple;s[42]=o.type;s[43]=o.valign;s[44]=(o.visible?1:0);s[45]=o.width;
}
function _CSP_UI_Component_UserRoles_getSettings(s)
{
	s['name'] = 'string';
	s['avaList'] = 'string';
	s['selList'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._CSP_UI_Component_UserRoles_clearList = function(listID,isPage) {
if (isPage == 1) {
var list = document.getElementById(listID);
} else {
var list = this.findElement(listID);
}
for (var i=list.options.length-1;i>=1;i--) {
list.remove(i);
}
}

self._CSP_UI_Component_UserRoles_doAssignRole = function(type,grantOption) {
var oldSynchronousMode = zenSynchronousMode;
zenSynchronousMode = true;
var roleList = this.getSelList(",",false,false);
if (roleList == "") {
var msg = $$$Text("No role selected. Nothing to assign.");
alert(msg);
return false;
}
var st = this.AssignRoles(this.PID,roleList,grantOption,this.type);
if (st != 1) {
alert(st);
} else {
this.refreshContents();
}
zenSynchronousMode = oldSynchronousMode;
}

self._CSP_UI_Component_UserRoles_doChangeGrantOption = function(roleID,isChecked) {
var oldSynchronousMode = zenSynchronousMode;
zenSynchronousMode = true;
var st = this.AssignRoles(this.PID,roleID,Number(isChecked),this.type)
if (st != 1) {
alert(st);
this.refreshContents();
}
zenSynchronousMode = oldSynchronousMode;
}

self._CSP_UI_Component_UserRoles_doSelectBoxMove = function(flag,isPage) {
if (isPage == 1) {
var avaList = document.getElementById(this.avaList);
var selList = document.getElementById(this.selList);
} else {
var avaList = this.findElement(this.avaList);
var selList = this.findElement(this.selList);
}
switch (flag) {
case "selectOne":
this.doSelectBoxMoveList(avaList,selList);
break;
case "deselectOne":
this.doSelectBoxMoveList(selList,avaList);
break;
case "selectAll":
this.doSelectBoxMoveAll(avaList,selList);
break;
case "deselectAll":
this.doSelectBoxMoveAll(selList,avaList);
break;
case "moveUp":
this.doSelectBoxMoveItem(selList,true);
break;
case "moveDown":
this.doSelectBoxMoveItem(selList,false);
break;
}
if (this.onSelectBoxMove) {
ok = this.onSelectBoxMove(flag, isPage);
}
}

self._CSP_UI_Component_UserRoles_doSelectBoxMoveAll = function(from,to) {
var len = from.options.length;
for(var i=0;i<len;i++) {
var o = from.options[i];
if (o.value != "_") to.options[to.options.length] =  new Option(o.text,o.value,false,true);
}
var len = len - 1;
for(var i=len;i>=0;i--) {
var o = from.options[i];
if (o.value != "_") from.options[i] = null;
}
to.selectedIndex = to.options.length-1;
to.focus;
}

self._CSP_UI_Component_UserRoles_doSelectBoxMoveItem = function(list,bUp) {
var currentIdx = list.selectedIndex;
if (currentIdx == -1) return false;
if (list.options[currentIdx].value == "_") return false;
var newIdx = bUp ? currentIdx - 1 : currentIdx + 1;
if (newIdx < 1 || newIdx > (list.options.length - 1) ) return false;
var sSwap = list[newIdx].value;
var sSwapText = list[newIdx].text;
var sTarget = list[currentIdx].value;
var sTargetText = list[currentIdx].text;
list[newIdx].value = sTarget;
list[newIdx].text = sTargetText;
list[currentIdx].value = sSwap;
list[currentIdx].text = sSwapText;
list.selectedIndex = newIdx;
return false;
}

self._CSP_UI_Component_UserRoles_doSelectBoxMoveList = function(from,to) {
var len = from.options.length;
var o;
for(var i=0;i<len;i++) {
o = from.options[i];
if (o.selected) {
if (o.value != "_") {
to.options[to.options.length] = new Option(o.text,o.value,false,true);
}
}
}
for(var i=len-1;i>=0;i--) {
o = from.options[i];
if (o.selected) {
if (o.value != "_") {
from.options[i] = null;
}
}
}
from.selectedIndex = from.options.length > 1 ? 1 : -1
}

self._CSP_UI_Component_UserRoles_getSelList = function(delim,includeLeadingDelim,isPage) {
if (isPage == 1) {
var selList = document.getElementById(this.selList);
} else {
var selList = this.findElement(this.selList);
}
var returnList = ""
for (var i = 1; i < selList.length; i++) {
if (includeLeadingDelim || (returnList != "")) returnList = returnList + delim;
returnList = returnList + selList.options[i].value;
}
return returnList;
}

self._CSP_UI_Component_UserRoles_AssignRoles = function(PID,RoleList,GrantOption,Type) {
	return zenInstanceMethod(this,'AssignRoles','L,L,B,L','VARCHAR',arguments);
}

self._CSP_UI_Component_UserRoles_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}

self._CSP_UI_Component_UserRoles_RemoveAllRoles = function(PID,Type) {
	return zenInstanceMethod(this,'RemoveAllRoles','L,L','VARCHAR',arguments);
}

self._CSP_UI_Component_UserRoles_RemoveRole = function(PID,RoleList,Type) {
	return zenInstanceMethod(this,'RemoveRole','L,L,L','VARCHAR',arguments);
}
self._CSP_UI_Component_UserRoles__Loader = function() {
	zenLoadClass('_CSP_UI_Component_abstractRoleTab');
	_CSP_UI_Component_UserRoles.prototype = zenCreate('_CSP_UI_Component_abstractRoleTab',-1);
	var p = _CSP_UI_Component_UserRoles.prototype;
	if (null==p) {return;}
	p.constructor = _CSP_UI_Component_UserRoles;
	p.superClass = ('undefined' == typeof _CSP_UI_Component_abstractRoleTab) ? zenMaster._CSP_UI_Component_abstractRoleTab.prototype:_CSP_UI_Component_abstractRoleTab.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%CSP.UI.Component.UserRoles';
	p._type = 'UserRoles';
	p.serialize = _CSP_UI_Component_UserRoles_serialize;
	p.getSettings = _CSP_UI_Component_UserRoles_getSettings;
	p.AssignRoles = _CSP_UI_Component_UserRoles_AssignRoles;
	p.ReallyRefreshContents = _CSP_UI_Component_UserRoles_ReallyRefreshContents;
	p.RemoveAllRoles = _CSP_UI_Component_UserRoles_RemoveAllRoles;
	p.RemoveRole = _CSP_UI_Component_UserRoles_RemoveRole;
	p.clearList = _CSP_UI_Component_UserRoles_clearList;
	p.doAssignRole = _CSP_UI_Component_UserRoles_doAssignRole;
	p.doChangeGrantOption = _CSP_UI_Component_UserRoles_doChangeGrantOption;
	p.doSelectBoxMove = _CSP_UI_Component_UserRoles_doSelectBoxMove;
	p.doSelectBoxMoveAll = _CSP_UI_Component_UserRoles_doSelectBoxMoveAll;
	p.doSelectBoxMoveItem = _CSP_UI_Component_UserRoles_doSelectBoxMoveItem;
	p.doSelectBoxMoveList = _CSP_UI_Component_UserRoles_doSelectBoxMoveList;
	p.getSelList = _CSP_UI_Component_UserRoles_getSelList;
}

self._zenClassIdx['tableNavBar'] = '_CSP_UI_Component_tableNavBar';
self._CSP_UI_Component_tableNavBar = function(index,id) {
	if (index>=0) {_CSP_UI_Component_tableNavBar__init(this,index,id);}
}

self._CSP_UI_Component_tableNavBar__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_tableNavigatorBar__init) ?zenMaster._ZEN_Component_tableNavigatorBar__init(o,index,id):_ZEN_Component_tableNavigatorBar__init(o,index,id);
}
function _CSP_UI_Component_tableNavBar_serialize(set,s)
{
	var o = this;s[0]='4227344744';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.containerStyle;s[9]=(o.dragEnabled?1:0);s[10]=(o.dropEnabled?1:0);s[11]=(o.dynamic?1:0);s[12]=o.enclosingClass;s[13]=o.enclosingStyle;s[14]=o.error;s[15]=o.height;s[16]=(o.hidden?1:0);s[17]=o.hint;s[18]=o.hintClass;s[19]=o.hintStyle;s[20]=o.label;s[21]=o.labelClass;s[22]=o.labelDisabledClass;s[23]=o.labelStyle;s[24]=o.maxButtons;s[25]=o.maxPageSize;s[26]=o.maxRows;s[27]=o.msgFilter;s[28]=o.msgFirstPage;s[29]=o.msgFound;s[30]=o.msgLastPage;s[31]=o.msgMaxRows;s[32]=o.msgNextPage;s[33]=o.msgOf;s[34]=o.msgPage;s[35]=o.msgPageSize;s[36]=o.msgPreviousPage;s[37]=o.navmaxRows;s[38]=o.onMaxRowsChange;s[39]=o.onPageSizeChange;s[40]=o.onafterdrag;s[41]=o.onbeforedrag;s[42]=o.ondrag;s[43]=o.ondrop;s[44]=o.onfilterChange;s[45]=o.onhide;s[46]=o.onrefresh;s[47]=o.onshow;s[48]=o.onupdate;s[49]=o.overlayMode;s[50]=o.renderFlag;s[51]=(o.saveSizeMax?1:0);s[52]=(o.showFilter?1:0);s[53]=(o.showLabel?1:0);s[54]=(o.showMaxRows?1:0);s[55]=(o.showPageSize?1:0);s[56]=o.slice;s[57]=o.tablePaneId;s[58]=o.title;s[59]=o.tuple;s[60]=o.valign;s[61]=(o.visible?1:0);s[62]=o.width;
}
function _CSP_UI_Component_tableNavBar_getSettings(s)
{
	s['name'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._CSP_UI_Component_tableNavBar_renderContents = function() {
if (this.getEnclosingDiv() == null) return;
var html = new Array();
html[html.length] = '<table class="tnbrTable" border="0" cellpadding="3" cellspacing="0"><tr>';
html[html.length] = '<td align="left" valign="center" nowrap>&#160;';
var table = this.tablePane;
if (null == table) {
if (this.tablePaneId!='') {
this.connect();
table = this.tablePane;
}
}
if (null == table) {
html[html.length] = 'Not connected';
}
else {
var rowCount = table.getProperty('rowCount');
var pageSize = table.getProperty('pageSize');
var maxRows = table.getProperty('maxRows');
var filter = table.getProperty('lastFilter');
if (this.showFilter) {
html[html.length] = '<span class="tnbrFilter">';
html[html.length] = this.msgFilter + ':&#160;';
html[html.length] = '<input id="'+this.makeId('filter')+'" type="text" size="8" onchange="zenPage.getComponent('+this.index+').onfilterHandler(this.value);" title="' + this.title + '" value="'+filter+'"/>&#160;';
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

self._CSP_UI_Component_tableNavBar_setFilterSize = function(size) {
this.findElement('filter').size = size;
}

self._CSP_UI_Component_tableNavBar_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._CSP_UI_Component_tableNavBar__Loader = function() {
	zenLoadClass('_ZEN_Component_tableNavigatorBar');
	_CSP_UI_Component_tableNavBar.prototype = zenCreate('_ZEN_Component_tableNavigatorBar',-1);
	var p = _CSP_UI_Component_tableNavBar.prototype;
	if (null==p) {return;}
	p.constructor = _CSP_UI_Component_tableNavBar;
	p.superClass = ('undefined' == typeof _ZEN_Component_tableNavigatorBar) ? zenMaster._ZEN_Component_tableNavigatorBar.prototype:_ZEN_Component_tableNavigatorBar.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%CSP.UI.Component.tableNavBar';
	p._type = 'tableNavBar';
	p.serialize = _CSP_UI_Component_tableNavBar_serialize;
	p.getSettings = _CSP_UI_Component_tableNavBar_getSettings;
	p.ReallyRefreshContents = _CSP_UI_Component_tableNavBar_ReallyRefreshContents;
	p.renderContents = _CSP_UI_Component_tableNavBar_renderContents;
	p.setFilterSize = _CSP_UI_Component_tableNavBar_setFilterSize;
}

self._zenClassIdx['remoteDatabaseSelect'] = '_CSP_UI_Component_remoteDatabaseSelect';
self._CSP_UI_Component_remoteDatabaseSelect = function(index,id) {
	if (index>=0) {_CSP_UI_Component_remoteDatabaseSelect__init(this,index,id);}
}

self._CSP_UI_Component_remoteDatabaseSelect__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_dataCombo__init) ?zenMaster._ZEN_Component_dataCombo__init(o,index,id):_ZEN_Component_dataCombo__init(o,index,id);
	o.OnCreateResultSet = ''; // encrypted
	o.OnExecuteResultSet = ''; // encrypted
	o.columnName = '';
	o.countRows = '0';
	o.groupByClause = '';
	o.maxRows = '100';
	o.orderByClause = '';
	o.queryClass = ''; // encrypted
	o.queryName = '';
	o.sql = ''; // encrypted
	o.tableName = ''; // encrypted
	o.whereClause = '';
}
function _CSP_UI_Component_remoteDatabaseSelect_serialize(set,s)
{
	var o = this;s[0]='3827919566';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.OnCreateResultSet;s[7]=o.OnExecuteResultSet;s[8]=o.align;s[9]=o.autocomplete;s[10]=o.aux;s[11]=o.auxColumn;s[12]=o.buttonCaption;s[13]=o.buttonImage;s[14]=o.buttonImageDown;s[15]=o.buttonTitle;s[16]=(o.cached?1:0);s[17]=o.choiceColumn;s[18]=(o.clearOnLoad?1:0);s[19]=o.clientType;s[20]=o.columnHeaders;s[21]=o.columnName;s[22]=o.comboType;s[23]=set.serializeList(o,o.conditions,true,'conditions');s[24]=o.containerStyle;s[25]=o.contentType;s[26]=o.controlClass;s[27]=o.controlStyle;s[28]=o.countRows;s[29]=o.dataBinding;s[30]=(o.dataLoaded?1:0);s[31]=o.delay;s[32]=(o.disabled?1:0);s[33]=o.displayColumns;s[34]=(o.dragEnabled?1:0);s[35]=(o.dropEnabled?1:0);s[36]=o.dropdownHeight;s[37]=o.dropdownWidth;s[38]=(o.dynamic?1:0);s[39]=(o.editable?1:0);s[40]=o.emptyText;s[41]=o.enclosingClass;s[42]=o.enclosingStyle;s[43]=o.error;s[44]=o.groupByClause;s[45]=o.height;s[46]=(o.hidden?1:0);s[47]=o.hint;s[48]=o.hintClass;s[49]=o.hintStyle;s[50]=(o.hzScroll?1:0);s[51]=o.inputtype;s[52]=(o.invalid?1:0);s[53]=o.invalidMessage;s[54]=(o.isDropdownVisible?1:0);s[55]=o.itemCount;s[56]=o.label;s[57]=o.labelClass;s[58]=o.labelDisabledClass;s[59]=o.labelStyle;s[60]=o.loadingMessage;s[61]=o.maxRows;s[62]=o.maxlength;s[63]=o.modelClass;s[64]=(o.multiColumn?1:0);s[65]=o.onafterdrag;s[66]=o.onbeforedrag;s[67]=o.onblur;s[68]=o.onchange;s[69]=o.onclick;s[70]=o.ondblclick;s[71]=o.ondrag;s[72]=o.ondrop;s[73]=o.onfocus;s[74]=o.onhide;s[75]=o.onkeydown;s[76]=o.onkeypress;s[77]=o.onkeyup;s[78]=o.onmousedown;s[79]=o.onmouseout;s[80]=o.onmouseover;s[81]=o.onmouseup;s[82]=o.onrefresh;s[83]=o.onshow;s[84]=o.onshowDropdown;s[85]=o.onsubmit;s[86]=o.ontouchend;s[87]=o.ontouchmove;s[88]=o.ontouchstart;s[89]=o.onupdate;s[90]=o.onvalidate;s[91]=o.orderByClause;s[92]=o.originalValue;s[93]=o.overlayMode;s[94]=set.serializeList(o,o.parameters,true,'parameters');s[95]=o.placeholder;s[96]=o.queryClass;s[97]=o.queryName;s[98]=(o.readOnly?1:0);s[99]=o.renderFlag;s[100]=(o.required?1:0);s[101]=o.requiredMessage;s[102]=(o.scrollIntoView?1:0);s[103]=o.searchKeyLen;s[104]=o.selectedIndex;s[105]=(o.showEmpty?1:0);s[106]=(o.showLabel?1:0);s[107]=o.showQuery;s[108]=o.size;s[109]=o.slice;s[110]=(o.spellcheck?1:0);s[111]=o.sql;s[112]=o.sqlLookup;s[113]=o.tabIndex;s[114]=o.tableName;s[115]=o.text;s[116]=o.title;s[117]=o.tuple;s[118]=(o.unrestricted?1:0);s[119]=o.valign;s[120]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[121]=o.valueColumn;s[122]=(o.visible?1:0);s[123]=o.whereClause;s[124]=o.width;
}
function _CSP_UI_Component_remoteDatabaseSelect_getSettings(s)
{
	s['name'] = 'string';
	s['columnName'] = 'string';
	s['countRows'] = 'integer';
	s['groupByClause'] = 'string';
	s['maxRows'] = 'integer';
	s['orderByClause'] = 'string';
	s['queryClass'] = 'className';
	s['queryName'] = 'classMember:QUERY';
	s['sql'] = 'sql';
	s['tableName'] = 'string';
	s['whereClause'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._CSP_UI_Component_remoteDatabaseSelect_LoadDropDownContents = function(searchParm,cached) {
	zenInstanceMethod(this,'LoadDropDownContents','L,B','',arguments);
}

self._CSP_UI_Component_remoteDatabaseSelect_LookupDisplayValue = function(value) {
	return zenInstanceMethod(this,'LookupDisplayValue','L','VARCHAR',arguments);
}

self._CSP_UI_Component_remoteDatabaseSelect_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._CSP_UI_Component_remoteDatabaseSelect__Loader = function() {
	zenLoadClass('_ZEN_Component_dataCombo');
	_CSP_UI_Component_remoteDatabaseSelect.prototype = zenCreate('_ZEN_Component_dataCombo',-1);
	var p = _CSP_UI_Component_remoteDatabaseSelect.prototype;
	if (null==p) {return;}
	p.constructor = _CSP_UI_Component_remoteDatabaseSelect;
	p.superClass = ('undefined' == typeof _ZEN_Component_dataCombo) ? zenMaster._ZEN_Component_dataCombo.prototype:_ZEN_Component_dataCombo.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%CSP.UI.Component.remoteDatabaseSelect';
	p._type = 'remoteDatabaseSelect';
	p.serialize = _CSP_UI_Component_remoteDatabaseSelect_serialize;
	p.getSettings = _CSP_UI_Component_remoteDatabaseSelect_getSettings;
	p.LoadDropDownContents = _CSP_UI_Component_remoteDatabaseSelect_LoadDropDownContents;
	p.LookupDisplayValue = _CSP_UI_Component_remoteDatabaseSelect_LookupDisplayValue;
	p.ReallyRefreshContents = _CSP_UI_Component_remoteDatabaseSelect_ReallyRefreshContents;
}
/* EOF */