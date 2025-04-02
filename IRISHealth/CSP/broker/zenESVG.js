ESVG = {};

ESVG.svgNS = "http://www.w3.org/2000/svg";
ESVG.svgLink = "http://www.w3.org/1999/xlink";

ESVG.isAdobe = (window && window.navigator && window.navigator.appName && window.navigator.appName.indexOf('Adobe')==0);

// Define the standard rendering zones
ESVG.root = null;
ESVG.foundation = null;
ESVG.workingCanvas = null;
ESVG.background = null;
ESVG.canvas = null;
ESVG.foreground = null;
ESVG.metaLayer = null;
ESVG.workingCanvasClip = null;

ESVG.renderMode='S';  // S=SVG, C=Canvas, ???
ESVG.altProjection=[];  // Lookup table for non-SVG tag constructors (indexed by renderMode)
ESVG.isXHTML = false;	// Are we in an xhtml document?

ESVG.checkIfXHTML=function() {
	if (document.doctype) {
		if (document.doctype.publicId.indexOf("XHTML")>=0) {
			ESVG.isXHTML=true;
			return(true);
		}
	}
	ESVG.isXHTML=false;
	return(false);
}

ESVG.registerProjection=function(mode,tag,constructor) {
	if (!ESVG.altProjection[mode]) ESVG.altProjection[mode]=[];
	var p={};
	p.tag=tag;
	p.constructor=constructor;
	ESVG.altProjection[mode].push(p);
}

ESVG.set=function(who,what,value) {
	if (who) who.setAttribute(what,value);
}

ESVG.create=function(tag) {
//ZLM.cerr("IN ESVG CREATE");
//	if (ESVG.renderMode==null) return(null);
	if (ESVG.renderMode=="S") return(document.createElementNS(ESVG.svgNS,tag));
	var p=ESVG.altProjection[ESVG.renderMode];
	if (p) {
		for (var i=0;i<p.length;i++) {
			if (p[i].tag==tag) return(eval(p[i].constructor));
		}
		ZLM.cerr("Render mode "+ESVG.renderMode+" has no handler for tag "+tag);
		return(null);
	}
//else ZLM.cerr("would have liked to create: "+tag);
return(null);
}

ESVG.bindCanvas=function(svgBlock) {
	ESVG.renderMode = "S";
	var canvas = new ESVG.SVGRoot(svgBlock);
	canvas.div = null;
	var defs = ESVG.Defs.create();
	canvas.appendChild(defs);
	canvas.defs=defs;
	return(canvas);
}

ESVG.createCanvas=function(w,h,vb) {
	var d=ZLM.simulateTag("div style='position:absolute; margin:0; padding:0;'");
	var svgBits = ESVG.createBaseCanvas(w,h,vb);
	d.canvas = svgBits.canvas;
	d.body = svgBits.body;
	d.defs = svgBits.canvas.defs;
	d.appendChild(d.canvas.base);
	return(d);
}

ESVG.createBaseCanvas=function(w,h,vb) {
	var d={};
	d.canvas = ESVG.SVGRoot.create(w,h,vb);	
	d.body=d.canvas.base;
	d.canvas.div=d;
	var defs = ESVG.Defs.create();
	d.canvas.appendChild(defs);
	d.canvas.defs=defs;
	return(d);
}

ESVG.multiplyCTM = function(m,n) {
	var o = {};
	o.a = m.a*n.a+m.b*n.c;
	o.b = m.a*n.b+m.b*n.d;
	o.c = m.c*n.a+m.d*n.c;
	o.d = m.c*n.b+m.d*n.d;
	o.e = m.e*n.a+m.f*n.c+n.e;
	o.f = m.e*n.b+m.f*n.d+n.f;
	return(o);
}

ESVG.getRelativePos = function(node, ref) {
	// Would like to just use the CTM but Adobe doesn't multiply them out properly so we need
	// to assemble things manually
	var b=node.getBBox();

	if (!ESVG.isAdobe) {
		var t=node.parentNode.getCTM();
//ESVG.dumpObj(t);
		var m=ref.getCTM().inverse();
//ESVG.dumpObj(m);

//	var x=b.x*t.a+b.y*t.c+t.e-m.e;
//	var y=b.x*t.b+b.y*t.d+t.f-m.f;

		var gx=b.x*t.a+b.y*t.c+t.e;
		var gy=b.x*t.b+b.y*t.d+t.f;

		var x=gx*m.a+gy*m.c+m.e;
		var y=gx*m.b+gy*m.d+m.f;

		return({x:x,y:y});
	} 
	else {

		var m = node.getCTM();
//alert("Node offsets: ");
//ESVG.dumpObj(m);
		while (node.parentNode && node.parentNode.getCTM ) {
			var n = node.parentNode.getCTM();
//ESVG.dumpObj(n);
			var m = ESVG.multiplyCTM(n,m);
			node = node.parentNode;
		}
		var x=b.x*m.a+b.y*m.c+m.e;
		var y=b.x*m.b+b.y*m.d+m.f;

		var m = ref.getCTM();
//alert("Ref offsets: ");
//ESVG.dumpObj(m);
		while (ref.parentNode && ref.parentNode.getCTM ) {
			var n = ref.parentNode.getCTM();
//ESVG.dumpObj(n);
			var m = ESVG.multiplyCTM(n,m);
			ref = ref.parentNode;
		}
		x -= m.e;
		y -= m.f;
//alert('X: '+x+' Y: '+y);
		return({'x':x,'y':y});
	}
}


//===========================
ESVG.registry=[];
ESVG.regNum=0;

ESVG.SVGItem=function() {
	this.onClick=null;
	this.onMouseDown=null;
	this.onRightClick=null;
	this.onMouseUp=null;
	this.onMouseOver=null;
	this.onMouseOut=null;
	this.onMouseMove = null;
	this.onResize = null;
	this.onMove = null;
	this.onReshape = null;

	this.layoutBox=null;
	this.parentNode=null;
	this.firstChild=null;
	this.lastChild=null;
	this.nextSibling=null;
	this.previousSibling=null;
	this.kidList=[];
}

ESVG.SVGItem.prototype.clone=function() {
	var clone=eval("ESVG."+this.objClass).create();
	for (var p in this) {
		if (clone[p]!=this[p]) {
			var setter="set"+p.charAt(0).toUpperCase()+p.substring(1);
			if (this[setter]) {
				clone[setter](this[p]);
			}
//			else ZLM.cerr("need to set "+p+" to "+this[p]);
		}
	}
	return(clone);
}

ESVG.SVGItem.prototype.destroy=function() {
	if (this.layoutBox) {
		this.layoutBox.hide();
		this.removeLayoutBox();
	}
	if (this.parentNode) this.parentNode.removeChild(this);
}

ESVG.SVGItem.prototype.getRoot=function() {
	if (this.base.tagName=="svg") return(this);
	if (this.base.className=="ESVG_svg") return(this);
	if (this.parentNode) return(this.parentNode.getRoot());
	return(null);
}

ESVG.SVGItem.prototype.appendChild=function(newSVGChild) {
	if (newSVGChild==this) return;
	if (newSVGChild.parentNode!=null) newSVGChild.parentNode.removeChild(newSVGChild);
	newSVGChild.parentNode=this;
	this.kidList[this.kidList.length]=newSVGChild;
	if (this.firstChild==null) {
		this.kidList[0]=newSVGChild;
		this.firstChild=newSVGChild;
		this.lastChild=newSVGChild;
	}
	else {
		newSVGChild.previousSibling=this.lastChild;
		this.lastChild.nextSibling=newSVGChild;
		this.lastChild=newSVGChild;
	}
	this.base.appendChild(newSVGChild.base);
}

ESVG.SVGItem.prototype.hasChildNodes=function() {
	if (this.kidList.length>0) return(true);
	return(false);
}

ESVG.SVGItem.prototype.replaceChild=function(newC,oldC) {
	if (!newC || !oldC ) return;
	if (newC == this ) return;
	if (newC.parentNode!=null) newC.parentNode.removeChild(newC);
	newC.parentNode = this;
	newC.parentNode.base.replaceChild(newC.base,oldC.base);
	if (this.firstChild==oldC) this.firstChild=newC;
	if (this.lastChild==oldC) this.lastChild=newC;
	var k =this.kidList;
	for (var i=k.length-1;i>=0;i--) {
		if (k[i]==oldC) {
			oldC.previousSibling.nextSibling = newC;
			oldC.nextSibling.previousSibling = newC;
			newC.previousSibling = oldC.previousSibling;
			newC.nextSibling = oldC.nextSibling;
			k[i]=newC;
			return;
		}
	}
}

ESVG.SVGItem.prototype.removeChild=function(n) {
	if (n==null) return;
	var idx=0;
	var kl = this.kidList.length;
	while (idx<kl) {
		if (this.kidList[idx]==n) {
			this.base.removeChild(n.base);
			for (var i=idx;i<kl-1;i++) {
				this.kidList[i]=this.kidList[i+1];
			}
			this.kidList.pop();
			if (n.previousSibling) {
				n.previousSibling.nextSibling=n.nextSibling;
			}
			if (n.nextSibling) {
				n.nextSibling.previousSibling=n.previousSibling;
			}
			if (this.kidList.length>0) {
				this.firstChild=this.kidList[0];
				this.lastChild=this.kidList[this.kidList.length-1];
			}
			else {
				this.firstChild=null;
				this.lastChild=null;
			}
			n.parentNode=null;
			n.previousSibling=null;
			n.nextSibling=null;
			return;
		}
		idx++;
	}
}


ESVG.SVGItem.serviceMove=function(id) {
	ESVG.registry[id].doMoveNotify();
}

ESVG.SVGItem.serviceResize=function(id) {
	ESVG.registry[id].doResizeNotify();
}

ESVG.SVGItem.serviceMouseButton=function(id,event,eType) {
	ESVG.registry[id].doMouseButtonNotify(event,eType);
}

ESVG.SVGItem.prototype.registerInstance=function(div,objClass) {
	this.instanceId=ESVG.regNum;
	this.base=div;
	this.objClass=objClass;
	div.controller=this;
	ESVG.regNum++;
	ESVG.registry[this.instanceId]=this;
	this.objHook = "ESVG.registry["+this.instanceId+"].";
}

ESVG.SVGItem.prototype.setClass=function(className) {
	this.className = className;
	ESVG.set(this.base,"class",className);
}

ESVG.SVGItem.prototype.setPos=function(x,y) {
	this.x=x;
	this.y=y;
	ESVG.set(this.base,"x",x);
	ESVG.set(this.base,"y",y);
}

ESVG.SVGItem.prototype.getBounds=function() {
	var bounds=this.base.getBBox();
	return(bounds);
}

ESVG.SVGItem.prototype.getWidth=function() {
	var bounds=this.base.getBBox();
	return(bounds.width);
}

ESVG.SVGItem.prototype.getHeight=function() {
	var bounds=this.base.getBBox();
	return(bounds.height);
}

ESVG.SVGItem.prototype.getCenterX=function() {
	var bounds=this.base.getBBox();
	return(bounds.x+bounds.width/2);
}

ESVG.SVGItem.prototype.getCenterY=function() {
	var bounds=this.base.getBBox();
	return(bounds.y+bounds.height/2);
}

ESVG.SVGItem.prototype.makeSelectable=function() {
	ESVG.set(this.base,"onclick","ESVG.reportClick(evt.target,evt);");
}

ESVG.SVGItem.prototype.lockout=function() {
	ESVG.set(this.base,"onclick","return(true);");
}

ESVG.SVGItem.prototype.removeLayoutBox=function() {
	if (this.layoutBox) {
		if (ESVG.foreground) ESVG.foreground.removeChild(this.layoutBox);
		else this.getRoot().removeChild(this.layoutBox);
	}
}

ESVG.layoutOverlay = null;

ESVG.SVGItem.prototype.addLayoutBox=function() {
	if (this.layoutBox==null) {
		var bounds=this.base.getBBox();
//ESVG.dumpObj(this.base.getCTM());
//ESVG.dumpObj(bounds);
		this.layoutBox=ESVG.LayoutBox.create(bounds.x,bounds.y,bounds.width,bounds.height);
		this.layoutBox.targetNode = this.base;
		if (ESVG.layoutOverlay) ESVG.layoutOverlay.appendChild(this.layoutBox);
		else if (ESVG.foreground) ESVG.foreground.appendChild(this.layoutBox);
		else this.getRoot().appendChild(this.layoutBox);
		this.layoutBox.setResizeNotify("ESVG.SVGItem.serviceResize('"+this.instanceId+"');");
		this.layoutBox.setMoveNotify("ESVG.SVGItem.serviceMove('"+this.instanceId+"');");
	}
}

ESVG.SVGItem.prototype.showLayoutBox=function() {
	if (this.layoutBox==null) this.addLayoutBox();
	this.layoutActive=true;
	this.layoutBox.show();
}

ESVG.SVGItem.prototype.hideLayoutBox=function() {
	if (this.layoutBox!=null) this.layoutBox.hide();
	this.layoutActive=false;
}

ESVG.SVGItem.prototype.doMoveNotify=function() {
	this.raiseMoveNotify();
}

ESVG.SVGItem.prototype.doResizeNotify=function() {
alert('resize');
	this.raiseResizeNotify();
}

ESVG.SVGItem.prototype.raiseMoveNotify=function() {
	if (this.onMove!=null) eval(this.onMove);
}

ESVG.SVGItem.prototype.raiseResizeNotify=function() {
	if (this.onResize!=null) eval(this.onResize);
}

ESVG.SVGItem.prototype.doMouseButtonNotify=function(evt,eType) {
	if (eType==0) { //mouseDown
		this.mouseAtX=evt.clientX;
		this.mouseAtY=evt.clientY;
		this.mouseButton=evt.button;
		if (this.onMouseDown) return(eval(this.onMouseDown));
	}
	else if (eType==1) { //mouseUp
		if (this.onMouseUp) eval(this.onMouseUp);
		if (evt.clientX==this.mouseAtX && evt.clientY==this.mouseAtY && evt.button==this.mouseButton) {
			if (evt.button==0 && this.onClick) return(eval(this.onClick));
			else if (evt.button==2 && this.onRightClick) return(eval(this.onRightClick));
		}
	}
	else if (eType==2) { //mouseOver
		if (this.onMouseOver) return(eval(this.onMouseOver));
	}
	else if (eType==3) { //mouseOut
		if (this.onMouseOut) return(eval(this.onMouseOut));
	}
	else if (eType==4) { //mouseMove
		if (this.onMouseMove) return(eval(this.onMouseMove));
	}
}

ESVG.SVGItem.prototype.setOnClick=function(cbString){
	this.onClick=cbString;
	ESVG.set(this.base,"onmousedown","ESVG.SVGItem.serviceMouseButton('"+this.instanceId+"',evt,0);");
	ESVG.set(this.base,"onmouseup","ESVG.SVGItem.serviceMouseButton('"+this.instanceId+"',evt,1);");
}

ESVG.SVGItem.prototype.setOnRightClick=function(cbString){
	this.onRightClick=cbString;
	ESVG.set(this.base,"onmousedown","ESVG.SVGItem.serviceMouseButton('"+this.instanceId+"',evt,0);");
	ESVG.set(this.base,"onmouseup","ESVG.SVGItem.serviceMouseButton('"+this.instanceId+"',evt,1);");
}

ESVG.SVGItem.prototype.setOnMouseDown=function(cbString){
	this.onMouseDown=cbString;
	ESVG.set(this.base,"onmousedown","ESVG.SVGItem.serviceMouseButton('"+this.instanceId+"',evt,0);");
}

ESVG.SVGItem.prototype.setOnMouseUp=function(cbString){
	this.onMouseUp=cbString;
	ESVG.set(this.base,"onmouseup","ESVG.SVGItem.serviceMouseButton('"+this.instanceId+"',evt,1);");
}

ESVG.SVGItem.prototype.setOnMouseMove=function(cbString){
	this.onMouseMove=cbString;
	ESVG.set(this.base,"onmousemove","ESVG.SVGItem.serviceMouseButton('"+this.instanceId+"',evt,4);");
}

ESVG.SVGItem.prototype.setOnMouseOver=function(cbString) {
	this.onMouseOver=cbString;
	ESVG.set(this.base,"onmouseover","ESVG.SVGItem.serviceMouseButton('"+this.instanceId+"',evt,2);");
}

ESVG.SVGItem.prototype.setOnMouseOut=function(cbString) {
	this.onMouseOut=cbString;
	ESVG.set(this.base,"onmouseout","ESVG.SVGItem.serviceMouseButton('"+this.instanceId+"',evt,3);");
}

ESVG.SVGItem.prototype.setOnMove=function(cbString) {
	this.onMove=cbString;
}

ESVG.SVGItem.prototype.setOnResize=function(cbString) {
	this.onResize=cbString;
}

ESVG.SVGItem.prototype.setOnReshape=function(cbString) {
	this.onReshape=cbString;
}

ESVG.SVGItem.prototype.dump=function(killFns, killNulls) {
	var obj = this;
	for (var prop in obj){
		var showIt = true;
		var v = obj[prop];
		if (v && typeof(v)=='function') {
			v = '[FUNCTION]';
			if (killFns) showIt=false;
		}
		if (!v && killNulls) showIt=false;
		if (showIt) ZLM.cerr(this.objClass+": name "+prop+" value "+v);
	}
}

ESVG.SVGItem.prototype.projectSVG=function() {
	var s = [];
//ZLM.cerr("PROJECTING: "+this.base.tagName+' '+this.instanceId);
	s.push('<'+this.base.tagName+' ');
	var a = this.base.attributes;
	var l = a.length;
	for (var i=0;i<l;i++) {
		var n = a[i].nodeName;
		var v = a[i].nodeValue;
		if (n.indexOf('on')!=0) s.push(n+'="'+v+'" ');
	}

	if (this.kidList.length>0) {
//ZLM.cerr(this.base.tagName+' has '+this.kidList.length+' kids');
		s.push('>');
		var k = this.kidList;
		var len = k.length;
		for (var i=0;i<len; i++) {
			s.push(k[i].projectSVG());
		}
		s.push('</'+this.base.tagName+'>');
	}
	else {
		s.push('/>');
	}
	return(s.join('\n'));
}	

ESVG.SVGItem.prototype.restoreStyles = function(obj) {
	if (!obj) return;
	var n = this.base;
	var a = ESVG.ATTRIBUTES;
	var aLen = a.length;
	for (var i=0;i<aLen;i++) {
		var o = a[i];
		var v = obj[o.abbr];
		if (v) { // attribute defined
			var jName = ESVG.xmlGoNative(o.name);
			this[jName]= v;
			ESVG.set(n,o.name,v);
		}
	}	
}

ESVG.SVGItem.prototype.projectAttributesAsJSON=function() {
	var s=[];
	var n = this.base;
	var a = ESVG.ATTRIBUTES;
	var aLen = a.length;
	s.push('{');
	var first = true;
	for (var i=0;i<aLen;i++) {
		var o = a[i];
		var v = n.getAttribute(o.name);
		if (v && v!=o.d) {
			if (!first) s.push(',');
			first = false;
			s.push(o.abbr+':"'+v+'"');
		}
	}
	s.push('}');
	if (s.length==2) return(null);
	return(s.join(''));
}

ESVG.SVGItem.prototype.projectClassDataAsJSON=function() {
	return(null);
}

ESVG.SVGItem.prototype.projectJSON=function(killFns, killNulls) {
	var obj = this;

	var attr = this.projectAttributesAsJSON();
	if (attr) attr = "oA:"+attr+",";

	var kids = "oK:[]";
	if (this.firstChild) {
		var k = [];
		k.push("oK:[\n");
		for (var p=this.firstChild;p!=null;p=p.nextSibling) {
			if (p!=this.firstChild) k.push(",\n");
			k.push(p.projectJSON(killFns,killNulls));
		}
		k.push("]");
		var kids = k.join('')
	}
		
	var data = this.projectClassDataAsJSON();
	
	var s = [];
	s.push('{oC:"'+this.objClass+'", ');
	if (data) s.push(data);
	if (attr) s.push(attr);
	s.push(kids+'}');
	return(s.join(''));
}

ESVG.SVGItem.prototype.addGCObject=function() {
	var props = ["fill","fillOpacity","stroke","strokeOpacity","strokeWidth","strokeStyle"];
	var propLen = 6;
	var gc = {};
	for (var i=0;i<propLen;i++) gc[props[i]]=this[props[i]];
	this.gc = gc;
}

ESVG.SVGItem.prototype.addTextGC=function() {
	var props = ["fontFamily","fontSize","fontWeight","fontStyle","textDecoration"];
	var propLen = 5;
	if (!this.gc) this.addGCObject();
	for (var i=0;i<propLen;i++) this.gc[props[i]]=this[props[i]];
}

ESVG.SVGItem.prototype.updateGC=function(update) {
	for (var p in update) {
		if (this.gc[p]!="undefined") {
			var v = update[p];
			this.gc[p]=v;
			switch(p) {
				case "fill": this.setFill(v);
					break;
				case "fillOpacity": this.setFillOpacity(v);
					break;
				case "stroke": this.setStroke(v);
					break;
				case "strokeOpacity": this.setStrokeOpacity(v);
					break;
				case "strokeWidth": this.setStrokeWidth(v);
					break;
//case "strokeStyle": this.setStrokeStyle(v);
//break;
				case "fontFamily": this.setFontFamily(v);
					break;
				case "fontSize": this.setFontSize(v);
					break;
				case "fontWeight": this.setFontWeight(v);
					break;
				case "fontStyle": this.setFontStyle(v);
					break;
				case "textDecoration": this.setTextDecoration(v);
					break;
			}
		}
	}
}

ESVG.ATTRIBUTES = [
{name:'alignment-baseline',	abbr:'sab',	d:''},
{name:'baseline-shift',		abbr:'sbs',	d:'baseline'},
{name:'clip',			abbr:'sx',	d:'auto'},
{name:'clip-path',		abbr:'sxp',	d:''},
{name:'clip-rule',		abbr:'sxr',	d:''},
{name:'color',			abbr:'sc',	d:''},
{name:'color-interpolation',	abbr:'sci',	d:'sRGB'},
{name:'color-interpolation-filters',	abr:'scif',	d:'linearRGB'},
{name:'color-profile',		abbr:'scp',	d:'auto'},
{name:'color-rendering',	abbr:'scr',	d:'auto'},
{name:'cursor',			abbr:'smp',	d:'auto'},
{name:'direction',		abbr:'sdir',	d:'ltr'},
{name:'display',		abbr:'sd',	d:'inline'},
{name:'dominant-baseline',	abbr:'sdb',	d:'auto'},
{name:'enable-background',	abbr:'seb',	d:'accumulate'},
{name:'fill',			abbr:'sf',	d:'black'},
{name:'fill-opacity',		abbr:'sfo',	d:'1'},
{name:'fill-rule',		abbr:'sfr',	d:'nonzero'},
{name:'filter',			abbr:'sft',	d:'none'},
{name:'flood-color',		abbr:'sflc',	d:'black'},
{name:'flood-opacity',		abbr:'sflo',	d:'1'},
{name:'font',			abbr:'sfn',	d:''},
{name:'font-family',		abbr:'sff',	d:''},
{name:'font-size',		abbr:'sfz',	d:''},
{name:'font-size-adjust',	abbr:'sfza',	d:'none'},
{name:'font-stretch',		abbr:'sfp',	d:'normal'},
{name:'font-style',		abbr:'sfs',	d:'normal'},
{name:'font-variant',		abbr:'sfv',	d:'normal'},
{name:'font-weight',		abbr:'sfw',	d:'normal'},
{name:'glyph-orientation-horizontal',	abbr:'sgoh',	d:'0deg'},
{name:'glyph-orientation-vertical',	abbr:'sgov',	d:'auto'},
{name:'image-rendering',	abbr:'sir',	d:'auto'},
{name:'kerning',		abbr:'sk',	d:'auto'},
{name:'letter-spacing',		abbr:'sls',	d:'normal'},
{name:'lighting-color',		abbr:'slc',	d:'white'},
{name:'marker',			abbr:'sm',	d:'none'},
{name:'marker-end',		abbr:'sme',	d:'none'},
{name:'marker-start',		abbr:'sms',	d:'none'},
{name:'marker-mid',		abbr:'smm',	d:'none'},
{name:'mask',			abbr:'smk',	d:'none'},
{name:'opacity',		abbr:'so',	d:'1'},
{name:'overflow',		abbr:'sof',	d:''},
{name:'pointer-events',		abbr:'spe',	d:'visiblePainted'},
{name:'shape-rendering',	abbr:'ssr',	d:'auto'},
{name:'stop-color',		abbr:'sspc',	d:'black'},
{name:'stop-opacity',		abbr:'sspo',	d:'1'},
{name:'stroke',			abbr:'ss',	d:''},
{name:'stroke-dasharray',	abbr:'ssda',	d:'none'},
{name:'stroke-dashoffset',	abbr:'ssdo',	d:'0'},
{name:'stroke-linecap',		abbr:'sslc',	d:'butt'},
{name:'stroke-linejoin',	abbr:'sslj',	d:'miter'},
{name:'stroke-miterlimit',	abbr:'ssml',	d:'4'},
{name:'stroke-opacity',		abbr:'sso',	d:'1'},
{name:'stroke-width',		abbr:'ssw',	d:'1'},
{name:'text-anchor',		abbr:'sta',	d:'start'},
{name:'text-decoration',	abbr:'std',	d:'none'},
{name:'text-rendering',		abbr:'str',	d:'auto'},
{name:'transform',		abbr:'stf',	d:''},
{name:'unicode-bidi',		abbr:'sub',	d:'normal'},
{name:'visibility',		abbr:'sv',	d:'visible'},
{name:'word-spacing',		abbr:'sws',	d:'normal'},
{name:'writing-mode',		abbr:'swm',	d:'lr-tb'}];

/*
// Style Attributes
//====ATTRIBUTE NAME======JSON ABBR=========DEFAULT=========
alignment-baseline		sab		-
baseline-shift			sbs		baseline
clip				sx		auto
clip-path			sxp		-
clip-rule			sxr		-
color				sc		-
color-interpolation		sci		sRGB
color-interpolation-filters	scif		linearRGB
color-profile			scp		auto
color-rendering			scr		auto
cursor				smp		auto
direction			sdir		ltr
display				sd		inline
dominant-baseline		sdb		auto
enable-background		seb		accumulate
fill				sf		black
fill-opacity			sfo		1
fill-rule			sfr		nonzero
filter				sft		none
flood-color			sflc		black
flood-opacity			sflo		1
font				sfn		-
font-family			sff		-
font-size			sfz		-
font-size-adjust		sfza		none
font-stretch			sfp		normal
font-style			sfs		normal
font-variant			sfv		normal
font-weight			sfw		normal
glyph-orientation-horizontal	sgoh		0deg
glyph-orientation-vertical	sgov		auto
image-rendering			sir		auto
kerning				sk		auto
letter-spacing			sls		normal
lighting-color			slc		white
marker				sm		none
marker-end			sme		none
marker-start			sms		none
marker-mid			smm		none
mask				smk		none
opacity				so		1
overflow			sof		-
pointer-events			spe		visiblePainted
shape-rendering			ssr		auto
stop-color			sspc		black
stop-opacity			sspo		1
stroke				ss		-
stroke-dasharray		ssda		none
stroke-dashoffset		ssdo		0
stroke-linecap			sslc		butt
stroke-linejoin			sslj		miter
stroke-miterlimit		ssml		4
stroke-opacity			sso		1
stroke-width			ssw		1
text-anchor			sta		start
text-decoration			std		none
text-rendering			str		auto
unicode-bidi			sub		normal
visibility			sv		visible
word-spacing			sws		normal
writing-mode			swm		lr-tb
*/
//===============================
ESVG.SVGItem.prototype.setAlignmentBaseline=function(baseline) {
	if (!baseline) return;
	this.alignementBaseline=baseline;
	ESVG.set(this.base,"alignment-baseline",baseline);
}

ESVG.SVGItem.prototype.setBaselineShift=function(a) {
	if (!a) return;
	this.baselineShift=a;
	ESVG.set(this.base,"baseline-shift",a);
}

ESVG.SVGItem.prototype.setClip=function(a) {
	if (!a) return;
	this.clip=a;
	ESVG.set(this.base,"clip",a);
}

ESVG.SVGItem.prototype.setClipPath=function(a) {
	if (!a) return;
	this.clipPath=a;
	ESVG.set(this.base,"clip-path",a);
}

ESVG.SVGItem.prototype.setClipRule=function(a) {
	if (!a) return;
	this.clipRule=a;
	ESVG.set(this.base,"clip-rule",a);
}

ESVG.SVGItem.prototype.setColor=function(a) {
	if (!a) return;
	this.color=a;
	ESVG.set(this.base,"color",a);
}

ESVG.SVGItem.prototype.setColorInterpolation=function(a) {
	if (!a) return;
	this.colorInterpolation=a;
	ESVG.set(this.base,"color-interpolation",a);
}

ESVG.SVGItem.prototype.setColorInterpolationFilters=function(a) {
	if (!a) return;
	this.colorInterpolationFilters=a;
	ESVG.set(this.base,"color-interpolation-filters",a);
}

ESVG.SVGItem.prototype.setColorProfile=function(a) {
	if (!a) return;
	this.colorProfile=a;
	ESVG.set(this.base,"color-profile",a);
}

ESVG.SVGItem.prototype.setColorRendering=function(a) {
	if (!a) return;
	this.colorRendering=a;
	ESVG.set(this.base,"color-rendering",a);
}

