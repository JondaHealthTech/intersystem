/*
	zenCorkboard.js
	ZEN JavaScript virtual corkboard client-side geometry management plug-in methods
	Copyright (c) 2008 InterSystems Corp. ALL RIGHTS RESERVED.
        Local JS Namespace: ZLM_VCB
*/

var ZLM_VCB = {};

/// Class name reserved for miniwindows within the corkboard group
ZLM_VCB.subwindowClass = "dragGroup";

/// Spacing constants for the group
ZLM_VCB.topMargin = 10;
ZLM_VCB.leftMargin = 10;

//============================//
//  INITIALIZATION FUNCTIONS  //
//============================//

ZLM_VCB.initCorkboard=function(mgr) {
  var workhorse = new ZLM_VCB.Corkboard(mgr);
  mgr.engine = workhorse;
  mgr.layoutBlock    = ZLM_VCB.layoutBlock;
  mgr.extractItem    = ZLM_VCB.extract;
  mgr.insertItem     = ZLM_VCB.insert;
  mgr.startDrag      = ZLM_VCB.startDrag;
  mgr.constrainDragX = ZLM_VCB.constrainDragX;
  mgr.constrainDragY = ZLM_VCB.constrainDragY;
  mgr.endDrag        = ZLM_VCB.endDrag;
  mgr.closePane      = ZLM_VCB.closePane;
}


//=========================================//
// CLIENT-SIDE LAYOUT MANAGER ENTRY POINTS //
//=========================================//

  /// Public entry point to request that the area under the 
  /// control of this manager is refreshed.
  ZLM_VCB.layoutBlock = function(engine) { 
    engine.layoutBlock();
  }

  /// Public entry point allowing the local layout manager to 
  /// to restrict horizontal movement during a drag
  ZLM_VCB.constrainDragX = function(engine, wrapper, newX) {
    return(engine.constrainX(wrapper, newX));
  }

  /// Public entry point allowing the local layout manager to 
  /// to restrict vertical movement during a drag
  ZLM_VCB.constrainDragY = function(engine, wrapper, newY) {
    return(engine.constrainY(wrapper, newY));
  }

  /// Public entry point for a callback to the local layout 
  /// manager in the event of a user initiated drag operation
  ZLM_VCB.startDrag = function(engine, wrapper) {
	var z=wrapper.node.zenObj;
	if (z && z.onGrabHandler) z.onGrabHandler();
	engine.bringToFront(wrapper.node);
  }

  /// Public entry point for a callback to the local layout 
  /// manager in the event of a completed drag operation
  ZLM_VCB.endDrag = function(engine, wrapper) { }

  /// Public entry point to programmatically remove the DOM
  /// projection of a DragGroup from the current managed group.
  /// If xferToHand is true, the DOM subtree should not be deleted,
  /// but rather it should be removed and transfered to the 
  /// object-in-hand dragging buffer
  ZLM_VCB.extract = function(engine, item, xferToHand) {
    engine.extractItem(item, xferToHand);
  }

  /// Public entry point to programmatically add a new DOM 
  /// projection of a DragGroup to the managed group.  If
  /// xferFromHand is true, the subtree is the in the object-in-hand
  /// dragging buffer and its initial position should be set as a 
  /// function of the pointer location
  ZLM_VCB.insert = function(engine, item, xferFromHand) {
    engine.insertItem(item, xferFromHand);
  }


//=================================//
// DRAG_GROUP MANAGEMENT CALLBACKS //
//=================================//

  /// Callback to close a subwindow and remove it's DOM subtree from the managed group
  ZLM_VCB.closePane=function(dragDOMPane) {
    var wrapper = ZLM.getWrapper(dragDOMPane);
    var mgr = wrapper.manager;
    mgr.extractItem(mgr.engine,dragDOMPane,false);
    dragDOMPane.parentNode.removeChild(dragDOMPane);
    ZLM.refreshLayout();
  }

//===============//
// HELPER CLASS  //
//===============//

/// Create a new instance of a Corkboard manager
ZLM_VCB.Corkboard=function(publicMgr) {
	this.mgr = publicMgr;
	this.count = 0;
   
	this.mgr.root.style.position="absolute";
	if (this.mgr.root.parentNode.clientHeight<2) {
		if (window.getComputedStyle){
			var css=window.getComputedStyle(this.mgr.root,null);
			var bw=parseInt(css.borderBottomWidth)+parseInt(css.borderTopWidth);
		}
		else var bw=0;
		var h=document.body.clientHeight-bw;
		this.mgr.root.parentNode.style.height=h;
	}
	this.sizeContainer();
	this.seatContainer();
	this.prepareList(this.mgr.root);
	this.mgr.root.engine = this;
	ZLM.setLocalAttribute(this.mgr.root,"onresize","this.engine.resize();");

	//WALLPAPER
	var node=this.mgr.root;
	var wppr = ZLM.simulateTag("div class='corkboardWallpaper' style='position:relative;top:0px;left:0px;width:100%;height:100%;'");
	node.insertBefore(wppr,node.firstChild);
	node.wallpaper = wppr;
}

/// return the HTML div that serves as the backdrop for the snapgroup
ZLM_VCB.Corkboard.prototype.getWallpaperDiv = function() 
{
	return(this.mgr.root.wallpaper);
}

/// Correct layout in the event that the corkboard's container is resized
ZLM_VCB.Corkboard.prototype.resize = function() {
	if (arguments && arguments.callee && arguments.callee.caller) {
		if (arguments.callee.caller.toString().indexOf("function anonymous")==0) return;
	}
	this.sizeContainer();
	var pos = ZLM.getComputedNodeStyle(this.mgr.root,'position');
	if (pos=='absolute') this.seatContainer();
}

