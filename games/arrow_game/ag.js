const choices = ['UP', 'DOWN', 'LEFT', 'RIGHT', '&uarr;', '&darr;', '&larr;', '&rarr;'];
let correct = false;
let playerLost = false;
let playerScore = 0;
let playerHighscore = 0;
let speed = 50; //higher number = slower speeds.

const command = document.querySelector('#command');
const timeBar = document.querySelector('#timebarGreen');
const score = document.querySelector('#score');
const highscore = document.querySelector('#highscore');

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
    resetTimeBar();
}

const resetTimeBar = ()=>{timeBar.style.width = '80%';}

const startTimeBar = ()=>{ //why does it increase speed? we will never know
    if (timeBar.clientWidth > 0 && playerLost === false) { //1% is 10. playerLost var is there so that it doesnt continue after player lost
        timeBar.style.width = `${(timeBar.clientWidth - 10)/10}%`; 
        setTimeout(startTimeBar, speed); //recursion yay
    }
}

const checkTimeBar = ()=>{
    if (timeBar.clientWidth <= 0) {playerLost = true; gameOver();}
}

setInterval(checkTimeBar, 10); //check timebar width every 10ms


window.addEventListener('keydown', (e)=>{
    console.log(e.code);
    if (e.code === 'Space') {
        if (randNum === -1){
            command.style.fontSize = '5em'; 
            document.querySelector('.container').style.backgroundColor = '#a8dadc';
            document.querySelector('#gotext').style.display = 'none';
            playerScore = 0;
            playerLost = false;
            updateCommand();
            startTimeBar();
        }
    }
    else if (e.code === 'ArrowUp' || e.code === 'KeyW') { //UP
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
    if (correct) {correct = false; updateCommand();}

    if (playerScore > playerHighscore) {playerHighscore = playerScore;}
    score.innerText = playerScore;
    highscore.innerText = playerHighscore;
})


//To warn mobile users that this game isn't compatibile with their device
if (screen.width < 500) {
    alert('Mobile device detected!\nPlease switch to a PC/Laptop for the full experience!');
    window.location.href='../../website/projects.html';
}
