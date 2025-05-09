export class Timer {
  constructor() {
    this.startTime = 0;
    this.endTime = 0;
  }

  start() {
    this.startTime = performance.now();
  }

  stop() {
    this.endTime = performance.now();
  }

  getElapsed() {
    return (this.endTime - this.startTime).toFixed(2); // returns milliseconds
  }
}
