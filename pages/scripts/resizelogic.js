const maxsize = 3000;
const minsize = 900;
const scaleFactor = 10; // minsize muss durch scaleFactor teilbar sein
const resize = document.querySelector(".resize");
var depthcounter = []

var personList = Array.from(document.getElementsByClassName("content"));

window.addEventListener("load", onLoad);




if (resize.addEventListener) {
    resize.addEventListener("wheel", scrollevent);
    resize.addEventListener("mousedown", mousedown);
}
else {
    resize.onwheel = scrollevent;
    resize.attachEvent("onmousedown", mousedown);
}

function reset(){
    var hlines = document.getElementsByClassName("connectionlinehorizontal");
    var vlines = document.getElementsByClassName("connectionlinevertical"); 
    console.log(hlines);

    while(hlines[0]){
        resize.removeChild(hlines[0]);
    }

    while(vlines[0]){
        resize.removeChild(vlines[0]);
    }
    
    var perslist = []

    for (let i=0; i<personList.length; i++){
        perslist.push(new PersonB(personList[i]));
    }

    for (let i=0; i<perslist.length; i++){
        if (perslist[i].object.style.visibility != "hidden"){
            perslist[i].object.style.visibility = "hidden";
            perslist[i].object.firstChild.style.visibility = "hidden";
        }
        
        
    }

    toggleClones(false);

    
}

function toggleClones(t){
object = Array.from(document.querySelectorAll("[clone]"));
console.log(object);
for(let o of object){
    if(t){
        o.style.visibility = "visible";
        o.firstChild.style.visibility = "visible";

    }
    else{
    o.parentElement.removeChild(o);
    }
}
}


function posElement(id1, id2){
    reset();
    positionElements(id1, id2);
    convertAbsoluteUnitsToRelative();
    alert(getRelation(id1, id2));
    


}

function onLoad(){
    reset();
    convertAbsoluteUnitsToRelative();
    orientateAdditionalInfo();
}

