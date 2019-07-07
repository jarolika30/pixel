import './canvasView.css';
import Canvas from '../canvas/canvasModel';
import { ob } from '../utils';

export default function initCanvas() {
  const canvasElem = new Canvas(480, 480);
  ob.createCanvas(canvasElem);
  ob.drawStartPixels(canvasElem);
  return canvasElem;
}
