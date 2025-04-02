/*=================
  Connection Object
  
	Used to keep track of server information. Passed to both the DeepSeeResultSet and the DeepSeeDataConnector objects
  
  =================*/

var DeepSeeConnection = function(username,password,host,application,namespace) {
	this.username = username;
	this.password = password;
	this.path = host + application + '/' + namespace + '/';
}

/*=================
  Result Set Object
  
	The result set object handles all data related communication with the server. The basic operation involves instantiating
	a result set, then running any of its methods (like runMDXQuery). Since all communication with the server is stateless and
	asynchronous (using REST) it is necessary to pass a method for the "finalCallback" argument. This is a method the user 
	defines that will be called when the server responds and will be passed a resultSet object (which contains data, errors, etc.).
	PendingCallback is optional and is used for situations where the query may take a long time to complete or where partial results,
	as in the case of KPI PlugIns, can be meaningfully displayed on the page.
  
  =================*/

var DeepSeeResultSet = function(connection,widget,wait,timeout) {
	this.connection = connection;
	this.widget = widget===undefined?'':widget;
	this.wait = wait===undefined?'':wait;
	this.timeout = timeout===undefined?'':timeout;
	this.data = ''; // used for JSON results
	this.parsedData = ''; // WAL279 -- parsed JSON results, allows fewer calls to zlm.jsonparse
	this.pollInterval = 1000;
}

DeepSeeResultSet.prototype.runMDXQuery = function(mdx,finalCallback,pendingCallback,filters) {
	var r = {};
	r.method = "POST";
	r.user = this.connection.username;
	r.passwd = this.connection.password;
	r.acceptType = "application/json";
	r.contentType = "JSON";
	r.service = 'Data/MDXExecute';
	r.body = '{"MDX":"'+mdx+ '"';
	r.body = r.body + ', "WAIT":"' + this.wait + '"';
	r.body = r.body + ', "TIMEOUT":"' + this.timeout + '"';
	if (filters) {
		r.body = r.body + ', "FILTERS":' + JSON.stringify(filters);
	}
	r.body = r.body +'}';
	r.callback = DeepSeeUtils.processResponse;
	r.async = true;
	r.url = this.connection.path+'Data/MDXExecute';
	
	DeepSeeUtils.sendRequest(r,this,finalCallback,pendingCallback);
}

DeepSeeResultSet.prototype.runPivot = function(pivot,finalCallback,pendingCallback,filters) {
	var r = {};
	r.method = "POST";
	r.user = this.connection.username;
	r.passwd = this.connection.password;
	r.acceptType = "application/json";
	r.contentType = "JSON";
	r.service = 'Data/PivotExecute';
	r.body = '{"PIVOT":"'+pivot+ '"';
	r.body = r.body + ', "WAIT":"' + this.wait + '"';
	r.body = r.body + ', "TIMEOUT":"' + this.timeout + '"';
	if (filters) {
		r.body = r.body + ', "FILTERS":' + JSON.stringify(filters);
	}
	r.body = r.body +'}';
	r.callback = DeepSeeUtils.processResponse;
	r.async = true;
	r.url = this.connection.path+'Data/PivotExecute';
	DeepSeeUtils.sendRequest(r,this,finalCallback,pendingCallback);
}

DeepSeeResultSet.prototype.runMDXDrillQuery = function(mdx,finalCallback,pendingCallback,listing,fieldList,filters) {
	var r = {};
	r.method = "POST";
	r.user = this.connection.username;
	r.passwd = this.connection.password;
	r.acceptType = "application/json";
	r.contentType = "JSON";
	r.service = 'Data/MDXDrillthrough';
	r.body = '{"MDX":"'+mdx+ '"';
	r.body = r.body + ', "WAIT":"' + this.wait + '"';
	r.body = r.body + ', "TIMEOUT":"' + this.timeout + '"';
	if (filters) {
		r.body = r.body + ', "FILTERS":' + JSON.stringify(filters);
	}
	if (listing) {
		r.body = r.body + ', "LISTING":"' + listing + '"';
	}
	if (fieldList) {
		r.body = r.body + ', "FIELDLIST":' + JSON.stringify(fieldList);
	}
	r.body = r.body +'}';
	r.callback = DeepSeeUtils.processResponse;
	r.async = true;
	r.url = this.connection.path+'Data/MDXDrillthrough';
	DeepSeeUtils.sendRequest(r,this,finalCallback,pendingCallback);
}

DeepSeeResultSet.prototype.getQueryStatus = function() {
	var data = ZLM.jsonParse(this.data);
	return data.Info.ResultsComplete;
}

DeepSeeResultSet.prototype.getColumnCount = function() {
	var data = ZLM.jsonParse(this.data);
	return data.Info.ColCount;
}

DeepSeeResultSet.prototype.getRowCount = function() {
	var data = ZLM.jsonParse(this.data);
	if (data.Info.QueryType == "DRILLTHROUGH" || data.Info.QueryType == "DRILLFACTS") {
		return data.Result.children.length;
	}
	return data.Info.RowCount;
}

