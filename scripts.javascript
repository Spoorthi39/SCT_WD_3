
const board = document.getElementById('game-board');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset-button');

let gameState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function createBoard() {
    gameState.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.setAttribute('data-cell-index', index);
        cellElement.innerHTML = cell;
        cellElement.addEventListener('click', handleCellClick);
        board.appendChild(cellElement);
    });
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    updateCell(clickedCell, clickedCellIndex);
    checkForWinner();
}

function updateCell(clickedCell, index) {
    gameState[index] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function checkForWinner() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = `${currentPlayer} has won!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusDisplay.innerHTML = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

resetButton.addEventListener('click', resetGame);

function resetGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = "";
    board.innerHTML = "";
    createBoard();
}

createBoard();
