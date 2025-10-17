import { placeOccurrences, populateSelectors, syncSelectors, renderCalendar } from "./common.mjs";

// ======= DOM ELEMENTS =======
const monthSelect = document.getElementById("monthSelect");
const yearSelect = document.getElementById("yearSelect");
const prevBtn = document.getElementById("btn-back");
const nextBtn = document.getElementById("btn-forward");

// ======= INITIAL DATE =======
let today = new Date();
let currentDay = today.getDate();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth() + 1;

// ======= EVENT HANDLERS =======
prevBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 1) {
    currentMonth = 12;
    currentYear--;
  }
  syncSelectors(monthSelect, yearSelect, currentYear, currentMonth);
  updateCalendar(currentYear, currentMonth);
});

nextBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 12) {
    currentMonth = 1;
    currentYear++;
  }
  syncSelectors(monthSelect, yearSelect, currentYear, currentMonth);
  updateCalendar(currentYear, currentMonth);
});

monthSelect.addEventListener("change", () => {
  currentMonth = Number(monthSelect.value);
  updateCalendar(currentYear, currentMonth);
});

yearSelect.addEventListener("change", () => {
  currentYear = Number(yearSelect.value);
  updateCalendar(currentYear, currentMonth);
});

// Update calendar + events together
export function updateCalendar(year, month) {
  renderCalendar(year, month);
  placeOccurrences(year);
}

// ======= INITIAL SETUP =======
const render = function () {
  populateSelectors(monthSelect, yearSelect);
  syncSelectors(monthSelect, yearSelect, currentYear, currentMonth);

  renderCalendar(currentYear, currentMonth);
  placeOccurrences(currentYear);
};

window.onload = render;