DeepSeeResultSet.prototype.getOrdinalValue = function(rowNo,colNo,formatted) {
	if (formatted===undefined) {
		formatted=0;
	}
	
	// + WAL279
	var data = '';
	if (this.parsedData=='') {
		data = ZLM.jsonParse(this.data);
		this.parsedData=data;
	}
	else {
		data = this.parsedData;
	}
	// - WAL279
	
	if (data.Info.QueryType== "DRILLTHROUGH" || data.Info.QueryType == "DRILLFACTS") {
		var row = data.Result.children[rowNo-1];
		var count = 0;
		for (var p in row) {
			if (++count==colNo) break;
		}
		return row[p];
	}
	
	var colCount = data.Info.ColCount;
	var rowOffset = (rowNo>1)?((rowNo-1) * (colCount)):0; // colCount?????
	var cellAddress = colNo + rowOffset;
	if (formatted) {
		return data.Result.CellData[cellAddress-1].ValueFormatted;
	}
	else {
		return data.Result.CellData[cellAddress-1].ValueLogical;
	}
}

DeepSeeResultSet.prototype.getOrdinalLabel = function(axis,position) {
	
	// + WAL279
	var data = '';
	if (this.parsedData=='') {
		data = ZLM.jsonParse(this.data);
		this.parsedData=data;
	}
	else {
		data = this.parsedData;
	}
	// - WAL279
	
	var labels = [];
	if (position===undefined) { position = 1 }
	if (position < 1) { return labels; }
	
	// handle listings
	if (data.Info.QueryType== "DRILLTHROUGH" || data.Info.QueryType == "DRILLFACTS") {
		if (axis==2) { 
			labels[labels.length] = position;
			return labels; // rows have no labels in listings, just return line number
		}
		var row = data.Result.children[0]; // all have the same column headers so just look at the first
		var count = 0;
		for (var p in row) {
			if (++count==position) {
				labels[labels.length] = p;
				break;
			}
		}
		return labels;
	}
	
	// make sure this is in the right order, from most to least specific
	if ((data.Result.Axes[axis-1])&&(data.Result.Axes[axis-1].Tuples[position-1])) {
		for (var i=0; i<data.Result.Axes[axis-1].Tuples[position-1].Members.length; ++i) {
			labels[i] = data.Result.Axes[axis-1].Tuples[position-1].Members[i].Name;
		}
	}
	return labels;
}

DeepSeeResultSet.prototype.getTupleInfo = function(axis,position) {
	var data = ZLM.jsonParse(this.data);
	var memberInfo = [];
	if (position===undefined) { position = 1 }
	if (position < 1) { return labels; }
	// make sure this is in the right order, from most to least specific
	for (var i=0; i<data.Result.Axes[axis-1].Tuples[position-1].MemberInfo.length; ++i) {
		memberInfo[i] = data.Result.Axes[axis-1].Tuples[position-1].MemberInfo[i];
	}
	return memberInfo;
}

DeepSeeResultSet.prototype.getChildSpecForTuple = function(axis,position) {
	var data = ZLM.jsonParse(this.data);
	if (data.Result.Axes[axis-1]) {
		return data.Result.Axes[axis-1].TupleInfo[position-1].childSpec;
	}
}

DeepSeeResultSet.prototype.getAxisSpec = function(axis) {
	var data = ZLM.jsonParse(this.data);
	return data.AxesInfo[axis];
}

DeepSeeResultSet.prototype.getCubeName = function() {
	var data = ZLM.jsonParse(this.data);
	return data.Info.Cube;
}

DeepSeeResultSet.prototype.isError = function() {
	var data = '';
	if (this.parsedData=='') {
		data = ZLM.jsonParse(this.data);
		this.parsedData=data;
	}
	else {
		data = this.parsedData;
	}
	return (data.Info.Error!='' &&data.Info.Error.ErrorCode!='');
}

DeepSeeResultSet.prototype.getErrorMessage = function() {
	var data = ZLM.jsonParse(this.data);
	return data.Info.Error.ErrorMessage;
}

/*=====================
  Data Connector Object
  
	REST is stateless, but widgets displaying DeepSee data on the client can be stateful. The DeepSeeDataController object helps 
	handle this scenario. It maintains a stack of DeepSeeResultSet objects representing all of the actions the user has taken against
	the data in order. For example, the user could (1) run an mdx query, (2) run a drill down on a specific cell, and (3) run a listing.
	This would result in a stack of 3 result sets -- the DataController's undoLastAction method can be used to restore state from the stack.
	
	The getCurrentData returns the current result set object -- this is what code will iterate through to access the data.
	
	Please refer to /csp/samples/testDataController.html for an example of how the dataController object can be used.
  
  =====================*/
 
