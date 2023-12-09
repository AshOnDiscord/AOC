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

const backpolate = (offsets: number[][]) => {
  let lastOffset = offsets[offsets.length - 1][0];
  for (let i = offsets.length - 2; i >= 0; i--) {
    lastOffset = offsets[i][0] - lastOffset;
    // console.log(offsets[i][0], offsets[i + 1][0], lastOffset);
  }
  return lastOffset;
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

for (const line of lines) {
  const offsets = getOffsets(line);
  console.log(backpolate(offsets), offsets);
}

console.log(
  lines.map(line => backpolate(getOffsets(line))).reduce((a, b) => a + b)
);

// console.log(backpolate(getOffsets(lines[1])));
