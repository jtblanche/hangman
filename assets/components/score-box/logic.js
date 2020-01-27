class ScoreBox {
    constructor(word) {
        this._placeholder = new PlaceholderDisplay(word);
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
    reset(word) {
        this._instructions.reset();
        this._chances.reset();
        this._placeholder.reset(word);
    }
    miss() {
        this._chances.miss();
        if (this.chancesLeft <= 0) {
            this.loss();
        }
    }
    hit() {
        this._placeholder.updateDisplay();
    }
    get score() {
        return this._score.score;
    }
    get chancesLeft() {
        return this._chances.chancesLeft;
    }
}