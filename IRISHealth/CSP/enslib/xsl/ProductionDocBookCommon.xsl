<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Currently, our internal XSLT processing does not support XSLT 2.0
  <xsl:stylesheet version='2.0' 
  xmlns:xsl='http://www.w3.org/1999/XSL/Transform'
  xmlns:fo='http://www.w3.org/1999/XSL/Format'
  xmlns:xlink='http://www.w3.org/1999/xlink'>
-->
<xsl:stylesheet version="1.1" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" >

<xsl:param name="intro">true</xsl:param>
<xsl:param name="rules"/>
<xsl:param name="xforms"/>
<xsl:param name="schema"/>
<xsl:param name="name"/>

<xsl:variable name="RULEDOC" select="document($rules)"/>
<xsl:variable name="XFORMDOC" select="document($xforms)"/>
<xsl:variable name="SCHEMADOC" select="document($schema)"/>
<xsl:variable name="PRODNAME" select="/Export/Production/@Name"/>

<xsl:strip-space elements="*"/>

<!-- .......................................... THE BOOK .......................................... -->
<!--
|
|
| Set up the book
|
|
-->
<xsl:template match="/">
	<xsl:element name="book">
		<xsl:call-template name="production_titles"/>
		<xsl:if test="$intro='true'">
			<xsl:call-template name="production_preface"/>
		</xsl:if>
		<xsl:apply-templates select="Export/Production" mode="production_summary" />
		<xsl:apply-templates select="Export/Production" mode="configuration_items" />
		<xsl:apply-templates select="$RULEDOC/Export" mode="rule_sets" />
		<xsl:apply-templates select="$XFORMDOC/Export" mode="data_transformations" />
		<xsl:apply-templates select="$SCHEMADOC/Export" mode="custom_schemas" />
	</xsl:element>
</xsl:template>


<!-- .......................................... TITLE PAGE ........................................ -->
<!--
|
|
| Title and subtitle
|
|
-->
<xsl:template name="production_titles">

	<xsl:attribute name="id">
		<xsl:value-of select="$name" />
	</xsl:attribute>

	<xsl:attribute name="arch">intersystems</xsl:attribute>
	
	<xsl:attribute name="remap"><xsl:text>999_999_</xsl:text><xsl:value-of select="$name" /></xsl:attribute>

	<xsl:element name="title">
		<xsl:call-template name="break_up_string_with" >
			<xsl:with-param name="MYSTRING" select="$PRODNAME" />
			<xsl:with-param name="SEPARATOR" select="'.'" />
		</xsl:call-template>
		<xsl:text> Configuration</xsl:text>
	</xsl:element>

	<xsl:element name="subtitle">
		<xsl:text>Describes the configuration details of a specific production.</xsl:text>
	</xsl:element>

</xsl:template>


<!-- .......................................... OVERVIEW .......................................... -->
<!--
|
|
| Standard preface introduces InterSystems IRIS terminology "from 10,000 feet" for CEOs and the like.
| If the input parameter intro has the literal value "true" then output this preface; otherwise not
|
|
-->
<xsl:template name="production_preface">

	<xsl:element name="chapter">

		<xsl:attribute name="id">
			<xsl:value-of select="$name" /><xsl:text>_Terminology</xsl:text>
		</xsl:attribute>

		<xsl:element name="title">
			<xsl:text>Terminology</xsl:text>
		</xsl:element>

		<xsl:element name="para">
			<xsl:text>The following is a summary of the InterSystems IRIS terms used in this book. </xsl:text>
		</xsl:element>

		<xsl:element name="para">
			<xsl:element name="firstterm">
				<xsl:text>InterSystems IRIS</xsl:text>
			</xsl:element>
			<xsl:text> is a comprehensive platform for rapidly developing, deploying, and monitoring enterprise application integration </xsl:text>
			<xsl:text>solutions. InterSystems IRIS makes it possible for enterprises to rapidly leverage enterprise applications, legacy data, and disparate information technologies in a  variety of new ways.</xsl:text>
		</xsl:element>

		<xsl:element name="para">
			<xsl:text>A </xsl:text>
			<xsl:element name="firstterm">
				<xsl:text>production</xsl:text>
			</xsl:element>
			<xsl:text>  is a specialized package of software that solves a specific integration problem for an enterprise. </xsl:text>
			<xsl:text>The InterSystems IRIS architecture supports rapid development by restricting the members of a production to specific roles. </xsl:text>
			<xsl:text>There is room for expansion and variation within each role; this is why the configuration settings are so important. </xsl:text>
		</xsl:element>

		<xsl:element name="para">
			<xsl:text>An InterSystems IRIS production typically processes incoming events in the following order. </xsl:text>
			<xsl:text>This list of steps introduces the primary roles within a production.  </xsl:text>
			<xsl:text>You will find instances of each of these roles within this book.  </xsl:text>
			<xsl:text>The set of items featured in this list comprise an </xsl:text>
			<xsl:element name="firstterm">
				<xsl:text>interface</xsl:text>
			</xsl:element>
			<xsl:text>. There may be many such interfaces within a production. </xsl:text>
		</xsl:element>

		<xsl:element name="orderedlist">

			<xsl:element name="listitem">
				<xsl:element name="para">
					<xsl:text>An </xsl:text>
					<xsl:element name="firstterm">
						<xsl:text>inbound adapter</xsl:text>
					</xsl:element>
					<xsl:text> receives an incoming event, transforms it into an message object, and passes it to its associated business service. </xsl:text>
				</xsl:element>
			</xsl:element>

			<xsl:element name="listitem">
				<xsl:element name="para">
					<xsl:text>The  </xsl:text>
					<xsl:element name="firstterm">
						<xsl:text>business service</xsl:text>
					</xsl:element>
					<xsl:text> formulates a follow-on request message, and passes this new message to a business process or business operation within InterSystems IRIS. </xsl:text>
				</xsl:element>
			</xsl:element>

			<xsl:element name="listitem">

				<xsl:element name="para">
					<xsl:text>A </xsl:text>
					<xsl:element name="firstterm">
						<xsl:text>business process</xsl:text>
					</xsl:element>
					<xsl:text> that receives a request message executes a predefined set of activities, in sequence or in parallel. </xsl:text>
					<xsl:text>These activities may include sending follow-on requests to other business processes, to business rules, to data transformations, or to business operations. For example: </xsl:text>
				</xsl:element>

				<xsl:element name="itemizedlist">
					<xsl:element name="listitem">
						<xsl:element name="para">
							<xsl:element name="firstterm">
								<xsl:text>Business rules</xsl:text>
							</xsl:element>
							<xsl:text> change the behavior of business processes at decision points.</xsl:text>
						</xsl:element>
					</xsl:element>
					<xsl:element name="listitem">
						<xsl:element name="para">
							<xsl:element name="firstterm">
								<xsl:text>Routing rules</xsl:text>
							</xsl:element>
							<xsl:text> direct messages to their destinations based on message contents.</xsl:text>
						</xsl:element>
					</xsl:element>
					<xsl:element name="listitem">
						<xsl:element name="para">
							<xsl:element name="firstterm">
								<xsl:text>Schema categories</xsl:text>
							</xsl:element>
							<xsl:text> provide a means to validate and access message contents.</xsl:text>
						</xsl:element>
					</xsl:element>
					<xsl:element name="listitem">
						<xsl:element name="para">
							<xsl:element name="firstterm">
								<xsl:text>Data transformations</xsl:text>
							</xsl:element>
							<xsl:text> calculate and apply changes to message contents.</xsl:text>
						</xsl:element>
					</xsl:element>
				</xsl:element>

			</xsl:element> <!-- end of this listitem -->

			<xsl:element name="listitem">
				<xsl:element name="para">
					<xsl:text>A </xsl:text>
					<xsl:element name="firstterm">
						<xsl:text>business operation</xsl:text>
					</xsl:element>
					<xsl:text> that receives a request message maps it to a specific operation within an external application. </xsl:text>
					<xsl:text>It transforms properties of the request message object into a format usable by the external application API, and transmits this API call via an outbound adapter. </xsl:text>
				</xsl:element>
				<xsl:element name="para">
					<xsl:text>Business services, business processes, and business operations are called </xsl:text>
					<xsl:element name="firstterm">
						<xsl:text>business hosts</xsl:text>
					</xsl:element>
					<xsl:text>.</xsl:text>
				</xsl:element>
			</xsl:element>

			<xsl:element name="listitem">
				<xsl:element name="para">
					<xsl:text>An </xsl:text>
					<xsl:element name="firstterm">
						<xsl:text>outbound adapter</xsl:text>
					</xsl:element>
					<xsl:text> manages the details of communicating with a specific external system or application from within InterSystems IRIS. It transmits the API call to the external entity. </xsl:text>
				</xsl:element>
			</xsl:element>

		<!-- end orderedlist -->
		</xsl:element>

		<xsl:element name="para">
			<xsl:text>The response from the external system or application can trigger a cascade of response messages back to the external entity that instigated the flow of events. </xsl:text>
			<xsl:text>Details depend on the design choices made by the production developers. </xsl:text>
		</xsl:element>

		<xsl:element name="para">
			<xsl:text>For further details, consult the books </xsl:text>
			<xsl:element name="citetitle">
				<xsl:element name="ulink">
					<xsl:attribute name="url">
						<xsl:text>ECONFIG_preface</xsl:text>
					</xsl:attribute>
					<xsl:text>Configuring Productions</xsl:text>
				</xsl:element>
			</xsl:element>
			<xsl:text>, </xsl:text>
			<xsl:element name="citetitle">
				<xsl:element name="ulink">
					<xsl:attribute name="url">
						<xsl:text>EGDV_preface</xsl:text>
					</xsl:attribute>
					<xsl:text>Developing Productions</xsl:text>
				</xsl:element>
			</xsl:element>
			<xsl:text>, or </xsl:text>
			<xsl:element name="citetitle">
				<xsl:element name="ulink">
					<xsl:attribute name="url">
						<xsl:text>EGMG_preface</xsl:text>
					</xsl:attribute>
					<xsl:text>Managing Productions</xsl:text>
				</xsl:element>
			</xsl:element>
			<xsl:text>.</xsl:text>
		</xsl:element>

	<!-- end preface -->
	</xsl:element>
