class GameBoard {
  constructor() {
    this.size = 10;
    this.ships = [];
    this.board = [];
  }

  placeShip(Ship, x, y, orientation) {
    if (x + Ship.length > this.size || y + Ship.length > this.size)
      return new Error('Ship exceeds board boundaries');

    for (let i = 0; i < Ship.length; i++) {
      if (orientation === 'horizontal') {
        if (this.board[x + i][y] != '')
          return new Error('ship overlaps with existing ship (x)');
      } else {
        if (this.board[x][y + i] != '')
          return new Error('ship overlaps with existing ship (y)');
      }
    }

    for (let i = 0; i < Ship.length; i++) {
      if (orientation == 'horizontal') {
        this.board[x + i][y] = Ship;
        Ship.portions[i]['x'] = x + i;
        Ship.portions[i]['y'] = y;
      } else {
        this.board[x][y + i] = Ship;
        Ship.portions[i]['x'] = x;
        Ship.portions[i]['y'] = y + i;
      }
    }

    this.ships.push(Ship);

    return 'success';
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
