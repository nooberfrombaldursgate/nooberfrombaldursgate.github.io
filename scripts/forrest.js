const BIRDS_TEXT = document.getElementById('birds-text');
const RAIN_TEXT = document.getElementById('rain-text');
const THUNDER_TEXT = document.getElementById('thunder-text');

const BIRDS_CIRCLE = document.getElementById('birds-circle');
const RAIN_CIRCLE = document.getElementById('rain-circle');
const THUNDER_CIRCLE = document.getElementById('thunder-circle');

let activeSound = null;

BIRDS_TEXT.addEventListener('click', playAudioFile1);
RAIN_TEXT.addEventListener('click', playAudioFile2);
THUNDER_TEXT.addEventListener('click', playAudioFile3);
let audioElement = null;

function playAudioFile1() {
  if (activeSound !== null) {
    clearActiveStyles();
    stopActivePlayback();
  }
  if (activeSound !== 'birds') {
    activeSound = 'birds';
    BIRDS_CIRCLE.style.fill = 'black';
    BIRDS_TEXT.style.fill = 'white';
    audioElement = new Audio(`audio/forrest/birds.mp3`);
    audioElement.volume = 1;
    audioElement.loop = true;
    audioElement.play();
  } else {
    activeSound = null;
  }
}

function playAudioFile2() {
  {
    if (activeSound !== null) {
      clearActiveStyles();
      stopActivePlayback();
    }
    if (activeSound !== 'campfire') {
      activeSound = 'campfire';
      RAIN_CIRCLE.style.fill = 'black';
      RAIN_TEXT.style.fill = 'white';
      audioElement = new Audio(`audio/forrest/rain.wav`);
      audioElement.volume = 1;
      audioElement.loop = true;
      audioElement.play();
    } else {
      activeSound = null;
    }
  }
}

function playAudioFile3() {
  {
    if (activeSound !== null) {
      clearActiveStyles();
      stopActivePlayback();
    }
    if (activeSound !== 'thunder') {
      activeSound = 'thunder';
      THUNDER_CIRCLE.style.fill = 'black';
      THUNDER_TEXT.style.fill = 'white';
      audioElement = new Audio(`audio/forrest/thunder.wav`);
      audioElement.volume = 1;
      audioElement.loop = true;
      audioElement.play();
    } else {
      activeSound = null;
    }
  }
}

function isPlaying(element) {
  console.log(element.paused);
  if (element.paused) {
    return false;
  }
  return true;
}

function stopActivePlayback() {
  if (audioElement !== null) {
    if (isPlaying(audioElement)) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
  }
}

function clearActiveStyles() {
  BIRDS_CIRCLE.style.fill = 'none';
  RAIN_CIRCLE.style.fill = 'none';
  THUNDER_CIRCLE.style.fill = 'none';
  BIRDS_TEXT.style.fill = 'black';
  RAIN_TEXT.style.fill = 'black';
  THUNDER_TEXT.style.fill = 'black';
}
