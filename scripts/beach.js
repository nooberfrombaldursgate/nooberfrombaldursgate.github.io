const BIRDS_TEXT = document.getElementById('birds-text');
const WATER_TEXT = document.getElementById('water-text');
const WAVES_TEXT = document.getElementById('waves-text');

const BIRDS_CIRCLE = document.getElementById('birds-circle');
const WATER_CIRCLE = document.getElementById('water-circle');
const WAVES_CIRCLE = document.getElementById('waves-circle');

const MEDITATION1_ICON = document.getElementsByClassName('meditation1')[0];
const MEDITATION1_TEXT = document.getElementsByClassName('meditation1')[1];
const MEDITATION2_ICON = document.getElementsByClassName('meditation2')[0];
const MEDITATION2_TEXT = document.getElementsByClassName('meditation2')[1];

BIRDS_TEXT.addEventListener('click', playAudioFile1);
WATER_TEXT.addEventListener('click', playAudioFile2);
WAVES_TEXT.addEventListener('click', playAudioFile3);

MEDITATION1_ICON.addEventListener('click', playAudioFile4);
MEDITATION1_TEXT.addEventListener('click', playAudioFile4);
MEDITATION2_ICON.addEventListener('click', playAudioFile5);
MEDITATION2_TEXT.addEventListener('click', playAudioFile5);

let audioElement = null;
let activeSound = null;

function playAudioFile1() {
  if (activeSound !== null) {
    clearActiveStyles();
    stopActivePlayback();
  }
  if (activeSound !== 'birds') {
    activeSound = 'birds';
    BIRDS_CIRCLE.style.fill = 'black';
    BIRDS_TEXT.style.fill = 'white';
    audioElement = new Audio(`audio/beach/birds.mp3`);
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
    if (activeSound !== 'water') {
      activeSound = 'water';
      WATER_CIRCLE.style.fill = 'black';
      WATER_TEXT.style.fill = 'white';
      audioElement = new Audio(`audio/beach/water.mp3`);
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
    if (activeSound !== 'waves') {
      activeSound = 'waves';
      WAVES_CIRCLE.style.fill = 'black';
      WAVES_TEXT.style.fill = 'white';
      audioElement = new Audio(`audio/beach/waves.mp3`);
      audioElement.volume = 1;
      audioElement.loop = true;
      audioElement.play();
    } else {
      activeSound = null;
    }
  }
}

function playAudioFile4() {
  {
    if (activeSound !== null) {
      clearActiveStyles();
      stopActivePlayback();
    }
    if (activeSound !== 'meditation1') {
      activeSound = 'meditation1';
      MEDITATION1_ICON.src = "images/beach/sound.png";
      audioElement = new Audio(`audio/beach/meditation1.mp3`);
      audioElement.volume = 1;
      audioElement.loop = true;
      audioElement.play();
    } else {
      activeSound = null;
    }
  }
}

  function playAudioFile5() {
  {
    if (activeSound !== null) {
      clearActiveStyles();
      stopActivePlayback();
    }
    if (activeSound !== 'meditation2') {
      activeSound = 'meditation2';
      MEDITATION2_ICON.src = "images/beach/sound.png";
      audioElement = new Audio(`audio/beach/meditation2.mp3`);
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
  WATER_CIRCLE.style.fill = 'none';
  WAVES_CIRCLE.style.fill = 'none';
  BIRDS_TEXT.style.fill = 'black';
  WATER_TEXT.style.fill = 'black';
  WAVES_TEXT.style.fill = 'black';
  MEDITATION1_ICON.src = "images/beach/no-sound.png";
  MEDITATION2_ICON.src = "images/beach/no-sound.png";
}