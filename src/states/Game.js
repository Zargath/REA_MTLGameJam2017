/* globals __DEV__ */
import Phaser from 'phaser';
import Waveman from '../sprites/Waveman';
import { setResponsiveWidth } from '../utils';

export default class extends Phaser.State {
  init() {}
  preload() {}

  create() {
    const banner = this.add.text(this.game.world.centerX, this.game.height - 30, 'Phaser + ES6 + Webpack');
    banner.font = 'Nunito';
    banner.fontSize = 40;
    banner.fill = '#77BFA3';
    banner.anchor.setTo(0.5);

    const debugBanner = this.add.text(this.game.world.centerX, this.game.height - 120, 'Phaser + ES6 + Webpack');
    debugBanner.font = 'Nunito';
    debugBanner.fontSize = 40;
    debugBanner.fill = '#000000';
    debugBanner.anchor.setTo(0.5);


    this.waveman = new Waveman({
      game: this.game,
      x: this.game.world.centerX,
      y: this.game.world.centerY,
      asset: 'mushroom',
    });

    this.game.add.existing(this.waveman);
  }

  render() {
    if (__DEV__) {
      this.game.debug.cameraInfo(this.game.camera, 32, 120, '#000000');
      this.game.debug.spriteInfo(this.waveman, 32, 32, '#000000');
    }
  }
}
