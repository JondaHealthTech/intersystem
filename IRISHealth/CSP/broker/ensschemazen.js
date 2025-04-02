/*
	ensschemazen.js

	Copyright (c) 2017, InterSystems Corp.
	ALL RIGHTS RESERVED

	Core JS for HL7 Schema Editor -- Zen Edition
*/

/// Useful constants
var SVGNS = "http://www.w3.org/2000/svg";
var ZENNS = "http://www.intersystems.com/zen";


var currentLayout = {
	"boxHeight": 18,
	"boxSpacing": 28,
	"circleRadius":3,
	"topBox":15,
	"arrowOffset": 5,
	"ioYoffset": 6,
	"indent": 30,
	"cornerRadius": 4,
	"fontSize": 10.5,
	"textYoffset": 5,
	"menuHeight": 154,
	"menuRowHeight": 20,
	"checkboxSize": 20,
	"menuWidth": 100,
	"viewMenuWidth": 150
};

/// scrolling
var diagramScrollTop = 0;
var listScrollTop = 0;

/// count of property boxes
var boxCount = 0;
var segCount = 0;

/// Variables for tracking mouse movements.
mouseHandling = {};
/// Last mouseout location when hovering over a shape.
mouseHandling.lastOut = { "x": 0, "y": 0 };
/// Difference between current and initial position during moves
mouseHandling.delta = { "x": 0, "y": 0 };

/// Record start position.
mouseHandling.start = { "x": 0, "y": 0 };

/// selected item (object)
var currItem = null;
/// item on clipboard (for copy/paste)
var clipboardItem = null;
/// selected segment - used only for initiating drag from seg list to structure
var currSegment = null;

/// index of properties subscripted by name
var propIndex = new Object();
/// index of properties subscripted by yPos
var yIndex = new Object();
var segIndex = new Object();

/// used for property ids
var propertyCounter = 0;
var segCounter = 0;

var readOnlyFlag = true;

function setReadOnly(ro)
{
	readOnlyFlag = ro;
}

/// Called from container to set the width of the canvas
function setCanvasWidth(wid)
{
	var canvas = document.getElementById('canvasSVG');
	canvas.setAttribute('width',wid);
	layoutBoxes(false);
}

function startStatusBar(x,y)
{
	var el = document.getElementById('StatusBar');
	if (el) {
		el.setAttribute("transform","translate(" + x + "," + y + ")");
		el.setAttribute("style","");
	}
}

function clearStatusBar()
{
	var el = document.getElementById('StatusBar');
	if (el) {
		el.setAttribute("style","display: none;");
	}
}

/// Not used at this time
function canvasKeyDown(evt)
{
	switch(evt.keyCode) {
	case 32: // ' ' reset
		setScroll(0);
		break;
	case 89: // y
	case 90: // z
		setScroll(scrollTop + 50);
		break;
	case 88: // x
		setScroll(scrollTop - 50);
		break;
	}
}

function canvasKeyUp(evt)
{
}

// -------------------------------------------------------------------------------------------------------------------------------------------------
// Segment List Boxes

function setSegsList(seglist)
{
	setSegmentBoxes(seglist);
	layoutSegList();
}

function setSegmentBoxes(seglist)
{
	var s,segData;
	var name,cat,label;
	var errors = [];
	
	segIndex = {};
	segCounter = 0;
	
	for (var i = 0; i < seglist.length; i++) {
		segData = seglist[i];
		name = segData[0];
		cat = segData[1];

		if (name.length <= 0) {
			errors.push('Missing segment name.');
			// skip this one
		}
		else {
			label = name+' ('+cat+')';
			s = new SegmentBox(name,label);
		}
	}
	if (errors.length > 0) {
		alert('There are errors in the segments list:\n' + errors.join('\n'));
	}
}

function layoutSegList()
{
	// first clear out all existing boxes
	var canvas = null;
	var canvas = document.getElementById("listFrame");
	
	if (canvas) {
		canvas.removeChild(canvas.firstChild);
	}
	
	var group = document.createElementNS(SVGNS,"g");
	group.setAttribute('id','listGroup');
	
	canvas.appendChild(group);
	
	var tempCount = Object.keys(segIndex).length;
	if (tempCount != segCount) {
		segCount = tempCount;
		zenPage.adjustListScrollBox();
	}
	
	var seg;
	var yPos = currentLayout.topBox + listScrollTop;

	for (key in segIndex) {
		seg = segIndex[key];
		yPos = seg.place(yPos, false);
	}
}

function getSegListHgt()
{
	return currentLayout.boxSpacing * segCount;
}

function listScrollStart(evt)
{
	selectItem(null);
	this.setOperation('listScroll');
	
	// calculate offset from top of scroll box
	mouseHandling.delta.y = document.getElementById('listScrollBox').getAttribute('y') - evt.clientY;
}

function canvas_scrollList(delta)
{
	delta = ('undefined' == typeof delta) ? -listScrollTop : delta;
	setListScroll(listScrollTop + delta);
	layoutSegList();
}

function setListScroll(yOffset)
{
	var tmpScrollTop = parseInt(yOffset);
	var svgHeight = currentLayout.topBox + (segCount * currentLayout.boxSpacing);
	var segBox = document.getElementById('listBox');
	var segRect = segBox.getBoundingClientRect();
	var visHeight = segRect.height;
	tmpScrollTop = ((tmpScrollTop > 0) || (svgHeight < visHeight)) ? 0 : (((-tmpScrollTop + visHeight) > (svgHeight + currentLayout.boxSpacing)) ? -(svgHeight - visHeight + currentLayout.boxSpacing) : tmpScrollTop);
	listScrollTop = tmpScrollTop;
	var listHgt = getSegListHgt();
	if ((listHgt != 0) && (-listScrollTop < listHgt)) {
		var percent = (-listScrollTop / listHgt);
	} else {
		var percent = 0;
	}
	var scrollHgt = document.getElementById('listScrollRect').getAttribute('height') - 28 - 2;
	var newScrollBoxHgt = (percent * scrollHgt) + 20;
	document.getElementById('listScrollBox').setAttribute('y',newScrollBoxHgt);
}

function SegmentBox(name,label)
{
	this.gtype = 'segment';
	this.name = name;
	this.label = label;
	this.SVGGroup = null;
	
	segCounter++;
	this.id = 'segment_' + segCounter;
	segIndex[segCounter] = this;
	
	var wid = parseInt(document.getElementById('listFrame').getAttribute('width'));
	var xpos = parseInt(document.getElementById('listFrame').getAttribute('x'))
	var ypos = 0;
	this.yPos = ypos;
	this.xPos = xpos;
	this.width = wid;
	
	this.render = SegmentBox_render;
	this.place = SegmentBox_place;
	this.unrender = SegmentBox_unrender;
}

function SegmentBox_render()
{
	if (this.SVGGroup) {
		return;
	}
	
	// group with elements inside
	this.SVGGroup = document.createElementNS(SVGNS,"g");
	
	// backpointer to object
	this.SVGGroup.owner = this;
	
	this.SVGGroup.addEventListener("mousedown",segmentMouseDown,false);
	this.SVGGroup.addEventListener("click",segmentClick,false);
	this.SVGGroup.addEventListener("dblclick",segmentDblClick,false);
	
	//id value
	this.SVGGroup.setAttribute("id", this.id);
	
	// rect, etc...
	var rect = document.createElementNS(SVGNS,"rect");
	rect.setAttribute("id","rect_" + this.id);
	rect.setAttribute("x",0);
	rect.setAttribute("y",0);
	rect.setAttribute("width",this.width);
	rect.setAttribute("height",currentLayout.boxHeight);
	rect.setAttribute("rx",currentLayout.cornerRadius);
	rect.setAttribute("class","PropRect");
	
	this.SVGGroup.appendChild(rect);
	
	// text
	// add viewport to force clipping
	var view = document.createElementNS(SVGNS,"svg");
	view.setAttribute("x",0);
	view.setAttribute("y",0);
	view.setAttribute("width",this.width);
	view.setAttribute("height",currentLayout.boxHeight);
	view.setAttribute("id","viewport_" + this.id);
	this.SVGGroup.appendChild(view);

	var text = document.createElementNS(SVGNS,"text");
	text.setAttribute("class","PropName");
	text.setAttribute("x", 4 * currentLayout.arrowOffset);
	text.setAttribute("y", currentLayout.boxHeight - currentLayout.textYoffset);
	text.setAttribute("id","text_"+this.id);

	// create the text node and append it
	var textNode = document.createTextNode(this.label);
	text.appendChild(textNode);

	view.appendChild(text);

	// default translation
	var transform = 'translate(' + this.xPos + ',' + this.yPos + ')';
	this.SVGGroup.setAttribute("transform",transform);
	
	// add group to DOM
	var canvas = null;
	canvas = document.getElementById("listGroup");
	if (canvas) {
		canvas.appendChild(this.SVGGroup);
	}
}

function SegmentBox_place(yPos, redraw)
{
	if (redraw && this.SVGGroup) {
		this.unrender();
	} else {
		this.SVGGroup = null;
	}
	
	this.render();
	
	
	this.yPos = yPos;
	yPos += currentLayout.boxSpacing;
	
	// recompute width and x position
	var wid =  parseInt(document.getElementById('listFrame').getAttribute('width'));
	var xpos = parseInt(document.getElementById('listFrame').getAttribute('x'));
	
	this.xPos = xpos;

	if (wid != this.width) {
		// reset width
		this.width = wid;
		var view = document.getElementById("viewport_" + this.id);
		if (view) {
			view.setAttribute('width',this.width);
		}
		var rect = document.getElementById("rect_" + this.id);
		if (rect) {
			rect.setAttribute('width',this.width);
		}
	}

	var transform = 'translate(' + this.xPos + ',' + this.yPos + ')';
	this.SVGGroup.setAttribute("transform",transform);
	
	return yPos;
}

