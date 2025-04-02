/// This is a generic template class for creating new web components
/// which attempts to constrain the basic coding style to something
/// flexible but consistent as the library grows
class SAMWidget extends HTMLElement {

constructor() {
	// Always call super first in constructor
	super();

	// Copy any child nodes to a separate holding area
	this.subNodes = this.extractContents();

	// Create a shadow root
	this.shadowDOM = this.attachShadow({mode: 'open'});

	this.root = this.createElement('span');
	this.root.setAttribute('class', 'root');
	this.controller = this;

	this.initData();

	// Attach style to root
	this.initStyles();

	// Attach the created elements to the shadow dom
	this.shadowDOM.appendChild(this.root);
	this.render();
};

/// Extract the contents of the original DOM connection point
extractContents() {
	const innerDiv = document.createElement('div');
	var kid = this.firstChild;
	while (kid) {
		var nextKid = kid.nextSibling;
		this.removeChild(kid);
		innerDiv.appendChild(kid);
		kid=nextKid;
	}
	return (innerDiv);
}

/// Find where we are with respect to some known anchor element
getRelativeOffsetTop(element,baseFrame,offset) {
	if (!offset) offset=0;
	var top=offset;
	if (element==baseFrame) return(top);
	top += element.offsetTop;
	var prev = element.offsetParent;
	if (prev==null) return(top); //element not displayed
	for (var n=element.parentNode;n!=prev;n=n.parentNode) {
		top-=n.scrollTop;
		if (n.className=='root') { // reached the top of this widget
			n = this.controller;
		}
	}
	while (prev!=baseFrame && prev!=document.body) {
		var oldP=prev;
		top+=prev.offsetTop-prev.scrollTop;
		prev=prev.offsetParent;
		for (var n=oldP.parentNode;n!=prev;n=n.parentNode) { 
			top-=n.scrollTop;
			if (n.className=='root') { // reached the top of this widget
				n = n.controller;
			}
		}
	}
	return(top);
};

/*****************************************************/
/// This generic method takes a request profile in the 
/// form of a JS object and initiates a simple HTTP Request.
/// The request profile may include the any of the following: <br />
/// url - the resourse to request <br />
/// method - the method to use, one of GET, PUT, POST, etc. <br />
/// user - user name for authentication purposes <br />
/// passwd - user password for authentication purposes <br />
/// headers - additonal headers to send <br />
/// authToken - Bearer token for authentication purposes <br />
/// acceptType - preferred MIME type for the response <br />
/// contentType - MIME type of request body <br />
/// body - content of request body <br />
/// async - flag to indicate request should be made asynchronously <br />
/// callback - method to when complete (request object will be passed in as sole parameter) <br />
submitRequest(r) {

 	// check for required properties

	if (!r || !r.method || !r.url ) return;

	// create gemeric request

	var xhr = new XMLHttpRequest();
	// customize for our request, async calls by default

	if (r.async=='undefined') r.async = true;

	xhr.open(r.method,r.url,r.async);


	// set up callback handler

	xhr.onload = function () {

  		if ((xhr.status >= 200)&&(xhr.status<300)) {

    			if (r.callback) {

					r.callback(xhr);

    			}

			else {

   				alert('Callback Finished: '+xhr.status);

			}

  		} else {

			if (r.errorCB) {

				r.errorCB(xhr);

			} else {

    				alert('An error occurred\nUse the browsers Developer Tools to inspect headers.');

  			}

	  	}

	}

	if (sessionStorage.getItem('accessToken')) {

		xhr.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem('accessToken')}`);

	}		

	if (r.authToken) xhr.setRequestHeader('Authorization', 'Bearer ' + r.authToken);

	if (r.acceptType) {

		xhr.setRequestHeader("Accept",r.acceptType);

	}

	for (p in r.headers) {

		zhr.setRequestHeader(p,r.headers[p]);

	}			

	var contents = null;

	if (typeof(r.body)!='undefined') {

		if (r.contentType) {

			xhr.setRequestHeader("Content-Type",r.contentType);

		}

		if (r.body) {

			contents = r.body;

		}

	}	

	// kick off the request

	xhr.send(contents);
	//SAMPLE CALLBACK
	// processResponse = function(xhr) {

	//  var hdr = APIExplorer.getResponseHeaders(xhr);

	//  var body = xhr.responseText;
	// }

}



getResponseHeaders(xhr) {

	var txt = xhr.getAllResponseHeaders();

	var hdr = {};

	var ls = /^\s*/;

	var ts = /\s*$/;

	var l = txt.split("\n");

	for (var i=0;i<l.length;i++) {

		var line = l[i];

		if (line.length ==0) continue;

		var pos = line.indexOf(':');

		var name = line.substring(0,pos).replace(ls,"").replace(ts,"");

		var value = line.substring(pos+1).replace(ls,"").replace(ts,"");

		hdr[name]=value;

	}

	return(hdr);

};


/*****************************************************/

getPageOffsetTop(element) {
	return(this.getRelativeOffsetTop(element,this.ownerDocument.body))
};

/// Find where we are with respect to some known anchor element
getRelativeOffsetLeft(element,baseFrame,offset) {
	if (!offset) offset=0;
	var left=offset;
	if (element==baseFrame) return(left);
	left += element.offsetLeft;
	var prev = element.offsetParent;
	if (prev==null) return(top); //element not displayed
	for (var n=element.parentNode;n!=prev;n=n.parentNode) {
		left-=n.scrollLeft;
		if (n.className=='root') { // reached the top of this widget
			n = this.controller;
		}
	}
 	while (prev!=baseFrame && prev!=document.body) {
		var oldP=prev;
		left+=prev.offsetLeft-prev.scrollLeft;
		prev=prev.offsetParent;
		for (var n=oldP.parentNode;n!=prev;n=n.parentNode) {
			left-=n.scrollLeft;
			if (n.className=='root') { // reached the top of this widget
				n = n.controller;
			}
		}
	}
	return(left);
};

getPageOffsetLeft(element) {
	return(this.getRelativeOffsetLeft(element,this.ownerDocument.body))
};

/// Create one embedded style tag based on the value returned
/// by getDefaultCSS(). Also, check to see if the widget has
/// a 'cssIncludes' property. If so, break up the CVS into a
/// series of link tags to load the desired files.
initStyles() {
	// Create some CSS to apply to the shadow dom
	const style = document.createElement('style');
	style.textContent = this.getDefaultCSS();
	this.shadowDOM.appendChild(style);
	// Allow for overrides
	if (this.hasAttribute('cssIncludes')) {
		const css = this.getAttribute('cssIncludes');
		var a = css.split(",");
		for (var i=0;i<a.length;i++) {
			var fileRef=document.createElement("link");
			fileRef.setAttribute("rel", "stylesheet");
			fileRef.setAttribute("type", "text/css");
			fileRef.setAttribute("href", a[i]);
			this.shadowDOM.appendChild(fileRef);
		}
	}
	if (this.hasAttribute('cssInject')) {
		const override = document.createElement('style');
		override.textContent = this.getAttribute('cssInject');
		this.shadowDOM.appendChild(override);

	}
};

/// INject a stylesheet of css rules into the ShadowDOM to alter the default rendering if the widget.
injectCSS(cssStr) {
	if (cssStr) {
		const override = document.createElement('style');
		override.textContent = cssStr;
		this.shadowDOM.appendChild(override);

	}
}

/// Set core properties via html tag attributes or
/// to provided default. If the provided default is
/// an object and the attribute value is a string,
/// assume a JSON encodding and parse it.
initializeProperty(name,dflt) {
	var asJSON = (typeof(dflt)==='object')
	this[name]=dflt;

	if (this.hasAttribute(name)) {
		this[name]=this.getAttribute(name);
		if (asJSON && typeof(this[name])==='string') {
			var setJSON = this[name];
			setJSON = setJSON.split("'").join('"');
			this[name] = JSON.parse(setJSON);
		}
	}
};

createElement(tagName, attr) {
	var e = document.createElement(tagName);
	if (attr) {
		for (var p in attr) {
			e[p]=attr[p];
		}
	}
	e.controller = this;
	//if (e.initData) e.initData();
	return(e);
};

createSVG(e, attrs) {
	var xmlns = "http://www.w3.org/2000/svg";
	var item = document.createElementNS(xmlns, e);
	for (var p in attrs) {
		if (p=='onclick') {
			item.addEventListener("click",attrs[p],false);
		}
		else {
			item.setAttributeNS(null, p, attrs[p]);
		}
	}
	item.controller=this;
	return item;
};

/// Return an extended string holding any desired, stylesheet
/// definition code. (SUBCLASSES SHOULD OVERRIDE THIS)
getDefaultCSS() {
	const css = `
		.root {
			position: relative;
		}

	`;
	return(css);
};

/// Generic entry point to redraw this widget
refresh() {
	this.render();
};

///
/// element: either the element that received the initial mousedown event
///          or one of its containers.  To work properly the element must have been
///          positioned using absolute positioning initially.  Its style.left and
///          style.top values will be changed based on the motion of the drag
///
/// event: the event object from the initial mousedown event
///
serviceDrag(event) {
	if (this.controller.stoneInHand!=null) return;
	var element = event.currentTarget;
	console.log(element);
	this.controller.stoneInHand=element;
	if (element==null) return;

	this.controller.startDrag(element);  //External call to whatever layout manager is in effect

	var startZ = element.style.zIndex;
	element.style.zIndex=100;

	// get the start location of the drag in window coordinates
	var startX = event.clientX;
	var startY = event.clientY;

	// get the initial position of the element being dragged (this is in doc coordinates)
	var origX = element.offsetLeft;
	var origY = element.offsetTop;

	var deltaX = startX-origX;
	var deltaY = startY-origY;

	// register event handlers that will deal with the succeeding events needed to complete the drag
	// operation (mousemove & mouseup).  Unfortunately different browsers do this differently
	// so the code is a bit more complex than it would be to support DOM 2 alone
	if (document.addEventListener) { // DOM Lvl 2
		document.$dragWidget = this.controller;
		document.addEventListener("mousemove",moveHandler,true);
		document.addEventListener("mouseup",upHandler,true);
	}

	// prevent event propagation to other handlers
	if (event.stopPropagation) event.stopPropagation();  // DOM 2
	else event.cancelBubble = true;                      // IE

	// lock out any default handling

	if (event.preventDefault) event.preventDefault(); // DOM 2
	else event.returnValue = false;                   // IE

	// Now define a couple internal functions the handle the rest of the drag operation
	// This handler captures mouse move event while the element is being dragged
	// It moves the element and swallows the event.  It is important to keep this
	// short and sweet as dragging is an expensive operation and doing it in an
	// interpreted environment only makes things worse
	function moveHandler(e) {
		if (!e) e = windowevent;  // another IE workaround
		var notIE9 = (navigator.userAgent.split("MSIE 9.0").length !=2);
		if (notIE9 && e.buttons==0) {
			upHandler(e);
			return;
		}
		// move element reletive to initial location of the drag
		element.style.left = document.$dragWidget.constrainDragX(element, e.clientX - deltaX) + "px";
		element.style.top = document.$dragWidget.constrainDragY(element, e.clientY - deltaY) +"px";

		// Now effectively kill the event
		if (event.stopPropagation) event.stopPropagation();  // DOM 2
		else event.cancelBubble = true;                      // IE
	}  // End of moveHandler

	// This handler wraps up the drag by capturing the ending mouseup event
	function upHandler(e) {
		if (!e) e = windowevent;  // another IE workaround
		document.$dragWidget.dragEndEvent=e;


		element.style.zIndex=startZ;
		// external call to layout manager for final placement
		document.$dragWidget.endDrag(element);
		document.$dragWidget.stoneInHand=null;
 		// remove the drag specific event handlers
		if (document.removeEventListener) { // DOM 2
			document.removeEventListener("mouseup",upHandler,true);
			document.removeEventListener("mousemove",moveHandler,true);
			document.$dragWidget = null;
		}


		// Now effectively kill the event
		if (event.stopPropagation) event.stopPropagation();  // DOM 2
		else event.cancelBubble = true;                      // IE
	} // End of upHandler
} // End of drag


//################

/// Set initial public and private properties for the widget
/// (SUBCLASSES SHOULD OVERRIDE THIS)
initData() {
	this.widget = this;
	this.trap = document.createElement('div');
	this.trap.style = "position:absolute; top:0px; left:0px; right:0px; bottom:0px; background-color:#000042;";
	this.trap.id=this.id+"_MouseTrap";
	this.trap.className = "mousetrap";
	this.trap.controller = this;
	this.trap.onclick = function() { this.controller.popDown(); }
	this.trap.onmousedown = function() { this.controller.popDown(); }
	this.trap.onmouseup = function() { this.controller.popDown(); }

};

/// Specific directives to supervise drawing of this widget
/// (SUBCLASSES SHOULD OVERRIDE THIS)
render() {
};


}

// Define the new element
customElements.define('sam-widget', SAMWidget);
window.$defined_SAMWidget = true;

