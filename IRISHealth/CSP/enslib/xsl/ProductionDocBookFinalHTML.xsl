<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.1" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <!-- Create HTML version of the documentation -->
    <xsl:output method="html" indent="yes" />
    <xsl:strip-space elements="*" />

   <!-- Parameters -->
   <xsl:param name="allSettings">false</xsl:param>

   <xsl:param name="product">InterSystems IRIS</xsl:param>

   <xsl:param name="productLogo">portal/InterSystems IRIS.png</xsl:param>

   <xsl:param name="productionTitle">
      <xsl:value-of select="book/title"/>
   </xsl:param>
<!-- -->

<xsl:template match="/">
        <html>
            <head>
                <title>
                    <xsl:value-of select="$productionTitle"/>
                </title>
                <!-- Styles from "https://docs.intersystems.com/irislatest/csp/docbook/newstyles.css"  included since server might be offline-->
                <style type="text/css">
                    :root {
                        --iscbluelight: #bfe4e3;
                        --iscblue: #333695;
                        --iscgreenlight: #bfe4e3;
                        --iscgreen: #00a19c;
                        --iscyellow: #fffae5;
                        --iscyellowdark: #ffe680;
                        --iscred: #ca0000;
                        --iscredlightest: #f9f2f4;
                        --iscoffwhite: #fbfbfb;
                        --iscgraylightest: #f2f2f2;
                        --iscgraylighter: #e0e0e0;
                        --iscgraylight: #cbcbcb;
                        --iscgray: #919191;
                        --iscgraydark: #646464;
                        --iscgraydarker: #363636;
                        --iscgraydarkest: #2b2b2b;
                        --textcolor: var(--iscgraydarker);
                        --linkcolor: var(--iscgraydarker);
                        --iscmonofont: 'Courier 10 Pitch', 'Courier New', Courier, monospace;
                        --font-family-default: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                        --font-family-heading: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                        --font-weight-default: 400;
                        --font-size-default: 16px;
                    }
                    body {
                        color: var(--textcolor);
                        margin: 0;
                        padding: 0;
                        font-family: var(--font-family-default);
                        font-size: var(--font-size-default);
                        background-color: var(--iscoffwhite);
                    }                    
                    main {
                        margin-right: 80px;
                        margin-left: 80px;
                        max-width: 900px;
                        line-height: 1.5em;
                        display: block;
                    }
                    /* tables */
                    table {
                        background: white;
                        text-align: left;
                        border-collapse:collapse;
                        border-color: black;
                        border-width: 1px;
                        border-style: solid;
                    }
                    table th {
                        text-align: left;
                        border-bottom: black solid 1px;
                        background: #C0C0C0;
                        background-repeat: repeat-x;
                        padding:5px;
                    }                    
                    table th.Frame-all {
                        border-right: black solid 1px;
                        margin-bottom: 5px;
                        margin-top: 5px;
                        padding:5px;
                     }
                    table td {
                        /* background: #F5F5F5; */
                        margin-bottom: 5px;
                        margin-top: 5px;
                        padding:5px;
                     }                    
                    table td ul,table td ul {
                        margin-left: 0;
                    }
                    table td.Frame-all {
                        border-bottom: #808080 solid 1px;
                        border-right: #808080 solid 1px;
                        margin-bottom: 5px;
                        margin-top: 5px;
                        padding:5px;
                     }                
                    table td div {
                        margin-bottom: 4px;
                        margin-top: 4px;
                        line-height: 125%;
                        margin-left: 0;
                        margin-right: 0;
                        padding:5px;
                    }
                    /* links */
                    *|*:link, *|*:visited, a.Link {
                        color: var(--textcolor);
                        /* text-decoration: dotted underline; */
                    }
                    a.link:hover, a.TOCChapter:hover {
                        background-color: var(--iscyellow);
                    }
                    /* Logo */
                    .portalLogo {
                        position: relative;
                        top: 0px;
                        left: 10px;
                        padding: 2px;
                        padding-left: 5px;
                        padding-right: 5px;
                        width:210px;
                        height:50px;
                        font-weight: bold;
                        font-size: 12pt;
                    }
                </style>
                <header>
                    <img class="portalLogo">
                            <xsl:attribute name="src">
                                <xsl:value-of select="$productLogo"/>
                            </xsl:attribute>
                            <xsl:attribute name="alt">
                                <xsl:value-of select="$product"/>
                            </xsl:attribute>
                     </img>
                </header>
            </head>
            <body>
            <main>
                <h1>
                    <xsl:value-of select="$productionTitle"/>
                    <xsl:if test="$allSettings='true'">
                        <h3>
                        (Includes Default Values)
                        </h3>
                    </xsl:if>
                </h1>
                <xsl:apply-templates select="book/chapter" mode="toc"/>
                <xsl:apply-templates select="book/chapter" mode="report"/>
                <br/><br/>
            </main>
            </body>
        </html>
    </xsl:template>

    <xsl:template match="book/chapter" mode="toc">
        <a>
            <xsl:attribute name="href">
                <xsl:value-of select="concat('#',@id)"/>
            </xsl:attribute>
            <li><xsl:value-of select="title"/></li>
        </a>
        </xsl:template>

