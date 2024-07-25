import { showBoard } from "../utils/dom";
import { Computer , Player } from "./Player"

export const Play = () => {
    const Bot = new Computer();
    Bot.id = 'bot-board';
    showBoard(Bot);

    const User = new Player();
    User.id = 'player-board'
    showBoard(User);

    return {
        
    }
}