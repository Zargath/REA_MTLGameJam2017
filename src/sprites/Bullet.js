import Phaser from 'phaser';

export default class extends Phaser.Sprite {

  constructor({ game, x, y, asset, waveman }) {
    super(game, x, y, asset);

    this.parentSprite = waveman;

    this.rotation = waveman.rotation - 1.6;

    const direction = this.getDirection();
    this.x = waveman.x + (direction.x * (waveman.width / 2));
    this.y = waveman.y + (direction.y * (waveman.height / 2));

    this.game = game;
    this.speed = 10;

    this.events.onOutOfBounds.add(this.resetBullet, this);
    this.checkWorldBounds = true;
  }

  resetBullet(bullet) {
    this.parentSprite.removeBullet(bullet);
    bullet.kill();
  }

  getDirection() {
    const dirX = Math.cos(this.rotation);
    const dirY = Math.sin(this.rotation);

    return { x: dirX, y: dirY };
  }

  update() {
    const direction = this.getDirection();
    this.x += this.speed * direction.x;
    this.y += this.speed * direction.y;
  }
}
