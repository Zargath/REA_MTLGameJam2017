import ScoreManager from '../managers/ScoreManager';

export default class {

  constructor({ game }) {
    this.game = game;
    this.managers = new Map();
  }

  initialize() {
    const scoreManager = new ScoreManager({ game: this.game });
    this.addManager('score', scoreManager);
  }

  update() {
    const mapIter = this.managers.values();
    let value = mapIter.next().value;
    while (value) {
      value.update();
      value = mapIter.next().value;
    }
  }

  addManager(key, manager) {
    this.managers.set(key, manager);
  }

  // Gets the manager based on the supplied key
  getManager(key) {
    return this.managers.get(key);
  }
}
