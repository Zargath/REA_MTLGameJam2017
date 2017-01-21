export default class {


  constructor() {
    // Integer values for tracking various score mechanics
    this.enemyKillCount = 0;
    this.timerScoreCount = 0;
    this.circleScoreCount = 0;

    this.enemyKillCountMultiplier = 3;
    this.timerScoreCountMultiple = 2;
    this.circleScoreCountMultiplier = 2;
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
    return `Score: ${this.getScore()}`;
  }
}
