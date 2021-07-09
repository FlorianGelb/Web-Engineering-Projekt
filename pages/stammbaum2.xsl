<xsl:stylesheet version = "1.0" xmlns:xsl = "http://www.w3.org/1999/XSL/Transform"> 

    <xsl:template match = "/familie">
        <html>
            <head>
                <meta http-equiv="content-type" content="text/html; charset=utf-8" />
                <link rel="stylesheet" href="styles/styles.css" type="text/css" />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"/>

                <link rel="stylesheet" href="styles/stammbaum.css" type="text/css" />
            </head>
            <body style="text-align: center">

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
                                    <xsl:for-each select = "Frau">
                                        <div class="content" style="top: 100px; left:100px;">
                                            <xsl:value-of select="@vorname"/>
                                            <xsl:text> </xsl:text>
                                            <xsl:value-of select="@nachname"/>
                                        </div>
                                    </xsl:for-each>
                                    <xsl:for-each select = "Mann">
                                        <div class="content">
                                            <xsl:value-of select="@vorname"/>
                                            <xsl:text> </xsl:text>
                                            <xsl:value-of select="@nachname"/>
                                        </div>
                                    </xsl:for-each>
                                </xsl:for-each>
                            </xsl:for-each>
                        </div>
                    </div>
                    <script src="scripts/resizelogic.js"></script>
                </div>
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