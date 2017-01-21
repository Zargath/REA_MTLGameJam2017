/* globals __DEV__ */
import Phaser from 'phaser';
import Blob from '../sprites/Blob';
import Waveman from '../sprites/Waveman';

export default class extends Phaser.State {
  init() { }
  preload() { }

  create() {
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

  addPlayer() {
    var waveman = new Waveman({
      game: this.game,
      x: this.game.world.centerX,
      y: this.game.world.centerY,
      asset: 'mushroom',
    });

    this.player.add(waveman);
  }

  addBlob() {
    var blob = new Blob({
      game: this.game,
      x: this.game.world.randomX,
      y: this.game.world.randomY,
      asset: 'mushroom',
    });

    this.enemies.add(blob);
  }

  increaseDificulty() {
    if (this.blobLoop.delay > 300) {
      this.blobLoop.delay -= 5;
    }
  }

  render() {
    // if (__DEV__) {

    // }
  }
}
