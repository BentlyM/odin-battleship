import { showBoard, showShip } from '../utils/dom';
import { customShips } from '../utils/random';
import { Computer, Player } from './Player';

export const Play = () => {

  const Bot = new Computer();
  Bot.id = 'bot-board';
  showBoard(Bot);  

  const User = new Player();
  User.id = 'player-board';
  showBoard(User);

  const userDeployed = customShips(User.Control);
  showShip(userDeployed , User);

  return {};
};
