import { MAX_VELOCITY } from '@src/constants';

import { SimpleObject } from './SimpleObject';
import type { MovingObjectProps } from './interfaces';

export class MovingObject extends SimpleObject {
  readonly velocityMax: number;

  jumping: boolean;

  velocityX: number;

  velocityY: number;

  constructor({ x, y, width, height, velocityMax = MAX_VELOCITY }: MovingObjectProps) {
    super(x, y, width, height);

    this.jumping = false;
    this.velocityMax = velocityMax;
    this.velocityX = 0;
    this.velocityY = 0;
  }
}
