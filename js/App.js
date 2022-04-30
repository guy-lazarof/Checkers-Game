const BOARD_SIZE = 8;
const WHITE_PLAYER = "white";
const BLACK_PLAYER = "dark";
const PAWN = "pawn";
let boardManager = new BoardManager();

function onLoad() {
  boardManager.initBoard();
  boardManager.initPieces();
}
window.addEventListener("load", onLoad);
