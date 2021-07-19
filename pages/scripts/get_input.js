
var btn = document.getElementById("conf");

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


btn.onclick = function () {

    
    person1.vorname(document.getElementById("firstName1").value);
    person2.vorname(document.getElementById("firstName2").value);
    newPers.vorname(document.getElementById("firstName").value);

    newPers.geschlecht(document.getElementById("Geschlecht").value)

    person1.nachname(document.getElementById("familyName1").value);
    person2.nachname(document.getElementById("familyName2").value);
    newPers.nachname(document.getElementById("familyName").value);

    person1.mutter(document.getElementById("mother1").value);
    person2.mutter(document.getElementById("mother2").value);
    newPers.mutter(document.getElementById("mother").value);
    

    person1.vater(document.getElementById("father1").value);
    person2.vater(document.getElementById("father2").value);
    newPers.vater(document.getElementById("father").value);

    person1.ehepartner(document.getElementById("spouse1").value);
    person2.ehepartner(document.getElementById("spouse2").value);
    newPers.ehepartner(document.getElementById("spouse").value);

    person1.geburtsort(document.getElementById("birthPlace1").value);
    person2.geburtsort(document.getElementById("birthPlace2").value);
    newPers.geburtsort(document.getElementById("birthPlace").value);

    person1.geburtsdatum(document.getElementById("birthdate1").value);
    person2.geburtsdatum(document.getElementById("birthdate2").value);
    newPers.geburtsdatum(document.getElementById("birthdate").value);

    person1.todesdatum(document.getElementById("deathDate1").value);
    person2.todesdatum(document.getElementById("deathDate2").value);
    newPers.todesdatum(document.getElementById("deathDate").value);

    newPers.id(Date.now());


    var pListe = Array.from(document.getElementsByClassName("content"));

    var persObjectList = []   

  

    for (let i=0; i<pListe.length; i++){
      var np = new PersonB(pListe[i]);
      checkIDs(np, person1);
      checkIDs(np, person2);

  }
  console.log(JSON.stringify(newPers));

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", "http://127.0.0.1:1111/test.php/?json=" + JSON.stringify(newPers), false ); // false for synchronous request
  xmlHttp.send( null );
  console.log(xmlHttp.responseText);

  //generatePerson(newPers);
  posElement(person1.ID, person2.ID);
}


