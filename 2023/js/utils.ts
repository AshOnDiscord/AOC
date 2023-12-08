export class Grid {
  private points: (Point | null)[][] = [];
  constructor(public width: number, public height: number) {}
  get(x: number, y: number): Point | null {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return null;
    }
    return this.points[y][x];
  }
  set(x: number, y: number, value: Point) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return;
    }
    this.points[y][x] = value;
  }
  setPoint(point: Point) {
    this.set(point.x, point.y, point);
  }
  setPoints(points: Point[]) {
    points.forEach((point) => this.setPoint(point));
  }
  reset() {
    this.points = [];
    for (let y = 0; y < this.height; y++) {
      const row = [];
      for (let x = 0; x < this.width; x++) {
        row.push(null);
      }
      this.points.push(row);
    }
  }
}

export class Point {
  constructor(public x: number, public y: number, public grid: Grid) {}

  getNeighbors(): (Point | null)[] {
    return [
      this.getNeighbor(Direction.topLeft),
      this.getNeighbor(Direction.top),
      this.getNeighbor(Direction.topRight),
      this.getNeighbor(Direction.right),
      this.getNeighbor(Direction.bottomRight),
      this.getNeighbor(Direction.bottom),
      this.getNeighbor(Direction.bottomLeft),
      this.getNeighbor(Direction.left),
    ];
  }

  getNeighbor(direction: Direction): Point | null {
    switch (direction) {
      case Direction.topLeft:
        return this.grid.get(this.x - 1, this.y - 1);
      case Direction.top:
        return this.grid.get(this.x, this.y - 1);
      case Direction.topRight:
        return this.grid.get(this.x + 1, this.y - 1);
      case Direction.right:
        return this.grid.get(this.x + 1, this.y);
      case Direction.bottomRight:
        return this.grid.get(this.x + 1, this.y + 1);
      case Direction.bottom:
        return this.grid.get(this.x, this.y + 1);
      case Direction.bottomLeft:
        return this.grid.get(this.x - 1, this.y + 1);
      case Direction.left:
        return this.grid.get(this.x - 1, this.y);
      default:
        return null;
    }
  }
}

export enum Direction {
  // 1 2 3
  // 8   4
  // 7 6 5

  topLeft,
  top,
  topRight,
  right,
  bottomRight,
  bottom,
  bottomLeft,
  left,
}

/**
 * Iterative binary search
 * @param array - Sorted array of elements
 * @param target - Element to find
 * @returns Index of element if found, null otherwise
 * @example
 * Example usage:
 * ```ts
 * const array = [5, 2, 9, 1, 7].sort(); // [1, 2, 5, 7, 9]
 * const target = 2;
 * const index = binarySearch(arr, x); // 1
 * const element = arr[index];
 * ```
 * @example
 * Example without element
 * ```ts
 * const array = [1, 2, 3, 4, 5]
 * const target = 6;
 * const index = binarySearch(arr, x); // null
 * ```
 */
export const binarySearch = function (array: any[], target: any): any {
  let start = 0,
    end = array.length - 1;

  while (start <= end) {
    // Find the mid index
    let mid = Math.floor((start + end) / 2);
    // If element is present at mid return index
    if (array[mid] === target) return mid;
    // Split the array
    else if (array[mid] < target) start = mid + 1;
    else end = mid - 1;
  }
  return null; // no element found
};

const numberRegex = /-*\d+(\.\d+)?/; // matches any number(ints, floats, and negatives)          -3.14
const numberRegexGlobal = /-*\d+(\.\d+)?/g; // matches any number(ints, floats, and negatives)
const positiveNumberRegex = /\d+(\.\d+)?/; // matches any positive number(ints and floats)        3.14
const positiveNumberRegexGlobal = /\d+(\.\d+)?/g; // matches any positive number(ints and floats)
const integerRegex = /-*\d+/; // matches any integer(ints and negatives)                         -3, 14
const integerRegexGlobal = /-*\d+/g; // matches any integer(ints and negatives)
const positiveIntegerRegex = /\d+/; // matches any positive integer(ints)                        3, 14
const positiveIntegerRegexGlobal = /\d+/g; // matches any positive integer(ints)

/**
 * Returns all numbers in a string
 * @param String - String to search
 * @param {getNumbersOptions} [options={negatives:true, floats:true}] - Options
 * @param {boolean} [options.negatives=true]- Whether to include negative numbers
 * @param {boolean} [options.floats=true] - Whether to include floats
 * @returns Array of numbers
 * @description Options do not cause the regex to excluse floats, or negatives, they just ignore the - or . in the number so -3.14 would be 3.14 or 3, 14 not just 3
 * If you want 3.14 to just be 3, just use Math.floor() on the result. To exclude floats fully you can do result.filter(Number.isInteger)
 * If you want to exclude negatives fully you can do result.filter((num) => num >= 0)
 * @example
 * Example usage:
 * ```ts
 * const string = "7pqr3.14sty-9x"
 * const numbers = getNumbers(string); // [7, 3.14, -9]
 * ```
 * @example
 * Only positive integers
 * ```ts
 * const string = "7pqr3.14sty-9x"
 * const numbers = getNumbers(string, { negatives: false, floats: false }); // [7, 3, 9]
 * ```
 * @example
 * Only positive numbers
 * ```ts
 * const string = "7pqr3.14sty-9x"
 * const numbers = getNumbers(string, { negatives: false }); // [7, 3.14, 9]
 * ```
 * @example
 * Only integers
 * ```ts
 * const string = "7pqr3.14sty-9x"
 * const numbers = getNumbers(string, { floats: false }); // [7, 3, 14, -9]
 * ```
 */
const getNumbers = (String: string, options?: getNumbersOptions): number[] => {
  let regex;
  if (options?.negatives ?? true) {
    regex = options?.floats ?? true ? numberRegexGlobal : integerRegexGlobal;
  } else {
    regex = options?.floats ?? true ? positiveNumberRegexGlobal : positiveIntegerRegexGlobal;
  }
  const matches = String.match(regex);
  if (matches) {
    return matches.map((match) => parseFloat(match));
  }
  return [];
};

interface getNumbersOptions {
  negatives?: boolean;
  floats?: boolean;
}

// console.log(getNumbers("7pqr3.14sty-9x"));

export const gcd = (a, b) => a ? gcd(b % a, a) : b;
export const lcm = (a, b) => a * b / gcd(a, b);