</xsl:template>


<!-- ................................... CONFIGURATION SUMMARY ..................................... -->
<!--
|
|
| This chapter lists the items you care about if you are administering or maintaining the system
|
|
-->
<xsl:template match="Production" mode="production_summary" >

	<xsl:element name="chapter">

		<xsl:attribute name="id">
			<xsl:value-of select="$name" /><xsl:text>_Summary</xsl:text>
		</xsl:attribute>

		<xsl:element name="title">
			<xsl:text>Configuration Summary</xsl:text>
		</xsl:element>

		<xsl:element name="para">
			<xsl:text>This report lists the configured items in the production </xsl:text>
			<xsl:text>and the values of their most important configuration settings. </xsl:text>
			<xsl:if test="$intro='true'">
				<xsl:text>For definitions of terms, such as business hosts or business rules, refer to the previous chapter, </xsl:text>
				<xsl:element name="quote">
					<xsl:element name="link">
						<xsl:attribute name="linkend">
							<xsl:value-of select="$name" /><xsl:text>_Terminology</xsl:text>
						</xsl:attribute>
						<xsl:text>Terminology</xsl:text>
					</xsl:element>
				</xsl:element>
				<xsl:text>. </xsl:text>
			</xsl:if>
		</xsl:element>


		<xsl:element name="sect1">

			<xsl:attribute name="id">
				<xsl:value-of select="$name" /><xsl:text>_summary_platform</xsl:text>
			</xsl:attribute>
			<xsl:element name="title">
				<xsl:text>Platform</xsl:text>
			</xsl:element>

			<xsl:element name="para">
				<xsl:text>The following table describes the instance that generated this production report. </xsl:text>
			</xsl:element>

			<xsl:element name="informaltable">

				<xsl:call-template name="table_attributes" />

				<xsl:element name="tgroup">

					<xsl:call-template name="configuration_table_header" />

					<xsl:element name="thead">
						<xsl:element name="row">
							<xsl:element name="entry">
								<xsl:text>Item</xsl:text>
							</xsl:element>
							<xsl:element name="entry">
								<xsl:text>Value</xsl:text>
							</xsl:element>
						</xsl:element>
					</xsl:element>

					<xsl:element name="tbody">
						<xsl:element name="row">
							<xsl:element name="entry">
								<xsl:element name="guilabel">
									<xsl:text>Report Time and Date</xsl:text>
								</xsl:element>
							</xsl:element>
							<xsl:element name="entry">
								<xsl:value-of select="../@ts"/>
							</xsl:element>
						</xsl:element>

						<xsl:element name="row">
							<xsl:element name="entry">
								<xsl:element name="guilabel">
									<xsl:text>Version</xsl:text>
								</xsl:element>
							</xsl:element>
							<xsl:element name="entry">
								<xsl:value-of select="../@zv"/>
							</xsl:element>
						</xsl:element>
					</xsl:element>

				<!-- end tgroup -->
				</xsl:element>

			 <!-- end informaltable -->
			 </xsl:element>

		 <!-- end sect1 -->
		 </xsl:element>

		<xsl:element name="sect1">
			<xsl:attribute name="id">
				<xsl:value-of select="$name" /><xsl:text>_summary_production</xsl:text>
			</xsl:attribute>
			<xsl:element name="title">
				<xsl:text>Production</xsl:text>
			</xsl:element>

			<xsl:element name="para">
				<xsl:text>The following settings apply to the production as a whole. </xsl:text>
			</xsl:element>

			<xsl:element name="informaltable">
				<xsl:call-template name="table_attributes" />
				<xsl:element name="tgroup">
					<xsl:call-template name="configuration_table_header"/>
					<xsl:call-template name="two_column_settings_header" />
					<xsl:element name="tbody">
						<xsl:apply-templates select="@* | *[not(name(.)='Item')][not(name(.)='Setting')]" mode="describe_production_settings">
							<xsl:sort select="name(.)"/>
						</xsl:apply-templates>
						<xsl:apply-templates select="Setting" mode="describe_settings" >
							<xsl:sort select="@Name"/>
						</xsl:apply-templates>
					</xsl:element>
				</xsl:element>
			</xsl:element>

		<!-- end sect1 -->
		</xsl:element>

		<xsl:if test="descendant::Setting[contains(@Name,'Target') and (not(.=''))] |
				   	  descendant::Setting[contains(@Name,'ClientClass') and (not(.=''))] |
				   	  descendant::Setting[@Name='ResponseFrom' and (not(.=''))] |
				   	  descendant::Setting[@Name='BadMessageHandler' and (not(.=''))]" >
			<xsl:element name="sect1">

				<xsl:attribute name="id">
					<xsl:value-of select="$name" /><xsl:text>_summary_interfaces</xsl:text>
				</xsl:attribute>
				<xsl:element name="title">
					<xsl:text>Interfaces</xsl:text>
				</xsl:element>

				<xsl:element name="para">
					<xsl:text>Business hosts in the production specify their interactions with one another as follows. </xsl:text>
					<xsl:text>This table provides a summary only. For additional details about specific items in this production, refer to </xsl:text>
					<xsl:element name="quote">
						<xsl:element name="link">
							<xsl:attribute name="linkend">
								<xsl:value-of select="$name" /><xsl:text>_Hosts</xsl:text>
							</xsl:attribute>
							<xsl:text>Business Hosts</xsl:text>
						</xsl:element>
					</xsl:element>
					<xsl:text> and other sections in this report. </xsl:text>
				</xsl:element>

				<xsl:element name="informaltable">
					<xsl:call-template name="table_attributes" />
					<xsl:attribute name="id">
						<xsl:value-of select="$name" /><xsl:text>_summary_interfaces_table</xsl:text>
					</xsl:attribute>
					<xsl:element name="tgroup">
						<xsl:call-template name="summary_table_header"/>
						<xsl:element name="tbody">
							<xsl:apply-templates
							select="descendant::Setting[contains(@Name,'Target') and (not(.=''))] |
				   	  				descendant::Setting[contains(@Name,'ClientClass') and (not(.=''))] |
				   	  				descendant::Setting[@Name='ResponseFrom' and (not(.=''))] |
								    descendant::Setting[@Name='BadMessageHandler' and (not(.=''))]"
							mode="production_summary" >
								<xsl:sort select="."/>
							</xsl:apply-templates>
						</xsl:element>
					</xsl:element>
				 </xsl:element>
			 </xsl:element>
		</xsl:if>

		<xsl:if test="descendant::Setting[contains(@Name,'SchemaCategory') and not(.='')] |
				   	  descendant::Setting[contains(@Name,'DocTypes') and (not(.=''))] " >
			<xsl:element name="sect1">

				<xsl:attribute name="id">
					<xsl:value-of select="$name" /><xsl:text>_summary_schemacategory</xsl:text>
				</xsl:attribute>
				<xsl:element name="title">
					<xsl:text>Schema Categories</xsl:text>
				</xsl:element>

				<xsl:element name="para">
					<xsl:text>Business hosts in the production use message schema categories as follows. </xsl:text>
					<xsl:if test="not($schema='')">
						<xsl:text>This table provides a summary only. For additional details, refer to the </xsl:text>
						<xsl:element name="quote">
							<xsl:element name="link">
								<xsl:attribute name="linkend">
									<xsl:value-of select="$name" /><xsl:text>_Schemas</xsl:text>
								</xsl:attribute>
								<xsl:text>Custom Schema Categories</xsl:text>
							</xsl:element>
						</xsl:element>
						<xsl:text> section.</xsl:text>
					</xsl:if>
				</xsl:element>

				<xsl:element name="informaltable">
					<xsl:call-template name="table_attributes" />
					<xsl:attribute name="id">
						<xsl:value-of select="$name" /><xsl:text>_summary_schemacategory_table</xsl:text>
					</xsl:attribute>
					<xsl:element name="tgroup">
						<xsl:call-template name="summary_table_header"/>
						<xsl:element name="tbody">
							<xsl:apply-templates
							select="descendant::Setting[contains(@Name,'SchemaCategory') and not(.='')] |
				   	  				descendant::Setting[contains(@Name,'DocTypes') and (not(.=''))] "
							mode="production_summary" >
								<xsl:sort select="."/>
							</xsl:apply-templates>
						</xsl:element>
					</xsl:element>
				 </xsl:element>
			 </xsl:element>
		</xsl:if>

		<xsl:if test="descendant::Setting[@Name='BusinessRuleName' and not(.='')]">
			<xsl:element name="sect1">
				<xsl:attribute name="id">
					<xsl:value-of select="$name" /><xsl:text>_summary_businessrules</xsl:text>
				</xsl:attribute>
				<xsl:element name="title">
					<xsl:text>Rule Sets</xsl:text>
				</xsl:element>

				<xsl:element name="para">
					<xsl:text>Business hosts in the production use business rule sets as follows. </xsl:text>
					<xsl:if test="not($rules='')">
						<xsl:text>This table provides a summary only. For additional details, refer to the </xsl:text>
						<xsl:element name="quote">
							<xsl:element name="link">
								<xsl:attribute name="linkend">
									<xsl:value-of select="$name" /><xsl:text>_Rules</xsl:text>
								</xsl:attribute>
								<xsl:text>Business Rules</xsl:text>
							</xsl:element>
						</xsl:element>
						<xsl:text> section.</xsl:text>
					</xsl:if>
				</xsl:element>

				<xsl:element name="informaltable">
					<xsl:call-template name="table_attributes" />
					<xsl:attribute name="id">
						<xsl:value-of select="$name" /><xsl:text>_summary_businessrules_table</xsl:text>
					</xsl:attribute>
					<xsl:element name="tgroup">
						<xsl:call-template name="summary_table_header"/>
						<xsl:element name="tbody">
							<xsl:apply-templates
							select="descendant::Setting[@Name='BusinessRuleName' and not(.='')]"
							mode="production_summary" >
								<xsl:sort select="."/>
							</xsl:apply-templates>
						</xsl:element>
					</xsl:element>
				 </xsl:element>
			 </xsl:element>
		</xsl:if>

		<xsl:if test="descendant::Setting[contains(@Name,'Address') and (not(.=''))] |
				   	  descendant::Setting[contains(@Name,'Server') and (not(.=''))]
				   	  " >
			<xsl:element name="sect1">
				<xsl:attribute name="id">
					<xsl:value-of select="$name" /><xsl:text>_summary_systems</xsl:text>
				</xsl:attribute>
				<xsl:element name="title">
					<xsl:text>External Systems</xsl:text>
				</xsl:element>

				<xsl:element name="para">
					<xsl:text>Business hosts in the production connect with external systems as follows. </xsl:text>
				</xsl:element>

				<xsl:element name="informaltable">
					<xsl:call-template name="table_attributes" />
					<xsl:attribute name="id">
						<xsl:value-of select="$name" /><xsl:text>_summary_systems_table</xsl:text>
					</xsl:attribute>
					<xsl:element name="tgroup">
						<xsl:call-template name="summary_table_header"/>
						<xsl:element name="tbody">
							<xsl:apply-templates
							select="descendant::Setting[contains(@Name,'Address') and (not(.=''))] |
			   				   	    descendant::Setting[contains(@Name,'Server') and (not(.=''))] "
							mode="production_summary" >
								<xsl:sort select="."/>
							</xsl:apply-templates>
						</xsl:element>
					</xsl:element>
				 </xsl:element>
			 </xsl:element>
		</xsl:if>

		<xsl:if test="descendant::Setting[contains(@Name,'Channel') and (not(.=''))] |
				   	  descendant::Setting[contains(@Name,'QueueName') and (not(.=''))]
				   	  " >
			<xsl:element name="sect1">

				<xsl:attribute name="id">
					<xsl:value-of select="$name" /><xsl:text>_summary_mqueues</xsl:text>
				</xsl:attribute>
				<xsl:element name="title">
					<xsl:text>External Message Queues</xsl:text>
				</xsl:element>

				<xsl:element name="para">
					<xsl:text>Business hosts in the production use external message queues as follows. </xsl:text>
				</xsl:element>

				<xsl:element name="informaltable">
					<xsl:call-template name="table_attributes" />
					<xsl:attribute name="id">
						<xsl:value-of select="$name" /><xsl:text>_summary_mqueues_table</xsl:text>
					</xsl:attribute>
					<xsl:element name="tgroup">
						<xsl:call-template name="summary_table_header"/>
						<xsl:element name="tbody">
							<xsl:apply-templates
							select="descendant::Setting[contains(@Name,'Channel') and (not(.=''))] |
				   	  				descendant::Setting[contains(@Name,'QueueName') and (not(.=''))] "
							mode="production_summary" >
								<xsl:sort select="."/>
							</xsl:apply-templates>
						</xsl:element>
					</xsl:element>
				 </xsl:element>
			 </xsl:element>
		</xsl:if>

		<xsl:if test="descendant::Setting[contains(@Name,'Facility') and (not(.=''))] |
				   	  descendant::Setting[contains(@Name,'Application') and (not(.=''))]
				   	  " >
			<xsl:element name="sect1">
				<xsl:attribute name="id">
					<xsl:value-of select="$name" /><xsl:text>_summary_facility</xsl:text>
				</xsl:attribute>
				<xsl:element name="title">
					<xsl:text>Facility and Application</xsl:text>
				</xsl:element>

				<xsl:element name="para">
					<xsl:text>Business hosts in the production connect with sending and receiving facilities and applications as follows. </xsl:text>
				</xsl:element>

				<xsl:element name="informaltable">
					<xsl:call-template name="table_attributes" />
					<xsl:attribute name="id">
						<xsl:value-of select="$name" /><xsl:text>_summary_facility_table</xsl:text>
					</xsl:attribute>
					<xsl:element name="tgroup">
						<xsl:call-template name="summary_table_header"/>
						<xsl:element name="tbody">
							<xsl:apply-templates
							select="descendant::Setting[contains(@Name,'Facility') and (not(.=''))] |
				   	  				descendant::Setting[contains(@Name,'Application') and (not(.=''))] "
							mode="production_summary" >
								<xsl:sort select="."/>
							</xsl:apply-templates>
						</xsl:element>
					</xsl:element>
				 </xsl:element>
			 </xsl:element>
		</xsl:if>

		<xsl:if test="descendant::Setting[@Name='Framing' and not(.='')]">
			<xsl:element name="sect1">

				<xsl:attribute name="id">
					<xsl:value-of select="$name" /><xsl:text>_summary_framing</xsl:text>
				</xsl:attribute>
				<xsl:element name="title">
					<xsl:text>Framing</xsl:text>
				</xsl:element>

				<xsl:element name="para">
					<xsl:text>Business hosts in the production configure message framing for data in Electronic Data Interchange (EDI) format. </xsl:text>
				</xsl:element>

				<xsl:element name="informaltable">
					<xsl:call-template name="table_attributes" />
					<xsl:attribute name="id">
						<xsl:value-of select="$name" /><xsl:text>_summary_framing_table</xsl:text>
					</xsl:attribute>
					<xsl:element name="tgroup">
						<xsl:call-template name="summary_table_header"/>
						<xsl:element name="tbody">
							<xsl:apply-templates
							select="descendant::Setting[@Name='Framing' and not(.='')]"
							mode="production_summary" >
								<xsl:sort select="."/>
							</xsl:apply-templates>
						</xsl:element>
					</xsl:element>
				 </xsl:element>
			 </xsl:element>
		</xsl:if>

		<xsl:if test="descendant::Setting[@Name='Separators' and not(.='')]">
			<xsl:element name="sect1">
				<xsl:attribute name="id">
					<xsl:value-of select="$name" /><xsl:text>_summary_separators</xsl:text>
				</xsl:attribute>
				<xsl:element name="title">
					<xsl:text>Separators</xsl:text>
				</xsl:element>

				<xsl:element name="para">
					<xsl:text>Business hosts in the production use the following separator characters for Electronic Data Interchange (EDI) formats such as HL7 Version 2.  </xsl:text>
				</xsl:element>

				<xsl:element name="informaltable">
					<xsl:call-template name="table_attributes" />
					<xsl:attribute name="id">
						<xsl:value-of select="$name" /><xsl:text>_summary_separators_table</xsl:text>
					</xsl:attribute>
					<xsl:element name="tgroup">
						<xsl:call-template name="summary_table_header"/>
						<xsl:element name="tbody">
							<xsl:apply-templates
							select="descendant::Setting[@Name='Separators' and not(.='')]"
							mode="production_summary" >
								<xsl:sort select="."/>
							</xsl:apply-templates>
						</xsl:element>
					</xsl:element>
				 </xsl:element>
			 </xsl:element>
		</xsl:if>

		<xsl:if test="descendant::Setting[@Name='FilePath' and (not(.=''))] |
				   	  descendant::Setting[@Name='ArchivePath' and (not(.=''))] |
					  descendant::Setting[contains(@Name,'PathName') and (not(.=''))] |
				   	  descendant::Setting[@Name='WorkPath' and (not(.=''))]" >
			<xsl:element name="sect1">

				<xsl:attribute name="id">
					<xsl:value-of select="$name" /><xsl:text>_summary_filelocations</xsl:text>
				</xsl:attribute>
				<xsl:element name="title">
					<xsl:text>File Locations</xsl:text>
				</xsl:element>

				<xsl:element name="para">
					<xsl:text>Business hosts in the production read or write files to and from the following locations. </xsl:text>
				</xsl:element>

				<xsl:element name="informaltable">
					<xsl:call-template name="table_attributes" />
					<xsl:attribute name="id">
						<xsl:value-of select="$name" /><xsl:text>_summary_filelocations_table</xsl:text>
					</xsl:attribute>
					<xsl:element name="tgroup">
						<xsl:call-template name="summary_table_header"/>
						<xsl:element name="tbody">
							<xsl:apply-templates
							select="descendant::Setting[@Name='FilePath' and (not(.=''))] |
								    descendant::Setting[@Name='ArchivePath' and (not(.=''))] |
								    descendant::Setting[contains(@Name,'PathName') and (not(.=''))] |
				   	  				descendant::Setting[@Name='WorkPath' and (not(.=''))]"
							mode="production_summary" >
								<xsl:sort select="."/>
							</xsl:apply-templates>
						</xsl:element>
					</xsl:element>
				 </xsl:element>
			 </xsl:element>
		</xsl:if>

		<xsl:if test="descendant::Setting[@Name='From' and (not(.=''))] |
				   	  descendant::Setting[contains(@Name,'Cc') and (not(.=''))] |
				   	  descendant::Setting[contains(@Name,'Recipient') and (not(.=''))]
				   	  " >
			<xsl:element name="sect1">
				<xsl:attribute name="id">
					<xsl:value-of select="$name" /><xsl:text>_summary_email</xsl:text>
				</xsl:attribute>
				<xsl:element name="title">
					<xsl:text>Email Addresses</xsl:text>
				</xsl:element>

				<xsl:element name="para">
					<xsl:text>Business hosts in the production use the following email addresses for notification purposes.  </xsl:text>
				</xsl:element>

				<xsl:element name="informaltable">
					<xsl:call-template name="table_attributes" />
					<xsl:attribute name="id">
						<xsl:value-of select="$name" /><xsl:text>_summary_email_table</xsl:text>
					</xsl:attribute>
					<xsl:element name="tgroup">
						<xsl:call-template name="summary_table_header"/>
						<xsl:element name="tbody">
							<xsl:apply-templates
							select="descendant::Setting[@Name='From' and (not(.=''))] |
								    descendant::Setting[contains(@Name,'Cc') and (not(.=''))] |
								    descendant::Setting[contains(@Name,'Recipient') and (not(.=''))] "
							mode="production_summary" >
								<xsl:sort select="."/>
							</xsl:apply-templates>
						</xsl:element>
					</xsl:element>
				 </xsl:element>
			 </xsl:element>
		</xsl:if>

		<xsl:if test="descendant::Setting[contains(@Name,'Port') and (not(.=''))] " >
			<xsl:element name="sect1">

				<xsl:attribute name="id">
					<xsl:value-of select="$name" /><xsl:text>_summary_ports</xsl:text>
				</xsl:attribute>
				<xsl:element name="title">
					<xsl:text>Ports</xsl:text>
				</xsl:element>

				<xsl:element name="para">
					<xsl:text>Business hosts in the production connect to external systems using protocols such as TCP, FTP, SMTP and others. Business hosts assign the following ports for these purposes. </xsl:text>
				</xsl:element>

				<xsl:if test="count(descendant::Setting[contains(@Name,'Port') and (not(.=''))]) &lt;= 200">
					<xsl:element name="informaltable">
						<xsl:call-template name="table_attributes" />
						<xsl:attribute name="id">
							<xsl:value-of select="$name" /><xsl:text>_summary_ports_table</xsl:text>
						</xsl:attribute>
						<xsl:element name="tgroup">
							<xsl:call-template name="summary_table_header"/>
							<xsl:element name="tbody">
								<xsl:apply-templates
								select="descendant::Setting[contains(@Name,'Port') and (not(.=''))] "
								mode="production_summary" >
									<xsl:sort select="."/>
								</xsl:apply-templates>
							</xsl:element>
						</xsl:element>
					 </xsl:element>
				</xsl:if>
				<xsl:if test="count(descendant::Setting[contains(@Name,'Port') and (not(.=''))]) &gt; 200">
					<xsl:apply-templates
					select="descendant::Setting[contains(@Name,'Port') and (not(.=''))] "
					mode="production_summary_big" >
						<xsl:sort select="."/>
					</xsl:apply-templates>
				</xsl:if>
			 </xsl:element>
		</xsl:if>

	<!-- end chapter -->
	</xsl:element>

