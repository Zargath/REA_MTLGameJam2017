/* globals __DEV__ */
import Phaser from 'phaser';

import DeathCircleManager from '../Manager/DeathCircleManager';
import { setResponsiveWidth } from '../utils';

export default class extends Phaser.State {
  init() { }
  preload() { }

  create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.deathCircleManager = new DeathCircleManager(
      {
        game: this.game,
        startingRadius: 500,
        dots: 200
      }
    );

    this.deathCircleManager.initialize();

    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
  }

  update(){
    
    if (this.upKey.isDown)
    {
        this.deathCircleManager.pullIn(3);
    }
    else if (this.downKey.isDown)
    {
        this.deathCircleManager.pushAway(3);
    }
  }

  render() {
    if (__DEV__) {
      this.game.debug.cameraInfo(this.game.camera, 32, 120, '#000000');
    }
  }
}
