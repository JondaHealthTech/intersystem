/// Internal REST API Explorer Utility Web Page
/// (c) 2017, InterSystems Corp. All rights reserved
///
/// This code is intended for internal consumption only and
/// is subject to change (or removal) without notice.
/// Partners and other development organizations should refrain
/// from introducing dependencies on this this code base in
/// their own applications to mitigate maintenance risks in the 
/// future.
/////////////////////

APIExplorer = {}

APIExplorer.initialize = function(div) {
	APIExplorer.editMode = 0;

	APIExplorer.pageContents = div;

	APIExplorer.host = "//"+window.location.host;
	APIExplorer.serverApp = "/api/mgmnt"
	APIExplorer.defineContextMenuUtils();

	APIExplorer.appList = APIExplorer.getAPIList();
	
}

APIExplorer.getAPIModel = function(cspApp) {
	var req = {
		url:(APIExplorer.host+cspApp),
		method:"GET",
		acceptType:"application/json",
		async:true,
		callback:APIExplorer.initializeAPIPane
	}
	APIExplorer.simpleSubmitRequest(req);
}

APIExplorer.initializeAPIPane = function(xhr) {
	APIExplorer.model = JSON.parse(xhr.responseText);

	APIExplorer.render = document.getElementById("Render");
	var html = [];
	html.push('<div style="position:absolute;left:1%;bottom:0px;top:0px;right:61%;overflow:scroll;">');
	APIExplorer.renderSubsection(APIExplorer.model,html,0,"APIExplorer.model");
	html.push('</div>');
	html.push('<div id="EditorArea" style="position:absolute;left:41%;bottom:0px;top:0px;right:1%;font:16px Arial;overflow:scroll;"></div>');
	APIExplorer.render.innerHTML=html.join("\n");
}


APIExplorer.getAPIList = function() {
	var req = {
		url:(APIExplorer.host+APIExplorer.serverApp+"/v1/%25SYS/restapps"),
		method:"GET",
		acceptType:"application/json",
		async:true,
		callback:APIExplorer.initializeAppSelector
	}
	APIExplorer.simpleSubmitRequest(req);
}

APIExplorer.initializeAppSelector = function(xhr) {
	APIExplorer.appList = JSON.parse(xhr.responseText);

	var html = []
	html.push('<div id="Picker" style="display:inline-block;width:100%;height:4%;border-bottom:2px solid #000042;">');
	html.push('<select style="font-size:20px;font-weight:bold" onchange="APIExplorer.selectAPICB(this.value);" >');
	var len = APIExplorer.appList.length;
	for (var i=0;i<len;i++) {
		var name = APIExplorer.appList[i].name;
		var value = APIExplorer.appList[i].swaggerSpec;
		var value = value.split("/spec/").join("/model/");
		html.push('<option value="'+value+'">'+name+'</option>');
	}
	html.push('</select>');
	html.push('</div>');
	html.push('<div id="Render" style="width:100%;height:94%;position:relative;">');
	html.push('</div>');
	html.push('<textarea id="text" style="width:100%;height:2%"></textarea>');
	
	APIExplorer.pageContents.innerHTML = html.join("");
}

APIExplorer.selectAPICB = function(value) {
	APIExplorer.getAPIModel(value);	
}


APIExplorer.renderPathDetailsCB = function(sectionPath, nodeIdx) {
	var section = eval(sectionPath);
	var node = section.model.routes.route[nodeIdx];
	var div = document.getElementById("EditorArea");
	var nodePath = sectionPath+".model.routes.route["+nodeIdx+"]";
	APIExplorer.renderRouteEditor(section,node,APIExplorer.editMode,div,nodePath);
}

APIExplorer.renderSubsection = function(aet, html, depth, path) {
	var m=aet.model;
	var prefix=aet.urlPrefix;
	if (depth==0) {
		// insert "main" apiInfo here
		html.push('<div class="introSection">'+aet.cspApplication+'</div>');
	}
	html.push('<div class="sectionHeader'+depth+'">'+m.apiInfo.title+'</div>');
	var r=m.routes.route;
	if (r) {
		html.push('<table><tbody>');
		var len = r.length;
		var rStyle = "rowOdd";
		for (var i=0;i<len;i++) {
			if (!r[i].hidden) {
				if (rStyle=="rowOdd") {
					rStyle="rowEven";
				}
				else {
					rStyle = "rowOdd";
				}
				var event = ' onclick="APIExplorer.renderPathDetailsCB(\''+path+'\','+i+');" '
				html.push('<tr class="routeURL '+rStyle+'"'+event+'><td>'+r[i].method+'</td><td>'+prefix+r[i].url+'</td></tr>');
			}
		}		
		html.push('</tbody></table>');
	}
	var fwd=aet.forwards;
	if (fwd) {
		var len = fwd.length;
		for (var i=0;i<len;i++) {
			APIExplorer.renderSubsection(fwd[i],html,depth+1,path+'.forwards['+i+']');
		}
	}
}

