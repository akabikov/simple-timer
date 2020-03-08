import TimerCore from "./TimerCore.js";
import TimeFormat from "./TimeFormat.js";


export default class TimerController extends TimerCore {
    constructor(display) {
        super();
        this.display = display;
        this.timerId = this.genId;
        this.intervalId = 0;
    }

    start(callback) {
        try {
            if (this.status === "launched") return;
            if (this.status === "stopped") {
                this.timeout = TimeFormat.toNum(this.display.value);
            }

            super.start(() => {
                clearInterval(this.intervalId);
                callback();
            });

            this.intervalId = setInterval(() => {
                this.display.value = TimeFormat.toStr(this.timeLeft);
            }, 200);

        } catch (error) {
            throw error;
        }
    }

    pause() {
        super.pause();
        clearInterval(this.intervalId);
    }

    stop() {
        super.stop();
        clearInterval(this.intervalId);
        this.display.value = TimeFormat.toStr(this.timeout);
    }

    get genId() {
        return Math.round(Date.now() * Math.random())
    }
}
