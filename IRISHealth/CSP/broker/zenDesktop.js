/*
	zenDesktop.js
	ZEN JavaScript desktop client-side geometry management
	plug-in methods
	Copyright (c) 2008-2014 InterSystems Corp.
		ALL RIGHTS RESERVED.
        Local JS Namespace: ZLM_VDP
*/

var ZLM_VDP = {};

/// Class name reserved for miniwindows within the desktop group
ZLM_VDP.subwindowClass = "dragGroup";

/// Spacing constants for the group
ZLM_VDP.topMargin = 15;
ZLM_VDP.leftMargin = 15;

//======================//
// KEY LAYOUT CONSTANTS //
//======================//

ZLM_VDP.rowStylesConst = [
	"FILL_ROW",
	"ALIGN_ROW_TOP",
	"ALIGN_ROW_CENTER",
	"ALIGN_ROW_BOTTOM",
	"FILL_UNIFORM",
	"ALIGN_UNIFORM_TOP",
	"ALIGN_UNIFORM_CENTER",
	"ALIGN_UNIFORM_BOTTOM"
];

ZLM_VDP.colStyleConst = [
	"(none)",
	"FILL_COLUMN",
	"ALIGN_COLUMN_LEFT",
	"ALIGN_COLUMN_CENTER",
	"ALIGN_COLUMN_RIGHT",
	"FILL_WIDTH",
	"ALIGN_WIDTH_LEFT",
	"ALIGN_WIDTH_CENTER",
	"ALIGN_WIDTH_RIGHT",
	"FILL_UNIFORM",
	"ALIGN_UNIFORM_LEFT",
	"ALIGN_UNIFORM_CENTER",
	"ALIGN_UNIFORM_RIGHT"
];

ZLM_VDP.layoutConst = {
	// Row/Col alignment constants
	"LEFT":  0,
	"TOP":   0,
	"CENTER":1,
	"BOTTOM":2,
	"RIGHT": 2,
	// Row/Col spanning constants
	"MATCH":  0,
	"UNIFORM":1,
	"SPREAD": 2,
	"RAW":    3,
	// Row/Col filling constants
	"ALIGN":  0,
	"FILL":   1
};


//============================//
//  INITIALIZATION FUNCTIONS  //
//============================//

ZLM_VDP.initDesktop=function(mgr) {
	// set some layout parameters
	mgr.colAlign = ZLM_VDP.layoutConst.LEFT; // column alignment hints
	mgr.rowAlign = ZLM_VDP.layoutConst.TOP;  // row alignment hints
	mgr.colSpan = ZLM_VDP.layoutConst.RAW;   // column host landing zone sizing hints
	mgr.rowSpan = ZLM_VDP.layoutConst.MATCH; // row host landing zone sizing hints
	mgr.colFill = ZLM_VDP.layoutConst.ALIGN; // column element sizing hints
	mgr.rowFill = ZLM_VDP.layoutConst.ALIGN; // row element sizing hints

	mgr.vGap = 3;
	mgr.hGap = 3;

	// define the key functions that make up a layout manager
	var workhorse = new ZLM_VDP.Desktop(mgr);
	mgr.engine = workhorse;
	mgr.layoutBlock    = ZLM_VDP.layoutBlock;
	mgr.extractItem    = ZLM_VDP.extract;
	mgr.insertItem     = ZLM_VDP.insert;
	mgr.startDrag      = ZLM_VDP.startDrag;
	mgr.constrainDragX = ZLM_VDP.constrainDragX;
	mgr.constrainDragY = ZLM_VDP.constrainDragY;
	mgr.endDrag        = ZLM_VDP.endDrag;

	// Add a couple non-standard entry points
	mgr.setRowStyle    = ZLM_VDP.setRowStyle;
	mgr.setColumnStyle = ZLM_VDP.setColumnStyle;
	mgr.getState       = ZLM_VDP.getState;
	mgr.restoreState   = ZLM_VDP.restoreState;
	mgr.closePane      = ZLM_VDP.closePane;

	workhorse.repackMatrix();
}


//=========================================//
// CLIENT-SIDE LAYOUT MANAGER ENTRY POINTS //
//=========================================//

/// Public entry point to request that the area under the
/// control of this manager is refreshed.
ZLM_VDP.layoutBlock = function(engine) {
	engine.repackMatrix();
}

/// Public entry point allowing the local layout manager to
/// to restrict horizontal movement during a drag
ZLM_VDP.constrainDragX = function(engine, wrapper, newX) {
	return(engine.constrainX(wrapper, newX));
}

/// Public entry point allowing the local layout manager to
/// to restrict vertical movement during a drag
ZLM_VDP.constrainDragY = function(engine, wrapper, newY) {
	return(engine.constrainY(wrapper, newY));
}

/// Public entry point for a callback to the local layout
/// manager in the event of a user initiated drag operation
ZLM_VDP.startDrag = function(engine, wrapper) {
	var z=wrapper.node.zenObj;
	//wrapper.node.style.opacity="0.85";
	//wrapper.node.style.filter="alpha(opacity=85)";
	if (z && z.coverplate) z.coverplate.style.display="block";
	engine.ghostItem(wrapper.node);
}

/// Public entry point for a callback to the local layout
/// manager in the event of a completed drag operation
ZLM_VDP.endDrag = function(engine, wrapper) {
	engine.unghostItem(wrapper.node);
	//wrapper.node.style.opacity="1";
	//wrapper.node.style.filter="alpha(opacity=100)";
	var z=wrapper.node.zenObj;
	if (z && z.onGrabHandler) z.onGrabHandler();
	if (z && z.coverplate) z.coverplate.style.display="none";
}

/// Public entry point to programmatically remove the DOM
/// projection of a DragGroup from the current managed group.
/// If xferToHand is true, the DOM subtree should not be deleted,
/// but rather it should be removed and transfered to the
/// object-in-hand dragging buffer
ZLM_VDP.extract = function(engine, item, xferToHand) {
	engine.extractItem(item, xferToHand);
}

/// Public entry point to programmatically add a new DOM
/// projection of a DragGroup to the managed group.  If
/// xferFromHand is true, the subtree is the in the object-in-hand
/// dragging buffer and its initial position should be set as a
/// function of the pointer location
ZLM_VDP.insert = function(engine, item, xferFromHand) {
	engine.insertItem(item, xferFromHand);
}

