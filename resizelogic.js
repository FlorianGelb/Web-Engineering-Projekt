const maxsize = 1000;
const minsize = 500;
const scaleFactor = 10; // minsize muss durch scaleFactor teilbar sein

document.documentElement.style.setProperty("--sizeofwindow", minsize+"px");

const resize = document.querySelector(".resize");

resize.addEventListener("wheel", scrollevent);
resize.addEventListener("mousedown", mousedown);

function mousedown(event) {
    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    console.log("event");

    let prevX = event.clientX;
    let prevY = event.clientY;

    function mousemove(event) {
        let newX = prevX - event.clientX;
        let newY = prevY - event.clientY;

        startTop = parseInt(document.defaultView.getComputedStyle(resize).top);
        startLeft = parseInt(document.defaultView.getComputedStyle(resize).left);

        height = parseInt(document.defaultView.getComputedStyle(resize).height);
        width = parseInt(document.defaultView.getComputedStyle(resize).width);

        resize.style.left = startLeft - newX + "px";
        resize.style.top = startTop - newY + "px";

        newWidth = parseInt(document.defaultView.getComputedStyle(resize).width);
        newHeight = parseInt(document.defaultView.getComputedStyle(resize).height);
        newTop = parseInt(document.defaultView.getComputedStyle(resize).top);
        newLeft = parseInt(document.defaultView.getComputedStyle(resize).left);

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
        window.removeEventListener("mousemove", mousemove);
        console.log("up");
        window.removeEventListener("mouseup", mouseup);
    }
}

function scrollevent(event) {
    startWidth = parseInt(document.defaultView.getComputedStyle(resize).width);
    startHeight = parseInt(document.defaultView.getComputedStyle(resize).height);
    startTop = parseInt(document.defaultView.getComputedStyle(resize).top);
    startLeft = parseInt(document.defaultView.getComputedStyle(resize).left);

    var position = getRelativeCoordinates(event, resize);

    var relativeXPosition = (position.x) / startWidth;
    var relativeYPosition = (position.y) / startHeight;

    if (!checkScrollDirectionIsUp(event)) {
        console.log('UP');
        if (startHeight <= minsize || startWidth <= minsize){
            return;
        }

        resize.style.top = (startTop + scaleFactor*0.5) + 'px';
        resize.style.left = (startLeft + scaleFactor*0.5) + 'px';
        resize.style.height = (startHeight - scaleFactor) + 'px';
        resize.style.width = (startWidth - scaleFactor) + 'px';


        
    } else {
        console.log('Down');
        if (startHeight >= maxsize || startWidth >= maxsize) {
            return;
        }

        resize.style.top = (startTop - scaleFactor*0.5) + 'px';
        resize.style.left = (startLeft - scaleFactor*0.5) + 'px';
        resize.style.height = (startHeight + scaleFactor) + 'px';
        resize.style.width = (startWidth + scaleFactor) + 'px';
    }

    newWidth = parseInt(document.defaultView.getComputedStyle(resize).width);
    newHeight = parseInt(document.defaultView.getComputedStyle(resize).height);
    newTop = parseInt(document.defaultView.getComputedStyle(resize).top);
    newLeft = parseInt(document.defaultView.getComputedStyle(resize).left);

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