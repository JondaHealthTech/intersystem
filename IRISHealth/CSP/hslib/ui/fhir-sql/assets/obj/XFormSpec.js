class XFormSpec {

constructor() {
	this.initData()
};

initData() {
	this.spec = {
		scanId:null,
		name:"",
		resources:[],
	}
};

set(aet) {
	if (typeof(aet)=='string') aet = JSON.parse(aet);
	this.annotateJPL(aet,"");
	this.spec = aet;
};

get() {
	return(this.spec);
};

/// return a copy of the current spec without extra references to 
/// JPL paths
getClean() {
	const json = JSON.stringify(this.spec);
	const obj = JSON.parse(json);
	this.scrubJPL(obj);
	return(obj);
};

/// Given a path in FHIR Path format, if no JPL has been provided
/// parse the FHIRPath into a JPL expression and add the equivalent
/// path to the object
annotateJPL(aet,lastRc) {
	if (aet.resourceType) lastRc = aet.resourceType;
	if ((aet.path)&&(!aet.JPL)) aet.JPL=this.fhirToJPL(aet.path,lastRc);
	if (aet.columns && aet.JPL) { // only happens with subTables nodes
		const utils = new JPLUtils();
		var p = utils.getBasePath(aet.JPL);
		lastRc = p.substring(2);
	}
	for (var key in aet) {
		if (typeof(aet[key])=='object') {
			if (Array.isArray(aet[key])) this.annotateJPLArray(aet[key],lastRc);
			else this.annotateJPL(aet[key],lastRc);
		}
	}
};

annotateJPLArray(aet,lastRc) {
	for (var i=aet.length-1;i>-1;i--) {
		if (typeof(aet[i])=='object') {
			if (Array.isArray(aet[i])) this.annotateJPLArray(aet[i],lastRc);
			else this.annotateJPL(aet[i],lastRc);
		}
	}
};

/// Remove any keys named JPL from the current subtree object
scrubJPL(aet) {
	delete aet.JPL;
	delete aet.rawPath;
	for (var key in aet) {
		if (typeof(aet[key])=='object') {
			if (Array.isArray(aet[key])) this.scrubJPLArray(aet[key]);
			else this.scrubJPL(aet[key]);
		}
	}
};

/// Remove any keys named JPL from objects accessible from the 
/// current array.
scrubJPLArray(aet) {
	for (var i=aet.length-1;i>-1;i--) {
		if (typeof(aet[i])=='object') {
			if (Array.isArray(aet[i])) this.scrubJPLArray(aet[i]);
			else this.scrubJPL(aet[i]);
		}
	}
};

getArchetype() {
	const template = {
  		"scanId": "number",
		"name": "string",
  		"resources": [
 		 	{
				"resourceType":"string",
				"columns": [
					{
						"name": "string",
						"type": "string",
						"path": "string",
						"(JPL)": "string",
						"index?":"boolean",
						"resourceType?":"string"  	
	  				}
	  			],
	  			"subTables?": [
					{
						"name": "string",
						"path": "string",
						"(JPL)": "string",
						"columns": [
		  					{
								"name": "string",
								"type": "string",
								"path": "string",
								"(JPL)": "string",
								"index?": "boolean",
								"resourceType?":"string"  	
		  					}	  
						  ]
					}
				  ]
		  	}
  		],
	      	"version?": "number",
      		"scanStartDateTime?": "string",
		"scanFHIRRepositoryName?": "string",
		"id?": "number",
      		"lastModified?": "string"
	};
	return(template);
};

/*********************/
/** FIND OPERATIONS **/
/*********************/

/// Given an array of similar objects that each define a key named "key"
/// return the the object whose key value matches "value" or null if no
/// such object exists;
fhirFind(arr, key, value) {
	for (var i=arr.length-1;i>-1;i--) {
		var node = arr[i];
		if (node[key]==value) return(node);
	}
	return(null);
};

findResource(rc) {
	return(this.fhirFind(this.spec.resources,"resourceType",rc));
}

findItem(rc,columnName) {
	const spec = this.spec;
	const r = this.findResource(rc);
	if (!r) { // well this shouldn't happen
		console.log("UNABLE TO FIND PARENT RESOURCE ON FIND ITEM: "+rc);
		return(null);
	}
	return(this.fhirFind(r.columns,"name",columnName));
};

findSubtable(rName,tName) {
	const rc = this.findResource(rName);
	if (rc) {
		const st = rc.subTables;
		if (!st) return(null);
		return(this.fhirFind(st,"name",tName));
	}
	else  { // shouldn't be possible but...
		console.log("UNABLE TO FIND PARENT RESOURCE ON REMOVE SUBTABLE: "+rc);
		return(null);
	}
	console.log("UNABLE TO FIND SUBTABLE "+tName+"OF RESOURCE "+rName);
	return(null);
};

findSubtableItem(rName,tName,iName) {
	const t = this.findSubtable(rName,tName);
	if (t) {
		return(this.fhirFind(t.columns,"name",iName));
	}
	console.log("UNABLE TO FIND ITEM "+iName+" OF SUBTABLE "+tName+" OF RESOURCE "+rName);
	return(null);
};

/***********************/
/** RENAME OPERATIONS **/
/***********************/

renameItem(rName, iName, newName) {
	const item = this.findItem(rName,iName);
	if (item) item.name = newName;
};

renameSubtable(rName, tName, newName) {
	const table = this.findSubtable(rName,tName);
	if (table) table.name=newName;
};

renameSubtableItem(rName, tName, iName, newName) {
	const item = this.findSubtableItem(rName,tName,iName);
	if (item) item.name = newName;
};

/*******************************/
/** SIMPLE REMOVAL OPERATIONS **/
/*******************************/

removeResource(rc) {
	var clobber = false;
	const spec = this.spec;
	const rcs = spec.resources;
	for (var r=0;r<rcs.length;r++) {
		var o = rcs[r];
		if (o.resourceType==rc) clobber=true;
		if ((clobber)&&(r<rcs.length-1)) rcs[r]=rcs[r+1];
	}
	rcs.pop();
	return(null);	
};

removeItem(rc,columnName) {
	const spec = this.spec;
	const r = this.findResource(rc);
	if (!r) { // well this shouldn't happen
		console.log("UNABLE TO FIND PARENT RESOURCE ON REMOVE ITEM: "+rc);
	}
	else {
		const c = r.columns;
		for (var idx=0;idx<c.length;idx++) {
			var o=c[idx];
			if (o.name==columnName) { // found it
				c.splice(idx,1);
				if (c.length==0) { // remove resouce?
					// if rc has no subtables either, then it can go
					if ((!r.subtables)||(t.subtables.length)) this.removeResource(rc);
				}
				return;
			}
		}
		// If we made it here, we couldn't match column name
		console.log("UNABLE TO FIND COLUMN SPEC ON REMOVE ITEM: "+columnName);
	}		
};

/// Remove an entire subtable entry from a resource spec
removeSubtable(rc,tableName) {
	const r = this.findResource(rc);
	if (!r) { // shouldn't be possible but...
		console.log("UNABLE TO FIND PARENT RESOURCE ON REMOVE SUBTABLE: "+rc);
		return;
	}
	const c = r.subTables;
	var clobber=false;
	for (var i=0;i<c.length;i++) {
		if (c[i].name==tableName) clobber=true;
		if (clobber && (i<c.length-1)) c[i]=c[i+1];
	}
	if (clobber) c.pop();
};

removeSubtableItem(rc,tableName,columnName) {
	const t = this.findSubtable(rc,tableName);
	if (!t) { // shouldn't be possible but...
		return;
	}
	const c = t.columns;
	var clobber = false;
	const len = t.columns.length;
	for (var i=0;i<len;i++) {
		if (t.columns[i].name==columnName) clobber=1;
		if (clobber && (i<(len-1))) t.columns[i]=t.columns[i+1];
	}
	if (clobber) t.columns.pop();
	if (t.columns.length==0) this.removeSubtable(rc,tableName);
};

/***********************/
/** UPDATE OPERATIONS **/
/***********************/

updateItem(rc,columnSpec) {
	const spec = this.spec;
	const r = this.findResource(rc);
	if (!r) { // brand new, easy case
		spec.resources.push({resourceType:(rc),columns:[(columnSpec)]});
	}
	else {
		if (!r.columns) r.columns=[];
		const c = r.columns;
		for (var idx=0;idx<c.length;idx++) {
			var o=c[idx];
			if (o.name==columnSpec.name) { // replace existing
				c[idx]=columnSpec;
				return;
			}
		}
		// If we made it here, just add to end
		c.push(columnSpec);
	}		
};

/// Define a new subtable within a resource with zero or more
/// columns.
defineSubtable(rc,subtable,path,jpl,columnSpecs) {
	const nuTable = {name:(subtable),path:(path),JPL:(jpl)};
	nuTable.columns = JSON.parse(JSON.stringify(columnSpecs));

	const spec = this.spec;
	const r = this.findResource(rc);
	if (!r) { // brand new, easy case
		spec.resources.push({resourceType:(rc),columns:[],subTables:[(nuTable)]});
		return(true);
	}
	else { // resource already part of spec
		const hasOne = this.findSubtable(rc,subtable);
		if (hasOne) { // subtable already exists, assume an update
			this.updateSubtable(hasOne,nuTable);
		}
		else { // just tack on a new record
			if (r.subTables) r.subTables.push(nuTable);
			else r.subTables = [nuTable];
		}
	}
	return(true);
};

updateSubtable(oldSpec, newSpec) {
	// Name has to be changed separately as it is an access key, so that stays.
	if (oldSpec.path!=newSpec.path) oldSpec.path = newSpec.path;
	// for columns, in general we want the new set, but if a prior
	// column has path modifications, we want preseve those
	const c = newSpec.columns;
	for (var i=0;i<c.length;i++) {
		var oldItem = this.fhirFind(oldSpec.columns,"name",c[i].name);
		if (oldItem) {
			if (oldItem.JPL!=c[i].JPL) c[i].JPL=oldItem.JPL;
			if (oldItem.path!=c[i].path) c[i].path=oldItem.path;
		}
	}
	oldSpec.columns = c;
};

updateSubtableItem(rName, tName, columnSpec) {
	const node = this.findSubtableItem(rName,tName,columnSpec.name);
	if (!node) return;
	node.index = columnSpec.index;
}

/// NOTE this is not a general FHIRPath parser, it was only designed to digest
/// expressions that follow the same templates used by exportFHIRPath in the
/// JPLFilterWizard.
fhirToJPL(str,resource) {
	const LOG = false;
	if (LOG) {
		console.log("\n\n FHIR TO JPL \n");
		console.log(resource+":"+str);
	}
	var nestedNot = false;
	var state = 0;
	var jpl = "$.";
	var tail = str;
	var tmp = null;
	while (tail) {
		if (LOG) console.log("JPL: "+jpl);
		if (state==0) { // resource name
			if (LOG) console.log("looking for resource : "+resource);
			tmp=this.parseFHIRToken(tail,["."]);
			tail=tmp.tail.substring(1); // skip the dot
			if (LOG) {
				console.log("token: "+tmp.token);
				console.log("tail: "+tmp.tail);
			}
			if (tmp.token!=resource) { //short FHIR Path
				jpl+=resource+"."; //start from beginning
			}
			jpl+=tmp.token;
			state=2;
		}
		else if (state==2) { // resource attribute or where clause
			if (LOG) console.log("LOOKING for next tier or where clause");
			tmp=this.parseFHIRToken(tail,[".","("]);
			if (LOG) {
				console.log("token: "+tmp.token);
				console.log("tail: "+tmp.tail);
			}
			tail=tmp.tail.substring(1);
			if (tmp.tail.charAt(0)!="(") { // just a token
				jpl+="."+tmp.token;
			}
			else { // conditional clause
				jpl+='?(';
				state=3;
			}
		}
		else if (state==3) { // first operator of a conditional
			nestedNot=false;
			if (LOG) console.log("first op of a conditional");
			tmp=this.parseFHIRToken(tail,[" ","=","!=","<",">","<=",">=","."]);
			if (LOG) {
				console.log("token: "+tmp.token);
				console.log("tail: "+tmp.tail)
			}
			tail=tmp.tail;
			if (tmp.token=="resolve()") { // specialty case
				jpl+='@.reference';
			}
			else if (tmp.token.charAt(0)=='(') { // nested paren
				// at this point we only use these for negation
				jpl+='@.'+tmp.token.substring(1);
				nestedNot = true;
			}
			else { // usual situation
				jpl+='@.'+tmp.token;
			}

			if (tmp.tail.charAt(0)!=".") {
				state=5;
			}
			else {
				tail = tail.substring(1);
				state=4;
			}			
		}
		else if (state==4) { // possible continuation of first operator of a conditional
			if (LOG) console.log("continuation of 1st operand");
			tmp=this.parseFHIRToken(tail,[" ","=","!=","<",">","<=",">=",".","("]);
			if (LOG) {
				console.log("token: "+tmp.token);
				console.log("tail: "+tmp.tail);
			}
			tail=tmp.tail.substring(1);
			var token = tmp.token;
			if (tmp.tail.charAt(0)=="(") { // end token was a function
				if ((token=="exists")||(token=="empty")) { //unary function
					tail=tmp.tail.substring(2); // skip "()"
					if (token=="exists") jpl+=" exists";
					if (token=="empty") jpl+=" is unknown";
					state=7; // balance of conditional
				}
				else { // function that takes an argument
					if (token=="startsWith") jpl+=" starts with ";
					if (token=="matches") jpl+=" like_regex";
					state = 6; // function argument
				}
			}
			else {
				jpl+='.'+tmp.token;
				if (tmp.tail.charAt(0)!='.') state=5; 
			}
		}
		else if (state==5) { // conditional operators
			if (LOG) console.log("looking for operator in:"+tail);
			tmp = this.parseFHIROperator(tail);
			if (nestedNot && tmp.token=="==") tmp.token = "!=";
			if (LOG) {
				console.log("token: "+tmp.token);
				console.log("tail: "+tmp.tail);
			}
			jpl+=tmp.token;
			tail = tmp.tail;
			state = 7;
		}
		else if (state==6) { // function argument
			if (LOG) console.log("looking for function arg");
			tmp=this.parseFHIRToken(tail,[")"]);
			if (LOG) {
				console.log("token: "+tmp.token);
				console.log("tail: "+tmp.tail);
			}
			jpl+=tmp.token+')';
			tail=tmp.tail.substring(1);
			state = 2;
		}
		else if (state==7) { // balance of where clause
			if (LOG) console.log("balance of where clause");
			tmp=this.parseFHIRToken(tail,[")"]);
			if (LOG) {
				console.log("token: "+tmp.token);
				console.log("tail: "+tmp.tail);
			}
			jpl+=tmp.token+')';
			if (nestedNot) {
				tail=tmp.tail.substring(9);
				nestedNot=false;
			}
			else tail=tmp.tail.substring(2);
			state = 2;
		}
	}
	if (LOG) console.log("RETURNING: "+jpl);
	return(jpl);		
}

parseFHIROperator(str) {
	const obj = {token:""};
	while (str.charAt(0)==' ') str=str.substring(1); // skip spaces
	if (str.indexOf('>=')==0) {
		obj.token='>=';
		str=str.substring(2);
	}
	else if (str.indexOf('<=')==0) {
		obj.token='<=';
		str=str.substring(2);
	}
	else if (str.indexOf('!=')==0) {
		obj.token='!=';
		str=str.substring(2);
	}
	else if (str.indexOf('>')==0) {
		obj.token='>';
		str=str.substring(1);
	}
	else if (str.indexOf('<')==0) {
		obj.token='<';
		str=str.substring(1);
	}
	else if (str.indexOf('=')==0) {
		obj.token='==';
		str=str.substring(1);
	}
	else if (str.indexOf('is')==0) {
		obj.token=' is of type ';
		str=str.substring(2);
	}
	while (str.charAt(0)==' ') str=str.substring(1); // skip spaces
	obj.tail = str;	
	return(obj);
}

parseFHIRToken(str,terminators) {
	var obj ={};
	if (str.charAt(0)=='"') { // double quoted string read to end
		var last = str.indexOf('"',1);
		obj.token = str.substring(0,last+1);
		obj.tail = str.substring(last+1);
		return(obj);
	}
	if (str.charAt(0)=="'") { // single quoted string read to end
		var last = str.indexOf("'",1);
		obj.token = str.substring(0,last+1);
		obj.tail = str.substring(last+1);
		return(obj);
	}
	// otherwise, read util we hit the nearest terminator
	var best = str.length;
	var bIdx = -1;
	var n = terminators.length;
	for (var i=0;i<n;i++) {
		var idx = str.indexOf(terminators[i]);
		if ((idx>0)&&(idx<best)) {
			best = idx;
			bIdx = i;
		}
	}
	if (bIdx==-1) { // end of string
		obj.token = str;
		obj.tail = ""
		return(obj);
	}
	obj.token = str.substring(0,best);
	obj.tail = str.substring(best);
	return(obj);
};

}; // End of class XFormSpec

window.$defined_XFormSpec = true;

