import type { Point, Shape } from '@src/interfaces';

import type { CollisionPoint } from '../interfaces';

export enum RayDirection {
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right',
  TopLeft = 'topLeft',
  TopRight = 'topRight',
  BottomLeft = 'bottomLeft',
  BottomRight = 'bottomRight',
}

export type ShapeCollisionPoints = {
  shape: Shape;
  points: CollisionPoint[];
};

export type ClosestShape = {
  shape: Shape;
  point: Point;
};
