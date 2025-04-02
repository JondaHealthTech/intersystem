/*
	skin_roswell.js
	Function for "Roswell" color scheme
	Copyright (c) 2009 InterSystems Corp. ALL RIGHTS RESERVED.
*/

/* frame */
function _ZEN_SVGComponent_svgFrame__PostInit(obj)
{
	obj.backgroundStyle = 'fill: #404040;opacity:1.0;';
}

/* common post init function for charts */
function _chart__PostInit(obj)
{
	obj.seriesColors= '#A15A00,#00A15A,#5A00A1,#815A40,#00815A,#5A0081';
	obj.backgroundStyle = 'fill: black;';
	obj.borderStyle = 'stroke: green; fill:#205020;';
	obj.plotAreaStyle = 'fill: black; stroke: none;';
	obj.plotStyle = 'stroke-width: 1px;';
	obj.gridStyle = 'stroke: #20AB20; stroke-width: 0.1px;';
	obj.stripesVisible = true;
	obj.stripeStyle = 'fill: #008000; opacity:0.2;';
	obj.axisLineStyle = 'stroke: #40A040;';
	obj.titleStyle = 'fill: #F04040; font-family: arial; font-weight: bold; font-size: 12pt;';
	obj.labelStyle = 'fill: #80F080;';
	obj.markerStyle = 'fill: darkred;';
	obj.titleBoxStyle = 'fill: #004030;';
	obj.titleBoxStyle = 'fill: url(#title-black);opacity:0.3;';
	obj.axisTitleStyle = 'fill: yellow;opacity:0.5;';
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
	obj.plotStyle = 'opacity:0.75;stroke-width: 0.25px;';
	obj.stripesVisible = false;
	obj.plotAreaStyle = 'fill: #408040; stroke: none;';
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
	obj.labelStyle = 'fill: #80F080;';
}

function _ZEN_SVGComponent_meter__PostInit(obj)
{
	obj.labelStyle = 'fill: #408040; font-size:6pt;';
}

function _ZEN_SVGComponent_speedometer__PostInit(obj)
{
	_ZEN_SVGComponent_meter__PostInit(obj);
	obj.thinNeedle = false;
	obj.nubStyle = 'fill:#408040; stroke:black;';
	obj.needleStyle = 'fill:#80F080; stroke:black;';

	obj.outerCircleStyle = 'fill: #202020; opacity: 1.0; stroke-width:1px; stroke:#408040;';
	obj.midCircleStyle = 'fill:#80F080; stroke:none;opacity:0.3;';
	obj.innerCircleStyle = 'fill:none; stroke:none; opacity:1.0;';

	obj.ringStyle = 'fill:none; stroke:none;';

	obj.highRangeStyle = 'opacity:0.3;';
	obj.separatorStyle = 'opacity:0.5; stroke: darkgray;';
	obj.valueLabelStyle = 'fill: #60F060;';

	obj.odometerBoxStyle = 'fill: #202020; stroke: #40C040;';
	obj.odometerTextStyle = 'fill: #60F060;';
}


function _ZEN_SVGComponent_fuelGauge__PostInit(obj)
{
	_ZEN_SVGComponent_meter__PostInit(obj);

	obj.outerBodyStyle = 'fill: #202020; opacity: 1.0; stroke-width:1px; stroke:#408040;';
	obj.panelStyle = 'fill:#208020; stroke:none;opacity:0.3;';
	obj.needleStyle = 'stroke:#80F080; fill:none;';

	obj.levelBoxStyle = 'fill: #202020; stroke: #40C040; stroke-opacity:0.3;';
	obj.levelTextStyle = 'fill: #60F060;';

	obj.logo = 'DeepSee';
	obj.logoStyle = 'fill: #204020;font-family:courier new;';
}

function _ZEN_SVGComponent_lightBar__PostInit(obj)
{
	_ZEN_SVGComponent_meter__PostInit(obj);
	obj.outerBodyStyle = 'fill: #202020; opacity: 1.0; stroke-width:1px; stroke:#408040;';
}

function _ZEN_SVGComponent_trafficLight__PostInit(obj)
{
	_ZEN_SVGComponent_meter__PostInit(obj);
	obj.outerBodyStyle = 'fill: #202020; opacity: 1.0; stroke-width:1px; stroke:#408040;';
}

function _ZEN_SVGComponent_smiley__PostInit(obj)
{
	_ZEN_SVGComponent_meter__PostInit(obj);
	obj.persona = 'alien';
}

function _ZEN_SVGComponent_textMeter__PostInit(obj)
{
	obj.backgroundStyle = 'fill: #202020;';
	obj.lowStyle = 'fill: #D04040;';
	obj.highStyle = 'fill: #4040D0;';
	obj.normalStyle = 'fill: #40D040;';
}

function _DeepSee_Component_SVG_scoreCard__PostInit(obj)
{
	obj.backgroundStyle = 'fill: #A0A0A0;';
	obj.arrowStyle = 'fill: #208040';
	obj.lampColor = '#208040';
	obj.lampColorNeg = '#802040';
	obj.titleStyle = 'fill: #404040;';
	obj.columnHeaderStyle = 'fill: #404080;';

	obj.stripeStyle = 'fill: #202020;';
	obj.trendLineStyle = 'stroke: #6666AA;';
	obj.plotBoxValueStyle = 'fill: #404080;';
	obj.plotBoxValueStyleNeg = 'fill: #802040;';
}