function SegmentBox_unrender()
{
	if (this.SVGGroup) {
		//remove SVG elements
		var group = document.getElementById(this.id);
		if (group) {
			var parent = group.parentNode;
			if (parent) {
				parent.removeChild(group);
			}
		}
		
		this.SVGGroup = null;
	}
}


// -----------------------------------------------------------------------------------------------------------------------------
// Property Boxes

/// called from server to insert new top-level segments
function setSegments(reload,proplist)
{
	setPropertyBoxes(null, proplist);

	layoutBoxes(reload);
}

function loadSegments(name,idlist)
{
	zenPage.loadSegmentsFromServer(name,idlist);
}

/// called from server to insert new segments
function insertSegments(segment,proplist)
{
	var layout = true;
	var p = propIndex[segment];
	if (p && !p.showChildren) {
		layout = false;
	}
	
	setPropertyBoxes(segment, proplist);
	
	if (layout) {
		layoutBoxes(true);
	}

	clearStatusBar();
}

/// sets up boxes
/// if segment is non-'', then add props to that parent node
function setPropertyBoxes(segment, proplist)
{
	var key,index,p;
	var name,label,parent,txt,cnt,ch,last;
	var insert = (null != segment);

	var badCount = 0;
	var errors = [];

	if (!insert) {
		var indexObj = propIndex;
		for (key in indexObj) {
			indexObj[key].remove();
		}
		var indexObj = yIndex;
		for (key in indexObj) {
			indexObj[key].remove();
		}
		propIndex = {};
		yIndex = {};
		index = propIndex;
		
		var canvas = document.getElementById("diagramFrame");

		if (canvas.firstChild) {
			while (canvas.firstChild) {
				canvas.removeChild(canvas.firstChild);
			}
			boxCount = 0;
		}
		
		var group = document.createElementNS(SVGNS,"g");
		group.setAttribute("id","diagramGroup");
		canvas.appendChild(group);

		// create top-level property box
		p = new PropertyBox(null,"DocStruct","DocStruct",1,1,proplist.length);
		index['DocStruct'] = p;

	}
	else {
		// append
		index = propIndex;
		p = index['DocStruct'];

	}

	// done if no properties
	if ((!proplist) || (proplist.length == 0)) return;

	var nprefix = ['DocStruct']; // normalized names
	var parentStack = [p];
	parent = null;

	if (insert) {
		segment += '.'; // false terminator
		// preset stack for append case
		var stk = 0;
		var lbl = '';
		var nxtsep = '.';
		for (var n = 0; n < segment.length; n++) {
			ch = segment.charAt(n);
			if ("." == ch) {
				if (stk>0) {
					nprefix[stk] = nprefix[stk-1] + '.' + lbl;
					parentStack[stk] = index[nprefix[stk]];
				}
				stk++;
				lbl = '';
			}
			else {
				lbl += ch;
			}
		}
	}

	var propData,ord,numch,opt,grp,union;

	for (var i = 0; i < proplist.length; i++) {
		propData = proplist[i];
		txt = propData[0];
		ord = propData[1];
		numch = propData[2];
		opt = propData[3];
		grp = propData[4];
		union = propData[5];

		if (txt.length <= 0) {
			errors.push('Missing property name.');
			// skip this one
		}
		else {
			// count # of leading . chars
			cnt = 0;
			ch = txt.charAt(cnt);
			while ("." == ch) {
				ch = txt.charAt(++cnt);
			}

			if (cnt <= 0) {
				errors.push("Property with missing dots: '" + txt + "'");
				cnt = 1;
				label = '???Unknown' + (++badCount);
			}
			else {
				// build names
				label = txt.substr(cnt);

				if ((null == label) || ('' == label)) {
					errors.push("Property with no label: '" + txt + "'");
					label = '???Unknown' + (++badCount);
				}
			}

			name = nprefix[cnt-1] + "." + label;
			nprefix[cnt] = name;

			// remove quote delimiters from label
			if (label.charAt(0) == '"') {
				if (label.charAt(label.length - 1) == '"') {
					label = label.substring(1,label.length - 1);
				}
				else if (label.substring(label.length - 3) == '"()') {
					label = label.substring(1,label.length - 3) + '()';
				}
			}

			p = new PropertyBox(parentStack[cnt-1],name,label,cnt + 1,ord,numch,opt,grp,union);
			index[name] = p;
			parentStack[cnt] = p;

			if ((grp || union) && (numch > 0)) {
				var idlist = '';
				var obj = p;
				while (obj.parent) {
					idlist = obj.ordPos + ((''==idlist) ? '' : ',') + idlist;
					obj = obj.parent;
				}
				loadSegments(name,idlist);
			}
		}
	}

	if (errors.length > 0) {
		alert('There are errors in the property list:\n' + errors.join('\n'));
	}
}

/// lay out property boxes according to hierarchy and expando settings
function layoutBoxes(redraw)
{
	var box = propIndex['DocStruct'];
	var group = document.getElementById("diagramGroup");
	
	if (redraw || (box && !group)) {
		var canvas = null;
		var canvas = document.getElementById("diagramFrame");
		
		startStatusBar(document.getElementById('diagramFrame').getAttribute('x'), currentLayout.topBox);
		
		var locator = document.getElementById("locatorLine");
		if (locator && locator.owner) {
			var loc = locator.owner;
			loc.unrender();
		}
		
		if (canvas) {
			if (canvas.firstChild) {
				if (locator && locator.owner) {
					locator.owner.unrender();
				}
				while (canvas.firstChild) {
					canvas.removeChild(canvas.firstChild);
				}
			}
		}
		
		var newGroup = document.createElementNS(SVGNS,"g");
		newGroup.setAttribute("id","diagramGroup");
		newGroup.setAttribute("visibility","hidden");
		
		canvas.appendChild(newGroup);
	}
	
	if (box) {
		var tempCount = boxCount;
		box.place(currentLayout.topBox + diagramScrollTop, false, redraw);
		if (tempCount != boxCount) {
			zenPage.adjustDiagramScrollBox();
		}
	}
	
	if (newGroup) {
		newGroup.setAttribute("visibility","visible");
		var hgt = currentLayout.boxSpacing * boxCount;
		newGroup.setAttribute('height',hgt);
	}
	clearStatusBar();
	
	if (redraw && loc) {
		loc.render();
	}

}

function getDiagramHgt()
{
	return currentLayout.boxSpacing * boxCount;
}

function diagramScrollStart(evt)
{
	selectItem(null);
	this.setOperation('diagramScroll');
	
	// calculate offset from top of scroll box
	mouseHandling.delta.y = document.getElementById('diagramScrollBox').getAttribute('y') - evt.clientY;
}

function canvas_scrollSchema(delta)
{
	delta = ('undefined' == typeof delta) ? -diagramScrollTop : delta;
	setScroll(diagramScrollTop + delta);
	layoutBoxes(false);
}

function setScroll(yOffset)
{
	var tmpScrollTop = parseInt(yOffset);
	var svgHeight = currentLayout.topBox + (boxCount * currentLayout.boxSpacing);
	var editBox = document.getElementById('diagramBox');
	var editRect = editBox.getBoundingClientRect();
	var visHeight = editRect.height;
	tmpScrollTop = ((tmpScrollTop > 0) || (svgHeight < visHeight)) ? 0 : (((-tmpScrollTop + visHeight) > (svgHeight + currentLayout.boxSpacing)) ? -(svgHeight - visHeight + currentLayout.boxSpacing) : tmpScrollTop);
	diagramScrollTop = tmpScrollTop;
	var diagramHgt = getDiagramHgt();
	if ((diagramHgt != 0) && (-diagramScrollTop < diagramHgt)) {
		var percent = -diagramScrollTop / diagramHgt;
	} else {
		var percent = 0;
	}
	var scrollHgt = document.getElementById('diagramScrollRect').getAttribute('height') - 28 - 2;
	var newScrollBoxHgt = (percent * scrollHgt) + 20;
	document.getElementById('diagramScrollBox').setAttribute('y',newScrollBoxHgt);
}

/// property box object
function PropertyBox(parent, name, label, level, ordPos, numCh, opt, grp, union)
{
	this.gtype = 'property'; // graphical type
	this.name = name;		// normalized name
	this.label = label;
	this.isVisible = true;
	this.showChildren = true;
	this.parent = parent;
	this.children = new Array();
	this.ordPos = ordPos;		// ordinal position in parent
	this.numChildren = numCh;	// defined number of children; -1 means unknown
	this.optional = opt;
	this.repeating = (name.slice(-2) == "()")
	this.isGroup = grp;
	this.isUnion = union;
	this.SVGGroup = null;

	propertyCounter++;
	this.id = 'property_' + propertyCounter;
	this.level = level;

	if (this.level == null) {
		alert('invalid value for property level');
	}

	// methods
	this.render = PropertyBox_render;
	this.place = PropertyBox_place;
	this.unrender = PropertyBox_unrender;
	this.remove = PropertyBox_remove;
	this.delete = PropertyBox_deleteProperty;
	this.moveInit = PropertyBox_moveInit;
	this.moveDiscard = PropertyBox_moveDiscard;
	this.moveTo = PropertyBox_moveTo;
	this.moveComplete = PropertyBox_moveComplete;
	this.insertPropAt = PropertyBox_insertPropAt;
	this.toggleOpt = PropertyBox_toggleOptional;
	this.toggleRep = PropertyBox_toggleRepeating;
	this.group = PropertyBox_createGroup;
	this.ungroup = PropertyBox_ungroup;
	this.unionize = PropertyBox_createUnion;
	this.unUnionize = PropertyBox_undoUnion;

	if (parent) {
		parent.children[parent.children.length] = this;

		// make expando visible for parent
		if (parent.SVGGroup) {
			parent.expando.setAttribute("style","");
		}
	}

	var wid =  parseInt(document.getElementById('diagramFrame').getAttribute('width'));
	var xpos, ypos;
	ypos = 0;

	wid -= (this.level-2) * currentLayout.indent;
	xpos = parseInt(document.getElementById('diagramFrame').getAttribute('x')) + ((this.level-2) * currentLayout.indent);

	// position of box
	this.xPos = xpos;
	this.yPos = ypos;

	this.width = wid;

	// decide whether to show children initially
	switch(this.level) {
	case 1:
		this.isVisible = false;
		this.showChildren = true;
		break;
	case 2:
		this.isVisible = true;
		this.showChildren = false;
		this.render();
		break;
	default:
		this.isVisible = false;
		this.showChildren = false;
		break;
	}
}

