import { ob } from '../utils';

export default function paint() {
  ob.addColorChangeEventListener();
  document.querySelector('.toolbar').addEventListener('click', (event) => {
    document.onclick = null;
    const canvas = document.querySelector('.c-1');
    const ctx = canvas.getContext('2d');
    let x = 0;
    let y = 0;
    if (event.target.alt === 'triangle') {
      ob.resetEvents();
      const side = +document.getElementById('triangle-size').value;
      document.querySelector('.canvas').onclick = (ev) => {
        x = ev.offsetX;
        y = ev.offsetY;
        ob.makeTriangle(ctx, x, y, side);
        ob.getImageFromCanvas(event);
        document.removeEventListener('keypress', ob.getImageFromCanvas);
        document.addEventListener('keypress', ob.getImageFromCanvas);
      };
    } else if (event.target.alt === 'circle') {
      ob.resetEvents();
      const radius = +document.getElementById('circle-size').value;
      document.querySelector('.canvas').onclick = (ev) => {
        x = ev.offsetX;
        y = ev.offsetY;
        ob.makeCircle(ctx, x, y, radius);
        document.removeEventListener('keypress', ob.getImageFromCanvas);
        document.addEventListener('keypress', ob.getImageFromCanvas);
      };
    } else if (event.target.alt === 'priming') {
      ob.resetEvents();
      const select = document.getElementById('select');
      if (select.dataset.active === 'false') {
        document.querySelector('.canvas').onclick = () => {
          ob.paintAllPixels();
        };
      }
    } else if (event.target.alt === 'heart') {
      ob.resetEvents();
      document.querySelector('.canvas').onclick = (ev) => {
        x = ev.offsetX;
        y = ev.offsetY;
        ob.makeHeart(ctx, x, y);
        document.removeEventListener('keypress', ob.getImageFromCanvas);
        document.addEventListener('keypress', ob.getImageFromCanvas);
      };
    } else if (event.target.alt === 'paint') {
      ob.resetEvents();
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
          ob.makeShadow(ev, shadow, ctx, x, y, color, itemSize);
          ctx.restore();
        };
        document.removeEventListener('keypress', ob.getImageFromCanvas);
        document.addEventListener('keypress', ob.getImageFromCanvas);
      };
    } else if (event.target.alt === 'erase') {
      const canvasHtml = document.querySelector('.c-1');
      const itemSize = +canvasHtml.getAttribute('data-size');
      ob.resetEvents();
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
          ob.erasePixel(canvasHtml, ctx, x, y, itemSize);
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
      document.removeEventListener('keypress', ob.getImageFromCanvas);
      ob.resetEvents();
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
            ob.drawText(ctx, font, shadow, color, word, eX, eY);
            ctx.restore();
          }
        };
      };
    } else if (event.target.alt === 'pen') {
      ob.resetEvents();
      const diff = 1;
      const lineSize = +document.getElementById('pen-size').value;
      canvas.onmousedown = () => {
        canvas.onmousemove = (ev) => {
          x = ev.offsetX;
          y = ev.offsetY;
          ob.drawWithPen(ctx, x, y, diff, lineSize, canvas);
          ctx.restore();
          document.removeEventListener('keypress', ob.getImageFromCanvas);
          document.addEventListener('keypress', ob.getImageFromCanvas);
        };
      };
    } else if (event.target.alt === 'select') {
      ob.resetEvents();
      document.removeEventListener('keypress', ob.getImageFromCanvas);
      ob.canvasResetEvents(canvas);
      // eslint-disable-next-line
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
              ob.canvasResetEvents(canvas);
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
                    ob.canvasResetEvents(canvas);
                    document.querySelector('.toolbar').onclick = (eventTools) => {
                      if (eventTools.target.alt === 'priming') {
                        imageData = ctx.getImageData(x, y, width, height);
                        let color = document.querySelector('.color').value;
                        color = ob.hex2rgb(color);
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
                        ob.contrast(pixels);
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
                              ob.canvasResetEvents(canvas);
                              ob.drawPixel(prevX, prevY, height, width);
                              const canvasHtml = document.querySelector('.c-1');
                              if (canvasHtml.dataset.mode === '1') {
                                ob.fillPixel(nextXmove, nextYmove, width, height);
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
      ob.resetEvents();
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
            const colorHex = ob.getHexRGBColor(rgb);
            document.querySelector('.color').value = `#${colorHex}`;
            const paramColor = ob.getSecondColor(`#${colorHex}`);
            document.querySelector('.second-color').style.backgroundColor = `#${paramColor}`;
          } else {
            const color = window.getComputedStyle(ev.target).backgroundColor;
            const colorHex = ob.getHexRGBColor(color);
            if (color === 'rgba(0, 0, 0, 0)') {
              document.querySelector('.color').value = '#ffffff';
              document.querySelector('.second-color').style.backgroundColor = '#777777';
            } else {
              document.querySelector('.color').value = `#${colorHex}`;
              const paramColor = ob.getSecondColor(`#${colorHex}`);
              document.querySelector('.second-color').style.backgroundColor = `#${paramColor}`;
            }
          }
        }
      };
    }
  });
}
