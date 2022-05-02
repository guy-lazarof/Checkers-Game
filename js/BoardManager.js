class BoardManager {
  constructor() {
    this.boardSize = GameDefinision.BOARD_SIZE;
    this.Board = [];
    this.pieces = 0;
    this.filteredMoves = [];
    this.selectedPieceID;
  }

  initBoard() {
    const table = document.createElement("table");
    document.body.appendChild(table);
    table.classList.add("table");
    for (let i = 0; i < this.boardSize; i++) {
      const row = table.insertRow();
      for (let j = 0; j < this.boardSize; j++) {
        const cell = row.insertCell();
        cell.id = `${i}_${j}`;
        if ((i + j) % 2 !== 0) {
          cell.className = "dark-cell";
        } else {
          cell.className = "light-cell";
        }
        cell.addEventListener("click", () => {
          this.onPieceClick(i, j, cell.id);
          // this.moveTo(i, j);
        });
      }
    }
  }
  // בהתייחסות לפוסיבול מוב הפונקציה מקבלת פה את המשבצת שאני לוחץ עליה ()

  initPieces() {
    this.Board = new Array(this.boardSize);

    for (let i = 0; i < this.Board.length; i++) {
      this.Board[i] = new Array(this.boardSize);
      for (let j = 0; j < this.Board.length; j++) {
        this.Board[i][j] = undefined;
      }
    }

    for (let i = 1; i <= GameDefinision.BOARD_SIZE; i += 2) {
      this.Board[0][i] = new Piece(
        0,
        i,
        GameDefinision.PAWN,
        GameDefinision.BLACK_PLAYER
      );
      this.Board[0][i].createImage();
      this.Board[1][i - 1] = new Piece(
        1,
        i - 1,
        GameDefinision.PAWN,
        GameDefinision.BLACK_PLAYER
      );
      this.Board[1][i - 1].createImage();
      this.Board[2][i] = new Piece(
        2,
        i,
        GameDefinision.PAWN,
        GameDefinision.BLACK_PLAYER
      );
      this.Board[2][i].createImage();

      this.Board[5][i - 1] = new Piece(
        5,
        i - 1,
        GameDefinision.PAWN,
        GameDefinision.WHITE_PLAYER
      );
      this.Board[5][i - 1].createImage();
      this.Board[6][i] = new Piece(
        6,
        i,
        GameDefinision.PAWN,
        GameDefinision.WHITE_PLAYER
      );
      this.Board[6][i].createImage();
      this.Board[7][i - 1] = new Piece(
        7,
        i - 1,
        GameDefinision.PAWN,
        GameDefinision.WHITE_PLAYER
      );
      this.Board[7][i - 1].createImage();
    }
    console.log(this.Board);
    console.log(this.Board[0][5].player);
  }

  onPieceClick(row, col, cellID) {
    //remove class to selected piece by ID
    if (this.selectedPieceID !== undefined) {
      document
        .getElementById(this.selectedPieceID)
        .classList.remove(`selected`);
    }
    //add class to selected piece- by ID

    //remove class to possible moves by ID
    if (this.filteredMovesByID !== undefined) {
      for (let i = 0; i < this.filteredMovesByID.length; i++) {
        document
          .getElementById(this.filteredMovesByID[i])
          .classList.remove(`possible-move`);
      }
    }
    // get array of my possible moves and add class by ID
    if (this.Board[row][col] !== undefined) {
      document.getElementById(cellID).classList.add(`selected`);
      this.selectedPieceID = cellID;
      //array of filtered moves
      this.filteredMoves = this.Board[row][col].getPossibleMoves();
      // makes the possible moves array to a possible moves array by ID
      this.filteredMovesByID = this.Board[row][col].Trans_To_Id_Cells();
      if (this.filteredMovesByID !== undefined) {
        for (let i = 0; i < this.filteredMovesByID.length; i++) {
          document
            .getElementById(this.filteredMovesByID[i])
            .classList.add(`possible-move`);
        }
      }
    }
    // for (const moves of this.filteredMoves) {
    //   console.log(moves);
    //   const movesRow = moves[0];
    //   const movesCol = moves[1];
    //   // if (row === movesRow && col === movesCol) {
    //   //   this.Board[row][col] =
    //   //     this.Board[row + (movesRow - row)][col + (movesCol - col)];
    //   //   this.Board[row][col] = undefined;
    //   // }
    //   console.log(this.Board[row][col]);
    // }
    // this.Board[0][1] = this.Board[1][0];
    // this.Board[row][col].row = row + 1;
    console.log(this.Board[row][col]);
  }
  // moveTo(row, col) {
  //   // console.log(this.filteredMoves);
  //   for (const moves of this.filteredMoves) {
  //     console.log(moves);
  //     const movesRow = moves[0];
  //     const movesCol = moves[1];
  //     if (row === movesRow && col === movesCol) {
  //       this.Board[row + (row - movesRow)][col + (col - movesCol)] =
  //         this.Board[row][col];
  //       this.Board[row][col] = undefined;
  //     }
  //   }
  // }
}
