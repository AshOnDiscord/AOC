export {};

const input = await Bun.file("../day2-mini.txt").text();
// const input = await Bun.file("../day2.txt").text();

const limits: Map<string, number> = new Map();
limits.set("red", 12);
limits.set("green", 13);
limits.set("blue", 14);

const gamesArr = input.trim().split("\n");

const games = [];
let powerSum = 0;

console;

gameLoop: for (const game of gamesArr) {
  const gameNumber: number = +game.split(":")[0].split(" ")[1];
  const colors = game
    .split(":")[1]
    .replaceAll(";", ",")
    .split(",")
    .map((e) => e.trim());
  for (const e of colors) {
    const count = parseInt(e.split(" ")[0]);
    const color = e.split(" ")[1].toLocaleLowerCase();
    if (count > limits.get(color)!) {
      continue gameLoop;
    }
  }
  games.push(gameNumber);
}

console.log(games.reduce((a, b) => a + b));
