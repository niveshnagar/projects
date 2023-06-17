class Timer {
  constructor(inputDuration, playButton, pauseButton, callBacks) {
    this.inputDuration = inputDuration;
    this.playButton = playButton;
    this.pauseButton = pauseButton;

    if (callBacks) {
      this.onStart = callBacks.onStart;
      this.onTick = callBacks.onTick;
      this.onComplete = callBacks.onComplete;
    }

    this.playButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
  }

  start = () => {
    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }
    this.tick();
    this.intervalId = setInterval(this.tick, 10);
  };

  pause = () => {
    clearInterval(this.intervalId);
  };

  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause();
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      this.timeRemaining = this.timeRemaining - 0.01;
      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }
    }
  };

  get timeRemaining() {
    return parseFloat(this.inputDuration.value);
  }
  set timeRemaining(time) {
    this.inputDuration.value = time.toFixed(2);
  }
}
