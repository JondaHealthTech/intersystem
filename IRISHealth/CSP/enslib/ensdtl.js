/*
	ensdtl.js

	Copyright (c) 2004-7, InterSystems Corp.
	ALL RIGHTS RESERVED

	Core JS for DTL Editor
*/

// common variables
var canvasName = 'dtl';

var xmlDoc = null;

// position of spine
var spineX = 500;

// scrolling
var targetScrollTop = 0;
var sourceScrollTop = 0;

// count of property boxes
var boxCount = 0;
var maxBoxes = 300;

var maxConnections = 6; // max connections to single box

var readOnlyFlag = false;
var mouseScale = 100;
var api = new Object();

// selected item (object)
var currItem = null;
var currDropTarget = null; // target for drop operation

var currParentAction = null;  // if (true/false),foreach for nesting actions

function initCanvas()
{
	// replace context menu
	var newMenuRoot = parseXML(printNode(document.getElementById('CanvasMenu')), contextMenu);
	contextMenu.replaceChild( newMenuRoot, contextMenu.firstChild );

	// associate API methods with loading <div> in html parent
	api.getDocument = canvas_getDocument;
	api.setDocument = canvas_setDocument;
	api.getProperty = canvas_getProperty;
	api.setProperty = canvas_setProperty;
	api.invokeOperation = canvas_invokeOperation;

	// additional API
	api.setTarget = setTarget;
	api.setSource = setSource;
	api.setTargetSegments = setTargetSegments;
	api.setSourceSegments = setSourceSegments;
	api.insertTargetSegments = insertTargetSegments;
	api.insertSourceSegments = insertSourceSegments;
	api.onInsertComplete = onInsertComplete;
	api.setTransform = setTransform;

	// set up key handlers
	document.documentElement.addEventListener("keydown", canvasKeyDown, false);
	document.documentElement.addEventListener("keyup", canvasKeyUp, false);
}

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

function setTargetScroll(yOffset)
{
	targetScrollTop = parseInt(yOffset);
	var frame = document.getElementById('targetFrame');
	frame.setAttribute('y',-targetScrollTop);

	// fix actions
	if (theTransform) {
		for (var target in theTransform.actionList) {
			theTransform.actionList[target].update();
		}
	}
}

function setSourceScroll(yOffset)
{
	sourceScrollTop = parseInt(yOffset);
	var frame = document.getElementById('sourceFrame');
	frame.setAttribute('y',-sourceScrollTop);

	// fix actions
	if (theTransform) {
		for (var target in theTransform.actionList) {
			theTransform.actionList[target].update();
		}
	}
}

// -------------------------------------------------------------------
// external API

function canvas_invokeOperation(op, value, value2)
{
	switch(op) {
	case "setZoom":
		setZoom(value);
		break;
	case "getZoom":
		canvas_setResultsDiv(currZoom);
		break;

	case "setReadOnly":
		setReadOnly(value);
		break;
	case "copyItem":
		break;
	case "pasteItem":
		break;
	case "cutItem":
		break;
	case "deleteItem":
		if (theTransform && currItem && (currItem.gtype == 'action')) {
			if (self.confirm(getLocalText('RemoveAction'))) {
				removeCurrAction();
			}
		}
		break;

	case "undo":
		break;
	case "canUndo":
		//var x = undo_CanUndo();
		var x = false;
		canvas_setResultsDiv(x ? 1 : 0);
		break;
	case "isModified":
		canvas_setResultsDiv(modifiedFlag ? 1 : 0);
		break;
	default:
		alert("canvas_invokeOperation: unknown operation: " + op);
		break;
	}
}

// get values for transform properties
function canvas_getProperty(prop)
{
	var value = '';

	if (theTransform) {
		switch(prop) {
		case 'language':
		case 'create':
		case 'sourceClass':
		case 'targetClass':
		case 'sourceDocType':
		case 'targetDocType':
			value = theTransform[prop];
			value = (null == value) ? "" : value;
			break;
		}
	}
	canvas_setResultsDiv(value);
}

// set values for properties of selected item
function canvas_setProperty(prop,value)
{
	if (!theTransform) return;

	if (currItem && currItem.gtype == 'property') {
		// property
	}
	else if (currItem && currItem.gtype == 'action') {
		// action
		var action = currItem;
		value = (""==value) ? null : value;
		switch(prop) {
		case 'TargetObj':
			var t = currItem.type;
			selectItem(null);
			if (insDelim2 == ':') {
				value = value.replace(/;/g,':');
			}
			action.setAttr('targetObj',value);
			action.match('target');
			action.unrender();
			action.render();
			selectItem(action);
			transformChanged(); // notify studio
			break;

		case 'Property':
			var t = currItem.type;
			selectItem(null);
			if (insDelim2 == ':') {
				value = value.replace(/;/g,':');
			}
			if (t == 'foreach') {
				action.setAttr('property',value);
				action.match('source');
			}
			else {
				action.setAttr('property',value);
				action.match('target');
			}
			action.unrender();
			action.render();
			selectItem(action);
			transformChanged(); // notify studio
			break;

		case 'Value':
			selectItem(null);
			action.setAttr('value',value);
			action.match('source');
			action.unrender();
			action.render();
			selectItem(action);
			transformChanged(); // notify studio
			break;

		case 'SourceObj':
			selectItem(null);
			action.setAttr('sourceObj',value);
			action.match('source');
			action.unrender();
			action.render();
			selectItem(action);
			transformChanged(); // notify studio
			break;

		case 'Condition':
			selectItem(null);
			action.setAttr('condition',value);
			action.match('source');
			action.unrender();
			action.render();
			selectItem(action);
			transformChanged(); // notify studio
			break;

		case 'Action':
			action.setAttr('action',value);
			transformChanged(); // notify studio
			break;

		case 'Key':
			action.setAttr('key',value);
			transformChanged(); // notify studio
			break;

		case 'Class':
			action.setAttr('class',value);
			transformChanged(); // notify studio
			break;

		default:
			break;
		}
	}
	else {
		// document
		value = (""==value) ? null : value;
		switch(prop) {
		case 'Language':
			theTransform.language = value;
			transformChanged(); // notify studio
			break;

		case 'Create':
			theTransform.create = value;
			transformChanged(); // notify studio
			break;

		case 'SourceClass':
			setSource(value, theTransform.sourceDocType);
			transformChanged(); // notify studio
			break;

		case 'TargetClass':
			setTarget(value, theTransform.targetDocType);
			transformChanged(); // notify studio
			break;

		case 'SourceDocType':
			setSource(theTransform.sourceClass, value);
			transformChanged(); // notify studio
			break;

		case 'TargetDocType':
			setTarget(theTransform.targetClass, value);
			transformChanged(); // notify studio
			break;
		}
	}
}

