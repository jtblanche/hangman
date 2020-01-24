// ==============================================
// =              functions                     =
// ==============================================
// ==============================================
// =             board object                   =
// ==============================================
const board = {
	// ==============================================
	// =           board functions                  =
	// ==============================================
	setPlaceholder: function(ph) {
		htmlElements.placeholder.innerHTML = ph;
	},
	setScore: function(score) {
		const textArray = ["You have won "];
		textArray.push(score);
		if (score === 1) {
			textArray.push(" game.");
		} else {
			textArray.push(" games.");
		}
		htmlElements.score.innerHTML = textArray.join("");
	},
	setChances: function(failureCount) {
		const chancesLeft = MAX_FAILURES - failureCount;
        const text = (chancesLeft === 1) ? "1 chance left." : chancesLeft + " chances left.";
		htmlElements.score.innerHTML = text;
	},
	setInstructions: function(i) {
		htmlElements.instructions.innerHTML = i;
	},
    // addToGuessed - animations for each letter that is added
    // to letters already guessed area.
	incorrectGuess: function(letter) {
        let guessDiv = createDiv("letter incorrect", letter);
        this.guess(guessDiv);
	},
    correctGuess: function(letter) {
        let guessDiv = createDiv("letter correct", letter);
        this.guess(guessDiv);
    },
    guess: function(guessDiv) {
        const newContainer = createDiv("letter-container");
        newContainer.appendChild(guessDiv);
        const stickies = createStickies();
        for (let i = 0; i < stickies.length; i++) {
            newContainer.appendChild(stickies[i]);
        }
        htmlElements.guessed.appendChild(newContainer);
    },
	sounds: {
		static: {
			play: function() {
				if (htmlElements.staticSound) {
                    htmlElements.staticSound.currentTime = 0;
                    htmlElements.staticSound.play();
                }
			},
			stop: function() {
				if (htmlElements.staticSound) {
					htmlElements.staticSound.pause();
				}
            }
		},
		scream: {
			play: function() {
				if (htmlElements.screamAudio) {
                    htmlElements.screamAudio.currentTime = 0;
                    htmlElements.screamAudio.play();
                }
            },
			stop: function() {
				if (htmlElements.screamAudio) {
					htmlElements.screamAudio.pause();
				}
			}
		}
	},
	reset: function(word) {
		this.setInstructions("Type any letter to make a guess.");
		this.setPlaceholder(word.getDisplay());
		this.setScore(this.score);
		this.setChances(this.failureCount);
		htmlElements.guessed.innerHTML = "";
	}
};
