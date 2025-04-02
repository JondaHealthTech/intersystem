/*
	ensbpl.js

	Copyright (c) 2003-2008, InterSystems Corp.
	ALL RIGHTS RESERVED

	Core JS for BPL Editor
*/

/// Useful constants
var SVGNS = "http://www.w3.org/2000/svg";

// diagram object
var theDiagram = null;

// editor modes
var smartConnect = true;
var autoArrange = false;

var mouseScale = 133;

// size variables
var shapeWidth = 240;
var shapeHeight = 50;

// initial layout
var xStart = 550;
var yStart = 100;
var xSpace = shapeWidth + 30;
var ySpace = shapeHeight + 50;

// number of levels of drill down
var maxLevels = 6;

// current Operation: "move" "connect"
var currOperation = null;

// What type of shape to create
var createType = null;

// current mouse target for move operation
var moveShape = null;

// matchShapes assoc. array is used to highlight related shapes
// such as join for if
var matchShapes = null;

// selected item(s) (shapes or connectors)
var selectedItems = new Array();

// items (shapes) in the clipboard
var clipboardItems = null;

// mouse target (shape)
var currTarget = null;

// variables used for tracking mouse exit from shape...
var lastShapeOutX = 0;
var lastShapeOutY = 0;

// offset of mouse event (for move etc)
var deltaX = 0;
var deltaY = 0;

var startX = 0;
var startY = 0;
var moveThreshold = 16; // minimum move (dist^2)

// connection variables

// start/end of connection
var inShape = null;
var outShape = null;

// current rubber band
var currRubberBand = null;

// location/direction of rubber band
var rubberX = 0;
var rubberY = 0;
var rubberStart = ''; // "output" or "input" -- determines direction of connector

// which shape the mouse button was pressed in
var mouseDownShape = null;

// used to make up names for new items
var newItemCounter = 1;
var newMilestoneCounter = 1;

// -------------------------------------------------------------------
// external canvas API

function canvas_invokeOperation(op, value, value2)
{
	switch(op) {
	case "setZoom":
		setZoom(value);
		break;
	case "getZoom":
		canvas_setResultsDiv("ZOOM",currZoom);
		break;
	case "getDiagramInfo":
		// return Diagram info
		canvas_setResultsDiv("INFO",theDiagram.getInfo());
		break;
	case "setReadOnly":
		canvas_setReadOnly(value);
		break;

	case "listItems":
		canvas_listItems(value);
		break;
	case "copyItem":
		canvas_copyItem();
		break;
	case "pasteItem":
		canvas_pasteItem();
		break;
	case "cutItem":
		canvas_cutItem();
		break;
	case "deleteItem":
		canvas_deleteItem();
		break;
	case "validateItem":
		canvas_validateItem();
		break;
	case "arrangeShapes":
		canvas_arrangeShapes();
		break;
	case "saveDiagram":
		canvas_saveDiagram();
		break;
	case "openDiagram":
		canvas_openDiagram(value);
		break;
	case "createShape":
		canvas_createShape(value);
		break;
	case "getProperty":
		canvas_getProperty(value);
		break;
	case "setProperty":
		canvas_setProperty(value, value2);
		break;
	case "undo":
		canvas_undo();
		break;
	case "drillDown":
		canvas_drillDown();
		break;
	case "drillUp":
		canvas_drillUp();
		break;
	case "canUndo":
		var x = undo_CanUndo();
		canvas_setResultsDiv("CANUNDO",x ? 1 : 0);
		break;
	case "isModified":
		canvas_setResultsDiv("MODIFIED",modifiedFlag ? 1 : 0);
		break;
	default:
		alert("canvas_invokeOperation: unknown operation: " + op);
		break;
	}
}

// Show Activity Wizard dialog
function canvas_showActivityWizard(type)
{
	if (self.document_showActivityWizard) {
		// construct a serialized bp context so that wizard can use it
		var bpContext = '';
		for (var i = 0; i < theDiagram.Context.length; i++) {
			var prop = theDiagram.Context[i];
			var ptype = (prop.Type == "%String" || prop.Type == "%Library.String") ? '' : prop.Type;
			if (ptype != '') {
				// normalize type name
				if (ptype.indexOf('.')==-1 && ptype.charAt(0) == '%') {
					ptype = '%Library.' + ptype.substr(1);
				}
			}
			bpContext += prop.Name + ':' + ptype + ':' + prop.Collection + ';';
		}
		var context = self.document_showActivityWizard(theDiagram,type,bpContext);
		if (context != null && context.returnValue) {
			var shape = canvas_createShape(type);

			switch(type) {
			case 'call':
				// attrs
				shape.setProperty('Name',context.Name);
				shape.setProperty('Target',context.Target);
				shape.setProperty('Annotation',context.Annotation);
				shape.setProperty('Async',context.Async ? '1' : '0');

				// request&response
				if (context.Request != null) {
					shape.setProperty('Request',context.Request);
				}
				if (context.Response != null) {
					shape.setProperty('Response',context.Response);
				}

				if (context.Missing != null) {
					var msg = 'The following properties were added\nto the Business Process context:\n';
					msg += '---------------------------\n';
					// add missing items to our context
					var t = context.Missing.split(';');
					for (var n = 0; n < t.length; n++) {
						if (t[n] != '') {
							var s = t[n].split(':');
							var prop = new Object();
							prop.Name = s[0];
							prop.Type = s[1]=='' ? '%String' : s[1];
							prop.Collection = s[2];
							prop.InitialExpression = '';

							msg += '* ' + prop.Name + '\n';

							// insert
							theDiagram.Context[theDiagram.Context.length] = prop;
						}
					}
					alert(msg);
				}

				break;
			}

			// notify external system of change
			// to make sure inspector show new values
			if (selectedItems.length == 1) {
				canvas_setResultsDiv("INFO",selectedItems[0].getInfo());
				canvas_raiseEvent("SELECT");
			}
		}
	}
}

// toggle annotation display
function canvas_showAnnotation()
{
	var value = theDiagram.ShowAnnotation;
	theDiagram.setProperty("ShowAnnotation", !value);

	return theDiagram.ShowAnnotation;
}

function canvas_undo()
{
	if (undo_CanUndo()) {
		hideToolTip();
		undo_UndoAction();
	}
}

function canvas_selectAll()
{
	selectAll();
}

// set the value of the results element for the external system to read.
function canvas_setResultsDiv(type, value)
{
	// find results div
	var results = self.document.getElementById("results");

	// place value into results
	// ignore type
	if (results) {
		results.innerHTML = value;
	}
}

// raise an event for the external system
function canvas_raiseEvent(type)
{
	if (self.raiseEvent) {
		self.raiseEvent(type);
	}
}

// delete the current selected item(s)
function canvas_deleteItem()
{
	var count = selectedItems.length;

	if (readOnlyFlag || count == 0) {
		return;
	}

	undo_AddAction("blockStart",null,null,null);

	// make copy of selected list, clear the original
	var deleteList = new Array();
	for (var i = 0; i < count; i++) {
		deleteList[i] = selectedItems[i];
	}

	selectedItems.length = 0;
	var delcount = 0;
	var skipped = new Array();  // list of items that are not deleted

	for (var i = 0; i < count; i++) {
		var item = deleteList[i];

		if (item.Type == "connector") {
			item.remove();
			delcount++;
		}
		else {
			// do not allow user to delete start/end
			if ((item.Type != "start") && (item.Type != "end")) {
				theDiagram.deleteShape(item, false);
				delcount++;
			}
			else {
				skipped[skipped.length] = item;
				if (count == 1) {
					// show message only in single item case
					alert(getLocalText('EDCannotDelete',item.Type));
				}
			}
		}
	}

	// clear delete list
	deleteList.length = 0;

	if (delcount > 0) {
		canvas_playSound('delete');
	}

	// if we skipped anything, update it
	for (var i = 0; i < skipped.length; i++) {
		skipped[i].updateStyle();
	}

	// auto arrange would only make sense for items within a if-type branch

	undo_AddAction("blockEnd",null,null,null);

	// make sure everything is revalidated
	updateStyleAll();
	updateBoundingBoxes();
}

// validate the current selected item
function canvas_validateItem()
{
	var msg = getLocalText('EDNoSelection');

	if (selectedItems.length == 1) {
		var item = selectedItems[0];
		if (item.Type != "connector") {
			item.updateStyle();
			msg = item.validationMsg;
			if (msg == '') {
				msg = getLocalText('EDItemValid');
			}
			else {
				msg = getLocalText('EDItemInvalid') + '\n'
						 + '------------------------------------------------\n'
						 + msg;
			}

		}
	}

	alert(msg);
}

// create a new shape on the diagram
function canvas_createShape(shapename)
{
	// make up new name
	var name;
	if (shapename == 'milestone') {
		name = 'M' + newMilestoneCounter++;
	}
	else {
		name = shapename + newItemCounter++;
	}

	var shape = createShape(theDiagram, theDiagram.currParent, shapename, name, createX, createY, true, false);
	return shape;
}

// create connected between 2 or more selected items
function canvas_connectItems()
{
	var count = 0;
	// count items selected for connecting
	count = selectedItems.length;
	for (var n = 0; n < selectedItems.length; n++) {
		var item = selectedItems[n];
		if ('connector' != item.Type) {
			count++;
		}
	}

	if (count <= 1) {
		// there must be at least 2 selected items
		alert(getLocalText('EDCannotConnect'));
	}
	else {
		// connect items in order they were selected
		var start = null;
		var end = null;
		for (var n = 0; n < selectedItems.length; n++) {
			var item = selectedItems[n];
			if ('connector' != item.Type) {
				if (null == start) {
					start = item;
				}
				else {
					if (null != end) {
						start = end;
					}
					end = item;
					// branches for if !!!
					if (end.canAcceptInput(start) && start.canAcceptOutput(end)) {
						start.addOutput(end);
					}
				}
			}
		}
		canvas_playSound('connect');

		// unselect shapes
		selectItem(null,false);
	}
}

// rearrange the shapes in the diagram
function canvas_arrangeShapes()
{
	theDiagram.arrangeShapes();
}

// make a new group from the selected shapes
function canvas_makeGroup(type)
{
	makeGroup(type);
}

// return a comma-delimited list of all the activity names
// if type is non-empty, only return items of that type
function canvas_listItems(type)
{
	var list = theDiagram.listItems(type,null,null);
	canvas_setResultsDiv("LISTITEMS",list);
}

// get the serial state of the diagram and place it into results..
function canvas_saveDiagram()
{
	var state = theDiagram.save();

	canvas_setResultsDiv("SAVE",state);

	// alert(state);

	// reset the modify flag
	setModified(false);
}

// set the serial state of the diagram
function canvas_openDiagram(state)
{
	theDiagram.open(state);
}

// get a property of the current shape
function canvas_getProperty(prop)
{
	var val = '';

	if (selectedItems.length == 1) {
		// only get a value if 1 item is selected
		// get prop directly
		val = selectedItems[0][prop];
	}
	else if (selectedItems.length == 0) {
		// get property of diagram
		val = theDiagram[prop];
	}

	if (!val) val = '';

	// update results div
	canvas_setResultsDiv("GETPROPERTY",val);

	return val;
}

// set a property of the current shape
function canvas_setProperty(prop,val)
{
	if (selectedItems.length == 1) {
		// only set a value if 1 item is selected
		selectedItems[0].setProperty(prop,val);
	}
	else if (selectedItems.length == 0) {
		// set property of diagram
		theDiagram.setProperty(prop,val);
	}
}

// Drill down into the current shape (if possible)
function canvas_drillDown()
{
	if (selectedItems.length == 0) {
		alert(getLocalText('EDNoSelection'));
		return;
	}
	if (selectedItems.length > 1) {
		alert(getLocalText('EDMultiSelection'));
		return;
	}

	var shape = selectedItems[0];
	if (shape.Type != 'foreach' &&
		shape.Type != 'while' &&
		shape.Type != 'until' &&
		shape.Type != 'sequence' &&
		shape.Type != 'catch' &&
		shape.Type != 'catchall' &&
		shape.Type != 'compensationhandler') {

		alert(getLocalText('EDNoDrill'));
		return;
	}

	theDiagram.setCurrParent(shape.index);
	canvas_playSound('drill');
}

// move up out of the current drill-down group
function canvas_drillUp()
{
	// get the parent for the current parent and make it the parent
	if (theDiagram.currParent) {
		var parent = theDiagram.shapeList[theDiagram.currParent].parentShape;
		theDiagram.setCurrParent(parent);
		canvas_playSound('drill');
	}
}

// Show the Rules Editor for a <rule> activity
function canvas_rulesEditor()
{
	if (selectedItems.length == 0) {
		alert(getLocalText('EDNoSelection'));
		return;
	}
	if (selectedItems.length > 1) {
		alert(getLocalText('EDMultiSelection'));
		return;
	}

	var shape = selectedItems[0];
	if (shape.Type != 'rule') {
		alert(getLocalText('EDNoRule'));
		return;
	}
	var rule = shape.propertyBag['Rule'];
	var rulepackage = rule.substr(0,rule.lastIndexOf('.'));
	var rulename = rule.substr(rule.lastIndexOf('.')+1);
	var id = rulepackage + '||' + rulename;
	displayRule(id);
}

function canvas_playSound(type)
{
	if (self.playSound) {
		self.playSound(type);
	}
}

// --------------------------------------------------------------------

// loading flag
var isLoading = false;

// modified flag
var modifiedFlag = false;

// set the modified state of the diagram
function setModified(flag)
{
	if (modifiedFlag != flag) {

		modifiedFlag = flag;

		if (!isLoading) {
			// tell studio about the modification
			canvas_raiseEvent(modifiedFlag ? "MODIFIED" : "NOTMODIFIED");
			//canvas_setResultsDiv("MODIFIED",modifiedFlag ? 1 : 0);
		}
	}
}

// locked for edit flag
var lockFlag = false;

// test if we can edit this diagram
// (resolves locking and readonly issues)
function canEdit()
{
	return true;
}

// --------------------------------------------------------------------

// make the given item the selected item (connector or shape)
// if "add" is true, add this shape to the list of current selected items
// unless shape is already selected, then unselect
function selectItem(item, add)
{
	if (isLoading) {
		return;
	}

	if (add) {
		// if selected, remove this item from the selected group
		for (var i = 0; i < selectedItems.length; i++) {
			if (selectedItems[i] == item) {
				selectedItems.splice(i,1);
				item.updateStyle();
				item = null;
				break;
			}
		}
	}
	else {
		// test for reselect of current item
		if (item && isSelected(item)) {
			return;
		}
	}

	if (!add) {
		// unselect previous items
		for (var i = 0; i < selectedItems.length; i++) {
			var old = selectedItems[i];
			selectedItems[i] = null;

			// unselect
			if (old) {
				old.updateStyle();
			}
		}

		// reset list
		selectedItems.length = 0;
	}

	// update new item
	if (item) {
		// add new item to list
		selectedItems[selectedItems.length] = item;
		item.updateStyle();
	}

	// notify external system

	if (selectedItems.length == 0) {
		// no items: give diagram info
		canvas_setResultsDiv("INFO",theDiagram.getInfo());
	}
	else if (selectedItems.length == 1) {
		// one item: give shape info
		canvas_setResultsDiv("INFO",selectedItems[0].getInfo());
	}
	else {
		// multi items: give no info
		canvas_setResultsDiv("INFO",'');
	}

	// update context menu
	var on = (selectedItems.length > 0);
 	setMenuItemOption("enabled","menu_validate", null, on);
 	setMenuItemOption("enabled","menu_cut", null, on);
 	setMenuItemOption("enabled","menu_copy", null, on);
 	setMenuItemOption("enabled","menu_delete", null, on);

 	// drill down menu
 	if ((selectedItems.length == 1) &&
		(selectedItems[0].Type == 'foreach' ||
			selectedItems[0].Type == 'while' ||
			selectedItems[0].Type == 'until' ||
			selectedItems[0].Type == 'sequence' ||
			selectedItems[0].Type == 'catch' ||
			selectedItems[0].Type == 'catchall' ||
			selectedItems[0].Type == 'compensationhandler')) {

		 setMenuItemOption("enabled","menu_drillDown", null, true);
	}
	else {
		 setMenuItemOption("enabled","menu_drillDown", null, false);
	}

	// rule Editor menu
 	if ((selectedItems.length == 1) &&
		(selectedItems[0].Type == 'rule')) {

		 setMenuItemOption("enabled","menu_rulesEditor", null, true);
	}
	else {
		 setMenuItemOption("enabled","menu_rulesEditor", null, false);
	}

	canvas_raiseEvent("SELECT");

	if (matchShapes) {
		var old = new Array();
		for (var n in matchShapes) {
			old[old.length] = matchShapes[n];
		}

		// clear out matches
		matchShapes = null;

		for (var n = 0; n < old.length; n++) {
			old[n].updateStyle();
		}

		old.length = 0;
		old = null;
	}

	// mark associated shape
 	if (selectedItems.length == 1) {
		matchShapes = findMatchingShapes(selectedItems[0]);
		if (matchShapes) {
			for (var n in matchShapes) {
				matchShapes[n].updateStyle();
			}
		}
	}
}

// test if given item is selected
function isSelected(item)
{
	if (!item) {
		return false;
	}

	for (var i = 0; i < selectedItems.length; i++) {
		if (selectedItems[i] == item) {
			return true;
		}
	}

	return false;
}

// -----------------------------------------------------------------------
// select all items on current page
function selectAll()
{
	// unselect first
	selectItem(null, false);

	for (var i = 0; i < theDiagram.shapeList.length; i++) {
		var shape = theDiagram.shapeList[i];

		// only consider shapes in current *group*
		if (!shape.isCopy && !shape.isDeleted && shape.parentShape == theDiagram.currParent) {
			selectItem(shape, true);
		}
	}
}

// -----------------------------------------------------------------------
// update any bounding boxes on current page
function updateBoundingBoxes()
{
	if (isLoading) {
		return;
	}
	for (var i = 0; i < theDiagram.shapeList.length; i++) {
		var shape = theDiagram.shapeList[i];

		// only consider shapes in current *group*
		if (null!=shape.updateBoundingBox && !shape.isCopy && !shape.isDeleted && shape.parentShape == theDiagram.currParent) {
			shape.updateBoundingBox();
		}
	}
}

// -----------------------------------------------------------------------
// find a <label> with the given name
function findLabel(name)
{
	for (var i = 0; i < theDiagram.shapeList.length; i++) {
		var shape = theDiagram.shapeList[i];
		if (!shape.isCopy && !shape.isDeleted && shape.Type == 'label' && shape.Name == name) {
			return shape;
		}
	}

	return null;
}

// -----------------------------------------------------------------------
// update style (revalidate) all shapes
function updateStyleAll()
{
	if (isLoading) return;

	for (var i = 0; i < theDiagram.shapeList.length; i++) {
		var shape = theDiagram.shapeList[i];

		// only consider shapes in current *group*
		if (!shape.isCopy && !shape.isDeleted && shape.parentShape == theDiagram.currParent) {
			shape.updateStyle();
		}
	}
}

