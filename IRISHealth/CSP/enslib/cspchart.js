/*
	cspchart.js
	Copyright (c) 2003, InterSystems Corp.
	ALL RIGHTS RESERVED

	SVG-utility chart objects
*/

var SVGNS = "http://www.w3.org/2000/svg";

// constructor for line chart
function LineChart(id,svgroot,wid,hgt,tm,bm,lm,rm,style,indScale)
{
	indScale = (indScale==null) ? false : indScale;
	this.hasGrid = true;

	// invoke common super-constructor
	constructChart(this,id,svgroot,wid,hgt,tm,bm,lm,rm,style,indScale);

	// array of lines
	this.linePlot = new Array();

	// methods
	this.setSeries = LineChart_setSeries;
}

// constructor for bar chart
function BarChart(id,svgroot,wid,hgt,tm,bm,lm,rm,style,indScale)
{
	indScale = (indScale==null) ? false : indScale;
	this.hasGrid = true;

	// invoke common super-constructor
	constructChart(this,id,svgroot,wid,hgt,tm,bm,lm,rm,style,indScale);

	// methods
	this.setSeries = BarChart_setSeries;

	// create group to hang bars off of

	var group = document.createElementNS(SVGNS,"g");
	group.setAttribute("id",id + "_BarChartGroup");
	this.group.appendChild(group);
}

// constructor for pie chart
function PieChart(id,svgroot,wid,hgt,tm,bm,lm,rm,style,indScale)
{
	indScale = (indScale==null) ? false : indScale;
	this.hasGrid = false;

	// invoke common super-constructor
	constructChart(this,id,svgroot,wid,hgt,tm,bm,lm,rm,style,indScale);

	// methods
	this.setSeries = PieChart_setSeries;
	this.setXLabels = PieChart_setXLabels;

	// create group to hang slices off of
	var group = document.createElementNS(SVGNS,"g");
	group.setAttribute("id",id + "_PieChartGroup");
	this.group.appendChild(group);
}

