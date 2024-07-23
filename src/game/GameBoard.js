class GameBoard {
  constructor() {
    this.size = 10;
    this.ships = [];
    this.board = [];
  }

  placeShip(Ship, x, y, orientation) {
    let result;

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
        result = this.trackShipPosition(this.board, Ship);
        Ship.portions[i]['x'] = result[0];
        Ship.portions[i]['y'] = result[1];
      } else {
        this.board[x][y + i] = Ship;
        result = this.trackShipPosition(this.board, Ship);
        Ship.portions[i]['x'] = result[0];
        Ship.portions[i]['y'] = result[1];
      }
    }

    this.ships.push(Ship);

    return 'success';
  }

  trackShipPosition(board, currentShipPortion) {
    for (let i = 0; i < board.length; i++) {
      let index = board[i].indexOf(currentShipPortion);
      if (index > -1) {
        return [i, index];
      }
    }
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
