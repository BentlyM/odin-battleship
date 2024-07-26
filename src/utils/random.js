export const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const customShips = (render) => {
  const SHIP_AMOUNT_MIN = 3;
  const SHIP_AMOUNT_MAX = 5;
  const SHIP_LENGTH_MIN = 2;
  const SHIP_LENGTH_MAX = 4;
  const DIRECTIONS = ['vertical', 'horizontal'];
  const GRID_SIZE = 9;

  const shipAmount = getRandomNumber(SHIP_AMOUNT_MIN, SHIP_AMOUNT_MAX);
  const deployedShips = [];

  for (let i = 0; i < shipAmount; i++) {
    const shipLength = getRandomNumber(SHIP_LENGTH_MIN, SHIP_LENGTH_MAX);
    const shipCoordsX = getRandomNumber(0, GRID_SIZE - 1);
    const shipCoordsY = getRandomNumber(0, GRID_SIZE - 1);
    const shipOrientation = getRandomNumber(0, DIRECTIONS.length - 1);

    let currentShip = render.placeShip(shipLength, shipCoordsX, shipCoordsY, DIRECTIONS[shipOrientation]);

    deployedShips.push((currentShip) );
  }

  return deployedShips;
};