/// create svg for this shape
function PropertyBox_render()
{
	if (this.SVGGroup) {
		return;
	}

	boxCount++;

	// group with elements inside
	this.SVGGroup = document.createElementNS(SVGNS,"g");

	// backpointer to object
	this.SVGGroup.owner = this;

	this.SVGGroup.addEventListener("mousedown",propertyMouseDown,false);
	this.SVGGroup.addEventListener("click",propertyClick,false);
	this.SVGGroup.addEventListener("dblclick",propertyDblClick,false);
	
	// id value
	this.SVGGroup.setAttribute("id", this.id);

	// rect, etc...
	var rect = document.createElementNS(SVGNS,"rect");
	rect.setAttribute("id","rect_" + this.id);
	rect.setAttribute("x",0);
	rect.setAttribute("y",0);
	rect.setAttribute("width",this.width);
	rect.setAttribute("height",currentLayout.boxHeight);
	rect.setAttribute("rx",currentLayout.cornerRadius);
	if (this.optional) {
		var cls = (this === currItem) ? "PropRectOptSelected" : "PropRectOptional";
	} else {
		var cls = (this === currItem) ? "PropRectSelected" : "PropRect";
	}
	rect.setAttribute("class",cls);
	
	this.SVGGroup.appendChild(rect);

	var midY = currentLayout.boxHeight / 2;

	// expando box
	var expando = document.createElementNS(SVGNS,"polygon");
	expando.setAttribute("points", currentLayout.arrowOffset + ',' + (midY - currentLayout.ioYoffset) + ' ' + (currentLayout.arrowOffset * 3) + ',' + midY + ' ' + currentLayout.arrowOffset + ',' + (midY + currentLayout.ioYoffset));
	expando.setAttribute("class","Expando");
	expando.setAttribute("id","expando_" + this.id);
	expando.setAttribute("transform",this.showChildren ? 'rotate(90,' + (currentLayout.arrowOffset * 2) + ',' + midY + ')' : "");
	if ((this.children.length == 0) && (this.numChildren == 0)) {
		expando.setAttribute("style","display: none;");
	}
	else if (this.numChildren > 0){
		expando.setAttribute("class","ExpandoNotLoaded");
	}

	expando.addEventListener("mousedown",expandoMouseDown,false);
	expando.addEventListener("mouseup",expandoMouseUp,false);
	expando.addEventListener("mouseover",expandoMouseOver,false);
	expando.addEventListener("mouseout",expandoMouseOut,false);
	this.SVGGroup.appendChild(expando);
	this.expando = expando;

	// text
	// add viewport to force clipping
	var view = document.createElementNS(SVGNS,"svg");
	view.setAttribute("x",0);
	view.setAttribute("y",0);
	view.setAttribute("width",this.width);
	view.setAttribute("height",currentLayout.boxHeight);
	view.setAttribute("id","viewport_" + this.id);
	this.SVGGroup.appendChild(view);

	var text = document.createElementNS(SVGNS,"text");
	text.setAttribute("class","PropName");
	text.setAttribute("x", 4 * currentLayout.arrowOffset);
	text.setAttribute("y", currentLayout.boxHeight - currentLayout.textYoffset);
	text.setAttribute("id","text_"+this.id);

	// create the text node and append it
	var textNode = document.createTextNode(this.label);
	text.appendChild(textNode);

	view.appendChild(text);

	// default translation
	var transform = 'translate(' + this.xPos + ',' + this.yPos + ')';
	this.SVGGroup.setAttribute("transform",transform);
	
	// add group to DOM
	var canvas = null;
	canvas = document.getElementById('diagramGroup');
	canvas.appendChild(this.SVGGroup);
}

/// set the position of this box
function PropertyBox_place(ypos, visible, redraw)
{
	if (!visible && (this.level > 1)) {
		// hide this box (remove svg for it)
		this.unrender();
		this.isVisible = false;

		if (this.children) {
			for (var n = 0; n < this.children.length; n++) {
				ypos = this.children[n].place(ypos, false);
			}
		}
	}
	else {
		if (redraw) {
			if (this.SVGGroup) {
				this.unrender();
			} else {
				this.SVGGroup = null;
			}
		}
		if (this.level > 1) {
			if (!this.SVGGroup) {
				this.render();
			} 

			var expando = this.expando;
			var midY = currentLayout.boxHeight / 2;
			expando.setAttribute("transform",this.showChildren ? 'rotate(90,' + (2 * currentLayout.arrowOffset) + ',' + midY + ')' : "");

			this.SVGGroup.setAttribute("style","");
			this.isVisible = true;

			// recompute x pos
			var wid =  parseInt(document.getElementById('diagramFrame').getAttribute('width'));
			wid -= (this.level-2) * currentLayout.indent;

			var xpos = parseInt(document.getElementById('diagramFrame').getAttribute('x')) + ((this.level-2) * currentLayout.indent);
			
			this.xPos = xpos;

			if (this === yIndex[this.yPos]) {
				delete yIndex[this.yPos];
			}
			this.yPos = ypos;
			if (this.ordPos != 0) {
				yIndex[this.yPos] = this;
			}
			
			ypos += currentLayout.boxSpacing;

			if ((getOperation() != "move") || (currItem !== this)) {
				var transform = 'translate(' + this.xPos + ',' + this.yPos + ')';
				this.SVGGroup.setAttribute("transform",transform);
			}

			if (wid != this.width) {
				// reset width
				this.width = wid;
				var view = document.getElementById("viewport_" + this.id);
				if (view) {
					view.setAttribute('width',this.width);
				}
				var rect = document.getElementById("rect_" + this.id);
				if (rect) {
					rect.setAttribute('width',this.width);
				}

			}
		}

		if (this.children) {
			for (var n = 0; n < this.children.length; n++) {
				ypos = this.children[n].place(ypos, this.showChildren, redraw);
			}
		}
	}

	return ypos;
}

/// delete svg for this shape
function PropertyBox_unrender()
{
	if (this.SVGGroup) {
		
		boxCount--;

		if (this.children) {
			for (var n = 0; n < this.children.length; n++) {
				this.children[n].unrender();
			}
		}
		// remove SVG elements
		var group = document.getElementById(this.id);
		if (group) {
			var parent = group.parentNode;
			if (parent) {
				parent.removeChild(group);
			}
		}

		this.SVGGroup = null;
		if (this === yIndex[this.yPos]) {
			delete yIndex[this.yPos];
		}
	}
}

function PropertyBox_remove()
{
	this.unrender();
}

// delete currently selected property (and children)
function PropertyBox_deleteProperty()
{
	this.remove();
	var parent = this.parent;
	var ord = this.ordPos;
	var lbl = baseName(this.label);
	parent.children.splice(ord-1,1);
	delete propIndex[this.name];
	delete this;
	
	if (ord > 0) {
		parent.numChildren--;
		addToUndoBuffer();
		for (var i=(ord-1); i < (parent.children.length); i++) {
			var child = parent.children[i];
			child.ordPos--;
		}
	}
	
	adjustNames(parent,lbl);
	
	if ((ord ==1) && (parent.isGroup || parent.isUnion)) {
		if (parent.numChildren > 0) {
			adjustParentGroupNames(parent.children[0]);
		} else {
			removeEmptyGroups(parent);
		}
	}
	zenPage.setModified();

	if (ord > 0) {
		layoutBoxes(true);
	} // otherwise boxes unchanged
}

/// Set up temporary coordinates for a move operation.
function PropertyBox_moveInit()
{
	this._move = { "x": this.xPos, "y": this.yPos };
	
	var y = this.yPos + (currentLayout.boxHeight / 2);
	if (this.ordPos > 0) {
		locator = new LocatorLine(this.xPos,y,this.width);
	} else {
		var x = parseInt(document.getElementById('diagramFrame').getAttribute('x'));
		var wid =  parseInt(document.getElementById('diagramFrame').getAttribute('width'));
		locator = new LocatorLine(x,y,wid);
	}
	locator.render();
	
}

/// Remove temporary coordinate information.
function PropertyBox_moveDiscard()
{
	delete this._move;
	
	var locator = document.getElementById("locatorLine");
	if (locator && locator.owner) {
		locator.owner.unrender();
		delete locator.owner;
	}
	
	if (this.ordPos == 0) {
		this.delete();
	}
}

