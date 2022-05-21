//140522 started making this to learn minimax algorithms
//150522 done, although AI seems to put a higher emphasis on not losing instead of winning. i guess thats normal?

//const playerIconCode = '&#10006;';
const playerIcon = '○';
//const aiIconCode =  '&#9587;';
const aiIcon = '✖';
let board = []; for (let i=0; i<9; i++) {board.push('');}
let winner;
const AllBtns = document.querySelectorAll('.box');
const container = document.querySelector('.container');
const playerBtn = document.querySelector('#player');
const aiBtn = document.querySelector('#ai');
const pvpBtn = document.querySelector('#pvp');
const retryText = document.querySelector('#retry');

setInterval(()=>{ //game loop?
    updateUiFromBoard(); //update visuals

    winner = gameWinner(); //check if anyone has won/lost/draw
    if (winner !== null) {
        showRetry(winner);
        if (winner === 'player') {container.style.backgroundColor = 'green';} 
        else if (winner === 'ai') {container.style.backgroundColor = 'red';} 
        else if (winner === 'draw') {container.style.backgroundColor = 'cadetblue';} 
    }

    //check if AI moves first has been selected
    aiMoveFirst();
}, 10)

let gameTurn = 1;
for (let btn of AllBtns) {
    btn.addEventListener('click', (e)=>{
        if (winner === null && gameMode !== 'pvp') {
            if (e.srcElement.innerText === '') {
                board[parseInt(e.target.id[1])] = playerIcon;
                
                //minimax stuff
                bestMove(board);
            }
            //console.log(e.srcElement.innerText)
        }
        //for pvp stuff
        else if (winner === null && gameMode === 'pvp') {
            if (isEven(gameTurn)) {
                board[parseInt(e.target.id[1])] = aiIcon;
                gameTurn++;
            }
            else {
                board[parseInt(e.target.id[1])] = playerIcon;
                gameTurn++;
            }
        }
    })
}

const isEven = (num)=>{
    if (num%2===0) {return true;}
    else {return false;}
}


let gameMode = 'player';
playerBtn.addEventListener('click', ()=>{
    gameMode = 'player';
    resetBoard();
    gameTurn = 1;
    document.querySelector('#result').style.display = 'none';
    container.style.backgroundColor = 'cadetblue';
    _ = 0;

    pvpBtn.classList.remove('active');
    aiBtn.classList.remove('active');
    playerBtn.classList.add('active');
})

aiBtn.addEventListener('click', ()=>{
    gameMode = 'ai';
    resetBoard();
    gameTurn = 1;
    document.querySelector('#result').style.display = 'none';
    container.style.backgroundColor = 'cadetblue';
    _ = 0;

    pvpBtn.classList.remove('active');
    playerBtn.classList.remove('active');
    aiBtn.classList.add('active');
})

pvpBtn.addEventListener('click', ()=>{
    gameMode = 'pvp';
    resetBoard();
    gameTurn = 1;
    document.querySelector('#result').style.display = 'none';
    container.style.backgroundColor = 'cadetblue';
    _ = 0;

    pvpBtn.classList.add('active');
    playerBtn.classList.remove('active');
    aiBtn.classList.remove('active');
})

let _ = 0;
const aiMoveFirst = ()=>{ //make ai go first if AI start first is selected
    if (!_) {
        if (aiBtn.classList[0] === 'active') {
            resetBoard();
            bestMove(board); 
            _++;
            console.log(_)
        }
    }
}

const showRetry = (result)=>{
    document.querySelector('#result').style.display = 'block';
    if (gameMode !== 'pvp') {
        if (result === 'player') {
            retryText.innerText = 'You win!';
        }
        else if (result === 'ai') {
            retryText.innerText = 'You lost!';
        }
        else {
            retryText.innerText = "It's a draw!";
        }
    }
    else if (gameMode === 'pvp') {
        if (result === 'player') {
            retryText.innerText = 'Player 1 wins!';
        }
        else if (result === 'ai') {
            retryText.innerText = 'Player 2 wins!';
        }
        else {
            retryText.innerText = "It's a draw!";
        }
    }
}

const resetBoard = ()=>{
    board = [];
    for (let i=0; i<9; i++) {board.push('');}
}

const updateUiFromBoard = ()=>{
    for (let i=0; i<9; i++) {
        document.querySelector(`#b${i}`).innerText = board[i];
    }
}

