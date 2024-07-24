import GameBoard from './GameBoard';
import Ship from './Ship';

describe('My ship', () => {
  it('is not sunk initially', () => {
    const firstShip = new Ship(4);
    expect(firstShip.isSunk()).toBe(false);
  });

  it('is sunk after 4 hits', () => {
    const firstShip = new Ship(4);
    firstShip.hit();
    firstShip.hit();
    firstShip.hit();
    firstShip.hit();
    expect(firstShip.isSunk()).toBe(true);
  });
});

describe('GameBoard', () => {
  describe('initBoard', () => {
    it('initializes a board of correct size', () => {
      const gameBoard = new GameBoard();
      const board = gameBoard.board;

      expect(board.length).toBe(10);
      expect(board[0].length).toBe(10);

      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          expect(board[i][j]).toBe('');
        }
      }
    });
  });

  describe('placeShip', () => {
    it('is able sail within board', () => {
      const gameBoard = new GameBoard();
      const ship = new Ship(3);

      expect(gameBoard.placeShip(ship.length, 2, 3, 'horizontal')).toEqual(
        'success'
      );
    });

    it('is able to be attacked', () => {
      const gameBoard = new GameBoard();
      const ship = new Ship(3);
      gameBoard.placeShip(ship.length, 2, 3, 'horizontal');

      const expected = [
        {
          hits: 0,
          length: 3,
          portions: [
            {
              isHit: false,
              x: 2,
              y: 3,
            },
          ],
          Sunk: false,
        },
        {
          hits: 0,
          length: 3,
          portions: [
            {
              isHit: false,
              x: 3,
              y: 3,
            },
          ],
          Sunk: false,
        },
        {
          hits: 0,
          length: 3,
          portions: [
            {
              isHit: false,
              x: 4,
              y: 3,
            },
          ],
          Sunk: false,
        },
      ];

      expect(gameBoard.receiveAttack(3 , 3)).toEqual(
        expect.objectContaining({
          hits: 1,
          length: 3,
          portions: [
            {
              isHit: true,
              x: 3, 
              y: 3,
            },
          ],
          Sunk: false,
        })
      );

      expect(gameBoard.receiveAttack()).toStrictEqual([undefined , undefined])
      expect(gameBoard.receiveAttack(5 , 5)).toStrictEqual([5 , 5])
    });
  });
});
