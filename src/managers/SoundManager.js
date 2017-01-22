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

  playSound(key) {
    const sound = this.game.add.audio(key);
    sound.play();
  }
}
