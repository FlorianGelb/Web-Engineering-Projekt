
// required package: xml2json -> run npm i xml2json
const fs = require("fs");
const { parseString, Builder } = require("xml2js");


// load XML and parse to JSON
const xml = fs.readFileSync("../xml-beispiel/dummydata.xml").toString();
parseString(xml, function (err, data) {

    // Show the XML
    console.log(data.familie.generation);

    
    
    
    
    // Saved the XML
     const builder = new Builder();
     const xml = builder.buildObject(data);
     fs.writeFileSync("dummydata.xml", xml, function (err, file) {
         if (err) throw err;
         console.log("Saved!");
     });
});


