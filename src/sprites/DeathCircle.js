import Phaser from 'phaser';

export default class extends Phaser.Sprite {

  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);

    this.game = game;
    this.anchor.setTo(0.5);
    this.scale.setTo(0.03, 0.03);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
  }

  update() {
  }

}