/// Public entry point to dynamically change the layout style of the
/// mini-windows of the desktop
ZLM_VDP.setColumnStyle=function(engine,layout) {
	engine.setColumnStyle(layout);
}

/// Public entry point to dynamically change the layout style of the
/// mini-windows of the desktop
ZLM_VDP.setRowStyle=function(engine,layout) {
	engine.setRowStyle(layout);
}

/// Public entry point to get the current layout state of the desktop
/// component and its subwindows
ZLM_VDP.getState=function(engine) {
	return(engine.getStateString());
}

/// Public entry point to restore a previous layout state of the
/// desktop component and its subwindows
ZLM_VDP.restoreState=function(engine,layout) {
	engine.restoreState(layout);
}

//=================================//
// DRAG_GROUP MANAGEMENT CALLBACKS //
//=================================//

/// Callback to close a subwindow and remove its DOM subtree from
/// the managed group
ZLM_VDP.closePane=function(dragDOMPane) {
	var wrapper = ZLM.getWrapper(dragDOMPane);
	var mgr = wrapper.manager;
	mgr.extractItem(mgr.engine,dragDOMPane,false);
	if (dragDOMPane.parentNode) {
		var zObj=dragDOMPane.zenObj;
		if (zObj) {
			zObj.parent.removeChild(zObj);
		}
		else dragDOMPane.parentNode.removeChild(dragDOMPane);
	}
	ZLM.refreshLayout();
}

//===============//
// HELPER CLASS  //
//===============//

// Create a new instance of a Desktop manager
ZLM_VDP.Desktop=function(publicMgr) {
	this.mgr = publicMgr;
	this.topMargin = ZLM_VDP.topMargin;    // internal padding for the layout module
	this.leftMargin = ZLM_VDP.leftMargin;
	this.matrix = new Array();
	this.span = new Array();
	this.count = 0;
	this.ghost = null;

	this.mgr.root.style.position="relative";
	this.mgr.root.style.top="0px";
	this.mgr.root.style.left="0px";
	this.mgr.root.style.width="100%";
	this.mgr.root.style.height="100%";
	if (this.mgr.root.parentNode.clientHeight<2) {
		if (window.getComputedStyle){
			var css=window.getComputedStyle(this.mgr.root,null);
			var bw=parseInt(css.borderBottomWidth)+parseInt(css.borderTopWidth);
		}
		else var bw=0;
		var h=document.body.clientHeight-bw;
		this.mgr.root.parentNode.style.height=h;
	}
//this.sizeContainer();
	this.prepareList(this.mgr.root);
	this.mgr.root.engine = this;
	ZLM.setLocalAttribute(this.mgr.root,"onresize","this.engine.resize();");
	this.addCoverPlate();
	var rowStyle = this.mgr.root.getAttribute("rowStyle");
	if (rowStyle) this.setRowStyle(rowStyle);
	var colStyle = this.mgr.root.getAttribute("colStyle");
	if (colStyle) this.setColumnStyle(colStyle);
//WALLPAPER
	var node=this.mgr.root;
	var wppr = ZLM.simulateTag("div class='desktopWallpaper' style='position:relative;top:0px;left:0px;width:100%;height:100%;'");
	node.insertBefore(wppr,node.firstChild);
	node.wallpaper = wppr;
}

/// return the HTML div that serves as the backdrop for the snapgroup
ZLM_VDP.Desktop.prototype.getWallpaperDiv = function() 
{
	return(this.mgr.root.wallpaper);
}

/// Check for sychronization errors in case the desktop was refreshed
/// from the server without notifying us.
ZLM_VDP.Desktop.prototype.verifySynch=function() {
	/// Check for root element coming unhinged
	var p = this.mgr.root;
	var okay = false;
	while (!okay && p) {
		okay = (p==document.body);
		p = p.parentNode;
	}
	if (!okay) return(false); // root needs to be reinitialized
	var k = this.kidList;
	var l = k.length;
	for (var i=0;i<l;i++) {
		if (!k[i].parentNode.parentNode) return(false);
	}
	return(true);
}

/// If a synchronization error has occurred reset the controller to
/// manage the new DOM as it currently exists
ZLM_VDP.Desktop.prototype.resetController = function() {
	var div = document.getElementById(this.mgr.rootId)
	if (div) {
		this.resynchronize(div);
	}
}

/// Reinitialize settings in DOM node to match the existing state
/// of the desktop
ZLM_VDP.Desktop.prototype.reinitRoot = function(div) {
	var m = this.mgr;
	m.root = div;
	var mrs = m.root.style;
	mrs.position = "relative";
	mrs.top = "0px";
	mrs.left = "0px";
	mrs.width="100%";
	mrs.height="100%";
	if (m.root.parentNode.clientHeight<2 && m.root.clientWidth>0) {
		if (window.getComputedStyle){
			var css=window.getComputedStyle(this.mgr.root,null);
			var bw=parseInt(css.borderBottomWidth)+parseInt(css.borderTopWidth);
		}
		else var bw=0;
		var h=document.body.clientHeight-bw;
		this.mgr.root.parentNode.style.height=h+"px";
	}
	this.mgr.root.engine = this;
	ZLM.setLocalAttribute(this.mgr.root,"onresize","this.engine.resize();");
	this.addCoverPlate();
}

