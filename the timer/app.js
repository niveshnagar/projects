const inputDuration = document.querySelector("#inputDuration");
const playButton = document.querySelector("#playButton");
const pauseButton = document.querySelector("#pauseButton");
const circle = document.querySelector("circle");

const perimeter = 2 * Math.PI * circle.getAttribute("r");
circle.setAttribute("stroke-dasharray", perimeter);
let totalTime = 0;

const timer = new Timer(inputDuration, playButton, pauseButton, {
  onStart(totalDuration) {
    totalTime = totalDuration;
  },
  onTick(timeLeft) {
    let correctOffset = -1 * perimeter * (1 - timeLeft / totalTime);
    circle.setAttribute("stroke-dashoffset", correctOffset);
  },
  onComplete() {},
});
