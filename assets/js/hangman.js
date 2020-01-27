class Game {
    constructor() {
        this._scoreBox = new ScoreBox();
        this._letterBox = new LetterBox();
        this._animations = new Animations();
        this.isOnTimeout = false;
    }
    get isGameComplete() {
        return this._scoreBox.isGameComplete;
    }
    get isAllComplete() {
        return this._scoreBox.isAllComplete;
    }
    reset(hardReset) {
        this._scoreBox.reset(hardReset);
        this._letterBox.reset();
        this._animations.reset();
    }
    guess(letter) {
        return this._scoreBox.guess(letter);
    }
    action(key) {
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
        const result = this.guess(key);
        switch(result) {
            case IS_INCORRECT:
                this._animations.next();
                this._letterBox.addLetter(key, "incorrect");
                this.isOnTimeout = true;
                setTimeout(() => {
                    this.isOnTimeout = false;
                    this.action(this.queuedLetter);
                }, 2000);
                break;
            case IS_CORRECT:
                this._letterBox.addLetter(key);
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
