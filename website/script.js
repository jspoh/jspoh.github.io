//event loop thing
/*
setInterval(()=>{
    //setBgForContactPage();
}, 100);
*/

//fade in elements
function animation() {
    const animated = document.querySelectorAll(".animated");
    const windowHeight = window.innerHeight; 
  
    for (let i of animated) {
        let elementTop = i.getBoundingClientRect().top; //finds distance between element top border and screen top
        let elementVisible = 100; //how much distance from screen bottom before animation comes in
        
        if (elementTop < windowHeight - elementVisible) { // if element top border comes above the element visible height
            i.classList.add("active");
        } 
        else {
            i.classList.remove("active");
        }
    }
}
  
window.addEventListener("scroll", animation);

//open tabs
function openTab(tabName) {
    const tabContent = document.querySelectorAll('.tabcontent');
    for (let i=0; i<tabContent.length;i++) { 
        tabContent[i].style.display = 'none'; //this hides all the tab elements
    }
    document.querySelector(`#${tabName}`).style.display = 'block'; //shows selected element

    const tablink = document.querySelectorAll('.tablink');
    for (let i=0; i<tablink.length;i++) {
        tablink[i].classList.remove('selected'); //removing selected class from all tablinks
    }
    document.querySelector(`.${tabName}`).classList.add('selected'); // adding selected class to the selected tablink
}

//back to top button
const bttButton = document.querySelector('#bttButton');
window.onscroll = ()=>{
    if (document.documentElement.scrollTop > 500 || document.body.scrollTop > 500) { 
        //document.body.scrollTop is deprecated by chrome but document.documentElement.scrollTop works. 1scroll = 100
        bttButton.style.opacity = '1';
        } else {
        bttButton.style.opacity = '0';
        }
};

//open/close drop down content in projects.html
function ocTab(id) {
    for (let classes of document.querySelector(id).classList) {
        if (classes === 'hide') {document.querySelector(id).parentElement.children[0].children[0].innerHTML = '&#x25B2;';}
        else {document.querySelector(id).parentElement.children[0].children[0].innerHTML = '&#x25BC;';} //change to arrow down
    }
    document.querySelector(id).classList.toggle('hide');
}

//set background to image if on contact page. not in use rn
/*
const setBgForContactPage = ()=>{
    if (document.title === 'Contact') {
        //document.querySelector('body').style.backgroundImage = "url('../lib/low-poly-grid-haikei.png')";
        document.querySelector('body').style.backgroundColor = '#748cab';
    }
    /*
   else {
       //document.querySelector('body').style.backgroundImage = 'none';
       document.querySelector('body').style.backgroundColor = '#1c2541';
    }
    *
}
*/