function canvas_setDocument(state)
{
	// remember old transform so we can detect changes
	var old = theTransform;

	loadTransform(state);

	if (old && theTransform) {
		// look for changes to transform
		var tgt = false;
		var src = false;

		if ((get(old.targetClass) != get(theTransform.targetClass)) ||
			(get(old.targetDocType) != get(theTransform.targetDocType))) {
			tgt = true;

		}

		if ((get(old.sourceClass) != get(theTransform.sourceClass)) ||
			(get(old.sourceDocType) != get(theTransform.sourceDocType))) {
			src = true;
		}

		if (tgt && src) {
			// special case for setting tgt and src at same time
			selectItem(null);

			// set title
			setTextNode("targetName", theTransform.targetClass);
			setTextNode("targetType", theTransform.targetDocType);
			setTextNode("sourceName", theTransform.sourceClass);
			setTextNode("sourceType", theTransform.sourceDocType);

			// goto server for new doc contents
			loadTopSegmentsFromServer('target,source',get(theTransform.targetClass)+','+get(theTransform.sourceClass),get(theTransform.targetDocType)+','+get(theTransform.sourceDocType));
		}
		else if (tgt) {
			setTarget(theTransform.targetClass, theTransform.targetDocType);
		}
		else if (src) {
			setSource(theTransform.sourceClass, theTransform.sourceDocType);
		}
	}

}

function canvas_getDocument()
{
	transformChanged(true); //send document to Studio
}

/// set new target doc info
function setTarget(clsname, doctype)
{
	selectItem(null);
	theTransform.targetClass = clsname;
	theTransform.targetIsVDoc = (null==clsname) ? false : isVDoc(clsname);
	theTransform.targetDocType = doctype;

	// set title
	setTextNode("targetName", clsname);
	setTextNode("targetType", doctype);

	// goto server for new doc contents
	loadTopSegmentsFromServer('target',clsname,doctype);
}

/// set new source doc info
function setSource(clsname, doctype)
{
	selectItem(null);
	theTransform.sourceClass = clsname;
	theTransform.sourceIsVDoc = (null==clsname) ? false : isVDoc(clsname);
	theTransform.sourceDocType = doctype;

	// set title
	setTextNode("sourceName", clsname);
	setTextNode("sourceType", doctype);

	// goto server for new doc contents
	loadTopSegmentsFromServer('source',clsname,doctype);
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
	updateContextMenu();

	// reapply actions
	if (1 == reload) {
		var state = theTransform.save();
		loadTransform(state);
	}
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
	updateContextMenu();

	// reapply actions
	if (1 == reload) {
		var state = theTransform.save();
		loadTransform(state);
	}
}

/// Called from server after loading property boxes
function onInsertComplete(type)
{
	// re-apply all actions
	var state = theTransform.save();
	loadTransform(state);

	transformChanged(true); // notify studio
}

/// called from server to insert new segments
function insertTargetSegments(segment,proplist)
{
	setPropertyBoxes('target', segment, proplist);

	layoutBoxes('target');
	updateContextMenu();

	// re-apply all actions
	var state = theTransform.save();
	loadTransform(state);

	clearStatusBar();
}

/// called from server to insert new segments
function insertSourceSegments(segment,proplist)
{
	setPropertyBoxes('source', segment, proplist);

	layoutBoxes('source');
	updateContextMenu();

	// re-apply all actions
	var state = theTransform.save();
	loadTransform(state);

	clearStatusBar();
}

// DTL Editor should load the given xml transform document
function setTransform(state)
{
	loadTransform(state);
	return;
}

// place current state into results div
function getTransform()
{
	if (theTransform) {
		canvas_setResultsDiv(theTransform.save());
	}
	else {
		canvas_setResultsDiv('');
	}
}

