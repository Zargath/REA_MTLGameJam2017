import Phaser from 'phaser';
import Blob from '../sprites/Blob';
import Waveman from '../sprites/Waveman';
import DeathCircleManager from '../managers/DeathCircleManager';
import SuicidalBlob from '../sprites/SuicidalBlob'

export default class {
  constructor({ game, hudManager }) {
    this.game = game;
    this.hudManager = hudManager;

    this.hasWaveInProgress = false;
    this.dificultyLvl = 0;
    this.currentWave = 0;
    this.maxWave = 3;

    // Groups
    this.enemies = this.game.add.group();
    this.enemies.enableBody = true;

    this.suicidalBlobs = this.game.add.group();
    this.suicidalBlobs.enableBody = true;

    // Controls
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.exitButton = this.game.input.keyboard.addKey(Phaser.KeyCode.ESC);
  }

  update() {
    // Update score board
    let enemyKillCount = this.enemies.countLiving() + this.suicidalBlobs.countLiving();
    this.hudManager.getManager('score').setEnemyCount(enemyKillCount);
    this.hudManager.getManager('score').setCurrentWave(this.currentWave);

    if (!this.hasWaveInProgress) {
      return;
    }

    // Check for player fire on enemy
    this.game.physics.arcade.collide(this.player.weapon.bullets, this.enemies, (bullet, enemy) => {
      this.deathCircleManager.pushAway(5);
      enemy.hitByBullet(bullet);
    }, null, this);

    // Check for enemy fire on player
    this.enemies.forEach((enemy) => {
      this.game.physics.arcade.collide(this.player, enemy.weapon.bullets, (player, bullet) => {
        this.deathCircleManager.pullIn(10);
        player.hitByBullet(bullet);
      }, null, this);
    });

    //Check if blobs collide with player
    this.enemies.forEach((enemy) => {
      this.game.physics.arcade.collide(this.player, enemy, (player, enemy) => {
        let playerGotHit = enemy.HitPlayer(player, enemy);
        if(playerGotHit){
          this.deathCircleManager.pullIn(20);
        }
      }, null, this);
    });

    // Check if player hits the death circle
    this.game.physics.arcade.collide(this.player, this.deathCircleManager.getDeathCircleGroup(), (player, circle) => {
      this.game.soundTrackManager.stopSoundTracks();
      this.player.dies();
      this.game.won = false;
      this.game.state.start('GameOver');
    }, null, this);

    // Check for death circle sound
    if (this.deathCircleManager.deathCircleIsRed()) {
      this.game.soundTrackManager.playAlarmingSoundtrack();
    }

    // Check for Wave End
    this.checkForWaveEnd();

    // Exit to menu on ESC
    if (this.exitButton.isDown) {
      this.game.state.start('GameMenu');
    }
  }

  startNextWave() {
    // Next Wave Counter
    this.currentWave += 1;
    this.dificultyLvl += 1;

    // Check Game won
    this.checkForGameWon();

    // Generate player
    this.createOrResetPlayer();

    // Generate Death Circle
    this.createOrResetDeathCircle();

    // Generate enemies
    this.createEnemies();

    // display 3 2 1 GO countdown
    this.displayWaveIntro();

    // Start Wave
    this.hasWaveInProgress = true;
  }

  checkForWaveEnd() {
    if (this.enemies.countLiving() <= 0) {
      // When enemies are all killed
      this.startNextWave();
    } else if (!this.player.alive) {
      this.game.soundTrackManager.stopSoundTracks();
      this.game.won = false;
      this.game.state.start('GameOver');
    }
  }

  checkForGameWon() {
    if (this.currentWave > this.maxWave) {
      this.game.soundTrackManager.stopSoundTracks();
      this.game.won = true;
      this.game.state.start('GameOver');
    }
  }

  createOrResetPlayer() {
    if (this.player) {
      this.player.reset(this.game.world.centerX, this.game.world.centerY);
    } else {
      this.player = new Waveman({ game: this.game });
      this.game.add.existing(this.player);
      this.game.camera.follow(this.player);
    }
  }

  createOrResetDeathCircle() {
    if (this.deathCircleManager) {
      // reset circle
    } else {
      this.deathCircleManager = new DeathCircleManager({
        game: this.game,
        startingRadius: 1000,
        dots: 200,
      });

      this.deathCircleManager.initialize();
    }
  }

  createEnemies() {
    // This will destroy all enemies.
    this.enemies.removeAll(true);
    this.enemies.forEach((enemy) => {
      enemy.bullets.removeAll(true);
    });
    // Add blobs
    let blobNum = 5 + this.dificultyLvl * 10;
    for (let i = 0; i < blobNum; i++) {
      if(i % 2 == 0)
      this.enemies.add(new Blob({
        game: this.game,
        asset: 'ufo',
        player: this.player,
      }));
      else {
      this.enemies.add(new SuicidalBlob({
        game: this.game,
        asset: 'suicidalBlob',
        player: this.player,
      }));
      }

    }
  }

  displayWaveIntro() {
    const txt = this.game.add.text(this.game.world.centerX, this.game.world.centerY, `Wave ${this.currentWave}`);
    txt.font = 'Press Start 2P';
    txt.fontSize = 40;
    txt.fill = '#FF0000';
    txt.anchor.set(0.5);
    this.game.time.events.add(1000, () => {
      this.game.add.tween(txt).to({ y: 0 }, 750, Phaser.Easing.Linear.None, true);
      this.game.add.tween(txt).to({ alpha: 0 }, 750, Phaser.Easing.Linear.None, true);
    }, this);
  }
}