// -----------------------------------------------------------------------
// make a group from the selected items
function makeGroup(groupType)
{
	try {
		var isParent = false;
		switch(groupType) {
		case 'foreach':
		case 'sequence':
		case 'catch':
		case 'catchall':
		case 'compensationhandler':
		case 'until':
		case 'while':
			isParent = true;
			break;
		}

		// assume selected items are ok to make a group
		// set of items to add to group
		var set = new Array();

		// find start / end of selected set
		var edges = findGroupSetEdges();

		if (!edges) {
			alert(getLocalText('EDCannotGroup'));
			return;
		}

		undo_AddAction("blockStart",null,null,null);

		var start = edges[0];
		var end = edges[1];

		// get set of selected elements
		for (var i = 0; i < selectedItems.length; i++) {
			var item = selectedItems[i];
			if (item.Type != 'connector') {
				set[set.length] = item;
			}
		}

		// insert a new sequence element to hold the group
		var group = createShape(theDiagram, theDiagram.currParent, groupType, groupType, start.xPos, start.yPos, true, false);

		// for parent groups, move selected items to new group
		if (isParent) {
			for (var i = 0; i < set.length; i++) {
				var item = set[i];
				if (item.Type != 'connector') {
					var old = item.parentShape;
					item.parentShape = group.index;
					undo_AddAction("changeParent",item,old,item.xPos,item.yPos);
				}
			}
		}

		// fix connections (remember connection properties for initial connection)
		var connect;

		connect = start.inputList[0];
		var before = connect.fromShape;
		var name = connect.Name
		var cond = connect.Condition
		connect.remove();

		connect = end.outputList[0];
		var after = connect.toShape;
		connect.remove();

		if (isParent) {
			groupStart.addOutput(start,"");
			end.addOutput(groupEnd,"");

			before.addOutput(group,name);
			if (cond && cond != '') {
				group.inputList[0].Condition = cond;
			}
			group.addOutput(after,"");
		}
		else {
			// in-line group, such as a scope
			// place selected items inside group after first item
			before.addOutput(group,name);
			if (cond && cond != '') {
				group.inputList[0].Condition = cond;
			}

			var firstConnect = group.outputList[0];
			var firstNode = firstConnect.toShape;
			firstConnect.remove();
			end.addOutput(firstNode,"");

			groupStart.addOutput(start,"");
			groupEnd.addOutput(after,"");
		}

		// update and arrange shapes

		if (isParent) {
			// drill into new group and arrange it
			theDiagram.setCurrParent(group.index);
			theDiagram.arrangeShapes();

			// now go back up
			canvas_drillUp();
		}
		if (autoArrange || theDiagram.Layout != 'manual') {
			theDiagram.arrangeShapes();
		}

		undo_AddAction("blockEnd",null,null,null);
	}
	catch(ex) {
		alert('ERROR in makeGroup:\n' + ex.message);
	}
}

// Return an array with start and end shape of group list
// [0] is start, [1] is end
// return null if not possible
function findGroupSetEdges()
{
	var result = null;
	var workSet = new Array();
	var first = null;
	var last = null;

	// first build workSet of shapes
	for (var i = 0; i < selectedItems.length; i++) {
		var item = selectedItems[i];
		if (item.Type != 'connector') {
			workSet[workSet.length] = item;
		}
	}

	// now find first element in the workSet
	var i = 0;
	var firstCount = 0;

	while (i < workSet.length) {
		var item = workSet[i];
		// see if we have an input that is not selected
		if ((item.inputList.length > 0) && (!isSelected(item.inputList[0].fromShape))) {
			first = item;
			firstCount++;
		}
		i++;
	}

	if (firstCount != 1 || !first) {
		// more than one first shape, not a group candidate
		return null;
	}

	if (first.Type == 'start') {
		// do not allow group to start at start ???
		return null;
	}

	// find end of thread from start shape
	var last = findEndOfGroupSet(first,0);

	if (first && last) {
		result = new Array();
		result[0] = first;
		result[1] = last;
	}

	return result;
}

// loop detector
var feVisits = null;

// Find element at the end of the selected items
function findEndOfGroupSet(shape,depth)
{
	var next;

	if (0==depth) {
		feVisits = new Object();  // visits by shape index
	}

	if (feVisits[shape.index]) {
		// duplicate (should not happen!)
		return null;
	}
	else {
		feVisits[shape.index] = true;
	}

	while (shape) {
		if (shape.Type == 'join') {
			return (depth == 0) ? null : shape;
		}

		if (shape.outputList.length == 0) {
			// end of thread
			next = null;
		}
		else {
			switch (shape.Type) {
			case 'switch':
			case 'if':
			case 'flow':
			case 'scope':
				// find join at end of branch
				// make sure all branches end up at the same point
				var join = null;
				var join1 = null;
				for (var i = 0; i < shape.outputList.length; i++) {
					join = findEndOfGroupSet(shape.outputList[i].toShape, depth+1);
					if (join == null) {
						return null;
					}

					if (join1 == null) {
						join1 = join;
					}
					else if (join != join1) {
						// end mismatch
						alert("end mismatch");
						return null;
					}
				}

				if (null == join) {
					return null;
				}

				if (join.Type != 'join' || !isSelected(join)) {
					// join must be part of group
					return null;
				}
				else {
					// get shape after join
					shape = join;
					next = join.outputList[0].toShape;
				}
				break;
			default:
				// next element
				if (isSelected(shape)) {
					next = shape.outputList[0].toShape;
				}
				else {
					next = null;
				}
				break;
			}
		}

		if (next) {
			if (isSelected(next)) {
				// keep going
				shape = next;
			}
			else {
				// this is the end shape
				return shape;
			}
		}
		else {
			shape = null;
		}
	}

	return null;
}

// -----------------------------------------------------------------------
// clipboard

// cut selected items to the clipboard
function canvas_cutItem()
{
	// first do a copy
	canvas_copyItem();

	// now delete
	canvas_deleteItem();
}

// copy selected items to the clipboard
function canvas_copyItem()
{
	var copyCount = 0;

	// clear out old clipboard
	clipboardItems = new Array();

	// make a copy of selected items into the clipboard...
	for (var i = 0; i < selectedItems.length; i++) {
		var item = selectedItems[i];
		if ((item.Type != 'connector') && (item.Type != 'start') && (item.Type != 'end')) {
			copyCount++;

			// make a shadow copy of this shape (with no SVG)
			var shape = createShape(theDiagram, item.parent, item.Type, item.Name, item.xPos, item.yPos, false, true);

			// copy the internals over
			copyShapeContents(shape,item);

			// put the copy into the clipboard
			clipboardItems[clipboardItems.length] = shape;
		}
	}

	// update menu
 	setMenuItemOption("enabled","menu_paste", null, copyCount > 0);
}

/// Recursively build set of children for the given item.!!!
/*
function addToSetOfChildren(item, children)
{
	for (var i = 0; i < theDiagram.shapeList.length; i++) {
		var shape = theDiagram.shapeList[i];
		if (!shape.isDeleted && shape.parentShape == item.index && children[i] == null) {
			children[i] = true;
			addToSetOfChildren(shape, children);
		}
	}
}
*/


// paste selected items from the clipboard
function canvas_pasteItem()
{
	if (clipboardItems && clipboardItems.length > 0) {

		// figure out displacement for pasted shapes
		var dx = createX - clipboardItems[0].xPos;
		var dy = createY - clipboardItems[0].yPos;

		// turn off smartConnect for group paste...
		var sc = smartConnect;
		if (clipboardItems.length > 1) {
			smartConnect = false;
		}

		for (var i = 0; i < clipboardItems.length; i++) {
			var item = clipboardItems[i];

			// make a real copy of the item
			var shape = createShape(theDiagram, theDiagram.currParent, item.Type, item.Name, item.xPos + dx, item.yPos + dy, false, false);

			// copy the internals over
			copyShapeContents(shape,item);
		}

		smartConnect = sc;
	}
}

// Copy the contents of one shape into another
function copyShapeContents(target,source)
{
	// copy attributes
	target.setProperty("Annotation", source.Annotation);

	// request/response
	if (source.Type == "call") {
		target.requestType = source.requestType;
		target.requestAssigns = source.requestAssigns;
		target.responseType = source.responseType;
		target.responseAssigns = source.responseAssigns;
	}

	// code
	if (source.Type == 'code' || source.Type == 'sql') {
		target.code = source.code;
	}

	// copy property bag
	if (source.propertyList) {
		var s = source.propertyList.split(",");
		for (var j = 0; j < s.length; j++) {
			var t = s[j].split(insDelim2);
			target.setProperty(t[0], source.propertyBag[t[0]]);
		}
	}
}

// -----------------------------------------------------------------------

// Create a new BPL diagram
function createBPLDiagram()
{
	try {
		var startTime = new Date();
		theDiagram = new BPLDiagram("Process1");

		// hook up API calls to canvas
		var canvas = document.getElementById("canvas");
		canvas.theDiagram = theDiagram;

		// check if there is a pre-loaded diagram to use
		var xml = self.document.getElementById("initialState");
		isLoading = true;

		// reset counters
		newItemCounter = 1;
		newMilestoneCounter = 1;

		if (xml) {
			theDiagram.open(xml.innerHTML);
			setModified(false);
		}
		else {
			// default diagram
			var start = new BPLEvent(theDiagram, null, "start","",xStart,yStart);
			var end = new BPLEvent(theDiagram, null, "end","",xStart,yStart + (ySpace*4));
			setModified(true);
		}

		isLoading = false;
		updateStyleAll();
		updateBoundingBoxes();

		var endTime = new Date();
		var loadTime = endTime.getTime() - startTime.getTime();
		// alert('Load time: ' + loadTime + 'ms');

	}
	catch(ex) {
		alert('ERROR in createBPLDiagram:\n' + ex.message);
	}
}

// -----------------------------------------------------------------------
// BPLDiagram constructor
function BPLDiagram(name)
{
	this.SVGRoot = document.getElementById("canvas");

	var csvg = document.getElementById("canvasSVG")

	// external properties
	this.Type = 'process';
	this.Name = name;
	this.Annotation = '';
	this.Component = false;
	this.ShowAnnotation = true;
	this.Width = csvg.getAttribute("width");
	this.Height = csvg.getAttribute("height");

	this.Layout = 'automatic';
	this.Language = 'objectscript';
	this.Request = 'Ens.Request';
	this.Response = 'Ens.Response';
	this.LastModified = 'n/a';

	this.Includes = '';
	this.Version = '';

	// context (array of properties)
	this.Context = new Array();
	this.ContextSuperClass = '';

	// internal properties
	this.shapeList = new Array();

	// methods
	this.insertShape = BPLDiagram_insertShape;
	this.arrangeShapes = BPLDiagram_arrangeShapes;
	this.listItems = BPLDiagram_listItems;
	this.nextShapeNumber = BPLDiagram_nextShapeNumber;
	this.save = BPLDiagram_save;
	this.open = BPLDiagram_open;
	this.getInfo = BPLDiagram_getInfo;
	this.setProperty = BPLDiagram_setProperty;

	this.setCurrParent = BPLDiagram_setCurrParent;
	this.updateLevel = BPLDiagram_updateLevel;

	this.deleteShape = BPLDiagram_deleteShape;

	// parent (shape #) of group we are displaying
	this.currParent = null;

	// array of parents (shape #) for each level
	// length of this is the current level #
	this.levels = new Array();

	// array of scroll positions for each level
	this.scrollTops = new Array();
	this.scrollLefts = new Array();

	// label
	var lgwid = 440;
	var lg = document.createElementNS(SVGNS,"g");
	lg.setAttribute("id","diagramLabel");
	this.SVGRoot.appendChild(lg);

	// add click handler
	lg.addEventListener("click",LabelMouseClick,false);

	var label = document.createElementNS(SVGNS,"rect");
	label.setAttribute("id","diagramLabelRect");
	label.setAttribute("class","DiagramLabel");
	label.setAttribute("x",0);
	label.setAttribute("y",0);
	label.setAttribute("width",lgwid);
	label.setAttribute("height",100);

	lg.appendChild(label);

	// text boxes within label
	var line;

	// title
	var text = document.createElementNS(SVGNS,"text");
	text.setAttribute("style","clip-path:url(#clipPath_label);");
	text.setAttribute("id","diagramLabelTitle");
	text.setAttribute("class","LabelTitle");
	text.setAttribute("x", 5);
	text.setAttribute("y", 23);

	// create the text node and append it
	var textNode = document.createTextNode(getLocalText('EDBusinessProcess'));
	text.appendChild(textNode);

	lg.appendChild(text);

	line = document.createElementNS(SVGNS,"line");
	line.setAttribute("id","diagramLabelLine1");
	line.setAttribute("x1",0);
	line.setAttribute("y1",27);
	line.setAttribute("x2",lgwid);
	line.setAttribute("y2",27);
	line.setAttribute("class","LabelLine");
	lg.appendChild(line);

	// name
	var text = document.createElementNS(SVGNS,"text");
	text.setAttribute("style","clip-path:url(#clipPath_label);");
	text.setAttribute("id","diagramLabelName");
	text.setAttribute("class","LabelName");
	text.setAttribute("x", 5);
	text.setAttribute("y", 48);

	// create the text node and append it
	var textNode = document.createTextNode(this.Name);
	text.appendChild(textNode);

	lg.appendChild(text);

	line = document.createElementNS(SVGNS,"line");
	line.setAttribute("id","diagramLabelLine2");
	line.setAttribute("x1",0);
	line.setAttribute("y1",52);
	line.setAttribute("x2",lgwid);
	line.setAttribute("y2",52);
	line.setAttribute("class","LabelLine");
	lg.appendChild(line);

	// annotation
	var text = document.createElementNS(SVGNS,"text");
	text.setAttribute("style","clip-path:url(#clipPath_label);");
	text.setAttribute("id","diagramLabelAnnotation");
	text.setAttribute("class","LabelAnnotation");
	text.setAttribute("x", 5);
	text.setAttribute("y", 72);

	// create the text node and append it (first line only)
	var textNode = document.createTextNode(this.Annotation.split('\n')[0]);
	text.appendChild(textNode);

	lg.appendChild(text);

	line = document.createElementNS(SVGNS,"line");
	line.setAttribute("id","diagramLabelLine3");
	line.setAttribute("x1",0);
	line.setAttribute("y1",75);
	line.setAttribute("x2",lgwid);
	line.setAttribute("y2",75);
	line.setAttribute("class","LabelLine");
	lg.appendChild(line);

	// timestamp
	var text = document.createElementNS(SVGNS,"text");
	text.setAttribute("style","clip-path:url(#clipPath_label);");
	text.setAttribute("id","diagramLabelLastModified");
	text.setAttribute("class","LabelTime");
	text.setAttribute("x", 5);
	text.setAttribute("y", 95);

	// create the text node and append it
	var textNode = document.createTextNode('Last Modified: ' + this.LastModified);
	text.appendChild(textNode);

	lg.appendChild(text);

	// create a series of "drill down" boxes
	var x = 10;
	var y = 100;
	lgwid = 280;

	for (var lvl = 1; lvl <= maxLevels; lvl++) {
		var lvlg = document.createElementNS(SVGNS,"g");
		lvlg.setAttribute("id","levelGroup_" + lvl);
		lvlg.setAttribute("transform","translate(0," + y + ")");
		lvlg.setAttribute("visibility","hidden");

		this.SVGRoot.appendChild(lvlg);

		// add click handler
		lvlg.addEventListener("click",LevelMouseClick,false);

		// box
		label = document.createElementNS(SVGNS,"rect");
		label.setAttribute("class","LevelLabel");
		label.setAttribute("id","levelRect_" + lvl);
		label.setAttribute("x",0);
		label.setAttribute("y",0);
		label.setAttribute("rx",5);
		label.setAttribute("width",lgwid);
		label.setAttribute("height",40);

		lvlg.appendChild(label);

		// level activity type
		text = document.createElementNS(SVGNS,"text");
		text.setAttribute("style","clip-path:url(#clipPath_level);");
		text.setAttribute("id","levelActivityType_" + lvl);
		text.setAttribute("class","LevelActivityType");
		text.setAttribute("x", 5);
		text.setAttribute("y", 12);

		// create the text node and append it
		textNode = document.createTextNode('');
		text.appendChild(textNode);

		lvlg.appendChild(text);

		// level activity name
		text = document.createElementNS(SVGNS,"text");
		text.setAttribute("style","clip-path:url(#clipPath_level);");
		text.setAttribute("id","levelActivityName_" + lvl);
		text.setAttribute("class","LevelActivityName");
		text.setAttribute("x", 5);
		text.setAttribute("y", 35);

		// create the text node and append it
		textNode = document.createTextNode('');
		text.appendChild(textNode);

		lvlg.appendChild(text);

		y += 40;
	}
}

// get info on the diagram for the Inspector
function BPLDiagram_getInfo()
{
	var state = '';

	state += 'DiagramType'+insDelim2+'STRING'+ insDelim2 + this.Type + insDelim1;
	state += 'Name'+insDelim2+'STRING' + insDelim2 + this.Name + insDelim1;
	state += 'Component'+insDelim2+'BOOLEAN' + insDelim2 + (this.Component ? 1 : 0) + insDelim1;
	state += 'Annotation'+insDelim2+'DESCRIPTION' + insDelim2 + this.Annotation + insDelim1;
	state += 'ShowAnnotation'+insDelim2+'BOOLEAN' + insDelim2 + (this.ShowAnnotation ? 1 : 0) + insDelim1;
	state += 'Width'+insDelim2+'INTEGER' + insDelim2 + this.Width + insDelim1;
	state += 'Height'+insDelim2+'INTEGER' + insDelim2 + this.Height + insDelim1;
	state += 'Layout'+insDelim2+'ENUM^automatic^manual' + insDelim2 + this.Layout + insDelim1;

	state += 'Language'+insDelim2+'ENUM^basic^objectscript' + insDelim2 + this.Language + insDelim1;
	state += 'Request'+insDelim2+'REQUESTCLASS' + insDelim2 + this.Request + insDelim1;
	state += 'Response'+insDelim2+'RESPONSECLASS' + insDelim2 + this.Response + insDelim1;

	// context
	// prop \x03 type \x03 collection \x03 init \x02
	var context = '';
	for (var i = 0; i < this.Context.length; i++) {
		var prop = this.Context[i];
		context += prop.Name + insDelim2 + prop.Type + insDelim2+ prop.Collection + insDelim2 + prop.InitialExpression + insDelim1a;
	}

	state += 'Context'+insDelim2+'CONTEXT' + insDelim2 + context + insDelim1;
	state += 'ContextSuperClass'+insDelim2+'STRING'+ insDelim2 + this.ContextSuperClass + insDelim1;
	state += 'Includes'+insDelim2+'STRING' + insDelim2 + this.Includes + insDelim1;
	state += 'Version'+insDelim2+'STRING' + insDelim2 + this.Version + insDelim1;

	return state;
}

