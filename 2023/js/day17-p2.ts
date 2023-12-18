export {};
// (async () => {
// const input = (await Bun.file("../day17-mini.txt").text()).trim();
const input = (await Bun.file("../day17.txt").text()).trim();

const lines = input
  .split("\n")
  .filter((e) => e)
  .map((e) => {
    return e.split("").map((e) => +e);
  });

// lines.forEach((e) => console.log(e.join("")));

interface Point {
  x: number;
  y: number;
  dirX: number;
  dirY: number;
  consecutive: number;
  totalLoss: number;
}

const seen: Set<string> = new Set();
const pq: Point[] = [];
pq.push({
  x: 0,
  y: 0,
  dirX: 0,
  dirY: 0,
  consecutive: 0,
  totalLoss: 0,
});

while (pq.length !== 0) {
  pq.sort((a: Point, b: Point) => {
    if (a.totalLoss !== b.totalLoss) {
      return a.totalLoss - b.totalLoss;
    }
    if (a.y !== b.y) {
      return a.y - b.y;
    }
    return a.x - b.x;
  });
  const { x, y, dirX, dirY, consecutive, totalLoss } = pq.shift()!;

  console.log(pq.length, x, y, dirX, dirY, consecutive, totalLoss);

  if (y === lines.length - 1 && x === lines[0].length - 1 && consecutive >= 4) {
    console.log(totalLoss);
    break;
  }

  const key = `${x},${y},${dirX},${dirY},${consecutive}`;
  if (seen.has(key)) {
    continue;
  }

  seen.add(key);

  if (consecutive < 10 && (dirX !== 0 || dirY !== 0)) {
    const nx = x + dirX;
    const ny = y + dirY;
    if (nx >= 0 && nx < lines[0].length && ny >= 0 && ny < lines.length) {
      pq.push({
        x: nx,
        y: ny,
        dirX,
        dirY,
        consecutive: consecutive + 1,
        totalLoss: totalLoss + lines[ny][nx],
      });
    }
  }
  if (consecutive >= 4 || (dirX === 0 && dirY === 0)) {
    const directions: [number, number][] = [
      [0, 1],
      [1, 0],
      [-1, 0],
      [0, -1],
    ];
    for (let nd of directions) {
      const [ndx, ndy] = nd;
      if (dirX === ndx && dirY === ndy) {
        continue;
      }
      if (dirX === -ndx && dirY === -ndy) {
        continue;
      }
      const nx = x + ndx;
      const ny = y + ndy;
      if (nx >= 0 && nx < lines[0].length && ny >= 0 && ny < lines.length) {
        pq.push({
          x: nx,
          y: ny,
          dirX: ndx,
          dirY: ndy,
          consecutive: 1,
          totalLoss: totalLoss + lines[ny][nx],
        });
      }
    }
  }
}
// })();