</xsl:template>


<!--
|
|
| Template for a 3-column table header that describes configuration items; supports the Configuration Summary chapter
|
|
-->
<xsl:template name="summary_table_header">
	<xsl:attribute name="cols">
		<xsl:text>3</xsl:text>
	</xsl:attribute>

	<xsl:element name="colspec">
		<xsl:attribute name="colname">
			<xsl:text>col3</xsl:text>
		</xsl:attribute>
		<xsl:attribute name="colwidth">
			<xsl:text>2.2in</xsl:text>
		</xsl:attribute>
	</xsl:element>

	<xsl:element name="colspec">
		<xsl:attribute name="colname">
			<xsl:text>col2</xsl:text>
		</xsl:attribute>
		<xsl:attribute name="colwidth">
			<xsl:text>1.9in</xsl:text>
		</xsl:attribute>
	</xsl:element>

	<xsl:element name="colspec">
		<xsl:attribute name="colname">
			<xsl:text>col1</xsl:text>
		</xsl:attribute>
		<xsl:attribute name="colwidth">
			<xsl:text>3.0in</xsl:text>
		</xsl:attribute>
	</xsl:element>

	<xsl:element name="thead">
		<xsl:element name="row">
			<xsl:element name="entry">
				<xsl:text>Business Host</xsl:text>
			</xsl:element>
			<xsl:element name="entry">
				<xsl:text>Setting</xsl:text>
			</xsl:element>
			<xsl:element name="entry">
				<xsl:text>Value</xsl:text>
			</xsl:element>
		</xsl:element>
	</xsl:element>
