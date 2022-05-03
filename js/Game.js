class Game {
  constructor(firstPlayer) {
    this.boardManager = new BoardManager();
    this.currentPlayer = firstPlayer;
    this.winner = undefined;
  }
  //show the whole possible moves that evrey player have- it make a diffrence between a move of eat opponent that it is a must move, to any other move' and if the player that it is him turn as no possible moves he actually lose (if he as 0 player left he also have no moves so he also lost)
  playerSumPossibleMoves() {
    this.filteredPiecesPlayer = [];
    this.possibleMovesPlayer = [];
    this.eatopponentPlayer = [];
    //chack the whole players on board (type, possible moves)
    for (let i = 0; i < GameDefinision.BOARD_SIZE; i++) {
      for (let j = 0; j < GameDefinision.BOARD_SIZE; j++) {
        if (
          boardManager.Board[i][j] !== undefined &&
          boardManager.Board[i][j].player === this.currentPlayer
        ) {
          this.filteredPiecesPlayer.push(boardManager.Board[i][j]);
        }
      }
    }
    //summary all the current player possible moves
    for (const sumPossibleMoves of this.filteredPiecesPlayer) {
      const sumPossibleMovesRow = sumPossibleMoves.row;
      const sumPossibleMovesCol = sumPossibleMoves.col;
      const totalMove = sumPossibleMoves.getPossibleMoves();
      //check if there is a "jump"-eat moves and get them to other function
      for (let i = 0; i < totalMove.length; i++) {
        if (
          Math.abs(totalMove[i][0] - sumPossibleMovesRow) === 2 &&
          Math.abs(totalMove[i][1] - sumPossibleMovesCol) === 2
        ) {
          this.eatopponentPlayer.push(totalMove[i]);
        } else {
          this.possibleMovesPlayer.push(totalMove[i]);
        }
      } //check if there is not an eat moves or "regullar" moves and if not the current player lose
      if (
        this.eatopponentPlayer.length === 0 &&
        this.possibleMovesPlayer.length === 0
      ) {
        //  TODO: make the opponent player winner
      } //if there is an eat move return him
      if (this.eatopponentPlayer.length > 0) {
        return this.eatopponentPlayer;
      } else {
        //else return "regullar" move
        return this.possibleMovesPlayer;
      }
    }
  }
}