var DeepSeeDataController = function (configuration, finalCallback, pendingCallback) {

	if (finalCallback && typeof finalCallback !== "function") {
		throw new Error("finalCallback parameter must be a function");
	}
	
	// Networking
	this.connection = configuration.connection;

	// Data -- does every action add to the stack? maybe yes for now
	this.resultSetStack = [];
	this.resultSetStateStack = [];
	this.finalCallback = finalCallback;
	this.pendingCallback= pendingCallback ? pendingCallback : '';

	// Configuration Properties
	// supply defaults as well 
	this.widget = configuration.widget;
	this.type = configuration.type;
	this.initialMDX = configuration.initialMDX;
	this.pivotName = configuration.pivotName;
	this.showTotals = configuration.showTotals; // show totals also requires a method
	this.initialExecute = false; // maybe not a good idea? will ask
	this.listingType = 'DRILLTHROUGH';
	this.listingName = '';
	
	// Operation related state -- each of these requires a function
	this.sortState = 0;
	this.drillLevel = 0;
	this.isListing = false; 
	this.filterState = []; // array of filter specs and values
	
	// get data
	if (this.initialExecute) {
		if (this.isListing) {
			this.runListing();
		}
		else {
			this.runQuery();
		}
	}
}

DeepSeeDataController.prototype.runQuery = function() {
	this.isListing = false;
	this.fetchDataFromServer();
}

DeepSeeDataController.prototype.fetchDataFromServer = function() {
	var filters = this.getFilterStateMDX();
	var resultSet = new DeepSeeResultSet(this.connection);
	resultSet.dataController = this; // WAL166 -- this reference is used below to invoke callback
	if (this.isListing) {
		var query = this.listingType + ' ' + 'SELECT FROM HOLEFOODS ';
		var listingFilters = this.buildListingFilters(this.startRow,this.startCol,this.endRow,this.endCol);
		query = query + listingFilters;
		var listingName = '';
		if (this.listingName) { listingName = this.listingName; }
		resultSet.runMDXDrillQuery(query,this.processResponse,this.pendingCallback,listingName);
	}
	else {
		if (this.type=='MDX') {
			resultSet.runMDXQuery(this.initialMDX,this.processResponse,this.pendingCallback,filters);
		}
		else if (this.type=='PIVOT') {
			resultSet.runPivot(this.pivotName,this.processResponse,this.pendingCallback,filters);
		}
	}
}

DeepSeeDataController.prototype.getCurrentQueryText = function() {
	var filters = this.getFilterStateMDX();
	var filterClause = '';
	if (this.type=='MDX') {
		for (var i = 0; i < filters.length; ++i) {
			filterClause = filterClause + ' %FILTERS ' + filters[i]; 
		}
		return this.initialMDX + filterClause;
	}
}

// processResponse -- this.processResponse should maintain all of my context
DeepSeeDataController.prototype.processResponse = function(resultSet) {
	this.resultSetStack.push(resultSet);
	this.copyStateToStack();
	this.finalCallback(this);
}

// get current data -- dataController will be passed to callback
DeepSeeDataController.prototype.getCurrentData = function () {
	return this.resultSetStack[this.resultSetStack.length-1];
}

DeepSeeDataController.prototype.copyStateToStack = function () {
	var state = {};
	state.showTotals = this.showTotals;
	state.sortState = this.sortState;
	state.drillLevel = this.drillLevel;
	//state.filterState = this.filterState; // array of objects, need deep copy
	state.filterState = [];
	for (var i=0; i < this.filterState.length; ++i) {
		state.filterState[i] = {};
		state.filterState[i].filterName = this.filterState[i].filterName;
		state.filterState[i].filterSpec = this.filterState[i].filterSpec;
	}
	state.isListing = this.isListing;
	state.initialMDX = this.initialMDX;
	this.resultSetStateStack.push(state);
}

DeepSeeDataController.prototype.copyStateFromStack = function () {
	// + WAL191 -- make sure we get the right state
	this.resultSetStateStack.pop();
	var state = this.resultSetStateStack[this.resultSetStateStack.length-1];
	// - WAL191
	this.showTotals = state.showTotals;
	this.sortState = state.sortState;
	this.drillLevel = state.drillLevel;
	this.filterState = [];
	for (var i=0; i < state.filterState.length; ++i) {
		this.filterState[i] = {};
		this.filterState[i].filterName = state.filterState[i].filterName;
		this.filterState[i].filterSpec = state.filterState[i].filterSpec;
	}
	this.isListing = state.isListing;
	this.initialMDX = state.initialMDX;
}

// undo last action -- basically, pop off of stack
DeepSeeDataController.prototype.undoLastAction = function () {
	if (this.resultSetStack.length < 2) return; // nothing to do
	this.resultSetStack.pop();
	//var isListing = this.isListing;
	this.copyStateFromStack();
	//if isListing != this.isListing
	// alert renderer
	this.finalCallback(this);
}

// maybe methods like add filter to state and get filter state
// apply filter
// FILTERS are filterName:filterSpec
// +FILTERS
DeepSeeDataController.prototype.applyFilter = function(filterInfo) {
	this.addFilterToState(filterInfo);
	this.fetchDataFromServer();
}

