/*
	ensbplshapeszen.js

	Copyright (c) 2003-2010, InterSystems Corp.
	ALL RIGHTS RESERVED

	Definitions of Shape objects for BPL Editor (zen edition)
*/

/*
	Contains definitions for the following shapes & types:

	Event
		start
		end
		reply
		receive
		alert
		label
	Decision
		if
		branch
		switch
	Flow
	Scope
	Join
	Activity
		assign
		break
		call
		catch
		catchall
		code
		compensate
		compensationhandler
		continue
		delay
		empty
		foreach
		milestone
		rule
		sequence
		sql
		sync
		throw
		trace
		transform
		until
		while
		xpath
		xslt
		unknown (internal)
	Connectors
		connection
		case (for switch)
		branch (for if)
		goto (for branch)
*/

// -----------------------------------------------------------------------

// icon definitions

var icon_CallAsync = "M 112,-4 L 112,16 M 114,-4 L 114,16 M 94,0 L 112,0 M 108,-2 L 112,0 108,2";
var icon_CallSync =  "M 112,-4 L 112,16 M 114,-4 L 114,16 M 94,0 L 112,0 M 108,-2 L 112,0 108,2 M 94,10 L 112,10 M 98,8 L 94,10 98,12";
var icon_Sync =      "M 112,-4 L 112,16 M 114,-4 L 114,16 M 94,10 L 112,10 M 98,8 L 94,10 98,12";
var icon_Assign =    "M 100,2 L 110,2 M 100,6 L 110,6";
var icon_Code =      "M 102,-2 L 108,-2 112,2 112,12 102,12 z M 108,-2 L 108,2 112,2 M 104,4 L 110,4 M 104,6 L 110,6 M 104,8 L 110,8";
var icon_Trace =     "M 100,14 L 116,14 M 100,0 L 108,10 111.5,12 110,8 102,-2 z M 102,2 L 104,0 M 108,10 L 110,8";
var icon_Milestone = "M 100,18 L 115,7 100,-4 85,7 z";

// -----------------------------------------------------------------------

// define various BPL Shape Constructors
function BPLEvent(diag, parent, type, name, x, y, isCopy,shapeDef)
{
	this.buildShape = BPLEvent_BuildShape;
	this.canAcceptInput = BPLEvent_CanAcceptInput;
	this.canAcceptOutput = BPLEvent_CanAcceptOutput;
	this.getInfo = BPLEvent_getInfo;
	this.setProperty = BPLEvent_setProperty;
	this.isValid = BPLEvent_isValid;
	this.getToolTip = BPLEvent_getToolTip;

	// connection handles
	this.xInput = 0;
	this.yInput = -35;
	this.xOutput = 0;
	this.yOutput = 35;

	// define the list of properties contained in the property bag
	switch (type) {
	case 'alert':
		var lang = theDiagram.Language == '' ? 'objectscript' : theDiagram.Language;
		// xlate for Studio
		lang = (lang == 'objectscript') ? 'cache' : lang;
		this.propertyList = 'Value'+insDelim2+'EXPRESSION_' + lang;
		// this.propertyList = 'Value'+insDelim2+'STRING';
		break;
	case 'receive':
		this.propertyList = 'Request'+insDelim2+'REQUESTCLASS,Timeout'+insDelim2+'STRING';
		break;
	}

	// invoke "super constructor"
	ConstructBPLShape(this,diag.nextShapeNumber(),parent,type,name,x,y, isCopy,shapeDef);

	// add this to diagram
	diag.insertShape(this);
}

function BPLActivity(diag, parent, type, name, x, y, isCopy, shapeDef)
{
	this.buildShape = BPLActivity_BuildShape;
	this.canAcceptInput = BPLActivity_CanAcceptInput;
	this.canAcceptOutput = BPLActivity_CanAcceptOutput;
	this.getInfo = BPLActivity_getInfo;
	this.setProperty = BPLActivity_setProperty;
	this.isValid = BPLActivity_isValid;
	this.getToolTip = BPLActivity_getToolTip;

	// connection handles
	this.xInput = 0;
	this.yInput = -30;
	this.xOutput = 0;
	this.yOutput = 30;

	var addProps = null;

	// define the list of properties contained in the property bag
	switch (type) {
	case 'assign':
		this.propertyList = 'Property'+insDelim2+'PROPERTY,Value'+insDelim2+'PROPERTY,Action'+insDelim2+'ENUM^set^append^clear^insert^remove,Key'+insDelim2+'PROPERTY';
		break;
	case 'break':
		break;

	case 'call':
		this.propertyList = 'Target'+insDelim2+'HOST,Async'+insDelim2+'BOOLEAN,Timeout'+insDelim2+'STRING';
		addProps = { Async: 1 };

		// request / response info
		// These are message structures used by call statements
		this.requestType = null;
		this.requestAssigns = null;
		this.responseType = null;
		this.responseAssigns = null;
		break;
	case 'code':
		break;
	case 'continue':
		break;
	case 'delay':
		this.propertyList = 'Duration'+insDelim2+'STRING,Until'+insDelim2+'STRING';
		break;
	case 'empty':
		break;
	case 'foreach':
		this.propertyList = 'Property'+insDelim2+'PROPERTY,Key'+insDelim2+'PROPERTY';
		break;
	case 'milestone':
		this.propertyList = 'Value'+insDelim2+'EXPRESSION_' + lang;
		break;
	case 'trace':
		var lang = theDiagram.Language == '' ? 'objectscript' : theDiagram.Language;
		// xlate for Studio
		lang = (lang == 'objectscript') ? 'cache' : lang;
		addProps = { Value: '""' };
		this.propertyList = 'Value'+insDelim2+'EXPRESSION_' + lang;
		break;
	case 'transform':
		this.propertyList = 'Class'+insDelim2+'DTLCLASS,Source'+insDelim2+'PROPERTY,Target'+insDelim2+'PROPERTY';
		break;
	case 'rule':
		this.propertyList = 'Rule'+insDelim2+'STRING,ResultLocation'+insDelim2+'PROPERTY,ReasonLocation'+insDelim2+'PROPERTY,RuleContext'+insDelim2+'PROPERTY';
		break;
	case 'sql':
		break;
	case 'sync':
		this.propertyList = 'Calls'+insDelim2+'CALLS,Type'+insDelim2+'ENUM^all^any,Timeout'+insDelim2+'STRING,AllowResync'+insDelim2+'BOOLEAN';
		addProps = { Type: 'all' };
		break;
	case 'until':
		var lang = theDiagram.Language == '' ? 'objectscript' : theDiagram.Language;
		// xlate for Studio
		lang = (lang == 'objectscript') ? 'cache' : lang;
		this.propertyList = 'Condition'+insDelim2+'EXPRESSION_' + lang;
		break;
	case 'while':
		var lang = theDiagram.Language == '' ? 'objectscript' : theDiagram.Language;
		// xlate for Studio
		lang = (lang == 'objectscript') ? 'cache' : lang;
		this.propertyList = 'Condition'+insDelim2+'EXPRESSION_' + lang;
		break;
	case 'xslt':
		this.propertyList = 'XSLURL'+insDelim2+'STRING,' + 'Source'+insDelim2+'PROPERTY,' + 'Target'+insDelim2+'PROPERTY';
		break;
	case 'xpath':
		this.propertyList = 'Source'+insDelim2+'PROPERTY,' + 'Property'+insDelim2+'PROPERTY,'  + 'Context'+insDelim2+'STRING,' + 'Expression'+insDelim2+'STRING,' + 'PrefixMappings'+insDelim2+'STRING,' + 'SchemaSpec'+insDelim2+'STRING';
		break;
	case 'throw':
		lang = (lang == 'objectscript') ? 'cache' : lang;
		this.propertyList = 'Fault'+insDelim2+'EXPRESSION_' + lang;
		break;
	case 'catch':
		lang = (lang == 'objectscript') ? 'cache' : lang;
		this.propertyList = 'Fault'+insDelim2+'EXPRESSION_' + lang;
		break;
	case 'catchall':
		break;
	case 'compensate':
		// !!! build list of targets
		this.propertyList = 'Target'+insDelim2+'STRING';
		break;
	case 'unknown':
		break;
	}

	// invoke "super constructor"
	ConstructBPLShape(this,diag.nextShapeNumber(),parent,type,name,x,y, isCopy,shapeDef,addProps);

	// add this to diagram
	diag.insertShape(this);
}

