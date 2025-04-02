/*
	svggrid.js
	
	Copyright (c) 2005, InterSystems Corp.
	ALL RIGHTS RESERVED
*/


// constructor for Grid
function Grid(meter,id,svgroot,wid,hgt,lblWid,lblHgt,maxRows,maxCols,lstyle,cstyle,unsupported,flow,colReverse,rowReverse,colAgg,rowAgg,colAggLbl,rowAggLbl)
{
	// properties
	this.id = id;
	this.width = wid;
	this.height = hgt;
	this.labelHeight = lblHgt;
	this.labelWidth = lblWid;
	this.rowCount = 0;
	this.colCount = 0;
	this.maxCols = maxCols; // max columns to display
	this.maxRows = maxRows; // max rows to display

	this.unsupported = unsupported; // unsupported row/col combination

	this.flow = flow; // how does data flow from: vertical or horizontal

	// direction of dimensions
	this.colReverse = colReverse;
	this.rowReverse = rowReverse;
	
	// aggregate functions
	this.rowAggregate = (''==rowAgg) ? null : rowAgg;
	this.colAggregate = (''==colAgg) ? null : colAgg;
	this.rowAggCount = this.rowAggregate ? 1 : 0; // number of agg rows
	this.colAggCount = this.colAggregate ? 1 : 0; // number of agg cols

	this.colAggLabel = colAggLbl;
	this.rowAggLabel = rowAggLbl;

	// set up default styles
	this.cellStyle = 'pointer-events: none; fill:black; font-size:7; stroke: none;' + cstyle;
	this.labelStyle = 'pointer-events: none; fill:yellow; font-size:7; stroke: none;' + lstyle;
	this.aggStyle = 'pointer-events: none; fill:black; font-size:7; stroke: none; font-weight: bold;' + cstyle;

	this.rowHeight = meter.rowHeight; // height of each row
	this.colWidth = 25; // width of each column (this get calculated later)

	// array of data arrays: one per column
	this.dataSeries = new Array();
	this.rowLabels = null; // list of row labels
	this.colLabels = null; // list of row labels

	// methods
	this.updateGridLines = Grid_updateGridLines;
	this.setData = Grid_setData;
	this.setLabels = Grid_setLabels;
	this.setRowLabels = Grid_setRowLabels;
	this.setColLabels = Grid_setColLabels;
	this.createCell = Grid_createCell;
	this.computeDimensions = Grid_computeDimensions;
	this.formatText = Grid_formatText;

	// render
	// outer pane
	var pane = document.createElement("rect");
	pane.setAttribute("class","Grid-OuterPanel");
	pane.setAttribute("x",0);
	pane.setAttribute("y",0);
	pane.setAttribute("rx",10);
	pane.setAttribute("width",this.width);
	pane.setAttribute("height",this.height);
	
	// !!!
	svgroot.appendChild(pane);

	// construct the background for the grid: establish master clipping rect
	this.group = document.createElement("svg");
	this.group.setAttribute("id",id + "_SVGGrid");
	this.group.setAttribute("width",this.width);
	this.group.setAttribute("height",this.height);
	this.group.grid = this; // backpointer

	svgroot.appendChild(this.group);

	// inner pane
	var pane = document.createElement("rect");
	pane.setAttribute("class","Grid-InnerPanel");
	pane.setAttribute("x",this.labelWidth);
	pane.setAttribute("y",this.labelHeight);
	pane.setAttribute("width",this.width - this.labelWidth - 10);
	pane.setAttribute("height",this.height - this.labelHeight -5);

	if (this.unsupported) {
		pane.setAttribute("style","fill: gray;");
	}
	
	this.group.appendChild(pane);

	// cell lines

	// y grid path
	var path = document.createElement("path");
	path.setAttribute("class","Grid-CellLine");
	path.setAttribute("id",this.id + "_colLines");
	this.group.appendChild(path);

	// x grid path
	var path = document.createElement("path");
	path.setAttribute("class","Grid-CellLine");
	path.setAttribute("id",this.id + "_rowLines");
	this.group.appendChild(path);
}

