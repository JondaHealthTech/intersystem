// Generated from Cloverleaf/CloverleafParser.g4 by ANTLR 4.7.2
import org.antlr.v4.runtime.tree.ParseTreeListener;

/**
 * This interface defines a complete listener for a parse tree produced by
 * {@link CloverleafParser}.
 */
public interface CloverleafParserListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#program}.
	 * @param ctx the parse tree
	 */
	void enterProgram(CloverleafParser.ProgramContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#program}.
	 * @param ctx the parse tree
	 */
	void exitProgram(CloverleafParser.ProgramContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#prologue}.
	 * @param ctx the parse tree
	 */
	void enterPrologue(CloverleafParser.PrologueContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#prologue}.
	 * @param ctx the parse tree
	 */
	void exitPrologue(CloverleafParser.PrologueContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#pblock}.
	 * @param ctx the parse tree
	 */
	void enterPblock(CloverleafParser.PblockContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#pblock}.
	 * @param ctx the parse tree
	 */
	void exitPblock(CloverleafParser.PblockContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#wrappedpblocks}.
	 * @param ctx the parse tree
	 */
	void enterWrappedpblocks(CloverleafParser.WrappedpblocksContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#wrappedpblocks}.
	 * @param ctx the parse tree
	 */
	void exitWrappedpblocks(CloverleafParser.WrappedpblocksContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#bodyitem}.
	 * @param ctx the parse tree
	 */
	void enterBodyitem(CloverleafParser.BodyitemContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#bodyitem}.
	 * @param ctx the parse tree
	 */
	void exitBodyitem(CloverleafParser.BodyitemContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#opcomment}.
	 * @param ctx the parse tree
	 */
	void enterOpcomment(CloverleafParser.OpcommentContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#opcomment}.
	 * @param ctx the parse tree
	 */
	void exitOpcomment(CloverleafParser.OpcommentContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#commentrem}.
	 * @param ctx the parse tree
	 */
	void enterCommentrem(CloverleafParser.CommentremContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#commentrem}.
	 * @param ctx the parse tree
	 */
	void exitCommentrem(CloverleafParser.CommentremContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#commentpart}.
	 * @param ctx the parse tree
	 */
	void enterCommentpart(CloverleafParser.CommentpartContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#commentpart}.
	 * @param ctx the parse tree
	 */
	void exitCommentpart(CloverleafParser.CommentpartContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#opcopy}.
	 * @param ctx the parse tree
	 */
	void enterOpcopy(CloverleafParser.OpcopyContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#opcopy}.
	 * @param ctx the parse tree
	 */
	void exitOpcopy(CloverleafParser.OpcopyContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#opstring}.
	 * @param ctx the parse tree
	 */
	void enterOpstring(CloverleafParser.OpstringContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#opstring}.
	 * @param ctx the parse tree
	 */
	void exitOpstring(CloverleafParser.OpstringContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#opbulkcopy}.
	 * @param ctx the parse tree
	 */
	void enterOpbulkcopy(CloverleafParser.OpbulkcopyContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#opbulkcopy}.
	 * @param ctx the parse tree
	 */
	void exitOpbulkcopy(CloverleafParser.OpbulkcopyContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#optable}.
	 * @param ctx the parse tree
	 */
	void enterOptable(CloverleafParser.OptableContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#optable}.
	 * @param ctx the parse tree
	 */
	void exitOptable(CloverleafParser.OptableContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#oppathcopy}.
	 * @param ctx the parse tree
	 */
	void enterOppathcopy(CloverleafParser.OppathcopyContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#oppathcopy}.
	 * @param ctx the parse tree
	 */
	void exitOppathcopy(CloverleafParser.OppathcopyContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#opdatecopyopt}.
	 * @param ctx the parse tree
	 */
	void enterOpdatecopyopt(CloverleafParser.OpdatecopyoptContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#opdatecopyopt}.
	 * @param ctx the parse tree
	 */
	void exitOpdatecopyopt(CloverleafParser.OpdatecopyoptContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#opiterate}.
	 * @param ctx the parse tree
	 */
	void enterOpiterate(CloverleafParser.OpiterateContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#opiterate}.
	 * @param ctx the parse tree
	 */
	void exitOpiterate(CloverleafParser.OpiterateContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#opadd}.
	 * @param ctx the parse tree
	 */
	void enterOpadd(CloverleafParser.OpaddContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#opadd}.
	 * @param ctx the parse tree
	 */
	void exitOpadd(CloverleafParser.OpaddContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#opcontinue}.
	 * @param ctx the parse tree
	 */
	void enterOpcontinue(CloverleafParser.OpcontinueContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#opcontinue}.
	 * @param ctx the parse tree
	 */
	void exitOpcontinue(CloverleafParser.OpcontinueContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#opsuppress}.
	 * @param ctx the parse tree
	 */
	void enterOpsuppress(CloverleafParser.OpsuppressContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#opsuppress}.
	 * @param ctx the parse tree
	 */
	void exitOpsuppress(CloverleafParser.OpsuppressContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#opsend}.
	 * @param ctx the parse tree
	 */
	void enterOpsend(CloverleafParser.OpsendContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#opsend}.
	 * @param ctx the parse tree
	 */
	void exitOpsend(CloverleafParser.OpsendContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#opsub}.
	 * @param ctx the parse tree
	 */
	void enterOpsub(CloverleafParser.OpsubContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#opsub}.
	 * @param ctx the parse tree
	 */
	void exitOpsub(CloverleafParser.OpsubContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#opcall}.
	 * @param ctx the parse tree
	 */
	void enterOpcall(CloverleafParser.OpcallContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#opcall}.
	 * @param ctx the parse tree
	 */
	void exitOpcall(CloverleafParser.OpcallContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#opmul}.
	 * @param ctx the parse tree
	 */
	void enterOpmul(CloverleafParser.OpmulContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#opmul}.
	 * @param ctx the parse tree
	 */
	void exitOpmul(CloverleafParser.OpmulContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#opif}.
	 * @param ctx the parse tree
	 */
	void enterOpif(CloverleafParser.OpifContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#opif}.
	 * @param ctx the parse tree
	 */
	void exitOpif(CloverleafParser.OpifContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#vdoc}.
	 * @param ctx the parse tree
	 */
	void enterVdoc(CloverleafParser.VdocContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#vdoc}.
	 * @param ctx the parse tree
	 */
	void exitVdoc(CloverleafParser.VdocContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#term}.
	 * @param ctx the parse tree
	 */
	void enterTerm(CloverleafParser.TermContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#term}.
	 * @param ctx the parse tree
	 */
	void exitTerm(CloverleafParser.TermContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#primary}.
	 * @param ctx the parse tree
	 */
	void enterPrimary(CloverleafParser.PrimaryContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#primary}.
	 * @param ctx the parse tree
	 */
	void exitPrimary(CloverleafParser.PrimaryContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#openparen}.
	 * @param ctx the parse tree
	 */
	void enterOpenparen(CloverleafParser.OpenparenContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#openparen}.
	 * @param ctx the parse tree
	 */
	void exitOpenparen(CloverleafParser.OpenparenContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#closeparen}.
	 * @param ctx the parse tree
	 */
	void enterCloseparen(CloverleafParser.CloseparenContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#closeparen}.
	 * @param ctx the parse tree
	 */
	void exitCloseparen(CloverleafParser.CloseparenContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#relexpr}.
	 * @param ctx the parse tree
	 */
	void enterRelexpr(CloverleafParser.RelexprContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#relexpr}.
	 * @param ctx the parse tree
	 */
	void exitRelexpr(CloverleafParser.RelexprContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#logexpr}.
	 * @param ctx the parse tree
	 */
	void enterLogexpr(CloverleafParser.LogexprContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#logexpr}.
	 * @param ctx the parse tree
	 */
	void exitLogexpr(CloverleafParser.LogexprContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#block}.
	 * @param ctx the parse tree
	 */
	void enterBlock(CloverleafParser.BlockContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#block}.
	 * @param ctx the parse tree
	 */
	void exitBlock(CloverleafParser.BlockContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#callterm}.
	 * @param ctx the parse tree
	 */
	void enterCallterm(CloverleafParser.CalltermContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#callterm}.
	 * @param ctx the parse tree
	 */
	void exitCallterm(CloverleafParser.CalltermContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#tableref}.
	 * @param ctx the parse tree
	 */
	void enterTableref(CloverleafParser.TablerefContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#tableref}.
	 * @param ctx the parse tree
	 */
	void exitTableref(CloverleafParser.TablerefContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#instr}.
	 * @param ctx the parse tree
	 */
	void enterInstr(CloverleafParser.InstrContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#instr}.
	 * @param ctx the parse tree
	 */
	void exitInstr(CloverleafParser.InstrContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#instrbody}.
	 * @param ctx the parse tree
	 */
	void enterInstrbody(CloverleafParser.InstrbodyContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#instrbody}.
	 * @param ctx the parse tree
	 */
	void exitInstrbody(CloverleafParser.InstrbodyContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#errinstr}.
	 * @param ctx the parse tree
	 */
	void enterErrinstr(CloverleafParser.ErrinstrContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#errinstr}.
	 * @param ctx the parse tree
	 */
	void exitErrinstr(CloverleafParser.ErrinstrContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#outinstr}.
	 * @param ctx the parse tree
	 */
	void enterOutinstr(CloverleafParser.OutinstrContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#outinstr}.
	 * @param ctx the parse tree
	 */
	void exitOutinstr(CloverleafParser.OutinstrContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#ininstr}.
	 * @param ctx the parse tree
	 */
	void enterIninstr(CloverleafParser.IninstrContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#ininstr}.
	 * @param ctx the parse tree
	 */
	void exitIninstr(CloverleafParser.IninstrContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#termblock}.
	 * @param ctx the parse tree
	 */
	void enterTermblock(CloverleafParser.TermblockContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#termblock}.
	 * @param ctx the parse tree
	 */
	void exitTermblock(CloverleafParser.TermblockContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#tblinstr}.
	 * @param ctx the parse tree
	 */
	void enterTblinstr(CloverleafParser.TblinstrContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#tblinstr}.
	 * @param ctx the parse tree
	 */
	void exitTblinstr(CloverleafParser.TblinstrContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#sideinstr}.
	 * @param ctx the parse tree
	 */
	void enterSideinstr(CloverleafParser.SideinstrContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#sideinstr}.
	 * @param ctx the parse tree
	 */
	void exitSideinstr(CloverleafParser.SideinstrContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#preinstr}.
	 * @param ctx the parse tree
	 */
	void enterPreinstr(CloverleafParser.PreinstrContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#preinstr}.
	 * @param ctx the parse tree
	 */
	void exitPreinstr(CloverleafParser.PreinstrContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#preblock}.
	 * @param ctx the parse tree
	 */
	void enterPreblock(CloverleafParser.PreblockContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#preblock}.
	 * @param ctx the parse tree
	 */
	void exitPreblock(CloverleafParser.PreblockContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#preblockbody}.
	 * @param ctx the parse tree
	 */
	void enterPreblockbody(CloverleafParser.PreblockbodyContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#preblockbody}.
	 * @param ctx the parse tree
	 */
	void exitPreblockbody(CloverleafParser.PreblockbodyContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#preblockitem}.
	 * @param ctx the parse tree
	 */
	void enterPreblockitem(CloverleafParser.PreblockitemContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#preblockitem}.
	 * @param ctx the parse tree
	 */
	void exitPreblockitem(CloverleafParser.PreblockitemContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#reminstr}.
	 * @param ctx the parse tree
	 */
	void enterReminstr(CloverleafParser.ReminstrContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#reminstr}.
	 * @param ctx the parse tree
	 */
	void exitReminstr(CloverleafParser.ReminstrContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#addprecinstr}.
	 * @param ctx the parse tree
	 */
	void enterAddprecinstr(CloverleafParser.AddprecinstrContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#addprecinstr}.
	 * @param ctx the parse tree
	 */
	void exitAddprecinstr(CloverleafParser.AddprecinstrContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#fabricateinstr}.
	 * @param ctx the parse tree
	 */
	void enterFabricateinstr(CloverleafParser.FabricateinstrContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#fabricateinstr}.
	 * @param ctx the parse tree
	 */
	void exitFabricateinstr(CloverleafParser.FabricateinstrContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#usecurtminstr}.
	 * @param ctx the parse tree
	 */
	void enterUsecurtminstr(CloverleafParser.UsecurtminstrContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#usecurtminstr}.
	 * @param ctx the parse tree
	 */
	void exitUsecurtminstr(CloverleafParser.UsecurtminstrContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#rangeinstr}.
	 * @param ctx the parse tree
	 */
	void enterRangeinstr(CloverleafParser.RangeinstrContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#rangeinstr}.
	 * @param ctx the parse tree
	 */
	void exitRangeinstr(CloverleafParser.RangeinstrContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#tmdefsinstr}.
	 * @param ctx the parse tree
	 */
	void enterTmdefsinstr(CloverleafParser.TmdefsinstrContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#tmdefsinstr}.
	 * @param ctx the parse tree
	 */
	void exitTmdefsinstr(CloverleafParser.TmdefsinstrContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#delimitinstr}.
	 * @param ctx the parse tree
	 */
	void enterDelimitinstr(CloverleafParser.DelimitinstrContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#delimitinstr}.
	 * @param ctx the parse tree
	 */
	void exitDelimitinstr(CloverleafParser.DelimitinstrContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#basisinstr}.
	 * @param ctx the parse tree
	 */
	void enterBasisinstr(CloverleafParser.BasisinstrContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#basisinstr}.
	 * @param ctx the parse tree
	 */
	void exitBasisinstr(CloverleafParser.BasisinstrContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#varinstr}.
	 * @param ctx the parse tree
	 */
	void enterVarinstr(CloverleafParser.VarinstrContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#varinstr}.
	 * @param ctx the parse tree
	 */
	void exitVarinstr(CloverleafParser.VarinstrContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#typeinstr}.
	 * @param ctx the parse tree
	 */
	void enterTypeinstr(CloverleafParser.TypeinstrContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#typeinstr}.
	 * @param ctx the parse tree
	 */
	void exitTypeinstr(CloverleafParser.TypeinstrContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#bodyinstr}.
	 * @param ctx the parse tree
	 */
	void enterBodyinstr(CloverleafParser.BodyinstrContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#bodyinstr}.
	 * @param ctx the parse tree
	 */
	void exitBodyinstr(CloverleafParser.BodyinstrContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#copysepinstr}.
	 * @param ctx the parse tree
	 */
	void enterCopysepinstr(CloverleafParser.CopysepinstrContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#copysepinstr}.
	 * @param ctx the parse tree
	 */
	void exitCopysepinstr(CloverleafParser.CopysepinstrContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#functioninstr}.
	 * @param ctx the parse tree
	 */
	void enterFunctioninstr(CloverleafParser.FunctioninstrContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#functioninstr}.
	 * @param ctx the parse tree
	 */
	void exitFunctioninstr(CloverleafParser.FunctioninstrContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#dfltinstr}.
	 * @param ctx the parse tree
	 */
	void enterDfltinstr(CloverleafParser.DfltinstrContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#dfltinstr}.
	 * @param ctx the parse tree
	 */
	void exitDfltinstr(CloverleafParser.DfltinstrContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#tclinstr}.
	 * @param ctx the parse tree
	 */
	void enterTclinstr(CloverleafParser.TclinstrContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#tclinstr}.
	 * @param ctx the parse tree
	 */
	void exitTclinstr(CloverleafParser.TclinstrContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#postinstr}.
	 * @param ctx the parse tree
	 */
	void enterPostinstr(CloverleafParser.PostinstrContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#postinstr}.
	 * @param ctx the parse tree
	 */
	void exitPostinstr(CloverleafParser.PostinstrContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#ifinstr}.
	 * @param ctx the parse tree
	 */
	void enterIfinstr(CloverleafParser.IfinstrContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#ifinstr}.
	 * @param ctx the parse tree
	 */
	void exitIfinstr(CloverleafParser.IfinstrContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#ifinstrbody}.
	 * @param ctx the parse tree
	 */
	void enterIfinstrbody(CloverleafParser.IfinstrbodyContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#ifinstrbody}.
	 * @param ctx the parse tree
	 */
	void exitIfinstrbody(CloverleafParser.IfinstrbodyContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#condinstr}.
	 * @param ctx the parse tree
	 */
	void enterCondinstr(CloverleafParser.CondinstrContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#condinstr}.
	 * @param ctx the parse tree
	 */
	void exitCondinstr(CloverleafParser.CondinstrContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#theninstr}.
	 * @param ctx the parse tree
	 */
	void enterTheninstr(CloverleafParser.TheninstrContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#theninstr}.
	 * @param ctx the parse tree
	 */
	void exitTheninstr(CloverleafParser.TheninstrContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#elseinstr}.
	 * @param ctx the parse tree
	 */
	void enterElseinstr(CloverleafParser.ElseinstrContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#elseinstr}.
	 * @param ctx the parse tree
	 */
	void exitElseinstr(CloverleafParser.ElseinstrContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#condterm}.
	 * @param ctx the parse tree
	 */
	void enterCondterm(CloverleafParser.CondtermContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#condterm}.
	 * @param ctx the parse tree
	 */
	void exitCondterm(CloverleafParser.CondtermContext ctx);
	/**
	 * Enter a parse tree produced by {@link CloverleafParser#words}.
	 * @param ctx the parse tree
	 */
	void enterWords(CloverleafParser.WordsContext ctx);
	/**
	 * Exit a parse tree produced by {@link CloverleafParser#words}.
	 * @param ctx the parse tree
	 */
	void exitWords(CloverleafParser.WordsContext ctx);
}