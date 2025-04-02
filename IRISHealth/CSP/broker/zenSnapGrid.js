/*
	zenSnapGrid.js
	ZEN JavaScript snap-to-grid client-side geometry management plug-in methods
	Copyright (c) 2014 InterSystems Corp. ALL RIGHTS RESERVED.
        Local JS Namespace: ZLM_VSG
*/

var ZLM_VSG = {};

/// Class name reserved for miniwindows within the snapGrid group
ZLM_VSG.subwindowClass = "dragGroup";

/// Spacing constants for the group
ZLM_VSG.topMargin = 10;
ZLM_VSG.leftMargin = 10;

//============================//
//  INITIALIZATION FUNCTIONS  //
//============================//

ZLM_VSG.initSnapGrid=function(mgr) {
	var workhorse = new ZLM_VSG.SnapGrid(mgr);
	mgr.engine = workhorse;
	mgr.layoutBlock    = ZLM_VSG.layoutBlock;
	mgr.extractItem    = ZLM_VSG.extract;
	mgr.insertItem     = ZLM_VSG.insert;
	mgr.startDrag      = ZLM_VSG.startDrag;
	mgr.constrainDragX = ZLM_VSG.constrainDragX;
	mgr.constrainDragY = ZLM_VSG.constrainDragY;
	mgr.endDrag        = ZLM_VSG.endDrag;
	mgr.closePane      = ZLM_VSG.closePane;
	mgr.maskPeers      = ZLM_VSG.maskPeers;
}


//=========================================//
// CLIENT-SIDE LAYOUT MANAGER ENTRY POINTS //
//=========================================//

	/// Public entry point to request that the area under the 
	/// control of this manager is refreshed.
	ZLM_VSG.layoutBlock = function(engine) { 
		engine.layoutBlock();
	}

	/// Public entry point allowing the local layout manager to 
	/// to restrict horizontal movement during a drag
	ZLM_VSG.constrainDragX = function(engine, wrapper, newX) {
		return(engine.constrainX(wrapper, newX));
	}

	/// Public entry point allowing the local layout manager to 
	/// to restrict vertical movement during a drag
	ZLM_VSG.constrainDragY = function(engine, wrapper, newY) {
		return(engine.constrainY(wrapper, newY));
	}

	/// Public entry point for a callback to the local layout 
	/// manager in the event of a user initiated drag operation
	ZLM_VSG.startDrag = function(engine, wrapper) {
		var z=wrapper.node.zenObj;
		if (z && z.onGrabHandler) z.onGrabHandler();
		engine.bringToFront(wrapper.node);
	}

	/// Public entry point for a callback to the local layout 
	/// manager in the event of a completed drag operation
	ZLM_VSG.endDrag = function(engine, wrapper) { 
		engine.snapToGrid(wrapper.node);
		var z=wrapper.node.zenObj;
		if (z && z.syncObject) z.syncObject();
		if (z && z.onReleaseHandler) z.onReleaseHandler();
	}

	/// Public entry point to programmatically remove the DOM
	/// projection of a DragGroup from the current managed group.
	/// If xferToHand is true, the DOM subtree should not be deleted,
	/// but rather it should be removed and transfered to the 
	/// object-in-hand dragging buffer
	ZLM_VSG.extract = function(engine, item, xferToHand) {
		engine.extractItem(item, xferToHand);
	}

	/// Public entry point to programmatically add a new DOM 
	/// projection of a DragGroup to the managed group.  If
	/// xferFromHand is true, the subtree is the in the object-in-hand
	/// dragging buffer and its initial position should be set as a 
	/// function of the pointer location
	ZLM_VSG.insert = function(engine, item, xferFromHand) {
		engine.insertItem(item, xferFromHand);
	}

	/// Public entry point to programmatically activate (or deactivate)
	/// the coverplates on all open drag windows (useful for speeding up 
	/// drag operations
	ZLM_VSG.maskPeers = function(engine, flag, skipNode) {
		engine.maskPeers(flag,skipNode);
	}