function getRelation(firstPersonId, secondPersonId){
    if (firstPersonId == secondPersonId){
        return "Same Person";
    }
    var personList = Array.from(document.getElementsByClassName("content"));

    var personObjectList = []

    var firstPersonIndex, secondPersonIndex;

    for (let i = 0; i < personList.length; i++) {
        personObjectList.push(new PersonB(personList[i]));
        if (personObjectList[personObjectList.length - 1].id == firstPersonId) {
            firstPersonIndex = personObjectList.length - 1;
        }
        else if (personObjectList[personObjectList.length - 1].id == secondPersonId) {
            secondPersonIndex = personObjectList.length - 1;
        }
    }
    
    if (personObjectList[firstPersonIndex].ehepartner =="" && personObjectList[firstPersonIndex].mutter == "" &&  personObjectList[firstPersonIndex].vater == ""){
        return "keine Datenlage";
    }
    if (personObjectList[secondPersonIndex].ehepartner =="" && personObjectList[secondPersonIndex].mutter == "" &&  personObjectList[secondPersonIndex].vater == ""){
        return "keine Datenlage";
    }

    if (personObjectList[firstPersonIndex].ehepartner == personObjectList[secondPersonIndex].id){
        return "Ehepartner";
    }
    else if (personObjectList[firstPersonIndex].vater == personObjectList[secondPersonIndex].id){
        return "Vater";
    }
    else if (personObjectList[firstPersonIndex].mutter == personObjectList[secondPersonIndex].id){
        return "Mutter";
    }
    else if (personObjectList[firstPersonIndex].id == personObjectList[secondPersonIndex].mutter || personObjectList[firstPersonIndex].id == personObjectList[secondPersonIndex].vater) {
        if (personObjectList[secondPersonIndex].geschlecht == "männlich"){
            return "Sohn";
        }
        else {
            return "Tochter";
        }
    }
    else if (personObjectList[firstPersonIndex].mutter == personObjectList[secondPersonIndex].mutter && personObjectList[firstPersonIndex].vater == personObjectList[secondPersonIndex].vater) {
        if (personObjectList[secondPersonIndex].geschlecht == "männlich"){
            console.log(personObjectList[firstPersonIndex]);
            return "Bruder";
        }
        else {
            return "Schwester";
        }
    }

    for (let i = 0; i < personObjectList.length; i++) {
        for (let j = 0; j < personObjectList.length; j++) {
            if (personObjectList[i].vater == personObjectList[j].id) {
                personObjectList[i].vaterobject = personObjectList[j];
            }
            else if (personObjectList[i].mutter == personObjectList[j].id) {
                personObjectList[i].mutterobject = personObjectList[j];
            }
        }
    }

    var ancestorListpersonOne = constructorFlatAncestorList(personObjectList[firstPersonIndex]);
    var ancestorListpersonTwo = constructorFlatAncestorList(personObjectList[secondPersonIndex]);

    var verwandt = false;
    var verwandtschaftsknoten;

    ancestorListpersonOne.forEach(function(person){
        if (ancestorListpersonTwo.includes(person)){
            verwandt = true;
            if (verwandtschaftsknoten != undefined){
                verwandtschaftsknoten = person;
            }
        }
    })

    if (!verwandt){
        return "Nicht verwandt"
    }

    var großelternListOne, großelternListTwo;

    if (getGraphdepth(constructorAncestorList(personObjectList[firstPersonIndex]), 0) > 2){
        großelternListOne = [personObjectList[firstPersonIndex].vaterobject.vater, personObjectList[firstPersonIndex].vaterobject.mutter, personObjectList[firstPersonIndex].mutterobject.vater, personObjectList[firstPersonIndex].mutterobject.mutter];

        if (großelternListOne.includes(personObjectList[secondPersonIndex].vater) || großelternListOne.includes(personObjectList[secondPersonIndex].mutter)) {
            if (personObjectList[firstPersonIndex].geschlecht == "männlich") {
                return "Onkel";
            }
            else {
                return "Tante"
            }
        }

        if (großelternListOne.includes(personObjectList[secondPersonIndex].id)){
            if (personObjectList[secondPersonIndex].geschlecht == "männlich") {
                return "Opa";
            }
            else {
                return "Oma"
            }
        }
    }

    if (getGraphdepth(constructorAncestorList(personObjectList[secondPersonIndex]), 0) > 2) {
        großelternListTwo = [personObjectList[secondPersonIndex].vaterobject.vater, personObjectList[secondPersonIndex].vaterobject.mutter, personObjectList[secondPersonIndex].mutterobject.vater, personObjectList[secondPersonIndex].mutterobject.mutter];

        if (großelternListTwo.includes(personObjectList[firstPersonIndex].vater) || großelternListTwo.includes(personObjectList[firstPersonIndex].mutter)) {
            if (personObjectList[secondPersonIndex].geschlecht == "männlich") {
                return "Neffe";
            }
            else {
                return "Nichte"
            }
        }

        if (großelternListTwo.includes(personObjectList[firstPersonIndex].id)) {
            return "Enkel";
        }
    }

    if (großelternListOne != undefined && großelternListTwo != undefined){
        for(const personId of großelternListOne){
            if (großelternListTwo.includes(personId)){
                if (personObjectList[secondPersonIndex].geschlecht == "männlich"){
                    return "Cousin";
                }
                else {
                    return "Cousine"
                }
            }
        }  
    }
    

    return "Verwandtschaft zu einem höheren Grad";
}

function constructorFlatAncestorList(personObject){
    if (personObject.vater == "" && personObject.mutter == ""){
        return [personObject];
    }
    else if (personObject.vater == "" && personObject.mutter != "") {
        return [personObject].concat(constructorFlatAncestorList(personObject.vaterobject))
    }
    else if (personObject.vater != "" && personObject.mutter == "") {
        return [personObject].concat(constructorFlatAncestorList(personObject.mutterobject))
    }
    else {
        var zwischenspeicher = [personObject].concat(constructorFlatAncestorList(personObject.vaterobject))
        return zwischenspeicher.concat(constructorFlatAncestorList(personObject.mutterobject));
    }
}

