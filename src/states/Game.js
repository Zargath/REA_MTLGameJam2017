/* globals __DEV__ */
import Phaser from 'phaser';
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
    this.player = this.game.add.group();
    this.player.enableBody = true;

    this.enemies = this.game.add.group();
    this.enemies.enableBody = true;

    // Custom Timers
    this.stateTimer = this.time.create(false);

    // Define loops
    this.blobLoop = this.stateTimer.loop(blobTimekeeper, this.addBlob, this);
    this.dificultyLoop = this.stateTimer.loop(dificultyTikekeeper, this.increaseDificulty, this);

    // Create player
    this.addPlayer();

    // Start the state!
    this.stateTimer.start();
  }

  update() {
    this.game.physics.arcade.collide(this.player.children[0].bullets, this.enemies, this.logCollision);
  }

  logCollision(bullet, enemy) {
    enemy.kill();
    bullet.kill();
  }

  addBackground() {
    const background = new Background({ game: this.game });
    this.game.add.existing(background);
  }

  addPlayer() {
    const waveman = new Waveman({ game: this.game });
    this.player.add(waveman);
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

  render() {  }
}
