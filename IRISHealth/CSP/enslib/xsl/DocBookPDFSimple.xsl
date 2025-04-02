<?xml version='1.0' encoding='UTF-8'?>

<!-- ============================================================ -->
<!--                                                              -->
<!-- READ THIS FIRST:                                             -->
<!--                                                              -->
<!-- This stylesheet renders DocBook into PDF using XEP or FOP.   -->
<!-- It was developed to support the generated                    -->
<!-- production configuration report, but supports re-use.        -->
<!-- It has been thoroughly tested with both XEP and FOP.         -->
<!--                                                              -->
<!-- This is a simpler adaptation of the to-PDF stylesheet used   -->
<!-- to produce InterSystems product documentation from DocBook   -->
<!-- XML source files. This adaptation is completely independent  -->
<!-- of the professional-grade infrastructure required to produce -->
<!-- InterSystems documentation and permits customization using   -->
<!-- an arbitrary corporate logo, colors, address, and web site.  -->
<!--                                                              -->
<!-- TODO: Zen user interface for specifying param values.        -->
<!--                                                              -->
<!--     Author: Susan Korgen                                     -->
<!--     (c) 2008 and later years by InterSystems Corporation     -->
<!--                                                              -->
<!-- ============================================================ -->
<!-- This stylesheet requires the following file to be present    -->
<!-- in the same directory. This file is a simple definition      -->
<!-- of various character names. No other files besides this      -->
<!-- need to be present for this stylesheet to work:              -->
<!--                                                              -->
<!-- winansi.entities                                             -->
<!--                                                              -->
<!-- ============================================================ -->
<!-- This stylesheet places the following restrictions upon 	  -->
<!-- the DocBook XML input file and the tags that it contains:	  -->
<!--                                                              -->
<!-- 	1.	Tables must have colwidth values specified. colwidth  -->
<!--		must supply actual width units, as for example '3.1in'-->
<!--   		because FOP does not support the more flexible '*'    -->
<!--		convention in colwidth values. The only width unit    -->
<!--   		tested was 'in' (inch) which works fine. For          -->
<!--		best layout, the sum of the colwidth values within    -->
<!-- 		a single table should be the page width minus the     -->
<!--		margins, currently 8.5 - (0.7 + 0.7) = 6.1            -->
<!--                                                              -->
<!--	2.  Graphics must have width values specified,			  -->
<!--		with the same restrictions on units as above.		  -->
<!--		RenderX does fine without widths but FOP does not.    -->
<!--                                                              -->
<!--    3.	An id value must be supplied for all of the following:-->
<!--		chapter, appendix, glossary, section, sect1, sect2    -->
<!--                                                              -->
<!-- ============================================================ -->
<!-- This stylesheet supports the following DocBook tags:
		appendix
		book
		caution
		chapter
		citetitle
		classname
		command
		computeroutput
		constant
		emphasis
		errorname
		example
		figure
		filename
		firstterm
		function
		glossary
		glossentry
		graphic
		guibutton
		guiicon
		guilabel
		guimenu
		guimenuitem
		guisubmenu
		important
		informaltable
		inlinegraphic
		interface
		itemizedlist
		keycap
		keycode
		link
		literal
		literallayout
		listitem
		method
		methodname
		note
		orderedlist
		para
		parameter
		programlisting
		property
		quote
		sect1
		sect2
		sect3
		sect4
		section
		subscript
		superscript
		synopsis
		systemitem
		table
		tip
		title
		type
		ulink
		userinput
		varname
		warning
	-->
<!-- ============================================================ -->

<!DOCTYPE xsl:stylesheet[
          <!ENTITY % winansi SYSTEM "winansi.entities">
          %winansi;
          ]>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:fo="http://www.w3.org/1999/XSL/Format"
                >

