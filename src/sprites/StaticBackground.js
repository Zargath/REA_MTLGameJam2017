import Phaser from 'phaser';

export default class extends Phaser.Sprite {

  constructor({ game, background = 'background_intro' }) {
    super(game, game.world.centerX, game.world.centerY, background);

    this.game = game;

    this.anchor.setTo(0.5);
  }

  update() {

  }
}
