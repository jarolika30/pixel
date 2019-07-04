import addDragAndDrop from '../dragAndDrop/swap';

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

function drawPixel(x, y, height, width) {
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
}

function fillPixel(x, y, width, height) {
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
}

function hex2rgb(c) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
}

function getImageFromCanvas(event) {
  if (event.keyCode === 13) {
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
  }
}

function makeTriangle(ctx, x, y, side = 100) {
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
}

function makeCircle(ctx, x, y, r = 50) {
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
}

function makeHeart(ctx, x, y) {
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
}

function contrast(pixels) {
  const data = pixels;
  const gamma = +document.getElementById('slider').value;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255 / (255 ** gamma) * (data[i] ** gamma);
    data[i + 1] = 255 / (255 ** gamma) * (data[i + 1] ** gamma);
    data[i + 2] = 255 / (255 ** gamma) * (data[i + 2] ** gamma);
  }
  return data;
}

export default function paint() {
  document.querySelector('.color').addEventListener('change', () => {
    const secondColor = document.querySelector('.second-color');
    const background = document.querySelector('.color').value;
    const paramColor = getSecondColor(background);
    secondColor.style.backgroundColor = `#${paramColor}`;
  });
  document.querySelector('.toolbar').addEventListener('click', (event) => {
    document.onclick = null;
    const canvas = document.querySelector('.c-1');
    const ctx = canvas.getContext('2d');
    let x = 0;
    let y = 0;
    if (event.target.alt === 'triangle') {
      document.querySelector('.canvas').onclick = null;
      document.querySelector('.canvas').onmousedown = null;
      document.querySelector('.canvas').onmousemove = null;
      const side = +document.getElementById('triangle-size').value;
      document.querySelector('.canvas').onclick = (ev) => {
        x = ev.offsetX;
        y = ev.offsetY;
        makeTriangle(ctx, x, y, side);
        getImageFromCanvas(event);
        document.removeEventListener('keypress', getImageFromCanvas);
        document.addEventListener('keypress', getImageFromCanvas);
      };
    } else if (event.target.alt === 'circle') {
      document.querySelector('.canvas').onclick = null;
      document.querySelector('.canvas').onmousedown = null;
      document.querySelector('.canvas').onmousemove = null;
      const radius = +document.getElementById('circle-size').value;
      document.querySelector('.canvas').onclick = (ev) => {
        x = ev.offsetX;
        y = ev.offsetY;
        makeCircle(ctx, x, y, radius);
        document.removeEventListener('keypress', getImageFromCanvas);
        document.addEventListener('keypress', getImageFromCanvas);
      };
    } else if (event.target.alt === 'priming') {
      document.querySelector('.canvas').onclick = null;
      document.querySelector('.canvas').onmousedown = null;
      document.querySelector('.canvas').onmousemove = null;
      const select = document.getElementById('select');
      if (select.dataset.active === 'false') {
        document.querySelector('.canvas').onclick = () => {
          const firstColor = document.querySelector('.color').value;
          const canvasPaint = document.querySelector('.c-1');
          const ctxPaint = canvasPaint.getContext('2d');
          const imageData = ctxPaint.getImageData(x, y, canvasPaint.width, canvasPaint.height);
          const color = hex2rgb(firstColor);
          for (let i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i] = color.r;
            imageData.data[i + 1] = color.g;
            imageData.data[i + 2] = color.b;
          }
          ctx.putImageData(imageData, x, y);
        };
      }
    } else if (event.target.alt === 'heart') {
      document.querySelector('.canvas').onclick = null;
      document.querySelector('.canvas').onmousedown = null;
      document.querySelector('.canvas').onmousemove = null;
      document.querySelector('.canvas').onclick = (ev) => {
        x = ev.offsetX;
        y = ev.offsetY;
        makeHeart(ctx, x, y);
        document.removeEventListener('keypress', getImageFromCanvas);
        document.addEventListener('keypress', getImageFromCanvas);
      };
    } else if (event.target.alt === 'paint') {
      document.querySelector('.canvas').onclick = null;
      document.querySelector('.canvas').onmousedown = null;
      document.querySelector('.canvas').onmousemove = null;
      document.querySelector('.canvas').onmousemove = function click() {
        const canvasHtml = document.querySelector('.c-1');
        const itemSize = +canvasHtml.getAttribute('data-size');
        let color = 'black';
        const secondColor = document.querySelector('.second-color').style.backgroundColor;
        document.querySelector('.canvas').onmousedown = function mouseClick(ev) {
          document.oncontextmenu = function def() {
            return false;
          };
          if (ev.button === 0) {
            color = document.querySelector('.color').value;
          } else if (ev.button === 2) {
            color = secondColor;
          }
          if (ev.offsetX > itemSize) {
            const x2 = ev.offsetX - (ev.offsetX % itemSize);
            x = x2;
          } else {
            x = 0;
          }
          if (ev.offsetY > itemSize) {
            const y2 = ev.offsetY - (ev.offsetY % itemSize);
            y = y2;
          } else {
            y = 0;
          }
          const shadow = document.querySelector('.shadow');
          ctx.save();
          if (shadow.dataset.state === 'on') {
            shadow.dataset.state = 'off';
            ctx.shadowColor = document.querySelector('.second-color').style.backgroundColor;
            if (ev.button === 2) {
              ctx.shadowColor = document.querySelector('.color').value;
            }
            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 5;
            ctx.shadowBlur = 5;
            ctx.beginPath();
            ctx.rect(x, y, itemSize, itemSize);
            ctx.strokeStyle = '#49423d';
            ctx.lineWidth = '1';
            ctx.fillStyle = color;
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
          } else {
            ctx.shadowColor = 'none';
            ctx.beginPath();
            ctx.rect(x, y, itemSize, itemSize);
            ctx.strokeStyle = '#49423d';
            ctx.lineWidth = '1';
            ctx.fillStyle = color;
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
          }
          ctx.restore();
        };
        document.removeEventListener('keypress', getImageFromCanvas);
        document.addEventListener('keypress', getImageFromCanvas);
      };
    } else if (event.target.alt === 'erase') {
      const canvasHtml = document.querySelector('.c-1');
      const itemSize = +canvasHtml.getAttribute('data-size');
      document.querySelector('.canvas').onclick = null;
      document.querySelector('.canvas').onmousedown = null;
      document.querySelector('.canvas').onmousemove = null;
      document.querySelector('.canvas').onmousemove = function click() {
        document.querySelector('.canvas').onmousedown = function mouseClick(ev) {
          if (ev.offsetX > itemSize) {
            const x2 = ev.offsetX - (ev.offsetX % itemSize);
            x = x2;
          }
          if (ev.offsetY > itemSize) {
            const y2 = ev.offsetY - (ev.offsetY % itemSize);
            y = y2;
          }
          if (canvasHtml.dataset.mode === '1') {
            ctx.beginPath();
            ctx.rect(x, y, itemSize, itemSize);
            ctx.strokeStyle = '#bbbbbb';
            ctx.lineWidth = '2';
            ctx.fillStyle = '#bbbbbb';
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
          } else {
            ctx.beginPath();
            ctx.rect(x, y, itemSize, itemSize);
            ctx.strokeStyle = '#49423d';
            ctx.lineWidth = '1';
            ctx.fillStyle = '#bbbbbb';
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
          }
        };
      };
    } else if (event.target.alt === 'erase-all') {
      const canvasHtml = document.querySelector('.c-1');
      const itemSize = +canvasHtml.getAttribute('data-size');
      document.querySelector('#erase-all').onclick = () => {
        if (canvasHtml.dataset.mode === '1') {
          ctx.clearRect(0, 0, canvasHtml.width, canvasHtml.height);
          for (let i = 0; i < canvasHtml.height; i += itemSize) {
            for (let j = 0; j < canvasHtml.width; j += itemSize) {
              ctx.beginPath();
              ctx.rect(j, i, itemSize, itemSize);
              ctx.fillStyle = '#bbbbbb';
              ctx.closePath();
              ctx.fill();
            }
          }
        } else {
          ctx.clearRect(0, 0, canvasHtml.width, canvasHtml.height);
          for (let i = 0; i < canvasHtml.height; i += itemSize) {
            for (let j = 0; j < canvasHtml.width; j += itemSize) {
              ctx.beginPath();
              ctx.rect(j, i, itemSize, itemSize);
              ctx.strokeStyle = '#49423d';
              ctx.fillStyle = '#bbbbbb';
              ctx.lineWidth = '1';
              ctx.closePath();
              ctx.stroke();
              ctx.fill();
            }
          }
        }
      };
    } else if (event.target.alt === 'text') {
      document.removeEventListener('keypress', getImageFromCanvas);
      document.querySelector('.canvas').onclick = null;
      document.querySelector('.canvas').onmousedown = null;
      document.querySelector('.canvas').onmousemove = null;
      const color = document.querySelector('.color').value;
      const shadow = document.querySelector('.second-color').style.backgroundColor;
      const font = +document.getElementById('font-size').value;
      document.querySelector('.canvas').onclick = (evCoords) => {
        const eX = evCoords.offsetX;
        const eY = evCoords.offsetY;
        let word = '';
        document.onkeypress = (keyEvent) => {
          word += String.fromCharCode(keyEvent.keyCode);
          if (keyEvent.keyCode === 13) {
            ctx.save();
            ctx.beginPath();
            ctx.font = `${font}px Courier New`;
            ctx.shadowColor = shadow;
            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 5;
            ctx.shadowBlur = 5;
            ctx.fillStyle = color;
            ctx.fillText(word, eX, eY);
            ctx.closePath();
            document.onkeypress = null;
            ctx.restore();
          }
        };
      };
    } else if (event.target.alt === 'pen') {
      document.querySelector('.canvas').onclick = null;
      document.querySelector('.canvas').onmousedown = null;
      document.querySelector('.canvas').onmousemove = null;
      const diff = 2;
      const lineSize = +document.getElementById('pen-size').value;
      canvas.onmousedown = () => {
        canvas.onmousemove = (ev) => {
          x = ev.offsetX;
          y = ev.offsetY;
          const shadow = document.querySelector('.shadow');
          const shadowColor = document.querySelector('.second-color').style.backgroundColor;
          if (shadow.dataset.state === 'on') {
            ctx.save();
            ctx.shadowColor = shadowColor;
            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 5;
            ctx.shadowBlur = 5;
            ctx.beginPath();
            ctx.fillRect(x - diff, y - diff, lineSize, lineSize);
            ctx.fillStyle = document.querySelector('.color').value;
            ctx.closePath();
            ctx.fill();
            canvas.onmouseup = () => {
              shadow.dataset.state = 'off';
              canvas.onmousedown = null;
              canvas.onmousemove = null;
            };
          } else {
            ctx.shadowColor = 'none';
            ctx.beginPath();
            ctx.fillRect(x - diff, y - diff, lineSize, lineSize);
            ctx.fillStyle = document.querySelector('.color').value;
            ctx.closePath();
            ctx.fill();
            canvas.onmouseup = () => {
              canvas.onmousedown = null;
              canvas.onmousemove = null;
            };
          }
          ctx.restore();
          document.removeEventListener('keypress', getImageFromCanvas);
          document.addEventListener('keypress', getImageFromCanvas);
        };
      };
    } else if (event.target.alt === 'select') {
      document.querySelector('.canvas').onclick = null;
      document.querySelector('.canvas').onmousedown = null;
      document.querySelector('.canvas').onmousemove = null;
      document.removeEventListener('keypress', getImageFromCanvas);
      canvas.onmousemove = null;
      canvas.onmousedown = null;
      canvas.onkeypress = null;
      document.querySelector('.toolbar').onclick = null;
      const select = document.getElementById('select');
      let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const imageDataFirst = ctx.getImageData(0, 0, canvas.width, canvas.height);
      canvas.onmousedown = () => {
        canvas.onmousemove = (ev) => {
          if (select.dataset.active === 'false') {
            x = ev.offsetX;
            y = ev.offsetY;
            select.dataset.active = 'true';
            ctx.beginPath();
            ctx.putImageData(imageData, 0, 0);
            ctx.strokeStyle = 'black';
            ctx.fillStyle = 'rgba(100,150,185,0.5)';
            ctx.fillRect(x, y, 100, 100);
            ctx.strokeRect(x, y, 100, 100);
            ctx.closePath();
            canvas.onmouseup = () => {
              canvas.onmousedown = null;
              canvas.onmousemove = null;
              canvas.onmousedown = () => {
                canvas.onmousemove = (eventNext) => {
                  const nextX = eventNext.offsetX;
                  const nextY = eventNext.offsetY;
                  let width = 100;
                  let height = 100;
                  ctx.beginPath();
                  if (nextX > (100 - x)) {
                    width += nextX - 100;
                  } else {
                    width -= 100 - nextX;
                  }
                  if (nextY > 100 - y) {
                    height += nextY - 100;
                  } else {
                    height -= nextY - y;
                  }
                  ctx.putImageData(imageData, 0, 0);
                  ctx.strokeStyle = '#49423d';
                  ctx.fillStyle = 'rgba(100,150,185,0)';
                  ctx.fillRect(x, y, width, height);
                  ctx.strokeRect(x, y, width, height);
                  ctx.closePath();
                  document.onkeypress = () => {
                    canvas.onmousemove = null;
                    canvas.onmousedown = null;
                    document.querySelector('.toolbar').onclick = (eventTools) => {
                      if (eventTools.target.alt === 'priming') {
                        imageData = ctx.getImageData(x, y, width, height);
                        let color = document.querySelector('.color').value;
                        color = hex2rgb(color);
                        for (let i = 0; i < imageData.data.length; i += 4) {
                          imageData.data[i] = color.r;
                          imageData.data[i + 1] = color.g;
                          imageData.data[i + 2] = color.b;
                        }
                        ctx.putImageData(imageData, x, y);
                        imageData = null;
                        select.dataset.active = 'false';
                      } else if (eventTools.target.alt === 'light-dark') {
                        imageData = ctx.getImageData(x, y, width, height);
                        const pixels = imageData.data;
                        contrast(pixels);
                        ctx.putImageData(imageData, x, y);
                        imageData = null;
                        select.dataset.active = 'false';
                      } else if (eventTools.target.alt === 'move') {
                        const prevX = x;
                        const prevY = y;
                        document.onkeypress = null;
                        canvas.onmousedown = () => {
                          imageData = ctx.getImageData(x, y, width, height);
                          // eslint-disable-next-line max-len
                          canvas.onmousemove = (eventMove) => {
                            const nextXmove = eventMove.offsetX;
                            const nextYmove = eventMove.offsetY;
                            ctx.putImageData(imageDataFirst, 0, 0);
                            ctx.putImageData(imageData, nextXmove, nextYmove);
                            canvas.onmouseup = () => {
                              canvas.onmousemove = null;
                              canvas.onmousedown = null;
                              drawPixel(prevX, prevY, height, width);
                              const canvasHtml = document.querySelector('.c-1');
                              if (canvasHtml.dataset.mode === '1') {
                                fillPixel(nextXmove, nextYmove, width, height);
                              }
                              select.dataset.active = 'false';
                              canvas.onmouseup = null;
                              imageData = null;
                            };
                          };
                        };
                      }
                    };
                  };
                };
              };
            };
          }
        };
      };
    } else if (event.target.alt === 'choose') {
      document.querySelector('.canvas').onclick = null;
      document.querySelector('.canvas').onmousedown = null;
      document.querySelector('.canvas').onmousemove = null;
      document.onclick = (ev) => {
        if (ev.target !== document.querySelector('#choose img')) {
          if (ev.target === document.querySelector('.c-1')) {
            x = ev.offsetX;
            y = ev.offsetY;
            const imgData = ctx.getImageData(x, y, 1, 1).data;
            const R = imgData[0];
            const G = imgData[1];
            const B = imgData[2];
            const rgb = `rgb(${R}, ${G}, ${B})`;
            const colorHex = getHexRGBColor(rgb);
            document.querySelector('.color').value = `#${colorHex}`;
            const paramColor = getSecondColor(`#${colorHex}`);
            document.querySelector('.second-color').style.backgroundColor = `#${paramColor}`;
          } else {
            const color = window.getComputedStyle(ev.target).backgroundColor;
            const colorHex = getHexRGBColor(color);
            if (color === 'rgba(0, 0, 0, 0)') {
              document.querySelector('.color').value = '#ffffff';
              document.querySelector('.second-color').style.backgroundColor = '#777777';
            } else {
              document.querySelector('.color').value = `#${colorHex}`;
              const paramColor = getSecondColor(`#${colorHex}`);
              document.querySelector('.second-color').style.backgroundColor = `#${paramColor}`;
            }
          }
        }
      };
    }
  });
}