DeepSeeDataController.prototype.addFilterToState = function(filterInfo) {
	var filterName = filterInfo.filterName;
	var filterSpec = filterInfo.filterSpec;
	var foundFilter = 0;
	for (var i = 0; i < this.filterState.length; ++i) {
		if (this.filterState[i].filterName == filterName) {
			foundFilter = 1;
			this.filterState[i].filterSpec = filterSpec;	
		}
	}
	if (foundFilter==0) {
		this.filterState.push(filterInfo);
	}
}

DeepSeeDataController.prototype.getFilterStateMDX = function() {
	var filterStateMDX = [];
	for (var i = 0; i < this.filterState.length; ++i) {
		filterStateMDX[i] = this.filterState[i].filterSpec;
	}
	return filterStateMDX;
}
// - FILTER

// runListing -- on which cells? how to turn a selection into a filter?
// based on axis info I can get filter spec for any given cell. maybe try to do something smart in terms of 
// smoothing cells down into ranges, etc.
DeepSeeDataController.prototype.runListing = function(startRow,startCol,endRow,endCol,listingName) {
	this.isListing = true;
	if (listingName) {
		this.listingName = listingName;
	}
	this.startRow = startRow;
	this.startCol = startCol;
	this.endRow = endRow;
	this.endCol = endCol;
	this.fetchDataFromServer();
}

DeepSeeDataController.prototype.buildListingFilters = function(startRow,startCol,endRow,endCol) {
	
	var listingFilterText = '';
	var filters = this.getFilterStateMDX();
	for (var i = 0; i < filters.length; ++i) {
		listingFilterText = listingFilterText + ' %FILTER ' + filters[i];
	}
	// Now add selection based filter context (meaning, what is the context from rows and columns?)
	var currentResultSet = this.getCurrentData();
	if (currentResultSet) {
		// cols
		var colTuples = '';
		for (var c = startCol; c <= endCol; ++c) {
			var colTuple = '';
			var memberInfo = currentResultSet.getTupleInfo(1,c);
			for (var i = 0; i < memberInfo.length; ++i) {
				// and these tuple specs
				var memberSpec = '';
				if (memberInfo[i].dimName != 'Measures') {
					var memberSpec = '[' + memberInfo[i].dimName + ']';
					if (memberInfo[i].hierName) memberSpec = memberSpec + '.[' + memberInfo[i].hierName + ']';
					if (memberInfo[i].levelName) memberSpec = memberSpec + '.[' + memberInfo[i].levelName + ']';
					if (memberInfo[i].memberKey) memberSpec = memberSpec + '.&[' + memberInfo[i].memberKey + ']';
					if (colTuple == '') {
						colTuple = memberSpec;
					}
					else {
						colTuple = colTuple + ',' + memberSpec;
					}
				}
			}
			if (colTuple != '') {
				colTuple = '(' + colTuple + ')';
				if (colTuples == '') {
					colTuples = colTuple;
				}
				else {
					colTuples = colTuples + ',' + colTuple;
				}
			}
		}
		if (colTuples != '') {
			colTuples = '{' + colTuples + '}';
			var colFilterSpec = ' %FILTER ' + colTuples;
		}
		
		// rows
		var rowTuples = '';
		for (var r = startRow; r <= endRow; ++r) {
			var rowTuple = '';
			var memberInfo = currentResultSet.getTupleInfo(2,r);
			var memberSpec = '';
			for (var i = 0; i < memberInfo.length; ++i) {
				// and these tuple specs
				if (memberInfo[i].dimName != 'Measures') {
					var memberSpec = '[' + memberInfo[i].dimName + ']';
					if (memberInfo[i].hierName) memberSpec = memberSpec + '.[' + memberInfo[i].hierName + ']';
					if (memberInfo[i].levelName) memberSpec = memberSpec + '.[' + memberInfo[i].levelName + ']';
					if (memberInfo[i].memberKey) memberSpec = memberSpec + '.&[' + memberInfo[i].memberKey + ']';
					if (rowTuple == '') {
						rowTuple = memberSpec;
					}
					else {
						rowTuple = rowTuple + ',' + memberSpec;
					}
				}
			}
			if (rowTuple != '') {
				rowTuple = '(' + rowTuple + ')';
				if (rowTuples == '') {
					rowTuples = rowTuple;
				}
				else {
					rowTuples = rowTuples + ',' + rowTuple;
				}
			}
		}
		if (rowTuples != '') {
			rowTuples = '{' + rowTuples + '}';
			var rowFilterSpec = ' %FILTER ' + rowTuples;
		}
	}
	
	if (rowFilterSpec) {
		listingFilterText = listingFilterText + rowFilterSpec;
	}
	if (colFilterSpec) {
		listingFilterText = listingFilterText + colFilterSpec;
	}
	return listingFilterText;
}

