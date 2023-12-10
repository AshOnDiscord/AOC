export {};
const isValid = (screen: number[][], m: number, n: number, x: number, y: number, prevC: number, newC: number) => {
  if (x < 0 || x >= m || y < 0 || y >= n || screen[x]?.[y] != prevC || screen[x]?.[y] == newC) return false;
  return true;
};
// FloodFill function
const floodFill = (screen: number[][], m: number, n: number, x: number, y: number, prevC: number, newC: number) => {
  let queue: [number, number][] = [];

  // Append the position of starting
  // pixel of the component
  queue.push([x, y]);

  // Color the pixel with the new color
  screen[x][y] = newC;

  // While the queue is not empty i.e. the
  // whole component having prevC color
  // is not colored with newC color
  while (queue.length > 0) {
    // Dequeue the front node
    const currPixel = queue[queue.length - 1];
    queue.pop();

    let posX = currPixel[0];
    let posY = currPixel[1];

    // Check if the adjacent
    // pixels are valid
    if (isValid(screen, m, n, posX + 1, posY, prevC, newC)) {
      // Color with newC
      // if valid and enqueue
      screen[posX + 1][posY] = newC;
      queue.push([posX + 1, posY]);
    }

    if (isValid(screen, m, n, posX - 1, posY, prevC, newC)) {
      screen[posX - 1][posY] = newC;
      queue.push([posX - 1, posY]);
    }

    if (isValid(screen, m, n, posX, posY + 1, prevC, newC)) {
      screen[posX][posY + 1] = newC;
      queue.push([posX, posY + 1]);
    }

    if (isValid(screen, m, n, posX, posY - 1, prevC, newC)) {
      screen[posX][posY - 1] = newC;
      queue.push([posX, posY - 1]);
    }
  }
};

// const input = (await Bun.file("../day10-mini.txt").text()).trim();
const input = (await Bun.file("../day10.txt").text()).trim();

const slots = input
  .split("\n")
  .filter((e) => e)
  .map((e) => {
    return e.split("").filter((a) => a);
  });

// console.log(slots);

const getBeast = (map: string[][]): { row: number; column: number; char: string } => {
  // map.forEach((row, rowI) => {
  //   row.forEach((square, column) => {
  //     console.log(rowI, column, square, row);
  for (let rowI = 0; rowI < map.length; rowI++) {
    const row = map[rowI];
    for (let column = 0; column < map[rowI].length; column++) {
      const square = row[column];
      if (square == "S") {
        const left = row[column - 1] ? row[column - 1] : "";
        const right = row[column + 1] ? row[column + 1] : "";
        const top = slots[rowI - 1]?.[column] ?? "";
        const bottom = slots[rowI + 1]?.[column] ?? "";

        if (["F", "-", "L"].includes(left) && ["7", "-", "J"].includes(right)) {
          return { row: rowI, column, char: "-" };
        }

        if (["7", "|", "F"].includes(top) && ["J", "|", "L"].includes(bottom)) {
          return { row: rowI, column, char: "-" };
        }

        if (["F", "-", "L"].includes(left) && ["7", "|", "F"].includes(top)) {
          return { row: rowI, column, char: "J" };
        }

        if (["F", "-", "L"].includes(left) && ["J", "|", "L"].includes(bottom)) {
          return { row: rowI, column, char: "7" };
        }

        if (["7", "-", "J"].includes(right) && ["7", "|", "F"].includes(top)) {
          return { row: rowI, column, char: "L" };
        }

        if (["7", "-", "J"].includes(right) && ["J", "|", "L"].includes(bottom)) {
          return { row: rowI, column, char: "F" };
        }
        console.log(square, left, right, top, bottom);
        throw "beast no neighbor";
      }
    }
  }
  //   });
  // });
  throw "no beast";
};

const beast = getBeast(slots);

const neighbors = [
  ["F", "-", "L"].includes(slots[beast.row][beast.column - 1] || "")
    ? {
        char: slots[beast.row][beast.column - 1],
        row: beast.row,
        column: beast.column - 1,
      }
    : null,
  ["7", "-", "J"].includes(slots[beast.row][beast.column + 1] || "")
    ? {
        char: slots[beast.row][beast.column + 1],
        row: beast.row,
        column: beast.column + 1,
      }
    : null,
  ["7", "|", "F"].includes(slots[beast.row - 1]?.[beast.column] ?? "")
    ? {
        char: slots[beast.row - 1][beast.column],
        row: beast.row - 1,
        column: beast.column,
      }
    : null,
  ["J", "|", "L"].includes(slots[beast.row + 1]?.[beast.column] ?? "")
    ? {
        char: slots[beast.row + 1][beast.column],
        row: beast.row + 1,
        column: beast.column,
      }
    : null,
].filter((e) => e && e.char !== ".");

