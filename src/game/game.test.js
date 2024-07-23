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

describe('My GameBoard', () => {
  it('is 10 rows long', () => {
    const arena = new GameBoard();
    expect(arena.printBoard().length).toBe(10);
  });

  it('is able to dock ship in ships', () => {
    const arena = new GameBoard();
    const expected = [{ Sunk: false, hits: 0, length: null, portions: [] }];
    arena.placeShip(new Ship());

    expect(arena.ships).toEqual(expect.arrayContaining(expected));
  });

  it('is able to see Portions of ships', () => {
    const arena = new GameBoard();
    const expected = [
      {
        Sunk: false,
        hits: 0,
        length: 3,
        portions: [
          {
            isHit: false,
            x: 3,
            y: 5,
          },
        ],
      },
    ];
    arena.placeShip(new Ship(3), 3, 5, 'horizontal');
    expect(arena.ships).toEqual(expect.arrayContaining(expected));
  });
});

describe('My Board', () => {
  const arena = new GameBoard();

  it('is able to check Ship out of Bounds (x)', () => {
    expect(arena.placeShip(new Ship(3), 10, 0, 'horizontal')).toStrictEqual(
      new Error('Ship exceeds board boundaries')
    );
  });
  it('is able to check Ship out of Bounds (y)', () => {
    expect(arena.placeShip(new Ship(3), 0, 10, 'vertical')).toStrictEqual(
      new Error('Ship exceeds board boundaries')
    );
  });
  it('is able to sail within Bounds', () => {
    expect(arena.placeShip(new Ship(3), 5, 3, 'vertical')).toEqual('success');
  });
});