<xsl:output method="xml"
               version="1.0"
               indent="no"
               encoding="ISO-8859-1"/>

   <!-- *************************************************************** -->
   <!-- Parameters                                                      -->
   <!-- *************************************************************** -->

   <xsl:param name="title-color">#00006A</xsl:param>
   <xsl:param name="href-color">#0040C0</xsl:param>
   <xsl:param name="logo-image">../InterSystems.jpg</xsl:param>
   <xsl:param name="logo-name">InterSystems Corporation</xsl:param>
   <xsl:param name="logo-address1">World Headquarters</xsl:param>
   <xsl:param name="logo-address2">1 Memorial Drive</xsl:param>
   <xsl:param name="logo-citystatezip">Cambridge, MA 02142</xsl:param>
   <xsl:param name="logo-website">www.intersystems.com</xsl:param>

   <xsl:param name="opus">
      <xsl:value-of select="book/title"/>
   </xsl:param>

   <xsl:param name="bookid">
      <xsl:value-of select="book/id"/>
   </xsl:param>

   <!-- *************************************************************** -->
   <!-- Attribute sets: Page dimensions                                 -->
   <!-- *************************************************************** -->

   <xsl:attribute-set name="page-dimensions">
      <xsl:attribute name="page-height"> 11in </xsl:attribute>
      <xsl:attribute name="page-width"> 8.5in </xsl:attribute>
   </xsl:attribute-set>

   <xsl:attribute-set name="cover-page-margins">
      <xsl:attribute name="margin-top"> 1.5in </xsl:attribute>
      <xsl:attribute name="margin-bottom"> 3.0in </xsl:attribute>
      <xsl:attribute name="margin-left"> 1.2in </xsl:attribute>
      <xsl:attribute name="margin-right"> 1.2in </xsl:attribute>
   </xsl:attribute-set>

   <xsl:attribute-set name="blank-page-margins">
      <xsl:attribute name="margin-top"> 0.5in </xsl:attribute>
      <xsl:attribute name="margin-bottom">0.75in </xsl:attribute>
      <xsl:attribute name="margin-left"> 0.7in </xsl:attribute>
      <xsl:attribute name="margin-right">0.7in </xsl:attribute>
   </xsl:attribute-set>

   <xsl:attribute-set name="regular-page-margins">
      <xsl:attribute name="margin-top">0.5in</xsl:attribute>
      <xsl:attribute name="margin-bottom">0.75in</xsl:attribute>
      <xsl:attribute name="margin-left">0.7in</xsl:attribute>
      <xsl:attribute name="margin-right">0.7in</xsl:attribute>
   </xsl:attribute-set>

   <!-- *************************************************************** -->
   <!-- Attribute sets: Miscellaneous                                   -->
   <!-- *************************************************************** -->

   <xsl:attribute-set name="cover-attrs">
      <xsl:attribute name="font-size">36pt</xsl:attribute>
      <xsl:attribute name="font-family">serif</xsl:attribute>
   </xsl:attribute-set>

   <xsl:attribute-set name="regular-attrs">
      <xsl:attribute name="color">black</xsl:attribute>
      <xsl:attribute name="font-family">serif</xsl:attribute>
      <xsl:attribute name="font-size">10pt</xsl:attribute>
      <xsl:attribute name="text-align">left</xsl:attribute>
   </xsl:attribute-set>

   <xsl:attribute-set name="title-attrs">
      <xsl:attribute name="color">
         <xsl:value-of select="$title-color"/>
      </xsl:attribute>
      <xsl:attribute name="font-family">sans-serif</xsl:attribute>
      <xsl:attribute name="keep-together.within-page">always</xsl:attribute>
      <xsl:attribute name="keep-with-next.within-page">always</xsl:attribute>
      <xsl:attribute name="space-after.optimum">10pt</xsl:attribute>
   </xsl:attribute-set>

   <xsl:attribute-set name="href-attrs">
      <xsl:attribute name="color">
         <xsl:value-of select="$href-color"/>
      </xsl:attribute>
      <xsl:attribute name="text-decoration">underline</xsl:attribute>
   </xsl:attribute-set>

   <xsl:attribute-set name="header-attrs">
      <xsl:attribute name="font-size">9pt</xsl:attribute>
      <xsl:attribute name="font-family">serif</xsl:attribute>
      <xsl:attribute name="font-style">italic</xsl:attribute>
   </xsl:attribute-set>

   <xsl:attribute-set name="small-attrs">
      <xsl:attribute name="font-size">12pt</xsl:attribute>
      <xsl:attribute name="font-family">sans-serif</xsl:attribute>
   </xsl:attribute-set>

   <xsl:attribute-set name="subtitle-attrs">
      <xsl:attribute name="color">
         <xsl:value-of select="$title-color"/>
      </xsl:attribute>
      <xsl:attribute name="font-family">sans-serif</xsl:attribute>
      <xsl:attribute name="keep-together.within-page">always</xsl:attribute>
      <xsl:attribute name="keep-with-next.within-page">always</xsl:attribute>
      <xsl:attribute name="space-before.optimum">18pt</xsl:attribute>
      <xsl:attribute name="space-after.optimum">18pt</xsl:attribute>
      <xsl:attribute name="font-size"> 20pt </xsl:attribute>
   </xsl:attribute-set>


   <!-- *************************************************************** -->
   <!-- Top-level template: document layout for a book                  -->
   <!-- *************************************************************** -->

   <xsl:template match="book">
      <fo:root hyphenation-push-character-count="3"
               hyphenation-remain-character-count="3">
         <fo:layout-master-set>

            <fo:simple-page-master master-name="cover-page"
                                   xsl:use-attribute-sets="page-dimensions">
               <fo:region-body xsl:use-attribute-sets="cover-page-margins"/>
               <fo:region-before extent="0.5in" region-name="header"/>
               <fo:region-after extent="2.0in" region-name="footer"/>
            </fo:simple-page-master>

            <fo:simple-page-master master-name="blank-page"
                                   xsl:use-attribute-sets="page-dimensions">
               <fo:region-body xsl:use-attribute-sets="regular-page-margins"
                               display-align="after"/>
               <fo:region-after extent="0.7in"/>
            </fo:simple-page-master>

            <fo:simple-page-master master-name="first-page-right"
                                   xsl:use-attribute-sets="page-dimensions">
               <fo:region-body xsl:use-attribute-sets="regular-page-margins"/>
               <fo:region-before extent="0.5in" region-name="first-header"/>
               <fo:region-after extent="0.5in" region-name="footer"/>
            </fo:simple-page-master>

            <fo:simple-page-master master-name="regular-page-left"
                                   xsl:use-attribute-sets="page-dimensions">
               <fo:region-body xsl:use-attribute-sets="regular-page-margins"/>
               <fo:region-before extent="0.5in" region-name="header"/>
               <fo:region-after extent="0.5in" region-name="footer"/>
            </fo:simple-page-master>

            <fo:simple-page-master master-name="regular-page-right"
                                   xsl:use-attribute-sets="page-dimensions">
               <fo:region-body xsl:use-attribute-sets="regular-page-margins"/>
               <fo:region-before extent="0.5in" region-name="header"/>
               <fo:region-after extent="0.5in" region-name="footer"/>
            </fo:simple-page-master>

            <!-- Sequences -->

            <fo:page-sequence-master master-name="cover">
               <fo:single-page-master-reference master-reference="cover-page"/>
            </fo:page-sequence-master>
            <fo:page-sequence-master master-name="TOC">
               <fo:repeatable-page-master-alternatives>
                  <fo:conditional-page-master-reference page-position="first"
                                                        master-reference="first-page-right"/>
                  <fo:conditional-page-master-reference blank-or-not-blank="blank"
                                                        master-reference="blank-page"/>
                  <fo:conditional-page-master-reference odd-or-even="odd"
                                                        master-reference="regular-page-right"/>
                  <fo:conditional-page-master-reference odd-or-even="even"
                                                        master-reference="regular-page-left"/>
               </fo:repeatable-page-master-alternatives>
            </fo:page-sequence-master>

            <fo:page-sequence-master master-name="body">
               <fo:repeatable-page-master-alternatives>
                  <fo:conditional-page-master-reference page-position="first"
                                                        master-reference="first-page-right"/>
                  <fo:conditional-page-master-reference blank-or-not-blank="blank"
                                                        master-reference="blank-page"/>
                  <fo:conditional-page-master-reference odd-or-even="odd"
                                                        master-reference="regular-page-right"/>
                  <fo:conditional-page-master-reference odd-or-even="even"
                                                        master-reference="regular-page-left"/>
               </fo:repeatable-page-master-alternatives>
            </fo:page-sequence-master>
         </fo:layout-master-set>

         <!-- Book cover page -->

         <xsl:apply-templates select="title"/>

         <!-- Book table of contents -->

         <xsl:call-template name="book-toc"/>

         <!-- chapters, appedixes, glossaries -->

         <xsl:call-template name="book-body"/>

      </fo:root>
   </xsl:template>


   <!-- *************************************************************** -->
   <!-- Book cover Page                                         -->
   <!-- *************************************************************** -->

   <xsl:template match="book/title">
      <fo:page-sequence master-reference="cover"
                        id="cover-page"
                        format="i"
                        force-page-count="no-force">
         <fo:static-content flow-name="header">
         	<fo:block><xsl:text> </xsl:text></fo:block>
         </fo:static-content>
         <fo:static-content flow-name="footer">
            <fo:block text-align="center" xsl:use-attribute-sets="small-attrs">
                <fo:block>
          		 	<xsl:value-of select="$logo-name"/>
				</fo:block>
				<fo:block>
					<xsl:value-of select="$logo-address1"/>
				</fo:block>
				<fo:block>
					<xsl:value-of select="$logo-address2"/>
				</fo:block>
				<fo:block>
					<xsl:value-of select="$logo-citystatezip"/>
				</fo:block>
				<fo:block>
					<xsl:value-of select="$logo-website"/>
				</fo:block>
			</fo:block>
         </fo:static-content>
         <fo:flow flow-name="xsl-region-body">
			<!-- FOP 0.20.5 ignores content-width (it uses the page margins) but XEP needs content-width -->
			<!-- For FOP, we want both margins 1.75in, so specify a block margin of 0.55 which is added to page margin 1.2in -->
			<fo:block text-align="center" margin-left="0.55in" margin-right="0.55in">
				   <fo:external-graphic content-width="auto">
      					<xsl:attribute name="src">
      						<xsl:text>url('file:</xsl:text><xsl:value-of select="$logo-image"/><xsl:text>')</xsl:text>
      					</xsl:attribute>
				   </fo:external-graphic>
			</fo:block>
            <fo:block text-align="center" padding-top="100pt" xsl:use-attribute-sets="cover-attrs">
                <xsl:apply-templates/>
            </fo:block>
         </fo:flow>
      </fo:page-sequence>
   </xsl:template>

   <!-- *************************************************************** -->
   <!-- Chapters, Appendixes, and Glossaries                  -->
   <!-- *************************************************************** -->

   <xsl:template match="chapter | appendix | glossary">
      <fo:page-sequence master-reference="body"
                        format="1">

         <!-- if there is something in the book before me, continue page numbers; otherwise start at 1 -->

         <xsl:attribute name="initial-page-number">
            <xsl:choose>
               <xsl:when test="count(preceding-sibling::chapter | preceding-sibling::appendix | preceding-sibling::glossary) &gt; 0">auto</xsl:when>
               <xsl:otherwise>1</xsl:otherwise>
            </xsl:choose>
         </xsl:attribute>

         <fo:static-content flow-name="footer">
             <fo:block text-align="center" margin="0pt" xsl:use-attribute-sets="header-attrs">
             	<fo:retrieve-marker retrieve-class-name="topofpageheader"/>&nbsp;&nbsp;&bull;&nbsp;&nbsp;<fo:page-number/>
             </fo:block>
         </fo:static-content>
         <fo:static-content flow-name="header">
         	<fo:block><xsl:text> </xsl:text></fo:block>
         </fo:static-content>
         <fo:static-content flow-name="first-header">
         	<fo:block><xsl:text> </xsl:text></fo:block>
         </fo:static-content>

         <fo:flow flow-name="xsl-region-body"
                  font-size="10pt"
                  font-family="serif"
                  text-align="left">
                  <!--                   font-spacing="1.3" -->
            <xsl:variable name="linkid"
                          select="@id"/>
            <fo:block id="{$linkid}">

               <!-- Header is always the chapter (or appendix or glossary) title -->

               <fo:marker marker-class-name="topofpageheader">
                  <fo:wrapper xsl:use-attribute-sets="header-attrs">
                     <xsl:apply-templates select="title"
                                          mode="header"/>
                  </fo:wrapper>
               </fo:marker>

               <xsl:apply-templates select="title"/>
               <fo:block>
                  <xsl:apply-templates select="*[not(self::title | self::subtitle)]"/>
               </fo:block>
            </fo:block>
         </fo:flow>
      </fo:page-sequence>
   </xsl:template>

   <!-- *************************************************************** -->
   <!-- Second-level and other titles in Books                          -->
   <!-- *************************************************************** -->

   <xsl:template match="sect1">
      <xsl:variable name="linkid"
                    select="@id"/>
      <fo:block id="{$linkid}">
         <xsl:apply-templates select="title"/>
         <fo:block>
            <xsl:apply-templates select="*[not(self::title)]"/>
         </fo:block>
      </fo:block>
   </xsl:template>

   <xsl:template match="section | sect2 | sect3 | sect4">
      <xsl:variable name="linkid"
                    select="@id"/>
      <fo:block id="{$linkid}">
         <xsl:apply-templates select="title"/>
         <fo:block>
            <xsl:apply-templates select="*[not(self::title)]"/>
         </fo:block>
      </fo:block>
   </xsl:template>

   <!-- *************************************************************** -->
   <!-- All titles: styles for how they appear in running text          -->
   <!-- *************************************************************** -->

   <xsl:template match="chapter/title | appendix/title | glossary/title">
      <xsl:choose>
         <xsl:when test="ancestor::chapter">
            <fo:block font-size="72pt"
                      xsl:use-attribute-sets="title-attrs"
                      space-before.conditionality="retain"
                      space-before.optimum="42pt">
               <xsl:number format="1.1.1.1.1.1"
                           count="chapter | section | sect1 | sect2 | sect3 | sect4"
                           level="multiple"/>
            </fo:block>
            <fo:block font-size="30pt"
                      xsl:use-attribute-sets="title-attrs"
                      space-after.optimum="36pt">
               <xsl:apply-templates select="."
                                    mode="plain-text"/>
            </fo:block>
         </xsl:when>
         <xsl:when test="ancestor::appendix">
            <fo:block font-size="72pt"
                      xsl:use-attribute-sets="title-attrs"
                      space-before.conditionality="retain"
                      space-before.optimum="42pt">
               <xsl:number format="A.1.1.1.1.1"
                           count="appendix | section | sect1 | sect2 | sect3 | sect4"
                           level="multiple"/>
            </fo:block>
            <fo:block font-size="30pt"
                      xsl:use-attribute-sets="title-attrs"
                      space-after.optimum="36pt">
               <xsl:apply-templates select="."
                                    mode="plain-text"/>
            </fo:block>
         </xsl:when>
         <xsl:otherwise>
            <fo:block xsl:use-attribute-sets="subtitle-attrs">
               <xsl:apply-templates select="."
                                    mode="numbered-text"/>
            </fo:block>
         </xsl:otherwise>
      </xsl:choose>
   </xsl:template>

   <xsl:template match="sect1/title[count(ancestor::chapter | ancestor::appendix) = 1]">
      <fo:block font-size="20pt"
                xsl:use-attribute-sets="title-attrs"
                space-before.optimum="21pt"
                space-after.optimum="15pt">
         <xsl:apply-templates select="."
                              mode="numbered-text"/>
      </fo:block>
   </xsl:template>

   <xsl:template match="sect2/title[count(ancestor::chapter | ancestor::appendix) = 1]">
      <fo:block font-size="16pt"
                xsl:use-attribute-sets="title-attrs"
                padding-before="6pt"
                space-before.optimum="3pt"
                space-after.optimum="9pt">
         <xsl:apply-templates select="."
                              mode="numbered-text"/>
      </fo:block>
   </xsl:template>

   <xsl:template match="sect3/title[count(ancestor::chapter | ancestor::appendix) = 1] | section/title[count(ancestor::section | ancestor::chapter | ancestor::appendix) = 3]">
      <fo:block font-size="13pt"
                xsl:use-attribute-sets="title-attrs"
                space-before.optimum="12pt"
                space-after.optimum="6pt">
         <xsl:apply-templates select="."
                              mode="numbered-text"/>
      </fo:block>
   </xsl:template>

   <xsl:template match="sect4/title[count(ancestor::chapter | ancestor::appendix) = 1] | formalpara/title"
                 priority="-1">
      <fo:block font-size="11pt"
                xsl:use-attribute-sets="title-attrs"
                space-before.optimum="6pt"
                space-after.optimum="3pt">
         <xsl:apply-templates select="."
                              mode="plain-text"/>
      </fo:block>
   </xsl:template>

   <xsl:template match="figure/title | example/title | table/title"
                 priority="-1">
      <fo:block font-size="11pt"
                xsl:use-attribute-sets="title-attrs"
                space-before.optimum="6pt">
         <xsl:apply-templates select="."
                              mode="numbered-text"/>
      </fo:block>
   </xsl:template>

   <xsl:template match="chapter/title"
                 mode="numbered-text">
      <xsl:number format="1.1.1.1.1.1"
                  count="chapter | section | sect1 | sect2 | sect3 | sect4"
                  level="multiple"/>
      <xsl:text>
      </xsl:text>
      <xsl:apply-templates select="."
                           mode="plain-text"/>
   </xsl:template>

   <xsl:template match="appendix/title"
                 mode="numbered-text">
      <xsl:text>Appendix</xsl:text>
      <xsl:number format="A.1.1.1.1.1"
                  count="appendix | section | sect1 | sect2 | sect3 | sect4"
                  level="multiple"/>
      <xsl:text>: </xsl:text>
      <xsl:apply-templates select="."
                           mode="plain-text"/>
   </xsl:template>

   <xsl:template match="glossary/title"
                 mode="numbered-text">
      <xsl:apply-templates select="."
                           mode="plain-text"/>
   </xsl:template>

   <xsl:template match="sect1/title | sect2/title | sect3/title | sect4/title"
                 mode="numbered-text">
      <xsl:choose>
         <xsl:when test="ancestor::chapter">
            <xsl:number format="1.1.1.1.1.1"
                        count="chapter | section | sect1 | sect2 | sect3 | sect4"
                        level="multiple"/>
            <xsl:text>
            </xsl:text>
            <xsl:apply-templates select="."
                                 mode="plain-text"/>
         </xsl:when>
         <xsl:when test="ancestor::appendix">
            <xsl:number format="A.1.1.1.1.1"
                        count="appendix | section | sect1 | sect2 | sect3 | sect4"
                        level="multiple"/>
            <xsl:text>
            </xsl:text>
            <xsl:apply-templates select="."
                                 mode="plain-text"/>
         </xsl:when>
         <xsl:otherwise>
            <xsl:apply-templates select="."
                                 mode="plain-text"/>
         </xsl:otherwise>
      </xsl:choose>
   </xsl:template>

   <xsl:template match="formalpara/title | section/title"
                 mode="numbered-text">
      <xsl:apply-templates select="."
                           mode="plain-text"/>
   </xsl:template>

   <xsl:template match="table/title | figure/title | example/title"
                 mode="numbered-text">
      <fo:wrapper font-size="14pt">
         <xsl:text>
         </xsl:text>
         <xsl:apply-templates select="."
                              mode="plain-text"/>
      </fo:wrapper>
   </xsl:template>

   <xsl:template match="title"
                 mode="plain-text">
      <xsl:apply-templates/>
   </xsl:template>
   <xsl:template match="*"
                 mode="toc"
                 priority="-1"/>
   <xsl:template match="*"
                 mode="toc-sect2"
                 priority="-1"/>

   <xsl:template match="chapter | appendix | glossary"
                 mode="toc">
      <xsl:variable name="linkid"
                    select="@id"/>
      <fo:block space-before.optimum="6pt"
                text-align-last="justify"
                font-weight="bold">
         <fo:basic-link internal-destination="{$linkid}"
                        color="{$href-color}">
            <xsl:apply-templates select="title"
                                 mode="numbered-text"/>
         </fo:basic-link>
         <xsl:text>
         </xsl:text>
         <fo:inline keep-together.within-line="always">
            <fo:leader leader-pattern="dots"/>
            <xsl:text>
            </xsl:text>
            <fo:page-number-citation ref-id="{$linkid}"/>
         </fo:inline>
      </fo:block>
      <fo:block>
         <xsl:if test="sect1">
            <fo:block>
               <xsl:apply-templates mode="toc"/>
            </fo:block>
         </xsl:if>
      </fo:block>
   </xsl:template>

   <xsl:template match="sect1"
                 mode="toc">
      <xsl:variable name="linkid"
                    select="@id"/>
      <fo:block start-indent="0.25in"
                text-align-last="justify">
         <fo:basic-link internal-destination="{$linkid}"
                        color="{$href-color}">
            <xsl:apply-templates select="title"
                                 mode="numbered-text"/>
         </fo:basic-link>
         <xsl:text>
         </xsl:text>
         <fo:inline keep-together.within-line="always">
            <fo:leader leader-pattern="dots"/>
            <xsl:text>
            </xsl:text>
            <fo:page-number-citation ref-id="{$linkid}"/>
         </fo:inline>
      </fo:block>
      <fo:block>
         <xsl:if test="sect2">
            <xsl:choose>
               <xsl:when test="starts-with($bookid,'R_')">
               </xsl:when>
               <xsl:otherwise>
                  <fo:block>
                     <xsl:apply-templates mode="toc-sect2"/>
                  </fo:block>
               </xsl:otherwise>
            </xsl:choose>
         </xsl:if>
      </fo:block>
   </xsl:template>

   <xsl:template match="sect2"
                 mode="toc-sect2">
      <xsl:variable name="linkid"
                    select="@id"/>
      <fo:block start-indent="0.5in"
                text-align-last="justify">
         <fo:basic-link internal-destination="{$linkid}"
                        color="{$href-color}">
            <xsl:apply-templates select="title"
                                 mode="numbered-text"/>
         </fo:basic-link>
         <xsl:text>
         </xsl:text>
         <fo:inline keep-together.within-line="always">
            <fo:leader leader-pattern="dots"/>
            <xsl:text>
            </xsl:text>
            <fo:page-number-citation ref-id="{$linkid}"/>
         </fo:inline>
      </fo:block>
   </xsl:template>

   <!-- *************************************************************** -->
   <!-- Standard elements                                               -->
   <!-- *************************************************************** -->

   <!-- Paragraph -->

   <xsl:template match="para">
      <fo:block space-after.optimum="6pt">
         <xsl:apply-templates/>
      </fo:block>
   </xsl:template>

   <!-- Paragraph with title -->

   <xsl:template match="formalpara">

      <!-- The following code enables internal cross-refs to those formalpara that have ids. -->

      <xsl:variable name="linkid"
                    select="@id"/>
      <fo:block id="{$linkid}">
         <fo:block keep-with-next.within-page="always">
            <xsl:apply-templates select="title"/>
         </fo:block>
         <fo:block>
            <xsl:apply-templates select="para"/>
         </fo:block>
      </fo:block>
   </xsl:template>

   <!-- Emphasis -->

   <xsl:template match="emphasis">
      <fo:inline>
         <xsl:if test="contains(@role, 'italic') or not (@role)">
            <xsl:attribute name="font-style">italic</xsl:attribute>
         </xsl:if>
         <xsl:if test="contains(@role, 'bold')">
            <xsl:attribute name="font-style">italic</xsl:attribute>
         </xsl:if>
         <xsl:if test="contains(@role, 'underline')">
            <xsl:attribute name="font-style">italic</xsl:attribute>
         </xsl:if>
         <xsl:if test="contains(@role, 'frame')">
            <xsl:attribute name="border">0.25pt solid #808080</xsl:attribute>
            <xsl:attribute name="padding">0pt 1pt</xsl:attribute>
         </xsl:if>
         <xsl:if test="contains(@role, 'background')">
            <xsl:attribute name="background-color">silver</xsl:attribute>
            <xsl:attribute name="padding">0pt 1pt</xsl:attribute>
         </xsl:if>
         <xsl:text/>
         <xsl:apply-templates/>
         <xsl:text/>
      </fo:inline>
   </xsl:template>

   <xsl:template match="firstterm">
      <fo:inline font-weight="bold">
         <xsl:apply-templates/>
      </fo:inline>
   </xsl:template>

   <!-- Cited Title -->

   <xsl:template match="citetitle">
      <fo:inline font-style="italic">
         <xsl:apply-templates/>
      </fo:inline>
   </xsl:template>

   <!-- Items tagged as quotations -->

   <xsl:template match="quote">
      <fo:inline>
         &ldquo;<xsl:apply-templates/>&rdquo;
      </fo:inline>
   </xsl:template>

   <!-- O-O method names -->
   <!-- Commands typed from console -->
   <!-- Function names -->
   <!-- The names of constants -->

   <xsl:template match="method | methodname | command | function | constant">
      <fo:inline font-weight="bold">
         <xsl:apply-templates/>
      </fo:inline>
   </xsl:template>

   <!-- File names -->
   <!-- Code excerpts -->
   <!-- Variables -->

   <xsl:template match="literal | computeroutput">
      <fo:inline font-family="monospace"
                 font-size="9.5pt">
         <xsl:apply-templates/>
      </fo:inline>
   </xsl:template>

 <xsl:template match="systemitem">
      <fo:inline font-family="monospace"
                 font-weight="bold"
                 font-size="9.5pt">
         <xsl:apply-templates/>
      </fo:inline>
   </xsl:template>



   <!-- Subscripts -->

   <xsl:template match="subscript">
      <fo:inline vertical-align="sub"
                 font-size="8pt">
         <xsl:apply-templates/>
      </fo:inline>
   </xsl:template>

   <!-- Superscripts -->

   <xsl:template match="superscript">
      <fo:inline vertical-align="super"
                 font-size="8pt">
         <xsl:apply-templates/>
      </fo:inline>
   </xsl:template>

   <!-- User input to the command console   -->

   <xsl:template match="userinput">
      <fo:inline font-family="monospace"
                 font-weight="bold"
                 font-size="9.5pt">
         <xsl:apply-templates/>
      </fo:inline>
   </xsl:template>

   <!-- O-O Class names -->
   <!-- O-O property names -->

   <xsl:template match="classname | property | filename | type">
      <fo:inline font-family="sans-serif">
         <xsl:apply-templates/>
      </fo:inline>
   </xsl:template>

   <!-- Variables and parameters -->
   <!-- Error messages -->

   <xsl:template match="varname | parameter | errorname">
      <fo:inline font-style="italic">
         <xsl:apply-templates/>
      </fo:inline>
   </xsl:template>

   <!-- Higher-level GUI items  -->
   <!-- (no matches at present) -->
   <!-- Lower-level GUI items  -->

   <xsl:template match="guimenu | guisubmenu | guibutton | guilabel | guimenuitem | guiicon | keycap | keycode">
      <fo:wrapper font-family="sans-serif"
                  font-weight="bold">
         <xsl:apply-templates/>
      </fo:wrapper>
   </xsl:template>

   <xsl:template match="interface">
      <fo:wrapper font-family="sans-serif"
                  font-weight="bold">
         <xsl:apply-templates/>
      </fo:wrapper>
   </xsl:template>

   <!-- Synopsis -->

   <xsl:template match="synopsis">
      <fo:block text-align="start"
                keep-with-previous.within-page="always"
                keep-with-next.within-page="always"
                space-before="6pt"
                space-after="6pt"
                font-size="9.5pt"
            	font-family="monospace"
                white-space-collapse="false"
                white-space-treatment="preserve"
                linefeed-treatment="preserve"
                line-stacking-strategy="font-height"
                orphans="3"
                widows="3"
                start-indent="6pt"
                end-indent="6pt"
                padding="6pt"
                background-color="silver">
         <xsl:apply-templates/>
      </fo:block>
   </xsl:template>

   <!-- Figure -->

   <xsl:template match="figure">
      <xsl:variable name="linkid"
                    select="@label"/>
      <fo:block id="{$linkid}"
                xsl:use-attribute-sets="title-attrs"
                text-align="center">
         <xsl:apply-templates select="title"
                              mode="numbered-text"/>
      </fo:block>
      <xsl:apply-templates select="*[not(self::title)]"/>
   </xsl:template>

   <!-- Graphic -->

   <xsl:template match="graphic">
      <fo:block space-after.optimum="9pt"
                text-align="center">
         <xsl:apply-templates mode="graphic-attribute"/>
         <fo:external-graphic src="url('{@fileref}')">
            <xsl:if test="@width and @depth">
               <xsl:attribute name="scaling">non-uniform</xsl:attribute>
            </xsl:if>
            <xsl:apply-templates select="@scale"
                                 mode="graphic-attribute"/>
            <xsl:apply-templates select="@width"
                                 mode="graphic-attribute"/>
            <xsl:apply-templates select="@depth"
                                 mode="graphic-attribute"/>
            <xsl:apply-templates select="@format"
                                 mode="graphic-attribute"/>
         </fo:external-graphic>
      </fo:block>
   </xsl:template>

   <!-- Inline graphic  -->

   <xsl:template match="inlinegraphic">
      <fo:inline>
         <xsl:apply-templates mode="graphic-attribute"/>
         <fo:external-graphic src="url('{@fileref}')">
            <xsl:if test="@width and @depth">
               <xsl:attribute name="scaling">non-uniform</xsl:attribute>
            </xsl:if>
            <xsl:apply-templates select="@scale"
                                 mode="graphic-attribute"/>
            <xsl:apply-templates select="@width"
                                 mode="graphic-attribute"/>
            <xsl:apply-templates select="@depth"
                                 mode="graphic-attribute"/>
            <xsl:apply-templates select="@format"
                                 mode="graphic-attribute"/>
         </fo:external-graphic>
      </fo:inline>
   </xsl:template>

   <!-- Graphic attribute processing  -->

   <xsl:template match="@align"
                 mode="graphic-attribute">
      <xsl:attribute name="text-align">center</xsl:attribute>
   </xsl:template>

   <xsl:template match="@width"
                 mode="graphic-attribute">
      <xsl:attribute name="content-width">
         <xsl:value-of select="."/>
      </xsl:attribute>
   </xsl:template>

   <xsl:template match="@depth"
                 mode="graphic-attribute">
      <xsl:attribute name="content-height">
         <xsl:value-of select="."/>
      </xsl:attribute>
   </xsl:template>

   <xsl:template match="@scale"
                 mode="graphic-attribute">
      <xsl:attribute name="content-width">
         <xsl:value-of select="."/>
         100%
      </xsl:attribute>
      <xsl:attribute name="content-height">
         <xsl:value-of select="."/>
         100%
      </xsl:attribute>
   </xsl:template>

   <xsl:template match="@format"
                 mode="graphic-attribute">
      <xsl:attribute name="content-type">
         <xsl:choose>
            <xsl:when test=".='GIF'">content-type:image/gif</xsl:when>
            <xsl:when test=".='JPEG'">content-type:image/jpeg</xsl:when>
            <xsl:when test=".='PNG'">content-type:image/png</xsl:when>
            <xsl:when test=".='TIFF'">content-type:image/tiff</xsl:when>
            <xsl:when test=".='BMP'">content-type:image/bmp</xsl:when>
            <xsl:when test=".='SVG'">content-type:image/svg+xml</xsl:when>
            <xsl:when test=".='EPS'">content-type:application/postscript</xsl:when>
            <xsl:when test=".='PDF'">content-type:application/pdf</xsl:when>
            <xsl:otherwise>auto</xsl:otherwise>
         </xsl:choose>
      </xsl:attribute>
   </xsl:template>

   <!-- *************************************************************** -->
   <!-- Links                                                           -->
   <!-- *************************************************************** -->

   <!-- External hyperlinks -->

   <xsl:template match="ulink">
       <xsl:apply-templates/>
   </xsl:template>

   <!-- Internal links -->
   <!-- Create an xref to the {book|preface|chapter|appendix|glossary|sect1|sect2|sect3|sect4|table|figure|example}  -->
   <!-- whose @id attribute is the same as the value of this element's @linkend attribute  -->

   <xsl:template match="link">
      <xsl:variable name="linkend"
                    select="@linkend"/>
      <fo:basic-link color="{$href-color}"
                     internal-destination="{$linkend}">
         <xsl:apply-templates/>
      </fo:basic-link>
   </xsl:template>

   <!-- *************************************************************** -->
   <!-- Notes                                                           -->
   <!-- *************************************************************** -->

   <xsl:template match="warning">
      <fo:list-block provisional-label-separation="3pt"
                     provisional-distance-between-starts="76pt"
                     space-before.optimum="9pt"
                     space-after.optimum="6pt"
                     keep-together.within-page="always">
         <fo:list-item>
            <fo:list-item-label end-indent="label-end()">
               <fo:block font-weight="bold"
                         font-size="11.5pt"
                         color="#E10000"
                         text-align="start">
                  <xsl:text>WARNING: </xsl:text>
               </fo:block>
            </fo:list-item-label>
            <fo:list-item-body start-indent="body-start()">
               <fo:block>
                  <xsl:apply-templates/>
               </fo:block>
            </fo:list-item-body>
         </fo:list-item>
      </fo:list-block>
   </xsl:template>

   <xsl:template match="note">
      <fo:list-block provisional-label-separation="3pt"
                     provisional-distance-between-starts="38pt"
                     space-before.optimum="9pt"
                     space-after.optimum="6pt"
                     keep-together.within-page="always">
         <fo:list-item>
            <fo:list-item-label end-indent="label-end()">
               <fo:block font-weight="bold"
                         text-align="start">
                  <xsl:text>Note: </xsl:text>
               </fo:block>
            </fo:list-item-label>
            <fo:list-item-body start-indent="body-start()">
               <fo:block>
                  <xsl:apply-templates/>
               </fo:block>
            </fo:list-item-body>
         </fo:list-item>
      </fo:list-block>
   </xsl:template>

   <xsl:template match="tip">
      <fo:list-block provisional-label-separation="3pt"
                     provisional-distance-between-starts="32pt"
                     space-before.optimum="9pt"
                     space-after.optimum="6pt"
                     keep-together.within-page="always">
         <fo:list-item>
            <fo:list-item-label end-indent="label-end()">
               <fo:block font-weight="bold"
                         text-align="start">
                  <xsl:text>Tip: </xsl:text>
               </fo:block>
            </fo:list-item-label>
            <fo:list-item-body start-indent="body-start()">
               <fo:block>
                  <xsl:apply-templates/>
               </fo:block>
            </fo:list-item-body>
         </fo:list-item>
      </fo:list-block>
   </xsl:template>

   <xsl:template match="caution">
      <fo:list-block provisional-label-separation="3pt"
                     provisional-distance-between-starts="66pt"
                     space-before.optimum="9pt"
                     space-after.optimum="6pt"
                     keep-together.within-page="always">
         <fo:list-item>
            <fo:list-item-label end-indent="label-end()">
               <fo:block font-weight="bold"
                         font-size="10.5pt"
                         text-align="start">
                  <xsl:text>CAUTION! </xsl:text>
               </fo:block>
            </fo:list-item-label>
            <fo:list-item-body start-indent="body-start()">
               <fo:block>
                  <xsl:apply-templates/>
               </fo:block>
            </fo:list-item-body>
         </fo:list-item>
      </fo:list-block>
   </xsl:template>

   <xsl:template match="important">
      <fo:list-block provisional-label-separation="3pt"
                     provisional-distance-between-starts="66pt"
                     space-before.optimum="9pt"
                     space-after.optimum="6pt"
                     keep-together.within-page="always">
         <fo:list-item>
            <fo:list-item-label end-indent="label-end()">
               <fo:block font-weight="bold"
                         text-align="start">
                  <xsl:text>Important: </xsl:text>
               </fo:block>
            </fo:list-item-label>
            <fo:list-item-body start-indent="body-start()">
               <fo:block>
                  <xsl:apply-templates/>
               </fo:block>
            </fo:list-item-body>
         </fo:list-item>
      </fo:list-block>
   </xsl:template>

   <!-- =============================================================== -->
   <!-- Lists: ordered and unordered                                    -->
   <!-- =============================================================== -->
   <!-- List-block template: identical processing, different messages.  -->

   <xsl:template match="itemizedlist">

      <xsl:variable name="list-level"
                    select="count(ancestor-or-self::itemizedlist)"/>
      <xsl:variable name="other-level"
                    select="count(ancestor-or-self::orderedlist)"/>
      <xsl:variable name="total-level"
                    select="$list-level + $other-level"/>

      <fo:list-block provisional-label-separation="3pt"
                     provisional-distance-between-starts="18pt"
                     space-before.optimum="6pt"
                     space-after.optimum="6pt">
         <xsl:apply-templates>
            <xsl:with-param name="list-level"
                            select="$list-level"/>
         </xsl:apply-templates>
      </fo:list-block>
   </xsl:template>

   <xsl:template match="orderedlist">
      <xsl:variable name="list-level"
                    select="count(ancestor-or-self::orderedlist)"/>
      <xsl:variable name="other-level"
                    select="count(ancestor-or-self::itemizedlist)"/>
      <xsl:variable name="total-level"
                    select="$list-level + $other-level"/>

      <fo:list-block provisional-label-separation="3pt"
                     provisional-distance-between-starts="18pt"
                     space-before.optimum="6pt"
                     space-after.optimum="6pt">
         <xsl:apply-templates>
            <xsl:with-param name="list-level"
                            select="$list-level"/>
         </xsl:apply-templates>
      </fo:list-block>
   </xsl:template>

   <!-- =============================================================== -->
   <!-- Item for an unordered list                                      -->

   <xsl:template match="itemizedlist/listitem">
      <xsl:param name="list-level"/>
      <fo:list-item>
         <fo:list-item-label end-indent="label-end()">
            <fo:block text-align="start">
               <xsl:choose>
                  <xsl:when test="($list-level mod 2) = 1">
                     <xsl:text>&bull;</xsl:text>

                     <!-- disk bullet -->

                  </xsl:when>
                  <xsl:otherwise>
                     <xsl:text>-</xsl:text>

                     <!-- hyphen bullet -->

                  </xsl:otherwise>
               </xsl:choose>
            </fo:block>
         </fo:list-item-label>
         <fo:list-item-body start-indent="body-start()">
            <fo:block>
               <xsl:apply-templates/>
            </fo:block>
         </fo:list-item-body>
      </fo:list-item>
   </xsl:template>

   <!-- =============================================================== -->
   <!-- Ordered list item                                               -->

   <xsl:template match="orderedlist/listitem">
      <xsl:param name="list-level"/>
      <fo:list-item>
         <fo:list-item-label end-indent="label-end()">
            <fo:block text-align="start">
               <xsl:choose>
                  <xsl:when test="($list-level mod 2) = 1">

                     <!-- arabic -->

                     <xsl:number format="1."/>
                  </xsl:when>
                  <xsl:otherwise>

                     <!-- alphabetic -->

                     <xsl:number format="a."/>
                  </xsl:otherwise>
               </xsl:choose>
            </fo:block>
         </fo:list-item-label>
         <fo:list-item-body start-indent="body-start()">
            <fo:block>
               <xsl:apply-templates/>
            </fo:block>
         </fo:list-item-body>
      </fo:list-item>
   </xsl:template>


   <!-- *************************************************************** -->
   <!-- Tables                                                          -->
   <!-- *************************************************************** -->

   <xsl:template match="table">
      <xsl:variable name="linkid"
                    select="@id"/>
      <fo:block id="{$linkid}"
                xsl:use-attribute-sets="title-attrs"
                text-align="center">
         <xsl:attribute name="space-before.optimum"> 6pt </xsl:attribute>
         <xsl:apply-templates select="title"
                              mode="numbered-text"/>
      </fo:block>
      <xsl:apply-templates select="*[not(self::title)]"/>
   </xsl:template>

   <xsl:template match="informaltable">
      <xsl:apply-templates/>
   </xsl:template>

   <xsl:template match="table/title">
      <fo:block xsl:use-attribute-sets="title-attrs">
         <xsl:apply-templates select="."
                              mode="numbered-text"/>
      </fo:block>
   </xsl:template>

   <xsl:template match="tgroup">
      <fo:table border-bottom="0.25pt solid #A0A0A0"
                border-top="0.25pt solid #A0A0A0"
                border-left="0.25pt solid #A0A0A0"
                border-right="0.25pt solid #A0A0A0"
                table-layout="fixed"
                width="100%">
         <xsl:attribute name="space-after.optimum"> 15pt </xsl:attribute>
         <xsl:apply-templates select="@align"/>
         <xsl:apply-templates select="colspec"/>
         <xsl:apply-templates select="thead"/>
         <xsl:apply-templates select="tfoot"/>
         <xsl:apply-templates select="tbody"/>
      </fo:table>
   </xsl:template>

   <xsl:template match="colspec">
      <fo:table-column>
         <xsl:apply-templates select="@colwidth|@align"/>
      </fo:table-column>
   </xsl:template>

   <xsl:template match="thead">
      <fo:table-header background-color="#A0A0A0"
                       font-size="10pt"
                       font-weight="bold"
                       font-family="sans-serif"
                       keep-with-next.within-page="always"
                       text-align="start">
         <xsl:apply-templates select="@valign"/>
         <xsl:apply-templates/>
      </fo:table-header>
   </xsl:template>

   <xsl:template match="tfoot">
      <fo:table-footer background-color="#A0A0A0"
                       font-size="11pt"
                       font-weight="bold"
                       font-family="sans-serif"
                       keep-with-previous.within-page="always">
         <xsl:apply-templates select="@valign"/>
         <xsl:apply-templates/>
      </fo:table-footer>
   </xsl:template>

   <xsl:template match="tbody">
      <fo:table-body>
         <xsl:apply-templates select="@valign"/>
         <xsl:apply-templates/>
      </fo:table-body>
   </xsl:template>

   <xsl:template match="row">
      <fo:table-row font-size="10pt"
                    font-family="sans-serif">
         <xsl:apply-templates select="@valign"/>
         <xsl:apply-templates/>
      </fo:table-row>
   </xsl:template>

   <xsl:template match="entry"
                 priority="1">
      <fo:table-cell font-size="10pt"
                     font-family="sans-serif"
                     border-before-width.conditionality="retain"
                     border-after-width.conditionality="retain"
                     padding-top="3pt"
                     padding-bottom="3pt"
                     padding-left="6pt"
                     padding-right="6pt"
                     text-align="start">
         <xsl:apply-templates select="@align|@valign|@morerows"/>
         <xsl:choose>
            <xsl:when test="@namest">
               <xsl:variable name="start-column">
                  <xsl:call-template name="col-number-by-name">
                     <xsl:with-param name="colname"
                                     select="@namest"/>
                  </xsl:call-template>
               </xsl:variable>
               <xsl:attribute name="column-number">
                  <xsl:value-of select="$start-column"/>
               </xsl:attribute>
               <xsl:if test="@nameend">
                  <xsl:variable name="end-column">
                     <xsl:call-template name="col-number-by-name">
                        <xsl:with-param name="colname"
                                        select="@nameend"/>
                     </xsl:call-template>
                  </xsl:variable>
                  <xsl:attribute name="number-columns-spanned">
                     <xsl:value-of select="$end-column - $start-column + 1"/>
                  </xsl:attribute>
               </xsl:if>
            </xsl:when>
            <xsl:when test="@colname">
               <xsl:variable name="start-column">
                  <xsl:call-template name="col-number-by-name">
                     <xsl:with-param name="colname"
                                     select="@colname"/>
                  </xsl:call-template>
               </xsl:variable>
               <xsl:attribute name="column-number">
                  <xsl:value-of select="$start-column"/>
               </xsl:attribute>
            </xsl:when>
         </xsl:choose>
         <fo:block>
			<xsl:apply-templates/>
         </fo:block>
      </fo:table-cell>
   </xsl:template>

   <xsl:template match="informaltable[@frame='all']//entry | table[@frame='all']//entry"
                 priority="2">
      <fo:table-cell font-size="10pt"
                     font-family="sans-serif"
                     border-before-width.conditionality="retain"
                     border-after-width.conditionality="retain"
                     padding-top="3pt"
                     padding-bottom="3pt"
                     padding-left="6pt"
                     padding-right="6pt"
                     text-align="start"
                     border-bottom="0.25pt solid #A0A0A0"
                     border-top="0.25pt solid #A0A0A0"
                     border-left="0.25pt solid #A0A0A0"
                     border-right="0.25pt solid #A0A0A0">
         <xsl:apply-templates select="@align|@valign|@morerows"/>
         <xsl:choose>
            <xsl:when test="@namest">
               <xsl:variable name="start-column">
                  <xsl:call-template name="col-number-by-name">
                     <xsl:with-param name="colname"
                                     select="@namest"/>
                  </xsl:call-template>
               </xsl:variable>
               <xsl:attribute name="column-number">
                  <xsl:value-of select="$start-column"/>
               </xsl:attribute>
               <xsl:if test="@nameend">
                  <xsl:variable name="end-column">
                     <xsl:call-template name="col-number-by-name">
                        <xsl:with-param name="colname"
                                        select="@nameend"/>
                     </xsl:call-template>
                  </xsl:variable>
                  <xsl:attribute name="number-columns-spanned">
                     <xsl:value-of select="$end-column - $start-column + 1"/>
                  </xsl:attribute>
               </xsl:if>
            </xsl:when>
            <xsl:when test="@colname">
               <xsl:variable name="start-column">
                  <xsl:call-template name="col-number-by-name">
                     <xsl:with-param name="colname"
                                     select="@colname"/>
                  </xsl:call-template>
               </xsl:variable>
               <xsl:attribute name="column-number">
                  <xsl:value-of select="$start-column"/>
               </xsl:attribute>
            </xsl:when>
         </xsl:choose>
         <fo:block>
			<xsl:apply-templates/>
         </fo:block>
      </fo:table-cell>
   </xsl:template>

   <xsl:template name="col-number-by-name">
      <xsl:param name="colname"/>
      <xsl:call-template name="col-number-by-name-recursive">
         <xsl:with-param name="csp"
                         select="ancestor::tgroup[1]/colspec[@colname=$colname]"/>
      </xsl:call-template>
   </xsl:template>

   <xsl:template name="col-number-by-name-recursive">
      <xsl:param name="csp"/>
      <xsl:choose>
         <xsl:when test="not($csp)">0</xsl:when>
         <xsl:otherwise>
            <xsl:variable name="prevnum">
               <xsl:call-template name="col-number-by-name-recursive">
                  <xsl:with-param name="csp"
                                  select="$csp/preceding-sibling::colspec"/>
               </xsl:call-template>
            </xsl:variable>
            <xsl:value-of select="$prevnum + 1"/>
         </xsl:otherwise>
      </xsl:choose>
   </xsl:template>

   <xsl:template match="@colwidth">
      <xsl:attribute name="column-width">
         <xsl:value-of select="."/>
      </xsl:attribute>
   </xsl:template>

   <xsl:template match="@align">
      <xsl:attribute name="text-align">
         <xsl:value-of select="."/>
      </xsl:attribute>
   </xsl:template>

   <xsl:template match="@valign">
      <xsl:attribute name="display-align">
         <xsl:choose>
            <xsl:when test=".='top'">before</xsl:when>
            <xsl:when test=".='middle'">center</xsl:when>
            <xsl:when test=".='bottom'">after</xsl:when>
            <xsl:otherwise>inherit</xsl:otherwise>
         </xsl:choose>
      </xsl:attribute>
   </xsl:template>

   <xsl:template match="@morerows">
      <xsl:attribute name="number-rows-spanned">
         <xsl:value-of select=". + 1"/>
      </xsl:attribute>
   </xsl:template>

   <!-- *************************************************************** -->
   <!-- Code examples                                                   -->
   <!-- *************************************************************** -->

   <xsl:template match="programlisting">
      <xsl:variable name="LnCnt">
         <xsl:value-of select="string-length(child::text())-string-length(translate(child::text(),'&#xA;',''))"/>
      </xsl:variable>
      <fo:block text-align="start"
                space-before="9pt"
                space-after="12pt"
                font-size="8.3pt"
            	font-family="monospace"
                white-space-collapse="false"
                white-space-treatment="preserve"
                linefeed-treatment="preserve"
                line-stacking-strategy="font-height"
                orphans="3"
                widows="3">
         <xsl:attribute name="start-indent">
            <xsl:choose>
               <xsl:when test="count(ancestor::listitem) = 1">18pt</xsl:when>
               <xsl:when test="count(ancestor::listitem) = 2">36pt</xsl:when>
               <xsl:when test="count(ancestor::listitem) = 3">54pt</xsl:when>
               <xsl:when test="count(ancestor::question) = 1">6pt</xsl:when>
               <xsl:when test="count(ancestor::glossdef) = 1">36pt</xsl:when>
               <xsl:when test="count(ancestor::note) = 1">38pt</xsl:when>
               <xsl:otherwise>0.25pt</xsl:otherwise>
            </xsl:choose>
         </xsl:attribute>
         <xsl:attribute name="font-size">
            <xsl:choose>
               <xsl:when test="count(ancestor::listitem) = 1">8pt</xsl:when>
               <xsl:when test="count(ancestor::listitem) = 2">7.6pt</xsl:when>
               <xsl:when test="count(ancestor::listitem) = 3">7.2pt</xsl:when>
               <xsl:when test="count(ancestor::question) = 1">8pt</xsl:when>
               <xsl:when test="count(ancestor::glossdef) = 1">7.6pt</xsl:when>
               <xsl:when test="count(ancestor::note) = 1">7.6pt</xsl:when>
               <xsl:otherwise>8.3pt</xsl:otherwise>
            </xsl:choose>
         </xsl:attribute>
         <xsl:apply-templates/>
      </fo:block>
   </xsl:template>

   <xsl:template match="literallayout">
      <xsl:variable name="fontchoice"
                    select="@class"/>
      <xsl:variable name="LnCnt">
         <xsl:value-of select="string-length(child::text())-string-length(translate(child::text(),'&#xA;',''))"/>
      </xsl:variable>

      <fo:block text-align="start"
                space-before="9pt"
                space-after="12pt"
                white-space-collapse="false"
                white-space-treatment="preserve"
                linefeed-treatment="preserve"
                line-stacking-strategy="font-height"
                orphans="3"
                widows="3">
         <xsl:choose>
            <xsl:when test="$fontchoice='monospaced'">
               <xsl:attribute name="font-family"> monospace </xsl:attribute>
               <xsl:attribute name="font-size">
                  <xsl:choose>
                     <xsl:when test="count(ancestor::listitem) = 1">8pt</xsl:when>
                     <xsl:when test="count(ancestor::listitem) = 2">7.6pt</xsl:when>
                     <xsl:when test="count(ancestor::listitem) = 3">7.2pt</xsl:when>
                     <xsl:when test="count(ancestor::question) = 1">8pt</xsl:when>
                     <xsl:when test="count(ancestor::glossdef) = 1">7.6pt</xsl:when>
                     <xsl:when test="count(ancestor::note) = 1">7.6pt</xsl:when>
                     <xsl:otherwise>8.3pt</xsl:otherwise>
                  </xsl:choose>
               </xsl:attribute>
               <xsl:attribute name="start-indent">
                  <xsl:choose>
                     <xsl:when test="count(ancestor::listitem) = 1">18pt</xsl:when>
                     <xsl:when test="count(ancestor::listitem) = 2">36pt</xsl:when>
                     <xsl:when test="count(ancestor::listitem) = 3">54pt</xsl:when>
                     <xsl:when test="count(ancestor::question) = 1">6pt</xsl:when>
                     <xsl:when test="count(ancestor::glossdef) = 1">36pt</xsl:when>
                     <xsl:when test="count(ancestor::note) = 1">38pt</xsl:when>
                     <xsl:otherwise>0.25pt</xsl:otherwise>
                  </xsl:choose>
               </xsl:attribute>
            </xsl:when>
            <xsl:otherwise>
               <xsl:attribute name="font-family"> sans-serif </xsl:attribute>
               <xsl:attribute name="font-size">
                  <xsl:choose>
                     <xsl:when test="count(ancestor::listitem) = 1">7.6pt</xsl:when>
                     <xsl:when test="count(ancestor::listitem) = 2">7.2pt</xsl:when>
                     <xsl:when test="count(ancestor::listitem) = 3">6.8pt</xsl:when>
                     <xsl:when test="count(ancestor::question) = 1">7.6pt</xsl:when>
                     <xsl:when test="count(ancestor::glossdef) = 1">7.2pt</xsl:when>
                     <xsl:when test="count(ancestor::note) = 1">7.2pt</xsl:when>
                     <xsl:otherwise>8pt</xsl:otherwise>
                  </xsl:choose>
               </xsl:attribute>
            </xsl:otherwise>
         </xsl:choose>
         <xsl:apply-templates/>
      </fo:block>
   </xsl:template>

   <!-- *************************************************************** -->
   <!-- Book Body                                                       -->
   <!-- *************************************************************** -->

   <xsl:template name="book-body">
      <xsl:apply-templates select="chapter | appendix | glossary"/>
   </xsl:template>

   <!-- *************************************************************** -->
   <!-- Glossary term definitions                                       -->
   <!-- *************************************************************** -->

   <xsl:template match="glossentry">

      <!-- The following code enables internal cross-refs to those glossterms that have ids. -->

      <xsl:variable name="linkid"
                    select="@id"/>
      <fo:block id="{$linkid}">
         <fo:block space-before="12pt"
                   space-after="6pt"
                   font-weight="bold"
                   font-family="sans-serif"
                   font-size="10pt"
                   keep-with-next.within-page="always">
            <xsl:apply-templates select="glossterm"/>
         </fo:block>
         <fo:block widows="3"
                   orphans="3"
                   margin-left="36pt">
            <xsl:apply-templates select="glossdef"/>
         </fo:block>
      </fo:block>
   </xsl:template>

   <!-- *************************************************************** -->
   <!-- Book Table of Contents                                  -->
   <!-- *************************************************************** -->

   <xsl:template name="book-toc">
      <fo:page-sequence master-reference="TOC"
                        force-page-count="no-force"
                        format="i"
                        id="TOCchapters">

         <fo:static-content flow-name="header">
         	<fo:block><xsl:text> </xsl:text></fo:block>
         </fo:static-content>
         <fo:static-content flow-name="footer">
             <fo:block text-align="center" margin="0pt" xsl:use-attribute-sets="header-attrs">
             	<fo:page-number/>
             </fo:block>
         </fo:static-content>
         <fo:static-content flow-name="first-header">
         	<fo:block><xsl:text> </xsl:text></fo:block>
         </fo:static-content>

         <fo:flow flow-name="xsl-region-body" xsl:use-attribute-sets="regular-attrs">
            <xsl:variable name="linkid"
                          select="$bookid"/>
            <fo:block xsl:use-attribute-sets="subtitle-attrs"
                      id="{$linkid}">
               <xsl:text> </xsl:text>
                  <xsl:text>Table of Contents</xsl:text>
               <xsl:text> </xsl:text>
            </fo:block>
            <fo:block>
               <xsl:apply-templates mode="toc"/>
            </fo:block>
         </fo:flow>
      </fo:page-sequence>
   </xsl:template>
</xsl:stylesheet>
