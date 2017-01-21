import Phaser from 'phaser';

export default class extends Phaser.Sprite {

  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);

    this.game = game;
    this.anchor.setTo(0.5);
    this.speed = 1;

    //this.time.events.loop(2000, this.moveToLocation, this);
  }

  moveToLocation(){
      this.game.add.tween(this).to({
        x: this.game.world.randomX,
        y: this.game.world.randomY
    }, 1750, Phaser.Easing.Quadratic.InOut, true);
  }
}