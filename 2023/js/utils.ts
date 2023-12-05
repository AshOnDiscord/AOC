class Point {
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

enum Direction {
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

class Grid {
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
