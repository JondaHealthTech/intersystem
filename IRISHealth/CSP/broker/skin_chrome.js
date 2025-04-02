/*
	skin_chrome.js
	Function for "Chrome" color scheme
	Copyright (c) 2009 InterSystems Corp. ALL RIGHTS RESERVED.
*/


/* frame */
function _ZEN_SVGComponent_svgFrame__PostInit(obj)
{
	obj.backgroundStyle = 'fill: #F0F0F0;';
	obj.setProperty('frameStyle','border: none;border-bottom: 1px solid darkgray;');
}

/* page for dashboards */
function _DeepSee_UI_Dashboard__PostInit(obj)
{
	obj.setProperty('enclosingStyle','background: #C0C0C0;');
}

/* search form for dashboards */
function _ZEN_Component_form__PostInit(obj)
{
	if (obj.id == 'dashboardForm') {
		obj.setProperty('enclosingStyle','background: #C0C0C0;');
	}
}

/* pivot table */
function _DeepSee_Component_svgPivotTable__PostInit(obj)
{
	obj.borderRadius = 5;
	obj.titleStyle = 'fill: #404040; font-weight: bold; font-size: 3.5pt;';
	obj.backgroundStyle = 'fill: url(#bg-chrome);';
	obj.headerAreaStyle = 'fill: none; opacity:0.1;';
	obj.stripeStyle = 'fill: #F3F3F3;';
}

/* common post init function for charts */
function _chart__PostInit(obj)
{
	obj.seriesColors= '#5BABAF,#8BAF5B,#AF5BAB,#FFA0A0,#A0FFA0,#A0A0FF';
	obj.backgroundStyle = 'fill: url(#bg-chrome);';
	obj.borderRadius = 0;
	obj.plotAreaStyle = 'fill: white; stroke: gray;';
	obj.plotStyle = 'stroke-width: 0.5px;';
	obj.gridStyle = 'stroke: none;';
	obj.axisLineStyle = 'stroke: black; stroke-width: 0.5px;';
	obj.titleStyle = 'fill: #606060; font-weight: bold; font-size: 12pt;';
	obj.axisTitleStyle = 'fill: black;opacity:0.5;';
	obj.labelStyle = 'fill: black;';
	obj.markerStyle = 'fill: none;';
	obj.stripesVisible = true;
	obj.stripeStyle = '#F3F3F3';
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
	obj.plotAreaStyle = 'fill: white; stroke: none;';
}

function _ZEN_SVGComponent_meter__PostInit(obj)
{
	obj.labelStyle = 'fill: #5BABAF;font-size:6pt;';
}

function _ZEN_SVGComponent_speedometer__PostInit(obj)
{
	_ZEN_SVGComponent_meter__PostInit(obj);

	obj.thinNeedle = true;
	obj.nubStyle = 'fill:#808080; stroke:black;';
	obj.needleStyle = 'fill:#808080; stroke:black;';

	obj.outerCircleStyle = 'fill: white; opacity: 1.0; stroke-width:1px; stroke:gray;';
	obj.midCircleStyle = 'fill:#F0F0F0; stroke:none;opacity:1.0;';
	obj.innerCircleStyle = 'fill:none; stroke:none; opacity:1.0;';

	obj.ringStyle = 'fill:none; stroke:none;';

	obj.highRangeStyle = 'opacity:0.3;';
	obj.separatorStyle = 'opacity:0.5; stroke: darkgray;';
	obj.valueLabelStyle = 'fill: #202020;';

	obj.odometerBoxStyle = 'fill: #F0F0F0; stroke: gray;';
	obj.odometerTextStyle = 'fill: #5BABAF;';
}

function _DeepSee_Component_SVG_scoreCard__PostInit(obj)
{
	obj.arrowStyle = 'fill: rgb(53,107,141);';
	obj.lampColor = '#80D080';
	obj.lampColorNeg = '#F0A0A0';
	obj.titleStyle = 'fill: #404040;';
	obj.columnHeaderStyle = 'fill: #606060;';

	obj.stripeStyle = 'fill: #808080;';
	obj.trendLineStyle = 'stroke: #606060;';
}

function _ZEN_SVGComponent_fuelGauge__PostInit(obj)
{
	_ZEN_SVGComponent_meter__PostInit(obj);
	obj.outerBodyStyle = 'fill: white; opacity: 1.0; stroke-width:1px; stroke:gray;';
	obj.panelStyle = 'fill: #F0F0F0; opacity: 1.0; stroke-width:1px; stroke:gray;';
	obj.logo= 'DeepSee';

	obj.needleStyle = 'stroke:#808080; fill:none;';
	obj.levelBoxStyle = 'fill: #F0F0F0; stroke: gray;';
	obj.levelTextStyle = 'fill: #5BABAF;';
}

function _ZEN_SVGComponent_lightBar__PostInit(obj)
{
	_ZEN_SVGComponent_meter__PostInit(obj);
	obj.outerBodyStyle = 'fill: white; opacity: 1.0; stroke-width:1px; stroke:gray;';
}

function _ZEN_SVGComponent_trafficLight__PostInit(obj)
{
	_ZEN_SVGComponent_meter__PostInit(obj);
	obj.outerBodyStyle = 'fill: white; opacity: 1.0; stroke-width:1px; stroke:gray;';
}

function _ZEN_SVGComponent_smiley__PostInit(obj)
{
	_ZEN_SVGComponent_meter__PostInit(obj);
}