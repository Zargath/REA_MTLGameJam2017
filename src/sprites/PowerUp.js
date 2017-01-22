import Phaser from 'phaser';
import * as Utils from '../utils';

export default class extends Phaser.Sprite {

  constructor({ game, asset, player, spawnPositionX, spawnPositionY}) {
    super(game, spawnPositionX, spawnPositionY, asset);
    this.game = game;
    this.anchor.setTo(0.5);
    this.scale.setTo(0.5,0.5);
  }

  update() {
  }
}