/// given a section of the forwards model, walk the chain of 
/// forward to get the path leading to the given section
APIExplorer.getCriticalPath = function(start, section) {
	var path = [];
	if (start==section) {
		path.push(start);
		return (path);
	}
	else {
		var fwd = start.forwards;
		var len = fwd.length;
		for (var i=0;i<len;i++) {
			var p1 = APIExplorer.getCriticalPath(fwd[i],section)
			var p1len = p1.length;
			if (p1len>0) {
				path.push(start);
				for (var j=0;j<p1len;j++) path.push(p1.shift());
				return (path);
			}
		}
	  }
	return([])
}

APIExplorer.getPathToSection = function(start, section, prefix) { 
	if (start==section) return(prefix);
	var fwd = start.forwards;
	var len = fwd.length;
	for (var i=0;i<len;i++) {
		var p1 = APIExplorer.getPathToSection(fwd[i],section,prefix+".forwards["+i+"]")
		if (p1) return (p1);
	}
	return(null);
}

APIExplorer.getInheritedParameters = function(forwardPath) {
	var parms = []
	var len = forwardPath.length;
	for (var i=0;i<len;i++) {
		var node = forwardPath[i];
		if (node.localParameters) {
			var prefix = APIExplorer.getPathToSection(APIExplorer.model,node,"APIExplorer.model")
			var lp = node.localParameters;
			for (var j=0;j<lp.length;j++) {
				var pName = lp[j];
				var pArr = node.model.parameterDefs.parameter;
				for (var k=pArr.length-1;k>=0;k--) {
					var key = pArr[k].key;
					if (key==pName) {
						var pNode = pArr[k];
						pNode["$UPDATE_PATH"]=prefix+".model.parameterDefs.parameter["+k+"]";
						parms.push(pNode);
					}
				}
			}
		}
	}
	return(parms);
}

APIExplorer.getComputedPropertyList = function(origin, route, propName) {
	var o = {};
	for (var i=0;i<origin.length;i++) {
		var node = origin[i];
		var val = node[propName];
		if (val) {
			for (var j=0;j<val.length;j++) {
				var p = val[j];
				if (p.indexOf("-")==0) {
					o[(p.substring(1))]=false;
				}
				else o[p]=true;
			}
		}
	}
	var node = route;
	var val = node[propName];
	if (val) {
		for (var j=0;j<val.length;j++) {
			var p = val[j];
			if (p.indexOf("-")==0) {
				o[(p.substring(1))]=false;
			}
			else o[p]=true;
		}
	}
	var l = [];
	for (p in o) {
		if (o[p]) l.push(p);
	}
	return(l);
}

APIExplorer.renderSectionHeader = function(section, editable, div) {
	// Captions
	var txtHost = "Host:";
	var txtBasePath = "Prefix path:";
	var txtSchemes = "Supported schemes:";
	var txtConsumes = "Consumes:";
	var txtProduces = "Produces:";
	var txtSecurity = "Security:";
	var txtTags = "Tags:";
	var txtExternalDocs = "See also:";
	
	var layout = {
		"apiInfo":"",
		"host":(txtHost),
		"basePath":(txtBasePath),
		"schemes":(txtSchemes),
		"consumes":(txtConsumes),
		"produces":(txtProduces),
		"security":(txtSecurity),
		"tags":(txtTags),
		"externalDocs":(txtExternalDocs) };
	var origin = APIExplorer.getCriticalPath(APIExplorer.model,section);
}

APIExplorer.renderRouteEditor = function(section, node, editable, div, nodePath) {
	var origin = APIExplorer.getCriticalPath(APIExplorer.model,section);
	//Captions:
	var txtSummary = "Summary";
	var txtDescription = "Description";
	var txtResponses = "Responses";
	var txtTryIt = "Try it";
	var txtStatus = "Status";
	var txtDefault = "default";
	var txtSave = "Save changes";
	var txtSchema = "Schema";
	
	//Style 
	var textAreaStyle = "width:95%;resize:none;font:16px Arial;margin-left:2%;margin-right:2%;"
	if (!editable) textAreaStyle += "border:none;"
	
	var callbackIntro =' onchange="APIExplorer.serviceEdits(this,\''+nodePath+'\',\'';

	var html = [];
	var prefix=section.urlPrefix;
	var title = node.method+"&nbsp;"+prefix+node.url;
	html.push('<span class="pathEditorHeader">'+title+'</span><br />');

	html.push('<div class="editorHeader0">'+txtSummary+'</div>');
	var value = "";
	if (node.summary) value=node.summary;
	html.push('<textarea id="SummaryCtrl" '+callbackIntro+'summary\');" style="'+textAreaStyle+'">'+value+'</textarea>');

	html.push('<div class="editorHeader0">'+txtDescription+'</div>');
	var value = "";
	if (node.description) value=node.description;
	html.push('<textarea id="DescriptionCtrl" '+callbackIntro+'description\');" style="'+textAreaStyle+'">'+value+'</textarea>');
	
	APIExplorer.renderParameterTable(origin, section, node, editable, html, nodePath);
	APIExplorer.renderResponsesTable(origin, section, node, editable, html, nodePath);

	html.push('<hr/>');
	html.push('<button type="button" style="margin-top:7px;width:100%;font:bold 14px Arial;" onclick="APIExplorer.serviceRequestSection(this);">'+txtTryIt+'</button>');	
	html.push('<div id="RequestForm"> </div>');
	html.push('<div id="RequestLabel"> </div>');
	html.push('<div id="RequestSubmitArea" style="display:none;"> </div>');
	html.push('<div id="ResponseLabel"> </div>');
	html.push('<div id="ResponseArea" style="display:none;"> </div>');
	div.innerHTML=html.join("");

	APIExplorer.renderRequestForm(origin,section,node,document.getElementById("RequestForm"));

	// Right size textArea boxes
	var ctrls = ["SummaryCtrl","DescriptionCtrl"];
	APIExplorer.rightSizeTextAreaBoxes(ctrls);
	if (editable) {
		var pPop = new APIExplorer.PopMenu();
		pPop.add("Add parameter",function(target){alert("add");});
		pPop.add("Delete parameter",function(target){alert("kill");});
		pPop.bind(document.getElementById("RouteParameterTable"));
	}
}

