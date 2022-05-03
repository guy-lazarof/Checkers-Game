class BoardManager {
  constructor() {
    this.boardSize = GameDefinision.BOARD_SIZE;
    this.Board = [];
    this.prevSelectedPiece = undefined;
    this.pieces = 0;
    this.filteredMoves = [];
    this.selectedPieceID;
  }
  //Make the table at Html elements by Js

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
        //checks by clicking on possible move to where replace the piece
        cell.addEventListener("click", () => this.moveTo(i, j));
      }
    }
    //The html pop up message on screen when there is a winner!!!
    if (game.winner !== undefined) {
      const winnerPopup = document.createElement("div");
      const winner = game.winner.charAt(0).toUpperCase() + game.winner.slice(1);
      winnerPopup.textContent = winner + " player wins!";
      winnerPopup.classList.add("winner");
      table.appendChild(winnerPopup);
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
    //make every row of initial pieces (only on dark cells)+create images of the  pieces
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
  }

  onPieceClick(row, col, cellID) {
    //remove classes to previous selected piece by ID(if there is)
    if (this.selectedPieceID !== undefined) {
      document
        .getElementById(this.selectedPieceID)
        .classList.remove(`selected`);
    }

    //remove class to possible moves by ID
    if (this.filteredMovesByID !== undefined) {
      for (let i = 0; i < this.filteredMovesByID.length; i++) {
        document
          .getElementById(this.filteredMovesByID[i])
          .classList.remove(`possible-move`);
      }
    }
    //keep the previous data (so i can change the cell after click on possible move)-move to method
    if (this.Board[row][col] !== undefined) {
      this.prevSelectedPiece = this.Board[row][col];

      //add class to selected piece- by ID
      // get array of my possible moves and add class by ID
      document.getElementById(cellID).classList.add(`selected`);
      this.selectedPieceID = cellID;
      //array of filtered moves
      this.filteredMoves = this.Board[row][col].getPossibleMoves();
      // makes the possible moves array to a possible moves array by ID
      this.filteredMovesByID = this.Board[row][col].Trans_To_Id_Cells(
        this.filteredMoves
      );
      // console.log(this.filteredMovesByID);
      if (this.filteredMovesByID !== undefined) {
        for (let i = 0; i < this.filteredMovesByID.length; i++) {
          document
            .getElementById(this.filteredMovesByID[i])
            .classList.add(`possible-move`);
        }
      }
    }
  }
  //take the data from the previous click and change the cell data
  moveTo(row, col) {
    if (this.prevSelectedPiece !== undefined) {
      for (const move of this.prevSelectedPiece.getPossibleMoves()) {
        const moveRow = move[0];
        const moveCol = move[1];
        //remove image by method on Piece.js file
        if (row === moveRow && col === moveCol) {
          this.Board[row][col] =
            this.Board[this.prevSelectedPiece.row][this.prevSelectedPiece.col];
          this.Board[this.prevSelectedPiece.row][
            this.prevSelectedPiece.col
          ].removeImage();
          if (
            //replace the piece on board data
            Math.abs(this.prevSelectedPiece.row - moveRow) === 2 &&
            Math.abs(this.prevSelectedPiece.col - moveCol) === 2
          ) {
            this.Board[Math.abs(this.prevSelectedPiece.row + moveRow) / 2][
              Math.abs(this.prevSelectedPiece.col + moveCol) / 2
            ].removeImage(); //Delete the piece that i ate on board data
            this.Board[Math.abs(this.prevSelectedPiece.row + moveRow) / 2][
              Math.abs(this.prevSelectedPiece.col + moveCol) / 2
            ] = undefined;
          }
          //and the most important-change the inner information of the piece it self
          this.Board[this.prevSelectedPiece.row][this.prevSelectedPiece.col] =
            undefined;
          this.Board[row][col].col = col;
          this.Board[row][col].row = row;
          this.Board[moveRow][moveCol].createImage();
          //after a piece move - the turn change to the opponent
          game.currentPlayer = this.Board[row][col].getOpponent();
        }
      }
    }
  }
}
