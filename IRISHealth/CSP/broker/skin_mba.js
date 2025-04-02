/*
	skin_mba.js
	Function for "MBA" color scheme
	Copyright (c) 2009 InterSystems Corp. ALL RIGHTS RESERVED.
*/


/* frame */
function _ZEN_SVGComponent_svgFrame__PostInit(obj)
{
	obj.backgroundStyle = 'fill: url(#bg-chrome);';
	obj.setProperty('frameStyle','border: #8080F0 1px solid;');
}

/* common post init function for charts */
function _chart__PostInit(obj)
{
	obj.backgroundStyle = 'fill: url(#bg-chrome);';
	obj.autoScaleText = false;
	obj.seriesColorScheme = 'bright';

	obj.titleStyle = 'fill: #606060; font-size:14pt;';
}

function _ZEN_SVGComponent_comboChart__PostInit(obj)
{
	_chart__PostInit(obj);
}

function _ZEN_SVGComponent_bubbleChart__PostInit(obj)
{
	_chart__PostInit(obj);
	obj.plotStyle = 'stroke-width: 0.25px;';
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
	obj.pieScale = 0.70;
}

function _ZEN_SVGComponent_meter__PostInit(obj)
{
	obj.labelStyle = 'fill: #404040;font-size:6pt;';
}

function _ZEN_SVGComponent_speedometer__PostInit(obj)
{
	_ZEN_SVGComponent_meter__PostInit(obj);
	obj.thinNeedle = false;

	obj.outerCircleStyle = 'opacity: 0.8;';
	obj.midCircleStyle = 'fill:none; stroke:none;';
	obj.innerCircleStyle = 'fill:#C0C0EE; stroke:gray; opacity:1.0;';

	obj.ringStyle = 'fill:#8080D0; stroke:gray; stroke-width:0.5';

	obj.highRangeStyle = 'opacity:0.3;';
	obj.separatorStyle = 'opacity:0.5;';
	obj.valueLabelStyle = 'fill: #1B4357;';
}

function _DeepSee_Component_SVG_scoreCard__PostInit(obj)
{
	obj.arrowStyle = 'fill: #FF6666';
	obj.lampColor = '#88FF88';
	obj.lampColorNeg = '#FF8888';
	obj.titleStyle = 'fill: #6666AA;';

	obj.stripeStyle = 'fill: #6666AA;';
	obj.trendLineStyle = 'stroke: #6666AA;';
	obj.plotBoxValueStyle = 'fill: url(#glow-blue);';
	obj.plotBoxValueStyleNeg = 'fill: url(#glow-red);';
}

function _ZEN_SVGComponent_fuelGauge__PostInit(obj)
{
	_ZEN_SVGComponent_meter__PostInit(obj);
	obj.outerBodyStyle = 'fill: url(#fuelGauge-blueGrad); stroke:#404040; stroke-width:0.5px;';
	obj.panelStyle = 'fill: url(#fuelGauge-blueGrad); stroke:#404040; stroke-width:0.5px;';
	obj.logo= 'DeepSee';

	obj.needleStyle = 'stroke:#808080; fill:none;';
	obj.levelBoxStyle = 'fill: #F0F0FF; stroke: gray;';
	obj.levelTextStyle = 'fill: #404040;';
}

function _ZEN_SVGComponent_lightBar__PostInit(obj)
{
	_ZEN_SVGComponent_meter__PostInit(obj);
	obj.outerBodyStyle = 'fill: url(#fuelGauge-blueGrad); stroke:#404040; stroke-width:0.5px;';
}

function _ZEN_SVGComponent_trafficLight__PostInit(obj)
{
	_ZEN_SVGComponent_meter__PostInit(obj);
	obj.outerBodyStyle = 'fill: url(#fuelGauge-blueGrad); stroke:#404040; stroke-width:0.5px;';
}

function _ZEN_SVGComponent_smiley__PostInit(obj)
{
	_ZEN_SVGComponent_meter__PostInit(obj);
}