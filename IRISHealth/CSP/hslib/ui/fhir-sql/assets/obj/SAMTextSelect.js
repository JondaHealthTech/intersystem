/// Select box widget that allows free text entry as well
class SAMTextSelect extends SAMWidget {

/// Return an extended string holding any desired, stylesheet
/// definition code.
getDefaultCSS() {
	const css = `
		INPUT {
			position:absolute;
			top:0px;
			left:0px;
			width:100%;
			bottom:0px;
			border-style:solid;
			border-width:1px;
			border-color:rgb(133,133,133);
			border-right:none;
		}
		INPUT:focus {
			outline:none !important;
			border-color:rgb(133,133,133);
			border-right:none;
		}
		INPUT:disabled {
			border-color:rgb(230,230,230);
			color:rgb(140,140,140);
			opacity:0.7;
		}
		SELECT {
			width:100%;
		}

		SELECT:focus {
			outline:none !important;
		}

		.root {
			position: relative;
			display:block;
			width:100%;
		}
		.overlay {
			position:absolute;
			top:0px;
			left:0px;
			right:20px;
			bottom:0px;
		}
	`;
	return(css);
};

/// Set initial public and private properties for the widget
initData() {
	this.pickOptions = null;
};

/// Given an object of label:value pairs, set the option for the 
/// select box part of the widget; 
setOptions(picks) {
	this.pickOptions = picks;
	var h=[];
	h.push('<option></option>');
	for (var p in picks) {
		h.push('<option value="'+picks[p]+'">'+p+'</option>');
	}
	this.select.innerHTML = h.join("");

};

setValue(txt) {
	//if (txt.indexOf("'")==0) txt = txt.substring(1,txt.length-1);
	txt = txt.split("'").join("");
	this.value=txt;
	this.text.value = txt;
	this.text.title = txt;
};

/// Specific directives to supervise drawing of this widget
render() {
	this.select=this.createElement("select");
	this.select.controller=this;
	this.select.innerHTML = this.subNodes.innerHTML;

	this.select.onchange = function(evt) {
		var widget=this.controller;
		widget.setValue(this.value);
		if (widget.onchange) widget.onchange(evt);
		this.blur();
	};
	this.root.appendChild(this.select);
	const div = this.createElement("div",{className:"overlay"});
	this.root.appendChild(div);
	this.text = this.createElement("input",{type:"text", size:"1"});
	this.text.controller=this;
	this.text.onchange = function(evt) {
		var widget=this.controller;
		widget.value = this.value;
		if (widget.onchange) widget.onchange(evt);
	};		
	div.appendChild(this.text);
};

setDisabled(flag) {
	this.select.disabled = flag;
	this.text.disabled = flag;
};

}

// Define the new element
customElements.define('sam-textselect', SAMTextSelect);

window.$defined_SAMTextSelect = true;


