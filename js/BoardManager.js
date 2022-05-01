class BoardManager {
  constructor() {
    this.boardSize = BOARD_SIZE;
    this.Board = [];
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
        cell.addEventListener("click", () => this.onPieceClick(i, j, cell.id));
      }
    }
  }
  initPieces() {
    this.Board = new Array(this.boardSize);

    for (let i = 0; i < this.Board.length; i++) {
      this.Board[i] = new Array(this.boardSize);
      for (let j = 0; j < this.Board.length; j++) {
        this.Board[i][j] = undefined;
      }
    }

    for (let i = 1; i <= BOARD_SIZE; i += 2) {
      this.Board[0][i] = new Piece(0, i, PAWN, `black`);
      this.Board[0][i].createImage();
      this.Board[1][i - 1] = new Piece(1, i - 1, PAWN, `black`);
      this.Board[1][i - 1].createImage();
      this.Board[2][i] = new Piece(2, i, PAWN, `black`);
      this.Board[2][i].createImage();

      this.Board[5][i - 1] = new Piece(5, i - 1, PAWN, `white`);
      this.Board[5][i - 1].createImage();
      this.Board[6][i] = new Piece(6, i, PAWN, `white`);
      this.Board[6][i].createImage();
      this.Board[7][i - 1] = new Piece(7, i - 1, PAWN, `white`);
      this.Board[7][i - 1].createImage();
    }
    // console.log(this.Board[0][1]);
    console.log(this.Board[2][1].getPossibleMoves());
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
      console.log(this.filteredMoves);
      // makes the possible moves array to a possible moves array by ID
      this.filteredMovesByID = this.Board[row][col].Trans_To_Id_Cells();
      for (let i = 0; i < this.filteredMovesByID.length; i++) {
        document
          .getElementById(this.filteredMovesByID[i])
          .classList.add(`possible-move`);
      }
    }
    // this.filteredMoves= the array of moves that evrey piece can do

    //Add class to possible moves by ID
    // console.log(this.Board[row][col].Trans_To_Id_Cells());
  }
}
