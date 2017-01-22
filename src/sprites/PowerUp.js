import Phaser from 'phaser';
import * as Utils from '../utils';

export default class extends Phaser.Sprite {

  constructor() {
      this.game = game;
    this.anchor.setTo(0.5);
    this.scale.setTo(0.03, 0.03);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    //sprite animation
    this.animations.add('powerUpRotation');
    this.animations.play('thrusters', 50,true)
  }

  update() {
  }
}
