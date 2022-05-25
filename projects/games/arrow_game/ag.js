//final edit for mobile support on 130522 0331

const choices = ['UP', 'DOWN', 'LEFT', 'RIGHT', '&uarr;', '&darr;', '&larr;', '&rarr;'];
let correct = false;
let playerLost = false;
let playerScore = 0;
let playerHighscore = 0;
let speed; //higher number = higher speeds.

const command = document.querySelector('#command');
const timeBar = document.querySelector('#timebarGreen');
const score = document.querySelector('#score');
const highscore = document.querySelector('#highscore');
const keypad = document.querySelector('#keypad'); 

const getRandNum = ()=>{return Math.floor(Math.random()*8);};
let randNum = -1;

const getRandChoice = ()=>{return choices[randNum]};
let randChoice = getRandChoice()

const updateCommand = ()=>{
    randNum = getRandNum(); randChoice = getRandChoice();
    command.innerHTML = randChoice;
}

const correctInputAction = ()=>{
    correct = true; 
    playerScore++; 
    if (speed<2.1) {speed+=0.1;}
    resetTimeBar(); 
    startTimeBar();
}

const wrongInputAction = ()=>{
    playerLost = true; 
    gameOver();
}

const gameOver = ()=>{
    document.querySelector('.container').style.backgroundColor = 'red';
    command.innerText = 'GAME OVER';
    document.querySelector('#gotext').style.display = 'flex';
    randNum = -1;
    keypad.classList.add('hide'); //hide keys after gameover to prevent accidental restarts
    if (screen.width < 821) {
        setTimeout(()=>{keypad.classList.remove('hide');}, 1000); //reinstate keys 1second after gameover
    }
    resetTimeBar();
}

const resetTimeBar = ()=>{timeBar.style.width = '80%'; timeBarWidth = 80;}

let timeout;
let timeBarWidth = 80; //original width is 80% as per css sheet
let timeBarPercentage = (timeBar.clientWidth/document.querySelector('body').clientWidth)*100; //not rly used rn
const startTimeBar = ()=>{ //why does it increase speed? we will never know
    if (parseInt(timeBar.style.width) > 0 && playerLost === false) { //clientWidth shows the width of element in px
        if (parseInt(timeBar.style.width) >= speed) {
            timeBar.style.width = `${timeBarWidth - speed}%`; //-0.5% of the timebar width every 10ms
        }
        else {timeBar.style.width = '0%'; console.log('h')} //if..else loop because timeBarWidth-speed wont register if speed>timeBarWidth since this is to be used as a %
        timeBarWidth -= speed;
        clearTimeout(timeout); //reason why it was speeding up was because a new timeout starts running everytime this code executes
        timeout = setTimeout(startTimeBar, 10); //recursion yay
    }
}

const checkTimeBar = ()=>{
    if (parseInt(timeBar.style.width) <= 1) {playerLost = true; gameOver();}
}

setInterval(checkTimeBar, 10); //check timebar width every 10ms


window.addEventListener('keydown', (e)=>{
    if (e.code === 'Space') {
        if (randNum === -1){
            command.style.fontSize = '5em'; 
            document.querySelector('.container').style.backgroundColor = '#a8dadc';
            document.querySelector('#gotext').style.display = 'none';
            playerScore = 0;
            speed = 0.1;
            playerLost = false;
            updateCommand();
            startTimeBar();
        }
    }
    if (randNum !== -1) {
        if (e.code === 'ArrowUp' || e.code === 'KeyW') { //UP
            if (randNum === 0 || randNum === 4) {correctInputAction();}
            else {wrongInputAction();}
        }
        else if (e.code === 'ArrowDown' || e.code === 'KeyS') { //DOWN
            if (randNum === 1 || randNum === 5) {correctInputAction();}
            else {wrongInputAction();}
        }
        else if (e.code === 'ArrowLeft' || e.code === 'KeyA') { //LEFT
            if (randNum === 2 || randNum === 6) {correctInputAction();}
            else {wrongInputAction();}
        }
        else if (e.code === 'ArrowRight' || e.code === 'KeyD') { //RIGHT
            if (randNum === 3 || randNum === 7) {correctInputAction();}
            else {wrongInputAction();}
        }
    }
    if (correct) {correct = false; updateCommand();}

    if (playerScore > playerHighscore) {
        playerHighscore = playerScore;
        localStorage.ag_highscore = playerHighscore; //high score on device storage
    }
    score.innerText = playerScore;
    highscore.innerText = playerHighscore;
})


//for mobile/tablet users
if (screen.width < 821) {
    /*
    alert('Mobile device detected!\nPlease switch to a PC/Laptop for the full experience!');
    window.location.href='../../../website/projects.html';
    */
    document.querySelector('p.info').innerText = 'Use the keypads to respond appropriately to the on-screen commands within the time limit';
    document.querySelector('p#command').innerText = 'Press any key to begin';
    document.querySelector('#keypad').classList.remove('hide');
    document.querySelector('p#gotext').innerText = 'Press any key to retry';
}
keypad.addEventListener('click', (e)=>{
    const keyPressed = e.target.id;
    console.log(keyPressed);
    
    if (randNum === -1) {
        document.querySelector('.container').style.backgroundColor = '#a8dadc';
        document.querySelector('#gotext').style.display = 'none';
        playerScore = 0;
        speed = 0.1;
        playerLost = false;
        keypad.classList.remove('hide');
        updateCommand();
        startTimeBar();
    }
    else if (keyPressed === 'up') { //UP
        if (randNum === 0 || randNum === 4) {correctInputAction();}
        else {wrongInputAction();}
    }
    else if (keyPressed === 'down') { //DOWN
        if (randNum === 1 || randNum === 5) {correctInputAction();}
        else {wrongInputAction();}
    }
    else if (keyPressed === 'left') { //LEFT
        if (randNum === 2 || randNum === 6) {correctInputAction();}
        else {wrongInputAction();}
    }
    else if (keyPressed === 'right') { //RIGHT
        if (randNum === 3 || randNum === 7) {correctInputAction();}
        else {wrongInputAction();}
    }
    if (correct) {correct = false; updateCommand();}

    if (playerScore > playerHighscore) {
        playerHighscore = playerScore;
        localStorage.ag_highscore = playerHighscore; //high score on device storage
    }
    score.innerText = playerScore;
    highscore.innerText = playerHighscore;
});

//set up a high score system that stores data on device
if (localStorage.ag_highscore) {
    playerHighscore = localStorage.ag_highscore;
    highscore.innerText = playerHighscore;
}