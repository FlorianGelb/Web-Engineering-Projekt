const maxsize = 800;
const minsize = 280;

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

        if (startTop > 0){
            startTop = 0
        }
        else if (startTop < minsize - height) {
            startTop = minsize - height;
        }

        if (startLeft > 0) {
            startLeft = 0;
        }
        else if (startLeft < minsize - width) {
            startLeft = minsize - width;
        }

        resize.style.left = startLeft - newX + "px";
        resize.style.top = startTop - newY + "px";

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
    height = parseInt(document.defaultView.getComputedStyle(resize).height);
    width = parseInt(document.defaultView.getComputedStyle(resize).width);


    if (startTop > 0) {
        startTop = -5
    }
    else if (startTop < minsize - height) {
        startTop = minsize - height + 5;
    }

    if (startLeft > 0) {
        startLeft = -5;
    }
    else if (startLeft < minsize - width) {
        startLeft = minsize - width + 5;
    }

    if (checkScrollDirectionIsUp(event)) {
        console.log('UP');
        if (startHeight <= minsize || startWidth <= minsize){
            return;
        }

        resize.style.top = (startTop + 5) + 'px';
        resize.style.left = (startLeft + 5) + 'px';
        resize.style.height = (startHeight - 10) + 'px';
        resize.style.width = (startWidth - 10) + 'px';
        
    } else {
        console.log('Down');
        if (startHeight >= maxsize || startWidth >= maxsize) {
            return;
        }

        resize.style.top = (startTop - 5) + 'px';
        resize.style.left = (startLeft - 5) + 'px';
        resize.style.height = (startHeight + 10) + 'px';
        resize.style.width = (startWidth + 10) + 'px';
    }
    
}

function checkScrollDirectionIsUp(event) {
    if (event.wheelDelta) {
        return event.wheelDelta > 0;
    }
    return event.deltaY < 0;
}