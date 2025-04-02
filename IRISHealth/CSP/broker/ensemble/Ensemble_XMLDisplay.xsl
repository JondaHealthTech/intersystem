<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml" version="1.0">
	<!--	Ensemble_XMLDisplay.xsl -->
	<!--	Ensemble XML Display stylesheet for display of XML across browsers. -->
	<!--	Copyright (c) 2011-2017 InterSystems Corp. ALL RIGHTS RESERVED. -->
	<xsl:output encoding="utf-8" method="xml" indent="no" doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN" doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"/>
	<xsl:variable name="baseXMLNamespace" select="'http://www.w3.org/XML/1998/namespace'" />
	
	<xsl:template match="/">
		<!-- $topNamespaces should be empty, but will be passed down to first node -->
		<xsl:variable name="topNamespaces" select="namespace::*"  />
		
		<html>
			<head>
				<script type="text/javascript" src="ensemble/Ensemble_XMLDisplay.js"></script>
				<script type="text/javascript" src="ensemble/Ensemble_Utils.js"></script>
				<meta http-equiv="content-type" content="application/xhtml+xml;charset=UTF-8" />
				<script type="text/javascript">
					function onload() {
						try {
							handleZenAutoLogout();
						}
						catch (ex) {}
						try {
							getMessages();
						}
						catch (ex) {}
					}
				</script>
				<style type="text/css">
body, html {
	margin: 0;
	padding: 0;
	font-family: monospace;
	font-size: 14px;
	line-height: 1.5em;
}

#xmldec {
	margin-top: 0.5em;
	font-weight: bold;
	color: orange;
}

#document {
	line-height: 1.2em;
	padding-left: .4em;
}

#noNS {
	display: block;
	font-weight: bold;
	font-family: Arial, sans-serif;
	padding: 5px;
}

.element {
	margin: 1px 0 5px;
	padding-left: 3px;
	border-left: 1px dashed grey;
	/*border-top: 1px dotted grey;
	border-bottom: 1px dotted grey;*/
}

.element .element, .element .comment {
	margin-left: 32px
}

.content {
	display: inline;
}

div.inline,
div.inline * {
	display: inline;
	margin: 0;
	border-left: none;
}

.name, .prefix {
	color: blue;
	font-weight: bold;
}

.attribValue, .nsURI {
	color: red;
}

.attribName, .nsName {
	font-weight: bold;
}

.nsDefault, .nsPrefix {
	color: blue;
}

.comment {
	color: green;
	font-style: italic;
	white-space: pre;
}

.text {
	white-space: pre-wrap;
	color: black;
	font-weight: bold;
}

.cdata {
	color: red;
	font-weight: normal;
}

.cdataContents {
	color: #696969;
}

.processing {
	color: orange;
	font-weight: bold;
}

.tag {
	color: black;
}