function BPLDecision(diag, parent, type, name, x, y, isCopy,shapeDef)
{
	this.buildShape = BPLDecision_BuildShape;
	this.canAcceptInput = BPLDecision_CanAcceptInput;
	this.canAcceptOutput = BPLDecision_CanAcceptOutput;
	this.getInfo = BPLDecision_getInfo;
	this.setProperty = BPLDecision_setProperty;
	this.isValid = BPLDecision_isValid;
	this.getToolTip = BPLDecision_getToolTip;

	// connection handles
	this.xInput = 0;
	this.yInput = -35;
	this.xOutput = 0;
	this.yOutput = 35;

	// define the list of properties contained in the property bag
	// and any other type-specific things
	switch (type) {
	case 'if':
		var lang = theDiagram.Language == '' ? 'objectscript' : theDiagram.Language;
		// xlate for Studio
		lang = (lang == 'objectscript') ? 'cache' : lang;
		this.propertyList = 'Condition'+insDelim2+'EXPRESSION_' + lang;
		break;

	case 'branch':
		var lang = theDiagram.Language == '' ? 'objectscript' : theDiagram.Language;
		// xlate for Studio
		lang = (lang == 'objectscript') ? 'cache' : lang;
		this.propertyList = 'Condition'+insDelim2+'EXPRESSION_' + lang;

		// holder for special goto connection
		this.gotoConnection = null;
		break;

	case 'switch':
		break;
	}

	// invoke "super constructor"
	ConstructBPLShape(this,diag.nextShapeNumber(),parent,type,name,x,y, isCopy,shapeDef);

	// add this to diagram
	diag.insertShape(this);
}

// flow
function BPLFlow(diag, parent, type, name, x, y, isCopy,shapeDef)
{
	this.buildShape = BPLFlow_BuildShape;
	this.canAcceptInput = BPLFlow_CanAcceptInput;
	this.canAcceptOutput = BPLFlow_CanAcceptOutput;
	this.getInfo = BPLFlow_getInfo;
	this.setProperty = BPLFlow_setProperty;
	this.isValid = BPLFlow_isValid;
	this.getToolTip = BPLFlow_getToolTip;

	// connection handles
	this.xInput = 0;
	this.yInput = -20;
	this.xOutput = 0;
	this.yOutput = 20;

	// invoke "super constructor"
	ConstructBPLShape(this,diag.nextShapeNumber(),parent,type,name,x,y, isCopy,shapeDef);

	// add this to diagram
	diag.insertShape(this);
}

// scope
function BPLScope(diag, parent, type, name, x, y, isCopy,shapeDef)
{
	this.buildShape = BPLScope_BuildShape;
	this.canAcceptInput = BPLScope_CanAcceptInput;
	this.canAcceptOutput = BPLScope_CanAcceptOutput;
	this.getInfo = BPLScope_getInfo;
	this.setProperty = BPLScope_setProperty;
	this.isValid = BPLScope_isValid;
	this.getToolTip = BPLScope_getToolTip;

	// connection handles
	this.xInput = 0;
	this.yInput = -25;
	this.xOutput = 0;
	this.yOutput = 20;

	// add bounding box support
	this.updateBoundingBox = BPLShape_updateBoundingBox;

	// invoke "super constructor"
	ConstructBPLShape(this,diag.nextShapeNumber(),parent,type,name,x,y, isCopy,shapeDef);

	// add this to diagram
	diag.insertShape(this);
}

// join
function BPLJoin(diag, parent, type, name, x, y, isCopy,shapeDef)
{
	this.buildShape = BPLJoin_BuildShape;
	this.canAcceptInput = BPLJoin_CanAcceptInput;
	this.canAcceptOutput = BPLJoin_CanAcceptOutput;
	this.getInfo = BPLJoin_getInfo;
	this.setProperty = BPLJoin_setProperty;
	this.isValid = BPLJoin_isValid;
	this.getToolTip = BPLJoin_getToolTip;

	// connection handles
	this.xInput = 0;
	this.yInput = -20;
	this.xOutput = 0;
	this.yOutput = 20;

	// invoke "super constructor"
	ConstructBPLShape(this,diag.nextShapeNumber(),parent,type,name,x,y, isCopy,shapeDef);

	// add this to diagram
	diag.insertShape(this);
}


// various shape methods

// ------------------------------------------------------------------
// EVENT

// make the actual shape, stick it in the wrapping group
function BPLEvent_BuildShape(group)
{
	var main = document.createElementNS(SVGNS,"circle");

	// this is the "main" element for this shape
	main.setAttribute("id", "shape_main_" + this.index);

	// attributes
	main.setAttribute("cx", 0);
	main.setAttribute("cy", 0);
	main.setAttribute("r", 30);

	var lbloff = 0;

	if (this.Type == "end") {
		// special style for end events
		this.normalStyle = "BPLEventEnd";
	}
	else if (this.Type == "start") {
		// special style for end events
		this.normalStyle = "BPLEventStart";
	}
	else {
		this.normalStyle = "BPLEvent";
	}

	main.setAttribute("class",this.normalStyle);

	group.appendChild(main);

	var notext = false;

	if ((this.Type != "start") && (this.Type != "end")) {
		// double line for intermediate events
		var inner = document.createElementNS(SVGNS,"circle");

		// attributes
		inner.setAttribute("cx", 0);
		inner.setAttribute("cy", 0);
		inner.setAttribute("r", 27);

		inner.setAttribute("class","BPLEventInner");

		group.appendChild(inner);

		// icons
		if (this.Type == "receive") {
			notext = true;
			lbloff = 4;

			// draw envelope icon...

			var icon = document.createElementNS(SVGNS,"rect");
			icon.setAttribute("x", -15);
			icon.setAttribute("y", -4);
			icon.setAttribute("width", 30);
			icon.setAttribute("height", 20);

			icon.setAttribute("class","BPLEventIcon");
			icon.addEventListener("mousedown",BPLShapeMouseDown,false);

			group.appendChild(icon);

			icon = document.createElementNS(SVGNS,"polyline");
			icon.setAttribute("points", "15,-4 0,6 -15,-4");
			icon.setAttribute("class","BPLEventIcon");
			icon.addEventListener("mousedown",BPLShapeMouseDown,false);

			group.appendChild(icon);
		}
		else if (this.Type == "reply") {
			notext = true;

			// draw reply icon...
			icon = document.createElementNS(SVGNS,"polyline");
			icon.setAttribute("points", "8,-6 8,8 -12,8 -12,14 -20,4 -12,-6 -12,0 2,0 2,-6 5,-5 8,-6");
			icon.setAttribute("class","BPLEventIcon");
			icon.addEventListener("mousedown",BPLShapeMouseDown,false);

			group.appendChild(icon);
		}
		else if (this.Type == "alert") {
			notext = true;

			// draw alert icon...

			var icon = document.createElementNS(SVGNS,"ellipse");
			icon.setAttribute("cx", 0);
			icon.setAttribute("cy", 2);
			icon.setAttribute("rx", 3);
			icon.setAttribute("ry", 9);

			icon.setAttribute("class","BPLEventIcon");
			icon.addEventListener("mousedown",BPLShapeMouseDown,false);

			group.appendChild(icon);

			icon = document.createElementNS(SVGNS,"circle");
			icon.setAttribute("cx", 0);
			icon.setAttribute("cy", 18);
			icon.setAttribute("r", 3);

			icon.setAttribute("class","BPLEventIcon");
			icon.addEventListener("mousedown",BPLShapeMouseDown,false);

			group.appendChild(icon);
		}
		else if (this.Type == "reply") {
			//
			notext = false;
		}
		else if (this.Type == "label") {
			//
			notext = false;
		}
	}

	// type label
	var text = document.createElementNS(SVGNS,"text");
	text.setAttribute("class","ActivityType");
	text.setAttribute("clip-path","url(#clipPath_event)");
	text.setAttribute("text-anchor", "middle");
	text.setAttribute("x", 0);
	text.setAttribute("y", -11 + lbloff);

	// create the text node and append it
	var textNode = document.createTextNode('<' + this.Type + '>');
	text.appendChild(textNode);

	group.appendChild(text);

	// text
	if (!notext) {
		var text = document.createElementNS(SVGNS,"text");
		text.setAttribute("clip-path","url(#clipPath_event)");
		text.setAttribute("class","ShapeName");
		text.setAttribute("id","shape_label_" + this.index);
		text.setAttribute("text-anchor", "middle");
		text.setAttribute("x", 0);
		text.setAttribute("y", 7);

		// create the text node and append it
		var textNode = document.createTextNode(this.Name);
		text.appendChild(textNode);

		group.appendChild(text);
	}

	if (this.Type != "start") {
		// input
		makeInputHandle(group,this,0,-30);
	}

	if (this.Type != "end") {
		// output
		makeOutputHandle(group,this,0,30);
	}

	// annotation
	makeAnnotation(group,this,22,-22);

	return main;
}

