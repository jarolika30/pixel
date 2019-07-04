import './header.css';
import temp from './header.hbs';

export default function addHeader() {
  const main = document.querySelector('body');
  main.insertAdjacentHTML('afterbegin', temp());
}
