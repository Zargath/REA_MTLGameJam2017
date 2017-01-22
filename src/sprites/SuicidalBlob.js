import Phaser from 'phaser';
import * as Utils from '../utils';

export default class extends Phaser.Sprite {

  constructor({ game, asset, player }) {
    super(game, game.world.randomX, game.world.randomY, asset);

    this.game = game;
    this.player = player;
    this.movingRand = false;

    //sprite animation
    this.animations.add('thrusters');
    this.animations.play('thrusters', 50,true)

    // Setup
    this.anchor.setTo(0.5);
    this.speed = 200;
    this.scale.setTo(-0.1,-0.1);

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
    this.body.setSize(400,400);

    //  An explosion pool
    this.explosions = this.game.add.group();
    this.explosions.enableBody = true;
    this.explosions.physicsBodyType = Phaser.Physics.ARCADE;
    this.explosions.createMultiple(30, 'explosion');
    this.explosions.setAll('anchor.x', 0.5);
    this.explosions.setAll('anchor.y', 0.5);
    this.explosions.setAll('scale.x', 0.5);
    this.explosions.setAll('scale.y', 0.5);
    this.explosions.forEach((explosion) => {
      explosion.animations.add('explosion');
    });
  }

  update() {
    if (this.alive) {
      this.move();
    }
  }

  move(){
    const distanceToPlayer = this.game.physics.arcade.distanceBetween(this, this.player);

    this.rotation = game.physics.arcade.angleToXY(this, this.player.x, this.player.y);
                
    if (distanceToPlayer < 300 && !this.movingRand) {
      var rndX = this.game.world.randomX;
      var rndY = this.game.world.randomY;
      this.game.add.tween(this).to({ x: rndX, y: rndY}, 1000, Phaser.Easing.Quadratic.InOut);
      this.movingRand = true;

      // Hack to move randomly for 1 second
      this.game.time.events.add(1000, function () {
        this.movingRand = false;
      }, this);
    } else if (!this.movingRand) {
      this.game.physics.arcade.moveToObject(this, this.player, this.speed);
    }
  }

    hitByBullet(bullet){
    const explosion = this.explosions.getFirstExists(false);
    if (explosion) {
      explosion.reset(bullet.body.x + bullet.body.halfWidth, bullet.body.y + bullet.body.halfHeight);
      explosion.body.velocity.y = this.body.velocity.y;
      explosion.alpha = 0.7;
      explosion.play('explosion', 30, false, true);
    }

    this.game.soundManager.playSoundFromGroup('alien_damage');

    this.dies();
    bullet.kill();
  }

  dies() {
    this.kill();
  }
}