// test if we can accept an input from shape
function BPLEvent_CanAcceptInput(shape)
{
	if (this.Type == "start") {
		return false;
	}

	// if we're a label we can accept only one non-goto connection
	if (this.Type == 'label') {
		for (var i = 0; i < this.inputList.length; i++) {
			if (this.inputList[i].ConnectType != 'goto') {
				return false;
			}
		}
		return true;
	}

	// only accept one input
	if (this.inputList.length > 0) {
		return false;
	}

	// cannot connect start to end directly
	// unless on a drill down page
	if (shape && !shape.parentShape && this.Type == "end" && shape.Type == "start") {
		return false;
	}

	// test if we are already connected to shape
	for (var i = 0; i < this.inputList.length; i++) {
		if (this.inputList[i].fromShape == shape) {
			return false;
		}
	}

	return true;
}

// test if we can accept an output from shape
function BPLEvent_CanAcceptOutput(shape)
{
	if (this.Type == "end") {
		return false;
	}

	// only accept one output
	if (this.outputList.length > 0) {
		return false;
	}

	// cannot connect start to end directly
	if (shape && this.Type == "start" && shape.Type == "end") {
		return false;
	}

	// test if we are already connected to shape
	for (var i = 0; i < this.outputList.length; i++) {
		if (this.outputList[i].toShape == shape) {
			return false;
		}
	}

	return true;
}

// Get info on this shape (as a serialized string)
// used by the Studio Inspector
function BPLEvent_getInfo()
{
	var state = BPLShape_getInfo(this);
	return state;
}

// set the given property to value
function BPLEvent_setProperty(prop,value)
{
	var old = null;

	switch (prop) {
	default:
		old = BPLShape_setProperty(this,prop,value);
		break;
	}

	if (old && !this.isCopy) {
		undo_AddAction("set",this,prop,old);
	}
}

// Test if this shape is syntactically valid
function BPLEvent_isValid()
{
	this.validationMsg = '';

	switch (this.Type) {
	case 'start':
		if (this.outputList.length != 1) {
			this.validationMsg += getLocalText('NoOutput') + '\n';
		}
		break;
	case 'end':
		if (this.inputList.length != 1) {
			this.validationMsg += getLocalText('NoInput') + '\n';
		}
		break;
	case 'alert':
		if (get(this.propertyBag['Value']) == '') {
			this.validationMsg += getLocalText('NoAttr','Value',this.Type) + '\n';
		}
		if (this.inputList.length == 0) {
			this.validationMsg += getLocalText('NoInput') + '\n';
		}
		if (this.outputList.length == 0) {
			this.validationMsg += getLocalText('NoOutput') + '\n';
		}
		break;
	case 'label':
		if (this.Name.length == 0) {
			this.validationMsg += getLocalText('NoAttr','Name',this.Type) + '\n';
		}
		// Note: no break
	default:
		if (this.inputList.length == 0) {
			this.validationMsg += getLocalText('NoInput') + '\n';
		}
		if (this.outputList.length == 0) {
			this.validationMsg += getLocalText('NoOutput') + '\n';
		}
		break;
	}

	// additional validation
	switch (this.Type) {
	case 'receive':
		if (get(this.propertyBag['Request']) == '') {
			this.validationMsg += getLocalText('NoAttr','Request',this.Type) + '\n';
		}
		break;
	}

	return (this.validationMsg == '');
}

// Return tooltip text for shape
function BPLEvent_getToolTip()
{
	var tip = this.Name;

	switch (this.Type) {
	case 'start':
		if (this.parentShape) {
			tip = getLocalText('TipStartSeq');
		}
		else {
			tip = getLocalText('TipStartProc');
		}
		break;
	case 'end':
		if (this.parentShape) {
			tip = getLocalText('TipEndSeq');
		}
		else {
			tip = getLocalText('TipEndProc');
		}
		break;
	case 'receive':
		tip = getLocalText('TipReceive');
		break;
	case 'reply':
		tip = getLocalText('TipReply');
		break;
	case 'label':
		tip = getLocalText('TipLabel');
		break;
	case 'alert':
		tip = getLocalText('TipAlert');
		break;
	default:
		break;
	}

	return tip;
}

