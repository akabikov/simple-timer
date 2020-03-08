import controls from "./controls.js";
import TimerController from "./timer/TimerController.js";

let timer = new TimerController(controls.time);

controls.start.addEventListener("click", () => {
    try {
        timer.start(() => {
            console.log(`Timer ${timer.timerId} says: Time is up!`);
        });
        controls.time.setAttribute("readonly", "");
    } catch (error) {
        alert(error.message);
    }
});

controls.stop.addEventListener("click", () => {
    timer.stop();
});

controls.pause.addEventListener("click", () => {
    timer.pause();
});
