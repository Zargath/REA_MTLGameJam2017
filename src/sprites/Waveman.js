import Phaser from 'phaser';
import Bullet from './Bullet';

export default class extends Phaser.Sprite {

  constructor({ game }) {
    super(game, game.world.centerX, game.world.centerY, 'waveman');

    this.game = game;

    this.maxSpeed = 300;
    this.acceleration = 8;
    this.currentSpeed = 0;
    this.anchor.setTo(0.5);

    this.bulletTime = 0;
    this.bullets = this.game.add.group();

    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.drag.set(0.2);
    this.body.maxVelocity.setTo(400, 400);
    this.body.collideWorldBounds = true;

    this.cursors = game.input.keyboard.createCursorKeys();
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
    if (this.cursors.left.isDown) {
      this.angle -= 4;
    }
    else if (this.cursors.right.isDown) {
      this.angle += 4;
    }

    if (this.cursors.up.isDown) {
      if (this.currentSpeed < this.maxSpeed) {
        this.currentSpeed += this.acceleration;
      }
    }

    if (!this.cursors.up.isDown && this.currentSpeed > 0) {
      this.currentSpeed -= this.acceleration;
    }

    if (this.currentSpeed >= 0) {
      this.game.physics.arcade.velocityFromRotation(this.rotation - 1.57, this.currentSpeed, this.body.velocity);
    }

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this.shootBullet();
    }
  }
}
