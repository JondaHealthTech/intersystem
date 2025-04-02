/// Widget for rendering and selecting tree structured data and subtrees
class LeafPicker extends SAMWidget {

/// Return an extended string holding any desired, stylesheet
/// definition code.
getDefaultCSS() {
	const css = `
		.root {
			position: relative;
			top:0px;
			left:0px;
			right:0px;
			bottom:0px;
		}

		.treeConnector {
			stroke:rgba(0,0,0,0.87);
			stroke-width:1;
		}

		.disclosure {
			stroke:rgba(0,0,0,0.87);
			fill:rgba(0,0,0,0.12);
		}

		.disclosureDisc {
			stroke:rgba(0,0,0,0.87);
			fill:#ffffff;
			stroke-width:0.5;
		}

		.disclosureDiscCover {
			fill:#ffffff;
			stroke-width:0.5;
			opacity:0.01;
		}

		.nodeName {
			font-size:13px;
			font-family:Arial;
			font-weight:500;
		}

		.titleActive {
			fill:rgba(0,0,0,0.12);
		}

		.titleParent {
			stroke:#007742;
			stroke-width:1;
			fill:#ffffff;
			fill-opacity:0.1;
		}

		.titleNormal {
			stroke:none;
			stroke-width:0;
			fill:#ffffff;
			fill-opacity:0.1;
		}
	`;
	return(css);
};

/// Set initial public and private properties for the widget
initData() {
	this.widget = this;
	this.src = "";
	this.svg = "";
	this.initializeProperty("showLeafValues",false);
	this.initializeProperty("tree","");
	this.initializeProperty("scale",1);
	this.initializeProperty("category","$");
	if (this.tree!="") this.src = this.packageTreeData(this.category,this.tree); 
};

setCategory(root) {
	this.category=root;
};

setTree(json) {
	if (typeof(json)!='object') {
		this.tree = JSON.parse(json);
	}
	else this.tree = json;
	if (this.tree!="") this.src = this.packageTreeData(this.category,this.tree); 
	this.render();
};

setValue(path) {
	this.value = path;
	this.closeAll();
	this.render();
};

render() {
	if (this.src=="") return;
	if (this.svg=="") {
		this.svg = this.createSVG("svg",{"id":"SketchPad", "preserveAspectRatio":"xMidYMid slice", "style":"width:100%; height:100%; top:0; left:0;"});
		this.root.appendChild(this.svg);
	}
	this.svg.innerHTML="";
	var height = this.renderTree(this.src[this.category],this.svg);
	this.svg.style.height = height+"px";
};

//////////////////////////
/*
TREE Structure 
{
	"subTree":{
		"leaf":1,
		"otherLeaf":1
	},
	"nextSub":{
		"leaf":1
	}
}
*/

packageTreeData(topName,json) {
	var itemPath = this.category;
	var aet = {};
	aet[(this.category)]={
			"$open":true,
			"$active":false,
			"$path":(itemPath),
			"$label":(topName)
		};
	if (typeof(json)!='object') {
		var src = JSON.parse(json);
	}
	else var src = json;
	this.packageElementsIncremental(aet[this.category],src,itemPath);
	return aet;
};

packageElements(aet, node, path) {
	for (var key in node) {	
		var jplKey = key.split(' (')[0];
		var r = node[key];
		var aetKey = jplKey;
		var label = key;
		var itemPath = path+"."+jplKey
		if (Array.isArray(node)) {
			aetKey = "("+jplKey+")";
			itemPath = path+"["+jplKey+"]";
			label = '['+jplKey+']';	
		}
		aet[aetKey] = {
			"$open":false,
			"$active":false,
			"$path":(itemPath),
			"$label":(label)
		};
		if (typeof(r)!='object') { // It's a leaf node
			aet[aetKey].$leaf = true;
		}
		else { 
			this.packageElements(aet[aetKey],r,itemPath);
		}
	}
};

packageElementsIncremental(aet, node, path) {
 	for (var key in node) {	
		var jplKey = key.split(' (')[0];
		var r = node[key];
		var aetKey = jplKey;
		var label = key;
		var itemPath = path+"."+jplKey
		if (Array.isArray(node)) {
			aetKey = "("+jplKey+")";
			itemPath = path+"["+jplKey+"]";
			label = '['+jplKey+']';	
		}
		aet[aetKey] = {
			"$open":false,
			"$active":false,
			"$path":(itemPath),
			"$label":(label)
		};
		if (typeof(r)!='object') { // It's a leaf node
			aet[aetKey].$leaf = true;
			if (this.showLeafValues) aet[aetKey].$label+=" :: "+r;
		}
	}
};

closeAll() {
	this.closeTier(this.src);
};

closeTier(aet) {
	for (var r in aet) {
		if (r.indexOf('$')!=0) {
			const node = aet[r];
			if (node.$open) {
				aet[r].$open=false;
				this.closeTier(node);
			}
		}
	}
};

getNode(aet, path) {
	var start=1;
	if (aet["$"]) start=0;
	if (aet["@"]) start=0;
	var a = path.split('.');
	// Deal with top level array issue
	if ((start)&&(Array.isArray(aet))) {
		var idx=a[0].split('[');
		aet = aet[parseInt(idx[1])];
	}	
	var len = a.length;
	for(var i=start;i<len;i++) {
		var tier = a[i];
		var idx = tier.split('[');
		if (idx.length==1) { // simple property
			if (aet) {
				if (aet[tier]) {
					aet = aet[tier];
				}
				else { // could be annotated labels
					var keys = Object.keys(aet);
					const keyLen = keys.length;
					var tierPlus = tier+' (';
					for (var k=0;k<keyLen;k++) {
						if (keys[k].indexOf(tierPlus)==0) {
							aet = aet[keys[k]];
							k=keyLen+1;
						}
					}
					if (k==keyLen) aet=null;
				}
			}
		} else { 
			if (tier.indexOf('[*]')>-1) { //whole array, treat as one tag
				if (aet[tier]) {
					aet = aet[tier];
				}
				else { // could be annotated labels
					var keys = Object.keys(aet);
					const keyLen = keys.length;
					var tierPlus = tier+' (';
					for (var k=0;k<keyLen;k++) {
						if (keys[k].indexOf(tierPlus)==0) {
							aet = aet[keys[k]];
							k=keyLen+1;
						}
					}
					if (k==keyLen) aet=null;
				}
			} else {// index into array
				if (aet) {
					aet = aet[idx[0]];
					if (aet) {
						if (start) aet=aet[parseInt(idx[1])];
						else aet = aet['('+parseInt(idx[1])+')'];
					}
				}
			}
		}
	}
	return aet;
};

setAETNode(aet, path, property, value)  {
	var aet = this.getNode(aet,path);
	if (aet) aet[property]=value;
};

getAETNode(aet, path, property) {
	var aet = this.getNode(aet,path);
	if (aet) aet = aet[property];
	return aet;
};

toggle(evt) {
	var widget = this.controller;
	var path = evt.target.id;
	path=path.substring(0,path.length-2)
	var state = widget.getAETNode(widget.src,path,"$open");
	if ((state)&&(widget.value)&&(widget.value.indexOf(path)==0)) {
		// attempting to close a node on the active path
		widget.value="";
	}
	widget.setAETNode(widget.src,path,"$open",!state);
	widget.refresh();
};

selectCB(evt) {
	var widget = this.controller;
	var path = evt.target.getAttribute("aetPath")
	widget.value=path;
	widget.render();
	if (widget.onchangeCB) widget.onchangeCB(path);
};

renderDisclosureClosed(id, x, y, svg) {
	const CX = x+8.5*this.scale;
	const CY = y+8*this.scale;
	const RADIUS = 11*this.scale;

	const ONE = 1*this.scale;
	const SIX = 6*this.scale;
	const NINE = 9*this.scale;
	const THIRTEEN = 13*this.scale;
	const SEVENTEEN = 17*this.scale;

	var points = (x+SIX)+' '+(y+ONE)+' '+(x+THIRTEEN)+' '+(y+NINE)+' '+(x+SIX)+' '+(y+SEVENTEEN);

	var e = this.createSVG("circle",{"pid":(this.id),"cx":(CX),"cy":(CY),"r":(RADIUS),"class":"disclosureDisc"});
	e.onclick = function(evt) {
		this.controller.toggle(evt);
	}
	svg.appendChild(e);
	var e = this.createSVG("polygon",{"pid":(this.id),"points":(points),"class":"disclosure"});
	e.onclick = function(evt) {
		this.controller.toggle(evt);
	}
	svg.appendChild(e);
	var e = this.createSVG("circle",{"id":(id+"_C"),"pid":(this.id),"cx":(CX),"cy":(CY),"r":(RADIUS),"class":"disclosureDiscCover"});
	e.onclick = function(evt) {
		this.controller.toggle(evt);
	}
	svg.appendChild(e);
};

renderDisclosureOpen(id, x, y, svg){
	const CX = x+8.5*this.scale;
	const CY = y+8*this.scale;
	const RADIUS = 11*this.scale;

	const ONE = 1*this.scale;
	const EIGHT = 6*this.scale;
	const NINE = 9*this.scale;
	const SIXTEEN = 16*this.scale;

	var points = (x+ONE)+' '+(y+EIGHT)+' '+(x+NINE)+' '+(y+SIXTEEN)+' '+(x+SIXTEEN)+' '+(y+EIGHT);

	var e = this.createSVG("circle",{"pid":(this.id),"cx":(CX),"cy":(CY),"r":(RADIUS),"class":"disclosureDisc","onclick":this.controller.toggle});
	svg.appendChild(e);
	var e = this.createSVG("polygon",{"pid":(this.id),"points":(points),"class":"disclosure","onclick":this.controller.toggle});
	svg.appendChild(e);
	var e = this.createSVG("circle",{"id":(id+"_C"),"pid":(this.id),"cx":(CX),"cy":(CY),"r":(RADIUS),"class":"disclosureDiscCover","onclick":this.controller.toggle});
	svg.appendChild(e);
};


renderTree(src, svg) {
	const OFSX = 5*this.scale;
	const OFSY = 25*this.scale;
	const LINE = 26*this.scale;

	var lastChild=[false];
	return(	this.renderTier(OFSX,OFSY,this.category,src,0,true,lastChild,svg));
};

hasKids(node) {
	for (var p in node) {
		if (typeof(node[p])=='object') return(true);
	}
	return(false);
};

renderTier(x, y, title, obj, indent, first, last, svg) { 
	const INDENT = 20*this.scale;
	const TWO = 2*this.scale;
	const LINE = 28*this.scale;
	const SEVEN = 7*this.scale;
	const EIGHTPLUS = 8.5*this.scale;
	const NINE = 9*this.scale;
	const TEN = 10*this.scale;
	const FOUR = 4*this.scale;
	const OFSTITLE = 24*this.scale;

	var space = 0;
	if ((indent>0)&&(last[indent-1])) {
		space=LINE/2;
	}
	var totalHeight = LINE;


	if (indent>0) {
		var hline = this.createSVG("line",{"x1":(x+NINE+(indent-1)*INDENT),"y1":(y-NINE),"x2":(x+indent*INDENT),"y2":(y-NINE),"class":"treeConnector"});
		svg.appendChild(hline);
	}

	var backBox=null;
	if (this.value) {
		if (this.value.indexOf(obj.$path)==0) {
			obj.$open = true;
			backBox = this.createSVG("rect",{"rx":5,"ry":5,"class":"titleActive","aetPath":(obj.$path)});
			svg.appendChild(backBox);
		}
	};

	var titleNode = this.createSVG("text",{"x":(x+indent*INDENT+OFSTITLE),"y":(y-FOUR),"class":"nodeName"});
	var label = obj.$label;
	if (!obj.$label) label = title;
	titleNode.innerHTML = label;
	svg.appendChild(titleNode);

	var cn = "titleNormal";
	if (obj.$active) {
		if (obj.$leaf) {
			cn = "titleActive";
		} else {
			cn = "titleParent";
		}
	}

	// Add clickable cover plate
	var bb = titleNode.getBBox();
	var box = this.createSVG("rect",{"id":(obj.$path+'_P'),"pid":(this.id),"x":(bb.x-2),"y":(bb.y-2),"width":(bb.width+4),"height":(bb.height+4),"rx":5,"ry":5,"class":(cn),"aetPath":(obj.$path),"onclick":this.controller.selectCB});
	svg.appendChild(box);

	if (backBox) {
		backBox.setAttributeNS(null,"x",(bb.x-2));
		backBox.setAttributeNS(null,"y",(bb.y-2));
		backBox.setAttributeNS(null,"width",(bb.width+4));
		backBox.setAttributeNS(null,"height",(bb.height+4));
	};

	if (!(obj.$leaf)) { // add disclosure
		if (!this.hasKids(obj)) {
			this.packageElementsIncremental(obj,this.getNode(this.tree,obj.$path),obj.$path);
		}
		if (obj.$open) {
			this.renderDisclosureOpen(obj.$path,(x+indent*INDENT),y+EIGHTPLUS-LINE,svg);
		}
		else {
			this.renderDisclosureClosed(obj.$path,(x+indent*INDENT),y+EIGHTPLUS-LINE,svg);
		}
	}
	else {
		var hline = this.createSVG("line",{"x1":(x+indent*INDENT),"y1":(y-NINE),"x2":(x+indent*INDENT+OFSTITLE*3/4),"y2":(y-NINE),"class":"treeConnector"});
		svg.appendChild(hline);
	}

	if (!(obj.$leaf)&&(obj.$open)) {
		var e = [];
		for (p in obj) if (p.charAt(0)!="$") e.push(p);
		var len = e.length;

		var nkids = 0;
		for(var i=0;i<len;i++) {
			var p = e[i];
			last[indent]=(i==(len-1));
			last.push(false);
			if (i==(len-1)) {
				var vline = this.createSVG("line",{"x1":(x+NINE+(indent)*INDENT),"y1":(y+TWO),"x2":(x+NINE+(indent)*INDENT),"y2":(y-NINE+totalHeight),"class":"treeConnector"});
				svg.appendChild(vline);
			}
			totalHeight+=this.renderTier(x,y+totalHeight,p,obj[p],indent+1,(i==0),last, svg);
			last.pop();
		}
	}
	return (totalHeight+space);
};

}

// Define the new element
customElements.define('sam-leafpicker', LeafPicker);
window.$defined_LeafPicker = true; 


