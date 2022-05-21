//started 180522 0400

const allCircles = document.querySelectorAll('.circle');
let board = []; for (let i=0; i<42; i++) {board.push('')}


setInterval(()=>{
    updateVisuals();
}, 100)

let _ = 1;
for (let circle of allCircles) {
    circle.addEventListener('click', (e)=>{
        if (checkIfValid(e.target.id)) {
            if (_%2===1) {board[parseInt(e.target.id.slice(1))] = 'red';}
            else {board[parseInt(e.target.id.slice(1))] = 'yellow';}
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