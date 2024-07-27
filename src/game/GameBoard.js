import { getRandomNumber, shuffle } from '../utils/random';
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
      return { error: 'Attack exceeds board boundaries' };
  
    const hitShipIndex = this.ships.findIndex((obj) => {
      return obj.portions[0]['x'] == x && obj.portions[0]['y'] == y;
    });
  
    if (hitShipIndex === -1) return { x, y, hit: false, miss: true };
  
    const hitShip = this.ships[hitShipIndex];
  
    if (hitShip.portions[0].isHit === true) return { x, y, hit: false, miss: false };
  
    hitShip.portions[0].isHit = true;
    hitShip.hit();
  
    console.log(hitShip.isSunk());
  
    return { x, y, hit: true, miss: false, ship: hitShip };
  }

  placeShip(shipLength, x, y, orientation) {
    if (x + shipLength > this.size || y + shipLength > this.size) {
      console.log(`Ship exceeds boundaries, rotating...`);
      orientation = shuffle(['horizontal', 'vertical'])[0];
      if (orientation === 'horizontal') {
        x = getRandomNumber(0, this.size - shipLength);
      } else {
        y = getRandomNumber(0, this.size - shipLength);
      }
    }

    if (orientation === undefined)
      return new Error(`NO ORIENTATION ASSIGNED returning ${orientation}`);

    try {
      for (let i = 0; i < shipLength; i++) {
        if (orientation === 'horizontal') {
          if (this.board[x + i][y] != '')
            throw new Error('ship overlaps with existing ship (x)');
        } else if (orientation === 'vertical') {
          if (this.board[x][y + i] != '')
            throw new Error('ship overlaps with existing ship (y)');
        }
      }
    } catch (e) {
      if(e){
        console.log(`${e} refactoring...`)
        const newX = getRandomNumber(0, this.size - shipLength);
        const newY = getRandomNumber(0, this.size - shipLength);

        this.placeShip(shipLength , newX , newY, 'vertical');
      }
    }

    for (let i = 0; i < shipLength; i++) {
      if (orientation == 'horizontal') {
        this.board[x + i][y] = 'Ship';
      } else {
        this.board[x][y + i] = 'Ship';
      }
    }

    const completeShip = [];

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
      completeShip.push(ship);
      ship.portions.push(shipPortion);
    }

    return completeShip;
  }
}

export default GameBoard;
