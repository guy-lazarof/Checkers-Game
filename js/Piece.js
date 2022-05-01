class Piece {
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
  }

  createImage() {
    let id = `${this.row}_${this.col}`;
    const image = document.createElement("img");
    image.src = "images/" + this.player + "/" + this.type + ".png";
    document.getElementById(id).appendChild(image);
  }
  getOpponent() {
    if (this.player === WHITE_PLAYER) {
      return BLACK_PLAYER;
    }
    return WHITE_PLAYER;
  }

  getPossibleMoves() {
    this.absoluteMoves = [];
    this.filteredMoves = [];
    this.reallyFilteredMoves = [];
    if (this.type === PAWN) {
      if (this.player === `white`) {
        this.absoluteMoves.push([this.row - 1, this.col - 1]);
        this.absoluteMoves.push([this.row - 1, this.col + 1]);
      } else {
        this.absoluteMoves.push([this.row + 1, this.col - 1]);
        this.absoluteMoves.push([this.row + 1, this.col + 1]);
      }
    }

    // filter the possible moves by the limits of the board size
    for (const onBoard of this.absoluteMoves) {
      const absoluteRow = onBoard[0];
      const absoluteCol = onBoard[1];
      if (
        absoluteRow >= 0 &&
        absoluteRow <= 7 &&
        absoluteCol >= 0 &&
        absoluteCol <= 7
      ) {
        if (
          boardManager.Board[absoluteRow][absoluteCol] !== undefined &&
          boardManager.Board[absoluteRow][absoluteCol].player !==
            this.getOpponent()
        ) {
          // this.filteredMoves.push(onBoard);
        } else {
          this.filteredMoves.push(onBoard);
        }
      }
    }
    return this.filteredMoves;
  }
  Trans_To_Id_Cells() {
    let result = [];
    for (const filterID of this.getPossibleMoves()) {
      result.push(`${filterID[0]}_${filterID[1]}`);
    }
    return result;
  }
}
// console.log(boardManager.Board[absoluteRow][absoluteCol].player);
// console.log(
//   boardManager.Board[absoluteRow][absoluteCol] === undefined ||
//     boardManager.Board[absoluteRow][absoluteCol].player ===
//       this.getOpponent()
// );
// for (const total of this.filteredMoves) {
//   const totalRow = total[0];
//   const totalCol = total[1];
//   if (boardManager.Board[totalRow][totalCol] === this.getOpponent()) {
//     this.reallyFilteredMoves.push(total);
//   }
//   // console.log(this.getOpponent());
//   // console.log(boardManager.Board[totalRow][totalCol]);
//   // return this.reallyFilteredMoves;
// }
