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

const symbols = "*@#$%&-/=+".split("");

const charArr = input
  .trim()
  .split("\n")
  .map((e) => e.trim().split(""));

interface char {
  y: number;
  x: number;
  v: string;
}

let partsSum = 0;

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

  const parts: number[] = [];
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
        if (symbols.includes(charArr[newY][newX])) {
          // if adjacent
          parts.push(parseInt(num.map((e) => e.v).join("")));
          continue numLoop;
        }
      }
    }
  }
  if (nums.length !== 0)
    console.log(
      i,
      nums.map((a) => a.map((e) => e.v).join("")),
      parts
    );
  parts.forEach((e) => (partsSum += e));
}
console.log(partsSum);
