export {};

// const input = await Bun.file("../day7-mini.txt").text();
const input = await Bun.file("../day7.txt").text();

const cards: {
  [key: string]: number;
} = {
  J: 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  T: 10,
  Q: 11,
  K: 12,
  A: 13,
};

const getCard = (s: string): number => {
  return cards[s.toUpperCase()];
};

const games = input
  .trim()
  .split("\n")
  .filter((e) => e)
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

  const jCount = handCopy.filter((e) => e === 1).length;
  // check for five of a kind
  const counts: number[] = [];
  for (let i = 0; i < handCopy.length; i++) {
    if (handCopy[i] === cards.J) {
      continue;
    }
    if (handCopy[i - 1] !== handCopy[i]) {
      counts.push(1);
    } else {
      counts[counts.length - 1]++;
    }
  }
  counts.sort((a, b) => b - a);
  if ((counts[0] || 0) + jCount === 5) {
    return hands.fiveOfAKind;
  }
  if ((counts[0] || 0) + jCount === 4) {
    return hands.fourOfAKind;
  }
  // if ((counts[0] || 0) + jCount === 3 && counts[1] + jCount === 2) {
  //   return hands.fullHouse;
  // }
  {
    const neededJForTrio = 3 - (counts[0] || 0);
    const remainingJ = jCount - neededJForTrio;
    if (remainingJ >= 0 && (counts[1] || 0) + remainingJ === 2) {
      return hands.fullHouse;
    }
  }
  if ((counts[0] || 0) + jCount === 3) {
    return hands.threeOfAKind;
  }
  // j has to be 2 or less by now
  if ((counts[0] || 0) == 2 && (counts[1] || 0) == 2) {
    return hands.twoPairs;
  }
  // counts[1] has to be 1 or 0
  if ((counts[0] || 0) == 2 && jCount + (counts[1] || 0) == 2) {
    return hands.twoPairs;
  }
  // counts[1] even with j is not enough for a pair
  if ((counts[0] || 0) + jCount == 2) {
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
    // .map((e, index) => {
    //   return [index, e.bid];
    // })
    // .forEach((e) => console.log(`${e[0]} ${e[1]}`))
    .map((e, index) => {
      return (index + 1) * e.bid;
    })
    .reduce((a, b) => a + b)
);