APIExplorer.renderParameterTable = function(origin, section, node, editable, html, nodePath) {
	var txtParameters = "Parameters";
	var txtName = "Name";
	var txtLocation = "Location";
	var txtRequired = "Required";
	var txtSchema = "Schema";

	html.push('<div class="editorHeader0">'+txtParameters+'</div>');
	//build table here
	html.push('<table id="RouteParameterTable"><thead class="editorTableHeader"><tr>');
	html.push('<td>'+txtName+'</td>');
	html.push('<td>'+txtLocation+'</td>');
	html.push('<td>'+txtRequired+'</td>');
	html.push('<td>'+txtSchema+'</td>');
	html.push('</tr></thead><tbody>');
	//First do inherited properties
	var p = APIExplorer.getInheritedParameters(origin);
	var len = p.length
	for (var i=0;i<len;i++) {
		APIExplorer.renderParameterTableRow(p[i],editable,html);
	}
	//Then do local properties
	var p = node.parameters;
	var len = p.length
	for (var i=0;i<len;i++) {
		var pNode = p[i];
		pNode["$UPDATE_PATH"]=nodePath+".parameters["+i+"]";
		APIExplorer.renderParameterTableRow(p[i],editable,html);
	}
	html.push('</tbody></table>');
}

APIExplorer.renderParameterTableRow = function(o, editable, html) {
	var title = "";
	if (o.description) title = ' title="'+o.description+'" ';
 //o.type could be a schema and should be preformated
 	html.push('<tr>');
 	if (editable) {
		var basePath = o["$UPDATE_PATH"];
		var callbackIntro =' onchange="APIExplorer.serviceEdits(this,\''+basePath+'\',\'';

		html.push('</tr><tr style="border-bottom:none;">');
		html.push('<td colspan="4">');
		html.push('<input type="text" value="'+o.description+'" '+callbackIntro+'description\');" style="width:99%;"/>');
		html.push('</td><tr>');
		html.push('<td'+title+'><input type="text" value="'+o.name+'"/></td>');
		// select box for location
		html.push('<td>');
		APIExplorer.renderSelectBox(
			["query","header","path","formData","body"],
			["Query","Header","Path","Form Data","Body"],
			o["in"],
			html, callbackIntro+'in\'\');"');
		html.push('</td>');
		// selectBox for Required
		html.push('<td>');
		APIExplorer.renderSelectBox(["true","false"],["True","False"],o.required,html,callbackIntro+'required\'\');"');
		html.push('</td>');
		// selectBox for Type with optional schema
		html.push('<td>');
		APIExplorer.renderSelectBox(
			["array","boolean","file","integer","number","object","string"],
			["Array","Boolean","File","Integer","Number","Object","String"],
			o.type,
			html, callbackIntro+'type\');"');
		if (o.type=='array') { // add a text area for "items" schema
		}
		else if (o.type=='object') { // add a text area for schema
		}				
		html.push('</td>');
 	}
 	else {
		html.push('<td'+title+'>'+o.name+'</td>');
		html.push('<td>'+o["in"]+'</td>');
		html.push('<td>'+o.required+'</td>');
		html.push('<td>'+o.type+'</td>');
 	}
	html.push('</tr>');
}

APIExplorer.serviceEdits = function(ctrl, parentPath, field) {
	var parent = eval(parentPath);
	parent[field]=ctrl.value;
}

APIExplorer.renderResponsesTable = function(origin, section, node, editable, html, nodePath) {
	var txtResponses = "Responses";
	var txtDescription = "Description";
	var txtStatus = "Status";
	var txtSchema = "Schema";

	html.push('<div class="editorHeader0">'+txtResponses+'</div>');
	//build table here
	html.push('<table><thead class="editorTableHeader"><tr>');
	html.push('<td>'+txtStatus+'</td>');
	html.push('<td>'+txtDescription+'</td>');
	html.push('<td>'+txtSchema+'</td>');
	html.push('</tr></thead><tbody>');
	var resp = node.responses.response;
	for (var i=0;i<resp.length;i++) {
		APIExplorer.renderResponsesTableRow(resp[i], editable, html)
	}
	if (node.responses["default"]) {
		APIExplorer.renderResponsesTableRow(node.responses["default"], editable, html)
	}
	html.push('</tbody></table>');
}

