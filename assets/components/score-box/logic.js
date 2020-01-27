import WordBank from "../utility/word-bank.js";
import PlaceholderDisplay from "../placeholder-display/logic.js";
import InstructionsDisplay from "../instructions-display/logic.js";
import ChancesDisplay from "../chances-display/logic.js";
import ScoreDisplay from "../score-display/logic.js";
import utility from "../../js/utility.js";
const {
    IS_INCORRECT,
    IS_CORRECT,
    NOT_ACCEPTED
} = utility;
export default class ScoreBox {
    constructor() {
        this._wordBank = new WordBank();
        this._placeholder = new PlaceholderDisplay(this._wordBank.getWord());
        this._instructions = new InstructionsDisplay();
        this._chances = new ChancesDisplay();
        this._score = new ScoreDisplay();
    }
    end() {
        if(this.isAllComplete) {
            this._instructions.text = 'You\'ve guessed all our words! hit "r" to restart';
        } else {
            this._instructions.text = 'Hit "p" to play again.';
        }
    }
    win() {
        this.end();
        this._score.win();
        this._placeholder.win();
    }
    loss() {
        this.end();
        this._placeholder.loss();
    }
    guess(letter) {
        if (!letter) {
            return NOT_ACCEPTED;
        }
        const result = this._placeholder.guess(letter);
        switch(result) {
            case IS_CORRECT: 
                this.hit();
                break;
            case IS_INCORRECT:
                this.miss();
                break;
            default: 
                // do nothing for now.
                break;
        }
        return result;
    }
    reset(hardReset) {
        if (hardReset) {
            this._wordBank.initialize();
        }
        this._instructions.reset();
        this._chances.reset();
        this._placeholder.reset(this._wordBank.getWord());
    }
    miss() {
        this._chances.miss();
        if (this.chancesLeft <= 0) {
            this.loss();
        }
    }
    hit() {
        this._placeholder.updateDisplay();
        if (this._placeholder.isComplete) {
            this.win();
        }
    }
    get isGameComplete() {
        return this._placeholder.isComplete || this.chancesLeft <= 0;
    }
    get isAllComplete() {
        return this._wordBank.isFinished && this.isGameComplete;
    }
    get score() {
        return this._score.score;
    }
    get chancesLeft() {
        return this._chances.chancesLeft;
    }
}