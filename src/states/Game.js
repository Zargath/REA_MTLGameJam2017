/* globals __DEV__ */
import Phaser from 'phaser';
import Waveman from '../sprites/Waveman';

export default class extends Phaser.State {
  init() {}
  preload() {}

  create() {
    this.waveman = new Waveman({
      game: this.game,
      x: this.game.world.centerX,
      y: this.game.world.centerY,
      asset: 'mushroom',
    });

    this.game.add.sprite(0, 0, 'background');
    this.game.add.existing(this.waveman);
  }

  render() {
    // if (__DEV__) {

    // }
  }
}
