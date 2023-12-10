export {};

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
}