ESVG.SVGItem.prototype.setCursor=function(a) {
	if (!a) return;
	this.cursor=a;
	ESVG.set(this.base,"cursor",a);
}

ESVG.SVGItem.prototype.setDirection=function(a) {
	if (!a) return;
	this.direction=a;
	ESVG.set(this.base,"direction",a);
}

ESVG.SVGItem.prototype.setDisplay=function(a) {
	if (!a) return;
	this.display=a;
	ESVG.set(this.base,"display",a);
}

ESVG.SVGItem.prototype.setDominantBaseline=function(a) {
	if (!a) return;
	this.dominantBaseline=a;
	ESVG.set(this.base,"dominant-baseline",a);
}

ESVG.SVGItem.prototype.setEnableBackground=function(a) {
	if (!a) return;
	this.enableBackground=a;
	ESVG.set(this.base,"enableBackground",a);
}

ESVG.SVGItem.prototype.setFill=function(fill) {
	if (!fill) return;
	this.fill=fill;
	ESVG.set(this.base,"fill",fill);
}

ESVG.SVGItem.prototype.setFillOpacity=function(fill) {
	if (!fill) return;
	this.fillOpacity=fill;
	ESVG.set(this.base,"fill-opacity",fill);
}

ESVG.SVGItem.prototype.setFillRule=function(a) {
	if (!a) return;
	this.fillRule=a;
	ESVG.set(this.base,"fill-rule",a);
}

ESVG.SVGItem.prototype.setFilter=function(a) {
	if (!a) return;
	this.filter=a;
	ESVG.set(this.base,"filter",a);
}

ESVG.SVGItem.prototype.setFloodColor=function(a) {
	if (!a) return;
	this.floodColor=a;
	ESVG.set(this.base,"flood-color",a);
}

ESVG.SVGItem.prototype.setFloodOpacity=function(a) {
	if (!a) return;
	this.floodOpacity=a;
	ESVG.set(this.base,"flood-opacity",a);
}

ESVG.SVGItem.prototype.setFont=function(font) {
	if (!font) return;
	this.font=font;
	ESVG.set(this.base,"font",font);
}

ESVG.SVGItem.prototype.setFontFamily=function(font) {
	if (!font) return;
	this.fontFamily=font;
	ESVG.set(this.base,"font-family",font);
}

ESVG.SVGItem.prototype.setFontSize=function(sz) {
	if (!sz) return;
	this.fontSize=sz;
	ESVG.set(this.base,"font-size",sz);	
}

ESVG.SVGItem.prototype.setFontSizeAdjust=function(sz) {
	if (!sz) return;
	this.fontSizeAdjust=sz;
	ESVG.set(this.base,"font-size-adjust",sz);	
}

ESVG.SVGItem.prototype.setFontStretch=function(a) {
	if (!a) return;
	this.fontStretch=a;
	ESVG.set(this.base,"font-stretch",a);
}

ESVG.SVGItem.prototype.setFontStyle=function(a) {
	if (!a) return;
	this.fontStyle=a;
	ESVG.set(this.base,"font-style",a);
}

ESVG.SVGItem.prototype.setFontVariant=function(a) {
	if (!a) return;
	this.fontVariant=a;
	ESVG.set(this.base,"font-variant",a);
}

ESVG.SVGItem.prototype.setFontWeight=function(a) {
	if (!a) return;
	this.fontWeight=a;
	ESVG.set(this.base,"font-weight",a);
}

ESVG.SVGItem.prototype.setGlyphOrientationHorizontal=function(a) {
	if (!a) return;
	this.glyphOrientationHorizontal=a;
	ESVG.set(this.base,"glyph-orientation-horizontal",a);
}

ESVG.SVGItem.prototype.setGlyphOrientationVertical=function(a) {
	if (!a) return;
	this.glyphOrientationVertical=a;
	ESVG.set(this.base,"glyph-orientation-vertical",a);
}

ESVG.SVGItem.prototype.setImageRendering=function(a) {
	if (!a) return;
	this.imageRendering=a;
	ESVG.set(this.base,"image-rendering",a);
}

ESVG.SVGItem.prototype.setKerning=function(a) {
	if (!a) return;
	this.kerning=a;
	ESVG.set(this.base,"kerning",a);
}

ESVG.SVGItem.prototype.setLetterSpacing=function(a) {
	if (!a) return;
	this.letterSpacing=a;
	ESVG.set(this.base,"letter-spacing",a);
}

ESVG.SVGItem.prototype.setLightingColor=function(a) {
	if (!a) return;
	this.lightingColor=a;
	ESVG.set(this.base,"lighting-color",a);
}

ESVG.SVGItem.prototype.setMarker=function(a) {
	if (!a) return;
	this.marker=a;
	ESVG.set(this.base,"marker",a);
}

ESVG.SVGItem.prototype.setMarkerEnd=function(a) {
	if (!a) return;
	this.markerEnd=a;
	ESVG.set(this.base,"marker-end",a);
}

ESVG.SVGItem.prototype.setMarkerStart=function(a) {
	if (!a) return;
	this.markerStart=a;
	ESVG.set(this.base,"marker-start",a);
}

ESVG.SVGItem.prototype.setMarkerMid=function(a) {
	if (!a) return;
	this.markerMid=a;
	ESVG.set(this.base,"marker-mid",a);
}

ESVG.SVGItem.prototype.setMask=function(a) {
	if (!a) return;
	this.mask=a;
	ESVG.set(this.base,"mask",a);
}

ESVG.SVGItem.prototype.setOpacity=function(a) {
	if (!a) return;
	this.opacity=a;
	ESVG.set(this.base,"opacity",a);
}

ESVG.SVGItem.prototype.setOverflow=function(a) {
	if (!a) return;
	this.overflow=a;
	ESVG.set(this.base,"overflow",a);
}

ESVG.SVGItem.prototype.setPointerEvents=function(a) {
	if (!a) return;
	this.pointerEvents=a;
	ESVG.set(this.base,"pointer-events",a);
}

ESVG.SVGItem.prototype.setShapeRendering=function(a) {
	if (!a) return;
	this.shapeRendering=a;
	ESVG.set(this.base,"shape-rendering",a);
}

ESVG.SVGItem.prototype.setStopColor=function(a) {
	if (!a) return;
	this.stopColor=a;
	ESVG.set(this.base,"stop-color",a);
}

ESVG.SVGItem.prototype.setStopOpacity=function(a) {
	if (!a) return;
	this.stopOpacity=a;
	ESVG.set(this.base,"stop-opacity",a);
}

ESVG.SVGItem.prototype.setStroke=function(color) {
	if (!color) return;
	this.stroke=color;
	ESVG.set(this.base,"stroke",color);
}

ESVG.SVGItem.prototype.setStrokeDashArray=function(a) {
	if (!a) return;
	this.strokeDashArray=a;
	ESVG.set(this.base,"stroke-dasharray",a);
}

ESVG.SVGItem.prototype.setStrokeDashOffset=function(a) {
	if (!a) return;
	this.strokeDashOffset=a;
	ESVG.set(this.base,"stroke-dashoffset",a);
}

ESVG.SVGItem.prototype.setStrokeLineCap=function(a) {
	if (!a) return;
	this.strokeLineCap=a;
	ESVG.set(this.base,"stroke-linecap",a);
}

ESVG.SVGItem.prototype.setStrokeLineJoin=function(a) {
	if (!a) return;
	this.strokeLineJoin=a;
	ESVG.set(this.base,"stroke-linejoin",a);
}

ESVG.SVGItem.prototype.setStrokeMiterLimit=function(a) {
	if (!a) return;
	this.strokeMiterLimit=a;
	ESVG.set(this.base,"stroke-miterlimit",a);
}

ESVG.SVGItem.prototype.setStrokeOpacity=function(a) {
	if (!a) return;
	this.strokeOpacity=a;
	ESVG.set(this.base,"stroke-opacity",a);
}

ESVG.SVGItem.prototype.setStrokeWidth=function(a) {
	if (!a) return;
	this.strokeWidth=a;
	ESVG.set(this.base,"stroke-width",a);
}

ESVG.SVGItem.prototype.setTextAnchor=function(a) {
	if (!a) return;
	this.textAnchor=a;
	ESVG.set(this.base,"text-anchor",a);
}

ESVG.SVGItem.prototype.setTextDecoration=function(a) {
	if (!a) return;
	this.textDecoration=a;
	ESVG.set(this.base,"text-decoration",a);
}

ESVG.SVGItem.prototype.setTextRendering=function(a) {
	if (!a) return;
	this.textRendering=a;
	ESVG.set(this.base,"text-rendering",a);
}

ESVG.SVGItem.prototype.setTransform=function(a) {
	if (!a) return;
	this.transform=a;
	ESVG.set(this.base,"transform",a);
}


ESVG.SVGItem.prototype.setUnicodeBidi=function(a) {
	if (!a) return;
	this.unicodeBidi=a;
	ESVG.set(this.base,"unicode-bidi",a);
}

ESVG.SVGItem.prototype.setVisibility=function(a) {
	if (!a) return;
	this.visibility=a;
	ESVG.set(this.base,"visibility",a);
}

ESVG.SVGItem.prototype.setWordSpacing=function(a) {
	if (!a) return;
	this.wordSpacing=a;
	ESVG.set(this.base,"word-spacing",a);
}

ESVG.SVGItem.prototype.setWritingMode=function(a) {
	if (!a) return;
	this.writingMode=a;
	ESVG.set(this.base,"writing-mode",a);
}

ESVG.SVGItem.prototype.getInlineStyle=function() {
	var s="";
	if (this.alignmentBaseline) s+="alignment-baseline:"+this.alignmentBaseline+";";
	if (this.baselineShift) s+="baselineShift:"+this.baselineShift+";";
	if (this.clip) s+="clip:"+this.clip+";";
	if (this.clipPath) s+="clipPath:"+this.clipPath+";";
	if (this.clipRule) s+="clipRule:"+this.clipRule+";";
	if (this.color) s+="color:"+this.color+";";
	if (this.colorInterpolation) s+="color-interpolation:"+this.colorInterpolation+";";
	if (this.colorInterpolationFilters) s+="color-interpolation-filters:"+this.colorInterpolationFilters+";";
	if (this.colorProfile) s+="color-profile:"+this.colorProfile+";";
	if (this.colorRendering) s+="color-rendering:"+this.colorRendering+";";
	if (this.cursor) s+="cursor:"+this.cursor+";";
	if (this.direction) s+="direction:"+this.direction+";";
	if (this.display) s+="display:"+this.display+";";
	if (this.dominantBaseline) s+="dominant-baseline:"+this.dominantBaseline+";";
	if (this.enableBackground) s+="enable-background:"+this.enableBackground+";";
	if (this.fill) s+="fill:"+this.fill+";";
	if (this.fillOpacity) s+="fill-opacity:"+this.fillOpacity+";";
	if (this.fillRule) s+="fill-rule:"+this.fillRule+";";
	if (this.filter) s+="filter:"+this.filter+";";
	if (this.floodColor) s+="flood-color:"+this.floodColor+";";
	if (this.floodOpacity) s+="flood-opacity:"+this.floodOpacity+";";
	if (this.font) s+="font:"+this.font+";";
	if (this.fontFamily) s+="font-family:"+this.fontFamily+";";
	if (this.fontSize) s+="font-size:"+this.fontSize+";";
	if (this.fontSizeAdjust) s+="font-size-adjust:"+this.fontSizeAdjust+";";
	if (this.fontStretch) s+="font-stretch:"+this.fontStretch+";";
	if (this.fontStyle) s+="font-style:"+this.fontStyle+";";
	if (this.fontVariant) s+="font-variant:"+this.fontVariant+";";
	if (this.fontWeight) s+="font-weight:"+this.fontWeight+";";
	if (this.glyphOrientationHorizontal) s+="glyph-orientation-horizontal:"+this.glyphOrientationHorizontal+";";
	if (this.glyphOrientationVertical) s+="glyph-orientation-vertical:"+this.glyphOrientationVertical+";";
	if (this.imageRendering) s+="image-rendering:"+this.imageRendering+";";
	if (this.kerning) s+="kerning:"+this.kerning+";";
	if (this.letterSpacing) s+="letter-spacing:"+this.letterSpacing+";";
	if (this.lightingColor) s+="lighting-color:"+this.lightingColor+";";
	if (this.marker) s+="marker:"+this.marker+";";
	if (this.markerEnd) s+="marker-end:"+this.markerEnd+";";
	if (this.markerMid) s+="marker-mid:"+this.markerMid+";";
	if (this.markerStart) s+="marker-start:"+this.markerStart+";";
	if (this.mask) s+="mask:"+this.mask+";";
	if (this.opacity) s+="opacity:"+this.opacity+";";
	if (this.overflow) s+="overflow:"+this.overflow+";";
	if (this.pointerEvent) s+="pointer-events:"+this.pointerEvents+";";
	if (this.shapeRendering) s+="shape-rendering:"+this.shapeRendering+";";
	if (this.stopColor) s+="stop-color:"+this.stopColor+";";
	if (this.stopOpacity) s+="stop-opacity:"+this.stopOpacity+";";
	if (this.stroke) s+="stroke:"+this.stroke+";";
	if (this.strokeDashArray) s+="stroke-dasharray:"+this.strokeDashArray+";";
	if (this.strokeDashOffset) s+="stroke-dashoffset:"+this.strokeDashOffset+";";
	if (this.strokeLineCap) s+="stroke-linecap:"+this.strokeLineCap+";";
	if (this.strokeLineJoin) s+="stroke-linejoin:"+this.strokeLineJoin+";";
	if (this.strokeMiterLimit) s+="stroke-miterlimit:"+this.strokeMiterLimit+";";
	if (this.strokeOpacity) s+="stroke-opacity:"+this.strokeOpacity+";";
	if (this.strokeWidth) s+="stroke-width:"+this.strokeWidth+";";
	if (this.textAnchor) s+="text-anchor:"+this.textAnchor+";";
	if (this.textDecoration) s+="text-decoration:"+this.textDecoration+";";
	if (this.textRendering) s+="text-rendering:"+this.textRendering+";";
	if (this.unicodeBidi) s+="unicode-bidi:"+this.unicodeBidi+";";
	if (this.visibility) s+="visibility:"+this.visibility+";";
	if (this.wordSpacing) s+="word-spacing:"+this.wordSpacing+";";
	if (this.writingMode) s+="writing-mode:"+this.writingMode+";";
	return(s);
}

//=============================================================
ESVG.SVGRoot=function(node,w,h,vb) {
	this.registerInstance(node,"SVGRoot");
	if (vb) {
		this.scale=null;
		this.setViewBox(vb);
	}
	else this.scale=1;
	this.kidList=[];
	ESVG.set(this.base,"xmlns","http://www.w3.org/2000/svg");
	ESVG.set(this.base,"xmlns:xlink","http://www.w3.org/1999/xlink");
	ESVG.set(this.base,"zoomAndPan","disable");
	this.setPos(0,0);
	if (w) this.setGeometry(w,h);
	return(this);
}

ESVG.SVGRoot.create=function(w,h,vb) {
	var node=ESVG.create("svg");
	return(new ESVG.SVGRoot(node,w,h,vb));
}

ESVG.SVGRoot.prototype=new ESVG.SVGItem();

ESVG.SVGRoot.prototype.setViewBox=function(vb) {
	this.vb = vb;
	ESVG.set(this.base,"viewBox",vb);
	var a=vb.split(" ");
	this.viewMinX=parseInt(a[0],10);
	this.viewMinY=parseInt(a[1],10);
	this.viewMaxX=parseInt(a[2],10);
	this.viewMaxY=parseInt(a[3],10);
	this.viewH=this.viewMaxY-this.viewMinY;
	this.viewW=this.viewMaxX-this.viewMinX;
	this.scale=null;
}

ESVG.SVGRoot.prototype.setViewExtent=function(w,h) {
	var vw=parseInt(w);
	var vh=parseInt(h);
	this.viewMinX=0;
	this.viewMinY=0;
	this.viewMaxX=vw;
	this.viewMaxY=vh;
	this.viewH=this.viewMaxY-this.viewMinY;
	this.viewW=this.viewMaxX-this.viewMinX;
	ESVG.set(this.base,"viewBox","0 0 "+vw+" "+vh);
}

ESVG.SVGRoot.prototype.setGeometry=function(w,h) {
	this.w=w;
	this.h=h;
	ESVG.set(this.base,"width",w);
	ESVG.set(this.base,"height",h);
}

ESVG.SVGRoot.prototype.getScale=function() {
	if (this.scale) return(this.scale);
	this.scale=parseInt(this.viewMaxX-this.viewMinX)/this.div.offsetWidth;
	return(this.scale);
}

ESVG.SVGRoot.prototype.render=function() {
	var m=ESVG.renderMode;
	if (m=="C") {
		var c=this.base.getContext("2d");
		for (var i=this.firstChild;i!=null;i=i.nextSibling) {
			if (i.render) i.render(m,c);
		}
	}
}

ESVG.SVGRoot.prototype.projectClassDataAsJSON=function() {
	var s = [];
	if (this.x) s.push('cX:"'+this.x+'"');
	if (this.y) s.push('cY:"'+this.y+'"');
	if (this.w) s.push('cW:"'+this.w+'"');
	if (this.h) s.push('cH:"'+this.h+'"');
	if (this.vp) s.push('cVP:"'+this.vp+'"');
	return(s.join(",")+',');
}

//=================================================================
// CIRCLE
//=================================================================
ESVG.Circle=function(node,cx,cy,r,fill,stroke,edgeW) {
	this.registerInstance(node,"Circle");
	this.setCenter(cx,cy);
	this.setRadius(r);
	this.setFill(fill);
	this.setBorder(stroke,edgeW);
	return(this);
}

ESVG.Circle.create=function(cx,cy,r,fill,stroke,edgeW) {
	var node=ESVG.create("circle");
	return(new ESVG.Circle(node,cx,cy,r,fill,stroke,edgeW));
}

ESVG.Circle.prototype=new ESVG.SVGItem();

ESVG.Circle.prototype.setBorder=function(color,width) {
	this.setStroke(color);
	this.setStrokeWidth(width);
}

ESVG.Circle.prototype.setCenter=function(cx,cy) {
	this.cx=cx;
	this.cy=cy;
	ESVG.set(this.base,"cx",cx);
	ESVG.set(this.base,"cy",cy);
}

ESVG.Circle.prototype.setRadius=function(r) {
	this.r=r;
	ESVG.set(this.base,"r",r);
}

ESVG.Circle.prototype.doMoveNotify=function() {
	var x=this.layoutBox.getHomeX();
	var y=this.layoutBox.getHomeY();
	var bounds=this.base.getBBox();
	this.setCenter(this.cx+x-bounds.x,this.cy+y-bounds.y);
	this.raiseMoveNotify();	
}

ESVG.Circle.prototype.doResizeNotify=function() {
	var x=this.layoutBox.getHomeX();
	var y=this.layoutBox.getHomeY();
	var w=this.layoutBox.getWidth();
	var h=this.layoutBox.getHeight();
	this.setCenter(x+w/2,y+h/2);
	this.setRadius((w+h)/4);
	this.raiseResizeNotify();	
}

ESVG.Circle.prototype.projectClassDataAsJSON=function() {
	var s = [];
	if (this.cx) s.push('cCX:"'+this.cx+'"');
	if (this.cy) s.push('cCY:"'+this.cy+'"');
	if (this.r) s.push('cR:"'+this.r+'"');
	return(s.join(",")+',');
}

ESVG.Circle.restoreObject = function(obj) {
	var n = ESVG.Circle.create(obj.cCX,obj.cCY,obj.cR)
	n.restoreStyles(obj.oA);
	return(n);
}

//=================================================================
// CURVE
//=================================================================
ESVG.Curve=function(node,points,fill,color,width,dynamic,parent) {
	this.registerInstance(node,"Curve");
	this.smoothness=7;
	this.closed=false;
	this.bungie=null;
	this.setPoints(points);
	this.setFill(fill);
	this.setStyle(color,width);
	this.reshapeActive=false;
	this.updatePoints();
	if (parent) parent.appendChild(this);
	if (dynamic) this.scribble(parent);
	return(this);
}

ESVG.Curve.create=function(points,fill,color,width,dynamic,parent) {
	var node=ESVG.create("polyline");
	return(new ESVG.Curve(node,points,fill,color,width,dynamic,parent));
}

ESVG.Curve.interactiveCreate=function(parent,fill,color,width,x,y,ondone) {
	ESVG.Curve.doneNotify = ondone;
	var s=parent.getRoot().getScale();
	x*=s;
	y*=s;
	var node=new ESVG.Curve.create(x+' '+y,fill,color,width,true,parent);
	return(node);
}

ESVG.Curve.prototype=new ESVG.SVGItem();

ESVG.Curve.bungie=null;

ESVG.Curve.prototype.setStyle=function(color,width) {
	this.setStroke(color);
	this.setStrokeWidth(width);
}

ESVG.Curve.prototype.setSmoothness=function(lvl) {
	var oldLvl=this.smoothness;
	this.smoothness=lvl;
	if (lvl!=oldLvl) this.updatePoints();
}

ESVG.Curve.prototype.setClosedPath=function(flag) {
	var oldClosed=this.closed;
	this.closed=flag;
	if (oldClosed!=flag) this.updatePoints();
}

ESVG.Curve.prototype.setPoints=function(points) {
	this.points=points;
	this.parsePoints();
	ESVG.set(this.base,"points",points);
}

ESVG.Curve.prototype.updatePoints=function() {
	var p="";
	var cpa=this.pointArray;
	var pa=this.smooth(cpa,this.closed,this.smoothness);
	for (var i=0;i<pa.length;i++) {
		if (p!="") p+=",";
		p+=pa[i].x+" "+pa[i].y;
	}
	ESVG.set(this.base,"points",p);
	this.renderArray=pa;
}

// do a partial update of the curve in the vicinity of the point at idx
ESVG.Curve.prototype.updateSegment=function(idx) {
	var p="";
	var pa=this.smoothLocal(idx,this.pointArray,this.renderArray,this.closed,this.smoothness);
	for (var i=0;i<pa.length;i++) {
		if (p!="") p+=",";
		p+=pa[i].x+" "+pa[i].y;
	}
	ESVG.set(this.base,"points",p);
	this.renderArray=pa;
}

ESVG.Curve.prototype.parsePoints=function() {
	this.pointArray=[];
	var s=[];
	var sb=this.points.split(" ");
	for (var i=0;i<sb.length;i++) {
		sbc=sb[i].split(",");
		for (var j=0;j<sbc.length;j++) {
			if (sbc[j]) s[s.length]=sbc[j];
		}
	}
	for (var i=0;i<s.length;i+=2) {
		var p={};
		p.x=parseInt(s[i],10);
		p.y=parseInt(s[i+1],10);
		p.ctrl=null;
		this.pointArray[i/2]=p;
	}
}

ESVG.Curve.prototype.addControlPoints=function() {
	var p=this.pointArray;
	var r=this.getRoot();
	for (var i=0;i<p.length;i++) {
		p[i].ctrl=ESVG.ControlPt.create(p[i].x,p[i].y,"",this);
		p[i].ctrl.setMoveNotify("this.controller.adjustCtrlPt(this,x,y);");
		p[i].ctrl.setOnRightClick("this.controller.deleteCtrlPt(this);");
		r.appendChild(p[i].ctrl);
	}
}

ESVG.Curve.prototype.removeControlPoints=function() {
	var p=this.pointArray;
	var r=this.getRoot();
	for (var i=0;i<p.length;i++) {
		if (p[i].ctrl) {
			r.removeChild(p[i].ctrl);
			p[i].ctrl=null;
		}
	}
}

ESVG.Curve.prototype.showControlPoints=function() {
	this.addControlPoints();
	this.reshapeActive=true;
}

ESVG.Curve.prototype.hideControlPoints=function() {
	if (!this.reshapeActive) return;
	var p=this.pointArray;
	if (p[0].ctrl==null) return;
	this.removeControlPoints();
	if (this.layoutBox) {
		this.layoutBox.bindToNode(this);
//		this.showLayoutBox();
	}
	this.reshapeActive=false;
}

ESVG.Curve.prototype.getCtrlPtIdx=function(who) {
	var p=this.pointArray;
	for (var i=0;i<p.length;i++) if (who==p[i].ctrl) return(i);
	return(-1);
}

ESVG.Curve.prototype.adjustCtrlPt=function(who,x,y) {
	var idx=this.getCtrlPtIdx(who);
	if (idx== -1) return;
	this.pointArray[idx].x=parseFloat(x);
	this.pointArray[idx].y=parseFloat(y);
	this.updateSegment(idx);
}

ESVG.Curve.prototype.appendCtrlPt=function(x,y) {
	var p=this.pointArray;
	var idx=p.length;
	p[idx]={};
	p[idx].x=parseFloat(x);
	p[idx].y=parseFloat(y);
	this.updateSegment(idx);
}

ESVG.Curve.prototype.deleteCtrlPt=function(who) {
	var idx=this.getCtrlPtIdx(who);
	if (idx== -1) return;
	var p=this.pointArray;
	this.getRoot().removeChild(p[idx].ctrl);
	p[idx].ctrl=null;
	for (var i=idx+1;i<p.length;i++) p[i-1]=p[i];
	p.pop();
	this.updatePoints();
}

ESVG.Curve.prototype.appendCtrlPtCB=function(bungie,x,y) {
	this.appendCtrlPt(x,y);
	this.bungie.setStyle("none",0);
	if (ESVG.Curve.doneNotify) eval(ESVG.Curve.doneNotify);
}

ESVG.Curve.prototype.sampleCB=function(bungie,x,y) {
	var x=parseFloat(x);
	var y=parseFloat(y);
	var dX=Math.abs(x-bungie.ax);
	var dY=Math.abs(y-bungie.ay);
	if (dX+dY>=this.smoothness*2) {
		this.appendCtrlPt(x,y);
		bungie.setAnchor(x,y);
	}
}

ESVG.Curve.prototype.scribble=function(parent) {
	if (this.bungie==null) {
		this.bungie=ESVG.BungieCord.create(0,0,"none",0,null);
		this.bungie.setEndMoveNotify("this.controller.appendCtrlPtCB();");
		this.bungie.setMoveNotify("this.controller.sampleCB();");
		parent.appendChild(this.bungie);
		this.bungie.controller=this;
	}
	this.bungie.setStyle(this.stroke,this.strokeWidth);
	var p=this.pointArray;
	var idx=p.length-1;
	this.bungie.setAnchor(p[idx].x,p[idx].y);
	this.bungie.startTrack();
}

//////////////////////////////////////////////

ESVG.Curve.prototype.doMoveNotify=function() {
	var x=this.layoutBox.getHomeX();
	var y=this.layoutBox.getHomeY();
	var bounds=this.base.getBBox();
	var dx=x-bounds.x;
	var dy=y-bounds.y;
	for (var i=0;i<this.pointArray.length;i++) {
		this.pointArray[i].x+=dx;
		this.pointArray[i].y+=dy;
	}
	this.updatePoints();
	this.raiseMoveNotify();
}

ESVG.Curve.prototype.doResizeNotify=function() {
	var x=this.layoutBox.getHomeX();
	var y=this.layoutBox.getHomeY();
	var w=this.layoutBox.getWidth();
	var h=this.layoutBox.getHeight();

	var bounds=this.base.getBBox();
	var bx=bounds.x;
	var by=bounds.y;
	var sw=w/bounds.width;
	var sh=h/bounds.height;

	for (var i=0;i<this.pointArray.length;i++) {
		this.pointArray[i].x=Math.round((this.pointArray[i].x-bx)*sw)+x;
		this.pointArray[i].y=Math.round((this.pointArray[i].y-by)*sh)+y;
	}
	this.updatePoints();
	this.raiseResizeNotify();
}

//================== NEW Smoothing stuff ======================

ESVG.Curve.prototype.smoothNoWrap=function(pts,smooth) {
	var out=[];
	var maxI=pts.length-1;
	for (i=0;i<pts.length;i++) {
		out[out.length]=pts[i]; // copy point
		if (i<maxI) { // interpolate new point
			if (i==0) var p=this.interpolateLeft(pts[0],pts[1],pts[2],smooth);
			else if (i==maxI-1) var p=this.interpolateRight(pts[maxI-2],pts[i],pts[maxI],smooth);
			else var p=this.interpolate4(pts[i-1],pts[i],pts[i+1],pts[i+2],smooth);
			for (var j=0;j<p.length;j++) out[out.length]=p[j];
		}
	}
	return(out);
}

ESVG.Curve.prototype.smooth=function(pts,wrap,smooth) {
	if (pts.length<3) return(pts);
	if (wrap==false) return(this.smoothNoWrap(pts,smooth));
	var out=[];
	var maxI=pts.length-1;
	for (i=0;i<pts.length;i++) {
		out[out.length]=pts[i]; // copy point
		if (i==0) var a=pts[maxI];
		else var a=pts[i-1];
		var b=pts[i];
		if (i<maxI-1) { // room in the curve without boundary issues
			var c=pts[i+1];
			var d=pts[i+2];
		}
		else {
			if (i<maxI) { // can fit in one point without wrapping
				var c=pts[i+1];
				var d=pts[0];
			}
			else { // At boundary
				var c=pts[0];
				var d=pts[1];
			}
		}
		var p=this.interpolate4(a,b,c,d,smooth);
		for (var j=0;j<p.length;j++) out[out.length]=p[j];
	}
	out[out.length]=pts[0];
	return(out);
}