.expander {
	cursor: pointer;
}
				</style>
			</head>

			<body onload="onload();">
				<button id="expandAllButton" onclick="expandAll();"></button>
				<xsl:call-template name="namespaceCheck" />
				<div id="document">
					<div id="xmldec">&lt;?xml version="1.0" ?&gt;</div>
					<xsl:apply-templates select="processing-instruction()" />
					<xsl:apply-templates select="node()[not(self::processing-instruction())]">
						<xsl:with-param name="namespaceTree" select="$topNamespaces" />
					</xsl:apply-templates>
				</div>
			</body>
		</html>
	</xsl:template>

	<xsl:template match="*">
		<!--	$namespaceTree is intended to capture the namespaces present in the parent 
				of the current node to allow new xmlns declarations to be added to the output
				NOTE: Namespaces aren't available on Firefox pending bug 94270 - https://bugzilla.mozilla.org/show_bug.cgi?id=94270 
		-->
		<xsl:param name="namespaceTree" />
		
		<div class="element">
			<xsl:if test="(preceding-sibling::text()[normalize-space(.)] or following-sibling::text()[normalize-space(.)]) and not(*)">
				<xsl:attribute name="class">
					<xsl:text> inline</xsl:text>
				</xsl:attribute>
			</xsl:if>
			
			<xsl:variable name="elementID" select="generate-id()" />
			<xsl:variable name="currNamespaces" select="namespace::*" />
			
			<xsl:attribute name="id">
				<xsl:value-of select="concat('element-',$elementID)" />
			</xsl:attribute>
			
			<!-- Determine contents of tag name -->
			<xsl:variable name="tag">
				<xsl:if test="name(.) != local-name(.)">
					<span class="prefix">
						<xsl:value-of select="substring-before(name(.), ':')"/>
					</span>
					<xsl:text>:</xsl:text>
				</xsl:if>
				<span class="name">
					<xsl:value-of select="local-name(.)"/>
				</span>
			</xsl:variable>
			
			<!--	Compare current namespaces against inherited namespaces to determine
					which namespaces should be displayed for the current node. -->
			<xsl:variable name="namespaceAttribs">
				<xsl:choose>
					<xsl:when test="$namespaceTree">
						<xsl:for-each select="$currNamespaces" >
							<xsl:variable name="currNS" select="." />
							<xsl:if test="not($namespaceTree[name() = name(.)] = .)" >
								<xsl:call-template name="addNamespace">
									<xsl:with-param name="prefix" select="name()" />
									<xsl:with-param name="uri" select="." />
								</xsl:call-template>
							</xsl:if>
						</xsl:for-each>
					</xsl:when>
					<xsl:otherwise>
						<!-- $namespaceTree needs to be initialised -->
						<xsl:for-each select="$currNamespaces">
							<xsl:call-template name="addNamespace">
								<xsl:with-param name="prefix" select="name()" />
								<xsl:with-param name="uri" select="." />
							</xsl:call-template>
						</xsl:for-each>
					</xsl:otherwise>
				</xsl:choose>	
			</xsl:variable>
			
			<span class="tag">
				<!-- Add toggle logic if there is data in the node -->
				<xsl:if test="node()">
					<xsl:attribute name="class">
						<xsl:text>tag expander</xsl:text>
					</xsl:attribute>
					<xsl:attribute name="onclick">
						<xsl:text>toggleElement('</xsl:text>
						<xsl:value-of select="$elementID" />
						<xsl:text>');</xsl:text>
					</xsl:attribute>
				</xsl:if>
				<xsl:text>&lt;</xsl:text>

				<xsl:copy-of select="$tag"/>
				<xsl:copy-of select="$namespaceAttribs"/>

				<xsl:apply-templates select="@*"/>
				<xsl:text>&gt;</xsl:text>
			</span>

			<xsl:if test="node()">
				<div class="content">
					<xsl:attribute name="id">
						<xsl:value-of select="concat('content-',$elementID)" />
					</xsl:attribute>
					<xsl:apply-templates>
						<xsl:with-param name="namespaceTree" select="namespace::*" />
					</xsl:apply-templates>
				</div>
			</xsl:if>

			<span class="tag">
				<xsl:text>&lt;/</xsl:text>
				<xsl:copy-of select="$tag"/>
				<xsl:text>&gt;</xsl:text>
			</span>			
		</div>
	</xsl:template>

	<xsl:template match="@*">
		<xsl:text> </xsl:text>
		<span class="attribName">
			<xsl:value-of select="name(.)"/>
		</span>
		<xsl:text>=</xsl:text>
		<span class="attribValue">
			<xsl:value-of select="concat('&quot;', ., '&quot;')"/>
		</span>
	</xsl:template>

	<xsl:template match="text()">
		<xsl:if test="normalize-space(.)">
			<xsl:choose>
				<!-- ensure that CDATA wrappers are correctly added to output which needs escaping -->
				<xsl:when test="contains(.,'&lt;') or contains(.,'&amp;') or contains(.,']]&gt;') or contains(.,'&gt;')">
					<span class="cdata">
						<xsl:text>&lt;![CDATA[</xsl:text>
						<span class="text cdataContents">
							<xsl:call-template name="escapeCData">
								<xsl:with-param name="textData" select="." />
							</xsl:call-template>
						</span>
						<xsl:text>]]&gt;</xsl:text>
					</span>
				</xsl:when>
				<xsl:otherwise>
					<span class="text">
						<xsl:value-of select="."/>
					</span>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:if>
	</xsl:template>

	<xsl:template match="comment()">
		<div class="comment">
			<xsl:text>&lt;!--</xsl:text>
			<xsl:value-of select="."/>
			<xsl:text>--&gt;</xsl:text>
		</div>
	</xsl:template>
	
	<!-- Add processing instructions *except* for xml-stylesheet -->
	<xsl:template match="processing-instruction()">
		<xsl:if test="name(.) != 'xml-stylesheet'">
			<div class="processing">
				<xsl:text>&lt;?</xsl:text>
				<xsl:value-of select="name()"/>
				<xsl:text> </xsl:text>
				<xsl:value-of select="."/>
				<xsl:text>?&gt;</xsl:text>
			</div>
		</xsl:if>
	</xsl:template>

	<!-- Named template for adding a namespace attribute to an element -->	
	<xsl:template name="addNamespace">
		<xsl:param name="prefix" />
		<xsl:param name="uri" />
		
		<xsl:if test="not(($prefix = 'xml') and ($uri = $baseXMLNamespace))">
			<xsl:text> </xsl:text>
			<span class="nsName">
				<xsl:choose>
					<xsl:when test="$prefix = ''">
						<span class="nsDefault">xmlns</span>
					</xsl:when>
					<xsl:otherwise>
						<span class="nsDec">xmlns</span>
						<xsl:text>:</xsl:text>
						<span class="nsPrefix">
							<xsl:value-of select="$prefix" />
						</span>
					</xsl:otherwise>
				</xsl:choose>
			</span>
			<xsl:text>=</xsl:text>
			<span class="nsURI">
				<xsl:value-of select="concat('&quot;', $uri, '&quot;')"/>
			</span>
		</xsl:if>
	</xsl:template>
	
	<!-- Ensure that CData is correctly escaped -->
	<xsl:template name="escapeCData">
		<xsl:param name="textData" />
		
		<xsl:choose>
			<xsl:when test="contains($textData, ']]&gt;')">
				<xsl:value-of select="concat(substring-before($textData, ']]&gt;'),']]')" />
				<span class="cdata">
					<xsl:text>]]&gt;&lt;![CDATA[</xsl:text>
				</span>
				<span class="text cdataContents">
					<xsl:text>&gt;</xsl:text>
					<xsl:call-template name="escapeCData">
						<xsl:with-param name="textData" select="substring-after($textData,']]&gt;')" />
					</xsl:call-template>
				</span>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="$textData" />
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	
	<xsl:template name="namespaceCheck">
		<xsl:if test="not(/*[namespace::*])">
			<div id="noNS"></div>
		</xsl:if>
	</xsl:template>

</xsl:stylesheet>