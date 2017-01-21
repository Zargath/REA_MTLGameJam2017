import Phaser from 'phaser';

export default class extends Phaser.TileSprite {

  constructor({ game }) {
    super(game, 0, 0, game.canvas.width, game.canvas.height, 'background');

    this.game = game;

    this.fixedToCamera = true;
  }

  update() {
    this.tilePosition.x = -this.game.camera.x;
    this.tilePosition.y = -this.game.camera.y;
  }
}
