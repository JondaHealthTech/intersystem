/*
	zenActiveHGroup.js
	ZEN JavaScript active HGROUP client-side geometry management plug-in methods
	Copyright (c) 2008-2013 InterSystems Corp. ALL RIGHTS RESERVED.
        Local JS Namespace: ZLM_AHG
*/

/* 
The default behavior for the active horizontal group is to fill the bounds of it's parent
container both vertically and horizontally and to grow or shrink as that space is resized.
Further, within it's own space, the ActiveHGroup splits the area into two left and right
zones that may be resized by dragging a divider bar left or right.
*/

/* 
ActiveHGroup parameters:
  split: defines the division between the two panes.  
         A value with a % sign is interpreted as a proportional division between the left 
         and right panes and is recalculated to maintain this ratio whenever the base 
         division is resized by any means.  Manual adjustment of the value continues to 
         be interpreted as a percentage split. 
         A positive value not constaining a percent sign is interpreted as a fixed reserve
         width for the left child. Any adjustments to the total width of the base container 
         are reflected in the geometry of the right pane only.
         A negative value (which cannot contain a % sign) is interpreted as a fixed width
         for the right pane.  Any adjustments to the total width of the base container are 
         reflected in the geometry of the left child
         Manual adjustment of a left or right reserved width will change the size of the 
         reserve and these fixed sizes will be respected even as the window is resized.
         the default split is "50%" 
  autoExpand: if defined, this property indicates that one of the two panels is an auto-open/
         auto-close sidebar panel and that the panel should expan when the mouse enters its
         "split"-defined bounds and grow until it reaches the width given in the autoExpand
         parameter. The value is always interpreted in pixels.  A positive value designates 
         the left pane for auto-expansion.  A negative value designates the right.
         The default value (null) indicates that the auto-expansion feature is not used by
         this instance of the widget.
  noResize: if true, this indicates that the user is not to be allowed to resize the panes.
         If false, user adjustment of the pane sizes is allowed via dragging the pane handle
         with the mouse.  If user resizing is enabled, the mouse pointer will change to an
         east-west resize cursor when the mouse is in potential drag position.
         The default value is "false"
  handleThickness: indicates the width of the pane partition handle in pixels.  Because of
         the dynamic functional nature of the element, the width of this bar cannot be set 
         via CSS and must be specified via this property.
         The default value is "7", resulting a drag handle a little under one eight of an 
         inch (2 mm) wide on most screens.
  handlePattern: indicates a file name for an image to use for painting the dragable partition
         handle.  This image should be at least as wide as the handle thickness and is repeated
         vertically allong the length of the handle.
         The default value is a PNG file of a left-highighted gray gradient, bounded by black
         on either side.
  soundFX: indicates a sound file to be played when an auto-expansion window grows or shrinks.
         If not defined or null, no sound accompanies the animation.
	 The default is "null"
*/

//####################//
// zenActiveHGroup.js //
//####################//

var ZLM_AHG = {};

//============================//
//  INITIALIZATION FUNCTIONS  //
//============================//

ZLM_AHG.initActiveHGroup=function(mgr) {
	var workhorse      = new ZLM_AHG.Group(mgr);
	mgr.engine         = workhorse;
	mgr.layoutBlock    = ZLM_AHG.layoutBlock;
	mgr.extractItem    = null;
	mgr.insertItem     = null;
	mgr.startDrag      = ZLM_AHG.startDrag;
	mgr.constrainDragX = ZLM_AHG.constrainDragX;
	mgr.constrainDragY = ZLM_AHG.constrainDragY;
	mgr.endDrag        = ZLM_AHG.endDrag;
}

//=========================================//
// CLIENT-SIDE LAYOUT MANAGER ENTRY POINTS //
//=========================================//

	/// Public entry point allowing the local layout manager to 
	/// to restrict horizontal movement during a drag
	ZLM_AHG.layoutBlock = function(engine) {
	}

	/// Public entry point allowing the local layout manager to 
	/// to restrict horizontal movement during a drag
	ZLM_AHG.constrainDragX = function(engine, wrapper, newX) {
		return(engine.constrainX(wrapper, newX));
	}

	/// Public entry point allowing the local layout manager to 
	/// to restrict vertical movement during a drag
	ZLM_AHG.constrainDragY = function(engine, wrapper, newY) {
		return(engine.constrainY(wrapper, newY));
	}

	/// Public entry point for a callback to the local layout 
	/// manager in the event of a user initiated drag operation
	ZLM_AHG.startDrag = function(engine, wrapper) {
		engine.startDrag();
	}

	/// Public entry point for a callback to the local layout 
	/// manager in the event of a completed drag operation
	ZLM_AHG.endDrag = function(engine, wrapper) { 
		engine.endDrag();
	}