/// update cell size based on number of cells
function Grid_computeDimensions()
{
	// compute size of cells
	this.colCount = (this.colLabels) ? this.colLabels.length : 0;
	this.rowCount = (this.rowLabels) ? this.rowLabels.length : 0;

	this.colCount = (this.colCount > this.maxCols) ? this.maxCols : this.colCount;
	this.rowCount = (this.rowCount > this.maxRows) ? this.maxRows : this.rowCount;

	// compute size of cells
	this.colWidth = 0;
	if (this.colCount > 0) {
		this.colWidth = (this.width - this.labelWidth - 10) / (this.colCount + this.colAggCount);
	}
	else {
		this.colWidth = 25;
	}
}

function Grid_updateGridLines()
{
	// update gridlines
	var d, path;

	this.computeDimensions();
	
	var xMax = this.labelWidth + (this.colWidth * (this.colCount + this.colAggCount));
	var yMax = this.labelHeight + (this.rowHeight * (this.rowCount + this.rowAggCount));
	xMax = (xMax > this.width-10) ? this.width-10 : xMax;
	yMax = (yMax > this.height-5) ? this.height-5 : yMax;

	// y path
	path = document.getElementById(this.id + "_colLines");
	d = "";
	var row = 0;
	var y = this.labelHeight;
	while (row++ <= (this.rowCount+this.rowAggCount) && y <= this.height-5) {
		d += 'M ' + 0 + ' ' + y + ', L ' + xMax + ' ' + y;
		y += this.rowHeight;
	}
	path.setAttribute("d",d);
	
	// x grid path
	path = document.getElementById(this.id + "_rowLines");
	d = "";
	var col = 0;
	var x = this.labelWidth;
	while (col++ <= (this.colCount+this.colAggCount) && x <= this.width-10) {
		d += 'M ' + x + ' ' + 0 + ', L ' + x + ' ' + yMax;
		x += this.colWidth;
	}
	path.setAttribute("d",d);
}

