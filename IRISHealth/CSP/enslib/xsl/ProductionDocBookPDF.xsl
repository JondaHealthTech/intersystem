<?xml version="1.0" encoding="iso-8859-1"?>
<xsl:stylesheet version="1.1" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<!--
	The following xsl:output statement works for PDF and does not work for HTML.
	The choices of indent, name, and doctype-* attribute values were carefully researched.
	This is the only combination of values that worked.
-->

<xsl:output method="xml"
            version="1.0"
            encoding="UTF-8"
            omit-xml-declaration="no"
            indent="no"
            name="book"
            />

<xsl:include href="ProductionDocBookCommon.xsl"/>

</xsl:stylesheet>