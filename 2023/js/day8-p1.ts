export {};

const input = (await Bun.file("../day8-mini.txt").text()).trim();
// const input = (await Bun.file("../day8.txt").text()).trim();

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

console.log(pattern);

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

let pointer = nodes.get("AAA");
let counter = 0;
let patternIndex = 0;

const path = [];

while (pointer.value !== "ZZZ") {
  pointer = nodes.get(pointer.children[pattern[patternIndex]])!;
  patternIndex++;
  if (patternIndex === pattern.length) {
    patternIndex = 0;
  }
  counter++;
  path.push(pointer.value);
}

console.log(counter);
// console.log(path.join(" -> "));