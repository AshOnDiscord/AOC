const getIntersections = (parent: range, ...ranges: range[]): range[] => {
  // return intersections from ranges, in parent
  const result: range[] = [];
  for (const range of ranges) {
    if (range.min <= parent.max && range.max >= parent.min) {
      const min = Math.max(range.min, parent.min);
      const max = Math.min(range.max, parent.max);
      result.push({ min, max });
    }
  }
  return result;
};

const getDifference = (parent: range, ...ranges: range[]): range[] => {
  const overlaps = getIntersections(parent, ...ranges);

  let differences: range[] = [];

  // Add the initial difference before the first range
  if (parent.min < overlaps[0].min) {
    differences.push({ min: parent.min, max: overlaps[0].min - 1 });
  }

  // Iterate through each range and add differences between them
  for (let i = 1; i < overlaps.length; i++) {
    differences.push({ min: overlaps[i - 1].max + 1, max: overlaps[i].min - 1 });
  }

  // Add the final difference after the last range
  if (parent.max > overlaps[overlaps.length - 1].max) {
    differences.push({ min: overlaps[overlaps.length - 1].max + 1, max: parent.max });
  }

  return differences;
};

interface range {
  min: number;
  max: number;
}

const parent = { min: 4, max: 10 };
const ranges = [
  { min: 2, max: 5 },
  { min: 7, max: 9 },
  { min: 12, max: 14 },
];

const intersections = getIntersections(parent, ...ranges);
const differences = getDifference(parent, ...ranges);

console.log(intersections.concat(differences).sort((a, b) => a.min - b.min));
