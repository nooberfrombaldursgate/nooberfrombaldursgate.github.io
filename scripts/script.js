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