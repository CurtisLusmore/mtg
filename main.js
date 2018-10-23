const CARD_WIDTH = 168;
const CARD_HEIGHT = 234;

let zIndex = 0;
function bringToFront(ev) {
    ev.target.style.zIndex = ++zIndex;
}

function rotate(ev) {
    ev.target.style.transform = ev.target.style.transform === 'rotate(90deg)'
        ? 'rotate(0deg)'
        : 'rotate(90deg)';
}

function drag(ev) {
    bringToFront(ev);
    const id = ev.target.id;
    const dragX = ev.clientX;
    const dragY = ev.clientY;
    const cardX = ev.target.x;
    const cardY = ev.target.y;
    const data = { id, dragX, dragY, cardX, cardY };
    ev.dataTransfer.setData("text", JSON.stringify(data));
    ev.dataTransfer.dropEffect = 'move';
    ev.dataTransfer.setDragImage(document.getElementById('drag-img'), 0, 0);
}

function snap(x, y) {
    return [
        Math.round(x / (CARD_WIDTH / 10)) * (CARD_WIDTH / 10),
        Math.round(y / (CARD_HEIGHT / 10)) * CARD_HEIGHT / 10,
    ];
}

function over(ev) {
    ev.preventDefault();
    const { id, dragX, dragY, cardX, cardY } = JSON.parse(ev.dataTransfer.getData("text"));
    const elem = document.getElementById(id);
    const dx = ev.clientX - dragX;
    const dy = ev.clientY - dragY;
    const [x, y] = snap(cardX + dx, cardY + dy);
    elem.style.left = x + 'px';
    elem.style.top = y + 'px';
}

function drop(ev) {
    ev.preventDefault();
    const { id, dragX, dragY, cardX, cardY } = JSON.parse(ev.dataTransfer.getData("text"));
    const elem = document.getElementById(id);
    const dx = ev.clientX - dragX;
    const dy = ev.clientY - dragY;
    const [x, y] = snap(cardX + dx, cardY + dy);
    elem.style.left = x + 'px';
    elem.style.top = y + 'px';
}