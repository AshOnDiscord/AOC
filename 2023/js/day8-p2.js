// const input = (await Bun.file("../day8-mini.txt").text()).trim();
// const input = (await Bun.file("../day8.txt").text()).trim();
const input = ``;
const lines = input
    .split("\n")
    .filter((e) => e)
    .map((e) => {
    return e;
});
const pattern = lines.shift().split("").map(e => {
    switch (e) {
        case "L": return 0;
        case "R": return 1;
    }
});
// console.log(pattern);
const nodes = new Map();
for (const line of lines) {
    const [value, temp] = line.split(" = ");
    const [lTemp, rTemp] = temp.split(", ");
    const left = lTemp.substring(1);
    const right = rTemp.substring(0, rTemp.length - 1);
    nodes.set(value, {
        children: [left, right],
        value,
    });
}
// console.log(nodes);
console.log();
let pointers = Array.from(nodes).map(e => e[1]).filter(e => e.value.charAt(2) === "A");
// console.log(pointers)
let counter = 0;
let patternIndex = 0;
const paths = [];
while (pointers.some(e => {
    // console.log(e);
    return e.value.charAt(2) !== "Z";
})) {
    for (let i = 0; i < pointers.length; i++) {
        const id = pointers[i].children[pattern[patternIndex]];
        const child = nodes.get(id);
        // console.log(child, id);
        pointers[i] = child;
        if (paths[i] === undefined) {
            paths[i] = [];
        }
        paths[i].push(pointers[i]);
    }
    patternIndex++;
    if (patternIndex === pattern.length) {
        patternIndex = 0;
    }
    counter++;
}
console.log(counter);
export {};
// console.log(paths);
