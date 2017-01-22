import Phaser from 'phaser';

export default class extends Phaser.Sprite {

  constructor({ game }) {
    super(game, game.world.centerX, game.world.centerY, 'goat');

    this.game = game;

    this.frame = 1;
    this.anchor.setTo(0.5);
    
    // Animations
    this.animations.add('down', [0, 1, 2], 5, true);
    this.animations.add('left', [3, 4, 5], 5, true);
    this.animations.add('right', [6, 7, 8], 5, true);
    this.animations.add('up', [9, 10, 11], 5, true);
  }

  moveLeft(){
      this.animations.play('left');
      return game.add.tween(this).to({ x: this.x - 200 }, 1200, Phaser.Easing.Linear.None, true);
  }

  moveRight(){
      this.animations.play('right');
      let tween = game.add.tween(this).to({ x: this.x + 400 }, 2400, Phaser.Easing.Linear.None, true);

      tween.onComplete.addOnce(() => {
          this.animations.stop();
      }, this);
  }

  move(){
      this.moveLeft().onComplete.addOnce(this.moveRight, this);
  }
}