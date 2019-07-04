import './animation.css';
import temp from './animation.hbs';

export default function addAnimation() {
  const main = document.querySelector('.main');
  main.insertAdjacentHTML('beforeend', temp());
}
