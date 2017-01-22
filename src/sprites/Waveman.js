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
    this.weaponType = 1;

    // Setup Physics
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.drag.set(0.2);
    this.body.maxVelocity.setTo(400, 400);
    this.body.collideWorldBounds = true;

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

    // Controls
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.fireButton = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

        // Particles
    this.emitter = game.add.emitter(this.body.x, this.body.y, 200);

    this.emitter.makeParticles('thrusters');

    this.emitter.setScale(0.01, 0.04, 0.01, 0.04);
    this.emitter.gravity = 200;

    this.emitter.start(false, 300, 100);
  }

  removeBullet(bullet) {
    this.bullets.remove(bullet);
  }

  hitByBullet(bullet) {
    const explosion = this.explosions.getFirstExists(false);
    if (explosion) {
      explosion.scale.x = 0.2;
      explosion.scale.y = 0.2;
      explosion.reset(bullet.body.x + bullet.body.halfWidth, bullet.body.y + bullet.body.halfHeight);
      explosion.body.velocity.y = this.body.velocity.y;
      explosion.alpha = 0.7;
      explosion.play('explosion', 30, false, true);
    }

    this.game.soundManager.playSound('waveman_weird_alien_noise_3', 1.30);
    bullet.kill();
  }

  dies() {
    this.game.soundManager.playSound('WaveMan_Explosion', 1.30);
  }

  update() {
    if (this.cursors.left.isDown || this.game.input.keyboard.isDown(Phaser.KeyCode.A)) {
      this.angle -= 4;
    } else if (this.cursors.right.isDown || this.game.input.keyboard.isDown(Phaser.KeyCode.D)) {
      this.angle += 4;
    }

    if (this.cursors.up.isDown || this.game.input.keyboard.isDown(Phaser.KeyCode.W)) {
      if (this.currentSpeed < this.maxSpeed) {
        this.currentSpeed += this.acceleration;
      }
    }

    if ((!this.cursors.up.isDown && !this.game.input.keyboard.isDown(Phaser.KeyCode.W)) && this.currentSpeed > 0) {
      this.currentSpeed -= this.acceleration;
    }

    if (this.currentSpeed >= 0) {
      this.game.physics.arcade.velocityFromRotation(this.rotation, this.currentSpeed, this.body.velocity);
    }

    if (this.fireButton.isDown) {
      if(this.weaponType == 1){
        this.weapon.bulletAngleVariance = 10;
        this.weapon.fireRate = 100;
        this.weapon.fire();
        this.weapon.onFire.add(this.fireLaserSound, this);
      } else if (this.weaponType == 2) {
        this.weapon.bulletAngleVariance = 400;
        this.weapon.fireRate = 50;
        this.weapon.fire();
        this.weapon.onFire.add(this.fireLaserSound, this);
      }

    }

    this.emitter.x = this.x;
    this.emitter.y = this.y;

  }

  fireLaserSound() {
    this.game.soundManager.playSound('waveman_laser_shot_1', 0.25);
  }

  empowerPlayer(){
    this.weaponType = 2;       
    this.game.time.events.add(Phaser.Timer.SECOND * 2, this.depowerPlayer, this);

  }

  depowerPlayer(){
    this.weaponType = 1; 
  }

}