// ------------------------------------------------------------------
// ACTIVITY
// make the actual shape, stick it in the wrapping group
function BPLActivity_BuildShape(group)
{
	var main = document.createElementNS(SVGNS,"rect");

	// attributes
	main.setAttribute("x", -(shapeWidth / 2));
	main.setAttribute("y", -(shapeHeight / 2));
	main.setAttribute("width", shapeWidth);
	main.setAttribute("height", shapeHeight);
	main.setAttribute("rx", 10);

	// this is the "main" element for this shape
	main.setAttribute("id", "shape_main_" + this.index);
	main.setAttribute("class",this.normalStyle);

	group.appendChild(main);

	// if this is a grouping or looping tag, add the group symbol
	if (this.Type == "sequence" || this.Type == "foreach" ||
		this.Type == "until" || this.Type == "while" ||
		this.Type == "compensationhandler" || this.Type == "catch" || this.Type == "catchall") {

		// inner rect
		/*
		var ir = document.createElementNS(SVGNS,"rect");
		ir.setAttribute("x", -((shapeWidth - 6) / 2));
		ir.setAttribute("y", -((shapeHeight - 6)/2));
		ir.setAttribute("width", (shapeWidth - 6));
		ir.setAttribute("height", (shapeHeight-6));
		ir.setAttribute("rx", 13);
		ir.setAttribute("style","fill: none; stroke: #8080D0; stroke-width: 1;");

		group.appendChild(ir);
		*/

		var gx;

		// outline
		gx = document.createElementNS(SVGNS,"polyline");
		gx.setAttribute("points", "-8,25 -8,11 8,11 8,25");
		gx.setAttribute("style","fill: none; opacity: 0.5; stroke: #8080D0; stroke-width: 2;");
		group.appendChild(gx);

		// interior
		gx = document.createElementNS(SVGNS,"rect");
		gx.setAttribute("id","groupInterior_" + this.index);
		gx.setAttribute("x", -8);
		gx.setAttribute("y", 10);
		gx.setAttribute("width", 16);
		gx.setAttribute("height", 14);
		gx.setAttribute("rx", 2);
		gx.setAttribute("style","opacity: 0.5; stroke: none; stroke-width: 0;");
		gx.setAttribute("fill","white");
		group.appendChild(gx);

		// add click handler
		gx.addEventListener("click",BPLGroupMouseClick,false);
		gx.addEventListener("mouseover",function(evt) {evt.target.setAttribute('fill','orange');},false);
		gx.addEventListener("mouseout",function(evt) {evt.target.setAttribute('fill','white');},false);

		if (this.Type == "sequence" || this.Type == "compensationhandler" || this.Type == "catch" || this.Type == "catchall") {
			// +
			gx = document.createElementNS(SVGNS,"line");
			gx.setAttribute("id","groupHz_" + this.index);
			gx.setAttribute("x1", -4);
			gx.setAttribute("y1", 17);
			gx.setAttribute("x2", 4);
			gx.setAttribute("y2", 17);
			gx.setAttribute("style","stroke: #8080D0; stroke-width: 2;");
			group.appendChild(gx);

			// add click handler
			gx.addEventListener("click",BPLGroupMouseClick,false);

			gx = document.createElementNS(SVGNS,"line");
			gx.setAttribute("id","groupVt_" + this.index);
			gx.setAttribute("x1", 0);
			gx.setAttribute("y1", 13);
			gx.setAttribute("x2", 0);
			gx.setAttribute("y2", 22);
			gx.setAttribute("style","stroke: #8080D0; stroke-width: 2;");
			group.appendChild(gx);

			// add click handler
			gx.addEventListener("click",BPLGroupMouseClick,false);
		}
		else if (this.Type == "foreach" || this.Type == "until" || this.Type == "while") {
			// loop

			gx = document.createElementNS(SVGNS,"path");
			gx.setAttribute("id","groupLoop_" + this.index);
			gx.setAttribute("d", "M -4 16 A 4 4 0 1 1 0 20 L -2 20 M -3 20 l 4 -4 M -3 19 l 4 4");
			gx.setAttribute("style","stroke: #8080D0; stroke-width: 2; fill: none;");
			group.appendChild(gx);

			// add click handler
			gx.addEventListener("click",BPLGroupMouseClick,false);
		}
	}

	// icon
	var icon = null;
	if (this.Type == "delay") {
		// draw timer icon...
		icon = document.createElementNS(SVGNS,"circle");

		// attributes
		icon.setAttribute("cx", 100);
		icon.setAttribute("cy",  8);
		icon.setAttribute("r",  12);

		icon.setAttribute("class","BPLActivityIcon");
		icon.addEventListener("mousedown",BPLShapeMouseDown,false);

		group.appendChild(icon);

		for (var i = 0; i < 12; i++) {
			var tick = document.createElementNS(SVGNS,"line");
			tick.setAttribute("x1", 100);
			tick.setAttribute("x2", 100);
			tick.setAttribute("y1", -4);
			tick.setAttribute("y2",  0);
			tick.setAttribute("transform", "rotate(" + (30*i) + ",100,8)");

			tick.setAttribute("class","BPLActivityIcon");
			group.appendChild(tick);
		}

		// second hand
		var tick = document.createElementNS(SVGNS,"line");
		tick.setAttribute("x1", 100);
		tick.setAttribute("x2", 100);
		tick.setAttribute("y1", -4);
		tick.setAttribute("y2",  8);
		tick.setAttribute("transform", "rotate(-15,100,8)");

		tick.setAttribute("class","BPLActivityIcon");
		group.appendChild(tick);
	}
	else if (this.Type == "call") {
		// draw sync/async icon...
		icon = document.createElementNS(SVGNS,"path");
		icon.setAttribute("id", "icon_" + this.index);
		var isAsync = this.propertyBag.Async;
		if ( (isAsync != 'undefined') && ( (isAsync == 0) || (isAsync == '0') || (!isAsync) ) ) {
			icon.setAttribute("d", icon_CallSync);
		}
		else {
			icon.setAttribute("d", icon_CallAsync);
		}
		icon.setAttribute("class","BPLActivityIcon");
		group.appendChild(icon);
	}
	else if (this.Type == "sync") {
		// draw sync icon...
		icon = document.createElementNS(SVGNS,"path");
		icon.setAttribute("id", "icon_" + this.index);
		icon.setAttribute("d", icon_Sync);
		icon.setAttribute("class","BPLActivityIcon");
		group.appendChild(icon);
	}
	else if (this.Type == "milestone") {
		// draw milestone icon...
		icon = document.createElementNS(SVGNS,"path");
		icon.setAttribute("id", "icon_" + this.index);
		icon.setAttribute("d", icon_Milestone);
		icon.setAttribute("class","BPLActivityIcon");
		group.appendChild(icon);
	}
	else if (this.Type == "trace") {
		// draw trace icon...
		icon = document.createElementNS(SVGNS,"path");
		icon.setAttribute("id", "icon_" + this.index);
		icon.setAttribute("d", icon_Trace);
		icon.setAttribute("class","BPLActivityIcon");
		group.appendChild(icon);
	}
	else if (this.Type == "assign") {
		// draw assign icon...
		icon = document.createElementNS(SVGNS,"path");
		icon.setAttribute("id", "icon_" + this.index);
		icon.setAttribute("d", icon_Assign);
		icon.setAttribute("class","BPLActivityIcon");
		icon.setAttribute("style","stroke-width: 1.8;");
		group.appendChild(icon);
	}
	else if (this.Type == "code" || this.Type == "sql") {
		// draw code icon...
		icon = document.createElementNS(SVGNS,"path");
		icon.setAttribute("id", "icon_" + this.index);
		icon.setAttribute("d", icon_Code);
		icon.setAttribute("class","BPLActivityIcon");
		group.appendChild(icon);
	}
	else if (this.Type == "catch" || this.Type == "catchall") {
		// draw catch icon...
		icon = document.createElementNS(SVGNS,"path");
		icon.setAttribute("id", "icon_" + this.index);
		icon.setAttribute("d", "M 92,3 L 100,15 108,3 z");
		icon.setAttribute("class","BPLActivityIcon");
		icon.setAttribute("style","fill: gray;");
		group.appendChild(icon);

		var icon2 = document.createElementNS(SVGNS,"ellipse");
		icon2.setAttribute("cx", 100);
		icon2.setAttribute("cy", 3);
		icon2.setAttribute("rx", 8);
		icon2.setAttribute("ry", 2.5);
		icon2.setAttribute("class","BPLActivityIcon");
		icon2.setAttribute("style","fill: darkblue; opacity: 1.0;");
		group.appendChild(icon2);

		var icon2 = document.createElementNS(SVGNS,"line");
		icon2.setAttribute("x1", 101);
		icon2.setAttribute("y1", -7);
		icon2.setAttribute("x2", 101);
		icon2.setAttribute("y2", -14);
		icon2.setAttribute("class","BPLActivityIcon");
		group.appendChild(icon2);

		var icon2 = document.createElementNS(SVGNS,"line");
		icon2.setAttribute("x1", 99);
		icon2.setAttribute("y1", -7);
		icon2.setAttribute("x2", 99);
		icon2.setAttribute("y2", -14);
		icon2.setAttribute("class","BPLActivityIcon");
		group.appendChild(icon2);

		var icon2 = document.createElementNS(SVGNS,"circle");
		icon2.setAttribute("cx", 100);
		icon2.setAttribute("cy", -4);
		icon2.setAttribute("r", 2);
		icon2.setAttribute("class","BPLActivityIcon");
		icon2.setAttribute("style","fill: red;");
		group.appendChild(icon2);
	}
	else if (this.Type == "rule") {
		// draw rule icon...
		icon = document.createElementNS(SVGNS,"text");
		icon.setAttribute("class","BPLActivityIconText");
		icon.setAttribute("x",105);
		icon.setAttribute("y",10);
		icon.setAttribute("text-anchor","middle");

		var textNode = document.createTextNode('f(x)');
		icon.appendChild(textNode);

		group.appendChild(icon);
	}
	this.hasIcon = (icon != null);

	// type label
	var text = document.createElementNS(SVGNS,"text");
	text.setAttribute("class","ActivityType");
	text.setAttribute("text-anchor", "middle");
	text.setAttribute("x", 0);
	text.setAttribute("y", -12);

	ln = document.createElementNS(SVGNS,"line");
	ln.setAttribute("x1", -(shapeWidth - 1)/2);
	ln.setAttribute("y1", -8);
	ln.setAttribute("x2", (shapeWidth - 1)/2);
	ln.setAttribute("y2", -8);
	ln.setAttribute("style","stroke: #808080; stroke-width: 0.6;");
	group.appendChild(ln);

	// create the text node and append it
	var textNode = document.createTextNode('<' + this.Type + '>');
	text.appendChild(textNode);

	group.appendChild(text);

	// text
	var text = document.createElementNS(SVGNS,"text");
	text.setAttribute("class","ShapeName");
	var clipPath = 'url(#clipPath_activity' + (icon ? 'Icon' : '') + ')';
	text.setAttribute("clip-path",clipPath);
	text.setAttribute("id","shape_label_" + this.index);
	text.setAttribute("text-anchor", "middle");
	// shift text when there is an icon
	text.setAttribute("x", (icon ? -5 : 0));
	text.setAttribute("y", 9.5);

	// create the text node and append it
	var textNode = document.createTextNode(this.Name);
	text.appendChild(textNode);

	group.appendChild(text);

	// input
	makeInputHandle(group,this,0,-shapeHeight/2);

	// output
	makeOutputHandle(group,this,0,shapeHeight/2);

	// annotation
	makeAnnotation(group,this,(shapeWidth/2),-((shapeHeight-10)/2));

	return main;
}