/// If, for any reason the model should fall out of sync with
/// respect to the DOM, reinitialize the controller, retaining
/// as much information from the old model as possible.
ZLM_VDP.Desktop.prototype.resynchronize = function(div) {
	this.reinitRoot(div);
	var k=this.kidList;
	var kl=k.length;
	var n=div.childNodes;
	var nl=n.length;
	var c=[];
	for (var i=0;i<kl;i++) c.push(false);
	for (var j=0;j<nl;j++) {
		if (n[j].nodeType==1 && n[j].className=="dragGroup") {
			n[j].layoutMgr = this.mgr;
			n[j].layoutEngine = this;
			ZLM.registerDragItem(n[j],this.mgr);
			var id=n[j].id;
			var i=0;
			while(i<kl && k[i].id!=id) i++;
			if (i<kl) {
				if (c[i]) {
					alert("zenDesktop Error: Duplicate IDs found in dragGroups ("+id+")");
					div.removeChild(n[j]);
					break;
				}

				c[i]=true;
				k[i]=n[j];
				for (var ii=0;ii<this.matrix.length;ii++) {
					var row=this.matrix[ii];
					for (var jj=0;jj<row.length;jj++) {
						if (row[jj].id==id) {
							var s=k[i].style;
							s.top=row[jj].style.top;
							s.left=row[jj].style.left;
							s.width=row[jj].style.width;
							s.height=row[jj].style.height;
							k[i].prefHeight=row[jj].prefHeight;
							k[i].prefWidth=row[jj].prefWidth;
							k[i].compressed=row[jj].compressed;
							k[i].maximized=row[jj].maximized;
							row[jj]=k[i];
						}
					}
				}
			}
			else {
				if (!n[j].zenObj && zenGetComponentById) {
					var zC = zenGetComponentById(n[j].id);
					if (zC) zC.renderContents();
				}
				this.addActiveKid(n[j]);
				this.insertMatrixNode(n[j]);
				c[i]=true;
			}
		}
	}
	k = k.slice();
	for (var i=0;i<c.length;i++) {
		if (c[i]==false) {
			this.deleteNode(k[i]);
			this.killActiveKid(k[i]);
		}
	}
	this.repackMatrix();
}

ZLM_VDP.Desktop.prototype.addCoverPlate = function() {
	var d = ZLM.simulateTag("div style='display:none; position:absolute; width:100%; height:100%; zIndex:10; top:0px; left:0px;'");
	ZLM.setLocalAttribute(d,"onmousemove","ZLM.killEvent(event);");
	this.mgr.root.appendChild(d);
	this.coverplate=d;
}

ZLM_VDP.Desktop.prototype.showCoverPlate = function() {
	this.coverplate.style.zIndex=this.kidList.length;
	this.coverplate.style.display="block";
}

ZLM_VDP.Desktop.prototype.hideCoverPlate = function() {
	this.coverplate.style.display="none";
}

/// Resize callback to map the size of the container to the available
/// render area
ZLM_VDP.Desktop.prototype.resize=function() {
	if (arguments && arguments.callee && arguments.callee.caller) {
		if (arguments.callee.caller.toString().indexOf("function anonymous")==0) return;
	}
	this.sizeContainer();
}

/// Adjust the size of the desktop area to conform to the size of its
/// inline container (possibly unneeded)
ZLM_VDP.Desktop.prototype.sizeContainer = function() {
//	var w = this.mgr.root.parentNode.clientWidth;
//	var h = this.mgr.root.parentNode.clientHeight;
//	ZLM.setOffsetWidth(this.mgr.root,w);
//	ZLM.setOffsetHeight(this.mgr.root,h);
}

/// Create the master list of drag-able elements after the initial
/// load of the page. This list is then packed into the drag matrix
/// using the initial absolute position parameters as a guideline.
/// This routine also adds the attribute kidList to the Desktop
/// controller object.
ZLM_VDP.Desktop.prototype.prepareList = function() {
	this.kidList = ZLM.getElementsByClassPrefix(ZLM_VDP.subwindowClass,this.mgr.root,2);
	for (var i=0;i<this.kidList.length;i++) {
		this.kidList[i].layoutMgr = this.mgr;
		this.kidList[i].layoutEngine = this;
		var node = ZLM.registerDragItem(this.kidList[i],this.mgr);
		this.insertMatrixNode(this.kidList[i]);
	}
}

/// Add the given node to the active child list if it is not
/// already on the list.
ZLM_VDP.Desktop.prototype.addActiveKid = function(node) {
	for (var i=0;i<this.kidList.length;i++) {
		if (this.kidList[i]==node) return;
	}
	this.kidList[i]=node;
}

/// Remove the given node from the active child list.  If the node
/// was not on the list to begin with, abort without error
ZLM_VDP.Desktop.prototype.killActiveKid = function(node) {
	for(var i=0; i<this.kidList.length; i++) {
		if (this.kidList[i]==node) {
			for (var j=i+1;j<this.kidList.length;j++) {
				this.kidList[j-1]=this.kidList[j];
			}
			this.kidList.pop();
			return;
		}
	}
}

/// Globally set the display attribute for all child nodes.  This is
/// useful for hiding a panel full of subwindows when one of them is
/// maximized.
ZLM_VDP.Desktop.prototype.setKidsDisplay = function(setting) {
	var k=this.kidList;
	var l=this.kidList.length;
	for (var i=0;i<l;i++) {
		k[i].style.display=setting;
	}
}

/// Set the appropriate layout parameters based on the macro-level
/// layout style selected
ZLM_VDP.Desktop.prototype.setColumnStyle=function(layout) {
	// set default layout to reflect (none) and go from there
	this.mgr.colAlign = ZLM_VDP.layoutConst.LEFT;
	this.mgr.colSpan = ZLM_VDP.layoutConst.RAW;
	this.mgr.colFill = ZLM_VDP.layoutConst.ALIGN;
	if (layout=="FILL_COLUMN") {
		this.mgr.colSpan = ZLM_VDP.layoutConst.MATCH;
		this.mgr.colFill = ZLM_VDP.layoutConst.FILL;
	}
	else if (layout=="ALIGN_COLUMN_LEFT") {
		this.mgr.colAlign = ZLM_VDP.layoutConst.LEFT;
		this.mgr.colSpan = ZLM_VDP.layoutConst.MATCH;
	}
	else if (layout=="ALIGN_COLUMN_CENTER") {
		this.mgr.colAlign = ZLM_VDP.layoutConst.CENTER;
		this.mgr.colSpan = ZLM_VDP.layoutConst.MATCH;
	}
	else if (layout=="ALIGN_COLUMN_RIGHT") {
		this.mgr.colAlign = ZLM_VDP.layoutConst.RIGHT;
		this.mgr.colSpan = ZLM_VDP.layoutConst.MATCH;
	}
	else if (layout=="FILL_WIDTH") {
		this.mgr.colSpan = ZLM_VDP.layoutConst.SPREAD;
		this.mgr.colFill = ZLM_VDP.layoutConst.FILL;
	}
	else if (layout=="ALIGN_WIDTH_LEFT") {
		this.mgr.colSpan = ZLM_VDP.layoutConst.SPREAD;
	}
	else if (layout=="ALIGN_WIDTH_CENTER") {
		this.mgr.colAlign = ZLM_VDP.layoutConst.CENTER;
		this.mgr.colSpan = ZLM_VDP.layoutConst.SPREAD;
	}
	else if (layout=="ALIGN_WIDTH_RIGHT") {
		this.mgr.colAlign = ZLM_VDP.layoutConst.RIGHT;
		this.mgr.colSpan = ZLM_VDP.layoutConst.SPREAD;
	}
	else if (layout=="FILL_UNIFORM") {
		this.mgr.colSpan = ZLM_VDP.layoutConst.UNIFORM;
		this.mgr.colFill = ZLM_VDP.layoutConst.FILL;
	}
	else if (layout=="ALIGN_UNIFORM_LEFT") {
		this.mgr.colSpan = ZLM_VDP.layoutConst.UNIFORM;
	}
	else if (layout=="ALIGN_UNIFORM_CENTER") {
		this.mgr.colAlign = ZLM_VDP.layoutConst.CENTER;
		this.mgr.colSpan = ZLM_VDP.layoutConst.UNIFORM;
	}
	else if (layout=="ALIGN_UNIFORM_RIGHT") {
		this.mgr.colAlign = ZLM_VDP.layoutConst.RIGHT;
		this.mgr.colSpan = ZLM_VDP.layoutConst.UNIFORM;
	}
	this.repackMatrix();
}

