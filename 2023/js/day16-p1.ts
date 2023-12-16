export {};

// const input = (await Bun.file("../day16-mini.txt").text()).trim();
const input = (await Bun.file("../day16.txt").text()).trim();

const lines = input
  .split("\n")
  .filter((e) => e)
  .map((e) => {
    return e.split("");
  });

interface Pointer {
  x: number;
  y: number;
  xMovement: number;
  yMovement: number;
}

// 0, 0 moving right
const start: Pointer = {
  x: -1,
  y: 0,
  xMovement: 1,
  yMovement: 0,
};

// lines.forEach((line) => {
//   console.log(line.join(""));
// });
const checked: Pointer[] = [];
// checked.add(JSON.stringify(start));
const pointers: Pointer[] = [{ ...start }];

const checkedHas = (pointer: Pointer, checked: Pointer[]): boolean => {
  return checked.some(
    (e) =>
      e.x === pointer.x &&
      e.y === pointer.y &&
      e.xMovement === pointer.xMovement &&
      e.yMovement === pointer.yMovement
  );
};

while (pointers.length > 0) {
  // console.log(pointers, checked);
  let pointer = pointers.shift()!;

  pointer.x += pointer.xMovement;
  pointer.y += pointer.yMovement;

  // check bounds
  if (pointer.x < 0 || pointer.x >= lines[0].length) {
    continue;
  }
  if (pointer.y < 0 || pointer.y >= lines.length) {
    continue;
  }

  // check value
  const value = lines[pointer.y][pointer.x];

  // continue on
  if (
    value == "." ||
    (value == "-" && pointer.xMovement != 0) ||
    (value == "|" && pointer.yMovement != 0)
  ) {
    if (!checkedHas(pointer, checked)) {
      pointers.push({ ...pointer });
      checked.push({ ...pointer });
    }
  } else if (value === "/") {
    pointer = {
      ...pointer,
      xMovement: -pointer.yMovement,
      yMovement: -pointer.xMovement,
    };
    if (!checkedHas(pointer, checked)) {
      pointers.push({ ...pointer });
      checked.push({ ...pointer });
    }
  } else if (value === "\\") {
    pointer = {
      ...pointer,
      xMovement: pointer.yMovement,
      yMovement: pointer.xMovement,
    };
    if (!checkedHas(pointer, checked)) {
      pointers.push({ ...pointer });
      checked.push({ ...pointer });
    }
  } else {
    // split
    const pointer1 = {
      ...pointer,
      xMovement: -pointer.yMovement,
      yMovement: -pointer.xMovement,
    };
    const pointer2 = {
      ...pointer,
      xMovement: pointer.yMovement,
      yMovement: pointer.xMovement,
    };

    if (!checkedHas(pointer1, checked)) {
      pointers.push({ ...pointer1 });
      checked.push({ ...pointer1 });
    }
    if (!checkedHas(pointer2, checked)) {
      pointers.push(pointer2);
      checked.push({ ...pointer2 });
    }
  }
}
// console.log(checked.size);

const set = new Set<string>(checked.map((e) => `${e.x},${e.y}`));
// console.log(checked.length);
console.log(set.size);
// console.log(checkedArray);

// for (let y = 0; y < lines.length; y++) {
//   for (let x = 0; x < lines[y].length; x++) {
//     if (checkedArray.some((e) => e.x === x && e.y === y)) {
//       process.stdout.write("X");
//     } else {
//       process.stdout.write(lines[y][x]);
//     }
//   }
//   process.stdout.write("\n");
// }
