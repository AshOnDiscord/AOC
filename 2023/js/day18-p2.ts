export {};

const input = (await Bun.file("../day18-mini.txt").text()).trim();
// const input = (await Bun.file("../day18.txt").text()).trim();

const lines = input
  .split("\n")
  .filter((e) => e)
  .map((e) => {
    return e;
  });
