export default class TimerStopError extends Error {
    constructor() {
        super("Timer stopped!");
        this.name = "TimerStopError";
    }
}