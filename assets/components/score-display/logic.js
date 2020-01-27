class ScoreDisplay extends Display {
    constructor() {
        super(document.getElementById("score"));
        this._score = 0;
        this.updateDisplay();
    }
    win() {
        this._score++;
        this.updateDisplay();
    }
    get display() {
		const textArray = ["You have won"];
		textArray.push(this._score);
		if (this.score === 1) {
			textArray.push("game.");
		} else {
			textArray.push("games.");
		}
        return textArray.join(" ");
    }
    get score() {
        return this._score;
    }
}