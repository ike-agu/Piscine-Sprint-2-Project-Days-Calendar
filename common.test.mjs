import { isLeapYear, firstDayOfMonth, lastDayOfMonth, getNthWeekdayOfMonth } from "./common.mjs";
import assert from "node:assert";
import test from "node:test";

test("Leap year function works", () => {
  assert.equal(isLeapYear(2080), true); // Divisible by 4, not 100
  assert.equal(isLeapYear(1900), false); // Divisible by 100, not 400
  assert.equal(isLeapYear(2000), true); // Divisible by 400
  assert.equal(isLeapYear(2025), false); // Not divisible by 4
});

test("Leap year function handles invalid input", () => {
  assert.throws(() => isLeapYear(-4), RangeError); // Below valid range
  assert.throws(() => isLeapYear(0), RangeError); // Below valid range
  assert.throws(() => isLeapYear(3000), RangeError); // Above valid range
});

test("First day in month function works", () => {
  assert.equal(firstDayOfMonth(2025, 1), 3); // Jan 1, 2025 is a Wednesday
  assert.equal(firstDayOfMonth(2024, 2), 4); // Feb 1, 2024 is a Thursday
});

test("Last day in month function works", () => {
  assert.equal(lastDayOfMonth(2025, 12), 3); // Dec 31, 2025 is a Wednesday
  assert.equal(lastDayOfMonth(2024, 2), 4); // Feb 29, 2024 is a Thursday
  assert.equal(lastDayOfMonth(2023, 2), 2); // Feb 28, 2023 is a Tuesday
})

test("Nth weekday of month function works", () => {
  assert.equal(getNthWeekdayOfMonth(2025, 4, 0, 3).getDate(), 20); // 3rd Sunday in April 2025 is the 20th
  assert.equal(getNthWeekdayOfMonth(2026, 4, 0, 1).getDate(), 5); // 1st Sunday in April 2026 is the 5th
  assert.equal(getNthWeekdayOfMonth(2027, 3, 0, "last").getDate(), 28); // Last Sunday in March 2027 is the 28th
})
