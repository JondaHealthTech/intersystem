/// User resizable split-screen widget
class SAMLRPanel extends SAMWidget {

/// Return an extended string holding any desired, stylesheet
/// definition code.
getDefaultCSS() {
	const css = `
		.root {
			position: absolute;
			display:block;
			top:0px;
			left:0px;
			bottom:0px;
			right:0px;
		}

		#Base {
			position:absolute;
			top:0px;
			left:0px;
			right:0px;
			bottom:0px;
			overflow:auto;
			color:rgba(0,0,0,0.87);
			font:12px Arial;	
		}

		#Handle {
			position:absolute;
			top:0px;
			left:0px;
			width:4px;
			bottom:0px;
			cursor:ew-resize;
			background-color:rgba(0,0,0,0.12);	
		}

		#LeftPanel {
			position:absolute;
			top:0px;
			left:0px;
			right:65%;
			bottom:0px;
			overflow:auto;
			border:1px solid rgba(0,0,0,0.12);
		}

		#RightPanel {
			position:absolute;
			top:0px;
			left:35%;
			right:0px;
			bottom:0px;
			overflow:auto;
			border:1px solid rgba(0,0,0,0.12);
		}
	`;
	return(css);
};

/// Set initial public and private properties for the widget
initData() {
	this.leftContent = null;
	this.rightContent = null;
	this.split = 50;
	this.isPercentage = true;
};

startDrag(who) {
	const widget = who.controller;
	console.log("drag");
};

constrainDragX(who,x) {
	console.log("move "+x);
	const w = this.ui.basePanel.offsetWidth-4;
	if (x<0) x=0;
	if (x>w) x=w;
	this.ui.leftPanel.style.right=(w-x)+"px";
	this.ui.rightPanel.style.left = (x+4)+"px";
	this.isPercentage = false;
	this.split=x;
	return(x);
};

constrainDragY(who,y) {	
	return(0);
};

endDrag(who) {
	console.log("DONE");
};

/// Specific directives to supervise drawing of this widget
render() {
	this.ui={};
	this.ui.basePanel = this.createElement('div',{id:"Base"});
	  this.ui.leftPanel = this.createElement('div',{id:"LeftPanel"});
	  if (this.leftContent) this.ui.leftPanel.appendChild(this.leftContent);
	  this.ui.handle = this.createElement('div',{id:"Handle"});
	  this.ui.handle.onmousedown = this.controller.serviceDrag;
	  this.ui.rightPanel = this.createElement('div',{id:"RightPanel"});
	  if (this.rightContent) this.ui.rightPanel.appendChild(this.rightContent);
	  this.ui.basePanel.appendChild(this.ui.leftPanel);
	  this.ui.basePanel.appendChild(this.ui.rightPanel);
	  this.ui.basePanel.appendChild(this.ui.handle);
	this.root.appendChild(this.ui.basePanel);
	if (this.isPercentage) this.setSplitPercent(this.split);
	else this.setSplitPixels(this.split);
};

setSplit(division) {
	if (this.ui.basePanel.offsetWidth==0) { // defer this action, widget isn't visible
		const widget=this;
		setTimeout(function() { 
			widget.setSplit(division);
		},500);
	}
	else {
		if (division.indexOf("%")>0) {
			this.isPercentage=true;
			this.setSplitPercent(parseInt(division));
		}
		else {
			this.isPercentage=false;
			this.setSplitPixel(parseInt(division));
		}			
	}
};

setSplitPixels(x) {
	this.split=x;
	const w = this.ui.basePanel.offsetWidth-4;
	this.ui.handle.style.left=x+"px";
	this.ui.leftPanel.style.right=(w-x)+"px";
	this.ui.rightPanel.style.left = (x+4)+"px";	
};

setSplitPercent(x) {
	this.split = x;
	const w = this.ui.basePanel.offsetWidth;
	const pt = Math.round(w*x/100);
	this.ui.handle.style.left=(pt-2)+"px";
	this.ui.leftPanel.style.right=(w-pt-2)+"px";
	this.ui.rightPanel.style.left = (pt+2)+"px";	
};

setRightContent(div) {
	this.rightContent = div;
	this.ui.rightPanel.innerHTML="";
	this.ui.rightPanel.appendChild(this.rightContent);
};

setLeftContent(div) {
	this.leftContent = div;
	this.ui.leftPanel.innerHTML="";
	this.ui.leftPanel.appendChild(this.leftContent);
};
	
}

// Define the new element
customElements.define('sam-lrpanel', SAMLRPanel);
window.$defined_SAMLRPanel = true; 

