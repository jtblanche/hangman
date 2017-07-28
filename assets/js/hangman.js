// ==============================================
// =              variables                     =
// ==============================================
var WORD_ARRAY = ["holy water", "priest", "blessing", "exorcism", "incantation",
  "prayer", "incense", "sage", "investigators", "psychic", "purification",
  "ritual", "ceremony", "appease", "voodoo"];
var words = [];
// ==============================================
// =              game object                   =
// ==============================================
var game = {
  //init later - don't worry about default values
  score: 0,
  word: null,
  failureCount: 0,
  guessedLetters: [],
  gameFinished: false,
  gamesFinished: false,
  queuedLetter: null,
  // ==============================================
  // =           board functions                  =
  // ==============================================
  getPlaceholder: function() {
    var output = [];
    for (var i = 0; i < this.word.length; i++) {
      if (!isLetter(this.word[i]) || (this.guessedLetters.length && this.guessedLetters.indexOf(this.word[i]) !== -1)) {
        output.push(this.word[i]);
      } else {
        output.push('-');
      }
    }
    return output.join('');
  },
  getScore: function() {
    var output = ['You have won '];
    output.push(this.score);
    if (this.score === 1) {
      output.push(' game.');
    } else {
      output.push(' games.');
    }
    return output.join('');
  },
  isDuplicate: function(key) {
    return this.guessedLetters.indexOf(key) !== -1;
  },
  isMatch: function(key) {
    return this.word.indexOf(key) !== -1;
  },
  getChancesLeft: function() {
    var chancesLeft = (MAX_FAILURES - this.failureCount);
    if (chancesLeft === 1) {
      return '1 chance left.';
    }
    return chancesLeft + ' chances left.';
  },
  // ==============================================
  // =              game start                    =
  // ==============================================
  startWords: function() {
    words = shuffle(WORD_ARRAY.slice());
  },
  init: function() {
    this.gameFinished = false;
    this.gamesFinished = false;
    this.word = words.pop();
    this.failureCount = 0;
    this.guessedLetters = [];
  },
  initBoard: function() {
    board.setInstructions('Type any letter to make a guess.');
    board.setPlaceholder(this.getPlaceholder());
    board.setScore(this.getScore());
    board.setChances(this.getChancesLeft());
    board.resetGuessed();
    board.resetAnimation();
  },
  start: function() {
    this.init();
    this.initBoard();
  },
  // ==============================================
  // =             game action                    =
  // ==============================================
  validateInput: function(key) {
    if (!isLetter(key) || this.isDuplicate(key)) {
      return false;
    }
    return true;
  },
  takeKeyInput: function(key) {
    this.guessedLetters.push(key);
    var guessObj = {
      text: key
    }
    if (this.isMatch(key)) {
      var placeholder = this.getPlaceholder();
      if (placeholder === this.word) {
        this.end(true);
      }
      board.setPlaceholder(placeholder);
      guessObj.class = 'correct';
      guessObj.isMistake = false;
    } else {
      this.isOnTimeout = true;
      setTimeout(function waitForAnimations() {
        game.isOnTimeout = false;
        if (game.queuedLetter) {
          var queuedLetter = game.queuedLetter;
          game.queuedLetter = null;
          game.takeKeyInput(queuedLetter);
        }
      }, 2000);
      this.failureCount++;
      board.setChances(this.getChancesLeft());
      if (MAX_FAILURES === this.failureCount) {
        this.end(false);
      }
      guessObj.class = 'incorrect';
      guessObj.isMistake = true;
    }
    board.addToGuessed(guessObj);
  },
  action: function(key) {
    if (this.gameFinished) {
      if (!this.gamesFinished && key === 'p') {
        this.start();
      } else if (this.gamesFinished && key === 'r') {
        this.startWords();
        this.start();
      }
      return;
    }
    if (!this.validateInput(key)) {
      return;
    }
    if (this.isOnTimeout) {
      this.queuedLetter = key;
      return;
    }
    this.takeKeyInput(key);
  },
  // ==============================================
  // =               game end                     =
  // ==============================================
  end: function(winner) {
    this.gameFinished = true;
    if (board.staticSound) {
      board.staticSound.pause();
    }
    if (board.screamAudio) {
      board.screamAudio.pause();
    }
    if(words.length) {
      board.setInstructions('Hit "p" to play again.');
    } else {
      this.gamesFinished = true;
      board.setInstructions('You\'ve guessed all our words! hit "r" to restart.')
    }
    var placeholder;
    if (winner) {
      this.score++;
      board.setScore(this.getScore());
      placeholder = 'You guessed "' + this.word + '" correctly!';
    } else {
      placeholder = 'You failed to guess "' + this.word + '"...';
    }
    board.setPlaceholder(placeholder);
  }
}
game.startWords();
game.start();

document.onkeyup = function onKeyUp(event) {
  var key = String.fromCharCode(event.keyCode).toLowerCase();
  game.action(key);
}