</xsl:template>


<!--
|
|
| Template for a three-column table row that describes one configuration item; supports the Configuration Summary chapter
|
|
-->
<xsl:template match="Setting" mode="production_summary" >
	<xsl:element name="row">
		<xsl:element name="entry">
			<xsl:call-template name="break_up_string_with" >
				<xsl:with-param name="MYSTRING" select="../@Name" />
				<xsl:with-param name="SEPARATOR" select="'.'" />
				<xsl:with-param name="MARKER" select="'.'" />
			</xsl:call-template>
		</xsl:element>
		<xsl:element name="entry">
			<xsl:element name="guilabel">
				<xsl:value-of select="@Name"/>
			</xsl:element>
		</xsl:element>
		<xsl:element name="entry">
			<xsl:call-template name="break_up_string_with" >
				<xsl:with-param name="MYSTRING" select="." />
				<xsl:with-param name="SEPARATOR" select="','" />
				<xsl:with-param name="MARKER" select="','" />
			</xsl:call-template>
		</xsl:element>
	</xsl:element>
</xsl:template>


<!--
|
|
| Template for a 3-column complete table that describes a configuration item; supports the Configuration Summary chapter.
| This is needed when there are too many of a certain item and the table needs to be broken up. See 'Ports'.
|
|
-->

<xsl:template match="Setting" mode="production_summary_big" >
	<xsl:element name="informaltable">
		<xsl:call-template name="table_attributes" />
		<xsl:attribute name="id">
			<xsl:value-of select="../@Name"/><xsl:text>_summary_ports_table</xsl:text>
		</xsl:attribute>
		<xsl:element name="tgroup">
			<xsl:call-template name="summary_table_header"/>
			<xsl:element name="tbody">
				<xsl:apply-templates
				select="."
				mode="production_summary" >
					<xsl:sort select="."/>
				</xsl:apply-templates>
			</xsl:element>
		</xsl:element>
	 </xsl:element>
</xsl:template>



<!-- ........................................ BUSINESS HOSTS ....................................... -->
<!--
|
|
| The detailed Business Hosts chapter lists every configuration setting in the production
|
|
-->
<xsl:template match="Production" mode="configuration_items">

	<xsl:element name="chapter">

		<xsl:attribute name="id">
			<xsl:value-of select="$name" /><xsl:text>_Hosts</xsl:text>
		</xsl:attribute>

		<xsl:element name="title">
			<xsl:text>Business Hosts</xsl:text>
		</xsl:element>

		<xsl:element name="para">
			<xsl:text>This section describes the configuration settings for business hosts in the production. </xsl:text>
		</xsl:element>

		 <xsl:element name="note">
		 	<xsl:element name="para">
		 		<xsl:text>Settings that can be true or false also accept the values 1 or 0, respectively. </xsl:text>
			</xsl:element>
		 </xsl:element>

		<xsl:apply-templates select="Item" mode="configuration_items" >
			<xsl:sort select="@Name"/>
		</xsl:apply-templates>

	<!-- end chapter -->
	</xsl:element>

</xsl:template>


<!--
|
|
| Template for a table that describes the configuration settings for the whole production or for one business host
|
|
-->
<xsl:template name="configuration_table_header" >
	<xsl:attribute name="cols">
		<xsl:text>2</xsl:text>
	</xsl:attribute>

	<xsl:element name="colspec">
		<xsl:attribute name="colname">
			<xsl:text>col1</xsl:text>
		</xsl:attribute>
		<xsl:attribute name="colwidth">
			<xsl:text>2.5in</xsl:text>
		</xsl:attribute>
	</xsl:element>

	<xsl:element name="colspec">
		<xsl:attribute name="colname">
			<xsl:text>col2</xsl:text>
		</xsl:attribute>
		<xsl:attribute name="colwidth">
			<xsl:text>4.6in</xsl:text>
		</xsl:attribute>
	</xsl:element>
</xsl:template>


<!--
|
|
| Template for a table row that describes one configuration setting; supports mix of attributes and elements
|
|
-->
<xsl:template match="@* | *" mode="describe_production_settings">
	<xsl:element name="row">
		<xsl:element name="entry">
			<xsl:element name="guilabel">
				<xsl:value-of select="name(.)"/>
			</xsl:element>
		</xsl:element>
		<xsl:element name="entry">
			<xsl:value-of select="normalize-space(.)"/>
		</xsl:element>
	</xsl:element>
</xsl:template>


<!--
|
|
| Template for a table header row that describes one configuration setting
|
|
-->
<xsl:template name="two_column_settings_header">
	<xsl:element name="thead">
		<xsl:element name="row">
			<xsl:element name="entry">
				<xsl:text>Setting</xsl:text>
			</xsl:element>
			<xsl:element name="entry">
				<xsl:text>Value</xsl:text>
			</xsl:element>
		</xsl:element>
	</xsl:element>
</xsl:template>



<!--
|
|
| Template for a table row that describes one configuration setting; supports the Business Hosts chapter
|
|
-->
<xsl:template match="Setting" mode="describe_settings">
	<xsl:element name="row">
		<xsl:element name="entry">
			<xsl:element name="guilabel">
				<xsl:value-of select="@Name"/>
			</xsl:element>
		</xsl:element>
		<xsl:element name="entry">
			<xsl:call-template name="break_up_string_with" >
				<xsl:with-param name="MYSTRING" select="normalize-space(.)" />
				<xsl:with-param name="SEPARATOR" select="','" />
				<xsl:with-param name="MARKER" select="','" />
			</xsl:call-template>
		</xsl:element>
	</xsl:element>
</xsl:template>


<!--
|
|
| Template for a table row that describes one configuration setting; supports the Business Hosts chapter
|
|
-->
<xsl:template match="@* | *" mode="describe_settings_combined">

	<xsl:element name="row">
		<xsl:element name="entry">
			<xsl:element name="guilabel">
				<xsl:if test="name(.) = 'Setting'">
					<xsl:value-of select="@Name"/>
				</xsl:if>
				<xsl:if test="not(name(.) = 'Setting')">
					<xsl:value-of select="name(.)"/>
				</xsl:if>
			</xsl:element>
		</xsl:element>
		<xsl:element name="entry">
			<xsl:call-template name="break_up_string_with" >
				<xsl:with-param name="MYSTRING" select="normalize-space(.)" />
				<xsl:with-param name="SEPARATOR" select="','" />
				<xsl:with-param name="MARKER" select="','" />
			</xsl:call-template>
		</xsl:element>
	</xsl:element>
</xsl:template>


