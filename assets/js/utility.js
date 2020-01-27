// ==============================================
// =              variables                     =
// ==============================================
const IS_CORRECT = true;
const IS_INCORRECT = false;
const NOT_ACCEPTED = null;
const MAX_FAILURES = 7;
// ==============================================
// =              functions                     =
// ==============================================
const createDiv = (divClass, html) => {
  const newDiv = document.createElement('div');
  if (divClass) {
    newDiv.className = divClass;
  }
  if (html) {
    newDiv.innerHTML = html;
  }
  return newDiv;
}
const isLetter = str => str.length === 1 && str.match(/[a-z]/i);

const shuffle = array => {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}