const CheckIfPlayerWon = ()=>{
    if (board[0] === playerIcon) {
        if (board[1] === playerIcon && board[2] === playerIcon) {return true;}
        if (board[3] === playerIcon && board[6] === playerIcon) {return true;}
        if (board[4] === playerIcon && board[8] === playerIcon) {return true;}
    }
    if (board[1] === playerIcon) {
        if (board[4] === playerIcon && board[7] === playerIcon) {return true;}
    }
    if (board[2] === playerIcon) {
        if (board[4] === playerIcon && board[6] === playerIcon) {return true;}
        if (board[5] === playerIcon && board[8] === playerIcon) {return true;}
    }
    if (board[3] === playerIcon) {
        if (board[4] === playerIcon && board[5] === playerIcon) {return true;}
    }
    if (board[4] === playerIcon) {}
    if (board[5] === playerIcon) {}
    if (board[6] === playerIcon) {
        if (board[7] === playerIcon && board[8] === playerIcon) {return true;}
    }
    if (board[7] === playerIcon) {}
    if (board[8] === playerIcon) {}

    return false;
}

const CheckIfPlayerLost = ()=>{
    if (board[0] === aiIcon) {
        if (board[1] === aiIcon && board[2] === aiIcon) {return true;}
        if (board[3] === aiIcon && board[6] === aiIcon) {return true;}
        if (board[4] === aiIcon && board[8] === aiIcon) {return true;}
    }
    if (board[1] === aiIcon) {
        if (board[4] === aiIcon && board[7] === aiIcon) {return true;}
    }
    if (board[2] === aiIcon) {
        if (board[4] === aiIcon && board[6] === aiIcon) {return true;}
        if (board[5] === aiIcon && board[8] === aiIcon) {return true;}
    }
    if (board[3] === aiIcon) {
        if (board[4] === aiIcon && board[5] === aiIcon) {return true;}
    }
    if (board[4] === aiIcon) {}
    if (board[5] === aiIcon) {}
    if (board[6] === aiIcon) {
        if (board[7] === aiIcon && board[8] === aiIcon) {return true;}
    }
    if (board[7] === aiIcon) {}
    if (board[8] === aiIcon) {}
    
    return false;
}

const gameWinner = ()=>{
    if (CheckIfPlayerWon()) {return 'player';}
    else if (CheckIfPlayerLost()) {return 'ai';}
    else {
        for (let i of board) {
            if (i === '') {return null;} //there are still unselected cells remaining
        }
        return 'draw';
    }
}

//minimax

const minimaxScores = { //to set a score for each outcome. keys are the return values of gameWinner()
    'player': -1,
    'ai': 1,
    'draw': 0
};

function bestMove(tempBoard){
    let moveIndex;
    let bestScore = -Infinity;
    for (let i=0; i<tempBoard.length; i++) {
        if (tempBoard[i] === '') { //if this spot is free
            tempBoard[i] = aiIcon; //check what will happen if AI selects this
            let score = minimax(tempBoard, false); //run the minimax algorithm as player
            tempBoard[i] = ''; //reset the spot value
            if (score > bestScore) {
                bestScore = score;
                moveIndex = i;
            }
        }
    }
    board[moveIndex] = aiIcon;
}

function minimax(tempBoard, depth, isMaximizing) {
    winner = gameWinner();
    if (winner !== null) { //if max-depth reached
        return minimaxScores[winner];
    }
    else {
        if (isMaximizing) { //if it is the AI's turn
            let maxScore = -Infinity;
            for (let i=0; i<tempBoard.length; i++) {
                if (tempBoard[i] === '') {
                    tempBoard[i] = aiIcon; 
                    let score1 = minimax(tempBoard, depth+1, false); //minimizing player's turn
                    tempBoard[i] = '';
                    maxScore = Math.max(maxScore, score1);
                }
            }
            return maxScore;
        }
        else if (!isMaximizing) { //if it is the player's turn
            let minScore = Infinity;
            for (let i=0; i<tempBoard.length; i++) {
                if (tempBoard[i] === '') {
                    tempBoard[i] = playerIcon; 
                    let score2 = minimax(tempBoard, depth+1, true); //maximizing player's turn
                    tempBoard[i] = '';
                    minScore = Math.min(minScore, score2);
                }
            }
            return minScore;
        }
    }
}