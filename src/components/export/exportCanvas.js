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
    // const gif = new window._.GIF({
    //   workers: 2,
    //   quality: 10,
    // });
    const type = document.querySelector('.file-type').value;
    if (type === 'jpg') {
      const canvas = document.querySelector('.c-1');
      const ctx = canvas.getContext('2d');
      const imgs = document.querySelectorAll('.slide img');
      const size = 200;
      let x = 30;
      let y = 10;
      const margin = 10;
      const marginHeight = 240;
      for (let i = 0; i < imgs.length; i += 1) {
        if (i === 4) break;
        if (i === 0) ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
        if (i === 2) {
          x = 30;
          y = x + size;
        } else if (i === 1) {
          x = marginHeight;
          y = margin;
        } else if (i === 3) {
          x = marginHeight;
          y = marginHeight - margin;
        }
        const img = new Image();
        img.src = imgs[i].src;
        ctx.drawImage(img, x, y, size, size);
      }
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
