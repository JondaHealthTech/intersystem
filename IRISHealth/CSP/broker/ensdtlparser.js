/*
	ensdtlparser.js

	Copyright (c) 2012-2013, InterSystems Corp.
	ALL RIGHTS RESERVED

	JS parsing functions for DTL Editor
*/

/// tokenize a DTL expression; return a list of property references
function tokenizeExpression(expr)
{
	var identList = new Object();
	var stack = new Object();
	var level=1;

	// parse the expression
	var state = 0;
	var token = "";
	var firsttok = true;
	var stacktok = false;
	var hasError = false;
	var quotedIdent = false;
	var quotedProp = false;

	var msg = isExpressionBalanced(expr);
	if ('' != msg) {
		alert(msg + '\n' + expr);
		return identList;
	}

	var ch,peek;
	var last = '';
	for (var n = 0; n < expr.length; n++) {
		ch = expr.charAt(n);
		peek = expr.charAt(n+1);

		switch(state) {
		case 0:
			// start
			if (ch == '"') {
				if (last == '.') {
					// quoted property name
					quotedProp = true;
					token = ch;
					state = 4;
					firsttok = false;
				}
				else {
					// start of string
					token = "";
					state = 1;
					firsttok = false;
				}
			}
			else if (!isNaN(parseInt(ch))) {
				// start of integer
				token = ch;
				state = 2;
				firsttok = false;
			}
			else if (ch == ".") {
				if (peek == '.' || stacktok || isNaN(parseInt(peek))) {
					// .. method
					// start of ident
					state = 4;
					token = ch;
					firsttok = false;
				}
				else {
					// start of numeric
					token = "0.";
					state = 3;
					firsttok = false;
				}
			}
			else if (firsttok && isUnaryOperatorChar(ch)) {
				// unary op
				token = ch;
				state = 7;
				firsttok = false;
			}
			else if (isOperatorChar(ch)) {
				// start of op
				token = ch;
				state = 6;
				firsttok = false;
			}
			else if (isSpecialChar(ch)) {
				// special token
				firsttok = (ch != ')') ? true : false;
				if (ch == ')') level--, stacktok=true;
			}
			else if (ch == '{') {
				// start of special ident
				quotedIdent = true;
				token = ch;
				state = 4;
				firsttok = false;
			}
			else if (isIdentChar(ch,true)) {
				// start of ident
				state = 4;
				token = ch;
				firsttok = false;
			}
			else if (isWhiteSpace(ch)) {
				// ignore
			}
			else if (ch == '?') {
				// COS pattern match (HCR106/HCR307)
				state = 9;
				token = ch;
				firsttok = false;
			}
			else {
				// unexpected character
				hasError = true;
				msg = "unexpected character '" + ch + "' (" + n + ")";
			}
			stacktok=false;
			break;
		case 1:
			// string literal
			if (ch == '"') {
				// look ahead for ""
				if (peek == '"') {
					// we have ""
					token += ch;
					state = 5;
				}
				else {
					// end of string
					token = ""; // don't save
					state = 0;
				}
			}
			else {
				token += ch;
			}
			break;
		case 2:
			// integer literal
			if (!isNaN(parseInt(ch))) {
				// add to integer literal
				token += ch;
			}
			else if (ch == ".") {
				// numeric literal
				state = 3;
				token += ch;
			}
			else if (isOperatorChar(ch)) {
				// start of op
				state = 6;
				token = ch;
			}
			else if (isSpecialChar(ch)) {
				token = "";
				state = 0;
				firsttok = (ch != ')') ? true : false;
				if (ch == ')') level--, stacktok=true;
			}
			else if (isWhiteSpace(ch)) {
				state = 0;
				token = "";
			}
			else if (ch == '?') {
				// COS pattern match (HCR106/HCR307)
				state = 9;
				token = ch;
				firsttok = false;
			}
			else {
				// error: invalid number
				hasError = true;
				msg = "invalid number '" + (token+ch) + "' (" + n + ")";
				state = 0;
			}
			break;
		case 3:
			// numeric literal
			if (!isNaN(parseInt(ch))) {
				// add to numeric literal
				token += ch;
			}
			else if (ch == ".") {
				// error
				hasError = true;
				msg = "unexpected '.' (" + n + ")";
			}
			else if (isOperatorChar(ch)) {
				// start of op
				state = 6;
				token = ch;
			}
			else if (isSpecialChar(ch)) {
				token = "";
				state = 0;
				firsttok = (ch != ')') ? true : false;
				if (ch == ')') level--, stacktok=true;
			}
			else if (ch == '?') {
				// COS pattern match (HCR106/HCR307)
				state = 9;
				token = ch;
				firsttok = false;
			}
			else {
				// error: invalid number
				hasError = true;
				msg = "invalid number '" + (token+ch) + "' (" + n + ")";
				token = "";
				state = 0;
			}
			break;
		case 4:
			// ident
			if (quotedIdent) {
				// VDoc {identifier}
				if (ch == '}') {
					token += ch;
					if (level>=0 && '.'==token.charAt(0)) {
						var oldtoken=stack[level];
						if (oldtoken) token = oldtoken + token,	delete identList[oldtoken];
					}
					identList[token] = "", token = "";
					state = 0;
					quotedIdent = false;
				}
				else {
					token += ch;
				}
			}
			else if (quotedProp) {
				// quoted property
				token += ch;
				if ((ch == '"') && ((peek == '') || peek.match(/((\_+) | (\s+) | (\W+))/g))) {
					quotedProp = false;
				}
			}
			else if (isOperatorChar(ch)) {
				// add ident to list
				if (!isValidIdent(token)) {
					hasError = true;
					msg = 'invalid identifier: \'' + token + '\' (' + n + ')';
				}
				if (level>=0 && '.'==token.charAt(0)) {
					var oldtoken=stack[level];
					if (oldtoken) token = oldtoken + token,	delete identList[oldtoken];
				}
				identList[token] = "", token = ch;

				// start of op
				state = 6;
			}
			else if (isSpecialChar(ch)) {
				if ((ch == '(') && (token.toUpperCase() == '##CLASS')) {
					// class name
					token = "";
					state = 8;
				}
				else {
					// add ident to list
					if (!isValidIdent(token)) {
						hasError = true;
						msg = "invalid identifier: '" + token + "' (" + n + ")";
					}
					if (ch == '(') token = ('.GetAt' == token.substring(token.length-6) ? token.substring(0,token.length-6) : token) + '()';
					if (level>=0 && '.'==token.charAt(0)) {
						var oldtoken=stack[level];
						if (oldtoken) token = oldtoken + token,	delete identList[oldtoken];
					}
					if (ch == '(') stack[level++]=token;
					identList[token] = "", token = "";
					state = 0;
					firsttok = (ch != ')') ? true : false;
					if (ch == ')') level--, stacktok=true;
				}
			}
			else if (isWhiteSpace(ch)) {
				// whitespace: end of ident
				if (!isValidIdent(token)) {
					hasError = true;
					msg = "invalid identifier: '" + token + "' (" + n + ")";
				}
				if (level>=0 && '.'==token.charAt(0)) {
					var oldtoken=stack[level];
					if (oldtoken) token = oldtoken + token,	delete identList[oldtoken];
				}
				identList[token] = "", token = "";
				state = 0;
			}
			else if (ch == '"') {
				if (last == '.') {
					quotedProp = true;
					token += ch;
				}
				else {
					// error: quote in ident
					hasError = true;
					token = "";
					state = 0;
					msg = 'unexpected " (' + n + ')';
				}
			}
			else if (ch == '.') {
				// consider . as part of ident
				token += ch;
			}
			else if (ch == '{') {
				// mixed ident
				token += ch;
				quotedIdent = true;
			}
			else if (ch == '?') {
				// COS pattern match (HCR106/HCR307)
				state = 9;
				token = ch;
				firsttok = false;
			}
			else if (!isIdentChar(ch,false)) {
				// error: invalid char
				hasError = true;
				msg = "invalid identifier: '" + (token+ch) + "' (" + n + ")";
				state = 0;
				token = "";
			}
			else {
				token += ch;
			}
			break;
		case 5:
			// "" in a string
			if (ch == '"') {
				// this is the 2nd, expected quote
				token += ch;
				state = 1;
			}
			else {
				hasError = true;
				msg = "unexpected character in string '" + ch + "' (" + n + ")";
			}
			break;
		case 6:
			// binary op
			if (isOperatorChar(ch)) {
				// test for unary operator after binary...
				if ((isBinaryOperator(token)) && (isUnaryOperatorChar(ch))) {
					// process 2nd op as new unary op
					token = ch;
					state = 7;
				}
				else {
					token += ch;
				}
			}
			else if (isSpecialChar(ch)) {
				if ((!isBinaryOperator(token)) && (!isUnaryOperator(token))) {
					hasError = true;
					msg = "unexpected character '" + ch + "' (" + n + ")";
				}
				else {
					token = "";
					state = 0;
					firsttok = (ch != ')') ? true : false;
					if (ch == ')') level--, stacktok=true;
				}
			}
			else {
				// end of op
				if ((!isBinaryOperator(token)) && (!isUnaryOperator(token))) {
					hasError = true;
					msg = "unexpected character '" + ch + "' (" + n + ")";
				}
				else {
					if (isWhiteSpace(ch)) {
						// whitespace
						token = "";
						state = 0;
					}
					else if (ch == '"') {
						// start of string
						token = "";
						state = 1;
					}
					else if (!isNaN(parseInt(ch))) {
						// start of number
						token = ch;
						state = 2;
					}
					else if (ch == '?') {
						// COS pattern match (HCR106/HCR307)
						state = 9;
						token = ch;
						firsttok = false;
					}
					else if (ch == ".") {
						if (peek == '.') {
							// .. method
							// start of ident
							state = 4;
							token = ch;
							firsttok = false;
						}
						else {
							// start of numeric
							token = "0.";
							state = 3;
							firsttok = false;
						}
					}
					else if (ch == '{') {
						// start of VDoc ident
						quotedIdent = true;
						token = ch;
						state = 4;
						firsttok = false;
					}
					else if (isIdentChar(ch,true)) {
						// start of ident
						token = ch;
						state = 4;
					}
					else {
						// error
						hasError = true;
						msg = "unexpected character '" + ch + "' (" + n + ")";
					}
				}
			}
			break;
		case 7:
			// unary op
			if (ch == '?') {
				// COS pattern match (HCR106/HCR307)
				state = 9;
				token = ch;
				firsttok = false;
			}
			else if (isSpecialChar(ch)) {
				if (!isUnaryOperator(token)) {
					hasError = true;
					msg = "unexpected character '" + ch + "' (" + n + ")";
				}
				else {
					token = "";
					state = 0;
					firsttok = (ch != ')') ? true : false;
					if (ch == ')') level--, stacktok=true;
				}
			}
			else {
				// end of op
				if (!isUnaryOperator(token)) {
					hasError = false;
					msg = "unexpected character '" + ch + "' (" + n + ")";
				}
				else {
					if (isWhiteSpace(ch)) {
						// whitespace
						token = "";
						state = 0;
					}
					else if (ch == '"') {
						// start of string
						token = "";
						state = 1;
					}
					else if (!isNaN(parseInt(ch))) {
						// start of number
						token = ch;
						state = 2;
					}
					else if (ch == ".") {
						if (peek == '.') {
							// .. method
							// start of ident
							state = 4;
							token = ch;
							firsttok = false;
						}
						else {
							// start of numeric
							token = "0.";
							state = 3;
							firsttok = false;
						}
					}
					else if (ch == '{') {
						// start of special ident
						quotedIdent = true;
						token = ch;
						state = 4;
					}
					else if (isIdentChar(ch,true)) {
						// start of ident
						token = ch;
						state = 4;
					}
					else if (isUnaryOperatorChar(ch)) {
						// unary operator
						state = 7;
						token = ch;
						firsttok = false;
					}
					else {
						// error
						hasError = true;
						msg = "unexpected character '" + ch + "' (" + n + ")";
					}
				}
			}
			break;
		case 8:
			// ##class(
			if (ch == ')') {
				if (!isValidClassName(token)) {
					hasError = true;
					msg = "invalid class name: '" + token + "' (" + n + ")";
				}
				token = "";
				state = 0;
			}
			else {
				token += ch;
			}
			break;
		case 9:
		  // COS pattern match (HCR106/HCR307)
			if (isWhiteSpace(ch)) {
				// look for end of expression
				token = "";
				state = 0;
			}
			break;
		}
		last = ch;
	} // end of next character loop

	if (state == 4 && token != "") {
		// last ident
		if (!isValidIdent(token)) {
			hasError = true;
			msg = "invalid identifier: '" + token + "' (" + n + ")";
		}
		if (level>=0 && '.'==token.charAt(0)) {
			var oldtoken=stack[level];
			if (oldtoken) token = oldtoken + token,	delete identList[oldtoken];
		}
		identList[token] = "";
	}
	if (hasError) {
		alert('Error in expression: ' + msg + '\n' + expr);
	}
	// JMD369
	// only idents that start with source. are of any use!
	for (var ident in identList) {
		if ((ident.substring(0,7) != 'source.') && (ident != 'source')) {
			delete identList[ident];
		}
	}
	return identList;
}

