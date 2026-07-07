import createGrid from "./create_grid.js";

export default class {
  constructor() {
    this.app = document.createElement("div");
    this.app.classList.add("computer");

    const { alphabetDiv, wrapper } = createGrid("bot-grid");
    this.grid = wrapper.childNodes[1];

    this.playDiv = document.createElement("div");
    this.playDiv.classList.add("play-div");

    this.playButton = document.createElement("button");
    this.playButton.classList.add("play-button");
    this.playButton.textContent = "Play";

    this.playDiv.append(this.playButton);

    this.app.append(alphabetDiv, wrapper);
    document.body.append(this.playDiv, this.app);
  }

  render(blockObject, blockDiv) {
    if (blockObject.isEmpty) {
      blockDiv.classList.add("empty-block");
      const dot = document.createElement("div");
      dot.classList.add("dot");
      blockDiv.appendChild(dot);
    } else {
      blockDiv.classList.add("hit-block");

      const svgNS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("viewBox", "0 0 35 35");

      const line1 = document.createElementNS(svgNS, "line");
      const line2 = document.createElementNS(svgNS, "line");

      line1.setAttribute("x1", "0");
      line1.setAttribute("y1", "35");
      line1.setAttribute("x2", "35");
      line1.setAttribute("y2", "0");
      line1.setAttribute("stroke", "red");
      line1.setAttribute("stroke-width", "2");

      line2.setAttribute("x1", "0");
      line2.setAttribute("y1", "0");
      line2.setAttribute("x2", "35");
      line2.setAttribute("y2", "35");
      line2.setAttribute("stroke", "red");
      line2.setAttribute("stroke-width", "2");

      svg.append(line1, line2);
      blockDiv.append(svg);
    }
    blockDiv.style.pointerEvents = "none";
  }

  bindPlayButton(handler) {
    this.playButton.addEventListener("click", () => {
      handler();
      this.app.classList.add("game-started");
      this.playButton.remove();
    });
  }
}
