import Phaser from 'phaser';
import Background from '../sprites/Background';
import ColorGenerator from '../Generators/ColorGenerator';

export default class extends Phaser.State {
  init() {

  }

  preload() {

  }

  create() {
    const background = new Background({ game: this.game });

    this.game.add.existing(background);

    const colorGenerator = new ColorGenerator();

    const xPos = document.documentElement.clientWidth / 8;
    const yPos = document.documentElement.clientHeight - 100;

    const randomHue = Math.random() * 360;
    const fillColor = colorGenerator.getRBGString(colorGenerator.HSVToRGB(randomHue, 0.5, 0.99));
    const strokeColor = colorGenerator.getRBGString(colorGenerator.HSVToRGB(randomHue, 0.5, 0.40));

    const style = { font: 'bold 30pt Arial', fill: fillColor, align: 'left', wordWrap: true, wordWrapWidth: document.documentElement.clientWidth - (document.documentElement.clientWidth / 3) };
    this.game.introText = this.game.add.text(xPos, yPos, this.getIntroText(), style);
    this.game.introText.stroke = strokeColor;
    this.game.introText.strokeThickness = 6;

    this.skipButton = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER);

    this.introSkipAuto = this.game.time.events.loop(Phaser.Timer.SECOND * 18, this.goToMenu, this);
    this.introSkipAuto.timer.start();

    this.pressEnterToSkipText = 'Press [Enter] to skip';
    this.enterToSkipText = this.game.add.text(2, document.documentElement.clientHeight - 20, this.pressEnterToSkipText);
    this.enterToSkipText.fill = '#ffffff';
    this.enterToSkipText.fontSize = '11pt';

    this.pressEnterTimer = this.game.time.events.loop(Phaser.Timer.SECOND * 0.8, this.toggleText, this);
    this.pressEnterTimer.timer.start();

    this.pressEnterTextIsVisible = true;
  }

  toggleText() {
    this.enterToSkipText.visible = !this.enterToSkipText.visible;
  }

  goToMenu() {
    this.state.start('GameMenu');
  }

  update() {
    this.game.introText.y -= 1;
    if (this.skipButton.isDown) {
      this.state.start('GameMenu');
    }
  }

  render() {

  }

  getIntroText() {
    return `2022 : Planet Mostar has been rendered unhabitable by ecological disasters and rampant civil war.

Entire Mostarian families, women children and elders, have embarked on board thousands of raggedy starships, determined to find a new world, a new hope.

Unfortunately the world they have stumbled upon is Earth!
    `;
  }
}