// test if we can accept an input from shape
function BPLActivity_CanAcceptInput(shape)
{
	// only accept one input
	if (this.inputList.length > 0) {
		return false;
	}

	// test if we are already connected to shape
	for (var i = 0; i < this.inputList.length; i++) {
		if (this.inputList[i].fromShape == shape) {
			return false;
		}
	}
	return true;
}

// test if we can accept an output from shape
function BPLActivity_CanAcceptOutput(shape)
{
	// only accept one output
	if (this.outputList.length > 0) {
		return false;
	}

	// test if we are already connected to shape
	for (var i = 0; i < this.outputList.length; i++) {
		if (this.outputList[i].toShape == shape) {
			return false;
		}
	}

	return true;
}

// Get info on this shape (as a serialized string)
// used by the Studio Inspector
function BPLActivity_getInfo()
{
	var state = [ BPLShape_getInfo(this,true) ];

	// additional properties not in the bag
	switch (this.Type) {
	case 'code':
		// language!
		var lang = theDiagram.Language == '' ? 'objectscript' : theDiagram.Language;
		// xlate for Studio
		lang = (lang == 'objectscript') ? 'cache' : lang;
		state[state.length] = 'Code' + insDelim2 + 'CODE_' + lang + insDelim2 + this.code;
		break;
	case 'sql':
		state[state.length] += 'SQL'+insDelim2+'CODE_sql' + insDelim2 + this.code;
		break;
	case 'xslt':
		// prop \x03 type \x03 collection \x03 init \x02
		var parms = '';
		for (var i = 0; i < ((null==this.Parameters) ? 0 : this.Parameters.length); i++) {
			var prop = this.Parameters[i];
			if (prop) {
				parms += prop.Name + insDelim2 +  prop.Value + insDelim1a;
			}
		}
		state[state.length] = 'Parameters' + insDelim2 + 'simple_table' + insDelim2 + parms;
		break;
	case 'call':
		/*  serialized structure:
			Request:MESSAGE:
				(general) [request|response]:class\x02 (delim1a)
				(assign)  [assign]:property:type:key:value\x02
				\x01
		*/
		var msgstate;
		var assign;

		// request
		msgstate = 'request' + insDelim2 + get(this.requestType) + insDelim1a;

		if (this.requestAssigns) {
			for (var i = 0; i < this.requestAssigns.length; i++) {
				assign = this.requestAssigns[i];
				msgstate += 'assign' + insDelim2 +
							assign.property + insDelim2 +
							assign.action + insDelim2 +
							assign.key + insDelim2 +
							assign.value + insDelim1a;
			}
		}

		state[state.length] = 'Request' + insDelim2 + 'MESSAGE' + insDelim2 + msgstate;

		// response
		msgstate = 'response' + insDelim2 + get(this.responseType) + insDelim1a;

		if (this.responseAssigns) {
			for (var i = 0; i < this.responseAssigns.length; i++) {
				assign = this.responseAssigns[i];
				msgstate += 'assign' + insDelim2 +
							assign.property + insDelim2 +
							assign.action + insDelim2 +
							assign.key + insDelim2 +
							assign.value + insDelim1a;
			}
		}

		state[state.length] = 'Response' + insDelim2 + 'MESSAGE' + insDelim2 + msgstate;

		break;
	}
	state = state.join(insDelim1) + insDelim1;

	return state;
}

// set the given property to value
function BPLActivity_setProperty(prop,value)
{
 	var old = null;
	var bval = false;

	// translate int to bool
	if (value == 1 || value == '1') {
		bval = true;
	}
	else if (value == 0|| value == '0') {
		bval = false;
	}

	// special handling for Async flag to control icon
	if (this.Type == 'call' && prop == 'Async') {
		var icon = document.getElementById("icon_" + this.index);
		if (icon) {
			icon.setAttribute("d",bval ? icon_CallAsync : icon_CallSync);
		}
	}

	switch (prop) {

	case 'SQL':
	case 'Code':
		old = this.code;
		this.code = value;
		break;

	case "Parameters":
		if (this.Type == 'xslt') {
			// no undo
			this.Parameters = new Array();
			if ('' != value) {
				var s = value.split(insDelim1a);
				for (var i = 0; i < s.length-1; i++) {
					var t = s[i].split(insDelim2);
					var prop = new Object();
					prop.Name = t[0];
					prop.Value = t[1];
					this.Parameters[this.Parameters.length] = prop;
				}
			}
		}
		break;

	default:
		old = BPLShape_setProperty(this,prop,value);
		break;
	}

	if (old && !this.isCopy) {
		undo_AddAction("set",this,prop,old);
	}
}