// Set a data series for this grid
// and update the display to show it
// sno is the series number (0 based)
// data is an array of data values
function Grid_setData(sno,data)
{
	if ('' == this.flow || this.unsupported) {
		// no data OR not a supported layout
		return;
	}

	// see if we need to reverse meaning of sno
	if ('vertical' == this.flow && (this.rowReverse || this.colReverse)) {
		sno = (this.colCount-1) - sno;
	}
	else if ('horizontal' == this.flow && (this.colReverse || this.rowReverse)) {
		sno = (this.rowCount-1) - sno;
	}

	// get rid of old cells
	if (this.dataSeries[sno]) {
		if ('vertical' == this.flow) {
			for (var r = 0; r < this.dataSeries[sno].length; r++) {
				var cell = document.getElementById(this.id + '_Cell_' + sno + '_' + r);
				if (cell) {
					this.group.removeChild(cell);
				}
			}
			if (this.rowAggregate) {
				var cell = document.getElementById(this.id + '_Cell_' + sno + '_' + this.dataSeries[sno].length);
				if (cell) {
					this.group.removeChild(cell);
				}
			}
		}
		else {
			// horizontal
			for (var c = 0; c < this.dataSeries[sno].length; c++) {
				var cell = document.getElementById(this.id + '_Cell_' + c + '_' + sno);
				if (cell) {
					this.group.removeChild(cell);
				}
			}
			if (this.colAggregate) {
				var cell = document.getElementById(this.id + '_Cell_' + this.dataSeries[sno].length + '_' + sno);
				if (cell) {
					this.group.removeChild(cell);
				}
			}
		}
		this.dataSeries[sno] = null;
	}

	// create new cells !!!
	if (data) {
		var agg = new Array();
		if ('vertical' == this.flow) {
			var x = this.labelWidth + (sno * this.colWidth);
			var y = this.labelHeight;
			this.dataSeries[sno] = data;
			if (this.rowReverse) {
				// reverse
				var rc = 0;
				for (var r = this.dataSeries[sno].length - 1; r >=0 && rc < this.rowCount; r--) {
					agg[agg.length] = data[r];
					this.createCell(this.group,this.id + '_Cell_' + sno + '_' + r,x,y,this.colWidth,this.rowHeight,data[r],this.cellStyle,true);
					y += this.rowHeight;
					rc++;
				}
			}
			else {
				for (var r = 0; r < this.dataSeries[sno].length && r < this.rowCount; r++) {
					agg[agg.length] = data[r];
					this.createCell(this.group,this.id + '_Cell_' + sno + '_' + r,x,y,this.colWidth,this.rowHeight,data[r],this.cellStyle,true);
					y += this.rowHeight;
				}
			}
			if (this.rowAggregate) {
				var a = computeAggregate(this.rowAggregate,agg);
				this.createCell(this.group,this.id + '_Cell_' + sno + '_' + this.dataSeries[sno].length,x,y,this.colWidth,this.rowHeight,a,this.aggStyle,true);
			}
		}
		else {
			// horizontal
			var x = this.labelWidth;
			var y = this.labelHeight + (sno * this.rowHeight);
			this.dataSeries[sno] = data;
			if (this.colReverse) {
				// reverse
				var cc = 0;
				for (var c = this.dataSeries[sno].length-1; c >= 0 && cc < this.colCount; c--) {
					agg[agg.length] = data[c];
					this.createCell(this.group,this.id + '_Cell_' + c + '_' + sno,x,y,this.colWidth,this.rowHeight,data[c],this.cellStyle,true);
					x += this.colWidth;
					cc++;
				}
			}
			else {
				for (var c = 0; c < this.dataSeries[sno].length && c < this.colCount; c++) {
					agg[agg.length] = data[c];
					this.createCell(this.group,this.id + '_Cell_' + c + '_' + sno,x,y,this.colWidth,this.rowHeight,data[c],this.cellStyle,true);
					x += this.colWidth;
				}
			}

			if (this.colAggregate) {
				var a = computeAggregate(this.colAggregate,agg);
				this.createCell(this.group,this.id + '_Cell_' + this.dataSeries[sno].length + '_' + sno,x,y,this.colWidth,this.rowHeight,a,this.aggStyle,true);
			}
		}
	}
}

function Grid_setRowLabels(labels)
{
	var rows = this.rowCount;
	this.setLabels(labels,true);
	if (rows != this.rowCount) {
		this.updateGridLines();
	}
}

function Grid_setColLabels(labels)
{
	var cols = this.colCount;
	this.setLabels(labels,false);
	if (cols != this.colCount) {
		this.updateGridLines();
	}
}

