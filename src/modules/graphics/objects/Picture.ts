import type { Rect } from '@src/interfaces';

import { PictureProps } from './interfaces';

export class Picture implements Rect {
  readonly name: string;

  readonly width: number;

  readonly height: number;

  x: number;

  y: number;

  flipped = false;

  constructor({ name, x = 0, y = 0, width, height }: PictureProps) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  setCoordinates(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
