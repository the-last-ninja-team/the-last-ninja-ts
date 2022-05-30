import type { Rect, Undef, Point } from '@src/interfaces';

export type CameraProps = {
  cameraArea: Rect;
  screenArea: Rect;
  levelArea: Rect;
};

export abstract class Camera {
  protected x = 0;

  protected y = 0;

  protected object: Undef<Rect>;

  watch(object: Rect) {
    this.object = object;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getDestination({ x = 0, y = 0 }: Partial<Point>): Point {
    return {
      x: Math.round(x) - this.x,
      y: Math.round(y) - this.y,
    };
  }

  abstract update(): void;

  abstract use(params?: CameraProps): void;
}