/// Make a pass over expression and make sure parens and quotes are balanced
function isExpressionBalanced(expr)
{
	var state = 0;
	var token = "";
	var paren = 0;

	for (var n = 0; n < expr.length; n++) {
		var ch = expr.charAt(n);
		switch(state) {
		case 0:
			switch(ch) {
			case '(':
				paren++;
				break;
			case ')':
				paren--;
				break;
			case '"':
				state = 1;
				break;
			}
			break;
		case 1:
			switch(ch) {
			case '"':
				state = 0;
				break;
			}
			break;
		}
	}

	var msg = '';
	if (state != 0) {
		msg = 'unmatched quotation marks in expression.';
	}
	else if (paren != 0) {
		msg = 'unbalanced parentheses in expression.';
	}

	return msg;
}

// lookup tables
var lookupTable = new Object();
lookupTable.UnaryOp = {
	'+': true,
	'-': true,
	'\'': true
}
lookupTable.BinaryOp = {
	'+': true,
	'-': true,
	'*': true,
	'**': true,
	'/': true,
	'\\': true,
	'#': true,
	'\'=': true,
	'=': true,
	'>=': true,
	'<=': true,
	'>': true,
	'<': true,
	'&': true,
	'&&': true,
	'!': true,
	'||': true,
	'_': true,
	'[': true,
	'\'[': true,
	']': true,
	'\']': true,
	']]': true
}
lookupTable.UnaryOpChar = {
	'+': true,
	'-': true,
	'\'': true
}
lookupTable.BinaryOpChar = {
	'+': true,
	'-': true,
	'*': true,
	'/': true,
	'\\': true,
	'<': true,
	'>': true,
	'=': true,
	'&': true,
	'\'': true,
	'|': true,
	'_': true,
	'[': true,
	']': true,
	']]': true
}
lookupTable.WhiteChar = {
	' ': true,
	'\t': true,
	'\n': true
}
lookupTable.SpecialChar = {
	',': true,
	'(': true,
	')': true,
	':': true
}