/// Adjust the size of the corkboard area to conform to the size of its inline container
ZLM_VCB.Corkboard.prototype.sizeContainer = function() {
  var w = this.mgr.root.parentNode.clientWidth;
  var h = this.mgr.root.parentNode.clientHeight;
  ZLM.setOffsetWidth(this.mgr.root,w);
  ZLM.setOffsetHeight(this.mgr.root,h);
}

/// Adjust the position of the corkboard are to sit on top of its inline container
ZLM_VCB.Corkboard.prototype.seatContainer = function() {
  this.mgr.root.style.top=ZLM.getAbsoluteOffsetTop(this.mgr.root.parentNode);
  this.mgr.root.style.left=ZLM.getAbsoluteOffsetLeft(this.mgr.root.parentNode);
}

/// Create the master list of drag-able elements after the initial load 
/// of the page.  This list is then packed into the drag matrix using the 
/// initial absolute position parameters as a guideline.  This call adds 
/// the attribute kidList to the Corkboard object.
ZLM_VCB.Corkboard.prototype.prepareList = function() {
   this.kidList = ZLM.getElementsByClassPrefix(ZLM_VCB.subwindowClass,this.mgr.root,2);
   for (var i=0;i<this.kidList.length;i++) {
     this.kidList[i].layoutMgr = this.mgr;
     this.kidList[i].layoutEngine = this;
     ZLM.registerDragItem(this.kidList[i],this.mgr);
   }
}

/// Globally set the display attribute for all child nodes.  This is useful
/// for hiding a panel full of subwindows whe one of them is maximized.
ZLM_VCB.Corkboard.prototype.setKidsDisplay = function(setting) {
	for (var i=0;i<this.kidList.length;i++) {
		this.kidList[i].style.display=setting;
	}
}

/// Add a given node to the list of active children.  If the node is already
/// on the list, abort without error.
ZLM_VCB.Corkboard.prototype.addActiveKid = function(node) {
  // check for duplicate entries
  for (var i=0;i<this.kidList.length;i++) {
    if (this.kidList[i]==node) return;
  }
  this.kidList[i]=node;
}

/// Remove a given node from the list of active children.  If the node
/// was not in the list to begin with, abort without error.
ZLM_VCB.Corkboard.prototype.killActiveKid = function(node) {
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

//==========================//
//  GLOBAL QUERY FUNCTIONS  //
//==========================//

/// Report relevant state info for debugging purposes
ZLM_VCB.Corkboard.prototype.snapshot = function() {
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
/// maximized to the full size of the corkboard.  If so, return 
/// the index of the maximized child.  If not, return -1.
ZLM_VCB.Corkboard.prototype.getMaxedChild = function() {
  for (var i=0;i<this.kidList.length;i++) {
    if (this.kidList[i].maximized==1) return(i);
  }
  return(-1);
}

/// Refresh the layout of the corkboard area
ZLM_VCB.Corkboard.prototype.layoutBlock = function() {
  var maxKid = this.getMaxedChild();
  if (maxKid>=0) {
    this.kidList[maxKid].zIndex=this.kidList.length;
    ZLM.setOffsetHeight(this.kidList[maxKid],this.kidList[maxKid].prefHeight);
    ZLM.setOffsetWidth(this.kidList[maxKid],this.kidList[maxKid].prefWidth);
    return;
  }
  for (var i=0;i<this.kidList.length;i++) {
    this.kidList[i].zIndex=i;
    ZLM.setOffsetHeight(this.kidList[i],this.kidList[i].prefHeight);
    ZLM.setOffsetWidth(this.kidList[i],this.kidList[i].prefWidth);    
  }
}

//===========================//
// DRAG-DROP LAYOUT SUPPORT  //
//===========================//

/// Restrict horizontal drag motion to the corkboard area
ZLM_VCB.Corkboard.prototype.constrainX=function(wrapper, newX) {
  if (newX<0) newX=0;
  return(newX);
}

/// Restrict vertical drag motion to the corkboard area
ZLM_VCB.Corkboard.prototype.constrainY=function(wrapper, newY) {
  if (newY<0) newY=0;
  return(newY);
}

/// Reorder the active child list to alter the painting
/// order such that the given node appears to be 'on top'
ZLM_VCB.Corkboard.prototype.bringToFront=function(node) {
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
}

/// Pull the given node to the visual foreground, remove it from the 
/// list of active children and refresh the display
ZLM_VCB.Corkboard.prototype.extractItem=function(node,xferToHand) {
    if (xferToHand==true) this.bringToFront(node);
    this.killActiveKid(node);
}

/// Given the desired location for the object-in-hand (embedded in DOMItem)
/// Fit the object back into the drag matrix and rebalance the layout
/// THIS FUNCTION NOT YET TESTED - DO NOT USE IT! -SAM
ZLM_VCB.Corkboard.prototype.insertItem=function(DOMItem,xferFromHand) {
  this.mgr.root.appendChild(DOMItem);
  var initX = DOMItem.offsetLeft-1;
  var initY = DOMItem.offsetTop-1;
  var wrapper = registerNewObjectInHand(DOMItem,initX,initY,this.mgr);
  this.addActiveKid(DOMItem);
// ***** WHAT DO I DO IF THE OBJECT ISN"T THE OBJECT IN HAND???
}
