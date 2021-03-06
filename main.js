const CARD_WIDTH = 168;
const CARD_HEIGHT = 234;

function calculateZIndex(x, y) {
    return Math.round(y*2*window.innerWidth + x);
}

function createCard(id, url, x, y) {
    const elem = document.createElement('img');
    elem.src = url;
    elem.id = 'img-' + id;
    elem.className = 'card';
    elem.draggable = true;
    elem.ondragstart = drag;
    elem.ondragover = over;
    elem.ondrop = drop;
    elem.onclick = rotate;
    elem.onmouseover = () => elem.style.zIndex = window.innerHeight*window.innerWidth*4;
    elem.onmouseout = () => elem.style.zIndex = calculateZIndex(
        +elem.style.left.match(/([\d\.]+)px/)[1],
        +elem.style.top.match(/([\d\.]+)px/)[1]);
    elem.height = CARD_HEIGHT;
    elem.width = CARD_WIDTH;
    elem.style.left = x + 'px';
    elem.style.top = y + 'px';
    elem.style.position = 'absolute';
    elem.style.zIndex = calculateZIndex(x, y);
    elem.style.transform = 'rotate(0deg)';
    return elem;
}

function rotate(ev) {
    ev.target.style.transform = ev.target.style.transform === 'rotate(90deg)'
        ? 'rotate(0deg)'
        : 'rotate(90deg)';
}

let dragData = null;
function drag(ev) {
    const { target } = ev;
    const dragX = ev.clientX;
    const dragY = ev.clientY;
    const cardX = +(ev.target.style.left.match(/([\d\.]+)px/)[1]);
    const cardY = +(ev.target.style.top.match(/([\d\.]+)px/)[1]);
    dragData = { target, dragX, dragY, cardX, cardY };
    ev.dataTransfer.dropEffect = 'move';
    ev.dataTransfer.setDragImage(document.getElementById('drag-img'), 0, 0);
}

function snap(x, y) {
    return [
        Math.round(x / (CARD_WIDTH / 5)) * (CARD_WIDTH / 5),
        Math.round(y / (CARD_HEIGHT / 5)) * CARD_HEIGHT / 5,
    ];
}

function over(ev) {
    ev.preventDefault();
    const { target, dragX, dragY, cardX, cardY } = dragData;
    const dx = ev.clientX - dragX;
    const dy = ev.clientY - dragY;
    const [x, y] = snap(cardX + dx, cardY + dy);
    target.style.zIndex = calculateZIndex(x, y);
    target.style.left = x + 'px';
    target.style.top = y + 'px';
}

function drop(ev) {
    ev.preventDefault();
    const { target, dragX, dragY, cardX, cardY } = dragData;
    const dx = ev.clientX - dragX;
    const dy = ev.clientY - dragY;
    const [x, y] = snap(cardX + dx, cardY + dy);
    target.style.zIndex = calculateZIndex(x, y);
    target.style.left = x + 'px';
    target.style.top = y + 'px';
}