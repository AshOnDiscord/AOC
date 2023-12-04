export {};

// const input = `
// Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
// Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
// Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
// Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
// Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
// Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;
const input = await Bun.file("../day4-scratchcards.txt").text();

const cards: card[] = input
  .trim()
  .split("\n")
  .map((line) => {
    const [t1, t2] = line.split(": ");
    const [n1, n2] = t2.split(" | ");
    const card = t1.split(" ")[1];
    const winning = n1
      .split(" ")
      .filter((n) => n.trim() !== "")
      .map((n) => parseInt(n));
    const numbers = n2
      .split(" ")
      .filter((n) => n.trim() !== "")
      .map((n) => parseInt(n));

    const matches = winning.filter((n) => numbers.includes(n));
    // console.log({ card, winning, numbers, matches });
    return { winning, numbers, matches };
  });

const copies: number[] = [];

interface card {
  winning: number[];
  numbers: number[];
  matches: number[];
}

for (let i = 0; i < cards.length; i++) {
  if (!copies[i]) {
    copies[i] = 1;
  }
  const copiesCurrent = copies[i];
  const card = cards[i];
  const matches = card.matches.length;
  console.log({ i: i + 1, matches, copiesCurrent, copies });
  for (let j = 0; j < matches; j++) {
    // cardCopies.push(i + j + 1);
    copies[i + j + 1] = (copies[i + j + 1] || 1) + copiesCurrent;
  }
  console.log({ i: i + 1, copies });
}
console.log(copies);
console.log(copies.reduce((a, b) => a + b));
