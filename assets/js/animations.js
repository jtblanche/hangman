// ===============Required Files To Run:=================== //
// = html-elements.js                                     = //
// ======================================================== //

// This file is specifically written to manage all animations
// using the html elements created from html-elements.js

// ==================================================== //
// =          file specific functions                 = //
// ==================================================== //
// functions only used in this file:
const createStickies = _ => {
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

// ==============================================
// =             board object                   =
// ==============================================
// this object is used to manage all things animation.
const animations = {
    // currentIndex - keep track of what fail animation we are
    // currently on.
	currentIndex: 0,
    // actions - an array of functions, where when the functions
    // are called, a different fail animation will be triggered.
	actions: [
		function firstFlicker() {
			htmlElements.baseImage.className = "img-rounded flicker-tv";
		},
		function static() {
			setTimeout(function waitForStatic() {
                board.sounds.static.play();
				htmlElements.tvOnImage.className = "display-none";
			}, 1000);
		},
		function firstGirl() {
			setTimeout(function waitForGirl() {
                board.sounds.static.stop();
				htmlElements.staticImage.className = "display-none";
			}, 1000);
		},
		function girlComeOut() {
			setTimeout(function waitForComeOut() {
                board.sounds.static.play();
				htmlElements.staticImage.className = "img-rounded";
				htmlElements.ringGirlComingOutImage.className = "img-rounded";
			}, 1000);
		},
		function girlStand() {
			setTimeout(function waitForComeOut() {
				htmlElements.ringGirlComingOutImage.className = "display-none";
				htmlElements.ringGirlStandingImage.className = "img-rounded";
			}, 1000);
		},
		function blackOut() {
			htmlElements.baseImage.className = "img-rounded";
            board.sounds.static.stop();
			htmlElements.divBehindGirl.className = "black fade-black-at-25";
			htmlElements.divFront.className = "black fade-black-at-75";
			htmlElements.chances.className = "section big";
		},
		function loseAndScream() {
			htmlElements.divFullscreen.className = "";
			htmlElements.chances.className = "section";
			setTimeout(function waitForFace() {
                board.sounds.scream.play();
				htmlElements.scaryFace.className = "fullscreen";
				setTimeout(function waitForSweetRelease() {
                    board.sounds.scream.stop();
					htmlElements.divFullscreen.className = "display-none";
					htmlElements.scaryFace.className = "display-none";
				}, 1000);
			}, 2000);
		}
	],
    // next - move from one fail animation to the next
    // and call the animation to make it run.
	next: function() {
		if (this.actions[this.currentIndex]) {
			this.actions[this.currentIndex]();
		}
		this.currentIndex++;
	},
    // reset - reset pages back to normal to stop
    // all animations
	reset: function() {
		htmlElements.baseImage.className = "img-rounded";
		htmlElements.tvOnImage.className = "img-rounded";
		htmlElements.staticImage.className = "img-rounded";
		htmlElements.ringGirlComingOutImage.className = "display-none";
		htmlElements.ringGirlStandingImage.className = "display-none";
		htmlElements.divBehindGirl.className = "transparent";
		htmlElements.divFront.className = "transparent";
		htmlElements.chances.className = "section";
		htmlElements.divFullscreen.className = "display-none";
		htmlElements.scaryFace.className = "display-none";
		animations.currentIndex = 0;
        board.sounds.static.stop();
        board.sounds.scream.stop();
	}
};
