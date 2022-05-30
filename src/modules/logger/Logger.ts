import type { Camera, Rect } from '@src/interfaces';
import type { Mob } from '@src/modules/unit';
import type { Ray } from '@src/modules/collision';
import type { Line } from '@src/modules/graphics/shapes';
import type { Level } from '@src/modules/core';
import type { DebugEvent, DebugValueType, DebugInfoEvent } from '@src/components/Debug';
import { COLLIDER_SYMBOL } from '@src/modules/collision';
import { Rectangle } from '@src/modules/graphics/shapes';
import { DEBUG_INFO_EVENT } from '@src/constants';

export class Logger {
  private readonly context: CanvasRenderingContext2D;

  private readonly camera: Camera;

  private debugValue: DebugValueType = {
    isCollide: false,
    isHitBoxes: false,
    isCamera: false,
  };

  constructor(context: CanvasRenderingContext2D, camera: Camera) {
    this.context = context;
    this.camera = camera;
  }

  debug({ type, checked }: DebugEvent) {
    this.debugValue[type] = checked;
  }

  private drawStroke({ width, height, ...point }: Rect, color: string) {
    const { x, y } = this.camera.getDestination(point);

    this.context.strokeStyle = color;
    this.context.lineWidth = 1;
    this.context.strokeRect(x, y, width, height);
  }

  private drawCamera({ x, y, width, height }: Rect, color: string) {
    this.context.strokeStyle = color;
    this.context.lineWidth = 1;
    this.context.strokeRect(x, y, width, height);
  }

  private drawLine({ start, end }: Line, color: string) {
    const { x: destinationP1x, y: destinationP1y } = this.camera.getDestination(start);
    const { x: destinationP2x, y: destinationP2y } = this.camera.getDestination(end);

    this.context.beginPath();
    this.context.moveTo(destinationP1x, destinationP1y);
    this.context.lineTo(destinationP2x, destinationP2y);
    this.context.strokeStyle = color;
    this.context.lineWidth = 1;
    this.context.stroke();
  }

  mob(mob?: Mob) {
    if (!mob) {
      return;
    }

    const mobPositionEvent = new CustomEvent<DebugInfoEvent>(DEBUG_INFO_EVENT, {
      detail: { data: JSON.stringify(mob, undefined, 2) },
    });
    window.dispatchEvent(mobPositionEvent);

    if (this.debugValue.isHitBoxes) {
      this.drawStroke(mob, 'blue');
    }

    if (this.debugValue.isCollide) {
      const collider = Reflect.get(mob, COLLIDER_SYMBOL);
      if (collider) {
        const { rays } = collider;
        rays.forEach((ray: Ray) => {
          this.drawLine(ray, 'yellow');
        });
      }
    }
  }

  level(level?: Level) {
    if (!level) {
      return;
    }

    if (this.debugValue.isCamera) {
      this.drawCamera(level.cameraArea, 'white');
    }

    if (this.debugValue.isHitBoxes) {
      const { collisions } = level;
      collisions.forEach((shape) => {
        if (shape instanceof Rectangle) {
          this.drawStroke(shape, 'red');
        }
      });
    }
  }
}
