// eslint-disable-next-line import/named
import { ob } from '../utils';

export default function addKeyboardFunctionality() {
  document.addEventListener('keypress', (event) => {
    if (event.key === 'A' || event.key === 'a') {
      ob.paintAllPixels();
    } else if (event.key === 'Q') {
      ob.getImageFromCanvas(event);
    } else if (event.key === 'B' || event.key === 'b') {
      const input = ob.createInput();
      input.oninput = () => {
        document.onkeypress = (ev) => {
          if (ev.key === 'R' || ev.key === 'r') {
            const coordsXY = ob.getCoordsFromInput(input);
            const ctx = ob.getCtx();
            ob.makeCircle(ctx, coordsXY[0], coordsXY[1]);
            document.onkeypress = null;
          }
        };
      };
    } else if (event.key === 'C' || event.key === 'c') {
      const input = ob.createInput();
      input.oninput = () => {
        document.onkeypress = (ev) => {
          if (ev.key === 'R' || ev.key === 'r') {
            const coordsXY = ob.getCoordsFromInput(input);
            const ctx = ob.getCtx();
            ob.makeTriangle(ctx, coordsXY[0], coordsXY[1]);
            document.onkeypress = null;
          }
        };
      };
    } else if (event.key === 'D' || event.key === 'd') {
      const input = ob.createInput();
      input.oninput = () => {
        document.onkeypress = (ev) => {
          if (ev.key === 'R' || ev.key === 'r') {
            const coordsXY = ob.getCoordsFromInput(input);
            const ctx = ob.getCtx();
            ob.makeHeart(ctx, coordsXY[0], coordsXY[1]);
            document.onkeypress = null;
          }
        };
      };
    } else if (event.key === 'E' || event.key === 'e') {
      const input = ob.createInput();
      input.oninput = () => {
        document.onkeypress = (ev) => {
          if (ev.key === 'R' || ev.key === 'r') {
            const values = ob.getCoordsFromInput(input);
            const ctx = ob.getCtx();
            ob.writeText(ctx, values[0], values[1], values[2]);
            document.onkeypress = null;
          }
        };
      };
    }
  });
}
