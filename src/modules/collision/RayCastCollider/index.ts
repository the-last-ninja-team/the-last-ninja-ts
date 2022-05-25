/* eslint-disable no-param-reassign */

import type { Maybe, Point, Shape } from '@src/interfaces';
import { Vector } from '@src/math';
import { Mob } from '@src/modules/unit';
import { Polygon, Rectangle } from '@src/modules/graphics/shapes';

import { Collider } from '../Collider';
import { CollisionDetected } from '../CollisionDetected';

import { Ray } from './Ray';
import { OUT_OFF_Y_AXIOS_OFFSET, RAY_OFFSET_X, RAY_OFFSET_Y } from './constants';
import { ClosestShape, RayDirection } from './interfaces';
import type { ShapeCollisionPoints } from './interfaces';

/** Попытка просчитать коллизии с помощью "лучей" */
export class RayCastCollider extends Collider {
  /** Инициализируем базовые "лучи", длина которых ограничивается картой уровня  */
  private getBaseRays(mob: Mob) {
    return [
      // Верхний-левый угол влево
      new Ray(
        new Vector(mob.x + RAY_OFFSET_X, mob.y + RAY_OFFSET_Y),
        new Vector(0, mob.y + RAY_OFFSET_Y),
        RayDirection.Left,
      ),
      // Нижний-левый угол влево
      new Ray(
        new Vector(mob.x + RAY_OFFSET_X, mob.getBottom() - RAY_OFFSET_Y),
        new Vector(0, mob.getBottom() - RAY_OFFSET_Y),
        RayDirection.Left,
      ),
      // Верхний-правый угол вправо
      new Ray(
        new Vector(mob.getRight() - RAY_OFFSET_X, mob.y + RAY_OFFSET_Y),
        new Vector(this.area.width, mob.y + RAY_OFFSET_Y),
        RayDirection.Right,
      ),
      // Нижний-правый угол вправо
      new Ray(
        new Vector(mob.getRight() - RAY_OFFSET_X, mob.getBottom() - RAY_OFFSET_Y),
        new Vector(this.area.width, mob.getBottom() - RAY_OFFSET_Y),
        RayDirection.Right,
      ),
      // Верхний-левый угол вверх
      new Ray(
        new Vector(mob.x + RAY_OFFSET_X, mob.y + RAY_OFFSET_Y),
        new Vector(mob.x + RAY_OFFSET_X, -OUT_OFF_Y_AXIOS_OFFSET),
        RayDirection.Top,
      ),
      // Верхний-правый угол вверх
      new Ray(
        new Vector(mob.getRight() - RAY_OFFSET_X, mob.y + RAY_OFFSET_Y),
        new Vector(mob.getRight() - RAY_OFFSET_X, -OUT_OFF_Y_AXIOS_OFFSET),
        RayDirection.Top,
      ),
      // Нижний-левый угол вниз
      new Ray(
        new Vector(mob.x + RAY_OFFSET_X, mob.getBottom() - RAY_OFFSET_Y),
        new Vector(mob.x + RAY_OFFSET_X, this.area.height + OUT_OFF_Y_AXIOS_OFFSET),
        RayDirection.Bottom,
      ),
      // Нижний-правый угол вниз
      new Ray(
        new Vector(mob.getRight() - RAY_OFFSET_X, mob.getBottom() - RAY_OFFSET_Y),
        new Vector(mob.getRight() - RAY_OFFSET_X, this.area.height + OUT_OFF_Y_AXIOS_OFFSET),
        RayDirection.Bottom,
      ),
    ];
  }

  /** Проверяем, происходит ли пересечении прямоугольника с "лучом" */
  private checkObjectCollisionWithRay = (shape: Shape, ray: Ray) => {
    if (shape instanceof Rectangle) {
      return CollisionDetected.isLineRect(ray, shape);
    }

    if (shape instanceof Polygon) {
      return CollisionDetected.isLinePolygon(ray, shape);
    }

    return null;
  };

