//started 180522 0400. will continue after booking out of camp :")
//220522 0000 finally back working on this
//

//show grid numbers
for (let i=0; i<42; i++) {document.querySelector(`#c${i}`).innerText = i;}

const allCircles = document.querySelectorAll('.circle');
const body = document.querySelector('body');
let board = []; for (let i=0; i<42; i++) {board.push('');}
let winner = null;
let gameplay = true;


setInterval(()=>{
    updateVisuals();
    if (winner !== null) {gameover();}
}, 100)

//let _ = 1;
let forcedFirstMove = 0;
for (let circle of allCircles) {
    circle.addEventListener('click', (e)=>{
        if (gameplay) {
            if (checkIfValid(e.target.id)) {
                {board[parseInt(e.target.id.slice(1))] = 'red';} //if (_%2===1)
                //else {board[parseInt(e.target.id.slice(1))] = 'yellow';}

                getGameStatus();

                if (gameplay) {
                    /*
                    if (forcedFirstMove === 0) {
                        if (board[38] === '') {board[38] = 'yellow'; forcedFirstMove++;}
                        else {aiMove(board);}
                    }
                    else {aiMove(board);}
                    */
                    aiMove(board);
                }
            }
        }
    })
}

const updateVisuals = ()=>{
    for (let i=0; i<board.length; i++) {
        if (board[i] !== '') {document.querySelector(`#c${i}`).style.backgroundColor = board[i];}
    }
}

const checkIfValid = (id)=>{
    let index = parseInt(id.slice(1));
    if (board[index] === '') {
        if (index === 35 ||
        index === 36 ||
        index === 37 ||
        index === 38 ||
        index === 39 ||
        index === 40 ||
        index === 41) {
            return true;
        }
        else if (board[index+7] !== '') {
            return true;
        }
        return false;
    }
}

//game status
const getGameStatus = ()=>{
    winner = null;

    for (let i=41; i>38; i--) {doChecksRight(i);}
    doChecksCenter(38);
    for (let i=37; i>34; i--) {doChecksLeft(i)}

    for (let i=34; i>31; i--) {doChecksRight(i);}
    doChecksCenter(31);
    for (let i=30; i>27; i--) {doChecksLeft(i)}

    for (let i=27; i>24; i--) {doChecksRight(i);}
    doChecksCenter(24);
    for (let i=23; i>20; i--) {doChecksLeft(i)}

    for (let i=20; i>17; i--) {doChecksRight(i);}
    doChecksCenter(17);
    for (let i=16; i>13; i--) {doChecksLeft(i)}

    for (let i=13; i>10; i--) {doChecksRight(i);}
    doChecksCenter(10);
    for (let i=9; i>6; i--) {doChecksLeft(i)}

    for (let i=6; i>3; i--) {doChecksRight(i);}
    doChecksCenter(3);
    for (let i=2; i>-1; i--) {doChecksLeft(i)}

    let count = 0;
    for (let spot of board) {
        if (spot === '') {count++;}
    }
    if (count === 0) {winner = 'draw';}
}

const doChecksRight = (index)=>{
    if (board[index] === 'red'){
        if (board[index-1] === 'red' && board[index-2] === 'red' && board[index-3] === 'red') {winner = 'player';}
        if (board[index-8] === 'red' && board[index-16] === 'red' && board[index-24] === 'red') {winner = 'player';}
        if (board[index-7] === 'red' && board[index-14] === 'red' && board[index-21] === 'red') {winner = 'player';}
    }
    if (board[index] === 'yellow'){
        if (board[index-1] === 'yellow' && board[index-2] === 'yellow' && board[index-3] === 'yellow') {winner = 'ai';}
        if (board[index-8] === 'yellow' && board[index-16] === 'yellow' && board[index-24] === 'yellow') {winner = 'ai';}
        if (board[index-7] === 'yellow' && board[index-14] === 'yellow' && board[index-21] === 'yellow') {winner = 'ai';}
    }
}

