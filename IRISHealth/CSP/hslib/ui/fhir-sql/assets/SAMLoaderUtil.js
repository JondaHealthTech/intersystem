SAMLoaderUtil  = {
  defined:{},
  baseURL:null,

  getBaseURL:function() {
	if (this.baseURL) return(this.baseURL);
	const hTags = document.head.children;
	const hLen = hTags.length;
	for (var i=0;i<hLen;i++) {
		var tag = hTags[i]
		if ((tag.src)&&(tag.src.indexOf('SAMLoaderUtil')>0)) {
			this.baseURL = tag.src.split('SAMLoaderUtil')[0];
			return(this.baseURL);
		}
	}
	const bTags = document.body.children;
	const bLen = bTags.length;
	for (var i=0;i<hLen;i++) {
		var tag = bTags[i]
		if ((tag.src)&&(tag.src.indexOf('SAMLoaderUtil')>0)) {
			this.baseURL = tag.src.split('SAMLoaderUtil')[0];
			return(this.baseURL);
		}
	}
	return("");
  },

  load:function(dependsOn) {
	const util = this;
	var todo = 0;
	var prefix = this.getBaseURL();
	for (var def in dependsOn) {
		if (typeof(window["$defined_"+def])=='undefined') { // code not yet loaded
			var file = dependsOn[def];
			todo++;
			if (!this.defined[file]) {
				if ((file.indexOf("_inc.js")==-1)&&(todo>1)) { // required sources not yet loaded					
					var retry = function() { util.load(dependsOn); };
					setTimeout(retry,50);
				}
				else {
					var script = document.createElement('script');
					script.type = 'text/javascript';
					if (file.charAt(0)!='/') {
						if (file.indexOf("_inc.js")==-1) {
							script.src = prefix+"obj/"+file;
						}
						else {
							script.src = prefix+"inc/"+file;
						}
					}
					else script.src = file;
					document.head.appendChild(script);
					this.defined[file]=true;
				}
			}
		}
	}
  }

};