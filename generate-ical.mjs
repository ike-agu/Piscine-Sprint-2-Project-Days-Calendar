import {
  months,
  weekdays,
  weeks,
  getNthWeekdayOfMonth,
  pad,
} from "./common.mjs";
import fs from "fs";

// ==== CONFIG ====
const INPUT_FILE = "./days.json";
const OUTPUT_FILE = "./days.ics";
const START_YEAR = 2020;
const END_YEAR = 2030;

const formatDate = (date) =>
  `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;

// ==== MAIN LOGIC ====
function generateICS(days) {
  const events = [];

  for (let year = START_YEAR; year <= END_YEAR; year++) {
    for (const item of days) {
      const { name, monthName, dayName, occurence, descriptionURL } = item;
      const monthIndex = months[monthName];
      const weekdayIndex = weekdays[dayName];
      const occurrence = weeks[occurence];

      if (
        monthIndex === undefined ||
        weekdayIndex === undefined ||
        occurrence === undefined
      ) {
        console.warn(`⚠️ Skipping invalid entry: ${JSON.stringify(item)}`);
        continue;
      }

      const date = getNthWeekdayOfMonth(
        year,
        monthIndex,
        weekdayIndex,
        occurrence
      );
      const fullDay = formatDate(date);
      const uid = `${fullDay}-${Math.random()
        .toString(36)
        .slice(2)}@commemorative`;

      events.push(
        [
          "BEGIN:VEVENT",
          `UID:${uid}`,
          `DTSTART;VALUE=DATE:${fullDay}`,
          `DTEND;VALUE=DATE:${fullDay}`,
          `SUMMARY:${name}`,
          `DESCRIPTION:${descriptionURL}`,
          "TRANSP:TRANSPARENT",
          "END:VEVENT",
          "",
        ].join("\r\n")
      );
    }
  }

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Commemorative Days Generator//EN",
    "CALSCALE:GREGORIAN",
    events.join("\r\n"),
    "END:VCALENDAR",
  ].join("\r\n");
}

// ===== EXECUTION =====
try {
  const days = JSON.parse(fs.readFileSync(INPUT_FILE, "utf8"));
  const ics = generateICS(days);
  fs.writeFileSync(OUTPUT_FILE, ics, "utf8");
  console.log(`✅ Successfully created ${OUTPUT_FILE}`);
} catch (err) {
  console.error("❌ Error generating iCal file:", err.message);
}
