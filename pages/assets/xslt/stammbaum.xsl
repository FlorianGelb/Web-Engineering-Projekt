<xsl:stylesheet version = "1.0" 
xmlns:xsl = "http://www.w3.org/1999/XSL/Transform"> 

<xsl:template match = "/familie">

	<html>
		<body style="text-align: center">
        <script>
        var info = function(x) {
           var main = document.getElementById(x);
           alert(main.innerHTML);
        }
        </script>

			<h2>Family Tree</h2>

	<xsl:for-each select = "generation">

            <div>
             <button type="button" onclick="info('frau')"> 
            <xsl:value-of select="Frau/@vorname"/><b>&#160; <xsl:value-of select="Frau/@nachname" /></b>
          </button>
            <b title="verheiratet oder so"> - </b>
          <button type="button" onclick="info('mann')"> 
            <xsl:value-of select="Mann/@vorname" /><b>&#160;   <xsl:value-of select="Mann/@nachname" /></b>
             </button>
          </div>

        <div>
            <xsl:for-each select = "generation">
                <xsl:value-of select="Frau/@vorname"/>&#160;
                <xsl:value-of select="Mann/@vorname"/>
            </xsl:for-each>
        </div>
        <div>
            <xsl:for-each select = "generation/generation">
                <xsl:value-of select="Frau/@vorname"/>&#160;
                <xsl:value-of select="Mann/@vorname"/>
          
            </xsl:for-each>
        </div>

        <div id="frau" style="visibility:hidden; width=0px; height=0px;">
            Geb: <xsl:value-of select="Frau/@geburtsdatum" />&#8203;
            Ort: <xsl:value-of select="Frau/@geburtsort" />&#8203;
            Tod: <xsl:value-of select="Frau/@todesdatum" />&#8203;
            Ehepartner: <xsl:value-of select="Frau/@ehepartner" />&#8203;
            Mutter: <xsl:value-of select="Frau/@mutter" />&#8203;
            Vater: <xsl:value-of select="Frau/@vater" />
        </div>
        <div id="mann" style="visibility:hidden; width=0px; height=0px;">
            Geb: <xsl:value-of select="Mann/@geburtsdatum" />&#8203;
            Ort: <xsl:value-of select="Mann/@geburtsort" />&#8203;
            Tod: <xsl:value-of select="Mann/@todesdatum" />&#8203;
            Ehepartner: <xsl:value-of select="Mann/@ehepartner" />&#8203;
            Mutter: <xsl:value-of select="Mann/@mutter" />&#8203;
            Vater: <xsl:value-of select="Mann/@vater" />
        </div>

    </xsl:for-each>

		
		</body>
    </html>
</xsl:template>
</xsl:stylesheet>