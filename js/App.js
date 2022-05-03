//this is a object that contain all the constant variable
const GameDefinision = {
  BOARD_SIZE: 8,
  WHITE_PLAYER: "white",
  BLACK_PLAYER: "black",
  PAWN: "pawn",
};
//On "load" eventListener make the js update after the window is load

let game = new Game(GameDefinision.WHITE_PLAYER);
let boardManager = new BoardManager();
function onLoad() {
  boardManager.initBoard();
  boardManager.initPieces();
}
window.addEventListener("load", onLoad);
