const points: [number, number][] = [[0, 0]];
const dirs: { [key: string]: [number, number] } = { "U": [-1, 0], "D": [1, 0], "L": [0, -1], "R": [0, 1] };

let b: number = 0;

// Assuming you have an array of strings representing the input lines
const inputLines: string[] = (await Bun.file("../day18.txt").text()).trim().split("\n");

for (const line of inputLines) {
    const [d, nStr] = line.split(" ");
    const [dr, dc] = dirs[d];
    const n: number = parseInt(nStr);
    b += n;
    const [r, c] = points[points.length - 1];
    points.push([r + dr * n, c + dc * n]);
}

const A: number = Math.abs(
    points.reduce((sum, point, i) =>
        sum + point[0] * (points[i - 1][1] - points[(i + 1) % points.length][1]), 0
    ) / 2
);

const i: number = A - Math.floor(b / 2) + 1;

console.log(i + b);
