class Game {
  constructor(firstPlayer) {
    this.boardManager = new BoardManager();
    this.currentPlayer = firstPlayer;
    this.winner = undefined;
  }
}
