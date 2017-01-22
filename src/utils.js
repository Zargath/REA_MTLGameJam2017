export const centerGameObjects = (objects) => {
  objects.forEach((object) => {
    object.anchor.setTo(0.5);
  });
};

export const setResponsiveWidth = (sprite, percent, parent) => {
  const percentWidth = ((sprite.texture.width - (parent.width / (100 / percent))) * 100) / sprite.texture.width;
  sprite.width = parent.width / (100 / percent);
  sprite.height = sprite.texture.height - ((sprite.texture.height * percentWidth) / 100);
};

export const getRandomArbitrary = (min, max) => (Math.random() * (max - min)) + min;

export const getRandomInt = (min, max) => Math.floor(Math.random() * ((max - min) + 1)) + min;

export const numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const radiansToDegrees = radians => (radians * 180) / Math.PI;
