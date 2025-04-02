/*
	2019 SMP Reskin Project
	Interoperability pages have its own Menu style.
	This file is created to mitigate the risk of zenMenusSMP.js being loaded last,
	and it should be updated whenever the zenMenusSMP.js file is updated.
	Must be put after the original zenMenus.js file
*/

const MENU_RIGHT = '1px';
const MENU_TOP = '58px';
var menuBars = document.getElementsByClassName("csMenuBar");
var menuBar = null;
if (menuBars.length > 0) {
	menuBar = menuBars[0];
}
var menuBarItem = document.getElementsByClassName("csMenuBarItem");

/* Main Menu Button */
// Helper function to get the caption on the main Menu button
SMPgetMenuBarText = function(menuBarItem){
	var children=menuBarItem[0].children;
	var menuBarText = null;
	if (children.length>=3) {
		menuBarText=children[2];
	}
	if (!ZLM.isZen() && children.length>=2) {
		menuBarText = children[1];
	}
	return menuBarText;
};

// Update the color of the main Menu button according to its state
SMPupdateBtnMenuColor = function(contextMenuParent,menuBarText){
	if (menuBar != null) {
		if (contextMenuParent.style.display==="block") {
			menuBar.className = "csMenuBar csMenuBar-active";
			menuBarText.className = "csMenuBarText-active";
		} else {
			menuBar.className = "csMenuBar csMenuBar-static";
			menuBarText.className = "csMenuBarText-static";			
		}
	}
};

// Align the main Menu button and its context menu
SMPupdateContextMenu = function(){
	if (typeof ZMS === 'undefined') {
		/// if ZMS is not there then ignore the following menu logic
	} else {
		var menus = document.getElementsByClassName("contextMenu");	
		if (menus.length > 0) {
			var m = menus[0];
			m.setAttribute("style", "top:40px;");
			m.style.width = "141px";
			m.style.height = "135px";
			m.style.padding = "2px 0";
			m.style.border = "2px solid #d8d8d8";
			var separators = document.getElementsByClassName("csMenuSeparator");
			for (var i=0; i<separators.length; i++) {
				var s=separators[i];
				s.style.width="170px";
				s.style.height="0px";
				s.style.left="16px";
				s.style.border="1px solid #cbcbcb";
			}
		}

		ZMS.showMenuOriginal = ZMS.showMenu;
		// ZHJ039
		ZMS.showMenu=function(m,x,y){
			if (m && m.getAttribute('id')=="sourceControlMenuDiv") {
				ZMS.showMenuOriginal(m,x,y);
				return;
			}

			m.style.top = MENU_TOP;
			m.style.left = "";
			m.style.right = MENU_RIGHT;
			m.style.zIndex=ZMS.MouseTrapLayer+2;
			var contextMenuParent=document.getElementById("ZMSMouseTrap");
			contextMenuParent.style.width="100%";
			if (!ZLM.isZen()) {
				contextMenuParent = document.getElementById("menuMouseTrap");
			}
			var menuBarText = SMPgetMenuBarText(menuBarItem);
			if (menuBarText) {
				SMPupdateBtnMenuColor(contextMenuParent,menuBarText);
			}
			m.style.display="block";
		} // end of showMenu()
	} // end of ZMS
};

window.setTimeout("SMPupdateContextMenu();",200);

// Detect arbitrary click events
document.addEventListener('click', function(e) {
	// Show context menu when clicking on the main Menu button
	var target = e.target || e.srcElement;
	if (target.getAttribute('id') != "sourceControlIcon") {
		var contextMenuParent=document.getElementById("ZMSMouseTrap");
		if (contextMenuParent) {
			var menuBarText = SMPgetMenuBarText(menuBarItem);
			if (menuBarText) {
				SMPupdateBtnMenuColor(contextMenuParent,menuBarText);
			}
		}
	}
}, false);