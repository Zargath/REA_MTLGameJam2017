import Phaser from 'phaser';

export default class extends Phaser.Sprite {

  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);

    this.game = game;
    this.anchor.setTo(0.5);
    this.speed = 1;
  }

  update() {
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this.x -= this.speed;
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.x += this.speed;
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      this.y -= this.speed;
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      this.y += this.speed;
    }
    let targetAngle = ((360 / (2 * Math.PI)) * this.game.math.angleBetween(
  this.x, this.y,
  this.game.input.activePointer.x, this.game.input.activePointer.y)) + 90;

    if (targetAngle < 0) { targetAngle += 360; }
    this.angle = targetAngle;
  }
}
