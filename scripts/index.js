// get the element
const text = document.querySelector('.video-overlay-text');

// make a words array
const words = ['Find spor', 'Løs gåder', 'Knæk koder', 'Opklar mysterier', 'CITY ESCAPE'];

// start typing effect
setTyper(text, words);

function setTyper(element, words) {
  let letterTypeDelay = 35;
  let wordStayDelay = 1000;

  var wordIndex = 0;
  var letterIndex = 0;

  var wordTypeInterval;

  startTyping();

  function startTyping() {
    wordTypeInterval = setInterval(typeLetter, letterTypeDelay);
  }

  function typeLetter() {
    if (letterIndex == 0 && wordIndex == 0) {
      text.style.color = 'white';
      text.style.fontFamily = 'var(--main-font)';
      letterTypeDelay = 35;
      wordStayDelay = 1000;
    }

    if (letterIndex == 0 && wordIndex == words.length - 1) {
      text.style.color = 'var(--gold)';
      text.style.fontFamily = 'City Escape';
      text.textTransform = 'capitalize';
      wordStayDelay = 2000;
    }

    const word = words[wordIndex];
    letterIndex++;
    if (letterIndex == word.length) {
      clearInterval(wordTypeInterval);
      setTimeout(startTyping, wordStayDelay);

      setTimeout(nextWord);
    }
    if (letterIndex == 0) {
      nextWord();
    }
    const textToType = word.substring(0, letterIndex);
    element.textContent = textToType;
  }

  function nextWord() {
    letterIndex = 0;
    wordIndex++;
    if (wordIndex == words.length) {
      wordIndex = 0;
    }
  }
}
