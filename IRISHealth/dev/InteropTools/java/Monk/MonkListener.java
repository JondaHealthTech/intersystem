// Generated from Monk/Monk.g4 by ANTLR 4.7.2
import org.antlr.v4.runtime.tree.ParseTreeListener;

/**
 * This interface defines a complete listener for a parse tree produced by
 * {@link MonkParser}.
 */
public interface MonkListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by {@link MonkParser#file}.
	 * @param ctx the parse tree
	 */
	void enterFile(MonkParser.FileContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#file}.
	 * @param ctx the parse tree
	 */
	void exitFile(MonkParser.FileContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#form}.
	 * @param ctx the parse tree
	 */
	void enterForm(MonkParser.FormContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#form}.
	 * @param ctx the parse tree
	 */
	void exitForm(MonkParser.FormContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#forms}.
	 * @param ctx the parse tree
	 */
	void enterForms(MonkParser.FormsContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#forms}.
	 * @param ctx the parse tree
	 */
	void exitForms(MonkParser.FormsContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#list}.
	 * @param ctx the parse tree
	 */
	void enterList(MonkParser.ListContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#list}.
	 * @param ctx the parse tree
	 */
	void exitList(MonkParser.ListContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#vector}.
	 * @param ctx the parse tree
	 */
	void enterVector(MonkParser.VectorContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#vector}.
	 * @param ctx the parse tree
	 */
	void exitVector(MonkParser.VectorContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#map}.
	 * @param ctx the parse tree
	 */
	void enterMap(MonkParser.MapContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#map}.
	 * @param ctx the parse tree
	 */
	void exitMap(MonkParser.MapContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#set}.
	 * @param ctx the parse tree
	 */
	void enterSet(MonkParser.SetContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#set}.
	 * @param ctx the parse tree
	 */
	void exitSet(MonkParser.SetContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#reader_macro}.
	 * @param ctx the parse tree
	 */
	void enterReader_macro(MonkParser.Reader_macroContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#reader_macro}.
	 * @param ctx the parse tree
	 */
	void exitReader_macro(MonkParser.Reader_macroContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#quote}.
	 * @param ctx the parse tree
	 */
	void enterQuote(MonkParser.QuoteContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#quote}.
	 * @param ctx the parse tree
	 */
	void exitQuote(MonkParser.QuoteContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#backtick}.
	 * @param ctx the parse tree
	 */
	void enterBacktick(MonkParser.BacktickContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#backtick}.
	 * @param ctx the parse tree
	 */
	void exitBacktick(MonkParser.BacktickContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#unquote}.
	 * @param ctx the parse tree
	 */
	void enterUnquote(MonkParser.UnquoteContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#unquote}.
	 * @param ctx the parse tree
	 */
	void exitUnquote(MonkParser.UnquoteContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#unquote_splicing}.
	 * @param ctx the parse tree
	 */
	void enterUnquote_splicing(MonkParser.Unquote_splicingContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#unquote_splicing}.
	 * @param ctx the parse tree
	 */
	void exitUnquote_splicing(MonkParser.Unquote_splicingContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#tag}.
	 * @param ctx the parse tree
	 */
	void enterTag(MonkParser.TagContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#tag}.
	 * @param ctx the parse tree
	 */
	void exitTag(MonkParser.TagContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#deref}.
	 * @param ctx the parse tree
	 */
	void enterDeref(MonkParser.DerefContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#deref}.
	 * @param ctx the parse tree
	 */
	void exitDeref(MonkParser.DerefContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#gensym}.
	 * @param ctx the parse tree
	 */
	void enterGensym(MonkParser.GensymContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#gensym}.
	 * @param ctx the parse tree
	 */
	void exitGensym(MonkParser.GensymContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#lambda}.
	 * @param ctx the parse tree
	 */
	void enterLambda(MonkParser.LambdaContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#lambda}.
	 * @param ctx the parse tree
	 */
	void exitLambda(MonkParser.LambdaContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#meta_data}.
	 * @param ctx the parse tree
	 */
	void enterMeta_data(MonkParser.Meta_dataContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#meta_data}.
	 * @param ctx the parse tree
	 */
	void exitMeta_data(MonkParser.Meta_dataContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#var_quote}.
	 * @param ctx the parse tree
	 */
	void enterVar_quote(MonkParser.Var_quoteContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#var_quote}.
	 * @param ctx the parse tree
	 */
	void exitVar_quote(MonkParser.Var_quoteContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#host_expr}.
	 * @param ctx the parse tree
	 */
	void enterHost_expr(MonkParser.Host_exprContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#host_expr}.
	 * @param ctx the parse tree
	 */
	void exitHost_expr(MonkParser.Host_exprContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#discard}.
	 * @param ctx the parse tree
	 */
	void enterDiscard(MonkParser.DiscardContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#discard}.
	 * @param ctx the parse tree
	 */
	void exitDiscard(MonkParser.DiscardContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#dispatch}.
	 * @param ctx the parse tree
	 */
	void enterDispatch(MonkParser.DispatchContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#dispatch}.
	 * @param ctx the parse tree
	 */
	void exitDispatch(MonkParser.DispatchContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#regex}.
	 * @param ctx the parse tree
	 */
	void enterRegex(MonkParser.RegexContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#regex}.
	 * @param ctx the parse tree
	 */
	void exitRegex(MonkParser.RegexContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#hash_space}.
	 * @param ctx the parse tree
	 */
	void enterHash_space(MonkParser.Hash_spaceContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#hash_space}.
	 * @param ctx the parse tree
	 */
	void exitHash_space(MonkParser.Hash_spaceContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#hash_uparrow}.
	 * @param ctx the parse tree
	 */
	void enterHash_uparrow(MonkParser.Hash_uparrowContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#hash_uparrow}.
	 * @param ctx the parse tree
	 */
	void exitHash_uparrow(MonkParser.Hash_uparrowContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#hash_excla}.
	 * @param ctx the parse tree
	 */
	void enterHash_excla(MonkParser.Hash_exclaContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#hash_excla}.
	 * @param ctx the parse tree
	 */
	void exitHash_excla(MonkParser.Hash_exclaContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#hash_vbar}.
	 * @param ctx the parse tree
	 */
	void enterHash_vbar(MonkParser.Hash_vbarContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#hash_vbar}.
	 * @param ctx the parse tree
	 */
	void exitHash_vbar(MonkParser.Hash_vbarContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#literal}.
	 * @param ctx the parse tree
	 */
	void enterLiteral(MonkParser.LiteralContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#literal}.
	 * @param ctx the parse tree
	 */
	void exitLiteral(MonkParser.LiteralContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#string}.
	 * @param ctx the parse tree
	 */
	void enterString(MonkParser.StringContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#string}.
	 * @param ctx the parse tree
	 */
	void exitString(MonkParser.StringContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#hex}.
	 * @param ctx the parse tree
	 */
	void enterHex(MonkParser.HexContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#hex}.
	 * @param ctx the parse tree
	 */
	void exitHex(MonkParser.HexContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#bin}.
	 * @param ctx the parse tree
	 */
	void enterBin(MonkParser.BinContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#bin}.
	 * @param ctx the parse tree
	 */
	void exitBin(MonkParser.BinContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#bign}.
	 * @param ctx the parse tree
	 */
	void enterBign(MonkParser.BignContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#bign}.
	 * @param ctx the parse tree
	 */
	void exitBign(MonkParser.BignContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#number}.
	 * @param ctx the parse tree
	 */
	void enterNumber(MonkParser.NumberContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#number}.
	 * @param ctx the parse tree
	 */
	void exitNumber(MonkParser.NumberContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#character}.
	 * @param ctx the parse tree
	 */
	void enterCharacter(MonkParser.CharacterContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#character}.
	 * @param ctx the parse tree
	 */
	void exitCharacter(MonkParser.CharacterContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#named_char}.
	 * @param ctx the parse tree
	 */
	void enterNamed_char(MonkParser.Named_charContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#named_char}.
	 * @param ctx the parse tree
	 */
	void exitNamed_char(MonkParser.Named_charContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#any_char}.
	 * @param ctx the parse tree
	 */
	void enterAny_char(MonkParser.Any_charContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#any_char}.
	 * @param ctx the parse tree
	 */
	void exitAny_char(MonkParser.Any_charContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#u_hex_quad}.
	 * @param ctx the parse tree
	 */
	void enterU_hex_quad(MonkParser.U_hex_quadContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#u_hex_quad}.
	 * @param ctx the parse tree
	 */
	void exitU_hex_quad(MonkParser.U_hex_quadContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#nil}.
	 * @param ctx the parse tree
	 */
	void enterNil(MonkParser.NilContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#nil}.
	 * @param ctx the parse tree
	 */
	void exitNil(MonkParser.NilContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#keyword}.
	 * @param ctx the parse tree
	 */
	void enterKeyword(MonkParser.KeywordContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#keyword}.
	 * @param ctx the parse tree
	 */
	void exitKeyword(MonkParser.KeywordContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#simple_keyword}.
	 * @param ctx the parse tree
	 */
	void enterSimple_keyword(MonkParser.Simple_keywordContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#simple_keyword}.
	 * @param ctx the parse tree
	 */
	void exitSimple_keyword(MonkParser.Simple_keywordContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#macro_keyword}.
	 * @param ctx the parse tree
	 */
	void enterMacro_keyword(MonkParser.Macro_keywordContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#macro_keyword}.
	 * @param ctx the parse tree
	 */
	void exitMacro_keyword(MonkParser.Macro_keywordContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#symbol}.
	 * @param ctx the parse tree
	 */
	void enterSymbol(MonkParser.SymbolContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#symbol}.
	 * @param ctx the parse tree
	 */
	void exitSymbol(MonkParser.SymbolContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#simple_sym}.
	 * @param ctx the parse tree
	 */
	void enterSimple_sym(MonkParser.Simple_symContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#simple_sym}.
	 * @param ctx the parse tree
	 */
	void exitSimple_sym(MonkParser.Simple_symContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#ns_symbol}.
	 * @param ctx the parse tree
	 */
	void enterNs_symbol(MonkParser.Ns_symbolContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#ns_symbol}.
	 * @param ctx the parse tree
	 */
	void exitNs_symbol(MonkParser.Ns_symbolContext ctx);
	/**
	 * Enter a parse tree produced by {@link MonkParser#param_name}.
	 * @param ctx the parse tree
	 */
	void enterParam_name(MonkParser.Param_nameContext ctx);
	/**
	 * Exit a parse tree produced by {@link MonkParser#param_name}.
	 * @param ctx the parse tree
	 */
	void exitParam_name(MonkParser.Param_nameContext ctx);
}