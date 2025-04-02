class FHIRFilter {

  /// This is an internal helper function to deal with the case where a path expression has
  /// a conditional filter associated with it.  Filter _might_ result in multiple branches in
  /// the parse tree where each path from root to endpoint will need to be accounted for.
  processFilterNode(pt,ptIdx,pStack,paths) {
    const JPL = new JPLUtils();
  
    var ptNode = pt[ptIdx];
    var aStack = [];
    // need to see what relative paths are in the conditional
    var subPath = ptNode.value[0].value; // should be arg node with path
    if (subPath.charAt(0)=='@') {
      var sp=JPL.parseExpression(subPath);
      var spIdx=0;
      while (sp[spIdx].type!="JPLEnd") {
        if (sp[spIdx].type=="JPLNode") aStack.push(sp[spIdx].value);
        spIdx++;
      }
    }
    // In theory, pStack holds the steps up until the conditional
    // aStack holds the relative steps referenced in the argument
    // and pt holds the balace of the path(s) in the full path reference
    // if aStack exactly overlaps with pt values, there is only one path
    // and the contributions of aStack can be ignored.  If aStack and pt
    // diverge, then we need to record multiple (complete) paths
    var nArgs = aStack.length;
    var tmpIdx = ptIdx+2; // +1 should be a separator, +2 should be a node value
    for (var aIdx=0;aIdx<nArgs;aIdx++) {
      while ((pt[tmpIdx].type!="JPLEnd")&&(pt[tmpIdx].type!="JPLNode")) tmpIdx++;
      if (pt[tmpIdx].value!=aStack[aIdx]) { // Things have diverged, commit new path
        paths[(pStack.join(".")+"."+aStack.join("."))]=1;
        aIdx = nArgs+1
      }
      else tmpIdx++;
    }
  }
  
  /// Scan a transform spec document for all path references and distill them 
  /// down into simple lists of nodes that must be present to edit this spec
  /// in the existing editor
  getTransformPaths(aet) {
    const XForm = new XFormSpec();
    const JPL = new JPLUtils();
   
    var nRsc = aet.resources.length;
    var out = {}
    for (var rIdx=0;rIdx<nRsc;rIdx++) {
      var paths = {};
      var rNode = aet.resources[rIdx];
      var rType = rNode.resourceType;
  
      // First get the simple absolute paths
      var cols = rNode.columns;
      if (cols) {
        var pStack = [];
        var nCols = cols.length;
        for (var cIdx=0;cIdx<nCols;cIdx++) {
          var path = cols[cIdx].path;
          var pt = JPL.parseExpression(XForm.fhirToJPL(path,rType));
          var ptIdx = 0;
          var ptNode = pt[0];
          while (ptNode.type!="JPLEnd") {
            var tp = ptNode.type;
            if (tp=="JPLNode") {
              pStack.push(ptNode.value);
            }
            else if (tp=="JPLFilter") { //Filters _might_ result in branching paths
              this.processFilterNode(pt,ptIdx,pStack,paths);
            }
            ptIdx++;
            ptNode=pt[ptIdx];
          }
          paths[pStack.join(".")]=1;
          pStack = [];
        }
      }
      
      // Now fetch any subtables
      // These are a bit trickier because the table has a path and
      // and that path serves as a prefix for each of the column paths 
      // beneath it
      var subs = rNode.subTables;
      if (subs) {
        var nSubs = subs.length;
        for (var sIdx=0;sIdx<nSubs;sIdx++) {
          var table = subs[sIdx];
          var basePath = table.path;
          var cols = table.columns;
          if (cols) {
            var nCols = cols.length;
            for (var cIdx=0;cIdx<nCols;cIdx++) {
              var pStack = [];
              var path = basePath+"."+cols[cIdx].path;
              var pt = JPL.parseExpression(XForm.fhirToJPL(path,rType));
              var ptIdx = 0;
              var ptNode = pt[0];
              while (ptNode.type!="JPLEnd") {
                var tp = ptNode.type;
                if (tp=="JPLNode") {
                  pStack.push(ptNode.value);
                }
                else if (tp=="JPLFilter") { //Filters _might_ result in branching paths
                  this.processFilterNode(pt,ptIdx,pStack,paths);
                }
                ptIdx++;
                ptNode=pt[ptIdx];
              }	
              paths[pStack.join(".")]=1;
            }
          }
        }
      }
      // We used an object to eliminate redundate entries, now move results to an array
      var pathList = [];
      for (var p in paths) pathList.push(p);
      out[rType]=pathList;		 			
    }
    return(out);
  };
  
  /// Helper method to find a given named resource in an analysis document
  findResource(rsc, analysis) {
    var r = analysis.resources;
    var nRsc = r.length;
    for (var rIdx=0;rIdx<nRsc;rIdx++) {
      if (r[rIdx].resourceType==rsc) return(r[rIdx]);
    }
    return(null);
  };
  
  /// Helper function to find a given named element in an elements array of an analysis
  findElement(key,elements) {
    var nElem = elements.length;
    for (var eIdx=0; eIdx<nElem; eIdx++) {
      if (elements[eIdx].name == key) return(elements[eIdx]);
    }
    return(null);
  };
  
  /// Helper method to pare down a list of paths to just a list of paths that DON'T
  /// map to the current analysis nodes
  findMissingPaths(paths,resource) {
    var nPaths = paths.length;
    var nGone = 0;
    for (var pIdx=0;pIdx<nPaths;pIdx++) {
      var stet = 0;
      var r = resource.elements;
      var p = paths[pIdx].split(".");
      p.shift(); // first element is the resource name, already matched that
      var nElem = p.length;
      for (var eIdx=0; eIdx<nElem; eIdx++) {
        if (r) {
          r = this.findElement(p[eIdx],r);
          if (!r) { // no match, leave alone
            stet = 1;
            eIdx=nElem+1;
          }
          else {
            r = r.elements; // move onto next level
          }
        }
        else {
          stet = 1;
          eIdx=nElem+1;
        }		
      }
      if (!stet) {
        //console.log("Found match for "+paths[pIdx]);
        //console.log("removing item...");
        paths[pIdx]=null;
        nGone++;
      }
    }
    if (nGone==nPaths) { // pruned everything
      return(null);
    }
    if (nGone==0) { // pruned nothing
      return(paths);
    }
    // selective pruning
    var out = [];
    for (pIdx=paths.length-1;pIdx>-1;pIdx--) {
      if (paths[pIdx]) out.push(paths[pIdx]);
    }	
    return(out);
  };
  
  /// Given an object that lists the required paths (grouped by resource type)
  /// and an analysis result AET, Prune the path object to only report missing 
  /// paths in the context of the given analysis
  getMissingTransformPaths(pathObj,analysis) {
    for (var resource in pathObj) {
      var r = this.findResource(resource,analysis);
      if (r) { // need to validate actual path
        var missing = this.findMissingPaths(pathObj[resource],r);
        if (missing) pathObj[resource] = missing;
        else delete pathObj[resource];			
      }
      else { // no r means all paths are missing, don't prune anything
      }
    }
    return(pathObj);	
  };

  /// Helper method to create an index of resources
  populateResourceIndex(index, resources){
    for (let r of resources){
      index[r.resourceType] = r;
    }
  }

  /// Helper method to create a generic resource
  createResource(resourceType, resourceIndex){
    let newResource = {
      resourceType,
      count: 0,
      evaluated: 1,
      forwardLinks: [],
      reverseLinks: [],
      status: { evaluate: 1, mod1: 1, mod2: 2, count: 0, percentage: 0 },
      elements: []
      };
    
    // add to resource index
    resourceIndex[resourceType] = newResource;

    return newResource;
  }

  /// Helper method to create generic leaf
  createLeaf(name){
    return { name, dataType: 'String',  setCount: 0, differentValues: 0, values: [] };
  }

  /// Helper method to create generic branch
  createBranch(name){
    return { name, setCount: 0, elements: [] };
  }

  annotateAnalysis(analysis, pathObj){
    if (Object.keys(pathObj).length === 0) return;
    // create index of analysis resources for quick reference
    let resourceIndex = {};
    this.populateResourceIndex(resourceIndex, analysis.resources);

    for (let pKey in pathObj){
      let pathList = pathObj[pKey];
      for(let path of pathList){
        let [resourceType, ...innerPath] = path.split('.');
        // a branch is any object that has the 'elements' array field
        let branch = resourceIndex[resourceType];
        if(branch === undefined) {
          branch = this.createResource(resourceType, resourceIndex);
          analysis.resources.push(branch);
        }

        for (let i = 0; i < innerPath.length; i++){
          if (branch.elements === undefined){
              // conflict in node type between analysis (leaf) and spec (expects elements array). 
              break; 
          }
          // iterate through the branch elements and find element with the same name
          let key = innerPath[i], target = null;
          for (let j = 0; j < branch.elements.length; j++){
            if (branch.elements[j].name === key){
              target = branch.elements[j];
              break;
            }
          }

          if (target){
            branch = target;
          } else {
            if (i === innerPath.length - 1){
              // if last innerPath segment, push a leaf into branch elements
              let leaf = this.createLeaf(key);
              branch.elements.push(leaf);
            } else {
              let newBranch = this.createBranch(key);
              branch.elements.push(newBranch);
              branch = newBranch;
            }
          }
        }
      } 
    }
  }
  
}
  