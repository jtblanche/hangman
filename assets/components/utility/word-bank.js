import utility from "../../js/utility.js";
const {
    shuffle
} = utility;
const WORD_LIST = [
	"holy water",
	"priest",
	"blessing",
	"exorcism",
	"incantation",
	"prayer",
	"incense",
	"sage",
	"investigators",
	"psychic",
	"purification",
	"ritual",
	"ceremony",
	"appease",
	"voodoo"
];
export default class WordBank {
    constructor() {
        this.initialize();
    }
    initialize() {
        this.wordList = shuffle([...WORD_LIST]);
    }
    getWord() {
        return this.wordList.pop();
    }
    get isFinished() {
        return this.wordList.length === 0;
    }
}