/// Move this shape to the specified coordinates.
function PropertyBox_moveTo(x,y)
{
	x = parseFloat(x);
	y = parseFloat(y);
	var xPos = Math.round(x);
	var yPos = Math.round(y);

	if (this._move) {
		this._move.x = xPos;
		this._move.y = yPos;
		
		var minX = parseInt(document.getElementById('diagramBox').getAttribute('x'));
		
		var locator = document.getElementById("locatorLine");
		if (locator && locator.owner) {
			locator.owner.unrender();
		}
		
		if (xPos > minX) {
		
			if (boxCount > 1) {
				
				if ((yPos < currentLayout.topBox) && (diagramScrollTop != 0)) {
					canvas_scrollSchema(currentLayout.boxHeight);
				} else if (yPos > (parseInt(document.getElementById('diagramFrame').getAttribute('height')) - currentLayout.boxHeight)) {
					canvas_scrollSchema(-currentLayout.boxHeight);
				}
				
				var key = yPos - ((yPos-currentLayout.topBox-diagramScrollTop) % currentLayout.boxSpacing);
				var before = ((yPos-currentLayout.topBox-diagramScrollTop)%currentLayout.boxSpacing) < (currentLayout.boxHeight/2);
				
				while (!yIndex[key] && ((key != this.yPos)||(this.ordPos == 0)) && (key > (currentLayout.topBox + diagramScrollTop))) {
					key = key - currentLayout.boxSpacing;
					before = 0;
				}
				if (key < (currentLayout.topBox + diagramScrollTop)) {
					key = currentLayout.topBox + diagramScrollTop;
					before = true;
				}
				if ((key == this.yPos) && (this.ordPos !=0)) {
					newSibling = this;
					var y = this.yPos + (currentLayout.boxHeight / 2);
				} else {
					newSibling = yIndex[key];
				}

				var x = newSibling.xPos;
				var wid = newSibling.width;
				
				if (newSibling && (newSibling !== currItem) && (newSibling.numChildren>0) && (!newSibling.showChildren)) {
					expandPropChildren(newSibling);
				}

				if (before) {
					var otherSibling = yIndex[key - currentLayout.boxSpacing];
					if ((key == (this.yPos + currentLayout.boxSpacing)) && (this.ordPos != 0)) {
						var y = this.yPos + (currentLayout.boxHeight / 2);
					} else if ((key != this.yPos) || (this.ordPos == 0)) {
						var y = key - ((currentLayout.boxSpacing - currentLayout.boxHeight) / 2);
					}
				} else {
					var otherSibling = yIndex[key + currentLayout.boxSpacing];
					if ((key == (this.yPos - currentLayout.boxSpacing)) && (this.ordPos != 0)) {
						var y = this.yPos + (currentLayout.boxHeight / 2);
					} else if ((key != this.yPos) || (this.ordPos == 0)) {
						var y = key + currentLayout.boxHeight + ((currentLayout.boxSpacing - currentLayout.boxHeight) / 2);
					}
				}
				
				if (otherSibling && (otherSibling !== currItem) && (otherSibling.numChildren>0) && (!otherSibling.showChildren)) {
					expandPropChildren(otherSibling);
				}

				if (otherSibling && (otherSibling.parent !== newSibling.parent)) {
					// need to check xPos to figure out level
					if (before) {
						var first = otherSibling;
						var last = newSibling;
					} else {
						var first = newSibling;
						var last = otherSibling;
					}
								
					if (first.level < last.level) {
						x = last.xPos;
						wid = last.width;
					} else {
						var found = 0;
						var currSib = first;
						while (!found && (currSib.parent !== last.parent)) {
							var midpoint = (currSib.xPos + currSib.parent.xPos) / 2;
							if (this._move.x > midpoint) {
								found = 1;
							} else {
								currSib = currSib.parent;
							}
						}
						if (found == 1) {
							x = currSib.xPos;
							wid = currSib.width;
						} else {
							x = last.xPos;
							wid = last.width;
						}
					}
				} else if ((otherSibling == null) && !before && (newSibling.level > 2)) {
					var base = propIndex['DocStruct'];
					var found = 0;
					var currSib = newSibling;
					while (!found && (currSib.parent !== base)) {
						var midpoint = (currSib.xPos + currSib.parent.xPos) / 2;
						if (this._move.x > midpoint) {
							found = 1;
						} else {
							currSib = currSib.parent;
						}
					}

					x = currSib.xPos;
					wid = currSib.width;
				}
			} else {
				var y = currentLayout.topBox;
				var x = parseInt(document.getElementById('diagramFrame').getAttribute('x'));
				var wid =  parseInt(document.getElementById('diagramFrame').getAttribute('width'));
			}

			if (locator && locator.owner) {
				locator.owner.xPos = x;
				locator.owner.yPos = y;
				locator.owner.width = wid;
				locator.owner.render();
			} else {
				var loc= new LocatorLine(x,y,wid);
				loc.render();
			}
		} else if (this.ordPos > 0) {
			if (locator && locator.owner) {
				locator.owner.xPos = this.xPos;
				locator.owner.yPos = this.yPos + (currentLayout.boxHeight / 2);
				locator.owner.width = this.width;
				locator.owner.render();
			}
		}
	}
	
	else {
		this.xPos = xPos;
		if (this === yIndex[this.yPos]) {
			delete yIndex[this.yPos];
		}
		this.yPos = yPos;
		if (this.ordPos != 0) {
			yIndex[this.yPos] = this;
		}
	}

	// translate the group
	if (this.SVGGroup) {
		var transform = 'translate(' + xPos + ',' + yPos + ')';
		this.SVGGroup.setAttribute('transform',transform);
	}
}

/// Complete a move operation and move the temporary coordinates into the model.
function PropertyBox_moveComplete()
{
	if (boxCount > 1) {
		var yPos = this._move.y
		var key = yPos - ((yPos-currentLayout.topBox-diagramScrollTop) % currentLayout.boxSpacing);
		var before = ((yPos-currentLayout.topBox-diagramScrollTop)%currentLayout.boxSpacing) < currentLayout.boxHeight/2;
		while (!yIndex[key] && ((key != this.yPos)||(this.ordPos == 0)) && (key > (currentLayout.topBox+diagramScrollTop))) {
			key = key - currentLayout.boxSpacing;
			before = 0;
		}
		if (key < (currentLayout.topBox+diagramScrollTop)) {
			key = currentLayout.topBox+diagramScrollTop;
		}

		var oldOrdinal = this.ordPos;
		var oldParent = this.parent;
		var label = baseName(this.label);

		oldParent.children.splice(oldOrdinal-1,1);

		if (oldOrdinal > 0) {
			oldParent.numChildren--;
			for (var i=oldOrdinal-1; i < (oldParent.children.length); i++) {
				var sibling = oldParent.children[i];
				sibling.ordPos--;
			}

			if ((oldParent.isGroup || oldParent.isUnion) && (oldOrdinal == 1)) {
				if (oldParent.numChildren == 0) {
					removeEmptyGroups(oldParent);
				} else {
					adjustParentGroupNames(oldParent.children[0]);
				}
			}
			adjustNames(oldParent,label);

		} else {
			// make sure scroll bar is correct size for increased segment count
			zenPage.adjustDiagramScrollBox();
		}

		if ((key == this.yPos) && (oldOrdinal != 0)) {
			newSibling = this;
		} else {
			newSibling = yIndex[key];
		}

		var newParent = newSibling.parent;
		if (before) {
			var otherSibling = yIndex[key - currentLayout.boxSpacing];
			var ord = newSibling.ordPos;
		} else {
			var otherSibling = yIndex[key + currentLayout.boxSpacing];
			if (newSibling === this) {
				var ord = this.ordPos;
			} else {
				var ord = newSibling.ordPos + 1;
			}
		}

		if (otherSibling && (otherSibling.parent !== newParent)) {
			// need to check xPos to figure out level
			if (before) {
				var first = otherSibling;
				var last = newSibling;
			} else {
				var first = newSibling;
				var last = otherSibling;
			}

			if (first.level < last.level) {
				newParent = first;
				ord = 1;
			} else {
				var found = 0;
				var currSib = first;
				while (!found && (currSib.parent !== last.parent)) {
					var midpoint = (currSib.xPos + currSib.parent.xPos) / 2;
					if (this._move.x > midpoint) {
						found = 1;
					} else {
						currSib = currSib.parent;
					}
				}
				if (found == 1) {
					newParent = currSib.parent;
					ord = currSib.ordPos + 1;
				} else {
					newParent = last.parent;
					ord = last.ordPos;
				}
			}
		} else if ((otherSibling == null) && !before && (newSibling.level > 2)) {
			var base = propIndex['DocStruct'];
			var found = 0;
			var currSib = newSibling;
			while (!found && (currSib.parent !== base)) {
				var midpoint = (currSib.xPos + currSib.parent.xPos) / 2;
				if (this._move.x > midpoint) {
					found = 1;
				} else {
					currSib = currSib.parent;
				}
			}
			newParent = currSib.parent;
			ord = currSib.ordPos + 1;
		}
		newParent.insertPropAt(this,ord);
	} else {
		this.ordPos = 1;
	}

	this.moveDiscard();
	
	addToUndoBuffer();
	layoutBoxes(true);
	zenPage.setModified();
}

function PropertyBox_insertPropAt(prop,ordinal)
{
	prop.parent = this;
	prop.ordPos = ordinal;
	prop.level = this.level + 1;
	if (prop.numChildren > 0) {
		adjustChildLevels(prop);
	}
	
	this.children.splice(ordinal-1,0,prop);
		
	for (var i=ordinal; i < (this.children.length); i++) {
		var sibling = this.children[i];
		sibling.ordPos++;
	}
	
	this.numChildren++;
	adjustNames(this,baseName(prop.label));
	adjustParentGroupNames(prop);
	zenPage.setModified();
}

