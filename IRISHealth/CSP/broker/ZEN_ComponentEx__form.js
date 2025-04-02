/*** Zen Module: ZEN_ComponentEx__form ***/

self._zenClassIdx['colorWheel'] = '_ZEN_ComponentEx_colorWheel';
self._ZEN_ComponentEx_colorWheel = function(index,id) {
	if (index>=0) {_ZEN_ComponentEx_colorWheel__init(this,index,id);}
}

self._ZEN_ComponentEx_colorWheel__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_control__init) ?zenMaster._ZEN_Component_control__init(o,index,id):_ZEN_Component_control__init(o,index,id);
	o.showPreview = '1';
	o.showRGBPanel = '1';
	o.value = '#7f7f7f';
}
function _ZEN_ComponentEx_colorWheel_serialize(set,s)
{
	var o = this;s[0]='3148106206';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.clientType;s[9]=o.containerStyle;s[10]=o.controlClass;s[11]=o.controlStyle;s[12]=o.dataBinding;s[13]=(o.disabled?1:0);s[14]=(o.dragEnabled?1:0);s[15]=(o.dropEnabled?1:0);s[16]=(o.dynamic?1:0);s[17]=o.enclosingClass;s[18]=o.enclosingStyle;s[19]=o.error;s[20]=o.height;s[21]=(o.hidden?1:0);s[22]=o.hint;s[23]=o.hintClass;s[24]=o.hintStyle;s[25]=(o.invalid?1:0);s[26]=o.invalidMessage;s[27]=o.label;s[28]=o.labelClass;s[29]=o.labelDisabledClass;s[30]=o.labelStyle;s[31]=o.onafterdrag;s[32]=o.onbeforedrag;s[33]=o.onblur;s[34]=o.onchange;s[35]=o.onclick;s[36]=o.ondblclick;s[37]=o.ondrag;s[38]=o.ondrop;s[39]=o.onfocus;s[40]=o.onhide;s[41]=o.onkeydown;s[42]=o.onkeypress;s[43]=o.onkeyup;s[44]=o.onmousedown;s[45]=o.onmouseout;s[46]=o.onmouseover;s[47]=o.onmouseup;s[48]=o.onrefresh;s[49]=o.onshow;s[50]=o.onsubmit;s[51]=o.ontouchend;s[52]=o.ontouchmove;s[53]=o.ontouchstart;s[54]=o.onupdate;s[55]=o.onvalidate;s[56]=o.originalValue;s[57]=o.overlayMode;s[58]=(o.readOnly?1:0);s[59]=o.renderFlag;s[60]=(o.required?1:0);s[61]=o.requiredMessage;s[62]=(o.showLabel?1:0);s[63]=o.showPreview;s[64]=o.showRGBPanel;s[65]=o.slice;s[66]=o.tabIndex;s[67]=o.title;s[68]=o.tuple;s[69]=o.valign;s[70]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[71]=(o.visible?1:0);s[72]=o.width;
}
function _ZEN_ComponentEx_colorWheel_getSettings(s)
{
	s['name'] = 'string';
	s['showPreview'] = 'integer';
	s['showRGBPanel'] = 'integer';
	s['value'] = 'value';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_ComponentEx_colorWheel_cleanUpMainUserEntry = function() {
var val = this.valueBox.value;
val = val.split(' ').join("");
if (val.charAt(0)=='#') val = val.substring(1)
if (val.length!=6) { // must be six hex digits or abort edit
this.setProperty("value",this.value);
return
}
var digits = [];
for (var i=0;i<6;i++) {
var c = val.substring(i,i+1);
if (ZLM.parseHexDigit(c)=="BAD DIGIT") {
this.setProperty("value",this.value);
return
}
digits.push(c);
}
val = "#"+digits.join("");
this.setProperty("value",val);
}

self._ZEN_ComponentEx_colorWheel_cleanUpUserColorGunEntry = function(gun) {
var v = gun.value;
var len = v.length;
if (len==2) return;
v = v.replace(/^[0]+/g,"")
len = v.length;
switch (len) {
case 2: gun.value = v;
return;
case 1: gun.value = "0"+v;
return;
case 0: gun.value = "00";
return;
default: // must be more than two
gun.value = v.substring(0,1);
}
}

self._ZEN_ComponentEx_colorWheel_cleanUpUserEntry = function() {
var r = this.redGun;
this.cleanUpUserColorGunEntry(r);
var g = this.greenGun;
this.cleanUpUserColorGunEntry(g);
var b = this.blueGun;
this.cleanUpUserColorGunEntry(b);
this.value = "#"+r.value+g.value+b.value;
this.setValueHex(this.value);
}

self._ZEN_ComponentEx_colorWheel_constrainDragX = function(mgr,wrapper,newX) {
var who=this[wrapper.node.jsObjName];
if (newX<0) return(0);
var mx=who.trough.clientWidth-who.handle.offsetWidth;
if (newX>mx) return(mx);
var newV=(who.handle.offsetLeft+who.roundOff)/who.slotSize;
if (newV!=who.value) {
who.value=newV;
if (who.onchange) eval(who.onchange);
}
return(newX);
}

self._ZEN_ComponentEx_colorWheel_constrainDragY = function(mgr,wrapper,newY) {
return(2);
}

self._ZEN_ComponentEx_colorWheel_endDrag = function(mgr,wrapper) {
var who=this[wrapper.node.jsObjName];
var newV=(who.handle.offsetLeft+who.roundOff)/who.slotSize;
if (newV!=who.value) {
who.value=newV;
if (who.onchange) eval(who.onchange);
}
}

self._ZEN_ComponentEx_colorWheel_findParts = function() {
this.diskspace = this.findElement("diskspace");
this.diskspace.controller = this;
this.rgbPanel = this.findElement("rgbPanel");
this.redCtrl = this.findElement("redCtrl");
this.greenCtrl = this.findElement("greenCtrl");
this.blueCtrl = this.findElement("blueCtrl");
this.crosshair = this.findElement("crosshair");
this.valueBox = this.findElement("value");
this.valueBox.controller = this;
this.whitemask = this.findElement("whitemask");
this.redGun = this.findElement("redGun");
this.redGun.controller = this;
this.greenGun = this.findElement("greenGun");
this.greenGun.controller = this;
this.blueGun = this.findElement("blueGun");
this.blueGun.controller = this;
this.maskCtrl = {};
this.maskCtrl.value = 50;
this.maskCtrl.maxValue = 100;
this.maskCtrl.range = 100;
this.maskCtrl.base = this.findElement("baseMask");
this.maskCtrl.handle = this.findElement("handleMask");
this.maskCtrl.trough = this.findElement("troughMask");
this.maskCtrl.handle.controller = this;
this.maskCtrl.handle.jsObjName = "maskCtrl";
this.maskCtrl.base.controller = this;
this.maskCtrl.trough.controller = this;
this.maskCtrl.onchange = "this.updateMask();"
this.redCtrl = {};
this.redCtrl.value = 128;
this.redCtrl.maxValue = 255;
this.redCtrl.range = 255;
this.redCtrl.base = this.findElement("baseRed");
this.redCtrl.handle = this.findElement("handleRed");
this.redCtrl.trough = this.findElement("troughRed");
this.redCtrl.handle.controller = this;
this.redCtrl.handle.jsObjName = "redCtrl";
this.redCtrl.base.controller = this;
this.redCtrl.trough.controller = this;
this.redCtrl.onchange = "this.mixGuns();"
this.greenCtrl = {};
this.greenCtrl.value = 128;
this.greenCtrl.maxValue = 255;
this.greenCtrl.range = 255;
this.greenCtrl.base = this.findElement("baseGreen");
this.greenCtrl.handle = this.findElement("handleGreen");
this.greenCtrl.trough = this.findElement("troughGreen");
this.greenCtrl.handle.controller = this;
this.greenCtrl.handle.jsObjName = "greenCtrl";
this.greenCtrl.base.controller = this;
this.greenCtrl.trough.controller = this;
this.greenCtrl.onchange = "this.mixGuns();"
this.blueCtrl = {};
this.blueCtrl.value = 128;
this.blueCtrl.maxValue = 255;
this.blueCtrl.range = 255;
this.blueCtrl.base = this.findElement("baseBlue");
this.blueCtrl.handle = this.findElement("handleBlue");
this.blueCtrl.trough = this.findElement("troughBlue");
this.blueCtrl.handle.controller = this;
this.blueCtrl.handle.jsObjName = "blueCtrl";
this.blueCtrl.base.controller = this;
this.blueCtrl.trough.controller = this;
this.blueCtrl.onchange = "this.mixGuns();"
}

self._ZEN_ComponentEx_colorWheel_getAngle = function(x,y) {
var lx = x-this.cX;
var ly = this.cY - y;
if (lx==0) {
if (ly>0) return(90);
return(270);
}
if (ly==0) {
if (lx>0) return(0);
return(180);
}
var theta = Math.atan(ly/lx)*180/Math.PI;
if (lx < 0 ) {
theta = 180 + theta;
}
else if (ly<0) { // native negative
theta = 360 + theta;
}
return(theta);
}

self._ZEN_ComponentEx_colorWheel_getRadius = function(x,y) {
var deltaX = x-this.cX;
var deltaY = y-this.cY;
var r = Math.sqrt(deltaX*deltaX+deltaY*deltaY);
return(r);
}

self._ZEN_ComponentEx_colorWheel_getShade = function(r,theta,z) {
var wash = 255*z;
var blue = Math.min(Math.round(this.getShadeBlue(r,theta)*(1-z)+wash,255));
var red = Math.min(Math.round(this.getShadeRed(r,theta)*(1-z)+wash),255);
var green = Math.min(Math.round(this.getShadeGreen(r,theta)*(1-z)+wash),255);
this.red = red;
this.green = green;
this.blue = blue;
var rgbStr = "rgb("+red+","+green+","+blue+")";
return(ZLM.toHTMLColorSpec(rgbStr));
}

self._ZEN_ComponentEx_colorWheel_getShadeBlue = function(r,theta) {
var base = 0;
if (r<this.maxR) {
if (theta>180) {
theta = 360-theta;
}
if (theta<0) theta = 180+theta;
if (theta>=120) return(0);
if (theta<=60) base = 255;
else {
base = ((120-theta)/60)*255;
}
var grad = Math.min(base*r/this.cX,255)
return(Math.round(grad));
}
else return(255);
}

self._ZEN_ComponentEx_colorWheel_getShadeGreen = function(r,theta) {
if (r>=this.maxR) return(255);
theta = theta-240;
if (theta<0) theta += 360;
return(this.getShadeBlue(r,theta));
}

self._ZEN_ComponentEx_colorWheel_getShadeRed = function(r,theta) {
if (r>=this.maxR) return(255);
theta = theta-120;
if (theta<0) theta += 360;
return(this.getShadeBlue(r,theta));
}

self._ZEN_ComponentEx_colorWheel_getX = function(r,theta) {
return(Math.round(r*Math.cos(theta*Math.PI/180))+this.cX);
}

self._ZEN_ComponentEx_colorWheel_getY = function(r,theta) {
return(this.cY-Math.round(r*Math.sin(theta*Math.PI/180)));
}

self._ZEN_ComponentEx_colorWheel_initializeDOM = function() {
this.findParts();
this.cX = 127;
this.cY = 127;
this.maxR = 128;
this.r = 0;
this.theta = 0;
this.z = 0;
ZLM.registerDragItem(this.maskCtrl.handle,this);
ZLM.setLocalAttribute(this.maskCtrl.handle,"onmousedown","ZLM.drag(this,event);");
ZLM.setLocalAttribute(this.maskCtrl.handle,"ontouchstart","ZLM.touch(this,event);");
this.positionHandle(this.maskCtrl);
ZLM.registerDragItem(this.redCtrl.handle,this);
ZLM.setLocalAttribute(this.redCtrl.handle,"onmousedown","ZLM.drag(this,event);");
ZLM.setLocalAttribute(this.redCtrl.handle,"ontouchstart","ZLM.touch(this,event);");
this.positionHandle(this.redCtrl);
ZLM.registerDragItem(this.greenCtrl.handle,this);
ZLM.setLocalAttribute(this.greenCtrl.handle,"onmousedown","ZLM.drag(this,event);");
ZLM.setLocalAttribute(this.greenCtrl.handle,"ontouchstart","ZLM.touch(this,event);");
this.positionHandle(this.greenCtrl);
ZLM.registerDragItem(this.blueCtrl.handle,this);
ZLM.setLocalAttribute(this.blueCtrl.handle,"onmousedown","ZLM.drag(this,event);");
ZLM.setLocalAttribute(this.blueCtrl.handle,"ontouchstart","ZLM.touch(this,event);");
this.positionHandle(this.blueCtrl);
this.setValueHex(this.value);
}

self._ZEN_ComponentEx_colorWheel_mixGuns = function() {
this.setValueRGB(
parseInt(this.redCtrl.value),
parseInt(this.greenCtrl.value),
parseInt(this.blueCtrl.value));
}

self._ZEN_ComponentEx_colorWheel_moveCrosshair = function(e) {
var x = 0;
var y = 0;
if (e.offsetX || e.offsetY) {
x = e.offsetX;
y = e.offsetY;
}
else {
var ofsX = ZLM.getPageOffsetLeft(this.diskspace);
var ofsY = ZLM.getPageOffsetTop(this.diskspace);
x = e.pageX-ofsX;
y = e.pageY- ofsY;
}
var r = this.getRadius(x,y);
if (r>this.cX) r = this.cX;
var theta = this.getAngle(x,y);
var z = parseInt(this.maskCtrl.value)/100;
this.r = r;
this.theta = theta;
this.z = z;
this.positionCrosshair(r,theta);
this.updatePreview(r,theta,z);
}

self._ZEN_ComponentEx_colorWheel_onRefreshContents = function() {
this.initializeDOM();
}

self._ZEN_ComponentEx_colorWheel_onloadHandler = function() {
this.initializeDOM();
}

self._ZEN_ComponentEx_colorWheel_positionCrosshair = function(r,theta) {
var pip = this.crosshair;
pip.style.top=(this.getY(r,theta)-10)+"px";
pip.style.left=(this.getX(r,theta)-10)+"px";
}

self._ZEN_ComponentEx_colorWheel_positionHandle = function(who) {
var tW = who.trough.clientWidth;
var hW = who.handle.offsetWidth;
if (tW==0) { // slider not currently visible do it the hard way
tW = parseInt(ZLM.getComputedNodeStyle(who.trough,'width'),10);
hW = parseInt(ZLM.getComputedNodeStyle(who.handle,'width'),10);
}
var mx = tW - hW;
var slot=mx/who.range;
who.handle.style.left=Math.round(who.value*slot)+"px";
}

self._ZEN_ComponentEx_colorWheel_setProperty = function(property,value,value2) {
switch(property) {
case 'value':
this.value = "#000000"
var r = 0;
var g = 0;
var b = 0;
if (value) {
var rgbStr = ZLM.convertColorToRGB(value);
if (rgbStr) {
var rgb =rgbStr.split(",");
r = rgb[0];
g = rgb[1];
b = rgb[2];
}
}
this.setValueRGB(r,g,b);
break;
case 'showRGBPanel':
this.showRGBPanel = value;
this.updateVisibleAreas();
break;
case 'showPreview':
this.showPreview = value;
this.updateVisibleAreas();
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_ComponentEx_colorWheel_setSliderValue = function(who,value) {
if (value==null) who.value=0;
else {
if (typeof(value)=="string") who.value=parseFloat(value);
else who.value=value;
if (who.value<0) who.value=0;
if (who.value>who.maxValue) who.value=who.maxValue;
}
this.positionHandle(who);
}

self._ZEN_ComponentEx_colorWheel_setValueHex = function(hexStr) {
var rgbStr = ZLM.convertHexColorString(hexStr);
var rgb =rgbStr.split(",");
this.setValueRGB(rgb[0],rgb[1],rgb[2]);
}

self._ZEN_ComponentEx_colorWheel_setValueRGB = function(r,g,b) {
this.red = r;
this.green = g;
this.blue = b;
var min = Math.min(r,g);
min = Math.min(min,b);
var z = min/255;
var zf = z*255;
var mz = 1-z;
var rho = 0;
var theta = 0;
if (z==1) {
r=0;
g=0;
b=0;
}
else {
r = (r-zf)/mz;
g = (g-zf)/mz;
b = (b-zf)/mz;
}
if (r==0) {
if (g>b) {
rho = Math.round(g/255*this.cX);
theta = Math.round(240+60*b/g)
}
else { // b>=g
rho = Math.round(b/255*this.cX);
if (b==0) theta=0;
else theta = Math.round(360-60*g/b);
}
}
else if (g==0) {
if (r>b) {
rho = Math.round(r/255*this.cX);
theta = Math.round(120-60*b/r);
}
else { // b>=r
rho = Math.round(b/255*this.cX);
if (b==0) theta = 0;
else theta = Math.round(60*r/b);
}
}
else { //b==0
if (r>g) {
rho = Math.round(r/255*this.cX);
theta = Math.round(120+60*g/r);
}
else { // g>=r
rho = Math.round(g/255*this.cX);
if (g==0) theta = 0;
else theta = Math.round(240-60*r/g);
}
}
this.r = rho;
this.theta = theta;
this.z = z;
this.positionCrosshair(rho,theta);
this.updatePreview(rho,theta,z);
}

self._ZEN_ComponentEx_colorWheel_startDrag = function(mgr,wrapper) {
var who=this[wrapper.node.jsObjName];
who.maxSlide=who.trough.clientWidth-who.handle.offsetWidth;
who.slotSize=who.maxSlide/who.range;
who.roundOff=who.slotSize/2;
who.roundOff=0;
}

self._ZEN_ComponentEx_colorWheel_updateMask = function() {
var ctrl = this.maskCtrl;
var percent = parseInt(this.maskCtrl.value)/100;
this.z = percent;
this.updatePreview(this.r, this.theta, percent);
}

self._ZEN_ComponentEx_colorWheel_updatePreview = function(r,theta,z) {
var clrStr = this.getShade(r,theta,z);
var div = this.valueBox;
div.style.background=clrStr;
div.innerHTML = clrStr;
div.value = clrStr;
if (ZLM.isDarkRGB(this.red+","+this.green+","+this.blue)) div.style.color="#ffffff";
else div.style.color="#000000";
this.setSliderValue(this.redCtrl,this.red);
this.setSliderValue(this.greenCtrl,this.green);
this.setSliderValue(this.blueCtrl,this.blue);
this.setSliderValue(this.maskCtrl,this.z*100);
this.redGun.value = ZLM.toHexString(this.red,2);
this.greenGun.value = ZLM.toHexString(this.green,2);
this.blueGun.value = ZLM.toHexString(this.blue,2);
this.whitemask.style.opacity= this.z;
if (ZLM.isIE) {
this.whitemask.style.filter = "alpha(opacity=" + (this.z*100) + ")";
}
this.value = clrStr;
if (this.onchange) zenInvokeCallbackMethod(this.onchange,this,'onchange');
}

self._ZEN_ComponentEx_colorWheel_updateVisibleAreas = function() {
if (this.showRGBPanel==1 || this.showRGBPanel=="true" || this.showRGBPanel==true) {
this.rgbPanel.style.display="block";
}
else {
this.rgbPanel.style.display="none";
}
if (this.showPreview==1||this.showPreview=="true" || this.showPreview==true) {
this.valueBox.style.display="block";
}
else {
this.valueBox.style.display="none";
}
}

self._ZEN_ComponentEx_colorWheel_verifyHex = function(event,gun) {
var code = event.keyCode;
var charVal = String.fromCharCode(code);
var pending = setTimeout("zenPage.getComponentById('"+this.id+"').cleanUpUserEntry();",0);
if (event.ctrlKey == true) return;
if (code<32) return;
var value = ZLM.parseHexDigit(charVal);
if (value!="BAD DIGIT") {  // test to see if total string in control is valid
var ctrl = null;
if (gun == 'r') ctrl = this.redGun;
if (gun == 'g') ctrl = this.greenGun;
if (gun == 'b') ctrl = this.blueGun;
var inValue = ctrl.value;
if (ctrl!=null) { // interested in keeping things in the 00-ff range
var isSelected = false;
if (typeof ctrl.selectionStart == "number") {
isSelected = (ctrl.selectionStart == 0 && ctrl.selectionEnd == ctrl.value.length);
}
else if (typeof document.selection != "undefined") {
ctrl.focus();
isSelected = (document.selection.createRange().text == ctrl.value);
}
if (isSelected) inValue="00";
var len = inValue.length;
if (len<2 || inValue.charAt(0)=="0") {
return;
};
};
};
clearTimeout(pending);
return(ZLM.killEvent(event));
}

self._ZEN_ComponentEx_colorWheel_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_ComponentEx_colorWheel__Loader = function() {
	zenLoadClass('_ZEN_Component_control');
	_ZEN_ComponentEx_colorWheel.prototype = zenCreate('_ZEN_Component_control',-1);
	var p = _ZEN_ComponentEx_colorWheel.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_ComponentEx_colorWheel;
	p.superClass = ('undefined' == typeof _ZEN_Component_control) ? zenMaster._ZEN_Component_control.prototype:_ZEN_Component_control.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.ComponentEx.colorWheel';
	p._type = 'colorWheel';
	p.serialize = _ZEN_ComponentEx_colorWheel_serialize;
	p.getSettings = _ZEN_ComponentEx_colorWheel_getSettings;
	p.ReallyRefreshContents = _ZEN_ComponentEx_colorWheel_ReallyRefreshContents;
	p.cleanUpMainUserEntry = _ZEN_ComponentEx_colorWheel_cleanUpMainUserEntry;
	p.cleanUpUserColorGunEntry = _ZEN_ComponentEx_colorWheel_cleanUpUserColorGunEntry;
	p.cleanUpUserEntry = _ZEN_ComponentEx_colorWheel_cleanUpUserEntry;
	p.constrainDragX = _ZEN_ComponentEx_colorWheel_constrainDragX;
	p.constrainDragY = _ZEN_ComponentEx_colorWheel_constrainDragY;
	p.endDrag = _ZEN_ComponentEx_colorWheel_endDrag;
	p.findParts = _ZEN_ComponentEx_colorWheel_findParts;
	p.getAngle = _ZEN_ComponentEx_colorWheel_getAngle;
	p.getRadius = _ZEN_ComponentEx_colorWheel_getRadius;
	p.getShade = _ZEN_ComponentEx_colorWheel_getShade;
	p.getShadeBlue = _ZEN_ComponentEx_colorWheel_getShadeBlue;
	p.getShadeGreen = _ZEN_ComponentEx_colorWheel_getShadeGreen;
	p.getShadeRed = _ZEN_ComponentEx_colorWheel_getShadeRed;
	p.getX = _ZEN_ComponentEx_colorWheel_getX;
	p.getY = _ZEN_ComponentEx_colorWheel_getY;
	p.initializeDOM = _ZEN_ComponentEx_colorWheel_initializeDOM;
	p.mixGuns = _ZEN_ComponentEx_colorWheel_mixGuns;
	p.moveCrosshair = _ZEN_ComponentEx_colorWheel_moveCrosshair;
	p.onRefreshContents = _ZEN_ComponentEx_colorWheel_onRefreshContents;
	p.onloadHandler = _ZEN_ComponentEx_colorWheel_onloadHandler;
	p.positionCrosshair = _ZEN_ComponentEx_colorWheel_positionCrosshair;
	p.positionHandle = _ZEN_ComponentEx_colorWheel_positionHandle;
	p.setProperty = _ZEN_ComponentEx_colorWheel_setProperty;
	p.setSliderValue = _ZEN_ComponentEx_colorWheel_setSliderValue;
	p.setValueHex = _ZEN_ComponentEx_colorWheel_setValueHex;
	p.setValueRGB = _ZEN_ComponentEx_colorWheel_setValueRGB;
	p.startDrag = _ZEN_ComponentEx_colorWheel_startDrag;
	p.updateMask = _ZEN_ComponentEx_colorWheel_updateMask;
	p.updatePreview = _ZEN_ComponentEx_colorWheel_updatePreview;
	p.updateVisibleAreas = _ZEN_ComponentEx_colorWheel_updateVisibleAreas;
	p.verifyHex = _ZEN_ComponentEx_colorWheel_verifyHex;
}

self._zenClassIdx['scribbleArea'] = '_ZEN_ComponentEx_scribbleArea';
self._ZEN_ComponentEx_scribbleArea = function(index,id) {
	if (index>=0) {_ZEN_ComponentEx_scribbleArea__init(this,index,id);}
}

self._ZEN_ComponentEx_scribbleArea__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_control__init) ?zenMaster._ZEN_Component_control__init(o,index,id):_ZEN_Component_control__init(o,index,id);
	o.controlClass = 'scribbleArea';
	o.culling = '0';
	o.nib = '2';
	o.smoothness = '1';
}
function _ZEN_ComponentEx_scribbleArea_serialize(set,s)
{
	var o = this;s[0]='4232315039';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=o.align;s[7]=o.aux;s[8]=o.clientType;s[9]=o.containerStyle;s[10]=o.controlClass;s[11]=o.controlStyle;s[12]=o.culling;s[13]=o.dataBinding;s[14]=(o.disabled?1:0);s[15]=(o.dragEnabled?1:0);s[16]=(o.dropEnabled?1:0);s[17]=(o.dynamic?1:0);s[18]=o.enclosingClass;s[19]=o.enclosingStyle;s[20]=o.error;s[21]=o.height;s[22]=(o.hidden?1:0);s[23]=o.hint;s[24]=o.hintClass;s[25]=o.hintStyle;s[26]=(o.invalid?1:0);s[27]=o.invalidMessage;s[28]=o.label;s[29]=o.labelClass;s[30]=o.labelDisabledClass;s[31]=o.labelStyle;s[32]=o.nib;s[33]=o.onafterdrag;s[34]=o.onbeforedrag;s[35]=o.onblur;s[36]=o.onchange;s[37]=o.onclick;s[38]=o.ondblclick;s[39]=o.ondrag;s[40]=o.ondrop;s[41]=o.onfocus;s[42]=o.onhide;s[43]=o.onkeydown;s[44]=o.onkeypress;s[45]=o.onkeyup;s[46]=o.onmousedown;s[47]=o.onmouseout;s[48]=o.onmouseover;s[49]=o.onmouseup;s[50]=o.onrefresh;s[51]=o.onshow;s[52]=o.onsubmit;s[53]=o.ontouchend;s[54]=o.ontouchmove;s[55]=o.ontouchstart;s[56]=o.onupdate;s[57]=o.onvalidate;s[58]=o.originalValue;s[59]=o.overlayMode;s[60]=(o.readOnly?1:0);s[61]=o.renderFlag;s[62]=(o.required?1:0);s[63]=o.requiredMessage;s[64]=(o.showLabel?1:0);s[65]=o.slice;s[66]=o.smoothness;s[67]=o.tabIndex;s[68]=o.title;s[69]=o.tuple;s[70]=o.valign;s[71]=('boolean'==typeof o.value?(o.value?1:0):o.value);s[72]=(o.visible?1:0);s[73]=o.width;
}
function _ZEN_ComponentEx_scribbleArea_getSettings(s)
{
	s['name'] = 'string';
	s['controlClass'] = 'cssClass';
	s['culling'] = 'integer';
	s['nib'] = 'integer';
	s['smoothness'] = 'integer';
	this.invokeSuper('getSettings',arguments);
}

self._ZEN_ComponentEx_scribbleArea_addLine = function(sx,sy,ex,ey) {
if (this.renderMode == "CVS") {
var g = this.canvasContext;
g.lineWidth = this.nib;
g.beginPath();
g.moveTo(sx,sy);
g.lineTo(ex,ey);
g.stroke();
}
else if (this.renderMode == "VML") {
var l = document.createElement("v:line");
l.setAttribute("from",sx+" "+sy);
l.setAttribute("to",ex+" "+ey);
l.setAttribute("strokecolor",this.inkColor);
l.setAttribute("strokeweight",this.nib);
this.canvas.appendChild(l);
}
}

self._ZEN_ComponentEx_scribbleArea_addStroke = function(c,x,y) {
if (this.sig.length>0 && this.sig[0].connect=="b") this.sig.pop();
if (c=="m") {
this.sig.push({connect:c, x:x, y:y});
}
else {
var s = this.sig.pop();
this.sig.push(s);
this.sig.push({connect:c, x:x, y:y});
setTimeout("zenPage.getComponent("+this.index+").addLine("+s.x+","+s.y+","+x+","+y+");",0);
}
}

self._ZEN_ComponentEx_scribbleArea_clear = function() {
this.sig=[];
this.sig.push({connect:'z',x:this.canvasWidth,y:this.canvasHeight});
this.setValue("z "+this.canvasWidth+" "+this.canvasHeight);
this.clearCanvas();
}

self._ZEN_ComponentEx_scribbleArea_clearCanvas = function() {
if (this.renderMode == "CVS" ) {
var g = this.canvasContext;
g.clearRect(0,0,this.canvasWidth,this.canvasHeight);
}
else if (this.renderMode == "VML") {
var q = null;
for (var p=this.canvas.firstChild; p!=null; p=q) {
q = p.nextSibling;
this.canvas.removeChild(p);
}
}
}

self._ZEN_ComponentEx_scribbleArea_exportAsPath = function(s,smoothingLevel,compressionLevel,showSize) {
if (!smoothingLevel) smoothingLevel = 0;
if (!compressionLevel) compressionLevel = 0;
for (var i=0;i<smoothingLevel;i++) {
var s = this.trimSignature(s,0);
s = this.smoothSignature(s);
}
s = this.trimSignature(s,compressionLevel);
var o = [];
for (var n = 0;n<s.length;n++) {
var pt = s[n];
var c = pt.connect;
if (c=='m' || c=='l' || (c=='z' && showSize)) {
if (n>0) o.push(",");
o.push(pt.connect+" "+pt.x+" "+pt.y);
}
}
var l = o.join("");
return(l);
}

self._ZEN_ComponentEx_scribbleArea_exportSignature = function(s,smoothingLevel,compressionLevel) {
if (!smoothingLevel) smoothingLevel = 0;
if (!compressionLevel) compressionLevel = 0;
for (var i=0;i<smoothingLevel;i++) {
var s = this.trimSignature(s,0);
s = this.smoothSignature(s);
}
s = this.trimSignature(s,compressionLevel);
var o = [];
o.push('[');
for (var n = 0;n<s.length;n++) {
var pt = s[n];
if (n>0) o.push(",");
o.push('{"s":"'+pt.connect+'","x":'+pt.x+',"y":'+pt.y+'}');
}
o.push(']');
var l = o.join('');
return(l);
}

self._ZEN_ComponentEx_scribbleArea_extractInkColor = function(div) {
this.inkColor = "#000000";
if (div.currentStyle) {
this.inkColor = div.currentStyle.color;
}
else if (window.getComputedStyle) {
this.inkColor = window.getComputedStyle(div,null).color;
}
}

self._ZEN_ComponentEx_scribbleArea_getProperty = function(property,key) {
switch(property) {
case 'value':
return this.normalizeValue(this.value);
}
return this.invokeSuper('getProperty',arguments);
}

self._ZEN_ComponentEx_scribbleArea_initialize = function() {
this.sig = [];
this.touchBaseX = "unset";
this.touchBaseY = "unset";
this.touchStroke = "m";
var e = this.getEnclosingDiv();
var d = null;
for (var n=e.firstChild;n!=null;n=n.nextSibling) {
if (n.className && n.className==this.controlClass) {
d = n;
n = e.lastChild;
}
}
if (!d) d = e;
this.extractInkColor(d);
ZLM.setLocalAttribute(d,"onmousedown","zenPage.getComponent("+this.index+").track(this,event);");
ZLM.setLocalAttribute(d,"ontouchstart","zenPage.getComponent("+this.index+").touchStart(this,event);");
ZLM.setLocalAttribute(d,"ontouchmove","zenPage.getComponent("+this.index+").touchMove(this,event);");
ZLM.setLocalAttribute(d,"ontouchend","zenPage.getComponent("+this.index+").touchEnd(this,event);");
var w = d.clientWidth;
var h = d.clientHeight;
this.canvasWidth = w;
this.canvasHeight = h;
this.sig.push({connect:'z',x:this.canvasWidth,y:this.canvasHeight});
this.setValue("z "+this.canvasWidth+" "+this.canvasHeight);
var cvs = null;
if (!this.supportsCanvasAPI() && document.namespaces) {
this.renderMode = "VML";
if(!document.documentMode || document.documentMode<8) {
document.namespaces.add("v","urn:schemas-microsoft-com:vml");
document.createStyleSheet().addRule('v\\:*', "behavior: url(#default#VML);");
}
if(document.documentMode && document.documentMode>=8) {
document.writeln('<?import namespace="v" implementation="#default#VML" ?>');
}
cvs = document.createElement("v:group");
cvs.style.width = w+"px";
cvs.style.height = h+"px";
cvs.setAttribute("coordsize",w+" "+h);
d.appendChild(cvs);
}
else {
this.renderMode = "CVS";
cvs = document.createElement("canvas");
cvs.width = w;
cvs.height = h;
var g = cvs.getContext("2d");
d.appendChild(cvs);
this.canvasContext = g;
}
this.canvas = cvs;
}

self._ZEN_ComponentEx_scribbleArea_onRefreshContents = function() {
this.initialize();
this.clearCanvas();
this.renderSignature(this.sig,this.smoothness,this.culling);
}

self._ZEN_ComponentEx_scribbleArea_onloadHandler = function() {
this.initialize();
this.parseValue();
}

self._ZEN_ComponentEx_scribbleArea_parseValue = function() {
this.sig=[];
if (this.value.length>1) {
var pts = this.value.split(",");
for (var i = 0; i<pts.length; i++) {
var d = pts[i].split(" ");
if (d.length==3) this.sig.push({connect:d[0], x:d[1], y:d[2]});
}
}
this.clearCanvas();
this.renderSignature(this.sig,this.smoothness,this.culling);
}

self._ZEN_ComponentEx_scribbleArea_renderSignature = function(s,smoothingLevel,compressionLevel) {
if (!smoothingLevel) smoothingLevel = 0;
if (!compressionLevel) compressionLevel = 0;
for (var i=0;i<smoothingLevel;i++) {
var s = this.trimSignature(s,0);
s = this.smoothSignature(s);
}
this.updateControlValue();
s = this.trimSignature(s,compressionLevel);
if (this.renderMode == "CVS") this.renderSignatureCVS(s);
else if (this.renderMode == "VML") this.renderSignatureVML(s);
}

self._ZEN_ComponentEx_scribbleArea_renderSignatureCVS = function(s) {
var g = this.canvasContext;
g.strokeStyle = this.inkColor;
g.lineWidth = this.nib;
var active = false;
for (var i=0; i<s.length; i++) {
var o=s[i];
if (o.connect=="m") {
if (active) g.stroke();
g.beginPath();
g.moveTo(o.x,o.y);
active = true;
}
if (o.connect=="l") {
g.lineTo(o.x,o.y);
}
}
if (active) g.stroke();
}

self._ZEN_ComponentEx_scribbleArea_renderSignatureVML = function(s) {
var sx = 0;
var sy = 0;
for (var i=0; i<s.length; i++) {
var o=s[i];
if (o.connect=="m") {
sx = o.x;
sy = o.y;
}
if (o.connect=="l") {
var l = document.createElement("v:line");
l.setAttribute("from",sx+" "+sy);
l.setAttribute("to",o.x+" "+o.y);
l.setAttribute("strokecolor",this.inkColor);
l.setAttribute("strokeweight",this.nib);
this.canvas.appendChild(l);
sx = o.x;
sy = o.y;
}
}
}

self._ZEN_ComponentEx_scribbleArea_setProperty = function(property,value,value2) {
switch(property) {
case 'compression':
var v = parseInt(value,10);
if (v<0) v=0;
this.compression = v;
break;
case 'culling':
var v = parseInt(value,10);
if (v<0) v=0;
this.culling = v;
break;
case 'nib':
var v = parseInt(value,10);
if (v<1) v = 1;
this.nib = v;
this.clearCanvas();
this.renderSignature(this.sig,this.smoothness,this.culling);
break;
case 'value':
this.value=value;
this.parseValue();
this.updateControlValue();
break;
default:
return this.invokeSuper('setProperty',arguments);
}
return true;
}

self._ZEN_ComponentEx_scribbleArea_showSource = function() {
var str = this.exportAsPath(this.sig,1,1);
alert(str);
}

self._ZEN_ComponentEx_scribbleArea_smoothSignature = function(s) {
var l=[];
var sIdx = 0;
if (s.length>0 && s[0].connect=="z") {
l.push({connect:"z",x:s[0].x,y:s[0].y});
sIdx++;
}
var x = 0;
var y = 0;
for (var n=sIdx;n<s.length-1;n++) {
if (s[n].connect=="m" || s[n+1].connect=="m") {
l.push({connect:s[n].connect,x:s[n].x,y:s[n].y});
}
else if (s[n].connect=="l" ){
var dx = Math.abs(s[n].x-s[n-1].x);
var dy = Math.abs(s[n].y-s[n-1].y);
if (dx>10 || dy>10) {
l.push({connect:s[n].connect,x:s[n].x,y:s[n].y});
}
else {
x = Math.round(s[n-1].x/4 + s[n].x/2 + s[n+1].x/4);
y = Math.round(s[n-1].y/4 + s[n].y/2 + s[n+1].y/4);
l.push({connect:"l",x:x,y:y});
}
}
}
if (s[n]) {
l.push({connect:s[n].connect,x:s[n].x,y:s[n].y});
}
return(l);
}

self._ZEN_ComponentEx_scribbleArea_supportsCanvasAPI = function() {
var canvas = document.createElement('canvas');
if (!canvas) return (false);
return ('getContext' in canvas);
}

self._ZEN_ComponentEx_scribbleArea_touchEnd = function(node,event) {
this.touchStroke = "m";
this.clearCanvas();
this.renderSignature(this.sig,this.smoothness,this.culling);
this.updateControlValue();
ZLM.killEvent(event);
}

self._ZEN_ComponentEx_scribbleArea_touchMove = function(node,event) {
if (event.touches.length==1) {
var t = event.touches[0];
var lastX = t.clientX-this.touchBaseX;
var lastY = t.clientY-this.touchBaseY;
this.addStroke(this.touchStroke,lastX,lastY);
this.touchStroke = "l";
}
ZLM.killEvent(event);
}

self._ZEN_ComponentEx_scribbleArea_touchStart = function(node,event) {
if (event.touches.length==1) {
this.touchBaseX = ZLM.getPageOffsetLeft(node)-zenGetPageScrollLeft();
this.touchBaseY = ZLM.getPageOffsetTop(node)-zenGetPageScrollTop();
ZLM.killEvent(event);
}
}

self._ZEN_ComponentEx_scribbleArea_track = function(who,event) {
if (navigator.userAgent.indexOf("Mobile")>0) return;
var baseX = ZLM.getPageOffsetLeft(who)-zenGetPageScrollLeft();
var baseY = ZLM.getPageOffsetTop(who)-zenGetPageScrollTop();
var obj = this;
if (document.addEventListener) { // real browsers
document.addEventListener("mouseup",upHandler,true);
document.addEventListener("mousemove",moveHandler,true);
}
else if (document.attachEvent) { // IE 5+
who.setCapture();
who.attachEvent("onmousemove",moveHandler);
who.attachEvent("onmouseup",upHandler);
who.attachEvent("onlosecapture",upHandler);
}
var lastX = event.clientX-baseX;
var lastY = event.clientY-baseY;
var stroke = "m";
function moveHandler(e) {
if (!e) e = window.event; // IE
var x = e.clientX-baseX;
var y = e.clientY-baseY;
if ((stroke=="m") || (Math.abs(lastX-x)+Math.abs(lastY-y)>2)) {
lastX = x;
lastY = y;
obj.addStroke(stroke,x,y);
stroke = "l";
}
ZLM.killEvent(e);
}
function upHandler(e) {
if (!e) e = window.event; // IE
if (document.removeEventListener) { // real browsers
document.removeEventListener("mouseup",upHandler,true);
document.removeEventListener("mousemove",moveHandler,true);
}
else if (document.detachEvent) { // IE 5+
who.detachEvent("onlosecapture",upHandler);
who.detachEvent("onmouseup",upHandler);
who.detachEvent("onmousemove",moveHandler);
who.releaseCapture();
}
obj.clearCanvas();
obj.renderSignature(obj.sig,obj.smoothness,obj.culling);
obj.updateControlValue();
ZLM.killEvent(e);
}
ZLM.killEvent(event);
}

self._ZEN_ComponentEx_scribbleArea_trimSignature = function(s,cull) {
var clip = 1-cull*0.005
var max = s.length;
for (var n=0;n<max;n++) {
s[n].keep = true;
if (n==max-1 || s[n].connect=="m" || s[n+1].connect=="m" || s[n].connect=="z") {
s[n].keep = true;
}
else if (n>0) {
var x0 = s[n-1].x;
var y0 = s[n-1].y;
var x1 = s[n].x;
var y1 = s[n].y;
var x2 = s[n+1].x;
var y2 = s[n+1].y;
if (y0==y1 && y0==y2) s[n].keep=false;
else if (x0==x1 && x0==x2) s[n].keep=false;
else {
var dx10 = x1-x0;
var dy10 = y1-y0;
var dx20 = x2-x0;
var dy20 = y2-y0;
if (Math.abs(dx10*dy20-dx20*dy10)<cull) s[n].keep=false;
else if (cull>0) {
var cosTh = ((dx10*dx20+dy10*dy20)/Math.sqrt((dx10*dx10+dy10*dy10)*(dx20*dx20+dy20*dy20)));
if (cosTh>clip) s[n].keep=false;
}
}
}
}
var l=[];
for (var n=0;n<max;n++) {
if (s[n].keep==true) {
l.push({connect:s[n].connect,x:s[n].x,y:s[n].y});
}
}
return(l);
}

self._ZEN_ComponentEx_scribbleArea_updateControlValue = function() {
var str = this.exportAsPath(this.sig,this.smoothness,this.culling,true);
this.value = str;
var el = this.findElement('control');
el.value = str;
this.onchangeHandler();
}

self._ZEN_ComponentEx_scribbleArea_Export = function(fileName,vector) {
	return zenClassMethod(this,'Export','L,L','INTEGER',arguments);
}

self._ZEN_ComponentEx_scribbleArea_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self._ZEN_ComponentEx_scribbleArea__Loader = function() {
	zenLoadClass('_ZEN_Component_control');
	_ZEN_ComponentEx_scribbleArea.prototype = zenCreate('_ZEN_Component_control',-1);
	var p = _ZEN_ComponentEx_scribbleArea.prototype;
	if (null==p) {return;}
	p.constructor = _ZEN_ComponentEx_scribbleArea;
	p.superClass = ('undefined' == typeof _ZEN_Component_control) ? zenMaster._ZEN_Component_control.prototype:_ZEN_Component_control.prototype;
	p.__ZENcomponent = true;
	p._serverClass = '%ZEN.ComponentEx.scribbleArea';
	p._type = 'scribbleArea';
	p.serialize = _ZEN_ComponentEx_scribbleArea_serialize;
	p.getSettings = _ZEN_ComponentEx_scribbleArea_getSettings;
	p.Export = _ZEN_ComponentEx_scribbleArea_Export;
	p.ReallyRefreshContents = _ZEN_ComponentEx_scribbleArea_ReallyRefreshContents;
	p.addLine = _ZEN_ComponentEx_scribbleArea_addLine;
	p.addStroke = _ZEN_ComponentEx_scribbleArea_addStroke;
	p.clear = _ZEN_ComponentEx_scribbleArea_clear;
	p.clearCanvas = _ZEN_ComponentEx_scribbleArea_clearCanvas;
	p.exportAsPath = _ZEN_ComponentEx_scribbleArea_exportAsPath;
	p.exportSignature = _ZEN_ComponentEx_scribbleArea_exportSignature;
	p.extractInkColor = _ZEN_ComponentEx_scribbleArea_extractInkColor;
	p.getProperty = _ZEN_ComponentEx_scribbleArea_getProperty;
	p.initialize = _ZEN_ComponentEx_scribbleArea_initialize;
	p.onRefreshContents = _ZEN_ComponentEx_scribbleArea_onRefreshContents;
	p.onloadHandler = _ZEN_ComponentEx_scribbleArea_onloadHandler;
	p.parseValue = _ZEN_ComponentEx_scribbleArea_parseValue;
	p.renderSignature = _ZEN_ComponentEx_scribbleArea_renderSignature;
	p.renderSignatureCVS = _ZEN_ComponentEx_scribbleArea_renderSignatureCVS;
	p.renderSignatureVML = _ZEN_ComponentEx_scribbleArea_renderSignatureVML;
	p.setProperty = _ZEN_ComponentEx_scribbleArea_setProperty;
	p.showSource = _ZEN_ComponentEx_scribbleArea_showSource;
	p.smoothSignature = _ZEN_ComponentEx_scribbleArea_smoothSignature;
	p.supportsCanvasAPI = _ZEN_ComponentEx_scribbleArea_supportsCanvasAPI;
	p.touchEnd = _ZEN_ComponentEx_scribbleArea_touchEnd;
	p.touchMove = _ZEN_ComponentEx_scribbleArea_touchMove;
	p.touchStart = _ZEN_ComponentEx_scribbleArea_touchStart;
	p.track = _ZEN_ComponentEx_scribbleArea_track;
	p.trimSignature = _ZEN_ComponentEx_scribbleArea_trimSignature;
	p.updateControlValue = _ZEN_ComponentEx_scribbleArea_updateControlValue;
}
/* EOF */