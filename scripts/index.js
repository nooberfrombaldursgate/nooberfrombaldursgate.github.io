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

const WORDS = ['Find spor', 'Løs gåder', 'Knæk koder', 'Opklar mysterier', 'CITY ESCAPE'];
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
      TEXT.style.textTransform = 'uppercase';
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
 * REVIEW SLIDER
 *
 * review slider som bladrer gennem anmeldelser ved klik på left/right controls.
 */

/* index til at holde styr på hvilken anmeldelse man er ved*/
let reviewIndex = 0;
const NAME_ELEMENT = document.querySelector('#review-name');
const PROFILE_PICTURE_ELEMENT = document.querySelector('#review-profile-picture');
const REVIEW_TEXT_ELEMENT = document.querySelector('#review-text');

/*
 * tilføjer clik eventlisters til review sliders, kunne også være gjort direkte i html'en men er good practise at holde vandtætte
 * skotter mellem html/css/js. vi rammer også hele div'en så vi har større klikflade (ikonerne er ret små på iphone 8/375px vw);
 *
 * klik på venstre div kalder goPrevReview() funktionen, som går et review tilbage i stakken klik på højre div kalder goNextReview()
 * funktionen som går et review frem i stakken
 */

const REVIEW_SLIDER_LEFT = document.querySelector('.review-slider-left');
const REVIEW_SLIDER_ICON_LEFT = document.querySelector('.review-slider-icon-left');
const REVIEW_SLIDER_RIGHT = document.querySelector('.review-slider-right');
const REVIEW_SLIDER_ICON_RIGHT = document.querySelector('.review-slider-icon-right');

REVIEW_SLIDER_LEFT.addEventListener('click', (event) => {
  goPrevReview();
});

// REVIEW_SLIDER_ICON_LEFT.addEventListener('click', (event) => {
//   goPrevReview();
// });

REVIEW_SLIDER_RIGHT.addEventListener('click', (event) => {
  goNextReview();
});

// REVIEW_SLIDER_ICON_RIGHT.addEventListener('click', (event) => {
//   goNextReview();
// });

/*
 * ternary operators anvendes til at inkrementere og dekrementere reviewIndex'et, så vi ikke kommer 'out of bounds'.
 * goNextReview(): hvis reviewIndex er mindre end 4 inkrementerer vi, hvis ikke resetter vi index til 0.
 * goPrevReview(): hvis reviewIndex er større end 0 dekrementerer vi, hvis ikke resetter vi index til 4.
 * afsluttes med switch statement.
 */
function goNextReview() {
  reviewIndex < 4 ? reviewIndex++ : (reviewIndex = 0);
  switchReview();
}

function goPrevReview() {
  reviewIndex > 0 ? reviewIndex-- : (reviewIndex = 4);
  switchReview();
}

