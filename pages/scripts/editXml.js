
// required package: xml2json -> run npm i xml2json
const fs = require("fs");
const { parseString, Builder } = require("xml2js");



// load XML and parse to JSON
const xml = fs.readFileSync("../stammbaum.xml").toString();
parseString(xml, function (err, data) {


    for (let i = 0; i < Object.keys(data.stammbaum.familie).length; i++) {
     console.log(loop(data.stammbaum.familie[i].generation, '400'));
      
    }
    




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





