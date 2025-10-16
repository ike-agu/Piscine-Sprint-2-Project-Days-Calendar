import { placeOccurrences } from "./common.mjs";

const render = function() {
    const today = new Date();
    const currentDay = today.getDate();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;

    placeOccurrences(currentYear);
};

window.onload = render;
