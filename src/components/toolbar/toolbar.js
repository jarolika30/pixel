import './toolbar.css';
import temp from './toolbar.hbs';

export default function addToolbar() {
  const main = document.querySelector('.main');
  main.insertAdjacentHTML('afterbegin', temp());
}
