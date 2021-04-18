const VIBRATION_SOUND = new Audio('audio/index/phone-vibration.wav');
const SOUND_ON = document.getElementsByClassName('sound-on')[0];
const SOUND_OFF = document.getElementsByClassName('sound-off')[0];
const TYPING_TEXT = document.getElementsByClassName('typing-text')[0];
const WORDS = ['Dette er en mobilfri oplevelse.', ''];
const PHONE = document.getElementsByClassName('phone')[0];
const TOGGLE_SWITCH = document.getElementsByClassName('toggle-switch')[0];
TOGGLE_SWITCH.checked = false;
const CONTAINER_1 = document.getElementsByClassName('container')[0];
const CONTAINER_2 = document.getElementsByClassName('container')[1];
const VIDEO = document.getElementsByClassName('video')[0];
let muted = true;

//Sound selection

async function onSoundSelection() {
  noRenderElement(SOUND_ON);
  noRenderElement(SOUND_OFF);
  renderElement(TYPING_TEXT);
  setTyper(text, WORDS);
  await sleep(3000);
  noRenderElement(TYPING_TEXT);
  await sleep(500);
  if (this.classList.value === 'sound-on no-render') {
    muted = false;
    VIBRATION_SOUND.loop = true;
    VIBRATION_SOUND.play();
  }
  renderElement(PHONE);
  renderElement(TOGGLE_SWITCH);
  setFlexDirection(CONTAINER_1, 'column');
}

SOUND_ON.addEventListener('click', onSoundSelection);
SOUND_OFF.addEventListener('click', onSoundSelection);

function noRenderElement(element) {
  element.classList.add('no-render');
}

function renderElement(element) {
  element.classList.remove('no-render');
}

function showElement(element) {
  element.classList.remove('hidden');
}

function setFlexDirection(element, direction) {
  element.style = `flex-direction: ${direction}`;
}

//Toggle switch clicked

TOGGLE_SWITCH.addEventListener('mousedown', onToggleSwitchClicked);
TOGGLE_SWITCH.addEventListener('click', onToggleSwitchClicked);

async function onToggleSwitchClicked() {
  TOGGLE_SWITCH.checked = true;
  VIBRATION_SOUND.pause();
  PHONE.classList.remove('vibrate');
  CONTAINER_1.classList.add('slide-out-top');
  await sleep(800);
  noRenderElement(CONTAINER_1);
  showElement(CONTAINER_2);
  if (muted) {
    VIDEO.volume = 0;
  }
  VIDEO.play();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//Typing-text

const text = document.querySelector('.typing-text');

function setTyper(element, words) {
  const LETTER_TYPE_DELAY = 30;
  const WORD_STAY_DELAY = 1000;
  const DIRECTION_FORWARDS = 0;
  const DIRECTION_BACKWARDS = 1;

  var direction = DIRECTION_FORWARDS;
  var wordIndex = 0;
  var letterIndex = 0;

  var wordTypeInterval;

  startTyping();

  function startTyping() {
    wordTypeInterval = setInterval(typeLetter, LETTER_TYPE_DELAY);
  }

  function typeLetter() {
    const word = words[wordIndex];
    console.log(word.length);
    if (direction == DIRECTION_FORWARDS) {
      letterIndex++;

      if (letterIndex == word.length) {
        direction = DIRECTION_BACKWARDS;
        clearInterval(wordTypeInterval);
        setTimeout(startTyping, WORD_STAY_DELAY);
      }
    } else if (direction == DIRECTION_BACKWARDS) {
      letterIndex--;
    }

    const textToType = word.substring(0, letterIndex);

    element.textContent = textToType;
  }
}
