const xStart = document.querySelector(".choice-box__container-x");
const oStart = document.querySelector(".choice-box__container-o");
const btnVsCPU = document.querySelector(".btn-vs-cpu");
const btnVsPlayer = document.querySelector(".btn-vs-player");
const turnX = document.querySelector(".turn-x");
const turnO = document.querySelector(".turn-o");

const overlay = document.querySelector(".overlay");
const banner = document.querySelector(".banner");
const startScreen = document.querySelector(".start-screen");
const gameScreen = document.querySelector(".game-screen");
const restartScreen = document.querySelector(".restart-screen");
const tieScreen = document.querySelector(".tie-screen");
const winScreen = document.querySelector(".win-screen");
const winScreenText = document.querySelector(".win-screen-result__text");
const circleWinContainer = document.querySelector(".circle-win-container");
const crossWinContainer = document.querySelector(".cross-win-container");
const cellsContainer = document.querySelector(".cells-container");
const turnContainer = document.querySelector(".turn-icon");
const cells = document.querySelectorAll(".cell");

const xIconLink = "assets/images/icon-x.svg";
const xOutlineLink = "assets/images/icon-x-outline.svg";
const oIconLink = "assets/images/icon-o.svg";
const oOutlineLink = "assets/images/icon-o-outline.svg";
const xTurnIcon = `<svg
                class="turn-x"
                width="20"
                height="20"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                />
              </svg>`;
const oTurnIcon = `<svg
                class="turn-o"
                width="20"
                height="20"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
                  fill="currentColor"
                />
              </svg>`;
const xWinner = "assets/images/icon-x-winner.svg";
const oWinner = "assets/images/icon-o-winner.svg";

const countX = document.querySelector(".count-x");
const countTie = document.querySelector(".count-tie");
const countO = document.querySelector(".count-o");

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let playerMark = "O";
let gameState = ["", "", "", "", "", "", "", "", ""];

class GameBoard {
  constructor(isMultiPlayer, playerMark) {
    this.isMultiPlayer = isMultiPlayer;
    this.playerMark = playerMark || "O";
    this.playerMark2 = !isMultiPlayer
      ? ""
      : this.playerMark === "O"
      ? "X"
      : "O";
    this.currentOutline = this.playerMark === "O" ? oOutlineLink : xOutlineLink;
    this.currentMark = this.playerMark === "O" ? oIconLink : xIconLink;
    this.computerMark = this.playerMark === "O" ? xIconLink : oIconLink;
    this.turnIcon = xTurnIcon;
    this.winner = "";
    this.winnerMark = "";
    this.xScore = 0;
    this.ties = 0;
    this.oScore = 0;
  }

  checkTie() {
    this.ties++;
    countTie.textContent = this.ties;
  }

  displayWinner() {
    overlay.style.display = "flex";
    banner.style.display = "flex";
    winScreen.style.display = "flex";
    winScreen.style.flexDirection = "column";
    if (this.winnerMark === "X") crossWinContainer.style.display = "flex";
    else circleWinContainer.style.display = "flex";
    if (this.isMultiPlayer)
      winScreenText.textContent =
        this.winner === "Player" ? "PLAYER 1 WINS!" : "PLAYER 2 WINS!";
    else this.winner === "Player" ? "YOU WON!" : "YOU LOST...";
  }

