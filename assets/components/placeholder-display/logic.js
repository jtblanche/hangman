class PlaceholderDisplay extends Display {
    constructor(word) {
        super(document.getElementById("placeholder"));
        this.word = word;
    }
    set word(word) {
        this._currentWord = new Word(word);
        this.updateDisplay();
    }
    win() {
        this._text = 'You guessed "' + this._currentWord.text + '" correctly!';
        this.updateDisplay();
    }
    loss() {
        this._text = 'You failed to guess "' + this._currentWord.text + '"...';
        this.updateDisplay();
    }
    reset(word) {
        delete this._text;
        this.word = word;
    }
    get display() {
        return this._text ? this._text : this._currentWord.display;
    }
    get isComplete() {
        return this._currentWord.isComplete;
    }
    guess(letter) {
        return this._currentWord.guess(letter);
    }
}