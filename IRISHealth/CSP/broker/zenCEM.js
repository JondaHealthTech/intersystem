if (!ZCE) var ZCE={};

//===========================================//
// Simplified nodes for holding non DOM data //
//===========================================//
ZCE.Node=function(name) {
	this.initNode(name);
}

ZCE.Node.prototype.initNode=function(name) {
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

ZCE.Node.prototype.appendChild=function(newChild) {
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

ZCE.Node.prototype.hasChildNodes=function() {
	if (this.childNodes.length>0) return(true);
	return(false);
}

//ZCE.Node.prototype.insertBefore=function() {
//}

ZCE.Node.prototype.removeChild=function(n) {
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

ZCE.Node.prototype.replaceChild=function(newC,oldC) {
	if (newC.parentNode) newC.parentNode.removeChild(newC);
	newC.parentNode=oldC.parentNode;
	newC.previousSibling=oldC.previousSibling;
	newC.nextSibling=oldC.nextSibling;
	if (newC.previousSibling) {
		newC.previousSibling.nextSibling=newC;
	}
	if (newC.nextSibling) {
		newC.nextSibling.previousSibling=newC;
	}

	var idx=0;
	while (idx<this.childNodes.length) {
		if (this.childNodes[idx]==oldC) {
			this.childNodes[idx]=newC;
			this.firstChild=this.childNodes[0];
			this.lastChild=this.childNodes[this.childNodes.length-1];
			return;
		}
		idx++;
	}
}

ZCE.Node.prototype.addAttribute=function(attName,value) {
	var idx=this.attributes.length;
	this.attributes[idx]=attName;
	this.attValues[idx]=value;
}

ZCE.Node.prototype.getAttributeIdx=function(attName) {
	for (var i=0;i<this.attributes.length;i++) {
		if (this.attributes[i]==attName) return(i);
	}
	return(-1);
}

ZCE.Node.prototype.getAttribute=function(attName) {
	var idx=this.getAttributeIdx(attName);
	if (idx==-1) return(null);
	return(this.attValues[idx]);
}

ZCE.Node.prototype.setAttribute=function(attName,value) {
	var idx=this.getAttributeIdx(attName);
	if (idx==-1) return;
	this.attValues[idx]=value;	
}

ZCE.Node.prototype.getChildrenByName=function(tagName) {
	var a=[];
	a = this.seekChildrenByName(a,tagName);
	return(a);
}

ZCE.Node.prototype.seekChildrenByName=function(a,tagName) {
	if (this.nodeName==tagName) a[a.length]=this;
	for (var p=this.firstChild;p!=null;p=p.nextSibling)a=p.seekChildrenByName(a,tagName);
	return(a);
}

//====================================================================================================
if (!ZCE) var ZCE={};

ZCE.makeHTMLSafe=function(str) {
	var bA = str.split('&');
	var s = bA.join('&amp;');
	var bA = s.split('<');
	var s = bA.join('&lt;');
	return(s);
}
/*
   An line edit box should take a span element, superimpose itself on top, hide all textbox ornimentation
   and allow in place editing, expanding the underlying span as we go
*/
ZCE.InlineEdit=function(div) {
	ZLM.initializeObject(this,div,"ZCE.InlineEdit");
	this.value=null; // edit body as string
	this.buffer=[]; // edit body, stored as 1 char/cell
	this.xIdx=[]; // width of each char in body
	this.auto=null; // autocomplete options
	this.strict=false; // Only accept values from the autocomplete list
	this.charWidth={}; // Table of character widths;
	this.codeMode = false;
	this.selectionStart=-1;
	this.selectionEnd=-1;
	this.cursorIdx=0;
	this.delimit=null;

	this.onchange=null;
	this.onexit=null;

	this.createBody();
	this.createKeyTrap();
};

ZCE.InlineEdit.create=function() {
	var div=document.createElement("SPAN");
	div.style.position="relative";
	div.className="ZCE_INLINE_EDIT";
	return(new ZCE.InlineEdit(div));
};

ZCE.InlineEdit.prototype.createBody=function() {
	// In the floating binding, we create a <span> that serves as the parent node.
	// it will bave four children: 
	// firstChild will be lead delimitor, if any 
	// nextchild will be the node being edited  
	// nextChild will be the autocompletion, if any;
	// nextChild will be close delimitor, if any
	// nextChild will be dummy span used for getting size metrics
	// lastChild will be absolutely positioned div used as a cursor
	this.leadSpan=document.createElement("SPAN");
	this.base.appendChild(this.leadSpan); 
	this.autoSpan=document.createElement("SPAN");
	this.autoSpan.style.background="#bbbbbb";
	this.autoSpan.style.opacity="0.7";
	this.base.appendChild(this.autoSpan); 
	this.closeSpan=document.createElement("SPAN");
	this.base.appendChild(this.closeSpan); 
	this.sizeSpan=document.createElement("SPAN");
	this.base.appendChild(this.sizeSpan);
	this.makeCursor();
};

ZCE.InlineEdit.prototype.createKeyTrap=function() {
	var filter=ZLM.KeysControlEdit+','+ZLM.KeysControlNavigate+','+ZLM.KeysPrintable;
	ZLM.registerKeyFilter(filter,this.objHook+"serviceKeyboard(fullCode,event);","InlineEdit"+this.instanceNum);
};

ZCE.InlineEdit.prototype.makeCursor=function() {
	this.cursor=ZLM.makeElement("div",{style:'position:absolute; height:100%; width:3px; border-left:1px solid black; top:0px; left:0px;'});
	var d=ZLM.makeElement("div",{style:'position:relative; height:95%; width:3px; border-top:1px solid black; border-bottom:1px solid black; top:0px; left:-2px;'});
	this.cursor.appendChild(d);
	this.base.appendChild(this.cursor);
};

ZCE.InlineEdit.prototype.setOnChangeHandler=function(cb) {
	this.onchange = cb;
};

ZCE.InlineEdit.prototype.setOnExitHandler=function(cb) {
	this.onexit = cb;
};

ZCE.InlineEdit.prototype.setAutoCompleteList=function(a,strict) {
	this.auto=a;
	if (strict) this.strict=true;
};

ZCE.InlineEdit.prototype.setCursorIndex=function(col) {
	this.cursorIdx = col;
};

ZCE.InlineEdit.prototype.invokeOnChangeHandler=function() {
	if (this.onchange) eval(this.onchange);
};

ZCE.InlineEdit.prototype.invokeOnExitHandler=function(reason) {
	if (this.onexit) eval(this.onexit);
};

ZCE.InlineEdit.prototype.copyTextStyle=function(sp) {
	var s = null;
	if (window.getComputedStyle) {
		s = window.getComputedStyle(sp,null);
	}
	else s = sp.currentStyle;
	if (s) {
		var cs=this.base.style;
		cs.color=s.color;
		cs.fontFamily=s.fontFamily;
		cs.fontSize=s.fontSize;
		cs.fontSizeAdjust=s.fontSizeAdjust;
		cs.fontStretch=s.fontStretch;
		cs.fontStyle=s.fontStyle;
		cs.fontVarient=s.fontVarient;
		cs.fontWeight=s.fontWeight;
		cs.letterSpacing=s.letterSpacing;
		cs.lineHeight=s.lineHeight;
		cs.textDecoration=s.textDecoration;
		cs.textIndent=s.textIndent;
		cs.textShadow=s.textShadow;
		cs.textTransform=s.textTransform;
		cs.opacity=s.opacity;
		cs.textAlign="left";
	}
	this.clearWidthTable();
};

ZCE.InlineEdit.prototype.edit=function(sp) {
	if (this.active) this.advanceFocus();
	if (!sp) return;
	this.active=true;
	this.target=sp;
	if (this.codeMode) {
		this.initCodeBuffer();
	}
	else {
		this.copyTextStyle(sp);
		sp.parentNode.replaceChild(this.base,sp);
		this.base.insertBefore(sp,this.autoSpan);
		this.initBuffer();
	}
	ZLM.pushKeyContext("InlineEdit"+this.instanceNum);
//	window.focus();
	this.updateAvatar();
};

ZCE.InlineEdit.prototype.editAsString=function(sp,delimit) {
	if (this.active){
		this.advanceFocus();
		this.active=false;
	}
	this.delimit=delimit;
	this.edit(sp);
};

// edit the given span as a line of code
ZCE.InlineEdit.prototype.editAsCode=function(sp,col) {
	if (this.active){
		this.advanceFocus();
		this.active=false;
	}
	this.delimit=null;
	this.codeMode=true;
	this.edit(sp);
	if (col) {
		this.cursorIdx = col;
		this.updateCursor();
	}
};

ZCE.InlineEdit.prototype.clearWidthTable=function() {
	for (var p in this.charWidth) this.charWidth[p]=null;
};

ZCE.InlineEdit.prototype.sizeSpaceChar=function() {
	var s=this.sizeSpan;
	s.innerHTML='||';
	var bW=s.offsetWidth;
	s.innerHTML='| |';
	this.charWidth["space"]=s.offsetWidth-bW;
	s.innerHTML='';
};

ZCE.InlineEdit.prototype.sizeChar=function(ch) {
	if (ch=='space') this.sizeSpaceChar();
	else {
		this.sizeSpan.innerHTML=ch;
		this.charWidth[ch]=this.sizeSpan.offsetWidth;
		this.sizeSpan.innerHTML='';
	}
};

ZCE.InlineEdit.prototype.initBuffer=function() {
	if (this.delimit) {
		this.leadSpan.innerHTML=this.delimit;
		this.closeSpan.innerHTML=this.delimit;
	}
	else {
		this.leadSpan.innerHTML="";
		this.closeSpan.innerHTML="";
	}
	this.buffer=[];
	this.xIdx=[];
	this.spaceWidth=this.sizeSpaceChar();
	var s=this.target.innerHTML;

	var w=this.charWidth;
	for (var i=0;i<s.length;i++) {
		var c=s.charAt(i);
		if (!(c==this.delimit && (i==0 || i==s.length-1))) {
			this.buffer.push(c);
			if (!w[c]) this.sizeChar(c);
			this.xIdx.push(w[c]);
		}			
	}
};

// given monospaced text in this.target, build up a buffer of where each character begins
// if that target isn't already a coordintate system, make it one and add a cursor
ZCE.InlineEdit.prototype.initCodeBuffer=function() {
	this.leadSpan.innerHTML="";
	this.closeSpan.innerHTML="";
	this.buffer=[];
	this.xIdx=[];
	var s=this.target.innerHTML;
	if (s.length==0) {
		this.target.innerHTML = "M";
		this.spaceWidth = this.target.offsetWidth;
	}
	else this.spaceWidth=this.target.offsetWidth/s.length;
//ZLM.cerr(this.spaceWidth);
	var w=this.charWidth;
	for (var i=0;i<s.length;i++) {
		var c=s.charAt(i);
		if (!(c==this.delimit && (i==0 || i==s.length-1))) {
			this.buffer.push(c);
			if (!w[c]) w[c]=this.spaceWidth;
			this.xIdx.push(w[c]);
		}			
	}
	var pos = this.target.style.position;
	if (!(pos=='absolute' || pos=='relative')) {
		var s = this.target.style;
		s.position = 'relative';
		s.top = '0px';
		s.left = '0px';
	}
};

ZCE.InlineEdit.prototype.updateCursor=function() {
//ZLM.cerr("move cursor to "+this.cursorIdx);
	if (this.codeMode) {
		if (this.cursor.parentNode!=this.target) this.target.appendChild(this.cursor);		
		this.cursor.style.left = this.cursorIdx*this.spaceWidth+"px";
//ZLM.cerr(this.cursor.style.left);
	}
	else {
		var o=this.leadSpan.offsetWidth;
		for (var i=0;i<this.cursorIdx;i++) o+=this.xIdx[i];
		this.cursor.style.left=o+"px";
	}
};

ZCE.InlineEdit.prototype.verifyBuffer=function() {
	if (!this.strict) return;
	var a=this.auto;
	if (!a) return;
	var b=this.buffer;
	var v=b.join('');
	while (b.length>0) {
		for (var i=0;i<a.length;i++) {
			if (a[i].indexOf(v)==0) return;
		}
		v = v.toLowerCase();
		for (var i=0;i<a.length;i++) {
			if (a[i].toLowerCase().indexOf(v)==0) {
				this.buffer = a[i].split('',v.length);
				return;
			}
		}
		b.pop();
		v=b.join('');
		if (this.cursorIdx>b.length)this.cursorIdx=b.length;
	}
};

ZCE.InlineEdit.prototype.updateAutoComplete=function() {
	var a=this.auto;
	var v=this.value;
	for (var i=0;i<a.length;i++) {
		if (a[i].indexOf(v)==0) {
			var s=a[i].substring(v.length);
			this.autoSpan.innerHTML=s;
			return;
		}
	}
//ZLM.cerr('no completion value in range for '+v);
	this.autoSpan.innerHTML='';
};

ZCE.InlineEdit.prototype.updateAvatar=function() {
	this.verifyBuffer();
	this.value=this.buffer.join('');
	this.target.innerHTML=ZCE.makeHTMLSafe(this.value);
	this.updateCursor();
//ZLM.cerr(this.value);
	if (this.auto) this.updateAutoComplete();
	this.invokeOnChangeHandler();
};

ZCE.InlineEdit.prototype.exit=function(reason) {
	this.invokeOnExitHandler(reason);
	return(true);
}

ZCE.InlineEdit.prototype.serviceKeyboard=function(key,event) {
//ZLM.cerr("Saw key : "+key);

	var ctrlKey=true;
	if (key=='tab') {
		if (this.codeMode) return(this.exit('TAB'));
		if (this.strict) return(this.acceptAutoComplete());
		return(this.advanceFocus());
	}
	if (key=='return') {
		if (this.codeMode) return(this.exit('RETURN'));
		return(this.acceptAutoComplete());
	}
	if (ZLM.KeysPrintable.indexOf(key)>=0) ctrlKey=false;
	if (key.indexOf("shift-")==0) {
		var baseKey=key.substring(6);
		if (ZLM.KeysPrintable.indexOf(baseKey)>=0) {
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


ZCE.InlineEdit.prototype.advanceFocus=function() {
	if (this.delimit) {
		this.value=this.delimit+this.value+this.delimit;
		this.delimit=null;
	}
	this.target.innerHTML=this.value;
	if (!this.codeMode) {
		this.target.controller.nodeValue=this.value;
		this.base.parentNode.replaceChild(this.target,this.base);
	}
	ZLM.popKeyContext("InlineEdit"+this.instanceNum);
	this.active=false;
	this.cursorIdx=0;
	this.autoSpan.innerHTML="";
	return(true);
};

ZCE.InlineEdit.prototype.acceptAutoComplete=function() {
	this.value+=this.autoSpan.innerHTML;
	return(this.advanceFocus());
};

// insert a character into the current span
ZCE.InlineEdit.prototype.insertChar=function(ch) {
	var b=this.buffer;
	var w=this.cursorIdx;
	var idx=b.length;
	while (idx>w) {
		b[idx]=b[idx-1];
		idx--;
	}
	if (ch=='space') b[idx]=' ';
	else b[idx]=ch;
	if (!this.charWidth[ch]) this.sizeChar(ch);
	this.xIdx[idx]=this.charWidth[ch];			
	this.cursorIdx++;
	this.updateAvatar();
	return(true);
};

ZCE.InlineEdit.prototype.advanceChar=function() {
	this.cursorIdx++;
	if (this.cursorIdx>this.buffer.length) {
		if (this.codeMode) return(this.exit('CHAR_RIGHT')); 
		this.cursorIdx=this.buffer.length;
	}
	this.updateCursor();
	return(true);
};

ZCE.InlineEdit.prototype.retreatChar=function() {
	this.cursorIdx--;
	if (this.cursorIdx<0) {
		if (this.codeMode) return(this.exit('CHAR_LEFT'));
		this.cursorIdx=0;
	}
	this.updateCursor();
	return(true);
};

ZCE.InlineEdit.prototype.advanceWord=function() {
	var b=this.buffer;
	var i=this.cursorIdx;
	while (b[i]!=' ' && i<b.length) i++;
	while (b[i]==' ' && i<b.length) i++;
	if (this.codeMode && i==b.length) return(this.exit('WORD_RIGHT'));
	this.cursorIdx=i;
	this.updateCursor();
	return(true);
};

ZCE.InlineEdit.prototype.retreatWord=function() {
	var b=this.buffer;
	var i=this.cursorIdx;
	if (this.codeMode && i==0) return(this.exit('WORD_LEFT'));
	while (b[i]!=' ' && i>=0) i--;
	while (b[i]==' ' && i>=0) i--;
	while (b[i]!=' ' && i>=0) i--;
	if (i<0) i=0;
	if (b[i]==' ') i++;
	this.cursorIdx=i;
	this.updateCursor();
	return(true);
};


ZCE.InlineEdit.prototype.advanceEOL=function() {
	if (this.codeMode) return(this.exit('END'));
	this.cursorIdx=this.buffer.length;
	this.updateCursor();
	return(true);
};

ZCE.InlineEdit.prototype.retreatSOL=function() {
	if (this.codeMode) return(this.exit('HOME'));
	this.cursorIdx=0;
	this.updateCursor();
	return(true);
};

ZCE.InlineEdit.prototype.selectAll=function() {
	return(true);
};

ZCE.InlineEdit.prototype.extendRight=function() {
	return(true);
};

ZCE.InlineEdit.prototype.extendLeft=function() {
	return(true);
};

ZCE.InlineEdit.prototype.extendSOL=function() {
	return(true);
};

ZCE.InlineEdit.prototype.extendEOL=function() {
	return(true);
};

ZCE.InlineEdit.prototype.extendNextWord=function() {
	return(true);
};

ZCE.InlineEdit.prototype.extendPrevWord=function() {
	return(true);
};

ZCE.InlineEdit.prototype.cut=function() {
	return(true);
};

ZCE.InlineEdit.prototype.copy=function() {
	return(true);
};

ZCE.InlineEdit.prototype.paste=function() {
ZLM.cerr('Attempt to paste');
ZLM.cerr(this.controller.apiBuffer.value);
	return(true);
};

ZCE.InlineEdit.prototype.deleteChar=function() {
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

ZCE.InlineEdit.prototype.backspace=function() {
	if (this.cursorIdx>0) this.cursorIdx--;
	return(this.deleteChar());
};

ZCE.InlineEdit.prototype.deleteToNextWord=function() {
	return(true);
};

ZCE.InlineEdit.prototype.deleteToPrevWord=function() {
	return(true);
};

//=====================================================================================
ZCE.CodeEditor = function(div) {
	ZLM.initializeObject(this,div,"ZCE.CodeEditor");
//ZLM.setLocalAttribute(this.base,"onmouseout",this.objHook+"resetActive();");
	this.id = div.id;
	this.value = null;		// nominal value of edit body
	this.multiline = true;		// tab & return are body characters not field navigation chars
	this.nextFocus = null;		// who should get the focus next when done editing
	this.changed = false;		// body of value needs to be extracted
	this.tabStop = 8;		// width of a tab stop in character
	this.font = "monospace";	// default font for the editor
	this.size = "12px"		// default font size
	this.gaugeFontSize();
	this.createBody();
	this.renderText(this.value);
};

ZCE.CodeEditor.create=function() {
	var div=ZLM.makeElement("div",{'class':'codeEditor'}); 
	return(new ZCE.CodeEditor(div));
};

ZCE.CodeEditor.initialize=function() {
	var bi = ZLM.getElementsByClassPrefix("codeEditor",document.body);
	for (var i=0;i<bi.length;i++) {
		if (bi[i].className=="codeEditor") {
			if (!bi[i].controller) var o=new ZCE.CodeEditor(bi[i]);
		};
	};
};

ZCE.CodeEditor.prototype.createBody=function() {
	this.area = ZLM.makeElement("div",{id:this.id+"_textArea", 'class':"codeEditorBody", onmousedown:"this.controller.registerDown(event);", onmouseup:"this.controller.trackMouse(event);"});
	this.area.controller = this;
this.apiBuffer = ZLM.makeElement("input",{id:this.id+"_apiBuffer", type:"text", style:"display:none"});
this.apiBuffer.controller = this;

//this.cursor = ZLM.makeElement("div",{id:this.id+"_cursor", style:"position:absolute;top:0px;left:0px;width:1px;height:0px;background:#000077;line-height:0px;font-size:0px;"});
//this.cursor.controller = this;
	ZLM.initKeyboardHandler();
	this.editor = ZCE.InlineEdit.create();
this.editor.controller = this;
	this.editor.setOnChangeHandler(this.objHook+"handleSpanEdit(this);");
	this.editor.setOnExitHandler(this.objHook+"handleSpanExit(this,reason);");
	this.base.appendChild(this.area);
this.base.appendChild(this.apiBuffer);
};

ZCE.CodeEditor.prototype.setFont = function(font,size) {
	this.font = font;
	this.size = size;
	this.gaugeFontSize();
	this.refresh();
};

ZCE.CodeEditor.prototype.setTabStopSize = function(n) {
	this.tabStop = n;
	this.refresh();
};

ZCE.CodeEditor.prototype.setValue=function(v) {
//ZLM.cerr("setting value to "+v);
	this.value = v;
	this.changed=false;
	this.renderText(v);
};

ZCE.CodeEditor.prototype.getValue=function() {
	this.value = this.extractValue();	
	return(this.value);
};

ZCE.CodeEditor.prototype.getValueString=function() {
	return(this.extractQuotedValue());
};

ZCE.CodeEditor.prototype.handleSpanEdit=function(who) {
/*
	var sp = who.target;
	var spanId = sp.id;
	var spanStr = null;
	if (sp.textContent) spanStr = sp.textContent;
	else if (sp.innerText) spanStr = sp.innerText;

ZLM.cerr(spanId+": "+spanStr);
*/
	this.refreshLine(who.target);	
};

ZCE.CodeEditor.prototype.parseId=function(idStr) {
	var idA=idStr.split('_');
	var last = idA.length-1;
	var line = parseInt(idA[last-2],10);
	var section = parseInt(idA[last],10);
	return({'line':line,'section':section});
}

ZCE.CodeEditor.prototype.handleSpanExit=function(who,reason) {
/* 
loosing focus triggers
MOUSE_CLICK - user clicked focus elsewhere
TAB - tab key breaks this span in two
RETURN - return key breaks this span in two 
ARROW_UP - up arrow anywhere
ARROW_DOWN - down arrow anywhere
DELETE_RIGHT - delete key hit at end of span
BACKSPACE_LEFT - backspace key hit at start of span
END - request to move to end of line
HOME - request to move to start of line
*/
ZLM.cerr("Exit span on "+reason);
// SHOULD COPY VALUE BACK FROM SPAN INTO MASTER BUF ARRAY
	switch (reason) {
		case "CHAR_LEFT":
			var p = who.target.previousSibling;
			if (p) {
				var col = p.innerHTML.length;
				this.editor.editAsCode(p,col);
			}
			break;
		case "WORD_LEFT":
			var p = who.target.previousSibling;
			if (p) {
				var idx = this.parseId(p.id);
				var s = this.buf[idx.line][idx.section];
				var col = s.lastIndexOf(' ')+1;
				this.editor.editAsCode(p,col);
			}
			break; 
		case "WORD_RIGHT":
		case "CHAR_RIGHT":
			var p = who.target.nextSibling;
			if (p) this.editor.editAsCode(p,0);
			break;
		case "LINE_UP": 
			var idx = this.parseId(who.target.id);
			if (idx.line==0) return;
			var x = who.target.offsetLeft+who.cursorIdx*this._CWIDTH;
ZLM.cerr(who.target.offsetLeft+' + '+who.cursorIdx+' * '+this._CWIDTH);
			var where = this.locateHit(idx.line-1,x);
			this.editor.editAsCode(where.span,where.column);
			break;
		case "LINE_DOWN": 
			var idx = this.parseId(who.target.id);
			if (idx.line>=this.buf.length-1) return;
			var x = who.target.offsetLeft+who.cursorIdx*this._CWIDTH;
ZLM.cerr(who.target.offsetLeft+' + '+who.cursorIdx+' * '+this._CWIDTH);
			var where = this.locateHit(idx.line+1,x);
			this.editor.editAsCode(where.span,where.column);
			break;
	}
 
};

// Extract the contents of the editor as a string with embedded tabs and newlines
ZCE.CodeEditor.prototype.extractValue=function() {
};

// Extract the contents of the editor as a string with embedded tabs and newlines
// while also quoting characters that could prove problematic with JSON or XML
ZCE.CodeEditor.prototype.extractQuotedValue=function() {
};

ZCE.CodeEditor.prototype.refresh=function() {
	if (this.changed) this.value = this.extractValue();
	this.renderText(this.value);
};

// Given a long string with embedded newlines and tab characters, break the body up 
// into segments that fill spans for easier editor scoping.
ZCE.CodeEditor.prototype.renderText=function(str) {
	var d = this.area;
	this.buf = [];
	if (!str || str.length==0) {
		d.innerHTML="";
		return;
	}
	var tabW = this.tabStop*this._CWIDTH;
	var chrW = this._CWIDTH;
	var lineH = this._CHEIGHT;
	
	var h = [];
	// these are the line breaks
	var l = str.split('\n');
	this._lastLine = l.length-1;
	var y = 0;
	for (var i=0;i<l.length;i++) {
		var x=0;
		var sp = l[i].split('\t');
		for (var j=0;j<sp.length;j++) {
			var lbl = this.id+'_line_'+i+'_s_'+j;			
			h.push("<div id='"+lbl+"' style='position:absolute;top:"+y+"px;left:"+x+"px; height:"+lineH+"px;cursor:default;'>");
			h.push(ZCE.makeHTMLSafe(sp[j]));
			h.push("</div>");
			x +=Math.ceil((sp[j].length*chrW+1)/tabW)*tabW;
		}
		this.buf[i]=sp;
		y+=lineH;  
	}
	d.innerHTML = h.join("");
}

// Given a div as a starting point, refresh the line containing that div from the end of
// that div forward (assume the div itself is already refreshed.
ZCE.CodeEditor.prototype.refreshLine=function(div) {
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
}

// record the size of a character in the current font at the current font size. Note that this
// widget is intended for editing source code it is not an arbitrary WYSIWYG editor.  As such it 
// is only designed to work with monospaced fonts
ZCE.CodeEditor.prototype.gaugeFontSize = function() {
	var d = ZLM.makeElement("div",{style:'position:absolute;top:0px;left:0px;font:'+this.size+' '+this.font+';'});
	d.appendChild(document.createTextNode('M'));
	document.body.appendChild(d);
	this._CWIDTH = d.offsetWidth;
	this._CHEIGHT = d.offsetHeight;
	document.body.removeChild(d);
	if (this.cursor) this.cursor.style.height = this._CHEIGHT+"px";
};

ZCE.CodeEditor.prototype.registerDown=function(event) {
	var d = this.area;
	this._mSL = Math.floor((event.clientY-d.offsetTop)/this._CHEIGHT);
	this._mSPx = event.clientX-d.offsetLeft;
};

ZCE.CodeEditor.prototype.trackMouse=function(event) {
	var d = this.area;
	this._mEL = Math.floor((event.clientY-d.offsetTop)/this._CHEIGHT);
	this._mEPx = event.clientX-d.offsetLeft;
	if (this._mSL==this._mEL && this._mSPx==this._mEPx) {
		this.handleSingleClick(event);

	}
	else {
//ZLM.cerr(mouseStartLine+":"+mouseStartPx+" vs. "+mouseEndLine+":"+mouseEndPx);
	}
};

ZCE.CodeEditor.prototype.locateHit=function(l,px) {
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
}

// Position the cursor based on a mouse click at internal location (mEL,mEPx)
ZCE.CodeEditor.prototype.handleSingleClick=function(event) {
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
this.apiBuffer.focus();
	this.editor.editAsCode(d,col);
};

//=====================================================================================

ZCE.ExpressionEditor=function(div) {
	ZLM.initializeObject(this,div,"ZCE.ExpressionEditor");
	ZLM.setLocalAttribute(this.base,"ondatadrag",this.objHook+"startDrag();");
	ZLM.setLocalAttribute(this.base,"ondatadrop",this.objHook+"endDrag();");
	ZLM.setLocalAttribute(this.base,"onmouseout",this.objHook+"resetActive();");
	this.grammar=null;
	this.menu={};
	this.root=new ZCE.ParseNode("_$ROOT_","","I");
	this.activeNode=null;
	this.value=null;
	ZLM.requestDataDragDropInit();
};

ZCE.ExpressionEditor.create=function() {
	var div=ZLM.simulateTag("div class='expressionEditor'"); 
	return(new ZCE.ExpressionEditor(div));
};

ZCE.ExpressionEditor.initialize=function() {
	var bi = ZLM.getElementsByClassPrefix("expressionEditor",document.body);
	for (var i=0;i<bi.length;i++) {
		if (bi[i].className=="expressionEditor") {
			if (!bi[i].controller) var o=new ZCE.ExpressionEditor(bi[i]);
		};
	};
};

ZCE.ExpressionEditor.initializeGrammar=function() {
	return({});
};

ZCE.ExpressionEditor.addProduction=function(g,prodName,prodType,options,baseType,reduction) {
	g[prodName]=new ZCE.ProdNode(prodName,prodType,options,baseType,reduction);
};

ZCE.ExpressionEditor.prototype.resetActive=function() {
	if (this.activeNode) {
		this.activeNode.showAsActive(false);
		this.activeNode=null;
	}
}
		
ZCE.ExpressionEditor.prototype.startDrag=function() {
	var dSrc=ZLM.getDragSource();
	if (!this.activeNode) return(null);
	var v=this.activeNode.getRenderString();
	var a=[];
	var p=this.activeNode;
	while (p.parentNode!=this.root && p.nextSibling==null && p.previousSibling==null) {
		a.push(p.nodeName);
		p=p.parentNode;
	}
	a.push(p.nodeName);
	ZLM.setDragCaption(v);
	this.resetActive();
	return({options:a,str:v});
};

ZCE.ExpressionEditor.prototype.endDrag=function() {
	if (!this.activeNode) return(null);
	var o=ZLM.getDragData();
	var p=this.activeNode;
	while (p.parentNode!=this.root && p.nextSibling==null && p.previousSibling==null) p=p.parentNode;
	var d=this.grammar[p.nodeName].descendants;
	while (o.options.length>0) {
		var c=o.options.pop();
		for (var i=0;i<d.length;i++) {
			if (c==d[i]) {
				var t=this.parse(o.str,c);
				this.grammar[c].replaceSubtree(this.activeNode,t);
				this.activeNode=null;
				return;
			}
		}
	}
};

ZCE.ExpressionEditor.prototype.dumpParseTree=function() {
	this.root.dumpTree(0);
};

ZCE.ExpressionEditor.prototype.clearValue=function() {
	while (this.root.firstChild!=null) this.root.removeChild(this.root.firstChild);
};

ZCE.ExpressionEditor.prototype.clearRender=function() {
	this.base.innerHTML="";
};

ZCE.ExpressionEditor.prototype.updateValue=function() {
	this.value=this.root.renderValue();	
};

ZCE.ExpressionEditor.prototype.renderParseTree=function() {
	this.clearRender();
	this.root.render(this.base);
//	this.updateValue();
};

ZCE.ExpressionEditor.prototype.applyProduction=function(rule,option) {
	if (rule) this.grammar[rule].apply(this.activeNode,option);
};

ZCE.ExpressionEditor.prototype.reduceProduction=function(rule) {
};

ZCE.ExpressionEditor.prototype.setGrammar=function(g) {
	this.grammar=g;
	for (var p in g) {
		g[p].setWidget(this);
		g[p].refreshDescendants();
		g[p].calcNextToken(g);
	};
	this.setApplicationOptions();
	for (var p in g) g[p].buildContextMenu();
};

ZCE.ExpressionEditor.prototype.setValue=function(str,type) {
	var v=this.parse(str,type);
	if (v) {
		this.clearValue();
		this.root.appendChild(v);
		this.renderParseTree();
	}
	else {
		alert("PARSE ERROR: "+str+" is not a valid "+type);
	}
}

ZCE.ExpressionEditor.prototype.getValue=function() {
	var a=[];
	this.root.renderValue(a);
	return(a.join(''));
}

ZCE.ExpressionEditor.prototype.extendActiveScope=function() {
	if (!this.activeNode) return;
	var p=this.activeNode.getReplaceableAncestor();
	if (p.parentNode!=this.root) p=p.parentNode;
	p.showAsActive(true);
	this.activeNode=p;
}

ZCE.ExpressionEditor.prototype.parse=function(str,root) {
	if (!this.grammar) {
		alert("ERROR: Grammar not initialized");
		return(null);
	}
	var v=this.grammar[root].accept(str,this.grammar);
	if (v) return(v[2]);
	return(v);
};

