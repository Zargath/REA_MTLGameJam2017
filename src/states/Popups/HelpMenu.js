import Phaser from 'phaser';

export default class {

  constructor({ game }) {
    this.game = game;
    const offSet = 10;

    this.menuIsShowing = false;

    const xOffset = (document.documentElement.clientWidth - 800) / 2;
    const xPos = document.documentElement.clientWidth / 2;
    const yPos = ((document.documentElement.clientHeight - 600) / 2) + 40;

    this.helpMenuBackground = new Phaser.Rectangle(xPos - xOffset, yPos, 500, 500);

    this.bmd = this.game.add.bitmapData(this.game.width, this.game.height);
    this.bmd2 = this.game.add.bitmapData(this.game.width, this.game.height);

    this.bmd.rect(this.helpMenuBackground.x, this.helpMenuBackground.y, this.helpMenuBackground.width, this.helpMenuBackground.height, '#2d2d2d');
    this.bmd2.rect(this.helpMenuBackground.x - offSet, this.helpMenuBackground.y - offSet, this.helpMenuBackground.width + (2 * offSet), this.helpMenuBackground.height + (2 * offSet), '#000000');

    this.textInstructions1 = 'Shoot the enemies to advance';
    this.textInstructions2 = 'Avoid the circles';
    this.textInstructions3 = 'Defend planet earth!';
    this.textInstructions4 = 'Movement';
    this.textInstructions5 = 'Shoot';
  }

  show() {
    if (!this.menuIsShowing) {
      const style = { font: 'bold 12pt Arial', fill: '#ffffff', align: 'left', wordWrap: true, wordWrapWidth: this.helpMenuBackground.width - 10 };

      this.rect2 = this.game.add.sprite(this.bmd2.x, this.bmd2.y, this.bmd2);
      this.rect1 = this.game.add.sprite(this.bmd.x, this.bmd.y, this.bmd);

      this.textInstructionsScreen1 = this.game.add.text(this.helpMenuBackground.x + 100, this.helpMenuBackground.y + 30, this.textInstructions1, style);
      this.textInstructionsScreen2 = this.game.add.text(this.helpMenuBackground.x + 100, this.helpMenuBackground.y + 110, this.textInstructions2, style);
      this.textInstructionsScreen3 = this.game.add.text(this.helpMenuBackground.x + 100, this.helpMenuBackground.y + 190, this.textInstructions3, style);
      this.textInstructionsScreen4 = this.game.add.text(this.helpMenuBackground.x + 60, this.helpMenuBackground.y + 475, this.textInstructions4, style);
      this.textInstructionsScreen5 = this.game.add.text(this.helpMenuBackground.x + 285, this.helpMenuBackground.y + 475, this.textInstructions5, style);

      this.ufoSprite = this.game.add.sprite(this.helpMenuBackground.x + 30, this.helpMenuBackground.y + 30, 'ufo');
      this.deathCircle = this.game.add.sprite(this.helpMenuBackground.x + 35, this.helpMenuBackground.y + 110, 'deathCircle');
      this.waveman = this.game.add.sprite(this.helpMenuBackground.x + 30, this.helpMenuBackground.y + 185, 'waveman');
      this.wasd = this.game.add.sprite(this.helpMenuBackground.x + 30, this.helpMenuBackground.y + 375, 'wasd');
      this.spaceBar = this.game.add.sprite(this.helpMenuBackground.x + 250, this.helpMenuBackground.y + 418, 'space_bar');

      this.deathCircle.scale.setTo(0.03, 0.03);
      this.wasd.scale.setTo(0.5, 0.5);
      this.spaceBar.scale.setTo(0.4);
      this.menuIsShowing = true;
    }
  }

  hide() {
    if (this.menuIsShowing) {
      this.ufoSprite.destroy();
      this.deathCircle.destroy();
      this.waveman.destroy();
      this.wasd.destroy();
      this.spaceBar.destroy();
      this.rect1.destroy();
      this.rect2.destroy();
      this.textInstructionsScreen1.destroy();
      this.textInstructionsScreen2.destroy();
      this.textInstructionsScreen3.destroy();
      this.textInstructionsScreen4.destroy();
      this.textInstructionsScreen5.destroy();
      this.menuIsShowing = false;
    }
  }

}