function PropertyBox_toggleOptional()
{
	var check = document.getElementById("check_optional");
	var box = document.getElementById("rect_"+this.id);
	if (this.optional) {
		this.optional = false;
		check.setAttribute("visibility","hidden");
		box.setAttribute("class","PropRectSelected");
	} else {
		this.optional = true;
		check.setAttribute("visibility","visible");
		box.setAttribute("class","PropRectOptSelected");
	}
	addToUndoBuffer();
	zenPage.setModified();
}

function PropertyBox_toggleRepeating()
{
	var check = document.getElementById("check_repeating");
	var txt = document.getElementById("text_"+this.id);
	var label = this.label;
	var name = this.name;
	if (this.repeating) {
		this.repeating = false;
		var pos = label.indexOf("(");
		if (pos > 0) {
			label = label.substring(0,pos);
		}
		name = name.substring(0,name.lastIndexOf('.')) + '.' + label;
		check.setAttribute("visibility","hidden");
	} else {
		this.repeating = true;
		label = label + "()";
		name = name + "()";
		check.setAttribute("visibility","visible");
	}
	this.label = label;
	delete propIndex[this.name];
	this.name = name;
	propIndex[name] = this;
	
	while (txt.hasChildNodes()) {
		txt.removeChild(txt.firstChild);
	}
	var textNode = document.createTextNode(label);
	txt.appendChild(textNode);
	addToUndoBuffer();
	zenPage.setModified();
}

function PropertyBox_createGroup()
{
	var parent = this.parent;
	var ord = this.ordPos;
	parent.children.splice(ord-1,1);
	delete propIndex[this.name];
	
	var parent = this.parent;
	var level = this.level;
	
	var lbl = baseName(this.label);
	var label = lbl + 'grp';
	var segName = parent.name + '.' + label;
	
	p = new PropertyBox(null,segName,label,level,ord,1,0,1,0);
	propIndex[segName] = p;
	p.showChildren = true;
	p.parent = parent;
	parent.children.splice(ord-1,0,p);
	
	var newName = p.name + '.' + lbl;
	this.name = newName;
	this.ordPos = 1;
	this.parent = p;
	this.level = level + 1;
	if (this.numChildren > 0) {
		adjustChildLevels(this);
	}
	p.children.splice(0,0,this);
	propIndex[newName] = this;
	
	// if there are multiple of this segment, turning this into a group changes the count 
	adjustNames(parent,lbl);
	// change the name from the segment name to the group name and adjust for any siblings that are already groups by this name
	adjustNames(parent,lbl+'grp');
	
	adjustParentGroupNames(p);
	
	addToUndoBuffer();
	zenPage.setModified();
	layoutBoxes(true);
	selectItem(this);
	showMenu();
}

function PropertyBox_ungroup()
{
	this.remove();
	var ord = this.ordPos;
	var numChildren = this.numChildren;

	for (var i=ord; i < (this.parent.children.length); i++) {
		var sibling = this.parent.children[i];
		sibling.ordPos += (numChildren - 1);
	}

	this.parent.children.splice(ord-1,1);

	if (this.children.length == 0) {
		var idlist = '';
		var obj = this;
		while (obj.parent) {
			idlist = obj.ordPos + ((''==idlist) ? '' : ',') + idlist;
			obj = obj.parent;
		}
		loadSegments(this.name,idlist);
	}
	
	adjustNames(this.parent,this.label);

	for (key in this.children) {
		var child = this.children[key];
		child.parent = this.parent;
		child.ordPos = ord;
		child.isVisible = true;
		child.level--;
		if (child.numChildren > 0) {
			adjustChildLevels(child);
		}
		this.parent.children.splice(ord-1,0,child);
		if (key==0) {
			adjustParentGroupNames(child);
		}
		adjustNames(this.parent,child.label);
		ord++;
	}
	this.parent.numChildren += (numChildren -1);
	
	delete propIndex[this.name];
	delete this;
	addToUndoBuffer();
	layoutBoxes(true);
	selectItem(null);
	zenPage.setModified();
}

function PropertyBox_createUnion()
{
	var parent = this.parent;
	var ord = this.ordPos;
	parent.children.splice(ord-1,1);
	delete propIndex[this.name];
	
	var parent = this.parent;
	var level = this.level;
	
	var lbl = baseName(this.label);
	var label = lbl + 'union';
	var segName = parent.name + '.' + label;
	
	p = new PropertyBox(null,segName,label,level,ord,1,0,0,1);
	propIndex[segName] = p;
	p.showChildren = true;
	p.parent = parent;
	parent.children.splice(ord-1,0,p);
	
	var newName = p.name + '.' + lbl;
	this.name = newName;
	this.ordPos = 1;
	this.parent = p;
	this.level = level + 1;
	if (this.numChildren > 0) {
		adjustChildLevels(this);
	}
	p.children.splice(0,0,this);
	propIndex[newName] = this;
	
	// if there are multiple of this segment, turning this into a group changes the count 
	adjustNames(parent,lbl);
	// change the name from the segment name to the group name and adjust for any siblings that are already groups by this name
	adjustNames(parent,lbl+'union');
	
	adjustParentGroupNames(p);
	
	addToUndoBuffer();
	zenPage.setModified();
	layoutBoxes(true);
	selectItem(this);
	showMenu();
}

function PropertyBox_undoUnion()
{
	this.ungroup();
}


// ----------------------------------------------------------------------------------------------------
// Menu options

// menu object
function Menu(property)
{
	this.gtype = 'menu';
	this.propBox = property;
	this.isGroup = property.isGroup;
	this.isRepeating = property.repeating;
	this.isOptional = property.optional;
	this.isChoice = property.isUnion;
	
	this.id = 'menu';
	this.render = Menu_render;
	this.unrender = Menu_unrender;
}

