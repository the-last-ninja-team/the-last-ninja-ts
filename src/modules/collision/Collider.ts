/* eslint-disable no-param-reassign */

import type { Point, Rect, Shape } from '@src/interfaces';
import type { Mob } from '@src/modules/unit';

export class Collider {
  protected readonly area: Rect;

  protected readonly collisions: Shape[];

  constructor(area: Rect, collisions: Shape[]) {
    this.area = area;
    this.collisions = collisions;
  }

  collide(mob: Mob): Point {
    if (mob.getLeft() < 0) {
      mob.setLeft(0);
      mob.velocityX = 0;
    } else if (mob.getRight() > this.area.width) {
      mob.setRight(this.area.width);
      mob.velocityX = 0;
    }

    // Пока не ограничиваем выход за границы по Y оси
    // if (mob.getTop() < 0) {
    //   mob.setTop(0)
    //   mob.velocityY = 0
    // } else if (mob.getBottom() > this.area.height) {
    //   mob.setBottom(this.area.height)
    //   mob.velocityY = 0
    //   mob.jumping = false
    // }

    return {
      x: mob.x + mob.velocityX,
      y: mob.y + mob.velocityY,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  postActions(mob: Mob) {}
}
