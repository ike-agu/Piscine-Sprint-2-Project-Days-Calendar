import daysData from "./days.json" with { type: "json" };

// =========== CONSTANTS ===========
// Weekdays object for date parsing
export const weekdays = Object.fromEntries(
  ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    .map((day, i) => [day, i])
);

// Months object for date parsing
export const months = Object.fromEntries(
  ["January","February","March","April","May","June","July","August","September","October","November","December"]
    .map((m, i) => [m, i + 1])
);

// Weeks object for date parsing
export const weeks = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4,
  last: "last",
};

// ======== HELPERS ========
// Validate year range (1900–2100)
export const validateYear = (year) => {
  errorHandle( !Number.isInteger(year), "Year must be an integer.");
  errorHandle( (year < 1900 || year > 2100), "Year out of range (1900–2100).");
  return true;
};

// Check leap year
export const isLeapYear = (year) => {
  validateYear(year);
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

// First day of month (0=Sun, 6=Sat, returns day-of-week, not date)
export const firstDayOfMonth = (year, month) => new Date(year, month - 1, 1).getDay();

// Last weekday (0=Sun, 6=Sat, returns day-of-week, not date)
export const lastDayOfMonth = (year, month) => new Date(year, month, 0).getDay();

// Days in month (handles leap year)
export const daysInMonth = (year, month) => [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];

// Format date as YYYY-MM-DD
export const formatDate = (year, month, day) => `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

// Must return the string value — your original was missing `return`
export const dateString = (date) => {
  errorHandle(!date, "Date is required.");
  errorHandle(!(date instanceof Date), `Expected a Date object, got: ${date}`);
  return date.toISOString().split("T")[0];
};

// Error handling utility
const errorHandle = (condition, message) => {
  if (condition) throw new RangeError(message);
};

// ======== MAIN FUNCTION ========
// Render calendar for given month and year

// Calculate nth weekday of a month
export function getNthWeekdayOfMonth(year, month, weekday, occurrence) {
  validateYear(year);

  errorHandle(month < 1 || month > 12, "Month out of range (1–12).");
  errorHandle(weekday < 0 || weekday > 6, "Weekday out of range (0=Sun, 6=Sat).");
  errorHandle(!["last"].includes(occurrence) && (typeof occurrence !== "number" || occurrence < 1 || occurrence > 4), "Occurrence must be 1, 2, 3, 4, or 'last'.");

  const firstWeekday = firstDayOfMonth(year, month);
  const offset = (weekday - firstWeekday + 7) % 7;

  if (occurrence === "last") {
    const lastDay = new Date(year, month, 0);
    const diff = (lastDay.getDay() - weekday + 7) % 7;
    return new Date(year, month - 1, lastDay.getDate() - diff);
  }

  const day = 1 + offset + (occurrence - 1) * 7;
  const result = new Date(year, month - 1, day);

  return result.getMonth() === month - 1 ? result : null;
}

// Place occurrences on the calendar
export function placeOccurrences(year) {
  const calendar = document.querySelector("#calendar");
  errorHandle(!calendar, "Calendar element with id 'calendar' not found.");

  if (!validateYear(year)) return;

  errorHandle(!daysData || !Array.isArray(daysData), "Invalid or missing days data.");

  daysData.forEach(({ monthName, dayName, occurence, name }) => {
    const month = months[monthName];
    const weekday = weekdays[dayName];
    const occ = weeks[occurence];

    errorHandle(month === undefined || weekday === undefined || occ === undefined,
    `Invalid data entry: month="${monthName}", day="${dayName}", occurrence="${occurence}"`);

    const date = getNthWeekdayOfMonth(year, month, weekday, occ);
    if (!date) return;

    const cell = calendar.querySelector(`[data-date="${dateString(date)}"]`);
    if (!cell) return;

    const div = Object.assign(document.createElement("div"), {
      textContent: name,
      style: `
        margin-top: 20px;
        padding: 5px 10px;
        border-radius: 10px;
        background-color: #f9f3bdff;
      `,
    });

    cell.appendChild(div);
  });
}

// Populate month and year selectors
export function populateSelectors(monthSelect, yearSelect) {
  // Populate months
  Object.entries(months).forEach(([name, value]) => {
    const opt = document.createElement("option");
    opt.value = value;
    opt.textContent = name;
    monthSelect.appendChild(opt);
  });

  // Populate years (1900–2100)
  for (let y = 1900; y <= 2100; y++) {
    const opt = document.createElement("option");
    opt.value = y;
    opt.textContent = y;
    yearSelect.appendChild(opt);
  }
}

// Sync selectors with given month and year
export function syncSelectors(monthSelect, yearSelect, year, month) {
  monthSelect.value = month;
  yearSelect.value = year;
}

// helper function to return the number of days in a Month
export function getDaysInMonth(year, monthIndex) {
  const numberOfDaysInMonth = new Date(year, monthIndex + 1, 0);
  return numberOfDaysInMonth.getDate();
}
