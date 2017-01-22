/* globals __DEV__ */
import Phaser from 'phaser';
import DeathCircleManager from '../managers/DeathCircleManager';
import Blob from '../sprites/Blob';
import Waveman from '../sprites/Waveman';
import Background from '../sprites/Background';
import HUDManager from '../managers/HUDManager';
import SoundManager from '../managers/SoundManager';
import SoundTrackManager from '../managers/SoundTrackManager';
import SuicidalBlob from '../sprites/SuicidalBlob'

export default class extends Phaser.State {

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

    this.suicidalBlobs = this.game.add.group();
    this.suicidalBlobs.enableBody = true;

    //  An explosion pool
    this.explosions = this.game.add.group();
    this.explosions.enableBody = true;
    this.explosions.physicsBodyType = Phaser.Physics.ARCADE;
    this.explosions.createMultiple(30, 'explosion');
    this.explosions.setAll('anchor.x', 0.5);
    this.explosions.setAll('anchor.y', 0.5);
    this.explosions.setAll('scale.x', 0.5);
    this.explosions.setAll('scale.y', 0.5);
    this.explosions.forEach((explosion) => {
      explosion.animations.add('explosion');
    });

    // Custom Timers
    this.stateTimer = this.time.create(false);

    // Create player
    this.addPlayer();

    // Define loops
    this.blobLoop = this.stateTimer.loop(blobTimekeeper, this.addBlob, this);
    this.blobLoop = this.stateTimer.loop(blobTimekeeper, this.addSuicidalBlob, this);
    this.dificultyLoop = this.stateTimer.loop(dificultyTikekeeper, this.increaseDificulty, this);

    // Set up camera
    this.game.camera.follow(this.player);

    // Start the state!
    this.stateTimer.start();

    this.addDeathCircle();

    this.soundTrackManager = new SoundTrackManager({ game: this.game });
    this.soundTrackManager.startSoundTrack();

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
  }

  update() {
    this.game.physics.arcade.collide(this.player.weapon.bullets, this.enemies, this.playerBulletHitEnnemy, null, this);
    this.game.physics.arcade.collide(this.player.weapon.bullets, this.suicidalBlobs, this.playerBulletHitSuicidalBlob, null, this);

    this.enemies.forEach((enemy) => {
      this.game.physics.arcade.collide(this.player, enemy.weapon.bullets, this.ennemyBulletHitPlayer
        , null, this);
    });

    this.suicidalBlobs.forEach((suicidalBlob) => {
      this.game.physics.arcade.collide(this.player, suicidalBlob, this.suicidalBlobHitPlayer, null, this);
    });

    this.hudManager.update();

    this.game.physics.arcade.collide(this.player, this.deathCircleManager.getDeathCircleGroup(), this.playerDeathCircleCollision, null, this);

    if (this.deathCircleManager.deathCircleIsRed()) {
      this.soundTrackManager.playAlarmingSoundtrack();
    }
  }

  suicidalBlobHitPlayer(player, suicidalBlob) {
    const explosion = this.explosions.getFirstExists(false);
    if (explosion) {
      explosion.reset(suicidalBlob.body.x + suicidalBlob.body.halfWidth, suicidalBlob.body.y + suicidalBlob.body.halfHeight);
      explosion.body.velocity.y = suicidalBlob.body.velocity.y;
      explosion.alpha = 0.7;
      explosion.play('explosion', 30, false, true);
    }

    this.deathCircleManager.pullIn(20);
    this.soundManager.playSoundFromGroup('alien_damage');

    suicidalBlob.dies();
  }

  playerBulletHitEnnemy(bullet, enemy) {
    const explosion = this.explosions.getFirstExists(false);
    if (explosion) {
      explosion.reset(bullet.body.x + bullet.body.halfWidth, bullet.body.y + bullet.body.halfHeight);
      explosion.body.velocity.y = enemy.body.velocity.y;
      explosion.alpha = 0.7;
      explosion.play('explosion', 30, false, true);
    }

    enemy.dies();
    bullet.kill();

    this.hudManager.getManager('score').increaseEnemyKillCount();
    this.soundManager.playSoundFromGroup('alien_damage');
    this.deathCircleManager.pushAway(5);
  }

    playerBulletHitSuicidalBlob(bullet, suicidalBlob) {
    const explosion = this.explosions.getFirstExists(false);
    if (explosion) {
      explosion.reset(bullet.body.x + bullet.body.halfWidth, bullet.body.y + bullet.body.halfHeight);
      explosion.body.velocity.y = suicidalBlob.body.velocity.y;
      explosion.alpha = 0.7;
      explosion.play('explosion', 30, false, true);
    }

    suicidalBlob.dies();
    bullet.kill();

    this.hudManager.getManager('score').increaseEnemyKillCount();
    this.soundManager.playSoundFromGroup('alien_damage');
    this.deathCircleManager.pushAway(10);
  }


  ennemyBulletHitPlayer(player, bullet) {
    const explosion = this.explosions.getFirstExists(false);
    if (explosion) {
      explosion.scale.x = 0.2;
      explosion.scale.y = 0.2;
      explosion.reset(bullet.body.x + bullet.body.halfWidth, bullet.body.y + bullet.body.halfHeight);
      explosion.body.velocity.y = player.body.velocity.y;
      explosion.alpha = 0.7;
      explosion.play('explosion', 30, false, true);
    }

    bullet.kill();
    this.deathCircleManager.pullIn(10);
    this.soundManager.playSound('waveman_weird_alien_noise_3', 1.30);
  }

  playerDeathCircleCollision() {
    this.soundTrackManager.stopSoundTracks();
    this.game.state.start('Splash');
    this.soundManager.playSound('WaveMan_Explosion', 1.30);
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
        dots: 200,
      },
    );

    this.deathCircleManager.initialize();
  }

  addPlayer() {
    this.player = new Waveman({ game: this.game, soundManager: this.soundManager });
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

  addSuicidalBlob() {
    const suicidalBlob = new SuicidalBlob({
      game: this.game,
      asset: 'suicidalBlob',
      player: this.player,
    });
    this.suicidalBlobs.add(suicidalBlob);
  }

  increaseDificulty() {
    if (this.blobLoop.delay > 300) {
      this.blobLoop.delay -= 5;
    }
  }

}
