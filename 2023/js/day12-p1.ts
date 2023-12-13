export {};

// const input = (await Bun.file("../day12-mini.txt").text()).trim();
const input = (await Bun.file("../day12.txt").text()).trim();

const lines = input
  .split("\n")
  .filter((e) => e)
  .map((e) => {
    const [string, pattern] = e.split(" ");
    return { string, count: pattern.split(",").map((e) => parseInt(e, 10)) };
  });

const lookUp = new Map<string, number>();

const getCount = (string: string, count: number[]): number => {
  if (string === "") {
    return count.length == 0 ? 1 : 0;
  }
  if (count.length === 0) {
    return string.includes("#") ? 0 : 1;
  }

  const key = string + "|" + count.join(",");
  if (lookUp.has(key)) {
    return lookUp.get(key)!;
  }
  // actual logic
  let sum = 0;

  if (string[0] == "." || string[0] == "?") {
    // . state
    sum += getCount(string.slice(1), count);
  }
  if (string[0] == "#" || string[0] == "?") {
    // # state 
    const enoughLeft = count.reduce((a, b) => a + b, 0) <= string.length;
    const substring = string.substring(0, count[0]);
    const longEnough = !substring.includes(".");
    const shortEnough = string.length == count[0];
    // there has to a be . seperating the groups
    const notLinked = !string.charAt(count[0]).includes("#");
    // console.log(shortEnough, notLinked, string.charAt(count[0]), string, count);
    if (enoughLeft && longEnough && (shortEnough || notLinked)) {
      sum += getCount(string.slice(count[0] + 1), count.slice(1));
    }
  }
  lookUp.set(key, sum);
  return sum;
}

// console.log(lines);

// const line = lines[0]
let sum = 0;

for (const line of lines) {
  const count = getCount(line.string, line.count);
  // console.log(count);
  sum += count;
}
console.log(sum);