// Generated from Cloverleaf/TclLexer.g4 by ANTLR 4.7.2
import org.antlr.v4.runtime.Lexer;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.Token;
import org.antlr.v4.runtime.TokenStream;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.misc.*;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class TclLexer extends Lexer {
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
		INQUOTES=1;
	public static String[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static String[] modeNames = {
		"DEFAULT_MODE", "INQUOTES"
	};

	private static String[] makeRuleNames() {
		return new String[] {
			"WS", "LF", "COMMENT", "OPENBRACKET", "CLOSEBRACKET", "OPENBRACE", "CLOSEBRACE", 
			"DOLLAR", "NUMBER", "FLAG", "BACKSLASH", "UNDERLINE", "DOT", "COMMA", 
			"OPENPAREN", "CLOSEPAREN", "SEMICOLON", "PERCENT", "PERCENTTERM", "UPARROW", 
			"QUESTUPARROWBRACES", "TILDEBRACES", "SEP", "OTHER", "ECHO", "SET", "REGSUB", 
			"LASSIGN", "INCR", "IF", "THEN", "ELSE", "ELSEIF", "SWITCH", "SPACES", 
			"ESCAPEESCAPE", "ESCAPEMINUS", "ESCAPEHEX", "HEXDIGIT", "ESCAPEDOT", 
			"ESCAPESINGLEQUOTE", "ESCAPEBACKQUOTE", "ESCAPESPACE", "ESCAPEOPENBRACE", 
			"ESCAPECLOSEBRACE", "VAR", "OPENQUOTE", "CLOSEQUOTE", "INSIDEQUOTES"
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


	public TclLexer(CharStream input) {
		super(input);
		_interp = new LexerATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@Override
	public String getGrammarFileName() { return "TclLexer.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public String[] getChannelNames() { return channelNames; }

	@Override
	public String[] getModeNames() { return modeNames; }

	@Override
	public ATN getATN() { return _ATN; }

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\2\62\u0148\b\1\b\1"+
		"\4\2\t\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t"+
		"\n\4\13\t\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4"+
		"\22\t\22\4\23\t\23\4\24\t\24\4\25\t\25\4\26\t\26\4\27\t\27\4\30\t\30\4"+
		"\31\t\31\4\32\t\32\4\33\t\33\4\34\t\34\4\35\t\35\4\36\t\36\4\37\t\37\4"+
		" \t \4!\t!\4\"\t\"\4#\t#\4$\t$\4%\t%\4&\t&\4\'\t\'\4(\t(\4)\t)\4*\t*\4"+
		"+\t+\4,\t,\4-\t-\4.\t.\4/\t/\4\60\t\60\4\61\t\61\4\62\t\62\3\2\6\2h\n"+
		"\2\r\2\16\2i\3\2\3\2\3\3\6\3o\n\3\r\3\16\3p\3\3\3\3\3\4\3\4\7\4w\n\4\f"+
		"\4\16\4z\13\4\3\5\3\5\3\6\3\6\3\7\3\7\3\b\3\b\3\t\3\t\3\n\6\n\u0087\n"+
		"\n\r\n\16\n\u0088\3\13\3\13\6\13\u008d\n\13\r\13\16\13\u008e\3\13\5\13"+
		"\u0092\n\13\3\f\3\f\3\r\3\r\3\16\3\16\3\17\3\17\3\20\3\20\3\21\3\21\3"+
		"\22\3\22\3\23\3\23\3\24\3\24\6\24\u00a6\n\24\r\24\16\24\u00a7\3\24\3\24"+
		"\3\25\3\25\3\26\3\26\3\26\3\26\3\26\3\26\3\27\3\27\3\27\3\27\3\30\3\30"+
		"\3\30\3\30\3\30\5\30\u00bd\n\30\3\31\3\31\3\31\3\31\3\31\3\31\3\31\3\31"+
		"\3\31\3\31\3\31\3\31\3\31\3\31\3\31\3\31\3\31\3\31\3\31\5\31\u00d2\n\31"+
		"\3\32\3\32\3\32\3\32\3\32\3\33\3\33\3\33\3\33\3\34\3\34\3\34\3\34\3\34"+
		"\3\34\3\34\3\35\3\35\3\35\3\35\3\35\3\35\3\35\3\35\3\36\3\36\3\36\3\36"+
		"\3\36\3\37\3\37\3\37\3 \3 \3 \3 \3 \3!\3!\3!\3!\3!\3\"\3\"\3\"\3\"\3\""+
		"\3\"\3\"\3#\3#\3#\3#\3#\3#\3#\3$\3$\3$\3$\3$\3$\3$\3%\3%\3%\3&\3&\3&\3"+
		"\'\3\'\3\'\3\'\6\'\u011d\n\'\r\'\16\'\u011e\3(\3(\3)\3)\3)\3*\3*\3*\3"+
		"+\3+\3+\3,\3,\3,\3-\3-\3-\3.\3.\3.\3/\3/\7/\u0137\n/\f/\16/\u013a\13/"+
		"\3\60\3\60\3\60\3\60\3\61\3\61\3\61\3\61\3\62\6\62\u0145\n\62\r\62\16"+
		"\62\u0146\2\2\63\4\3\6\4\b\5\n\6\f\7\16\b\20\t\22\n\24\13\26\f\30\r\32"+
		"\16\34\17\36\20 \21\"\22$\23&\24(\25*\26,\27.\30\60\31\62\32\64\33\66"+
		"\348\35:\36<\37> @!B\"D#F$H%J&L\'N(P\2R)T*V+X,Z-\\.^/`\60b\61d\62\4\2"+
		"\3\17\4\2\13\13\"\"\4\2\f\f\17\17\3\2\62;\4\2C\\c|\3\2c|\4\2--??\4\2#"+
		"#@@\4\2((~~\5\2,,AA\u0080\u0080\5\2\62;CHch\5\2B\\aac|\6\2\62;C\\aac|"+
		"\3\2$$\2\u015e\2\4\3\2\2\2\2\6\3\2\2\2\2\b\3\2\2\2\2\n\3\2\2\2\2\f\3\2"+
		"\2\2\2\16\3\2\2\2\2\20\3\2\2\2\2\22\3\2\2\2\2\24\3\2\2\2\2\26\3\2\2\2"+
		"\2\30\3\2\2\2\2\32\3\2\2\2\2\34\3\2\2\2\2\36\3\2\2\2\2 \3\2\2\2\2\"\3"+
		"\2\2\2\2$\3\2\2\2\2&\3\2\2\2\2(\3\2\2\2\2*\3\2\2\2\2,\3\2\2\2\2.\3\2\2"+
		"\2\2\60\3\2\2\2\2\62\3\2\2\2\2\64\3\2\2\2\2\66\3\2\2\2\28\3\2\2\2\2:\3"+
		"\2\2\2\2<\3\2\2\2\2>\3\2\2\2\2@\3\2\2\2\2B\3\2\2\2\2D\3\2\2\2\2F\3\2\2"+
		"\2\2H\3\2\2\2\2J\3\2\2\2\2L\3\2\2\2\2N\3\2\2\2\2R\3\2\2\2\2T\3\2\2\2\2"+
		"V\3\2\2\2\2X\3\2\2\2\2Z\3\2\2\2\2\\\3\2\2\2\2^\3\2\2\2\2`\3\2\2\2\3b\3"+
		"\2\2\2\3d\3\2\2\2\4g\3\2\2\2\6n\3\2\2\2\bt\3\2\2\2\n{\3\2\2\2\f}\3\2\2"+
		"\2\16\177\3\2\2\2\20\u0081\3\2\2\2\22\u0083\3\2\2\2\24\u0086\3\2\2\2\26"+
		"\u008a\3\2\2\2\30\u0093\3\2\2\2\32\u0095\3\2\2\2\34\u0097\3\2\2\2\36\u0099"+
		"\3\2\2\2 \u009b\3\2\2\2\"\u009d\3\2\2\2$\u009f\3\2\2\2&\u00a1\3\2\2\2"+
		"(\u00a3\3\2\2\2*\u00ab\3\2\2\2,\u00ad\3\2\2\2.\u00b3\3\2\2\2\60\u00bc"+
		"\3\2\2\2\62\u00d1\3\2\2\2\64\u00d3\3\2\2\2\66\u00d8\3\2\2\28\u00dc\3\2"+
		"\2\2:\u00e3\3\2\2\2<\u00eb\3\2\2\2>\u00f0\3\2\2\2@\u00f3\3\2\2\2B\u00f8"+
		"\3\2\2\2D\u00fd\3\2\2\2F\u0104\3\2\2\2H\u010b\3\2\2\2J\u0112\3\2\2\2L"+
		"\u0115\3\2\2\2N\u0118\3\2\2\2P\u0120\3\2\2\2R\u0122\3\2\2\2T\u0125\3\2"+
		"\2\2V\u0128\3\2\2\2X\u012b\3\2\2\2Z\u012e\3\2\2\2\\\u0131\3\2\2\2^\u0134"+
		"\3\2\2\2`\u013b\3\2\2\2b\u013f\3\2\2\2d\u0144\3\2\2\2fh\t\2\2\2gf\3\2"+
		"\2\2hi\3\2\2\2ig\3\2\2\2ij\3\2\2\2jk\3\2\2\2kl\b\2\2\2l\5\3\2\2\2mo\t"+
		"\3\2\2nm\3\2\2\2op\3\2\2\2pn\3\2\2\2pq\3\2\2\2qr\3\2\2\2rs\b\3\2\2s\7"+
		"\3\2\2\2tx\7%\2\2uw\n\3\2\2vu\3\2\2\2wz\3\2\2\2xv\3\2\2\2xy\3\2\2\2y\t"+
		"\3\2\2\2zx\3\2\2\2{|\7]\2\2|\13\3\2\2\2}~\7_\2\2~\r\3\2\2\2\177\u0080"+
		"\7}\2\2\u0080\17\3\2\2\2\u0081\u0082\7\177\2\2\u0082\21\3\2\2\2\u0083"+
		"\u0084\7&\2\2\u0084\23\3\2\2\2\u0085\u0087\t\4\2\2\u0086\u0085\3\2\2\2"+
		"\u0087\u0088\3\2\2\2\u0088\u0086\3\2\2\2\u0088\u0089\3\2\2\2\u0089\25"+
		"\3\2\2\2\u008a\u0091\7/\2\2\u008b\u008d\t\5\2\2\u008c\u008b\3\2\2\2\u008d"+
		"\u008e\3\2\2\2\u008e\u008c\3\2\2\2\u008e\u008f\3\2\2\2\u008f\u0092\3\2"+
		"\2\2\u0090\u0092\7/\2\2\u0091\u008c\3\2\2\2\u0091\u0090\3\2\2\2\u0091"+
		"\u0092\3\2\2\2\u0092\27\3\2\2\2\u0093\u0094\7^\2\2\u0094\31\3\2\2\2\u0095"+
		"\u0096\7a\2\2\u0096\33\3\2\2\2\u0097\u0098\7\60\2\2\u0098\35\3\2\2\2\u0099"+
		"\u009a\7.\2\2\u009a\37\3\2\2\2\u009b\u009c\7*\2\2\u009c!\3\2\2\2\u009d"+
		"\u009e\7+\2\2\u009e#\3\2\2\2\u009f\u00a0\7=\2\2\u00a0%\3\2\2\2\u00a1\u00a2"+
		"\7\'\2\2\u00a2\'\3\2\2\2\u00a3\u00a5\7\'\2\2\u00a4\u00a6\t\4\2\2\u00a5"+
		"\u00a4\3\2\2\2\u00a6\u00a7\3\2\2\2\u00a7\u00a5\3\2\2\2\u00a7\u00a8\3\2"+
		"\2\2\u00a8\u00a9\3\2\2\2\u00a9\u00aa\t\6\2\2\u00aa)\3\2\2\2\u00ab\u00ac"+
		"\7`\2\2\u00ac+\3\2\2\2\u00ad\u00ae\7}\2\2\u00ae\u00af\7A\2\2\u00af\u00b0"+
		"\7\"\2\2\u00b0\u00b1\7`\2\2\u00b1\u00b2\7\177\2\2\u00b2-\3\2\2\2\u00b3"+
		"\u00b4\7}\2\2\u00b4\u00b5\7\u0080\2\2\u00b5\u00b6\7\177\2\2\u00b6/\3\2"+
		"\2\2\u00b7\u00bd\5*\25\2\u00b8\u00bd\7\61\2\2\u00b9\u00bd\5\26\13\2\u00ba"+
		"\u00bd\7<\2\2\u00bb\u00bd\5\62\31\2\u00bc\u00b7\3\2\2\2\u00bc\u00b8\3"+
		"\2\2\2\u00bc\u00b9\3\2\2\2\u00bc\u00ba\3\2\2\2\u00bc\u00bb\3\2\2\2\u00bd"+
		"\61\3\2\2\2\u00be\u00bf\7?\2\2\u00bf\u00d2\7?\2\2\u00c0\u00d2\t\7\2\2"+
		"\u00c1\u00c2\7>\2\2\u00c2\u00d2\7?\2\2\u00c3\u00c4\7(\2\2\u00c4\u00c5"+
		"\7n\2\2\u00c5\u00c6\7v\2\2\u00c6\u00d2\7=\2\2\u00c7\u00d2\7>\2\2\u00c8"+
		"\u00c9\7@\2\2\u00c9\u00d2\7?\2\2\u00ca\u00d2\t\b\2\2\u00cb\u00cc\7(\2"+
		"\2\u00cc\u00d2\7(\2\2\u00cd\u00d2\t\t\2\2\u00ce\u00cf\7~\2\2\u00cf\u00d2"+
		"\7~\2\2\u00d0\u00d2\t\n\2\2\u00d1\u00be\3\2\2\2\u00d1\u00c0\3\2\2\2\u00d1"+
		"\u00c1\3\2\2\2\u00d1\u00c3\3\2\2\2\u00d1\u00c7\3\2\2\2\u00d1\u00c8\3\2"+
		"\2\2\u00d1\u00ca\3\2\2\2\u00d1\u00cb\3\2\2\2\u00d1\u00cd\3\2\2\2\u00d1"+
		"\u00ce\3\2\2\2\u00d1\u00d0\3\2\2\2\u00d2\63\3\2\2\2\u00d3\u00d4\7g\2\2"+
		"\u00d4\u00d5\7e\2\2\u00d5\u00d6\7j\2\2\u00d6\u00d7\7q\2\2\u00d7\65\3\2"+
		"\2\2\u00d8\u00d9\7u\2\2\u00d9\u00da\7g\2\2\u00da\u00db\7v\2\2\u00db\67"+
		"\3\2\2\2\u00dc\u00dd\7t\2\2\u00dd\u00de\7g\2\2\u00de\u00df\7i\2\2\u00df"+
		"\u00e0\7u\2\2\u00e0\u00e1\7w\2\2\u00e1\u00e2\7d\2\2\u00e29\3\2\2\2\u00e3"+
		"\u00e4\7n\2\2\u00e4\u00e5\7c\2\2\u00e5\u00e6\7u\2\2\u00e6\u00e7\7u\2\2"+
		"\u00e7\u00e8\7k\2\2\u00e8\u00e9\7i\2\2\u00e9\u00ea\7p\2\2\u00ea;\3\2\2"+
		"\2\u00eb\u00ec\7k\2\2\u00ec\u00ed\7p\2\2\u00ed\u00ee\7e\2\2\u00ee\u00ef"+
		"\7t\2\2\u00ef=\3\2\2\2\u00f0\u00f1\7k\2\2\u00f1\u00f2\7h\2\2\u00f2?\3"+
		"\2\2\2\u00f3\u00f4\7v\2\2\u00f4\u00f5\7j\2\2\u00f5\u00f6\7g\2\2\u00f6"+
		"\u00f7\7p\2\2\u00f7A\3\2\2\2\u00f8\u00f9\7g\2\2\u00f9\u00fa\7n\2\2\u00fa"+
		"\u00fb\7u\2\2\u00fb\u00fc\7g\2\2\u00fcC\3\2\2\2\u00fd\u00fe\7g\2\2\u00fe"+
		"\u00ff\7n\2\2\u00ff\u0100\7u\2\2\u0100\u0101\7g\2\2\u0101\u0102\7k\2\2"+
		"\u0102\u0103\7h\2\2\u0103E\3\2\2\2\u0104\u0105\7u\2\2\u0105\u0106\7y\2"+
		"\2\u0106\u0107\7k\2\2\u0107\u0108\7v\2\2\u0108\u0109\7e\2\2\u0109\u010a"+
		"\7j\2\2\u010aG\3\2\2\2\u010b\u010c\7u\2\2\u010c\u010d\7r\2\2\u010d\u010e"+
		"\7c\2\2\u010e\u010f\7e\2\2\u010f\u0110\7g\2\2\u0110\u0111\7u\2\2\u0111"+
		"I\3\2\2\2\u0112\u0113\7^\2\2\u0113\u0114\7^\2\2\u0114K\3\2\2\2\u0115\u0116"+
		"\7^\2\2\u0116\u0117\7/\2\2\u0117M\3\2\2\2\u0118\u0119\7^\2\2\u0119\u011a"+
		"\7z\2\2\u011a\u011c\3\2\2\2\u011b\u011d\5P(\2\u011c\u011b\3\2\2\2\u011d"+
		"\u011e\3\2\2\2\u011e\u011c\3\2\2\2\u011e\u011f\3\2\2\2\u011fO\3\2\2\2"+
		"\u0120\u0121\t\13\2\2\u0121Q\3\2\2\2\u0122\u0123\7^\2\2\u0123\u0124\7"+
		"\60\2\2\u0124S\3\2\2\2\u0125\u0126\7^\2\2\u0126\u0127\7)\2\2\u0127U\3"+
		"\2\2\2\u0128\u0129\7^\2\2\u0129\u012a\7b\2\2\u012aW\3\2\2\2\u012b\u012c"+
		"\7^\2\2\u012c\u012d\7\"\2\2\u012dY\3\2\2\2\u012e\u012f\7^\2\2\u012f\u0130"+
		"\7}\2\2\u0130[\3\2\2\2\u0131\u0132\7^\2\2\u0132\u0133\7\177\2\2\u0133"+
		"]\3\2\2\2\u0134\u0138\t\f\2\2\u0135\u0137\t\r\2\2\u0136\u0135\3\2\2\2"+
		"\u0137\u013a\3\2\2\2\u0138\u0136\3\2\2\2\u0138\u0139\3\2\2\2\u0139_\3"+
		"\2\2\2\u013a\u0138\3\2\2\2\u013b\u013c\7$\2\2\u013c\u013d\3\2\2\2\u013d"+
		"\u013e\b\60\3\2\u013ea\3\2\2\2\u013f\u0140\7$\2\2\u0140\u0141\3\2\2\2"+
		"\u0141\u0142\b\61\4\2\u0142c\3\2\2\2\u0143\u0145\n\16\2\2\u0144\u0143"+
		"\3\2\2\2\u0145\u0146\3\2\2\2\u0146\u0144\3\2\2\2\u0146\u0147\3\2\2\2\u0147"+
		"e\3\2\2\2\20\2\3ipx\u0088\u008e\u0091\u00a7\u00bc\u00d1\u011e\u0138\u0146"+
		"\5\b\2\2\4\3\2\4\2\2";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}