<!--
|
|
| Template for a chapter topic for one business host; supports the Business Hosts chapter
|
|
-->
<xsl:template match="Item" mode="configuration_items" >

	<xsl:element name="sect1">

		<xsl:attribute name="id">
			<xsl:value-of select="$name" /><xsl:text>_host_</xsl:text><xsl:value-of select="position()"/>
		</xsl:attribute>

		<xsl:element name="title">
			<xsl:value-of select="@Name"/>
		</xsl:element>

		<xsl:element name="para">

			<xsl:text>The following tables list configuration settings that apply to the business host </xsl:text>
			<xsl:element name="guilabel">
				<xsl:value-of select="@Name"/>
				<xsl:text>.</xsl:text>
			</xsl:element>

		<!-- end para -->
		</xsl:element>

		<xsl:element name="table">

			<xsl:call-template name="table_attributes" />

			<xsl:attribute name="id">
				<xsl:value-of select="$name" /><xsl:text>_host_</xsl:text><xsl:value-of select="position()"/><xsl:text>_general</xsl:text>
			</xsl:attribute>
			<xsl:element name="title">
				<xsl:value-of select="@Name"/>
				<xsl:text> Settings</xsl:text>
			</xsl:element>

			<xsl:element name="tgroup">
				<xsl:call-template name="configuration_table_header"/>
				<xsl:call-template name="two_column_settings_header" />
				<xsl:element name="tbody">
					<xsl:apply-templates select="@* | Setting" mode="describe_settings_combined">
						<!-- XSLT 2.0 only -->
						<!-- <xsl:sort select="if (name(.)='Setting') then @Name else name(.)" /> -->
						<!-- XSLT 1.0 gets you only partway there -->
						<xsl:sort select="name(.)"/> 
						<xsl:sort select="@Name"/> 
					</xsl:apply-templates>
				</xsl:element>
			</xsl:element>

		 <!-- end table -->
		 </xsl:element>
		 
	<!-- end sect1 -->
	</xsl:element>

</xsl:template>


<!-- .................................. CUSTOM SCHEMA CATEGORIES .................................. -->
<!--
|
|
| Template for the Custom Schema Categories chapter
|
|
-->
<xsl:template match="Export" mode="custom_schemas">

	<xsl:element name="chapter">

		<xsl:attribute name="id">
			<xsl:value-of select="$name" /><xsl:text>_Schemas</xsl:text>
		</xsl:attribute>

		<xsl:element name="title">
			<xsl:text>Custom Schema Categories</xsl:text>
		</xsl:element>

		<xsl:element name="para">
			<xsl:text>This section describes the custom schema categories in the production.</xsl:text>
		</xsl:element>

		<xsl:element name="para">
			<xsl:text>The standards for Electronic Data Interchange (EDI) formats are extensible, and many of the clinical applications that produce and consume data in EDI formats take advantage of this feature. </xsl:text>
			<xsl:text>The common practice in customizing EDI formats is to add custom segments to a standard document structure. A </xsl:text>
			<xsl:element name="firstterm">
				<xsl:text>custom schema category</xsl:text>
			</xsl:element>
			<xsl:text> is the document that defines these custom segments and how to use them. </xsl:text>
		</xsl:element>

		<xsl:apply-templates select="Document/Category" mode="custom_schemas" >
			<xsl:sort select="@name"/>
		</xsl:apply-templates>

	<!-- end chapter -->
	</xsl:element>

</xsl:template>


<!--
|
|
| Template for one schema category definition; supports the Custom Schema Categories chapter
|
|
-->
<xsl:template match="Category" mode="custom_schemas" >

	<xsl:element name="sect1">

		<xsl:attribute name="id">
			<xsl:value-of select="$name" /><xsl:text>_schema_</xsl:text><xsl:value-of select="position()"/>
		</xsl:attribute>

		<xsl:element name="title">
			<xsl:value-of select="@name"/>
		</xsl:element>

		<xsl:element name="para">
			<xsl:element name="guilabel">
				<xsl:value-of select="@name"/>
			</xsl:element>
			<xsl:text> is identical to schema </xsl:text>
			<xsl:element name="guilabel">
				<xsl:value-of select="@base"/>
			</xsl:element>
			<xsl:text>, except that it extends </xsl:text>
			<xsl:element name="guilabel">
				<xsl:value-of select="@base"/>
			</xsl:element>
			<xsl:text> by adding the following items.</xsl:text>
		</xsl:element>

		<xsl:if test="SegmentStructure">

			<xsl:if test="count(SegmentStructure) &gt; 20" >
				<xsl:apply-templates select="SegmentStructure" mode="big">
					<xsl:sort select="@name"/>
				</xsl:apply-templates>
			</xsl:if>

			<xsl:if test="count(SegmentStructure) &lt;= 20" >
				<xsl:element name="table">

					<xsl:call-template name="table_attributes" />

					<xsl:attribute name="id">
						<xsl:value-of select="$name" /><xsl:text>_</xsl:text><xsl:value-of select="../@name"/><xsl:text>_</xsl:text><xsl:value-of select="@name"/><xsl:text>_segment_</xsl:text><xsl:value-of select="position()"/>
					</xsl:attribute>
					<xsl:element name="title">
						<xsl:text>Segment Structures </xsl:text>
					</xsl:element>

					<xsl:element name="tgroup">
						<xsl:call-template name="schema_table_header" />
						<xsl:element name="thead">
							<xsl:element name="row">
								<xsl:element name="entry">
									<xsl:text>Custom Segment Structure</xsl:text>
								</xsl:element>
								<xsl:element name="entry">
									<xsl:text>Used In</xsl:text>
								</xsl:element>
							</xsl:element>
						</xsl:element>
						<xsl:element name="tbody">
							<xsl:apply-templates select="SegmentStructure" mode="one">
								<xsl:sort select="@name"/>
							</xsl:apply-templates>
						<!-- end tbody -->
						</xsl:element>
					<!-- end tgroup -->
					</xsl:element>
				 <!-- end table -->
				 </xsl:element>
		 	<!-- end if -->
			</xsl:if>

		 <!-- end if -->
		 </xsl:if>

		<xsl:if test="MessageStructure | DocumentStructure">
		
			<xsl:element name="table">

				<xsl:call-template name="table_attributes" />

				<xsl:attribute name="id">
					<xsl:value-of select="$name" /><xsl:text>_</xsl:text><xsl:value-of select="@name"/><xsl:text>_document</xsl:text>
				</xsl:attribute>
				<xsl:element name="title">
					<xsl:text>Document Structures</xsl:text>
				</xsl:element>

				<xsl:element name="tgroup">
					<xsl:call-template name="schema_table_header" />
					<xsl:element name="thead">
						<xsl:element name="row">
							<xsl:element name="entry">
								<xsl:text>Custom Document Structure</xsl:text>
							</xsl:element>
							<xsl:element name="entry">
								<xsl:text>Used In</xsl:text>
							</xsl:element>
						</xsl:element>
					</xsl:element>
					<xsl:element name="tbody">
						<xsl:apply-templates select="MessageStructure" mode="find_doc_type">
							<xsl:sort select="@name"/>
						</xsl:apply-templates>
						<xsl:apply-templates select="DocumentStructure" mode="find_doc_type">
							<xsl:sort select="@name"/>
						</xsl:apply-templates>
					</xsl:element>
				</xsl:element>

			 <!-- end table -->
			 </xsl:element>

		 <!-- end if -->
		 </xsl:if>

		<xsl:if test="MessageType | DocumentType">

			<xsl:element name="table">

				<xsl:call-template name="table_attributes" />

				<xsl:attribute name="id">
					<xsl:value-of select="$name" /><xsl:text>_</xsl:text><xsl:value-of select="@name"/><xsl:text>_doctypes</xsl:text>
				</xsl:attribute>
					<xsl:element name="title">
						<xsl:text>Document Types</xsl:text>
					</xsl:element>


				<xsl:element name="tgroup">
					<xsl:call-template name="document_type_table" />
					<xsl:element name="thead">
						<xsl:element name="row">
							<xsl:element name="entry">
								<xsl:text>Document Type</xsl:text>
							</xsl:element>
							<xsl:element name="entry">
								<xsl:text>Request Structure</xsl:text>
							</xsl:element>
							<xsl:element name="entry">
								<xsl:text>Response Structure</xsl:text>
							</xsl:element>
						</xsl:element>
					</xsl:element>
					<xsl:element name="tbody">
						<xsl:apply-templates select="MessageType" mode="list_document_types">
							<xsl:sort select="@name"/>
						</xsl:apply-templates>
						<xsl:apply-templates select="DocumentType" mode="list_document_types">
							<xsl:sort select="@name"/>
						</xsl:apply-templates>
					</xsl:element>

				<!-- end tgroup -->
				</xsl:element>

			 <!-- end table -->
			 </xsl:element>

		 <!-- end if -->
		 </xsl:if>

	<!-- end sect1 -->
	</xsl:element>

</xsl:template>

<!--
|
|
| Template for one table row that matches a segment structure with its containing document structure
|
|
-->
<xsl:template match="SegmentStructure" mode="one">
	<xsl:element name="row">
		<xsl:element name="entry">
			<xsl:element name="guilabel">
				<xsl:value-of select="@name"/>
			</xsl:element>
			<xsl:text> - </xsl:text>
			<xsl:value-of select="@description"/>
		</xsl:element>
		<xsl:element name="entry">
			<xsl:apply-templates select="../MessageStructure" mode="list_segments" >
				<xsl:with-param name="FIND" select="@name"/>
			</xsl:apply-templates>
			<xsl:apply-templates select="../DocumentStructure" mode="list_segments" >
				<xsl:with-param name="FIND" select="@name"/>
			</xsl:apply-templates>
		</xsl:element>
	</xsl:element>
</xsl:template>