// Rework a section of a non-wrapping curve based on a change in position
// of the control point at idx. In the general case, we need a span of 2 points
// on either side of the target points to determine the impact to the curve 
ESVG.Curve.prototype.smoothLocalNoWrap=function(idx,pts,oldPts,smooth) {
//ZLM.cerr("updating point "+idx+" of:");
//for (var j=0;j<pts.length;j++)ZLM.dumpObj(pts[j]);
//ZLM.cerr("with initial curve:");
//for (var j=0;j<oldPts.length;j++) ZLM.dumpObj(oldPts[j]);
	var maxI=pts.length-1;
	var start=idx-2;
	if (start<0) start=0;
	var end=idx+2;
	if (end>maxI) end=maxI;
	for (i=start;i<=end;i++) {
		var outIdx=i*(1+smooth);
		oldPts[outIdx++]=pts[i]; // copy point
		if (i<maxI) { // interpolate new point
			if (i==0) var p=this.interpolateLeft(pts[0],pts[1],pts[2],smooth);
			else if (i==maxI-1) var p=this.interpolateRight(pts[maxI-2],pts[i],pts[maxI],smooth);
			else var p=this.interpolate4(pts[i-1],pts[i],pts[i+1],pts[i+2],smooth);
			for (var j=0;j<p.length;j++) oldPts[outIdx++]=p[j];
		}
	}
//ZLM.cerr("returning");
//for (var j=0;j<oldPts.length;j++) ZLM.dumpObj(oldPts[j]);
	return(oldPts);
}
ESVG.Curve.prototype.smoothLocal=function(idx,pts,oldPts,wrap,smooth) {
	if (pts.length<3) return(pts);
	if (oldPts.length==pts.length) return(this.smooth(pts,wrap,smooth));
	if (wrap==false) return(this.smoothLocalNoWrap(idx,pts,oldPts,smooth));
//var out=[];
	var maxI=pts.length-1;
	for (i=0;i<pts.length;i++) {
		out[out.length]=pts[i]; // copy point
		if (i==0) var a=pts[maxI];
		else var a=pts[i-1];
		var b=pts[i];
		if (i<maxI-1) { // room in the curve without boundary issues
			var c=pts[i+1];
			var d=pts[i+2];
		}
		else {
			if (i<maxI) { // can fit in one point without wrapping
				var c=pts[i+1];
				var d=pts[0];
			}
			else { // At boundary
				var c=pts[0];
				var d=pts[1];
			}
		}
		var p=this.interpolate4(a,b,c,d,smooth);
		for (var j=0;j<p.length;j++) out[out.length]=p[j];
	}
	out[out.length]=pts[0];
	return(out);
}

ESVG.Curve.prototype.averagePt=function(a,b) {
	var c={};
	c.x=(a.x+b.x)/2;
	c.y=(a.y+b.y)/2;
	return(c);
}

ESVG.Curve.prototype.transitionPt=function(a,b,t) {
	var c={};
	c.x=a.x+t*(b.x-a.x);
	c.y=a.y+t*(b.y-a.y);
	return(c);
}

// Given the first three points of a curve A, B, C, interpolate the span bewteen A & B
ESVG.Curve.prototype.interpolateLeft=function(a,b,c,pCount) {
	var pts=[];
	var bP={};
	bP.x=(4*b.x-a.x-c.x)/2;
	bP.y=(4*b.y-a.y-c.y)/2;
	var tInc=0.5/(1+pCount);
	var tR=tInc;
	for (var i=0; i<pCount;i++) {
		var p=this.transitionPt(a,bP,tR);
		var q=this.transitionPt(bP,c,tR);
		var r=this.transitionPt(p,q,tR);
		pts[pts.length]=r;
		tR+=tInc;
	}
	return(pts);
}

// Given the last three points of a curve A, B, C, interpolate the span bewteen B & C
ESVG.Curve.prototype.interpolateRight=function(a,b,c,pCount) {
	var pts=[];
	var bP={};
	bP.x=(4*b.x-a.x-c.x)/2;
	bP.y=(4*b.y-a.y-c.y)/2;
	var tInc=0.5/(1+pCount);
	var tR=0.5+tInc;
	for (var i=0; i<pCount;i++) {
		var p=this.transitionPt(a,bP,tR);
		var q=this.transitionPt(bP,c,tR);
		var r=this.transitionPt(p,q,tR);
		pts[pts.length]=r;
		tR+=tInc;
	}
	return(pts);
}

// Given four points in order on a curve A,B,C,D, interpolate the span between
// points B & C
ESVG.Curve.prototype.interpolate4=function(a,b,c,d,pCount) {
	var pts=[];
	var bP={};
	bP.x=(4*b.x-a.x-c.x)/2;
	bP.y=(4*b.y-a.y-c.y)/2;
	var cP={};
	cP.x=(4*c.x-b.x-d.x)/2;
	cP.y=(4*c.y-b.y-d.y)/2;

	var tInc=1/(1+pCount);
	var tV=tInc;
	for (var i=0; i<pCount;i++) {
		var tU=tV/2;
		var tR=0.5+tU;

		var p=this.transitionPt(a,bP,tR);
		var q=this.transitionPt(bP,c,tR);
		var s=this.transitionPt(b,cP,tU);
		var t=this.transitionPt(cP,d,tU);

		var r=this.transitionPt(p,q,tR);
		var u=this.transitionPt(s,t,tU);
		var v=this.transitionPt(r,u,tV);
		pts[pts.length]=v;
		tV+=tInc;
	}
	return(pts);
}

//=================================================================
// ELLIPSE
//=================================================================
ESVG.Ellipse=function(node,cx,cy,rx,ry,fill,stroke,edgeW) {
	this.registerInstance(node,"Ellipse");
	this.setCenter(cx,cy);
	this.setXRadius(rx);
	this.setYRadius(ry);
	this.setFill(fill);
	this.setBorder(stroke,edgeW);
	return(this);
}

ESVG.Ellipse.create=function(cx,cy,rx,ry,fill,stroke,edgeW) {
	var node=ESVG.create("ellipse");
	return(new ESVG.Ellipse(node,cx,cy,rx,ry,fill,stroke,edgeW));
}

ESVG.Ellipse.prototype=new ESVG.SVGItem();

ESVG.Ellipse.prototype.setBorder=function(color,width) {
	this.setStroke(color);
	this.setStrokeWidth(width);
}

ESVG.Ellipse.prototype.setCenter=function(cx,cy) {
	this.cx=parseFloat(cx);
	this.cy=parseFloat(cy);
	ESVG.set(this.base,"cx",cx);
	ESVG.set(this.base,"cy",cy);
}

ESVG.Ellipse.prototype.setXRadius=function(r) {
	this.rx=r;
	ESVG.set(this.base,"rx",r);
}

ESVG.Ellipse.prototype.setYRadius=function(r) {
	this.ry=r;
	ESVG.set(this.base,"ry",r);
}

ESVG.Ellipse.prototype.setBox = function(x,y,w,h) {
	this.setCenter(x+w/2,y+h/2);
	this.setXRadius(w/2);	
	this.setYRadius(h/2);		
}

ESVG.Ellipse.prototype.doMoveNotify=function() {
	var x=this.layoutBox.getHomeX();
	var y=this.layoutBox.getHomeY();
	var bounds=this.base.getBBox();
	this.setCenter(this.cx+x-bounds.x,this.cy+y-bounds.y);
	this.raiseMoveNotify();	
}

ESVG.Ellipse.prototype.doResizeNotify=function() {
	var x=this.layoutBox.getHomeX();
	var y=this.layoutBox.getHomeY();
	var w=this.layoutBox.getWidth();
	var h=this.layoutBox.getHeight();
	this.setCenter(x+w/2,y+h/2);
	this.setXRadius(w/2);	
	this.setYRadius(h/2);	
	this.raiseResizeNotify();
}

ESVG.Ellipse.prototype.projectClassDataAsJSON=function() {
	var s = [];
	if (this.cx) s.push('cCX:"'+this.cx+'"');
	if (this.cy) s.push('cCY:"'+this.cy+'"');
	if (this.rx) s.push('cRX:"'+this.rx+'"');
	if (this.ry) s.push('cRY:"'+this.ry+'"');
	return(s.join(",")+',');
}

ESVG.Ellipse.restoreObject = function(obj) {
	var n = ESVG.Ellipse.create(obj.cCX,obj.cCY,obj.cRX,obj.cRY)
	n.restoreStyles(obj.oA);
	return(n);
}


//=================================================================
// GROUP
//=================================================================
ESVG.Group=function(node) {
	this.registerInstance(node,"Group");
	this.transform=null;
	this.kidList=[];
	return(this);
}

ESVG.Group.create=function() {
	var node=ESVG.create("g");
	return(new ESVG.Group(node));
}

ESVG.Group.prototype=new ESVG.SVGItem();

ESVG.Group.prototype.setPos=function(x,y) {
	this.x = x;
	this.y = y;
	ESVG.set(this.base,"transform","translate("+x+","+y+")");
}

ESVG.Group.prototype.setScale=function(sx,sy) {
	this.sx = sx;
	this.sy = sy;
	ESVG.set(this.base,"transform","scale("+sx+","+sy+")");
}

ESVG.Group.prototype.projectClassDataAsJSON=function() {
	var s = [];
	if (this.x) s.push('cX:"'+this.x+'"');
	if (this.y) s.push('cY:"'+this.y+'"');
	if (this.sx) s.push('cSX:"'+this.sx+'"');
	if (this.sy) s.push('cSY:"'+this.sy+'"');
	if (this.transform) s.push('cT:"'+this.transform+'"');
	if (s.length==0) return(null);
	return(s.join(",")+',');
}

ESVG.Group.restoreObject = function(obj) {
	var n = ESVG.Group.create();
	if (obj.cCX && obj.cCY) n.setPos(obj.cCX,obj.cCY);
	if (obj.cSX && obj.cSY) n.setScale(obj.cSX,obj.cSY);
	if (obj.cT) n.setTransform(obj.cT);
	n.restoreStyles(obj.oA);
	return(n);
}

//=================================================================
// CLIPPATH
//=================================================================
ESVG.ClipPath=function(node,id) {
	this.id=id;
	this.registerInstance(node,"ClipPath");
	ESVG.set(this.base,"id",id);
	return(this);
}

ESVG.ClipPath.create=function(id) {
	var node=ESVG.create("clipPath");
	return(new ESVG.ClipPath(node,id));
}

ESVG.ClipPath.prototype=new ESVG.SVGItem();

ESVG.ClipPath.prototype.projectClassDataAsJSON=function() {
	var s = [];
	s.push('cID:"'+this.id+'"');
	return(s.join(",")+',');
}

ESVG.ClipPath.restoreObject = function(obj) {
	var n = ESVG.ClipPath.create(obj.cID);
	n.restoreStyles(obj.oA);
	return(n);
}

//=================================================================
// LINEARGRADIENT
//=================================================================
ESVG.LinearGradient=function(node,id) {
	this.id = id;
	this.spread = "pad";
	this.registerInstance(node,"LinearGradient");
	ESVG.set(this.base,"id",id);
	this.kidList=[];
	return(this);
}

ESVG.LinearGradient.create=function(id) {
	var node=ESVG.create("linearGradient");
	return(new ESVG.LinearGradient(node,id));
}

ESVG.LinearGradient.prototype=new ESVG.SVGItem();

ESVG.LinearGradient.prototype.setSpread=function(s) {
	this.spread = s;
	ESVG.set(this.base,"spreadMethod",s);
}

ESVG.LinearGradient.prototype.setLine=function(x1,y1,x2,y2) {
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
	ESVG.set(this.base,"x1",x1+"%");
	ESVG.set(this.base,"y1",y1+"%");
	ESVG.set(this.base,"x2",x2+"%");
	ESVG.set(this.base,"y2",y2+"%");
}

ESVG.LinearGradient.prototype.projectClassDataAsJSON=function() {
	var s = [];
	if (this.x1!='undefined') s.push('cX1:"'+this.x1+'"');
	if (this.y1!='undefined') s.push('cY1:"'+this.y1+'"');
	if (this.x2!='undefined') s.push('cX2:"'+this.x2+'"');
	if (this.y2!='undefined') s.push('cY2:"'+this.y2+'"');
	if (this.id) s.push('cID:"'+this.id+'"');
	return(s.join(",")+',');
}

ESVG.LinearGradient.restoreObject = function(obj) {
	var n = ESVG.LinearGradient.create(obj.cID);
	n.setLine(obj.cX1,obj.cY1,obj.cX2,obj.cY2);
	n.restoreStyles(obj.oA);
	return(n);
}

//=================================================================
// RADIALGRADIENT
//=================================================================
ESVG.RadialGradient=function(node,id) {
	this.id = id;
	this.registerInstance(node,"RadialGradient");
	ESVG.set(this.base,"id",id);
	this.kidList=[];
	return(this);
}

ESVG.RadialGradient.create=function(id) {
	var node=ESVG.create("radialGradient");
	return(new ESVG.RadialGradient(node,id));
}

ESVG.RadialGradient.prototype=new ESVG.SVGItem();

ESVG.RadialGradient.prototype.setFocus=function(x1,y1,r) {
	this.cx = x1;
	this.cy = y1;
	this.r = r;
	ESVG.set(this.base,"cx",x1+"%");
	ESVG.set(this.base,"cy",y1+"%");
	ESVG.set(this.base,"r",r+"%");
}

ESVG.RadialGradient.prototype.projectClassDataAsJSON=function() {
	var s = [];
	if (this.cx!='undefined') s.push('cCX:"'+this.cx+'"');
	if (this.cy!='undefined') s.push('cCY:"'+this.cy+'"');
	if (this.r!='undefined') s.push('cR:"'+this.r+'"');
	if (this.id) s.push('cID:"'+this.id+'"');
	return(s.join(",")+',');
}

ESVG.RadialGradient.restoreObject = function(obj) {
	var n = ESVG.RadialGradient.create(obj.cID);
	if (obj.cCX && obj.cCY && obj.cR) n.setFocus(obj.cCX,obj.cCY,obj.cR);
	n.restoreStyles(obj.oA);
	return(n);
}

//=================================================================
// STOP (GRADIENT)
//=================================================================
ESVG.Stop=function(node) {
	this.registerInstance(node,"Stop");
	return(this);
}

ESVG.Stop.create=function() {
	var node=ESVG.create("stop");
	return(new ESVG.Stop(node));
}

ESVG.Stop.prototype=new ESVG.SVGItem();

ESVG.Stop.prototype.setOffset=function(ofs) {
	this.offset = ofs;
	ESVG.set(this.base,"offset",ofs);
}

ESVG.Stop.prototype.projectClassDataAsJSON=function() {
	var s = [];
	if (this.offset!='undefined') s.push('cOFS:"'+this.offset+'"');
	return(s.join(",")+',');
}

ESVG.Stop.restoreObject = function(obj) {
	var n = ESVG.Stop.create();
	if (obj.cOFS) n.setOffset(obj.cOFS);
	n.restoreStyles(obj.oA);
	return(n);
}

//=================================================================
// DEFS
//=================================================================
ESVG.Defs=function(node) {
	this.registerInstance(node,"defs");
	return(this);
}

ESVG.Defs.create=function() {
	var node=ESVG.create("defs");
	return(new ESVG.Defs(node));
}

ESVG.Defs.prototype=new ESVG.SVGItem();

ESVG.Defs.restoreObject = function(obj) {
	var n = ESVG.Defs.create();
	return(n);
}

//=================================================================
// IMAGE
//=================================================================
ESVG.Image=function(node,x,y,w,h,src) {
	this.registerInstance(node,"Image");
	this.setPos(x,y);
	this.setGeometry(w,h);
	this.setSource(src);
	return(this);
}

ESVG.Image.create=function(x,y,w,h,src) {
	var node=ESVG.create("image");
	return(new ESVG.Image(node,x,y,w,h,src));
}

ESVG.Image.prototype=new ESVG.SVGItem();

ESVG.Image.prototype.setGeometry=function(w,h) {
	this.w=w;
	this.h=h;
	ESVG.set(this.base,"width",w+"px");
	ESVG.set(this.base,"height",h+"px");
}

ESVG.Image.prototype.setSource=function(src) {
	this.src = src;
	this.base.setAttributeNS(ESVG.svgLink,"xlink:href",src);
}

ESVG.Image.prototype.projectClassDataAsJSON=function() {
	var s = [];
	if (this.x) s.push('cX:"'+this.x+'"');
	if (this.y) s.push('cY:"'+this.y+'"');
	if (this.w) s.push('cW:"'+this.w+'"');
	if (this.h) s.push('cH:"'+this.h+'"');
	if (this.src) s.push('cS:"'+this.src+'"');
	return(s.join(",")+',');
}

ESVG.Image.restoreObject = function(obj) {
	var n = ESVG.Image.create(obj.cX,obj.cY,obj.cW,obj.cH,obj.s);
	n.restoreStyles(obj.oA);
	return(n);
}

//=================================================================
// LABEL
//=================================================================
ESVG.Label=function(node,x,y,txt) {
	this.registerInstance(node,"Label");
	this.x=x;
	this.y=y;
	this.text=txt;
	ESVG.set(node,"x",x);
	ESVG.set(node,"y",y);
	ESVG.set(node,"font-family","sans-serif");
	ESVG.set(node,"font-size","16");
	this.textNode=document.createTextNode(txt);
	node.appendChild(this.textNode);
	return(this);
}

ESVG.Label.create=function(x,y,txt) {
	var node=ESVG.create("text");
	return(new ESVG.Label(node,x,y,txt));
}

ESVG.Label.prototype=new ESVG.SVGItem();

ESVG.Label.prototype.setText=function(txt) {
	this.base.removeChild(this.textNode);
	this.textNode=document.createTextNode(txt);
	this.base.appendChild(this.textNode);
	this.text=txt;
}

ESVG.Label.prototype.setPos=function(x,y) {
	this.x=x;
	this.y=y;
	ESVG.set(this.base,"x",x);
	ESVG.set(this.base,"y",y);
}

ESVG.Label.prototype.center=function(x,w) {
	var bounds=this.base.getBBox();
	var fill=w-bounds.width;
	var newX=x+fill/2;
	this.x=newX;
	ESVG.set(this.base,"x",newX);
}

ESVG.Label.prototype.doMoveNotify=function() {
	var x=this.layoutBox.getHomeX();
	var y=this.layoutBox.getHomeY();
	var bounds=this.base.getBBox();
	this.setPos(x,y+bounds.height);
	this.setText(this.text);
	this.raiseMoveNotify();
}

ESVG.Label.prototype.projectSVG=function() {
	var s = [];
	s.push('<'+this.base.tagName+' ');
	var a = this.base.attributes;
	var l = a.length;
	for (var i=0;i<l;i++) {
		var n = a[i].nodeName;
		var v = a[i].nodeValue;
		if (n.indexOf('on')!=0) s.push(n+'="'+v+'" ');
	}

	if (this.text) {
		s.push('>\n'+this.text);
		s.push('</'+this.base.tagName+'>');
	}
	else {
		s.push('/>\n');
	}
	return(s.join(""));
}	

ESVG.Label.prototype.projectClassDataAsJSON=function() {
	var s = [];
	var str = this.text.split('"').join('\\"');
	if (this.x) s.push('cX:"'+this.x+'"');
	if (this.y) s.push('cY:"'+this.y+'"');
	if (this.text) s.push('cT:"'+str+'"');
	return(s.join(",")+',');
}

ESVG.Label.restoreObject = function(obj) {
	var n = ESVG.Label.create(obj.cX,obj.cY,obj.cT);
	n.restoreStyles(obj.oA);
	return(n);
}

//=================================================================
// LINE
//=================================================================
ESVG.Line=function(node,x1,y1,x2,y2,color,width) {
	this.registerInstance(node,"Line");
	this.setStart(x1,y1);
	this.setEnd(x2,y2);
	this.setStyle(color,width);
	return(this);
}

ESVG.Line.create=function(x1,y1,x2,y2,color,width) {
	var node=ESVG.create("line");
	return(new ESVG.Line(node,x1,y1,x2,y2,color,width));
}

ESVG.Line.prototype=new ESVG.SVGItem();

ESVG.Line.prototype.setStyle=function(color,width) {
	this.setStroke(color);
	this.setStrokeWidth(width);
}

ESVG.Line.prototype.setStart=function(x1,y1) {
	this.x1=x1;
	this.y1=y1;
	ESVG.set(this.base,"x1",x1);
	ESVG.set(this.base,"y1",y1);
}

ESVG.Line.prototype.setEnd=function(x2,y2) {
	this.x2=x2;
	this.y2=y2;
	ESVG.set(this.base,"x2",x2);
	ESVG.set(this.base,"y2",y2);
}

ESVG.Line.prototype.doMoveNotify=function() {
	var ux=this.layoutBox.getHomeX();
	var uy=this.layoutBox.getHomeY();
	var lx=ux+this.layoutBox.getWidth();
	var ly=uy+this.layoutBox.getHeight();
	var sx = ux;
	var ex = lx;
	if (sx!=this.x1) {
		sx = lx;
		ex = ux;
	}
	var sy = uy;
	var ey = ly;
	if (sy!=this.y1) {
		sy = ly;
		ey = uy;
	}
	this.setStart(sx,sy);
	this.setEnd(ex,ey);
	this.raiseMoveNotify();
}

ESVG.Line.prototype.projectClassDataAsJSON=function() {
	var s = [];
	if (this.x1) s.push('cX1:"'+this.x1+'"');
	if (this.y1) s.push('cY1:"'+this.y1+'"');
	if (this.x2) s.push('cX2:"'+this.x2+'"');
	if (this.y2) s.push('cY2:"'+this.y2+'"');
	return(s.join(";")+';');
}

ESVG.Line.restoreObject = function(obj) {
	var n = ESVG.Line.create(obj.cX1,obj.cY1,obj.cX2,obj.cY2);
	n.restoreStyles(obj.oA);
	return(n);
}

//=================================================================
// POLYGON
//=================================================================
ESVG.Polygon=function(node,points,fill,color,width) {
	this.registerInstance(node,"Polygon");
	if (points) this.setPoints(points);
	if (fill) this.setFill(fill);
	if (color && width) this.setStyle(color,width);
	this.reshapeActive=false;
	return(this);
}

ESVG.Polygon.create=function(points,fill,color,width) {
	var node=ESVG.create("polygon");
	return(new ESVG.Polygon(node,points,fill,color,width));
}

ESVG.Polygon.prototype=new ESVG.SVGItem();

ESVG.Polygon.prototype.setStyle=function(color,width) {
	this.setStroke(color);
	this.setStrokeWidth(width);
}

ESVG.Polygon.prototype.setPoints=function(points) {
	this.points=points;
	this.parsePoints();
	ESVG.set(this.base,"points",points);
}

ESVG.Polygon.prototype.updatePoints=function() {
	var p="";
	var pa=this.pointArray;
	for (var i=0;i<pa.x.length;i++) {
		if (p!="") p+=",";
		p+=pa.x[i]+" "+pa.y[i];
	}
	ESVG.set(this.base,"points",p);
}

ESVG.Polygon.prototype.parsePoints=function() {
	this.pointArray={};
	this.pointArray.x=[];
	this.pointArray.y=[];
	this.pointArray.ctrl=[];
	var s=[];
	var sb=this.points.split(" ");
	for (var i=0;i<sb.length;i++) {
		sbc=sb[i].split(",");
		for (var j=0;j<sbc.length;j++) {
			if (sbc[j]) s[s.length]=sbc[j];
		}
	}
	for (var i=0;i<s.length;i+=2) {
		this.pointArray.x[i/2]=parseInt(s[i],10);
		this.pointArray.y[i/2]=parseInt(s[i+1],10);	
		this.pointArray.ctrl[i/2]=null;
	}
}

ESVG.Polygon.prototype.addControlPoints=function() {
	var p=this.pointArray;
	var r=this.getRoot();
	for (var i=0;i<p.x.length;i++) {
		p.ctrl[i]=ESVG.ControlPt.create(p.x[i],p.y[i],"",this);
		p.ctrl[i].setMoveNotify("this.controller.adjustCtrlPt(this,x,y);");
		r.appendChild(p.ctrl[i]);
	}
}

ESVG.Polygon.prototype.showControlPoints=function() {
	var p=this.pointArray;
	if (p.ctrl[0]==null) this.addControlPoints();
	for (var i=0;i<p.ctrl.length;i++) {
		p.ctrl[i].setDisplay("block");
	}
	this.reshapeActive=true;
}

ESVG.Polygon.prototype.hideControlPoints=function() {
	var p=this.pointArray;
	if (p.ctrl[0]==null) return;
	for (var i=0;i<p.ctrl.length;i++) {
		p.ctrl[i].setDisplay("none");
	}
	this.reshapeActive=false;
}

ESVG.Polygon.prototype.getCtrlPtIdx=function(who) {
	var p=this.pointArray;
	for (var i=0;i<p.ctrl.length;i++) if (who==p.ctrl[i]) return(i);
	return(-1);
}

ESVG.Polygon.prototype.adjustCtrlPt=function(who,x,y) {
	var idx=this.getCtrlPtIdx(who);
	if (idx== -1) return;
	this.pointArray.x[idx]=parseFloat(x);
	this.pointArray.y[idx]=parseFloat(y);
	this.updatePoints();
}

// DUMMY FOR TESTING PURPOSES
ESVG.Polygon.prototype.showLayoutBox=function() {
	this.showControlPoints();
}
ESVG.Polygon.prototype.LayoutBox=function() {
	this.showControlPoints();
}
//////////////////////////////////////////////

ESVG.Polygon.prototype.generatePointsString=function() {
	var s=""
	for (var i=0;i<this.pointArray.x.length;i++) {
		if (s) s+=", "
		s+=this.pointArray.x[i]+" "+this.pointArray.y[i];
	}
	return(s);
}

ESVG.Polygon.prototype.doMoveNotify=function() {
	var x=this.layoutBox.getHomeX();
	var y=this.layoutBox.getHomeY();
	var bounds=this.base.getBBox();
	var dx=x-bounds.x;
	var dy=y-bounds.y;
	for (var i=0;i<this.pointArray.x.length;i++) {
		this.pointArray.x[i]+=dx;
		this.pointArray.y[i]+=dy;
	}
	var s=this.generatePointsString();
	this.setPoints(s);
	this.raiseMoveNotify();
}

ESVG.Polygon.prototype.doResizeNotify=function() {
	var x=this.layoutBox.getHomeX();
	var y=this.layoutBox.getHomeY();
	var w=this.layoutBox.getWidth();
	var h=this.layoutBox.getHeight();

	var bounds=this.base.getBBox();
	var bx=bounds.x;
	var by=bounds.y;
	var sw=w/bounds.width;
	var sh=h/bounds.height;

	for (var i=0;i<this.pointArray.x.length;i++) {
		this.pointArray.x[i]=Math.round((this.pointArray.x[i]-bx)*sw)+x;
		this.pointArray.y[i]=Math.round((this.pointArray.y[i]-by)*sh)+y;
	}
	var s=this.generatePointsString();
	this.setPoints(s);
	this.raiseResizeNotify();
}

//=================================================================
// POLYLINE
//=================================================================
ESVG.Polyline=function(node,points,fill,color,width) {
	this.registerInstance(node,"Polyline");
	if (points) this.setPoints(points);
	if (fill) this.setFill(fill);
	if (color&&width) this.setStyle(color,width);
	this.reshapeActive=false;
	return(this);
}

ESVG.Polyline.create=function(points,fill,color,width) {
	var node=ESVG.create("polyline");
	return(new ESVG.Polyline(node,points,fill,color,width));
}

ESVG.Polyline.prototype=new ESVG.SVGItem();

ESVG.Polyline.prototype.setStyle=function(color,width) {
	this.setStroke(color);
	this.setStrokeWidth(width);
}

ESVG.Polyline.prototype.setPoints=function(points) {
	this.points=points;
	this.parsePoints();
	ESVG.set(this.base,"points",points);
}

ESVG.Polyline.prototype.updatePoints=function() {
	var p="";
	var pa=this.pointArray;
	for (var i=0;i<pa.x.length;i++) {
		if (p!="") p+=",";
		p+=pa.x[i]+" "+pa.y[i];
	}
	ESVG.set(this.base,"points",p);
}

ESVG.Polyline.prototype.parsePoints=function() {
	this.pointArray={};
	this.pointArray.x=[];
	this.pointArray.y=[];
	this.pointArray.ctrl=[];
	var s=[];
	var sb=this.points.split(" ");
	for (var i=0;i<sb.length;i++) {
		sbc=sb[i].split(",");
		for (var j=0;j<sbc.length;j++) {
			if (sbc[j]) s[s.length]=sbc[j];
		}
	}
	for (var i=0;i<s.length;i+=2) {
		this.pointArray.x[i/2]=parseInt(s[i],10);
		this.pointArray.y[i/2]=parseInt(s[i+1],10);	
		this.pointArray.ctrl[i/2]=null;
	}
}

ESVG.Polyline.prototype.addControlPoints=function() {
	var p=this.pointArray;
	var r=this.getRoot();
	for (var i=0;i<p.x.length;i++) {
		p.ctrl[i]=ESVG.ControlPt.create(p.x[i],p.y[i],"",this);
		p.ctrl[i].setMoveNotify("this.controller.adjustCtrlPt(this,x,y);");
		r.appendChild(p.ctrl[i]);
	}
}

ESVG.Polyline.prototype.showControlPoints=function() {
	var p=this.pointArray;
	if (p.ctrl[0]==null) this.addControlPoints();
	for (var i=0;i<p.ctrl.length;i++) {
		p.ctrl[i].setDisplay("block");
	}
	this.reshapeActive=true;
}