/// Set the appropriate layout parameters based on the macro-level
/// layout row style selected
ZLM_VDP.Desktop.prototype.setRowStyle=function(layout) {
	// set default behavior to ALIGN_ROW_TOP and apply deltas from there
	this.mgr.rowAlign = ZLM_VDP.layoutConst.TOP;
	this.mgr.rowSpan = ZLM_VDP.layoutConst.MATCH;
	this.mgr.rowFill = ZLM_VDP.layoutConst.ALIGN;
	if (layout=="FILL_ROW") {
		this.mgr.rowFill = ZLM_VDP.layoutConst.FILL;
	}
	else if (layout=="ALIGN_ROW_CENTER") {
		this.mgr.rowAlign = ZLM_VDP.layoutConst.CENTER;
	}
	else if (layout=="ALIGN_ROW_BOTTOM") {
		this.mgr.rowAlign = ZLM_VDP.layoutConst.BOTTOM;
	}
	else if (layout=="FILL_UNIFORM") {
		this.mgr.rowSpan = ZLM_VDP.layoutConst.UNIFORM;
		this.mgr.rowFill = ZLM_VDP.layoutConst.FILL;
	}
	else if (layout=="ALIGN_UNIFORM_TOP") {
		this.mgr.rowSpan = ZLM_VDP.layoutConst.UNIFORM;
	}
	else if (layout=="ALIGN_UNIFORM_CENTER") {
		this.mgr.rowAlign = ZLM_VDP.layoutConst.CENTER;
		this.mgr.rowSpan = ZLM_VDP.layoutConst.UNIFORM;
	}
	else if (layout=="ALIGN_UNIFORM_BOTTOM") {
		this.mgr.rowAlign = ZLM_VDP.layoutConst.BOTTOM;
		this.mgr.rowSpan = ZLM_VDP.layoutConst.UNIFORM;
	}
	this.repackMatrix();
}

/// Set the top margin for the desktop area and move children
/// accordingly.
ZLM_VDP.Desktop.prototype.setTopMargin = function(m) {
	this.topMargin=parseInt(m,10);
	this.repackMatrix();
}

/// Set the left margin for the desktop area and move children
/// accordingly.
ZLM_VDP.Desktop.prototype.setLeftMargin = function(m) {
	this.leftMargin=parseInt(m,10);
	this.repackMatrix();
}

/// Set the vertical spacing between rows of the matrix and
/// move children accordingly.
ZLM_VDP.Desktop.prototype.setVerticalGap = function(g) {
	this.mgr.vGap=parseInt(g,10);
	this.repackMatrix();
}

/// Set the vertical spacing between rows of the matrix and
/// move children accordingly.
ZLM_VDP.Desktop.prototype.setHorizontalGap = function(g) {
	this.mgr.hGap=parseInt(g,10);
	this.repackMatrix();
}

//==========================//
//  GLOBAL QUERY FUNCTIONS  //
//==========================//

/// Given a node ID, return its index in the active child list or
/// -1 if the given ID is unknown
ZLM_VDP.Desktop.prototype.findNode=function(id) {
	var k=this.kidList;
	var l=this.kidList.length;
	for (var i=0;i<l;i++) {
		if (k[i].id==id) return(i);
	}
	return(-1);
}

/// Report relevant state info to stderr for debugging purposes
ZLM_VDP.Desktop.prototype.snapshot = function() {
	for (var i=0;i<this.matrix.length;i++) {
		var row=this.matrix[i];
		for (var j=0;j<row.length;j++) {
			if (row[j]!=this.ghost) {
				ZLM.cerr("Node: "+row[j].id+" title: "+row[j].zenObj.header);
				ZLM.cerr("  Row: "+i+" Col: "+j+" Top: "+row[j].offsetTop+" Left: "+row[j].offsetLeft);
				ZLM.cerr("  Width: "+row[j].prefWidth+" Height: "+row[j].prefHeight+" Icon: "+row[j].compressed+" Full: "+row[j].maximized);
			}
		}
	}
}

/// Return relevant state info in a string of the form:
///   DesktopID|rowAlign|rowSpan|rowFill|colAlign|colSpan|colFill&
///   row|col|MiniwindowID:(etc):(etc)&
///   row|col|MiniwindowID:(etc):(etc)
ZLM_VDP.Desktop.prototype.getStateString = function() {
	var str = this.mgr.root.id+"|"+this.mgr.rowAlign+"|"+this.mgr.rowSpan+"|"+this.mgr.rowFill+"|";
	str = str+this.mgr.colAlign+"|"+this.mgr.colSpan+"|"+this.mgr.colFill;
	if (this.matrix.length>0) {
		for (var i=0;i<this.matrix.length;i++) {
			var row=this.matrix[i];
			for (var j=0;j<row.length;j++) {
				var r = row[j];
				if (row[j]!=this.ghost) {
					str=str+"&"+i+"|"+j+"|"+r.zenObj.getState();
				}
			}
		}
	}
	return(str);
}

