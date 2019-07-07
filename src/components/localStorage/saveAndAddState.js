import { ob } from '../utils';

export default function addAndSaveStorage() {
  document.querySelector('.load').addEventListener('click', () => {
    if (localStorage.getItem('color') !== null) {
      document.querySelector('.color').value = localStorage.getItem('color');
      const secondColor = document.querySelector('.second-color');
      const background = document.querySelector('.color').value;
      const paramColor = ob.getSecondColor(background);
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
