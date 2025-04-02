/*
	Ensemble_XMLDisplay.js
	Ensemble XML Display helper code
	Copyright (c) 2011 InterSystems Corp. ALL RIGHTS RESERVED.
*/

var contractedIndex = new Object();
var contractedStack = new Object();
var toggleCounter = 0;
var messages = {
	noNamespace: 'NOTE: XML namespace information not available in your browser. XML namespace declarations will not be displayed in output.',
	expandAll: 'Expand All'
};

/// Expand all elements.
function expandAll() {
	for (var i = toggleCounter; i >= 0; i--) {
		if (contractedStack[i] != null) {
			toggleElement(contractedStack[i]);
		}
	}
}

/// Contract or expand the element with the specified id.
function toggleElement(id) {
	var contentDiv = document.getElementById('content-'+id);
	if (!contentDiv) return;
	
	if (contractedIndex[id]) {
		var indexEntry = contractedIndex[id];
		contentDiv.parentNode.replaceChild(indexEntry.oldNode, contentDiv);
		
		delete contractedIndex[id];
		delete contractedStack[indexEntry.stackPos];
	}
	else {
		var stackPos = toggleCounter++;
		var copy = contentDiv.cloneNode(true);
		contractedIndex[id] = { oldNode: copy, stackPos: stackPos };
		contractedStack[stackPos] = id;
		contentDiv.innerHTML = '...';
	}
}
/// Update messages based on current session language.
/// Performs a callback through the parent Zen page.
function getMessages() {
	if (window.parent && window.parent.zenPage && window.parent.zenPage.GetContentMessages) {
		var proxy = new window.parent.zenProxy();
		for (var prop in messages) {
			proxy[prop] = '';
		}
		var local = window.parent.zenPage.GetContentMessages(proxy);
		if (local) {
			for (var prop in local) {
				if (local[prop] != '') {
					messages[prop] = local[prop];
				}
			}
		}
	}
	var expandAll = document.getElementById('expandAllButton');
	if (expandAll) {
		expandAll.title = messages.expandAll;
		expandAll.innerHTML = messages.expandAll;
	}
	
	
	var noNS = document.getElementById('noNS');
	if (noNS) {
		noNS.innerHTML = messages.noNamespace;
	}
}