/* switch statement anvendes til at håndtere logikken (case klausul-baseret alternativ til if-else sætninger som kontrolstruktur)*/
function switchReview() {
  switch (reviewIndex) {
    case 0:
      NAME_ELEMENT.innerText = 'Esben H.';
      PROFILE_PICTURE_ELEMENT.src = '/images/index/reviews/profile-pictures/esben@2x.png';
      PROFILE_PICTURE_ELEMENT.alt = 'Esben';
      REVIEW_TEXT_ELEMENT.innerText = 'Det var virkelig sjovt! Det er en fed måde at se sin by på';
      break;
    case 1:
      NAME_ELEMENT.innerText = 'Amaile H.';
      PROFILE_PICTURE_ELEMENT.src = '/images/index/reviews/profile-pictures/amalie@2x.png';
      PROFILE_PICTURE_ELEMENT.alt = 'Amalie';
      REVIEW_TEXT_ELEMENT.innerText = 'Det var mega godt! Var seriøst stor fan, og er super godt til at ryste sammen!';
      break;
    case 2:
      NAME_ELEMENT.innerText = 'Pernille R.';
      PROFILE_PICTURE_ELEMENT.src = '/images/index/reviews/profile-pictures/pernille@2x.png';
      PROFILE_PICTURE_ELEMENT.alt = 'Pernille';
      REVIEW_TEXT_ELEMENT.innerText = 'Fantastisk måde at bruge en december formiddag i Corona-tiden';
      break;
    case 3:
      NAME_ELEMENT.innerText = 'Kim M.';
      PROFILE_PICTURE_ELEMENT.src = '/images/index/reviews/profile-pictures/kim@2x.png';
      PROFILE_PICTURE_ELEMENT.alt = 'Kim';
      REVIEW_TEXT_ELEMENT.innerText = 'Hold kæft hvor var det bare fedt! Vi glemte alt om tid og sted';
      break;
    case 4:
      NAME_ELEMENT.innerText = 'Charlotte K.';
      PROFILE_PICTURE_ELEMENT.src = '/images/index/reviews/profile-pictures/charlotte@2x.png';
      PROFILE_PICTURE_ELEMENT.alt = 'Charlotte';
      REVIEW_TEXT_ELEMENT.innerText = 'Vi havde et par super hyggelige timer med super gode udfordringer';
      break;
    default:
      NAME_ELEMENT.innerText = 'Esben H.';
      PROFILE_PICTURE_ELEMENT.src = '/images/index/reviews/profile-pictures/esben@2x.png';
      PROFILE_PICTURE_ELEMENT.alt = 'Esben';
      REVIEW_TEXT_ELEMENT.innerText = 'Det var virkelig sjovt! Det er en fed måde at se sin by på';
      break;
  }
}

/*
 * MODAL FUNKTIONALITET
 *
 * vi starter med at sætte nogle globale variabler
 */

const MODAL = document.querySelector('.modal-wrapper');
const MODAL_HEADING = document.querySelector('.modal-heading');
const MODAL_SUBHEADING = document.querySelector('.modal-subheading');
const MODAL_SUBSUBHEADING = document.querySelector('.modal-subsubheading');
const MODAL_PARAGRAPH = document.querySelector('.modal-paragraph');

// tilføjer en eventlistener til hele dokumentet, som kører ved hvert klik
document.addEventListener('click', function (event) {
  // event.target' refererer til det objekt, som eventet er sendt fra
  const TARGET = event.target;

  // vi laver en tom variabel, targetClass, og sætter den til targets klasse, hvis den ikke er null
  let targetClass = '';
  if (TARGET.className !== null) {
    targetClass = TARGET.className;
  }

  /*
   * '.closest' kigger på inputsparameteren, som er en css selector og forsøger at matche den med elementer hele vejen op
   * til dokumentets rod. det er smart fordi, så skal vi ikke til at lave tjek på alle elementer i modal-wrapperen.
   * hvis closest match'er selectoren returnerer den objektet ellers null
   * vi laver en tom variabel, closestClassName, og sætter den til targets closest klasse, hvis den ikke er null
   */
  const CLOSEST = TARGET.closest('.modal');
  let closestClassName = '';
  if (CLOSEST !== null) {
    if (CLOSEST.className !== null) {
      closestClassName = CLOSEST.className;
    }
  }

  // hvis target klassen er escape-games-definition kalder vi render modal med elementet
  if (targetClass === 'escape-games-definition') {
    renderModal(targetClass);
    return;
  }

  // hvis target klassen er city-container kalder vi render modal med targets id for at ramme den enkelte by
  if (targetClass === 'city-container') {
    renderModal(TARGET.id);
    return;
  }

  // hvis target klassen er city, laver vi null check, og kalder renderMordal på targets innerText for at ramme
  // den enkelte by
  if (targetClass === 'city') {
    let targetInnerText = TARGET.innerText;
    if (targetInnerText !== null) {
      renderModal(targetInnerText.toLowerCase());
      return;
    }
  }

  // hvis closest class name = modal, så ved vi vi klikker inden for boksen. hvis ikke brugeren klikker på luk-vinduet ikonet,
  // så kan vi returne, så vi laver et check for det, og ellers kalder vi derenderModal (fjerner boksen og overlayet)
  if (closestClassName === 'modal' && targetClass !== 'modal-close') {
    return;
  }
  derenderModal();
});

