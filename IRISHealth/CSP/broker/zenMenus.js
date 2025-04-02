/*
	zenMenus.js
	ZEN JavaScript active client-side Menus, buttonBars and related 
	selectors management methods
	Copyright (c) 2008-2012 InterSystems Corp. ALL RIGHTS RESERVED.
        Local JS Namespace: ZMS
*/

/// The Zen Menu System (ZMS) was designed to extend the Zen Widget 
/// library into the realm of client-side 
/* 
  GLOBAL DATA SPACE
*/

var ZMS = {};  // Object space

// Default to Zen Values

// Black Icons for light backgrounds
ZMS.DownArrowIcon="/csp/broker/images/DownArrow.png";
ZMS.SmallDownArrowIcon="/csp/broker/images/SmDownArrow.png";
ZMS.UpArrowIcon="/csp/broker/images/UpArrow.png";
ZMS.RightArrowIcon="/csp/broker/images/RtArrow.png";
ZMS.CheckmarkIcon="/csp/broker/images/Checkmark.png";

// White Icons for dark backgrounds
ZMS.InvDownArrowIcon="/csp/broker/images/DownArrowInv.png";
ZMS.InvSmallDownArrowIcon="/csp/broker/images/SmDownArrowInv.png";
ZMS.InvUpArrowIcon="/csp/broker/images/UpArrowInv.png";
ZMS.InvRightArrowIcon="/csp/broker/images/RtArrowInv.png";
ZMS.InvCheckmarkIcon="/csp/broker/images/CheckmarkInv.png";

ZMS.initialized = 0; // Has this system, been initialized for use yet?
ZMS.activeBgColor="blue"; // default active background color
ZMS.activeFgColor="white"; // default active forground color
ZMS.menuSeparatorHeight=5; // magic number for menu Separator
ZMS.menuObj=null; // active top-level pop-up menu
ZMS.scrollingMenu=null; // active scrolling tall menu

ZMS.MouseTrapLayer = 500;

/* 
   QUERY FUNCTIONS
*/
// For style info, we'd like all menus to match as much as possible
// As a baseline we use the style for csMenuItem to set the basic 
// layout and the pseudo-element csActiveMenuItem to set the style
// for the current highlight element
ZMS.initMenuStyle=function() {
	ZMS.normalFG = ZLM.getCSSForegroundDefault("csMenuItem",document.body);
	if (ZMS.normalFG) {
		ZMS.normalFGS = ZLM.isDarkRGB(ZMS.normalFG);
		ZMS.activeFG = ZLM.getCSSForegroundDefault("csActiveMenuItem",document.body);
		ZMS.activeFGS = ZLM.isDarkRGB(ZMS.activeFG);
	}
	else {
		ZMS.normalFG  = "0,0,0";
		ZMS.normalFGS = 1;
		ZMS.activeFG  = "255,255,0";
		ZMS.activeFGS = 0;
	}
}

// given a menuItem, mi, search backward up the tree for the first instance of 
// a contextMenu 
ZMS.getParentMenu=function(mi) {
	return(ZLM.getAncestor(mi.parentNode,"contextMenu"));
}

// Return the DOM Subtree root of the given menuItem's sub-menu (if any)
ZMS.getImmediateSubMenu=function(div) {
	var kid = div.firstChild;
	while (kid!=null) {
		if (kid.nodeType==1 && kid.className=="contextMenu") return(kid);
		kid=kid.nextSibling;
	}
	return(null);
}

// Return the root DOM node for the given menuItem's submenu (if any).  Under 
// HTML this submenu, if it exists, is a direct child node of the menuItem.
// under Zen, there will be a wrapper layer that needs to be taken into account.
// If there is no submenu associated with the given menuItem return null, 
// otherwise, return a pointer to a div of class contextMenu.
ZMS.getSubMenu=function(m) {
	// Under Zen there is an extra layer of wrappers that need to be accounted for
	if (ZLM.isZen()) {
		for (var k=m.firstChild;k!=null;k=k.nextSibling) {
			var menu=ZMS.getImmediateSubMenu(k);
			if (menu!=null) return(menu);
		}
		return(null);
	}
	// In HTML the menu will be a direct child
	return(ZMS.getImmediateSubMenu(m));
}

// A low level trigger event may occur on any one of a number of DOM nodes 
// within the structure of a menu or button bar pick.  The DOM-level event
// is associated with the innermost containing element of the action,
// therefore we may need to back up the tree a bit to find the actual 
// semantic element in need of processing (this will ultimately be either 
// a csMenuItem or a buttonBarItem). If, for some reason this routine was
// called on an event that did not originate on one of these high-level
// widgets, return null.  Otherwise, return the closest high-level container
// div of the appropriate class.
ZMS.getMenuItem=function(e) {
	if (ZLM.isIE) var who = event.srcElement;
	else var who=e.target;
	while (who!=document.body) {
		if (who.className=="csMenuItem") return(who);
		if (who.className=="buttonBarItem") return(who);
		who=who.parentNode;
	}
	return(null);
}

// Given a menu ID and the ID tag of one of its children, find the 
// DIV associated with the subelement
ZMS.findPickOption=function(menuId,pickId) {
	var m=document.getElementById(menuId);
	if (m) {
		for (k=m.firstChild;k!=null;k=k.nextSibling) {
			if (k.nodeType==1 && k.id==pickId) return(k);
		}
	}
	return(null);
}

// Given the plain text content of a menuItem caption, find the 
// associated DIV element
ZMS.getMenuItemByCaption=function(str) {
	var mi = ZLM.getDocumentElements("csMenuItem",null,null);
	for (var i=0;i<mi.length;i++) {
		if (mi[i].getAttribute("caption")==str) return(mi[i]);
		if (mi[i].getAttribute("altCaption")==str) return(mi[i]);
	}
	return(null);
}

// Given a trigger event, find out which menuBarItem contains 
// the targetted element
ZMS.getMenuBarItem=function(e) {
	if (ZLM.isIE) var who = event.srcElement;
	else var who = e.target;
	while (who!=document.body) {
		if (who.className=="csMenuBarItem") return(who);
		who=who.parentNode;
	}
	return(null);
}

// Given the plain text caption of a menuBarItem, find the 
// corresponding element
ZMS.getMenuBarItemByCaption=function(str) {
	var mbi = ZLM.getDocumentElements("csMenuBarItem",null,null);
	for (var i=0;i<mbi.length;i++) {
		if (mbi[i].getAttribute("caption")==str) return(mbi[i]);
	}
	return(null);
}

//??? NOT REALLY BEST CSS-AWARE APPROACH !!!
ZMS.setMenuActiveColors=function(fgColor,bgColor) {
	ZMS.activeBgColor=bgColor;
	ZMS.activeFgColor=fgColor;
} 

/* 
  MANIPULATION UTILITIES
*/

// Given a menu item with a valid alternative caption defined, 
// toggle the state of the item to display the alternative label, 
// icon and quick key as available.
ZMS.alternateCaption=function(item) {
	if (item.captionDiv.style.display!="none") {
		item.toggleState=1;
		if (item.captionDiv) item.captionDiv.style.display="none";
		if (item.altCaptionDiv) item.altCaptionDiv.style.display="block";
		if (item.keyDiv && item.altKeyDiv) {
			item.keyDiv.style.display="none";
			item.altKeyDiv.style.display="block";
		}
	}
	else {
		item.toggleState=0;
		if (item.altCaptionDiv) item.altCaptionDiv.style.display="none";
		if (item.captionDiv) item.captionDiv.style.display="block";
		if (item.altKeyDiv) item.altKeyDiv.style.display="none";
		if (item.keyDiv) item.keyDiv.style.display="block";
	}
}

// Given a moded menu item (checkable or alternating caption), 
// toggle the current mode, updating the visuals accordingly.  
// If the item is checkable, the graphical update is handled 
// locally.  Otherwise, the update is passed on to alternateCaption.
ZMS.toggleMode=function(item) {
	if (item.toggleMode==true) {
		if (item.altIconDiv.style.display=="none") {
			item.altIconDiv.style.display="block";
			item.toggleState=1;
		}
		else {
			item.altIconDiv.style.display="none";
			item.toggleState=0;
		}
	}
	else {
		ZMS.alternateCaption(item);
	}
	if (item.zenObj) item.zenObj.toggleState = item.toggleState;
}

// Create and position vertical scroll arrows for scrolling 
// context menus Icons are limited to a size of 15x15 pixels 
// and are automatically centered in the space defined by the 
// menu's minWidth and itemHeight properties.
ZMS.createArrowItem=function(m,iconName) {
	var arrowIcon= ZLM.simulateTag("img src='"+iconName+"' width='15' height='15'");
	var a = ZLM.makeElement("div",null,arrowIcon);
	arrowIcon.style.position="absolute";
	arrowIcon.style.top=Math.floor((m.itemHeight-15)/2)+"px";
	arrowIcon.style.left=Math.floor((m.minWidth-15)/2)+"px";
	arrowIcon.style.width="15px";
	arrowIcon.style.height="15px";
	a.style.position="absolute";
	a.style.width=(m.minWidth-m.margin)+"px";
	a.style.height=m.itemHeight+"px";
	a.style.display="none";
	a.style.left=m.margin+"px";
	ZLM.setLocalAttribute(a,"onmouseover","ZMS.scrollCB(this.parentNode,this);");
	ZLM.setLocalAttribute(a,"onmouseout","ZMS.noScrollCB(this.parentNode,this);");
	ZLM.setLocalAttribute(a,"onclick","ZMS.scrollJumpCB(event,this.parentNode,this);");
	m.appendChild(a);
	return(a);
}

