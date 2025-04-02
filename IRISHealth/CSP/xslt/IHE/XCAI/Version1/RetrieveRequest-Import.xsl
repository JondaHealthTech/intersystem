<?xml version="1.0" encoding="UTF-8"?>
<!--
iherad:RetrieveImagingDocumentSetRequest -> HS.Message.IHE.XCAI.RetrieveRequest  
-->
<xsl:stylesheet version="1.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:xdsb="urn:ihe:iti:xds-b:2007"
	xmlns:iherad="urn:ihe:rad:xdsi-b:2009"
	xmlns:isc="http://extension-functions.intersystems.com" 
	exclude-result-prefixes="isc">
	
<xsl:output method="xml" indent="no" omit-xml-declaration="yes"/>
<xsl:include href="../../XDSI/Version1/RetrieveRequest-Import.xsl"/>

<xsl:template match="iherad:RetrieveImagingDocumentSetRequest">
	<XCAI-RetrieveRequest>
		<xsl:apply-templates select="." mode="RetrieveRequest"/>
	</XCAI-RetrieveRequest>
</xsl:template>

</xsl:stylesheet>
