/*
	ensrules.js

	Copyright (c) 2009, InterSystems Corp.
	ALL RIGHTS RESERVED

	Additional JS for Rules Editor

	!!!
	- remove old HTML logic etc.

*/


// used to test if file is included.
var ensrules_js = 2;

/// client-side rules objects
function RuleSet(host,name,ro,defval,desc,context)
{
	this._type = 'RuleSet';
	this.children = new Array();
	this.host = host;
	this.name = name;
	this.context = context;
	this.readOnly = ro;
	this.description = desc;
	this.defaultValue = defval;
	this.defaultValueError = '';

	this.addRule = RuleSet_addRule;
	this.serialize = RuleSet_serialize;
	this.clone = RuleSet_clone;
}

function RuleSet_clone()
{
	var clone = new RuleSet(this.host, this.name, this.readOnly, this.defaultValue, this.description, this.context);
	for (var r = 0; r < this.children.length; r++) {
		clone.addRule(this.children[r].clone());
	}
	return clone;
}

function RuleSet_serialize()
{
	var s = '';
	s += '<ruleSet name="' + zenEscapeXML(this.name) + '"';
	s += ' host="' + zenEscapeXML(this.host) + '"';
	s += ' context="' + zenEscapeXML(this.context) + '"';
	s += ' default="' + zenEscapeXML(this.defaultValue) + '"';
	s += ' xmlns:xs="http://www.w3.org/2001/XMLSchema-instance"';
	s += '>\n';
	if (this.description && this.description != '') {
		s += '<description>' + zenEscapeXML(this.description) + '</description>\n';
	}

	for (var r = 0; r < this.children.length; r++) {
		var child = this.children[r];
		if (child.serialize) {
			s += this.children[r].serialize();
		}
	}
	s += '</ruleSet>';
	return s;
}

function RuleSet_addRule(rule)
{
	this.children[this.children.length] = rule;
	return rule;
}

function Rule()
{
	this._type = 'Rule';
	this.children = new Array();
	this.conditions = new Array();
	this.actions = new Array();
	this.returnValue = '';
	this.returnValueError = '';
	this.disabled = false;

	this.addCondition = Rule_addCondition;
	this.addAction = Rule_addAction;
	this.serialize = Rule_serialize;
	this.clone = Rule_clone;
}

function Rule_clone()
{
	var clone = new Rule();
	clone.returnValue = this.returnValue;
	clone.disabled = this.disabled;

	for (var c = 0; c < this.conditions.length; c++) {
		clone.addCondition(this.conditions[c].clone());
	}

	for (var a = 0; a < this.actions.length; a++) {
		clone.addAction(this.actions[a].clone());
	}

	return clone;
}

function Rule_serialize()
{
	var s = '';
	s += '<rule'
	if (this.returnValue != '') {
		s += ' return="' + zenEscapeXML(this.returnValue) + '"';
	}
	if (this.disabled) {
		s += ' disabled="true"';
	}
	s += '>\n';

	for (var c = 0; c < this.conditions.length; c++) {
		s += this.conditions[c].serialize();
	}
	for (var a = 0; a < this.actions.length; a++) {
		s += this.actions[a].serialize();
	}

	s += '</rule>\n';
	return s;
}

/* !!!
	// action column
	html += '<td valign="top">';
	html += '<table class="Actions" cellpadding="0" cellspacing="0" border="0">';

	// show other actions
	for (var a = 0; a < this.actions.length; a++) {
		html += "<tr>"
		html += this.actions[a].renderHTML(ro,id,a);
		html += "</tr>"
	}

	html += '<tr><td>'
	if (!ro) {
		html += '<input title="#(msgNewAction)#" type="button" class="EditButton" onclick="addAction(' + id + ');" value="#(msgNewCmd)#">';
	}

	html += '&nbsp;</td><td><span class="RuleLabel">' + '#(sReturn)# </span><input ' + (this.returnValueError!='' ? 'class="Error" title="' + this.returnValueError + '"' : '') + (ro?' readonly':'') + ' id="returnValue_' + id + '" type="text" size="12" value="' + escHTML(this.returnValue) + '" onchange="returnValueChange(this,this.value);" onkeyup="keyup(this);">';
	if (!ro) {
		html += '<input class="EditButton" type="button" value="#(msgEditCmd)#" title="#(msgEditOp)#" onclick="editValue(event,\'returnValue_'+id+'\',\'returnValue\');">&nbsp;';
	}

	html += "</td></tr></table>"

	html += '&nbsp;</td>';

	return html;
}
*/