function positionElements(startIdone, startIdtwo){

    var personObjectList = []

    var startObjectOneIndex, startObjectTwoIndex;

    for (let i=0; i<personList.length; i++){
        personObjectList.push(new PersonB(personList[i]));
        if (personObjectList[personObjectList.length - 1].id == startIdone){
            startObjectOneIndex = personObjectList.length-1;
        }
    }

    for (let i = 0; i < personObjectList.length; i++){
        for (let j = 0; j < personObjectList.length; j++){
            if (personObjectList[i].vater == personObjectList[j].id){
                personObjectList[i].vaterobject = personObjectList[j];
            }
            else if (personObjectList[i].mutter == personObjectList[j].id) {
                personObjectList[i].mutterobject = personObjectList[j];
            }
        }
    }

    var verschiebung = excecutePositioning(personObjectList[startObjectOneIndex], 0);
    personObjectList[startObjectOneIndex].object.firstChild.style.backgroundColor = "orange"

    if (personObjectList[startObjectOneIndex].ehepartner != ""){
        for(let i=0; i<personObjectList.length; i++){
            if (personObjectList[i].id == personObjectList[startObjectOneIndex].ehepartner){
                var ehepartner = personObjectList[i];
                ehepartner.object.style.top = personObjectList[startObjectOneIndex].object.style.top;
                ehepartner.object.style.left = parseInt(document.defaultView.getComputedStyle(personObjectList[startObjectOneIndex].object).width) + parseInt(document.defaultView.getComputedStyle(personObjectList[startObjectOneIndex].object).left) + 50 + "px";
                personObjectList[i].angezeigt = true;

                let horizontaldiv = document.createElement('div');
                horizontaldiv.className = 'connectionlinehorizontal';
                var width = 50;
                horizontaldiv.style.width = width + "px";
                horizontaldiv.style.height = "3px";
                horizontaldiv.style.top = (parseInt(document.defaultView.getComputedStyle(personObjectList[startObjectOneIndex].object).top) + 10) + "px";
                horizontaldiv.style.left = ((parseInt(document.defaultView.getComputedStyle(personObjectList[startObjectOneIndex].object).left)+5) + parseInt(document.defaultView.getComputedStyle(personObjectList[startObjectOneIndex].object).width)) + "px";
                resize.appendChild(horizontaldiv);
                break;
            }
        }
    }

    if (startIdtwo != undefined){
        for (let i = 0; i < personObjectList.length; i++) {
            if (personObjectList[i].id == startIdtwo) {
                startObjectTwoIndex = i;
            }
        }

        verschiebung = excecutePositioning(personObjectList[startObjectTwoIndex], verschiebung+200);
        personObjectList[startObjectTwoIndex].object.firstChild.style.backgroundColor = "green"
        if (personObjectList[startObjectTwoIndex].ehepartner != "") {
            for (let i = 0; i < personObjectList.length; i++) {
                if (personObjectList[i].id == personObjectList[startObjectTwoIndex].ehepartner) {
                    var ehepartner;
                    var referenceObject;
                    if (personObjectList[i].angezeigt) {
                        ehepartner = personObjectList[i].object.cloneNode(true)
                        ehepartner.setAttribute("clone", personObjectList[i].id)
                        referenceObject = document.querySelector("[clone='" + personObjectList[startObjectTwoIndex].id + "']");
                    }
                    else {
                        ehepartner = personObjectList[i].object
                        personObjectList[i].angezeigt = true;
                        referenceObject = personObjectList[startObjectTwoIndex].object
                    }

                    
                    
                    ehepartner.style.top = referenceObject.style.top;
                    ehepartner.style.left = parseInt(document.defaultView.getComputedStyle(referenceObject).width) + parseInt(document.defaultView.getComputedStyle(referenceObject).left) + 50 + "px";
                    if (personObjectList[i].angezeigt) {
                        resize.appendChild(ehepartner);
                    }

                    let horizontaldiv = document.createElement('div');
                    horizontaldiv.className = 'connectionlinehorizontal';
                    var width = 50;
                    horizontaldiv.style.width = width + "px";
                    horizontaldiv.style.height = "3px";
                    horizontaldiv.style.top = (parseInt(document.defaultView.getComputedStyle(referenceObject).top) + 10) + "px";
                    horizontaldiv.style.left = ((parseInt(document.defaultView.getComputedStyle(referenceObject).left) + 5) + parseInt(document.defaultView.getComputedStyle(referenceObject).width)) + "px";
                    resize.appendChild(horizontaldiv);
                    break;
                }
            }
        }
    }

    

    for (let i=0; i<personObjectList.length; i++){
        if (personObjectList[i].angezeigt == true){
            personObjectList[i].object.style.visibility = "visible";
            personObjectList[i].object.firstChild.style.visibility = "visible";

        }

    }
    toggleClones(true);

            

}

function excecutePositioning(personObject, verschiebung){
    var list = constructorAncestorList(personObject);
    var depth = getGraphdepth(list, 0);

    depthcounter = [];

    for (let i = 0; i < depth; i++) {
        depthcounter.push(0);
    }

    var maxWidth = (parseInt(document.defaultView.getComputedStyle(resize).width));

    positionGraph(list, 0, depth, maxWidth, verschiebung, 1);

    return depth * 150;
}