// + DRILLDOWN
DeepSeeDataController.prototype.runDrillDown = function(axis,position) {
	// construct drilldown query
	var resultSet = this.getCurrentData();
	var colSpec = resultSet.getAxisSpec(1).Text + ' ON 0';
	var rowSpec = resultSet.getAxisSpec(2).Text + ' ON 1';
	var childSpec = resultSet.getChildSpecForTuple(axis,position);
	if (!childSpec) return;
	// Build Spec that was clicked on as well and add to filters
	// maybe just finish this method by calling apply filters with the new filter
	var selectTuples = '';
	var selectTuple = '';
	var memberInfo = resultSet.getTupleInfo(axis,position);
	var memberSpec = '';
	for (var i = 0; i < memberInfo.length; ++i) {
		// and these tuple specs
		if (memberInfo[i].dimName != 'Measures') {
			var memberSpec = '[' + memberInfo[i].dimName + ']';
			if (memberInfo[i].hierName) memberSpec = memberSpec + '.[' + memberInfo[i].hierName + ']';
			if (memberInfo[i].levelName) memberSpec = memberSpec + '.[' + memberInfo[i].levelName + ']';
			if (memberInfo[i].memberKey) memberSpec = memberSpec + '.&[' + memberInfo[i].memberKey + ']';
			if (selectTuple == '') {
				selectTuple = memberSpec;
			}
			else {
				selectTuple = selectTuple + ',' + memberSpec;
			}
		}
	}
	if (selectTuple != '') {
		selectTuple = '(' + selectTuple + ')';
	}
	var queryText = 'SELECT ';
	if (axis==1) {
		queryText = queryText + childSpec + ' ON 0, ' + rowSpec + ' FROM ' + resultSet.getCubeName() + ' ';
	}
	else if (axis==2) {
		queryText = queryText + colSpec +  ',' + childSpec + ' ON 1 FROM ' + resultSet.getCubeName() + ' ';
	}
	this.initialMDX = queryText;
	this.isListing = false;
	this.drillLevel = this.drillLevel + 1;
	var filterInfo = {'filterName':'drilldownFilter','filterSpec':selectTuple};
	this.applyFilter(filterInfo);
}
// - DRILLDOWN

// + SORT DATA
DeepSeeDataController.prototype.sortResults = function(axis,position,direction,sortType) {
	
	if (direction==0) {
		this.sortState = direction;
		this.runQuery();
	}
	// + WAL191
	var reApplyTotals=false;
	if (this.showTotals) {
		this.removeTotals();
		reApplyTotals=true;
		this.showTotals=false;
	}
	// - WAL191
	// comparison functions
	var numericCompareAscending = function(a,b) {
		return a.value - b.value;
	};
	var numericCompareDescending = function(a,b) {
		return b.value - a.value;
	};
	var stringCompareAscending = function (a,b) {
		return a.localeCompare(b);
	}
	var stringCompareDescending = function (a,b) {
		return b.localeCompare(a);
	}
	// set sort function for this
	var sortFunction = ''
	if (sortType == '' || sortType.toLowerCase() == 'numeric') {
		if (direction == 1) {
			sortFunction = numericCompareAscending;
		}
		if (direction == -1) {
			sortFunction = numericCompareDescending;
		}
	}
	// + WAL191 -- add string sort
	else {
		if (direction == 1) {
			sortFunction = stringCompareAscending;
		}
		if (direction == -1) {
			sortFunction = stringCompareDescending;
		}
	}
	// - WAL191
		
	// clone result set object into new result set and push to stack
	var resultSet = this.getCurrentData();
	
	// connection,widget,wait,timeout
	var sortResultSet = new DeepSeeResultSet(resultSet.connection,resultSet.widget,resultSet.wait,resultSet.timeout);
	sortResultSet.data = resultSet.data;
	var dataObject = JSON.parse(sortResultSet.data);

	// All of these items need to be shifted within the JSON
	var copyAxisIndex = (axis==1) ? 1 : 0;
	var cellData = [];
	for (var i = 0; i < dataObject.Result.CellData.length; ++i) { cellData[i] = dataObject.Result.CellData[i]; }
	var tuplesData = [];
	tuplesData = JSON.parse(JSON.stringify(dataObject.Result.Axes[copyAxisIndex].Tuples));
	var tupleInfo = [];
	for (var i = 0; i < dataObject.Result.Axes[copyAxisIndex].TupleInfo.length; ++i) { 
		tupleInfo[i] = dataObject.Result.Axes[copyAxisIndex].TupleInfo[i]; 
	}
	
	if (axis==2) {
		var rowLength = cellData.length / sortResultSet.getRowCount();
		var sortArray = [];
		sortArray[0] = [];
		var s = 0;
		for (var i = 0; i < cellData.length; ++i) {
			if ((i!=0)&&((i%rowLength)==0)) { 
				++s;
				sortArray[s]=[];
			}
			sortArray[s][sortArray[s].length] = cellData[i];
		}
	}
	else if (axis==1) {
		var colLength = cellData.length / sortResultSet.getColumnCount();
		var rowLength = cellData.length / sortResultSet.getRowCount();
		var sortArray = [];
		sortArray[0] = [];
		var s = 0;
		for (var i = 0; i < cellData.length; ++i) {
			if ((i!=0)&&((i%colLength)==0)) { 
				++s;
				sortArray[s]=[];
			}
			var colIdx = sortArray[s].length;
			sortArray[s][colIdx] = cellData[s + (rowLength*colIdx)];
		}
	}
	
	// This is in sort major order -- mapped contains the relationship between the original index and the sort value
	var mapped = [];
	for (var i = 0; i < sortArray[position-1].length; ++i) {
		mapped[mapped.length] = { 'index':i, 'value':sortArray[position-1][i].ValueLogical};
	}
	mapped.sort(sortFunction);
	
	// WAL -- mapped now contains the index of what goes where
	//        if (axis==2) I need to rearrange COLUMNS according to the indices
	//        move everything around in the result set object and turn it back into JSON
	//        The index part of the mapped array now tells us how everything needs to be arranged
	//        rearrange tuples in OTHER axis and rearrange rows or columns of cell data
	var sortAxis = (axis==1) ? 2 : 1;
	dataObject.Result.CellData = [];
	dataObject.Result.Axes[sortAxis-1].Tuples = [];
	dataObject.Result.Axes[sortAxis-1].TupleInfo = [];
	for (var i = 0; i < mapped.length; ++i) {
		dataObject.Result.Axes[sortAxis-1].Tuples[dataObject.Result.Axes[sortAxis-1].Tuples.length] = tuplesData[mapped[i].index];
		dataObject.Result.Axes[sortAxis-1].TupleInfo[dataObject.Result.Axes[sortAxis-1].TupleInfo.length] = tupleInfo[mapped[i].index];
		if (axis==1) {
			for (var c = 0; c < sortResultSet.getColumnCount(); ++c) {
				for (var m = 0; m < mapped.length; ++m) {
					var rowNo = mapped[m].index;
					dataObject.Result.CellData[c+(sortResultSet.getColumnCount()*m)] = sortArray[c][rowNo];
				}
			}
		}
		if (axis==2) {
			dataObject.Result.CellData = []; // WAL191
			for (var r = 0; r < sortResultSet.getRowCount(); ++r) {
				for (var m = 0; m < mapped.length; ++m) {
					var colNo = mapped[m].index;
					dataObject.Result.CellData[dataObject.Result.CellData.length] = sortArray[r][colNo];
				}
			}
		}
	}
	sortResultSet.data = JSON.stringify(dataObject);

	this.sortState = direction;
	// + WAL191 -- let attach totals manage the stack
	if (reApplyTotals==true && this.preRemoveTotalsData) {
		this.resultSetStack[this.resultSetStack.length-1].data = JSON.stringify(this.preRemoveTotalsData);
	}
	this.resultSetStack.push(sortResultSet);
	if (reApplyTotals==true) {
		this.attachTotals(this.showRowTotals,this.showColumnTotals,true);
	}
	else {
		this.copyStateToStack();
		//alert renderer
		this.finalCallback(this);
	}
	// - WAL191
}
// - SORT DATA