//=================================//
// DRAG_GROUP MANAGEMENT CALLBACKS //
//=================================//

	/// Callback to close a subwindow and remove it's DOM subtree from the managed group
	ZLM_VSG.closePane=function(dragDOMPane) {
		var wrapper = ZLM.getWrapper(dragDOMPane);
		var mgr = wrapper.manager;
		mgr.extractItem(mgr.engine,dragDOMPane,false);
		dragDOMPane.parentNode.removeChild(dragDOMPane);
		ZLM.refreshLayout();
	}

//===============//
// HELPER CLASS  //
//===============//

/// Create a new instance of a SnapGrid manager
ZLM_VSG.SnapGrid=function(publicMgr) {
	// Internal properites of the layout manager include:
	//  orientation:	portrait or landscape
	//  colLandscape:	number of cols in landscape layout
	//  colWLandscape:	width a a single column in landscape mode
	//  colPortrait:	number of cols in portrait layout
	//  colWPortrait:	width a a single column in portrait mode
	//  rowLandscape:	number of rows in landscape layout
	//  rowWLandscape:	width a a single row in landscape mode
	//  rowPortrait:	number of rows in portrait layout
	//  rowWPortrait:	width a a single row in portrait mode
	//  layoutMode:		static or dynamic
	//  layoutP:		static layout in portrait
	//  layoutL:		static layout in landscape
	this.mgr = publicMgr;
	this.count = 0;
   
	var node = this.mgr.root; // shorthand to speed things up
	if (node.parentNode.offsetHeight<2) {
		var bw = 0;
		if (window.getComputedStyle){
			var css=window.getComputedStyle(node,null);
			if (css) bw=parseInt(css.borderBottomWidth)+parseInt(css.borderTopWidth);
		}
		var h=document.body.offsetHeight-bw;
		this.mgr.root.parentNode.style.height=h;
	}
	node.style.width="100%";
	node.style.height="100%";
	this.layoutP = [];
	this.layoutL = [];
	this.prepareList(node);
	
	var c = node.getAttribute("cols");
	if (c) this.setNumberOfColumns(c);
	else this.setNumberOfColumns(4);
	var c = node.getAttribute("colsPortrait");
	if (c) this.setNumberOfColumnsPortrait(c);
	var c = node.getAttribute("colsLandscape");
	if (c) this.setNumberOfColumnsLandscape(c);
	
	var r = node.getAttribute("rows");
	if (r) this.setNumberOfRows(r);
	else this.setNumberOfRows(4);
	var r = node.getAttribute("rowsPortrait");
	if (r) this.setNumberOfRowsPortrait(r);
	var r = node.getAttribute("rowsLandscape");
	if (r) this.setNumberOfRowsLandscape(r);

	this.mgr.root.engine = this;
	this.initialized = true;
	this.resize();
	ZLM.setLocalAttribute(node,"onresize","this.engine.resize();");

	var wppr = ZLM.simulateTag("div class='snapGridWallpaper' style='position:relative;top:0px;left:0px;width:100%;height:100%;'");
	node.insertBefore(wppr,node.firstChild);
	node.wallpaper = wppr;
}

/// Set the master number of columns for both landscape and portrait mode
ZLM_VSG.SnapGrid.prototype.setNumberOfColumns = function(n) {
	n = parseInt(n,10);
	this.setNumberOfColumnsPortrait(n);
	this.setNumberOfColumnsLandscape(n);
}

/// Set the master number of columns for portrait mode
ZLM_VSG.SnapGrid.prototype.setNumberOfColumnsPortrait = function(n) {
	if (n>0) {
		this.colPortrait = n;
		if (this.initialized) this.resize();
	}	
}

/// Set the master number of columns for landscape mode
ZLM_VSG.SnapGrid.prototype.setNumberOfColumnsLandscape = function(n) {
	if (n>0) {
		this.colLandscape = n;
		if (this.initialized) this.resize();
	}
}

/// Set the master number of rows for both landscape and portrait mode
ZLM_VSG.SnapGrid.prototype.setNumberOfRows = function(n) {
	n = parseInt(n,10);
	this.setNumberOfRowsPortrait(n);
	this.setNumberOfRowsLandscape(n);
}

/// Set the master number of rows for portrait mode
ZLM_VSG.SnapGrid.prototype.setNumberOfRowsPortrait = function(n) {
	if (n>0) {
		this.rowPortrait = n;
		if (this.initialized) this.resize();
	}
}