function positionGraph(personObject, rekursionstiefe, depth, maxWidth, verschiebung, position){

    if (!personObject[0].angezeigt){
        personObject[0].angezeigt = true;
        personObject[0].object.style.top = verschiebung + (150*(depth-rekursionstiefe)) + "px";
        var left = (maxWidth * (position*1/(Math.pow(2, rekursionstiefe+1))));
        personObject[0].object.style.left = left + "px";
    }
    else {
        var clonedObject = personObject[0].object.cloneNode(true);
        clonedObject.style.top = verschiebung + (150 * (depth - rekursionstiefe)) + "px";
        var left = (maxWidth * (position * 1 / (Math.pow(2, rekursionstiefe + 1))));
        clonedObject.style.left = left + "px";
        clonedObject.setAttribute("clone", personObject[0].id)
        resize.appendChild(clonedObject);
    }

    placeLines(personObject, verschiebung, rekursionstiefe, maxWidth, position * 2 - 1);

    depthcounter[rekursionstiefe]++;
    rekursionstiefe++;
    if (personObject[1].length > 0) {
        positionGraph(personObject[1][0], rekursionstiefe, depth, maxWidth, verschiebung, position*2-1);
    }
    if (personObject[1].length > 1) {
        positionGraph(personObject[1][1], rekursionstiefe, depth, maxWidth, verschiebung, position*2+1);
    }
    
}

function placeLines(personObject, verschiebung, rekursionstiefe, maxWidth, position){
    var object;
    if (verschiebung == 0){
        object = personObject[0].object;
        
    }
    else {
        object = document.querySelector("[clone='"+personObject[0].id+"']");
        if (object == undefined){
            object = personObject[0].object;
        }
    }

    if (personObject[1].length > 0){

        
        var horizontaldiv = document.createElement('div');
        horizontaldiv.className = 'connectionlinehorizontal';
        var width = ((maxWidth * (1 / (Math.pow(2, rekursionstiefe + 1)))) - parseInt(document.defaultView.getComputedStyle(object.firstChild).width));
        horizontaldiv.style.width = width + "px";
        horizontaldiv.style.height = "3px";
        horizontaldiv.style.top = (parseInt(document.defaultView.getComputedStyle(object).top) -140) + "px";
        horizontaldiv.style.left = (((parseInt(document.defaultView.getComputedStyle(object).left)+4) + parseInt(document.defaultView.getComputedStyle(personObject[1][0][0].object).width) * 0.5) - width*0.5) + "px";
        resize.appendChild(horizontaldiv);

        
        var verticaldiv = document.createElement('div');
        verticaldiv.className = 'connectionlinevertical';
        verticaldiv.style.width = "3px";
        verticaldiv.style.height = "146px";
        verticaldiv.style.top = (parseInt(document.defaultView.getComputedStyle(object).top) - 140) + "px";
        verticaldiv.style.left = ((parseInt(document.defaultView.getComputedStyle(object).left) + 10) + parseInt(document.defaultView.getComputedStyle(object.firstChild).width)*0.5) + "px";
        resize.appendChild(verticaldiv);
    }
}


function getGraphdepth (personObject, depth){
    
    if (personObject[1].length > 0){
        var depthone = getGraphdepth(personObject[1][0], depth);
        var depthholder = depthone;
        if (personObject[1].length > 1){
            var depthtwo = getGraphdepth(personObject[1][1], depth);
            if (depthtwo > depthholder){
                depthholder = depthtwo;
            }
        }
        depth+=depthholder;   
    }
    depth++;
    return depth;
}

function constructorAncestorList(personObject){
    var list = [personObject, []];
    if (personObject.vater != ""){
        list[1].push(constructorAncestorList(personObject.vaterobject));
    }
    if (personObject.mutter != "") {
        list[1].push(constructorAncestorList(personObject.mutterobject));
    }

    return list;
}

