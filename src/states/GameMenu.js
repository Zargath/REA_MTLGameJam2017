import Phaser from 'phaser';
import StaticBackground from '../sprites/StaticBackground';
import ColorGenerator from '../Generators/ColorGenerator';
import HelpMenu from './Popups/HelpMenu';

export default class extends Phaser.State {
  init() {

  }

  preload() {

  }

  create() {

    this.game.world.setBounds(0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight);

    const background = new StaticBackground({ game: this.game, background: 'background_intro' });

    this.helpMenu = new HelpMenu({ game: this.game });

    this.game.add.existing(background);
    this.game.title = 'Earth Defender : Alien Crisis';

    const colorGenerator = new ColorGenerator();

    const xOffset = (document.documentElement.clientWidth - 800) / 2;
    const xPos = document.documentElement.clientWidth / 2;
    const yPos = ((document.documentElement.clientHeight - 600) / 2) + 40;

    const randomHue = Math.random() * 360;
    const fillColor = colorGenerator.getRBGString(colorGenerator.HSVToRGB(randomHue, 0.5, 0.99));
    const strokeColor = colorGenerator.getRBGString(colorGenerator.HSVToRGB(randomHue, 0.5, 0.40));

    const style = { font: 'bold 30pt Arial', fill: fillColor, align: 'left', wordWrap: true, wordWrapWidth: document.documentElement.clientWidth - (document.documentElement.clientWidth / 3) };
    this.introText = this.game.add.text(xPos, yPos, this.game.title, style);
    this.introText.stroke = strokeColor;
    this.introText.strokeThickness = 6;

    this.introText.anchor.set(0.5);

    this.closeMenuButton = this.game.input.keyboard.addKey(Phaser.KeyCode.ESC);

    this.startButton = this.game.add.button(xPos, yPos + 200, 'button_start', this.goToMenu, this);
    this.menuButton = this.game.add.button(xPos, yPos + 350, 'button_howtoplay', this.showHelpMenu, this);


    this.startButton.anchor.set(0.5);
    this.menuButton.anchor.set(0.5);
  }

  showHelpMenu() {
    this.helpMenu.show();
  }

  showHowToPlay() {

  }

  goToMenu() {
    this.state.start('Game');
  }

  update() {
    if (this.closeMenuButton.isDown) {
      this.helpMenu.hide();
    }
  }

  render() {

  }
}
