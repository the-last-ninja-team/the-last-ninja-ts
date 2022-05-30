import type { AssetElement, Rect, Camera, Measurement, Point } from '@src/interfaces';

import type { IsNeedToDrawCallback } from './interfaces';

export class CanvasRender2D {
  private readonly context: CanvasRenderingContext2D;

  private readonly camera: Camera;

  private readonly needToDraw: IsNeedToDrawCallback;

  constructor(context: CanvasRenderingContext2D, camera: Camera, needToDraw: IsNeedToDrawCallback) {
    this.context = context;
    this.camera = camera;
    this.needToDraw = needToDraw;
  }

  drawRect(rect: Rect, color: string): boolean {
    const { x, y } = this.camera.getDestination(rect);
    const { width, height } = rect;

    if (!this.needToDraw(x, y, width, height)) {
      return false;
    }

    this.context.fillStyle = color;
    this.context.fillRect(x, y, width, height);

    return true;
  }

  fill(color: string) {
    this.context.fillStyle = color;
    this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

  drawImage(image: AssetElement, rect: Partial<Point> & Measurement): boolean {
    const { x, y } = this.camera.getDestination(rect);
    const { width, height } = rect;

    if (!this.needToDraw(x, y, width, height)) {
      return false;
    }

    this.context.drawImage(image, x, y, width, height);

    return true;
  }
}
