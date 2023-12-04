export {};

// const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
// Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
// Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
// Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;
const input = await Bun.file("../day2-cube-conundrum.txt").text();

const limits: Map<string, number> = new Map();
limits.set("red", 12);
limits.set("green", 13);
limits.set("blue", 14);

const gamesArr = input.trim().split("\n");

let powerSum = 0;

for (const game of gamesArr) {
  const gameNumber: number = +game.split(":")[0].split(" ")[1];
  const colors = game
    .split(":")[1]
    .replaceAll(";", ",")
    .split(",")
    .map((e) => e.trim());
  const max: Map<string, number> = new Map();
  for (const e of colors) {
    const count = +e.split(" ")[0];
    const color = e.split(" ")[1].toLocaleLowerCase();
    if (max.has(color)) {
      if (count > max.get(color)!) {
        max.set(color, count);
      }
    } else {
      max.set(color, count);
    }
  }
  let power = 1;
  for (const [k, v] of max.entries()) {
    power *= v;
  }
  powerSum += power;
}

console.log(powerSum);
