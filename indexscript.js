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

skip.addEventListener('click', ()=>{window.location.href='website/about.html';});

setTimeout(displaymsg1, 3000);
setTimeout(()=>{h1.innerText=''; index=0; displaymsg2();}, 6000);
setTimeout(()=>{h1.innerText=''; index=0;}, 10000);
setTimeout(()=>{window.location.href='website/about.html';}, 11000);