import Display from "../utility/display.js";
export default class InstructionsDisplay extends Display {
    constructor() {
        super(document.getElementById("instructions"));
        this.text = "Type any letter to make a guess.";
    }
    set text(text) {
        this._text = text;
        this.updateDisplay();
    }
    reset() {
        this.text = "Type any letter to make a guess.";
    }
    get display() {
        return this._text;
    }
}