// Add a down arrow element to a long, scrolling menu
ZMS.addDownArrow=function(m) {
	var a = ZMS.createArrowItem(m,ZMS.DownArrowIcon);
	m.downArrowDiv = a;
}

// Add an up arrow element to a long, scrolling menu
ZMS.addUpArrow=function(m) {
	var a = ZMS.createArrowItem(m,ZMS.UpArrowIcon);
	m.upArrowDiv = a;
}

// Add a drop shadow to a context menu
ZMS.addShadow=function(m) {
	var styleStr = "'position:absolute;'";
	var shadowDiv = ZLM.simulateTag("div class='shadow' style="+styleStr);
	m.parentNode.appendChild(shadowDiv);
	m.shadowDiv=shadowDiv;
}


// Given a context menu with a fixed height and defined 
// scrollHome, determine (and force) the visibility and 
// location of its contents.
ZMS.setItemVisibility=function(m) {
	var kidCount = 0;
	var lastKid = -1;
	var top=m.margin;
	if (m.scrollHome!=0) {
		top+=m.itemHeight;  // reserve space for scroll up control
		if (!m.upArrowDiv) ZMS.addUpArrow(m);
		m.upArrowDiv.style.display="block";
		m.upArrowDiv.style.top=m.margin+"px";
	}
	else if (m.upArrowDiv) m.upArrowDiv.style.display="none"; 
	for (var k=m.firstChild;k!=null;k=k.nextSibling) {
		if (k.nodeType==1) {
			if (k.className=="csMenuItem" || k.className=="csMenuSeparator" ||k.className=="csComboBoxItem") {
				if (kidCount<m.scrollHome) k.style.display="none";
				else {
					if (top+2*m.itemHeight<m.activeHeight) {
						k.style.display="block";
						k.style.top=top+"px";
						lastKid=kidCount;
					}
					else k.style.display="none";
					if (k.className=="csMenuSeparator") top+=ZMS.menuSeparatorHeight;
					else top+=m.itemHeight;
				}
				kidCount++;
			}
		}
	}
	m.maxLines = kidCount;
	if (lastKid==kidCount-1) { // end of list on screen
		ZMS.scrollingMenu=null;
		if (m.downArrowDiv) m.downArrowDiv.style.display="none";
	} 
	else {
		if (!m.downArrowDiv) ZMS.addDownArrow(m);
		m.downArrowDiv.style.display="block"; 
		m.downArrowDiv.style.top=(m.activeHeight-m.itemHeight)+"px";
	}
}

// Use scrolling to shoehorn a long menu into a space 
// no more than maxH pixels tall
ZMS.cropMenu=function(m,maxH) {
	var visibleItems = Math.floor((maxH-2*m.margin)/m.itemHeight);
	m.activeHeight= visibleItems*m.itemHeight+2*m.margin;
	m.scrollHome=0;
	m.style.height=m.activeHeight+"px";
	m.shadowDiv.style.height=m.activeHeight+"px";
	ZMS.setItemVisibility(m);  
}

// Make a pop-up menu visible on screen, adding adornments 
// (such as a drop shadow) and resizing as needed
ZMS.showMenu=function(m,x,y){
	ZLM.killBrowserSelectionProcess();
	if (m.shadowDiv==null) ZMS.addShadow(m);
	var rightEdge=ZMS.getWindowWidth()-x;    // distance remaining to right of target
	var bottomEdge=ZMS.getWindowHeight()-y;  // distance remaining below target
	if (rightEdge<m.offsetWidth) var homeX=ZMS.getPageXOffset()+x-m.offsetWidth;  // space narrower than width, bump back
	else homeX=ZMS.getPageXOffset()+x;  // H ok 
	if (bottomEdge<m.minHeight) {  // use static minHeight in place of browser tweaked offsetHeight
		if (y>bottomEdge) {
			if (y<m.minHeight) {
				ZMS.cropMenu(m,y);
				var homeY=ZMS.getPageYOffset()+y-m.activeHeight;
			}
			else var homeY=ZMS.getPageYOffset()+y-m.minHeight;
		}
		else {
			ZMS.cropMenu(m,bottomEdge-m.itemHeight);
			var homeY=ZMS.getPageYOffset()+y;
		}  
	}
	else {
		var homeY=ZMS.getPageYOffset()+y;
	}

	m.style.left = homeX+"px";
	m.style.top = homeY+"px";
	m.style.zIndex=ZMS.MouseTrapLayer+2;
	m.style.display="block";

	if (ZLM.isIE && !m._iFrame) { //IE SVG Layering fix
		var iFrame = document.createElement("iframe");
		iFrame.src = '';
		iFrame.frameBorder = '0';
		var s = iFrame.style;
		s.filter = 'alpha(opacity=0)';
		s.position = 'absolute'; 
		s.zIndex= -1;
		s.top = '0px'; 
		s.left = '0px'; 
		s.width = (m.offsetWidth+3)+'px'; 
		s.height = (m.offsetHeight+3)+'px'; 
		s.border = '0px solid black';
		s.background = 'transparent';
		m._iFrame = iFrame;
	
		m.insertBefore(iFrame,m.firstChild);
	}

	// deal with shadow
	m.shadowDiv.style.top=(homeY+5)+"px";
	m.shadowDiv.style.left=(homeX+5)+"px";
	m.shadowDiv.style.width=m.offsetWidth+"px";
	m.shadowDiv.style.height=m.offsetHeight+"px";
	m.shadowDiv.style.zIndex=ZMS.MouseTrapLayer+1;
	m.shadowDiv.style.display="block";
	m.style.display="block";
	var pMenu=ZMS.getParentMenu(m);
	if (pMenu) pMenu.openMenu = m;
	ZLM.pushKeyContext(m.id);
}

// pop-down the given pop-up menu as well as any open submenus
ZMS.hideMenu=function(m) {
	if (m.openMenu) {
		ZMS.hideMenu(m.openMenu);
		m.openMenu=null;
	}
	m.style.display="none"; 
	if (m.shadowDiv) m.shadowDiv.style.display="none";
}

// Close the current menu object, its submenus and all associated 
// bookkeeping (keyboard context, mouse trap, etc)
ZMS.closeMenu=function(e){
	if (e && e.clientX==ZMS.mouseTrap.initX && e.clientY==ZMS.mouseTrap.initY) {
		ZLM.killEvent(e);
		return;
	}
	if (ZMS.menuObj) {
		ZMS.hideMenu(ZMS.menuObj);
		ZMS.mouseTrap.style.display="none";
		ZLM.popKeyContext();
		ZMS.menuObj=null;
	}
}

// Pop up a menu (m) at the location (x,y) on the screen, 
// reparenting the div to the foreground layer as needed.
ZMS.showPullDownMenu=function(x,y,m){
	if (m.disabled) return;
	ZMS.closeMenu(null);
	ZMS.menuObj = m;
	ZMS.mouseTrap.style.display="block";
	ZMS.mouseTrap.initX = x;
	ZMS.mouseTrap.initY = y;
	ZLM.reparent(m,ZMS.mouseTrap);
	ZMS.showMenu(m,x,y);
}

//////////////////////////
///////////////////////////
////////////////////////////

ZMS.raiseBBItem=function(who) {
	if (who.disabled) ZMS.flattenBBItem(who);
	else {
		var size=who.parentNode.clientHeight-4;    
		ZLM.setSize(who,size,size,"2px outset "+ZLM.toHTMLColorSpec(ZLM.getRGBBackgroundColor(who)));
		who.iconDiv.style.top=Math.floor((size-who.iconDiv.offsetHeight)/2)+"px";
		who.iconDiv.style.left=Math.floor((size-who.iconDiv.offsetWidth)/2)+"px";
		if (who.captionDiv) {
			ZMS.popToFront(who.captionDiv);
		}
	}
}

ZMS.lowerBBItem=function(who) {
	if (who.disabled) ZMS.flattenBBItem(who);
	else {
		var size=who.parentNode.clientHeight-4;    
		ZLM.setSize(who,size,size,"2px inset "+ZLM.toHTMLColorSpec(ZLM.getRGBBackgroundColor(who)));
	}
}

ZMS.flattenBBItem=function(who) {
	var size=who.parentNode.clientHeight;    
	ZLM.setSize(who,size,size,"none");
	who.iconDiv.style.top=Math.floor((size-who.iconDiv.offsetHeight)/2)+"px";
	who.iconDiv.style.left=Math.floor((size-who.iconDiv.offsetWidth)/2)+"px";
	if (who.captionDiv) {
		ZMS.popAway(who.captionDiv);
	}
}

ZMS.popToFront=function(who) {
	who.style.display="block";
	if (!who.save) who.save={};
	who.save.top=who.style.top;
	who.save.left=who.style.left;
	who.save.parent=who.parentNode;
	var t = ZLM.getPageOffsetTop(who.refDiv)+who.refDiv.offsetHeight+2;
	var l = ZLM.getPageOffsetLeft(who.refDiv)+who.refDiv.offsetWidth;
	who.style.top=t+"px";
	who.style.left=l+"px";
	who.style.zIndex=10;
	ZLM.reparent(who,document.body);
}

