import Ship from './Ship';

class GameBoard {
  constructor() {
    this.size = 10;
    this.ships = [];
    this.board = Array.from({ length: this.size }, () =>
      Array(this.size).fill('')
    );
  }

  receiveAttack(x , y){

  }

  placeShip(shipLength, x, y, orientation) {
    if (x + shipLength > this.size || y + shipLength > this.size)
      return new Error('Ship exceeds board boundaries');

    for (let i = 0; i < shipLength; i++) {
      if (orientation === 'horizontal') {
        if (this.board[x + i][y] != '')
          return new Error('ship overlaps with existing ship (x)');
      } else {
        if (this.board[x][y + i] != '')
          return new Error('ship overlaps with existing ship (y)');
      }
    }

    for (let i = 0; i < shipLength; i++) {
      if (orientation == 'horizontal') {
        this.board[x + i][y] = 'Ship';
      } else {
        this.board[x][y + i] = 'Ship';
      }
    }

    for (let i = 0; i < shipLength; i++) {
      const ship = new Ship(shipLength);
      const shipPortion = { isHit: false, x: null, y: null };

      if (orientation == 'horizontal') {
        shipPortion['x'] = x + i;
        shipPortion['y'] = y;
      } else {
        shipPortion['x'] = x;
        shipPortion['y'] = y + 1;
      }

      this.ships.push(ship);
      ship.portions.push(shipPortion);
    }

    return 'success';
  }
}


export default GameBoard;