const isLinked = (p1: { row: number; column: number; char: string }, p2: { row: number; column: number; char: string }): boolean => {
  // if (p2.char == "S") return true;

  if (p1.char == "|") {
    if (p2.column !== p1.column) return false;
    if (p2.row == p1.row - 1) return ["7", "|", "F", "S"].includes(p2.char);
    if (p2.row == p1.row + 1) return ["J", "|", "L", "S"].includes(p2.char);
  }
  if (p1.char == "-") {
    if (p2.row !== p1.row) return false;
    if (p2.column == p1.column - 1) return ["F", "-", "L", "S"].includes(p2.char);
    if (p2.column == p1.column + 1) return ["7", "-", "J", "S"].includes(p2.char);
  }

  if (p1.char == "L") {
    if (p1.row - 1 == p2.row && p2.column == p1.column) {
      return ["F", "|", "7", "S"].includes(p2.char);
    }
    if (p2.row == p1.row && p1.column + 1 == p2.column) {
      return ["7", "-", "J", "S"].includes(p2.char);
    }
    return false;
  }
  if (p1.char == "J") {
    if (p1.row - 1 == p2.row && p2.column == p1.column) {
      return ["F", "|", "7", "S"].includes(p2.char);
    }
    if (p2.row == p1.row && p1.column - 1 == p2.column) {
      return ["F", "-", "L", "S"].includes(p2.char);
    }
    return false;
  }

  if (p1.char == "7") {
    if (p1.row + 1 == p2.row && p2.column == p1.column) {
      return ["J", "|", "L", "S"].includes(p2.char);
    }
    if (p2.row == p1.row && p1.column - 1 == p2.column) {
      return ["F", "-", "L", "S"].includes(p2.char);
    }
    return false;
  }
  if (p1.char == "F") {
    if (p1.row + 1 == p2.row && p2.column == p1.column) {
      return ["J", "|", "L"].includes(p2.char);
    }
    if (p2.row == p1.row && p1.column + 1 == p2.column) {
      return ["J", "-", "7"].includes(p2.char);
    }
    return false;
  }
  throw p1.char;
};

