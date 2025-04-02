/*
	dsparser.js

	Copyright (c) 2010-2012, InterSystems Corp.
	ALL RIGHTS RESERVED

	Formula parsing and calc engine functions for DeepSee components.
*/

/// Construct an intance of a formula parser.
function dsFormulaParser(engine)
{
	// set of additional function:
	// this is an array mapping names to js functions
	// each function is passed its inputs as an array called 'args'
	// names should be in lower case
	this.funcSet = null;
	// optional
	this.engine = engine;

	this.parseTree = null;
	this.setFunctionSet = dsFormulaParser_setFunctionSet;
	this.parse = dsFormulaParser_parse;
	this.tokenize = dsFormulaParser_tokenize;
	this.reduce = dsFormulaParser_reduceTokens;
	this.reduceFunction = dsFormulaParser_reduceFunction;
	this.toString = dsFormulaParser_toString;
	this.eval= dsFormulaParser_eval;
	this.evalNode= dsFormulaParser_evalNode;
	this.getTree= dsFormulaParser_getTree;
	this.setTree= dsFormulaParser_setTree;
	this.uncompile= dsFormulaParser_uncompile;

	this.isFunction = dsFormulaParser_isFunction;

	this.errorHTML = '';
}

/// Connect a function set to the parser.
function dsFormulaParser_setFunctionSet(funcSet)
{
	this.funcSet = funcSet;
}

/// Evaluate a DeepSee formula.
/// lookupFunc is a function used to lookup ident values.
function dsFormulaParser_eval(lookupFunc)
{
	return this.evalNode(this.parseTree,lookupFunc);
}

/// Get the parse tree.
function dsFormulaParser_getTree()
{
	return this.parseTree;
}

/// Set the parse tree directly.
function dsFormulaParser_setTree(tree)
{
	this.parseTree = tree;
}

/// Evaluate a node within a parse tree
function dsFormulaParser_evalNode(node,lookupFunc)
{
	if (null==node) return '';
	var ret = '';

	if (!node.children) {
		node.children = [];
	}

	switch(node.type) {
	case 'op':
		var arg1 = this.evalNode(node.children[0],lookupFunc);
		var arg2 = this.evalNode(node.children[1],lookupFunc);
		if (arg1===null || arg2===null) return null;
		if (!isNaN(parseFloat(arg1))) {
			arg1 = parseFloat(arg1);
		}
		if (!isNaN(parseFloat(arg2))) {
			arg2 = parseFloat(arg2);
		}

		// coerce '' into 0 for numeric expressions
		if (arg1==='' && !isNaN(parseFloat(arg2))) {
			arg1 = 0;
		}
		if (arg2==='' && !isNaN(parseFloat(arg1))) {
			arg2 = 0;
		}

		switch(node.value) {
		case '+':
			ret = arg1 + arg2;
			break;
		case '-':
			ret = arg1 - arg2;
			break;
		case '/':
			ret = (arg2!=0) ? arg1 / arg2 : '@divide';
			break;
		case '*':
			ret = arg1 * arg2;
			break;
		case '*':
			ret = arg1 * arg2;
			break;
		case '=':
			ret = arg1 == arg2;
			break;
		case '>':
			ret = arg1 > arg2;
			break;
		case '>=':
			ret = arg1 >= arg2;
			break;
		case '<':
			ret = arg1 < arg2;
			break;
		case '<=':
			ret = arg1 <= arg2;
			break;
		case '<>':
			ret = arg1 != arg2;
			break;
		}
		break;
	case 'number':
		ret = parseFloat(node.value);
		break;
	case 'string':
		ret = node.value;
		break;
	case 'ident':
		if (this.engine) {
			var refersTo = {};
			ret = this.engine.resolveIdent(node.value,refersTo);
			this.referRow = refersTo.row;
			this.referCol = refersTo.col;
		}
		else if ('function' == typeof lookupFunc) {
			ret = lookupFunc(node.value);
		}
		break;
	case 'func':
		var args = new Array();
		for (var n = 0; n < node.children.length; n++) {
			args[n] = this.evalNode(node.children[n],lookupFunc);
			if (args[n]===null) {
				// func arg not resolved
				return null;
			}
		}
		switch(node.value.toString().toLowerCase()) {
		case 'if':
			ret = args[0] ? zenGet(args[1]) : zenGet(args[2]);
			break;
		case 'not':
			ret = !args[0];
			break;
		case 'round':
			var val = parseFloat(args[0]);
			ret = isNaN(val) ? args[0] : Math.round(val);
			break;
		case 'power':
			var val = parseFloat(args[0]);
			var exp = parseFloat(args[1]);
			if (isNaN(val)||isNaN(exp)) {
				ret = '@error';
			}
			else {
				ret = Math.pow(val,exp);
			}
			break;
		case 'concat':
			ret = '';
			for (var n = 0; n < node.children.length; n++) {
				if (args[n]!=null && args[n]!=='') {
					ret += args[n].toString();
				}
			}
			break;
		case 'and':
			ret = true;
			for (var n = 0; n < node.children.length; n++) {
				if (args[n]==null || !args[n]) {
					ret = false;
					break;
				}
			}
			break;
		case 'or':
			ret = false;
			for (var n = 0; n < node.children.length; n++) {
				if (args[n]!=null && args[n]) {
					ret = true;
					break;
				}
			}
			break;
		case 'rowno':
			if (this.engine) {
				ret = parseInt(this.engine.currRow) + 1;
			}
			break;
		case 'colno':
			if (this.engine) {
				ret = parseInt(this.engine.currCol) + 1;
			}
			break;
		case 'sum':
			for (var n = 0; n < args.length; n++) {
				if (args[n]!='') {
					ret = (ret==''?0:parseFloat(ret)) + parseFloat(args[n]);
				}
			}
			break;

		default:
			// see if function is in funcSet
			var func = node.value.toString().toLowerCase();
			if (func!='' && this.funcSet[func]) {
				// assemble args
				// do not evaluate idents at this point (unless they are nested)
				var argList = [];
				for (var n = 0; n < node.children.length; n++) {
					if ('ident' == node.children[n].type) {
						argList[argList.length] = node.children[n].value;
					}
					else {
						argList[argList.length] = args[n];
					}
				}
				ret = this.funcSet[func](argList);
			}
			else {
				ret = '@function: ' + node.value;
			}
			break;
		}
		break;
	}
	return ret;
}