// render funktion hvor vi bruger et switch statement til at sætte innerText på de forskellige komponenter i modalen
function renderModal(element) {
  switch (element) {
    case 'escape-games-definition':
    MODAL_HEADING.innerText = 'DEFINITION';
    MODAL_SUBHEADING.innerText = 'es•cape game';
    MODAL_SUBHEADING.style.textTransform = 'lowercase';
    MODAL_SUBSUBHEADING.innerText = '\\i-ˈskāp ˈgām\\';
    MODAL_SUBSUBHEADING.style.textTransform = 'lowercase';
    MODAL_PARAGRAPH.innerText = 'et spil hvor en gruppe deltagere i fællesskab opdager og løser gåder, opgaver og udfordringer, der ikke kræver udefrakommende viden på et fysisk sted for at nå et mål inden for en fast tidsramme';
    break;
    case 'copenhagen':
    MODAL_HEADING.innerText = 'MØDESTED';
    MODAL_SUBHEADING.innerText = 'FLÆSKETORVET 68';
    MODAL_SUBHEADING.style.textTransform = 'uppercase';
    MODAL_SUBSUBHEADING.innerText = 'KØBENHAVN';
    MODAL_SUBSUBHEADING.style.textTransform = 'uppercase';
    MODAL_PARAGRAPH.innerText = 'Når I booker vores City Escape Games, mødes I med jeres instruktør i Kødbyen, lige ved indgangen til SOHO som ligger på Flæsketorvet 68 – en spytklat fra Københavns Hovedbanegård eller Fisketorvet station. Her får I en grundig introduktion, samt udleveret jeres udstyr, inden I bliver sluppet løs i byen.';
    break;
    case 'aarhus':
    MODAL_HEADING.innerText = 'MØDESTED';
    MODAL_SUBHEADING.innerText = 'MATHILDE FIBIGERS HAVE';
    MODAL_SUBHEADING.style.textTransform = 'uppercase';
    MODAL_SUBSUBHEADING.innerText = 'AARHUS';
    MODAL_SUBSUBHEADING.style.textTransform = 'uppercase';
    MODAL_PARAGRAPH.innerText = 'Når I booker vores City Escape Games, mødes I med jeres instruktør på Mathilde Fibigers Have, lige ved indgangen til Besættelsesmuseum Aarhus, en spytklat fra Aarhus domkirke. Her får I en grundig introduktion, samt udleveret jeres udstyr, inden I bliver sluppet løs i byen.';
    break;
    case 'odense':
    MODAL_HEADING.innerText = 'MØDESTED';
    MODAL_SUBHEADING.innerText = 'FLAKHAVEN – TORVET';
    MODAL_SUBHEADING.style.textTransform = 'uppercase';
    MODAL_SUBSUBHEADING.innerText = 'ODENSE';
    MODAL_SUBSUBHEADING.style.textTransform = 'uppercase';
    MODAL_PARAGRAPH.innerText = 'Når I har booket vores City Escape Games, mødes I med jeres instruktør på Flakhaven, torvet lige udenfor Odense Rådhus. Her får I en grundig introduktion, samt udleveret jeres udstyr, inden I bliver sluppet løs i byen.';
    break;
    case 'esbjerg':
    MODAL_HEADING.innerText = 'MØDESTED';
    MODAL_SUBHEADING.innerText = 'STREET FOOD ESBJERG';
    MODAL_SUBHEADING.style.textTransform = 'uppercase';
    MODAL_SUBSUBHEADING.innerText = 'ESBJERG';
    MODAL_SUBSUBHEADING.style.textTransform = 'uppercase';
    MODAL_PARAGRAPH.innerText = 'Når I har booket vores City Escape Games, mødes vi på vores stand indendørs i Esbjerg StreetFood. Her får I en grundig introduktion, samt udleveret jeres udstyr, inden I bliver sluppet løs i byen.';
    break;
    case 'kolding':
    MODAL_HEADING.innerText = 'MØDESTED';
    MODAL_SUBHEADING.innerText = 'LÅSBYBANKE PLADS';
    MODAL_SUBHEADING.style.textTransform = 'uppercase';
    MODAL_SUBSUBHEADING.innerText = 'KOLDING';
    MODAL_SUBSUBHEADING.style.textTransform = 'uppercase';
    MODAL_PARAGRAPH.innerText = 'Når I booker vores City Escape Games, mødes I med jeres instruktør på LÅSBYBANKE PLADS, tæt på Koldinghus. Her får I en grundig introduktion, samt udleveret jeres udstyr, inden I bliver sluppet løs i byen.';
    break;
    case 'randers':
    MODAL_HEADING.innerText = 'MØDESTED';
    MODAL_SUBHEADING.innerText = 'RÅDHUSTORVET';
    MODAL_SUBHEADING.style.textTransform = 'uppercase';
    MODAL_SUBSUBHEADING.innerText = 'RANDERS';
    MODAL_SUBSUBHEADING.style.textTransform = 'uppercase';
    MODAL_PARAGRAPH.innerText = 'Når I booker vores City Escape Games, mødes I med jeres instruktør på RÅDHUSTORVET, på pladsen til det gamle rådhus. Her får I en grundig introduktion, samt udleveret jeres udstyr, inden I bliver sluppet løs i byen.';
    break;
    case 'herning':
    MODAL_HEADING.innerText = 'MØDESTED';
    MODAL_SUBHEADING.innerText = 'TORVET I HERNING';
    MODAL_SUBHEADING.style.textTransform = 'uppercase';
    MODAL_SUBSUBHEADING.innerText = 'HERNING';
    MODAL_SUBSUBHEADING.style.textTransform = 'uppercase';
    MODAL_PARAGRAPH.innerText = 'Når I booker vores City Escape Games, mødes I med jeres instruktør på Torvet i herning, lige ved siden af B&O bygningen. Her får I en grundig introduktion, samt udleveret jeres udstyr, inden I bliver sluppet løs i byen.';
    break;
    case 'roskilde':
    MODAL_HEADING.innerText = 'MØDESTED';
    MODAL_SUBHEADING.innerText = 'STÆNDERTORVET';
    MODAL_SUBHEADING.style.textTransform = 'uppercase';
    MODAL_SUBSUBHEADING.innerText = 'ROSKILDE';
    MODAL_SUBSUBHEADING.style.textTransform = 'uppercase';
    MODAL_PARAGRAPH.innerText = 'Når I booker vores City Escape Games, mødes I med jeres instruktør på STÆNDERTORVET, på den store plads centralt i Roskilde. Her får I en grundig introduktion, samt udleveret jeres udstyr, inden I bliver sluppet løs i byen.';
    break;
    case 'horsens':
    MODAL_HEADING.innerText = 'MØDESTED';
    MODAL_SUBHEADING.innerText = 'BRÆTSPILSCAFEEN';
    MODAL_SUBHEADING.style.textTransform = 'uppercase';
    MODAL_SUBSUBHEADING.innerText = 'HORSENS';
    MODAL_SUBSUBHEADING.style.textTransform = 'uppercase';
    MODAL_PARAGRAPH.innerText = 'Når I booker vores City Escape Games, mødes I med jeres instruktør hos BRÆTSPILSCAFEEN, som ligger på Allegade 1 E, st. tv. Her får I en grundig introduktion, samt udleveret jeres udstyr, inden I bliver sluppet løs i byen.';
    break;
  }
  MODAL.style.display = 'block';
}