// Test if this shape is syntactically valid
function BPLActivity_isValid()
{
	this.validationMsg = '';

	if (this.inputList.length == 0) {
		this.validationMsg += getLocalText('NoInput') + '\n';
	}

	if (this.outputList.length == 0) {
		this.validationMsg += getLocalText('NoOutput') + '\n';
	}

	// additional validation
	switch (this.Type) {
	case 'assign':
		if (get(this.propertyBag['Property']) == '') {
			this.validationMsg += getLocalText('NoAttr','Property',this.Type) + '\n';
		}
		if (get(this.propertyBag['Value']) === '') {
			this.validationMsg += getLocalText('NoAttr','Value',this.Type) + '\n';
		}
		break;
	case 'break':
	case 'continue':
		// test if we are inside of a looping sequence
		var parent = this.parentShape;
		var inloop = false;
		while (!inloop && parent) {
			var ptype = theDiagram.shapeList[parent].Type;
			if (ptype == "foreach" || ptype == "until" || ptype == "while") {
				inloop = true;
			}
			else {
				parent = theDiagram.shapeList[parent].parentShape;
			}
		}

		if (!inloop) {
			this.validationMsg += getLocalText('LoopReq',this.Type) + '\n';
		}

		break;
	case 'call':
		if (get(this.Name) == '') {
			this.validationMsg += getLocalText('NoAttr','Name',this.Type) + '\n';
		}
		if (get(this.propertyBag['Target']) == '') {
			this.validationMsg += getLocalText('NoAttr','Target',this.Type) + '\n';
		}
		if (get(this.requestType) == '') {
			this.validationMsg += getLocalText('NoAttr','Request',this.Type) + '\n';
		}
		// no timeout for async calls
		if (1 == get(this.propertyBag['Async'])) {
			if (get(this.propertyBag['Timeout']) != '') {
				this.validationMsg += getLocalText('AsyncTimeout','Target',this.Type) + '\n';
			}
		}
		break;
	case 'milestone':
		if (get(this.propertyBag['Value']) == '') {
			this.validationMsg += getLocalText('NoAttr','Value',this.Type) + '\n';
		}
		break;
	case 'delay':
		if ((get(this.propertyBag['Until']) == '') &&
			(get(this.propertyBag['Duration']) == '') ){
			// req'd
			this.validationMsg += getLocalText('NoDuration') + '\n';
		}

		if ((get(this.propertyBag['Until']) != '') &&
			(get(this.propertyBag['Duration']) != '') ){
			// only one value
			this.validationMsg += getLocalText('NoDuration2') + '\n';
		}
		break;
	case 'empty':
		break;
	case 'foreach':
		if (get(this.propertyBag['Property']) == '') {
			this.validationMsg += getLocalText('NoAttr','Property',this.Type) + '\n';
		}
		if (get(this.propertyBag['Key']) == '') {
			this.validationMsg += getLocalText('NoAttr','Key',this.Type) + '\n';
		}
		if (!this.validateChildren()) {
			this.validationMsg += getLocalText('ChildErrors','',this.Type) + '\n';
		}
		break;
	case 'sync':
		if (get(this.propertyBag['Calls']) == '') {
			this.validationMsg += getLocalText('NoAttr','Calls',this.Type) + '\n';
		}
		else {
			// make sure calls in list are valid
			var calls = get(this.propertyBag['Calls']).split(',');
			var def = theDiagram.listItems('call','Async','1').split(',');
			for (var i = 0; i < calls.length; i++) {
				var ok = false;
				if ('@' == calls[i].charAt(0)) {
					// assume this is indirection
					ok = true;

				}
				else {
					for (var j = 0; j < def.length; j++) {
						if (calls[i] == def[j]) {
							ok = true;
							break;
						}
					}
				}
				if (!ok) {
					this.validationMsg += getLocalText('BadCall',calls[i]) + '\n';
				}
			}
		}
		break;
	case 'trace':
		if (get(this.propertyBag['Value']) == '') {
			this.validationMsg += getLocalText('NoAttr','Value',this.Type) + '\n';
		}
		break;
	case 'rule':
		if (get(this.Name) == '') {
			this.validationMsg += getLocalText('NoAttr','Name',this.Type) + '\n';
		}
		if (get(this.propertyBag['Rule']) == '') {
			this.validationMsg += getLocalText('NoAttr','Rule',this.Type) + '\n';
		}
		break;
	case 'transform':
		if (get(this.propertyBag['Class']) == '') {
			this.validationMsg += getLocalText('NoAttr','Class',this.Type) + '\n';
		}
		if (get(this.propertyBag['Source']) == '') {
			this.validationMsg += getLocalText('NoAttr','Source',this.Type) + '\n';
		}
		if (get(this.propertyBag['Target']) == '') {
			this.validationMsg += getLocalText('NoAttr','Target',this.Type) + '\n';
		}
		break;
	case 'xslt':
		if (get(this.propertyBag['XSLURL']) == '') {
			this.validationMsg += getLocalText('NoAttr','XSLURL',this.Type) + '\n';
		}
		if (get(this.propertyBag['Source']) == '') {
			this.validationMsg += getLocalText('NoAttr','Source',this.Type) + '\n';
		}
		if (get(this.propertyBag['Target']) == '') {
			this.validationMsg += getLocalText('NoAttr','Target',this.Type) + '\n';
		}
		break;
	case 'xpath':
		if (get(this.propertyBag['Source']) == '') {
			this.validationMsg += getLocalText('NoAttr','Source',this.Type) + '\n';
		}
		if (get(this.propertyBag['Property']) == '') {
			this.validationMsg += getLocalText('NoAttr','Property',this.Type) + '\n';
		}
		if (get(this.propertyBag['Context']) == '') {
			this.validationMsg += getLocalText('NoAttr','Context',this.Type) + '\n';
		}
		if (get(this.propertyBag['Expression']) == '') {
			this.validationMsg += getLocalText('NoAttr','Expression',this.Type) + '\n';
		}
		break;
	case 'until':
		if (get(this.propertyBag['Condition']) == '') {
			this.validationMsg += getLocalText('NoAttr','Condition',this.Type) + '\n';
		}
		if (!this.validateChildren()) {
			this.validationMsg += getLocalText('ChildErrors','',this.Type) + '\n';
		}
		break;
	case 'while':
		if (get(this.propertyBag['Condition']) == '') {
			this.validationMsg += getLocalText('NoAttr','Condition',this.Type) + '\n';
		}
		if (!this.validateChildren()) {
			this.validationMsg += getLocalText('ChildErrors','',this.Type) + '\n';
		}
		break;
	case 'sequence':
		if (!this.validateChildren()) {
			this.validationMsg += getLocalText('ChildErrors','',this.Type) + '\n';
		}
		break;
	case 'throw':
		if (get(this.propertyBag['Fault']) == '') {
			this.validationMsg += getLocalText('NoAttr','Fault',this.Type) + '\n';
		}
		break;
	case 'catch':
		if (get(this.propertyBag['Fault']) == '') {
			this.validationMsg += getLocalText('NoAttr','Fault',this.Type) + '\n';
		}
		if (!this.validateChildren()) {
			this.validationMsg += getLocalText('ChildErrors','',this.Type) + '\n';
		}
		break;
	case 'catchall':
		if (!this.validateChildren()) {
			this.validationMsg += getLocalText('ChildErrors','',this.Type) + '\n';
		}
		break;
	case 'compensationhandler':
		if (!this.validateChildren()) {
			this.validationMsg += getLocalText('ChildErrors','',this.Type) + '\n';
		}
		break;
	case 'compensate':
		if (get(this.propertyBag['Target']) == '') {
			this.validationMsg += getLocalText('NoAttr','Target',this.Type) + '\n';
		}
		break;
	}

	return (this.validationMsg == '');
}

// Return tooltip text for shape
function BPLActivity_getToolTip()
{
	var tip = this.Name;

	switch (this.Type) {
	case 'assign':
		tip = getLocalText('TipAssign');
		tip += '\n' + get(this.propertyBag['Property']) + ' =';
		tip += '\n' + get(this.propertyBag['Value']);
		break;
	case 'sync':
		tip = getLocalText('TipSync');
		tip += '\n' + get(this.propertyBag['Calls']);
		tip += '\nTimeout: ' + get(this.propertyBag['Timeout']);
		break;
	case 'trace':
		tip = getLocalText('TipTrace');
		tip += '\n' + get(this.propertyBag['Value']);
		break;
	case 'milestone':
		tip = getLocalText('TipMilestone');
		tip += '\n' + get(this.propertyBag['Value']);
		break;
	case 'call':
		if (get(this.propertyBag['Async']) == '1') {
			tip = getLocalText('TipCallAsync');
		}
		else {
			tip = getLocalText('TipCallSync');
		}
		tip += '\n' + get(this.propertyBag['Target']);
		break;
	case 'foreach':
		tip = getLocalText('TipLoop');
		tip += '\nFor each: ' + get(this.propertyBag['Key']);
		tip += '\nIn: ' + get(this.propertyBag['Property']);
		break;
	case 'until':
		tip = getLocalText('TipLoop');
		tip += '\nUntil: ';
		tip += '\n' + get(this.propertyBag['Condition']);
		break;
	case 'while':
		tip = getLocalText('TipLoop');
		tip += '\nWhile: ';
		tip += '\n' + get(this.propertyBag['Condition']);
		break;
	case 'code':
		tip = getLocalText('TipCode');
		break;
	case 'sql':
		tip = getLocalText('TipSQL');
		break;
	case 'rule':
		tip = getLocalText('TipRule');
		if (this.propertyBag['Rule']) {
			tip += '\nRule: ' + get(this.propertyBag['Rule']);
		}
		if (this.propertyBag['ResultLocation']) {
			tip += '\nResultLocation: ' + get(this.propertyBag['ResultLocation']);
		}
		if (this.propertyBag['ReasonLocation']) {
			tip += '\nReasonLocation: ' + get(this.propertyBag['ReasonLocation']);
		}
		break;
	case 'delay':
		tip = getLocalText('TipDelay');
		if (this.propertyBag['Duration']) {
			tip += '\nDuration: ' + get(this.propertyBag['Duration']);
		}
		else {
			tip += '\nUntil: ' + get(this.propertyBag['Until']);
		}
		break;
	case 'empty':
		tip = getLocalText('TipEmpty');
		break;
	case 'break':
		tip = getLocalText('TipBreak');
		break;
	case 'continue':
		tip = getLocalText('TipContinue');
		break;
	case 'sequence':
		tip = getLocalText('TipSequence');
		break;
	case 'transform':
		tip = getLocalText('TipTransform');
		if (this.propertyBag['Class']) {
			tip += '\nClass: ' + get(this.propertyBag['Class']);
		}
		break;
	case 'xslt':
		tip = getLocalText('TipXSLT');
		break;
	case 'xpath':
		tip = getLocalText('TipXPATH');
		break;
	case 'throw':
	case 'catch':
	case 'catchall':
	case 'compensate':
		// !!!
		break;
	}

	return tip;
}

