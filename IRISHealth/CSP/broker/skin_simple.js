/*
	skin_simple.js
	Function for "Simple" color scheme
	Copyright (c) 2009 InterSystems Corp. ALL RIGHTS RESERVED.
*/


/* frame */
function _ZEN_SVGComponent_svgFrame__PostInit(obj)
{
	obj.backgroundStyle = 'fill: #F0F0F0;';
	obj.setProperty('frameStyle','border: #D0D0D0 1px solid;');
}

/* search form for dashboards */
function _ZEN_Component_form__PostInit(obj)
{
	if (obj.id == 'dashboardForm') {
		obj.setProperty('enclosingStyle','background: #F0F0FF;');
	}
}

/* page for dashboards */
function _DeepSee_UI_Dashboard__PostInit(obj)
{
	obj.setProperty('enclosingStyle','background: #F0F0FF;');
}

/* common post init function for charts */
function _chart__PostInit(obj)
{
	obj.backgroundStyle = 'fill: white; stroke: none;';
	obj.plotAreaStyle = 'fill: white; stroke: none;';
	obj.autoScaleText = false;

	obj.markerStyle = 'fill: white;';
	obj.marginTop = '';
	obj.marginRight = '';
	obj.marginBottom = '';
	obj.marginLeft = '';
}

function _ZEN_SVGComponent_comboChart__PostInit(obj)
{
	_chart__PostInit(obj);
}

function _ZEN_SVGComponent_bubbleChart__PostInit(obj)
{
	_chart__PostInit(obj);
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
}

function _ZEN_SVGComponent_meter__PostInit(obj)
{
	obj.labelStyle = 'fill: #404080; font-size:6pt;';
}

function _ZEN_SVGComponent_speedometer__PostInit(obj)
{
	_ZEN_SVGComponent_meter__PostInit(obj);
	obj.valueLabelStyle = 'fill: #404040;';
	obj.odometerTextStyle = 'fill: #404040;';
}

function _ZEN_SVGComponent_fuelGauge__PostInit(obj)
{
	_ZEN_SVGComponent_meter__PostInit(obj);
	obj.outerBodyStyle = 'fill: url(#fuelGauge-blueGrad); font-size:6pt;';
	obj.panelStyle = 'fill: url(#fuelGauge-blueGrad); font-size:6pt;';
	obj.logo= 'DeepSee';
}

function _ZEN_SVGComponent_lightBar__PostInit(obj)
{
	_ZEN_SVGComponent_meter__PostInit(obj);
	obj.outerBodyStyle = 'fill: url(#fuelGauge-blueGrad); font-size:6pt;';
}

function _ZEN_SVGComponent_trafficLight__PostInit(obj)
{
	_ZEN_SVGComponent_meter__PostInit(obj);
	obj.outerBodyStyle = 'fill: url(#fuelGauge-blueGrad); font-size:6pt;';
}

function _ZEN_SVGComponent_smiley__PostInit(obj)
{
	_ZEN_SVGComponent_meter__PostInit(obj);
}

function _ZEN_SVGComponent_textMeter__PostInit(obj)
{
	obj.backgroundStyle = 'fill: white;';
}