// + WAL191 -- used by sortResults so the totals don't get sorted in with the data
DeepSeeDataController.prototype.removeTotals = function() {
	if (this.showTotals!=true) return;
	var resultSet = this.getCurrentData();
	var dataObject = JSON.parse(resultSet.data);
	var cellData = dataObject.Result.CellData;
	this.preRemoveTotalsData = JSON.parse(JSON.stringify(dataObject));
	var newCellData=[];
	var rowLimit = (this.showRowTotals==true) ? resultSet.getRowCount() - 1  : resultSet.getRowCount();
	var colLimit = (this.showColumnTotals==true) ? resultSet.getColumnCount() - 1 : resultSet.getColumnCount();
	for (var r = 1; r <= rowLimit; ++r) {
		for (var c = 1; c <= colLimit; ++c) {
			var index = ((r-1)*resultSet.getColumnCount())+(c-1);
			newCellData[newCellData.length] = cellData[index];
		}
	}
	if (this.showRowTotals==true) --dataObject.Info.RowCount;
	if (this.showColumnTotals==true) --dataObject.Info.ColCount;
	dataObject.Result.CellData = newCellData;
	resultSet.data = JSON.stringify(dataObject);
}
// - WAL191

// includeTotals -- adjust data in place? how to associate a column/row with a specific aggregate?
DeepSeeDataController.prototype.attachTotals = function(rowTotals,columnTotals, reAttach) {
	
	if (this.showTotals == true) return;
	if (!reAttach) reAttach = false;
	
	// + WAL191 -- allow user to specify row or column totals
	this.showColumnTotals = columnTotals;
	this.showRowTotals = rowTotals;
	// - WAL191
	
	// Totals functions? How to handle and keep track of these
	rTotals = [];
	cTotals = [];
	var runningTotal=0;
	var resultSet = this.getCurrentData();
	// connection,widget,wait,timeout
	var totalsResultSet = new DeepSeeResultSet(resultSet.connection,resultSet.widget,resultSet.wait,resultSet.timeout);
	totalsResultSet.data = resultSet.data;
	var dataObject = JSON.parse(totalsResultSet.data);

	
	// computeRowTotals
	for (var r = 1; r <= resultSet.getRowCount(); ++r) {
		for (var c = 1; c <= resultSet.getColumnCount(); ++c) {
			runningTotal += resultSet.getOrdinalValue(r,c);
		}
		rTotals[rTotals.length] = runningTotal;
		runningTotal = 0;
	}
	// computeColTotals
	for (var c = 1; c <= resultSet.getColumnCount(); ++c) {
		for (var r = 1; r <= resultSet.getRowCount(); ++r) {
			runningTotal += resultSet.getOrdinalValue(r,c);
		}
		cTotals[cTotals.length] = runningTotal;
		runningTotal = 0;
	}
	
	// Splice Totals into the result set
	// Splice headers in as well -- what should be used for header info??
	// need to update row and column count as well so that iteration works
	var cellData = dataObject.Result.CellData;
	var j = 0;
	var r = 0;
	if (this.showRowTotals==true) {
		for (var i = 0; i <= cellData.length; ++i) {
			if (j++==totalsResultSet.getColumnCount()) {
				var cellLength = cellData.length;
				cellData.splice(i,0,{ "%ID":"Cell_"+(cellLength+1),
									 "Format":"",
									 "ValueFormatted":rTotals[r++],
									 "ValueLogical":rTotals[r]
										});
				j = 1;
				++i;
			}
		}
		++dataObject.Info.ColCount; 
	}
	if (this.showColumnTotals==true) {
		for (var c = 0; c < cTotals.length; ++c) {
			/*
			{
				"%ID":"Cell_12",
				"Format":"",
				"ValueFormatted":193,
				"ValueLogical":193
			}
			*/
			var length = cellData.length;
			cellData[length] = { "%ID":"Cell_"+(length+1),
								 "Format":"",
								 "ValueFormatted":cTotals[c],
								 "ValueLogical":cTotals[c]
									};
		}
		++dataObject.Info.RowCount; 
	}
	if (this.showRowTotals==true&&this.showColumnTotals==true) {
		// grandTotal -- which aggregation function to use?
		var grandTotal = 0;
		for (var r = 0; r < rTotals.length; ++r) {
			grandTotal += rTotals[r];
		}
		for (var c = 0; c < cTotals.length; ++c) {
			grandTotal += cTotals[c];
		}
		cellData[cellData.length] = { "%ID":"Cell_"+(cellData.length+1),
								 "Format":"",
								 "ValueFormatted":grandTotal,
								 "ValueLogical":grandTotal
									};
	}
	
	//[resultSet.getRowCount()][resultSet.getColumnCount()] = grandTotal;
	totalsResultSet.data = JSON.stringify(dataObject);
	
	// push updated result set to stack
	this.showTotals = true;
	if (reAttach==true) {
		this.resultSetStack.pop();
	}
	this.resultSetStack.push(totalsResultSet);
	this.copyStateToStack();
	this.finalCallback(this);
}

