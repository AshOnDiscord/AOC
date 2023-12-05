console.log(Bun.argv);
const day = Bun.argv[2]?.trim();

if (day === "" || isNaN(parseInt(day))) {
  console.log("Please enter a valid day number.");
  process.exit(1);
}

const boilerplateFile = await(Bun.file("./template.ts")).text();
const boilerplate = boilerplateFile.replaceAll("{{dayNumber}}", day);
await Bun.write(`day${day}-p1.ts`, boilerplateFile);
await Bun.write(`day${day}-p2.ts`, boilerplateFile);

const cookie = Bun.env.AOC_TOKEN;
const puzzleInput = await(
  await fetch(`https://adventofcode.com/2023/day/${day}/input`, {
    headers: {
      cookie: `session=${cookie}`,
    },
  })
).text();

await Bun.write(`../day${day}.txt`, puzzleInput);

await Bun.write(`../day${day}-mini.txt`, ""); // paste mini input here

await Bun.spawn(["code-insiders", "-r", `day${day}-p2.ts`]);
await Bun.spawn(["code-insiders", "-r", `../day${day}.txt`]);
await Bun.spawn(["code-insiders", "-r", `day${day}-p1.ts`]);
await Bun.spawn(["code-insiders", "-r", `../day${day}-mini.txt`]);
