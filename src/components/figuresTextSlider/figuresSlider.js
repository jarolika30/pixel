import './figuresSlider.css';
import temp from './figuresSlider.hbs';

export default function addFiguresSlider() {
  const main = document.querySelector('.view');
  main.insertAdjacentHTML('beforeend', temp());
}
