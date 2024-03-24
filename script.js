const board = document.getElementById('gameboard');
let score = 0;
let compareArr = [];


const pairs = [
    'r',
    'r',
    'b',
    'b',
    'y',
    'y',
    'o',
    'o',
    'g',
    'g',
    'p',
    'p',
    'h',
    'h',
    'c',
    'c',
    'l',
    'l',
]

board.addEventListener('click', gameLogic);

function gameLogic (e) {
    compareArr.push(e.srcElement);
    e.srcElement.classList.add(e.srcElement.getAttribute('data-color'));
    if(compareArr.length === 2){
        board.removeEventListener('click', gameLogic);
        checkForPairs();
        setTimeout(()=> {
            checkforWin();
            compareArr = [];
            board.addEventListener('click', gameLogic);
        },1000)
    }
    score++;
}

function checkforWin() {
    let pieces = [...board.children];
    let win = 0;

    pieces.forEach((piece)=>{
        if(piece.getAttribute('data-pair') === 'true') {
            win++;
        }
    })

    if(win === pieces.length){
        pieces.forEach((piece)=>{
            piece.remove();
        })
        let message = document.createElement('p');
        let moves = document.createElement('p');
        message.innerText = 'YOU WON!!!';
        moves.innerText = `It Took You: ${score} Moves`;
        document.body.append(message);
        document.body.append(moves);
    }
}

function checkForPairs() {
    if(compareArr[0].getAttribute('data-color') === compareArr[1].getAttribute('data-color') && compareArr[0] !== compareArr[1]){
        compareArr[0].setAttribute('data-pair','true');
        compareArr[1].setAttribute('data-pair','true');
    } else if(compareArr[0] === compareArr[1] && score !== 1) {
        compareArr[0].classList.remove(compareArr[0].getAttribute('data-color'));
        compareArr[1].classList.remove(compareArr[1].getAttribute('data-color'));
        // If same card clicked don't count it towards score
        score--;
        console.log(score);
    }
    else {
        // one second to remove colors
        setTimeout(()=> {
            compareArr[0].classList.remove(compareArr[0].getAttribute('data-color'));
            compareArr[1].classList.remove(compareArr[1].getAttribute('data-color'));
        },1000)
    }
}

function startGame() {
    document.getElementById('start').remove();
    shuffleBoard(pairs);
}

function shuffleBoard(arr){
    for(let i = 0; i < arr.length; i++){
        let tempVal = arr[i];
        // getting random value to switch current iterator with
        let randomVal = Math.floor(Math.random() * arr.length);

        arr[i] = arr[randomVal];
        arr[randomVal] = tempVal; 
    }
    createBoardItems(arr);
}

function createBoardItems (arr) {
    // iterating over array to create boxes
    arr.forEach((color) => {
        let boardItem = document.createElement('div');
        boardItem.classList.add('square');
        boardItem.setAttribute('data-pair', 'false');
        boardItem.setAttribute('data-color', `${color}`);
        board.append(boardItem);
    })
}