APIExplorer.renderResponsesTableRow = function(o, editable, html) {
	var txtDefault = "default";

	html.push('<tr>');
	var prettySchema = o.schema;
	if (prettySchema) prettySchema = JSON.stringify(prettySchema,null,"  ");

	var codes=[200,201,202,203,204,205,206,207,208,226,300,301,302,303,304,305,306,307,308,400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,418,421,422,423,424,426,428,429,431,451,500,501,502,503,504,505,506,507,508,510,511];
	var labels=[
		"200 OK","201 Created","202 Accepted","203 Non-Authoritative Information","204 No Content","205 Reset Content",
		"206 Partial Content","207 Multi-Status","208 Already Reported","226 IM Used",
		"300 Multiple Choices","301 Moved Permanently","302 Found","303 See Other","304 Not Modified","305 Use Proxy","306 Switch Proxy","307 Temporary Redirect","308 Permanent Redirect",
		"400 Bad Request","401 Unauthorized","402 Payment Required","403 Forbidden","404 Not Found",
		"405 Method Not Allowed","406 Not Acceptable","407 Proxy Authentication Required","408 Request Timeout","409 Conflict",
		"410 Gone","411 Length Required","412 Precondition Failed","413 Payload Too Large","414 URI Too Long","415 Unsupported Media Type","416 Range Not Satisfiable",
		"417 Expectation Failed","418 I'm a teapot","421 Misdirected Request","422 Unprocessable Entity","423 Locked","424 Failed Dependency",
		"426 Upgrade Required","428 Precondition Required","429 Too Many Requests","431 Request Header Fields Too Large","451 Unavailable For Legal Reasons",
		"500 Internal Server Error","501 Not Implemented","502 Bad Gateway","503 Service Unavailable","504 Gateway Time-out","505 HTTP Version Not Supported",
		"506 Variant Also Negotiates","507 Insufficient Storage","508 Loop Detected","510 Not Extended","511 Network Authentication Required"
		];
	var textareaParms = 'style="font-size:15px;width:98%;border:none;resize:none;" readonly';
	if (editable) {
		textareaParms = 'style="font-size:15px;width:98%;"';
	}
	
	if (o.status) {
		html.push('<td>');
		if (editable) {
			APIExplorer.renderSelectBox(codes,labels,o.status,html);
		}
		else {
			for (var i=codes.length-1;i>=0;i--) {
				if (codes[i]==o.status) {
					html.push(labels[i]);
					i= -1;
				}
			}
		}
		html.push('</td>');
	}
	else html.push('<td>'+txtDefault+'</td>');
		
	if (o.description) html.push('<td><textarea '+textareaParms+'>'+o.description+'</textarea></td>');
	else html('<td><textarea '+textareaParms+'>(no details)</textarea></td>');
		
	if (o.schema) html.push('<td><textarea '+textareaParms+'>'+prettySchema+'</textarea></td>');
	else html.push('<td><textarea '+textareaParms+'>(unknown)</textarea></td>');
	
	html.push('</tr>');
}

APIExplorer.renderSelectBox = function(options, labels, value, html, callbackStr) {
	if (!callbackStr) callbackStr = "";
	var opt = {};
	var len = options.length;
	for (var i=0;i<len;i++) {
		opt[options[i]] = {txt:(labels[i]),sel:0}
	}
	opt[value].sel=1;
	html.push('<select style="max-width:100px" '+callbackStr+'>');
	for (p in opt) {
		var pick = opt[p];
		var s = '';
		if (pick.sel==1) s = ' selected'; 
		html.push('<option value="'+p+'"'+s+'>'+pick.txt+'</option>');
	}
	html.push('</select>');
}

APIExplorer.serviceRequestSection = function(who) {
	var txtTryIt = "Try it";
	var txtHideRequestForm = "Hide Request Form";
	var form = document.getElementById("RequestForm");
	var rqLabel = document.getElementById("RequestLabel");
	var rqArea = document.getElementById("RequestSubmitArea");
	var rsLabel = document.getElementById("ResponseLabel");
	var rsArea = document.getElementById("ResponseArea");
	
	if (who.innerHTML==txtTryIt) {
		who.innerHTML = txtHideRequestForm;
		form.style.display="block";
		rqArea.style.display="block";
		rqLabel.style.display="block";
		rsArea.style.display="block";
		rsLabel.style.display="block";
	}
	else {
		who.innerHTML = txtTryIt;
		form.style.display="none";
		rqArea.style.display="none";
		rqLabel.style.display="none";
		rsArea.style.display="none";
		rsLabel.style.display="none";
	}
}