function isBinaryOperator(ch)
{
	return lookupTable.BinaryOp[ch] ? true : false;
}

function isUnaryOperator(ch)
{
	return lookupTable.UnaryOp[ch] ? true : false;
}

function isOperatorChar(ch)
{
	return lookupTable.BinaryOpChar[ch] ? true : false;
}

function isUnaryOperatorChar(ch)
{
	return lookupTable.UnaryOpChar[ch] ? true : false;
}

function isWhiteSpace(ch)
{
	return lookupTable.WhiteChar[ch] ? true : false;
}

function isIdentChar(ch,start)
{
	// start indicates first char of expression
	// a=97,z=122, A=65,Z=90 0=48,9=57
	var code = ch.charCodeAt(0);
	if (((code >= 97) && (code <= 122)) ||
		((code >= 65) && (code <= 90)) ||
		(ch == '%') ||
		(ch == '#') ||
		(ch == '^') ||
		(ch == '$') ||
		(!start && (code >= 48) && (code <= 57)) ||
		(code >= 128)) {
		return true;
	}

	return false;
}

function isSpecialChar(ch)
{
	return lookupTable.SpecialChar[ch] ? true : false;
}

/// test if complete token is a valid identifier
function isValidIdent(token)
{
	// deal with dots: 2 allowed at start otherwise only one;
	if (token.indexOf('...') != -1) return false;
	if (token.indexOf('..',1) != -1) return false;

	if (token.search(/\.\d|\.[$^#]|[@!~]/) != -1) return false;
	return true;
}

/// test if token is a valid class name
function isValidClassName(token)
{
	// this could be improved!
	if (token == '') return false;
	if (token.search(/[@!~\*-\+\s]/) != -1) return false;
	return true;
}
