class Person {

    constructor() { }

    vorname(firstName) {
        this.vname = firstName;
    }

    nachname(familyName) {
        this.nname = familyName;
    }

    geschlecht(gender){
        this.gschlecht = gender;
    }

    geburtsdatum(birthDate) {
        this.geburtsdat = birthDate;
    }

    geburtsort(birthPlace) {
        this.gebort = birthPlace;
    }
    
    todesdatum(deathDate) {
        this.todesdat = deathDate;
    }

    ehepartner(spouse) {
        if(spouse === "none" || spouse === undefined ){
            this.ehepartnr = "";
            return;
        }
        this.ehepartnr = spouse;
    }

    mutter(mother) {
        if(mother == "unknown"){
            this.mttr = "";
            return;
        }
        this.mttr = mother;
    }

    vater(father) {
        if(father == "unknown"){
            this.vtr = "";
            return;
        }
        this.vtr = father;
    }

    id(Id){
        this.ID = Id;
    }

    famId(familyId){
        this.familyId = familyId;
    }

}
