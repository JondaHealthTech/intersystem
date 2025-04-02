<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns="urn:schemas-microsoft-com:office:spreadsheet"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt"
  xmlns:user="urn:my-scripts" xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:x="urn:schemas-microsoft-com:office:excel"
  xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
  <xsl:output method="xml" encoding="utf-8"/>
  <xsl:variable name="count" select="count(/MyReport/*[not(@aggregate)])"/>
  <xsl:template match="/">
    <!--
    <xsl:processing-instruction name="mso-application">
      <xsl:text>progid="Excel.Sheet"</xsl:text>
    </xsl:processing-instruction>
-->    
    <xsl:comment>
      <xsl:value-of select="$count"/>
    </xsl:comment>
      <xsl:if test="$count">
        <xsl:apply-templates mode="NONEMPTY"/>
      </xsl:if>
      <xsl:if test="$count=0">
        <xsl:apply-templates mode="EMPTY"/>
      </xsl:if>

  </xsl:template>
  <xsl:template match="/MyReport" mode="NONEMPTY">
    <Worksheet>
      <xsl:attribute name="ss:Name">
          <xsl:choose>
              <xsl:when test='@excelSheetName != ""'>
                  <xsl:value-of select="@excelSheetName"/>
              </xsl:when>
              <xsl:otherwise>
                  <xsl:value-of select="'MySheetName'"/>
              </xsl:otherwise>
          </xsl:choose>
      </xsl:attribute>
      <Table x:FullColumns="1" x:FullRows="1">
        <xsl:for-each select="*[position() = 1]/*">
            <xsl:choose>
                <xsl:when test="@isExcelDate=1">
                    <Column ss:StyleID="DateTime"/>
                </xsl:when>
                <xsl:when test="@isExcelTime=1">
                    <Column ss:StyleID="Time"/>
                </xsl:when>
                <xsl:otherwise>
                    <Column ss:StyleID="Default"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:for-each>
        <xsl:variable name="suppressExcelHeaders" select="suppress_Excel_Headers"/>
        <xsl:if test='(not($suppressExcelHeaders="1") or (@suppressExcelHeaders="0")) and not(@suppressExcelHeaders="1")'>
        <Row>
          <xsl:for-each select="*[position() = 1]/*">
            <Cell>
              <Data ss:Type="String">
                <xsl:choose>
                  <xsl:when test="@excelName">
                    <xsl:value-of select="@excelName"/>
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:value-of select="local-name()"/>
                  </xsl:otherwise>
                </xsl:choose>
              </Data>
            </Cell>
          </xsl:for-each>
        </Row>
        </xsl:if>
        <xsl:apply-templates select="/MyReport/*[not(@aggregate)]" mode="NONEMPTY"/>
        <Row>
          <xsl:apply-templates select="/MyReport/*[@aggregate=1]" mode="NONEMPTY"/>
        </Row>
      </Table>
    </Worksheet>
  </xsl:template>
  <xsl:template match="/MyReport/*[not(@aggregate)]" mode="NONEMPTY">
    <Row>
      <xsl:apply-templates mode="NONEMPTY"/>
    </Row>
  </xsl:template>
  <xsl:template match="/MyReport/*[@aggregate=1]" mode="NONEMPTY">
    <xsl:choose>
      <xsl:when test="@placeholder=1">
        <Cell>
          <Data ss:Type="String">
            <xsl:value-of select="."/>
          </Data>
        </Cell>
      </xsl:when>
      <xsl:when test="not(@excelFormula)">
        <Cell>
          <Data ss:Type="Number">
            <xsl:value-of select="."/>
          </Data>
        </Cell>
      </xsl:when>
      <xsl:otherwise>
        <xsl:variable name="col" select="&quot;C&quot;"> </xsl:variable>
        <Cell>
          <xsl:attribute name="ss:Formula">
            <xsl:value-of
              select="concat(&quot;=&quot;,@excelFormula,&quot;(&quot;,&quot;R[&quot;,-$count,&quot;]&quot;,$col,&quot;:R[-1]&quot;,$col,&quot;)&quot;)"
            />
          </xsl:attribute>
        </Cell>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  <xsl:template match="/MyReport/*/*" mode="NONEMPTY">
    <xsl:choose>
    <xsl:when test="@isExcelNumber=1">
      <Cell>
        <Data ss:Type="Number">
          <xsl:value-of select="."/>
        </Data>
      </Cell>
    </xsl:when>
    <xsl:when test="@isExcelTime=1">
      <Cell ss:StyleId="Time">
        <Data ss:Type="Number">
          <xsl:value-of select="."/>
        </Data>
      </Cell>
    </xsl:when>
    <xsl:when test="@isExcelDate=1">
      <Cell>
        <Data ss:Type="DateTime">
          <xsl:value-of select="."/>
        </Data>
      </Cell>
    </xsl:when>
    <xsl:otherwise>
      <Cell>
        <Data ss:Type="String">
          <xsl:value-of select="."/>
        </Data>
      </Cell>
    </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  <xsl:template match="/MyReport" mode="EMPTY">
    <Worksheet>
      <xsl:attribute name="ss:Name">
          <xsl:choose>
              <xsl:when test='@excelSheetName != ""'>
                  <xsl:value-of select="@excelSheetName"/>
              </xsl:when>
              <xsl:otherwise>
                  <xsl:value-of select="local-name(/MyReport)"/>
              </xsl:otherwise>
          </xsl:choose>
      </xsl:attribute>
      <Table x:FullColumns="1" x:FullRows="1">
        <xsl:variable name="suppressExcelHeaders" select="suppress_Excel_Headers"/>
        <xsl:if test='(not($suppressExcelHeaders="1") or (@suppressExcelHeaders="0")) and not(@suppressExcelHeaders="1")'>
        <Row>
          <xsl:for-each select="*">
            <Cell>
              <Data ss:Type="String">
                <xsl:choose>
                  <xsl:when test="@excelName">
                    <xsl:value-of select="@excelName"/>
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:value-of select="local-name()"/>
                  </xsl:otherwise>
                </xsl:choose>
              </Data>
            </Cell>
          </xsl:for-each>
        </Row>
        </xsl:if>
        <Row>
          <xsl:apply-templates select="/MyReport/*[@aggregate=1]" mode="EMPTY"/>
        </Row>
      </Table>
    </Worksheet>
  </xsl:template>
  <xsl:template match="/MyReport/*[@aggregate=1]" mode="EMPTY">
    <xsl:choose>
      <xsl:when test="@placeholder=1">
        <Cell>
          <Data ss:Type="String">
            <xsl:value-of select="."/>
          </Data>
        </Cell>
      </xsl:when>
      <xsl:when test="not(@excelFormula)">
        <Cell>
          <Data ss:Type="Number">
            <xsl:value-of select="."/>
          </Data>
        </Cell>
      </xsl:when>
      <xsl:otherwise>
        <xsl:variable name="col" select="&quot;C&quot;"> </xsl:variable>
        <Cell>
          <xsl:attribute name="ss:Formula">
            <xsl:value-of
              select="concat(&quot;=&quot;,@excelFormula,&quot;(&quot;,&quot;R[&quot;,-1,&quot;]&quot;,$col,&quot;:R[-1]&quot;,$col,&quot;)&quot;)"
            />
          </xsl:attribute>
        </Cell>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  <xsl:template match="/MyReport/*/*" mode="EMPTY">
    <xsl:if
      test="(@isExcelNumber != 1)and(@isExcelDate != 1)and(@isExcelTime != 1)">
      <Cell>
        <Data ss:Type="String">
          <xsl:value-of select="."/>
        </Data>
      </Cell>
    </xsl:if>
    <xsl:if test="@isExcelNumber=1">
      <Cell>
        <Data ss:Type="Number">
          <xsl:value-of select="."/>
        </Data>
      </Cell>
    </xsl:if>
    <xsl:if test="@isExcelDate=1">
      <Cell>
        <Data ss:Type="DateTime">
          <xsl:value-of select="."/>
        </Data>
      </Cell>
    </xsl:if>
    <xsl:if test="@isExcelTime=1">
      <Cell ss:StyleId="Time">
          <Data ss:Type="Number">
              <xsl:value-of select="."/>
          </Data>
      </Cell>
    </xsl:if>
  </xsl:template>
</xsl:stylesheet>