function Menu_render()
{
	if (this.SVGGroup) {
		return;
	}

	// group with elements inside
	this.SVGGroup = document.createElementNS(SVGNS,"g");
	
	// backpointer to object
	this.SVGGroup.owner = this;
	
	// id value
	this.SVGGroup.setAttribute("id", 'menu');
	
	this.SVGGroup.addEventListener("mousedown",menuMouseDown,false);
	
	var rowY = currentLayout.menuRowHeight;
	var rows = 7;
	var menuHeight = 5 + (rows*currentLayout.menuRowHeight);
	var rowCount = 1;
	
	// box
	var rect = document.createElementNS(SVGNS,"rect");
	rect.setAttribute("id","menu_rect");
	rect.setAttribute("x",0);
	rect.setAttribute("y",0);
	rect.setAttribute("width",currentLayout.menuWidth);
	rect.setAttribute("height",menuHeight);
	rect.setAttribute("rx",currentLayout.cornerRadius);
	rect.setAttribute("class","Menu");
	
	this.SVGGroup.appendChild(rect);
	
	// add viewport to force clipping
	var view = document.createElementNS(SVGNS,"svg");
	view.setAttribute("x",0);
	view.setAttribute("y",0);
	view.setAttribute("width",currentLayout.menuWidth);
	view.setAttribute("height",menuHeight);
	view.setAttribute("id","menu_viewport");

	// Group
	// create the checkbox
	drawCheckbox(view,(rowCount-1)*rowY + 2,menuToggleGroup,"check_group",this.propBox.isGroup);
	// create the text
	var text = document.createElementNS(SVGNS,"text");
	text.setAttribute("class","MenuOption");
	text.setAttribute("x", currentLayout.checkboxSize + 5);
	text.setAttribute("y", (rowCount*rowY)-4);
	var textNode = document.createTextNode("Group");
	text.appendChild(textNode);
	// append the text
	view.appendChild(text);
	rowCount++;
	
	// Optional
	// create the checkbox
	drawCheckbox(view,(rowCount-1)*rowY + 2,menuToggleOpt,"check_optional",this.propBox.optional);
	// create the text
	var text = document.createElementNS(SVGNS,"text");
	text.setAttribute("class","MenuOption");
	text.setAttribute("x", currentLayout.checkboxSize + 5);
	text.setAttribute("y", (rowCount * rowY) - 4);
	var textNode = document.createTextNode("Optional");
	text.appendChild(textNode);
	// append the text
	view.appendChild(text);
	rowCount++;
	
	// Repeating
	// create the checkbox
	drawCheckbox(view,(rowCount-1)*rowY + 2,menuToggleRep,"check_repeating",this.propBox.repeating);
	// create the text
	var text = document.createElementNS(SVGNS,"text");
	text.setAttribute("class","MenuOption");
	text.setAttribute("x", currentLayout.checkboxSize + 5);
	text.setAttribute("y", (rowCount*rowY) - 4);
	var textNode = document.createTextNode("Repeating");
	text.appendChild(textNode);
	// append the text
	view.appendChild(text);
	rowCount++;
	
	// Choice
	// create the checkbox
	drawCheckbox(view,(rowCount-1)*rowY + 2,menuToggleUnion,"check_choice",this.propBox.isUnion);
	// create the text
	var text = document.createElementNS(SVGNS,"text");
	text.setAttribute("class","MenuOption");
	text.setAttribute("x", currentLayout.checkboxSize + 5);
	text.setAttribute("y", (rowCount*rowY) - 4);
	var textNode = document.createTextNode("Choice");
	text.appendChild(textNode);
	// append the text
	view.appendChild(text);
	rowCount++;
	
	// Copy (only enabled if group or choice)
	var enabled = (this.propBox.numChildren > 0) ? true : false;
	// create the copy image
	var img = document.createElementNS(SVGNS,"svg");
	img.setAttribute("x", 4);
	img.setAttribute("y", ((rowCount-1) * rowY) + 4);
	img.setAttribute("valign","top");
	img.setAttribute("height",(currentLayout.checkboxSize*0.6));
	img.setAttribute("width",(currentLayout.checkboxSize*0.6));
	img.setAttribute("class","svg-inline--fa fa-copy");
	img.setAttribute("aria-hidden",true);
	img.setAttribute("data-fa-i2svg","");
	img.setAttribute("data-prefix","far");
	img.setAttribute("data-icon","copy");
	img.setAttribute("role","img");
	img.setAttribute("xmlns","http://www.w3.org/2000/svg");
	img.setAttribute("viewBox","0 0 448 512");
	var path = document.createElementNS(SVGNS,"path");
	if (enabled) {
		path.setAttribute("fill","#00999D");
		img.addEventListener("click",menuCopyGroup,false);
		img.setAttribute("style","cursor:pointer");
	} else {
		path.setAttribute("fill","silver");
	}	
	path.setAttribute("d","M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z");
	img.appendChild(path);
	view.appendChild(img);
	// create the text
	var text = document.createElementNS(SVGNS,"text");
	text.setAttribute("class",(enabled) ? "MenuOption" : "MenuOptionDisabled");
	text.setAttribute("x", currentLayout.checkboxSize + 5);
	text.setAttribute("y", (rowCount * rowY) - 4);
	var textNode = document.createTextNode("Copy");
	text.appendChild(textNode);
	// append the text
	view.appendChild(text);
	rowCount++;
	
	// Paste (only enabled if item on clipboard)
	enabled = clipboardItem ? true : false;
	// create the paste image
	var img = document.createElementNS(SVGNS,"svg");
	img.setAttribute("x", 4);
	img.setAttribute("y", ((rowCount-1) * rowY) + 4);
	img.setAttribute("valign","top");
	img.setAttribute("height",(currentLayout.checkboxSize*0.6));
	img.setAttribute("width",(currentLayout.checkboxSize*0.6));
	img.setAttribute("class","svg-inline--fa fa-paste");
	img.setAttribute("aria-hidden",true);
	img.setAttribute("data-fa-i2svg","");
	img.setAttribute("data-prefix","far");
	img.setAttribute("data-icon","paste");
	img.setAttribute("role","img");
	img.setAttribute("xmlns","http://www.w3.org/2000/svg");
	img.setAttribute("viewBox","0 0 448 512");
	var path = document.createElementNS(SVGNS,"path");
	if (enabled) {
		path.setAttribute("fill","#00999D");
		img.setAttribute("style","cursor:pointer");
		img.addEventListener("click",menuPasteGroup,false);
	} else {
		path.setAttribute("fill","silver");
	}
	path.setAttribute("d","M384 112v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h80c0-35.29 28.71-64 64-64s64 28.71 64 64h80c26.51 0 48 21.49 48 48zM192 40c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24m96 114v-20a6 6 0 0 0-6-6H102a6 6 0 0 0-6 6v20a6 6 0 0 0 6 6h180a6 6 0 0 0 6-6z");
	img.appendChild(path);
	view.appendChild(img);
	// create the text
	var text = document.createElementNS(SVGNS,"text");
	text.setAttribute("class",(enabled) ? "MenuOption" : "MenuOptionDisabled");
	text.setAttribute("x", currentLayout.checkboxSize + 5);
	text.setAttribute("y", (rowCount * rowY) - 4);
	var textNode = document.createTextNode("Paste after");
	text.appendChild(textNode);
	// append the text
	view.appendChild(text);
	rowCount++;
	
	// Delete
	// create the trash can image
	var img = document.createElementNS(SVGNS,"svg");
	img.setAttribute("x", 4);
	img.setAttribute("y", ((rowCount-1) * rowY) + 4);
	img.setAttribute("valign","top");
	img.setAttribute("height",(currentLayout.checkboxSize*0.6));
	img.setAttribute("width",(currentLayout.checkboxSize*0.6));
	img.setAttribute("class","svg-inline--fa fa-trash-alt");
	img.setAttribute("aria-hidden",true);
	img.setAttribute("data-fa-i2svg","");
	img.setAttribute("data-prefix","far");
	img.setAttribute("data-icon","trash-alt");
	img.setAttribute("role","img");
	img.setAttribute("style","cursor:pointer");
	img.setAttribute("xmlns","http://www.w3.org/2000/svg");
	img.addEventListener("click",menuDeleteProp,false);
	img.setAttribute("viewBox","0 0 448 512");
	var path = document.createElementNS(SVGNS,"path");
	path.setAttribute("fill","#dc3545");
	path.setAttribute("d","M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm416 56v324c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V140c0-6.6 5.4-12 12-12h360c6.6 0 12 5.4 12 12zm-272 68c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208z");
	img.appendChild(path);
	view.appendChild(img);
	// create the text
	var text = document.createElementNS(SVGNS,"text");
	text.setAttribute("class","MenuOption");
	text.setAttribute("x", currentLayout.checkboxSize + 5);
	text.setAttribute("y", (rowCount * rowY) - 4);
	var textNode = document.createTextNode("Delete");text.appendChild(textNode);
	// append the text
	view.appendChild(text);
	
	// add view to SVG Group
	this.SVGGroup.appendChild(view);
	
	// figure out positioning
	var diagramBox = document.getElementById("diagramBox");
	var xPos = parseInt(diagramBox.getAttribute("x")) + parseInt(diagramBox.getAttribute("width")) - currentLayout.menuWidth - 100;
	var yPos = this.propBox.yPos;
	if ((yPos + menuHeight) > (diagramBox.getAttribute("height")-5)) {
		yPos = this.propBox.yPos + (currentLayout.boxHeight/2) - menuHeight;
	}
	
	var transform = 'translate(' + xPos + ',' + yPos + ')';
	this.SVGGroup.setAttribute("transform",transform);

	// add group to DOM
	var canvas = null;
	canvas = document.getElementById("diagramGroup");
	canvas.appendChild(this.SVGGroup);
}

/// delete svg for the menu
function Menu_unrender()
{
	if (this.SVGGroup) {

		// remove SVG elements
		var group = document.getElementById("menu");
		if (group) {
			var parent = group.parentNode;
			if (parent) {
				parent.removeChild(group);
			}
		}

		this.SVGGroup = null;
	}
}

function drawCheckbox(parent,y,func,id,visible)
{
	var checkbox = document.createElementNS(SVGNS,"svg");
	checkbox.setAttribute("x",0);
	checkbox.setAttribute("y", y);
	checkbox.setAttribute("width",currentLayout.checkboxSize);
	checkbox.setAttribute("height",currentLayout.checkboxSize);
	checkbox.setAttribute("style","cursor:pointer");
	
	var box = document.createElementNS(SVGNS,"rect");
	box.setAttribute("x",(currentLayout.checkboxSize * 0.2));
	box.setAttribute("y",(currentLayout.checkboxSize * 0.2));
	box.setAttribute("width",currentLayout.checkboxSize * 0.6);
	box.setAttribute("height",currentLayout.checkboxSize * 0.6);
	box.setAttribute("class","Checkbox");
	box.addEventListener("click",func,false);
	checkbox.appendChild(box);
	
	var check = document.createElementNS(SVGNS,"polyline");
	check.setAttribute("id",id);
	var points = (currentLayout.checkboxSize * 0.25) + "," + (currentLayout.checkboxSize * 0.6);
	points = points + " " + (currentLayout.checkboxSize * 0.5 ) + "," + (currentLayout.checkboxSize * 0.75);
	points = points + " " + (currentLayout.checkboxSize * 0.9)+","+ (currentLayout.checkboxSize * 0.1);
	check.setAttribute("points",points);
	check.setAttribute("class","Checkmark");
	check.setAttribute("visibility",visible ? "visible" : "hidden");
	checkbox.appendChild(check);
	parent.appendChild(checkbox);
}

function menuMouseDown(evt)
{
	evt.stopPropagation();
	setOperation("menuClick");
}

function showMenu()
{
	if (readOnlyFlag) {
		return;
	}
	// first make sure old menu is not visible
	hideMenu();
	
	if (currItem) {
		menu = new Menu(currItem);
		menu.render();
	}
}

function hideMenu()
{
	var menu = document.getElementById("menu");
	if (menu && menu.owner) {
		menu.owner.unrender();
		delete menu.owner;
	}
}

function menuToggleRep(evt)
{
	evt.stopPropagation();
	if (currItem) {
		currItem.toggleRep();
	}
}

function menuToggleOpt(evt)
{
	evt.stopPropagation();
	if (currItem) {
		currItem.toggleOpt();
	}
}

function menuToggleUnion(evt)
{
	evt.stopPropagation();
	if (currItem) {
		if (currItem.isUnion) {
			currItem.unUnionize();
		} else {
			currItem.unionize();
		}
	}
}

function menuToggleGroup(evt)
{
	evt.stopPropagation();
	if (currItem) {
		if (currItem.isGroup) {
			currItem.ungroup();
		} else {
			currItem.group();
		}
	}
}

function menuDeleteProp(evt)
{
	evt.stopPropagation();
	if (currItem) {
		currItem.delete();
	}
}

function menuCopyGroup(evt)
{
	evt.stopPropagation();
	if (currItem && (currItem.isGroup || currItem.isUnion)) {
		clipboardItem = copyItem(currItem);
	}
}

function menuPasteGroup(evt)
{
	evt.stopPropagation();
	if ((clipboardItem) && currItem) {
		var pasteItem = copyItem(clipboardItem);
		currItem.parent.insertPropAt(pasteItem,currItem.ordPos+1);
		layoutBoxes(true);
	}
}

