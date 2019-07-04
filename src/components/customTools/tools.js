function hiddenShowPixel() {
  let count = 0;
  const canvasHtml = document.querySelector('.c-1');
  canvasHtml.setAttribute('data-mode', 0);
  const ctx = canvasHtml.getContext('2d');

  function hiddenPixel() {
    ctx.clearRect(0, 0, canvasHtml.width, canvasHtml.height);
    ctx.beginPath();
    ctx.fillStyle = '#bbbbbb';
    ctx.fillRect(0, 0, canvasHtml.width, canvasHtml.height);
    ctx.closePath();
  }
  function showPixel() {
    const itemSize = +canvasHtml.getAttribute('data-size');
    const pixel = itemSize;
    for (let i = 0; i < canvasHtml.height; i += pixel) {
      for (let j = 0; j < canvasHtml.width; j += pixel) {
        ctx.beginPath();
        ctx.rect(j, i, pixel, pixel);
        ctx.strokeStyle = '#49423d';
        ctx.lineWidth = '0.5';
        ctx.closePath();
        ctx.stroke();
      }
    }
  }
  document.querySelector('.hidden-pixel').onclick = () => {
    count += 1;
    if (count % 2 !== 0) {
      hiddenPixel();
      canvasHtml.dataset.mode = 1;
    } else {
      showPixel();
      canvasHtml.dataset.mode = 0;
    }
  };
}

function deleteSlides() {
  const slide = document.querySelector('.container');
  const children = document.querySelectorAll('.slide');
  let count = children.length;
  while (count !== 1) {
    slide.removeChild(children[count - 1]);
    count -= 1;
  }
  const slideFirst = document.querySelector('.slide');
  const img = document.querySelector('.slide img');
  if (img !== null) {
    slideFirst.removeChild(img);
  }
}
function redrawCanvas(ctx, size, width, height) {
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < height; i += size) {
    for (let j = 0; j < width; j += size) {
      ctx.beginPath();
      ctx.rect(j, i, size, size);
      ctx.strokeStyle = '#49423d';
      ctx.fillStyle = '#bbbbbb';
      ctx.lineWidth = '1';
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
    }
  }
}

export default function addCustomTools() {
  hiddenShowPixel();
  document.querySelector('.radios').addEventListener('change', (ev) => {
    const canvas = document.querySelector('.c-1');
    const ctx = canvas.getContext('2d');
    let pixelSize = ev.target.value;
    switch (pixelSize) {
      case '32': pixelSize = 15;
        break;
      case '48': pixelSize = 10;
        break;
      case '24': pixelSize = 20;
        break;
      default: pixelSize = 10;
    }
    canvas.dataset.size = pixelSize;
    deleteSlides();
    redrawCanvas(ctx, pixelSize, canvas.width, canvas.height);
  });
  document.querySelector('.shadow').addEventListener('click', () => {
    const shadow = document.querySelector('.shadow');
    shadow.dataset.state = 'on';
  });
}