/// Parse a DeepSee formula.
function dsFormulaParser_parse(expr)
{
	this.parseTree = null;
	this.errorHTML = '';
	dsFormulaLastError = '';
	var tokens = this.tokenize(expr);

	//alert(tokens.join('\n'));
	//for (var n = 0; n < tokens.length; n++) {
	//	console.log(n + tokens[n].value);
	//}

	if ('' != this.errorHTML) {
		return false;
	}
	if (tokens) {
		this.parseTree = this.reduce(tokens,expr);
		// !!! alert('tree\n' + this.toString());
	}
	return this.parseTree ? true : false;
}

/// tokenize a DeepSee formula; return a list of tokens.
/// each token is of the form: {type:ident|func|,|(|)|unary|op|string|number , value:value}
function dsFormulaParser_tokenize(expr)
{
	var tokenList = new Array();

	// parse the expression
	var state = 0;
	var token = "";
	var hasError = false;
	var firstTok = true;

	this.errorHTML = isExpressionBalanced(expr);
	if ('' != this.errorHTML) {
		return tokenList;
	}

	// process extra char at end
	for (var n = 0; n <= expr.length; n++) {
		var ch = expr.charAt(n);
		var peek = expr.charAt(n+1);

		// alert(state+":"+ch);

		switch(state) {
		case 0:
			// start
			if (ch == '\"') {
				// start of string
				token = "";
				state = 1;
				firstTok = false;
			}
			else if (!isNaN(parseInt(ch))) {
				// start of integer
				token = ch;
				state = 2;
				firstTok = false;
			}
			else if (ch == ".") {
				// start of numeric
				token = "0.";
				state = 3;
				firstTok = false;
			}
			else if (firstTok && isUnaryOperatorChar(ch)) {
				// unary op
				token = ch;
				state = 7;
				firstTok = false;
			}
			else if (isOperatorChar(ch)) {
				token = ch;
				state = 6;
				firstTok = false;
			}
			else if (isIdentChar(ch,true)) {
				// start of ident
				state = 4;
				token = lookupTable.IdentStart + ch;
				firstTok = false;
			}
			else if (ch == lookupTable.IdentStart) {
				// start of delimited ident
				state = 8;
				token = ch;
				firstTok = false;
			}
			else if (isWhiteSpace(ch)) {
				// ignore
			}
			else if ('' == ch) {
				// ignore
			}
			else if (isSpecialChar(ch)) {
				tokenList[tokenList.length] = { type:ch, value:ch };
				firstTok = false;
				if ('('==ch || ','==ch) {
					firstTok = true;
				}
			}
			else {
				// unexpected character
				hasError = true;
				msg = dsGetErrorHTML(1,'Unexpected character',expr,n);
			}
			break;
		case 1:
			// string literal
			if (ch == '\"') {
				// look ahead for ""
				var peek = expr.charAt(n+1);
				if (peek == '\"') {
					// ""
					token += ch;
					state = 5;
				}
				else {
					// end of string
					tokenList[tokenList.length] = { type:'string', value:token };
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
				tokenList[tokenList.length] = { type:'number', value:token };
				state = 6;
				token = ch;
			}
			else if (isSpecialChar(ch)) {
				tokenList[tokenList.length] = { type:'number', value:token };
				tokenList[tokenList.length] = { type:ch, value:ch};
				if ('('==ch || ','==ch) {
					firstTok = true;
				}
				token = "";
				state = 0;
			}
			else if (isWhiteSpace(ch) || ch=='') {
				tokenList[tokenList.length] = { type:'number', value:token };
				state = 0;
				token = "";
			}
			else {
				// error: invalid number
				hasError = true;
				msg = dsGetErrorHTML(2,'Invalid number',expr,n-token.length-1,n);
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
				msg = dsGetErrorHTML(3,'Unexpected character',expr,n);
			}
			else if (isOperatorChar(ch)) {
				// start of op
				tokenList[tokenList.length] = { type:'number', value:token };
				state = 6;
				token = ch;
			}
			else if (isSpecialChar(ch)) {
				tokenList[tokenList.length] = { type:'number', value:token };
				tokenList[tokenList.length] = { type:ch, value:ch};
				if ('('==ch || ','==ch) {
					firstTok = true;
				}
				state = 0;
			}
			else if (isWhiteSpace(ch) || ch=='') {
				tokenList[tokenList.length] = { type:'number', value:token };
				state = 0;
				token = "";
			}
			else {
				// error: invalid number
				hasError = true;
				msg = dsGetErrorHTML(4,'Invalid number',expr,n-token.length-1,n);
				token = "";
				state = 0;
			}
			break;
		case 4:
			// ident
			if (isOperatorChar(ch)) {
				// add ident to list
				if (!isValidIdent(token)) {
					hasError = true;
					msg = dsGetErrorHTML(5,'Invalid identifier',expr,n-token.length-1,n);
				}
				tokenList[tokenList.length] = { type:'ident', value:token+lookupTable.IdentEnd };

				// start of op
				token = ch;
				state = 6;
			}
			else if ('.'==ch) {
				if (peek == lookupTable.IdentStart) {
					token += lookupTable.IdentEnd + ch;
					state = 8;
				}
				else if (isIdentChar(peek,false)) {
					token += lookupTable.IdentEnd + ch + lookupTable.IdentStart;
					state = 4;
				}
				else {
					hasError = true;
					msg = dsGetErrorHTML(49,'Invalid identifier',expr,n-token.length-1,n);
				}
			}
			else if (isWhiteSpace(ch) || ''==ch) {
				// whitespace: end of ident
				if (!isValidIdent(token)) {
					hasError = true;
					msg = dsGetErrorHTML(6,'Invalid identifier',expr,n-token.length-1,n);
				}
				tokenList[tokenList.length] = { type:'ident', value:token+lookupTable.IdentEnd };
				token = "";
				state = 0;
			}
			else if (ch == '\"') {
				// error: quote in ident
				hasError = true;
				token = "";
				state = 0;
				msg = dsGetErrorHTML(7,'Unexpected character',expr,n);
			}
			else if (isSpecialChar(ch)) {
				// add ident to list
				if (!isValidIdent(token)) {
					hasError = true;
					msg = dsGetErrorHTML(8,'Invalid identifier',expr,n-token.length-1,n);
				}
				if (ch=="(") {
					// function: remove [
					token = token.substr(1,token.length-1);
					tokenList[tokenList.length] = { type:'func', value:token };
					// test if this is a known function
					if (!this.isFunction(token)) {
						hasError = true;
						msg = dsGetErrorHTML(8,'Unknown function ' + token,expr,n-token.length-1,n);
					}
				}
				else {
					tokenList[tokenList.length] = { type:'ident', value:token+lookupTable.IdentEnd };
					tokenList[tokenList.length] = { type:ch, value:ch};
				}
				if ('('==ch || ','==ch) {
					firstTok = true;
				}
				token = "";
				state = 0;
			}
			else if (!isIdentChar(ch,false)) {
				// error: invalid char
				hasError = true;
				msg = dsGetErrorHTML(9,'Invalid identifier',expr,n-token.length-1,n);
				state = 0;
				token = "";
			}
			else {
				token += ch;
			}
			break;
		case 5:
			// "" in a string
			if (ch == '\"') {
				// this is the 2nd, expected quote
				state = 1;
			}
			else {
				hasError = true;
				msg = dsGetErrorHTML(10,'Unexpected character',expr,n);
			}
			break;
		case 6:
			// binary op
			if (isOperatorChar(ch)) {
				// test for unary operator after binary...
				if ((isBinaryOperator(token)) && (isUnaryOperatorChar(ch))) {
					// process 2nd op as new unary op
					tokenList[tokenList.length] = { type:'op', value:token };
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
					msg = dsGetErrorHTML(11,'Unexpected character',expr,n);
				}
				else {
					tokenList[tokenList.length] = { type:'op', value:token };
					tokenList[tokenList.length] = { type:ch, value:ch };
					if ('('==ch || ','==ch) {
						firstTok = true;
					}
					token = "";
					state = 0;
				}
			}
			else {
				// end of op
				if ((!isBinaryOperator(token)) && (!isUnaryOperator(token))) {
					hasError = true;
					msg = dsGetErrorHTML(12,'Unexpected character',expr,n);
				}
				else {
					if (isWhiteSpace(ch) || '' == ch) {
						// whitespace
						tokenList[tokenList.length] = { type:'op', value:token };
						token = "";
						state = 0;
					}
					else if (ch == '\"') {
						// start of string
						tokenList[tokenList.length] = { type:'op', value:token };
						token = "";
						state = 1;
					}
					else if (!isNaN(parseInt(ch))) {
						// start of number
						tokenList[tokenList.length] = { type:'op', value:token };
						token = ch;
						state = 2;
					}
					else if (ch == ".") {
						// start of numeric
						tokenList[tokenList.length] = { type:'op', value:token };
						token = "0.";
						state = 3;
					}
					else if (ch == lookupTable.IdentStart) {
						// start of del ident
						tokenList[tokenList.length] = { type:'op', value:token };
						token = ch;
						state = 8;
					}
					else if (isIdentChar(ch,true)) {
						// start of ident
						tokenList[tokenList.length] = { type:'op', value:token };
						token = lookupTable.IdentStart + ch;
						state = 4;
					}
					else {
						// error
						hasError = true;
						msg = dsGetErrorHTML(13,'Unexpected character',expr,n);
					}
				}
			}
			break;
		case 7:
			// unary op
			if (isSpecialChar(ch)) {
				if (!isUnaryOperator(token)) {
					hasError = true;
					msg = dsGetErrorHTML(14,'Unexpected character',expr,n);
				}
				else {
					tokenList[tokenList.length] = { type:'unary', value:token };
					tokenList[tokenList.length] = { type:ch, value:ch};
					token = "";
					state = 0;
				}
			}
			else {
				// end of op
				if (!isUnaryOperator(token)) {
					hasError = false;
					msg = dsGetErrorHTML(15,'Unexpected character',expr,n);
				}
				else {
					if (isWhiteSpace(ch)) {
						// whitespace
						tokenList[tokenList.length] = { type:'unary', value:token };
						token = "";
						state = 0;
					}
					else if (ch == '\"') {
						// start of string
						tokenList[tokenList.length] = { type:'unary', value:token };
						token = "";
						state = 1;
					}
					else if (!isNaN(parseInt(ch))) {
						// start of number
						tokenList[tokenList.length] = { type:'unary', value:token };
						token = ch;
						state = 2;
					}
					else if (ch == ".") {
						// start of numeric
						tokenList[tokenList.length] = { type:'unary', value:token };
						token = "0.";
						state = 3;
					}
					else if (ch == lookupTable.IdentStart) {
						// start of del ident
						tokenList[tokenList.length] = { type:'unary', value:token };
						token = ch;
						state = 8;
					}
					else if (isIdentChar(ch,true)) {
						// start of ident
						tokenList[tokenList.length] = { type:'unary', value:token };
						token = lookupTable.IdentStart + ch;
						state = 4;
					}
					else if (isUnaryOperatorChar(ch)) {
						// unary operator
						state = 7;
						tokenList[tokenList.length] = { type:'unary', value:token };
						token = ch;
					}
					else {
						// error
						hasError = true;
						msg = dsGetErrorHTML(16,'Unexpected character',expr,n);
					}
				}
			}
			break;
		case 8:
			// delimited ident
			if (ch == lookupTable.IdentEnd) {
				// do not validate
				// keep [] around ident
				// test for compound ident [a].[b]
				if (peek=='.') {
					// compound ident: [a].[b]
					token += ch;
					state = 9;
				}
				else {
					// add ident to list
					token += ch;
					tokenList[tokenList.length] = { type:'ident', value:token };
					token = "";
					state = 0;
				}
			}
			else {
				token += ch;
			}
			break;
		case 9:
			// . in compound ident
			if (ch == '.' && peek == lookupTable.IdentStart) {
				token += ch;
				state = 8;
			}
			else if (ch == '.' && isIdentChar(peek,false)) {
				token += ch + lookupTable.IdentStart;
				state = 4;
			}
			else {
				msg = dsGetErrorHTML(17,'Invalid identifier',expr,n-token.length-1,n);
			}
			break;
		}

	} // end of next character loop

	if (hasError) {
		this.errorHTML = msg;
	}

	// debugging: add toString to items in the list
	if (true && 'function' == typeof dsFormulaParser_tokenToString) {
		for (var n = 0; n < tokenList.length; n++) {
			tokenList[n].toString = dsFormulaParser_tokenToString;
		}
	}

	return tokenList;
}

/// Convert a token to a string value!
function dsFormulaParser_tokenToString()
{
	return this.type + ':' + this.value;
}

/// Reduce the token list (tokens) into a parse tree (expr) and return the top node of it.
function dsFormulaParser_reduceTokens(tokens,expr)
{
	var topNode = null;
	try {
		// special case: item or +item
		if (tokens.length==0) {
			return null;
		}
		else if (tokens.length==1) {
			return tokens[0];
		}
		else if (tokens.length==2 && (tokens[0].type=='unary') && (tokens[0].value=='+')) {
			return tokens[1];
		}

		// check for dangling operators
		if (tokens[tokens.length-1].type == 'op') {
			this.errorHTML = dsGetErrorHTML(18,'Extra operator',expr,expr.length-1);
			return null;
		}

		var stack = new ds_stack();
		for (var n = 0; n < tokens.length; n++) {
			var token = tokens[n];
			stack.push(token);

			if (token.type == 'func' && token.children == null) {
				// skip to end of function
				topNode = token;
				n = this.reduceFunction(tokens,n,expr);
			}

			// apply reduction rules
			var count = 0;
			var canReduce = true;
			while (canReduce && (count++<10)) {
				// get top 3 items from stack
				// see if we can reduce
				var item1 = stack.peek(0);
				var item2 = stack.peek(1);
				var item3 = stack.peek(2);

				// alert('can reduce: ' + n + ":\n" + (item3?item3.type+":"+item3.value:'')+'\n'+(item2?item2.type+":"+item2.value:'')+'\n'+(item1?item1.type+":"+item1.value:'')+'\n');

				if ((item1!=null)&&(item2!=null)&&(item3!=null)&&(item1.type==")")) {

					if (item3.type=='(') {
						// (x) remove parens
						if (item2.type=='op') {
							// note presence of ()
							item2.inParens = true;
						}
						stack.pop();
						stack.pop();
						stack.pop();
						stack.push(item2);
						topNode = item2;
					}
				}
				else if ((item1!=null)&&(item2!=null)&&(item2.type=='unary')&&(item1.type=='number' || item1.type=='ident' || item1.type=='func' || item1.type=='op')) {
					// unary arg
					if (item2.value == '+') {
						// toss
						stack.pop();
					}
					else if (item2.value == '-') {
						// convert to * -1
						var newItem = new Object();
						newItem.type = 'number';
						newItem.value = -1;
						item2.type = 'op';
						item2.value = '*';
						item2.children = new Array();
						item2.children[1] = item1;
						item2.children[0] = newItem;
						stack.pop();
						stack.pop();
						stack.push(item2);
						topNode = item2;
					}
					else {
						alert('Unknown unary operator: ' + item1.value);
						canReduce = false;
					}
				}

				else if ((item1!=null)&&(item2!=null)&&(item3!=null)&&(item2.type=='op')
					&&(item1.type!='(')
					&&(item3.type!='(')) {
					// arg op arg

					var swap = false;
					if (item3.type=='op' && !(true==item3.inParens)) {
						// check precedence
						swap = testPrecedence(item2.value,item3.value);
					}

					item2.children = new Array();
					item2.children[1] = item1;
					stack.pop();
					stack.pop();
					stack.pop();

					if (swap) {
						item2.children[0] = item3.children[1];
						item3.children[1] = item2;
						stack.push(item3);
						topNode = item3;
					}
					else {
						item2.children[0] = item3;
						stack.push(item2);
						topNode = item2;
					}
				}
				else {
					canReduce = false;
				}
			}
		}

		// check for errors
	}
	catch(ex) {
		alert('Error in reduceTokens:\n' + ex.message);
	}

	return topNode;
}

/// Reduce a function within a token list.
/// Return index of next token.
function dsFormulaParser_reduceFunction(tokens,offset,expr)
{
	var nextToken = -1;

	try {
		// find end of function
		var token = tokens[offset];
		var paren = 1;
		// list of tokens for one func argument
		var list = new Array();
		var arg = 0;
		for (nextToken=offset+1; nextToken < tokens.length; nextToken++) {
			var test = tokens[nextToken];
			if (test.type == 'func') {

				// skip to end of function
				nextToken = this.reduceFunction(tokens,nextToken,expr);
				list[list.length] = test;
			}
			else if (test.type=='(') {
				paren++;
			}
			else if ((test.type==',')&&(paren==1)) {
				if (list.length>0) {
					var node = this.reduce(list,expr);
					if (null == token.children) {
						token.children = new Array();
					}
					token.children[arg] = node;
					list.length = 0;
				}
				arg++;
			}
			else if (test.type==')') {
				paren--;
				if (0==paren) {
					if (list.length>0) {
						var node = this.reduce(list,expr);
						if (null == token.children) {
							token.children = new Array();
						}
						token.children[arg] = node;
					}
					else {
						token.children = new Array();
					}
					break;
				}
			}
			else {
				list[list.length] = test;
			}
		}
	}
	catch(ex) {
		alert('Error in reduceFunction:\n' + ex.message);
	}
	return nextToken;
}

/// Utility function.
function dsFormulaParser_toString(topNode)
{
	if (null == topNode) {
		topNode = this.parseTree;
	}
	if (null == topNode) {
		return '';
	}

	var text = topNode.value;
	if (topNode.children) {
		text += '(';
		for (var n = 0; n < topNode.children.length; n++) {
			if (n>0) {
				text += ',';
			}
			text += this.toString(topNode.children[n]);
		}
		text += ')';
	}
	else if (topNode.type == 'string') {
		text = '\"'+text+'\"';
	}
	else if (topNode.type == 'ident') {
		// put in delimiter
		if (text.toString().charAt(0)!='[') {
			text = '['+text+']';
		}
	}
	return text;
}

/// Turn the current parse tree back into an expression.
function dsFormulaParser_uncompile(node)
{
	if (null == node) {
		node= this.parseTree;
	}
	if (null == node) {
		return '';
	}

	switch(node.type) {
	case 'op':
		// test precedence
		var needParen1 = false;
		var needParen2 = false;
		var child1 = node.children[0];
		var child2 = node.children[1];

		if ('op'==child1.type) {
			if (testPrecedence(node.value,child1.value)) {
				needParen1 = true;
			}
		}
		if ('op'==child2.type) {
			if (testPrecedence(node.value,child2.value)) {
				needParen2 = true;
			}
		}

		var arg1 = this.uncompile(child1);
		var arg2 = this.uncompile(child2);
		text = (needParen1?'(':'')+arg1+(needParen1?')':'')+node.value+(needParen2?'(':'')+arg2+(needParen2?')':'');
		break;
	case 'number':
		text = node.value;
		break;
	case 'string':
		text = '"' + node.value + '"';
		break;
	case 'ident':
		text = node.value;
		break;
	case 'func':
		text = node.value;
		text += '(';
		for (var n = 0; n < node.children.length; n++) {
			if (n>0) {
				text += ',';
			}
			text += this.uncompile(node.children[n]);
		}
		text += ')';
		break;
	}
	return text;
}

/// Simple tree object.
function ds_tree(type,value)
{
	this.children = new Array();
	this.type = type;
	this.value = value;
	this.add = ds_tree_add;
}

function ds_tree_add(node)
{
	this.children[this.children.length] = node;
}


/// Simple stack object.
function ds_stack()
{
	this.stack = new Array();
	this.stackptr = 0;
	this.push = ds_stack_push;
	this.pop = ds_stack_pop;
	this.peek = ds_stack_peek;
}

function ds_stack_push(item)
{
	this.stack[this.stackptr] = item;
	this.stackptr++;
}

function ds_stack_pop()
{
	if (this.stackptr > 0) {
		this.stackptr--;
		return this.stack[this.stackptr];
	}
	return null;
}

function ds_stack_peek(offset)
{
	if (this.stackptr > offset) {
		return this.stack[this.stackptr - (offset+1)];
	}
	return null;
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
			case lookupTable.IdentStart:
				state = 2;
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
		case 2:
			switch(ch) {
			case lookupTable.IdentEnd:
				state = 0;
				break;
			}
			break;
		}
	}

	// construct errorHTML
	var msg = '';
	if (state == 1) {
		// unmatched quotes: find last quote
		var idx = expr.lastIndexOf('\"');
		if (idx>=0) {
			msg = dsGetErrorHTML(19,'Missing quote',expr,idx,expr.length);
		}
	}
	else if (state == 2) {
		// unmatched delimiters: find last delim
		var idx = expr.lastIndexOf(lookupTable.IdentStart);
		if (idx>=0) {
			msg = dsGetErrorHTML(19,'Missing delimiter',expr,idx,expr.length);
		}
	}
	else if (paren != 0) {
		// unbalanced parens: find last (
		var idx = expr.lastIndexOf('(');
		if (idx>=0) {
			msg = dsGetErrorHTML(20,'Unmatched parens',expr,idx,expr.length);
		}
		else {
			idx = expr.lastIndexOf(')');
			msg = dsGetErrorHTML(21,'Unmatched parens',expr,idx,idx+1);
		}
	}

	return msg;
}

