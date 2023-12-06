export {};

// const input = await Bun.file("../day6-mini.txt").text();
const input = await Bun.file("../day6.txt").text();

const time = parseInt(
  input
    .split("\n")[0]
    .split(": ")[1]
    .split(" ")
    .filter((e) => e !== "")
    .join("")
);

const records = parseInt(
  input
    .split("\n")[1]
    .split(": ")[1]
    .split(" ")
    .filter((e) => e !== "")
    .join("")
);

const getResult = (hold: number, duration: number): number => {
  const speed = hold;
  const rest = duration - hold;
  return speed * rest;
};

console.log(time);
console.log(records);

const ways = [];

for (let j = Math.floor(time / 2.0); j >= 1; j--) {
  // console.log(getResult(j, time[i]), records[i]);
  if (getResult(j, time) <= records) {
    // console.log("+++++");
    const half = Math.floor(time / 2.0) - j;
    const offset = time % 2 == 0 ? 1 : 0;
    console.log(half * 2 - offset);
    ways.push(half * 2 - offset);
    break;
  }
}
// console.log("-----");
console.log(ways);
