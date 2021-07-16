
// required package: xml2json -> run npm i xml2json
const fs = require("fs");
const { parseString, Builder } = require("xml2js");



// load XML and parse to JSON
const xml = fs.readFileSync("../stammbaum.xml").toString();
parseString(xml, function (err, data) {

    

    // console.log(data.stammbaum)

    var out = {generation:[{Person:[{'$':{vorname: "Bernd", nachname:"Lee", geschlecht:"weiblich", geburtsdatum:"11-08-48", geburtsort:"Bearberry", todesdatum:"", ehepartner:"", mutter:"5", vater:"6", id:"13", familyId:""}}]}]}


//     var out = {'$':{vorname: testPerson.vorname, nachname:"Lee", geschlecht:"weiblich", geburtsdatum:"11-08-48", geburtsort:"Bearberry", todesdatum:"", ehepartner:"", mutter:"5", vater:"6", id:"13", familyId:""}}
//     console.log(out)
// 
     data.stammbaum.familie.push(out);

//      console.log("------------------------------------------------------------------------------")
    
//      console.log(data.stammbaum.familie[0].generation[0].Person)

    // console.log(data)

 // Saved the XML
 const builder = new Builder();
 const xml = builder.buildObject(data);
 fs.writeFileSync("../stammbaum.xml", xml, function (err, file) {
     if (err) throw err;
     console.log("Saved!");
 });




});

function compare(person, personID) {
    return person.$.id === personID;
}

function loop(generation, personID) {
    var res = search(generation, personID);
    if (res == undefined) {
        if (generation[0].generation != undefined) {
            return loop(generation[0].generation, personID)
        } else {
           
            return;
        }

    } else {
        return res;
    }
}

function search(generation, personID) {
    return generation[0].Person.find(element => compare(element, personID));
   
   
}





function generatePerson(newPerson) {

    // load XML and parse to JSON
    const xml = fs.readFileSync("../xml-beispiel/dummydata.xml").toString();
    parseString(xml, function (err, data) {


        if(newPerson.mutter == "" && newPerson.vater == "" && newPerson.ehepartner == ""){
            var newFamile = {generation:[{Person:[{'$':{vorname: newPerson.vorname, nachname: newPerson.nachname, geschlecht: newPerson.geschlecht, geburtsdatum: newPerson.geburtsdatum, geburtsort: newPerson.geburtsort, todesdatum: newPerson.todesdatum, ehepartner: newPerson.ehepartner, mutter: newPerson.mutter, vater: newPerson.vater, id: newPerson.id, familyId: newPerson.familyId}}]}]}

        }else if(newPerson.mutter != "" ){
            
        }
















        // Saved the XML
        const builder = new Builder();
        const xml = builder.buildObject(data);
        fs.writeFileSync("dummydata.xml", xml, function (err, file) {
            if (err) throw err;
            console.log("Saved!");
        });
    });

}