//=======================================//
//  PRVIATE ANIMATION DATA AND FUNCTION  //
//=======================================//

/// Static pointer the current animation instance
ZLM_AHG.animatedDiv=null;

/// Static timer callback hook to manage the animation of instances of
/// auto-resize panes.  
ZLM_AHG.animator=function(dir) {
	if (dir=="open") ZLM_AHG.animatedDiv.animateOpen();
	else ZLM_AHG.animatedDiv.animateClose();
}

//===============//
// HELPER CLASS  //
//===============//

/// Create a new instance of a active Horizontal group manager
ZLM_AHG.Group=function(publicMgr) {
	this.mgr = publicMgr;
	this.mgr.root.engine=this;
	this.mgr.root.style.overflow="hidden";
	this.mgr.root.fill=ZLM.isTopFillElement(this.mgr.root);
	this.setResizeFlagFromDiv();
	this.setAutoExpandFromDiv();
	this.setSoundEffectFromDiv();
	this.setHandleThicknessFromDiv();

	this.initSplit();
	this.initStructure();
	this.sizeContainer();
	if (ZLM.isZen() && ZLM.isIE) ZLM.setLocalAttribute(this.mgr.root,"onresize","return(this.engine.resizeIE());");
	else ZLM.setLocalAttribute(this.mgr.root,"onresize","return(this.engine.sizeContainer());");
}

/// With Zen running under IE there is a bug where a DIV's resize handler is called multiple times
/// This doesn't happen under FF or under HTML and IE, but in any case a separate trap has to be set 
/// to prevent these extra invocations from creating an infinite recursion
ZLM_AHG.Group.prototype.resizeIE=function() {
	if (this.mgr.root!=ZLM.notifyTarget) return;
	return(this.sizeContainer());
}

/// Given a value of unknown data type, reduce it to a value of 't' for true, 'f' for false
/// or 'u' for undefined.  The rules for what reduces to what vary with the type of value
/// passed.
ZLM_AHG.Group.prototype.evalFlag=function(value) {
	if (value==undefined) return('u');
	if (value==null) return('u');
	if (value==NaN) return('u');
	if (value=="") return('u');
	if (!value) return('f');
	if (typeof(value)=="string") {
		value=value.toLowerCase();
		if (value=="false") return('f');
		if (value=="f") return('f');
		if (value=="off") return('f');
	}
	return('t');
}

/// Scan the HTML element for a "noResize" attribute and set the internal resizable flag accordingly
/// If the attribute is undefined, resizing is enabled by default
ZLM_AHG.Group.prototype.setResizeFlagFromDiv=function() {
	var resizeStr = this.mgr.root.getAttribute("noResize");
	this.setResizeFlag(resizeStr);
}

/// Set the internal resizable flag accordingly
/// If the parameter is undefined, resizing is enabled by default
/// Technically this is a NO resize flag so TRUE means disable resize
ZLM_AHG.Group.prototype.setResizeFlag=function(resizeStr) {
	var flg = this.evalFlag(resizeStr);
	if (flg=='u' || flg=='f') {
		this.resizable=true;
		if (this.handle) {
			this.handle.style.cursor="e-resize";
			ZLM.setLocalAttribute(this.handle,"onmousedown","ZLM.drag(this,event);");
		}
	}
	else {
		this.resizable=false;
		if (this.handle) {
			this.handle.style.cursor="auto";
			ZLM.setLocalAttribute(this.handle,"onmousedown","");
		}
	}
}

/// Scan the HTML element for a "handleThickness" attribute and set the internal handleSize
/// variable accordingly.  If the attribute is not specified, default the thickness to 7 pixels
ZLM_AHG.Group.prototype.setHandleThicknessFromDiv=function() {
	var thickStr = this.mgr.root.getAttribute("handleThickness");
	if (!thickStr) thickStr = "7";
	this.setHandleThickness(thickStr);
}

