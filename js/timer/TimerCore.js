export default class TimerCore {
    constructor(timeout = 0) {
        this.timeout = timeout;
        this.status = "stopped";
    }

    set timeout(value) {
        this._timeout = value;
        this._remainingTime = this._timeout;
    }

    get timeout() {
        return this._timeout;
    }

    get timeLeft() {
        let timeDiff = 0;
        if (this.status === "launched") {
            timeDiff = Date.now() - this._startTime;
        }

        const timeLeft = this._remainingTime - timeDiff;
        return (timeLeft > 0) ? timeLeft : 0;
    }

    start(callback) {
        if (this.status === "launched") return;

        clearTimeout(this._timerId);
        this._startTime = Date.now();

        this._timerId = setTimeout(() => {
            callback();
            this.stop();
        }, this._remainingTime);

        this.status = "launched";
    }

    pause() {
        clearTimeout(this._timerId);
        this._remainingTime = this.timeLeft;
        this.status = "paused";
    }

    stop() {
        clearTimeout(this._timerId);
        this._remainingTime = this.timeout;
        this.status = "stopped";
    }
}
