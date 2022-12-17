import { readFileSync } from "fs";

// Load and read input into a string
const input: string = readFileSync("input.txt", "utf8");

// Split input into array of strings of elf -> calories
const food: string[][] = input.split("\n\n").map((e) => e.split("\n"));

// Map each elf to their total calories
const total: number[] = food.map((e) =>
  e.reduce((sum: number, current: string) => {
    // remove extra lines
    if (current === "") return sum;

    return sum + parseInt(current);
  }, 0)
);

// Print the max value of the array
console.log(Math.max.apply(0, total));
