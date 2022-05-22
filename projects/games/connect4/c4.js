//started 180522 0400. will continue after booking out of camp :")
//220522 0000 finally back working on this
//230522 0000 finally doneee. was stuck for so long because program keeps running out of memory(presumably) and i was unaware that it was a memory issue and not a code issue.
//230522 0213 finished adding extra options - difficulty, player/AI start

//show grid numbers
//for (let i=0; i<42; i++) {document.querySelector(`#c${i}`).innerText = i;}

const allCircles = document.querySelectorAll('.circle');
const body = document.querySelector('body');
let board = []; 
const boardRefresh = ()=>{board = []; for (let i=0; i<42; i++) {board.push('');}}; boardRefresh();
let gameplay = true;
let winner = null;
let maxSearches = 3; //easy: 3 med: 5 hard: 8


setInterval(()=>{
    winner = getGameStatus(board);
    if (winner !== null) {gameover();}
}, 100)

const easyBtn = document.querySelector('#easy');
const medBtn = document.querySelector('#medium');
const hardBtn = document.querySelector('#hard');

easyBtn.addEventListener('click', ()=>{
    easyBtn.classList.add('active');
    medBtn.classList.remove('active');
    hardBtn.classList.remove('active');

    maxSearches = 3;
    boardRefresh();
    updateVisuals();
    body.style.backgroundColor = 'rgb(52, 60, 64)';
    gameplay = true;
    refreshValidMoves(board);
    highlightValidMoves();

    if (aiStartBtn.classList[1] === 'active') {aiStart();}
})

medBtn.addEventListener('click', ()=>{
    easyBtn.classList.remove('active');
    medBtn.classList.add('active');
    hardBtn.classList.remove('active');

    maxSearches = 5;
    boardRefresh();
    updateVisuals();
    body.style.backgroundColor = 'rgb(52, 60, 64)';
    gameplay = true;
    refreshValidMoves(board);
    highlightValidMoves();

    if (aiStartBtn.classList[1] === 'active') {aiStart();}
})

hardBtn.addEventListener('click', ()=>{
    easyBtn.classList.remove('active');
    medBtn.classList.remove('active');
    hardBtn.classList.add('active');

    maxSearches = 8;
    boardRefresh();
    updateVisuals();
    body.style.backgroundColor = 'rgb(52, 60, 64)';
    gameplay = true;
    refreshValidMoves(board);
    highlightValidMoves();

    if (aiStartBtn.classList[1] === 'active') {aiStart();}
})

const playerStartBtn = document.querySelector('#playerStart');
const aiStartBtn = document.querySelector('#aiStart');

playerStartBtn.addEventListener('click', ()=>{
    playerStartBtn.classList.add('active');
    aiStartBtn.classList.remove('active');

    boardRefresh();
    updateVisuals();
    body.style.backgroundColor = 'rgb(52, 60, 64)';
    gameplay = true;
    refreshValidMoves(board);
    highlightValidMoves();
})

aiStartBtn.addEventListener('click', ()=>{
    playerStartBtn.classList.remove('active');
    aiStartBtn.classList.add('active');

    boardRefresh();
    updateVisuals();

    aiStart();
    body.style.backgroundColor = 'rgb(52, 60, 64)';
    gameplay = true;
    refreshValidMoves(board);
    highlightValidMoves();
})

for (let circle of allCircles) {
    circle.addEventListener('click', (e)=>{
        if (gameplay) {
            if (checkIfValid(e.target.id)) {
                unhighlight();
                {board[parseInt(e.target.id.slice(1))] = 'red';}

                updateVisuals();
                winner = getGameStatus(board);

                if (gameplay) {
                    setTimeout(()=>{aiMove(board);}, 0); //setTimeout to allow updateVisuals() changes to be seen. tbh idk why also
                }
            }
        }
    })
}

