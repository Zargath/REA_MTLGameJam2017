import Phaser from 'phaser';
import DeathCircle from '../sprites/DeathCircle';

export default class {

    constructor({game, startingRadius, dots}) {
        this.game = game;
        this.startingRadius = startingRadius;
        this.dots = dots;
    }

    initialize() {
        //this.deathCircles = this.game.add.group();
        this.deathCircles = new Array();
        this.test = 0.80;

        for (let i = 0; i < this.dots; i++) {
            let n = this.dots - 1;
            let x = this.startingRadius * Math.cos(i * 2 * 3.141516 / n);
            let y = this.startingRadius * Math.sin(i * 2 * 3.141516 / n);
            var deathCircle = new DeathCircle(
                {
                    game: this.game,
                    x: x + this.game.world.centerX,
                    y: y + this.game.world.centerY,
                    asset: 'deathCircle',
                }
            );
            this.deathCircles.push(deathCircle);
            this.game.add.existing(deathCircle);

            this.game.physics.arcade.collide(this.player, deathCircle, this.killPlayer);

        }
        this.deathCircleActivation = this.game.time.events.loop(Phaser.Timer.SECOND * 0.10, this.generateDeathCircle, this);
        this.deathCircleActivation.timer.start();
    }

    deathCircleIsRed(){
        //TODO
        var test = this.startingRadius * Math.cos(this.test) ;
        if(test < 500.0) {
        return true;
        } else {
            return false;
        }

    }

    pushAway(distance) {
        this.test += 0.001;
        let radius = this.startingRadius * Math.cos(this.test);
        if (radius < this.startingRadius) {
            this.test -= 0.001 * distance;
        }
    }

    pullIn(distance) {
        this.test += 0.001 * distance;
    }

    generateDeathCircle() {
        this.test += 0.001;
        let radius = this.startingRadius * Math.cos(this.test);
        let n = this.dots - 1;

        for (var i = 0; i < this.deathCircles.length; i++) {
            let n = this.dots - 1;
            let x = radius * Math.cos(i * 2 * 3.141516 / n);
            let y = radius * Math.sin(i * 2 * 3.141516 / n);

            this.deathCircles[i].x = x + this.game.world.centerX;
            this.deathCircles[i].y = y + this.game.world.centerY;
            /*
            var colorModificationRed = 150;//this.test*140 % 255;
            var colorModificationGreen = 255 - Math.cos(this.test) * 100;
            this.deathCircles[i].tint = this.rgbToHex(colorModificationRed, colorModificationGreen, 255);
            //this.deathCircles[i].tint = this.rgbToHex(0, 255, 0);
            //this.deathCircles[i].tint = this.rgbToHex(0, 0, 0);       
            */
            if (radius < 150) {
                this.deathCircles[i].tint = this.rgbToHex(255, 0, 0);

            } else {
                this.deathCircles[i].tint = this.rgbToHex(0, 255, 0);

            }
        }
    }

    rgbToHex(r, g, b) {
        return "0x" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
}


