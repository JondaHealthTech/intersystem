// Generated from Monk/Monk.g4 by ANTLR 4.7.2
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class MonkParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.7.2", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, T__1=2, T__2=3, T__3=4, T__4=5, T__5=6, T__6=7, T__7=8, T__8=9, 
		T__9=10, T__10=11, T__11=12, T__12=13, T__13=14, T__14=15, T__15=16, T__16=17, 
		T__17=18, T__18=19, T__19=20, T__20=21, T__21=22, T__22=23, T__23=24, 
		STRING=25, FLOAT=26, HEX=27, BIN=28, LONG=29, BIGN=30, CHAR_U=31, CHAR_NAMED=32, 
		CHAR_ANY=33, NIL=34, BOOLEAN=35, SYMBOL=36, NS_SYMBOL=37, PARAM_NAME=38, 
		TRASH=39;
	public static final int
		RULE_file = 0, RULE_form = 1, RULE_forms = 2, RULE_list = 3, RULE_vector = 4, 
		RULE_map = 5, RULE_set = 6, RULE_reader_macro = 7, RULE_quote = 8, RULE_backtick = 9, 
		RULE_unquote = 10, RULE_unquote_splicing = 11, RULE_tag = 12, RULE_deref = 13, 
		RULE_gensym = 14, RULE_lambda = 15, RULE_meta_data = 16, RULE_var_quote = 17, 
		RULE_host_expr = 18, RULE_discard = 19, RULE_dispatch = 20, RULE_regex = 21, 
		RULE_hash_space = 22, RULE_hash_uparrow = 23, RULE_hash_excla = 24, RULE_hash_vbar = 25, 
		RULE_literal = 26, RULE_string = 27, RULE_hex = 28, RULE_bin = 29, RULE_bign = 30, 
		RULE_number = 31, RULE_character = 32, RULE_named_char = 33, RULE_any_char = 34, 
		RULE_u_hex_quad = 35, RULE_nil = 36, RULE_keyword = 37, RULE_simple_keyword = 38, 
		RULE_macro_keyword = 39, RULE_symbol = 40, RULE_simple_sym = 41, RULE_ns_symbol = 42, 
		RULE_param_name = 43;
	private static String[] makeRuleNames() {
		return new String[] {
			"file", "form", "forms", "list", "vector", "map", "set", "reader_macro", 
			"quote", "backtick", "unquote", "unquote_splicing", "tag", "deref", "gensym", 
			"lambda", "meta_data", "var_quote", "host_expr", "discard", "dispatch", 
			"regex", "hash_space", "hash_uparrow", "hash_excla", "hash_vbar", "literal", 
			"string", "hex", "bin", "bign", "number", "character", "named_char", 
			"any_char", "u_hex_quad", "nil", "keyword", "simple_keyword", "macro_keyword", 
			"symbol", "simple_sym", "ns_symbol", "param_name"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "'('", "')'", "'['", "']'", "'{'", "'}'", "'#{'", "'''", "'`'", 
			"'~'", "'~@'", "'^'", "'@'", "'#'", "'#('", "'#^'", "'#''", "'#+'", "'#_'", 
			"'#\\space'", "'#\\^'", "'#\\!'", "'#\\|'", "':'", null, null, null, 
			null, null, null, null, null, null, "'nil'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, "STRING", "FLOAT", "HEX", "BIN", "LONG", "BIGN", "CHAR_U", "CHAR_NAMED", 
			"CHAR_ANY", "NIL", "BOOLEAN", "SYMBOL", "NS_SYMBOL", "PARAM_NAME", "TRASH"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "Monk.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public MonkParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	public static class FileContext extends ParserRuleContext {
		public TerminalNode EOF() { return getToken(MonkParser.EOF, 0); }
		public List<FormContext> form() {
			return getRuleContexts(FormContext.class);
		}
		public FormContext form(int i) {
			return getRuleContext(FormContext.class,i);
		}
		public FileContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_file; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterFile(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitFile(this);
		}
	}

	public final FileContext file() throws RecognitionException {
		FileContext _localctx = new FileContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_file);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(91);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__0) | (1L << T__2) | (1L << T__4) | (1L << T__6) | (1L << T__7) | (1L << T__8) | (1L << T__9) | (1L << T__10) | (1L << T__11) | (1L << T__12) | (1L << T__13) | (1L << T__14) | (1L << T__15) | (1L << T__16) | (1L << T__17) | (1L << T__18) | (1L << T__19) | (1L << T__20) | (1L << T__21) | (1L << T__22) | (1L << T__23) | (1L << STRING) | (1L << FLOAT) | (1L << HEX) | (1L << BIN) | (1L << LONG) | (1L << BIGN) | (1L << CHAR_U) | (1L << CHAR_NAMED) | (1L << CHAR_ANY) | (1L << NIL) | (1L << BOOLEAN) | (1L << SYMBOL) | (1L << NS_SYMBOL) | (1L << PARAM_NAME))) != 0)) {
				{
				{
				setState(88);
				form();
				}
				}
				setState(93);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(94);
			match(EOF);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class FormContext extends ParserRuleContext {
		public LiteralContext literal() {
			return getRuleContext(LiteralContext.class,0);
		}
		public ListContext list() {
			return getRuleContext(ListContext.class,0);
		}
		public VectorContext vector() {
			return getRuleContext(VectorContext.class,0);
		}
		public MapContext map() {
			return getRuleContext(MapContext.class,0);
		}
		public Reader_macroContext reader_macro() {
			return getRuleContext(Reader_macroContext.class,0);
		}
		public FormContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_form; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterForm(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitForm(this);
		}
	}

	public final FormContext form() throws RecognitionException {
		FormContext _localctx = new FormContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_form);
		try {
			setState(101);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,1,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(96);
				literal();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(97);
				list();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(98);
				vector();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(99);
				map();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(100);
				reader_macro();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class FormsContext extends ParserRuleContext {
		public List<FormContext> form() {
			return getRuleContexts(FormContext.class);
		}
		public FormContext form(int i) {
			return getRuleContext(FormContext.class,i);
		}
		public FormsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_forms; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterForms(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitForms(this);
		}
	}

	public final FormsContext forms() throws RecognitionException {
		FormsContext _localctx = new FormsContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_forms);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(106);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__0) | (1L << T__2) | (1L << T__4) | (1L << T__6) | (1L << T__7) | (1L << T__8) | (1L << T__9) | (1L << T__10) | (1L << T__11) | (1L << T__12) | (1L << T__13) | (1L << T__14) | (1L << T__15) | (1L << T__16) | (1L << T__17) | (1L << T__18) | (1L << T__19) | (1L << T__20) | (1L << T__21) | (1L << T__22) | (1L << T__23) | (1L << STRING) | (1L << FLOAT) | (1L << HEX) | (1L << BIN) | (1L << LONG) | (1L << BIGN) | (1L << CHAR_U) | (1L << CHAR_NAMED) | (1L << CHAR_ANY) | (1L << NIL) | (1L << BOOLEAN) | (1L << SYMBOL) | (1L << NS_SYMBOL) | (1L << PARAM_NAME))) != 0)) {
				{
				{
				setState(103);
				form();
				}
				}
				setState(108);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ListContext extends ParserRuleContext {
		public FormsContext forms() {
			return getRuleContext(FormsContext.class,0);
		}
		public ListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_list; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterList(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitList(this);
		}
	}

	public final ListContext list() throws RecognitionException {
		ListContext _localctx = new ListContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_list);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(109);
			match(T__0);
			setState(110);
			forms();
			setState(111);
			match(T__1);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class VectorContext extends ParserRuleContext {
		public FormsContext forms() {
			return getRuleContext(FormsContext.class,0);
		}
		public VectorContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_vector; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterVector(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitVector(this);
		}
	}

	public final VectorContext vector() throws RecognitionException {
		VectorContext _localctx = new VectorContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_vector);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(113);
			match(T__2);
			setState(114);
			forms();
			setState(115);
			match(T__3);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class MapContext extends ParserRuleContext {
		public List<FormContext> form() {
			return getRuleContexts(FormContext.class);
		}
		public FormContext form(int i) {
			return getRuleContext(FormContext.class,i);
		}
		public MapContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_map; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterMap(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitMap(this);
		}
	}

	public final MapContext map() throws RecognitionException {
		MapContext _localctx = new MapContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_map);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(117);
			match(T__4);
			setState(123);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__0) | (1L << T__2) | (1L << T__4) | (1L << T__6) | (1L << T__7) | (1L << T__8) | (1L << T__9) | (1L << T__10) | (1L << T__11) | (1L << T__12) | (1L << T__13) | (1L << T__14) | (1L << T__15) | (1L << T__16) | (1L << T__17) | (1L << T__18) | (1L << T__19) | (1L << T__20) | (1L << T__21) | (1L << T__22) | (1L << T__23) | (1L << STRING) | (1L << FLOAT) | (1L << HEX) | (1L << BIN) | (1L << LONG) | (1L << BIGN) | (1L << CHAR_U) | (1L << CHAR_NAMED) | (1L << CHAR_ANY) | (1L << NIL) | (1L << BOOLEAN) | (1L << SYMBOL) | (1L << NS_SYMBOL) | (1L << PARAM_NAME))) != 0)) {
				{
				{
				setState(118);
				form();
				setState(119);
				form();
				}
				}
				setState(125);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(126);
			match(T__5);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class SetContext extends ParserRuleContext {
		public FormsContext forms() {
			return getRuleContext(FormsContext.class,0);
		}
		public SetContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_set; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterSet(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitSet(this);
		}
	}

	public final SetContext set() throws RecognitionException {
		SetContext _localctx = new SetContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_set);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(128);
			match(T__6);
			setState(129);
			forms();
			setState(130);
			match(T__5);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Reader_macroContext extends ParserRuleContext {
		public LambdaContext lambda() {
			return getRuleContext(LambdaContext.class,0);
		}
		public Meta_dataContext meta_data() {
			return getRuleContext(Meta_dataContext.class,0);
		}
		public RegexContext regex() {
			return getRuleContext(RegexContext.class,0);
		}
		public Var_quoteContext var_quote() {
			return getRuleContext(Var_quoteContext.class,0);
		}
		public Host_exprContext host_expr() {
			return getRuleContext(Host_exprContext.class,0);
		}
		public SetContext set() {
			return getRuleContext(SetContext.class,0);
		}
		public TagContext tag() {
			return getRuleContext(TagContext.class,0);
		}
		public DiscardContext discard() {
			return getRuleContext(DiscardContext.class,0);
		}
		public DispatchContext dispatch() {
			return getRuleContext(DispatchContext.class,0);
		}
		public DerefContext deref() {
			return getRuleContext(DerefContext.class,0);
		}
		public QuoteContext quote() {
			return getRuleContext(QuoteContext.class,0);
		}
		public BacktickContext backtick() {
			return getRuleContext(BacktickContext.class,0);
		}
		public UnquoteContext unquote() {
			return getRuleContext(UnquoteContext.class,0);
		}
		public Unquote_splicingContext unquote_splicing() {
			return getRuleContext(Unquote_splicingContext.class,0);
		}
		public GensymContext gensym() {
			return getRuleContext(GensymContext.class,0);
		}
		public Hash_spaceContext hash_space() {
			return getRuleContext(Hash_spaceContext.class,0);
		}
		public Hash_uparrowContext hash_uparrow() {
			return getRuleContext(Hash_uparrowContext.class,0);
		}
		public Hash_exclaContext hash_excla() {
			return getRuleContext(Hash_exclaContext.class,0);
		}
		public Hash_vbarContext hash_vbar() {
			return getRuleContext(Hash_vbarContext.class,0);
		}
		public Reader_macroContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_reader_macro; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterReader_macro(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitReader_macro(this);
		}
	}

	public final Reader_macroContext reader_macro() throws RecognitionException {
		Reader_macroContext _localctx = new Reader_macroContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_reader_macro);
		try {
			setState(151);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,4,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(132);
				lambda();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(133);
				meta_data();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(134);
				regex();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(135);
				var_quote();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(136);
				host_expr();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(137);
				set();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(138);
				tag();
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(139);
				discard();
				}
				break;
			case 9:
				enterOuterAlt(_localctx, 9);
				{
				setState(140);
				dispatch();
				}
				break;
			case 10:
				enterOuterAlt(_localctx, 10);
				{
				setState(141);
				deref();
				}
				break;
			case 11:
				enterOuterAlt(_localctx, 11);
				{
				setState(142);
				quote();
				}
				break;
			case 12:
				enterOuterAlt(_localctx, 12);
				{
				setState(143);
				backtick();
				}
				break;
			case 13:
				enterOuterAlt(_localctx, 13);
				{
				setState(144);
				unquote();
				}
				break;
			case 14:
				enterOuterAlt(_localctx, 14);
				{
				setState(145);
				unquote_splicing();
				}
				break;
			case 15:
				enterOuterAlt(_localctx, 15);
				{
				setState(146);
				gensym();
				}
				break;
			case 16:
				enterOuterAlt(_localctx, 16);
				{
				setState(147);
				hash_space();
				}
				break;
			case 17:
				enterOuterAlt(_localctx, 17);
				{
				setState(148);
				hash_uparrow();
				}
				break;
			case 18:
				enterOuterAlt(_localctx, 18);
				{
				setState(149);
				hash_excla();
				}
				break;
			case 19:
				enterOuterAlt(_localctx, 19);
				{
				setState(150);
				hash_vbar();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class QuoteContext extends ParserRuleContext {
		public FormContext form() {
			return getRuleContext(FormContext.class,0);
		}
		public QuoteContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_quote; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterQuote(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitQuote(this);
		}
	}

	public final QuoteContext quote() throws RecognitionException {
		QuoteContext _localctx = new QuoteContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_quote);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(153);
			match(T__7);
			setState(154);
			form();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class BacktickContext extends ParserRuleContext {
		public FormContext form() {
			return getRuleContext(FormContext.class,0);
		}
		public BacktickContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_backtick; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterBacktick(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitBacktick(this);
		}
	}

	public final BacktickContext backtick() throws RecognitionException {
		BacktickContext _localctx = new BacktickContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_backtick);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(156);
			match(T__8);
			setState(157);
			form();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class UnquoteContext extends ParserRuleContext {
		public FormContext form() {
			return getRuleContext(FormContext.class,0);
		}
		public UnquoteContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_unquote; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterUnquote(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitUnquote(this);
		}
	}

	public final UnquoteContext unquote() throws RecognitionException {
		UnquoteContext _localctx = new UnquoteContext(_ctx, getState());
		enterRule(_localctx, 20, RULE_unquote);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(159);
			match(T__9);
			setState(160);
			form();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Unquote_splicingContext extends ParserRuleContext {
		public FormContext form() {
			return getRuleContext(FormContext.class,0);
		}
		public Unquote_splicingContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_unquote_splicing; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterUnquote_splicing(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitUnquote_splicing(this);
		}
	}

	public final Unquote_splicingContext unquote_splicing() throws RecognitionException {
		Unquote_splicingContext _localctx = new Unquote_splicingContext(_ctx, getState());
		enterRule(_localctx, 22, RULE_unquote_splicing);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(162);
			match(T__10);
			setState(163);
			form();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class TagContext extends ParserRuleContext {
		public List<FormContext> form() {
			return getRuleContexts(FormContext.class);
		}
		public FormContext form(int i) {
			return getRuleContext(FormContext.class,i);
		}
		public TagContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_tag; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterTag(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitTag(this);
		}
	}

	public final TagContext tag() throws RecognitionException {
		TagContext _localctx = new TagContext(_ctx, getState());
		enterRule(_localctx, 24, RULE_tag);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(165);
			match(T__11);
			setState(166);
			form();
			setState(167);
			form();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class DerefContext extends ParserRuleContext {
		public FormContext form() {
			return getRuleContext(FormContext.class,0);
		}
		public DerefContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_deref; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterDeref(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitDeref(this);
		}
	}

	public final DerefContext deref() throws RecognitionException {
		DerefContext _localctx = new DerefContext(_ctx, getState());
		enterRule(_localctx, 26, RULE_deref);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(169);
			match(T__12);
			setState(170);
			form();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class GensymContext extends ParserRuleContext {
		public TerminalNode SYMBOL() { return getToken(MonkParser.SYMBOL, 0); }
		public GensymContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_gensym; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterGensym(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitGensym(this);
		}
	}

	public final GensymContext gensym() throws RecognitionException {
		GensymContext _localctx = new GensymContext(_ctx, getState());
		enterRule(_localctx, 28, RULE_gensym);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(172);
			match(SYMBOL);
			setState(173);
			match(T__13);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class LambdaContext extends ParserRuleContext {
		public List<FormContext> form() {
			return getRuleContexts(FormContext.class);
		}
		public FormContext form(int i) {
			return getRuleContext(FormContext.class,i);
		}
		public LambdaContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_lambda; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterLambda(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitLambda(this);
		}
	}

	public final LambdaContext lambda() throws RecognitionException {
		LambdaContext _localctx = new LambdaContext(_ctx, getState());
		enterRule(_localctx, 30, RULE_lambda);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(175);
			match(T__14);
			setState(179);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__0) | (1L << T__2) | (1L << T__4) | (1L << T__6) | (1L << T__7) | (1L << T__8) | (1L << T__9) | (1L << T__10) | (1L << T__11) | (1L << T__12) | (1L << T__13) | (1L << T__14) | (1L << T__15) | (1L << T__16) | (1L << T__17) | (1L << T__18) | (1L << T__19) | (1L << T__20) | (1L << T__21) | (1L << T__22) | (1L << T__23) | (1L << STRING) | (1L << FLOAT) | (1L << HEX) | (1L << BIN) | (1L << LONG) | (1L << BIGN) | (1L << CHAR_U) | (1L << CHAR_NAMED) | (1L << CHAR_ANY) | (1L << NIL) | (1L << BOOLEAN) | (1L << SYMBOL) | (1L << NS_SYMBOL) | (1L << PARAM_NAME))) != 0)) {
				{
				{
				setState(176);
				form();
				}
				}
				setState(181);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(182);
			match(T__1);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Meta_dataContext extends ParserRuleContext {
		public MapContext map() {
			return getRuleContext(MapContext.class,0);
		}
		public FormContext form() {
			return getRuleContext(FormContext.class,0);
		}
		public Meta_dataContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_meta_data; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterMeta_data(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitMeta_data(this);
		}
	}

	public final Meta_dataContext meta_data() throws RecognitionException {
		Meta_dataContext _localctx = new Meta_dataContext(_ctx, getState());
		enterRule(_localctx, 32, RULE_meta_data);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(184);
			match(T__15);
			setState(189);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,6,_ctx) ) {
			case 1:
				{
				setState(185);
				map();
				setState(186);
				form();
				}
				break;
			case 2:
				{
				setState(188);
				form();
				}
				break;
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Var_quoteContext extends ParserRuleContext {
		public SymbolContext symbol() {
			return getRuleContext(SymbolContext.class,0);
		}
		public Var_quoteContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_var_quote; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterVar_quote(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitVar_quote(this);
		}
	}

	public final Var_quoteContext var_quote() throws RecognitionException {
		Var_quoteContext _localctx = new Var_quoteContext(_ctx, getState());
		enterRule(_localctx, 34, RULE_var_quote);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(191);
			match(T__16);
			setState(192);
			symbol();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Host_exprContext extends ParserRuleContext {
		public List<FormContext> form() {
			return getRuleContexts(FormContext.class);
		}
		public FormContext form(int i) {
			return getRuleContext(FormContext.class,i);
		}
		public Host_exprContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_host_expr; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterHost_expr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitHost_expr(this);
		}
	}

	public final Host_exprContext host_expr() throws RecognitionException {
		Host_exprContext _localctx = new Host_exprContext(_ctx, getState());
		enterRule(_localctx, 36, RULE_host_expr);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(194);
			match(T__17);
			setState(195);
			form();
			setState(196);
			form();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class DiscardContext extends ParserRuleContext {
		public FormContext form() {
			return getRuleContext(FormContext.class,0);
		}
		public DiscardContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_discard; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterDiscard(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitDiscard(this);
		}
	}

	public final DiscardContext discard() throws RecognitionException {
		DiscardContext _localctx = new DiscardContext(_ctx, getState());
		enterRule(_localctx, 38, RULE_discard);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(198);
			match(T__18);
			setState(199);
			form();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class DispatchContext extends ParserRuleContext {
		public SymbolContext symbol() {
			return getRuleContext(SymbolContext.class,0);
		}
		public FormContext form() {
			return getRuleContext(FormContext.class,0);
		}
		public DispatchContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_dispatch; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterDispatch(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitDispatch(this);
		}
	}

	public final DispatchContext dispatch() throws RecognitionException {
		DispatchContext _localctx = new DispatchContext(_ctx, getState());
		enterRule(_localctx, 40, RULE_dispatch);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(201);
			match(T__13);
			setState(202);
			symbol();
			setState(204);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,7,_ctx) ) {
			case 1:
				{
				setState(203);
				form();
				}
				break;
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class RegexContext extends ParserRuleContext {
		public StringContext string() {
			return getRuleContext(StringContext.class,0);
		}
		public RegexContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_regex; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterRegex(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitRegex(this);
		}
	}

	public final RegexContext regex() throws RecognitionException {
		RegexContext _localctx = new RegexContext(_ctx, getState());
		enterRule(_localctx, 42, RULE_regex);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(206);
			match(T__13);
			setState(207);
			string();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Hash_spaceContext extends ParserRuleContext {
		public Hash_spaceContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_hash_space; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterHash_space(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitHash_space(this);
		}
	}

	public final Hash_spaceContext hash_space() throws RecognitionException {
		Hash_spaceContext _localctx = new Hash_spaceContext(_ctx, getState());
		enterRule(_localctx, 44, RULE_hash_space);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(209);
			match(T__19);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Hash_uparrowContext extends ParserRuleContext {
		public Hash_uparrowContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_hash_uparrow; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterHash_uparrow(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitHash_uparrow(this);
		}
	}

	public final Hash_uparrowContext hash_uparrow() throws RecognitionException {
		Hash_uparrowContext _localctx = new Hash_uparrowContext(_ctx, getState());
		enterRule(_localctx, 46, RULE_hash_uparrow);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(211);
			match(T__20);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Hash_exclaContext extends ParserRuleContext {
		public Hash_exclaContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_hash_excla; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterHash_excla(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitHash_excla(this);
		}
	}

	public final Hash_exclaContext hash_excla() throws RecognitionException {
		Hash_exclaContext _localctx = new Hash_exclaContext(_ctx, getState());
		enterRule(_localctx, 48, RULE_hash_excla);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(213);
			match(T__21);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Hash_vbarContext extends ParserRuleContext {
		public Hash_vbarContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_hash_vbar; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterHash_vbar(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitHash_vbar(this);
		}
	}

	public final Hash_vbarContext hash_vbar() throws RecognitionException {
		Hash_vbarContext _localctx = new Hash_vbarContext(_ctx, getState());
		enterRule(_localctx, 50, RULE_hash_vbar);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(215);
			match(T__22);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class LiteralContext extends ParserRuleContext {
		public StringContext string() {
			return getRuleContext(StringContext.class,0);
		}
		public NumberContext number() {
			return getRuleContext(NumberContext.class,0);
		}
		public CharacterContext character() {
			return getRuleContext(CharacterContext.class,0);
		}
		public NilContext nil() {
			return getRuleContext(NilContext.class,0);
		}
		public TerminalNode BOOLEAN() { return getToken(MonkParser.BOOLEAN, 0); }
		public KeywordContext keyword() {
			return getRuleContext(KeywordContext.class,0);
		}
		public SymbolContext symbol() {
			return getRuleContext(SymbolContext.class,0);
		}
		public Param_nameContext param_name() {
			return getRuleContext(Param_nameContext.class,0);
		}
		public LiteralContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_literal; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterLiteral(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitLiteral(this);
		}
	}

	public final LiteralContext literal() throws RecognitionException {
		LiteralContext _localctx = new LiteralContext(_ctx, getState());
		enterRule(_localctx, 52, RULE_literal);
		try {
			setState(225);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case STRING:
				enterOuterAlt(_localctx, 1);
				{
				setState(217);
				string();
				}
				break;
			case FLOAT:
			case HEX:
			case BIN:
			case LONG:
			case BIGN:
				enterOuterAlt(_localctx, 2);
				{
				setState(218);
				number();
				}
				break;
			case CHAR_U:
			case CHAR_NAMED:
			case CHAR_ANY:
				enterOuterAlt(_localctx, 3);
				{
				setState(219);
				character();
				}
				break;
			case NIL:
				enterOuterAlt(_localctx, 4);
				{
				setState(220);
				nil();
				}
				break;
			case BOOLEAN:
				enterOuterAlt(_localctx, 5);
				{
				setState(221);
				match(BOOLEAN);
				}
				break;
			case T__23:
				enterOuterAlt(_localctx, 6);
				{
				setState(222);
				keyword();
				}
				break;
			case SYMBOL:
			case NS_SYMBOL:
				enterOuterAlt(_localctx, 7);
				{
				setState(223);
				symbol();
				}
				break;
			case PARAM_NAME:
				enterOuterAlt(_localctx, 8);
				{
				setState(224);
				param_name();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class StringContext extends ParserRuleContext {
		public TerminalNode STRING() { return getToken(MonkParser.STRING, 0); }
		public StringContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_string; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterString(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitString(this);
		}
	}

	public final StringContext string() throws RecognitionException {
		StringContext _localctx = new StringContext(_ctx, getState());
		enterRule(_localctx, 54, RULE_string);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(227);
			match(STRING);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class HexContext extends ParserRuleContext {
		public TerminalNode HEX() { return getToken(MonkParser.HEX, 0); }
		public HexContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_hex; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterHex(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitHex(this);
		}
	}

	public final HexContext hex() throws RecognitionException {
		HexContext _localctx = new HexContext(_ctx, getState());
		enterRule(_localctx, 56, RULE_hex);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(229);
			match(HEX);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class BinContext extends ParserRuleContext {
		public TerminalNode BIN() { return getToken(MonkParser.BIN, 0); }
		public BinContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_bin; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterBin(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitBin(this);
		}
	}

	public final BinContext bin() throws RecognitionException {
		BinContext _localctx = new BinContext(_ctx, getState());
		enterRule(_localctx, 58, RULE_bin);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(231);
			match(BIN);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class BignContext extends ParserRuleContext {
		public TerminalNode BIGN() { return getToken(MonkParser.BIGN, 0); }
		public BignContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_bign; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterBign(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitBign(this);
		}
	}

	public final BignContext bign() throws RecognitionException {
		BignContext _localctx = new BignContext(_ctx, getState());
		enterRule(_localctx, 60, RULE_bign);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(233);
			match(BIGN);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class NumberContext extends ParserRuleContext {
		public TerminalNode FLOAT() { return getToken(MonkParser.FLOAT, 0); }
		public HexContext hex() {
			return getRuleContext(HexContext.class,0);
		}
		public BinContext bin() {
			return getRuleContext(BinContext.class,0);
		}
		public BignContext bign() {
			return getRuleContext(BignContext.class,0);
		}
		public TerminalNode LONG() { return getToken(MonkParser.LONG, 0); }
		public NumberContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_number; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterNumber(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitNumber(this);
		}
	}

	public final NumberContext number() throws RecognitionException {
		NumberContext _localctx = new NumberContext(_ctx, getState());
		enterRule(_localctx, 62, RULE_number);
		try {
			setState(240);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case FLOAT:
				enterOuterAlt(_localctx, 1);
				{
				setState(235);
				match(FLOAT);
				}
				break;
			case HEX:
				enterOuterAlt(_localctx, 2);
				{
				setState(236);
				hex();
				}
				break;
			case BIN:
				enterOuterAlt(_localctx, 3);
				{
				setState(237);
				bin();
				}
				break;
			case BIGN:
				enterOuterAlt(_localctx, 4);
				{
				setState(238);
				bign();
				}
				break;
			case LONG:
				enterOuterAlt(_localctx, 5);
				{
				setState(239);
				match(LONG);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class CharacterContext extends ParserRuleContext {
		public Named_charContext named_char() {
			return getRuleContext(Named_charContext.class,0);
		}
		public U_hex_quadContext u_hex_quad() {
			return getRuleContext(U_hex_quadContext.class,0);
		}
		public Any_charContext any_char() {
			return getRuleContext(Any_charContext.class,0);
		}
		public CharacterContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_character; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterCharacter(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitCharacter(this);
		}
	}

	public final CharacterContext character() throws RecognitionException {
		CharacterContext _localctx = new CharacterContext(_ctx, getState());
		enterRule(_localctx, 64, RULE_character);
		try {
			setState(245);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case CHAR_NAMED:
				enterOuterAlt(_localctx, 1);
				{
				setState(242);
				named_char();
				}
				break;
			case CHAR_U:
				enterOuterAlt(_localctx, 2);
				{
				setState(243);
				u_hex_quad();
				}
				break;
			case CHAR_ANY:
				enterOuterAlt(_localctx, 3);
				{
				setState(244);
				any_char();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Named_charContext extends ParserRuleContext {
		public TerminalNode CHAR_NAMED() { return getToken(MonkParser.CHAR_NAMED, 0); }
		public Named_charContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_named_char; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterNamed_char(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitNamed_char(this);
		}
	}

	public final Named_charContext named_char() throws RecognitionException {
		Named_charContext _localctx = new Named_charContext(_ctx, getState());
		enterRule(_localctx, 66, RULE_named_char);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(247);
			match(CHAR_NAMED);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Any_charContext extends ParserRuleContext {
		public TerminalNode CHAR_ANY() { return getToken(MonkParser.CHAR_ANY, 0); }
		public Any_charContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_any_char; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterAny_char(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitAny_char(this);
		}
	}

	public final Any_charContext any_char() throws RecognitionException {
		Any_charContext _localctx = new Any_charContext(_ctx, getState());
		enterRule(_localctx, 68, RULE_any_char);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(249);
			match(CHAR_ANY);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class U_hex_quadContext extends ParserRuleContext {
		public TerminalNode CHAR_U() { return getToken(MonkParser.CHAR_U, 0); }
		public U_hex_quadContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_u_hex_quad; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterU_hex_quad(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitU_hex_quad(this);
		}
	}

	public final U_hex_quadContext u_hex_quad() throws RecognitionException {
		U_hex_quadContext _localctx = new U_hex_quadContext(_ctx, getState());
		enterRule(_localctx, 70, RULE_u_hex_quad);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(251);
			match(CHAR_U);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class NilContext extends ParserRuleContext {
		public TerminalNode NIL() { return getToken(MonkParser.NIL, 0); }
		public NilContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_nil; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterNil(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitNil(this);
		}
	}

	public final NilContext nil() throws RecognitionException {
		NilContext _localctx = new NilContext(_ctx, getState());
		enterRule(_localctx, 72, RULE_nil);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(253);
			match(NIL);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class KeywordContext extends ParserRuleContext {
		public Macro_keywordContext macro_keyword() {
			return getRuleContext(Macro_keywordContext.class,0);
		}
		public Simple_keywordContext simple_keyword() {
			return getRuleContext(Simple_keywordContext.class,0);
		}
		public KeywordContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_keyword; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterKeyword(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitKeyword(this);
		}
	}

	public final KeywordContext keyword() throws RecognitionException {
		KeywordContext _localctx = new KeywordContext(_ctx, getState());
		enterRule(_localctx, 74, RULE_keyword);
		try {
			setState(257);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,11,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(255);
				macro_keyword();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(256);
				simple_keyword();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Simple_keywordContext extends ParserRuleContext {
		public SymbolContext symbol() {
			return getRuleContext(SymbolContext.class,0);
		}
		public Simple_keywordContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_simple_keyword; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterSimple_keyword(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitSimple_keyword(this);
		}
	}

	public final Simple_keywordContext simple_keyword() throws RecognitionException {
		Simple_keywordContext _localctx = new Simple_keywordContext(_ctx, getState());
		enterRule(_localctx, 76, RULE_simple_keyword);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(259);
			match(T__23);
			setState(260);
			symbol();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Macro_keywordContext extends ParserRuleContext {
		public SymbolContext symbol() {
			return getRuleContext(SymbolContext.class,0);
		}
		public Macro_keywordContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_macro_keyword; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterMacro_keyword(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitMacro_keyword(this);
		}
	}

	public final Macro_keywordContext macro_keyword() throws RecognitionException {
		Macro_keywordContext _localctx = new Macro_keywordContext(_ctx, getState());
		enterRule(_localctx, 78, RULE_macro_keyword);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(262);
			match(T__23);
			setState(263);
			match(T__23);
			setState(264);
			symbol();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class SymbolContext extends ParserRuleContext {
		public Ns_symbolContext ns_symbol() {
			return getRuleContext(Ns_symbolContext.class,0);
		}
		public Simple_symContext simple_sym() {
			return getRuleContext(Simple_symContext.class,0);
		}
		public SymbolContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_symbol; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterSymbol(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitSymbol(this);
		}
	}

	public final SymbolContext symbol() throws RecognitionException {
		SymbolContext _localctx = new SymbolContext(_ctx, getState());
		enterRule(_localctx, 80, RULE_symbol);
		try {
			setState(268);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case NS_SYMBOL:
				enterOuterAlt(_localctx, 1);
				{
				setState(266);
				ns_symbol();
				}
				break;
			case SYMBOL:
				enterOuterAlt(_localctx, 2);
				{
				setState(267);
				simple_sym();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Simple_symContext extends ParserRuleContext {
		public TerminalNode SYMBOL() { return getToken(MonkParser.SYMBOL, 0); }
		public Simple_symContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_simple_sym; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterSimple_sym(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitSimple_sym(this);
		}
	}

	public final Simple_symContext simple_sym() throws RecognitionException {
		Simple_symContext _localctx = new Simple_symContext(_ctx, getState());
		enterRule(_localctx, 82, RULE_simple_sym);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(270);
			match(SYMBOL);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Ns_symbolContext extends ParserRuleContext {
		public TerminalNode NS_SYMBOL() { return getToken(MonkParser.NS_SYMBOL, 0); }
		public Ns_symbolContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_ns_symbol; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterNs_symbol(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitNs_symbol(this);
		}
	}

	public final Ns_symbolContext ns_symbol() throws RecognitionException {
		Ns_symbolContext _localctx = new Ns_symbolContext(_ctx, getState());
		enterRule(_localctx, 84, RULE_ns_symbol);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(272);
			match(NS_SYMBOL);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Param_nameContext extends ParserRuleContext {
		public TerminalNode PARAM_NAME() { return getToken(MonkParser.PARAM_NAME, 0); }
		public Param_nameContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_param_name; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).enterParam_name(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof MonkListener ) ((MonkListener)listener).exitParam_name(this);
		}
	}

	public final Param_nameContext param_name() throws RecognitionException {
		Param_nameContext _localctx = new Param_nameContext(_ctx, getState());
		enterRule(_localctx, 86, RULE_param_name);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(274);
			match(PARAM_NAME);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3)\u0117\4\2\t\2\4"+
		"\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4\13\t"+
		"\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22\t\22"+
		"\4\23\t\23\4\24\t\24\4\25\t\25\4\26\t\26\4\27\t\27\4\30\t\30\4\31\t\31"+
		"\4\32\t\32\4\33\t\33\4\34\t\34\4\35\t\35\4\36\t\36\4\37\t\37\4 \t \4!"+
		"\t!\4\"\t\"\4#\t#\4$\t$\4%\t%\4&\t&\4\'\t\'\4(\t(\4)\t)\4*\t*\4+\t+\4"+
		",\t,\4-\t-\3\2\7\2\\\n\2\f\2\16\2_\13\2\3\2\3\2\3\3\3\3\3\3\3\3\3\3\5"+
		"\3h\n\3\3\4\7\4k\n\4\f\4\16\4n\13\4\3\5\3\5\3\5\3\5\3\6\3\6\3\6\3\6\3"+
		"\7\3\7\3\7\3\7\7\7|\n\7\f\7\16\7\177\13\7\3\7\3\7\3\b\3\b\3\b\3\b\3\t"+
		"\3\t\3\t\3\t\3\t\3\t\3\t\3\t\3\t\3\t\3\t\3\t\3\t\3\t\3\t\3\t\3\t\3\t\3"+
		"\t\5\t\u009a\n\t\3\n\3\n\3\n\3\13\3\13\3\13\3\f\3\f\3\f\3\r\3\r\3\r\3"+
		"\16\3\16\3\16\3\16\3\17\3\17\3\17\3\20\3\20\3\20\3\21\3\21\7\21\u00b4"+
		"\n\21\f\21\16\21\u00b7\13\21\3\21\3\21\3\22\3\22\3\22\3\22\3\22\5\22\u00c0"+
		"\n\22\3\23\3\23\3\23\3\24\3\24\3\24\3\24\3\25\3\25\3\25\3\26\3\26\3\26"+
		"\5\26\u00cf\n\26\3\27\3\27\3\27\3\30\3\30\3\31\3\31\3\32\3\32\3\33\3\33"+
		"\3\34\3\34\3\34\3\34\3\34\3\34\3\34\3\34\5\34\u00e4\n\34\3\35\3\35\3\36"+
		"\3\36\3\37\3\37\3 \3 \3!\3!\3!\3!\3!\5!\u00f3\n!\3\"\3\"\3\"\5\"\u00f8"+
		"\n\"\3#\3#\3$\3$\3%\3%\3&\3&\3\'\3\'\5\'\u0104\n\'\3(\3(\3(\3)\3)\3)\3"+
		")\3*\3*\5*\u010f\n*\3+\3+\3,\3,\3-\3-\3-\2\2.\2\4\6\b\n\f\16\20\22\24"+
		"\26\30\32\34\36 \"$&(*,.\60\62\64\668:<>@BDFHJLNPRTVX\2\2\2\u0115\2]\3"+
		"\2\2\2\4g\3\2\2\2\6l\3\2\2\2\bo\3\2\2\2\ns\3\2\2\2\fw\3\2\2\2\16\u0082"+
		"\3\2\2\2\20\u0099\3\2\2\2\22\u009b\3\2\2\2\24\u009e\3\2\2\2\26\u00a1\3"+
		"\2\2\2\30\u00a4\3\2\2\2\32\u00a7\3\2\2\2\34\u00ab\3\2\2\2\36\u00ae\3\2"+
		"\2\2 \u00b1\3\2\2\2\"\u00ba\3\2\2\2$\u00c1\3\2\2\2&\u00c4\3\2\2\2(\u00c8"+
		"\3\2\2\2*\u00cb\3\2\2\2,\u00d0\3\2\2\2.\u00d3\3\2\2\2\60\u00d5\3\2\2\2"+
		"\62\u00d7\3\2\2\2\64\u00d9\3\2\2\2\66\u00e3\3\2\2\28\u00e5\3\2\2\2:\u00e7"+
		"\3\2\2\2<\u00e9\3\2\2\2>\u00eb\3\2\2\2@\u00f2\3\2\2\2B\u00f7\3\2\2\2D"+
		"\u00f9\3\2\2\2F\u00fb\3\2\2\2H\u00fd\3\2\2\2J\u00ff\3\2\2\2L\u0103\3\2"+
		"\2\2N\u0105\3\2\2\2P\u0108\3\2\2\2R\u010e\3\2\2\2T\u0110\3\2\2\2V\u0112"+
		"\3\2\2\2X\u0114\3\2\2\2Z\\\5\4\3\2[Z\3\2\2\2\\_\3\2\2\2][\3\2\2\2]^\3"+
		"\2\2\2^`\3\2\2\2_]\3\2\2\2`a\7\2\2\3a\3\3\2\2\2bh\5\66\34\2ch\5\b\5\2"+
		"dh\5\n\6\2eh\5\f\7\2fh\5\20\t\2gb\3\2\2\2gc\3\2\2\2gd\3\2\2\2ge\3\2\2"+
		"\2gf\3\2\2\2h\5\3\2\2\2ik\5\4\3\2ji\3\2\2\2kn\3\2\2\2lj\3\2\2\2lm\3\2"+
		"\2\2m\7\3\2\2\2nl\3\2\2\2op\7\3\2\2pq\5\6\4\2qr\7\4\2\2r\t\3\2\2\2st\7"+
		"\5\2\2tu\5\6\4\2uv\7\6\2\2v\13\3\2\2\2w}\7\7\2\2xy\5\4\3\2yz\5\4\3\2z"+
		"|\3\2\2\2{x\3\2\2\2|\177\3\2\2\2}{\3\2\2\2}~\3\2\2\2~\u0080\3\2\2\2\177"+
		"}\3\2\2\2\u0080\u0081\7\b\2\2\u0081\r\3\2\2\2\u0082\u0083\7\t\2\2\u0083"+
		"\u0084\5\6\4\2\u0084\u0085\7\b\2\2\u0085\17\3\2\2\2\u0086\u009a\5 \21"+
		"\2\u0087\u009a\5\"\22\2\u0088\u009a\5,\27\2\u0089\u009a\5$\23\2\u008a"+
		"\u009a\5&\24\2\u008b\u009a\5\16\b\2\u008c\u009a\5\32\16\2\u008d\u009a"+
		"\5(\25\2\u008e\u009a\5*\26\2\u008f\u009a\5\34\17\2\u0090\u009a\5\22\n"+
		"\2\u0091\u009a\5\24\13\2\u0092\u009a\5\26\f\2\u0093\u009a\5\30\r\2\u0094"+
		"\u009a\5\36\20\2\u0095\u009a\5.\30\2\u0096\u009a\5\60\31\2\u0097\u009a"+
		"\5\62\32\2\u0098\u009a\5\64\33\2\u0099\u0086\3\2\2\2\u0099\u0087\3\2\2"+
		"\2\u0099\u0088\3\2\2\2\u0099\u0089\3\2\2\2\u0099\u008a\3\2\2\2\u0099\u008b"+
		"\3\2\2\2\u0099\u008c\3\2\2\2\u0099\u008d\3\2\2\2\u0099\u008e\3\2\2\2\u0099"+
		"\u008f\3\2\2\2\u0099\u0090\3\2\2\2\u0099\u0091\3\2\2\2\u0099\u0092\3\2"+
		"\2\2\u0099\u0093\3\2\2\2\u0099\u0094\3\2\2\2\u0099\u0095\3\2\2\2\u0099"+
		"\u0096\3\2\2\2\u0099\u0097\3\2\2\2\u0099\u0098\3\2\2\2\u009a\21\3\2\2"+
		"\2\u009b\u009c\7\n\2\2\u009c\u009d\5\4\3\2\u009d\23\3\2\2\2\u009e\u009f"+
		"\7\13\2\2\u009f\u00a0\5\4\3\2\u00a0\25\3\2\2\2\u00a1\u00a2\7\f\2\2\u00a2"+
		"\u00a3\5\4\3\2\u00a3\27\3\2\2\2\u00a4\u00a5\7\r\2\2\u00a5\u00a6\5\4\3"+
		"\2\u00a6\31\3\2\2\2\u00a7\u00a8\7\16\2\2\u00a8\u00a9\5\4\3\2\u00a9\u00aa"+
		"\5\4\3\2\u00aa\33\3\2\2\2\u00ab\u00ac\7\17\2\2\u00ac\u00ad\5\4\3\2\u00ad"+
		"\35\3\2\2\2\u00ae\u00af\7&\2\2\u00af\u00b0\7\20\2\2\u00b0\37\3\2\2\2\u00b1"+
		"\u00b5\7\21\2\2\u00b2\u00b4\5\4\3\2\u00b3\u00b2\3\2\2\2\u00b4\u00b7\3"+
		"\2\2\2\u00b5\u00b3\3\2\2\2\u00b5\u00b6\3\2\2\2\u00b6\u00b8\3\2\2\2\u00b7"+
		"\u00b5\3\2\2\2\u00b8\u00b9\7\4\2\2\u00b9!\3\2\2\2\u00ba\u00bf\7\22\2\2"+
		"\u00bb\u00bc\5\f\7\2\u00bc\u00bd\5\4\3\2\u00bd\u00c0\3\2\2\2\u00be\u00c0"+
		"\5\4\3\2\u00bf\u00bb\3\2\2\2\u00bf\u00be\3\2\2\2\u00c0#\3\2\2\2\u00c1"+
		"\u00c2\7\23\2\2\u00c2\u00c3\5R*\2\u00c3%\3\2\2\2\u00c4\u00c5\7\24\2\2"+
		"\u00c5\u00c6\5\4\3\2\u00c6\u00c7\5\4\3\2\u00c7\'\3\2\2\2\u00c8\u00c9\7"+
		"\25\2\2\u00c9\u00ca\5\4\3\2\u00ca)\3\2\2\2\u00cb\u00cc\7\20\2\2\u00cc"+
		"\u00ce\5R*\2\u00cd\u00cf\5\4\3\2\u00ce\u00cd\3\2\2\2\u00ce\u00cf\3\2\2"+
		"\2\u00cf+\3\2\2\2\u00d0\u00d1\7\20\2\2\u00d1\u00d2\58\35\2\u00d2-\3\2"+
		"\2\2\u00d3\u00d4\7\26\2\2\u00d4/\3\2\2\2\u00d5\u00d6\7\27\2\2\u00d6\61"+
		"\3\2\2\2\u00d7\u00d8\7\30\2\2\u00d8\63\3\2\2\2\u00d9\u00da\7\31\2\2\u00da"+
		"\65\3\2\2\2\u00db\u00e4\58\35\2\u00dc\u00e4\5@!\2\u00dd\u00e4\5B\"\2\u00de"+
		"\u00e4\5J&\2\u00df\u00e4\7%\2\2\u00e0\u00e4\5L\'\2\u00e1\u00e4\5R*\2\u00e2"+
		"\u00e4\5X-\2\u00e3\u00db\3\2\2\2\u00e3\u00dc\3\2\2\2\u00e3\u00dd\3\2\2"+
		"\2\u00e3\u00de\3\2\2\2\u00e3\u00df\3\2\2\2\u00e3\u00e0\3\2\2\2\u00e3\u00e1"+
		"\3\2\2\2\u00e3\u00e2\3\2\2\2\u00e4\67\3\2\2\2\u00e5\u00e6\7\33\2\2\u00e6"+
		"9\3\2\2\2\u00e7\u00e8\7\35\2\2\u00e8;\3\2\2\2\u00e9\u00ea\7\36\2\2\u00ea"+
		"=\3\2\2\2\u00eb\u00ec\7 \2\2\u00ec?\3\2\2\2\u00ed\u00f3\7\34\2\2\u00ee"+
		"\u00f3\5:\36\2\u00ef\u00f3\5<\37\2\u00f0\u00f3\5> \2\u00f1\u00f3\7\37"+
		"\2\2\u00f2\u00ed\3\2\2\2\u00f2\u00ee\3\2\2\2\u00f2\u00ef\3\2\2\2\u00f2"+
		"\u00f0\3\2\2\2\u00f2\u00f1\3\2\2\2\u00f3A\3\2\2\2\u00f4\u00f8\5D#\2\u00f5"+
		"\u00f8\5H%\2\u00f6\u00f8\5F$\2\u00f7\u00f4\3\2\2\2\u00f7\u00f5\3\2\2\2"+
		"\u00f7\u00f6\3\2\2\2\u00f8C\3\2\2\2\u00f9\u00fa\7\"\2\2\u00faE\3\2\2\2"+
		"\u00fb\u00fc\7#\2\2\u00fcG\3\2\2\2\u00fd\u00fe\7!\2\2\u00feI\3\2\2\2\u00ff"+
		"\u0100\7$\2\2\u0100K\3\2\2\2\u0101\u0104\5P)\2\u0102\u0104\5N(\2\u0103"+
		"\u0101\3\2\2\2\u0103\u0102\3\2\2\2\u0104M\3\2\2\2\u0105\u0106\7\32\2\2"+
		"\u0106\u0107\5R*\2\u0107O\3\2\2\2\u0108\u0109\7\32\2\2\u0109\u010a\7\32"+
		"\2\2\u010a\u010b\5R*\2\u010bQ\3\2\2\2\u010c\u010f\5V,\2\u010d\u010f\5"+
		"T+\2\u010e\u010c\3\2\2\2\u010e\u010d\3\2\2\2\u010fS\3\2\2\2\u0110\u0111"+
		"\7&\2\2\u0111U\3\2\2\2\u0112\u0113\7\'\2\2\u0113W\3\2\2\2\u0114\u0115"+
		"\7(\2\2\u0115Y\3\2\2\2\17]gl}\u0099\u00b5\u00bf\u00ce\u00e3\u00f2\u00f7"+
		"\u0103\u010e";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}