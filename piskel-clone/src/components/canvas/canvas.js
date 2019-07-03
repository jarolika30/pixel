import './canvas.css';
import temp from './canvas.hbs';

export default function addCanvas() {
  const main = document.querySelector('.main');
  main.insertAdjacentHTML('beforeend', temp());
}
