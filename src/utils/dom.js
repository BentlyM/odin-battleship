/**
 * Renders the game board in the DOM.
 * 
 * @param {Object} boardConfig - The game board object.
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

export const hitOrMiss = (bot , player) => {
  const gridItems = document.querySelectorAll('.bot-cell');

  gridItems.forEach(item => {
    item.addEventListener('click', (e)=>{
      const attack = attackHandler(e.target);
      const attackState = bot.receiveAttack(attack.x , attack.y);

      if(attackState.miss === true){
        e.target.style.backgroundColor = 'red';
      }else{
        e.target.style.backgroundColor = 'green';
      }
    })
  })

}

const attackHandler = (cell) => {
  const x = cell.getAttribute("data-x");
  const y = cell.getAttribute("data-y")

  return {x , y};
}
