import { ob } from '../utils';

const GIF = require('./gif');

export function getGif() {
  const g = new GIF({
    workers: 2,
    quality: 10,
    workerScript: './gif.worker.js',
    width: 480,
    height: 480,
  });
  return g;
}

export default function exportCanvas() {
  document.querySelector('.save-file').addEventListener('click', (event) => {
    event.preventDefault();
    const type = document.querySelector('.file-type').value;
    if (type === 'jpg') {
      const canvas = document.querySelector('.c-1');
      const ctx = canvas.getContext('2d');
      const imgs = document.querySelectorAll('.slide img');
      ob.placePicturesOnSprite(ctx, canvas, imgs);
      const data = canvas.toDataURL('image/jpeg', 0.9);
      const a = document.createElement('a');
      document.querySelector('.canvas').appendChild(a);
      a.href = data;
      a.download = 'sprite.jpg';
      a.click();
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
      document.querySelector('.canvas').removeChild(a);
    } else if (type === 'gif') {
      const gif = getGif();
      const imgArr = document.querySelectorAll('.slide img');
      imgArr.forEach(item => gif.addFrame(item));
      gif.on('finished', (blob) => {
        window.open(URL.createObjectURL(blob));
      });
      gif.render();
    }
  });
}
