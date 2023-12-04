export {};

// const input = `
// 467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..`;
const input = await Bun.file("../day3.txt").text();

const charArr = input
  .trim()
  .split("\n")
  .map((e) => e.trim().split(""));

interface char {
  y: number;
  x: number;
  v: string;
}

const allParts: char[][] = [];

for (let i = 0; i < charArr.length; i++) {
  let nums: char[][] = [];
  for (let j = 0; j < charArr[i].length; j++) {
    const c = charArr[i][j];
    if (!isNaN(parseInt(c))) {
      if (nums.length === 0) {
        nums.push([]);
      }
      nums[nums.length - 1].push({ y: i, x: j, v: c });
    } else {
      if (nums.length !== 0 && nums[nums.length - 1].length !== 0) {
        nums.push([]);
      }
    }
  }
  nums = nums.filter((e) => e.length !== 0);
  // console.log(nums.map(e => e.map(a => a.v).join("")))

  const parts: char[][] = [];
  numLoop: for (const num of nums) {
    for (const c of num) {
      const offsets = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
      ];
      for (const offset of offsets) {
        const newY = c.y + offset[0];
        const newX = c.x + offset[1];
        if (newY < 0 || newY > charArr.length - 1 || newX < 0 || newX > charArr.length - 1) continue;
        // console.log(num.map(e=>e.v).join(""), c.v, charArr[newY][newX], offset)
        // if in bounds
        if (charArr[newY][newX] === "*") {
          // if adjacent
          parts.push(num);
          continue numLoop;
        }
      }
    }
  }
  if (parts.length !== 0) {
    console.log(i, parts);
    allParts.push(...parts);
  }
}

let gearsSum = 0;

for (let i = 0; i < charArr.length; i++) {
  for (let j = 0; j < charArr[i].length; j++) {
    const c = charArr[i][j];
    if (c !== "*") continue;
    const parts: number[] = [];
    const offsets = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    for (const offset of offsets) {
      const newY = i + offset[0];
      const newX = j + offset[1];
      if (newY < 0 || newY > charArr.length - 1 || newX < 0 || newX > charArr.length - 1) continue;
      // console.log(num.map(e=>e.v).join(""), c.v, charArr[newY][newX], offset)
      // if in bounds
      // check throught allParts
      for (const part of allParts) {
        for (const c of part) {
          if (c.y == newY && c.x == newX) {
            parts.push(parseInt(part.map((e) => e.v).join("")));
          }
        }
      }
    }
    const partsFiltered = [...new Set(parts)];
    if (partsFiltered.length == 2) {
      const gearRatio = partsFiltered[0] * partsFiltered[1];
      console.log(gearRatio, partsFiltered);
      gearsSum += gearRatio;
    }
  }
}

console.log(gearsSum);
