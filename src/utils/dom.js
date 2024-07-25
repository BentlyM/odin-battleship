/**
 * Renders the game board in the DOM.
 * 
 * @param {Object} board - The game board object.
 */

export const showBoard = (board) => {
    const boardElement = document.querySelector(`#${board.id}`);
    const boardData = board.Control.board;
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

        (board.id === 'player-board') ? gridItem.classList.add('user-cell') : gridItem.classList.add('bot-cell');
        
        gridItem.setAttribute('data-x' , rowIndex)
        gridItem.setAttribute('data-y' , columnIndex)
      });
    });
  };