ESVG.Polyline.prototype.hideControlPoints=function() {
	var p=this.pointArray;
	if (p.ctrl[0]==null) return;
	for (var i=0;i<p.ctrl.length;i++) {
		p.ctrl[i].setDisplay("none");
	}
	this.reshapeActive=false;
}

ESVG.Polyline.prototype.getCtrlPtIdx=function(who) {
	var p=this.pointArray;
	for (var i=0;i<p.ctrl.length;i++) if (who==p.ctrl[i]) return(i);
	return(-1);
}

ESVG.Polyline.prototype.adjustCtrlPt=function(who,x,y) {
	var idx=this.getCtrlPtIdx(who);
	if (idx== -1) return;
	this.pointArray.x[idx]=parseFloat(x);
	this.pointArray.y[idx]=parseFloat(y);
	this.updatePoints();
}

// DUMMY FOR TESTING PURPOSES
ESVG.Polyline.prototype.showLayoutBox=function() {
	this.showControlPoints();
}
ESVG.Polyline.prototype.LayoutBox=function() {
	this.showControlPoints();
}
//////////////////////////////////////////////

ESVG.Polyline.prototype.generatePointsString=function() {
	var s=""
	for (var i=0;i<this.pointArray.x.length;i++) {
		if (s) s+=", "
		s+=this.pointArray.x[i]+" "+this.pointArray.y[i];
	}
	return(s);
}

ESVG.Polyline.prototype.doMoveNotify=function() {
	var x=this.layoutBox.getHomeX();
	var y=this.layoutBox.getHomeY();
	var bounds=this.base.getBBox();
	var dx=x-bounds.x;
	var dy=y-bounds.y;
	for (var i=0;i<this.pointArray.x.length;i++) {
		this.pointArray.x[i]+=dx;
		this.pointArray.y[i]+=dy;
	}
	var s=this.generatePointsString();
	this.setPoints(s);
	this.raiseMoveNotify();
}

ESVG.Polyline.prototype.doResizeNotify=function() {
	var x=this.layoutBox.getHomeX();
	var y=this.layoutBox.getHomeY();
	var w=this.layoutBox.getWidth();
	var h=this.layoutBox.getHeight();

	var bounds=this.base.getBBox();
	var bx=bounds.x;
	var by=bounds.y;
	var sw=w/bounds.width;
	var sh=h/bounds.height;

	for (var i=0;i<this.pointArray.x.length;i++) {
		this.pointArray.x[i]=Math.round((this.pointArray.x[i]-bx)*sw)+x;
		this.pointArray.y[i]=Math.round((this.pointArray.y[i]-by)*sh)+y;
	}
	var s=this.generatePointsString();
	this.setPoints(s);
	this.raiseResizeNotify();
}

ESVG.Polyline.prototype.projectClassDataAsJSON=function() {
	var s = [];
	var p = this.generatePointsString();
	if (p) s.push('cP:"'+p+'"');
	return(s.join(",")+',');
}

ESVG.Polyline.restoreObject = function(obj) {
	var n = ESVG.Polyline.create(obj.cP);
	n.restoreStyles(obj.oA);
	return(n);
}

//=================================================================
// RECT
//=================================================================
ESVG.Rect=function(node,x,y,w,h,fill,stroke,edgeW) {
	this.registerInstance(node,"Rect");
	this.setPos(x,y);
	this.setGeometry(w,h);
	this.setFill(fill);
	this.setBorder(stroke,edgeW);
	return(this);
}

ESVG.Rect.create=function(x,y,w,h,fill,stroke,edgeW) {
	var node=ESVG.create("rect");
	return(new ESVG.Rect(node,x,y,w,h,fill,stroke,edgeW));
}

ESVG.Rect.altRectCanvas=function() {
	return(ZLM.simulateTag("div class='ESVG_rect'"));
}

ESVG.Rect.prototype=new ESVG.SVGItem();

ESVG.Rect.prototype.setGeometry=function(w,h) {
	if (w<0) w=0;
	if (h<0) h=0;
	this.w=w;
	this.h=h;
	ESVG.set(this.base,"width",w);
	ESVG.set(this.base,"height",h);
}

ESVG.Rect.prototype.setRx=function(r) {
	ESVG.set(this.base,"rx",r);
}

ESVG.Rect.prototype.setRy=function(r) {
	ESVG.set(this.base,"ry",r);
}

ESVG.Rect.prototype.setBorder=function(stroke,edgeW) {
	this.setStroke(stroke);
	this.setStrokeWidth(edgeW);
}

ESVG.Rect.prototype.doMoveNotify=function() {
	this.x=this.layoutBox.getHomeX();
	this.y=this.layoutBox.getHomeY();
	this.setPos(this.x,this.y);
	this.raiseMoveNotify();
}

ESVG.Rect.prototype.doResizeNotify=function() {
	this.x=this.layoutBox.getHomeX();
	this.y=this.layoutBox.getHomeY();
	this.w=this.layoutBox.getWidth();
	this.h=this.layoutBox.getHeight();
	this.setPos(this.x,this.y);
	this.setGeometry(this.w,this.h);
	this.raiseResizeNotify();
}

ESVG.Rect.prototype.projectClassDataAsJSON=function() {
	var s = [];
	if (this.x) s.push('cX:"'+this.x+'"');
	if (this.y) s.push('cY:"'+this.y+'"');
	if (this.w) s.push('cW:"'+this.w+'"');
	if (this.h) s.push('cH:"'+this.h+'"');
	return(s.join(",")+',');
}

ESVG.Rect.restoreObject = function(obj) {
	var n = ESVG.Rect.create(obj.cX,obj.cY,obj.cW,obj.cH);
	n.restoreStyles(obj.oA);
	return(n);
}

//=================================================================
// ROUNDRECT
//=================================================================
ESVG.RoundRect=function(node,x,y,w,h,r,fill,stroke,edgeW) {
	this.registerInstance(node,"RoundRect");
	this.r=parseFloat(r);
	this.setPos(x,y);
	this.setGeometry(w,h);
	this.setFill(fill);
	this.setBorder(stroke,edgeW);
	return(this);
}

ESVG.RoundRect.create=function(x,y,w,h,r,fill,stroke,edgeW) {
	var node=ESVG.create("path");
	return(new ESVG.RoundRect(node,x,y,w,h,r,fill,stroke,edgeW));
}

ESVG.RoundRect.prototype=new ESVG.SVGItem();

ESVG.RoundRect.prototype.updatePath=function() {
	var ux=this.x;
	var uy=this.y;
	var lx=this.x+this.w;
	var ly=this.y+this.h;
	var r=this.r;
	if (!ux || !uy || !lx || !ly || !r) return;
	var p="M "+(ux+r)+" "+uy;
	p+=" L "+(lx-r)+" "+uy;
	p+=" A "+r+" "+r+" 0 0 1 "+lx+" "+(uy+r);
	p+=" L "+lx+" "+(ly-r);
	p+=" A "+r+" "+r+" 0 0 1 "+(lx-r)+" "+ly;
	p+=" L "+(ux+r)+" "+ly;
	p+=" A "+r+" "+r+" 0 0 1 "+ux+" "+(ly-r);
	p+=" L "+ux+" "+(uy+r);
	p+=" A "+r+" "+r+" 0 0 1 "+(ux+r)+" "+uy; 
	this.path=p;
	ESVG.set(this.base,"d",p);
}

ESVG.RoundRect.prototype.setPos=function(x,y) {
	this.x=x;
	this.y=y;
	this.updatePath();
}

ESVG.RoundRect.prototype.setCornerRadius=function(r) {
	this.r=r
	this.updatePath();
}

ESVG.RoundRect.prototype.setGeometry=function(w,h) {
	if (w<0) w=0;
	if (h<0) h=0;
	this.w=w;
	this.h=h;
	this.updatePath();
}

ESVG.RoundRect.prototype.setBorder=function(stroke,edgeW) {
	this.setStroke(stroke);
	this.setStrokeWidth(edgeW);
}

ESVG.RoundRect.prototype.doMoveNotify=function() {
	this.x=this.layoutBox.getHomeX();
	this.y=this.layoutBox.getHomeY();
	this.updatePath();
	this.raiseMoveNotify();
}

ESVG.RoundRect.prototype.doResizeNotify=function() {
	this.x=this.layoutBox.getHomeX();
	this.y=this.layoutBox.getHomeY();
	this.w=this.layoutBox.getWidth();
	this.h=this.layoutBox.getHeight();
	this.updatePath();
	this.raiseResizeNotify();
}

ESVG.RoundRect.prototype.projectClassDataAsJSON=function() {
	var s = [];
	if (this.x) s.push('cX:"'+this.x+'"');
	if (this.y) s.push('cY:"'+this.y+'"');
	if (this.w) s.push('cW:"'+this.w+'"');
	if (this.h) s.push('cH:"'+this.h+'"');
	if (this.r) s.push('cR:"'+this.r+'"');
	return(s.join(",")+',');
}

ESVG.RoundRect.restoreObject = function(obj) {
	var n = ESVG.RoundRect.create(obj.cX,obj.cY,obj.cW,obj.cH,obj.cR);
	n.restoreStyles(obj.oA);
	return(n);
}

//=================================================================
// SHAPE
//=================================================================
ESVG.Shape=function(node,edgePath,fill,stroke,edgeW) {
	this.registerInstance(node,"Shape");
	if (edgePath) this.setEdgePath(edgePath);
	if (fill) this.setFill(fill);
	if (stroke&&edgeW) this.setBorder(stroke,edgeW);
	return(this);
}

ESVG.Shape.create=function(edgePath,fill,stroke,edgeW) {
	var node=ESVG.create("path");
	return(new ESVG.Shape(node,edgePath,fill,stroke,edgeW));
}

ESVG.Shape.prototype= new ESVG.SVGItem();

ESVG.Shape.prototype.setEdgePath=function(edgePath) {
	if (!edgePath) return;
	this.edgePath=edgePath;
	ESVG.set(this.base,"d",edgePath);
}

ESVG.Shape.prototype.setBorder=function(stroke,edgeW) {
	this.setStroke(stroke);
	this.setStrokeWidth(edgeW);
}

ESVG.Shape.prototype.projectClassDataAsJSON=function() {
	var s = [];
	if (this.edgePath) s.push('cEP:"'+this.edgePath+'"');
	return(s.join(",")+',');
}

ESVG.Shape.restoreObject = function(obj) {
	var n = ESVG.Shape.create(obj.cEP);
	n.restoreStyles(obj.oA);
	return(n);
}

//=================================================================
// VECTOR IMAGE
//=================================================================
ESVG.VectorImage=function(node,x,y,w,h,root) {
	this.registerInstance(node,"VectorImage");
	this.setPos(x,y);
	this.setGeometry(w,h);
	this.setRoot(root);
	this.setViewBox("0 0 "+w+" "+h);
	this.setAspectRatio("none");
	return(this);
}

ESVG.VectorImage.create=function(x,y,w,h,root) {
	var node=ESVG.create("svg");
	return(new ESVG.VectorImage(node,x,y,w,h,root));
}

ESVG.VectorImage.prototype=new ESVG.SVGItem();

ESVG.VectorImage.prototype.setGeometry=function(w,h) {
	this.w=w;
	this.h=h;
	ESVG.set(this.base,"width",w);
	ESVG.set(this.base,"height",h);
}

ESVG.VectorImage.prototype.setRoot=function(root) {
	this.root = root;
}

ESVG.VectorImage.prototype.setViewBox=function(vb) {
	this.vb = vb
	if (!vb) return;
	ESVG.set(this.base,"viewBox",vb);
	var a=vb.split(" ");
	this.viewMinX=parseInt(a[0],10);
	this.viewMinY=parseInt(a[1],10);
	this.viewMaxX=parseInt(a[2],10);
	this.viewMaxY=parseInt(a[3],10);
	this.viewH=this.viewMaxY-this.viewMinY;
	this.viewW=this.viewMaxX-this.viewMinX;
	this.scale=null;
}

ESVG.VectorImage.prototype.setAspectRatio=function(par) {
	if (!par) return;
	ESVG.set(this.base,"preserveAspectRatio",par);
	this.par = par;
}

ESVG.VectorImage.prototype.projectSVG=function() {
	var s = [];
	ESVG.xmlGenerateSource(s,this.root);
	return(s.join("\n"));
}	

ESVG.VectorImage.prototype.projectClassDataAsJSON=function() {
	var s = [];
	if (this.x) s.push('cX:"'+this.x+'"');
	if (this.y) s.push('cY:"'+this.y+'"');
	if (this.w) s.push('cW:"'+this.w+'"');
	if (this.h) s.push('cH:"'+this.h+'"');
	if (this.vb) s.push('cVB:"'+this.vb+'"');
	if (this.par) s.push('cPAR:"'+this.par+'"');
	return(s.join(",")+',');
}

ESVG.VectorImage.restoreObject = function(obj) {
	var n = ESVG.VectorImage.create(obj.cX,obj.cY,obj.cW,obj.cH);
	if (obj.cVB) n.setViewBox(obj.cVB);
	if (obj.cPAR) n.setAspectRatio(obj.cPAR);
	n.restoreStyles(obj.oA);
	return(n);
}
//=================================================================
// LAYOUT
//=================================================================

ESVG.ACP_RADIUS = 3;
ESVG.PCP_RADIUS = 2;

//===== DRAG STUFF =====//
  
ESVG.dragItem = [];
ESVG.activeDragItem=null;

ESVG.startDrag=function(w) {
	var mgr = w.mgr;
	if (mgr.startDrag) mgr.startDrag(mgr.engine,w);
}

ESVG.endDrag=function(w) {
	var mgr = w.mgr;
	if (mgr.endDrag) mgr.endDrag(mgr.engine,w);
}

ESVG.constrainDragX=function(w, intendedX) {
	var mgr = w.mgr;
	if (mgr.constrainDragX) return(mgr.constrainDragX(mgr.engine,w,intendedX));
	return(intendedX);
}

ESVG.constrainDragY=function(w, intendedY) {
	var mgr = w.mgr;
	if (mgr.constrainDragY) return(mgr.constrainDragY(mgr.engine,w,intendedY));
	return(intendedY);
}

ESVG.moveDragItem=function(w,x,y) {
	var mgr = w.mgr;
	if (mgr.moveDragItem) return(mgr.moveDragItem(mgr.engine,w,x,y));
	else mgr.setPos(x,y);
}

ESVG.getDragWrapper=function(element) {
	for (var i=0;i<ESVG.dragItem.length;i++) {
		if (ESVG.dragItem[i].node==element) return(ESVG.dragItem[i]);
	}
	return(null);
}

ESVG.registerDragItem=function(element, manager) {
	var w={};
	w.node=element;
	w.mgr=manager;
	ESVG.dragItem[ESVG.dragItem.length]=w;
	if (element.controller) {
		element.controller.setOnMouseDown("ESVG.drag(evt);")
	}
	else ESVG.set(element,"onmousedown","ESVG.drag(evt);");
	return(w);
}

ESVG.removeDragItem=function(element) {
	for (var i=0;i<ESVG.dragItem.length;i++) {
		if (ESVG.dragItem[i].node==element) ESVG.dragItem[i]=null;
	}
}

ESVG.track=function(obj,origX,origY) {
	var scale=obj.getRoot().getScale();
	var ignore = true;

	// register event handlers that will deal with succeeding events in the
	// operation (mousemove & mouseup).
	if (document.addEventListener) { // DOM Lvl 2
		document.addEventListener("mousemove",moveHandler,true);
		document.addEventListener("mouseup",upHandler,true);
	}

	// Now define a couple internal functions the handle the rest of the operation

	// This handler captures mouse move event while the element is being dragged 
	// It moves the element and swallows the event.  It is important to keep this 
	// short and sweet as dragging is an expensive operation and doing it in an 
	// interpreted environment only makes things worse
	function moveHandler(e) {
		var newX = e.layerX*scale;
		var newY = e.layerY*scale;
		if (obj.trackMouseMove) obj.trackMouseMove(newX,newY);
		return(ZLM.killEvent(e));
	}  // End of moveHandler

	// This handler wraps up the drag by capturing the ending mouseup event
	function upHandler(e) {
		if (ignore) {
			ignore=false;
			return;
		}
		if (obj.endTrack) obj.endTrack();
		if (document.removeEventListener) { // DOM 2
			document.removeEventListener("mouseup",upHandler,true);
			document.removeEventListener("mousemove",moveHandler,true);
		} 
		return(ZLM.killEvent(e));
	} // End of upHandler
} // End of track

ESVG.drag=function(evt) {
	var element=evt.currentTarget;
	var scale=1;
	if (element.controller) {
		var r = element.controller.getRoot();
		if (r && r.getScale) scale=r.getScale();
	}
	if (ESVG.activeDragItem!=null) return;
	var w = ESVG.getDragWrapper(element); 
	ESVG.activeDragItem=w;
	if (w==null) return;
	ESVG.startDrag(w);

	// get the start location of the drag in window coordinates
	var startX = evt.clientX*scale;
	var startY = evt.clientY*scale;

	// get the initial position of the element being dragged (this is in doc coordinates)
	var bounds= element.getBBox();
	var origX = bounds.x;
	var origY = bounds.y;
//alert("Start: "+startX+","+startY+"  Obj: "+origX+","+origY);
	var deltaX = startX-origX;
	var deltaY = startY-origY;

	// register event handlers that will deal with the succeeding events needed to complete the drag
	// operation (mousemove & mouseup).
	if (ESVG.isAdobe || document.documentElement.addEventListener ) {
		document.documentElement.addEventListener("mousemove",moveHandler,false);
		document.documentElement.addEventListener("mouseup",upHandler,false);
	}

	// Now define a couple internal functions the handle the rest of the drag operation

	// This handler captures mouse move event while the element is being dragged 
	// It moves the element and swallows the event.  It is important to keep this 
	// short and sweet as dragging is an expensive operation and doing it in an 
	// interpreted environment only makes things worse
	function moveHandler(e) {
		// move element reletive to initial location of the drag
		var newX = ESVG.constrainDragX(w, e.clientX*scale - deltaX);
		var newY = ESVG.constrainDragY(w, e.clientY*scale - deltaY);
		ESVG.moveDragItem(w,newX,newY);
		return(ZLM.killEvent(e));
	}  // End of moveHandler

	// This handler wraps up the drag by capturing the ending mouseup event
	function upHandler(e) {
		ESVG.endDrag(w);
		if (ESVG.isAdobe || document.documentElement.removeEventListener) {
			document.documentElement.removeEventListener("mouseup",upHandler,false);
			document.documentElement.removeEventListener("mousemove",moveHandler,false);
		} 
		ESVG.activeDragItem=null;
//		return(ZLM.killEvent(e));
	} // End of upHandler
	return(ZLM.killEvent(evt));
} // End of drag

// a layout box is an invisible container for adjusting the size and location of a
// contained rectangular div.  It also contains four control pips used to effect the actual
// size changes to the goemetry

ESVG.LayoutBox = function(node, homeX, homeY, width, height) {
	this.registerInstance(node,"LayoutBox");

	this.minHeight=null;
	this.maxHeight=null;
	this.minWidth=null;
	this.maxwidth=null;

	this.targetNode=null;
	this.notifyResize=null;
	this.notifyMove=null;
	this.constrainX=null;
	this.constrainY=null;
	this.incrementalEvents=false;

	this.innerDiv = ESVG.Rect.create(homeX,homeY,width,height,"#ffffff","#000000","0.5");
	this.innerDiv.setStrokeDashArray("1,1");
	this.innerDiv.setStrokeDashOffset("0");
	this.innerDiv.setStrokeOpacity("1");
	this.innerDiv.setFillOpacity(".01");
	this.innerDiv.controller=this;
	ESVG.registerDragItem(this.innerDiv.base,this);
	this.appendChild(this.innerDiv);

	this.boxUL=this.initControlPoint(homeX,homeY,"UL");
	this.boxUR=this.initControlPoint(homeX+width,homeY,"UR");
	this.boxLL=this.initControlPoint(homeX,homeY+height,"LL");
	this.boxLR=this.initControlPoint(homeX+width,homeY+height,"LR");

	return(this);  
}

ESVG.LayoutBox.create=function(homeX, homeY, width, height) {
	var node=ESVG.create("g");
	return(new ESVG.LayoutBox(node,homeX, homeY, width, height));
}

ESVG.LayoutBox.prototype=new ESVG.SVGItem();

ESVG.LayoutBox.prototype.initControlPoint=function(x,y,pos) {
	var p=ESVG.ControlPt.create(x,y,pos,this);
	p.setMoveNotify("this.controller.adjustCtrlPts(this,x,y);");
	p.setDragXConstraint("this.controller.constrainCtrlPtX(this,x);");
	p.setDragYConstraint("this.controller.constrainCtrlPtY(this,y);");
	p.setEndMoveNotify("this.controller.endCtrlPtDrag(this);");
	this.appendChild(p);
	return(p);
}

ESVG.LayoutBox.prototype.hide=function() {
	this.setDisplay("none");
}

ESVG.LayoutBox.prototype.show=function() {
//ESVG.dumpObj(this);
	this.bindToNode(this.targetNode);
	this.setDisplay("block");
}

ESVG.LayoutBox.prototype.getBoundNode=function() {
	return(this.targetNode);
}

ESVG.LayoutBox.prototype.getHomeX=function() {
	return(this.innerDiv.x);
}

ESVG.LayoutBox.prototype.getHomeY=function() {
	return(this.innerDiv.y);
}

ESVG.LayoutBox.prototype.getWidth=function() {
	return(this.innerDiv.w);
}

ESVG.LayoutBox.prototype.getHeight=function() {
	return(this.innerDiv.h);
}

ESVG.LayoutBox.prototype.getEditOpStatus=function() {
	return(this.status);
}

ESVG.LayoutBox.prototype.setMinHeight=function(h) {
	this.minHeight=h;
}

ESVG.LayoutBox.prototype.setMaxHeight=function(h) {
 	this.maxHeight=h;
}

ESVG.LayoutBox.prototype.setMinWidth=function(w) {
	this.minWidth=w;
}

ESVG.LayoutBox.prototype.setMaxWidth=function(w) {
	this.maxWidth=w;
}

ESVG.LayoutBox.prototype.enableIncrementalEvents=function(flag) {
	var p=false;
	if (flag=="true" || flag=="t") p=true;
	else if (flag=="True" || flag=="TRUE" || flag=="T") p=true;
	else if (flag==true || flag==1 || flag=="1") p=true;
	this.incrementalEvents=p;
}

ESVG.LayoutBox.prototype.setResizeNotify=function(cbFunction) {
	this.notifyResize=cbFunction;
}

ESVG.LayoutBox.prototype.setMoveNotify=function(cbFunction) {
	this.notifyMove=cbFunction;
}

ESVG.LayoutBox.prototype.setDragXConstraint=function(cbFunction) {
	if (cbFunction!=null) {
		var fnName=cbFunction.substring(0,cbFunction.indexOf("("));
		cbFunction=fnName+"(this,intendedX);";
	}
	this.constrainX=cbFunction;
}

ESVG.LayoutBox.prototype.setDragYConstraint=function(cbFunction) {
	if (cbFunction!=null) {
		var fnName=cbFunction.substring(0,cbFunction.indexOf("("));
		cbFunction=fnName+"(this,intendedY);";
	}
	this.constrainY=cbFunction;
}

ESVG.LayoutBox.prototype.bindToNode=function(node) {
	this.targetNode=node;
	var o = ESVG.getRelativePos(node,this.base);
	var b=node.getBBox();
	var w=b.width;
	var h=b.height;
	this.resize(w,h);  
	this.reposition(o.x,o.y);
}

ESVG.LayoutBox.prototype.resize=function(w,h){
	this.innerDiv.setGeometry(w,h);
	var x=this.innerDiv.x;
	var y=this.innerDiv.y;
	this.boxUR.move(x+w,y);
	this.boxLL.move(x,y+h);
	this.boxLR.move(x+w,y+h);
}

ESVG.LayoutBox.prototype.reposition=function(x,y) {
	var w=this.innerDiv.w;
	var h=this.innerDiv.h;
	this.innerDiv.setPos(x,y);
	this.boxUL.move(x,y);
	this.boxUR.move(x+w,y);
	this.boxLL.move(x,y+h);
	this.boxLR.move(x+w,y+h);
}

ESVG.LayoutBox.prototype.constrainDragX=function(e,w,intendedX) {
	if (this.constrainX!=null) {
		intendedX=parseInt(eval(this.constrainX));
	}
	return(intendedX);
}

ESVG.LayoutBox.prototype.constrainDragY=function(engine,wrapper,intendedY) {
	if (this.constrainY!=null) {
		intendedY=parseInt(eval(this.constrainY))-d;
	}
	return(intendedY);
}

ESVG.LayoutBox.prototype.endDrag=function(engine,wrapper) {
//alert('end Drag');
	if (this.notifyMove) eval(this.notifyMove);
}

ESVG.LayoutBox.prototype.moveDragItem=function(egn,w,x,y) {
	this.reposition(x,y);
	if (this.incrementalEvents && this.notifyMove) eval(this.notifyMove); 
}

ESVG.LayoutBox.prototype.constrainCtrlPtX=function(who,x) {
	if (who.pos=="UL"||who.pos=="LL") {
		var max=this.innerDiv.x+this.innerDiv.w-2;
		if (x>max) x=max;
	}
	else {
		var min=this.innerDiv.x+2;
		if (x<min) x=min;
	}
	return(x);
}

ESVG.LayoutBox.prototype.constrainCtrlPtY=function(who,y) {
	if (who.pos=="UL"||who.pos=="UR") {
		var max=this.innerDiv.y+this.innerDiv.h-2;
		if (y>max) y=max;
	}
	else {
		var min=this.innerDiv.y+2;
		if (y<min) y=min;
	}
	return(y);
}

ESVG.LayoutBox.prototype.endCtrlPtDrag=function(who) {
	if (this.notifyResize) eval(this.notifyResize);  
	if (this.notifyMove) eval(this.notifyMove);
}

ESVG.LayoutBox.prototype.adjustCtrlPts=function(who,x,y) {
	if (who.pos=="UL") this.adjustUL(x,y);
	else if (who.pos=="LL") this.adjustLL(x,y);
	else if (who.pos=="UR") this.adjustUR(x,y);
	else if (who.pos=="LR") this.adjustLR(x,y);
}

ESVG.LayoutBox.prototype.adjustLR=function(x,y) {
	var b= this.innerDiv.base.getBBox();
	var oldX=b.x;
	var oldY=b.y;
	var w=x-b.x;
	var h=y-b.y;

	this.innerDiv.setGeometry(w,h);
	this.boxUR.move(oldX+w,oldY);
	this.boxLL.move(oldX,oldY+h);

	if (this.incrementalEvents) {
		if (this.notifyResize) eval(this.notifyResize);  
		if (this.notifyMove) eval(this.notifyMove);
	} 
}

ESVG.LayoutBox.prototype.adjustUR=function(x,y) {
	var b= this.innerDiv.base.getBBox();
	var oldX=b.x;
	var oldY=b.y;
	var w=x-b.x;
	var h=b.height-y+b.y;

	this.innerDiv.setPos(oldX,y);
	this.innerDiv.setGeometry(w,h);

	this.boxUL.move(oldX,y);
	this.boxLR.move(x,y+h);

	if (this.incrementalEvents) {
		if (this.notifyResize) eval(this.notifyResize);  
		if (this.notifyMove) eval(this.notifyMove);
	} 
}

ESVG.LayoutBox.prototype.adjustLL=function(x,y) {
	var b= this.innerDiv.base.getBBox();
	var oldY=b.y;
	var w=b.width-x+b.x;
	var h=y-b.y;

	this.innerDiv.setPos(x,oldY);
	this.innerDiv.setGeometry(w,h);

	this.boxUL.move(x,oldY);
	this.boxLR.move(x+w,oldY+h);

	if (this.incrementalEvents) {
		if (this.notifyResize) eval(this.notifyResize);  
		if (this.notifyMove) eval(this.notifyMove);
	} 
}

ESVG.LayoutBox.prototype.adjustUL=function(x,y) {
	var b= this.innerDiv.base.getBBox();
	var w=b.width-x+b.x;
	var h=b.height-y+b.y;
	this.innerDiv.setPos(x,y);
	this.innerDiv.setGeometry(w,h);
	this.boxUR.move(x+w,y);
	this.boxLL.move(x,y+h);

	if (this.incrementalEvents) {
		if (this.notifyResize) eval(this.notifyResize);  
		if (this.notifyMove) eval(this.notifyMove);
	}  
}

//#############################################################################################
// Control point is a dragable box on screen used to resize areas and reshape elements 
//#############################################################################################

ESVG.ControlPt = function(node, centerX, centerY, pos, controller) {
	this.registerInstance(node,"ControlPt");

	var oD = ESVG.ACP_RADIUS; //outer distance
	var iD = ESVG.PCP_RADIUS; //inner distance

	this.controller = controller;
	this.pos = pos;
	this.cX = centerX;
	this.cY = centerY;
	this.active = false;
	this.constrainX=null;
	this.constrainY=null;
	this.notifyMove=null;
	this.notifyMoveEnd=null;
	this.div = ESVG.Rect.create(this.cX-oD,this.cY-oD,(2*oD+1),(2*oD+1),"#ffff77","none",0);
	this.dot = ESVG.Rect.create(this.cX-iD,this.cY-iD,(2*iD+1),(2*iD+1),"#000000","none",0);
	this.appendChild(this.div);
	this.appendChild(this.dot);
	this.div.controller=this;
	this.dot.controller=this;
	this.dot.setOnRightClick("this.controller.doRightClick(evt);");
	ESVG.registerDragItem(this.div.base,this);
	ESVG.registerDragItem(this.dot.base,this);
	this.setPositionTag(pos);
	return(this);
}