ZMS.popAway=function(who) {
	who.style.display="none";
	who.save.parent=who.parentNode;
	who.style.top=who.save.top;
	who.style.left=who.save.left;
	ZLM.reparent(who,who.save.parent);
}

//#############################

/// PUBLIC API 
/// Disable a given option with a given menu bar
ZMS.disableButtonBarOption=function(barId,optId) {
	var item = ZMS.findPickOption(barId,optId);
	if (item==null) return;
	item.disabled=1;
	if (item.iconDiv) item.iconDiv.style.display="none";
	if (item.grayIconDiv) item.grayIconDiv.style.display="block";
}

/// PUBLIC API
/// Enable a given option within a given menu bar
ZMS.enableButtonBarOption=function(barId,optId) {
	var item = ZMS.findPickOption(barId,optId);
	if (item==null) return;
	item.disabled=0;
	if (item.iconDiv) item.iconDiv.style.display="block";
	if (item.grayIconDiv) item.grayIconDiv.style.display="none";
}

/// PUBLIC API
/// Disable a given option from within a given menu
ZMS.disableMenuOption=function(menuId,optId) {
	var item=ZMS.findPickOption(menuId,optId);
	ZMS.disableMenuOptionNode(item);
}

/// PUBLIC API
/// Enable a given option from within a given menu
ZMS.enableMenuOption=function(menuId,optId) {
	var item=ZMS.findPickOption(menuId,optId);
	ZMS.enableMenuOptionNode(item);
}

/// PUBLIC API
/// Disable a given option based on its node
ZMS.disableMenuOptionNode=function(item) {
	if (item==null) return;
	item.disabled=1;
	item.oldColor=ZLM.getRGBColor(item);
	if (item.oldColor) item.style.color=ZLM.toHTMLColorSpec(ZLM.averageColor(item.oldColor,ZLM.getRGBBackgroundColor(item)));
	if (item.activeDiv) item.activeDiv.style.display="none";
	if (item.iconDiv) item.iconDiv.style.display="none";
	if (item.grayIconDiv) item.grayIconDiv.style.display="block";
}

/// PUBLIC API
/// Enable a given option based on its node
ZMS.enableMenuOptionNode=function(item) {
	if (item==null) return;
	item.disabled=0;
	if (item.oldColor) item.style.color=ZLM.toHTMLColorSpec(item.oldColor);  
	if (item.iconDiv) item.iconDiv.style.display="block";
	if (item.grayIconDiv) item.grayIconDiv.style.display="none";
}

/// PUBLIC API
/// Enable a given contextMenu on its node
ZMS.enableMenuNode=function(m) {
	if (m==null) return;
	m.disabled=false;
}

/// PUBLIC API
/// Enable a given contextMenu on its node
ZMS.disableMenuNode=function(m) {
	if (m==null) return;
	m.disabled=true;
	ZMS.hideMenu(m);
}

/*
  EVENT SERVICE FUNCTIONS 
*/

// Ignore an event (hopefully preventing default behavior as well)
ZMS.ignore=function(event) {
return(ZLM.killEvent(event));
	e=event||window.event;
	ZLM.killEvent(e);
	return false;
}

// Internal callback to scroll a tall menu 
ZMS.reallyScrollCB=function(dir) {
	if (ZMS.scrollingMenu) {
		var m = ZMS.scrollingMenu;
		if (dir=="up") {
			m.scrollHome--;
			if (m.scrollHome<=1) { // home of 1 means there's room to show the whole top with no scroll button
				m.scrollHome=0;
				ZMS.scrollingMenu=null;
			}
		}
		else {
			m.scrollHome++;
		}
		ZMS.setItemVisibility(m);
		if (ZMS.scrollingMenu) setTimeout("ZMS.reallyScrollCB('"+dir+"');",100);
	}
}

// Internal callback to start timed autoscrolling of tall menus
ZMS.scrollCB=function(menu, div) {
	if (div==menu.upArrowDiv) var s="up";
	if (div==menu.downArrowDiv) var s="down";
	if (s) {
		ZMS.scrollingMenu=menu;
		ZMS.reallyScrollCB(s);
	}
}

// Internal callback to turn off autoscrolling of tall menus
ZMS.noScrollCB=function(menu,div) {
	ZMS.scrollingMenu=null;
}

// Internal callback to jump to the top or bottom of a tall menu
ZMS.scrollJumpCB = function(event,menu,div) {
	if (div==menu.upArrowDiv) {
		menu.scrollHome=0;
		ZMS.scrollingMenu=null;
	}
	else {
		menu.scrollHome=menu.maxLines-Math.floor(menu.activeHeight/menu.itemHeight);
	}
	ZMS.setItemVisibility(menu);
	ZMS.ignore(event);
}

// Pop up a context menu at the current mouse pointer location
ZMS.showContextMenu=function(e,m){
	var evt = e||window.event;
	if (m.disabled) return(ZLM.killEvent(evt));
	ZMS.menuObj = m;
	ZMS.mouseTrap.style.display="block";
	ZMS.mouseTrap.initX = evt.clientX;
	ZMS.mouseTrap.initY = evt.clientY;
	ZLM.reparent(m,ZMS.mouseTrap);
	ZMS.showMenu(m,evt.clientX,evt.clientY);
	return(ZLM.killEvent(evt));
}

/////////////===========

/// Rollover highlight callback 
ZMS.highlight=function(who) {
	if (who.disabled==1) return;
	if (who.className=="csMenuItem" || who.className=="csMenuBarItem"||who.className=="csComboBoxItem") {
		if (!who.oldColor) {
			who.oldColor=ZLM.getRGBColor(who);
			who.oldBg = ZLM.getRGBBackgroundColor(who);
		}

		if (!who.activeDiv) who.style.backgroundColor=ZMS.activeBgColor;
		else who.activeDiv.style.display="block";

		// Switch to active foreground color scheme
		who.style.color=ZLM.toHTMLColorSpec(ZMS.activeFG);
		if (ZMS.activeFGS==1) {
			if (who.cascadeDiv) {
				who.cascadeDiv.style.display="block";
				who.cascadeDivInv.style.display="none";
			}
		}
		else {
			if (who.cascadeDiv) {
				who.cascadeDiv.style.display="none";
				who.cascadeDivInv.style.display="block";
			}
		}

		// if the parent menu had a submenu open, close it
		var pMenu = ZMS.getParentMenu(who);
		if (pMenu && pMenu.openMenu!=null) {
			ZMS.hideMenu(pMenu.openMenu);
			pMenu.openMenu=null;
		}
//HTML:
//    if (who.parentNode.openMenu) ZMS.hideMenu(who.parentNode.openMenu);

		// if I have a subMenu to open, open it
		var m=ZMS.getSubMenu(who);
		if (m!=null) {
			if (ZLM.isZen()) var menuParent=who.parentNode.parentNode;
			else var menuParent=who.parentNode;
			if (menuParent.className!="csMenuBar") {
				ZMS.showMenu(m,who.offsetLeft+who.offsetWidth,0);
			}
		}
//		pMenu.activeItem=who;
	}
}

ZMS.lowlight=function(who) {
	if (who.disabled==1) return;
	if (who.className=="csMenuItem" || who.className=="csMenuBarItem"||who.className=="csComboBoxItem" ) {
		if (!who.activeDiv)who.style.backgroundColor=ZLM.toHTMLColorSpec(who.oldBg);
		else who.activeDiv.style.display="none";
//		who.style.color=ZLM.toHTMLColorSpec(who.oldColor);
		who.style.color=ZLM.toHTMLColorSpec(ZMS.normalFG);
//ZLM.cerr("NFG: "+ZMS.normalFG+"("+who.oldColor+")");
		if (ZMS.normalFGS) {
			if (who.cascadeDiv) {
				who.cascadeDiv.style.display="block";
				who.cascadeDivInv.style.display="none";
			}
		}
		else {
			if (who.cascadeDiv) {
				who.cascadeDiv.style.display="none";
				who.cascadeDivInv.style.display="block";
			}
		}

	}
//  if (who==who.parentNode.activeItem) who.parentNode.activeItem=null;
}

ZMS.serviceClick=function(e,index) {
	var pick = ZMS.getMenuItem(e);
	ZMS.serviceMenu(pick,index);
	ZLM.killEvent(e);
	ZMS.closeMenu(e);
}

ZMS.servicePick=function(caption) {
	var pick = ZMS.getMenuItemByCaption(caption);
	if (ZMS.serviceMenu(pick)) ZMS.closeMenu(null);
}

ZMS.serviceCMKeyNav=function(id,key) {
//ZLM.cerr("service request for "+key+" on context menu: "+id);
var cm=document.getElementById(id);
//ZLM.dumpObj(cm);
}

ZMS.serviceMenu=function(pick,index) {
	if (pick.activeDiv) pick.activeDiv.style.display="none";
	var zenThis=null;
	
	if (pick.disabled!=1) {
		var m=ZMS.getSubMenu(pick);
		if (m==null) {
			if (pick.toggleMode || pick.getAttribute("altCaption")!=null) {
				ZMS.toggleMode(pick);
			}
			var cbFn=pick.getAttribute("onselect");
			if ((index!=0)&&(typeof(_zenIndex)!="undefined")){
				zenThis=_zenIndex[index];
			}
			if (cbFn!=null) eval(cbFn);
			else ZLM.cerr("No callback registered for menu item: "+pick.getAttribute("caption"));
			return(true);
		}
		else {
			ZMS.showMenu(m,pick.offsetLeft+pick.offsetWidth,0);
			return(false);
		}
	}
}

