import Ship from './Ship';

class GameBoard {
  constructor() {
    this.size = 10;
    this.ships = [];
    this.board = Array.from({ length: this.size }, () =>
      Array(this.size).fill('')
    );
  }

  receiveAttack(x, y) {
    if (x >= this.size || y >= this.size)
      return new Error('Attack exceeds board boundaries');

    const hitShip = this.ships.find((obj) => {
      return obj.portions[0]['x'] == x && obj.portions[0]['y'] == y;
    });

    if (!hitShip) return [x, y]; // instead of return miss it can just return x and y
    hitShip.portions[0].isHit = true;
    hitShip.hit();

    return hitShip;
  }

  placeShip(shipLength, x, y, orientation) {
    if (x + shipLength > this.size || y + shipLength > this.size)
      return new Error('Ship exceeds board boundaries');

    if (orientation === undefined)
      return new Error(`NO ORIENTATION ASSIGNED returning ${orientation}`);

    for (let i = 0; i < shipLength; i++) {
      if (orientation === 'horizontal') {
        if (this.board[x + i][y] != '')
          return new Error('ship overlaps with existing ship (x)');
      } else if (orientation === 'vertical') {
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
        shipPortion['y'] = y + i;
      }

      this.ships.push(ship);
      ship.portions.push(shipPortion);
    }

    return 'success';
  }
}

export default GameBoard;