/// Set the internal handleSize variable accordingly.  If the attribute 
/// is not specified, default the thickness to 7 pixels
ZLM_AHG.Group.prototype.setHandleThickness=function(thickStr) {
	this.handleSize=parseInt(thickStr);
	if (isNaN(this.handleSize)||this.handleSize<0) this.handleSize=7;
}

/// Scan the HTML element for a "autoExpand" attribute and set internal flags and variables
/// accordingly.  The presence of an autoExpand attribute indicates that the avctive group
/// is to be used in a mode where rolling the mouse over a compressed pane causes the pane
/// to grow to some fixed size in pixels (as dictated by the numeric value of autoExpand 
/// attribute itself).  Leaving the expanded pane causes the pane to contract back down the 
/// geometry specified in by the "split" attribute.  Either child of the active group may be
/// enable for auto-expansion.  The sign of the value given for autoExpand designate which
/// pane to dynamically resize: positive values refer to the left child; negative values
/// refer the the right.  If the autoExpand attribute is not defined for the given instance,
/// the widget behaves normally with no roll-over expansion trigger enabled. 
ZLM_AHG.Group.prototype.setAutoExpandFromDiv=function() {
	var expandStr = this.mgr.root.getAttribute("autoExpand");
	this.setAutoExpand(expandStr);
}

/// Set auto expand internal flags and variables
/// accordingly.  The presence of an autoExpand attribute indicates that the avctive group
/// is to be used in a mode where rolling the mouse over a compressed pane causes the pane
/// to grow to some fixed size in pixels (as dictated by the numeric value of autoExpand 
/// attribute itself).  Leaving the expanded pane causes the pane to contract back down the 
/// geometry specified in by the "split" attribute.  Either child of the active group may be
/// enable for auto-expansion.  The sign of the value given for autoExpand designate which
/// pane to dynamically resize: positive values refer to the left child; negative values
/// refer the the right.  If the autoExpand attribute is not defined for the given instance,
/// the widget behaves normally with no roll-over expansion trigger enabled. 
ZLM_AHG.Group.prototype.setAutoExpand=function(expandStr) {
	// Default conditions
	this.lExpand = false;
	this.rExpand = false;
	this.expand = false;
	if (!expandStr) return;
	this.expand=parseInt(expandStr);
	if (this.expand<0) { 
		this.rExpand=true;
		this.expand=0-this.expand;
	}
	else {
		this.lExpand=true;
	}
}

/// Scan the HTML element for a "soundFX" attribute and set up internal variable and the 
/// DOM structure itself to enable sound during the animation of an autoExpand pane's opening
/// of closing.  If set, the value should be a valid sound file (i.e. "whoosh.wav").  The
/// default value is null, indication that no sound is desired.
ZLM_AHG.Group.prototype.setSoundEffectFromDiv=function () {
	var soundFXStr = this.mgr.root.getAttribute("soundFX");
	this.setSoundEffect(soundFXStr);
}

/// Set up sound effect url internal variable and the 
/// DOM structure itself to enable sound during the animation of an autoExpand pane's opening
/// of closing.  If set, the value should be a valid sound file (i.e. "whoosh.wav").  The
/// default value is null, indication that no sound is desired.
ZLM_AHG.Group.prototype.setSoundEffect=function(soundFXStr) {
	this.soundFX = null;
	if (!soundFXStr) return;
	this.soundFX="ZenAHG_"+this.mgr.id+"SoundDiv";
	ZLM.installSoundFx(this.soundFX,soundFXStr);
}