// + TEST/DEBUG
var checkSort = function(resultSet,axis,position,direction) {
	var sortArray = [];
	if (axis==2) {
		for (var i = 1; i <= resultSet.getColumnCount(); ++i) {
			sortArray[sortArray.length] = resultSet.getOrdinalValue(position,i);
		}
	}
	else if (axis==1) {
		for (var i = 1; i <= resultSet.getRowCount(); ++i) {
			sortArray[sortArray.length] = resultSet.getOrdinalValue(position,i);
		}
	}
}

var printCellData = function(resultSet) {
	var sortArray = [];
	for (var i = 1; i <= resultSet.getRowCount(); ++i) {
		sortArray = [];
		for (var j = 1; j <= resultSet.getColumnCount(); ++j) {
			sortArray[sortArray.length] = resultSet.getOrdinalValue(i,j);
		}
	}
}
// - TEST/DEBUG

/*=============
  DeepSee Utils
  =============*/

var DeepSeeUtils = {};

DeepSeeUtils.isError = function(data) {
	var data = ZLM.jsonParse(data);
	return (data.Info.Error.ErrorCode!='');
}

DeepSeeUtils.getErrorMessage = function(data) {
	var data = ZLM.jsonParse(data);
	return data.Info.Error.ErrorMessage;
}

DeepSeeUtils.getResultsAsArray = function(data) {
	var data = ZLM.jsonParse(data);
	if (data.Result.Filters) {
		return data.Result.Filters;
	}
	if (data.Result.FilterMembers) {
		return data.Result.FilterMembers;
	}
	if (data.Result.Listings) {
		return data.Result.Listings;
	}
}

DeepSeeUtils.getFiltersForDataSource = function(connection,cubeName,finalCallback) {
	var r = {};
	r.method = "POST";
	r.user = connection.username;
	r.passwd = connection.password;
	r.acceptType = "application/json";
	r.contentType = "JSON";
	r.callback = DeepSeeUtils.processResponse;
	r.async = true;
	r.service = 'Info/Filters';
	r.url = connection.path+'Info/Filters/'+cubeName;
	DeepSeeUtils.sendRequest(r,'',finalCallback);
}

