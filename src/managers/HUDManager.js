import ScoreManager from '../managers/ScoreManager';

export default class {

  constructor({ game }) {
    this.game = game;
    this.managers = new Map();
  }

  initialize() {
    const scoreManager = new ScoreManager();
    this.game.scoreText = this.game.add.text(10, 10, scoreManager.getScoreString());
    this.game.scoreText.boundsAlignH = 'left';
    this.game.font = 'Nunito';
    this.game.scoreText.fontSize = 60;
    this.game.scoreText.fill = '#FF0000';

    this.addManager('score', scoreManager);
  }

  update() {
    this.game.scoreText.text = this.getManager('score').getScoreString();
  }

  addManager(key, manager) {
    this.managers.set(key, manager);
  }

  // Gets the manager based on the supplied key
  getManager(key) {
    return this.managers.get(key);
  }
}