ZMS.serviceBarClick=function(e) {
	var pick = ZMS.getMenuBarItem(e);
	ZMS.serviceBar(pick);
	ZLM.killEvent(e);
}

ZMS.serviceBarPick=function(caption) {
	var pick=ZMS.getMenuBarItemByCaption(caption);
	ZMS.serviceBar(pick);
}

ZMS.serviceBar=function(pick) {
	if (pick.disabled!=1) {
		if (!pick.subMenuDiv) pick.subMenuDiv=ZMS.getSubMenu(pick);
		if (pick.subMenuDiv==null) ZLM.cerr("No submenu specified for menuBarItem "+pick.getAttribute("caption"));
		else {
			var top=ZLM.getPageOffsetTop(pick)+pick.offsetHeight+3;
			var left=ZLM.getPageOffsetLeft(pick);
			ZMS.showPullDownMenu(left,top,pick.subMenuDiv);
		}
	}
}

//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
ZMS.BBI_OUT_SIZE = 24;
ZMS.BBI_IN_SIZE = 16;
ZMS.BBI_EDGE_SIZE = 4;

ZMS.sizeButtonBar=function(bb) { 
	bb.style.border=ZMS.BBI_EDGE_SIZE+"px ridge "+ZLM.toHTMLColorSpec(ZLM.getRGBBackgroundColor(bb));
	bb.tray=ZLM.simulateTag("div style='position:relative; top:0px; left:0px; width:100%; height:100%;'");
	bb.appendChild(bb.tray);
	ZLM.setHeight(bb,ZMS.BBI_OUT_SIZE);
	if (bb.getAttribute("fillWidth")=="true") ZLM.setWidth(bb,bb.parentNode.clientWidth-2*ZMS.BBI_EDGE_SIZE);
	else {
		var nKids=0;
		var node=ZMS.getChildElements(bb);
		for (var i=0;i<node.length;i++) {
//    var next=null;
//    for (var k=bb.firstChild;k!=null;k=next) {
//      next=k.nextSibling;
//IN ZEN the follow line is: if (k.nodeType==1 && k.item) nKids++;
//      if (k.nodeType==1 && ((k.className=="buttonBarItem")||((ZLM.isZen())&& k.item))) {
			if (node[i].className=="buttonBarItem") {
//        if (ZLM.isZen()) var d=k.item;
//        else var d=k;
				d=node[i];
				ZLM.setSize(d,ZMS.BBI_OUT_SIZE,ZMS.BBI_OUT_SIZE,"none");
				d.style.position="absolute";
				d.style.top="0px";
				d.style.left=(nKids*ZMS.BBI_OUT_SIZE)+"px";
				ZLM.reparent(d,bb.tray);
				ZMS.createButtonBarItemSubtree(d,ZMS.BBI_OUT_SIZE);
				nKids++;
			}
		}
		ZLM.setWidth(bb,nKids*ZMS.BBI_OUT_SIZE);
	}
}

ZMS.organizeButtonBar=function(bb) {
	if (!bb.tray) return;
	for (var k=bb.tray.firstChild;k!=null;k=k.nextSibling) {
		if (k.nodeType==1 && k.className=="buttonBarItem") {
			ZMS.createButtonBarItemSubtree(k,ZMS.BBI_OUT_SIZE);
		}
  }
}

ZMS.createButtonBarItemSubtree=function(bbi,size) { 
	var sz = ZMS.BBI_IN_SIZE;
	var icon = bbi.getAttribute("icon");
	if (icon) {
		bbi.iconDiv = ZLM.simulateTag("img src='"+icon+"' width='"+sz+"' height='"+sz+"' style='position:relative;width:"+sz+"px;height:"+sz+"px;'" ); 
		bbi.iconDiv.style.top=Math.floor((size-sz)/2)+"px";
		bbi.iconDiv.style.left=Math.floor((size-sz)/2)+"px";
		bbi.appendChild(bbi.iconDiv);
	}
	else bbi.iconDiv=null;
	var grayIcon = bbi.getAttribute("grayIcon");
	if (icon && grayIcon) {
		bbi.grayIconDiv = ZLM.simulateTag("img src='"+grayIcon+"' width='"+sz+"' height='"+sz+"' style='position:relative;width:"+sz+"px;height:"+sz+"px;display:none;'" ); 
		bbi.grayIconDiv.style.top=Math.floor((size-sz)/2)+"px";
		bbi.grayIconDiv.style.left=Math.floor((size-sz)/2)+"px";
		bbi.appendChild(bbi.grayIconDiv);
	}
	var caption = bbi.getAttribute("caption");
	if (caption) {
		bbi.captionDiv=ZLM.simulateTag("div class='zenToolTip' style='position:absolute; display:none; z-index:10;'");
		var txtDiv=ZLM.simulateTag("div style='position:absolute; display:block; top:1px; left:3px; background:transparent;'");
		txtDiv.appendChild(document.createTextNode(caption));
		document.body.appendChild(txtDiv);
		var ttW=txtDiv.offsetWidth+3;
		var ttH=txtDiv.offsetHeight-2;
		if (ZLM.isIE) {
			ttW+=6;
			ttH+=4;
		}
		ZLM.setWidth(bbi.captionDiv,ttW);
		ZLM.setHeight(bbi.captionDiv,ttH);
		document.body.removeChild(txtDiv);
		bbi.captionDiv.appendChild(txtDiv);
		bbi.appendChild(bbi.captionDiv);
bbi.captionDiv.refDiv=bbi;
		bbi.captionDiv.style.top=(bbi.offsetHeight)+"px";
		bbi.captionDiv.style.left=(bbi.offsetWidth-2)+"px";
	}
	else bbi.captionDiv=null;
	bbi.disabled=0;

	ZLM.setLocalAttribute(bbi,"onmouseover","ZMS.raiseBBItem(this);");
	ZLM.setLocalAttribute(bbi,"onmouseout","ZMS.flattenBBItem(this);");
	ZLM.setLocalAttribute(bbi,"onmousedown","ZMS.lowerBBItem(this);");
	ZLM.setLocalAttribute(bbi,"onmouseup","ZMS.raiseBBItem(this);");
	ZLM.setLocalAttribute(bbi,"onclick","ZMS.serviceClick(event);");
}


//==
//==

ZMS.organizeMenuBar=function(mb) {
	mb.style.position="relative";
	mb.style.top="0px";
	mb.style.left="0px";
	var items =ZLM.getElementsByClassPrefix("csMenuBarItem",mb);
	var tab=0;
	for (var i=0;i<items.length;i++) {
		k=items[i];
		if (!ZLM.isZen()) ZMS.createMenuBarItemSubtree(k,20);                   // MAGIC NUMBER ALERT
		k.style.position="absolute";
		k.style.left=tab+"px";
		k.style.top="0px";
		tab+=(k.offsetWidth+1);
	}
}

// Query the system to find the optimum size for a given context 
// menu based on the topology needs of its menu items.  Add various 
// parameters to the menu object as well as sizing info for the individual items.
ZMS.estimateContextMenuSize=function(cm) {
	cm.margin = 2;
	cm.iconPad = 4;
	cm.gap = 30;
	cm.itemHeight = 20;
	cm.minWidth = 0;
	cm.iconSize=16;
	cm.cascadeSize=15;
	cm.disabled = false;

	var sire = cm.parentNode;
	if (ZLM.isZen()) cm.zenSire = sire.parentNode;
	else cm.zenSire=sire;
	ZLM.reparent(cm,document.body);
	cm.style.display="block";
	var kids = ZMS.getChildElements(cm);
	for (var i=0;i<kids.length;i++) {
		if (kids[i].className=="csMenuItem") {
			k=kids[i];
			k.style.width="2000px";
			var w=0; // nominal width
			var h=0; // nominal height
			var kCD = k.captionDiv;
			if (kCD.style.display!="none") { // normally visible do things the easy way
				if (k.keyDiv) {
					w=kCD.offsetWidth+cm.gap+k.keyDiv.offsetWidth;
					k.keyDiv.minWidth=k.keyDiv.offsetWidth;
				}
				else w=kCD.offsetWidth;
				h=kCD.offsetHeight;
			}
			else { // Need to make things visible first
				kCD.style.display = "block";
				if (k.keyDiv) {
					k.keyDiv.style.display = "block";
					w=kCD.offsetWidth+cm.gap+k.keyDiv.offsetWidth;
					k.keyDiv.minWidth=k.keyDiv.offsetWidth;
					k.keyDiv.style.display = "none";
				}
				else w=kCD.offsetWidth;
				h=kCD.offsetHeight;
				kCD.style.display = "none";
			}
			if (k.altCaptionDiv) {
				var aW = 0;
				var aH = 0;
				var kACD = k.altCaptionDiv;
				if (kACD.style.display=="none") { // need to make things visible
					kACD.style.display="block";
					aW = kACD.offsetWidth;
					aH = kACD.offsetHeight;
					if (k.altKeyDiv) {
						k.altKeyDiv.style.display="block";
						aW+=(cm.gap+k.altCaptionDiv.offsetWidth);
						k.altKeyDiv.minWidth=k.altKeyDiv.offsetWidth;
						k.altKeyDiv.style.display="none";
					}
					kACD.style.display="none";
				}
				else {
					aW = kACD.offsetWidth;
					aH = kACD.offsetHeight;
					if (k.altKeyDiv) {
						aW+=(cm.gap+k.altKeyDiv.offsetWidth);
						k.altKeyDiv.minWidth=k.altKeyDiv.offsetWidth;
					}
				}
				if (aW>w) w=aW;
				if (aH>h) h=aH;

				k.altCaptionDiv.minHeight = h;
			}
			k.captionDiv.minHeight = h;
			if (w>cm.minWidth) cm.minWidth=w;
		}
	}
	cm.style.display="none";
	ZLM.reparent(cm,sire);
	cm.minWidth+=(2*cm.margin+cm.iconSize+cm.cascadeSize+2*cm.iconPad);
}

