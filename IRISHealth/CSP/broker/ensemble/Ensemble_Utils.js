/*
	Ensemble_Utils.js
	Ensemble management portal helper code
	Copyright (c) 2011-2017 InterSystems Corp. ALL RIGHTS RESERVED.
*/

/// Display event text in detail - needed to support EnsPortal.Utils::DrawEventInfo()
function ensShowEventText(text, type, id) 
{
	zenPage._eventText = text; // store in a property for future use by the popup dialog EnsPortal.Dialog.EventTextPopup

	var url='EnsPortal.Dialog.EventTextPopup.zen?TYPE=' + type + '&ID=' + id;

	// take the unique type and id text and make that the window title
	var ieSafeTitle = type + id;

	var width = 500;
	var height = ensCalculateHeight(text, width);
	if (height > 700) height = 700;
	var features = "scrollbars,resizable,width=" + width + ",height=" + height;

	window.open(url, ieSafeTitle, features); // non-modal window
}

/// Helper method to calculate appropriate height for online help window - needed to support EnsPortal.Utils::DrawEventInfo()
function ensCalculateHeight(text, width) 
{
	var lines = text.toString().split('\n');
	// Assume 7 pixels per character
	var charsPerLine = width / 7;
	var lineCount = 0;
	for (var i = 0; i < lines.length; i++) {
		var currentLine = lines[i];
		lineCount = lineCount + Math.ceil(currentLine.length / charsPerLine);
	}
	// Assume 20 pixels per line (height), plus some vertical clearance (150)
	return ((lineCount * 20) + 150);
}

/// Helper function to correctly handle cases where a static page could be launched embedded or as a standalone window.
function handleZenAutoLogout(currentPageTimeout)
{
	try {
		var autoLogoutTime = null;
		if (window.parent && window.parent.zenAutoLogoutTimerID && window.parent.zenAutoLogoutTime) {
			// We are embedded, so let the parent page manage autologout
		}
		else if (window.opener && window.opener.zenAutoLogoutTimerID && window.opener.zenAutoLogoutTime) {
			// We were launched from a page with autologout behaviour, so use that value
			autoLogoutTime = window.opener.zenAutoLogoutTime;
		}
		else if (currentPageTimeout) {
			// We are coming from a standalone page that has a defined timeout, so use that value
			autoLogoutTime = currentPageTimeout;
		}
		if (autoLogoutTime) {
			self.zenAutoLogoutTimerID = self.setTimeout(function() {
				self.document.location.reload();
			}, autoLogoutTime);
		}
	}
	catch (ex) {}
}
