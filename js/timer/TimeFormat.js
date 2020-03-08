export default class TimeFormat {
    static toStr(num) {
        let sec = Math.round(num / 1000);

        const hh = `${Math.floor(sec / 3600)}`.padStart(2, "0");

        sec %= 3600;

        const mm = `${Math.floor(sec / 60)}`.padStart(2, "0");
        const ss = `${Math.floor(sec % 60)}`.padStart(2, "0");

        return `${hh}:${mm}:${ss}`;
    }

    static toNum(str) {

        if (!str) {
            throw new TypeError("Wrong time input!");
        }

        let [hh, mm, ss = 0] = str.split(":");

        return (hh * 60 * 60 + mm * 60 + +ss) * 1000;
    }
}