ZMS.setContextMenuSize=function(cm) {
	var colorInit=0;
	var top = cm.margin;
	var kids = ZMS.getChildElements(cm);
	for (var i=0;i<kids.length;i++) {
		var k=kids[i];
		if (k.className=="csMenuItem") {
			if (colorInit==10) {
				cm.style.background=ZLM.toHTMLColorSpec(ZLM.getRGBBackgroundColor(k));
				colorInit=1;
			}

			k.style.top=top+"px";
			k.style.left="0px";
			k.style.width=cm.minWidth+"px";
			k.style.height=cm.itemHeight+"px";
			var iconTop = ((cm.itemHeight-cm.iconSize)/2)+"px";
			var captionTop = ((cm.itemHeight-k.captionDiv.minHeight)/2)+"px";
			if (k.iconDiv) {
				k.iconDiv.style.top = iconTop;
				k.iconDiv.style.left=cm.margin+"px";
			}
			if (k.grayIconDiv) {
				k.grayIconDiv.style.top = iconTop;
				k.grayIconDiv.style.left=cm.margin+"px";
			}
			if (k.altIconDiv) {
				k.altIconDiv.style.top = iconTop;
				k.altIconDiv.style.left=cm.margin+"px";
			}
			if (k.captionDiv) {
				k.captionDiv.style.top = captionTop;
				k.captionDiv.style.left=(cm.margin+cm.iconSize+cm.iconPad)+"px";
			}
			if (k.altCaptionDiv) {
				k.altCaptionDiv.style.top= captionTop;
				k.altCaptionDiv.style.left=(cm.margin+cm.iconSize+cm.iconPad)+"px";
			}
			if (k.keyDiv) {
				k.keyDiv.style.top= captionTop;
				k.keyDiv.style.left=(cm.minWidth-cm.margin-cm.cascadeSize-cm.iconPad-k.keyDiv.minWidth)+"px";
			}
			if (k.altKeyDiv) {
				k.altKeyDiv.style.top= captionTop;
				k.altKeyDiv.style.left=(cm.minWidth-margin-cm.cascadeSize-cm.iconPad-k.altKeyDiv.minWidth)+"px";
			}
			if (k.cascadeDiv) {
				k.cascadeDiv.style.top=((cm.itemHeight-cm.cascadeSize)/2)+"px";
				k.cascadeDiv.style.left=(cm.minWidth-cm.margin-15)+"px";
				k.cascadeDivInv.style.top=((cm.itemHeight-cm.cascadeSize)/2)+"px";
				k.cascadeDivInv.style.left=(cm.minWidth-cm.margin-15)+"px";
			}
			top+=cm.itemHeight;
		}
		if (k.className=="csMenuSeparator" ) {
			ZLM.setSize(k, cm.minWidth-4*cm.margin,1, "1px inset gray");
			ZLM.setLocalAttribute(k,"onmouseover","return(ZLM.killEvent(event));");      
			k.style.top=(top+1)+"px";
			k.style.left=cm.margin+"px";
			top+=5;
		}
	}
	ZLM.setSize(cm, cm.minWidth, top, "2px outset #d0d0d0");
	if (cm.zenSire) {
		var pc = cm.zenSire.className;
		if (!(pc=="csMenuBarItem"||pc=="csMenuItem")) {
			ZLM.setLocalAttribute(cm.zenSire,"oncontextmenu","return(ZMS.showContextMenu(event,document.getElementById('"+cm.id+"')));");
		}
	}
ZLM.registerShortCut("down","ZMS.serviceCMKeyNav('"+cm.id+"','v');",cm.id);
ZLM.registerShortCut("up","ZMS.serviceCMKeyNav('"+cm.id+"','^');",cm.id);
ZLM.registerShortCut("right","ZMS.serviceCMKeyNav('"+cm.id+"','>');",cm.id);
ZLM.registerShortCut("left","ZMS.serviceCMKeyNav('"+cm.id+"','<');",cm.id);
ZLM.registerShortCut("return","ZMS.serviceCMKeyNav('"+cm.id+"','!');",cm.id);

}

//???? MAGIC NUMBERS !!!
ZMS.sizeMenuBar=function(mb) {
//  if (ZLM.isZen()) mb.style.width="100%";
	ZLM.setHeight(mb,20);
}

//===========Utility============//

// Given the nomimal caption for a menuBarItem or menuItem, create 
// a subtree that holds that caption, underlining the first occurence 
// of a context keystroke (if any) withing the caption label.
ZMS.makeCaptionSubtree=function(caption,key) {
	if (!caption) return(null);
	var captionDiv=ZLM.simulateTag("div style='position:absolute;'");
	captionDiv.valueStr=caption;
	if (key) {
		var idxLC=caption.indexOf(key.toLowerCase());
		var idxUC=caption.indexOf(key.toUpperCase());
		var keyIdx= -1;
		if (idxLC>=0) keyIdx=idxLC;
		if (idxUC>=0 && (idxUC<keyIdx || keyIdx== -1)) keyIdx=idxUC;
		if (keyIdx>=0) {
			if (keyIdx>0) {
				var sp = ZLM.simulateTag("span style='text-decoration:none;'");
				sp.appendChild(document.createTextNode(caption.substring(0,keyIdx)));
				captionDiv.appendChild(sp);   
			}
			var sp = ZLM.simulateTag("span style='text-decoration:underline;'");
			sp.appendChild(document.createTextNode(caption.substring(keyIdx,keyIdx+1)));
			captionDiv.appendChild(sp);   
			caption = caption.substring(keyIdx+1);
		}
	}
	captionDiv.appendChild(document.createTextNode(caption));
	return(captionDiv);
}

//=============<MENU_BAR_ITEM>=======================//
ZMS.createMenuBarItemSubtree=function(mbi,barHeight) {
	mbi.style.background="transparent";
	mbi.activeDiv = ZLM.simulateTag("div class='csActiveMenuItem' style='width:100%; height:100%; position:relative; top:0px; left:0px; display:none;'");
	mbi.appendChild(mbi.activeDiv);
	var caption = mbi.getAttribute("caption");
	var key=mbi.getAttribute("contextKey");
	mbi.captionDiv=ZMS.makeCaptionSubtree(caption,key);
	if (mbi.captionDiv) {
		if (key) ZLM.registerShortCut("alt-"+key.toLowerCase(),"ZMS.serviceBarPick('"+caption+"');","page");
		mbi.appendChild(mbi.captionDiv);
		var rawW = mbi.captionDiv.offsetWidth;
		var rawH = mbi.captionDiv.offsetHeight;
		if (rawW==0 || rawH==0) {
			var tmpN = mbi.captionDiv.cloneNode(true);
			tmpN.className = mbi.className;
			tmpN.id = mbi.id;
			document.body.appendChild(tmpN);
			rawW = tmpN.offsetWidth;
			rawH = tmpN.offsetHeight;
			document.body.removeChild(tmpN);
		}
		mbi.style.width=(rawW+rawH)+"px";
		mbi.style.height=barHeight+"px";
		mbi.captionDiv.style.top=(barHeight-rawH)/2+"px";
		mbi.captionDiv.style.left=rawH/2+"px";
		mbi.captionDiv.style.whiteSpace="nowrap";
		ZLM.setLocalAttribute(mbi,"onclick","ZMS.serviceBarClick(event);");
		ZLM.setLocalAttribute(mbi,"onmouseover","ZMS.highlight(this);");
		ZLM.setLocalAttribute(mbi,"onmouseout","ZMS.lowlight(this);");
	}  
	mbi.disabled=0;
}

//====================<MENU_ITEM>==============================//
// for the given menuItem Specification, break the DOM DIV into a 
// mini-tree representing a menuItem structure for later sizing 
// and positioning adding quick reference hooks as needed
//  cascade: arrow button icon for cascading menu
//  icon: default icon (if specified)
//  grayIcon: icon to use if menu Item is disabled (if un-specified 
//     icon hidden while disabled)
//  caption: default text of menu pick
//  key: mnemonic encoding for button
//  contextKey: transient mnemonic encoding for button
//  altCaption: alternative caption for a toggled menu pick
//  altKey: alternative mnemonic encoding for toggled menu pick
//  altIcon: alternative icon for toggled menu pick or a checkmark 
//     icon if toggle but no alternative

