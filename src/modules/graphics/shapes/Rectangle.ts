import type { Rect } from '@src/interfaces';
import { Shape } from '@src/interfaces';

export class Rectangle extends Shape implements Rect {
  x: number;

  y: number;

  readonly width: number;

  readonly height: number;

  constructor(x: number, y: number, width: number, height: number) {
    super();

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  setCenterBy(x: number, y: number) {
    this.x = x - Math.round(this.width / 2);
    this.y = y - Math.round(this.height / 2);
  }

  static equals(rect1: Rect, rect2: Rect) {
    return rect1.x === rect2.x && rect1.y === rect2.y && rect1.width === rect2.width && rect1.height === rect2.height;
  }
}
