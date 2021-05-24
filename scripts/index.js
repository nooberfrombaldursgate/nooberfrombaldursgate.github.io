// VIDEO OVERLAY TEXT

/*
 * Denne js funktionalitet styrer den typewriter teksteffekt, der er på index.html i video overlayet
 * Koden er baseret på nedenstående codepen snippet, men er modificeret rigtigt meget:
 * https://codepen.io/varunpvp/pen/jeVLrG
 *
 * Først laver vi et array med ord (konstant). Så laver vi en konstant og sætter den til vores h1 element i HTML DOM'en.
 * Til sidst kalder vi setTyper funktionen.
 *
 * setTyper funktionen tager de to konstanter som inputsparametrer
 */

const WORDS = [
  'Find spor',
  'Løs gåder',
  'Knæk koder',
  'Opklar mysterier',
  'CITY ESCAPE',
];
const TEXT = document.querySelector('.video-overlay-text');
setTyper(TEXT, WORDS);

function setTyper(element, WORDS) {
  /*
   * Vi laver en række variabler:
   * letterTypeDelay = hvor meget forsinkelse der skal være mellem hvert tegn
   * wordStayDelay = hvor meget forsinkelse der skal være mellem hvert ord (hvor lang tid før skift til næste ord i array)
   * letterIndex = indeks for at styre for langt vi er mht tegn
   * wordIndex = indeks for at styre for langt vi er mht ord
   */

  let letterTypeDelay = 35;
  let wordStayDelay = 1000;
  let letterIndex = 0;
  let wordIndex = 0;
  let wordTypeInterval;

  /*
   * metode som kalder den indbyggede setInterval metode, som igen kalder vores typeLetter metode (defineres længere nede).
   * setInterval tillader os derfor at kalde vores egen metode ved et specifikt tidsinterval (her 35 ms)
   *
   * 1. inputsparameter: vores typeLetter funktion, som defineres længere nede
   * 2. inputsparameter: forsinkelsen ml. hvert tegn (35 ms)
   *
   * setInterval metoden er en del af web worker api'en som muliggør at man kan køre en script operation i en baggrundstråd, som er
   * sepereret fra hovedtråden. med andre ord kan man køre sideløbende/asynkrone funktioner, så de f.eks. ikke sløver js-baseret
   * UI-interaktion unødigt.
   * kilde: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API
   */

  startTyping();
  function startTyping() {
    // funktionsudtryk/'function expression' hvor vi gemmer vores metodekald i vores wordTypeInterval variabel
    wordTypeInterval = setInterval(typeLetter, letterTypeDelay);
  }

  // metode som skriver et tegn ad gangen
  function typeLetter() {
    // tjek for at sætte farve, skrift og forsinkelse skifter tilbage til normalen efter sidste ord (CITY ESCAPE)
    if (letterIndex == 0 && wordIndex == 0) {
      TEXT.style.color = 'white';
      TEXT.style.fontFamily = 'var(--main-font)';
      TEXT.style.fontSize = '30px';
      TEXT.style.paddingTop = '0';
      letterTypeDelay = 35;
      wordStayDelay = 1000;
    }

    // tjek for at lave farve-, skrift og forsinkelsesændringer ved sidste ord (CITY ESCAPE)
    if (letterIndex == 0 && wordIndex == WORDS.length - 1) {
      TEXT.style.color = 'var(--gold)';
      TEXT.style.fontFamily = 'City Escape';
      TEXT.textTransform = 'capitalize';
      TEXT.style.fontSize = '24px';
      TEXT.style.paddingTop = '10px';
      wordStayDelay = 2000;
    }

    // laver en konst fra vores array fra nuværende ordindeks og inkrementerer vores tegnindeks
    const WORD = WORDS[wordIndex];
    letterIndex++;

    /*
     * hvis letterIndex er lig word.length, ved vi skal vi ikke længere
     * vi kalder clearInterval på vores funktionsudtryk: wordTypeInterval
     */

    if (letterIndex == WORD.length) {
      /*
       * clearInterval stopper og rydder den nuværende tråd fra vores setInterval. hvis ikke vi havde den med
       * ville der kommer flere og flere tråde og til sidst ville browseren crashe.
       */
      clearInterval(wordTypeInterval);

      /*
       * setTimeout fungerer ligesom setInterval, men i stedet for at kalde funktionen gentagende gange kalder
       * den kun funktionen 1 gang efter den angivne forsinkelse (vores wordStayDelay på 1000ms)
       *
       * fordi vi lige ovenfor har ryddet den nuværende tråd, skal vi starte en ny tråd for at skrive næste tegn i det næste ord
       * derfor kalder vi setTimeout på vores startTyping metode igen før vi kalder nextWord metoden som defineres nedenfor
       */
      setTimeout(startTyping, wordStayDelay);
      setTimeout(nextWord);
    }

    if (letterIndex == 0) {
      nextWord();
    }

    /*
     * substring metoden bruges til at finde den bid af ordet, som er udgjort af tegnene mellem starten af ordet og det nuværende
     * tegnindeks.
     *
     * elementet (i vores tilfælde vores h1'er fra indekset) bliver derefter sat og opdateret med innerText metoden
     */

    const TEXT_TO_TYPE = WORD.substring(0, letterIndex);
    element.innerText = TEXT_TO_TYPE;
  }

  /*
   * metoden sørger for:
   * 1) at resette tegnindekset
   * 2) at resette ordindekset, hvis det nuværende ordindeks er ved sidste element i vores ord-array
   * 3) at inkrementerer ordindekset.
   */

  function nextWord() {
    letterIndex = 0;
    wordIndex++;
    if (wordIndex == WORDS.length) {
      wordIndex = 0;
    }
  }
}

/*
 * OUT OF SCOPE LINKS
 *
 * Funktionalitet som laver en lille alert, og informerer om at linket er uden for projektets scope, når man klikker på døde links.
 * Alle links med out-of-scope klassen gemmes i et array (konstant) gennem querySelectorAll-metoden, og traverseres gennem et forEach-loop.
 * Hvert element får knyttet en onclick-event listener til sig, som udløser en bekræftelsesdialog, som informerer om døde links/årsag.
 * Beskeden er gemt i en template literal (muliggør multiline og interpolation (sidstnævnte ikke brugt her)).
 */

const OUT_OF_SCOPE_MESSAGE = `Beklager 😢

Linket peger på tomt indhold, som vi har fravalgt i vores scope 🎯`;
const OUT_OF_TIME_MESSAGE = `Beklager 😢

Linket peger på tomt indhold, som vi havde håbet at kunne få med i vores endelige løsning, men som vi desværre måtte udelade pga. tidsmæssige udfordringer 🕒.

Indholdet vil i stedet blive produceret i en iteration efter afleveringsfristen for projektet, og således være klar til fremvisning til eksamineringen ✔️`;

addConfirmationDialogs('out-of-scope', OUT_OF_SCOPE_MESSAGE);
addConfirmationDialogs('out-of-time', OUT_OF_TIME_MESSAGE);

function addConfirmationDialogs(className, message) {
  document.querySelectorAll(`.${className}`).forEach((element) => {
    element.addEventListener('click', (event) => {
      confirm(message);
    });
  });
}
