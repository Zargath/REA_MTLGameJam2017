import Phaser from 'phaser';
import StaticBackground from '../sprites/StaticBackground';
import ColorGenerator from '../Generators/ColorGenerator';

export default class extends Phaser.State {
  init() {

  }

  preload() {

  }

  create() {
    const background = new StaticBackground({ game: this.game, background: 'background_intro' });

    this.game.add.existing(background);
    this.game.title = 'Earth Defender : Alien Crisis';

    const colorGenerator = new ColorGenerator();

    const xPos = (document.documentElement.clientWidth - 800) / 1.2;
    const yPos = 20;

    const randomHue = Math.random() * 360;
    const fillColor = colorGenerator.getRBGString(colorGenerator.HSVToRGB(randomHue, 0.5, 0.99));
    const strokeColor = colorGenerator.getRBGString(colorGenerator.HSVToRGB(randomHue, 0.5, 0.40));

    const style = { font: 'bold 30pt Arial', fill: fillColor, align: 'left', wordWrap: true, wordWrapWidth: document.documentElement.clientWidth - (document.documentElement.clientWidth / 3) };
    this.game.introText = this.game.add.text(xPos, yPos, this.game.title, style);
    this.game.introText.stroke = strokeColor;
    this.game.introText.strokeThickness = 6;

    this.startButton = this.game.add.button(xPos + 100, yPos + 200, 'button_start', this.goToMenu, this);

    // waveman_intro
  }

  goToMenu() {
    this.state.start('Game');
  }

  update() {

  }

  render() {

  }
}
