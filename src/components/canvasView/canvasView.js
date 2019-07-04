import './canvasView.css';

class Canvas {
  constructor(width, height, size = 15) {
    this.itemSize = size;
    this.width = width;
    this.height = height;
  }
}

export default function initCanvas() {
  const canvasElem = new Canvas(480, 480);
  const canvas = document.createElement('canvas');
  canvas.setAttribute('class', 'c-1');
  canvas.setAttribute('width', `${canvasElem.width}`);
  canvas.setAttribute('height', `${canvasElem.height}`);
  canvas.setAttribute('data-size', canvasElem.itemSize);
  canvas.setAttribute('title', 'canvas');
  document.querySelector('.canvas').appendChild(canvas);
  const canvasHtml = document.querySelector('.c-1');
  const itemSize = +canvasHtml.getAttribute('data-size');
  const ctx = canvasHtml.getContext('2d');
  const color = [];
  const pixel = itemSize;
  const columns = Math.floor(canvasElem.width / pixel);
  const rows = Math.floor(canvasElem.height / pixel);

  for (let i = 0; i < rows; i += 1) {
    color[i] = [];
    for (let j = 0; j < columns; j += 1) {
      color[i][j] = '#bbbbbb';
    }
  }
  canvasElem.colors = color;
  for (let i = 0; i < canvasElem.height; i += pixel) {
    for (let j = 0; j < canvasElem.width; j += pixel) {
      ctx.beginPath();
      ctx.rect(j, i, pixel, pixel);
      ctx.strokeStyle = '#49423d';
      ctx.lineWidth = '1';
      [[ctx.fillStyle]] = canvasElem.colors;
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
    }
  }
  return canvasElem;
}