/// Given a layout string of the form:
///   DesktopID|rowAlign|rowSpan|rowFill|colAlign|colSpan|colFill&
///   row|col|MiniwindowID:(etc):(etc)&
///   row|col|MiniwindowID:(etc):(etc)
/// restore the state of the desktop to match this string
ZLM_VDP.Desktop.prototype.restoreState = function(str) {
	this.matrix=[];
	this.span=[];
	var row = null;

	var visited = [];
	for (var i=this.kidList.length;i>0;i--) visited.push(false);

	var winRec = str.split('&');
	for (var i=0;i<winRec.length;i++) {
		var d = winRec[i].split('|');
		if (i==0) {
			if (d[0]!=this.mgr.root.id) {
				alert("ERROR: Desktop IDs don't match");
				return;
			}
			this.mgr.rowAlign=parseInt(d[1]);
			this.mgr.rowSpan=parseInt(d[2]);
			this.mgr.rowFill=parseInt(d[3]);
			this.mgr.colAlign=parseInt(d[4]);
			this.mgr.colSpan=parseInt(d[5]);
			this.mgr.colFill=parseInt(d[6]);
		}
		else {
			if (d[1]=="0") {
				row = [];
				this.matrix.push(row);
			}
			var idx = this.findNode(d[2].substring(0,d[2].indexOf(':')));
			if (idx>=0) {
				visited[idx] = true;
				var n = this.kidList[idx];
				row.push(n);
				n.zenObj.restoreState(d[2]);
			}
		}
	}

	for (var i=0;i<visited.length;i++) {
		if (!visited[i]) {
			if (!newRow) {
				var newRow = [];
				this.matrix.push(newRow);
			}
			newRow.push(this.kidList[i]);
		}
	}

	for (var i=0;i<this.matrix.length;i++) {
		this.span[i] = this.getMaxVerticalSpan(i)+this.mgr.vGap;
	}
	this.repackMatrix();
}

/// Calculate the height of the tallest element in a given row of the
/// Drag Matrix.  NOTE: This height includes space for the margins,
/// borders, and padding of the individual elements but DOES NOT
/// include the vertical gutter between rows.
ZLM_VDP.Desktop.prototype.getMaxVerticalSpan = function(rowIdx) {
	var Max = 0;
	var row = this.matrix[rowIdx];
	var len = row.length;
	for (var i=0;i<len;i++) {
		var H = row[i].prefHeight;
		if (H>Max) Max=H;
	}
	return(Max);
}

/// Calculate the height of the tallest element in the matrix
ZLM_VDP.Desktop.prototype.getMaxNodeHeight = function() {
	var Max=0;
	for (var i=0;i<this.matrix.length;i++) {
		var row=this.matrix[i];
		for (var j=0;j<row.length;j++) {
			if (row[j].prefHeight>Max) Max=row[j].prefHeight;
		}
	}
	return(Max);
}

/// Calculate the width of the widest element in the matrix
ZLM_VDP.Desktop.prototype.getMaxNodeWidth = function() {
	var Max=0;
	for (var i=0;i<this.matrix.length;i++) {
		var row=this.matrix[i];
		for (var j=0;j<row.length;j++) {
			if (row[j].prefWidth>Max) Max=row[j].prefWidth;
		}
	}
	return(Max);
}

/// Calculate the width of a given row of elements based on the
/// minimal space needed to present them in their 'native' size.
/// NOTE: This calculation INCLUDES the space required for the
/// gutter between the individual elements.
ZLM_VDP.Desktop.prototype.getHorizontalSpan = function(rowIdx) {
	var gap = this.mgr.hGap;
	var totalW = 0;
	var row = this.matrix[rowIdx];
	var len = row.length;
	for(var i=0;i<len;i++) {
		totalW+=row[i].prefWidth+gap;
	}
	totalW -=gap;  // remove extra gutter space after last element
	return(totalW);
}

/// Calculate the longest span of pixels require by any row in
/// the matrix.  NOTE: this value includes app space needed for
/// margins, boarders, padding and gutters
ZLM_VDP.Desktop.prototype.getMaxHorizontalSpan = function() {
	var max = 0;
	var len = this.matrix.length;
	for (var i = 0; i<len; i++) {
		var w = this.getHorizontalSpan(i);
		if (max<w) max=w;
	}
	return(max);
}

/// Calculate the size of the widest element in the matrix for the
/// given column. NOTE: This value includes space for margins,
/// borders and spaces but DOES NOT include the space taken up by
/// gutters between elements. NOTE ALSO: If the target column
/// exceeds the length of the list of elements on a given row, a
/// width of 0 (zero) is assumed for that row
ZLM_VDP.Desktop.prototype.getMaxColumnSpan = function(colIdx) {
	var max=0;
	var w=0;
	var ml = this.matrix.length;
	for (var i=0; i<ml; i++) {
		var row = this.matrix[i];
		if (colIdx<row.length) w=row[colIdx].prefWidth;
		else w=0; // row isn't that long
		if (max<w) max=w;
	}
	return(max);
}

/// Calculate the Y offset on the page for a given band/row of the
/// DragMatrix.  This value is the sum of the heights of all the
/// preceeding bands (as recorded in this.span - which includes
/// gutter heights) plus the base offset (the constant this.topMargin)
ZLM_VDP.Desktop.prototype.getVerticalOffset = function(rowIdx) {
	var Offset = this.topMargin;
	for (var i=0;i<rowIdx;i++) Offset+= this.span[i];
	return(Offset);
}

/// Finds which row of the DragMatrix holds the given node
ZLM_VDP.Desktop.prototype.getElementRowIndex = function(node) {
	var i=0;
	var len = this.matrix.length;
	while (i<len) {
		if (this.getElementColIndex(i,node)>=0) return(i);
		i++;
	}
	return(-1);
}

/// Find the column index of the given node in the given row of the
/// matrix or -1 if the given node is not a member of the row
/// Where:
/// 	rowIdx: index of the row to search
/// 	node: the node in question
ZLM_VDP.Desktop.prototype.getElementColIndex = function(rowIdx, node) {
	var i=0;
	var row = this.matrix[rowIdx];
	var len = row.length;
	while (i<len) {
		if (row[i]==node) return(i);
		i++;
	}
	return(-1);
}

//=============================//
//  MATRIX BUILDING FUNCTIONS  //
//=============================//