var dsFormulaLastError = '';

/// Return error HTML.
function dsGetErrorHTML(code,msg,expr,start,end)
{
	dsFormulaLastError = msg;
	end = ('undefined'==typeof end) ? start+1: end;
	return expr.substring(0,start) + '<span title="'+msg+' (code: '+code+')'+ '" style="color:red;">'+expr.substring(start,end)+'</span>' + expr.substring(end);
}

// lookup tables
var lookupTable = new Object();
lookupTable.BinaryOp = new Object();
lookupTable.UnaryOp = new Object();
lookupTable.BinaryOpChar = new Object();
lookupTable.UnaryOpChar = new Object();
lookupTable.WhiteChar = new Object();
lookupTable.SpecialChar = new Object();

lookupTable.UnaryOp['+'] = true;
lookupTable.UnaryOp['-'] = true;

lookupTable.BinaryOp['+'] = true;
lookupTable.BinaryOp['-'] = true;
lookupTable.BinaryOp['*'] = true;
lookupTable.BinaryOp['/'] = true;
lookupTable.BinaryOp['='] = true;
lookupTable.BinaryOp['>='] = true;
lookupTable.BinaryOp['<='] = true;
lookupTable.BinaryOp['>'] = true;
lookupTable.BinaryOp['<'] = true;
lookupTable.BinaryOp['<>'] = true;

