// eslint-disable-next-line import/named
import { ob } from '../utils';

export default function addKeyboardFunctionality() {
  document.addEventListener('keypress', (event) => {
    if (event.key === 'A' || event.key === 'a') {
      ob.paintAllPixels();
    } else if (event.key === 'Q') {
      ob.getImageFromCanvas(event);
    } else if (event.key === 'B' || event.key === 'b') {
      // const ctx = ob.getCtx();
      const input = ob.createInput();
      input.oninput = () => {
        document.onkeypress = (ev) => {
          if (ev.key === 'R' || ev.key === 'r') {
            const values = document.querySelector('.coords').value;
            const coords = values.split(', ');
            let x = +coords[0];
            let y = +coords[1];
            if (Number.isNaN(x) || Number.isNaN(y)) {
              x = 50;
              y = 50;
            }
            const header = document.querySelector('.header');
            header.removeChild(input);
            const ctx = ob.getCtx();
            ob.makeCircle(ctx, x, y);
            document.onkeypress = null;
          }
        };
        // ob.makeCircle(ctx);
      };
    } else if (event.key === 'C' || event.key === 'c') {
      const input = ob.createInput();
      input.oninput = () => {
        document.onkeypress = (ev) => {
          if (ev.key === 'R' || ev.key === 'r') {
            const values = document.querySelector('.coords').value;
            const coords = values.split(', ');
            let x = +coords[0];
            let y = +coords[1];
            if (Number.isNaN(x) || Number.isNaN(y)) {
              x = 50;
              y = 50;
            }
            const header = document.querySelector('.header');
            header.removeChild(input);
            const ctx = ob.getCtx();
            ob.makeTriangle(ctx, x, y);
            document.onkeypress = null;
          }
        };
        // ob.makeCircle(ctx);
      };
    } else if (event.key === 'D' || event.key === 'd') {
      const input = ob.createInput();
      input.oninput = () => {
        document.onkeypress = (ev) => {
          if (ev.key === 'R' || ev.key === 'r') {
            const values = document.querySelector('.coords').value;
            const coords = values.split(', ');
            let x = +coords[0];
            let y = +coords[1];
            if (Number.isNaN(x) || Number.isNaN(y)) {
              x = 50;
              y = 50;
            }
            const header = document.querySelector('.header');
            header.removeChild(input);
            const ctx = ob.getCtx();
            ob.makeHeart(ctx, x, y);
            document.onkeypress = null;
          }
        };
        // ob.makeCircle(ctx);
      };
    } else if (event.key === 'E' || event.key === 'e') {
      const input = ob.createInput();
      input.oninput = () => {
        document.onkeypress = (ev) => {
          if (ev.key === 'R' || ev.key === 'r') {
            const values = document.querySelector('.coords').value;
            const coords = values.split(', ');
            let x = +coords[0];
            let y = +coords[1];
            if (Number.isNaN(x) || Number.isNaN(y)) {
              x = 50;
              y = 50;
            }
            const header = document.querySelector('.header');
            header.removeChild(input);
            const ctx = ob.getCtx();
            ob.makeHeart(ctx, x, y);
            document.oninput = null;
            document.onkeypress = null;
          }
        };
        // ob.makeCircle(ctx);
      };
    } else if (event.key === 'K' || event.key === 'k') {
      console.log(event);
    }
  });
}
