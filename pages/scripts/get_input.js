
var btn = document.getElementById("conf");
var bst = document.getElementById("bst");

var person1 = new Person();
var person2 = new Person();
var newPers = new Person();


function checkIDs(pers, spers){
  var equal = true;

  if(pers.pobject instanceof Person && spers instanceof Person){
  for(var key in pers.pobject) {
      equal = equal && pers.pobject[key] === spers[key];
  }

  if (equal){
    spers.ID = pers.id;

  }

}
 


}

bst.onclick = function (){
  newPers.ehepartner(document.getElementById("spouse").value);
  newPers.vater(document.getElementById("father").value);
  newPers.mutter(document.getElementById("mother").value);
  newPers.nachname(document.getElementById("familyName").value);
  newPers.vorname(document.getElementById("firstName").value);
  newPers.todesdatum(document.getElementById("deathDate").value);
  newPers.geburtsort(document.getElementById("birthPlace").value);
  newPers.geburtsdatum(document.getElementById("birthdate").value);
  newPers.geschlecht(document.getElementById("Geschlecht").value)

  newPers.id(Date.now());

  console.log(JSON.stringify(newPers));
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", "new_person.php/?json=" + JSON.stringify(newPers), false ); // false for synchronous request
  xmlHttp.send( null );
  console.log(xmlHttp.responseText);

  location.reload();
  modal.style.display = "none";

}


btn.onclick = function () {

    
    person1.vorname(document.getElementById("firstName1").value);
    person2.vorname(document.getElementById("firstName2").value);




    person1.nachname(document.getElementById("familyName1").value);
    person2.nachname(document.getElementById("familyName2").value);


    person1.mutter(document.getElementById("mother1").value);
    person2.mutter(document.getElementById("mother2").value);

    

    person1.vater(document.getElementById("father1").value);
    person2.vater(document.getElementById("father2").value);


    person1.ehepartner(document.getElementById("spouse1").value);
    person2.ehepartner(document.getElementById("spouse2").value);


    person1.geburtsort(document.getElementById("birthPlace1").value);
    person2.geburtsort(document.getElementById("birthPlace2").value);


    person1.geburtsdatum(document.getElementById("birthdate1").value);
    person2.geburtsdatum(document.getElementById("birthdate2").value);


    person1.todesdatum(document.getElementById("deathDate1").value);
    person2.todesdatum(document.getElementById("deathDate2").value);



    var pListe = Array.from(document.getElementsByClassName("content"));

    var persObjectList = []   

  

    for (let i=0; i<pListe.length; i++){
      var np = new PersonB(pListe[i]);
      checkIDs(np, person1);
      checkIDs(np, person2);

  }

  posElement(person1.ID, person2.ID);
}


