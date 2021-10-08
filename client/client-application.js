const socket = io();
const submissionsCdnLink = "https://cdn.jsdelivr.net/gh/IdreesInc/Graduation-Cap-Submissions@main/submissions.json";

let connectionWarning = document.getElementById("connection");
let brightnessSlider = document.getElementById("brightness");
let imageSelect = document.getElementById("image-select");
let overrideButton = document.getElementById("override");
let relinquishButton = document.getElementById("relinquish");
let graduationCapConnected = false;
let submissions = [];

function init() {
    localStorage.debug = 'socket.io-client:socket'
    
    fetch(submissionsCdnLink)
    .then(res => res.json())
    .then(out => {
        submissions = out.submissions;
        console.log("Downloaded Submissions: ", submissions);
        updateSubmissions();
    })
    .catch(err => { throw err; });

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

    overrideButton.addEventListener("click", () => {
        overrideImage(imageSelect.value);
    });

    relinquishButton.addEventListener("click", () => {
        socket.emit("relinquish", "Get on with it");
    });
}

function updateSubmissions() {
    let options = [];
    for (let i = 0; i < submissions.length; i++) {
        let submission = submissions[i];
        if (submission.design) {
            options.push("<option value='" + i + "'>" + submission.design + "</option>");
        }
    }
    imageSelect.innerHTML = options.join();
}

function overrideImage(designIndex) {
    console.log("Sending display override with index " + designIndex);
    socket.emit("display", designIndex);
}

init();