DeepSeeUtils.getMembersForFilter = function(connection,cubeName,filterSpec,finalCallback) {
	var r = {};
	r.method = "POST";
	r.user = connection.username;
	r.passwd = connection.password;
	r.acceptType = "application/json";
	r.contentType = "JSON";
	r.callback = DeepSeeUtils.processResponse;
	r.async = true;
	r.service = 'Info/FilterMembers';
	r.url = connection.path+'Info/FilterMembers/'+cubeName+'/'+filterSpec;
	DeepSeeUtils.sendRequest(r,'',finalCallback);
}

DeepSeeUtils.getCubeList = function(connection,finalFunc) {
	var r = {};
	r.method = "POST";
	r.user = connection.username;
	r.passwd = connection.password;
	r.acceptType = "application/json";
	r.contentType = "JSON";
	r.callback = DeepSeeUtils.processResponse;
	r.async = true;
	r.service = 'Info/Cubes';
	r.url = connection.path+'Info/Cubes';
	DeepSeeUtils.sendRequest(r,'',finalFunc);
}

DeepSeeUtils.getPivotList = function(connection,finalFunc) {
	var r = {};
	r.method = "POST";
	r.user = connection.username;
	r.passwd = connection.password;
	r.acceptType = "application/json";
	r.contentType = "JSON";
	r.callback = DeepSeeUtils.processResponse;
	r.async = true;
	r.service = 'Info/Pivots';
	r.url = connection.path+'Info/Pivots';
	DeepSeeUtils.sendRequest(r,'',finalFunc);
}

DeepSeeUtils.getDashboardList = function(connection,finalFunc) {
	var r = {};
	r.method = "POST";
	r.user = connection.username;
	r.passwd = connection.password;
	r.acceptType = "application/json";
	r.contentType = "JSON";
	r.callback = DeepSeeUtils.processResponse;
	r.async = true;
	r.service = 'Info/Dashboards';
	r.url = connection.path+'Info/Dashboards';
	DeepSeeUtils.sendRequest(r,'',finalFunc);
}

DeepSeeUtils.getCubeListings = function(connection,cubeName,finalFunc) {
	var r = {};
	r.method = "POST";
	r.user = connection.username;
	r.passwd = connection.password;
	r.acceptType = "application/json";
	r.contentType = "JSON";
	r.callback = DeepSeeUtils.processResponse;
	r.async = true;
	r.service = 'Info/Listings';
	r.url = connection.path+'Info/Listings/'+cubeName;
	DeepSeeUtils.sendRequest(r,'',finalFunc);
}

DeepSeeUtils.sendRequest = function(r,resultSet,finalCallback,pendingCallback) {
	// run the query
	if (resultSet===undefined) resultSet = '';
	var xhr = new XMLHttpRequest();
	xhr.open(r.method,r.url,r.async);
	// set up callback handler
	xhr.onload = function () {
  		if (xhr.status === 200) {
    		if (r.callback) {
				if (pendingCallback==undefined) {
					r.callback(xhr,r,resultSet,finalCallback);
				}
				else {
					r.callback(xhr,r,resultSet,finalCallback,pendingCallback);
				}
    		}
			else {
   				alert('done');
			}
  		} else {
    		alert('An error occurred\nUse the browsers Developer Tools to inspect headers.');
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
	var contents = null;
	if (r.method=='POST'||r.method=='PUT') {
		if (r.contentType) {
			xhr.setRequestHeader("Content-Type",r.contentType);
		}
		if (r.body) {
			contents = r.body;
		}
	}
	xhr.send(contents);
	// Fire off pending method for the case when we aren't going to poll the server
	// But we did provide a pending method to draw some sort of chartDataPoint
	if ((resultSet.wait===1)&&(pendingCallback)) {
		pendingCallback(resultSet);
	}
}

DeepSeeUtils.processResponse = function(xhr,r,resultSet,finalCallback,pendingCallback) {
	if (resultSet !='') resultSet.data = xhr.responseText;
	else var data = xhr.responseText;
	// Info services don't use a result set or have a concept of pending
	if (r.service.indexOf('Info')!=-1) {
		finalCallback(data);
		return;
	}
	if (resultSet.getQueryStatus()==0) { // AND we haven't timed out yet
		// If we get an incomplete response and we want to draw some pending info,
		// run the request again
		if (resultSet.wait===0) {
			setTimeout(DeepSeeUtils.sendRequest(r,resultSet,finalCallback,pendingCallback),resultSet.pollInterval);
		}
		if (pendingCallback) { pendingCallback(resultSet); }
	}
	else {
		if (finalCallback) { 
			if (resultSet.dataController) {
				finalCallback.call(resultSet.dataController,resultSet); // WAL166
			}
			else {
				finalCallback(resultSet); 
			}
		}
	}
}











