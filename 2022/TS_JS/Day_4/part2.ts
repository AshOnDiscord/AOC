import { readFileSync } from "fs";

// Load and read input into a string
const input: string = readFileSync("./input.txt", "utf8");

const pairs: string[] = input.split("\n").filter((e) => e);

const elves: string[][] = pairs.map((e) => e.split(","));

const ranges: number[][][] = elves.map((e) =>
  e.map((k) => k.split("-").map((l) => parseInt(l)))
);

let sum = 0;

for (const pair of ranges) {
  const elf1 = pair[0];
  const elf2 = pair[1];

  if (elf1[0] >= elf2[0] && elf1[0] <= elf2[1]) {
    sum += 1;
    continue;
  }
  if (elf2[0] >= elf1[0] && elf2[0] <= elf1[1]) {
    sum += 1;
    continue;
  }
  if (elf1[1] >= elf2[0] && elf1[1] <= elf2[1]) {
    sum += 1;
    continue;
  }
  if (elf2[1] >= elf1[0] && elf2[1] <= elf1[1]) {
    sum += 1;
    continue;
  }
}

console.log(sum);