/// Create a dummy ghost-div to serve a place holder for the
/// object in hand during a drag
ZLM_VDP.Desktop.prototype.createGhost = function(node) {
	var left = node.offsetLeft;
	var top = node.offsetTop;
	var width = ZLM.getInsideWidth(node);
	var height = ZLM.getInsideHeight(node);
	var attrs = [];
//attrs["id"] = "ghostPane";
	attrs["class"] = "zenDesktopGhostPane";
	attrs["style"] = "position:absolute; left:"+left+"px; top:"+top+"px; width:"+width+"px; height:"+height+"px;";
	this.ghost = ZLM.makeElement("div",attrs,null);
	this.ghost.prefWidth = node.prefWidth;
	this.ghost.prefHeight = node.prefHeight;
	this.ghost.manager = this.mgr;
	// extra properties unique to the ghost element
	this.ghost.homeRow = this.getElementRowIndex(node);
	this.ghost.homeCol = this.getElementColIndex(this.ghost.homeRow,node);
}

/// Given an existing row in the Matrix and a pixel location, return
/// an indexed insertion point such that the row remains ordered
/// from left to right in increasing values of X. WHERE:
/// 	row: the actual row to scan
/// 	pixCol: the starting location of the item to be inserted into the row
ZLM_VDP.Desktop.prototype.getRowInsertionIndex=function(row,pixCol) {
	var rowLen = row.length;
	for(var i=0;i<rowLen;i++) {
		if (pixCol<row[i].offsetLeft) return(i);
	}
	return(i);
}

/// Return the optimal insertion point in the Matrix for the given
/// node based on the node's initial offset Top & Left values and
/// the current contents of the desktop Matrix.
ZLM_VDP.Desktop.prototype.getMatrixInsertionPoint=function(node) {
	var point = {};
	var targetY = node.offsetTop;
	if (this.matrix==null || this.count==0 || targetY<this.topMargin) {
		point.row = 0;
		point.col = 0;
		return(point);
	}
	else {
		var len = this.matrix.length;
		var i = 0;
		while (i<len) {
			var top = this.getVerticalOffset(i);
			var bottom = top+this.span[i];
			if (targetY>=top && targetY<bottom) {
				point.row = i;
				point.col = this.getRowInsertionIndex(this.matrix[i],node.offsetLeft);
				return(point);
			}
			i++;
		}
		point.row = len;
		point.col = 0;
		return(point);
	}
}

/// Insert a new, populated row into the Matrix, shifting existing
/// members of the array (and its sister array Span) accordingly
/// WHERE:
/// 	row:	row to be inserted
/// 	rowIdx:	Target location in DragMatrix for new row
///
ZLM_VDP.Desktop.prototype.insertRow = function(row, rowIdx) {
	var m = this.matrix;
	var s = this.span;
	for (var i= m.length; i>rowIdx; i--) {
		m[i]= m[i-1];
		s[i]= s[i-1];
	}
	m[i]=row;
	s[i]=this.getMaxVerticalSpan(i)+this.mgr.vGap;
}

/// Insert a node in a given row, shifting the remaining elements
/// of the list.
/// If rowIdx = -1 the function is being called to add a new first
/// row to the Matrix. This row should be created, populated with
/// the new node, and all remaining elements in the drag matrix
/// should shift vertically.
/// If rowIdx is greater than the length of Matrix, a new last row
/// is to be added and populated with the new node.
/// In all cases, the accounting variables Count and RowSpan are
/// updated WHERE:
/// 	node:	node to be inserted
/// 	rowIdx:	row in drag matrix where insert is to happen
/// 	colIdx:	col in drag list where insert is to happen
ZLM_VDP.Desktop.prototype.insertListNode = function(node, rowIdx, colIdx) {
	var row = null;
	var matLen = this.matrix.length;
	if (rowIdx<0) {
		row = new Array();
		row[0]=node;
		this.insertRow(row,0);
	}
	else if (rowIdx>=matLen) {
		row = new Array();
		row[0]=node;
		this.matrix[matLen]=row;
		this.span[matLen] = this.getMaxVerticalSpan(matLen)+this.mgr.vGap;
	}
	else {
		row = this.matrix[rowIdx];
		var rowLen = row.length;
		for (var i=rowLen;i>colIdx;i--) {
			row[i]=row[i-1];
		}
		row[colIdx]=node;
		this.span[rowIdx] = this.getMaxVerticalSpan(rowIdx)+this.mgr.vGap;
	}
	this.count++;
}

/// Insert the given node into the Matrix based on the node's
/// initial offset Top & Left values and the current contents
/// of the desktop Matrix.
ZLM_VDP.Desktop.prototype.insertMatrixNode=function(node) {
	var targetY = node.offsetTop;
	if (this.matrix==null || this.count==0) {
		this.matrix = [];
		var row = [];
		this.matrix[0] = row;
		row[0] = node;
		this.count=1;
		this.span = [];
		this.span[0]=node.offsetHeight;
	}
	else if (targetY< this.topMargin) {
		this.insertListNode(node, -1, 0);
	}
	else {
		var len = this.matrix.length;
		var foundRow = 0;
		var i = 0;
		while (i<len && foundRow==0) {
			var top = this.getVerticalOffset(i);
			var bottom = top+this.span[i];
			if (targetY>=top && targetY<bottom) {
				foundRow = 1;
				var colIdx = this.getRowInsertionIndex(this.matrix[i],node.offsetLeft);
				this.insertListNode(node,i,colIdx);
			}
			i++;
		}
		if (foundRow!=1) {
			this.insertListNode(node,len,0);
		}
	}
}

//==========================//
//  NODE DELETION ROUTINES  //
//==========================//

/// Extract the given node from the given row of the matrix and
/// collaspe the list around the hole to preserve visual integrity
///   rowIdx: index of the row from which the node is to be removed
///   node: the target node
ZLM_VDP.Desktop.prototype.deleteRowNode=function(rowIdx, node) {
	var row = this.matrix[rowIdx];
	var advance = 0;
	var len = row.length;
	if (len==1) { // toast the whole row
		this.deleteRow(rowIdx);
		return;
	}
	for (var i=0;i<len;i++) {
		if (row[i]==node) advance=1;
		else if (advance==1) row[i-1]=row[i];
	}
	row.pop();
	this.count--;
}

