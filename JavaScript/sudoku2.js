let numSelected = null;
let tileSelected = null;

let startTime;
let timerInterval;
let gameEnded = false;
let score = 0;

const board = [
    "5-94-----",
    "--3---69-",
    "-1------5",
    "-5-18----",
    "3---5---7",
    "----96-5-",
    "9------7-",
    "-38---5--",
    "-----71-3"
];

const solution = [
    "569478231",
    "473512698",
    "812369745",
    "257183964",
    "396254817",
    "184796352",
    "921835476",
    "738641529",
    "645927183"
];

window.onload = function () {
  setGame();
  startTimer(); // Call startTimer() when the window loads
  document.addEventListener("keydown", handleKeyPress);
};

function startTimer() {
  startTime = new Date();
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const currentTime = new Date();
  const elapsedTimeInSeconds = Math.floor((currentTime - startTime) / 1000);

  const timeLimitInSeconds = 300; // 5 minutes

  if (elapsedTimeInSeconds >= timeLimitInSeconds) {
    // Time limit reached, auto-submit the Sudoku
    submitSudoku();
    return;
  }

  const remainingTime = timeLimitInSeconds - elapsedTimeInSeconds;

  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;

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

let checkCount = 0;
const maxCheckLimit = 3;

function checkSudoku() {
  if (checkCount < maxCheckLimit) {
    const currentBoard = getCurrentBoardState();
    const isCorrect = compareBoards(currentBoard, solution);

    let delayPromise = Promise.resolve();

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const tile = document.getElementById(`${r}-${c}`);
        const isFixed = tile.classList.contains("tile-start");

        if (!isFixed) {
          const value = currentBoard[r][c];

          // Store the original background color
          const originalBackgroundColor = tile.style.backgroundColor;

          // Reset styles
          tile.style.backgroundColor = "";

          // Highlight correct and incorrect cells
          if (value === solution[r][c]) {
            tile.style.backgroundColor = "lightgreen"; // Correct cells in light green
          } else {
            tile.style.backgroundColor = "lightcoral"; // Incorrect cells in light coral
          }
        }
      }
    }

    // Reset the color after a delay (3000 milliseconds or 3 seconds)
    delayPromise = delayPromise.then(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
              const tile = document.getElementById(`${r}-${c}`);
              tile.style.backgroundColor = "";
            }
          }
          resolve();
        }, 3000);
      });
    });

    delayPromise.then(() => {
      // You can choose whether or not to show an alert
      // alert(isCorrect ? "Board is correct so far!" : "Board has mistakes.");

      checkCount++;

      if (checkCount === maxCheckLimit) {
        disableCheckButton();
      }
    });
  } else {
    alert("You've reached the maximum check limit.");
  }
}

function disableCheckButton() {
  const checkButton = document.getElementById("check");
  checkButton.disabled = true;
  checkButton.style.opacity = 0.5; // Optionally reduce opacity to indicate it's disabled
}

function getCurrentBoardState() {
  const currentBoard = [];
  for (let r = 0; r < 9; r++) {
    let row = "";
    for (let c = 0; c < 9; c++) {
      const tile = document.getElementById(`${r}-${c}`);
      row += tile.innerText || "-";
    }
    currentBoard.push(row);
  }
  return currentBoard;
}

function compareBoards(boardA, boardB) {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (boardA[r][c] !== boardB[r][c]) {
        return false; // Returns false if any cell doesn't match
      }
    }
  }
  return true; // Returns true only if all cells match
}

function submitSudoku() {
  if (!gameEnded) {
    const currentBoard = getCurrentBoardState();

    stopTimer(); // Stop the timer when the user submits

    // Calculate the score (for example, based on correct tiles)
    score = calculateScore(currentBoard);

    // Display the score
    displayScore();

    // You can choose to keep or remove the following line based on your preference
    // gameCompleted(); // Call the function to handle game completion

    // Set the flag to indicate the game has ended
    gameEnded = true;
  }
}

function clearBoard() {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const tile = document.getElementById(`${r}-${c}`);
      if (!tile.classList.contains("tile-start")) {
        tile.innerText = "";
      }
    }
  }
}

function handleKeyPress(event) {
  const key = event.key;
  if (parseInt(key) >= 1 && parseInt(key) <= 9) {
    if (numSelected) {
      const tile = tileSelected || document.querySelector(".tile:hover");
      if (tile && !tile.classList.contains("tile-start")) {
        tile.innerText = key;
      }
    }
  }
}

function calculateScore(currentBoard) {
  let calculatedScore = 0;

  // Additional scoring based on correct tiles
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const isFixed = document.getElementById(`${r}-${c}`).classList.contains("tile-start");

      if (!isFixed && currentBoard[r][c] === solution[r][c]) {
        // Increment the score by 1 for every correct non-fixed tile
        calculatedScore += 1.79;
      }
    }
  }
  calculatedScore = Math.round(calculatedScore);
  return calculatedScore; // Return the total score
}







// Function to display the score popup
// Function to display the score popup
function displayScore() {
    const scorePopup = document.getElementById("scorePopup");
    const scoreValue = document.getElementById("scoreValue");

    // Fetch the saved data from local storage
    const name = localStorage.getItem("name");
    const enrollmentNumber = localStorage.getItem("enrollmentNumber");
    const semester = localStorage.getItem("semester");
    const college = localStorage.getItem("college");

    // Calculate the time taken
    const currentTime = new Date();
    const elapsedTimeInSeconds = Math.floor((currentTime - startTime) / 1000);

    const hours = Math.floor(elapsedTimeInSeconds / 3600);
    const minutes = Math.floor((elapsedTimeInSeconds % 3600) / 60);
    const seconds = elapsedTimeInSeconds % 60;

    const formattedTime = formatTime(hours, minutes, seconds);

    // Display the score, time, and user data
    scoreValue.innerHTML = `Score: ${score} <br> Time: ${formattedTime} <br><br> Name: ${name} <br> Enrollment Number: ${enrollmentNumber} <br> Semester: ${semester} <br> College: ${college}`;
    scorePopup.style.display = "block";
}



// Function to close the score popup
function closeScorePopup() {
  const scorePopup = document.getElementById("scorePopup");
  scorePopup.style.display = "none";
}
