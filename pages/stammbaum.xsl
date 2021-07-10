<xsl:stylesheet version = "1.0" 
xmlns:xsl = "http://www.w3.org/1999/XSL/Transform"> 

<xsl:template match = "/familie">

	<html>

<head id="head">
    </head>

		<body style="text-align: center">

<header>
		<ul class="navbar">
		  <li><a class="active" href="index.html">Home</a></li>
		  <li><a href="stammbaum.xml">Stammbaum</a></li>
		  <li style="float: right">
			<a href="stammbaum.html">Platzhalter Option Icon</a>
		  </li>
		</ul>
	  </header>

        <script>
        var info = function(x) {
           var main = document.getElementById(x);
           var mid = main.getAttribute("data-Mutter");
           var mutter = document.getElementById(mid);
           if (mutter != null){
           mutter.setAttribute("data-MutterName", main.getAttribute("data-Name"));
           }
           alert(main.innerHTML);
        }
        </script>

			<h2>Family Tree</h2>

	<xsl:for-each select = "generation">

      <p> test </p>
       <div class="parent">
        <div class="container">
            <div class="resize">
        <div class="content" id="elements">
            <xsl:for-each select = "//generation">
            <xsl:for-each select = "Frau">
                <xsl:value-of select="@vorname"/>&#160;
                <button type="button"> 
                <xsl:attribute name="onclick">info(<xsl:value-of select="@id"/>)</xsl:attribute>
                <xsl:value-of select="@vorname"/><b>&#160; <xsl:value-of select="@nachname" /></b>
                 </button>
                 <b title="verheiratet oder so"> - </b>

                <div style="visibility:hidden; width=0px; height=0px; top=0; right=0;">
                    <xsl:attribute name="id"><xsl:value-of select="@id"/> </xsl:attribute>
                    Geb: <xsl:value-of select="@geburtsdatum" />&#8203;
                    Ort: <xsl:value-of select="@geburtsort" />&#8203;
                    Tod: <xsl:value-of select="@todesdatum" />&#8203;
                    Ehepartner: <xsl:value-of select="@ehepartner" />&#8203;
                    Mutter: <xsl:value-of select="@mutter" />&#8203;
                    Vater: <xsl:value-of select="@vater" />
                </div>
              </xsl:for-each>
                        
                 <xsl:for-each select = "Mann">
                <xsl:value-of select="@vorname"/>&#160;
                <button type="button">
                <xsl:attribute name="onclick">info(<xsl:value-of select="@id"/>)</xsl:attribute> 
                <xsl:value-of select="@vorname"/><b>&#160; <xsl:value-of select="@nachname" /></b>
                 </button>
                <div style="visibility:hidden; width=0px; height=0px;">
                <xsl:attribute name="id"><xsl:value-of select="@id"/> </xsl:attribute>
                 <xsl:attribute name="data-Name"><xsl:value-of select="@vorname"/> </xsl:attribute>
                <xsl:attribute name="data-Mutter"><xsl:value-of select="@mutter"/> </xsl:attribute>
                <xsl:attribute name="data-MutterName"> " " </xsl:attribute>
                <xsl:attribute name="data-Vater"><xsl:value-of select="@vater"/> </xsl:attribute>
                <xsl:attribute name="data-Ehe"><xsl:value-of select="@ehepartner"/> </xsl:attribute>
                Geb: <xsl:value-of select="@geburtsdatum" />&#8203;
                Ort: <xsl:value-of select="@geburtsort" />&#8203;
                Tod: <xsl:value-of select="@todesdatum" />&#8203;
                Ehepartner: <xsl:value-of select="@ehepartner" />  &#8203;
                Mutter:  &#8203;
                Vater: <xsl:value-of select="@vater" />

                </div>
              
              </xsl:for-each>
            </xsl:for-each>
        </div>
      </div>
      </div>
      </div>

    </xsl:for-each>


    <div id="person 1"></div>
    <div id="person 2"></div>

		
<button id="myBtn">Open Modal</button>
<button id="conf">Confirm</button>
			<script src="modalButton.js"></script>
      <script src="resizelogic.js"></script>
      <script src="test.js"></script>
      <script src="get_input.js"></script>
      
		</body>
    </html>
</xsl:template>
</xsl:stylesheet>