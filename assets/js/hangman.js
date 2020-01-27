class Game {
    constructor() {
        this._wordBank = new WordBank();
        this.word = this._wordBank.getWord();
        this._scoreBox = new ScoreBox(this._word);
        this._letterBox = new LetterBox();
        this._animations = new Animations();
        this.isOnTimeout = false;
    }
    get score() {
        return this._scoreBox.score;
    }
    get chancesLeft() {
        return this._scoreBox.chancesLeft;
    }
    get isGameLost() {
        return this.chancesLeft <= 0;
    }
    set word(word) {
        this._word = new Word(word);
    }
    get isGameComplete() {
        return this._word.isComplete || this.isGameLost;
    }
    get isAllComplete() {
        return this.isGameComplete && this._wordBank.isFinished;
    }
    hit(key) {
        this._scoreBox.hit();
        this._letterBox.addLetter(key);
        if (this._word.isComplete) {
            this._scoreBox.win();
        }
    }
    miss(key) {
        this._animations.next();
        this._scoreBox.miss();
        this._letterBox.addLetter(key, "incorrect");
        this.isOnTimeout = true;
        setTimeout(() => {
            this.isOnTimeout = false;
            this.action(this.queuedLetter);
        }, 2000);
    }
    reset(hardReset) {
        if (hardReset) {
            this._wordBank.initialize();
        }
        this.word = this._wordBank.getWord();
        this._scoreBox.reset(this._word, hardReset);
        this._letterBox.reset();
        this._animations.reset();
    }
    action(key) {
        if (!key || !isLetter(key)) {
            return;
        }
		if (this.isAllComplete){
            if(key === "r") {
                this.reset(true);
            }
            return;
        }
        if (this.isGameComplete){
            if (key === "p") {
				this.reset();
			} 
            return;
		}
        if (this.isOnTimeout) {
            this.queuedLetter = key;
            return;
        } 
        delete this.queuedLetter;
        const result = this._word.guess(key);
        switch(result) {
            case IS_INCORRECT:
                this.miss(key);
                break;
            case IS_CORRECT:
                this.hit(key);
                break;
            default:
                return;
        }
    }
}
const game = new Game();
document.onkeyup = function onKeyUp(event) {
	const key = String.fromCharCode(event.keyCode).toLowerCase();
	game.action(key);
};
