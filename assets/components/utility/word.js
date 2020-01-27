import utility from "../../js/utility.js";
const {
    IS_CORRECT,
    IS_INCORRECT,
    NOT_ACCEPTED,
    isLetter
} = utility;
export default class Word {
    constructor (text) {
        this.text = text;
        this.guessedLetters = [];
    }
    wasGuessed(letter) {
        return this.guessedLetters.length && this.guessedLetters.includes(letter);
    }
    canGuess(letter) {
        return !this.wasGuessed(letter) && isLetter(letter);
    }
    get isComplete() {
        return this.display === this.text;
    }
    isFound(letter) {
        return this.text.includes(letter);
    }
    guess(letter) {
        if (!this.canGuess(letter)) {
            return NOT_ACCEPTED;
        }
        this.guessedLetters.push(letter);
        if (this.isFound(letter)) {
            return IS_CORRECT;
        }
        return IS_INCORRECT;
    }
    get display() {
        const output = [];
        for (let i = 0; i < this.text.length; i++) {
            if (!isLetter(this.text[i]) || this.wasGuessed(this.text[i])) {
                output.push(this.text[i]);
            } else {
                output.push('-');
            }
        }
        return output.join('');
    }
}