function convertAbsoluteUnitsToRelative(){
    var children = resize.children;

    var scaleSize = 0;
    scaleSize = parseInt(document.defaultView.getComputedStyle(resize).width);

    for (let i=0; i<children.length; i++){
        var element = children.item(i);
        var elementWidth = parseInt(document.defaultView.getComputedStyle(element).width);
        var elementHeight = parseInt(document.defaultView.getComputedStyle(element).height);
        var elementTop = parseInt(document.defaultView.getComputedStyle(element).top);
        var elementLeft = parseInt(document.defaultView.getComputedStyle(element).left);
        
        console.log(elementWidth, elementHeight, elementTop, elementLeft);

        if (elementWidth + elementLeft > scaleSize){
            scaleSize = elementWidth + elementLeft;
        }
        if (elementHeight + elementTop > scaleSize){
            scaleSize = elementHeight + elementTop;
        }
    }

    scaleSize += 50;

    if (scaleSize < 800) {
        scaleSize = 800;
    }


    for (let i=0; i<children.length; i++){
        var element = children.item(i);

        var elementWidth = parseInt(document.defaultView.getComputedStyle(element).width);
        var elementHeight = parseInt(document.defaultView.getComputedStyle(element).height);
        var elementTop = parseInt(document.defaultView.getComputedStyle(element).top);
        var elementLeft = parseInt(document.defaultView.getComputedStyle(element).left);

        element.style.width = (elementWidth / scaleSize)*100 + '%';
        element.style.height = (elementHeight / scaleSize) * 100 + '%';
        element.style.top = (elementTop / scaleSize) * 100 + '%';
        element.style.left = (elementLeft / scaleSize) * 100 + '%';
    }
    return scaleSize;
}

function orientateAdditionalInfo () {
    var additionalinfoList = document.getElementsByClassName("additionalinfo");

    for (let i=0; i<additionalinfoList.length; i++) {
        var additionalinfo = additionalinfoList.item(i)
        var additionalinfoHeight = parseInt(document.defaultView.getComputedStyle(additionalinfo).height);

        var elementTop = parseInt(document.defaultView.getComputedStyle(additionalinfo.parentElement.parentElement).top);
        elementTop += parseInt(document.defaultView.getComputedStyle(additionalinfo.parentElement.parentElement.parentElement).top);

        if (additionalinfoHeight >= elementTop) {
             additionalinfo.style.removeProperty("bottom");
             additionalinfo.style.top = 100+"%";
        }
        else {
            additionalinfo.style.bottom = 100+"%";
            additionalinfo.style.removeProperty("top");
        }

        var additionalinfoWidth = parseInt(document.defaultView.getComputedStyle(additionalinfo).width);

        var elementWidth = parseInt(document.defaultView.getComputedStyle(additionalinfo.parentElement.parentElement).width);

        var elementLeft = parseInt(document.defaultView.getComputedStyle(additionalinfo.parentElement.parentElement).left);

        var boxsize = parseInt(document.defaultView.getComputedStyle(resize).width)

        if (0.5*additionalinfoWidth > elementLeft){
            if (elementLeft == 0){
                additionalinfo.style.right = 100 + "%";
                additionalinfo.style.transform = "translateX("+additionalinfoWidth+"px)";
            }
            else {
                additionalinfo.style.right = 0 + "%";
                additionalinfo.style.transform = "translateX(" + (additionalinfoWidth*0.5-elementWidth*0.5+10) +"px)";
            }
        }
        else if (elementLeft + 0.5*elementWidth + 0.5*additionalinfoWidth > boxsize){
            additionalinfo.style.right = 0 + "%";
            additionalinfo.style.transform = "translateX("+(boxsize-(elementLeft + elementWidth)) +"px)";
            if (elementLeft + elementWidth == boxsize) {
                additionalinfo.style.right = 0 + "%";
                additionalinfo.style.transform = "translateX(" + (boxsize - (elementLeft + elementWidth)) + "px)";
            }
            else {
                additionalinfo.style.right = 0 + "%";
                additionalinfo.style.transform = "translateX(" + (boxsize - (elementLeft + elementWidth)) + "px)";
            }
        }
        else {
            additionalinfo.style.right = 50 + "%";
            additionalinfo.style.transform = "translateX(50 %)";
        }
    }
    var contentTextList = document.getElementsByClassName("contenttextholder");
    for(let i=0; i<contentTextList.length; i++){
        fitText(contentTextList.item(i), 0.8);
    }
}

