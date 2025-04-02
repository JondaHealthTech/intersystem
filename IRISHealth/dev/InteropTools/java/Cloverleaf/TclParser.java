// Generated from Cloverleaf/TclParser.g4 by ANTLR 4.7.2
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class TclParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.7.2", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		WS=1, LF=2, COMMENT=3, OPENBRACKET=4, CLOSEBRACKET=5, OPENBRACE=6, CLOSEBRACE=7, 
		DOLLAR=8, NUMBER=9, FLAG=10, BACKSLASH=11, UNDERLINE=12, DOT=13, COMMA=14, 
		OPENPAREN=15, CLOSEPAREN=16, SEMICOLON=17, PERCENT=18, PERCENTTERM=19, 
		UPARROW=20, QUESTUPARROWBRACES=21, TILDEBRACES=22, SEP=23, OTHER=24, ECHO=25, 
		SET=26, REGSUB=27, LASSIGN=28, INCR=29, IF=30, THEN=31, ELSE=32, ELSEIF=33, 
		SWITCH=34, SPACES=35, ESCAPEESCAPE=36, ESCAPEMINUS=37, ESCAPEHEX=38, ESCAPEDOT=39, 
		ESCAPESINGLEQUOTE=40, ESCAPEBACKQUOTE=41, ESCAPESPACE=42, ESCAPEOPENBRACE=43, 
		ESCAPECLOSEBRACE=44, VAR=45, OPENQUOTE=46, CLOSEQUOTE=47, INSIDEQUOTES=48;
	public static final int
		RULE_program = 0, RULE_programimpl = 1, RULE_commandlike = 2, RULE_commandlist = 3, 
		RULE_command = 4, RULE_comment = 5, RULE_echocommand = 6, RULE_setcommand = 7, 
		RULE_regsubcommand = 8, RULE_lassigncommand = 9, RULE_incrcommand = 10, 
		RULE_ifcommand = 11, RULE_elseclause = 12, RULE_elseifclause = 13, RULE_switchcommand = 14, 
		RULE_switchblock = 15, RULE_switchcase = 16, RULE_othercommand = 17, RULE_var = 18, 
		RULE_varvalue = 19, RULE_number = 20, RULE_expr = 21, RULE_term = 22, 
		RULE_bracketed = 23, RULE_braced = 24, RULE_parenthesized = 25, RULE_braceblock = 26, 
		RULE_string = 27, RULE_escape = 28, RULE_flag = 29, RULE_dot = 30, RULE_commalist = 31, 
		RULE_funcall = 32, RULE_percentterm = 33, RULE_specialinbraces = 34, RULE_regex = 35, 
		RULE_regexbody = 36, RULE_toendofline = 37;
	private static String[] makeRuleNames() {
		return new String[] {
			"program", "programimpl", "commandlike", "commandlist", "command", "comment", 
			"echocommand", "setcommand", "regsubcommand", "lassigncommand", "incrcommand", 
			"ifcommand", "elseclause", "elseifclause", "switchcommand", "switchblock", 
			"switchcase", "othercommand", "var", "varvalue", "number", "expr", "term", 
			"bracketed", "braced", "parenthesized", "braceblock", "string", "escape", 
			"flag", "dot", "commalist", "funcall", "percentterm", "specialinbraces", 
			"regex", "regexbody", "toendofline"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, null, null, null, "'['", "']'", "'{'", "'}'", "'$'", null, null, 
			"'\\'", "'_'", "'.'", "','", "'('", "')'", "';'", "'%'", null, "'^'", 
			"'{? ^}'", "'{~}'", null, null, "'echo'", "'set'", "'regsub'", "'lassign'", 
			"'incr'", "'if'", "'then'", "'else'", "'elseif'", "'switch'", "'spaces'", 
			"'\\\\'", "'\\-'", null, "'\\.'", "'\\''", "'\\`'", "'\\ '", "'\\{'", 
			"'\\}'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, "WS", "LF", "COMMENT", "OPENBRACKET", "CLOSEBRACKET", "OPENBRACE", 
			"CLOSEBRACE", "DOLLAR", "NUMBER", "FLAG", "BACKSLASH", "UNDERLINE", "DOT", 
			"COMMA", "OPENPAREN", "CLOSEPAREN", "SEMICOLON", "PERCENT", "PERCENTTERM", 
			"UPARROW", "QUESTUPARROWBRACES", "TILDEBRACES", "SEP", "OTHER", "ECHO", 
			"SET", "REGSUB", "LASSIGN", "INCR", "IF", "THEN", "ELSE", "ELSEIF", "SWITCH", 
			"SPACES", "ESCAPEESCAPE", "ESCAPEMINUS", "ESCAPEHEX", "ESCAPEDOT", "ESCAPESINGLEQUOTE", 
			"ESCAPEBACKQUOTE", "ESCAPESPACE", "ESCAPEOPENBRACE", "ESCAPECLOSEBRACE", 
			"VAR", "OPENQUOTE", "CLOSEQUOTE", "INSIDEQUOTES"
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
	public String getGrammarFileName() { return "TclParser.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public TclParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	public static class ProgramContext extends ParserRuleContext {
		public ProgramimplContext programimpl() {
			return getRuleContext(ProgramimplContext.class,0);
		}
		public TerminalNode EOF() { return getToken(TclParser.EOF, 0); }
		public List<TerminalNode> LF() { return getTokens(TclParser.LF); }
		public TerminalNode LF(int i) {
			return getToken(TclParser.LF, i);
		}
		public ProgramContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_program; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterProgram(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitProgram(this);
		}
	}

	public final ProgramContext program() throws RecognitionException {
		ProgramContext _localctx = new ProgramContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_program);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(76);
			programimpl();
			setState(80);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==LF) {
				{
				{
				setState(77);
				match(LF);
				}
				}
				setState(82);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(83);
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

	public static class ProgramimplContext extends ParserRuleContext {
		public List<CommandlistContext> commandlist() {
			return getRuleContexts(CommandlistContext.class);
		}
		public CommandlistContext commandlist(int i) {
			return getRuleContext(CommandlistContext.class,i);
		}
		public List<TerminalNode> LF() { return getTokens(TclParser.LF); }
		public TerminalNode LF(int i) {
			return getToken(TclParser.LF, i);
		}
		public ProgramimplContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_programimpl; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterProgramimpl(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitProgramimpl(this);
		}
	}

	public final ProgramimplContext programimpl() throws RecognitionException {
		ProgramimplContext _localctx = new ProgramimplContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_programimpl);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(92); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(85);
				commandlist();
				setState(89);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,1,_ctx);
				while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
					if ( _alt==1 ) {
						{
						{
						setState(86);
						match(LF);
						}
						} 
					}
					setState(91);
					_errHandler.sync(this);
					_alt = getInterpreter().adaptivePredict(_input,1,_ctx);
				}
				}
				}
				setState(94); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << COMMENT) | (1L << ECHO) | (1L << SET) | (1L << REGSUB) | (1L << LASSIGN) | (1L << INCR) | (1L << IF) | (1L << SWITCH) | (1L << VAR))) != 0) );
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

	public static class CommandlikeContext extends ParserRuleContext {
		public CommandContext command() {
			return getRuleContext(CommandContext.class,0);
		}
		public CommentContext comment() {
			return getRuleContext(CommentContext.class,0);
		}
		public CommandlikeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_commandlike; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterCommandlike(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitCommandlike(this);
		}
	}

	public final CommandlikeContext commandlike() throws RecognitionException {
		CommandlikeContext _localctx = new CommandlikeContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_commandlike);
		try {
			setState(98);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ECHO:
			case SET:
			case REGSUB:
			case LASSIGN:
			case INCR:
			case IF:
			case SWITCH:
			case VAR:
				enterOuterAlt(_localctx, 1);
				{
				setState(96);
				command();
				}
				break;
			case COMMENT:
				enterOuterAlt(_localctx, 2);
				{
				setState(97);
				comment();
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

	public static class CommandlistContext extends ParserRuleContext {
		public List<CommandlikeContext> commandlike() {
			return getRuleContexts(CommandlikeContext.class);
		}
		public CommandlikeContext commandlike(int i) {
			return getRuleContext(CommandlikeContext.class,i);
		}
		public List<TerminalNode> SEMICOLON() { return getTokens(TclParser.SEMICOLON); }
		public TerminalNode SEMICOLON(int i) {
			return getToken(TclParser.SEMICOLON, i);
		}
		public CommandlistContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_commandlist; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterCommandlist(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitCommandlist(this);
		}
	}

	public final CommandlistContext commandlist() throws RecognitionException {
		CommandlistContext _localctx = new CommandlistContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_commandlist);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(100);
			commandlike();
			setState(107);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,5,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(102);
					_errHandler.sync(this);
					_la = _input.LA(1);
					if (_la==SEMICOLON) {
						{
						setState(101);
						match(SEMICOLON);
						}
					}

					setState(104);
					commandlike();
					}
					} 
				}
				setState(109);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,5,_ctx);
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

	public static class CommandContext extends ParserRuleContext {
		public EchocommandContext echocommand() {
			return getRuleContext(EchocommandContext.class,0);
		}
		public SetcommandContext setcommand() {
			return getRuleContext(SetcommandContext.class,0);
		}
		public RegsubcommandContext regsubcommand() {
			return getRuleContext(RegsubcommandContext.class,0);
		}
		public LassigncommandContext lassigncommand() {
			return getRuleContext(LassigncommandContext.class,0);
		}
		public IncrcommandContext incrcommand() {
			return getRuleContext(IncrcommandContext.class,0);
		}
		public OthercommandContext othercommand() {
			return getRuleContext(OthercommandContext.class,0);
		}
		public IfcommandContext ifcommand() {
			return getRuleContext(IfcommandContext.class,0);
		}
		public SwitchcommandContext switchcommand() {
			return getRuleContext(SwitchcommandContext.class,0);
		}
		public CommandContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_command; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterCommand(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitCommand(this);
		}
	}

	public final CommandContext command() throws RecognitionException {
		CommandContext _localctx = new CommandContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_command);
		try {
			setState(118);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ECHO:
				enterOuterAlt(_localctx, 1);
				{
				setState(110);
				echocommand();
				}
				break;
			case SET:
				enterOuterAlt(_localctx, 2);
				{
				setState(111);
				setcommand();
				}
				break;
			case REGSUB:
				enterOuterAlt(_localctx, 3);
				{
				setState(112);
				regsubcommand();
				}
				break;
			case LASSIGN:
				enterOuterAlt(_localctx, 4);
				{
				setState(113);
				lassigncommand();
				}
				break;
			case INCR:
				enterOuterAlt(_localctx, 5);
				{
				setState(114);
				incrcommand();
				}
				break;
			case VAR:
				enterOuterAlt(_localctx, 6);
				{
				setState(115);
				othercommand();
				}
				break;
			case IF:
				enterOuterAlt(_localctx, 7);
				{
				setState(116);
				ifcommand();
				}
				break;
			case SWITCH:
				enterOuterAlt(_localctx, 8);
				{
				setState(117);
				switchcommand();
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

	public static class CommentContext extends ParserRuleContext {
		public TerminalNode COMMENT() { return getToken(TclParser.COMMENT, 0); }
		public CommentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_comment; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterComment(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitComment(this);
		}
	}

	public final CommentContext comment() throws RecognitionException {
		CommentContext _localctx = new CommentContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_comment);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(120);
			match(COMMENT);
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

	public static class EchocommandContext extends ParserRuleContext {
		public TerminalNode ECHO() { return getToken(TclParser.ECHO, 0); }
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public EchocommandContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_echocommand; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterEchocommand(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitEchocommand(this);
		}
	}

	public final EchocommandContext echocommand() throws RecognitionException {
		EchocommandContext _localctx = new EchocommandContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_echocommand);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(122);
			match(ECHO);
			setState(124); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(123);
					expr();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(126); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,7,_ctx);
			} while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER );
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

	public static class SetcommandContext extends ParserRuleContext {
		public TerminalNode SET() { return getToken(TclParser.SET, 0); }
		public VarContext var() {
			return getRuleContext(VarContext.class,0);
		}
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public SetcommandContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_setcommand; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterSetcommand(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitSetcommand(this);
		}
	}

	public final SetcommandContext setcommand() throws RecognitionException {
		SetcommandContext _localctx = new SetcommandContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_setcommand);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(128);
			match(SET);
			setState(129);
			var();
			setState(131); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(130);
					expr();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(133); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,8,_ctx);
			} while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER );
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

	public static class RegsubcommandContext extends ParserRuleContext {
		public TerminalNode REGSUB() { return getToken(TclParser.REGSUB, 0); }
		public List<TerminalNode> FLAG() { return getTokens(TclParser.FLAG); }
		public TerminalNode FLAG(int i) {
			return getToken(TclParser.FLAG, i);
		}
		public RegexContext regex() {
			return getRuleContext(RegexContext.class,0);
		}
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public RegsubcommandContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_regsubcommand; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterRegsubcommand(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitRegsubcommand(this);
		}
	}

	public final RegsubcommandContext regsubcommand() throws RecognitionException {
		RegsubcommandContext _localctx = new RegsubcommandContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_regsubcommand);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(135);
			match(REGSUB);
			setState(139);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,9,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(136);
					match(FLAG);
					}
					} 
				}
				setState(141);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,9,_ctx);
			}
			setState(143);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,10,_ctx) ) {
			case 1:
				{
				setState(142);
				regex();
				}
				break;
			}
			setState(146); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(145);
					expr();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(148); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,11,_ctx);
			} while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER );
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

	public static class LassigncommandContext extends ParserRuleContext {
		public TerminalNode LASSIGN() { return getToken(TclParser.LASSIGN, 0); }
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public LassigncommandContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_lassigncommand; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterLassigncommand(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitLassigncommand(this);
		}
	}

	public final LassigncommandContext lassigncommand() throws RecognitionException {
		LassigncommandContext _localctx = new LassigncommandContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_lassigncommand);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(150);
			match(LASSIGN);
			setState(152); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(151);
					expr();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(154); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,12,_ctx);
			} while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER );
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

	public static class IncrcommandContext extends ParserRuleContext {
		public TerminalNode INCR() { return getToken(TclParser.INCR, 0); }
		public TerminalNode VAR() { return getToken(TclParser.VAR, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public IncrcommandContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_incrcommand; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterIncrcommand(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitIncrcommand(this);
		}
	}

	public final IncrcommandContext incrcommand() throws RecognitionException {
		IncrcommandContext _localctx = new IncrcommandContext(_ctx, getState());
		enterRule(_localctx, 20, RULE_incrcommand);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(156);
			match(INCR);
			setState(157);
			match(VAR);
			setState(159);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,13,_ctx) ) {
			case 1:
				{
				setState(158);
				expr();
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

	public static class IfcommandContext extends ParserRuleContext {
		public TerminalNode IF() { return getToken(TclParser.IF, 0); }
		public BracedContext braced() {
			return getRuleContext(BracedContext.class,0);
		}
		public BraceblockContext braceblock() {
			return getRuleContext(BraceblockContext.class,0);
		}
		public TerminalNode THEN() { return getToken(TclParser.THEN, 0); }
		public List<ElseifclauseContext> elseifclause() {
			return getRuleContexts(ElseifclauseContext.class);
		}
		public ElseifclauseContext elseifclause(int i) {
			return getRuleContext(ElseifclauseContext.class,i);
		}
		public ElseclauseContext elseclause() {
			return getRuleContext(ElseclauseContext.class,0);
		}
		public IfcommandContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_ifcommand; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterIfcommand(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitIfcommand(this);
		}
	}

	public final IfcommandContext ifcommand() throws RecognitionException {
		IfcommandContext _localctx = new IfcommandContext(_ctx, getState());
		enterRule(_localctx, 22, RULE_ifcommand);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(161);
			match(IF);
			setState(162);
			braced();
			setState(164);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==THEN) {
				{
				setState(163);
				match(THEN);
				}
			}

			setState(166);
			braceblock();
			setState(170);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==ELSEIF) {
				{
				{
				setState(167);
				elseifclause();
				}
				}
				setState(172);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(174);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==ELSE) {
				{
				setState(173);
				elseclause();
				}
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

	public static class ElseclauseContext extends ParserRuleContext {
		public TerminalNode ELSE() { return getToken(TclParser.ELSE, 0); }
		public BraceblockContext braceblock() {
			return getRuleContext(BraceblockContext.class,0);
		}
		public ElseclauseContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_elseclause; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterElseclause(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitElseclause(this);
		}
	}

	public final ElseclauseContext elseclause() throws RecognitionException {
		ElseclauseContext _localctx = new ElseclauseContext(_ctx, getState());
		enterRule(_localctx, 24, RULE_elseclause);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(176);
			match(ELSE);
			setState(177);
			braceblock();
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

	public static class ElseifclauseContext extends ParserRuleContext {
		public TerminalNode ELSEIF() { return getToken(TclParser.ELSEIF, 0); }
		public BracedContext braced() {
			return getRuleContext(BracedContext.class,0);
		}
		public BraceblockContext braceblock() {
			return getRuleContext(BraceblockContext.class,0);
		}
		public ElseifclauseContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_elseifclause; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterElseifclause(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitElseifclause(this);
		}
	}

	public final ElseifclauseContext elseifclause() throws RecognitionException {
		ElseifclauseContext _localctx = new ElseifclauseContext(_ctx, getState());
		enterRule(_localctx, 26, RULE_elseifclause);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(179);
			match(ELSEIF);
			setState(180);
			braced();
			setState(181);
			braceblock();
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

	public static class SwitchcommandContext extends ParserRuleContext {
		public TerminalNode SWITCH() { return getToken(TclParser.SWITCH, 0); }
		public SwitchblockContext switchblock() {
			return getRuleContext(SwitchblockContext.class,0);
		}
		public List<TermContext> term() {
			return getRuleContexts(TermContext.class);
		}
		public TermContext term(int i) {
			return getRuleContext(TermContext.class,i);
		}
		public SwitchcommandContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_switchcommand; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterSwitchcommand(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitSwitchcommand(this);
		}
	}

	public final SwitchcommandContext switchcommand() throws RecognitionException {
		SwitchcommandContext _localctx = new SwitchcommandContext(_ctx, getState());
		enterRule(_localctx, 28, RULE_switchcommand);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(183);
			match(SWITCH);
			setState(187);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,17,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(184);
					term();
					}
					} 
				}
				setState(189);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,17,_ctx);
			}
			setState(190);
			switchblock();
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

	public static class SwitchblockContext extends ParserRuleContext {
		public TerminalNode OPENBRACE() { return getToken(TclParser.OPENBRACE, 0); }
		public TerminalNode CLOSEBRACE() { return getToken(TclParser.CLOSEBRACE, 0); }
		public List<SwitchcaseContext> switchcase() {
			return getRuleContexts(SwitchcaseContext.class);
		}
		public SwitchcaseContext switchcase(int i) {
			return getRuleContext(SwitchcaseContext.class,i);
		}
		public SwitchblockContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_switchblock; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterSwitchblock(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitSwitchblock(this);
		}
	}

	public final SwitchblockContext switchblock() throws RecognitionException {
		SwitchblockContext _localctx = new SwitchblockContext(_ctx, getState());
		enterRule(_localctx, 30, RULE_switchblock);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(192);
			match(OPENBRACE);
			setState(194); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(193);
				switchcase();
				}
				}
				setState(196); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==VAR );
			setState(198);
			match(CLOSEBRACE);
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

	public static class SwitchcaseContext extends ParserRuleContext {
		public TerminalNode VAR() { return getToken(TclParser.VAR, 0); }
		public BraceblockContext braceblock() {
			return getRuleContext(BraceblockContext.class,0);
		}
		public SwitchcaseContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_switchcase; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterSwitchcase(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitSwitchcase(this);
		}
	}

	public final SwitchcaseContext switchcase() throws RecognitionException {
		SwitchcaseContext _localctx = new SwitchcaseContext(_ctx, getState());
		enterRule(_localctx, 32, RULE_switchcase);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(200);
			match(VAR);
			setState(201);
			braceblock();
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

	public static class OthercommandContext extends ParserRuleContext {
		public TerminalNode VAR() { return getToken(TclParser.VAR, 0); }
		public NumberContext number() {
			return getRuleContext(NumberContext.class,0);
		}
		public OthercommandContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_othercommand; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterOthercommand(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitOthercommand(this);
		}
	}

	public final OthercommandContext othercommand() throws RecognitionException {
		OthercommandContext _localctx = new OthercommandContext(_ctx, getState());
		enterRule(_localctx, 34, RULE_othercommand);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(203);
			match(VAR);
			setState(205);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==NUMBER) {
				{
				setState(204);
				number();
				}
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

	public static class VarContext extends ParserRuleContext {
		public TerminalNode VAR() { return getToken(TclParser.VAR, 0); }
		public VarContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_var; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterVar(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitVar(this);
		}
	}

	public final VarContext var() throws RecognitionException {
		VarContext _localctx = new VarContext(_ctx, getState());
		enterRule(_localctx, 36, RULE_var);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(207);
			match(VAR);
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

	public static class VarvalueContext extends ParserRuleContext {
		public TerminalNode DOLLAR() { return getToken(TclParser.DOLLAR, 0); }
		public TerminalNode VAR() { return getToken(TclParser.VAR, 0); }
		public VarvalueContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_varvalue; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterVarvalue(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitVarvalue(this);
		}
	}

	public final VarvalueContext varvalue() throws RecognitionException {
		VarvalueContext _localctx = new VarvalueContext(_ctx, getState());
		enterRule(_localctx, 38, RULE_varvalue);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(209);
			match(DOLLAR);
			setState(210);
			match(VAR);
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
		public TerminalNode NUMBER() { return getToken(TclParser.NUMBER, 0); }
		public NumberContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_number; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterNumber(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitNumber(this);
		}
	}

	public final NumberContext number() throws RecognitionException {
		NumberContext _localctx = new NumberContext(_ctx, getState());
		enterRule(_localctx, 40, RULE_number);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(212);
			match(NUMBER);
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

	public static class ExprContext extends ParserRuleContext {
		public TermContext term() {
			return getRuleContext(TermContext.class,0);
		}
		public TerminalNode SEP() { return getToken(TclParser.SEP, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public ExprContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expr; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitExpr(this);
		}
	}

	public final ExprContext expr() throws RecognitionException {
		ExprContext _localctx = new ExprContext(_ctx, getState());
		enterRule(_localctx, 42, RULE_expr);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(214);
			term();
			setState(217);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==SEP) {
				{
				setState(215);
				match(SEP);
				setState(216);
				expr();
				}
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

	public static class TermContext extends ParserRuleContext {
		public VarContext var() {
			return getRuleContext(VarContext.class,0);
		}
		public VarvalueContext varvalue() {
			return getRuleContext(VarvalueContext.class,0);
		}
		public NumberContext number() {
			return getRuleContext(NumberContext.class,0);
		}
		public BracketedContext bracketed() {
			return getRuleContext(BracketedContext.class,0);
		}
		public BracedContext braced() {
			return getRuleContext(BracedContext.class,0);
		}
		public ParenthesizedContext parenthesized() {
			return getRuleContext(ParenthesizedContext.class,0);
		}
		public StringContext string() {
			return getRuleContext(StringContext.class,0);
		}
		public EscapeContext escape() {
			return getRuleContext(EscapeContext.class,0);
		}
		public FlagContext flag() {
			return getRuleContext(FlagContext.class,0);
		}
		public DotContext dot() {
			return getRuleContext(DotContext.class,0);
		}
		public CommalistContext commalist() {
			return getRuleContext(CommalistContext.class,0);
		}
		public FuncallContext funcall() {
			return getRuleContext(FuncallContext.class,0);
		}
		public PercenttermContext percentterm() {
			return getRuleContext(PercenttermContext.class,0);
		}
		public SpecialinbracesContext specialinbraces() {
			return getRuleContext(SpecialinbracesContext.class,0);
		}
		public TermContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_term; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterTerm(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitTerm(this);
		}
	}

	public final TermContext term() throws RecognitionException {
		TermContext _localctx = new TermContext(_ctx, getState());
		enterRule(_localctx, 44, RULE_term);
		try {
			setState(233);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,21,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(219);
				var();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(220);
				varvalue();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(221);
				number();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(222);
				bracketed();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(223);
				braced();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(224);
				parenthesized();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(225);
				string();
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(226);
				escape();
				}
				break;
			case 9:
				enterOuterAlt(_localctx, 9);
				{
				setState(227);
				flag();
				}
				break;
			case 10:
				enterOuterAlt(_localctx, 10);
				{
				setState(228);
				dot();
				}
				break;
			case 11:
				enterOuterAlt(_localctx, 11);
				{
				setState(229);
				commalist();
				}
				break;
			case 12:
				enterOuterAlt(_localctx, 12);
				{
				setState(230);
				funcall();
				}
				break;
			case 13:
				enterOuterAlt(_localctx, 13);
				{
				setState(231);
				percentterm();
				}
				break;
			case 14:
				enterOuterAlt(_localctx, 14);
				{
				setState(232);
				specialinbraces();
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

	public static class BracketedContext extends ParserRuleContext {
		public TerminalNode OPENBRACKET() { return getToken(TclParser.OPENBRACKET, 0); }
		public TerminalNode CLOSEBRACKET() { return getToken(TclParser.CLOSEBRACKET, 0); }
		public TerminalNode UPARROW() { return getToken(TclParser.UPARROW, 0); }
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public BracketedContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_bracketed; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterBracketed(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitBracketed(this);
		}
	}

	public final BracketedContext bracketed() throws RecognitionException {
		BracketedContext _localctx = new BracketedContext(_ctx, getState());
		enterRule(_localctx, 46, RULE_bracketed);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(235);
			match(OPENBRACKET);
			setState(237);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==UPARROW) {
				{
				setState(236);
				match(UPARROW);
				}
			}

			setState(240); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(239);
				expr();
				}
				}
				setState(242); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << OPENBRACKET) | (1L << OPENBRACE) | (1L << DOLLAR) | (1L << NUMBER) | (1L << FLAG) | (1L << DOT) | (1L << OPENPAREN) | (1L << PERCENTTERM) | (1L << QUESTUPARROWBRACES) | (1L << TILDEBRACES) | (1L << SPACES) | (1L << ESCAPEESCAPE) | (1L << ESCAPEMINUS) | (1L << ESCAPEHEX) | (1L << ESCAPEDOT) | (1L << ESCAPESINGLEQUOTE) | (1L << ESCAPEBACKQUOTE) | (1L << ESCAPESPACE) | (1L << ESCAPEOPENBRACE) | (1L << ESCAPECLOSEBRACE) | (1L << VAR) | (1L << OPENQUOTE))) != 0) );
			setState(244);
			match(CLOSEBRACKET);
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

	public static class BracedContext extends ParserRuleContext {
		public TerminalNode OPENBRACE() { return getToken(TclParser.OPENBRACE, 0); }
		public TerminalNode CLOSEBRACE() { return getToken(TclParser.CLOSEBRACE, 0); }
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public BracedContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_braced; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterBraced(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitBraced(this);
		}
	}

	public final BracedContext braced() throws RecognitionException {
		BracedContext _localctx = new BracedContext(_ctx, getState());
		enterRule(_localctx, 48, RULE_braced);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(246);
			match(OPENBRACE);
			setState(250);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << OPENBRACKET) | (1L << OPENBRACE) | (1L << DOLLAR) | (1L << NUMBER) | (1L << FLAG) | (1L << DOT) | (1L << OPENPAREN) | (1L << PERCENTTERM) | (1L << QUESTUPARROWBRACES) | (1L << TILDEBRACES) | (1L << SPACES) | (1L << ESCAPEESCAPE) | (1L << ESCAPEMINUS) | (1L << ESCAPEHEX) | (1L << ESCAPEDOT) | (1L << ESCAPESINGLEQUOTE) | (1L << ESCAPEBACKQUOTE) | (1L << ESCAPESPACE) | (1L << ESCAPEOPENBRACE) | (1L << ESCAPECLOSEBRACE) | (1L << VAR) | (1L << OPENQUOTE))) != 0)) {
				{
				{
				setState(247);
				expr();
				}
				}
				setState(252);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(253);
			match(CLOSEBRACE);
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

	public static class ParenthesizedContext extends ParserRuleContext {
		public TerminalNode OPENPAREN() { return getToken(TclParser.OPENPAREN, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public TerminalNode CLOSEPAREN() { return getToken(TclParser.CLOSEPAREN, 0); }
		public ParenthesizedContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_parenthesized; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterParenthesized(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitParenthesized(this);
		}
	}

	public final ParenthesizedContext parenthesized() throws RecognitionException {
		ParenthesizedContext _localctx = new ParenthesizedContext(_ctx, getState());
		enterRule(_localctx, 50, RULE_parenthesized);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(255);
			match(OPENPAREN);
			setState(256);
			expr();
			setState(257);
			match(CLOSEPAREN);
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

	public static class BraceblockContext extends ParserRuleContext {
		public TerminalNode OPENBRACE() { return getToken(TclParser.OPENBRACE, 0); }
		public CommandlistContext commandlist() {
			return getRuleContext(CommandlistContext.class,0);
		}
		public TerminalNode CLOSEBRACE() { return getToken(TclParser.CLOSEBRACE, 0); }
		public BraceblockContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_braceblock; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterBraceblock(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitBraceblock(this);
		}
	}

	public final BraceblockContext braceblock() throws RecognitionException {
		BraceblockContext _localctx = new BraceblockContext(_ctx, getState());
		enterRule(_localctx, 52, RULE_braceblock);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(259);
			match(OPENBRACE);
			setState(260);
			commandlist();
			setState(261);
			match(CLOSEBRACE);
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
		public TerminalNode OPENQUOTE() { return getToken(TclParser.OPENQUOTE, 0); }
		public TerminalNode CLOSEQUOTE() { return getToken(TclParser.CLOSEQUOTE, 0); }
		public TerminalNode INSIDEQUOTES() { return getToken(TclParser.INSIDEQUOTES, 0); }
		public StringContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_string; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterString(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitString(this);
		}
	}

	public final StringContext string() throws RecognitionException {
		StringContext _localctx = new StringContext(_ctx, getState());
		enterRule(_localctx, 54, RULE_string);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(263);
			match(OPENQUOTE);
			setState(265);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==INSIDEQUOTES) {
				{
				setState(264);
				match(INSIDEQUOTES);
				}
			}

			setState(267);
			match(CLOSEQUOTE);
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

	public static class EscapeContext extends ParserRuleContext {
		public TerminalNode ESCAPEESCAPE() { return getToken(TclParser.ESCAPEESCAPE, 0); }
		public TerminalNode ESCAPEMINUS() { return getToken(TclParser.ESCAPEMINUS, 0); }
		public TerminalNode ESCAPEHEX() { return getToken(TclParser.ESCAPEHEX, 0); }
		public TerminalNode ESCAPEDOT() { return getToken(TclParser.ESCAPEDOT, 0); }
		public TerminalNode ESCAPESINGLEQUOTE() { return getToken(TclParser.ESCAPESINGLEQUOTE, 0); }
		public TerminalNode ESCAPEBACKQUOTE() { return getToken(TclParser.ESCAPEBACKQUOTE, 0); }
		public TerminalNode ESCAPESPACE() { return getToken(TclParser.ESCAPESPACE, 0); }
		public TerminalNode ESCAPEOPENBRACE() { return getToken(TclParser.ESCAPEOPENBRACE, 0); }
		public TerminalNode ESCAPECLOSEBRACE() { return getToken(TclParser.ESCAPECLOSEBRACE, 0); }
		public EscapeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_escape; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterEscape(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitEscape(this);
		}
	}

	public final EscapeContext escape() throws RecognitionException {
		EscapeContext _localctx = new EscapeContext(_ctx, getState());
		enterRule(_localctx, 56, RULE_escape);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(269);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << ESCAPEESCAPE) | (1L << ESCAPEMINUS) | (1L << ESCAPEHEX) | (1L << ESCAPEDOT) | (1L << ESCAPESINGLEQUOTE) | (1L << ESCAPEBACKQUOTE) | (1L << ESCAPESPACE) | (1L << ESCAPEOPENBRACE) | (1L << ESCAPECLOSEBRACE))) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
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

	public static class FlagContext extends ParserRuleContext {
		public TerminalNode FLAG() { return getToken(TclParser.FLAG, 0); }
		public FlagContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_flag; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterFlag(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitFlag(this);
		}
	}

	public final FlagContext flag() throws RecognitionException {
		FlagContext _localctx = new FlagContext(_ctx, getState());
		enterRule(_localctx, 58, RULE_flag);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(271);
			match(FLAG);
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

	public static class DotContext extends ParserRuleContext {
		public TerminalNode DOT() { return getToken(TclParser.DOT, 0); }
		public DotContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_dot; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterDot(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitDot(this);
		}
	}

	public final DotContext dot() throws RecognitionException {
		DotContext _localctx = new DotContext(_ctx, getState());
		enterRule(_localctx, 60, RULE_dot);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(273);
			match(DOT);
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

	public static class CommalistContext extends ParserRuleContext {
		public List<TerminalNode> VAR() { return getTokens(TclParser.VAR); }
		public TerminalNode VAR(int i) {
			return getToken(TclParser.VAR, i);
		}
		public List<TerminalNode> COMMA() { return getTokens(TclParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(TclParser.COMMA, i);
		}
		public List<TerminalNode> NUMBER() { return getTokens(TclParser.NUMBER); }
		public TerminalNode NUMBER(int i) {
			return getToken(TclParser.NUMBER, i);
		}
		public CommalistContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_commalist; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterCommalist(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitCommalist(this);
		}
	}

	public final CommalistContext commalist() throws RecognitionException {
		CommalistContext _localctx = new CommalistContext(_ctx, getState());
		enterRule(_localctx, 62, RULE_commalist);
		int _la;
		try {
			setState(289);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case VAR:
				enterOuterAlt(_localctx, 1);
				{
				setState(275);
				match(VAR);
				setState(278); 
				_errHandler.sync(this);
				_la = _input.LA(1);
				do {
					{
					{
					setState(276);
					match(COMMA);
					setState(277);
					match(VAR);
					}
					}
					setState(280); 
					_errHandler.sync(this);
					_la = _input.LA(1);
				} while ( _la==COMMA );
				}
				break;
			case NUMBER:
				enterOuterAlt(_localctx, 2);
				{
				setState(282);
				match(NUMBER);
				setState(285); 
				_errHandler.sync(this);
				_la = _input.LA(1);
				do {
					{
					{
					setState(283);
					match(COMMA);
					setState(284);
					match(NUMBER);
					}
					}
					setState(287); 
					_errHandler.sync(this);
					_la = _input.LA(1);
				} while ( _la==COMMA );
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

	public static class FuncallContext extends ParserRuleContext {
		public TerminalNode SPACES() { return getToken(TclParser.SPACES, 0); }
		public TerminalNode OPENPAREN() { return getToken(TclParser.OPENPAREN, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public TerminalNode CLOSEPAREN() { return getToken(TclParser.CLOSEPAREN, 0); }
		public FuncallContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_funcall; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterFuncall(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitFuncall(this);
		}
	}

	public final FuncallContext funcall() throws RecognitionException {
		FuncallContext _localctx = new FuncallContext(_ctx, getState());
		enterRule(_localctx, 64, RULE_funcall);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(291);
			match(SPACES);
			setState(292);
			match(OPENPAREN);
			setState(293);
			expr();
			setState(294);
			match(CLOSEPAREN);
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

	public static class PercenttermContext extends ParserRuleContext {
		public TerminalNode PERCENTTERM() { return getToken(TclParser.PERCENTTERM, 0); }
		public PercenttermContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_percentterm; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterPercentterm(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitPercentterm(this);
		}
	}

	public final PercenttermContext percentterm() throws RecognitionException {
		PercenttermContext _localctx = new PercenttermContext(_ctx, getState());
		enterRule(_localctx, 66, RULE_percentterm);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(296);
			match(PERCENTTERM);
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

	public static class SpecialinbracesContext extends ParserRuleContext {
		public TerminalNode QUESTUPARROWBRACES() { return getToken(TclParser.QUESTUPARROWBRACES, 0); }
		public TerminalNode TILDEBRACES() { return getToken(TclParser.TILDEBRACES, 0); }
		public SpecialinbracesContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_specialinbraces; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterSpecialinbraces(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitSpecialinbraces(this);
		}
	}

	public final SpecialinbracesContext specialinbraces() throws RecognitionException {
		SpecialinbracesContext _localctx = new SpecialinbracesContext(_ctx, getState());
		enterRule(_localctx, 68, RULE_specialinbraces);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(298);
			_la = _input.LA(1);
			if ( !(_la==QUESTUPARROWBRACES || _la==TILDEBRACES) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
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
		public TerminalNode OPENBRACE() { return getToken(TclParser.OPENBRACE, 0); }
		public RegexbodyContext regexbody() {
			return getRuleContext(RegexbodyContext.class,0);
		}
		public TerminalNode CLOSEBRACE() { return getToken(TclParser.CLOSEBRACE, 0); }
		public RegexContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_regex; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterRegex(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitRegex(this);
		}
	}

	public final RegexContext regex() throws RecognitionException {
		RegexContext _localctx = new RegexContext(_ctx, getState());
		enterRule(_localctx, 70, RULE_regex);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(300);
			match(OPENBRACE);
			setState(301);
			regexbody();
			setState(302);
			match(CLOSEBRACE);
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

	public static class RegexbodyContext extends ParserRuleContext {
		public RegexContext regex() {
			return getRuleContext(RegexContext.class,0);
		}
		public List<TerminalNode> OPENBRACE() { return getTokens(TclParser.OPENBRACE); }
		public TerminalNode OPENBRACE(int i) {
			return getToken(TclParser.OPENBRACE, i);
		}
		public List<TerminalNode> CLOSEBRACE() { return getTokens(TclParser.CLOSEBRACE); }
		public TerminalNode CLOSEBRACE(int i) {
			return getToken(TclParser.CLOSEBRACE, i);
		}
		public RegexbodyContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_regexbody; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterRegexbody(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitRegexbody(this);
		}
	}

	public final RegexbodyContext regexbody() throws RecognitionException {
		RegexbodyContext _localctx = new RegexbodyContext(_ctx, getState());
		enterRule(_localctx, 72, RULE_regexbody);
		int _la;
		try {
			setState(311);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case OPENBRACE:
				enterOuterAlt(_localctx, 1);
				{
				setState(304);
				regex();
				}
				break;
			case WS:
			case LF:
			case COMMENT:
			case OPENBRACKET:
			case CLOSEBRACKET:
			case CLOSEBRACE:
			case DOLLAR:
			case NUMBER:
			case FLAG:
			case BACKSLASH:
			case UNDERLINE:
			case DOT:
			case COMMA:
			case OPENPAREN:
			case CLOSEPAREN:
			case SEMICOLON:
			case PERCENT:
			case PERCENTTERM:
			case UPARROW:
			case QUESTUPARROWBRACES:
			case TILDEBRACES:
			case SEP:
			case OTHER:
			case ECHO:
			case SET:
			case REGSUB:
			case LASSIGN:
			case INCR:
			case IF:
			case THEN:
			case ELSE:
			case ELSEIF:
			case SWITCH:
			case SPACES:
			case ESCAPEESCAPE:
			case ESCAPEMINUS:
			case ESCAPEHEX:
			case ESCAPEDOT:
			case ESCAPESINGLEQUOTE:
			case ESCAPEBACKQUOTE:
			case ESCAPESPACE:
			case ESCAPEOPENBRACE:
			case ESCAPECLOSEBRACE:
			case VAR:
			case OPENQUOTE:
			case CLOSEQUOTE:
			case INSIDEQUOTES:
				enterOuterAlt(_localctx, 2);
				{
				setState(308);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << WS) | (1L << LF) | (1L << COMMENT) | (1L << OPENBRACKET) | (1L << CLOSEBRACKET) | (1L << DOLLAR) | (1L << NUMBER) | (1L << FLAG) | (1L << BACKSLASH) | (1L << UNDERLINE) | (1L << DOT) | (1L << COMMA) | (1L << OPENPAREN) | (1L << CLOSEPAREN) | (1L << SEMICOLON) | (1L << PERCENT) | (1L << PERCENTTERM) | (1L << UPARROW) | (1L << QUESTUPARROWBRACES) | (1L << TILDEBRACES) | (1L << SEP) | (1L << OTHER) | (1L << ECHO) | (1L << SET) | (1L << REGSUB) | (1L << LASSIGN) | (1L << INCR) | (1L << IF) | (1L << THEN) | (1L << ELSE) | (1L << ELSEIF) | (1L << SWITCH) | (1L << SPACES) | (1L << ESCAPEESCAPE) | (1L << ESCAPEMINUS) | (1L << ESCAPEHEX) | (1L << ESCAPEDOT) | (1L << ESCAPESINGLEQUOTE) | (1L << ESCAPEBACKQUOTE) | (1L << ESCAPESPACE) | (1L << ESCAPEOPENBRACE) | (1L << ESCAPECLOSEBRACE) | (1L << VAR) | (1L << OPENQUOTE) | (1L << CLOSEQUOTE) | (1L << INSIDEQUOTES))) != 0)) {
					{
					{
					setState(305);
					_la = _input.LA(1);
					if ( _la <= 0 || (_la==OPENBRACE || _la==CLOSEBRACE) ) {
					_errHandler.recoverInline(this);
					}
					else {
						if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
						_errHandler.reportMatch(this);
						consume();
					}
					}
					}
					setState(310);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
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

	public static class ToendoflineContext extends ParserRuleContext {
		public List<TerminalNode> LF() { return getTokens(TclParser.LF); }
		public TerminalNode LF(int i) {
			return getToken(TclParser.LF, i);
		}
		public ToendoflineContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_toendofline; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).enterToendofline(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof TclParserListener ) ((TclParserListener)listener).exitToendofline(this);
		}
	}

	public final ToendoflineContext toendofline() throws RecognitionException {
		ToendoflineContext _localctx = new ToendoflineContext(_ctx, getState());
		enterRule(_localctx, 74, RULE_toendofline);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(316);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << WS) | (1L << COMMENT) | (1L << OPENBRACKET) | (1L << CLOSEBRACKET) | (1L << OPENBRACE) | (1L << CLOSEBRACE) | (1L << DOLLAR) | (1L << NUMBER) | (1L << FLAG) | (1L << BACKSLASH) | (1L << UNDERLINE) | (1L << DOT) | (1L << COMMA) | (1L << OPENPAREN) | (1L << CLOSEPAREN) | (1L << SEMICOLON) | (1L << PERCENT) | (1L << PERCENTTERM) | (1L << UPARROW) | (1L << QUESTUPARROWBRACES) | (1L << TILDEBRACES) | (1L << SEP) | (1L << OTHER) | (1L << ECHO) | (1L << SET) | (1L << REGSUB) | (1L << LASSIGN) | (1L << INCR) | (1L << IF) | (1L << THEN) | (1L << ELSE) | (1L << ELSEIF) | (1L << SWITCH) | (1L << SPACES) | (1L << ESCAPEESCAPE) | (1L << ESCAPEMINUS) | (1L << ESCAPEHEX) | (1L << ESCAPEDOT) | (1L << ESCAPESINGLEQUOTE) | (1L << ESCAPEBACKQUOTE) | (1L << ESCAPESPACE) | (1L << ESCAPEOPENBRACE) | (1L << ESCAPECLOSEBRACE) | (1L << VAR) | (1L << OPENQUOTE) | (1L << CLOSEQUOTE) | (1L << INSIDEQUOTES))) != 0)) {
				{
				{
				setState(313);
				_la = _input.LA(1);
				if ( _la <= 0 || (_la==LF) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				}
				}
				setState(318);
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

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3\62\u0142\4\2\t\2"+
		"\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4\13"+
		"\t\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22\t\22"+
		"\4\23\t\23\4\24\t\24\4\25\t\25\4\26\t\26\4\27\t\27\4\30\t\30\4\31\t\31"+
		"\4\32\t\32\4\33\t\33\4\34\t\34\4\35\t\35\4\36\t\36\4\37\t\37\4 \t \4!"+
		"\t!\4\"\t\"\4#\t#\4$\t$\4%\t%\4&\t&\4\'\t\'\3\2\3\2\7\2Q\n\2\f\2\16\2"+
		"T\13\2\3\2\3\2\3\3\3\3\7\3Z\n\3\f\3\16\3]\13\3\6\3_\n\3\r\3\16\3`\3\4"+
		"\3\4\5\4e\n\4\3\5\3\5\5\5i\n\5\3\5\7\5l\n\5\f\5\16\5o\13\5\3\6\3\6\3\6"+
		"\3\6\3\6\3\6\3\6\3\6\5\6y\n\6\3\7\3\7\3\b\3\b\6\b\177\n\b\r\b\16\b\u0080"+
		"\3\t\3\t\3\t\6\t\u0086\n\t\r\t\16\t\u0087\3\n\3\n\7\n\u008c\n\n\f\n\16"+
		"\n\u008f\13\n\3\n\5\n\u0092\n\n\3\n\6\n\u0095\n\n\r\n\16\n\u0096\3\13"+
		"\3\13\6\13\u009b\n\13\r\13\16\13\u009c\3\f\3\f\3\f\5\f\u00a2\n\f\3\r\3"+
		"\r\3\r\5\r\u00a7\n\r\3\r\3\r\7\r\u00ab\n\r\f\r\16\r\u00ae\13\r\3\r\5\r"+
		"\u00b1\n\r\3\16\3\16\3\16\3\17\3\17\3\17\3\17\3\20\3\20\7\20\u00bc\n\20"+
		"\f\20\16\20\u00bf\13\20\3\20\3\20\3\21\3\21\6\21\u00c5\n\21\r\21\16\21"+
		"\u00c6\3\21\3\21\3\22\3\22\3\22\3\23\3\23\5\23\u00d0\n\23\3\24\3\24\3"+
		"\25\3\25\3\25\3\26\3\26\3\27\3\27\3\27\5\27\u00dc\n\27\3\30\3\30\3\30"+
		"\3\30\3\30\3\30\3\30\3\30\3\30\3\30\3\30\3\30\3\30\3\30\5\30\u00ec\n\30"+
		"\3\31\3\31\5\31\u00f0\n\31\3\31\6\31\u00f3\n\31\r\31\16\31\u00f4\3\31"+
		"\3\31\3\32\3\32\7\32\u00fb\n\32\f\32\16\32\u00fe\13\32\3\32\3\32\3\33"+
		"\3\33\3\33\3\33\3\34\3\34\3\34\3\34\3\35\3\35\5\35\u010c\n\35\3\35\3\35"+
		"\3\36\3\36\3\37\3\37\3 \3 \3!\3!\3!\6!\u0119\n!\r!\16!\u011a\3!\3!\3!"+
		"\6!\u0120\n!\r!\16!\u0121\5!\u0124\n!\3\"\3\"\3\"\3\"\3\"\3#\3#\3$\3$"+
		"\3%\3%\3%\3%\3&\3&\7&\u0135\n&\f&\16&\u0138\13&\5&\u013a\n&\3\'\7\'\u013d"+
		"\n\'\f\'\16\'\u0140\13\'\3\'\2\2(\2\4\6\b\n\f\16\20\22\24\26\30\32\34"+
		"\36 \"$&(*,.\60\62\64\668:<>@BDFHJL\2\6\3\2&.\3\2\27\30\3\2\b\t\3\2\4"+
		"\4\2\u014d\2N\3\2\2\2\4^\3\2\2\2\6d\3\2\2\2\bf\3\2\2\2\nx\3\2\2\2\fz\3"+
		"\2\2\2\16|\3\2\2\2\20\u0082\3\2\2\2\22\u0089\3\2\2\2\24\u0098\3\2\2\2"+
		"\26\u009e\3\2\2\2\30\u00a3\3\2\2\2\32\u00b2\3\2\2\2\34\u00b5\3\2\2\2\36"+
		"\u00b9\3\2\2\2 \u00c2\3\2\2\2\"\u00ca\3\2\2\2$\u00cd\3\2\2\2&\u00d1\3"+
		"\2\2\2(\u00d3\3\2\2\2*\u00d6\3\2\2\2,\u00d8\3\2\2\2.\u00eb\3\2\2\2\60"+
		"\u00ed\3\2\2\2\62\u00f8\3\2\2\2\64\u0101\3\2\2\2\66\u0105\3\2\2\28\u0109"+
		"\3\2\2\2:\u010f\3\2\2\2<\u0111\3\2\2\2>\u0113\3\2\2\2@\u0123\3\2\2\2B"+
		"\u0125\3\2\2\2D\u012a\3\2\2\2F\u012c\3\2\2\2H\u012e\3\2\2\2J\u0139\3\2"+
		"\2\2L\u013e\3\2\2\2NR\5\4\3\2OQ\7\4\2\2PO\3\2\2\2QT\3\2\2\2RP\3\2\2\2"+
		"RS\3\2\2\2SU\3\2\2\2TR\3\2\2\2UV\7\2\2\3V\3\3\2\2\2W[\5\b\5\2XZ\7\4\2"+
		"\2YX\3\2\2\2Z]\3\2\2\2[Y\3\2\2\2[\\\3\2\2\2\\_\3\2\2\2][\3\2\2\2^W\3\2"+
		"\2\2_`\3\2\2\2`^\3\2\2\2`a\3\2\2\2a\5\3\2\2\2be\5\n\6\2ce\5\f\7\2db\3"+
		"\2\2\2dc\3\2\2\2e\7\3\2\2\2fm\5\6\4\2gi\7\23\2\2hg\3\2\2\2hi\3\2\2\2i"+
		"j\3\2\2\2jl\5\6\4\2kh\3\2\2\2lo\3\2\2\2mk\3\2\2\2mn\3\2\2\2n\t\3\2\2\2"+
		"om\3\2\2\2py\5\16\b\2qy\5\20\t\2ry\5\22\n\2sy\5\24\13\2ty\5\26\f\2uy\5"+
		"$\23\2vy\5\30\r\2wy\5\36\20\2xp\3\2\2\2xq\3\2\2\2xr\3\2\2\2xs\3\2\2\2"+
		"xt\3\2\2\2xu\3\2\2\2xv\3\2\2\2xw\3\2\2\2y\13\3\2\2\2z{\7\5\2\2{\r\3\2"+
		"\2\2|~\7\33\2\2}\177\5,\27\2~}\3\2\2\2\177\u0080\3\2\2\2\u0080~\3\2\2"+
		"\2\u0080\u0081\3\2\2\2\u0081\17\3\2\2\2\u0082\u0083\7\34\2\2\u0083\u0085"+
		"\5&\24\2\u0084\u0086\5,\27\2\u0085\u0084\3\2\2\2\u0086\u0087\3\2\2\2\u0087"+
		"\u0085\3\2\2\2\u0087\u0088\3\2\2\2\u0088\21\3\2\2\2\u0089\u008d\7\35\2"+
		"\2\u008a\u008c\7\f\2\2\u008b\u008a\3\2\2\2\u008c\u008f\3\2\2\2\u008d\u008b"+
		"\3\2\2\2\u008d\u008e\3\2\2\2\u008e\u0091\3\2\2\2\u008f\u008d\3\2\2\2\u0090"+
		"\u0092\5H%\2\u0091\u0090\3\2\2\2\u0091\u0092\3\2\2\2\u0092\u0094\3\2\2"+
		"\2\u0093\u0095\5,\27\2\u0094\u0093\3\2\2\2\u0095\u0096\3\2\2\2\u0096\u0094"+
		"\3\2\2\2\u0096\u0097\3\2\2\2\u0097\23\3\2\2\2\u0098\u009a\7\36\2\2\u0099"+
		"\u009b\5,\27\2\u009a\u0099\3\2\2\2\u009b\u009c\3\2\2\2\u009c\u009a\3\2"+
		"\2\2\u009c\u009d\3\2\2\2\u009d\25\3\2\2\2\u009e\u009f\7\37\2\2\u009f\u00a1"+
		"\7/\2\2\u00a0\u00a2\5,\27\2\u00a1\u00a0\3\2\2\2\u00a1\u00a2\3\2\2\2\u00a2"+
		"\27\3\2\2\2\u00a3\u00a4\7 \2\2\u00a4\u00a6\5\62\32\2\u00a5\u00a7\7!\2"+
		"\2\u00a6\u00a5\3\2\2\2\u00a6\u00a7\3\2\2\2\u00a7\u00a8\3\2\2\2\u00a8\u00ac"+
		"\5\66\34\2\u00a9\u00ab\5\34\17\2\u00aa\u00a9\3\2\2\2\u00ab\u00ae\3\2\2"+
		"\2\u00ac\u00aa\3\2\2\2\u00ac\u00ad\3\2\2\2\u00ad\u00b0\3\2\2\2\u00ae\u00ac"+
		"\3\2\2\2\u00af\u00b1\5\32\16\2\u00b0\u00af\3\2\2\2\u00b0\u00b1\3\2\2\2"+
		"\u00b1\31\3\2\2\2\u00b2\u00b3\7\"\2\2\u00b3\u00b4\5\66\34\2\u00b4\33\3"+
		"\2\2\2\u00b5\u00b6\7#\2\2\u00b6\u00b7\5\62\32\2\u00b7\u00b8\5\66\34\2"+
		"\u00b8\35\3\2\2\2\u00b9\u00bd\7$\2\2\u00ba\u00bc\5.\30\2\u00bb\u00ba\3"+
		"\2\2\2\u00bc\u00bf\3\2\2\2\u00bd\u00bb\3\2\2\2\u00bd\u00be\3\2\2\2\u00be"+
		"\u00c0\3\2\2\2\u00bf\u00bd\3\2\2\2\u00c0\u00c1\5 \21\2\u00c1\37\3\2\2"+
		"\2\u00c2\u00c4\7\b\2\2\u00c3\u00c5\5\"\22\2\u00c4\u00c3\3\2\2\2\u00c5"+
		"\u00c6\3\2\2\2\u00c6\u00c4\3\2\2\2\u00c6\u00c7\3\2\2\2\u00c7\u00c8\3\2"+
		"\2\2\u00c8\u00c9\7\t\2\2\u00c9!\3\2\2\2\u00ca\u00cb\7/\2\2\u00cb\u00cc"+
		"\5\66\34\2\u00cc#\3\2\2\2\u00cd\u00cf\7/\2\2\u00ce\u00d0\5*\26\2\u00cf"+
		"\u00ce\3\2\2\2\u00cf\u00d0\3\2\2\2\u00d0%\3\2\2\2\u00d1\u00d2\7/\2\2\u00d2"+
		"\'\3\2\2\2\u00d3\u00d4\7\n\2\2\u00d4\u00d5\7/\2\2\u00d5)\3\2\2\2\u00d6"+
		"\u00d7\7\13\2\2\u00d7+\3\2\2\2\u00d8\u00db\5.\30\2\u00d9\u00da\7\31\2"+
		"\2\u00da\u00dc\5,\27\2\u00db\u00d9\3\2\2\2\u00db\u00dc\3\2\2\2\u00dc-"+
		"\3\2\2\2\u00dd\u00ec\5&\24\2\u00de\u00ec\5(\25\2\u00df\u00ec\5*\26\2\u00e0"+
		"\u00ec\5\60\31\2\u00e1\u00ec\5\62\32\2\u00e2\u00ec\5\64\33\2\u00e3\u00ec"+
		"\58\35\2\u00e4\u00ec\5:\36\2\u00e5\u00ec\5<\37\2\u00e6\u00ec\5> \2\u00e7"+
		"\u00ec\5@!\2\u00e8\u00ec\5B\"\2\u00e9\u00ec\5D#\2\u00ea\u00ec\5F$\2\u00eb"+
		"\u00dd\3\2\2\2\u00eb\u00de\3\2\2\2\u00eb\u00df\3\2\2\2\u00eb\u00e0\3\2"+
		"\2\2\u00eb\u00e1\3\2\2\2\u00eb\u00e2\3\2\2\2\u00eb\u00e3\3\2\2\2\u00eb"+
		"\u00e4\3\2\2\2\u00eb\u00e5\3\2\2\2\u00eb\u00e6\3\2\2\2\u00eb\u00e7\3\2"+
		"\2\2\u00eb\u00e8\3\2\2\2\u00eb\u00e9\3\2\2\2\u00eb\u00ea\3\2\2\2\u00ec"+
		"/\3\2\2\2\u00ed\u00ef\7\6\2\2\u00ee\u00f0\7\26\2\2\u00ef\u00ee\3\2\2\2"+
		"\u00ef\u00f0\3\2\2\2\u00f0\u00f2\3\2\2\2\u00f1\u00f3\5,\27\2\u00f2\u00f1"+
		"\3\2\2\2\u00f3\u00f4\3\2\2\2\u00f4\u00f2\3\2\2\2\u00f4\u00f5\3\2\2\2\u00f5"+
		"\u00f6\3\2\2\2\u00f6\u00f7\7\7\2\2\u00f7\61\3\2\2\2\u00f8\u00fc\7\b\2"+
		"\2\u00f9\u00fb\5,\27\2\u00fa\u00f9\3\2\2\2\u00fb\u00fe\3\2\2\2\u00fc\u00fa"+
		"\3\2\2\2\u00fc\u00fd\3\2\2\2\u00fd\u00ff\3\2\2\2\u00fe\u00fc\3\2\2\2\u00ff"+
		"\u0100\7\t\2\2\u0100\63\3\2\2\2\u0101\u0102\7\21\2\2\u0102\u0103\5,\27"+
		"\2\u0103\u0104\7\22\2\2\u0104\65\3\2\2\2\u0105\u0106\7\b\2\2\u0106\u0107"+
		"\5\b\5\2\u0107\u0108\7\t\2\2\u0108\67\3\2\2\2\u0109\u010b\7\60\2\2\u010a"+
		"\u010c\7\62\2\2\u010b\u010a\3\2\2\2\u010b\u010c\3\2\2\2\u010c\u010d\3"+
		"\2\2\2\u010d\u010e\7\61\2\2\u010e9\3\2\2\2\u010f\u0110\t\2\2\2\u0110;"+
		"\3\2\2\2\u0111\u0112\7\f\2\2\u0112=\3\2\2\2\u0113\u0114\7\17\2\2\u0114"+
		"?\3\2\2\2\u0115\u0118\7/\2\2\u0116\u0117\7\20\2\2\u0117\u0119\7/\2\2\u0118"+
		"\u0116\3\2\2\2\u0119\u011a\3\2\2\2\u011a\u0118\3\2\2\2\u011a\u011b\3\2"+
		"\2\2\u011b\u0124\3\2\2\2\u011c\u011f\7\13\2\2\u011d\u011e\7\20\2\2\u011e"+
		"\u0120\7\13\2\2\u011f\u011d\3\2\2\2\u0120\u0121\3\2\2\2\u0121\u011f\3"+
		"\2\2\2\u0121\u0122\3\2\2\2\u0122\u0124\3\2\2\2\u0123\u0115\3\2\2\2\u0123"+
		"\u011c\3\2\2\2\u0124A\3\2\2\2\u0125\u0126\7%\2\2\u0126\u0127\7\21\2\2"+
		"\u0127\u0128\5,\27\2\u0128\u0129\7\22\2\2\u0129C\3\2\2\2\u012a\u012b\7"+
		"\25\2\2\u012bE\3\2\2\2\u012c\u012d\t\3\2\2\u012dG\3\2\2\2\u012e\u012f"+
		"\7\b\2\2\u012f\u0130\5J&\2\u0130\u0131\7\t\2\2\u0131I\3\2\2\2\u0132\u013a"+
		"\5H%\2\u0133\u0135\n\4\2\2\u0134\u0133\3\2\2\2\u0135\u0138\3\2\2\2\u0136"+
		"\u0134\3\2\2\2\u0136\u0137\3\2\2\2\u0137\u013a\3\2\2\2\u0138\u0136\3\2"+
		"\2\2\u0139\u0132\3\2\2\2\u0139\u0136\3\2\2\2\u013aK\3\2\2\2\u013b\u013d"+
		"\n\5\2\2\u013c\u013b\3\2\2\2\u013d\u0140\3\2\2\2\u013e\u013c\3\2\2\2\u013e"+
		"\u013f\3\2\2\2\u013fM\3\2\2\2\u0140\u013e\3\2\2\2\"R[`dhmx\u0080\u0087"+
		"\u008d\u0091\u0096\u009c\u00a1\u00a6\u00ac\u00b0\u00bd\u00c6\u00cf\u00db"+
		"\u00eb\u00ef\u00f4\u00fc\u010b\u011a\u0121\u0123\u0136\u0139\u013e";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}