/// The structure of the ActiveHGroup consists of a root DIV (managed by the CSLM plug-in) 
/// that is an autoFill area (it expands and contracts to fill available space).  Within 
/// this area is the BaseDiv, this is the drawing area for the widget itself and has its 
/// geometry linking to 100% of the available space of the root DIV.  The baseDiv area is
/// broken into five regions: lDiv (left division - with possible content children); lLid 
/// (a coverstone for the left division that is normally hidden unless the proportions of 
/// the window are being resized); rDiv (right division - with possible content children);
/// rLid (coverstone for the right division); and, handle (the slider for reapportioning
/// the space within the baseDiv.  The function initStructure() takes the minimal 
/// specification of the root node and it two content children and restuctures the DOM such
/// that the root node has only one child (baseDiv) and its two former children become 
/// children of lDiv and rDiv.
ZLM_AHG.Group.prototype.initStructure=function() {
	if (ZLM.isZen()) {
		var p=this.mgr.root.parentNode;
		if (!ZLM.hasPresetWidth(p)) p.style.width="100%";
		if (!ZLM.hasPresetHeight(p)) p.style.height="100%";
	}
	this.baseDiv = ZLM.simulateTag("div style='position:relative; top:0; left:0; width:100%; height:100%; overflow:hidden;'");
	this.lDiv = ZLM.simulateTag("div style='position:absolute; top:0; left:0; overflow:auto;'");
	this.baseDiv.appendChild(this.lDiv);
	this.lLid = ZLM.simulateTag("div style='position:absolute; top:0; left:0; overflow:hidden; z-index:1; display:none;'");
	this.baseDiv.appendChild(this.lLid);
	this.rDiv = ZLM.simulateTag("div style='position:absolute; top:0; left:0; overflow:auto;'");
	this.baseDiv.appendChild(this.rDiv);
	this.rLid = ZLM.simulateTag("div style='position:absolute; top:0; left:0; overflow:hidden; z-index:1; display:none;'");
	this.baseDiv.appendChild(this.rLid);
	this.handle=ZLM.simulateTag("div class='zenHPaneHandle' style='position:absolute; top:0; left:0; overflow:hidden;'");
	this.baseDiv.appendChild(this.handle);

	var kidCount = 0;
	var lKids = null;
	var lKidCtrl = null;
	var rKids = null;
	var rKidCtrl = null;
	for (var k=this.mgr.root.firstChild;k!=null;k=k.nextSibling) {
		if (k.nodeType==1) {
			if (kidCount==0) {
				lKids = k;
				kidCount++;

				if (k.tagName=="SPAN") { // possibly a labelled zen control
					var idA = k.id.split("_");
					var len = idA.length;
					if (idA[0]=="zenlbl") {
						var zenNum = parseInt(idA[len-1]);
						if (k.nextSibling && parseInt(k.nextSibling.getAttribute("zen"))==zenNum) {
							k = k.nextSibling;
							lKidCtrl = k;
						}
					}
				}

			}
			else if (kidCount==1) {
				rKids = k;
				kidCount++;
				if (k.tagName=="SPAN") { // possibly a labelled zen control
					var idA = k.id.split("_");
					var len = idA.length;
					if (idA[0]=="zenlbl") {
						var zenNum = parseInt(idA[len-1]);
						if (k.nextSibling && parseInt(k.nextSibling.getAttribute("zen"))==zenNum) {
							k = k.nextSibling;
							rKidCtrl = k;
						}
					}
				}
			}
			else {
				ZLM.cerr("WARNING: Extra children (more than 2) in ActiveHGroup ignored!");
				this.mgr.root.removeChild(k);
			}
    		}
	}

	this.mgr.root.appendChild(this.baseDiv);

	if (lKids) ZLM.reparent(lKids,this.lDiv);
	if (lKidCtrl) ZLM.reparent(lKidCtrl,this.lDiv);
	if (rKids) ZLM.reparent(rKids,this.rDiv);
	if (rKidCtrl) ZLM.reparent(rKidCtrl,this.rDiv);
	if (ZLM.isIE) {
		var eKids = ZLM.getDocumentElements(null,"EMBED",this.mgr.root);
		var len = eKids.length;
		if (len>0) {
			for (var j=0;j<len;j++) {
				var eK = eKids[j];
				var clone = eK.cloneNode(true);
				eK.parentNode.replaceChild(clone,eK);
			}
		}
	}

	ZLM.registerDragItem(this.handle,this.mgr);
	if (this.resizable) {
		this.handle.style.cursor="e-resize";
		ZLM.setLocalAttribute(this.handle,"onmousedown","ZLM.drag(this,event);");
	}

	if (this.expand) {
		this.expandFrame=0;
		if (this.rExpand) {
			this.rDiv.engine=this;
			this.baseDiv.engine=this;
			ZLM.setLocalAttribute(this.rDiv,"onmouseover","this.engine.expanderCB();");
			ZLM.setLocalAttribute(this.rDiv,"onmouseout","this.engine.shrinkerCB(event);");
		}
		else {
			this.lDiv.engine=this;
			this.baseDiv.engine=this;
			ZLM.setLocalAttribute(this.lDiv,"onmouseover","this.engine.expanderCB();");
			ZLM.setLocalAttribute(this.lDiv,"onmouseout","this.engine.shrinkerCB(event);");
		}
	}
	
	ZLM.setSize(this.handle,this.handleSize,this.mgr.root.clientHeight,"none");
	if (ZLM.isIE) this.flagHeightSensitiveKids();
}

