import Display from "../utility/display.js";
import utility from "../../js/utility.js";
const {
    MAX_FAILURES
} = utility;
export default class ChancesDisplay extends Display {
    constructor() {
        super(document.getElementById("chances"));
        this._chancesLeft = MAX_FAILURES;
        this.updateDisplay();
    }
    get chancesLeft() {
        return this._chancesLeft;
    }
    reset() {
        this._chancesLeft = MAX_FAILURES;
        this.updateDisplay();
    }
    miss() {
        this._chancesLeft--;
        this.updateDisplay();
    }
    get display() {
		const textArray = [this.chancesLeft];
		if (this.chancesLeft === 1) {
			textArray.push("chance left.");
		} else {
			textArray.push("chances left.");
		}
        return textArray.join(" ");
    }
}