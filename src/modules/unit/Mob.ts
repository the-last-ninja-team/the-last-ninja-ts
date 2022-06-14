import { DEFAULT_MOB_JUMP_POWER, DEFAULT_MOB_SPEED } from '@src/constants';
import { MovingObject } from '@src/modules/unit';

import type { MobProps, Hitbox } from './interfaces';

export class Mob extends MovingObject {
  private hitbox: Hitbox;

  private readonly originHitbox: Hitbox;

  private readonly hitboxCrouch: Hitbox;

  private idling: boolean;

  private directionX: number;

  protected crouching: boolean;

  readonly jumpPower: number;

  readonly originX: number;

  readonly originY: number;

  readonly speed: number;

  constructor({
    x,
    y,
    width,
    height,
    velocityMax,
    jumpPower = DEFAULT_MOB_JUMP_POWER,
    speed = DEFAULT_MOB_SPEED,
    hitbox,
    hitboxCrouch,
  }: MobProps) {
    super({ x, y, width, height, velocityMax });

    this.hitbox = hitbox;
    this.hitboxCrouch = hitboxCrouch;
    this.originHitbox = { ...hitbox };

    this.originX = x;
    this.originY = y;

    this.jumpPower = jumpPower;
    this.speed = speed;
    this.directionX = 1;
    this.jumping = true;
    this.crouching = false;
    this.idling = false;
  }

  getDirectionX() {
    return this.directionX;
  }

  private setHitbox(hitbox: Hitbox) {
    const { width, height } = hitbox;
    if (this.hitbox.width === width && this.hitbox.height === height) {
      return;
    }
    this.hitbox = hitbox;
    this.y = this.getBottom() - height;
    this.height = height;

    this.oldY = this.y;
  }

  jump() {
    if (!this.jumping && this.velocityY < 10) {
      this.crouching = false;
      this.setHitbox(this.originHitbox);
      this.jumping = true;
      this.velocityY -= this.jumpPower;
    }
  }

  moveLeft() {
    this.crouching = false;
    this.setHitbox(this.originHitbox);
    this.directionX = -1;
    this.velocityX -= this.speed;
  }

  moveRight() {
    this.crouching = false;
    this.setHitbox(this.originHitbox);
    this.directionX = 1;
    this.velocityX += this.speed;
  }

  crouch(crouching: boolean) {
    if (!this.jumping && this.velocityY === 0) {
      this.crouching = crouching;
      if (!this.crouching) {
        this.setHitbox(this.originHitbox);
      } else {
        this.setHitbox(this.hitboxCrouch);
      }
    }
  }

  isCrouching() {
    return this.crouching;
  }
}
