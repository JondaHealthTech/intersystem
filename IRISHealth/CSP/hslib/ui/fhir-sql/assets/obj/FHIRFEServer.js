/// Javascript REST Client class for servicing back-end calls into the FHIR-SQL API
class FHIRFEServer extends SAMWidget {

/// Return an extended string holding any desired, stylesheet
/// definition code.
getDefaultCSS() {
	const css = `
		.root {
			position: relative;
		}
	`;
	return(css);
};

/// Set initial public and private properties for the widget
initData() {
	this.$env = {}; 
};

setRESTInfo(env) {
	this.$env = env;
};

/// Create a JSON description of the request for the XHTTP engine
generateBaseRequest(verb,endpoint,cb,mimeType) { 
	if (!mimeType) mimeType='*/*';
	var url = this.$env.url;
 	const r = {
 		url:(url+'/'+endpoint),
    method:(verb),
		user:(this.$env.username),
		passwd:(this.$env.password),
		acceptType:(mimeType),
		callback: (cb)
	};
	return(r);
};

/////////////////////
// ANALYSIS RESULT //
/////////////////////

/// Fetch the results of a repository analysis task by ID
getAnalysisResults(id, cb) {
 	const r = this.generateBaseRequest('GET','analysisresult',cb);
	r.url+='?ID='+id;
	this.submitRequest(r);
};

////////////////////
// TRANSFORM SPEC //
////////////////////

/// Fetch an individual transform specification based on ID specified in the query string 
getTransformSpec(id, cb) {
 	const r = this.generateBaseRequest('GET','transformspec',cb);
	r.url+='?ID='+id;
	this.submitRequest(r);
};

/// Create initial transform specification which will be saved as a 
/// work in progress for the projection
postTransformSpec(payload, cb) {
 	const r = this.generateBaseRequest('POST','transformspec',cb);
	if (payload=='?') {
		r.url+="&SHOWSPEC=1";
	}
	else {
		r.contentType = 'application/json';
		r.body = JSON.stringify(payload);
	}	
	this.submitRequest(r);
};

/// Update existing transform specification 
putTransformSpec(payload, cb) {
 	const r = this.generateBaseRequest('PUT','transformspec',cb);
	if (payload=='?') {
		r.url+="?SHOWSPEC=1";
	}
	else {
		r.contentType = 'application/json';
		r.body = JSON.stringify(payload);
	}	
	this.submitRequest(r);
};

/// Permanently remove a analysis request and the back end result 
deleteTransformSpec(id, cb) {
 	const r = this.generateBaseRequest('DELETE','transformspec',cb);
	r.url+='?ID='+id;
	this.submitRequest(r);
};

}

// Define the new element
customElements.define('fhir-feserver', FHIRFEServer);
window.$defined_FHIRFEServer = true;
