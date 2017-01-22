/* globals __DEV__ */
import Phaser from 'phaser';
import DeathCircleManager from '../Manager/DeathCircleManager';
import Blob from '../sprites/Blob';
import Waveman from '../sprites/Waveman';
import Background from '../sprites/Background';
import HUDManager from '../managers/HUDManager';
import SoundManager from '../managers/SoundManager';
import SoundTrackManager from '../managers/SoundTrackManager';


export default class extends Phaser.State {
  init() { }
  preload() { }

  create() {
    // Setup board
    this.game.world.setBounds(-1000, -1000, 2000, 2000);

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

    // Sprite Groups
    this.enemies = this.game.add.group();
    this.enemies.enableBody = true;

    // Custom Timers
    this.stateTimer = this.time.create(false);

    // Create player
    this.addPlayer();

    // Define loops
    this.addBlob();
    this.blobLoop = this.stateTimer.loop(blobTimekeeper, this.addBlob, this);
    this.dificultyLoop = this.stateTimer.loop(dificultyTikekeeper, this.increaseDificulty, this);

    // Set up camera
    this.game.camera.follow(this.player);

    // Start the state!
    this.stateTimer.start();

    this.addDeathCircle();

    this.soundTrackManager = new SoundTrackManager({ game: this.game });
    this.soundTrackManager.startSoundTrack();

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //var scanlineFilter = new Phaser.Filter(this.game, null, game.cache.getShader('stars'));
    //this.game.world.filters = [scanlineFilter];
  }

  update() {
    this.game.physics.arcade.collide(this.player.weapon.bullets, this.enemies, this.logCollision, null, this);
    this.hudManager.update();

    for (var i = 0; i < this.deathCircleManager.deathCircles.length; i++) {
      this.game.physics.arcade.collide(this.player, this.deathCircleManager.deathCircles[i], this.playerDeathCircleCollision, null, this);
    }

    if (this.deathCircleManager.deathCircleIsRed()) {  
        this.soundTrackManager.playAlarmingSoundtrack();
      }

    }
  

  logCollision(bullet, enemy) {
    enemy.dies()
    bullet.kill();
    this.hudManager.getManager('score').increaseEnemyKillCount();
    this.soundManager.playSoundFromGroup('alien_damage');
    this.deathCircleManager.pushAway(5);
  }

  playerDeathCircleCollision(player, deathCircle) {
    this.game.state.start("Splash");
  }

  addBackground() {
    const background = new Background({ game: this.game });
    this.game.add.existing(background);
  }

  addDeathCircle() {
    this.deathCircleManager = new DeathCircleManager(
      {
        game: this.game,
        startingRadius: 1000,
        dots: 200
      }
    );

    this.deathCircleManager.initialize();
  }

  addPlayer() {
    this.player = new Waveman({ game: this.game });
    this.game.add.existing(this.player);
  }

  addBlob() {
    const blob = new Blob({
      game: this.game,
      asset: 'ufo',
      player: this.player,
    });
    this.enemies.add(blob);
  }

  increaseDificulty() {
    if (this.blobLoop.delay > 300) {
      this.blobLoop.delay -= 5;
    }
  }

  render() {
  }

}
