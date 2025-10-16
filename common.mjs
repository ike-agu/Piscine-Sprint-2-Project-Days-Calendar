// This is a placeholder file which shows how you can define functions which can be used from both a browser script and a node script. You can delete the contents of the file once you have understood how it works.

export function getGreeting() {
  return "Hello";
}

// helper function to return the number of days in a Month
export function getDaysInMonth(year, monthIndex) {
  const numberOfDaysInMonth = new Date(year, monthIndex + 1, 0);
  return numberOfDaysInMonth.getDate();
}

