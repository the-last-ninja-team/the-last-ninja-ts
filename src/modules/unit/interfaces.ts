import type { Measurement, Rect } from '@src/interfaces';

export interface MovingObjectProps extends Rect {
  velocityMax?: number;
}

export type Hitbox = Measurement;

export interface MobProps extends MovingObjectProps {
  jumpPower?: number;
  speed?: number;
  hitbox: Hitbox;
  hitboxCrouch: Hitbox;
}
