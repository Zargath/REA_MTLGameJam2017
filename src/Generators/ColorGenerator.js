export default class {
/**
Darken a color based on its HSV value
with a percent
*/
  darkenColor(h, s, v, percent) {
    h = (v * (1 + percent) > 1) ? 1 : v * (1 + percent);
    return { h, s, v };
  }

/**
Convert HSV to RGB
*/
  HSVToRGB(h, s, v) {
    if (s === 0) {
      return { r: v, g: v, b: v };
    }

    let red = 0;
    let green = 0;
    let blue = 0;
    h /= 60;
    const hue = Math.floor(h);
    const f = h - hue;
    const p = v * (1 - s);
    const q = v * (1 - (f * s));
    const t = v * (1 - ((1 - f) * s));

    switch (hue) {
      case 0:
        red = v; green = t; blue = p;
        break;
      case 1:
        red = q; green = v; blue = p;
        break;
      case 2:
        red = p; green = v; blue = t;
        break;
      case 3:
        red = p; green = q; blue = v;
        break;
      case 4:
        red = t; green = p; blue = v;
        break;
      case 5:
        red = v; green = p; blue = q;
        break;
      default:red = 0; green = 0; blue = 0;
        break;
    }
    red = Math.floor(red * 256);
    green = Math.floor(green * 256);
    blue = Math.floor(blue * 256);
    return { r: red, g: green, b: blue };
  }

/**
Convert RGB to HSV
*/
  RGBToHSV(r, g, b) {
/*
if rgb are greater than 1 divide by 256
*/
    r = r > 1 ? r / 256 : r;
    g = g > 1 ? g / 256 : g;
    b = b > 1 ? b / 256 : b;
    let hue = 0;
    let sat = 0;
    let bri = 0;
    let delta = 0;
    let min = 0;
    let max = 0;

    min = Math.min(r, g, b);
    max = Math.max(r, g, b);

    bri = max;
    delta = max - min;

    if (max !== 0) {
      sat = delta / max;
    } else {
      sat = 0;
      hue = -1;
      return { h: hue, s: sat, v: bri };
    }
    if (r === max) {
      hue = (g - b) / delta;
    } else if (g === max) {
      hue = 2 + ((b - r) / delta);
    } else {
      hue = 4 + ((r - g) / delta);
    }

    hue *= 60;

    if (hue < 0) {
      hue += 360;
    }

    return { h: hue, s: sat, v: bri };
  }

  componentToHex(c) {
    const hex = c.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  }

  getRBGString(rgb) {
    return `#${this.componentToHex(rgb.r)}${this.componentToHex(rgb.g)}${this.componentToHex(rgb.b)}`;
  }
}
