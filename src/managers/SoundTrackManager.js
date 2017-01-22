export default class {
    constructor({ game }) {
        this.game = game;
        this.soundTrackVolume = 0.70;
        this.soundtrackHasBeenSet = false;
        this.soundTracks = new Map();
        this.soundTracks.set('menu_song', this.game.add.audio('menu_song'));
        this.soundTracks.set('waveman_intro', this.game.add.audio('waveman_intro'));
        this.soundTracks.set('waveman_is_dying_1', this.game.add.audio('waveman_is_dying_1'));
        this.soundTracks.set('waveman_is_dying_2', this.game.add.audio('waveman_is_dying_2'));
        this.soundTracks.set('waveman_main', this.game.add.audio('waveman_main'));
        this.soundTracks.set('waveman_verse_1', this.game.add.audio('waveman_verse_1'));
        this.soundTracks.set('waveman_verse_2', this.game.add.audio('waveman_verse_2'));
        this.soundTracks.set();
    }

    startSoundTrack() {
        if (this.currentTrack) {
            this.currentTrack.stop();
        }

        this.currentTrack = this.soundTracks.get('waveman_main');
        this.currentTrack.loop = true;
        this.currentTrack.addMarker('first', 0.025, 17.435, 1, true);
        this.currentTrack.onLoop.add(this.hasLooped, this);
        this.currentTrack.play('first', null, this.soundTrackVolume, true);
    }

    hasLooped() {
        if (this.currentTrack) {
            this.currentTrack.stop();
        }
        this.currentTrack = this.soundTracks.get('waveman_verse_1');
        this.currentTrack.loop = true;
        this.currentTrack.addMarker('first', 0.0, 17.467, 1, true);
        this.currentTrack.onLoop.add(this.startAlarmingSoundtrack, this);
        this.currentTrack.play('first', null, this.soundTrackVolume, true);
    }

    playAlarmingSoundtrack() {
        this.soundtrackHasBeenSet = true;
        this.currentTrack.onLoop.add(this.hasLooped, this.startAlarmingSoundtrack());
    }

    startAlarmingSoundtrack() {
        if (this.currentTrack) {
            this.currentTrack.stop();
        }
        this.currentTrack = this.soundTracks.get('waveman_is_dying_1');
        this.currentTrack.loop = true;
        this.currentTrack.addMarker('first', 0.0, 17.35, 1, true);
        this.currentTrack.onLoop.add(this.startAlarmingSoundtrack, this);
        this.currentTrack.play('first', null, this.soundTrackVolume, true);
    }
}
