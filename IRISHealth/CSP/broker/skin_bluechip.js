/*
	skin_bluechip.js
	Function for "BlueChip" color scheme
	Copyright (c) 2009 InterSystems Corp. ALL RIGHTS RESERVED.
*/


/* frame */
function _ZEN_SVGComponent_svgFrame__PostInit(obj)
{
	obj.backgroundStyle = 'fill: #F0F0FF;';
}

/* common post init function for charts */
function _chart__PostInit(obj)
{
	obj.stripesVisible = true;
	obj.seriesColors= '#DE4E00,#5B8CAE,#5BA23C,#D9D93A,#3AD9D9,#D93AD9';
	obj.backgroundStyle = 'fill: rgb(9,89,156);';
	obj.borderStyle = 'stroke: white; fill: rgb(209,232,243);';
	obj.plotAreaStyle = 'fill: white; stroke: none;';
	obj.plotStyle = 'stroke-width: 0.5px;';
	obj.gridStyle = 'stroke: #DFDFDF; stroke-width:0.5px;';
	obj.titleStyle = 'fill: rgb(9,89,156); font-weight: bold; font-size:12pt;';
	obj.labelStyle = 'fill: #808080;';
	obj.axisTitleStyle = 'fill: #404040;opacity:0.5;';
	obj.markerStyle = 'fill: none;';
	obj.autoScaleText = false;
}

function _ZEN_SVGComponent_comboChart__PostInit(obj)
{
	_chart__PostInit(obj);
}

function _ZEN_SVGComponent_bubbleChart__PostInit(obj)
{
	_chart__PostInit(obj);
	obj.plotStyle = 'stroke-width: 0.25px;';
	obj.stripesVisible = false;
	obj.markerStyle = '';
}

function _ZEN_SVGComponent_barChart__PostInit(obj)
{
	_chart__PostInit(obj);
}

function _ZEN_SVGComponent_lineChart__PostInit(obj)
{
	_chart__PostInit(obj);
	obj.selectedItemStyle = 'fill: none;stroke:black;';
}

function _ZEN_SVGComponent_xyChart__PostInit(obj)
{
	_chart__PostInit(obj);
}

function _ZEN_SVGComponent_hilowChart__PostInit(obj)
{
	_chart__PostInit(obj);
}

function _ZEN_SVGComponent_pieChart__PostInit(obj)
{
	_chart__PostInit(obj);
	obj.plotStyle = '';
	obj.labelStyle = 'fill: #202020;';
	obj.pieScale = 0.75;
}

function _ZEN_SVGComponent_meter__PostInit(obj)
{
	obj.labelStyle = 'fill: #1B4357;font-size:6pt;';
}

function _ZEN_SVGComponent_speedometer__PostInit(obj)
{
	_ZEN_SVGComponent_meter__PostInit(obj);
	obj.thinNeedle = false;
	obj.nubStyle = 'fill:red; stroke:black;';

	obj.outerCircleStyle = 'opacity: 0.8;';
	obj.midCircleStyle = 'fill:none; stroke:none;';
	obj.innerCircleStyle = 'fill:white; stroke:none; opacity:1.0;';

	obj.ringStyle = 'fill:#8080D0; stroke:gray;';

	obj.highRangeStyle = 'opacity:0.3;';
	obj.separatorStyle = 'opacity:0.5;';
	obj.valueLabelStyle = 'fill: #1B4357;';

	obj.odometerBoxStyle = 'opacity:1.0; fill: black; stroke: white;';
	obj.odometerTextStyle = 'fill: white;';
}

function _DeepSee_Component_SVG_scoreCard__PostInit(obj)
{
	obj.arrowStyle = 'fill: #6666FF';
	obj.lampColor = '#8888F0';
	obj.lampColorNeg = '#F08888';
	obj.titleStyle = 'fill: rgb(9,89,156);';
	obj.columnHeaderStyle = 'fill: rgb(9,89,156);';

	obj.stripeStyle = 'fill: rgb(9,89,156);';
	obj.trendLineStyle = 'stroke: rgb(9,89,156);';
	obj.plotBoxValueStyle = 'fill: rgb(9,89,156);';
	obj.plotBoxValueStyleNeg = 'fill: rgb(156,89,9);';
}

function _ZEN_SVGComponent_fuelGauge__PostInit(obj)
{
	_ZEN_SVGComponent_meter__PostInit(obj);
	obj.outerBodyStyle = 'fill: url(#fuelGauge-blueGrad);';
	obj.panelStyle = 'fill: url(#fuelGauge-blueGrad);';
	obj.logo= 'DeepSee';

	obj.levelBoxStyle = 'opacity:1.0; fill: black; stroke: white;';
	obj.levelTextStyle = 'fill: white;';
}

function _ZEN_SVGComponent_lightBar__PostInit(obj)
{
	_ZEN_SVGComponent_meter__PostInit(obj);
	obj.outerBodyStyle = 'fill: url(#fuelGauge-blueGrad);';
}

function _ZEN_SVGComponent_trafficLight__PostInit(obj)
{
	_ZEN_SVGComponent_meter__PostInit(obj);
	obj.outerBodyStyle = 'fill: url(#fuelGauge-blueGrad);';
}

function _ZEN_SVGComponent_smiley__PostInit(obj)
{
	_ZEN_SVGComponent_meter__PostInit(obj);
}