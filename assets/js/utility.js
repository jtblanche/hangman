// ==============================================
// =              variables                     =
// ==============================================
var MAX_FAILURES = 7;
// ==============================================
// =          utility functions                 =
// ==============================================
function createAudio(file, options) {
  var song = new Audio(file);
  song.loop = options && options.isLoop;
  if (options.autoPlay) {
    song.play();
  }
  return song;
}
function createDiv(divClass, html) {
  var newDiv = document.createElement('div');
  if (divClass) {
    newDiv.className = divClass;
  }
  if (html) {
    newDiv.innerHTML = html;
  }
  return newDiv;
}
function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

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
