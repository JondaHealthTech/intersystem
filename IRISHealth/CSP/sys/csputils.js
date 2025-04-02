function strip_whitespace(string)
{
	return string.replace(/^\s*|\s*$/g,'');
}

/// passing in an object and we strip off white spaces and reset the value of the object to upper case.
function changeName(thisObj)
{
	thisObj.value = strip_whitespace(thisObj.value.toUpperCase());
}

/// Utility code to allow CSP popups to recognise when they have been launched from a Zen page
/// and whether it was as a soft modal.
var zenLaunch = false;
var isSoftModal = false;
if (!window.zenPage) zenPage = null;

var searchParms = self.document.location.search.toString().substring(1).split('&');
var done = { "softModal": false, "zenLaunch": false };
for (var i=0; i < searchParms.length; i++) {
	if ((!done.softModal) && (searchParms[i].substring(0,15) == '$ZEN_SOFTMODAL=')) {
		isSoftModal = !!searchParms[i].substring(15);
		if (!zenPage) zenPage = {};
		done.softModal = true;
	}
	else if ((!done.zenLaunch) && (searchParms[i].substring(0,10) == 'zenLaunch=')) {
		zenLaunch = true;
		done.zenLaunch = true;
	}
	if (done.zenLaunch && done.softModal) break;
}
delete searchParms;
delete done;

/// Mimic the firePopupAction() method implemented for Zen popups.
function cspFirePopupAction(action,value,close)
{
	action = (action == null || action == undefined) ? '' : action;
	value = (value == null || value == undefined) ? '' : value;
	close = (closed == null || closed == undefined) ? true : close;

	// these may contain encoded data
	if ('string' == typeof action) {
		action = decodeURIComponent(action);
	}
	if ('string' == typeof value) {
		value = decodeURIComponent(value);
	}

	// notify our parent component
	// if this is an IE modal dialog, deal with it
	if (window.dialogArguments && window.dialogArguments.popupActionHandler) {
		window.dialogArguments.popupActionHandler(this.popupParent,window.dialogArguments._popupName,action,value);
	}
	else {
		var opener = getOpener();
		if (opener && opener.zenPage && opener.zenPage.popupActionHandler) {
			// use synchronous mode in our parent to avoid FireFox async issues
			// add try/catch avoid permissions issues on IE
			try {
				var mode = opener.zenSynchronousMode;
				opener.zenSynchronousMode = true;
				opener.zenPage.popupActionHandler(this.popupParent,opener.zenPage._popupName,action,value);
				opener.zenPopupWindow = null;
				opener.zenSynchronousMode = mode;
			}
			catch (ex) {}
		}
	}

	// close our window
	if (close) {
		if (isSoftModal) {
			if (window.top && window.top.zenPage) {
				var parentPage = window.top.zenPage;
				if (parentPage.modalStack) {
					var modalGroup = parentPage.modalStack[parentPage.modalStack.length - 1];
					if (modalGroup) modalGroup._canClose = true;
				}
				parentPage.endModal();
			}
		}
		else {
			window.close();
		}
	}
}

function closeWin()
{
	if (zenLaunch) cspFirePopupAction('close','',true);
}

/// Get a reference to the opening window.
function getOpener()
{
	if (zenLaunch && isSoftModal) {
		if (zenPage && zenPage._rootWindow) return zenPage._rootWindow;
		if (window.top) return window.top;
	}
	return window.opener;
}