lookupTable.UnaryOpChar['+'] = true;
lookupTable.UnaryOpChar['-'] = true;

lookupTable.BinaryOpChar['+'] = true;
lookupTable.BinaryOpChar['-'] = true;
lookupTable.BinaryOpChar['*'] = true;
lookupTable.BinaryOpChar['/'] = true;
lookupTable.BinaryOpChar['<'] = true;
lookupTable.BinaryOpChar['>'] = true;
lookupTable.BinaryOpChar['='] = true;

lookupTable.SpecialChar[','] = true;
lookupTable.SpecialChar['('] = true;
lookupTable.SpecialChar[')'] = true;

lookupTable.WhiteChar[' '] = true;
lookupTable.WhiteChar['\t'] = true;
lookupTable.WhiteChar['\n'] = true;

// delimited identifier
lookupTable.IdentStart = '[';
lookupTable.IdentEnd = ']';

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
	if (token.toString().charAt(0)=='.') return false;

	if (token=='%' || token=='^') return false;

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

/// test if token is a supported function name
function dsFormulaParser_isFunction(token)
{
	var func = token.toString().toLowerCase();
	switch(func) {
	/* built-in functions */
	case 'if':
	case 'and':
	case 'or':
	case 'concat':
	case 'not':
	case 'round':
	case 'rowno':
	case 'colno':
	case 'sum':
	case 'power':
		return true;
	default:
		// see if function is in funcSet
		if (this.funcSet && ''!= func && this.funcSet[func]) {
			return true;
		}
		break;
	}
	return false;
}

