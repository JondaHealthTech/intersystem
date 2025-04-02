/*** Zen Module: ZEN_Component_link ***/

self._zenClassIdx['link'] = '_ZEN_Component_link';
self._ZEN_Component_link = function(index,id) {
	if (index>=0) {_ZEN_Component_link__init(this,index,id);}
}

self._ZEN_Component_link__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.caption = '';
	o.disabled = false;
	o.href = '';
	o.onclick = '';
	o.style = '';
	o.target = '';
	o.title = '';
}
function _ZEN_Component_link_serialize(set,s)
{
	var o = this;s[0]='194735911';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.caption;s[9]=o.containerStyle;s[10]=(o.disabled?1:0);s[11]=(o.dragEnabled?1:0);s[12]=(o.dropEnabled?1:0);s[13]=(o.dynamic?1:0);s[14]=o.enclosingClass;s[15]=o.enclosingStyle;s[16]=o.error;s[17]=o.height;s[18]=(o.hidden?1:0);s[19]=o.hint;s[20]=o.hintClass;s[21]=o.hintStyle;s[22]=o.href;s[23]=o.label;s[24]=o.labelClass;s[25]=o.labelDisabledClass;s[26]=o.labelStyle;s[27]=o.onafterdrag;s[28]=o.onbeforedrag;s[29]=o.onclick;s[30]=o.ondrag;s[31]=o.ondrop;s[32]=o.onhide;s[33]=o.onrefresh;s[34]=o.onshow;s[35]=o.onupdate;s[36]=o.overlayMode;s[37]=o.renderFlag;s[38]=(o.showLabel?1:0);s[39]=o.slice;s[40]=o.style;s[41]=o.target;s[42]=o.title;s[43]=o.tuple;s[44]=o.valign;s[45]=(o.visible?1:0);s[46]=o.width;
}
function _ZEN_Component_link_getSettings(s)
{
	s['name'] = 'string';
	s['caption'] = 'caption';
	s['disabled'] = 'boolean';
	s['href'] = 'uri';
	s['onclick'] = 'eventHandler';
	s['style'] = 'style';
	s['target'] = 'string';
	s['title'] = 'caption';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_link_onClickHandler = function() {
if (this.onclick != '') {
return zenInvokeCallbackMethod(this.onclick,this,'onclick');
}
return true;
}

self._ZEN_Component_link_setProperty = function(property,value,value2) {
var a = this.findElement('a');
switch(property) {
case 'caption':
this.caption = value;
if (a) {
a.innerHTML = zenEscapeHTMLSafe(value);
}
break;
case 'title':
this.title = value;
if (a) {
a.title = value;
}
break;
case 'href':
this.href = value;
if (a && !this.diabled) {
a.href = value;
}
break;
case 'style':
this.style = value;
if (a) {
a.style.cssText = value;
}
break;
case 'disabled':
value = value ? true : false;
if (this.disabled != value) {
this.disabled = value;
var html = '';
if (this.disabled) {
html = '<span class="linkDisabled" id="'+this.makeId('a')+'" '+zenAttr('title',this.title)+' '+zenAttr('style',this.style)+'>'+zenEscapeXML(this.caption)+'</span>';
}
else {
html = '<a class="link" onclick="return zenPage.getComponent('+this.index+').onClickHandler();" href="'+this.href+'" id="'+this.makeId('a')+'" '+zenAttr('title',this.title)+' '+zenAttr('style',this.style)+'>'+zenEscapeXML(this.caption)+'</a>';
}
this.getEnclosingDiv().innerHTML = html;
}
break;
default:
return this.invokeSuper('setProperty',arguments);
break;
}
return true;
}

self._ZEN_Component_link_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_link__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_ZEN_Component_link.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _ZEN_Component_link.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_link;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.link';
	p._type = 'link';
	p.serialize = _ZEN_Component_link_serialize;
	p.getSettings = _ZEN_Component_link_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_link_ReallyRefreshContents;
	p.onClickHandler = _ZEN_Component_link_onClickHandler;
	p.setProperty = _ZEN_Component_link_setProperty;
}
/* EOF */