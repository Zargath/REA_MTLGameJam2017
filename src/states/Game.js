/* globals __DEV__ */
import Phaser from 'phaser';
import Background from '../sprites/Background';
import HUDManager from '../managers/HUDManager';
import WaveManager from '../managers/WaveManager';
import SoundManager from '../managers/SoundManager';
import SoundTrackManager from '../managers/SoundTrackManager';

export default class extends Phaser.State {

  create() {
    // Setup board
    this.game.world.setBounds(-1000, -1000, 2000, 2000);

    // Add background
    this.addBackground();

    // Add the audio
    this.game.soundManager = new SoundManager({ game: this.game });
    this.game.soundTrackManager = new SoundTrackManager({ game: this.game });

    // Add the hud manager
    this.hudManager = new HUDManager({ game: this.game });
    this.hudManager.initialize();

    // Add Wave manager
    this.waveManager = new WaveManager({ 
      game: this.game,
      hudManager: this.hudManager
    });
    
    this.game.soundTrackManager.startSoundTrack();
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // Start game!
    this.waveManager.startNextWave();
  }

  update() {
    this.waveManager.update();
    this.hudManager.update();
  }

  addBackground() {
    const background = new Background({ game: this.game });
    this.game.add.existing(background);
  }
}
