   // Get the modal



var dd = document.createElement("DIV");   // Create a <button> element
dd.innerHTML = '<div id="myModal" class="modal">    <!-- Modal content -->    <div class="modal-content">      <span class="close">&times;</span>      <div class="modalGrid">        <div class="div1">          <h1>Name, Nachname</h1>          <form id="newPersonModal">            <label for="firstName">Vorname:</label>            <input type="text" id="firstName" name="firstName">            <br><br>            <label for="familyName">Nachname:</label>            <input type="text" id="familyName" name="familyName">          </form>        </div>        <div class="div2">          <h1>Mutter, Vater, Ehepartner</h1>          <label for="mother">WÃ¤hlen Sie die Mutter aus:</label>          <select name="mother" id="mother" form="newPersonModal">            <option value="unknown"> ? </option>            <option value="xxxx">xxxx</option>          </select>          <br><br>          <label for="father">WÃ¤hlen Sie den Vater aus:</label>          <select name="father" id="father" form="newPersonModal">            <option value="unknown"> ? </option>            <option value="xxxx">xxxx</option>          </select>          <br><br>          <label for="spouse">WÃ¤hlen Sie den Ehepartner aus:</label>          <select name="spouse" id="spouse" form="newPersonModal">            <option value="none">-</option>            <option value="xxxx">xxxx</option>          </select>        </div>        <div class="div3">          <h1>Geburtsort, Geburtsdatum, Todesdatum</h1>          <label for="birthPlace">Geburtsort:</label>          <input type="text" id="birthPlace" name="birthPlace" form="newPersonModal">          <br><br>          <label for="birthdate">Geburtsdatum:</label>          <input type="date" id="birthdate" name="birthdate">          <br><br>          <label for="deathDate">Todesdatum:</label>          <input type="date" id="deathDate" name="deathDate">        </div>      </div>    </div>  </div>';                   // Insert text
document.body.appendChild(dd);    


   var modal = document.getElementById("myModal");
   window.alert("DD");

   // Get the button that opens the modal
   var btn = document.getElementById("myBtn");

   // Get the <span> element that closes the modal
   var span = document.getElementsByClassName("close")[0];

   // When the user clicks the button, open the modal 
   btn.onclick = function () {
    
     modal.style.display = "block";
   }

   // When the user clicks on <span> (x), close the modal
   span.onclick = function () {
     
     modal.style.display = "none";
   }

   // When the user clicks anywhere outside of the modal, close it
   window.onclick = function (event) {
     if (event.target == modal) {
       modal.style.display = "none";
     }
   }
