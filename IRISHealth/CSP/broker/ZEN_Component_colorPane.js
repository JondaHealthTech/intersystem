/*** Zen Module: ZEN_Component_colorPane ***/

self._zenClassIdx['colorPane'] = '_ZEN_Component_colorPane';
self._ZEN_Component_colorPane = function(index,id) {
	if (index>=0) {_ZEN_Component_colorPane__init(this,index,id);}
}

self._ZEN_Component_colorPane__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_component__init) ?zenMaster._ZEN_Component_component__init(o,index,id):_ZEN_Component_component__init(o,index,id);
	o.currCol = '0';
	o.currRow = '0';
	o.currSlice = '0';
	o.face = '1';
	o.onchange = '';
	o.ondblclick = '';
	o.value = '#FFFFFF';
}
function _ZEN_Component_colorPane_serialize(set,s)
{
	var o = this;s[0]='1415435035';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.containerStyle;s[9]=o.currCol;s[10]=o.currRow;s[11]=o.currSlice;s[12]=(o.dragEnabled?1:0);s[13]=(o.dropEnabled?1:0);s[14]=(o.dynamic?1:0);s[15]=o.enclosingClass;s[16]=o.enclosingStyle;s[17]=o.error;s[18]=o.face;s[19]=o.height;s[20]=(o.hidden?1:0);s[21]=o.hint;s[22]=o.hintClass;s[23]=o.hintStyle;s[24]=o.label;s[25]=o.labelClass;s[26]=o.labelDisabledClass;s[27]=o.labelStyle;s[28]=o.onafterdrag;s[29]=o.onbeforedrag;s[30]=o.onchange;s[31]=o.ondblclick;s[32]=o.ondrag;s[33]=o.ondrop;s[34]=o.onhide;s[35]=o.onrefresh;s[36]=o.onshow;s[37]=o.onupdate;s[38]=o.overlayMode;s[39]=o.renderFlag;s[40]=(o.showLabel?1:0);s[41]=o.slice;s[42]=o.title;s[43]=o.tuple;s[44]=o.valign;s[45]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[46]=(o.visible?1:0);s[47]=o.width;
}
function _ZEN_Component_colorPane_getSettings(s)
{
	s['name'] = 'string';
	s['currCol'] = 'integer';
	s['currRow'] = 'integer';
	s['currSlice'] = 'integer';
	s['face'] = 'integer';
	s['onchange'] = 'eventHandler';
	s['ondblclick'] = 'eventHandler';
	s['value'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_Component_colorPane_dblclickHandler = function() {
zenInvokeCallbackMethod(this.ondblclick,this,'ondblclick');
}

self._ZEN_Component_colorPane_getValue = function() {
return this.getProperty('value');
}

self._ZEN_Component_colorPane_onloadHandler = function() {
this.setValue(this.value);
}

self._ZEN_Component_colorPane_renderContents = function() {
var div = this.window.document.getElementById('colorPane_' + this.index);
zenASSERT(div,'Unable to find div element',arguments);
zenASSERT((this.face>0&&this.face<7),'Out of range value for face',arguments);
var hues = new Array('00','10','20','30','40','50','60','70','80','90','A0','B0','C0','D0','E0','F0','FF');
var rgb,sv,rv,cv,xv;
xv = hues[this.currSlice*1];
rv = hues[this.currRow*1];
cv = hues[this.currCol*1];
switch (this.face*1) {
case 1:
rgb = cv + xv + rv;
rgbBottom = '0000FF';
rgbRight = 'FF0000';
break;
case 2:
rgb = xv + rv + cv;
rgbBottom = '00FF00';
rgbRight = '0000FF';
break;
case 3:
rgb = rv + cv + xv;
rgbBottom = 'FF0000';
rgbRight = '00FF00';
break;
}
this.renderIndicator();
var html = new Array();
html[html.length] = '<table class="colorPane" border="0" cellpadding="0" cellspacing="0">';
for (var r = 0; r < hues.length; r++) {
html[html.length] = '<tr>';
sv = hues[r];
switch (this.face*1) {
case 1:
rgb = '00' + sv + '00';
break;
case 2:
rgb = sv + '00' + '00';
break;
case 3:
rgb = '00' + '00' + sv;
break;
}
html[html.length] = ((r==this.currSlice)?'<td style="font-size:1.2em;"><b>&#187;</b></td>':'<td>&#160;</td>');
html[html.length] = '<td nowrap="1" class="colorPaneCell" width="16" onclick="zenPage.getComponent('+this.index+').selectSlice('+r+');">';
html[html.length] = '<div style="background: #' + rgb + '; border:1px solid black;">&#160;</div>';
html[html.length] = '</td>';
if (0 == r) {
html[html.length] = '<td rowspan="' + hues.length + '" align="center" width="16" >&#160;</td>';
}
rv = hues[r];
for (var c = 0; c < hues.length; c++) {
cv = hues[c];
switch (this.face*1) {
case 1:
rgb = cv + xv + rv;
break;
case 2:
rgb = xv + rv + cv;
break;
case 3:
rgb = rv + cv + xv;
break;
}
html[html.length] = '<td id="td_'+r+'_'+c+'_'+this.index+'" class="'+((r==this.currRow && c==this.currCol)?'colorPaneCellSelected'+this.face:'colorPaneCell')+'" width="16" onclick="zenPage.getComponent('+this.index+').selectCell('+r+','+c+');" ondblclick="zenPage.getComponent('+this.index+').dblclickHandler();" zenValue="'+rgb+'">';
html[html.length] = '<div style="background: #' + rgb + '; border:1px solid black;">&#160;</div>';
html[html.length] = '</td>';
}
if (0 == r) {
html[html.length] = '<td rowspan="' + hues.length + '" align="center" width="16" >&#160;</td>';
html[html.length] = '<td rowspan="' + hues.length + '" class="colorPaneRotator" style="background: #'+rgbRight+'" align="center" width="16" onclick="zenPage.getComponent('+this.index+').rotateCube(1);">&#160;</td>';
}
html[html.length] = '</tr>';
}
html[html.length] = '<tr><td colspan="' + (4+hues.length) + '" >&#160;</td></tr>';
html[html.length] = '<tr><td colspan="3">&#160;</td><td colspan="' + hues.length + '" class="colorPaneRotator" style="background: #'+rgbBottom+'" align="center"  onclick="zenPage.getComponent('+this.index+').rotateCube(0);">&#160;</td><td>&#160;</td></tr>';
html[html.length] = '</table>';
div.innerHTML = html.join('');
}

self._ZEN_Component_colorPane_renderIndicator = function() {
var div = this.window.document.getElementById('colorInd_' + this.index);
zenASSERT(div,'Unable to find div element',arguments);
var r = 0, g = 0, b = 0;
if ('' != this.value) {
r = parseInt('0x' + this.value.substr(1,2));
g = parseInt('0x' + this.value.substr(3,2));
b = parseInt('0x' + this.value.substr(5,2));
}
var html = new Array();
html[html.length] = '<table width="100%" cellspacing="0" border="0">';
html[html.length] = '<tr><td style="white-space:nowrap; background: #DDDDDD; border: 1px black solid; color: darkblue;">';
html[html.length] = '&#160;R<input id="R_'+this.index+'" type="text" size="1" value="'+r+'" onchange="zenPage.getComponent('+this.index+').rgbChanged();">&#160;';
html[html.length] = '&#160;G<input id="G_'+this.index+'" type="text" size="1" value="'+g+'" onchange="zenPage.getComponent('+this.index+').rgbChanged();">&#160;';
html[html.length] = '&#160;B<input id="B_'+this.index+'" type="text" size="1" value="'+b+'" onchange="zenPage.getComponent('+this.index+').rgbChanged();">&#160;';
html[html.length] = '</td>';
var clr = 'rgb('+(r<128?255:0)+','+(g<128?255:0)+','+(b<128?255:0)+')'
html[html.length] = '<td style="width:90%; border: 1px black solid; color: '+clr+'; font-family:courier new; font-weight: bold; text-align:center; background:' + this.value + ';">'+this.value+'</td></tr>';
html[html.length] = '</table>';
div.innerHTML = html.join('');
}

self._ZEN_Component_colorPane_rgbChanged = function() {
var r = this.findElement('R').value * 1;
var g = this.findElement('G').value * 1;
var b = this.findElement('B').value * 1;
r = isNaN(r) ? 0 : r;
g = isNaN(g) ? 0 : g;
b = isNaN(b) ? 0 : b;
r = r < 0 ? 0 : r;
g = g < 0 ? 0 : g;
b = b < 0 ? 0 : b;
r = r > 255 ? 255 : r;
g = g > 255 ? 255 : g;
b = b > 255 ? 255 : b;
var rgb = '#' + (r<10?'0':'') + r.toString(16) + (g<10?'0':'') + g.toString(16) + (b<10?'0':'') + b.toString(16);
this.setValue(rgb);
}

self._ZEN_Component_colorPane_rotateCube = function(direction) {
var table = new Array();
table[1] = new Array(2,3);
table[2] = new Array(3,1);
table[3] = new Array(1,2);
this.face = table[this.face][direction];
this.render();
}

self._ZEN_Component_colorPane_selectCell = function(r,c) {
var td = this.findElement('td_' + this.currRow + '_' + this.currCol);
if (td) {
td.className = 'colorPaneCell';
}
this.currRow = r;
this.currCol = c;
this.value = '';
var td = this.findElement('td_' + this.currRow + '_' + this.currCol);
if (td) {
td.className = 'colorPaneCellSelected'+this.face;
this.value = '#' + td.getAttribute('zenValue');
}
this.renderIndicator()
zenInvokeCallbackMethod(this.onchange,this,'onchange');
}

self._ZEN_Component_colorPane_selectSlice = function(slice) {
this.currSlice = slice;
this.render();
}

self._ZEN_Component_colorPane_setProperty = function(property,value,value2) {
switch(property) {
case 'value':
this.value = value;
var r = 0, g = 0, b = 0;
if ('' != this.value) {
r = parseInt('0x' + this.value.substr(1,2));
g = parseInt('0x' + this.value.substr(3,2));
b = parseInt('0x' + this.value.substr(5,2));
}
switch (this.face*1) {
case 1: //(RxB)
this.currRow = Math.floor((r+1) / 16);
this.currCol = Math.floor((b+1) / 16);
this.currSlice = Math.floor((g+1) / 16);
break;
case 2: //(GxB)
this.currRow = Math.floor((g+1) / 16);
this.currCol = Math.floor((b+1) / 16);
this.currSlice = Math.floor((r+1) / 16);
break;
case 3: //(RxG)
this.currRow = Math.floor((r+1) / 16);
this.currCol = Math.floor((g+1) / 16);
this.currSlice = Math.floor((b+1) / 16);
break;
}
this.render();
break;
default:
this.invokeSuper('setProperty',arguments);
break;
}
}

self._ZEN_Component_colorPane_setValue = function(value) {
this.setProperty('value',value);
}

self._ZEN_Component_colorPane_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_Component_colorPane__Loader = function() {
	zenLoadClass('_ZEN_Component_component');
	_ZEN_Component_colorPane.prototype = zenCreate('_ZEN_Component_component',-1);
	var p = _ZEN_Component_colorPane.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_Component_colorPane;
	p.superClass = ('undefined' == typeof _ZEN_Component_component) ? zenMaster._ZEN_Component_component.prototype:_ZEN_Component_component.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.Component.colorPane';
	p._type = 'colorPane';
	p.serialize = _ZEN_Component_colorPane_serialize;
	p.getSettings = _ZEN_Component_colorPane_getSettings;
	p.ReallyRefreshContents = _ZEN_Component_colorPane_ReallyRefreshContents;
	p.dblclickHandler = _ZEN_Component_colorPane_dblclickHandler;
	p.getValue = _ZEN_Component_colorPane_getValue;
	p.onloadHandler = _ZEN_Component_colorPane_onloadHandler;
	p.renderContents = _ZEN_Component_colorPane_renderContents;
	p.renderIndicator = _ZEN_Component_colorPane_renderIndicator;
	p.rgbChanged = _ZEN_Component_colorPane_rgbChanged;
	p.rotateCube = _ZEN_Component_colorPane_rotateCube;
	p.selectCell = _ZEN_Component_colorPane_selectCell;
	p.selectSlice = _ZEN_Component_colorPane_selectSlice;
	p.setProperty = _ZEN_Component_colorPane_setProperty;
	p.setValue = _ZEN_Component_colorPane_setValue;
}
/* EOF */