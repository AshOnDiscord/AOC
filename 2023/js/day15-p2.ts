import { expect, test } from "bun:test";
import { toASCII } from "punycode";
export {};

// const input = (await Bun.file("../day15-mini.txt").text()).trim();
const input = (await Bun.file("../day15.txt").text()).trim();

interface labels {
  label: string,
  operation: boolean, // true =, false -
  focal: number | null
}

const lines: labels[] = input
  .split(",")
  .map((e) => {
    return e.trim();
  })
  .filter((e) => e)
  .map(e => {
    if (e.slice(-1) === "-") {
      return {
        label: e.slice(0, -1),
        operation: false,
        focal: null,
      }
    }
    const [label, focal] = e.split("=")
    return {
      label,
      operation: true,
      focal: parseInt(focal),
    }
  })

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


// if - go to box hash(label) and remove the matching label
// if = go to box hash(label)
// if there is already the same label lens, replace it in place
// else add to the end

// hash -> label -> lens
const boxes: Map<number,Map<string, number>> = new Map()

for (const line of lines) {
  const boxKey = hash(line.label)
  if (!line.operation) {
    // remove labels
    if (boxes.has(boxKey)) {
      boxes.get(boxKey)!.delete(line.label)
      continue
    }
    continue
  }
  // add labels
  if (boxes.has(boxKey)) {
    // replace focal
    boxes.get(boxKey)!.set(line.label, line.focal!)
    continue
  }
  // add new box
  const newBox = new Map();
  newBox.set(line.label, line.focal!)
  boxes.set(boxKey, newBox)
}

console.log(boxes)

let totalPower = 0;
for (let [boxKey, box] of boxes) {
  const focals = Array.from(box.entries())
  for (const [lensIndex, lens] of focals.entries()) {
    const boxNum = boxKey + 1;
    const lensNum = lensIndex + 1;
    const focalLength = lens[1];
    const power = boxNum * lensNum * focalLength;
    // console.log(boxKey, lensIndex, lens, power);
    totalPower += power;
  }
}

console.log(totalPower)
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