/// Set the master number of rows for landscape mode
ZLM_VSG.SnapGrid.prototype.setNumberOfRowsLandscape = function(n) {
	if (n>0) {
		this.rowLandscape = n;
		if (this.initialized) this.resize();
	}
}

/// Correct layout in the event that the snapGrid's container is resized
ZLM_VSG.SnapGrid.prototype.resize = function() {
	if (arguments && arguments.callee && arguments.callee.caller) {
		if (arguments.callee.caller.toString().indexOf("function anonymous")==0) return;
	}
	var node = this.mgr.root;
	var w = node.offsetWidth;
	var h = node.offsetHeight;

	this.rowWPortrait = h/this.rowPortrait;
	this.colWPortrait = w/this.colPortrait;
	this.rowWLandscape = h/this.rowLandscape;
	this.colWLandscape = w/this.colLandscape;

	if (w>=h) this.orientation = "landscape";
	else this.orientation = "portrait";
	this.correctGeometry();
}

/// In the event of a resize, window operation or orientation change, correct 
/// the placement and size of all child drag groups
ZLM_VSG.SnapGrid.prototype.correctGeometry = function() 
{
	var list = this.layoutL;
	var c = this.colWLandscape;
	var r = this.rowWLandscape;
	if (this.orientation == "portrait") {
		list = this.layoutP;
		c = this.colWPortrait;
		r = this.rowWPortrait;
	}
	var l = list.length;
	for (var i=0;i<l;i++) {
		var o = list[i];
		if (o.show) {
			var newW = o.width*c;
			var newH = o.height*r;
			this.setWindowGeometry(o.win,o.top*r,o.left*c,newW,newH);
			if (o.zen) o.zen.resize(newW,newH);
			if (o.zen && o.zen.syncObject) o.zen.syncObject();

		}
	}

}

/// return the HTML div that serves as the backdrop for the snapgroup
ZLM_VSG.SnapGrid.prototype.getWallpaperDiv = function() 
{
	return(this.mgr.root.wallpaper);
}

/// Set the location and place of the given window (in pixels)
ZLM_VSG.SnapGrid.prototype.setWindowGeometry = function(w, top, left, width, height)
{
	w.style.top = top+"px";
	w.style.left = left+"px";
	ZLM.setOffsetWidth(w,width);
	ZLM.setOffsetHeight(w,height);
	w.prefWidth = width;
	w.prefHeight = height;
}

/// Check the projected DIV of the snapGrid for a given attribute (in several places)
/// if we come up empty, return the given default
ZLM_VSG.SnapGrid.prototype.getIntegerAttr = function(div, attrName, dft)
{
	var a = div[attrName];
	if (!a) a = div.getAttribute(attrName);
	if (!a && zenPage) {
		var zNum = div.getAttribute("zen");
		if (zNum) {
			var zObj = zenPage.getComponent(zNum);
			var a = zObj[attrName];
		}
	}
	if (a) a = parseInt(a,10);
	if (a=="NaN") a = dft;
	return(a);
}

/// Create the master list of drag-able elements after the initial load 
/// of the page.  This list is then packed into the drag matrix using the 
/// initial absolute position parameters as a guideline.  This call adds 
/// the attribute kidList to the SnapGrid object.
ZLM_VSG.SnapGrid.prototype.prepareList = function() {
	this.kidList = ZLM.getElementsByClassPrefix(ZLM_VSG.subwindowClass,this.mgr.root,2);
	for (var i=0;i<this.kidList.length;i++) {
		var k = this.kidList[i];
		k.layoutMgr = this.mgr;
		k.layoutEngine = this;
		var o={};
		o.winID = k.id;
		o.win = k;
		o.show = true;
		o.top = this.getIntegerAttr(k,"homeRow",0);
		o.left = this.getIntegerAttr(k,"homeCol",0);
		o.width = this.getIntegerAttr(k,"colSpan",1);
		o.height = this.getIntegerAttr(k,"rowSpan",1);
		o.zenNum = this.getIntegerAttr(k,"zen",-1);
		if (o.zenNum) {
			o.zen = zenPage.getComponent(o.zenNum);
			k.zenObj = o.zen;
		}
		this.layoutP.push(o);
		var oL = ZLM.cloneJSObj(o);
		this.layoutL.push(oL);
		k.oRefP = o;
		k.oRefL = oL;
		ZLM.registerDragItem(this.kidList[i],this.mgr);
	}
}

