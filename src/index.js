import addCanvas from './components/canvas/canvas';
import initCanvas from './components/canvasView/canvasView';
import addHeader from './components/header/header';
import addToolbar from './components/toolbar/toolbar';
import addCustomTools from './components/customTools/tools';
import addSlides from './components/slides/slides';
import addAnimation from './components/animation/animation';
import addExport from './components/export/export';
import addStorage from './components/localStorage/storage';
import exportCanvas from './components/export/exportCanvas';
import paint from './components/paint/paint';
import buttonInit from './components/buttonController/button';
import addSecondColor from './components/secondColor/secondColor';
import saveAndAddState from './components/localStorage/saveAndAddState';
import showPageOne from './components/preview/preview';
import addDragAndDrop from './components/dragAndDrop/swap';
import addFiguresSlider from './components/figuresTextSlider/figuresSlider';
import addKeyboardFunctionality from './components/keyboard/keyboard';
import addLayers from './components/layers/layers';
import makeLayers from './components/layers/layer';

function init() {
  addSlides();
  addToolbar();
  addSecondColor();
  addHeader();
  addCanvas();
  initCanvas();
  addAnimation();
  addExport();
  addStorage();
  saveAndAddState();
  paint();
  buttonInit();
  addCustomTools();
  exportCanvas();
  addFiguresSlider();
  addLayers();
  makeLayers();
  const slide = document.querySelector('.slide');
  addDragAndDrop(slide);
  addKeyboardFunctionality();

  const ref = document.querySelector('img.left');

  ref.onclick = () => {
    const body = document.querySelector('body');
    const child = document.querySelector('.main');
    const header = document.querySelector('.header');
    body.removeChild(child);
    body.removeChild(header);
    const main = document.createElement('main');
    main.setAttribute('class', 'main');
    body.appendChild(main);
    showPageOne();
    document.querySelector('.start-btn').onclick = () => {
      const parent = document.querySelector('.main');
      const child1 = document.querySelector('.preview');
      const body1 = document.querySelector('body');
      body1.style.color = 'black';
      parent.removeChild(child1);
      init();
    };
  };
}

showPageOne();
document.querySelector('.start-btn').onclick = () => {
  const parent = document.querySelector('.main');
  const child = document.querySelector('.preview');
  const body = document.querySelector('body');
  body.style.background = 'url(src/img/background.jpg)';
  body.style.opacity = 0.9;
  body.style.color = 'black';
  parent.removeChild(child);
  init();
};