/* 
The children of the lDiv and rDiv may require resizing on the vertical but IE doesn't re-evaluate
the Height:100% constraint reliably.  So, if we're under IE we need to check if our kids need to
be updated in response to a change in the height of the base Div.  This info wil be stored in an
array of divs to force to the came height as the base container.  This array will be checked in 
Allocate pixels to ensure that height changes are reflected
*/
ZLM_AHG.Group.prototype.findHeightSensitiveKids=function(node) {
	if (node==null) return; // node must exist
	if (ZLM.getChildElementCount(node.parentNode)!=1) return; //must be an only child
	if (ZLM.hasPresetHeight(node)) return; //must not have specified height
	if (node.fill) return; // must not be an autofill element
	if (node.tagName=="TABLE") return; // must not foul up tables
	// if we're here, add it to list and recurse
	this.hMirrors.push(node);
	this.findHeightSensitiveKids(ZLM.getFirstElementChild(node));
}


ZLM_AHG.Group.prototype.flagHeightSensitiveKids=function() {
	this.hMirrors = [];
	this.findHeightSensitiveKids(ZLM.getFirstElementChild(this.lDiv));
	this.findHeightSensitiveKids(ZLM.getFirstElementChild(this.rDiv));	
}

/// Callback to begin shrinking an autoExpanded pane.  Starting the process is a not automatic
/// however, the pane cannot close until it has been opened (indicated by the internal value
/// expandFrame, which is 10 for a fully open pane and 0 for a fully closed one).  Also, 
/// leaving the bounds of the pane is different from leaving the pane itself and entering one 
/// of its own child nodes (the mouseout event does not difference these two conditions, therefore
/// we must check that situation manually.  If a valid exit condition has been found, sound effects
/// (if defined) commence playing and an animated close sequence is initiated.
ZLM_AHG.Group.prototype.shrinkerCB = function(event) {

	if (this.expandFrame!=10) return;
	var x=event.clientX;
	var y=event.clientY;
	if (this.lExpand) {
		this.boundBottom = this.boundTop+this.lDiv.clientHeight;
		this.boundRight = this.boundLeft+this.lDiv.clientWidth;
	}
	else {
		this.boundTop = ZLM.getRelativeOffsetTop(this.rDiv,document.body);
		this.boundLeft = ZLM.getRelativeOffsetLeft(this.rDiv,document.body);

		this.boundBottom = this.boundTop+this.rDiv.clientHeight;
		this.boundRight = this.boundLeft+this.rDiv.clientWidth;
	}
	if (x>this.boundLeft+3 && x<this.boundRight-3 && y>this.boundTop+3 && y<this.boundBottom-3) return;
	if (this.soundFX!=null) ZLM.playSoundFx(this.soundFX);
	this.expandFrame--;
	this.expandNext = window.setTimeout("ZLM_AHG.animator('close');",1);
}

/// Callback to begin opening an auto-Expand pane.  To be opened, a pane must first be fully
/// closed, indicated by the internal value expandFrame, which is zero for a closed pane.
/// If this is the case, begin playing any defined sound effects, record the starting bounds
/// for the expanding pane (used to detect the auto-shrink on exit feature) and start the 
/// expanding pane animation.
ZLM_AHG.Group.prototype.expanderCB = function() {
	if (this.expandFrame!=0) return;
	if (this.soundFX!=null) ZLM.playSoundFx(this.soundFX);
	if (this.lExpand) {
		this.boundTop = ZLM.getRelativeOffsetTop(this.lDiv,document.body);
		this.boundLeft = ZLM.getRelativeOffsetLeft(this.lDiv,document.body);
		this.expandStep=(this.expand-this.lDiv.offsetWidth)/10;
	}
	else {
		this.boundTop = ZLM.getRelativeOffsetTop(this.rDiv,document.body);
		this.boundLeft = ZLM.getRelativeOffsetLeft(this.rDiv,document.body);
		this.expandStep=(this.expand-this.rDiv.offsetWidth)/10;
	}
	this.expandFrame=1;
	ZLM_AHG.animatedDiv=this;
	this.expandNext = window.setTimeout("ZLM_AHG.animator('open');",1);
}

