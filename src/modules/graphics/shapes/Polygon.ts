import type { Point } from '@src/interfaces';
import { Shape } from '@src/interfaces';
import { Vector } from '@src/math';

import { Line } from './Line';

export class Polygon extends Shape implements Point {
  readonly x: number;

  readonly y: number;

  readonly points: Vector[] = [];

  readonly lines: Line[] = [];

  constructor(startX: number, startY: number, polygon: Point[]) {
    super();

    this.x = startX;
    this.y = startY;

    polygon.forEach(({ x, y }, index) => {
      this.points.push(new Vector(startX + x, startY + y));

      let end;
      if (index === polygon.length - 1) {
        end = new Vector(startX, startY);
      } else {
        const next = polygon[index + 1];
        end = new Vector(startX + next.x, startY + next.y);
      }

      this.lines.push(new Line(new Vector(startX + x, startY + y), end));
    });
  }
}
