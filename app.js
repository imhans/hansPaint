const canvas = document.getElementById("jsCanvas"),
context = canvas.getContext("2d"),
colors = document.getElementsByClassName("jsColor"),
range = document.getElementById("jsRange"),
mode = document.getElementById("jsMode"),
save = document.getElementById("jsSave"),
clear = document.getElementById("jsClear");

const INITIAL_COLOR = "#2c2c2c";
const INITIAL_SIZE = 500;

let painting = false,
filling = false;

canvas.width = INITIAL_SIZE; canvas.height = INITIAL_SIZE;
context.strokeStyle = INITIAL_COLOR;
context.fillStyle = INITIAL_COLOR;
context.lineWidth = 2.5;

function stopPainting() {
    painting = false;
}
function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        context.beginPath();
        context.moveTo(x, y);
    } else {
        context.lineTo(x, y);
        context.stroke();
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    context.strokeStyle = color;
    context.fillStyle = color;
}

function handleRangeChange(event) {
    const lineSize = event.target.value;
    context.lineWidth = lineSize;
}

function handleModeClick() {
    if (filling) {
        filling = false;
        mode.innerText = "Fill";
    }
    else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleClickCanvas() {
    if (filling) {
        context.fillRect(0, 0, INITIAL_SIZE, INITIAL_SIZE);
    }
}

function canvasDefaultSetting() {
    context.fillStyle = "white";
    context.fillRect(0, 0, INITIAL_SIZE, INITIAL_SIZE);
}

function handleContextMenu(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "YourCanvas";
    link.click();
}

function init() {
    if (canvas) {
        canvasDefaultSetting();
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", startPainting);
        canvas.addEventListener("mouseup", stopPainting);
        canvas.addEventListener("mouseleave", stopPainting);
        canvas.addEventListener("click", handleClickCanvas);
        canvas.addEventListener("contextmenu", handleContextMenu);
    }
    Array.from(colors).forEach(color => 
        color.addEventListener("click", handleColorClick)
    );

    if (range) {
        range.addEventListener("input", handleRangeChange);
    }

    if (mode) {
        mode.addEventListener("click", handleModeClick);
    }

    if (save) {
        save.addEventListener("click", handleSaveClick);
    }

    if (clear) {
        clear.addEventListener("click", canvasDefaultSetting);
    }
}
init();