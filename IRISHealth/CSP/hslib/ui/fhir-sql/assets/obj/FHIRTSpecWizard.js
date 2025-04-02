/// Base widget class for rendering the FHIR Transform Specification 
/// graphical editor page.
class FHIRTSpecWizard extends SAMWidget {

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

	#Upper {
		position:absolute;
		top:30px;
		left:12px;
		right:12px;
		bottom:30%;
		overflow:auto;
		color:rgba(0,0,0,0.87);
		font:12px Arial;	
	}

	#Lower {
		position:absolute;
		top:70%;
		left:0px;
		right:0px;
		bottom:0px;
		overflow:auto;
	}

	`;
	return(css);
};

/// Set initial public and private properties for the widget
initData() {
	this.analysis = null;
	this.treeData = null;
	this.specification = null;
	this.tableData - null;
	this.captions = {
		"EditThisEntry":"Edit this entry",
		"DeleteThisEntry":"Delete this entry",
		"CollectionRepetitions":"(collection, repetitions:"
	};
};

/// Set the basic analysis results that will form the basis of this transform specification
setAnalysis(aet) {
	if (typeof(aet)=='string') aet = JSON.parse(aet);
 	this.analysis = aet;
	this.treeData = this.reframeTreeData(aet);
	this.ui.tree.setTree(this.treeData);
};

/// Set the transform specification itself
setSpec(aet) {
	this.specification = new XFormSpec();
	this.specification.set(aet);
	this.tableData = this.xFormSpecToTable(this.specification.get());
	this.ui.specSummary.setData(this.tableData);
};

/// Used to massage REST payload into tree format for sam-leafpicker
reframeTreeData(src) {
	var index = {};
	var path = "$";
	var aet = {};
	index[path]=src;
	src = src.resources;
	var nResources = src.length;
	for (var i=0;i<nResources;i++) {
		var label = src[i].resourceType+" ("+src[i].count+")";
		var r =src[i];
		index[path+'.'+r.resourceType]=r;
		if (r.elements) {
			aet[label] = {};
			this.reframeElements(aet[label],r.elements,index,path+'.'+r.resourceType);
		}
		else {
			aet[label] = "";
		}
	}
	this.sourceIndex = index;
	return aet;
};

/// Support method for reframeTreeData
reframeElements(aet, elements, index, path) {
	var len = elements.length;
	for (var i=0;i<len;i++) {
		var item = elements[i];
		index[path+'.'+item.name]=item;
		if (item.elements) { // compoundItem
			if (item.name == 'extension') continue; // HSHC-3577
			var label = item.name;
			if (item.repetitions) label += ' '+this.captions.CollectionRepetitions+item.repetitions+')';
			aet[label] = {};
			this.reframeElements(aet[label],item.elements,index,path+'.'+item.name);
		}
		else if (item.extension) { // extension tag
			var label = 'extension';
			aet[label] = {};
			this.reframeElements(aet[label],item.extension,index,path+".extension");
		}
		else {
			aet[item.name+' ('+item.setCount+')'] = "";
		}
	}
};

/// Provide specific CSS overrides for driving the table widget 
getTableCSS() {
	const css=`
		.actionButton {
			display:inline-block;
			width:28px;
			height:28px;
			border-radius:15px;
			background-color:#ffffff;
			margin-left:2px;
			margin-right:2px;
			padding-left:3px;
			padding-top:3px;
		}
		.actionButton:hover {
			background-color:rgb(0,0,0,0.12);
		}
	`;
	return(css);
};

/// return a span full of controls used to interact with the various entires in the 
/// transform spec table.
makeTableActionCell(rowNum,action) {
	const span = this.createElement('span');
	if (action.edit) {
		const editButton = this.createElement('div',{'className':'actionButton', 'id':'EditRow_'+rowNum,'title':(this.captions["EditThisEntry"])});
	  	const edit = this.createElement("sam-icon");
	  	edit.setGlyph("Edit");
	  	edit.setSize("24px","24px");
	 	editButton.onclick=function(evt) {this.owner.editTableEntry(rowNum);};
	 	editButton.owner=this;
	 	editButton.appendChild(edit);
		span.appendChild(editButton);
	};
	if (action.delete) {
	 	const delButton = this.createElement('div',{'className':'actionButton','id':'DeleteRow_'+rowNum,'title':(this.captions["DeleteThisEntry"])});
	  	const del = this.createElement("sam-icon");
	  	del.setGlyph("Delete");
	  	del.setSize("24px","24px");
	 	delButton.onclick=function(evt) {this.owner.deleteTableEntry(rowNum);};
	 	delButton.owner=this;
	 	delButton.appendChild(del);
		span.appendChild(delButton);
	};
	return(span);
};

/// Apply a transform to the spec model itself to create a view of the data that is 
/// compatible with the table widget.
xFormSpecToTable(spec) {
	var row = 0;
//console.log(spec);
	var tObj = {
		'$title':'Currently Selected Items for '+(spec.name),
		'$ctrls':null,
		'$noDataMsg':'No resource elements selected',
		'$columns':['Table', 'Column', 'Type', 'Index','Actions'],
		'Table':[],
		'Column':[],
		'Path':[],
		'RC':[],
		'Type':[],
		'Index':[],
		'Actions':[]				
	}
	if (spec.resources) {
		var rLen = spec.resources.length;
		for (var rIdx = 0;rIdx<rLen;rIdx++) {
			var rObj = spec.resources[rIdx];
			if (rObj.columns && rObj.columns.length>0) { // main table column entries
				var cLen = rObj.columns.length;
				for (var cIdx=0;cIdx<cLen;cIdx++) {
					var cObj = rObj.columns[cIdx];
					if (cObj.name) tObj.Column.push(cObj.name);
					else tObj.Column.push('');
					if (cObj.type) tObj.Type.push(cObj.type);
					else tObj.Type.push('');
					if (cObj.JPL) tObj.Path.push(cObj.JPL);
					else tObj.Path.push('');
					if (cObj.index) tObj.Index.push(cObj.index);
					else tObj.Index.push('');
					if (rObj.resourceType) tObj.RC.push(rObj.resourceType);
					else tObj.RC.push(' ');
					if (rObj.resourceType) tObj.Table.push(rObj.resourceType);
					else tObj.Table.push(' ');
					tObj.Actions.push(this.makeTableActionCell(row,{edit:true,delete:true}));
					row++;		
				}
			}
			if (rObj.subTables && rObj.subTables.length>0) { // subtable column entries
				var stLen = rObj.subTables.length;
				for (var stIdx=0;stIdx<stLen;stIdx++) {
					var stObj = rObj.subTables[stIdx];
					tObj.Table.push(stObj.name);
					tObj.Column.push('');
					tObj.Path.push(stObj.JPL);
					tObj.RC.push(rObj.resourceType);
					tObj.Type.push('Subtable');
					tObj.Index.push('');
					tObj.Actions.push(this.makeTableActionCell(row,{edit:true,delete:true}));
					row++;
					if (stObj.columns && stObj.columns.length>0) { // subtable column entries
						var cLen = stObj.columns.length;
						for (var cIdx=0;cIdx<cLen;cIdx++) {
							var cObj = stObj.columns[cIdx];
							if (cObj.name) tObj.Column.push(cObj.name);
							else tObj.Column.push('');

							if (cObj.type) tObj.Type.push(cObj.type);
							else tObj.Type.push('');
							if (cObj.JPL) tObj.Path.push(cObj.JPL);
							else tObj.Path.push("");
							if (cObj.index) tObj.Index.push(cObj.index);
							else tObj.Index.push('');

							if (rObj.resourceType) tObj.RC.push(rObj.resourceType);
							else tObj.RC.push(' ');
							if (stObj.name) tObj.Table.push(stObj.name);
							else tObj.Table.push(' ');

							tObj.Actions.push(this.makeTableActionCell(row,{edit:true,delete:true}));
							row++;		
						}
					}
				}
			}
		}
	}
	return(tObj);
};

/// Specific directives to supervise drawing of this widget
render() {
	this.ui={};
	this.ui.upperPanel = this.createElement('div',{id:"Upper"});
	  this.ui.splitPanel = this.createElement('sam-LRPanel');
	    this.ui.tree = this.createElement("sam-leafpicker",{"id":"Tree","category":"$"});
	    this.ui.tree.controller = this.ui.tree;
	    this.ui.tree.scale=0.7;
	    this.ui.tree.owner=this;
	    this.ui.tree.onchangeCB = function(value) { this.owner.showDetails(value);}
	  this.ui.splitPanel.setLeftContent(this.ui.tree);
	    this.ui.detailPanel = this.createElement('fhir-detailpanel',{id:"DetailPanel"});
	    this.ui.detailPanel.owner = this;
	    this.ui.detailPanel.setUpdateCB(function(rc, colRec, isNew) { this.owner.setUpdate(rc,colRec,isNew);});
	    this.ui.detailPanel.setDefineSubtableCB(function(rc, subRec) { this.owner.setSubtable(rc,subRec);});
	    this.ui.detailPanel.setDataOptionsCB(function(prefix,node,comparator) { return(this.owner.getDataOptions(prefix,node,comparator)); });
	    this.ui.detailPanel.setPathDataCB(function(path) {return(this.owner.getLeafPaths(path));} );
	    this.ui.splitPanel.setRightContent(this.ui.detailPanel);
	this.ui.upperPanel.appendChild(this.ui.splitPanel);
	this.root.appendChild(this.ui.upperPanel);
	this.ui.lowerPanel = this.createElement('div',{id:"Lower"});
	  this.ui.specSummary = this.createElement('fhir-table',{id:"SpecSummary"});
	  this.ui.specSummary.injectCSS(this.getTableCSS());
          this.ui.lowerPanel.appendChild(this.ui.specSummary);
	this.root.appendChild(this.ui.lowerPanel);
	this.ui.splitPanel.setSplit("30%");
};

/// Internal callback from the table delete row action
/// The three things we can delete are: normal items;
/// subtable items; and entire subtables
deleteTableEntry(rowNum) {
	const t = this.tableData;
	const rc = t.RC[rowNum];
	const table = t.Table[rowNum];
	const type = t.Type[rowNum];
	const name = t.Column[rowNum];
	if (type=='Subtable') this.removeSubtable(rc,table);
	else if (table!=rc) this.removeSubtableItem(rc,table,name); 
	else this.removeItem(rc,name);
	this.ui.detailPanel.setNode(null,null,null);	
};

/// Internal callback from the table edit row action
editTableEntry(rowNum) {
	const t = this.tableData;
	const rc = t.RC[rowNum];
	const table = t.Table[rowNum];
	const type = t.Type[rowNum];
	const name = t.Column[rowNum];
	var spec = null;
	if (type=='Subtable') spec = this.specification.findSubtable(rc,table);
	else if (table!=rc) {
		spec = this.specification.findSubtableItem(rc,table,name);
		spec.TABLECONTEXT = this.specification.findSubtable(rc,table);
	} 
	else spec = this.specification.findItem(rc,name);

	var path = this.dereferenceFHIRExtension(t.Path[rowNum]);
	if (path!=t.Path[rowNum]) spec.JPL = path;
	this.editDetails(path,spec);
};

/// internal path mangler to address FHIR path extension
dereferenceFHIRExtension(path) {
	const JPL = new JPLUtils();
	var newPath = path;
	if (path.indexOf('.extension?(')>-1) { // trouble case
		const pTree= JPL.parseExpression(path);
		var pIdx = 0;
		while ((pIdx<pTree.length)&&(pTree[pIdx].type!='JPLEnd')) {
			if (pTree[pIdx].value=='extension') {
				pIdx++; // index of JPLFilter node
				var url = pTree[pIdx].value[1].value; // known location of URL
				var lastSlash = url.lastIndexOf('/');
				url = url.substr(lastSlash+1,url.length-lastSlash-2);
				if ((url.charAt(0)=='"')||(url.charAt(0)=="'")) url = url.substring(1);
				pTree.splice(pIdx,1,{type:'JPLSeparator',value:'.'},{type:'JPLNode',value:(url)});
				pIdx++;
			}
			pIdx++;
		}
		newPath = JPL.exportPath(pTree);
	}
	return(newPath);
}

/// internal callback from the include checkbox control
/// of the detailsPanel. If set, tag the current detail panel contents for inclusion
/// else delete any entry associated with the contents from the spec.
/// NEED to check for unique names and include facility to request index
setUpdate(resourceType, columnSpec, isNew) {
	if (columnSpec.TABLECONTEXT) {
		const st = columnSpec.TABLECONTEXT;
		delete columnSpec.TABLECONTEXT;
		this.updateSubtableItem(resourceType, st.name, columnSpec);
	}
	else {
		this.updateItem(resourceType, columnSpec);
	}
};

updateItem(resource,columnSpec) {
	if (columnSpec.RENAMED) { // update includes a new name, deal with this first
		this.specification.renameItem(resource,columnSpec.RENAMED,columnSpec.name);
		delete columnSpec.RENAMED;
	};
	this.specification.updateItem(resource,columnSpec);
	this.postSpecificationChanges();
	columnSpec.JPL = this.dereferenceFHIRExtension(columnSpec.JPL);
	this.editDetails(columnSpec.JPL,columnSpec);
}

updateSubtableItem(resource,tableName,columnSpec) {
	if (columnSpec.RENAMED) { // update includes a new name, deal with this first
		this.specification.renameSubtableItem(resource,tableName,columnSpec.RENAMED,columnSpec.name);
		delete columnSpec.RENAMED;
	};
	this.specification.updateSubtableItem(resource,tableName,columnSpec);
	this.postSpecificationChanges();

	columnSpec.TABLECONTEXT = this.specification.findSubtable(resource,tableName);
	columnSpec.JPL = this.dereferenceFHIRExtension(columnSpec.JPL);
	this.editDetails(columnSpec.JPL,columnSpec);
}

setSubtable(resource, subSpec) {
	if (subSpec.RENAMED) { // update includes a new name, deal with this first
		this.specification.renameSubtable(resource,subSpec.RENAMED,subSpec.name);
		delete subSpec.RENAMED;
	};
	this.specification.defineSubtable(resource,subSpec.name, subSpec.path, subSpec.JPL, subSpec.columns);
	this.postSpecificationChanges();
	this.editDetails(subSpec.JPL,subSpec);
};

/// Callout to spec edit engine to remove an entire subtable and all of its entries
removeSubtable(rc,tableName) {
	this.specification.removeSubtable(rc,tableName);
	this.postSpecificationChanges();
};

/// Callout to spec edit engine to remove an item from a subtable of a given resource
removeSubtableItem(rc,tableName,columnName) {
	this.specification.removeSubtableItem(rc,tableName,columnName);
	this.postSpecificationChanges();
};

/// Callout to spec edit engine to remove an item from a given resource table 
removeItem(rc,columnName) {
	this.specification.removeItem(rc,columnName);
	this.postSpecificationChanges();
};

postSpecificationChanges () {
	const spec0 = this.specification.getClean();
	//console.log(spec0);
	const utils = this.owner.document.getElementById("API");
	const widget = this;
	utils.putTransformSpec(spec0,function(xhr){widget.postSpecConfirm(xhr);});
	this.tableData  = this.xFormSpecToTable(this.specification.get());
	this.ui.specSummary.setData(this.tableData);
	this.ui.specSummary.render();
};

postSpecConfirm(xhr) {
//	console.log("POST RESPONSE TEXT:");
//	console.log(xhr.responseText);
};

 /// For any given path endpoint in the analysis
 /// return an array of known values in the data set 
 getLeafValues(node) {
	const hash = {};
	const v = node.values;
	const len = v.length;
	for (var i=0;i<len;i++) {
		hash[v[i].value] = true;
	}
	const list = [];
	for (var key in hash) list.push(key);
	return(list);	
 }

/// A basic path coming from the DetailPanel may include one or more 
/// "extension" keys.  These require special handling as they do not
/// (under FHIR) follow the normal processing rules for AET data
/// The DetailPanel retains a look-up table (in lexical order) of the
/// keys elided from any path that includes extentions
swizzleFHIRExtensionKeys(path) {
	const pathArray = path.split('.extension');
	const areas = this.ui.detailPanel.extensionDomain;
	var newPath = "";
	var cap = Math.min(areas.length,pathArray.length-1);
	
	for (var i=0;i<cap;i++) {
		newPath+=pathArray[i]+".extension."+areas[i];
	}
	if (pathArray[i]) newPath+=pathArray[i];
	return(newPath);
}

 /// Callback for fliter wizard, for any given path endpoint in the tree,
 /// return an array of known values in the data set based on the analysis
 /// in some cases, check the comparator to see if further processing is
 /// required
 getDataOptions(prefix,node,comparator) {
	const idx = this.sourceIndex;
	if ((!node)&&(comparator=='==')) { // straight up query of values
		return(idx[prefix].values);
	} 
	var path = prefix+node.split("@")[1];
	if ((this.ui.detailPanel)&&(this.ui.detailPanel.extensionDomain)) {
		// Special handling for FHIR "extension" paths
		path = this.swizzleFHIRExtensionKeys(path);
	}
	const list = this.getLeafValues(idx[path]);
	if ((node=='@.reference')&&(comparator=='is of type')) { // strip value to just the beginning
		const hash = {};
		for (var i=list.length-1;i>-1;i--) {
			var rsc = list[i].split('/')[0];
			hash[rsc]=true;
		}
		const list2 = [];
		for (var p in hash) list2.push(p);
		return(list2);
	}
	return(list);
 };

 getLeafPaths(path) {
	var paths={};
	var idx = this.sourceIndex;
	for (var p in idx) {
		var n = idx[p];
		if (n.dataType) {
			paths[p]=n.dataType;
		}
	}
	return(paths);
 };

 showDetails(path) {
	var a = path.split('.');
	for (var i=0;i<a.length;i++) {
		a[i]=a[i].split(' (')[0];
	}
	path = a.join('.');
	var node = this.sourceIndex[path];

	this.ui.detailPanel.setNode(node,null,path);
 };

 editDetails(path, specNode) {
	const JPL = new JPLUtils();
	var easyPath = JPL.getBasePath(path);
	if (path.charAt(0)=='@') {
		easyPath = JPL.getBasePath(specNode.TABLECONTEXT.JPL)+path.substring(1);
	}
	const treeNode = this.sourceIndex[easyPath];
	this.ui.tree.setValue(easyPath);
	if (path.charAt(0)=='@') this.ui.detailPanel.setNode(treeNode,specNode,easyPath);
	else this.ui.detailPanel.setNode(treeNode,specNode,path);	
 };

};

// Define the new element
customElements.define('fhir-tspecwizard', FHIRTSpecWizard);
// Add a footprint in the global space
window.$defined_FHIRTSpecWizard = true;
