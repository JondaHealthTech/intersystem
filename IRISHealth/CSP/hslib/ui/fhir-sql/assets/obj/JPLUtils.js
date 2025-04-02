/// JPL Expression parsing 
/// API:
///   parseExpression(str):parse a string as a JPL expression and return a parse tree
class JPLUtils {

/// Throw a canned exception message in the event of a parsing error
raiseError(shortForm, token) {
	var msg = "Parse error in JPL expression: "
	if (shortForm=="incomplete") {
		msg += "Statement is incomplete";
	}
	else if (shortForm=="badStart") {
		msg += "Expression fragment must start with '$' or '@'";
	}
	else if (shortForm=="missingKey") {
		msg += "Missing key name";
	}
	else if (shortForm=="missingArrayIdx") {
		msg += "Missing array index value";
	}
	else if (shortForm=="unrecognizedToken") {
		msg += "Unrecognized token in parser list: "+token;
	}
	else if (shortForm=="misusedOp") {
		msg += "Comparison operator character '"+token+"' used out of context";
	}
	else if (shortForm=="unmatchedParens") {
		msg += "Unmatched parenthesis in JPL expression";
	}
	else if (shortForm=="illegalChar") {
		msg += "Illegal character '"+token+"'";
	}
	else if (shortForm=="invalidOp") {
		msg += "Invalid operator '"+token+"'";
	}
	else if (shortForm=="onlyAfterLast") {
		msg += "Index offset operator '-' only valid after token 'last'";
	}
	throw msg;
}

/// Organize a JPL expression into a parse tree. Expressions must 
/// begin with either the root token '$' or the in-line '@' token.
parseExpression(expression) {
	return(this.tokenizeExpression(expression));
}

/// Tokenize a generic JPL expression. Allowed token types are defined
/// in JPLParser.inc
tokenizeExpression(jpl) {
	var parseStack = [];
	var state = 0;
	var parensLevel = 0;
	var token = "";
	
	// STATES
	// 0 - Root
	// 1 - Accessor
	// 2 - Array Accessor
	// 3 - Filter Expression
	
	var expLen = jpl.length
	for (var p=0;p<expLen;p++) {
		var chr=jpl.charAt(p);
			
		// State machine
		if (state==0) {
			// Should only occur at position 0
			if (p==0) {
				// Initial check to make sure the first character is '$'
				if (chr=="$") {
					token = "$";
				}
				else if (chr=="@") {
					// In-statement expressions (eg filter accessors) begin with '@'
					token = "@";
				}
				else {
					this.raiseError("badStart");
				}
				parseStack.push({"type":"JPLRoot","value":(token)});
				token='';
				state = 1;
			}
		}
		else if (state==1) {  // Location
			if (chr=="[") {
				if ((token=="") && (p!=2)) this.raiseError("missingKey");
				parseStack.push({"type":"JPLNode","value":(token)});
				token = "";
				state = 2;
			}
			else if (chr == "?") {
				if (token!="") parseStack.push({"type":"JPLNode","value":(token)});
				token = "";
				state = 3;
			}
			else if (chr == "(") {
				if ((token=="") && (p!=2)) this.raiseError("missingKey");
				parseStack.push({"type":"JPLNode","value":(token)});
				token = "";
				state = 3;
			}
			else if (chr == "!") {
				if (token=="") parseStack.push({"type":"JPLNode","value":(token)});
				token = "";
				parseStack.push({"type":"JPLGlobalValue","value":"!"});
				state = 1;
			}
			else if (chr == ".") {
				if (token!="") parseStack.push({"type":"JPLNode","value":(token)});
				token = "";
				parseStack.push({"type":"JPLSeparator","value":"."});
				state = 1;
			}
			else if (p==expLen-1) {
				token += chr;
				if (token!="") {
					parseStack.push({"type":"JPLNode","value":(token)});
				}
				else {
					this.raiseError("missingKey");
				}
			}
			else {
				token += chr;
			}
				
		}
		else if (state==2) {
			// Array Accessor - This can be 
			//  - a wildcard
			//  - a comma-delimited list of integers
			if (chr==']') {
				var value = this.tokenizeArrayAccessor(token);
				parseStack.push({"type":"JPLArray","value":(value)});					
				token = '';
				state = 1;		// Return to location state
			}
			else if (p==expLen-1) {
				this.raiseError("incomplete");
			}
			else {
				token += chr;
			}
		}
		
		else if (state==3) { // Filters
			if (chr==')') {
				parensLevel -= 1;

				if (parensLevel>0) {
					// Continue collecting the filter expression
					token += chr;
				}
				else {
					// The filter expression is complete, record it for evaluation
					token += chr;	// Include closeing parens in the filter statement
					value = this.tokenizeFilter(token);
					parseStack.push({"type":"JPLFilter","value":(value)});					
					token = '';
					state = 1;	// Return to location state
				}
			}
			else if (chr=='(') {
				// Remember this as the start of the filter expression
				parensLevel += 1;
				token += chr;
			}
			else if (p==expLen-1) {
				this.raiseError("incomplete");
			}
			else {
				token += chr;
			}
		}
		else {
			this.raiseError("parseError");
		}
	}
	parseStack.push({"type":"JPLEnd","value":"<End>"});
	return (parseStack);
}

/// Parse an individual array accessor into a branch of a parse tree
tokenizeArrayAccessor(jpl) {
	// Filter parsing states:
	// 0 - Base state, accepting arguments and operators
	var parseStack = [];
	var expLen = jpl.length;
	var state = 0;
	var token = '';
	var priorToken = '';
	for (var p=0;p<expLen;p++) {
		var chr=jpl.charAt(p);
		if (state==0) {
			if (p==expLen-1) {
				// Add the last character and commit the token as an argument
				token += chr;
				if (token!='') {
					parseStack.push({"type":"JPLSubscript","value":(token)});
					priorToken = token;
					token = '';
				}
			}
			else if (chr=='*') {
				token += chr;
				parseStack.push({"type":"JPLWildcard","value":"*"});
				priorToken = token;
				token = '';
			}
			else if (chr==',') {
				if (token=='') this.raiseError("missingArrayIdx");
				// Accept the previous array index
				parseStack.push({"type":"JPLSubscript","value":(token)})
				priorToken = token;
				token = '';
				parseStack.push({"type":"JPLOp","value":","})
			}
			else if (chr==" ") {
				// Ignore whitespace
			}
			else if (chr.match(/[0-9]/)) {
				token += chr;
			}
			else if (chr=="t") { // Subscript range operator?
				var tmpToken = jpl.substr(p,3);
 				if (tmpToken=="to ") {
 					if (token=='') this.raiseError("missingArrayIdx");
					parseStack.push({"type":"JPLSubscript","value":(token)})
					priorToken = token;
					token = '';
					parseStack.push({"type":"JPLOp","value":":"})
					p += 2;
				}
				else {
					this.raiseError("illegalChar",chr)
				}
			}
			else if (chr=='l') { // special subscript "last"?
				var tmpToken = jpl.substr(p,4);
 				if (tmpToken=="last") {
					parseStack.push({"type":"JPLSubscriptAnchor","value":"last"});
					priorToken = "last";
					token = '';
					p += 3;
				}
				else {
					this.raiseError("illegalChar",chr);
				}
			}
			else if (chr=='-') { // offset operator, only valid after "last"
				if (priorToken=='') this.raiseError("onlyAfterLast");
				priorToken = '';
				token = '';
				parseStack.push({"type":"JPLOp","value":"-"})
			}
			else {
				this.raiseError("illegalChar",chr);
			}
		}
		else {
			this.raiseError("parseError");
		}
	} 
	return (parseStack);
}

/// Parse an individual filter expression into a branch of a parse tree
tokenizeFilter(jpl) {
	// Filter parsing states:
	// 0 - Base state, accepting arguments and operators
	// 1 - Delimited Identifier using '
	// 2 - Delimited identifier using "
	// 3 - Array Accessor
	// 4 - Operand Filter
	
	const lookupTable = {
		"+":1, "-":1, "*":1, "/":1, "=":2, 
		">":1, "<":1, "!":2, "&":2, "|":2,
		"Op": {
			"+":1,  "-":1,  "*":1,  "/":1,
			"==":2, ">=":2, "<=":2, "!=":2,
			">":1,  "<":1,  "&&":2, "||":2
		},
		"Unary":{"+":1,"-":1},
		"Predicates":{
			"starts with":2,
			"exists":2,
			"like_regex":2,
			"is unknown":2,
			"is of type":2
		}
	};
	const predicates = lookupTable.Predicates;
	const numPredicates = 5;
	
	var parensDepth = 0;	// Record the current depth of nested parentheses for nested operations
	var filterParensLevel = 0;
	var parseStack = [];
	var expLen = jpl.length;
	var state = 0;
	var token = '';
	var priorToken = ""
	for (var p=0;p<expLen;p++) {
		var chr=jpl.charAt(p);		
		if (state==0) { // Base state
			if (lookupTable[chr]) {
				// Commit any current token
				if (token!='') parseStack.push({"type":"JPLArg","value":(token)});
				priorToken = token;
				token = '';
				
				var operators = lookupTable.Op;
				var tmpToken = jpl.substr(p,2);	
				if (operators[tmpToken]) {
					// A two-character operator is present
					token = tmpToken;
					// Advance the position after looking ahead
					p += 1;
					parseStack.push({"type":"JPLOp","value":(token)});
					priorToken = token;
					token = '';
				}
				else if (operators[chr]) {
					// If the last token was an operator, see if this is a unary operator that should be
					// included as part of the operand
					var unaryOps = lookupTable.Unary;
					if ((unaryOps[chr])&&((operators[priorToken])||(priorToken=='('))){
						// Just accumulate the token and continue in this case
						token = chr;
					}
					else {
						// A single-character binary operator is present
						token = chr;
						parseStack.push({"type":"JPLOp","value":(token)})
						priorToken = token;
						token = '';
					}
				}
				else {
					// This character should be a two-character operator, but is
					// found by itself. Report an error.
					this.raiseError("invalidOp",chr);
				}
			}
			else if (chr==' ') {
				// Ignore white space in the 0 state
				// But check to see if it is the lead-in to a special
				// predicate

				for (var pKey in predicates) {
					var pValue = predicates[pKey];
					var tmpStr = jpl.substr(p+1,pKey.length);
					if (tmpStr==pKey) {
						if (token!='') parseStack.push({"type":"JPLArg","value":(token)});
						priorToken = token;
						token = tmpStr;
						parseStack.push({"type":"JPLOp","value":(token)});
						priorToken = token;
						token = '';
						p += pKey.length+1;
					}
				}
			}
			else if (chr=="'") {
				// Open a '-delimited identifier
				token += chr;
				state = 1;
			}
			else if (chr=='"') {
				// Open a "-delimited identifier
				token += chr;
				state = 2;
			}
			else if (chr=='(') {
				parseStack.push({"type":"JPLOpenParen","value":"("});
				priorToken = '(';
				token = '';
				parensDepth += 1;
			}
			else if (chr==')') {
				if (token!='') parseStack.push({"type":"JPLArg","value":(token)});
				priorToken = token;
				token = '';	
				parensDepth -= 1;
				if (parensDepth<0) {
					this.raiseError("unmatchedParens");
				}
				// Log the parens token
				parseStack.push({"type":"JPLCloseParen","value":")"});
				priorToken = chr;
				token = '';
			}
			else if (chr=='[') {
				// Array accessor state
				token += chr;
				state = 3;
			}
			else if (chr=='?') {
				// Filtered argument state
				token += chr;
				state = 4;
			}
			else if (p==expLen-1) {
				// Add the last character and commit the token as an argument
				token += chr;
				if (token!='') parseStack.push({"type":"JPLArg","value":(token)});
				priorToken = token;
				token = '';
				if (parensDepth>0) {
					this.raiseError("unmatchedParens");
				}
			}
			else {
				// Accept this character as part of the token
				token += chr;
			}
		} // End state 0 [No special considerations]
		else if (state==1) {
			// Delimited using single quote ['] - accept every character other than another single quote
			// Single quotes may be double-escaped to continue without closing the quote
			if ((chr=="'")&&(jpl.charAt(p+1)=="'")) {
				p += 1;
				token += "''";
				state = 0;
			}
			else if (chr=="'") { 
				// Close the single quote
				token += chr;
				state = 0;
			}
			else if (p==expLen-1) {
				// If we have ended with an unhandled character in this state,
				// throw an exception.
				this.raiseError("incomplete")
			}
			else {
				token += chr;
			}
		} // End state 1 [single quote delimited]
		else if (state==2) {
			// Delimited using double quotes ["] - accept every character other than another double quote
			// Double quotes may be double-escaped to continue without closing the quote
			if ((chr=='"')&&(jpl.charAt(p+1)=='"')) {
				p += 1;
				token += '""';
			}
			else if (chr=='"') { 
				// Close the double quote
				token += chr;
				state = 0;
			}
			else if (p==expLen-1) {
				// If we have ended with an unhandled character in this state,
				// throw an exception.
				this.raiseError("incomplete");
			}
			else {
				token += chr;
			}
		} // End state 2 [double quote delimited]
		else if (state==3) {
			// Array Accessor state
			// This is accumulated as another expression which needs to be recursively parsed
			if (chr==']') {
				var value = this.tokenizeArrayAccessor(token);
				parseStack.push({"type":"JPLArray","value":(value)});					
				token = '';
				priorToken = ']';
				state = 0;
			}
			else if (p==expLen-1) {
				// If we have ended with an unhandled character in this state,
				// throw an exception.
				this.raiseError("incomplete");
			}
			else {
				token += chr;
			}
		} // End state 3 [array accessor]
		else if (state==4) {
			// Filter State
			// This is accumulated as another expression which needs to be recursively parsed
			if (chr==')') {
				filterParensLevel -= 1;
				if (filterParensLevel>0) {
					// Continue collecting the filter expression
					token += chr;
				}
				else {
					// The filter expression is complete, record it for evaluation
					token += chr;	// Include closing parens in the filter statement
					var value = this.tokenizeFilter(token);
					parseStack.push({"type":"JPLArg","value":(value)});					
					priorToken = token;
					token = '';
					state = 0;	// Return to base state
				}
			}
			else if (chr=='(') {
				// Remember this as the start of the filter expression
				filterParensLevel += 1;
				token += chr;
			}
			else if (p==expLen-1) {
				// If we have ended with an unhandled character in this state,
				// throw an exception.
				this.raiseError("incomplete");
			}
			else {
				token += chr;
			}
		} // End state 4 [filter]
		else {
			this.raiseError("parseError");
		}
	}	
	return (this.convertInfixToRPM(parseStack));
}

convertInfixToRPM(tokens) {
	const precedence = { "*":4,  "/":4,  "+":3,  "-":3,
			     "==":2, "!=":2, ">=":2, "<=":2, "<":2, ">":2,
			     "&&":1, "||":1 };
					   
	var opStack = [];
	var output = [];
	for (var key in tokens) {
		var token = tokens[key];
		var type = token.type;
		var nodeValue = token.value;
		if (type=="JPLArg") {
			output.push(token);
		}
		// Should do function tokens and function arg separators here
		else if (type=="JPLOp") {
			var done = false;
			var op1Prec = precedence[nodeValue];
			while ((!done)&&(opStack.length>0)) {
				var op2 = opStack.pop();
				if (op2=='(') {
					done=true;
				}
				else {
					var op2Prec = precedence[op2.value];
					if (op1Prec <= op2Prec) {
						output.push(op2);
					}
					else {
						done = true;
						opStack.push(op2);
					}
				}
			}
			opStack.push(token);
		}
		else if (type=="JPLOpenParen") {
			opStack.push('(')
		}
		else if (type=="JPLCloseParen") {
			done=false
			while ((!done)&&(opStack.length>0)) {
				var op = opStack.pop();
				if (op=='(') {
					done=true;
				}
				else {
					output.push(op);
				}
			}
		}	
	}
	while (opStack.length>0) {
		var op = opStack.pop();
		output.push(op);
	}
	return(output);
}

/// Given a fully qualified path, return just the base elements without filters
getBasePath(qPath) {
	const tree = this.parseExpression(qPath);
	var str = "";
	var len = tree.length;
	for (var i=0;i<len;i++) {
		var node = tree[i];
		if (!((node.type=="JPLFilter")||(node.type=='JPLEnd'))) str+=node.value;
	}
	return(str);
};

/// Given a parse tree, convert it back to a JPL expression
exportPath(parseTree) {
	var str = "";
	var len = parseTree.length;
	for (var i=0;i<len;i++) {
		var n = parseTree[i];
		if (!((n.type=='JPLFilter')||(n.type=='JPLEnd'))) str+=n.value;
		else if (n.type=='JPLFilter') {
			str+='?';
			var exper = '';
			var stack = [];
			for (var cIdx = 0;cIdx<n.value.length;cIdx++) {
				var cn = n.value[cIdx];
				if (cn.type=='JPLArg') stack.push(cn.value);
				else if (cn.type=='JPLOp') {
					var a2 = stack.pop();
					if (a2=='') a2="''";
					else if((typeof(a2)=='string')&&(!((a2.indexOf("'")==0)||(a2.indexOf('"')==0)))) a2 = "'"+a2+"'";
					var a1 = stack.pop();
					var spacer = ''; // word based operators need whitespace
					if ("seli".indexOf(cn.value.charAt(0))>-1) spacer=' ';
					str+='('+a1+spacer+cn.value+spacer+a2+')';
				}
			}
		}
 	}
	return(str);
};


};

window.$defined_JPLUtils = true;

