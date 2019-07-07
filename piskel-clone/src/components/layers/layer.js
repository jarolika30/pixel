export default function makeLayers() {
  // eslint-disable-next-line
  const images = [];
  document.querySelector('.create-layer').addEventListener('click', () => {
    // eslint-disable-next-line
    const color = document.querySelector('.color-ignore').value;
    const canvas = document.querySelector('.c-1');
    const ctx = canvas.getContext('2d');
    // eslint-disable-next-line
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  });
}
