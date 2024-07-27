import { showBoard, showShip , hitOrMiss } from '../utils/dom';
import { customShips } from '../utils/random';
import { Computer, Player } from './Player';

export const Play = () => {

  const User = new Player();
  User.id = 'player-board';
  showBoard(User);

  const userDeployed = customShips(User.Control);
  showShip(userDeployed , User);

  const Bot = new Computer();
  Bot.id = 'bot-board';
  showBoard(Bot);
  customShips(Bot.Control);

  hitOrMiss(Bot.Control , User.Control); // for dom allows player to select item of board and hit or miss lol   

  return {};
};
