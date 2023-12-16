export {};

// const input = (await Bun.file("../day13-mini.txt").text()).trim();
const input = (await Bun.file("../day13.txt").text()).trim();

const lines = input.trim().split("\n\n").map(grid => {
  return grid.split("\n");
})

const cw = function rotateClockWise(grid: unknown[][]): unknown[][] {
  return grid[0].map((val, index) => grid.map((row) => row[index]).reverse());
};

const ccw = function rotateCounterClockWise(grid: unknown[][]): unknown[][] {
  return grid[0].map((val, index) =>
    grid.map((row) => row[row.length - 1 - index])
  );
};

const fsl = function findSymmetryLine(grid: string[]): number { 
  for (const [index, row] of grid.entries()) {
    if (index === 0) {
      continue;
    }
    const left = grid.slice(0, index)
    const right = grid.slice(index);
    const minLength = Math.min(left.length, right.length);
    const leftTrimmed = left.slice(left.length - minLength).reverse();
    const rightTrimmed = right.slice(0, minLength);
    // const match = leftTrimmed.join("") === rightTrimmed.join("");
    // if (match) return index
    const matches: number = leftTrimmed.map((leftRow, rowIndex) => {
      const rightRow = rightTrimmed[rowIndex].split("");
      const mismatches = leftRow.split("").filter((leftChar, charIndex) => {
        return leftChar !== rightRow[charIndex];
      });
      return mismatches.length;
    }).reduce((acc, cur) => acc + cur, 0);

    if (matches === 1) {
      return index;
    }
  }
  return 0;
}

let points = 0;
lines.forEach(grid => {
  // console.log(grid.join("\n"));
  // console.log(fsl(grid), fsl(cw(grid.map(e => e.split(""))).map(e => e.join(""))))
  const rowIndex = fsl(grid);
  if (rowIndex !== 0) {
    return points += rowIndex * 100;
  }
  const cwGrid = cw(grid.map(e => e.split(""))).map(e => e.join(""));
  const cwIndex = fsl(cwGrid);
  if (cwIndex !== 0) {
    return points += cwIndex;
  }
  throw new Error(`No symmetry line found for grid:\n${grid.join("\n")}`)
})
console.log("points", points);