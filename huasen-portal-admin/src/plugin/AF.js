export class AF {
  constructor(scope, delay = 10) {
    this.delay = delay
    this.timer = null
    this.previous = 0
    this.now = 0
    this.scope = scope
  }
  run(func, param) {
    const me = this.scope
    this.now = new Date().getTime()
    if (this.now - this.previous < this.delay) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(function () {
      func.call(me, param)
      this.timer = null
    }.bind(this), this.delay)
    this.previous = this.now
  }
}