import type { Point } from '@src/interfaces';
import { Shape } from '@src/interfaces';

export class Line extends Shape {
  readonly start: Point;

  readonly end: Point;

  constructor(start: Point, end: Point) {
    super();

    this.start = start;
    this.end = end;
  }
}