// set the given property to value
function BPLDiagram_setProperty(prop,value)
{
	var main = document.getElementById("main");
	var old = null;

	var zoom = (currZoom == 0) ? 100 : currZoom;

	switch (prop) {
	case "Name":
		old = this.Name;
		this.Name = value;
		if (!this.currParent) {
			// update text in diagram label
			setTextNode("diagramLabelName",this.Name,false);
		}
		break;

	case "LastModified":
		// don't undo
		this.LastModified = value;
		if (!this.currParent) {
			// update text in diagram label
			setTextNode("diagramLabelLastModified",'Last Modified: ' + this.LastModified, false);
		}
		break;

	case "Annotation":
		old = this.Annotation;
		this.Annotation = value;
		if (!this.currParent) {
			// update text in diagram label
			setTextNode("diagramLabelAnnotation",this.Annotation,false);
		}
		break;

	case "Component":
		// translate int to bool
		if (value == 1 || value == '1') {
			value = true;
		}
		else if (value == 0 || value == '0') {
			value = false;
		}

		old = this.Component;
		this.Component = value;
		break;

	case "ShowAnnotation":
		// translate int to bool
		if (value == 1 || value == '1') {
			value = true;
		}
		else if (value == 0 || value == '0') {
			value = false;
		}

		old = this.ShowAnnotation;
		this.ShowAnnotation = value;

		if (this.ShowAnnotation) {
			// show details
			document.getElementById("diagramLabelRect").setAttribute("height",100);
			document.getElementById("diagramLabelLine1").setAttribute("visibility","");
			document.getElementById("diagramLabelLine2").setAttribute("visibility","");
			document.getElementById("diagramLabelLine3").setAttribute("visibility","");
			document.getElementById("diagramLabelName").setAttribute("visibility","");
			document.getElementById("diagramLabelAnnotation").setAttribute("visibility","");
			document.getElementById("diagramLabelLastModified").setAttribute("visibility","");
		}

		// now show/hide annotation for all shapes
		for (var i = 0; i < this.shapeList.length; i++) {
			var shape = this.shapeList[i];

			if (!shape.isCopy && !shape.isDeleted) {

				var line = document.getElementById("shape_annotationLine_" + shape.index);
				var text = document.getElementById("shape_annotationText_" + shape.index);
				var box = document.getElementById("shape_annotationBox_" + shape.index);
				if (this.ShowAnnotation && shape.Annotation != '') {
					if (line) { line.setAttribute("visibility",""); }
					if (text) { text.setAttribute("visibility",""); }
					if (box) { box.setAttribute("visibility",""); }
				}
				else {
					if (line) { line.setAttribute("visibility","hidden"); }
					if (text) { text.setAttribute("visibility","hidden"); }
					if (box) { box.setAttribute("visibility","hidden"); }
				}
			}
		}
		break;

	case "Width":
		old = this.Width;
		value = parseInt(value,10);
		value = (value < 200) ? 200 : value;
		value = (value > 24000) ? 24000 : value;

		this.Width = value;

		// set width of various things
		main.setAttribute("width",this.Width);
		main.setAttribute("viewBox","0 0 " + this.Width + " " + this.Height);

		var embed = self.document.getElementById("SVGEmbed");
		if (embed) {
			embed.width = 0.75 * this.Width * (zoom / 100);
		}
		break;

	case "Height":
		old = this.Height;
		value = parseInt(value,10);
		value = (value < 200) ? 200 : value;
		value = (value > 100000) ? 100000 : value;

		this.Height = value;

		// set height of various things
		main.setAttribute("height",this.Height);
		main.setAttribute("viewBox","0 0 " + this.Width + " " + this.Height);

		var embed = self.document.getElementById("SVGEmbed");
		if (embed) {
			embed.height = 0.75 * this.Height * (zoom / 100);
		}
		break;

	case "ContextSuperClass":
		old = this.ContextSuperClass;
		this.ContextSuperClass = value;
		break;
	case "Layout":
		old = this.Layout;
		this.Layout = value;
		break;
	case "Version":
		old = this.Version;
		this.Version = value;
		break;
	case "Includes":
		old = this.Includes;
		this.Includes = value;
		break;
	case "Language":
		old = this.Language;
		this.Language = value;
		break;
	case "Request":
		old = this.Request;
		this.Request = value;
		break;
	case "Response":
		old = this.Response;
		this.Response = value;
		break;

	case "Context":
		// no undo
		this.Context = new Array();
		var s = value.split(insDelim1a);
		for (var i = 0; i < s.length-1; i++) {
			var t = s[i].split(insDelim2);
			var prop = new Object();
			prop.Name = t[0];
			prop.Type = t[1];
			prop.Collection = t[2];
			prop.InitialExpression = t[3];
			this.Context[this.Context.length] = prop;
		}
		break;

	default:
		break;
	}

	setModified(true);

	if (old) {
		undo_AddAction("set",this,prop,old);
	}
}

// save this diagram to a serialized string
function BPLDiagram_save()
{
	var state = '';
	var shape;

	var startTime = new Date();

	// see if there are errors in the diagram
	var hasErrors = false;
	for (var i = 0; i < this.shapeList.length; i++) {
		shape = this.shapeList[i];
		if (!shape.isCopy && !shape.isDeleted) {
			if (!shape.isValid()) {
				hasErrors = true;
				break;
			}
		}
	}

	if (hasErrors) {
		//YSD2336 alert("Note: there are errors in this BPL diagram. No code will be generated.");
		var err = getLocalText("BPLError");
		alert(err);

	}

	var lines = new Array();

	// process info
	var hdr = '<diagram Name="' + escapeXML(this.Name) +
				'" HasErrors="' + (hasErrors ? '1' : '0') +
				'" Language="' + escapeXML(this.Language) +
				'" ContextSuperClass="' + escapeXML(this.ContextSuperClass) +
				'" Layout="' + escapeXML(this.Layout) +
				'" Version="' + escapeXML(this.Version) +
				'" Includes="' + escapeXML(this.Includes) +
				'" Request="' + escapeXML(this.Request) +
				'" Response="' + escapeXML(this.Response) +
				'" Width="' + escapeXML(this.Width) +
				'" Height="' + escapeXML(this.Height) +
				'" ShowAnnotation="' + (this.ShowAnnotation ? '1' : '0') + '"';

	if (this.Component) {
		hdr += ' Component="1"';
	}

	hdr += '>';
	lines[lines.length] = hdr;

	// annotation
	if (this.Annotation.length > 0) {
		lines[lines.length] = '<annotation>' + escapeXML(this.Annotation) + '</annotation>';
	}

	// context
	if (this.Context.length > 0) {
		lines[lines.length] = '<context>';
		for (var i = 0; i < this.Context.length; i++) {
			var prop = this.Context[i];
			// see if there are any parameters for the property
			var parms = getPropertyParameters(prop.Type);
			var ptype = parms[0].name;

			lines[lines.length] = '<property' +
						' name="' + escapeXML(prop.Name) + '"' +
						' type="' + escapeXML(ptype) + '"' +
						' initialexpression="' + escapeXML(prop.InitialExpression) + '"' +
						' collection="' + escapeXML(prop.Collection) + '"' +
						(parms.length>1 ? '' : '/') +
					  	'>';

			if (parms.length>1) {
				lines[lines.length] = '<parameters>';
				for (var p = 1; p < parms.length; p++) {
					lines[lines.length] = '<parameter' +
						' name="' + escapeXML(parms[p].name) + '"' +
						' value="' + escapeXML(parms[p].value) + '"' +
					  	'/>';
				}
				lines[lines.length] = '</parameters>';
				lines[lines.length] = '</property>';
			}
		}
		lines[lines.length] = '</context>';
	}

	// save shapes
	for (var i = 0; i < this.shapeList.length; i++) {
		shape = this.shapeList[i];
		if (!shape.isCopy && !shape.isDeleted) {
			lines[lines.length] = shape.save();
		}
	}

	// save connections
	for (var i = 0; i < this.shapeList.length; i++) {
		shape = this.shapeList[i];

		if (!shape.isCopy && shape.outputList) {
			for (var c = 0; c < shape.outputList.length; c++) {
				var cnct = shape.outputList[c];
				if (cnct.ConnectType != 'goto') {

					var t = '<connection Name="' + escapeXML(cnct.Name) + '" from="' + i + '" to="' + cnct.toShape.index + '"';

					switch(cnct.ConnectType) {
					case 'case':
						t += ' ConnectType="case" Condition="' + escapeXML(cnct.Condition) + '"';
						break;
					case 'branch':
						t += ' ConnectType="branch" ';
						break;
					case 'thread':
						t += ' ConnectType="thread" ';
						break;
					}

					if (cnct.Disabled) {
						t += ' Disabled="true" ';
					}

					t += '/>';
					lines[lines.length] = t;
				}
			}
		}
	}

	lines[lines.length] = '</diagram>';
	state = lines.join('\r\n');

	var endTime = new Date();
	var saveTime = endTime.getTime() - startTime.getTime();
	//alert('Save time: ' + saveTime + 'ms');
	return state;
}

// return csv list of all activity names
// if prop is not null, filter on bagged property as well
function BPLDiagram_listItems(type,prop,val)
{
	var list = '';
	for (var i = 0; i < this.shapeList.length; i++) {
		var shape = this.shapeList[i];
		if (!shape.isCopy && !shape.isDeleted && shape.Name != '') {
			if (type == '' || type == shape.Type) {
				if (!prop) {
					list += (list == '' ? '' : ',') + shape.Name;
				}
				else {
					// filter against property
					if (get(shape.propertyBag[prop]) == val) {
						list += (list == '' ? '' : ',') + shape.Name;
					}
				}
			}
		}
	}

	return list;
}

// load this diagram from a serialized string
function BPLDiagram_open(state)
{
	// delete current shapes
	var count = this.shapeList.length;

	for (var i = 0; i < count; i++) {
		var shape = this.shapeList[i];
		shape.deleteShape(true);
	}

	// delete shapeList
	this.shapeList.length = 0;

	// load new shapes
	parseSerialState(this,state);

	// reset the undo buffer
	undo_ResetBuffer();
}

// return the index number for the next shape to be inserted...
function BPLDiagram_nextShapeNumber()
{
	return this.shapeList.length;
}

function BPLDiagram_insertShape(shape)
{
	this.shapeList[this.shapeList.length] = shape;

	// if not in the current group, hide it...
	if (shape.SVGGroup && (shape.parentShape != this.currParent)) {
		shape.SVGGroup.setAttribute("visibility","hidden");
		if (shape.boundingBox) {
			shape.boundingBox.setAttribute("visibility","hidden");
		}
		if (shape.boundingBoxLine) {
			shape.boundingBoxLine.setAttribute("visibility","hidden");
		}
	}
}

// delete the given shape
// if final, then really delete, else just mark this as deleted
function BPLDiagram_deleteShape(shape, finyl)
{
	// remove shape from selected list
	for (var i = 0; i < selectedItems.length; i++) {
		if (selectedItems[i] == shape) {
			selectedItems.splice(i,1);
			break;
		}
	}

	shape.deleteShape(finyl);

	if (finyl) {
		var index = shape.index;
		var count = this.shapeList.length;

		// close up gap in shapeList
		for (var i = index; i < (count-1); i++) {
			this.shapeList[i] = this.shapeList[i+1];
		}
		this.shapeList.length = this.shapeList.length-1;
	}
}

/// Make parent (shape #) the current parent
function BPLDiagram_setCurrParent(parent)
{
	if (this.currParent == parent) {
		return;
	}

	this.currParent = parent;

	var oldlevel = this.levels.length;

	// reset the levels array with parents of this shape
	this.levels.length = 0;

	var a = new Array();
	while (parent) {
		a[a.length] = parent;
		var shape = this.shapeList[parent];
		parent = shape.parentShape;
	}

	// copy a into levels
	for (var i = a.length - 1; i >= 0; i--) {
		this.levels[this.levels.length] = a[i];
	}

	// update text in diagram label
	this.updateLevel();

	// update context menu
 	setMenuItemOption("enabled","menu_drillUp", null, (this.currParent != null));

	// unselect all shapes
	selectItem(null,false);

	var newlevel = this.levels.length;

	// reset scroll bars for new level
	if (self.document.body && (self.document.body.scrollTop != null)) {
		if (newlevel > oldlevel) {
			// remember old; set new to 0
			theDiagram.scrollTops[oldlevel] = self.document.body.scrollTop;
			theDiagram.scrollLefts[oldlevel] = self.document.body.scrollLeft;
			self.document.body.scrollTop = 0;
			self.document.body.scrollLeft = 0;
		}
		else if (newlevel < oldlevel) {
			// restore old settings
			self.document.body.scrollTop = parseInt(theDiagram.scrollTops[newlevel]);
			self.document.body.scrollLeft = parseInt(theDiagram.scrollLefts[newlevel]);
		}
	}
}

/// internal function: updates the diagram to display
/// the new page for this level (drill up/down)
function BPLDiagram_updateLevel()
{
	var parent = this.currParent;

	// update the levels boxes
	for (var lvl = 1; lvl <= maxLevels; lvl++) {
		var el = document.getElementById("levelGroup_" + lvl);
		if (lvl <= this.levels.length) {
			// make this box visible
			el.setAttribute("visibility","");

			// update text in diagram label
			setTextNode("levelActivityType_" + lvl,"<" + this.shapeList[this.levels[lvl-1]].Type + ">",false)
			setTextNode("levelActivityName_" + lvl,this.shapeList[this.levels[lvl-1]].Name,false)
		}
		else {
			el.setAttribute("visibility","hidden");
		}
	}

	// update text in diagram label
	var str;
	if (parent) {
		var nm = this.shapeList[parent].Name;
		str = getLocalText('EDContentsOf',nm?nm:('<'+this.shapeList[parent].Type+'>'));
	}
	else {
		str = getLocalText('EDBusinessProcess');
	}
	setTextNode("diagramLabelTitle",str,false);

	// show everyone in this group; hide everyone else
	for (var i = 0; i < this.shapeList.length; i++) {
		var shape = this.shapeList[i];

		if (!shape.isCopy) {
			if (!shape.isDeleted && shape.parentShape == parent) {
				if (!shape.SVGGroup) {
					RenderBPLShape(shape);
				}

				// display
				if (shape.SVGGroup) {
					shape.SVGGroup.setAttribute("visibility","");
				}

				if (shape.boundingBox) {
					shape.boundingBox.setAttribute("visibility","");
				}
				if (shape.boundingBoxLine) {
					shape.boundingBoxLine.setAttribute("visibility","");
				}

				// display any outputs for this shape
				for (var c = 0; c < shape.outputList.length; c++) {
					var conn = shape.outputList[c];

					// line
					if (conn.SVGline) {
						conn.SVGline.setAttribute("visibility","");
					}

					// label
					if (conn.SVGtext) {
						conn.SVGtext.setAttribute("visibility","");
					}
				}

				if (shape.gotoConnection) {
					var conn = shape.gotoConnection;
					if (conn.SVGline) {
						conn.SVGline.setAttribute("visibility","");
					}
					if (conn.SVGtext) {
						conn.SVGtext.setAttribute("visibility","");
					}
				}

				shape.updateStyle();
			}
			else {
				// hide
				if (shape.SVGGroup) {
					shape.SVGGroup.setAttribute("visibility","hidden");
				}

				if (shape.boundingBox) {
					shape.boundingBox.setAttribute("visibility","hidden");
				}
				if (shape.boundingBoxLine) {
					shape.boundingBoxLine.setAttribute("visibility","hidden");
				}

				// hide any outputs for this shape
				for (var c = 0; c < shape.outputList.length; c++) {
					var conn = shape.outputList[c];
					conn.SVGline.setAttribute("visibility","hidden");

					// label
					if (conn.SVGtext) {
						conn.SVGtext.setAttribute("visibility","hidden");
					}
				}

				if (shape.gotoConnection) {
					var conn = shape.gotoConnection;
					conn.SVGline.setAttribute("visibility","hidden");
					if (conn.SVGtext) {
						conn.SVGtext.setAttribute("visibility","hidden");
					}
				}
			}
		}
	}
	updateBoundingBoxes();
}

// rearrange the shapes in the diagram
function BPLDiagram_arrangeShapes()
{
	undo_AddAction("blockStart",null,null,null);

	// sort shapes by connection...
	// first, group all shapes by how they are connected
	var grpNone = new Array();	// no connections
	var grpOut = new Array();	// output only

	for (var i = 0; i < this.shapeList.length; i++) {
		shape = this.shapeList[i];

		// only consider shapes in current *group*
		if (!shape.isCopy && !shape.isDeleted && shape.parentShape == this.currParent) {

			// test for connections
			if ((shape.inputList.length == 0) && (shape.outputList.length == 0)) {
				grpNone[grpNone.length] = shape;
			}
			else if ((shape.inputList.length == 0) && (shape.outputList.length > 0)) {
				grpOut[grpOut.length] = shape;
			}

			// if shape has multiple outputs, sort by # of items in each branch
			if (shape.outputList.length > 1) {

				// get depth of each branch
				var da = new Array();
				var wa = new Array();
				arrangeThread(0,0,shape,da,wa,false);

				for (var n = 0; n < shape.outputList.length; n++) {
					shape.outputList[n].depth = da[n];
				}

				// sort the outputs by position
				shape.outputList.sort(function(a,b) { return a.depth - b.depth; });
			}
		}
	}

	// put all unconnected shapes to the side
	y = yStart;
	x = xStart + xSpace;

	for (var i = 0; i < grpNone.length; i++) {
		shape = grpNone[i];
		shape.moveTo(x,y);
		y += ySpace;
	}

	// now arrange output-onlys along the top
	// and string their children beneath them
	x = xStart;

	for (var i = 0; i < grpOut.length; i++) {
		y = yStart;
		shape = grpOut[i];

		var da = new Array();
		var wa = new Array();
		arrangeThread(x,y,shape,da,wa,true);

		if (wa[0]) {
			x += (xSpace * wa[0]);
		}
	}

	// notify external system of change
	if (selectedItems.length == 1) {
		canvas_setResultsDiv("INFO",selectedItems[0].getInfo());
		canvas_raiseEvent("SELECT");
	}

	undo_AddAction("blockEnd",null,null,null);
	updateBoundingBoxes();
}

// ----------------------------------------------------------------
// next generation arrange algorithm

