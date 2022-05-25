import type { Vector } from '@src/math';

export type CollisionPoint = {
  isColliding: boolean;
  point: Vector;
};

export type CollisionPoints = {
  isColliding: boolean;
  points: CollisionPoint[];
};
