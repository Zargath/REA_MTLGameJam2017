/* globals __DEV__ */
import Phaser from 'phaser';
import DeathCircleManager from '../Manager/DeathCircleManager';
import Blob from '../sprites/Blob';
import Waveman from '../sprites/Waveman';
import Background from '../sprites/Background';


export default class extends Phaser.State {
  init() { }
  preload() { }

  create() {
    // Setup board
    this.game.world.setBounds(-1000, -1000, 2000, 2000);

    // Add background
    this.addBackground();

    // Timers in ms
    const blobTimekeeper = 1500;
    const dificultyTikekeeper = 100;

    // Sprite Groups
    this.enemies = this.game.add.group();
    this.enemies.enableBody = true;

    // Custom Timers
    this.stateTimer = this.time.create(false);

    // Define loops
    this.blobLoop = this.stateTimer.loop(blobTimekeeper, this.addBlob, this);
    this.dificultyLoop = this.stateTimer.loop(dificultyTikekeeper, this.increaseDificulty, this);

    // Create player
    this.addPlayer();

    // Set up camera
    this.game.camera.follow(this.player);

    // Start the state!
    this.stateTimer.start();

    this.addDeathCircle();

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
  }

  update() {
    this.game.physics.arcade.collide(this.player.bullets, this.enemies, this.logCollision, null, this);

    for (var i = 0; i < this.deathCircleManager.deathCircles.length; i++) {
          this.game.physics.arcade.collide(this.player, this.deathCircleManager.deathCircles[i], this.playerDeathCircleCollision, null, this);
    }
  }

  render() {

  }

  logCollision(bullet, enemy) {
    enemy.dies()
    bullet.kill();
    this.deathCircleManager.pushAway(50);
  }

  playerDeathCircleCollision(player, deathCircle){
    this.game.state.start("Splash");
  }

  addBackground() {
    const background = new Background({ game: this.game });
    this.game.add.existing(background);
  }

  addDeathCircle() {
    this.deathCircleManager = new DeathCircleManager(
      {
        game: this.game,
        startingRadius: 1000,
        dots: 200
      }
    );

    this.deathCircleManager.initialize();
  }

  addPlayer() {
    this.player = new Waveman({ game: this.game });
    this.game.add.existing(this.player);
  }

  addBlob() {
    const blob = new Blob({
      game: this.game,
      x: this.game.world.randomX,
      y: this.game.world.randomY,
      asset: 'ufo',
    });
    this.game.physics.enable(blob, Phaser.Physics.ARCADE);
    this.enemies.add(blob);
  }

  increaseDificulty() {
    if (this.blobLoop.delay > 300) {
      this.blobLoop.delay -= 5;
    }
  }

  render() {
  }
}
