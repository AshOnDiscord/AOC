import { readFileSync } from "fs";

// Load and read input into a string
const input: string = readFileSync("./input.txt", "utf8");

const bags: string[] = input.split("\n").filter((e) => e);

const groups: string[][] = [];

// sort the elves/bags into the groups they are in. [[squad1elf1, squad1elf2, squad1elf3],[squad2elf1, squad2elf2, squad2elf3]...]
for (let i = 0; i < bags.length; i += 3) {
  groups.push([bags[i], bags[i + 1], bags[i + 2]]);
}

// console.log(groups);

const getBadge = (group: string[]): number => {
  for (let i = 0; i < group[0].length; i++) {
    for (let j = 0; j < group[1].length; j++) {
      // check for matches between elf 1 and elf 2
      if (group[0].charAt(i) == group[1].charAt(j)) {
        // if matches check if elf 3 also matches
        for (let k = 0; k < group[2].length; k++) {
          if (group[0].charAt(i) == group[2].charAt(k)) {
            const char = group[0].charAt(i);

            // convert charcode into the priority scale
            if (char == char.toLowerCase()) {
              return char.charCodeAt(0) - 96;
            } else {
              return char.charCodeAt(0) - 38;
            }
          }
        }
      }
    }
  }
  return 0;
};

let sum = 0;

for (const group of groups) {
  sum += getBadge(group);
}

console.log(sum);
