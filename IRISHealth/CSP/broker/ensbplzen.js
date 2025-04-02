/*
	ensbplzen.js
	Ensemble BPL Editor client-side code.
	Copyright (c) 2003-2013, InterSystems Corp.	ALL RIGHTS RESERVED.
		Local JS namespace: BPL
*/

/*
Contains definitions for the following items:
	Shape
		Event:		start, end, reply, receive, alert, label
		Decision:	if, branch, switch
		Flow:		flow
		Scope:		scope
		Join:		join
		Activity:	assign, break, call, catch, catchall, code, compensate, compensationhandler, continue, delay, empty, 
					foreach, milestone, rule, sequence, sql, sync, throw, trace, transform, until, while, xpath, xslt
	Connector:		connector, thread, branch
		GoToConnector:	goto
*/
if (!window.BPL) window.BPL = {};

/// Extension to allow "sub-classing" of existing definitions. The below approach
/// does rely on instantiating the parent object, which adds extra overhead, but this
/// gets the inheritance working. Also note that inheritFrom() must be called *before*
/// any other modifications to a function's prototype because it overwrites the existing prototype.
Function.prototype.inheritFrom = function inheritFrom(parent)
{
	this.prototype = new parent();
	this.prototype.constructor = this;
	this.prototype._super = new parent();
	this._super = parent;
}

/// Ensure that we have indexOf() available for all Arrays.
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function Array_indexOf(searchElement,fromIndex) {
		var index = -1;
		if (!fromIndex) fromIndex = 0;
		for (var i = fromIndex; i < this.length; i++) {
			if (this[i] === searchElement) {
				index = i;
				break;
			}
		}
		return index;
	}
}

/// A helper function to indicate whether an array contains the specified element.
Array.prototype.contains = function Array_contains(searchElement) {
	return this.indexOf(searchElement) != -1;
}

/// BPL Constants
BPL.Constant = {};
BPL.Constant.icons = {};
BPL.Constant.icons.assign = 'M 100,2 L 110,2 M 100,6 L 110,6';
BPL.Constant.icons.call_Async = 'M 112,-4 L 112,16 M 114,-4 L 114,16 M 94,0 L 112,0 M 108,-2 L 112,0 108,2';
BPL.Constant.icons.call_Sync = 'M 112,-4 L 112,16 M 114,-4 L 114,16 M 94,0 L 112,0 M 108,-2 L 112,0 108,2 M 94,10 L 112,10 M 98,8 L 94,10 98,12';
BPL.Constant.icons.catchall = 'M 92,3 L 100,15 108,3 z';
BPL.Constant.icons.code = 'M 102,-2 L 108,-2 112,2 112,12 102,12 z M 108,-2 L 108,2 112,2 M 104,4 L 110,4 M 104,6 L 110,6 M 104,8 L 110,8';
BPL.Constant.icons.milestone = 'M 100,18 L 115,7 100,-4 85,7 z';
BPL.Constant.icons.loopGroup = 'M -4 16 A 4 4 0 1 1 0 20 L -2 20 M -3 20 l 4 -4 M -3 19 l 4 4';
BPL.Constant.icons.sync = 'M 112,-4 L 112,16 M 114,-4 L 114,16 M 94,10 L 112,10 M 98,8 L 94,10 98,12';
BPL.Constant.icons.trace = 'M 100,14 L 116,14 M 100,0 L 108,10 111.5,12 110,8 102,-2 z M 102,2 L 104,0 M 108,10 L 110,8';
BPL.Constant.initialX = 200;
BPL.Constant.initialY = 150;
BPL.Constant.maxLevels = 6;
BPL.Constant.moveThreshold = 16;
BPL.Constant.shape = {};
BPL.Constant.shape.height = 50;
BPL.Constant.shape.width = 240;
BPL.Constant.shape.xSpace = BPL.Constant.shape.width + 30;
BPL.Constant.shape.ySpace = BPL.Constant.shape.height + 50;
BPL.Constant.SVGNS = 'http://www.w3.org/2000/svg';

/// BPL Options
BPL.Options = {};
BPL.Options.autoArrange = false;
BPL.Options.currentZoom = 100;
BPL.Options.gridlineSpacing = 25;
BPL.Options.gridlineStyle = 'light';
BPL.Options.mouseScale = 100;
BPL.Options.smartConnect = true;
BPL.Options.showAnnotations = true;

/// Update the showAnnotations option and show/hide shape annotations.
BPL.Options.toggleAnnotations = function BPL_Options_toggleAnnotations(show)
{
	BPL.Options.showAnnotations = !!show;
	BPL.currentDiagram.updateAnnotations();
}

/// The Undo functionality simply wraps the logic in the main Zen page.
BPL.Undo = {};
BPL.Undo.startUndo = function BPL_Undo_startUndo()
{
	if (zenPage && zenPage.startUndoAction) zenPage.startUndoAction();
}
BPL.Undo.endUndo = function BPL_Undo_endUndo()
{
	if (zenPage && zenPage.endUndoAction) zenPage.endUndoAction();
}

/// Draw the gridlines for the diagram.
BPL.createGridLines = function BPL_createGridLines()
{
	var csvg = document.getElementById('canvasSVG');
	var width = csvg.getAttribute('width');
	var height = csvg.getAttribute('height');

	var g = document.getElementById('gridlines');
	if (g) {
		while(null != g.firstChild) {
			g.removeChild(g.firstChild);
		}
		var spacing = BPL.Options.gridlineSpacing;
		if ((spacing <= 0) || (BPL.Options.gridlineStyle == 'none')) {
			return;
		}
		var rows = Math.floor(height / spacing);
		var cols = Math.floor(width / spacing);

		var style = '';
		switch (BPL.Options.gridlineStyle) {
		case 'light':
			style = 'stroke-width: 0.3px;';
			break;
		case 'medium':
			style = 'stroke-width: 0.9px;';
			break;
		case 'dark':
			style = 'stroke-width: 1.8px;';
			break;
		}

		var lineAttribs = { "class": "GridLine", "style": style, "x1": "0%", "x2": "100%" };
		var yPos;
		for (var r = 0; r < rows; r++) {
			yPos = (r+1)*spacing;
			lineAttribs.y1 = yPos;
			lineAttribs.y2 = yPos;
			BPL.drawSVGElement(g,'line',lineAttribs);
		}
		lineAttribs.y1 = '0%';
		lineAttribs.y2 = '100%';
		var xPos;
		for (var c = 0; c < cols; c++) {
			xPos = (c+1)*spacing;
			lineAttribs.x1 = xPos;
			lineAttribs.x2 = xPos;
			BPL.drawSVGElement(g,'line',lineAttribs);
		}
	}
}

/// Reference to the currently active diagram.
BPL.currentDiagram = null;

/// Helper function to create the XML for an SVG element.
/// 	parentNode is a reference to the parent node in the SVG DOM. (Not needed if noAdd is true.)
/// 	elType is the tag name of the element.
/// 	attribs is an object containing names and values for attributes.
/// 	listeners is an object containing event names and the associated handler functions.
/// 	noAdd indicates that the element should not be added to the DOM.
BPL.drawSVGElement = function BPL_drawSVGElement(parentNode,elType,attribs,listeners,noAdd)
{
	if ((!parentNode) && (!noAdd)) return null;

	var shape = null;
	try {
		shape = document.createElementNS(BPL.Constant.SVGNS,elType);
		for (var prop in attribs) {
			var val = attribs[prop];
			if (val != null) shape.setAttribute(prop,val);
		}
		for (var evtName in listeners) {
			var func = listeners[evtName];
			if (func != null) shape.addEventListener(evtName,func,false);
		}

		if (!noAdd) parentNode.appendChild(shape);
	}
	catch (ex) {
		debugger;
		throw ex;
	}
	return shape;
}

/// General event handling.
BPL.events = {};

/// Update the mouse location whenever a user clicks on the SVG canvas.
BPL.events.canvasMouseDown = function BPL_events_canvasMouseDown(evt)
{
	if (BPL.currentDiagram.currentOperation == null) BPL.currentDiagram.setCreateLocation(evt);
}

/// Implement move and connect updates while the user is moving the mouse.
BPL.events.canvasMouseMove = function BPL_events_canvasMouseMove(evt)
{
	if (!(BPL.currentDiagram)) return
	switch (BPL.currentDiagram.currentOperation) {
		case 'move':
			if (BPL.currentDiagram.moveShape) {
				// update position of selected shapes
				var dx = ((evt.clientX * (BPL.Options.mouseScale/BPL.Options.currentZoom)) + BPL.mouseHandling.delta.x) - BPL.currentDiagram.moveShape._move.x;
				var dy = ((evt.clientY * (BPL.Options.mouseScale/BPL.Options.currentZoom)) + BPL.mouseHandling.delta.y) - BPL.currentDiagram.moveShape._move.y;

				for (var i = 0; i < BPL.currentDiagram.selectedItems.length; i++) {
					var item = BPL.currentDiagram.selectedItems[i];
					if (item.moveTo) {
						var itemX = item._move ? item._move.x : item.model.xPos;
						var itemY = item._move ? item._move.y : item.model.yPos;
						item.moveTo(itemX + dx, itemY + dy, false);
					}
				}
			}
			break;
		case 'connect':
			if (BPL.rubberBand.svg) {
				// move edge of RubberBand
				var coord = document.getElementById('canvasSVG');
				var xoff = parseFloat(coord.getAttribute('x'));
				var yoff = parseFloat(coord.getAttribute('y'));

				BPL.rubberBand.move((evt.clientX * (BPL.Options.mouseScale/BPL.Options.currentZoom)) - xoff, (evt.clientY * (BPL.Options.mouseScale/BPL.Options.currentZoom)) - yoff);
			}
			break;
	}
}

/// Implement highlighting when attempting connections. 
BPL.events.canvasMouseOver = function BPL_events_canvasMouseOver(evt)
{
	if (!BPL.currentDiagram) return;
	if (BPL.currentDiagram.currentOperation == 'connect') {
		// test if we *really* left a shape or if this is a fake event
		if ((evt.clientX != BPL.mouseHandling.lastOut.x) || (evt.clientY != BPL.mouseHandling.lastOut.y)) {
			// real event: reset target shape
			var old = BPL.currentDiagram.currentTarget;
			BPL.currentDiagram.currentTarget = null;
			if (old) old.updateStyle();
		}
	}
}

/// Ensure that all operations complete OR that nothing is selected after a mouseup event over the canvas.
BPL.events.canvasMouseUp = function BPL_events_canvasMouseUp(evt)
{
	if (evt.button != 0) return; // we only care about primary button
	if (zenPage && zenPage._textMonitor) zenPage._textMonitor.processing = false;

	switch (BPL.currentDiagram.currentOperation) {
		case 'move':
			BPL.currentDiagram.moveComplete();
			break;
		case 'connect':	// end the connect operation
			BPL.rubberBand.end();
			BPL.currentDiagram.setOperation(null);
			break;
		case 'select':
			BPL.currentDiagram.setOperation(null);
			break;
		default:	// unselect everything
			BPL.currentDiagram.selectItem(null, evt.ctrlKey);
			break;
	}
}

/// Handle a click on the main label.
BPL.events.labelClick = function BPL_events_labelClick(evt)
{
	var el = evt.target;
	evt.stopPropagation();

	BPL.currentDiagram.shiftUp(0);
}

/// Handle a click on a level label.
BPL.events.levelClick = function BPL_events_levelClick(evt)
{
	var el = evt.target;
	evt.stopPropagation();

	// find level #
	var s = el.getAttribute('id').split('_');
	var lvl = parseInt(s[1],10);
	if (isNaN(lvl)) lvl = 0;
	BPL.currentDiagram.shiftUp(lvl);
}

/// Helper method to generate a path between two points.
BPL.getMultiPointPath = function BPL_getMultiPointPath(startX,startY,endX,endY)
{
	var xPoints = [];
	var yPoints = [];
	var path = '';
	var yseg = 16; // length of minimum segment from end point
	var xseg = 60;
	var dx = (startX > endX) ? (startX-endX) : (endX-startX);
	var dy = (startY > endY) ? (startY-endY) : (endY-startY);

	if (startY < endY) {
		// output above input
		if ((dx < xseg) && (dy < yseg)) {
			yseg = yseg * (dx / xseg);
		}
		xPoints = [ startX, startX, endX, endX ];
		yPoints = [ startY, startY+yseg, endY-yseg, endY ];
	}
	else {
		if (dx < xseg) yseg = yseg * (dx / xseg);

		// input above output
		if (dx < xseg && dy > 50) {
			// special case if line is almost vertical
			xPoints = [ startX, startX, startX-150, startX-150, endX, endX ];
			yPoints = [ startY, startY+yseg+25, startY+yseg+25, endY-yseg-25, endY-yseg-25, endY ];
		}
		else if (startX < endX) {
			if (dx < xseg*3) xseg = dx / 3;

			xPoints = [ startX, startX, startX+xseg, endX-xseg, endX, endX];
			yPoints = [ startY, startY+yseg, startY+yseg, endY-yseg, endY-yseg, endY ];
		}
		else {
			if (dx < xseg*3) xseg = dx / 3;

			xPoints = [ startX, startX, startX-xseg, endX+xseg, endX, endX ];
			yPoints = [ startY, startY+yseg, startY+yseg, endY-yseg, endY-yseg, endY ];
		}
	}

	if (endX <= startX) { // draw line in other direction
		xPoints.reverse();
		yPoints.reverse();
	}

	path = 'M' + xPoints[0] + ' ' + yPoints[0] + ' L ';

	for (var pt = 1; pt < xPoints.length; pt++) {
		path += xPoints[pt] + ' ' + yPoints[pt] + ' ';
	}
	return path;
}

/// Variables for tracking mouse movements.
BPL.mouseHandling = {};
/// Last mouseout location when hovering over a shape.
BPL.mouseHandling.lastOut = { "x": 0, "y": 0 };
/// Difference between current and initial position during moves and connects.
BPL.mouseHandling.delta = { "x": 0, "y": 0 };
/// Record start position.
BPL.mouseHandling.start = { "x": 0, "y": 0 };

/// Notify the zenPage of events, primarily for Studio mode.
BPL.raiseEvent = function BPL_raiseEvent(type)
{
	if (zenPage && zenPage.raiseEvent) zenPage.raiseEvent(type);
}

/// Flag to indicate the BPL is read only.
BPL.readOnly = false;

/// Rubber band for connecting shapes.
/// x/y indicate the position of the band, and svg refers to the svg element.
BPL.rubberBand = { "x": 0, "y": 0, "svg": null, "type": "" };

/// Stop displaying the current rubber band.
BPL.rubberBand.end = function BPL_rubberBand_end()
{
	if (BPL.rubberBand.svg) {
		// delete the rubber band
		var canvas = document.getElementById('canvas');
		canvas.removeChild(BPL.rubberBand.svg);
		BPL.rubberBand.svg = null;
		var old = null;
		var oldTarget = BPL.currentDiagram.currentTarget;
		var updateBB = true;

		// see if we need to connect
		if (BPL.rubberBand.type == 'output') {
			old = BPL.currentDiagram.startShape;
			if (BPL.currentDiagram.startShape && BPL.currentDiagram.currentTarget) {
				BPL.currentDiagram.startShape.addOutput(BPL.currentDiagram.currentTarget,'',BPL.currentDiagram.startShape.outputType);
			}
			if (BPL.Options.autoArrange) {
				BPL.currentDiagram.arrangeShapes();
				updateBB = false;
			}
		}
		else if (BPL.rubberBand.type == 'goto') {
			old = BPL.currentDiagram.startShape;
			if (BPL.currentDiagram.startShape && BPL.currentDiagram.currentTarget) {
				// add goto connector
				BPL.currentDiagram.startShape.addOutput(BPL.currentDiagram.currentTarget,'','goto');
			}
		}
		else {
			old = BPL.currentDiagram.endShape;
			if (BPL.currentDiagram.endShape && BPL.currentDiagram.currentTarget) {
				BPL.currentDiagram.currentTarget.addOutput(BPL.currentDiagram.endShape,'',BPL.currentDiagram.currentTarget.outputType);
			}
			if (BPL.Options.autoArrange) {
				BPL.currentDiagram.arrangeShapes();
				updateBB = false;
			}
		}
		if (updateBB) BPL.currentDiagram.updateBoundingBoxes();

		// reset
		BPL.currentDiagram.startShape = null;
		BPL.currentDiagram.endShape = null;
		BPL.currentDiagram.currentTarget = null;

		if (old) old.updateStyle();
		if (oldTarget) oldTarget.updateStyle();
	}
}

/// Move the rubber band to end at a specified location.
BPL.rubberBand.move = function BPL_rubberBand_move(x,y)
{
	if (BPL.rubberBand.svg) {
		var path = '';
		if ((BPL.rubberBand.type == 'output') || (BPL.rubberBand.type == 'goto')) {
			path = BPL.getMultiPointPath(BPL.rubberBand.x,BPL.rubberBand.y,x,y);
		}
		else { // draw line the other way
			path = BPL.getMultiPointPath(x,y,BPL.rubberBand.x,BPL.rubberBand.y);
		}
		if (path != '') BPL.rubberBand.svg.setAttribute('d',path);
	}
}

/// Start a rubber band.
BPL.rubberBand.start = function BPL_rubberBand_start(evt, type)
{
	if (BPL.rubberBand.svg) { // delete the rubber band (this could happen due to bogus SVG events)
		var canvas = document.getElementById('canvas');
		canvas.removeChild(BPL.rubberBand.svg);
		BPL.rubberBand.svg = null;
	}

	var coord = document.getElementById('canvasSVG');
	var xOffset = parseFloat(coord.getAttribute('x'));
	var yOffset = parseFloat(coord.getAttribute('y'));

	var x = (evt.clientX * (BPL.Options.mouseScale/BPL.Options.currentZoom)) - xOffset;
	var y = (evt.clientY * (BPL.Options.mouseScale/BPL.Options.currentZoom)) - yOffset;

	// remember start of line
	BPL.rubberBand.x = x;
	BPL.rubberBand.y = y;
	BPL.rubberBand.type = type;

	var bandAttribs = { "class": "RubberBand", "d": BPL.getMultiPointPath(x,y,x,y) };
	var canvas = document.getElementById('canvas');
	BPL.rubberBand.svg = BPL.drawSVGElement(canvas,'path',bandAttribs);
}

