const msg1 = 'Hello there!';
const msg2 = 'Thanks for dropping by!';
const h1 = document.querySelector('h1');
const skip = document.querySelector('#skip');
let index = 0;

const displayLoading = ()=>{
    h1.classList.add('loading');
}

const displaymsg1 = () => {
    if (index <= msg1.length) {
        h1.innerText = msg1.slice(0, index++);
        setTimeout(displaymsg1, 100);
    }
}

const displaymsg2 = () => {
    if (index <= msg2.length) {
        h1.innerText = msg2.slice(0, index++);
        setTimeout(displaymsg2, 100)
    }
}

let skipBtnFadeInTimeout;
skip.addEventListener('click', ()=>{window.location.href='website/about.html';});
function fadeInSkipBtn() {
    if (parseInt(skip.style.opacity) < 1) {
        skip.style.opacity = parseFloat(skip.style.opacity) + 0.01;
        clearTimeout(skipBtnFadeInTimeout);
        skipBtnFadeInTimeout = setTimeout(fadeInSkipBtn, 10);
    }
}
setTimeout(fadeInSkipBtn, 3000); //start fading in skip button after 3 seconds

setTimeout(displaymsg1, 2000);
setTimeout(()=>{h1.innerText=''; index=0; displaymsg2();}, 5000);
setTimeout(()=>{h1.innerText=''; index=0;}, 9000);
setTimeout(()=>{window.location.href='website/about.html';}, 10000);