ESVG.ControlPt.create=function(cx,cy,pos,controller) {
	var node=ESVG.create("g");
	return(new ESVG.ControlPt(node,cx,cy,pos,controller));
}

ESVG.ControlPt.prototype=new ESVG.SVGItem();

ESVG.ControlPt.prototype.doRightClick=function(evt) {
	if (this.onRightClick) eval(this.onRightClick);
}

ESVG.ControlPt.prototype.setOnRightClick=function(cbStr) {
	this.onRightClick=cbStr;
}

ESVG.ControlPt.prototype.setPositionTag=function(pos) {
	this.pos=pos;
	if (pos=="LR" || pos=="UL") var cursor="nw-resize";
	else if (pos=="LL" || pos=="UR") var cursor="sw-resize";
	else var cursor="pointer";
	this.div.setCursor(cursor);
	this.dot.setCursor(cursor);
}

ESVG.ControlPt.prototype.setMoveNotify=function(cbFunction) {
	if (cbFunction!=null) {
		var fnName=cbFunction.substring(0,cbFunction.indexOf("("));
		cbFunction=fnName+"(this,x,y);";
	}
	this.notifyMove=cbFunction;
}

ESVG.ControlPt.prototype.setEndMoveNotify=function(cbFunction) {
	if (cbFunction!=null) {
		var fnName=cbFunction.substring(0,cbFunction.indexOf("("));
		cbFunction=fnName+"(this,this.cX,this.cY);";
	}
	this.notifyMoveEnd=cbFunction;
}

ESVG.ControlPt.prototype.setDragXConstraint=function(cbFunction) {
	if (cbFunction!=null) {
		var fnName=cbFunction.substring(0,cbFunction.indexOf("("));
		cbFunction=fnName+"(this,intendedX);";
	}
	this.constrainX=cbFunction;
}

ESVG.ControlPt.prototype.setDragYConstraint=function(cbFunction) {
	if (cbFunction!=null) {
		var fnName=cbFunction.substring(0,cbFunction.indexOf("("));
		cbFunction=fnName+"(this,intendedY);";
	}
	this.constrainY=cbFunction;
}

ESVG.ControlPt.prototype.move=function(x,y) {
	var oD = ESVG.ACP_RADIUS; //outer distance
	var iD = ESVG.PCP_RADIUS; //inner distance
	this.cX = x;
	this.cY = y;
	this.div.setPos(x-oD,y-oD);
	this.dot.setPos(x-iD,y-iD);
}

ESVG.ControlPt.prototype.moveDragItem=function(egn,w,x,y) {
	if (w.node==this.div.base) var o = ESVG.ACP_RADIUS; //outer distance
	else var o = ESVG.PCP_RADIUS;
	x+=o;
	y+=o;
	this.move(x,y);
	if (this.notifyMove) eval(this.notifyMove);
}

ESVG.ControlPt.prototype.startDrag=function(w) {
	this.parentNode.appendChild(this);
}

ESVG.ControlPt.prototype.constrainDragX=function(egn,w,intendedX) {
	var n=w.node;
	if (this.constrainX!=null) {
		if (w.node==this.div.base) var o = ESVG.ACP_RADIUS;
		else var o = ESVG.PCP_RADIUS;
		intendedX+=o;
		intendedX=parseInt(eval(this.constrainX))-o;
	}
	return(intendedX);
}

ESVG.ControlPt.prototype.constrainDragY=function(egn,w,intendedY) {
	var n=w.node;
	if (this.constrainY!=null) {
		if (w.node==this.div.base) var o = ESVG.ACP_RADIUS;
		else var o = ESVG.PCP_RADIUS;
		intendedY+=o;
		intendedY=parseInt(eval(this.constrainY))-o;
	}
	return(intendedY);
}

ESVG.ControlPt.prototype.endDrag=function(w) {
	if (this.notifyMoveEnd) eval(this.notifyMoveEnd);
}

//####################################################################################
// BUNGIE CORD
//####################################################################################
ESVG.BungieCord = function(node, anchorX, anchorY, color, width, controller) {
	this.registerInstance(node,"BungieCord");
	this.controller = controller;
	this.setAnchor(anchorX,anchorY);
	this.setEnd(anchorX,anchorY);
	this.setStyle(color,width);
	this.notifyMove=null;
	this.notifyMoveEnd=null;
	return(this);
}   

ESVG.BungieCord.create=function(ax,ay,color,width,controller) {
	var node=ESVG.create("line");
	return(new ESVG.BungieCord(node,ax,ay,color,width));
}

ESVG.BungieCord.prototype=new ESVG.SVGItem();

ESVG.BungieCord.prototype.setStyle=function(color,width) {
	this.setStroke(color);
	this.setStrokeWidth(width);
}

ESVG.BungieCord.prototype.setAnchor=function(x1,y1) {
	this.ax=x1;
	this.ay=y1;
	ESVG.set(this.base,"x1",x1);
	ESVG.set(this.base,"y1",y1);
	this.setEnd(x1,y1);
}

ESVG.BungieCord.prototype.setEnd=function(x2,y2) {
	this.endX=x2;
	this.endY=y2;
	ESVG.set(this.base,"x2",x2);
	ESVG.set(this.base,"y2",y2);
}

ESVG.BungieCord.prototype.setMoveNotify=function(cbFunction) {
	if (cbFunction!=null) {
		var fnName=cbFunction.substring(0,cbFunction.indexOf("("));
		cbFunction=fnName+"(this,this.endX,this.endY);";
	}
	this.notifyMove=cbFunction;
}

ESVG.BungieCord.prototype.setEndMoveNotify=function(cbFunction) {
	if (cbFunction!=null) {
		var fnName=cbFunction.substring(0,cbFunction.indexOf("("));
		cbFunction=fnName+"(this,this.endX,this.endY);";
	}
	this.notifyMoveEnd=cbFunction;
}

ESVG.BungieCord.prototype.startTrack=function() {
	ESVG.track(this,this.ax,this.ay);
}

ESVG.BungieCord.prototype.trackMouseMove=function(x,y) {
	this.setEnd(x,y);
	if (this.notifyMove) eval(this.notifyMove);
}

ESVG.BungieCord.prototype.endTrack=function() {
	if (this.notifyMoveEnd) eval(this.notifyMoveEnd);
}

//=================================================================
// XML
//=================================================================
/*
*/

//=======================================//
// Simplified nodes for holding XML data //
//=======================================//
ESVG.XMLNode=function(name) {
	// CONSTANTS:
	this.ELEMENT_NODE = 1;
	this.ATTRIBUTE_NODE = 2;
	this.TEXT_NODE = 3;
	this.CDATA_SECTION_NODE = 4;
	this.PROCESSING_INSTRUCTION_NODE = 7;
	this.COMMENT_NODE = 8;
	this.DOCUMENT_NODE = 9;
	this.DOCUMENT_TYPE_NODE = 10;
	this.DOCUMENT_FRAGMENT_NODE = 11;
	//PROPERTIES:
	this.attributes=[];	//Array of Attr objects, this is a subset of childNodes
	this.childNodes=[];	//Array of Node objects
	this.firstChild=null;	//Pointer to childNodes[0]
	this.lastChild=null;	//Pointer to childNodes[childNodes.length-1]
	this.localName=null;	//String holding a subset of the nodeName
	this.namespaceURI=null;	//String holding namespace if applicable
	this.nextSibling=null;	//Pointer to a node in someone else's childNodes array
	this.nodeName=name;	//String holding the full qualified tagName such as 'svg:rect' or 'select' if applicable
	this.nodeType=0;	//Integer (cf CONSTANTS)
	this.nodeValue=null;	//String, contents varies with nodeType
	this.ownerDocument=null;	//Pointer to root node of type DOCUMENT_NODE
	this.parentNode=null;	//Pointer to parent node
	this.prefix=null;	//String holding namespace prefix part of the nodeName (i.e. 'svg' of 'svg:rect') where applicable
	this.previousSibling=null;	//Pointer to node in someone else's childNodes array
}

///Node appendChild(node newChild) 
///  Adds a node to the current childNodes array.
///  If newChild.parentNode is defined, first call newChild.parentNode.removeChild(newChild).  
///  Update this.lastChild, newChild.parentNode, newChild.previousSibling, and newChild.nextSibling accordingly.
///  Returns NewKid is successful else null
ESVG.XMLNode.prototype.appendChild=function(newChild) {
	if (newChild==this) return(null);
	if (newChild.parentNode!=null) newChild.parentNode.removeChild(newChild);
	newChild.parentNode=this;
	this.childNodes[this.childNodes.length]=newChild;
	if (this.firstChild==null) {
		this.childNodes[0]=newChild;
		this.firstChild=newChild;
		this.lastChild=newChild;
	}
	else {
		newChild.previousSibling=this.lastChild;
		this.lastChild.nextSibling=newChild;
		this.lastChild=newChild;
	}
	return(newChild)
}

///Node cloneNode(boolean recurse)
///  Return a clone of this node (and optionally its children depending on the flag) the only data difference between the clone and the original
///  is that parentNode, previousSibling and nextSibling are all initialized to null in the clone.
///  Returns new cloned node, or null on error.
ESVG.XMLNode.prototype.cloneNode=function(recurse) {
/*
  TODO
*/
}

///Boolean hasAttributes()  
///  Returns true if this is an ELEMENT_NODE and the length of the attributes array is > 0
ESVG.XMLNode.prototype.hasAttributes=function() {
	if (this.nodeType!=this.ELEMENT_NODE) return(false);
	return(this.attributes.length>0);
}

///Boolean hasChildNodes()
///  Returns true if the length of the childNodes array is > 0 
ESVG.XMLNode.prototype.hasChildNodes=function() {
	if (this.childNodes.length>0) return(true);
	return(false);
}

///Node insertBefore(node newKid, node reference)
///  Inserts a new node into the (ordered) childNodes array growing the array as needed.
///  If reference is null, redirect to appendChild() instead.
///  If NewKid.parentNode is defined, first call NewKid.parentNode.removeChild(NewKid). 
///  Update reference.previousSibling.nextSibling and reference.previousSibling to point to NewKid. 
///  Update NewKid.parentNode, NewKid.previousSibling, and NewKid.nextSibling accordingly.
///  If reference was this.firstChild, update this.firstChild to point to NewKid
///  Returns NewKid is successful else null
ESVG.XMLNode.prototype.insertBefore=function(newKid,reference) {
	if (!newKid) return(null);
	if (!reference) return(this.appendChild(newKid));
	if (newKid.parentNode!=null) newKid.parentNode.removeChild(newKid);
	newKid.parentNode=this;
	var insertPoint = 0;
	for (var i=this.childNodes.length;i>0;i--) {
		this.childNodes[i] = this.childNodes[i-1];
		if (this.childNodes[i]==reference) {
			insertPoint = i-1;
			i=0;
		}
	}
	this.childNodes[insertPoint]=newKid;
	reference.previousSibling.nextSibling = newKid;
	newKid.previousSibling = reference.previousSibling;
	newKid.nextSibling = reference;
	reference.previousSibling = newKid;	
	this.firstChild = this.childNodes[0];
	this.lastChild = this.childNodes[this.childNodes.length-1];
	return(newKid)
}

///void normalize()
///  Merge adjacent TEXT_NODEs in the childNodes array into one large node by concatenating their values
ESVG.XMLNode.prototype.normalize=function() {
/*
TODO
*/
}

///Node removeChild(node kid)
///  Remove the kid node from the childNodes array (if present) shortening the length of the array
///  Update this.firstChild or this.lastChild if needed
///  Set kid.parentNode, kid.previousSibling and kid.nextSibling to null
///  If kid was an ATTRIBUTE_NODE update this.attributes.
///  Return kid - note this does NOT deallocate the node
ESVG.XMLNode.prototype.removeChild=function(n) {
	var idx=0;
	while (idx<this.childNodes.length) {
		if (this.childNodes[idx]==n) {
			for (var i=idx;i<this.childNodes.length-1;i++) {
				this.childNodes[i]=this.childNodes[i+1];
			}
			this.childNodes.pop();
			if (n.previousSibling) {
				n.previousSibling.nextSibling=n.nextSibling;
			}
			if (n.nextSibling) {
				n.nextSibling.previousSibling=n.previousSibling;
			}
			if (this.childNodes.length>0) {
				this.firstChild=this.childNodes[0];
				this.lastChild=this.childNodes[this.childNodes.length-1];
			}
			else {
				this.firstChild=null;
				this.lastChild=null;
			}
			n.parentNode=null;
			n.previousSibling=null;
			n.nextSibling=null;
			return;
		}
		idx++;
	}
	return(n);
}

///Node replaceChild(node newChild, node oldChild) 
///  Call this.insertBefore(newChild,oldChild)
///  Call this.removeChild(oldChild)
///  Return newChild
ESVG.XMLNode.prototype.replaceChild=function(newChild,oldChild) {
	if (!this.insertBefore(newChild,oldChild)) return(null);
	if (!this.removeChild(oldChild)) return(null);
	return(newChild);
}

///Attr getAttributeByName(string Name)
///  Scan the attributes array and return the first node found where its nodeName matches the given string.
///  If no match is found, return null.
///  Note: this has no official analog in the DOM spec, but it made the rest of the implementation easier.
ESVG.XMLNode.prototype.getAttributeByName=function(name) {
	var idx = this.getAttributeIdx(name);
	if (idx>=0) return(this.attributes[idx]);
	return(null);
}

/// Return the index into the attributes array that points to the attribute with the given name
ESVG.XMLNode.prototype.getAttributeIdx=function(attName) {
	for (var i=0;i<this.attributes.length;i++) {
		if (this.attributes[i].nodeName==attName) return(i);
	}
	return(-1);
}

/// Element array getElementsByTagName(string Name)
///  Do a depth first recursive search of childNodes array and return an array of all ELEMENT_NODE type nodes with the given tagName 
ESVG.XMLNode.prototype.getElementsByTagName=function(name) {
	this.getChildrenByName(name)
}

/// Element array getChildrenByName(string tagName)
///  Return an array of all nodes with the given tagName 
ESVG.XMLNode.prototype.getChildrenByName=function(tagName) {
	var a=[];
	a = this.seekChildrenByName(a,tagName);
	return(a);
}

/// Return an array of all children of a given class
ESVG.XMLNode.prototype.getChildrenByClassName=function(className) {
	var a = [];
	a = this.seekChildrenByAttributeValue(a,'class',className);
	return(a);
}

/// Recursively find all nodes with the given nodeName
ESVG.XMLNode.prototype.seekChildrenByName=function(a,tagName) {
	if (this.nodeName==tagName) {
		a.push(this);
	}
	for (var p=this.firstChild;p!=null;p=p.nextSibling)a=p.seekChildrenByName(a,tagName);
	return(a);
}

/// Recursively find all nodes with the given with a defined named attribute
ESVG.XMLNode.prototype.seekChildrenByAttribute=function(a,attrName) {
	var idx = this.getAttributeIdx(attrName);
	if (idx>=0) a.push(this);
	for (var p=this.firstChild;p!=null;p=p.nextSibling)a=p.seekChildrenByAttribute(a,attrName);
	return(a);
}

/// Recursively find all nodes with the given with a matching
ESVG.XMLNode.prototype.seekChildrenByAttributeValue=function(a,attrName,attrValue) {
	var idx = this.getAttributeIdx(attrName);
	if (idx>=0) {
		if (this.attributes[idx].nodeValue==attrValue) a.push(this);
	}
	for (var p=this.firstChild;p!=null;p=p.nextSibling)a=p.seekChildrenByAttributeValue(a,attrName,attrValue);
	return(a);
}

///void removeAttribute(string name)
///  Find the node with the given name in the attributes array and remove it
ESVG.XMLNode.prototype.removeAttribute=function(name) {
	var idx=this.getAttributeIdx(name);
	if (idx==-1) return;
	var len = this.attributes.length-1;
	for (var i=idx;i<len;i++) {
		this.attributes[i]=this.attributes[i+1];
	}
	this.attributes.pop();	
} 
                                                                     
/// Return the VALUE associated with the attribute with the given name
ESVG.XMLNode.prototype.getAttribute=function(attName) {
	var idx=this.getAttributeIdx(attName);
	if (idx==-1) return(null);
	return(this.attributes[idx].nodeValue);
}

///  Create a new node of type attribute and set its name and value accordingly
ESVG.XMLNode.prototype.addAttribute=function(attName,value) {
	var n = new ESVG.XMLNode(attName);
	n.nodeType = this.ATTRIBUTE_NODE;
	n.nodeValue = value;
	n.parentNode = this;
	var idx=this.attributes.length;
	this.attributes[idx]=n;
}

///void setAttribute(string name, string value)
///  Find the node with the given name in the attributes array.
///  If found, set node's value to value -else-
///  If not found create new Attr node with given name and value and call appendChild() on the new node
ESVG.XMLNode.prototype.setAttribute=function(attName,value) {
	var idx=this.getAttributeIdx(attName);
	if (idx==-1) this.addAttribute(attName,value);
	else this.attributes[idx].nodeValue=value;	
}

///Attr setAttributeNode( Attr newAttr)
///  Look for any existing attribute nodes with the given name.
///  If found call replaceChild(newAttr,foundAttr) -else-
///  If not found call appendChild(newAttr)
ESVG.XMLNode.prototype.setAttributeNode=function(newAttr) {
	var idx=this.getAttributeIdx(newAttr.nodeName);
	if (idx==-1) this.attributes.push(newAttr);
	else this.attributes[idx]=newAttr;	
}

//=======================//
// Custom XML-ish parser //
//=======================//

ESVG.xmlTagStack=[];

// Given a string that has already seen an 'openC' find its matching 'closeC'
// while being sensitive to nesting and embeded strings
ESVG.xmlBalanceChar=function(str,openC,closeC) {
	var nest=1;
	var i=0;
	while (i<str.length) {
		var c=str.charAt(i);
		if (c==closeC) {
			nest--; 
			if (nest==0)return(i);
		}
		if (c==openC) nest++;
		if (c=='"') i=str.indexOf('"',i+1);
		if (c=="'") i=str.indexOf("'",i+1);
		i++;
	}
	return(-1);
}

// look for a given character in the string, skipping instances within quotes
ESVG.xmlSeekChar=function(str,char) {
	var i=0;
	while (i<str.length) {
		if (str.charAt(i)==char) return(i);
		if (str.charAt(i)=='"') i=str.indexOf('"',i+1);
		if (str.charAt(i)=="'") i=str.indexOf("'",i+1);
		i++;
	}
	return(-1);
}

ESVG.xmlIsWhitespace=function(ch) {
	if (ch==" " || ch=="\t" || ch=="\n" || ch=="\r") return(true);
	return(false);
}

ESVG.xmlSeekNonWhitespace=function(str) {
	var i=0;
	while (i<str.length) {
		var ch=str.charAt(i);
		if (!(ch==" "||ch=="\t"||ch=="\n"||ch=="\r")) return(i);
		i++;
	}
	return(-1);
}

ESVG.xmlSeekWhitespace=function(str) {
	var i=0;
	while (i<str.length) {
		if (ESVG.xmlIsWhitespace(str.charAt(i))) return(i);
		if (str.charAt(i)=='"') i=str.indexOf('"',i+1);
		if (str.charAt(i)=="'") i=str.indexOf("'",i+1);
		i++;
	}
	return(-1);
}

ESVG.xmlTrim=function(str) {
	var sIdx=ESVG.xmlSeekNonWhitespace(str);
	var eIdx=str.length-1;
	while(eIdx>=sIdx && ESVG.xmlIsWhitespace(str.charAt(eIdx))) eIdx--;
	if (eIdx>=sIdx) str=str.substring(sIdx,eIdx+1);
	return(str)
}

ESVG.xmlParseAttributes=function(node,str) {
	var sIdx=ESVG.xmlSeekNonWhitespace(str);
	if (sIdx== -1) return(null);
	var s1=str.substr(sIdx);
	var eIdx=ESVG.xmlSeekWhitespace(s1);
	if (eIdx==-1) eIdx=s1.length;
	var nvp=s1.substr(0,eIdx).split("=");
//ZLM.cerr("Adding Attribute: "+nvp[0]+"==>"+nvp[1].substr(1,nvp[1].length-2));
	node.addAttribute(nvp[0],nvp[1].substr(1,nvp[1].length-2));
	if (eIdx<s1.length) return(ESVG.xmlParseAttributes(node,s1.substr(eIdx)));
	return(null);		
}

ESVG.xmlSanitizeAttributes=function(str) {
	while (str.indexOf(" =")>=0) str = str.split(" =").join("=");
	while (str.indexOf("= ")>=0) str = str.split("= ").join("=");
	return(str);
}
	
ESVG.xmlParseTagHeader=function(str) {
	str = ESVG.xmlSanitizeAttributes(str);
	var i=ESVG.xmlSeekWhitespace(str);
	if (i== -1) { // no attributes, just a name
		return(new ESVG.XMLNode(str));
	}
	var name=str.substr(0,i);
//ZLM.cerr("new node:: "+name);
	var node=new ESVG.XMLNode(name);
	var s1=str.substr(i+1);
	ESVG.xmlParseAttributes(node,s1);
	return(node);
}

ESVG.xmlParseTagBody=function(node,str) {
	var depth=ESVG.xmlTagStack.length;
	while(str!=null && ESVG.xmlTagStack.length>=depth) {
		var tagStart=str.indexOf("<");
		var firstNonBlank=ESVG.xmlSeekNonWhitespace(str);
		if (tagStart>firstNonBlank) { // need to check for data
//ZLM.cerr("Embedded data in tag body");
			var s1=str.substr(0,tagStart);
			str=str.substr(tagStart);
			var sIdx=ESVG.xmlSeekNonWhitespace(s1);
			if (sIdx!=-1) {
				var eIdx=s1.length-1;
				while(eIdx>=sIdx && ESVG.xmlIsWhitespace(s1.charAt(eIdx))) eIdx--;
				if (eIdx>=sIdx) {
					s1=s1.substring(sIdx,eIdx+1);
					var n=new ESVG.XMLNode("_txt_");
					n.nodeValue=s1;
					node.appendChild(n);
				}
			}
		}
//ZLM.cerr("LOOKING FOR EMBEDDED TAGS");
		str=ESVG.xmlParseNextTag(node,str);	
	}
	return(str);
}

ESVG.xmlParseComment=function(node,str) {
	var eIdx=str.indexOf("-->");
	if (eIdx==-1) {
		alert("Missing end tag of comment section");
		return(null);
	}
	var s1=str.substr(0,eIdx);
	var s2=str.substr(eIdx+3);
	if (s1.length>0) {
		var n=new ESVG.XMLNode("_comment_");
		n.nodeValue=s1;
		node.appendChild(n);
	}
//ZLM.cerr('got comment');
	return(s2);
}

ESVG.xmlParseCData=function(node,str) {
//ZLM.cerr("looking for CDATA");
	var eIdx=str.indexOf("]]>");
	if (eIdx==-1) {
		alert("Missing end tag of CDATA section");
		return(null);
	}
	var s1=str.substr(0,eIdx);
	var s2=str.substr(eIdx+1);
	if (s1.length>0) {
		var n=new ESVG.XMLNode("_cdata_");
		n.nodeValue=s1;
		node.appendChild(n);
	}
	return(s2);
}

ESVG.xmlParseDocType=function(node,str) {
	var eIdx=ESVG.xmlBalanceChar(str,"<",">");
	if (eIdx==-1) {
		alert("Missing end tag of DOCTYPE section");
		return(null);
	}
	var s1=str.substr(0,eIdx);
	var s2=str.substr(eIdx+1);
	if (s1.length>0) {
		var n=new ESVG.XMLNode("_doctype_");
		n.nodeValue=s1;
		node.appendChild(n);
	}
//ZLM.cerr('got doc type');
	return(s2);
}

ESVG.xmlParseTagFooter=function(str) {
	var i=str.indexOf(">");
	if (i==-1) {
		alert("Parse error attempting to close tag");
		return(null);
	}
	var s1=str.substr(0,i);
	var expected=ESVG.xmlTagStack.pop();
	if (s1!=expected) {
		alert("Expected close tag for "+expected+" but got "+s1);
		return(null);
	}
	var s2=str.substr(i+1);
//ZLM.cerr("got complete tag for "+expected);
	return(s2);
}

ESVG.xmlParseEncodingTag=function(tree,str) {
	var endIdx=ESVG.xmlSeekChar(str,"?");
	if (endIdx== -1 || str.charAt(endIdx+1)!=">") {
		alert("Error parsing XML encoding tag");
		return(null);
	}
	var s1=str.substr(0,endIdx);
	var n=ESVG.xmlParseTagHeader(s1);
	if (n!=null) tree.appendChild(n);
	var s2=str.substr(endIdx+2);
//ZLM.cerr("got encoding tag");
	return(s2);
}

ESVG.xmlParseTag=function(tree,str) {
	var nextClose=ESVG.xmlSeekChar(str,">");
	var nextSlash=ESVG.xmlSeekChar(str,"/");
	if (nextClose== -1||nextSlash==-1) {
		alert("Tag missing terminator");
		return(null);
	}
	if (nextSlash<nextClose) {
		var isEmpty=true;
		var endIdx=nextSlash;
	}
	else {
		var isEmpty=false;
		var endIdx=nextClose;
	}
	s1=str.substr(0,endIdx);
	var n=ESVG.xmlParseTagHeader(s1);
	if (n!=null) tree.appendChild(n);
	if (isEmpty) s2=str.substr(endIdx+2);
	else {
		ESVG.xmlTagStack.push(n.nodeName);
		s2=ESVG.xmlParseTagBody(n,str.substr(endIdx+1));		
	}
	return(s2);
}

ESVG.xmlParseNextTag=function(tree,str) {
	var tagStart=str.indexOf("<");
	if (tagStart==-1) return(null);
	var s1=str.substr(tagStart+1);
//ZLM.cerr("next segment: "+s1.substring(0,10)+" ... ");
	if (s1.charAt(0)=="?") s1=ESVG.xmlParseEncodingTag(tree,s1.substr(1));
	else if (s1.charAt(0)=="/") s1=ESVG.xmlParseTagFooter(s1.substr(1));
	else if (s1.indexOf("!--")==0) s1=ESVG.xmlParseComment(tree,s1.substr(3));
	else if (s1.indexOf("![CDATA[")==0) s1=ESVG.xmlParseCData(tree,s1.substr(8));
	else if (s1.indexOf("!DOCTYPE")==0) s1=ESVG.xmlParseDocType(tree,s1.substr(8));
	else s1=ESVG.xmlParseTag(tree,s1);
	return(s1);
}

ESVG.xmlParse=function(str) {
//ZLM.cerr("PARSE CALLED");
	var root=new ESVG.XMLNode("_rootBody");
	ESVG.xmlTagStack=[];
	while (str!=null) str=ESVG.xmlParseNextTag(root,str);
	return(root);
}

ESVG.xmlGetMaxDepth=function(root,d) {
	if (d==undefined) d=0;
	if (root.firstChild==null) return(d);
	var max=d;
	for (var p=root.firstChild;p!=null;p=p.nextSibling) {
		var nD=ESVG.xmlGetMaxDepth(p,d+1);
		if (nD>max) max=nD;
	}
	return(max);
}

ESVG.xmlGetDepth=function(root,node) {
	if (root==node) return(0);
	for (var p=root.firstChild;p!=null;p=p.nextSibling) {
		var d=ESVG.xmlGetDepth(p,node);
		if (d>-1) return(d+1);
	}
	return(-1); // node not found;
}

ESVG.xmlGetChildByNodeName=function(root,name) {
//ZLM.cerr("Starting at: "+root.nodeName);
	var min=null;
	var bestNode=null;
	for (var p=root.firstChild;p!=null;p=p.nextSibling) if (p.nodeName==name) return(p);
	for (var p=root.firstChild;p!=null;p=p.nextSibling) {
		var node=ESVG.xmlGetChildByNodeName(p,name);
		if (node!=null) {
			var d=ESVG.xmlGetDepth(root,node);
			if (min==null || d<min) {
				var bestNode=node;
				min=d;
			}
		}
	}
	return(bestNode);	
}

ESVG.xmlDumpParseTree=function(root,d) {
	var s=""
	for (var i=0;i<d*3;i++) s+=".";
	if (root.nodeName=="_txt_") ZLM.cerr(s+"{"+root.nodeValue+"}");
	else if (root.nodeName=="_cdata_") ZLM.cerr(s+"CDATA:{"+root.nodeValue+"}");
	else if (root.nodeName=="_comment_") ZLM.cerr(s+"COMMENT:{"+root.nodeValue+"}");
	else if (root.nodeName=="_doctype_") ZLM.cerr(s+"DOCTYPE:{"+root.nodeValue+"}");
	else {
		ZLM.cerr(s+"<"+root.nodeName+">");
		for (var i=0;i<root.attributes.length;i++) {
			ZLM.cerr(s+"..@"+root.attributes[i].nodeName+"="+root.attributes[i].nodeValue);
		}
		for (var p=root.firstChild;p!=null;p=p.nextSibling) ESVG.xmlDumpParseTree(p,d+1);
	}
}

ESVG.xmlRenderSource=function(root) {
	var a=[];
	ESVG.xmlGenerateSource(a,root);
	ZLM.cerr(a.join("\n"));
}

