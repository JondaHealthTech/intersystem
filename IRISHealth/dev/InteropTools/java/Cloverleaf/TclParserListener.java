// Generated from Cloverleaf/TclParser.g4 by ANTLR 4.7.2
import org.antlr.v4.runtime.tree.ParseTreeListener;

/**
 * This interface defines a complete listener for a parse tree produced by
 * {@link TclParser}.
 */
public interface TclParserListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by {@link TclParser#program}.
	 * @param ctx the parse tree
	 */
	void enterProgram(TclParser.ProgramContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#program}.
	 * @param ctx the parse tree
	 */
	void exitProgram(TclParser.ProgramContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#programimpl}.
	 * @param ctx the parse tree
	 */
	void enterProgramimpl(TclParser.ProgramimplContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#programimpl}.
	 * @param ctx the parse tree
	 */
	void exitProgramimpl(TclParser.ProgramimplContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#commandlike}.
	 * @param ctx the parse tree
	 */
	void enterCommandlike(TclParser.CommandlikeContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#commandlike}.
	 * @param ctx the parse tree
	 */
	void exitCommandlike(TclParser.CommandlikeContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#commandlist}.
	 * @param ctx the parse tree
	 */
	void enterCommandlist(TclParser.CommandlistContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#commandlist}.
	 * @param ctx the parse tree
	 */
	void exitCommandlist(TclParser.CommandlistContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#command}.
	 * @param ctx the parse tree
	 */
	void enterCommand(TclParser.CommandContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#command}.
	 * @param ctx the parse tree
	 */
	void exitCommand(TclParser.CommandContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#comment}.
	 * @param ctx the parse tree
	 */
	void enterComment(TclParser.CommentContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#comment}.
	 * @param ctx the parse tree
	 */
	void exitComment(TclParser.CommentContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#echocommand}.
	 * @param ctx the parse tree
	 */
	void enterEchocommand(TclParser.EchocommandContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#echocommand}.
	 * @param ctx the parse tree
	 */
	void exitEchocommand(TclParser.EchocommandContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#setcommand}.
	 * @param ctx the parse tree
	 */
	void enterSetcommand(TclParser.SetcommandContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#setcommand}.
	 * @param ctx the parse tree
	 */
	void exitSetcommand(TclParser.SetcommandContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#regsubcommand}.
	 * @param ctx the parse tree
	 */
	void enterRegsubcommand(TclParser.RegsubcommandContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#regsubcommand}.
	 * @param ctx the parse tree
	 */
	void exitRegsubcommand(TclParser.RegsubcommandContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#lassigncommand}.
	 * @param ctx the parse tree
	 */
	void enterLassigncommand(TclParser.LassigncommandContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#lassigncommand}.
	 * @param ctx the parse tree
	 */
	void exitLassigncommand(TclParser.LassigncommandContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#incrcommand}.
	 * @param ctx the parse tree
	 */
	void enterIncrcommand(TclParser.IncrcommandContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#incrcommand}.
	 * @param ctx the parse tree
	 */
	void exitIncrcommand(TclParser.IncrcommandContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#ifcommand}.
	 * @param ctx the parse tree
	 */
	void enterIfcommand(TclParser.IfcommandContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#ifcommand}.
	 * @param ctx the parse tree
	 */
	void exitIfcommand(TclParser.IfcommandContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#elseclause}.
	 * @param ctx the parse tree
	 */
	void enterElseclause(TclParser.ElseclauseContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#elseclause}.
	 * @param ctx the parse tree
	 */
	void exitElseclause(TclParser.ElseclauseContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#elseifclause}.
	 * @param ctx the parse tree
	 */
	void enterElseifclause(TclParser.ElseifclauseContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#elseifclause}.
	 * @param ctx the parse tree
	 */
	void exitElseifclause(TclParser.ElseifclauseContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#switchcommand}.
	 * @param ctx the parse tree
	 */
	void enterSwitchcommand(TclParser.SwitchcommandContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#switchcommand}.
	 * @param ctx the parse tree
	 */
	void exitSwitchcommand(TclParser.SwitchcommandContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#switchblock}.
	 * @param ctx the parse tree
	 */
	void enterSwitchblock(TclParser.SwitchblockContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#switchblock}.
	 * @param ctx the parse tree
	 */
	void exitSwitchblock(TclParser.SwitchblockContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#switchcase}.
	 * @param ctx the parse tree
	 */
	void enterSwitchcase(TclParser.SwitchcaseContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#switchcase}.
	 * @param ctx the parse tree
	 */
	void exitSwitchcase(TclParser.SwitchcaseContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#othercommand}.
	 * @param ctx the parse tree
	 */
	void enterOthercommand(TclParser.OthercommandContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#othercommand}.
	 * @param ctx the parse tree
	 */
	void exitOthercommand(TclParser.OthercommandContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#var}.
	 * @param ctx the parse tree
	 */
	void enterVar(TclParser.VarContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#var}.
	 * @param ctx the parse tree
	 */
	void exitVar(TclParser.VarContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#varvalue}.
	 * @param ctx the parse tree
	 */
	void enterVarvalue(TclParser.VarvalueContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#varvalue}.
	 * @param ctx the parse tree
	 */
	void exitVarvalue(TclParser.VarvalueContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#number}.
	 * @param ctx the parse tree
	 */
	void enterNumber(TclParser.NumberContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#number}.
	 * @param ctx the parse tree
	 */
	void exitNumber(TclParser.NumberContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#expr}.
	 * @param ctx the parse tree
	 */
	void enterExpr(TclParser.ExprContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#expr}.
	 * @param ctx the parse tree
	 */
	void exitExpr(TclParser.ExprContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#term}.
	 * @param ctx the parse tree
	 */
	void enterTerm(TclParser.TermContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#term}.
	 * @param ctx the parse tree
	 */
	void exitTerm(TclParser.TermContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#bracketed}.
	 * @param ctx the parse tree
	 */
	void enterBracketed(TclParser.BracketedContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#bracketed}.
	 * @param ctx the parse tree
	 */
	void exitBracketed(TclParser.BracketedContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#braced}.
	 * @param ctx the parse tree
	 */
	void enterBraced(TclParser.BracedContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#braced}.
	 * @param ctx the parse tree
	 */
	void exitBraced(TclParser.BracedContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#parenthesized}.
	 * @param ctx the parse tree
	 */
	void enterParenthesized(TclParser.ParenthesizedContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#parenthesized}.
	 * @param ctx the parse tree
	 */
	void exitParenthesized(TclParser.ParenthesizedContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#braceblock}.
	 * @param ctx the parse tree
	 */
	void enterBraceblock(TclParser.BraceblockContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#braceblock}.
	 * @param ctx the parse tree
	 */
	void exitBraceblock(TclParser.BraceblockContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#string}.
	 * @param ctx the parse tree
	 */
	void enterString(TclParser.StringContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#string}.
	 * @param ctx the parse tree
	 */
	void exitString(TclParser.StringContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#escape}.
	 * @param ctx the parse tree
	 */
	void enterEscape(TclParser.EscapeContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#escape}.
	 * @param ctx the parse tree
	 */
	void exitEscape(TclParser.EscapeContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#flag}.
	 * @param ctx the parse tree
	 */
	void enterFlag(TclParser.FlagContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#flag}.
	 * @param ctx the parse tree
	 */
	void exitFlag(TclParser.FlagContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#dot}.
	 * @param ctx the parse tree
	 */
	void enterDot(TclParser.DotContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#dot}.
	 * @param ctx the parse tree
	 */
	void exitDot(TclParser.DotContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#commalist}.
	 * @param ctx the parse tree
	 */
	void enterCommalist(TclParser.CommalistContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#commalist}.
	 * @param ctx the parse tree
	 */
	void exitCommalist(TclParser.CommalistContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#funcall}.
	 * @param ctx the parse tree
	 */
	void enterFuncall(TclParser.FuncallContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#funcall}.
	 * @param ctx the parse tree
	 */
	void exitFuncall(TclParser.FuncallContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#percentterm}.
	 * @param ctx the parse tree
	 */
	void enterPercentterm(TclParser.PercenttermContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#percentterm}.
	 * @param ctx the parse tree
	 */
	void exitPercentterm(TclParser.PercenttermContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#specialinbraces}.
	 * @param ctx the parse tree
	 */
	void enterSpecialinbraces(TclParser.SpecialinbracesContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#specialinbraces}.
	 * @param ctx the parse tree
	 */
	void exitSpecialinbraces(TclParser.SpecialinbracesContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#regex}.
	 * @param ctx the parse tree
	 */
	void enterRegex(TclParser.RegexContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#regex}.
	 * @param ctx the parse tree
	 */
	void exitRegex(TclParser.RegexContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#regexbody}.
	 * @param ctx the parse tree
	 */
	void enterRegexbody(TclParser.RegexbodyContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#regexbody}.
	 * @param ctx the parse tree
	 */
	void exitRegexbody(TclParser.RegexbodyContext ctx);
	/**
	 * Enter a parse tree produced by {@link TclParser#toendofline}.
	 * @param ctx the parse tree
	 */
	void enterToendofline(TclParser.ToendoflineContext ctx);
	/**
	 * Exit a parse tree produced by {@link TclParser#toendofline}.
	 * @param ctx the parse tree
	 */
	void exitToendofline(TclParser.ToendoflineContext ctx);
}