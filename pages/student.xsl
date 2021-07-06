<xsl:stylesheet version = "1.0"
xmlns:xsl = "http://www.w3.org/1999/XSL/Transform"> 

<xsl:template match = "/class">

	<html>

		<head id="head">
    </head>

		<body>

			<div class="parent">
        <div class="container">
		<div class="resize">

		<table class="content" border = "1" id="resize">
				<tr bgcolor="lightgreen">
					<th>First Name</th>
					<th>Last Name</th>
					<th>Nick Name</th>
				</tr>
				
				<xsl:for-each select = "student">
				
					<tr>
						<td><xsl:value-of select = "firstname"/></td>
						<td><xsl:value-of select = "lastname"/></td>
						<td><xsl:value-of select = "nickname"/></td>
					</tr>
				
				</xsl:for-each>
				
			</table>

			<table class="content e3" border = "1">
				<tr bgcolor="lightgreen">
					<th>First Name</th>
					<th>Last Name</th>
					<th>Nick Name</th>
				</tr>
				
				<xsl:for-each select = "student">
				
					<tr>
						<td><xsl:value-of select = "firstname"/></td>
						<td><xsl:value-of select = "lastname"/></td>
						<td><xsl:value-of select = "nickname"/></td>
					</tr>
				
				</xsl:for-each>
				
			</table>
               
			</div>
        </div>

    </div>


			<h2>Student List</h2>
			
			<button id="myBtn">Open Modal</button>
			<script src="modalButton.js"></script>
      <script src="resizelogic.js"></script>

		</body>
	</html>
</xsl:template>
</xsl:stylesheet>