ESVG.xmlGenerateSource=function(a,root) {
	if (root.nodeName=="_txt_") a.push(root.nodeValue);
	else if (root.nodeName=="_cdata_") a.push("<![CDATA[\n"+root.nodeValue+"\n]]>");
	else if (root.nodeName=="_comment_") a.push("<!-- "+root.nodeValue+" -->");
	else if (root.nodeName=="_doctype_") a.push("<!DOCTYPE "+root.nodeValue+">");
	else if (root.nodeName=="xml") {
		var s="";
		for (var i=0;i<root.attributes.length;i++) {
			s+=' '+root.attributes[i].nodeName+'="'+root.attributes[i].nodeValue+'"';
		}
		a.push('<?xml'+s+'?>'); 
	}
	else {
		if (root.nodeName=="_rootBody") {
			for (var p=root.firstChild;p!=null;p=p.nextSibling) ESVG.xmlGenerateSource(a,p);
		}
		else {
			var s = '<'+root.nodeName
			for (var i=0;i<root.attributes.length;i++) {
				s+=' '+root.attributes[i].nodeName+'="'+root.attributes[i].nodeValue+'"';
			}
			if (root.firstChild==null) a.push(s+' />');
			else {
				a.push(s+' >');
				for (var p=root.firstChild;p!=null;p=p.nextSibling) ESVG.xmlGenerateSource(a,p);
				a.push('</'+root.nodeName+'>');
			}
		}
	}
}

//=====

ESVG.lastPick=null;

ESVG.xmlParseStyleString=function(str) {
	if (!str) return(null);
	var s={};
	var a=str.split(";");
	for (var i=0;i<a.length;i++) {
		if (a[i].length>3) {
			var nvp=a[i].split(":");
			s[ESVG.xmlTrim(nvp[0])]=ESVG.xmlTrim(nvp[1]);
		}
	}
	return(s);
}

ESVG.xmlGoNative=function(cssStr) {
	var a = cssStr.split('-');
	for (var i=a.length-1;i>0;i--) {
		var s = a[i];
		a[i] = s.charAt(0).toUpperCase()+s.substring(1);
	}
	return(a.join(""));
}

ESVG.xmlGetStyle=function(attr, node,sObj) {
//	var v=node.getAttribute(ESVG.xmlGoNative(attr));
	var v=node.getAttribute(attr);
	if (v) return(v);
	if (sObj) var v=sObj[attr];
	return(v);
}

ESVG.reportClick=function(who,event) {
	ESVG.selectObject(who);
	return(ZLM.killEvent(event));
}

ESVG.selectObject=function(who) {
//ESVG.dumpObj(who);
	if (ESVG.lastPick) ESVG.lastPick.controller.hideLayoutBox();
	ESVG.lastPick=who;
	who.controller.showLayoutBox();
}

ESVG.clearSelection=function() {
	if (ESVG.lastPick) ESVG.lastPick.controller.hideLayoutBox();
	ESVG.lastPick=null;
}

ESVG.xmlSetStyles=function(n,node,sObj) {
	n.setAlignmentBaseline(ESVG.xmlGetStyle("alignment-baseline",node,sObj));
	n.setBaselineShift(ESVG.xmlGetStyle("baseline-shift",node,sObj));
	n.setClip(ESVG.xmlGetStyle("clip",node,sObj));
	n.setClipPath(ESVG.xmlGetStyle("clip-path",node,sObj));
	n.setClipRule(ESVG.xmlGetStyle("clip-rule",node,sObj));
	n.setColor(ESVG.xmlGetStyle("color",node,sObj));
	n.setColorInterpolation(ESVG.xmlGetStyle("color-interpolation",node,sObj));
	n.setColorInterpolationFilters(ESVG.xmlGetStyle("color-interpolation-filters",node,sObj));
	n.setColorProfile(ESVG.xmlGetStyle("color-profile",node,sObj));
	n.setColorRendering(ESVG.xmlGetStyle("color-rendering",node,sObj));
	n.setCursor(ESVG.xmlGetStyle("cursor",node,sObj));
	n.setDirection(ESVG.xmlGetStyle("direction",node,sObj));
	n.setDisplay(ESVG.xmlGetStyle("display",node,sObj));
	n.setDominantBaseline(ESVG.xmlGetStyle("dominant-baseline",node,sObj));
	n.setEnableBackground(ESVG.xmlGetStyle("enableBackground",node,sObj));
	n.setFill(ESVG.xmlGetStyle("fill",node,sObj));
	n.setFillOpacity(ESVG.xmlGetStyle("fill-opacity",node,sObj));
	n.setFillRule(ESVG.xmlGetStyle("fill-rule",node,sObj));
	n.setFilter(ESVG.xmlGetStyle("filter",node,sObj));
	n.setFloodColor(ESVG.xmlGetStyle("flood-color",node,sObj));
	n.setFloodOpacity(ESVG.xmlGetStyle("flood-opacity",node,sObj));
	n.setFont(ESVG.xmlGetStyle("font",node,sObj));
	n.setFontFamily(ESVG.xmlGetStyle("font-family",node,sObj));
	n.setFontSize(ESVG.xmlGetStyle("font-size",node,sObj));	
	n.setFontSizeAdjust(ESVG.xmlGetStyle("font-size-adjust",node,sObj));	
	n.setFontStretch(ESVG.xmlGetStyle("font-stretch",node,sObj));
	n.setFontStyle(ESVG.xmlGetStyle("font-style",node,sObj));
	n.setFontVariant(ESVG.xmlGetStyle("font-variant",node,sObj));
	n.setFontWeight(ESVG.xmlGetStyle("font-weight",node,sObj));
	n.setGlyphOrientationHorizontal(ESVG.xmlGetStyle("glyph-orientation-horizontal",node,sObj));
	n.setGlyphOrientationVertical(ESVG.xmlGetStyle("glyph-orientation-vertical",node,sObj));
	n.setImageRendering(ESVG.xmlGetStyle("image-rendering",node,sObj));
	n.setKerning(ESVG.xmlGetStyle("kerning",node,sObj));
	n.setLetterSpacing(ESVG.xmlGetStyle("letter-spacing",node,sObj));
	n.setLightingColor(ESVG.xmlGetStyle("lighting-color",node,sObj));
	n.setMarker(ESVG.xmlGetStyle("marker",node,sObj));
	n.setMarkerEnd(ESVG.xmlGetStyle("marker-end",node,sObj));
	n.setMarkerStart(ESVG.xmlGetStyle("marker-start",node,sObj));
	n.setMarkerMid(ESVG.xmlGetStyle("marker-mid",node,sObj));
	n.setMask(ESVG.xmlGetStyle("mask",node,sObj));
	n.setOpacity(ESVG.xmlGetStyle("opacity",node,sObj));
	n.setOverflow(ESVG.xmlGetStyle("overflow",node,sObj));
	n.setPointerEvents(ESVG.xmlGetStyle("pointer-events",node,sObj));
	n.setShapeRendering(ESVG.xmlGetStyle("shape-rendering",node,sObj));
	n.setStopColor(ESVG.xmlGetStyle("stop-color",node,sObj));
	n.setStopOpacity(ESVG.xmlGetStyle("stop-opacity",node,sObj));
	n.setStroke(ESVG.xmlGetStyle("stroke",node,sObj));
	n.setStrokeDashArray(ESVG.xmlGetStyle("stroke-dasharray",node,sObj));
	n.setStrokeDashOffset(ESVG.xmlGetStyle("stroke-dashoffset",node,sObj));
	n.setStrokeLineCap(ESVG.xmlGetStyle("stroke-linecap",node,sObj));
	n.setStrokeLineJoin(ESVG.xmlGetStyle("stroke-linejoin",node,sObj));
	n.setStrokeMiterLimit(ESVG.xmlGetStyle("stroke-miterlimit",node,sObj));
	n.setStrokeOpacity(ESVG.xmlGetStyle("stroke-opacity",node,sObj));
	n.setStrokeWidth(ESVG.xmlGetStyle("stroke-width",node,sObj));
	n.setTextAnchor(ESVG.xmlGetStyle("text-anchor",node,sObj));
	n.setTextDecoration(ESVG.xmlGetStyle("text-decoration",node,sObj));
	n.setTextRendering(ESVG.xmlGetStyle("text-rendering",node,sObj));
	n.setUnicodeBidi(ESVG.xmlGetStyle("unicode-bidi",node,sObj));
	n.setVisibility(ESVG.xmlGetStyle("visibility",node,sObj));
	n.setWordSpacing(ESVG.xmlGetStyle("word-spacing",node,sObj));
	n.setWritingMode(ESVG.xmlGetStyle("writing-mode",node,sObj));
}

//#######################
// In Rendering classic SVG into our ESVG we might need to 
// address some transposition rules as the editor uses a slightly different 
// set of primatives:
// ESVG.USE_ROUND_RECT  if true, rect with non-zero rx or ry values become RoundRect objects
// ESVG.USE_NO_CIRCLES  if true, all circles are converted to ellipses with equal radii
//#########################

ESVG.xmlRenderNode=function(parent,node,ro) {
// parent is an SVGItem node, node is an XML data node
	var n=null;
	var tag=node.nodeName;
	var sObj=ESVG.xmlParseStyleString(node.getAttribute("style"));
	var fill=ESVG.xmlGetStyle("fill",node,sObj);
	var stroke=ESVG.xmlGetStyle("stroke",node,sObj);
	var edgeW=ESVG.xmlGetStyle("stroke-width",node,sObj);
//ZDL.log.cerr('processing <'+tag+'>');
	if (tag=="circle") {
		var cx=node.getAttribute("cx");
		var cy=node.getAttribute("cy");
		var r=node.getAttribute("r");
		n=ESVG.Circle.create(cx,cy,r,fill,stroke,edgeW);
		if (!ro) ESVG.set(n.base,"onclick","return(ESVG.reportClick(this,evt));");
	}
	else if (tag=="ellipse") {
		var cx=node.getAttribute("cx");
		var cy=node.getAttribute("cy");
		var rx=node.getAttribute("rx");
		var ry=node.getAttribute("ry");
		n=ESVG.Ellipse.create(cx,cy,rx,ry,fill,stroke,edgeW);
		if (!ro) ESVG.set(n.base,"onclick","return(ESVG.reportClick(this,evt));");
	}
	else if (tag=="path") {
		var q=node.firstChild;
		if (q && q.nodeName=="_comment_") {
			var argv=q.nodeValue.split(" ");
			if (argv[1]=="roundRect") {
				for(var i=2;i<argv.length;i++) {
					var a=argv[i].split("=");
					if (a[0]=="x") var x=parseFloat(a[1]);
					else if (a[0]=="y") var y=parseFloat(a[1]);
					else if (a[0]=="width") var w=parseFloat(a[1]);
					else if (a[0]=="height") var h=parseFloat(a[1]);
					else if (a[0]=="r") var r=parseFloat(a[1]);
				}
				n=ESVG.RoundRect.create(x,y,w,h,r,fill,stroke,edgeW);
				if (!ro) ESVG.set(n.base,"onclick","return(ESVG.reportClick(this,evt));");			
			}
		}
		else {
			var d=node.getAttribute("d");
			n=ESVG.Shape.create(d,fill,stroke,edgeW);
			if (!ro) ESVG.set(n.base,"onclick","return(ESVG.reportClick(this,evt));");
		}
	}
	else if (tag=="polyline") {
		var pts=node.getAttribute("points");
		var n=ESVG.Polyline.create(pts,fill,stroke,edgeW);
		if (!ro) ESVG.set(n.base,"onclick","return(ESVG.reportClick(this,evt));");
//		var pts=node.getAttribute("points");
//		n=ESVG.Curve.create(pts,fill,stroke,edgeW);
//		if (!ro) ESVG.set(n.base,"onclick","return(ESVG.reportClick(this,evt));");
	}
	else if (tag=="line") {
		var x1=node.getAttribute("x1");
		var y1=node.getAttribute("y1");
		var x2=node.getAttribute("x2");
		var y2=node.getAttribute("y2");
		n=ESVG.Line.create(x1,y1,x2,y2,stroke,edgeW);
		if (!ro) ESVG.set(n.base,"onclick","return(ESVG.reportClick(this,evt));");
	}
	else if (tag=="linearGradient") {
		var id = node.getAttribute("id");
		var x1=parseFloat(node.getAttribute("x1"));
		var y1=parseFloat(node.getAttribute("y1"));
		var x2=parseFloat(node.getAttribute("x2"));
		var y2=parseFloat(node.getAttribute("y2"));
		n = ESVG.LinearGradient.create(id);
		n.setLine(x1,y1,x2,y2);
		// set color stops
		for (var p=node.firstChild;p!=null;p=p.nextSibling) {
			ESVG.xmlRenderNode(n,p,true);
		}
	}
	else if (tag=="stop") {
		var ofs = node.getAttribute("offset");
		n = ESVG.Stop.create();
		n.setOffset(ofs);
	}
	else if (tag=="rect") {
		var x=node.getAttribute("x");
		var y=node.getAttribute("y");
		var w=node.getAttribute("width");
		var h=node.getAttribute("height");
		n=ESVG.Rect.create(x,y,w,h,fill,stroke,edgeW);
		var rx = node.getAttribute("rx");
		if (rx) n.setRx(rx);
		var ry = node.getAttribute("ry");
		if (ry) n.setRy(ry);
		if (!ro) ESVG.set(n.base,"onclick","return(ESVG.reportClick(this,evt));");
	}
	else if (tag=="text") {
		var x=node.getAttribute("x");
		var y=node.getAttribute("y");
		var tNode=node.getChildrenByName("_txt_");
		txt="";
		for (var i=0;i<tNode.length;i++){
			if (txt.length>0) txt+=" ";
			txt+=tNode[i].nodeValue;
		}
		var font=ESVG.xmlGetStyle("font-family",node,sObj);
		var size=ESVG.xmlGetStyle("font-size",node,sObj);		
		var weight=ESVG.xmlGetStyle("font-weight",node,sObj);
		var anchor=ESVG.xmlGetStyle("text-anchor",node,sObj);
		n=ESVG.Label.create(x,y,txt);
		n.setFill(fill);
		n.setFontFamily(font);
		n.setFontSize(size);
		n.setStroke(stroke);
		n.setFontWeight(weight);
		n.setTextAnchor(anchor);
		if (!ro) ESVG.set(n.base,"onclick","return(ESVG.reportClick(this,evt));");
	}
	else if (tag=="g") {
		if (node.firstChild) {
			n=ESVG.Group.create();
			for (var p=node.firstChild;p!=null;p=p.nextSibling) {
				ESVG.xmlRenderNode(n,p,ro);
			}
		}
		else {
			if (ESVG.showWarnings) ZLM.cerr("ESVG WARNING: Skipped generation of empty group");
		}
	}
	else if (tag=="defs") {
		// <defs> don't get their own section, we merge them all together
		if (ESVG.canvas.canvas.defs) {
			var defSec = ESVG.canvas.canvas.defs;
			for (var p=node.firstChild;p!=null;p=p.nextSibling) {
				ESVG.xmlRenderNode(defSec,p,true);
			}
		}
		else {
			alert("ESVG ERROR: No Canvas Definition section available");
		}
	}
	else if (tag=="svg") {
		var x=node.getAttribute("x");
		var y=node.getAttribute("y");
		var w=node.getAttribute("width");
		var h=node.getAttribute("height");
		var vb=node.getAttribute("viewBox");
		var par=node.getAttribute("preserveAspectRatio");	
		n=ESVG.VectorImage.create(x,y,w,h,node);
		n.setViewBox(vb);
		n.setAspectRatio(par);
		for (var p=node.firstChild;p!=null;p=p.nextSibling) {
			ESVG.xmlRenderNode(n,p,true);
		}
	}
	else {
		ZLM.cerr('Unsure how to process nodes of ilk '+tag);
	}
	if (n) {
		var xform=node.getAttribute("transform");
		if (xform) n.setTransform(xform);
		ESVG.xmlSetStyles(n,node,sObj);
		parent.appendChild(n);
	}
}

ESVG.xmlRenderTree=function(tree, active) {
	var root=tree.getChildrenByName("svg")[0];
	if (root) {
		ESVG.canvasDiv = null;
		if (ESVG.canvas==null) {
			var width=root.getAttribute("width");
			var height=root.getAttribute("height");
			var vb=root.getAttribute("viewBox");
			ESVG.canvasDiv = ESVG.createCanvas(width,height,vb);
			ESVG.canvasDiv.style.postion="absolute";
			ESVG.canvasDiv.style.background="#eeeeee";
			ZLM.setLocalAttribute(ESVG.canvasDiv,"onmousedown","ESVG.clearSelection();");
			ESVG.canvas=ESVG.canvasDiv.canvas;
		}
		for (p=root.firstChild;p!=null;p=p.nextSibling) ESVG.xmlRenderNode(ESVG.canvas,p);
	}
	if (ESVG.canvasDiv && active) document.body.appendChild(ESVG.canvasDiv);
//var n=ESVG.Curve.interactiveCreate(cvs,"none","red",2);
//ESVG.set(n.base,"onclick","return(reportClick(this,evt));");
}

ESVG.xmlConvertToESVG = function(tree) {
	var d = {}
	var root=tree.getChildrenByName("svg")[0];
	if (root) {
		var w=root.getAttribute("width");
		var h=root.getAttribute("height");
		var vb=root.getAttribute("viewBox");
		d.canvas = ESVG.SVGRoot.create(w,h,vb);	
		var defs = ESVG.Defs.create();
		d.defs=defs;
		d.canvas.appendChild(defs);
		d.canvas.defs=defs;
		ESVG.canvas = d;
		for (p=root.firstChild;p!=null;p=p.nextSibling) ESVG.xmlRenderNode(d.canvas,p);
//ZLM.cerr(d.canvas.projectSVG());
	}
	return(d);
}

ESVG.xmlRenderAfterParse = true;
ESVG.xmlParsingCompleteCB = null;

ESVG.xmlLoadResponse = function(rsp) {
	var tree =null;
	if (tree==null) tree=ESVG.xmlParse(rsp);
	if (ESVG.xmlRenderAfterParse) ESVG.xmlRenderTree(tree);
	if (ESVG.xmlParsingCompleteCB) ESVG.xmlParsingCompleteCB(tree);
}

ESVG.xmlHTTPError = function(s,t,r) {
	if (r.responseText!=null) { //local testing, file should be in r.reponseText
		ESVG.xmlLoadResponse(r.responseText);
	}
	else alert("Unable to load SVG test data "); 
}

ESVG.xmlLoadFile = function(filename) {
	ZLM.httpSyncGetText(filename,ESVG.xmlLoadResponse,ESVG.xmlHTTPError);
}

ESVG.xmlParseRoot = null;

//=========================================================================
// JSON support utilities
//=========================================================================
ESVG.jsonRenderNode=function(root,parent,node,ro) {
	var n = null;
	switch (node.oC) {
	case "Circle":
		n = ESVG.Circle.restoreObject(node);
		if (!ro) ESVG.set(n.base,"onclick","return(ESVG.reportClick(this,evt));");
		break;
	case "Ellispe":
		n = ESVG.Ellipse.restoreObject(node);
		if (!ro) ESVG.set(n.base,"onclick","return(ESVG.reportClick(this,evt));");
		break;
	case "RoundRect":
		n = ESVG.RoundRect.restoreObject(node);
		if (!ro) ESVG.set(n.base,"onclick","return(ESVG.reportClick(this,evt));");
		break;
	case "Shape":
		n = ESVG.Shape.restoreObject(node);
		if (!ro) ESVG.set(n.base,"onclick","return(ESVG.reportClick(this,evt));");
		break;
	case "Polyline":
		n = ESVG.Polyline.restoreObject(node);
		if (!ro) ESVG.set(n.base,"onclick","return(ESVG.reportClick(this,evt));");
		break;
	case "Curve":
		n = ESVG.Curve.restoreObject(node);
		if (!ro) ESVG.set(n.base,"onclick","return(ESVG.reportClick(this,evt));");
		break;
	case "Line":
		n = ESVG.Line.restoreObject(node);
		if (!ro) ESVG.set(n.base,"onclick","return(ESVG.reportClick(this,evt));");
		break;
	case "Rect":
		n = ESVG.Rect.restoreObject(node);
		if (!ro) ESVG.set(n.base,"onclick","return(ESVG.reportClick(this,evt));");
		break;
	case "Label":
		n = ESVG.Label.restoreObject(node);
		if (!ro) ESVG.set(n.base,"onclick","return(ESVG.reportClick(this,evt));");
		break;
	case "Stop":
		n = ESVG.Stop.restoreObject(node);
		break;
	case "LinearGradient":
		n = ESVG.LinearGradient.restoreObject(node);
		for (var i=0;i<node.oK.length;i++) {
			ESVG.jsonRenderNode(root,n,node.oK[i],true);
		}
		break;
	case "Group":
		n = ESVG.Group.restoreObject(node);
		for (var i=0;i<node.oK.length;i++) {
			ESVG.jsonRenderNode(root,n,node.oK[i],ro);
		}
		break;
	case "defs":
		var defSec = root.defs;
		for (var i=0;i<node.oK.length;i++) {
			ESVG.jsonRenderNode(root,defSec,node.oK[i],true);
		}
		break;
	case "VectorImage":
		n = ESVG.VectorImage.restoreObject(node);
		for (var i=0;i<node.oK.length;i++) {
			ESVG.jsonRenderNode(root,n,node.oK[i],true);
		}
		break;
	}
	if (n) parent.appendChild(n);	
}

ESVG.jsonRenderTree=function(jsonStr,active) {
	var p = ESVG.jsonParseValue(jsonStr);
	var root = p.obj;
	var cvsObj = null;
	if (root) {
		var width=root.cW;
		var height=root.cH;
		var vb=root.cVB;
		cvsObj = ESVG.createBaseCanvas(width,height,vb);
		ZLM.setLocalAttribute(cvsObj.body,"onmousedown","ESVG.clearSelection();");
		for (var i=0;i<root.oK.length;i++) ESVG.jsonRenderNode(cvsObj.canvas,cvsObj.canvas,root.oK[i],false);
	}
	if (active) {
		var d=ZLM.simulateTag("div style='position:absolute; margin:0; padding:0;'");
		d.canvas = cvsObj.canvas;
		d.body = cvsObj.body;
		d.defs = cvsObj.canvas.defs;
		d.appendChild(d.canvas.base);
		document.body.appendChild(d);
		ESVG.canvasDiv = d;
		ESVG.canvas = cvsObj.canvas
	}
	return(cvsObj);
}

ESVG.jsonIsWhiteSpace=function(c) {
	if (c==' ') return(true);
	if (c=='\n') return(true);
	if (c=='\r') return(true);
	if (c=='\t') return(true);
	return(false);
}

ESVG.jsonSkipWhitespace=function(s) {
//ZLM.cerr(s+'('+s.length+')');
	var i=0;
	var l=s.length;
	while(i<l && ESVG.jsonIsWhiteSpace(s.charAt(i))) i++;
	if (i>0) s=s.substring(i);
//ZLM.cerr(i+':'+s+'('+s.length+')');
	return(s);
}

ESVG.jsonTypeOf=function(obj) {
	var t = typeof(obj);
	if (t!="object") return(t);
	if (obj==null) return("null");
	if (!obj.length) return(t);
	if (obj.toUpperCase) return("string");
	return("array");
}

ESVG.jsonQuoteString=function(obj) {
	var s = obj.split('"');
	s = s.join('\\"');
	s = s.split("'");
	s = s.join("\\'");
	return(s);
}

ESVG.jsonUnquoteString=function(obj) {
	var s = obj.split("\\'");
	s = s.join("'");
	s = s.split('\\"');
	s = s.join('"');
	return(s);
}

ESVG.jsonEncode=function(obj) {
	var t = ESVG.jsonTypeOf(obj);
	var s = [];
	switch(t) {
		case 'object':
			s.push('\n{');
			var clean=true;
			for (p in obj) {
				clean=false;
				s.push(p+':');
				s.push(ESVG.jsonEncode(obj[p]));
				s.push(',');
			}
			if (!clean) s.pop();
			s.push('}');
			break;
		case 'array':
			s.push('[');
			var l = obj.length;
			for (var i=0;i<l;i++) {
				s.push(ESVG.jsonEncode(obj[i]));
				s.push(',');
			}
			if (l>0) s.pop();
			s.push(']');
			break;
		case 'string':
			s.push('"');
			s.push(ESVG.jsonQuoteString(obj));
			s.push('"');
			break;
		default:
			s.push(""+obj);
	}
	return(s.join(""));
}

// A JSON value is one of String, Array, Object, Number, true, false, null, 'undefined'  
ESVG.jsonParseValue=function(s) {
	var s = ESVG.jsonSkipWhitespace(s);
	var v = null;
//ZLM.cerr(s);
	
	var c = s.charAt(0);
	if (c=='{') { // Object
//ZLM.cerr('OBJECT');
		var o = ESVG.jsonParseObject(s);
		v = o.obj;
		s = o.s;
	}
	else if (c=='[') { // Array
//ZLM.cerr('ARRAY');
		var o = ESVG.jsonParseArray(s);
		v = o.obj;
		s = o.s;
	}
	else if (c=="'" || c=='"') { // String
//ZLM.cerr('String');
		var o = ESVG.jsonParseString(s);
		v = o.obj;
		s = o.s;
	}
	else { // true, false, null, or number
//ZLM.cerr('Other');
		if (s.indexOf("true")==0) {
			v = true;
			s = s.substring(4);
		}
		else if (s.indexOf("false")==0) {
			v = false;
			s = s.substring(5);
		}
		else if (s.indexOf("null")==0) {
			v = null;
			s = s.substring(4);
		}
		else { // number?
			var i = s.indexOf(',');
			var j = s.indexOf('}');
			if (j>=0 && (j<i || i<0)) i=j;
			v = parseFloat(s.substring(0,i));
			s = s.substring(i);			
		}
	}
	return({obj:v,s:s});
}

ESVG.jsonParseString=function(s) {
//ZDL.log.cerr("Parsing as string: "+s);
	var quote = s.charAt(0);
	s = s.substring(1);
	var done=false;
	var v = "";
	while (!done && s.length>0) {
		var i = s.indexOf(quote);
		if (i==0 || s.charAt(i-1)!='\\') done=true;
		else {
			v += s.substring(0,i+1);
			s = s.substring(i+1);	
		}
	}
	v += s.substring(0,i);
	v = ESVG.jsonUnquoteString(v);
	s = s.substring(i+1);	
//alert("returning: "+v);
	return({obj:v,s:s});
}

ESVG.jsonParseObject=function(s) {
//ZDL.log.cerr("Parsing as object: "+s);
	s = s.substring(1); // ditch leading '{'
	var done = false;
	var o = {};
	while (!done) {
		var endBrace = s.indexOf('}');
		var pivot = s.indexOf(':');
		if (pivot>0 && pivot<endBrace) {
			var attr = s.substring(0,pivot);
			var value = null;
			s = s.substring(pivot+1);
			var v = ESVG.jsonParseValue(s);
			var value = v.obj;
			s = ESVG.jsonSkipWhitespace(v.s);
			if (s.charAt(0)==',') {
				s=ESVG.jsonSkipWhitespace(s.substring(1));
			}
			o[attr] = value;
		}
		else {
			done = true;
			s=ESVG.jsonSkipWhitespace(s);
			if (s.charAt(0)=='}') {
				s=s.substring(1);
			}
		}			
	}
	return({obj:o,s:s});
}

ESVG.jsonParseArray=function(s) {
//ZDL.log.cerr("Parsing as array: "+s);
	s = s.substring(1); // ditch leading '['
	var done = false;
	var a = [];
	var v = null;
	while (!done) {
//		s = ESVG.jsonSkipWhitspace(s);
		var c = s.charAt(0);
		if (c==']') {
			done=true;
			s = ESVG.jsonSkipWhitespace(s.substring(1));
		}
		else if (c==',') {
			s = ESVG.jsonSkipWhitespace(s.substring(1)); // Ditch comma between values
		}
		else {
			var o = ESVG.jsonParseValue(s);
			a.push(o.obj);
			s = ESVG.jsonSkipWhitespace(o.s);
		}
	}
	return({obj:a,s:s});
}

//==============================================================
// SVG KEYBOARD MANAGEMENT
//==============================================================

/////////////////
// GLOBAL DATA //
/////////////////
ESVG.kdbInitialized = 0;
ESVG.quickKey = [];
ESVG.quickKeyFn = [];
ESVG.quickKeyCtx = [];
ESVG.keyContext = [];
ESVG.eventPending = false;
ESVG.lastKeyEvent = null;

/// Push a new context filter onto the keyboard service stack
ESVG.pushKeyContext=function(str) {
	ESVG.keyContext.push(str);
}

/// Remove the top context from the keyboard service stack
ESVG.popKeyContext=function() {
	ESVG.keyContext.pop()
}


ESVG.getFilteredContext=function(context) {
	var qKC = ESVG.quickKeyCtx
	var qK = ESVG.quickKey;
	var l = qKC.length
	for(var i=0;i<l;i++) {
		if (qKC[i]==context) {
			if (typeof qK[i]=="object" ) return(i);
		}
	}
	return(-1);
}

ESVG.registerShortCut=function(key,func,context) {
	ESVG.quickKey.push(key);
	ESVG.quickKeyFn.push(func);
	ESVG.quickKeyCtx.push(context);
}

ESVG.registerKeyFilter=function(keys,func,context) {
	var kA = keys.split(",");
	var kAL = kA.length;
	for (var i=0;i<kAL;i++) if (kA[i]=="comma") kA[i]=",";
	var idx = ESVG.getFilteredContext(context);
	if (idx<0) idx=ESVG.quickKey.length;
	ESVG.quickKey[idx]=kA;
	ESVG.quickKeyFn[idx]=func;
	ESVG.quickKeyCtx[idx]=context;
}

