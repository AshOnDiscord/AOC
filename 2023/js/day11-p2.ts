export {};

// const input = (await Bun.file("../day11-mini.txt").text()).trim();
const input = (await Bun.file("../day11.txt").text()).trim();

const lines = input
  .split("\n")
  .filter((e) => e)
  .map((row) => {
    return row.split("");
  });

class Point {
  constructor(public x: number, public y: number, public isStar = false) {}
}

const space: Point[][] = [];

let rowCount = 0;

const emptyColumns: number[] = [];
const emptyRows: number[] = [];

for (let i = 0; i < lines.length; i++) {
  // check for empty rows
  const row = lines[i];
  const isEmpty = row.every((e) => e === ".");
  if (isEmpty) {
    emptyRows.push(i);
  }
}

for (let i = 0; i < lines[0].length; i++) {
  // check for empty columns
  let isEmpty = true;
  for (let j = 0; j < lines.length; j++) {
    if (lines[j][i] !== ".") {
      isEmpty = false;
      break;
    }
  }
  if (isEmpty) {
    emptyColumns.push(i);
  }
}

const stars = lines
  .map((row, y) => {
    return row
      .map((col, x) => {
        return new Point(x, y, col === "#");
      })
      .filter((e) => e.isStar);
  })
  .flat()
  .sort((a, b) => {
    if (a.y === b.y) {
      return a.x - b.x;
    }
    return a.y - b.y;
  });

console.log(emptyColumns);
console.log(emptyRows);

const printSpace = (space: Point[][]) => {
  space.forEach((row) => {
    const rowString = row.map((e) => (e.isStar ? "#" : ".")).join("");
    console.log(rowString);
  });
};

const getDistance = (p1: Point, p2: Point) => {
  // the distance between 0,11 and 5,11 is 5
  // the distance between 9,10 and 4,0 is 15
  // get number of empty rows between p1 and p2
  // get number of empty columns between p1 and p2
  const emptyRowsBetween = emptyRows.filter((e) => e > Math.min(p1.y, p2.y) && e < Math.max(p1.y, p2.y)).length;
  const emptyColumnsBetween = emptyColumns.filter((e) => e > Math.min(p1.x, p2.x) && e < Math.max(p1.x, p2.x)).length;
  const xDiff = Math.abs(p1.x - p2.x) + emptyColumnsBetween * 999_999;
  const yDiff = Math.abs(p1.y - p2.y) + emptyRowsBetween * 999_999;
  return xDiff + yDiff;
};

console.log("stars: ", stars.map((e) => `(${e.x},${e.y})`).join(" "));
printSpace(space);

let sum = 0;
const possiblePairs: [Point, Point][] = [];
// all distinct pairs of 2 stars
for (let i = 0; i < stars.length; i++) {
  for (let j = i + 1; j < stars.length; j++) {
    const p1 = stars[i];
    const p2 = stars[j];
    const distance = getDistance(p1, p2);
    sum += distance;
    possiblePairs.push([p1, p2]);
  }
}
console.log("possible pairs: ", possiblePairs.length);
console.log("sum: ", sum);
