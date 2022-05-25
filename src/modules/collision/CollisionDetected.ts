import { Vector } from '@src/math';
import type { Rect } from '@src/interfaces';
import type { Polygon } from '@src/modules/graphics/shapes';
import { Line } from '@src/modules/graphics/shapes';

import type { CollisionPoint, CollisionPoints } from './interfaces';

export class CollisionDetected {
  static isRectRect(rect1: Rect, rect2: Rect) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }

  static isLineLine(line1: Line, line2: Line): CollisionPoint {
    const {
      start: { x: x1, y: y1 },
      end: { x: x2, y: y2 },
    } = line1;
    const {
      start: { x: x3, y: y3 },
      end: { x: x4, y: y4 },
    } = line2;

    // calculate the direction of the lines
    const uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    const uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

    // if uA and uB are between 0-1, lines are colliding
    return {
      isColliding: uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1,
      point: new Vector(x1 + uA * (x2 - x1), y1 + uA * (y2 - y1)),
    };
  }

  static isLineRect(line: Line, rect: Rect): CollisionPoints {
    const { x, y, width, height } = rect;

    const leftLine = new Line({ x, y }, { x, y: y + height });
    const rightLine = new Line({ x: x + width, y }, { x: x + width, y: y + height });
    const topLine = new Line({ x, y }, { x: x + width, y });
    const bottomLine = new Line({ x, y: y + height }, { x: x + width, y: y + height });

    const left = this.isLineLine(line, leftLine);
    const right = this.isLineLine(line, rightLine);
    const top = this.isLineLine(line, topLine);
    const bottom = this.isLineLine(line, bottomLine);

    return {
      isColliding: left.isColliding || right.isColliding || top.isColliding || bottom.isColliding,
      points: [left, right, top, bottom],
    };
  }

  static isLinePolygon(line: Line, polygon: Polygon): CollisionPoints {
    const { lines } = polygon;
    for (let i = 0; i < lines.length; i += 1) {
      const result = this.isLineLine(line, lines[i]);
      if (result.isColliding) {
        return {
          isColliding: true,
          points: [result],
        };
      }
    }

    return {
      isColliding: false,
      points: [],
    };
  }
}
