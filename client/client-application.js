const socket = io();

localStorage.debug = 'socket.io-client:socket'

function init() {
    initMatrix();
}

function initMatrix() {
    let matrix = document.getElementById("matrix");

    function createDot(row, column) {
        let cell = document.createElement("div");
        cell.id = "cell-" + row + "-" + column;
        cell.className = "cell";
        let dot = document.createElement("div");
        dot.id = "dot-" + row + "-" + column;
        dot.className = "dot";
        cell.appendChild(dot);
        matrix.appendChild(cell);
    }
    
    function draw(x, y) {
        let rect = matrix.getBoundingClientRect();
        let column = Math.floor(x / (rect.width / 32));
        let row = Math.floor(y / (rect.height / 32));
        document.getElementById("dot-" + row + "-" + column).classList.add("glow");
        document.getElementById("cons").innerHTML = ("drawing at " + x + " " + y)
        socket.emit("draw", [[column, row]]);
    }
    
    for (let row = 0; row < 32; row++) {
        for (let column = 0; column < 32; column++) {
            createDot(row, column);
        }
    }
    
    ["mousedown", "mousemove"].forEach(eventName => matrix.addEventListener(eventName, e => {
        if (e.buttons > 0) {
            let rect = matrix.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            draw(x, y)
        }
    }));
    
    ["touchstart", "touchmove"].forEach(eventName => matrix.addEventListener(eventName, e => {
        if (e.touches.length === 1) {
            let rect = matrix.getBoundingClientRect();
            let x = e.touches[0].clientX - rect.left;
            let y = e.touches[0].clientY - rect.top;
            draw(x, y)
        }
    }));
}

init();