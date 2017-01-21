export default class {


  constructor({ game }) {
    this.game = game;
    this.game.scoreText = this.game.add.text(10, 10, this.getScoreString());
    this.game.scoreText.boundsAlignH = 'left';
    this.game.scoreText.font = 'Press Start 2P';
    this.game.scoreText.fontSize = 40;
    this.game.scoreText.fill = '#FF0000';
    // Integer values for tracking various score mechanics
    this.enemyKillCount = 0;
    this.timerScoreCount = 0;
    this.circleScoreCount = 0;

    this.enemyKillCountMultiplier = 3;
    this.timerScoreCountMultiple = 2;
    this.circleScoreCountMultiplier = 2;
  }

  update() {
    this.game.scoreText.text = this.getScoreString();
  }

  increaseEnemyKillCount() {
    this.enemyKillCount += 1;
  }

  getEnemyScore() {
    return this.enemyKillCount * this.enemyKillCountMultiplier;
  }

  getTimerScore() {
    return this.timerScoreCount * this.timerScoreCountMultiple;
  }

  getCircleScore() {
    return this.circleScoreCount * this.circleScoreCountMultiplier;
  }

  getScore() {
    return this.getCircleScore() + this.getEnemyScore() + this.getTimerScore();
  }

  getScoreString() {
    return `Score:${this.getScore()}`;
  }
}
