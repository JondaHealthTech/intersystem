/*
	ensdtlzen.js

	Copyright (c) 2011-2021, InterSystems Corp.
	ALL RIGHTS RESERVED

	Core JS for DTL Editor -- Zen Edition
*/

/// Useful constants
var SVGNS = "http://www.w3.org/2000/svg";
var ZENNS = "http://www.intersystems.com/zen";

var layoutConstant = {
	"boxHeight": 18,
	"boxSpacing": 28,
	"circleRadius": 5,
	"arrowOffset": 5,
	"ioXoffset": 4,
	"ioYoffset": 6,
	"indent": 30,
	"cornerRadius": 4,
	"fontSize": 10.5,
	"textYoffset": 5,
	"markerShort": 6,
	"markerLong": 8
};
var currentLayout = {
	"boxHeight": 18,
	"boxSpacing": 28,
	"circleRadius": 5,
	"arrowOffset": 5,
	"ioXoffset": 4,
	"ioYoffset": 6,
	"indent": 30,
	"cornerRadius": 4,
	"fontSize": 10.5,
	"textYoffset": 5,
	"markerShort": 6,
	"markerLong": 8
};

if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(searchElement,fromIndex) {
		fromIndex = !fromIndex ? 0 : parseInt(fromIndex,10);
		if (isNaN(fromIndex)) fromIndex = 0;
		var pos = -1;
		for (var i = 0; i < this.length; i++) {
			if (this[i] === searchElement) {
				pos = i;
				break;
			}
		}
		return pos;
	}
}

var theTransform = null;

/// Connect to function in outer DTLEditor
function isVDoc(cls) {
	return zenPage.isVDoc(cls);
}

function isMiniMode() {
	return zenPage.miniMode;
}

/// Get information on the ancestors of the current selected action
/// This is used for collections and key names.
/// Returns an array of ancestor information, most immediate first.
function getParentActionInfo()
{
	// dispatch to outer DTL editor
	return zenPage.getParentActionInfo();
}

/// copy of zoom value
var currZoom = 100;

// common variables
var canvasName = 'dtl';

var xmlDoc = null;

/// position of spine: this gets updated by the containing page
var spineX = 500;

// scrolling
var targetScrollTop = 0;
var sourceScrollTop = 0;

/// count of property boxes
var boxCount = 0;
var maxBoxes = 300;

var maxConnections = 6; // max connections to single box

var readOnlyFlag = false;
var mouseScale = 100;
var api = new Object();

/// selected item (object)
var currItem = null;
var currDropTarget = null; // target for drop operation

/// Modify the height and text size of the property boxes without
/// changing the width.
function setZoom(zoom)
{
	var newZoom = parseInt(zoom);
	if (isNaN(newZoom) || (newZoom == currZoom)) return;

	currZoom = newZoom;

	var factor = currZoom / 100;
	for (var layoutProp in currentLayout) {
		currentLayout[layoutProp] = layoutConstant[layoutProp] * factor;
	}

	layoutBoxes(null, true);
}

/// Called from container to set the width of the canvas
function setCanvasWidth(wid)
{
	var canvas = document.getElementById('canvasSVG');
	canvas.setAttribute('width',wid);
	spineX = wid / 2;

	layoutBoxes('target');
	layoutBoxes('source');

	// layout titles as x=% does not work in chrome!
	var text = document.getElementById('sourceTitle');
	text.setAttribute('x',wid/4);

	var text = document.getElementById('sourceName');
	text.setAttribute('x',wid/4);

	var text = document.getElementById('sourceType');
	text.setAttribute('x',wid/4);

	var text = document.getElementById('targetTitle');
	text.setAttribute('x',wid/4);

	var text = document.getElementById('targetName');
	text.setAttribute('x',wid/4);

	var text = document.getElementById('targetType');
	text.setAttribute('x',wid/4);

	var spine = document.getElementById('spineRect');
	if (spine) spine.setAttribute('x',spineX);

	var header = document.getElementById('headerRect');
	if (header) header.setAttribute('width',wid);

	var canvasRect = document.getElementById('canvasRect');
	if (canvasRect) canvasRect.setAttribute('width',wid);
}

/// Not used at this time
function canvasKeyDown(evt)
{
	switch(evt.keyCode) {
	case 32: // ' ' reset
		setTargetScroll(0);
		setSourceScroll(0);
		break;
	case 44: // <
		setTargetScroll(targetScrollTop + 50);
		break;
	case 46: // >
		setTargetScroll(targetScrollTop - 50);
		break;
	case 89: // y
	case 90: // z
		setSourceScroll(sourceScrollTop + 50);
		break;
	case 88: // x
		setSourceScroll(sourceScrollTop - 50);
		break;
	}
}

function canvasKeyUp(evt)
{
}

function canvas_scrollTarget(delta)
{
	delta = ('undefined' == typeof delta) ? -targetScrollTop : delta;
	setTargetScroll(targetScrollTop + delta);
}

function canvas_scrollSource(delta)
{
	delta = ('undefined' == typeof delta) ? -sourceScrollTop : delta;
	setSourceScroll(sourceScrollTop + delta);
}


function getSVGHeight(elem)
{
    var minY = 100000;
    var maxY = 0;
    var child = elem.firstChild;
    while (child) {
        if (child.getBoundingClientRect) {
            if (child.getAttribute('height') != "100%") {
                var rect = child.getBoundingClientRect();
                minY = minY < rect.top ? minY : rect.top;
                maxY = maxY > rect.bottom ? maxY : rect.bottom;
            }
        }
        child = child.nextSibling;
    }
    elemHeight = maxY - minY;
    return elemHeight;
}

function setTargetScroll(yOffset)
{
	targetScrollTop = parseInt(yOffset);
	var frame = document.getElementById('targetFrame');
    var svgHeight = getSVGHeight(frame);
    if (-100000 == svgHeight) {
        frame.setAttribute('y', -targetScrollTop);
    } else {
        var editFrame = window.top.document.getElementById('editorPane');
        var editRect = editFrame.getBoundingClientRect();
        var tblFrame = window.top.document.getElementById('dtlTable');
        var tblRect = tblFrame.getBoundingClientRect();
        var visHeight = editRect.height - tblRect.height;
        var tmpScrollTop = svgHeight >= targetScrollTop ? (-targetScrollTop < (visHeight) ? -targetScrollTop : (visHeight)) : -(svgHeight-12);
        frame.setAttribute('y', tmpScrollTop);
        targetScrollTop = -tmpScrollTop;
    }

	// fix actions
	if (theTransform) {
		for (var target = 0; target < theTransform.actionList.length; target++) {
			theTransform.actionList[target].update();
		}
	}
}

function setSourceScroll(yOffset)
{
	sourceScrollTop = parseInt(yOffset);
	var frame = document.getElementById('sourceFrame');
    var svgHeight = getSVGHeight(frame);
    if (-100000 == svgHeight) {
        frame.setAttribute('y', -sourceScrollTop);
    } else {
        var editFrame = window.top.document.getElementById('editorPane');
        var editRect = editFrame.getBoundingClientRect();
        var tblFrame = window.top.document.getElementById('dtlTable');
        var tblRect = tblFrame.getBoundingClientRect();
        var visHeight = editRect.height - tblRect.height;
        var tmpScrollTop = svgHeight >= sourceScrollTop ? (-sourceScrollTop < (visHeight) ? -sourceScrollTop : (visHeight)) : -(svgHeight-12);
        frame.setAttribute('y', tmpScrollTop);
        sourceScrollTop = -tmpScrollTop;
    }

	// fix actions
	if (theTransform) {
		for (var target = 0; target < theTransform.actionList.length; target++) {
			theTransform.actionList[target].update();
		}
	}
}

/// set new target doc info
function setTarget(clsname, doctype)
{
	selectItem(null);

	theTransform.targetClass = clsname;
	theTransform.targetIsVDoc = (null==clsname) ? false : isVDoc(clsname);
	theTransform.targetDocType = this.primaryDocType(doctype);

	// set title
	setTextNode("targetName", clsname);
	setTextNode("targetType", doctype);

	// goto server for new doc contents
	zenPage.loadTopSegmentsFromServer('target',clsname,doctype);
}

/// set new source doc info
function setSource(clsname, doctype)
{
	selectItem(null);
	theTransform.sourceClass = clsname;
	theTransform.sourceIsVDoc = (null==clsname) ? false : isVDoc(clsname);
	theTransform.sourceDocType = this.primaryDocType(doctype);

	// set title
	setTextNode("sourceName", clsname);
	setTextNode("sourceType", doctype);

	// goto server for new doc contents
	zenPage.loadTopSegmentsFromServer('source',clsname,doctype);
}

/// doctype may include multiple : child type names
function primaryDocType(doctype)
{
	try {
		if ((doctype.match(/:/g)||[]).length < 2) return doctype;
		return (doctype.split(':')[0]+':'+doctype.split(':')[1]);
	} catch (e) {
		return doctype
	}
}