ZLM_AHG.Group.prototype.animateOpen = function() {
	this.split+=this.expandStep;
	this.setSplit(this.split);
	this.expandFrame++;
	if (this.expandFrame<10) {
		this.expandNext = window.setTimeout("ZLM_AHG.animator('open');",1);
	}
	else {
		this.expandNext=null;
	}
}

ZLM_AHG.Group.prototype.animateClose = function() {
	this.split-=this.expandStep;
	this.setSplit(this.split);
	this.expandFrame--;
	if (this.expandFrame>0) {
		this.expandNext = window.setTimeout("ZLM_AHG.animator('close');",1);
	}
	else {
		ZLM.animateDiv=null;
		this.expandNext=null;
	}
}

/// The split attribute defines how the area of BaseDiv should be divided between lDiv and rDiv.  There are three
/// classes of specification.  A percentage indicates that the split should be proportional with N% of available 
/// space going to the lDiv section; if the baseDiv is resized for any reason, this rule of proportionality should
/// continue to be enforced.  An absolute number (in pixels, inches, ems or other fixed measure) indicates that a
/// fixed portion of the area should be set aside for the lDiv section and that any resizing of the baseDiv will 
/// apply only to the rDiv section.  A negative absolute number reserves space for the rDiv section and leaves the 
/// lDiv open to resizing as the geometry of the base container changes.  Manual reapportioning of the divisions
/// by means of adjusting the handle slider will be interpreted according to the class of split specification given
/// initially, thus a percentage split will remain a percentage split even though the actual value of that percentage
/// may change.  Likewise an absolute left or right set-aside split will continue to be interpreted as a fixed set-aside
/// not a proportional reappointment.  If no split attribute is given, a 50% proportional split is assumed.

ZLM_AHG.Group.prototype.initSplit=function(SplitStr) {
	// Default conditions
	this.lReserve = false;
	this.rReserve = false;
	this.percentage = true;
	this.split = 50;
	// check actual preferences
	if (!SplitStr) SplitStr = this.mgr.root.getAttribute("split");	
	if (!SplitStr) return;
	this.split=parseInt(SplitStr);
	if (SplitStr.indexOf("%")== -1) {
		this.percentage=false;
		if (this.split<0) { 
			this.rReserve=true;
			this.split=0-this.split;
		}
		else {
			this.lReserve=true;
		}
	}	
	if (this.split<5) this.split=5;
	if (this.split>99 && this.percentage==true) this.split=99;
}

/// Dynamically adjust the divisions of the left and right children based on a
/// split point.  How this value is interpreted depends on the initial specification
/// of the split attribute (recorded internally in the percentage, lReserve and rReserve
/// flags) 
ZLM_AHG.Group.prototype.setSplit=function(pt,percentage,reverse) {
	if (pt.indexOf) { // someone supplied units, need to reinitialize
		this.initSplit(pt);	
	}
	else {
		this.split=pt;
	}
	if (this.percentage) this.dividePercentage();
	else this.divideReserve();
}

/// Interpret the value of this.split as a percentage for area division and adjust
/// actual pixel allocations accordingly
ZLM_AHG.Group.prototype.dividePercentage=function() {
	var totalW = this.baseDiv.clientWidth - this.handle.offsetWidth;
	var leftW = Math.round(totalW*this.split/100);
	var rightW = totalW - leftW;
	this.allocatePixels(leftW,rightW);
}

/// Interpret the value of this.split as an absolute measure reserving space in a 
/// divided area and allocate actual pixel values accordingly.
ZLM_AHG.Group.prototype.divideReserve=function() {
	var totalW = this.baseDiv.clientWidth - this.handle.offsetWidth;
	if (this.lReserve) { // allocate a fixed space for the top section
		var leftW=this.split;
		var rightW = totalW-leftW;
		if (rightW<5) rightW=5;
	}
	else { // the bottom section is fixed, adjust top accordingly
		var rightW=this.split;
		var leftW = totalW-rightW;
		if (leftW<5) leftW=5;
	}
	this.allocatePixels(leftW,rightW);
}