/// Helper function to replace the text in a text node.
/// id is the id of the target node; str is the new text;
/// wordwrap is a flag to indicate whether the text should be wrapped;
BPL.setTextNode = function BPL_setTextNode(id,str,wordwrap)
{
	var text = document.getElementById(id);
	if (!text) return;

	str = str.toString();
	str = str.replace(/\r*/,'');
	var numRows = 0;
	var textWid = 0;
	var textNode;

	if (!wordwrap) {
		// show first line only
		// create next text node and replace the current one
		var oldNode = text.firstChild;
		text.removeChild(oldNode);

		var txt = '';
		if (str) {
			var t = str.split('\n');
			txt = t[0];
		}

		textNode = document.createTextNode(txt);
		text.appendChild(textNode);

		if (txt != '') {
			numRows = 1;
			textWid = text.getComputedTextLength();
		}
	}
	else { // wrapping requested
		// create a new text node
		var oldText = text;
		var parent = oldText.parentNode;
		var x = oldText.getAttribute('x');
		var y = oldText.getAttribute('y');
		var cls = oldText.getAttribute('class');

		var textAttribs = { "id": oldText.getAttribute('id'), "class": cls, "x": x, "y": y };
		parent.removeChild(oldText);
		BPL.drawSVGElement(parent,'text',textAttribs);

		// append text to DOM before trying to calculate any geometry
		parent.appendChild(text);

		// apply wordwrap to text
		var display = BPL.wordwrapText(str,50);

		// create a set of tspans
		var maxRows = 3;
		var lastW = 0;
		var t = display.split('\n');
		for (var i = 0; (i < t.length) && (i <= maxRows); i++) {
			numRows++;
			var spanAttribs = { "class": cls, "x": x, "dy": (i == 0) ? "0" : "1.1em" };
			var span = BPL.drawSVGElement(text,'tspan',spanAttribs);

			textNode = document.createTextNode(i < maxRows ? t[i] : '...');
			span.appendChild(textNode);

			if (t[i] != '') {
				var lw = 0;
				var tw = text.getComputedTextLength();
				var lw = tw - lastW;  // undo accumulation
				lastW = tw;

				textWid = (lw > textWid) ? lw : textWid;
			}
		}
	}
}

/// Wrap the input text to the number of characters in size.
BPL.wordwrapText = function BPL_wordwrapText(input,size)
{
	if (typeof input != 'undefined') input = input.toString();
	if ((input === '') || (!input) || (input.length < size)) return input;

	var output = '';
	var len = 0;
	var lines = input.split('\n');
	for (var ln = 0; ln < lines.length; ln++) {
		len = 0;
		var words = lines[ln].split(' ');
		for (var w = 0; w < words.length; w++) {
			if ((words[w].length + len) > size) {
				output += words[w] + '\n';
				len = 0;
			}
			else {
				output += words[w] + ' ';
				len += words[w].length + 1;
			}
		}
		if (ln < (lines.length - 1)) output += '\n';
	}
	var lastChar = output.charAt(output.length-1);
	while ((lastChar == '\n') || (lastChar == ' ')) {
		output = output.substring(0,output.length-1);
		lastChar = output.charAt(output.length-1);
	}
	return output;
}

/// Functions relating to input handles.
BPL.inputHandle = {};

/// Indicate whether the current handle can accept input during a connect.
BPL.inputHandle.mouseover = function BPL_inputHandle_mouseover(evt)
{
	var el = evt.target;
	evt.stopPropagation();

	var shape = el.parentNode._shape;
	if (shape && (BPL.currentDiagram.currentOperation == 'connect')) shape.testConnection();
}

/// Update the BPL.mouseHandling.lastOut coordinates.
BPL.inputHandle.mouseout = function BPL_inputHandle_mouseout(evt)
{
	var el = evt.target;
	evt.stopPropagation();
	// remember position of this event
	BPL.mouseHandling.lastOut.x = evt.clientX;
	BPL.mouseHandling.lastOut.y = evt.clientY;
}

/// If possible, start a rubber band from an input handle.
BPL.inputHandle.mousedown = function BPL_inputHandle_mousedown(evt)
{
	var el = evt.target;
	evt.stopPropagation();

	BPL.currentDiagram.setCreateLocation(evt);
	if (evt.button != 0) return;
	if (BPL.readOnly) return; // no connections for read only mode

	var shape = el.parentNode._shape;
	// test if we can accept another input
	if (!shape.canAcceptInput(null)) {
		alert(BPL.getLocalText('EDNoMoreIn'));
		BPL.currentDiagram.setOperation(null);
		return;
	}

	// start a RubberBand in this shape in order to connect
	BPL.currentDiagram.setOperation('connect');
	// set the start and end shapes for the connection
	BPL.currentDiagram.endShape = shape;
	BPL.currentDiagram.startShape = null;
	shape.updateStyle();

	BPL.rubberBand.start(evt,'input');
}

/// Functions relating to input handles.
BPL.outputHandle = {};

/// Mouseover and mouseout functionality is the same as for input handles.
BPL.outputHandle.mouseover = BPL.inputHandle.mouseover;
BPL.outputHandle.mouseout = BPL.inputHandle.mouseout;

/// If possible, start a rubber band from the current output handle.
BPL.outputHandle.mousedown = function BPL_outputHandle_mousedown(evt,isGoTo)
{
	var el = evt.target;
	evt.stopPropagation();

	BPL.currentDiagram.setCreateLocation(evt);
	if (evt.button != 0) return;
	if (BPL.readOnly) return; // no connections for read only mode

	var shape = el.parentNode._shape;
	// test if we can accept another output
	if (isGoTo) {
		if (shape.gotoConnection) {
			alert(BPL.getLocalText('EDNoMoreOut'));
			BPL.currentDiagram.setOperation(null);
			return;
		}
	}
	else {
		if (!shape.canAcceptOutput(null)) {
			alert(BPL.getLocalText('EDNoMoreOut'));
			BPL.currentDiagram.setOperation(null);
			return;
		}
	}
	// start a RubberBand in this shape in order to connect
	BPL.currentDiagram.setOperation('connect');
	// set the start/end shape for the connection
	BPL.currentDiagram.endShape = null;
	BPL.currentDiagram.startShape = shape;
	shape.updateStyle();
	BPL.rubberBand.start(evt, isGoTo ? 'goto' : 'output');
}

/// Special handler for goto handles to call the main mousedown handler with the isGoTo flag.
BPL.outputHandle.mousedown_goto = function BPL_outputHandle_mousedown_goto(evt)
{
	BPL.outputHandle.mousedown(evt,true);
}

/////////////////////////////
//   Diagram Definitions   //
/////////////////////////////

/// Diagram constructor.
BPL.Diagram = function BPL_Diagram()
{
	// helper for maintaining a tree of parents/children.
	this.childIndex = {};
	// clipboard for copied shapes/connectors
	this.clipboard = [];
	// list of all connectors
	this.connectors = [];
	// location where new shapes should be created
	this.createLocation = { "x": BPL.Constant.initialX, "y": BPL.Constant.initialY };
	// current "operation"; valid values are listed in BPL.Diagram.validOperations
	this.currentOperation = null;
	// index of current parent shape; null means top level of diagram.
	this.currentParent = null;
	// reference to current target shape for operations
	this.currentTarget = null;
	// end shape for a "connect" operation
	this.endShape = null;
	// name-based index of shapes to allow for rapid matching
	this.index = { "branch": {}, "call": {}, "label": {} };
	// flag to indicate load state
	this.isLoading = true;
	// array to record information when drilling in and out of the diagram
	this.levels = [ null ];
	// object to record related shapes when a specific shape is selected
	this.matchShapes = null;
	// reference to model
	this.model = null;
	// list of shapes to move during a move operation
	this.moveList = [];
	// single shape to base x/y manipulation off during a move
	this.moveShape = null;
	// counter for naming new milestones
	this.milestoneCounter = 0;
	// list of selected items
	this.selectedItems = [];
	// list of shapes in the diagram. Note that the index values from the model's Index 
	// in the main BPL model are used, so this may not be tightly packed.
	this.shapeList = [];
	// start shape for a "connect" operation
	this.startShape = null;
	// root SVG element
	this.svgRoot = null;
}

/// Create a new BPL Diagram using a model from the server.
BPL.Diagram.create = function BPL_Diagram_create(model)
{
	var diagram = new BPL.Diagram();
	var canvas = document.getElementById('canvas');
	var svgRootAttribs = { "svgRoot": true};  
	diagram.svgRoot = BPL.drawSVGElement(canvas,'g',svgRootAttribs);
	diagram.model = model;
	// clear previous diagram if present
	if (BPL.currentDiagram && BPL.currentDiagram.svgRoot && BPL.currentDiagram.svgRoot.parentNode) BPL.currentDiagram.svgRoot.parentNode.removeChild(BPL.currentDiagram.svgRoot);
	BPL.currentDiagram = diagram;
	var smartConnect = BPL.Options.smartConnect;
	BPL.Options.smartConnect = false;
	for (var i = 0; i < model.ShapeList.length; i++) {
		var shapeModel = model.ShapeList[i];
		var shape = null;
		if (shapeModel) shape = BPL.Shape.createShape(shapeModel);
	}
	// children are delayed as children may have lower index than parent.
	for (var shapeIndex in diagram.childIndex) {
		if (diagram.shapeList[shapeIndex]) {
			diagram.shapeList[shapeIndex].children = diagram.childIndex[shapeIndex];
		}
	}
	diagram.childIndex = {};
	if (model.Connectors) {
		var invalidConns = [];
		for (var i = 0; i < model.Connectors.length; i++) {
			var connModel = model.Connectors[i];
			if (connModel) {
				var validConn = true;
				if (connModel._validate) {
					var fromShape = diagram.shapeList[connModel.FromShape];
					var toShape = diagram.shapeList[connModel.ToShape];
					if ((!fromShape) || (!toShape)) {
						validConn = false;
					}
					else if (connModel.ConnectType == 'goto') {
						if (fromShape.gotoConnection || (toShape.model.Type != 'label')) validConn = false;
					}
					else {
						if ((!toShape.canAcceptInput(fromShape)) || (!fromShape.canAcceptOutput(toShape))) validConn = false;
					}
					delete connModel._validate;
				}
				if (validConn) {
					diagram.connectors.push(BPL.Connector.createConnector(connModel));
				}
				else {
					invalidConns.push(connModel);
				}
			}
		}
		for (var i = 0; i < invalidConns.length; i++) {
			var currConn = invalidConns[i];
			var currIndex = model.Connectors.indexOf(currConn);
			if (currIndex != -1) model.Connectors.splice(currIndex,1);
		}
	}
	BPL.Options.smartConnect = smartConnect;
	diagram.isLoading = false;
	return diagram;
}

/// List of valid operations.
BPL.Diagram.validOperations = [null,'connect','select','move'];

/// Helper method to make sure all referential items are updated when a shape is added.
BPL.Diagram.prototype.addShape = function BPL_Diagram_addShape(shape,index)
{
	if (shape) {
		this.shapeList[shape.model.Index] = shape;
		if (shape.model.ParentShape != null) {
			var parentShape = this.shapeList[shape.model.ParentShape];
			if (parentShape && parentShape.children && !parentShape.children.contains(shape)) parentShape.children.push(shape);
		}
		if (['branch','call','label'].contains(shape.model.Type)) {
			var name = (shape.model.Type == 'branch') ? shape.model.Index : shape.model.Name;
			if (name != '') this.index[shape.model.Type][name] = shape;
			if (shape.model.Type == 'label') { // create connnection for previously created branch
				for (var branchRef in this.index.branch) {
					var branchShape = this.index.branch[branchRef];
					if (branchShape && (branchShape.model.PropertyBag.Label == shape.model.Name)) {
						if (branchShape.gotoConnection && !(branchShape.gotoConnection.toShape === shape)) {
							branchShape.gotoConnection.remove();
							branchShape.addOutput(shape,'','goto');
						}
						else if (!branchShape.gotoConnection) {
							branchShape.addOutput(shape,'','goto');
						}
					}
				}
			}
		}
	}
	else if (index) {
		this.shapeList[index] = shape;
	}
}

/// Arrange the shapes in the current diagram where the parent shape has index parentIndex.
BPL.Diagram.prototype.arrangeShapes = function BPL_Diagram_arrangeShapes(parentIndex)
{
	if (BPL.readOnly) return;
	if (BPL.currentDiagram && BPL.currentDiagram.isLoading) return;
	BPL.Undo.startUndo();
	try {
		if (parentIndex == null) parentIndex = this.currentParent;
		// sort shapes by connection
		// first, group all shapes by how they are connected
		var groupNone = [];
		var groupOut = [];
		var shape;
		var selectedShape  = this.selectedItems[0];

		var list = this.shapeList;
		// use the current parent's children list if possible
		if ((parentIndex != null) && this.shapeList[parentIndex] && this.shapeList[parentIndex].children) list = this.shapeList[parentIndex].children;
		for (var i = 0; i < list.length; i++) {
			shape = list[i];
			// only consider shapes in current group
			var count = 0;
			if (shape && (shape.model.ParentShape == parentIndex)) {
				// test for connections
				if ((shape.inputList.length == 0) && (shape.outputList.length == 0)) {
					groupNone.push(shape);
				}
				else if ((shape.inputList.length == 0) && (shape.outputList.length > 0)) {
					groupOut.push(shape);
				}

				// if shape has multiple outputs, sort by # of items in each branch
				if (shape.outputList.length > 1) {
					count++;
					// get depth of each branch
					var depthArray = [];
					var widthArray = [];
					this.arrangeThread(0,0,shape,depthArray,widthArray,false);

					for (var n = 0; n < shape.outputList.length; n++) {
						shape.outputList[n].depth = depthArray[n];
					}
					// sort the outputs by position
					shape.outputList.sort(function(a,b) { return a.depth - b.depth; });
				}
			}
		}

		// put all unconnected shapes to the side
		var y = BPL.Constant.initialY;
		var x = BPL.Constant.initialX;
		if (count > 0) x += BPL.Constant.shape.xSpace;

		for (var i = 0; i < groupNone.length; i++) {
			shape = groupNone[i];
			shape.moveTo(x + BPL.Constant.shape.xSpace + 25,y + 25, true);
			y += BPL.Constant.shape.ySpace;
		}

		// now arrange output-onlys along the top
		// and string their children beneath them
		x = BPL.Constant.initialX;
		for (var i = 0; i < groupOut.length; i++) {
			y = BPL.Constant.initialY;
			shape = groupOut[i];
			var depthArray = [];
			var widthArray = [];
			this.arrangeThread(x,y,shape,depthArray,widthArray,true);
			if (widthArray[0]) x += (BPL.Constant.shape.xSpace * widthArray[0]);
		}
		// update create location based on new location of selectedShape
		if (selectedShape) {
			this.createLocation.x = selectedShape.model.xPos + 25;
			this.createLocation.y = selectedShape.model.yPos + 25;
		}

		// notify main page of change
		if ((this.selectedItems.length == 1) && zenPage && zenPage.notify && zenPage.diagramLoaded) zenPage.notify('MOVE');
		this.updateBoundingBoxes();
	}
	catch (ex) {
		if (zenPage && zenPage.window && zenPage.window.zenExceptionHandler) {
			zenPage.window.zenExceptionHandler(ex,arguments,'Exception in Diagram.arrangeShapes()');
		}
		else {
			throw ex;
		}
	}
	BPL.Undo.endUndo();
}

/// Calculate depth and width of all threads branching off from shape.
/// depthArray and widthArray are depth and width indexed by branch #.
/// If moveShapes is false, then calculate depth and width only.
BPL.Diagram.prototype.arrangeThread = function BPL_Diagram_arrangeThread(xp,yp,shape,depthArray,widthArray,moveShapes)
{
	var lastShape = shape;
	var child = null;
	var n,x,y;

	if (moveShapes) shape.moveTo(xp,yp,true);

	// test if this shape has any short-circuit connections to a join
	// if true, we will overshift items to make line nice
	var shiftShape = false;
	if (shape.outputList.length > 1) {
		for (n = 0; n < shape.outputList.length; n++) {
			if (shape.outputList[n].toShape.model.Type == 'join') {
				shiftShape = true;
				break;
			}
		}
	}

	// process branches
	var	wid = 0;
	x = xp;

	for (n = 0; n < shape.outputList.length; n++) {
		// reset y pos
		y = yp + BPL.Constant.shape.ySpace;

		if (shape.outputList.length > 1) { // a little more space for first children
			y += BPL.Constant.shape.ySpace / 2;
		}

		// update x pos; test for overshift
		if (shiftShape) {
			if (n == 0) { x = xp + (BPL.Constant.shape.xSpace / 2); }
			else if ((n > 0) && (shape.outputList[n-1].toShape.model.Type != 'join')) {
				x += BPL.Constant.shape.xSpace + ((wid > 0) ? ((wid-1) * BPL.Constant.shape.xSpace) : 0);
			}
		}
		else {
			if (n == 0) { x = xp; }
			else {
				x += BPL.Constant.shape.xSpace + ((wid > 0) ? ((wid-1) * BPL.Constant.shape.xSpace) : 0);
			}
		}

		child = shape.outputList[n].toShape;
		var endOfBranch = false;

		depthArray[n] = 0.5;
		widthArray[n] = 1;

		// trace to end of this thread
		while (child && !endOfBranch) {
			depthArray[n]++;

			if (child.model.Type == 'join') {
				lastShape = child;
				if (moveShapes) child.moveTo(x,y,true);
				// end of branch
				endOfBranch = true;
			}
			else {
				if (moveShapes) child.moveTo(x,y,true);

				if (child.outputList.length == 0) { // end of thread
					child = null;
				}
				else {
					switch (child.model.Type) {
					case 'switch':
					case 'if':
					case 'flow':
					case 'scope':
						// recurse
						var childDepthArray = [];
						var childWidthArray = [];

						child = this.arrangeThread(x,y,child,childDepthArray,childWidthArray,moveShapes);

						// find largest depth
						var max = 0;
						for (var d = 0; d < childDepthArray.length; d++) {
							max = (childDepthArray[d] > max) ? childDepthArray[d] : max;
						}
						depthArray[n] += max;

						// sum up widths
						wid = 0;
						for (var w = 0; w < childWidthArray.length; w++) {
							wid += childWidthArray[w];
						}
						// see if we need to increase our width
						widthArray[n] = (wid > widthArray[n]) ? wid : widthArray[n];

						// move join
						if (moveShapes && child) {
							y += (BPL.Constant.shape.ySpace * max);
							child.moveTo(x,y,true);
						}

						y += BPL.Constant.shape.ySpace;
						break;

					default:
						y += BPL.Constant.shape.ySpace;
						break;
					}
					// next child in line
					if (child) child = (child.outputList.length > 0 ? child.outputList[0].toShape : null);
				}
			}
		}
	}
	return lastShape;
}

/// Helper function to indicate whether the currently selected items can be grouped in a group of type groupType.
/// groupInfo is populated with firstShape and lastShape.
BPL.Diagram.prototype.canGroupShapes = function BPL_Diagram_canGroupShapes(groupType,groupInfo)
{
	if (!groupInfo) groupInfo = {};
	var selectedShapes = [];
	// find all selected shapes
	for (var i = 0; i < this.selectedItems.length; i++) {
		var item = this.selectedItems[i];
		if (item && (item.model.Type != 'connector')) selectedShapes.push(item);
	}
	// find first shape
	var firstShape = null;
	var firstCount = 0;
	for (var i = 0; i < selectedShapes.length; i++) {
		var item = selectedShapes[i];
		// find shapes with inputs outside the group
		if ((item.inputList.length > 0) && !this.selectedItems.contains(item.inputList[0].fromShape)) {
			firstShape = item;
			firstCount++;
		}
	}
	// one shape must be at the start of the group
	if ((firstCount != 1) || !firstShape) return false;
	// can't include a 'start' shape in a group
	if (firstShape.model.Type == 'start') return false;
	
	var lastShape = this.findLastShape(firstShape,0);
	if (!lastShape) return false;

	groupInfo.firstShape = firstShape;
	groupInfo.lastShape = lastShape;
	return true;
}

