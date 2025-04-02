/// SVG based icon widget
class SAMIcon extends SAMWidget {

// FROM SUPERCLASS WE GET:
//   constructor();
//   extractContents();
//   getRelativeOffsetTop=function(element,baseFrame,offset);
//   getPageOffsetTop(element);
//   getRelativeOffsetLeft=function(element,baseFrame,offset);
//   getPageOffsetLeft(element);
//   initStyles() {
//   initializeProperty(name,dflt);
//   createElement(tagName, attr);
//   createSVG(e,attrs);
//   refresh();


/// Return an extended string holding any desired, stylesheet
/// definition code.
getDefaultCSS() {
	const css = `
		.root {
			position: relative;
			width:100%;
			height:100%;
			display:inline-block;
		}
		.base {
			width:100%;
			height:100%;
			position:relative;
		}
	`;
	return(css);
};

/// Set initial public and private properties for the widget
initData() {
	this.initializeProperty("glyph","");
	this.renderMap = {
		"Edit":[
			{tag:"path",attr:{"d":"M0 0h24v24H0V0z","fill":"none"}},
			{tag:"path",attr:{"d":"M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"}}
		],
		"Publish":[
			{tag:"path",attr:{"d":"M0 0h24v24H0V0z","fill":"none"}},
			{tag:"path",attr:{"d":"M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"}}
		],
		"Delete":[
			{tag:"path",attr:{"d":"M0 0h24v24H0V0z","fill":"none"}},
			{tag:"path",attr:{"d":"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"}}
		]
	};
};

setGlyph(name) {
	this.glyph=name;
	this.render();
}

setColor(rgb) {
	this.svg.setAttributeNS(null,"fill", rgb);
}

setSize(w,h) {
	this.root.style.width=w;
	this.root.style.height=h;
}

/// Specific directives to supervise drawing of this widget
render() {
	if (!this.base) {
		this.base = this.createElement("div",{"className":"base"});
		this.root.appendChild(this.base);
	}
	this.base.innerHTML = "";
	this.svg = this.createSVG("svg",{"height":"100%","viewBox":"0 0 24 24","width":"100%","fill":"#000000","fit":"","preserveAspectRatio":"xMidYMid meet","focusable":"false"});		
	this.base.appendChild(this.svg);
	if (this.glyph && this.renderMap[this.glyph]) {
		const map = this.renderMap[this.glyph];
		const len = map.length;
		for (var i=0;i<len;i++) {
			var tag = this.createSVG(map[i].tag,map[i].attr);
			this.svg.appendChild(tag);
		}
	}
};

}

// Define the new element
customElements.define('sam-icon', SAMIcon);
window.$defined_SAMIcon = true;

