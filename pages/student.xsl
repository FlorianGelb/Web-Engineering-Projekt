<xsl:stylesheet version = "1.0"
xmlns:xsl = "http://www.w3.org/1999/XSL/Transform"> 

<xsl:template match = "/class">

	<html>

		<head>
  <style>
    .modalGrid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: 1fr;
      grid-column-gap: 0px;
      grid-row-gap: 0px;
    }

    .div1 {
      grid-area: 1 / 1 / 2 / 2;
    }

    .div2 {
      grid-area: 1 / 2 / 2 / 3;
    }

    .div3 {
      grid-area: 1 / 3 / 2 / 4;
    }

    /* The Modal (background) */
    .modal {
      display: none;
      /* Hidden by default */
      position: fixed;
      /* Stay in place */
      z-index: 1;
      /* Sit on top */
      padding-top: 100px;
      /* Location of the box */
      left: 0;
      top: 0;
      width: 100%;
      /* Full width */
      height: 100%;
      /* Full height */
      overflow: auto;
      /* Enable scroll if needed */
      background-color: rgb(0, 0, 0);
      /* Fallback color */
      background-color: rgba(0, 0, 0, 0.4);
      /* Black w/ opacity */
    }

    /* Modal Content */
    .modal-content {
      background-color: #fefefe;
      margin: auto;
      padding: 20px;
      border: 1px solid #888;
      width: 80%;
    }

    /* The Close Button */
    .close {
      color: #aaaaaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
    }

    .close:hover,
    .close:focus {
      color: #000;
      text-decoration: none;
      cursor: pointer;
    }
  </style>
</head>

		<body>

			<div id="insert" style=" resize:both; overflow:auto">
			</div>


			<h2>Student List</h2>
			<table border = "1" id="fff">
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
			<button id="myBtn">Open Modal</button>
			<script src="modalButton.js"></script>

		</body>
	</html>
</xsl:template>
</xsl:stylesheet>