/// Drill into the current shape
BPL.Diagram.prototype.drillDown = function BPL_Diagram_drillDown()
{
	if (this.selectedItems.length == 0) {
		alert(getLocalText('EDNoSelection'));
		return;
	}
	if (this.selectedItems.length > 1) {
		alert(getLocalText('EDMultiSelection'));
		return;
	}
	var item = this.selectedItems[0];
	if ((item.model.Type == 'connector') || (item.children.length <=0)) {
		alert(getLocalText('EDNoDrill'));
		return;
	}
	this.setCurrentParent(item.model.Index);
	return;
}

/// Indicate whether the current shape can be drilled into.
BPL.Diagram.prototype.canDrillDown = function BPL_Diagram_canDrillDown()
{
	var canDrill = false;
	if (this.selectedItems.length == 1) {
		var item = this.selectedItems[0];
		if ((item.model.Type != 'connector') && item.children && (item.children.length > 0)) canDrill = true;
	}
	return canDrill;
}

/// Indicate whether the user can drill up from the current level.
BPL.Diagram.prototype.canDrillUp = function BPL_Diagram_canDrillUp()
{
	return this.levels.length > 1;
}

/// Indicate whether the user can paste items from the clipboard.
BPL.Diagram.prototype.canPaste = function BPL_Diagram_canPaste()
{
	return !!(this.clipboard && (this.clipboard.length > 0));
}

/// Find a named Call activity.
BPL.Diagram.prototype.findCall = function BPL_Diagram_findCall(name)
{
	return this.index.call[name];
}

/// Find a named Label activity.
BPL.Diagram.prototype.findLabel = function BPL_Diagram_findLabel(name)
{
	return this.index.label[name];
}

/// Find the last shape in the currently selected items. (Iterates recursively.)
BPL.Diagram.prototype.findLastShape = function BPL_Diagram_findLastShape(startShape,depth,visitIndex)
{
	if (depth == 0) visitIndex = {};
	var next;

	if (visitIndex[startShape.model.Index]) { // duplicate (should not happen!)
		return null;
	}
	visitIndex[startShape.model.Index] = true;
	var shape = startShape;

	while (shape) {
		if (shape.model.Type == 'join') {
			return (depth == 0) ? null : shape;
		}

		if (shape.outputList.length == 0) { // end of thread
			next = null;
		}
		else {
			switch (shape.model.Type) {
			case 'switch':
			case 'if':
			case 'flow':
			case 'scope':
				// find join at end of branch
				// make sure all branches end up at the same point
				var join = null;
				var prevJoin = null;
				for (var i = 0; i < shape.outputList.length; i++) {
					join = this.findLastShape(shape.outputList[i].toShape,depth+1,visitIndex);
					if (join == null) return null;

					if (prevJoin == null) {
						prevJoin = join;
					}
					else if (join != prevJoin) { // end mismatch
						return null;
					}
				}

				if (null == join) return null;
				if ((join.model.Type != 'join') || !this.selectedItems.contains(join)) { // last shape is not selected or isn't a join
					return null;
				}
				else { // get shape after join
					shape = join;
					next = join.outputList[0].toShape;
				}
				break;
			default:
				// next element
				next = null;
				if (this.selectedItems.contains(shape)) next = shape.outputList[0].toShape;
				break;
			}
		}

		if (next) {
			if (this.selectedItems.contains(next)) { // keep going
				shape = next;
			}
			else { // this is the last shape
				return shape;
			}
		}
		else { shape = null; }
	}
	return null;
}

/// Find any shapes that are related to startShape. (e.g. a start and end activity)
BPL.Diagram.prototype.findMatchingShapes = function BPL_Diagram_findMatchingShapes(startShape)
{
	var type = startShape.model.Type;
	var shape = startShape;
	var forward = true;
	var name = '';
	var calls = [];
	var results = {};
	this._matchLoopDetect = {};  // visited objects by index

	var originalShape = startShape;
	if (originalShape.boundingBox) { // clear bounding box
		originalShape.boundingBox.top = originalShape.model.yPos - (BPL.Constant.shape.height/2) - 10;
		originalShape.boundingBox.bottom = originalShape.model.yPos + (BPL.Constant.shape.height/2) + 10;
		originalShape.boundingBox.left = originalShape.model.xPos - (BPL.Constant.shape.width/2) - 10;
		originalShape.boundingBox.right = originalShape.model.xPos + (BPL.Constant.shape.width/2) + 10;
		originalShape.boundingBox.mid = null;
	}

	// set up search parms
	switch (type) {
		case 'if':
		case 'flow':
		case 'scope':
		case 'switch':
		case 'start':
			forward = true;
			break;
		case 'join':
		case 'end':
			forward = false;
			break;
		case 'call':
			var async = shape.model.PropertyBag['Async'];
			if (async.toString() == '0') return null;
			forward = true;
			name = shape.model.Name;
			break;
		case 'sync':
			var s = shape.model.PropertyBag['Calls'];
			if ((!s) || (s == '')) return null;
			calls = s.toString().split(',');
			forward = false;
			break;
		case 'branch':
			// show label
			if (shape.gotoConnection) {
				shape = shape.gotoConnection.toShape;
				results[shape.model.Index] = shape;
				return results;
			}
			break;
		case 'label':
			// show all branches that point to us
			var count = 0;
			for (var n = 0; n < shape.inputList.length; n++) {
				var cnct = shape.inputList[n];
				if (cnct.ConnectType == 'goto') {
					results[cnct.fromShape.model.Index] = cnct.fromShape;
					count++;
				}
			}
			return (count > 0) ? results : null;
		default:
			return null;
	}

	while (shape) {
		this._matchLoopDetect[shape.model.Index] = true;

		// update bounding box
		originalShape.updateBoundingBoxFromShape(shape,0);

		switch (type) {
			case 'if':
			case 'flow':
			case 'scope':
			case 'switch':
				if (shape.model.Type == 'join') {
					results[shape.model.Index] = shape;
					return results;
				}
				break;
			case 'join':
				if ((shape.model.Type == 'if') || (shape.model.Type == 'switch') ||(shape.model.Type == 'flow')||(shape.model.Type == 'scope')){
					results[shape.model.Index] = shape;
					return results;
				}
				break;
			case 'start':
				if (shape.model.Type == 'end') {
					results[shape.model.Index] = shape;
					return results;
				}
				break;
			case 'end':
				if (shape.model.Type == 'start') {
					results[shape.model.Index] = shape;
					return results;
				}
				break;
			case 'call':
				// see if this is matching sync
				if ((shape.model.Type == 'sync') && (shape.model.PropertyBag['Calls'])) {
					var calls2 = shape.model.PropertyBag['Calls'].toString().split(',');
					if (calls2.contains(name)) results[shape.model.Index] = shape;
				}
				break;

			case 'sync':
				// see if this is matching call
				if ((shape.model.Type == 'call') && (shape.model.PropertyBag['Async'].toString() != '0')) {
					if (calls && (calls.length > 0) && calls.contains(shape.model.Name)) results[shape.model.Index] = shape;
				}
				break;
		}

		if (forward) {
			if (shape.outputList.length == 0) { // end of thread
				shape = null;
			}
			else {
				switch (shape.model.Type) {
					case 'switch':
					case 'if':
					case 'flow':
					case 'scope':
						// loop over branches
						var next = null;
						for (var n = 0; n < shape.outputList.length; n++) {
							var child = shape.outputList[n].toShape;
							var sub = this.findMatchingShapesInBranch(originalShape,child,results,type,forward,name,calls);
							if (!next) next = sub;

							if (sub && ((type == 'if')||(type == 'switch')||(type == 'flow')||(type == 'scope'))) {
								results[sub.model.Index] = sub;
							}
						}
						shape = next;
						break;
					default:
						// next shape
						shape = shape.outputList[0].toShape;
						if (shape && this._matchLoopDetect[shape.model.Index]) shape = null;
						break;
				}
			}
		}
		else { // backward
			if (shape.inputList.length == 0) { // end of thread
				shape = null;
			}
			else {
				switch (shape.model.Type) {
					case 'join':
						// loop over branches
						var prev = null;
						for (var n = 0; n < shape.inputList.length; n++) {
							var child = shape.inputList[n].fromShape;
							var sub = this.findMatchingShapesInBranch(originalShape,child,results,type,forward,name,calls);
							if (!prev) prev = sub;
							if (sub && (type == 'join')) results[sub.model.Index] = sub;
						}
						shape = prev;
						break;
					default:
						shape = shape.inputList[0].fromShape;
						if (shape && this._matchLoopDetect[shape.model.Index]) shape = null;
						break;
				}
			}
		}
	}

	// if nothing in results, clear it
	var c = 0;
	for (var n in results) {
		c++;
		break;
	}
	if (c == 0) results = null;

	return results;
}

/// Recursive method called by findMatchingShapes() to explore down branches.
BPL.Diagram.prototype.findMatchingShapesInBranch = function BPL_Diagram_findMatchingShapesInBranch(root,shape,results,type,forward,name,calls,depth)
{
	var join = null;
	var originalShape = shape;
	depth = (null == depth) ? 1 : depth;

	while (shape) {
		this._matchLoopDetect[shape.model.Index] = true;
		if (root) root.updateBoundingBoxFromShape(shape,depth);

		switch (type) {
			case 'call':
				// see if this is matching sync
				if ((shape.model.Type == 'sync') && (shape.model.PropertyBag['Calls'])) {
					var calls2 = shape.model.PropertyBag['Calls'].toString().split(',');
					if (calls2.contains(name)) results[shape.model.Index] = shape;
				}
				break;
			case 'sync':
				// see if this is matching call
				if ((shape.model.Type == 'call') && (shape.model.PropertyBag['Async'].toString() != '0')) {
					if (calls && (calls.length > 0) && calls.contains(shape.model.Name)) results[shape.model.Index] = shape;
				}
				break;
		}

		// next
		if (forward) {
			if (shape.model.Type == 'join') {
				join = shape;
				shape = null;
			}
			else if (shape.outputList.length == 0) { // end of thread
				shape = null;
			}
			else {
				switch (shape.model.Type) {
					case 'switch':
					case 'if':
					case 'flow':
					case 'scope':
						// loop over branches
						var next = null;
						for (var n = 0; n < shape.outputList.length; n++) {
							var child = shape.outputList[n].toShape;
							var sub;
							if (child && this._matchLoopDetect[child.model.Index]) {
								sub = null;
							}
							else {
								sub = this.findMatchingShapesInBranch(root,child,results,type,forward,null,calls,depth+1);
							}
							if (!next) next = sub;
						}
						shape = next;
						if (shape && shape.outputList.length > 0) {
							shape = shape.outputList[0].toShape;
							if (shape && this._matchLoopDetect[shape.model.Index]) shape = null;
						}
						else {
							shape = null;
						}
						break;
					default:
						// next shape
						shape = shape.outputList[0].toShape;
						if (shape && this._matchLoopDetect[shape.model.Index]) shape = null;
						break;
				}
			}
		}
		else { // backward
			if (['switch','if','flow','scope'].contains(shape.model.Type)) {
				join = shape;
				shape = null;
			}
			else if (shape.inputList.length == 0) { // end of thread
				shape = null;
			}
			else {
				switch (shape.model.Type) {
					case 'join':
						// loop over branches
						var prev = null;
						for (var n = 0; n < shape.inputList.length; n++) {
							var child = shape.inputList[n].fromShape;
							var sub;
							if (child && this._matchLoopDetect[child.model.Index]) {
								sub = null;
							}
							else {
								sub = this.findMatchingShapesInBranch(root,child,results,type,forward,null,calls,depth+1);
							}
							if (!prev) prev = sub;
						}
						shape = prev;
						if (shape && shape.inputList.length > 0) {
							shape = shape.inputList[0].fromShape;
							if (shape && this._matchLoopDetect[shape.model.Index]) shape = null;
						}
						else {
							shape = null;
						}
						break;
					default:
						shape = shape.inputList[0].fromShape;
						if (shape && this._matchLoopDetect[shape.model.Index]) shape = null;
						break;
				}
			}
		}
	}
	return join;
}

/// Validate the diagram and indicate whether there are any errors.
BPL.Diagram.prototype.hasErrors = function BPL_Diagram_hasErrors()
{
	var hasErrors = false;
	for (var i = 0; i < this.shapeList.length; i++) {
		var shape = this.shapeList[i];
		if (shape && !shape.isValid()) {
			hasErrors = true;
			break;
		}
	}
	return hasErrors;
}

/// Initialise the SVG group for the diagram during rendering.
BPL.Diagram.prototype.initialiseGroup = function BPL_Diagram_initialiseGroup()
{
	while (this.svgRoot && this.svgRoot.firstChild) {
		this.svgRoot.removeChild(this.svgRoot.firstChild);
	}
	var bbGroup = self.document.getElementById('bbGroup');
	while (bbGroup && bbGroup.firstChild) {
		bbGroup.removeChild(bbGroup.firstChild);
	}
	this.svgRoot.setAttribute('visibility','visible');
}

/// Indicate whether an item is currently selected.
BPL.Diagram.prototype.isSelected = function BPL_Diagram_isSelected(item)
{
	return (!item) ? false : this.selectedItems.contains(item);
}

/// Return an of array of names corresponding to shapes of the specified type.
BPL.Diagram.prototype.listNames = function BPL_Diagram_listNames(type)
{
	var names = [];
	if ((type == 'call') || (type == 'label')) { // use name index for labels and calls
		for (var name in this.index[type]) {
			names.push(name);
		}
	}
	else if (type == 'branch') { // use branch index for branches
		for (var ref in this.index[type]) {
			var shape = this.index[type][ref];
			if (shape && (shape.model.Name != '')) names.push(shape.model.Name);
		}
	}
	else {
		for (var i = 0; i < this.shapeList.length; i++) {
			var shape = this.shapeList[i];
			if (shape && (shape.model.Name != '') && ((type == null) || (type == '') || (shape.model.Type==type))) names.push(shape.model.Name);
		}
	}
	return names;
}

/// Wrapper method for move complete logic
BPL.Diagram.prototype.moveComplete = function BPL_Diagram_moveComplete()
{
	if (this.moveShape) {
		// if move is below the threshold, cancel it
		var dist2 = (Math.pow((this.moveShape._move.x - BPL.mouseHandling.start.x), 2) + Math.pow((this.moveShape._move.y - BPL.mouseHandling.start.y), 2));

		if (dist2 >= BPL.Constant.moveThreshold) { // call moveComplete() for all shapes being moved
			if (this.moveList.length > 0) {
				BPL.Undo.startUndo();
				for (var i = 0; i < this.moveList.length; i++) {
					var details = this.moveList[i];
					var item = this.selectedItems[details.selIndex];
					if (item) item.moveComplete();
				}
				BPL.Undo.endUndo();
			}
			if ((this.selectedItems.length == 1) && zenPage && zenPage.notify) zenPage.notify('MOVE');

			this.setModified(true);
			if (zenPage && zenPage.updateIcons) zenPage.updateIcons();
		}
		else { // call moveDiscard() for all shapes being moved
			for (var i = 0; i < this.moveList.length; i++) {
				var details = this.moveList[i];
				var item = this.selectedItems[details.selIndex];
				if (item) item.moveDiscard();
			}
		}

		// done moving
		this.moveShape = null;
		this.moveList = [];

		// restore styles of moved shapes
		for (var i = 0; i < this.selectedItems.length; i++) {
			var item = this.selectedItems[i];
			item.updateStyle();
			if (item.inputList && item.inputList.length) {
				for (var j = 0; j < item.inputList.length; j++) {
					item.inputList[j].updateStyle();
				}
			}
			if (item.outputList && item.outputList.length) {
				for (var j = 0; j < item.outputList.length; j++) {
					item.outputList[j].updateStyle();
				}
			}
		}
		if (this.selectedItems.length == 1) {
			//this.selectItem(this.selectedItems[0]);
		}
		this.updateBoundingBoxes();
	}
	this.setOperation(null);
}

/// Wrapper method for move start logic
BPL.Diagram.prototype.moveStart = function BPL_Diagram_moveStart(shape,evt)
{
	if (!shape) return;
	// start move operation for selected shapes
	this.moveShape = shape;
	this.moveList = [];
	this.setOperation('move');

	for (var i = 0; i < this.selectedItems.length; i++) {
		var currItem = this.selectedItems[i];
		if (currItem) {
			currItem.updateStyle();
			if (currItem.moveTo && currItem.moveInit) {
				currItem.moveInit();
				this.moveList.push({ "selIndex": i, "xPos": currItem.model.xPos, "yPos": currItem.model.yPos });
			}
		}
	}
	// calculate offset of mouse from shape
	BPL.mouseHandling.delta.x = shape.model.xPos - (evt.clientX * (BPL.Options.mouseScale/BPL.Options.currentZoom));
	BPL.mouseHandling.delta.y = shape.model.yPos - (evt.clientY * (BPL.Options.mouseScale/BPL.Options.currentZoom));

	// remember start of move
	BPL.mouseHandling.start.x = shape.model.xPos;
	BPL.mouseHandling.start.y = shape.model.yPos;
}

