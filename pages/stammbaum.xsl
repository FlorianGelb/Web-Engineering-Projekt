<xsl:stylesheet version = "1.0" xmlns:xsl = "http://www.w3.org/1999/XSL/Transform"> 

    <xsl:key name="personid" match="Person" use="@id"/>

    <xsl:template match = "/stammbaum">
        <html>
            <head>
                   <meta http-equiv="content-type" content="text/html; charset=utf-8" />
                <link rel="stylesheet" href="styles/styles.css" type="text/css" />
                <link rel="stylesheet" href="styles/modalStyle.css" type="text/css" />
               <script language="javascript" type="text/javascript" src="scripts/templates.js"></script>

                <link rel="stylesheet" href="styles/stammbaum.css" type="text/css" />
            </head>
            <body style="text-align: center">

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
            <br></br>
            <select id="Geschlecht">
            <option value="männlich">Männlich</option>
            <option value="weiblich">Weiblich</option>
</select>
          </form>
        </div>
        <div class="div2">
          <h1>Mutter, Vater, Ehepartner</h1>

          <label for="mother">Wählen Sie die Mutter aus:</label>
          <select name="mother" id="mother" form="newPersonModal">
            <option value="unknown"> ? </option>
            <xsl:for-each select = "//Person">
            <xsl:if test="@geschlecht = 'weiblich'">
             <option>
              <xsl:attribute name="value"><xsl:value-of select="@id"/></xsl:attribute>
              <xsl:value-of select="@vorname"/>
              <xsl:text>&#xa;</xsl:text>
              <xsl:value-of select="@nachname"/>
              </option>
              </xsl:if>
              </xsl:for-each>
          </select>
          <br></br>
          <label for="father">Wählen Sie den Vater aus:</label>
          <select name="father" id="father" form="newPersonModal">
            <option value="unknown"> ? </option>
            <xsl:for-each select = "//Person">
            <xsl:if test="@geschlecht = 'männlich'">
             <option>
              <xsl:attribute name="value"><xsl:value-of select="@id"/></xsl:attribute>
              <xsl:value-of select="@vorname"/>
              <xsl:text>&#xa;</xsl:text>
              <xsl:value-of select="@nachname"/>
              </option>
              </xsl:if>
              </xsl:for-each>
          </select>
          <br></br>
          <label for="spouse">Wählen Sie den Ehepartner aus:</label>
          <select name="spouse" id="spouse" form="newPersonModal">
            <option value="none">-</option>
            <xsl:for-each select = "//Person">
             <option>
              <xsl:attribute name="value"><xsl:value-of select="@id"/></xsl:attribute>
              <xsl:value-of select="@vorname"/>
              <xsl:text>&#xa;</xsl:text>
              <xsl:value-of select="@nachname"/>
              </option>
              </xsl:for-each>
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
          <button id="bst">Bestätigen</button>
        </div>
      </div>

    </div>

  </div>

 <header>
                      <div id="templateNav" class="navbar">
        <a class="active" href="index.html" id="templateActive">Home</a>
        <a href="stammbaum.xml">Stammbaum</a>
        <div class="dropdown" style="float: right;">
           <button class="dropbtn" id="dropbtn">Templates 
        </button>
          <div class="dropdown-content">           
              <a class="ddc" onclick="greyTheme()">Wolken</a>
            <a class="ddc" onclick="seaTheme()">Strand</a>
            <a class="ddc" onclick="brownTheme()">Holz</a>
            <a class="ddc" onclick="blackGreenTheme()">Standart</a>
          </div>
        </div>
      </div>
                </header>
                <div class="body">
                    <h2>Family Tree</h2>
                    <div class="resizecontainer">
                        <div class="resize">
                            <xsl:for-each select = "Person">
                                        <div class="content" style="top: 300px; left:100px;"> 
                                            <xsl:attribute name="data-geschlecht"><xsl:value-of select="@geschlecht"/></xsl:attribute>
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
                                                <div class="contenttextholder">
                                                    <xsl:value-of select="@vorname"/>
                                                    <xsl:text> </xsl:text>
                                                    <xsl:value-of select="@nachname"/>
                                                </div>
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
                        </div>
                    </div>
                </div>

    <div>
    <div class="modal-content">
      <div class="modalGrid">
        <div class="div1">
          <h1>Name, Nachname</h1>
          <form id="newPersonModal">
            <label for="firstName">Vorname:</label>
            <input type="text" id="firstName1" name="firstName"></input>
            <br></br>
            <label for="familyName">Nachname:</label>
            <input type="text" id="familyName1" name="familyName"></input>
          </form>
        </div>
        <div class="div2">
          <h1>Mutter, Vater, Ehepartner</h1>

          <label for="mother">Wählen Sie die Mutter aus:</label>
          <select name="mother" id="mother1" form="newPersonModal">
            <option value="unknown"> ? </option>
            <xsl:for-each select = "//Person">
            <xsl:if test="@geschlecht = 'weiblich'">
             <option>
              <xsl:attribute name="value"><xsl:value-of select="@id"/></xsl:attribute>
              <xsl:value-of select="@vorname"/>
              <xsl:text>&#xa;</xsl:text>
              <xsl:value-of select="@nachname"/>
              </option>
              </xsl:if>
              </xsl:for-each>
          </select>
          <br></br>
          <label for="father">Wählen Sie den Vater aus:</label>
          <select name="father" id="father1" form="newPersonModal">
            <option value="unknown"> ? </option>
            <xsl:for-each select = "//Person">
            <xsl:if test="@geschlecht = 'männlich'">
             <option>
              <xsl:attribute name="value"><xsl:value-of select="@id"/></xsl:attribute>
              <xsl:value-of select="@vorname"/>
              <xsl:text>&#xa;</xsl:text>
              <xsl:value-of select="@nachname"/>
              </option>
              </xsl:if>
              </xsl:for-each>
          </select>
          <br></br>
          <label for="spouse">Wählen Sie den Ehepartner aus:</label>
          <select name="spouse" id="spouse1" form="newPersonModal">
            <option value="none">-</option>
            <xsl:for-each select = "//Person">
             <option>
              <xsl:attribute name="value"><xsl:value-of select="@id"/></xsl:attribute>
              <xsl:value-of select="@vorname"/>
              <xsl:text>&#xa;</xsl:text>
              <xsl:value-of select="@nachname"/>
              </option>
              </xsl:for-each>
          </select>
        </div>
        <div class="div3">
          <h1>Geburtsort, Geburtsdatum, Todesdatum</h1>
          <label for="birthPlace">Geburtsort:</label>
          <input type="text" id="birthPlace1" name="birthPlace" form="newPersonModal"></input>
          <br></br>
          <label for="birthdate">Geburtsdatum:</label>
          <input type="date" id="birthdate1" name="birthdate"></input>
          <br></br>
          <label for="deathDate">Todesdatum:</label>
          <input type="date" id="deathDate1" name="deathDate"></input>

        </div>
      </div>

    </div>

  </div>

  <div>
    <div class="modal-content">
      <div class="modalGrid">
        <div class="div1">
          <h1>Name, Nachname</h1>
          <form id="newPersonModal">
            <label for="firstName">Vorname:</label>
            <input type="text" id="firstName2" name="firstName"></input>
            <br></br>
            <label for="familyName">Nachname:</label>
            <input type="text" id="familyName2" name="familyName"></input>
          </form>
        </div>
        <div class="div2">
          <h1>Mutter, Vater, Ehepartner</h1>

          <label for="mother">Wählen Sie die Mutter aus:</label>
          <select name="mother" id="mother2" form="newPersonModal">
            <option value="unknown"> ? </option>
            <xsl:for-each select = "//Person">
            <xsl:if test="@geschlecht = 'weiblich'">
             <option>
              <xsl:attribute name="value"><xsl:value-of select="@id"/></xsl:attribute>
              <xsl:value-of select="@vorname"/>
              <xsl:text>&#xa;</xsl:text>
              <xsl:value-of select="@nachname"/>
              </option>
              </xsl:if>
              </xsl:for-each>
          </select>
          <br></br>
          <label for="father">Wählen Sie den Vater aus:</label>
          <select name="father" id="father2" form="newPersonModal">
            <option value="unknown"> ? </option>
            <xsl:for-each select = "//Person">
            <xsl:if test="@geschlecht = 'männlich'">
             <option>
              <xsl:attribute name="value"><xsl:value-of select="@id"/></xsl:attribute>
              <xsl:value-of select="@vorname"/>
              <xsl:text>&#xa;</xsl:text>
              <xsl:value-of select="@nachname"/>
              </option>
              </xsl:if>
              </xsl:for-each>
          </select>
          <br></br>
          <label for="spouse">Wählen Sie den Ehepartner aus:</label>
          <select name="spouse" id="spouse2" form="newPersonModal">
            <option value="none">-</option>
            <xsl:for-each select = "//Person">
             <option>
              <xsl:attribute name="value"><xsl:value-of select="@id"/></xsl:attribute>
              <xsl:value-of select="@vorname"/>
              <xsl:text>&#xa;</xsl:text>
              <xsl:value-of select="@nachname"/>
              </option>
              </xsl:for-each>
          </select>

        </div>
        <div class="div3">
          <h1>Geburtsort, Geburtsdatum, Todesdatum</h1>
          <label for="birthPlace">Geburtsort:</label>
          <input type="text" id="birthPlace2" name="birthPlace" form="newPersonModal"></input>
          <br></br>
          <label for="birthdate">Geburtsdatum:</label>
          <input type="date" id="birthdate2" name="birthdate"></input>
          <br></br>
          <label for="deathDate">Todesdatum:</label>
          <input type="date" id="deathDate2" name="deathDate"></input>

        </div>
      </div>

    </div>

  </div>
                
                <button type="button" id="myBtn">Person hinzufügen</button>
                <button type="button" id="conf">Bestätigen</button>

                


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
                    <script src="scripts/person.js"></script>
                    <script src="scripts/relationships.js"></script>
                    <script src="scripts/resizelogic.js"></script>
                    <script src="scripts/get_input.js"></script>
                    <script src="scripts/modalButton.js"></script>
                    <script src="scripts/fittext.js"></script>
        </html>
    </xsl:template>
</xsl:stylesheet>