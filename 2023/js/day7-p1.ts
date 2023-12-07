export {};

// const input = await Bun.file("../day7-mini.txt").text();
const input = await Bun.file("../day7.txt").text();

const cards: {
  [key: string]: number;
} = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const getCard = (s: string): number => {
  return cards[s.toUpperCase()];
};

const games = input
  .trim()
  .split("\n")
  .map((e) => {
    const [hand, bidTemp] = e.split(" ");
    const hands = hand.split("").map(getCard);
    const bid = parseInt(bidTemp);
    return { hands, bid };
  });

const hands = {
  // hands + high card
  highCard: 0,
  onePair: 1,
  twoPairs: 2,
  threeOfAKind: 3,
  fullHouse: 4,
  fourOfAKind: 5,
  fiveOfAKind: 6,
};

const getDeckType = (hand: number[]): number => {
  const handCopy = [...hand].sort((a, b) => a - b);
  // check for five of a kind
  if (handCopy[0] === handCopy[4]) {
    return hands.fiveOfAKind;
  }
  if (handCopy[0] === handCopy[3] || handCopy[1] === handCopy[4]) {
    return hands.fourOfAKind;
  }
  if (handCopy[0] === handCopy[1] && handCopy[2] === handCopy[4]) {
    return hands.fullHouse; // triple higher than pair
  }
  if (handCopy[0] === handCopy[2] && handCopy[3] === handCopy[4]) {
    return hands.fullHouse; // triple lower than pair
  }
  if (handCopy[0] === handCopy[2] || handCopy[1] === handCopy[3] || handCopy[2] === handCopy[4]) {
    return hands.threeOfAKind;
  }
  // debugger;
  let pairs = 0;
  for (let i = 0; i < 4; i++) {
    if (handCopy[i] === handCopy[i + 1]) {
      pairs++;
    }
  }
  if (pairs === 2) {
    return hands.twoPairs;
  }
  if (pairs === 1) {
    return hands.onePair;
  }
  return hands.highCard;
};

const getDeckValue = (deck: number[]): number => {
  const string = deck.map((e) => e.toString().padStart(2, "0")).join("");
  return parseInt(string);
};

console.log(
  games
    .map((e) => ({ ...e, type: getDeckType(e.hands), value: getDeckValue(e.hands) }))
    .sort((a, b) => {
      if (a.type === b.type) {
        return b.value - a.value;
      }
      return b.type - a.type;
    })
    .reverse()
    .map((e, index) => {
      return (index + 1) * e.bid;
    })
    .reduce((a, b) => a + b)
);