/// called from server to insert new top-level segments
function setTargetSegments(clsname,doctype,reload,proplist)
{
	if (theTransform) {
		theTransform.targetClass = clsname;
		theTransform.targetIsVDoc = (null==clsname) ? false : isVDoc(clsname);
		theTransform.targetDocType = doctype;
	}

	// set title
	setTextNode("targetName", clsname);
	setTextNode("targetType", doctype);

	setPropertyBoxes('target', null, proplist);

	layoutBoxes('target');
}

/// called from server to insert new top-level segments
function setSourceSegments(clsname,doctype,reload,proplist)
{
	if (theTransform) {
		theTransform.sourceClass = clsname;
		theTransform.sourceDocType = doctype;
	}

	// set title
	setTextNode("sourceName", clsname);
	setTextNode("sourceType", doctype);

	setPropertyBoxes('source', null, proplist);

	layoutBoxes('source');
}

/// Called from server after loading property boxes
/// No longer used?
function onInsertComplete(type)
{
	// re-apply all actions
	loadTransform();
}

/// called from server to insert new segments
function insertTargetSegments(segment,proplist)
{
	setPropertyBoxes('target', segment, proplist);

	layoutBoxes('target');

	// re-apply all actions
	loadTransform();
	clearStatusBar();
}

/// called from server to insert new segments
function insertSourceSegments(segment,proplist)
{
	setPropertyBoxes('source', segment, proplist);

	layoutBoxes('source');

	// re-apply all actions
	loadTransform();
	clearStatusBar();
}