<!--
|
|
| Template for one table containing one segment structure - used to break up very big schemas
|
|
-->
<xsl:template match="SegmentStructure" mode="big">
	<xsl:element name="table">

		<xsl:call-template name="table_attributes" />

		<xsl:attribute name="id">
			<xsl:value-of select="$name" /><xsl:text>_</xsl:text><xsl:value-of select="../@name"/><xsl:text>_</xsl:text><xsl:value-of select="@name"/><xsl:text>_segment_</xsl:text><xsl:value-of select="position()"/>
		</xsl:attribute>
		<xsl:element name="title">
			<xsl:text>Segment Structure </xsl:text><xsl:value-of select="@name"/>
		</xsl:element>

		<xsl:element name="tgroup">
			<xsl:call-template name="schema_table_header" />
			<xsl:element name="thead">
				<xsl:element name="row">
					<xsl:element name="entry">
						<xsl:text>Custom Segment Structure</xsl:text>
					</xsl:element>
					<xsl:element name="entry">
						<xsl:text>Used In</xsl:text>
					</xsl:element>
				</xsl:element>
			</xsl:element>
			<xsl:element name="tbody">
				<xsl:element name="row">
					<xsl:element name="entry">
						<xsl:element name="guilabel">
							<xsl:value-of select="@name"/>
						</xsl:element>
						<xsl:text> - </xsl:text>
						<xsl:value-of select="@description"/>
					</xsl:element>
					<xsl:element name="entry">
						<xsl:apply-templates select="../MessageStructure" mode="list_segments" >
							<xsl:with-param name="FIND" select="@name"/>
						</xsl:apply-templates>
						<xsl:apply-templates select="../DocumentStructure" mode="list_segments" >
							<xsl:with-param name="FIND" select="@name"/>
						</xsl:apply-templates>
					</xsl:element>
				</xsl:element>
			<!-- end tbody -->
			</xsl:element>
		<!-- end tgroup -->
		</xsl:element>
	 <!-- end table -->
	 </xsl:element>
</xsl:template>


<!--
|
|
| Template that finds the containing document structure for a segment structure and puts it in a paragraph
|
|
-->
<xsl:template match="MessageStructure | DocumentStructure" mode="list_segments" >
	<xsl:param name="FIND" />
	<xsl:if test="contains(@definition,concat(concat('~',$FIND),'~'))" >
		<xsl:element name="para">
			<xsl:element name="guilabel">
				<xsl:value-of select="@name"/>
			</xsl:element>
		</xsl:element>
	</xsl:if>
</xsl:template>


<!--
|
|
| Template for one table row that matches a document structure with its containing document type
|
|
-->
<xsl:template match="MessageStructure | DocumentStructure" mode="find_doc_type">
	<xsl:element name="row">
		<xsl:element name="entry">
			<xsl:element name="guilabel">
				<xsl:value-of select="@name"/>
			</xsl:element>
			<xsl:text> - </xsl:text>
			<xsl:value-of select="@description"/>
		</xsl:element>
		<xsl:element name="entry">
			<xsl:apply-templates select="../MessageType" mode="list_structures" >
				<xsl:with-param name="FIND" select="@name"/>
			</xsl:apply-templates>
			<xsl:apply-templates select="../DocumentType" mode="list_structures" >
				<xsl:with-param name="FIND" select="@name"/>
			</xsl:apply-templates>
		</xsl:element>
	</xsl:element>
</xsl:template>



<!--
|
|
| Template for one table row that describes a document structure
|
|
-->
<xsl:template match="MessageStructure | DocumentStructure" mode="show_structure">
	<xsl:element name="row">
		<xsl:element name="entry">
			<xsl:element name="guilabel">
				<xsl:value-of select="@name"/>
			</xsl:element>
			<xsl:text> - </xsl:text>
			<xsl:value-of select="@description"/>
		</xsl:element>
		<xsl:element name="entry">
			<xsl:value-of select="@definition"/>
		</xsl:element>
	</xsl:element>
</xsl:template>


<!--
|
|
| Template that finds the containing document type for a document structure and puts it in a paragraph
|
|
-->
<xsl:template match="MessageType | DocumentType" mode="list_structures" >
	<xsl:param name="FIND" />
	<xsl:if test="@structure=$FIND" >
		<xsl:element name="para">
			<xsl:element name="guilabel">
				<xsl:value-of select="@name"/>
			</xsl:element>
		</xsl:element>
	</xsl:if>
	<xsl:if test="@returntype=$FIND" >
		<xsl:element name="para">
			<xsl:element name="guilabel">
				<xsl:value-of select="@name"/>
			</xsl:element>
		</xsl:element>
	</xsl:if>
</xsl:template>


<!--
|
|
| Template for a two-column table with a narrow right column for describing schema categories
|
|
-->
<xsl:template name="schema_table_header" >
	<xsl:attribute name="cols">
		<xsl:text>2</xsl:text>
	</xsl:attribute>

	<xsl:element name="colspec">
		<xsl:attribute name="colname">
			<xsl:text>col1</xsl:text>
		</xsl:attribute>
		<xsl:attribute name="colwidth">
			<xsl:text>4.6in</xsl:text>
		</xsl:attribute>
	</xsl:element>

	<xsl:element name="colspec">
		<xsl:attribute name="colname">
			<xsl:text>col2</xsl:text>
		</xsl:attribute>
		<xsl:attribute name="colwidth">
			<xsl:text>2.5in</xsl:text>
		</xsl:attribute>
	</xsl:element>
</xsl:template>


<!--
|
|
| Template for a 3-column table that describes document types (for HL7v2 primarily); supports Custom Schema Categories
|
|
-->
<xsl:template name="document_type_table">
	<xsl:attribute name="cols">
		<xsl:text>3</xsl:text>
	</xsl:attribute>

	<xsl:element name="colspec">
		<xsl:attribute name="colname">
			<xsl:text>col1</xsl:text>
		</xsl:attribute>
		<xsl:attribute name="colwidth">
			<xsl:text>1.7in</xsl:text>
		</xsl:attribute>
	</xsl:element>

	<xsl:element name="colspec">
		<xsl:attribute name="colname">
			<xsl:text>col2</xsl:text>
		</xsl:attribute>
		<xsl:attribute name="colwidth">
			<xsl:text>2.7in</xsl:text>
		</xsl:attribute>
	</xsl:element>

	<xsl:element name="colspec">
		<xsl:attribute name="colname">
			<xsl:text>col3</xsl:text>
		</xsl:attribute>
		<xsl:attribute name="colwidth">
			<xsl:text>2.7in</xsl:text>
		</xsl:attribute>
	</xsl:element>
</xsl:template>


<!--
|
|
| Template for a table row that describes a document type (with request and response structures)
|
|
-->
<xsl:template match="MessageType | DocumentType" mode="list_document_types" >
	<xsl:element name="row">
		<xsl:element name="entry">
			<xsl:element name="guilabel">
				<xsl:value-of select="@name"/>
			</xsl:element>
		</xsl:element>
		<xsl:element name="entry">
			<xsl:if test="contains(@structure,'base:')">
				<xsl:element name="guilabel">
					<xsl:value-of select="../@base"/>
				</xsl:element>
				<xsl:text> standard </xsl:text>
				<xsl:element name="guilabel">
					<xsl:value-of select="substring-after(@structure,'base:')"/>
				</xsl:element>
			</xsl:if>
			<xsl:if test="not(contains(@structure,'base:'))">
				<xsl:text>Custom </xsl:text>
				<xsl:element name="guilabel">
					<xsl:value-of select="@structure"/>
				</xsl:element>
			</xsl:if>
		</xsl:element>
		<xsl:element name="entry">
			<xsl:if test="contains(@returntype,'base:')">
				<xsl:element name="guilabel">
					<xsl:value-of select="../@base"/>
				</xsl:element>
				<xsl:text> standard </xsl:text>
				<xsl:element name="guilabel">
					<xsl:value-of select="substring-after(@returntype,'base:')"/>
				</xsl:element>

			</xsl:if>
			<xsl:if test="not(contains(@returntype,'base:'))">
				<xsl:text>Custom </xsl:text>
				<xsl:element name="guilabel">
					<xsl:value-of select="@returntype"/>
				</xsl:element>
			</xsl:if>
		</xsl:element>
	</xsl:element>
</xsl:template>


<!-- ........................................... RULE SETS ........................................ -->
<!--
|
|
| Template for the Rule Sets chapter
|
|
-->
<xsl:template match="Export" mode="rule_sets">

	<xsl:element name="chapter">

		<xsl:attribute name="id">
			<xsl:value-of select="$name" /><xsl:text>_Rules</xsl:text>
		</xsl:attribute>

		<xsl:element name="title">
			<xsl:text>Rule Sets</xsl:text>
		</xsl:element>


		<xsl:element name="para">
			<xsl:text>This section describes the business rules in the production.</xsl:text>
		</xsl:element>

		<xsl:element name="para">
			<xsl:element name="firstterm">
				<xsl:text>Business rules</xsl:text>
			</xsl:element>
			<xsl:text> allow non-technical users to program the behavior of business processes </xsl:text>
			<xsl:text>using a simple forms-based interface in the Management Portal. </xsl:text>
		</xsl:element>

		<xsl:element name="itemizedlist">
			<xsl:element name="listitem">
				<xsl:element name="para">
					<xsl:text>A </xsl:text>
					<xsl:element name="firstterm">
						<xsl:text>rule set</xsl:text>
					</xsl:element>
					<xsl:text> controls decision-making logic. It consists of a list of rules that are evaluated sequentially until one of them is found to be true. </xsl:text>
				</xsl:element>
			</xsl:element>
			<xsl:element name="listitem">
				<xsl:element name="para">
					<xsl:text>A </xsl:text>
					<xsl:element name="firstterm">
						<xsl:text>routing rule set</xsl:text>
					</xsl:element>
					<xsl:text> is a special-purpose rule set for message routing productions. </xsl:text>
					<xsl:text>The routing rule set determines the correct destination for each incoming document and decides how to transform the document prior to routing. </xsl:text>
				</xsl:element>
			</xsl:element>
		</xsl:element>

		<xsl:apply-templates select="ruleDefinition" mode="rule_sets" >
			<xsl:sort select="@class"/>
		</xsl:apply-templates>

	<!-- end chapter -->
	</xsl:element>

</xsl:template>


