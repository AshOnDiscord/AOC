export {};

const input = Bun.file("../day1-trebuchet.txt");
const inputArr = (await input.text()).trim().split("\n");

const result: string[] = [];

for (let i = 0; i < inputArr.length; i++) {
  const line = inputArr[i];
  result.push("");
  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    if (!isNaN(parseInt(char))) {
      result[i] += char;
    }
    const substring = line.substring(j);
    if (substring.startsWith("one")) result[i] += "1";
    if (substring.startsWith("two")) result[i] += "2";
    if (substring.startsWith("three")) result[i] += "3";
    if (substring.startsWith("four")) result[i] += "4";
    if (substring.startsWith("five")) result[i] += "5";
    if (substring.startsWith("six")) result[i] += "6";
    if (substring.startsWith("seven")) result[i] += "7";
    if (substring.startsWith("eight")) result[i] += "8";
    if (substring.startsWith("nine")) result[i] += "9";
  }
}

console.log(result.map((x) => parseInt(x.charAt(0) + x.charAt(x.length - 1))).reduce((a, b) => a + b));
