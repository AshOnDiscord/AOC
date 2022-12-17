import { readFileSync } from "fs";

// Load and read input into a string
const input: string = readFileSync("./input.txt", "utf8");

const bags: string[] = input.split("\n").filter((e) => e);

const sectionedBags: string[][] = bags.map((e) => [
  e.slice(0, e.length / 2),
  e.slice(e.length / 2),
]);

const getItem = (bag: string[]): number => {
  for (let i = 0; i < bag[0].length; i++) {
    for (let j = 0; j < bag[1].length; j++) {
      // detect shared items
      if (bag[0].charAt(i) == bag[1].charAt(j)) {
        const char = bag[0].charAt(i);

        // convert charcode into the priority scale
        if (char == char.toLowerCase()) {
          return char.charCodeAt(0) - 96;
        } else {
          return char.charCodeAt(0) - 38;
        }
      }
    }
  }
  // return 0 if none found
  return 0;
};

let sum = 0;

for (const bag of sectionedBags) {
  sum += getItem(bag);
}

console.log(sum);
