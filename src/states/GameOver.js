import Phaser from 'phaser';
import Background from '../sprites/Background';
import ColorGenerator from '../Generators/ColorGenerator';
import { getRandomInt, numberWithCommas } from '../utils';

export default class extends Phaser.State {
  init() {

  }

  preload() {

  }

  create() {
    const background = new Background({ game: this.game });
    this.game.add.existing(background);

    // Setup board
    this.game.world.setBounds(0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight);

    this.killCount = 0;
    this.isSuccessful = this.game.won;

    this.killCountText = this.isSuccessful ? `Mostarian's Butchered: ${numberWithCommas(this.killCount)}` : `Human Death Count: ${numberWithCommas(this.killCount)}`;

    const colorGenerator = new ColorGenerator();

    const xPos = document.documentElement.clientWidth / 10;
    const yPos = document.documentElement.clientHeight - 100;

    const randomHue = Math.random() * 360;
    const fillColor = colorGenerator.getRBGString(colorGenerator.HSVToRGB(randomHue, 0.5, 0.99));
    const strokeColor = colorGenerator.getRBGString(colorGenerator.HSVToRGB(randomHue, 0.5, 0.40));

    const style = { font: 'bold 30pt Arial', fill: fillColor, align: 'left', wordWrap: true, wordWrapWidth: document.documentElement.clientWidth - (document.documentElement.clientWidth / 3) };
    this.game.gameOverText = this.game.add.text(xPos, yPos, this.getEndGameText(), style);
    this.game.gameOverText.stroke = strokeColor;
    this.game.gameOverText.strokeThickness = 6;

    const killCountStyle = { font: 'bold 12pt Arial', fill: fillColor, align: 'center' };
    this.game.raceKillCountText = this.game.add.text(this.game.width - 250, this.game.height - 20, this.killCountText, killCountStyle);

    this.skipButton = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
    this.pressEnterToSkipText = 'Press [Enter] to skip';
    this.enterToSkipText = this.game.add.text(2, document.documentElement.clientHeight - 20, this.pressEnterToSkipText);
    this.enterToSkipText.fill = '#ffffff';
    this.enterToSkipText.fontSize = '11pt';

    this.pressEnterTimer = this.game.time.events.loop(Phaser.Timer.SECOND * 0.8, this.toggleText, this);
    this.pressEnterTimer.timer.start();
  }

  toggleText() {
    this.enterToSkipText.visible = !this.enterToSkipText.visible;
  }

  update() {
    if (!(this.game.gameOverText.y <= 50)) {
      this.game.gameOverText.y -= 1;
    }
    this.killCount += getRandomInt(10, 100);
    this.killCountText = this.isSuccessful ? `Mostarian's Butchered: ${numberWithCommas(this.killCount)}` : `Human Death Count: ${numberWithCommas(this.killCount)}`;
    this.game.raceKillCountText.setText(this.killCountText);
  }

  render() {
    if (this.skipButton.isDown) {
      this.state.start('GameMenu');
    }
  }

  getEndGameText() {
    return this.isSuccessful ? this.getVictoryText() : this.getDefeatText();
  }

  getVictoryText() {
    return `HURRAH! Hail the victorious hero of the United States of Earth!

The Invading Horde of Worldless Aliens have been driven away to the frozen void of space, to die! \r
Mission Accomplished!
      `;
  }

  getDefeatText() {
    return `Shame! You have failed to protect your world from the invading horde of aliens.

What's left of your pitiful race have fled to the frozen void of space, forced to find a new world, a new hope.  \r
Thanks for Nothing!
    `;
  }
}
