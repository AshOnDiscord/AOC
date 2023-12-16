import { expect, test } from "bun:test";
export {};

// const input = (await Bun.file("../day15-mini.txt").text()).trim();
const input = (await Bun.file("../day15.txt").text()).trim();

const lines = input
  .split(",")
  .map((e) => {
    return e.trim();
  })
  .filter((e) => e)

const hash = (str: string): number => {
  let sum = 0;

  for (const char of str.split("")) {
    sum += char.charCodeAt(0);
    sum *= 17;
    sum %= 256;
  }

  if (sum < 0) {
    throw new Error(`Sum is below zero: ${sum}`);
  } else if (sum > 255) {
    throw new Error(`Sum is above 255: ${sum}`);
  } else {
    return sum
  }
}

console.log(lines.map(hash).reduce((a, b) => a + b, 0))


// test("hash(HASH)", () => {
//   expect(hash("HASH")).toBe(52);
// })

// test("hash(input", async () => {
//   const input = (await Bun.file("../day15-mini.txt").text()).trim().split(",").map(e => e.trim()).filter(e=>e);
//   console.log(input.map(hash))
//   expect(hash(input[0])).toBe(30);
//   expect(hash(input[1])).toBe(253);
//   expect(hash(input[2])).toBe(97);
//   expect(hash(input[3])).toBe(47);
//   expect(hash(input[4])).toBe(14);
//   expect(hash(input[5])).toBe(180);
//   expect(hash(input[6])).toBe(9);
//   expect(hash(input[7])).toBe(197);
//   expect(hash(input[8])).toBe(48);
//   expect(hash(input[9])).toBe(214);
//   expect(hash(input[10])).toBe(231);
// })