<!--
|
|
| Template for a chapter topic that describes one rule set; supports the Rule Sets chapter
|
|
-->
<xsl:template match="ruleDefinition" mode="rule_sets" >

	<xsl:element name="sect1">

		<xsl:attribute name="id">
			<xsl:value-of select="$name" /><xsl:text>_ruledefid_</xsl:text><xsl:number level="any"/>
		</xsl:attribute>

		<xsl:element name="title"> <!-- preprocessing inserts the class name into the @class attribute of <ruleDefinition> -->
			<xsl:choose>
				<xsl:when test="not(@class='')">
					<xsl:value-of select="@class" />
				</xsl:when>
				<xsl:otherwise>
					<xsl:text>Rule Definition </xsl:text>
					<xsl:value-of select="position()"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:element>
		
		<xsl:element name="informaltable">

			<xsl:call-template name="table_attributes" />

			<xsl:attribute name="id">
				<xsl:value-of select="$name" /><xsl:text>_ruledeftable_</xsl:text><xsl:value-of select="position()"/>
			</xsl:attribute>

			<xsl:element name="tgroup">

				<xsl:call-template name="rule_set_table_header" />
				<xsl:call-template name="two_column_settings_header" />

				<xsl:element name="tbody">
					<xsl:element name="row">
						<xsl:element name="entry">
							<xsl:element name="guilabel">
								<xsl:text>Type</xsl:text>
							</xsl:element>
						</xsl:element>
						<xsl:element name="entry">
							<xsl:choose> 
								<xsl:when test="contains(@context,'.MsgRouter.')">
									<xsl:text>Routing Rule</xsl:text>
								</xsl:when>
								<xsl:otherwise>
									<xsl:text>General Rule</xsl:text>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:element>
					</xsl:element>
					<xsl:element name="row">
						<xsl:element name="entry">
							<xsl:element name="guilabel">
								<xsl:text>Description</xsl:text>
							</xsl:element>
						</xsl:element>
						<xsl:element name="entry">
							<xsl:choose> 
								<xsl:when test="not(Description='')">
									<xsl:apply-templates select="Description" />
								</xsl:when>
								<xsl:otherwise>
									<xsl:text>(None)</xsl:text>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:element>
					</xsl:element>
					<xsl:element name="row">
						<xsl:element name="entry">
							<xsl:element name="guilabel">
								<xsl:text>Alias</xsl:text>
							</xsl:element>
						</xsl:element>
						<xsl:element name="entry">							
							<xsl:choose> 
								<xsl:when test="not(@alias='')">
									<xsl:value-of select="@alias" />
								</xsl:when>
								<xsl:otherwise>
									<xsl:text>(None)</xsl:text>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:element>
					</xsl:element>
					<xsl:element name="row">
						<xsl:element name="entry">
							<xsl:element name="guilabel">
								<xsl:text>Context Class</xsl:text>
							</xsl:element>
						</xsl:element>
						<xsl:element name="entry">
							<xsl:value-of select="@context" />
						</xsl:element>
					</xsl:element>
					<xsl:element name="row">
						<xsl:element name="entry">
							<xsl:element name="guilabel">
								<xsl:text>Number of Rule Sets</xsl:text>
							</xsl:element>
						</xsl:element>
						<xsl:element name="entry">
							<xsl:value-of select="count(child::ruleSet)" />
						</xsl:element>
					</xsl:element>
					<xsl:element name="row">
						<xsl:element name="entry">
							<xsl:element name="guilabel">
								<xsl:text>Total Number of Rules</xsl:text>
							</xsl:element>
						</xsl:element>
						<xsl:element name="entry">
							<xsl:value-of select="count(descendant::rule)" />
						</xsl:element>
					</xsl:element>
				</xsl:element>

			<!-- end tgroup -->
			</xsl:element>

		<!-- end table -->
		</xsl:element>

		<!--<xsl:apply-templates select="ruleSet" mode="rule_sets" />-->

	<!-- end sect1 -->
	</xsl:element>

</xsl:template>

<!--
|
|
| Simple template that outputs the description of a rule definition
|
|
-->

<xsl:template match="Description">
	<xsl:value-of select="." />
</xsl:template>

<!--
|
|
| Template for a 3-column table that describes a general business rule; supports the Rule Sets chapter and Data Transformations
|
|
-->
<xsl:template name="general_rule_table_header">
	<xsl:attribute name="cols">
		<xsl:text>3</xsl:text>
	</xsl:attribute>

	<xsl:element name="colspec">
		<xsl:attribute name="colname">
			<xsl:text>col1</xsl:text>
		</xsl:attribute>
		<xsl:attribute name="colwidth">
			<xsl:text>3.8in</xsl:text>
		</xsl:attribute>
	</xsl:element>

	<xsl:element name="colspec">
		<xsl:attribute name="colname">
			<xsl:text>col2</xsl:text>
		</xsl:attribute>
		<xsl:attribute name="colwidth">
			<xsl:text>1.4in</xsl:text>
		</xsl:attribute>
	</xsl:element>

	<xsl:element name="colspec">
		<xsl:attribute name="colname">
			<xsl:text>col3</xsl:text>
		</xsl:attribute>
		<xsl:attribute name="colwidth">
			<xsl:text>1.9in</xsl:text>
		</xsl:attribute>
	</xsl:element>


	<xsl:element name="thead">
		<xsl:element name="row">
			<xsl:element name="entry">
				<xsl:text>Test These Conditions</xsl:text>
			</xsl:element>
			<xsl:element name="entry">
				<xsl:text>If True, Do This</xsl:text>
			</xsl:element>
			<xsl:element name="entry">
				<xsl:text>Then Return This Value, and Stop</xsl:text>
			</xsl:element>
		</xsl:element>
	</xsl:element>
</xsl:template>


<!--
|
|
| Template for a two-column table with a narrow left column for describing rule sets
|
|
-->
<xsl:template name="rule_set_table_header" >
	<xsl:attribute name="cols">
		<xsl:text>2</xsl:text>
	</xsl:attribute>

	<xsl:element name="colspec">
		<xsl:attribute name="colname">
			<xsl:text>col1</xsl:text>
		</xsl:attribute>
		<xsl:attribute name="colwidth">
			<xsl:text>2.0in</xsl:text>
		</xsl:attribute>
	</xsl:element>

	<xsl:element name="colspec">
		<xsl:attribute name="colname">
			<xsl:text>col2</xsl:text>
		</xsl:attribute>
		<xsl:attribute name="colwidth">
			<xsl:text>5.1in</xsl:text>
		</xsl:attribute>
	</xsl:element>
</xsl:template>



<!-- ........................................ DATA TRANSFORMATIONS ................................. -->
<!--
|
|
| The detailed Data Transformations chapter lists every configuration setting in the production
|
|
-->
<xsl:template match="Export" mode="data_transformations">

	<xsl:element name="chapter">

		<xsl:attribute name="id">
			<xsl:value-of select="$name" /><xsl:text>_Xforms</xsl:text>
		</xsl:attribute>

		<xsl:element name="title">
			<xsl:text>Data Transformations</xsl:text>
		</xsl:element>

		<xsl:element name="para">
			<xsl:text>This section describes the data transformations used in the production. </xsl:text>
		</xsl:element>

		<xsl:apply-templates select="Document" mode="data_transformations" >
			<xsl:sort select="@name"/>
		</xsl:apply-templates>

	<!-- end chapter -->
	</xsl:element>

</xsl:template>



<!--
|
|
| Template for a chapter topic that describes one data transformation; supports the Data Transformations chapter
|
|
-->
<xsl:template match="Document" mode="data_transformations" >

	<xsl:element name="sect1">

		<xsl:attribute name="id">
			<xsl:value-of select="$name" /><xsl:text>_xform_</xsl:text><xsl:value-of select="position()"/>
		</xsl:attribute>

		<xsl:element name="title">
				<xsl:value-of select="@name"/>
		</xsl:element>

		<xsl:apply-templates select="transform" />

	<!-- end sect1 -->
	</xsl:element>

</xsl:template>

<!--
|
|
| Template that describes one data transformation; supports Ensemble 3.x DTL attributes as well as modern attributes
|
|
-->
<xsl:template match="transform">

	<xsl:element name="informaltable">

		<xsl:call-template name="table_attributes" />

		<xsl:element name="tgroup">

			<xsl:call-template name="rule_set_table_header" />
            <xsl:call-template name="two_column_settings_header" />

			<xsl:element name="tbody">
				<xsl:element name="row">
					<xsl:element name="entry">
						<xsl:element name="guilabel">
							<xsl:text>Source Message Class</xsl:text>
						</xsl:element>
					</xsl:element>
					<xsl:element name="entry">
						<xsl:value-of select="@sourceClass | @source" />
					</xsl:element>
				</xsl:element>
				<xsl:if test="@sourceDocType | @sourceType">
					<xsl:element name="row">
						<xsl:element name="entry">
							<xsl:element name="guilabel">
								<xsl:text>Source EDI Document Type</xsl:text>
							</xsl:element>
						</xsl:element>
						<xsl:element name="entry">
							<xsl:value-of select="@sourceDocType | @sourceType" />
						</xsl:element>
					</xsl:element>
				</xsl:if>
				<xsl:element name="row">
					<xsl:element name="entry">
						<xsl:element name="guilabel">
							<xsl:text>Target Message Class</xsl:text>
						</xsl:element>
					</xsl:element>
					<xsl:element name="entry">
						<xsl:value-of select="@targetClass | @target" />
					</xsl:element>
				</xsl:element>
				<xsl:if test="@targetDocType | @targetType">
					<xsl:element name="row">
						<xsl:element name="entry">
							<xsl:element name="guilabel">
								<xsl:text>Target EDI Document Type</xsl:text>
							</xsl:element>
						</xsl:element>
						<xsl:element name="entry">
							<xsl:value-of select="@targetDocType | @targetType" />
						</xsl:element>
					</xsl:element>
				</xsl:if>
				<xsl:element name="row">
					<xsl:element name="entry">
						<xsl:element name="guilabel">
							<xsl:text>Initial Action</xsl:text>
						</xsl:element>
					</xsl:element>
					<xsl:element name="entry">
						<xsl:choose>
							<xsl:when test="@create='new'">
								<xsl:text>Create a new object of the target type, </xsl:text>
								<xsl:text>before executing the data transformation. </xsl:text>
								<xsl:text>The data transformation explicitly sets the value of each field in the target message. </xsl:text>
							</xsl:when>
							<xsl:when test="@create='copy'">
								<xsl:text>Create a copy of the source object to use as the target object, </xsl:text>
								<xsl:text>before executing the data transformation.</xsl:text>
								<xsl:text>Any fields not explicitly set by the data transformation use these copied values. </xsl:text>
								<xsl:text>The source object is not overwritten. </xsl:text>
							</xsl:when>
							<xsl:when test="@create='existing'">
								<xsl:text>Use an existing object, </xsl:text>
								<xsl:text>provided by the caller of the data transformation, </xsl:text>
								<xsl:text>as the target object.</xsl:text>
								<xsl:text>The source object is overwritten by the data transformation. </xsl:text>
							</xsl:when>
							<xsl:otherwise>
								<xsl:text>Create a new object of the target type, </xsl:text>
								<xsl:text>before executing the data transformation.</xsl:text>
								<xsl:text>The data transformation explicitly sets the value of each field in the target message. </xsl:text>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:element>
				</xsl:element>
				<xsl:element name="row">
					<xsl:element name="entry">
						<xsl:element name="guilabel">
							<xsl:text>Scripting Language</xsl:text>
						</xsl:element>
					</xsl:element>
					<xsl:element name="entry">
						<xsl:choose>
							<xsl:when test="@language='objectscript'">
								<xsl:text>ObjectScript</xsl:text>
							</xsl:when>
							<xsl:when test="@language='basic'">
								<xsl:text>Basic</xsl:text>
							</xsl:when>
							<xsl:otherwise>
								<xsl:text>ObjectScript</xsl:text>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:element>
				</xsl:element>
			</xsl:element>

		<!-- end tgroup -->
		</xsl:element>

	 <!-- end table -->
	 </xsl:element>