APIExplorer.renderRequestForm = function(origin, section, node, div) {
	var pd = APIExplorer.priorDefaults;
	if (!pd) {
		APIExplorer.priorDefaults = {};
		pd = APIExplorer.priorDefaults;

	pd.namespace = "SAMPLES";
	}	

	var refObj = {origin:(origin), section:(section), node:(node)};
	//Captions:
	var txtRequest = "Request";
	var txtScheme = "Scheme";
	var txtAccept = "Accept";
	var txtContentsType = "Contents Type";
	var txtAuthorization = "Authorization";
	var txtUsername = "Username";
	var txtPassword = "Password";
	var txtParameters = "Parameters";
	var txtSubmitRequest = "Submit Request";
		
	//Style 
		
	var schemes = APIExplorer.getComputedPropertyList(origin,node,"schemes");
	if (schemes.length == 0 ) schemes=['http'];
	var accepts = APIExplorer.getComputedPropertyList(origin,node,"produces");
	accepts.unshift('*/*');
	var contents = APIExplorer.getComputedPropertyList(origin,node,"consumes");
	if (contents.length == 0) contents = ['text/plain'];
	
	var html = [];
	var prefix=section.urlPrefix;
	html.push('<hr />');
	html.push('<div class="editorHeader0">'+txtRequest+'</div>');
	html.push('<div style="background:#dddddd;border-radius:3px;border:1px solid #777777;padding:7px;">');

	html.push('<div class="editorHeader1">'+txtScheme+'</div>');
	html.push('<select id="SchemeCtrl" style="width:90%;margin-left:5%;">');
	for (var i=0;i<schemes.length;i++) html.push('<option value="'+schemes[i]+'">'+schemes[i]+'</option>');
	html.push('</select>');

	html.push('<div class="editorHeader1">'+txtAccept+'</div>');
	html.push('<select id="AcceptCtrl" style="width:90%;margin-left:5%;">');
	for (var i=0;i<accepts.length;i++) html.push('<option value="'+accepts[i]+'">'+accepts[i]+'</option>');
	html.push('</select>');

	html.push('<div class="editorHeader1">'+txtAuthorization+'</div>');
	html.push('<div class="editorFieldName">'+txtUsername+':');
	html.push('<input id="UsernameCtrl" class="editorFieldInput" type="text" ');
	if (pd.user) html.push(' value="'+pd.user+'" ');
	html.push(' ></input>');
	html.push('</div>');
	
	html.push('<div class="editorFieldName">'+txtPassword+':');
	html.push('<input id="PasswordCtrl" class="editorFieldInput" type="password"');
	if (pd.passwd) html.push(' value="'+pd.passwd+'" ');
	html.push(' ></input>');
	html.push('</div>');

	html.push('<div class="editorHeader1">'+txtParameters+'</div>');

	var pName = [];
	var p = APIExplorer.getInheritedParameters(origin);
	var len = p.length
	for (var i=0;i<len;i++) {
		var o=p[i];
		html.push('<div class="editorFieldName">'+o.name+':');
		html.push('<input id="Param'+o.name+'Ctrl" class="editorFieldInput" type="text" ');
		if (pd[o.name]) html.push(' value="'+pd[o.name]+'" ');
		html.push('></input>');
		html.push('</div>');
		pName.push({name:(o.name),"in":"path"});
	}

	var p = node.parameters;
	var len = p.length
	for (var i=0;i<len;i++) {
		var o=p[i];
		if (o["in"]=='body') {
	 		html.push('<div class="editorFieldName">');
	 		var title = "";
	 		if (o["description"])var title=' title="'+o.description+'" ';
	 		html.push('<div '+title+'style="display:inline-block;height:100px">'+o.name+':</div>');
			// give them a text area and a contents control
			html.push('<textArea id="Param'+o.name+'Ctrl" class="editorFieldInput" type="text" style="height:100px;" ');
			if (pd[o.name]) html.push(' value="'+pd[o.name]+'" ');
			html.push('></textArea>');
			html.push('<div class="editorHeader1">'+txtContentsType+'</div>');
			html.push('<select id="ContentCtrl" style="width:90%;margin-left:5%;">');
			for (var j=0;j<contents.length;j++) html.push('<option value="'+contents[j]+'">'+accepts[j]+'</option>');
			html.push('</select>');

		}
		else {
	 		html.push('<div class="editorFieldName">'+o.name+':');
			html.push('<input id="Param'+o.name+'Ctrl" class="editorFieldInput" type="text" ');
			if (pd[o.name]) html.push(' value="'+pd[o.name]+'" ');
			html.push('></input>');
		}
		html.push('</div>');
		pName.push({name:(o.name),"in":(o["in"])});
	}
	refObj.parameters = pName;
	html.push('</div>');
	html.push('<button type="button" style="margin-top:7px;width:100%;font:bold 14px Arial;" onclick="APIExplorer.processRequestForm();">'+txtSubmitRequest+'</button>');	

	html.push('<hr/>');
	div.innerHTML=html.join("");
	div.style.display="none";
	APIExplorer.currentRequest = refObj;
}

