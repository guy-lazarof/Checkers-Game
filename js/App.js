// const BOARD_SIZE = 8;
// const WHITE_PLAYER = "white";
// const BLACK_PLAYER = "dark"; //TODO:
// const PAWN = "pawn";

const GameDefinision = {
  BOARD_SIZE: 8,
  WHITE_PLAYER: "white",
  BLACK_PLAYER: "black",
  PAWN: "pawn",
};
let boardManager = new BoardManager();
function onLoad() {
  boardManager.initBoard();
  boardManager.initPieces();
}
window.addEventListener("load", onLoad);
