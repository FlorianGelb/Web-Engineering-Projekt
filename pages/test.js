var per1 = new Object();
var per2 = new Object();
var nper = new Object();

function set_object(pers1, pers2, npers){
    per1 = pers1
    per2 = pers2
    nper = npers

}

    function test_compare(pers1, pers2, npers){

        alert(Object.is(pers1, per1) && Object.is(pers2, per2) && Object.is(npers, nper));

    }