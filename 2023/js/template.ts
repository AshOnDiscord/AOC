export {};

const input = (await Bun.file("../day{{dayNumber}}-mini.txt").text()).trim();
// const input = (await Bun.file("../day{{dayNumber}}.txt").text()).trim();

const lines = input
  .split("\n")
  .filter((e) => e)
  .map((e) => {
    return e;
  });
