document.addEventListener("DOMContentLoaded", () => {
  let startTime = 0;
  let elapsedTime = 0;
  let timerInterval;
  const display = document.getElementById("display");
  const lapsContainer = document.getElementById("laps");

  function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedHH = hh.toString().padStart(2, "0");
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");

    return `${formattedHH}:${formattedMM}:${formattedSS}.${formattedMS}`;
  }

  function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      display.textContent = timeToString(elapsedTime);
    }, 10);
    toggleButtons(true);
  }

  function pause() {
    clearInterval(timerInterval);
    toggleButtons(false);
  }

  function reset() {
    clearInterval(timerInterval);
    display.textContent = "00:00:00.00";
    elapsedTime = 0;
    lapsContainer.innerHTML = "";
    toggleButtons(false);
  }

  function lap() {
    if (elapsedTime === 0) return;
    const li = document.createElement("li");
    li.textContent = `Lap ${lapsContainer.childElementCount + 1}: ${timeToString(elapsedTime)}`;
    lapsContainer.prepend(li);
  }

  function toggleButtons(running) {
    document.getElementById("start").disabled = running;
    document.getElementById("pause").disabled = !running;
  }

  document.getElementById("start").addEventListener("click", start);
  document.getElementById("pause").addEventListener("click", pause);
  document.getElementById("reset").addEventListener("click", reset);
  document.getElementById("lap").addEventListener("click", lap);
});
