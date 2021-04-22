const BIRDS_TEXT = document.getElementById('birds-text');
const CAMPFIRE_TEXT = document.getElementById('campfire-text');
const RAIN_TEXT = document.getElementById('rain-text');

const BIRDS_CIRCLE = document.getElementById('birds-circle');
const CAMPFIRE_CIRCLE = document.getElementById('campfire-circle');
const RAIN_CIRCLE = document.getElementById('rain-circle');

let activeSound = null;

BIRDS_TEXT.addEventListener('click', playAudioFile1);
CAMPFIRE_TEXT.addEventListener('click', playAudioFile2);
RAIN_TEXT.addEventListener('click', playAudioFile3);
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
    audioElement = new Audio(`audio/shelter/birds.mp3`);
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
      CAMPFIRE_CIRCLE.style.fill = 'black';
      CAMPFIRE_TEXT.style.fill = 'white';
      audioElement = new Audio(`audio/shelter/campfire.mp3`);
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
    if (activeSound !== 'rain') {
      activeSound = 'rain';
      RAIN_CIRCLE.style.fill = 'black';
      RAIN_TEXT.style.fill = 'white';
      audioElement = new Audio(`audio/shelter/rain.wav`);
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
  CAMPFIRE_CIRCLE.style.fill = 'none';
  RAIN_CIRCLE.style.fill = 'none';
  BIRDS_TEXT.style.fill = 'black';
  CAMPFIRE_TEXT.style.fill = 'black';
  RAIN_TEXT.style.fill = 'black';
}