ESVG.ctrlCode = {
  8:"backspace", 9:"tab", 13:"return", 19:"pause", 27:"escape", 32:"space",
  33:"pageup", 34:"pagedown", 35:"end", 36:"home", 37:"left", 38:"up", 39:"right",
  40:"down", 44:"printscreen", 45:"insert", 46:"delete", 112:"f1", 113:"f2", 114:"f3",
  115:"f4", 116:"f5", 117:"f6", 118:"f7", 119:"f8", 120:"f9", 121:"f10", 122:"f11",
  123:"f12", 144:"numlock", 145:"scrolllock" };

ESVG.printCode = {
  48:"0", 49:"1", 50:"2", 51:"3", 52:"4", 53:"5", 54:"6", 55:"7", 56:"8", 57:"9",
  59:";", 61:"=", 65:"a", 66:"b", 67:"c", 68:"d", 69:"e", 70:"f", 71:"g", 72:"h",
  73:"i", 74:"j", 75:"k", 76:"l", 77:"m", 78:"n", 79:"o", 80:"p", 81:"q", 82:"r",
  83:"s", 84:"t", 85:"u", 86:"v", 87:"w", 88:"x", 89:"y", 90:"z", 107:"=", 109:"-",
  110:".", 188:",", 190:".", 191:"/", 192:"`", 219:"[", 220:"\\", 221:"]", 222:"'" };

ESVG.KeysAlpha="a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z";
ESVG.KeysNumericRaw="0,1,2,3,4,5,6,7,8,9";
ESVG.KeysWhiteSpace="tab,return,space";
ESVG.KeysPunctuation="`,~,!,@,#,$,%,^,&,*,(,),-,_,=,+,{,[,},],:,;,|,\\,',\",.,comma,<,>,/,?";
ESVG.KeysControlEdit="backspace,insert,delete";
ESVG.KeysControlNavigate="pageup,pagedown,end,home,left,up,right,down";
ESVG.KeysControlMisc="pause,escape,printscreen,numlock,scrolllock";
ESVG.KeysControlFunc="f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12";

ESVG.KeysNumericMath=ESVG.KeysNumericRaw+",.,+,-";
ESVG.KeysAlphaNumeric=ESVG.KeysAlpha+","+ESVG.KeysNumericRaw;
ESVG.KeysPrintable=ESVG.KeysAlphaNumeric+","+ESVG.KeysWhiteSpace+","+ESVG.KeysPunctuation;
ESVG.KeysControl=ESVG.KeysControlEdit+","+ESVG.KeysControlNavigate+","+ESVG.KeysControlMisc+","+ESVG.KeysControlFunc;
ESVG.KeysAll=ESVG.KeysPrintable+","+ESVG.KeysControl;

ESVG.KeysEditorReserve = [ "ctrl-left", "ctrl-right", "ctrl-up", "ctrl-down", "end", "home",
	"ctrl-a", "shift-right", "shift-left", "shift-down", "shift-up", "shift-home", "shift-end",
	"ctrl-shift-right", "ctrl-shift-left", "ctrl-shift-down", "ctrl-shift-up", "ctrl-shift-home", "ctrl-shift-end",
	"ctrl-x", "shift-delete", "ctrl-c", "ctrl-insert", "ctrl-v", "shift-insert", "ctrl-z", "ctrl-y",
	"ctrl-delete", "ctrl-backspace" ];

ESVG.KeysUSMappedPunctuation = {
	48:")", 49:"!", 50:"@", 51:"#", 52:"$", 53:"%", 54:"^", 55:"&", 56:"*", 57:"(", 59:":",
	61:"+", 107:"+", 109:"_", 110:">", 188:"<", 190:">", 191:"?", 192:"~", 219:"{", 220:"|", 221:"}", 222:"\"" };

// Given a key event, return the qualified name of the keystroke
ESVG.getKeystrokeName=function(e) {
	var mods = "";
	var keyName = null;
	var code = e.keyCode;
	if (code==16||code==17||code==18) return(null); // handle modifiers separately
	keyName=ZLM.ctrlCode[code];
	if (!keyName) keyName=ESVG.printCode[code];
	if (keyName) {
		if (e.altKey) mods += "alt-";
		if (e.ctrlKey) mods += "ctrl-";
		if (e.shiftKey) mods += "shift-";
	}
	else {
		return(null);
	}
	if (mods=="shift-") {
		var aliasKey=ESVG.KeysUSMappedPunctuation[code];
		if (aliasKey) return(aliasKey);
	}
	return(mods+keyName);
}

// Given the full name of a keystroke, return the base (un-modified) key name
ESVG.trimKeyName=function(fullName) {
	if (fullName==null) return(null);
	var idx=fullName.lastIndexOf("-")+1;
	if (idx>=fullName.length) return("-");
	return(fullName.substring(idx));
}

ESVG.passKeystroke=function(flag,event) {
	if (flag) {
		return(true);
	}
	else {
		return(ZLM.killEvent(event));
	}
}

ESVG.serviceKeyboard=function(evt) {
	var e = evt;
	var charCode = 0;
	if (evt.charCode) charCode = evt.charCode;
	else charCode = evt.keyCode;

	if (e.type=='keydown') {
		if (charCode>=16 && charCode<=17) return; // throw away shift ctrl and alt stand-alone events
	}
	var fullCode=ESVG.getKeystrokeName(e);
	if (fullCode==null) return;
	if (ESVG.lastKeyEvent!=null && e.type=='keypress') {
		if (fullCode == ESVG.lastKeyEvent) {
			ESVG.lastKeyEvent=null;
			return; // already handled
		}
	}
	ESVG.lastKeyEvent = fullCode;
	var keyName=ESVG.trimKeyName(fullCode);
	for (var j=ESVG.keyContext.length-1;j>=0;j--) {
		for (var i=0;i<ESVG.quickKey.length;i++) {
			if (ESVG.quickKeyCtx[i]==ESVG.keyContext[j]) {
				if (typeof ESVG.quickKey[i]=="object" ){
					var keys = ESVG.quickKey[i];
					for (var l=0;l<keys.length && keys[l]!=keyName;l++);
					if (l<keys.length) {
						if (eval(ESVG.quickKeyFn[i])==true) {
							return(ESVG.passKeystroke(false,e));
						}
					}
				}
				else if (fullCode==ESVG.quickKey[i]) {
					ESVG.eventPending=false;
					eval(ESVG.quickKeyFn[i]);
					return(ESVG.passKeystroke(false,e));
				}
			}
		}
	}
	ESVG.eventPending=true;
	return(ESVG.passKeystroke(true,e));
}

ESVG.initKeyboardHandler=function() {
	if (ESVG.kbdInitialized==1) return;
	document.documentElement.addEventListener("keypress",ESVG.serviceKeyboard,false);
	document.documentElement.addEventListener("keydown",ESVG.serviceKeyboard,false);
//document.documentElement.addEventListener("click",stopTyping,false);
	ESVG.kbdInitialized=1;
}

ESVG.makeXMLSafe=function(str) {
	var bA = str.split('&');
	var s = bA.join('&amp;');
	var bA = s.split('<');
	var s = bA.join('&lt;');
	return(s);
}

//=====================================================================================
// INLINE EDITOR - Edits a single span of text.  Within the span it is safe to assume 
// that the styles are uniform.  The editor is not expected to be used by itself, but
// rather as part of a more generalized text editor with multiple line support, where 
// each line of the larger editor is encoded as one (or more) instances of inline edits
// and the various exit codes generated from the individual editors are used to navigate
// bewteen larger passages of the text.
//=====================================================================================

ESVG.InlineEdit=function(node) {
	this.registerInstance(node,"InlineEdit");
	this.buffer=[]; // edit body, stored as 1 char/cell
	this.xIdx=[]; // width of each char in body
	this.charWidth={}; // Table of character widths;
	this.codeMode = false;
	this.fakingIt = true;
	this.selectionStart=-1;
	this.selectionEnd=-1;
	this.cursorIdx=0;
	this.onchange=null;
	this.onexit=null;
	this.createBody();
	this.active = false;

	this.font = "sans-serif";
	this.size = 12;
	this.tStyle = "";
	this.color = "#000000";
	this.opacity = 1;
	this.applyStyles();

	this.createKeyTrap();
	ESVG.set(this.base,"onclick","ESVG.dumpObj(evt);");
	return(this);
}

ESVG.InlineEdit.create=function() {
	var node=ESVG.create("g");
	return(new ESVG.InlineEdit(node));
}

ESVG.InlineEdit.prototype=new ESVG.SVGItem();

ESVG.InlineEdit.prototype.render=function(mode,ctx) {
}

ESVG.InlineEdit.prototype.setPos=function(x,y) {
	this.x = x;
	this.y = y;
	ESVG.set(this.base,"transform","translate("+x+","+y+")");
}

ESVG.InlineEdit.prototype.setTextStyle=function(styleObj) {
	this.font = styleObj.f;
	this.size = styleObj.z;
	this.tStyle = styleObj.s;
	this.color = styleObj.c;
	this.opacity = styleObj.o;
	this.height = this.size;
	this.applyStyles();
	this.initBuffer(this.buffer.join(""));
}

ESVG.InlineEdit.prototype.getQuotedBuffer=function() {
	var s="";
	var b = this.buffer;
	var l=b.length;
	for (var i=0;i<l;i++) {
		var c = b[i];
		if (c=='"') c='\\\"';
		else if (c=='\\') c='\\\\';
		s+=c;
	}
	return(s);
}

ESVG.InlineEdit.prototype.getStyleObject=function() {
	var s={};
	s.f = this.font;
	s.z = this.size;
	s.s = this.tStyle;
	s.c = this.color;
	s.o = this.opacity;
	return(s);
}

ESVG.InlineEdit.prototype.getValueObject=function() {
	var o={};
	o.style=this.getStyleObject();
	o.body=this.getQuotedBuffer();
	o.link="";
	return(o);
}
	
ESVG.InlineEdit.prototype.applyStyles=function() {
	var s = ESVG.set;
	var t=this.textGroup;
	for (var i=2;i>0;i--) {
		if (i==1) t=this.caliper;
		s(t,"font-family",this.font);
		s(t,"font-size",this.size);
		if (this.tStyle.indexOf("O")>=0) { // outline font
			s(t,"stroke",this.color);
			s(t,"stroke-width",this.size/20);
			s(t,"stroke-opacity",this.opactity);
			s(t,"fill","none");
		}
		else {
			s(t,"stroke","none");
			s(t,"stroke-width",0);
			s(t,"fill",this.color);
			s(t,"fill-opacity",this.opacity);
		}
		if (this.tStyle.indexOf("L")>=0) s(t,"text-decoration","line-through");
		else if (this.tStyle.indexOf("U")>=0) s(t,"text-decoration","underline");
		else s(t,"text-decoration","none");
		if (this.tStyle.indexOf("B")>=0) s(t,"font-weight","bold");
		else s(t,"font-weight","normal");
		if (this.tStyle.indexOf("I")>=0) s(t,"font-style","italic");
		else s(t,"font-style","normal");
		if (this.tStyle.indexOf("W")>=0) s(t,"font-stretch","expanded");
		else if (this.tStyle.indexOf("C")>=0) s(t,"font-stretch","condensed");
		else s(t,"font-stretch","normal");
		if (this.tStyle.indexOf("S")>=0) s(t,"font-variant","small-caps");
		else s(t,"font-variant","normal");
	}
}

ESVG.InlineEdit.prototype.createBody=function() {
	// The editor projects as a three layered group.  The base is the <g> tag that holds the
	// whole mess (with the idea that a multi-line editor would be another <g> with one or 
	// more of US, setting the transform attribute to organize the placement of lines).  
	// The first child of the group is a background rectangle used for highlighting selected
	// pasages of the line.  In front of this is a <text> element to hold the line itself. We 
	// add at least one <tspan> to this tag to hold the actual buffer.  Any style changes within 
	// the line will result in additional <tspan> tags being projected.
	// Finally a cursor is added to show where we are for active editing purposes.

	var n = ESVG.create("rect");
	ESVG.set(n,"x",0);
	ESVG.set(n,"y",0);
	ESVG.set(n,"w",0);
	ESVG.set(n,"h",0);
	this.base.appendChild(n);
	this.hiLite = n;	
	var n = ESVG.create("text");
	this.base.appendChild(n);
	this.textGroup = n;
	this.textNode=document.createTextNode("");
	n.appendChild(this.textNode);
	this.makeCursor();

	var t = ESVG.create("text");
	var n =document.createTextNode("||");
	t.appendChild(n);
	this.caliper = t;
};

ESVG.InlineEdit.prototype.createKeyTrap=function() {
	var filter=ESVG.KeysControlEdit+','+ESVG.KeysControlNavigate+','+ESVG.KeysPrintable+',escape';
	ESVG.registerKeyFilter(filter,this.objHook+"serviceKeyboard(fullCode,evt);","InlineEdit"+this.instanceId);
};

ESVG.InlineEdit.prototype.makeLine=function(x1,y1,x2,y2,className) {
	var l = ESVG.create("line");
	ESVG.set(l,"x1",x1);
	ESVG.set(l,"y1",y1);
	ESVG.set(l,"x2",x2);
	ESVG.set(l,"y2",y2);
	ESVG.set(l,"class",className);
	return(l);	
}

ESVG.InlineEdit.prototype.makeCursor=function() {
	var g = ESVG.create("g");
	g.appendChild(this.makeLine(0,0,2,0,"cursorLine"));
	g.appendChild(this.makeLine(0,20,2,20,"cursorLine"));
	g.appendChild(this.makeLine(1,0,1,20,"cursorLine"));
	this.cursor = g;
	ESVG.set(g,"stroke","#00ffff");
	this.base.appendChild(g);
	ESVG.set(g,"display","none");
};

ESVG.InlineEdit.prototype.setOnChangeHandler=function(cb) {
	this.onchange = cb;
};

ESVG.InlineEdit.prototype.setOnExitHandler=function(cb) {
	this.onexit = cb;
};

ESVG.InlineEdit.prototype.setCursorIndex=function(col) {
	var l=this.xIdx.length;
	if (col<0) col=0;
	if (col>l) col=l;
	this.cursorIdx = col;
};

ESVG.InlineEdit.prototype.invokeOnChangeHandler=function() {
	if (this.onchange) eval(this.onchange);
};

ESVG.InlineEdit.prototype.invokeOnExitHandler=function(reason) {
	if (this.onexit) eval(this.onexit);
};

ESVG.InlineEdit.prototype.edit=function(colX) {
	this.active=true;
	ESVG.set(this.cursor,"display","block");
	ESVG.pushKeyContext("InlineEdit"+this.instanceId);
	this.updateAvatar();
	if (colX==undefined) return;
	this.cursorIdx=this.bindCursorLocation(colX);
	this.updateCursor();
};

ESVG.InlineEdit.prototype.bindCursorLocation=function(cx) {
	var x = this.xIdx;
	var l = x.length;
	var w = 0;
	for (var i=0;i<l;i++) {
		w+=x[i];
//ZDL.log.cerr(i+':'+w+'('+cx+')');
		if (cx<w) return(i);
	}
//ZDL.log.cerr('bind overflow Set to '+l);
	return(l);
};

ESVG.InlineEdit.prototype.clearWidthTable=function() {
	this.spaceWidth=null;
	for (var p in this.charWidth) this.charWidth[p]=null;
};

ESVG.InlineEdit.prototype.getCharSize=function(ch) {
	if (!this.caliper) {
		var t = ESVG.create("text");
		var n =document.createTextNode("||");
		t.appendChild(n);
		this.caliper = t;
	}
	var t=this.caliper;
	t.firstChild.nodeValue = "||";
	ESVG.canvas.base.appendChild(t);
	var b = t.getBBox();
	var nW = b.width;
	t.firstChild.nodeValue = "|"+ch+"|";
	var b = t.getBBox();
	var spW = b.width-nW;
	if (b.height>this.height) this.height=b.height;
	ESVG.canvas.base.removeChild(t);	
	return(spW);
}

ESVG.InlineEdit.prototype.getBounds=function() {
	return(this.base.getBBox());
}

ESVG.InlineEdit.prototype.getStringWidth=function() {
	var x = this.xIdx;
	var w = 0;
	for (var i=x.length-1;i>=0;i--) w+=x[i];
	this.width=w;
	return(w);
}

ESVG.InlineEdit.prototype.sizeSpaceChar=function() {
	if (this.spaceWidth) return(this.spaceWidth);
	var spW = this.getCharSize(' ');	
	this.charWidth["space"]=spW;
	this.spaceWidth=spW;
};

ESVG.InlineEdit.prototype.sizeChar=function(ch) {
	if (ch=='space' || ch==' ') this.sizeSpaceChar();
	else {
		this.charWidth[ch]= this.getCharSize(ch);
	}
};

ESVG.InlineEdit.prototype.initBuffer=function(s) {
	this.clearWidthTable();
	this.buffer=[];
	this.xIdx=[];
	if (!this.spaceWidth) this.sizeSpaceChar();

	var w=this.charWidth;
	var sl = s.length;
	var j = 0;
	var quotePending = false;
	for (var i=0;i<sl;i++) {
		var c=s.charAt(i);
		if (c=='\\' && !quotePending) {
			quotePending=true;
		}
		else { 
			this.buffer[j]=c;
			if (c==' ') this.xIdx[j]=this.spaceWidth;
			else {
				if (!w[c]) this.sizeChar(c);
				this.xIdx[j]=w[c];
			}
			j++;
			quotePending=false;
		}
	}
	this.updateAvatar();
};

ESVG.InlineEdit.prototype.updateCursor=function() {
	if (this.fakingIt || (this.textGroup && !this.textHeight)) {
		this.fakingIt = false;
		var b = this.textGroup.getBBox();
		if (b.height<this.size || b.height>2*this.size) {
			this.textHeight = this.size;
			this.curseY= -15*this.textHeight/17;
			this.fakingIt=true;
		}
		else {
			this.textHeight=b.height;
			this.curseY=b.y;
		}
	}
	var o= -1;
	for (var i=this.cursorIdx;i>0;i--) o+=this.xIdx[i-1];
//if (!o) alert(this.cursorIdx+"->"+this.xIdx);
//if (o==NaN) ZDL.log.dumpObj(this.xIdx);
	var s=this.textHeight/20;
//ZDL.log.cerr("size: "+s);
	if (isNaN(o)) return;
	ESVG.set(this.cursor,"transform","scale(1,"+s+") translate("+o+","+this.curseY+")");
	this.curseX = o;
};

ESVG.InlineEdit.prototype.updateAvatar=function() {
	this.value=this.buffer.join('');
	this.textNode.nodeValue=ESVG.makeXMLSafe(this.value);
	if (this.active) {
		this.updateCursor();
		this.invokeOnChangeHandler();
	}
};

ESVG.InlineEdit.prototype.breakAtPoint=function(pt) {
	var o={};
	var spIdx= -1;
	var x=0;
	var i=0;
	var b=this.buffer;
	var w=this.xIdx;
	var wL = w.length;
// Skip any initial whitespace as breaking there doesn't seem right at the moment
	while (i<wL && b[i]==' ') i++;
	while (i<wL && x<pt) {
		if (b[i]==' ') spIdx=i;
		x+=w[i];
		i++;
	}
	while (i<wL && spIdx<1) { // No joy splitting at previous whitespace, try looking ahead
		if (b[i]==' ') spIdx=i;
		else {
			x+=w[i];
		}
		i++;
	}

	if (spIdx<1 || spIdx==wL-1) {
//ZDL.log.cerr("Unbreakable text, need to reformat container");
		return(null);
	}
	var str = ""
	for (var j=spIdx+1;j<wL;j++) str+=b[j];
	for (var j=wL-1;j>spIdx;j--) {
		b.pop();
		w.pop();
	}
	this.value = b.join("");
	this.textNode.nodeValue=ESVG.makeXMLSafe(this.value);
	var newW = 0;
	if (this.active && this.cursorIdx>spIdx) {
		o.cursorIdx=this.cursorIdx-spIdx-1;
		this.exit("REFORMAT");
	}
	else o.cursorIdx = -1;
	for (var j=spIdx;j>=0;j--) newW+=w[j];
	o.newW = newW;
	o.remainder = str;
	o.style = this.getStyleObject();
//ZDL.log.cerr("break at index "+spIdx+" spilling: "+str);
	return(o);
};

// Split the buffer after the given column
ESVG.InlineEdit.prototype.breakAtColumn=function(pt) {
	var o={};
	var b=this.buffer;
	var w=this.xIdx;
	var wL = w.length;

	var str = ""
	for (var j=pt;j<wL;j++) str+=b[j];
	for (var j=wL-1;j>=pt;j--) {
		b.pop();
		w.pop();
	}

	this.value = b.join("");
	this.textNode.nodeValue=ESVG.makeXMLSafe(this.value);
	if (this.active && this.cursorIdx>pt) {
		o.cursorIdx=this.cursorIdx-pt;
		this.exit("REFORMAT");
	}
	else o.cursorIdx = -1;
	o.remainder = str;
	o.style = this.getStyleObject();
	return(o);
};

ESVG.InlineEdit.prototype.exit=function(reason) {
	this.active=false;
	ESVG.set(this.cursor,"display","none");
	ESVG.popKeyContext("InlineEdit"+this.instanceId);
	this.invokeOnExitHandler(reason);
	return(true);
}

ESVG.InlineEdit.prototype.serviceKeyboard=function(key,event) {
	var ctrlKey=true;
	if (key=='tab') {
		return(this.exit('TAB'));
	}
	if (key=='return') {
		return(this.exit('RETURN'));
	}
	if (key=='escape') {
		return(this.exit('ESCAPE'));
	}
	if (ESVG.KeysPrintable.indexOf(key)>=0) ctrlKey=false;
	if (key.indexOf("-space")>=0) {
		ctrlKey=false;
		key='space';
	}
	if (key.indexOf("shift-")==0) {
		var baseKey=key.substring(6);
		if (ESVG.KeysPrintable.indexOf(baseKey)>=0) {
			ctrlKey=false;
			key=baseKey.toUpperCase();
		}
	}
	if (ctrlKey) {
		switch(key) {
		case 'right':
			return(this.advanceChar());
		case 'left': 
			return(this.retreatChar());
		case 'up':
			return(this.exit('LINE_UP'));
		case 'down':
			return(this.exit('LINE_DOWN'));

		case 'ctrl-right':
			return(this.advanceWord());
		case 'ctrl-left':
			return(this.retreatWord());

		//case 'crtl-down':
		case 'end':
		case 'ctrl-end':
			return(this.advanceEOL());
		//case 'ctrl-up':
		case 'home':
		case 'ctrl-home':
			return(this.retreatSOL());

		case 'ctrl-a':
			return(this.selectAll());
		case 'shift-right':
			return(this.extendRight());
		case 'shift-left':
			return(this.extendLeft());
		case 'shift-up':
		case 'ctrl-shift-up':
		case 'shift-home':
		case 'ctrl-shift-home':
			return(this.extendSOL());
		case 'shift-down':
		case 'ctrl-shift-down':
		case 'shift-end':
		case 'ctrl-shift-end':
			return(this.extendEOL());
		case 'ctrl-shift-right':
			return(this.extendNextWord());
		case 'ctrl-shift-left':
			return(this.extendPrevWord());

		case 'ctrl-x':
			return(this.cut());
		case 'ctrl-c':
			return(this.copy());
		case 'ctrl-v':
			return(this.paste());
		case 'delete':
			return(this.deleteChar());
		case 'backspace':
			return(this.backspace());
		case 'ctrl-delete':
			return(this.deleteToNextWord());
		case 'ctrl-backspace':
			return(this.deleteToPrevWord());
		default:
			return(true);		
		}
	}
	else {
		// CHECK FOR FILTERED PRINTABLE CHARS HERE
		return(this.insertChar(key));
	}
};

// insert a character into the current span
ESVG.InlineEdit.prototype.insertChar=function(ch) {
	if (ch=='space') ch=' ';
	var v = this.buffer.join('');
	var nBuf = v.substring(0,this.cursorIdx)+ch+v.substring(this.cursorIdx);
	this.cursorIdx++;
	this.initBuffer(nBuf);
	return(true);
};

ESVG.InlineEdit.prototype.advanceChar=function() {
	this.cursorIdx++;
	if (this.cursorIdx>this.buffer.length) {
		return(this.exit('CHAR_RIGHT')); 
	}
	this.updateCursor();
	return(true);
};

ESVG.InlineEdit.prototype.retreatChar=function() {
	this.cursorIdx--;
	if (this.cursorIdx<0) {
		return(this.exit('CHAR_LEFT'));
	}
	this.updateCursor();
	return(true);
};

ESVG.InlineEdit.prototype.advanceWord=function() {
	var b=this.buffer;
	var i=this.cursorIdx;
	while (b[i]!=' ' && i<b.length) i++;
	while (b[i]==' ' && i<b.length) i++;
	if (i==b.length) return(this.exit('WORD_RIGHT'));
	this.cursorIdx=i;
	this.updateCursor();
	return(true);
};

ESVG.InlineEdit.prototype.retreatWord=function() {
	var b=this.buffer;
	var i=this.cursorIdx;
	if (i>b.length-1) i=b.length-1;
	if (i<=0) return(this.exit('WORD_LEFT'));
	if (i>0 && b[i-1]==' ') i--; 
	while (b[i]==' ' && i>=0) i--;
	while (b[i]!=' ' && i>=0) i--;
//while (b[i]!=' ' && i>=0) i--;
	if (i<0) i=0;
	if (b[i]==' ') i++;
	this.cursorIdx=i;
	this.updateCursor();
	return(true);
};


ESVG.InlineEdit.prototype.advanceEOL=function() {
	return(this.exit('END'));
};

ESVG.InlineEdit.prototype.retreatSOL=function() {
	return(this.exit('HOME'));
};

ESVG.InlineEdit.prototype.selectAll=function() {
	return(true);
};

ESVG.InlineEdit.prototype.extendRight=function() {
	return(true);
};

ESVG.InlineEdit.prototype.extendLeft=function() {
	return(true);
};

ESVG.InlineEdit.prototype.extendSOL=function() {
	return(true);
};

ESVG.InlineEdit.prototype.extendEOL=function() {
	return(true);
};

ESVG.InlineEdit.prototype.extendNextWord=function() {
	return(true);
};

ESVG.InlineEdit.prototype.extendPrevWord=function() {
	return(true);
};

ESVG.InlineEdit.prototype.cut=function() {
	return(true);
};

ESVG.InlineEdit.prototype.copy=function() {
	return(true);
};

ESVG.InlineEdit.prototype.paste=function() {
	return(true);
};

ESVG.InlineEdit.prototype.deleteChar=function() {
	var b=this.buffer;
	var x=this.xIdx;
	var l=b.length-1;
	for (var i=this.cursorIdx;i<l;i++) {
		b[i]=b[i+1];
		x[i]=x[i+1];
	}
	b.pop();
	x.pop();
	this.updateAvatar();
	return(true);
};

ESVG.InlineEdit.prototype.backspace=function() {
	if (this.cursorIdx>0) this.cursorIdx--;
	return(this.deleteChar());
};

ESVG.InlineEdit.prototype.deleteToNextWord=function() {
	return(true);
};

ESVG.InlineEdit.prototype.deleteToPrevWord=function() {
	return(true);
};

//=====================================================================================
// A text box is a group consisting of an encapsulating rectangle filled with one or more
// inline edit objects.  If the rectangle is resized, the text is reflowed into the box.
// this may result in the rectangle automagically being made taller to accommodate the 
// extentents of the text.  If the text is changed it will trigger a reflow.  On initial
// creation, the width of the box is allowed to grow automagically up until a carriage 
// return is encountered or the box loses keyboard focus.  Either event will fix the width
// of the box until it is manually resized via the mouse.

// Given a long string with embedded newlines and tab characters, break the body up 
// into segments that fill spans for easier editor scoping.
// The bridge between inline passages of text should be TAB(T),EOL(L),EOP(P), or NONE(N) with a StyleChange
// Applicable styles come in two forms: TextBox styles and Inline Styles
// TextBox styles include:
//	stroke, strokeWidth, strokeOpacity, strokeDashArray, strokeLineCap, strokeLineJoin,strokeMiterLimit,
//	fill,fillOpacity,rx
//		all above apply to the bounding rectangle
// 	The box also controls justification for its entire contents
//		textJustify (Left,Right,Center,Block)
//			reflowText enforces this by positioning inline editors and tweaking the
//			textAnchor and letterSpacing settings of the indicidual passages 
// A JSON style for the textbox might looklike:
// {sC:"#ffffff",sW:1,sO:1,sDA:"none",sLC:"butt",sLJ:"miter",sML:4,fC:"none",fO:1,r:0,j:"L",dS:{f:"Arial",z:12,s:"",c:"#00000",o:1}}
// Content styles include
//	fontFamily,fontSize,fontStretch,fontStyle,fontVariant,fontWeight,textDecoration,fill,opacity
//		the above SVG styles impact the text but need to get cleaned up for a simpler interface
//	we want:
//		textFont =>fontFamily
//		textSize =>fontSize
//		textStyle (Plain,Bold(B),Italic(I),Underline(U),Wide(W),Condensed(C),LineThrough(L),Outline(O),SmallCaps(S))
//			=> acheived through various settings
//		textColor => fill or stroke depending on style
//		textOpacity => fillOpacity or strokeOpacity depending on style
//
// As a JSON object this might look like 
// [{style:{f:"Arial",z:14,s:"BI",c:"#ffdd00",o:1},body:"HELLO WORLD!",link="P"},
//  {style:{f:"monospace",z:8,s:"",c:#777777",o:1},body:"Just a \"test\"",link="P"}];
	
