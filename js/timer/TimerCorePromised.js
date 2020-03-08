import TimerStopError from "./TimerStopError.js";

export default class TimerCore {
    constructor(timeout = 0) {
        this.timeout = timeout;
        this.state = "stopped";
    }

    set timeout(value) {
        this._timeout = value;
        this._delay = this._timeout;
    }

    get timeout() {
        return this._timeout;
    }

    get timeLeft() {
        let timeDiff = 0;

        if (this.state === "launched") {
            timeDiff = Date.now() - this._startTime;
        }

        const timeLeft = this._delay - timeDiff;
        return (timeLeft > 0) ? timeLeft : 0;
    }

    start() {
        if (this.state === "launched") return;
        if (this.state === "paused") {
            this._resume();
            return;
        };

        let promise = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });

        this._resume();

        return promise;
    }

    _resume() {
        if (this.state === "launched") return;
        this._startTime = Date.now();

        this._timerId = setTimeout(() => {
            this._reset();
            this._resolve();
        }, this._delay);

        this.state = "launched";
    }

    pause() {
        clearTimeout(this._timerId);
        this._delay = this.timeLeft;
        this.state = "paused";
    }

    stop() {
        this._reject(new TimerStopError());
        this._reset();
    }

    _reset() {
        clearTimeout(this._timerId);
        this._delay = this.timeout;
        this.state = "stopped";
    }
}
