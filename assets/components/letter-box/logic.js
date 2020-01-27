const createStickies = () => {
	// this creates a different combination of
	// animation times so that the button images
	// appear and disappear in different times
	// spooky!
	const stickies = [];
	const animations = shuffle(["animation0", "animation1", "animation2"]);
	const backgrounds = ["background0", "background1", "background2"];
	for (let i = 0; i < 3; i++) {
		const classes = ["sticky", animations[i], backgrounds[i]];
		const sticky = createDiv(classes.join(" "));
		stickies.push(sticky);
	}
	return stickies;
}
class Letter {
    constructor(letter, classes) {
        this.html = createDiv("letter-container");
        this.html.appendChild(createDiv("letter " + classes, letter));
        const stickies = createStickies();
        for(let i = 0; i < stickies.length; i++) {
            this.html.appendChild(stickies[i]);
        }
    }
}
class LetterBox {
    constructor() {
        this.html = document.getElementById("guessed");
    }
    addLetter(_letter, classes = "correct") {
        const letter = new Letter(_letter, classes);
        this.html.appendChild(letter.html);
    }
    reset() {
        this.html.innerHTML = "";
    }
}