const menuItems = document.querySelector("#header").querySelectorAll(".menuItem");
const portfolioBtn = document.querySelector("#portfolioBtn");
const devH = document.querySelector("#developer");
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");
const menuIcon = document.querySelector(".menuIcon");
const xIcon = document.querySelector(".xIcon");

let prevSec = document.querySelector(`.section[value='1']`);
let prevMenuItem = document.querySelector(`.menuItem[value='1']`);
prevMenuItem.id = "selectedMenuItem";
let val = 1;
let currentDev = "";
let dev = "Developer"; let devI = 0; let holdDev = 8;let eraseDev = false;
let prevScroll = 0;

const windowSize = window.innerWidth; // checks window size to know if it is mobile or desktop
if(windowSize <= 768)
    document.querySelector("#header").classList.add("mobile-actual-header");
else
    document.querySelector("#header").classList.add("desktop-header");

window.addEventListener("scroll", () => {
    if(document.querySelector("#header").classList.contains("mobile-header"))
        return;
    if(prevScroll < window.scrollY){
        document.querySelector("#header").classList.remove("down");
        document.querySelector("#header").classList.add("up");
    }
    else{
        document.querySelector("#header").classList.remove("up");
        document.querySelector("#header").classList.add("down");
    }
    prevScroll = window.scrollY;
})

menuIcon.addEventListener("click", () => {
    document.querySelector("#header").classList.remove("down");
    document.querySelector("#header").classList.remove("up");
    document.querySelector("#header").classList.remove("mobile-actual-header");
    document.querySelector("#header").classList.add("mobile-header");
})

xIcon.addEventListener("click", () => {
    document.querySelector("#header").classList.add("mobile-header-slideup");
    setTimeout(() => {
        document.querySelector("#header").classList.remove("mobile-header");
        document.querySelector("#header").classList.remove("mobile-header-slideup");
        document.querySelector("#header").classList.add("mobile-actual-header");
        document.querySelector("#header").classList.add("down");
    }, 701)
})

portfolioBtn.addEventListener("click", () => {
    prevSec.style = "display:none;";
    prevMenuItem.id = "";
    val = 4;
    prevMenuItem = document.querySelector(`.menuItem[value="4"]`);
    prevMenuItem.id = "selectedMenuItem";
    prevSec = document.querySelector(`.section[value='4']`);
    prevSec.style = "display:flex;";
})

menuItems.forEach((el) => {
    el.addEventListener("click", () => {
        if(windowSize <= 768){
            document.querySelector("#header").classList.add("mobile-header-slideup");
            setTimeout(() => {
                document.querySelector("#header").classList.remove("mobile-header-slideup");
                document.querySelector("#header").classList.remove("mobile-header");
                document.querySelector("#header").classList.add("mobile-actual-header");
                document.querySelector("#header").classList.add("down");
            }, 701)
        }

        val = el.getAttribute("value");
        prevSec.style = "display:none;";
        prevMenuItem.id = "";
        el.id = "selectedMenuItem";
        prevMenuItem = el;
        document.querySelector(`.section[value='${val}']`).style = "display:flex;";
        prevSec = document.querySelector(`.section[value='${val}']`);
    })
});

//---------------------------------------------------------------------------------------------------------------------------------

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
}, 100);