ESVG.TextBox = function(node,x,y,styleObj) {
	this.registerInstance(node,"TextBox");
	this.changed = false;		// body of value needs to be extracted
	this.tabStop = 36;		// width of a tab stop in points
	this.margin = 6;
	styleObj=this.completeStyleObject(styleObj);
	this.size = styleObj.dS.z;
	this.value = null;
	this.lineData = [];
	this.ed = [];
	this.heap = [];
	this.x = x;
	this.y = y;
	this.flexWidth = true;		// Geometry not yet set
	this.w = -1;
	this.h = -1;
	this.createBody();
	this.setBoxStyles(styleObj);
	this.setPos(x,y);
	this.onexit = null;
	this.onchange = null;

	this.appendEditor(this.margin,this.margin," ",this.defaultStyle);
	return(this);
};

ESVG.TextBox.create=function(x,y,styleObj) {
	var node=ESVG.create("g");
	return(new ESVG.TextBox(node,x,y,styleObj));
};

ESVG.TextBox.prototype=new ESVG.SVGItem();

ESVG.TextBox.prototype.createBody=function() {
	var m = this.margin*2;
	this.initialW = m;
	this.initialH = this.size+m;

	var n = ESVG.Rect.create(0,0,this.initialW,this.initialH,"#000000","none",0);
	ESVG.set(n.base,"onclick",this.objHook+"serviceClick(evt);");
	this.appendChild(n);
	this.box = n;
};

ESVG.TextBox.prototype.resetActiveInternals=function() {
	var e = this.ed;
	var el = e.length;
	for (var i=e.length-1;i>=0;i--) {
		if (e[i].active) e[i].exit("RESET");
	}
}

// Activate the box for editing text content
ESVG.TextBox.prototype.edit=function() {
	this.resetActiveInternals();
	this.ed[this.ed.length-1].edit();
}

ESVG.TextBox.prototype.editAt=function(x,y) {
	this.resetActiveInternals();
	x-=(this.x+this.margin);
	y-=this.y;
	var l = this.lineData;
	if (!l || l.length==0) {
		this.ed[0].edit(x);
		return;
	}
	var idx = l.length-1;
	while (idx>0 && y<l[idx].yMin) idx--; // find the right line
	this.editPassageIn(l[idx].lowIdx,l[idx].highIdx,x);
}

ESVG.TextBox.prototype.editPassageIn=function(sIdx,eIdx,x) {
//ZDL.log.cerr(sIdx+' to '+eIdx+' at '+x);
	for (var i=sIdx;i<=eIdx;i++) {
		var e = this.ed[i];
		if (x<e.x) {
			e.edit(0);
			return;
		}
		var w=e.x+e.getStringWidth();
//ZDL.log.cerr("width: "+w);
		if (x<w) {
			e.edit(x-e.x);
			return;
		}
	}
	this.ed[eIdx].edit(x-e.x);
}

// Add any missing style attributes (including the who thing if need be) to the default
// style given at the time of object creation.
ESVG.TextBox.prototype.completeStyleObject=function(s) {
	if (!s) return({sC:"#000000",sW:1,sO:1,sDA:"none",sLC:"butt",sLJ:"miter",sML:4,fC:"none",fO:1,r:0,j:"L",dS:{f:"Arial",z:12,s:"",c:"#00000",o:1}});
	if (s.sC==undefined) s.sC="#000000";
	if (s.sW==undefined) s.sW=1;
	if (s.sO==undefined) s.sO=1;
	if (s.sDA==undefined) s.sDA="none";
	if (s.sLC==undefined) s.sLC="butt";
	if (s.sLJ==undefined) s.sLJ="miter";
	if (s.sML==undefined) s.sML=4;
	if (s.fC==undefined) s.fC="none";
	if (s.fO=undefined) s.fO=1;
	if (s.r==undefined) s.r=0;
	if (s.j==undefined) s.j="L";
	if (!s.dS) s.dS = {f:"Arial",z:12,s:"",c:"#00000",o:1};
	return(s);
}

// Copy the encoded styles of the style object into native settings
// for the widget using more recognizable names
ESVG.TextBox.prototype.setBoxStyles=function(styleObj) {
	var o = styleObj;
	this.strokeColor = o.sC;
	this.strokeWidth = o.sW;
	this.strokeOpacity = o.sO;
	this.strokeDashArray = o.sDA;
	this.strokeLineCap = o.sLC;
	this.strokeLineJoin = o.sLJ;
	this.strokeMiterLimit = o.sML;
	this.fillColor = o.fC;
	this.fillOpacity = o.fO;
	this.radius = o.r;
	this.justify = o.j;
	this.defaultStyle = o.dS;
	this.size = o.dS.z;
	this.font = o.dS.f;
	this.applyStyles();
}

ESVG.TextBox.prototype.setOnChangeHandler=function(cb) {
	this.onchange = cb;
};

ESVG.TextBox.prototype.setOnExitHandler=function(cb) {
	this.onexit = cb;
};

ESVG.TextBox.prototype.detectHit=function(mx,my) {
//ZDL.log.cerr('click at '+mx+','+my);
//ZDL.log.cerr("box at "+this.x+','+this.y+':'+this.w+'x'+this.h);
	if (my<this.y || my>this.y+this.h) return(false);
	if (mx<this.x || mx>this.x+this.w) return(false);
	return(true);
}

ESVG.TextBox.prototype.invokeOnChangeHandler=function() {
	if (this.onchange) eval(this.onchange);
};

ESVG.TextBox.prototype.invokeOnExitHandler=function(reason) {
	if (this.onexit) eval(this.onexit);
};


// Update the avatar to reflect the current style settings
ESVG.TextBox.prototype.applyStyles=function() {
	var b = this.box;
	b.setStroke(this.strokeColor);
	b.setStrokeWidth(this.strokeWidth);
	b.setStrokeOpacity(this.strokeOpacity);
	b.setStrokeDashArray(this.dashArray);
	b.setStrokeLineCap(this.strokeLineCap);
	b.setStrokeLineJoin(this.strokeLineJoin);
	b.setStrokeMiterLimit(this.strokeMiterLimit);
	if (this.fillColor=="none") {
		b.setFill("#000000");
		b.setFillOpacity(0.001);
	}
	else {
		b.setFill(this.fillColor);
		b.setFillOpacity(this.fillOpacity);
	}
	b.setRx(this.radius);
}

// Remove an editor from the active working set and push it onto
// the local heap for recycling.  Editors are created and destroyed all the
// time so we cache unused ones locally to cut down on excess allocation
// and deallocation trashing.  A cached editor will be recycled before a
// new instance is created.
ESVG.TextBox.prototype.deleteEditor=function(idx) {
	var e = this.ed;
	who=e[idx];
	this.removeChild(who);
	this.heap.push(who);
	var l=e.length;
	for (var i=idx+1;i<l;i++) e[i-1]=e[i];
	e.pop();
}

// Toast all active editors, this is most likely done when the whole
// contents of a box has been replaced.
ESVG.TextBox.prototype.clearEditorArray=function() {
	var e = this.ed;
	var l = this.ed.length-1;
	for (var i=l;i>=0;i--) {
		this.deleteEditor(i);
	}
}

ESVG.TextBox.prototype.createEditor=function(x,y,txt,style) {
	var n = null;
	if (this.heap.length>0) n=this.heap.pop();
	else n = ESVG.InlineEdit.create();
	this.appendChild(n);
	n.setTextStyle(style);
	n.setPos(x,y+this.size);
	n.setOnExitHandler(this.objHook+"handleSpanExit(this,reason)");
	ESVG.set(n.base,"onclick",this.objHook+"serviceClick(evt);");
	n.initBuffer(txt);
	n.setOnChangeHandler(this.objHook+"handleTextChanged(this);");
	return(n);
}

// Append a new editor to the end of the active list of editors
// This is most likely a function of the user appending fresh text
ESVG.TextBox.prototype.appendEditor=function(x,y,txt,style) {
	this.ed.push(this.createEditor(x,y,txt,style));
}

// insert a new editor at the given index of the active list of editors
// This is most likely a function of the user appending fresh text
ESVG.TextBox.prototype.insertEditor=function(idx,x,y,txt,style) {
	var e = this.ed;
	var n = this.createEditor(x,y,txt,style);
	for (var i=e.length;i>idx;i--) e[i]=e[i-1];
	e[idx]=n;
}

// Split one value node into two, inserting the second node at the 
// appropraite place in the array.
ESVG.TextBox.prototype.splitValueNode=function(idx,pt,tailStr) {
	var v = this.value;
	var n1 = {};
	var n0 = v[idx];
	n0.body = n0.body.substring(0,pt);
	n1.style=n0.style;
	n1.body=tailStr;
	n1.link=n0.link;
	n0.link="?"
	for (var j=v.length;j>idx+1;j--) v[j]=v[j-1];
	v[j]=n1;
}

ESVG.TextBox.prototype.handleTextChanged=function(who) {
	var b = who.getBounds();
	if (this.flexWidth) { // still allowed to grow
		this.w = b.width+2*this.margin;
		this.h = this.size+2*this.margin;
		this.box.setGeometry(this.w,this.h);
	}
	else {
		if (this.testForLineOverflow(who)) this.reflowText(who);
	}
// ALSO REFLOW NEEDS TO KNOW HOW TO DEAL WITH THE ACTIVE TEXT EDITOR BEING BROKEN UP
}

ESVG.TextBox.prototype.makeSelectable=function() {
	ESVG.set(this.base,"onclick",this.objHook+"serviceClick(evt);");
}

ESVG.TextBox.prototype.selectGroup=function(evt) {
	return(ESVG.reportClick(this.box.base,evt));
}

ESVG.TextBox.prototype.serviceClick=function(evt) {
	ESVG.reportClick(this.base,evt);		
	return(ZLM.killEvent(evt));
}

ESVG.TextBox.prototype.doMoveNotify=function() {
	this.x=this.layoutBox.getHomeX();
	this.y=this.layoutBox.getHomeY();
	this.setPos(this.x,this.y);
	this.raiseMoveNotify();
}

ESVG.TextBox.prototype.doResizeNotify=function() {
	this.x=this.layoutBox.getHomeX();
	this.y=this.layoutBox.getHomeY();
	this.w=this.layoutBox.getWidth();
	this.h=this.layoutBox.getHeight();
	this.setPos(this.x,this.y);
	this.setGeometry(this.w,this.h);
	this.raiseResizeNotify();
}

ESVG.TextBox.prototype.setGeometry=function(w,h,skipReflow) {
//ZDL.log.dumpObj(this.box);
	this.w = w;
	this.h = h;
	this.flexWidth = false;
	this.box.setGeometry(w,h);
	if (!skipReflow) this.reflowText();
}

ESVG.TextBox.prototype.setPos=function(x,y) {
	this.x = x;
	this.y = y;
	ESVG.set(this.base,"transform","translate("+x+","+y+")");
}

ESVG.TextBox.prototype.setFont = function(font,size) {
// SHOULD REDO THIS....
	this.font = font;
	this.size = size;
	this.refresh();
};

ESVG.TextBox.prototype.setTabStopSize = function(n) {
	this.tabStop = n;
	this.refresh();
};

ESVG.TextBox.prototype.setValue=function(v) {
//	this.value = v;
//	this.changed=false;
};

ESVG.TextBox.prototype.setValueObject=function(o) {
	this.clearEditorArray();
	this.value = o;
	this.changed = false;
	var l = o.length;
	for (var i=0;i<l;i++) {
		this.appendEditor(0,0,o[i].body,o[i].style);
	}
	this.reflowText();
}

ESVG.TextBox.prototype.getValue=function() {
	this.value = this.extractValue();	
	return(this.value);
};

ESVG.TextBox.prototype.getValueString=function() {
	return(this.extractQuotedValue());
};

ESVG.TextBox.prototype.parseId=function(idStr) {
	var idA=idStr.split('_');
	var last = idA.length-1;
	var line = parseInt(idA[last-2],10);
	var section = parseInt(idA[last],10);
	return({'line':line,'section':section});
}

ESVG.TextBox.prototype.getEditorIndex=function(who) {
	var e = this.ed;
	for (var i=e.length-1;i>=0;i--) {
		if (e[i]==who) return(i);
	}
	return(-1);
}

ESVG.TextBox.prototype.handleSpanExit=function(who,reason) {
//loosing focus triggers
//MOUSE_CLICK - user clicked focus elsewhere
//TAB - tab key breaks this span in two
//RETURN - return key breaks this span in two 
//ARROW_UP - up arrow anywhere
//ARROW_DOWN - down arrow anywhere
//DELETE_RIGHT - delete key hit at end of span
//BACKSPACE_LEFT - backspace key hit at start of span
//END - request to move to end of line
//HOME - request to move to start of line

//ZDL.log.cerr("Exit span on "+reason);
	var whoIdx = -1;
	if (!this.value) {
		this.value=[];
		var o={};
		o.style=who.getStyleObject();
		o.body=who.getQuotedBuffer();
		o.link="?"
		this.value[0]=o;
		whoIdx=0;
	}
	else {
		whoIdx = this.getEditorIndex(who);
		this.value[whoIdx].body=who.getQuotedBuffer(); // sync main buffer
	}
	switch (reason) {
		case "CHAR_LEFT": //updated
			if (whoIdx>0) {
				var n=this.ed[whoIdx-1];
				n.setCursorIndex(n.xIdx.length);
			}
			else {
				var n=who;
				n.setCursorIndex(0);
			}	
			n.edit();
			break;
		case "WORD_LEFT": //updated
			if (whoIdx>0) {
				var n=this.ed[whoIdx-1];
				n.setCursorIndex(n.xIdx.length);
				n.retreatWord();
			}
			else {
				var n=who;
				n.setCursorIndex(0);
			}	
			n.edit();
			break; 
		case "WORD_RIGHT":
		case "CHAR_RIGHT": //updated
			if (whoIdx<this.ed.length-1) {
				var n=this.ed[whoIdx+1];
				n.setCursorIndex(0);
			}
			else {
				var n=who;
				n.setCursorIndex(n.xIdx.length);
			}
			n.edit();
			break;
		case "LINE_UP": //updated
			if (who.lineNum==0) who.edit();
			else {
				var l = this.lineData[who.lineNum-1];
				var x = who.x+who.curseX;
				this.editPassageIn(l.lowIdx,l.highIdx,x);
			}
			break;
		case "LINE_DOWN": //updated 
			if (who.lineNum>=this.lineData.length-1) who.edit();
			else {
				var l = this.lineData[who.lineNum+1];
				var x = who.x+who.curseX;
				this.editPassageIn(l.lowIdx,l.highIdx,x);
			}
			break;
		case "RETURN":
			if (this.flexWidth) {
				this.flexWidth=false;
				this.w = this.ed[0].getStringWidth()+2*this.margin+1;
				this.h = this.size+2*this.margin;
				this.box.setGeometry(this.w,this.h,true);
//ZDL.log.cerr('fixed width to '+this.w);
			}
//ZDL.log.cerr('cursor at '+who.cursorIdx+' of '+who.buffer.length);
			if (who.cursorIdx<=who.buffer.length) {
				var o = who.breakAtColumn(who.cursorIdx);
//ZDL.log.cerr('R: '+o.remainder+"("+o.remainder.length+")");
				this.splitValueNode(whoIdx,who.cursorIdx,o.remainder);
				this.value[whoIdx].link="P";
				this.insertEditor(whoIdx+1,0,0,o.remainder,o.style);
				var ne = this.ed[whoIdx+1];
				ne.cursorIdx=0;
				ne.edit();
//for (var q=0;q<this.value.length;q++) ZDL.log.dumpObj(this.value[q]);
				this.reflowText();
//ZDL.log.cerr('Need to break up pasage');
			}
			break;
		case "TAB":
			if (this.flexWidth) {
				var b = this.ed[0].getBounds();
				this.w = b.width+2*this.margin-2;
				this.h = this.size+2*this.margin;
				this.box.setGeometry(this.w,this.h);
			}
			break;
		case "ESCAPE":
			if (this.flexWidth) {
				var b = this.ed[0].getBounds();
				this.w = b.width+2*this.margin-2;
				this.h = this.size+2*this.margin;
				this.box.setGeometry(this.w,this.h);
			}
//ZDL.log.cerr(ESVG.jsonEncode(this.extractValueObject()));
			this.invokeOnExitHandler();
			break;
	}
 
};

ESVG.TextBox.prototype.extractValueObject=function() {
	var a = [];
	var e = this.ed;
	var l = e.length;
	for (var i=0;i<l;i++) a.push(e[i].getValueObject())
	return(a);
}

// Extract the contents of the editor as a string with embedded tabs and newlines
ESVG.TextBox.prototype.extractValue=function() {
};

// Extract the contents of the editor as a string with embedded tabs and newlines
// while also quoting characters that could prove problematic with JSON or XML
ESVG.TextBox.prototype.extractQuotedValue=function() {
};

ESVG.TextBox.prototype.refresh=function() {
//	if (this.changed) this.value = this.extractValue();
};

// Given a passage that is being edited (who), test to see if it needs to 
// be broken up to remain inside the text boundaries of the widget
ESVG.TextBox.prototype.testForLineOverflow=function(who) {
	var idx = this.getEditorIndex();
	var max = this.w-2*this.margin;
	var e = this.ed;
	var el = e.length;
	var w = who.getStringWidth();
	if (w>max) return(true);
	var y = who.y;
	var i=idx-1;
	while (i>=0 && e[i].y==y) {
		w+=e[i].getStringWidth();
		i--;
	}
	if (w>max) return(true);
	var i=idx+1;
	while (i<el && e[i].y==y) {
		w+=e[i].getStringWidth();
		i++;
	}
	if (w>max) return(true);
//ZDL.log.cerr('Computed width: '+w+' max: '+max);
	return(false);
}

// given the bounding box (this.box) and the value object array (this.value) and the justification
// setting.  Reflow the text for fit the space, resizing the height of the box as needed
ESVG.TextBox.prototype.reflowText=function() {
	var e = this.ed;	// Array of editors
	var v = this.value;	// Parallel array of value objects for/from editors
	if (!e || !v) return;
	var m = this.margin*2;
	var l = v.length;
	var i = 0;
	var y = this.margin;
	var bW = this.w;
	var lW = bW-m;
	this.lineData = [];
	var lineNum=0;
//ZDL.log.cerr('Line Width: '+lW);
//ZDL.log.dumpObj(e);
	while(i<l) {
		//First divide things up into lines
		var x=this.margin;
		var w=0;
		var h=0;
		var startIdx = i;
		var endIdx = i;
		var done=false;
		while (i<l && !done) {
			w += e[i].getStringWidth();
			h = Math.max(h,e[i].height);
			if (v[i].link=="L") v[i].link="S";
			if (w>lW || v[i].link=="P") done=true;
			else {
				i++;
				endIdx++;
			}
		}
		var lD={};
		if (endIdx>=l) endIdx=l-1;
//ZDL.log.cerr("Found line consisting of: "+startIdx+"->"+endIdx);
//for (var j=startIdx;j<=endIdx;j++) ZDL.log.cerr(j+": "+v[j].body+"("+e[j].getBounds().width+") w: "+w+" h: "+h+" y: "+y);

		if (w>lW) { // String at EndIdx is too long

			var last = e[endIdx];
			var baseW = w-last.width;
			var clipPoint = lW-baseW;
//ZDL.log.cerr("Base width: "+baseW+" NEED TO WRAP to at most "+clipPoint+" pixels");
			var breakData = last.breakAtPoint(clipPoint);
			if (!breakData) { 
//ZDL.log.cerr("got back null");
				if (startIdx==endIdx) {// need to resize the box
//ZDL.log.cerr("atomic line: "+v[endIdx].body);
					this.setGeometry(w+m,this.h);
					if (this.layoutActive) {
						this.hideLayoutBox();
						this.showLayoutBox();
					}
					return;
				}
				else {
//ZDL.log.cerr("trimming selected passages");
					endIdx--; //kick it all back by one passage
					i--;
					w=baseW;
				}
			}
			else {
				var pt=last.buffer.length-breakData.remainder.length;
				this.splitValueNode(endIdx,pt,breakData.remainder);
				v[endIdx].link="L";
				l++;
				this.insertEditor(endIdx+1,0,0,breakData.remainder,breakData.style);
				if (breakData.cursorIdx>=0) {
					var newE = e[endIdx+1];
					newE.cursorIdx = breakData.cursorIdx;
//ZDL.log.cerr('init cursor to '+newE.cursorIdx);
					newE.edit();
				}
				if (baseW+breakData.o>lW) {
					this.setGeometry(baseW+breakData.o+m,this.h);
					if (this.layoutActive) {
						this.hideLayoutBox();
						this.showLayoutBox();
					}
					return;
				}
				w = baseW+breakData.newW;
				if (w>lW) { // still too long
					if (startIdx!=endIdx) {
						endIdx--;
						i--;
						w = baseW;
					}
				}
			}
//ZDL.log.cerr("Finalized line consisting of: ");
//for (var j=startIdx;j<=endIdx;j++) ZDL.log.cerr(j+": "+v[j].body+" w: "+w+" h: "+h+" y: "+y);

		}

		if (h==0) h=e[startIdx].size;

		lD.yMin = y;
		lD.yMax = y+h;
		lD.lowIdx = startIdx;
		lD.highIdx = endIdx;
		this.lineData.push(lD);

		y+=0.8*h; // Set vertical location of line

		if (this.justify == "L") {
			for (var j=startIdx;j<=endIdx;j++) {
				e[j].lineNum = lineNum;
				e[j].setPos(x,y);
				x += e[j].getStringWidth();
			}
		}
		else if (this.justify == "C") {
			x=(bW-w)/2;
			for (var j=startIdx;j<=endIdx;j++) {
				e[j].lineNum = lineNum;
				e[j].setPos(x,y);
				x += e[j].getStringWidth();;
			}
		}
		else if (this.justify == "R") {
			x=bW-w-this.margin;
			for (var j=startIdx;j<=endIdx;j++) {
				e[j].lineNum = lineNum;
				e[j].setPos(x,y);
				x += e[j].getStringWidth();;
			}
		}

		y+=0.2*h; // Add leading
		lineNum++;
		i++;
	}
	if (this.h<y+m) {
		this.setGeometry(this.w,y+m,true);
		if (this.layoutActive) {
			this.hideLayoutBox();
			this.showLayoutBox();
		}
	}
//ZDL.log.dumpObj(this.lineData[0]);
}

// Given a div as a starting point, refresh the line containing that div from the end of
// that div forward (assume the div itself is already refreshed.
ESVG.TextBox.prototype.refreshLine=function(div) {
/*
	var idObj = this.parseId(div.id);
	var line = idObj.line;
	var section = idObj.section+1;
	var toDo = [];
	var done = false;
	var lblBase = this.id+'_line_'+line+'_s_';
	var p = div;
	while (!done) {
		var lbl = lblBase+section;
		var n = p.nextSibling;
		if (n && n.id==lbl) {
			toDo.push(n);
			p=n; 
			section++;
		}
		else done = true;
	}
	if (toDo.length==0) return;
	var tabW = this.tabStop*this._CWIDTH;
	var chrW = this._CWIDTH;
	var x=Math.ceil((div.offsetLeft+div.offsetWidth+1)/tabW)*tabW;
	for (var i=0;i<toDo.length;i++) {
		toDo[i].style.left=x+"px";
		x +=Math.ceil((toDo[i].innerHTML.length*chrW+1)/tabW)*tabW;
	}
*/
}

ESVG.TextBox.prototype.registerDown=function(event) {
//	var d = this.area;
//	this._mSL = Math.floor((event.clientY-d.offsetTop)/this._CHEIGHT);
//	this._mSPx = event.clientX-d.offsetLeft;
};

ESVG.TextBox.prototype.trackMouse=function(event) {
/*
	var d = this.area;
	this._mEL = Math.floor((event.clientY-d.offsetTop)/this._CHEIGHT);
	this._mEPx = event.clientX-d.offsetLeft;
	if (this._mSL==this._mEL && this._mSPx==this._mEPx) {
		this.handleSingleClick(event);

	}
	else {
//ZLM.cerr(mouseStartLine+":"+mouseStartPx+" vs. "+mouseEndLine+":"+mouseEndPx);
	}
*/
};

ESVG.TextBox.prototype.locateHit=function(l,px) {
/*
//ZLM.cerr('looking for line '+l+' pixel location '+px);
	if (l>this._lastLine) l=this._lastLine;
	var idBase = this.id+"_line_"+l+"_s_0";
	var lineId = "_line_"+l;
	var sp = document.getElementById(idBase);
	var spNext = sp.nextSibling;
	var done = false;
	var inSpan = false;
	while (!done ) {
		var leftEnd = sp.offsetLeft+sp.offsetWidth;
		if (px<leftEnd) {
			inSpan = true;
			done=true;
		}
		else if (spNext && spNext.id.indexOf(lineId)>0) {
			var rightEnd = spNext.offsetLeft;
//ZLM.cerr("left: "+leftEnd+"  Right: "+rightEnd);
			if (px>=leftEnd && px<rightEnd) done=true;
			else {
				sp = spNext;
				spNext = sp.nextSibling;
			}
		}
		else done = true;
	}
	var d=sp;
	var col = 0;
	if (inSpan) {
//ZLM.cerr('in span');
		col = Math.round((px-d.offsetLeft)/this._CWIDTH);		
	}
	else {
		col = Math.round(d.offsetWidth/this._CWIDTH);
	}
//ZLM.cerr('column: '+col);
	return({span:d,column:col});
*/
}

// Position the cursor based on a mouse click at internal location (mEL,mEPx)
ESVG.TextBox.prototype.handleSingleClick=function(event) {
/*
	var targetId = null;
	if (event.target) {
		targetId = event.target.id;
	}
	else if (event.srcElement) {
		targetId = event.srcElement.id;
	}
	else return;
	var l = this._mEL;	// line
	var x = this._mEPx;	// columnPixel
	var d = null;		// span to edit
	if (targetId == this.id+"_textArea") { // missed the main bodies of code
//NOTE MAYBE THIS SHOULD USE LOCATE HIT...
		// need to find the right line
//ZLM.cerr('hit somewhere on line '+l);
		if (l>this._lastLine) l=this._lastLine;
//ZLM.cerr('effective line '+l);
		// need to find closest span
		var idBase = this.id+"_line_"+l+"_s_0";
		var lineId = "_line_"+l;
		var sp = document.getElementById(idBase);
		var spNext = sp.nextSibling;
		var done = false;
		while (!done && spNext && spNext.id.indexOf(lineId)>0 ) {
			var leftEnd = sp.offsetLeft+sp.offsetWidth;
			var rightEnd = spNext.offsetLeft;
			if (x>=leftEnd && x<rightEnd) done=true;
			else {
				sp = spNext;
				spNext = sp.nextSibling;
			}
		}
		d=sp;
		x=sp.offsetLeft+sp.offsetWidth;
	}
	else {
//ZLM.cerr("hit span "+targetId);
		d = document.getElementById(targetId);
		x = this._CWIDTH*Math.floor((this._mEPx)/this._CWIDTH);
	}
	var col = Math.round((x-d.offsetLeft)/this._CWIDTH);
	this.editor.editAsCode(d,col);
*/
};


//################################################################

//==============================================================
// STANDARD ZONE BOILERPLATE
//==============================================================
ESVG.initializeStandardZones = function(svgRoot) {
	ESVG.root = ESVG.bindCanvas(svgRoot);
	ESVG.foundation = ESVG.Group.create();
	ESVG.root.appendChild(ESVG.foundation);

	ESVG.workingCanvas = ESVG.Group.create();
	ESVG.root.appendChild(ESVG.workingCanvas);

	ESVG.background = ESVG.Group.create();
	ESVG.workingCanvas.appendChild(ESVG.background);
	ESVG.canvas = ESVG.Group.create();
	ESVG.workingCanvas.appendChild(ESVG.canvas);
	ESVG.foreground = ESVG.Group.create();
	ESVG.workingCanvas.appendChild(ESVG.foreground);
	ESVG.metaLayer = ESVG.Group.create();
	ESVG.root.appendChild(ESVG.metaLayer);

/*
	ESVG.workingCanvasClip = ESVG.ClipPath.create("workingCanvasClip");
	var w = ESVG.root.getWidth();
	var h = ESVG.root.getHeight();
	var r = ESVG.Rect.create(0,0,w,h,"","",0);
	ESVG.workingCanvasClip.appendChild(r);
	ESVG.root.defs.appendChild(ESVG.workingCanvasClip);
	ESVG.workingCanvas.setClipPath("url(#workingCanvasClip)");
*/
}

ESVG.setWorkingCanvasMargins=function(top,left,right,bottom) {
	var w = ESVG.root.getWidth();
	var h = ESVG.root.getHeight();
	w = 640;
	h=480;
	ESVG.workingCanvas.setPos(left,top);
	ESVG.workingCanvas.offsetLeft = left;
	ESVG.workingCanvas.offsetTop = top;
	var r = ESVG.workingCanvasClip.firstChild;
	r.setGeometry(w-left-right,h-top-bottom);	
}

ESVG.dumpObj=function(e) {
	try {
		if (!e) alert("dumpObj Target is NULL");
		var s=[];
		for (p in e) s.push(p+' = '+e[p]);
		alert(s.join('\n')); 
	} catch(err) { // Adobe workaround
		var s="";
		for (p in e) s+=p+'\n';
		alert(s);
	}
}