/*
	zendsrpt.js
	ZEN JavaScript DeepSee Report editor library module
	Copyright (c) 2010-2013 InterSystems Corp. ALL RIGHTS RESERVED.
        Local JS Namespaces: XML,ZVE,ZRU
*/

//=======================================
// XML File stuff
//=======================================
var XML={};

//=======================================//
// Simplified nodes for holding XML data //
//=======================================//
XML.Node=function(name) {
	this.attributes=[];
	this.attValues=[];
	this.childNodes=[];
	this.firstChild=null;
	this.lastChild=null;
	this.nextSibling=null;
	this.nodeName=name;
	this.nodeValue=null;
	this.parentNode=null;
	this.previousSibling=null;
}

XML.Node.prototype.appendChild=function(newChild) {
	if (newChild==this) return;
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
}

XML.Node.prototype.hasChildNodes=function() {
	if (this.childNodes.length>0) return(true);
	return(false);
}

//XML.Node.prototype.insertBefore=function() {
//}

XML.Node.prototype.removeChild=function(n) {
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
}

//XML.Node.prototype.replaceChild=function() {
//}

XML.Node.prototype.addAttribute=function(attName,value) {
	var idx=this.attributes.length;
	this.attributes[idx]=attName;
	this.attValues[idx]=value;
}

XML.Node.prototype.getAttributeIdx=function(attName) {
	for (var i=0;i<this.attributes.length;i++) {
		if (this.attributes[i]==attName) return(i);
	}
	return(-1);
}

XML.Node.prototype.getAttribute=function(attName) {
	var idx=this.getAttributeIdx(attName);
	if (idx==-1) return(null);
	return(this.attValues[idx]);
}

XML.Node.prototype.setAttribute=function(attName,value) {
	var idx=this.getAttributeIdx(attName);
	if (idx==-1) return;
	this.attValues[idx]=value;	
}

XML.Node.prototype.getChildrenByName=function(tagName) {
	var a=[];
	a = this.seekChildrenByName(a,tagName);
	return(a);
}

XML.Node.prototype.seekChildrenByName=function(a,tagName) {
	if (this.nodeName==tagName) a[a.length]=this;
	for (var p=this.firstChild;p!=null;p=p.nextSibling)a=p.seekChildrenByName(a,tagName);
	return(a);
}


//=======================//
// Custom XML-ish parser //
//=======================//

XML.tagStack=[];

// Given a string that has already seen an 'openC' find its matching 'closeC'
// while being sensitive to nesting and embeded strings
XML.balanceChar=function(str,openC,closeC) {
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
XML.seekChar=function(str,char) {
	var i=0;
	while (i<str.length) {
		if (str.charAt(i)==char) return(i);
		if (str.charAt(i)=='"') i=str.indexOf('"',i+1);
		if (str.charAt(i)=="'") i=str.indexOf("'",i+1);
		i++;
	}
	return(-1);
}

XML.isWhitespace=function(ch) {
	if (ch==" " || ch=="\t" || ch=="\n" || ch=="\r") return(true);
	return(false);
}

XML.seekNonWhitespace=function(str) {
	var i=0;
	while (i<str.length) {
		var ch=str.charAt(i);
		if (!(ch==" "||ch=="\t"||ch=="\n"||ch=="\r")) return(i);
		i++;
	}
	return(-1);
}

XML.seekWhitespace=function(str) {
	var i=0;
	while (i<str.length) {
		if (XML.isWhitespace(str.charAt(i))) return(i);
		if (str.charAt(i)=='"') i=str.indexOf('"',i+1);
		if (str.charAt(i)=="'") i=str.indexOf("'",i+1);
		i++;
	}
	return(-1);
}

XML.trim=function(str) {
	var sIdx=XML.seekNonWhitespace(str);
	var eIdx=str.length-1;
	while(eIdx>=sIdx && XML.isWhitespace(str.charAt(eIdx))) eIdx--;
	if (eIdx>=sIdx) str=str.substring(sIdx,eIdx+1);
	return(str)
}

XML.parseAttributes=function(node,str) {
	var sIdx=XML.seekNonWhitespace(str);
	if (sIdx== -1) return(null);
	var s1=str.substr(sIdx);
	var eIdx=XML.seekWhitespace(s1);
	if (eIdx==-1) eIdx=s1.length;
	var nvp=s1.substr(0,eIdx).split("=");
	node.addAttribute(nvp[0],nvp[1].substr(1,nvp[1].length-2));
	if (eIdx<s1.length) return(XML.parseAttributes(node,s1.substr(eIdx)));
	return(null);		
}

XML.parseTagHeader=function(str) {
	var i=XML.seekWhitespace(str);
	if (i== -1) { // no attributes, just a name
		return(new XML.Node(str));
	}
	var name=str.substr(0,i);
	var node=new XML.Node(name);
	var s1=str.substr(i+1);
	XML.parseAttributes(node,s1);
	return(node);
}

XML.parseTagBody=function(node,str) {
	var depth=XML.tagStack.length;
	while(str!=null && XML.tagStack.length>=depth) {
		var tagStart=str.indexOf("<");
		var firstNonBlank=XML.seekNonWhitespace(str);
		if (tagStart>firstNonBlank) { // need to check for data
			var s1=str.substr(0,tagStart);
			str=str.substr(tagStart);
			var sIdx=XML.seekNonWhitespace(s1);
			if (sIdx!=-1) {
				var eIdx=s1.length-1;
				while(eIdx>=sIdx && XML.isWhitespace(s1.charAt(eIdx))) eIdx--;
				if (eIdx>=sIdx) {
					s1=s1.substring(sIdx,eIdx+1);
					var n=new XML.Node("_txt_");
					n.nodeValue=s1;
					node.appendChild(n);
				}
			}
		}
		str=XML.parseNextTag(node,str);	
	}
	return(str);
}

XML.parseComment=function(node,str) {
	var eIdx=str.indexOf("-->");
	if (eIdx==-1) {
		alert("Missing end tag of comment section");
		return(null);
	}
	var s1=str.substr(0,eIdx);
	var s2=str.substr(eIdx+3);
	if (s1.length>0) {
		var n=new XML.Node("_comment_");
		n.nodeValue=s1;
		node.appendChild(n);
	}
	return(s2);
}

XML.parseCData=function(node,str) {
	var eIdx=str.indexOf("]]>");
	if (eIdx==-1) {
		alert("Missing end tag of CDATA section");
		return(null);
	}
	var s1=str.substr(0,eIdx);
	var s2=str.substr(eIdx+1);
	if (s1.length>0) {
		var n=new XML.Node("_cdata_");
		n.nodeValue=s1;
		node.appendChild(n);
	}
	return(s2);
}

XML.parseDocType=function(node,str) {
	var eIdx=XML.balanceChar(str,"<",">");
	if (eIdx==-1) {
		alert("Missing end tag of DOCTYPE section");
		return(null);
	}
	var s1=str.substr(0,eIdx);
	var s2=str.substr(eIdx+1);
	if (s1.length>0) {
		var n=new XML.Node("_doctype_");
		n.nodeValue=s1;
		node.appendChild(n);
	}
	return(s2);
}

XML.parseTagFooter=function(str) {
	var i=str.indexOf(">");
	if (i==-1) {
		alert("Parse error attempting to close tag");
		return(null);
	}
	var s1=str.substr(0,i);
	var expected=XML.tagStack.pop();
	if (s1!=expected) {
		alert("Expected close tag for "+expected+" but got "+s1);
		return(null);
	}
	var s2=str.substr(i+1);
	return(s2);
}

XML.parseEncodingTag=function(tree,str) {
	var endIdx=XML.seekChar(str,"?");
	if (endIdx== -1 || str.charAt(endIdx+1)!=">") {
		alert("Error parsing XML encoding tag");
		return(null);
	}
	var s1=str.substr(0,endIdx);
	var n=XML.parseTagHeader(s1);
	if (n!=null) tree.appendChild(n);
	var s2=str.substr(endIdx+2);
	return(s2);
}

XML.parseTag=function(tree,str) {
	var nextClose=XML.seekChar(str,">");
	var nextSlash=XML.seekChar(str,"/");
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
	var n=XML.parseTagHeader(s1);
	if (n!=null) tree.appendChild(n);
	if (isEmpty) s2=str.substr(endIdx+2);
	else {
		XML.tagStack.push(n.nodeName);
		s2=XML.parseTagBody(n,str.substr(endIdx+1));		
	}
	return(s2);
}

XML.parseNextTag=function(tree,str) {
	var tagStart=str.indexOf("<");
	if (tagStart==-1) return(null);
	var s1=str.substr(tagStart+1);
	if (s1.charAt(0)=="?") s1=XML.parseEncodingTag(tree,s1.substr(1));
	else if (s1.charAt(0)=="/") s1=XML.parseTagFooter(s1.substr(1));
	else if (s1.indexOf("!--")==0) s1=XML.parseComment(tree,s1.substr(3));
	else if (s1.indexOf("![CDATA[")==0) s1=XML.parseCData(tree,s1.substr(8));
	else if (s1.indexOf("!DOCTYPE")==0) s1=XML.parseDocType(tree,s1.substr(8));
	else s1=XML.parseTag(tree,s1);
	return(s1);
}

XML.parse=function(str) {
	var root=new XML.Node("_rootBody");
	XML.tagStack=[];
	while (str!=null) str=XML.parseNextTag(root,str);
	return(root);
}

XML.getMaxDepth=function(root,d) {
	if (d==undefined) d=0;
	if (root.firstChild==null) return(d);
	var max=d;
	for (var p=root.firstChild;p!=null;p=p.nextSibling) {
		var nD=XML.getMaxDepth(p,d+1);
		if (nD>max) max=nD;
	}
	return(max);
}

XML.getDepth=function(root,node) {
	if (root==node) return(0);
	for (var p=root.firstChild;p!=null;p=p.nextSibling) {
		var d=XML.getDepth(p,node);
		if (d>-1) return(d+1);
	}
	return(-1); // node not found;
}

XML.getChildByNodeName=function(root,name) {
	var min=null;
	var bestNode=null;
	for (var p=root.firstChild;p!=null;p=p.nextSibling) if (p.nodeName==name) return(p);
	for (var p=root.firstChild;p!=null;p=p.nextSibling) {
		var node=XML.getChildByNodeName(p,name);
		if (node!=null) {
			var d=XML.getDepth(root,node);
			if (min==null || d<min) {
				var bestNode=node;
				min=d;
			}
		}
	}
	return(bestNode);	
}

XML.dumpParseTree=function(root,d) {
	var s=""
	for (var i=0;i<d*3;i++) s+=".";
	if (root.nodeName=="_txt_") ZLM.cerr(s+"{"+root.nodeValue+"}");
	else if (root.nodeName=="_cdata_") ZLM.cerr(s+"CDATA:{"+root.nodeValue+"}");
	else if (root.nodeName=="_comment_") ZLM.cerr(s+"COMMENT:{"+root.nodeValue+"}");
	else if (root.nodeName=="_doctype_") ZLM.cerr(s+"DOCTYPE:{"+root.nodeValue+"}");
	else {
		ZLM.cerr(s+root.nodeName);
		for (var i=0;i<root.attributes.length;i++) {
			ZLM.cerr(s+"..@"+root.attributes[i]+"="+root.attValues[i]);
		}
		for (var p=root.firstChild;p!=null;p=p.nextSibling) XML.dumpParseTree(p,d+1);
	}
}

/// Given a free text string escape:
/// & to &amp;
/// " to &quot;
/// ' to &apos;
/// < to &lt;
/// > to &gt; and
/// ] to &#93;
XML.escapeStr=function(str) {
	if (!str) return(null);
	var ns = str.split("&");
	ns = ns.join("&amp;");
	ns = ns.split('"');
	ns = ns.join("&quot;");
	ns = ns.split("'");
	ns = ns.join("&apos;");
	ns = ns.split("<");
	ns = ns.join("&lt;");
	ns = ns.split(">");
	ns = ns.join("&gt;");
	ns = ns.split("]");
	ns = ns.join("&#93;");
	return(ns);
}

/// Given an escaped string convert it back to plain text where
/// & is &amp;
/// " is &quot;
/// ' is &apos;
/// < is &lt; and
/// > is &gt;
/// ] is &#93;
XML.unescapeStr=function(str) {
	if (!str) return(null);
	var sa = str.split("&amp;");
	var l = sa.length;
	for (var i=0;i<l;i++) {
		var s = sa[i];
		s = s.split('&quot;');
		s = s.join('"');
		s = s.split("&apos;");
		s = s.join("'");
		s = s.split("&lt;");
		s = s.join("<");
		s = s.split("&gt;");
		s = s.join(">");
		s = s.split("&#93;");
		s = s.join("]");
		sa[i] = s;
	}
	var ns = sa.join("&");	
	return(ns);
}

//============================
//############################################
// ZEN VISUAL EDITOR IDEAS
//############################################
var ZVE={}; // Zen visual editor namespace

// This stuff might end up in CSS eventually but for now constants will do
// zenActivePip class
ZVE.ACP_RADIUS = 4;
ZVE.ACP_BACKGROUND = "#99cff1";
ZVE.ACP_BORDER = "none";

// zenPassivePip class
ZVE.PCP_RADIUS = 2;
ZVE.PCP_BACKGROUND = "black";
ZVE.PCP_BORDER= "none";

// a layout box is an invisible container for adjusting the size and location of a
// contained rectangular div.  It also contains four control pips used to effect the actual
// size changes to the goemetry

ZVE.LayoutBox = function(homeX, homeY, width, height) {
	var d=ZVE.ACP_RADIUS;

	this.div = ZLM.simulateTag("div class='zenLayoutBox' style='position:absolute;' onmousedown='ZLM.drag(this,event);'");
	ZLM.initializeObject(this,this.div,"ZVE.LayoutBox");
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
	this.status="complete";

	ZLM.registerDragItem(this.div,this);
	this.div.style.top = (homeY-d)+"px";
	this.div.style.left = (homeX-d)+"px";
	this.div.style.width = (width+2*d)+"px";
	this.div.style.height = (height+2*d)+"px";
	this.div.style.fontSize="0px";
	this.div.style.lineHeight="0px";
	this.div.controller=this;

	this.innerDiv = ZLM.simulateTag("div class='zenLayoutBoxBounds' style='position:absolute; width:"+width+"; height:"+height+"'");
	this.innerDiv.style.top=d+"px";
	this.innerDiv.style.left=d+"px";
	this.innerDiv.style.border="1px dotted black";

	this.boxUL=new ZVE.ControlPt(d,d,"UL",this);
	this.boxUR=new ZVE.ControlPt(d+width,d,"UR",this);
	this.boxLL=new ZVE.ControlPt(d,d+height,"LL",this);
	this.boxLR=new ZVE.ControlPt(d+width,d+height,"LR",this);

	this.div.appendChild(this.innerDiv);
	this.div.appendChild(this.boxUL.div);
	this.div.appendChild(this.boxUR.div);
	this.div.appendChild(this.boxLL.div);
	this.div.appendChild(this.boxLR.div); 
	return(this);  
}

ZVE.LayoutBox.prototype.hide=function() {
	this.homeX=this.div.offsetLeft+this.innerDiv.offsetLeft;
	this.homeY=this.div.offsetTop+this.innerDiv.offsetTop;
	this.width=this.innerDiv.offsetWidth;
	this.height=this.innerDiv.offsetHeight;
	this.static=true;
	this.div.style.display="none";
}

ZVE.LayoutBox.prototype.show=function() {	
	if (this.notifyFocus) eval(this.notifyFocus);
	if (this.div.parentNode) this.div.parentNode.removeChild(this.div);
	this.targetNode.offsetParent.appendChild(this.div);
	this.static=false;
	this.div.style.display="block";
}

ZVE.LayoutBox.prototype.getBoundNode=function() {
	return(this.targetNode);
}

ZVE.LayoutBox.prototype.getHomeX=function() {
	var x = this.div.offsetLeft+this.innerDiv.offsetLeft;
	if (this.static) x = this.homeX;
	return(ZRU.convertToPoints(x));
}

ZVE.LayoutBox.prototype.getHomeY=function() {
	var y = this.div.offsetTop+this.innerDiv.offsetTop
	if (this.static) y = this.homeY;
	return(ZRU.convertToPoints(y));
}

ZVE.LayoutBox.prototype.getWidth=function() {
	var w = this.innerDiv.offsetWidth;
	if (this.static) w = this.width;
	return(ZRU.convertToPoints(w));
}

ZVE.LayoutBox.prototype.getHeight=function() {
	var h = this.innerDiv.offsetHeight;
	if (this.static) h = this.height;
	return(ZRU.convertToPoints(h));
}

ZVE.LayoutBox.prototype.getEditOpStatus=function() {
	return(this.status);
}

ZVE.LayoutBox.prototype.setMinHeight=function(h) {
	this.minHeight=h-2;
}

ZVE.LayoutBox.prototype.setMaxHeight=function(h) {
 	this.maxHeight=h-2;
}

ZVE.LayoutBox.prototype.setMinWidth=function(w) {
	this.minWidth=w-2;
}

ZVE.LayoutBox.prototype.setMaxWidth=function(w) {
	this.maxWidth=w-2;
}

ZVE.LayoutBox.prototype.enableIncrementalEvents=function(flag) {
	var p=false;
	if (flag=="true" || flag=="t") p=true;
	else if (flag=="True" || flag=="TRUE" || flag=="T") p=true;
	else if (flag==true || flag==1 || flag=="1") p=true;
	this.incrementalEvents=p;
}

ZVE.LayoutBox.prototype.enableResize=function(flag) {
	var dsp = "block";
	if (!flag) dsp = "none";
	this.boxUL.div.style.display = dsp;
	this.boxUR.div.style.display = dsp;
	this.boxLL.div.style.display = dsp;
	this.boxLR.div.style.display = dsp;
}

ZVE.LayoutBox.prototype.enableMove = function(flag) {
	if (!flag) {
		ZLM.setLocalAttribute(this.div,"onmousedown","");
	}
	else {
		ZLM.setLocalAttribute(this.div,"onmousedown","ZLM.drag(this,event);");
	}
}
	
ZVE.LayoutBox.prototype.setFocusNotify=function(cbFunction) {
	this.notifyFocus=cbFunction;
}

ZVE.LayoutBox.prototype.setResizeNotify=function(cbFunction) {
	this.notifyResize=cbFunction;
}

ZVE.LayoutBox.prototype.setMoveNotify=function(cbFunction) {
	this.notifyMove=cbFunction;
}

ZVE.LayoutBox.prototype.setTrueClickNotify=function(cbFunction) {
	this.notifyClick=cbFunction;
}

ZVE.LayoutBox.prototype.setDragXConstraint=function(cbFunction,parmStr) {
	if (!parmStr) parmStr="";
	if (cbFunction!=null) {
		var fnName=cbFunction.substring(0,cbFunction.indexOf("("));
		cbFunction=fnName+"(intendedX"+parmStr+");";
	}
	this.constrainX=cbFunction;
}

ZVE.LayoutBox.prototype.setDragYConstraint=function(cbFunction,parmStr) {
	if (!parmStr) parmStr="";
	if (cbFunction!=null) {
		var fnName=cbFunction.substring(0,cbFunction.indexOf("("));
		cbFunction=fnName+"(intendedY"+parmStr+");";
	}
	this.constrainY=cbFunction;
}

ZVE.LayoutBox.prototype.bindToNode=function(node,obj) {
	var d=ZVE.ACP_RADIUS;
	this.targetNode=node;
	this.targetObj = obj;
	var w=node.clientWidth;
	var h=node.clientHeight;
	if (!ZLM.isIE) {
		w-=2;
		h-=2;
	}
	if (w<0) w=0;
	if (h<0) h=0;
	if (node.offsetHeight==0) return;
	this.resize(w,h);  
	this.reposition(node.offsetLeft,node.offsetTop);
	ZLM.reparent(this.div,node.offsetParent);
}

ZVE.LayoutBox.prototype.unbind=function() {
	if (this.targetNode.offsetParent) {
		this.targetNode.offsetParent.removeChild(this.div);
	}
}

ZVE.LayoutBox.prototype.resize=function(w,h,forceTarget){
	var d=ZVE.ACP_RADIUS;
	this.div.style.width=(w+2*d)+"px";
	this.div.style.height=(h+2*d)+"px";
	this.innerDiv.style.width=w+"px";
	this.innerDiv.style.height=h+"px";
	this.boxUR.div.style.left=(0+w)+"px";
	this.boxLL.div.style.top=(0+h)+"px";
	this.boxLR.div.style.top=(0+h)+"px";
	this.boxLR.div.style.left=(0+w)+"px";
	if (forceTarget) {
		if (this.notifyMove) eval(this.notifyMove);
		if (this.notifyResize && this.getDragObject(wrapper.node)!="*") eval(this.notifyResize);
	}
}

ZVE.LayoutBox.prototype.reposition=function(x,y,forceTarget) {
	var d=ZVE.ACP_RADIUS;
	this.div.style.top=(y-d)+"px";
	this.div.style.left=(x-d)+"px";	
	if (forceTarget) {
		if (this.notifyMove) eval(this.notifyMove);
	}
}

ZVE.LayoutBox.prototype.getDragObject=function(n) {
	if (n==this.div) return("*");
	if (n==this.boxUL.div) return("L");
	if (n==this.boxUR.div) return("R");
	if (n==this.boxLL.div) return("l");
	if (n==this.boxLR.div) return("r");
	return("-");
}

// Start drag of either the whole box (oId=="*") or one of the four corners. In the case of a corner
// drag, precalculate limiting bounds for the drag operation based on the initial geometry of the 
// layoutBox and any available user guidelines.
ZVE.LayoutBox.prototype.startDrag=function(engine, wrapper) {
	this.status="active";
	this.jitterCount = 0;
	this.justAClick=true;
	var n=wrapper.node;
	var oId=this.getDragObject(n);
	n.dsX=wrapper.node.offsetLeft;
	n.dsY=wrapper.node.offsetTop;
	if (oId=="r" || oId=="R") {
		if (this.minWidth!=null) n.minX=this.minWidth;
		else n.minX=0;
		if (this.maxWidth!=null) n.maxX=this.maxWidth;
		else n.maxX=null;
	}
	else if (oId=="l" || oId=="L") {
		if (this.maxWidth!=null) n.minX=this.boxLR.div.offsetLeft-this.maxWidth;
		else n.minX=null;
		if (this.minWidth!=null) n.maxX=this.boxLR.div.offsetLeft-this.minWidth;
		else n.maxX=this.boxLR.div.offsetLeft;
	}
	if (oId=="R" || oId=="L") {
		if (this.maxHeight!=null) n.minY=this.boxLR.div.offsetTop-this.maxHeight;
		else n.minY=null;
		if (this.minHeight!=null) n.maxY=this.boxLR.div.offsetTop-this.minHeight;
		else n.maxY=this.boxLR.div.offsetTop;
	}
	else if (oId=="r" || oId=="l") {
		if (this.minHeight!=null) n.minY=this.minHeight;
		else n.minY=0;
		if (this.maxHeight!=null) n.maxY=this.maxHeight;
		else n.maxY=null;
	}
}

ZVE.LayoutBox.prototype.constrainDragX=function(engine,wrapper,intendedX) {
	this.jitterCount++;
	var n=wrapper.node;
	if (this.jitterCount>2) this.justAClick=false;
	switch(this.getDragObject(n)) {
		case "*":
			if (this.constrainX!=null) {
				var d = ZVE.ACP_RADIUS;
				intendedX+=d;
				intendedX=parseInt(eval(this.constrainX))-d;
			}
			return(intendedX);
		case "L":
		case "l":
		case "r":
		case "R":
			if (n.minX!=null && intendedX<=n.minX) return(n.minX);
			if (n.maxX!=null && intendedX>n.maxX) return(n.maxX);
			return(intendedX);
	}
	return(intendedX);
}

ZVE.LayoutBox.prototype.constrainDragY=function(engine,wrapper,intendedY) {
	var n=wrapper.node;
	var obj = this.getDragObject(n);
	if (obj=="r" || obj=="l" || obj=="R" || obj=="L") {
		if (n.minY!=null && intendedY<=n.minY) intendedY=n.minY;
		if (n.maxY!=null && intendedY>n.maxY) intendedY=n.maxY;
	}
	switch(obj) {
		case "*":
			if (this.constrainY!=null) {
				var d = ZVE.ACP_RADIUS;
				intendedY+=d;
				intendedY=parseInt(eval(this.constrainY))-d;
			}
			if (this.incrementalEvents && this.notifyMove) eval(this.notifyMove);  
			return(intendedY);
		case "r":
			this.boxLR.div.style.top=intendedY;
			this.adjustLR();
			break;
		case "R":
			this.boxUR.div.style.top=intendedY;
			this.adjustUR();
			return(0);
			break;
		case "l":
			this.boxLL.div.style.top=intendedY;
			this.adjustLL();
			break;
		case "L":
			this.boxUL.div.style.top=intendedY;
			this.adjustUL();
			return(0);
			break;
	}
	return(intendedY);
}

ZVE.LayoutBox.prototype.endDrag=function(engine,wrapper) {
	this.status="complete";
	if (this.justAClick) {
		if (this.targetObj && this.targetObj.setSelection) this.targetObj.setSelection(ZLM.dragEndEvent);
		if (this.notifyClick) eval(this.notifyClick);
	}
	else {
		if (this.notifyMove) eval(this.notifyMove);
		if (this.notifyResize && this.getDragObject(wrapper.node)!="*") eval(this.notifyResize);
	}
}

// Tweak the shape of the layout box to align with a change of position in the lower right
// control point
ZVE.LayoutBox.prototype.adjustLR=function() {
	var d = ZVE.ACP_RADIUS;
	var x = this.boxLR.div.offsetLeft;
	var y = this.boxLR.div.offsetTop;
	this.boxLR.cX=x+d;
	this.boxLR.cY=y+d;
	// align upper right
	this.boxUR.div.style.left=x+"px";
	this.boxUR.cX=x+d; 
	// align lower left
	this.boxLL.div.style.top=y+"px";
	this.boxLL.cY=y+d;
	// resize the layout box itself
	this.div.style.width=(x+2*d+1)+"px";
	this.div.style.height=(y+2*d+1)+"px";
	// ... and the inner div
	this.innerDiv.style.width=x+"px";
	this.innerDiv.style.height=y+"px";
	if (this.incrementalEvents && this.notifyResize) eval(this.notifyResize);  
}

// Tweak the shape of the layout box to align with a change of position in the upper right
// control point.  The tricky thing here is that a non-zero y means the frame of reference 
// needs to move
ZVE.LayoutBox.prototype.adjustUR=function() {
	var d = ZVE.ACP_RADIUS;
	var x = this.boxUR.div.offsetLeft;
	var y = this.boxUR.div.offsetTop-this.boxUR.div.dsY;

	// Y should always be zero, if not, we need to move stuff
	if (y!=0) {
		// first the origin
		this.div.style.top=(this.div.offsetTop+y)+"px";
		// now move the bottom two control points in the opposite direction
		this.boxLL.div.style.top=(this.boxLL.div.offsetTop-y)+"px";
		this.boxLL.cY=this.boxLL.div.offsetTop+d;
		this.boxLR.div.style.top=(this.boxLR.div.offsetTop-y)+"px";
		this.boxLR.cY=this.boxLR.div.offsetTop+d;
		// now adjust the height of the inner and outer Divs
		h=this.boxLL.cY-this.boxUL.cY;
		this.innerDiv.style.height=(h+1)+"px";
		this.div.style.height=(h+2*d+2)+"px";
		// finally, reset y back to zero
		this.boxUR.div.dsY+=y;
		this.boxUR.div.style.top="0px";
	}
	this.boxUR.cX=x+d;
	// align lower right
	this.boxLR.div.style.left=x+"px";
	this.boxLR.cX=x+d; 
	// resize the layout box itself
	this.div.style.width=(x+2*d+1)+"px";
	// ... and the inner div
	this.innerDiv.style.width=x+"px";
	if (this.incrementalEvents) {
		if (this.notifyResize) eval(this.notifyResize);  
		if (this.notifyMove) eval(this.notifyMove);
	}  
}

// Tweak the shape of the layout box to align with a change of position in the lower left
// control point.  The tricky thing here is that a non-zero X means the frame of reference 
// needs to move
ZVE.LayoutBox.prototype.adjustLL=function() {
	var d = ZVE.ACP_RADIUS;
	var x = this.boxLL.div.offsetLeft-this.boxLL.div.dsX;
	var y = this.boxLL.div.offsetTop;
	// X should always be zero, if not, we need to move stuff
	if (x!=0) {
		// first the origin
		this.div.style.left=(this.div.offsetLeft+x)+"px";
		// now move the right two control points in the opposite direction
		this.boxLR.div.style.left=(this.boxLR.div.offsetLeft-x)+"px";
		this.boxLR.cX=this.boxLL.div.offsetLeft+d;
		this.boxUR.div.style.left=(this.boxUR.div.offsetLeft-x)+"px";
		this.boxUR.cX=this.boxUR.div.offsetLeft+d;
		// now adjust the width of the inner and outer Divs
		var w=this.boxUR.cX-this.boxUL.cX;
		this.innerDiv.style.width=(w+1)+"px";
		this.div.style.width=(w+2*d+2)+"px";
	}
	// finally, reset y back to zero
	this.boxLL.div.dsX+=x;
	this.boxLL.div.style.left="0px";
	this.boxLL.cY=y+d;
	// align lower right
	this.boxLR.div.style.top=y+"px";
	this.boxLR.cY=y+d; 
	// resize the layout box itself
	this.div.style.height=(y+2*d+1)+"px";
	// ... and the inner div
	this.innerDiv.style.height=y+"px";
	if (this.incrementalEvents) {
		if (this.notifyResize) eval(this.notifyResize);  
		if (this.notifyMove) eval(this.notifyMove);
	}  
}

// Tweak the shape of the layout box to align with a change of position in the upper left
// control point.  
ZVE.LayoutBox.prototype.adjustUL=function() {
	var d = ZVE.ACP_RADIUS;
	var x = this.boxUL.div.offsetLeft-this.boxUL.div.dsX;
	var y = this.boxUL.div.offsetTop-this.boxUL.div.dsY;
	if (x!=0) {
		// first the origin
		this.div.style.left=this.div.offsetLeft+x;
		// now move the right two control points in the opposite direction
		this.boxLR.div.style.left=this.boxLR.div.offsetLeft-x;
		this.boxLR.cX=this.boxLL.div.offsetLeft+d;
		this.boxUR.div.style.left=this.boxUR.div.offsetLeft-x;
		this.boxUR.cX=this.boxUR.div.offsetLeft+d;
		// now adjust the width of the inner and outer Divs
		var w=this.boxLR.div.offsetLeft-this.boxLL.div.offsetLeft;
		this.innerDiv.style.width=(w+1)+"px";
		this.div.style.width=(w+2*d+2)+"px";
	}
	if (y!=0) {
		// first the origin
		this.div.style.top=this.div.offsetTop+y;
		// now move the bottom two control points in the opposite direction
		this.boxLL.div.style.top=this.boxLL.div.offsetTop-y;
		this.boxLL.cY=this.boxLL.div.offsetTop+d;
		this.boxLR.div.style.top=this.boxLR.div.offsetTop-y;
		this.boxLR.cY=this.boxLR.div.offsetTop+d;
		// now adjust the height of the inner and outer Divs
		h=this.boxLL.cY-this.boxUR.cY;
		this.innerDiv.style.height=(h+1)+"px";
		this.div.style.height=(h+2*d+2)+"px";
	}
	// finally, reset point offsets back to zero
	this.boxUL.div.dsX+=x;
	this.boxUL.div.style.left="0px";
	this.boxUL.div.dsY+=y;
	this.boxUL.div.style.top="0px";
	if (this.incrementalEvents) {
		if (this.notifyResize) eval(this.notifyResize);  
		if (this.notifyMove) eval(this.notifyMove);
	}  
}

// a layout H-Line is an invisible container for adjusting the size and location of a
// contained line rendered as the bottom edge of a div.  It contains two control pips 
// used to effect the actual size changes to the length of the line. Thickness is 
// controlled externally.
ZVE.LayoutHLine = function(homeX, homeY, width, height) {
	var d=ZVE.ACP_RADIUS;
	var units = "pt";

	this.div = ZLM.simulateTag("div class='zenLayoutBox' style='position:absolute;' onmousedown='ZLM.drag(this,event);'");
	ZLM.initializeObject(this,this.div,"ZVE.LayoutBox");
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
	this.status="complete";

	ZLM.registerDragItem(this.div,this);
	this.div.style.top = (homeY-d)+units;
	this.div.style.left = (homeX-d)+units;
	this.div.style.width = (width+2*d)+units;
	this.div.style.height = (height+2*d)+units;
	this.div.style.fontSize="0px";
	this.div.style.lineHeight="0px";
	this.div.controller=this;

	this.innerDiv = ZLM.simulateTag("div class='zenLayoutBoxBounds' style='position:absolute; width:"+width+units+"; height:"+height+units+"'");
	this.innerDiv.style.top=d+units;
	this.innerDiv.style.left=d+units;

	this.boxUL=new ZVE.ControlPt(d,d,"H",this);
	this.boxUR=new ZVE.ControlPt(d+width,d,"H",this);

	this.div.appendChild(this.innerDiv);
	this.div.appendChild(this.boxUL.div);
	this.div.appendChild(this.boxUR.div);
	return(this);  
}

ZVE.LayoutHLine.prototype.hide=function() {
	this.homeX=ZRU.convertToPoints(this.div.offsetLeft+this.innerDiv.offsetLeft);
	this.homeY=ZRU.convertToPoints(this.div.offsetTop+this.innerDiv.offsetTop);
	this.width=ZRU.convertToPoints(this.innerDiv.offsetWidth);
	this.static=true;
	this.div.style.display="none";
}

ZVE.LayoutHLine.prototype.show=function() {
	this.static=false;
	this.div.style.display="block";
}

ZVE.LayoutHLine.prototype.getBoundNode=function() {
	return(this.targetNode);
}

ZVE.LayoutHLine.prototype.getHomeX=function() {
	if (this.static) return(this.homeX);
	return(ZRU.convertToPoints(this.div.offsetLeft+this.innerDiv.offsetLeft));
}

ZVE.LayoutHLine.prototype.getHomeY=function() {
	if (this.static) return(this.homeY);
	return(ZRU.convertToPoints(this.div.offsetTop+this.innerDiv.offsetTop));
}

ZVE.LayoutHLine.prototype.getWidth=function() {
	if (this.static) return(this.width);
	return(ZRU.convertToPoints(this.innerDiv.offsetWidth));
}

ZVE.LayoutHLine.prototype.getHeight=function() {
	return(0);
}

ZVE.LayoutHLine.prototype.getEditOpStatus=function() {
	return(this.status);
}

ZVE.LayoutHLine.prototype.setMinWidth=function(w) {
	this.minWidth=w-2;
}

ZVE.LayoutHLine.prototype.setMaxWidth=function(w) {
	this.maxWidth=w-2;
}

ZVE.LayoutHLine.prototype.enableIncrementalEvents=function(flag) {
	var p=false;
	if (flag=="true" || flag=="t") p=true;
	else if (flag=="True" || flag=="TRUE" || flag=="T") p=true;
	else if (flag==true || flag==1 || flag=="1") p=true;
	this.incrementalEvents=p;
}

ZVE.LayoutHLine.prototype.setResizeNotify=function(cbFunction) {
	this.notifyResize=cbFunction;
}

ZVE.LayoutHLine.prototype.setMoveNotify=function(cbFunction) {
	this.notifyMove=cbFunction;
}

ZVE.LayoutHLine.prototype.setDragXConstraint=function(cbFunction,parmStr) {
	if (!parmStr) parmStr="";
	if (cbFunction!=null) {
		var fnName=cbFunction.substring(0,cbFunction.indexOf("("));
		cbFunction=fnName+"(intendedX"+parmStr+");";
	}
	this.constrainX=cbFunction;
}

ZVE.LayoutHLine.prototype.setDragYConstraint=function(cbFunction,parmStr) {
	if (!parmStr) parmStr="";
	if (cbFunction!=null) {
		var fnName=cbFunction.substring(0,cbFunction.indexOf("("));
		cbFunction=fnName+"(intendedY"+parmStr+");";
	}
	this.constrainY=cbFunction;
}

ZVE.LayoutHLine.prototype.bindToNode=function(node,obj) {
	var d=ZVE.ACP_RADIUS;
	this.targetNode=node;
	this.targetObj;
	var w=ZRU.convertToPoints(node.clientWidth);
	var h=ZRU.convertToPoints(node.clientHeight);
	if (!ZLM.isIE) {
		w-=2;
		h-=2;
	}
	if (w<0) w=0;
	if (h<0) h=0;
	ZLM.reparent(this.div,node.offsetParent);
	this.resize(w,h);  
	this.reposition(parseInt(node.style.left,10),parseInt(node.style.top,10));
	ZLM.reparent(this.div,node.offsetParent);
}

ZVE.LayoutHLine.prototype.resize=function(w,h,forceTarget){
	var u = "pt";
	var d=ZVE.ACP_RADIUS;
	this.midPt=Math.round((h-1)/2);
	this.div.style.width=(w+2*d)+u;
	this.div.style.height=(h+2*d)+u;
	this.innerDiv.style.width=w+u;
	this.innerDiv.style.height=h+u;
	this.boxUR.div.style.left=(0+w)+u;
	this.boxUR.div.style.top=this.midPt+u;
	this.boxUL.div.style.top=this.midPt+u;

	if (forceTarget) {
		if (this.notifyMove) eval(this.notifyMove);
		if (this.notifyResize && this.getDragObject(wrapper.node)!="*") eval(this.notifyResize);
	}
}

ZVE.LayoutHLine.prototype.reposition=function(x,y,forceTarget) {
	var u = "pt";
	var d=ZVE.ACP_RADIUS;
	this.div.style.top=(y-d)+u;
	this.div.style.left=(x-d)+u;	
	if (forceTarget) {
		if (this.notifyMove) eval(this.notifyMove);
	}
}

ZVE.LayoutHLine.prototype.getDragObject=function(n) {
	if (n==this.div) return("*");
	if (n==this.boxUL.div) return("L");
	if (n==this.boxUR.div) return("R");
	return("-");
}

// Start drag of either the whole box (oId=="*") or one of the four corners. In the case of a corner
// drag, precalculate limiting bounds for the drag operation based on the initial geometry of the 
// layoutBox and any available user guidelines.
ZVE.LayoutHLine.prototype.startDrag=function(engine, wrapper) {
	this.status="active";
	var n=wrapper.node;
	var oId=this.getDragObject(n);
	n.dsX=ZRU.convertToPoints(wrapper.node.offsetLeft);
	n.dsY=ZRU.convertToPoints(wrapper.node.offsetTop);

	if (oId=="r" || oId=="R") {
		if (this.minWidth!=null) n.minX=this.minWidth;
		else n.minX=0;
		if (this.maxWidth!=null) n.maxX=this.maxWidth;
		else n.maxX=null;
	}
	else if (oId=="l" || oId=="L") {
		if (this.maxWidth!=null) n.minX=ZRU.convertToPoints(this.boxUR.div.offsetLeft)-this.maxWidth;
		else n.minX=null;
		if (this.minWidth!=null) n.maxX=ZRU.convertToPoints(this.boxUR.div.offsetLeft)-this.minWidth;
		else n.maxX=this.boxUR.div.offsetLeft;
	}
}

ZVE.LayoutHLine.prototype.constrainDragX=function(engine,wrapper,intendedX) {
//ADJUST FOR POINTS
	var n=wrapper.node;
	switch(this.getDragObject(n)) {
		case "*":
			if (this.constrainX!=null) {
				var d = ZVE.ACP_RADIUS;
				intendedX+=d;
				intendedX=parseInt(eval(this.constrainX))-d;
			}
			return(intendedX);
		case "L":
		case "R":
			if (n.minX!=null && intendedX<=n.minX) return(n.minX);
			if (n.maxX!=null && intendedX>n.maxX) return(n.maxX);
			return(intendedX);
	}
	return(intendedX);
}

ZVE.LayoutHLine.prototype.constrainDragY=function(engine,wrapper,intendedY) {
// ADJUST FOR POINTS
	var n=wrapper.node;
	var obj = this.getDragObject(n);
	switch(obj) {
		case "*":
			if (this.constrainY!=null) {
				var d = ZVE.ACP_RADIUS;
				intendedY+=d;
				intendedY=parseInt(eval(this.constrainY))-d;
			}
			if (this.incrementalEvents && this.notifyMove) eval(this.notifyMove);  
			return(intendedY);
		case "R":
			this.boxUR.div.style.top=this.midPt+"px";
			this.adjustUR();
			return(this.midPt);
			break;
		case "L":
			this.boxUL.div.style.top=this.midPt+"px";
			this.adjustUL();
			return(this.midPt);
			break;
	}
	return(intendedY);
}

ZVE.LayoutHLine.prototype.endDrag=function(engine,wrapper) {
	this.status="complete";
	if (this.notifyMove) eval(this.notifyMove);
	if (this.notifyResize && this.getDragObject(wrapper.node)!="*") eval(this.notifyResize);
}

// Tweak the shape of the layout box to align with a change of position in the upper right
// control point.  The tricky thing here is that a non-zero y means the frame of reference 
// needs to move
ZVE.LayoutHLine.prototype.adjustUR=function() {
//ADJUST FOR POINTS
	var d = ZVE.ACP_RADIUS;
	var x = this.boxUR.div.offsetLeft;
	
	this.boxUR.cX=x+d;
	// resize the layout box itself
	this.div.style.width=(x+2*d+1)+"px";
	// ... and the inner div
	this.innerDiv.style.width=x+"px";
	if (this.incrementalEvents) {
		if (this.notifyResize) eval(this.notifyResize);  
		if (this.notifyMove) eval(this.notifyMove);
	}  
}

// Tweak the shape of the layout box to align with a change of position in the upper left
// control point.  
ZVE.LayoutHLine.prototype.adjustUL=function() {
//ADJUST FOR POINTS
	var d = ZVE.ACP_RADIUS;
	var x = this.boxUL.div.offsetLeft-this.boxUL.div.dsX;
	if (x!=0) {
		// first the origin
		this.div.style.left=this.div.offsetLeft+x;
		// now move the right control point in the opposite direction
		this.boxUR.div.style.left=this.boxUR.div.offsetLeft-x;
		this.boxUR.cX=this.boxUR.div.offsetLeft+d;
		// now adjust the width of the inner and outer Divs
		var w=this.boxUR.div.offsetLeft;
		this.innerDiv.style.width=(w+1)+"px";
		this.div.style.width=(w+2*d+2)+"px";
	}
	// finally, reset point offsets back to zero
	this.boxUL.div.dsX+=x;
	this.boxUL.div.style.left="0px";
	if (this.incrementalEvents) {
		if (this.notifyResize) eval(this.notifyResize);  
		if (this.notifyMove) eval(this.notifyMove);
	}  
}

//#############################################################################################
// Control point is a dragable box on screen used to resize areas it is absolutely positioned
// and consists of a zenPassivePip centered inside an zenActivePip
//#############################################################################################

ZVE.ControlPt = function(centerX, centerY, pos, controller) {
	var oD = ZVE.ACP_RADIUS; //outer distance
	var iD = ZVE.PCP_RADIUS; //inner distance

	this.control = controller;
	this.cX = centerX;
	this.cY = centerY;
	this.active = false;
	this.div = ZLM.simulateTag("div class='zenActivePip' onmousedown='ZLM.drag(this,event)'");
	ZLM.registerDragItem(this.div,this.control);
	this.initPip(this.div,centerX-oD,centerY-oD,2*oD+1,"none");

	if (pos=="LR" || pos=="UL") this.div.style.cursor="nw-resize";
	else if (pos=="LL" || pos=="UR") this.div.style.cursor="sw-resize";
	else if (pos=="H") this.div.style.cursor="ew-resize";

	this.dot = ZLM.simulateTag("div class='zenPassivePip'");
	this.initPip(this.dot,oD-iD,oD-iD,2*iD+1,"black");
	this.div.appendChild(this.dot);

	this.hilite = ZLM.simulateTag("div");
	this.initPip(this.hilite,iD/2,iD/2,iD+1,"yellow");
	this.dot.appendChild(this.hilite);
}   

ZVE.ControlPt.prototype.initPip=function(div,x,y,sz,color) {
	var u = "pt";
	div.style.position="absolute";
	div.style.top = y+u;
	div.style.left = x+u;
	div.style.width = sz+u;
	div.style.height = sz+u;
	div.style.background=color;
	div.style.border="none";
	div.style.fontSize="0px";
	div.style.lineHeight="0px";
	div.style.overflow="hidden";
}

//=========================
if (!ZRU) var ZRU={}

//=============================================================================	
ZRU.BannerItem=function() {
	this.boxNum=null;
	this.banner=null;
	this.itemClass=null;
	this.pristine=true;
	if (zenPage) this.setGC(ZRU.initGC());
	return(this);
}

ZRU.BannerItem.prototype.initBase=function() {
	this.body=ZLM.simulateTag("div class='bannerItem'");
	this.base.className = 'bannerItem';
	this.base.appendChild(this.body);
}

ZRU.BannerItem.prototype.setGC=function(gc,skipSize) {
	var o = null;
	if (skipSize) o = ZRU.saveGeometry(this.gc);
	this.gc = ZRU.getDisplayPropertyPanel().cloneGC(gc);
	if (skipSize) ZRU.restoreGeometry(this.gc,o);
	this.refresh();
}

ZRU.BannerItem.prototype.updateGC=function(mergeGC) {
	var gc = this.gc;
	for (var p in mergeGC) {
		if (p.indexOf("Apropos")== -1) { // don't reset applicable sections
			gc[p] = mergeGC[p];
		}
	}
	this.refresh();
}

ZRU.BannerItem.prototype.copyGC=function() {
	var gc = ZRU.getDisplayPropertyPanel().cloneGC(this.gc);
	return(gc);
}

ZRU.BannerItem.prototype.activeGC = function() {
	if (this.gc) return(true);
	if (zenPage) {
		this.setGC(ZRU.initGC());
		return(true);
	}
	return(false);
}

ZRU.BannerItem.prototype.setBoxNum=function(n) {
	this.boxNum=n;
	this.base.setAttribute("boxId",n);
}

ZRU.BannerItem.prototype.setBanner=function(b) {
	this.banner=b;
}

ZRU.BannerItem.prototype.setItemClass=function(c) {
	this.itemClass=c;
}

ZRU.BannerItem.prototype.getHomeY = function() {
	if (this.activeGC()) return(this.gc.sizeTop);
	return(0);
}

ZRU.BannerItem.prototype.getHomeX = function() {
	if (this.activeGC()) return(this.gc.sizeLeft);
	return(0);
}

ZRU.BannerItem.prototype.getHeight = function() {
	if (this.activeGC()) return(this.gc.sizeHeight);
	return(0);
}

ZRU.BannerItem.prototype.getWidth = function() {
	if (this.activeGC()) return(this.gc.sizeWidth);
	return(0);
}

ZRU.BannerItem.prototype.setPosition=function(x,y) {
	if (x<0) x=0;
	if (y<0) y=0;
	var u = "pt";
	if (this.activeGC()) {
		this.gc.sizeTop = y;
		this.gc.sizeLeft = x;
	}
	this.base.style.top=y+u;
	this.base.style.left=x+u;
	this.box.bindToNode(this.base,this);
}

ZRU.BannerItem.prototype.setPositionPt=function(xPt,yPt) {
	if (xPt<0) xPt=0;
	if (yPt<0) yPt=0;
	this.base.style.top=yPt+"pt";
	this.base.style.left=xPt+"pt";
	if (this.activeGC()) {
		this.gc.sizeLeft = xPt;
		this.gc.sizeTop = yPt;
	} 	
	this.box.bindToNode(this.base,this);
}

ZRU.BannerItem.prototype.setSizePt=function(w,h) {
//alert('set size '+w+' x '+h);
	if (w<1) w=1;
	if (h<1) h=1;
	this.base.style.height = h+"pt";
	this.base.style.width = w+"pt";
	if (this.activeGC()) {
		this.gc.sizeWidth = w;
		this.gc.sizeHeight = h;
	} 
	if (this.adjustBodySize) this.adjustBodySize();
	this.box.bindToNode(this.base,this);
}

ZRU.BannerItem.prototype.resizeLayoutBox=function() {
	var u = "pt";
	var y=this.box.getHomeY();
	var x=this.box.getHomeX();
	var h=this.box.getHeight();
	var w=this.box.getWidth();

	this.base.style.top=y+u;
	this.base.style.left=x+u;
	this.base.style.height=h+u;
	this.base.style.width=w+u;
	if (this.activeGC()) {
		this.gc.sizeTop = y;
		this.gc.sizeLeft = x;
		this.gc.sizeWidth = w;
		this.gc.sizeHeight = h;
	}
	this.pristine=false;
	ZRU.getDisplayPropertyPanel().setActiveGC(this.gc)
}

ZRU.BannerItem.prototype.moveLayoutBox=function(bx) {
	var u = "pt";
	var x=this.box.getHomeX();
	var y=this.box.getHomeY();
	if (this.activeGC()) {
		this.gc.sizeTop = y;
		this.gc.sizeLeft = x;
	}
	this.base.style.top=y+u;
	this.base.style.left=x+u;
	ZRU.getDisplayPropertyPanel().setActiveGC(this.gc)
}

ZRU.BannerItem.prototype.setSelection=function(event) {
	if (event && event.shiftKey) {
		if (this.base.className == 'bannerItem') {
			zenPage._editor.addToSelection(this);
			ZLM.killBrowserSelectionProcess();
			return(ZLM.killEvent(event));
		}
		else { // previously was selected, remove it
			zenPage._editor.removeFromSelection(this);
			ZLM.killBrowserSelectionProcess();
			return(ZLM.killEvent(event));
		}
	}
	else {
		zenPage._editor.setSelection(this);
		if (event) return(ZLM.killEvent(event));
	}
}

ZRU.BannerItem.prototype.handleRightClick=function(event) {
//alert("default right click handler");
	return(ZLM.killEvent(event));
}

ZRU.BannerItem.prototype.select=function() {
	var bx = this.box;
	var bxd = bx.div;
	var e = zenPage._editor.getTextEditorWidget();
	if (e && e._isActive) e.done();	

	bx.bindToNode(this.base,this);
	if (!bxd.oncontextmenu) ZLM.setLocalAttribute(bxd,"oncontextmenu",this.objHook+"handleRightClick(event);");
	bx.show();
	bx.selected=true;
	if (zenPage._editor._selItems[0]!=this) {
		this.base.className = 'bannerItemAlsoSelected';
	}
	else this.base.className = 'bannerItemSelected';
}

ZRU.BannerItem.prototype.unselect=function() {
	this.box.hide();
	this.box.selected=false;
	this.base.className = 'bannerItem';
}

ZRU.BannerItem.prototype.refresh=function() {
}

ZRU.BannerItem.prototype.remove=function() {
	if (this.box && this.box.unbind) this.box.unbind();
	if (this.banner) this.banner.removeItem(this);
}

ZRU.BannerItem.prototype.exportJSON=function(data) {
	data.push("NEED TO OVERLOAD exportJSON METHOD FOR BANNER ITEM");
}
	
//=============
ZRU.BannerTextItem=function(div) {
	ZLM.initializeObject(this,div,"ZRU.BannerTextItem");
	this.formatNumber=null;
	this.createBody();
	return(this);
}

ZRU.BannerTextItem.create=function() {
	var div=ZLM.simulateTag("div class='bannerTextItem' ");
	return(new ZRU.BannerTextItem(div));
}

ZRU.BannerTextItem.restoreObj=function(o,area) {
	var dName = XML.unescapeStr(o.f);
	if (dName.indexOf('../')==0) {
		var sName = dName.split('/');
		dName = sName[sName.length-1];
	}
	var div=ZLM.simulateTag("div class='bannerTextItem' ");
	var n = new ZRU.BannerTextItem(div);
	if (area) area.appendChild(n.base);

	n.fName = XML.unescapeStr(o.f);
	var txtStr = "";
	if (dName.indexOf("$")==0) {
		txtStr="("+dName+")";
		n.itemClass="DVAR";
	}
	else if (dName.indexOf('!')==0) {
		txtStr=dName.substring(1);
		n.itemClass="CAPN";
	}
	else if (dName.indexOf('@')==0) {
		txtStr="{"+dName.substring(1)+"}";
		n.itemClass="ATTR";
	}
	else {
		txtStr="{"+dName+"}";
		n.itemClass="ELEM";
	}
	var txtNode=document.createTextNode(txtStr);
	n.textDiv.appendChild(txtNode);
	n.setGC(ZRU.getDisplayPropertyPanel().makeGCFromObj(o.gc));
	n.formatNumber = o.fn;
	n.box.bindToNode(n.body,n);
	return(n);
}

ZRU.BannerTextItem.prototype=new ZRU.BannerItem();

ZRU.BannerTextItem.prototype.createBody=function() {
	this.initBase();
	this.box=new ZVE.LayoutBox(0,0,10,10);
	this.box.setResizeNotify(this.objHook+"resizeLayoutBox();");
	this.box.setMoveNotify(this.objHook+"moveLayoutBox();");
	this.box.setTrueClickNotify(this.objHook+"editCaption();");
	this.box.enableIncrementalEvents(true);
	this.unselect();

	this.background=ZLM.simulateTag("div class='bannerBoxItemBG' style='position:absolute;top:0px;left:0px;right:0px;bottom:0px;'");
	this.body.appendChild(this.background);
	this.textDiv=ZLM.simulateTag("div class='bannerBoxItemTXT' style='position:absolute;top:0px;left:0px;right:0px;bottom:0px;'");
	this.body.appendChild(this.textDiv);
	this.coverplate=ZLM.simulateTag("div class='bannerBoxItemPlate' style='position:absolute;top:0px;left:0px;right:0px;bottom:0px;background-color:#ffffff;opacity:0.01;'");
	this.body.appendChild(this.coverplate);

	ZLM.setLocalAttribute(this.base,"onmousedown",this.objHook+"setSelection(event);");
}

ZRU.BannerTextItem.prototype.setGC=function(gc,skipSize) {
	var o = null;
	if (skipSize) o = ZRU.saveGeometry(this.gc);
	this.gc = ZRU.getDisplayPropertyPanel().cloneGC(gc);
	this.gc.strokeApropos = false;
	this.gc.fillApropos = true;
	this.gc.textApropos = true;
	this.gc.tableApropos = false;
	this.gc.sizeApropos = true;
	if (skipSize) ZRU.restoreGeometry(this.gc,o);
	this.refresh();
}

ZRU.BannerTextItem.prototype.handleRightClick=function(event) {
	if (this.itemClass=="ATTR" || this.itemClass=="ELEM") {
		var win = zenPage._editor.getTextInfoPopup();
		var wiz = zenPage._editor.getTextInfoWizard();
		wiz.setOkayCB(this.objHook+"setFormatCB();");
		wiz.setSource(this.fName);
		if (this.formatNumber) wiz.setFormat(this.formatNumber);
		else wiz.setFormat("");
		var x = ZLM.getPageOffsetLeft(this.base);
		var y = ZLM.getPageOffsetTop(this.base);
		win.headerStyle = "full"
		win.show(x,y,false);
	}
	return(ZLM.killEvent(event));
}

ZRU.BannerTextItem.prototype.unselect=function() {
	if (this.itemClass=="CAPN") {
		this.banner.doneCaptionEdit();
	}
	this.box.hide();
	this.box.selected=false;
	this.base.className = 'bannerItem';
}

ZRU.BannerTextItem.prototype.setFormatCB=function() {
	var wiz = zenPage._editor.getTextInfoWizard();
	this.formatNumber = wiz.getFormat();
}

ZRU.BannerTextItem.prototype.getDisplayValue=function() {
	return(this.fName.substring(1));
}

ZRU.BannerTextItem.prototype.setValue=function(displayName) {
	if (this.itemClass=="DVAR") {
		this.fName = "$"+displayName;
		displayName = "("+displayName+")";
	}
	else if (this.itemClass=="CAPN") {
		this.fName = "!"+displayName;
	}
	else if (this.itemClass=="ATTR") {
		this.fName = "@"+displayName;
		displayName = "{"+displayName+"}";
	}
	else {
		this.fName = displayName;
		displayName = "{"+displayName+"}";
	}
	this.textDiv.removeChild(this.textDiv.firstChild);
	var txtNode=document.createTextNode(displayName);
	this.textDiv.appendChild(txtNode);
}

ZRU.BannerTextItem.prototype.editCaption=function() {
	if (this.base.className=="bannerItemSelected" && this.itemClass=="CAPN") {
		this.banner.editCaption(this);
	}
}

ZRU.BannerTextItem.prototype.setContents=function(fieldName,path) {
	if (path) this.fName = path+fieldName;
	else {
		this.fName=fieldName;
		if (fieldName.indexOf('../')==0) {
			var sName = fieldName.split('/');
			fieldName = sName[sName.length-1];
		}
	}
	this.itemClass = ZRU.classifyTextDatum(fieldName);
	this.body.innerHTML=ZRU.makeAvatarString(fieldName);

	this.textDiv.style.whiteSpace="nowrap";
	var sz = this.getNativeSize();
	var w = sz.width+"pt";
	var h = sz.height+"pt";
	this.base.style.height = h;
	this.base.style.width = w;
	if (this.activeGC()) {
		this.gc.sizeWidth = w;
		this.gc.sizeHeight = h;
	} 	
	this.box.bindToNode(this.base,this);
}

ZRU.BannerTextItem.prototype.cloneObj=function() {
	var o = this.exportObj();
	var n = ZRU.BannerTextItem.restoreObj(o,null);
	return(n);
}

ZRU.BannerTextItem.prototype.exportObj=function() {
	var o = {};
	o.t='txt';
	o.gc = ZRU.getDisplayPropertyPanel().projectGCAsObj(this.gc);
	o.c = this.itemClass;
	o.f = XML.escapeStr(this.fName);

	if (this.formatNumber) o.fn = this.formatNumber;
	else o.fn="";
	return(o);
}

ZRU.BannerTextItem.prototype.exportJSON=function(data) {
	data.push("{itemType:'_textItem',");
	var gcStr = ZRU.getDisplayPropertyPanel().projectGCAsJSON(this.gc);
	data.push("gc:{"+gcStr+"},");
	data.push("itemClass:'_"+this.itemClass+"',");
	data.push("fieldName:'"+this.fName+"',");
	if (this.formatNumber) data.push("formatNumber:'"+this.formatNumber+"'");
	else data.push("formatNumber:''");
	data.push("}");
}

ZRU.BannerTextItem.prototype.exportFOSVG = function(foData) {
	var g = this.gc;
	var s = [];
	s.push("font-size:"+g.textSize+";");
	if (g.textFont=="cursive") s.push("font-family:\"Comic Sans MS\",cursive;");
	else s.push("font-family:"+g.textFont+";");
	s.push("fill:"+g.textColor+";");
	s.push("fill-opacity:"+(g.textOpacity)+";");
	if (g.textBold) s.push("font-weight:bold;");
	if (g.textItalic) s.push("font-style:italic;");
	if (g.textUnderline) s.push("text-decoration:underline;");
	var tx = g.sizeLeft;
	var ty = g.sizeTop+(5*g.textSize)/6; // Guestimate to account for descenders
	if (g.textJustify=='right') {
		tx += g.sizeWidth;
		s.push("text-anchor:end;");
	}
	else if (g.textJustify=='center') {
		tx += g.sizeWidth/2;
		s.push("text-anchor:middle;");
	}
	var styleStr = s.join('');

	foData.push('<svg:rect x="'+g.sizeLeft+'" y="'+g.sizeTop+'" width="'+g.sizeWidth+'" height="'+g.sizeHeight+'" style="fill:'+g.fillColor+';fill-opacity:'+(g.fillOpacity)+';stroke-width:0;" />');
	foData.push('<svg:text x="'+tx+'" y="'+ty+'" style="'+styleStr+'" >');
	if (this.itemClass=="CAPN") {
		foData.push(XML.escapeStr(this.fName.substring(1)));
	}
	else {
		if (this.fName.charAt(0)=='$') {
			switch(this.fName) {
			case '$GroupSize':
				foData.push("<xsl:number/>");
				break;
			case '$PageNumber':
				foData.push("<fo:page-number/>");
				break;
			case '$PageCount':
				foData.push("<fo:page-number-citation ref-id='%ZENLastPage'/>");
				break;
			case '$PageOfCount':
				foData.push("<fo:page-number/> of <fo:page-number-citation ref-id='%ZENLastPage'/>");
				break;
			case '$PageSlashCount':
				foData.push("<fo:page-number/>/<fo:page-number-citation ref-id='%ZENLastPage'/>");
				break;
			}
		}
		else {
			if (this.formatNumber && this.formatNumber.length>0) {
				foData.push('<xsl:value-of select="format-number('+this.fName+',\''+this.formatNumber+'\')" />');
			}
			else {
				foData.push('<xsl:value-of select="'+this.fName+'"/>');
			}
		}
	}
	foData.push('</svg:text>');
}

ZRU.BannerTextItem.prototype.getNativeSize=function() {
	var tNode = this.textDiv.cloneNode(true);
	if (!this.gc) return({width:10,height:10});
	var bs = tNode.style;
	var g = this.gc;
	if (g.textBold) bs.fontWeight="bold";
	if (g.textItalic) bs.fontStyle="italic";
	if (g.textUnderline) bs.textDecoration="underline";

	bs.fontSize = g.textSize+"pt";
	bs.textAlign = g.textJustify;
	bs.fontFamily = g.textFont;
	if (g.textFont=="cursive") bs.fontFamily = "\"Comic Sans MS\",cursive";
	bs.position="absolute";
	bs.display="block";
	bs.width="";
	bs.height="";
	document.body.appendChild(tNode);
	var w = ZRU.convertToPoints(tNode.offsetWidth);
	var h = ZRU.convertToPoints(tNode.offsetHeight);
	document.body.removeChild(tNode);
	return({width:w,height:h});
}

ZRU.BannerTextItem.prototype.refresh=function() {
	if (!this.gc) return;

	var ts = this.textDiv.style;
	var bgs = this.background.style;

	var bs = this.body.style;
	var fs = this.base.style;

	var g = this.gc;
	if (g.fillOpacity==0) bgs.background = "transparent";
	else {
		bgs.background = g.fillColor;
		bgs.opacity = g.fillOpacity;
	}
	if (g.textBold) ts.fontWeight="bold";
	else ts.fontWeight="normal";
	if (g.textItalic) ts.fontStyle="italic";
	else ts.fontStyle="normal";
	if (g.textUnderline) ts.textDecoration="underline";
	else ts.textDecoration="none";

	ts.color = g.textColor;
	ts.opacity = g.textOpacity;
	ts.fontSize = g.textSize+"pt";
	ts.textAlign = g.textJustify;
	ts.fontFamily = g.textFont;

	bgs.borderStyle = "none";
	if (g.textFont=="cursive") ts.fontFamily = "\"Comic Sans MS\",cursive";
	bs.width = "100%";
	bs.height = "100%";

	fs.top=g.sizeTop+"pt";
	fs.left=g.sizeLeft+"pt";
	fs.height=g.sizeHeight+"pt";
	fs.width=g.sizeWidth+"pt";
	fs.borderStyle = "none";
	this.box.bindToNode(this.base,this);	
}

//=============
ZRU.BannerBoxItem=function(div) {
	ZLM.initializeObject(this,div,"ZRU.BannerBoxItem");
	this.blankURL = "http://"+window.location.host+"/csp/broker/images/placeimagehere.png";
	this.createBody();
	this.dURL = null;
	return(this);
}

ZRU.BannerBoxItem.create=function() {
	var div=ZLM.simulateTag("div class='bannerBoxItem' ");
	return(new ZRU.BannerBoxItem(div));
}

ZRU.BannerBoxItem.restoreObj=function(o,area) {
	var div=ZLM.simulateTag("div class='bannerBoxItem' ");
	var n = new ZRU.BannerBoxItem(div)
	if (area) area.appendChild(n.base);
	n.setContents(o.gc.zl,o.gc.zt,o.gc.zw,o.gc.zh,o.c,o.url);
	n.setGC(ZRU.getDisplayPropertyPanel().makeGCFromObj(o.gc));
	if (o.durl) n.setDynamicURL(o.durl);
	return(n);
}

ZRU.BannerBoxItem.prototype=new ZRU.BannerItem();

ZRU.BannerBoxItem.prototype.createBody=function() {
	this.initBase();
	this.body.style.width="100%";
	this.body.style.height="100%";
	this.box=new ZVE.LayoutBox(0,0,10,10);
	this.box.setResizeNotify(this.objHook+"resizeLayoutBox();");
	this.box.setMoveNotify(this.objHook+"moveLayoutBox();");
	this.box.enableIncrementalEvents(true);
	this.unselect();
	ZLM.setLocalAttribute(this.base,"onmousedown",this.objHook+"setSelection(event);");
}

ZRU.BannerBoxItem.prototype.setGC=function(gc,skipSize) {
	var o = null;
	if (skipSize) o = ZRU.saveGeometry(this.gc);
	if (zenPage && zenPage._editor)	this.gc = ZRU.getDisplayPropertyPanel().cloneGC(gc);
	else this.gc = gc;
	this.gc.strokeApropos = true;
	this.gc.fillApropos = true;
	this.gc.tableApropos = false;
	this.gc.textApropos = false;
	this.gc.sizeApropos = true;
	if (skipSize) ZRU.restoreGeometry(this.gc,o);
	this.refresh();
}

ZRU.BannerBoxItem.prototype.setContents=function(xPx,yPx,wPx,hPx,type,url) {
	this.url = url;
	if (type == "image" || type == "IMAGE") {
		this.itemClass = "IMAGE";
		this.dURL = null;
		this.imageDiv = ZLM.simulateTag("img src='"+url+"' style='width:100%; height:100%;' oncontextMenu='"+this.objHook+"handleRightClick(event)'; ");
		this.srcDiv = ZLM.simulateTag("div style='position:absolute;left:0px;bottom:0px;width:100%;text-align:center;margin-bottom:10px;'");
		this.body.appendChild(this.imageDiv);
		this.body.appendChild(this.srcDiv);
	}
	else {
		this.itemClass = "BOX";
		this.url = null;
		this.dURL = null;
	}
	this.base.style.top = yPx+"px";
	this.base.style.left = xPx+"px";
	this.base.style.height = hPx+"px";
	this.base.style.width = wPx+"px";
	if (this.activeGC()) {
		this.gc.sizeTop = ZRU.convertToPoints(yPx);
		this.gc.sizeLeft = ZRU.convertToPoints(xPx);
		this.gc.sizeWidth = ZRU.convertToPoints(wPx);
		this.gc.sizeHeight = ZRU.convertToPoints(hPx);
		this.adjustBodySize();
	} 	
	this.box.bindToNode(this.base,this);
	if (type == "image") {
		ZLM.setLocalAttribute(this.box.base,"oncontextMenu",this.objHook+"handleRightClick(event);");
	}
}

ZRU.BannerBoxItem.prototype.setImageURL=function(url) {
	if (!url || url=="") url = this.blankURL;
	this.imageDiv.src = url;
	this.url = url;
	this.srcDiv.innerHTML = "";
}

ZRU.BannerBoxItem.prototype.setImageSrc=function(ffname) {
	var splitPt = ffname.indexOf("CSP");
	var rName = ffName;
	if (splitPt>0) rName = ffname.substring(splitPt);
	rName = rName.split('\\').join('/');
	var sepPoint = rName.indexOf("://");
	var url = location.protocol+"//"+location.host+"/"+rName;
	this.setImageURL(url);
}

ZRU.BannerBoxItem.prototype.setDynamicURL=function(fieldName) {
	this.dURL = fieldName;
	var url = location.protocol+"//"+location.host+"/csp/broker/images/datadrivenimage.png";
	this.imageDiv.src = url;
	this.srcDiv.innerHTML = "( "+fieldName+" )";
}

ZRU.BannerBoxItem.prototype.cloneObj=function() {
	var o = this.exportObj();
	var n = ZRU.BannerBoxItem.restoreObj(o,null);
	return(n);
}

ZRU.BannerBoxItem.prototype.exportObj=function() {
	var o = {}
	o.t='box';
	o.gc = ZRU.getDisplayPropertyPanel().projectGCAsObj(this.gc);
	o.c = this.itemClass;
	o.url = this.url;
	o.durl = this.dURL;
	return(o);
}
	
ZRU.BannerBoxItem.prototype.exportJSON=function(data) {
	data.push("{itemType:'_boxItem',");
	var gcStr = ZRU.getDisplayPropertyPanel().projectGCAsJSON(this.gc);
	data.push("gc:{"+gcStr+"},");
	data.push("itemClass:'_"+this.itemClass+"',");
	data.push("url:'"+this.url+"'");
	data.push("}");
}

ZRU.BannerBoxItem.prototype.exportFOSVG = function(foData) {
	var g = this.gc;
	var s = [];
	s.push('x="'+g.sizeLeft+'"');
	s.push('y="'+g.sizeTop+'"');
	s.push('width="'+g.sizeWidth+'"');
	s.push('height="'+g.sizeHeight+'"');
 	var geoStr = s.join(" ");
	var s = [];
	if (g.fillOpacity>0) {
		s.push('fill-opacity:'+(g.fillOpacity));
		s.push('fill:'+g.fillColor);	
	}
	if (g.strokeStyle!="none") {
		var sw = g.strokeWidth;
		s.push('stroke:'+g.strokeColor);
		s.push('stroke-width:'+sw);
		s.push('stroke-opacity:'+(g.strokeOpacity));
		if (g.strokeStyle=="dotted") s.push('stroke-dasharray:'+sw+","+sw);
		if (s.strokeStyle=="dashed") s.push('stroke-dasharray:'+(4*sw)+','+2*sw);
	}
	var styleStr = ""
	if (s.length>0) styleStr = 'style="'+s.join(';')+'"';

	if (this.itemClass=="IMAGE") {
		var url = this.url;
		if (this.dURL) {
			foData.push('<svg:image  preserveAspectRatio="none" '+geoStr+' '+styleStr+' >');
			foData.push('<xsl:attribute name="xlink:href">');
//foData.push('<xsl:text>'+location.protocol+'//'+location.host+'/</xsl:text>');
			foData.push('<xsl:value-of select="'+this.dURL+'"/>');
			foData.push('</xsl:attribute>');
		}
		else {
			foData.push('<svg:image xlink:href="'+url+'" preserveAspectRatio="none" '+geoStr+' '+styleStr+' >');
		}
		foData.push('</svg:image>');
	}
	else {
		foData.push('<svg:rect '+geoStr+' '+styleStr+' />');
	}
}

ZRU.BannerBoxItem.prototype.adjustBodySize = function() {
	var w = this.gc.sizeWidth;
	var h = this.gc.sizeHeight;
	this.base.style.width=w+"pt";
	this.base.style.height=h+"pt";

	if (this.gc.strokeStyle!="none") {
		w-=2*this.gc.strokeWidth;
		h-=2*this.gc.strokeWidth;
		if (w<0) w=0;
		if (h<0) h=0;
		this.body.style.width = w+"pt";
		this.body.style.height = h+"pt";
	}
	else {
		this.body.style.width = "100%";
		this.body.style.height = "100%";
	}
}

ZRU.BannerBoxItem.prototype.refresh=function() {
	if (!this.gc) return;
	var str = ZRU.getDisplayPropertyPanel().projectGCAsJS(this.gc);

	var ss=this.gc.strokeWidth+"pt "+this.gc.strokeStyle+" "+this.gc.strokeColor;
	this.body.style.border = ss;

	if (this.gc.fillOpacity == 0) this.body.style.background = "transparent";
	else {
		this.body.style.background = this.gc.fillColor;
		this.body.style.opacity = this.gc.fillOpacity;
	}
	this.adjustBodySize();

	this.base.style.top=this.gc.sizeTop+"pt";
	this.base.style.left=this.gc.sizeLeft+"pt";

	this.box.bindToNode(this.base,this);	
}

ZRU.BannerBoxItem.prototype.resizeLayoutBox=function() {
	var u = "pt";
	var y=this.box.getHomeY();
	var x=this.box.getHomeX();
	var h=this.box.getHeight();
	var w=this.box.getWidth();
	this.base.style.top=y+u;
	this.base.style.left=x+u;
	this.base.style.height=h+u;
	this.base.style.width=w+u;
	if (this.activeGC()) {
		this.gc.sizeTop = y;
		this.gc.sizeLeft = x;
		this.gc.sizeWidth = w;
		this.gc.sizeHeight = h;
	}
	this.adjustBodySize();
	this.pristine=false;
	ZRU.getDisplayPropertyPanel().setActiveGC(this.gc);
}

ZRU.BannerBoxItem.prototype.pickURL=function() {
	var CB = this.objHook+"setImageURL(value);";
	zenPage.getUserImageURLSelection(CB);
}

ZRU.BannerBoxItem.prototype.handleRightClick=function(event) {
	if (this.itemClass!="IMAGE") return(ZLM.killEvent(event));

	var win = zenPage._editor.getImageURLPopup();
	var wiz = zenPage._editor.getImageURLWizard();
	wiz.setOkayCB(this.objHook+"setSourceCB();");
	var url = this.url;
	if (this.dURL) url = this.dURL;

	if (url) wiz.setSource(url);
	else wiz.setSource("");
	var x = ZLM.getPageOffsetLeft(this.base);
	var y = ZLM.getPageOffsetTop(this.base);
	win.headerStyle = "full"
	win.show(x,y,false);
	return(ZLM.killEvent(event));
}

ZRU.BannerBoxItem.prototype.setSourceCB=function() {
	var wiz = zenPage._editor.getImageURLWizard();
	var src = wiz.getSource();
	if (src.indexOf(':')>0) this.setImageURL(src);
	else this.setDynamicURL(src);
}

ZRU.BannerBoxItem.prototype.getDisplayValue=function() {
	return(this.displayValue);
}

//=============
ZRU.BannerBarcodeItem=function(div) {
	ZLM.initializeObject(this,div,"ZRU.BannerBarcodeItem");
	this.blankURL = "http://"+window.location.host+"/csp/broker/portal/barcode79x57.png";
	this.createBody();
	this.value = "barcode" // static display value
	this.dSrc = null; // dynamic display value
	this.encoding = "code39"; // barcode standard
	this.modWidth = 0.24; // module width in mm
	this.wideFactor = 2.2; // multiplier for wide bits v. narrow ones
	this.icg = 2; // intercharacter gap (multiplier for modWidth)
	this.humanReadable = "default"; // human readable format
	return(this);
}

ZRU.BannerBarcodeItem.create=function() {
	var div=ZLM.simulateTag("div class='bannerBarcodeItem' ");
	return(new ZRU.BannerBarcodeItem(div));
}

ZRU.BannerBarcodeItem.restoreObj=function(o,area) {
	var div=ZLM.simulateTag("div class='bannerBarcodeItem' ");
	var n = new ZRU.BannerBarcodeItem(div)
	if (area) area.appendChild(n.base);
	n.setContents(o.gc.zl,o.gc.zt,o.gc.zw,o.gc.zh,o.val,o.std);
	n.setGC(ZRU.getDisplayPropertyPanel().makeGCFromObj(o.gc));
	if (o.dsrc) n.setDynamicSrc(o.dsrc);
	if (o.mw) n.modWidth = o.mw;
	if (o.wf) n.wideFactor = o.wf;
	if (o.icg) n.icg = o.icg;
	if (o.hr) n.humanReadable = o.hr;
	return(n);
}

ZRU.BannerBarcodeItem.prototype=new ZRU.BannerItem();

ZRU.BannerBarcodeItem.prototype.createBody=function() {
	this.initBase();
	this.body.style.width="100%";
	this.body.style.height="100%";
	this.box=new ZVE.LayoutBox(0,0,10,10);
	this.box.setResizeNotify(this.objHook+"resizeLayoutBox();");
	this.box.setMoveNotify(this.objHook+"moveLayoutBox();");
	this.box.enableIncrementalEvents(true);
	this.unselect();
	ZLM.setLocalAttribute(this.base,"onmousedown",this.objHook+"setSelection(event);");
}

ZRU.BannerBarcodeItem.prototype.setGC=function(gc,skipSize) {
	var o = null;
	if (skipSize) o = ZRU.saveGeometry(this.gc);
	if (zenPage && zenPage._editor)	this.gc = ZRU.getDisplayPropertyPanel().cloneGC(gc);
	else this.gc = gc;
	this.gc.fillApropos = true;
	this.gc.strokeApropos = false;
	this.gc.tableApropos = false;
	this.gc.textApropos = false;
	this.gc.sizeApropos = true;
	if (skipSize) ZRU.restoreGeometry(this.gc,o);
	this.refresh();
}

ZRU.BannerBarcodeItem.prototype.setContents=function(xPx,yPx,wPx,hPx,value,std) {
	this.itemClass = "BCODE";
	this.encoding = std;
	this.value = value;
	this.dsrc = null;
	this.imageDiv = ZLM.simulateTag("img src='"+this.blankURL+"' style='width:100%; height:100%;' oncontextMenu='"+this.objHook+"setInfo()'; ");
	this.srcDiv = ZLM.simulateTag("div style='position:absolute;left:0px;bottom:0px;width:100%;text-align:center;margin-bottom:10px;color:#77ff77;font-size:10pt;'");
	this.body.appendChild(this.imageDiv);
	this.body.appendChild(this.srcDiv);
	this.base.style.top = yPx+"px";
	this.base.style.left = xPx+"px";
	this.base.style.height = hPx+"px";
	this.base.style.width = wPx+"px";
	if (this.activeGC()) {
		this.gc.sizeTop = ZRU.convertToPoints(yPx);
		this.gc.sizeLeft = ZRU.convertToPoints(xPx);
		this.gc.sizeWidth = ZRU.convertToPoints(wPx);
		this.gc.sizeHeight = ZRU.convertToPoints(hPx);
	} 	
	this.box.bindToNode(this.base,this);
	ZLM.setLocalAttribute(this.box.base,"oncontextMenu",this.objHook+"handleRightClick(event);");
}


ZRU.BannerBarcodeItem.prototype.setStaticSrc=function(txt) {
	this.dSrc = null;
	this.value = txt
	this.srcDiv.innerHTML = "* "+txt+" *";
	this.srcDiv.style.backgroundColor="#000042";
}

ZRU.BannerBarcodeItem.prototype.setDynamicSrc=function(fieldName) {
	this.dSrc = fieldName;
	this.srcDiv.innerHTML = "( "+fieldName+" )";
	this.srcDiv.style.backgroundColor="#000042";
}

ZRU.BannerBarcodeItem.prototype.cloneObj=function() {
	var o = this.exportObj();
	var n = ZRU.BannerBarcodeItem.restoreObj(o,null);
	return(n);
}

ZRU.BannerBarcodeItem.prototype.exportObj=function() {
	var o = {}
	o.t='bcode';
	o.gc = ZRU.getDisplayPropertyPanel().projectGCAsObj(this.gc);
	o.c = this.itemClass;
	o.val = this.value;
	o.dsrc = this.dSrc;
	o.std = this.encoding;
	o.mw = this.modWidth;
	o.wf = this.wideFactor;
	o.icg = this.icg;
	o.hr = this.humanReadable;
	return(o);
}
	
ZRU.BannerBarcodeItem.prototype.exportJSON=function(data) {
	data.push("{itemType:'_barcodeItem',");
	var gcStr = ZRU.getDisplayPropertyPanel().projectGCAsJSON(this.gc);
	data.push("gc:{"+gcStr+"},");
	data.push("itemClass:'_"+this.itemClass+"',");
	data.push("val:'"+this.value+"'");
	data.push("dsrc:'"+this.dSrc+"'");
	data.push("std:'"+this.encoding+"'");
	data.push("mw:'"+this.modWidth+"'");
	data.push("wf:'"+this.wideFactor+"'");
	data.push("icg:'"+this.icg+"'");
	data.push("hr:'"+this.humanReadable+"'");
	data.push("}");
}

ZRU.BannerBarcodeItem.prototype.exportZRS = function(foData,coda) {
	var g = this.gc;
	foData.push('<write>'); 
	foData.push('<![CDATA['); 
	foData.push('<fo:block font-size="0pt">');
 	foData.push('<fo:instream-foreign-object>');
	if (this.dSrc) {
		foData.push('<barcode:barcode xmlns:barcode="http://barcode4j.krysalis.org/ns" >'); 
		foData.push('<xsl:attribute name="message">');
		foData.push('<xsl:value-of select="'+this.dSrc+'"/>');
		foData.push('</xsl:attribute>');
	}
	else {
		foData.push('<barcode:barcode xmlns:barcode="http://barcode4j.krysalis.org/ns" message="'+this.value+'">'); 
	}
	foData.push('<barcode:'+this.encoding+'>');
	foData.push('<barcode:height>'+g.sizeHeight+'pt</barcode:height>');

	foData.push('<barcode:module-width>'+this.modWidth+'mm</barcode:module-width>');
	foData.push('<barcode:wide-factor>'+this.wideFactor+'</barcode:wide-factor>');
	foData.push('<barcode:interchar-gap-width>'+this.icg+'mw</barcode:interchar-gap-width>');

	if (this.humanReadable=="none") foData.push('<barcode:human-readable>none</barcode:human-readable>');

/* Area for future expansion 
foData.push('<barcode:human-readable>');
foData.push('<barcode:placement>top</barcode:placement>');
foData.push('<barcode:font-name>serif</barcode:font-name>');
foData.push('<barcode:font-size>8pt</barcode:font-size>');
foData.push('<barcode:display-start-stop>true</barcode:display-start-stop>');
foData.push('<barcode:display-checksum>false</barcode:display-checksum>');
foData.push('</barcode:human-readable>');
*/
	foData.push('</barcode:'+this.encoding+'>');
	foData.push('</barcode:barcode>');
 	foData.push('</fo:instream-foreign-object>'); 
	foData.push('</fo:block>'); 
	foData.push(']]>'); 
	foData.push('</write>'); 
}

ZRU.BannerBarcodeItem.prototype.adjustBodySize = function() {
	var w = this.gc.sizeWidth;
	var h = this.gc.sizeHeight;
	this.base.style.width=w+"pt";
	this.base.style.height=h+"pt";
	this.body.style.width = "100%";
	this.body.style.height = "100%";
}

ZRU.BannerBarcodeItem.prototype.refresh=function() {
	if (!this.gc) return;
	var str = ZRU.getDisplayPropertyPanel().projectGCAsJS(this.gc);

	this.body.style.background = this.gc.fillColor;
	this.adjustBodySize();

	this.base.style.top=this.gc.sizeTop+"pt";
	this.base.style.left=this.gc.sizeLeft+"pt";

	this.box.bindToNode(this.base,this);	
}

ZRU.BannerBarcodeItem.prototype.resizeLayoutBox=function() {
	var u = "pt";
	var y=this.box.getHomeY();
	var x=this.box.getHomeX();
	var h=this.box.getHeight();
	var w=this.box.getWidth();
	this.base.style.top=y+u;
	this.base.style.left=x+u;
	this.base.style.height=h+u;
	this.base.style.width=w+u;
	if (this.activeGC()) {
		this.gc.sizeTop = y;
		this.gc.sizeLeft = x;
		this.gc.sizeWidth = w;
		this.gc.sizeHeight = h;
	}
	this.adjustBodySize();
	this.pristine=false;
	ZRU.getDisplayPropertyPanel().setActiveGC(this.gc);
}

ZRU.BannerBarcodeItem.prototype.setInfo=function() {
}

ZRU.BannerBarcodeItem.prototype.handleRightClick=function(event) {
	var win = zenPage._editor.getBarcodePopup();
	var wiz = zenPage._editor.getBarcodeWizard();
	wiz.setOkayCB(this.objHook+"setSourceCB();");
	wiz.setValueObj(this);
	var x = ZLM.getPageOffsetLeft(this.base);
	var y = ZLM.getPageOffsetTop(this.base);
	win.headerStyle = "full"
	win.show(x,y,false);
	return(ZLM.killEvent(event));

}

ZRU.BannerBarcodeItem.prototype.setSourceCB=function() {
	var wiz = zenPage._editor.getBarcodeWizard();
	var o = wiz.getValueObj();
	for (var p in o) this[p] = o[p];
	if (o.dSrc) this.setDynamicSrc(o.dSrc);
	else this.setStaticSrc(this.value);
}

ZRU.BannerBarcodeItem.prototype.getDisplayValue=function() {
	return(this.displayValue);
}

//=============
ZRU.BannerPageNumItem=function(div) {
	// A page number can have several formats
	// "#" -> "page-number"
	// "#/##" -> "page-number-/"
	// "# of ##" -> "page-number-of"
	// "sigma" -> "page-count"

	ZLM.initializeObject(this,div,"ZRU.BannerPageNumItem");
	this.itemClass='PAGENUM'
	this.createBody();
	this.format="#";
	this.setValue();
	return(this);
}

ZRU.BannerPageNumItem.create=function() {
	var div=ZLM.simulateTag("div class='bannerPageNumItem' ");
	return(new ZRU.BannerPageNumItem(div));
}

ZRU.BannerPageNumItem.restoreObj=function(o,area) {
	var div=ZLM.simulateTag("div class='bannerPageNumItem' ");
	var n = new ZRU.BannerPageNumItem(div);
	if (area) area.appendChild(n.base);

	n.setGC(ZRU.getDisplayPropertyPanel().makeGCFromObj(o.gc));
	n.format = o.fmt;
	n.setValue();

	n.box.bindToNode(n.body,n);
	return(n);
}


ZRU.BannerPageNumItem.prototype=new ZRU.BannerItem();

ZRU.BannerPageNumItem.prototype.createBody=function() {
	this.initBase();
	this.box=new ZVE.LayoutBox(0,0,10,10);
	this.box.setResizeNotify(this.objHook+"resizeLayoutBox();");
	this.box.setMoveNotify(this.objHook+"moveLayoutBox();");
	this.box.enableIncrementalEvents(true);
	this.unselect();
	ZLM.setLocalAttribute(this.base,"onmousedown",this.objHook+"setSelection(event);");
}

ZRU.BannerPageNumItem.prototype.setGC=function(gc,skipSize) {
	var o = null;
	if (skipSize) o = ZRU.saveGeometry(this.gc);
	this.gc = ZRU.getDisplayPropertyPanel().cloneGC(gc);
	this.gc.strokeApropos = false;
	this.gc.fillApropos = true;
	this.gc.textApropos = true;
	this.gc.tableApropos = false;
	this.gc.sizeApropos = true;
	this.gc.fillOpacity = 1;
	if (skipSize) ZRU.restoreGeometry(this.gc,o);
	this.refresh();
}

ZRU.BannerPageNumItem.prototype.handleRightClick=function(event) {
	var win = zenPage._editor.getPageNumPopup();
	var wiz = zenPage._editor.getPageNumWizard();
	wiz.setOkayCB(this.objHook+"setFormatCB();");
	if (this.format) wiz.setFormat(this.format);
	else wiz.setFormat("");
	var x = ZLM.getPageOffsetLeft(this.base);
	var y = ZLM.getPageOffsetTop(this.base);
	win.headerStyle = "full"
	win.show(x,y,false);
	return(ZLM.killEvent(event));
}

ZRU.BannerPageNumItem.prototype.setFormatCB=function() {
	var wiz = zenPage._editor.getPageNumWizard();
	this.format = wiz.getFormat();
	this.setValue();
}

ZRU.BannerPageNumItem.prototype.getDisplayValue=function() {
	return(this.displayValue);
}

ZRU.BannerPageNumItem.prototype.setValue=function() {
	if (this.body.firstChild) this.body.removeChild(this.body.firstChild);
	var f = this.format;
	var dv = f; // the display value (usually)
	var p = "page-number"; // default case for format of "#"


	if (f=="#") {}
	else if (f=="#/##") p = "page-number-/";
	else if (f=="# of ##") {
		p = "page-number-of";
		dv = "#&nbsp;of&nbsp;##";
	}
	else if (f=="count") {
		p = "page-count";
		dv = "&sum;";
	}

	this.body.innerHTML = dv;
	this.body.style.border="1px dotted #000000";
	this.projection = p;
	this.displayValue = dv;
}

ZRU.BannerPageNumItem.prototype.setContents=function(fieldName) {
	this.fName=fieldName;
	if (fieldName.indexOf("$")==0) {
		this.itemClass="PAGENUM";
	}
	this.body.style.whiteSpace="nowrap";
	this.setValue();
	var sz = this.getNativeSize();
	var w = sz.width;
	var h = sz.height;
	this.base.style.height = h+"pt";
	this.base.style.width = w+"pt";
	if (this.activeGC()) {
		this.gc.sizeWidth = w
		this.gc.sizeHeight = h;
		this.gc.fillOpacity = 1;
	} 	
	this.box.bindToNode(this.base,this);
}

ZRU.BannerPageNumItem.prototype.cloneObj=function() {
	var o = this.exportObj();
	var n = ZRU.BannerPageNumItem.restoreObj(o,null);
	return(n);
}


ZRU.BannerPageNumItem.prototype.exportObj=function() {
	var o = {};
	o.t='pagenum';
	o.gc = ZRU.getDisplayPropertyPanel().projectGCAsObj(this.gc);
	o.c = this.itemClass;
	o.f = null;
	o.fmt = this.format;
	return(o);
}

ZRU.BannerPageNumItem.prototype.exportJSON=function(data) {
	data.push("{itemType:'_textItem',");
	var gcStr = ZRU.getDisplayPropertyPanel().projectGCAsJSON(this.gc);
	data.push("gc:{"+gcStr+"},");
	data.push("itemClass:'_"+this.itemClass+"',");
	data.push("fieldName:'"+this.fName+"',");
	if (this.formatNumber) data.push("format:'"+this.format+"'");
	else data.push("format:'#'");
	data.push("}");
}

ZRU.BannerPageNumItem.prototype.exportZRS = function(foData,coda) {
	var g = this.gc;
	var s = [];
	s.push("font-size:"+g.textSize+"pt;");
	if (g.textFont=="cursive") s.push("font-family:\"Comic Sans MS\",cursive;");
	else s.push("font-family:"+g.textFont+";");
	s.push("color:"+g.textColor+";");
	if (g.textBold) s.push("font-weight:bold;");
	if (g.textItalic) s.push("font-style:italic;");
	if (g.textUnderline) s.push("text-decoration:underline;");
	s.push("text-align:"+g.textJustify+";");
	s.push("width:"+g.sizeWidth+";");
	s.push("height:"+g.sizeHeight+";");
	var styleStr = s.join('');

	foData.push('<item special="'+this.projection+'" style="'+styleStr+'" />');
}

ZRU.BannerPageNumItem.prototype.getNativeSize=function() {
	var tNode = this.body.cloneNode(true);
	if (!this.gc) return({width:10,height:10});
	var bs = tNode.style;
	var g = this.gc;
	if (g.textBold) bs.fontWeight="bold";
	else bs.fontWeight="normal";
	if (g.textItalic) bs.fontStyle="italic";
	else bs.fontStyle="normal";
	if (g.textUnderline) bs.textDecoration="underline";
	else bs.textDecoration="none";

	bs.fontSize = g.textSize+"pt";
	bs.textAlign = g.textJustify;
	bs.fontFamily = g.textFont;
	if (g.textFont=="cursive") bs.fontFamily = "\"Comic Sans MS\",cursive";
	bs.position="absolute";
	bs.display="block";
	bs.width="";
	bs.height="";
	document.body.appendChild(tNode);
	var w = ZRU.convertToPoints(tNode.offsetWidth);
	var h = ZRU.convertToPoints(tNode.offsetHeight);
	document.body.removeChild(tNode);
	return({width:w,height:h});
}

ZRU.BannerPageNumItem.prototype.refresh=function() {
	if (!this.gc) return;
	var bs = this.body.style;
	var fs = this.base.style;
	var g = this.gc;
	bs.background = g.fillColor;
	if (g.textBold) bs.fontWeight="bold";
	else bs.fontWeight="normal";
	if (g.textItalic) bs.fontStyle="italic";
	else bs.fontStyle="normal";
	if (g.textUnderline) bs.textDecoration="underline";
	else bs.textDecoration="none";

	bs.color = g.textColor;
	bs.opacity = g.textOpacity;
	bs.fontSize = g.textSize+"pt";
	bs.textAlign = g.textJustify;
	bs.fontFamily = g.textFont;
	if (g.textFont=="cursive") bs.fontFamily = "\"Comic Sans MS\",cursive";
	bs.width = "100%";
	bs.height = "100%";
	fs.top=g.sizeTop+"pt";
	fs.left=g.sizeLeft+"pt";
	fs.height=g.sizeHeight+"pt";
	fs.width=g.sizeWidth+"pt";
	this.box.bindToNode(this.base,this);	
}

//=============
ZRU.BannerChartItem=function(div) {
	ZLM.initializeObject(this,div,"ZRU.BannerChartItem");
	this.titleStr = "Untitled Chart";

	this.chartType = "line";
	this.seriesColors = [];

	var m ={};
	m.c = "column";   	// plot type
	m.cIdx = 2; 		// internal index
	m.n = "Untitled Plot";	// title
	m.grp = "";		// core XML grouping
	m.udg = 0;		// project as dataGroup rather than series group
	m.df = []; 		// dataFields
	m.sn = "";		// seriesNames
	m.sLgd = 0;		// legendVisible
	m.sLbl = 0;		// labelsVisible
	m.bw = 1;		// default to black and white settings
	m.cs = "gray";		// default gray color scheme
	m.mt = 6;		// marginTop
	m.mr = 2;		// marginRight
	m.ml = 10;		// marginLeft
	m.mb = 10;		// marginBottom
	m.tx = 50;		// titleX 
	m.ty = 5;		// titleY 
	m.lx = 0;		// legendX
	m.ly = 0;		// legendY
	m.lh = 20;		// legendHeight
	m.lw = 20;		// legendWidth
	m.XA = {};		// XAxis
	m.XA.lbl="";		// Static labels
	m.XA.fld=[];		// Dynamic label field
	m.XA.title="";		// Axis Title
	m.XA.txtAnchor="begin";	// Text Anchor
	m.XA.lblAngle=0;	// Label angle
	m.XA.mnVD=0;		// Minimum value displacement
	m.XA.mGL=false;		// Major Grid lines
	m.YA = {};              // Y Axis
	m.YA.lbl="";		// Static labels
	m.YA.fld=[];		// Dynamic label field
	m.YA.title="";		// Axis Title
	m.YA.txtAnchor="begin";	// Text Anchor
	m.YA.lblAngle=0;	// Label angle
	m.YA.mnVD=0;		// Minimum value displacement
	m.YA.mGL=false;		// Major Grid lines

	this.tmpModel = m;

	this.createBody();
	return(this);
}

ZRU.BannerChartItem.create=function() {
	var div=ZLM.simulateTag("div class='bannerChartItem' ");
	return(new ZRU.BannerChartItem(div));
}

ZRU.BannerChartItem.restoreObj=function(o,area) {
	var n = ZRU.BannerChartItem.create();
	if (area) area.appendChild(n.base);
	n.setContents(o.gc.zl,o.gc.zt,o.gc.zw,o.gc.zh,"chart",o.url);
	o.gc.fo = 1; // no chart transparency
	n.setGC(ZRU.getDisplayPropertyPanel().makeGCFromObj(o.gc));
	var m={};
	for (var p in o) m[p]=o[p];
	if (!m.df.join) m.df = m.df.split(',');
	n.tmpModel=m;
	n.setAvatarDiv();
	return(n);
}

ZRU.BannerChartItem.prototype=new ZRU.BannerItem();

ZRU.BannerChartItem.prototype.createBody=function() {
	this.initBase();
	this.body.style.width="100%";
	this.body.style.height="100%";
	this.box=new ZVE.LayoutBox(0,0,10,10);
	this.box.setResizeNotify(this.objHook+"resizeLayoutBox();");
	this.box.setMoveNotify(this.objHook+"moveLayoutBox();");
	this.box.enableIncrementalEvents(true);
	this.unselect();
	ZLM.setLocalAttribute(this.base,"onmousedown",this.objHook+"setSelection(event);");
	ZLM.setLocalAttribute(this.box.base,"oncontextmenu","return("+this.objHook+"launchWizard(event));");
}

ZRU.BannerChartItem.prototype.setGC=function(gc,skipSize) {
	var o = null;
	if (skipSize) o = ZRU.saveGeometry(this.gc);
	this.gc = ZRU.getDisplayPropertyPanel().cloneGC(gc);
	this.gc.fillApropos = true;
	this.gc.strokeApropos = true
	this.gc.tableApropos = false;
	this.gc.textApropos = true;
	this.gc.sizeApropos = true;
	if (skipSize) ZRU.restoreGeometry(this.gc,o);
	this.refresh();
}

ZRU.BannerChartItem.prototype.setAvatarDiv=function() {
	var m = this.tmpModel;
	var h = [];
	h.push("<div style='font-size:10pt;font-weight:bold;border-bottom:1pt solid #404040; width:100%; text-align:center;'>"+m.n+"</div>");
	h.push("<div style='font-size:8pt;width:100%; text-align:center;'>("+m.c+" chart)</div>");
	h.push("<div style='margin-left:5%;font-size:10pt;'>Data to Plot:</div>");
	h.push("<div style='margin-left:5%;margin-right:5%;width:90%;height:40%;overflow:auto;border:1px solid #777777;'>");
	for (var i=0;i<m.df.length;i++) {
		h.push("<div style='font-size:9pt;margin-right:3%;width:80%;display:inline-block;'>"+m.df[i]+"</div>");
	}
	h.push("</div>");
	h.push("<div style='position:absolute;bottom:0px;left:0px;width:100%;'>");
	h.push("<div style='font-size:8pt;width:100%; text-align:center;'>Drag and drop data to plot</div>");
	h.push("<div style='font-size:8pt;width:100%; text-align:center;'>Right-click to edit</div>");
	h.push("</div>");
	var s = h.join('');
	this.avatarDiv.innerHTML = s;
}

ZRU.BannerChartItem.prototype.addDatum=function(fieldName,groupName) {
	var m = this.tmpModel;
	if (this.seriesGroup == "" || this.seriesGroup==groupName) {
		this.seriesGroup = groupName;
		this.dataFields.push(fieldName);
		m.sg = groupName;
		m.df.push(fieldName);
		this.setAvatarDiv();
	}
	else {
		alert("When ploting multiple series, all data fields must originate from the same group ("+this.seriesGroup+")");
	}
}

ZRU.BannerChartItem.prototype.setContents=function(xPx,yPx,wPx,hPx,type,url) {
	if (type == "chart") {
		this.url = url;
		this.itemClass = "CHART";
		this.imageDiv = ZLM.simulateTag("img src='"+url+"' style='width:100%;height:100%;opacity:0.25;position:absolute;top:0;left:0;'");
		this.avatarDiv = ZLM.simulateTag("div style='width:100%;height:100%;'");
		this.setAvatarDiv();
		this.body.appendChild(this.imageDiv);
		this.body.appendChild(this.avatarDiv);
	}
	this.base.style.top = yPx+"px";
	this.base.style.left = xPx+"px";
	this.base.style.height = hPx+"px";
	this.base.style.width = wPx+"px";
	if (this.activeGC()) {
		this.gc.sizeTop = ZRU.convertToPoints(yPx);
		this.gc.sizeLeft = ZRU.convertToPoints(xPx);
		this.gc.sizeWidth = ZRU.convertToPoints(wPx);
		this.gc.sizeHeight = ZRU.convertToPoints(hPx);
	} 	
	this.box.bindToNode(this.base,this);
}

ZRU.BannerChartItem.prototype.exportXML=function(xmlData) {
//FIX THIS...
	var ppr= ZRU.Ruler.getPixelPointRatio();
	var topStr=Math.round(this.box.getHomeY()/ppr)+"pt";
	var leftStr=Math.round(this.box.getHomeX()/ppr)+"pt";
	var widthStr=Math.round(this.box.getWidth()/ppr)+"pt";
	var heightStr=Math.round(this.box.getHeight()/ppr)+"pt";
	var s="margin:0px; position:absolute; white-space:nowrap; left:"+leftStr+"; top:"+topStr+"; width:"+widthStr+"; height:"+heightStr+"; ";
	var p=["fillColor","textColor","textOpacity","textStyle","textJustify","textFont"]
	for (var i=0;i<p.length;i++) {
		s+=this.gc.projectPropertyAsHTML(p[i]);
	}
}

ZRU.BannerChartItem.prototype.cloneObj=function() {
	var o = this.exportObj();
	var n = ZRU.BannerChartItem.restoreObj(o,null);
	return(n);
}

ZRU.BannerChartItem.prototype.exportObj = function() {
	var o = {};
	o.t = 'chart';
	o.url = this.url;
	var m = this.tmpModel;
	for (var p in m) o[p]=m[p];
	o.gc = ZRU.getDisplayPropertyPanel().projectGCAsObj(this.gc);
	return(o);
}

ZRU.BannerChartItem.prototype.exportZRS = function(foData) {
	var g = this.gc;
	var m = this.tmpModel;

	var chartClass = null;
	var group = 'seriesGroup';
	switch(m.c) {
		case 'bar': 
			chartClass = 'barChart chartPivot="true"';
			if (m.udg==1) group="dataGroup";
			break;
		case 'column': 
			chartClass = 'barChart';
			if (m.udg==1) group="dataGroup";
			break;
		case 'hilow': 
			chartClass = 'hilowChart';
			break;
		case 'line': 
			chartClass = 'lineChart';
			if (m.udg==1) group="dataGroup";
			break;
		case 'pie': 
			chartClass = 'pieChart';
			break;
		case 'stackedBar': 
			chartClass = 'barChart chartPivot="true" chartStacked="true"';
			if (m.udg==1) group="dataGroup";
			break;
		case 'stackedColumn': 
			chartClass = 'barChart chartStacked="true"';
			if (m.udg==1) group="dataGroup";
			break;
	}

	var s = [];
	s.push('width="'+g.sizeWidth+'"');
	s.push('height="'+g.sizeHeight+'"');
	var bStyle = [];
	bStyle.push('fill:'+g.fillColor+';');
	if (g.strokeStyle=="none") bStyle.push('stroke-width:0;');
	else {
		bStyle.push('stroke-width:'+(100*g.strokeWidth/g.sizeHeight)+';');
		bStyle.push('stroke:'+g.strokeColor+';');
//WAT ABOUT DASH ARRRAY?
	}	
	s.push('backgroundStyle="'+bStyle.join("")+'"');

	var txtStyle = [];
	txtStyle.push("font-size:"+(100*g.textSize/g.sizeHeight)+";");
	if (g.textFont=="cursive") txtStyle.push("font-family:\"Comic Sans MS\",cursive;");
	else txtStyle.push("font-family:"+g.textFont+";");
	txtStyle.push("fill:"+g.textColor+";");
	txtStyle.push("fill-opacity:"+(g.textOpacity)+";");
	if (g.textBold) txtStyle.push("font-weight:bold;");
	if (g.textItalic) txtStyle.push("font-style:italic;");
	if (g.textUnderline) txtStyle.push("text-decoration:underline;");
	s.push('titleStyle="'+txtStyle.join("")+'"');
	if (m.sLgd) s.push('legendVisible="true"');
	else s.push('legendVisible="false"');
	if (m.sLbl) {
		s.push('labelsVisible="true"');
		var txtStyle = [];
		txtStyle.push("font-size:"+((g.textSize*75)/g.sizeHeight)+";");
		if (g.textFont=="cursive") txtStyle.push("font-family:\"Comic Sans MS\",cursive;");
		else txtStyle.push("font-family:"+g.textFont+";");
		txtStyle.push("fill:"+g.textColor+";");
		txtStyle.push("fill-opacity:"+(g.textOpacity)+";");
		if (g.textBold) txtStyle.push("font-weight:bold;");
		if (g.textItalic) txtStyle.push("font-style:italic;");
		if (g.textUnderline) txtStyle.push("text-decoration:underline;");

		s.push('labelStyle="'+txtStyle.join("")+';"');
	}
	else s.push('labelsVisible="false"');
	s.push('marginTop="'+m.mt+'"');
	s.push('marginLeft="'+m.ml+'"');
	s.push('marginRight="'+m.mr+'"');
	s.push('marginBottom="'+m.mb+'"');
	s.push('titleX="'+m.tx+'"');
	s.push('titleY="'+m.ty+'"');
	if (m.sLgd) {
		s.push('\nlegendX="'+m.lx+'"');
		s.push('legendY="'+m.ly+'"');
		s.push('legendWidth="'+m.lw+'"');
		s.push('legendHeight="'+m.lh+'"');
	} 
	var geoStr = s.join(" ");

	var df = m.df.join(",");
	var sg = m.grp;

	foData.push('<'+chartClass+' '+geoStr);
	foData.push('\ttitle="'+m.n+'"');
	foData.push('\tdataFields="'+df+'"');
	foData.push('\t'+group+'="'+sg+'"');
	if (m.sn && m.sn.length>0) foData.push('\tseriesNames="'+m.sn+'"');
	if (m.bw==1) {
		foData.push('\tmarkersVisible="true"');
		if ( chartClass.indexOf("line")==1 || chartClass.indexOf("hilow")==1) {
			foData.push('\tseriesColors="#000000,#000000,#000000,#000000,#555555,#555555,#555555,#555555,#aaaaaa,#aaaaaa,#aaaaaa,#aaaaaa" ');
		}
		else {
			foData.push('\tseriesColors="#000000,#aaaaaa,#555555,#cccccc,#777777,#333333,#eeeeee"');
		}
	}
	foData.push('\t>');
	foData.push('<xaxis');
		if (m.XA.fld.length>0 && m.XA.fld[0].length>0) {
			foData.push('\tlabelValue="'+m.XA.fld.join(',')+'" labelGroup="'+m.grp+'"');
		}
		else if (m.XA.lbl.length>0) foData.push('\tlabelValues="'+m.XA.lbl+'"');
		if (m.XA.title.length>0) foData.push('\ttitle="'+m.XA.title+'"');
		if (m.XA.lblAngle) foData.push('\tlabelAngle="'+m.XA.lblAngle+'"');
		if (m.XA.txtAnchor) foData.push('\ttextAnchor="'+m.XA.txtAnchor+'"');
		if (m.XA.mnVD) foData.push('\tminValueDisplacement="'+m.XA.mnVD+'"');
		if (m.XA.mGL=="true") foData.push('\tmajorGridLines="true"');
		else foData.push('\tmajorGridLines="false"');	
	foData.push('/>');
	foData.push('<yaxis');
		if (m.YA.fld.length>0 && m.YA.fld[0].length>0) {
			foData.push('\tlabelValue="'+m.YA.fld.join(',')+'" labelGroup="'+m.grp+'"');
		}
		else if (m.YA.lbl.length>0) foData.push('\tlabelValues="'+m.YA.lbl+'"');
		if (m.YA.title.length>0) foData.push('\ttitle="'+m.YA.title+'"');
		if (m.YA.lblAngle) foData.push('\tlabelAngle="'+m.YA.lblAngle+'"');
		if (m.YA.txtAnchor) foData.push('\ttextAnchor="'+m.YA.txtAnchor+'"');
		if (m.YA.mnVD) foData.push('\tminValueDisplacement="'+m.YA.mnVD+'"');
		if (m.YA.mGL=="true") foData.push('\tmajorGridLines="true"');
		else foData.push('\tmajorGridLines="false"');	
	foData.push('/>');
	foData.push('</'+chartClass.split(' ')[0]+'>');
}

ZRU.BannerChartItem.prototype.adjustBodySize = function() {
	var w = this.gc.sizeWidth;
	var h = this.gc.sizeHeight;
	this.base.style.width = w+"pt";
	this.base.style.height = h+"pt";
	if (this.gc.strokeStyle!="none") {
		w-=2*this.gc.strokeWidth;
		h-=2*this.gc.strokeWidth;
	}
	if (w<0) w=0;
	if (h<0) h=0;
	this.body.style.width = w+"pt";
	this.body.style.height = h+"pt";
}

ZRU.BannerChartItem.prototype.refresh=function() {
	if (!this.gc) return;

//	var str = ZRU.getDisplayPropertyPanel().projectGCAsJS(this.gc);

	var ss=this.gc.strokeWidth+"pt "+this.gc.strokeStyle+" "+this.gc.strokeColor;
	this.body.style.border = ss;

	this.gc.fillOpacity = 1; // No transparency on Charts

	if (this.gc.fillOpacity == 0) this.body.style.background = "transparent";
	else {
		this.body.style.background = this.gc.fillColor;
		this.body.style.opacity = this.gc.fillOpacity;
	}
	this.base.style.color = this.gc.textColor;
	this.base.style.fontFamily = this.gc.textFont;
	this.base.style.top = this.gc.sizeTop+"pt";
	this.base.style.left = this.gc.sizeLeft+"pt";
	this.adjustBodySize();
	if (this.pristine) this.box.bindToNode(this.base,this);
	this.box.bindToNode(this.base,this);	
}

ZRU.BannerChartItem.prototype.resizeLayoutBox=function() {
	var u = "pt";
	var y=this.box.getHomeY();
	var x=this.box.getHomeX();
	var h=this.box.getHeight();
	var w=this.box.getWidth();
	this.base.style.top=y+u;
	this.base.style.left=x+u;
	this.base.style.height=h+u;
	this.base.style.width=w+u;
	if (this.activeGC()) {
		this.gc.sizeTop = y;
		this.gc.sizeLeft = x;
		this.gc.sizeWidth = w;
		this.gc.sizeHeight = h;
	}
	this.adjustBodySize();
	this.pristine=false;
}

ZRU.BannerChartItem.prototype.handleRightClick=function(event) {
	return(this.launchWizard(event));
}

ZRU.BannerChartItem.prototype.editChartCB=function() {
	var wiz = zenPage._editor.getChartWizard();
	var m = wiz.getModel();
	for (var p in m) this.tmpModel[p] = m[p];
	this.setAvatarDiv();
}

ZRU.BannerChartItem.prototype.launchWizard=function(event) {
	var win = zenPage._editor.getChartWizardPopup();
	var wiz = zenPage._editor.getChartWizard();
	var x = ZLM.getPageOffsetLeft(this.base);
	var y = ZLM.getPageOffsetTop(this.base);
	win.show(x,y,false);
	wiz.showTab(0);
	wiz.setModel(this.tmpModel);
	wiz.setOkayCB(this.objHook+"editChartCB();");
	win.headerStyle = "full";
	ZLM.killEvent(event);
}

ZRU.BannerChartItem.prototype.getZenWizard=function() {
	var wiz = zenPage._editor.getChartWizard();
	if (wiz) return(wiz);
	return(null);
}

//=============
ZRU.BannerLineItem=function(div) {
	ZLM.initializeObject(this,div,"ZRU.BannerLineItem");
	this.createBody();
	return(this);
}

ZRU.BannerLineItem.create=function() {
	var div=ZLM.simulateTag("div class='bannerItem' ");
	return(new ZRU.BannerLineItem(div));
}

ZRU.BannerLineItem.restoreObj=function(o,area) {
	var div=ZLM.simulateTag("div class='bannerLineItem' ");
	var n = new ZRU.BannerLineItem(div)
	if (area) area.appendChild(n.base);
	n.setContents(o.gc.zl,o.gc.zt,o.gc.zw,o.gc.sw);
	n.setGC(ZRU.getDisplayPropertyPanel().makeGCFromObj(o.gc));
	return(n);
}

ZRU.BannerLineItem.prototype=new ZRU.BannerItem();

ZRU.BannerLineItem.prototype.createBody=function() {
	this.initBase();
	this.body.style.height="0pt";
	this.body.style.top="2pt";
	this.body.style.width="100%";

	this.box=new ZVE.LayoutHLine(0,0,100,5);
	this.box.setResizeNotify(this.objHook+"resizeLayoutBox();");
	this.box.setMoveNotify(this.objHook+"moveLayoutBox();");
	this.box.enableIncrementalEvents(true);
	this.unselect();
	ZLM.setLocalAttribute(this.base,"onmousedown",this.objHook+"setSelection(event);");
	ZLM.setLocalAttribute(this.box.div,"oncontextmenu","return(ZRU.launchLineContextMenu(event));");
}

ZRU.BannerLineItem.prototype.setGC=function(gc,skipSize) {
	var o = null;
	if (skipSize) o = ZRU.saveGeometry(this.gc);
	this.gc = ZRU.getDisplayPropertyPanel().cloneGC(gc);
	this.gc.strokeApropos = true;
	this.gc.fillApropos = false
	this.gc.tableApropos = false;
	this.gc.textApropos = false;
	this.gc.sizeApropos = true;
	if (skipSize) ZRU.restoreGeometry(this.gc,o);
	this.refresh();
}

ZRU.BannerLineItem.prototype.setContents=function(x,y,w,t) {
	var u = "pt";
	if (this.activeGC()) {
		this.gc.sizeTop = y;
		this.gc.sizeLeft = x;
		this.gc.sizeWidth = w;
	}
	this.fName="<H-LINE>";
	this.itemClass = "H-LINE";
	h=parseInt(t,10);
	this.base.style.height=(h+4)+u;
	this.base.style.width=w+u;
	this.base.style.top=(y-2)+u;
	this.base.style.left=x+u;
	this.box.bindToNode(this.base,this);
}

ZRU.BannerLineItem.prototype.refresh=function() {
	if (!this.gc) return;
	var ss=this.gc.strokeWidth+"pt "+this.gc.strokeStyle+" "+this.gc.strokeColor;
	this.setContents(this.gc.sizeLeft,this.gc.sizeTop,this.gc.sizeWidth,this.gc.strokeWidth);
	this.body.style.opacity=this.gc.strokeOpacity;
	this.body.style.borderBottom=ss;
	if (this.pristine) this.box.bindToNode(this.base,this);	
}

ZRU.BannerLineItem.prototype.moveLayoutBox=function(bx) {
	var u = "pt";
	var x=this.box.getHomeX();
	var y=this.box.getHomeY();
	if (this.activeGC()) {
		this.gc.sizeTop = y;
		this.gc.sizeLeft = x;
	}
	this.base.style.top=y+u;
	this.base.style.left=x+u;
	ZRU.getDisplayPropertyPanel().setActiveGC(this.gc);
}

ZRU.BannerLineItem.prototype.resizeLayoutBox=function() {
	var u = "pt";
	var y=this.box.getHomeY();
	var x=this.box.getHomeX();
	var w=this.box.getWidth();
	this.base.style.top=y+u;
	this.base.style.left=x+u;
	this.base.style.width=w+u;
	if (this.activeGC()) {
		this.gc.sizeTop = y;
		this.gc.sizeLeft = x;
		this.gc.sizeWidth = w;
	}
	this.pristine=false;
	ZRU.getDisplayPropertyPanel().setActiveGC(this.gc);
}

ZRU.BannerLineItem.prototype.cloneObj=function() {
	var o = this.exportObj();
	var n = ZRU.BannerLineItem.restoreObj(o,null);
	return(n);
}

ZRU.BannerLineItem.prototype.exportObj=function() {
	var o = {};
	o.t = 'line';
	o.gc = ZRU.getDisplayPropertyPanel().projectGCAsObj(this.gc);
	return(o);
}

ZRU.BannerLineItem.prototype.exportJSON=function(data) {
	data.push("{itemType:'_lineItem',");
	var gcStr = ZRU.getDisplayPropertyPanel().projectGCAsJSON(this.gc);
	data.push("gc:{"+gcStr+"}");
	data.push("}");
}

ZRU.BannerLineItem.prototype.exportFOSVG = function(foData) {
	var g = this.gc;
	if (g.strokeStyle=="none") return; 
	var s = [];
	s.push('x1="'+g.sizeLeft+'"');
	s.push('y1="'+g.sizeTop+'"');
	s.push('x2="'+(g.sizeLeft+g.sizeWidth)+'"');
//	s.push('y2="'+(g.sizeTop+g.sizeHeight)+'"');
	s.push('y2="'+g.sizeTop+'"');
 	var geoStr = s.join(" ");
	var s = [];
	var sw = g.strokeWidth;
	s.push('stroke:'+g.strokeColor);
	s.push('stroke-width:'+sw);
	s.push('stroke-opacity:'+g.strokeOpacity);
	if (g.strokeStyle=="dotted") s.push('stroke-dasharray:'+sw+","+sw);
	if (s.strokeStyle=="dashed") s.push('stroke-dasharray:'+(4*sw)+','+(2*sw));
	var styleStr = 'style="'+s.join(';')+'"';

	foData.push('<svg:line '+geoStr+' '+styleStr+' />');
}
//==========================================
// ***** ABSTRACT BANNER EDIT STARTS HERE **
//==========================================
ZRU.AbstractBannerEdit=function() {
	this.trackingModes = "SELECT|RECT|CHART|IMAGE|BCODE";
	this.trackMouse = false;
	return(this);
}

//=================================
// Canvas button cap icon library
//=================================
ZRU.AbstractBannerEdit.prototype.drawAddSectionIcon = function(cvs) {
	var c = cvs.getContext("2d");
	var x = 5;
	var y = 3;
	c.fillStyle = "#777777";
	c.fillRect(x+5,y+0,4,14);
	c.fillRect(x+0,y+5,14,4);
}

ZRU.AbstractBannerEdit.prototype.drawOpenDisclosureIcon = function(cvs) {
	var c = cvs.getContext("2d");
	var x = 5;
	var y = 4;
	c.fillStyle = "#777777";
	c.beginPath();
	c.moveTo(x+0,y+0);
	c.lineTo(x+14,y+0);
	c.lineTo(x+7,y+14);
	c.closePath();
	c.fill();
}

ZRU.AbstractBannerEdit.prototype.drawMoveUpIcon = function(cvs) {
	var c = cvs.getContext("2d");
	var x = 3;
	var y = 3;
	c.fillStyle = "#777777";
	c.beginPath();
	c.moveTo(x+1,y+14);
	c.lineTo(x+7,y+0);
	c.lineTo(x+13,y+14);
	c.lineTo(x+7,y+9);
	c.closePath();
	c.fill();
}

ZRU.AbstractBannerEdit.prototype.drawMoveDownIcon = function(cvs) {
	var c = cvs.getContext("2d");
	var x = 3;
	var y = 3;
	c.fillStyle = "#777777";
	c.beginPath();
	c.moveTo(x+1,y+0);
	c.lineTo(x+7,y+14);
	c.lineTo(x+13,y+0);
	c.lineTo(x+7,y+5);
	c.closePath();
	c.fill();
}

ZRU.AbstractBannerEdit.prototype.drawClosedDisclosureIcon = function(cvs) {
	var c = cvs.getContext("2d");
	var x = 5;
	var y = 4;
	c.fillStyle = "#777777";
	c.beginPath();
	c.moveTo(x+0,y+0);
	c.lineTo(x+14,y+7);
	c.lineTo(x+0,y+14);
	c.closePath();
	c.fill();
}

ZRU.AbstractBannerEdit.prototype.drawDeleteSectionIcon = function(cvs) {
	var c = cvs.getContext("2d");
	var x = 2;
	var y = 1;

	var radgrad = c.createRadialGradient(x+7,y+7, 3, x+10,y+10, 10);
	radgrad.addColorStop(0, '#EFA5A5');
	radgrad.addColorStop(0.9, '#EF0122');
	radgrad.addColorStop(1, 'rgba(239,1,34,0)');
 
	c.fillStyle = radgrad;
	c.fillRect(x+0,y+0,x+20,y+20);

	c.strokeStyle = "#404040";
	c.lineWidth = 2;
	c.beginPath();
	c.arc(x+10,y+10,10,0,Math.PI*2,true); // outer circle
	c.closePath();
	c.stroke();

	c.strokeStyle = "#e0e0e0";
	c.lineCap = "round";
	c.lineWidth = 3;
	c.beginPath();
	c.moveTo(x+6,y+6);
	c.lineTo(x+14,y+14);
	c.moveTo(x+6,y+14);
	c.lineTo(x+14,y+6);
	c.closePath();
	c.stroke();

}

ZRU.AbstractBannerEdit.prototype.drawRect = function(c,x,y,w,h) {
	c.beginPath();
	c.moveTo(x,y);
	c.lineTo(x+w,y+0);
	c.lineTo(x+w,y+h);
	c.lineTo(x+0,y+h);
	c.closePath();
	c.stroke();
}

ZRU.AbstractBannerEdit.prototype.drawLine = function(c, x0,y0,x1,y1) {
	c.beginPath();
	c.moveTo(x0,y0);
	c.lineTo(x1,y1);
	c.closePath();
	c.stroke();
}

ZRU.AbstractBannerEdit.prototype.drawBannerIcon = function(cvs) {
	var c = cvs.getContext("2d");
	var x = 4;
	var y = 2;
	c.fillStyle = "#f0f0f0";
	c.strokeStyle = "#404040";
	c.lineWidth = 0.5;
	c.fillRect(x+0.5,y+0.5,24,16);
	this.drawRect(c,x+0.5,y+0.5,24,16);

	c.fillStyle = "#ffffff";
	c.fillRect(x+14.5,y+4.5,7,8);
	this.drawRect(c,x+14.5,y+4.5,7,8);

	c.fillStyle = "#55ffff";
	c.fillRect(x+16.5,y+6.5,3,4);
	
	c.lineWidth = 1.0;
	c.strokeStyle = "#808080";
	this.drawLine(c,x+3,y+4,x+10,y+4);
	this.drawLine(c,x+3,y+7,x+10,y+7);
	this.drawLine(c,x+3,y+10,x+10,y+10);
}

ZRU.AbstractBannerEdit.prototype.drawParagraphIcon = function(cvs) {
	var c = cvs.getContext("2d");
	var x = 4;
	var y = 2;
	c.fillStyle = "#f0f0f0";
	c.strokeStyle = "#404040";
	c.lineWidth = 0.5;
	c.fillRect(x+0.5,y+0.5,24,16);
	this.drawRect(c,x+0.5,y+0.5,24,16);
	
	c.lineWidth = 1.0;
	c.strokeStyle = "#808080";
	this.drawLine(c,x+4,y+4,x+20,y+4);
	this.drawLine(c,x+4,y+7,x+20,y+7);
	this.drawLine(c,x+4,y+10,x+20,y+10);
	this.drawLine(c,x+4,y+13,x+20,y+13);
}

ZRU.AbstractBannerEdit.prototype.drawNVPIcon = function(cvs) {
	var c = cvs.getContext("2d");
	var x = 4;
	var y = 2;
	c.fillStyle = "#f0f0f0";
	c.strokeStyle = "#404040";
	c.lineWidth = 0.5;
	c.fillRect(x+0.5,y+0.5,24,16);
	this.drawRect(c,x+0.5,y+0.5,24,16);
	
	c.fillStyle = "#55ffff";
	c.fillRect(x+2.5,y+2.5,10,12);
	this.drawRect(c,x+2.5,y+2.5,20,12);

	this.drawLine(c,x+2.5,y+6.5,x+22.5,y+6.5);
	this.drawLine(c,x+2.5,y+10.5,x+22.5,y+10.5);
	this.drawLine(c,x+12.5,y+2.5,x+12.5,y+14.5);
}

ZRU.AbstractBannerEdit.prototype.drawTableIcon = function(cvs) {
	var c = cvs.getContext("2d");
	var x = 4;
	var y = 2;
	c.fillStyle = "#f0f0f0";
	c.strokeStyle = "#404040";
	c.lineWidth = 0.5;
	c.fillRect(x+0.5,y+0.5,24,16);
	this.drawRect(c,x+0.5,y+0.5,24,16);
	
	c.fillStyle = "#55ffff";
	c.fillRect(x+2.5,y+2.5,20,4);
	this.drawRect(c,x+2.5,y+2.5,20,12);

	this.drawLine(c,x+2.5,y+5.5,x+22.5,y+5.5);
	this.drawLine(c,x+8.5,y+2.5,x+8.5,y+14.5);
	this.drawLine(c,x+15.5,y+2.5,x+15.5,y+14.5);
}

ZRU.AbstractBannerEdit.prototype.makeCanvasButton = function(t,l,b,r, w,h,toolTip,callbackFn,showEdge) {
	this.sectionHeaderRoundCSS = "border:1px solid #404040; border-radius: 3px; -moz-border-radius: 3px; -webkit-border-radius: 3px; border: 1px solid #404040;"
	var pos = []; // Generate positioning styles as directed
	if (t>=0) pos.push("top:"+t+"px;");
	if (l>=0) pos.push("left:"+l+"px;");
	if (b>=0) pos.push("bottom:"+b+"px;");
	if (r>=0) pos.push("right:"+r+"px;");
	pos = pos.join("");

	border = "";
	if (showEdge) border = this.sectionHeaderRoundCSS;

	var anchor = ZLM.simulateTag("a title='"+toolTip+"' onclick='"+this.objHook+callbackFn+"' style='position:absolute;"+pos+"width:"+w+"px;height:"+h+"px;"+border+"'");
	var icon = ZLM.simulateTag("canvas style='position:absolute:top:0px; left:0px;width:"+w+"px;height:"+h+"px' width='"+w+"' height='"+h+"'");
	anchor.appendChild(icon);
	anchor.icon = icon;
	return(anchor);
}

/// When idle, core banners (as opposed to conditional ones) have a button to give the user the
/// option of creating an active edit section
ZRU.AbstractBannerEdit.prototype.createIdleHeader = function() {
	this.idleHeader=ZLM.simulateTag("div style='display:none;position:absolute; top:0px; bottom:0px; font:12pt Arial; color:#404040; text-align:left; width:100%;overflow:hidden;'");
	this.headSpace.appendChild(this.idleHeader);
	this.idleHeaderIcon = this.makeCanvasButton(1,1,-1,-1,24,22,"Create a new report section","activateZone();");
	this.idleHeader.appendChild(this.idleHeaderIcon);
	this.drawAddSectionIcon(this.idleHeaderIcon.icon);
	this.idleHeaderText = ZLM.simulateTag("span style='position:absolute;top:4px;left:26px;bottom:0px:right:5px;overflow:hidden;font:bold 10pt Arial;color:#404040;text-align:left;'");
	this.idleHeader.appendChild(this.idleHeaderText);
	this.idleHeaderText.innerHTML="Define "+this.prompt;
}

/// Short headers take one of three forms: 
/// For core sections the header text is just the section name
///  (i.e. "Group Header (SalesRep)"
/// For running headers, the text is simply: "Running Header Update"
/// For conditional banners, the text include the word 'if' followed by the governing condition
///  (i.e. "Conditional Group Header (SalesRep) if position()=1") 
/// In all cases the header starts with a discloure button followed by the text, which is
/// clipped to the length of available space.
ZRU.AbstractBannerEdit.prototype.createShortHeader = function() {
	this.shortHeader=ZLM.simulateTag("div style='display:none;position:absolute; top:0px; bottom:0px; font:12pt Arial; color:#404040; text-align:left; width:100%;overflow:hidden;'");
	this.headSpace.appendChild(this.shortHeader);
	this.shortHeaderIcon = this.makeCanvasButton(1,1,-1,-1,24,22,"Expand this section for editing","showBody()");
	this.shortHeader.appendChild(this.shortHeaderIcon);
	this.drawClosedDisclosureIcon(this.shortHeaderIcon.icon)
	this.shortHeaderText = ZLM.simulateTag("span style='position:absolute;top:4px;left:26px;bottom:0px:right:5px;overflow:hidden;font:bold 10pt Arial;color:#404040;text-align:left;'");
	if (this.condition) {
		if (this.runningHeader) {
			this.shortHeaderText.innerHTML="Running Header Update";
		}
		else {
			this.shortHeaderText.innerHTML=this.watermark+" if "+this.condition; 
		}
	}
	else this.shortHeaderText.innerHTML=this.watermark;
	this.shortHeader.appendChild(this.shortHeaderText);
}

ZRU.AbstractBannerEdit.prototype.noopCB = function() {
}

///ALERT UPDATE THIS
/// Full headers take one of three forms: 
/// For core sections the header text is just the section name
///  (i.e. "Group Header (SalesRep)"
/// For running headers, the text is simply: "Running Header Update"
/// For conditional banners, the text include the word 'if' followed by the governing condition
///  (i.e. "Conditional Group Header (SalesRep) if position()=1") 

/// In all cases the header starts with a discloure button followed by the text, which is
/// clipped to the length of available space.
ZRU.AbstractBannerEdit.prototype.createFullHeader = function() {
	this.fullHeader=ZLM.simulateTag("div style='display:none;position:absolute; top:0px; bottom:0px; font:12pt Arial; color:#404040; text-align:left; width:100%;overflow:hidden;'");
	this.headSpace.appendChild(this.fullHeader);

	this.fullHeaderDelete = this.makeCanvasButton(1,-1,-1,1,24,22,"Delete this section","purgeZone();");
	this.drawDeleteSectionIcon(this.fullHeaderDelete.icon);
	this.fullHeader.appendChild(this.fullHeaderDelete);

	if (this.condition) {
///FIX THIS: SHUFFLING CONDITION ORDER
		if (!this.runningHeader) {
			this.fullHeaderMoveUp = this.makeCanvasButton(1,-1,-1,56,20,20,"Move this sub-section earlier in the evaluation order","noopCB();",true);
			this.fullHeader.appendChild(this.fullHeaderMoveUp);
			this.drawMoveUpIcon(this.fullHeaderMoveUp.icon);

			this.fullHeaderMoveDown = this.makeCanvasButton(1,-1,-1,32,20,20,"Move this sub-section later in the evaluation order","noopCB();",true);
			this.fullHeader.appendChild(this.fullHeaderMoveDown);
			this.drawMoveDownIcon(this.fullHeaderMoveDown.icon);
		}
	}
	else if (this.watermark.indexOf("PAGE")<0 && this.objClass!="ZRU.TableEdit" && !this.runningHeader) {
		this.fullHeaderAppend = this.makeCanvasButton(1,-1,-1,52,24,20,"Add a conditional sub-section or running header","confirmAddSubSection();",true);
		this.fullHeader.appendChild(this.fullHeaderAppend);
		this.drawAddSectionIcon(this.fullHeaderAppend.icon);
	}
	this.fullHeaderIcon = this.makeCanvasButton(1,1,-1,-1,24,22,"Hide this section","hideBody();");
	this.fullHeader.appendChild(this.fullHeaderIcon);
	this.drawOpenDisclosureIcon(this.fullHeaderIcon.icon)

	this.fullHeaderText = ZLM.simulateTag("span style='position:absolute;top:2px;left:26px;bottom:0px;right:270px;overflow:hidden;font:bold 10pt Arial;color:#404040;text-align:left;'");
	if (this.condition) {
		if (this.runningHeader) {
			this.fullHeaderText.innerHTML="Running Header Update";
		}
		else {
			this.fullHeaderText.innerHTML=this.watermark; 
		}
	}
	else this.fullHeaderText.innerHTML=this.watermark;
	this.fullHeader.appendChild(this.fullHeaderText);

	if (this.watermark.indexOf("PAGE")<0 && !this.runningHeader) this.createPageBreakControl();
	if (this.condition) {
		this.sectionHeaderFullHeight = 2*this.sectionHeaderHeight;
		this.headSpace.style.height = this.sectionHeaderFullHeight+"px";
		this.fullHeaderStaticText = ZLM.simulateTag("span style='position:absolute;top:26px;left:26px;font:bold 10pt Arial;color:#404040;text-align:left;'");
		this.fullHeaderStaticText.innerHTML = "IF";
		this.fullHeader.appendChild(this.fullHeaderStaticText);
		var stylePrefix = "style='position:absolute;top:24px;height:20px;font-size:14px;background:#e0e0e0;";
		this.conditionalEditBox = ZLM.simulateTag("input type='text' "+stylePrefix+"left:45px;width:85%;border:1px solid #404040;padding:0px;' ondatadrop='"+this.objHook+"handleConditionalEditDataDrop();' onkeyup='"+this.objHook+"setConditional(this.value,true);'");
		this.conditionalEditBox.value = this.condition;
		this.fullHeader.appendChild(this.conditionalEditBox);
	}	
	else {
		this.sectionHeaderFullHeight = this.sectionHeaderHeight; 
		this.headSpace.style.height = this.sectionHeaderFullHeight+"px";
	}
	if (this.body) {
		this.body.style.top = (this.sectionHeaderFullHeight+1)+"px";
	}
}

ZRU.AbstractBannerEdit.prototype.setShortHeaderText=function(title) {
	this.shortHeaderText.innerHTML=title;
	this.scaleHeaderText();
}

ZRU.AbstractBannerEdit.prototype.setFullHeaderText=function(title) {
	this.fullHeaderText.innerHTML=title;
	this.scaleHeaderText();
}

ZRU.AbstractBannerEdit.prototype.scaleHeaderText = function(update) {
	var recurse = false;
	var ptSz = 10;
	var div = this.shortHeaderText;
	div.style.display="block";
	div.style.bottom="";

	if (update) ptSz = parseInt(div.style.fontSize,10);
	else div.style.fontSize = ptSz+"pt";
	if (div.offsetWidth>0 && div.offsetHeight>0) {
		if (ptSz>2 && div.offsetHeight>this.sectionHeaderHeight) {
			ptSz -= 2;
			div.style.fontSize = ptSz+"pt";
			recurse = true;
		}
	}
	else {
		var ptSz = 10;
		var div = this.fullHeaderText;
		div.style.display="block";
		div.style.bottom="";
		if (update) ptSz = parseInt(div.style.fontSize,10);
		else div.style.fontSize = ptSz+"pt";
		if (div.offsetWidth>0 && div.offsetHeight>0) {
			if (ptSz>2 && div.offsetHeight>this.sectionHeaderHeight) {
				ptSz -= 2;
				div.style.fontSize = ptSz+"pt";
				recurse = true;
			}
		}
	}
	if (recurse) setTimeout(this.objHook+"scaleHeaderText(true);",0);	
}

ZRU.AbstractBannerEdit.prototype.createPageBreakControl = function() 
{
	this.pgCtrl=ZLM.simulateTag("a style='position:absolute; top:1px; right:80px;width:33px; height:20px;"+this.sectionHeaderRoundCSS+"' onclick='"+this.objHook+"servicePageBreakControl();'");
	this.pgCtrl.innerHTML = "<div style='background-image: url(\"portal/pageBreak.png\");height: 20px;left: 0px;position: absolute;top: 0px;width: 33px;'></div>";
	this.fullHeader.appendChild(this.pgCtrl);
}

ZRU.AbstractBannerEdit.prototype.createZoneTypeControl = function(mode) 
{
	var w = 34*mode+1;
	var rt = 130+137-w;

	this.toBannerCtrl = this.makeCanvasButton(0,0,-1,-1,33,20,"Convert to Graphic Banner Layout","serviceZoneControl(1);",true);
	this.drawBannerIcon(this.toBannerCtrl.icon);

	this.zoneCtrl=ZLM.simulateTag("div style='position:absolute;top:1px; right:"+rt+"px;width:"+w+"px; height:24px;'");
	this.zoneCtrl.appendChild(this.toBannerCtrl);
	if (mode>1) {
		this.toParagraphCtrl = this.makeCanvasButton(0,34,-1,-1,33,20,"Convert to Paragraph Style Layout","serviceZoneControl(2);",true);
		this.drawParagraphIcon(this.toParagraphCtrl.icon);

		this.zoneCtrl.appendChild(this.toParagraphCtrl);
		if (mode>2) {
			this.toNVPCtrl = this.makeCanvasButton(0,68,-1,-1,33,20,"Convert to Name-Value Pair Layout","serviceZoneControl(3);",true);
			this.drawNVPIcon(this.toNVPCtrl.icon);
			this.zoneCtrl.appendChild(this.toNVPCtrl);
			if (mode>3) {
				this.toTableCtrl = this.makeCanvasButton(0,102,-1,-1,33,20,"Convert to Table Layout","serviceZoneControl(4);",true);
				this.drawTableIcon(this.toTableCtrl.icon);
				this.zoneCtrl.appendChild(this.toTableCtrl);
			}
		}
	}
	this.fullHeader.appendChild(this.zoneCtrl);
}

/// There are four base zone types:
///  1: Graphic Banner
///  2: Paragraph Renderer
///  3: Name-Value Pair Editor
///  4: Table Editor
/// Hilight the approriate icon for this default
ZRU.AbstractBannerEdit.prototype.setZoneTypeDefault=function(mode) {
	if (mode==1 && this.toBannerCtrl) this.hilightHeaderControl(this.toBannerCtrl);
	else if (mode==2 && this.toParagraphCtrl) this.hilightHeaderControl(this.toParagraphCtrl);
	else if (mode==3 && this.toNVPCtrl) this.hilightHeaderControl(this.toNVPCtrl);
	else if (mode==4 && this.toTableCtrl) this.hilightHeaderControl(this.toTableCtrl);
}

/// Define up to three default headers for this section.  One for when the section is undefined
/// (the idle header). One for when the section is active but not disclosed (the short header).
/// One for when the section is active and visible (full header).
ZRU.AbstractBannerEdit.prototype.createHeaderAreas = function() {
	this.headSpace=ZLM.simulateTag("div class='sectionHeaderArea' style='position:absolute; top:0px; font:12pt Arial; border-bottom:1px solid #404040; color:#404040; text-align:center; width:100%; height:"+this.sectionHeaderHeight+"px;background: url(\"images/grad-halfgray-10x30.png\") repeat-x scroll 0 0 #c0c0c0;'");
	this.base.appendChild(this.headSpace);
	this.createIdleHeader();
	this.createShortHeader();
	this.createFullHeader();
}

ZRU.AbstractBannerEdit.prototype.hilightHeaderControl = function(who) {
	if (zenIsChrome || zenIsSafari || zenIsSafariMobile) {
		who.style.backgroundImage="-webkit-linear-gradient(bottom, #77B0F5 38%, #B4D4F5 69%, #E9F3FD 85%)";
	}
	else if (zenIsGecko) {
		who.style.backgroundImage="-moz-linear-gradient(bottom, #77B0F5 38%, #B4D4F5 69%, #E9F3FD 85%)";
	}
	else {
		who.style.backgroundImage="linear-gradient(bottom, #77B0F5 38%, #B4D4F5 69%, #E9F3FD 85%)";
	}
}


ZRU.AbstractBannerEdit.prototype.deHilightHeaderControl = function(who) {
	who.style.backgroundImage="";
}

ZRU.AbstractBannerEdit.prototype.handleConditionalEditDataDrop = function() {
	var pos = ZRU.getCaretPosition(this.conditionalEditBox);
	var obj=ZLM.getDragData();
	var rPath = "";
	if (obj.group) {
		var pLen = obj.group.length;
		var extra = this.frame.prefixStr.substring(pLen);
		var split = extra.split("/");
		var lvls = split.length-1;
		for (var i=0;i<lvls;i++) rPath+="../";
	}
	var name = rPath+obj.name;
	var val = this.conditionalEditBox.value;
	var pos = val.length;
	if (this.conditionalEditLastPos>=0) pos = this.conditionalEditLastPos;
	var newVal = val.slice(0,pos)+name+val.slice(pos);
	this.setConditional(newVal);
	ZRU.setCaretPosition(this.conditionalEditBox,pos+name.length);
}

/// For subordinate banners, set the master core banner pointer
ZRU.AbstractBannerEdit.prototype.setMasterBanner=function(who) {
	this.masterBanner = who;
	this.prefixStr = who.prefixStr;
	if (this.frame) {
		while (who.master) who=who.master;
		this.frame.master = who;
	}
}

/// For conditional banners, set the conditional
ZRU.AbstractBannerEdit.prototype.setConditional=function(value,skipEditUpdate) {
	if (!value) return;
	// Get things into machine form
	value = value.split('"').join("'");
	value = value.split('<').join("&lt;");
	value = value.split('>').join("&gt;");

	this.condition = value;
	this.setShortHeaderText(this.watermark+" IF "+value);
	if (!skipEditUpdate) {
		// humanize the value
		var eyeValue =  this.condition.split("&lt;").join('<');
		eyeValue =  eyeValue.split("&gt;").join('>');
		this.conditionalEditBox.value = eyeValue;
		this.conditionalEditLastPos = eyeValue.length;
	}
	else this.conditionalEditLastPos = ZRU.getCaretPosition(this.conditionalEditBox);
}

/// Check to see if the current banner is a running header.
ZRU.AbstractBannerEdit.prototype.isRunningHeader=function() {
	return(this.runningHeader);
}

ZRU.AbstractBannerEdit.prototype.initializeFromDiv = function(div) {
	this.watermark=div.getAttribute("watermark");
	this.prompt=div.getAttribute("prompt");
	this.createBody();
	this.setUnits(div.getAttribute("units"));
	this.setPageWidth(div.getAttribute("pageWidth")+div.getAttribute("units"));
	this.mouseTracking=false;
	this.activeZone=true;
	this.item=[];
	this.initialized=1;
	this.breaking=false;
	this.enabled=true;
}

/// The basic template for a banner editor doesn't change much.  This function provides
/// the generic plumbing that subclasses may choose to pick up in their own createBody methods
ZRU.AbstractBannerEdit.prototype.createGenericBody=function(objName,useRuler) {
	var mouseCB = "ZRU."+objName+".serviceMouse("+this.instanceNum+",event);"
	this.sectionHeaderHeight = 24;
	this.sectionHeaderFullHeight = this.sectionHeaderHeight; // May double in the case of conditionals

	this.sectionHeaderRoundCSS = "border-radius: 3px; -moz-border-radius: 3px; -webkit-border-radius: 3px; border: 1px solid #404040;"

	this.base.style.position="relative";
	this.base.style.top="0px";
	this.base.style.left="0px";
	this.base.style.height="100%";
	this.createHeaderAreas();

	this.body=ZLM.simulateTag("div class='z"+objName+"Body' style='position:absolute; top:"+(this.sectionHeaderFullHeight+1)+"px; left:0px; right:0px; bottom:0px;'");
	this.base.appendChild(this.body);
	if (!useRuler) this.addSpacer();
	else this.addRuler();

	this.area=ZLM.simulateTag("div class='z"+objName+"WorkArea' style='position:absolute;top:0px;left:25px;height:100%;background:#fcfcff;overflow:hidden;'");
	this.area.controller=this;
	this.body.appendChild(this.area);
	
	ZLM.setLocalAttribute(this.area,"ondatadrop","ZRU."+objName+".endDataDrop();");
	ZLM.setLocalAttribute(this.area,"onclick",mouseCB);
	ZLM.setLocalAttribute(this.area,"ondblclick",mouseCB);
	ZLM.setLocalAttribute(this.area,"onmousedown",mouseCB);
	ZLM.setLocalAttribute(this.area,"onmousemove",mouseCB);
	ZLM.setLocalAttribute(this.area,"onmouseup",mouseCB);

	this.plate=ZLM.simulateTag("div class='z"+objName+"CoverPlate' style='position:absolute;top:0px;left:25px;height:100%;z-index:1;'");
	this.plate.style.display="none";
	this.body.appendChild(this.plate);

	ZLM.setLocalAttribute(this.plate,"onclick",mouseCB);
	ZLM.setLocalAttribute(this.plate,"onmouseover",mouseCB);
	ZLM.setLocalAttribute(this.plate,"onmouseout",mouseCB);
	ZLM.setLocalAttribute(this.plate,"onmousedown",mouseCB);
	ZLM.setLocalAttribute(this.plate,"onmousemove",mouseCB);
	ZLM.setLocalAttribute(this.plate,"onmouseup",mouseCB);

	this.activeLabel=ZLM.simulateTag("div style='position:absolute; bottom:0px; font:16pt sans-serif; color:#e0e0ff; font-weight:bold; text-align:center; width:100%;'");
	this.activeLabel.appendChild(document.createTextNode(this.watermark));
	this.area.appendChild(this.activeLabel);

	this.addControlArea();
	setTimeout(this.objHook+"scaleHeaderText(false);",0);
}

/// All subclasses should overload this method.  It is presented here more for illustration 
/// purposes and as a reminder of the naming convention in place.
ZRU.AbstractBannerEdit.prototype.createBody=function() {
	this.createGenericBody("AbstractBannerEdit",false);
}

/// For each banner, the left hand margin of the workspace is either a vertical ruler or
/// a blank spacer (controlled by the second argument of the createGenericBody call).
///  This implements the spacer
ZRU.AbstractBannerEdit.prototype.addSpacer=function() {  // No Ruler in table section	
	var r=ZLM.simulateTag("div style='position:relative; top:0px; left:0px; height:100%; width:25px; background:#ffffcc;'");
	this.body.appendChild(r);
}

/// For each banner, the left hand margin of the workspace is either a vertical ruler or
/// a blank spacer (controlled by the second argument of the createGenericBody call).
///  This implements the ruler option.
ZRU.AbstractBannerEdit.prototype.addRuler=function() {	
// FIX THIS: CHECK UNITS
	var r=ZRU.Ruler.create("0","1","1","in","8","vertical");
	var rbs=r.base.style;
	rbs.position="relative";
	rbs.top="0px";
	rbs.left="0px";
	rbs.background="#ffffcc";
	this.body.appendChild(r.base);
	this.ruler=r;
}

ZRU.AbstractBannerEdit.prototype.addControlArea=function() {
	this.ctrlArea=ZLM.simulateTag("div class='zTableEditCtrlArea' style='position:absolute;top:0px;right:0px;width:24px;height:100%;background:#e8e7e2;border:1px solid #000000;overflow:hidden;'");
	this.ctrlArea.controller=this;
	this.body.appendChild(this.ctrlArea);
}

ZRU.AbstractBannerEdit.prototype.serviceZoneControl=function(mode) {
	if (mode==1) this.convertToBodyBanner();
	else if (mode==2) this.convertToBodyParagraph();
	else if (mode==3) this.convertToBodyNVP();
	else if (mode==4) this.convertToTable();
}

ZRU.AbstractBannerEdit.prototype.dispatchMouseEvent=function(event) {
	var et = event.type;
	if (et=="mousemove" && !this.trackMouse) return;
	if (et=="click" && this.activeZone!=true) {
		this.activateZone();
		return;
	}
	if (this.enabled!=true) return;
	if (event.currentTarget==this.area || event.currentTarget==this.plate) {
		var t=event.target;
		var l = ZRU.locateEvent(event,event.currentTarget);
		ZRU.lastBannerClicked = this;
		ZRU.lastClickX = ZRU.convertToPoints(l.x);
		ZRU.lastClickY = ZRU.convertToPoints(l.y);
		if (et=="mousedown"||et=="click"||et=="dblclick") {
			if (t==this.area || t==this.activeLabel || t==this.idleHeader || t==this.area) {
				// Deleted for IE compatibility
			}	
		}
		if (et=="mouseover") this.serviceMouseOver(event);
		else if (et=="mouseout") this.serviceMouseOut(event);
		else if (et=="mousedown") this.serviceMouseDown(event);
		else if (et=="mouseup") this.serviceMouseUp(event);
		else if (et=="mousemove") this.serviceMouseMove(event);
		else if (et=="click") this.serviceMouseClick(event);
		else if (et=="dblclick") this.serviceMouseDoubleClick(event);
	}
}

ZRU.AbstractBannerEdit.prototype.serviceMouseOver=function(event) {
}

ZRU.AbstractBannerEdit.prototype.serviceMouseOut=function(event) {
}

ZRU.AbstractBannerEdit.prototype.serviceMouseDown=function(event) {
	var keyModes = this.trackingModes;
	if (keyModes.indexOf(zenPage._editor._editMode)>=0) {
		var x=ZRU.lastClickX;
		var y=ZRU.lastClickY;
		// color was #99cff1
		var tb=ZLM.simulateTag("div style='position:absolute; left:"+x+"pt; top:"+y+"pt; width:1pt; height:1pt; border:1px dotted #093f61;'");
		this.area.appendChild(tb);
		this.tmpBox=tb;
		this.tmpBoxLocale={ax:x,ay:y,bx:(x+1),by:(y+1)};
		this.trackMouse=true;
	}
}

ZRU.AbstractBannerEdit.prototype.serviceMouseMove=function(event) {
	if (this.tmpLine) this.tmpLine.style.top=ZRU.lastClickY-1+"pt";
	else {
		var keyModes = this.trackingModes;
		if (this.trackMouse && this.tmpBox && keyModes.indexOf(zenPage._editor._editMode)>=0) {
			var tbs = this.tmpBox.style;
			var tbl = this.tmpBoxLocale;

			var nx = ZRU.lastClickX;
			var ny = ZRU.lastClickY;

			tbl.bx = nx;
			tbl.by = ny;

			var ux = tbl.ax;
			if (nx<ux) {
				ux = nx;
				nx = tbl.ax;
			}
			var uy = tbl.ay;
			if (ny<uy) {
				uy = ny;
				ny = tbl.ay;
			}
			tbs.top = uy+"pt";
			tbs.left = ux+"pt";
			tbs.width = (nx-ux)+"pt";
			tbs.height = (ny-uy)+"pt";
		}
	}
}

ZRU.AbstractBannerEdit.prototype.serviceMouseUp=function(event) {
	var keyModes = this.trackingModes;
	if (this.trackMouse && this.tmpBox && keyModes.indexOf(zenPage._editor._editMode)>=0) {
		this.trackMouse=false;
		var tb = this.tmpBox;
		this.area.removeChild(tb);
		var tbl=this.tmpBoxLocale;

		var nx = ZRU.lastClickX;
		var ny = ZRU.lastClickY;

		var ux = tbl.ax;
		if (nx<ux) {
			ux = nx;
			nx = tbl.ax;
		}
		var uy = tbl.ay;
		if (ny<uy) {
			uy = ny;
			ny = tbl.ay;
		}
		this.boxSize = {x:ux,y:uy,w:(nx-ux),h:(ny-uy)};
		this.tmpBox = null;
		this.tmpBoxLocale = null;
		if (zenPage._editor._editMode=="SELECT") {
			this.multiSelectArea(this.boxSize,event.shiftKey);
		}
		return(ZLM.killEvent(event));
	}
	return(ZLM.killEvent(event));
}

ZRU.AbstractBannerEdit.prototype.serviceMouseClick=function(event) {
}

ZRU.AbstractBannerEdit.prototype.serviceMouseDoubleClick=function(event) {
}

ZRU.AbstractBannerEdit.prototype.multiSelectArea = function(box,additive) {
	if (!this.item.length) return;
	if (!additive) zenPage._editor.clearSelection();
	var lx = box.x;
	var ly = box.y;
	var ux = lx+box.w;
	var uy = ly+box.h;

	var len = this.item.length;
	for (var i=0;i<len;i++) {
		var node = this.item[i];
		var gc = node.gc;
		if (gc) {
			var x = gc.sizeLeft;
			if (x>=lx && x<=ux ) {
				var y = gc.sizeTop;
				if (y>=ly && y<=uy) {
					var ex = x+gc.sizeWidth;
					var ey = y+gc.sizeHeight;
					if (ex<=ux && ey<=uy) {
						zenPage._editor.addToSelection(node);
					}
				}
			}
		}
	}
}

ZRU.AbstractBannerEdit.prototype.initializeFrameSizePt=function(widthStr,heightStr) {
	this.frame.resizeAreaPt(parseInt(heightStr,10));
	this.frame.originalHeight = heightStr;
	this.frame.originalWidth = widthStr;
	this.frame.userResized = false;
}

/// Add the atributes of w and h to the given object to hold the current
/// width and height of the frame (as dimensioned value strings)  
ZRU.AbstractBannerEdit.prototype.projectFrameSize=function(o) {
	if (this.frame.userResized) {
		var ppr= ZRU.Ruler.getPixelPointRatio();
		var widthStr=Math.round(this.area.offsetWidth/ppr)+"pt";
		var heightStr=Math.round(this.area.offsetHeight/ppr)+"pt";

		o.h=heightStr;
		o.w=widthStr;
	}
	else { // restore originals settings to avoid roundoff errors
		o.h = this.frame.originalHeight;
		o.w = this.frame.originalWidth;
	}
}

/// The structure of the driving XML determines IF a given banner section should
/// exist, but not all sections are actually needed.  This method turns a potential
/// section into an actual one.
ZRU.AbstractBannerEdit.prototype.activateZone=function() {
	if (this.ruler && this.masterBanner && this.masterBanner.ruler) this.ruler.units=this.masterBanner.ruler.units;
	this.activeZone=true;
	this.activeLabel.style.display="";
	this.ctrlArea.style.display="block";
	this.idleHeader.style.display="none";
	this.shortHeader.style.display="none";
	this.fullHeader.style.display="block";
	if (this.frame) {
		this.frame.setResizable(true);
///ALERT HARD CODED NUMBER
		this.frame.resizeAreaPt(75);
	}
	this.enable();
}

/// The structure of the driving XML determines IF a given banner section should
/// exist, but not all sections are actually needed.  This method reverts an actual
/// working section back to simply a potential one.
ZRU.AbstractBannerEdit.prototype.deactivateZone=function() {
	if (this.masterBanner) { // We must be a subBanner...
		this.masterBanner.removeSubBanner(this);
	}
	else {
		this.activeZone=false;
		this.activeLabel.style.display="none";
		this.ctrlArea.style.display="none";
		this.idleHeader.style.display="";
		this.shortHeader.style.display="none";
		this.fullHeader.style.display="none";
		this.frame.setResizable(false);
		this.frame.resizeAreaPx(this.sectionHeaderHeight);
		this.frame.handle.style.display="none";
		this.disable();
	}
}

/// Make the current section event sensitive
ZRU.AbstractBannerEdit.prototype.enable=function() {
	if (!this.activeZone) return;
	this.enabled=true;
	this.plate.style.display="none";
	this.plate.style.background="";
	if (this.subBanners) { // notify any conditional sections of the change
		for (var i=0;i<this.subBanners.length;i++) {
			this.subBanners[i].editor.enable();
		}
	}
}

/// Make the current section event insensitive, effectively disabling it.
ZRU.AbstractBannerEdit.prototype.disable=function(shade) {
	this.enabled=false;
	this.plate.style.display="block";
	if (shade) this.plate.style.background="url(images/shadow.png) repeat fixed";
	if (this.subBanners) { // notify any conditional sections of the change
		for (var i=0;i<this.subBanners.length;i++) {
			this.subBanners[i].editor.disable(shade);
		}
	}
}

ZRU.AbstractBannerEdit.prototype.hideBody=function() {
	this.restoreHeight = this.base.offsetHeight;
	this.shortHeader.style.display="block";
	this.fullHeader.style.display="none";
	this.fullHeaderActive = false;
	this.frame.setResizable(false);
	this.frame.resizeAreaPx(this.sectionHeaderHeight);
	this.scaleHeaderText();
}

ZRU.AbstractBannerEdit.prototype.showBody=function() {
	this.shortHeader.style.display="none";
	this.fullHeader.style.display="block";
	this.fullHeaderActive = true;
	this.frame.setResizable(true);
	this.frame.resizeAreaPx(this.restoreHeight);
	this.scaleHeaderText();
}

/// Remove the contents of this banner as well as deleting any conditional subBanners
ZRU.AbstractBannerEdit.prototype.clearZone=function() {
	for (var i=this.item.length-1;i>=0;i--) {
		this.area.removeChild(this.item[i].base);
		this.item.pop();
	}
	if (this.subBanners) {
		for (var i=this.subBanners.length-1;i>=0;i--) {
			this.removeSubBanner(this.subBanners[i]);
		}
	}
}

/// Revert this section to it's completely undefined state
ZRU.AbstractBannerEdit.prototype.purgeZone=function() {
	this.clearZone();
	this.deactivateZone();
}

/// Determine the amount of column space needed to render this section in the Editor
ZRU.AbstractBannerEdit.prototype.calculateMaxColumnRun = function() {
	// works in pixels internally but ultimately returns points
	var ppr = ZRU.Ruler.getPixelPointRatio();
	var h = this.area.offsetHeight;
	if (this.viewportHeight) h = ZRU.convertToPixels(this.viewportHeight);
	if (this.breaking) h+=12;
	if (this.activeZone && this.fullHeaderActive) h+=this.sectionHeaderFullHeight;
	else h+=this.sectionHeaderHeight;
	var newSz = h/ppr;
	return(newSz);	
}

ZRU.AbstractBannerEdit.prototype.getSubSectionDialog = function() {
	if (!this.subSectionDialog) {
		var d=ZLM.simulateTag("div style='z-index:500;position:absolute;top:50%;left:35%;right:35%;height:110px;background:#fcfcff;overflow:hidden;border:2px solid #404040;display:none;'");
		var h=[];
		h.push("<div style='text-align:center;font:bold 14pt Arial;width:100%;background:#356B8D;color:#efefef;'>Create Subordinate Banner</div>");
		h.push("<div style='width:210px;margin-left:auto;margin-right:auto;'>");
		h.push("<input type='radio' name='ssd"+this.instanceNum+"' value='0' checked onclick='"+this.objHook+"subSectionDialogValue=0;'/> Conditional Subsection<br/>");
		h.push("<input type='radio' name='ssd"+this.instanceNum+"' value='1' onclick='"+this.objHook+"subSectionDialogValue=1;'/> Running Head Redefinition");
		h.push("</div><hr/>");
		h.push("<span style='position:absolute;right:5%;bottom:5px;'>");
		h.push("<button type='button' class='commandButton' onclick='"+this.objHook+"hideSubSectionDialog();' >Cancel</button>");
		h.push("<button type='button' class='commandButton' onclick='"+this.objHook+"addSubSection();' >Okay</button>");
		h.push("</span>");
		d.innerHTML = h.join("");
		this.subSectionDialog = d;
		this.subSectionDialogValue = 0;
		document.body.appendChild(d);
	}
	return(this.subSectionDialog);
}

ZRU.AbstractBannerEdit.prototype.hideSubSectionDialog = function() {
	var plate = document.getElementById("zenMouseTrap");
	if (plate) plate.style.display="none";
	var d = this.getSubSectionDialog();
	if (d) d.style.display = "none";
}

ZRU.AbstractBannerEdit.prototype.showSubSectionDialog = function() {
	var plate = document.getElementById("zenMouseTrap");
	if (plate) plate.style.display="";
	var d = this.getSubSectionDialog();
	d.style.display = "";
}

ZRU.AbstractBannerEdit.prototype.confirmAddSubSection = function() {
	this.showSubSectionDialog();
}

ZRU.AbstractBannerEdit.prototype.addSubSection = function() {
	this.hideSubSectionDialog();
	this.addSubBanner();
}

///The plumbing for conditional banners is the same as running headers
///it just needs a kick to become a running header instead.
ZRU.AbstractBannerEdit.prototype.forceRunningHeader = function() {
	this.runningHeader = true;
	this.condition = false;
	this.watermark = "RUNNING HEADER UPDATE";
	this.activeLabel.innerHTML = this.watermark;
	if (this.fullHeader) {
		this.headSpace.removeChild(this.fullHeader);
		this.headSpace.removeChild(this.shortHeader);
		this.createShortHeader();
		this.createFullHeader();
		this.fullHeader.style.display="block";
	}
}

/// For base sections that support conditional sections or running headers, add the
/// basic plumbing for a subBanner
ZRU.AbstractBannerEdit.prototype.addSubBanner=function(reference) {
	// Subbanners are used for conditional content and are appended to the end of
	// of the main banner sections
	if (!this.subBanners) this.subBanners=[];

	var b=ZRU.ResizeBanner.create();
	this.prefixStr = this.frame.prefixStr;
	b.prefixStr = this.frame.prefixStr;
	this.subBanners.push(b);
	if (!reference) reference = this.frame.base.nextSibling;
	this.frame.base.parentNode.insertBefore(b.base,reference);
	var bbs=b.base.style;
	bbs.position="relative";
	bbs.left="0px";
	bbs.top="0px";
	bbs.width="100%";
	bbs.height="24pt";

//var newSz = this.calculateMaxColumnRun();
//this.frame.resizeAreaPt(newSz);

	var n=ZRU.ConditionalBannerEdit.create("CONDITIONAL "+this.watermark,this.base.getAttribute("pageWidth"),this.base.getAttribute("units"));
	n.frame=b;
	n.setMasterBanner(this);
	if (this.subSectionDialogValue==1) n.forceRunningHeader();
	b.area.appendChild(n.base);
	b.editor=n;
	b.setReshapeNotify("this.editor.sizeChangedCB(this.userArea);");
	b.dropScope=this.dropScope;
	var active = true;
	n.activateZone();
	var newSz = n.calculateMaxColumnRun();
	n.frame.resizeAreaPt(newSz);

	ZLM.initTargetNodes();
}

///REVIEW THIS
ZRU.AbstractBannerEdit.prototype.restoreSubBanner=function(jsObj) {
	// Subbanners are used for conditional content and are appended to the end of
	// of the main banner sections
	var refNode = this.frame.base.nextSibling;
	if (!this.subBanners) this.subBanners=[];
	var len = this.subBanners.length;
	if (len>0) refNode = this.subBanners[len-1].base.nextSibling;
	

	var b=ZRU.ResizeBanner.create();
	this.prefixStr = this.frame.prefixStr;
	b.prefixStr = this.frame.prefixStr;
	this.subBanners.push(b);
	this.frame.base.parentNode.insertBefore(b.base,refNode);
	var bbs=b.base.style;
	bbs.position="relative";
	bbs.left="0px";
	bbs.top="0px";
	bbs.width="100%";
	bbs.height="24pt";
	var n = null;
	if (jsObj.t=="cn") {
		n=ZRU.ConditionalNVP.create("CONDITIONAL "+this.watermark,this.base.getAttribute("pageWidth"),this.base.getAttribute("units"));
	}
	else if (jsObj.t=="cp") {
		n=ZRU.ConditionalPara.create("CONDITIONAL "+this.watermark,this.base.getAttribute("pageWidth"),this.base.getAttribute("units"));
	}
	else {
		n=ZRU.ConditionalBannerEdit.create("CONDITIONAL "+this.watermark,this.base.getAttribute("pageWidth"),this.base.getAttribute("units"));
	}
	if (n) {
		n.frame=b;
		n.setMasterBanner(this);
		if (n.ruler) n.ruler.units=this.ruler.units;

		b.area.appendChild(n.base);
		b.editor=n;
		b.setReshapeNotify("this.editor.sizeChangedCB(this.userArea);");
		b.dropScope=this.dropScope;
		var active = true;
		n.restoreObj(jsObj);
		var newSz = n.calculateMaxColumnRun();
		n.frame.resizeAreaPt(newSz);
		ZLM.initTargetNodes();
	}
}

ZRU.AbstractBannerEdit.prototype.removeSubBanner=function(who) {
	var sb = this.subBanners;
	if (!sb) return;
	var len = sb.length;
	var node = null;
	for (var i=0;i<len;i++) {
		if (sb[i].editor==who) node=sb[i];
		if (node && i<len-1) sb[i]=sb[i+1];
	}
	if (node) {
		sb.pop();
		node.base.parentNode.removeChild(node.base);
	}
}

ZRU.AbstractBannerEdit.prototype.servicePageBreakControl=function() {
	if (!this.breaking) {
		this.breaking=true;
		this.addPageBreakMarker();
	}
	else {
		this.breaking=false;
		this.removePageBreakMarker();
	}
}

ZRU.AbstractBannerEdit.prototype.addPageBreakMarker=function() {
	var placement = "bottom:0px;";
	var styleStr = "position:absolute;width:100%; height:6px; background-image:url(portal/pageBreakFill.png); background-repeat: repeat; z-index:1; "+placement;
	if (!this.breakDiv) {
		this.breakDiv = ZLM.makeElement("div",{style:styleStr});
		this.breakSpot = placement;
		this.base.appendChild(this.breakDiv);
		var newSz = this.area.offsetHeight+this.sectionHeaderFullHeight+1;
		this.hilightHeaderControl(this.pgCtrl);
		this.frame.resizeAreaPx(newSz);
	}
}

ZRU.AbstractBannerEdit.prototype.removePageBreakMarker=function() {
	if (this.breakDiv) {
		this.base.removeChild(this.breakDiv);
		var newSz = this.area.offsetHeight+this.sectionHeaderFullHeight+1;
		this.frame.resizeAreaPx(newSz);
		this.deHilightHeaderControl(this.pgCtrl);
	}
	this.breakDiv = null;
}

ZRU.AbstractBannerEdit.prototype.moveToFront=function(obj) {
	if (obj) {
		this.area.removeChild(obj.base);
		this.area.appendChild(obj.base);
	}
}

ZRU.AbstractBannerEdit.prototype.addDroppedItem = function(x,y,fieldName,xPath) {
	this.addDataItem(x,y,fieldName,xPath);
}

ZRU.AbstractBannerEdit.prototype.addDataItem=function(x,y,fieldName,xPath) {
	return(null);
}

ZRU.AbstractBannerEdit.prototype.clearZone=function() {
	for (var i=this.item.length-1;i>=0;i--) {
		this.area.removeChild(this.item[i].base);
	}
}

ZRU.AbstractBannerEdit.prototype.setGroupName=function(name) {
	this.groupName=name;
}

ZRU.AbstractBannerEdit.prototype.setEditMode=function(mode) {
	this.editMode=mode;
	this.plate.style.display="none";
}

ZRU.AbstractBannerEdit.prototype.setUnits=function(x) {
// Internally units should be either pt, mm, or px
	switch(x) {
		case "in": 
			this.pageUnits="in";
			this.units="pt";
			break;
		case "pt":
			this.pageUnits="in";
			this.units="pt";
			break;
		case "cm":
			this.pageUnits="cm";
			this.units="mm";
			break;
		case "mm":
			this.pageUnits="cm";
			this.units="mm";
			break;
		default:
			this.pageUnits=x;
			this.units="px";
	}

	if (this.ruler) this.ruler.setUnits(this.pageUnits);
	this.rawUnits=x;
}

ZRU.AbstractBannerEdit.prototype.setPageWidth=function(x) {
	if ((""+parseFloat(x))==x) x = x+this.pageUnits;
	this.pageWidthPx = ZRU.convertToPixels(x);
	this.area.style.width=this.pageWidthPx+"px";
	this.plate.style.width=this.pageWidthPx+"px";
	this.pageWidth = ZRU.convertToPoints(this.pageWidthPx+"px");
}

ZRU.AbstractBannerEdit.prototype.setPageHeight=function(yPx) {
	if (this.ruler) {
		if (this.units=="pt") var y=yPx/ZRU.Ruler.getPixelPointRatio()/72;
		else if (this.units=="mm") var y=yPx/ZRU.Ruler.getPixelMilliRatio()/10;
		else y=yPx;
		if (this.ruler.units=="M" && this.units=="pt") y *= 2.834645669;
		this.ruler.setMaximum(y);
		this.ruler.updateTicks();
	}
}

ZRU.AbstractBannerEdit.prototype.sizeChangedCB=function(wrapper) {
//ZLM.cerr("sizeChangedCB called with new height "+wrapper.offsetHeight);
}

//=====================================
// CONVERSTION FUNCTIONS
//-------------------------------------
ZRU.AbstractBannerEdit.prototype.reInitEditor = function(restoreObj,newEditType) {
	if (!restoreObj) return;
	var bMaster = this.master;
	var i = this.frame.idx;
	bMaster.removeBannerEditor(i);
	if (newEditType=="Table") {
		bMaster.embedTableEditor(i,this.frame.watermark,this.frame.dropScope,null);
	}
	else if (newEditType=="BodyBanner") {
		bMaster.embedBodyEditor(i,this.frame.watermark,this.frame.dropScope,1,null);
	}
	else if (newEditType=="BodyPara") {
		bMaster.embedParagraphEditor(i,this.frame.watermark,this.frame.dropScope,1,null);
	}
	else if (newEditType=="BodyNVP") {
		bMaster.embedNVPEditor(i,this.frame.watermark,this.frame.dropScope,null);
	}
	bMaster.sec[i].editor.setGroupName(this.groupName);
	bMaster.sec[i].editor.restoreObj(restoreObj);
	ZLM.initDataDragDrop();
}

ZRU.AbstractBannerEdit.prototype.reInitSubEditor = function(restoreObj,newEditType) {
	if (!restoreObj) return;
	var b = this.frame;
	b.area.removeChild(this.base);

	var n = null;
	if (newEditType=="ConditionalBannerEdit") {
		n=ZRU.ConditionalBannerEdit.create(this.watermark,this.base.getAttribute("pageWidth"),this.base.getAttribute("units"));
	}			
	else if (newEditType=="ConditionalPara") {
		n=ZRU.ConditionalPara.create(this.watermark,this.base.getAttribute("pageWidth"),this.base.getAttribute("units"));
	}			
	else if (newEditType=="ConditionalNVP") {
		n=ZRU.ConditionalNVP.create(this.watermark,this.base.getAttribute("pageWidth"),this.base.getAttribute("units"));
	}			
	if (n) {
		n.frame=b;
		n.setMasterBanner(this.masterBanner);
		b.area.appendChild(n.base);
		b.editor=n;
		b.setReshapeNotify("this.editor.sizeChangedCB(this.area);");
		b.dropScope=this.dropScope;
		var active = true;
		n.setGroupName(this.groupName);
		n.restoreObj(restoreObj);
		ZLM.initTargetNodes();
	}
}

ZRU.AbstractBannerEdit.prototype.convertToTable = function() {
	var tObj = this.exportToTableObj();
	this.reInitEditor(tObj,"Table");
}

ZRU.AbstractBannerEdit.prototype.convertToBodyBanner = function() {
	var tObj = this.exportToBannerObj();
	this.reInitEditor(tObj,"BodyBanner");
}

ZRU.AbstractBannerEdit.prototype.convertToBodyParagraph = function() {
	var tObj = this.exportToParagraphObj();
	this.reInitEditor(tObj,"BodyPara");
}

ZRU.AbstractBannerEdit.prototype.convertToBodyNVP = function() {
	var tObj = this.exportToNVPObj();
	this.reInitEditor(tObj,"BodyNVP");
}

ZRU.AbstractBannerEdit.prototype.convertToConditionalBanner=function() {
	var tObj = this.exportToConditionalBannerObj();
	this.reInitSubEditor(tObj,"ConditionalBannerEdit");
}

ZRU.AbstractBannerEdit.prototype.convertToConditionalParagraph=function() {
	var tObj = this.exportToParagraphObj();
	this.reInitSubEditor(tObj,"ConditionalPara");
}

ZRU.AbstractBannerEdit.prototype.convertToConditionalNVP=function() {
	var tObj = this.exportToNVPObj();
	this.reInitSubEditor(tObj,"ConditionalNVP");
}

//========================================
// EXPORT AND RESTORE FUNCTIONS
//----------------------------------------
ZRU.AbstractBannerEdit.prototype.restoreObj = function(o) {
	return(true);
}

ZRU.AbstractBannerEdit.prototype.exportToBannerObj=function() {
	var o = {};
	o.t = 'b';
	o.g = this.groupName;
	o.a = true;
	return(o);
}

ZRU.AbstractBannerEdit.prototype.exportToTableObj=function() {
	var o = {};
	o.t = 't';
	o.g = this.groupName;
	o.a = true;
	return(o);
}

ZRU.AbstractBannerEdit.prototype.exportObj=function() {
	var o={};
	return(o);
}

ZRU.AbstractBannerEdit.prototype.exportJSON=function(data) {
}

ZRU.AbstractBannerEdit.prototype.exportZRS=function(data,coda) {
}

//=======================
// BANNER EDIT CLASS 
//=======================
ZRU.lastBannerClicked = null;
ZRU.lastClickX = null;
ZRU.lastClickY = null;

ZRU.BannerEdit=function(div) {
	ZLM.initializeObject(this,div,"ZRU.BannerEdit");
	this.body=null;
	if (div) this.initializeFromDiv(div);
	else {
		this.watermark="";
		this.prompt="";
		this.body=null;
		this.mouseTracking=false;
		this.activeZone=false;
		this.item=[];
		this.initialized=0;
		this.breaking=false;
		this.enabled=false;
	}
	return(this);
}

ZRU.BannerEdit.prototype=new ZRU.AbstractBannerEdit();

ZRU.BannerEdit.create=function(watermark,pageWidth,units,prompt) {
	var div=ZLM.simulateTag("div class='bannerEdit'");
	if (prompt!=undefined) div.setAttribute("prompt",prompt);
	if (watermark!=undefined) div.setAttribute("watermark",watermark);
	if (pageWidth!=undefined) div.setAttribute("pageWidth",pageWidth);
	if (units!=undefined) div.setAttribute("units",units);
	return(new ZRU.BannerEdit(div));	
}

ZRU.BannerEdit.prototype.createBody=function() {
	this.createGenericBody("BannerEdit",true);
	this.createZoneTypeControl(1);
	this.setZoneTypeDefault(1);
}


ZRU.BannerEdit.endDataDrop=function() {
	var n=ZLM.getDragDestination();
	if (!n.controller.enabled) return;
	n.controller.handleDataDrop();
}

ZRU.BannerEdit.serviceMouse=function(who,event) {
	if (who>=ZRU.BannerEdit.registry.length) return;
	var n=ZRU.BannerEdit.registry[who];
	if (n) n.dispatchMouseEvent(event);
}

ZRU.BannerEdit.prototype.getFirstDataChild = function() {
	for (var k = this.area.firstChild;k!=null;k=k.nextSibling) {
		var id = k.getAttribute("boxId");
		if (id) return(k);
	}
	return(null);
}

ZRU.BannerEdit.prototype.handleDataDrop = function() {
	var e=ZLM.getDragEndEvent();
	var px = ZLM.getPageOffsetLeft(this.area);
	var py = ZLM.getPageOffsetTop(this.area);

	var x = e.clientX-px;
	var y = e.clientY-py;

	if (e.pageX) {
		x = e.pageX-px;
		y = e.pageY-py;
	}
	var obj=ZLM.getDragData();
	var images = [];
	var charts = [];
	var bcodes = [];
	var z=this.item;
	for (var i=z.length-1;i>=0;i--) {
		if (z[i].itemClass=='CHART') charts.push(z[i]);
		else if (z[i].itemClass=='IMAGE') images.push(z[i]);
		else if (z[i].itemClass=='BCODE') bcodes.push(z[i]);
	}

	var len = charts.length;
	for (var i=0; i<len; i++) {
		var gc = charts[i].base;
		var lx = gc.offsetLeft;
		var ux = lx+gc.offsetWidth;
		var ly = gc.offsetTop;
		var uy = ly+gc.offsetHeight;
		if (x>lx && x<ux && y>ly && y<uy) {
			charts[i].addDatum(obj.name,obj.group);
			return;
		}
	}

	var len = images.length;
	for (var i=0; i<len; i++) {
		var gc = images[i].base;
		var lx = gc.offsetLeft;
		var ux = lx+gc.offsetWidth;
		var ly = gc.offsetTop;
		var uy = ly+gc.offsetHeight;
		if (x>lx && x<ux && y>ly && y<uy) {
			images[i].setDynamicURL(obj.name);
			return;
		}
	}

	var len = bcodes.length;
	for (var i=0; i<len; i++) {
		var gc = bcodes[i].base;
		var lx = gc.offsetLeft;
		var ux = lx+gc.offsetWidth;
		var ly = gc.offsetTop;
		var uy = ly+gc.offsetHeight;
		if (x>lx && x<ux && y>ly && y<uy) {
			bcodes[i].setDynamicSrc(obj.name);
			return;
		}
	}

	if (!x || x<0) return;
	if (!y || y<0) return;

	var x = ZRU.convertToPoints(x);
	var y = ZRU.convertToPoints(y);
	var item = this.addDataItem(x,y,obj.name,obj.group);
	zenPage._editor.resetMode();
	item.setSelection(null);
}

ZRU.BannerEdit.prototype.serviceMouseOver=function(event) {
	if (zenPage._editor._editMode=="LINE") {
		var l = ZRU.locateEvent(event);
		var tl=ZLM.simulateTag("div style='position:absolute; left:0px; width:100%; height:0px; background:black; border-top:1px solid #99cff1;'");
		tl.style.top=l.y-1+"px";
		this.area.appendChild(tl);
		this.tmpLine=tl;
		this.trackMouse=true;
	}
}

ZRU.BannerEdit.prototype.serviceMouseOut=function(event) {
	if (this.tmpLine) {
		this.area.removeChild(this.tmpLine);
		this.tmpLine=null;
	}
	else if (this.tmpBox) {
		this.serviceMouseUp(event);
	}
	this.trackMouse=false;
}

ZRU.BannerEdit.prototype.serviceMouseClick=function(event) {
	this.minItemWidth = 10;
	this.minItemHeight = 10;

	ZRU.lastBannerClicked = this;
	var l = ZRU.locateEvent(event,event.currentTarget);
	ZRU.lastClickX = ZRU.convertToPoints(l.x);
	ZRU.lastClickY = ZRU.convertToPoints(l.y);
	var em = zenPage._editor._editMode;
	if (!this.boxSize) {
		this.boxSize = {x:l.x,y:l.y,w:10,h:10};
	}

	var bs = {};
	bs.x = ZRU.convertToPixels(this.boxSize.x+"pt");
	bs.y = ZRU.convertToPixels(this.boxSize.y+"pt");
	bs.w = ZRU.convertToPixels(this.boxSize.w+"pt");
	bs.h = ZRU.convertToPixels(this.boxSize.h+"pt");
	if (bs.w<this.minItemWidth) bs.w = this.minItemWidth;
	if (bs.h<this.minItemHeight) bs.h = this.minItemHeight;

	if (em=="SELECT") {
		// deleted for IE compatibility
	}
	if (em=="TEXT") {
		var item = this.item;
		var len = item.length;
		var reedit = null;
		var x = ZRU.lastClickX;
		var y = ZRU.lastClickY;
		for (var i=0;i<len;i++) {
			if (item[i].itemClass=="CAPN") {
				var g=item[i].gc;
				
				if (x>=g.sizeLeft && y>=g.sizeTop && x<g.sizeLeft+parseInt(g.sizeWidth,10) && y<g.sizeTop+parseInt(g.sizeHeight,10)) {
					reedit=item[i];
					i=len;
				}
			}
		}
		if (reedit) {
			this.editCaption(reedit);
		}
		else {
			this.addCaption(l.x,l.y);		
		}
	}
	if (em=="RECT") {
		this.addBox(bs.x,bs.y,bs.w,bs.h,true);
	}
	if (em=="IMAGE") {
		var url = "http://"+window.location.host+"/csp/broker/images/placeimagehere.png";
		this.addImage(bs.x,bs.y,bs.w,bs.h,url);
	}
	if (em=="BCODE") {
		this.addBarcode(bs.x,bs.y,bs.w,bs.h,"BARCODE");
	}
	if (em=="CHART") {
		this.addChart(bs.x,bs.y,bs.w,bs.h);
	}
	if (this.tmpLine) { // add line
		this.addHLine();
	}
}

ZRU.BannerEdit.prototype.addControls=function() {
	this.ctrlArea=ZLM.simulateTag("div class='zBannerEditCtrlArea' style='display:none;position:absolute;top:0px;right:0px;width:24px;height:100%;background:#e8e7e2;border:1px solid #000000;overflow:hidden;'");
	this.ctrlArea.controller=this;
	var closeB = ZLM.simulateTag("a title='Delete entire section' onclick='"+this.objHook+"purgeZone();' style='position:absolute;top:0px;left:0px;width:24px;height:24px;background-image:url(deepsee/close_b_24.png);'");
	this.ctrlArea.appendChild(closeB);
	this.body.appendChild(this.ctrlArea);
}

// Add the current tmpLine to the work area as an element
ZRU.BannerEdit.prototype.addHLine=function() {
//ADJUST tmp line location is in pixels, need to conver to points
	var x=ZRU.convertToPoints(this.tmpLine.offsetLeft);
	var y=ZRU.convertToPoints(this.tmpLine.offsetTop);
	var w=ZRU.convertToPoints(this.tmpLine.offsetWidth);
	this.tmpLine.style.display="none";
	this.addLine(x,y,w,true);
	zenPage._editor.resetMode();
}

ZRU.BannerEdit.prototype.addLine=function(x,y,w,select) {
	var n=new ZRU.BannerLineItem.create();
	this.area.appendChild(n.base);
	n.setGC(ZRU.initGC());
	n.setContents(x,y,w,ZRU.initGC().strokeWidth);
	this.addItemNode(n,select,false);
	return(n);
}

ZRU.BannerEdit.prototype.addBox=function(xPx,yPx,wPx,hPx,select) {
	var n = new ZRU.BannerBoxItem.create();
	this.area.appendChild(n.base);
	n.setGC(ZRU.initGC());
	n.setContents(xPx,yPx,wPx,hPx,"rect");
	this.addItemNode(n,select,false);
	return(n);	
}

ZRU.BannerEdit.prototype.addText=function(xPt,yPt,txt,select,path) {
	var n=null;
	if (txt == "$pageNum") n = ZRU.BannerPageNumItem.create();
	else n=ZRU.BannerTextItem.create();
	this.area.appendChild(n.base);
	n.setGC(ZRU.initGC());
	n.setPosition(xPt,yPt);
	this.addItemNode(n,select,false);
	n.setContents(txt,path);
	return(n);
}

ZRU.BannerEdit.prototype.addImage=function(xPx,yPx,wPx,hPx,url) {
	var n = new ZRU.BannerBoxItem.create();
	this.area.appendChild(n.base);
	n.setGC(ZRU.initGC());
	n.setContents(xPx,yPx,wPx,hPx,"image",url);
	this.addItemNode(n,true,false);
	return(n);	
}

ZRU.BannerEdit.prototype.addBarcode=function(xPx,yPx,wPx,hPx,value) {
	var n = new ZRU.BannerBarcodeItem.create();
	this.area.appendChild(n.base);
	n.setGC(ZRU.initGC());
	n.setContents(xPx,yPx,wPx,hPx,value,"code39");
	this.addItemNode(n,true,false);
	return(n);	
}

ZRU.BannerEdit.prototype.addChart=function(xPx,yPx,wPx,hPx) {
	var n = new ZRU.BannerChartItem.create();
	this.area.appendChild(n.base);

//	var img = "deepsee/area_chart_24.png";
//	var img = "deepsee/bar_chart_24.png";
//	var img = "deepsee/column_chart_24.png";
	var img = "deepsee/line_chart_24.png";
//	var img = "deepsee/pie_chart_24.png";

	n.setGC(ZRU.initGC());
	n.setContents(xPx,yPx,wPx,hPx,"chart",img);
	this.addItemNode(n,true,false);
	n.adjustBodySize();
	return(n);	
}

ZRU.BannerEdit.prototype.addItemNode=function(obj,select,multiSelect) {
	obj.setBoxNum(this.item.length);
	obj.setBanner(this);
	if (select) {
		if (multiSelect) {
			zenPage._editor.addToSelection(obj);
		}
		else obj.setSelection();
	}
	this.item.push(obj);
	zenPage._editor.resetMode();
}

ZRU.BannerEdit.prototype.dumpPaintingStack=function() {
	ZLM.cerr("HTML PAINTING STACK (Early to Late):");
	for (var k=this.area.firstChild;k!=null;k=k.nextSibling) {
		var id = k.getAttribute("boxId");
		if (id) ZLM.cerr(k.className+"("+id+")");
	}
	ZLM.cerr("KIDLIST PAINTING STACK (Early to Late):");
	var l = this.item.length;
	for (var i=0;i<l;i++) {
		var k = this.item[i];
		ZLM.cerr("box "+k.boxNum+" is a "+k.itemClass);
	}
}

/// Insert the given item object into the display paint list _before_ the given reference object
/// if hasId is false, also assign this object an id number.
ZRU.BannerEdit.prototype.insertItemNode=function(obj,refObj,hasId,select,multiSelect) {
	var item = this.item;
	var insPt = item[0].base;
	var insIdx = 0;
	if (refObj && refObj.base) {
		var l = item.length;
		for (var i=0;i<l;i++) {
			if (item[i]==refObj) {
				insIdx = i;
				i=l;
			}
		}
		insPt = refObj.base;
	}	
	if (!insPt) {
		this.appendItemNode(obj,hasId,select,multiSelect);
		return;
	}
	this.area.insertBefore(obj.base,insPt);
	if (!hasId) obj.setBoxNum(this.item.length);
	obj.setBanner(this);
	if (select) {
		if (multiSelect) {
			zenPage._editor.addToSelection(obj);
		}
		else obj.setSelection();
	}
	var l= this.item.length;
	for (var i=l;i>insIdx;i--) {
		item[i]=item[i-1];
	}
	item[insIdx]=obj;
	if (obj.box) this.area.insertBefore(obj.box.base,obj.base.nextSibling);
}


/// Append the given item object into the display paint list _at the end_.
/// if hasId is false, also assign this object an id number.
ZRU.BannerEdit.prototype.appendItemNode=function(obj,hasId,select,multiSelect) {
	this.area.appendChild(obj.base);
	if (!hasId) obj.setBoxNum(this.item.length);
	obj.setBanner(this);
	if (select) {
		if (multiSelect) {
			zenPage._editor.addToSelection(obj);
		}
		else obj.setSelection();
	}
	this.item.push(obj);
	if (obj.box) this.area.appendChild(obj.box.base);
}

/////

/// IF the caption editor happens to be live, close it down.
ZRU.BannerEdit.prototype.doneCaptionEdit=function() {
	var e = zenPage._editor.getTextEditorWidget();
	if (this.captionEditActive) {
		e.done();	
	}
	this.captionEditActive=false;
}

ZRU.BannerEdit.prototype.editCaption=function(item) {
	var e = zenPage._editor.getTextEditorWidget();
	if (this.captionEditActive) {
		e.done();	
	}
	
	this.captionEditActive=true;
	e.bindToNode(item.base,item.getDisplayValue(),item.objHook+"setValue(zenPage._editor.getTextEditorWidget().getValue());",null,item.gc);
	item.setValue("");
}

ZRU.BannerEdit.prototype.addCaption=function(xPx,yPx) {
	var e = zenPage._editor.getTextEditorWidget();
	if (this.captionEditActive) {
		e.done();	
	}
	this.captionEditActive=true;
	e.anchor(xPx,yPx,this.plate,this.objHook+"addFromCaptionEditor();",null,ZRU.initGC());
}

ZRU.BannerEdit.prototype.addFromCaptionEditor=function() {
	this.captionEditActive=false;
	var e = zenPage._editor.getTextEditorWidget();
	var v = e.getValue();
	if (v=="") return;
	var x = ZRU.convertToPoints(e._anchorX);
	var y = ZRU.convertToPoints(e._anchorY);
	this.addText(x,y,'!'+v,true,"");
	zenPage._editor.resetMode();
}

ZRU.BannerEdit.prototype.addChartDataItem=function(id,fieldName,groupName) {
	this.item[id].addDatum(fieldName,groupName);
}

ZRU.BannerEdit.prototype.addDataItem=function(x,y,fieldName,groupName) {
	for (var i = 0; i<this.item.length;i++) {
		if (this.item[i].objClass == "ZRU.BannerChartItem") {
			var g = this.item[i].gc;
			if (g) {
				if (x>=g.sizeLeft && x<=g.sizeLeft+g.sizeWidth && y>=g.sizeTop && y<=g.sizeTop+g.sizeHeight) {
					this.addChartDataItem(i,fieldName,groupName);
					return(this.item[i]);
				}
			}
		}
	}
	var rPath = "";
	if (groupName) {
		var pLen = groupName.length;
		var extra = this.frame.prefixStr.substring(pLen);
		var split = extra.split("/");
		var lvls = split.length-1;
		for (var i=0;i<lvls;i++) rPath+="../";
	}
	var n = this.addText(x,y,fieldName,true,rPath);
	return(n);
}

/// Remove an item from the display list of this banner
ZRU.BannerEdit.prototype.removeItem=function(who) {
	var shift=false;
	for (var i=0;i<this.item.length-1;i++) {
		if (this.item[i]==who) {
			this.area.removeChild(who.base);
			shift=true;
		}
		if (shift) this.item[i]=this.item[i+1];
	}
	if (shift || this.item[i]==who) {
		if (!shift) this.area.removeChild(who.base);
		this.item.pop();	
	}
}


/// Given a set of items, scan the list of child nodes and remove any nodes
/// that appear on the list.  Return an array of the edited items
ZRU.BannerEdit.prototype.removeSet=function(objs) {
	var a = [];
	if (!objs) return(a);
	if (!objs.length) return(a);
	var nk = null;
	for (var k=this.area.firstChild;k!=null;k=nk) {
		nk = k.nextSibling;
		var done = false;
		var idx = 0;
		var len = objs.length; 
		while (!done) {
			if (idx>=len) done=true;
			else {
				var o = objs[idx];
				if (o.base == k) {
					a.push(o);
					this.removeItem(o);
					done=true;
				}
				idx++;					
			}
		}
	}
	return(a);
}

/// Given an array of objects that are items of this banner
/// group them together and move them to the start of the 
/// painting queue
ZRU.BannerEdit.prototype.moveToBack=function(objs) {
	var a = this.removeSet(objs);
	for (var i=a.length-1;i>=0;i--) {
		this.insertItemNode(a[i],null,true,true,true);
	}			
}

/// Given an array of objects that are items of this banner
/// group them together and move them to one step earlier in 
/// painting queue than the earliest drawn item in the set
ZRU.BannerEdit.prototype.moveBackward=function(objs) {
	//walk the kid list from front to back making the insert point
	//the previous sibling of any node in the object set
	var refNode = null;
	var oLen = objs.length;
	var item = this.item;
	var l = item.length;
	for (var i=0;i<l && !refNode;i++) {
		var done=false;
		var k = item[i];
		for (var j=0;j<oLen && !done;j++) {
			if (k==objs[j]) {
				var refIdx = i-1;
				if (refIdx<0) {
					// The first child is IN the object set
					// it can't move backward, but any other 
					// items in the set can join him.
					if (oLen==1) return;
					for (var jj=j;jj<oLen-1;jj++) objs[jj]=objs[jj+1];
					objs.pop();
					refIdx=0;
				}
				refNode = item[refIdx];
				done=true;
			}
		}
	}
	var a = this.removeSet(objs);
	for (var i=a.length-1;i>=0;i--) {
		this.insertItemNode(a[i],refNode,true,true,true);
		refNode=a[i];
	}	
}

/// Given an array of objects that are items of this banner
/// group them together and move them to one step later in 
/// painting queue than the latest drawn item in the set
ZRU.BannerEdit.prototype.moveForward=function(objs) {
	// walk the kid list from back to front, making the insert point the next
	// sibling of any node in the object set
	var refNode = null;
	var oLen = objs.length;
	for (var k=this.activeLabel.nextSibling;k!=null;k=k.nextSibling) {
		var done=false;
		for (var i=0;i<oLen && !done;i++) {
			if (k==objs[i].base) {
				refNode = objs[i].base.nextSibling;
				if (refNode.className=="zenLayoutBox") refNode=refNode.nextSibling;
				// this gets us as far as the node, we really need to skip ahead
				if (refNode) refNode = refNode.nextSibling;
				if (refNode) refNode = refNode.nextSibling;
				done=true;
			}
		}
	}
	if (refNode && refNode.controller) {
		refNode=refNode.controller;
		var a = this.removeSet(objs);
		for (var i=a.length-1;i>=0;i--) {
			this.insertItemNode(a[i],refNode,true,true,true);
			refNode=a[i];
		}
	}			
	else this.moveToFront(objs);
}

/// Given an array of objects that are items of this banner
/// group them together and move them to the end of the 
/// painting queue
ZRU.BannerEdit.prototype.moveToFront=function(objs) {
	var a = this.removeSet(objs);
	for (var i=0;i<a.length;i++) {
		this.appendItemNode(a[i],true,true,true);
	}			
}

ZRU.BannerEdit.prototype.getSelectedBoxes=function() {
	var a=[];
	for (var i=0;i<this.item.length;i++) {
		if (this.item[i].box.selected==true) a[a.length]=i;
	}
	return(a);
}

ZRU.BannerEdit.prototype.getFOSVGBody=function() {
	var data = []
	var z=this.item;
	for (var i=0;i<z.length;i++) {
		if (z[i].exportFOSVG) z[i].exportFOSVG(data);
	}
	return(data);		
}

/// Override conversion when we're already in that format
ZRU.BannerEdit.prototype.convertToBodyBanner = function() {
}

ZRU.BannerEdit.prototype.restoreObj=function(o) {
	if (o.t=="t") return(false);  // not a table
	if (this.watermark.indexOf("HEADER")>0 && o.t!="h") return(false); // expected header
	if (o.g=="_p" && this.watermark.indexOf("PAGE")!=0) return(false); // wrong group
	if (o.g=="_r" && this.watermark.indexOf("REPORT")!=0) return(false); // still wrong group
	if (o.g.charAt(0)!='_' && this.watermark.indexOf(o.g)<0) return(false);// and still wrong group
	// if we're still here, we must be in the right banner, apply settings
	this.units = "pt";
	if (this.master && this.master.hRuler) this.ruler.units=this.master.hRuler.units;
	if (o.a) {
		this.activateZone();
		this.initializeFrameSizePt(o.w,o.h);
		this.setPageWidth(o.w);
		if (o.b==1) {
			this.breaking = true;
			this.addPageBreakMarker();
		}
		else this.breaking=false;

		var itemLen = o.i.length;
		if (itemLen) for (var i=0;i<itemLen;i++) {
			var item = o.i[i];
			// ADD STUFF TO THIS.ITEM
			var t = item.t;
			switch(t) {
				case "txt":
					var n = ZRU.BannerTextItem.restoreObj(item,this.area);
					break;
				case "box":
					var n = ZRU.BannerBoxItem.restoreObj(item,this.area);
					break;
				case "line":
					var n = ZRU.BannerLineItem.restoreObj(item,this.area);
					break;
				case "chart":
					var n = ZRU.BannerChartItem.restoreObj(item,this.area);
					break;
				case "pagenum":
					var n = ZRU.BannerPageNumItem.restoreObj(item,this.area);
					break;
				case "bcode":
					var n = ZRU.BannerBarcodeItem.restoreObj(item,this.area);
					break;
			}
if (!n) {
	alert('Attempt to restore banner item '+t+' failed, aborting restore');
	return(false);
}
			n.setBoxNum(this.item.length);
			n.setBanner(this);
			this.item.push(n);
		}
		var sb = o.cb;
		if (sb && sb.length>0) {
			this.subBanners = [];
			for (var i=0;i<sb.length;i++) {
				this.restoreSubBanner(o.cb[i]);
			}
		}

	}
	return(true);
}

ZRU.BannerEdit.prototype.exportObj=function() {
	var o = {};

	var t = "f"
	if (this.watermark.indexOf("HEADER")>0) t="h";
	o.t=t;
	var s = "_r";
	if (this.watermark.indexOf("PAGE")==0) s="_p";
	else if (this.watermark.indexOf("GROUP")==0) {
		var name=this.watermark.split("(")[1];
		s = name.split(")")[0];
	}
	o.g=s;
	o.a=this.activeZone;
	
	if (this.activeZone) {
		this.projectFrameSize(o);
		if (this.breaking) o.b=1;
		else o.b=0;

		o.i = [];
		var z=this.item;
		for (var i=0;i<z.length;i++) {
			var n = z[i].exportObj();
			o.i.push(n);
		}
		if (this.subBanners) { // export any conditional sections within this grouping
			o.cb = [];
			var z=this.subBanners;
			for (var i=0;i<z.length;i++) {
				var n = z[i].editor.exportObj();
				o.cb.push(n);
			}
		}
	}
	return(o);
}

ZRU.BannerEdit.prototype.exportJSON=function(data) {
	var t = "'_footer',"
	if (this.watermark.indexOf("HEADER")>0) t="'_header',";
	data.push("{bannerType:"+t);
	var s = "'_report',";
	if (this.watermark.indexOf("PAGE")==0) s="'_page',";
	else if (this.watermark.indexOf("GROUP")==0) {
		var name=this.watermark.split("(")[1];
		s = "'"+name.split(")")[0]+"',";
	}
	data.push("group:"+s);
	data.push("activeZone:"+this.activeZone);
	
	if (this.activeZone) {
		data.push(",")
		var ppr= ZRU.Ruler.getPixelPointRatio();
		var widthStr=Math.round(this.area.offsetWidth/ppr)+"pt";
		var heightStr=Math.round(this.area.offsetHeight/ppr)+"pt";

		data.push("height:'"+heightStr+"',");
		data.push("width:'"+widthStr+"',");

		if (this.breaking) data.push("breaking:1,");
		else data.push("breaking:0,");
		data.push("itemCount:"+this.item.length+",");
		data.push("item:[");
		var z=this.item;
		for (var i=0;i<z.length;i++) {
			z[i].exportJSON(data);
			if (i<z.length-1) data.push(",");
		}		
		data.push("]");
		if (this.subBanners) { // export any conditional sections within this grouping
			for (var i=0;i<this.subBanners.length;i++) {
				this.subBanners[i].editor.exportJSON(data);
			}
		}

	}
	data.push("}");
}

/// Return true if any of this banner's subbanners is a running header, else false
ZRU.BannerEdit.prototype.hasRunningHeader=function() {
	if (this.subBanners) { // check any conditional sections within this grouping
		for (var i=0;i<this.subBanners.length;i++) {
			if (this.subBanners[i].editor.isRunningHeader()) return(true);
		}
	}
	return(false);
}

/// Return the height (in points) of any subbanners that is a running header, else zero
ZRU.BannerEdit.prototype.getRunningHeaderHeight=function() {
	if (this.subBanners) { // check any conditional sections within this grouping
		for (var i=0;i<this.subBanners.length;i++) {
			if (this.subBanners[i].editor.isRunningHeader()) {
				var ed = this.subBanners[i].editor;
				var ppr= ZRU.Ruler.getPixelPointRatio();
				return(Math.round(ed.area.offsetHeight/ppr));
			}
		}
	}
	return(0);
}

/// Export this banner in a syntax compatible with ZEN Reports
ZRU.BannerEdit.prototype.exportZRS=function(data,coda) { 
	if (this.watermark.indexOf("GROUP HEADER")==0) {
		var name=this.watermark.split("(")[1];
		data.push("<group name='"+name.split(")")[0]+"' >");
	}

	if (this.activeZone) {
		if (this.subBanners) { // export any conditional sections within this grouping
			for (var i=0;i<this.subBanners.length;i++) {
				var ed = this.subBanners[i].editor;
				if (ed.isRunningHeader()) ed.exportZRS(data,coda);
			}
		}

		data.push('<!-- '+this.watermark+' -->');
		if (this.breakDiv && this.breakSpot=="top:0px;") data.push("<pagebreak/>");
		data.push('<write>');
		data.push('<![CDATA[');
		data.push('<fo:block font-size="0pt" >');

		var svgBody = this.getFOSVGBody();
		var svgLen = svgBody.length;

		var charts = [];
		var z=this.item;
		for (var i=0;i<z.length;i++) {
			if (z[i].itemClass=='CHART') charts.push(z[i]);
			// As far as page layout is concerned, page number blocks are no
			// different from charts, they're tags outside the SVG realm
			if (z[i].itemClass=='PAGENUM') charts.push(z[i]);			
			if (z[i].itemClass=='BCODE') charts.push(z[i]);			
		}
		var ppr= ZRU.Ruler.getPixelPointRatio();
		var w=Math.round(this.area.offsetWidth/ppr);
		var h=Math.round(this.area.offsetHeight/ppr);

		if (charts.length==0) { // simple case
			if (svgLen>0) {
				data.push('<fo:instream-foreign-object>');
				data.push('<svg:svg width="'+w+'pt" height="'+h+'pt" viewBox="0 0 '+w+' '+h+'" >');
				for (var i=0;i<svgLen;i++) {
					data.push(svgBody[i]);
				}
				data.push('</svg:svg>');		
				data.push('</fo:instream-foreign-object>');
			}
		}
		else { //  annoying case
			var stopObj = this.partitionRenderSpace(w,h,charts);
			var gridObj = this.createAbstractGrid(stopObj.hStop,stopObj.vStop);
			this.tagChartCells(gridObj,charts);
			this.consolidateCells(gridObj);
			this.renderFOTable(data,coda,gridObj,stopObj.hStop,stopObj.vStop,svgBody);
		}
		data.push('</fo:block>');
		data.push(']]>');
		data.push('</write>');
		if (this.breakDiv && this.breakSpot=="bottom:0px;") data.push("<pagebreak/>");
		data.push('<!-- end of '+this.watermark+' -->');
		if (this.subBanners) { // export any conditional sections within this grouping
			for (var i=0;i<this.subBanners.length;i++) {
				var ed = this.subBanners[i].editor;
				if (!ed.isRunningHeader()) ed.exportZRS(data,coda);
			}
		}

	}
	if (this.watermark.indexOf("GROUP FOOTER")==0) {
		data.push('</group>');
	}
}

/// Given the width and height of the area as well as an array of immutable chart objects
/// determine the horizontal and vertical stops needed to generate a containment grid
ZRU.BannerEdit.prototype.partitionRenderSpace=function(w,h,charts) {
	var hStop = [];
	hStop.push(0);
	hStop.push(w);
	var vStop = [];
	vStop.push(0);
	vStop.push(h);
	var b = charts;
	// plot key edges as stops
	for (var i=b.length-1;i>=0;i--) {
		var x = b[i].gc;
		hStop.push(x.sizeLeft);
		hStop.push(x.sizeLeft+x.sizeWidth);
		vStop.push(x.sizeTop);
		vStop.push(x.sizeTop+x.sizeHeight);
	}

	// order stops and kill duplicates (don't want zero width or height cells)
	hStop = ZRU.mergeSort(hStop);
	hStop = ZRU.killDups(hStop);
	vStop = ZRU.mergeSort(vStop);
	vStop = ZRU.killDups(vStop);
	return({'hStop':hStop,'vStop':vStop});
}

ZRU.BannerEdit.prototype.createAbstractGrid=function(hStop,vStop) {
	// Create abstract grid
	var gW = hStop.length-1;
	var gH = vStop.length-1;
	var grid = [];
	var vMargin = 0;
	for (var i=0;i<gH;i++) {
		var hMargin = 0;
		for (var j=0;j<gW;j++) {
			var o={top:vMargin,left:hMargin,w:(hStop[j+1]-hStop[j]), h:(vStop[i+1]-vStop[i]), hs:1, vs:1, f:null};
			grid.push(o);
			hMargin+=o.w;
		}	
		vMargin+=vStop[i+1]-vStop[i];
	}
	return({g:grid,w:gW,h:gH});
}

// tag cells that hold boxes
ZRU.BannerEdit.prototype.tagChartCells=function(gridObj,charts) {
	var gH = gridObj.h;
	var gW = gridObj.w;
	var grid = gridObj.g;
	var b = charts;
	var bLen = b.length;

	for (var i=0;i<gH;i++) {
		for (var j=0;j<gW;j++) {
			var idx = i*gW+j;
			var o = grid[idx];
			if (o) for (var k=0;k<bLen;k++) {
				var x = b[k].gc;
				if (o.top==x.sizeTop && o.left==x.sizeLeft) {
					o.f = b[k];
					var w = o.w;
					var hs = 1;
					if ((x.sizeWidth-w)<0.000001) x.sizeWidth=w;
					while (w<x.sizeWidth) {
						w+=grid[idx+hs].w;
						hs++;
					}
					var h = o.h;
					var vs = 1;
					if ((x.sizeHeight-h)<0.000001) x.sizeHeight=h;
					while (h<x.sizeHeight) {
						h+=grid[idx+vs*gW].h;
						vs++;
					}
					for (var q=0;q<vs;q++) {
						for (var r=1;r<hs;r++) grid[idx+q*gW+r]=null;
						if (q>0) grid[idx+q*gW]=null;
					}
					o.w = x.sizeWidth;
					o.h = x.sizeHeight;
					o.hs = hs;
					o.vs = vs;
				}
			}
		}	
	}
}

// Consolidate non-blocked out cells
ZRU.BannerEdit.prototype.consolidateCells=function(gridObj) {
	var gH = gridObj.h;
	var gW = gridObj.w;
	var gd = gridObj.g;

	for (var i=0;i<gH;i++) {
		for (var j=0;j<gW;j++) {
			var idx = i*gW+j;
			var o = gd[idx];
			if (o && !o.f) { // free cell
				var hs=1;
				var w = o.w;
				var nIdx = idx+hs;
				while (j+hs<gW && gd[nIdx] && !gd[nIdx].f) {
					w+=gd[nIdx].w;
					gd[nIdx]=null;
					hs++;
					nIdx = idx+hs;
				}
				if (hs>1) {
					o.w = w;
					o.hs = hs;
				}
			}
		}
	}
	
	for (var i=0;i<gH;i++) {
		for (var j=0;j<gW;j++) {
			var idx = i*gW+j;
			var o = gd[idx];
			if (o && !o.f) { // free cell
				var vs=1;
				var h = o.h;
				var nIdx = idx+vs*gW;
				while (i+vs<gH && gd[nIdx] && !gd[nIdx].f && o.hs==gd[nIdx].hs) {
					var x = gd[nIdx];
					h+=x.h;
					gd[nIdx]=null;
					vs++;
					var nIdx = idx+vs*gW;
				}
				if (vs>1) {
					o.h = h;
					o.vs = vs;
				}
			}
		}
	}
}

ZRU.BannerEdit.prototype.renderFOTable=function(data,coda,gridObj,hStop,vStop,svgBody) {
	var debug = 0;
	if (debug) {
		ZLM.cerr("Rendering FO Table:");
		ZLM.dumpObj(gridObj);
	}
	var gH = gridObj.h;
	var gW = gridObj.w;
	var grid = gridObj.g;
	var svgLen = svgBody.length;

	data.push('<fo:table border-collapse="collapse" inline-progression-dimension="'+hStop[hStop.length-1]+'pt" table-layout="fixed">');
	for (var i=1;i<hStop.length;i++) {
		var colWidth = hStop[i]-hStop[i-1];
		if (debug) ZLM.cerr("defining Column "+i+" with width "+colWidth+" pt");
		data.push('<fo:table-column column-width="'+colWidth+'pt" />');
	}
	data.push('<fo:table-body>');
	for (var i=0;i<gH;i++) {
		var rowEmpty = true;
		var rowHeight = vStop[i+1]-vStop[i];
		data.push('<fo:table-row height="'+rowHeight+'pt">');
		if (debug) ZLM.cerr("defining row "+i+" of "+gH);
		for (var j=0;j<gW;j++) {
			var x = grid[i*gW+j];
			if (x) {
				rowEmpty = false;
				if (debug) {
					ZLM.cerr("On cell "+j);
					ZLM.dumpObj(x);
				} 
				var dAlign = "";
				var tAlign = "";
				var tFill = "";
				if (x.f && ((x.f.objClass=="ZRU.BannerPageNumItem")||(x.f.objClass=="ZRU.BannerBarcodeItem"))) {
					dAlign = ' display-align="center" ';
					tAlign = ' text-align="'+x.f.gc.textJustify+'" ';
					tFill = ' background-color="'+x.f.gc.fillColor+'" ';
				}
				data.push('<fo:table-cell padding="0pt" number-columns-spanned="'+x.hs+'" number-rows-spanned="'+x.vs+'"'+dAlign+tFill+'>');
				data.push('<fo:block font-size="0pt"'+tAlign+'>');
				if (!x.f) {
					if (svgLen>0) {
						data.push('<fo:instream-foreign-object height="'+x.h+'pt" width="'+x.w+'pt">');
						data.push('<svg:svg width="'+x.w+'pt" height="'+x.h+'pt" viewBox="'+x.left+' '+x.top+' '+x.w+' '+x.h+'" >');
						for (var k=0;k<svgLen;k++) {
							data.push(svgBody[k]);
						}
						data.push('</svg:svg>');
						data.push('</fo:instream-foreign-object>');
					}
				}
				else {
					data.push(']]>');
					data.push('</write>');

					x.f.exportZRS(data,coda);

					data.push('<write>');
					data.push('<![CDATA[');
				}
				data.push('</fo:block>');
				data.push('</fo:table-cell>');
			}
		}
		if (rowEmpty) {
			data.push('<fo:table-cell padding="0pt" >');
			data.push('<fo:block font-size="0pt" >');
			data.push('</fo:block>');
			data.push('</fo:table-cell>');
		}
		data.push('</fo:table-row>');
	}
	data.push('</fo:table-body>');
	data.push('</fo:table>');
}

ZRU.BannerEdit.prototype.setEditMode=function(mode) {
	if (this.activeZone!=true) return;
	if (mode!="SELECT") this.plate.style.display="block";
	else this.plate.style.display="none";
	if (this.subBanners) { // notify any conditional sections of the change
		for (var i=0;i<this.subBanners.length;i++) {
			this.subBanners[i].editor.setEditMode(mode);
		}
	}
}

/* pageWidth v pageWidthPX??
ZRU.BannerEdit.prototype.setPageWidth=function(x) {
	x = parseFloat(x);
	if (this.units=="pt") this.pageWidth=ZRU.convertToPixels(x+"in");
	else if (this.units=="mm") this.pageWidth=ZRU.convertToPixels(x+"cm");
	else this.pageWidth=x;
	this.area.style.width=this.pageWidth+"px";
	this.plate.style.width=this.pageWidth+"px";
}
*/

ZRU.BannerEdit.prototype.setBannerHeightPt=function(h) {
	this.ruler.setMaximun(h);
	this.ruler.updateTicks();
}

ZRU.BannerEdit.prototype.sizeChangedCB=function(wrapper) {
//alert("Banner Size changed");
	var newH=wrapper.offsetHeight;
	var h = 0;
//	var h = this.sectionHeaderHeight;
	if (this.breaking) h+=12;
	newH -= h;
	if (newH<1) newH=1;
	this.setPageHeight(newH);
}

//=======================================
//  CONDITIONAL BANNER EDIT STARTS HERE
//=======================================
ZRU.ConditionalBannerEdit=function(div) {
	ZLM.initializeObject(this,div,"ZRU.ConditionalBannerEdit");
	this.body=null;
	this.condition="1=1";
	this.runningHeader=false;
	this.masterBanner = null;
	if (div) this.initializeFromDiv(div);
	else {
		this.watermark="";
		this.prompt="";
		this.body=null;
		this.mouseTracking=false;
		this.activeZone=false;
		this.item=[];
		this.initialized=0;
		this.breaking=false;
		this.enabled=false;
	}
	return(this);
}

ZRU.ConditionalBannerEdit.prototype=new ZRU.BannerEdit();

ZRU.ConditionalBannerEdit.prototype.createBody=function() {
	this.createGenericBody("ConditionalBannerEdit",true);
	this.createZoneTypeControl(3);
	this.setZoneTypeDefault(1);
	this.fullHeader.style.display="block";
}

ZRU.ConditionalBannerEdit.create=function(watermark,pageWidth,units,prompt) {
	var div=ZLM.simulateTag("div class='bannerEdit'");
	if (prompt!=undefined) div.setAttribute("prompt",prompt);
	if (watermark!=undefined) div.setAttribute("watermark",watermark);
	if (pageWidth!=undefined) div.setAttribute("pageWidth",pageWidth);
	if (units!=undefined) div.setAttribute("units",units);
	return(new ZRU.ConditionalBannerEdit(div));	
}

ZRU.ConditionalBannerEdit.endDataDrop=function() {
	var n=ZLM.getDragDestination();
	if (!n.controller.enabled) return;
	n.controller.handleDataDrop();
}

ZRU.ConditionalBannerEdit.serviceMouse=function(who,event) {
	if (who>=ZRU.ConditionalBannerEdit.registry.length) return;
	var n=ZRU.ConditionalBannerEdit.registry[who];
	if (n) n.dispatchMouseEvent(event);
}

ZRU.ConditionalBannerEdit.prototype.restoreObj=function(o) {
	this.units = "pt";
	if (this.ruler && this.masterBanner && this.masterBanner.ruler) this.ruler.units=this.masterBanner.ruler.units;
	this.activateZone();
	this.setConditional(o.c);
	this.setPageWidth(o.w);
	if (o.b==1) {
		this.breaking = true;
		this.addPageBreakMarker();
	}
	else {
		this.breaking=false;
	}

	if (o.rh==1) {
		this.forceRunningHeader();
	}
	else {
		this.runningHeader=false;
		this.sectionHeaderFullHeight = 2*this.sectionHeaderHeight;
		this.frame.minH = this.sectionHeaderFullHeight+1;
	}
	var itemLen = o.i.length;
	if (itemLen) for (var i=0;i<itemLen;i++) {
		var item = o.i[i];
		// ADD STUFF TO THIS.ITEM
		var t = item.t;
		switch(t) {
			case "txt":
				var n = ZRU.BannerTextItem.restoreObj(item,this.area);
				break;
			case "box":
				var n = ZRU.BannerBoxItem.restoreObj(item,this.area);
				break;
			case "line":
				var n = ZRU.BannerLineItem.restoreObj(item,this.area);
				break;
			case "chart":
				var n = ZRU.BannerChartItem.restoreObj(item,this.area);
				break;
			case "pagenum":
				var n = ZRU.BannerPageNumItem.restoreObj(item,this.area);
				break;
			case "bcode":
				var n = ZRU.BannerBarcodeItem.restoreObj(item,this.area);
				break;
		}
		if (!n) {
			alert('CONDITIONAL BANNER: Attempt to restore banner item '+t+' failed, aborting restore');
			return(false);
		}
		n.setBoxNum(this.item.length);
		n.setBanner(this);
		this.item.push(n);
	}
	this.initializeFrameSizePt(o.w,o.h);
	return(true);
}

ZRU.ConditionalBannerEdit.prototype.getGroupName = function() {
	if (!this.groupName) {
		var s = "_r";
		if (this.watermark.indexOf("PAGE")==0) s="_p";
		else if (this.watermark.indexOf("GROUP")>0) {
			var name=this.watermark.split("(")[1];
			s = name.split(")")[0];
		}
		this.groupName = s;
	}
	return(this.groupName);
}

/// Export a model of this banner in a compressed form suitable for JSON output
ZRU.ConditionalBannerEdit.prototype.exportObj=function() {
	var o = {};

	var t = "f"
	if (this.watermark.indexOf("HEADER")>0) t="h";
	o.t=t;
	o.g=this.getGroupName();
	o.c=this.condition;
	this.projectFrameSize(o);	

	if (this.breaking) o.b=1;
	else o.b=0;

	if (this.runningHeader) o.rh=1;
	else o.rh=0;

	o.i = [];
	var z=this.item;
	for (var i=0;i<z.length;i++) {
		var n = z[i].exportObj();
		o.i.push(n);
	}
	return(o);
}

/// Export this banner in a syntax compatible with ZEN Reports
ZRU.ConditionalBannerEdit.prototype.exportZRS=function(data,coda) { 
	if (this.activeZone) {
		if (this.runningHeader) { // Running headers are unique beasts
			this.exportRunningHeaderZRS(data,coda);
			return;
		}
		data.push('<!-- '+this.watermark+' -->');
		data.push('<write>');
		data.push('<![CDATA[');
		data.push('<fo:block font-size="0pt" keep-with-previous.within-page="always">');
		//PUSH CONDITIONAL HERE
		data.push('<xsl:if test="'+this.condition+'" >');
		var svgBody = this.getFOSVGBody();
		var svgLen = svgBody.length;

		var charts = [];
		var z=this.item;
		for (var i=0;i<z.length;i++) {
			if (z[i].itemClass=='CHART') charts.push(z[i]);
			// As far as page layout is concerned, page number blocks are no
			// different from charts, they're tags outside the SVG realm
			if (z[i].itemClass=='PAGENUM') charts.push(z[i]);
			// Likewise Barcodes, they ARE SVG, they're just not OUR SVG			
			if (z[i].itemClass=='BCODE') charts.push(z[i]);			
		}
		var ppr= ZRU.Ruler.getPixelPointRatio();
		var w=Math.round(this.area.offsetWidth/ppr);
		var h=Math.round(this.area.offsetHeight/ppr);

		if (charts.length==0) { // simple case
			if (svgLen>0) {
				data.push('<fo:instream-foreign-object>');
				data.push('<svg:svg width="'+w+'pt" height="'+h+'pt" viewBox="0 0 '+w+' '+h+'" >');
				for (var i=0;i<svgLen;i++) {
					data.push(svgBody[i]);
				}
				data.push('</svg:svg>');		
				data.push('</fo:instream-foreign-object>');
			}
		}
		else { //  annoying case
			var stopObj = this.partitionRenderSpace(w,h,charts);
			var gridObj = this.createAbstractGrid(stopObj.hStop,stopObj.vStop);
			this.tagChartCells(gridObj,charts);
			this.consolidateCells(gridObj);
			this.renderFOTable(data,coda,gridObj,stopObj.hStop,stopObj.vStop,svgBody);
		}

		if (this.breakDiv && this.breakSpot=="bottom:0px;") data.push('<fo:block break-after="page"/>');
		//END CONDITIONAL HERE
		data.push('</xsl:if>');
		data.push('</fo:block>');
		data.push(']]>');
		data.push('</write>');
		data.push('<!-- end of '+this.watermark+' -->');
	}
}

/// Export this banner in a syntax compatible with ZEN Reports
ZRU.ConditionalBannerEdit.prototype.exportRunningHeaderZRS=function(data,coda) { 
	if (this.activeZone) {
		data.push('<!-- RUNNING HEADER'+this.watermark+' -->');
		data.push('<header>');
		data.push('<write>');
		data.push('<![CDATA[');
	    	data.push('<fo:marker marker-class-name="sect-head" >');
		data.push('<fo:block font-size="0pt" >');
		var svgBody = this.getFOSVGBody();
		var svgLen = svgBody.length;
		var charts = [];
		var z=this.item;
		for (var i=0;i<z.length;i++) {
			if (z[i].itemClass=='CHART') charts.push(z[i]);
			// As far as page layout is concerned, page number blocks are no
			// different from charts, they're tags outside the SVG realm
			if (z[i].itemClass=='PAGENUM') charts.push(z[i]);
			// Likewise Barcodes, they ARE SVG, they're just not OUR SVG			
			if (z[i].itemClass=='BCODE') charts.push(z[i]);			
		}
		var ppr= ZRU.Ruler.getPixelPointRatio();
		var w=Math.round(this.area.offsetWidth/ppr);
		var h=Math.round(this.area.offsetHeight/ppr);

		if (charts.length==0) { // simple case
			if (svgLen>0) {
				data.push('<fo:instream-foreign-object>');
				data.push('<svg:svg width="'+w+'pt" height="'+h+'pt" viewBox="0 0 '+w+' '+h+'" >');
				for (var i=0;i<svgLen;i++) {
					data.push(svgBody[i]);
				}
				data.push('</svg:svg>');		
				data.push('</fo:instream-foreign-object>');
			}
		}
		else { //  annoying case
			var stopObj = this.partitionRenderSpace(w,h,charts);
			var gridObj = this.createAbstractGrid(stopObj.hStop,stopObj.vStop);
			this.tagChartCells(gridObj,charts);
			this.consolidateCells(gridObj);
			this.renderFOTable(data,coda,gridObj,stopObj.hStop,stopObj.vStop,svgBody);
		}

		if (this.breakDiv && this.breakSpot=="bottom:0px;") data.push('<fo:block break-after="page"/>');
		data.push('</fo:block>');
		data.push('</fo:marker>');
		data.push(']]>');
		data.push('</write>');
		data.push('</header>');
		data.push('<!-- end of '+this.watermark+' -->');
	}
}

ZRU.ConditionalBannerEdit.prototype.serviceZoneControl=function(mode) {
	if (mode==1) this.convertToConditionalBanner();
	else if (mode==2) this.convertToConditionalParagraph();
	else if (mode==3) this.convertToConditionalNVP();
}

ZRU.ConditionalBannerEdit.prototype.convertToConditionalBanner = function() {
}

ZRU.ConditionalBannerEdit.prototype.exportToNVPObj=function() {
	var o = {};
	o.t = 'cn';
	o.g = this.getGroupName();
	o.c = this.condition;
	o.a = true;
	o.l = "0pt";

	var ppr= ZRU.Ruler.getPixelPointRatio();
	var widthStr=Math.round(this.area.offsetWidth/ppr)+"pt";
	var heightStr=Math.round(this.area.offsetHeight/ppr)+"pt";
	o.h=heightStr;
	o.w=widthStr;

	var z = this.item;
	var len = z.length;
	var w = parseInt(widthStr,10);
	var hW = Math.round((0.95*w)/2);
	var bW = w-hW
	var m = 0;

	if (this.breaking) o.b = 1;
	else o.b = 0;
	o.i = [];
	for (var i=0;i<len;i++) {
		var item = z[i];
		if (item.itemClass=="ATTR" || item.itemClass=="ELEM") {
			var io = {}
			io.t='r';
			io.gcH = ZRU.getDisplayPropertyPanel().projectGCAsObj(item.gc);
			io.gcH.zw = hW;
			io.gcH.zt = m;
			io.gcH.zl = 0;
			io.gcH.ta = 1;
			io.gcH.xb = true;
			io.f = item.fName;
			io.gcB = ZRU.getDisplayPropertyPanel().projectGCAsObj(item.gc);
			io.gcB.ta = true;
			io.gcB.zl = hW;
			io.gcB.zw = bW;
			io.gcB.zt = m;
			io.c = ZRU.makeCaptionString(item.fName);
			o.i.push(io);
			m+=18;
		}
	}
	o.h = m+"pt";
	return(o);
}

ZRU.ConditionalBannerEdit.prototype.exportToParagraphObj=function() {
	var o = {};
	o.t = 'cp';
	o.g = this.getGroupName();
	o.c = this.condition;

	o.a = true;

	var ppr= ZRU.Ruler.getPixelPointRatio();
	var widthStr=Math.round(this.area.offsetWidth/ppr)+"pt";
	var heightStr=Math.round(this.area.offsetHeight/ppr)+"pt";

	o.h=heightStr;
	o.w=widthStr;

	if (this.breaking) o.b = 1;
	else o.b = 0;
	o.i = [];
	var z = this.item;
	var len = z.length;

	for (var i=0;i<len;i++) {
		var item = z[i];
		if (item.objClass=="ZRU.BannerTextItem") {
			var io = item.exportObj();
			io.t='pItem';
			o.i.push(io);
		}
	}
	return(o);
}

ZRU.ConditionalBannerEdit.prototype.serviceMouseClick=function(event) {
	ZRU.lastBannerClicked = this;
	var l = ZRU.locateEvent(event);
	ZRU.lastClickX = ZRU.convertToPoints(l.x);
	ZRU.lastClickY = ZRU.convertToPoints(l.y);
	var em = zenPage._editor._editMode;
	if (!this.boxSize) {
		this.boxSize = {x:l.x,y:l.y,w:1,h:1};
	}
	var bs = this.boxSize;

	if (em=="TEXT") {
		var item = this.item;
		var len = item.length;
		var reedit = null;
		var x = ZRU.lastClickX;
		var y = ZRU.lastClickY;
		for (var i=0;i<len;i++) {
			if (item[i].itemClass=="CAPN") {
				var g=item[i].gc;
				
				if (x>=g.sizeLeft && y>=g.sizeTop && x<g.sizeLeft+parseInt(g.sizeWidth,10) && y<g.sizeTop+parseInt(g.sizeHeight,10)) {
					reedit=item[i];
					i=len;
				}
			}
		}
		if (reedit) {
			this.editCaption(reedit);
		}
		else this.addCaption(l.x,l.y);		
	}
	if (em=="RECT") {
		this.addBox(bs.x,bs.y,bs.w,bs.h,true);
	}
	if (em=="IMAGE") {
		var url = "http://"+window.location.host+"/csp/broker/images/placeimagehere.png";
		this.addImage(bs.x,bs.y,bs.w,bs.h,url);
	}
	if (em=="BCODE") {
		this.addBarcode(bs.x,bs.y,bs.w,bs.h,"BARCODE");
	}
	if (em=="CHART") {
		this.addChart(bs.x,bs.y,bs.w,bs.h);
	}
	if (em=="SELECT") {
		// deleted for IE compatibility
	}
	if (em == "BREAK") {
		if (this.watermark.indexOf("PAGE ")==0) {
			alert("Page breaks cannot be added to \ntable bodies, page headers or page\nfooters.");
			zenPage._editor.resetMode();
			return;
		}
		if (!this.breaking) {
			this.breaking=true;
			this.addPageBreakMarker();
		}
		else {
			this.breaking=false;
			this.removePageBreakMarker();
		}
	}
	if (em == "IF") {
		this.masterBanner.addSubBanner(this.frame.base.nextSibling);
	}

	if (this.tmpLine) { // add line
		this.addHLine();
	}
}


//=================================//
// TABLE COLUMN HEADER STARTS HERE //
//=================================//

ZRU.TableColumnHeader = function(div) {
	ZLM.initializeObject(this,div,"ZRU.TableColumnHeader");
	this.boxNum=null;
	this.gc=null;
	this.banner=null;
	this.itemClass=null;
	this.pristine=true;
	this.colId = null;   /// COLUMN ID used for mapping headers to bodies
	this.capHeight = 20;  /// GET THIS FROM TABLE in Pt
	this.createBody();
	return(this);
}

ZRU.TableColumnHeader.create=function() {
	var div=ZLM.simulateTag("div class='tableColumnHeader' ");
	return(new ZRU.TableColumnHeader(div));
}

ZRU.TableColumnHeader.prototype=new ZRU.BannerItem();

ZRU.TableColumnHeader.prototype.setGC=function(gc,skipSize) {
	var o = null;
	if (skipSize) o = ZRU.saveGeometry(this.gc);
	this.gc = ZRU.getDisplayPropertyPanel().cloneGC(gc);
	this.gc.strokeApropos = true;
	this.gc.fillApropos = true;
	this.gc.textApropos = true;
	this.gc.tableApropos = true;
	this.gc.sizeApropos = true;
	if (skipSize) ZRU.restoreGeometry(this.gc,o);
	this.refresh();
}

ZRU.TableColumnHeader.prototype.createBody=function() {
	this.initBase();
	this.box=new ZVE.LayoutBox(0,0,10,10);
	this.box.setResizeNotify(this.objHook+"resizeLayoutBox();");
	this.box.setMoveNotify(this.objHook+"resizeLayoutBox();");
	this.box.setTrueClickNotify(this.objHook+"editCaption();");
	this.box.setDragYConstraint("ZRU.TableEdit.constrainHeaderY(y,"+this.objHook+"banner);");
	this.box.enableIncrementalEvents(false);
	this.box.bindToNode(this.base,this);
	this.unselect();
	ZLM.setLocalAttribute(this.base,"onmousedown",this.objHook+"handleMouseClick(event);");
}

ZRU.TableColumnHeader.prototype.setContents=function(fieldName) {
	this.fName=fieldName;
	this.itemClass="TC_CAPN";
	this.body.innerHTML = fieldName;
	this.body.style.marginLeft = "2pt";
	this.body.style.marginRight = "2pt";
}

ZRU.TableColumnHeader.prototype.remove=function() {
	if (this.colId) this.colId.remove();
}

ZRU.TableColumnHeader.prototype.handleMouseClick = function(event) {
	var em = zenPage._editor._editMode;
	if (em=="TEXT") this.editCaption();
	else this.setSelection(event);
	ZLM.killEvent(event);
}

ZRU.TableColumnHeader.prototype.adjustBodySize = function() {
	var w = this.gc.sizeWidth;
	var h = this.gc.sizeHeight;
	this.base.style.width=w+"pt";
	this.base.style.height=h+"pt";

	if (this.gc.strokeStyle!="none") {
		w-=2*this.gc.strokeWidth;
		h-=2*this.gc.strokeWidth;
	}
	if (w<0) w=0;
	if (h<0) h=0;
	this.body.style.width = w+"pt";
	this.body.style.height = h+"pt";
}

ZRU.TableColumnHeader.prototype.refresh=function() {
	if (!this.gc) return;
	var bs = this.body.style;
	var fs = this.base.style;
	var g = this.gc;
	if (g.fillOpacity==0) bs.background = "transparent";
	else {
		fs.background = g.fillColor;
		fs.opacity = g.fillOpacity;
	}
	if (g.textBold) bs.fontWeight="bold";
	else bs.fontWeight="normal";

	if (g.textItalic) bs.fontStyle="italic";
	else bs.fontStyle="normal";

	if (g.textUnderline) bs.textDecoration="underline";
	else bs.textDecoration="none";

	bs.color = g.textColor;
	bs.opacity = g.textOpacity;
	bs.fontSize = g.textSize+"pt";
	bs.textAlign = g.textJustify;
	bs.fontFamily = g.textFont;
	if (g.textFont=="cursive") bs.fontFamily = "\"Comic Sans MS\",cursive";
	bs.width = "100%";
	bs.height = "100%";
	fs.top=g.sizeTop+"pt";
	fs.left=g.sizeLeft+"pt";
	fs.height=g.sizeHeight+"pt";
	fs.width=g.sizeWidth+"pt";
	this.box.bindToNode(this.base,this);	
	if (this.banner) this.banner.deconflictLayout(this);
}

ZRU.TableColumnHeader.prototype.resizeLayoutBox=function() {
	if (!this.gc) return;
	this.gc.sizeLeft = this.box.getHomeX();
	this.gc.sizeWidth = this.box.getWidth();
	this.gc.sizeHeight = this.box.getHeight();
	this.setSizePt(this.gc.sizeWidth,this.gc.sizeHeight);
	this.setPosition(this.gc.sizeLeft,this.gc.sizeTop);
	if (this.banner) this.banner.deconflictLayout(this);
}

ZRU.TableColumnHeader.prototype.editCaption=function() {
	var e = zenPage._editor.getTextEditorWidget();
	if (this.captionEditActive) {
		e.done();	
	}
	if (this.base.className!="bannerItemSelected") return;

	var em = zenPage._editor._editMode;
	var d=this.body;
	if (!(em=="TEXT" || em=="SELECT")) return;
	var v= this.colId.captionStr;
	this.body.removeChild(this.body.firstChild);

	this.captionEditActive=true;
	e.bindToNode(this.base,v,this.objHook+"colId.setColumnCaption(zenPage._editor.getTextEditorWidget().getValue());",null,this.gc);
}

//===============================//
// TABLE COLUMN BODY STARTS HERE //
//===============================//

ZRU.TableColumnBody = function(div) {
	ZLM.initializeObject(this,div,"ZRU.TableColumnBody");
	this.boxNum=null;
	this.gc=null;
	this.banner=null;
	this.itemClass=null;
	this.pristine=true;
	this.colId = null;   /// COLUMN ID used for mapping headers to bodies
	this.createBody();
	return(this);
}

ZRU.TableColumnBody.create=function() {
	var div=ZLM.simulateTag("div class='tableColumnBody' ");
	return(new ZRU.TableColumnBody(div));
}

ZRU.TableColumnBody.prototype=new ZRU.BannerItem();

ZRU.TableColumnBody.prototype.setGC=function(gc,skipSize) {
	var o = null;
	if (skipSize) o = ZRU.saveGeometry(this.gc);
	this.gc = ZRU.getDisplayPropertyPanel().cloneGC(gc);
	this.gc.strokeApropos = true;
	this.gc.fillApropos = true;
	this.gc.textApropos = true;
	this.gc.tableApropos = true;
	this.gc.sizeApropos = true;
	if (skipSize) ZRU.restoreGeometry(this.gc,o);
	this.refresh();
}

ZRU.TableColumnBody.prototype.createBody=function() {
	this.initBase();
	this.box=new ZVE.LayoutBox(0,0,10,10);
	this.box.setResizeNotify(this.objHook+"resizeLayoutBox();");
	this.box.setMoveNotify(this.objHook+"resizeLayoutBox();");
	//this.box.setTrueClickNotify(this.objHook+"editCaption();");
	this.box.setDragYConstraint("ZRU.TableEdit.constrainBodyY(y,"+this.objHook+"banner);");
	this.box.enableIncrementalEvents(false);
	this.box.bindToNode(this.base,this);
	this.unselect();
	ZLM.setLocalAttribute(this.base,"onmousedown",this.objHook+"setSelection(event);");
}

ZRU.TableColumnBody.prototype.remove=function() {
	if (this.colId) this.colId.remove();
}

ZRU.TableColumnBody.prototype.setContents=function(fieldName) {
	this.fName=fieldName;
	this.itemClass="TC_BODY";
	this.body.innerHTML = fieldName;
	this.body.style.marginLeft = "2pt";
	this.body.style.marginRight = "2pt";
}

ZRU.TableColumnBody.prototype.refresh=function() {
	if (!this.gc) return;
	var bs = this.body.style;
	var fs = this.base.style;
	var g = this.gc;
	if (g.fillOpacity==0) bs.background = "transparent";
	else {
		bs.background = g.fillColor;
		bs.opacity = g.fillOpacity;
	}
	if (g.textBold) bs.fontWeight="bold";
	else bs.fontWeight="normal";

	if (g.textItalic) bs.fontStyle="italic";
	else bs.fontStyle="normal";

	if (g.textUnderline) bs.textDecoration="underline";
	else bs.textDecoration="none";

	bs.color = g.textColor;
	bs.opacity = g.textOpacity;
	bs.fontSize = g.textSize+"pt";
	bs.textAlign = g.textJustify;
	bs.fontFamily = g.textFont;
	if (g.textFont=="cursive") bs.fontFamily = "\"Comic Sans MS\",cursive";
	bs.width = "100%";
	bs.height = "100%";
	fs.top=g.sizeTop+"pt";
	fs.left=g.sizeLeft+"pt";
	fs.height=g.sizeHeight+"pt";
	fs.width=g.sizeWidth+"pt";
	this.box.bindToNode(this.base,this);	
	if (this.banner) this.banner.deconflictLayout(this);
}

ZRU.TableColumnBody.prototype.resizeLayoutBox=function() {

	if (!this.gc) return;
	this.gc.sizeLeft = this.box.getHomeX();
	this.gc.sizeWidth = this.box.getWidth();
	this.gc.sizeHeight = this.box.getHeight();
	this.setSizePt(this.gc.sizeWidth,this.gc.sizeHeight);
	this.setPositionPt(this.gc.sizeLeft,this.gc.sizeTop);
	if (this.banner) this.banner.deconflictLayout(this);
}

//==========================//
// TABLE COLUMN STARTS HERE //
//==========================//

ZRU.TableColumn=function(div) {
	ZLM.initializeObject(this,div,"ZRU.TableColumn");
	this.banner=null;
	this.itemClass=null;
	this.headerItem = ZRU.TableColumnHeader.create();
	this.headerItem.colId = this;
	this.bodyItem = ZRU.TableColumnBody.create();
	this.bodyItem.colId = this;	
	return(this);
}


ZRU.TableColumn.create=function() {
	var div=ZLM.simulateTag("div class='_TableColumn' ");
	return(new ZRU.TableColumn(div));
}

/// Force the elements of this column to the given position and size
ZRU.TableColumn.prototype.setGeometryPt=function(x,y,w,h,captionH) {
	this.headerItem.setPositionPt(x,y);
	this.headerItem.setSizePt(w,captionH);
	this.bodyItem.setPositionPt(x,y+captionH);
	this.bodyItem.setSizePt(w,h-captionH);
}

/// Force the elements of this column to the given position
ZRU.TableColumn.prototype.setPositionPt=function(x,y,captionH) {
	this.headerItem.setPositionPt(x,y);
	this.bodyItem.setPositionPt(x,y+captionH);
}

ZRU.TableColumn.prototype.resolveHeaderWithBody = function() {
	var x = this.bodyItem.gc.sizeLeft;
	var w = this.bodyItem.gc.sizeWidth;
	this.headerItem.setPositionPt(x,0);
	this.headerItem.setSizePt(w,this.headerItem.gc.sizeHeight);
}

ZRU.TableColumn.prototype.propagateTableSettings = function(masterGC) {
	var h = this.headerItem.gc;
	var b = this.bodyItem.gc;
	for (p in masterGC) {
		if (p.indexOf('table')==0 || p.indexOf('stroke')==0) {
			h[p] = masterGC[p];
			b[p] = masterGC[p];
		}
	}
	if (masterGC.strokeStyle!="none") {
		var ls = masterGC.strokeWidth+"pt "+masterGC.strokeStyle+" "+masterGC.strokeColor;
		var hs = this.headerItem.base.style;
		var bs = this.bodyItem.base.style;
		var isFirst = (this.boxNum==0);
		var isLast = (this.boxNum==this.banner.item.length-1);
		hs.borderTop = "";
		hs.borderLeft = "";
		hs.borderRight = "";
		hs.borderBottom = "";
		bs.borderTop = "";
		bs.borderLeft = "";
		bs.borderRight = "";
		bs.borderBottom = "";
		if (masterGC.tableBorder || masterGC.tableHeaderBorder) {
			hs.borderTop = ls;
			if (isFirst) hs.borderLeft = ls;
			if (isLast) hs.borderRight = ls;
		}
		if (masterGC.tableHeaderBorder || masterGC.tableHeaderBodyDivider) {
			hs.borderBottom = ls;
		}
		if (masterGC.tableHeaderColumnDivider && !isLast) {
			hs.borderRight = ls;
		}
		if (masterGC.tableBodyColumnDivider && !isLast) bs.borderRight = ls;
		if (masterGC.tableBorder) {
			bs.borderBottom = ls;
			if (isFirst) bs.borderLeft = ls;
			if (isLast) bs.borderRight = ls;
		}
	}
}

ZRU.TableColumn.prototype.remove=function() {
	if (this.banner) {
		this.banner.removeItem(this);
		this.headerItem.box.unbind();
		this.bodyItem.box.unbind();
		this.area.removeChild(this.headerItem.base);
		this.area.removeChild(this.bodyItem.base);
	}
}

ZRU.TableColumn.prototype.addToArea=function(div) {
	this.area = div;
	this.area.appendChild(this.headerItem.base);
	this.area.appendChild(this.bodyItem.base);	
}

ZRU.TableColumn.prototype.setBoxNum=function(n) {
	this.boxNum = n;
	this.headerItem.boxNum = n+"H";
	this.bodyItem.boxNum = n+"B";
}

ZRU.TableColumn.prototype.setBanner=function(b) {
	this.banner = b;
	this.headerItem.banner = b;
	this.bodyItem.banner = b;
}

ZRU.TableColumn.prototype.setContents=function(fieldName,path) {
	if (path) this.fName = path+fieldName;
	else {
		this.fName=fieldName;
		var sName = fieldName.split('/');
		fieldName = sName[sName.length-1];
	}
	this.itemClass = ZRU.classifyTextDatum(fieldName);
	this.bodyItem.setContents(ZRU.makeAvatarString(fieldName));
	this.captionStr = ZRU.makeCaptionString(fieldName);
	this.headerItem.setContents(this.captionStr);
/*
	if (fieldName.indexOf("$")==0) {
		var txtStr="("+fieldName+")";
		var capStr=fieldName.substring(1);
		this.itemClass="DVAR";
	}
	else if (fieldName.indexOf('!')==0) {
		var txtStr=fieldName.substring(1);
		var capStr=txtStr;
		this.itemClass="CAPN";
	}
	else if (fieldName.indexOf('@')==0) {
		var capStr=fieldName.substring(1);	
		var txtStr="{"+capStr+"}";
		this.itemClass="ATTR";
	}
	else {
		var txtStr="{"+fieldName+"}";
		var capStr=fieldName;
		this.itemClass="ELEM";
	}
	this.captionStr=capStr.toUpperCase();
	this.headerItem.setContents(this.captionStr);
	this.bodyItem.setContents(txtStr);
*/
}

ZRU.TableColumn.prototype.setColumnCaption=function(newHeader) {
	this.captionStr = newHeader;
	this.headerItem.setContents(this.captionStr);
}

ZRU.TableColumn.prototype.getHomeX = function() {
	return(this.headerItem.gc.sizeLeft);
}

ZRU.TableColumn.prototype.getWidth = function() {
	return(this.headerItem.gc.sizeWidth);
}

ZRU.TableColumn.prototype.setSelection = function() {
	this.headerItem.setSelection();
}

ZRU.TableColumn.prototype.restoreObj=function(o) {
	this.setContents(o.f);
	this.captionStr = o.c;
	this.headerItem.setContents(this.captionStr);
	
	this.headerItem.banner = null;
	this.bodyItem.banner = null;
	this.headerItem.setGC(ZRU.getDisplayPropertyPanel().makeGCFromObj(o.gcH));
	this.bodyItem.setGC(ZRU.getDisplayPropertyPanel().makeGCFromObj(o.gcB));
	this.headerItem.banner = this.banner;
	this.bodyItem.banner = this.banner;
}

ZRU.TableColumn.prototype.restoreContents=function(jsObj) {
	this.setContents(jsObj.fieldName);
	this.captionStr = jsObj.caption;
	this.headerItem.setContents(this.captionStr);
	
	this.headerItem.setGC(jsObj.gcHeader);
	this.bodyItem.setGC(jsObj.gcBody);
}

ZRU.TableColumn.prototype.exportObj=function() {
	var o = {}
	o.t='c';
	o.gcH = ZRU.getDisplayPropertyPanel().projectGCAsObj(this.headerItem.gc);
	o.f = this.fName;
	o.gcB = ZRU.getDisplayPropertyPanel().projectGCAsObj(this.bodyItem.gc);
	o.c = this.captionStr;
	return(o);
}

ZRU.TableColumn.prototype.exportToNVPObj=function(headerW,bodyW,margin) {
	var o = {}
	o.t='r';
	o.gcH = ZRU.getDisplayPropertyPanel().projectGCAsObj(this.headerItem.gc);
	o.gcH.zw = headerW;
	o.gcH.zt = margin;
	o.gcH.zl = 0;
	o.f = this.fName;
	o.gcB = ZRU.getDisplayPropertyPanel().projectGCAsObj(this.bodyItem.gc);
	o.gcB.zw = bodyW;
	o.gcB.zt = margin;
	o.gcB.zl = headerW;
	o.c = this.captionStr;
	return(o);
}

ZRU.TableColumn.prototype.exportToBannerObj=function() {
	var o = [];
	o[0] = {}; // Caption
	var cap = o[0];
	cap.t = "txt";
	cap.gc = ZRU.getDisplayPropertyPanel().projectGCAsObj(this.headerItem.gc);
	cap.gc.sa = 0;
	cap.gc.fa = 0;
	cap.gc.ta = 0;
	cap.c = "CAPN";
	cap.f = "!"+this.captionStr;
	cap.fn = "";
	
	o[1] = {};
	var fld = o[1]; // Field
	fld.t = "txt";
	fld.gc = ZRU.getDisplayPropertyPanel().projectGCAsObj(this.bodyItem.gc);
	fld.gc.sa = 0;
	fld.gc.fa = 0;
	fld.gc.ta = 0;
	if (this.fName.indexOf("@")>0) fld.c = "ATTR";
	else fld.c = "ELEM";
	fld.f = this.fName;
	fld.fn = "";
	return(o);
}

ZRU.TableColumn.prototype.exportJSON=function(data) {

	data.push("{itemType:'_tableColumn',");
	var gcStr = ZRU.getDisplayPropertyPanel().projectGCAsJSON(this.headerItem.gc);
	data.push("gcHeader:{"+gcStr+"},");
	data.push("fieldName:'"+this.fName+"',");
	var gcStr = ZRU.getDisplayPropertyPanel().projectGCAsJSON(this.bodyItem.gc);
	data.push("gcBody:{"+gcStr+"},");
	data.push("caption:'"+this.captionStr+"'");
	data.push("}");
}


ZRU.TableColumn.prototype.exportZRS=function(data,coda) {
	var widthStr=this.getWidth()+"pt";
	var gcH = this.headerItem.gc;
	var gcB = this.bodyItem.gc;
	var ls = "0px solid #000000;";
	if (gcH.strokeStyle!="none") {
		ls = gcH.strokeWidth+'pt '+gcH.strokeStyle+' '+gcH.strokeColor+";" // Line style, all or nothing at this point...
	}

	var hs = [];
	// FIX OPACITY ISSUES
	if (gcH.fillOpacity>0) hs.push("background-color:"+gcH.fillColor+";");
	hs.push("font-size:"+gcH.textSize+";");
	if (gcH.textFont=="cursive") hs.push("font-family:\"Comic Sans MS\",cursive;");
	else hs.push("font-family:"+gcH.textFont+";");
	hs.push("color:"+gcH.textColor+";");
	if (gcH.textBold) hs.push("font-weight:bold;");
	else hs.push("font-weight:normal;");
	if (gcH.textItalic) hs.push("font-style:italic;");
	else hs.push("font-style:normal;");
	if (gcH.textUnderline) hs.push("text-decoration:underline;");
	else hs.push("text-decoration:none;");
	hs.push("text-align:"+gcH.textJustify+";");	
	hs.push("width:"+gcH.sizeWidth+"pt;");

	if (gcH.tableHeaderBorder) {
		hs.push("border-top:"+ls);
		if (this.boxNum==0) hs.push("border-left:"+ls);
		if (this.boxNum==this.banner.item.length-1) hs.push("border-left:"+ls);		
	}

	if (gcH.tableHeaderBorder || gcH.tableHeaderBodyDivider) {
		hs.push("border-bottom:"+ls);
	}
	if (gcH.tableHeaderColumnDivider && this.boxNum<this.banner.item.length-1) {
		hs.push("border-right:"+ls);		
	}

	var headerStyle = hs.join('');

	var bs = [];	

	// FIX OPACITY ISSUES
	if (gcB.fillOpacity>0) bs.push("background-color:"+gcB.fillColor+";");
	bs.push("font-size:"+gcB.textSize+";");
	if (gcB.textFont=="cursive") bs.push("font-family:\"Comic Sans MS\",cursive;");
	else bs.push("font-family:"+gcB.textFont+";");
	bs.push("color:"+gcB.textColor+";");
	// FIX OPACITY ISSUES
	if (gcB.textBold) bs.push("font-weight:bold;");
	else bs.push("font-weight:normal;");
	if (gcB.textItalic) bs.push("font-style:italic;");
	else bs.push("font-style:normal;");
	if (gcB.textUnderline) bs.push("text-decoration:underline;");
	else bs.push("text-decoration:none;");
	bs.push("text-align:"+gcB.textJustify+";");

	if (gcB.tableBodyRowDivider) {
		bs.push("border-bottom:"+ls);
	}
	if (gcB.tableBodyColumnDivider && this.boxNum<this.banner.item.length-1) {
		bs.push("border-right:"+ls);		
	}

	var bodyStyle = bs.join('');

	data.push("<item field='"+this.fName+"' width='"+widthStr+"' style='"+bodyStyle+"'>");
	data.push("<caption value='"+XML.escapeStr(this.captionStr)+"' style='"+headerStyle+"' />");
	data.push("</item>");
}

ZRU.TableColumn.prototype.refresh=function() {
//FIXME

	if (!this.gc) return;
	var str="";
	if (this.gc.fillColor=="#ffffff") str+="background:none;";
	else str+=ZRU.projectGCPropertyAsJS(this.gc, "fillColor");
	str+=ZRU.projectGCPropertyAsJS(this.gc, "textColor");
	str+=ZRU.projectGCPropertyAsJS(this.gc, "textOpacity");
	str+=ZRU.projectGCPropertyAsJS(this.gc, "textStyle");
	str+=ZRU.projectGCPropertyAsJS(this.gc, "textSize");
	str+=ZRU.projectGCPropertyAsJS(this.gc, "textJustify");
	str+=ZRU.projectGCPropertyAsJS(this.gc, "textFont");
	var nvl=str.split(";");
	for (var i=0;i<nvl.length;i++) {
		var s=nvl[i].split(":");
		if (s[0]) {
			this.body.style[s[0]]=s[1];
		}
	}
	if (this.pristine) this.box.bindToNode(this.base,this);
	if (!this.base.style.width) this.base.style.width=this.base.offsetWidth+"px";	
}


//=======================================
// *****  TABLE EDIT STARTS HERE    *****
//=======================================

ZRU.TableEdit=function(div) {
	this.trackingModes = "SELECT";
	ZLM.initializeObject(this,div,"ZRU.TableEdit");
	this.body=null;
	this.base.style.height="100%";
	this.watermark=div.getAttribute("watermark");
	this.createBody();
	this.setUnits(div.getAttribute("units"));
	this.setPageWidth(div.getAttribute("pageWidth")+div.getAttribute("units"));
	this.mouseTracking=false;
	this.item=[];
	this.editMode="";
	this.initialized=1;
	this.enabled=true;
	this.fName="Data Table";
	this.setHeaderHeightPt(20);
	return(this);
}

ZRU.TableEdit.create=function(watermark,pageWidth,units) {
	var div=ZLM.simulateTag("div class='tableEdit'");
	if (watermark!=undefined) div.setAttribute("watermark",watermark);
	if (pageWidth!=undefined) div.setAttribute("pageWidth",pageWidth);
	if (units!=undefined) div.setAttribute("units",units);
	return(new ZRU.TableEdit(div));	
}

ZRU.TableEdit.prototype=new ZRU.AbstractBannerEdit();

ZRU.TableEdit.prototype.restoreObj = function(o) {
	if (o.t!='t') return(false);
	this.units = "pt";
	this.groupName = o.g;
	if (o.a) {
		o.w = this.frame.master.rawPageWidth+this.frame.master.rawUnits;
		this.setPageWidth(o.w);
		if (!o.tw) o.tw = o.w;
		var n = o.i.length;
		for (var i = 0; i<n; i++) {
			var itm = o.i[i];
			var c = this.addDataItem(2*parseInt(o.tw,10),0,"_temp",0,false);
			c.restoreObj(itm);
		}
	}
	this.deconflictLayout(null);
	return(true);
}

ZRU.TableEdit.prototype.createBody=function() {
	this.createGenericBody("TableEdit",false);
	this.createZoneTypeControl(4);
	this.setZoneTypeDefault(4);
	this.fullHeader.style.display="block";
}

ZRU.TableEdit.prototype.setHeaderHeightPt = function(h) {
	this.capHeight = h;
	this.capHeightPx = ZRU.convertToPixels(this.capHeight+"pt");
}

ZRU.TableEdit.endDataDrop=function() {
	var n=ZLM.getDragDestination();
	if (!n.controller.enabled) return;
	var obj=ZLM.getDragData();
	var x=ZLM.getPageOffsetLeft(ZLM.dragAvatar);
	var nx=ZLM.getPageOffsetLeft(n.controller.area);
	n.controller.addDataItem(x-nx,0,obj.name,0,obj.group);
	zenPage._editor.resetMode();
}

ZRU.TableEdit.constrainHeaderY=function(y) {
	return(0);
}

ZRU.TableEdit.constrainBodyY=function(y,tbl) {
	var tbl = ZRU.TableEdit.registry[0];
	return(tbl.capHeightPx);
}

ZRU.TableEdit.serviceMouse=function(who,event) {
	if (who>=ZRU.TableEdit.registry.length) return;
	var n=ZRU.TableEdit.registry[who];
	if (n) n.dispatchMouseEvent(event);
}

ZRU.TableEdit.prototype.addDataItem=function(x,y,fieldName,w,xPath,ignoreConflict) {
	if (!this.gc) {
		this.gc = ZRU.getDisplayPropertyPanel().cloneGC(ZRU.initGC());
	}
	var n=ZRU.TableColumn.create();
	n.addToArea(this.area);
	var rPath = "";
	if (xPath) {
		var pLen = xPath.length;
		var extra = this.frame.prefixStr.substring(pLen);
		var split = extra.split("/");
		var lvls = split.length-1;
		for (var i=0;i<lvls;i++) rPath+="../";
	}
	n.setContents(fieldName,rPath);
	if (w) {
		n.setGeometryPt(x,0,w,this.frame.ptHeight,this.capHeight);
	}
	else {
		n.setGeometryPt(x,0,72,this.frame.ptHeight,this.capHeight);
	}
	n.setBoxNum(this.item.length);
	n.setBanner(this);
	if (!w)	n.setSelection();
	this.item.push(n);
	if (!ignoreConflict) this.deconflictLayout();
	return(n);
}

/// Remove the contents of this table
ZRU.TableEdit.prototype.clearZone=function() {
	for (var i=this.item.length-1;i>=0;i--) {
		this.item[i].remove();
	}
}

ZRU.TableEdit.prototype.removeItem=function(who) {
	var shift=false;
	for (var i=0;i<this.item.length-1;i++) {
		if (this.item[i]==who) {
			shift=true;
		}
		if (shift) this.item[i]=this.item[i+1];
	}
	if (shift || this.item[i]==who) {
		this.item.pop();	
	}
	this.deconflictLayout();
}

ZRU.TableEdit.prototype.deconflictLayout=function(trigger) {
	if (trigger) {
		var id = trigger.boxNum;
		var colNum = parseInt(id,10);
		if (id.indexOf('H')>0) {
			this.setHeaderHeightPt(trigger.box.getHeight());
		}
		else if (id.indexOf('B')>0) {
			this.item[colNum].resolveHeaderWithBody();	
		}
		var z=this.item;
		for (var i=0;i<z.length;i++) {
			z[i].propagateTableSettings(trigger.gc)
		}
	}
	this.sortZones();
	var z=this.item;
	if (z.length==0) return;
	var m=z[0].getHomeX();
	for (var i=0;i<z.length;i++) {
		var bw = z[i].getWidth();
		z[i].setGeometryPt(m,0,bw,this.frame.ptHeight,this.capHeight);
		m+=bw;
	}
}

ZRU.TableEdit.prototype.sortZones=function() {
	var z=this.item;
	for (var i=1;i<z.length;i++) {
		var val =z[i].getHomeX();
		var node=z[i];
		j=i-1;
		while(j>=0 && z[j].getHomeX()>val) {
			z[j+1]=z[j];
			j--;
		}
		z[j+1]=node;
	}
	for (var i=0;i<z.length;i++) z[i].setBoxNum(i);
}

ZRU.TableEdit.prototype.restoreContents=function(jsObj) {
	this.units = "pt";
	this.groupName = jsObj.group;
	var n = jsObj.itemCount;
	for (var i = 0; i<n; i++) {
		var itm = jsObj.item[i];
		var c = this.addDataItem(0,0,"_temp",0);
		c.restoreContents(itm);
	}
}

/// No-Op this function because we're already a table
ZRU.TableEdit.prototype.convertToTable=function() {
}

ZRU.TableEdit.prototype.exportToBannerObj=function() {
	var o = {};
	o.t = 'b';
	o.g = this.groupName;
	o.a = true;
	o.h = "72pt";
	o.w = this.frame.master.rawPageWidth+this.frame.master.rawUnits;
	o.b = 0;
	o.i = [];
	var z = this.item;
	var len = z.length
	for (var i=0;i<len;i++) {
		var a = z[i].exportToBannerObj();
		o.i.push(a[0]);
		o.i.push(a[1]);
	}
	return(o);
}

ZRU.TableEdit.prototype.exportToParagraphObj=function() {
	var o = {};
	o.t = 'p';
	o.g = this.groupName;
	o.a = true;
	o.h = "72pt";
	o.w = this.frame.master.rawPageWidth+this.frame.master.rawUnits;
	o.b = 0;
	o.i = [];
	var z = this.item;
	var len = z.length
	for (var i=0;i<len;i++) {
		var a = z[i].exportToBannerObj();
		a[0].t = 'pItem';
		a[1].t = 'pItem';
		o.i.push(a[0]);
		o.i.push(a[1]);
	}
	return(o);
}

ZRU.TableEdit.prototype.exportToNVPObj=function() {
	var o = {};
	o.t = 'n';
	o.g = this.groupName;
	o.a = true;
	o.l = "0pt";
	o.w = this.frame.master.rawPageWidth+this.frame.master.rawUnits;
	var ps = this.frame.master.pageSetup;
	var w = ps.width-ps.right-ps.left;
	var hW = Math.round(0.2*w);
	var bW = w-hW
	o.b = 0;
	o.i = [];
	var z = this.item;
	var len = z.length;
	var m=0;
	for (var i=0;i<len;i++) {
		var a = z[i].exportToNVPObj(hW,bW,m);
		o.i.push(a);
		m+=18;
	}
	return(o);
}

ZRU.TableEdit.prototype.exportObj=function() {
	var o={};
	o.t = 't';
	o.g = this.groupName;
	if (this.item.length>0) {
		o.a=true;
		o.w = this.frame.master.rawPageWidth+this.frame.master.rawUnits;

		var leftStr = this.getLeftMarginStr();	
		var widthStr = this.getTotalWidthStr();

		o.l = leftStr;
		o.tw = widthStr;

		o.i=[];
		var z=this.item;
		for (var i=0;i<z.length;i++) {
			var n = z[i].exportObj();
			o.i.push(n);
		}		
	}
	else o.a = false;
	return(o);
}


ZRU.TableEdit.prototype.exportJSON=function(data) {
	data.push("{bannerType:'_table',");
	data.push("group:'"+this.groupName+"',");
	if (this.item.length>0) {
		data.push("activeZone:true,");

		var leftStr = this.getLeftMarginStr();	
		var widthStr = this.getTotalWidthStr();

		data.push("left:'"+leftStr+"',");
		data.push("width:'"+widthStr+"',");

		data.push("itemCount:"+this.item.length+",");
		data.push("item:[");
		var z=this.item;
		for (var i=0;i<z.length;i++) {
			z[i].exportJSON(data);
			if (i<z.length-1) data.push(",");
		}		
		data.push("]");
	}
	else data.push("activeZone:false");
	data.push("}");
}

ZRU.TableEdit.prototype.exportZRS=function(data,coda) {
//TODO FIX THIS
	var pageWidth = 468;

	data.push("<!-- Start of "+this.watermark+" -->");
	var z=this.item;
	if (z.length==0) {
		data.push("<!-- No tabular rendering requested -->");
		data.push("<!-- End of "+this.watermark+" -->");
		return;
	}

	var margin = parseInt(this.getLeftMarginStr())-4;
	data.push('<fo><write><![CDATA[');
	data.push('<fo:table space-after="24pt" border-collapse="collapse" inline-progression-dimension="'+pageWidth+'">');
	data.push('<fo:table-column column-number="1" column-width="'+margin+'pt" />');
	data.push('<fo:table-column column-number="2" column-width="'+(pageWidth-margin)+'pt" />');
	data.push('<fo:table-body><fo:table-row><fo:table-cell><fo:block></fo:block></fo:table-cell><fo:table-cell>');
	data.push(']]>');
	data.push('</write></fo>');

	var gc = this.item[0].bodyItem.gc;
	var altColor = "";
	if (gc.tableZebraStripe) {
		altColor = "altcolor='"+gc.tableZebraColor+"' ";
	}
	var styleStr = "margin-left:2pt;margin-right:2pt;";
	var ls = "0px solid #000000;";
	if (gc.tableBorder) {
		if (gc.strokeStyle!="none") {
			ls = gc.strokeWidth+'pt '+gc.strokeStyle+' '+gc.strokeColor+";"
		}
		styleStr += "border:"+ls;
	}
	data.push("<table orient='col' group='"+this.groupName+"' "+altColor+"width='"+this.getTotalWidthStr()+"' style='"+styleStr+"' >");
	for (var i=0;i<z.length;i++) z[i].exportZRS(data,coda);
	data.push("</table>");

	data.push("<fo><write><![CDATA[");
	data.push("</fo:table-cell></fo:table-row></fo:table-body></fo:table>");
	data.push("]]>");
	data.push("</write></fo>");
	data.push("<!-- End of "+this.watermark+" -->");
}

ZRU.TableEdit.prototype.getTotalWidthStr=function() {
	var z=this.item;
	var w=0;
	for (var i=0;i<z.length;i++) {
		w+=z[i].getWidth();
	}
	return(w+"pt");
}

ZRU.TableEdit.prototype.getLeftMarginStr=function() {
	if (this.item.length==0) return("0px");
	var offset=this.item[0].getHomeX();
	return(offset+"pt");
}

ZRU.TableEdit.prototype.setPageWidth=function(x) {
	if ((""+parseFloat(x))==x) x = x+this.pageUnits;
	this.pageWidth = ZRU.convertToPixels(x);
	this.area.style.width=this.pageWidth+"px";
	this.plate.style.width=this.pageWidth+"px";
}

//====================================================================================

//============================//
// NVP ROW HEADER STARTS HERE //
//============================//

ZRU.NVPRowHeader = function(div) {
	ZLM.initializeObject(this,div,"ZRU.NVPRowHeader");
	this.boxNum=null;
	this.gc=null;
	this.banner=null;
	this.bannerNum=div.getAttribute("nvpBannerNum");
	this.itemClass=null;
	this.pristine=true;
	this.rowId = null;   /// ROW ID used for mapping headers to bodies
	this.capHeight = 20;  /// GET THIS FROM TABLE in Pt
	this.capWidth = 144;
	this.createBody();
	return(this);
}

ZRU.NVPRowHeader.create=function(bannerNum) {
	var div=ZLM.simulateTag("div class='nvpRowHeader' nvpBannerNum='"+bannerNum+"'");
	return(new ZRU.NVPRowHeader(div));
}

ZRU.NVPRowHeader.prototype=new ZRU.BannerItem();

ZRU.NVPRowHeader.prototype.setGC=function(gc,skipSize) {
	var o = null;
	if (skipSize) o = ZRU.saveGeometry(this.gc);
	this.gc = ZRU.getDisplayPropertyPanel().cloneGC(gc);
	this.gc.strokeApropos = true;
	this.gc.fillApropos = true;
	this.gc.textApropos = true;
	this.gc.tableApropos = true;
	this.gc.sizeApropos = true;
	if (skipSize) ZRU.restoreGeometry(this.gc,o);
	this.refresh();
}

ZRU.NVPRowHeader.prototype.createBody=function() {
	this.initBase();
	this.box=new ZVE.LayoutBox(0,0,10,10);
	this.box.setResizeNotify(this.objHook+"resizeLayoutBox();");
	this.box.setMoveNotify(this.objHook+"moveLayoutBox();");
	this.box.setTrueClickNotify(this.objHook+"editCaption();");
	this.box.setFocusNotify(this.objHook+"requestForeground();");
	this.box.setDragXConstraint("ZRU.NVPEdit.constrainHeaderX(x)", ","+this.bannerNum);
	this.box.enableIncrementalEvents(false);
	this.box.bindToNode(this.base,this);
	this.unselect();
	ZLM.setLocalAttribute(this.base,"onmousedown",this.objHook+"handleMouseClick(event);");
}

ZRU.NVPRowHeader.prototype.setContents=function(fieldName) {
	this.fName=fieldName;
	this.itemClass="NR_CAPN";
	this.body.innerHTML = fieldName;
	this.body.style.marginLeft = "2pt";
	this.body.style.marginRight = "2pt";
}

ZRU.NVPRowHeader.prototype.remove=function() {
	if (this.rowId) this.rowId.remove();
}

ZRU.NVPRowHeader.prototype.requestForeground = function() {
	if (this.banner) this.banner.moveToFront(this.rowId);
}

ZRU.NVPRowHeader.prototype.handleMouseClick = function(event) {
	var em = zenPage._editor._editMode;
	if (em=="TEXT") this.editCaption();
	else this.setSelection(event);
	ZLM.killEvent(event);
}

ZRU.NVPRowHeader.prototype.refresh=function() {
	if (!this.gc) return;
	var bs = this.body.style;
	var fs = this.base.style;
	var g = this.gc;
	if (g.fillOpacity==0) fs.background = "transparent";
	else {
		fs.background = g.fillColor;
		fs.opacity = g.fillOpacity;
	}
	if (g.textBold) bs.fontWeight="bold";
	else bs.fontWeight="normal";

	if (g.textItalic) bs.fontStyle="italic";
	else bs.fontStyle="normal";

	if (g.textUnderline) bs.textDecoration="underline";
	else bs.textDecoration="none";

	// Address Borders and dividers
	var bdrStr = g.strokeWidth+"pt "+g.strokeStyle+" "+g.strokeColor;
	if (g.tableBorder || g.tableHeaderBorder) fs.borderLeft = bdrStr;
	else fs.borderLeft = "none";
	if (g.tableHeaderBorder || g.tableHeaderBodyDivider) fs.borderRight = bdrStr;
	else fs.borderRight = "none";
	if ((this.boxNum == "0H" && (g.tableBorder || g.tableHeaderBorder)) ||
	    (this.boxNum != "0H" && g.tableHeaderColumnDivider)) fs.borderTop = bdrStr;
	else fs.borderTop = "none";
	if ((this.rowId.isLastRow() && (g.tableBorder || g.tableHeaderBorder)) ||
	    (!this.rowId.isLastRow() && g.tableHeaderColumnDivider)) fs.borderBottom = bdrStr;
	else fs.borderBottom = "none";

	bs.color = g.textColor;
	bs.opacity = g.textOpacity;
	bs.fontSize = g.textSize+"pt";
	bs.textAlign = g.textJustify;
	bs.fontFamily = g.textFont;
	if (g.textFont=="cursive") bs.fontFamily = "\"Comic Sans MS\",cursive";
	bs.width = "100%";
	bs.height = "100%";
	fs.top=g.sizeTop+"pt";
	fs.left=g.sizeLeft+"pt";
	fs.height=g.sizeHeight+"pt";
	fs.width=g.sizeWidth+"pt";
	this.box.bindToNode(this.base,this);	
	if (this.banner) this.banner.deconflictLayout(this);
}

ZRU.NVPRowHeader.prototype.resizeLayoutBox=function() {
	if (!this.gc) return;
	this.gc.sizeLeft = this.box.getHomeX();
	this.gc.sizeWidth = this.box.getWidth();
	this.gc.sizeHeight = this.box.getHeight();
	this.setSizePt(this.gc.sizeWidth,this.gc.sizeHeight);
	this.setPosition(this.gc.sizeLeft,this.gc.sizeTop);
	if (this.banner) this.banner.deconflictLayout(this);
}

ZRU.NVPRowHeader.prototype.moveLayoutBox=function(bx) {
	var u = "pt";
	var x=this.box.getHomeX();
	var y=this.box.getHomeY();
	if (this.activeGC()) {
		this.gc.sizeTop = y;
		this.gc.sizeLeft = x;
	}
	this.base.style.top=y+u;
	this.base.style.left=x+u;
	ZRU.getDisplayPropertyPanel().setActiveGC(this.gc)
	if (this.banner) this.banner.deconflictLayout(this);
}

ZRU.NVPRowHeader.prototype.editCaption=function() {
	var e = zenPage._editor.getTextEditorWidget();
	if (this.captionEditActive) {
		e.done();	
	}
	if (this.base.className!="bannerItemSelected") return;

	var em = zenPage._editor._editMode;
	var d=this.body;
	if (!(em=="TEXT" || em=="SELECT")) return;
	var v = this.rowId.captionStr;
	this.body.removeChild(this.body.firstChild);

	this.captionEditActive=true;
	e.bindToNode(this.base,v,this.objHook+"rowId.setColumnCaption(zenPage._editor.getTextEditorWidget().getValue());",null,this.gc);
}

//===============================//
// NVP ROW BODY STARTS HERE //
//===============================//

ZRU.NVPRowBody = function(div) {
	ZLM.initializeObject(this,div,"ZRU.NVPRowBody");
	this.boxNum=null;
	this.gc=null;
	this.banner=null;
	this.bannerNum=div.getAttribute("nvpBannerNum");
	this.itemClass=null;
	this.pristine=true;
	this.rowId = null;   /// COLUMN ID used for mapping headers to bodies
	this.createBody();
	return(this);
}

ZRU.NVPRowBody.create=function(bannerNum) {
	var div=ZLM.simulateTag("div class='nvpRowBody' nvpBannerNum='"+bannerNum+"'");
	return(new ZRU.NVPRowBody(div));
}

ZRU.NVPRowBody.prototype=new ZRU.BannerItem();

ZRU.NVPRowBody.prototype.setGC=function(gc,skipSize) {
	var o = null;
	if (skipSize) o = ZRU.saveGeometry(this.gc);
	this.gc = ZRU.getDisplayPropertyPanel().cloneGC(gc);
	this.gc.strokeApropos = true;
	this.gc.fillApropos = true;
	this.gc.textApropos = true;
	this.gc.tableApropos = true;
	this.gc.sizeApropos = true;
	if (skipSize) ZRU.restoreGeometry(this.gc,o);
	this.refresh();
}

ZRU.NVPRowBody.prototype.createBody=function() {
	this.initBase();
	this.box=new ZVE.LayoutBox(0,0,10,10);
	this.box.setResizeNotify(this.objHook+"resizeLayoutBox();");
	this.box.setMoveNotify(this.objHook+"moveLayoutBox();");
	this.box.setFocusNotify(this.objHook+"requestForeground();");
	this.box.setDragXConstraint("ZRU.NVPEdit.constrainBodyX(x)", ","+this.bannerNum);
	this.box.enableIncrementalEvents(false);
	this.box.bindToNode(this.base,this);
	this.unselect();
	ZLM.setLocalAttribute(this.base,"onmousedown",this.objHook+"setSelection(event);");
}

ZRU.NVPRowBody.prototype.remove=function() {
	if (this.rowId) this.rowId.remove();
}

ZRU.NVPRowBody.prototype.requestForeground = function() {
	if (this.banner) this.banner.moveToFront(this.rowId);
}

ZRU.NVPRowBody.prototype.setContents=function(fieldName) {
	this.fName=fieldName;
	this.itemClass="NR_BODY";
	this.body.innerHTML = fieldName;
	this.body.style.marginLeft = "2pt";
	this.body.style.marginRight = "2pt";
}

ZRU.NVPRowBody.prototype.refresh=function() {
	if (!this.gc) return;
	var bs = this.body.style;
	var fs = this.base.style;
	var g = this.gc;
	if (g.fillOpacity==0) fs.background = "transparent";
	else {
		fs.background = g.fillColor;
		fs.opacity = g.fillOpacity;
	}
	if (g.textBold) bs.fontWeight="bold";
	else bs.fontWeight="normal";

	if (g.textItalic) bs.fontStyle="italic";
	else bs.fontStyle="normal";

	if (g.textUnderline) bs.textDecoration="underline";
	else bs.textDecoration="none";

	// Address Borders and dividers
	var bdrStr = g.strokeWidth+"pt "+g.strokeStyle+" "+g.strokeColor;
	fs.borderLeft = "none";
	if (g.tableBorder) fs.borderRight = bdrStr;
	else fs.borderRight = "none";
	if ((this.boxNum == "0B" && g.tableBorder) ||
	    (this.boxNum != "0B" && (g.tableBodyColumnDivider || g.tableBodyRowDivider))) fs.borderTop = bdrStr;
	else fs.borderTop = "none";
	if ((this.rowId.isLastRow() && g.tableBorder ) ||
	    (!this.rowId.isLastRow() && (g.tableBodyColumnDivider || g.tableBodyRowDivider))) fs.borderBottom = bdrStr;
	else fs.borderBottom = "none";


	bs.color = g.textColor;
	bs.opacity = g.textOpacity;
	bs.fontSize = g.textSize+"pt";
	bs.textAlign = g.textJustify;
	bs.fontFamily = g.textFont;
	if (g.textFont=="cursive") bs.fontFamily = "\"Comic Sans MS\",cursive";
	bs.width = "100%";
	bs.height = "100%";
	fs.top=g.sizeTop+"pt";
	fs.left=g.sizeLeft+"pt";
	fs.height=g.sizeHeight+"pt";
	fs.width=g.sizeWidth+"pt";
	this.box.bindToNode(this.base,this);	
	if (this.banner) this.banner.deconflictLayout(this);
}

ZRU.NVPRowBody.prototype.resizeLayoutBox=function() {

	if (!this.gc) return;
	this.gc.sizeLeft = this.box.getHomeX();
	this.gc.sizeWidth = this.box.getWidth();
	this.gc.sizeHeight = this.box.getHeight();
	this.setSizePt(this.gc.sizeWidth,this.gc.sizeHeight);
	this.setPositionPt(this.gc.sizeLeft,this.gc.sizeTop);
	if (this.banner) this.banner.deconflictLayout(this);
}

ZRU.NVPRowBody.prototype.moveLayoutBox=function(bx) {
	var u = "pt";
	var x=this.box.getHomeX();
	var y=this.box.getHomeY();
	if (this.activeGC()) {
		this.gc.sizeTop = y;
		this.gc.sizeLeft = x;
	}
	this.base.style.top=y+u;
	this.base.style.left=x+u;
	ZRU.getDisplayPropertyPanel().setActiveGC(this.gc)
	if (this.banner) this.banner.deconflictLayout(this);
}

//==========================//
// NVPROW STARTS HERE //
//==========================//

ZRU.NVPRow=function(div) {
	ZLM.initializeObject(this,div,"ZRU.NVPRow");
	this.banner=null;
	this.bannerNum=div.getAttribute("nvpBannerNum");
	this.itemClass=null;
	this.headerItem = ZRU.NVPRowHeader.create(this.bannerNum);
	this.headerItem.rowId = this;
	this.bodyItem = ZRU.NVPRowBody.create(this.bannerNum);
	this.bodyItem.rowId = this;
	return(this);
}


ZRU.NVPRow.create=function(bannerNum) {
	var div=ZLM.simulateTag("div class='_NVPRow' nvpBannerNum='"+bannerNum+"'");
	return(new ZRU.NVPRow(div));
}

/// Force the elements of this row to the given position and size
ZRU.NVPRow.prototype.setGeometryPt=function(x,y,h,captionW,bodyW) {
	this.headerItem.setPositionPt(x,y);
	this.headerItem.setSizePt(captionW,h);
	this.bodyItem.setPositionPt(x+captionW,y);
	this.bodyItem.setSizePt(bodyW,h);
}

/// Force the elements of this column to the given position
ZRU.NVPRow.prototype.setPositionPt=function(x,y,captionW) {
	this.headerItem.setPositionPt(x,y);
	this.bodyItem.setPositionPt(x+captionW,y);
}


ZRU.NVPRow.prototype.resolveHeaderWithBody = function() {
	var y = this.bodyItem.gc.sizeTop;
	this.headerItem.setPositionPt(this.headerItem.gc.sizeLeft,y);
}

ZRU.NVPRow.prototype.resolveBodyWithHeader = function() {
	var y = this.headerItem.gc.sizeTop;
	this.bodyItem.setPositionPt(this.bodyItem.gc.sizeLeft,y);
}

ZRU.NVPRow.prototype.propagateTableSettings = function(masterGC) {
	var h = this.headerItem.gc;
	var b = this.bodyItem.gc;
	for (p in masterGC) {
		if (p.indexOf('table')==0 || p.indexOf('stroke')==0) {
			h[p] = masterGC[p];
			b[p] = masterGC[p];
		}
	}
	this.headerItem.refresh();
	this.bodyItem.refresh();
}

ZRU.NVPRow.prototype.remove=function() {
	if (this.banner) {
		this.banner.removeItem(this);
		this.headerItem.box.unbind();
		this.bodyItem.box.unbind();
		this.clearFromArea();
	}
}

ZRU.NVPRow.prototype.addToArea=function(div) {
	this.area = div;
	this.area.appendChild(this.headerItem.base);
	this.area.appendChild(this.bodyItem.base);	
}

ZRU.NVPRow.prototype.clearFromArea=function() {
	this.area.removeChild(this.headerItem.base);
	this.area.removeChild(this.bodyItem.base);
	this.area = null;
}	

ZRU.NVPRow.prototype.setBoxNum=function(n) {
	this.boxNum = n;
	this.headerItem.boxNum = n+"H";
	this.bodyItem.boxNum = n+"B";
}

ZRU.NVPRow.prototype.setBanner=function(b) {
	this.banner = b;
	this.headerItem.banner = b;
	this.bodyItem.banner = b;
/*
	if (b && b.item.length>0) {
		this.headerItem.setGC(b.item[0].headerItem.gc);
		this.bodyItem.setGC(b.item[0].bodyItem.gc);
	}
*/
}

ZRU.NVPRow.prototype.setContents=function(fieldName,path) {
	if (path) this.fName = path+fieldName;
	else {
		this.fName=fieldName;
		var sName = fieldName.split('/');
		fieldName = sName[sName.length-1];
	}
	this.itemClass = ZRU.classifyTextDatum(fieldName);
	this.bodyItem.setContents(ZRU.makeAvatarString(fieldName));
	this.captionStr = ZRU.makeCaptionString(fieldName);
	this.headerItem.setContents(this.captionStr);
/*
	if (fieldName.indexOf("$")==0) {
		var txtStr="("+fieldName+")";
		var capStr=fieldName.substring(1);
		this.itemClass="DVAR";
	}
	else if (fieldName.indexOf('!')==0) {
		var txtStr=fieldName.substring(1);
		var capStr=txtStr;
		this.itemClass="CAPN";
	}
	else if (fieldName.indexOf('@')==0) {
		var capStr=fieldName.substring(1);	
		var txtStr="{"+capStr+"}";
		this.itemClass="ATTR";
	}
	else {
		var txtStr="{"+fieldName+"}";
		var capStr=fieldName;
		this.itemClass="ELEM";
	}
	this.captionStr=capStr.toUpperCase();
	this.headerItem.setContents(this.captionStr);
	this.bodyItem.setContents(txtStr);
*/
}

ZRU.NVPRow.prototype.setColumnCaption=function(newHeader) {
	this.captionStr = newHeader;
	this.headerItem.setContents(this.captionStr);
}

ZRU.NVPRow.prototype.getHomeY = function() {
	return(this.headerItem.gc.sizeTop);
}

ZRU.NVPRow.prototype.getHomeX = function() {
	return(this.headerItem.gc.sizeLeft);
}

ZRU.NVPRow.prototype.getHeight = function() {
	return(this.headerItem.gc.sizeHeight);
}

ZRU.NVPRow.prototype.getWidth = function() {
	return(this.headerItem.gc.sizeWidth);
}

ZRU.NVPRow.prototype.isLastRow = function() {
	if (!this.banner) return(false);
	return(this.boxNum==this.banner.item.length-1);
}

ZRU.NVPRow.prototype.setSelection = function() {
	this.headerItem.setSelection();
}

ZRU.NVPRow.prototype.restoreObj=function(o) {
	this.setContents(o.f);
	this.captionStr = o.c;
	this.headerItem.setContents(this.captionStr);
	
	this.headerItem.banner = null;
	this.bodyItem.banner = null;
	this.headerItem.setGC(ZRU.getDisplayPropertyPanel().makeGCFromObj(o.gcH),false);
	this.bodyItem.setGC(ZRU.getDisplayPropertyPanel().makeGCFromObj(o.gcB),false);
	this.headerItem.banner = this.banner;
	this.bodyItem.banner = this.banner;
}

ZRU.NVPRow.prototype.exportToBannerObj=function() {
	var o = [];
	o[0] = {}; // Caption
	var cap = o[0];
	cap.t = "txt";
	cap.gc = ZRU.getDisplayPropertyPanel().projectGCAsObj(this.headerItem.gc);
	cap.gc.sa = 0;
	cap.gc.fa = 0;
	cap.gc.ta = 0;
	cap.c = "CAPN";
	cap.f = "!"+this.captionStr;
	cap.fn = "";
	
	o[1] = {};
	var fld = o[1]; // Field
	fld.t = "txt";
	fld.gc = ZRU.getDisplayPropertyPanel().projectGCAsObj(this.bodyItem.gc);
	fld.gc.sa = 0;
	fld.gc.fa = 0;
	fld.gc.ta = 0;
	if (this.fName.indexOf("@")>0) fld.c = "ATTR";
	else fld.c = "ELEM";
	fld.f = this.fName;
	fld.fn = "";
	return(o);
}

ZRU.NVPRow.prototype.exportToTableObj=function(headerW,margin) {
	var o = {}
	o.t='c';
	o.gcH = ZRU.getDisplayPropertyPanel().projectGCAsObj(this.headerItem.gc);
	o.gcH.zw = headerW;
	o.gcH.zt = 0;
	o.gcH.zl = margin;
	o.f = this.fName;
	o.gcB = ZRU.getDisplayPropertyPanel().projectGCAsObj(this.bodyItem.gc);
	o.gcB.zt = o.gcH.zh;
	o.gcB.zl = margin;
	o.c = this.captionStr;
	return(o);
}

ZRU.NVPRow.prototype.exportObj=function() {
	var o = {}
	o.t='r';
	o.gcH = ZRU.getDisplayPropertyPanel().projectGCAsObj(this.headerItem.gc);
	o.f = this.fName;
	o.gcB = ZRU.getDisplayPropertyPanel().projectGCAsObj(this.bodyItem.gc);
	o.c = this.captionStr;
	return(o);
}

ZRU.NVPRow.prototype.exportJSON=function(data) {

	data.push("{itemType:'_nvpRow',");
	var gcStr = ZRU.getDisplayPropertyPanel().projectGCAsJSON(this.headerItem.gc);
	data.push("gcHeader:{"+gcStr+"},");
	data.push("fieldName:'"+this.fName+"',");
	var gcStr = ZRU.getDisplayPropertyPanel().projectGCAsJSON(this.bodyItem.gc);
	data.push("gcBody:{"+gcStr+"},");
	data.push("caption:'"+this.captionStr+"'");
	data.push("}");
}

ZRU.NVPRow.prototype.exportZRS=function(data,coda) {
	var gcH = this.headerItem.gc;
	var gcB = this.bodyItem.gc;
	var ls = "0px solid #000000;";
	if (gcH.strokeStyle!="none") {
		ls = gcH.strokeWidth+'pt '+gcH.strokeStyle+' '+gcH.strokeColor+";" // Line style, all or nothing at this point...
	}

	var hs = [];
	if (gcH.fillOpacity>0) hs.push("background-color:"+gcH.fillColor+";");
	hs.push("font-size:"+gcH.textSize+";");
	if (gcH.textFont=="cursive") hs.push("font-family:\"Comic Sans MS\",cursive;");
	else hs.push("font-family:"+gcH.textFont+";");
	hs.push("color:"+gcH.textColor+";");
	if (gcH.textBold) hs.push("font-weight:bold;");
	else hs.push("font-weight:normal;");
	if (gcH.textItalic) hs.push("font-style:italic;");
	else hs.push("font-style:normal;");
	if (gcH.textUnderline) hs.push("text-decoration:underline;");
	else hs.push("text-decoration:none;");
	hs.push("text-align:"+gcH.textJustify+";");	

	if (gcH.tableHeaderBorder) {
		hs.push("border-left:"+ls);
		if (this.boxNum==0) hs.push("border-top:"+ls);
		if (this.boxNum==this.banner.item.length-1) hs.push("border-bottom:"+ls);		
	}

	if (gcH.tableHeaderBorder || gcH.tableHeaderBodyDivider) {
		hs.push("border-right:"+ls);
	}
	if (gcH.tableHeaderColumnDivider && this.boxNum<this.banner.item.length-1) {
		hs.push("border-bottom:"+ls);		
	}

	var headerStyle = hs.join('');

	var bs = [];	

	if (gcB.fillOpacity>0) bs.push("background-color:"+gcB.fillColor+";");
	bs.push("font-size:"+gcB.textSize+";");
	if (gcB.textFont=="cursive") bs.push("font-family:\"Comic Sans MS\",cursive;");
	else bs.push("font-family:"+gcB.textFont+";");
	bs.push("color:"+gcB.textColor+";");
	if (gcB.textBold) bs.push("font-weight:bold;");
	else bs.push("font-weight:normal;");
	if (gcB.textItalic) bs.push("font-style:italic;");
	else bs.push("font-style:normal;");
	if (gcB.textUnderline) bs.push("text-decoration:underline;");
	else bs.push("text-decoration:none;");
	bs.push("text-align:"+gcB.textJustify+";");

	if (gcB.tableBodyRowDivider && this.boxNum<this.banner.item.length-1) {
		bs.push("border-bottom:"+ls);
	}

	var bodyStyle = bs.join('');
	//FOR FIRST ROW ONLY SET WIDTH OF BODY ON ITEM AND WIDTH OF CAPTION ON CAPTION
	if (this.boxNum==0) {
		data.push("<item field='"+this.fName+"' width='"+gcB.sizeWidth+"' style='"+bodyStyle+"'>");
		data.push("<caption value='"+XML.escapeStr(this.captionStr)+"' width='"+gcH.sizeWidth+"' style='"+headerStyle+"' />");
	}
	else {
		data.push("<item field='"+this.fName+"' style='"+bodyStyle+"'>");
		data.push("<caption value='"+XML.escapeStr(this.captionStr)+"' style='"+headerStyle+"' />");
	}
	data.push("</item>");
}

ZRU.NVPRow.prototype.refresh=function() {
	if (!this.gc) return;
	var str="";
	if (this.gc.fillColor=="#ffffff") str+="background:none;";
	else str+=ZRU.projectGCPropertyAsJS(this.gc, "fillColor");
	str+=ZRU.projectGCPropertyAsJS(this.gc, "textColor");
	str+=ZRU.projectGCPropertyAsJS(this.gc, "textOpacity");
	str+=ZRU.projectGCPropertyAsJS(this.gc, "textStyle");
	str+=ZRU.projectGCPropertyAsJS(this.gc, "textSize");
	str+=ZRU.projectGCPropertyAsJS(this.gc, "textJustify");
	str+=ZRU.projectGCPropertyAsJS(this.gc, "textFont");
	var nvl=str.split(";");
	for (var i=0;i<nvl.length;i++) {
		var s=nvl[i].split(":");
		if (s[0]) {
			this.body.style[s[0]]=s[1];
		}
	}
	if (this.pristine) this.box.bindToNode(this.base,this);
	if (!this.base.style.width) this.base.style.width=this.base.offsetWidth+"px";	
}

//=======================================
// *****  NVP EDIT STARTS HERE    *****
//=======================================

ZRU.NVPEdit=function(div) {
	this.trackingModes = "SELECT";
	ZLM.initializeObject(this,div,"ZRU.NVPEdit");
	this.body=null;

	this.headerWidth = 144;
	this.headerWidthPx = 0;
	this.bodyWidth = 288;
	this.bodyWidthPx = 0;
	this.spacerWidth = 36;
	this.spacerWidthPx = 0;
	this.tableWidth = 0; 
	this.rowHeight = 18;
	
	this.mouseTracking=false;
	this.item=[];
	this.editMode="";
	if (div) {
		this.base.style.height="100%";
		this.watermark=div.getAttribute("watermark");
		this.setUnits(div.getAttribute("units"));
		this.createBody();
		this.setPageWidth(div.getAttribute("pageWidth")+div.getAttribute("units"));
		this.setHeaderWidthPt(144);
		this.initialized=1;
	}
	else {
		this.watermark = "";
		this.setUnits("in");
	}
	this.enabled=true;
	this.fName="Data Table";
	return(this);
}

ZRU.NVPEdit.create=function(watermark,pageWidth,units) {
	var div=ZLM.simulateTag("div class='nvpEdit'");
	if (watermark!=undefined) div.setAttribute("watermark",watermark);
	if (pageWidth!=undefined) div.setAttribute("pageWidth",pageWidth);
	if (units!=undefined) div.setAttribute("units",units);
	return(new ZRU.NVPEdit(div));	
}

ZRU.NVPEdit.endDataDrop=function() {
	var n=ZLM.getDragDestination();
	if (!n.controller.enabled) return;
	var obj=ZLM.getDragData();
	var x=ZLM.getPageOffsetLeft(ZLM.dragAvatar);
	var nx=ZLM.getPageOffsetLeft(n.controller.area);
	n.controller.addDroppedItem(x-nx,0,obj.name,obj.group);
	zenPage._editor.resetMode();
}

ZRU.NVPEdit.constrainHeaderX=function(x,tblIdx) {
	var tbl = ZRU.NVPEdit.registry[tblIdx];
	if (!tbl) return(0);	
	if (!tbl.spacerWidthPx || tbl.spacerWidthPx==0) tbl.spacerWidthPx = ZRU.convertToPixels(tbl.spacerWidth+"pt");
	return(tbl.spacerWidthPx);
}

ZRU.NVPEdit.constrainBodyX=function(x,tblIdx) {
	var tbl = ZRU.NVPEdit.registry[tblIdx];
	if (!tbl.spacerWidthPx || tbl.spacerWidthPx==0) tbl.spacerWidthPx = ZRU.convertToPixels(tbl.spacerWidth+"pt");
	if (!tbl.headerWidthPx || tbl.headerWidthPx==0) tbl.headerWidthPx = ZRU.convertToPixels(tbl.headerWidth+"pt");
	return(tbl.spacerWidthPx+tbl.headerWidthPx);
}

ZRU.NVPEdit.serviceMouse=function(who,event) {
	if (who>=ZRU.NVPEdit.registry.length) return;
	var n=ZRU.NVPEdit.registry[who];
	if (n) n.dispatchMouseEvent(event);
}

ZRU.NVPEdit.prototype=new ZRU.AbstractBannerEdit();

ZRU.NVPEdit.prototype.createBody=function() {
	this.createGenericBody("NVPEdit",false);
	var zoneMax = 3;
	if (this.watermark.indexOf("REPORT BODY")>=0) zoneMax++;
	this.createZoneTypeControl(zoneMax);
	this.setZoneTypeDefault(3);
	this.fullHeader.style.display="block";
}

ZRU.NVPEdit.prototype.moveToFront=function(rowObj) {
	if (rowObj) {
		rowObj.clearFromArea();
		rowObj.addToArea(this.area);
	}
}

ZRU.NVPEdit.prototype.addDroppedItem = function(x,y,fieldName,xPath) {
	this.addDataItem(x,y,fieldName,xPath);
	var z=this.item;
	for (var i=0;i<z.length;i++) {
		z[i].setBanner(null);
		z[i].propagateTableSettings(this.item[0].headerItem.gc);
		z[i].setBanner(this);
	}
}

ZRU.NVPEdit.prototype.addDataItem=function(x,y,fieldName,xPath,ignoreConflict) {
	if (!this.gc) {
		this.gc = ZRU.getDisplayPropertyPanel().cloneGC(ZRU.initGC());
	}
	var n=ZRU.NVPRow.create(this.instanceNum);
	n.setBanner(this);
	this.item.push(n);
	n.addToArea(this.area);
	var rPath = "";
	if (xPath) {
		var pLen = xPath.length;
		var extra = this.frame.prefixStr.substring(pLen);
		var split = extra.split("/");
		var lvls = split.length-1;
		for (var i=0;i<lvls;i++) rPath+="../";
	}
	n.setContents(fieldName,rPath);
	n.setGeometryPt(x,0,this.rowHeight,this.headerWidth,this.bodyWidth);
	n.setBoxNum(this.item.length);
	n.setSelection();
	if (!ignoreConflict) this.deconflictLayout();
	return(n);
}

/// Remove the contents of this table
ZRU.NVPEdit.prototype.clearZone=function() {
	for (var i=this.item.length-1;i>=0;i--) {
		this.item[i].remove();
	}
}

ZRU.NVPEdit.prototype.removeItem=function(who) {
	var shift=false;
	for (var i=0;i<this.item.length-1;i++) {
		if (this.item[i]==who) {
			shift=true;
		}
		if (shift) this.item[i]=this.item[i+1];
	}
	if (shift || this.item[i]==who) {
		this.item.pop();	
	}
	this.deconflictLayout();
}

ZRU.NVPEdit.prototype.deconflictLayout=function(trigger) {
	var pW = ZRU.convertToPoints(this.pageWidth);
	if (trigger) {
		var id = trigger.boxNum;
		if (!id) return; // must be new
		var rowNum = parseInt(id,10);
		if (id.indexOf('H')>0) {
			var sW = trigger.box.getHomeX();
			if (sW>pW-6) sW=pW-6;
			var hW = trigger.box.getWidth();
			if (hW+sW>pW-3) hW = pW-sW-3;
			this.setHeaderWidthPt(hW);
			this.setSpacerWidthPt(sW);
			this.item[rowNum].resolveBodyWithHeader();
		}
		else if (id.indexOf('B')>0) {
			var bW = trigger.box.getWidth();
			if (bW>(pW-this.spacerWidth-this.headerWidth)) bW = (pW-this.spacerWidth-this.headerWidth);
			this.setBodyWidthPt(bW);
			this.item[rowNum].resolveHeaderWithBody();	
		}
		var z=this.item;
		for (var i=0;i<z.length;i++) {
			z[i].setBanner(null);
			z[i].propagateTableSettings(trigger.gc);
			z[i].setBanner(this);
		}
	}
	var bW = this.bodyWidth;
	if (bW>(pW-this.spacerWidth-this.headerWidth)) this.bodyWidth = (pW-this.spacerWidth-this.headerWidth);
	this.sortZones();
	var z=this.item;
	var m=0;
	for (var i=0;i<z.length;i++) {
		z[i].setGeometryPt(this.spacerWidth,m,this.rowHeight,this.headerWidth,this.bodyWidth);
		m+=this.rowHeight;
	}
}

/// Sort the item array by increasing Home Y location and reset embedded box numbers
ZRU.NVPEdit.prototype.sortZones=function() {
	var z=this.item;
	for (var i=1;i<z.length;i++) {
		var val =z[i].getHomeY();
		var node=z[i];
		j=i-1;
		while(j>=0 && z[j].getHomeY()>val) {
			z[j+1]=z[j];
			j--;
		}
		z[j+1]=node;
	}
	for (var i=0;i<z.length;i++) z[i].setBoxNum(i);
}

ZRU.NVPEdit.prototype.convertToBodyNVP = function() {
}

ZRU.NVPEdit.prototype.restoreObj = function(o) {
	if (o.t!="n") return(false);  // only accept banner style body objects
	this.units = "pt";
	this.viewportHeight = o.h;
	this.groupName = o.g;
	if (o.a) {
		this.initializeFrameSizePt(o.w,o.h);
		this.setPageWidth(o.w);
		var n = o.i.length;
		if (n>0) {
			this.headerWidth = parseInt(o.i[0].gcH.zw,10);
			this.bodyWidth = parseInt(o.i[0].gcB.zw,10);
			this.spacerWidth = parseInt(o.i[0].gcH.zl,10);
		}
		for (var i = 0; i<n; i++) {
			var itm = o.i[i];
			var c = this.addDataItem(0,i*this.rowHeight,"_temp","",true);
			c.restoreObj(itm);
		}
	}
	this.deconflictLayout(null);
	return(true);
}

ZRU.NVPEdit.prototype.exportToBannerObj=function() {
	var o = {};
	o.t = 'b';
	o.g = this.groupName;
	o.a = true;
	o.h = "72pt";
	o.w = this.frame.master.rawPageWidth+this.frame.master.rawUnits;
	o.b = 0;
	o.i = [];
	var z = this.item;
	var len = z.length;
	for (var i=0;i<len;i++) {
		var a = z[i].exportToBannerObj();
		o.i.push(a[0]);
		o.i.push(a[1]);
	}
	return(o);
}

ZRU.NVPEdit.prototype.exportToParagraphObj=function() {
	var o = {};
	o.t = 'p';
	o.g = this.groupName;
	o.a = true;
	o.h = "72pt";
	o.w = this.frame.master.rawPageWidth+this.frame.master.rawUnits;
	o.b = 0;
	o.i = [];
	var z = this.item;
	var len = z.length;
	for (var i=0;i<len;i++) {
		var a = z[i].exportToBannerObj();
		a[0].t = 'pItem';
		a[1].t = 'pItem';
		o.i.push(a[0]);
		o.i.push(a[1]);
	}
	return(o);
}

ZRU.NVPEdit.prototype.exportToTableObj=function() {
	var o = {};
	o.t = 't';
	o.g = this.groupName;
	o.a = true;
	o.l = "0pt";
	var z = this.item;
	var len = z.length;
	var ps = this.frame.master.pageSetup;
	var w = ps.width-ps.right-ps.left;
	var hW = w;
	var m = 0;
	if (len>0) {
		hW = Math.round(w/len);
	}
	o.w = this.frame.master.rawPageWidth+this.frame.master.rawUnits;
	o.b = 0;
	o.i = [];
	for (var i=0;i<len;i++) {
		var a = z[i].exportToTableObj(hW,m);
		o.i.push(a);
		m+=hW;
	}
	return(o);
}

ZRU.NVPEdit.prototype.exportObj=function() {
	var o={};
	o.t = 'n';
	o.g = this.groupName;
	if (this.item.length>0) {
		this.projectFrameSize(o);	

		o.a=true;

		var leftStr = this.getLeftMarginStr();	
		var widthStr = this.getTotalWidthStr();

		o.l = leftStr;
		o.w = widthStr;

		o.i=[];
		var z=this.item;
		for (var i=0;i<z.length;i++) {
			var n = z[i].exportObj();
			o.i.push(n);
		}		
	}
	else o.a = false;
	return(o);
}

ZRU.NVPEdit.prototype.exportJSON=function(data) {
	data.push("{bannerType:'_nvp',");
	data.push("group:'"+this.groupName+"',");
	if (this.item.length>0) {
		data.push("activeZone:true,");

		var leftStr = this.getLeftMarginStr();	
		var widthStr = this.getTotalWidthStr();

		data.push("left:'"+leftStr+"',");
		data.push("width:'"+widthStr+"',");

		data.push("itemCount:"+this.item.length+",");
		data.push("item:[");
		var z=this.item;
		for (var i=0;i<z.length;i++) {
			z[i].exportJSON(data);
			if (i<z.length-1) data.push(",");
		}		
		data.push("]");
	}
	else data.push("activeZone:false");
	data.push("}");
}

ZRU.NVPEdit.prototype.exportZRS=function(data,coda) {
	var pageWidth = this.pageWidth;

	data.push("<!-- Start of "+this.watermark+" -->");
	var z=this.item;
	if (z.length==0) {
		data.push("<!-- No tabular rendering requested -->");
		data.push("<!-- End of "+this.watermark+" -->");
		return;
	}

	var name=this.watermark.split("(")[1];
	data.push("<group name='"+name.split(")")[0]+"' >");

	var margin = parseInt(this.getLeftMarginStr())-4;
	if (margin>0) {
		data.push('<fo><write><![CDATA[');
		data.push('<fo:table space-after="24pt" border-collapse="collapse" inline-progression-dimension="'+pageWidth+'">');
		data.push('<fo:table-column column-number="1" column-width="'+margin+'pt" />');
		data.push('<fo:table-column column-number="2" column-width="'+(pageWidth-margin)+'pt" />');
		data.push('<fo:table-body><fo:table-row><fo:table-cell><fo:block></fo:block></fo:table-cell><fo:table-cell>');
		data.push(']]>');
		data.push('</write></fo>');
	}
	var gc = this.item[0].bodyItem.gc;
	var styleStr = "margin-left:2pt;margin-right:2pt;";
	var ls = "0px solid #000000;";
	if (gc.tableBorder) {
		if (gc.strokeStyle!="none") {
			ls = gc.strokeWidth+'pt '+gc.strokeStyle+' '+gc.strokeColor+";"
		}
		styleStr += "border:"+ls;
	}
	data.push("<table orient='row' "+"width='"+this.getTotalWidthStr()+"' style='"+styleStr+"' >");
	for (var i=0;i<z.length;i++) z[i].exportZRS(data,coda);
	data.push("</table>");

	if (margin>0) {
		data.push("<fo><write><![CDATA[");
		data.push("</fo:table-cell></fo:table-row></fo:table-body></fo:table>");
		data.push("]]>");
		data.push("</write></fo>");
	}
	data.push("</group>");
	data.push("<!-- End of "+this.watermark+" -->");
}

ZRU.NVPEdit.prototype.getTotalWidthStr=function() {
	if (this.item.length==0) return("0px");
	return((this.headerWidth+this.bodyWidth)+"pt");
}

ZRU.NVPEdit.prototype.getLeftMarginStr=function() {
	if (this.item.length==0) return("0px");
	return(this.spacerWidth+"pt");
}

ZRU.NVPEdit.prototype.setPageWidth=function(x) {
	if ((""+parseFloat(x))==x) x = x+this.pageUnits;
	this.pageWidth = ZRU.convertToPixels(x);
	this.area.style.width=this.pageWidth+"px";
	this.plate.style.width=this.pageWidth+"px";
}

ZRU.NVPEdit.prototype.setHeaderWidthPt = function(w) {
	if (w<0) w=0;
	this.headerWidth = w;
	this.headerWidthPx = ZRU.convertToPixels(this.headerWidth+"pt");
}

ZRU.NVPEdit.prototype.setBodyWidthPt = function(w) {
	if (w<8) w=8;
	this.bodyWidth = w;
	this.bodyWidthPx = ZRU.convertToPixels(this.bodyWidth+"pt");
}

ZRU.NVPEdit.prototype.setSpacerWidthPt = function(w) {
	if (w<0) w=0;
	this.spacerWidth = w;
	this.spacerWidthPx = ZRU.convertToPixels(this.spacerWidth+"pt");
}

//============================================
// *****  CONDITIONAL NVP STARTS HERE    *****
//============================================

ZRU.ConditionalNVP=function(div) {
	this.trackingModes = "SELECT";
	ZLM.initializeObject(this,div,"ZRU.ConditionalNVP");
	this.body=null;
	this.condition="1=1";
	this.base.style.height="100%";
	this.masterBanner = null;

	this.headerWidth = 144;
	this.headerWidthPx = 0;
	this.bodyWidth = 288;
	this.bodyWidthPx = 0;
	this.spacerWidth = 36;
	this.spacerWidthPx = 0;
	this.tableWidth = 0; 
	this.rowHeight = 18;

	if (div) this.initializeFromDiv(div);
	else {	
		this.watermark="";
		this.prompt="";
		this.body=null;
		this.mouseTracking=false;
		this.activeZone=false;
		this.item=[];
		this.initialized=0;
		this.breaking=false;
		this.enabled=false;
	}
	this.editMode="";
	this.fName="Data Table";
	this.setHeaderWidthPt(144);
	return(this);
}

ZRU.ConditionalNVP.create=function(watermark,pageWidth,units) {
	var div=ZLM.simulateTag("div class='conditionalNVP'");
	if (watermark!=undefined) div.setAttribute("watermark",watermark);
	if (pageWidth!=undefined) div.setAttribute("pageWidth",pageWidth);
	if (units!=undefined) div.setAttribute("units",units);
	return(new ZRU.ConditionalNVP(div));	
}

ZRU.ConditionalNVP.endDataDrop=function() {
	var n=ZLM.getDragDestination();
	if (!n.controller.enabled) return;
	var obj=ZLM.getDragData();
	var x=ZLM.getPageOffsetLeft(ZLM.dragAvatar);
	var nx=ZLM.getPageOffsetLeft(n.controller.area);
	n.controller.addDroppedItem(x-nx,0,obj.name,obj.group);
	zenPage._editor.resetMode();
}

ZRU.ConditionalNVP.constrainHeaderX=function(x,tblIdx) {
	var tbl = ZRU.ConstrainNVP.registry[tblIdx];	
	if (!tbl.spacerWidthPx || tbl.spacerWidthPx==0) tbl.spacerWidthPx = ZRU.convertToPixels(tbl.spacerWidth+"pt");
	return(tbl.spacerWidthPx);
}

ZRU.ConditionalNVP.constrainBodyX=function(x,tblIdx) {
	var tbl = ZRU.ConditionalNVP.registry[tblIdx];
	if (!tbl.spacerWidthPx || tbl.spacerWidthPx==0) tbl.spacerWidthPx = ZRU.convertToPixels(tbl.spacerWidth+"pt");
	if (!tbl.headerWidthPx || tbl.headerWidthPx==0) tbl.headerWidthPx = ZRU.convertToPixels(tbl.headerWidth+"pt");
	return(tbl.spacerWidthPx+tbl.headerWidthPx);
}

ZRU.ConditionalNVP.serviceMouse=function(who,event) {
	if (who>=ZRU.ConditionalNVP.registry.length) return;
	var n=ZRU.ConditionalNVP.registry[who];
	if (n) n.dispatchMouseEvent(event);
}

ZRU.ConditionalNVP.prototype=new ZRU.NVPEdit();

ZRU.ConditionalNVP.prototype.createBody=function() {
	this.createGenericBody("ConditionalNVP",false);
	this.createZoneTypeControl(3);
	this.setZoneTypeDefault(3);
	this.fullHeader.style.display="block";
}

ZRU.ConditionalNVP.prototype.serviceZoneControl=function(mode) {
	if (mode==1) this.convertToConditionalBanner();
	else if (mode==2) this.convertToConditionalParagraph();
	else if (mode==3) this.convertToConditionalNVP();
}

ZRU.ConditionalNVP.prototype.convertToConditionalNVP = function() {
}

ZRU.ConditionalNVP.prototype.restoreObj = function(o) {
	if (o.t!="cn") return(false);  // only accept conditional NVP style body objects
	this.units = "pt";
	this.groupName = o.g;
	this.activateZone();
	this.setConditional(o.c);
	this.viewportHeight = o.h;
	if (o.b==1) {
		this.breaking = true;
		this.addPageBreakMarker();
	}
	else this.breaking=false;
	if (this.ruler && this.master && this.master.hRuler) this.ruler.units=this.master.hRuler.units;
	if (o.a) {
		if (this.frame)this.setPageWidth(this.frame.master.rawPageWidth+this.frame.master.rawUnits);
		else this.setPageWidth(o.w);
		this.initializeFrameSizePt(o.w,o.h);
		var n = o.i.length;
		if (n>0) {
			this.headerWidth = parseInt(o.i[0].gcH.zw,10);
			this.bodyWidth = parseInt(o.i[0].gcB.zw,10);
			this.spacerWidth = parseInt(o.i[0].gcH.zl,10);
		}
		for (var i = 0; i<n; i++) {
			var itm = o.i[i];
			var c = this.addDataItem(0,i*this.rowHeight,"_temp","",true);
			c.restoreObj(itm);
		}
	}
	this.deconflictLayout(null);
	return(true);
}

ZRU.ConditionalNVP.prototype.exportToConditionalBannerObj=function() {
	var o = {};
	o.t = 'cb';
	o.g = this.groupName;
	o.c = this.condition;
	o.a = true;
	o.h = "72pt";
	o.w = this.frame.master.rawPageWidth+this.frame.master.rawUnits;

	if (this.breaking) o.b=1;
	else o.b=0;

	o.i = [];
	var z = this.item;
	var len = z.length;
	for (var i=0;i<len;i++) {
		var a = z[i].exportToBannerObj();
		o.i.push(a[0]);
		o.i.push(a[1]);
	}
	return(o);
}

ZRU.ConditionalNVP.prototype.exportToParagraphObj=function() {
	var o = {};
	o.t = 'cp';
	o.g = this.groupName;
	o.c = this.condition;
	o.a = true;
	o.h = "72pt";
	o.w = this.frame.master.rawPageWidth+this.frame.master.rawUnits;
	if (this.breaking) o.b=1;
	else o.b=0;
	o.i = [];
	var z = this.item;
	var len = z.length;
	for (var i=0;i<len;i++) {
		var a = z[i].exportToBannerObj();
		a[0].t = 'pItem';
		a[i].t = 'pItem';
		o.i.push(a[0]);
		o.i.push(a[1]);
	}
	return(o);
}

ZRU.ConditionalNVP.prototype.exportObj=function() {
	var o={};
	o.t = 'cn';

	var s = "_r";
	if (this.watermark.indexOf("PAGE")==0) s="_p";
	else if (this.watermark.indexOf("GROUP")==0) {
		var name=this.watermark.split("(")[1];
		s = name.split(")")[0];
	}
	o.g=s;

	o.c=this.condition;
	this.projectFrameSize(o);	

	if (this.breaking) o.b=1;
	else o.b=0;

	if (this.item.length>0) {
		o.a=true;

		var leftStr = this.getLeftMarginStr();	
		var widthStr = this.getTotalWidthStr();

		o.l = leftStr;
		o.w = widthStr;

		o.i=[];
		var z=this.item;
		for (var i=0;i<z.length;i++) {
			var n = z[i].exportObj();
			o.i.push(n);
		}		
	}
	else o.a = false;
	return(o);
}

ZRU.ConditionalNVP.prototype.exportJSON=function(data) {
	data.push("{bannerType:'_cnvp',");
	data.push("group:'"+this.groupName+"',");
	if (this.item.length>0) {
		data.push("activeZone:true,");
		data.push("condition:'"+this.condition+"',");
		data.push("breaking:"+this.breaking);
		var leftStr = this.getLeftMarginStr();	
		var widthStr = this.getTotalWidthStr();

		data.push("left:'"+leftStr+"',");
		data.push("width:'"+widthStr+"',");

		data.push("itemCount:"+this.item.length+",");
		data.push("item:[");
		var z=this.item;
		for (var i=0;i<z.length;i++) {
			z[i].exportJSON(data);
			if (i<z.length-1) data.push(",");
		}		
		data.push("]");
	}
	else data.push("activeZone:false");
	data.push("}");
}

/// Export this banner in a syntax compatible with ZEN Reports
ZRU.ConditionalNVP.prototype.exportZRS=function(data,coda) {
	if (this.activeZone) {
		var pageWidth = this.pageWidth;

		data.push("<!-- Start of "+this.watermark+" -->");
		var z=this.item;
		if (z.length==0) {
			data.push("<!-- No tabular rendering requested -->");
			data.push("<!-- End of "+this.watermark+" -->");
			return;
		}

		var name=this.watermark.split("(")[1];
		data.push("<write>");
		data.push("<![CDATA[");
		data.push("<xsl:if test='"+this.condition+"' >");
		data.push("]]>");
		data.push("</write>");

		var margin = parseInt(this.getLeftMarginStr())-4;
		if (margin>0) {
			data.push('<fo><write><![CDATA[');
			data.push('<fo:table space-after="24pt" border-collapse="collapse" inline-progression-dimension="'+pageWidth+'">');
			data.push('<fo:table-column column-number="1" column-width="'+margin+'pt" />');
			data.push('<fo:table-column column-number="2" column-width="'+(pageWidth-margin)+'pt" />');
			data.push('<fo:table-body><fo:table-row><fo:table-cell><fo:block></fo:block></fo:table-cell><fo:table-cell  keep-together="always">');
			data.push(']]>');
			data.push('</write></fo>');
		}
		var gc = this.item[0].bodyItem.gc;
		var styleStr = "margin-left:2pt;margin-right:2pt;";
		var ls = "0px solid #000000;";
		if (gc.tableBorder) {
			if (gc.strokeStyle!="none") {
				ls = gc.strokeWidth+'pt '+gc.strokeStyle+' '+gc.strokeColor+";"
			}
			styleStr += "border:"+ls;
		}
		data.push("<table orient='row' "+"width='"+this.getTotalWidthStr()+"' style='"+styleStr+"' >");
		for (var i=0;i<z.length;i++) z[i].exportZRS(data,coda);
		data.push("</table>");

		if (margin>0) {
			data.push("<fo><write><![CDATA[");
			data.push("</fo:table-cell></fo:table-row></fo:table-body></fo:table>");
			data.push("]]>");
			data.push("</write></fo>");
		}
		data.push("<write>");
		data.push("<![CDATA[");
		data.push("</xsl:if>");
		data.push("]]>");
		data.push("</write>");
		data.push("<!-- End of "+this.watermark+" -->");
	}

}


//====================================================================================

//============================//
// PARAGRAPH ITEM STARTS HERE //
//============================//

/// Paragraph items render directly as FO block elements within a pre-defined column space
/// They do NOT project as SVG.  They may be a slingle character or an entire body of text
/// and (one day) may include inline format changes. They cannot include graphics nor can they be layered.
ZRU.ParaItem=function(div) {
	ZLM.initializeObject(this,div,"ZRU.ParaItem");
	this.banner=null;
	this.bannerNum=div.getAttribute("paraBannerNum");
	this.itemClass=null;
	this.pristine=true;
	this.boxNum=null;
	this.gc=null;
	this.createBody();
	return(this);
}

ZRU.ParaItem.create=function(bannerNum) {
	var div=ZLM.simulateTag("div class='_ParaItem' paraBannerNum='"+bannerNum+"'");
	return(new ZRU.ParaItem(div));
}

ZRU.ParaItem.prototype=new ZRU.BannerItem();

ZRU.ParaItem.prototype.createBody=function() {
	this.initBase();
	this.box=new ZVE.LayoutBox(0,0,10,10);
	this.box.setResizeNotify(this.objHook+"resizeLayoutBoxLocal();");
	this.box.setMoveNotify(this.objHook+"moveLayoutBoxLocal();");
	this.box.setFocusNotify(this.objHook+"requestForeground();");
///ALERT
	this.box.setTrueClickNotify(this.objHook+"editCaption();");
//	this.box.setFocusNotify(this.objHook+"editCaption();");
	this.box.setDragXConstraint("ZRU.ParaEdit.constrainX(x)", ","+this.bannerNum);
	this.box.setDragYConstraint("ZRU.ParaEdit.constrainY(x)", ","+this.bannerNum);
	this.box.enableIncrementalEvents(true);
	this.box.bindToNode(this.base,this);
	this.unselect();
	ZLM.setLocalAttribute(this.base,"onmousedown",this.objHook+"setSelection(event);");
}

ZRU.ParaItem.prototype.requestForeground = function() {
	if (this.banner) this.banner.moveToFront(this);
}

ZRU.ParaItem.prototype.editCaption=function() {
	var e = zenPage._editor.getTextEditorWidget();
	if (this.captionEditActive) {
		e.done();	
	}
	if (this.base.className!="bannerItemSelected") return;
	if (this.itemClass!="CAPN") return;
	this.requestForeground();
	var em = zenPage._editor._editMode;
	var d=this.body;
	this.requestForeground();
	if (!(em=="TEXT"||em=="SELECT")) return;
	var v = this.captionStr;
	this.body.innerHTML = "";
	this.captionEditActive=true;
	e.bindToNode(this.base,v,this.objHook+"setContents('!'+zenPage._editor.getTextEditorWidget().getValue(),'');",null,this.gc);
}

ZRU.ParaItem.prototype.setGC=function(gc,skipSize) {
	var o = null;
	if (skipSize) o = ZRU.saveGeometry(this.gc);
	this.gc = ZRU.getDisplayPropertyPanel().cloneGC(gc);
	this.gc.strokeApropos = false;
	this.gc.fillApropos = true;
	this.gc.textApropos = true;
	this.gc.tableApropos = false;
	this.gc.sizeApropos = false
	if (skipSize) ZRU.restoreGeometry(this.gc,o);
	this.refresh();
}

ZRU.ParaItem.prototype.setContents=function(fieldName,path) {
	if (fieldName.charAt(0)!="!") {
		if (path) this.fName = path+fieldName;
		else {
			this.fName=fieldName;
			if (fieldName.indexOf('../')==0) {
				var sName = fieldName.split('/');
				fieldName = sName[sName.length-1];
			}
		}
	}
	else {
		this.fName = fieldName;
	}
	this.itemClass = ZRU.classifyTextDatum(fieldName);
	this.captionStr =ZRU.makeAvatarString(fieldName);
	this.body.innerHTML = this.captionStr;
	this.body.style.whiteSpace="wrap";
	var sz = this.getNativeSize();
	var w = sz.width+"pt";
	var h = sz.height+"pt";
	this.base.style.height = h;
	this.base.style.width = w;
	if (this.activeGC()) {
		this.gc.sizeWidth = w;
		this.gc.sizeHeight = h;
	} 	
	this.box.bindToNode(this.base,this);
	if (this.banner) this.banner.deconflictLayout(this);
}

ZRU.ParaItem.prototype.restoreObj=function(o) {
	this.setContents(o.f);
	this.banner = null;
	this.setGC(ZRU.getDisplayPropertyPanel().makeGCFromObj(o.gc),false);
}


///FIX THIS
ZRU.ParaItem.prototype.exportToTableObj=function(headerW,margin) {
	var o = {}
	o.t='c';
	o.gcH = ZRU.getDisplayPropertyPanel().projectGCAsObj(this.gc);
	o.gcH.zw = headerW;
	o.gcH.zt = 0;
	o.gcH.zl = margin;
	o.f = this.fName;
	o.gcB = ZRU.getDisplayPropertyPanel().projectGCAsObj(this.gc);
	o.gcB.zt = o.gcH.zh;
	o.gcB.zl = margin;
	o.c = this.fName;
	return(o);
}

ZRU.ParaItem.prototype.cloneObj=function() {
	var o = this.exportObj();
	var n = ZRU.ParaItem.restoreObj(o,null);
	return(n);
}

ZRU.ParaItem.prototype.exportObj=function() {
	var o = {}
	o.t='pItem';
	this.gc.sizeApropos = true;
	o.gc = ZRU.getDisplayPropertyPanel().projectGCAsObj(this.gc);
	this.gc.sizeApropos = false;
	o.f = this.fName;
	o.c = this.itemClass;
	if (this.formatNumber) o.fn = this.formatNumber;
	else o.fn="";
	return(o);
}

ZRU.ParaItem.prototype.exportJSON=function(data) {

	data.push("{itemType:'_paraItem',");
	var gcStr = ZRU.getDisplayPropertyPanel().projectGCAsJSON(this.gc);
	data.push("gc:{"+gcStr+"},");
	data.push("itemClass:'_"+this.itemClass+"',");
	data.push("fieldName:'"+this.fName+"',");
	if (this.formatNumber) data.push("formatNumber:'"+this.formatNumber+"'");
	else data.push("formatNumber:''");
	data.push("}");
}

ZRU.ParaItem.prototype.exportZRS=function(data,coda) {
	var gc = this.gc;
	data.push("<fo:block ");
/*
	if (gc.strokeStyle!="none") {
		data.push("border-style='"+gc.strokeStyle+"' ");
		data.push("border-width='"+gc.strokeWidth+"pt' ");
		data.push("border-color='"+gc.strokeColor+"' ");
	}
*/
	if (gc.fillOpacity>0) data.push("background-color='"+gc.fillColor+"' ");
	data.push("font-size='"+gc.textSize+"' ");
	if (gc.textFont=="cursive") data.push("font-family='\"Comic Sans MS\",cursive' ");
	else data.push("font-family='"+gc.textFont+"' ");
	data.push("color='"+gc.textColor+"' ");
	if (gc.textBold) data.push("font-weight='bold' ");
	else data.push("font-weight='normal' ");
	if (gc.textItalic) data.push("font-style='italic' ");
	else data.push("font-style='normal' ");
	if (gc.textUnderline) data.push("text-decoration='underline' ");
	else data.push("text-decoration='none' ");
	data.push("text-align='"+gc.textJustify+"' ");	
	data.push("start-indent='"+gc.sizeLeft+"pt' ");
	if (this.banner) {
		data.push("end-indent='"+(this.banner.pageWidth-gc.sizeLeft-gc.sizeWidth)+"pt' ");
	}
	data.push(">");
	if (this.itemClass=="CAPN") {
		data.push(this.renderFOCodes(XML.escapeStr(this.fName.substring(1))));
	}
	else {
		if (this.formatNumber && this.formatNumber.length>0) {
			data.push('<xsl:value-of select="format-number('+this.fName+',\''+this.formatNumber+'\')" />');
		}
		else {
			data.push('<xsl:apply-templates select="./'+this.fName+'" />');
		}
	}

	data.push("</fo:block>");
}

/// Given embedded formatting codes, project these codes as their XSLFO analogues
ZRU.ParaItem.prototype.renderFOCodes=function(str) {
	if (str) {
		str = str.split("[b]").join("<fo:inline font-weight='bold'>");
		str = str.split("[/b]").join("</fo:inline>");

		str = str.split("[i]").join("<fo:inline font-style='italic'>");
		str = str.split("[/i]").join("</fo:inline>");
		
		str = str.split("[u]").join("<fo:inline text-decoration='underline'>");
		str = str.split("[/u]").join("</fo:inline>");

		str = str.split("[s]").join("<fo:inline text-decoration='line-through'>");
		str = str.split("[/s]").join("</fo:inline>");

		str = str.split("[super]").join("<fo:inline baseline-shift='super' font-size='smaller'>");
		str = str.split("[/super]").join("</fo:inline>");

		str = str.split("[sub]").join("<fo:inline baseline-shift='sub' font-size='smaller'>");
		str = str.split("[/sub]").join("</fo:inline>");
	}
	return(str);
}

ZRU.ParaItem.prototype.refresh=function() {
	if (!this.gc) return;
	var bs = this.body.style;
	var fs = this.base.style;
	var g = this.gc;
	if (g.fillOpacity==0) bs.background = "transparent";
	else {
		bs.background = g.fillColor;
		bs.opacity = g.fillOpacity;
	}
	if (g.textBold) bs.fontWeight="bold";
	else bs.fontWeight="normal";
	if (g.textItalic) bs.fontStyle="italic";
	else bs.fontStyle="normal";
	if (g.textUnderline) bs.textDecoration="underline";
	else bs.textDecoration="none";
	
//	var ss= g.strokeWidth+"pt "+g.strokeStyle+" "+g.strokeColor;
//	bs.border = ss;

	bs.borderStyle = "none";

	bs.color = g.textColor;
	bs.opacity = g.textOpacity;
	bs.fontSize = g.textSize+"pt";
	bs.textAlign = g.textJustify;
	bs.fontFamily = g.textFont;
	if (g.textFont=="cursive") bs.fontFamily = "\"Comic Sans MS\",cursive";
	bs.width = "100%";
	bs.height = "100%";
	fs.top=g.sizeTop+"pt";
	fs.left=g.sizeLeft+"pt";
	fs.height=g.sizeHeight+"pt";
	fs.width=g.sizeWidth+"pt";
	this.box.bindToNode(this.base,this);	
	if (this.banner) this.banner.deconflictLayout(this);
}

ZRU.ParaItem.prototype.getNativeSize=function() {
	var tNode = this.body.cloneNode(true);
	if (!this.gc) return({width:10,height:10});
	var bs = tNode.style;
	var g = this.gc;
	if (g.textBold) bs.fontWeight="bold";
	if (g.textItalic) bs.fontStyle="italic";
	if (g.textUnderline) bs.textDecoration="underline";

	bs.fontSize = g.textSize+"pt";
	bs.textAlign = g.textJustify;
	bs.fontFamily = g.textFont;
	if (g.textFont=="cursive") bs.fontFamily = "\"Comic Sans MS\",cursive";
	bs.position="absolute";
	bs.display="block";
	bs.width="";
	bs.height="";
	document.body.appendChild(tNode);
	var w = ZRU.convertToPoints(tNode.offsetWidth);
	var h = ZRU.convertToPoints(tNode.offsetHeight);
	document.body.removeChild(tNode);
	return({width:w,height:h});
}

ZRU.ParaItem.prototype.resizeLayoutBoxLocal=function() {
	this.resizeLayoutBox();
	if (this.banner && this.box.status=="complete") this.banner.deconflictLayout(this);
}

ZRU.ParaItem.prototype.moveLayoutBoxLocal=function(bx) {
	this.moveLayoutBox();
	if (this.banner && this.box.status=="complete") this.banner.deconflictLayout(this);
}

//=======================================
// *****  PARA EDIT STARTS HERE    *****
//=======================================

/// The paragraph area is a stack of paraItem nodes that are to be drawn in order
/// using FO text formating (as opposed to the SVG formating of graphic banners
/// or FO table layouts).
/// The height of the section should self-adjust based on the number of items included
/// Items should be packed vertically but may be reordered via drag and drop.
/// The width of items may be adjusted (effectively defining margins for the paragraph)
/// but the height of an item is dictated by its contents and has meaning only in the editor
/// not the projected document 
ZRU.ParaEdit=function(div) {
	this.trackingModes = "SELECT";
	ZLM.initializeObject(this,div,"ZRU.ParaEdit");
	this.body=null;
	this.rowHeight = 18; // Default height of new items
	if (div) {
		this.watermark=div.getAttribute("watermark");
		this.createBody();
		this.base.style.height="100%";
		this.setUnits(div.getAttribute("units"));
		this.setPageWidth(div.getAttribute("pageWidth")+div.getAttribute("units"));
		this.mouseTracking=false;
		this.item=[];
		this.editMode="";
		this.initialized=1;
		this.enabled=true;
	}
	else {
		this.watermark="";
		this.mouseTracking=false;
		this.item=[];
		this.editMode="";
		this.initialized=0;
		this.enabled=false;
	}
	this.fName="Paragraph";
	return(this);
}

ZRU.ParaEdit.create=function(watermark,pageWidth,units) {
	var div=ZLM.simulateTag("div class='paraEdit'");
	if (watermark!=undefined) div.setAttribute("watermark",watermark);
	if (pageWidth!=undefined) div.setAttribute("pageWidth",pageWidth);
	if (units!=undefined) div.setAttribute("units",units);
	return(new ZRU.ParaEdit(div));	
}

ZRU.ParaEdit.prototype=new ZRU.AbstractBannerEdit();

ZRU.ParaEdit.prototype.createBody=function() {
	this.createGenericBody("ParaEdit",false);
	var zoneMax = 3;
	if (this.watermark.indexOf("REPORT BODY")>=0) zoneMax++;
	this.createZoneTypeControl(zoneMax);
	this.setZoneTypeDefault(2);
	this.fullHeader.style.display="block";
}

ZRU.ParaEdit.endDataDrop=function() {
	var n=ZLM.getDragDestination();
	if (!n.controller.enabled) return;
	var obj=ZLM.getDragData();
	var x=ZLM.getPageOffsetLeft(ZLM.dragAvatar);
	var y=ZLM.getPageOffsetLeft(ZLM.dragAvatar);
	var nx=ZLM.getPageOffsetLeft(n.controller.area);
	var ny=ZLM.getPageOffsetLeft(n.controller.area);
	n.controller.addDroppedItem(x-nx,y-ny,obj.name,obj.group);
	zenPage._editor.resetMode();
}

// When moving items around don't let them go too far left
ZRU.ParaEdit.constrainX=function(x,tblIdx) {
	if (x<0) return(0);
	return(x);
}

// When moving items up don't let them escape of the top of the edit area
ZRU.ParaEdit.constrainY=function(y,tblIdx) {
	if (y<-2) return(-2);
	return(y);
}

ZRU.ParaEdit.serviceMouse=function(who,event) {
	if (who>=ZRU.ParaEdit.registry.length) return;
	var n=ZRU.ParaEdit.registry[who];
	if (n) n.dispatchMouseEvent(event);
}

ZRU.ParaEdit.prototype.serviceMouseClick=function(event) {
	ZRU.lastBannerClicked = this;
	var l = ZRU.locateEvent(event);
	ZRU.lastClickX = ZRU.convertToPoints(l.x);
	ZRU.lastClickY = ZRU.convertToPoints(l.y);
	var em = zenPage._editor._editMode;
	if (!this.boxSize) {
		this.boxSize = {x:l.x,y:l.y,w:1,h:1};
	}
	var bs = this.boxSize;

	if (em=="TEXT") {
		var item = this.item;
		var len = item.length;
		var reedit = null;
		var x = ZRU.lastClickX;
		var y = ZRU.lastClickY;
		for (var i=0;i<len;i++) {
			if (item[i].itemClass=="CAPN") {
				var g=item[i].gc;
				
				if (x>=g.sizeLeft && y>=g.sizeTop && x<g.sizeLeft+parseInt(g.sizeWidth,10) && y<g.sizeTop+parseInt(g.sizeHeight,10)) {
					reedit=item[i];
					i=len;
				}
			}
		}
		if (reedit) {
			this.editCaption(reedit);
		}
		else this.addCaption(l.x,l.y);		
	}
	if (em=="SELECT") {
		// Deleted for IE compatibility
	}
	if (em == "BREAK") {
		if (!this.breaking) {
			this.breaking=true;
			this.addPageBreakMarker();
		}
		else {
			this.breaking=false;
			this.removePageBreakMarker();
		}
	}
}

ZRU.ParaEdit.prototype.editCaption=function(item) {
	var e = zenPage._editor.getTextEditorWidget();
	if (this.captionEditActive) {
		e.done();	
	}
	if (this.base.className!="bannerItemSelected") return;	
	this.captionEditActive=true;
	e.bindToNode(item.base,item.getDisplayValue(),item.objHook+"setValue(zenPage._editor.getTextEditorWidget().getValue());",null,item.gc);
	item.setValue("");
}

ZRU.ParaEdit.prototype.addCaption=function(xPx,yPx) {
	var e = zenPage._editor.getTextEditorWidget();
	if (this.captionEditActive) {
		e.done();	
	}
	this.captionEditActive=true;
	this.plate.style.display="block";
	e.anchor(xPx,yPx,this.plate,this.objHook+"addFromCaptionEditor();",this.objHook+"plate.style.display='none';",ZRU.initGC());
}

ZRU.ParaEdit.prototype.addFromCaptionEditor=function() {
	this.captionEditActive=false;
	var e = zenPage._editor.getTextEditorWidget();
	var v = e.getValue();
	if (v=="") return;
	var x = ZRU.convertToPoints(e._anchorX);
	var y = ZRU.convertToPoints(e._anchorY);
	this.addDataItem(x,y,'!'+v,"");
	zenPage._editor.resetMode();
}

ZRU.ParaEdit.prototype.addDataItem=function(x,y,fieldName,xPath) {
	if (!this.gc) {
		this.gc = ZRU.getDisplayPropertyPanel().cloneGC(ZRU.initGC());
	}
	var n=ZRU.ParaItem.create(this.instanceNum);
	this.area.appendChild(n.base);
	var rPath = "";
	if (xPath) {
		var pLen = xPath.length;
		var extra = this.frame.prefixStr.substring(pLen);
		var split = extra.split("/");
		var lvls = split.length-1;
		for (var i=0;i<lvls;i++) rPath+="../";
	}
	n.setContents(fieldName,rPath);
	n.setPositionPt(0,y);
	n.setSizePt(this.pageWidth,this.rowHeight);
	n.setBoxNum(this.item.length);
	n.setBanner(this);
	n.setSelection();
	this.item.push(n);
	this.deconflictLayout();
	return(n);
}

ZRU.ParaEdit.prototype.removeItem=function(who) {
	var shift=false;
	for (var i=0;i<this.item.length-1;i++) {
		if (this.item[i]==who) {
			shift=true;
		}
		if (shift) this.item[i]=this.item[i+1];
	}
	if (shift || this.item[i]==who) {
		this.item.pop();
		this.area.removeChild(who.base);	
	}
	this.deconflictLayout();
}

/// Deconflicting the layout of a paragraph group means sorting all the items
/// by ascending y coordinate and packing them into a single column starting 
/// at zero pts
ZRU.ParaEdit.prototype.deconflictLayout=function() {
	this.sortZones();
	var z=this.item;
	var m=0;
	for (var i=0;i<z.length;i++) {
		var n = z[i];
		if (n.activeGC()) {
			n.gc.sizeTop = m+"pt";
		}
		n.base.style.top = m+"pt";
		if (n.box.selected) {
			n.unselect();
			n.select();
		}
		m+=n.getHeight();
	}
}

/// Sort the item array by increasing Home Y location and reset embedded box numbers
ZRU.ParaEdit.prototype.sortZones=function() {
	var z=this.item;
	for (var i=1;i<z.length;i++) {
		var val = parseFloat(z[i].getHomeY());
		var node=z[i];
		j=i-1;
		while(j>=0 && parseFloat(z[j].getHomeY())>val) {
			z[j+1]=z[j];
			j--;
		}
		z[j+1]=node;
	}
	for (var i=0;i<z.length;i++) z[i].setBoxNum(i);
}

ZRU.ParaEdit.prototype.getTotalWidthStr=function() {
	if (this.item.length==0) return("0px");
	return(this.pageWidth+"pt");
}

ZRU.ParaEdit.prototype.getLeftMarginStr=function() {
	if (this.item.length==0) return("0px");
	return(this.spacerWidth+"pt");
}

//========================================
// PARA EXPORT AND RESTORE FUNCTIONS
//----------------------------------------
ZRU.ParaEdit.prototype.convertToBodyParagraph = function() {
}

ZRU.ParaEdit.prototype.restoreObj = function(o) {
	if (o.t!="p") return(false);  // only accept paragraph-style objects
	this.units = "pt";
	this.groupName = o.g;
	this.viewportHeight = o.h;
	if (o.a) {
		var n = o.i.length;
		for (var i = 0; i<n; i++) {
			var itm = o.i[i];
			var c = this.addDataItem(0,i*this.rowHeight,"_temp","",true);
			c.restoreObj(itm);
			c.setBanner(this);
		}
	 	this.setPageWidth(o.w);
	}
	this.deconflictLayout(null);
	return(true);
}

ZRU.ParaEdit.prototype.exportToBannerObj=function() {
	var o = {};
	o.t = 'b';
	o.g = this.groupName;
	o.a = true;
	o.h = "72pt";
	o.w = this.frame.master.rawPageWidth+this.frame.master.rawUnits;
	o.b = 0;
	o.i = [];
	var z = this.item;
	var len = z.length;
	for (var i=0;i<len;i++) {
		var a = z[i].exportObj();
		a.t = 'txt';
		o.i.push(a);
	}
	return(o);
}

ZRU.ParaEdit.prototype.exportToTableObj=function() {
	var o = {};
	o.t = 't';
	o.g = this.groupName;
	o.a = true;
	o.l = "0pt";
	var z = this.item;
	var len = z.length;
	var ps = this.frame.master.pageSetup;
	var w = ps.width-ps.right-ps.left;
	var hW = w;
	var m = 0;
	var fCount = 0
	for (var i=0;i<len;i++) {
		var item = z[i];
		if (item.itemClass=="ATTR" || item.itemClass=="ELEM") fCount++;
	}
	if (fCount>0) {
		hW = Math.round(w/fCount);
	}
	o.w = this.frame.master.rawPageWidth+this.frame.master.rawUnits;
	o.b = 0;
	o.i = [];
	for (var i=0;i<len;i++) {
		var item = z[i];
		if (item.itemClass=="ATTR" || item.itemClass=="ELEM") {
			var io = {}
			io.t='c';
			io.gcH = ZRU.getDisplayPropertyPanel().projectGCAsObj(item.gc);
			io.gcH.za = 1;
			io.gcH.zw = hW;
			io.gcH.zt = 0;
			io.gcH.zl = m;
			io.gcH.ta = 1;
			io.gcH.xb = true;
			io.f = item.fName;
			io.gcB = ZRU.getDisplayPropertyPanel().projectGCAsObj(item.gc);
			io.gcB.ta = true;
			io.gcH.za = 1;
			io.gcB.zt = io.gcH.zh;
			io.gcB.zl = m;
			io.c = ZRU.makeCaptionString(item.fName);
			o.i.push(io);
			m+=hW;
		}
	}
	return(o);
}

ZRU.ParaEdit.prototype.exportToNVPObj=function() {
	var o = {};
	o.t = 'n';
	o.g = this.groupName;
	o.a = true;
	o.l = "0pt";
	var z = this.item;
	var len = z.length;
	var ps = this.frame.master.pageSetup;
	var w = ps.width-ps.right-ps.left;
	var hW = Math.round(0.2*w);
	var bW = w-hW
	var m = 0;
	o.w = this.frame.master.rawPageWidth+this.frame.master.rawUnits;
	o.b = 0;
	o.i = [];
	for (var i=0;i<len;i++) {
		var item = z[i];
		if (item.itemClass=="ATTR" || item.itemClass=="ELEM") {
			var io = {}
			io.t='r';
			io.gcH = ZRU.getDisplayPropertyPanel().projectGCAsObj(item.gc);
			io.gcH.zw = hW;
			io.gcH.zt = m;
			io.gcH.zl = 0;
			io.gcH.ta = 1;
			io.gcH.xb = true;
			io.f = item.fName;
			io.gcB = ZRU.getDisplayPropertyPanel().projectGCAsObj(item.gc);
			io.gcB.ta = true;
			io.gcB.zl = hW;
			io.gcB.zw = bW;
			io.gcB.zt = m;
			io.c = ZRU.makeCaptionString(item.fName);
			o.i.push(io);
			m+=18;
		}
	}
	return(o);
}

ZRU.ParaEdit.prototype.exportObj=function() {
	var o={};
	o.t = 'p';
	o.g = this.groupName;
	o.w = this.frame.master.rawPageWidth+this.frame.master.rawUnits;
	if (this.item.length>0) {
		o.a=true;
		o.i=[];
		var z=this.item;
		for (var i=0;i<z.length;i++) {
			var n = z[i].exportObj();
			o.i.push(n);
		}		
	}
	else o.a = false;
	return(o);
}

ZRU.ParaEdit.prototype.exportJSON=function(data) {
	data.push("{bannerType:'_paragraph',");
	data.push("group:'"+this.groupName+"',");
	if (this.item.length>0) {
		data.push("activeZone:true,");

		var leftStr = this.getLeftMarginStr();	
		var widthStr = this.getTotalWidthStr();

		data.push("left:'"+leftStr+"',");
		data.push("width:'"+widthStr+"',");

		data.push("itemCount:"+this.item.length+",");
		data.push("item:[");
		var z=this.item;
		for (var i=0;i<z.length;i++) {
			z[i].exportJSON(data);
			if (i<z.length-1) data.push(",");
		}		
		data.push("]");
	}
	else data.push("activeZone:false");
	data.push("}");
}

ZRU.ParaEdit.prototype.exportZRS=function(data,coda) {
	var pageWidth = this.pageWidth;
	data.push("<!-- Start of "+this.watermark+" as paragraphs -->");
	var z=this.item;
	if (z.length==0) {
		data.push("<!-- No rendering requested -->");
		data.push("<!-- End of "+this.watermark+" -->");
		return;
	}

	var name=this.watermark.split("(")[1];
	data.push("<group name='"+name.split(")")[0]+"' >");

	data.push('<fo><write><![CDATA[');

	for (var i=0;i<z.length;i++) z[i].exportZRS(data,coda);

	data.push("]]>");
	data.push("</write></fo>");
	data.push("</group>");
	data.push("<!-- End of "+this.watermark+" -->");
}

//=======================================
//  CONDITIONAL PARAGRAPH STARTS HERE
//=======================================
ZRU.ConditionalPara=function(div) {
	ZLM.initializeObject(this,div,"ZRU.ConditionalPara");
	this.body=null;	
	this.base.style.height="100%";
	this.rowHeight = 18; // Default height of new items

	this.condition="1=1";
	this.masterBanner = null;
	if (div) this.initializeFromDiv(div);
	else {
		this.watermark="";
		this.prompt="";
		this.body=null;
		this.mouseTracking=false;
		this.activeZone=false;
		this.item=[];
		this.initialized=0;
		this.breaking=false;
		this.enabled=false;
	}
	this.fName="Paragraph";
	return(this);
}

ZRU.ConditionalPara.create=function(watermark,pageWidth,units,prompt) {
	var div=ZLM.simulateTag("div class='paraEdit'");
	if (watermark!=undefined) div.setAttribute("watermark",watermark);
	if (pageWidth!=undefined) div.setAttribute("pageWidth",pageWidth);
	if (units!=undefined) div.setAttribute("units",units);
	return(new ZRU.ConditionalPara(div));	
}

ZRU.ConditionalPara.prototype=new ZRU.ParaEdit();

ZRU.ConditionalPara.prototype.createBody=function() {
	this.createGenericBody("ConditionalPara",false);
	this.createZoneTypeControl(3);
	this.setZoneTypeDefault(2);
	this.fullHeader.style.display="block";
}

ZRU.ConditionalPara.endDataDrop=function() {
	var n=ZLM.getDragDestination();
	if (!n.controller.enabled) return;
	var obj=ZLM.getDragData();
	var x=ZLM.getPageOffsetLeft(ZLM.dragAvatar);
	var y=ZLM.getPageOffsetLeft(ZLM.dragAvatar);
	var nx=ZLM.getPageOffsetLeft(n.controller.area);
	var ny=ZLM.getPageOffsetLeft(n.controller.area);
	n.controller.addDroppedItem(x-nx,y-ny,obj.name,obj.group);
	zenPage._editor.resetMode();
}

// When moving items around don't let them go too far left
ZRU.ConditionalPara.constrainX=function(x,tblIdx) {
	if (x<0) return(0);
	return(x);
}

// When moving items up don't let them escape of the top of the edit area
ZRU.ConditionalPara.constrainY=function(y,tblIdx) {
	if (y<-2) return(-2);
	return(y);
}

ZRU.ConditionalPara.serviceMouse=function(who,event) {
	if (who>=ZRU.ConditionalPara.registry.length) return;
	var n=ZRU.ConditionalPara.registry[who];
	if (n) n.dispatchMouseEvent(event);
}

//===============================================
// CONDITIONAL PARA EXPORT AND RESTORE FUNCTIONS
//-----------------------------------------------
ZRU.ConditionalPara.prototype.convertToConditionalParagraph = function() {
}


ZRU.ConditionalPara.prototype.restoreObj=function(o) {
	if (o.t!="cp") return(false);  // only accept paragraph-style objects
	this.units = "pt";
	this.groupName = o.g;
	if (o.a) {
		this.activateZone();
		this.setConditional(o.c);
		this.viewportHeight = o.h;
		this.setPageWidth(o.w);
		var n = o.i.length;
		for (var i = 0; i<n; i++) {
			var itm = o.i[i];
			var c = this.addDataItem(0,i*this.rowHeight,"_temp","",true);
			c.restoreObj(itm);
			c.setBanner(this);
		}
		if (o.b==1) {
			this.breaking = true;
			this.addPageBreakMarker();
		}
		else {
			this.breaking=false;
		}
	}
	this.sectionHeaderFullHeight = 2*this.sectionHeaderHeight;
	this.frame.minH = this.sectionHeaderFullHeight+1;
	this.deconflictLayout(null);
	return(true);
}

ZRU.ConditionalPara.prototype.exportToConditionalBannerObj=function() {
	var o = {};
	o.t = 'cb';
	o.g = this.groupName;
	o.c = this.condition;
	o.a = true;
	o.h = "72pt";
	o.w = this.frame.master.rawPageWidth+this.frame.master.rawUnits;
	if (this.breaking) o.b = 1;
	else o.b = 0;
	o.i = [];
	var z = this.item;
	var len = z.length;
	for (var i=0;i<len;i++) {
		var a = z[i].exportObj();
		a.t = 'txt';
		o.i.push(a);
	}
	return(o);
}

ZRU.ConditionalPara.prototype.exportToNVPObj=function() {
	var o = {};
	o.t = 'cn';
	o.g = this.groupName;
	o.c = this.condition;
	o.a = true;
	o.l = "0pt";
	var z = this.item;
	var len = z.length;
	var ps = this.frame.master.pageSetup;
	var w = ps.width-ps.right-ps.left;
	var hW = Math.round(0.2*w);
	var bW = w-hW
	var m = 0;
	o.w = this.frame.master.rawPageWidth+this.frame.master.rawUnits;
	if (this.breaking) o.b = 1;
	else o.b = 0;
	o.i = [];
	for (var i=0;i<len;i++) {
		var item = z[i];
		if (item.itemClass=="ATTR" || item.itemClass=="ELEM") {
			var io = {}
			io.t='r';
			io.gcH = ZRU.getDisplayPropertyPanel().projectGCAsObj(item.gc);
			io.gcH.zw = hW;
			io.gcH.zt = m;
			io.gcH.zl = 0;
			io.gcH.ta = 1;
			io.gcH.xb = true;
			io.f = item.fName;
			io.gcB = ZRU.getDisplayPropertyPanel().projectGCAsObj(item.gc);
			io.gcB.ta = true;
			io.gcB.zl = hW;
			io.gcB.zw = bW;
			io.gcB.zt = m;
			io.c = ZRU.makeCaptionString(item.fName);
			o.i.push(io);
			m+=18;
		}
	}
	return(o);
}

ZRU.ConditionalPara.prototype.exportObj=function() {
	var o={};
	o.t = 'cp';
	o.g = this.groupName;
	o.c = this.condition;
	o.w = this.frame.master.rawPageWidth+this.frame.master.rawUnits;
	if (this.item.length>0) {
		o.a=true;
		o.i=[];
		var z=this.item;
		for (var i=0;i<z.length;i++) {
			var n = z[i].exportObj();
			o.i.push(n);
		}		
	}
	else o.a = false;
	return(o);
}

ZRU.ConditionalPara.prototype.exportJSON=function(data) {
	data.push("{bannerType:'_conditonalparagraph',");
	data.push("group:'"+this.groupName+"',");
	data.push("condition:'"+this.condition);
	if (this.item.length>0) {
		data.push("activeZone:true,");

		var leftStr = this.getLeftMarginStr();	
		var widthStr = this.getTotalWidthStr();

		data.push("left:'"+leftStr+"',");
		data.push("width:'"+widthStr+"',");

		data.push("itemCount:"+this.item.length+",");
		data.push("item:[");
		var z=this.item;
		for (var i=0;i<z.length;i++) {
			z[i].exportJSON(data);
			if (i<z.length-1) data.push(",");
		}		
		data.push("]");
	}
	else data.push("activeZone:false");
	data.push("}");
}

ZRU.ConditionalPara.prototype.exportZRS=function(data,coda) {
	if (this.activeZone) {
		var pageWidth = this.pageWidth;
		data.push("<!-- Start of "+this.watermark+" as paragraphs -->");
		var z=this.item;
		if (z.length==0) {
			data.push("<!-- No rendering requested -->");
			data.push("<!-- End of "+this.watermark+" -->");
			return;
		}

		var name=this.watermark.split("(")[1];
//data.push("<group name='"+name.split(")")[0]+"' >");

		data.push('<fo><write><![CDATA[');
		data.push('<xsl:if test="'+this.condition+'" >');

		for (var i=0;i<z.length;i++) z[i].exportZRS(data,coda);

		if (this.breakDiv && this.breakSpot=="bottom:0px;") data.push('<fo:block break-after="page"/>');
		data.push('</xsl:if>');

		data.push("]]>");
		data.push("</write></fo>");
//data.push("</group>");
		data.push("<!-- End of "+this.watermark+" -->");
	}
}

ZRU.ConditionalPara.prototype.serviceZoneControl=function(mode) {
	if (mode==1) this.convertToConditionalBanner();
	else if (mode==2) this.convertToConditionalParagraph();
	else if (mode==3) this.convertToConditionalNVP();
}

ZRU.ConditionalPara.prototype.convertToConditionalParagraph = function() {
}

//========================================================================



//==============================
//  BODY_AS_BANNER STARTS HERE  
//==============================
ZRU.BodyEdit=function(div) {
	this.trackingModes = "SELECT|RECT|IMAGE|BCODE";

	ZLM.initializeObject(this,div,"ZRU.BodyEdit");
	this.body=null;
	this.watermark=div.getAttribute("watermark");
	this.prompt=div.getAttribute("prompt");
	this.createBody();
	this.setUnits(div.getAttribute("units"));
	this.setPageWidth(div.getAttribute("pageWidth")+div.getAttribute("units"));

	this.mouseTracking=false;
	this.activeZone=true;
	this.item=[];
	this.initialized=1;
	this.breaking=false;
	this.breakDiv = null;
	this.enabled=true;
	return(this);
}

ZRU.BodyEdit.prototype = new ZRU.BannerEdit();

ZRU.BodyEdit.prototype.createBody=function() {
	this.createGenericBody("BodyEdit",true);
	this.createZoneTypeControl(4);
	this.setZoneTypeDefault(1);
	this.fullHeader.style.display="block";
}

ZRU.BodyEdit.create=function(watermark,pageWidth,units,prompt) {
	var div=ZLM.simulateTag("div class='bodyEdit'");
	if (prompt!=undefined) div.setAttribute("prompt",prompt);
	if (watermark!=undefined) div.setAttribute("watermark",watermark);
	if (pageWidth!=undefined) div.setAttribute("pageWidth",pageWidth);
	if (units!=undefined) div.setAttribute("units",units);
	return(new ZRU.BodyEdit(div));	
}

ZRU.BodyEdit.endDataDrop=function() {
	var n=ZLM.getDragDestination();
	if (!n.controller.enabled) return;
	n.controller.handleDataDrop();
}

ZRU.BodyEdit.serviceMouse=function(who,event) {
	if (who>=ZRU.BodyEdit.registry.length) return;
	var n=ZRU.BodyEdit.registry[who];
	if (n) n.dispatchMouseEvent(event);
}

ZRU.BodyEdit.prototype.handleDataDrop = function() {
	var e=ZLM.getDragEndEvent();
	var px = ZLM.getPageOffsetLeft(this.area);
	var py = ZLM.getPageOffsetTop(this.area);

	var x = e.clientX-px;
	var y = e.clientY-py;

	if (e.pageX) {
		x = e.pageX-px;
		y = e.pageY-py;
	}
	var obj=ZLM.getDragData();
	var images = [];
	var z=this.item;
	for (var i=z.length-1;i>=0;i--) {
		if (z[i].itemClass=='IMAGE') images.push(z[i]);
	}

	var len = images.length;
	for (var i=0; i<len; i++) {
		var gc = images[i].base;
		var lx = gc.offsetLeft;
		var ux = lx+gc.offsetWidth;
		var ly = gc.offsetTop;
		var uy = ly+gc.offsetHeight;
		if (x>lx && x<ux && y>ly && y<uy) {
			images[i].setDynamicURL(obj.name);
			return;
		}
	}
	if (!x || x<0) return;
	if (!y || y<0) return;

	var x = ZRU.convertToPoints(x);
	var y = ZRU.convertToPoints(y);
	var item = this.addDataItem(x,y,obj.name,obj.group);
	zenPage._editor.resetMode();
	item.setSelection(null);
}

// POSSIBLE MOVE TO ABSTRACT...
ZRU.BodyEdit.prototype.purgeSubBanners = function() {
	if (this.subBanners) { // delete any conditional sections
		for (var i=this.subBanners.length-1;i>=0;i--) {
			this.removeSubBanner(this.subBanners[i].editor);
		}
	}
}

/// Override conversion when we're already in that format
ZRU.BodyEdit.prototype.convertToBodyBanner = function() {
}

ZRU.BodyEdit.prototype.restoreObj=function(o) {
	if (o.t!="b") return(false);  // only accept banner style body objects
	if (o.g.charAt(0)!='_' && this.watermark.indexOf(o.g)<0) return(false);// and still wrong group
	// if we're still here, we must be in the right banner, apply settings
	this.units = "pt";
	if (this.master && this.master.hRuler) this.ruler.units=this.master.hRuler.units;
	if (o.a) {
		this.activateZone();
		this.initializeFrameSizePt(o.w,o.h);

		this.setPageWidth(o.w);
		if (o.b==1) {
			this.breaking = true;
			this.addPageBreakMarker();
		}
		else {
			this.breaking=false;
			this.breakDiv = null;
		}

		var itemLen = o.i.length;
		if (itemLen) for (var i=0;i<itemLen;i++) {
			var item = o.i[i];
			// ADD STUFF TO THIS.ITEM
			var t = item.t;
			switch(t) {
				case "txt":
					var n = ZRU.BannerTextItem.restoreObj(item,this.area);
					break;
				case "box":
					var n = ZRU.BannerBoxItem.restoreObj(item,this.area);
					break;
				case "line":
					var n = ZRU.BannerLineItem.restoreObj(item,this.area);
					break;
			}
if (!n) {
	alert('Attempt to restore banner item '+t+' failed, aborting restore');
	return(false);
}
			n.setBoxNum(this.item.length);
			n.setBanner(this);
			this.item.push(n);
		}
		var sb = o.cb;
		if (sb && sb.length>0) {
			this.subBanners = [];
			for (var i=0;i<sb.length;i++) {
				this.restoreSubBanner(o.cb[i]);
			}
		}
	}
	return(true);
}

ZRU.BodyEdit.prototype.exportToTableObj=function() {
	var o = {};
	o.t = 't';
	o.g = this.groupName;
	o.a = true;
	o.l = "0pt";
	var z = this.item;
	var len = z.length;

	var ps = this.frame.master.pageSetup;
	var w = ps.width-ps.right-ps.left;
	var hW = w;
	var m = 0;
	var fCount = 0
	for (var i=0;i<len;i++) {
		var item = z[i];
		if (item.itemClass=="ATTR" || item.itemClass=="ELEM") fCount++;
	}
	if (fCount>0) {
		hW = Math.round(w/fCount);
	}
	o.w = this.frame.master.rawPageWidth+this.frame.master.rawUnits;
	o.b = 0;
	o.i = [];
	for (var i=0;i<len;i++) {
		var item = z[i];
		if (item.itemClass=="ATTR" || item.itemClass=="ELEM") {
			var io = {}
			io.t='c';
			io.gcH = ZRU.getDisplayPropertyPanel().projectGCAsObj(item.gc);
			io.gcH.zw = hW;
			io.gcH.zt = 0;
			io.gcH.zl = m;
			io.gcH.ta = 1;
			io.gcH.xb = true;
			io.f = item.fName;
			io.gcB = ZRU.getDisplayPropertyPanel().projectGCAsObj(item.gc);
			io.gcB.ta = true;
			io.gcB.zt = io.gcH.zh;
			io.gcB.zl = m;
			io.c = ZRU.makeCaptionString(item.fName);
//io.c = this.frame.master.autoFillCamelCaseToString(item.fName);
			o.i.push(io);
			m+=hW;
		}
	}
	return(o);
}

ZRU.BodyEdit.prototype.exportToNVPObj=function() {
	var o = {};
	o.t = 'n';
	o.g = this.groupName;
	o.a = true;
	o.l = "0pt";
	var z = this.item;
	var len = z.length;
	var ps = this.frame.master.pageSetup;
	var w = ps.width-ps.right-ps.left;
	var hW = Math.round(0.2*w);
	var bW = w-hW
	var m = 0;
	var fCount = 0
	for (var i=0;i<len;i++) {
		var item = z[i];
		if (item.itemClass=="ATTR" || item.itemClass=="ELEM") fCount++;
	}
	if (fCount>0) {
		hW = Math.round(w/fCount);
	}

	o.w = this.frame.master.rawPageWidth+this.frame.master.rawUnits;
	o.b = 0;
	o.i = [];
	for (var i=0;i<len;i++) {
		var item = z[i];
		if (item.itemClass=="ATTR" || item.itemClass=="ELEM") {
			var io = {}
			io.t='r';
			io.gcH = ZRU.getDisplayPropertyPanel().projectGCAsObj(item.gc);
			io.gcH.zw = hW;
			io.gcH.zt = m;
			io.gcH.zl = 0;
			io.gcH.ta = 1;
			io.gcH.xb = true;
			io.f = item.fName;
			io.gcB = ZRU.getDisplayPropertyPanel().projectGCAsObj(item.gc);
			io.gcB.ta = true;
			io.gcB.zl = hW;
			io.gcB.zw = bW;
			io.gcB.zt = m;
			io.c = ZRU.makeCaptionString(item.fName);
//io.c = this.frame.master.autoFillCamelCaseToString(item.fName);
			o.i.push(io);
			m+=18;
		}
	}
	return(o);
}

ZRU.BodyEdit.prototype.exportToParagraphObj=function() {
	var o = {};
	o.t = 'p';
	o.g = this.groupName;
	o.a = true;
	o.h = "72pt";
	o.w = this.frame.master.rawPageWidth+this.frame.master.rawUnits;
	o.b = 0;
	o.i = [];
	var z = this.item;
	var len = z.length;

	for (var i=0;i<len;i++) {
		var item = z[i];
		if (item.objClass=="ZRU.BannerTextItem") {
			var io = item.exportObj();
			io.t='pItem';
			o.i.push(io);
		}
	}
	return(o);
}

ZRU.BodyEdit.prototype.exportObj=function() {
	var o = {};

	o.t="b";
	var name=this.watermark.split("(")[1];
	s = name.split(")")[0];
	o.g=s;
	o.a=this.activeZone;
	
	if (this.activeZone) {
		this.projectFrameSize(o);

		if (this.breaking) o.b=1;
		else o.b=0;

		o.i = [];
		var z=this.item;
		for (var i=0;i<z.length;i++) {
			var n = z[i].exportObj();
			o.i.push(n);
		}
		if (this.subBanners) { // export any conditional sections within this grouping
			o.cb = [];
			var z=this.subBanners;
			for (var i=0;i<z.length;i++) {
				var n = z[i].editor.exportObj();
				o.cb.push(n);
			}
		}
	}
	return(o);
}

ZRU.BodyEdit.prototype.exportJSON=function(data) {
	data.push("{bannerType:'b'");
	var name=this.watermark.split("(")[1];
	var s = "'"+name.split(")")[0]+"',";
	data.push("group:"+s);
	data.push("activeZone:"+this.activeZone);
	
	if (this.activeZone) {
		data.push(",");
		var ppr= ZRU.Ruler.getPixelPointRatio();
		var widthStr=Math.round(this.area.offsetWidth/ppr)+"pt";
		var heightStr=Math.round(this.area.offsetHeight/ppr)+"pt";

		data.push("height:'"+heightStr+"',");
		data.push("width:'"+widthStr+"',");

		if (this.breaking) data.push("breaking:1,");
		else data.push("breaking:0,");
		data.push("itemCount:"+this.item.length+",");
		data.push("item:[");
		var z=this.item;
		for (var i=0;i<z.length;i++) {
			z[i].exportJSON(data);
			if (i<z.length-1) data.push(",");
		}		
		data.push("]");
	}
	data.push("}");
}

/// Export this banner in a syntax compatible with ZEN Reports
ZRU.BodyEdit.prototype.exportZRS=function(data,coda) { 
	var name=this.watermark.split("(")[1];
	data.push("<group name='"+name.split(")")[0]+"' >");

	if (this.activeZone) {
		data.push('<!-- '+this.watermark+' -->');
		if (this.breakDiv && this.breakSpot=="top:0px;") data.push("<pagebreak/>");
		data.push('<write>');
		data.push('<![CDATA[');
		data.push('<fo:block font-size="0pt">');

		var svgBody = this.getFOSVGBody();
		var svgLen = svgBody.length;

		var charts = [];
		var z=this.item;
		for (var i=0;i<z.length;i++) {
			if (z[i].itemClass=='CHART') charts.push(z[i]);
			// As far as page layout is concerned, page number blocks are no
			// different from charts, they're tags outside the SVG realm
			if (z[i].itemClass=='PAGENUM') charts.push(z[i]);			
			if (z[i].itemClass=='BCODE') charts.push(z[i]);			
		}

		var ppr= ZRU.Ruler.getPixelPointRatio();
		var w=Math.round(this.area.offsetWidth/ppr);
		var h=Math.round(this.area.offsetHeight/ppr);

		if (charts.length==0) { // simple case
			if (svgLen>0) {
				data.push('<fo:instream-foreign-object>');
				data.push('<svg:svg width="'+w+'pt" height="'+h+'pt" viewBox="0 0 '+w+' '+h+'" >');
				for (var i=0;i<svgLen;i++) {
					data.push(svgBody[i]);
				}
				data.push('</svg:svg>');		
				data.push('</fo:instream-foreign-object>');
			}
		}
		else { //  annoying case
			var stopObj = this.partitionRenderSpace(w,h,charts);
			var gridObj = this.createAbstractGrid(stopObj.hStop,stopObj.vStop);
			this.tagChartCells(gridObj,charts);
			this.consolidateCells(gridObj);
			this.renderFOTable(data,coda,gridObj,stopObj.hStop,stopObj.vStop,svgBody);
		}
		data.push('</fo:block>');
		data.push(']]>');
		data.push('</write>');
		if (this.breakDiv && this.breakSpot=="bottom:0px;") data.push("<pagebreak/>");
		data.push('<!-- end of '+this.watermark+' -->');
		if (this.subBanners) { // export any conditional sections within this grouping
			for (var i=0;i<this.subBanners.length;i++) {
				this.subBanners[i].editor.exportZRS(data,coda);
			}
		}
	}
	data.push('</group>');
}

//=========================

ZRU.BannerWorkspace=function(div) {
	ZLM.initializeObject(this,div,"ZRU.BannerWorkspace");
	this.body=null;
	this.sectionCount=div.getAttribute("sections");
	if (!this.sectionCount) this.sectionCount=1;
	this.createBody();
	this.setUnits(div.getAttribute("units"));
	this.setPageWidth(div.getAttribute("pageWidth"));
	this.initialized=1;
	return(this);
}

ZRU.BannerWorkspace.editMode=null;

ZRU.BannerWorkspace.create=function(pageWidth,units,sections) {
	var div=ZLM.makeElement("div",{'class':'zruBannerWorkspace'});
	if (pageWidth!=undefined) div.setAttribute("pageWidth",pageWidth);
	if (units!=undefined) div.setAttribute("units",units);
	if (sections!=undefined) div.setAttribute("sections",sections);
	return(new ZRU.BannerWorkspace(div));	
}

ZRU.BannerWorkspace.initialize=function() {
	var bi = ZLM.getElementsByClassPrefix("zruBannerWorkspace",document.body);
	for (var i=0;i<bi.length;i++) {
		if (bi[i].className=="zruBannerWorkspace") {
			if (!bi[i].controller) var o=new ZRU.BannerWorkspace(bi[i]);
		}
	}
}

ZRU.BannerWorkspace.prototype.createBody=function() {
	this.body=ZLM.makeElement("div",{style:'position:relative; top:0px; left:0px; width:100%; overflow:auto;'});
	this.base.appendChild(this.body);
	this.addMasterRuler();
	this.sep=ZLM.makeElement("div",{style:'position:relative;top:0px;left:0px;width:100%;height:0px;border-bottom:1px solid black;'});
	this.body.appendChild(this.sep);
	this.sec=[];
}


ZRU.BannerWorkspace.prototype.setBannerCaption=function(idx,msg) {
	var n=ZLM.simulateTag("div style='position:absolute; bottom:0px; font:16pt sans-serif; color:#e0e0f0; font-weight:bold; text-align:center; width:100%;'");
	n.appendChild(document.createTextNode(msg));
	this.sec[idx].area.appendChild(n);
//this.sec[idx].setMinHeight("14pt");
}

ZRU.BannerWorkspace.prototype.addMasterRuler=function() {	
	var h=ZRU.Ruler.create("0","1","1","in","8");
	var hbs=h.base.style;
	hbs.position="relative";
	hbs.top="0px";
	hbs.left="24px";
	hbs.background="#ffffcc";
	this.body.appendChild(h.base);
	this.hRuler=h;
}

ZRU.BannerWorkspace.prototype.addBanner=function(idx,prefix) {
	for (var i=this.sec.length;i>idx;i--) {
		this.sec[i]=this.sec[i-1];
	}
	var b=ZRU.ResizeBanner.create();
	b.prefixStr = prefix;
	this.sec[idx]=b;
	this.body.appendChild(b.base);
	var bbs=b.base.style;
	bbs.position="relative";
	bbs.left="0px";
	bbs.top="0px";
	bbs.width="100%";
	bbs.height="10px";

}

ZRU.BannerWorkspace.prototype.resetBanners=function() {
	if (!this.sec) return;
//for (var i=0; i<this.sec.length;i++) {
//	var b = this.sec[i];
//	this.body.removeChild(b.base);
//}
	var q = null;
	for (var p=this.body.firstChild;p!=null;p=q) {
		q = p.nextSibling;
		if (p.className && p.className=="resizeBanner") this.body.removeChild(p);
	}
	this.sec=[];
}

ZRU.BannerWorkspace.prototype.clearBanners=function() {
	if (!this.sec) return;
	for (var i=0; i<this.sec.length;i++) {
		if (this.sec[i].editor && this.sec[i].editor.clearZone) {
			this.sec[i].editor.clearZone();
		}
	}
}

ZRU.BannerWorkspace.prototype.hasRunningHeaders=function() {
	for (var i=0;i<this.sec.length;i++) {
		if (this.sec[i].editor.hasRunningHeader()) return(true);
	}
	return(false);	
}

ZRU.BannerWorkspace.prototype.getMaxRunningHeaderHeight = function() {
	var h=0;
	for (var i=0;i<this.sec.length;i++) {
		var ed = this.sec[i].editor;
		if (ed.getRunningHeaderHeight) {
			var tH = ed.getRunningHeaderHeight();
			if (tH>h) h=tH;
		}
	}
	return(h);
}
		
ZRU.BannerWorkspace.prototype.alignBanners=function() {
	var m=30;
	for (var i=0;i<this.sec.length;i++) {
		this.sec[i].base.style.top=m+"px";
		m+=this.sec[i].base.offsetHeight;
	}
}

ZRU.BannerWorkspace.prototype.setUnits=function(x) {
// Internally units should be either pt, mm, or px
	switch(x) {
		case "in": 
			this.pageUnits="in";
			this.units="pt";
			break;
		case "pt":
			this.pageUnits="in";
			this.units="pt";
			break;
		case "cm":
			this.pageUnits="cm";
			this.units="mm";
			break;
		case "mm":
			this.pageUnits="cm";
			this.units="mm";
			break;
		default:
			this.pageUnits=x;
			this.units="px";
	}
	this.hRuler.setUnits(this.pageUnits);
	this.rawUnits=x;
}

/// Set the page width based on current paper stock.
ZRU.BannerWorkspace.prototype.setPageWidth=function(x) {
	x = parseFloat(x);
	this.rawPageWidth=x;
	if (this.units!="px") this.pageWidth=ZRU.convertToPixels(x+this.rawUnits);
	else this.pageWidth=x;
	this.base.style.width=(25+this.pageWidth+26)+"px";
	var rulerMax = x;
	if (this.rawUnits=="pt") {
		if (this.hRuler.units=="M") { // need to convert to CM
			rulerMax = x/28.34645669;

		}
		else if (this.hRuler.units=="E") { // need to convert to Inches
			rulerMax = x/72;
		}
	}
	this.hRuler.setMaximum(rulerMax);
	this.hRuler.updateTicks();
	if (this.sec) {
		for (var i=0; i<this.sec.length;i++) {
			var e = this.sec[i].editor;
			if (e && e.setUnits) e.setUnits(this.pageUnits);
			if (e && e.setPageWidth) e.setPageWidth(rulerMax);
		}
	}	
}

ZRU.BannerWorkspace.prototype.setPageModel=function(obj) {
	if (obj) {
		this.pageSetup = obj;
		this.setUnits(obj.units); // obj.units comes from page stock and may be in, cm or mm
		var baseW = obj.width;
		var baseH = obj.height;
		if (obj.orient=="landscape") {
			baseW = obj.height;
			baseH = obj.width;
		}
		baseW = baseW - obj.left - obj.right;
		var pointWidth = baseW;
		if (obj.extentUnits) {
			this.rawUnits = obj.extentUnits;
		}
		else { // Old style need to compensate
			baseW = baseW/72;
		}
		this.setPageWidth(baseW);
		ZRU.getDisplayPropertyPanel().setBodySize(pointWidth,baseH);
	}
}

ZRU.BannerWorkspace.prototype.setEditMode=function(mode) {
	for (var i=0;i<this.sec.length;i++) {
		var e=this.sec[i].editor;
		if (e) e.setEditMode(mode);
	}
}

/// BANNER AUTOFILL SUBSYSTEM ///

/// Parse the various options available for a separating a header or footer from the 
/// document flow.
ZRU.BannerWorkspace.prototype.autoFillParseSeparator = function(sep) {
	var o = {
		box:false,
		line:false,
		page:false,
		spaceBefore:0,
		spaceAfter:0,
		breaking:0,
		none:false };
	if (!sep || sep=='none') return(o);
	var s = sep.split(',');
	for (var i=0;i<s.length;i++) {
		var opt = s[i];
		if (opt=="box") o.box = true;
		else if (opt=="line") o.line = true;
		else if (opt=="page") o.breaking = 1;
		else if (opt.indexOf('sa')==0) {
			var tmp = opt.split('sa');
			o.spaceAfter = parseInt(tmp[1]);
		}
		else if (opt.indexOf('sb')==0) {
			var tmp = opt.split('sb');
			o.spaceBefore = parseInt(tmp[1]);
		}
	}
	return(o);
}

/// Convert a camelCase sting to a pretty print one with initial cap and spaces
/// rather than a big jumble of mixed case in a single word.
ZRU.BannerWorkspace.prototype.autoFillCamelCaseToString=function(cc) {
	var l = cc.length;
	var s = [];
	for (var i=0;i<l;i++) {
		var ch = cc.charAt(i);
		if (i==0) s.push(ch.toUpperCase());
		else {
			if (ch.toUpperCase()==ch) s.push(" "+ch.toLowerCase());
			else s.push(ch);
		}
	}
	return(s.join(""));
}

/// Make a new GC object based on a template and get its new geometry
ZRU.BannerWorkspace.prototype.autoFillMakeGC = function(template,width,height,top,left) {
	var gc = ZLM.cloneJSObj(template);
	gc.zw = width;
	gc.zh = height;
	gc.zt = top;
	gc.zl = left;
	return(gc);
}

ZRU.BannerWorkspace.prototype.autoFillMakeDefaultTemplate=function() {
	var template = {
		// Where to put report attributes options are:
		// rH : report Header
		// pH(LCR) : page Header
		// rF : report Footer
		// pF(LCR) : page Footer
		// oI : omit Item (do not present)
		rptAttrDest:"rH,pHL,pFL",

		// Where to put the report name - like rptAttrDest
		rptNameDest:"rH,pHR,rF,pFR",

		// Where to place logo image (if specified) - like rptAttrDest
		// (Size and alignment set by logoStyle attribute)
		logoDest:"oI",

		// What logo to use (if any)
		logoURL:"",

		// Where to put non-group report items, options are:
		// rH : report Header
		// rF : report Footer
		// oI : omit Item
		rptItemDest:"rH,rF",

		// Where to put page numbers, options are
		// pHL : page Header left
		// pHC : page Header center
		// pHR : page Header right
		// pFL : page Footer left
		// pFC : page Footer center
		// pFR : page Footer right
		// oI : omit Item
		pgNumDest:"pHR,pFC",

		// Page number format
		pgNumFormat:"", // default 

		// Report Header separator, options are:
		//  box : draw a box around the header
		//  line: draw a line after the header
		//  page: insert a page break after the header
		//  sa{n}: space where {n} is the vertical gap in points
		//  none: no separation;
		rptHeadSep : "sb72,box,page",

		// Page header separator, options are:
		//  box : draw a box around the header
		//  line: draw a line after the header
		//  sa{n}: space after where {n} is the vertical gap in points
		//  none: no separation;
		pgHeadSep : "line,sa12",


		// Group header separator, options are:
		//  box : draw a box around the header
		//  line: draw a line after the header
		//  page: insert a page break before the header
		//  sa{n}: space where {n} is the vertical gap in points
		//  none: no separation;
		grpHeadSep : "sb24,line,sa12",

		// Group footer separator, options are:
		//  box : draw a box around the footer
		//  lb: draw a line before the footer
		//  la: draw a line after the footer
		//  page: insert a page break after the footer
		//  sa{n}: space after where {n} is the vertical gap in points
		//  none: no separation;
		grpFootSep : "sb24,line,page",

		// Page footer separator, options are:
		//  box : draw a box around the footer
		//  line: draw a line after the footer
		//  sb{n}: space before where {n} is the vertical gap in points
		//  none: no separation;
		pgFootSep : "line",

		// Report Footer separator, options are:
		//  box : draw a box around the footer
		//  line: draw a line before the footer
		//  page: insert a page break before the footer
		//  sb{n}: space before where {n} is the vertical gap in points
		//  none: no separation;
		rptFootSep : "sb24,box",

		// Group banner controls
		// Zones are:
		//  hL: Header Left
		//  hC: Header Center
		//  hR: Header Right
		//  fL: Footer Left
		//  fC: Footer Center
		//  fR: Footer Right
		//  oI: Omit Item
		// Items to place are
		//  GroupField : The current value of the grouping field
		//  GroupCaption : The caption associated with the grouping field
		//  Count: Aggregate items whose name ends with the suffix 'Count'
		//  Ave: Aggregate items whose name starts with the prefix 'Ave'
		//  Sum: Aggregate items whose name starts with the prefix 'Sum'
		//  Min: Aggregate items whose name starts with the prefix 'Min'	
		//  Max: Aggregate items whose name starts with the prefix 'Max'
		//  MiscItem : Any aggretate item that does not match the criteria above

		grpFieldDest : "hC",
		grpCaptionDest : "oI",
		countDest : "hL,fL",
		aveDest : "fL",
		sumDest : "fL",
		minDest : "fL",
		maxDest : "fL",
		miscItemDest : "hR,fR",

		// STYLE Templates
		// SECTION SEPARATORS
		rptHeaderSepItem : {sa:1,sc:"#000000",so:1,sw:"2",ss:"solid",fa:1,fc:"#ffffff",fo:1,xa:0,ta:0,za:1},
		pgHeaderSepItem : {sa:1,sc:"#000000",so:1,sw:"2",ss:"solid",fa:1,fc:"#ffffff",fo:1,xa:0,ta:0,za:1},
		grpHeaderSepItem : {sa:1,sc:"#000000",so:1,sw:"2",ss:"solid",fa:1,fc:"#ffffff",fo:1,xa:0,ta:0,za:1},
		grpFooterSepItem : {sa:1,sc:"#000000",so:1,sw:"2",ss:"solid",fa:1,fc:"#ffffff",fo:1,xa:0,ta:0,za:1},
		pgFooterSepItem : {sa:1,sc:"#000000",so:1,sw:"2",ss:"solid",fa:1,fc:"#ffffff",fo:1,xa:0,ta:0,za:1},
		rptFooterSepItem : {sa:1,sc:"#000000",so:1,sw:"2",ss:"solid",fa:1,fc:"#ffffff",fo:1,xa:0,ta:0,za:1},


		LogoStyle : {sa:1,sc:"#000000",so:1,sw:"2",ss:"solid",fa:1,fc:"#ffffff",fo:1,xa:0,ta:0,za:1},

		rptNameTxt : {sa:0,fa:0,xa:1,xc:"#000000",xo:1,xb:true,xi:false,xu:false,xs:36,xj:"left",xf:"sans-serif",ta:0,za:1},
		rptHeaderValueTxt : {sa:0,fa:0,xa:1,xc:"#000000",xo:1,xb:true,xi:false,xu:false,xs:14,xj:"left",xf:"sans-serif",ta:0,za:1},
		rptHeaderCaptionTxt : {sa:0,fa:0,xa:1,xc:"#000000",xo:1,xb:true,xi:false,xu:false,xs:14,xj:"left",xf:"sans-serif",ta:0,za:1},
		pgHeaderTitleTxt : {sa:0,fa:0,xa:1,xc:"#000000",xo:1,xb:true,xi:false,xu:false,xs:22,xj:"left",xf:"sans-serif",ta:0,za:1},
		pgHeaderValueTxt : {sa:0,fa:0,xa:1,xc:"#000000",xo:1,xb:true,xi:false,xu:false,xs:10,xj:"left",xf:"sans-serif",ta:0,za:1},
		pgHeaderCaptionTxt : {sa:0,fa:0,xa:1,xc:"#000000",xo:1,xb:true,xi:false,xu:false,xs:10,xj:"left",xf:"sans-serif",ta:0,za:1},
		grpHeaderTitleTxt : {sa:0,fa:0,xa:1,xc:"#000000",xo:1,xb:true,xi:false,xu:false,xs:18,xj:"left",xf:"sans-serif",ta:0,za:1},
		grpHeaderValueTxt : {sa:0,fa:0,xa:1,xc:"#000000",xo:1,xb:true,xi:false,xu:false,xs:12,xj:"left",xf:"sans-serif",ta:0,za:1},
		grpHeaderCaptionTxt : {sa:0,fa:0,xa:1,xc:"#000000",xo:1,xb:true,xi:false,xu:false,xs:12,xj:"left",xf:"sans-serif",ta:0,za:1},


		tableHeaderTxt : {sa:1,sc:"#000000",so:1,sw:1,ss:"solid",fa:1,fc:"#d3d3d3",fo:1,xa:1,xc:"#000000",xo:1,xb:true,xi:false,xu:false,xs:12,xj:"left",xf:"sans-serif",ta:1,tb:false,thb:false,thbd:true,thcd:false,tbcd:false,tbrd:false,tzs:true,tzc:"#e9e9e9",za:1,zh:19},
		tableBodyTxt : {sa:1,sc:"#000000",so:1,sw:1,ss:"solid",fa:1,fc:"#ffffff",fo:0,xa:1,xc:"#000000",xo:1,xb:false,xi:false,xu:false,xs:10,xj:"left",xf:"sans-serif",ta:1,tb:false,thb:false,thbd:true,thcd:false,tbcd:false,tbrd:false,tzs:true,tzc:"#e9e9e9",za:1,zh:19},

		grpFooterTitleTxt : {sa:0,fa:0,xa:1,xc:"#000000",xo:1,xb:true,xi:false,xu:false,xs:14,xj:"left",xf:"sans-serif",ta:0,za:1},
		grpFooterValueTxt : {sa:0,fa:0,xa:1,xc:"#000000",xo:1,xb:true,xi:false,xu:false,xs:12,xj:"left",xf:"sans-serif",ta:0,za:1},
		grpFooterCaptionTxt : {sa:0,fa:0,xa:1,xc:"#000000",xo:1,xb:true,xi:false,xu:false,xs:12,xj:"left",xf:"sans-serif",ta:0,za:1},
		pgFooterTitleTxt : {sa:0,fa:0,xa:1,xc:"#000000",xo:1,xb:true,xi:false,xu:false,xs:10,xj:"left",xf:"sans-serif",ta:0,za:1},
		pgFooterValueTxt : {sa:0,fa:0,xa:1,xc:"#000000",xo:1,xb:true,xi:false,xu:false,xs:10,xj:"left",xf:"sans-serif",ta:0,za:1},
		pgFooterCaptionTxt : {sa:0,fa:0,xa:1,xc:"#000000",xo:1,xb:true,xi:false,xu:false,xs:10,xj:"left",xf:"sans-serif",ta:0,za:1},
		rptFooterTitleTxt : {sa:0,fa:0,xa:1,xc:"#000000",xo:1,xb:true,xi:false,xu:false,xs:16,xj:"left",xf:"sans-serif",ta:0,za:1},
		rptFooterValueTxt : {sa:0,fa:0,xa:1,xc:"#000000",xo:1,xb:true,xi:false,xu:false,xs:14,xj:"left",xf:"sans-serif",ta:0,za:1},
		rptFooterCaptionTxt : {sa:0,fa:0,xa:1,xc:"#000000",xo:1,xb:true,xi:false,xu:false,xs:14,xj:"left",xf:"sans-serif",ta:0,za:1},
		pgNumber : {sa:0,fa:0,xa:1,xc:"#000000",xo:1,xb:true,xi:false,xu:false,xs:14,xj:"left",xf:"sans-serif",ta:0,za:1},
	};
	return(template);
}

ZRU.BannerWorkspace.prototype.autoFill=function(rptName) {
	if (!this._lastDSS) {
		alert('DSS not properly initialized');
		return;
	}
	this.clearBanners();
	var dss = this._lastDSS;
	var rAttr = dss.attr; 	// Report attributes (could go to report/page headers or footers)
	var aLen = 0;
	if (rAttr && rAttr.length) aLen = rAttr.length;

	var rItems = []; // Report items; Actual items could go to report header or footer
	var rGroups = []; // Report level groups get their own banners
					// Groups map to banner sections
	for (var idx=0;idx<dss.item.length;idx++) {
		var n = dss.item[idx]; 
		if (n.nodeType=='item') rItems.push(n);
		else rGroups.push(n);
	}

	var iLen = rItems.length;
	var gLen = rGroups.length;


	var template = this.autoFillMakeDefaultTemplate();
	var src = [];
	src.push('[');

	this.autoFillRptHeader(src,template,rptName,rAttr,aLen,rItems,iLen);
	this.autoFillPageHeader(src,template,rptName,rAttr,aLen);
	for (var i=0;i<gLen;i++) {
		this.autoFillGroups(src,template,rGroups[i]);
	}
	this.autoFillRptFooter(src,template,rptName,rAttr,aLen,rItems,iLen);
	this.autoFillPageFooter(src,template,rptName,rAttr,aLen);

	src.push(']');
	
	var s = ZLM.jsonParse(src.join('\n'),1);
	var sl = s.length;
	if (sl!=this.sec.length) {
		alert("Invalid geometries in restore. \nExpected "+this.sec.length+" sections but got "+sl);
		return(false);
	}
	for (var i=0;i<sl;i++) {
		if (!this.sec[i].editor.restoreObj(s[i])) {
			var restoreFailed = true;
			// Restore may have failed because the wrong default body edit was
			// installed by default, try forcing a new editor to match
			var groupName = this.sec[i].editor.groupName;
			var watermark = this.sec[i].watermark;
			var dropScope = this.sec[i].dropScope;
			if (s[i].t=="b") {
				this.removeBannerEditor(i);
				this.embedBodyEditor(i,watermark,dropScope,1,null);
				this.sec[i].editor.setGroupName(groupName);
				if (this.sec[i].editor.restoreObj(s[i])) restoreFailed = false;
			}
			else if (s[i].t=="t") {
				this.removeBannerEditor(i);
				this.embedTableEditor(i,watermark,dropScope,null);
				this.sec[i].editor.setGroupName(groupName);
				if (this.sec[i].editor.restoreObj(s[i])) restoreFailed = false;
			}
			else if (s[i].t=="n") {
				this.removeBannerEditor(i);
				this.embedNVPEditor(i,watermark,dropScope,null);
				this.sec[i].editor.setGroupName(groupName);
				if (this.sec[i].editor.restoreObj(s[i])) restoreFailed = false;
			}
			if (restoreFailed) {
				alert("Attempted restore of section "+i+" failed");
				return(false);
			}
			ZLM.initDataDragDrop();
		}
	}
	return(true);
}

ZRU.BannerWorkspace.prototype.autoFillRptHeader = function(src,t,rptName,rAttr,aLen,rItems,iLen) {
	//Build report header
	// Things that _could_ be in the header include: name, logo, report attributes, report items
	var toPlace = {};
	if (t.rptNameDest.indexOf("rH")>=0) toPlace.name=true;
	if (t.rptAttrDest.indexOf("rH")>=0) toPlace.attr=true;
	if (t.rptItemDest.indexOf("rH")>=0) toPlace.item=true;
	if (t.logoURL && t.logoURL.length>0 && t.rptItemDest.indexOf("rH")>=0) toPlace.logo=true;
	if (toPlace!=={}) {  // Uses report header
		var sepH = parseInt(t.rptHeaderSepItem.sw,10);
		var valueH = t.rptHeaderValueTxt.xs;
		var captionH = t.rptHeaderCaptionTxt.xs;
		var nameH = Math.ceil(t.rptNameTxt.xs*1.2);
		var lineH = Math.ceil(Math.max(valueH,captionH)*1.1);
		var w = ZRU.convertToPoints(this.pageWidth);
		var h = 0;
		var midPt = w/2;

		if (toPlace.name) h+= nameH // Size of name
		if (toPlace.attr) h += aLen*lineH;
		if (toPlace.item) h += iLen*lineH;
		var sep = this.autoFillParseSeparator(t.rptHeadSep);
		if (sep.box) h+=2*sepH;
		else if (sep.line) h+=sepH;
		h+=sep.spaceAfter;
		h+=sep.spaceBefore;
		src.push('{t:"h",g:"_r",a:true,h:"'+h+'pt",w:"'+w+'pt",b:'+sep.breaking+',');
		src.push('\ti:[');
		// If it's a box, block out the area 
		if (sep.box) {
			var gc = this.autoFillMakeGC(t.rptHeaderSepItem,w-sepH,h-sepH-sep.spaceBefore,sepH/2+sep.spaceBefore,sepH/2);
			src.push('\t\t{t:"box",gc:'+ZLM.jsonEncode(gc,1)+',c:"BOX",url:null,durl:null},');
		}
		var base = sep.spaceBefore;
		if (sep.box) base+=sepH;
		// Name
		if (toPlace.name) {
			var gc = this.autoFillMakeGC(t.rptNameTxt,w,nameH,base,0);
			gc.xj = "center";
			base+=nameH;
			src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+',c:"CAPN",f:"!'+rptName+'",fn:""}');
		}
		// Attributes
		if (toPlace.attr) {
			if (toPlace.name) src.push(',');
			for (var i=0;i<aLen;i++) {
				if (i>0) src.push(',');
				// Need to output both caption and value
				var n = rAttr[i].nodeName;
				var gc = this.autoFillMakeGC(t.rptHeaderValueTxt,midPt-12,lineH,base,midPt+12);

				gc.xj = "left";
				src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"ATTR",f:"@'+n+'",fn:""},');
				var gc = this.autoFillMakeGC(t.rptHeaderCaptionTxt,midPt-12,lineH,base,0);
				gc.xj = "right";
				src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"CAPN",f:"!'+this.autoFillCamelCaseToString(n)+':",fn:""}');
				base += lineH;
			}
		}
		// Items
		if (toPlace.item) {
			if (toPlace.name || toPlace.attr) src.push(',');
			for (var i=0;i<iLen;i++) {
				if (i>0) src.push(',');
				// Need to output both caption and value
				var n = rItems[i].nodeName;
				var gc = this.autoFillMakeGC(t.rptHeaderValueTxt,midPt-12,lineH,base,midPt+12);
				gc.xj = "left";
				src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"ELEM",f:"'+n+'",fn:""},');

				var gc = this.autoFillMakeGC(t.rptHeaderCaptionTxt,midPt-12,lineH,base,0);
				gc.xj = "right";
				src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"CAPN",f:"!'+this.autoFillCamelCaseToString(n)+':",fn:""}');
				base += lineH;
			}
		}
		if (sep.line) {
			src.push(",");
			var gc = this.autoFillMakeGC(t.rptHeaderSepItem,w-sepH,0,base+sepH/2,0);		
			src.push('\t\t{t:"line",gc:'+ZLM.jsonEncode(gc,1)+'}');
			base += 2*sepH;
		}
		src.push('\t]');
		src.push('},');
	}
	else {
		src.push('{t:"h",g:"_r",a:false},');
	}
}

ZRU.BannerWorkspace.prototype.autoFillPageHeader = function(src,t,rptName,rAttr,aLen) {
//TODO address page number and placement
	// The page header has three major zones pHL, pHC, and pHR
	// Elements may be placed individually by classification.
	// In particular:
	//  The reportName 
	//  The page number 
	//  Report attributes
	var zLeft = [];
	var zCenter = [];
	var zRight = [];
	if (t.rptNameDest.indexOf("pHL")>=0) zLeft.push({nodeName:rptName,nodeType:"title"});
	if (t.rptNameDest.indexOf("pHC")>=0) zCenter.push({nodeName:rptName,nodeType:"title"});
	if (t.rptNameDest.indexOf("pHR")>=0) zRight.push({nodeName:rptName,nodeType:"title"});
	for (var i=0;i<aLen;i++) {
		var n = rAttr[i];
		var name = n.nodeName;
		if (t.rptAttrDest.indexOf('pHL')>=0) zLeft.push(n);
		if (t.rptAttrDest.indexOf('pHC')>=0) zCenter.push(n);
		if (t.rptAttrDest.indexOf('pHR')>=0) zRight.push(n);	
	}
	var lLen = zLeft.length;
	var rLen = zRight.length;
	var cLen = zCenter.length;
	if ((lLen+rLen+cLen)==0) {  // Nothing slated to print in this section
		src.push('{t:"h",g:"_p",a:false},');
		return;
	}
	// ELSE we need to lay out the banner
	var sep = this.autoFillParseSeparator(t.pgHeadSep);
	var sepH = parseInt(t.pgHeaderSepItem.sw,10);

	var titleH = t.pgHeaderTitleTxt.xs*1.2;
	var valueH = t.pgHeaderValueTxt.xs;
	var captionH = t.pgHeaderCaptionTxt.xs;
	var lineH = Math.ceil(Math.max(valueH,captionH)*1.1);

	var w = ZRU.convertToPoints(this.pageWidth);
	var leftEnd = 0;
	var rightEnd = w;

	// The banner height is a function of the contents  a page header should grow from the
	// separator upward (alignment wise) and footers should grow downward toward the edge of the page
	var leftHeight = lLen*lineH;
	if (lLen>0 && zLeft[0].nodeType=="title") leftHeight += (titleH-lineH); // account for potentially different sized text
	var rightHeight = rLen*lineH;
	if (rLen>0 && zRight[0].nodeType=="title") rightHeight += (titleH-lineH); // account for potentially different sized text
	var centerHeight = cLen*lineH;
	if (cLen>0 && zCenter[0].nodeType=="title") centerHeight += (titleH-lineH); // account for potentially different sized text

	var txtHeight = Math.max(leftHeight,rightHeight);
	var topOffset = sep.spaceBefore;
	txtHeight = Math.max(txtHeight,centerHeight);
	var h = txtHeight+topOffset;;
	if (sep.box) {
		h+=2*sepH+2;
		topOffset+=sepH;
		leftEnd = sepH+2;
		rightEnd = w-sepH-2;
	}
	else if (sep.line) h+=sepH;
	h+=sep.spaceAfter;

	var midPt = w/2;
	var leftPt = w/3;
	var leftMid = w/6;
	var rightPt = 2*w/3;
	var rightMid = rightPt+leftMid;

	var firstItem = true;
	
	src.push('{t:"h",g:"_p",a:true,h:"'+h+'pt",w:"'+w+'pt",b:0,');
	src.push('\ti:[');
	if (sep.box) {
		var gc = this.autoFillMakeGC(t.pgHeaderSepItem,w-sepH,h-sepH-sep.spaceBefore,sepH/2+sep.spaceBefore,sepH/2);
		src.push('\t\t{t:"box",gc:'+ZLM.jsonEncode(gc,1)+',c:"BOX",url:null,durl:null}');
		firstItem = false;
	}
	if (sep.box) base+=sepH+2;

	// Start left zone processing
	var maxLen = 0;
	for (var i=0;i<lLen;i++) {
		var cL = zLeft[i].nodeName.length;
		if (cL>maxLen) maxLen=cL;
	}
	var leftTab = cL*captionH+leftEnd;
	if (leftTab>leftMid) leftTab = leftMid;

	var base = topOffset+txtHeight; // Counts UP from end of txtArea
	for (var i=0;i<lLen;i++) {
		if (!firstItem) src.push(',');
		firstItem = false;
		var cn = zLeft[i].nodeName;
		if (i==0 && zLeft[i].nodeType=="title") {
			var gc = this.autoFillMakeGC(t.pgHeaderTitleTxt,leftPt-leftEnd,titleH,topOffset,leftEnd);
			gc.xj = "left";
			src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"CAPN",f:!"'+cn+'",fn:""}');
		}	
		else {
			base -= lineH;
			// Need to output both caption and value
			var gc = this.autoFillMakeGC(t.pgHeaderValueTxt,leftPt-leftTab,lineH,base,leftTab);
			gc.xj = "left";
			src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"ATTR",f:"@'+cn+'",fn:""},');

			var gc = this.autoFillMakeGC(t.pgHeaderCaptionTxt,leftTab,lineH,base,leftEnd);
			gc.xj = "left";
			src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"CAPN",f:"!'+this.autoFillCamelCaseToString(cn)+':",fn:""}');
		}
	}

	// Start center zone processing
	var base = topOffset+txtHeight; // Counts UP from end of txtArea
	for (var i=0;i<cLen;i++) {
		if (!firstItem) src.push(',');
		firstItem = false;
		var cn = zCenter[i].nodeName;
		if (i==0 && zCenter[i].nodeType=="title") {
			var gc = this.autoFillMakeGC(t.pgHeaderTitleTxt,rightPt-leftPt,titleH,topOffset,leftPt);
			gc.xj = "center";
			src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"CAPN",f:!"'+cn+'",fn:""}');
		}	
		else {
			base -= lineH;
			var gc = this.autoFillMakeGC(t.pgHeaderValueTxt,rightPt-midPt-6,lineH,base,midPt+6);
			gc.xj = "right";
			src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"ATTR",f:"@'+cn+'",fn:""},');

			var gc = this.autoFillMakeGC(t.pgHeaderCaptionTxt,midPt-6-leftPt,lineH,base,leftPt);
			gc.xj = "left";
			src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"CAPN",f:"!'+this.autoFillCamelCaseToString(cn)+':",fn:""}');
		}
	}

	// Start right zone processing
	var maxLen = 0;
	for (var i=0;i<rLen;i++) {
		var cL = zRight[i].nodeName.length;
		if (cL>maxLen) maxLen=cL;
	}
	var rightTab = cL*captionH+rightPt;
	if (rightTab>rightMid) rightTab = rightMid;

	var base = topOffset+txtHeight; // Counts UP from end of txtArea
	for (var i=0;i<rLen;i++) {
		if (!firstItem) src.push(',');
		firstItem = false;
		var cn = zRight[i].nodeName;
		if (i==0 && zRight[i].nodeType=="title") {
			var gc = this.autoFillMakeGC(t.pgHeaderTitleTxt,rightEnd-rightPt,titleH,topOffset,rightPt);
			gc.xj = "right";
			src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"CAPN",f:"!'+cn+'",fn:""}');
		}	
		else {
			base -= lineH;
			var gc = this.autoFillMakeGC(t.pgHeaderValueTxt,rightEnd-rightTab,lineH,base,rightTab);
			gc.xj = "right";
			src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"ATTR",f:"@'+cn+'",fn:""},');

			var gc = this.autoFillMakeGC(t.pgHeaderCaptionTxt,rightTab-rightPt,lineH,base,rightPt);
			gc.xj = "right";
			src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"CAPN",f:"!'+this.autoFillCamelCaseToString(cn)+':",fn:""}');
		}
	}

	if (sep.line) {
		src.push(",");
		var gc = this.autoFillMakeGC(t.pgHeaderSepItem,w-sepH,0,h-sepH/2-sep.spaceAfter,0);		
		src.push('\t\t{t:"line",gc:'+ZLM.jsonEncode(gc,1)+'}');
	}
	src.push('\t]');
	src.push('},');
}

ZRU.BannerWorkspace.prototype.autoFillGroupHeader = function(src,t,gName,gAttr,aLen,gItems,iLen) {
	// The group header has three major zones hL, hC, and hR
	// Most of the placement here falls under the Misc category but some elements may be
	// placed individually.
	// In particular:
	//  The grouping field (if detectable should be only attribute of group)
	//  The group caption (caption associated with grouping field (if found)
	//  Items suffixed by 'Count'
	//  Items prefixed by 'Ave','Sum','Min','Max'
	var zLeft = [];
	var zCenter = [];
	var zRight = [];
	var hasGroupField = (aLen==1);
	var showGroupField = false;
	var showGroupCaption = false;
	if (hasGroupField) {
		if (t.grpFieldDest.indexOf("hL")>=0) {
			showGroupField = true;
			zLeft.push(gAttr[0]);
		}	
		if (t.grpFieldDest.indexOf("hC")>=0) {
			showGroupField = true;
			zCenter.push(gAttr[0]);
		}	
		if (t.grpFieldDest.indexOf("hR")>=0) {
			showGroupField = true;
			zRight.push(gAttr[0]);
		}	
		if (t.grpCaptionDest.indexOf("hL")>=0) {
			showGroupCaption = true;
		}	
		if (t.grpCaptionDest.indexOf("hC")>=0) {
			showGroupCaption = true;
		}	
		if (t.grpCaptionDest.indexOf("hR")>=0) {
			showGroupCaption = true;
		}	
	}
//TODO address the question of multiple attributes
	for (var i=0;i<iLen;i++) {
		var n = gItems[i];
		var name = n.nodeName;
		var ave = (name.indexOf("Ave")==0);
		var sum = (name.indexOf("Sum")==0);
		var min = (name.indexOf("Min")==0);
		var max = (name.indexOf("Max")==0);
		var count = (name.indexOf("Count")==name.length-5);
		if (ave) {
			if (t.aveDest.indexOf('hL')>=0) zLeft.push(n);
			if (t.aveDest.indexOf('hC')>=0) zCenter.push(n);
			if (t.aveDest.indexOf('hR')>=0) zRight.push(n);	
		}
		else if (sum) {
			if (t.sumDest.indexOf('hL')>=0) zLeft.push(n);
			if (t.sumDest.indexOf('hC')>=0) zCenter.push(n);
			if (t.sumDest.indexOf('hR')>=0) zRight.push(n);	
		}
		else if (min) {
			if (t.minDest.indexOf('hL')>=0) zLeft.push(n);
			if (t.minDest.indexOf('hC')>=0) zCenter.push(n);
			if (t.minDest.indexOf('hR')>=0) zRight.push(n);	
		}
		else if (max) {
			if (t.maxDest.indexOf('hL')>=0) zLeft.push(n);
			if (t.maxDest.indexOf('hC')>=0) zCenter.push(n);
			if (t.maxDest.indexOf('hR')>=0) zRight.push(n);	
		}
		else if (count) {
			if (t.countDest.indexOf('hL')>=0) zLeft.push(n);
			if (t.countDest.indexOf('hC')>=0) zCenter.push(n);
			if (t.countDest.indexOf('hR')>=0) zRight.push(n);	
		}
		else {
			if (t.miscItemDest.indexOf('hL')>=0) zLeft.push(n);
			if (t.miscItemDest.indexOf('hC')>=0) zCenter.push(n);
			if (t.miscItemDest.indexOf('hR')>=0) zRight.push(n);	
		}
	}
	var lLen = zLeft.length;
	var rLen = zRight.length;
	var cLen = zCenter.length;
	if ((lLen+rLen+cLen)==0) {  // Nothing slated to print in this section
		src.push('{t:"h",g:"'+gName+'",a:false},');
		return;
	}
	// ELSE we need to lay out the banner
	var sep = this.autoFillParseSeparator(t.grpHeadSep);
	var sepH = parseInt(t.rptHeaderSepItem.sw,10);

	var titleH = 0;
	if (showGroupField) titleH = t.grpHeaderTitleTxt.xs*1.2;

	var valueH = t.grpHeaderValueTxt.xs;
	var captionH = t.grpHeaderCaptionTxt.xs;
	var lineH = Math.ceil(Math.max(valueH,captionH)*1.1);

	var w = ZRU.convertToPoints(this.pageWidth);
	var leftEnd = 0;
	var rightEnd = w;

	var lineCount = Math.max(lLen,rLen);
	lineCount = Math.max(lineCount,cLen);
	var h = lineCount*lineH;
	if (showGroupField) h+= titleH;
	if (sep.box) {
		h+=2*sepH+2;
		leftEnd = sepH+2;
		rightEnd = w-sepH-2;
	}
	else if (sep.line) h+=sepH;
	h+=sep.spaceAfter;
	h+=sep.spaceBefore;

	var midPt = w/2;
	var leftPt = w/3;
	var leftMid = w/6;
	var rightPt = 2*w/3;
	var rightMid = rightPt+leftMid;

	var firstItem = true;
	
	src.push('{t:"h",g:"'+gName+'",a:true,h:"'+h+'pt",w:"'+w+'pt",b:0,');
	src.push('\ti:[');
	if (sep.box) {
		var gc = this.autoFillMakeGC(t.grpHeaderSepItem,w-sepH,h-sepH-sep.spaceBefore,sepH/2+sep.spaceBefore,sepH/2);
		src.push('\t\t{t:"box",gc:'+ZLM.jsonEncode(gc,1)+',c:"BOX",url:null,durl:null}');
		firstItem = false;
	}
	if (sep.box) base+=sepH+2;

	// Start left zone processing
	var maxLen = 0;
	for (var i=0;i<lLen;i++) {
		var cL = zLeft[i].nodeName.length;
		if (cL>maxLen) maxLen=cL;
	}
	var leftTab = cL*captionH+leftEnd;
	if (leftTab>leftMid) leftTab = leftMid;

	var base = sep.spaceBefore;
	for (var i=0;i<lLen;i++) {
		if (!firstItem) src.push(',');
		firstItem = false;
		var cn = zLeft[i].nodeName;
		var fn = cn;
		if (zLeft[i].nodeType!="item") fn = "@"+cn;
		var skip = false;
		if (showGroupField && i==0) {			
			if (zLeft[i]==gAttr[0]) {
				skip=true;
				var titleM = leftEnd;
				if (showGroupCaption) {
					titleM = leftTab;
					var gc = this.autoFillMakeGC(t.grpHeaderTitleTxt,titleM,titleH,base,leftEnd);
					gc.xj = "left";
					src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"CAPN",f:"!'+this.autoFillCamelCaseToString(cn)+':",fn:""},');
				}
				var gc = this.autoFillMakeGC(t.grpHeaderTitleTxt,leftPt-titleM,titleH,base,titleM);
				gc.xj = "left";
				src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"ATTR",f:"'+fn+'",fn:""}');
			}
			base+= titleH;
		}	
		if (!skip) {
			// Need to output both caption and value
			var gc = this.autoFillMakeGC(t.grpHeaderValueTxt,leftPt-leftTab,lineH,base,leftTab);
			gc.xj = "left";
			src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"ELEM",f:"'+fn+'",fn:""},');

			var gc = this.autoFillMakeGC(t.grpHeaderCaptionTxt,leftTab,lineH,base,leftEnd);
			gc.xj = "left";
			src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"CAPN",f:"!'+this.autoFillCamelCaseToString(cn)+':",fn:""}');
			base += lineH;
		}
	}

	// Start center zone processing
	var base = sep.spaceBefore;
	for (var i=0;i<cLen;i++) {
		if (!firstItem) src.push(',');
		firstItem = false;
		var cn = zCenter[i].nodeName;
		var fn = cn;
		if (zCenter[i].nodeType!="item") fn = "@"+cn;
		var skip = false;
		if (showGroupField && i==0) {
			if (zCenter[i]==gAttr[0]) {
				skip = true;
				var titleM = leftPt;
				if (showGroupCaption) {
					titleM = midPt+6;
					var gc = this.autoFillMakeGC(t.grpHeaderTitleTxt,midPt-leftPt-6,titleH,base,midPt-6);
					gc.xj = "right";
					src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"CAPN",f:"!'+this.autoFillCamelCaseToString(cn)+':",fn:""},');
				}
				var gc = this.autoFillMakeGC(t.grpHeaderTitleTxt,rightPt-titleM,titleH,base,titleM);
				if (showGroupCaption) gc.xj = "left";
				else gc.xj = "center";
				src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"ATTR",f:"'+fn+'",fn:""}');
			}
			base+= titleH;
		}	
		if (!skip) {
			// Need to output both caption and value
			var gc = this.autoFillMakeGC(t.grpHeaderValueTxt,rightPt-midPt-6,lineH,base,midPt+6);
			gc.xj = "right";
			src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"ELEM",f:"'+fn+'",fn:""},');

			var gc = this.autoFillMakeGC(t.grpHeaderCaptionTxt,midPt-6-leftPt,lineH,base,leftPt);
			gc.xj = "left";
			src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"CAPN",f:"!'+this.autoFillCamelCaseToString(cn)+':",fn:""}');
			base += lineH;
		}
	}

	// Start right zone processing
	var maxLen = 0;
	for (var i=0;i<rLen;i++) {
		var cL = zRight[i].nodeName.length;
		if (cL>maxLen) maxLen=cL;
	}
	var rightTab = cL*captionH+rightPt;
	if (rightTab>rightMid) rightTab = rightMid;

	var base = sep.spaceBefore;
	for (var i=0;i<rLen;i++) {
		if (!firstItem) src.push(',');
		firstItem = false;
		var cn = zRight[i].nodeName;
		var fn = cn;
		if (zRight[i].nodeType!="item") fn = "@"+cn;
		var skip=false;
		if (showGroupField && i==0) {
			if (zRight[i]==gAttr[0]) {
				skip=true;
				var titleM = rightEnd;
				if (showGroupCaption) {
					titleM = rightTab;
					var gc = this.autoFillMakeGC(t.grpHeaderTitleTxt,rightEnd-titleM,titleH,base,rightEnd);
					gc.xj = "right";
					src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"CAPN",f:"!'+this.autoFillCamelCaseToString(cn)+':",fn:""},');
				}
				var gc = this.autoFillMakeGC(t.grpHeaderTitleTxt,titleM-rightPt,titleH,base,titleM);
				gc.xj = "right";
				src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"ATTR",f:"'+fn+'",fn:""}');
			}
			base+= titleH;
		}	
		if (!skip) {
			// Need to output both caption and value
			var gc = this.autoFillMakeGC(t.grpHeaderValueTxt,rightEnd-rightTab,lineH,base,rightTab);
			gc.xj = "right";
			src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"ELEM",f:"'+fn+'",fn:""},');

			var gc = this.autoFillMakeGC(t.grpHeaderCaptionTxt,rightTab-rightPt,lineH,base,rightPt);
			gc.xj = "right";
			src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"CAPN",f:"!'+this.autoFillCamelCaseToString(cn)+':",fn:""}');
			base += lineH;
		}
	}
	if (sep.line) {
		src.push(",");
		var gc = this.autoFillMakeGC(t.grpHeaderSepItem,w-sepH,0,h-sepH/2-sep.spaceAfter,0);		
		src.push('\t\t{t:"line",gc:'+ZLM.jsonEncode(gc,1)+'}');
		base += 2*sepH;
	}
	src.push('\t]');
	src.push('},');
}

/// By default the table isn't pretty, just divide all available space into equal columns
/// and list all the attributes followed by all the items
ZRU.BannerWorkspace.prototype.autoFillGroupBody = function(src,t,gName,gAttr,aLen,gItems,iLen) {
	var numC = aLen+iLen;
	if (numC>0) {
		var w = ZRU.convertToPoints(this.pageWidth);
		var h = 0;
		var colW = w/numC;
		var headH = t.tableHeaderTxt.zh;
		var margin = 0;
		src.push('{t:"t",g:"'+gName+'",a:true,l:0,w:"'+w+'pt",i:[');
		for (var i=0;i<aLen;i++) {
			if (margin>0) src.push(',');
			var n=gAttr[i];
			var gcH = this.autoFillMakeGC(t.tableHeaderTxt,colW,headH,0,margin);
			var gcB = this.autoFillMakeGC(t.tableBodyTxt,colW,2*headH,headH,margin);
			margin += colW;
			src.push('\t\t{t:"c",gcH:'+ZLM.jsonEncode(gcH,1)+',f:"@'+n.nodeName+'",gcB:'+ZLM.jsonEncode(gcB,1)+',c:"'+this.autoFillCamelCaseToString(n.nodeName)+'"}');
		}
		for (var i=0;i<iLen;i++) {
			if (margin>0) src.push(',');
			var n=gItems[i];
			var gcH = this.autoFillMakeGC(t.tableHeaderTxt,colW,headH,0,margin);
			var gcB = this.autoFillMakeGC(t.tableBodyTxt,colW,2*headH,headH,margin);
			margin += colW;
			src.push('\t\t{t:"c",gcH:'+ZLM.jsonEncode(gcH,1)+',f:"'+n.nodeName+'",gcB:'+ZLM.jsonEncode(gcB,1)+',c:"'+this.autoFillCamelCaseToString(n.nodeName)+'"}');
		}
		src.push(']},');
	}
	else {
		src.push('{t:"t",g:"'+gName+'",a:false},');
	}
}

ZRU.BannerWorkspace.prototype.autoFillGroupFooter = function(src,t,gName,gAttr,aLen,gItems,iLen) {
	// The group footer has three major zones fL, fC, and fR
	// Most of the placement here falls under the Misc category but some elements may be
	// placed individually.
	// In particular:
	//  The grouping field (if detectable should be only attribute of group)
	//  The group caption (caption associated with grouping field (if found)
	//  Items suffixed by 'Count'
	//  Items prefixed by 'Ave','Sum','Min','Max'
	var zLeft = [];
	var zCenter = [];
	var zRight = [];
	var hasGroupField = (aLen==1);
	var showGroupField = false;
	var showGroupCaption = false;
	if (hasGroupField) {
		if (t.grpFieldDest.indexOf("fL")>=0) {
			showGroupField = true;
			zLeft.push(gAttr[0]);
		}	
		if (t.grpFieldDest.indexOf("fC")>=0) {
			showGroupField = true;
			zCenter.push(gAttr[0]);
		}	
		if (t.grpFieldDest.indexOf("fR")>=0) {
			showGroupField = true;
			zRight.push(gAttr[0]);
		}	
		if (t.grpCaptionDest.indexOf("fL")>=0) {
			showGroupCaption = true;
		}	
		if (t.grpCaptionDest.indexOf("fC")>=0) {
			showGroupCaption = true;
		}	
		if (t.grpCaptionDest.indexOf("fR")>=0) {
			showGroupCaption = true;
		}	
	}
//TODO address the question of multiple attributes
	for (var i=0;i<iLen;i++) {
		var n = gItems[i];
		var name = n.nodeName;
		var ave = (name.indexOf("Ave")==0);
		var sum = (name.indexOf("Sum")==0);
		var min = (name.indexOf("Min")==0);
		var max = (name.indexOf("Max")==0);
		var count = (name.indexOf("Count")==name.length-5);
		if (ave) {
			if (t.aveDest.indexOf('fL')>=0) zLeft.push(n);
			if (t.aveDest.indexOf('fC')>=0) zCenter.push(n);
			if (t.aveDest.indexOf('fR')>=0) zRight.push(n);	
		}
		else if (sum) {
			if (t.sumDest.indexOf('fL')>=0) zLeft.push(n);
			if (t.sumDest.indexOf('fC')>=0) zCenter.push(n);
			if (t.sumDest.indexOf('fR')>=0) zRight.push(n);	
		}
		else if (min) {
			if (t.minDest.indexOf('fL')>=0) zLeft.push(n);
			if (t.minDest.indexOf('fC')>=0) zCenter.push(n);
			if (t.minDest.indexOf('fR')>=0) zRight.push(n);	
		}
		else if (max) {
			if (t.maxDest.indexOf('fL')>=0) zLeft.push(n);
			if (t.maxDest.indexOf('fC')>=0) zCenter.push(n);
			if (t.maxDest.indexOf('fR')>=0) zRight.push(n);	
		}
		else if (count) {
			if (t.countDest.indexOf('fL')>=0) zLeft.push(n);
			if (t.countDest.indexOf('fC')>=0) zCenter.push(n);
			if (t.countDest.indexOf('fR')>=0) zRight.push(n);	
		}
		else {
			if (t.miscItemDest.indexOf('fL')>=0) zLeft.push(n);
			if (t.miscItemDest.indexOf('fC')>=0) zCenter.push(n);
			if (t.miscItemDest.indexOf('fR')>=0) zRight.push(n);	
		}
	}
	var lLen = zLeft.length;
	var rLen = zRight.length;
	var cLen = zCenter.length;
	if ((lLen+rLen+cLen)==0) {  // Nothing slated to print in this section
		src.push('{t:"f",g:"'+gName+'",a:false},');
		return;
	}
	// ELSE we need to lay out the banner
	var sep = this.autoFillParseSeparator(t.grpFootSep);
	var sepH = parseInt(t.rptFooterSepItem.sw,10);

	var titleH = 0;
	if (showGroupField) titleH = t.grpFooterTitleTxt.xs*1.2;

	var valueH = t.grpFooterValueTxt.xs;
	var captionH = t.grpFooterCaptionTxt.xs;
	var lineH = Math.ceil(Math.max(valueH,captionH)*1.1);

	var w = ZRU.convertToPoints(this.pageWidth);
	var leftEnd = 0;
	var rightEnd = w;

	var lineCount = Math.max(lLen,rLen);
	lineCount = Math.max(lineCount,cLen);
	var h = lineCount*lineH;
	if (showGroupField) h+= titleH;
	if (sep.box) {
		h+=2*sepH+2;
		leftEnd = sepH+2;
		rightEnd = w-sepH-2;
	}
	else if (sep.line) h+=sepH;
	h+=sep.spaceAfter;
	h+=sep.spaceBefore;

	var midPt = w/2;
	var leftPt = w/3;
	var leftMid = w/6;
	var rightPt = 2*w/3;
	var rightMid = rightPt+leftMid;

	var firstItem = true;
	var base = sep.spaceBefore;
	
	src.push('{t:"f",g:"'+gName+'",a:true,h:"'+h+'pt",w:"'+w+'pt",b:'+sep.breaking+',');
	src.push('\ti:[');
	if (sep.box) {
		var gc = this.autoFillMakeGC(t.grpFooterSepItem,w-sepH,h-sepH-sep.spaceBefore,sepH/2+sep.spaceBefore,sepH/2);
		src.push('\t\t{t:"box",gc:'+ZLM.jsonEncode(gc,1)+',c:"BOX",url:null,durl:null}');
		firstItem = false;
	}
	if (sep.box) base+=sepH+2;

	if (sep.line) {
		if (!firstItem) src.push(",");
		var gc = this.autoFillMakeGC(t.grpFooterSepItem,w-sepH,0,sepH/2+sep.spaceBefore,0);		
		src.push('\t\t{t:"line",gc:'+ZLM.jsonEncode(gc,1)+'}');
		base += 2*sepH;
		firstItem = false;
	}
	var topOffset = base;
	// Start left zone processing
	var maxLen = 0;
	for (var i=0;i<lLen;i++) {
		var cL = zLeft[i].nodeName.length;
		if (cL>maxLen) maxLen=cL;
	}
	var leftTab = cL*captionH+leftEnd;
	if (leftTab>leftMid) leftTab = leftMid;

	for (var i=0;i<lLen;i++) {
		if (!firstItem) src.push(',');
		firstItem = false;
		var cn = zLeft[i].nodeName;
		var fn = cn;
		if (zLeft[i].nodeType!="item") fn = "@"+cn;
		var skip = false;
		if (showGroupField && i==0) {			
			if (zLeft[i]==gAttr[0]) {
				skip=true;
				var titleM = leftEnd;
				if (showGroupCaption) {
					titleM = leftTab;
					var gc = this.autoFillMakeGC(t.grpFooterTitleTxt,titleM,lineH,base,leftEnd);
					gc.xj = "left";
					src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"CAPN",f:"!'+this.autoFillCamelCaseToString(cn)+':",fn:""},');
				}
				var gc = this.autoFillMakeGC(t.grpFooterTitleTxt,leftPt-titleM,lineH,base,titleM);
				gc.xj = "left";
				src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"ATTR",f:"'+fn+'",fn:""}');
			}
			base+= titleH;
		}	
		if (!skip) {
			// Need to output both caption and value
			var gc = this.autoFillMakeGC(t.grpFooterValueTxt,leftPt-leftTab,lineH,base,leftTab);
			gc.xj = "left";
			src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"ELEM",f:"'+fn+'",fn:""},');

			var gc = this.autoFillMakeGC(t.grpFooterCaptionTxt,leftTab,lineH,base,leftEnd);
			gc.xj = "left";
			src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"CAPN",f:"!'+this.autoFillCamelCaseToString(cn)+':",fn:""}');
			base += lineH;
		}
	}

	// Start center zone processing
	var base = topOffset;
	for (var i=0;i<cLen;i++) {
		if (!firstItem) src.push(',');
		firstItem = false;
		var cn = zCenter[i].nodeName;
		var fn = cn;
		if (zCenter[i].nodeType!="item") fn = "@"+cn;
		var skip = false;
		if (showGroupField && i==0) {
			if (zCenter[i]==gAttr[0]) {
				skip = true;
				var titleM = leftPt;
				if (showGroupCaption) {
					titleM = midPt+6;
					var gc = this.autoFillMakeGC(t.grpFooterTitleTxt,midPt-leftPt-6,lineH,base,midPt-6);
					gc.xj = "right";
					src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"CAPN",f:"!'+this.autoFillCamelCaseToString(cn)+':",fn:""},');
				}
				var gc = this.autoFillMakeGC(t.grpFooterTitleTxt,rightPt-titleM,lineH,base,titleM);
				if (showGroupCaption) gc.xj = "left";
				else gc.xj = "center";
				src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"ATTR",f:"'+fn+'",fn:""}');
			}
			base+= titleH;
		}	
		if (!skip) {
			// Need to output both caption and value
			var gc = this.autoFillMakeGC(t.grpFooterValueTxt,rightPt-midPt-6,lineH,base,midPt+6);
			gc.xj = "right";
			src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"ELEM",f:"'+fn+'",fn:""},');

			var gc = this.autoFillMakeGC(t.grpFooterCaptionTxt,midPt-6-leftPt,lineH,base,leftPt);
			gc.xj = "left";
			src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"CAPN",f:"!'+this.autoFillCamelCaseToString(cn)+':",fn:""}');
			base += lineH;
		}
	}

	// Start right zone processing
	var maxLen = 0;
	for (var i=0;i<rLen;i++) {
		var cL = zRight[i].nodeName.length;
		if (cL>maxLen) maxLen=cL;
	}
	var rightTab = cL*captionH+rightPt;
	if (rightTab>rightMid) rightTab = rightMid;

	var base = topOffset;
	for (var i=0;i<rLen;i++) {
		if (!firstItem) src.push(',');
		firstItem = false;
		var cn = zRight[i].nodeName;
		var fn = cn;
		if (zRight[i].nodeType!="item") fn = "@"+cn;
		if (showGroupField && i==0) {
			if (zRight[i]==gAttr[0]) {
				var titleM = rightEnd;
				if (showGroupCaption) {
					titleM = rightTab;
					var gc = this.autoFillMakeGC(t.grpFooterTitleTxt,rightEnd-titleM,lineH,base,rightEnd);
					gc.xj = "right";
					src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"CAPN",f:"!'+this.autoFillCamelCaseToString(cn)+':",fn:""},');
				}
				var gc = this.autoFillMakeGC(t.grpFooterTitleTxt,titleM-rightPt,lineH,base,titleM);
				gc.xj = "right";
				src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"ATTR",f:"'+fn+'",fn:""}');
			}
			base+= titleH;
		}	
		else {
			// Need to output both caption and value
			var gc = this.autoFillMakeGC(t.grpFooterValueTxt,rightEnd-rightTab,lineH,base,rightTab);
			gc.xj = "right";
			src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"ELEM",f:"'+fn+'",fn:""},');

			var gc = this.autoFillMakeGC(t.grpFooterCaptionTxt,rightTab-rightPt,lineH,base,rightPt);
			gc.xj = "right";
			src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"CAPN",f:"!'+this.autoFillCamelCaseToString(cn)+':",fn:""}');
			base += lineH;
		}
	}
	src.push('\t]');
	src.push('},');
}

ZRU.BannerWorkspace.prototype.autoFillGroups = function(src,t,g) {
	var gName = g.nodeName;
	var gAttr = g.attr; 	// Group attributes (could go to headers or footers)
	var aLen = 0;
	if (gAttr) aLen = gAttr.length;

	var gItems = []; // Group items; Actual items could go to header or footer
	var gGroups = []; // Subgroups get their own banners
					// Groups map to banner sections
	for (var idx=g.item.length-1;idx>=0;idx--) {
		var n = g.item[idx]; 
		if (n.nodeType=='item') gItems.push(n);
		else if (n.nodeType=='group') gGroups.push(n);
	}

	var iLen = gItems.length;
	var gLen = gGroups.length;
	if (gLen==0) {
		this.autoFillGroupBody(src,t,gName,gAttr,aLen,gItems,iLen);
	}
	else {
		this.autoFillGroupHeader(src,t,gName,gAttr,aLen,gItems,iLen);
		for (var i=0;i<gLen;i++) this.autoFillGroups(src,t,gGroups[i]);
		this.autoFillGroupFooter(src,t,gName,gAttr,aLen,gItems,iLen);
	}
}

ZRU.BannerWorkspace.prototype.autoFillRptFooter = function(src,t,rptName,rAttr,aLen,rItems,iLen) {
	var toPlace = {};
	if (t.rptNameDest.indexOf("rF")>=0) toPlace.name=true;
	if (t.rptAttrDest.indexOf("rF")>=0) toPlace.attr=true;
	if (t.rptItemDest.indexOf("rF")>=0) toPlace.item=true;
	if (t.logoURL && t.logoURL.length>0 && t.rptItemDest.indexOf("rF")>=0) toPlace.logo=true;
	if (toPlace!=={}) {  // Uses report header
		var sepH = parseInt(t.rptFooterSepItem.sw,10);
		var valueH = t.rptFooterValueTxt.xs;
		var captionH = t.rptFooterCaptionTxt.xs;
		var nameH = Math.ceil(t.rptFooterTitleTxt.xs*1.2);
		var lineH = Math.ceil(Math.max(valueH,captionH)*1.1);
		var w = ZRU.convertToPoints(this.pageWidth);
		var h = 0;
		var midPt = w/2;

		if (toPlace.name) h+= nameH // Size of name
		if (toPlace.attr) h += aLen*lineH;
		if (toPlace.item) h += iLen*lineH;
		var sep = this.autoFillParseSeparator(t.rptFootSep);
		if (sep.box) h+=2*sepH;
		else if (sep.line) h+=sepH;
		h+=sep.spaceAfter;
		h+=sep.spaceBefore;
		src.push('{t:"f",g:"_r",a:true,h:"'+h+'pt",w:"'+w+'pt",b:'+sep.breaking+',');
		src.push('\ti:[');
		// If it's a box, block out the area 
		if (sep.box) {
			var gc = this.autoFillMakeGC(t.rptFooterSepItem,w-sepH,h-sepH-sep.spaceBefore,sepH/2+sep.spaceBefore,sepH/2);
			src.push('\t\t{t:"box",gc:'+ZLM.jsonEncode(gc,1)+',c:"BOX",url:null,durl:null},');
		}
		var base = sep.spaceBefore;
		if (sep.box) base+=sepH;
		if (sep.line) {
			var gc = this.autoFillMakeGC(t.rptFooterSepItem,w-sepH,0,base+sepH/2,0);		
			src.push('\t\t{t:"line",gc:'+ZLM.jsonEncode(gc,1)+'},');
			base += 2*sepH;
		}
		// Name
		if (toPlace.name) {
			var gc = this.autoFillMakeGC(t.rptFooterTitleTxt,w,nameH,base,0);
			gc.xj = "center";
			base+=nameH;
			src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+',c:"CAPN",f:"!'+rptName+'",fn:""}');
		}
		// Attributes
		if (toPlace.attr) {
			if (toPlace.name) src.push(',');
			for (var i=0;i<aLen;i++) {
				if (i>0) src.push(',');
				// Need to output both caption and value
				var n = rAttr[i].nodeName;
				var gc = this.autoFillMakeGC(t.rptFooterValueTxt,midPt-12,lineH,base,midPt+12);

				gc.xj = "left";
				src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"ATTR",f:"@'+n+'",fn:""},');
				var gc = this.autoFillMakeGC(t.rptFooterCaptionTxt,midPt-12,lineH,base,0);
				gc.xj = "right";
				src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"CAPN",f:"!'+this.autoFillCamelCaseToString(n)+':",fn:""}');
				base += lineH;
			}
		}
		// Items
		if (toPlace.item) {
			if (toPlace.name || toPlace.attr) src.push(',');
			for (var i=0;i<iLen;i++) {
				if (i>0) src.push(',');
				// Need to output both caption and value
				var n = rItems[i].nodeName;
				var gc = this.autoFillMakeGC(t.rptFooterValueTxt,midPt-12,lineH,base,midPt+12);
				gc.xj = "left";
				src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"ELEM",f:"'+n+'",fn:""},');

				var gc = this.autoFillMakeGC(t.rptFooterCaptionTxt,midPt-12,lineH,base,0);
				gc.xj = "right";
				src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"CAPN",f:"!'+this.autoFillCamelCaseToString(n)+':",fn:""}');
				base += lineH;
			}
		}
		src.push('\t]');
		src.push('},');
	}
	else {
		src.push('{t:"h",g:"_r",a:false},');
	}
}

ZRU.BannerWorkspace.prototype.autoFillPageFooter = function(src,t,rptName,rAttr,aLen) {
//TODO address page number and placement
	// The page footer has three major zones pFL, pFC, and pFR
	// Elements may be placed individually by classification.
	// In particular:
	//  The reportName 
	//  The page number 
	//  Report attributes
	var zLeft = [];
	var zCenter = [];
	var zRight = [];
	if (t.rptNameDest.indexOf("pFL")>=0) zLeft.push({nodeName:rptName,nodeType:"title"});
	if (t.rptNameDest.indexOf("pFC")>=0) zCenter.push({nodeName:rptName,nodeType:"title"});
	if (t.rptNameDest.indexOf("pFR")>=0) zRight.push({nodeName:rptName,nodeType:"title"});
	for (var i=0;i<aLen;i++) {
		var n = rAttr[i];
		var name = n.nodeName;
		if (t.rptAttrDest.indexOf('pFL')>=0) zLeft.push(n);
		if (t.rptAttrDest.indexOf('pFC')>=0) zCenter.push(n);
		if (t.rptAttrDest.indexOf('pFR')>=0) zRight.push(n);	
	}
	var lLen = zLeft.length;
	var rLen = zRight.length;
	var cLen = zCenter.length;
	if ((lLen+rLen+cLen)==0) {  // Nothing slated to print in this section
		src.push('{t:"f",g:"_p",a:false},');
		return;
	}
	// ELSE we need to lay out the banner
	var sep = this.autoFillParseSeparator(t.pgFootSep);
	var sepH = parseInt(t.pgFooterSepItem.sw,10);

	var titleH = t.pgFooterTitleTxt.xs*1.2;
	var valueH = t.pgFooterValueTxt.xs;
	var captionH = t.pgFooterCaptionTxt.xs;
	var lineH = Math.ceil(Math.max(valueH,captionH)*1.1);

	var w = ZRU.convertToPoints(this.pageWidth);
	var leftEnd = 0;
	var rightEnd = w;

	// The banner height is a function of the contents  a page header should grow from the
	// separator upward (alignment wise) and footers should grow downward toward the edge of the page
	var leftHeight = lLen*lineH;
	if (lLen>0 && zLeft[0].nodeType=="title") leftHeight += (titleH-lineH); // account for potentially different sized text
	var rightHeight = rLen*lineH;
	if (rLen>0 && zRight[0].nodeType=="title") rightHeight += (titleH-lineH); // account for potentially different sized text
	var centerHeight = cLen*lineH;
	if (cLen>0 && zCenter[0].nodeType=="title") centerHeight += (titleH-lineH); // account for potentially different sized text

	var txtHeight = Math.max(leftHeight,rightHeight);
	var topOffset = sep.spaceBefore;
	txtHeight = Math.max(txtHeight,centerHeight);
	var h = txtHeight+topOffset;;
	if (sep.box) {
		h+=2*sepH+2;
		topOffset+=sepH;
		leftEnd = sepH+2;
		rightEnd = w-sepH-2;
	}
	else if (sep.line) {
		h+=sepH;
		topOffset+=sepH;
	}
	var bottomOffset = h;
	h+=sep.spaceAfter;

	var midPt = w/2;
	var leftPt = w/3;
	var leftMid = w/6;
	var rightPt = 2*w/3;
	var rightMid = rightPt+leftMid;

	var firstItem = true;
	
	src.push('{t:"f",g:"_p",a:true,h:"'+h+'pt",w:"'+w+'pt",b:0,');
	src.push('\ti:[');
	if (sep.box) {
		var gc = this.autoFillMakeGC(t.pgFooterSepItem,w-sepH,h-sepH-sep.spaceBefore,sepH/2+sep.spaceBefore,sepH/2);
		src.push('\t\t{t:"box",gc:'+ZLM.jsonEncode(gc,1)+',c:"BOX",url:null,durl:null}');
		firstItem = false;
	}
	if (sep.box) base+=sepH+2;

	if (sep.line) {
		if (!firstItem) src.push(",");
		firstItem = false;
		var gc = this.autoFillMakeGC(t.pgFooterSepItem,w-sepH,0,sepH/2+sep.spaceBefore,0);		
		src.push('\t\t{t:"line",gc:'+ZLM.jsonEncode(gc,1)+'}');
	}

	// Start left zone processing
	var maxLen = 0;
	for (var i=0;i<lLen;i++) {
		var cL = zLeft[i].nodeName.length;
		if (cL>maxLen) maxLen=cL;
	}
	var leftTab = cL*captionH+leftEnd;
	if (leftTab>leftMid) leftTab = leftMid;

	var base = topOffset;
	for (var i=0;i<lLen;i++) {
		if (!firstItem) src.push(',');
		firstItem = false;
		var cn = zLeft[i].nodeName;
		if (i==0 && zLeft[i].nodeType=="title") {
			var gc = this.autoFillMakeGC(t.pgFooterTitleTxt,leftPt-leftEnd,titleH,bottomOffset-titleH,leftEnd);
			gc.xj = "left";
			src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"CAPN",f:!"'+cn+'",fn:""}');
		}	
		else {
			// Need to output both caption and value
			var gc = this.autoFillMakeGC(t.pgFooterValueTxt,leftPt-leftTab,lineH,base,leftTab);
			gc.xj = "left";
			src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"ATTR",f:"@'+cn+'",fn:""},');

			var gc = this.autoFillMakeGC(t.pgFooterCaptionTxt,leftTab,lineH,base,leftEnd);
			gc.xj = "left";
			src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"CAPN",f:"!'+this.autoFillCamelCaseToString(cn)+':",fn:""}');
			base += lineH;
		}
	}

	// Start center zone processing
	var base = topOffset;
	for (var i=0;i<cLen;i++) {
		if (!firstItem) src.push(',');
		firstItem = false;
		var cn = zCenter[i].nodeName;
		if (i==0 && zCenter[i].nodeType=="title") {
			var gc = this.autoFillMakeGC(t.pgFooterTitleTxt,rightPt-leftPt,titleH,bottomOffset-titleH,leftPt);
			gc.xj = "center";
			src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"CAPN",f:!"'+cn+'",fn:""}');
		}	
		else {
			var gc = this.autoFillMakeGC(t.pgFooterValueTxt,rightPt-midPt-6,lineH,base,midPt+6);
			gc.xj = "right";
			src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"ATTR",f:"@'+cn+'",fn:""},');

			var gc = this.autoFillMakeGC(t.pgFooterCaptionTxt,midPt-6-leftPt,lineH,base,leftPt);
			gc.xj = "left";
			src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"CAPN",f:"!'+this.autoFillCamelCaseToString(cn)+':",fn:""}');
			base += lineH;
		}
	}

	// Start right zone processing
	var maxLen = 0;
	for (var i=0;i<rLen;i++) {
		var cL = zRight[i].nodeName.length;
		if (cL>maxLen) maxLen=cL;
	}
	var rightTab = cL*captionH+rightPt;
	if (rightTab>rightMid) rightTab = rightMid;

	var base = topOffset;
	for (var i=0;i<rLen;i++) {
		if (!firstItem) src.push(',');
		firstItem = false;
		var cn = zRight[i].nodeName;
		if (i==0 && zRight[i].nodeType=="title") {
			var gc = this.autoFillMakeGC(t.pgFooterTitleTxt,rightEnd-rightPt,titleH,bottomOffset-titleH,rightPt);
			gc.xj = "right";
			src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"CAPN",f:"!'+cn+'",fn:""}');
		}	
		else {
			var gc = this.autoFillMakeGC(t.pgFooterValueTxt,rightEnd-rightTab,lineH,base,rightTab);
			gc.xj = "right";
			src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"ATTR",f:"@'+cn+'",fn:""},');

			var gc = this.autoFillMakeGC(t.pgFooterCaptionTxt,rightTab-rightPt,lineH,base,rightPt);
			gc.xj = "right";
			src.push('\t\t{t:"txt",gc:'+ZLM.jsonEncode(gc,1)+', c:"CAPN",f:"!'+this.autoFillCamelCaseToString(cn)+':",fn:""}');
			base += lineH;
		}
	}

	src.push('\t]');
	src.push('}');
}

ZRU.BannerWorkspace.prototype.restoreObj=function(o) {
	if (o.t!='_LIDR') return(false);
	var s = o.s;
	var sl = s.length;
	if (sl!=this.sec.length) {
		alert("Invalid geometries in restore. \nExpected "+this.sec.length+" sections but got "+sl);
		return(false);
	}
	for (var i=0;i<sl;i++) {
		if (!this.sec[i].editor.restoreObj(s[i])) {
			var restoreFailed = true;
			// Restore may have failed because the wrong default body edit was
			// installed by default, try forcing a new editor to match
			var groupName = this.sec[i].editor.groupName;
			var watermark = this.sec[i].watermark;
			var dropScope = this.sec[i].dropScope;
			if (s[i].t=="b") {
				this.removeBannerEditor(i);
				this.embedBodyEditor(i,watermark,dropScope,1,null);
				this.sec[i].editor.setGroupName(groupName);
				if (this.sec[i].editor.restoreObj(s[i])) restoreFailed = false;
			}
			else if (s[i].t=="t") {
				this.removeBannerEditor(i);
				this.embedTableEditor(i,watermark,dropScope,null);
				this.sec[i].editor.setGroupName(groupName);
				if (this.sec[i].editor.restoreObj(s[i])) restoreFailed = false;
			}
			else if (s[i].t=="n") {
				this.removeBannerEditor(i);
				this.embedNVPEditor(i,watermark,dropScope,null);
				this.sec[i].editor.setGroupName(groupName);
				if (this.sec[i].editor.restoreObj(s[i])) restoreFailed = false;
			}
			else if (s[i].t=="p") {
				this.removeBannerEditor(i);
				this.embedParagraphEditor(i,watermark,dropScope,null);
				this.sec[i].editor.setGroupName(groupName);
				if (this.sec[i].editor.restoreObj(s[i])) restoreFailed = false;
			}
			if (restoreFailed) {
				alert("Attempted restore of section "+i+" failed");
				return(false);
			}
this.sec[i].editor.sizeChangedCB(this.sec[i].area);

		}
	}
	ZLM.initDataDragDrop();
	return(true);
}

ZRU.BannerWorkspace.prototype.exportObj=function() {
	var o = {};
	o.t = '_LIDR';
	var s=this.sec;
	o.s = [];
	for (var i=0;i<s.length;i++) {
		if (s[i].editor && s[i].editor.exportObj) {
			var n = s[i].editor.exportObj();
			o.s.push(n);
		}
	}
	return(o);
}

ZRU.BannerWorkspace.prototype.exportJSON=function() {
	var data=[];
	data.push("{reportType:'_LIDR',");
	data.push("sections:"+this.sec.length+",");

	var s=this.sec;
	data.push("sec:[");
	for (var i=0;i<s.length;i++) {
		if (s[i].editor && s[i].editor.exportJSON) s[i].editor.exportJSON(data);
		if (i<s.length-1) data.push(",");
	}
	data.push("]");
	data.push("}");
	return(data);
}

ZRU.BannerWorkspace.prototype.exportXML=function() {
	var xmlData=[];
	xmlData.push("<body>");
	var s=this.sec;
	for (var i=0;i<s.length;i++) {
		if (s[i].editor && s[i].editor.exportXML) s[i].editor.exportXML(xmlData);
	}
	xmlData.push("</body>");
	return(xmlData);
}

ZRU.BannerWorkspace.prototype.exportZRS=function() {
// template looks like this
// <document>
// <pageheader> (this.sec[1])
// <pagefooter> (this.sec[n])
// <body>
//   (reportheader) (this.sec[0])
//   <group>
//      (groupheader)
//      (group body)
//      (groupfooter)
//   </group>
//   (reportfooter) (this.sec[n-1]);
// </body>
	ZRU.tmpChartIdx = 0; // Count of exported charts

	var rhIdx = 0;
	var phIdx = 1;
	var ghIdx = 2;
	var pfIdx = this.sec.length-1;
	var rfIdx = pfIdx-1;

	var s=this.sec;
	var data = [];
	var coda = [];

	data.push('\t<init>');
	data.push('\t\t<xslt xslfo="ParagraphFunctions" />');
	data.push('\t</init>');

	var pgHeaderH = 0;
	if (s[phIdx].editor.activeZone) pgHeaderH = s[phIdx].ptHeight;

	var pgFooterH = 0;
	if (s[pfIdx].editor.activeZone) pgFooterH = s[pfIdx].ptHeight;
	var marginL = "72pt";
	var marginR = "72pt";
	var marginB = "72pt";
	var marginT = "72pt";
	var pgWidth = "612pt";
	var pgHeight = "792pt";
	var omitFirst = true;
	var omitLast = true;
	if (this.pageSetup) {
		var ps = this.pageSetup;
		var units="pt";
		pgWidth = ps.width+units;
		pgHeight = ps.height+units;
		if (ps.orient=="landscape") {
			var tmp = pgWidth;
			pgWidth = pgHeight;
			pgHeight = tmp;
		}
		marginL = ps.left;
		marginR = ps.right;
		marginT = ps.top;
		marginB = ps.bottom;
		if (ps.header>pgHeaderH) pgHeaderH = ps.header;
		if (ps.footer>pgFooterH) pgFooterH = ps.footer;
		orient = ps.orient;
		omitFirst = ps.omitFirst;
		omitLast = ps.omitLast;
	}
	var rHeaderH = this.getMaxRunningHeaderHeight()+pgHeaderH;
	var headerH = (pgHeaderH+2)+"pt";
	var headerHRH = (rHeaderH+2)+"pt";
	var footerH = (pgFooterH+2)+"pt";
	pgHeaderH = pgHeaderH+"pt";
	var pgHeaderHRH = headerHRH+"pt";
	pgFooterH = pgFooterH+"pt";

	var pgTxt = []; // Document and page banners for a 'normal' page
	pgTxt.push('<document');
	pgTxt.push('width="'+pgWidth+'"');
	pgTxt.push('height="'+pgHeight+'"');
	pgTxt.push('marginLeft="'+marginL+'"');
	pgTxt.push('marginRight="'+marginR+'"');
	pgTxt.push('marginTop="'+marginT+'"');
	pgTxt.push('marginBottom="'+marginB+'"');
	pgTxt.push('headerHeight="'+headerH+'"');
	pgTxt.push('regionBeforeExtent="'+pgHeaderH+'"');
	pgTxt.push('footerHeight="'+footerH+'"');
	pgTxt.push('regionAfterExtent="'+pgFooterH+'"');
	pgTxt.push('/>');
	var str = pgTxt.join(" ");
	pgTxt = []; // reset
	pgTxt.push(str);
	if (s[phIdx].editor.activeZone) {
		pgTxt.push('<pageheader>');
		s[phIdx].editor.exportZRS(pgTxt,coda);
		pgTxt.push('</pageheader>');
	}
	if (s[pfIdx].editor.activeZone) {
		pgTxt.push('<pagefooter>');
		s[pfIdx].editor.exportZRS(pgTxt,coda);
		pgTxt.push('</pagefooter>');
	}

	var rhTxt = []; // Document and page banners for a page with running headers
	rhTxt.push('<document');
	rhTxt.push('width="'+pgWidth+'"');
	rhTxt.push('height="'+pgHeight+'"');
	rhTxt.push('marginLeft="'+marginL+'"');
	rhTxt.push('marginRight="'+marginR+'"');
	rhTxt.push('marginTop="'+marginT+'"');
	rhTxt.push('marginBottom="'+marginB+'"');
	rhTxt.push('headerHeight="'+headerHRH+'"');
	rhTxt.push('regionBeforeExtent="'+pgHeaderHRH+'"');
	rhTxt.push('footerHeight="'+footerH+'"');
	rhTxt.push('regionAfterExtent="'+pgFooterH+'"');
	rhTxt.push('/>');
	var str = rhTxt.join(" ");
	rhTxt = []; // reset
	rhTxt.push(str);
	if (s[phIdx].editor.activeZone) {
		rhTxt.push('<pageheader>');
		rhTxt.push('<!-- UNCONDITIONAL BASE HEADER -->');
		s[phIdx].editor.exportZRS(rhTxt,coda);
		rhTxt.push('<!-- DYNMANIC RUNNING HEADER ADDENDUM -->');
		rhTxt.push('\t<write>');
		rhTxt.push('\t\t<![CDATA[');
		rhTxt.push('\t\t\t<fo:block font-size="0pt" >');
		rhTxt.push('\t\t\t\t<fo:retrieve-marker retrieve-class-name="sect-head"');
		rhTxt.push('\t\t\t\t\tretrieve-position="first-including-carryover"');
		rhTxt.push('\t\t\t\t\tretrieve-boundary="page-sequence"/>');
		rhTxt.push('\t\t\t</fo:block>');
		rhTxt.push(']]>');
		rhTxt.push('\t</write>');
		rhTxt.push('</pageheader>');
	}
	if (s[pfIdx].editor.activeZone) {
		rhTxt.push('<pagefooter>');
		s[pfIdx].editor.exportZRS(rhTxt,coda);
		rhTxt.push('</pagefooter>');
	}

	if (headerH==headerHRH) { // No need for special page masters
		for (var i=0;i<pgTxt.length;i++) data.push(pgTxt[i]);
	}
	else { // need to check page setup for number of templates required
		data.push('<pagemaster>');

		data.push('\t<masterreference masterReference="first" pagePosition="first">');
		if (omitFirst) for (var i=0;i<pgTxt.length;i++) data.push(pgTxt[i]);
		else for (var i=0;i<rhTxt.length;i++) data.push(rhTxt[i]);
		data.push('\t</masterreference>\n');

		data.push('\t<masterreference masterReference="last" pagePosition="last">');
		if (omitLast) for (var i=0;i<pgTxt.length;i++) data.push(pgTxt[i]);
		else for (var i=0;i<rhTxt.length;i++) data.push(rhTxt[i]);
		data.push('\t</masterreference>\n');

		data.push('\t<masterreference masterReference="rest" pagePosition="rest">');
		for (var i=0;i<rhTxt.length;i++) data.push(rhTxt[i]);
		data.push('\t</masterreference>\n');

		data.push('</pagemaster>');
	}

	data.push('<body>');
	if (s[rhIdx].editor.activeZone) {
		s[rhIdx].editor.exportZRS(data,coda);
	}

	for (var i=ghIdx;i<rfIdx;i++) {
		if (s[i].editor && s[i].editor.exportZRS) s[i].editor.exportZRS(data,coda);
	}

	if (s[rfIdx].editor.activeZone) {
		s[rfIdx].editor.exportZRS(data,coda);
	}
	data.push('</body>');
coda.push('// CODA GOES HERE');
	return({d:data,c:coda});
}

ZRU.BannerWorkspace.prototype.save=function() {
var x = this.exportZRS();
return;
}

ZRU.BannerWorkspace.prototype.embedBannerEditor=function(idx,watermark,dropScope,active,prompt) {
	var n=ZRU.BannerEdit.create(watermark,this.rawPageWidth,this.rawUnits,prompt);
	n.frame=this.sec[idx];
	n.master = this;
	this.sec[idx].area.appendChild(n.base);
	this.sec[idx].editor=n;
	this.sec[idx].setReshapeNotify("this.editor.sizeChangedCB(this.userArea);");
	this.sec[idx].dropScope=dropScope;
	this.sec[idx].watermark = watermark;
	this.sec[idx].idx = idx;

	if (!active) {
		n.deactivateZone();
	}
	else {
		n.activateZone();
	}
}

ZRU.BannerWorkspace.prototype.embedBodyEditor=function(idx,watermark,dropScope,active,prompt) {
	var n=ZRU.BodyEdit.create(watermark,this.rawPageWidth,this.rawUnits,prompt);
	n.frame=this.sec[idx];
	n.master = this;
	this.sec[idx].area.appendChild(n.base);
	this.sec[idx].editor=n;
	this.sec[idx].setReshapeNotify("this.editor.sizeChangedCB(this.userArea);");
	this.sec[idx].dropScope=dropScope;
	this.sec[idx].watermark = watermark;
	this.sec[idx].idx = idx;

	n.activateZone();
}

ZRU.BannerWorkspace.prototype.embedTableEditor=function(idx,watermark,dropScope,group) {
	var te=ZRU.TableEdit.create(watermark,this.rawPageWidth,this.rawUnits);
	te.frame=this.sec[idx];
	te.master = this;
	this.sec[idx].area.appendChild(te.base);
	this.sec[idx].editor=te;
	this.sec[idx].setResizable(false);
	this.sec[idx].setReshapeNotify("this.editor.sizeChangedCB(this.userArea);");
	this.sec[idx].resizeAreaPt(72);
	this.sec[idx].dropScope=dropScope;
	this.sec[idx].watermark = watermark;
	this.sec[idx].idx = idx;

	if (!group) return;

	var nKids = group.childNodes.length;
	if (nKids==0) return;
	var colW = this.rawPageWidth*72/nKids; //assumes raw page in inches
	var x = 0;
	for (var i=0; i<nKids; i++) {
		var n = group.childNodes[i];
		var name = n.getAttribute("name");
		if (n.nodeName == "attribute") name = "@"+name;
		te.addDataItem(x,0,name,colW);
		x+=colW;
	}
}

ZRU.BannerWorkspace.prototype.embedNVPEditor=function(idx,watermark,dropScope,group) {
	var te=ZRU.NVPEdit.create(watermark,this.rawPageWidth,this.rawUnits);
	te.frame=this.sec[idx];
	te.master = this;
	this.sec[idx].area.appendChild(te.base);
	this.sec[idx].editor=te;
	this.sec[idx].setResizable(true);
	this.sec[idx].setReshapeNotify("this.editor.sizeChangedCB(this.userArea);");
	this.sec[idx].resizeAreaPt(72);
	this.sec[idx].dropScope=dropScope;
	this.sec[idx].watermark = watermark;
	this.sec[idx].idx = idx;

	if (!group) return;

	var nKids = group.childNodes.length;
	if (nKids==0) return;
	var rowH = 20; //assumes raw page in inches
	var x = 0;
	for (var i=0; i<nKids; i++) {
		var n = group.childNodes[i];
		var name = n.getAttribute("name");
		if (n.nodeName == "attribute") name = "@"+name;
		te.addDataItem(x,0,name,rowH);
		x+=colW;
	}
}

/// NEW
ZRU.BannerWorkspace.prototype.embedParagraphEditor=function(idx,watermark,dropScope,group) {
	var te=ZRU.ParaEdit.create(watermark,this.rawPageWidth,this.rawUnits);
	te.frame=this.sec[idx];
	te.master = this;
	this.sec[idx].area.appendChild(te.base);
	this.sec[idx].editor=te;
	this.sec[idx].setResizable(true);
	this.sec[idx].setReshapeNotify("this.editor.sizeChangedCB(this.userArea);");
	this.sec[idx].resizeAreaPt(72);
	this.sec[idx].dropScope=dropScope;
	this.sec[idx].watermark = watermark;
	this.sec[idx].idx = idx;

	if (!group) return;

	if (!group.childNodes) return;	
	var nKids = group.childNodes.length;
	if (nKids==0) return;
	var rowH = 20; //assumes raw page in inches
	var x = 0;
	for (var i=0; i<nKids; i++) {
		var n = group.childNodes[i];
		var name = n.getAttribute("name");
		if (n.nodeName == "attribute") name = "@"+name;
		te.addDataItem(x,0,name,rowH);
		x+=colW;
	}
}

ZRU.BannerWorkspace.prototype.restoreSchema=function(jsObj) {
	alert("DEPRECIATED METHOD restoreSchema CALLED FROM SERVER SOURCE");
/*
	if (this.sec) {
		this.resetBanners();
	}	
	var n = jsObj.sections;
	var d = Math.floor(n/2);
	this.sec = [];
	for (var i=0;i<n;i++) {
		this.addBanner(i);
		var scope = 1;
		if (i>1 && i<=d) {
			scope = i;
		}
		else if (i>d && i<n-1) {
			scope = 2*d-i;
		}
		this.restoreEmbeddedEditor(i,jsObj.sec[i],scope);
	}

	ZLM.initDataDragDrop();
	this.sectionCount=n;
*/
}


// initialize the banner workspace based on the working data set described in the
// tree rDef
ZRU.BannerWorkspace.prototype.initSchema=function(rDef) {

//alert('initSchema');
var prefix = [];
prefix.push('/');

	if (this.sec) {
		this.resetBanners();
	}
	var n=5; // Base for report head/foot, page head/foot and body
	var d=XML.getMaxDepth(rDef)-3; // number of _nested_ groups the body 
	n+=2*d; // add group headers and footers for nested groups	

	this.sec=[];
	for (var i=0;i<n;i++) {
		this.addBanner(this.sec.length);
	}
	this.embedBannerEditor(0,"REPORT HEADER",1,false,"Report Header");
	this.embedBannerEditor(1,"PAGE HEADER",1,false,"Page Header");

	var node=rDef;
	for (var i=0;i<d;i++) {
		node=XML.getChildByNodeName(node,"group");
		var gN=node.getAttribute("name");
		this.embedBannerEditor(2+i,"GROUP HEADER ("+gN+")",i+2,false,"Group Header ("+gN+")");
		this.embedBannerEditor(n-3-i,"GROUP FOOTER ("+gN+")",i+2,false,"Group Footer ("+gN+")");
	}
	node = XML.getChildByNodeName(node,"group");
	gN = node.getAttribute("name");

	this.embedTableEditor(2+i,"REPORT BODY ("+gN+")",i+2,node);
	this.sec[2+i].editor.setGroupName(node.getAttribute("name"));

	this.embedBannerEditor(n-2,"REPORT FOOTER",1,false,"Report Footer");
	this.embedBannerEditor(n-1,"PAGE FOOTER",1,false,"Page Footer");
	ZLM.initDataDragDrop();

	this.sectionCount=n;
}

ZRU.BannerWorkspace.prototype.getDSSMaxDepth=function(obj) {
	var mx = 0;
	for (var i=0;i<obj.item.length;i++) {
		if (obj.item[i].nodeType=="group") {
			var deep = this.getDSSMaxDepth(obj.item[i]);
			if (deep>mx) mx=deep;
		}
	}
	return(mx+1);
}

ZRU.BannerWorkspace.prototype.removeBannerEditor=function(idx) {
	if (idx>=this.sec.length) return;
	var banner = this.sec[idx];
	var oldEdit = banner.editor;
	if (oldEdit) {
		banner.area.removeChild(oldEdit.base);
		delete oldEdit;
	}
	banner.editor = null;
}

ZRU.BannerWorkspace.prototype.embedBanner=function(idx, dssNode, xPathPrefix) {
//ZLM.cerr("Embed banner: "+idx+" "+xPathPrefix);

	if (!dssNode) return(idx);
	var sibs=[];
	if (dssNode.item) for (var i=0;i<dssNode.item.length;i++) {
		if (dssNode.item[i].nodeType=="group") sibs.push(dssNode.item[i]);
	}
//ZLM.cerr("FOUND "+sibs.length+" GROUPS");
	var MUSTDO = sibs.length;

	var gN = dssNode.nodeName;
	xPathPrefix.push(gN);
	var xPathName = '/'+xPathPrefix.join('/');
//ZLM.cerr("Prefix: "+xPathName);
	if (sibs.length==0) { // innermost grouping
		this.addBanner(this.sec.length,xPathName);
		this.embedTableEditor(idx,"REPORT BODY ("+gN+")",idx,null);
//	this.embedNVPEditor(idx,"REPORT BODY ("+gN+")",idx,null);
//	this.embedBodyEditor(idx,"REPORT BODY ("+gN+")",idx,null);
//	this.embedParagraphEditor(idx,"REPORT BODY ("+gN+")",idx,null);
		this.sec[idx].editor.setGroupName(gN);
		this.sec[idx].master = this;
		idx++;
	}
	else { // nested group, push header, recurse, push footer
		if (dssNode.nodeType!="root") {
			this.addBanner(this.sec.length,xPathName);
			this.embedBannerEditor(idx,"GROUP HEADER ("+gN+")",idx,false,"Group Header ("+gN+")");

//ZLM.cerr("ADDED HEADER AT "+idx+" for "+gN);
			idx++;
		}
//ZLM.cerr("MUST PROCESS "+MUSTDO+" CHILDREN");
//if (MUSTDO>1) ZLM.dumpObj(sibs[1]);
		for (var j=0;j<MUSTDO;j++) {
//ZLM.dumpObj(sibs);
			idx = this.embedBanner(idx,sibs[j],xPathPrefix);
//ZLM.cerr("ADDED BANNER "+idx+" for "+xPathPrefix + " J is "+j+" of "+MUSTDO);
		}
		if (dssNode.nodeType!="root") {
			this.addBanner(this.sec.length,xPathName);
			this.embedBannerEditor(idx,"GROUP FOOTER ("+gN+")",idx,false,"Group Footer ("+gN+")");
//ZLM.cerr("ADDED FOOTER AT "+idx+" for "+gN);

			idx++
		}
	}
	xPathPrefix.pop();
	return(idx);
}

/// Initialize the schema of the banners based on a memory resident DSS object
/// The resulting structure should result in, at a minimum report headers and footers, page
/// headers and footers and at least one tabular data section.  Data sections are driven
/// by nested groups.  A leaf group projects as a table, it containing groups project as
/// header and footer banners
ZRU.BannerWorkspace.prototype.initSchemaDSS=function(obj) {
	var prefix = [];
	var rootName = '/'+obj.nodeName;
	this._lastDSS = obj;
	if (this.sec) {
		this.resetBanners();
	}
	this.sec=[];
	this.addBanner(this.sec.length,rootName);
	this.embedBannerEditor(0,"REPORT HEADER",1,false,"Report Header");
	this.addBanner(this.sec.length,rootName);
	this.embedBannerEditor(1,"PAGE HEADER",1,false,"Page Header");
	var idx = this.embedBanner(2,obj,prefix);

	this.addBanner(this.sec.length,rootName);
	this.embedBannerEditor(idx,"REPORT FOOTER",1,false,"Report Footer");
	this.addBanner(this.sec.length,rootName);
	this.embedBannerEditor(idx+1,"PAGE FOOTER",1,false,"Page Footer");
	ZLM.initDataDragDrop();

	this.sectionCount=idx+2;
	return;
}

/// SetDataDragScope check the XPath data prefix against the declared scope of the 
/// various sections.  If the section prefix does not start with the given prefix
/// the setion is not a valid drop zone for this datum, disable it via a visible coverplate.
ZRU.BannerWorkspace.prototype.setDataDragScope=function(prefix)
{
	var len = this.sec.length;
	for (var i = 0; i<len;i++) {
		var s = this.sec[i];
		var pStr = s.prefixStr;
		if (pStr.indexOf(prefix)!=0) s.editor.disable(true);
	}
}

/// ResetDataDragScope unconditionally enable all banners (removing all coverplates)
ZRU.BannerWorkspace.prototype.resetDataDragScope=function()
{
	var len = this.sec.length;
	for (var i = 0; i<len;i++) {
		var s = this.sec[i];
		s.editor.enable();
	}
}

//=========================

ZRU.ResizeBanner=function(div) {
	ZLM.initializeObject(this,div,"ZRU.ResizeBanner");
	this.body=null;
	this.minH=27;
	this.createBody();
	this.reshapeNotify=div.getAttribute("onreshape");
	this.ptHeight = 0;
	this.ptWidth = 0;
	this.initialized=1;
	return(this);
}

ZRU.ResizeBanner.create=function() {
	var div=ZLM.makeElement("div",{'class':'resizeBanner'});
	return(new ZRU.ResizeBanner(div));	
}

ZRU.ResizeBanner.initialize=function() {
	var bi = ZLM.getElementsByClassPrefix("resizeBanner",document.body);
	for (var i=0;i<bi.length;i++) {
		if (bi[i].className=="resizeBanner") {
			if (!bi[i].controller) var o=new ZRU.ResizeBanner(bi[i]);
		}
	}
}

ZRU.ResizeBanner.prototype.setReshapeNotify=function(cb) {
	this.reshapeNotify=cb;
}

ZRU.ResizeBanner.prototype.createBody=function() {
	this.base.style.borderBottom="1px dotted #5BA4DC";
	this.body=ZLM.simulateTag("div style='position:relative; top:0px; left:0px; width:100%; height:100%; background:#fcfcff; overflow:hidden;'");
	this.base.appendChild(this.body);
	this.handle=ZLM.simulateTag("div style='position:absolute; left:0px; bottom:0px; height:3px; width:100%; line-height:0px; border-left:none; border-right:none; border-top:1px outset #777777; border-bottom:1px outset #777777; background:#777777;cursor:ns-resize;'");
	this.handle.style.width="100%";
	this.handle.pixelHeight = 5;
	this.area=ZLM.simulateTag("div style='position:relative;left:0px; top:0px; background:#f0f0ff;width:100%; height:100%;'");
	this.area.resizeController = this;
//	this.titleArea=ZLM.simulateTag("div style='background:#f0f0ff;width:100%; height:"+this.minH+"px;'");
	this.userArea=ZLM.simulateTag("div style='position:absolute; left:0px; top:"+this.minH+"px; bottom:0px; background:#f0f0ff;width:100%;'");
//	this.area.appendChild(this.titleArea);
	this.area.appendChild(this.userArea);
	this.body.appendChild(this.area);
	this.body.appendChild(this.handle);

	ZLM.registerDragItem(this.handle,this);
	ZLM.setLocalAttribute(this.handle,"onmousedown","ZLM.drag(this,event);");
}

ZRU.ResizeBanner.prototype.setResizable = function(flag) {
	if (flag) {
		this.handle.style.display = "block";
	}
	else {
		this.handle.style.display = "none";
	}
	this.resizeAreaPt(this.ptHeight);
}

ZRU.ResizeBanner.prototype.constrainDragX=function(mgr, wrapper, newX) {
	return(0);
}

ZRU.ResizeBanner.prototype.constrainDragY=function(mgr, wrapper, newY) {
	var minH=this.minH;
	var maxH=2*this.base.offsetHeight-minH;
	if (newY<minH) newY=minH;
	if (newY>maxH) newY=maxH;
	this.resizeAreaPx(newY);
	return(newY);
}

ZRU.ResizeBanner.prototype.setMinHeight=function(min) {
	var h=ZRU.convertToPixels(min);
	this.minH=h;
	if (this.area.offsetHeight<h) this.resizeAreaPx(h);
}

ZRU.ResizeBanner.prototype.setHeightWithUnits=function(h) {
	var tSz = ZRU.convertToPixels(h)+this.handle.pixelHeight;
	this.base.style.height=tSz+"px";
	this.area.style.height=h;
	this.handle.style.top=h;
}

ZRU.ResizeBanner.prototype.resizeAreaPx=function(newSize) {
	var oldH = this.ptHeight;
	var tSz=newSize+this.handle.offsetHeight;
	this.base.style.height=tSz+"px";
	this.area.style.height=newSize+"px";
	this.handle.style.top=newSize+"px";
	var ppr= ZRU.Ruler.getPixelPointRatio();
	this.ptWidth=Math.round(this.area.offsetWidth/ppr);
	this.ptHeight=Math.round(this.area.offsetHeight/ppr);
	if (this.ptHeight!=oldH) {
		this.userResized=true;
	}
	if (this.reshapeNotify) eval(this.reshapeNotify);
}

ZRU.ResizeBanner.prototype.resizeAreaPt=function(newSize) {
	var oldH = this.ptHeight;
	var ppr= ZRU.Ruler.getPixelPointRatio();
//ZLM.cerr("request resize of "+newSize+" pts");
	var hSz = this.handle.offsetHeight/ppr;
	var dSz = this.minH/ppr;
//ZLM.cerr("handle size in points: "+hSz);
//ZLM.cerr("header size in points: "+dSz);
	var tSz=newSize+hSz+dSz;
	this.base.style.height=tSz+"pt";
//ZLM.cerr("Total requested size: "+tSz);
//this.base.className="RESIZE_BASE";
//this.area.className="RESIZE_AREA";
	this.area.style.height=(newSize+dSz)+"pt";
	this.handle.style.top=(newSize+dSz)+"pt";
	this.ptWidth=Math.round(this.area.offsetWidth/ppr);
	this.ptHeight=Math.round(this.userArea.offsetHeight/ppr);
//ZLM.cerr("Resulting banner size in Points: "+this.ptHeight);
	if (this.ptHeight!=oldH) {
		this.userResized=true;
	}
	if (this.reshapeNotify) eval(this.reshapeNotify);
}

//===================
ZRU.convertToPixels=function(lenStr) {
	if (!lenStr) return(0);
	var len=parseFloat(lenStr); // get dimension
	if (lenStr.indexOf("px")>0) return(len);
	if (lenStr.indexOf("in")>0) return(ZRU.convertToPixels(len*72+"pt"));
	if (lenStr.indexOf("cm")>0) return(ZRU.convertToPixels(len*10+"mm"));
	if (lenStr.indexOf("pt")>0) return(len*ZRU.Ruler.getPixelPointRatio());
	if (lenStr.indexOf("mm")>0) return(len*ZRU.Ruler.getPixelMilliRatio());
	return(0);
}

ZRU.convertToPoints=function(lenStr) {
	if (!lenStr) return(0);
	if (typeof(lenStr)=="number") return(lenStr/ZRU.Ruler.getPixelPointRatio());
	var len=parseFloat(lenStr); // get dimension
	if (lenStr.indexOf("pt")>0) return(len); 
	if (lenStr.indexOf("in")>0) return(len*72);
	if (lenStr.indexOf("cm")>0) return(len*10/ZRU.Ruler.getPixelMilliRatio());
	if (lenStr.indexOf("mm")>0) return(len/ZRU.Ruler.getPixelMilliRatio());
	// Everything else, assume pixels
	return(len/ZRU.Ruler.getPixelPointRatio());
}

ZRU.Ruler=function(div) {
	ZLM.initializeObject(this,div,"ZRU.Ruler");
	this.body=null;
	this.setMinimum(div.getAttribute("min"));
	this.setMaximum(div.getAttribute("max"));
	this.setScale(div.getAttribute("scale"));
	this.setUnits(div.getAttribute("units"));
	this.setTicks(div.getAttribute("ticks"));
	if (div.getAttribute("orientation")=="vertical") this.orient="V";
	else this.orient="H";
	this.createBody();
	this.initialized=1;
	return(this);
}

ZRU.Ruler.create=function(min,max,scale,units,ticks,orientation) {
	var div=ZLM.simulateTag("div class='hRuler'");
	if (min!=undefined) div.setAttribute("min",min);
	if (max!=undefined) div.setAttribute("max",max);
	if (scale!=undefined) div.setAttribute("scale",scale);
	if (units!=undefined) div.setAttribute("units",units);
	if (ticks!=undefined) div.setAttribute("ticks",ticks);
	if (orientation!=undefined) div.setAttribute("orientation",orientation);
	return(new ZRU.Ruler(div));
}

ZRU.Ruler.initialize=function() {
	var r = ZLM.getElementsByClassPrefix("ruler",document.body);
	for (var i=0;i<r.length;i++) {
		if (r[i].className=="ruler") {
			if (!r[i].controller) var o=new ZRU.Ruler(r[i]);
		}
	}
}

// return the coefficient needed to convert pixels to points as rendered on the current display
ZRU.Ruler.getPixelPointRatio=function() {
	if (!ZRU.Ruler.PPR) {
		var n=ZLM.makeElement("div",{style:'position:absolute; top:0px; left:0px; width:100pt; height:10pt;'});
		document.body.appendChild(n);
		ZRU.Ruler.PPR=n.offsetWidth/100;
		document.body.removeChild(n);
	}
	return(ZRU.Ruler.PPR);
}

// return the coefficient neede to convert pixels to millimeters as rendered on the current display
ZRU.Ruler.getPixelMilliRatio=function() {
	if (!ZRU.Ruler.PMR) {
		var n=ZLM.makeElement("div",{style:'position:absolute; top:0px; left:0px; width:100mm; height:10mm;'});
		document.body.appendChild(n);
		ZRU.Ruler.PMR=n.offsetWidth/100;
		document.body.removeChild(n);	
	}
	return(ZRU.Ruler.PMR);
}

ZRU.Ruler.prototype.createBody=function() {
	this.body=ZLM.makeElement("div",{style:'position:relative;top:0px;left:0px;width:100%;height:100%;overflow:hidden;font-size:10px;'});
	this.base.appendChild(this.body);
	this.updateTicks();
}

ZRU.Ruler.prototype.updateTicks=function() {
	if (this.orient=="V") this.updateVTicks();
	else this.updateHTicks();
}

ZRU.Ruler.prototype.updateHTicks=function() {
	if (this.tm) {
		for(var i=0;i<this.tm.length;i++) this.body.removeChild(this.tm[i]);
		for(var i=0;i<this.tn.length;i++) this.body.removeChild(this.tn[i]);	
	}
	this.sizeHRuler();
	if (this.units=="E") {
		var u="pt";
		var d=72/this.ticks;
		var a=72;
	}
	else if (this.units="M") {
		var u="mm";
		var d=10/this.ticks;
		var a=10;
	}
	else {
		var u="px";
		var d=16/this.ticks;
		var a=16;
	}
	this.tm=[];
	this.tn=[];
	var m=(this.max-this.min)*a;
	var i=0;
	var x=0;
	while (x<=m) {
		var n=ZLM.makeElement("div",{style:'position:absolute; width:1px; bottom:0px; border-left:1px solid black;'});
		x=i*d;
		if ((x%a)==0) {
			n.style.height="18px";
			txt=x/a;
			var tn=ZLM.makeElement("div",{style:'position:absolute; top:0px;'});
			tn.appendChild(document.createTextNode(txt));
			tn.style.left=(x+1)+u;
			if (u=="pt") tn.style.left=(x+3)+u;
			this.body.appendChild(tn);
			this.tn[this.tn.length]=tn;
		}
		else if ((x%(a/2))==0) n.style.height="12px";
		else n.style.height="6px";
		n.style.left=x+u;
		this.body.appendChild(n);
		this.tm[i]=n;
		i++;
	}
}

ZRU.Ruler.prototype.updateVTicks=function() {
	if (this.tm) {
		for(var i=0;i<this.tm.length;i++) this.body.removeChild(this.tm[i]);
		for(var i=0;i<this.tn.length;i++) this.body.removeChild(this.tn[i]);	
	}
	this.sizeVRuler();
	if (this.units=="E") {
		var u="pt";
		var d=72/this.ticks;
		var a=72;
	}
	else if (this.units="M") {
		var u="mm";
		var d=10/this.ticks;
		var a=10;
	}
	else {
		var u="px";
		var d=16/this.ticks;
		var a=16;
	}
	this.tm=[];
	this.tn=[];
	var m=(this.max-this.min)*a;
	var i=0;
	var x=0;
	while (x<=m) {
		var n=ZLM.makeElement("div",{style:'position:absolute; height:1px; right:0px; border-top:1px solid black;'});
		x=i*d;
		if ((x%a)==0) {
			n.style.width="18px";
			txt=x/a;
			var tn=ZLM.makeElement("div",{style:'position:absolute; left:1px;'});
			tn.appendChild(document.createTextNode(txt));
			tn.style.top=(x)+u;
			this.body.appendChild(tn);
			this.tn[this.tn.length]=tn;
		}
		else if ((x%(a/2))==0) n.style.width="12px";
		else n.style.width="6px";
		n.style.top=x+u;
		this.body.appendChild(n);
		this.tm[i]=n;
		i++;
	}
}

ZRU.Ruler.prototype.sizeRuler=function() {
	if (this.orient=="V") this.sizeVRuler();
	else this.sizeHRuler();
}

ZRU.Ruler.prototype.sizeHRuler=function() {
	this.base.style.height="25px";
	var range=this.max-this.min;
	if (this.units=="E") this.base.style.width=(range*72)+"pt";
	else if (this.units="M") this.base.style.width=(range*10)+"mm";
	else this.base.style.width=(range*16)+"px";
}

ZRU.Ruler.prototype.sizeVRuler=function() {
	this.base.style.width="25px";
	var range=this.max-this.min;
	if (this.units=="E") this.base.style.height=(range*72)+"pt";
	else if (this.units="M") this.base.style.height=(range*10)+"mm";
	else this.base.style.height=(range*16)+"px";
}

ZRU.Ruler.prototype.setBackground=function(clr) {
	this.bgColor=clr;
	this.base.style.background=clr;
}

ZRU.Ruler.prototype.setForeground=function(clr) {
	this.fgColor=clr;
//SET COLOR OF TICKS AND MARKERS HERE
}


ZRU.Ruler.prototype.setMinimum=function(x) {
	if (x!=undefined)this.min=parseFloat(x);
	else this.min=0;
}

ZRU.Ruler.prototype.setMaximum=function(x) {
	if (x!=undefined)this.max=parseFloat(x);
	else this.min=1;
}

ZRU.Ruler.prototype.setScale=function(x) {
	if (x!=undefined)this.scale=parseInt(x,10);
	else this.scale=1;
}

ZRU.Ruler.prototype.setUnits=function(x) {
	if (x=="in")this.units="E";
	else if (x=="cm") this.units="M";
	else this.units="S";
}

ZRU.Ruler.prototype.setTicks=function(x) {
	if (x!=undefined)this.ticks=parseInt(x,10);
	else {
		if (this.units="E") this.ticks=8;
		else if (this.units="M") this.ticks=5;
		else this.ticks=4;
	}
}

//====================================================================================
// GENERIC UTILITY STUFF STARTS HERE ...
//====================================================================================
ZRU.makeCaptionString=function(fieldName) {
	if (fieldName.charAt(0)!="!") { // Not a caption may have path that needs resolving
		var sName = fieldName.split('/');
		fieldName = sName[sName.length-1];
	}
	if (fieldName.indexOf("$")==0) { // DVAR
		return(fieldName.substring(1).toUpperCase());
	}
	else if (fieldName.indexOf('!')==0) { // CAPN
		return(fieldName.substring(1).toUpperCase());
	}
	else if (fieldName.indexOf('@')==0) { // ATTR
		return(fieldName.substring(1).toUpperCase());	
	}
	else { // ELEM
		return(fieldName.toUpperCase());
	}
	return("");
}

ZRU.makeAvatarString=function(fieldName) {
	if (fieldName.charAt(0)!="!") { // Not a caption may have path that needs resolving
		var sName = fieldName.split('/');
		fieldName = sName[sName.length-1];
	}
	if (fieldName.indexOf("$")==0) { // DVAR
		return("("+fieldName+")");
	}
	else if (fieldName.indexOf('!')==0) { // CAPN
		return(fieldName.substring(1));
	}
	else if (fieldName.indexOf('@')==0) {  // ATTR
		return("{"+fieldName.substring(1)+"}");	
	}
	else { // ELEM
		return("{"+fieldName+"}");
	}
	return("");
}

ZRU.classifyTextDatum=function(fieldName) {
	if (fieldName.charAt(0)!="!") { // Not a caption may have path that needs resolving
		var sName = fieldName.split('/');
		fieldName = sName[sName.length-1];
	}
	if (fieldName.indexOf("$")==0) { // DVAR
		return("DVAR");
	}
	else if (fieldName.indexOf('!')==0) { // CAPN
		return("CAPN");
	}
	else if (fieldName.indexOf('@')==0) {  // ATTR
		return("ATTR");	
	}
	else { // ELEM
		return("ELEM");
	}
	return("UKN");
}

ZRU.getCaretPosition=function(txtBox) {
	var pos = 0;
	if (document.selection) { 	// IE Support
		txtBox.focus ();
		var sel = document.selection.createRange ();
		sel.moveStart ('character', -ctrl.value.length);
		pos = sel.text.length;
	}
	else if (txtBox.selectionStart || txtBox.selectionStart == '0') {
		pos = txtBox.selectionStart;
	}
	return (pos);
}


ZRU.setCaretPosition=function(txtBox, pos) {
	if(txtBox.setSelectionRange) {
		txtBox.focus();
		txtBox.setSelectionRange(pos,pos);
	}
	else if (txtBox.createTextRange) {
		var range = txtBox.createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
}

ZRU.getDisplayPropertyPanel=function() {
	if (!ZRU._displayPropertyPanel) ZRU._displayPropertyPanel = zenPage._editor.getDisplayPropertyPanel();
	return(ZRU._displayPropertyPanel);
}

ZRU.locateEvent = function(e,ref) {
	var ofsX = 0;
	var ofsY = 0;
	if (ref) {	
		var who = e.target;
		while (who && who!=ref && who!=document.body) {
			ofsX+=who.offsetLeft;
			ofsY+=who.offsetTop;
			who = who.offsetParent;
		}
	}
	var l = {};
	l.x = 0;
	l.y = 0;
	if (e.offsetX) { // Webkit style
		l.x = e.offsetX;
		l.y = e.offsetY;
	}
	else { // Firefox style
		l.x = e.layerX;
		l.y = e.layerY;
	}
	l.x += ofsX;
	l.y += ofsY;
	return(l);
}

ZRU.saveGeometry=function(gc) {
	var o = {};
	o.t = gc.sizeTop;
	o.l = gc.sizeLeft;
	o.w = gc.sizeWidth;
	o.h = gc.sizeHeight;
	return(o);
}

ZRU.restoreGeometry=function(gc,o) {
	gc.sizeTop = o.t;
	gc.sizeLeft = o.l;
	gc.sizeWidth = o.w;
	gc.sizeHeight = o.h;
}

ZRU.initGC=function() {
	if (zenPage && zenPage._editor && zenPage._editor._defaultGC) return(zenPage._editor._defaultGC);
	var g = {
		'strokeApropos':true,
		'strokeColor':'#000000',
		'strokeOpacity':100,
		'strokeWidth':1,
		'strokeStyle':'solid',
		
		'fillApropos':true,
		'fillColor':'#ffffff',
		'fillOpacity':0,

		'textApropos':true,
		'textColor':'#000000',
		'textOpacity':100,
		'textBold':false,
		'textItalic':false,
		'textUnderline':false,
		'textSize':12,
		'textJustify':'left',
		'textFont':'sans-serif',

		'tableApropos':true,
		'tableBorder':false,
		'tableHeaderBorder':false,
		'tableHeaderBodyDivider':false,
		'tableHeaderColumnDivider':false,
		'tableBodyColumnDivider':false,
		'tableBodyRowDivider':false,
		'tableZebraStripe':false,
		'tableZebraColor':'#bfffcf',
		
		'sizeApropos':false,
		'sizeWidth':0,
		'sizeHeight':0,
		'sizeTop':0,
		'sizeLeft':0
	}
	return(g);

}

/// Given a sorted array, return a trimmed version that omits all duplicate entries
ZRU.killDups=function(a) {
	var out=[];
	var l = a.length;
	out[0]=a[0];
	var last = a[0];
	for (var i=1;i<l;i++) {
		var n = a[i];
		if (n!=last) {
			out.push(n);
			last = n;
		}
	}
	return(out);
}

/// Return a sorted version of the given array using the mergeSort algorithm
ZRU.mergeSort=function(a) {
	var l = a.length;
	if (l<=1) return(a);
	var left = [];
	var right = [];
	var result = null;
	var middle = Math.ceil(l/2);
	for (var i=0;i<middle;i++) left[i]=a[i];
	while (i<l) {
		right[i-middle]=a[i];
		i++;
	}
	left = ZRU.mergeSort(left);
	right = ZRU.mergeSort(right);
	result = ZRU.merge(left,right);
	return(result);
}

/// Merge two sorted arrays into one
ZRU.merge=function(l,r) {
	var out = [];
	var lIdx = 0;
	var rIdx = 0;
	var lLen = l.length;
	var rLen = r.length;
	while (lIdx<lLen || rIdx<rLen) {
		if (lIdx<lLen && rIdx<rLen) {
			if (l[lIdx]<=r[rIdx]) out.push(l[lIdx++]);
			else out.push(r[rIdx++]);
		}
		else if (lIdx<lLen) {
			while (lIdx<lLen) out.push(l[lIdx++]);
		}
		else {
			while (rIdx<rLen) out.push(r[rIdx++]);
		}
	}
	return(out);
}