/// Render the diagram.
BPL.Diagram.prototype.render = function BPL_Diagram_render()
{
	var parentIndex = this.currentParent;
	this.initialiseGroup();

	if (zenPage && zenPage.setCanvasSize) zenPage.setCanvasSize(this.model.Width,this.model.Height);
	var canvasSVG = document.getElementById('canvasSVG');
	canvasSVG.setAttribute('width',this.model.Width);
	canvasSVG.setAttribute('height',this.model.Height);

	var lgWid = 440;
	var labelAttribs = { "id": "diagramLabel", "width": lgWid };
	var labelListeners = { "click": BPL.events.labelClick };
	var labelGroup = BPL.drawSVGElement(this.svgRoot,'svg',labelAttribs,labelListeners);

	var rectAttribs = { "id": "diagramLabelRect", "class": "DiagramLabel", "x": 0, "y": 0, "width": lgWid, "height": 100 };
	var labelRect = BPL.drawSVGElement(labelGroup,'rect',rectAttribs);

	var titleAttribs = { "id": "diagramLabelTitle", "class": "LabelTitle", "x": 5, "y": 23 };
	var title = BPL.drawSVGElement(labelGroup,'text',titleAttribs);

	var titleText = document.createTextNode(BPL.getLocalText('EDBusinessProcess'));
	title.appendChild(titleText);

	var nameAttribs = { "id": "diagramLabelName", "class": "LabelName", "x": 5, "y": 48 };
	var name = BPL.drawSVGElement(labelGroup,'text',nameAttribs);

	var nameText = document.createTextNode(this.model.Name);
	name.appendChild(nameText);

	var modAttribs = { "id": "diagramLabelLastModified", "class": "LabelTime", "x": 5, "y": 72 };
	var mod = BPL.drawSVGElement(labelGroup,'text',modAttribs);

	var modText = document.createTextNode(BPL.getLocalText('LastModified') + ' ' + this.model.LastModified);
	mod.appendChild(modText);

	this.renderAnnotation();

	// create a series of "drill down" boxes
	var x = lgWid;
	var y = 0;
	var nestedLabelWidth = 280;
	var nestedLabelHeight = 40;
	var levelGroupListeners = { "click": BPL.events.levelClick };
	var levelGroupAttribs = { "visibility": "hidden", "width": nestedLabelWidth+1, "height": nestedLabelHeight+1 };
	var levelBoxAttribs = { "class": "LevelLabel", "x": 0, "y": 0, "rx": 5, "width": nestedLabelWidth, "height": nestedLabelHeight };
	var activityTypeAttribs = { "class": "LevelActivityType", "x": 5, "y": 12 };
	var activityNameAttribs = { "class": "LevelActivityName", "x": 5, "y": 35 };

	// lay out horizontally
	for (var lvl = 1; lvl <= BPL.Constant.maxLevels; lvl++) {
		levelGroupAttribs['id'] = 'levelGroup_' + lvl;
		levelGroupAttribs.x = parseFloat(x);
		levelGroupAttribs.y = parseFloat(y);
		var levelGroup = BPL.drawSVGElement(this.svgRoot,'svg',levelGroupAttribs,levelGroupListeners);

		// box
		levelBoxAttribs['id']  = 'levelRect_' + lvl;
		BPL.drawSVGElement(levelGroup,'rect',levelBoxAttribs);

		activityTypeAttribs['id'] = 'levelActivityType_' + lvl;
		var activityType = BPL.drawSVGElement(levelGroup,'text',activityTypeAttribs);

		// create the text node and append it
		var activityTypeText = document.createTextNode('');
		activityType.appendChild(activityTypeText);

		activityNameAttribs['id'] = 'levelActivityName_' + lvl;
		var activityName = BPL.drawSVGElement(levelGroup,'text',activityNameAttribs);

		var activityNameText = document.createTextNode('');
		activityName.appendChild(activityNameText);

		x += nestedLabelWidth;
	}

	BPL.createGridLines();

	// update the levels boxes
	for (var lvl = 1; lvl <= BPL.Constant.maxLevels; lvl++) {
		var el = document.getElementById('levelGroup_' + lvl);
		if (lvl < this.levels.length) {
			// make this box visible
			el.setAttribute('visibility','visible');
			// update text in diagram label
			var levelInfo = this.levels[lvl];
			BPL.setTextNode("levelActivityType_" + lvl,"<" + this.shapeList[levelInfo.index].model.Type + ">",false)
			BPL.setTextNode("levelActivityName_" + lvl,this.shapeList[levelInfo.index].model.Name,false)
		}
		else {
			el.setAttribute('visibility','hidden');
		}
	}

	// update text in diagram label
	var str;
	if (parentIndex) {
		var shape = this.shapeList[parentIndex];
		if (shape) {
			var nm = shape.model.Name;
			str = BPL.getLocalText('EDContentsOf',nm ? nm :('<'+shape.model.Type+'>'));
		}
	}
	else {
		str = BPL.getLocalText('EDBusinessProcess');
	}
	BPL.setTextNode('diagramLabelTitle',str,false);

	// show everyone in this group; hide everyone else
	for (var i = 0; i < this.shapeList.length; i++) {
		var shape = this.shapeList[i];

		if (shape) {
			if (shape.model.ParentShape == parentIndex) {
				shape.render();
				// display any outputs for this shape
				for (var c = 0; c < shape.outputList.length; c++) {
					var conn = shape.outputList[c];
					if (conn) conn.render();
				}
				if (shape.gotoConnection) shape.gotoConnection.render();			
			}
			else {
				if (shape.svgGroup) shape.svgGroup.setAttribute('visibility','hidden');
				if (shape.boundingBox) {
					if (shape.boundingBox.box)  delete shape.boundingBox.box;
					if (shape.boundingBox.line)  delete shape.boundingBox.line;
				}
			}
		}
	}
	this.updateBoundingBoxes();
}

/// Render the annotation for the diagram.
BPL.Diagram.prototype.renderAnnotation = function BPL_Diagram_renderAnnotation()
{
	var labelGroup = document.getElementById('diagramLabel');
	if (labelGroup) {
		var annotationText = document.getElementById('diagramLabelAnnotation');
		if (!annotationText) {
			var annoAttribs = { "id": "diagramLabelAnnotation", "class": "LabelAnnotation", "x": 5, "y": 95 };
			annotationText = BPL.drawSVGElement(labelGroup,'text',annoAttribs);
		}

		if (annotationText) {
			while (annotationText.firstChild) {
				annotationText.removeChild(annotationText.firstChild);
			}

			// create the text node and append it (first line only)
			var annotationData = (''+this.model.Annotation).toString().split('\n');
			var annoText = document.createTextNode(annotationData[0] + (annotationData.length <= 1 ? '' : ' ...'));
			annotationText.appendChild(annoText);
		}
	}
}

