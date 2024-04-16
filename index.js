let menuItems = document.querySelector(".header").querySelectorAll(".menuItem");
let arrowLeft = document.querySelector("#leftArrow");
let arrowRight = document.querySelector("#rightArrow");
let contactBtn = document.querySelector("#contactBtn");
let schools = document.querySelectorAll(".school1");
let certificates = document.querySelectorAll(".parentCert");
let devH = document.querySelector("#developer");
let cursorDot = document.querySelector("[data-cursor-dot]");
let cursorOutline = document.querySelector("[data-cursor-outline]");
let menuIcon = document.querySelector(".menuIcon");
let xIcon = document.querySelector(".xIcon");

let prevSec = document.querySelector(`.section[value='1']`);
let prevMenuItem = document.querySelector(`.menuItem[value='1']`);
prevMenuItem.id = "selectedMenuItem";
let val = 1;
let wheelCounter = 1;
arrowLeft.style = "display:none;";
let currentDev = "";
let dev = "Developer"; let devI = 0; let holdDev = 8;let eraseDev = false;
let dontScroll = false;
let prevVal;

function bottomVisible(){
    if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight - 1)
        return true;
    return false;
}

function topVisible(){
    if(window.scrollY == 0){
        return true;
    }
    return false;
}

let prevScroll = 0;

window.addEventListener("scroll", () => {
    if(document.querySelector(".header").id == "mobile-header")
        return;
    if(prevScroll < window.scrollY){
        document.querySelector(".header").id = "up";
    }
    else{
        document.querySelector(".header").id = "down";
    }
    prevScroll = window.scrollY;
})

menuIcon.addEventListener("click", () => {
    document.querySelector(".header").id = "mobile-header";
    document.querySelector(".header img").style = "display:none";
    menuIcon.style = "display:none";
    xIcon.style = "display:flex";
})

xIcon.addEventListener("click", () => {
    document.querySelector(".header").id = "mobile-header-slideup";
    setTimeout(() => {
        document.querySelector(".header img").style = "display:default;";
        menuIcon.style = "display:flex";
        xIcon.style = "display:none";
        document.querySelector(".header").id = "down";
    }, 701)
})

