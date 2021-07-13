
window.Person = Person; 

var btn = document.getElementById("conf");

var person1 = new Person();
var person2 = new Person();
var newPers = new Person();


btn.onclick = function () {
    
    person1.vorname (document.getElementById("firstName1").value);
    person2.vorname(document.getElementById("firstName2").value);
    newPers.vorname(document.getElementById("firstName").value);

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
    person2.geburtsort(document.getElementById("birthPlace2").valu);
    newPers.geburtsort(document.getElementById("birthPlace").value);

    person1.geburtsdatum(document.getElementById("birthdate1").value);
    person2.geburtsdatum(document.getElementById("birthdate2").value);
    newPers.geburtsdatum(document.getElementById("birthdate").value);

    person1.todesdatum(document.getElementById("deathDate1").value);
    person2.todesdatum(document.getElementById("deathDate2").value);
    newPers.todesdatum(document.getElementById("deathDate").value);

    newPers.id(Date.now());



    set_object(person1, person2, newPers);
    test_compare(person1, person2, newPers);


  }


