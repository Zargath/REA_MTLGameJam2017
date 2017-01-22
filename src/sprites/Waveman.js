import Phaser from 'phaser';
import SoundManager from '../managers/SoundManager'

export default class extends Phaser.Sprite {

  constructor({ game, soundManager }) {
    super(game, game.world.centerX, game.world.centerY, 'waveman');
    this.soundManager = soundManager;
    this.game = game;

    this.maxSpeed = 300;
    this.acceleration = 8;
    this.currentSpeed = 0;
    this.anchor.setTo(0.5);

    // Configure Weapons
    this.weapon = this.game.add.weapon(30, 'waveman_bullet_blue');
    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.weapon.bulletSpeed = 600;
    this.weapon.fireRate = 100;
    this.weapon.trackSprite(this, 0, 0, true);

    // Setup Physics
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.drag.set(0.2);
    this.body.maxVelocity.setTo(400, 400);
    this.body.collideWorldBounds = true;

    // Controls
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.fireButton = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
  }

  removeBullet(bullet) {
    this.bullets.remove(bullet);
  }

  update() {
    if (this.cursors.left.isDown) {
      this.angle -= 4;
    } else if (this.cursors.right.isDown) {
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
      this.game.physics.arcade.velocityFromRotation(this.rotation, this.currentSpeed, this.body.velocity);
    }

    if (this.fireButton.isDown) {
      this.weapon.fire();
      this.weapon.onFire.add(this.fireLaserSound, this);
    }
  }

  fireLaserSound(){
        this.soundManager.playSound('waveman_laser_shot_1', 0.25);
  }
}
