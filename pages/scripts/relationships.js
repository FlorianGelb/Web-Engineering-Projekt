class PersonB {
    constructor(htmlobject){
        this.object = htmlobject;
        this.vorname = htmlobject.getAttribute("data-vorname");
        this.nachname = htmlobject.getAttribute("data-nachname");
        this.id = htmlobject.getAttribute("data-id");
        this.ehepartner = htmlobject.getAttribute("data-ehepartner");
        this.mutter = htmlobject.getAttribute("data-mutter");
        this.mutterobject = undefined;
        this.vater = htmlobject.getAttribute("data-vater");
        this.vaterobject = undefined;
        this.geschlecht = htmlobject.getAttribute("data-geschlecht")
        this.angezeigt = false;
        this.gdatum = this.object.getAttribute("data-geburtsdatum");
        this.gort =   this.object.getAttribute("data-geburtsort");
        this.ddatum =   this.object.getAttribute("data-todesdatum");
        this.pobject = new Person();

        this.pobject.vorname( this.vorname);

        this.pobject.nachname(this.nachname);

        this.pobject.mutter(this.mutter);

        this.pobject.vater(this.vater);

        this.pobject.ehepartner(this.ehepartner);

        this.pobject.geburtsort(this.gort);

        this.pobject.geburtsdatum(this.gdatum);

        this.pobject.todesdatum(document.getElementById("deathDate1").value);



    }
}

// class Partnership {
//     constructor() {
//         this.mPartners = [];
//         this.mChilds = [];
//     }
// }