//-------------------------------------------------------------------------------------------------------
// Locator line for property box movement

function LocatorLine(xPos,yPos,wid)
{
	this.gtype = 'line';
	this.yPos = yPos;
	this.xPos = xPos;
	this.width = wid;
	
	this.id = 'locator';
	this.render = LocatorLine_render;
	this.unrender = LocatorLine_unrender;
}

function LocatorLine_render()
{
	if (this.SVGGroup) {
		return;
	}
	
	// group with elements inside
	this.SVGGroup = document.createElementNS(SVGNS,"g");
	
	// backpointer to object
	this.SVGGroup.owner = this;
	// id value
	this.SVGGroup.setAttribute("id", 'locatorLine');
	
	var line = document.createElementNS(SVGNS,"line");
	line.setAttribute("x1",this.xPos+(currentLayout.circleRadius*2));
	line.setAttribute("x2",this.xPos+this.width);
	line.setAttribute("y1",this.yPos);
	line.setAttribute("y2",this.yPos);
	line.setAttribute("class","LocatorLine");
	
	var marker = document.createElementNS(SVGNS,"circle");
	marker.setAttribute("r",currentLayout.circleRadius);
	marker.setAttribute("cx",this.xPos+currentLayout.circleRadius);
	marker.setAttribute("cy",this.yPos);
	marker.setAttribute("class","LocatorCircle");
	
	this.SVGGroup.appendChild(marker);
	this.SVGGroup.appendChild(line);
	
	// add group to DOM
	var canvas = null;
	canvas = document.getElementById('diagramGroup');

	canvas.appendChild(this.SVGGroup);
}

function LocatorLine_unrender()
{
	if (this.SVGGroup) {

		// remove SVG elements
		var group = document.getElementById("locatorLine");
		if (group) {
			var parent = group.parentNode;
			if (parent) {
				parent.removeChild(group);
			}
		}

		this.SVGGroup = null;
	}
}



// ------------------------------------------------------------------------------------------------------------------------------------------------------
// Utility functions

function selectItem(newItem)
{
	try {
		hideMenu();
		var locator = document.getElementById("locatorLine");
		if (locator && locator.owner) {
			locator.owner.unrender();
			delete locator.owner;
		}
		
		if (currItem != newItem) {
			if (currItem && ((currItem.gtype == 'property') || (currItem.gtype == 'segment'))) {
				// unselect property
				var rect = document.getElementById("rect_" + currItem.id);
				if (rect) {
					var cls = (currItem.optional && (currItem.gtype == 'property')) ? "PropRectOptional" : "PropRect";
					rect.setAttribute("class",cls);
				}
				currItem = null;
			}

			if (newItem) {
				// select new item
				currItem = newItem;
				if (currItem && ((currItem.gtype == 'property') || (currItem.gtype == 'segment'))) {
					// select property
					var rect = document.getElementById("rect_" + currItem.id);
					if (rect) {
						var cls = (currItem.optional && (currItem.gtype == 'property')) ? "PropRectOptSelected" : "PropRectSelected";
						rect.setAttribute("class",cls);
					}
				}
			}
		}
	}
	catch (ex) {
		if (zenPage && zenPage.window && zenPage.window.zenExceptionHandler) {
			zenPage.window.zenExceptionHandler(ex,arguments,'Exception in selectItem().');
		}
		else {
			throw ex;
		}
	}
}

function addToUndoBuffer()
{
	var raw = getRawStruct();
	zenPage.incrementKeyBuffer(raw,0)
}
function getRawStruct()
{
	var raw = '';
	var box = propIndex['DocStruct'];
	if (box) {
		raw = getRawProp(box);
	}
	return raw;
}

function getRawProp(box)
{
	var raw = '';
	var count = 0;
	
	for (key in box.children) {
		
		var currProp = box.children[key];
		
		if (box.isUnion && count) {
			raw = raw + "~|";
		}
		count++;
		
		if (currProp.numChildren > 0) {
			if (currProp.children.length == 0) {
				var idlist = '';
				var obj = currProp;
				while (obj.parent) {
					idlist = obj.ordPos + ((''==idlist) ? '' : ',') + idlist;
					obj = obj.parent;
				}
				loadSegments(currProp.name,idlist);
				
			}
			raw = (raw == "") ? "" : raw + "~"
			raw = (currProp.optional) ? raw + "[~" : raw;
			raw = (currProp.repeating) ? raw + "{~" : raw;
			raw = (currProp.isUnion) ? raw + "<~" : raw;
			raw = raw + getRawProp(currProp);
			raw = (currProp.isUnion) ? raw + "~>" : raw;
			raw = (currProp.repeating) ? raw + "~}" : raw;
			raw = (currProp.optional) ? raw + "~]" : raw;
		} else {
			raw = (raw == "") ? "" : raw + "~"
			raw = (currProp.optional) ? raw + "[~" : raw;
			raw = (currProp.repeating) ? raw + "{~" : raw;
			raw = raw + baseName(currProp.label);
			raw = (currProp.repeating) ? raw + "~}" : raw;
			raw = (currProp.optional) ? raw + "~]" : raw;
		}
	}
	return raw;
}

function removeEmptyGroups(prop)
{
	if ((prop.isGroup || prop.isUnion) && (prop.numChildren == 0)) {
		var parent = prop.parent;
		prop.delete();
		if (parent.numChildren == 0) {
			removeEmptyGroups(parent);
		} else {
			adjustParentGroupNames(parent.children[0]);
		}
	}
}

function copyItem(oldProp)
{
	var base = null;
	var name = oldProp.label;
	newProp = new PropertyBox(base,name,oldProp.label,0,0,oldProp.numChildren,oldProp.optional,oldProp.isGroup,oldProp.isUnion);
	copyGroup(oldProp,newProp);
	return newProp;
}

function copyGroup(oldParent,newParent)
{
	if (oldParent.children.length == 0) {
		var idlist = '';
		var obj = oldParent;
		while (obj.parent) {
			idlist = obj.ordPos + ((''==idlist) ? '' : ',') + idlist;
			obj = obj.parent;
		}
		loadSegments(oldParent.name,idlist);
	}

	for (key in oldParent.children) {
		var child = oldParent.children[key];
		var name = newParent.name + '.' + child.label;
		newChild = new PropertyBox(newParent,name,child.label,0,child.ordPos,child.numChildren,child.optional,child.isGroup,child.isUnion);
		
		if (child.numChildren > 0) {
			copyGroup(child,newChild);
		}
	}
}

function moveStart(evt)
{
	if (!currItem) return;
	var prop = currItem;

	// start move operation for selected property
	this.moveList = [];
	this.setOperation('move');

	// calculate offset of mouse from property box
	mouseHandling.delta.x = prop.xPos - evt.clientX;
	mouseHandling.delta.y = prop.yPos - evt.clientY;

	// remember start of move
	mouseHandling.start.x = prop.xPos;
	mouseHandling.start.y = prop.yPos;
}

function segAddStart(evt)
{
	if (!currSegment) return;
	var seg = currSegment;

	// start add operation to pull seg over from segs list to structure
	this.moveList = [];
	this.setOperation('add');
	
	// calculate offset of mouse from segment box
	mouseHandling.delta.x = seg.xPos - evt.clientX;
	mouseHandling.delta.y = seg.yPos - evt.clientY;
	
	// remember start of move
	mouseHandling.start.x = seg.xPos;
	mouseHandling.start.y = seg.yPos;
}

/// Wrapper method for move complete logic
function moveComplete()
{
	if (this.moveItem) {
		if (this.moveList.length > 0) {
			var item = currItem;
			if (item) {
				var minX = parseInt(document.getElementById('diagramBox').getAttribute('x'));
				if (item._move.x > minX) {
					item.moveComplete();
					selectItem(item);
				} else {
					moveCancelled();
				}
			}
		}

		// done moving
		this.moveItem = null;
		this.moveList = [];

	}
	this.setOperation(null);
	zenPage.setModified();
}

function moveCancelled()
{
	if (this.moveItem) {
		var item = this.moveItem;
				
		item.moveDiscard();
				
		if (item.ordPos != 0) { // only segments that were already in the schema move back to original location, segs from list just disappear
			item.moveTo(item.xPos,item.yPos);
			selectItem(item);
		}
		
		this.moveItem = null;
		moveList = [];
		
	}
	setOperation(null);
}

function adjustNames(parent, label)
{
	label = baseName(label);
	var found = 0;
	for (key in parent.children) {
		var sibling = parent.children[key];
		if (sibling.label.substring(0,label.length) == label) {
			//make sure sibling really does have exactly same label
			var sibName = baseName(sibling.label);
			if (sibName == label) {
				found++;
				delete propIndex[sibling.name];
				if (found > 1) {
					var sibLabel = label + 'i' + found + ((sibling.repeating) ? '()' : '');
				} else {
					var sibLabel = label + ((sibling.repeating) ? '()' : '');
				}
				sibName = parent.name + '.' + sibLabel;
				sibling.name = sibName;
				sibling.label = sibLabel;
				propIndex[sibName] = sibling;
				if (sibling.numChildren > 0) {
					adjustChildNames(sibling);
				}
			}
		}
	}
}

function adjustChildNames(prop)
{
	for (key in prop.children) {
		var child = prop.children[key];
		delete propIndex[child.name];
		child.name = prop.name + '.' + child.label;
		propIndex[child.name] = child;
		if (child.numChildren > 0) {
			adjustChildNames(child);
		}
	}
}

