import GameBoard from './GameBoard';

class Player {
  constructor() {
    this.Control = new GameBoard();
  }
}

class Computer extends Player {
  constructor() {
    super();
    this.Control = new GameBoard();
  }
}

export { Computer, Player };