ZMS.createMenuItemSubtree=function(mi) {
	if (ZLM.isZen()) mi.parentMenuId = mi.parentNode.parentNode.id;
	else mi.parentMenuId=mi.parentNode.id;
	mi.subMenuDiv = ZMS.getSubMenu(mi);
	mi.activeDiv = ZLM.simulateTag("div class='csActiveMenuItem' style='width:100%; height:100%; position:absolute; top:0px; left:0px; display:none;'");
	mi.appendChild(mi.activeDiv);
	if (mi.subMenuDiv!=null) {
		mi.cascadeDiv = ZLM.simulateTag("img src='"+ZMS.RightArrowIcon+"' width='15' height='15' style='position:absolute;width:15px;height:15px;'");
		mi.cascadeDivInv=ZLM.simulateTag("img src='"+ZMS.InvRightArrowIcon+"' width='15' height='15' style='position:absolute;width:15px;height:15px;display:none;'");
		mi.appendChild(mi.cascadeDivInv);
		mi.appendChild(mi.cascadeDiv);
	}
	var icon = mi.getAttribute("icon");
	if (icon) {
		mi.iconDiv=ZLM.simulateTag("img src='"+icon+"' width='16' height='16' style='position:absolute;width:16px;height:16px;'");
		mi.appendChild(mi.iconDiv);
	}
	var grayIcon = mi.getAttribute("grayIcon");
	if (grayIcon) {
		mi.grayIconDiv=ZLM.simulateTag("img src='"+grayIcon+"' width='16' height='16' style='position:absolute;width:16px;height:16px;display:none;'");
		mi.appendChild(mi.grayIconDiv);
	}
	var caption = mi.getAttribute("caption");
	var conKey=mi.getAttribute("contextKey");
	mi.captionDiv=ZMS.makeCaptionSubtree(caption,conKey);
	if (mi.captionDiv) {
		if (conKey) {
			ZLM.registerShortCut(conKey.toLowerCase(),"ZMS.servicePick('"+caption+"');",mi.parentMenuId);
			ZLM.registerShortCut("alt-"+conKey.toLowerCase(),"ZMS.servicePick('"+caption+"');",mi.parentMenuId);
		}
		mi.appendChild(mi.captionDiv);
	}
	var key = mi.getAttribute("key");
	if (key) {
		ZLM.registerShortCut(key.toLowerCase(),mi.getAttribute("onselect"),"page");
		mi.keyDiv=ZLM.simulateTag("div style='position:absolute;'");
		mi.keyDiv.appendChild(document.createTextNode(key));
		mi.appendChild(mi.keyDiv);
	}
	var altCaption = mi.getAttribute("altCaption");
	var toggleMode = false;
	var tmAttr = mi.getAttribute("toggleMode");
	if (tmAttr==1 || tmAttr=="true" || tmAttr==true) toggleMode = true;
	if (altCaption) {
		mi.altCaptionDiv=ZLM.simulateTag("div style='position:absolute; display:none;'");
		mi.altCaptionDiv.appendChild(document.createTextNode(altCaption));
		mi.appendChild(mi.altCaptionDiv);
		var altKey = mi.getAttribute("altKey");
		if (altKey) {
			var altAct = mi.getAttribute("onaltselect");
			if (altAct) registerShortCut(altKey.toLowerCase(),altAct,"page");
			else registerShortCut(altKey,mi.getAttribute("onselect"),"page");
			mi.altKeyDiv=ZLM.simulateTag("div style='position:absolute; display:none;'");
			mi.altKeyDiv.appendChild(document.createTextNode(altKey));
			mi.appendChild(mi.altKeyDiv);
		}
		var altIcon = mi.getAttribute("altIcon");
		if (altIcon) {
			mi.altIconDiv=ZLM.simulateTag("img src='"+altIcon+"' width='16' height='16' style='position:absolute;width:16px;height:16px;visibility:hidden;'");
			mi.appendChild(mi.altIconDiv);
		}
	}
	else if (toggleMode) {
		if (mi.iconDiv) {
			mi.removeChild(mi.iconDiv);
			mi.iconDiv=null;
		}
		mi.altIconDiv=ZLM.simulateTag("img src='"+ZMS.CheckmarkIcon+"' width='16' height='16' style='position:absolute;width:16px;height:16px;display:none;'");
		mi.appendChild(mi.altIconDiv);
	}
	mi.toggleMode = toggleMode;
	mi.toggleState = 0;
	mi.disabled=0;	
	var a=0;
	var tTemp=mi.parentNode;
	while((a==0)&&(typeof(tTemp)!='undefined')){
		a=tTemp.getAttribute("zen");
		tTemp=tTemp.parentNode;
	}
	ZLM.setLocalAttribute(mi,"onclick","ZMS.serviceClick(event,'"+a+"');");
	ZLM.setLocalAttribute(mi,"onmouseover","ZMS.highlight(this);return(ZLM.killEvent(event));");
	ZLM.setLocalAttribute(mi,"onmouseout","ZMS.lowlight(this);return(ZLM.killEvent(event));");
}  

//==============================================================//
//====================<COMBO_ITEM>==============================//
//==============================================================//
ZMS.autoCountCombo=0;

ZMS.serviceComboText=function(who) {
	var b=ZLM.getAncestor(who,"csComboBoxText");
	if (b!=null) {
		var base = b.parentNode.parentNode;
		if (!base.id) { // Should never happen under Zen but possible unter HTML
			base.id="_ComboBox_"+ZMS.autoCountCombo;
			ZMS.autoCountCombo++;
		}
		b.oldColor=ZLM.getRGBColor(b);
		b.oldBg = ZLM.getRGBBackgroundColor(b);
		base.quickDex="";

base.freeForm=false;

		ZLM.registerKeyFilter(ZLM.KeysAll,"ZMS.serviceComboQuickFind('"+base.id+"',keyName,mods);","csComboBoxText");
		ZLM.pushKeyContext("csComboBoxText");
		b.style.background="cyan";
	}
}

ZMS.serviceComboQuickFind=function(id,keyName,mods) {
	var base = document.getElementById(id);
	var consumed=false;
	var newVal=null;
	if (base) {
		var csThis=base;
		if (keyName=="return" || keyName=="tab" || mods.indexOf("alt")>=0 || mods.indexOf("ctrl")>=0) {
			// All of the above cases turn off quickFind feature
			base.txtDiv.style.background=ZLM.toHTMLColorSpec(base.txtDiv.oldBg);
			ZLM.popKeyContext("csComboBoxText");
			if (mods.indexOf("alt")>=0 || mods.indexOf("ctrl")>=0) return(false); // don't consume this
		}
		if (keyName=="right" || keyName=="left") {
			// All of the above cases might turn off quickFind feature but we need to check a few things
			// for now, assume they're bad
			base.txtDiv.style.background=ZLM.toHTMLColorSpec(base.txtDiv.oldBg);
			ZLM.popKeyContext("csComboBoxText");
		}
		if (keyName=="down" || keyName=="up") {
			// This puts us into sequential select mode, the prefix no longer matters, it was just a stating point
			consumed=true;
			base.quickDex="";
			if (keyName=="down") var offset=1;
			else var offset= -1;
			newVal=ZMS.seekSequentialComboOption(base,base.value,offset);
		}
		if (keyName=="backspace" || keyName=="delete") {
			consumed=true;
			if (base.quickDex.length>0) base.quickDex=base.quickDex.substr(0,base.quickDex.length-1);
			newVal = ZMS.searchComboOptions(base,base.quickDex);
		}
		if (ZLM.KeysPrintable.indexOf(keyName)>=0) {
			consumed=true;
			newVal = ZMS.searchComboOptions(base,base.quickDex+keyName);
			if (newVal!=null) base.quickDex+=keyName;
		}
		if (newVal!=null) {
			if (newVal.captionDiv.valueStr) base.value=newVal.captionDiv.valueStr;
			base.txtNode.deleteData(0,base.txtNode.length);
			base.txtNode.appendData(newVal.captionDiv.valueStr);
			var notify=base.getAttribute("onchange");
			if (notify!=null) eval(notify);
		}
	}
	return(consumed); // Not something we care about, let others check
}

ZMS.serviceCombo=function(who) {
	if (!who.menuDiv) ZLM.cerr("No options defined for comboBox, ID: "+who.id);
	else {
		ZMS.showPullDownMenu(ZLM.getAbsoluteOffsetLeft(who),ZLM.getAbsoluteOffsetTop(who)+who.offsetHeight+3,who.menuDiv);
	}
}

ZMS.serviceComboClick=function(e) {
	if (ZLM.isIE) var who = window.event.srcElement;
	else var who=e.target;
	while (who.className!="csComboBoxItem" && who!=document.body) who=who.parentNode;
	if (who==document.body) return;
	ZMS.serviceComboPick(who.getAttribute("caption"),who.getAttribute("value"));
}

ZMS.serviceComboPick=function(caption,value) {
	if (!ZMS.menuObj.comboDiv) return;
	var cb=ZMS.menuObj.comboDiv;
	if (value) cb.value=value;
	else cb.value=caption;
	cb.txtNode.deleteData(0,cb.txtNode.length);
	cb.txtNode.appendData(caption);
	ZMS.closeMenu(null);
	var csThis = cb; //local var reference for eval below
	var notify = cb.getAttribute("onchange");
	if (notify!=null) eval(notify);
}

ZMS.searchComboOptions=function(box,prefix) {
	var menu = box.menuDiv;
	for (var k=menu.firstChild;k!=null;k=k.nextSibling) { 
		if (k.nodeType==1 && k.className=="csComboBoxItem" ) {
			var tstStr = k.captionDiv.valueStr.toLowerCase();
			if (tstStr.indexOf(prefix)==0) return(k);
		}
	}
	return(null);  
}

