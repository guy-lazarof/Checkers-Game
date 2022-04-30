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
        // cell.addEventListener("click", () => this.onPieceClick(i, j, cell.id));
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
    console.log(this.Board);
  }
}