// calculate depth and width of all threads branching
// off from this shape;
// depthArray and widthArray are depth and width indexed
// by branch #.
// if moveShapes is false, then calculate depth and width only
function arrangeThread(xp, yp, shape, depthArray, widthArray, moveShapes)
{
	var lastShape = shape;
	var child = null;
	var n,x,y;

	if (moveShapes) {
		shape.moveTo(xp,yp);
	}

	// test if this shape has any short-circuit connections to a join
	// if true, we will overshift items to make line nice
	var ss = false;
	if (shape.outputList.length > 1) {
		for (n = 0; n < shape.outputList.length; n++) {
			if (shape.outputList[n].toShape.Type == "join") {
				ss = true;
				break;
			}
		}
	}

	// process branches
	var	wid = 0;
	x = xp;

	for (n = 0; n < shape.outputList.length; n++) {
		// reset y pos
		y = yp + ySpace;

		if (shape.outputList.length > 1) {
			// a little more space for first children
			y += ySpace / 2;
		}

		// update x pos; test for overshift
		if (ss) {
			if (n == 0) {
				x = xp + (xSpace / 2);
			}
			else if ((n > 0) && (shape.outputList[n-1].toShape.Type != "join")) {
				x += xSpace + ((wid > 0) ? ((wid-1) * xSpace) : 0);
			}
		}
		else {
			if (n == 0) {
				x = xp;
			}
			else {
				x += xSpace + ((wid > 0) ? ((wid-1) * xSpace) : 0);
			}
		}

		child = shape.outputList[n].toShape;
		var endOfBranch = false;

		depthArray[n] = 0.5;
		widthArray[n] = 1;

		// trace to end of this thread

		while (child && !endOfBranch) {
			depthArray[n]++;

			if (child.Type == 'join') {
				lastShape = child;

				if (moveShapes) {
					child.moveTo(x,y);
				}

				// end of branch
				endOfBranch = true;
			}
			else {
				if (moveShapes) {
					child.moveTo(x,y);
				}

				if (child.outputList.length == 0) {
					// end of thread
					child = null;
				}
				else {
					switch (child.Type) {
					case 'switch':
					case 'if':
					case 'flow':
					case 'scope':
						// recurse
						var da = new Array();
						var wa = new Array();

						child = arrangeThread(x,y,child,da,wa,moveShapes);

						// find largest depth
						var max = 0;
						for (var d = 0; d < da.length; d++) {
							max = (da[d] > max) ? da[d] : max;
						}
						depthArray[n] += max;

						// sum up widths
						wid = 0;
						for (var w = 0; w < wa.length; w++) {
							wid += wa[w];
						}

						// see if we need to increase our width
						widthArray[n] = (wid > widthArray[n]) ? wid : widthArray[n];

						// move join
						if (moveShapes && child) {
							y += (ySpace * max);
							child.moveTo(x,y);
						}

						y += ySpace;
						break;

					default:
						y += ySpace;
						break;
					}

					if (child) {
						// next child in line
						child = child.outputList[0].toShape;
					}
				}
			}
		}
	}
	return lastShape;
}

// special list used to detect loops within findMatchingShapes
// indexed by shape index
var matchLoopDetect = null;

// Find the array of shapes associated with this shape
// update bounding box, as a side effect
function findMatchingShapes(shape)
{
	var type = shape.Type;
	var forward = true;
	var name = "";
	var calls = "";
	var results = new Object();
	matchLoopDetect = new Object();  // visited objects by index

	// clear bounding box
	var originalShape = shape;
	originalShape.bbTop = shape.yPos - shapeHeight/2 - 10;
	originalShape.bbBottom = shape.yPos + shapeHeight/2 + 10;
	originalShape.bbLeft = shape.xPos - shapeWidth/2 - 10;
	originalShape.bbRight = shape.xPos + shapeWidth/2 + 10;
	originalShape.bbMid = null;

	// set up search parms
	switch (type) {
	case "if":
	case "flow":
	case "scope":
	case "switch":
		forward = true;
		break;

	case "join":
		forward = false;
		break;

	case "start":
		forward = true;
		break;

	case "end":
		forward = false;
		break;

	case "call":
		var async = shape.propertyBag["Async"];
		if (!async) {
			return null;
		}
		forward = true;
		name = shape.Name;
		break;

	case "sync":
		var s = shape.propertyBag["Calls"];
		if (!s || s == "") {
			return null;
		}
		calls = s.split(",");
		forward = false;
		break;

	case "branch":
		// show label
		if (shape.gotoConnection) {
			shape = shape.gotoConnection.toShape;
			results[shape.index] = shape;
			return results;
		}
		break;

	case "label":
		// show all branches that point to us
		var count = 0;
		for (var n = 0; n < shape.inputList.length; n++) {
			var cnct = shape.inputList[n];
			if (cnct.ConnectType == 'goto') {
				results[cnct.fromShape.index] = cnct.fromShape;
				count++;
			}
		}
		return (count > 0) ? results : null;

	default:
		return null;
	}

	while (shape) {
		matchLoopDetect[shape.index] = true;

		// update bounding box
		var sTop = shape.yPos - shapeHeight/2 - 10;
		var sBottom = shape.yPos + shapeHeight/2 + 10;
		var sLeft = shape.xPos - shapeWidth/2 - 10;
		var sRight = shape.xPos + shapeWidth/2 + 10;

		originalShape.bbTop = (sTop < originalShape.bbTop) ? sTop : originalShape.bbTop;
		originalShape.bbBottom = (sBottom > originalShape.bbBottom) ? sBottom: originalShape.bbBottom;
		originalShape.bbLeft = (sLeft < originalShape.bbLeft) ? sLeft : originalShape.bbLeft;
		originalShape.bbRight = (sRight > originalShape.bbRight) ? sRight : originalShape.bbRight;

		// the first catch sets mid-line
		if (null==originalShape.bbMid && ('catchall' == shape.Type || 'catch' == shape.Type)) {
			originalShape.bbMid = sTop-2;
		}

		switch (type) {
		case "if":
		case "flow":
		case "scope":
		case "switch":
			if (shape.Type == "join") {
				results[shape.index] = shape;
				return results;
			}
			break;

		case "join":
			if ((shape.Type == "if") || (shape.Type == "switch") ||(shape.Type == "flow")||(shape.Type == "scope")){
				results[shape.index] = shape;
				return results;
			}
			break;

		case "start":
			if (shape.Type == "end") {
				results[shape.index] = shape;
				return results;
			}
			break;

		case "end":
			if (shape.Type == "start") {
				results[shape.index] = shape;
				return results;
			}
			break;

		case "call":
			// see if this is matching sync
			if ((shape.Type == "sync") && (shape.propertyBag["Calls"])) {
				calls = shape.propertyBag["Calls"].split(",");
				for (var i = 0; i < calls.length; i++) {
					if (calls[i] == name) {
						results[shape.index] = shape;
					}
				}
			}
			break;

		case "sync":
			// see if this is matching call
			if ((shape.Type == "call") && (shape.propertyBag["Async"])) {
				var ln = (calls ? calls.length : 0);
				for (var i = 0; i < ln; i++) {
					if (calls[i] == shape.Name) {
						results[shape.index] = shape;
					}
				}
			}
			break;
		}

		if (forward) {
			if (shape.outputList.length == 0) {
				// end of thread
				shape = null;
			}
			else {
				switch (shape.Type) {
				case 'switch':
				case 'if':
				case 'flow':
				case 'scope':
					// loop over branches
					var next = null;
					for (var n = 0; n < shape.outputList.length; n++) {
						var child = shape.outputList[n].toShape;
						var sub = findMatchingShapesInBranch(originalShape,child, results, type, forward,name,calls);
						if (!next) {
							next = sub;
						}

						if (sub && ((type == 'if')||(type == 'switch')||(type == 'flow')||(type == 'scope'))) {
							results[sub.index] = sub;
						}
					}
					shape = next;
					break;

				default:
					// next shape
					shape = shape.outputList[0].toShape;
					if (shape!=null && matchLoopDetect[shape.index]) {
						shape = null;
					}
					break;
				}
			}
		}
		else {
			// backward
			if (shape.inputList.length == 0) {
				// end of thread
				shape = null;
			}
			else {
				switch (shape.Type) {
				case 'join':
					// loop over branches
					var prev = null;
					for (var n = 0; n < shape.inputList.length; n++) {
						var child = shape.inputList[n].fromShape;
						var sub = findMatchingShapesInBranch(originalShape,child, results, type, forward,name,calls);
						if (!prev) {
							prev = sub;
						}

						if (sub && ((type == 'join'))) {
							results[sub.index] = sub;
						}
					}
					shape = prev;
					break;

				default:
					shape = shape.inputList[0].fromShape;
					if (shape!=null && matchLoopDetect[shape.index]) {
						shape = null;
					}
					break;
				}
			}
		}
	}

	// if nothing in results, clear it
	var c = 0;
	for (var n in results) {
		c++;
	}
	if (c == 0) {
		results = null;
	}

	return results;
}

// helper function to find items in branches
// returns join at end
// *root* is shape that started the operation (whose bounding box we update)
function findMatchingShapesInBranch(root, shape, results, type, forward,name,calls,depth)
{
	var join = null;
	var originalShape = shape;
	depth = (null == depth) ? 1 : depth;

	while (shape) {
		matchLoopDetect[shape.index] = true;

		if (root) {
			// update bounding box
			var sTop = shape.yPos - shapeHeight/2 - 10;
			var sBottom = shape.yPos + shapeHeight/2 + 10;
			var sLeft = shape.xPos - shapeWidth/2 - 10;
			var sRight = shape.xPos + shapeWidth/2 + 10;

			root.bbTop = (sTop < root.bbTop) ? sTop : root.bbTop;
			root.bbBottom = (sBottom > root.bbBottom) ? sBottom: root.bbBottom;
			root.bbLeft = (sLeft < root.bbLeft) ? sLeft : root.bbLeft;
			root.bbRight = (sRight > root.bbRight) ? sRight : root.bbRight;

			// the first catch sets mid-line
			if (1==depth && null==root.bbMid && ('catchall' == shape.Type || 'catch' == shape.Type)) {
				root.bbMid = sTop-2;
			}
		}

		switch (type) {
		case "call":
			// see if this is matching sync
			if ((shape.Type == "sync") && (shape.propertyBag["Calls"])) {
				var calls2 = shape.propertyBag["Calls"].split(",");
				for (var i = 0; i < calls2.length; i++) {
					if (calls2[i] == name) {
						results[shape.index] = shape;
					}
				}
			}
			break;

		case "sync":
			// see if this is matching call
			if ((shape.Type == "call") && (shape.propertyBag["Async"])) {
				var ln = (calls ? calls.length : 0);
				for (var i = 0; i < ln; i++) {
					if (calls[i] == shape.Name) {
						results[shape.index] = shape;
					}
				}
			}
			break;
		}

		// next

		if (forward) {
			if (shape.outputList.length == 0) {
				// end of thread
				shape = null;
			}
			else {
				switch (shape.Type) {
				case 'switch':
				case 'if':
				case 'flow':
				case 'scope':
					// loop over branches
					var next = null;
					for (var n = 0; n < shape.outputList.length; n++) {
						var child = shape.outputList[n].toShape;
						var sub;
						if (child && matchLoopDetect[child.index]) {
							sub = null;
						}
						else {
							sub = findMatchingShapesInBranch(root,child, results, type, forward,null,null,depth+1);
						}
						if (!next) {
							next = sub;
						}
					}
					shape = next;
					if (shape && shape.outputList.length > 0) {
						shape = shape.outputList[0].toShape;
						if (shape!=null && matchLoopDetect[shape.index]) {
							shape = null;
						}
					}
					else {
						shape = null;
					}
					break;

				case 'join':
					join = shape;
					shape = null;
					break;

				default:
					// next shape
					shape = shape.outputList[0].toShape;
					if (shape!=null && matchLoopDetect[shape.index]) {
						shape = null;
					}
					break;
				}
			}
		}
		else {
			// backward
			if (shape.inputList.length == 0) {
				// end of thread
				shape = null;
			}
			else {
				switch (shape.Type) {
				case 'switch':
				case 'if':
				case 'flow':
				case 'scope':
					join = shape;
					shape = null;
					break;

				case 'join':
					// loop over branches
					var prev = null;
					for (var n = 0; n < shape.inputList.length; n++) {
						var child = shape.inputList[n].fromShape;
						var sub;
						if (child && matchLoopDetect[child.index]) {
							sub = null;
						}
						else {
							sub = findMatchingShapesInBranch(root,child, results, type, forward,null,null,depth+1);
						}
						if (!prev) {
							prev = sub;
						}
					}
					shape = prev;
					if (shape && shape.inputList.length > 0) {
						shape = shape.inputList[0].fromShape;
						if (shape!=null && matchLoopDetect[shape.index]) {
							shape = null;
						}
					}
					else {
						shape = null;
					}
					break;

				default:
					shape = shape.inputList[0].fromShape;
					if (shape!=null && matchLoopDetect[shape.index]) {
						shape = null;
					}
					break;
				}
			}
		}
	}

	return join;
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
	var out = '';

	// don't escape numbers
	if (text == (text * 1)) {
		return text;
	}

	// skip null values
	if (text == null || text == '') {
		return '';
	}

	for (var p = 0; p < text.length; p++) {
		var ch = text.charAt(p);
		switch (ch) {
		case '&':
			out += '&amp;';
			break;
		case '<':
			out += '&lt;';
			break;
		case '>':
			out += '&gt;';
			break;
		case '"':
			out += '&quot;';
			break;
		default:
			out += ch;
			break;
		}
	}

	return out;
}

// save this shape to a string
function BPLShape_save()
{
	var state = '<shape';

	// properties
	for (var name in this) {
		var prop = this[name];
		if (typeof(prop) != "object" && typeof(prop) != "function") {
			// skip these properties in XML
			switch (name) {
			case 'isCopy':
			case 'isDeleted':
			case 'normalStyle':
			case 'propertyList':
			case 'code':
			case 'xInput':
			case 'yInput':
			case 'xOutput':
			case 'yOutput':
			case 'requestType':
			case 'responseType':
			case 'validationMsg':
			case 'Annotation':
			case 'Parameters':
			case 'gotoHandleX':
			case 'gotoHandleY':
			case 'gotoConnection':
			case 'bbTop':
			case 'bbLeft':
			case 'bbRight':
			case 'bbBottom':
			case 'bbMid':
			case '_ax':
			case '_ay':
				// skip
				break;

			case 'Type':
			case 'index':
				// these get a special _ in front
				state += ' _' + name + '="' + escapeXML(prop) + '"';
				break;

			case 'Disabled':
				if (prop) {
					state += ' ' + name + '="true"';
				}
				break;

			default:
				state += ' ' + name + '="' + escapeXML(prop) + '"';
				break;
			}
		}
	}

	// special case for branch:label
	if (this.Type == 'branch' && this.gotoConnection) {
		// find label from connector
		var label = this.gotoConnection.toShape.Name;
		state += ' Label="' + escapeXML(label) + '"';
	}

	// property bag
	for (var name in this.propertyBag) {
		state += ' ' + name + '="' + escapeXML(this.propertyBag[name]) + '"';
	}

	var hasChildren = false;

	// annotation
	if (this.Annotation != '') {
		if (!hasChildren) {
			hasChildren = true;
			state += '>\r\n';
		}

		state += '<annotation>' + escapeXML(this.Annotation) + '</annotation>\r\n';
	}

	// parameters (only applies to xslt)
	if (('xslt'==this.Type)&&(null!=this.Parameters)&&(this.Parameters.length > 0)) {
		if (!hasChildren) {
			hasChildren = true;
			state += '>\r\n';
		}

		state += '<parameters>\r\n';
		for (var i = 0; i < this.Parameters.length; i++) {
			var prop = this.Parameters[i];
			state += 	'<parameter' +
						' name="' + escapeXML(prop.Name) + '"' +
						' value="' + escapeXML(prop.Value) + '"' +
					  	'/>\r\n';
		}
		state += '</parameters>\r\n';
	}

	// request / response
	if ((this.requestType != null) || (this.responseType != null)) {
		if (!hasChildren) {
			hasChildren = true;
			state += '>\r\n';
		}

		if (this.requestType != null && '' != this.requestType) {
			// serialize request block
			var block = '<request type="' + this.requestType + '">\r\n';

			if (this.requestAssigns) {
				for (var i = 0; i < this.requestAssigns.length; i++) {
					assign = this.requestAssigns[i];
					block += '<assign ' +
								'property="' + escapeXML(assign.property) + '" ' +
								'action="' + escapeXML(assign.action) + '" ' +
								'value="' + escapeXML(assign.value) + '" ';

					if (assign.key != '') {
						block += 'key="' + escapeXML(assign.key) + '" '
					}

					block += 	'/>\r\n';
				}
			}
			block += '</request>\r\n';
			state += block;
		}

		if (this.responseType != null && '' != this.responseType) {
			// serialize response block
			var block = '<response type="' + this.responseType + '">\r\n';

			if (this.responseAssigns) {
				for (var i = 0; i < this.responseAssigns.length; i++) {
					assign = this.responseAssigns[i];
					block += '<assign ' +
								'property="' + escapeXML(assign.property) + '" ' +
								'action="' + escapeXML(assign.action) + '" ' +
								'value="' + escapeXML(assign.value) + '" ';

					if (assign.key != '') {
						block += 'key="' + escapeXML(assign.key) + '" '
					}

					block += 	'/>\r\n';
				}
			}
			block += '</response>\r\n';
			state += block;
		}
	}

	// code
	if (this.Type == 'code' || this.Type == 'sql') {
		if (!hasChildren) {
			hasChildren = true;
			state += '>\r\n';
		}
		state += '<code><![CDATA[' + this.code + ']]></code>\r\n';
	}

	if (hasChildren) {
		state += '</shape>';
	}
	else {
		state += '/>';
	}

	// connections are saved later

	return state;
}

// validate any child shapes of this shape
function BPLShape_validateChildren()
{
	var isok = true;

	// loop over children for this shape
	for (var i = 0; i < theDiagram.shapeList.length; i++) {
		var shape = theDiagram.shapeList[i];
		if (!shape.isCopy && !shape.isDeleted && (shape.parentShape == this.index)) {
			isok = shape.isValid();
			if (!isok) {
				break;
			}
		}
	}

	return isok;
}

// Get info on this shape (as a serialized string)
// used by the Studio Inspector
// common implementation shared by specific shape classes
function BPLShape_getInfo(shape)
{
	var state = '';

	state += 'Activity'+insDelim2+'STRING' + insDelim2 + shape.Type + insDelim1;

	// built-in settings
	if (shape.Type != 'start' &&
		shape.Type != 'end' &&
		shape.Type != 'join') {

		state += 'Name'+insDelim2+'STRING' + insDelim2 + shape.Name + insDelim1;
		state += 'Annotation'+insDelim2+'DESCRIPTION' + insDelim2 + shape.Annotation + insDelim1;
		state += 'Disabled'+insDelim2+'BOOLEAN' + insDelim2 + (shape.Disabled ? 1 : 0) + insDelim1;
	}

	if ((shape.Type == 'start') && !shape.parentShape) {
		// topmost start controls topmost sequence in BPL
		state += 'Disabled'+insDelim2+'BOOLEAN' + insDelim2 + (shape.Disabled ? 1 : 0) + insDelim1;
	}

	// branch:label is a special case
	if (shape.Type == 'branch') {
		// find label from connector
		var label = '';
		if (shape.gotoConnection) {
			label = shape.gotoConnection.toShape.Name;
		}
		state += 'Label'+insDelim2+'STRING' + insDelim2 + label + insDelim1;
	}

	state += 'xPos'+insDelim2+'INTEGER' + insDelim2 + shape.xPos + insDelim1;
	state += 'yPos'+insDelim2+'INTEGER' + insDelim2 + shape.yPos + insDelim1;

	// now get list from property bag...
	if (shape.propertyList) {
		var s = shape.propertyList.split(',');
		for (var i = 0; i < s.length; i++) {
			var t = s[i].split(insDelim2);
			var value = shape.propertyBag[t[0]];
			state += t[0] + insDelim2 + t[1] + insDelim2 + (value ? value : '') + insDelim1;
		}
	}

	return state;
}

