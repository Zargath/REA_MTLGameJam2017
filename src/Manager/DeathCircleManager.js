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
            game.physics.enable(deathCircle, Phaser.Physics.ARCADE);
            this.game.add.existing(deathCircle);

        }
        this.deathCircleActivation = this.game.time.events.loop(Phaser.Timer.SECOND * 0.01, this.generateDeathCircle, this);
        this.deathCircleActivation.timer.start();
    }

    pushAway(distance){
        this.test += 0.001 * distance;
    }

     pullIn(distance){
        this.test -= 0.001 * distance;
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

        }
    }


    /*
         this.deathCircles.forEach(function (deathCircle) {
             for (let i = 0; i < this.dots; i++) {
                 let n = this.dots - 1;
                 let x = radius * Math.cos(i * 2 * 3.141516 / n);
                 let y = radius * Math.sin(i * 2 * 3.141516 / n);
 
                 deathCircle.x = x + this.game.world.centerX;
                 deathCircle.y = y + this.game.world.centerY;
             }
             this.game.add.existing(deathCircle);
         }, this);
 
     }
     /*
 
 }
 */
    /*
 
    }
 
    */


    /*
   this.test++;
 
   var test2  = this.test % 90;
   var radius = test2;
   for (var i = 0; i < this.deathCircles.length; i++) {        
       for (let j = 0; j < this.dots; j++) {
           let n = this.dots - 1;
           let x = test2 * Math.cos(j * 2 * 3.141516 / n);
           let y = test2 * Math.sin(j * 2 * 3.141516 / n);
           
           this.deathCircles[i].x = x + this.game.world.centerX;
           this.deathCircles[i].y = y + this.game.world.centerY;
 
       }
       
   }
   */

}


