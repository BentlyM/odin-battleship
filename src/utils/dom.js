/**
 * Renders the game board in the DOM.
 * 
 * @param {Object} board - The game board object.
 */

export const showBoard = (boardConfig) => {
    const boardElement = document.querySelector(`#${boardConfig.id}`);
    const boardData = boardConfig.Control.board;
    let count = 1;
  
    boardData.forEach((row, rowIndex) => {
      const gridRow = document.createElement('tr');
      boardElement.appendChild(gridRow);
  
      const gridNumber = document.createElement('th');
      gridRow.appendChild(gridNumber);
      gridNumber.innerText = count++;
  
      row.forEach((cell, columnIndex) => {
        const gridItem = document.createElement('td');
        gridRow.appendChild(gridItem);

        (boardConfig.id === 'player-board') ? gridItem.classList.add('user-cell') : gridItem.classList.add('bot-cell');
        
        gridItem.setAttribute('data-x' , rowIndex)
        gridItem.setAttribute('data-y' , columnIndex)
      });
    });
  };

// ...

export const showShip = (deployed, opponent) => {
  const currentOpponent = document.querySelector(`#${opponent.id}`);

  deployed.forEach(vessel => {
    vessel.forEach(segment => {
      const row = segment.portions[0]['x'];
      const col = segment.portions[0]['y'];
      const cell = currentOpponent.querySelector(`[data-x='${row}'][data-y='${col}']`);

      if (cell && opponent.id == 'player-board') {
        cell.style.backgroundColor = 'gray'; // Replace with your desired color
      }
    });
  });
};