  /** Вычисляем ближайший хитбокс к лучу в зависимости от его направления */
  private getClosestShape = (shapes: ShapeCollisionPoints[], ray: Ray): Maybe<ClosestShape> => {
    if (!shapes.length) {
      // Если массив пустой, то возвращаем null
      return null;
    }

    let closestDistance = 0;
    let closestShape: Maybe<Shape> = null;
    let closestShapePoint: Maybe<Point> = null;

    shapes.forEach(({ shape, points }) => {
      points
        .filter(({ isColliding }) => isColliding)
        .forEach(({ point }) => {
          const distance = point.distanceFrom(ray.start);
          if (distance < closestDistance || closestDistance === 0) {
            closestDistance = distance;
            closestShape = shape;
            closestShapePoint = point;
          }
        });
    });

    if (!closestShape || !closestShapePoint) {
      return null;
    }

    return {
      shape: closestShape,
      point: closestShapePoint,
    };
  };

  private getNormalizedRays(mob: Mob) {
    const rays = this.getBaseRays(mob);

    rays.forEach((ray) => {
      const shapesWithCollision = this.collisions.reduce<ShapeCollisionPoints[]>((acc, shape) => {
        const collision = this.checkObjectCollisionWithRay(shape, ray);
        if (collision?.isColliding) {
          acc.push({ points: collision.points, shape });
        }

        return acc;
      }, []);

      const closestShape = this.getClosestShape(shapesWithCollision, ray);
      if (closestShape) {
        const { point, shape } = closestShape;

        // Относительно ближайшего хитбокса, корректируем длину луча
        if (shape instanceof Polygon) {
          ray.end.x = shape.x;
          ray.end.y = shape.y;
        }

        if (shape instanceof Rectangle) {
          switch (ray.direction) {
            case RayDirection.Right:
              ray.end.x = shape.x;
              break;
            case RayDirection.Left:
              ray.end.x = shape.x + shape.width;
              break;
            case RayDirection.Top:
              ray.end.y = shape.y + shape.height;
              break;
            case RayDirection.Bottom:
              ray.end.y = shape.y;
              break;
            case RayDirection.BottomRight:
            case RayDirection.BottomLeft:
            case RayDirection.TopRight:
            case RayDirection.TopLeft:
              ray.end.x = point.x;
              ray.end.y = point.y;
              break;
            default:
              break;
          }
        }
      }
    });

    // Отфильтровываем лучи, где точка начала больше точки окончания (значит такой луч строился внутри самой коллизии)
    return rays.filter((ray) => {
      const { start, end, direction } = ray;

      switch (direction) {
        case RayDirection.Right:
          return start.x <= end.x;
        case RayDirection.Left:
          return start.x >= end.x;
        case RayDirection.Top:
          return start.y >= end.y;
        case RayDirection.Bottom:
          return start.y <= end.y;
        default:
          return true;
      }
    });
  }

  /**
   * Читаем список "лучей" с длиной относительно положения объекта и хитбоксов вокруг него.
   * Внимание! Пока класс умеет работать с прямоугольниками
   * */
  collide(mob: Mob) {
    super.collide(mob);
    const rays = this.getNormalizedRays(mob);

    let newX = mob.x + mob.velocityX;
    let newY = mob.y + mob.velocityY;

    rays.forEach((ray) => {
      const { end } = ray;

      // В зависимости от направления луча, и положения игрока, корректируем координаты последнего
      switch (ray.direction) {
        case RayDirection.Top:
          if (newY <= end.y) {
            newY = end.y;
            mob.velocityY = 0;
          }
          break;
        case RayDirection.Bottom:
          if (newY + mob.height >= end.y) {
            newY = end.y - mob.height;
            mob.velocityY = 0;
            mob.jumping = false;
          }
          break;
        case RayDirection.Left:
          if (newX <= end.x) {
            newX = end.x;
            mob.velocityX = 0;
          }
          break;
        case RayDirection.Right:
          if (newX + mob.width >= end.x) {
            newX = end.x - mob.width;
            mob.velocityX = 0;
          }
          break;
        default:
          break;
      }
    });

    return {
      x: newX,
      y: newY,
    };
  }
}
