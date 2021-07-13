<xsl:stylesheet version = "1.0" xmlns:xsl = "http://www.w3.org/1999/XSL/Transform"> 

    <xsl:key name="personid" match="Frau|Mann" use="@id"/>

    <xsl:template match = "/familie">
        <html>
            <head>
                <meta http-equiv="content-type" content="text/html; charset=utf-8" />
                <link rel="stylesheet" href="styles/styles.css" type="text/css" />
                <link rel="stylesheet" href="styles/modalStyle.css" type="text/css" />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"/>

                <link rel="stylesheet" href="styles/stammbaum.css" type="text/css" />
            </head>
            <body style="text-align: center">



 <h2>Modal Example</h2>

  <!-- Trigger/Open The Modal -->




  <!-- The Modal -->
  <div id="myModal" class="modal">

    <!-- Modal content -->
    <div class="modal-content">
    <span class="close">&#xd7;</span>
      <div class="modalGrid">
        <div class="div1">
          <h1>Name, Nachname</h1>
          <form id="newPersonModal">
            <label for="firstName">Vorname:</label>
            <input type="text" id="firstName" name="firstName"></input>
            <br></br>
            <label for="familyName">Nachname:</label>
            <input type="text" id="familyName" name="familyName"></input>
          </form>
        </div>
        <div class="div2">
          <h1>Mutter, Vater, Ehepartner</h1>

          <label for="mother">Wählen Sie die Mutter aus:</label>
          <select name="mother" id="mother" form="newPersonModal">
            <option value="unknown"> ? </option>
            <option value="xxxx">xxxx</option>
          </select>
          <br></br>
          <label for="father">Wählen Sie den Vater aus:</label>
          <select name="father" id="father" form="newPersonModal">
            <option value="unknown"> ? </option>
            <option value="xxxx">xxxx</option>
          </select>
          <br></br>
          <label for="spouse">Wählen Sie den Ehepartner aus:</label>
          <select name="spouse" id="spouse" form="newPersonModal">
            <option value="none">-</option>
            <option value="xxxx">xxxx</option>
          </select>

        </div>
        <div class="div3">
          <h1>Geburtsort, Geburtsdatum, Todesdatum</h1>
          <label for="birthPlace">Geburtsort:</label>
          <input type="text" id="birthPlace" name="birthPlace" form="newPersonModal"></input>
          <br></br>
          <label for="birthdate">Geburtsdatum:</label>
          <input type="date" id="birthdate" name="birthdate"></input>
          <br></br>
          <label for="deathDate">Todesdatum:</label>
          <input type="date" id="deathDate" name="deathDate"></input>

        </div>
      </div>

    </div>

  </div>





                <header>
                    <ul class="navbar">
                        <li>
                            <a class="active" href="index.html">Home</a>
                        </li>
                        <li>
                            <a href="stammbaum.xml">Stammbaum</a>
                        </li>
                        <li style="float: right">
                            <a href="stammbaum.xml">Platzhalter Option Icon</a>
                        </li>
                    </ul>
                </header>
                <div class="body">
                    <h2>Family Tree</h2>
                    <div class="resizecontainer">
                        <div class="resize">
                            <xsl:for-each select = "generation">
                                <xsl:for-each select = "//generation">
                                    <xsl:for-each select = "Frau|Mann">
                                        <div class="content" style="top: 300px; left:100px;"> 
                                            <xsl:attribute name="data-vorname"><xsl:value-of select="@vorname"/></xsl:attribute>
                                            <xsl:attribute name="data-nachname"><xsl:value-of select="@nachname"/></xsl:attribute>
                                            <xsl:attribute name="data-geburtsdatum"><xsl:value-of select="@geburtsdatum"/></xsl:attribute>
                                            <xsl:attribute name="data-geburtsort"><xsl:value-of select="@geburtsort"/></xsl:attribute>
                                            <xsl:attribute name="data-todesdatum"><xsl:value-of select="@todesdatum"/></xsl:attribute>
                                            <xsl:attribute name="data-ehepartner"><xsl:value-of select="@ehepartner"/></xsl:attribute>
                                            <xsl:attribute name="data-mutter"><xsl:value-of select="@mutter"/></xsl:attribute>
                                            <xsl:attribute name="data-vater"><xsl:value-of select="@vater"/></xsl:attribute>
                                            <xsl:attribute name="data-id"><xsl:value-of select="@id"/></xsl:attribute>
                                            <xsl:attribute name="data-familyId"><xsl:value-of select="@familyId"/></xsl:attribute>
                                            
                                            <div class="contentholder">
                                                <xsl:value-of select="@vorname"/>
                                                <xsl:text> </xsl:text>
                                                <xsl:value-of select="@nachname"/>
                                                <div class="additionalinfo">
                                                    <div class="additionalinfo-header">
                                                        <xsl:value-of select="@vorname"/>
                                                        <xsl:text> </xsl:text>
                                                        <xsl:value-of select="@nachname"/>
                                                    </div>
                                                    <div class="additionalinfo-body">
                                                        <xsl:variable name="ehepartnerindex" select="@ehepartner"/>
                                                        <xsl:variable name="mutterindex" select="@mutter"/>
                                                        <xsl:variable name="vaterindex" select="@vater"/>
                                                        <b>Geb: <xsl:value-of select="@geburtsdatum" /></b><br/>
                                                        <b>Ort: <xsl:value-of select="@geburtsort" /></b><br/>
                                                        <b>Tod: <xsl:value-of select="@todesdatum" /></b><br/>
                                                        <b>Ehepartner: 
                                                            <xsl:choose>
                                                                <xsl:when test="@ehepartner=''">
                                                                    <xsl:text> </xsl:text>
                                                                </xsl:when>
                                                                <xsl:otherwise>
                                                                    <xsl:for-each select="key('personid', @ehepartner)">
                                                                        <xsl:value-of select="@vorname"/>
                                                                        <xsl:text> </xsl:text>
                                                                        <xsl:value-of select="@nachname"/>
                                                                    </xsl:for-each>
                                                                </xsl:otherwise>
                                                            </xsl:choose>
                                                        </b><br/>
                                                        <b>Mutter:  
                                                            <xsl:choose>
                                                                <xsl:when test="@mutter=''">
                                                                    <xsl:text> </xsl:text>
                                                                </xsl:when>
                                                                <xsl:otherwise>
                                                                    <xsl:for-each select="key('personid', @mutter)">
                                                                        <xsl:value-of select="@vorname"/>
                                                                        <xsl:text> </xsl:text>
                                                                        <xsl:value-of select="@nachname"/>
                                                                    </xsl:for-each>
                                                                </xsl:otherwise>
                                                            </xsl:choose>
                                                        </b><br/>
                                                        <b>Vater: 
                                                            <xsl:choose>
                                                                <xsl:when test="@vater=''">
                                                                    <xsl:text> </xsl:text>
                                                                </xsl:when>
                                                                <xsl:otherwise>
                                                                    <xsl:for-each select="key('personid', @vater)">
                                                                        <xsl:value-of select="@vorname"/>
                                                                        <xsl:text> </xsl:text>
                                                                        <xsl:value-of select="@nachname"/>
                                                                    </xsl:for-each>
                                                                </xsl:otherwise>
                                                            </xsl:choose>
                                                        </b><br/>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </xsl:for-each>
                                </xsl:for-each>
                            </xsl:for-each>
                        </div>
                    </div>
                    <script src="scripts/resizelogic.js"></script>
                    <script src="scripts/modalButton.js"></script>
                    <script src="scripts/get_input.js"></script>
                </div>
                
                <button type="button" id="myBtn">Click Me!</button>
                <button type="button" id="conf">Click Me!</button>

                


                <footer>
                    <div class="footer-container">
                        <div class="contact">
                        <b>Kontakt</b>
                        <br />
                        <br />
                        Fantasiestraße. 15
                        <br />
                        Karlsruhe
                        </div>
                        <div class="team">
                        <b>Entwickler</b>
                        <br />
                        <br />
                        Florian Braun <br />
                        Timo Maier <br />
                        Marius Seewald <br />
                        Lukas Jaedicke <br />
                        Florian Kloss
                        </div>
                        <div class="stammbaum">
                        <b>Stammbaum</b>
                        <br />
                        <br />
                        Hier gehts zum <a href="stammbaum.xml">Stammbaum</a>
                        </div>
                    </div>
                    <div class="copyright">
                        Copyright 2021 | <a href="impressum.html">Impressum</a>
                    </div>
                </footer>
                
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>