// delete graphics related to this shape
// if final, really delete, else just mark it as deleted
function BPLShape_deleteShape(finyl)
{
	try {
		// remove connectors..
		while (this.inputList.length > 0) {
			this.inputList[this.inputList.length-1].remove();
		}

		while (this.outputList.length > 0) {
			this.outputList[this.outputList.length-1].remove();
		}

		if (this.gotoConnection) {
			this.gotoConnection.remove();
			this.gotoConnection = null;
		}

		// delete all of our child shapes...
		// show everyone in this group; hide every one else
		for (var i = 0; i < theDiagram.shapeList.length; i++) {
			var shape = theDiagram.shapeList[i];
			if (!shape.isDeleted && shape.parentShape == this.index) {
				shape.deleteShape(finyl);
			}
		}

		// handle "real" delete
		if (finyl) {
			// remove SVG elements
			var group = document.getElementById("shape_" + this.index);
			if (!group) {
				alert('unable to find group for shape: ' + this.index);
				return;
			}

			var parent = group.parentNode;
			if (group && parent) {
				parent.removeChild(group);
			}
			if (this.boundingBox) {
				var parent = this.boundingBox.parentNode;
				if (parent) {
					parent.removeChild(this.boundingBox);
				}
			}
			if (this.boundingBoxLine) {
				var parent = this.boundingBoxLine.parentNode;
				if (parent) {
					parent.removeChild(this.boundingBoxLine);
				}
			}
		}
		else {
			this.isDeleted = true;

			// hide this shape
			if (this.SVGGroup) {
				this.SVGGroup.setAttribute("visibility","hidden");
			}

			if (this.boundingBox) {
				this.boundingBox.setAttribute("visibility","hidden");
			}
			if (this.boundingBoxLine) {
				this.boundingBoxLine.setAttribute("visibility","hidden");
			}

			undo_AddAction("delete",this,null,null);
			setModified(true);
		}
	}
	catch(ex) {
		alert('Exception in deleteShape: ' + ex.message);
	}
}

// set the given property to value
// common implementation shared by specific shape classes
// note boolean values must be 0 and 1
function BPLShape_setProperty(shape,prop,value)
{
	var old = null;

	// branch:label is a special case
	if (shape.Type == 'branch' && prop == 'Label') {
		if (shape.gotoConnection) {
			old = shape.gotoConnection.toShape.Name;
		}

		if (old != value) {
			// see if we can find the referenced label
			var label = findLabel(value);
			if (null == label) {
				alert("There is no label element with name: " + value);
				return null;
			}

			// remove the old connection
			if (shape.gotoConnection) {
				shape.gotoConnection.remove();
				shape.gotoConnection = null;
			}

			// make a new connection
			shape.addOutput(label,"true","goto");
		}
		return old;
	}

	switch (prop) {
	case "Name":
		old = shape.Name;
		shape.Name = value;
		if (shape.isCopy) {
			return null;
		}

		setTextNode("shape_label_" + shape.index, shape.Name,false);
		break;

	case "Disabled":
		value = (value==0) ? false : true;

		old = shape.Disabled;
		shape.Disabled = value;
		if (shape.isCopy) {
			return null;
		}
		shape.updateStyle();
		break;

	case "Annotation":
		old = shape.Annotation;
		shape.Annotation = value;

		if (shape.isCopy) {
			return null;
		}

		// test if we need to make the annotation lines
		// visible or invisible
		var line = document.getElementById("shape_annotationLine_" + shape.index);
		var text = document.getElementById("shape_annotationText_" + shape.index);
		var box = document.getElementById("shape_annotationBox_" + shape.index);

		if (!line && shape._ax && shape._ay && shape.SVGGroup) {
			// we need to render the annotation
			makeAnnotation(shape.SVGGroup,shape,shape._ax,shape._ay);
			delete shape._ax
			delete shape._ay
			line = document.getElementById("shape_annotationLine_" + shape.index);
			text = document.getElementById("shape_annotationText_" + shape.index);
			box = document.getElementById("shape_annotationBox_" + shape.index);
		}
		else {
			// update displayed text
			var size = new Object()
			size.rows = 0;
			size.width = 0;
			setTextNode("shape_annotationText_" + shape.index,shape.Annotation,true,size);

			// adjust size of text box
			if (box && value != '') {
				box.setAttribute("height", size.rows * 19);
				box.setAttribute("width", size.width + 5);
			}
		}

		if (theDiagram.ShowAnnotation) {
			if (old == '' && value != '') {
				// show
				if (line) { line.setAttribute("visibility",""); }
				if (text) { text.setAttribute("visibility",""); }
				if (box) { box.setAttribute("visibility",""); }
			}
			else if (old != '' && value == '') {
				// hide
				if (line) { line.setAttribute("visibility","hidden"); }
				if (text) { text.setAttribute("visibility","hidden"); }
				if (box) { box.setAttribute("visibility","hidden"); }
			}
		}
		else {
			if (line) { line.setAttribute("visibility","hidden"); }
			if (text) { text.setAttribute("visibility","hidden"); }
			if (box) { box.setAttribute("visibility","hidden"); }
		}
		break;

	case "xPos":
		if (shape.isCopy) {
			return null;
		}
		// test for numeric value
		if ((value - 0) == value) {
			old = shape.xPos;
			shape.moveTo(value, shape.yPos);
		}
		break;

	case "yPos":
		if (shape.isCopy) {
			return null;
		}
		// test for numeric value
		if ((value - 0) == value) {
			old = shape.yPos;
			shape.moveTo(shape.xPos, value);
		}
		break;

	default:
		// put it into the property bag
		old = shape.propertyBag[prop];
		old = (old ? old : '');
		shape.propertyBag[prop] = value;
		break;
	}

	if (shape.isCopy) {
		return null;
	}

	setModified(true);
	return old;
}

// update style of this shape based on current diagram state
function BPLShape_UpdateStyle()
{
	if (isLoading) return;

	var el = document.getElementById("shape_main_" + this.index);

	if (el) {
		if (matchShapes && (matchShapes[this.index] == this)) {
			// are we a matching shape
			el.setAttribute("class","BPLShapeMatching");
		}
		else if (isSelected(this)) {
			// we're selected
			if (moveShape) {
				// use simpler style during movement
				el.setAttribute("class","BPLShapeMoving");
			}
			else {
				if (this.Disabled) {
					// disabled
					el.setAttribute("class","BPLShapeDisabledSelected");
				}
				else if (!this.isValid()) {
					// invalid
					el.setAttribute("class","BPLShapeInvalidSelected");
				}
				else {
					el.setAttribute("class","BPLShapeSelected");
				}
			}
		}
		else if (!this.isValid()) {
			// invalid
			el.setAttribute("class","BPLShapeInvalid");
		}
		else if (this.Disabled) {
			// disabled
			el.setAttribute("class","BPLShapeDisabled");
		}
		else {
			el.setAttribute("class",this.normalStyle);
		}

		// input handle
		handle = document.getElementById("shape_input_" + this.index);
		if (handle) {

			if ((currTarget == this) && (rubberStart == "output")) {
				// we're a connection target
				handle.setAttribute("class","InputHandleAccept");
			}
			else if ((currTarget == this) && (rubberStart == "goto") && (this.Type == 'label')) {
				// we're a branch target
				handle.setAttribute("class","InputHandleAccept");
			}
			else if ((inShape == this) && (rubberStart == "input")) {
				// we're start of a connection
				handle.setAttribute("class","InputHandleAccept");
			}
			else if (this.inputList.length > 0) {
				handle.setAttribute("class","InputHandleOn");
			}
			else {
				handle.setAttribute("class","InputHandleOff");
			}
		}

		// output handle
		handle = document.getElementById("shape_output_" + this.index);
		if (handle) {
			if ((currTarget == this) && (rubberStart == "input")) {
				// we're a connection target
				handle.setAttribute("class","OutputHandleAccept");
			}
			else if ((outShape == this) && (rubberStart == "output")) {
				// we're start of a connection
				handle.setAttribute("class","OutputHandleAccept");
			}
			else if (this.outputList.length > 0) {
				handle.setAttribute("class","OutputHandleOn");
			}
			else {
				handle.setAttribute("class","OutputHandleOff");
			}
		}

		// goto handle
		if (this.Type == 'branch') {
			handle = document.getElementById("shape_output_goto_" + this.index);
			if (handle) {
				if ((outShape == this) && (rubberStart == "goto")) {
					// we're start of a connection
					handle.setAttribute("class","OutputHandleAccept");
				}
				else if (this.gotoConnection) {
					handle.setAttribute("class","OutputHandleOn");
				}
				else {
					handle.setAttribute("class","OutputHandleOff");
				}
			}
		}
	}
}

// add a connection from this shape TO 'shape'
// name is the Name of the connector
// Returns the connection, if one is made
// htype, if present, can indicate that this is a special connector
// such as a goto branch.
function BPLShape_AddOutput(shape, name, htype)
{
	name = (null==name) ? '' : name;

	// test if we are already connected to shape
	if ('goto' == htype) {
		if (this.gotoConnection) {
			return null;
		}
	}
	else {
		for (var i = 0; i < this.outputList.length; i++) {
			if (this.outputList[i].toShape == shape) {
				return null;
			}
		}
	}

	var n = this.outputList.length;

	if (this.Type == 'if' && (name == '')) {
		// for <if>
		// make a reasonable guess about whether to make this
		// a true or a false branch
		if (n == 0) {
			name = 'true';
		}
		else if (n == 1) {
			if (this.outputList[0].Name == 'true') {
				name = 'false';
			}
			else {
				name = 'true';
			}
		}
	}

	var ctype = null;
	if ('goto' == htype) {
		ctype = 'goto';
	}

	var connect = new BPLConnector(this,shape,name,ctype);

	if ('goto' == htype) {
		if (this.Type != 'branch') {
			alert('ASSERT FAILURE: attempt to use goto connect for non-branch');
			return;
		}
		this.gotoConnection = connect;
	}
	else {
		this.outputList[n] = connect;

		// special case for switch shapes...
		if (this.Type == 'switch') {
			connect.ConnectType = 'case';
			connect.Condition = '';
		}
		else if (this.Type == 'if') {
			connect.ConnectType = 'branch';
		}
		else if (this.Type == 'flow') {
			connect.ConnectType = 'thread';
		}
	}

	if (!isLoading) {
		// turn on the output handle
		this.updateStyle();
		connect.updateStyle();
	}

	// now tell shape we are connecting to it
	shape.addInput(this, n, htype);

	if (!isLoading) {
		// add to undo list
		undo_AddAction(('goto'==htype) ? "connectGoto" : "connect",null,this,shape);
		setModified(true);

		// make sure all joins etc. get validated
		updateStyleAll();
	}

	return connect;
}

// add a connection to this shape FROM 'shape'
// htype, if present, can indicate that this is a special connector
// such as a goto branch.
function BPLShape_AddInput(shape, n, htype)
{
	// test if we are already connected to shape
	if ('goto' != htype) {
		for (var i = 0; i < this.inputList.length; i++) {
			if (this.inputList[i].fromShape == shape) {
				return;
			}
		}
	}

	// point to connector
	if ('goto' == htype) {
		this.inputList[this.inputList.length] = shape.gotoConnection;
	}
	else {
		this.inputList[this.inputList.length] = shape.outputList[n];
	}

	if (!isLoading) {
		// turn on the input handle
		this.updateStyle();
	}
}


// Test if we can accept the current proposed connection
// does not actually *do* the connection
// all info needed is in state variables
// if ok, set currTarget to this shape
function BPLShape_testConnection()
{
	currTarget = null;
	if (this.isDeleted) {
		return;
	}

	if (rubberStart == "output") {
		// can we accept an input?
		if (outShape && (outShape != this)) {
			if (this.canAcceptInput(outShape)) {
				currTarget = this;
			}
		}
	}
	else if (rubberStart == "goto") {
		// can we accept an goto input? only if we're a label
		if (outShape && (outShape != this) && this.Type == 'label') {
			currTarget = this;
		}
	}
	else {
		// can we accept an output?
		if (inShape && (inShape != this)) {
			if (this.canAcceptOutput(inShape)) {
				currTarget = this;
			}
		}
	}

	// update display
	this.updateStyle();
}

// Abstract Constructor for BPL Shape
// parent is the parent shape #; type is the BPL type
// index is the index number (position in diagram) for this shape
function ConstructBPLShape(shape, index, parent, type, name, x, y, isCopy)
{
	// core properties (external)
	shape.Type = type;
	shape.Name = name;
	shape.Disabled = false;
	shape.xPos = Math.round(x);
	shape.yPos = Math.round(y);
	shape.Annotation = '';
	shape.isCopy = isCopy;

	parent = (parent == null) ? null : parseInt(parent);

	// other properties
	shape.parentShape = parent;
	shape.index = index;
	shape.normalStyle = "BPLShape"; // can be overridden by buildShape
	shape.isDeleted = false;

	shape.validationMsg = '';  // set by isValid method

	// property bag
	shape.propertyBag = new Object();

	// for shapes with code blocks
	shape.code = '';

	// connectors
	shape.inputList = new Array();
	shape.outputList = new Array();

	// methods
	shape.moveTo = BPLShape_moveTo;
	shape.addOutput = BPLShape_AddOutput;
	shape.addInput = BPLShape_AddInput;
	shape.updateStyle = BPLShape_UpdateStyle;
	shape.testConnection = BPLShape_testConnection;
	shape.deleteShape = BPLShape_deleteShape;
	shape.save = BPLShape_save;
	shape.validateChildren = BPLShape_validateChildren;

	// is this is a copy, skip SVG stuff
	if (isCopy) {
		return;
	}

	// create corresponding SVG shape (if our sheet is visible)
	if (shape.parentShape == theDiagram.currParent) {
		RenderBPLShape(shape);
	}
}

/// Create SVG for shape
function RenderBPLShape(shape)
{
	// create corresponding SVG shape
	// group with elements inside
	shape.SVGGroup = document.createElementNS(SVGNS,"g")

	// id value
	shape.SVGGroup.setAttribute("id","shape_" + shape.index);

	// default translation
	var transform = 'translate(' + shape.xPos + ',' + shape.yPos + ')';
	shape.SVGGroup.setAttribute("transform",transform);

	// pointers
	shape.SVGGroup.BPLShape = shape;

	// create inner shape
	var mainel = null;
	mainel = shape.buildShape(shape.SVGGroup);

	// listeners
	if (mainel) {
		mainel.addEventListener("mousedown",BPLShapeMouseDown,false);
		mainel.addEventListener("mouseover",BPLShapeMouseOver,false);
		mainel.addEventListener("mouseout",BPLShapeMouseOut,false);
	}

	// add group to DOM
	var canvas = document.getElementById("canvas");
	canvas.appendChild(shape.SVGGroup);
}

// create the text annotation, append it to the group
function makeAnnotation(group, shape, x, y)
{
	if ('' == shape.Annotation) {
		// defer rendering; hold on to x and y for later
		shape._ax = x;
		shape._ay = y;
		return;
	}

	var points = x + "," + y + " " + (x+32) + "," + (y-25) + " " + (x+160) + "," + (y-25);

	// line
	var line = document.createElementNS(SVGNS,"polyline");
	line.setAttribute("id",'shape_annotationLine_' + shape.index);
	line.setAttribute("points", points);
	line.setAttribute("class","AnnotationLine");
	line.setAttribute("visibility","hidden");

	group.appendChild(line);

	// box under text
	var box = document.createElementNS(SVGNS,"rect");
	box.setAttribute("id",'shape_annotationBox_' + shape.index);
	box.setAttribute("height", 60);
	box.setAttribute("width", 400);
	box.setAttribute("x", x+32);
	box.setAttribute("y", y-23);
	box.setAttribute("stroke", "none");
	box.setAttribute("fill", "white");
	box.setAttribute("opacity", "0.7");
	box.setAttribute("visibility","hidden");
	group.appendChild(box);

	// text
	var text = document.createElementNS(SVGNS,"text");
	text.setAttribute("class","AnnotationText");
	text.setAttribute("visibility","hidden");

	text.setAttribute("id","shape_annotationText_" + shape.index);
	text.setAttribute("text-anchor", "left");
	text.setAttribute("x", x + 32);
	text.setAttribute("y", y - 10);

	// create the text node and append it (first line only)
	var textNode = document.createTextNode(shape.Annotation.split('\n')[0]);
	text.appendChild(textNode);

	group.appendChild(text);
}

// create an input handle, append it to the given SVG group
function makeInputHandle(group, shape, x, y)
{
	// shape...
	var points = x + "," + y + " " + (x+10) + "," + (y-10) + " " + (x-10) + "," + (y-10) + " " + x + "," + y;

	var handle = document.createElementNS(SVGNS,"polygon");
	handle.setAttribute("id",'shape_input_' + shape.index);
	handle.setAttribute("points", points);
	handle.setAttribute("class","InputHandleOff");

	// listeners
	handle.addEventListener("mousedown",inputHandleMouseDown,false);
	handle.addEventListener("mouseover",inputHandleMouseOver,false);
	handle.addEventListener("mouseout",inputHandleMouseOut,false);

	group.appendChild(handle);
}

// create an output handle, append it to the given SVG group
// if *special* is true, this is an additional 'goto' handle
function makeOutputHandle(group, shape, x, y, special)
{
	var handle = document.createElementNS(SVGNS,"circle");
	handle.setAttribute("id",'shape_output_' + (special ? 'goto_' : '') + shape.index);
	handle.setAttribute("cx", x);
	handle.setAttribute("cy", y+5);
	handle.setAttribute("r", 5);
	handle.setAttribute("class","OutputHandleOff");

	// pass handle type to mouse handler
	var htype = special ? 'goto' : 'output';
	handle.addEventListener("mousedown",new Function('evt','htype','outputHandleMouseDown(evt,"'+htype+'");'),false);
	handle.addEventListener("mouseover",outputHandleMouseOver,false);
	handle.addEventListener("mouseout",outputHandleMouseOut,false);

	group.appendChild(handle);
}

// moveTo method
function BPLShape_moveTo(x, y)
{
	this.xPos = Math.round(parseFloat(x));
	this.yPos = Math.round(parseFloat(y));

	// translate the group
	group = this.SVGGroup;
	if (group) {
		var transform = 'translate(' + this.xPos + ',' + this.yPos + ')';
		group.setAttribute("transform",transform);
	}

	// now move any connector we may have...
	var i;

	for (i = 0; i < this.outputList.length; i++) {
		this.outputList[i].updateStart();
	}

	if (this.gotoConnection) {
		this.gotoConnection.updateStart();
	}

	for (i = 0; i < this.inputList.length; i++) {
		this.inputList[i].updateEnd();
	}

}

// ---------------------------------------------------------------------------
// Connector methods