/// Select an item.
BPL.Diagram.prototype.selectItem = function BPL_Diagram_selectItem(item,add)
{
	try {
		// Allow zenPage to trigger onchange handling when selectItem() is triggered
		// by a mouse event before the onchange handlers are fired.
		if (zenPage && zenPage.checkTextControls) {
			zenPage.checkTextControls();
		}

		if (add) {
			// if selected, remove this item from the selected group
			var itemIndex = this.selectedItems.indexOf(item);
			if (itemIndex != -1) {
				this.selectedItems.splice(itemIndex,1);
				item.render();
				item = null;
			}
		}
		else if (item && this.isSelected(item)) {
			if (zenPage && zenPage.notify) zenPage.notify('RESELECT');
			return;
		}

		if (!add) {
			// unselect previous items
			var oldSelected = this.selectedItems;
			this.selectedItems = [];
			for (var i = 0; i < oldSelected.length; i++) {
				var old = oldSelected[i];
				if (old) old.updateStyle();
			}
		}

		// add item to list and update style
		if (item) {
			this.selectedItems.push(item);
			item.updateStyle();
		}

		if (zenPage && zenPage.notify) zenPage.notify('SELECT');

		if (this.matchShapes) {
			var old = [];
			for (var n in this.matchShapes) {
				old.push(this.matchShapes[n]);
			}
			// clear out matches
			this.matchShapes = null;
			for (var n = 0; n < old.length; n++) {
				old[n].updateStyle();
			}
		}

		// mark associated shape(s)
		if (this.selectedItems.length == 1) {
			this.matchShapes = this.findMatchingShapes(this.selectedItems[0]);
			if (this.matchShapes) {
				for (var n in this.matchShapes) {
					var matchingShape = this.matchShapes[n];
					if (matchingShape) matchingShape.render();
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

/// Shift to the level of the diagram with the specified parent index.
BPL.Diagram.prototype.setCurrentParent = function BPL_Diagram_setCurrentParent(index,noRender)
{
	if (typeof index == 'undefined') index = null;
	if (index != null) {
		index = parseInt(index,10);
		if (index >= this.shapeList.length) return;
	}
	if (this.currentParent == index) return;

	var shiftUp = false;
	var scrollLeft = 0;
	var scrollTop = 0;
	this.currentParent = index;

	for (var i = 0; i < this.levels.length; i++) {
		if (this.levels[i] && (this.levels[i].index == index)) {
			shiftUp = true;
			scrollLeft = this.levels[i].scrollLeft;
			scrollTop = this.levels[i].scrollTop;
			for (var j = i+1; j < this.levels.length; j++) {
				this.levels.pop();
			}
			break;
		}
	}

	if (!shiftUp) {
		var oldLevels = this.levels;
		this.levels = [];
		while (index) {
			var levelInfo = { "index": index, "scrollTop": 0, "scrollLeft": 0 };
			var oldPos = oldLevels.length - this.levels.length;
			if (oldLevels[oldPos] && (oldLevels[oldPos].index == index)) {
				levelInfo.scrollTop = oldLevels[oldPos].scrollTop;
				levelInfo.scrollLeft = oldLevels[oldPos].scrollLeft;
			}
			else if ((index != this.currentParent) && zenParent && zenParent.findElement) {
				var scrollEl = zenParent.findElement('svgdiv');
				if (scrollEl) {
					if (scrollEl.scrollTop) levelInfo.scrollTop = scrollEl.scrollTop;
					if (scrollEl.scrollLeft) levelInfo.scrollLeft = scrollEl.scrollLeft;
				}
			}
			this.levels.splice(0,0,levelInfo);
			var shape = this.shapeList[index];
			index = shape ? shape.model.ParentShape : null;
		}
		var levelInfo = { "index": null, "scrollTop": 0, "scrollLeft": 0 };
		if ((oldLevels.length > 1) && oldLevels[0] && (oldLevels[0].index == null)) {
			levelInfo.scrollTop = oldLevels[0].scrollTop;
			levelInfo.scrollLeft = oldLevels[0].scrollLeft;
		}
		else if (zenPage && zenParent.findElement) {
			var scrollEl = zenParent.findElement('svgdiv');
			if (scrollEl) {
				if (scrollEl.scrollTop) levelInfo.scrollTop = scrollEl.scrollTop;
				if (scrollEl.scrollLeft) levelInfo.scrollLeft = scrollEl.scrollLeft;
			}
		}
		this.levels.splice(0,0,levelInfo);
	}

	this.selectItem(null,false);

	if (!noRender) {
		this.render();
		if (zenParent && zenParent.findElement) {
			var scrollEl = zenParent.findElement('svgdiv');
			if (scrollEl) {
				var levelInfo = this.levels[this.levels.length - 1];
				if (levelInfo) {
					scrollEl.scrollTop = levelInfo.scrollTop;
					scrollEl.scrollLeft = levelInfo.scrollLeft;
				}
			}
		}
	}
}

/// Update the create location based on an event's location and the current zoom level.
BPL.Diagram.prototype.setCreateLocation = function BPL_Diagram_setCreateLocation(evt)
{
	var canvasEl = document.getElementById('canvasSVG');
	var xOffset = parseInt(canvasEl.getAttribute('x'));
	var yOffset = parseInt(canvasEl.getAttribute('y'));
	this.createLocation.x = Math.round((evt.clientX * (BPL.Options.mouseScale/BPL.Options.currentZoom)) - xOffset);
	this.createLocation.y = Math.round((evt.clientY * (BPL.Options.mouseScale/BPL.Options.currentZoom)) - yOffset);
}

/// Pass the modified flag up to zenPage.
BPL.Diagram.prototype.setModified = function BPL_Diagram_setModified(flag)
{
	if (zenPage && zenPage.setModified) zenPage.setModified(flag);
}

/// Set the current operation.
BPL.Diagram.prototype.setOperation = function BPL_Diagram_setOperation(operation)
{
	if (BPL.Diagram.validOperations.contains(operation)) this.currentOperation = operation;
}

/// Move the current view of the diagram up to the specified level, or the next level up if not specified.
BPL.Diagram.prototype.shiftUp = function BPL_Diagram_shiftUp(targetLevel)
{
	if (targetLevel == null) targetLevel = this.levels.length - 2;
	var newParentIndex = null;
	if ((targetLevel >= 0) && this.levels[targetLevel]) newParentIndex = this.levels[targetLevel].index;
	this.setCurrentParent(newParentIndex);
}

/// Update all shape annotations.
BPL.Diagram.prototype.updateAnnotations = function BPL_Diagram_updateAnnotations()
{
	if (BPL.Options.showAnnotations) {
		var rectLabel = document.getElementById('diagramLabelRect');
		if (rectLabel) rectLabel.setAttribute('height',100);
		var elements = [ 'diagramLabelName', 'diagramLabelAnnotation', 'diagramLabelLastModified' ];
		for (var i = 0; i < elements.length; i++) {
			var el = document.getElementById(elements[i]);
			if (el) el.setAttribute('visibility','visible');
		}
	}

	for (var i = 0; i < this.shapeList.length; i++) {
		var shape = this.shapeList[i];
		if (shape && (shape.model.ParentShape == this.currentParent)) shape.updateAnnotation();
	}
}

/// Update all bounding boxes.
BPL.Diagram.prototype.updateBoundingBoxes = function BPL_Diagram_updateBoundingBoxes()
{
	for (var i = 0; i < this.shapeList.length; i++) {
		var shape = this.shapeList[i];
		if (shape && (shape.model.ParentShape == this.currentParent)) {
			shape.updateBoundingBox();
		}
	}
}

/////////////////////////
//  Shape Definitions  //
/////////////////////////

/// Base shape constructor.
BPL.Shape = function BPL_Shape()
{
	// reference to annotation element
	this.annotation = null;
	// list of children
	this.children = [];
	// list of validation errors
	this.errors = [];
	// handles for geometry. Subclasses should override these in initialiseHandles().
	this.handles = {
		"annotation": { "x": 0, "y": 0 },
		"input": { "x": 0, "y": 0 },
		"output": { "x": 0, "y": 0 },
		"inputShape": { "x": 0, "y": 0 },
		"outputShape": { "x": 0, "y": 0 }
	},
	// reference to server-supplied model
	this.model = null;
	// list of connectors connecting to this shape
	this.inputList = [];
	// list of standard connectors starting from this shape
	this.outputList = [];
	// the standard output connector type for the current shape.
	this.outputType = '';
	// the base class used for the SVG class attribute
	this.shapeClass = 'BPLShape';
	// reference to the SVG group element for the shape
	this.svgGroup = null;
}

/// Create a Shape based on a model. Generally invoked from subclasses, hence the use of new this().
BPL.Shape.create = function BPL_Shape_create(model,updateLocation)
{
	var shape = new this();
	shape.model = model;
	shape.initialiseHandles();
	BPL.currentDiagram.shapeList[model.Index] = shape;
	if (model.ParentShape != null) {
		if (!BPL.currentDiagram.childIndex[model.ParentShape]) BPL.currentDiagram.childIndex[model.ParentShape] = [];
		BPL.currentDiagram.childIndex[model.ParentShape].push(shape);
	}
	if (updateLocation) {
		model.xPos = BPL.currentDiagram.createLocation.x;
		model.yPos = BPL.currentDiagram.createLocation.y;
		BPL.currentDiagram.createLocation.x += 25;
		BPL.currentDiagram.createLocation.y += 25;
	}
	return shape;
}

/// General function that determines which constructor to use and returns the correct Shape subclass.
BPL.Shape.createShape = function BPL_Shape_createShape(model,updateLocation)
{
	var shape = null;
	var shapeFunction = BPL.Shape.getShapeFunction(model.Type);
	if (shapeFunction) shape = shapeFunction.create(model,updateLocation);
	BPL.currentDiagram.addShape(shape);
	return shape;
}

/// Mouse handling for shapes.
BPL.Shape.events = {
	/// handle clicks and multi-select
	"mousedown": function BPL_Shape_events_mousedown(evt)
		{
			var el = evt.target;
			evt.stopPropagation();
			if (BPL.currentDiagram.currentOperation) evt.preventDefault(); // prohibit context menu during operations
			var shape = el.parentNode._shape;

			// select this shape
			if ((evt.button == 0) || (BPL.currentDiagram.selectedItems.length == 0)) {
				// select on primary button unless nothing selected
				BPL.currentDiagram.selectItem(shape, evt.ctrlKey);
			}

			if (BPL.readOnly) { // no movement for read only mode
				BPL.currentDiagram.setOperation('select');
				return;
			}
			if (evt.button != 0) { // only start move for primary mouse button
				BPL.currentDiagram.setCreateLocation(evt);
				return;
			}
			BPL.currentDiagram.moveStart(shape,evt);
		},
	/// Indicate whether a connection can be created during a connect operation.
	"mouseover": function BPL_Shape_events_mouseover(evt)
		{
			var el = evt.target;
			evt.stopPropagation();

			var shape = el.parentNode._shape;
			if (shape && (BPL.currentDiagram.currentOperation == 'connect')) shape.testConnection();
		},
	/// Update the lastOut coordinates.
	"mouseout": function BPL_Shape_events_mouseout(evt)
		{
			var el = evt.target;
			evt.stopPropagation();
			// remember position of this event
			BPL.mouseHandling.lastOut.x = evt.clientX;
			BPL.mouseHandling.lastOut.y = evt.clientY;
		},
	/// A no-op.
	"mouseup": function BPL_Shape_events_mouseup(evt) {}
}

/// Index of shape names and their associated constructors.
BPL.Shape.constructorIndex = null;

/// Helper method to build and retrieve values from the shape constructor index.
BPL.Shape.getShapeFunction = function BPL_Shape_getShapeFunction(type)
{
	if (BPL.Shape.constructorIndex == null) {
		BPL.Shape.constructorIndex = {};
		var shapeTypes = [ BPL.Activity, BPL.Decision, BPL.Event, BPL.Flow, BPL.Join, BPL.Scope ];
		for (var i = 0; i < shapeTypes.length; i++) {
			var shapeType = shapeTypes[i];
			if (shapeType && shapeType.shapeList) {
				for (var j = 0; j < shapeType.shapeList.length; j++) {
					var shapeName = shapeType.shapeList[j];
					if (shapeName) BPL.Shape.constructorIndex[shapeName] = shapeType;
				}
			}
		}
	}
	return BPL.Shape.constructorIndex[type];
}

/// Add an input connection from sourceShape to this shape.
/// This method assumes that the connector already exists and has been added to the main model already.
BPL.Shape.prototype.addInput = function BPL_Shape_addInput(sourceShape,outIndex,connType)
{
	if (connType != 'goto') {
		for (var i = 0; i < this.inputList.length; i++) {
			if (this.inputList[i].fromShape == sourceShape) return;
		}
	}

	var connObj = (connType == 'goto') ? sourceShape.gotoConnection : sourceShape.outputList[outIndex];
	if (connObj) this.inputList.push(connObj);

	if (!BPL.currentDiagram.isLoading) this.updateStyle();
	return connObj;
}

/// Add an output connection from this shape to targetShape.
/// This method is responsible for calling the Connector APIs to create the connection and its model.
BPL.Shape.prototype.addOutput = function BPL_Shape_addOutput(targetShape,name,connType,condition)
{
	name = (name == null) ? '' : name;

	// check for existing connection
	if (connType == 'goto') {
		if (this.gotoConnection) return null;
		if (this.model.Type != 'branch') return null;
	}
	else {
		for (var i = 0; i < this.outputList.length; i++) {
			if (this.outputList[i].toShape == targetShape) return null;
		}
	}

	var len = this.outputList.length;

	if ((this.model.Type == 'if') && (name == '')) {
		// for <if> make a reasonable guess about whether this is a true or a false branch
		if (len == 0) {
			name = 'true';
		}
		else if (len == 1) {
			name = (this.outputList[0].model.Name == 'true') ? 'false' : 'true';
		}
	}
	if (connType == '') connType = this.outputType;

	var conn;
	var connModel = BPL.Connector.createConnectorModel(this,targetShape,name,connType,condition);
	if (connModel) {
		for (var i = 0; i < targetShape.inputList.length; i++) {
			var testConn = targetShape.inputList[i];
			if (testConn && (testConn.model == connModel)) {
				conn = testConn;
				break;
			}
		}
	}
	if (!BPL.currentDiagram.isLoading) {
		this.updateStyle();
		if (conn) conn.render();
	}
	return conn;

	// TODO is this still needed?
	// now tell shape we are connecting to it
	//targetShape.addInput(this, this.outputList.length - 1, connType);
}

/// Indicate whether this shape can accept an input connection from sourceShape.
BPL.Shape.prototype.canAcceptInput = function BPL_Shape_canAcceptInput(sourceShape)
{
	// only accept one input
	if (this.inputList.length > 0) return false;

	// test if we are already connected to shape
	for (var i = 0; i < this.inputList.length; i++) {
		if (this.inputList[i].fromShape == sourceShape) return false;
	}
	return true;
}

/// Indicate whether this shape can accept an output connection to targetShape.
BPL.Shape.prototype.canAcceptOutput = function BPL_Shape_canAcceptOutput(targetShape)
{
	// only accept one output
	if (this.outputList.length > 0) return false;

	// test if we are already connected to shape
	for (var i = 0; i < this.outputList.length; i++) {
		if (this.outputList[i].toShape == targetShape) return false;
	}

	return true;
}

/// Indicate whether this shape can be copied.
BPL.Shape.prototype.canCopy = function BPL_Shape_canCopy(warnings)
{
	if (!warnings) warnings = [];
	return true;
}

/// Indicate whether this shape can be deleted.
BPL.Shape.prototype.canDelete = function BPL_Shape_canDelete(warnings)
{
	if (!warnings) warnings = [];
	return true;
}

/// Change this shape's parent.
BPL.Shape.prototype.changeParent = function BPL_Shape_changeParent(newParentIndex)
{
	BPL.Undo.startUndo();
	if (this.model.ParentShape != null) {
		var parentShape = BPL.currentDiagram.shapeList[this.model.ParentShape];
		if (parentShape) {
			var childPos = parentShape.children.indexOf(this);
			if (childPos != -1) parentShape.children.splice(childPos,1);
		}
	}
	if (newParentIndex != null) {
		var newParent = BPL.currentDiagram.shapeList[newParentIndex];
		if (newParent) newParent.children.push(this);
	}
	this.model.ParentShape = newParentIndex;
	if (this.model.ParentShape != BPL.currentDiagram.currentParent) this.hide();
	BPL.Undo.endUndo();
}

/// Delete the current annotation.
BPL.Shape.prototype.deleteAnnotation = function BPL_Shape_deleteAnnotation()
{
	if (this.annotation && this.annotation.parentNode) this.annotation.parentNode.removeChild(this.annotation);
	this.annotation = null;
}

/// Get the current x coordinate of the shape.
/// The helper is needed to mask the behaviour of move operations.
BPL.Shape.prototype.getX = function BPL_Shape_getX()
{
	return (this._move ? this._move.x : this.model.xPos);
}

/// Get the current y coordinate of the shape.
/// The helper is needed to mask the behaviour of move operations.
BPL.Shape.prototype.getY = function BPL_Shape_getY()
{
	return (this._move ? this._move.y : this.model.yPos);
}

/// Hide this shape and its connections.
BPL.Shape.prototype.hide = function BPL_Shape_hide()
{
	if (this.svgGroup) this.svgGroup.setAttribute('visibility','hidden');
	this.hideConnections();
}

/// Hide this shape's connections.
BPL.Shape.prototype.hideConnections = function BPL_Shape_hideConnections()
{
	for (var i = 0; i < this.inputList.length; i++) {
		this.inputList[i].hide();
	}
	for (var i = 0; i < this.outputList.length; i++) {
		this.outputList[i].hide();
	}
}

/// Initialise this shape's SVG group during rendering.
BPL.Shape.prototype.initialiseGroup = function BPL_Shape_initialiseGroup()
{
	if ((!this.svgGroup) || (!this.svgGroup.parentNode)) {
		this.svgGroup = BPL.drawSVGElement(BPL.currentDiagram.svgRoot,'g', { "id":  "shapeGroup_" + this.model.Index } )
	}
	while (this.svgGroup && this.svgGroup.firstChild) {
		this.svgGroup.removeChild(this.svgGroup.firstChild);
	}
	var xPos = parseInt(this.model.xPos,10);
	var yPos = parseInt(this.model.yPos,10);
	this.svgGroup.setAttribute('transform','translate(' + xPos + ',' + yPos + ')');
	this.svgGroup.setAttribute('visibility','visible');
	this.svgGroup._shape = this;
}

/// Callback to override the position of any handles for subclasses.
BPL.Shape.prototype.initialiseHandles = function BPL_Shape_initialiseHandles() {};

/// Indicate whether this shape is valid.
BPL.Shape.prototype.isValid = function BPL_Shape_isValid()
{
	this.validate();
	return this.errors.length == 0;
}

/// Create the annotation SVG.
BPL.Shape.prototype.makeAnnotation = function BPL_Shape_makeAnnotation()
{
	if (this.annotation) this.deleteAnnotation();

	var x = this.handles.annotation.x;
	var y = this.handles.annotation.y;

	var showAnnotation = (this.model.Annotation !== '') && BPL.Options.showAnnotations && (this.model.ParentShape == BPL.currentDiagram.currentParent);
	var visibility =  showAnnotation ? 'visible' : 'hidden';
	var annoAttribs = { "visibility": visibility };
	this.annotation = BPL.drawSVGElement(this.svgGroup,'g',annoAttribs);
	var points = x + "," + y + " " + (x+32) + "," + (y-25) + " " + (x+160) + "," + (y-25);

	// line
	var lineAttribs = { "id": "shape_annotationLine_" + this.model.Index, "points": points, "class": "AnnotationLine" };
	BPL.drawSVGElement(this.annotation,"polyline",lineAttribs);

	// box under text
	var boxAttribs = { "id": "shape_annotationBox_" + this.model.Index, "class": "AnnotationBox", 
		"height": 60, "width": 400, "x": x+32, "y": y-23 };
	BPL.drawSVGElement(this.annotation,'rect',boxAttribs);

	// text
	var textAttribs = { "class": "AnnotationText", "text-anchor": "start",
		"x": x + 32, "y": y - 10, "id": "shape_annotationText_" + this.model.Index };
	var text = BPL.drawSVGElement(this.annotation,'text',textAttribs);

	// create the text node and append up to three lines of wrapped text.
	var wrappedText = BPL.wordwrapText(this.model.Annotation, 50);
	var wrappedArray = wrappedText.split('\n');
	var maxRows = 3;
	// create a set of tspans
	for (var i=0; (i <= maxRows) && (i < wrappedArray.length); i++) {
		var spanAttribs = { "class": "AnnotationText", "x": x + 32, "dy": i == 0 ? "0" : "1.1em" };
		var span = BPL.drawSVGElement(text,"tspan",spanAttribs);

		textNode = document.createTextNode(i < maxRows ? wrappedArray[i] : "...");
		span.appendChild(textNode);
	}
}

/// Create the input handle shape using the coordinates in handles.inputShape.
BPL.Shape.prototype.makeInputHandle = function BPL_Shape_makeInputHandle()
{
	if (!(this.handles && this.handles.inputShape)) return;

	var x = this.handles.inputShape.x;
	var y = this.handles.inputShape.y;

	var points = x + "," + y + " " + (x+10) + "," + (y-10) + " " + (x-10) + "," + (y-10) + " " + x + "," + y;
	var attribs = { "id": "shape_input_" + this.model.Index, "points": points, "class": "InputHandleOff" };
	var listeners = { "mousedown": BPL.inputHandle.mousedown, "mouseover": BPL.inputHandle.mouseover, "mouseout": BPL.inputHandle.mouseout };

	BPL.drawSVGElement(this.svgGroup,"polygon", attribs, listeners);
}

/// Create the output handle shape using the coordinates in handles.outputShape.
/// If isGoTo is true, this is an additional 'goto' handle and we use the coordinates in handles.gotoShape.
BPL.Shape.prototype.makeOutputHandle = function BPL_Shape_makeOutputHandle(isGoTo)
{
	var handleType = (isGoTo ? 'goto' : 'output') + 'Shape';
	if (!(this.handles && this.handles[handleType])) return;
	var x = this.handles[handleType].x;
	var y = this.handles[handleType].y;

	var attribs = { "id": "shape_output_" + (isGoTo ? "goto_" : "") + this.model.Index,
		"cx": x, "cy": y+5, "r": 5, "class": "OutputHandleOff" };
	var listeners = { "mouseover": BPL.outputHandle.mouseover, "mouseout": BPL.outputHandle.mouseout, "mousedown": BPL.outputHandle.mousedown };
	if (isGoTo) listeners.mousedown = BPL.outputHandle.mousedown_goto;

	BPL.drawSVGElement(this.svgGroup,'circle',attribs,listeners);
}

/// Complete a move operation and move the temporary coordinates into the model.
BPL.Shape.prototype.moveComplete = function BPL_Shape_moveComplete()
{
	this.model.xPos = Math.round(this._move.x);
	this.model.yPos = Math.round(this._move.y);
	this.moveDiscard();
}

/// Remove temporary coordinate information.
BPL.Shape.prototype.moveDiscard = function BPL_Shape_moveDiscard()
{
	delete this._move;
}

/// Set up temporary coordinates for a move operation.
BPL.Shape.prototype.moveInit = function BPL_Shape_moveInit()
{
	this._move = { "x": this.model.xPos, "y": this.model.yPos };
}

/// Move this shape to the specified coordinates.
BPL.Shape.prototype.moveTo = function BPL_Shape_moveTo(x,y)
{
	x = parseFloat(x);
	y = parseFloat(y);
	var xPos = Math.round(x);
	var yPos = Math.round(y);

	if (this._move) {
		this._move.x = xPos;
		this._move.y = yPos;
	}
	else {
		this.model.xPos = xPos;
		this.model.yPos = yPos;
	}

	// translate the group
	if (this.svgGroup) {
		var transform = 'translate(' + xPos + ',' + yPos + ')';
		this.svgGroup.setAttribute('transform',transform);
	}

	// now move any connectors we may have
	var i;
	for (i = 0; i < this.outputList.length; i++) {
		this.outputList[i].updatePath();
	}

	if (this.gotoConnection) this.gotoConnection.updatePath();

	for (i = 0; i < this.inputList.length; i++) {
		this.inputList[i].updatePath();
	}
}

/// Remove this shape from the SVG diagram, including any children and connections.
BPL.Shape.prototype.remove = function BPL_Shape_remove()
{
	if (this.svgGroup && this.svgGroup.parentNode) this.svgGroup.parentNode.removeChild(this.svgGroup);
	this.svgGroup = null;
	for (var i = 0; i < this.children.length; i++) {
		var child = this.children[i];
		if (child) child.remove();
	}
	if (this.model.ParentShape) {
		var parentShape = BPL.currentDiagram.shapeList[this.model.ParentShape];
		if (parentShape && parentShape.children) {
			var pos = parentShape.children.indexOf(this);
			if (pos != -1) parentShape.children.splice(pos,1);
		}
	}
	BPL.currentDiagram.shapeList[this.model.Index] = null;
	this.removeConnections();
}

/// Remove all connections starting or ending in this shape.
BPL.Shape.prototype.removeConnections = function BPL_Shape_removeConnections()
{
	for (var i = 0; i < this.inputList.length; i++) {
		this.inputList[i].remove();
	}
	for (var i = 0; i < this.outputList.length; i++) {
		this.outputList[i].remove();
	}
	if (this.gotoConnection) this.gotoConnection.remove();
}

/// Render this shape. Subclasses should override, but should call the two functions listed below.
BPL.Shape.prototype.render = function BPL_Shape_render()
{
	this.initialiseGroup();
	this.updateStyle();
}

/// Render all connections connected to this shape.
BPL.Shape.prototype.renderConnections = function BPL_Shape_renderConnections()
{
	for (var i = 0; i < this.inputList.length; i++) {
		this.inputList[i].render();
	}
	for (var i = 0; i < this.outputList.length; i++) {
		this.outputList[i].render();
	}
}

/// Test whether a connection can be made during a 'connect' operation and update the style accordingly.
BPL.Shape.prototype.testConnection = function BPL_Shape_testConnection()
{
	BPL.currentDiagram.currentTarget = null;

	if (BPL.rubberBand.type == 'output') { // can we accept an input?
		if (BPL.currentDiagram.startShape && (BPL.currentDiagram.startShape != this)) {
			if (this.canAcceptInput(BPL.currentDiagram.startShape)) BPL.currentDiagram.currentTarget = this;
		}
	}
	else if (BPL.rubberBand.type == 'goto') { // can we accept a goto input?
		if (BPL.currentDiagram.startShape && (BPL.currentDiagram.startShape != this) && (this.model.Type == 'label')) {
			BPL.currentDiagram.currentTarget = this;
		}
	}
	else { // can we accept an output?
		if (BPL.currentDiagram.endShape && (BPL.currentDiagram.endShape != this)) {
			if (this.canAcceptOutput(BPL.currentDiagram.endShape)) {
				BPL.currentDiagram.currentTarget = this;
			}
		}
	}

	this.updateStyle();
}

/// Correctly render or hide the current annotation.
BPL.Shape.prototype.updateAnnotation = function BPL_Shape_updateAnnotation()
{
	if (this.svgGroup) {
		if (!this.annotation) this.makeAnnotation();
		var visible = ((this.model.Annotation != '') && BPL.Options.showAnnotations && (this.model.ParentShape == BPL.currentDiagram.currentShape) ? 'visible' : 'hidden');
		this.annotation.setAttribute('visibility',visible);
	}
}

/// Update the bounding box for the current shape. This is a no-op by default, but is overridden by shapes which have a bounding box.
BPL.Shape.prototype.updateBoundingBox = function BPL_Shape_updateBoundingBox() {};

/// Update the bounding box to include shape. This is a no-op by default, but is overridden by shapes which have a bounding box.
BPL.Shape.prototype.updateBoundingBoxFromShape = function BPL_Shape_updateBoundingBoxFromShape(shape,depth) {};

/// Update the style of the current shape and its input and output handles.
BPL.Shape.prototype.updateStyle = function BPL_Shape_updateStyle()
{
	var el = document.getElementById('shape_main_' + this.model.Index);

	if (el) {
		var shapeClass = '';
		var checkSelected = true;
		if (BPL.currentDiagram.matchShapes && (BPL.currentDiagram.matchShapes[this.model.Index] == this)) {
			shapeClass = 'BPLShapeMatching';
			checkSelected = false;
		}
		else if (BPL.currentDiagram.moveShape) {
			shapeClass = 'BPLShapeMoving';
			checkSelected = false;
		}
		else if (!this.isValid()) {
			shapeClass = 'BPLShapeInvalid';
		}
		else if (this.model.Disabled) {
			shapeClass = 'BPLShapeDisabled';
		}
		else {
			shapeClass = this.shapeClass;
		}

		if (checkSelected && BPL.currentDiagram.isSelected(this)) {
			if (shapeClass = this.shapeClass) { shapeClass = 'BPLShapeSelected'; }
			else { shapeClass += 'Selected'; }
		}
		if (shapeClass != '') el.setAttribute('class',shapeClass);

		// input handle
		var handleIn = document.getElementById('shape_input_' + this.model.Index);
		if (handleIn) {
			var handleClass = '';
			if ((BPL.currentDiagram.currentTarget == this) && (BPL.rubberBand.type == 'output')) { // this shape is a connection target
				handleClass = 'InputHandleAccept';
			}
			else if ((BPL.currentDiagram.currentTarget == this) && (BPL.rubberBand.type == 'goto') && (this.model.Type == 'label')) { // this shape is a branch target
				handleClass = 'InputHandleAccept';
			}
			else if ((BPL.currentDiagram.endShape == this) && (BPL.rubberBand.type == 'input')) { // this shape is the target of a connection
				handleClass = 'InputHandleAccept';
			}
			else {
				handleClass = 'InputHandle' + ((this.inputList.length > 0) ? 'On' : 'Off');
			}
			if (handleClass != '') handleIn.setAttribute('class',handleClass);
		}

		// output handle
		var handleOut = document.getElementById('shape_output_' + this.model.Index);
		if (handleOut) {
			var handleClass = '';
			if ((BPL.currentDiagram.currentTarget == this) && (BPL.rubberBand.type == 'input')) { // this shape is a connection target
				handleClass = 'OutputHandleAccept';
			}
			else if ((BPL.currentDiagram.startShape == this) && (BPL.rubberBand.type == 'output')) { // this shape is the start of a connection
				handleClass = 'OutputHandleAccept';
			}
			else {
				handleClass = 'OutputHandle' + ((this.outputList.length > 0) ? 'On' : 'Off');
			}
			if (handleClass != '') handleOut.setAttribute('class',handleClass);
		}
	}
}

/// Base implementation which should be overridden by subclasses.
BPL.Shape.prototype.validate = function BPL_Shape_validate() { this.errors = []; };

/// Validate all children of the current shape.
BPL.Shape.prototype.validateChildren = function BPL_Shape_validateChildren()
{
	var valid = true;
	for (var i = 0; i < this.children.length; i++) {
		var childShape = this.children[i];
		if (childShape) {
			childShape.validate();
			if (childShape.errors.length > 0) {
				valid = false;
				break;
			}
		}
	}
	return valid;
}

/// Constructor for an Activity.
BPL.Activity = function BPL_Activity()
{
	BPL.Shape.call(this);
}
/// Inherit from BPL.Shape.
BPL.Activity.inheritFrom(BPL.Shape);

/// List of Activity shapes which are groups.
BPL.Activity.groupList = [ 'sequence', 'foreach', 'until', 'while', 'compensationhandler', 'catch', 'catchall' ];
/// List of all Activity shapes.
BPL.Activity.shapeList = [ 'assign', 'break', 'call', 'catch', 'catchall', 'code', 'compensate', 'compensationhandler', 'continue', 'delay', 'empty', 'foreach', 'milestone', 
	'rule', 'sequence', 'sql', 'sync', 'throw', 'trace', 'transform', 'until', 'while', 'xpath', 'xslt' ];
/// Indicate whether the supplied type is a group.
BPL.Activity.isGroup = function BPL_Activity_isGroup(type)
{
	return BPL.Activity.groupList.contains(type);
}

/// Create an Activity from a model.
BPL.Activity.create = function BPL_Activity_create(model,updateLocation)
{
	var shape = this._super.create.call(this,model,updateLocation);
	if (shape && (model.Type == 'milestone') && (model.Name == '')) model.Name = 'M' + (BPL.currentDiagram.milestoneCounter++);
	return shape;
}

/// Handle mouse events in group drilldown indicator.
BPL.Activity.events = {
	/// Click handler for drilldown indicator
	"click": function BPL_Activity_events_click(evt) {
		var el = evt.target;
		evt.stopPropagation();
		if (evt.detail == 2) return;

		// pull out shape # from id
		var s = el.getAttribute('id').split('_');
		var index = s[1] * 1;

		BPL.currentDiagram.setCurrentParent(index);
	},
	/// Change the style during mouseover.
	"mouseover": function BPL_Activity_events_mouseover(evt) {
		evt.target.setAttribute('fill','orange');
	},
	/// Change the style back after the mouse moves away.
	"mouseout": function BPL_Activity_events_mouseout(evt) {
		evt.target.setAttribute('fill','white');
	}
}

/// Initialise the handles for this Activity.
BPL.Activity.prototype.initialiseHandles = function BPL_Activity_initialiseHandles()
{
	this.handles.input.y = -35;
	this.handles.output.y = 30;
	this.handles.output.x = 0;
	this.handles.inputShape.y = -25;
	this.handles.outputShape.y = 25;
	this.handles.annotation.x = BPL.Constant.shape.width/2
	this.handles.annotation.y = -((BPL.Constant.shape.height-10)/2);
}

/// Render the shape.
BPL.Activity.prototype.render = function BPL_Activity_render()
{
	this.initialiseGroup();
	var mainAttrs = { "rx": 10, "x": -(BPL.Constant.shape.width / 2), "y": -(BPL.Constant.shape.height / 2), 
		"width": BPL.Constant.shape.width, "height": BPL.Constant.shape.height,
		"id": "shape_main_" + this.model.Index, "class": this.normalClass };
	var mainListeners = { "mousedown": BPL.Shape.events.mousedown, "mouseover": BPL.Shape.events.mouseover, "mouseout": BPL.Shape.events.mouseout };
	var main = BPL.drawSVGElement(this.svgGroup,'rect',mainAttrs,mainListeners);

	// if this is a grouping or looping tag, add the group symbol
	if (BPL.Activity.isGroup(this.model.Type)) {
		var outlineAttrs = { "points": "-8,25 -8,11 8,11 8,25", "style": "fill: none; opacity: 0.5; stroke: #8080D0; stroke-width: 2;" };
		var outline = BPL.drawSVGElement(this.svgGroup,'polyline',outlineAttrs);

		var interiorAttrs = { "id": "groupInterior_" + this.model.Index, "x": -8, "y": 10, "width": 16, "height": 14, "rx": 2,
			"fill": "white", "style": "opacity: 0.5; stroke: none; stroke-width: 0;" };
		var interiorListeners = { "click": BPL.Activity.events.click, "mouseover": BPL.Activity.events.mouseover, "mouseout": BPL.Activity.events.mouseout };
		var interior = BPL.drawSVGElement(this.svgGroup,'rect',interiorAttrs,interiorListeners);

		var crossSymbol = [ 'sequence', 'compensationhandler', 'catch', 'catchall' ];
		var loopSymbol = [ 'foreach', 'until', 'while' ];
		if (crossSymbol.contains(this.model.Type)) {
			// Add a + symbol
			var listeners = { "click": BPL.Activity.events.click };
			var horizAttribs = { "id": "groupHz_" + this.model.Index, "x1": -4, "y1":17, "x2": 4, "y2": 17, "style": "stroke: #8080D0; stroke-width: 2;" };
			BPL.drawSVGElement(this.svgGroup,'line',horizAttribs,listeners);

			var vertAttribs = { "id": "groupVt_" + this.model.Index, "x1": 0, "y1": 13, "x2": 0, "y2": 22, "style": "stroke: #8080D0; stroke-width: 2;" };
			BPL.drawSVGElement(this.svgGroup,'line',vertAttribs,listeners);
		}
		else if (loopSymbol.contains(this.model.Type)) {
			// Add a loop symbol
			var loopAttribs = { "id": "groupLoop_" + this.model.Index, "d":  BPL.Constant.icons.loopGroup, "style": "stroke: #8080D0; stroke-width: 2; fill: none;" };
			var loopListeners = { "click": BPL.Activity.events.click };
			BPL.drawSVGElement(this.svgGroup,'path',loopAttribs,loopListeners);
		}
	}

	var icon = null;
	var drawIcon = true;
	var iconType = 'path';
	var iconAttribs = { "id": "icon_" + this.model.Index, "class": "BPLActivityIcon" };
	var iconListeners = {};
	switch (this.model.Type) {
		case 'delay':
			iconType = 'circle';
			iconAttribs.cx = 100;
			iconAttribs.cy = 8;
			iconAttribs.r = 12;
			iconListeners.mousedown = BPL.events.mousedown;

			var tickAttribs = { "x1": 100, "x2": 100, "y1": -4, "y2": 0, "class": "BPLActivityIcon" };
			for (var i = 0; i < 12; i++) {
				tickAttribs.transform = 'rotate(' + (30*i) + ',100,8)';
				BPL.drawSVGElement(this.svgGroup,'line',tickAttribs);
			}

			// second hand
			tickAttribs.transform = 'rotate(-15,100,8)';
			tickAttribs.y2 = 8;
			BPL.drawSVGElement(this.svgGroup,'line',tickAttribs);
			break;
		case 'call':
			iconAttribs.d = (this.model.PropertyBag.Async.toString() == '1') ? BPL.Constant.icons.call_Async : BPL.Constant.icons.call_Sync;
			break;
		case 'sql':
			iconAttribs.d = BPL.Constant.icons.code;
			break;
		case 'catch':
		case 'catchall':
			iconAttribs.d = BPL.Constant.icons.catchall;
			iconAttribs.style = 'fill: gray;';

			var ellipseAttribs = { "cx": 100, "cy": 3, "rx": 8, "ry": 2.5, "class": "BPLActivityIcon", "style": "fill: darkblue; opacity: 1.0;" };
			BPL.drawSVGElement(this.svgGroup,'ellipse',ellipseAttribs);

			var lineAttribs = { "x1": 101, "y1": -7, "x2": 101, "y2": -14, "class": "BPLActivityIcon" };
			BPL.drawSVGElement(this.svgGroup,'line',lineAttribs);

			var line2Attribs = { "x1": 99, "y1": -7, "x2": 99, "y2": -14, "class": "BPLActivityIcon" };
			BPL.drawSVGElement(this.svgGroup,'line',line2Attribs);

			var circleAttribs = { "cx": 100, "cy": -4, "r": 2, "class": "BPLActivityIcon", "style": "fill: red;" };
			BPL.drawSVGElement(this.svgGroup,'circle',circleAttribs);
			break;
		case 'rule':
			drawIcon = false;
			iconAttribs['class'] = 'BPLActivityIconText';
			iconAttribs.x = '105';
			iconAttribs.y = 10;
			iconAttribs['text-anchor'] = 'middle';

			icon = BPL.drawSVGElement(this.svgGroup,'text',iconAttribs);
			var textNode = document.createTextNode('f(x)');
			icon.appendChild(textNode);
			break;
		default:
			if (this.model.Type == 'assign') iconAttribs.style = 'stroke-width: 1.8;';
			iconAttribs.d = BPL.Constant.icons[this.model.Type];
			break;
	}
	
	if (drawIcon) icon = BPL.drawSVGElement(this.svgGroup,iconType,iconAttribs,iconListeners);

	// type label
	var textAttribs = { "x": 0, "y": -12, "text-anchor": "middle", "class": "ActivityType" };
	var textEl = BPL.drawSVGElement(this.svgGroup,'text',textAttribs);
	var textNode = document.createTextNode('<' + this.model.Type + '>');
	textEl.appendChild(textNode);

	var lineAttribs = { "x1": -(BPL.Constant.shape.width - 1)/2, "y1": -8, "x2": (BPL.Constant.shape.width - 1)/2, "y2": -8, "style": "stroke: #808080; stroke-width: 0.6;"};
	BPL.drawSVGElement(this.svgGroup,'line',lineAttribs);

	var nameAttribs = { "class": "ShapeName", "clip-path": "url(#clipPath_activity" + (icon ? 'Icon' : '') + ')',
		"id": "shape_label_" + this.model.Index, "text-anchor": "middle", "x": (icon ? -5 : 0), "y": 9.5 };
	var nameEl = BPL.drawSVGElement(this.svgGroup,'text',nameAttribs);
	var nameText = document.createTextNode(this.model.Name);
	nameEl.appendChild(nameText);
	
	// Optional python icon displayed on <assign> and other components
	if ((this.model.PropertyBag) && ('python'==this.model.PropertyBag.LanguageOverride)) {
		if (['assign','code','trace','milestone','while','until','call'].contains(this.model.Type)) {
			var pyHint={}; 
			pyHint.attribs = {"x": 62, "y": 0, "width": "18px", "height": "18px", "href": "images/python-logo-only.png"}
			BPL.drawSVGElement(this.svgGroup,'image',pyHint.attribs);
		} 
	}

	this.makeInputHandle();
	this.makeOutputHandle();
	this.makeAnnotation();

	this.updateStyle();
}

/// Validate this Activity.
BPL.Activity.prototype.validate = function BPL_Activity_validate()
{
	this.errors = [];

	if (this.inputList.length == 0) this.errors.push(BPL.getLocalText('NoInput'));
	if (this.outputList.length == 0) this.errors.push(BPL.getLocalText('NoOutput'));
	if ((this.children.length > 0) && !this.validateChildren()) this.errors.push(BPL.getLocalText('ChildErrors','',this.model.Type));

	// Additional validation
	// No further validation needed for:
	//		catchall, compensationhandler, empty, sequence
	switch (this.model.Type) {
		case 'assign':
			if (this.model.PropertyBag['Property'].toString() == '') this.errors.push(BPL.getLocalText('NoAttr','Property',this.model.Type));
			if (this.model.PropertyBag['Value'].toString() == '') this.errors.push(BPL.getLocalText('NoAttr','Value',this.model.Type));
			break;
		case 'break':
		case 'continue':
			// test if we are inside a loop
			var parent = BPL.currentDiagram.shapeList[this.model.ParentShape];
			var inloop = false;
			while (!inloop && parent) {
				var ptype = parent.model.Type;
				if ((ptype == 'foreach') || (ptype == 'until') || (ptype == 'while')) {
					inloop = true;
				}
				else {
					parent = BPL.currentDiagram.shapeList[parent.model.ParentShape];
				}
			}
			if (!inloop) this.errors.push(BPL.getLocalText('LoopReq',this.model.Type));
			break;
		case 'call':
			if (this.model.Name == '') this.errors.push(BPL.getLocalText('NoAttr','Name',this.model.Type));
			// Only check for duplicates if this is not Async, has a response type defined, and the name isn't using indirection
			try {
				if (this.model.PropertyBag['Async'] && (this.model.PropertyBag['Async'].toString() == '0') && (this.model.Response.Type != '') && (!this.model.Name.startsWith('@'))) {
					for (var si=0,dupe=-1,tot=BPL.currentDiagram.shapeList.length; si < tot; si++) {
						try {
							if ((BPL.currentDiagram.shapeList[si].model.Type=='call') && (BPL.currentDiagram.shapeList[si].model.Name==this.model.Name) && (BPL.currentDiagram.shapeList[si].model.PropertyBag['Async']) && (BPL.currentDiagram.shapeList[si].model.PropertyBag['Async'].toString() == '0') && (BPL.currentDiagram.shapeList[si].model.Response.Type != '')) {
								dupe++;
							} 
						} catch (edupe) {}
					}
					if (dupe) {this.errors.push(BPL.getLocalText('DupeCallName','Name',this.model.Name));}
				}
			} catch (eresp) {}
			if (this.model.PropertyBag['Target'] == '') this.errors.push(BPL.getLocalText('NoAttr','Target',this.model.Type));
			if ((!this.model.Request) || (this.model.Request.Type == '')) this.errors.push(BPL.getLocalText('NoAttr','Request',this.model.Type));
			// Sync calls do not require a response
			// if ((this.model.PropertyBag['Async'].toString() == '0') && ((!this.model.Response) || (this.model.Response.Type == ''))) this.errors.push(BPL.getLocalText('NoAttr','Response',this.model.Type));
			if (this.model.PropertyBag['Async'] && (this.model.PropertyBag['Async'].toString() != '0')) { // no timeout allowed for async calls
				if (this.model.PropertyBag['Timeout']) this.errors.push(BPL.getLocalText('AsyncTimeout','Target',this.model.Type));
			}
			break;
		case 'catch':
			if (this.model.PropertyBag['Fault'] == '') this.errors.push(BPL.getLocalText('NoAttr','Fault',this.model.Type));
			break;
		case 'compensate':
			if (this.model.PropertyBag['Target'] == '') this.errors.push(BPL.getLocalText('NoAttr','Target',this.model.Type));
			break;
		case 'delay':
			if ((this.model.PropertyBag['Until'].toString() == '') && (this.model.PropertyBag['Duration'].toString() == '')) this.errors.push(BPL.getLocalText('NoDuration'));
			if ((this.model.PropertyBag['Until'].toString() != '') && (this.model.PropertyBag['Duration'].toString() != '')) this.errors.push(BPL.getLocalText('NoDuration2'));
			break;
		case 'foreach':
			if (this.model.PropertyBag['Property'] == '') this.errors.push(BPL.getLocalText('NoAttr','Property',this.model.Type));
			if (this.model.PropertyBag['Key'] == '') this.errors.push(BPL.getLocalText('NoAttr','Key',this.model.Type));
			break;
		case 'milestone':
			if (this.model.PropertyBag['Value'].toString() == '') this.errors.push(BPL.getLocalText('NoAttr','Value',this.model.Type));
			break;
		case 'rule':
			if (this.model.Name == '') this.errors.push(BPL.getLocalText('NoAttr','Name',this.model.Type));
			if (this.model.PropertyBag['Rule'] == '') this.errors.push(BPL.getLocalText('NoAttr','Rule',this.model.Type));
			break;
		case 'sync':
			if (this.model.PropertyBag['Calls'] == '') {
				this.errors.push(BPL.getLocalText('NoAttr','Calls',this.model.Type));
			}
			else {
				var calls = this.model.PropertyBag['Calls'].toString().split(',');
				var names = BPL.currentDiagram.listNames();
				for (var i = 0; i < calls.length; i++) {
					var currCall = calls[i];
					// assume '@xxx' is valid indirection
					if (((currCall.charAt(0) != '@') || (currCall == '@')) && (!names.contains(currCall))) this.errors.push(BPL.getLocalText('BadCall',currCall));
				}
			}
			break;
		case 'throw':
			if (this.model.PropertyBag['Fault'] == '') this.errors.push(BPL.getLocalText('NoAttr','Fault',this.model.Type));
			break;
		case 'trace':
			if (this.model.PropertyBag['Value'].toString() == '') this.errors.push(BPL.getLocalText('NoAttr','Value',this.model.Type));
			break;
		case 'transform':
			if (this.model.PropertyBag['Class'] == '') this.errors.push(BPL.getLocalText('NoAttr','Class',this.model.Type));
			if (this.model.PropertyBag['Source'] == '') this.errors.push(BPL.getLocalText('NoAttr','Source',this.model.Type));
			if (this.model.PropertyBag['Target'] == '') this.errors.push(BPL.getLocalText('NoAttr','Target',this.model.Type));
			break;
		case 'until':
		case 'while':	
			if (this.model.PropertyBag['Condition'].toString() == '') this.errors.push(BPL.getLocalText('NoAttr','Condition',this.model.Type));
			break;
		case 'xpath':
			if (this.model.PropertyBag['Source'] == '') this.errors.push(BPL.getLocalText('NoAttr','Source',this.model.Type));
			if (this.model.PropertyBag['Property'] == '') this.errors.push(BPL.getLocalText('NoAttr','Property',this.model.Type));
			if (this.model.PropertyBag['Context'] == '') this.errors.push(BPL.getLocalText('NoAttr','Context',this.model.Type));
			if (this.model.PropertyBag['Expression'].toString() == '') this.errors.push(BPL.getLocalText('NoAttr','Expression',this.model.Type));
			break;
		case 'xslt':
			if (this.model.PropertyBag['XSLURL'] == '') this.errors.push(BPL.getLocalText('NoAttr','XSLURL',this.model.Type));
			if (this.model.PropertyBag['Source'] == '') this.errors.push(BPL.getLocalText('NoAttr','Source',this.model.Type));
			if (this.model.PropertyBag['Target'] == '') this.errors.push(BPL.getLocalText('NoAttr','Target',this.model.Type));
			break;
	}
}

/// Constructor for a Decision.
BPL.Decision = function BPL_Decision()
{
	BPL.Shape.call(this);
}
/// Inherit from BPL.Shape.
BPL.Decision.inheritFrom(BPL.Shape);

/// Create a new Decision from a model.
BPL.Decision.create = function BPL_Decision_create(model,updateLocation)
{
	var shape = this._super.create.call(this,model,updateLocation);
	if (model.Type == 'switch') { shape.outputType = 'case'; }
	else if (model.Type == 'if') { shape.outputType = 'branch'; }
	return shape;
}
/// List of Decision shapes.
BPL.Decision.shapeList = [ 'if', 'branch', 'switch' ];

/// Implement more specific tests for canAcceptOutput().
BPL.Decision.prototype.canAcceptOutput = function BPL_Decision_canAcceptOutput(targetShape)
{
	// test if we are already connected to shape
	for (var i = 0; i < this.outputList.length; i++) {
		if (this.outputList[i].toShape == targetShape) return false;
	}

	// <if> can only have 2 connections
	if ((this.model.Type == 'if') && (this.outputList.length >= 2)) return false;

	// <branch> can only have 1 connection out
	// (the "goto" connection is a special case)
	if ((this.model.Type == 'branch') && (this.outputList.length >= 1)) return false;

	return true;
}

/// Initialise the shape handles for this shape.
BPL.Decision.prototype.initialiseHandles = function BPL_Decision_initialiseHandles()
{
	this.handles.inputShape.y = -30;
	this.handles.outputShape.y = 30;
	this.handles.input.y = -30;
	this.handles.output.y = 30;
	this.handles.annotation.x = 82;
	this.handles.annotation.y = -8;
	if (this.model.Type == 'branch') {
		this.handles['goto'] = { "x":  -100, "y": 0 };
		this.handles['gotoShape'] = { "x":  -100, "y": -5 };
	}
}

/// Render this shape.
BPL.Decision.prototype.render = function BPL_Decision_render()
{
	this.initialiseGroup();

	var mainAttribs = { "id": "shape_main_" + this.model.Index, "points":  "-100,0 0,-30 100,0 0,30 -100,0", "class": this.shapeClass };
	var mainListeners = { "mousedown": BPL.Shape.events.mousedown, "mouseover": BPL.Shape.events.mouseover, "mouseout": BPL.Shape.events.mouseout };
	BPL.drawSVGElement(this.svgGroup,'polygon',mainAttribs,mainListeners);

	// type label
	var labelAttribs = { "class": "ActivityType", "text-anchor": "middle", "x": 0, "y": -12 };
	var label = BPL.drawSVGElement(this.svgGroup,'text',labelAttribs);

	// create the text node and append it
	var labelText = document.createTextNode('<' + this.model.Type + '>');
	label.appendChild(labelText);

	var nameAttribs = { "class": "ShapeName", "clip-path": "url(#clipPath_decision)", "x": 0, "y": 7,
		"id": "shape_label_" + this.model.Index, "text-anchor": "middle" };
	var name = BPL.drawSVGElement(this.svgGroup,'text',nameAttribs);

	var nameText = document.createTextNode(this.model.Name);
	name.appendChild(nameText);

	// input and output handles
	this.makeInputHandle();
	this.makeOutputHandle();

	// additional output handle for branch
	if (this.model.Type == 'branch') this.makeOutputHandle(true);

	this.makeAnnotation();
	this.updateStyle();
	
	// Optional python icon displayed on <if> or <branch> components
	if ((this.model.Type=='if')||(this.model.Type=='branch')) {
		if ((this.model.PropertyBag) && ('python'==this.model.PropertyBag.LanguageOverride)) {
			var pyHint={};
			pyHint.attribs = {"x": 35, "y": -35, "width": "18px", "height": "18px", "href": "images/python-logo-only.png"}
			BPL.drawSVGElement(this.svgGroup,'image',pyHint.attribs);
		}
	}
}

/// Update this shape's style.
BPL.Decision.prototype.updateStyle = function BPL_Decision_updateStyle()
{
	this._super.updateStyle.call(this);
	// update goto handle if this is a branch
	if (this.model.Type == 'branch') {
		var handleGoTo = document.getElementById('shape_output_goto_' + this.model.Index);
		if (handleGoTo) {
			var handleClass = '';
			if ((BPL.currentDiagram.startShape == this) && (BPL.rubberBand.type == 'goto')) { // this is the start of a connection
				handleClass = 'OutputHandleAccept';
			}
			else {
				handleClass = 'OutputHandle' + (this.gotoConnection ? 'On' : 'Off');
			}
			if (handleClass != '') handleGoTo.setAttribute('class',handleClass);
		}
	}
}

/// Implement validation code.
BPL.Decision.prototype.validate = function BPL_Decision_validate()
{
	this.errors = [];

	if (this.inputList.length == 0) this.errors.push(BPL.getLocalText('NoInput'));
	if (this.outputList.length == 0) this.errors.push(BPL.getLocalText('NoOutput'));

	// test for connections to too many joins
	if (this.model.Type != 'branch') {
		var match = BPL.currentDiagram.findMatchingShapes(this);
		var c = 0;
		for (var n in match) {
			c++;
		}
		// outgoing connections must terminate at exactly one join
		if (c > 1) this.errors.push(BPL.getLocalText('BranchBadJoin',this.model.Type));
		if (c == 0) this.errors.push(BPL.getLocalText('BranchNoJoin',this.model.Type));
	}

	// additional validation
	switch (this.model.Type) {
		case 'branch':
			if (this.model.PropertyBag['Condition'].toString() == '') this.errors.push(BPL.getLocalText('NoAttr','Condition',this.model.Type));

			if (this.gotoConnection == null) {
				this.errors.push(BPL.getLocalText('NoAttr','Label',this.model.Type));
			}
			else if (this.model.PropertyBag['Label'].toString() == '') {
				this.errors.push(BPL.getLocalText('NoAttr','Label.Name',this.model.Type));
			}
			break;
		case 'if':
			if (this.model.PropertyBag['Condition'].toString() == '') this.errors.push(BPL.getLocalText('NoAttr','Condition',this.model.Type));

			var counter = { "true": 0, "false": 0 };
			for (var n = 0; n < this.outputList.length; n++) {
				var connect = this.outputList[n];
				if ((connect.model.Name == 'true') || (connect.model.Name == 'false')) {
					counter[connect.model.Name]++;
				}
				else { // if branch must be either true or false
					this.errors.push(BPL.getLocalText('BranchTORF',this.model.Type));
				}
			}

			// there has to be exactly one true branch and at most one false branch
			if (counter['true'] == 0) this.errors.push(BPL.getLocalText('BranchTrueReq',this.model.Type));
			if (counter['true'] > 1) this.errors.push(BPL.getLocalText('BranchTrueExcess',this.model.Type));
			if (counter['false'] > 1) this.errors.push(BPL.getLocalText('BranchFalseExcess',this.model.Type));
			break;
		case 'switch':
			// check the outgoing connections
			var count = { "default": 0, "case": 0 };
			for (var n = 0; n < this.outputList.length; n++) {
				var connect = this.outputList[n];
				count[ (connect.model.Condition.toString() == '') ? 'default' : 'case' ]++;
			}

			// there must be a non-default case, and only one default case
			if (count['case'] == 0) this.errors.push(BPL.getLocalText('BranchCaseReq',this.model.Type));
			if (count['default'] > 1) this.errors.push(BPL.getLocalText('BranchDefExcess',this.model.Type));
			break;
	}
}

/// Constructor for an Event.
BPL.Event = function BPL_Event()
{
	BPL.Shape.call(this);
	this.shapeClass = 'BPLEvent';
}
/// Inherit from BPL.Shape.
BPL.Event.inheritFrom(BPL.Shape);

/// Create a new Event from a model.
BPL.Event.create = function BPL_Event_create(model,updateLocation)
{
	var shape = this._super.create.call(this,model,updateLocation);
	if ((model.Type == 'end') || (model.Type == 'start')) shape.shapeClass += model.Type.charAt(0).toUpperCase() + model.Type.substring(1);
	return shape;
}
/// List all Event shapes.
BPL.Event.shapeList = [ 'alert', 'end', 'label', 'receive', 'reply', 'start' ];

/// Add extra conditions for canAcceptInput().
BPL.Event.prototype.canAcceptInput = function BPL_Event_canAcceptInput(sourceShape)
{
	if (this.model.Type == 'start') return false;

	// labels can accept only one non-goto connection
	if (this.model.Type == 'label') {
		for (var i = 0; i < this.inputList.length; i++) {
			var conn = this.inputList[i];
			if (conn && conn.model.ConnectType != 'goto') return false;
		}
		return true;
	}

	// cannot connect start to end directly, except inside a group
	if (sourceShape && (!sourceShape.model.ParentShape) && (this.model.Type == 'end') && (sourceShape.model.Type == 'start')) return false;

	// test for existing inputs and whether we are already connected
	return this._super.canAcceptInput.call(this,sourceShape);
}

/// Add extra conditions for canAcceptOutput().
BPL.Event.prototype.canAcceptOutput = function BPL_Event_canAcceptOutput(targetShape)
{
	if (this.model.Type == 'end') return false;

	// cannot connect start to end directly, except inside a group
	if (targetShape && (!targetShape.model.ParentShape) && (this.model.Type == 'start') && (targetShape.model.Type == 'end')) return false;

	// check for existing outputs and whether we are already connected
	return this._super.canAcceptOutput.call(this,targetShape);
}

/// Extend canCopy() to avoid copying start and end shapes.
BPL.Event.prototype.canCopy = function BPL_Event_canCopy(warnings)
{
	var canCopy = this._super.canCopy.call(this,warnings);
	if (!warnings) warnings = [];
	if ((this.model.Type == 'start') || (this.model.Type == 'end')) {
		warnings.push(BPL.getLocalText('EDCannotCopy',this.model.Type));
		canCopy = false;
	}
	return canCopy;
}

/// Extend canDelete() to avoid deleting start and end shapes.
BPL.Event.prototype.canDelete = function BPL_Event_canDelete(warnings)
{
	var canDelete = this._super.canDelete.call(this,warnings);
	if (!warnings) warnings = [];
	if (((this.model.Type == 'start') || (this.model.Type == 'end')) &&
				((this.model.ParentShape == null)||(BPL.currentDiagram.selectedItems.contains(this)))) {
		warnings.push(BPL.getLocalText('EDCannotDelete',this.model.Type));
		canDelete = false;
	}
	return canDelete;
}

/// Extend hideConnections() to hide a gotoConnection if it's present.
BPL.Event.prototype.hideConnections = function BPL_Event_hideConnections()
{
	this._super.hideConnections.call(this);
	if (this.gotoConnection) this.gotoConnection.hide();
}

/// Initialise handles.
BPL.Event.prototype.initialiseHandles = function BPL_Event_initialiseHandles()
{
	this.handles.input.y = -30;
	this.handles.output.y = 35;
	this.handles.inputShape.y = -30;
	this.handles.outputShape.y = 30;
	this.handles.annotation.x = 22;
	this.handles.annotation.y = -22;
}

/// Render this shape.
BPL.Event.prototype.render = function BPL_Event_render()
{
	this.initialiseGroup();

	var mainAttribs = { "id": "shape_main_" + this.model.Index,
		"cx": 0, "cy": 0, "r": 30, "class": this.shapeClass
	};
	var mainListeners = { "mousedown": BPL.Shape.events.mousedown, "mouseover": BPL.Shape.events.mouseover, "mouseout": BPL.Shape.events.mouseout };
	var main = BPL.drawSVGElement(this.svgGroup,'circle',mainAttribs,mainListeners);

	var labelOffset = 0;
	var noText = false;

	var icon1 = { "shape": null };
	var icon2 = { "shape": null };
	if ((this.model.Type != "start") && (this.model.Type != "end")) {
		// double line for intermediate events
		var innerAttribs = { "cx": 0, "cy": 0, "r": 27, "class": "BPLEventInner" };
		var inner = BPL.drawSVGElement(this.svgGroup,'circle',innerAttribs);

		switch (this.model.Type) {
			case 'receive':
				noText = true;
				labelOffset = 4;

				// draw envelope icon
				icon1.shape = 'rect';
				icon1.attribs = { "x": -15, "y": -4, "width": 30, "height": 20, "class": "BPLEventIcon" };
				icon1.listeners = { "mousedown": BPL.Shape.events.mousedown };

				icon2.shape = 'polyline';
				icon2.attribs = { "points": "15,-4 0,6 -15,-4", "class": "BPLEventIcon" };
				icon2.listeners = { "mousedown": BPL.Shape.events.mousedown };
				break;
			case 'reply':
				noText = true;
				icon1.shape = 'polyline';
				icon1.attribs = { "class": "BPLEventIcon", "points": "8,-6 8,8 -12,8 -12,14 -20,4 -12,-6 -12,0 2,0 2,-6 5,-5 8,-6" };
				icon1.listeners = { "mousedown": BPL.Shape.events.mousedown };
				break;
			case 'alert':
				noText = true;
				// draw alert icon
				icon1.shape = 'ellipse';
				icon1.attribs = { "cx": 0, "cy": 2, "rx": 3, "ry": 9, "class": "BPLEventIcon" };
				icon1.listeners = { "mousedown": BPL.Shape.events.mousedown };

				icon2.shape = 'circle';
				icon2.attribs = { "cx": 0, "cy": 18, "r": 3, "class": "BPLEventIcon" };
				icon2.listeners = { "mousedown": BPL.Shape.events.mousedown };
				break;
			case 'reply':
			case 'label':
				noText = false;
				break;
		}
	}
	if (icon1.shape != null) BPL.drawSVGElement(this.svgGroup,icon1.shape,icon1.attribs,icon1.listeners);
	if (icon2.shape != null) BPL.drawSVGElement(this.svgGroup,icon2.shape,icon2.attribs,icon2.listeners);

	// type label
	var labelAttribs = { "class": "ActivityType", "clip-path": "url(#clipPath_event)", "text-anchor": "middle", "x": 0, "y": -11 + labelOffset };
	var label = BPL.drawSVGElement(this.svgGroup,'text',labelAttribs);

	// create the text node and append it
	var textNode = document.createTextNode('<' + this.model.Type + '>');
	label.appendChild(textNode);

	// text
	if (!noText) {
		labelAttribs = { "class": "ShapeName", "clip-path": "url(#clipPath_event)", "text-anchor": "middle",
			"x": 0, "y": 7, "id": "shape_label_" + this.model.Index };
		var text = BPL.drawSVGElement(this.svgGroup,'text',labelAttribs);

		// create the text node and append it
		var textNode = document.createTextNode(this.model.Name);
		text.appendChild(textNode);

		this.svgGroup.appendChild(text);
	}
	
	// Optional python icon displayed on <alert> component
	if ((this.model.PropertyBag) && ('python'==this.model.PropertyBag.LanguageOverride)) {
		var pyHint={};
		if ((this.model.Type == 'alert')) {
			pyHint.attribs = {"x": 9, "y": -3, "width": "18px", "height": "18px", "href": "images/python-logo-only.png"}
			BPL.drawSVGElement(this.svgGroup,'image',pyHint.attribs);
		}
	}

	if (this.model.Type != 'start') this.makeInputHandle();
	if (this.model.Type != 'end') this.makeOutputHandle();
	this.makeAnnotation();
	this.updateStyle();
}

/// Extend renderConnections to include this shape's gotoConnection.
BPL.Event.prototype.renderConnections = function BPL_Event_renderConnections()
{
	this._super.renderConnections.call(this);
	if (this.gotoConnection) this.gotoConnection.render();
}

/// Implement validation.
BPL.Event.prototype.validate = function BPL_Event_validate()
{
	this.errors = [];

	if (this.model.Type == 'start') {
		if (this.outputList.length != 1) this.errors.push(BPL.getLocalText('NoOutput'));
	}
	else if (this.model.Type == 'end') {
		if (this.inputList.length != 1) this.errors.push(BPL.getLocalText('NoInput'));
	}
	else {
		if ((this.model.Type == 'alert') && ((this.model.PropertyBag.Value == null) || (this.model.PropertyBag.Value == ''))) this.errors.push(BPL.getLocalText('NoAttr','Value',this.model.Type));
		if ((this.model.Type == 'label') && (this.model.Name == '')) this.errors.push(BPL.getLocalText('NoAttr','Name',this.model.Type));
		if ((this.model.Type == 'receive') && ((this.model.Request == '') || (this.model.Request == null))) this.errors.push(BPL.getLocalText('NoAttr','Request',this.model.Type));
		if (this.inputList.length == 0) this.errors.push(BPL.getLocalText('NoInput'));
		if (this.outputList.length == 0) this.errors.push(BPL.getLocalText('NoOutput'));
	}
}

/// Constructor for Flow.
BPL.Flow = function BPL_Flow()
{
	BPL.Shape.call(this);
	this.outputType = 'thread';
}
/// Extend BPL.Shape.
BPL.Flow.inheritFrom(BPL.Shape);

/// Create a Flow shape from a model.
BPL.Flow.create = function BPL_Flow_create(model,updateLocation)
{
	return this._super.create.call(this,model,updateLocation);
}

/// List of all Flow shapes.
BPL.Flow.shapeList = [ 'flow' ];

/// Override canAcceptOutput() for Flow.
BPL.Flow.prototype.canAcceptOutput = function BPL_Flow_canAcceptOutput(targetShape)
{
	// test if we are already connected to shape
	for (var i = 0; i < this.outputList.length; i++) {
		if (this.outputList[i].toShape == targetShape) return false;
	}
	// cannot directly link flow with join
	if (targetShape && (targetShape.model.Type == 'join')) return false;

	return true;
}

/// Initialise shape handles.
BPL.Flow.prototype.initialiseHandles = function BPL_Flow_initialiseHandles()
{
	this.handles.input.y = -20;
	this.handles.output.y = 20;
	this.handles.inputShape.y = -15;
	this.handles.outputShape.y = 15;
	this.handles.annotation.x = 20;
	this.handles.annotation.y = 15;
}

/// Render this shape.
BPL.Flow.prototype.render = function BPL_Flow_render()
{
	this.initialiseGroup();
	var mainAttribs = { "id": "shape_main_" + this.model.Index, "points":  "0,-15 20,15 -20,15 0,-15", "class": this.shapeClass };
	var mainListeners = { "mousedown": BPL.Shape.events.mousedown, "mouseover": BPL.Shape.events.mouseover, "mouseout": BPL.Shape.events.mouseout };
	BPL.drawSVGElement(this.svgGroup,'polygon',mainAttribs,mainListeners);

	// input and output handles
	this.makeInputHandle();
	this.makeOutputHandle();
	this.makeAnnotation();
	this.updateStyle();
}

/// Implement validation.
BPL.Flow.prototype.validate = function BPL_Flow_validate()
{
	this.errors = [];

	if (this.inputList.length == 0) this.errors.push(BPL.getLocalText('NoInput'));
	if (this.outputList.length == 0) this.errors.push(BPL.getLocalText('NoOutput'));

	// test for connections to too many joins
	var match = BPL.currentDiagram.findMatchingShapes(this);
	var c = 0;
	for (var n in match) {
		c++;
	}

	// branches must terminate at exactly one join
	if (c > 1) this.errors.push(BPL.getLocalText('BranchBadJoin', this.model.Type));
	if (c == 0) this.errors.push(BPL.getLocalText('BranchNoJoin', this.model.Type));
}

/// Constructor for a Join shape.
BPL.Join = function BPL_Join()
{
	BPL.Shape.call(this);
}
/// Extend BPL.Shape.
BPL.Join.inheritFrom(BPL.Shape);

/// Create a Join shape from a model.
BPL.Join.create = function BPL_Join_create(model,updateLocation)
{
	return this._super.create.call(this,model,updateLocation);
}

/// List of all Join shapes.
BPL.Join.shapeList = [ 'join' ];

/// Override conditions for canAcceptInput.
BPL.Join.prototype.canAcceptInput = function BPL_Join_canAcceptInput(sourceShape)
{
	// test if we are already connected to shape
	for (var i = 0; i < this.inputList.length; i++) {
		if (this.inputList[i].fromShape == sourceShape) return false;
	}

	// cannot directly link flow with join
	if (sourceShape && (sourceShape.model.Type == 'flow')) return false;

	return true;
}

/// Initialise shape handles.
BPL.Join.prototype.initialiseHandles = function BPL_Join_initialiseHandles()
{
	this.handles.input.y = -20;
	this.handles.output.y = 20;
	this.handles.inputShape.y = -15;
	this.handles.outputShape.y = 15;
	this.handles.annotation.x = 20;
	this.handles.annotation.y = -15;
}

/// Render the shape.
BPL.Join.prototype.render = function BPL_Join_render()
{
	this.initialiseGroup();
	var mainAttribs = { "id": "shape_main_" + this.model.Index, "points": "-20,-15 20,-15 0,15 -20,-15", "class": this.shapeClass };
	var mainListeners = { "mousedown": BPL.Shape.events.mousedown, "mouseover": BPL.Shape.events.mouseover, "mouseout": BPL.Shape.events.mouseout };
	BPL.drawSVGElement(this.svgGroup,'polygon',mainAttribs,mainListeners);

	// input and output handles
	this.makeInputHandle();
	this.makeOutputHandle();
	this.makeAnnotation();
	this.updateStyle();
}

/// Implement validation.
BPL.Join.prototype.validate = function BPL_Join_validate()
{
	this.errors = [];

	if (this.inputList.length == 0) this.errors.push(BPL.getLocalText('NoInput'));
	if (this.outputList.length == 0) this.errors.push(BPL.getLocalText('NoOutput'));
}

/// Constructor for a Scope.
BPL.Scope = function BPL_Scope()
{
	BPL.Shape.call(this);
	this.boundingBox = { "box": null, "line": null, "left": 0, "right": 0, "top": 0, "mid": 0, "bottom": 0 };
}
/// Extend BPL.Shape.
BPL.Scope.inheritFrom(BPL.Shape);

/// Create a new Scope from a model.
BPL.Scope.create = function BPL_Scope_create(model,updateLocation)
{
	return this._super.create.call(this,model,updateLocation);
}

/// List of all Scope shapes.
BPL.Scope.shapeList = [ 'scope' ];

/// Extend canAcceptOutput().
BPL.Scope.prototype.canAcceptOutput = function BPL_Scope_canAcceptOutput(targetShape)
{
	// cannot directly link flow with join
	if (targetShape && (targetShape.model.Type == 'join')) return false;
	return this._super.canAcceptOutput.call(this,targetShape);
}

/// Extend hide() to hide the boundingBox.
BPL.Scope.prototype.hide = function BPL_Scope_hide()
{
	this._super.hide.call(this);
	if (this.boundingBox) {
		if (this.boundingBox.box) this.boundingBox.box.setAttribute('visibility','hidden');
		if (this.boundingBox.line) this.boundingBox.line.setAttribute('visibility','hidden');
	}
}

/// Initialise shape handles.
BPL.Scope.prototype.initialiseHandles = function BPL_Scope_initialiseHandles()
{
	this._super.initialiseHandles();
	this.handles.input.y = -30;
	this.handles.output.y = 20;
	this.handles.inputShape.y = -25;
	this.handles.outputShape.y = 15;
	this.handles.annotation.x = 75;
	this.handles.annotation.y = 15;
}

/// Extend remove to remove the bounding box as well.
BPL.Scope.prototype.remove = function BPL_Scope_remove()
{
	if (this.boundingBox.box && this.boundingBox.box.parentNode) this.boundingBox.box.parentNode.removeChild(this.boundingBox.box);
	if (this.boundingBox.line && this.boundingBox.line.parentNode) this.boundingBox.line.parentNode.removeChild(this.boundingBox.line);
	this._super.remove.call(this);
}

/// Render this shape.
BPL.Scope.prototype.render = function BPL_Scope_render()
{
	this.initialiseGroup();
	var mainAttribs = { "id": "shape_main_" + this.model.Index, "d": "M -75 15 a 10 5.5 0 1 1 150 0 z", "class": this.shapeClass };
	var mainListeners = { "mousedown": BPL.Shape.events.mousedown, "mouseover": BPL.Shape.events.mouseover, "mouseout": BPL.Shape.events.mouseout };
	BPL.drawSVGElement(this.svgGroup,'path',mainAttribs,mainListeners);

	var labelAttribs = { "class": "ActivityType", "text-anchor": "middle", "x": 0, "y": -12 };
	var label = BPL.drawSVGElement(this.svgGroup,'text',labelAttribs);
	var labelText = document.createTextNode('<' + this.model.Type + '>');
	label.appendChild(labelText);

	var lineAttribs = { "x1": -60, "y1": -8, "x2": 60, "y2": -8, "style": "stroke: gray; stroke-width: 1;" };
	BPL.drawSVGElement(this.svgGroup,'line',lineAttribs);

	// input and output handles
	this.makeInputHandle();
	this.makeOutputHandle();
	this.makeAnnotation();
	this.updateStyle();
	this.updateBoundingBox();
}

/// Implement updateBoundingBox() as we need to track the size of the box.
BPL.Scope.prototype.updateBoundingBox = function BPL_Scope_updateBoundingBox()
{
	if (!this.boundingBox.box) {
		var boundingGroup = document.getElementById('bbGroup');

		var boundingAttribs = { "class": "boundingBox" };
		this.boundingBox.box = BPL.drawSVGElement(boundingGroup,'rect',boundingAttribs);

		var lineAttribs = { "class": "boundingBoxLine" };
		this.boundingBox.line = BPL.drawSVGElement(boundingGroup,'line',lineAttribs);
	}
	this.boundingBox.box.setAttribute('visibility','visible');

	// find bounds of box
	BPL.currentDiagram.findMatchingShapes(this);

	// update attributes
	this.boundingBox.box.setAttribute('x', this.boundingBox.left);
	this.boundingBox.box.setAttribute('y', this.boundingBox.top);
	this.boundingBox.box.setAttribute('width', this.boundingBox.right - this.boundingBox.left);
	this.boundingBox.box.setAttribute('height', this.boundingBox.bottom - this.boundingBox.top);

	if (null == this.boundingBox.mid) {
		this.boundingBox.line.setAttribute('visibility','hidden');
	}
	else {
		this.boundingBox.line.setAttribute('visibility','visible');
		this.boundingBox.line.setAttribute('x1',this.boundingBox.left);
		this.boundingBox.line.setAttribute('y1',this.boundingBox.mid);
		this.boundingBox.line.setAttribute('x2',this.boundingBox.right);
		this.boundingBox.line.setAttribute('y2',this.boundingBox.mid);
	}
}

/// Update the current bounding box to include shape.
BPL.Scope.prototype.updateBoundingBoxFromShape = function BPL_Scope_updateBoundingBoxFromShape(shape,depth)
{
	var sTop = shape.model.yPos - BPL.Constant.shape.height/2 - 10;
	var sBottom = shape.model.yPos + BPL.Constant.shape.height/2 + 10;
	var sLeft = shape.model.xPos - BPL.Constant.shape.width/2 - 10;
	var sRight = shape.model.xPos + BPL.Constant.shape.width/2 + 10;
	var sRight = shape.model.xPos + BPL.Constant.shape.width/2 + 10;

	if (sTop < this.boundingBox.top) this.boundingBox.top = sTop;
	if (sBottom > this.boundingBox.bottom) this.boundingBox.bottom = sBottom;
	if (sLeft < this.boundingBox.left) this.boundingBox.left = sLeft;
	if (sRight > this.boundingBox.right) this.boundingBox.right = sRight;
	// the first catch or catchall defines the mid line
	if ((depth <= 1) && ((shape.model.Type == 'catch') || (shape.model.Type == 'catchall')) && (this.boundingBox.mid == null)) {
		this.boundingBox.mid = sTop - 2;
	}
}

/// Implement validation.
BPL.Scope.prototype.validate = function BPL_Scope_validate()
{
	this.errors = [];

	if (this.inputList.length == 0) this.errors.push(BPL.getLocalText('NoInput'));
	if (this.outputList.length == 0) this.errors.push(BPL.getLocalText('NoOutput'));

	var match = BPL.currentDiagram.findMatchingShapes(this);
	var c = 0;
	for (var n in match) {
		c++;
	}

	// branches must terminate at exactly one join
	if (c > 1) this.errors.push(BPL.getLocalText('BranchBadJoin',this.model.Type));
	if (c == 0) this.errors.push(BPL.getLocalText('BranchNoJoin',this.model.Type));
}

/////////////////////////////
//  Connector Definitions  //
/////////////////////////////

/// Connector constructor.
BPL.Connector = function BPL_Connector()
{
	// reference to model
	this.model = null;
	// reference to SVG elements
	this.svg = { "group": null, "line1": null, "line2": null, "text": null };
}

/// Create a new connector from a model.
BPL.Connector.create = function BPL_Connector_create(model)
{
	var conn = new this();
	conn.model = model;
	conn.findShapes();
	return conn;
}

/// Create a new connector and determine which constructor to use based on the model type.
BPL.Connector.createConnector = function BPL_Connector_createConnector(model)
{
	var connFunction = BPL.Connector.getConnectorFunction(model.ConnectType);
	var conn = connFunction.create(model);
	if (conn) {
		conn.toShape.inputList.push(conn);
		if (model.ConnectType == 'goto') { conn.fromShape.gotoConnection = conn; }
		else { conn.fromShape.outputList.push(conn); }
		conn.fromShape.updateStyle();
		conn.toShape.updateStyle();
	}
	return conn;
}

/// Helper function to allow mouse actions to create a new connector model.
/// The function in the zenPage should create the corresponding shapes.
BPL.Connector.createConnectorModel = function BPL_Connector_createConnectorModel(fromShape,toShape,name,connType,condition)
{
	var model = null;
	if (zenPage && zenPage.createConnectorModel) model = zenPage.createConnectorModel(fromShape,toShape,name,connType,condition);
	return model;
}

/// Return the correct constructor for a given connector type.
BPL.Connector.getConnectorFunction = function BPL_Connector_getConnectorFunction(connType)
{
	return (connType == 'goto') ? BPL.GoToConnector : BPL.Connector;
}

/// Connector mouse events.
BPL.Connector.events = {
	/// Select this connector on mousedown.
	"mousedown": function BPL_Connector_events_mousedown(evt)
		{
			var el = evt.target;
			evt.stopPropagation();

			if ((evt.button == 0) || (BPL.currentDiagram.selectedItems.length == 0)) {
				// select on primary button unless nothing selected
				var targetShape = (el && el.parentNode) ? el.parentNode.connector : null;
				BPL.currentDiagram.selectItem(targetShape, evt.ctrlKey);
			}
			BPL.currentDiagram.setCreateLocation(evt);
		},
	/// Prevent any further event handling on mouseup.
	"mouseup": function BPL_Connector_events_mouseup(evt)
		{
			evt.stopPropagation();
		}
}

/// Avoid copying a connector when either the source or target shape is not selected.
BPL.Connector.prototype.canCopy = function BPL_Connector_canCopy(warnings)
{
	if (!warnings) warnings = [];
	var canCopy = (BPL.currentDiagram.selectedItems.contains(this.toShape)) && (BPL.currentDiagram.selectedItems.contains(this.fromShape));
	if (canCopy) return true;
	warnings.push(BPL.getLocalText('EDCannotCopyConn'));
	return canCopy;
}

/// We can always remove a connector.
BPL.Connector.prototype.canDelete = function BPL_Connector_canDelete(warnings)
{
	if (!warnings) warnings = [];
	return true;
}

/// Create the text label for this connector.
BPL.Connector.prototype.createText = function BPL_Connector_createText(id,name)
{
	// Create text element for name (clone a model text element)
	var model = document.getElementById('ModelTextPath');
	var text = model.cloneNode(true);
	text.setAttribute('class','ConnectorText');
	text.setAttribute('id',id + '_text');
	text.setAttribute('text-anchor','middle');

	// IE represents childNodes as a NodeList object, which only support the item(pos) accessor.
	if (text.childNodes) {
		var tp = text.childNodes.item(0);
		tp.setAttribute('xlink:href','#' + id)
		tp.setAttribute('startOffset','50%')
		if (tp.childNodes) tp.childNodes.item(0).nodeValue = name;
	}
	return text;
}

/// Use information in the model to find the related shape objects.
BPL.Connector.prototype.findShapes = function BPL_Connector_findShapes()
{
	var bpl = zenPage.getBPLObject();
	if (!bpl) return;

	if ((this.model.FromShape != null) && (bpl.ShapeList[this.model.FromShape])) this.fromShape = BPL.currentDiagram.shapeList[this.model.FromShape];
	if ((this.model.ToShape != null) && (bpl.ShapeList[this.model.ToShape])) this.toShape = BPL.currentDiagram.shapeList[this.model.ToShape];
}

/// Compute the path needed to draw this connector.
BPL.Connector.prototype.getPath = function BPL_Connector_getPath()
{
	var from = this.fromShape;
	var to = this.toShape;

	var sourceX = from.getX() + from.handles.output.x;
	var sourceY = from.getY() + from.handles.output.y;
	var targetX = to.getX() + to.handles.input.x;
	var targetY = to.getY() + to.handles.input.y;

	return BPL.getMultiPointPath(sourceX,sourceY,targetX,targetY);
}

BPL.Connector.prototype.getIconPath = function BPL_Connector_getIconPath(iconWidth)
{
	var from = this.fromShape;
	var to = this.toShape;
	var retX=0;
	var retY=0;
	
	var sourceX = from.getX() + from.handles.output.x;
	var sourceY = from.getY() + from.handles.output.y;
	var targetX = to.getX() + to.handles.input.x;
	var targetY = to.getY() + to.handles.input.y;
	
	// Positioning depending on whether target is to the left or right of source
	var retX=targetX>=sourceX?targetX+10:(targetX-iconWidth-5);
    // To connector always connects via the top of target
	var retY=(targetY-iconWidth-5)
	return [retX,retY];
}

/// Hide this connector.
BPL.Connector.prototype.hide = function BPL_Connector_hide()
{
	if (this.svg.group) this.svg.group.setAttribute('visibility','hidden');
}

/// No validation code is needed at present.
BPL.Connector.prototype.isValid = function BPL_Connector_isValid()
{
	return true;
}

/// Remove the connector from the SVG.
/// NOTE: this ALSO removes the connector model in zenPage.
BPL.Connector.prototype.remove = function BPL_Connector_remove()
{
	// remove connectors from shapes
	if ('goto' == this.model.ConnectType) {
		if (this.fromShape.gotoConnection == this) this.fromShape.gotoConnection = null;
	}
	else {
		var index = this.fromShape.outputList.indexOf(this);
		if (index != -1) this.fromShape.outputList.splice(index,1);
	}

	var index = this.toShape.inputList.indexOf(this);
	if (index != -1) this.toShape.inputList.splice(index,1);

	// turn off handles
	handle = document.getElementById('shape_output_' + this.fromShape.model.Index);
	if (handle) handle.setAttribute('class','OutputHandleOff');

	handle = document.getElementById('shape_input_' + this.toShape.model.Index);
	if (handle) handle.setAttribute('class','InputHandleOff');

	// update style of prev connected shapes to revalidate them
	this.toShape.updateStyle();
	this.fromShape.updateStyle();

	// remove svg elements
	if ((this.svg.group) && (this.svg.group.parentNode)) this.svg.group.parentNode.removeChild(this.svg.group);
	this.svg = {};
	if (zenPage && zenPage.removeConnectorFromModel) {
		var index = BPL.currentDiagram.connectors.indexOf(this);
		if (index != -1) BPL.currentDiagram.connectors.splice(index,1);
		zenPage.removeConnectorFromModel(this.model);
	}
}

/// Render the connector.
BPL.Connector.prototype.render = function BPL_Connector_render()
{
	if (this.svg.group) {
		while (this.svg.group.firstChild) {
			this.svg.group.removeChild(this.svg.group.firstChild);
		}
	}
	var grpAttrib = { "id": "connGroup_" + this.model.FromShape + "-" + this.model.ToShape };
	this.svg.group = BPL.drawSVGElement(BPL.currentDiagram.svgRoot,'g',grpAttrib,null,true);
	this.svg.group.connector = this;
	var label = document.getElementById('diagramLabel');
	BPL.currentDiagram.svgRoot.insertBefore(this.svg.group,label);	
	this.svg.group.setAttribute('visibility','visible');

	var id = "connector_" + this.model.FromShape + "-" + this.model.ToShape;
	var id2 = "connector2_" + this.model.FromShape + "-" + this.model.ToShape;

	// "under" connector (to catch mouse events)
	var underConn = {};
	underConn.attribs = { "id": id2, "d": this.getPath(), "class": "BPLUnderConnector" };
	underConn.listeners = { "mousedown": BPL.Connector.events.mousedown, "mouseup": BPL.Connector.events.mouseup };
	var underElement = BPL.drawSVGElement(this.svg.group,'path',underConn.attribs,underConn.listeners);
	
	if ((this.model) && (this.getIconPath) && (this.model.LanguageOverride=='python')) {
		var pyHint={};
		// 18px is the icon width
		pyHint.pathComponents=this.getIconPath(18);
		if (pyHint.pathComponents && (pyHint.pathComponents.length>1)) {
			pyHint.attribs = {"x": pyHint.pathComponents[0], "y": pyHint.pathComponents[1], "width": "18px", "height": "18px", "href": "images/python-logo-only.png"}
			this.svg.languageOverride = BPL.drawSVGElement(this.svg.group,'image',pyHint.attribs);
		}
	}
	
	var connClass = 'BPLConnector' + (this.model.ConnectType == 'goto' ? 'Goto' : '');
	var selected = BPL.currentDiagram.isSelected(this);
	if (selected) connClass += 'Selected';
	var conn = {};
	conn.attribs = { "id": id, "class": connClass, "d": this.getPath() };
	conn.listeners = { "mousedown": BPL.Connector.events.mousedown, "mouseup": BPL.Connector.events.mouseup };
	var mainElement = BPL.drawSVGElement(this.svg.group,'path',conn.attribs,conn.listeners);

	var text = null;
	if ('' != this.model.Name) {
		text = this.createText(id,this.model.Name);
		this.svg.group.appendChild(text);
	}
	this.svg.text = text;
	this.svg.line = mainElement;
	this.svg.line2 = underElement;
	

	// if we are not on current page, make hidden
	if (this.fromShape.model.ParentShape != BPL.currentDiagram.currentParent) this.svg.group.setAttribute('visibility','hidden');
	this.updateStyle();
}

/// Update the connector path during and after moves.
BPL.Connector.prototype.updatePath = function BPL_Connector_updatePath()
{
	var path = this.getPath();
	if (this.svg.line) this.svg.line.setAttribute('d',path);
	if (this.svg.line2) this.svg.line2.setAttribute('d',path);
	if (this.svg.languageOverride) {
		var iconPath=this.getIconPath(18)
		this.svg.languageOverride.setAttribute('x',iconPath[0])
		this.svg.languageOverride.setAttribute('y',iconPath[1])
	}
}

/// Update the style of the connector.
BPL.Connector.prototype.updateStyle = function BPL_Connector_updateStyle()
{
	var el = this.svg.line;
	var text = this.svg.text;

	var elClass = 'BPLConnector';
	var textClass = 'ConnectorText';
	if (this.model.ConnectType == 'goto') elClass += 'Goto';
	if (BPL.currentDiagram.isSelected(this)) { // we're selected
		elClass += 'Selected';
		textClass += 'Selected';
	}
	if (el) el.setAttribute('class',elClass);
	if (text) {
		text.setAttribute('class',textClass);
		// hack to work around Chrome not updating textPath dynamically
		if (zenPage && zenPage.window && zenPage.window.zenIsChrome && text.childNodes) {
			var child = text.childNodes.item(0);
			if (child) {
				var path = child.getAttribute('xlink:href');
				child.setAttribute('xlink:href','');
				child.setAttribute('xlink:href',path);
			}
		}
	}
}

/// Constructor for a GoToConnector.
BPL.GoToConnector = function BPL_GoToConnector()
{
	BPL.Connector.call(this);
}
/// Extend BPL.Connector.
BPL.GoToConnector.inheritFrom(BPL.Connector);

/// Create a GoToConnector from a model.
BPL.GoToConnector.create = function BPL_GoToConnector_create(model)
{
	return this._super.create.call(this,model);
}

/// Override getPath() to draw a different goTo path that follows a different path.
BPL.GoToConnector.prototype.getPath = function BPL_GoToConnector_getPath()
{
	var from = this.fromShape;
	var to = this.toShape;

	var sourceX = from.getX() + from.handles['goto'].x;
	var sourceY = from.getY() + from.handles['goto'].y;
	var path = '';

	// if this is a connection to shapes on different pages, show short-hand for branch
	if (from.model.ParentShape != to.model.ParentShape) {
		// special case: show stub for branch from one page to another
		var len = 100;
		path = 	'M' + (sourceX-len) + ' ' + sourceY + ' L ' + (sourceX) + ' ' + (sourceY);
		path += ' M' + (sourceX-len) + ' ' + (sourceY-10)+ ' L ' + (sourceX-len) + ' ' + (sourceY+10);
		return path;
	}

	var targetX = to.getX() + to.handles.input.x;
	var targetY = to.getY() + to.handles.input.y;

	var xPoints = [ sourceX, sourceX-50, sourceX-50, targetX, targetX];
	var yPoints = [ sourceY, sourceY, targetY-16, targetY-16, targetY];

	if (targetX <= targetY) { // draw line in other direction
		xPoints.reverse();
		yPoints.reverse();
	}
	path = 'M' + xPoints[0] + ' ' + yPoints[0] + ' L ';

	for (var pt = 1; pt < xPoints.length; pt++) {
		path += xPoints[pt] + ' ' + yPoints[pt] + ' ';
	}
	return path;
}