function derenderModal() {
  MODAL.style.display = 'none';
}

// console.log(CHECK.className);

// const CHECK2 = event.target.closest('.modal-top');

//   if (CHECK1.className === 'modal-bottom') {
//     console.log('return @check1');
//     return;
//   }
//   if (CHECK2.className === 'modal-top') {
//     if
//   }

// if (CHECK1 !== null) {
//   console.log(CHECK1.className);
// }
// if (CHECK2 !== null) {
//   console.log(CHECK2.className);
// }

//   if (CHECK1 && CHECK2 !== null) {
//     console.log('success');
//   }

// if (TARGET.className !== null) {
//   if (TARGET.className !== 'modal-top' || TARGET.class)

//   if (TARGET.className === 'modal-wrapper') {
//     return
//   }
// }
// derenderModal();

// if(TARGET.id !== null) {
//   console.log(TARGET.id);
// }
// if(TARGET.className !== null) {
//   console.log(TARGET.className);
// }
// if (TARGET !== null) {
//   if (TARGET.className !== 'modal-close') {
//     derenderModal();
//   }
//   return;
// }

// hvis vi klikker på alt andet end modalet eller modalets lukke-ikon kalder vi derenderModal

// if (TARGET.closest('modal'))

// if (!TARGET.closest('modal') && !TARGET.matches('#modal-close')) {
//   console.log('TARGET.closest ' + TARGET.closest('.modal-identifier'))
//   console.log('TARGET.matches ' + TARGET.matches('#modal-close-icon'))
//   console.log(TARGET.closest('#modal').id);
//   return;
// }
// else {
//   console.log('TARGET.closest ' + TARGET.closest('.modal-identifier'))
//   console.log('TARGET.matches ' + TARGET.matches('#modal-close-icon'))
// derenderModal();