function getZoom()
{
	canvas_setResultsDiv(currZoom);
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

// edit the current selected action
function editCurrAction()
{
	if (theTransform && currItem && (currItem.gtype == 'action')) {
		var value = '';

		parms = new Object();
		switch (currItem.type) {
		case 'assign':
			value = currItem.getAttr('value');
			parms.property = currItem.getAttr('property');
			parms.action = currItem.getAttr('action');
			parms.annotation = currItem.annotation;
			break;
		case 'subtransform':
			value = currItem.getAttr('sourceObj');
			parms.targetObj = currItem.getAttr('targetObj');
			parms.xfclass = currItem.getAttr('class');
			parms.annotation = currItem.annotation;
			break;
		case 'if':
			value = currItem.getAttr('condition');
			parms.annotation = currItem.annotation;
			break;
		case 'foreach':
			value = currItem.getAttr('property');
			parms.key = currItem.getAttr('key');
			parms.annotation = currItem.annotation;
			break;
		}

		context = document_showWizard('edit',theTransform,currItem.type,value,parms);
		value = context.returnValue;

		if (null != value) {
			var action = currItem;
			switch (currItem.type) {
			case 'assign':
				action.setAttr('value',value);
				action.setAttr('property',context.property);
				action.setAttr('action',context.action);
				action.annotation = context.annotation;
				break;
			case 'subtransform':
				action.setAttr('sourceObj',value);
				action.setAttr('targetObj',context.targetObj);
				action.setAttr('class',context.xfclass);
				action.annotation = context.annotation;
				break;
			case 'if':
				action.setAttr('condition',value);
				action.annotation = context.annotation;
				break;
			case 'foreach':
				action.setAttr('property',value);
				action.annotation = context.annotation;
				break;
			}
			action.match('source');
			action.unrender();
			action.render();
			selectItem(action);
			transformChanged();
		}
	}
}

// add a new action for the current target
function addNewAction(type)
{
	if (!theTransform) return;

	var msg = '';
	var context,parms;

	switch(type) {
	case 'assign':
		if (currItem && (currItem.gtype == 'property') && (currItem.type == 'target')) {
			var value = '';
			var prop = '';

			// get target name
			if (theTransform.targetIsVDoc && theTransform.targetDocType) {
				// assume this is a document type message

				// strip off 'target.'
				var oname = currItem.origName.substring(7);
				if ('???' == oname.substring(0,3)) return;

				prop = 'target.{' + fixCollectionSyntax(oname) + '}';
				prop = applyKeyToName(prop,currParentAction);
			}
			else {
				prop = currItem.origName.replace(/\(\)/g,'.()');
				prop = applyKeyToName(prop,currParentAction);
				prop = fixCollectionSyntax(prop,(currParentAction ? currParentAction.getAttr('key') : '1'));
			}

			// prompt user
			parms = new Object();
			parms.property = prop;
			parms.action = 'set';
			context = document_showWizard('new',theTransform,'assign',value,parms);
			value = context.returnValue;

			if (null != value) {
				var newAction = new Action('assign');
				newAction.setAttr('value',value);
				newAction.setAttr('property',context.property);
				newAction.setAttr('action',context.action);
				newAction.annotation = context.annotation;

				theTransform.addAction(newAction, currParentAction);
				newAction.render();
				selectItem(newAction);
				transformChanged(); // notify studio
				self.playSound('connect');
			}
		}
		else {
			alert(getLocalText('NoTarget',type));
		}
		break;
	case 'transform':
		if (currItem && (currItem.gtype == 'property') && (currItem.type == 'target')) {
			var value = '';
			var prop = '';

			// get target name
			if (theTransform.targetIsVDoc && theTransform.targetDocType) {
				// assume this is a document type message

				// strip off 'target.'
				var oname = currItem.origName.substring(7);
				if ('???' == oname.substring(0,3)) return;

				prop = 'target.{' + fixCollectionSyntax(oname) + '}';
				prop = applyKeyToName(prop,currParentAction);
			}
			else {
				prop = currItem.origName.replace(/\(\)/g,'.()');
				prop = applyKeyToName(prop,currParentAction);
				prop = fixCollectionSyntax(prop,(currParentAction ? currParentAction.getAttr('key') : '1'));
			}

			// prompt user
			parms = new Object();
			parms.targetObj = prop;
			context = document_showWizard('new',theTransform,'subtransform',value,parms);
			value = context.returnValue;

			if (null != value) {
				var newAction = new Action('subtransform');
				newAction.setAttr('sourceObj',value);
				newAction.setAttr('targetObj',context.targetObj);
				newAction.setAttr('class',context.xfclass);
				newAction.annotation = context.annotation;

				theTransform.addAction(newAction, currParentAction);
				newAction.render();
				selectItem(newAction);
				transformChanged(); // notify studio
				self.playSound('connect');
			}
		}
		else {
			alert(getLocalText('NoTarget',type));
		}
		break;
	case 'if':
		if (currItem && (currItem.gtype == 'property') && (currItem.type == 'source')) {
			var value = '';

			if (theTransform.sourceIsVDoc && theTransform.sourceDocType) {
				// assume this is a document type message

				// strip off 'source.'
				var oname = currItem.origName.substring(7);

				value = 'source.{' + fixCollectionSyntax(oname) + '}';
				value = applyKeyToName(value,currParentAction);
			}
			else {
				value = currItem.origName.replace(/\(\)/g,'.()');
				value = applyKeyToName(value,currParentAction);
				value = fixCollectionSyntax(value,(currParentAction ? currParentAction.getAttr('key') : '1'));
			}

			parms = new Object();
			context = document_showWizard('new',theTransform,'if',value,parms);
			value = context.returnValue;
			if (null != value) {
				var ifAction = new Action('if');
				ifAction.setAttr('condition',value);
				ifAction.annotation = context.annotation;
				theTransform.addAction(ifAction, currParentAction);
				ifAction.render();
				selectItem(ifAction);

				// true/false blocks
				var trueAction = new Action('true');
				theTransform.addAction(trueAction,ifAction);

				var falseAction = new Action('false');
				theTransform.addAction(falseAction,ifAction);

				setParentAction(ifAction); // make this the parent action
				transformChanged(); // notify studio
				self.playSound('connect');
			}
		}
		else {
			alert(getLocalText('NoSource',type));
		}
		break;
	case 'foreach':
		if (currItem && (currItem.gtype == 'property')
			&& (currItem.type == 'source')
			&& (currItem.origName.substr(currItem.origName.length-2,2)=='()')) {

			var value = '';
			// use DOM level of current action as key #
			var key = 'k' + (!currParentAction ? 1 : 1 + currParentAction.getLevel());

			if (theTransform.sourceIsVDoc && theTransform.sourceDocType) {
				// assume this is a document type message

				// strip off 'source.'
				var oname = currItem.origName.substring(7);
				value = 'source.{' + fixCollectionSyntax(oname,'') + '}';
				value = applyKeyToName(value,currParentAction);
			}
			else {
				var pcs = currItem.origName.split('()');
				if (pcs.length < 2) {
					value = currItem.origName;
				} else {
					value = pcs[0];	for (i=1; i<pcs.length-1; i++) { value = value + '.()' + pcs[i]; } value = value + '()';
				}
				value = applyKeyToName(value,currParentAction);
			}
			parms = new Object();
			parms.key = key;
			context = document_showWizard('new',theTransform,'foreach',value,parms);
			value = context.returnValue;
			if (null != value) {
				var newAction = new Action('foreach');
				// !!!parseCollectionSyntax(value); //
				newAction.setAttr('property',value);
				newAction.annotation = context.annotation;
				if (context.key != key) {
					// user explicitly set a key
					key = context.key;
				}
				else if (theTransform.sourceIsVDoc && theTransform.sourceDocType) {
					var nkey = findLastKeyInName(value);
					if ('' == nkey) {
						//  leave key alone
					}
					else if (!isIdent(nkey)) {
						key = '';
					}
					else {
						key = nkey;
					}
				}
				newAction.setAttr('key',key);
				theTransform.addAction(newAction, currParentAction);
				newAction.render();
				selectItem(newAction);
				transformChanged(); // notify studio
				setParentAction(newAction); // make this the parent action
				self.playSound('connect');
			}
		}
		else {
			alert(getLocalText('NoCollection',type));
		}
		break;
	default:
		alert('This type of action is not handled');
		break;
	}

}

// delete current selected action
function removeCurrAction()
{
	// Also remove from parent's list of actions if needed (HCR110)
	var removeFromParent = false;
	if ( currItem && currItem.parent && (currItem.parent.gtype == 'action') ) {
		var x = currItem.parent.type;
		if ((x == 'true') || (x == 'false') || (x == 'foreach')) {
			removeFromParent = true; // action is child of if/foreach
		}
	}

	if (theTransform && currItem && (currItem.gtype == 'action')) {
		theTransform.removeAction(currItem,removeFromParent); // HCR110
		transformChanged();
	}
}

// delete all actions
function removeAllActions()
{
	if (theTransform) {
		if (self.confirm(getLocalText('RemoveAll'))) {
			selectItem(null);
			theTransform.clearActions();
			transformChanged();
		}
	}
}

// modified flag
var modifiedFlag = false;

// set the modified state of the diagram
function setModified(flag)
{
	if (modifiedFlag != flag) {
		modifiedFlag = flag;

		// tell studio about the modification
		canvas_raiseEvent(modifiedFlag ? "MODIFIED" : "NOTMODIFIED");
	}
}

// private

// create a new action between target and source
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
	var action = new Action('assign');
	var prop = '';
	if (theTransform.targetIsVDoc && theTransform.targetDocType) {
		// assume this is a document type message

		// strip off 'target.'
		var oname = target.origName.substring(7);
		if ('???' == oname.substring(0,3)) return;

		prop = 'target.{' + fixCollectionSyntax(oname) + '}';
		prop = applyKeyToName(prop,currParentAction);
	} else {
		prop = target.origName.replace(/\(\)/g,'.()');
		prop = applyKeyToName(prop,currParentAction);
		prop = fixCollectionSyntax(prop,(currParentAction ? currParentAction.getAttr('key') : '1'));
	}
	action.setAttr('property',prop);

	var value = '';
	if (theTransform.sourceIsVDoc && theTransform.sourceDocType) {
		// assume this is a document type message

		// strip off 'source.'
		var oname = source.origName.substring(7);
		if ('???' == oname.substring(0,3)) return;

		var value = 'source.{' + fixCollectionSyntax(oname) + '}';
		value = applyKeyToName(value,currParentAction);
	} else {
		var value = source.origName.replace(/\(\)/g,'.()');
		value = applyKeyToName(value,currParentAction);
		value = fixCollectionSyntax(value,(currParentAction ? currParentAction.getAttr('key') : '1'));
	}
	action.setAttr('value',value);

	action.setAttr('action','set');
	theTransform.addAction(action, currParentAction);
	action.render();
	transformChanged();
}

// tell Studio/container that this document has changed
function transformChanged(nomod)
{
	if (theTransform) {
		if (!nomod) {
			setModified(true);
		}

		var state = theTransform.save();
		canvas_raiseDocumentEvent(state)
	}
}

