let isRunning = false;
let startTime = 0;
let lapList = [];
let interval;

document.getElementById("lapList").style.display = "none"; // Hide the lap list

function startStop() {
  if (isRunning) {
    clearInterval(interval);
    document.getElementById("startStop").innerText = "Start";
  } else {
    startTime = Date.now() - (lapList.length > 0 ? lapList[lapList.length - 1].time : 0);
    interval = setInterval(updateStopwatch, 10);
    document.getElementById("startStop").innerText = "Stop";
  }
  isRunning = !isRunning;
}

function reset() {
  clearInterval(interval);
  document.getElementById("startStop").innerText = "Start";
  isRunning = false;
  startTime = 0;
  lapList = [];
  updateStopwatch(); // Update the displayed time to "00:00:00"
  const lapListElement = document.getElementById("lapList");
  lapListElement.style.display = "none"; // Hide the lap list
  lapListElement.innerHTML = "";
}


function lap() {
  if (isRunning) {
    document.getElementById("lapList").style.display = "block"; // Make the lap list visible

    const currentTime = Date.now() - startTime;
    const lapTime = new Date(currentTime).toISOString().substr(11, 8);
    lapList.push({ time: currentTime, lapTime: lapTime });
    updateLapList();
  }
}


function updateStopwatch() {
  if (isRunning) {
    const currentTime = Date.now() - startTime;
    const timeString = new Date(currentTime).toISOString().substr(11, 8);
    document.getElementById("stopwatch").textContent = timeString;
  } else {
    document.getElementById("stopwatch").textContent = "00:00:00"; // Reset to "00:00:00"
  }
}


function updateLapList() {
  const lapListElement = document.getElementById("lapList");
  lapListElement.innerHTML = "";

  lapList.forEach((lap, index) => {
    const lapTimeElement = document.createElement("li");
    lapTimeElement.textContent = `Lap ${index + 1}: ${lap.lapTime}`;
    lapListElement.appendChild(lapTimeElement);
  });
}