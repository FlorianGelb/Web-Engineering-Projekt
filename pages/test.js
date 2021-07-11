var per1 = new Person();
var per2 = new Person();
var nper = new Person();

console.log(person1);

function set_object(pers1, pers2, npers){   
    per1 = pers1
    per2 = pers2
    nper = npers

}

    function test_compare(pers1, pers2, npers){

        alert(Object.is(pers1, per1) && Object.is(pers2, per2) && Object.is(npers, nper));
        console.log(per1.deathDate);
    }

