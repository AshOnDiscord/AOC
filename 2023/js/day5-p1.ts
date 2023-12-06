export {};

const input = await Bun.file("../day5-mini.txt").text();
// const input = await Bun.file("../day5.txt").text();

const temp = input.split("\n\n");
const seeds = temp.shift();
const maps = temp.map((e) => {
  const x = e.split("\n");

  x.shift();
  return x.map((y) => {
    const [dest1, source1, range1] = y.split(" ");
    const dest = parseInt(dest1);
    const source = parseInt(source1);
    const range = parseInt(range1);
    return { dest, source, range };
  });
});
// console.log(maps);
const seedsArr = seeds
  ?.split(": ")[1]
  .split(" ")
  .map((e) => parseInt(e))!;
// console.log(seedsArr);

let min = Infinity;
for (const seed of seedsArr) {
  let newVal = seed;
  for (const map of maps) {
    const mapping = map.filter((e) => {
      const lower = e.source;
      const upper = e.source + e.range;
      // console.log(lower, upper, newVal);
      return newVal >= lower && newVal <= upper;
    });
    // console.log(mapping);
    if (mapping.length === 0) {
      continue;
    }
    const offset = newVal - mapping[0].source;
    const oldVal = newVal;
    newVal = mapping[0].dest + offset;
    // console.log("!", oldVal, newVal, offset);
  }
  if (newVal < min) {
    min = newVal;
  }
  console.log(seed, newVal);
}

console.log(min);
