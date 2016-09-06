import User from './user';

let idCounter = 0;
class Game extends User {
  constructor({name, href}) {
    super({name});
    this.href = href;
    this.id = idCounter++;
  }
}

export default Game;
