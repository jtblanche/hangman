// ==============================================
// =              constiables                     =
// ==============================================
const WORD_ARRAY = [
	"holy water",
	"priest",
	"blessing",
	"exorcism",
	"incantation",
	"prayer",
	"incense",
	"sage",
	"investigators",
	"psychic",
	"purification",
	"ritual",
	"ceremony",
	"appease",
	"voodoo"
];
let words = [];
// ==============================================
// =              game object                   =
// ==============================================
const game = {
	//init later - don't worry about default values
	score: 0,
	word: null,
	failureCount: 0,
	guessedLetters: [],
	gameFinished: false,
	gamesFinished: false,
	queuedLetter: null,
	// ==============================================
	// =              game start                    =
	// ==============================================
	startWords: function() {
		words = shuffle([...WORD_ARRAY]);
	},
	start: function() {
		this.gameFinished = false;
		this.gamesFinished = false;
		this.word = Word(words.pop());
		this.failureCount = 0;
		this.guessedLetters = [];
        board.reset(this.word);
		animations.reset();
	},
	// ==============================================
	// =             game action                    =
	// ==============================================
	takeKeyInput: function(key) {
		if (this.word.guess(key)) {
            board.setPlaceholder(this.word.getDisplay());
            if (this.word.isComplete()) {
                this.end(true);
            }
            board.correctGuess(key);
		} else {
            // no match
			this.failureCount++;
            animations.next();
			board.setChances(this.failureCount);
			if (MAX_FAILURES === this.failureCount) {
				this.end(false);
			}
            board.incorrectGuess(key);
			this.isOnTimeout = true;
			setTimeout(() => {
				this.isOnTimeout = false;
				if (this.queuedLetter) {
					const queuedLetter = this.queuedLetter;
					this.queuedLetter = null;
					this.takeKeyInput(queuedLetter);
				}
			}, 2000);
        }
	},
	action: function(key) {
		if (this.gameFinished) {
			if (!this.gamesFinished && key === "p") {
				this.start();
			} else if (this.gamesFinished && key === "r") {
				this.startWords();
				this.start();
			}
			return;
		}
		if (!this.word.canGuess(key)) {
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
		if (words.length) {
			board.setInstructions('Hit "p" to play again.');
		} else {
			this.gamesFinished = true;
			board.setInstructions(
				'You\'ve guessed all our words! hit "r" to restart.'
			);
		}
		let placeholder;
		if (winner) {
			this.score++;
			board.setScore(this.score);
			placeholder = 'You guessed "' + this.word.text + '" correctly!';
		} else {
			placeholder = 'You failed to guess "' + this.word.text + '"...';
		}
		board.setPlaceholder(placeholder);
	}
};
game.startWords();
game.start();

document.onkeyup = function onKeyUp(event) {
	const key = String.fromCharCode(event.keyCode).toLowerCase();
	game.action(key);
};
