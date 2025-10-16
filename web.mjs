import { placeOccurrences, populateSelectors, syncSelectors } from "./common.mjs";
import { getDaysInMonth } from "./common.mjs";

// ======= DOM ELEMENTS =======
const monthSelect = document.getElementById("monthSelect");
const yearSelect = document.getElementById("yearSelect");

// ======= INITIAL DATE =======
let today = new Date();
let currentDay = today.getDate();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth() + 1;

// ======= EVENT HANDLERS =======
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

//---render Calendar for a given Year and Month----
function renderCalendar(year, monthIndex) {
  const totalDaysInMonth = getDaysInMonth(year, monthIndex);
  let firstDay = new Date(year, monthIndex, 1).getDay(); //finds on which weekday the month starts

  if (firstDay === 0) {
    firstDay = 6;
  } else {
    firstDay = firstDay - 1;
  }
  //get table body and fill it up with numbers
  const tableBody = document.querySelector("#calendar tbody");
  tableBody.innerHTML = ""; //clear the old rows

  //create empty cells before day 1
  let row = document.createElement("tr");
  for (let i = 0; i < firstDay; i++) {
    const emptyCells = document.createElement("td");
    row.appendChild(emptyCells);
  }

  //loop through each day of the month to fill in the actual day numbers
  for (let day = 1; day <= totalDaysInMonth; day++) {
    const cell = document.createElement("td");
    cell.textContent = day;
    row.appendChild(cell);

    //Formula checks and detect if the row is full i.e 7days which make up 1 week (then Calendar moves to new row)
    if ((firstDay + day) % 7 === 0) {
      tableBody.appendChild(row);
      row = document.createElement("tr");
    }
  }

  //handle left over days cells after the month is over
  if (row.children.length > 0) {
    while (row.children.length < 7) {
      const emptyCell = document.createElement("td");
      row.appendChild(emptyCell);
    }
    tableBody.appendChild(row);
  }
}

// ======= INITIAL SETUP =======
const render = function() {
  populateSelectors(monthSelect, yearSelect);
  syncSelectors(monthSelect, yearSelect, currentYear, currentMonth);

  renderCalendar(currentYear, currentMonth); // October 2025 (monthIndex = 9)
  placeOccurrences(currentYear);
};

window.onload = render
