import './secondColor.css';
import temp from './secondColor.hbs';

export default function addSecondColor() {
  const section = document.querySelector('.toolbar');
  section.insertAdjacentHTML('beforeend', temp());
}
