/* eslint-disable no-param-reassign */

import type { Undef } from '@src/interfaces';
import type { Mob } from '@src/modules/unit';
import type { Collider } from '@src/modules/collision';
import { CROUCHING_FRICTION_COEFFICIENT } from '@src/constants';

import type { EnvironmentProps } from './interfaces';

export class Environment {
  private readonly friction: number;

  private readonly gravity: number;

  private mobs: Mob[] = [];

  private collider: Undef<Collider>;

  constructor({ friction, gravity }: EnvironmentProps) {
    this.friction = friction;
    this.gravity = gravity;
  }

  use(collider: Collider) {
    this.collider = collider;
  }

  add(...mobs: Mob[]) {
    this.mobs = this.mobs.concat(mobs);
  }

  remove(...mobs: Mob[]) {
    this.mobs = this.mobs.filter((mob) => mobs.find((item) => item === mob));
  }

  private applyPhysicalLaws = (mob: Mob) => {
    mob.velocityY += this.gravity;
    mob.velocityX *= this.friction + (mob.isCrouching() ? CROUCHING_FRICTION_COEFFICIENT : 0);
    if (mob.velocityX * Math.sign(mob.velocityX) < 0.01) {
      mob.velocityX = 0;
    }

    /* Made it so that velocity cannot exceed velocity_max */
    if (Math.abs(mob.velocityX) > mob.velocityMax) {
      mob.velocityX = mob.velocityMax * Math.sign(mob.velocityX);
    }

    if (Math.abs(mob.velocityY) > mob.velocityMax) {
      mob.velocityY = mob.velocityMax * Math.sign(mob.velocityY);
    }
  };

  update() {
    this.mobs.forEach((mob) => {
      mob.oldX = mob.x;
      mob.oldY = mob.y;

      this.applyPhysicalLaws(mob);

      const newPoint = this.collider?.collide(mob) ?? { x: mob.x, y: mob.y };

      mob.x = Math.round(newPoint.x);
      mob.y = Math.round(newPoint.y);

      this.collider?.postActions(mob);
    });
  }
}