ZMS.seekSequentialComboOption=function(box,option,offset) {
	var menu = box.menuDiv;
	var opt= new Array();
	var src= new Array();
	for (var k=menu.firstChild;k!=null;k=k.nextSibling) { 
		if (k.nodeType==1 && k.className=="csComboBoxItem" ) {
			opt[opt.length] = k.captionDiv.valueStr.toLowerCase();
			src[src.length] = k;
		}
	}
	option = option.toLowerCase();
	for (var i=0;i<opt.length;i++) {
		if (opt[i].indexOf(option)==0) {
			if (i+offset>=opt.length) return(src[opt.length]);
			if (i+offset<0) return(src[0]);
			return(src[i+offset]);
		}
	}
	return(null);  
}

// for the given csComboBoxItem Specification, break the DOM DIV 
// into a mini-tree representing a menuItem structure for later 
// sizing and positioning adding quick reference hooks as needed
//  icon: default icon (if specified)
//  grayIcon: icon to use if menu Item is disabled (if un-specified 
//       icon hidden while disabled)
//  caption: default text of menu pick
//  key: mnemonic encoding for button
//  contextKey: transient mnemonic encoding for button
//  altCaption: alternative caption for a toggled menu pick
//  altKey: alternative mnemonic encoding for toggled menu pick
//  altIcon: alternative icon for toggled menu pick or a checkmark 
//       icon if toggle but no alternative

ZMS.createComboItemSubtree=function(ci) {
	var caption = ci.getAttribute("caption");
	var conKey=ci.getAttribute("contextKey");
	ci.captionDiv=ZMS.makeCaptionSubtree(caption,conKey);
	if (ci.captionDiv) {
		ci.appendChild(ci.captionDiv);
	}
	ZLM.setLocalAttribute(ci,"onclick","ZMS.serviceComboClick(event);");
	ZLM.setLocalAttribute(ci,"onmouseover","ZMS.highlight(this);");
	ZLM.setLocalAttribute(ci,"onmouseout","ZMS.lowlight(this);");
}  

ZMS.createComboBoxButtonSubtree=function(ci) {
	var icon = ci.getAttribute("icon");
	var baseColor = ZLM.toHTMLColorSpec(ZLM.getRGBBackgroundColor(ci));
	if (icon==null) icon= ZMS.SmallDownArrowIcon;
	ci.iconDiv = ZLM.simulateTag("img src='"+icon+"' width='15' height='15' style='position:relative;width:15px;height:15px;'" ); 
	ci.buttonDiv = ZLM.simulateTag("div style='position:absolute; top:0px;'");
	ZLM.setSize(ci.buttonDiv, ci.clientHeight-4, ci.clientHeight-4,"2px outset "+baseColor);
	ci.buttonDiv.style.background=baseColor;
	ci.tray.appendChild(ci.buttonDiv);
	ci.buttonDiv.appendChild(ci.iconDiv);
	ci.buttonDiv.iconDiv=ci.iconDiv;
	ci.iconDiv.style.top=Math.floor((ci.buttonDiv.clientHeight-15)/2)+"px";
	ci.iconDiv.style.left=Math.floor((ci.buttonDiv.clientWidth-15)/2)+"px";
	ci.buttonDiv.style.left=(ci.tray.clientWidth-ci.buttonDiv.offsetWidth)+"px";

	ZLM.setLocalAttribute(ci.buttonDiv,"onmousedown","ZMS.lowerBBItem(this);");
	ZLM.setLocalAttribute(ci.buttonDiv,"onmouseup","ZMS.raiseBBItem(this);");
	ZLM.setLocalAttribute(ci.buttonDiv,"onclick","ZMS.serviceCombo(this.parentNode.parentNode);");
}

ZMS.createComboBoxTextSubtree=function(cb) {
	cb.txtDiv=ZLM.simulateTag("div class='csComboBoxText' style='overflow:hidden; width:100%; position:absolute; top:0px; left:0px;'");
	var div=ZLM.simulateTag("div style='width:2000px;'");
	cb.txtNode=document.createTextNode(ZLM.initAttribute(cb,"defaultCaption",""));
	cb.txtDiv.appendChild(div);
	div.appendChild(cb.txtNode);
	cb.tray.appendChild(cb.txtDiv);
	ZLM.setSize(cb.txtDiv,cb.clientWidth-cb.buttonDiv.offsetWidth-2,cb.clientHeight-2,"1px solid black");
	ZLM.setLocalAttribute(cb.txtDiv,"onclick","ZMS.serviceComboText(this);");
}

ZMS.createComboMenuSubtree=function(cb) {
	if (ZLM.isZen()) {
		var gKids = ZMS.getChildElements(cb);
		for (var i=0;i<gKids.length;i++) {
			if (gKids[i].className=="csComboBoxItem") {
				cb.removeChild(gKids[i].parentNode);
				ZLM.reparent(gKids[i],cb);
			}
		}
	}

	var kids= [];
	for (var k=cb.firstChild;k!=null;k=k.nextSibling) { 
		if (k.nodeType==1 && k.className=="csComboBoxItem" ) {
			kids[kids.length]=k;
		}
	}
	var cm = ZLM.simulateTag("div class='contextMenu'");
	if (cb.id) cm.id=cb.id+"Menu";
	document.body.appendChild(cm);
	cm.margin = 2;
	cm.itemHeight = 20;
	cm.minWidth = cb.clientWidth;
	cm.style.display="block";
  
	var top = cm.margin;
	for (var i=0;i<kids.length;i++) { 
		var k=kids[i];
		ZLM.reparent(k,cm);
		if (cm.id) {
			var conKey=k.getAttribute("contextKey");
			if (conKey) {
				ZLM.registerShortCut(conKey.toLowerCase(),"ZMS.serviceComboPick('"+k.getAttribute("caption")+"',"+k.getAttribute("value")+");",cm.id);
			}
		}
		k.style.width="2000px";
		var w=k.captionDiv.offsetWidth;
		if (w>cm.minWidth) cm.minWidth=w;
	}
	for (var i=0;i<kids.length;i++) { 
		var k=kids[i];
		k.style.top=top+"px";
		k.style.left=cm.margin+"px";
		k.style.width=(cm.minWidth-cm.margin)+"px";
		k.style.height=cm.itemHeight+"px";
		top+=cm.itemHeight;
	}
	if (ZLM.isIE) {
		cm.style.width=(cm.minWidth+2*cm.margin+2)+"px";
		cm.style.height=(top+2*cm.margin+2)+"px";
		cm.minHeight = top;
	}
	else {
		cm.style.width=(cm.minWidth-cm.margin)+"px";
		cm.style.height=(top-cm.margin)+"px"; 
		cm.minHeight = top;
	}
	cm.style.display="none";
	cm.comboDiv=cb;
	ZLM.reparent(cm,cb);
	cb.menuDiv=cm;
}

ZMS.updateComboMenu=function(cm) {
// SHOULD DECONFLICT THIS WITH CREATION ROUTINE ABOVE TO SAVE CODE
	var kids= new Array();
	for (var k=cm.firstChild;k!=null;k=k.nextSibling) { 
		if (k.nodeType==1 && k.className=="csComboBoxItem" ) {
			kids[kids.length]=k;
		}
	}
	document.body.appendChild(cm);
	cm.minWidth = cm.comboDiv.clientWidth;
	cm.style.display="block";
	var top = cm.margin;
	for (var i=0;i<kids.length;i++) { 
		var k=kids[i];
		if (cm.id) {
			var conKey=k.getAttribute("contextKey");
			if (conKey) {
				ZLM.registerShortCut(conKey.toLowerCase(),"ZMS.serviceComboPick('"+k.getAttribute("caption")+"',"+k.getAttribute("value")+");",cm.id);
			}
		}
		k.style.width="2000px";
		var w=k.captionDiv.offsetWidth;
		if (w>cm.minWidth) cm.minWidth=w;
	}
	for (var i=0;i<kids.length;i++) { 
		var k=kids[i];
		k.style.top=top+"px";
		k.style.left=cm.margin+"px";
		k.style.width=(cm.minWidth-cm.margin)+"px";
		k.style.height=cm.itemHeight+"px";
		top+=cm.itemHeight;
	}
	if (ZLM.isIE) {
		cm.style.width=(cm.minWidth+2*cm.margin+2)+"px";
		cm.style.height=(top+2*cm.margin+2)+"px";
		cm.minHeight = top;
	}
	else {
		cm.style.width=(cm.minWidth-cm.margin)+"px";
		cm.style.height=(top-cm.margin)+"px"; 
		cm.minHeight = top;
	}
	cm.style.display="none";
	ZLM.reparent(cm,cm.comboDiv);
}

ZMS.organizeComboBox=function(cb) {
	var dCap=ZLM.initAttribute(cb,"defaultCaption","");
	var dVal=ZLM.initAttribute(cb,"defaultValue",dCap);
	cb.value=dVal;
	cb.tray=ZLM.simulateTag("div style='width:100%; height:100%; position:relative; top:0px; left:0px;'");
	cb.appendChild(cb.tray);

	ZMS.createComboBoxButtonSubtree(cb);
	ZMS.createComboBoxTextSubtree(cb);
	ZMS.createComboMenuSubtree(cb);
}

ZMS.getComboBoxMenu=function(box) {
	return(box.menuDiv);
}