/// This builds up an abstract model of a request object based on 
/// values entered into the generated form.  NOTE that the username and
/// password have been hard-coded here for speed of testing.
APIExplorer.processRequestForm = function() {
	var pd = APIExplorer.priorDefaults;
	var refObj = APIExplorer.currentRequest;
	if (!refObj) return;
	var r = {};

	var url = refObj.section.cspApplication+refObj.section.urlPrefix+refObj.node.url;
	var query = "";
	var headers = {};
	// Associate values with the various parameters
	var pObj = refObj.parameters;
	for (var i=0;i<pObj.length;i++) {
		var p = pObj[i];
		p.value = document.getElementById("Param"+p.name+"Ctrl").value;
		pd[p.name]=p.value;
		
		if (p["in"]=="path") { // splice this out of the Url
			url = url.split(":"+p.name).join(p.value);
		}
		else if (p["in"]=="query") { 
			if (query=="") query = '?'+p.name+'='+p.value;
			else query+= '&'+p.name+'='+p.value;
		}
		else if (p["in"]=="header") { 
			header[p.name]=p.value;
		}
		else if (p["in"]=="body") {
			r.body = p.value;
		}
	}
		
	r.hostname = refObj.section.model.host;
	r.url = encodeURI(url+query);
	r.headers = headers;
	
	r.method = refObj.node.method;
	r.user = document.getElementById("UsernameCtrl").value;
	r.passwd = document.getElementById("PasswordCtrl").value;

	pd.user = r.user;
	pd.passwd = r.passwd;
	
	r.callback = APIExplorer.processResponse;
	r.acceptType = document.getElementById("AcceptCtrl").value;
	if (typeof(r.body)!="undefined") {
		r.contentType = document.getElementById("ContentCtrl").value;
	}

	pd.acceptType = r.acceptType;
	pd.contentType = r.contentType;
	
	APIExplorer.submitRequest(r);
}

APIExplorer.rightSizeTextAreaBoxes = function(list) {
	for (var i=list.length-1;i>=0;i--) {
		var txt = document.getElementById(list[i]);
		var h = 20;
		txt.style.height=h+"px";
		while ((h<101)&&(txt.scrollHeight>txt.clientHeight)) {
			h +=20;
			txt.style.height=h+"px";
		}
	}
}


APIExplorer.simpleSubmitRequest = function(r) {
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
	if (r.user) {
		var tmp=r.user;
		if (r.passwd) tmp=r.user+':'+r.passwd;
		var authStr = "Basic "+btoa(tmp);
		xhr.setRequestHeader("Authorization",authStr);
	}
		
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
}




/// This generic method takes a request profile in the 
/// form of a JS object and initiates a simple HTTP Request.
/// The request profile may include the any of the following: <br />
/// url - the resourse to request <br />
/// method - the method to use, one of GET, PUT, POST, etc. <br />
/// user - user name for authentication purposes <br />
/// passwd - user password for authentication purposes <br />
/// headers - additonal headers to send <br />
/// acceptType - preferred MIME type for the response <br />
/// contentType - MIME type of request body <br />
/// body - content of request body <br />
/// async - flag to indicate request should be made asynchronously <br />
/// callback - method to when complete (request object will be passed in as sole parameter) <br />
APIExplorer.submitRequest = function(r) {
	var div = document.getElementById("RequestSubmitArea");

	var rqLabel = document.getElementById("RequestLabel");
	var rqArea = document.getElementById("RequestSubmitArea");
	var rsLabel = document.getElementById("ResponseLabel");
	var rsArea = document.getElementById("ResponseArea");

	rqLabel.innerHTML = "Request";
	rsLabel.innerHTML = "Response";

	var html=[];
	html.push('<b>Host:</b>'+r.hostname+'<br/>');
	html.push('<b>'+r.method+'</b><br/>');
	html.push('<b>URL:</b>'+r.url+'<br/>');
	
 	// check for required properties
	if (!r || !r.method || !r.url ) return;

	// create gemeric request
	var xhr = new XMLHttpRequest();

	// customize for our request, async calls by default
	if (r.async=='undefined') r.async = true;
	xhr.open(r.method,r.url,r.async);

	// set up callback handler
	xhr.onload = function () {
  		//if (xhr.status === 200) {
    		if (r.callback) {
				r.callback(xhr);
    		}
			else {
   				alert('Callback Finished: '+xhr.status);
			}
  		//} else {
    	//	alert('An error occurred\nUse the browsers Developer Tools to inspect headers.');
  		//}
  	}

	if (r.user) {
		var tmp=r.user;
		if (r.passwd) tmp=r.user+':'+r.passwd;
		var authStr = "Basic "+btoa(tmp);
		xhr.setRequestHeader("Authorization",authStr);
		html.push('<b>AUTHORIZATION:</b>'+authStr+'<br/>');
	}
		
	if (r.acceptType) {
		xhr.setRequestHeader("Accept",r.acceptType);
		html.push('<b>ACCEPT:</b>'+r.acceptType+'<br/>');
	}
	
	for (p in r.headers) {
		zhr.setRequestHeader(p,r.headers[p]);
		html.push('<b>'+p.toUpperCase()+':</b>'+r.headers[p]+'<br/>');
	}
			
	var contents = null;
	if (typeof(r.body)!='undefined') {
		if (r.contentType) {
			xhr.setRequestHeader("Content-Type",r.contentType);
			html.push('<b>CONTENT-TYPE:</b>'+r.acceptType+'<br/>');
	}
		if (r.body) {
			html.push('<b>CONTENTS:</b><br/>');
			try {
				var json = JSON.parse(r.body);
				html.push('<textarea style="width:96%;margin-left:2%;height:200px;">'+JSON.stringify(json,"",3)+'</textarea>');
			}
			catch(err) {
				html.push(r.body+'<br/>');
			}
			contents = r.body;
		}
	}
	div.innerHTML = html.join("");
	
	// kick off the request
	xhr.send(contents);
}

