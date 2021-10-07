const socket = io();

let connectionWarning = document.getElementById("connection");
let brightnessSlider = document.getElementById("brightness");
let graduationCapConnected = false;

function init() {
    localStorage.debug = 'socket.io-client:socket'

    socket.on("graduation-cap-connected", (data) => {
        console.log("Graduation cap has connected!");
        graduationCapConnected = true;
        connectionWarning.className = "connected";
    });

    socket.on("graduation-cap-disconnected", (data) => {
        console.log("Graduation cap has disconnected!");
        graduationCapConnected = false;
        connectionWarning.className = "disconnected";
    });

    brightnessSlider.addEventListener("input", () => {
        socket.emit("brightness", brightnessSlider.value);
    });
}

init();