import Phaser from 'phaser';

export default class extends Phaser.TileSprite {

  constructor({ game }) {
    super(game, 0, 0, game.canvas.width, game.canvas.height, 'background');

    this.game = game;
    this.speed = 2;

    this.cursors = game.input.keyboard.createCursorKeys();
  }

  update(){
    if (this.cursors.left.isDown)
    {
        this.tilePosition.x += this.speed;
    }
    else if (this.cursors.right.isDown)
    {
        this.tilePosition.x -= this.speed;
    }

    if (this.cursors.up.isDown)
    {
        this.tilePosition.y += this.speed;
    }
    else if (this.cursors.down.isDown)
    {
        this.tilePosition.y -= this.speed;
    }
  }
}
