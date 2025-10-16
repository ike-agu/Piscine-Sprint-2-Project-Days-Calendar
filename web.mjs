import { placeOccurrences } from "./common.mjs";
import { getDaysInMonth } from "./common.mjs";

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

const render = function() {
    const today = new Date();
    const currentDay = today.getDate();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;

    renderCalendar(2025, 9); // October 2025 (monthIndex = 9)
    placeOccurrences(currentYear);
};
window.onload = render
 

