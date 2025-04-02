/*
	skin_contemporary.js
	Function for "Contemporary" color scheme
	Copyright (c) 2009 InterSystems Corp. ALL RIGHTS RESERVED.
*/

/* frame */
function _ZEN_SVGComponent_svgFrame__PostInit(obj)
{
	obj.backgroundStyle = 'fill: #4080A0;opacity:0.75;';
}

/* common post init function for charts */
function _chart__PostInit(obj)
{
	obj.seriesColors= '#C15A00,#00C15A,#5A00C1,#5ADDC1,#DDC15A,#C15ADD';
	obj.backgroundStyle = 'fill: #E5CC34;';
	obj.plotAreaStyle = 'fill: white; stroke: none;';
	obj.plotStyle = 'stroke-width: 1px;';
	obj.gridStyle = 'stroke: #DBDBDB; stroke-width: 0.3px;';
	obj.stripesVisible = true;
	obj.stripeStyle = 'fill: #E5CC34; opacity:0.2;';
	obj.axisLineStyle = 'stroke: #404040;';
	obj.axisTitleStyle = 'fill: black;opacity:0.5;';
	obj.labelStyle = 'fill: #404040;';
	obj.markerStyle = 'fill: none;';
	obj.titleStyle = 'fill: white; font-family: times new roman;font-size:14pt;';
	obj.titleBoxStyle = 'fill: #7C3577; opacity: 0.2;';
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
	obj.labelStyle = 'fill: #7C3577;font-size:6pt;';
}

function _ZEN_SVGComponent_speedometer__PostInit(obj)
{
	_ZEN_SVGComponent_meter__PostInit(obj);
	obj.thinNeedle = true;
	obj.nubStyle = 'fill:white; stroke:black;';
	obj.needleStyle = 'fill:white; stroke:black;';

	obj.outerCircleStyle = 'fill: #7C3577; opacity: 1.0;';
	obj.midCircleStyle = 'fill:#E5CC34; stroke:none;opacity:1.0;';
	obj.innerCircleStyle = 'fill:none; stroke:none; opacity:1.0;';

	obj.ringStyle = 'fill:none; stroke:none;';

	obj.highRangeStyle = 'opacity:0.3;';
	obj.separatorStyle = 'opacity:0.5; stroke: white;';
	obj.valueLabelStyle = 'fill: white;';

	obj.odometerBoxStyle = 'fill: black; stroke: white;';
	obj.odometerTextStyle = 'fill: white;';
}

function _DeepSee_Component_SVG_scoreCard__PostInit(obj)
{
	obj.arrowStyle = 'fill: #7C3577;';
	obj.lampColor = '#8888F0';
	obj.lampColorNeg = '#F08888';
	obj.titleStyle = 'fill: #7C3577;';
	obj.columnHeaderStyle = 'fill: #7C3577;';

	obj.stripeStyle = 'fill: #E5CC34;';
	obj.trendLineStyle = 'stroke: #7C3577;';
	obj.plotBoxValueStyle = 'fill: #7C3577;';
	obj.plotBoxValueStyleNeg = 'fill: #DD3577;';
}

function _ZEN_SVGComponent_fuelGauge__PostInit(obj)
{
	_ZEN_SVGComponent_meter__PostInit(obj);
	obj.outerBodyStyle = 'fill: #7C3577; opacity: 1.0; stroke-width:0.5px; stroke:black;';
	obj.panelStyle = 'fill: #6C2567; opacity: 1.0; stroke-width:0.5px; stroke:black;';
	obj.logo= 'DeepSee';

	obj.needleStyle = 'fill:none; stroke:white;';
	obj.levelBoxStyle = 'fill: black; stroke: white;';
	obj.levelTextStyle = 'fill: white;';
}

function _ZEN_SVGComponent_lightBar__PostInit(obj)
{
	_ZEN_SVGComponent_meter__PostInit(obj);
	obj.outerBodyStyle = 'fill: #7C3577; opacity: 1.0; stroke-width:0.5px; stroke:black;';
}

function _ZEN_SVGComponent_trafficLight__PostInit(obj)
{
	_ZEN_SVGComponent_meter__PostInit(obj);
	obj.outerBodyStyle = 'fill: #7C3577; opacity: 1.0; stroke-width:0.5px; stroke:black;';
}

function _ZEN_SVGComponent_smiley__PostInit(obj)
{
	_ZEN_SVGComponent_meter__PostInit(obj);
}