/// Globally set the display attribute for all child nodes.  This is useful
/// for hiding a panel full of subwindows when one of them is maximized.
ZLM_VSG.SnapGrid.prototype.setKidsDisplay = function(setting) {
	for (var i=0;i<this.kidList.length;i++) {
		this.kidList[i].style.display=setting;
	}
}

/// Add a given node to the list of active children.  If the node is already
/// on the list, abort without error.
ZLM_VSG.SnapGrid.prototype.addActiveKid = function(node) {
	// check for duplicate entries
	for (var i=0;i<this.kidList.length;i++) {
		if (this.kidList[i]==node) return;
	}
	this.kidList[i]=node;
}

/// Remove a given node from the list of active children.  If the node
/// was not in the list to begin with, abort without error.
ZLM_VSG.SnapGrid.prototype.killActiveKid = function(node) {
	if (node.maximized==1) this.setKidsDisplay("block");
	var klLen = this.kidList.length;
	for(var i=0; i<klLen; i++) {
		if (this.kidList[i]==node) {
			for (var j=i+1;j<klLen;j++) {
				this.kidList[j-1]=this.kidList[j];
			}
			this.kidList.pop();
			i=klLen;
		}
	}  
	// Clear the missing child from the layout Prefernces
	for (var h=0;h<2;h++) {
		var lA = this.layoutP;
		if (h==1) lA = this.layoutL;
		var lALen = lA.length;
		for(var i=0; i<lALen; i++) {
			var o=lA[i];
			if (o.win==node) {
				for (var j=i+1;j<lALen;j++) {
					lA[j-1]=lA[j];
				}
				lA.pop();
				i=lALen;
			}
		}
	}  
}

//==========================//
//  GLOBAL QUERY FUNCTIONS  //
//==========================//

/// Report relevant state info for debugging purposes
ZLM_VSG.SnapGrid.prototype.snapshot = function() {
	for (var i=0;i<this.kidList.length;i++) {
		var n=this.kidList[i];
		ZLM.cerr("Node: "+n.id+" title: "+n.zenObj.header);
		ZLM.cerr(" Top: "+n.offsetTop+" Left: "+n.offsetLeft);
		ZLM.cerr(" Width: "+n.prefWidth+" Height: "+n.prefHeight+" Icon: "+n.compressed+" Full: "+n.maximized);
	}
}

//==================//
// LAYOUT UTILITIES //
//==================//

/// Scan the active child list to see if any of the children are
/// maximized to the full size of the snapGrid.  If so, return 
/// the index of the maximized child.  If not, return -1.
ZLM_VSG.SnapGrid.prototype.getMaxedChild = function() {
	for (var i=0;i<this.kidList.length;i++) {
		if (this.kidList[i].maximized==1) return(i);
	}
	return(-1);
}

/// Activate or deactivate the coverplates on all known drag group children
ZLM_VSG.SnapGrid.prototype.maskPeers=function(flag,skipNode) {
	var list = this.layoutL;
	var len = list.length;
	if (flag) {
		for (var i=0;i<len;i++) {
			var o = list[i];
			if (o.zen && o.zen!=skipNode) o.zen.enableCoverplate();
		}
	}
	else {
		for (var i=0;i<len;i++) {
			var o = list[i];
			if (o.zen) o.zen.disableCoverplate();
		}
	}
}

