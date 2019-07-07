// import addDragAndDrop from '../dragAndDrop/swap';
// eslint-disable-next-line import/named
import { ob } from '../utils';

export default function buttonInit() {
  const timer = { id: 0 };
  ob.onClickButtonAdd();
  ob.onClickButtonDelete();
  ob.onClickButtonCopy();
  ob.onClickAnimation(timer.id);
}
