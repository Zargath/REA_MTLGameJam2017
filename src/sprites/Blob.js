import Phaser from 'phaser';
import * as Utils from '../utils';

export default class extends Phaser.Sprite {

  constructor({ game, asset, player }) {
    super(game, game.world.randomX, game.world.randomY, asset);

    this.game = game;
    this.player = player;
    this.movingRand = false;

    // Setup
    this.anchor.setTo(0.5);
    this.speed = 200;

    // Configure Weapons
    this.weapon = this.game.add.weapon(30, 'waveman_bullet_blue');
    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.weapon.bulletSpeed = 300;
    this.weapon.fireRate = 3000;
    this.weapon.trackSprite(this, 0, 0, false);

    // Physics
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.drag.set(0.2);
    this.body.maxVelocity.setTo(400, 400);
    this.body.collideWorldBounds = true;
  }

  update() {
    if (this.alive) {
      this.move();
      this.shootPlayer();
    }
  }

  shootPlayer(){
    this.weapon.fireAtSprite(this.player);
  }

  move(){
    const distanceToPlayer = this.game.physics.arcade.distanceBetween(this, this.player);

    if (distanceToPlayer < 300 && !this.movingRand) {
      this.game.add.tween(this).to({ x: this.game.world.randomX, y: this.game.world.randomY }, 1000, Phaser.Easing.Quadratic.InOut);
      this.movingRand = true;

      // Hack to move randomly for 1 second
      this.game.time.events.add(1000, function () {
        this.movingRand = false;
      }, this);
    } else if (!this.movingRand) {
      this.game.physics.arcade.moveToObject(this, this.player, this.speed);
    }
  }

  dies() {
    this.kill();

    if (typeof this.game.deathCircleManager != 'undefined') {
      this.game.deathCircleManager.pushAway(10);
    }
  }
}
