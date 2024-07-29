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

    const hitShipIndex = this.ships.findIndex((ship) => {
      for (let i = 0; i < ship.portions.length; i++) { 
        if (ship.portions[i].x === x && ship.portions[i].y === y) {
          return true;
        }
      }
      return false;
    });

    console.log(hitShipIndex); //remove this log

    if (hitShipIndex == -1) return null;

    const hitShip = this.ships[hitShipIndex];

    for (let i = 0; i < hitShip.portions.length; i++) {
      if (hitShip.portions[i].x === x && hitShip.portions[i].y === y) {
        hitShip.portions[i].isHit = true;
        hitShip.hit();
        console.log(hitShip.isSunk()); //remove this console log
        return hitShip;
      }
    }
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
    
    const ship = new Ship(shipLength);
    this.ships.push(ship);

    for (let i = 0; i < shipLength; i++) {
      const shipPortion = { isHit: false, x: null, y: null };

      if (orientation == 'horizontal') {
        shipPortion['x'] = x + i;
        shipPortion['y'] = y;
      } else {
        shipPortion['x'] = x;
        shipPortion['y'] = y + i;
      }

      ship.portions.push(shipPortion);
    }

    return this.ships;
  }

  getHitShip(x, y) {
    for (const ship of this.ships) {
      for (const portion of ship.portions) {
        if (portion.x === x && portion.y === y) {
          return ship;
        }
      }
    }
    return null;
  }
}

export default GameBoard;