function Rule_addCondition(cond)
{
	this.conditions[this.conditions.length] = cond;
	return cond;
}

function Rule_addAction(action)
{
	this.actions[this.actions.length] = action;
	return action;
}

function Condition(join,op1,operator,op2)
{
	this.join = (join == '') ? null : join;
	this.op1 = op1;
	this.op1Error = '';
	this.operator = operator;
	this.op2 = op2;
	this.op2Error = '';
	this.serialize = Condition_serialize;
	this.clone = Condition_clone;
}

function Condition_clone()
{
	var clone = new Condition();
	clone.op1 = this.op1;
	clone.op2 = this.op2;
	clone.operator = this.operator;

	return clone;
}

function Condition_serialize()
{
	var s = '';
	s += '<condition';
	s += ' join="' + zenEscapeXML(this.join) + '"';
	s += ' op1="' + zenEscapeXML(this.op1) + '"';

	if (this.operator != '') {
		s += ' operator="' + zenEscapeXML(this.operator) + '"';
		s += ' op2="' + zenEscapeXML(this.op2) + '"';
	}
	s += '/>\n';
	return s;
}

function Action(type)
{
	this.type = type;
	this.propertyBag = new Object();
	this.propertyError = new Object(); // error msg indexed by property

	this.serialize = Action_serialize;
	this.clone = Action_clone;
}

function Action_clone()
{
	var clone = new Action(this.type);
	return clone;
}

function Action_serialize()
{
	var s = '';
	s += '<action';
	s += ' xs:type="' + zenEscapeXML(this.type) + '"';

	for (prop in this.propertyBag) {
		if (this.propertyBag[prop]) {
			s += ' ' + prop + '="' + zenEscapeXML(this.propertyBag[prop]) + '"';
		}
	}
	s += '/>\n';
	return s;
}

///!!!
function Action_renderHTML(ro,rno,ano)
{
	var html = '';

	html += '<td>';
	if (!ro) {
		html += '<input type="button" title="#(msgDelAction)#" class="RemoveButton" onclick="removeAction(' + rno + ',' + ano + ');" value="#(msgRemoveCmd)#">';
	}
	html += '&nbsp;</td>';
	html += '<td>';
	html += '<span class="RuleLabel">' + this.type + ':</span> ';

	if (this.type == 'Assign') {
		var prop = this.propertyBag['property'];
		var val = this.propertyBag['value'];

		var propErr = this.propertyError['property'];
		propErr = (propErr == null) ? '' : propErr;
		var valErr = this.propertyError['value'];
		valErr = (valErr == null) ? '' : valErr;

		html += '<span class="Action">';

		html += '<input type="text" size="18" ' + (propErr!='' ? 'class="Error" title="' + propErr + '"' : '') + (ro?' readonly':'') + ' id="actionProp_'+rno+'_'+ano+'" value="' + escHTML(prop) + '" onchange="actionPropertyChange(this,this.value,\'property\');" onkeyup="keyup(this);">';
		if (!ro) {
			html += '<input class="EditButton" type="button" value="#(msgEditCmd)#" title="#(msgEditOp)#" onclick="editValue(event,\'actionProp_'+rno+'_'+ano+'\',\'actionProp\');">&nbsp;';
		}

		html +=	'&nbsp;=&nbsp;';
		html += '<input type="text" size="10" ' + (valErr!='' ? 'class="Error" title="' + valErr + '"' : '') + (ro?' readonly':'') + ' id="actionVal_'+rno+'_'+ano+'" value="' + escHTML(val) + '" onchange="actionPropertyChange(this,this.value,\'value\');" onkeyup="keyup(this);">';
		if (!ro) {
			html += '<input class="EditButton" type="button" value="#(msgEditCmd)#" title="#(msgEditOp)#" onclick="editValue(event,\'actionVal_'+rno+'_'+ano+'\',\'actionVal\');">&nbsp;';
		}

		html += '</span>';
	}
	html +=  '</td>';

	return html;
}
