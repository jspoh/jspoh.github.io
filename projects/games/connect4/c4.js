//started 180522 0400. will continue after booking out of camp :")
//220522 0000 finally back working on this
//

//show grid numbers
for (let i=0; i<42; i++) {document.querySelector(`#c${i}`).innerText = i;}

const allCircles = document.querySelectorAll('.circle');
const body = document.querySelector('body');
let board = []; for (let i=0; i<42; i++) {board.push('');}
let gameplay = true;
let winner = null;


setInterval(()=>{
    updateVisuals();
    winner = getGameStatus(board);
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

                winner = getGameStatus(board);

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
const getGameStatus = (b)=>{
    let status;

    for (let i=41; i>38; i--) {
        status = doChecksRight(i, b);
        if (status === 'player') {return 'player';}
        else if (status === 'ai') {return 'ai';}
    }

    status = doChecksCenter(38, b);
    if (status === 'player') {return 'player';}
    else if (status === 'ai') {return 'ai';}

    for (let i=37; i>34; i--) {
        status = doChecksLeft(i, b);
        if (status === 'player') {return 'player';}
        else if (status === 'ai') {return 'ai';}
    }

    for (let i=34; i>31; i--) {
        status = doChecksRight(i, b);
        if (status === 'player') {return 'player';}
        else if (status === 'ai') {return 'ai';}
    }

    status = doChecksCenter(31, b);
    if (status === 'player') {return 'player';}
    else if (status === 'ai') {return 'ai';}

    for (let i=30; i>27; i--) {
        status = doChecksLeft(i, b);
        if (status === 'player') {return 'player';}
        else if (status === 'ai') {return 'ai';}
    }

    for (let i=27; i>24; i--) {
        status = doChecksRight(i, b);
        if (status === 'player') {return 'player';}
        else if (status === 'ai') {return 'ai';}
    }

    status = doChecksCenter(24, b);
    if (status === 'player') {return 'player';}
    else if (status === 'ai') {return 'ai';}

    for (let i=23; i>20; i--) {
        status = doChecksLeft(i, b);
        if (status === 'player') {return 'player';}
        else if (status === 'ai') {return 'ai';}
    }

    for (let i=20; i>17; i--) {
        status = doChecksRight(i, b);
        if (status === 'player') {return 'player';}
        else if (status === 'ai') {return 'ai';}
    }

    status = doChecksCenter(17, b);
    if (status === 'player') {return 'player';}
    else if (status === 'ai') {return 'ai';}

    for (let i=16; i>13; i--) {
        status = doChecksLeft(i, b);
        if (status === 'player') {return 'player';}
        else if (status === 'ai') {return 'ai';}
    }

    for (let i=13; i>10; i--) {
        status = doChecksRight(i, b);
        if (status === 'player') {return 'player';}
        else if (status === 'ai') {return 'ai';}
    }

    status = doChecksCenter(10, b);
    if (status === 'player') {return 'player';}
    else if (status === 'ai') {return 'ai';}

    for (let i=9; i>6; i--) {
        status = doChecksLeft(i, b);
        if (status === 'player') {return 'player';}
        else if (status === 'ai') {return 'ai';}
    }

    for (let i=6; i>3; i--) {
        status = doChecksRight(i, b);
        if (status === 'player') {return 'player';}
        else if (status === 'ai') {return 'ai';}
    }

    status = doChecksCenter(3, b);
    if (status === 'player') {return 'player';}
    else if (status === 'ai') {return 'ai';}

    for (let i=2; i>-1; i--) {
        status = doChecksLeft(i, b);
        if (status === 'player') {return 'player';}
        else if (status === 'ai') {return 'ai';}
    }

    let count = 0;
    for (let spot of board) {
        if (spot === '') {count++;}
    }
    if (count === 0) {return 'draw';}
    return null;
}

const doChecksRight = (index, b)=>{
    if (b[index] === 'red'){
        if (b[index-1] === 'red' && b[index-2] === 'red' && b[index-3] === 'red') {return 'player';}
        if (b[index-8] === 'red' && b[index-16] === 'red' && b[index-24] === 'red') {return 'player';}
        if (b[index-7] === 'red' && b[index-14] === 'red' && b[index-21] === 'red') {return 'player';}
    }
    if (b[index] === 'yellow'){
        if (b[index-1] === 'yellow' && b[index-2] === 'yellow' && b[index-3] === 'yellow') {return 'ai';}
        if (b[index-8] === 'yellow' && b[index-16] === 'yellow' && b[index-24] === 'yellow') {return 'ai';}
        if (b[index-7] === 'yellow' && b[index-14] === 'yellow' && b[index-21] === 'yellow') {return 'ai';}
    }
}

const doChecksCenter = (index, b)=>{
    if (b[index] === 'red'){
        if (b[index-1] === 'red' && b[index-2] === 'red' && b[index-3] === 'red') {return 'player';}
        if (b[index+1] === 'red' && b[index+2] === 'red' && b[index+3] === 'red') {return 'player';}
        if (b[index-8] === 'red' && b[index-16] === 'red' && b[index-24] === 'red') {return 'player';}
        if (b[index-6] === 'red' && b[index-12] === 'red' && b[index-18] === 'red') {return 'player';}
        if (b[index-7] === 'red' && b[index-14] === 'red' && b[index-21] === 'red') {return 'player';}
    }
    if (b[index] === 'yellow'){
        if (b[index-1] === 'yellow' && b[index-2] === 'yellow' && b[index-3] === 'yellow') {return 'ai';}
        if (b[index+1] === 'yellow' && b[index+2] === 'yellow' && b[index+3] === 'yellow') {return 'ai';}
        if (b[index-8] === 'yellow' && b[index-16] === 'yellow' && b[index-24] === 'yellow') {return 'ai';}
        if (b[index-6] === 'yellow' && b[index-12] === 'yellow' && b[index-18] === 'yellow') {return 'ai';}
        if (b[index-7] === 'yellow' && b[index-14] === 'yellow' && b[index-21] === 'yellow') {return 'ai';}
    }
}

const doChecksLeft = (index, b)=>{
    if (b[index] === 'red'){
        if (b[index+1] === 'red' && b[index+2] === 'red' && b[index+3] === 'red') {return 'player';}
        if (b[index-6] === 'red' && b[index-12] === 'red' && b[index-18] === 'red') {return 'player';}
        if (b[index-7] === 'red' && b[index-14] === 'red' && b[index-21] === 'red') {return 'player';}
    }
    if (b[index] === 'yellow'){
        if (b[index+1] === 'yellow' && b[index+2] === 'yellow' && b[index+3] === 'yellow') {return 'ai';}
        if (b[index-6] === 'yellow' && b[index-12] === 'yellow' && b[index-18] === 'yellow') {return 'ai';}
        if (b[index-7] === 'yellow' && b[index-14] === 'yellow' && b[index-21] === 'yellow') {return 'ai';}
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
    let tempWinner = getGameStatus(tempBoard);
    if (tempWinner !== null) {
        if (tempWinner === 'player') {return scoreValues[tempWinner]+depth;} //to make AI take the longest path to losing
        else if (tempWinner === 'ai') {return scoreValues[tempWinner]-depth;}
        return scoreValues[tempWinner];
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