window.addEventListener("mousemove", (e) => {
    let posX = e.clientX;
    let posY = e.clientY;

    cursorDot.style.top = `${posY}px`;
    cursorDot.style.left = `${posX}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, {duration: 300, fill: "forwards"});
})

setInterval(() => {
    if(devI > dev.length && holdDev == 0){
        devI = 0;
        eraseDev = true;
        holdDev = 8;
    }
    else if(devI > dev.length && holdDev > 0){
        holdDev--;
    }
    if(devI <= dev.length && !eraseDev){   
        devH.innerHTML = currentDev + "_";
        if(devI < dev.length)
        currentDev += dev[devI];
        devI++;
    }
    else if(eraseDev){
        if(currentDev.length > 0){
            currentDev = currentDev.slice(0, -1);
        }
        else{
            eraseDev = false;
        }
        devH.innerHTML = currentDev + "_";
    }
}, 100)

schools.forEach((el) => {
    el.addEventListener("click", (element) => {
        let val = el.getAttribute("value");
        document.querySelector(`.parentCert[value='${val}']`).style = "display:flex;";
        dontScroll = true;
    })
})

certificates.forEach((el) => {
    el.addEventListener("click", () => {
        el.style = "display:none;";
        dontScroll = false;
    })
})

contactBtn.addEventListener("click", () => {
    document.querySelector("form").scrollIntoView({behavior:"smooth"});
})

menuItems.forEach((el) => {
    el.addEventListener("click", () => {
        if(window.innerWidth <= 755){
            document.querySelector(".header").id = "mobile-header-slideup";
            setTimeout(() => {
                document.querySelector(".header img").style = "display:default;";
                menuIcon.style = "display:flex";
                xIcon.style = "display:none";
                document.querySelector(".header").id = "down";
            }, 701)
        }

        val = el.getAttribute("value");
        if(window.innerWidth > 755){
        if(val == 1){
            arrowLeft.style = "display:none;";
            arrowRight.style = "display:block;";
        }
        else if(val == 4){
            arrowRight.style = "display:none;";
            arrowLeft.style = "display:block;";
        }
        else{
            arrowRight.style = "display:block;";
            arrowLeft.style = "display:block;";
        }}
        prevSec.style = "display:none;";
        prevMenuItem.id = "";
        document.querySelector(`.menuItem[value="${val}"]`).id = "selectedMenuItem";
        prevMenuItem = document.querySelector(`.menuItem[value="${val}"]`);
        document.querySelector(`.section[value='${val}']`).style =
        "display:flex;";
        if(prevVal > val)
            document.querySelector(`.section[value='${val}']`).className = "section slideFromLeft";
        else
            document.querySelector(`.section[value='${val}']`).className = "section slideFromRight";
        prevVal = val;
        prevSec = document.querySelector(`.section[value='${val}']`);
        wheelCounter = 1;
    })
})

arrowLeft.addEventListener("click", () => {
    arrowRight.style = "display:block;";
    prevSec.style = "display:none;";
    prevMenuItem.id = "";
    val--;
    if(window.innerWidth > 755)
        if(val == 1)
            arrowLeft.style = "display:none;";
    document.querySelector(`.menuItem[value="${val}"]`).id = "selectedMenuItem";
    prevMenuItem = document.querySelector(`.menuItem[value="${val}"]`);
    document.querySelector(`.section[value="${val}"`).style =
    "display:flex;";
    document.querySelector(`.section[value="${val}"`).className = "section slideFromLeft";
    prevVal = val;
    prevSec = document.querySelector(`.section[value='${val}']`);
    wheelCounter = 1;
})

arrowRight.addEventListener("click", () => {
    arrowLeft.style = "display:block;";
    prevSec.style = "display:none;";
    prevMenuItem.id = "";
    val++;
    if(window.innerWidth > 755)
        if(val == 4)
            arrowRight.style = "display:none;";
    document.querySelector(`.menuItem[value="${val}"]`).id = "selectedMenuItem";
    prevMenuItem = document.querySelector(`.menuItem[value="${val}"]`);
    document.querySelector(`.section[value="${val}"`).style =
    "display:flex;";
    document.querySelector(`.section[value="${val}"`).className = "section slideFromRight";
    prevVal = val;
    prevSec = document.querySelector(`.section[value='${val}']`);
    wheelCounter = 1;
})

window.addEventListener("wheel", function(event) {
    if(dontScroll)
        return;
    if(!bottomVisible() && event.deltaY > 0){
        return;
    }
    if(!topVisible() && event.deltaY < 0){
        return;
    }
    if(val == 4 && event.deltaY > 0){
        wheelCounter = 1;
        return;
    }
    else if(val == 1 && event.deltaY < 0){
        wheelCounter = 1;
        return;
    }
    if(wheelCounter <= 4){
        wheelCounter++;
        return;
    }
    prevSec.style = "display:none;";
    prevMenuItem.id = "";
    let inc = (event.deltaY > 0) ? 1 : -1;
    val = parseInt(val) + inc;
    if(window.innerWidth > 755){
    if(val == 1){
        arrowLeft.style = "display:none;";
        arrowRight.style = "display:block;";
    }
    else if(val == 4){
        arrowRight.style = "display:none;";
        arrowLeft.style = "display:block;";
    }
    else{
        arrowRight.style = "display:block;";
        arrowLeft.style = "display:block;";
    }}
    document.querySelector(`.menuItem[value="${val}"]`).id = "selectedMenuItem";
    prevMenuItem = document.querySelector(`.menuItem[value="${val}"]`);
    document.querySelector(`.section[value="${val}"`).style =
    "display:flex;";
    if(prevVal > val)
        document.querySelector(`.section[value='${val}']`).className = "section slideFromLeft";
    else
        document.querySelector(`.section[value='${val}']`).className = "section slideFromRight";
    prevVal = val;
    prevSec = document.querySelector(`.section[value='${val}']`);
    wheelCounter = 1;
})
