import addCanvas from './canvas';
import Canvas from './canvasModel';

describe('addCanvas', () => {
  it('Should be an instance of Function', () => {
    expect(addCanvas).toBeInstanceOf(Function);
  });
});

describe('Canvas', () => {
  const canvas = new Canvas(300, 400);
  const { width, height, itemSize } = canvas;
  it('Should be an instance of Canvas', () => {
    expect(canvas).toBeInstanceOf(Canvas);
  });
  it('Width should be 300', () => {
    expect(width).toBe(300);
  });
  it('Height should be 400', () => {
    expect(height).toBe(400);
  });
  it('Size should be 15', () => {
    expect(itemSize).toBe(15);
  });
});
