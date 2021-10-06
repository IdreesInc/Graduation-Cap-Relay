const socket = io();

let brightnessSlider = document.getElementById("brightness");

function init() {
    localStorage.debug = 'socket.io-client:socket'
    brightnessSlider.addEventListener("input", () => {
        socket.emit("brightness", brightnessSlider.value);
    });
}

init();