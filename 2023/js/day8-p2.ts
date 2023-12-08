import { lcm } from "./utils";

export {};

// const input = (await Bun.file("../day8-mini.txt").text()).trim();
const input = (await Bun.file("../day8.txt").text()).trim();

// const input = ``

interface Node {
  children: [string, string]; 
  value: string;
  // parent: Node[] | null;
}

const lines = input
  .split("\n")
  .filter((e) => e)
  .map((e) => {
    return e;
  });

const pattern = lines.shift()!.split("").map(e => {
  switch (e) {
    case "L": return 0;
    case "R": return 1;
  }
})

// console.log(pattern);

const nodes: Map<string, Node> = new Map();

for (const line of lines) { 
  const [value, temp] = line.split(" = ");
  const [lTemp, rTemp] = temp.split(", ");
  const left = lTemp.substring(1);
  const right = rTemp.substring(0, rTemp.length - 1);
  nodes.set(value, {
    children: [left, right],
    value,
  })
}

// console.log(nodes);

console.log();

let pointers: Node[] = Array.from(nodes).map(e => e[1]).filter(e =>  e.value.charAt(2) ==="A")

// console.log(pointers)

let counter = 0;
let patternIndex = 0;

const paths: number = [];

// while (pointers.some(e => { 
//   // console.log(e);
//   return e.value.charAt(2) !== "Z"
// })) {
for (let i = 0; i < pointers.length; i++) {
  patternIndex = 0;
  counter = 0;
  while (pointers[i].value.charAt(2) !== "Z") {
    const id = pointers[i].children[pattern[patternIndex]];
    const child = nodes.get(id)!;
    pointers[i] = child;
    patternIndex++;
    if (patternIndex === pattern.length) {
      patternIndex = 0;
    }
    counter++;
  }
  paths.push(counter);
}
// }

// console.log(counter);
console.log(paths);

console.log(paths.reduce(lcm));