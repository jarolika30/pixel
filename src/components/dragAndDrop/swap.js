function swapElements(source, target) {
  const temp = document.createElement('div');
  if (source !== null) {
    source.parentNode.insertBefore(temp, source);
    target.parentNode.insertBefore(source, target);
    temp.parentNode.insertBefore(target, temp);
    temp.parentNode.removeChild(temp);
  }
}

export default function addDragAndDrop(element) {
  element.setAttribute('draggable', 'true');
  element.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text', e.target.id);
    e.dataTransfer.dropEffect = 'move';
  });
  element.addEventListener('drop', (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text');
    const dragElement = document.getElementById(data);
    swapElements(dragElement, e.target);
  });
  element.addEventListener('dragover', e => e.preventDefault());
}