// common constructor code for charts
function constructChart(chart,id,svgroot,wid,hgt,tm,bm,lm,rm,style,indScale)
{
	// properties
	chart.chartId = id;
	chart.name = name;
	chart.width = wid;
	chart.height = hgt;

	chart.xGridLines = 0;
	chart.yGridLines = 0;
	chart.independentScale = indScale;
	chart.currScale = 0;

	// csv list of styles used by series
	// parse and place into chartStyle *object*
	chart.chartStyle = new Object();
	if (style) {
		var s = style.split(",");
		for (var i = 0; i < s.length; i++) {
			var st = s[i];
			if (st != '') {
				chart.chartStyle[st] = true;
			}
		}
	}

	// array of colors used by series
	chart.colors = new Array();

	// margins
	chart.topMargin = tm;
	chart.bottomMargin = bm;
	chart.leftMargin = lm;
	chart.rightMargin = rm;

	// scale
	chart.yMinValue = new Array();
	chart.yMaxValue = new Array();
	chart.scaleFactor = new Array();

	chart.axes = null;
	chart.xLabels = null;

	// array of data arrays
	chart.dataSeries = new Array();

	// methods
	chart.showAxes = Chart_showAxes;
	chart.setScale = Chart_setScale;
	chart.setXLabels = Chart_setXLabels;
	chart.setGridLines = Chart_setGridLines;
	chart.getDataSeries = Chart_getDataSeries;
	chart.getSeriesCount = Chart_getSeriesCount;
	chart.updateScale = Chart_updateScale;
	chart.toggleScale = Chart_toggleScale;

	// construct the background for the chart
	chart.group = document.createElementNS(SVGNS,"g");
	chart.group.setAttribute("id",id + "_SVGChart");
	chart.group.chart = chart; // backpointer

	svgroot.appendChild(chart.group);

	// outer pane
	var pane = document.createElementNS(SVGNS,"rect");
	pane.setAttribute("class","Chart-OuterPanel");
	pane.setAttribute("x",0);
	pane.setAttribute("y",0);
	pane.setAttribute("width",chart.width);
	pane.setAttribute("height",chart.height);

	chart.group.appendChild(pane);

	// inner pane
	var pane = document.createElementNS(SVGNS,"rect");
	pane.setAttribute("class","Chart-InnerPanel");
	pane.setAttribute("x",0);
	pane.setAttribute("y",0);
	pane.setAttribute("rx",10);
	pane.setAttribute("width",chart.width);
	pane.setAttribute("height",chart.height);

	chart.group.appendChild(pane);

	if (chart.hasGrid) {
		// plot area
		var pane = document.createElementNS(SVGNS,"rect");
		pane.setAttribute("class","Chart-PlotArea");
		pane.setAttribute("x",chart.leftMargin);
		pane.setAttribute("y",chart.topMargin);
		pane.setAttribute("width",chart.width - (chart.rightMargin + chart.leftMargin));
		pane.setAttribute("height",chart.height - (chart.topMargin + chart.bottomMargin));

		chart.group.appendChild(pane);

		// y-axis labels
		// max
		var text = document.createElementNS(SVGNS,"text");
		text.setAttribute("id",id + "_yMaxLabel");
		text.setAttribute("class","Chart-yLabel");
		text.setAttribute("text-anchor","end");
		text.setAttribute("x", chart.leftMargin-3);
		text.setAttribute("y", 2 + chart.topMargin);

		// create the text node and append it
		var factor = 1;
		var ymax = 100;
		var ymin = 0;
		var textNode = document.createTextNode(factor * ymax);
		text.appendChild(textNode);
		chart.group.appendChild(text);

		// mid
		var text = document.createElementNS(SVGNS,"text");
		text.setAttribute("id",id + "_yMidLabel");
		text.setAttribute("class","Chart-yLabel");
		text.setAttribute("text-anchor","end");
		text.setAttribute("x", chart.leftMargin-3);
		text.setAttribute("y", 2 + chart.topMargin + (chart.height - (chart.topMargin + chart.bottomMargin)) / 2);

		// create the text node and append it
		var textNode = document.createTextNode(factor * (ymin + ((ymax - ymin) / 2)));
		text.appendChild(textNode);
		chart.group.appendChild(text);

		// min
		var text = document.createElementNS(SVGNS,"text");
		text.setAttribute("id",id + "_yMinLabel");
		text.setAttribute("class","Chart-yLabel");
		text.setAttribute("text-anchor","end");
		text.setAttribute("x", chart.leftMargin-3);
		text.setAttribute("y", 2 + chart.height - chart.bottomMargin);

		// create the text node and append it
		var textNode = document.createTextNode(factor * ymin);
		text.appendChild(textNode);
		chart.group.appendChild(text);

		// x labels
		// create group to hang x-axis labels off of
		var group = document.createElementNS(SVGNS,"g");
		group.setAttribute("id",id + "_xLabelGroup");
		chart.group.appendChild(group);
	}
}

// ----
// methods

function Chart_getDataSeries(sno)
{
	return this.dataSeries[sno];
}

function Chart_getSeriesCount()
{
	return this.dataSeries.length;
}