neihb: for (const neighbor of [neighbors[0]]) {
  // console.log(neighbor);
  const path = [neighbor!];
  let pointer = neighbor!;
  let lastPointer = beast;

  while (
    (() => {
      // console.log(`pointer: ${pointer.row}, ${pointer.column}, ${pointer.char}`);
      return pointer.char !== "S";
    })()
  ) {
    // console.log(pointer, lastPointer);
    const left = {
      row: pointer.row,
      column: pointer.column - 1,
      char: slots[pointer.row][pointer.column - 1] || "",
    };
    const right = {
      row: pointer.row,
      column: pointer.column + 1,
      char: slots[pointer.row][pointer.column + 1] || "",
    };
    const top = {
      row: pointer.row - 1,
      column: pointer.column,
      char: slots[pointer.row - 1]?.[pointer.column] ?? "",
    };
    const bottom = {
      row: pointer.row + 1,
      column: pointer.column,
      char: slots[pointer.row + 1]?.[pointer.column] ?? "",
    };
    const pointerNeighbors = [
      isLinked(pointer, left) ? left : null,
      isLinked(pointer, right) ? right : null,
      isLinked(pointer, top) ? top : null,
      isLinked(pointer, bottom) ? bottom : null,
    ];

    const touching = pointerNeighbors.filter(
      (e) => e && e.char !== "." && !path.some((point) => point.row == e.row && point.column == e.column) && !(path.length == 1 && e.char == "S")
    );

    if (!touching || !touching[0]) {
      // dead end
      // console.log("end", pointerNeighbors, touching, [left, right, top, bottom], pointer, lastPointer);
      console.log("dead end");
      console.log("neighbors", pointerNeighbors);
      console.log("touching", touching);
      console.log("sides", [left, right, top, bottom]);
      console.log("pointer", pointer);
      console.log("lastPointer", lastPointer);
      continue neihb;
    }
    lastPointer = pointer;
    pointer = touching[0];
    path.push(pointer);
  }
  // console.log(path, path.length, (path.length - 1) / 2);
  console.log(path[Math.floor((path.length - 1) / 2)], Math.floor((path.length - 1) / 2) + 1);

  let screen = Array.from({ length: slots.length * 2 }, () => Array(slots[0].length * 2).fill(0));
  let mt = screen.length * 2;
  let nt = screen[0].length * 2;
  let xt = 0;
  let yt = 0;
  // rowl: for (const row of slots) {
  //   for (let i = 0; i < row.length; i++) {
  //     if (row[i] == "F") {
  //       xt = i * 2 + 1;
  //       yt = slots.indexOf(row) * 2 + 1;
  //       console.log("F", xt, yt);
  //       break rowl;
  //     }
  //     if (row[i] == "7") {
  //       xt = i * 2 - 1;
  //       yt = slots.indexOf(row) * 2 + 1;
  //       console.log("7", xt, yt);
  //       break rowl;
  //     }
  //     if (row[i] == "-" && row[i + 1] == "-") {
  //       xt = i * 2;
  //       yt = slots.indexOf(row) * 2 + 1;
  //       console.log("--", xt, yt);
  //       break rowl;
  //     }
  //     if (row[i] == "|" && row[i + 1] == "|") {
  //       xt = i * 2 + 1;
  //       yt = slots.indexOf(row) * 2;
  //       console.log("||", xt, yt);
  //       break rowl;
  //     }
  //   }
  // }

  for (const spot of path.sort((a, b) => a.row - b.row || a.column - b.column)) {
    if (spot.char == "F") {
      xt = spot.column * 2 + 1;
      yt = spot.row * 2 + 1;
      console.log("F", xt, yt);
      break;
    }
    if (spot.char == "7") {
      xt = spot.column * 2 - 1;
      yt = spot.row * 2 + 1;
      console.log("7", xt, yt);
      break;
    }
    if (spot.char == "-" && slots[spot.row][spot.column + 1] == "-") {
      xt = spot.column * 2;
      yt = spot.row * 2 + 1;
      console.log("--", xt, yt);
      break;
    }
    if (spot.char == "|" && slots[spot.row + 1]?.[spot.column] == "|") {
      xt = spot.column * 2 + 1;
      yt = spot.row * 2;
      console.log("||", xt, yt);
      break;
    }
    console.log(spot.char, spot.row, spot.column);
  }

  for (const point of path) {
    // console.log(point.row * 2, point.column * 2);
    screen[point.row * 2][point.column * 2] = 1;
    if (point.char == "F") {
      screen[point.row * 2][point.column * 2 + 1] = 1;
      screen[point.row * 2 + 1][point.column * 2] = 1;
    }
    if (point.char == "7") {
      screen[point.row * 2][point.column * 2 - 1] = 1;
      screen[point.row * 2 + 1][point.column * 2] = 1;
    }
    if (point.char == "L") {
      screen[point.row * 2][point.column * 2 + 1] = 1;
      screen[point.row * 2 - 1][point.column * 2] = 1;
    }
    if (point.char == "J") {
      screen[point.row * 2][point.column * 2 - 1] = 1;
      screen[point.row * 2 - 1][point.column * 2] = 1;
    }
    if (point.char == "-") {
      screen[point.row * 2][point.column * 2 - 1] = 1;
      screen[point.row * 2][point.column * 2 + 1] = 1;
    }
    if (point.char == "|") {
      screen[point.row * 2 - 1][point.column * 2] = 1;
      screen[point.row * 2 + 1][point.column * 2] = 1;
    }
  }

  screen.forEach((row) => {
    row.forEach((col) => {
      process.stdout.write(col == 1 ? "X" : ".");
    });
    console.log();
  });
  console.log("filling");
  // floodFill(screen, mt, nt, xt, yt, 0, 2);
  floodFill(screen, nt, mt, yt, xt, 0, 2);
  screen.forEach((row) => {
    console.log(row.map((col) => (col == 2 ? "X" : col == 1 ? "O" : ".")).join(""));
  });
  let sum = 0;
  for (let i = 0; i < screen.length; i += 2) {
    for (let j = 0; j < screen[i].length; j += 2) {
      if (screen[i][j] == 2) {
        sum++;
      }
    }
  }
  console.log(sum);
  console.log(`(row: ${yt}, column: ${xt})`);
}

// let screen = [
//   [1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 1, 1, 1, 1, 1, 0, 0],
//   [1, 0, 0, 1, 1, 0, 1, 1],
//   [1, 0, 0, 0, 0, 0, 1, 0],
//   [1, 1, 1, 0, 0, 0, 1, 0],
//   [1, 1, 1, 0, 0, 0, 0, 0],
//   [0, 0, 1, 1, 1, 0, 1, 1],
//   [1, 0, 0, 1, 1, 0, 0, 1],
// ];

// New color that has to be filled