ZMS.attribute=function(name,value) {
	if (value) return(name+"='"+value+"' ");
	else return("");
}

ZMS.addComboMenuItem=function(box,caption,value,style,updateLater) {
	var pick=ZLM.simulateTag("div class='csComboBoxItem' "+ZMS.attribute("style",style)+ZMS.attribute("caption",caption)+ZMS.attribute("value",value)); 
	box.menuDiv.appendChild(pick);
	ZMS.createComboItemSubtree(pick);
	if (updateLater!=1) ZMS.updateComboMenu(box.menuDiv);
}

//============================================================
//=== FONT PICKER == NOT USED BY ZEN (HAS OWN CLS MODULE) ====
//============================================================
ZMS.createFontPickerSubtree=function(fp) {
	if (ZLM.isIE) fp.style.height="32px";
	else fp.style.height="24px";
	fp.style.border="4px ridge "+ZLM.toHTMLColorSpec(ZLM.getRGBBackgroundColor(fp));
	var fsWidth = fp.clientWidth-54;
	var dFont = fp.getAttribute("defaultFont");
	if (dFont==null) dFont="Select font...";
	var dSize = fp.getAttribute("defaultSize");
	fp.fontSelect=ZLM.simulateTag("div class='csComboBox' defaultCaption='"+dFont+"' style='width:"+fsWidth+"px;' onchange='ZMS.fontSelectCB(csThis);'");
	fp.appendChild(fp.fontSelect);
	ZMS.organizeComboBox(fp.fontSelect);

	var fonts = ZLM.getAvailableFonts().split(",");
	for (var i=0;i<fonts.length;i++) {
		if (fonts[i]!="") {
			ZMS.addComboMenuItem(fp.fontSelect,fonts[i],null,"font-family:"+fonts[i],1);
		}
	}
	ZMS.updateComboMenu(ZMS.getComboBoxMenu(fp.fontSelect));
	ZLM.addBoundElement(fp.fontSelect,fp,5,5,0,0);

	fp.sizeSelect=ZLM.simulateTag("div class='csComboBox' defaultCaption='"+dSize+"' style='width:50px;' onchange='ZMS.fontSelectCB(csThis);'");
	fp.appendChild(fp.sizeSelect);
	ZMS.organizeComboBox(fp.sizeSelect);

	ZMS.addComboMenuItem(fp.sizeSelect,"9",null,null,1);
	ZMS.addComboMenuItem(fp.sizeSelect,"10",null,null,1);
	ZMS.addComboMenuItem(fp.sizeSelect,"12",null,null,1);
	ZMS.addComboMenuItem(fp.sizeSelect,"14",null,null,1);
	ZMS.addComboMenuItem(fp.sizeSelect,"16",null,null,1);
	ZMS.addComboMenuItem(fp.sizeSelect,"18",null,null,1);
	ZMS.addComboMenuItem(fp.sizeSelect,"24",null,null,1);
	ZMS.addComboMenuItem(fp.sizeSelect,"36",null,null,1);
	ZMS.updateComboMenu(ZMS.getComboBoxMenu(fp.sizeSelect));
	ZLM.addBoundElement(fp.sizeSelect,fp,fsWidth+7,5,0,0);

	ZMS.fontSelectCB(fp.fontSelect);
}

ZMS.fontSelectCB=function(cb) {
	if (cb) {
		who=cb.parentNode;
		who.font = who.fontSelect.value;
		who.size = who.sizeSelect.value;
		who.fontSelect.style.fontFamily=who.font;
	}
}

/////////////////////
// BASE INIT STUFF //
/////////////////////
ZMS.mouseTrapSnap=function(event) {
if (Math.abs(event.clientX-ZMS.mouseTrap.initX)<5) return;
if (Math.abs(event.clientY-ZMS.mouseTrap.initY)<5) return;
//ZMS.closeMenu(event);
}

ZMS.initialize=function() {
	if (ZMS.initialized==1) return;
	ZMS.initMenuStyle();
	var styleStr = "'display:none; position:absolute; top:0px; left:0px; width:"+Math.max(ZMS.getWindowWidth()-20,1)+"px; height:"+Math.max(ZMS.getWindowHeight()-20,1)+"px; z-index:"+ZMS.MouseTrapLayer+";'";
	ZMS.mouseTrap = ZLM.simulateTag("div id='ZMSMouseTrap' style="+styleStr+" onclick='ZMS.closeMenu(event);' oncontextmenu='ZMS.ignore(event);' onmouseup='ZMS.ignore(event);' onmouseover='ZMS.mouseTrapSnap(event);'");
	document.body.appendChild(ZMS.mouseTrap);
	//document.oncontextmenu=ZMS.ignore;
	ZLM.initKeyboardHandler();
	ZLM.registerShortCut("escape","ZMS.closeMenu(null);","page");
	ZLM.pushKeyContext("page");
	ZMS.initialized=1;  
}

ZMS.initMenusCSP=function() {
	if (!ZLM.isZen()) {
		//override Zen Defaults
		ZMS.DownArrowIcon="images/DownArrow.png";
		ZMS.SmallDownArrowIcon="images/SmDownArrow.png";
		ZMS.UpArrowIcon="images/UpArrow.png";
		ZMS.RightArrowIcon="images/RtArrow.png";
		ZMS.CheckmarkIcon="images/Checkmark.png";

		// compensate for lack of individual widget class initializers
		var styleStr = "'display:none; position:absolute; top:0px; left:0px; width:"+Math.max(ZMS.getWindowWidth()-20,1)+"px; height:"+Math.max(ZMS.getWindowHeight()-20,1)+"px; z-index:"+ZMS.MouseTrapLayer+";'";
		ZMS.mouseTrap = ZLM.simulateTag("div style="+styleStr+" onclick='ZMS.closeMenu(event);' oncontextmenu='ZMS.ignore(event);' onmouseup='ZMS.ignore(event);'");
		document.body.appendChild(ZMS.mouseTrap);
		//document.oncontextmenu=ZMS.ignore;
		ZLM.initKeyboardHandler();
		ZLM.registerShortCut("escape","ZMS.closeMenu(null);","page");
		ZLM.pushKeyContext("page");

		var items = ZLM.getElementsByClassPrefix("buttonBar",document.body);
		for (var i=0;i<items.length;i++) {
			if (items[i].className=="buttonBar") {
				ZMS.sizeButtonBar(items[i]);
			}
		}

		var items = ZLM.getElementsByClassPrefix("csMenuItem",document.body);
		for (var i=0;i<items.length;i++) {
			ZMS.createMenuItemSubtree(items[i]);
		}
	} 
 
	// ONCE ALL THE MENU ITEMS HAVE BEEN DEALT WITH, WE CAN ADDRESS THE SIZE OF THE MENUS THEMSEVLES
	var menus = ZLM.getElementsByClassPrefix("contextMenu",document.body);
	for (var i=0;i<menus.length;i++) {
		ZMS.estimateContextMenuSize(menus[i]);
		ZMS.setContextMenuSize(menus[i]);
	}

	if (!ZLM.isZen()) {
		var bars =ZLM.getElementsByClassPrefix("csMenuBar",document.body);
		for (var i=0;i<bars.length;i++) {
			ZMS.sizeMenuBar(bars[i]);
		}
		for (var i=0;i<bars.length;i++) {
			ZMS.organizeMenuBar(bars[i]);
		}


		var comboIs = ZLM.getElementsByClassPrefix("csComboBoxItem",document.body);
		for (var i=0;i<comboIs.length;i++) {
			ZMS.createComboItemSubtree(comboIs[i]);
		}

		var combos = ZLM.getElementsByClassPrefix("csComboBox",document.body);
		for (var i=0;i<combos.length;i++) {
			ZMS.organizeComboBox(combos[i]);
		}

		var fpicks = ZLM.getElementsByClassPrefix("csFontPicker",document.body);
		for (var i=0;i<fpicks.length;i++) {
			ZMS.createFontPickerSubtree(fpicks[i]);
		}

		ZMS.initialized=1;
		ZLM.refreshLayout();
	}
}
  
/////////////////////////////////////////////////////////////
/// SHOULD PROBABALY ADD THESE FUNCTIONS TO zenCSLM.js
///////////////////////////////////////////////////////////////

ZMS.getWindowWidth = function() {
	return(document.body.clientWidth);
}

ZMS.getWindowHeight = function() {
	return(document.body.clientHeight);
}
 
ZMS.getPageXOffset = function() {
	if (ZLM.isIE) return(document.body.scrollLeft);
	return(window.pageXOffset);
}

ZMS.getPageYOffset = function() {
	if (ZLM.isIE) return(document.body.scrollTop);
	return(window.pageYOffset);
}

ZMS.getChildElements=function(node) {
	var kids = new Array();
	if (ZLM.isZen()) { // scan grandchildren (skip wrapper layer)
		for (var dK=node.firstChild;dK!=null;dK=dK.nextSibling) {
			if (dK.nodeType==1) {
				for (var gK=dK.firstChild;gK!=null;gK=gK.nextSibling) {
					if (gK.nodeType==1) kids[kids.length]=gK;
				}
			}
		}
	} 
	else { // in HTML there is no wrapper layer, should work as is
		for (var k=node.firstChild;k!=null;k=k.nextSibling) {
			if (k.nodeType==1) kids[kids.length]=k;
		}
	}
	return(kids);
}

 