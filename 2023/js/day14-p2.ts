import { listen } from "bun";

export {};

// const input = (await Bun.file("../day14-mini.txt").text()).trim();
const input = (await Bun.file("../day14.txt").text()).trim();

const lines = input
  .split("\n")
  .filter((e) => e)
  .map((e) => {
    return e.split("");
  });

const cw = function rotateClockWise(grid: unknown[][]): unknown[][] {
  return grid[0].map((val, index) => grid.map((row) => row[index]).reverse());
};

const ccw = function rotateCounterClockWise(grid: unknown[][]): unknown[][] {
  return grid[0].map((val, index) =>
    grid.map((row) => row[row.length - 1 - index])
  );
};

const slide = (grid: string[][]): string[][] => {
  return grid.map((row) => {
    let lastEmpty: number = -1;
    const copy = structuredClone(row);
    for (const [index, val] of copy.entries()) {
      // console.log(index, val);
      if (val === ".") {
        if (copy[index + 1] === "O") {
          const placingIndex = lastEmpty !== -1 ? lastEmpty : index;
          copy[placingIndex] = "O";
          copy[index + 1] = ".";
          lastEmpty = lastEmpty !== -1 ? lastEmpty + 1 : -1;
        } else {
          if (lastEmpty === -1) {
            lastEmpty = index;
          }
        }
      } else if (val === "#") {
        lastEmpty = -1;
      }
    }
    return copy
  });
}

// (lines).forEach((e) => console.log(e.join("")));
// console.log("\n----------\n");

const north = (grid: string[][]): string[][] => {
  return cw(slide(ccw(grid) as string[][])) as string[][];
}

const south = (grid: string[][]): string[][] => {
  return ccw(slide(cw(grid) as string[][])) as string[][];
}

const west = (grid: string[][]): string[][] => {
  return slide(grid);
}

const east = (grid: string[][]): string[][] => {
  return cw(cw(slide(cw(cw(grid)) as string[][]))) as string[][];
}

const getLoad = (grid: string[][]): number => {
  let load = 0;
  let copy = [...grid];
  for (let i = 0; i < copy.length; i++) {
    const row = copy[i];
    for (const c of row) {
      if (c === "O") {
        load += row.length - i;
      }
    }
  }
  return load;
}

const first: Map<string, number> = new Map();
let grid = lines;
for (let i = 0; i < 1000000000; i++) {
// for (let i = 0; i < 1; i++) {
  const key = grid.map((e) => e.join("")).join("\n");
  if (first.has(key)) {
    const startIndex = first.get(key);
    const cycle = i - startIndex!;
    const tempI = i;
    const remaining = 1000000000 - i;
    const remainingCycles = Math.floor(remaining / cycle);
    i += remainingCycles * cycle;
    console.log("CYCLE", cycle, remainingCycles, remaining, tempI,i);
    while (i < 1000000000) {
      grid = north(grid);
      grid = west(grid);
      grid = south(grid);
      grid = east(grid);
      i++;
    }
  } else {
    first.set(key, i);
    grid = north(grid);
    grid = west(grid);
    grid = south(grid);
    grid = east(grid);
  }
}
console.log(getLoad(grid));
// south(west(north(lines))).forEach((e) => console.log(e.join("")));
