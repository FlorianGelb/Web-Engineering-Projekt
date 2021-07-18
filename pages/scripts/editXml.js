
// required package: xml2json -> run npm i xml2json
const fs = require("fs");
const { parseString, Builder } = require("xml2js");


function compare(person, personID) {
    return person.$.id === personID;
}


function loop(familie, personID) {
    var res;
    for (let i = 0; i < familie.length; i++) {
        res = familie[i].Person.find(element => compare(element, personID));
        if (res != undefined) {
            return res;
        }
    }
    return res;
}



function generatePerson(newPerson) {

    // load XML and parse to JSON
    const xml = fs.readFileSync("../stammbaum.xml").toString();
    parseString(xml, function (err, data) {


        if (newPerson.mutter == "" && newPerson.vater == "" && newPerson.ehepartner == "") {
            var newFamile = { Person: [{ '$': { vorname: newPerson.vorname, nachname: newPerson.nachname, geschlecht: newPerson.geschlecht, geburtsdatum: newPerson.geburtsdatum, geburtsort: newPerson.geburtsort, todesdatum: newPerson.todesdatum, ehepartner: newPerson.ehepartner, mutter: newPerson.mutter, vater: newPerson.vater, id: newPerson.id, familyId: toString(data.stammbaum.familie.length) } }] }
            data.stammbaum.familie.push(newFamile);
            saveXml(data);
            return;
        }
        // just mother
        else if (newPerson.mutter != "" && newPerson.ehepartner == "") {
            var mutter = loop(data.stammbaum.familie, newPerson.mutter);
            if (mutter != undefined) {
                var personToPush = { '$': { vorname: newPerson.vorname, nachname: newPerson.nachname, geschlecht: newPerson.geschlecht, geburtsdatum: newPerson.geburtsdatum, geburtsort: newPerson.geburtsort, todesdatum: newPerson.todesdatum, ehepartner: newPerson.ehepartner, mutter: newPerson.mutter, vater: newPerson.vater, id: newPerson.id, familyId: mutter.familyId } }
                data.stammbaum.familie[parseInt(mutter.familyId)].Person.push(personToPush);
                saveXml(data);
                return;
            } else {
                alert("Die ausgewählte Mutter konnte nicht gefunden werden!");
            }
        }
        // just father
        else if (newPerson.vater != "" && newPerson.ehepartner == "") {
            var vater = loop(data.stammbaum.familie, newPerson.vater);
            if (vater != undefined) {
                var personToPush = { '$': { vorname: newPerson.vorname, nachname: newPerson.nachname, geschlecht: newPerson.geschlecht, geburtsdatum: newPerson.geburtsdatum, geburtsort: newPerson.geburtsort, todesdatum: newPerson.todesdatum, ehepartner: newPerson.ehepartner, mutter: newPerson.mutter, vater: newPerson.vater, id: newPerson.id, familyId: vater.familyId } }
                data.stammbaum.familie[parseInt(vater.familyId)].Person.push(personToPush);
                saveXml(data);
                return;
            } else {
                alert("Der ausgewählte Vater konnte nicht gefunden werden!");
            }
        }
        else if (newPerson.ehepartner != "") {
            var ehepartner = loop(data.stammbaum.familie, newPerson.ehepartner);
            if (ehepartner != undefined) {
                if (newPerson.mutter == "" && newPerson.vater == "") {
                    var personToPush = { '$': { vorname: newPerson.vorname, nachname: newPerson.nachname, geschlecht: newPerson.geschlecht, geburtsdatum: newPerson.geburtsdatum, geburtsort: newPerson.geburtsort, todesdatum: newPerson.todesdatum, ehepartner: newPerson.ehepartner, mutter: newPerson.mutter, vater: newPerson.vater, id: newPerson.id, familyId: ehepartner.familyId } }
                    data.stammbaum.familie[parseInt(ehepartner.familyId)].Person.push(personToPush);
                    saveXml(data);
                    return;
                } else if (newPerson.mutter != "") {
                    var mutter = loop(data.stammbaum.familie, newPerson.mutter)
                    if (mutter != undefined) {
                        for (let i = 0; i < data.stammbaum.familie[parseInt(mutter.familyId)].Person.length; i++) {
                            data.stammbaum.familie[parseInt(ehepartner.familyId)].Person.push(data.stammbaum.familie[parseInt(mutter.familyId)].Person[i])
                        }
                        delete data.stammbaum.familie[parseInt(mutter.familyId)];
                        saveXml(data);
                        return;
                    } else {
                        alert("Fehler bei Ehepartner und Mutter")
                    }
                } else if (newPerson.vater != "") {
                    var vater = loop(data.stammbaum.familie, newPerson.vater)
                    if (vater != undefined) {
                        for (let i = 0; i < data.stammbaum.familie[parseInt(vater.familyId)].Person.length; i++) {
                            data.stammbaum.familie[parseInt(ehepartner.familyId)].Person.push(data.stammbaum.familie[parseInt(vater.familyId)].Person[i])
                        }
                        delete data.stammbaum.familie[parseInt(vater.familyId)];
                        saveXml(data);
                        return;
                    } else {
                        alert("Fehler bei Ehepartner und Vater")
                    }
                }
            } else {
                alert("Der ausgewählte Ehepartner konnte nicht gefunden werden");
            }
        }
    });
}

function saveXml(data) {
    const builder = new Builder();
    const xml = builder.buildObject(data);
    fs.writeFileSync("../stammbaum.xml", xml, function (err, file) {
        if (err) throw err;
        console.log("Saved!");
    });
}