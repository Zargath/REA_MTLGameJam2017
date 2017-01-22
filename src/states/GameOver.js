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

    this.killCount = 0;
    this.isSuccessful = true;

    this.killCountText = this.isSuccessful ? `Mostarian's Butchered: ${numberWithCommas(this.killCount)}` : `Human Death Count: ${numberWithCommas(this.killCount)}`;

    const colorGenerator = new ColorGenerator();

    const xPos = document.documentElement.clientWidth / 10;
    const yPos = document.documentElement.clientHeight - 100;

    const randomHue = Math.random() * 360;
    const fillColor = colorGenerator.getRBGString(colorGenerator.HSVToRGB(randomHue, 0.5, 0.99));
    const strokeColor = colorGenerator.getRBGString(colorGenerator.HSVToRGB(randomHue, 0.5, 0.40));

    /* const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris placerat eleifend purus, nec condimentum tellus iaculis quis. Nulla vulputate molestie dui quis varius. Nulla sodales eu massa sit amet dignissim. Sed iaculis nunc a ultrices pulvinar. Phasellus imperdiet eu neque sit amet facilisis. Nullam a dictum nulla. Vestibulum sit amet ex ac massa volutpat pretium a vitae diam. Quisque odio dolor, posuere a consequat id, efficitur nec enim. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas cursus porttitor quam consequat faucibus. Praesent sollicitudin magna faucibus sagittis dictum. Cras ipsum nisi, aliquet id dignissim mattis, imperdiet at purus. Nunc tempus erat dui, quis bibendum orci sagittis in. Sed quis massa sed ipsum fringilla finibus a vitae arcu. Nullam in felis ac leo ultrices laoreet.
      In libero massa, egestas ut molestie sit amet, mollis a sapien. Ut orci metus, condimentum eu rhoncus nec, elementum non ligula. Donec nec neque ex. Cras vel maximus eros. Nunc nec porta libero. Integer non pellentesque leo, vel maximus eros. Phasellus imperdiet finibus orci sed placerat. Etiam sit amet consequat sem. Phasellus convallis luctus iaculis. Nam sollicitudin arcu tortor, sit amet congue libero suscipit quis. Ut vitae blandit risus, id sagittis erat. Morbi eget odio molestie, bibendum mauris ac, eleifend ante.
      Proin pharetra in arcu vitae facilisis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed in nulla varius odio consequat tincidunt. Donec sem nisi, lobortis at nibh eget, tristique dapibus massa. Phasellus tristique malesuada placerat. Integer a odio odio. Praesent luctus lorem sem, a congue quam tincidunt at. Vestibulum gravida ante vel nibh vulputate, maximus ullamcorper leo tincidunt. Curabitur a leo vitae massa scelerisque sollicitudin. Sed pulvinar ultricies pulvinar.
      Praesent a tortor in libero ultricies blandit in ac sem. Morbi blandit sem sagittis arcu cursus dictum. Vivamus pellentesque, odio id maximus ultricies, mi mauris tincidunt justo, a blandit metus ipsum et lacus. Sed eu nunc quis elit hendrerit sodales sed sed tortor. Suspendisse a diam tincidunt, commodo tellus a, euismod dui. Aliquam nec ante ut sapien consectetur consectetur. Nam finibus nunc et elementum laoreet. Cras cursus risus sed laoreet porttitor. Nam luctus eros lectus, non accumsan ex efficitur et. Aliquam id facilisis tellus, ac iaculis lectus. Cras ut placerat arcu. Vivamus at blandit urna. Suspendisse luctus a orci at porttitor. Nullam aliquam eleifend arcu a gravida. Morbi id dapibus dolor. Pellentesque auctor eros ac lectus lobortis facilisis.
      Fusce euismod pharetra sapien ut semper. Nam justo ipsum, congue at sagittis non, ultricies quis ligula. Vestibulum ultricies enim et eros convallis, eget consequat nisl lobortis. Morbi elementum id odio et imperdiet. In vulputate ex ac leo porta egestas. In feugiat congue tellus, a rutrum metus aliquam nec. Nunc egestas tristique felis, in ultricies odio maximus ut. Etiam eu mi elit. Pellentesque eu tortor non leo dapibus gravida eu gravida massa. Vivamus sit amet orci facilisis, ornare risus non, porttitor lectus. Fusce sed odio elit. Fusce varius id tellus ac molestie. Sed lorem lacus, accumsan at felis a, gravida pulvinar enim.'`;
      */
    const style = { font: 'bold 30pt Arial', fill: fillColor, align: 'center', wordWrap: true, wordWrapWidth: document.documentElement.clientWidth - (document.documentElement.clientWidth / 3) };
    this.game.gameOverText = this.game.add.text(xPos, yPos, this.getEndGameText(), style);
    this.game.gameOverText.stroke = strokeColor;
    this.game.gameOverText.strokeThickness = 6;

    const killCountStyle = { font: 'bold 12pt Arial', fill: fillColor, align: 'center' };
    this.game.raceKillCountText = this.game.add.text(this.game.width - 250, this.game.height - 20, this.killCountText, killCountStyle);
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

  }

  getEndGameText() {
    return this.isSuccessful ? this.getVictoryText() : this.getDefeatText();
  }

  getVictoryText() {
    return `
        HURRAH! Hail the victorious hero of the United States of Earth!
        The Invading Horde of Worldless Aliens have been driven
        away to the frozen void of space, to die! \r
        Mission Accomplished!
      `;
  }

  getDefeatText() {
    return `
      Shame! You have failed to protect your world from the invading horde of aliens.
      What's left of your pitiful race have fled to the frozen void of space, forced to
      find a new world, a new hope.  \r
        Thanks for Nothing!
    `;
  }
}
