const GameDefinision = {
  BOARD_SIZE: 8,
  WHITE_PLAYER: "white",
  BLACK_PLAYER: "black",
  PAWN: "pawn",
};
let game = new Game(GameDefinision.WHITE_PLAYER);
let boardManager = new BoardManager();
function onLoad() {
  boardManager.initBoard();
  boardManager.initPieces();
}
window.addEventListener("load", onLoad);