<xsl:template match="book/chapter" mode="report">
        <xsl:apply-templates select="title"/>
        <xsl:apply-templates select="para"/>
        <xsl:apply-templates select="note"/>
        <xsl:apply-templates select="orderedlist"/>
        <xsl:apply-templates select="sect1"/>
    </xsl:template>

    <xsl:template match="book/chapter/title">
    <br/>
    <h2>
        <xsl:attribute name="id">
            <xsl:value-of select="../@id"/>
        </xsl:attribute>
        <xsl:value-of select="."/>
    </h2>
    </xsl:template>

    <xsl:template match="book/chapter/para">
        <div class="para">
            <xsl:value-of select="."/>
        </div>
    </xsl:template>

    <xsl:template match="book/chapter/note/para">
        <div class="para">
            <xsl:value-of select="."/>
    </div>
    </xsl:template>

    <xsl:template match="book/chapter/sect1">
        <h3>
            <xsl:attribute name="id">
                <xsl:value-of select="@id"/>
            </xsl:attribute>
            <xsl:apply-templates select="title"/>
        </h3>
        <xsl:if test="contains(@id,'_Hosts')">
            <xsl:apply-templates select="sect1" mode="toc"/>
        </xsl:if>
        <div class="para">
            <xsl:apply-templates select="para"/>  
        </div>
        <div class="informaltable">
            <xsl:apply-templates select="informaltable"/>  
        </div>
        <div class="informaltable">
            <xsl:apply-templates select="table"/>  
        </div>

    </xsl:template>

    <!-- Lists: ordered and unordered                                    -->

   <xsl:template match="itemizedlist">

      <xsl:variable name="list-level"
                    select="count(ancestor-or-self::itemizedlist)"/>
      <xsl:variable name="other-level"
                    select="count(ancestor-or-self::orderedlist)"/>
      <xsl:variable name="total-level"
                    select="$list-level + $other-level"/>

      <ol type="i">
         <xsl:apply-templates>
            <xsl:with-param name="list-level"
                            select="$list-level"/>
         </xsl:apply-templates>
        </ol>
   </xsl:template>

   <xsl:template match="orderedlist">
      <xsl:variable name="list-level"
                    select="count(ancestor-or-self::orderedlist)"/>
      <xsl:variable name="other-level"
                    select="count(ancestor-or-self::itemizedlist)"/>
      <xsl:variable name="total-level"
                    select="$list-level + $other-level"/>

      <ol type="1">
         <xsl:apply-templates>
            <xsl:with-param name="list-level"
                            select="$list-level"/>
         </xsl:apply-templates>
      </ol>
   </xsl:template>

   <!-- Item for an unordered list                                      -->

   <xsl:template match="itemizedlist/listitem">
      <xsl:param name="list-level"/>
        <li>
            <DIV CLASS="para">
                <xsl:apply-templates/>
            </DIV>
    </li>
   </xsl:template>

   <!-- Ordered list item                                               -->

   <xsl:template match="orderedlist/listitem">
      <xsl:param name="list-level"/>
        <li>
          <xsl:apply-templates/>
        </li>
   </xsl:template>

    <!-- Tables                                                          -->

    <xsl:template match="table">
        <p/>
        <xsl:apply-templates select="*[not(self::title)]"/>
    </xsl:template>

   <xsl:template match="informaltable">
      <xsl:apply-templates/>
   </xsl:template>

   <xsl:template match="tgroup">
    <p/>
    <table>
       <xsl:apply-templates select="thead"/>
       <xsl:apply-templates select="tfoot"/>
       <xsl:apply-templates select="tbody"/>
    </table>
 </xsl:template>

 <xsl:template match="thead">
    <xsl:apply-templates/>
   </xsl:template>

   <xsl:template match="tfoot">
      <table>
         <xsl:apply-templates/>
      </table>
   </xsl:template>

   <xsl:template match="tbody">
       <xsl:apply-templates/>
 </xsl:template>

 <xsl:template match="row">
    <tr>
        <xsl:apply-templates/>
    </tr>
 </xsl:template>

<xsl:template match="entry">
    <xsl:variable name="rowParent" select="local-name(parent::*/parent::*)" />
    <xsl:choose>
       <xsl:when test="$rowParent='thead'">
        <th class="Frame-all">        
            <xsl:apply-templates/>
        </th>
    </xsl:when>
    <xsl:otherwise>
        <td class="Frame-all">
            <xsl:apply-templates/>
        </td>
    </xsl:otherwise>
</xsl:choose>
</xsl:template>

</xsl:stylesheet>