class GameBoard {
  constructor() {
    this.size = 10;
    this.ships = [];
    this.board = [];
  }

  printBoard() {
    for (let i = 0; i < this.size; i++) {
      const rows = [];
      for (let j = 0; j < this.size; j++) {
        rows.push('');
      }
      this.board.push(rows);
    }

    return this.board;
  }
}

export default GameBoard;
