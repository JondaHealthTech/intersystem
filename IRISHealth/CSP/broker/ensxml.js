/*
	ensxml.js
	
	Copyright (c) 2003, InterSystems Corp.
	ALL RIGHTS RESERVED
	
	Lite-weight xml parser for JavaScript
*/

// constants (FSM states)

var XML_Start = 0;
var XML_StartOpen = 1;
var XML_Chars = 2;

var XML_EndOpen = 3;
var XML_EndClose = 4;
var XML_FindAttr = 5;

var XML_AttrName = 6;
var XML_AttrName2 = 7;
var XML_AttrName3 = 8;
var XML_AttrVal = 9;

var XML_CDATA1 = 10;
var XML_CDATA2 = 11;
var XML_CDATA3 = 12;

var XML_PI = 14;

// Very limited xml-lite parser
// constructor
// handler is an object containing the various XML event
// callbacks
function XMLParser(handler)
{
	this.handler = handler;
	this.parse = XML_parse;
}

// Parse the xml in the string 'data'; 
// invoke the various callbacks for the handler object;
function XML_parse(data)
{
	var state = XML_Start;
	var token = '';
	var ch = '';
	var currEl = '';
	var currAttr = '';
	var quote = null;
	var p = 0;
	
	// array of attributes
	var attrs = new Array();
	
	var old = '';
	
	while (data && (p < data.length)) {
		
		// next char
		ch = data.charAt(p++);
		
		old = state;
		
		switch (state) {
		case XML_Start:
			if (ch == '<') {
				state = XML_StartOpen;
				token = '';
			}
			break;

		case XML_StartOpen:
			if (isWhite(ch) || ch == '/' || ch == '>') {
				// found an element name
				currEl = token;
				token = '';

				// clear out attributes
				var attrs = new Array();
			}
		
			if (isWhite(ch)) {
				// look for attribute
				state = XML_FindAttr;
			}
			else if (ch == '?' && token == '') {
				// start of PI
				state = XML_PI;
			}
			else if (ch == '/') {
				if (currEl == '') {
					// start of end tag
					state = XML_EndOpen;
				}
				else {
					// end of complete element

					// invoke callback
					this.handler.startElement(currEl, attrs);
					state = XML_EndClose;
				}
			}
			else if (ch == '>') {
				// end of start tag; start of chars;
				
				// invoke callback
				this.handler.startElement(currEl, attrs);

				token = '';
				state = XML_Chars;
			}
			else if (ch == '[' && token == '![CDATA') {
				// start of CDATA block
				token = '';
				state = XML_CDATA1;
			}
			else {
				token += ch;
			}
			break;

		case XML_PI:
			if (ch == '>') {
				// end of PI
				token = '';
				state = XML_Start;
			}
			break;

		case XML_EndOpen:
			if (ch == '>') {
				// end tag

				// invoke callback
				this.handler.endElement(token);
				
				token = '';
				state = XML_Start;
			}
			else {
				token += ch;
			}
			break;

		case XML_Chars:
			if (ch == '<') {
				// invoke callback
				if (token != '') {
					this.handler.chars(token);
				}
				
				state = XML_StartOpen;
				token = '';
			}
			else {
				token += ch;
			}
			break;

		case XML_CDATA1:
			if (ch == ']') {
				state = XML_CDATA2;
			}
			else {
				token += ch;
			}
			break;

		case XML_CDATA2:
			if (ch == ']') {
				state = XML_CDATA3;
			}
			else {
				token += ']' + ch;
				state = XML_CDATA1;
			}
			break;

		case XML_CDATA3:
			if (ch == '>') {
				// invoke callback
				if (token != '') {
					this.handler.chars(token);
				}
				
				state = XML_Start;
				token = '';
			}
			else if (ch == ']') {
				token += ']';
				state = XML_CDATA3;
			}
			else {
				token += ']]' + ch;
				state = XML_CDATA1;
			}
			break;

		case XML_EndClose:
			if (ch == '>') {
				// invoke callback
				this.handler.endElement(currEl);

				currEl = '';
				state = XML_Start;
			}
			break;

		case XML_FindAttr:
			// looking for attribute name
			if (ch == '>') {
				// invoke callback
				this.handler.startElement(currEl, attrs);

				token = '';
				state = XML_Chars;
			}
			else if (ch == '/') {
				// invoke callbacks
				this.handler.startElement(currEl, attrs);
				
				state = XML_EndClose;
			}
			else if (!isWhite(ch)) {
				// start of attribute name
				state = XML_AttrName;
				token = ch;
			}
			break;

		case XML_AttrName:
			if (isWhite(ch)) {
				state = XML_AttrName2;
				currAttr = token;
				token = '';
			}
			else if (ch == '=') {
				state = XML_AttrName3;
				currAttr = token;
				token = '';
			}
			else {
				token += ch;
			}
			break;
		case XML_AttrName2:
			if (ch == '=') {
				state = XML_AttrName3;
			}
			break;
		case XML_AttrName3:
			if (ch == '\"' || ch == '\'') {
				quote = ch;
				state = XML_AttrVal;
				token = '';
			}
			break;
		case XML_AttrVal:
			if (ch == quote) {
				// got an attribute value; place it into array
				attrs[currAttr] = token;

				token = '';
				state = XML_FindAttr;
			}
			else {
				token += ch;
			}
			break;
		}

		// alert(" {" + ch + "} " + old + " ==> " + state + '\n\"' + token + '\"');
	}
}

// test if char is whitespace
function isWhite(ch)
{
	return ch == ' ' || ch == '\t' || ch == '\r' || ch == '\n';
}