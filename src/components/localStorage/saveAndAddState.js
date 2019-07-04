function getHexRGBColor(color) {
  let res = color.replace(/\s/g, '');
  const aRGB = res.match(/^rgb\((\d{1,3}[%]?),(\d{1,3}[%]?),(\d{1,3}[%]?)\)$/i);
  if (aRGB) {
    res = '';
    for (let i = 1; i <= 3; i += 1) {
      // eslint-disable-next-line radix
      res += Math.round((aRGB[i][aRGB[i].length - 1] === '%' ? 2.55 : 1) * Number.parseInt(aRGB[i])).toString(16).replace(/^(.)$/, '0$1');
    }
  } else res = res.replace(/^#?([\da-f])([\da-f])([\da-f])$/i, '$1$1$2$2$3$3');
  return res;
}

function hslToRgb(h, s, l) {
  let r;
  let g;
  let b;
  if (s === 0) {
    r = 1;
    g = 1;
    b = l;
  } else {
    const hue2rgb = function hue2rgb(p1, q1, t1) {
      const p = p1;
      const q = q1;
      let t = t1;
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function rgbToHsl(r1, g1, b1) {
  const r = r1 / 255;
  const g = g1 / 255;
  const b = b1 / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = -1;
  let s = -1;
  const l = (max + min) / 2;

  if (max === min) {
    h = 0;
    s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g: h = (b - r) / d + 2;
        break;
      case b: h = (r - g) / d + 4;
        break;
      default:
        break;
    }
    h /= 6;
  }
  return [h, s, l];
}

function getSecondColor(color) {
  const r = parseInt(color.substring(1, 3), 16);
  const g = parseInt(color.substring(3, 5), 16);
  const b = parseInt(color.substring(5, 7), 16);
  if (r === 0 && g === 0 && b === 0) {
    return '#49423d';
  }
  const hsl = rgbToHsl(r, g, b);
  let h = parseFloat(hsl[0]);
  let s = parseFloat(hsl[1]);
  let l = parseFloat(hsl[2]);
  l -= 0.11;
  s -= 0.09;
  h += 0.06;
  const rgb = hslToRgb(h, s, l);
  const param = `rgb(${Math.abs(rgb[0])}, ${Math.abs(rgb[1])}, ${Math.abs(rgb[2])})`;
  const hex = getHexRGBColor(param);
  return hex;
}

export default function addAndSaveStorage() {
  document.querySelector('.load').addEventListener('click', () => {
    if (localStorage.getItem('color') !== null) {
      document.querySelector('.color').value = localStorage.getItem('color');
      const secondColor = document.querySelector('.second-color');
      const background = document.querySelector('.color').value;
      const paramColor = getSecondColor(background);
      secondColor.style.backgroundColor = `#${paramColor}`;
    }
    if (localStorage.getItem('myCanvas') !== null) {
      const img = new Image();
      const canvas = document.querySelector('.c-1');
      const context = canvas.getContext('2d');
      img.onload = function getImg() {
        context.drawImage(img, 0, 0);
      };
      img.src = localStorage.getItem('myCanvas');
    }
  });

  document.querySelector('.save').addEventListener('click', () => {
    const color = document.querySelector('.color').value;
    const canvas = document.querySelector('.c-1');
    localStorage.setItem('color', color);
    localStorage.setItem('myCanvas', canvas.toDataURL());
  });
}
