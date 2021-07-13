
window.Person = Person; 

var btn = document.getElementById("conf");

var person1 = new Person();
var person2 = new Person();
var newPers = new Person();


btn.onclick = function () {
    
    person1.fstName (document.getElementById("firstName1").value);
    person2.fstName(document.getElementById("firstName2").value);
    newPers.fstName(document.getElementById("firstName").value);

    person1.famName(document.getElementById("familyName1").value);
    person2.famName(document.getElementById("familyName2").value);
    newPers.famName(document.getElementById("familyName").value);

    person1.fmother(document.getElementById("mother1").value);
    person2.fmother(document.getElementById("mother2").value);
    newPers.fmother(document.getElementById("mother").value);
    

    person1.ffather(document.getElementById("father1").value);
    person2.ffather(document.getElementById("father2").value);
    newPers.ffather(document.getElementById("father").value);

    person1.fspouse(document.getElementById("spouse1").value);
    person2.fspouse(document.getElementById("spouse2").value);
    newPers.fspouse(document.getElementById("spouse").value);

    person1.fbirthPlace(document.getElementById("birthPlace1").value);
    person2.fbirthPlace(document.getElementById("birthPlace2").valu);
    newPers.fbirthPlace(document.getElementById("birthPlace").value);

    person1.fbirthDate(document.getElementById("birthdate1").value);
    person2.fbirthDate(document.getElementById("birthdate2").value);
    newPers.fbirthDate(document.getElementById("birthdate").value);

    person1.fdeathDate(document.getElementById("deathDate1").value);
    person2.fdeathDate(document.getElementById("deathDate2").value);
    newPers.fdeathDate(document.getElementById("deathDate").value);



    set_object(person1, person2, newPers);
    test_compare(person1, person2, newPers);


  }


