// Generated from Cloverleaf/CloverleafLexer.g4 by ANTLR 4.7.2
import org.antlr.v4.runtime.Lexer;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.Token;
import org.antlr.v4.runtime.TokenStream;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.misc.*;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class CloverleafLexer extends Lexer {
	static { RuntimeMetaData.checkVersion("4.7.2", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		NL=1, WS=2, WEOF=3, OPENBRACE=4, CLOSEBRACE=5, OPENBRACKET=6, CLOSEBRACKET=7, 
		OPENPAREN=8, CLOSEPAREN=9, OP=10, COMMENT=11, COPY=12, STRING=13, BULKCOPY=14, 
		TABLE=15, PATHCOPY=16, DATECOPYOPT=17, ITERATE=18, ADD=19, CONTINUE=20, 
		SUPPRESS=21, SEND=22, SUB=23, CALL=24, IF=25, MUL=26, ERR=27, OUT=28, 
		IN=29, TBL=30, SIDE=31, PRE=32, REM=33, ADDPREC=34, FABRICATE=35, USECURTM=36, 
		RANGE=37, TMDEFS=38, DELIMIT=39, BASIS=40, VAR=41, TYPE=42, BODY=43, COPYSEP=44, 
		FUNCTION=45, DFLT=46, TCL=47, POST=48, COND=49, THENBODY=50, ELSEBODY=51, 
		NOK=52, AFT=53, FAC=54, HNE=55, SEGMENTLIKE=56, ATNAME=57, INPUT=58, OUTPUT=59, 
		SEGMENTNAME=60, POUND=61, RELOP=62, LOGOP=63, RAWHYPHEN=64, HYPHEN=65, 
		NAME=66, TILDENAME=67, RAWNAME=68, NUMBER=69, NUMBERNAME=70, LETTER=71, 
		DIGIT=72, RAWUNDERSCORE=73, UNDERSCORE=74, DOLLAR=75, DOT=76, ATSIGN=77, 
		PERCENT=78, UPARROW=79, TILDE=80, FORWARDSLASH=81, EXCLA=82, VARNAME=83, 
		EQUALSBLOCK=84, EQUALS=85, EQUALSNAME=86, EQUALSNAMELIST=87, TABLEREF=88, 
		POUNDNUMBER=89, COPYSEPINSTR=90, ESCAPED=91, BS=92, PROLOGUE=93, POUNDLINES=94, 
		WORD=95, ENDPROLOGUE=96, PROLOGUELINE=97;
	public static final int
		PROLOGUE_MODE=1;
	public static String[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static String[] modeNames = {
		"DEFAULT_MODE", "PROLOGUE_MODE"
	};

	private static String[] makeRuleNames() {
		return new String[] {
			"NL", "ST", "WS", "W", "WEOF", "OPENBRACE", "CLOSEBRACE", "OPENBRACKET", 
			"CLOSEBRACKET", "OPENPAREN", "CLOSEPAREN", "OP", "COMMENT", "COPY", "STRING", 
			"BULKCOPY", "TABLE", "PATHCOPY", "DATECOPYOPT", "ITERATE", "ADD", "CONTINUE", 
			"SUPPRESS", "SEND", "SUB", "CALL", "IF", "MUL", "ERR", "OUT", "IN", "TBL", 
			"SIDE", "PRE", "REM", "ADDPREC", "FABRICATE", "USECURTM", "RANGE", "TMDEFS", 
			"DELIMIT", "BASIS", "VAR", "TYPE", "BODY", "COPYSEP", "FUNCTION", "DFLT", 
			"TCL", "POST", "COND", "THENBODY", "ELSEBODY", "NOK", "AFT", "FAC", "HNE", 
			"SEGMENTLIKE", "ATNAME", "INPUT", "OUTPUT", "SEGMENTNAME", "POUND", "RELOP", 
			"LOGOP", "RAWHYPHEN", "HYPHEN", "NAME", "TILDENAME", "RAWNAME", "NUMBER", 
			"NUMBERNAME", "LETTER", "DIGIT", "RAWUNDERSCORE", "UNDERSCORE", "DOLLAR", 
			"DOT", "ATSIGN", "PERCENT", "UPARROW", "TILDE", "FORWARDSLASH", "ASTERISK", 
			"COMMA", "PLUS", "EXCLA", "VARNAME", "OPENBRACEEQUALS", "EQUALSBLOCK", 
			"EQUALS", "EQUALSNAME", "EQUALSHYPHEN", "EQUALSPARENS", "EQUALSSPACE", 
			"EQUALSANY", "EQUALSNAMELIST", "SINGLENAME", "TABLEREF", "POUNDNUMBER", 
			"COPYSEPINSTR", "ESCAPED", "BS", "PROLOGUE", "POUNDLINES", "WORD", "ENDPROLOGUE", 
			"PROLOGUELINE"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, "'NOK'", "'AFT'", "'FAC'", "'HNE'", null, null, 
			null, null, null, "'#'", null, null, "'-'", null, null, null, null, null, 
			null, null, null, "'_'", null, null, "'.'", null, "'%'", null, null, 
			null, null, null, null, null, null, null, null, null, null, null, "'\\'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, "NL", "WS", "WEOF", "OPENBRACE", "CLOSEBRACE", "OPENBRACKET", "CLOSEBRACKET", 
			"OPENPAREN", "CLOSEPAREN", "OP", "COMMENT", "COPY", "STRING", "BULKCOPY", 
			"TABLE", "PATHCOPY", "DATECOPYOPT", "ITERATE", "ADD", "CONTINUE", "SUPPRESS", 
			"SEND", "SUB", "CALL", "IF", "MUL", "ERR", "OUT", "IN", "TBL", "SIDE", 
			"PRE", "REM", "ADDPREC", "FABRICATE", "USECURTM", "RANGE", "TMDEFS", 
			"DELIMIT", "BASIS", "VAR", "TYPE", "BODY", "COPYSEP", "FUNCTION", "DFLT", 
			"TCL", "POST", "COND", "THENBODY", "ELSEBODY", "NOK", "AFT", "FAC", "HNE", 
			"SEGMENTLIKE", "ATNAME", "INPUT", "OUTPUT", "SEGMENTNAME", "POUND", "RELOP", 
			"LOGOP", "RAWHYPHEN", "HYPHEN", "NAME", "TILDENAME", "RAWNAME", "NUMBER", 
			"NUMBERNAME", "LETTER", "DIGIT", "RAWUNDERSCORE", "UNDERSCORE", "DOLLAR", 
			"DOT", "ATSIGN", "PERCENT", "UPARROW", "TILDE", "FORWARDSLASH", "EXCLA", 
			"VARNAME", "EQUALSBLOCK", "EQUALS", "EQUALSNAME", "EQUALSNAMELIST", "TABLEREF", 
			"POUNDNUMBER", "COPYSEPINSTR", "ESCAPED", "BS", "PROLOGUE", "POUNDLINES", 
			"WORD", "ENDPROLOGUE", "PROLOGUELINE"
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


	public CloverleafLexer(CharStream input) {
		super(input);
		_interp = new LexerATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@Override
	public String getGrammarFileName() { return "CloverleafLexer.g4"; }

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
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\2c\u03d1\b\1\b\1\4"+
		"\2\t\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n"+
		"\4\13\t\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22"+
		"\t\22\4\23\t\23\4\24\t\24\4\25\t\25\4\26\t\26\4\27\t\27\4\30\t\30\4\31"+
		"\t\31\4\32\t\32\4\33\t\33\4\34\t\34\4\35\t\35\4\36\t\36\4\37\t\37\4 \t"+
		" \4!\t!\4\"\t\"\4#\t#\4$\t$\4%\t%\4&\t&\4\'\t\'\4(\t(\4)\t)\4*\t*\4+\t"+
		"+\4,\t,\4-\t-\4.\t.\4/\t/\4\60\t\60\4\61\t\61\4\62\t\62\4\63\t\63\4\64"+
		"\t\64\4\65\t\65\4\66\t\66\4\67\t\67\48\t8\49\t9\4:\t:\4;\t;\4<\t<\4=\t"+
		"=\4>\t>\4?\t?\4@\t@\4A\tA\4B\tB\4C\tC\4D\tD\4E\tE\4F\tF\4G\tG\4H\tH\4"+
		"I\tI\4J\tJ\4K\tK\4L\tL\4M\tM\4N\tN\4O\tO\4P\tP\4Q\tQ\4R\tR\4S\tS\4T\t"+
		"T\4U\tU\4V\tV\4W\tW\4X\tX\4Y\tY\4Z\tZ\4[\t[\4\\\t\\\4]\t]\4^\t^\4_\t_"+
		"\4`\t`\4a\ta\4b\tb\4c\tc\4d\td\4e\te\4f\tf\4g\tg\4h\th\4i\ti\4j\tj\4k"+
		"\tk\4l\tl\4m\tm\3\2\5\2\u00de\n\2\3\2\3\2\3\3\3\3\3\4\3\4\6\4\u00e6\n"+
		"\4\r\4\16\4\u00e7\3\5\5\5\u00eb\n\5\3\6\3\6\3\6\3\7\3\7\3\7\3\b\3\b\3"+
		"\b\3\t\3\t\3\t\3\n\3\n\3\n\3\13\3\13\3\13\3\f\3\f\3\f\3\r\3\r\3\r\3\r"+
		"\3\16\3\16\3\16\3\16\3\16\3\16\3\16\3\16\3\16\3\17\3\17\3\17\3\17\3\17"+
		"\3\17\3\20\3\20\3\20\3\20\3\20\3\20\3\20\3\20\3\21\3\21\3\21\3\21\3\21"+
		"\3\21\3\21\3\21\3\21\3\21\3\22\3\22\3\22\3\22\3\22\3\22\3\22\3\23\3\23"+
		"\3\23\3\23\3\23\3\23\3\23\3\23\3\23\3\23\3\24\3\24\3\24\3\24\3\24\3\24"+
		"\3\24\3\24\3\24\3\24\3\24\3\24\3\24\3\25\3\25\3\25\3\25\3\25\3\25\3\25"+
		"\3\25\3\25\3\26\3\26\3\26\3\26\3\26\3\27\3\27\3\27\3\27\3\27\3\27\3\27"+
		"\3\27\3\27\3\27\3\30\3\30\3\30\3\30\3\30\3\30\3\30\3\30\3\30\3\30\3\31"+
		"\3\31\3\31\3\31\3\31\3\31\3\32\3\32\3\32\3\32\3\32\3\33\3\33\3\33\3\33"+
		"\3\33\3\33\3\34\3\34\3\34\3\34\3\35\3\35\3\35\3\35\3\35\3\36\3\36\3\36"+
		"\3\36\3\36\3\37\3\37\3\37\3\37\3\37\3 \3 \3 \3 \3!\3!\3!\3!\3!\3\"\3\""+
		"\3\"\3\"\3\"\3\"\3#\3#\3#\3#\3#\3$\3$\3$\3$\3$\3%\3%\3%\3%\3%\3%\3%\3"+
		"%\3%\3&\3&\3&\3&\3&\3&\3&\3&\3&\3&\3&\3\'\3\'\3\'\3\'\3\'\3\'\3\'\3\'"+
		"\3\'\3\'\3(\3(\3(\3(\3(\3(\3(\3)\3)\3)\3)\3)\3)\3)\3)\3*\3*\3*\3*\3*\3"+
		"*\3*\3*\3*\3+\3+\3+\3+\3+\3+\3+\3,\3,\3,\3,\3,\3-\3-\3-\3-\3-\3-\3.\3"+
		".\3.\3.\3.\3.\3/\3/\3/\3/\3/\3/\3/\3/\3/\3\60\3\60\3\60\3\60\3\60\3\60"+
		"\3\60\3\60\3\60\3\60\3\61\3\61\3\61\3\61\3\61\3\61\3\62\3\62\3\62\3\62"+
		"\3\62\3\63\3\63\3\63\3\63\3\63\3\63\3\64\3\64\3\64\3\64\3\64\3\64\3\65"+
		"\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\66\3\66\3\66\3\66\3\66"+
		"\3\66\3\66\3\66\3\66\3\66\3\67\3\67\3\67\3\67\38\38\38\38\39\39\39\39"+
		"\3:\3:\3:\3:\3;\3;\3;\3;\5;\u0244\n;\3<\3<\3<\3<\5<\u024a\n<\3=\3=\3="+
		"\3=\3=\3=\3=\3>\3>\3>\3>\3>\3>\3>\3>\3?\3?\3?\3?\3@\3@\3A\3A\3A\3A\3A"+
		"\3A\3A\3A\3A\3A\3A\3A\3A\3A\3A\3A\3A\3A\3A\3A\3A\3A\3A\3A\3A\5A\u027a"+
		"\nA\3B\3B\3B\3B\3B\5B\u0281\nB\3C\3C\3D\3D\3D\3E\3E\3E\3F\3F\3F\3F\3G"+
		"\3G\3G\5G\u0292\nG\3G\3G\3G\7G\u0297\nG\fG\16G\u029a\13G\3H\3H\6H\u029e"+
		"\nH\rH\16H\u029f\3I\3I\3I\3I\3I\6I\u02a7\nI\rI\16I\u02a8\3J\3J\3K\3K\3"+
		"L\3L\3M\3M\3M\3N\3N\3N\3O\3O\3P\3P\3P\3Q\3Q\3R\3R\3R\3S\3S\3S\3T\3T\3"+
		"T\3U\3U\3U\3V\3V\3V\3W\3W\3W\3X\3X\3X\3Y\3Y\3Y\5Y\u02d6\nY\3Y\3Y\6Y\u02da"+
		"\nY\rY\16Y\u02db\5Y\u02de\nY\3Y\3Y\3Z\3Z\3Z\3[\3[\7[\u02e7\n[\f[\16[\u02ea"+
		"\13[\3[\3[\3\\\3\\\3\\\3]\3]\3]\3]\3]\3]\3]\3]\5]\u02f9\n]\3^\6^\u02fc"+
		"\n^\r^\16^\u02fd\3^\3^\3_\3_\6_\u0304\n_\r_\16_\u0305\3_\3_\3_\3`\3`\7"+
		"`\u030d\n`\f`\16`\u0310\13`\3`\5`\u0313\n`\3a\6a\u0316\na\ra\16a\u0317"+
		"\3b\3b\7b\u031c\nb\fb\16b\u031f\13b\3b\3b\6b\u0323\nb\rb\16b\u0324\7b"+
		"\u0327\nb\fb\16b\u032a\13b\3b\3b\5b\u032e\nb\3c\3c\7c\u0332\nc\fc\16c"+
		"\u0335\13c\3c\3c\3c\7c\u033a\nc\fc\16c\u033d\13c\3c\3c\3c\6c\u0342\nc"+
		"\rc\16c\u0343\3c\3c\3c\6c\u0349\nc\rc\16c\u034a\7c\u034d\nc\fc\16c\u0350"+
		"\13c\3c\3c\3c\5c\u0355\nc\3d\3d\3d\3d\7d\u035b\nd\fd\16d\u035e\13d\3d"+
		"\3d\3d\3d\3d\3d\5d\u0366\nd\5d\u0368\nd\3e\3e\3e\3f\3f\3f\3f\3f\3f\3f"+
		"\3f\3f\3f\5f\u0377\nf\3g\3g\3g\3g\3h\3h\3i\7i\u0380\ni\fi\16i\u0383\13"+
		"i\3i\5i\u0386\ni\3i\3i\3i\3i\3i\3i\3i\3i\3i\3i\3i\3i\3i\3j\3j\3j\3j\3"+
		"j\3j\3j\3j\3j\3j\3j\3j\3j\3j\3j\6j\u03a4\nj\rj\16j\u03a5\3j\3j\3j\3j\3"+
		"k\3k\6k\u03ae\nk\rk\16k\u03af\3l\3l\3l\3l\3l\3l\3l\3l\3l\3l\3l\3l\3l\3"+
		"l\3l\3l\3l\3m\7m\u03c4\nm\fm\16m\u03c7\13m\3m\3m\3m\6m\u03cc\nm\rm\16"+
		"m\u03cd\3m\3m\3\u03af\2n\4\3\6\2\b\4\n\2\f\5\16\6\20\7\22\b\24\t\26\n"+
		"\30\13\32\f\34\r\36\16 \17\"\20$\21&\22(\23*\24,\25.\26\60\27\62\30\64"+
		"\31\66\328\33:\34<\35>\36@\37B D!F\"H#J$L%N&P\'R(T)V*X+Z,\\-^.`/b\60d"+
		"\61f\62h\63j\64l\65n\66p\67r8t9v:x;z<|=~>\u0080?\u0082@\u0084A\u0086B"+
		"\u0088C\u008aD\u008cE\u008eF\u0090G\u0092H\u0094I\u0096J\u0098K\u009a"+
		"L\u009cM\u009eN\u00a0O\u00a2P\u00a4Q\u00a6R\u00a8S\u00aa\2\u00ac\2\u00ae"+
		"\2\u00b0T\u00b2U\u00b4\2\u00b6V\u00b8W\u00baX\u00bc\2\u00be\2\u00c0\2"+
		"\u00c2\2\u00c4Y\u00c6\2\u00c8Z\u00ca[\u00cc\\\u00ce]\u00d0^\u00d2_\u00d4"+
		"`\u00d6a\u00d8b\u00dac\4\2\3\21\4\2\13\13\"\"\3\2C\\\4\2\62;C\\\4\2C\\"+
		"c|\3\2\62;\3\2\177\177\3\2//\3\2??\b\2\13\13\"\"((++__~\177\6\2\62;C\\"+
		"cfh|\6\2/\60\62;C\\c|\3\2gg\5\2C\\crt|\3\2ss\4\2\f\f\17\17\2\u040e\2\4"+
		"\3\2\2\2\2\b\3\2\2\2\2\f\3\2\2\2\2\16\3\2\2\2\2\20\3\2\2\2\2\22\3\2\2"+
		"\2\2\24\3\2\2\2\2\26\3\2\2\2\2\30\3\2\2\2\2\32\3\2\2\2\2\34\3\2\2\2\2"+
		"\36\3\2\2\2\2 \3\2\2\2\2\"\3\2\2\2\2$\3\2\2\2\2&\3\2\2\2\2(\3\2\2\2\2"+
		"*\3\2\2\2\2,\3\2\2\2\2.\3\2\2\2\2\60\3\2\2\2\2\62\3\2\2\2\2\64\3\2\2\2"+
		"\2\66\3\2\2\2\28\3\2\2\2\2:\3\2\2\2\2<\3\2\2\2\2>\3\2\2\2\2@\3\2\2\2\2"+
		"B\3\2\2\2\2D\3\2\2\2\2F\3\2\2\2\2H\3\2\2\2\2J\3\2\2\2\2L\3\2\2\2\2N\3"+
		"\2\2\2\2P\3\2\2\2\2R\3\2\2\2\2T\3\2\2\2\2V\3\2\2\2\2X\3\2\2\2\2Z\3\2\2"+
		"\2\2\\\3\2\2\2\2^\3\2\2\2\2`\3\2\2\2\2b\3\2\2\2\2d\3\2\2\2\2f\3\2\2\2"+
		"\2h\3\2\2\2\2j\3\2\2\2\2l\3\2\2\2\2n\3\2\2\2\2p\3\2\2\2\2r\3\2\2\2\2t"+
		"\3\2\2\2\2v\3\2\2\2\2x\3\2\2\2\2z\3\2\2\2\2|\3\2\2\2\2~\3\2\2\2\2\u0080"+
		"\3\2\2\2\2\u0082\3\2\2\2\2\u0084\3\2\2\2\2\u0086\3\2\2\2\2\u0088\3\2\2"+
		"\2\2\u008a\3\2\2\2\2\u008c\3\2\2\2\2\u008e\3\2\2\2\2\u0090\3\2\2\2\2\u0092"+
		"\3\2\2\2\2\u0094\3\2\2\2\2\u0096\3\2\2\2\2\u0098\3\2\2\2\2\u009a\3\2\2"+
		"\2\2\u009c\3\2\2\2\2\u009e\3\2\2\2\2\u00a0\3\2\2\2\2\u00a2\3\2\2\2\2\u00a4"+
		"\3\2\2\2\2\u00a6\3\2\2\2\2\u00a8\3\2\2\2\2\u00b0\3\2\2\2\2\u00b2\3\2\2"+
		"\2\2\u00b6\3\2\2\2\2\u00b8\3\2\2\2\2\u00ba\3\2\2\2\2\u00c4\3\2\2\2\2\u00c8"+
		"\3\2\2\2\2\u00ca\3\2\2\2\2\u00cc\3\2\2\2\2\u00ce\3\2\2\2\2\u00d0\3\2\2"+
		"\2\2\u00d2\3\2\2\2\2\u00d4\3\2\2\2\2\u00d6\3\2\2\2\3\u00d8\3\2\2\2\3\u00da"+
		"\3\2\2\2\4\u00dd\3\2\2\2\6\u00e1\3\2\2\2\b\u00e5\3\2\2\2\n\u00ea\3\2\2"+
		"\2\f\u00ec\3\2\2\2\16\u00ef\3\2\2\2\20\u00f2\3\2\2\2\22\u00f5\3\2\2\2"+
		"\24\u00f8\3\2\2\2\26\u00fb\3\2\2\2\30\u00fe\3\2\2\2\32\u0101\3\2\2\2\34"+
		"\u0105\3\2\2\2\36\u010e\3\2\2\2 \u0114\3\2\2\2\"\u011c\3\2\2\2$\u0126"+
		"\3\2\2\2&\u012d\3\2\2\2(\u0137\3\2\2\2*\u0144\3\2\2\2,\u014d\3\2\2\2."+
		"\u0152\3\2\2\2\60\u015c\3\2\2\2\62\u0166\3\2\2\2\64\u016c\3\2\2\2\66\u0171"+
		"\3\2\2\28\u0177\3\2\2\2:\u017b\3\2\2\2<\u0180\3\2\2\2>\u0185\3\2\2\2@"+
		"\u018a\3\2\2\2B\u018e\3\2\2\2D\u0193\3\2\2\2F\u0199\3\2\2\2H\u019e\3\2"+
		"\2\2J\u01a3\3\2\2\2L\u01ac\3\2\2\2N\u01b7\3\2\2\2P\u01c1\3\2\2\2R\u01c8"+
		"\3\2\2\2T\u01d0\3\2\2\2V\u01d9\3\2\2\2X\u01e0\3\2\2\2Z\u01e5\3\2\2\2\\"+
		"\u01eb\3\2\2\2^\u01f1\3\2\2\2`\u01fa\3\2\2\2b\u0204\3\2\2\2d\u020a\3\2"+
		"\2\2f\u020f\3\2\2\2h\u0215\3\2\2\2j\u021b\3\2\2\2l\u0225\3\2\2\2n\u022f"+
		"\3\2\2\2p\u0233\3\2\2\2r\u0237\3\2\2\2t\u023b\3\2\2\2v\u0243\3\2\2\2x"+
		"\u0245\3\2\2\2z\u024b\3\2\2\2|\u0252\3\2\2\2~\u025a\3\2\2\2\u0080\u025e"+
		"\3\2\2\2\u0082\u0260\3\2\2\2\u0084\u027b\3\2\2\2\u0086\u0282\3\2\2\2\u0088"+
		"\u0284\3\2\2\2\u008a\u0287\3\2\2\2\u008c\u028a\3\2\2\2\u008e\u0291\3\2"+
		"\2\2\u0090\u029b\3\2\2\2\u0092\u02a1\3\2\2\2\u0094\u02aa\3\2\2\2\u0096"+
		"\u02ac\3\2\2\2\u0098\u02ae\3\2\2\2\u009a\u02b0\3\2\2\2\u009c\u02b3\3\2"+
		"\2\2\u009e\u02b6\3\2\2\2\u00a0\u02b8\3\2\2\2\u00a2\u02bb\3\2\2\2\u00a4"+
		"\u02bd\3\2\2\2\u00a6\u02c0\3\2\2\2\u00a8\u02c3\3\2\2\2\u00aa\u02c6\3\2"+
		"\2\2\u00ac\u02c9\3\2\2\2\u00ae\u02cc\3\2\2\2\u00b0\u02cf\3\2\2\2\u00b2"+
		"\u02d2\3\2\2\2\u00b4\u02e1\3\2\2\2\u00b6\u02e4\3\2\2\2\u00b8\u02ed\3\2"+
		"\2\2\u00ba\u02f0\3\2\2\2\u00bc\u02fb\3\2\2\2\u00be\u0301\3\2\2\2\u00c0"+
		"\u030a\3\2\2\2\u00c2\u0315\3\2\2\2\u00c4\u0319\3\2\2\2\u00c6\u0354\3\2"+
		"\2\2\u00c8\u0356\3\2\2\2\u00ca\u0369\3\2\2\2\u00cc\u036c\3\2\2\2\u00ce"+
		"\u0378\3\2\2\2\u00d0\u037c\3\2\2\2\u00d2\u0381\3\2\2\2\u00d4\u0394\3\2"+
		"\2\2\u00d6\u03ab\3\2\2\2\u00d8\u03b1\3\2\2\2\u00da\u03c5\3\2\2\2\u00dc"+
		"\u00de\7\17\2\2\u00dd\u00dc\3\2\2\2\u00dd\u00de\3\2\2\2\u00de\u00df\3"+
		"\2\2\2\u00df\u00e0\7\f\2\2\u00e0\5\3\2\2\2\u00e1\u00e2\t\2\2\2\u00e2\7"+
		"\3\2\2\2\u00e3\u00e6\5\6\3\2\u00e4\u00e6\5\4\2\2\u00e5\u00e3\3\2\2\2\u00e5"+
		"\u00e4\3\2\2\2\u00e6\u00e7\3\2\2\2\u00e7\u00e5\3\2\2\2\u00e7\u00e8\3\2"+
		"\2\2\u00e8\t\3\2\2\2\u00e9\u00eb\5\b\4\2\u00ea\u00e9\3\2\2\2\u00ea\u00eb"+
		"\3\2\2\2\u00eb\13\3\2\2\2\u00ec\u00ed\5\n\5\2\u00ed\u00ee\7\2\2\3\u00ee"+
		"\r\3\2\2\2\u00ef\u00f0\5\n\5\2\u00f0\u00f1\7}\2\2\u00f1\17\3\2\2\2\u00f2"+
		"\u00f3\5\n\5\2\u00f3\u00f4\7\177\2\2\u00f4\21\3\2\2\2\u00f5\u00f6\5\n"+
		"\5\2\u00f6\u00f7\7]\2\2\u00f7\23\3\2\2\2\u00f8\u00f9\5\n\5\2\u00f9\u00fa"+
		"\7_\2\2\u00fa\25\3\2\2\2\u00fb\u00fc\5\n\5\2\u00fc\u00fd\7*\2\2\u00fd"+
		"\27\3\2\2\2\u00fe\u00ff\5\n\5\2\u00ff\u0100\7+\2\2\u0100\31\3\2\2\2\u0101"+
		"\u0102\5\n\5\2\u0102\u0103\7Q\2\2\u0103\u0104\7R\2\2\u0104\33\3\2\2\2"+
		"\u0105\u0106\5\n\5\2\u0106\u0107\7E\2\2\u0107\u0108\7Q\2\2\u0108\u0109"+
		"\7O\2\2\u0109\u010a\7O\2\2\u010a\u010b\7G\2\2\u010b\u010c\7P\2\2\u010c"+
		"\u010d\7V\2\2\u010d\35\3\2\2\2\u010e\u010f\5\n\5\2\u010f\u0110\7E\2\2"+
		"\u0110\u0111\7Q\2\2\u0111\u0112\7R\2\2\u0112\u0113\7[\2\2\u0113\37\3\2"+
		"\2\2\u0114\u0115\5\n\5\2\u0115\u0116\7U\2\2\u0116\u0117\7V\2\2\u0117\u0118"+
		"\7T\2\2\u0118\u0119\7K\2\2\u0119\u011a\7P\2\2\u011a\u011b\7I\2\2\u011b"+
		"!\3\2\2\2\u011c\u011d\5\n\5\2\u011d\u011e\7D\2\2\u011e\u011f\7W\2\2\u011f"+
		"\u0120\7N\2\2\u0120\u0121\7M\2\2\u0121\u0122\7E\2\2\u0122\u0123\7Q\2\2"+
		"\u0123\u0124\7R\2\2\u0124\u0125\7[\2\2\u0125#\3\2\2\2\u0126\u0127\5\n"+
		"\5\2\u0127\u0128\7V\2\2\u0128\u0129\7C\2\2\u0129\u012a\7D\2\2\u012a\u012b"+
		"\7N\2\2\u012b\u012c\7G\2\2\u012c%\3\2\2\2\u012d\u012e\5\n\5\2\u012e\u012f"+
		"\7R\2\2\u012f\u0130\7C\2\2\u0130\u0131\7V\2\2\u0131\u0132\7J\2\2\u0132"+
		"\u0133\7E\2\2\u0133\u0134\7Q\2\2\u0134\u0135\7R\2\2\u0135\u0136\7[\2\2"+
		"\u0136\'\3\2\2\2\u0137\u0138\5\n\5\2\u0138\u0139\7F\2\2\u0139\u013a\7"+
		"C\2\2\u013a\u013b\7V\2\2\u013b\u013c\7G\2\2\u013c\u013d\7E\2\2\u013d\u013e"+
		"\7Q\2\2\u013e\u013f\7R\2\2\u013f\u0140\7[\2\2\u0140\u0141\7Q\2\2\u0141"+
		"\u0142\7R\2\2\u0142\u0143\7V\2\2\u0143)\3\2\2\2\u0144\u0145\5\n\5\2\u0145"+
		"\u0146\7K\2\2\u0146\u0147\7V\2\2\u0147\u0148\7G\2\2\u0148\u0149\7T\2\2"+
		"\u0149\u014a\7C\2\2\u014a\u014b\7V\2\2\u014b\u014c\7G\2\2\u014c+\3\2\2"+
		"\2\u014d\u014e\5\n\5\2\u014e\u014f\7C\2\2\u014f\u0150\7F\2\2\u0150\u0151"+
		"\7F\2\2\u0151-\3\2\2\2\u0152\u0153\5\n\5\2\u0153\u0154\7E\2\2\u0154\u0155"+
		"\7Q\2\2\u0155\u0156\7P\2\2\u0156\u0157\7V\2\2\u0157\u0158\7K\2\2\u0158"+
		"\u0159\7P\2\2\u0159\u015a\7W\2\2\u015a\u015b\7G\2\2\u015b/\3\2\2\2\u015c"+
		"\u015d\5\n\5\2\u015d\u015e\7U\2\2\u015e\u015f\7W\2\2\u015f\u0160\7R\2"+
		"\2\u0160\u0161\7R\2\2\u0161\u0162\7T\2\2\u0162\u0163\7G\2\2\u0163\u0164"+
		"\7U\2\2\u0164\u0165\7U\2\2\u0165\61\3\2\2\2\u0166\u0167\5\n\5\2\u0167"+
		"\u0168\7U\2\2\u0168\u0169\7G\2\2\u0169\u016a\7P\2\2\u016a\u016b\7F\2\2"+
		"\u016b\63\3\2\2\2\u016c\u016d\5\n\5\2\u016d\u016e\7U\2\2\u016e\u016f\7"+
		"W\2\2\u016f\u0170\7D\2\2\u0170\65\3\2\2\2\u0171\u0172\5\n\5\2\u0172\u0173"+
		"\7E\2\2\u0173\u0174\7C\2\2\u0174\u0175\7N\2\2\u0175\u0176\7N\2\2\u0176"+
		"\67\3\2\2\2\u0177\u0178\5\n\5\2\u0178\u0179\7K\2\2\u0179\u017a\7H\2\2"+
		"\u017a9\3\2\2\2\u017b\u017c\5\n\5\2\u017c\u017d\7O\2\2\u017d\u017e\7W"+
		"\2\2\u017e\u017f\7N\2\2\u017f;\3\2\2\2\u0180\u0181\5\n\5\2\u0181\u0182"+
		"\7G\2\2\u0182\u0183\7T\2\2\u0183\u0184\7T\2\2\u0184=\3\2\2\2\u0185\u0186"+
		"\5\n\5\2\u0186\u0187\7Q\2\2\u0187\u0188\7W\2\2\u0188\u0189\7V\2\2\u0189"+
		"?\3\2\2\2\u018a\u018b\5\n\5\2\u018b\u018c\7K\2\2\u018c\u018d\7P\2\2\u018d"+
		"A\3\2\2\2\u018e\u018f\5\n\5\2\u018f\u0190\7V\2\2\u0190\u0191\7D\2\2\u0191"+
		"\u0192\7N\2\2\u0192C\3\2\2\2\u0193\u0194\5\n\5\2\u0194\u0195\7U\2\2\u0195"+
		"\u0196\7K\2\2\u0196\u0197\7F\2\2\u0197\u0198\7G\2\2\u0198E\3\2\2\2\u0199"+
		"\u019a\5\n\5\2\u019a\u019b\7R\2\2\u019b\u019c\7T\2\2\u019c\u019d\7G\2"+
		"\2\u019dG\3\2\2\2\u019e\u019f\5\n\5\2\u019f\u01a0\7T\2\2\u01a0\u01a1\7"+
		"G\2\2\u01a1\u01a2\7O\2\2\u01a2I\3\2\2\2\u01a3\u01a4\5\n\5\2\u01a4\u01a5"+
		"\7C\2\2\u01a5\u01a6\7F\2\2\u01a6\u01a7\7F\2\2\u01a7\u01a8\7R\2\2\u01a8"+
		"\u01a9\7T\2\2\u01a9\u01aa\7G\2\2\u01aa\u01ab\7E\2\2\u01abK\3\2\2\2\u01ac"+
		"\u01ad\5\n\5\2\u01ad\u01ae\7H\2\2\u01ae\u01af\7C\2\2\u01af\u01b0\7D\2"+
		"\2\u01b0\u01b1\7T\2\2\u01b1\u01b2\7K\2\2\u01b2\u01b3\7E\2\2\u01b3\u01b4"+
		"\7C\2\2\u01b4\u01b5\7V\2\2\u01b5\u01b6\7G\2\2\u01b6M\3\2\2\2\u01b7\u01b8"+
		"\5\n\5\2\u01b8\u01b9\7W\2\2\u01b9\u01ba\7U\2\2\u01ba\u01bb\7G\2\2\u01bb"+
		"\u01bc\7E\2\2\u01bc\u01bd\7W\2\2\u01bd\u01be\7T\2\2\u01be\u01bf\7V\2\2"+
		"\u01bf\u01c0\7O\2\2\u01c0O\3\2\2\2\u01c1\u01c2\5\n\5\2\u01c2\u01c3\7T"+
		"\2\2\u01c3\u01c4\7C\2\2\u01c4\u01c5\7P\2\2\u01c5\u01c6\7I\2\2\u01c6\u01c7"+
		"\7G\2\2\u01c7Q\3\2\2\2\u01c8\u01c9\5\n\5\2\u01c9\u01ca\7V\2\2\u01ca\u01cb"+
		"\7O\2\2\u01cb\u01cc\7F\2\2\u01cc\u01cd\7G\2\2\u01cd\u01ce\7H\2\2\u01ce"+
		"\u01cf\7U\2\2\u01cfS\3\2\2\2\u01d0\u01d1\5\n\5\2\u01d1\u01d2\7F\2\2\u01d2"+
		"\u01d3\7G\2\2\u01d3\u01d4\7N\2\2\u01d4\u01d5\7K\2\2\u01d5\u01d6\7O\2\2"+
		"\u01d6\u01d7\7K\2\2\u01d7\u01d8\7V\2\2\u01d8U\3\2\2\2\u01d9\u01da\5\n"+
		"\5\2\u01da\u01db\7D\2\2\u01db\u01dc\7C\2\2\u01dc\u01dd\7U\2\2\u01dd\u01de"+
		"\7K\2\2\u01de\u01df\7U\2\2\u01dfW\3\2\2\2\u01e0\u01e1\5\n\5\2\u01e1\u01e2"+
		"\7X\2\2\u01e2\u01e3\7C\2\2\u01e3\u01e4\7T\2\2\u01e4Y\3\2\2\2\u01e5\u01e6"+
		"\5\n\5\2\u01e6\u01e7\7V\2\2\u01e7\u01e8\7[\2\2\u01e8\u01e9\7R\2\2\u01e9"+
		"\u01ea\7G\2\2\u01ea[\3\2\2\2\u01eb\u01ec\5\n\5\2\u01ec\u01ed\7D\2\2\u01ed"+
		"\u01ee\7Q\2\2\u01ee\u01ef\7F\2\2\u01ef\u01f0\7[\2\2\u01f0]\3\2\2\2\u01f1"+
		"\u01f2\5\n\5\2\u01f2\u01f3\7E\2\2\u01f3\u01f4\7Q\2\2\u01f4\u01f5\7R\2"+
		"\2\u01f5\u01f6\7[\2\2\u01f6\u01f7\7U\2\2\u01f7\u01f8\7G\2\2\u01f8\u01f9"+
		"\7R\2\2\u01f9_\3\2\2\2\u01fa\u01fb\5\n\5\2\u01fb\u01fc\7H\2\2\u01fc\u01fd"+
		"\7W\2\2\u01fd\u01fe\7P\2\2\u01fe\u01ff\7E\2\2\u01ff\u0200\7V\2\2\u0200"+
		"\u0201\7K\2\2\u0201\u0202\7Q\2\2\u0202\u0203\7P\2\2\u0203a\3\2\2\2\u0204"+
		"\u0205\5\n\5\2\u0205\u0206\7F\2\2\u0206\u0207\7H\2\2\u0207\u0208\7N\2"+
		"\2\u0208\u0209\7V\2\2\u0209c\3\2\2\2\u020a\u020b\5\n\5\2\u020b\u020c\7"+
		"V\2\2\u020c\u020d\7E\2\2\u020d\u020e\7N\2\2\u020ee\3\2\2\2\u020f\u0210"+
		"\5\n\5\2\u0210\u0211\7R\2\2\u0211\u0212\7Q\2\2\u0212\u0213\7U\2\2\u0213"+
		"\u0214\7V\2\2\u0214g\3\2\2\2\u0215\u0216\5\n\5\2\u0216\u0217\7E\2\2\u0217"+
		"\u0218\7Q\2\2\u0218\u0219\7P\2\2\u0219\u021a\7F\2\2\u021ai\3\2\2\2\u021b"+
		"\u021c\5\n\5\2\u021c\u021d\7V\2\2\u021d\u021e\7J\2\2\u021e\u021f\7G\2"+
		"\2\u021f\u0220\7P\2\2\u0220\u0221\7D\2\2\u0221\u0222\7Q\2\2\u0222\u0223"+
		"\7F\2\2\u0223\u0224\7[\2\2\u0224k\3\2\2\2\u0225\u0226\5\n\5\2\u0226\u0227"+
		"\7G\2\2\u0227\u0228\7N\2\2\u0228\u0229\7U\2\2\u0229\u022a\7G\2\2\u022a"+
		"\u022b\7D\2\2\u022b\u022c\7Q\2\2\u022c\u022d\7F\2\2\u022d\u022e\7[\2\2"+
		"\u022em\3\2\2\2\u022f\u0230\7P\2\2\u0230\u0231\7Q\2\2\u0231\u0232\7M\2"+
		"\2\u0232o\3\2\2\2\u0233\u0234\7C\2\2\u0234\u0235\7H\2\2\u0235\u0236\7"+
		"V\2\2\u0236q\3\2\2\2\u0237\u0238\7H\2\2\u0238\u0239\7C\2\2\u0239\u023a"+
		"\7E\2\2\u023as\3\2\2\2\u023b\u023c\7J\2\2\u023c\u023d\7P\2\2\u023d\u023e"+
		"\7G\2\2\u023eu\3\2\2\2\u023f\u0244\5n\67\2\u0240\u0244\5p8\2\u0241\u0244"+
		"\5t:\2\u0242\u0244\5r9\2\u0243\u023f\3\2\2\2\u0243\u0240\3\2\2\2\u0243"+
		"\u0241\3\2\2\2\u0243\u0242\3\2\2\2\u0244w\3\2\2\2\u0245\u0249\5\u00a0"+
		"P\2\u0246\u024a\5v;\2\u0247\u024a\5\u008aE\2\u0248\u024a\5\u0092I\2\u0249"+
		"\u0246\3\2\2\2\u0249\u0247\3\2\2\2\u0249\u0248\3\2\2\2\u024ay\3\2\2\2"+
		"\u024b\u024c\5\n\5\2\u024c\u024d\7k\2\2\u024d\u024e\7p\2\2\u024e\u024f"+
		"\7r\2\2\u024f\u0250\7w\2\2\u0250\u0251\7v\2\2\u0251{\3\2\2\2\u0252\u0253"+
		"\5\n\5\2\u0253\u0254\7q\2\2\u0254\u0255\7w\2\2\u0255\u0256\7v\2\2\u0256"+
		"\u0257\7r\2\2\u0257\u0258\7w\2\2\u0258\u0259\7v\2\2\u0259}\3\2\2\2\u025a"+
		"\u025b\t\3\2\2\u025b\u025c\t\3\2\2\u025c\u025d\t\4\2\2\u025d\177\3\2\2"+
		"\2\u025e\u025f\7%\2\2\u025f\u0081\3\2\2\2\u0260\u0279\5\n\5\2\u0261\u0262"+
		"\7e\2\2\u0262\u027a\7v\2\2\u0263\u0264\7n\2\2\u0264\u027a\7g\2\2\u0265"+
		"\u0266\7n\2\2\u0266\u027a\7v\2\2\u0267\u0268\7i\2\2\u0268\u027a\7g\2\2"+
		"\u0269\u026a\7i\2\2\u026a\u027a\7v\2\2\u026b\u026c\7g\2\2\u026c\u027a"+
		"\7s\2\2\u026d\u026e\7p\2\2\u026e\u027a\7g\2\2\u026f\u0270\7>\2\2\u0270"+
		"\u027a\7?\2\2\u0271\u027a\7>\2\2\u0272\u0273\7@\2\2\u0273\u027a\7?\2\2"+
		"\u0274\u027a\7@\2\2\u0275\u0276\7?\2\2\u0276\u027a\7?\2\2\u0277\u0278"+
		"\7#\2\2\u0278\u027a\7?\2\2\u0279\u0261\3\2\2\2\u0279\u0263\3\2\2\2\u0279"+
		"\u0265\3\2\2\2\u0279\u0267\3\2\2\2\u0279\u0269\3\2\2\2\u0279\u026b\3\2"+
		"\2\2\u0279\u026d\3\2\2\2\u0279\u026f\3\2\2\2\u0279\u0271\3\2\2\2\u0279"+
		"\u0272\3\2\2\2\u0279\u0274\3\2\2\2\u0279\u0275\3\2\2\2\u0279\u0277\3\2"+
		"\2\2\u027a\u0083\3\2\2\2\u027b\u0280\5\n\5\2\u027c\u027d\7~\2\2\u027d"+
		"\u0281\7~\2\2\u027e\u027f\7(\2\2\u027f\u0281\7(\2\2\u0280\u027c\3\2\2"+
		"\2\u0280\u027e\3\2\2\2\u0281\u0085\3\2\2\2\u0282\u0283\7/\2\2\u0283\u0087"+
		"\3\2\2\2\u0284\u0285\5\n\5\2\u0285\u0286\5\u0086C\2\u0286\u0089\3\2\2"+
		"\2\u0287\u0288\5\n\5\2\u0288\u0289\5\u008eG\2\u0289\u008b\3\2\2\2\u028a"+
		"\u028b\5\n\5\2\u028b\u028c\5\u00a6S\2\u028c\u028d\5\u008eG\2\u028d\u008d"+
		"\3\2\2\2\u028e\u0292\5\u0094J\2\u028f\u0292\5\u0098L\2\u0290\u0292\5\u009c"+
		"N\2\u0291\u028e\3\2\2\2\u0291\u028f\3\2\2\2\u0291\u0290\3\2\2\2\u0292"+
		"\u0298\3\2\2\2\u0293\u0297\5\u0094J\2\u0294\u0297\5\u0096K\2\u0295\u0297"+
		"\5\u0098L\2\u0296\u0293\3\2\2\2\u0296\u0294\3\2\2\2\u0296\u0295\3\2\2"+
		"\2\u0297\u029a\3\2\2\2\u0298\u0296\3\2\2\2\u0298\u0299\3\2\2\2\u0299\u008f"+
		"\3\2\2\2\u029a\u0298\3\2\2\2\u029b\u029d\5\n\5\2\u029c\u029e\5\u0096K"+
		"\2\u029d\u029c\3\2\2\2\u029e\u029f\3\2\2\2\u029f\u029d\3\2\2\2\u029f\u02a0"+
		"\3\2\2\2\u02a0\u0091\3\2\2\2\u02a1\u02a6\5\n\5\2\u02a2\u02a7\5\u0094J"+
		"\2\u02a3\u02a7\5\u0096K\2\u02a4\u02a7\5\u0098L\2\u02a5\u02a7\5\u0086C"+
		"\2\u02a6\u02a2\3\2\2\2\u02a6\u02a3\3\2\2\2\u02a6\u02a4\3\2\2\2\u02a6\u02a5"+
		"\3\2\2\2\u02a7\u02a8\3\2\2\2\u02a8\u02a6\3\2\2\2\u02a8\u02a9\3\2\2\2\u02a9"+
		"\u0093\3\2\2\2\u02aa\u02ab\t\5\2\2\u02ab\u0095\3\2\2\2\u02ac\u02ad\t\6"+
		"\2\2\u02ad\u0097\3\2\2\2\u02ae\u02af\7a\2\2\u02af\u0099\3\2\2\2\u02b0"+
		"\u02b1\5\n\5\2\u02b1\u02b2\5\u0098L\2\u02b2\u009b\3\2\2\2\u02b3\u02b4"+
		"\5\n\5\2\u02b4\u02b5\7&\2\2\u02b5\u009d\3\2\2\2\u02b6\u02b7\7\60\2\2\u02b7"+
		"\u009f\3\2\2\2\u02b8\u02b9\5\n\5\2\u02b9\u02ba\7B\2\2\u02ba\u00a1\3\2"+
		"\2\2\u02bb\u02bc\7\'\2\2\u02bc\u00a3\3\2\2\2\u02bd\u02be\5\n\5\2\u02be"+
		"\u02bf\7`\2\2\u02bf\u00a5\3\2\2\2\u02c0\u02c1\5\n\5\2\u02c1\u02c2\7\u0080"+
		"\2\2\u02c2\u00a7\3\2\2\2\u02c3\u02c4\5\n\5\2\u02c4\u02c5\7\61\2\2\u02c5"+
		"\u00a9\3\2\2\2\u02c6\u02c7\5\n\5\2\u02c7\u02c8\7,\2\2\u02c8\u00ab\3\2"+
		"\2\2\u02c9\u02ca\5\n\5\2\u02ca\u02cb\7.\2\2\u02cb\u00ad\3\2\2\2\u02cc"+
		"\u02cd\5\n\5\2\u02cd\u02ce\7-\2\2\u02ce\u00af\3\2\2\2\u02cf\u02d0\5\n"+
		"\5\2\u02d0\u02d1\7#\2\2\u02d1\u00b1\3\2\2\2\u02d2\u02d5\5\n\5\2\u02d3"+
		"\u02d6\5\u008aE\2\u02d4\u02d6\5\u009cN\2\u02d5\u02d3\3\2\2\2\u02d5\u02d4"+
		"\3\2\2\2\u02d5\u02d6\3\2\2\2\u02d6\u02dd\3\2\2\2\u02d7\u02de\5\u00a4R"+
		"\2\u02d8\u02da\5\u00a2Q\2\u02d9\u02d8\3\2\2\2\u02da\u02db\3\2\2\2\u02db"+
		"\u02d9\3\2\2\2\u02db\u02dc\3\2\2\2\u02dc\u02de\3\2\2\2\u02dd\u02d7\3\2"+
		"\2\2\u02dd\u02d9\3\2\2\2\u02de\u02df\3\2\2\2\u02df\u02e0\5\u008aE\2\u02e0"+
		"\u00b3\3\2\2\2\u02e1\u02e2\7}\2\2\u02e2\u02e3\7?\2\2\u02e3\u00b5\3\2\2"+
		"\2\u02e4\u02e8\5\u00b4Z\2\u02e5\u02e7\n\7\2\2\u02e6\u02e5\3\2\2\2\u02e7"+
		"\u02ea\3\2\2\2\u02e8\u02e6\3\2\2\2\u02e8\u02e9\3\2\2\2\u02e9\u02eb\3\2"+
		"\2\2\u02ea\u02e8\3\2\2\2\u02eb\u02ec\5\20\b\2\u02ec\u00b7\3\2\2\2\u02ed"+
		"\u02ee\5\n\5\2\u02ee\u02ef\7?\2\2\u02ef\u00b9\3\2\2\2\u02f0\u02f8\5\u00b8"+
		"\\\2\u02f1\u02f2\7O\2\2\u02f2\u02f3\5\u0088D\2\u02f3\u02f4\5\u00bc^\2"+
		"\u02f4\u02f9\3\2\2\2\u02f5\u02f9\5\u00be_\2\u02f6\u02f9\5\u00c0`\2\u02f7"+
		"\u02f9\5\u00c2a\2\u02f8\u02f1\3\2\2\2\u02f8\u02f5\3\2\2\2\u02f8\u02f6"+
		"\3\2\2\2\u02f8\u02f7\3\2\2\2\u02f9\u00bb\3\2\2\2\u02fa\u02fc\n\b\2\2\u02fb"+
		"\u02fa\3\2\2\2\u02fc\u02fd\3\2\2\2\u02fd\u02fb\3\2\2\2\u02fd\u02fe\3\2"+
		"\2\2\u02fe\u02ff\3\2\2\2\u02ff\u0300\5\u0088D\2\u0300\u00bd\3\2\2\2\u0301"+
		"\u0303\7*\2\2\u0302\u0304\n\t\2\2\u0303\u0302\3\2\2\2\u0304\u0305\3\2"+
		"\2\2\u0305\u0303\3\2\2\2\u0305\u0306\3\2\2\2\u0306\u0307\3\2\2\2\u0307"+
		"\u0308\5\u00b8\\\2\u0308\u0309\5\30\f\2\u0309\u00bf\3\2\2\2\u030a\u0312"+
		"\5\6\3\2\u030b\u030d\t\3\2\2\u030c\u030b\3\2\2\2\u030d\u0310\3\2\2\2\u030e"+
		"\u030c\3\2\2\2\u030e\u030f\3\2\2\2\u030f\u0313\3\2\2\2\u0310\u030e\3\2"+
		"\2\2\u0311\u0313\5\u0088D\2\u0312\u030e\3\2\2\2\u0312\u0311\3\2\2\2\u0313"+
		"\u00c1\3\2\2\2\u0314\u0316\n\n\2\2\u0315\u0314\3\2\2\2\u0316\u0317\3\2"+
		"\2\2\u0317\u0315\3\2\2\2\u0317\u0318\3\2\2\2\u0318\u00c3\3\2\2\2\u0319"+
		"\u031d\5\u00b8\\\2\u031a\u031c\t\2\2\2\u031b\u031a\3\2\2\2\u031c\u031f"+
		"\3\2\2\2\u031d\u031b\3\2\2\2\u031d\u031e\3\2\2\2\u031e\u0328\3\2\2\2\u031f"+
		"\u031d\3\2\2\2\u0320\u0322\5\u00c6c\2\u0321\u0323\t\2\2\2\u0322\u0321"+
		"\3\2\2\2\u0323\u0324\3\2\2\2\u0324\u0322\3\2\2\2\u0324\u0325\3\2\2\2\u0325"+
		"\u0327\3\2\2\2\u0326\u0320\3\2\2\2\u0327\u032a\3\2\2\2\u0328\u0326\3\2"+
		"\2\2\u0328\u0329\3\2\2\2\u0329\u032b\3\2\2\2\u032a\u0328\3\2\2\2\u032b"+
		"\u032d\5\u00c6c\2\u032c\u032e\5\u0086C\2\u032d\u032c\3\2\2\2\u032d\u032e"+
		"\3\2\2\2\u032e\u00c5\3\2\2\2\u032f\u0333\t\13\2\2\u0330\u0332\t\f\2\2"+
		"\u0331\u0330\3\2\2\2\u0332\u0335\3\2\2\2\u0333\u0331\3\2\2\2\u0333\u0334"+
		"\3\2\2\2\u0334\u0355\3\2\2\2\u0335\u0333\3\2\2\2\u0336\u0337\t\r\2\2\u0337"+
		"\u033b\t\16\2\2\u0338\u033a\t\f\2\2\u0339\u0338\3\2\2\2\u033a\u033d\3"+
		"\2\2\2\u033b\u0339\3\2\2\2\u033b\u033c\3\2\2\2\u033c\u0355\3\2\2\2\u033d"+
		"\u033b\3\2\2\2\u033e\u033f\t\r\2\2\u033f\u0341\t\17\2\2\u0340\u0342\t"+
		"\f\2\2\u0341\u0340\3\2\2\2\u0342\u0343\3\2\2\2\u0343\u0341\3\2\2\2\u0343"+
		"\u0344\3\2\2\2\u0344\u0355\3\2\2\2\u0345\u034e\7*\2\2\u0346\u0348\5\u00c6"+
		"c\2\u0347\u0349\t\2\2\2\u0348\u0347\3\2\2\2\u0349\u034a\3\2\2\2\u034a"+
		"\u0348\3\2\2\2\u034a\u034b\3\2\2\2\u034b\u034d\3\2\2\2\u034c\u0346\3\2"+
		"\2\2\u034d\u0350\3\2\2\2\u034e\u034c\3\2\2\2\u034e\u034f\3\2\2\2\u034f"+
		"\u0351\3\2\2\2\u0350\u034e\3\2\2\2\u0351\u0352\5\u00c6c\2\u0352\u0353"+
		"\7+\2\2\u0353\u0355\3\2\2\2\u0354\u032f\3\2\2\2\u0354\u0336\3\2\2\2\u0354"+
		"\u033e\3\2\2\2\u0354\u0345\3\2\2\2\u0355\u00c7\3\2\2\2\u0356\u0357\5\n"+
		"\5\2\u0357\u0367\5\u0092I\2\u0358\u0359\7\60\2\2\u0359\u035b\5\u0092I"+
		"\2\u035a\u0358\3\2\2\2\u035b\u035e\3\2\2\2\u035c\u035a\3\2\2\2\u035c\u035d"+
		"\3\2\2\2\u035d\u0365\3\2\2\2\u035e\u035c\3\2\2\2\u035f\u0360\7\60\2\2"+
		"\u0360\u0361\7]\2\2\u0361\u0362\3\2\2\2\u0362\u0363\5\u0090H\2\u0363\u0364"+
		"\7_\2\2\u0364\u0366\3\2\2\2\u0365\u035f\3\2\2\2\u0365\u0366\3\2\2\2\u0366"+
		"\u0368\3\2\2\2\u0367\u035c\3\2\2\2\u0367\u0368\3\2\2\2\u0368\u00c9\3\2"+
		"\2\2\u0369\u036a\5\u0080@\2\u036a\u036b\5\u0090H\2\u036b\u00cb\3\2\2\2"+
		"\u036c\u0376\5^/\2\u036d\u0377\5\u0092I\2\u036e\u0377\5\u00a4R\2\u036f"+
		"\u0377\5\u0088D\2\u0370\u0377\5\u008aE\2\u0371\u0377\5\u00aaU\2\u0372"+
		"\u0377\5\u00acV\2\u0373\u0377\5\u00b8\\\2\u0374\u0377\5\u00aeW\2\u0375"+
		"\u0377\5\u00a8T\2\u0376\u036d\3\2\2\2\u0376\u036e\3\2\2\2\u0376\u036f"+
		"\3\2\2\2\u0376\u0370\3\2\2\2\u0376\u0371\3\2\2\2\u0376\u0372\3\2\2\2\u0376"+
		"\u0373\3\2\2\2\u0376\u0374\3\2\2\2\u0376\u0375\3\2\2\2\u0377\u00cd\3\2"+
		"\2\2\u0378\u0379\5\n\5\2\u0379\u037a\7^\2\2\u037a\u037b\13\2\2\2\u037b"+
		"\u00cf\3\2\2\2\u037c\u037d\7^\2\2\u037d\u00d1\3\2\2\2\u037e\u0380\5\4"+
		"\2\2\u037f\u037e\3\2\2\2\u0380\u0383\3\2\2\2\u0381\u037f\3\2\2\2\u0381"+
		"\u0382\3\2\2\2\u0382\u0385\3\2\2\2\u0383\u0381\3\2\2\2\u0384\u0386\5\u00d4"+
		"j\2\u0385\u0384\3\2\2\2\u0385\u0386\3\2\2\2\u0386\u0387\3\2\2\2\u0387"+
		"\u0388\7r\2\2\u0388\u0389\7t\2\2\u0389\u038a\7q\2\2\u038a\u038b\7n\2\2"+
		"\u038b\u038c\7q\2\2\u038c\u038d\7i\2\2\u038d\u038e\7w\2\2\u038e\u038f"+
		"\7g\2\2\u038f\u0390\3\2\2\2\u0390\u0391\5\4\2\2\u0391\u0392\3\2\2\2\u0392"+
		"\u0393\bi\2\2\u0393\u00d3\3\2\2\2\u0394\u0395\7%\2\2\u0395\u0396\7\"\2"+
		"\2\u0396\u0397\7Z\2\2\u0397\u0398\7n\2\2\u0398\u0399\7c\2\2\u0399\u039a"+
		"\7v\2\2\u039a\u039b\7g\2\2\u039b\u039c\7\"\2\2\u039c\u039d\7U\2\2\u039d"+
		"\u039e\7r\2\2\u039e\u039f\7g\2\2\u039f\u03a0\7e\2\2\u03a0\u03a1\7<\2\2"+
		"\u03a1\u03a3\3\2\2\2\u03a2\u03a4\n\20\2\2\u03a3\u03a2\3\2\2\2\u03a4\u03a5"+
		"\3\2\2\2\u03a5\u03a3\3\2\2\2\u03a5\u03a6\3\2\2\2\u03a6\u03a7\3\2\2\2\u03a7"+
		"\u03a8\5\4\2\2\u03a8\u03a9\7%\2\2\u03a9\u03aa\5\4\2\2\u03aa\u00d5\3\2"+
		"\2\2\u03ab\u03ad\5\n\5\2\u03ac\u03ae\13\2\2\2\u03ad\u03ac\3\2\2\2\u03ae"+
		"\u03af\3\2\2\2\u03af\u03b0\3\2\2\2\u03af\u03ad\3\2\2\2\u03b0\u00d7\3\2"+
		"\2\2\u03b1\u03b2\7g\2\2\u03b2\u03b3\7p\2\2\u03b3\u03b4\7f\2\2\u03b4\u03b5"+
		"\7a\2\2\u03b5\u03b6\7r\2\2\u03b6\u03b7\7t\2\2\u03b7\u03b8\7q\2\2\u03b8"+
		"\u03b9\7n\2\2\u03b9\u03ba\7q\2\2\u03ba\u03bb\7i\2\2\u03bb\u03bc\7w\2\2"+
		"\u03bc\u03bd\7g\2\2\u03bd\u03be\3\2\2\2\u03be\u03bf\5\4\2\2\u03bf\u03c0"+
		"\3\2\2\2\u03c0\u03c1\bl\3\2\u03c1\u00d9\3\2\2\2\u03c2\u03c4\5\6\3\2\u03c3"+
		"\u03c2\3\2\2\2\u03c4\u03c7\3\2\2\2\u03c5\u03c3\3\2\2\2\u03c5\u03c6\3\2"+
		"\2\2\u03c6\u03c8\3\2\2\2\u03c7\u03c5\3\2\2\2\u03c8\u03c9\5\u008aE\2\u03c9"+
		"\u03cb\7<\2\2\u03ca\u03cc\n\20\2\2\u03cb\u03ca\3\2\2\2\u03cc\u03cd\3\2"+
		"\2\2\u03cd\u03cb\3\2\2\2\u03cd\u03ce\3\2\2\2\u03ce\u03cf\3\2\2\2\u03cf"+
		"\u03d0\5\4\2\2\u03d0\u00db\3\2\2\2\60\2\3\u00dd\u00e5\u00e7\u00ea\u0243"+
		"\u0249\u0279\u0280\u0291\u0296\u0298\u029f\u02a6\u02a8\u02d5\u02db\u02dd"+
		"\u02e8\u02f8\u02fd\u0305\u030e\u0312\u0317\u031d\u0324\u0328\u032d\u0333"+
		"\u033b\u0343\u034a\u034e\u0354\u035c\u0365\u0367\u0376\u0381\u0385\u03a5"+
		"\u03af\u03c5\u03cd\4\4\3\2\4\2\2";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}