  checkWinner() {
    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
        if (gameState[a] === "X") {
          cells[a].style.backgroundColor = "#65E9E4";
          cells[b].style.backgroundColor = "#65E9E4";
          cells[c].style.backgroundColor = "#65E9E4";
          cells[a].querySelector("img").src = xWinner;
          cells[b].querySelector("img").src = xWinner;
          cells[c].querySelector("img").src = xWinner;
          this.xScore++;
          this.winnerMark = "X";
          countX.textContent = this.xScore;
          if (!this.isMultiPlayer) {
            if (this.playerMark === "X") this.winner = "Player";
            else this.winner = "Computer";
          } else {
            if (this.playerMark === "X") this.winner = "Player";
            else this.winner = "Player 2";
          }
          return true;
        } else if (gameState[a] === "O") {
          cells[a].style.backgroundColor = "#F2B137";
          cells[b].style.backgroundColor = "#F2B137";
          cells[c].style.backgroundColor = "#F2B137";
          cells[a].querySelector("img").src = oWinner;
          cells[b].querySelector("img").src = oWinner;
          cells[c].querySelector("img").src = oWinner;
          this.winnerMark = "O";
          this.oScore++;
          countO.textContent = this.oScore;
          if (!this.isMultiPlayer) {
            if (this.playerMark === "O") this.winner = "Player";
            else this.winner = "Computer";
          } else {
            if (this.playerMark === "O") this.winner = "Player";
            else this.winner = "Player 2";
          }
          return true;
        }
      }
    }
    return false;
  }

  startGame() {
    startScreen.classList.remove("start-visible");
    gameScreen.classList.add("game-visible");
    turnContainer.innerHTML = this.turnIcon;
  }

  updateIcons() {
    this.currentOutline = this.playerMark === "O" ? oOutlineLink : xOutlineLink;
    this.currentMark = this.playerMark === "O" ? oIconLink : xIconLink;
  }

  switchPlayer() {
    this.turnIcon = this.turnIcon === oTurnIcon ? xTurnIcon : oTurnIcon;
    turnContainer.innerHTML = this.turnIcon;
    if (this.isMultiPlayer) {
      this.playerMark = this.playerMark === "O" ? "X" : "O";
      this.updateIcons();
    }
  }

  checkEmpty(c) {
    return !c.classList.contains("active");
  }

  mouseOver(c) {
    const cell = c.querySelector("img");
    if (this.checkEmpty(c)) cell.src = this.currentOutline;
  }

  mouseOut(c) {
    const cell = c.querySelector("img");
    if (this.checkEmpty(c)) cell.src = "";
  }

  computerMove() {
    cellsContainer.classList.add("no-click");
    setTimeout(() => {
      let emptyCells = [];
      let iconClass = this.playerMark === "O" ? "x" : "o";
      cells.forEach((cell, index) => {
        if (!cell.classList.contains("active"))
          emptyCells.push({ cell, index });
      });
      if (emptyCells.length > 0) {
        const randomCell =
          emptyCells[Math.floor(Math.random() * emptyCells.length)];
        randomCell.cell.style.boxShadow = "inset 0 -0.4rem 0 #0f191e";
        const cell = randomCell.cell.querySelector("img");
        cell.src = this.computerMark;
        randomCell.cell.classList.add("active");
        randomCell.cell.classList.add(iconClass);
        gameState[randomCell.index] = this.playerMark === "O" ? "X" : "O";
        if (this.checkWinner()) {
          this.displayWinner();
        } else {
          this.switchPlayer();
          cellsContainer.classList.remove("no-click");
        }
      }
    }, 1000);
  }

  selectCell(c, index) {
    if (cellsContainer.classList.contains("no-click")) return;
    let iconClass = this.playerMark === "O" ? "o" : "x";
    c.style.boxShadow = "inset 0 -0.4rem 0 #0f191e";
    const cell = c.querySelector("img");
    if (this.checkEmpty(c)) {
      cell.src = this.currentMark;
      c.classList.add("active");
      c.classList.add(iconClass);
      gameState[index] = this.playerMark;
      this.switchPlayer();
      if (this.checkWinner()) {
        this.displayWinner();
      } else {
        if (!this.isMultiPlayer) {
          this.computerMove();
        }
      }
    }
  }
}

let newGame;

cells.forEach((cell, index) => {
  cell.addEventListener("mouseover", () => newGame.mouseOver(cell));
  cell.addEventListener("mouseout", () => newGame.mouseOut(cell));
  cell.addEventListener("click", () => newGame.selectCell(cell, index));
});

btnVsCPU.addEventListener("click", () => {
  newGame = new GameBoard(false, playerMark);
  newGame.startGame();
  if (playerMark === "O") newGame.computerMove();
});

btnVsPlayer.addEventListener("click", () => {
  newGame = new GameBoard(true, "X");
  newGame.startGame();
});

xStart.addEventListener("click", () => {
  xStart.classList.add("active");
  oStart.classList.remove("active");
  playerMark = "X";
});

oStart.addEventListener("click", () => {
  oStart.classList.add("active");
  xStart.classList.remove("active");
  playerMark = "O";
});

document.addEventListener("DOMContentLoaded", () => {
  startScreen.classList.add("start-visible");
});
