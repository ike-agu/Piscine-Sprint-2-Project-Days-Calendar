import {
  placeOccurrences,
  populateSelectors,
  syncSelectors,
  renderCalendar,
} from "./common.mjs";

// ======= DOM ELEMENTS =======
const title = document.getElementById("curMonthYear");
const monthSelect = document.getElementById("monthSelect");
const yearSelect = document.getElementById("yearSelect");
const prevBtn = document.getElementById("btn-back");
const nextBtn = document.getElementById("btn-forward");
const btnsContainer = document.getElementById("btnsContainer");
const monthTitle = document.getElementById("monthTitle");

// ======= INITIAL DATE =======
let today = new Date();
let currentDay = today.getDate();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth() + 1;

// ======= INLINE STYLES =======
Object.assign(btnsContainer.style, {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "10px",
  maxWidth: "fit-content",
});

btnsContainer.querySelectorAll("button, p").forEach((el) => {
  const base = {
    height: "30px",
    lineHeight: "30px",
    margin: "20px 0",
    fontSize: "20px",
  };
  if (el.tagName === "P") {
    Object.assign(el.style, base, { flexGrow: 1, textAlign: "center" });
  } else {
    Object.assign(el.style, base, {
      width: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    });
  }
});

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

function renderTitle() {
  const monthName = monthSelect.options[monthSelect.selectedIndex].text;
  title.textContent = `${monthName} ${yearSelect.value}`;
  monthTitle.textContent = `${monthName}`;
}

// Update calendar + events together
function updateCalendar(year, month) {
  renderTitle();
  renderCalendar(year, month);
  placeOccurrences(year);
}

// ======= INITIAL SETUP =======
const render = function () {
  populateSelectors(monthSelect, yearSelect);
  syncSelectors(monthSelect, yearSelect, currentYear, currentMonth);
  renderTitle();
  renderCalendar(currentYear, currentMonth);
  placeOccurrences(currentYear);
};

window.onload = render;
