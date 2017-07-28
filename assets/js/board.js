// ==============================================
// =              functions                     =
// ==============================================

// ==============================================
// =             board object                   =
// ==============================================
var board = {
  guessed: document.getElementById('guessed'),
  placeholder: document.getElementById('placeholder'),
  score: document.getElementById('score'),
  chances: document.getElementById('chances'),
  instructions: document.getElementById('instructions'),
  imageContainer: document.getElementById('board'),
  baseImage: document.getElementById('board-img'),
  tvOnImage: document.getElementById('board-img2'),
  staticImage: document.getElementById('board-img3'),
  staticSound: createAudio('assets/audio/tv-static-05.wav',{isLoop: true, autoPlay: false}),
  divBehindGirl: document.getElementById('div-behind-front'),
  ringGirlWellImage: document.getElementById('board-img4'),
  ringGirlComingOutImage: document.getElementById('board-img-front'),
  ringGirlStandingImage: document.getElementById('board-img-front2'),
  divFront: document.getElementById('div-front'),
  divFullscreen: document.getElementById('fullscreen-modal'),
  scaryFace: document.getElementById('girl-face'),
  screamAudio: createAudio('assets/audio/scream.mp3',{isLoop: true, autoPlay: false}),
  animationIndex: 0,
  animationActions: [
    function firstFlicker() {
      board.baseImage.className = 'img-rounded flicker-tv';
    },
    function thenStatic() {
      setTimeout(function waitForStatic() {
        board.staticSound.currentTime = 0;
        board.staticSound.play();
        board.tvOnImage.className = 'display-none';
      }, 1000);
    },
    function thenGirl() {
      setTimeout(function waitForGirl() {
        board.staticSound.pause();
        board.staticImage.className = 'display-none';
      }, 1000);
    },
    function thenComeOut() {
      setTimeout(function waitForComeOut() {
        board.staticSound.currentTime = 0;
        board.staticSound.play();
        board.staticImage.className = 'img-rounded';
        board.ringGirlComingOutImage.className = 'img-rounded';
      }, 1000);
    },
    function thenStand() {
      setTimeout(function waitForComeOut() {
        board.ringGirlComingOutImage.className = 'display-none';
        board.ringGirlStandingImage.className = 'img-rounded';
      }, 1000);
    },
    function thenBlackOut() {
      board.baseImage.className = 'img-rounded';
      board.staticSound.pause();
      board.divBehindGirl.className = 'black fade-black-at-25';
      board.divFront.className = 'black fade-black-at-75';
      board.chances.className = 'section big';
    },
    function thenLose() {
      board.divFullscreen.className = '';
      board.chances.className = 'section';
      setTimeout(function waitForFace() {
        board.screamAudio.currentTime = 0;
        board.screamAudio.play();
        board.scaryFace.className = 'fullscreen';
        setTimeout(function waitForSweetRelease() {
          board.screamAudio.pause();
          board.divFullscreen.className = 'display-none';
          board.scaryFace.className = 'display-none';
        }, 1000);
      }, 2000);
    }
  ],
  // ==============================================
  // =           board functions                  =
  // ==============================================
  setPlaceholder: function(ph) {
    this.placeholder.innerHTML = ph;
  },
  setScore: function(s) {
    this.score.innerHTML = s;
  },
  setChances: function(c) {
    this.chances.innerHTML = c;
  },
  setInstructions: function(i) {
    this.instructions.innerHTML = i;
  },
  resetGuessed: function() {
    this.guessed.innerHTML = '';
  },
  addToGuessed: function(guess) {
    function createStickies() {
      var stickies = [];
      var animations = shuffle(['animation0', 'animation1', 'animation2']);
      var backgrounds = ['background0', 'background1', 'background2'];
      for(var i = 0; i < 3; i++) {
        var classes = ['sticky', animations[i], backgrounds[i]];
        var sticky = createDiv(classes.join(' '))
        stickies.push(sticky);
      }
      return stickies;
    }
    var newContainer = createDiv('letter-container');
    var newGuess = createDiv('letter ' + guess.class, guess.text);
    if(guess.isMistake) {
      this.incrementAnimation();
    }
    newContainer.appendChild(newGuess);
    var stickies = createStickies();
    for(var i = 0; i < stickies.length; i++) {
      newContainer.appendChild(stickies[i]);
    }
    this.guessed.appendChild(newContainer);
  },
  incrementAnimation: function() {
    if (this.animationActions[this.animationIndex]) {
      this.animationActions[this.animationIndex]();
    }
    this.animationIndex++;
  },
  resetAnimation: function() {
    this.baseImage.className = 'img-rounded';
    this.tvOnImage.className = 'img-rounded';
    this.staticImage.className = 'img-rounded';
    board.ringGirlComingOutImage.className = 'display-none';
    board.ringGirlStandingImage.className = 'display-none';
    board.divBehindGirl.className = 'transparent';
    board.divFront.className = 'transparent';
    board.chances.className = 'section';
    board.divFullscreen.className = 'display-none';
    board.scaryFace.className = 'display-none';
    this.animationIndex = 0;
  }
}
