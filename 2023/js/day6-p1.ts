export {};

// const input = await Bun.file("../day6-mini.txt").text();
const input = await Bun.file("../day6.txt").text();

const time = input
  .split("\n")[0]
  .split(": ")[1]
  .split(" ")
  .filter((e) => e !== "")
  .map((e) => parseInt(e));

const records = input
  .split("\n")[1]
  .split(": ")[1]
  .split(" ")
  .filter((e) => e !== "")
  .map((e) => parseInt(e));

const getResult = (hold: number, duration: number): number => {
  const speed = hold;
  const rest = duration - hold;
  return speed * rest;
};

console.log(time);
console.log(records);

const ways = [];

for (let i = 0; i < time.length; i++) {
  for (let j = Math.floor(time[i] / 2.0); j >= 1; j--) {
    // console.log(getResult(j, time[i]), records[i]);
    if (getResult(j, time[i]) <= records[i]) {
      // console.log("+++++");
      const half = Math.floor(time[i] / 2.0) - j;
      const offset = time[i] % 2 == 0 ? 1 : 0;
      console.log(half * 2 - offset);
      ways.push(half * 2 - offset);
      break;
    }
  }
  // console.log("-----");
}
console.log(ways);
console.log(ways.reduce((a, b) => a * b, 1));
