/// Graphical editor for building JPL expressions from tree data
class JPLFilterWizard extends SAMWidget {

/// Return an extended string holding any desired, stylesheet
/// definition code.
getDefaultCSS() {
	const css = `
		.root {
			position: absolute;
			left:0px;
			right:0px;
			top:0px;
			bottom:0px;
		}
		.actionButton {
			position:absolute;
			top:-6px;
			right:2px;
			display:block;
			width:28px;
			height:28px;
			border-radius:15px;
			background-color:#ffffff;
			margin-left:2px;
			margin-right:2px;
			padding-left:3px;
			padding-top:3px;
		}
		.actionButton:hover {
			background-color:rgb(0,0,0,0.12);
		}

	`;
	return(css);
};

/// Set initial public and private properties for the widget
initData() {
	this.path="";
	this.fhirPath="";
	this.context="";
	this.svg = "";
	this.overlay="";
	this.dataOptionsCB=null;
	this.$captions= {
		DeleteThisClause:'Delete this entry'
	};
};

setDataOptionsCB(fn) {
	this.dataOptionsCB = fn;
};

setPathData(path,context) {
	this.path = path;
	this.context = context;
	this.parsePath();
	this.render();
}

/// Specific directives to supervise drawing of this widget
render() {
	if (this.path=="") return;
	if (this.svg=="") {
		this.svg = this.createSVG("svg",{"id":"SketchPad", "preserveAspectRatio":"xMidYMid slice", "style":"width:100%; height:100%; top:0; left:0;"});
		this.root.appendChild(this.svg);
	}
	if (this.overlay=="") {
		this.overlay = this.createElement("div",{"style":"position:absolute;top:22px;left:0px;right:0px;bottom:0px"});
		this.root.appendChild(this.overlay);
	};
	this.svg.innerHTML="";
	this.overlay.innerHTML="";	
	this.renderBasePath();
};

parsePath() {
	var jpl = new JPLUtils();
	var parseTree = jpl.parseExpression(this.path);

	var len = parseTree.length;
	var depth = 1;
	var idx = 0;
	this.pathArray = [];
	this.corePath = "";
	var paIdx = 0;
	var base='';
	var condition='';
	var prefix = '';
	while (idx<len) {
		var node = parseTree[idx];
		if (node.type=='JPLSeparator' || node.type=='JPLEnd') {
			this.pathArray[paIdx++]={"base":(base),"conditional":(condition),"depth":(depth),"prefix":(prefix)};
			prefix+=base+'.';
			base='';
			condition='';
		}
		else if (node.type == 'JPLNode' || node.type == 'JPLRoot') {
			base = node.value;
		}
		else if (node.type == 'JPLArray') {
			var str='';
			for (var i=0;i<node.value.length;i++) str+=node.value[i].value;
			base += '['+str+']';
		}
		else if (node.type == 'JPLFilter') {
			condition = node.value;
		}
		if (condition!='') depth++;
		idx++;	
	}
	this.corePath = prefix.substring(0,prefix.length-1);
	if (this.owner && this.owner.extensionDomain) {
		// Special handling for FHIR "extension" keys
		this.corePath = this.swizzleFHIRExtensionKeys(this.corePath);
	}
	this.maxDepth = depth;
	this.fhirpath = this.exportFHIRPath();
};

renderBasePath() {
	const STYLE = "font-weight:bold;font-size:14px;font-family:Arial;";
	const offsets = [];
	const START = 1;

	var x = 10;
	var y = 20;
	var len = this.pathArray.length;
	var terminus = 1;
	if (!this.context[this.corePath]) terminus = 0;
	for (var i=START;i<len;i++) {
		var tier = this.pathArray[i];
		var n = this.createSVG("text",{"x":(x),"y":(y),"style":(STYLE),"fill":"#000042"});
		n.innerHTML = tier.base;
		this.svg.appendChild(n);
		var bb = n.getBBox();
		offsets[i]=bb;
		if (i>START && i<len-terminus) { // Add clickable anchor box
			if (!(this.owner && this.owner.extensionDomain && tier.base=='extension')) {
				// Only do this for NON-special FHIR extension case...
				var n = this.createSVG("rect",{"x":(bb.x),"y":(bb.y),"width":(bb.width),"height":(bb.height),"style":(STYLE)+"cursor:pointer;","fill":"#ffffff","opacity":0.01});
				n.id = tier.prefix+tier.base;
				n.idx = i;
				n.onclick = function(evt) {
					this.controller.selectTierCB(this.idx);
					this.controller.controlsTouchedCB(this);
				}
				this.svg.appendChild(n);
			}
		};
		x+=bb.width+1;
		if (i<len-1) {
			var n = this.createSVG("text",{"x":(x),"y":(y),"style":(STYLE),"fill":"#000042"});
			n.innerHTML = ".";
			this.svg.appendChild(n);
			var bb = n.getBBox();
			x+=bb.width+1;
		};
		
	};
	var offset = offsets[START].y+offsets[START].height+5+this.maxDepth*5;

	for (var i=len-1;i>START;i--) {
		var tier = this.pathArray[i];
		// If there is a condition associated with this,
		if (tier.conditional!='') {
			var bb = offsets[i];
			var h =this.renderFilterControls(this.maxDepth*5+5,offset,tier,i);
			tier.offsetX = this.maxDepth*5+5;
			tier.offsetY = offset;
			tier.ctrlHeight = h;
			offset+=h;
			// add interconnect
			this.renderFilterInterconnect(bb.x,bb.y+bb.height+2,bb.width,tier);
		}	
	}
// SAM ==>> This should really be a callback
this.parentNode.style.height=offset+10+"px";
};

renderFilterControls(x,y,node,pathArrayIndex) {
	/// Node.conditional is really an array of parsed tokens that form up to make
        /// a conditional.  RIGHT NOW this is just an operand-operator-operand affair
        /// but could grow to a more complex item later.
	const LINE = 22;
	const STYLE = "position:absolute;display:block;top:"+(y-LINE)+"px;left:"+x+"px;white-space:nowrap;right:0px;height:30px;margin-top:4px;";
	var div = this.createElement("div",{"style":(STYLE)});
	this.overlay.appendChild(div);
	/// LHS Operand
	var operandSelect=this.createElement("select");
	operandSelect.value="";
	operandSelect.controller=this;
	operandSelect.path = node.prefix+node.base;
	operandSelect.id = operandSelect.path+"_operandSelect";
	operandSelect.pathArrayIndex = pathArrayIndex;
	operandSelect.cIdx = 0;
	var options = this.getContextPaths(node.prefix+node.base);
	var h=[];
	var newStart = node.conditional[0].value.indexOf('@.')!=0;
	var keySelected = false;
	for (var p in options) {
		if (newStart && !keySelected) { // invalid start, default to a valid value
			node.conditional[0].value = p;
			keySelected = true;
 			h.push('<option selected="selected" value="'+p+'">'+p.substring(2)+'</option>');
		}
		else h.push('<option value="'+p+'">'+p.substring(2)+'</option>');
	}
	operandSelect.innerHTML = h.join("");
	operandSelect.onchange = function(evt) {
		const widget=this.controller;
		this.operandEnter.setValue("");
		const masterNode = widget.pathArray[this.pathArrayIndex];
		masterNode.conditional[this.cIdx].value="";
		if (widget.dataOptionsCB) {
			const list = widget.dataOptionsCB(this.path,this.value,'==');
			if (Array.isArray(list)) {
				if (list.length==1) {
					this.operandEnter.setValue(list[0]);
					masterNode.conditional[this.cIdx].value=list[0];
				}
				else {
					var options = {};
					for (var j=0;j<list.length;j++) options[list[j]]=list[j];
					this.operandEnter.setOptions(options);
					this.operandEnter.setValue("");
				}
			}
		}
		const node = masterNode.conditional[this.cIdx];
		node.value = this.value;
		const enterNode = masterNode.conditional[this.cIdx+1];
		enterNode.value = this.operandEnter.value;
		widget.controlsTouchedCB(this);
		widget.refreshFromPathArray(true);

	};
	div.appendChild(operandSelect);

	// OPERATOR
	var operatorSelect=this.createElement("select");
	operatorSelect.controller=this;
	operatorSelect.id = operandSelect.path+"_operatorSelect";
	operatorSelect.masterNode = node;
	operatorSelect.cIdx = 2;
	operatorSelect.onchange = function(evt) {
		const node = this.masterNode.conditional[this.cIdx];
		node.value = this.value;
		const widget=this.controller;
		widget.controlsTouchedCB(this);
		widget.refreshFromPathArray(true);
	};
	var h=[];
	h.push('<option value="==">equals</option>');
	h.push('<option value="!=">not equals</option>');
	h.push('<option value="&gt;">greater than</option>');
	h.push('<option value="&lt;=">less or equal to</option>');
	h.push('<option value="&gt;=">greater or equal to</option>');
	h.push('<option value="starts with">starts with</option>');
	h.push('<option value="exists">exists</option>');
	h.push('<option value="is unknown">is unknown</option>');
	h.push('<option value="like_regex">like regex</option>');
	h.push('<option value="is of type">resolves to type</option>');
	operatorSelect.innerHTML=h.join("");
	div.appendChild(operatorSelect);

	var operandEnter = this.createElement("sam-textselect",{"style":"display:inline-block; width:150px;"});
	operandEnter.controller=this;
	operandEnter.id = operandSelect.path+"_operandEnter";
	operandEnter.masterNode = node;
	operandEnter.cIdx = 1;
	operandEnter.onchange = function(evt) {
		const node = this.masterNode.conditional[this.cIdx];
		node.value = this.value;
		const widget=this.controller;
		widget.controlsTouchedCB(this);
		widget.refreshFromPathArray(true);
	};
	div.appendChild(operandEnter);

	// Pad out last select box to fill space
	var newWidth = div.clientWidth - 50 - operandEnter.offsetLeft;
	if (newWidth) operandEnter.style.width=newWidth+"px";	

	operandSelect.operandEnter = operandEnter;
	
	var c = node.conditional;
	if (c[0]) { // set existing value operandSelect value and operandEnter value
		if (this.dataOptionsCB && c[0].value.indexOf('@.')==0) {
			operandSelect.value = c[0].value;
			const list = this.dataOptionsCB(node.prefix+node.base,c[0].value,c[2].value);
			if (Array.isArray(list)) {
				if (list.length==1) {
					operandEnter.setValue(list[0]);
					if (newStart) {
						c[1].value=list[0];
						this.refreshFromPathArray(false);
					}
				}
				var options = {};
				for (var j=0;j<list.length;j++) options[list[j]]=list[j];
				operandEnter.setOptions(options);
			}
		}	
	}
	if (c[2]) {
		operatorSelect.value=c[2].value;	
	}
	if (c[1]) {
		operandEnter.setValue(c[1].value);
	}	
	if (this.owner && this.owner.extensionDomain && node.base=='extension') {
		// Special handling for FHIR "extension" keys
		operandSelect.disabled=true;
		operatorSelect.disabled=true;
		operandEnter.setDisabled(true);
	};

	// DELETE PREDICATE OPTION
	const delButton = this.createElement('div',{'className':'actionButton','id':(node.prefix+node.base+'_delete'),'title':(this.$captions.DeleteThisClause)});
	const del = this.createElement("sam-icon");
	del.setGlyph("Delete");
	del.setSize("24px","24px");
	delButton.target = node;
	delButton.onclick=function(evt) {this.owner.deleteClauseCB(this.target);};
	delButton.owner=this;
	delButton.appendChild(del);
	div.appendChild(delButton);

	return(div.offsetHeight);
};

controlsTouchedCB(who) {
	if (this.onchange) this.onchange({target:(this)});
};

deleteClauseCB(who) {
	const LEN = this.pathArray.length;
	for (var i=0;i<LEN;i++) {
		var n = this.pathArray[i];
		if ((n.base==who.base)&&(n.prefix==who.prefix)) {
			n.conditional = '';
			this.refreshFromPathArray(true);
			this.controlsTouchedCB(null);
			return;
		}
	}
};

refreshFromPathArray(redraw) {
	this.path = this.exportPath();
	this.fhirPath = this.exportFHIRPath();
	this.parsePath();
	if (redraw) this.render();	
};

/// The interconnect lines consist of an underline under the tier to which the filter applies
///   --> These are always 2 pixels below the bounding box height.
/// Then we have a verical line from the midpoint of the underline to a left bargin seeking line
///   --> The length of this line is a function of depth with a max of 5*maxDepth
/// The horizontal, margin-seeking line stops shy as a function of depth
///   --> Rightmost left extent is MaxDepth*5
/// This then flows into a verical bar whose height is function of the number of control bars
/// needed to render filters of greater depth (this is the tricky one)
renderFilterInterconnect(x,y,w,node) {
	var l = this.createSVG("line",{"x1":(x),"y1":(y),"x2":(x+w),"y2":(y),"stroke":"#000042","strokeWidth":3});
	this.svg.appendChild(l);
	var l = this.createSVG("line",{"x1":(x+w/2),"y1":(y),"x2":(x+w/2),"y2":(y+node.depth*5),"stroke":"#000042","strokeWidth":3});
	this.svg.appendChild(l);
	var l = this.createSVG("line",{"x1":(node.depth*5),"y1":(y+node.depth*5),"x2":(x+w/2),"y2":(y+node.depth*5),"stroke":"#000042","strokeWidth":3});
	this.svg.appendChild(l);
	var l = this.createSVG("line",{"x1":(node.depth*5),"y1":(y+node.depth*5),"x2":(node.depth*5),"y2":(node.offsetY+node.ctrlHeight/2),"stroke":"#000042","strokeWidth":3});
	this.svg.appendChild(l);	
	var l = this.createSVG("line",{"x1":(node.offsetX),"y1":(node.offsetY+node.ctrlHeight/2),"x2":(node.depth*5),"y2":(node.offsetY+node.ctrlHeight/2),"stroke":"#000042","strokeWidth":3});
	this.svg.appendChild(l);	
};

swizzleFHIRExtensionKeys(path) {
	const pathArray = path.split('.extension');
	const areas = this.owner.extensionDomain;
	var newPath = "";
	var cap = Math.min(areas.length,pathArray.length-1);
	
	for (var i=0;i<cap;i++) {
		newPath+=pathArray[i]+".extension."+areas[i];
	}
	if (pathArray[i]) newPath+=pathArray[i];
	return(newPath);
};

getContextPaths(prefix) {
	if (this.owner && this.owner.extensionDomain) { // Specialty handling for FHIR extension keys
		prefix = this.swizzleFHIRExtensionKeys(prefix);
	}
	var pLen = prefix.length;
	var options = {};
	for (var p in this.context) {
		if ((p.indexOf(prefix)==0)&&(p!=prefix)) {
			var tag = '@'+p.substring(pLen);
			options[tag]=this.context[p];
		}
	};
	return(options);
};

selectTierCB(who) {
	if (this.pathArray[who].conditional=='') {
		this.pathArray[who].conditional=[{"type":"JPLArg","value":'@'},{"type":"JPLArg","value":''},{"type":"JPLOp","value":'=='}];
	}
	this.path = this.exportPath();
	this.parsePath();
	this.render();	
};

exportPath() {
	var str = "";
	var len = this.pathArray.length;
	for (var i=0;i<len;i++) {
		if (i>0) str+='.';
		var n = this.pathArray[i];
		str+=n.base;
		if (n.conditional!='') {
			str+='?';
			var exper = '';
			var stack = [];
			for (var cIdx = 0;cIdx<n.conditional.length;cIdx++) {
				var cn = n.conditional[cIdx];
				if (cn.type=='JPLArg') stack.push(cn.value);
 
				else if (cn.type=='JPLOp') {
					var a2 = stack.pop();
					if (a2=='') a2="''";
					else if((typeof(a2)=='string')&&(!((a2.indexOf("'")==0)||(a2.indexOf('"')==0)))) a2 = "'"+a2+"'";
					var a1 = stack.pop();
					var spacer = ''; // word based operators need whitespace
					if ("seli".indexOf(cn.value.charAt(0))>-1) spacer=' ';
					str+='('+a1+spacer+cn.value+spacer+a2+')';
				}
			}
		}
	}
	return(str);
};

exportFHIRPath() {
	var abort = false;
	var fhirpath = "";
	var len = this.pathArray.length;
	for (var i=0;i<len;i++) {
		if ((!abort)&&(i>1)) fhirpath +='.';	
		var n = this.pathArray[i];
 		if ((!abort)&&(i>0)) {
  			fhirpath +=n.base;
 		}
		if (n.conditional!='') {
 			if (!abort) fhirpath += '.where(';
			var exper = '';
			var stack = [];
			for (var cIdx = 0;cIdx<n.conditional.length;cIdx++) {
				var cn = n.conditional[cIdx];
				if (cn.type=='JPLArg') stack.push(cn.value);
 
				else if (cn.type=='JPLOp') {
					var a2 = stack.pop();
					if (a2=='') a2="''";
					else if((typeof(a2)=='string')&&(!((a2.indexOf("'")==0)||(a2.indexOf('"')==0))))  a2 = "'"+a2+"'";
					var a1 = stack.pop();
					if (!abort) {
  						if (a1.indexOf('@')==0) a1=a1.substring(2);
  						if (a1=='') {
							abort=true;
							fhirpath="{INVALID}";
  						}
  						else {
  							if (cn.value=='==') {
								fhirpath += a1+' = '+a2;
							}
							else if (cn.value=='!=') {
								fhirpath += '('+a1+' = '+a2+').not()';
							}
							else if (cn.value=='starts with') {
								fhirpath += a1+'.startsWith('+a2+')';
							}
							else if (cn.value=='exists') {
								fhirpath += a1+'.exists()';
							}
							else if (cn.value=='is unknown') {
								fhirpath += a1+'.empty()';
							}
							else if (cn.value=='like_regex') {
								fhirpath += a1+'.matches('+a2+')';
							}
							else if (cn.value=='is of type') {
								fhirpath += 'resolve() is '+a2.split("'")[1];
							}
							else {
								fhirpath += a1+' '+cn.value+' '+a2;
							}
						}
					}
				}
			}
 			if (!abort) fhirpath += ')';
		}
	}
	return(fhirpath);
};


}
// Define the new element
if (!customElements.get('jpl-filterwizard')) customElements.define('jpl-filterwizard', JPLFilterWizard);

window.$defined_JPLFilterWizard = true;
