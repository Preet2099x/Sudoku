let numSelected = null;
let tileSelected = null;

let startTime;
let timerInterval;

const board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
];

const solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
];

window.onload = function () {
    setGame();
    startTimer(); // Call startTimer() when the window loads
};

function startTimer() {
    startTime = new Date();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const currentTime = new Date();
    const elapsedTimeInSeconds = Math.floor((currentTime - startTime) / 1000);

    const hours = Math.floor(elapsedTimeInSeconds / 3600);
    const minutes = Math.floor((elapsedTimeInSeconds % 3600) / 60);
    const seconds = elapsedTimeInSeconds % 60;

    const formattedTime = formatTime(hours, minutes, seconds);

    document.getElementById("timer").innerText = `Time: ${formattedTime}`;
}

function formatTime(hours, minutes, seconds) {
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function stopTimer() {
    clearInterval(timerInterval);
}

// Add the following functions to your code where appropriate, e.g., when the game is completed or reset

function gameCompleted() {
    // Call this function when the player successfully completes the Sudoku puzzle
    stopTimer();
    // Add any other actions you want to perform when the game is completed
}

function resetGame() {
    // Call this function when you want to reset the game
    stopTimer();
    // Reset the board and any other game-related variables
    setGame(); // Assuming setGame() also handles resetting the board
}

function setGame() {
    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        const number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // Board 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", handleTileClick); // Use a single click event for both setting and removing numbers
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function selectNumber() {
    if (numSelected !== null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function handleTileClick() {
    if (numSelected) {
        // Get the row and column indices from the tile's id
        const [row, col] = this.id.split("-").map(Number);

        // Check if the clicked tile corresponds to a fixed number
        if (board[row][col] === "-") {
            // If not a fixed number, update/remove the content of the clicked tile based on the current state
            if (this.innerText === numSelected.id) {
                // If the number is already set, remove it
                this.innerText = "";
            } else {
                // Otherwise, set the number
                this.innerText = numSelected.id;
            }
        } else {
            // If it's a fixed number, you may choose to handle this differently (e.g., show an error message)
            console.log("Cannot change the value of a fixed number.");
        }
    }
}
