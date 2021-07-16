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
    }
}

// class Partnership {
//     constructor() {
//         this.mPartners = [];
//         this.mChilds = [];
//     }
// }