/// Local method to just spit out the body of the response object
APIExplorer.processResponse = function(xhr) {
	var hdr = APIExplorer.getResponseHeaders(xhr);
	var body = xhr.responseText;
	var div = document.getElementById("ResponseArea");
	var html=[];
	//html.push('<div class="editorHeader0">Response</div>');
	html.push('<div class="responseText">');
	var rpt={status:1,statusText:1,timeout:1}
	for (var prop in rpt) {
		html.push('<b>'+prop.toUpperCase()+":</b>"+xhr[prop]+'<br/>');
	}
	for (p in hdr) {
		html.push('<b>'+p.toUpperCase()+':</b>'+hdr[p]+'<br/>');
	}
	html.push('<textArea id="ResponseBody" >');
	html.push('</textArea>');
	html.push('</div>');
	div.innerHTML=html.join("\n");
	var txtDiv = document.getElementById("ResponseBody");
	var ct = hdr["Content-Type"];
	if (!ct) ct = hdr["content-type"];
	if (!ct) ct = hdr["contentType"];
	if (!ct) ct = hdr["CONTENT-TYPE"]; 
	if (ct.indexOf("application/json")> -1) {

 var respValue = JSON.stringify(JSON.parse(xhr.responseText),null,'  ');
/// var schema = JSON.stringify(APIExplorer.extractJSONSchema(JSON.parse(xhr.responseText)),null,'  ');
// txtDiv.value = respValue+'===========\n'+schema;
 txtDiv.value = respValue;

		if (APIExplorer.editMode==1) {
			var rbPop = new APIExplorer.PopMenu();
			rbPop.add('Show Extracted Schema From JSON',function(target){APIExplorer.convertResponseToSchema();});
			rbPop.bind(txtDiv);
		}
	}
	else {	
		txtDiv.value = xhr.responseText;
	}
}

APIExplorer.convertResponseToSchema = function() {
	var txtDiv = document.getElementById("ResponseBody");
	APIExplorer._lastJSONResponse = txtDiv.value;
    	var schema = JSON.stringify(APIExplorer.extractJSONSchema(JSON.parse(txtDiv.value)),null,'  ');
	txtDiv.value = schema;
	var rbPop = new APIExplorer.PopMenu();
	rbPop.add('Show Actual JSON Response Data',function(target){APIExplorer.restoreResponse();});
	rbPop.bind(txtDiv);
}

APIExplorer.restoreResponse = function() {
	var txtDiv = document.getElementById("ResponseBody");
	txtDiv.value = APIExplorer._lastJSONResponse;
	var rbPop = new APIExplorer.PopMenu();
	rbPop.add('Show Extracted Schema From JSON',function(target){APIExplorer.convertResponseToSchema();});
	rbPop.bind(txtDiv);
}

APIExplorer.getResponseHeaders = function(xhr) {
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
}


/******************************************/
/* JSON SCHEMA EXTRACTOR BELOW THIS POINT */
/******************************************/
/// Given a parsed JSON document, genrate the skeleton of a schema
/// describing the item. This may be invoked multiple times with the
/// output being passed, in order to pick up optional fields that may
/// have been omitted in the first pass.
APIExplorer.extractJSONSchema = function(jObj, priorDef, schema) {
	var s = schema;
	if (!s) {
		s = {};
	}
	if (!jObj) return(s);
	var typeDef = typeof(jObj);
	if (typeDef!='object') {
		//s.description="";
		s.type = typeDef;
		s["x-ISC_SampleValue"]=jObj;
		return(s);
	}
	if (Array.isArray(jObj)) APIExplorer.extractJSONSchemaFromArray(jObj,priorDef,s);
	else APIExplorer.extractJSONSchemaFromObject(jObj,priorDef,s);
	return(s);
}

APIExplorer.extractJSONSchemaFromObject = function(jObj, priorDef, schema)
{
	var s = schema;
	//s.title = "";
	//s.description = "";
	s.type = "object";
	s.properties = {property:[]};
	var props = s.properties.property;
	for (var p in jObj) {
		var prop = jObj[p];
		var propSchema = APIExplorer.extractJSONSchema(prop,priorDef,{"key":(p)});
		props.push(propSchema);
	}
	return(s);
}

APIExplorer.extractJSONSchemaFromArray = function(jObj, priorDef, schema) {
	var s = schema;
	//s.title = "";
	//s.description = "";
	s.type = "array";
	
	var typeInfo = APIExplorer.getArrayTypeInfo(jObj);
	var count = 0;
	for (var t in typeInfo) ++count;
	if (count==1) { // array is uniform and t is only type to worry about
		var item = APIExplorer.extractJSONSchema(jObj[0],priorDef,{});
		s.itemSchema = item;
	}
	else { // need an anyOf construct	
	}

	return (s);
}

APIExplorer.getArrayTypeInfo = function(array) {
	var types = {};

	for (var i = array.length-1;i>=0;i--) {
		var item = array[i];
		var t = typeof(item);
		if (t == 'object') {
			if (Array.isArray(t)) t='array'
		}
		types[t]=1;
	}
	return(types);
}

