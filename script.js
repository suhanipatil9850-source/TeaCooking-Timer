const minutesInput = document.getElementById("minutes");
const display = document.getElementById("display");
const statusText = document.getElementById("status");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

let remainingSeconds = Number(minutesInput.value) * 60;
let timerId = null;

function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function render() {
  display.textContent = formatTime(remainingSeconds);
}

function syncButtons(isRunning) {
  startBtn.disabled = isRunning;
  pauseBtn.disabled = !isRunning;
}

function finishTimer() {
  clearInterval(timerId);
  timerId = null;
  syncButtons(false);
  statusText.textContent = "Time's up! Stop writing!";
}

function startTimer() {
  const minutes = Number(minutesInput.value);

  if (!Number.isFinite(minutes) || minutes <= 0) {
    statusText.textContent = "Please enter a valid number of minutes.";
    return;
  }

  if (!timerId) {
    if (remainingSeconds <= 0) {
      remainingSeconds = Math.floor(minutes * 60);
      render();
    }

    statusText.textContent = "Timer running...";
    syncButtons(true);

    timerId = setInterval(() => {
      remainingSeconds -= 1;
      render();

      if (remainingSeconds <= 0) {
        remainingSeconds = 0;
        render();
        finishTimer();
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timerId);
  timerId = null;
  syncButtons(false);
  statusText.textContent = "Paused";
}

function resetTimer() {
  clearInterval(timerId);
  timerId = null;
  remainingSeconds = Math.floor(Number(minutesInput.value || 0) * 60);
  if (!Number.isFinite(remainingSeconds) || remainingSeconds < 0) {
    remainingSeconds = 0;
  }
  render();
  syncButtons(false);
  statusText.textContent = "Ready";
}

minutesInput.addEventListener("change", () => {
  if (!timerId) {
    resetTimer();
  }
});

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

render();
syncButtons(false);