// construct a Connector given a from and to shape
// ctype can be null, "case","goto"
function BPLConnector(from, to, name, ctype)
{
	// properties
	this.fromShape = from;
	this.toShape = to;
	this.Type = "connector";
	this.Name = name;

	// this is "case" for connections to <switch>
	// or "goto" for branch, etc.
	this.ConnectType = (null!=ctype) ? ctype : '';
	this.Condition = "";

	this.Disabled = false;

	// methods
	this.remove = BPLConnector_remove;
	this.updateStart = BPLConnector_updateStart;
	this.updateEnd = BPLConnector_updateEnd;
	this.updateStyle = BPLConnector_updateStyle;
	this.setProperty = BPLConnector_setProperty;
	this.getInfo = BPLConnector_getInfo;
	this.getPath = BPLConnector_getPath;

	// create SVG element
	var canvas = document.getElementById("canvas");
	var id = "connector_" + this.fromShape.index + "-" + this.toShape.index;

	var element = document.createElementNS(SVGNS,"path");
	element.setAttribute("id",id);
	element.setAttribute("class", "BPLConnector");
	element.setAttribute("d", this.getPath());

	element.addEventListener("mousedown",connectorMouseDown,false);
	element.addEventListener("mouseup",connectorMouseUp,false);

	var text = null;
	if ('' != this.Name) {
		text = createConnectorText(id,this.Name)
		canvas.appendChild(text);
	}
	this.SVGtext = text;

	// link element to object and vice versa
	this.SVGline = element;
	element.connector = this;

	// if we are not on current page, make hidden
	if (from.parentShape != theDiagram.currParent) {
		element.setAttribute("visibility","hidden");
		if (text) {
			text.setAttribute("visibility","hidden");
		}
	}

	// insert connector before "label" on canvas
	var label = document.getElementById("diagramLabel");
	canvas.insertBefore(element,label);

	if (this.SVGtext) {
		canvas.insertBefore(this.SVGtext,label);
	}
}

/// create svg text used for connector text
function createConnectorText(id,name)
{
	// create text element for name (clone a model text element)
	var model = document.getElementById("ModelTextPath");
	var text = model.cloneNode(true);
	text.setAttribute("class","ConnectorText");
	text.setAttribute("id",id + "_text");
	text.setAttribute("text-anchor","middle");

	var tp = text.getChildNodes().item(0);
	tp.setAttribute("xlink:href","#" + id)
	tp.setAttribute("startOffset","50%")

	tp.getChildNodes().item(0).setNodeValue(name);
	return text;
}

// a click on a connector
function connectorMouseDown(evt)
{
	// select this connector
	var el = evt.target;
	evt.stopPropagation();

	if (evt.button == 0 || selectedItems.length == 0) {
		// select on primary button unless nothing selected
		selectItem(el.connector, evt.ctrlKey);
	}
	updateCreateLocation(evt);
}

function connectorMouseUp(evt)
{
	evt.stopPropagation();
}

/// Compute the path needed to draw this connector
function BPLConnector_getPath()
{
	var from = this.fromShape;
	var to = this.toShape;

	var fromOutX = from.xPos+from.xOutput;
	var fromOutY = from.yPos+from.yOutput;

	// use goto handle for connection
	if (this.ConnectType == 'goto') {
		fromOutX = from.xPos + from.gotoHandleX;
		fromOutY = from.yPos + + from.gotoHandleY;

		// if this is a connection to shapes on different pages, show short-hand for branch
		if (from.parentShape != to.parentShape) {
				// special case: show stub for branch from one page to another
				var len = 100;
				var path = 	'M' + (fromOutX-len) + ' ' + fromOutY + ' L ' + (fromOutX) + ' ' + (fromOutY);
				path += ' M' + (fromOutX-len) + ' ' + (fromOutY-10)+ ' L ' + (fromOutX-len) + ' ' + (fromOutY+10);
				return path;
		}

		return GetGotoPath(fromOutX,fromOutY,to.xPos+to.xInput,to.yPos+to.yInput);
	}

	return GetPolyPath(fromOutX,fromOutY,to.xPos+to.xInput,to.yPos+to.yInput);
}

// return a path string that best goes from p1 to p2;
// p1 (x1,y1) is assumed to be an output, p2 an input
// This is used for goto connections
function GetGotoPath(x1,y1,x2,y2)
{
	var xPoints = new Array();
	var yPoints = new Array();

	var path = '';
	var yseg = 0;
	var xseg = 60;

	var dx = (x1 > x2) ? (x1-x2) : (x2-x1);
	var dy = (y1 > y2) ? (y1-y2) : (y2-y1);

	xPoints[xPoints.length] = x1;	yPoints[yPoints.length] = y1;
	xPoints[xPoints.length] = x1-50; yPoints[yPoints.length] = y1;
	xPoints[xPoints.length] = x1-50; yPoints[yPoints.length] = y2-yseg;
	xPoints[xPoints.length] = x2;	yPoints[yPoints.length] = y2-yseg;
	xPoints[xPoints.length] = x2;	yPoints[yPoints.length] = y2;

	if (x2 <= x1) {
		// draw line in other direction
		xPoints.reverse();
		yPoints.reverse();
	}

	path = 'M' + xPoints[0] + ' ' + yPoints[0] + ' L ';

	for (var pt = 1; pt < xPoints.length; pt++) {
		path += xPoints[pt] + ' ' + yPoints[pt] + ' ';
	}

	return path;
}


// return a path string that best goes from p1 to p2;
// p1 (x1,y1) is assumed to be an output, p2 an input
function GetPolyPath(x1,y1,x2,y2)
{
	var xPoints = new Array();
	var yPoints = new Array();

	var path = '';
	var yseg = 16; // length of minimum segment from connector
	var xseg = 60;

	var dx = (x1 > x2) ? (x1-x2) : (x2-x1);
	var dy = (y1 > y2) ? (y1-y2) : (y2-y1);

	if (y1 < y2) {
		// output above input
		if ((dx < xseg) && (dy < yseg)) {
			yseg = yseg * (dx / xseg);
		}

		xPoints[xPoints.length] = x1;	yPoints[yPoints.length] = y1;
		xPoints[xPoints.length] = x1;	yPoints[yPoints.length] = y1+yseg;
		xPoints[xPoints.length] = x2;	yPoints[yPoints.length] = y2-yseg;
		xPoints[xPoints.length] = x2;	yPoints[yPoints.length] = y2;
	}
	else {
		if (dx < xseg) {
			yseg = yseg * (dx / xseg);
		}

		// input above output
		if (dx < xseg && dy > 50) {
			// special case if line is almost vertical
			// this useful for "goto" lines

			xPoints[xPoints.length] = x1;		yPoints[yPoints.length] = y1;
			xPoints[xPoints.length] = x1;		yPoints[yPoints.length] = y1+yseg+25;
			xPoints[xPoints.length] = x1 - 150;	yPoints[yPoints.length] = y1+yseg+25;
			xPoints[xPoints.length] = x1 - 150;	yPoints[yPoints.length] = y2-yseg-25;
			xPoints[xPoints.length] = x2;		yPoints[yPoints.length] = y2-yseg-25;
			xPoints[xPoints.length] = x2;		yPoints[yPoints.length] = y2;
		}
		else if (x1 < x2) {
			if (dx < xseg*3) {
				xseg = dx / 3;
			}

			xPoints[xPoints.length] = x1;		yPoints[yPoints.length] = y1;
			xPoints[xPoints.length] = x1;		yPoints[yPoints.length] = y1+yseg;
			xPoints[xPoints.length] = x1+xseg;	yPoints[yPoints.length] = y1+yseg;
			xPoints[xPoints.length] = x2-xseg;	yPoints[yPoints.length] = y2-yseg;
			xPoints[xPoints.length] = x2;		yPoints[yPoints.length] = y2-yseg;
			xPoints[xPoints.length] = x2;		yPoints[yPoints.length] = y2;

		}
		else {
			if (dx < xseg*3) {
				xseg = dx / 3;
			}

			xPoints[xPoints.length] = x1;		yPoints[yPoints.length] = y1;
			xPoints[xPoints.length] = x1;		yPoints[yPoints.length] = y1+yseg;
			xPoints[xPoints.length] = x1-xseg;	yPoints[yPoints.length] = y1+yseg;
			xPoints[xPoints.length] = x2+xseg;	yPoints[yPoints.length] = y2-yseg;
			xPoints[xPoints.length] = x2;		yPoints[yPoints.length] = y2-yseg;
			xPoints[xPoints.length] = x2;		yPoints[yPoints.length] = y2;
		}
	}

	if (x2 <= x1) {
		// draw line in other direction
		xPoints.reverse();
		yPoints.reverse();
	}

	path = 'M' + xPoints[0] + ' ' + yPoints[0] + ' L ';

	for (var pt = 1; pt < xPoints.length; pt++) {
		path += xPoints[pt] + ' ' + yPoints[pt] + ' ';
	}

	return path;
}

// remove SVG elements for this connector
function BPLConnector_remove()
{
	// remove connectors from shapes
	var n;

	// add to undo list
	// JMD267
	undo_AddAction(('goto' == this.ConnectType) ? "disconnectGoto" : "disconnect",this,this.fromShape,this.toShape);
	setModified(true);

	// output
	// find connector
	if ('goto' == this.ConnectType) {
		if (this.fromShape.gotoConnection == this) {
			this.fromShape.gotoConnection = null;
		}
	}
	else {
		for (n = 0; n < this.fromShape.outputList.length; n++) {
			if (this.fromShape.outputList[n] == this) {
				break;
			}
		}

		// slide rest of items over...
		for (; n < (this.fromShape.outputList.length - 1); n++) {
			this.fromShape.outputList[n] = this.fromShape.outputList[n + 1];
		}

		// shorten the list
		if (this.fromShape.outputList.length > 0) {
			this.fromShape.outputList.length--;
		}
	}

	// input
	// find connector
	for (n = 0; n < this.toShape.inputList.length; n++) {
		if (this.toShape.inputList[n] == this) {
			break;
		}
	}

	// slide rest of items over...
	for (; n < (this.toShape.inputList.length - 1); n++) {
		this.toShape.inputList[n] = this.toShape.inputList[n + 1];
	}

	// shorten the list
	if (this.toShape.inputList.length > 0) {
		this.toShape.inputList.length--;
	}

	// turn off handles
	handle = document.getElementById("shape_output_" + this.fromShape.index);
	if (handle) {
		handle.setAttribute("class","OutputHandleOff");
	}
	handle = document.getElementById("shape_input_" + this.toShape.index);
	if (handle) {
		handle.setAttribute("class","InputHandleOff");
	}

	// update style of prev connected shapes
	// to revalidate them
	this.toShape.updateStyle();
	this.fromShape.updateStyle();

	// remove svg elements
	var canvas = document.getElementById("canvas");
	canvas.removeChild(this.SVGline);

	var id = "connector_" + this.fromShape.index + "-" + this.toShape.index + "_text";
	var text = document.getElementById(id);
	if (text) {
		canvas.removeChild(text);
	}
}

// move the start point of this connector
function BPLConnector_updateStart()
{
	var from = this.fromShape;
	var to = this.toShape;
	this.SVGline.setAttribute("d", this.getPath());
}

function BPLConnector_updateEnd()
{
	this.SVGline.setAttribute("d", this.getPath());
}

// update style of this connector based on current diagram state
function BPLConnector_updateStyle()
{
	var el = this.SVGline;
	var text = this.SVGtext;

	if (isSelected(this)) {
		// we're selected
		if (this.Disabled) {
			el.setAttribute("class","BPLConnectorSelectedDisabled");
		}
		else {
			el.setAttribute("class","BPLConnectorSelected");
		}
		if (text) {
			text.setAttribute("class","ConnectorTextSelected");
		}
	}
	else {
		if (this.Disabled) {
			el.setAttribute("class","BPLConnectorDisabled");
		}
		if (this.ConnectType == 'goto') {
			el.setAttribute("class","BPLConnectorGoto");
		}
		else {
			el.setAttribute("class","BPLConnector");
		}
		if (text) {
			text.setAttribute("class","ConnectorText");
		}
	}
}

// set the given property to value
function BPLConnector_setProperty(prop,value)
{
	var old = null;

	switch (prop) {
	case "Branch":
	case "Name":
		old = this.Name;
		this.Name = value;

		// update svg
		var id = "connector_" + this.fromShape.index + "-" + this.toShape.index + "_text";
		var text = document.getElementById(id);

		if (!text && '' != this.Name) {
			var canvas = document.getElementById("canvas");
			var tid = "connector_" + this.fromShape.index + "-" + this.toShape.index;
			text = createConnectorText(tid,this.Name)
			canvas.appendChild(text);
			this.SVGtext = text;
		}
		if (text) {
			var tp = text.getChildNodes().item(0);
			tp.getChildNodes().item(0).setNodeValue(this.Name);
		}

		// validate our input
		if (prop == "Branch" && this.fromShape) {
			this.fromShape.updateStyle();
		}
		break;

	case "Condition":
		old = this.Condition;
		this.Condition = value;

		// validate our input
		if (this.fromShape) {
			this.fromShape.updateStyle();
		}

		break;

	case "Disabled":
		value = (value==0) ? false : true;

		old = this.Disabled;
		this.Disabled = value;
		this.updateStyle();
		break;

	default:
		break;
	}

	if (old) {
		undo_AddAction("set",this,prop,old);
	}

	setModified(true);
}

// Get the current state of this connector (For inspector)
function BPLConnector_getInfo()
{
	var state = '';
	state += 'ConnectorType'+insDelim2+'STRING' + insDelim2 + this.Type + insDelim1;

	switch (this.ConnectType) {
	case 'case':
		var lang = theDiagram.Language == '' ? 'objectscript' : theDiagram.Language;
		// xlate for Studio
		lang = (lang == 'objectscript') ? 'cache' : lang;
		state += 'Name'+insDelim2+'STRING' + insDelim2+ this.Name + insDelim1;
		state += 'Condition'+insDelim2+'EXPRESSION_' + lang + insDelim2 + this.Condition + insDelim1;
		break;
	case 'branch':
		state += 'Branch'+insDelim2+'ENUM^true^false' + insDelim2+ this.Name + insDelim1;
		break;
	case 'thread':
		state += 'Name'+insDelim2+'STRING' + insDelim2+ this.Name + insDelim1;
		state += 'Disabled'+insDelim2+'BOOLEAN' + insDelim2+ (this.Disabled ? 1 : 0) + insDelim1;
		break;
	default:
		break;
	}

	return state;
}


// ---------------------------------------------------------------------------
// RubberBand functions
// the rubber band provides feedback while connecting shapes

function startRubberBand(x, y, start)
{
	if (currRubberBand) {
		// delete the rubber band (this could happen due to bogus SVG events)
		var canvas = document.getElementById("canvas");
		canvas.removeChild(currRubberBand);
		currRubberBand = null;
	}

	// remember start of line
	rubberX = x;
	rubberY = y;
	rubberStart = start;

	var element = document.createElementNS(SVGNS,"path");
	element.setAttribute("class", "RubberBand");
	element.setAttribute("d", GetPolyPath(x,y,x,y));

	var canvas = document.getElementById("canvas");
	canvas.appendChild(element);

	currRubberBand = element;
}

function moveRubberBand(x, y)
{
	if (currRubberBand) {
		if (rubberStart == "output" || rubberStart == "goto") {
			currRubberBand.setAttribute("d", GetPolyPath(rubberX,rubberY,x,y));
		}
		else {
			// draw line the other way
			currRubberBand.setAttribute("d", GetPolyPath(x,y,rubberX,rubberY));
		}
	}
}

// end the connection rubber band;
// if start and end are defined, connect them, else cancel
function endRubberBand()
{
	if (currRubberBand) {
		// delete the rubber band
		var canvas = document.getElementById("canvas");
		canvas.removeChild(currRubberBand);
		currRubberBand = null;
		var old = null;
		var oldTarget = currTarget;
		var updateBB = true;

		// see if we need to connect
		if (rubberStart == "output") {
			old = outShape;
			if (outShape && currTarget) {
				outShape.addOutput(currTarget,"");
				canvas_playSound('connect');
			}
			if (autoArrange) {
				canvas_arrangeShapes();
				updateBB = false;
			}
		}
		else if (rubberStart == "goto") {
			old = outShape;
			if (outShape && currTarget) {
				// add goto connector
				outShape.addOutput(currTarget,"true","goto");
				canvas_playSound('connect');
			}
			// goto does not trigger arrange...
		}
		else {
			old = inShape;
			if (inShape && currTarget) {
				currTarget.addOutput(inShape,"");
				canvas_playSound('connect');
			}
			if (autoArrange) {
				canvas_arrangeShapes();
				updateBB = false;
			}
		}
		if (updateBB) {
			updateBoundingBoxes();
		}

		// reset
		inShape = null;
		outShape = null;
		currTarget = null;

		if (old) {
			old.updateStyle();
		}
		if (oldTarget) {
			oldTarget.updateStyle();
		}
	}
}

// ---------------------------------------------------------------------------
// operation

function setOperation(op)
{
	currOperation = op;
}


// ---------------------------------------------------------------------------
// event handlers

function BPLShapeMouseDown(evt)
{
	logEvent(evt,"BPLShapeMouseDown");

	var el = evt.target;
	evt.stopPropagation();
	if (currOperation) {
		// prohibit context menu during operations
		evt.preventDefault();
	}

	var shape = el.parentNode.BPLShape;

	hideToolTip();

	// select this shape
	if (evt.button == 0 || selectedItems.length == 0) {
		// select on primary button unless nothing selected
		selectItem(shape, evt.ctrlKey);
	}

	if (readOnlyFlag) {
		// no movement for read only mode
		setOperation("select");
		return;
	}

	if (evt.button != 0) {
		// only start move for primary mouse button
		updateCreateLocation(evt);
		return;
	}

	// start move operation for selected shapes
	moveShape = shape;
	setOperation("move");

	// add to undo buffer, update style
	undo_AddAction("blockStart",null,null,null);

	for (var i = 0; i < selectedItems.length; i++) {
		selectedItems[i].updateStyle();
		if (selectedItems[i].moveTo) {
			// only undo items that support moveTo
			undo_AddAction("move",selectedItems[i],selectedItems[i].xPos,selectedItems[i].yPos);
		}
	}

	undo_AddAction("blockEnd",null,null,null);

	// figure out offset of mouse from shape...
	deltaX = moveShape.xPos - (evt.clientX * (mouseScale/currZoom));
	deltaY = moveShape.yPos - (evt.clientY * (mouseScale/currZoom));

	// remember start of move
	startX = moveShape.xPos;
	startY = moveShape.yPos;

	return;
}

function BPLShapeMouseOver(evt)
{
	logEvent(evt,"BPLShapeMouseOver");
	var el = evt.target;
	evt.stopPropagation();
	var shape = el.parentNode.BPLShape;

	switch (currOperation) {
	case "move":
		break;

	case "connect":
		// set the other end of this connection!
		shape.testConnection();
		break;

	case null:
		showToolTip(shape);
		break;
	}
}

function BPLShapeMouseOut(evt)
{
	logEvent(evt,"BPLShapeMouseOut");
	var el = evt.target;
	evt.stopPropagation();

	// remember position of this event
	lastShapeOutX = evt.clientX;
	lastShapeOutY = evt.clientY;

	if (!currOperation) {
		hideToolTip();
	}
}

