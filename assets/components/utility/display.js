class Display {
    constructor(html) {
        this.html = html;
    }
    get display() {
        throw new Error("This class should not be created, and this function should be overridden.");
    }
    updateDisplay() {
        return this.html.innerHTML = this.display;
    }
}