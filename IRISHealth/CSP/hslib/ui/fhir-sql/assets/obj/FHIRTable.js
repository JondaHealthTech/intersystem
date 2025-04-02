/// Simple table class for mimicking the superficial appearence of the balace of the app
class FHIRTable extends SAMWidget {

/// Return an extended string holding any desired, stylesheet
/// definition code.
getDefaultCSS() {
	const css = `
		table {
			border-collapse:collapse;
		}

		.root {
			position: relative;
			display:block;
			width:100%;
		}

		.renderBase {
			color:rgba(0,0,0,0.87);
			font-family:Arial;
			display:grid;
			margin:12px;
			border-top-left-radius:5px;
			border-top-right-radius:5px;
			border-bottom:1px solid rgba(0,0,0,0.12);
			border-left:1px solid rgba(0,0,0,0.12);
			border-right:1px solid rgba(0,0,0,0.12);
		}

		.title {
			background-color:#ededed;
			display:flex;
			flex-direction:row;
			justify-content:space-between;
			padding:6px 6px 6px 24px;
			text-align:center;
		}
		
		.titleHeader {
			align-items:center;
			display:flex;
			font-size:14px;
			font-weight:700;
			margin:9px 0px 9px 0px;
			text-align:left;
		}

		.titleCtrl {
			padding-top:3px;
			padding-bottom:3px;
			font-size:14px;
			font-weight:700;
			text-align:left;
			cursor:pointer;
			box-shadow:0 3px 1px -2px rgba(0,0,0,0.2),0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12);
			background-color:#333695;
			color:#ffffff;
			font-family:Arial,sans-serif;
			border:none;
			border-radius:4px;
		}
		
		.ctrlLabel {
			vertical-align:top;
			display:inline-block;
			padding-top:8px;
			margin-right:4px;
		}

		.titleCtrl_0 {
		}

		.container {
			border-radius:4px;
			display:table;
			width:100%;
			border-collapse:collapse;
		}

		.subsection {
		}

		.subsectionCaption {
		}

		.noData {
		}

		.noDataCaption {
			padding:6px 6px 6px 24px;
		}

		.headerRow {
			border-bottom:1px solid rgba(0,0,0,0.12);
		}

		.headerCell {
			padding:6px 6px 6px 24px;
		}

		.headerCaption {
			color:rgba(0,0,0,0.87);
			font-size:13px;
			text-align:center;
			display:flex;
		}

		.bodyRow {
			border-bottom:1px solid rgba(0,0,0,0.12);
		}

		.bodyCell {
			padding:6px 6px 6px 24px;
			display:table-cell;
		}

		.bodyCaption {
			color:rgba(0,0,0,0.87);
			font-size:13px;
			font-weight:400;
			text-align:left;
		}
		.bDivCol_2 {
			max-width:450px;
			white-space:nowrap;
			overflow:hidden;
		}	
	`;
	return(css);
};

/// Set initial public and private properties for the widget
initData() {
	this.model=null;
	this.$captions= {
		EditThisEntry:'Edit this entry',
		DeleteThisEntry:'Delete this entry'
	};
};

/// Set the data to be displayed in this table according to the follow JSON structure:
/// {
///	$title:(),
///	$ctrls;[{},{},...],
///	$noDataMsg:(),
///	$columns:["","",""],
///	(columnName):[value,value,value],
///	...
///	$subtables:[
///		{
///			$sectionName:(),
///			(columnName):[value,value,value...]
///		},
///		...
///	}
/// }

setData(aet) {
	if (typeof(aet)=='string') aet = JSON.parse(aet);
	this.model = aet;
	if (!this.model.$noDataMsg) this.model.$noDataMsg='No data in results set';
	this.render();
}

/// Specific directives to supervise drawing of this widget
render() {
	var hasData = false;
	if (this.base) this.base.innerHTML="";
	else {
		this.base = this.createElement('div',{className:"renderBase"});
		this.root.appendChild(this.base);
	}
	if (!this.model) return;
	if (this.model.$title || this.model.$ctrls) {
		var title = this.createElement("div",{'className':'title'});
		if (this.model.$title) {
			var section = this.createElement('div',{'className':'titleHeader','innerHTML':(this.model.$title)});
			title.appendChild(section);
		}
		if (this.model.$ctrls) {
			var len = this.model.$ctrls.length;
			for (var i=0;i<len;i++) {
				var ctrl = this.model.$ctrls[i];
				if (ctrl.type=='new') {
					title.appendChild(this.makeTableControlNew(ctrl.owner,ctrl.cb,ctrl.hint));
				}
			}
		}
		this.base.appendChild(title);
	}
	this.tableFrame = this.createElement('div',{'className':'container'});
	this.base.appendChild(this.tableFrame);

	var rows = this.countRows(-1);
	if (rows>0) {
		hasData = true;
		this.renderColumnHeaders();
		for (var i=0;i<rows;i++) this.renderColumnData(i,-1);
	}
	if (this.model.$subtables) {
		var tLen = this.model.$subtables.length;
		for (var s=0;s<tLen;s++) {
			var st = this.model.$subtables[s];
			var tr = this.createElement('tr',{'className':'subsection'});
			var td = this.createElement('th',{'className':'subsectionCaption','innerHTML':(st.sectionName)});
			tr.appendChild(td);
			this.tableFrame.appendChild(tr);
			
			rows = this.countRows(s);
			if (rows>0) {
				hasdata = true;
				this.renderColumnHeaders();
				for (var i=0;i<rows;i++) this.renderColumnData(i,s);
			}
			else { // no data message
				var tr = this.createElement('tr',{'className':'noData'});
				var td = this.createElement('td',{'className':'noDataCaption','innerHTML':(this.model.$noDataMsg)});
				tr.appendChild(td);
				this.tableFrame.appendChild(tr);				
			}
		}
	}
	if (!hasData) {
		var tr = this.createElement('tr',{'className':'noData'});
		var td = this.createElement('td',{'className':'noDataCaption','innerHTML':(this.model.$noDataMsg)});
		tr.appendChild(td);
		this.tableFrame.appendChild(tr);				
	}
};

renderColumnHeaders() {
	const m = this.model;
	var headerBar = this.createElement('tr',{'className':'headerRow'});
	var len = m.$columns.length
	for (var i=0;i<len;i++) {
		var c = m.$columns[i];
		var th = this.createElement('th',{'className':('headerCell hCol_'+i)});
		var div = this.createElement('div',{'className':('headerCaption HDivCol_'+i),'innerHTML':(c)});
		th.appendChild(div);
		headerBar.appendChild(th);
	}
	this.tableFrame.appendChild(headerBar);
};

renderColumnData(row,section) {
	const m = this.model;
	if (section==-1) {
		var obj = m;
	}
	else {
		var obj = m.$subtables[section];
	}
	var bodyBar = this.createElement('tr',{'className':'bodyRow'});
	var len = obj.$columns.length
	for (var i=0;i<len;i++) {
		var c = obj[obj.$columns[i]];
		if (c) {
			var data = c[row];
			if (!data) data = "";
			else if (data===true) data = this.createElement('i',{innerHTML:'true'});
		}
		else var data = "";

		var td = this.createElement('td',{'className':('bodyCell bCol_'+i)});
		var div = this.createElement('div',{'className':('bodyCaption bDivCol_'+i)});
		if (typeof(data)=='string') {
			div.innerHTML = data;
			if (data.length>20) div.title = data;
			if (data.length>39) div.innerHTML=data.substring(0,39)+"..."
		}
		else if (data) div.appendChild(data);

		td.appendChild(div);
		bodyBar.appendChild(td);
	}
	this.tableFrame.appendChild(bodyBar);
};

/// count the number of rows in this section of the data, not all columns
/// may be represented so take the high tide mark across all reporting items
countRows(section) {
	var max = 0;
	const m = this.model;
	if (section==-1) {
		var obj = m;
	}
	else {
		var obj = m.$subtables[section];
	}
	if (!obj.$columns) return(0);
	var len = obj.$columns.length
	for (var i=0;i<len;i++) {
		var c = obj[obj.$columns[i]];
		if (c && c.length>0) {
			if (c.length>max) max = c.length;
		}
	}
	return(max);
};

/// return a span full of controls used to interact with the various entires in the 
/// transform spec table. "action" is an object whose keys will render if set to a callback value
/// keys include "edit", "delete", "play" & "pause"
makeTableActionCell(rowNum, owner, action) {
	const span = this.createElement('span');
	if (action && action.edit) {
		const editButton = this.createElement('div',{'className':'actionButton', 'id':'EditRow_'+rowNum,'title':(this.$captions.EditThisEntry)});
		const edit = this.createElement("sam-icon");
		edit.setGlyph("Edit");
		edit.setSize("24px","24px");
		editButton.onclick=function(evt) {action.edit(rowNum);};
		editButton.owner=owner;
		editButton.appendChild(edit);
		span.appendChild(editButton);
	}
	if (action && action.delete) {
		const delButton = this.createElement('div',{'className':'actionButton','id':'DeleteRow_'+rowNum,'title':(this.$captions.DeleteThisEntry)});
	  	const del = this.createElement("sam-icon");
		del.setGlyph("Delete");
		del.setSize("24px","24px");
		delButton.onclick=function(evt) {action.delete(rowNum);};
		delButton.owner=owner;
		delButton.appendChild(del);
		span.appendChild(delButton);
	};
	return(span);
};

makeTableControlNew(owner,cb,hint) {
	const b = this.createElement("button",{className:"titleCtrl",title:(hint)});
	if (cb) b.onclick = cb;
	const sp = this.createElement("span",null);
	const svg = this.createSVG("svg",{width:"30px",height:"30px",viewBox:"-2 -6 32 32", fill:"none", stroke:"#ffffff"});
	svg.appendChild(this.createSVG("circle",{cx:12,cy:12,r:11,"stroke-width":2}));
	svg.appendChild(this.createSVG("line",{x1:12,y1:4,x2:12,y2:20,"stroke-width":2}));
	svg.appendChild(this.createSVG("line",{x1:4,y1:12,x2:20,y2:12,"stroke-width":2}));
	b.appendChild(svg);
	b.appendChild(this.createElement("span",{className:"ctrlLabel",innerHTML:"New"}));
	//b.appendChild(sp);
	return(b)
};

/// Given two objects obj0 and obj1, and a map where the keys of the map
/// represent the names of keys in obj0 and the values match the corresponding
/// arrays of keys in obj1, push the values from 0 into 1 or empty string if
/// obj0 has no such value 
mapRowValuesByKey(obj0,obj1,map) {
	for (var key in map) {
		if (obj0[key]) obj1[map[key]].push(obj0[key]);
		else obj1[map[key]].push("");
	}	
};
}

// Define the new element
customElements.define('fhir-table', FHIRTable);
window.$defined_FHIRTable = true;


