export class EventQueue {
  constructor(maxSize = 100) {
    this.queue = [];
    this.maxSize = maxSize;
  }

  enqueue(event) {
    if (this.queue.length >= this.maxSize) {
      this.queue.shift();
    }
    this.queue.push(event);
  }

  dequeue() {
    return this.queue.shift();
  }

  size() {
    return this.queue.length;
  }
}