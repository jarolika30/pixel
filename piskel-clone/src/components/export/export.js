import './export.css';
import temp from './export.hbs';

export default function addExport() {
  const main = document.querySelector('.view');
  main.insertAdjacentHTML('beforeend', temp());
}