/// Test if op1 has precendence over op2
function testPrecedence(op1,op2)
{
	return (getPrecedence(op1) > getPrecedence(op2));
}

/// Return the precedence value for the given operator.
function getPrecedence(op)
{
	var p = 1;
	switch(op) {
	case '+':
	case '-':
		p = 4;
		break;
	case '*':
	case '/':
		p = 5;
		break;
	}
	return p;
}

/* ------------------------------------------------------------- */
/// Construct an intance of a formula engine.
/// provider is an instance of a dataProvider API that supplies the
/// raw values to the engine.
/// This API must implement the following methods:
/// getCellData
/// getCellRowCount
/// getCellColumnCount
/// getCellColumnName
/// getCellExternalData
function dsFormulaEngine(provider)
{
	this.provider = provider;

	if (provider.getCellRowCount) {
		this.rowCount = provider.getCellRowCount();
		this.colCount = provider.getCellColumnCount();
	}
	else {
		this.rowCount = provider.getDimSize(1);
		this.colCount = provider.getDimSize(2);
	}
	this.currRow = 0;
	this.currCol = 0;

	this.recalc = dsFormulaEngine_recalc;
	this.getCellValue = dsFormulaEngine_getCellValue;
	this.evaluate = dsFormulaEngine_evaluate;
	this.createIndices = dsFormulaEngine_createIndices;
	this.resolveIdent = dsFormulaEngine_resolveIdent;

	// set of unresolved external refs
	this.externalRefs = null;

	// cache of resolved external refs: ref=value
	this.externalValues = {};

	// parser
	this.parser = new dsFormulaParser(this);
	var funcSet = {
	}
	this.parser.setFunctionSet(funcSet);

	// array of results
	this.results = new Array(this.rowCount * this.colCount);
	// !!! stub
	if (this.provider.getCellColumnName) {
		this.createIndices();
	}
}