function mousedown(event) {
    if (resize.addEventListener) {
        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);
    }
    else {
        window.attachEvent("onmousemove", mousemove);
        window.attachEvent("onmouseup", mouseup);
    }

    let prevX = event.clientX;
    let prevY = event.clientY;

    function mousemove(event) {
        let newX = prevX - event.clientX;
        let newY = prevY - event.clientY;

        var startTop = parseInt(document.defaultView.getComputedStyle(resize).top);
        var startLeft = parseInt(document.defaultView.getComputedStyle(resize).left);

        resize.style.left = startLeft - newX + "px";
        resize.style.top = startTop - newY + "px";

        var newWidth = parseInt(document.defaultView.getComputedStyle(resize).width);
        var newHeight = parseInt(document.defaultView.getComputedStyle(resize).height);
        var newTop = parseInt(document.defaultView.getComputedStyle(resize).top);
        var newLeft = parseInt(document.defaultView.getComputedStyle(resize).left);

        if (newTop > 0) {
            resize.style.top = 0 + 'px';
        }
        else if (newTop < minsize - newHeight) {
            resize.style.top = (minsize - newHeight) + 'px';
        }

        if (newLeft > 0) {
            resize.style.left = 0 + 'px';
        }
        else if (newLeft < minsize - newWidth) {
            resize.style.left = (minsize - newWidth) + 'px';
        }

        prevX = event.clientX;
        prevY = event.clientY;
        orientateAdditionalInfo();
    }

    function mouseup() {
        if (window.removeEventListener) {
            window.removeEventListener("mousemove", mousemove);
            window.removeEventListener("mouseup", mouseup);
        }
        else {
            if(window.detachEvent){
                window.detachEvent("onmousemove", mousemove);
                window.detachEvent("onmouseup", mouseup);
            }
        }
    }
}

function scrollevent(event) {
    event.preventDefault();

    var startWidth = parseInt(document.defaultView.getComputedStyle(resize).width);
    var startHeight = parseInt(document.defaultView.getComputedStyle(resize).height);
    var startTop = parseInt(document.defaultView.getComputedStyle(resize).top);
    var startLeft = parseInt(document.defaultView.getComputedStyle(resize).left);

    var position = getRelativeCoordinates(event, resize);

    var relativeXPosition = (position.x) / startWidth;
    var relativeYPosition = (position.y) / startHeight;

    if (!checkScrollDirectionIsUp(event)) {
        if (startHeight <= minsize || startWidth <= minsize) {
            return;
        }

        resize.style.top = (startTop + scaleFactor * 0.5) + 'px';
        resize.style.left = (startLeft + scaleFactor * 0.5) + 'px';
        resize.style.height = (startHeight - scaleFactor) + 'px';
        resize.style.width = (startWidth - scaleFactor) + 'px';



    } else {
        if (startHeight >= maxsize || startWidth >= maxsize) {
            return;
        }

        resize.style.top = (startTop - scaleFactor * 0.5) + 'px';
        resize.style.left = (startLeft - scaleFactor * 0.5) + 'px';
        resize.style.height = (startHeight + scaleFactor) + 'px';
        resize.style.width = (startWidth + scaleFactor) + 'px';
    }

    var newWidth = parseInt(document.defaultView.getComputedStyle(resize).width);
    var newHeight = parseInt(document.defaultView.getComputedStyle(resize).height);
    var newTop = parseInt(document.defaultView.getComputedStyle(resize).top);
    var newLeft = parseInt(document.defaultView.getComputedStyle(resize).left);

    var newPosition = getRelativeCoordinates(event, resize);

    var Xoffset = parseInt(newPosition.x - (relativeXPosition * newWidth));
    var Yoffset = parseInt(newPosition.y - (relativeYPosition * newHeight));

    resize.style.left = (newLeft + Xoffset) + 'px';
    resize.style.top = (newTop + Yoffset) + 'px';

    if (newTop > 0) {
        resize.style.top = 0 + 'px';
    }
    else if (newTop < minsize - newHeight) {
        resize.style.top = (minsize - newHeight) + 'px';
    }

    if (newLeft > 0) {
        resize.style.left = 0 + 'px';
    }
    else if (newLeft < minsize - newWidth) {
        resize.style.left = (minsize - newWidth) + 'px';
    }
    orientateAdditionalInfo();
}

function getRelativeCoordinates(event, referenceElement) {

    const position = {
        x: event.pageX,
        y: event.pageY
    };

    const offset = {
        left: referenceElement.offsetLeft,
        top: referenceElement.offsetTop
    };

    let reference = referenceElement.offsetParent;

    while (reference) {
        offset.left += reference.offsetLeft;
        offset.top += reference.offsetTop;
        reference = reference.offsetParent;
    }

    return {
        x: position.x - offset.left,
        y: position.y - offset.top,
    };

}

function checkScrollDirectionIsUp(event) {
    if (event.wheelDelta) {
        return event.wheelDelta > 0;
    }
    return event.deltaY < 0;
}