function Grid_setLabels(labels,isRowLabels)
{
	var labelList = isRowLabels ? this.rowLabels : this.colLabels;
	var marker = isRowLabels ? '_RowLabel_' : '_ColLabel_';

	// find out previous size of label
	var oldsize = labelList ? labelList : 0;
	
	// see if there is any change in the labels
	if (labels) {
		if (labels.length == oldsize) {
			var equal = true;
			for (var i = 0; i < oldsize; i++) {
				if (labels[i] != labelList[i]) {
					equal = false;
					break;
				}
			}
			if (equal) {
				// nothing to do
				return;
			}
		}
	}	

	// get rid of old labels
	if (labelList) {
		var a = isRowLabels ? this.rowAggCount : this.colAggCount;
		for (var r = 0; r < labelList.length + a; r++) {
			var cell = document.getElementById(this.id + marker + r);
			if (cell) {
				this.group.removeChild(cell);
			}
		}
		
		if (isRowLabels) {
			this.rowLabels = null;
		}
		else {
			this.colLabels = null;
		}
	}

	if (labels) {
		var count,wid,hgt,dx,dy;
		if (isRowLabels) {
			this.rowLabels = labels;
			labelList = this.rowLabels;
		}
		else {
			this.colLabels = labels;
			labelList = this.colLabels;
		}

		this.computeDimensions();

		if (isRowLabels) {
			count = this.rowCount; 
			wid = this.labelWidth;
			hgt = this.rowHeight;
			dx = 0;
			dy = this.rowHeight;
		}
		else {
			count = this.colCount; 
			wid = this.colWidth;
			hgt = this.labelHeight;
			dx = this.colWidth;
			dy = 0;
		}

		var reverse = isRowLabels ? this.rowReverse : this.colReverse;
		var x = isRowLabels ? 0 : this.labelWidth;
		var y = isRowLabels ? this.labelHeight : 0;
		if (reverse) {
			var cc = 0;
			for (var r = labelList.length-1; r >=0 && cc < count; r--) {
				this.createCell(this.group,this.id + marker + r,x,y,wid,hgt,labelList[r],this.labelStyle,isRowLabels);
				x += dx;
				y += dy;
				cc++;
			}
		}
		else {
			for (var r = 0; r < labelList.length && r < count; r++) {
				this.createCell(this.group,this.id + marker + r,x,y,wid,hgt,labelList[r],this.labelStyle,isRowLabels);
				x += dx;
				y += dy;
			}
		}
		// agg labels?
		if (isRowLabels && this.rowAggregate && this.rowAggLabel != '') {
			this.createCell(this.group,this.id + marker + r,x,y,wid,hgt,this.rowAggLabel,this.labelStyle,isRowLabels);
		}
		else if (!isRowLabels && this.colAggregate && this.colAggLabel != '') {
			this.createCell(this.group,this.id + marker + r,x,y,wid,hgt,this.colAggLabel,this.labelStyle,isRowLabels);
		}
	}
}

// create a text cell (for a cell or label)
function Grid_createCell(svgroot, id, x, y, width, height, label,style,rightalign)
{
	// place cell within clipping svg box
	var svg = document.createElement("svg");
	svg.setAttribute("id",id);
	svg.setAttribute("x", x);
	svg.setAttribute("y", y);
	svg.setAttribute("width", width);
	svg.setAttribute("height", height);
	svgroot.appendChild(svg);

	var text = document.createElement("text");
	text.setAttribute("style",style);
	if (rightalign) {
		text.setAttribute("text-anchor","end");
		text.setAttribute("x", width - 2);
	}
	else {
		text.setAttribute("x", 2);
	}
	text.setAttribute("y", height - 2);

	var textNode = document.createTextNode(this.formatText(label));
	text.appendChild(textNode);
	svg.appendChild(text);
}

// return a formatted cell value
function Grid_formatText(val)
{
	var out;
	if (!isNaN(val*1) && ('' != val)) {
		// number
		if (val < 0) {
			//out = '(' + (Math.floor(-val * 100) / 100) + ')';
			out = (Math.floor(val * 100) / 100);
		}
		else {
			out = (Math.floor(val * 100) / 100);
		}
	}
	else {
		// text
		out = val;
	}
	return out;
}

// return computed aggreate of given data array
function computeAggregate(type, data)
{
	var n,d;
	var val = 0;

	if (data.length <= 0) {
		return 0
	}
	
	switch (type) {
	case 'sum':
		for (n = 0; n < data.length; n++) {
			d = (data[n] - 0);
			if (isNaN(d)) {
				val = '';
				break;
			}
			else {
				val += d; 
			}
		}
		break;

	case 'avg':
		for (n = 0; n < data.length; n++) {
			d = (data[n] - 0);
			if (isNaN(d)) {
				val = '';
				break;
			}
			else {
				val += d;
			}
		}
		if ('' != val) {
			val /= data.length;
		}
		break;

	case 'max':
		val = (data[0] * 1); 
		for (n = 1; n < data.length; n++) {
			val = val > (data[n] - 0) ? val : (data[n] - 0);
		}
		if (isNaN(val)) {
			val = '';
		}
		break;

	case 'min':
		val = (data[0] * 1); 
		for (n = 1; n < data.length; n++) {
			val = val < (data[n] - 0) ? val : (data[n] - 0);
		}
		if (isNaN(val)) {
			val = '';
		}
		break;

	default:
		val = 'function ' + type + ' unknown';
		break;
	}
	
	return val;
}