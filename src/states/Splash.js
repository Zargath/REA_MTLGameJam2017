import Phaser from 'phaser';
import { centerGameObjects } from '../utils';

export default class extends Phaser.State {
  init() {}

  preload() {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
    centerGameObjects([this.loaderBg, this.loaderBar]);

    this.load.setPreloadSprite(this.loaderBar);
    
    //
    // load your assets
    //
    this.load.image('deathCircle', 'assets/images/deathCircle.png');

    this.load.image('mushroom', 'assets/images/mushroom2.png');
    this.load.image('ufo', 'assets/images/ufo.png');
    this.load.image('waveman', 'assets/images/waveman.png');
    this.load.image('waveman_bullet_blue', 'assets/images/waveman_bullet_blue.png');
    this.load.image('background', 'assets/images/starfield.png');
    this.load.shader('stars', 'assets/shaders/stars.frag')
  }

  create() {
    this.state.start('Game');
  }

}