function setReadOnly(ro)
{
	readOnlyFlag = ro;
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

// private

/// create a new action between target and source
function canvas_createAction(target, source)
{
	if (!theTransform) {
		return;
	}

	if ((target.origName == null) || (source.origName == null)) {
		// no action between synthetic properties
		return;
	}

	// create a new action
	// determine what the end points are
	var prop = fixPropertyName(target);
	var value = fixPropertyName(source);
	if ((prop == null) || (value == null)) return;

	// tell container to create an action
	zenPage.addAction('Ens.DTL.Assign','set',prop,value);
}

/// Fix all collection/key issues for a given item
function fixPropertyName(item)
{
	if (!item) return null;

	var value = '';
	if ('target' == item.type) {
		if (theTransform.targetIsVDoc && theTransform.targetDocType && (item.origName != 'target')) {
			// Assume this is a VDoc
			// strip off 'target.'
			var oname = item.origName.substring(7);
			if ('???' == oname.substring(0,3)) return null;
			value = resolveValue(oname, true, true);
		}
		else {
			value = resolveValue(item.origName, true, false);
		}
	}
	else {
		if (theTransform.sourceIsVDoc && theTransform.sourceDocType && (item.origName != 'source')) {
			// Assume this is a VDoc
			// strip off 'source.'
			var oname = item.origName.substring(7);
			if ('???' == oname.substring(0,3)) return null;
			value = resolveValue(oname, false, true);
		}
		else {
			value = resolveValue(item.origName, false, false);
		}
	}
	return value;
}

/// value: string containing value to be resolved
/// isTarget: boolean to indicate whether value is for a target
/// isVDoc: boolean to indicate whether value is for a VDoc path
function resolveValue(value, isTarget, isVDoc)
{
	var ancestors = getParentActionInfo();
	if (isVDoc) {
		var handlepseudoX12 = (isTarget ? (theTransform.targetClass=='EnsLib.EDI.X12.Document') : (theTransform.sourceClass=='EnsLib.EDI.X12.Document'));
		if (handlepseudoX12) {
			value = placeOpeningAndClosingVDocBrace(value);
			value = (isTarget ? 'target.' : 'source.') + value;
		} else {
			value = (isTarget ? 'target.{' : 'source.{') + value + '}';
		}
		value = fixCollectionSyntax(value,'');
		value = applyKeyToName(value, ancestors);
	}
	else {
		value = value.replace(/\(\)/g,'.()');
		value = applyKeyToName(value, ancestors);
		// all ancestor keys should have been applied already, so add '1' where no key is known
		value = fixCollectionSyntax(value, '1');
	}
	return value;
}

/// Place opening VDoc { before start of actual VDoc property and append }
function placeOpeningAndClosingVDocBrace(name)
{
	var nonVDocPos = name.indexOf('TransactionSets()');
	var nonVDocPart;
	if (nonVDocPos > -1) {
		// add { at end if . else don't add { and }
		nonVDocPart = name.substring(0,(nonVDocPos+17));
		if (nonVDocPart === name) {
			return name;
		} else {
			return (nonVDocPart+name.substring((nonVDocPos+17),(nonVDocPos+18))+'{'+name.substring(nonVDocPos+18)+'}');
		}
	} else {
		nonVDocPos = name.indexOf('FunctionalGroups()');
		if (nonVDocPos > -1) {
			// add { at end if . else don't add { and }
			nonVDocPart = name.substring(0,(nonVDocPos+18));
			if (nonVDocPart === name) {
				return name;
			} else {
				return (nonVDocPart+name.substring((nonVDocPos+18),(nonVDocPos+19))+'{'+name.substring(nonVDocPos+19)+'}');
			}
	} else {
			name = '{' + name + '}';
		}
	}
	return name;
}

function loadSegments(type,cls,doctype,origName,idlist)
{
	cls = cls==null ? '' : cls;
	zenPage.loadSegmentsFromServer(type,cls,doctype,origName,idlist);
}

/// sets up boxes for either target or source classes
/// if segment is non-'', then add props to that parent node
function setPropertyBoxes(type, segment, proplist)
{
	var key,index,p;
	var name,label,parent,oname,txt,cnt,ch,last;
	var insert = (null != segment);

	var badCount = 0;
	var errors = [];

	if (!insert) {
		var indexObj = (type == 'target' ? propIndexTarget : propIndexSource);
		for (key in indexObj) {
			indexObj[key].remove();
		}
		if (type == 'target') {
			propIndexTarget = {};
			index = propIndexTarget;
		}
		else {
			propIndexSource = {};
			index = propIndexSource;
		}

		// create top-level property box
		p = new PropertyBox(type,null,type,type,type,1,1,-1);
		index[type] = p;
	}
	else {
		// append
		index = (type == 'target' ? propIndexTarget : propIndexSource);

		// find top node
		p = index[type];
	}

	// done if no properties
	if ((!proplist) || (proplist.length == 0)) return;

	var prefix = [ type ]; // stack of name prefixes
	var nprefix = [ type ]; // normalized names
	var parentStack = [ p ];
	parent = null;

	if (insert) {
		segment += '.'; // false terminator
		// preset stack for append case
		var stk = 0;
		var lbl = '';
		var nxtsep = '.';
		for (var n = 0; n < segment.length; n++) {
			ch = segment.charAt(n);
			if (("." == ch) || (":" == ch)) {
				var isXMLns = false;
				if (stk>0) {
					if (":" == ch) {
						if (lbl.length && (lbl.charAt(0) == '$')) {
							var tDigits = lbl.substring(1);
							if (tDigits == parseInt(tDigits,10)) {
								isXMLns = true;
							}
						}
					}
					if (isXMLns) {
						lbl += ch;
					}
					else {
						prefix[stk] = prefix[stk-1] + nxtsep + lbl;
						nprefix[stk] = nprefix[stk-1] + '.' + lbl;
						parentStack[stk] = index[nprefix[stk]];
					}
				}
				if (!isXMLns) {
					nxtsep = ch;
					stk++;
					lbl = '';
				}
			}
			else {
				lbl += ch;
			}
		}
	}

	var propData,ord,numch;

	for (var i = 0; i < proplist.length; i++) {
		propData = proplist[i];
		txt = propData[0];
		ord = propData[1];
		numch = propData[2];

		if (txt.length <= 0) {
			errors.push('Missing property name.');
			// skip this one
		}
		else {
			var firstChar = txt.charAt(0);
			if ((firstChar != ".") && (firstChar != ":")) {
				// strip off leading 'target' or 'source'
				txt = txt.substr(6);
			}

			// count # of leading .: chars
			cnt = 0;
			last = '';
			ch = txt.charAt(cnt);
			while (("." == ch) || (":" == ch)) {
				last = ch;
				ch = txt.charAt(++cnt);
			}

			if (cnt <= 0) {
				errors.push("Property with missing dots: '" + txt + "'");
				cnt = 1;
				label = '???Unknown' + (++badCount);
			}
			else {
				// build names (normal and original)
				label = txt.substr(cnt);

				if ((null == label) || ('' == label)) {
					errors.push("Property with no label: '" + txt + "'");
					label = '???Unknown' + (++badCount);
				}
			}

			// replace all (n) with ()
			label = label.replace(/\(\d*\)/g,'()');

			oname = prefix[cnt-1] + last + label;
			prefix[cnt] = oname;

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
			// add ordinal position to label of fields that come after colon
			if (txt.substr(0,cnt).indexOf(':') >= 0) {
				label=ord + ': ' + label;
			}
			p = new PropertyBox(type,parentStack[cnt-1],name,oname,label,cnt + 1,ord,numch);
			index[name] = p;
			parentStack[cnt] = p;
		}
	}

	if (errors.length > 0) {
		alert('There are errors in the property list:\n' + errors.join('\n'));
	}
}

/// return a normalized form of a property name
/// this means only '.' delimiters and () collection syntax
function normalizePropertyName(name)
{
	// property names can contain . / : as separators,
	// BUT $nnn:propName is used for XML VDoc namespace syntax, so must be left intact
	// Javascript doesn't support lookbehind, so we reverse the string to use lookahead
	name = reverseString(name);
	name = name.replace(/:(?!\d+\$(\{|\.))/g,'.');
	name = reverseString(name);
	name = name.replace(/\//g,'.');

	// remove { } chars
	name = name.replace(/\{/g,'');
	name = name.replace(/\}/g,'');

	// replace all (nnn) with (), also check for (nn+nn), (nn-nn) as well as count syntax of (*)
	name = name.replace(/\((\w*[+-]?\w*|\*)\)/g,'()');

	return name;
}

/// Utility function to reverse a supplied string
function reverseString(str)
{
	return str.toString().split('').reverse().join('');
}

/// fix any generic collection syntax () in a name
function fixCollectionSyntax(name,key)
{
	key = (key!=null) ? key : '1';
	name = name.replace(/\(\)/g,'('+key+')');
	return name;
}

/// index of properties subscripted by name
var propIndexTarget = new Object();
var propIndexSource = new Object();

/// used for property ids
var propertyCounter = 0;

/// property box object: type is 'target' or 'source'
function PropertyBox(type, parent, name, origName, label, level, ordPos, numCh)
{
	this.gtype = 'property'; // graphical type
	this.type = type;		// source or target
	this.name = name;		// normalized name
	this.origName = origName; // originalName
	this.label = label;
	this.isVisible = true;
	this.showChildren = true;
	this.parent = parent;
	this.children = new Array();
	this.ordPos = ordPos;		// ordinal position in parent
	this.numChildren = numCh;	// defined number of children; -1 means unknown
	this.SVGGroup = null;

	propertyCounter++;
	this.id = 'property_' + propertyCounter;
	this.level = level;

	if (this.level == null) {
		alert('invalid value for property level');
	}

	// set of actions connected to this property
	this.actionList = new Array();

	// methods
	this.remove = PropertyBox_remove;
	this.place = PropertyBox_place;
	this.render = PropertyBox_render;
	this.unrender = PropertyBox_unrender;
	this.addAction = PropertyBox_addAction;
	this.removeAction = PropertyBox_removeAction;
	this.positionActions = PropertyBox_positionActions;

	if (parent) {
		parent.children[parent.children.length] = this;

		// make expando visible for parent
		if (parent.SVGGroup) {
			parent.expando.setAttribute("style","");
		}
	}

	var wid = spineX - 110;
	var cx, xpos, ypos;
	ypos = 0;

	wid -= (this.level-1) * currentLayout.indent;
	if (type == 'source') {
		xpos = 50 + ((this.level-1) * currentLayout.indent);
		cx = wid + currentLayout.circleRadius;
	}
	else {
		xpos = spineX + 60 + ((this.level-1) * currentLayout.indent);
		cx = -1 * currentLayout.circleRadius;
	}

	// position of box
	this.xPos = xpos;
	this.yPos = ypos;

	// position of connector
	this.cx = xpos + cx;
	this.cy = ypos + (currentLayout.boxHeight / 2);
	this.width = wid;

	var miniMode = isMiniMode();

	// decide whether to show children initially
	switch(this.level) {
	case 1:
		this.isVisible = true;
		this.showChildren = true;
		this.render();
		break;
	case 2:
		this.isVisible = true;
		this.showChildren = miniMode ? true : false;
		this.render();
		break;
	default:
		this.isVisible = false;
		this.showChildren = false;
		break;
	}
}

/// add an action to this property box
function PropertyBox_addAction(action)
{
	if (this.actionList.length > maxConnections) return;

	this.actionList[this.actionList.length] = action;

	if (this.type == 'target') {
		this.positionActions();
	}
}

/// remove an action from this property box
function PropertyBox_removeAction(action)
{
	for (var n = 0; n < this.actionList.length; n++) {
		if (this.actionList[n] == action) {
			// remove this from the list
			this.actionList.splice(n,1);
		}
	}

	this.positionActions();
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

	this.SVGGroup.addEventListener("mousedown",propertyClick,false);
	this.SVGGroup.addEventListener("mouseover",propertyMouseOver,false);
	this.SVGGroup.addEventListener("mouseout",propertyMouseOut,false);

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
	rect.setAttribute("class","PropRect");

	this.SVGGroup.appendChild(rect);

	var midY = currentLayout.boxHeight / 2;

	// io handle
	var io;
	if (this.type == 'target') {
		io = document.createElementNS(SVGNS,"polygon");
		io.setAttribute("points", (this.cx - this.xPos + currentLayout.ioXoffset) + ',' + midY + ' ' +
				(this.cx - this.xPos - currentLayout.ioXoffset) + ',' + (midY - currentLayout.ioYoffset) + ' ' +
				(this.cx - this.xPos - currentLayout.ioXoffset) + ',' + (midY + currentLayout.ioYoffset) + ' ');
	}
	else {
		io = document.createElementNS(SVGNS,"circle");
		io.setAttribute("cx",this.cx - this.xPos);
		io.setAttribute("cy",currentLayout.boxHeight / 2);
		io.setAttribute("r",currentLayout.circleRadius);
	}

	io.setAttribute("id","io_" + this.id);
	if (this.origName != null) {
		io.setAttribute("class","IOActionNone");
		io.addEventListener("mousedown",ioHandleMouseDown,false);
	}
	else {
		io.setAttribute("class","IOActionDisabled");
	}
	this.SVGGroup.appendChild(io);

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
	text.setAttribute("style", "font-size: " + currentLayout.fontSize + "pt;");

	// create the text node and append it
	var textNode = document.createTextNode(this.label);
	text.appendChild(textNode);

	view.appendChild(text);

	// default translation
	var transform = 'translate(' + this.xPos + ',' + this.yPos + ')';
	this.SVGGroup.setAttribute("transform",transform);

	// add group to DOM
	var canvas = null;
	if (this.type == 'target') {
		canvas = document.getElementById("targetFrame");
	}
	else {
		canvas = document.getElementById("sourceFrame");
	}
	canvas.appendChild(this.SVGGroup);
}

/// reset the position of the actions connected to this target property
function PropertyBox_positionActions()
{
	if (this.type == 'target') {

		// set ordinal positions
		for (var n = 0; n < this.actionList.length; n++) {
			this.actionList[n].targetOrdinal = n;
		}

		// update positions
		for (var n = 0; n < this.actionList.length; n++) {
			this.actionList[n].update();
		}
	}
}

/// delete svg for this shape
function PropertyBox_unrender()
{
	if (this.SVGGroup) {

		boxCount--;

		// remove SVG elements
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

function PropertyBox_remove()
{
	this.unrender();
}

/// set the position of this box
function PropertyBox_place(ypos, visible, redraw)
{
	if (!visible) {
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
		if (redraw && this.SVGGroup) {
			this.unrender();
		}
		if (!this.SVGGroup) {
			this.render();
		}

		var expando = document.getElementById("expando_" + this.id);
		var midY = currentLayout.boxHeight / 2;
		expando.setAttribute("transform",this.showChildren ? 'rotate(90,' + (2 * currentLayout.arrowOffset) + ',' + midY + ')' : "");

		this.SVGGroup.setAttribute("style","");
		this.isVisible = true;

		// recompute x pos
		var wid = spineX - 110;
		var cx, xpos;
		wid -= (this.level-1) * currentLayout.indent;

		if (this.type == 'source') {
			xpos = 50 + ((this.level-1) * currentLayout.indent);
			cx = wid + currentLayout.circleRadius;
		}
		else {
			xpos = spineX + 60 + ((this.level-1) * currentLayout.indent);
			cx = -1 * currentLayout.circleRadius;
		}

		this.xPos = xpos;
		this.cx = xpos + cx;

		this.yPos = ypos;
		this.cy = ypos + (currentLayout.boxHeight / 2);

		ypos += currentLayout.boxSpacing;

		var transform = 'translate(' + this.xPos + ',' + this.yPos + ')';
		this.SVGGroup.setAttribute("transform",transform);

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
			var io = document.getElementById("io_" + this.id);
			if (io) {
				if (this.type == 'source') {
					io.setAttribute('cx',this.cx-this.xPos);
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

/// find the specified PropertyBox
/// exact flag indicates that only exact matches are tested
/// if detail object is provided, detail is an object whose "exact" property is set
/// to true for exact match and null otherwise
function findPropertyBox(type, oname, exact, detail)
{
	if ('' == oname) {
		return null;
	}

	// normalize name
	name = normalizePropertyName(oname);

	var index;
	if (null == type) {
		// figure out type from name
		type = name.split(".")[0];
	}

	if ('target' == type) {
		index = propIndexTarget;
	}
	else {
		index = propIndexSource;
	}

	var x = name;

	// deal with omitted target/source
	if (type != name.split(".")[0]) {
		name = type + "." + name;
	}

	// test if we have any ordinals within the name
	if (-1 != name.search(/\.\d+/)) {
		// has an ordinal-- convert it to normal form
		var t;
		var nm = type;
		var items = name.split(".");
		for (var n = 1; n < items.length; n++) {
			t = items[n];
			if (t == t.match(/^\d+$|^\d+\(\)/)) {
				// numeric: look it up
				t = parseInt(t,10);
				if (index[nm] && (t>0) && index[nm].children && (t<=index[nm].children.length)) {
					var s = index[nm].children[t-1].name;
					var q = s.split('.');
					t = q[q.length-1];
				}
			}
			nm += '.' + t;
		}
		name = nm;
	}

	var match = index[name];
	if (!match) { // check for append/insert operations where trailing () must be dropped from expression
		match = index[name + '()'];
	}
	if (!match && !exact) {
		// find closest match
		// try stripping off last part of name and trying again!
		var last = name.lastIndexOf('.');
		if (last > 0) {
			var sname = name.substring(0,last);
			match = findPropertyBox(type,name.substring(0,last),false,null);
		}
	}
	else {
		// exact match
		if (detail) {
			detail.exact = true;
		}
	}

	return match;
}

/// lay out property boxes according to hierarchy and expando settings
/// flag can be 'target','source' or null
function layoutBoxes(flag, redraw)
{
	var box;

	// place target shapes
	if (propIndexTarget && (('target' == flag) || (flag == null))) {
		box = propIndexTarget['target'];
		if (box) {
			box.place(60, true, redraw);
		}
	}

	// place source shapes
	if (propIndexSource && (('source' == flag) || (flag == null))) {
		box = propIndexSource['source'];
		if (box) {
			box.place(60, true, redraw);
		}
	}

	// fix actions
	if (theTransform) {
		for (var i=0; i<theTransform.actionList.length; i++) {
			var action = theTransform.actionList[i];
			if (action) {
				if (redraw) {
					action.unrender();
					action.render();
				}
				else {
					action.update();
				}
			}
		}
	}

	// recalculate size of canvas
	var count = 0;
	var tcount = 0;
	for (key in propIndexTarget) {
		if (propIndexTarget[key].isVisible) {
			tcount++;
		}
	}

	var scount = 0;
	for (key in propIndexSource) {
		if (propIndexSource[key].isVisible) {
			scount++;
		}
	}

	count = (tcount > scount) ? tcount : scount;
	zenPage.setCanvasSize(spineX * 2, (count * currentLayout.boxSpacing) + 50 + 20);
}

// mouse events
var startDrag = 0;
var dragTarget = '';

function canvasMouseDown(evt)
{
	evt.stopPropagation();

	if (evt.button == 0) {
		selectItem(null);
		dragTarget = (evt.clientX > spineX) ? 'target' : 'source';
		startDrag = evt.clientY;
	}
}

function canvasMouseMove(evt)
{
	evt.stopPropagation();

	if ('' != dragTarget) {
		var delta = evt.clientY - startDrag;
		delta = Math.floor(delta);
		if (delta > 3 || delta < -3) {
			if ('source' == dragTarget) {
				setSourceScroll(sourceScrollTop - delta);
			}
			else {
				setTargetScroll(targetScrollTop - delta);
			}
			startDrag = evt.clientY;
		}
	}
	else if (currRubberBand) {
		// move edge of RubberBand
		var coord = document.getElementById("canvasSVG");
		var xoff = coord.getAttribute("x") * 1;
		var yoff = coord.getAttribute("y") * 1;

		moveRubberBand(evt.clientX - xoff, evt.clientY - yoff);
	}
}

function canvasMouseUp(evt)
{
	evt.stopPropagation();
	dragTarget = '';

	if (evt.button != 0) {
		// we only care about primary button
		return;
	}

	if (currRubberBand) {
		endRubberBand();

		if (currDropTarget) {
			var rect = document.getElementById("rect_" + currDropTarget.id);
			var cls = currDropTarget.oldClass ? currDropTarget.oldClass : "PropRect";
			rect.setAttribute("class",cls);

			var io = document.getElementById("io_" + currDropTarget.id);
			io.setAttribute("class","IOActionNone");

			currDropTarget = null;
		}
	}
}

function canvasMouseOver(evt)
{
	evt.stopPropagation();
	dragTarget = '';

	if (currRubberBand) {
		// see if we have moved out of a property
		if (currDropTarget &&
			 ((lastSourceX != evt.clientX) || (lastSourceY != evt.clientY))) {

			var rect = document.getElementById("rect_" + currDropTarget.id);
			var cls = currDropTarget.oldClass ? currDropTarget.oldClass : "PropRect";
			rect.setAttribute("class",cls);

			var io = document.getElementById("io_" + currDropTarget.id);
			io.setAttribute("class","IOActionNone");

			currDropTarget = null;
		}
	}
}

function propertyDblClick(evt)
{
	evt.stopPropagation();
	var el = evt.target;
	var item = el.parentNode.owner;
	if (item) {
		// notify container
		var prop = fixPropertyName(item);

		// notify container
		if (prop != null) {
			zenPage.propertyClick(item.type,prop);
		}
	}
}

function propertyClick(evt)
{
	// run check for IE double-click
	if (evt.getDetail && (evt.getDetail() == 2)) {
		return propertyDblClick(evt);
	}
	evt.stopPropagation();
	var el = evt.target;
	selectItem(el.parentNode.owner);
}

function actionClick(evt)
{
	evt.stopPropagation();
	var el = evt.target;
	selectItem(el.parentNode.owner);
}

var lastSourceX = 0;
var lastSourceY = 0;

function propertyMouseOver(evt)
{
	evt.stopPropagation();
	var el = evt.target;
	var drop = el.parentNode.owner;
	var id = el.parentNode.getAttribute('id'); //!!!

	if (currRubberBand && (drop != currDropTarget) && (drop.type != currItem.type) && (drop.origName != null)) {
		if (currDropTarget) {
			var rect = document.getElementById("rect_" + currDropTarget.id);
			var cls = currDropTarget.oldClass ? currDropTarget.oldClass : "PropRect";
			rect.setAttribute("class",cls);

			var io = document.getElementById("io_" + currDropTarget.id);
			if (currDropTarget.origName != null) {
				io.setAttribute("class","IOActionNone");
			}
		}

		var rect = document.getElementById("rect_" + id);
		drop.oldClass = rect.getAttribute("class");
		rect.setAttribute("class","PropRectCanConnect");

		var io = document.getElementById("io_" + id);
		io.setAttribute("class","IOActionConnecting");

		currDropTarget = drop;
	}
}

function propertyMouseOut(evt)
{
	evt.stopPropagation();
	var el = evt.target;

	lastSourceX = evt.clientX;
	lastSourceY = evt.clientY;
}

function ioHandleMouseDown(evt)
{
	var el = evt.target;
	evt.stopPropagation();

	// select this shape
	selectItem(el.parentNode.owner);

	if (readOnlyFlag) {
		// no connections for read only mode
		return;
	}

	// start a RubberBand in this shape in order to connect

	if (evt.button != 0) {
		// only start move for primary mouse button
		return;
	}

	var x = evt.clientX;
	var y = evt.clientY;

	// make a RubberBand
	var coord = document.getElementById("canvasSVG");
	var xoff = coord.getAttribute("x") * 1;
	var yoff = coord.getAttribute("y") * 1;
	startRubberBand(x - xoff, y - yoff);

	currDropTarget = null;
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

		box.showChildren = !box.showChildren;
		el.setAttribute("class","Expando");

		// see if we have too many boxes...
		if (box.showChildren && (boxCount > maxBoxes)) {
			// close a different parent of this tree
			var parent = findPropertyBox(null, box.type, true);
			for (var n = 0; n < parent.children.length; n++) {
				var child = parent.children[n];
				if (child.showChildren && (box.name.substr(0,child.name.length) != child.name)) {
					// this is a different branch/ close it
					child.showChildren = false;
					break;
				}
			}
		}
		// see if children are loaded...
		if (box.showChildren && (box.children.length < box.numChildren)) {
			var cls,doctype;
			if ('target' == box.type) {
				cls = theTransform.targetClass;
				doctype = theTransform.targetIsVDoc ? theTransform.targetDocType : '';
			}
			else {
				cls = theTransform.sourceClass;
				doctype = theTransform.sourceIsVDoc ? theTransform.sourceDocType : '';
			}
			startStatusBar(box.xPos + 25, box.yPos + 1);

			var idlist = '';
			var obj = box;
			while (obj.parent) {
				idlist = obj.ordPos + ((''==idlist) ? '' : ',') + idlist;
				obj = obj.parent;
			}

			loadSegments(box.type,cls,doctype,box.origName,idlist);
		}
		else {
			layoutBoxes(box.type);
		}
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

// -------------------------------------------------------------------------------
// private functions

/// Set the contents of text element id to str
function setTextNode(id,str)
{
	str = (null == str) ? '' : str;
	var text = document.getElementById(id);
	if (!text) {
		return;
	}

	// create next text node and replace the current one
	var oldNode = text.firstChild;
	text.removeChild(oldNode);

	var textNode;
	textNode = document.createTextNode(str);
	text.appendChild(textNode);
}

/// Called from container when an action is selected.
function selectAction(actionNo)
{
	// find diagram action that corresponds to actionNo
	for (var n = 0; n < theTransform.actionList.length; n++) {
		var action = theTransform.actionList[n];
		if (action.id == ('action_' + actionNo)) {
			selectItem(action,false);
			return;
		}
	}
	selectItem(null,false);
}

/// Called from container to get selected source property, if any.
function getSelectedSourceProp()
{
	var prop = '';
	if (currItem && currItem.gtype == 'property' && currItem.type == 'source') {
		prop = fixPropertyName(currItem);
		if (prop == null) {
			prop = '';
		}
	}
	return prop;
}

/// Called from container to get selected target property, if any.
function getSelectedTargetProp()
{
	var prop = '';
	if (currItem && currItem.gtype == 'property' && currItem.type == 'target') {
		prop = fixPropertyName(currItem);
		if (prop == null) {
			prop = '';
		}
	}
	return prop;
}

function selectItem(newItem,notify)
{
	try {
		notify = ('undefined' == typeof notify) ? true : notify;

		if (currItem != newItem) {
			if (currItem && currItem.gtype == 'property') {
				// unselect property
				var rect = document.getElementById("rect_" + currItem.id);
				if (rect) {
					rect.setAttribute("class","PropRect");
				}

				if (currItem.origName != null) {
					var io = document.getElementById("io_" + currItem.id);
					if (io) {
						io.setAttribute("class","IOActionNone");
					}
				}

				// are there actions for this property
				for (var n = 0; n < currItem.actionList.length; n++) {
					var action = currItem.actionList[n];

					// unselect this action
					action.select(null);
				}
				currItem = null;
			}
			else if (currItem && currItem.gtype == 'action') {
				currItem.select(null);
				currItem = null;
			}

			if (newItem) {
				// select new item
				currItem = newItem;
				if (currItem && currItem.gtype == 'property') {
					// select property
					var rect = document.getElementById("rect_" + currItem.id);
					if (rect) {
						rect.setAttribute("class","PropRectSelected");
					}

					var io = document.getElementById("io_" + currItem.id);
					if (currItem.origName != null && io) {
						io.setAttribute("class","IOActionSelected");
					}

					// are there actions for this property
					for (var n = 0; n < currItem.actionList.length; n++) {
						var action = currItem.actionList[n];

						// select this action
						action.select("related");
					}
				}
				else if (currItem && currItem.gtype == 'action') {
					// select connector
					currItem.select("selected");
				}
			}
		}

		// notify containing page of selection
		if (notify && zenPage) {
			var tmpItem = currItem;
			zenPage.itemSelected(currItem);
			if (tmpItem && tmpItem.gtype == 'action') {
				// ensure updates in the outer code don't stamp on newly selected actions
				tmpItem.select("selected");
			}
		}
	}
	catch(ex) {
		alert('Exception in selectItem\n' + ex.message);
	}
}

// ---------------------------------------------------------------------------

var dtlModel = null;
var actionIndex = null;

/// Called from container.
/// Point local dtlModel to refer to the JSON-based model created by the container.
function setDTLModel(dtl,actList)
{
	try {
		dtlModel = dtl;
		actionIndex = actList;
	}
	catch(ex) {
		alert('ERROR in setDTLModel:\n' + ex.message);
	}
}

/// Load the current set of *actions* onto the diagram.
function loadTransform()
{
	// clear out old xform
	if (theTransform) {
		theTransform.clearActions();
	}
	var	oldTransform = theTransform;

	theTransform = new Transform();
	if (oldTransform) {
		theTransform.targetClass = oldTransform.targetClass;
		theTransform.sourceClass = oldTransform.sourceClass;
		theTransform.targetDocType = oldTransform.targetDocType;
		theTransform.sourceDocType = oldTransform.sourceDocType;
		theTransform.targetIsVDoc = oldTransform.targetIsVDoc;
		theTransform.sourceIsVDoc = oldTransform.sourceIsVDoc;
	}

	loadActions(theTransform);
	theTransform.renderActions();
}

/// Add contents of the actionIndex array to tform.
function loadActions(tform)
{
	for (var n = 0; n < actionIndex.length; n++) {
		var actionDef = actionIndex[n];

		var type = 'assign';
		var skip = false;

		switch (actionDef._class) {
		case 'Ens.DTL.Assign':
		case 'Ens.DTL.Trace':
		case 'Ens.DTL.SQL':
		case 'Ens.DTL.Code':
			break;
		case 'Ens.DTL.SubTransform':
			type = 'subtransform';
			break;
		case 'Ens.DTL.ForEach':
			type = 'foreach';
			break;
		case 'Ens.DTL.Break':
			type = 'break';
			break;
		case 'Ens.DTL.Comment':
			type = 'comment';
			break;
		case 'Ens.DTL.If':
			type = 'if';
			break;
		case 'Ens.DTL.Switch':
			type = 'switch';
			break;
		case 'Ens.DTL.Case':
			type = 'case';
			break;
		case 'Ens.DTL.Default':
			type = 'default';
			break;
		case 'Ens.DTL.Group':
			type = 'group';
			break;
		case 'else':
		case 'endif':
		case 'endeach':
		case 'endswitch':
		case 'endgroup':
			skip = true;
			break;
		default:
			alert('Unhandled type in loadActions: ' + actionDef._class);
			break;
		}

		if (!skip) {
			var action = new Action(type,actionDef._id);
			tform.actionStack[tform.stkPtr] = action;

			action.annotation = actionDef.Annotation;
			action.disabled = actionDef._disabled;
			action.isValid = actionDef._isValid;

			switch (actionDef._class) {
			case 'Ens.DTL.Assign':
				action.setAttr('action',actionDef.Action);
				action.setAttr('key',actionDef.Key);
				action.setAttr('property',actionDef.Property);
				action.setAttr('value',actionDef.Value);
				break;
			case 'Ens.DTL.If':
				action.setAttr('condition',actionDef.Condition);
				break;
			case 'Ens.DTL.ForEach':
				action.setAttr('key',actionDef.Key);
				action.setAttr('property',actionDef.Property);
				break;
			case 'Ens.DTL.Break':
				break;
			case 'Ens.DTL.Comment':
				break;
			case 'Ens.DTL.SubTransform':
				action.setAttr('targetObj',actionDef.TargetObj);
				action.setAttr('sourceObj',actionDef.SourceObj);
				break;
			case 'Ens.DTL.Switch':
				break;
			case 'Ens.DTL.Case':
				action.setAttr('condition',actionDef.Condition);
				break;
			case 'Ens.DTL.Default':
				break;
			}

			// add to tform
			tform.addAction(action);
		}
	}
}

// -------------------
// transform object

var theTransform = new Transform();

/// this object represents a transform
function Transform()
{
	// methods
	this.addAction = Transform_addAction;
	this.removeAction = Transform_removeAction;
	this.clearActions = Transform_clearActions;
	this.renderActions = Transform_renderActions;
	this.isModified = Transform_isModified;

	// properties
	this.actionList = new Array();
	this.language = null;
	this.create = null;
	this.sourceClass = null;
	this.targetClass = null;
	this.sourceDocType = null;
	this.targetDocType = null;

	this.targetIsVDoc = false;
	this.sourceIsVDoc = false;

	actionCounter = 0;  // reset

	// used for parsing!!!
	this.actionStack = new Array();
	this.actionStack[0] = null;
	this.stkPtr = 1;
}

/// indicate whether transform has been modified
function Transform_isModified()
{
	return modifiedFlag;
}

/// add an action
function Transform_addAction(action)
{
	this.actionList.push(action);
	action.match();
}

/// remove an action
function Transform_removeAction(action,related)
{
	for (var n = 0;  n < this.actionList.length; n++) {
		if (this.actionList[n] == action) {
			// remove this from the list
			this.actionList.splice(n,1);
			break;
		}
	}

	// remove from parentAction list
	if (related && action.parent) {
		for (var n = 0;  n < action.parent.actionList.length; n++) {
			if (action.parent.actionList[n] == action) {
				// remove this from the list
				action.parent.actionList.splice(n,1);
				break;
			}
		}
	}

	// find child actions and delete
	for (var n = 0;  n < this.actionList.length; n++) {
		if (this.actionList[n].parent == action) {
			// remove child
			theTransform.removeAction(this.actionList[n],true);
		}
	}

	// break connections
	if (action.target) {
		action.target.removeAction(action);
	}
	for (var n = 0;  n < action.sourceList.length; n++) {
		action.sourceList[n].removeAction(action);
	}

	action.unrender();
}

/// clear actions
function Transform_clearActions()
{
	for (var n = 0; n < this.actionList.length; n++) {
		var action = this.actionList[n];
		action.reset();
	}

	// clear out all connections with properties
	for (key in propIndexTarget) {
		propIndexTarget[key].actionList = new Array();
	}

	for (key in propIndexSource) {
		propIndexSource[key].actionList = new Array();
	}

	// reset
	this.actionList = new Array();
}

/// render actions
function Transform_renderActions()
{
	for (var n = 0; n < this.actionList.length; n++) {
		var action = this.actionList[n];
		action.render();
	}
}

var actionCounter = 0;

/// this object represents a transform action
function Action(type,id)
{
	if (666==id || !id) {
		alert('Bad call to create action');
	}

	// methods
	this.setAttr = Action_setAttr;
	this.getAttr = Action_getAttr;
	this.select = Action_select;

	this.render = Action_render;
	this.unrender = Action_unrender;
	this.update = Action_update;
	this.reset = Action_reset;
	this.match = Action_match;
	this.getShapeClass = Action_getShapeClass;

	this.getLevel = Action_getLevel;

	// properties
	this.id = id;
	this.name = '';
	this.targetOrdinal = 0;  // set when connected to target
	this.annotation = '';

	this.gtype = 'action';
	this.type = type;
	this.code = '';
	this.attributes = new Object();
	this.attrState = null;  // pre-rendered set of attributes
	this.isValid = true;
	this.disabled = 0;

	switch(this.type) {
	case 'if':
	case 'foreach':
	case 'true':
	case 'false':
	case 'switch':
	case 'case':
	case 'default':
		this.isContainer = true;
		break;
	default:
		this.isContainer = false;
		break;
	}

	// DTL-dom properties
	this.actionList = new Array();
	this.parent = null;

	// links to properties
	this.target = null;
	this.targetMatch = false;
	this.sourceList = new Array();
	this.sourceMatch = new Array();
	this.sourceLines = new Array();

	this.SVGGroup = null;
}

/// unrender this action, as well as any child actions
function Action_reset()
{
	for (var n = 0; n < this.actionList.length; n++) {
		this.actionList[n].reset();
	}

	this.unrender();
}

/// determine how deep in the DOM we are
function Action_getLevel()
{
	var level = 1;
	var parent = this.parent;
	while(parent) {
		level++;
		parent = parent.parent;
	}

	return level;
}

/// find corresponding target & source boxes for this action
function Action_match(flag)
{
	// reset
	if ((null == flag) || ('target' == flag)) {
		// clean up backlinks
		if (this.target) {
			this.target.removeAction(this);
		}
		this.target = null;
	}

	if ((null == flag) || ('source' == flag)) {
		this.sourceList = new Array();
		this.sourceMatch = new Array();
	}

	// find match
	var tgtExpr = null;
	var srcExpr = null;
	switch (this.type) {
	case 'assign':
		tgtExpr = this.attributes['property'];
		srcExpr = this.attributes['value'];
		break;
	case 'subtransform':
		tgtExpr = this.attributes['targetObj'];
		srcExpr = this.attributes['sourceObj'];
		break;
	case 'if':
		srcExpr = this.attributes['condition'];
		break;
	case 'foreach':
		srcExpr = this.attributes['property'];
		break;
	case 'case':
		srcExpr = this.attributes['condition'];
		break;
	}

	if (tgtExpr != null) {
		if ((null == flag) || ('target' == flag)) {
			// find target match
			var detail = new Object();
			this.target = findPropertyBox('target',tgtExpr.replace(/\.\(/g,'('),false,detail);
			this.targetMatch = detail.exact ? true : false;

			// add backlink
			if (this.target) {
				this.target.addAction(this);
			}
		}
	}

	if (srcExpr != null) {
		if ((null == flag) || ('source' == flag)) {
			// find source match
			var detail = new Object();

			// find related source properties in source value expression
			var idents = tokenizeExpression(srcExpr);
			for (var src in idents) {
				detail.exact = null;

				// skip $ functions and ..methods
				if (src.substring(0,1) != '$' && src.substring(0,2) != '..') {
					var sBox = findPropertyBox('source',src.replace(/\.\(/g,'('),false,detail);
					if (sBox) {
						this.sourceList[this.sourceList.length] = sBox;
						this.sourceMatch[this.sourceMatch.length] = detail.exact ? true : false;
						sBox.addAction(this);
					}
				}
			}
		}
	}
}

/// create SVG rendering for this action
function Action_render()
{
	if (this.SVGGroup) {
		return;
	}

	var selected = false;
	var tx,ty,cX,cY;

	// introduce some randomness to make
	// layout clearer; remember this value
	this.rx = (15 + (Math.random() * 10));

	// create SVG element
	var canvas = document.getElementById("canvas");

	var g = document.createElementNS(SVGNS,"g");
	g.setAttribute("id",this.id);

	this.SVGGroup = g;
	this.SVGGroup.addEventListener("mousedown",actionClick,false);
	g.owner = this;

	// append to canvas (after Spine)
	var spine = document.getElementById("Spine");
	spine.appendChild(g);
	var selectedFlag = (selected ? 'selected' : '');
	var lineClass = this.getShapeClass('action',selectedFlag);

	// find target PropBox
	var tBox = this.target;
	if (!tBox) {
		// no target to connect to
		// draw line from source to spine
		cX = spineX;
		cY = 0;
		this.targetLine = null;
	}
	else {
		// see if target is selected
		selected = (currItem == tBox);

		tx = tBox.cx;
		ty = tBox.cy;

		// calculate position of spine circle; based on # of target connections
		var p = calculatespineMarkerLocation(this, ty);
		cX = p.split(",")[0];
		cY = p.split(",")[1];

		// line from target to spine
		var line = document.createElementNS(SVGNS,"line");
		line.setAttribute("class", lineClass);

		line.setAttribute("x1", tx);
		line.setAttribute("y1", ty);

		line.setAttribute("x2", cX);
		line.setAttribute("y2", cY);
		g.appendChild(line);
		this.targetLine = line;
	}

	// now lines (path) to every element referenced by value
	for (n = 0; n != this.sourceList.length; n++) {
		var sBox = this.sourceList[n];
		var sx = sBox.cx;
		var sy = sBox.cy;
		var adj = (sBox.level - 1) * 10;

		var path = 'M ' + cX + ' ' + cY +
							' L ' + (spineX - this.rx) + ' ' + cY +
							' ' + (sx + this.rx) + ' ' + sy +
							' ' + sx + ' ' + sy;

		line = document.createElementNS(SVGNS,"path");
		line.setAttribute("class", lineClass);
		line.setAttribute("d",path);
		g.appendChild(line);
		this.sourceLines[n] = line;
	}

	// central circle from target to spine
	// if value does not refer to any source properties, draw a different shape
	var marker = null;
	if (this.targetLine || this.sourceList.length > 0) {
		// these get placed by update()
		if (this.targetLine && this.sourceList.length > 0) {
			if ('subtransform' == this.type) {
				// shape for transform
				marker = document.createElementNS(SVGNS,"path");
				var subtransPath = 'M 0 0 L -' + currentLayout.markerLong + ' -' + currentLayout.markerShort + ' 0 -' + currentLayout.markerShort + ' ' + currentLayout.markerLong + ' 0 0 ' + currentLayout.markerShort + ' -' + currentLayout.markerLong + ' ' + currentLayout.markerShort + ' z';
				marker.setAttribute("d", subtransPath);
			}
			else {
				marker = document.createElementNS(SVGNS,"circle");
				marker.setAttribute("r", currentLayout.circleRadius);
				marker.setAttribute("cx", 0);
				marker.setAttribute("cy", 0);
			}
		}
		else if (this.targetLine == null) {
			// source only action
			marker = document.createElementNS(SVGNS,"path");
			marker.setAttribute("d", 'M 0 -' + currentLayout.markerShort + ' L ' + currentLayout.markerShort + ' 0 0 ' + currentLayout.markerShort + ' -' + currentLayout.markerShort + ' 0 z');
		}
		else {
			marker = document.createElementNS(SVGNS,"rect");
			marker.setAttribute("transform", "translate(-" + currentLayout.arrowOffset + ",-" + currentLayout.arrowOffset + ")");
			marker.setAttribute("width", currentLayout.arrowOffset * 2);
			marker.setAttribute("height", currentLayout.arrowOffset * 2);
			marker.setAttribute("rx", 2);
		}

		var markerClass = this.getShapeClass('circle',selectedFlag);
		marker.setAttribute("class", markerClass);
		marker.setAttribute("stroke",'#8080F0');
		marker.setAttribute("stroke-width", selected ? "2" : "1");
		g.appendChild(marker);
	}
	this.spineMarker = marker;

	// make sure new lines are drawn right
	this.update();
}

/// update display of this action
function Action_update()
{
	if (!this.SVGGroup) {
		return;
	}

	var visible = true;
	var tx = 0;
	var ty = 0;
	var sx = 0;
	var sy = 0;

	var circX = spineX;
	var circY = 0;
	var cX = spineX;
 	var cY = 0;
 	var hiddenClass = 'DTLActionHidden';

	// check if target is visible
	var tBox = this.target;
	if (tBox && this.targetLine) {
		if (tBox.isVisible) {
			tx = tBox.cx;
			ty = tBox.cy;
			if (this.targetMatch) {
				removeClass(this.targetLine,hiddenClass);
			}
			else {
				addClass(this.targetLine,hiddenClass);
			}

			// calculate position of spine marker; based on # of target connections
			var p = calculatespineMarkerLocation(this, ty);
			cX = p.split(",")[0];
			cY = p.split(",")[1];
		}
		else {
			// find visible parent
			var b = tBox.parent;
			while(b && !b.isVisible) {
				b = b.parent;
			}
			if (b) {
				tx = b.cx;
				ty = b.cy;
				var p = calculatespineMarkerLocation(b, ty);
				cX = p.split(",")[0];
				cY = p.split(",")[1];
				addClass(this.targetLine,hiddenClass);
			}
			else {
				visible = false;
			}
		}

		if (visible) {
			this.targetLine.setAttribute("x1", tx);
			this.targetLine.setAttribute("y1", parseInt(ty) - targetScrollTop);
			this.targetLine.setAttribute("x2", cX);
			this.targetLine.setAttribute("y2", (parseInt(cY) - targetScrollTop));

			if (this.spineMarker) {
				if (this.sourceList.length > 0) {
					this.spineMarker.setAttribute('transform','translate('+cX+','+(parseInt(cY) - targetScrollTop)+')');
				}
				else {
					this.spineMarker.setAttribute("x", cX);
					this.spineMarker.setAttribute("y", (parseInt(cY) - targetScrollTop));
				}
		}
		}
	}
	else {
		visible = false;
	}

	visible = true;

	// check if sources are visible
	if (visible) {
		for (n = 0; n != this.sourceList.length; n++) {
			var sBox = this.sourceList[n];
			var adj = 0;
			if (sBox.isVisible) {
				sx = sBox.cx;
				sy = sBox.cy;
				adj = (sBox.level - 1) * 10;
				if (this.sourceMatch[n]) {
					removeClass(this.sourceLines[n],hiddenClass);
				}
				else {
					addClass(this.sourceLines[n],hiddenClass);
				}
			}
			else {
				// find visible parent
				var b = sBox.parent;
				while(b && !b.isVisible) {
					b = b.parent;
				}
				if (b) {
					sx = b.cx;
					sy = b.cy;
					if (b.level) {
						adj = (b.level - 1) * 10;
					}

					addClass(this.sourceLines[n],hiddenClass);
				}
				else {
					// !!!
				}
			}

			// do we need to find cY
			if (cY == 0) {
				// use y position of first source box
				cY = sy;

				// if no target, adjust
				if (!this.targetLine) {
					cX = cX - 12;
					if (this.sourceList.length == 1) {
						// adjust Y based on number of actions emanating from this source
						var acts = this.sourceList[0].actionList.length;
						cY += (acts * 10) / 2;
						for (var act in this.sourceList[0].actionList) {
							if (this.sourceList[0].actionList[act] == this) {
								break;
							}
							cY -= 10;
						}
					}
				}
			}

			sy = parseInt(sy) - sourceScrollTop;

			var vertDiff = (this.targetLine ? targetScrollTop : sourceScrollTop);
			var path = 'M ' + cX + ' ' + (parseInt(cY) - vertDiff) +
						' L ' + (spineX - this.rx) + ' ' + (parseInt(cY) - vertDiff) +
						' ' + (sx + this.rx) + ' ' + sy +
						' ' + sx + ' ' + sy;

			this.sourceLines[n].setAttribute("d",path);
		}
	}

	// draw line to spine for source only action
	if (!this.targetLine && this.spineMarker) {
		this.spineMarker.setAttribute("transform", 'translate('+cX+','+(cY-sourceScrollTop)+')');
	}

	this.SVGGroup.setAttribute("style",visible ? "" : "display: none;");
}

function Action_unrender()
{
	if (!this.SVGGroup) {
		return;
	}

	// if we are selected, unselect
	if (currItem == this) {
		selectItem(null);
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
}

function Action_select(flag)
{
	if (this.SVGGroup == null) {
		return;
	}

	var actionClass = this.getShapeClass('action',flag);
	var circleClass = this.getShapeClass('circle',flag);
	var rectClass = this.getShapeClass('propRect',flag);
	var hiddenClass = 'DTLActionHidden';

	// set styles for connectors
	if (this.targetLine) {
		var addHidden = removeClass(this.targetLine,hiddenClass);
		this.targetLine.setAttribute("class",actionClass);
		if (addHidden) addClass(this.targetLine,hiddenClass);
	}
	if (this.spineMarker) {
		this.spineMarker.setAttribute("class",circleClass);
	}
	for (var n = 0; n < this.sourceLines.length; n++) {
		if (this.sourceLines[n]) {
			var sourceLine = this.sourceLines[n];
			var addHidden = removeClass(sourceLine,hiddenClass);
			sourceLine.setAttribute("class",actionClass);
			if (addHidden) addClass(sourceLine,hiddenClass);
		}
	}

	// update related properties
	if (this.target && (this.target != currItem) && this.target.SVGGroup) {
		var rect = document.getElementById("rect_" + this.target.id);
		rect.setAttribute("class",rectClass);
	}

	for (var n = 0; n < this.sourceList.length; n++) {
		var src = this.sourceList[n];
		if (src.SVGGroup && (src != currItem)) {
			var rect = document.getElementById("rect_" + src.id);
			rect.setAttribute("class",rectClass);
		}
	}
}

/// set an xml-attribute for this Action
function Action_setAttr(attr, value)
{
	this.attributes[attr] = value;
	this.attrState = null;
}

/// get an xml-attribute for this Action
function Action_getAttr(attr)
{
	return this.attributes[attr] ? this.attributes[attr] : '';
}

/// Get the class for a shape
function Action_getShapeClass(shape,selectType)
{
	var coreShapeClass = '';
	var hasExtraClasses = false;
	switch(shape) {
		case 'action':
			coreShapeClass = 'DTLAction';
			hasExtraClasses = true;
			break;
		case 'circle':
			coreShapeClass = 'DTLCircle';
			break;
		case 'propRect':
			coreShapeClass = 'PropRect';
			break;
	}
	var shapeClass = coreShapeClass;
	if (shapeClass != '') {
		if ((typeof selectType == 'string') && (selectType != '')) {
			// special case for proprect
			if (shape == 'propRect') {
				shapeClass += 'Related';
			}
			else {
				shapeClass += selectType.charAt(0).toUpperCase() + selectType.substring(1);
			}
		}
		if (hasExtraClasses) {
			if (!this.isValid) {
				shapeClass += ' ' + coreShapeClass + 'Invalid';
			}
			if (this.disabled) {
				shapeClass += ' ' + coreShapeClass + 'Disabled';
			}
		}
	}
	return shapeClass;
}

function addClass(element,cls)
{
	if ((!element) || (!cls)) return;
	var currClasses = ('' + element.getAttribute('class')).split(' ');
	if (currClasses.indexOf(cls) == -1) {
		currClasses.push(cls);
		element.setAttribute('class',currClasses.join(' '));
		return true;
	}
	return false;
}

function removeClass(element,cls)
{
	if ((!element) || (!cls)) return;
	var currClasses = ('' + element.getAttribute('class')).split(' ');
	var pos = currClasses.indexOf(cls);
	var found = (pos > -1);
	while (pos > -1) {
		currClasses.splice(pos,1);
		pos = currClasses.indexOf(cls);
	}
	if (found) element.setAttribute('class',currClasses.join(' '));
	return found;
}

// Figure out center x,y position of spine marker
// returned as string containing x,y
function calculatespineMarkerLocation(action, ty)
{
	var cX, cY;
	var count = 0;
	if (action.target) {
		count = action.target.actionList.length;
	}

	var ord = action.targetOrdinal;

	switch (count) {
	case 0:
	case 1:
		cX = spineX;
		cY = ty;
		break;
	case 2:
		cX = spineX;
		cY = (ty - 6) + (ord * 12);
		break;
	case 3:
		cX = spineX;
		cY = (ty - 12) + (ord * 12);
		break;
	case 4:
		if (ord < 2) {
			cX = spineX;
			cY = (ty - 16) + (ord * 16);
		}
		else {
			cX = spineX + 12;
			cY = (ty - 8) + ((ord-2) * 16);
		}
		break;
	case 5:
	default:
		if (ord < 3) {
			cX = spineX;
			cY = (ty - 16) + (ord * 16);
		}
		else {
			cX = spineX + 12;
			cY = (ty - 9) + ((ord-3) * 18);
		}
		break;
	}

	return cX + "," + cY;
}

// ---------------------------------------------------------------------------
/// helper function: $G for JavaScript
function get(val)
{
	return (val == null) ? '' : val;
}

// ----------------------------------------------------------------
// generic methods

// unquote any special xml entities within text
function unescapeXML(text)
{
	if (text) {
		text = text.replace(/&gt;/g,'>');
		text = text.replace(/&lt;/g,'<');
		text = text.replace(/&quot;/g,'"');
		text = text.replace(/&amp;/g,'&');
	}

	return text
}

// quote any special xml characters within text
function escapeXML(text)
{
	if (text && (text != '') && (text != text*1)) {
		text = text.replace(/&/g,'&amp;');
		text = text.replace(/>/g,'&gt;');
		text = text.replace(/</g,'&lt;');
		//text = text.replace(/\"/g,'&quot;');
		text = text.replace(/\'/g,'&apos;');
	}
	return text;
}

// ---------------------------------------------------------------------------
// RubberBand functions
// the rubber band provides feedback while connecting shapes

var rubberX = 0;
var rubberY = 0;
var currRubberBand = null;

function startRubberBand(x, y)
{
	if (currRubberBand) {
		return;
	}

	// remember start of line
	rubberX = x;
	rubberY = y;

	var element = document.createElementNS(SVGNS,"line");
	element.setAttribute("class", "RubberBand");
	element.setAttribute("x1", x);
	element.setAttribute("y1", y);
	element.setAttribute("x2", x);
	element.setAttribute("y2", y);

	var canvas = document.getElementById("canvas");
	canvas.appendChild(element);

	currRubberBand = element;
}

function moveRubberBand(x, y)
{
	if (currRubberBand) {
		currRubberBand.setAttribute("x2", x);
		currRubberBand.setAttribute("y2", y);
	}
}

// end the connection rubber band;
// if target and source are defined, connect them, else cancel
function endRubberBand()
{
	if (currRubberBand) {
		// delete the rubber band
		var canvas = document.getElementById("canvas");
		canvas.removeChild(currRubberBand);
		currRubberBand = null;

		// connect?
		var currProperty = null;
		if (currItem && (currItem.gtype == 'property')) {
			currProperty = currItem;
		}

		if (currProperty && currDropTarget) {
			// define a new assignment
			if (currItem.type == 'target') {
				canvas_createAction(currProperty,currDropTarget);
			}
			else {
				// reverse when source is clicked first
				canvas_createAction(currDropTarget,currProperty);
			}
			var rect = document.getElementById("rect_" + currDropTarget.id);
			rect.setAttribute("class","PropRect");

			var io = document.getElementById("io_" + currDropTarget.id);
			io.setAttribute("class","IOActionNone");
			currDropTarget = null;
		}
	}
}

// ---------------------------------------------------------------------------
// functions for processing collection syntax

/// take an oname and insert key as last key value
/// also apply key values from the current action ancestor info
function applyKeyToName(oname,ancestors)
{
	// now we get the list of ancestor information directly in ancestors
	// if this list has non-zero length, there are foreach elements as ancestors
	// Note this list is built up from the current node, whereas tokenList is built from left to right
	// of the supplied string (i.e. top down).
	// Also, getParentActionInfo() returns objects reflecting Ens.DTL.ForEach structure.
	if (!ancestors) ancestors = getParentActionInfo();

	var tokenList = parseCollectionSyntax(oname);
	var parentTokens = null;

	if (ancestors.length > 0) {
		var keyIndex = [];
		for (var tokenPos = 0; tokenPos < tokenList.length; tokenPos++) {
			var token = tokenList[tokenPos];
			if ((token.type == 'prop') && (token.key != null)) keyIndex.push(tokenPos);
		}
		var parentKeys = extractParentKeys(ancestors);
		var keyCount = parentKeys.length;
		var keyOffset = 0;
		if (parentKeys.length > keyIndex.length) {
			keyCount = keyIndex.length;
			keyOffset = parentKeys.length - keyCount;
		}
		for (var i = 0; i < keyCount; i++) {
			var token = tokenList[keyIndex[i]];
			if (token) token.key = parentKeys[keyOffset+i];
		}
	}

	return unparse(tokenList);
}

/// Produce a list of keys based on an array of ancestor actions.
/// We only examine ForEach actions, and work from the top action down.
/// When processing later actions, we ignore previously discovered keys up to the point where
/// a non-matching key is found in the child.
function extractParentKeys(ancestors)
{
	var keys = [];
	if (ancestors) {
		for (var i = ancestors.length - 1; i >= 0; i--) {
			var action = ancestors[i];
			if (action && (action._class == 'Ens.DTL.ForEach') && (action.Property != '')) {
				var tokenList = parseCollectionSyntax(action.Property);
				var currKeys = [];
				if (tokenList) {
					for (var j = 0; j < tokenList.length; j++) {
						var token = tokenList[j];
						if (token && (token.type == 'prop') && (token.key != null)) currKeys.push(token.key);
					}
				}
				if ((action.Key != '') && (action.Key != null) && (action.Key != '""')) {
					if ((currKeys.length > 0) && (currKeys[currKeys.length-1] == '')) currKeys.pop();
					currKeys.push(action.Key);
				}
				for (var k = 0; k < keys.length; k++) {
					if (currKeys[0] != keys[k]) break;
					currKeys.splice(0,1);
				}
				keys = keys.concat(currKeys);
			}
		}
	}
	return keys;
}

/// find last key value in an expression
function findLastKeyInName(oname)
{
	var tokenList = parseCollectionSyntax(oname);
	var key = '';

	// find last key
	for (var n = tokenList.length-1; n >= 0; n--) {
		var node = tokenList[n];
		if (node.type == 'prop') {
			key = node.key==null ? '' : node.key;
			break;
		}
	}

	return key;
}

/// find properties & keys within a regular or virtual property expression
/// returns list of tokens
function parseCollectionSyntax(expr)
{
	var tokenList = []; // list of tokens

	// parse the expression
	var state = 0;
	var token = "";
	var key = "";
	var braceCount = 0;
	var parenCount = 0;
	var last = '';
	var ch;

	for (var n = 0; n < expr.length; n++) {
		ch = expr.charAt(n);

		switch(state) {
		case 0:
			// start
			if (ch == '{') {
				addToken(tokenList,'text',token+ch,null);
				state = 1; // start of virtual property
				token = '';
				braceCount = 1;
			}
			else if (ch == '(') {
				state = 3; // start of regular property key
				parenCount = 1;
				key = '';
			}
			else if (ch == '"') {
				token += ch;
				if (last == '.') {
					state = 4; // start of delimited property name
				}
			}
			else {
				token += ch;
			}
			break;

		case 1:
			// virtual property
			if (ch == '{') {
				token += ch;
				braceCount++;
			}
			else if (ch == '(') {
				state = 2; // start of key
				parenCount = 1;
				key = '';
			}
			else if (ch == ':' || ch == '.') {
				if (token != '') {
					addToken(tokenList,'prop',token,null);
				}
				addToken(tokenList,'op',ch);
				token = '';
			}
			else if (ch == '}') {
				braceCount--;
				if (braceCount == 0) {
					if (token != '') {
						addToken(tokenList,'prop',token,null);
					}
					state = 0; // end of virtual property
					token = '}';
				}
				else {
					token += ch;
				}
			}
			else {
				token += ch;
			}
			break;

		case 2:
			// virtual propertykey
			if (ch == '(') {
				key += ch;
				parenCount++;
			}
			else if (ch == ')') {
				parenCount--;
				if (parenCount == 0) {
					addToken(tokenList,'prop',token,key);
					state = 1; // end of virtual property key
					token = '';
				}
				else {
					key += ch;
				}
			}
			else {
				key += ch;
			}
			break;

		case 3:
			// regular property key
			if (ch == '(') {
				key += ch;
				parenCount++;
			}
			else if (ch == ')') {
				parenCount--;
				if (parenCount == 0) {
					addToken(tokenList,'prop',token,key);
					state = 0; // end of regular property key
					token = '';
				}
				else {
					key += ch;
				}
			}
			else {
				key += ch;
			}
			break;

		case 4:
			// delimited property name
			token += ch;
			if (ch == '"') {
				var peek = expr.charAt(n+1);
				if (peek.match(/((\_+) | (\s+) | (\W+))/g)) {
					state = 0; // end delimited property
				}
			}
			break;

		default:
			alert('parseCollection: unknown state!');
			break;
		}
		last = ch;
	}

	if (token != '') {
		addToken(tokenList,'text',token);
	}

	return tokenList;
}

/// convert tokenList back into expression
function unparse(tokenList)
{
	var t = '';
	for (var n = 0; n < tokenList.length; n++) {
		var node = tokenList[n];
		switch(node.type) {
		case 'text':
			t += node.value;
			break;
		case 'prop':
			t += node.value;
			if (node.key!=null) {
				t += '(' + node.key + ')';
			}
			break;
		case 'op':
			t += node.value;
			break;
			break;
		}
	}
	return t;
}

// add a token to the collection parse list
function addToken(list,type,token,key)
{
	var node = new Object(); // node to hold parse info
	node.type = type;
	node.value = token;
	node.key = key;
	list[list.length] = node;
}


// ---------------------------------------------------------------------------
