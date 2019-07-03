import './slides.css';
import temp from './slides.hbs';

export default function addSlides() {
  const main = document.querySelector('.main');
  main.insertAdjacentHTML('beforeend', temp());
}