// set y-scale of chart
function Chart_setScale(ymin, ymax, factor,sno,force)
{
	if (!this.hasGrid) return;

	// test for missing value
	factor = (factor == null) ? 1 : factor;
	sno = (sno == null) ? this.currScale : sno;
	force = (force == null) ? false : force;

	if (!force &&
		(this.yMinValue[sno] == ymin) &&
		(this.yMaxValue[sno] == ymax) &&
		(this.scaleFactor[sno] == factor)) {
		return;
	}
	this.yMinValue[sno] = ymin;
	this.yMaxValue[sno] = ymax;
	this.scaleFactor[sno] = factor;

	if (sno != this.currScale) {
		// only update current scale
		return;
	}

	// get text for labels; apply abbreviations if need be
	var yMaxLabel = factor * ymax;
	var yMinLabel = factor * ymin;
	var yMidLabel = factor * (ymin + ((ymax - ymin) / 2));
	var absmax = Math.abs(yMaxLabel);
	var absmin = Math.abs(yMinLabel);
	var test = (absmax > absmin) ? absmax : absmin;

	// test for abbreviated labels
	if (test >= 600000000) {
		// billions
		yMaxLabel = Math.round(yMaxLabel / 10000000)/100 + 'G';
		yMidLabel = Math.round(yMidLabel / 10000000)/100 + 'G';
		yMinLabel = Math.round(yMinLabel / 10000000)/100 + 'G';
	}
	else if (test >= 600000) {
		// millions
		yMaxLabel = Math.round(yMaxLabel / 10000)/100 + 'M';
		yMidLabel = Math.round(yMidLabel / 10000)/100 + 'M';
		yMinLabel = Math.round(yMinLabel / 10000)/100 + 'M';
	}
	else if (test >= 60000) {
		// thousands
		yMaxLabel = Math.round(yMaxLabel / 10)/100 + 'K';
		yMidLabel = Math.round(yMidLabel / 10)/100 + 'K';
		yMinLabel = Math.round(yMinLabel / 10)/100 + 'K';
	}
	else if (test >= 100) {
		// no abbrev: round
		yMaxLabel = Math.round(yMaxLabel);
		yMidLabel = Math.round(yMidLabel);
		yMinLabel = Math.round(yMinLabel);
	}
	else {
		// small number, 2 decimal digits
		yMaxLabel = Math.round(yMaxLabel*100)/100;
		yMidLabel = Math.round(yMidLabel*100)/100;
		yMinLabel = Math.round(yMinLabel*100)/100;
	}

	// update labels
	var text, textNode;
	text = document.getElementById(this.chartId + "_yMaxLabel");
	if (text) {
		// create next text node and replace the current one
		var oldNode = text.firstChild;
		text.removeChild(oldNode);
		if (this.colors[this.currScale]) {
			text.setAttribute("style","fill: " + this.colors[this.currScale] + ";");
		}

		textNode = document.createTextNode(yMaxLabel);
		text.appendChild(textNode);
	}

	text = document.getElementById(this.chartId + "_yMidLabel");
	if (text) {
		// create next text node and replace the current one
		var oldNode = text.firstChild;
		text.removeChild(oldNode);
		if (this.colors[this.currScale]) {
			text.setAttribute("style","fill: " + this.colors[this.currScale] + ";");
		}

		textNode = document.createTextNode(yMidLabel);
		text.appendChild(textNode);
	}

	text = document.getElementById(this.chartId + "_yMinLabel");
	if (text) {
		// create next text node and replace the current one
		var oldNode = text.firstChild;
		text.removeChild(oldNode);
		if (this.colors[this.currScale]) {
			text.setAttribute("style","fill: " + this.colors[this.currScale] + ";");
		}

		textNode = document.createTextNode(yMinLabel);
		text.appendChild(textNode);
	}
}

