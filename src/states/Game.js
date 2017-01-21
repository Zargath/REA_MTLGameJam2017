/* globals __DEV__ */
import Phaser from 'phaser';
import Blob from '../sprites/Blob';
import Waveman from '../sprites/Waveman';
import Background from '../sprites/Background';
import HUDManager from '../managers/HUDManager';
import SoundManager from '../managers/SoundManager';

export default class extends Phaser.State {
  init() { }
  preload() { }

  create() {
    // Add background
    this.addBackground();

    // Add the audio
    this.soundManager = new SoundManager({ game: this.game });

    // Add the hud manager
    this.hudManager = new HUDManager({ game: this.game });
    this.hudManager.initialize();

    // Timers in ms
    const blobTimekeeper = 1500;
    const dificultyTikekeeper = 100;

    this.game.physics.startSystem(Phaser.Physics.P2JS);

    // Sprite Groups
    this.player = this.game.add.group();
    this.player.enableBody = true;

    this.enemies = this.game.add.group();
    this.enemies.enableBody = true;

    // Custom Timers
    this.stateTimer = this.time.create(false);

    // Define loops
    this.blobLoop = this.stateTimer.loop(blobTimekeeper, this.addBlob, this);
    this.dificultyLoop = this.stateTimer.loop(dificultyTikekeeper, this.increaseDificulty, this);

    // Create player
    this.addPlayer();

    this.game.physics.p2.enable(this.player.children[0].bullets);

    // Start the state!
    this.stateTimer.start();
  }

  update() {
    this.game.physics.arcade.collide(this.player.children[0].bullets, this.enemies, this.logCollision, null, this);
    this.hudManager.update();
  }

  logCollision(bullet, enemy) {
    enemy.kill();
    bullet.kill();
    this.hudManager.getManager('score').increaseEnemyKillCount();
    this.soundManager.playSoundFromGroup('alien_damage');
  }

  addBackground() {
    const background = new Background({ game: this.game });
    this.game.add.existing(background);
  }

  addPlayer() {
    const waveman = new Waveman({
      game: this.game,
      x: this.game.world.centerX,
      y: this.game.world.centerY,
      asset: 'waveman',
    });

    this.player.add(waveman);
  }

  addBlob() {
    const blob = new Blob({
      game: this.game,
      x: this.game.world.randomX,
      y: this.game.world.randomY,
      asset: 'ufo',
    });
    this.game.physics.enable(blob, Phaser.Physics.ARCADE);
    this.enemies.add(blob);
  }

  increaseDificulty() {
    if (this.blobLoop.delay > 300) {
      this.blobLoop.delay -= 5;
    }
  }
}
