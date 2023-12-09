export {};

// const input = (await Bun.file("../day9-mini.txt").text()).trim();
const input = (await Bun.file("../day9.txt").text()).trim();

const lines = input
  .split("\n")
  .filter(e => e)
  .map(e => {
    return e.split(" ").map(a => parseInt(a));
  });

// console.log(lines);

const extrapolate = (offsets: number[][]) => {
  return offsets.map(e => e[e.length - 1]).reduce((a, b) => a + b);
};

const getOffsets = (line: number[]): number[][] => {
  let current = [...line];
  const histories: number[][] = [current];
  while (current == lines[0] || !histories.some(a => a.every(b => b == 0))) {
    // console.log(histories.length);
    const tempHistory: number[] = [];
    for (let i = 0; i < current.length - 1; i++) {
      // console.log(current[i], current[i + 1]);
      tempHistory.push(current[i + 1] - current[i]);
    }
    histories.push(tempHistory);
    current = tempHistory;
    // console.log(current);
  }
  // console.log(histories);
  return histories;
};

// for (const line of lines) {
//   console.log(extrapolate(getOffsets(line)));
// }

console.log(
  lines.map(line => extrapolate(getOffsets(line))).reduce((a, b) => a + b)
);
