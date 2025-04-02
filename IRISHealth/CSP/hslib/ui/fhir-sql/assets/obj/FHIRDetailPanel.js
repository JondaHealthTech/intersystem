////////////////////////////////////////////////////////
// FHIRTDetailPanel <fhir-detailpanel>
////////////////////////////////////////////////////////
class FHIRDetailPanel extends SAMWidget {


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

		LEGEND {
			font-size:16px;
			font-weight:bold;
			font-family:Arial;
			max-width:600px;
			overflow:hidden;
		}

		FIELDSET {
		}

	#DisplaySpace {
		position:relative;
		width:100%;
		height:100%;
		display:inline-block;
	}

	#ShowHistogram {
		position:absolute;
		right:15px;
		top:35px;
	}

	BUTTON { 
		cursor:pointer;
		user-select:none;
		border:none;
		display:inline-block;
		white-space:nowrap;
		text-align:center;
		vertical-align:baseline;
		min-width:64px;
		line-height:36px;
		padding:0 16px;
		border-radius:4px;
		overflow:visible;
		font-family:Arial;
		font-size:14px;
		font-weight:550;
		color:#ffffff;
		background-color:#333695;
	}

	BUTTON:hover {
		background-color:#2b2b2b;
	}

	BUTTON:disabled {
		background-color:#C0C0C0;
		cursor:default;
	}

	#ValueGraph {
		border:1px solid #e0e0e0;
	}

	#FilterWizard {
		height:250px;
	}

	#Filter {
		display:block;
		width:100%;
		height:100%;
		position:relative;
	}

	#AddToProjection {
	}

	.stressed {
		font-weight:bold;
		font-size:13px;
		display:inline-block;
		width:120px;
	}

	`;
	return(css);
};

/// Set initial public and private properties for the widget
initData() {
	this.extensionDomain = null; // Special handling for FHIR "extension" tags
	this.includeCB = null;
	this.dataOptionsCB = null;
	this.pathDataCB = null;
	this.$captions = {
		ShowHistogram:"Show Histogram",
		HideHistogram:"Hide Histogram",
		AddToProjection:"Add To Projection",
		Update:"Update",
		DataType:'Data type',
		SetCount:'Set count',
		DifferentValues:'Different values',
		Index:"Index",
		Other:'other',
		ColumnName:'Column name',
		ParentSubtable:'Parent subtable',
		SubtableName:'Subtable name',
		SubtableRenameHint:'Existing subtable columns may be rename by editing them individually',
		NameHint:'This field must be unique and non-blank',
		Filter:'Filter'
	};
};

/// Callback for the "include in projection" toggle
/// the callback should take three arguments 
/// the resource type, a column spec record and an include flag.
setIncludeCB(fn) {
	this.includeCB=fn;
};

/// Callback for the "Add to projection/Update" button
/// the callback should take three arguments 
/// the resource type, a column spec record and a "new" flag.
setUpdateCB(fn) {
	this.updateCB=fn;
};

/// Callback for "Add to Projection" button when the
/// data target is an newly defined subtable. The callback should take two 
/// arguments, the base resource type and the subtable record.  This is 
/// for new definitions only.
setDefineSubtableCB(fn) {
	this.defineSubtableCB=fn;
};

setDataOptionsCB(fn) {
	this.dataOptionsCB = fn;
};

setPathDataCB(fn) {
	this.pathDataCB = fn;
};

/// Specific directives to supervise drawing of this widget
render() {
	this.ui={};
	this.ui.basePanel = this.createElement('div',{id:"DisplaySpace"});
	this.root.appendChild(this.ui.basePanel);

	// Controls that are only defined when a path is active
	this.ui.valueGraph = null;
	this.ui.filterWizard = null;
	this.ui.includeBoxCtrl = null;
};

/// BASE FORM
/// Render the details of a particular leaf.
/// The "node" parameter for a data leaf takes the form of:
/// {
///	"name": (string),
///	"dataType": (string),
///	"setCount": (number),
///	"differentValues": (number),
///	"values": [ (valueRecord), ... ]
/// }
renderSimpleItem(analysisNode, specNode, path) {
	const JPL = new JPLUtils();

	this.subtableOptions = null;
	this.extensionDomain = null;
	var legendLabel = "";
	if (path.indexOf(".extension.")>0) { // Need to address V1 structure for addressing extensions
		const converted = this.referenceFHIRExtension(path); 
		legendLabel = converted.legendLabel;
		this.extensionDomain = converted.domain;
		path = converted.path;
		if (specNode) specNode.JPL = path;
	}
	const basePath = JPL.getBasePath(path);

	this.tableContext = null;
	if ((specNode)&&(specNode.TABLECONTEXT)) { // Specialty case where we are editing an item in a subtable
		this.tableContext = specNode.TABLECONTEXT;
		delete specNode.TABLECONTEXT;
	}

	if (!analysisNode.name) return;
	this.activeNode = analysisNode;
	this.specNode = specNode;
	this.path = path;

	var node = analysisNode;
	const subtableMode = !(node.dataType);
	var div = this.ui.basePanel;
	var alias = "";
	if (specNode) alias = specNode.name;
	else {
		var a = basePath.split(".");
		alias = a.join(".");
		a = alias.split(".extension");
		if ((a.length>1)&&(this.extensionDomain)) {
			alias = "";
			for (var i=0;i<this.extensionDomain.length;i++) {
				alias += a[i]+'.'+this.extensionDomain[i]+'.';
			}
			if (a[i]) alias+=a[i];
		}
		alias = this.toCamelCase(alias);		
		if (subtableMode) alias+='s';
	}
	this.oldName = alias;

	var h = [];
	var shortPath = path.split("$.")[1];
	var localPath = path;
	if (this.tableContext) {
		const pPath = this.tableContext.JPL;
		localPath = path.split(JPL.getBasePath(pPath))[1];
		shortPath = pPath.substring(2)+localPath;
		localPath = '@'+localPath;
	}
	
	if (legendLabel=="") legendLabel = basePath.substring(2);
	// legendLabel = shortPath; // Debuggin hint only

	h.push('<fieldset>');
	h.push('<legend>'+legendLabel+'</legend>');

	h.push('<div><span class="stressed">'+this.$captions["SetCount"]+':</span><span>'+node.setCount+'</span></div>');
	if (!subtableMode) {
		h.push('<div><span class="stressed">'+this.$captions["DataType"]+':</span><span>'+node.dataType+'</span></div>');
		h.push('<div><span class="stressed">'+this.$captions["DifferentValues"]+':</span><span>'+node.differentValues);
		if (node.differentValues==1) {
			h.push(' ( '+this.renderValue(node.values[0].value)+' )</span></div>');
		}
		else {
	 		h.push('<button id="ShowHistogram">'+this.$captions["ShowHistogram"]+'</button>');
			h.push('</span></div>');
			h.push('<div id="ValueGraph" style="display:none;">');
			h.push('</div>');
		}	
		h.push('</span></div>');
	}
	h.push('<hr/>');
	if (this.tableContext) {
		h.push('<div><span class="stressed">'+this.$captions.ParentSubtable+': </span>');
		h.push('<input id="ParentTable" value="'+this.tableContext.name+'" style="width:75%" disabled></input></div>');
	}	
	h.push('<div>');
	if (subtableMode) {
		h.push('<span class="stressed">'+this.$captions.SubtableName+': </span>');
	} else {
		h.push('<span class="stressed">'+this.$captions.ColumnName+': </span>');
	}
	h.push('<input id="Alias" value="'+alias+'" style="width:75%" title="'+this.$captions.NameHint+'"></input>');
	h.push('</div>');

	if (!subtableMode) {
		h.push('<p>');
		h.push('<span class="stressed">'+this.$captions.Index+': </span>');
		h.push('<input type="checkbox" id="IndexColumnCtrl">');
		h.push('</p>');
	}

	h.push('<div id="FilterWizardDiv"><span class="stressed">'+this.$captions["Filter"]+': </span><div id="FilterWizard">');
	h.push('<jpl-filterwizard id="Filter"></jpl-filterwizard></div></div>');

	if (subtableMode) {
		this.renderSubtableSelectors(h,basePath,specNode);
	}
	shortPath = btoa(shortPath);
	h.push('<div style="position:relative;top:0px;left:0px;text-align:right;">');
	if (specNode) {
		h.push('<button id="AddToProjection" onclick="this.controller.ctrlUpdateCB(\''+shortPath+'\',false,'+subtableMode+');" disabled>'+this.$captions["Update"]+'</button>');
	}
	else {
		h.push('<button id="AddToProjection" onclick="this.controller.ctrlUpdateCB(\''+shortPath+'\',true,'+subtableMode+');">'+this.$captions["AddToProjection"]+'</button>');
	}
	h.push('</div>');
	
	h.push('</fieldset>');
	div.innerHTML = h.join("");

	this.ui.valueGraph = this.shadowRoot.getElementById("ValueGraph");
	
	this.ui.filterWizard = this.shadowRoot.getElementById("Filter");
	this.ui.filterWizard.owner = this;
	this.ui.filterWizard.setDataOptionsCB(function(prefix,node,comparator) { return(this.owner.filterDataOptionsCB(prefix,node,comparator)); });
	if ((this.pathDataCB)&&(path)) {
		this.ui.filterWizard.setPathData(path,this.filterPathDataCB(path));
	};
	this.ui.filterWizard.onchange = function(evt) {this.owner.enableUpdate();}

	if (this.tableContext) {  // SAM FUTURE FEATURE: ability to add filters to subtable columns
		var div = this.shadowRoot.getElementById("FilterWizardDiv");
		div.style.display="none";
	}

	if (localPath.split(".").length<3) { // too short to add filters
		var div = this.shadowRoot.getElementById("FilterWizardDiv");
		div.style.display="none";
	}

	this.ui.updateCtrl = this.shadowRoot.getElementById('AddToProjection');
	this.ui.updateCtrl.controller = this;

	this.ui.aliasCtrl = this.shadowRoot.getElementById('Alias');
	this.ui.aliasCtrl.controller=this;
	this.ui.aliasCtrl.onchange=function(evt) {this.controller.validateNameCB(this.value);};
	
	if (!subtableMode) {
		this.ui.indexCtrl = this.shadowRoot.getElementById('IndexColumnCtrl');
		this.ui.indexCtrl.controller=this;
		if ((specNode)&&(specNode.index)) this.ui.indexCtrl.checked=true;
		else this.ui.indexCtrl.checked=false;
		this.ui.indexCtrl.onchange = function(evt) { this.controller.enableUpdate();};
	} 
	else {
		this.ui.indexCtrl = null;
		var max =this.subtableOptions.length;
		for (var i=0;i<max;i++) {
			var ctrl = this.shadowRoot.getElementById('SubtableItem_'+i);
			if (ctrl) {
				ctrl.controller = this;
				ctrl.onchange = function(evt) {this.controller.enableUpdate();};
			}
			ctrl = this.shadowRoot.getElementById('SubtableItemAlias_'+i);
			if (ctrl) {
				ctrl.controller = this;
				ctrl.onchange = function(evt) {this.controller.enableUpdate();};
			}
		}
	}
	
	this.ui.graphCtrl = this.shadowRoot.getElementById('ShowHistogram');
	if (this.ui.graphCtrl) {
		this.ui.graphCtrl.owner = this;
		this.ui.graphCtrl.onclick = function(evt) { this.owner.toggleGraph();};
	}

}

renderSubtableSelectors(h,basePath,specNode) {
	h.push("<hr/>");
	var x = this.pathDataCB(basePath);
	var subObj = [];
	const prefixLen = basePath.length;
	var count = 0;
	h.push('<table><tbody>');
	for (var p in x) {
		if (p.indexOf(basePath)==0) {
			var key = '@'+p.substring(prefixLen);
			var obj = {
				'type':(x[p]),
				'path':(key.substring(2)),
				'rawPath':(key.substring(2)),
				'JPL':(key),
				'name':(this.toCamelCase(key))};
			if (p.indexOf('.extension')>0) {
				obj.name = this.toCamelCase(key.split('.extension').join(""));				
				var rObj = this.referenceFHIRExtension(p);
				key = '@'+rObj.path.substring(prefixLen);
				obj.JPL = key;
				obj.path = this.convertJPLtoFHIRPath(key);
			}

			var checked = "";
			var disabled = "";
			if (specNode) {
				const c=specNode.columns;
				const len = c.length;
				for (var i=0;i<len;i++) if (c[i].path==obj.path) {
					checked="checked";
					disabled = 'disabled title="'+this.$captions.SubtableRenameHint+'"';
					obj.name = c[i].name;
				}
			}
			subObj.push(obj);
			h.push('<tr>');
			h.push('<td>');
			h.push('<input type="checkbox" id="SubtableItem_'+count+'" '+checked+' >');
			h.push('</input>');
			h.push('</td>');
			h.push('<td>');
			h.push('<span class="stressed" style="width:95%;vertical-align:top;white-space:nowrap;" >'+obj.rawPath+' ('+obj.type+') as ');
			h.push('</span>');
			h.push('</td>');
			h.push('<td>');
			h.push('<input id="SubtableItemAlias_'+count+'" value="'+obj.name+'"'+disabled+'/></input>');
			h.push('</td>');
			h.push('</tr>');
			count++;
		}
	}
	h.push('</tbody></table>');
	this.subtableOptions = subObj;
}

/// Given a path string of the form @.tier.tier.leaf return an 
/// undelimited camelcase string of the form TierTierLeaf
toCamelCase(dotString) {
	const str = dotString.substring(2);
	const arr = str.split('.');
	for (var i=arr.length-1;i>-1;i--) {
		var arr2 = arr[i].split('-');
		for (var j=arr2.length-1;j>-1;j--) {
			arr2[j]=arr2[j].charAt(0).toUpperCase()+arr2[j].substring(1);
		}
		arr[i]=arr2.join("");
		arr[i]=arr[i].charAt(0).toUpperCase()+arr[i].substring(1);
	}
	return(arr.join(""));
}

/// ======================================
enableUpdate() {
	if (this.ui.updateCtrl) {
		this.ui.updateCtrl.disabled=false;
	}
};	

/// Hide/show the histogram based on a toggle button callback
toggleGraph() {
	if (!this.ui.graphCtrl) return;
	if (!this.ui.valueGraph) return;
	if (this.ui.graphCtrl.innerText.indexOf(this.$captions["ShowHistogram"])>-1) { // Show graph
		this.ui.graphCtrl.innerHTML = this.$captions["HideHistogram"];
		this.ui.valueGraph.style.display="";
		this.renderValueGraph(this.ui.valueGraph,this.activeNode);
	}
	else { // hide graph, reset button
		this.ui.graphCtrl.innerHTML = this.$captions["ShowHistogram"];
		this.ui.valueGraph.style.display="none";
	}
}

renderValue(str) {
	if ((typeof(str)=='string')&&((str.indexOf('http:')==0)||(str.indexOf('https:')==0))) {
		const newStr = '<a href="'+str+'">'+str+'</a>';
		return(newStr);
	}
	return(str);
}

renderValueGraph(div, node) {
	var width = div.offsetWidth-20;
	var barWidth = width/2;
	var h = [];
	var vals = node.values;
	if (!vals) return;
	var nVals = vals.length;
	var total = node.setCount;
	if (node.differentValues>1) {
		var counted = 0;
		for (var i=0;i<nVals;i++) counted+=vals[i].count;
		var other = total-counted;
		if (other>0) {
			vals.push({"value":("("+this.$captions["Other"]+")"),"count":(other)});
			nVals++;
		}
	}
	for (var i=0;i<nVals;i++) {
		var v = vals[i];
		var caption = this.renderValue(v.value);
		h.push('<div>');
		h.push('<div style="position:inline-block;width:48%;margin-right:2%;overflow:hidden;text-align:right;" title="'+v.value+'">'+caption+'</div>');
		h.push('</div>');
		h.push('<div style="position:absolute;top:'+(i*15+2)+'px;left:50%;width:'+(v.count/total)*barWidth+'px;background:#e0e0e0;height:12px;" title="'+v.count+'"></div>');
		//h.push('<div style="display:inline-block;">'+v.count+'</div>');
	}
	div.style.border="1px solid rgba(0,0,0,0.87);";
	div.style.margin="5px";
	div.style.position="relative";
	div.innerHTML = h.join("");
};

validateNameCB(newValue) {
	if (newValue=='') {
		this.ui.aliasCtrl.value = "Placeholder";
	}
	this.enableUpdate();
};

filterDataOptionsCB(prefix,node,comparator) {
	if (this.dataOptionsCB) return(this.dataOptionsCB(prefix,node,comparator));
	else return([]);
};

filterPathDataCB(path) {
	if ((this.pathDataCB)&&(path)) return(this.pathDataCB(path));
	else return({});
};

ctrlUpdateCB(who, isNew, isSubtable) {
	who = atob(who);
	if (this.updateCB) {
//console.log("FilterPathDataCB: Filter claims  (JPL): "+this.ui.filterWizard.path);
//console.log("FilterPathDataCB: Filter claims (FHIR): "+this.ui.filterWizard.fhirpath);
		const jpl = new JPLUtils();
		const tokens = jpl.parseExpression('$.'+who);
//const resourceType = who.split(".")[0];
		const resourceType = tokens[2].value;
		if (isSubtable) {
			const subRec = {
				name:(this.ui.aliasCtrl.value),
				path:(this.ui.filterWizard.fhirpath),
				JPL:(this.ui.filterWizard.path),
				columns:[]
			}
			if (subRec.name!=this.oldName) subRec.RENAMED=this.oldName;

			const st = this.subtableOptions;
			const len = this.subtableOptions.length;
			for (var i=0;i<len;i++) {
				var ctrl = this.shadowRoot.getElementById("SubtableItem_"+i);
				if (ctrl.checked) {
					var alias = this.shadowRoot.getElementById("SubtableItemAlias_"+i);
					st[i].name = alias.value;
					subRec.columns.push(st[i]);
				}
			}
			if (this.defineSubtableCB) this.defineSubtableCB(resourceType,subRec);
		}
		else {
			const columnRec = {
				name:(this.ui.aliasCtrl.value),
				type:(this.activeNode.dataType),
				path:(this.ui.filterWizard.fhirpath),
				JPL:(this.ui.filterWizard.path),
				index:false
			};
			if (this.ui.indexCtrl) columnRec.index=this.ui.indexCtrl.checked;
			if (columnRec.name!=this.oldName) columnRec.RENAMED=this.oldName;
			if (this.tableContext) columnRec.TABLECONTEXT = this.tableContext;
			this.updateCB(resourceType, columnRec, isNew);
		}
	}		
};

setNode(analysisNode,specNode,path) {
	if (analysisNode==null) {
		this.ui.basePanel.innerHTML="";
		return;
	}
	// if user clicks on a top-level resource node, hide the detail panel
	let clickedOnRoot = path.split(".").length <= 2;
	let changingResourceRoots = clickedOnRoot && this.path && this.path.indexOf(path) === -1;
	if (changingResourceRoots) {
		this.path = path;
		this.ui.basePanel.innerHTML="";
		return;
	}

	this.renderSimpleItem(analysisNode,specNode,path);
};

/*****************************************/
/* FHIRPath Related Conversion Utilities */
/*****************************************/

/// Internal function to adjust for FHIR Extensions which are organized around 
/// data values rather than structural keys.  In the JSON, the keyword "extension"
/// has multiple keys, defining certain areas (such as geolocation) each of these
/// objects has a key named "url" and some other key for the value.  In "normal"
/// JSON processing the value might be referenced as:
///    resourse.extension.area?(@url == 'somestring').value
/// But FHIRPath drops the 'area' tier and associates the url directly with the 
/// extension key.  This throws a spanner in the works for all related path matching
/// and indexing for the wizard and must be accounded for in ways the user must not
/// interfere with.
/// This method is one part of that accounting, converting a simple path of the form:
///    resource.extension.area0.extension.area1.value
/// into the more complex but necessary:
///    resource.extension?(@url=="(@area0.url)").extension?(@url=="(@area1.url)").value
referenceFHIRExtension(path) {
	const JPL = new JPLUtils();
	const rObj = {domain:[]};
	
	// The legendLabel is for user consumption only and 
	// shouldn't get bogged down in these transformations
	rObj.legendLabel = JPL.getBasePath(path).substring(2);

	const pTree= JPL.parseExpression(path);
	const original = pTree.slice(); // Clone parse tree for making URL look-up paths.
	var offset = 0;
	var pIdx = 0;
	while((pIdx<pTree.length)&&(pTree[pIdx].type!='JPLEnd')) {
		while((pIdx<pTree.length)&&(pTree[pIdx].value!="extension")) pIdx++; //skip to first extension
		if (pIdx<pTree.length) {
			pIdx+=2; // skip to extension area
			rObj.domain.push(pTree[pIdx].value); // record, in order, the area tags we're eliding
			// Now we need to create a new path to fetch the related URL value
			const urlA = original.slice(0,pIdx+2+offset);
			urlA.push({type:'JPLNode',value:'url'});
			urlA.push({type:'JPLEnd',value:'<END>'});
			const urlPath = JPL.exportPath(urlA);
			// And actually fetch that value...
			const uri = this.dataOptionsCB(urlPath,"","==");
			// Update the core parse tree to inject a conditional where the area key used to be
			pTree.splice(pIdx-1,2,{type:'JPLFilter',value:[{type:'JPLArg',value:'@.url'},{type:'JPLArg',value:(uri[0].value)},{type:'JPLOp',value:'=='}]});
			offset++; // Record net shifts from original parse array
		}
		pIdx++;
	}
	rObj.path = JPL.exportPath(pTree);
	return(rObj);
};

convertJPLtoFHIRPath(p) {
	const JPL = new JPLUtils();
	const parseTree = JPL.parseExpression(p);
	const len = parseTree.length-1;
	var fhirpath = "";
	for (var i=2;i<len;i++) {
		var n = parseTree[i];
 		if (n.type!='JPLFilter') {
  			fhirpath +=n.value;
 		}
		else {
 			fhirpath += '.where(';
			var exper = '';
			var stack = [];
			for (var cIdx = 0;cIdx<n.value.length;cIdx++) {
				var cn = n.value[cIdx];
				if (cn.type=='JPLArg') stack.push(cn.value);
 
				else if (cn.type=='JPLOp') {
					var a2 = stack.pop();
					if (a2=='') a2="''";
					else if((typeof(a2)=='string')&&(!((a2.indexOf("'")==0)||(a2.indexOf('"')==0))))  a2 = "'"+a2+"'";
					var a1 = stack.pop();
 					if (a1.indexOf('@')==0) a1=a1.substring(2);
  					if (a1=='') {
						fhirpath="{INVALID}";
  					}
  					else {
  						if (cn.value=='==') {
							fhirpath += a1+' = '+a2;
						}
						else if (cn.value=='!=') {
							fhirpath += '('+a1+' = '+a2+').not()';
						}
						else if (cn.value=='starts with') {
							fhirpath += a1+'.startsWith('+a2+')';
						}
						else if (cn.value=='exists') {
							fhirpath += a1+'.exists()';
						}
						else if (cn.value=='is unknown') {
							fhirpath += a1+'.empty()';
						}
						else if (cn.value=='like_regex') {
							fhirpath += a1+'.matches('+a2+')';
						}
						else if (cn.value=='is of type') {
							fhirpath += 'resolve() is '+a2.split("'")[1];
						}
						else {
							fhirpath += a1+' '+cn.value+' '+a2;
						}
					}
				}
			}
 			fhirpath += ')';
		}
	}
	return(fhirpath);
};

}

// Define the new element
customElements.define('fhir-detailpanel', FHIRDetailPanel);
window.$defined_FHIRDetailPanel = true;
