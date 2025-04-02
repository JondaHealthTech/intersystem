/*
	enssvg.js
	Copyright (c) 2003, InterSystems Corp.
	ALL RIGHTS RESERVED

	SVG-utility functions
*/

var currZoom = 0;
var canvasHeight = 1000;
var canvasWidth = 1000;
var canvasScale = 1;

function setCanvasSize(width, height)
{
	canvasHeight = height;
	canvasWidth = width;
	var zoom = (currZoom == 0) ? 100 : currZoom;
	
	var svg = document.getElementById("svg");
	svg.setAttribute("width",canvasWidth);
	svg.setAttribute("height",canvasHeight);
	svg.setAttribute("viewBox","0 0 " + canvasWidth + " " + canvasHeight);
	
	var embed = self.document.getElementById("SVGEmbed");
	var embedHeight = canvasScale * height * (zoom / 100);
	var embedWidth = canvasScale * width * (zoom / 100);
	var displayScaleMessage = false;
	if (embedHeight > 16383) {
		embedWidth = 16383 / embedHeight * embedWidth;
		embedHeight = 16383;
		displayScaleMessage = true;
	}
	embed.height = embedHeight;
	embed.width = embedWidth;
	if (displayScaleMessage) { 
		// done after setting dimensions to avoid off-center diagram location
		alert(msgText['DTLSVGTooLarge']);
	}
	
}

// Set the zoom level
// assumes that we are contained within an embed element named SVGEmbed
function setZoom(zoom)
{	
	if (zoom == currZoom) return;
	
	var oldzoom = currZoom;
	currZoom = zoom;
	
	var embed = self.document.getElementById("SVGEmbed");
	var embedHeight = canvasScale * canvasHeight * (zoom / 100);
	var embedWidth = canvasScale * canvasWidth * (zoom / 100);
	if (embedHeight > 16383) {
		embedWidth = 16383 / embedHeight * embedWidth;
		embedHeight = 16383;
	}
	embed.height = embedHeight;
	embed.width = embedWidth;
 
 	// update context menu
 	if (oldzoom == 0) {
	 	oldzoom = 100;
 	}
	setMenuItemOption("checked","menu_zoom_" + oldzoom, "menu_zoom", false);
 	setMenuItemOption("checked","menu_zoom_" + zoom, "menu_zoom", true);

 	self.document.cookie = canvasName + '=' + currZoom;
}

// set the option for the given menu item
function setMenuItemOption(pOption, pItemId, pSubMenuId, value)
{
	var menuItems = contextMenu.childNodes.item(0).childNodes;
	var tItem;
      
	for (i = 0; i != menuItems.length - 1; i++) {
		if (menuItems.item(i).nodeType == 1) {
			tItem = menuItems.item(i);
			if (!pSubMenuId) {
				// top-level menu item
				if (tItem.getAttribute('id') == pItemId) {
					tItem.setAttribute(pOption,value ? 'yes' : 'no');
				}
			}
            else if ((tItem.nodeName == 'menu') && (tItem.getAttribute('id') == pSubMenuId)) {
				// submenu

				// loop over items in submenu
				var submenuItems = tItem.childNodes;
               
				for (j = 0; j != submenuItems.length - 1; j++) {
					tSubItem = submenuItems.item(j)
					if (tSubItem.nodeType == 1) {
						if (tSubItem.getAttribute('id') == pItemId) {
							tSubItem.setAttribute(pOption,value ? 'yes' : 'no');
						}
					}
				}
			}
		}
	}
}

// get the value of the specified cookie
function getCookie(name,def)
{
	var value = def; // default value
	var cookies = self.document.cookie;
	var pos = cookies.indexOf(name + '=');
	if (pos != -1) {
		var start = pos + 1 + name.length;
		var end = cookies.indexOf(';',start);
		if (end == -1) end = cookies.length;
		var value = unescape(cookies.substring(start,end));
	}

	return value;
}
