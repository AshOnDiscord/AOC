import { readFileSync } from "fs";

// Load and read input into a string
const input: string = readFileSync("input.txt", "utf8");

// Split input into array of strings of elf -> calories
const food: string[][] = input.split("\n\n").map((e) => e.split("\n"));

// Map each elf to their total calories
let total: number[] = food.map((e) =>
  e.reduce((sum: number, current: string) => {
    // remove extra lines
    if (current === "") return sum;

    return sum + parseInt(current);
  }, 0)
);

let sum: number = 0;

for (let i = 0; i < 3; i++) {
  // Find top place and add to sum
  const top: number = Math.max.apply(0, total);
  // Remove top place
  total = total.filter((e) => e !== top);

  sum += top;
}

console.log(sum);