// deal with case where we created a group from the first segment in a group
function adjustParentGroupNames(prop)
{
	if ((prop.ordPos == 1) && (prop.parent.isGroup || prop.parent.isUnion)) {
		var lbl = baseName(prop.label);
		var parent = prop.parent;
		var parentLbl = baseName(parent.label);
		var label = lbl + ((parent.isGroup) ? 'grp' : 'union');
		parent.label = label;
		adjustNames(parent.parent,parentLbl);
		adjustNames(parent.parent,label);
		if (parent.ordPos == 1) {
			adjustParentGroupNames(parent);
		}
		adjustChildNames(parent);
	}
}

function baseName(label)
{
	var pos = label.indexOf("(");
	if (pos > 0) {
		label = label.substring(0,pos);
	}
	var pos2 = label.lastIndexOf("i");
	if (pos2 > 0) {
		var next = label.charAt(pos2+1)
		if (parseInt(next) == next) {
			label = label.substring(0,pos2);
		}
	}
	return label;
}

function adjustChildLevels(prop)
{
	var childLevel = prop.level + 1;
	for (key in prop.children) {
		var child = prop.children[key];
		child.level = childLevel;
		if (child.numChildren > 0) {
			adjustChildLevels(child);
		}
	}
}

/// Set the current operation.
function setOperation(operation)
{
	switch(operation) {
		case null:
		case 'listScroll':
		case 'diagramScroll':
		case 'menuClick':
		case 'move':
		case 'add':
		case 'select':
			this.currentOperation = operation;
			break;
	}
}

function getOperation()
{
	return this.currentOperation;
}

function getListScrollTop()
{
	return listScrollTop;
}

function getDiagramScrollTop()
{
	return diagramScrollTop;
}

// ----------------------------------------------------------------------------------------------------------------------------------
// mouse events

function canvasMouseMove(evt)
{
	evt.stopPropagation();
	if (this.currentOperation == 'move') {
		hideMenu();
		if (currItem) {
			if (!this.moveItem || (this.moveItem == null)) {
				this.moveItem = currItem;
				if ((currItem.numChildren > 0) && (currItem.showChildren)) {
					this.moveItem.showChildren = false;
					layoutBoxes();
					zenPage.adjustDiagramScrollBox();
				}
				if (currItem.moveTo && currItem.moveInit) {
					currItem.moveInit();
					this.moveList.push({ "xPos": currItem.xPos, "yPos": currItem.yPos });
				}
			}
		}
		if (this.moveItem) {
			// update position of selected shapes
			var newX = (evt.clientX + mouseHandling.delta.x);
			var newY = (evt.clientY + mouseHandling.delta.y);
			this.moveItem.moveTo(newX,newY, false);
		}
	} else if (this.currentOperation == 'add') {
		// Now that the user has moved the mouse, we know user is dragging segment from seg list to structure diagram
		// Create new diagram box that can be added to the diagram 
		// and change operation to 'move' so that the new box can be dragged into place
		var item = currSegment;
		prop = new PropertyBox(propIndex['DocStruct'],item.name,item.name,2,0,0,0,0,0);
		prop.moveTo(item.xPos,item.yPos);
		selectItem(prop);
		this.currentOperation = 'move';
		currSegment = null;
	} else if (this.currentOperation == 'listScroll') {
		var newTop = (evt.clientY + mouseHandling.delta.y);
		var scrollBox = document.getElementById('listScrollBox');
		var barHgt = document.getElementById('listScrollRect').getAttribute('height') - 28 - 4;
		var scrollSize = parseInt(scrollBox.getAttribute('height'));
		
		newTop = newTop - 21;
		if (newTop < 0) {
			newTop = 0;
		} else if ((newTop + scrollSize) > barHgt) {
			newTop = barHgt - scrollSize;
		}
		var percent = newTop / barHgt;
		var offset = -percent * getSegListHgt();
		setListScroll(offset);
		layoutSegList();
	} else if (this.currentOperation == 'diagramScroll') {
		doDiagramScroll(evt);
	}
}

function doDiagramScroll(evt)
{
	var newTop = (evt.clientY + mouseHandling.delta.y);
	var scrollBox = document.getElementById('diagramScrollBox');
	var barHgt = document.getElementById('diagramScrollRect').getAttribute('height') - 28 - 4;
	var scrollSize = parseInt(scrollBox.getAttribute('height'));
	
	newTop = newTop - 21;
	
	if (newTop < 0) {
		newTop = 0;
	} else if ((newTop + scrollSize) > barHgt) {
		newTop = barHgt - scrollSize;
	}
	var percent = newTop / barHgt;
	var offset = -percent * getDiagramHgt();
	setScroll(offset);
	layoutBoxes();
}

function canvasMouseUp(evt)
{
	evt.stopPropagation();
	if (evt.button != 0) return; // we only care about primary button
	if (zenPage && zenPage._textMonitor) zenPage._textMonitor.processing = false;
	switch (this.currentOperation) {
		case 'move':
			this.setOperation(null);
			if (this.moveItem) {
				this.moveComplete();
			} else if (currItem) {
				if (currItem.ordPos != 0) {
					this.showMenu();
				} else {
					currItem.delete();
				}
			}
			break;
		case 'add':
			this.setOperation(null);
			if (currSegment) {
				currSegment = null;
			}
			break;
		case 'listScroll':
		case 'diagramScroll':
		case 'select':
		case 'menuClick':
			this.setOperation(null);
			break;
		default:	// unselect everything
			//this.selectItem(null);
			break;
	}
}

function canvasMouseOut(evt)
{
	evt.stopPropagation();
	if (this.currentOperation == 'move') {
		locLineToOrigPos();
	}
}

// position locator line to where the current move item started, indicating that no move will occur if mouse released here
function locLineToOrigPos()
{
	var locator = document.getElementById("locatorLine");
	if (locator && locator.owner) {
		locator.owner.unrender();
		if (this.moveItem && (this.moveItem.ordPos > 0)) {
			locator.owner.xPos = this.moveItem.xPos;
			locator.owner.yPos = this.moveItem.yPos + (currentLayout.boxHeight / 2);
			locator.owner.width = this.moveItem.width;
			locator.owner.render();
		}
	}
}

function diagramMouseOut(evt)
{
	if ((this.currentOperation == 'move') && (evt.clientY > 0)) {
		evt.stopPropagation();
	}
}

function propertyClick(evt)
{
	// run check for IE double-click
	if (evt.getDetail && (evt.getDetail() == 2)) {
		return propertyDblClick(evt);
	}
	evt.stopPropagation();
}

function propertyDblClick(evt)
{
	evt.stopPropagation();
	var el = evt.target;
	var item = el.parentNode.owner;
	if (item) {
		var prop = item.label;
		if (prop != null) {
			zenPage.propertyClick(prop);
		}
	}
}

function propertyMouseDown(evt)
{
	evt.stopPropagation();
	// run check for IE double-click
	if (evt.getDetail && (evt.getDetail() == 2)) {
		return propertyDblClick(evt);
	}
	
	var el = evt.target;
	selectItem(el.parentNode.owner);
	
	setOperation('select');

	if (readOnlyFlag) {
		// no movement for read only mode
		return;
	}

	if (evt.button == 0) {
		moveStart(evt);
	}
	return;
}

function segmentClick(evt)
{
	// run check for IE double-click
	if (evt.getDetail && (evt.getDetail() == 2)) {
		return propertyDblClick(evt);
	}
	evt.stopPropagation();
}

function segmentDblClick(evt)
{
	evt.stopPropagation();
	var el = evt.target;
	var item = el.parentNode.owner;
	if (item) {
		var seg = item.name;
		if (seg != null) {
			zenPage.propertyClick(seg);
		}
	}
}

function segmentMouseDown(evt)
{
	evt.stopPropagation();
	selectItem(null);
	if (evt.getDetail && (evt.getDetail() == 2)) {
		return segmentDblClick(evt);
	}
	
	if (readOnlyFlag) {
		// no movement for read only mode
		return;
	}
	
	if (evt.button == 0) {
		var el = evt.target;
		currSegment = el.parentNode.owner;
		segAddStart(evt);
	}
	return;
}

function expandoMouseDown(evt)
{
	var el = evt.target;
	evt.stopPropagation();

	// find related property
	var box = el.parentNode.owner;

	// toggle children
	if (box) {
		// select this item
		selectItem(box);
		
		if (box.showChildren) {
			box.showChildren = false;
			layoutBoxes(true);
		} else {
			expandPropChildren(box);
		}

		showMenu();
	}
}

function expandPropChildren(prop)
{
	var expando = document.getElementById("expando_" + prop.id);
	expando.setAttribute("class","Expando");
	
	// see if children are loaded...
	if (prop.children.length == 0) {

		startStatusBar(prop.xPos + 25, prop.yPos + 1);

		var idlist = '';
		var obj = prop;
		while (obj.parent) {
			idlist = obj.ordPos + ((''==idlist) ? '' : ',') + idlist;
			obj = obj.parent;
		}
		loadSegments(prop.name,idlist);
	}
	else {
		prop.showChildren = true;
		layoutBoxes(true);
	}
}

function expandoMouseUp(evt)
{
	var el = evt.target;
	evt.stopPropagation();
}

function expandoMouseOut(evt)
{
	var el = evt.target;
	evt.stopPropagation();

	// find related property
	var box = el.parentNode.owner;
	if (box && (box.children.length < box.numChildren)) {
		el.setAttribute("class","ExpandoNotLoaded");
	}
	else {
		el.setAttribute("class","Expando");
	}
}

function expandoMouseOver(evt)
{
	var el = evt.target;
	evt.stopPropagation();

	el.setAttribute("class","ExpandoDown");
}

