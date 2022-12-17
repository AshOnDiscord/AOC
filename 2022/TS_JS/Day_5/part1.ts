import { readFileSync } from "fs";

// Load and read input into a string
const input: string = readFileSync("./input.txt", "utf8").split(`\n\n`);

//#region box stack parsing

const top: string = input[0];
const topLines: string[] = top.split("\n");
const rows: number = topLines.length;

const columns: number = parseInt(top.slice(-2, -1));

const stacks: string[][] = [];

for (let i = 0; i < columns; i++) {
  const column: string[] = [];

  for (let j = rows - 2; j >= 0; j--) {
    const char: string = topLines[j].charAt(1 + i * 4);
    if (char !== " ") column.push(char);
  }

  stacks.push(column);
}

//#endregion

//#region steps parsing

const bottom: string[] = input[1]?.split("\n");

const steps: number[][] = [];

for (const row of bottom) {
  const temp: string[] = row.split(" ");
  const step: string[] = [temp[1], temp[3], temp[5]];
  steps.push(step.map((e) => parseInt(e)));
}

//#endregion

//#region follow steps
for (const step of steps) {
  for (let i = 0; i < step[0]; i++) {
    const temp: string | undefined = stacks[step[1] - 1].pop();

    if (!temp) break;

    stacks[step[2] - 1]?.push(temp);
  }
}

//#endregion

const topBlocks: string[] = stacks.map((e) => e[e.length - 1]);

console.log(topBlocks.join(""));
