class Sound {
	constructor(file) {
		this.song = new Audio(file);
		this.song.loop = true;
	}
	play() {
		this.song.currentTime = 0;
		this.song.play();
	}
	stop() {
		this.song.pause();
	}
}

class Animations {
	constructor() {
		this.sounds = {
			static: new Sound("assets/audio/tv-static.wav"),
			scream: new Sound("assets/audio/scream.mp3")
		};
		this.html = {
			baseImage: document.getElementById("board-img"),
			tvOnImage: document.getElementById("board-img2"),
			staticImage: document.getElementById("board-img3"),
			ringGirlComingOutImage: document.getElementById("board-img-front"),
			ringGirlStandingImage: document.getElementById("board-img-front2"),
			divBehindGirl: document.getElementById("div-behind-front"),
			divFront: document.getElementById("div-front"),
			chances: document.getElementById("chances"),
			divFullscreen: document.getElementById("fullscreen-modal"),
			scaryFace: document.getElementById("girl-face")
		};
        this.order = [
            () => this.firstFlicker(),
            () => this.waitForAnimation("static", 1000),
            () => this.waitForAnimation("firstGirl", 1000),
            () => this.waitForAnimation("girlComeOut", 1000),
            () => this.waitForAnimation("girlStand", 1000),
            () => this.blackOut(),
            () => this.loseAndScream()
        ];
        this.reset();
	}
    reset() {
		this.html.baseImage.className = "img-rounded";
		this.html.tvOnImage.className = "img-rounded";
		this.html.staticImage.className = "img-rounded";
		this.html.ringGirlComingOutImage.className = "display-none";
		this.html.ringGirlStandingImage.className = "display-none";
		this.html.divBehindGirl.className = "transparent";
		this.html.divFront.className = "transparent";
		this.html.chances.className = "section";
		this.html.divFullscreen.className = "display-none";
		this.html.scaryFace.className = "display-none";
        this.currentIndex = 0;
        this.sounds.static.stop();
        this.sounds.scream.stop();
    }
    waitForAnimation(animation, time) {
        return setTimeout(() => this[animation](), time);
    }
    next() {
        const animation = this.order[this.currentIndex];
        this.currentIndex++;
        animation();
    }
	firstFlicker() {
		this.html.baseImage.className = "img-rounded flicker-tv";
	}
    static() {
        this.sounds.static.play();
        this.html.tvOnImage.className = "display-none";
    }
    firstGirl() {
        this.sounds.static.stop();
        this.html.staticImage.className = "display-none";
    }
	girlComeOut() {
        this.sounds.static.play();
        this.html.staticImage.className = "img-rounded";
        this.html.ringGirlComingOutImage.className = "img-rounded";
	}
	girlStand() {
        this.html.ringGirlComingOutImage.className = "display-none";
        this.html.ringGirlStandingImage.className = "img-rounded";
	}
	blackOut() {
		this.html.baseImage.className = "img-rounded";
		this.sounds.static.stop();
		this.html.divBehindGirl.className = "black fade-black-at-25";
		this.html.divFront.className = "black fade-black-at-75";
		this.html.chances.className = "section big";
	}
    sweetRelease() {
        this.sounds.scream.stop();
        this.html.divFullscreen.className = "display-none";
        this.html.scaryFace.className = "display-none";
    }
    face() {
        this.sounds.scream.play();
        this.html.scaryFace.className = "fullscreen";
        this.waitForAnimation("sweetRelease", 1000)
    }
	loseAndScream() {
		this.html.divFullscreen.className = "";
		this.html.chances.className = "section";
        this.waitForAnimation("face", 2000)
	}
}
