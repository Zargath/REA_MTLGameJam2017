import Phaser from 'phaser';
import Bullet from './Bullet';

export default class extends Phaser.Sprite {

  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);

    this.game = game;
    this.bulletTime = 0;
    this.bullets = this.game.add.group();
    this.anchor.setTo(0.5);
    this.speed = 4;
  }

  shootBullet() {
    if (this.game.time.now > this.bulletTime) {
      const bullet = new Bullet({ game: this.game, x: this.x, y: this.y, asset: 'waveman_bullet_blue', waveman: this });
      this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
      this.game.add.existing(bullet);
      this.bullets.add(bullet);
      this.bulletTime = this.game.time.now + 250;
    }
  }

  removeBullet(bullet) {
    this.bullets.remove(bullet);
  }

  update() {
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this.body.x -= this.speed;
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.body.x += this.speed;
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      this.body.y -= this.speed;
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      this.body.y += this.speed;
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) ||
        this.game.input.activePointer.leftButton.isDown) {
      this.shootBullet();
    }
    let targetAngle = ((360 / (2 * Math.PI)) * this.game.math.angleBetween(
      this.x, this.y, this.game.input.activePointer.x, this.game.input.activePointer.y)) + 90;

    if (targetAngle < 0) { targetAngle += 360; }
    this.angle = targetAngle;
  }
}