/// Create row and column indices as needed.
function dsFormulaEngine_createIndices()
{
	this.colNames = {};

	// columns by logical name
	for (var c = 0; c < this.colCount; c++) {
		var name = this.provider.getCellColumnName(c);
		if (name!='') {
			this.colNames[name.toString().toLowerCase()] = c;
		}
	}
}

/// Recalculate the cell values.
function dsFormulaEngine_recalc()
{
	var provider = this.provider;
	if (!provider) {
		alert('Formula engine must be provided with a data prodiver');
		return;
	}

	// adjust sizes
	if (provider.getCellRowCount) {
		this.rowCount = provider.getCellRowCount();
		this.colCount = provider.getCellColumnCount();
	}
	else {
		// stub
		this.rowCount = provider.getDimSize(1);
		this.colCount = provider.getDimSize(2);
	}

	this.results = new Array(this.rowCount * this.colCount);

	// first pass; get all non-formula values and list of formula
	var fmlList = [];
	var value = null;

	for (var r = 0; r < this.rowCount; r++) {
		for (var c = 0; c < this.colCount; c++) {
			var dataColIdx = c;
			if (provider.getColumnInfo) {
				var cInfo = provider.getColumnInfo(c);
				if (cInfo && cInfo._key) {
					var dataColIdx = parseInt(cInfo._key.split(":")[1]);
				}
			}

			// get data from provider
			if (provider.getCellExternalData) {
				// data grid
				var value = provider.getCellData(r,dataColIdx);
			}
			else {
				var value = provider.getData(r, dataColIdx);
			}

			if ('string'==typeof value && value.charAt(0)=='=') {
				// dprow/col indicate what this formula depends on
				fmlList[fmlList.length] = {row:r,col:c,value:value,dprow:-1,dpcol:-1};
			}
			else {
				this.results[(r*this.colCount)+c] = value;
			}
		} // cols
	} // rows

	// now resolve all formulae
	var maxAttempts = (this.colCount * this.rowCount) + 10;
	for (var attempts = 0; attempts < maxAttempts && fmlList.length > 0; attempts++) {
		var calcs = 0;
		this.externalRefs = null;

		for (var n = fmlList.length - 1; n >= 0; n--) {
			var r = fmlList[n].row;
			var c = fmlList[n].col;
			var value = fmlList[n].value;
			this.currRow = r;
			this.currCol = c;
			var nvalue = this.evaluate(value,r,c);
			if (nvalue !== null) {
				this.results[(r*this.colCount)+c] = nvalue;
				fmlList.splice(n,1);
				calcs++;
			}
			else {
				// mark dependency
				fmlList[n].dprow = this.parser.referRow;
				fmlList[n].dpcol = this.parser.referCol;
			}
		}

		// test for external refs
		if (this.externalRefs) {
			if (zenPage.resolveFormulaRefs) {
				// dispatch to container
				zenPage.resolveFormulaRefs(this);
			}
			else {
				for (var ref in this.externalRefs) {
					this.externalValues[ref] = '@context';
				}
			}
		}
		else if (calcs == 0) {
			break;
		}

		// sort fml list by dependencies
		if (attempts==0 && fmlList.length) {
			fmlList.sort(sortFormula);
		}
	}

	// mark remaining values
	for (var n = fmlList.length - 1; n >= 0; n--) {
		var r = fmlList[n].row;
		var c = fmlList[n].col;
		this.results[(r*this.colCount)+c] = '@ref';
	}
}