/// Assuming that actual pixel sizes have been established, adjust the sizes of the various
/// containers and notify any child nodes of the geometry change.
ZLM_AHG.Group.prototype.allocatePixels=function(leftW,rightW) {
	var updateLeft = !(this.lDiv.clientWidth==leftW && this.lDiv.clientHeight==this.height);
	var updateRight = !(this.rDiv.clientWidth==rightW && this.rDiv.clientHeight==this.height);	
	if (updateLeft) {
		ZLM.setSize(this.lDiv,leftW,this.height,"none")
		ZLM.setSize(this.lLid,leftW,this.height,"none");		
		this.rDiv.style.left=leftW+this.handle.offsetWidth+"px";
		ZLM.notifyResize(this.lDiv);		
		this.rLid.style.left=leftW+this.handle.offsetWidth+"px";
		this.handle.style.left=this.lDiv.offsetWidth+"px";			
	}
	if (updateRight) {		
		ZLM.setSize(this.rDiv,rightW,this.height,"none");
		ZLM.setSize(this.rLid,rightW,this.height,"none");
		ZLM.notifyResize(this.rDiv);
	}	
	ZLM.setSize(this.handle,this.handleSize,this.height,"none");

	if (ZLM.isIE) {
		for (var i=0;i<this.hMirrors.length;i++) {
			var n=this.hMirrors[i];
			if (n) {
				if (n.offsetHeight!=this.height) {
					ZLM.setOffsetHeight(n,this.height);
				}
			}
		}
	}
}

/// Adjust the size of the root container to account for available space on screen.
ZLM_AHG.Group.prototype.sizeContainer=function() {
	arguments.callee.name="ZLM_AHG.Group.prototype.sizeContainer";	
	ZLM.sizeAutoFillDiv(this.mgr.root);
	ZLM.setSize(this.handle,this.handleSize,this.mgr.root.clientHeight,"none");
	this.height=this.mgr.root.clientHeight;
	this.width=this.mgr.root.clientWidth;
	if (this._lOnly) this.allocatePixels(this.width,0);
	else if (this._rOnly) this.allocatePixels(0,this.width);
	else this.setSplit(this.split);
	return(true);
}

ZLM_AHG.Group.prototype.showLeftOnly=function() {
	this._lOnly = true;
	this._rOnly = false;
	this._hSize = this.handleSize;
	var totalW = this.baseDiv.clientWidth - this.handle.offsetWidth;
	this.handleSize=0;
	this.allocatePixels(totalW,0);
}

ZLM_AHG.Group.prototype.showRightOnly=function() {
	this._lOnly = false;
	this._rOnly = true;
	this._hSize = this.handleSize;

	var totalW = this.baseDiv.clientWidth - this.handle.offsetWidth;
	this.handleSize=0;
	this.allocatePixels(0,totalW);
}

ZLM_AHG.Group.prototype.restoreSplit=function() {
	if (!(this._lOnly || this._rOnly)) return;
	this._lOnly = false;
	this._rOnly = false;
	this.handleSize = this._hSize; 
	this.setSplit(this.split);
	
}

//===========================//
// DRAG-DROP LAYOUT SUPPORT  //
//===========================//

ZLM_AHG.Group.prototype.startDrag=function() {
	this.rLid.style.display="block";
	this.lLid.style.display="block";
}

ZLM_AHG.Group.prototype.constrainX=function(wrapper, newX) {
	if (newX<0) newX=0;
	var w = this.baseDiv.clientWidth-this.handle.offsetWidth;
	if (this.percentage) { // split needs to be interpreted in the context of baseDiv size
		this.split = (newX/w)*100;
		if (this.split<1) this.split=1;
		if (this.split>99) this.split=99;
	}
	else if (this.rReserve) {
		this.split = w-newX;
		if (this.split<5) this.split=5;
		if (this.split>w-5) this.split=w-5;
	}
	else {
		this.split=newX;
		if (this.split<5) this.split=5;
		if (this.split>w-5) this.split=w-5
	}
	this.setSplit(this.split);
	return(this.lDiv.offsetWidth);
}

ZLM_AHG.Group.prototype.constrainY=function(wrapper, newY) {
	return(0);
}

ZLM_AHG.Group.prototype.endDrag=function() {
	this.rLid.style.display="none";
	this.lLid.style.display="none";
	ZLM.notifyResize(this.lDiv);
	ZLM.notifyResize(this.rDiv);
}

