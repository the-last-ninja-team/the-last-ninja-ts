import type { Point } from '@src/interfaces';

type VectorBox = Vector | number;

export class Vector implements Point {
  x: number;

  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static zero() {
    return new Vector(0, 0);
  }

  isZero() {
    return this.x === 0 && this.y === 0;
  }

  copy() {
    return new Vector(this.x, this.y);
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }

  length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  equals(v: Vector) {
    return this.x === v.x && this.y === v.y;
  }

  normalize() {
    const length = this.length();
    if (length !== 0) {
      this.divideBy(length);
    }
  }

  addTo(v: VectorBox) {
    if (v instanceof Vector) {
      this.x += v.x;
      this.y += v.y;
    } else {
      this.x += v;
      this.y += v;
    }

    return this;
  }

  add(v: VectorBox) {
    return this.copy().addTo(v);
  }

  subtractFrom(v: VectorBox) {
    if (v instanceof Vector) {
      this.x -= v.x;
      this.y -= v.y;
    } else {
      this.x -= v;
      this.y -= v;
    }

    return this;
  }

  subtract(v: VectorBox) {
    return this.copy().subtractFrom(v);
  }

  divideBy(v: VectorBox) {
    if (v instanceof Vector) {
      this.x /= v.x;
      this.y /= v.y;
    } else {
      this.x /= v;
      this.y /= v;
    }

    return this;
  }

  divide(v: VectorBox) {
    return this.copy().divideBy(v);
  }

  multiplyWith(v: VectorBox) {
    if (v instanceof Vector) {
      this.x *= v.x;
      this.y *= v.y;
    } else {
      this.x *= v;
      this.y *= v;
    }

    return this;
  }

  multiply(v: VectorBox) {
    return this.copy().multiplyWith(v);
  }

  distanceFrom(v: Point) {
    return Math.sqrt((this.x - v.x) ** 2 + (this.y - v.y) ** 2);
  }

  /** linear interpolate the vector to another vector */
  lerp(x: VectorBox, y: number, amt: number): Vector {
    if (x instanceof Vector) {
      return this.lerp(x.x, x.y, y);
    }

    const normalizeAmt = Math.min(amt, 1.0);

    this.x += (x - this.x) * normalizeAmt;
    this.y += (y - this.y) * normalizeAmt;

    return this;
  }
}