/// Delete an entire (hopefully blank) row of the matrix and move
/// all remaining rows up by 1.  To keep the Span array in sync,
/// move its elements up as well then free the defined space for
/// both the array and the matrix to reflect the new extents
ZLM_VDP.Desktop.prototype.deleteRow=function(rowIdx) {
	var advance = 0;
	var m = this.matrix;
	var s = this.span;
	var len = m.length;
	for (var i=0;i<len;i++) {
		if (i==rowIdx) advance=1;
		else if (advance==1) {
			m[i-1]= m[i];
			s[i-1]= s[i];
		}
	}
	m.pop();
	s.pop();
}

/// Extract the given node from the DragMatrix and target it
/// for deletion.
ZLM_VDP.Desktop.prototype.deleteNode=function(node) {
	var rowIdx = this.getElementRowIndex(node);
	if (rowIdx>=0) this.deleteRowNode(rowIdx,node);
}

/// Extract the given node from the DragMatrix and swap it with
/// a ghost place holder
ZLM_VDP.Desktop.prototype.ghostNode=function(node) {
	var rowIdx = this.getElementRowIndex(node);
	if (rowIdx<0) return;
	var row = this.matrix[rowIdx];
	for (var i=0;i<row.length;i++) {
		if (row[i]==node) {
			this.createGhost(node);
			this.mgr.root.appendChild(this.ghost);
			row[i]=this.ghost;
			return;
		}
	}
}

/// Extract the ghost from the DragMatrix and swap it with the
/// given node
ZLM_VDP.Desktop.prototype.manefestNode=function(node) {
	if (this.ghost==null) return;
	var row = this.matrix[this.ghost.homeRow];
	row[this.ghost.homeCol]=node;
	node.style.top = this.ghost.offsetTop+"px";
	node.style.left = this.ghost.offsetLeft+"px";
	this.mgr.root.removeChild(this.ghost);
	this.ghost=null;
}

//====================//
//  LAYOUT FUNCTIONS  //
//====================//

/// Resize a given dragGroup to the given width
ZLM_VDP.Desktop.prototype.setMiniWindowWidth=function(win,width) {
	if (win.offsetWidth==width) return;
	ZLM.setOffsetWidth(win,width);
	if (win!=this.ghost) {
		if (win.zenObj) {
			win.zenObj.adjustHandleWidth();
			win.zenObj.adjustResizeBox();
			if (win.zenObj.onresizeHandler) win.zenObj.onresizeHandler();
		}
		ZLM.notifyResize(win);
	}
}

/// Resize a given dragGroup to the given height
ZLM_VDP.Desktop.prototype.setMiniWindowHeight=function(win,height) {
	if (win.offsetHeight==height) return;
	ZLM.setOffsetHeight(win,height);
	if (win!=this.ghost) {
		if (win.zenObj) {
			win.zenObj.adjustResizeBox();
			win.zenObj.adjustChildArea();
			if (win.zenObj.onresizeHandler) win.zenObj.onresizeHandler();
		}
		ZLM.notifyResize(win);
	}
}

/// Check layout styles and return the intended width for the given
/// column. Since some layout styles are row specific, the index of
/// the row being formatted is also required to perform these
/// calculations.  NOTE: the proposed width included in this
/// calculation includes space for individual element margins,
/// borders, and padding but DOES NOT include space for the gutter
/// between columns
ZLM_VDP.Desktop.prototype.getColumnWidth=function(rowIdx, colIdx) {
	if (this.mgr.colSpan==ZLM_VDP.layoutConst.MATCH) {
		return(this.getMaxColumnSpan(colIdx));
	}
	if (this.mgr.colSpan==ZLM_VDP.layoutConst.UNIFORM) {
		return(this.getMaxNodeWidth());
	}
	if (this.mgr.colSpan==ZLM_VDP.layoutConst.SPREAD) {
		var row = this.matrix[rowIdx];
		var space = this.getMaxHorizontalSpan()-this.getHorizontalSpan(rowIdx);
		var slice = space/row.length;
		var icing = space%row.length;
		if (colIdx<icing) slice++;
		return(row[colIdx].prefWidth+slice);
	}
	// else assume RAW mode
	var row = this.matrix[rowIdx];
	return(row[colIdx].prefWidth);
}

/// For each row of the DragMatrix, adjust the widths of each element
/// on the given row to acommodate the desired column layout
/// currently in effect and position each element to allow for the
/// creation of distinct gutters betwen the elements
ZLM_VDP.Desktop.prototype.repackColumns=function() {
	var maxWidth = this.getMaxHorizontalSpan();
	for (var rowIdx=0;rowIdx< this.matrix.length;rowIdx++) {
		var row = this.matrix[rowIdx];
		var colMargin = this.leftMargin;
		for (var colIdx=0;colIdx<row.length;colIdx++) {
			var colWidth = this.getColumnWidth(rowIdx,colIdx);  // subtract off element edge space
			if ( this.mgr.colFill==ZLM_VDP.layoutConst.FILL) {
				row[colIdx].style.left = colMargin+"px";
				this.setMiniWindowWidth(row[colIdx],colWidth);
			}
			else {
				if (this.mgr.colAlign==ZLM_VDP.layoutConst.RIGHT)
					row[colIdx].style.left = (colMargin+colWidth-row[colIdx].prefWidth)+"px";
				else if (this.mgr.colAlign==ZLM_VDP.layoutConst.CENTER)
					row[colIdx].style.left = ((colMargin+(colWidth-row[colIdx].prefWidth)/2))+"px";
				else
					row[colIdx].style.left = colMargin+"px";
			}
			colMargin += colWidth+this.mgr.hGap;
		}
	}
}