// tooltip functions
var tooltipTimerID = null;

// set up the tool tip for display
function showToolTip(shape)
{
	if (!shape) return;

	var text = shape.getToolTip();
	if (!text) return;

	// update tooltip text & position
	setTextNode('tooltipText',text,true);

	var tip = document.getElementById('tooltip');
	if (tip) {
		var x = shape.xPos - 380;

		if (shape.constructor != BPLActivity) {
			x += 50;
		}
		var y = shape.yPos - 50;

		x = (x < 0) ? 0 : x;
		y = (y < 0) ? 0 : y;

		tip.setAttribute("transform","translate(" + x + "," + y + ")");
	}

	// clear timer, just in case
	if (tooltipTimerID) {
		window.clearTimeout(tooltipTimerID);
		tooltipTimerID = null;
	}

	// set up a timer to display the tool tip
	tooltipTimerID  = window.setTimeout("displayToolTip()",500);
}

// this actually displays the tooltip (after the timer fires)
function displayToolTip()
{
	// turn off timer
	window.clearTimeout(tooltipTimerID);
	tooltipTimerID = null;

	// show the tooltip
	var tip = document.getElementById('tooltip');
	if (tip) {
		tip.setAttribute("visibility","");
	}
}

function hideToolTip()
{
	if (tooltipTimerID) {
		// clear the timer
		window.clearTimeout(tooltipTimerID);
		tooltipTimerID = null;
		return;
	}

	var tip = document.getElementById('tooltip');
	if (tip) {
		tip.setAttribute("visibility","hidden");
	}
}

// click on expandor box within a group
function BPLGroupMouseClick(evt)
{
	logEvent(evt,"BPLGroupMouseClick");

	var el = evt.target;
	evt.stopPropagation();

	// pull out shape # from id

	var s = el.id.split("_");
	var index = s[1] * 1;

	theDiagram.setCurrParent(index);
	canvas_playSound('drill');
}

// click on the label box for the diagram
function LabelMouseClick(evt)
{
	logEvent(evt,"LabelMouseClick");

	var el = evt.target;
	evt.stopPropagation();

	canvas_drillUp();
}

// click on the level box for the diagram
function LevelMouseClick(evt)
{
	logEvent(evt,"LevelMouseClick");

	var el = evt.target;
	evt.stopPropagation();

	// find level #
	var s = el.id.split('_');
	var lvl = s[1];

	theDiagram.setCurrParent(theDiagram.levels[lvl-1]);
}

// connection handle events
function inputHandleMouseOver(evt)
{
	logEvent(evt,"inputHandleMouseOver");

	var el = evt.target;
	evt.stopPropagation();

	var shape = el.parentNode.BPLShape;

	if (currOperation == "connect") {
		shape.testConnection();
	}
}

function inputHandleMouseOut(evt)
{
	logEvent(evt,"inputHandleMouseOut");

	var el = evt.target;
	evt.stopPropagation();

	var shape = el.parentNode.BPLShape;

	// remember position of this event
	lastShapeOutX = evt.clientX;
	lastShapeOutY = evt.clientY;
}

function inputHandleMouseDown(evt)
{
	logEvent(evt,"inputHandleMouseDown");

	var el = evt.target;
	evt.stopPropagation();

	updateCreateLocation(evt);
	if (evt.button != 0) {
		return;
	}

	if (readOnlyFlag) {
		// no connections for read only mode
		return;
	}

	var shape = el.parentNode.BPLShape;

	// test if we can accept another input
	if (!shape.canAcceptInput(null)) {
		alert(getLocalText('EDNoMoreIn'));
		setOperation(null);
		return;
	}

	// start a RubberBand in this shape in order to connect

	// start connect operation
	setOperation("connect");

	// set the start/end shape for the connection
	inShape = shape;
	outShape = null;

	shape.updateStyle();

	// make a RubberBand
	var coord = document.getElementById("canvasSVG");
	var xoff = coord.getAttribute("x") * 1;
	var yoff = coord.getAttribute("y") * 1;
	startRubberBand((evt.clientX * (mouseScale/currZoom)) - xoff, (evt.clientY * (mouseScale/currZoom)) - yoff, "input");
}

function outputHandleMouseOver(evt)
{
	logEvent(evt,"outputHandleMouseOver");

	var el = evt.target;
	evt.stopPropagation();

	var shape = el.parentNode.BPLShape;

	if (currOperation == "connect") {
		shape.testConnection();
	}
}

function outputHandleMouseOut(evt)
{
	logEvent(evt,"outputHandleMouseOut");

	var el = evt.target;
	evt.stopPropagation();

	var shape = el.parentNode.BPLShape;

	// remember position of this event
	lastShapeOutX = evt.clientX;
	lastShapeOutY = evt.clientY;
}

function outputHandleMouseDown(evt,handleType)
{
	logEvent(evt,"outputHandleMouseDown");

	var el = evt.target;
	evt.stopPropagation();

	updateCreateLocation(evt);
	if (evt.button != 0) {
		return;
	}

	if (readOnlyFlag) {
		// no connections for read only mode
		return;
	}

	var shape = el.parentNode.BPLShape;

	// test if we can accept another output
	if ('goto' == handleType) {
		if (shape.gotoConnection) {
			alert(getLocalText('EDNoMoreOut'));
			setOperation(null);
			return;
		}
	}
	else {
		if (!shape.canAcceptOutput(null)) {
			alert(getLocalText('EDNoMoreOut'));
			setOperation(null);
			return;
		}
	}

	// start a RubberBand in this shape in order to connect
	// start connect operation
	setOperation("connect");

	// set the start/end shape for the connection
	inShape = null;
	outShape = shape;

	shape.updateStyle();

	// make a RubberBand
	var coord = document.getElementById("canvasSVG");
	var xoff = coord.getAttribute("x") * 1;
	var yoff = coord.getAttribute("y") * 1;

	startRubberBand((evt.clientX * (mouseScale/currZoom)) - xoff, (evt.clientY * (mouseScale/currZoom)) - yoff, handleType);
}

// canvas events

var createX = 100;
var createY = 100;

/// update create location
function updateCreateLocation(evt)
{
	var coord = document.getElementById("canvasSVG");
	var xoff = parseInt(coord.getAttribute("x"));
	var yoff = parseInt(coord.getAttribute("y"));
	createX = (evt.clientX * (mouseScale/currZoom)) - xoff;
	createY = (evt.clientY * (mouseScale/currZoom)) - yoff;
}

function canvasMouseDown(evt)
{
	logEvent(evt,"canvasMouseDown");
	if (currOperation == null) {
		updateCreateLocation(evt);
	}
	/* disable canvas drag
	if (evt.button == 0) {
		currOperation = 'dragCanvas';
		startX = ((evt.clientX-self.document.body.scrollLeft) * (mouseScale/currZoom));
		startY = ((evt.clientY-self.document.body.scrollTop) * (mouseScale/currZoom));
	}
	*/
}

function canvasMouseMove(evt)
{
	switch (currOperation) {
	case "dragCanvas":
		var dx = ((evt.clientX-self.document.body.scrollLeft) * (mouseScale/currZoom)) - startX;
		var dy = ((evt.clientY-self.document.body.scrollTop) * (mouseScale/currZoom)) - startY;
		dx = Math.floor(dx/1.5);
		dy = Math.floor(dy/1.5);
		if ((dx > 3 || dx < -3)||(dy > 3 || dy < -3)) {
			self.document.body.scrollTop = self.document.body.scrollTop - dy;
			self.document.body.scrollLeft = self.document.body.scrollLeft - dx;
			startX = ((evt.clientX-self.document.body.scrollLeft) * (mouseScale/currZoom));
			startY = ((evt.clientY-self.document.body.scrollTop) * (mouseScale/currZoom));
		}
		break;
	case "move":
		if (moveShape) {
			// update position of selected shapes
			var dx = ((evt.clientX * (mouseScale/currZoom)) + deltaX) - moveShape.xPos;
			var dy = ((evt.clientY * (mouseScale/currZoom)) + deltaY) - moveShape.yPos;

			for (var i = 0; i < selectedItems.length; i++) {
				var item = selectedItems[i];
				if (item.moveTo) {
					logEvent(evt,"canvasMouseMove " + + i + item.Name);

					item.moveTo(item.xPos + dx, item.yPos + dy);
				}
			}
		}
		break;
	case "connect":
		if (currRubberBand) {
			// move edge of RubberBand
			var coord = document.getElementById("canvasSVG");
			var xoff = coord.getAttribute("x") * 1;
			var yoff = coord.getAttribute("y") * 1;

			moveRubberBand((evt.clientX * (mouseScale/currZoom)) - xoff, (evt.clientY * (mouseScale/currZoom)) - yoff);
		}
		break;
	}
}

function canvasMouseUp(evt)
{
	logEvent(evt,"canvasMouseUp");
	if (evt.button != 0) {
		// we only care about primary button
		return;
	}

	switch (currOperation) {
	case "dragCanvas":
		setOperation(null);
		selectItem(null, evt.ctrlKey);
		break;

	case "move":
		if (moveShape) {
			// if move is below the threshold, cancel it
			var dist2 = ((moveShape.xPos - startX) * (moveShape.xPos - startX)) +
				((moveShape.yPos - startY) * (moveShape.yPos - startY));

			if (dist2 < moveThreshold) {
				// cancel move of selected shapes
				undo_UndoAction();
			}
			else {
				// notify external system
				if (selectedItems.length == 1) {
					canvas_setResultsDiv("INFO",selectedItems[0].getInfo());
					canvas_raiseEvent("SELECT");
				}

				setModified(true);
			}

			// done moving
			moveShape = null;

			// restore styles of moved shapes
			for (var i = 0; i < selectedItems.length; i++) {
				selectedItems[i].updateStyle();
			}
			updateBoundingBoxes();
		}
		setOperation(null);
		break;

	case "connect":
		// end the connect operation
		endRubberBand();
		setOperation(null);
		break;

	case "select":
		setOperation(null);
		break;

	default:
		// unselect everything
		selectItem(null, evt.ctrlKey);

		break;
	}
}

function canvasMouseOver(evt)
{
	logEvent(evt,"canvasMouseOver");

	switch (currOperation) {
	case "move":
		break;

	case "connect":
		// test if we *really* left a shape or if this is a fake event
		if ((evt.clientX != lastShapeOutX) || (evt.clientY != lastShapeOutY)) {
			// real event: reset target shape...
			var old = currTarget;
			currTarget = null;
			if (old) {
				old.updateStyle();
			}
		}
		break;
	}

}

function canvasMouseOut(evt)
{
	logEvent(evt,"canvasMouseOut");
}

function canvasKeyPress(evt)
{
	logEvent(evt,"canvasMousePress");
}

// -------------------------------------------------------------------
//  functions for loading documents

// generic shape factory
// if autoShape, create any additional implied shapes
// if isCopy, then is a "copy" (used for the clipboard)
// and it has no SVG rendering
// special: if a connector is selected,
// then insert the new shape in its place and connect it

// keep track of start/end for makeGroup
var groupStart = null;
var groupEnd = null;

function createShape(diag, parent, type, name, x, y, autoShape, isCopy)
{
	var shape = null;
	groupStart = null;
	groupEnd = null;

	// test for null values
	name = (name == null) ? '' : name;
	x = (x == null) ? xStart : parseInt(x);
	y = (y == null) ? yStart : parseInt(y);

	switch (type) {
	case "start":
	case "end":
	case "reply":
	case "receive":
	case "label":
	case "alert":
		shape = new BPLEvent(diag, parent, type, name, x, y, isCopy);
		break;
	case "assign":
	case "break":
	case "call":
	case "code":
	case "continue":
	case "delay":
	case "empty":
	case "foreach":
	case "milestone":
	case "rule":
	case "sequence":
	case "sql":
	case "sync":
	case "trace":
	case "transform":
	case "while":
	case "until":
	case "unknown":
	case "throw":
	case "catch":
	case "catchall":
	case "compensate":
	case "compensationhandler":
	case "xslt":
	case "xpath":
		shape = new BPLActivity(diag, parent, type, name, x, y, isCopy);
		break;
	case "if":
	case "switch":
	case "branch":
		shape = new BPLDecision(diag, parent, type, name, x, y, isCopy);
		break;
	case "flow":
		shape = new BPLFlow(diag, parent, type, name, x, y, isCopy);
		break;
	case "scope":
		shape = new BPLScope(diag, parent, type, name, x, y, isCopy);
		break;
	case "join":
		shape = new BPLJoin(diag, parent, type, name, x, y, isCopy);
		break;
	default:
		shape = null;
		break;
	}

	// skip the rest for copies
	if (isCopy) {
		return shape;
	}

	if (isLoading) {
		return shape;
	}

	if (shape) {
		// one undo for creation
		undo_AddAction("blockStart",null,null,null);

		undo_AddAction("create",shape,null,null);
		setModified(true);
	}

	// some shapes automatically create other shapes...
	var join = shape;
	var noAuto = false;

	if (autoShape) {
		switch (type) {
		case "foreach":
		case "sequence":
		case "while":
		case "until":
		case "catch":
		case "catchall":
		case "compensationhandler":
			groupStart = new BPLEvent(diag, shape.index, "start","",xStart,yStart, false);
			undo_AddAction("create",groupStart,null,null);
			groupEnd = new BPLEvent(diag, shape.index, "end","",xStart,yStart+(ySpace*4), false);
			undo_AddAction("create",groupEnd,null,null);
			if ('catch' == type || 'catchall' == type || 'compensationhandler' == type) {
				// initial short-circuit connection
				groupStart.addOutput(groupEnd,"");
			}
			break;
		case "if":
		case "switch":
		case "flow":
			noAuto = true;
			join = new BPLJoin(diag, parent, "join","",x,y+ySpace, false);
			undo_AddAction("create",join,null,null);
			groupEnd = join;
			break;
		case "scope":
			noAuto = true;
			var catchall = new BPLActivity(diag, parent, "catchall","",x,y+ySpace, false);
			undo_AddAction("create",catchall,null,null);
			join = new BPLJoin(diag, parent, "join","",x,y+ySpace*2, false);
			undo_AddAction("create",join,null,null);
			catchall.addOutput(join,"");
			shape.addOutput(catchall,"");
			groupEnd = join;
			groupStart = shape;

			// default contents of catchall
			var caStart = new BPLEvent(diag, catchall.index, "start","",xStart,yStart, false);
			undo_AddAction("create",caStart,null,null);
			var caEnd = new BPLEvent(diag, catchall.index, "end","",xStart,yStart+(ySpace*4), false);
			undo_AddAction("create",caEnd,null,null);
			caStart.addOutput(caEnd,"");
			break;
		default:
			break;
		}
	}

	// if a connection is selected, replace it
	if (selectedItems && (selectedItems.length == 1)) {
		var item = selectedItems[0];
		if (item.Type == "connector") {
			var before = item.fromShape;
			var after = item.toShape;
			var nm = item.Name;
			var cond = item.Condition;

			item.remove();

			item = before.addOutput(shape,nm);
			item.Condition = cond;
			join.addOutput(after,"");
		}
	}

	if (smartConnect) {
		// smart-connect (tm)
		// if 2 shapes are selected with no connections...
		if (selectedItems && (selectedItems.length == 2)) {
			var item0 = selectedItems[0];
			var item1 = selectedItems[1];

			if ((item0.Type != "connector") && (item1.Type != "connector")) {
				if ((item0.yPos < item1.yPos) &&
						item0.canAcceptOutput(shape) &&
						shape.canAcceptInput(item0) &&
						join.canAcceptOutput(item1)	&&
						item1.canAcceptInput(join)) {
					// insert between item0 and item1
					item0.addOutput(shape,"");
					join.addOutput(item1,"");
				}
				else if ((item1.yPos < item0.yPos) &&
						item1.canAcceptOutput(shape) &&
						shape.canAcceptInput(item1) &&
						join.canAcceptOutput(item0) &&
						item0.canAcceptInput(join)) {
					// insert between item1 and item0
					item1.addOutput(shape,"");
					join.addOutput(item0,"");
				}
			}
		}
		// if 1 shape is selected with no connections...
		else if (selectedItems && (selectedItems.length == 1)) {
			var item = selectedItems[0];
			if (item.Type != "connector") {
				if ((item.yPos > shape.yPos) &&
						item.canAcceptOutput(shape) &&
						shape.canAcceptInput(item) &&
						join.canAcceptOutput(item) &&
						item.canAcceptInput(join)) {
					// selected item is unconnected and below new item
					// insert before item
					join.addOutput(item,"");
				}
				else if (item.canAcceptOutput(shape) &&
							shape.canAcceptInput(item)) {
					// insert after item
					item.addOutput(shape,"");
				}
				else if (join.canAcceptOutput(item) &&
							item.canAcceptInput(join)) {
					// insert before item
					join.addOutput(item,"");
				}
			}
		}
	}

	// select the new shape(s)
	selectItem(shape,false);
	if (join && (shape != join)) {
		selectItem(join,true);
	}
	if (catchall && (shape != catchall)) {
		selectItem(catchall,true);
	}

	// initial validation
	// shape.updateStyle();

	// auto-arrange?
	if (autoArrange && !noAuto) {
		canvas_arrangeShapes();
	}

	if (shape) {
		// one undo for creation
		undo_AddAction("blockEnd",null,null,null);
	}

	updateBoundingBoxes();

	return shape;
}

/// Update a bounding box for this shape (create it if necessary)
function BPLShape_updateBoundingBox()
{
	var rect = this.boundingBox;
	var line = this.boundingBoxLine;

	if (null == rect) {
		rect = document.createElementNS(SVGNS,"rect");
		rect.setAttribute("class","boundingBox");

		// add box to DOM (in bounding box group)
		var bbGroup = document.getElementById("bbGroup");
		bbGroup.appendChild(rect);
		this.boundingBox = rect;

		line = document.createElementNS(SVGNS,"line");
		line.setAttribute("class","boundingBoxLine");

		bbGroup.appendChild(line);
		this.boundingBoxLine = line;
	}

	// find bounds of box
	findMatchingShapes(this);

	// update attributes
	rect.setAttribute("x", this.bbLeft);
	rect.setAttribute("y", this.bbTop);
	rect.setAttribute("width", this.bbRight - this.bbLeft);
	rect.setAttribute("height", this.bbBottom - this.bbTop);

	if (null == this.bbMid) {
		line.setAttribute("visibility","hidden");
	}
	else {
		line.setAttribute("visibility","");
		line.setAttribute("x1",this.bbLeft);
		line.setAttribute("y1",this.bbMid);
		line.setAttribute("x2",this.bbRight);
		line.setAttribute("y2",this.bbMid);
	}
}

function parseSerialState(diag, data)
{
	// turn off smartConnect during document load
	var sc = smartConnect;
	smartConnect = false;

	// create an xml parser object and parse data
	handler = new xmlHandler(diag);
	parser = new XMLParser(handler);

	// parse
	parser.parse(data);

	smartConnect = sc;
}

