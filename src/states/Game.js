/* globals __DEV__ */
import Phaser from 'phaser';
import Mushroom from '../sprites/Mushroom';

export default class extends Phaser.State {
  init() { }
  preload() { }

  create() {
    this.enemies = this.game.add.group();
    this.enemies.enableBody = true;

    this.enemyTimer = this.game.time.create(false);
    this.addEnemyLoop = this.enemyTimer.loop(1500, this.addEnemy, this);
    this.enemyTimer.loop(100, this.increaseEnemyRate, this);
    this.enemyTimer.start();
  }

  increaseEnemyRate() {
    if (this.addEnemyLoop.delay >= 100) {
      this.addEnemyLoop.delay -= 10;
    }
  }

  addEnemy() {
    var mushroom = new Mushroom({
      game: this.game,
      x: this.game.world.randomX,
      y: this.game.world.randomY,
      asset: 'mushroom',
    });

    this.enemies.add(mushroom);

    console.log("game time: " + this.game.time.now);
    console.log("state time: " + this.time.now);
  }

  render() {
    game.debug.text('Time until event: ' + this.enemyTimer.duration.toFixed(0), 32, 32);
    game.debug.text('Mush Count: ' + this.enemies.length.toFixed(0), 32, 120);
  }
}
