export default class {
  constructor({ game }) {
    this.game = game;
    this.sounds = new Map();
    this.soundGroups = new Map();
    this.soundGroups.set('alien_damage', ['waveman_alien_damage_1', 'waveman_alien_damage_2', 'waveman_alien_damage_3', 'waveman_alien_damage_4']);
    this.soundGroups.set('waveman_laser_shot', ['waveman_laser_shot_1', 'waveman_laser_shot_2', 'waveman_laser_shot_3', 'waveman_laser_shot_4', 'waveman_laser_shot_5']);
    this.soundGroups.set('waveman_long_laser_shot', ['waveman_long_laser_shot_1', 'waveman_long_laser_shot_2', 'waveman_long_laser_shot_3', 'waveman_long_laser_shot_4', 'waveman_long_laser_shot_5']);
    this.soundGroups.set('waveman_smooth_laser_shot', ['waveman_smooth_laser_shot_1', 'waveman_smooth_laser_shot_2', 'waveman_smooth_laser_shot_3', 'waveman_smooth_laser_shot_4']);
    this.soundGroups.set('waveman_weird_alien_noise', ['waveman_weird_alien_noise_1', 'waveman_weird_alien_noise_2', 'waveman_weird_alien_noise_3', 'waveman_weird_alien_noise_4']);
  }

  playSoundFromGroup(group) {
    const groupSounds = this.soundGroups.get(group);
    const randomIndex = Math.floor(Math.random() * groupSounds.length);
    this.playSound(groupSounds[randomIndex]);
  }

  /*
  // Load music files
  this.game.load.audio('menu_song', 'assets/sounds/music/menu_screen.mp3', 1, true);
  this.game.load.audio('waveman_complete', 'assets/sounds/music/WaveMan_Complete.mp3', 1, true);
  this.game.load.audio('waveman_intro', 'assets/sounds/music/WaveMan_Intro.mp3', 1, true);
  this.game.load.audio('waveman_is_dying_1', 'assets/sounds/music/WaveMan_IsDying1.mp3', 1, true);
  this.game.load.audio('waveman_is_dying_2', 'assets/sounds/music/WaveMan_IsDying2.mp3', 1, true);
  this.game.load.audio('waveman_main', 'assets/sounds/music/WaveMan_Complete.mp3', 1, true);
  this.game.load.audio('waveman_verse_1', 'assets/sounds/music/WaveMan_Verse1.mp3', 1, true);
  this.game.load.audio('waveman_verse_2', 'assets/sounds/music/WaveMan_Verse2.mp3', 1, true);
  // Load SFX files
  this.game.load.audio('waveman_ship_thrusters', 'assets/sounds/sfx/WaveMan_ShipThruster.mp3');
  */

  playSound(key) {
    const sound = this.game.add.audio(key);
    sound.play();
  }
}