// XML handler object
function xmlHandler(diag)
{
	this.diagram = diag;

	this.currShape = null;

	this.currProperty = null;
	this.parms = '';

	// holder for code blocks
	this.inCode = false;
	this.code = '';

	this.inAnnotation = false;
	this.annotation = '';

	// holder for messages (Response/Requests for call)
	this.currMsgType = null;
	this.currMsgAssigns = null;

	this.startElement = xmlHandler_startElement;
	this.endElement = xmlHandler_endElement;
	this.chars = xmlHandler_chars;
}

function xmlHandler_startElement(el,attrs)
{
	switch (el) {
	case 'diagram':
		// diagram settings
		if (attrs['Width'] != null) {
			this.diagram.setProperty("Width",get(attrs['Width'])*1);
		}
		if (attrs['Height'] != null) {
			this.diagram.setProperty("Height",get(attrs['Height'])*1);
		}
		if (attrs['Layout'] != null) {
			this.diagram.setProperty("Layout",get(attrs['Layout']));
		}
		if (attrs['Version'] != null) {
			this.diagram.setProperty("Version",unescapeXML(get(attrs['Version'])));
		}
		if (attrs['Includes'] != null) {
			this.diagram.setProperty("Includes",get(attrs['Includes']));
		}

		this.diagram.setProperty("Name",get(attrs['Name']));
		this.diagram.setProperty("ShowAnnotation",get(attrs['ShowAnnotation']));
		this.diagram.setProperty("Component",get(attrs['Component']));
		this.diagram.setProperty("Language",get(attrs['Language']));
		this.diagram.setProperty("ContextSuperClass",get(attrs['ContextSuperClass']));
		this.diagram.setProperty("Request",get(attrs['Request']));
		this.diagram.setProperty("Response",get(attrs['Response']));
		this.diagram.setProperty("LastModified",get(attrs['LastModified']));
		break;

	case 'context':
		this.diagram.Context = new Array();
		break;

	case 'property':
		if (this.diagram.Context) {
			var prop = new Object();
			prop.Name = get(attrs['name']);
			prop.Type = get(attrs['type']);
			prop.Collection = get(attrs['collection']);
			prop.InitialExpression = get(attrs['initialexpression']);

			this.currProperty = prop;
			this.parms = '';

			// insert
			this.diagram.Context[this.diagram.Context.length] = prop;
		}
		break;

	case 'parameter':
		if (this.currProperty) {
			// parameter for current property: add to list
			// add to context
			this.parms += ((this.parms=='') ? '' : ',') + get(attrs['name']) + '=' + get(attrs['value']);
		}
		else if (this.currShape && 'xslt' == this.currShape.Type) {
			// xslt parameter
			if (null == this.currShape.Parameters) {
				this.currShape.Parameters = new Array();
			}
			var prop = new Object();
			prop.Name = get(attrs['name']);
			prop.Value = get(attrs['value']);
			this.currShape.Parameters[this.currShape.Parameters.length] = prop;
		}
		break;

	case 'annotation':
		this.inAnnotation = true;
		this.annotation = '';
		break;

	case 'code':
		if (this.currShape) {
			this.inCode = true;
			this.code = '';
		}
		break;

	case 'shape':
		// add a shape
		var shape = createShape(this.diagram, attrs['parentShape'], unescapeXML(attrs['_Type']), unescapeXML(attrs['Name']), unescapeXML(attrs['xPos']), unescapeXML(attrs['yPos']), false, false);

		if (shape) {
			if (shape.Type == 'milestone') {
				newMilestoneCounter++;
			}
			else {
				newItemCounter++;
			}

			var d = get(attrs['Disabled']);
			d = (d=='true') ? 1 : 0;
			shape.setProperty("Disabled",d);

			// properties
			for (var a in attrs) {
				switch (a) {
				case 'Name':
				case 'Disabled':
				case 'parentShape':
				case 'xPos':
				case 'yPos':
				case '_index':
				case '_Type':
					// skip known properties
					break;
				default:
					shape.setProperty(a,unescapeXML(get(attrs[a])));
					break;
				}
			}

			// stack this shape
			this.currShape = shape;
		}
		break;

	case 'connection':
		// new connection
		var to = attrs['to'];
		var from = attrs['from'];
		var name = unescapeXML(get(attrs['Name']));

		if (to != null && from != null) {
			var shape1 = this.diagram.shapeList[from*1];
			var shape2 = this.diagram.shapeList[to*1];

			var connect = null;
			var ctype = get(attrs['ConnectType']);

			if (shape1 && shape2) {
				if ('goto' == ctype) {
					connect = shape1.addOutput(shape2, 'true','goto');
				}
				else {
					connect = shape1.addOutput(shape2, name);
				}
			}

			if (connect &&(get(attrs['Disabled']) == 'true')) {
				connect.setProperty("Disabled",1);
			}

			if (connect) {
				switch(ctype) {
				case 'case':
					connect.ConnectType = 'case';
					connect.Condition = unescapeXML(get(attrs['Condition']));
					break;
				case 'branch':
					connect.ConnectType = 'branch';
					break;
				case 'thread':
					connect.ConnectType = 'thread';
					break;
				case 'goto':
					connect.ConnectType = 'goto';
					break;
				}
			}
		}
		break;

	case 'request':
	case 'response':
		this.currMsgType = get(attrs['type']);
		this.currMsgAssigns = new Array();
		break;

	case 'assign':
		if (this.currMsgAssigns != null) {

			// add this assign to the current msg block
			var assign = new Object();
			assign.property = unescapeXML(get(attrs['property']));
			assign.value = unescapeXML(get(attrs['value']));
			assign.action = unescapeXML(get(attrs['action']));
			assign.key = unescapeXML(get(attrs['key']));

			this.currMsgAssigns[this.currMsgAssigns.length] = assign;
		}
		break;

	}
}

/// helper function: $G for JavaScript
function get(val)
{
	return (val == null) ? '' : val;
}

function xmlHandler_endElement(el)
{
	switch (el) {
	case 'shape':
		// unstack shape
		this.currShape = null;
		break;

	case 'property':
		// see if we have to add any parms to prop type
		if (this.currProperty && (this.parms != '')) {
			this.currProperty.Type += '(' + this.parms + ')';
		}
		this.currProperty = null;
		this.parms = '';
		break;

	case 'request':
		this.currShape.requestType = this.currMsgType;
		this.currShape.requestAssigns = this.currMsgAssigns;
		break;

	case 'response':
		this.currShape.responseType = this.currMsgType;
		this.currShape.responseAssigns = this.currMsgAssigns;
		break;

	case 'code':
		this.inCode = false;
		this.currShape.code = this.code;
		this.code = '';
		break;

	case 'annotation':
		this.inAnnotation = false;
		if (this.currShape) {
			// shape annotation
			this.currShape.setProperty("Annotation",this.annotation);
		}
		else {
			// diagram annotation
			this.diagram.setProperty("Annotation",this.annotation);
		}
		this.annotation = '';
		break;
	}

}

function xmlHandler_chars(chars)
{
	if (this.inCode) {
		// append to code block
		this.code += chars;
	}
	else if (this.inAnnotation) {
		// append to annotation
		this.annotation += unescapeXML(chars);
	}
}


// -------------------------------------------------------------------
// event logging
var eventLog = '';
var eventCounter = 0;

function logEvent(evt, msg)
{
	return;

	if (eventLog == '') {
		eventCounter = 0;
	}

	eventCounter++;

	if (evt) {
		var el = evt.target;
		var id = el.getAttribute("id");

		eventLog = eventCounter + "  " + msg + "[" + id + "] (" + evt.clientX + "," + evt.clientY + ") " + "\n" + eventLog;
	}
	else {
		eventLog = eventCounter + "  " + msg + "\n" + eventLog;
	}
}

// -------------------------------------------------------------------
// Utility method:
// Set the contents of text element id to str
function setTextNode(id,str,wordwrap,size)
{
	var text = document.getElementById(id);
	if (!text) {
		return;
	}

	// JMD266
	if ('string' == typeof str) {
		str = str.replace(/\r*/,'');
	}
	var numrows = 0;
	var textwid = 0;

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

		var textNode;
		textNode = document.createTextNode(txt);
		text.appendChild(textNode);

		if (txt != '') {
			numrows = 1;
			textwid = text.getComputedTextLength();
		}

	}
	else {
		// wrap
		// create a new text node
		var oldtext = text;
		var parent = oldtext.parentNode;
		var x = oldtext.getAttribute("x");
		var cls = oldtext.getAttribute("class");

		text = document.createElementNS(SVGNS,"text");
		text.setAttribute("id",oldtext.getAttribute("id"));
		text.setAttribute("class",oldtext.getAttribute("class"));
		text.setAttribute("x",oldtext.getAttribute("x"));
		text.setAttribute("y",oldtext.getAttribute("y"));

		// remove the old text
		parent.removeChild(oldtext);

		// apply wordwrap to text
		var display = wordwrapText(str,50);

		// create a set of tspans
		var maxrows = 3;
		var lastw = 0;
		var t = display.split('\n');
		for (var i = 0; i < t.length && i <= maxrows; i++) {
			numrows++;
			var span = document.createElementNS(SVGNS,'tspan');
			span.setAttribute("class", cls);
			span.setAttribute("x", x);
			span.setAttribute("dy", i == 0 ? "0" : "1.1em");
			text.appendChild(span);

			textNode = document.createTextNode(i < maxrows ? t[i] : "...");
			span.appendChild(textNode);

			if (t[i] != "") {
				var lw = 0;
				var tw = text.getComputedTextLength();
				var lw = tw - lastw;  // undo accumulation
				lastw = tw;

				textwid = (lw > textwid) ? lw : textwid;
			}
		}

		parent.appendChild(text);
	}

	// fill in size object, if provided
	if (size) {
		size.rows = numrows;
		size.width = textwid;
	}
}

// -------------------------------------------------------------------

// simple wordwrap utility: takes input string and
// returns a wrapped version (with hard \n embedded).
function wordwrapText(input, size)
{
	var output = '';
	var len = 0;

	if (!input || input.length < size) {
		return input;
	}

	var lines = input.split("\n");
	for (var ln = 0; ln < lines.length; ln++) {
		len = 0;
		var words = lines[ln].split(" ");
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

		if (ln < (lines.length - 1)) {
			output += '\n';
		}
	}

	return output;
}

// take a property type and return a list
// of parameters it defines: %String(MAXLEN="10")
// returns a list of parameter objects,
// each with name and value;
// first element in list is type name (with no *value*);
function getPropertyParameters(text)
{
	var list = new Array();

	// place type name as first element in list
	var parm = new Object();
	parm.name = "";
	list[list.length] = parm;

	// parse the incoming text
	var state = 0;
	var token = "";

	for (var n = 0; n < text.length; n++) {
		var ch = text.charAt(n);

		switch(state) {
		case 0:
			if (ch == "(") {
				// start of parm list
				state = 1;
				token = "";
			}
			else {
				list[0].name += ch;
			}
			break;
		case 1:
			// parm name
			if (ch == "=") {
				// end of parm name
				parm = new Object();
				parm.name = token;
				parm.value = "";
				list[list.length] = parm;

				state = 2;
				token = "";
			}
			else if (ch == " ") {
				// end of parm name?
				if (token != "") {
					parm = new Object();
					parm.name = token;
					parm.value = "";
					list[list.length] = parm;

					state = 11;
					token = "";
				}
			}
			else {
				// add to parm name
				token += ch;
			}
			break;

		case 11:
			// space after parm name
			if (ch == "=") {
				state = 2;
			}
			break;

		case 2:
			// parm value
			if (ch == '\"' && token=="") {
				state = 3;
				token = ch;
			}
			else if (ch == ",") {
				parm.value = token;
				state = 1;
				token = "";
			}
			else if (ch == " ") {
				if (token != "") {
					// ignore space before value
					parm.value = token;
					state = 4;
					token = "";
				}
			}
			else if (ch == ")") {
				parm.value = token;
				state = 5;
				token = "";
			}
			else {
				token += ch;
			}
			break;

		case 3:
			// parm value string
			if (ch == '\"') {
				parm.value = token + ch;
				state = 4;
				token = "";
			}
			else {
				token += ch;
			}
			break;

		case 4:
			// after value
			if (ch == ",") {
				state = 1;
				token = "";
			}
			else if (ch == ")") {
				state = 5;
				token = "";
			}
			break;

		case 5:
			// past end
			break;
		}
	}

	return list;
}

// -------------------------------------------------------------------

// undo buffer and functions

var inUndo = false; // flag to prevent nested undos
var undoBuffer = new Array();

// Reset the undo buffer
function undo_ResetBuffer()
{
	inUndo = false;
	undoBuffer.length = 0;

	// update menu
 	setMenuItemOption("enabled","menu_undo", null, false);
}

// test if there is anything to undo
function undo_CanUndo()
{
	return (undoBuffer.length > 0) ? true : false;
}

// add an action to the undoBuffer
// *type* is the action type:
// "move", "set", "connect", "delete", "create", "changeParent"
// "disconnect", "connectGoto","disconnectGoto"
// "blockStart", "blockEnd" (marks a block of related actions)
// item is the affected item
// p1 & p2 & p3 are action parameters (specific to each action)
function undo_AddAction(type, item, p1, p2, p3)
{
	if (inUndo || isLoading) {
		return;
	}

	var action = new Object();
	action.type = type;
	action.item = item;
	action.p1 = p1;
	action.p2 = p2;
	action.p3 = p3;

	undoBuffer[undoBuffer.length] = action;

	// update menu
 	setMenuItemOption("enabled","menu_undo", null, true);
}

function undo_ShowUndoBuffer()
{
	var txt = '';
	for (var i = undoBuffer.length - 1; i >= 0; i--) {
		var action = undoBuffer[i];
		txt += action.type + ':' + (item ? item.Name : 'null') + '\n';
	}

	alert(txt);
}

// undo the last action in the undo buffer
function undo_UndoAction()
{
	if (undoBuffer.length == 0) {
		return;
	}

	inUndo = true;

	var needArrange = false;
	var action = null;
	var done = false;
	var depth = 0;

	while (!done) {
		if (undoBuffer.length == 0) {
			alert("assert failure: unmatched block in undo buffer");
			return;
		}

		// pull off next action
		action = undoBuffer[undoBuffer.length - 1];
		undoBuffer.length--;

		switch (action.type) {
		case "blockStart":
			depth++;
			break;
		case "blockEnd":
			depth--;
			break;
		case "changeParent":
			action.item.parentShape = action.p1;
			action.item.moveTo(action.p2, action.p3);
			theDiagram.setCurrParent(action.item.parentShape);
			needArrange = true;
			break;
		case "move":
			theDiagram.setCurrParent(action.item.parentShape);
			action.item.moveTo(action.p1, action.p2);
			break;
		case "set":
			theDiagram.setCurrParent(action.item.parentShape);
			action.item.setProperty(action.p1, action.p2);
			break;
		case "create":
			theDiagram.setCurrParent(action.item.parentShape);
			theDiagram.deleteShape(action.item,true);
			break;
		case "delete":
			theDiagram.setCurrParent(action.item.parentShape);
			// undelete shape
			action.item.isDeleted = false;
			// show this shape (render if needed)
			if (action.item.parentShape == theDiagram.currParent) {
				if (!action.item.SVGGroup) {
					RenderBPLShape(action.item);
				}

				if (action.item.SVGGroup) {
					action.item.SVGGroup.setAttribute("visibility","");
				}
				if (action.item.boundingBox) {
					action.item.boundingBox.setAttribute("visibility","");
				}
				if (action.item.boundingBoxLine) {
					action.item.boundingBoxLine.setAttribute("visibility","");
				}
			}
			break;
		case "connect":
			// p1 is fromShape, p2 is toShape
			// find the connector between these 2 shapes...
			for (var n = 0; n < action.p1.outputList.length; n++) {
				var c = action.p1.outputList[n];
				if (c.toShape == action.p2) {
					c.remove();
					break;
				}
			}
			break;
		case "disconnect":
			// p1 is fromShape, p2 is toShape
			var c = action.p1.addOutput(action.p2,action.item.Name);
			c.Condition = action.item.Condition;
			break;

		case "connectGoto":
			// p1 is fromShape, p2 is toShape
			// find the connector between these 2 shapes...
			var c = action.p1.gotoConnection;
			if (c.toShape == action.p2) {
				c.remove();
			}
			break;

		case "disconnectGoto":
			// p1 is fromShape, p2 is toShape
			action.p1.addOutput(action.p2,"true","goto");
			break;
		}

		// test for end
		if (depth == 0) {
			done = true;
		}
	}

	inUndo = false;
	updateBoundingBoxes();

	if (needArrange) {
		if (autoArrange || theDiagram.Layout != 'manual') {
			theDiagram.arrangeShapes();
		}
	}

	if (undoBuffer.length == 0) {
		// assume we have undone all changes...
		setModified(false);

		// update menu
	 	setMenuItemOption("enabled","menu_undo", null, false);
	}
}
// -------------------------------------------------------------------
// additional API for dealing with Context, CallRequest and CallResponse

/// Test if BP context contains a given property by name
function context_PropertyExists(name)
{
	for (var n in theDiagram.Context) {
		if (theDiagram.Context[n] && (theDiagram.Context[n].Name == name)) {
			return true;
		}
	}

	return false;
}

/// Add a new property to the context
function context_AddProperty(name,type,collection,expr)
{
	if (context_PropertyExists(name)) {
		// do not add duplicate
		return false;
	}

	var prop = new Object();
	prop.Name = name;
	prop.Type = type ? type : '%String';
	prop.Collection = collection ? collection : '';
	prop.InitialExpression = expr ? expr : '';
	theDiagram.Context[theDiagram.Context.length] = prop;
	return true;
}

/// These objects are used to create a call request or response
/// Create the object, add assignment, then use serialize:
/// shape.setProperty('Request',req.serialize());

function CallResponse(respType)
{
	this.type = 'response';
	this.cls = respType
	this.assigns = new Array();

	// method
	this.addAssign = CallReqResponse_addAssign;
	this.serialize = CallReqResponse_serialize;
}

function CallRequest(reqType)
{
	this.type = 'request';
	this.cls = reqType
	this.assigns = new Array();

	// method
	this.addAssign = CallReqResponse_addAssign;
	this.serialize = CallReqResponse_serialize;
}

// add an assignment to a call request/response
function CallReqResponse_addAssign(property,action,key,value)
{
	var assign = new Object();
	assign.property = property ? property : '';
	assign.action = action ? action : '';
	assign.key = key ? key : '';
	assign.value = value ? value : '';

	this.assigns[this.assigns.length] = assign;
}

function CallReqResponse_serialize()
{
	var msgstate = this.type + insDelim2 + get(this.cls) + insDelim1a;

	if (this.assigns) {
		for (var i = 0; i < this.assigns.length; i++) {
			assign = this.assigns[i];
			msgstate += 'assign' + insDelim2 +
						assign.property + insDelim2 +
						assign.action + insDelim2 +
						assign.key + insDelim2 +
						assign.value + insDelim1a;
		}
	}

	return msgstate;
}

// -------------------------------------------------------------------