</xsl:template>



<!-- ..................................... GENERIC BOOK PROCESSING ................................ -->
<!--
|
|
| Template for table styles
|
|
-->
<xsl:template name="table_attributes" >
	<xsl:attribute name="frame">
		<xsl:text>all</xsl:text>
	</xsl:attribute>
	<xsl:attribute name="tabstyle">
		<xsl:text>break</xsl:text>
	</xsl:attribute>
</xsl:template>


<!--
|
|
| Template for a table with two equal columns
|
|
-->
<xsl:template name="two_equal_columns_table" >
	<xsl:attribute name="cols">
		<xsl:text>2</xsl:text>
	</xsl:attribute>

	<xsl:element name="colspec">
		<xsl:attribute name="colname">
			<xsl:text>col1</xsl:text>
		</xsl:attribute>
		<xsl:attribute name="colwidth">
			<xsl:text>3.55in</xsl:text>
		</xsl:attribute>
	</xsl:element>

	<xsl:element name="colspec">
		<xsl:attribute name="colname">
			<xsl:text>col2</xsl:text>
		</xsl:attribute>
		<xsl:attribute name="colwidth">
			<xsl:text>3.55in</xsl:text>
		</xsl:attribute>
	</xsl:element>
</xsl:template>


<!--
|
|
| When long package, class, or path names do not fit - all-purpose handling without using the nice new XSLT 2.0 features
|
|
-->
<xsl:template name="break_up_string">
	<xsl:param name="INPUT" />
	<xsl:if test="contains($INPUT,',')" >
		<xsl:call-template name="break_up_string_with" >
			<xsl:with-param name="MYSTRING" select="$INPUT"/>
			<xsl:with-param name="SEPARATOR" select="','"/>
			<xsl:with-param name="MARKER" select="','"/>
		</xsl:call-template>
	</xsl:if>
	<xsl:if test="not(contains($INPUT,','))" >
		<xsl:if test="contains($INPUT,'\')" >
			<xsl:call-template name="break_up_string_with" >
				<xsl:with-param name="MYSTRING" select="$INPUT"/>
				<xsl:with-param name="SEPARATOR" select="'\'"/>
				<xsl:with-param name="MARKER" select="'\'"/>
			</xsl:call-template>
		</xsl:if>
		<xsl:if test="not(contains($INPUT,'\'))" >
			<xsl:if test="contains($INPUT,'/')" >
				<xsl:call-template name="break_up_string_with" >
					<xsl:with-param name="MYSTRING" select="$INPUT"/>
					<xsl:with-param name="SEPARATOR" select="'/'"/>
					<xsl:with-param name="MARKER" select="'/'"/>
				</xsl:call-template>
			</xsl:if>
			<xsl:if test="not(contains($INPUT,'/'))" >
				<xsl:if test="contains($INPUT,'.')" >
					<xsl:call-template name="break_up_string_with" >
						<xsl:with-param name="MYSTRING" select="$INPUT"/>
						<xsl:with-param name="SEPARATOR" select="'.'"/>
						<xsl:with-param name="MARKER" select="'.'"/>
					</xsl:call-template>
				</xsl:if>
				<xsl:if test="not(contains($INPUT,'.'))" >
					<xsl:value-of select="$INPUT" />
				</xsl:if>
			</xsl:if>
		</xsl:if>
	</xsl:if>
</xsl:template>


<!--
|
|
| When long package, class, or path names do not fit - individual handling without using the nice new XSLT 2.0 features
|
|
-->
<xsl:template name="break_up_string_with">
	<xsl:param name="MYSTRING" />
	<xsl:param name="SEPARATOR" />
	<xsl:param name="MARKER" />

	<xsl:if test="contains($MYSTRING,$SEPARATOR)" >
		<xsl:value-of select="substring-before($MYSTRING,$SEPARATOR)"/>
		<xsl:value-of select="$MARKER"/>
		<xsl:text> </xsl:text>

		<xsl:variable name="PIECE2" select="substring-after($MYSTRING,$SEPARATOR)" />
		<xsl:if test="contains($PIECE2,$SEPARATOR)" >
			<xsl:value-of select="substring-before($PIECE2,$SEPARATOR)"/>
			<xsl:value-of select="$MARKER"/>
			<xsl:text> </xsl:text>

			<xsl:variable name="PIECE3" select="substring-after($PIECE2,$SEPARATOR)" />
			<xsl:if test="contains($PIECE3,$SEPARATOR)" >
				<xsl:value-of select="substring-before($PIECE3,$SEPARATOR)"/>
				<xsl:value-of select="$MARKER"/>
				<xsl:text> </xsl:text>

				<xsl:variable name="PIECE4" select="substring-after($PIECE3,$SEPARATOR)" />
				<xsl:if test="contains($PIECE4,$SEPARATOR)" >
					<xsl:value-of select="substring-before($PIECE4,$SEPARATOR)"/>
					<xsl:value-of select="$MARKER"/>
					<xsl:text> </xsl:text>

					<xsl:variable name="PIECE5" select="substring-after($PIECE4,$SEPARATOR)" />
					<xsl:if test="contains($PIECE5,$SEPARATOR)" >
						<xsl:value-of select="substring-before($PIECE5,$SEPARATOR)"/>
						<xsl:value-of select="$MARKER"/>
						<xsl:text> </xsl:text>

						<xsl:variable name="PIECE6" select="substring-after($PIECE5,$SEPARATOR)" />
						<xsl:if test="contains($PIECE6,$SEPARATOR)" >
							<xsl:value-of select="substring-before($PIECE6,$SEPARATOR)"/>
							<xsl:value-of select="$MARKER"/>
							<xsl:text> </xsl:text>

							<xsl:variable name="PIECE7" select="substring-after($PIECE6,$SEPARATOR)" />
							<xsl:if test="contains($PIECE7,$SEPARATOR)" >
								<xsl:value-of select="substring-before($PIECE7,$SEPARATOR)"/>
								<xsl:value-of select="$MARKER"/>
								<xsl:text> </xsl:text>

								<xsl:variable name="PIECE8" select="substring-after($PIECE7,$SEPARATOR)" />
								<xsl:if test="contains($PIECE8,$SEPARATOR)" >
									<xsl:value-of select="substring-before($PIECE8,$SEPARATOR)"/>
									<xsl:value-of select="$MARKER"/>
									<xsl:text> </xsl:text>

									<xsl:variable name="PIECE9" select="substring-after($PIECE8,$SEPARATOR)" />
									<xsl:if test="contains($PIECE9,$SEPARATOR)" >
										<xsl:value-of select="substring-before($PIECE9,$SEPARATOR)"/>
										<xsl:value-of select="$MARKER"/>
										<xsl:text> </xsl:text>

										<xsl:value-of select="substring-after($PIECE9,$SEPARATOR)" />

									</xsl:if>
									<xsl:if test="not(contains($PIECE9,$SEPARATOR))" >
										<xsl:value-of select="$PIECE9"/>
									</xsl:if>

								</xsl:if>
								<xsl:if test="not(contains($PIECE8,$SEPARATOR))" >
									<xsl:value-of select="$PIECE8"/>
								</xsl:if>
							</xsl:if>
							<xsl:if test="not(contains($PIECE7,$SEPARATOR))" >
								<xsl:value-of select="$PIECE7"/>
							</xsl:if>
						</xsl:if>
						<xsl:if test="not(contains($PIECE6,$SEPARATOR))" >
							<xsl:value-of select="$PIECE6"/>
						</xsl:if>
					</xsl:if>
					<xsl:if test="not(contains($PIECE5,$SEPARATOR))" >
						<xsl:value-of select="$PIECE5"/>
					</xsl:if>
				</xsl:if>
				<xsl:if test="not(contains($PIECE4,$SEPARATOR))" >
					<xsl:value-of select="$PIECE4"/>
				</xsl:if>
			</xsl:if>
			<xsl:if test="not(contains($PIECE3,$SEPARATOR))" >
				<xsl:value-of select="$PIECE3"/>
			</xsl:if>
		</xsl:if>
		<xsl:if test="not(contains($PIECE2,$SEPARATOR))" >
			<xsl:value-of select="$PIECE2"/>
		</xsl:if>
	</xsl:if>
	<xsl:if test="not(contains($MYSTRING,$SEPARATOR))" >
		<xsl:value-of select="$MYSTRING" />
	</xsl:if>
</xsl:template>



<!-- ...................................... EXCLUDE ALL ELSE ...................................... -->
<xsl:template match="*"/>

</xsl:stylesheet>