/*******************************/
/* Quick and dirty pop-up menu */
/*******************************/
APIExplorer.defineContextMenuUtils = function()
{
	APIExplorer.PopMenu = function() {
    	APIExplorer.init();
	}

	APIExplorer.PopMenu.SEPARATOR = 'APIExplorer.PopMenu.SEPARATOR';
	APIExplorer.PopMenu.current = null;
	APIExplorer.PopMenu.addEventListener = function(element, name, observer, capture) {
    	if (typeof element == 'string') {
       		element = document.getElementById(element);
    	}
    	if (element.addEventListener) {
        	element.addEventListener(name, observer, capture);
    	} else if (element.attachEvent) {
    		element.attachEvent('on' + name, observer);
    	}
	};
	
	APIExplorer.PopMenu.prototype = {
    		init: function() {
        		APIExplorer.items  = [];
        		APIExplorer.width  = 0;
        		APIExplorer.height = 0;
    		},
    		setSize: function(width, height) {
        		APIExplorer.width  = width;
        		APIExplorer.height = height;
        		if (APIExplorer.element) {
        		    var self = this;
        		    with (APIExplorer.element.style) {
        		        if (self.width)  width  = self.width  + 'px';
        		        if (self.height) height = self.height + 'px';
        		    }
        		}
    		},
    		bind: function(element) {
        		var self = this;
        		if (!element) {
           			element = document;
        		} else if (typeof element == 'string') {
            		element = document.getElementById(element);
        		}
        		APIExplorer.target = element;
        		APIExplorer.target.oncontextmenu = function(e) {
        		    self.show.call(self, e);
        		    return false;
        		};
        		var listener = function() { self.hide.call(self) };
        		APIExplorer.PopMenu.addEventListener(document, 'click', listener, true);
    		},
    		add: function(text, callback) {
        		APIExplorer.items.push({ text: text, callback: callback });
    		},
    		addSeparator: function() {
        		APIExplorer.items.push(APIExplorer.PopMenu.SEPARATOR);
    		},
    		setPos: function(e) {
        		if (!APIExplorer.element) return;
        		if (!e) e = window.event;
        		var x, y;
        		if (window.opera) {
        		    	x = e.clientX;
            			y = e.clientY;
        		} else if (document.all) {
            			x = document.body.scrollLeft + event.clientX;
            			y = document.body.scrollTop + event.clientY;
        		} else if (document.layers || document.getElementById) {
        		    	x = e.pageX;
        		    	y = e.pageY;
        		}
        		APIExplorer.element.style.top  = y + 'px';
        		APIExplorer.element.style.left = x + 'px';
    		},
    		show: function(e) {
        		if (APIExplorer.PopMenu.current && APIExplorer.PopMenu.current != this) return;
        		APIExplorer.PopMenu.current = this;
        		if (APIExplorer.element) {
        	   		APIExplorer.setPos(e);
        		    	APIExplorer.element.style.display = '';
        		} else {
            			APIExplorer.element = APIExplorer.createMenu(APIExplorer.items);
            			APIExplorer.setPos(e);
            			document.body.appendChild(APIExplorer.element);
        		}
    		},
    		hide: function() {
        		APIExplorer.PopMenu.current = null;
	        	if (APIExplorer.element) APIExplorer.element.style.display = 'none';
    		},
    		createMenu: function(items) {
        		var self = this;
        		var menu = document.createElement('div');
       		 	with (menu.style) {
            			if (self.width)  width  = self.width  + 'px';
            			if (self.height) height = self.height + 'px';
            			border     = "1px solid gray";
            			background = '#FFFFFF';
            			color      = '#000000';
            			position   = 'absolute';
            			display    = 'block';
            			padding    = '2px';
            			cursor     = 'default';
        		}
        		for (var i = 0; i < items.length; i++) {
            			var item;
           	 		if (items[i] == APIExplorer.PopMenu.SEPARATOR) {
                			item = APIExplorer.createSeparator();
        		    	} else {
                			item = APIExplorer.createItem(items[i]);
            			}
	            		menu.appendChild(item);
	        	}
        		return menu;
    		},
    		createItem: function(item) {
        		var self = this;
        		var elem = document.createElement('div');
        		elem.style.padding = '4px';
        		var callback = item.callback;
        		APIExplorer.PopMenu.addEventListener(elem, 'click', function(_callback) {
            			return function() {
               				self.hide();
                			_callback(self.target);
            			};
        		}(callback), true);
        		APIExplorer.PopMenu.addEventListener(elem, 'mouseover', function(e) {
            			elem.style.background = '#B6BDD2';
        		}, true);
        		APIExplorer.PopMenu.addEventListener(elem, 'mouseout', function(e) {
            			elem.style.background = '#FFFFFF';
        		}, true);
        		elem.appendChild(document.createTextNode(item.text));
        		return elem;
    		},
    		createSeparator: function() {
        		var sep = document.createElement('div');
        		with (sep.style) {
            			borderTop = '1px dotted #CCCCCC';
            			fontSize  = '0px';
            			height    = '0px';
        		}
        		return sep;
    		}
	};
}