// raise an event for the external system
function canvas_raiseEvent(type,data)
{
	self.raiseEvent(type,data);
}

function loadSegments(type,cls,doctype,origName,idlist)
{
	self.loadSegmentsFromServer(type,cls,doctype,origName,idlist);
}

// sets up boxes for either target or source classes
// if segment is non-'', then add props to that parent node
function setPropertyBoxes(type, segment, proplist)
{
	var key,index,p;
	var name,label,parent,oname,txt,cnt,ch,last;
	var insert = (null != segment);

	var badCount = 0;
	var errMsg = '';

	if (!insert) {
		// remove old property boxes, reset
		if ('target' == type) {
			// target
			for (key in propIndexTarget) {
				propIndexTarget[key].remove();
			}
			propIndexTarget = new Object();
			index = propIndexTarget;
		}
		else {
			// source
			for (key in propIndexSource) {
				propIndexSource[key].remove();
			}
			propIndexSource = new Object();
			index = propIndexSource;
		}

		// create new property boxes

		// create top-level property box
		p = new PropertyBox(type,null,type,type,type,1,1,-1);
		index[type] = p;
	}
	else {
		// append
		if ('target' == type) {
			index = propIndexTarget;
		}
		else {
			index = propIndexSource;
		}

		// find top node
		p = index[type];
	}

	if ('' == proplist) {
		// done
		return;
	}

	// stack of name prefixes
	var prefix = new Array();
	prefix[0] = type;

	var nprefix = new Array(); // normalized names
	nprefix[0] = type;

	var parentStack = new Array();
	parentStack[0] = p;

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
				if (stk>0) {
					prefix[stk] = prefix[stk-1] + nxtsep + lbl;
					nprefix[stk] = nprefix[stk-1] + '.' + lbl;
					parentStack[stk] = index[nprefix[stk]];
				}
				nxtsep = ch;
				stk++;
				lbl = '';
			}
			else {
				lbl += ch;
			}
		}
	}

	var qs = 0;
	var qe = proplist.indexOf(",");
	var done = 0;
	var qtxt,ts,ord,numch;

	while (!done) {
		if (qe < 0) {
			qtxt = proplist.substring(qs);
			done = 1;
		}
		else {
			qtxt = proplist.substring(qs,qe);
		}
		qs = qe+1;
		qe = proplist.indexOf(",",qs);

		ts = qtxt.split('@');
		txt = ts[0];
		ord = ts[1];
		numch = ts[2];
		ts = null;

		if (txt.length <= 0) {
			errMsg += 'Missing property name.\n';
			// skip this one
		}
		else {
			if (("." != txt.charAt(0)) && (":" != txt.charAt(0))) {
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
				errMsg += 'Property with missing dots: (' + i + ') ' + txt + '\n';
				cnt = 1;
				label = '???Unknown' + (++badCount);
			}
			else {
				// build names (normal and orginal)
				label = txt.substr(cnt);

				if ((null == label) || ('' == label)) {
					errMsg += 'Property with no label: (' + i + ') ' + txt + '\n';
					label = '???Unknown' + (++badCount);
				}
			}

			// replace all (n) with ()
			label = label.replace(/\(\d*\)/g,'()');

			oname = prefix[cnt-1] + last + label;
			prefix[cnt] = oname;

			name = nprefix[cnt-1] + "." + label;
			nprefix[cnt] = name;

			// add ordinal position to label of fields that come after colon
			if (txt.substr(0,cnt).indexOf(':') >= 0) {
				label=ord + ': ' + label;
			}
			p = new PropertyBox(type,parentStack[cnt-1],name,oname,label,cnt + 1,ord,numch);
			index[name] = p;
			parentStack[cnt] = p;
		}
	}

	if ('' != errMsg) {
		alert('There are errors in the property list:\n' + errMsg);
	}
}