// if (!event.target.closest('#modal') || event.target.matches('#modal-close')) {
//   derenderModal();
// }

// if(event.target.matches('#escape-games-definition')) {
//   renderModal();
// }
// console.log(event.target.closest('#modal'));
// console.log(event.target.matches('#modal-close'));
// });

// trigger.addEventListener('click', () => {
//   modal.style.display = "block";
// });

// When the user clicks the button, open the modal
// trigger.onclick = function() {
//   modal.style.display = "block";
//   console.log();
// }

// When the user clicks on <span> (x), close the modal
// close.onclick = function() {
//   modal.style.display = "none";
//   console.log('close.onclick');
// }

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//     console.log('modal.style.display = none');
//   }
// }

/*
 * OUT OF SCOPE LINKS
 *
 * Funktionalitet som laver en lille alert, og informerer om at linket er uden for projektets scope, når man klikker på døde links.
 * Alle links med out-of-scope klassen gemmes i et array (konstant) gennem querySelectorAll-metoden, og traverseres gennem et forEach-loop.
 * Hvert element får knyttet en onclick-event listener til sig, som udløser en bekræftelsesdialog, som informerer om døde links/årsag.
 * Beskeden er gemt i en template literal (muliggør multiline og interpolation (sidstnævnte ikke brugt her)).
 */

const OUT_OF_SCOPE_MESSAGE = `Linket peger på tomt indhold, som vi har fravalgt i vores scope 🎯`;
const OUT_OF_TIME_MESSAGE = `Linket peger på tomt indhold, som vi havde håbet at kunne få med i vores endelige løsning, men som vi har nedprioriteret og udeladt pga. tidsmæssige udfordringer 🕒.`;

addConfirmationDialogs('out-of-scope', OUT_OF_SCOPE_MESSAGE);
addConfirmationDialogs('out-of-time', OUT_OF_TIME_MESSAGE);

function addConfirmationDialogs(className, message) {
  document.querySelectorAll(`.${className}`).forEach((element) => {
    element.addEventListener('click', () => {
      confirm(message);
    });
  });
}