// ------------------------------------------------------------------
// DECISION
// make the actual shape, stick it in the wrapping group
function BPLDecision_BuildShape(group)
{
	var main = document.createElementNS(SVGNS,"polygon");

	// this is the "main" element for this shape
	main.setAttribute("id", "shape_main_" + this.index);

	// attributes
	main.setAttribute("points", "-100,0 0,-30 100,0 0,30 -100,0");

	this.normalStyle = "BPLShape";
	main.setAttribute("class",this.normalStyle);

	group.appendChild(main);

	// type label
	var text = document.createElementNS(SVGNS,"text");
	text.setAttribute("class","ActivityType");
	text.setAttribute("text-anchor", "middle");
	text.setAttribute("x", 0);
	text.setAttribute("y", -12);

	// create the text node and append it
	var textNode = document.createTextNode('<' + this.Type + '>');
	text.appendChild(textNode);

	group.appendChild(text);

	// text
	var text = document.createElementNS(SVGNS,"text");
	text.setAttribute("clip-path","url(#clipPath_decision)");
	text.setAttribute("class","ShapeName");
	text.setAttribute("id","shape_label_" + this.index);
	text.setAttribute("text-anchor", "middle");
	text.setAttribute("x", 0);
	text.setAttribute("y", 7);

	// create the text node and append it
	var textNode = document.createTextNode(this.Name);
	text.appendChild(textNode);

	group.appendChild(text);

	// input
	makeInputHandle(group,this,0,-30);

	// output
	makeOutputHandle(group,this,0,30);

	// additional output handle for branch
	if (this.Type == 'branch') {
		makeOutputHandle(group,this,-100,-5,true);
		this.gotoHandleX = -100;
		this.gotoHandleY = 0;
	}

	// annotation
	makeAnnotation(group,this,82,-8);

	return main;
}

// test if we can accept an input from shape
function BPLDecision_CanAcceptInput(shape)
{
	// only accept one input
	if (this.inputList.length > 0) {
		return false;
	}

	// test if we are already connected to shape
	for (var i = 0; i < this.inputList.length; i++) {
		if (this.inputList[i].fromShape == shape) {
			return false;
		}
	}

	return true;
}

// test if we can accept an output from shape
function BPLDecision_CanAcceptOutput(shape)
{
	// test if we are already connected to shape
	for (var i = 0; i < this.outputList.length; i++) {
		if (this.outputList[i].toShape == shape) {
			return false;
		}
	}

	// <if> can only have 2 connections
	if (this.Type == 'if') {
		if (this.outputList.length >= 2) {
			return false;
		}
	}
	// <branch> can only have 1 going connection
	// (the "goto" connection is a special case)
	else if (this.Type == 'branch') {
		if (this.outputList.length >= 1) {
			return false;
		}
	}
	return true;
}

// Get info on this shape (as a serialized string)
// used by the Studio Inspector
function BPLDecision_getInfo()
{
	var state = BPLShape_getInfo(this);

	return state;
}

// set the given property to value
function BPLDecision_setProperty(prop,value)
{
	var old = null;

	switch (prop) {
		case 'Label':
			if (this.Type == 'branch') {
				if (this.gotoConnection) {
					old = this.gotoConnection.toShape.Name;
				}

				if (old != value) {
					// remove the old connection
					if (this.gotoConnection) {
						this.gotoConnection.remove();
						this.gotoConnection = null;
					}

					// see if we can find the referenced label
					var label = findLabel(value);
					if (label == null) {
						alert(getLocalText('NoLabelFound',value));
					}
					else {
						// make a new connection
						this.addOutput(label,"true","goto");
					}
					setModified(true);
				}
				if (this._def && this._def.PropertyBag) {
					this._def.PropertyBag['Label'] = value;
				}
				this.propertyBag['Label'] = value;
				break;
			}
		default:
			old = BPLShape_setProperty(this,prop,value);
			break;
	}

	if (old) {
		undo_AddAction("set",this,prop,old);
	}
}

// Test if this shape is syntactically valid
function BPLDecision_isValid()
{
	this.validationMsg = '';

	if (this.inputList.length == 0) {
		this.validationMsg += getLocalText('NoInput') + '\n';
	}

	if (this.outputList.length == 0) {
		this.validationMsg += getLocalText('NoOutput') + '\n';
	}

	// test for connections to too many joins
	if (!isLoading && this.Type != 'branch') {
		var match = findMatchingShapes(this);
		var c = 0;
		for (var n in match) {
			c++;
		}
		if (c > 1) {
			// branches must terminate at same join
			this.validationMsg += getLocalText('BranchBadJoin', this.Type) + '\n';
		}
		else if (c == 0) {
			// branches must terminate at a join
			this.validationMsg += getLocalText('BranchNoJoin', this.Type) + '\n';
		}
	}

	// additional validation
	switch (this.Type) {
	case 'branch':
		if (get(this.propertyBag['Condition']) == '') {
			this.validationMsg += getLocalText('NoAttr','Condition',this.Type) + '\n';
		}

		if (this.gotoConnection == null) {
			this.validationMsg += getLocalText('NoAttr','Label',this.Type) + '\n';
		}
		else if (get(this.propertyBag['Label']) == '') {
			this.validationMsg += getLocalText('NoAttr','Label.Name',this.Type) + '\n';
		}
		break;

	case 'if':
		if (get(this.propertyBag['Condition']) == '') {
			this.validationMsg += getLocalText('NoAttr','Condition',this.Type) + '\n';
		}

		var trueCount = 0;
		var falseCount = 0;

		for (var n = 0; n < this.outputList.length; n++) {
			var connect = this.outputList[n];
			if (get(connect.Name) == 'true') {
				trueCount++;
			}
			else if (get(connect.Name) == 'false') {
				falseCount++;
			}
			else {
				// if branch must be either true or false
				this.validationMsg += getLocalText('BranchTORF',this.Type) + '\n';
			}
		}

		if (trueCount == 0) {
			// there has to be a true branch
			this.validationMsg += getLocalText('BranchTrueReq', this.Type) + '\n';
		}
		else if (trueCount > 1) {
			// there are more than one true branches
			this.validationMsg += getLocalText('BranchTrueExcess', this.Type) + '\n';
		}

		if (falseCount > 1) {
			// there are more than one false branches
			this.validationMsg += getLocalText('BranchFalseExcess', this.Type) + '\n';
		}

		break;

	case 'switch':
		// check the cases...
		var defcount = 0;
		var casecount = 0;

		for (var n = 0; n < this.outputList.length; n++) {
			var connect = this.outputList[n];
			if (get(connect.Condition) == '') {
				defcount++;
			}
			else {
				casecount++;
			}
		}

		if (casecount == 0) {
			// there must be a non-default case
			this.validationMsg += getLocalText('BranchCaseReq', this.Type) + '\n';
		}

		if (defcount > 1) {
			// there cannot be more than one default case
			this.validationMsg += getLocalText('BranchDefExcess', this.Type) + '\n';
		}
		break;
	}

	return (this.validationMsg == '');
}

// Return tooltip text for shape
function BPLDecision_getToolTip()
{
	var tip = this.Name;

	switch (this.Type) {
	case 'branch':
		tip = getLocalText('TipBranch');
		tip += '\n' + get(this.propertyBag['Condition']);
		break;
	case 'if':
		tip = getLocalText('TipIf');
		tip += '\n' + get(this.propertyBag['Condition']);
		break;
	case 'switch':
		tip = getLocalText('TipSwitch');
		break;
	}

	return tip;
}

// ------------------------------------------------------------------
// FLOW
// make the actual shape, stick it in the wrapping group
function BPLFlow_BuildShape(group)
{
	var main = document.createElementNS(SVGNS,"polygon");

	// this is the "main" element for this shape
	main.setAttribute("id", "shape_main_" + this.index);

	// attributes
	main.setAttribute("points", "0,-15 20,15 -20,15 0,-15");

	this.normalStyle = "BPLShape";
	main.setAttribute("class",this.normalStyle);

	group.appendChild(main);

	// input
	makeInputHandle(group,this,0,-15);

	// output
	makeOutputHandle(group,this,0,15);

	// annotation
	makeAnnotation(group,this,20,15);

	return main;
}

// test if we can accept an input from shape
function BPLFlow_CanAcceptInput(shape)
{
	// only accept one input
	if (this.inputList.length > 0) {
		return false;
	}

	// test if we are already connected to shape
	for (var i = 0; i < this.inputList.length; i++) {
		if (this.inputList[i].fromShape == shape) {
			return false;
		}
	}

	return true;
}

