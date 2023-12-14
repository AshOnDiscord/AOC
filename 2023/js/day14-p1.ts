export {};

const input = (await Bun.file("../day14-mini.txt").text()).trim();
// const input = (await Bun.file("../day14.txt").text()).trim();

const lines = input
  .split("\n")
  .filter((e) => e)
  .map((e) => {
    return e.split("");
  });

const scr = function swapColumnsAndRows(grid: unknown[][]): unknown[][] {
  return grid[0].map((_, colIndex) => grid.map((row) => row[colIndex]));
}

const columned = scr(lines);
columned.forEach((e) => console.log(e.join("")));
let loadSum = 0;
for (let i = 0; i < columned.length; i++) {
  const column = columned[i];
  let lastEmpty: number = -1;
  let load = 0;
  for (let j = 0; j < column.length; j++) {
    if (column[j] === ".") {
      if (column[j + 1] === "O") {
        // column[j] = "O";
        const placingIndex = lastEmpty !== -1 ? lastEmpty : j;
        // console.log(load, placingIndex, lastEmpty, j)
        column[placingIndex] = "O";
        column[j + 1] = ".";
        // console.log(lastEmpty !== -1 ? lastEmpty : j)
        lastEmpty = lastEmpty !== -1 ? lastEmpty + 1 : -1;
      } else {
        if (lastEmpty === -1) {
          lastEmpty = j;
        }   
      }
    } else if (column[j] === "#") {
      lastEmpty = -1;
    }
  }
  for (let j = 0; j < column.length; j++) {
    if (column[j] === "O") {
      load += column.length - j;
    }
  }
  // console.log(load);
  loadSum += load;
}
// console.log("Sum:",loadSum);
// console.log(scr(columned).map((e) => e.join("")).join("\n"));