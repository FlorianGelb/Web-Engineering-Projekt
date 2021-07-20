<xsl:stylesheet version = "1.0" 
xmlns:xsl = "http://www.w3.org/1999/XSL/Transform"> 


<xsl:template match="generation">

        
	<html>
		<body style="text-align: center">
        <script>
        var info = function(x) {
           var main = document.getElementById(x);
           alert(main.innerHTML);
        }
        </script>


            <div>
            <xsl:for-each select = "Frau">
            <button type="button"> 
            <xsl:attribute name="onclick">info(<xsl:value-of select="@id"/>)</xsl:attribute>
            <xsl:value-of select="@vorname"/><b>&#160; <xsl:value-of select="@nachname" /></b>
          </button>
            </xsl:for-each>

            <b title="verheiratet oder so"> - </b>

             <xsl:for-each select = "Mann">
            <button type="button"> 
            <xsl:attribute name="onclick">info(<xsl:value-of select="@id"/>)</xsl:attribute>
            <xsl:value-of select="@vorname" /><b>&#160;   <xsl:value-of select="@nachname" /></b>
             </button>
            </xsl:for-each>

          
          </div>


            <xsl:for-each select = "Mann">
                <xsl:value-of select="@vorname"/>&#160;
            </xsl:for-each>

            <xsl:for-each select = "Frau">
                <xsl:value-of select="@vorname"/>&#160;
            </xsl:for-each>



				<xsl:if test="generation">
				<xsl:apply-templates select="generation" />
				</xsl:if>


        
        <xsl:for-each select = "Mann">
            <div style="visibility:hidden; width=0px; height=0px;">
            <xsl:attribute name="id"><xsl:value-of select="@id"/> </xsl:attribute>
            Geb: <xsl:value-of select="@geburtsdatum" />&#8203;
            Ort: <xsl:value-of select="@geburtsort" />&#8203;
            Tod: <xsl:value-of select="@todesdatum" />&#8203;
            Ehepartner: <xsl:value-of select="@ehepartner" />&#8203;
            Mutter: <xsl:value-of select="@mutter" />&#8203;
            Vater: <xsl:value-of select="@vater" />
            </div>
            </xsl:for-each>

             <xsl:for-each select = "Frau">
            <div style="visibility:hidden; width=0px; height=0px;">
            <xsl:attribute name="id"><xsl:value-of select="@id"/> </xsl:attribute>
            Geb: <xsl:value-of select="@geburtsdatum" />&#8203;
            Ort: <xsl:value-of select="@geburtsort" />&#8203;
            Tod: <xsl:value-of select="@todesdatum" />&#8203;
            Ehepartner: <xsl:value-of select="@ehepartner" />&#8203;
            Mutter: <xsl:value-of select="@mutter" />&#8203;
            Vater: <xsl:value-of select="@vater" />
            </div>
            </xsl:for-each>
        

   

	</body>
    </html>
</xsl:template>
</xsl:stylesheet>