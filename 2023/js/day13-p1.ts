export {};

const input = (await Bun.file("../day13-mini.txt").text()).trim();
// const input = (await Bun.file("../day13.txt").text()).trim();

const patterns = input
  .split("\n\n")
  .filter((e) => e)
  .map((e) => {
    return e.split("\n").map((e) => e.split("").map((e) => {
      if (e === "#") {
        return true;
      } else if (e === ".") {
        return false;
      }
      throw new Error("Invalid input: " + e);
    }));
  });

const pattern = patterns[0];

const hash = (row: boolean[]): string => {
  return row.map((e) => e ? "#" : ".").join("");
}

const rotate = (pattern: boolean[][]): boolean[][] => {
  // swap columns and rows
  const newPattern: boolean[][] = [];
  for (let i = 0; i < pattern[0].length; i++) {
    newPattern.push([]);
    for (let j = 0; j < pattern.length; j++) {
      newPattern[i].push(pattern[j][i]);
    }
  }
  return newPattern;
}

const getSymmetryLine = (pattern: boolean[][]): number => {
  for (let i = 0; i < pattern.length - 1; i++) {
    const row1 = pattern[i];
    const row2 = pattern[i+1];
    if (hash(row1) === hash(row2)) {
      // return i;
      // expand out to the left and right until we find a difference or we hide a edge
      let offset = 1;
      while (true) {
        const left = pattern[i - offset];
        const right = pattern[i + 1 + offset];
        if (!left || !right) {
          return i; // we hit an edge
        }
        if (hash(left) === hash(right)) {
          offset++;
        } else {
          break; // we found a difference, discard result
        }
      }
    }
  }
  // throw new Error("No symmetry line found");
  return NaN;
}
// console.log(pattern.map((e) => hash(e)).join("\n"));
// console.log(getSymmetryLine(pattern));

let sum = 0;

for (let i = 0; i < patterns.length; i++) {
  let pattern = patterns[i];
  // if (i % 2 === 0) {
  //   pattern = rotate(pattern); // even is column symmetry
  // }
  // console.log(patterns[i].map((e) => hash(e)).join("\n"));
  let line = getSymmetryLine(rotate(pattern)) + 1;

  let points = 0;

  if (isNaN(line)) {
    line = getSymmetryLine(pattern) + 1;
    points = line * 100;
  } else {
    points = line;
  }
  // let points = i % 2 === 0 ? line : line * 100;
  console.log(i, "line", line, "points", points);
  sum += points;
}

console.log(sum);