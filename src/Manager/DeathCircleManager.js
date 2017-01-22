import Phaser from 'phaser';
import DeathCircle from '../sprites/DeathCircle';

export default class {

  constructor({ game, startingRadius, dots }) {
    this.game = game;
    this.startingRadius = startingRadius;
    this.dots = dots;

    this.changeColorAtRadius = 500;

    this.deathCirclesGroup = this.game.add.group();
    this.deathCirclesGroup.enableBody = true;
  }

  initialize() {
        // this.deathCircles = this.game.add.group();
    this.deathCircles = [];
    this.test = 0.80;

    for (let i = 0; i < this.dots; i += 1) {
      const n = this.dots - 1;
      const x = this.startingRadius * Math.cos((i * 2 * 3.141516) / n);
      const y = this.startingRadius * Math.sin((i * 2 * 3.141516) / n);
      const deathCircle = new DeathCircle(
        {
          game: this.game,
          x: x + this.game.world.centerX,
          y: y + this.game.world.centerY,
          asset: 'deathCircle',
        },
      );
      this.deathCircles.push(deathCircle);
      this.game.add.existing(deathCircle);
      this.deathCirclesGroup.add(deathCircle);
    }
    this.deathCircleActivation = this.game.time.events.loop(Phaser.Timer.SECOND * 0.00001, this.generateDeathCircle, this);
    this.deathCircleActivation.timer.start();
    // setupFilter();
  }

  setupFilter() {
    const fragmentSrc = [
      'precision mediump float;',
            // Incoming texture coordinates.
      'varying vec2 vTextureCoord;',
            // Incoming vertex color
      'varying vec4 vColor;',
            // Sampler for a) sprite image or b) rendertarget in case of game.world.filter
      'uniform sampler2D uSampler;',

      'uniform vec2      resolution;',
      'uniform float     time;',
      'uniform vec2      mouse;',

      'void main( void ) {',
            // colorRGBA = (y % 2) * texel(u,v);
      'gl_FragColor = mod(gl_FragCoord.y,2.0) * texture2D(uSampler, vTextureCoord);',
      '}',
    ];

    const scanlineFilter = new Phaser.Filter(this.game, null, fragmentSrc);
    this.game.world.filters = [scanlineFilter];
  }

  getDeathCircleGroup() {
    return this.deathCirclesGroup;
  }

  pushAway(distance) {
    this.test += 0.001;
    const radius = this.startingRadius * Math.cos(this.test);
    if (radius < this.startingRadius) {
      this.test -= 0.001 * distance;
    }
  }

  pullIn(distance) {
    this.test += 0.001 * distance;
  }

  calculateGreen(radius) {
    let colorValue = 0;
    colorValue = Math.min(255, (255 * (radius / this.changeColorAtRadius)));
    return colorValue;
  }

  calculateRed(radius) {
    let colorValue = 0;
    colorValue = Math.min(255, ((this.changeColorAtRadius - radius) / radius) * 255);
    return colorValue;
  }

  generateDeathCircle() {
    this.test += 0.001;
    const radius = this.startingRadius * Math.cos(this.test);

    for (let i = 0; i < this.deathCircles.length; i += 1) {
      const n = this.dots - 1;
      const x = radius * Math.cos((i * 2 * 3.141516) / n);
      const y = radius * Math.sin((i * 2 * 3.141516) / n);

      this.deathCircles[i].x = x + this.game.world.centerX;
      this.deathCircles[i].y = y + this.game.world.centerY;

      this.deathCircles[i].tint = this.rgbToHex(this.calculateRed(radius), this.calculateGreen(radius), 0);
    }
  }
  /* eslint-disable */
  rgbToHex(r, g, b) {
    return `0x${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }
  /* eslint-enable */
}
