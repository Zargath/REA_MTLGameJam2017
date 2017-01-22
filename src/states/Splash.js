import Phaser from 'phaser';
import { centerGameObjects } from '../utils';

export default class extends Phaser.State {
  init() {}

  preload() {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
    centerGameObjects([this.loaderBg, this.loaderBar]);

    this.load.setPreloadSprite(this.loaderBar);

    //
    // load your assets
    //
    this.load.image('deathCircle', 'assets/images/deathCircle.png');

    this.load.image('mushroom', 'assets/images/mushroom2.png');
    this.load.image('waveman_bullet_blue', 'assets/images/waveman_bullet_2.png');
    this.load.image('wasd', 'assets/images/wasd.png');
    this.load.image('space_bar', 'assets/images/space_bar.png');
    this.load.spritesheet('explosion', 'assets/images/explode.png', 128, 128);

    // Load audio assets
    this.loadAudio();

    this.load.image('ufo', 'assets/images/ufo.png');
    this.load.image('waveman', 'assets/images/waveman.png');
    this.load.image('background_intro', 'assets/images/bg_intro.png');
    this.load.image('background', 'assets/images/starfield.jpg');
    this.load.shader('stars', 'assets/shaders/stars.frag');

    this.load.spritesheet('button_start', 'assets/images/start_button.png');
    this.load.spritesheet('button_howtoplay', 'assets/images/howtoplay_button.png');
  }

  create() {
    this.state.start('GameIntro');
  }

  render() {
  }

  loadAudio() {
    // Load music files
    this.game.load.audio('menu_song', 'assets/sounds/music/menu_screen.mp3', 1, true);
    this.game.load.audio('waveman_complete', 'assets/sounds/music/WaveMan_Complete.mp3', 1, true);
    this.game.load.audio('waveman_intro', 'assets/sounds/music/WaveMan_Intro.mp3', 1, true);
    this.game.load.audio('waveman_is_dying_1', 'assets/sounds/music/WaveMan_IsDying1.mp3', 1, true);
    this.game.load.audio('waveman_is_dying_2', 'assets/sounds/music/WaveMan_IsDying2.mp3', 1, true);
    this.game.load.audio('waveman_main', 'assets/sounds/music/WaveMan_Main.mp3', 1, true);
    this.game.load.audio('waveman_verse_1', 'assets/sounds/music/WaveMan_Verse1.mp3', 1, true);
    this.game.load.audio('waveman_verse_2', 'assets/sounds/music/WaveMan_Verse2.mp3', 1, true);
    // Load SFX files
    this.game.load.audio('waveman_alien_damage_1', 'assets/sounds/sfx/WaveMan_AlienDamage1.mp3');
    this.game.load.audio('waveman_alien_damage_2', 'assets/sounds/sfx/WaveMan_AlienDamage2.mp3');
    this.game.load.audio('waveman_alien_damage_3', 'assets/sounds/sfx/WaveMan_AlienDamage3.mp3');
    this.game.load.audio('waveman_alien_damage_4', 'assets/sounds/sfx/WaveMan_AlienDamage4.mp3');
    this.game.load.audio('waveman_laser_shot_1', 'assets/sounds/sfx/WaveMan_LaserShot1.mp3');
    this.game.load.audio('waveman_laser_shot_2', 'assets/sounds/sfx/WaveMan_LaserShot2.mp3');
    this.game.load.audio('waveman_laser_shot_3', 'assets/sounds/sfx/WaveMan_LaserShot3.mp3');
    this.game.load.audio('waveman_laser_shot_4', 'assets/sounds/sfx/WaveMan_LaserShot4.mp3');
    this.game.load.audio('waveman_laser_shot_5', 'assets/sounds/sfx/WaveMan_LaserShot5.mp3');
    this.game.load.audio('waveman_long_laser_shot_1', 'assets/sounds/sfx/WaveMan_LongLaserShot1.mp3');
    this.game.load.audio('waveman_long_laser_shot_2', 'assets/sounds/sfx/WaveMan_LongLaserShot2.mp3');
    this.game.load.audio('waveman_long_laser_shot_3', 'assets/sounds/sfx/WaveMan_LongLaserShot3.mp3');
    this.game.load.audio('waveman_long_laser_shot_4', 'assets/sounds/sfx/WaveMan_LongLaserShot4.mp3');
    this.game.load.audio('waveman_long_laser_shot_5', 'assets/sounds/sfx/WaveMan_LongLaserShot5.mp3');
    this.game.load.audio('waveman_ship_thrusters', 'assets/sounds/sfx/WaveMan_ShipThruster.mp3');
    this.game.load.audio('waveman_smooth_laser_shot_1', 'assets/sounds/sfx/WaveMan_SmoothLaserShot1.mp3');
    this.game.load.audio('waveman_smooth_laser_shot_2', 'assets/sounds/sfx/WaveMan_SmoothLaserShot2.mp3');
    this.game.load.audio('waveman_smooth_laser_shot_3', 'assets/sounds/sfx/WaveMan_SmoothLaserShot3.mp3');
    this.game.load.audio('waveman_smooth_laser_shot_4', 'assets/sounds/sfx/WaveMan_SmoothLaserShot4.mp3');
    this.game.load.audio('waveman_weird_alien_noise_1', 'assets/sounds/sfx/WaveMan_WeirdAlienNoise1.mp3');
    this.game.load.audio('waveman_weird_alien_noise_2', 'assets/sounds/sfx/WaveMan_WeirdAlienNoise2.mp3');
    this.game.load.audio('waveman_weird_alien_noise_3', 'assets/sounds/sfx/WaveMan_WeirdAlienNoise3.mp3');
    this.game.load.audio('waveman_weird_alien_noise_4', 'assets/sounds/sfx/WaveMan_WeirdAlienNoise4.mp3');
    this.game.load.audio('WaveMan_Explosion', 'assets/sounds/sfx/WaveMan_Explosion.mp3');
  }

}