/// RepackRow packs the list taking into account the fill and
/// alignment requests that apply to this row
ZLM_VDP.Desktop.prototype.repackRow=function(rowIdx) {
	var verticalPad = 0;
	var rowHeight = 0;
	var nodeHeight = 0;
	var nodeY = 0;

	var row = this.matrix[rowIdx];
	var len = row.length;
	var x = this.leftMargin;
	var y = this.getVerticalOffset(rowIdx);
	if (this.mgr.rowSpan==ZLM_VDP.layoutConst.MATCH) {
		rowHeight = this.getMaxVerticalSpan(rowIdx);
	}
	else {
		rowHeight = this.getMaxNodeHeight();
	}
	for (var i=0;i<len;i++) {
		// set the node height (padding as needed if fill requested)
		if (this.mgr.rowFill==ZLM_VDP.layoutConst.FILL && row[i].compressed!=1) {
			this.setMiniWindowHeight(row[i],rowHeight);
			nodeHeight = rowHeight;
		}
		else {
			nodeHeight = row[i].prefHeight;
			this.setMiniWindowHeight(row[i],row[i].prefHeight);
		}
		// set vertical alignment padding
		if ( this.mgr.rowAlign == ZLM_VDP.layoutConst.BOTTOM) nodeY = y+(rowHeight-nodeHeight);
		else if ( this.mgr.rowAlign == ZLM_VDP.layoutConst.CENTER) nodeY = y+(rowHeight-nodeHeight)/2;
		else nodeY = y;

		row[i].style.top = nodeY+"px";

		// column alignment issues are handled elsewhere, for now set the horizontal
		// parameters as if the column style were set to (none)
		row[i].style.left = x+"px";
		this.setMiniWindowWidth(row[i],row[i].prefWidth);

		// flatten the layers
		row[i].style.zIndex = 0;
		x = x+row[i].prefWidth + this.mgr.hGap;
	}
}

/// Scan the list of active children to see if any of the dragGroups
/// have been maximized.  If so, return the index of the child.
/// Otherwise return -1.
ZLM_VDP.Desktop.prototype.getMaxedChild = function() {
	var k = this.kidList;
	var l = k.length;
	for (var i=0;i<l;i++) {
		if (k[i].maximized==1) return(i);
	}
	return(-1);
}

/// Repack the matrix to maintain the upper-left-biased packed grid
/// layout of the page. This may involve removing blank rows as well
/// as adding new first or last rows.  All elements within a column
/// must gravitate leftward in the case of deletion and bump to the
/// right in the case of insertion.  Within each row,column
/// location, each element must be stretched or aligned to satisfy
/// the constraints currently in place by the layout settings
ZLM_VDP.Desktop.prototype.repackMatrix= function() {
	if (!this.verifySynch()) {
		//ZLM.cerr("SYNCH ERROR");
		this.resetController();
	}

	var maxKid = this.getMaxedChild();
	if (maxKid>=0) {
		this.kidList[maxKid].zIndex=this.kidList.length;
		return;
	}
	var len = this.matrix.length;
	var rowHeight = this.getMaxNodeHeight();
	for(var i=0;i<len;i++) {
		if (this.mgr.rowSpan==ZLM_VDP.layoutConst.MATCH) rowHeight = this.getMaxVerticalSpan(i);
		if (rowHeight==0) { // delete this row
			this.deleteRow(i);
			len = this.matrix.length;
			i--;
		}
		else {
			this.span[i]=rowHeight+this.mgr.vGap;
			this.repackRow(i);
		}
	}
	if (this.mgr.colSpan!=ZLM_VDP.layoutConst.RAW) this.repackColumns();
}

//===========================//
// DRAG-DROP LAYOUT SUPPORT  //
//===========================//

ZLM_VDP.Desktop.prototype.constrainX=function(wrapper, newX) {
	// let X pass, deal with constraints under Y
	return(newX);
}

ZLM_VDP.Desktop.prototype.constrainY=function(wrapper, newY) {
	var point = this.getMatrixInsertionPoint(wrapper.node);
	// point now holds the expected drop location of the
	// object in hand but the system treats the ghost as if
	// it were a real object being bumped out of place by
	// the insertion rather than being replaced entirely.
	// To correct for this, the system needs to know when
	// to ignore the new location, and when to move the
	// ghost.  In short, if the row changes, the ghost must
	// move. If we stay on the same row, we can ignore the
	// new position info if it would either bump the ghost's
	// current location or inserts us immediately _after_
	// the ghost (ghost bumped us).  Otherwise the ghost
	// should move.
	var g = this.ghost;
	if (point.row!=g.homeRow) {
		this.deleteNode(g);
		g.style.left = wrapper.node.offsetLeft+"px";
		g.style.top = wrapper.node.offsetTop+"px";
		this.insertMatrixNode(g);
		this.repackMatrix();
		g.homeRow = this.getElementRowIndex(g);
		g.homeCol = this.getElementColIndex(g.homeRow,g);
	}
	else {
		if (point.col!=g.homeCol+1 && point.col!=g.homeCol) {
			this.deleteNode(g);
			g.style.left = wrapper.node.offsetLeft+"px";
			g.style.top = wrapper.node.offsetTop+"px";
			this.insertMatrixNode(g);
			this.repackMatrix();
			g.homeCol = this.getElementColIndex(g.homeRow,g);
		}
	}
	return(newY);
}

ZLM_VDP.Desktop.prototype.bringToFront=function(node) {
 	node.style.zIndex=this.kidList.length;
}

/// Pull the given node to the visual foreground, remove it from
/// the DragMatrix (effectively making it the "Object-in-hand")
/// and compact the matrix to snap all remaining drag members as
/// far top-left as possible
ZLM_VDP.Desktop.prototype.ghostItem=function(node) {
	this.showCoverPlate();
	this.bringToFront(node)
	this.ghostNode(node);
	this.repackMatrix();
}

/// End-of-drag operation, given the approximate location for the
/// object-in-hand (embedded in object) Fit the object back into
/// the drag matrix and rebalance the layout
ZLM_VDP.Desktop.prototype.unghostItem=function(node) {
	this.hideCoverPlate();
	this.manefestNode(node);
	this.repackMatrix();
}

/// Pull the given node to the visual foreground, remove it from
/// the DragMatrix (effectively making it the "Object-in-hand")
/// and compact the matrix to snap all remaining drag members as
/// far top-left as possible
ZLM_VDP.Desktop.prototype.extractItem=function(node,xferToHand) {
	if (xferToHand==true) this.bringToFront(node);
	this.deleteNode(node);
	this.killActiveKid(node);
	this.repackMatrix();
}

/// End-of-drag operation, given the approximate location for the
/// object-in-hand (embedded in object) Fit the object back into
/// the drag matrix and rebalance the layout
ZLM_VDP.Desktop.prototype.insertItem=function(DOMItem,xferFromHand) {
	this.mgr.root.appendChild(DOMItem);
	var initX = DOMItem.offsetLeft-1;
	var initY = DOMItem.offsetTop-1;
	var wrapper = registerNewObjectInHand(DOMItem,initX,initY,this.mgr);
	this.addActiveKid(DOMItem);
	this.insertMatrixNode(DOMItem);
	this.ghostItem(DOMItem);
}
