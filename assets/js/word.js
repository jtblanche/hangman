// this will create and return a new object
// this is close to a constructor without all
// the confusing bits of a constructor...
const Word = function(text) {
    return {
        text,
        guessedLetters: [],
        wasGuessed: function(letter) {
            return this.guessedLetters.length && this.guessedLetters.includes(letter)
        },
        canGuess: function(letter) {
            return !this.wasGuessed(letter) && isLetter(letter);
        },
        guess: function(letter) {
            this.guessedLetters.push(letter);
            return text.includes(letter);
        },
        getDisplay: function() {
            const output = [];
            for (let i = 0; i < text.length; i++) {
                if (!isLetter(text[i]) || this.wasGuessed(text[i])) {
                    output.push(text[i]);
                } else {
                    output.push('-');
                }
            }
            return output.join('');
        },
        isComplete: function() {
            return this.getDisplay() === text;
        }
    }
}