const updateVisuals = ()=>{
    for (let i=0; i<board.length; i++) {
        if (board[i] !== '') {document.querySelector(`#c${i}`).style.backgroundColor = board[i];}
        else {document.querySelector(`#c${i}`).style.backgroundColor = 'rgb(78, 78, 78)';}
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

//highlight valid moves
let validMoves = [];
const refreshValidMoves = (b)=>{
    validMoves = [];
    for (let i=0; i<b.length; i++) {
        if (i===41||i===40||i===39||i===38||i===37||i===36||i===35) {
            if (b[i] === '') {validMoves.push(i);}
        }
        if (b[i] !== '' && b[i-7] === '') {validMoves.push(i-7);} //do not put else if or 2nd last row will be bugged
    }
};
refreshValidMoves(board);

const highlightValidMoves = ()=>{
    for (let index of validMoves) {document.querySelector(`#c${index}`).classList.add('highlight');}
};
highlightValidMoves();

const unhighlight = ()=>{
    for (let i of document.querySelectorAll('.highlight')) {i.classList.remove('highlight');}
};

//ai move
const aiMove = (tempBoard)=>{
    let bestMove;
    let bestScore = -Infinity;
    for (let i=0; i<tempBoard.length; i++){
        if (i>34 && i<42 || tempBoard[i+7] !== '') { //if move is valid
            if (tempBoard[i] === '') { //if spot is free
                tempBoard[i] = 'yellow';
                let score = minimax(tempBoard, 0, false, -Infinity, Infinity);
                console.log(score, i)
                tempBoard[i] = '';
                if (score > bestScore) { //>= to prevent undefined moves 
                    bestScore = score;
                    bestMove = i;
                }
            }
        }
    }
    board[bestMove] = 'yellow';
    updateVisuals();
    console.log(`Last move by AI: ${bestMove}`);
    refreshValidMoves(board);
    highlightValidMoves();
}

const scoreValues = {
    'player': -100,
    'draw': 0,
    'ai': 100
};

const minimax = (tempBoard, depth, isMaximizing, alpha, beta)=>{
    let tempWinner = getGameStatus(tempBoard);
    if (tempWinner !== null || depth === maxSearches) { //depth for how many moves ahead u want to search for 
        if (tempWinner === 'player') {return scoreValues[tempWinner]+depth;} //to make AI take the longest path to losing
        else if (tempWinner === 'ai') {return scoreValues[tempWinner]-depth;}
        else if (tempWinner === 'draw') {return scoreValues[tempWinner];}
        else {return 0;}
    }
    else {
        if (isMaximizing) {
            let maxScore = -Infinity;
            for (let i=0; i<tempBoard.length; i++){
                if (i>34 && i<42 || tempBoard[i+7] !== '') {
                    if (tempBoard[i] === '') {
                        tempBoard[i] = 'yellow';
                        let score1 = minimax(tempBoard, depth+1, false, alpha, beta);
                        tempBoard[i] = '';
                        maxScore = Math.max(score1, maxScore);
                        //ab pruning
                        alpha = Math.max(alpha, score1);
                        if (beta <= alpha) {break;}
                    }
                }
            }
            return maxScore;
        }
        else {
            let minScore = Infinity;
            for (let i=0; i<tempBoard.length; i++){
                if (i>34 && i<42 || tempBoard[i+7] !== '') {
                    if (tempBoard[i] === '') {
                    tempBoard[i] = 'red';
                    let score2 = minimax(tempBoard, depth+1, true, alpha, beta);
                    tempBoard[i] = '';
                    minScore = Math.min(score2, minScore);
                    //ab pruning
                    beta = Math.min(beta, score2);
                    if (beta <= alpha) {break;}
                    }
                }
            }
            return minScore;
        }
    }
}

//ai starts first
const aiStart = ()=>{
    board[38] = 'yellow';
    updateVisuals();
    refreshValidMoves(board);
    highlightValidMoves();
};

//for mobile devices - force zoom out
(function zoomOutMobile() {
    if (window.innerWidth <= 660) {
        alert('This game may be difficult to play on devices with a small screen, please consider switching to a PC/laptop for the full experience!');
        console.log('resizing..');
        var viewport = document.querySelector('meta[name="viewport"]');
    
        if ( viewport ) {
        viewport.content = "initial-scale=0.1";
        viewport.content = "width=660";
        }
    }
})();
