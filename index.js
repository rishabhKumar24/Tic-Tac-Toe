const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector('.btn');

//Initially initialize all the variables
let currentPlayer;
let gameGrid;
const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//Function to initialize the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""]; //Empty grid
    //Need to remove the text from all the boxes in UI also
    boxes.forEach((box, index) => {
        box.innerText = "";
        box.style.pointerEvents = "all"; //Enable clicks on the boxes
        box.classList.remove('win'); //Remove any winning class if present
    });
    newGameBtn.classList.remove('active');
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
};

initGame(); //Called to initialize the game

//Function to handle box click
boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    });
});

//Function to handle box click
function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none"; //Disable further clicks on this box
        //swap the turn
        swapTurn();
        //Check if player worn or not?
        checkGameOver();
    
    }
};

//Function to swap the turn
function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X"
    }

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
};

//Function to check if the game is over
function checkGameOver() {
    let answer = "";
    winningPositions.forEach((position) => {
        if ( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "" ) &&
        (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {


            //Check if the current player is X
            if (gameGrid[position[0]] === "X") {
                answer = "X";
            }
            else {
                answer = "O";
            }
            
            //Now we know X/O won
            boxes[position[0]].classList.add('win');
            boxes[position[1]].classList.add('win');    
            boxes[position[2]].classList.add('win');
        }
    });
    // If answer is not empty, it means we have a winner
    if (answer !== "") {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add('active');
        boxes.forEach((box) => {
            box.style.pointerEvents = "none"; //Disable further clicks on all boxes
        });
    }

    //When all boxes are filled and no winner
    else if (!gameGrid.includes("")) {
        gameInfo.innerText = `Game Tied`;
        newGameBtn.classList.add('active');
        boxes.forEach((box) => {
            box.style.pointerEvents = "none"; //Disable further clicks on all boxes
        });
    }
};

//Function to handle new game button click
newGameBtn.addEventListener('click', initGame);