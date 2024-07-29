/**
 * Renders the game board in the DOM.
 * 
 * @param {Object} boardConfig - The game board object.
 */

import { getRandomNumber } from "./random";

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
      for(let i = 0; i < segment.portions.length; i++){
        const row = segment.portions[i]['x'];
        const col = segment.portions[i]['y'];
        const cell = currentOpponent.querySelector(`[data-x='${row}'][data-y='${col}']`);
  
        if (cell && opponent.id == 'player-board') {
          cell.style.backgroundColor = 'gray'; // Replace with your desired color
        }
      }
    });
  });
};

export const hitOrMiss = (bot , player) => {
  const botUnit = document.querySelectorAll('.bot-cell');
  const playerUnit = document.querySelectorAll('.player-cell');

  botUnit.forEach(item => {
    item.addEventListener('click', (e)=>{
      const attack = attackHandler(e.target);
      const attackState = bot.receiveAttack(attack.x , attack.y);

      if(e.target.style.backgroundColor === 'red' || e.target.style.backgroundColor === 'green') return;
      
      botTurn(player);

      if(attackState == null){
        e.target.style.backgroundColor = 'red';
      }else{
        e.target.style.backgroundColor = 'green';
      }
    })
  })
}

const botTurn = (player) => {
  
    const coords = { x : Number , y : Number};
    coords['x'] = getRandomNumber(0 , 9);
    coords['y'] = getRandomNumber(0 , 9);

    const attackState = player.receiveAttack(coords.x , coords.y);

    const item = document.querySelector(`.user-cell[data-x='${coords.x}'][data-y='${coords.y}']`);

    if(item.style.backgroundColor === 'red' || item.style.backgroundColor === 'green') { botTurn(player);};

    if(attackState == null){
      item.style.backgroundColor = 'red';
    }else{
      item.style.backgroundColor = 'green';
    }

}

const attackHandler = (cell) => {
  const x = cell.getAttribute("data-x");
  const y = cell.getAttribute("data-y")

  return {x , y};
}