// x-axis labels for chart
// labels is an array of label values
function Chart_setXLabels(labels)
{
	if (!this.hasGrid) return;

	// find out previous size of label
	var oldsize = this.xLabels ? this.xLabels.length : 0;

	// see if there is any change in the labels
	if (labels) {
		if (labels.length == oldsize) {
			var equal = true;
			for (var i = 0; i < oldsize; i++) {
				if (labels[i] != this.xLabels[i]) {
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

	// assign new labels
	this.xLabels = labels;

	var id = this.chartId;
	var group = document.getElementById(id + "_xLabelGroup");

	// clear out the old labels
	for (var i = 0; i < oldsize; i++) {
		var lbl = document.getElementById(id + "_xLabel_" + i);
		if (lbl) {
			group.removeChild(lbl);
		}
	}

	// create new labels
	if (this.xLabels && (this.xLabels.length > 0)) {
		// use abbreviations
		var abbr = (this.xLabels.length > 6)

		for (var i = 0; i < this.xLabels.length; i++) {
			var text = document.createElementNS(SVGNS,"text");
			text.setAttribute("id",id + "_xLabel_" + i);
			text.setAttribute("class","Chart-xLabel");
			if (this.linePlot) {
				// center labels for line charts
				text.setAttribute("text-anchor","middle");
			}
			else {
				text.setAttribute("text-anchor","start");
			}

			// create the text node and append it
			var t = (abbr) ? this.xLabels[i].substr(0,3) : this.xLabels[i];
			var textNode = document.createTextNode(t);
			text.appendChild(textNode);
			group.appendChild(text);
		}
	}

	// compute location / text for labels
	if (this.xLabels && (this.xLabels.length > 0)) {
		var points = "";
		var gw = (this.width - (this.leftMargin + this.rightMargin));
		var gh = (this.height - (this.topMargin + this.bottomMargin));
		var xLeft = this.leftMargin;
		var yBot = this.height - this.bottomMargin;
		var x,txt,dx;
		var a1 = this.bottomMargin * 0.9;
		var a2 = this.bottomMargin * 0.5;

		// now set the position of the labels
		if (this.linePlot && (this.xLabels.length > 1)) {
			// special case for LineChart
			dx = gw / (this.xLabels.length - 1);
		}
		else {
			dx = gw / (this.xLabels.length);
		}

		// use alternating rows
		var alt = false;
		if (this.xLabels.length > 3) {
			alt = (gw / this.xLabels.length) < 50;
		}

		for (var i = 0; i < this.xLabels.length; i++) {
			txt = this.xLabels[i];
			x = ((i * dx) + xLeft);

			var lbl = document.getElementById(id + "_xLabel_" + i);
			lbl.setAttribute("x",x);
			if (alt && i%2) {
				// alternative row
				lbl.setAttribute("y",yBot+a1);
			}
			else {
				lbl.setAttribute("y",yBot+a2);
			}
		}
	}
}

// create axes for this chart
function Chart_showAxes()
{
	if (!this.hasGrid) return;

	// get corner points
	var xLeft = this.leftMargin;
	var xRight = this.width - this.rightMargin;
	var yTop = this.topMargin;
	var yBot = this.height - this.bottomMargin;

	// y grid path
	var path = document.createElementNS(SVGNS,"path");
	path.setAttribute("class","Chart-GridLine");
	path.setAttribute("id",this.chartId + "_yGridLine");
	this.group.appendChild(path);

	// x grid path
	var path = document.createElementNS(SVGNS,"path");
	path.setAttribute("class","Chart-GridLine");
	path.setAttribute("id",this.chartId + "_xGridLine");
	this.group.appendChild(path);

	// axes
	this.axes = document.createElementNS(SVGNS,"polyline");
	this.axes.setAttribute("class","Chart-Axis");

	var pts = xLeft + ", " + yTop + " " + xLeft + "," + yBot + " " + xRight + "," + yBot;
	this.axes.setAttribute("points",pts);
	this.group.appendChild(this.axes);
}

// Set number of x and y grid lines
function Chart_setGridLines(xlines, ylines)
{
	if (!this.hasGrid) return;

	if ((this.xGridLines == xlines) && (this.yGridLines == ylines)) {
		return;
	}

	this.xGridLines = xlines;
	this.yGridLines = ylines;

	// update gridlines

	// get corner points
	var xLeft = this.leftMargin;
	var xRight = this.width - this.rightMargin;
	var yTop = this.topMargin;
	var yBot = this.height - this.bottomMargin;

	var gw = (this.width - (this.leftMargin + this.rightMargin));
	var gh = (this.height - (this.topMargin + this.bottomMargin));

	var d, path;

	// y path
	path = document.getElementById(this.chartId + "_yGridLine");
	d = "";
	var ylines = this.yGridLines - 1;
	for (var i = 0; i < ylines; i++) {
		var y = yBot - ((gh / ylines) * (i+1));
		d += 'M ' + xLeft + ' ' + y + '  L ' + xRight + ' ' + y;
	}
	path.setAttribute("d",d);

	// x grid path
	path = document.getElementById(this.chartId + "_xGridLine");
	d = "";
	var xlines = this.xGridLines - 1;
	for (var i = 0; i < xlines; i++) {
		var x = xLeft + ((gw / xlines) * (i+1));
		d += 'M ' + x + ' ' + yTop + '  L ' + x + ' ' + yBot;
	}
	path.setAttribute("d",d);
}

// compute and set scale for chart based on current data
function Chart_updateScale()
{
	var min = 0;
	var max = 0;
	var val;

	// for stacked charts, accumulate value
	var acc = null;
	if (this.chartStyle['stacked'] && !this.independentScale) {
		// autoScale does not make sense for stacked, independent charts
		acc = new Array();
	}

	for (sno = 0; sno < this.dataSeries.length; sno++) {
		if (this.dataSeries[sno] && (this.dataSeries[sno].length > 0)) {
			for (var i = 0; i < this.dataSeries[sno].length; i++) {
				val = this.dataSeries[sno][i] * 1;
				if (acc) {
					// accumulate for stacked charts
					acc[i] = (acc[i] ? acc[i] : 0) + val;
					val = acc[i];
				}

				min = (val < min) ? val : min;
				max = (val > max) ? val : max;
			}
		}
		if (this.independentScale) {
			min = (min >= 0) ? 0 : -Chart_fitScale(-min);
			max = Chart_fitScale(max);
			if (min < 0) {
				if (-min <= max) {
					min = -max;
				}
				else {
					max = -min;
				}
			}
			this.setScale(min, max, this.scaleFactor[sno],sno);
			this.setSeries(sno,this.dataSeries[sno]);
			min = 0;
			max = 0;
		}
	}

	if (!this.independentScale) {
		min = (min >= 0) ? 0 : -Chart_fitScale(-min);
		max = Chart_fitScale(max);
		if (min < 0) {
			if (-min <= max) {
				min = -max;
			}
			else {
				max = -min;
			}
		}
		this.setScale(min, max, this.scaleFactor[0]);

		// redraw series with new scale
		for (sno = 0; sno < this.dataSeries.length; sno++) {
			this.setSeries(sno,this.dataSeries[sno]);
		}
	}
}

// set best scale to match data
function Chart_fitScale(yMax)
{
	var yscale = 1;

	if (yMax > 1) {
		var log = Math.LOG10E * Math.log(yMax);
		var f = Math.floor(log);
		if ((log - f) > .65) {
			yscale = Math.pow(10,f+1);
		}
		else if ((log - f) > .3) {
			yscale = Math.pow(10,f) * 5;
		}
		else {
			yscale = Math.pow(10,f) * 2;
		}
	}

	return yscale;
}

/// Change scale to next in series
function Chart_toggleScale()
{
	if (!this.independentScale) return;

	this.currScale++;
	if (this.currScale >= this.yMinValue.length) {
		this.currScale = 0;
	}

	this.setScale(this.yMinValue[this.currScale], this.yMaxValue[this.currScale], this.scaleFactor[this.currScale],this.currScale,true);
}

// ----
// LineChart methods

// Set a data series for this line chart
// and update the chart to show it
// sno is the series number (0 based)
// data is an array of data values
// refresh flag indicates that graphics are updated
function LineChart_setSeries(sno, data, color, refresh)
{
	if (!color) {
		color = this.colors[sno] ? this.colors[sno] : 'yellow';
	}
	if (!refresh) {
		refresh = true;
	}

	var filled = (this.chartStyle['filled']);

	if (!this.linePlot[sno]) {
		this.linePlot[sno] = document.createElementNS(SVGNS,"polyline");
		this.linePlot[sno].setAttribute("id","series_" + this.chartId + "_" + sno);
		this.linePlot[sno].setAttribute("class","Chart-Series");
		this.group.appendChild(this.linePlot[sno]);
	}

	this.dataSeries[sno] = data;
	this.colors[sno] = color;

	if (filled) {
		this.linePlot[sno].setAttribute("style","stroke: " + color + "; fill: " + color + "; fill-opacity:" + (sno == 0 ? 0.8 : 0.4) + ";");
	}
	else {
		this.linePlot[sno].setAttribute("style","stroke: " + color + ";");
	}

	if (!refresh) {
		return;
	}

	// compute points for the series
	var points = "";
	var gw = (this.width - (this.leftMargin + this.rightMargin));
	var gh = (this.height - (this.topMargin + this.bottomMargin));
	var xLeft = this.leftMargin;
	var yBot = this.height - this.bottomMargin;

	if (this.dataSeries[sno] && (this.dataSeries[sno].length > 0)) {

		var s = (!this.independentScale) ? 0 : sno;
		var ymax = (null == this.yMaxValue[s]) ? 100 : this.yMaxValue[s];
		var ymin = (null == this.yMinValue[s]) ? 0 : this.yMinValue[s];

		var dx = gw / (this.dataSeries[sno].length - 1);
		var yscale = gh / (ymax - ymin);

		if (filled) {
			points += xLeft + "," + yBot + " ";
		}

		// line chart
		for (var i = 0; i < this.dataSeries[sno].length; i++) {
			var val = this.dataSeries[sno][i] * 1;
			if (val >= ymax) {
				// clip against top range
				val = ymax;
			}
			else if (val <= ymin) {
				// clip against bottom range
				val = ymin;
			}
			points += ((i * dx) + xLeft) + "," + (yBot - ((val-ymin) * yscale)) + " ";
		}

		if (filled) {
			points += (this.width - this.rightMargin) + "," + yBot + " ";
		}
	}

	this.linePlot[sno].setAttribute("points",points);
}

// ----
// BarChart methods

// Set a data series for this bar chart
// and update the chart to show it
// sno is the series number (0 based)
// data is an array of data values
function BarChart_setSeries(sno, data, color,refresh)
{
	if (!color) {
		color = this.colors[sno] ? this.colors[sno] : 'yellow';
	}
	if (!refresh) {
		refresh = true;
	}

	var stacked = (this.chartStyle['stacked']);

	// find out previous size of series
	var oldsize = this.dataSeries[sno] ? this.dataSeries[sno].length : 0;

	// assign new series
	this.dataSeries[sno] = data;
	this.colors[sno] = color;

	var id = this.chartId;
	var group = document.getElementById(id + "_BarChartGroup");

	// if number of bars has changed, clear out the old bars
	if ((!data) || (data.length == 0) || (data.length != oldsize)) {
		// remove existing bars
		for (var i = 0; i < oldsize; i++) {
			var bar = document.getElementById(id + "_Bars_" + sno + "_" + i);
			if (bar) {
				group.removeChild(bar);
			}
		}

		// create new bars
		if (this.dataSeries[sno] && (this.dataSeries[sno].length > 0)) {
			// create bars for this series
			for (var i = 0; i < this.dataSeries[sno].length; i++) {
				var bar = document.createElementNS(SVGNS,"rect");
				bar.setAttribute("id",id + "_Bars_" + sno + "_" + i);
				bar.setAttribute("class","Chart-Bars");
				bar.setAttribute("style","fill: " + this.colors[sno] + "; stroke: " + this.colors[sno] + ";");
				group.appendChild(bar);
			}
		}
	}

	if (!refresh) {
		return;
	}

	// compute points for the series
	var points = "";
	var gw = (this.width - (this.leftMargin + this.rightMargin));
	var gh = (this.height - (this.topMargin + this.bottomMargin));
	var xLeft = this.leftMargin;
	var yBot = this.height - this.bottomMargin;
	var x,y,hgt,wid,val;
	var scount = this.dataSeries.length; // # of series

	// find largest series
	var maxsize = 1;
	for (var series = 0; series < scount; series++) {
		if (this.dataSeries[series]) {
			maxsize = (this.dataSeries[series].length > maxsize) ? this.dataSeries[series].length : maxsize;
		}
	}

	// now set the position of all bars for all series
	for (var series = 0; series < scount; series++) {

		var s = (!this.independentScale) ? 0 : series;
		var ymax = this.yMaxValue[s];
		var ymin = this.yMinValue[s];

		var dx = gw / (maxsize);
		var yscale = gh / (ymax - ymin);
		if (stacked) {
			wid = (dx * 0.8);
		}
		else {
			if (1 == scount) {
				wid = (dx * 0.8);
			}
			else {
				wid = dx / (scount + 1);
			}
		}

		if (this.dataSeries[series] && (this.dataSeries[series].length > 0)) {

			// create bars
			for (var i = 0; i < this.dataSeries[series].length; i++) {

				var lval = ymin;
				if (stacked) {
					val = 0;
					for (s = 0; s <= series; s++) {
						val += (this.dataSeries[s][i] == null) ? 0 : (this.dataSeries[s][i] * 1);
						if (s == (series - 1)) {
							lval = val;
						}
					}
				}
				else {
					val = (this.dataSeries[series][i] * 1);
				}

				if (val >= ymax) {
					// clip against top range
					val = ymax;
				}
				else if (val <= ymin) {
					// clip against bottom range
					val = ymin;
				}

				if (stacked) {
					x = ((i * dx) + xLeft);
					y = (yBot - ((val-ymin) * yscale));
					var ly = (yBot - ((lval-ymin) * yscale));
					hgt = ly - y;
				}
				else {
					x = ((i * dx) + xLeft) + (series * wid);
					y = (yBot - ((val-ymin) * yscale));
					hgt = yBot - y;
				}

				var bar = document.getElementById(id + "_Bars_" + series + "_" + i);
				bar.setAttribute("x",x);
				bar.setAttribute("y",y);
				bar.setAttribute("width",wid);
				bar.setAttribute("height",hgt);
			}
		}
	}
}

// ----
// PieChart methods

// Set a data series for this pie chart
// and update the chart to show it
// sno is the series number (0 based)
// data is an array of data values
function PieChart_setSeries(sno, data, color,refresh)
{
	if (sno != 0) return; // !!!

	// default colors
	var colorArray = new Array("#00ff00",
                             "yellow",
                             "#cc0066",
                             "#3399CC",
                             "#cc99ff",
                             "#ff9999",
                             "#00cc99",
                             "#ff33cc",
                             "#ccff00",
                             "#33cccc",
                             "#ccccff");

	var numColors = colorArray.length;

	if (!refresh) {
		refresh = true;
	}

	// find out previous size of series
	var oldsize = this.dataSeries[sno] ? this.dataSeries[sno].length : 0;

	// assign new series
	this.dataSeries[sno] = data;
	this.colors[sno] = color;

	var id = this.chartId;
	var group = document.getElementById(id + "_PieChartGroup");

	// find size of pie (ignore margins)
	var gw = (this.width * 0.60);
	var gh = (this.height * 0.75);
	var sz = (gw > gh) ? gh/2 : gw/2;
	var cx = this.width / 2;
	var cy = this.height / 2;

	group.setAttribute("transform","translate(" + cx + "," + cy + ")");

	// if number of slices has changed, clear out the old slices
	if ((!data) || (data.length == 0) || (data.length != oldsize)) {
		var circ = document.getElementById(id + "_Circle");
		if (circ) {
			group.removeChild(circ);
		}

		// remove existing slices
		for (var i = 0; i < oldsize; i++) {
			var slice = document.getElementById(id + "_Slices_" + sno + "_" + i);
			if (slice) {
				group.removeChild(slice);
			}
			// label line
			var line = document.getElementById(id + "_LblLines_" + sno + "_" + i);
			if (line) {
				group.removeChild(line);
			}
			// label
			var text = document.getElementById(id + "_Label_" + sno + "_" + i);
			if (text) {
				group.removeChild(text);
			}
		}

		// create new slices & labels
		if (this.dataSeries[sno] && (this.dataSeries[sno].length > 0)) {

			// labels
			for (var i = 0; i < this.dataSeries[sno].length; i++) {
				// line
				var line = document.createElementNS(SVGNS,"polyline");
				line.setAttribute("id",id + "_LblLines_" + sno + "_" + i);
				group.appendChild(line);

				// label
				var text = document.createElementNS(SVGNS,"text");
				text.setAttribute("id",id + "_Label_" + sno + "_" + i);
				text.setAttribute("class","Chart-yLabel");

				var textNode = document.createTextNode((this.xLabels && this.xLabels[i]) ? this.xLabels[i].substr(0,8) : i);
				text.appendChild(textNode);
				group.appendChild(text);
			}

			// circle in the middle?
			var circ = document.createElementNS(SVGNS,"circle");
			circ.setAttribute("id",id + "_Circle");
			circ.setAttribute("cx",0);
			circ.setAttribute("cy",0);
			circ.setAttribute("r",sz);
			circ.setAttribute("style","stroke: none; fill: darkblue; opacity: 1.0;");
			group.appendChild(circ);

			// slice
			for (var i = 0; i < this.dataSeries[sno].length; i++) {
				var slice = document.createElementNS(SVGNS,"path");
				slice.setAttribute("id",id + "_Slices_" + sno + "_" + i);
				group.appendChild(slice);
			}
		}
	}

	if (!refresh) {
		return;
	}

	// compute size of slices
	// only look at series 0

	// find total value series
	var total = 0;
	if (this.dataSeries[sno]) {
		for (var i = 0; i < this.dataSeries[sno].length; i++) {
			total += (this.dataSeries[sno][i] == null || this.dataSeries[sno][i] < 0) ? 0 : (this.dataSeries[sno][i] * 1);
		}

		// now set the position of all slices for this series
		var value, curr;
		var last = 0;
		var lastcurr = 0;
		var dcount = this.dataSeries[sno].length;

		// test for use of default colors
		var useSeriesColors = false;
		if (this.meter && this.meter.seriesColor && this.meter.xDimension == 'series') {
			useSeriesColors = true;
		}

		for (var i = 0; i < dcount; i++) {
			var clr = (useSeriesColors && this.meter.seriesColor[i] && this.meter.seriesColor[i] != '') ? this.meter.seriesColor[i] : colorArray[i%numColors];

			value = (this.dataSeries[sno][i] == null || this.dataSeries[sno][i] < 0) ? 0 : (this.dataSeries[sno][i] * 1);
			curr = (total == 0) ? 0 : (value / total);
			var slice = document.getElementById(id + "_Slices_" + sno + "_" + i);

			var path = "M0,0 L"
			path += (sz * Math.sin(last * Math.PI * 2)) + "," + (sz * Math.cos(last * Math.PI * 2));
			if (curr >= 0.5) {
				path += " A" + sz + " " + sz + " 1 1 0 " + (sz * Math.sin((last + curr) * Math.PI * 2)) + "," + (sz * Math.cos((last + curr) * Math.PI * 2));
			}
			else {
				path += " A" + sz + " " + sz + " 0 0 0 " + (sz * Math.sin((last + curr) * Math.PI * 2)) + "," + (sz * Math.cos((last + curr) * Math.PI * 2));
			}
			path += " z";
			slice.setAttribute("d",path);
			slice.setAttribute("style","stroke-width: 0.33; fill-opacity: 0.9; stroke: " + 'gray' + "; fill: " + clr + ";");

			// label lines
			var line = document.getElementById(id + "_LblLines_" + sno + "_" + i);
			var sin = Math.sin((last + curr/2) * Math.PI * 2);
			var cos = Math.cos((last + curr/2) * Math.PI * 2);
			var f1 = (sin*sin < 0.1) && (cos > 0) ? (1.3 - (sin*sin)) : 1.1;
			var x1 = sz * f1 * sin;
			var y1 = sz * f1 * cos;
			var f2 = ((lastcurr+curr) > 0.1) ? 0.9 : 0.9 - (i%3 * 0.1);  // stagger
			var x2 = (x1 < 0) ? -(f2*this.width/2) : (f2*this.width/2);

			var points = 0 + "," + 0 + " " + x1 + "," + y1 + " " + x2 + "," + y1;
			line.setAttribute("points",points);

			// label
			var text = document.getElementById(id + "_Label_" + sno + "_" + i);
			text.setAttribute("text-anchor",(x1 < 0) ? "start" : "end");
			text.setAttribute("x", x2);
			text.setAttribute("y", y1-0.5);

			if (i > 0 && dcount > 5 && (lastcurr+curr) < 0.01) {
				text.setAttribute("style","display: none;");
				line.setAttribute("style","display: none;");
			}
			else {
				text.setAttribute("style","fill: " + clr + ";");
				line.setAttribute("style","stroke-width: 0.5px; opacity: 0.7; stroke: " + clr + "; fill: none;");
			}

			// move to next slot
			last += curr;
			lastcurr = curr;
		}
	}
}

// x-axis labels for pie chart
// labels is an array of label values
function PieChart_setXLabels(labels)
{
	// find out previous size of label
	var oldsize = this.xLabels ? this.xLabels.length : 0;

	// see if there is any change in the labels
	if (labels) {
		if (labels.length == oldsize) {
			var equal = true;
			for (var i = 0; i < oldsize; i++) {
				if (labels[i] != this.xLabels[i]) {
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

	// assign new labels
	this.xLabels = labels;

	// don't render-- this will be done elsewhere
}