// return a normalized form of a property name (i.e. only containing . delims)
function normalizePropertyName(name)
{
	// property names can contain . / : as separators
	name = name.replace(/:/g,'.');
	name = name.replace(/\//g,'.');

	// remove { } chars
	name = name.replace(/\{/g,'');
	name = name.replace(/\}/g,'');

	// replace all (*) with ()
	name = name.replace(/\(\w*\)/g,'()');

	return name;
}

// fix any generic collection syntax () in a name
function fixCollectionSyntax(name,key)
{
	key = (key!=null) ? key : '1';
	name = name.replace(/\(\)/g,'('+key+')');
	return name;
}

// index of properties subscripted by name
var propIndexTarget = new Object();
var propIndexSource = new Object();

// used for property ids
var propertyCounter = 0;

// property box object: type is 'target' or 'source'
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

	wid -= (this.level-1) * 30;
	if (type == 'source') {
		xpos = 50 + ((this.level-1) * 30);
		cx = wid + 5;
	}
	else {
		xpos = spineX + 60 + ((this.level-1) * 30);
		cx = -5;
	}

	this.xPos = xpos;
	this.yPos = ypos;

	this.cx = xpos + cx;
	this.cy = ypos + 12;

	this.width = wid;

	// decide whether to show children initially
	switch(this.level) {
	case 1:
		this.isVisible = true;
		this.showChildren = true;
		this.render();
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

// add an action to this property box
function PropertyBox_addAction(action)
{
	if (this.actionList.length > maxConnections) return;

	this.actionList[this.actionList.length] = action;

	if (this.type == 'target') {
		this.positionActions();
	}
}

// remove an action from this property box
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

// create svg for this shape
function PropertyBox_render()
{
	if (this.SVGGroup) {
		return;
	}

	boxCount++;

	// group with elements inside
	this.SVGGroup = document.createElement("g");

	// backpointer to object
	this.SVGGroup.owner = this;

	this.SVGGroup.addEventListener("mousedown",propertyClick,false);
	this.SVGGroup.addEventListener("mouseover",propertyMouseOver,false);
	this.SVGGroup.addEventListener("mouseout",propertyMouseOut,false);

	// id value
	this.SVGGroup.setAttribute("id", this.id);

	// rect, etc...
	var rect = document.createElement("rect");
	rect.setAttribute("id","rect_" + this.id);
	rect.setAttribute("x",0);
	rect.setAttribute("y",0);
	rect.setAttribute("width",this.width);
	rect.setAttribute("height",24);
	rect.setAttribute("rx",4);
	rect.setAttribute("class","PropRect");

	this.SVGGroup.appendChild(rect);

	// io handle
	var io;
	if (this.type == 'target') {
		io = document.createElement("polygon");
		io.setAttribute("points", (this.cx - this.xPos + 4) + ',12 ' +
				(this.cx - this.xPos - 4) + ',6 ' +
				(this.cx - this.xPos - 4) + ',18 ');
	}
	else {
		io = document.createElement("circle");
		io.setAttribute("cx",this.cx - this.xPos);
		io.setAttribute("cy",12);
		io.setAttribute("r",5);
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
	var expando = document.createElement("polygon");
	expando.setAttribute("points", "5,6 15,12 5,18");
	expando.setAttribute("class","Expando");
	expando.setAttribute("id","expando_" + this.id);
	expando.setAttribute("transform",this.showChildren ? "rotate(90,10,12)" : "");
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
	var view = document.createElement("svg");
	view.setAttribute("x",0);
	view.setAttribute("y",0);
	view.setAttribute("width",this.width);
	view.setAttribute("height",24);
	this.SVGGroup.appendChild(view);

	var text = document.createElement("text");
	text.setAttribute("class","PropName");
	text.setAttribute("x", 20);
	text.setAttribute("y", 18);

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

// reset the position of the actions connected to this target property
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

// delete svg for this shape
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

// set the position of this box
function PropertyBox_place(ypos, visible)
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
		if (!this.SVGGroup) {
			this.render();
		}

		var expando = document.getElementById("expando_" + this.id);
		expando.setAttribute("transform",this.showChildren ? "rotate(90,10,12)" : "");

		this.SVGGroup.setAttribute("style","");
		this.isVisible = true;

		this.yPos = ypos;
		this.cy = ypos + 12;

		ypos += 40;

		var transform = 'translate(' + this.xPos + ',' + this.yPos + ')';
		this.SVGGroup.setAttribute("transform",transform);

		if (this.children) {
			for (var n = 0; n < this.children.length; n++) {
				ypos = this.children[n].place(ypos, this.showChildren);
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

// layout out property boxes according to hierarchy and expando settings
// flag can be 'target','source' or null
function layoutBoxes(flag)
{
	var box;

	// place target shapes
	if (propIndexTarget && (('target' == flag) || (flag == null))) {
		box = propIndexTarget['target'];
		if (box) {
			box.place(60, true);
		}
	}

	// place source shapes
	if (propIndexSource && (('source' == flag) || (flag == null))) {
		box = propIndexSource['source'];
		if (box) {
			box.place(60, true);
		}
	}

	// fix actions
	if (theTransform) {
		for (var target in theTransform.actionList) {
			theTransform.actionList[target].update();
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
	setCanvasSize(1000, (count * 40) + 50 + 20);
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
		startDrag = (evt.clientY * (mouseScale/currZoom));
	}
}

function canvasMouseMove(evt)
{
	evt.stopPropagation();

	if ('' != dragTarget) {
		var delta = (evt.clientY * (mouseScale/currZoom)) - startDrag;
		delta = Math.floor(delta);
		if (delta > 3 || delta < -3) {
			if ('source' == dragTarget) {
				setSourceScroll(sourceScrollTop - delta);
			}
			else {
				setTargetScroll(targetScrollTop - delta);
			}
			startDrag = (evt.clientY * (mouseScale/currZoom));
		}
	}
	else if (currRubberBand) {
		// move edge of RubberBand
		var coord = document.getElementById("canvasSVG");
		var xoff = coord.getAttribute("x") * 1;
		var yoff = coord.getAttribute("y") * 1;

		moveRubberBand((evt.clientX * (mouseScale/currZoom)) - xoff, (evt.clientY * (mouseScale/currZoom)) - yoff);
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

function propertyClick(evt)
{
	evt.stopPropagation();
	var el = evt.getTarget();
	selectItem(el.parentNode.owner);
}

function actionClick(evt)
{
	evt.stopPropagation();
	var el = evt.getTarget();
	selectItem(el.parentNode.owner);
}

var lastSourceX = 0;
var lastSourceY = 0;

function propertyMouseOver(evt)
{
	evt.stopPropagation();
	var el = evt.getTarget();
	var drop = el.parentNode.owner;
	var id = el.parentNode.id();

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
	var el = evt.getTarget();

	lastSourceX = evt.clientX;
	lastSourceY = evt.clientY;
}

function ioHandleMouseDown(evt)
{
	var el = evt.getTarget();
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
	startRubberBand((x * (mouseScale/currZoom)) - xoff, (y * (mouseScale/currZoom)) - yoff);

	currDropTarget = null;
}

function expandoMouseDown(evt)
{
	var el = evt.getTarget();
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
		self.playSound('drill');
	}
}

function expandoMouseUp(evt)
{
	var el = evt.getTarget();
	evt.stopPropagation();
}

function expandoMouseOut(evt)
{
	var el = evt.getTarget();
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
	var el = evt.getTarget();
	evt.stopPropagation();

	el.setAttribute("class","ExpandoDown");
}

// -------------------------------------------------------------------------------

// private functions
// Set the contents of text element id to str
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

// called from menu
function clearCurrentParent()
{
	setParentAction(null);
}

// called from menu
function selectCurrentParent()
{
	if (currItem && currItem.gtype == 'action' && (currItem.type == 'if' || currItem.type == 'foreach')) {
		setParentAction(currItem);
	}
}

function setParentAction(action)
{
	var marker = null;

	if (currParentAction) {
		if (currParentAction.type == 'true' || currParentAction.type == 'false') {
			marker = currParentAction.parent.spineMarker;
		}
		else {
			marker = currParentAction.spineMarker;
		}
		if (marker) {
			marker.setAttribute("stroke",'blue');
			marker.setAttribute("stroke-width",'1');
		}
	}

	marker = null;
	var color = 'green';

	if (action) {
		// find actual action
		if (action.type == 'if') {
			// find true block first time, false second time
			marker = action.spineMarker;

			if ((null == currParentAction) || (currParentAction != action.parent && currParentAction.type == 'false')) {
				// find true
				var newact = null;
				for (var a in theTransform.actionList) {
					var act = theTransform.actionList[a];
					if (act.parent == action && act.type == 'true') {
						newact = act;
						break;
					}
				}
				if (!newact) {
					// no true add one
					var newact = new Action('true');
					theTransform.addAction(newact,action);
					transformChanged(); // notify studio
				}
				action = newact;
			}
			else {
				// find false
				var newact = null;
				for (var a in theTransform.actionList) {
					var act = theTransform.actionList[a];
					if (act.parent == action && act.type == 'false') {
						newact = act;
						break;
					}
				}
				if (!newact) {
					// no false; add one
					var newact = new Action('false');
					theTransform.addAction(newact,action);
					transformChanged(); // notify studio
				}
				action = newact;
				color = 'red';
			}
			currParentAction = action;
		}
		else {
			currParentAction = action;
			marker = action.spineMarker;
		}
	}
	else {
		currParentAction = null;
	}
	if (marker) {
		marker.setAttribute("stroke",color);
		marker.setAttribute("stroke-width",'3');
	}
}

function selectItem(newItem)
{
	try {
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

		updateContextMenu();

		// notify studio of selection
		var state = new Array();

		if (currItem && currItem.gtype == 'property') {
			state[state.length] = "Name"+insDelim2+"STRING"+insDelim2 + currItem.name;
		}
		else if (currItem && currItem.gtype == 'action') {
			var lang = (null == theTransform.language) ? 'objectscript' : theTransform.language;
			// xlate for Studio
			lang = (lang == 'objectscript') ? 'cache' : lang;
			state[state.length] = "Name"+insDelim2+"STRING"+insDelim2 + currItem.type;
			var list,prop;

			switch(currItem.type) {
			case 'assign':
				list = getPropertyList('target');
				prop = currItem.getAttr('property');
				if (insDelim2 == ':') {
					list = list.replace(/:/g,';');
					prop = prop.replace(/:/g,';');
				}
				state[state.length] = "Property"+insDelim2+"ENUM" + list + insDelim2 + prop;
				state[state.length] = "Value"+insDelim2+"EXPRESSION_"+ lang +insDelim2 + currItem.getAttr('value');
				state[state.length] = "Action"+insDelim2+"ENUM^set^clear^remove^append^insert"+insDelim2 + currItem.getAttr('action');
				break;
			case 'subtransform':
				targetlist = getPropertyList('target');
				sourcelist = getPropertyList('source');
				prop = currItem.getAttr('targetObj');
				if (insDelim2 == ':') {
					list = list.replace(/:/g,';');
					prop = prop.replace(/:/g,';');
				}
				state[state.length] = "TargetObj"+insDelim2+"ENUM" + targetlist + insDelim2 + prop;
				state[state.length] = "SourceObj"+insDelim2+"ENUM" + sourcelist + insDelim2 + currItem.getAttr('sourceObj');
				state[state.length] = "Class"+insDelim2+"STRING"+insDelim2 + currItem.getAttr('class');
				break;
			case 'if':
				state[state.length] = "Condition"+insDelim2+"EXPRESSION_"+ lang +insDelim2 + currItem.getAttr('condition');
				break;
			case 'foreach':
				list = getPropertyList('source');
				prop = currItem.getAttr('property');
				if (insDelim2 == ':') {
					list = list.replace(/:/g,';');
					prop = prop.replace(/:/g,';');
				}
				state[state.length] = "Property"+insDelim2+"ENUM" + list + insDelim2 + prop;
				state[state.length] = "Key"+insDelim2+"STRING"+insDelim2 + currItem.getAttr('key');
				break;
			}
		}
		else {
			// document
			if (theTransform) {
				state[state.length] = "Name"+insDelim2+"STRING"+insDelim2+"DTL";
				state[state.length] = "TargetClass"+insDelim2+"DTLTARGET"+ insDelim2 + ((null==theTransform.targetClass)?'':theTransform.targetClass);
				state[state.length] = "TargetDocType"+insDelim2+"DTLTARGETTYPE"+insDelim2 + ((null==theTransform.targetDocType) ? '' : theTransform.targetDocType);
				state[state.length] = "SourceClass"+insDelim2+"DTLSOURCE"+insDelim2 + ((null==theTransform.sourceClass)?'':theTransform.sourceClass);;
				state[state.length] = "SourceDocType"+insDelim2+"DTLSOURCETYPE"+insDelim2 + ((null==theTransform.sourceDocType)?'':theTransform.sourceDocType);
				state[state.length] = "Create"+insDelim2+"ENUM^new^copy^existing"+insDelim2 + ((null==theTransform.create)?'':theTransform.create);
				state[state.length] = "Language"+insDelim2+"ENUM^objectscript^basic"+insDelim2 + ((null==theTransform.language)?'':theTransform.language);
			}
		}

		canvas_raiseSelectEvent(state);
	}
	catch(ex) {
		alert('Exception in selectItem\n' + ex.message);
	}
}

function getPropertyList(t)
{
	var list = '';
	var index,isDoc;

	if ('target' == t) {
		index = propIndexTarget;
		isDoc = theTransform.targetIsVDoc && (theTransform.targetDocType != null);
	}
	else {
		index = propIndexSource;
		isDoc = theTransform.sourceIsVDoc && (theTransform.sourceDocType != null);
	}

	for (key in index) {
		var name;
		if (isDoc) {
			// strip off 'target.' / 'source.'
			var oname = index[key].origName.substring(7);
			// if ('???' == oname.substring(0,3)) return
			if ('' == oname) {
				name = t;
			}
			else {
				name = t + '.{' + fixCollectionSyntax(oname) + '}';
			}
		}
		else {
			name = index[key].origName;
		}
		list += '^' + name;
	}

	return list;
}

// update context menu based on current state
function updateContextMenu()
{
	// update context menu
	var menuRemove = false;
	var menuRemoveAll = true;
	var menuEdit = false;
	var menuAssign = false;
	var menuSetParent = false;
	var menuClearParent = (currParentAction != null);

	if (currItem) {
		if (currItem.gtype == 'action') {
			menuRemove = true;
			menuEdit = true;
			if ((currItem.type == 'if' || currItem.type == 'foreach')) {
				menuSetParent = true;
			}
		}
		else if ((currItem.gtype == 'property') && (currItem.type == 'target')) {
			menuAssign = true; //!!!
		}
	}

	setMenuItemOption("enabled", "menu_Edit", "", menuEdit);
	setMenuItemOption("enabled", "menu_Remove", "", menuRemove);
	setMenuItemOption("enabled", "menu_RemoveAll", "", menuRemoveAll);
	setMenuItemOption("enabled", "menu_SetParent", "", menuSetParent);
	setMenuItemOption("enabled", "menu_ClearParent", "", menuClearParent);

}

// ---------------------------------------------------------------------------


// load an xml dtl document into the editor
// (drawing the actions)
function loadTransform(xml)
{
	// try to remember current parent (foreach only!)
	var pval = null;
	if (currParentAction != null && currParentAction.type == 'foreach') {
		pval = currParentAction.getAttr('property');
		currParentAction = null;
	}

	// clear out old xform
	if (theTransform) {
		theTransform.clearActions();
	}

	theTransform = new Transform();
	loadUsingDOM(xml,theTransform);

	theTransform.targetIsVDoc = (null==theTransform.targetClass) ? false : isVDoc(theTransform.targetClass);
	theTransform.sourceIsVDoc = (null==theTransform.sourceClass) ? false : isVDoc(theTransform.sourceClass);

	theTransform.renderActions();

	// try to re-select parent node
	if (pval != null) {
		for (var n = 0; n < theTransform.actionList.length; n++) {
			var action = theTransform.actionList[n];
			if (action.type == 'foreach' && action.getAttr('property')==pval) {
				setParentAction(action);
				break;
			}
		}
	}
}

// load the contents of the given XML document
// using the XMLDOM object
function loadUsingDOM(xml, tform)
{
	if (!xmlDoc) {
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
	}

	xmlDoc.async = "false";
	xmlDoc.loadXML(xml);

	for (var n = 0; n < xmlDoc.childNodes.length; n++) {
		var node = xmlDoc.childNodes[n];
		if ((1 == node.nodeType) && ('transform' == node.nodeName)) {
			// <transform>

			// get attributes
			for (var a = 0; a < node.attributes.length; a++) {
				var attr = node.attributes[a];
				switch (attr.name) {
				case 'targetClass':
					tform.targetClass = attr.value;
					break;
				case 'targetDocType':
					tform.targetDocType = attr.value;
					break;
				case 'sourceClass':
					tform.sourceClass = attr.value;
					break;
				case 'sourceDocType':
					tform.sourceDocType = attr.value;
					break;
				case 'create':
					tform.create = attr.value;
					break;
				case 'language':
					tform.language = attr.value;
					break;
				}
			}

			parseActions(node,tform);

			// done parsing
			break;
		}
	}
}

// parse contents of <transform> node
function parseActions(tnode,tform)
{
	var action;

	for (var n = 0; n < tnode.childNodes.length; n++) {
		var node = tnode.childNodes[n];
		if (1 == node.nodeType) {

			// create action (unless this is an annotation)
			if ('annotation' != node.nodeName) {
				action = new Action(node.nodeName);
				tform.actionStack[tform.stkPtr] = action;

				// get attributes
				for (var a = 0; a < node.attributes.length; a++) {
					var attr = node.attributes[a];
					action.setAttr(attr.name,attr.value);
				}

				// add to tform
				tform.addAction(action, tform.actionStack[tform.stkPtr-1]);

				// check for annotation (must be first child)
				var anode = node.childNodes[0];
				if (null != anode && 'annotation' == anode.nodeName) {
					action.annotation = getNodeText(anode);
				}

				switch (node.nodeName) {
				case 'assign':
					break;

				case 'code':
				case 'sql':
					var code = '';
					for (var k = 0; k < node.childNodes.length; k++) {
						var knode = node.childNodes[k];

						// 3 = text, 4 = CDATA
						if ((3 == knode.nodeType) || (4 == knode.nodeType)) {
							code += knode.nodeValue;
						}
					}
					action.code = code;
					break;

				case 'foreach':
				case 'if':
				case 'true':
				case 'false':
					// push stack
					tform.stkPtr++;
					tform.actionStack[tform.stkPtr] = null;

					parseActions(node,tform);

					// pop stack
					tform.stkPtr--;
					tform.actionStack[tform.stkPtr] = null;
					break;
				default:
					break;
				}
			}
		}
	}
}

/// Gather textual content from a node
function getNodeText(node)
{
	var text = '';
	for (var k = 0; k < node.childNodes.length; k++) {
		var knode = node.childNodes[k];

		// 3 = text, 4 = CDATA
		if ((3 == knode.nodeType) || (4 == knode.nodeType)) {
			text += knode.nodeValue;
		}
	}
	return text;
}

// -------------------
// transform object

var theTransform = new Transform();

// this object represents a transform
function Transform()
{
	// methods
	this.save = Transform_save;
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

	// used for parsing
	this.actionStack = new Array();
	this.actionStack[0] = null;
	this.stkPtr = 1;
}

// add an action
function Transform_isModified()
{
	return modifiedFlag;
}

// add an action
function Transform_addAction(action, parent)
{
	this.actionList[this.actionList.length] = action;
	action.match();

	if (parent) {
		parent.actionList[parent.actionList.length] = action;
		action.parent = parent;
	}
}

// remove an action
function Transform_removeAction(action,related)
{
	if (currParentAction == action) {
		currParentAction = null;
	}

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

	self.playSound('delete');
	action.unrender();
}

// clear actions
function Transform_clearActions()
{
	// clear out parent action
	setParentAction(null);

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

// render actions
function Transform_renderActions()
{
	for (var n = 0; n < this.actionList.length; n++) {
		var action = this.actionList[n];
		action.render();
	}
}

// save this action to a string
function Transform_save()
{
	var state = '<?xml version="1.0" ?>\n';

	state += "<transform";

	if (this.targetClass) {
		state += " targetClass='" + escapeXML(this.targetClass) + "'";
	}
	if (this.targetDocType && theTransform.targetIsVDoc) {
		state += " targetDocType='" + escapeXML(this.targetDocType) + "'";
	}
	if (this.sourceClass) {
		state += " sourceClass='" + escapeXML(this.sourceClass) + "'";
	}
	if (this.sourceDocType && theTransform.sourceIsVDoc) {
		state += " sourceDocType='" + escapeXML(this.sourceDocType) + "'";
	}
	if (this.create) {
		state += " create='" + this.create + "'";
	}
	if (this.language) {
		state += " language='" + this.language + "'";
	}

	state += ">\n";

	for (var n = 0; n < this.actionList.length; n++) {
		var action = this.actionList[n];
		if (action.parent == null) {
			// top items only
			state += action.save() + "\n";
		}
	}

	state += "</transform>";
	return state;
}

var actionCounter = 0;

// this object represents a transform action
function Action(type)
{
	// methods
	this.setAttr = Action_setAttr;
	this.getAttr = Action_getAttr;
	this.save = Action_save;
	this.select = Action_select;

	this.render = Action_render;
	this.unrender = Action_unrender;
	this.update = Action_update;
	this.reset = Action_reset;
	this.match = Action_match;

	this.getLevel = Action_getLevel;

	// properties
	actionCounter++;
	this.id = "action_" + actionCounter;
	this.name = '';
	this.targetOrdinal = 0;  // set when connected to target
	this.annotation = '';

	this.gtype = 'action';
	this.type = type;
	this.code = '';
	this.attributes = new Object();
	this.attrState = null;  // pre-rendered set of attributes

	switch(this.type) {
	case 'if':
	case 'foreach':
	case 'true':
	case 'false':
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

// find corresponding target & source boxes for this action
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

// create SVG rendering for this action
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

	var g = document.createElement("g");
	g.setAttribute("id",this.id);

	this.SVGGroup = g;
	this.SVGGroup.addEventListener("mousedown",actionClick,false);
	g.owner = this;

	// append to canvas (after Spine)
	var spine = document.getElementById("Spine");
	spine.appendChild(g);

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
		var line = document.createElement("line");
		line.setAttribute("class", selected ? "DTLActionSelected" : "DTLAction");

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
							', L ' + (spineX - this.rx) + ' ' + cY +
							', ' + (sx + this.rx) + ' ' + sy +
							', ' + sx + ' ' + sy;

		line = document.createElement("path");
		line.setAttribute("class", selected ? "DTLActionSelected" : "DTLAction");
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
				marker = document.createElement("circle");
				marker.setAttribute("r", 7);
			}
			else {
				marker = document.createElement("circle");
				marker.setAttribute("r", 5);
			}
		}
		else if (this.targetLine == null) {
			// source only action
			marker = document.createElement("path");
			marker.setAttribute("d", "M0 -6, L 6 0, 0 6, -6 0, z");
		}
		else {
			marker = document.createElement("rect");
			marker.setAttribute("transform", "translate(-5,-5)");
			marker.setAttribute("width", 10);
			marker.setAttribute("height", 10);
			marker.setAttribute("rx", 2);
		}

		marker.setAttribute("class", selected ? "DTLCircleSelected" : "DTLCircle");
		marker.setAttribute("stroke",'blue');
		marker.setAttribute("stroke-width", selected ? "2" : "1");
		g.appendChild(marker);
	}
	this.spineMarker = marker;

	// make sure new lines are drawn right
	this.update();
}

// update display of this action
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

	// check if target is visible
	var tBox = this.target;
	if (tBox && this.targetLine) {
		if (tBox.isVisible) {
			tx = tBox.cx;
			ty = tBox.cy;
			if (this.targetMatch) {
				this.targetLine.setAttribute("style", "");
			}
			else {
				this.targetLine.setAttribute("style", "stroke-dasharray: 4,2;");
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
				cY = ty;
				this.targetLine.setAttribute("style", "stroke-dasharray: 4,2;");
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

			if (this.sourceList.length > 0) {
				this.spineMarker.setAttribute("cx", cX);
				this.spineMarker.setAttribute("cy", (parseInt(cY) - targetScrollTop));
			}
			else {
				this.spineMarker.setAttribute("x", cX);
				this.spineMarker.setAttribute("y", (parseInt(cY) - targetScrollTop));
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
					this.sourceLines[n].setAttribute("style", "");
				}
				else {
					this.sourceLines[n].setAttribute("style", "stroke-dasharray: 4,4;");
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

					this.sourceLines[n].setAttribute("style", "stroke-dasharray: 4,4;");
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

			var path = 'M ' + cX + ' ' + (parseInt(cY) - targetScrollTop) +
						', L ' + (spineX - this.rx) + ' ' + (parseInt(cY) - targetScrollTop) +
						', ' + (sx + this.rx) + ' ' + sy +
						', ' + sx + ' ' + sy;

			this.sourceLines[n].setAttribute("d",path);
		}
	}

	// draw line to spine for source only action
	if (!this.targetLine && this.spineMarker) {
		this.spineMarker.setAttribute("transform", 'translate('+cX+','+cY+')');
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

	var style = "DTLAction";
	var cstyle = "DTLCircle";
	var rstyle = "PropRect";

	switch(flag) {
	case 'related':
		style = "DTLActionRelated";
		cstyle = "DTLCircleRelated";
		rstyle = "PropRectRelated";
		break;
	case 'selected':
		style = "DTLActionSelected";
		cstyle = "DTLCircleSelected";
		rstyle = "PropRectRelated";
		break;
	}

	// set styles for connectors
	if (this.targetLine) {
		this.targetLine.setAttribute("class",style);
	}
	this.spineMarker.setAttribute("class",cstyle);
	for (var n = 0; n < this.sourceLines.length; n++) {
		if (this.sourceLines[n]) {
			this.sourceLines[n].setAttribute("class",style);
		}
	}

	// update related properties
	if (this.target && (this.target != currItem) && this.target.SVGGroup) {
		var rect = document.getElementById("rect_" + this.target.id);
		rect.setAttribute("class",rstyle);
	}

	for (var n = 0; n < this.sourceList.length; n++) {
		var src = this.sourceList[n];
		if (src.SVGGroup && (src != currItem)) {
			var rect = document.getElementById("rect_" + src.id);
			rect.setAttribute("class",rstyle);
		}
	}
}

// serialize this action
function Action_save()
{
	var state = "<" + this.type;
	var hasChildren = false;

	// attributes
	if (!this.attrState) {
		// recalc attr state
		var name = '';
		var a = '';

		// special cases to avoid complaints!
		name = 'property';
		if (null != this.attributes[name]) {
			a += " " + name + "='" + escapeXML(this.attributes[name]) + "'";
		}
		name = 'value';
		if (null != this.attributes[name]) {
			a += " " + name + "='" + escapeXML(this.attributes[name]) + "'";
		}

		for (name in this.attributes) {
			if (name != 'value' && name != 'property') {
				if (null != this.attributes[name]) {
					a += " " + name + "='" + escapeXML(this.attributes[name]) + "'";
				}
			}
		}
		this.attrState = a;
	}

	state += this.attrState;

	if ('' != this.annotation) {
		hasChildren = true;
		state += ">\r\n";
		state += "<annotation>" + escapeXML(this.annotation) + "</annotation>\r\n";
	}

	// children?
	switch(this.type) {
	case 'code':
	case 'sql':
		if (!hasChildren) {
			hasChildren = true;
			state += ">\r\n";
		}
		state += "<!" + "[CDATA[" + trimWS(this.code) + "\r\n]]" + ">\r\n";
		break;

	case 'foreach':
	case 'if':
	case 'true':
	case 'false':
		if (this.actionList.length > 0) {
			if (!hasChildren) {
				hasChildren = true;
				state += '>\r\n';
			}
			for (var n = 0; n < this.actionList.length; n++) {
				state += this.actionList[n].save() + "\r\n";
			}
		}
		else if (this.isContainer) {
			if (!hasChildren) {
				hasChildren = true;
				state += ">\r\n";
			}
			if ('if' == this.type) {
				// normalize empty if
				state += "<true/>\r\n";
				state += "<false/>\r\n";
			}
		}
		break;

	default:
		break;
	}

	if (hasChildren) {
		state += "</" + this.type + ">";
	}
	else {
		state += "/>";
	}

	return state;
}

// trim the trailing whitespace from a string
function trimWS(string)
{
	for (var i = string.length - 1; i >= 0; i--) {
		var ch = string.charAt(i);
		if (ch != ' ' && ch != '\r' && ch != '\n' && ch != '\t') {
			return string.substr(0, i + 1);
		}
	}
	return '';
}

// set an xml-attribute for this Action
function Action_setAttr(attr, value)
{
	this.attributes[attr] = value;
	this.attrState = null;
}

// get an xml-attribute for this Action
function Action_getAttr(attr)
{
	return this.attributes[attr] ? this.attributes[attr] : '';
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

	var element = document.createElement("line");
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
			self.playSound('connect');

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
/// also apply key values from the current parent action
function applyKeyToName(oname,parentAction)
{
	// strip off 'source.' from parent name
	var tokenList = parseCollectionSyntax(oname);
	var parentTokens = null;
	if (parentAction!=null && parentAction.type=='foreach') {
		var pname = parentAction.getAttr('property');
		parentTokens = parseCollectionSyntax(pname);

		// find first property in parent and node
		for (var p = 0; p < parentTokens.length; p++) {
			var pnode = parentTokens[p];
			if (pnode.type == 'prop') {
				break;
			}
		}
		for (var n = 0; n < tokenList.length; n++) {
			var node = tokenList[n];
			if (node.type == 'prop') {
				break;
			}
		}
		// apply keys from parent until no match
		var kc = 0, first=1;
		while (p < parentTokens.length && n < tokenList.length) {
			var pnode = parentTokens[p];
			var node = tokenList[n];
			/* - remove this protection test to allow parallel looping constructs in source and target
			if (pnode.value != node.value) {
				break;
			}*/
			if (pnode.key != null && node.key != null) {
				kc++;
				node.key = pnode.key;
				if (''==node.key) {
					if (first) {
						first=0;
						node.key=parentAction.getAttr('key');
					}
					if (''==node.key) {
						node.key = 'k' + kc;
					}
				}
			}
			p++; n++;
		}
	}
	// find last property: if it has a key,change it to ''
	for (var n = tokenList.length-1; n >= 0; n--) {
		var node = tokenList[n];
		if (node.type == 'prop') {
			if (node.key != null) {
				node.key = '';
			}
			break;
		}
	}
	return unparse(tokenList);
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

/// test if a key value is an ident (and not a literal)
function isIdent(key)
{
	return (key != '' && key.indexOf('\"')==-1 && isNaN(parseInt(key)) && isNaN(parseFloat(key)));
}

/// find properties & keys within a regular or virtual property expression
/// returns list of tokens
function parseCollectionSyntax(expr)
{
	var tokenList = new Array(); // list of tokens

	// parse the expression
	var state = 0;
	var token = "";
	var key = "";
	var braceCount = 0;
	var parenCount = 0;

	for (var n = 0; n < expr.length; n++) {
		var ch = expr.charAt(n);

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

		default:
			alert('parseCollection: unknown state!');
			break;
		}
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
