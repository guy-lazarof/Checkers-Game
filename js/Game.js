class Game {
  constructor(firstPlayer) {
    this.boardManager = new BoardManager();
    this.currentPlayer = firstPlayer;
    this.winner = undefined;
  }

  playerSumPossibleMoves() {
    this.filteredPiecesWhite = [];
    this.filteredPiecesBlack = [];
    this.possibleMovesWhite = [];
    this.possibleMovesBlack = [];
    this.eatOpptionWhite = [];
    this.eatOpptionBlack = [];

    for (let i = 0; i < GameDefinision.BOARD_SIZE; i++) {
      for (let j = 0; j < GameDefinision.BOARD_SIZE; j++) {
        if (
          boardManager.Board[i][j] !== undefined &&
          boardManager.Board[i][j].player === GameDefinision.WHITE_PLAYER
        ) {
          this.filteredPiecesWhite.push(boardManager.Board[i][j]);
        } else if (
          boardManager.Board[i][j] !== undefined &&
          boardManager.Board[i][j].player === GameDefinision.BLACK_PLAYER
        ) {
          this.filteredPiecesBlack.push(boardManager.Board[i][j]);
        }
        // console.log(boardManager.Board[6][1].player);
      }
    }

    for (const sumPossibleMoves of this.filteredPiecesWhite) {
      const sumPossibleMovesRow = sumPossibleMoves.row;
      const sumPossibleMovesCol = sumPossibleMoves.col;
      const totalMove = sumPossibleMoves.getPossibleMoves();

      for (let i = 0; i < totalMove.length; i++) {
        if (
          Math.abs(totalMove[i][0] - sumPossibleMovesRow) === 2 &&
          Math.abs(totalMove[i][1] - sumPossibleMovesCol) === 2
        ) {
          this.eatOpptionWhite.push(totalMove[i]);
        } else {
          this.possibleMovesWhite.push(totalMove[i]);
        }
      }
      if (this.eatOpptionWhite.length > 0) {
        return this.eatOpptionWhite;
      } else {
        return this.possibleMovesWhite;
      }
    }
    for (const sumPossibleMoves of this.filteredPiecesBlack) {
      const sumPossibleMovesRow = sumPossibleMoves.row;
      const sumPossibleMovesCol = sumPossibleMoves.col;
      const totalMove = sumPossibleMoves.getPossibleMoves();

      for (let i = 0; i < totalMove.length; i++) {
        if (
          Math.abs(totalMove[i][0] - sumPossibleMovesRow) === 2 &&
          Math.abs(totalMove[i][1] - sumPossibleMovesCol) === 2
        ) {
          this.eatOpptionBlack.push(totalMove[i]);
        } else {
          this.possibleMovesBlack.push(totalMove[i]);
        }
      }
      if (this.eatOpptionBlack.length > 0) {
        return this.eatOpptionBlack;
      } else {
        return this.possibleMovesBlack;
      }
    }
  }
}
