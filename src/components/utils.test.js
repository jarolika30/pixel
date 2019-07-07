import { ob } from './utils';

describe('getHexRGBColor', () => {
  const rgb = ob.getHexRGBColor('rgb(0,0,0)');
  const rgb1 = ob.getHexRGBColor('rgb(102,66,0)');
  const rgb2 = ob.getHexRGBColor('rgb(87,35,35)');
  it('Should be an instance of Function', () => {
    expect(ob.getHexRGBColor).toBeInstanceOf(Function);
  });
  it('Should have the value 000000', () => {
    expect(rgb).toBe('000000');
  });
  it('Should have the value 664200', () => {
    expect(rgb1).toBe('664200');
  });
  it('Should have the value 572323', () => {
    expect(rgb2).toBe('572323');
  });
});

describe('hslToRgb', () => {
  const rgb = { r: 0, g: 60, b: 34 };
  const mas = ob.hslToRgb(rgb.r, rgb.g, rgb.b);
  it('Should be an instance of Function', () => {
    expect(ob.hslToRgb).toBeInstanceOf(Function);
  });
  it('Should return Array', () => {
    expect(mas).toBeInstanceOf(Array);
  });
});

describe('rgbToHsl', () => {
  const rgb = { r: 87, g: 35, b: 35 };
  const mas = ob.rgbToHsl(rgb.r, rgb.g, rgb.b);
  it('Should be an instance of Function', () => {
    expect(ob.rgbToHsl).toBeInstanceOf(Function);
  });
  it('Should return Array', () => {
    expect(mas).toBeInstanceOf(Array);
  });
});
