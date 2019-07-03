import './storage.css';
import temp from './storage.hbs';

export default function addStorage() {
  const main = document.querySelector('.view');
  main.insertAdjacentHTML('beforeend', temp());
}
