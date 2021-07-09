const maxsize = 3000;
const minsize = 900;
const scaleFactor = 10; // minsize muss durch scaleFactor teilbar sein

const resize = document.querySelector(".resize");

var children = resize.children;

var scaleSize = 0;

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

for (var i=0; i<children.length; i++){
    var element = children.item(i);

    var elementWidth = parseInt(document.defaultView.getComputedStyle(element).width);
    var elementHeight = parseInt(document.defaultView.getComputedStyle(element).height);
    var elementTop = parseInt(document.defaultView.getComputedStyle(element).top);
    var elementLeft = parseInt(document.defaultView.getComputedStyle(element).left);

    console.log(elementWidth, elementHeight, elementTop, elementLeft);

    element.style.width = (elementWidth / scaleSize)*100 + '%';
    element.style.height = (elementHeight / scaleSize) * 100 + '%';
    element.style.top = (elementTop / scaleSize) * 100 + '%';
    element.style.left = (elementLeft / scaleSize) * 100 + '%';
}

if (resize.addEventListener) {
    resize.addEventListener("wheel", scrollevent);
    resize.addEventListener("mousedown", mousedown);
}
else {
    resize.onwheel = scrollevent;
    resize.attachEvent("onmousedown", mousedown);
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