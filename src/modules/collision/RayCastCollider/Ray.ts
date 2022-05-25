import type { Point } from '@src/interfaces';
import { Line } from '@src/modules/graphics/shapes';

import type { RayDirection } from './interfaces';

export class Ray extends Line {
  readonly direction: RayDirection;

  constructor(start: Point, end: Point, direction: RayDirection) {
    super(start, end);

    this.direction = direction;
  }
}
