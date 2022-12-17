import { readFileSync } from "fs";

// Load and read input into a string
const input: string = readFileSync("./input.txt", "utf8");

// Split input into rows and then columns
const plays: string[][] = input.split("\n").map((e) => e.split(" "));

let sum: number = 0;

for (const round of plays) {
  const opponent = round[0];
  const player = round[1];

  if (player == "X") {
    sum += 1;

    if (opponent == "A") sum += 3;
    if (opponent == "C") sum += 6;
  } else if (player == "Y") {
    sum += 2;

    if (opponent == "B") sum += 3;
    if (opponent == "A") sum += 6;
  } else {
    sum += 3;

    if (opponent == "C") sum += 3;
    if (opponent == "B") sum += 6;
  }
}

console.log(sum);