/// Compare 2 formulas (for sorting)
function sortFormula(a,b)
{
	var test = a.dprow&&b.dprow ? (b.dprow-a.dprow) : 0;
	if (test==0) {
		test = a.dpcol&&b.dpcol ? (a.dpcol-b.dpcol) : 0;
	}
	return test;
}

/// Get resolved value for cell (row,col) (0-based).
function dsFormulaEngine_getCellValue(row,col)
{
	var idx = (parseInt(row)*this.colCount)+parseInt(col);
	return (idx>=this.results.length)?'' : this.results[idx];
}

/// Lookup the value for an ident.
/// Return null if the ident does not exist or is not yet resolved.
/// idents are expected to be enclosed within []
function dsFormulaEngine_resolveIdent(ident,refersTo)
{
	var value;

	// pull apart ident
	if ('['==ident.charAt(0)) {
		var t = [];
		var s = ident.split('].');
		for (var n = 0; n < s.length; n++) {
			t[n] = s[n].substring(1);
			if (t[n].charAt(t[n].length-1) == ']') {
				t[n] = t[n].substring(0,t[n].length-1);
			}
		}

		// now lookup value
		var row = null;
		var col = null;
		switch (t.length) {
		case 1:
			var t0 = t[0].toString();
			if ('@'==t0.charAt(0)) {
				// reference to dataSource data
				// look it up
				var prop = t0.substring(1);
				if (prop!='') {
					// row is absolute row number
					value = this.provider.getCellExternalData ? this.provider.getCellExternalData(this.currRow,prop) : '';
				}
			}
			else if (t0.substr(0,4).toLowerCase()=='$col') {
				var offset = 0
				if (t0.charAt(4)=='#') {
					// absolute
					if (!isNaN(parseInt(t0.substr(5)))) {
						col = parseInt(t0.substr(5)) - 1;
					}
				}
				else {
					if (!isNaN(parseInt(t0.substr(4)))) {
						offset = parseInt(t0.substr(4));
					}
					col = parseInt(this.currCol) + offset;
				}
				row = this.currRow;
			}
			else if (t0.substr(0,4).toLowerCase()=='$row') {
				var offset = 0
				if (t0.charAt(4)=='#') {
					// absolute
					if (!isNaN(parseInt(t0.substr(5)))) {
						row = parseInt(t0.substr(5)) - 1;
					}
				}
				else {
					if (!isNaN(parseInt(t0.substr(4)))) {
						offset = parseInt(t0.substr(4));
					}
					row = parseInt(this.currRow) + offset;
				}
				col = this.currCol;
			}
			else {
				col = this.colNames[t0.toString().toLowerCase()];
			}
			row = (row === null) ? this.currRow : row;
			col = (col=== null) ? this.currCol: col;
			break;
		case 2:
			var t0 = t[0].toString().toLowerCase();
			var t1 = t[1].toString().toLowerCase();
			if (t0.substr(0,4)=='$row') {
				// error: column comes first
				value = '@ERROR';
				break;
			}

			if (t0.substr(0,4)=='$col') {
				if (t0.charAt(4)=='#') {
					if (!isNaN(parseInt(t0.substr(5)))) {
						col = parseInt(t0.substr(5)) - 1;
					}
				}
				else {
					var offset = 0
					if (!isNaN(parseInt(t0.substr(4)))) {
						offset = parseInt(t0.substr(4));
					}
					col = parseInt(this.currCol) + offset;
				}
			}
			else {
				col = this.colNames[t0.toString().toLowerCase()];
			}
			col = (col===null) ? this.currCol: col;

			if (t1.substr(0,4)=='$row') {
				if (t0.charAt(4)=='#') {
					if (!isNaN(parseInt(t1.substr(5)))) {
						row = parseInt(t1.substr(5)) - 1;
					}
				}
				else {
					var offset = 0
					if (!isNaN(parseInt(t1.substr(4)))) {
						offset = parseInt(t1.substr(4));
					}
					row = parseInt(this.currRow) + offset;
				}
			}
			row = (row === null) ? this.currRow : row;
			break;
		case 3:
			// external ref
			// in cache?
			var key = ident.toString().toLowerCase();
			if ('undefined' != typeof this.externalValues[key]) {
				value = this.externalValues[key];
				row = null;
			}
			else {
				if (!this.externalRefs) {
					this.externalRefs = {};
				}
				this.externalRefs[key] = true;
				value = null;
			}
			break;
		default:
			value = '@IDENT';
			break;
		}
	}

	if ('undefined' == typeof value && row!==null && col!==null) {
		// check for out of range ref
		if (row < 0 || col < 0) {
			value = 0;
		}
		else {
			value = this.results[(row*this.colCount)+col];
		}
	}

	if ('undefined' == typeof value) {
		refersTo.row = row;
		refersTo.col = col;
		value = null;
	}
	return value;
}

/// Evaluate a value expression.
function dsFormulaEngine_evaluate(expr,row,col)
{
	var value = null;
	try {
		if ((expr.toString().charAt(0)=='=')) {
			var parser = this.parser;

			this.currRow = row;
			this.currCol = col;

			// remove '=' from start of expression
			parser.parse(expr.toString().substring(1));
			if (parser.errorHTML != '') {
				value = dsFormulaLastError;
			}
			else {
				value = parser.eval();
			}
		}
	}
	catch(ex) {
		zenExceptionHandler(ex,arguments,'Error in Engine.evaluate');
		throw {message:'Error in evaluate method'};
		value = '';
	}
	return value;
}
