/***
 * Excerpted from "The Definitive ANTLR 4 Reference",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material, 
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose. 
 * Visit http://www.pragmaticprogrammer.com/titles/tpantlr2 for more book information.
***/
// import ANTLR's runtime libraries
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.tree.*;
import org.antlr.v4.runtime.CharStreams;
import java.util.*;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.PrintStream;
import java.io.File;
 

public class CloverleafToXML {
    public static void main(String[] args) throws Exception {
		String inputFile = null;
		String outputFile = null;
		if ( args.length>0 ) {
			inputFile = args[0];
			outputFile = args[1];
		}
		
		InputStream is = System.in;
		if ( inputFile!=null ) is = new FileInputStream(inputFile); 
		CharStream input = CharStreams.fromStream(is);
		//ANTLRInputStream input = new ANTLRInputStream(is);
  
        // create a lexer that feeds off of input CharStream
        CloverleafLexer lexer = new CloverleafLexer(input);

        // create a buffer of tokens pulled from the lexer
        CommonTokenStream tokens = new CommonTokenStream(lexer);

		CloverleafParser parser = new CloverleafParser(tokens);
		lexer.removeErrorListeners();
		lexer.addErrorListener(CloverleafErrorListener.INSTANCE);
		parser.removeErrorListeners();
		parser.addErrorListener(CloverleafErrorListener.INSTANCE);

        ParseTree tree = parser.program(); // begin parsing at init rule
		if(new String("").equals(CloverleafErrorListener.INSTANCE.toString())) {
			// only create the output file after we have parsed
			if ( outputFile!=null ) {
				PrintStream os = new PrintStream(new File(outputFile));
				System.setOut(os);
			}
		ParseTreeWalker.DEFAULT.walk(new CloverleafParserBaseListener()
		{
	   	 	final String INDENT = "";
	    	int level = 0;
	    	@Override
	    	public void enterEveryRule(final ParserRuleContext ctx)
	    	{
	    	    System.out.printf("%s<%s>", indent(), parser.getRuleNames()[ctx.getRuleIndex()]);
	 	  	     ++level;
	  		      super.enterEveryRule(ctx);
	 	   }
	
		    @Override
		    public void exitEveryRule(final ParserRuleContext ctx)
		    {
		        --level;
		   	     System.out.printf("%s</%s>", indent(), parser.getRuleNames()[ctx.getRuleIndex()]);
		        super.exitEveryRule(ctx);
		    }

		    @Override
		    public void visitTerminal(final TerminalNode node)
		    {
		        final String value = node.getText();
		        if (!value.matches("\\s+"))
		        {
		            System.out.printf("%s%s", indent(), escapeHTML(node.getText()));
		        }
		        super.visitTerminal(node);
		    }

		   	 private String indent()
		    {
		        return String.join("", Collections.nCopies(level, INDENT));
		    }
		    
		    private String escapeHTML(String source)
		    {
		    	return source.replace("<", "&lt;").replace("&", "&amp;").replace(">","&gt;");
		    }
		}, tree);        
       } 
    }
}