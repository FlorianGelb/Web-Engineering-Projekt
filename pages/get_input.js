var btn = document.getElementById("conf");

var person1 = new Object();
var person2 = new Object();
var newPers = new Object();

btn.onclick = function () {
    
    person1.firstName = document.getElementById("firstName1").value;
    person2.firstName = document.getElementById("firstName2").value;
    newPers.firstName = document.getElementById("firstName").value;

    person1.familyName = document.getElementById("familyName1").value;
    person2.familyName = document.getElementById("familyName2").value;
    newPers.familyName = document.getElementById("familyName").value;

    person1.mother = document.getElementById("mother1").value;
    person2.mother = document.getElementById("mother2").value;
    newPers.mother = document.getElementById("mother").value;
    

    person1.father = document.getElementById("father1").value;
    person2.father = document.getElementById("father2").value;
    newPers.father = document.getElementById("father").value;

    person1.spouse = document.getElementById("spouse1").value;
    person2.spouse = document.getElementById("spouse2").value;
    newPers.spouse = document.getElementById("spouse").value;

    person1.birthPlace = document.getElementById("birthPlace1").value;
    person2.birthPlace = document.getElementById("birthPlace2").value;
    newPers.birthPlace = document.getElementById("birthPlace").value;

    person1.birthDate = document.getElementById("birthdate1").value;
    person2.birthDate = document.getElementById("birthdate2").value;
    newPers.birthDate = document.getElementById("birthdate").value;

    person1.deathDate = document.getElementById("deathDate1").value;
    person2.deathDate = document.getElementById("deathDate2").value;
    newPers.deathDate = document.getElementById("deathDate").value;


    console.log(newPers);
    set_object(person1, person2, newPers);
    test_compare(person1, person2, newPers);


  }


