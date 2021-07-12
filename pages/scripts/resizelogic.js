const maxsize = 3000;
const minsize = 900;
const scaleFactor = 10; // minsize muss durch scaleFactor teilbar sein

const resize = document.querySelector(".resize");

positionElements();

var scaleSize = convertAbsoluteUnitsToRelative();
orientateAdditionalInfo();



if (resize.addEventListener) {
    resize.addEventListener("wheel", scrollevent);
    resize.addEventListener("mousedown", mousedown);
}
else {
    resize.onwheel = scrollevent;
    resize.attachEvent("onmousedown", mousedown);
}

function positionElements(){
    var personList = Array.from(document.getElementsByClassName("content"));
    var generationList = [[], []];

    for (var i=0; i<personList.length; i++){
        if (personList[i].getAttribute("data-mutter") == "" && personList[i].getAttribute("data-vater") == ""){
            generationList[1].push(personList[i]);
            personList.splice(i, 1);
            i--;
        }
    }

    for (var i=0; i<generationList[1].length; i++) {
        var currentId = generationList[1][i].getAttribute("data-id");
        for (var j=0; j<personList.length; j++) {
            if (personList[j].getAttribute("data-mutter") == currentId || personList[j].getAttribute("data-vater") == currentId || personList[j].getAttribute("data-ehepartner") == currentId) {
                generationList[0].push(generationList[1][i]);
                generationList[1].splice(i, 1);
                i--;
                break;
            }
        }
    }


    while (personList.length > 0) {
        generationList.push([]);
        for (var i=0; i<personList.length; i++) {
            var mutter = false;
            var vater = false;
            var mutterId = personList[i].getAttribute("data-mutter");
            var vaterId = personList[i].getAttribute("data-vater");
            if (mutterId == ""){
                mutter = true;
            }
            if (vaterId == "") {
                vater = true;
            }
            for (var j=0; j<generationList.length-1; j++){
                for (var k=0; k<generationList[j].length; k++){
                    if (!mutter && generationList[j][k].getAttribute("data-id") == mutterId){
                        mutter = true;
                    }
                    if (!vater && generationList[j][k].getAttribute("data-id") == vaterId) {
                        vater = true;
                    }
                    if (mutter && vater){
                        break;
                    }
                }
                if (mutter && vater) {
                    break;
                }
            }
            if (mutter && vater) {
                generationList[generationList.length-1].push(personList[i]);
                personList.splice(i, 1);
                i--;
            }

        }
    }

    for (var i=0; i<generationList.length; i++){
        for (var j=0; j<generationList[i].length; j++){
            var mutterId = generationList[i][j].getAttribute("data-mutter");
            var vaterId = generationList[i][j].getAttribute("data-vater");
            if (mutterId == "" && vaterId == ""){
                continue;
            }
            for (var k=0; k<j; k++){
                if (generationList[i][k].getAttribute("data-mutter") == mutterId && generationList[i][k].getAttribute("data-vater") == vaterId) {
                    var object = generationList[i][j];
                    generationList[i].splice(j, 1);
                    generationList[i].splice(k+1, 0, object);
                    break;
                }
            }
        }
    }

    for (var i = 0; i < generationList.length; i++){
        for (var j = 0; j < generationList[i].length; j++){
            var ehepartnerId = generationList[i][j].getAttribute("data-ehepartner");
            console.log(j);
            if (j != 0 && j != generationList[i].length-1){
                if (generationList[i][j - 1].getAttribute("data-id") == ehepartnerId || generationList[i][j + 1].getAttribute("data-id") == ehepartnerId){
                    continue;
                }
            }
            else if (j == 0 && generationList[i][j + 1].getAttribute("data-id") == ehepartnerId){
                continue;
            }
            else if (j == generationList[i].length && generationList[i][j - 1].getAttribute("data-id") == ehepartnerId) {
                continue;
            }
            for (var k = 0; k < j; k++){
                if (generationList[i][k].getAttribute("data-id") == ehepartnerId){
                    var object = generationList[i][k];
                    generationList[i].splice(k, 1);
                    generationList[i].splice(j + 1, 0, object);
                    break;
                }
            }
        }
    }

    for (var i = 0; i < generationList.length; i++) {
        for (var j = 0; j < generationList[i].length; j++) {
            var ehepartnerId = generationList[i][j].getAttribute("data-ehepartner");
            if (ehepartnerId == "") {
                continue;
            }
            var placed = false;
            for (var k = i+1; k < generationList.length; k++) {
                for (var l = 0; l < generationList[k].length; l++){
                    if (generationList[k][l].getAttribute("data-id") == ehepartnerId){
                        var object = generationList[i][j];
                        generationList[i].splice(j, 1);
                        generationList[k].splice(l + 1, 0, object);
                        placed = true;
                        j--;
                        break;
                    }
                }
                if (placed){
                    break;
                }
            }
        }
    }


    for (var i=0; i<generationList.length; i++){
        for (var j=0; j<generationList[i].length; j++){
            generationList[i][j].style.top = i * 100 + 50 +"px";
            if (j==0){
                generationList[i][j].style.left = 0 + "px";
            }
            else {
                if (generationList[i][j].getAttribute("data-ehepartner") == generationList[i][j-1].getAttribute("data-id")){
                    var elementWidth = parseInt(document.defaultView.getComputedStyle(generationList[i][j - 1]).width);
                    var elementLeft = parseInt(document.defaultView.getComputedStyle(generationList[i][j - 1]).left);

                    var newLeft = elementWidth + elementLeft;

                    generationList[i][j].style.left = newLeft + "px";
                }
                else {
                    var elementWidth = parseInt(document.defaultView.getComputedStyle(generationList[i][j - 1]).width);
                    var elementLeft = parseInt(document.defaultView.getComputedStyle(generationList[i][j - 1]).left);

                    var newLeft = elementWidth + elementLeft + 50;

                    generationList[i][j].style.left = newLeft + "px";
                }
            }
            
        }
    }
}

function convertAbsoluteUnitsToRelative(){
    var children = resize.children;

    var scaleSize = 0;
    scaleSize = parseInt(document.defaultView.getComputedStyle(resize).width);

    for (var i=0; i<children.length; i++){
        var element = children.item(i);
        var elementWidth = parseInt(document.defaultView.getComputedStyle(element).width);
        var elementHeight = parseInt(document.defaultView.getComputedStyle(element).height);
        var elementTop = parseInt(document.defaultView.getComputedStyle(element).top);
        var elementLeft = parseInt(document.defaultView.getComputedStyle(element).left);

        if (elementWidth + elementLeft > scaleSize){
            scaleSize = elementWidth + elementLeft;
        }
        if (elementHeight + elementTop > scaleSize){
            scaleSize = elementWidth + elementLeft;
        }
    }

    if (scaleSize < 800) {
        scaleSize = 800;
    }

    for (var i=0; i<children.length; i++){
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

    for (var i=0; i<additionalinfoList.length; i++) {
        var additionalinfo = additionalinfoList.item(i)
        var additionalinfoHeight = parseInt(document.defaultView.getComputedStyle(additionalinfo).height);

        var elementTop = parseInt(document.defaultView.getComputedStyle(additionalinfo.parentElement.parentElement).top);

        if (additionalinfoHeight >= elementTop) {
             additionalinfo.style.bottom = 0;
             additionalinfo.style.top = 100+"%";
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