import './layers.css';
import temp from './layers.hbs';

export default function addLayers() {
  const main = document.querySelector('.view');
  main.insertAdjacentHTML('beforeend', temp());
}