// test if we can accept an output from shape
function BPLFlow_CanAcceptOutput(shape)
{
	// test if we are already connected to shape
	for (var i = 0; i < this.outputList.length; i++) {
		if (this.outputList[i].toShape == shape) {
			return false;
		}
	}

	if (shape && (shape.Type == "join")) {
		// cannot directly link flow with join
		return false;
	}

	return true;
}

// Get info on this shape (as a serialized string)
// used by the Studio Inspector
function BPLFlow_getInfo()
{
	var state = BPLShape_getInfo(this);
	return state;
}


// set the given property to value
function BPLFlow_setProperty(prop,value)
{
	var old = null;

	switch (prop) {

	default:
		old = BPLShape_setProperty(this,prop,value);
		break;
	}

	if (old && !this.isCopy) {
		undo_AddAction("set",this,prop,old);
	}
}

// Test if this shape is syntactically valid
function BPLFlow_isValid()
{
	this.validationMsg = '';

	if (this.inputList.length == 0) {
		this.validationMsg += getLocalText('NoInput') + '\n';
	}

	if (this.outputList.length == 0) {
		this.validationMsg += getLocalText('NoOutput') + '\n';
	}

	// test for connections to too many joins
	if (!isLoading) {
		var match = findMatchingShapes(this);
		var c = 0;
		for (var n in match) {
			c++;
		}

		if (c > 1) {
			// branches must terminate at same join
			this.validationMsg += getLocalText('BranchBadJoin', this.Type) + '\n';
		}
		else if (c == 0) {
			// branches must terminate at a join
			this.validationMsg += getLocalText('BranchNoJoin', this.Type) + '\n';
		}

	}

	return (this.validationMsg == '');
}

// Return tooltip text for shape
function BPLFlow_getToolTip()
{
	var tip = getLocalText('TipFlow');
	return tip;
}

// ------------------------------------------------------------------
// SCOPE
// make the actual shape, stick it in the wrapping group
function BPLScope_BuildShape(group)
{
	var main = document.createElementNS(SVGNS,"path");

	// this is the "main" element for this shape
	main.setAttribute("id", "shape_main_" + this.index);

	// attributes
	main.setAttribute("d", "M -75 15 a 10 5.5 0 1 1 150 0 z");

	this.normalStyle = "BPLShape";
	main.setAttribute("class",this.normalStyle);

	group.appendChild(main);

	// type label
	var text = document.createElementNS(SVGNS,"text");
	text.setAttribute("class","ActivityType");
	text.setAttribute("text-anchor", "middle");
	text.setAttribute("x", 0);
	text.setAttribute("y", -12);

	ln = document.createElementNS(SVGNS,"line");
	ln.setAttribute("x1", -60);
	ln.setAttribute("y1", -8);
	ln.setAttribute("x2", 60);
	ln.setAttribute("y2", -8);
	ln.setAttribute("style","stroke: gray; stroke-width: 1;");
	group.appendChild(ln);

	// create the text node and append it
	var textNode = document.createTextNode('<' + this.Type + '>');
	text.appendChild(textNode);

	group.appendChild(text);

	// input
	makeInputHandle(group,this,0,-25);

	// output
	makeOutputHandle(group,this,0,15);

	// annotation
	makeAnnotation(group,this,75,15);

	return main;
}

// test if we can accept an input from shape
function BPLScope_CanAcceptInput(shape)
{
	// only accept one input
	if (this.inputList.length > 0) {
		return false;
	}

	// test if we are already connected to shape
	for (var i = 0; i < this.inputList.length; i++) {
		if (this.inputList[i].fromShape == shape) {
			return false;
		}
	}

	return true;
}

// test if we can accept an output from shape
function BPLScope_CanAcceptOutput(shape)
{
	// only accept one output
	if (this.outputList.length > 0) {
		return false;
	}

	// test if we are already connected to shape
	for (var i = 0; i < this.outputList.length; i++) {
		if (this.outputList[i].toShape == shape) {
			return false;
		}
	}

	if (shape && (shape.Type == "join")) {
		// cannot directly link flow with join
		return false;
	}

	return true;
}

// Get info on this shape (as a serialized string)
// used by the Studio Inspector
function BPLScope_getInfo()
{
	var state = BPLShape_getInfo(this);
	return state;
}


// set the given property to value
function BPLScope_setProperty(prop,value)
{
	var old = null;

	switch (prop) {

	default:
		old = BPLShape_setProperty(this,prop,value);
		break;
	}

	if (old && !this.isCopy) {
		undo_AddAction("set",this,prop,old);
	}
}

// Test if this shape is syntactically valid
function BPLScope_isValid()
{
	this.validationMsg = '';

	if (this.inputList.length == 0) {
		this.validationMsg += getLocalText('NoInput') + '\n';
	}

	if (this.outputList.length == 0) {
		this.validationMsg += getLocalText('NoOutput') + '\n';
	}

	// test for connections to too many joins
	if (!isLoading) {
		var match = findMatchingShapes(this);
		var c = 0;
		for (var n in match) {
			c++;
		}

		if (c > 1) {
			// branches must terminate at same join
			this.validationMsg += getLocalText('BranchBadJoin', this.Type) + '\n';
		}
		else if (c == 0) {
			// branches must terminate at a join
			this.validationMsg += getLocalText('BranchNoJoin', this.Type) + '\n';
		}

	}

	return (this.validationMsg == '');
}

// Return tooltip text for shape
function BPLScope_getToolTip()
{
	var tip = getLocalText('TipScope');
	return tip;
}

// ------------------------------------------------------------------
// JOIN
// make the actual shape, stick it in the wrapping group
function BPLJoin_BuildShape(group)
{
	var main = document.createElementNS(SVGNS,"polygon");

	// this is the "main" element for this shape
	main.setAttribute("id", "shape_main_" + this.index);

	// attributes
	main.setAttribute("points", "-20,-15 20,-15 0,15 -20,-15");

	this.normalStyle = "BPLShape";
	main.setAttribute("class",this.normalStyle);

	group.appendChild(main);

	// input
	makeInputHandle(group,this,0,-15);

	// output
	makeOutputHandle(group,this,0,15);

	// annotation
	makeAnnotation(group,this,20,-15);

	return main;
}

// test if we can accept an input from shape
function BPLJoin_CanAcceptInput(shape)
{
	// test if we are already connected to shape
	for (var i = 0; i < this.inputList.length; i++) {
		if (this.inputList[i].fromShape == shape) {
			return false;
		}
	}

	if (shape && (shape.Type == "flow")) {
		// cannot directly link flow with join
		return false;
	}

	return true;
}

// test if we can accept an output from shape
function BPLJoin_CanAcceptOutput(shape)
{
	// only accept one output
	if (this.outputList.length > 0) {
		return false;
	}

	// test if we are already connected to shape
	for (var i = 0; i < this.outputList.length; i++) {
		if (this.outputList[i].toShape == shape) {
			return false;
		}
	}

	return true;
}

// Get info on this shape (as a serialized string)
// used by the Studio Inspector
function BPLJoin_getInfo()
{
	// don't use defaults
	var state = '';
	state += 'Activity'+insDelim2+'STRING'+ insDelim2 + this.Type + insDelim1;
	state += 'xPos'+insDelim2+'INTEGER' + insDelim2 + this.xPos + insDelim1;
	state += 'yPos'+insDelim2+'INTEGER' + insDelim2 + this.yPos + insDelim1;

	return state;
}

// set the given property to value
function BPLJoin_setProperty(prop,value)
{
	var old = null;

	switch (prop) {

	default:
		old = BPLShape_setProperty(this,prop,value);
		break;
	}

	if (old && !this.isCopy) {
		undo_AddAction("set",this,prop,old);
	}
}

// Test if this shape is syntactically valid
function BPLJoin_isValid()
{
	this.validationMsg = '';

	if (this.inputList.length == 0) {
		this.validationMsg += getLocalText('NoInput') + '\n';
	}

	if (this.outputList.length == 0) {
		this.validationMsg += getLocalText('NoOutput') + '\n';
	}

	return (this.validationMsg == '');
}

// Return tooltip text for shape
function BPLJoin_getToolTip()
{
	var tip = getLocalText('TipFlow');
	return tip;
}

// -----------------------------------------------------------------------
