import './preview.css';
import temp from './preview.hbs';

export default function showPageOne() {
  const main = document.querySelector('.main');
  const body = document.querySelector('body');
  body.style.background = 'url(src/img/background.jpg)';
  body.style.color = 'white';
  main.insertAdjacentHTML('beforeend', temp());
}