/// Refresh the layout of the snapGrid area
ZLM_VSG.SnapGrid.prototype.layoutBlock = function() {
	var maxKid = this.getMaxedChild();

	if (maxKid>=0) {
		this.kidList[maxKid].zIndex=this.kidList.length;
		ZLM.setOffsetHeight(this.kidList[maxKid],this.kidList[maxKid].prefHeight);
		ZLM.setOffsetWidth(this.kidList[maxKid],this.kidList[maxKid].prefWidth);
		return;
	}

	var list = this.layoutL;
	var cW = this.colWLandscape; 
	var rW = this.rowWLandscape;
	var cMax = this.colLandscape;
	var rMax = this.rowLandscape;
	if (this.orientation=='portrait') {
		list = this.layoutP;
		cW = this.colWPortrait;
		rW = this.rowWPortrait;
		cMax = this.colPortrait;
		rMax = this.rowsPortrait;
	}
	if (!cW || !rW) return; // grid not visible
	var l = list.length;
	for (var i=0;i<l;i++) {
		var o = list[i];
		if (o.show) {
			var k = o.win;
			k.style.zIndex=i;
			var nCols = Math.round(k.prefWidth/cW);
			if (nCols>cMax) nCols = cMax;
			if (nCols<1) nCols = 1;
			var pW = nCols*cW;
			k.prefWidth = pW;
			var nRows = Math.round(k.prefHeight/rW);
			if (nRows>rMax) nRows = rMax;
			if (nRows<1) nRows = 1;
			var pH = nRows*rW;
			k.prefHeight = pH;

//ZLM.cerr(k.id);
//ZLM.cerr('Width: '+k.style.width+' v '+k.prefWidth);
//ZLM.cerr('Height: '+k.style.height+' v '+k.prefHeight);

			if (k.style.height!=k.prefHeight) ZLM.setOffsetHeight(k,k.prefHeight);
			if (k.style.width!=k.prefwidth) ZLM.setOffsetWidth(k,k.prefWidth); 
			if (o.zen) {
				o.zen.adjustHandleWidth();
				o.zen.adjustChildArea();
			}
			o.width = nCols;
			o.height = nRows;
		}
	}
}

//===========================//
// DRAG-DROP LAYOUT SUPPORT  //
//===========================//

/// Restrict horizontal drag motion to the snapGrid area
ZLM_VSG.SnapGrid.prototype.constrainX=function(wrapper, newX) {
	if (newX<0) newX=0;
	return(newX);
}

/// Restrict vertical drag motion to the snapGrid area
ZLM_VSG.SnapGrid.prototype.constrainY=function(wrapper, newY) {
	if (newY<0) newY=0;
	return(newY);
}

/// Reorder the active child list to alter the painting
/// order such that the given node appears to be 'on top'
ZLM_VSG.SnapGrid.prototype.bringToFront=function(node) {
	for(var i=0; i<this.kidList.length; i++) {
		if (this.kidList[i]==node) {
			var jm1=i;
			for (var j=i+1;j<this.kidList.length;j++) {
				this.kidList[jm1]=this.kidList[j];
				this.kidList[jm1].style.zIndex=jm1;
				jm1++;
			}
			this.kidList[jm1]=node;
			i=jm1;
		}
		this.kidList[i].style.zIndex=i;
	}
	this.maskPeers(true,node);
}

ZLM_VSG.SnapGrid.prototype.snapToGrid=function(node) {
	var cW = this.colWLandscape; 
	var rW = this.rowWLandscape;
	var oRef = node.oRefL;
	if (this.orientation=='portrait') {
		cW = this.colWPortrait;
		rW = this.rowWPortrait;
		oRef = node.oRefP;
	}
	var maxH = this.mgr.root.offsetHeight-rW;
	var maxW = this.mgr.root.offsetWidth-cW;
	var top = node.offsetTop;
	var left = node.offsetLeft;

	var col = Math.round(left/cW);
	var row= Math.round(top/rW);

	var t = row*rW;
	var l = col*cW;
	if (t<0) t = 0;
	if (l<0) l = 0;
	if (t>maxH) t = maxH;
	if (l>maxW) l = maxW;
	node.style.top = t+"px";
	node.style.left = l+"px";
	this.maskPeers(false);
	oRef.top = row;
	oRef.left = col;
}

/// Pull the given node to the visual foreground, remove it from the 
/// list of active children and refresh the display
ZLM_VSG.SnapGrid.prototype.extractItem=function(node,xferToHand) {
	if (xferToHand==true) this.bringToFront(node);
	this.killActiveKid(node);
}

/// Given the desired location for the object-in-hand (embedded in DOMItem)
/// Fit the object back into the drag matrix and rebalance the layout
ZLM_VSG.SnapGrid.prototype.insertItem=function(DOMItem,xferFromHand) {
	this.mgr.root.appendChild(DOMItem);
	var initX = DOMItem.offsetLeft-1;
	var initY = DOMItem.offsetTop-1;
	var wrapper = registerNewObjectInHand(DOMItem,initX,initY,this.mgr);
	this.addActiveKid(DOMItem);
}
