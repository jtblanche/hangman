// ===============Required Files To Run:=================== //
// = No Files Needed To Run.                              = //
// ======================================================== //

// This file is specifically written to hold a reference to all
// html elements used for display/animations/sound.

// ==================================================== //
// =          file specific functions                 = //
// ==================================================== //
// functions only used in this file:
// createAudio - Makes a new Audio element with certain
// properties set.
const createAudio = (file, options) => {
	const song = new Audio(file);
	song.loop = options && options.isLoop;
	if (options.autoPlay) {
		song.play();
	}
	return song;
};

// ==================================================== //
// =               objects and data                   = //
// ==================================================== //

//this object is used for storing references to
//DOM elements.
const htmlElements = {
	guessed: document.getElementById("guessed"),
	placeholder: document.getElementById("placeholder"),
	score: document.getElementById("score"),
	chances: document.getElementById("chances"),
	instructions: document.getElementById("instructions"),
	imageContainer: document.getElementById("board"),
	baseImage: document.getElementById("board-img"),
	tvOnImage: document.getElementById("board-img2"),
	staticImage: document.getElementById("board-img3"),
	staticSound: createAudio("assets/audio/tv-static-05.wav", {
		isLoop: true,
		autoPlay: false
	}),
	divBehindGirl: document.getElementById("div-behind-front"),
	ringGirlWellImage: document.getElementById("board-img4"),
	ringGirlComingOutImage: document.getElementById("board-img-front"),
	ringGirlStandingImage: document.getElementById("board-img-front2"),
	divFront: document.getElementById("div-front"),
	divFullscreen: document.getElementById("fullscreen-modal"),
	scaryFace: document.getElementById("girl-face"),
	screamAudio: createAudio("assets/audio/scream.mp3", {
		isLoop: true,
		autoPlay: false
	})
};
