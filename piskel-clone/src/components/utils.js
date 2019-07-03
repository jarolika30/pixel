import addDragAndDrop from './dragAndDrop/swap';

// eslint-disable-next-line import/prefer-default-export
export const ob = {
  getHexRGBColor: function getHRGB(color) {
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
  },

  rgbToHsl: function rgbHsl(r1, g1, b1) {
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
      s = 0; // achromatic
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
  },

  hslToRgb: function hslRgb(h, s, l) {
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
  },

  getSecondColor: function getSecColor(color) {
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);
    if (r === 0 && g === 0 && b === 0) {
      return '#49423d';
    }
    const hsl = this.rgbToHsl(r, g, b);
    let h = parseFloat(hsl[0]);
    let s = parseFloat(hsl[1]);
    let l = parseFloat(hsl[2]);
    l -= 0.11;
    s -= 0.09;
    h += 0.06;
    const rgb = this.hslToRgb(h, s, l);
    const param = `rgb(${Math.abs(rgb[0])}, ${Math.abs(rgb[1])}, ${Math.abs(rgb[2])})`;
    const hex = this.getHexRGBColor(param);
    return hex;
  },

  drawPixel: function drPixel(x, y, height, width) {
    const canvasHtml = document.querySelector('.c-1');
    const itemSize = +canvasHtml.getAttribute('data-size');
    const ctx = canvasHtml.getContext('2d');
    let coordX = 0;
    let coordY = 0;
    let x2 = 0;
    if (x > itemSize) {
      x2 = x - (x % itemSize);
      coordX = x2;
    }
    if (y > itemSize) {
      const y2 = y - (y % itemSize);
      coordY = y2;
    }
    if (canvasHtml.dataset.mode === '1') {
      for (let i = 0; i < Math.ceil(height); i += itemSize) {
        for (let j = 0; j < Math.ceil(width); j += itemSize) {
          ctx.beginPath();
          ctx.rect(coordX, coordY, itemSize, itemSize);
          coordX += itemSize;
          ctx.fillStyle = '#bbbbbb';
          ctx.closePath();
          ctx.fill();
        }
        coordX = x2;
        coordY += itemSize;
      }
    } else {
      for (let i = 0; i < Math.ceil(height); i += itemSize) {
        for (let j = 0; j < Math.ceil(width); j += itemSize) {
          ctx.beginPath();
          ctx.rect(coordX, coordY, itemSize, itemSize);
          coordX += itemSize;
          ctx.strokeStyle = '#49423d';
          ctx.lineWidth = '1';
          ctx.fillStyle = '#bbbbbb';
          ctx.closePath();
          ctx.stroke();
          ctx.fill();
        }
        coordX = x2;
        coordY += itemSize;
      }
    }
  },

  fillPixel: function fill(x, y, width, height) {
    const canvasHtml = document.querySelector('.c-1');
    const itemSize = +canvasHtml.getAttribute('data-size');
    const ctx = canvasHtml.getContext('2d');
    let coordX = x;
    let coordY = y;
    for (let i = 0; i < Math.ceil(height); i += itemSize) {
      for (let j = 0; j < Math.ceil(width); j += itemSize) {
        if (i === 0) {
          ctx.beginPath();
          ctx.rect(coordX, coordY - itemSize + 1, itemSize, itemSize);
          coordX += itemSize;
          ctx.fillStyle = '#bbbbbb';
          ctx.closePath();
          ctx.fill();
        } else if ((i + itemSize) >= height) {
          ctx.beginPath();
          ctx.rect(coordX, coordY + itemSize - 8, itemSize, itemSize);
          coordX += itemSize;
          ctx.fillStyle = '#bbbbbb';
          ctx.closePath();
          ctx.fill();
        } else if (j === 0) {
          ctx.beginPath();
          ctx.rect(coordX - itemSize + 2, coordY, itemSize, itemSize);
          coordX += itemSize;
          ctx.fillStyle = '#bbbbbb';
          ctx.closePath();
          ctx.fill();
        } else if ((j + itemSize >= width)) {
          ctx.beginPath();
          ctx.rect(coordX + width - itemSize - 2, coordY, itemSize, itemSize);
          coordX += itemSize;
          ctx.fillStyle = '#bbbbbb';
          ctx.closePath();
          ctx.fill();
        }
      }
      coordX = x;
      coordY += itemSize;
    }
  },

  hex2rgb: function hexRgb(c) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : null;
  },

  getImageFromCanvas: function getCanvas() {
    const tmp = document.querySelector('.c-1');
    const img = document.getElementById('img');
    const ref = document.getElementById('save-img');
    img.src = tmp.toDataURL();
    const slide = document.querySelectorAll('.slide');
    const imgSlide = document.createElement('img');
    const way = tmp.toDataURL();
    imgSlide.src = way;
    ref.href = way;
    imgSlide.style.display = 'inline';
    imgSlide.style.width = '100px';
    imgSlide.style.height = '100px';
    // eslint-disable-next-line prefer-destructuring
    const id = slide[slide.length - 1].id;
    const idNext = (+id[6] + 1);
    if (document.querySelector(`#${id} img`)) {
      const newSlide = document.createElement('div');
      newSlide.setAttribute('class', 'slide');
      newSlide.setAttribute('id', `slide-${idNext}`);
      newSlide.appendChild(imgSlide);
      document.querySelector('.container').insertAdjacentElement('beforeend', newSlide);
      const dragElem = document.getElementById(`slide-${idNext}`);
      addDragAndDrop(dragElem);
    } else {
      slide[slide.length - 1].appendChild(imgSlide);
    }
    img.style.display = 'none';
  },

  makeTriangle: function mkTriangle(ctx, x, y, side = 100) {
    const length = side;
    const shadow = document.querySelector('.shadow');
    if (shadow.dataset.state === 'on') {
      shadow.dataset.state = 'off';
      ctx.save();
      ctx.shadowColor = document.querySelector('.second-color').style.backgroundColor;
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;
      ctx.shadowBlur = 5;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - Math.floor(length / 2), y + length);
      ctx.lineTo(x + Math.floor(length / 2), y + length);
      ctx.closePath();
      ctx.strokeStyle = '#49423d';
      ctx.lineWidth = '1';
      const color = document.querySelector('.color').value;
      ctx.fillStyle = color;
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
    } else {
      ctx.shadowColor = 'none';
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - Math.floor(length / 2), y + length);
      ctx.lineTo(x + Math.floor(length / 2), y + length);
      ctx.closePath();
      ctx.strokeStyle = '#49423d';
      ctx.lineWidth = '1';
      const color = document.querySelector('.color').value;
      ctx.fillStyle = color;
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
    }
    ctx.restore();
  },

  makeCircle: function mkTriangle(ctx, x, y, r = 50) {
    const radius = r;
    const startAngle = 0;
    const endAngle = Math.PI * 2;
    const shadow = document.querySelector('.shadow');
    if (shadow.dataset.state === 'on') {
      shadow.dataset.state = 'off';
      ctx.save();
      ctx.shadowColor = document.querySelector('.second-color').style.backgroundColor;
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;
      ctx.shadowBlur = 5;
      ctx.beginPath();
      ctx.arc(x, y, radius, startAngle, endAngle, false);
      ctx.closePath();
      ctx.strokeStyle = '#49423d';
      ctx.lineWidth = '1';
      const color = document.querySelector('.color').value;
      ctx.fillStyle = color;
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
    } else {
      ctx.shadowColor = 'none';
      ctx.beginPath();
      ctx.arc(x, y, radius, startAngle, endAngle, false);
      ctx.closePath();
      ctx.strokeStyle = '#49423d';
      ctx.lineWidth = '1';
      const color = document.querySelector('.color').value;
      ctx.fillStyle = color;
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
    }
    ctx.restore();
  },

  makeHeart: function mkHeart(ctx, x, y) {
    const shadow = document.querySelector('.shadow');
    if (shadow.dataset.state === 'on') {
      shadow.dataset.state = 'off';
      ctx.save();
      ctx.shadowColor = document.querySelector('.second-color').style.backgroundColor;
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;
      ctx.shadowBlur = 5;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(x, y - 3, x - 5, y - 15, x - 25, y - 15);
      ctx.bezierCurveTo(x - 55, y - 15, x - 55, y + 22.5, x - 55, y + 22.5);
      ctx.bezierCurveTo(x - 55, y + 40, x - 35, y + 62, x, y + 80);
      ctx.bezierCurveTo(x + 35, y + 62, x + 55, y + 40, x + 55, y + 22.5);
      ctx.bezierCurveTo(x + 55, y + 22.5, x + 55, y - 15, x + 25, y - 15);
      ctx.bezierCurveTo(x + 10, y - 15, x, y - 3, x, y);
      ctx.strokeStyle = '#49423d';
      ctx.lineWidth = '1';
      const color = document.querySelector('.color').value;
      ctx.fillStyle = color;
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
    } else {
      ctx.shadowColor = 'none';
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(x, y - 3, x - 5, y - 15, x - 25, y - 15);
      ctx.bezierCurveTo(x - 55, y - 15, x - 55, y + 22.5, x - 55, y + 22.5);
      ctx.bezierCurveTo(x - 55, y + 40, x - 35, y + 62, x, y + 80);
      ctx.bezierCurveTo(x + 35, y + 62, x + 55, y + 40, x + 55, y + 22.5);
      ctx.bezierCurveTo(x + 55, y + 22.5, x + 55, y - 15, x + 25, y - 15);
      ctx.bezierCurveTo(x + 10, y - 15, x, y - 3, x, y);
      ctx.strokeStyle = '#49423d';
      ctx.lineWidth = '1';
      const color = document.querySelector('.color').value;
      ctx.fillStyle = color;
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
    }
    ctx.restore();
  },

  contrast: function ctr(pixels) {
    const data = pixels;
    const gamma = +document.getElementById('slider').value;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 / (255 ** gamma) * (data[i] ** gamma);
      data[i + 1] = 255 / (255 ** gamma) * (data[i + 1] ** gamma);
      data[i + 2] = 255 / (255 ** gamma) * (data[i + 2] ** gamma);
    }
    return data;
  },
  paintAllPixels: function paint() {
    const firstColor = document.querySelector('.color').value;
    const canvasPaint = document.querySelector('.c-1');
    const ctxPaint = canvasPaint.getContext('2d');
    const imageData = ctxPaint.getImageData(0, 0, canvasPaint.width, canvasPaint.height);
    const color = this.hex2rgb(firstColor);
    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i] = color.r;
      imageData.data[i + 1] = color.g;
      imageData.data[i + 2] = color.b;
    }
    ctxPaint.putImageData(imageData, 0, 0);
  },
  getCtx: function getCTX() {
    const canvasPaint = document.querySelector('.c-1');
    const ctxPaint = canvasPaint.getContext('2d');
    return ctxPaint;
  },
  createInput: function crInput() {
    const el = document.createElement('input');
    el.setAttribute('class', 'coords');
    el.setAttribute('type', 'text');
    const header = document.querySelector('.header');
    header.appendChild(el);
    const input = document.querySelector('.coords');
    input.placeholder = 'Enter x, y separated by commas';
    return input;
  },
  writeText: function write(ctx, x, y, word) {
    const color = document.querySelector('.color').value;
    const shadow = document.querySelector('.second-color').style.backgroundColor;
    const font = +document.getElementById('font-size').value;
    ctx.beginPath();
    ctx.font = `${font}px Courier New`;
    ctx.shadowColor = shadow;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 5;
    ctx.fillStyle = color;
    ctx.fillText(word, x, y);
    ctx.closePath();
  },

};
