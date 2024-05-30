// Get elements
const minElem = document.getElementById('min');
const secElem = document.getElementById('sec');
const msecElem = document.getElementById('msec');
const resetBtn = document.getElementById('resetBtn');
const playPauseBtn = document.getElementById('playPauseBtn');
const lapsBtn = document.getElementById('lapsBtn');
const lapList = document.getElementById('lapList');
const clearLapsBtn = document.getElementById('clearLapsBtn');
const bg = document.getElementById("outercircle");

// Variables
let interval;
let isRunning = false;
let startTime;
let elapsedTime = 0;

// Functions
function startTimer() {
  startTime = Date.now() - elapsedTime;
  interval = setInterval(updateTime, 10);
  playPauseBtn.textContent = 'Pause';
  bg.classList.add("animation-bg");
}

function pauseTimer() {
  clearInterval(interval);
  playPauseBtn.textContent = 'Play';
  bg.classList.remove("animation-bg");
}

function resetTimer() {
  clearInterval(interval);
  elapsedTime = 0;
  ResetTime();
  lapList.innerHTML = '';
  playPauseBtn.textContent = 'Play';
  bg.classList.remove("animation-bg");
}

function updateTime() {
  const now = Date.now();
  elapsedTime = now - startTime;
  const formattedTime = formatTime(elapsedTime);
  minElem.textContent = formattedTime.minutes +' ' + ':';
  secElem.textContent = formattedTime.seconds +' ' + ':';
  msecElem.textContent = formattedTime.milliseconds ;
}
function ResetTime() {
  const now = Date.now();
  /*elapsedTime = now - startTime;
  const formattedTime = formatTime(elapsedTime);*/
  minElem.textContent = '00'+' '+':';
  secElem.textContent =  '00'+' '+':';
  msecElem.textContent = '00';
}



function formatTime(time) {
  const totalSeconds = Math.floor(time / 1000);
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  const milliseconds = Math.floor((time % 1000) / 10).toString().padStart(2, '0');
  return { minutes, seconds, milliseconds };
}

function addLap() {
  const lapTime = `${minElem.textContent} : ${secElem.textContent} : ${msecElem.textContent}`;
  const lapItemId = `lap${lapList.children.length + 1}`; // Generate unique ID for lap item
  const lapItem = document.createElement('li');
  lapItem.classList.add('lap-item');

  const lapNumber = document.createElement('span');
  lapNumber.classList.add('number');
  lapNumber.textContent = `*${lapList.children.length + 1}`;

  const lapTimeStamp = document.createElement('span');
  lapTimeStamp.classList.add('time-stamp');
  lapTimeStamp.textContent = lapTime;

  lapItem.appendChild(lapNumber);
  lapItem.appendChild(lapTimeStamp);
  lapList.appendChild(lapItem);
}


// Event listeners
resetBtn.addEventListener('click', resetTimer);
playPauseBtn.addEventListener('click', () => {
  if (isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
  isRunning = !isRunning;
});
lapsBtn.addEventListener('click', addLap);
clearLapsBtn.addEventListener('click', () => {
  lapList.innerHTML = '';
});