const doChecksCenter = (index)=>{
    if (board[index] === 'red'){
        if (board[index-1] === 'red' && board[index-2] === 'red' && board[index-3] === 'red') {winner = 'player';}
        if (board[index+1] === 'red' && board[index+2] === 'red' && board[index+3] === 'red') {winner = 'player';}
        if (board[index-8] === 'red' && board[index-16] === 'red' && board[index-24] === 'red') {winner = 'player';}
        if (board[index-6] === 'red' && board[index-12] === 'red' && board[index-18] === 'red') {winner = 'player';}
        if (board[index-7] === 'red' && board[index-14] === 'red' && board[index-21] === 'red') {winner = 'player';}
    }
    if (board[index] === 'yellow'){
        if (board[index-1] === 'yellow' && board[index-2] === 'yellow' && board[index-3] === 'yellow') {winner = 'ai';}
        if (board[index+1] === 'yellow' && board[index+2] === 'yellow' && board[index+3] === 'yellow') {winner = 'ai';}
        if (board[index-8] === 'yellow' && board[index-16] === 'yellow' && board[index-24] === 'yellow') {winner = 'ai';}
        if (board[index-6] === 'yellow' && board[index-12] === 'yellow' && board[index-18] === 'yellow') {winner = 'ai';}
        if (board[index-7] === 'yellow' && board[index-14] === 'yellow' && board[index-21] === 'yellow') {winner = 'ai';}
    }
}

const doChecksLeft = (index)=>{
    if (board[index] === 'red'){
        if (board[index+1] === 'red' && board[index+2] === 'red' && board[index+3] === 'red') {winner = 'player';}
        if (board[index-6] === 'red' && board[index-12] === 'red' && board[index-18] === 'red') {winner = 'player';}
        if (board[index-7] === 'red' && board[index-14] === 'red' && board[index-21] === 'red') {winner = 'player';}
    }
    if (board[index] === 'yellow'){
        if (board[index+1] === 'yellow' && board[index+2] === 'yellow' && board[index+3] === 'yellow') {winner = 'ai';}
        if (board[index-6] === 'yellow' && board[index-12] === 'yellow' && board[index-18] === 'yellow') {winner = 'ai';}
        if (board[index-7] === 'yellow' && board[index-14] === 'yellow' && board[index-21] === 'yellow') {winner = 'ai';}
    }
}

const gameover = ()=>{
    gameplay = false;
    if (winner === 'player') {body.style.backgroundColor = 'green'}
    else if (winner === 'ai') {body.style.backgroundColor = 'red'}
    else {body.style.backgroundColor = 'cadet blue'}
}
//end of game status

//ai move
let validMoves = [];
const aiMove = (tempBoard)=>{
    validMoves = [];
    for (let i=0; i<board.length; i++) {
        if (i===41||i===40||i===39||i===38||i===37||i===36||i===35) {
            if (board[i] === '') {validMoves.push(i);}
        }
        if (board[i] !== '' && board[i-7] === '') {validMoves.push(i-7);} //do not put else if or 2nd last row will be bugged
    }
    
    let bestMove;
    let bestScore = -Infinity;
    for (let spot of validMoves){
        tempBoard[spot] = 'yellow';
        let score = minimax(tempBoard, 0, false);
        console.log(score, spot)
        tempBoard[spot] = '';
        if (score >= bestScore) { //>= to prevent undefined moves 
            bestScore = score;
            bestMove = spot;
        }
    }
    board[bestMove] = 'yellow';
    console.log(`Last move by AI: ${bestMove}`);
}

scoreValues = {
    'player': -100,
    'draw': 0,
    'ai': 100
};

const minimax = (tempBoard, depth, isMaximizing)=>{
    getGameStatus();
    if (winner !== null) {
        if (winner === 'player') {return scoreValues[winner]+depth;} //to make AI take the longest path to losing
        else if (winner === 'ai') {return scoreValues[winner]-depth;}
        return scoreValues[winner];
    }
    else {
        if (isMaximizing) {
            let maxScore = -Infinity;
            for (let spot of validMoves) {
                if (tempBoard[spot] === '') {
                    tempBoard[spot] = 'yellow';
                    let score1 = minimax(tempBoard, depth+1, false);
                    tempBoard[spot] = '';
                    maxScore = Math.max(score1, maxScore);
                }
            }
            return maxScore;
        }
        else {
            let minScore = Infinity;
            for (let spot of validMoves) {
                if (tempBoard[spot] === '') {
                    tempBoard[spot] = 'red';
                    let score2 = minimax(tempBoard, depth+1, true);
                    tempBoard[spot] = '';
                    minScore = Math.min(score2, minScore);
                }
            }
            return minScore;
        }
    }
}

//ai starts first
//aiMove(board);