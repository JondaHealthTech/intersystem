/*
	ISC_SourceControl.js
	InterSystems Source Control utility
	Copyright (c) 2011-2012 InterSystems Corp. ALL RIGHTS RESERVED.
*/
var _ISC_SourceControl = {
	currFunction: null,
	currEvent: null,
	currInterval: null,
	userContext: {},
	answer: 2,
	message: '',
	oldEvent: {},

	// list of events which Zen appends to the DOM last
	zenTrailingEvents: {
		'onload': true,
		'onbeforeunload': true,
		'onresize': true,
		'onkeyup': true,
		'onkeydown': true
	},

	// Ensure that correct function is in use
	checkCurrentFunction: function() 
	{
		var scObject = window._ISC_SourceControl;
		if (scObject) {
			if (scObject.currFunction) {
				// if the event appears in zenTrailingEvents, we only set
				// the event handler *after* Zen has initialised it
				if (window.zenPage && scObject.zenTrailingEvents[scObject.currEvent]) {
					if (window[scObject.currEvent]) {
						zenPage.zenPersistentPopup = true;
						scObject.oldEvent[scObject.currEvent] = window[scObject.currEvent];
						window[scObject.currEvent] = scObject.currFunction;
						scObject.clearCurrentFunction();
					}
				}
				else if (window[scObject.currEvent] == scObject.currFunction) {
					scObject.clearCurrentFunction();
				}
				else {
					if (window[scObject.currEvent]) scObject.oldEvent[scObject.currEvent] = window[scObject.currEvent];
					window[scObject.currEvent] = scObject.currFunction;
					scObject.clearCurrentFunction();
				}
			}
			else {
				scObject.clearCurrentFunction();
			}
		}
	},

	// Remove current interval check
	clearCurrentFunction: function()
	{
		var scObject = window._ISC_SourceControl;
		if (scObject) {
			scObject.currFunction = null;
			if (scObject.currInterval) clearInterval(scObject.currInterval);
			scObject.currInterval = null;
		}
	},

	// Add an interval check to confirm that the named function is assigned
	// to the specified event. Names are used to ensure that this can be
	// called from another window.
	setHandler: function(funcName, eventName, interval)
	{
		var scObject = window._ISC_SourceControl;
		if (!interval) interval = 50;

		scObject.clearCurrentFunction();
		var funcObject = (scObject[funcName] ? scObject[funcName] : window[funcName]);
		if (funcObject) {
			scObject.currEvent = eventName;
			scObject.currFunction = funcObject;
			scObject.currInterval = setInterval(scObject.checkCurrentFunction, interval);
		}
	},

	// Ensure that we get values back to the main frame and opener if they are specified
	// and get the main frame to poll for updates to the current window
	onFrameUnload: function(event)
	{
		var eventName = 'onbeforeunload';
		var scObject = window._ISC_SourceControl;

		var retVal = null;
		if (scObject && scObject.oldEvent[eventName]) {
			var func = scObject.oldEvent[eventName];
			retVal = func(event);
		}
		if (top && (top != window) && top.zenPage) {
			if (scObject && top.opener && top.opener.zenPage) {
				var zenRef = top.opener.zenPage;
				if (zenRef._currentSCData) {
					zenRef._currentSCData.answer = scObject.answer;
					zenRef._currentSCData.message = scObject.message;
					for (var prop in scObject.userContext) {
						if (!zenRef._currentSCData_Context) zenRef._currentSCData_Context = new top.opener.zenProxy();
						zenRef._currentSCData_Context[prop] = scObject.userContext[prop];
					}
				}
			}
			if (top.zenPage.addCompletionCheck && top.zenPage.checkCompletion) top.zenPage.addCompletionCheck('zenPage.checkCompletion()', 10);
		}
		if (retVal != null) return retVal;
	}
}