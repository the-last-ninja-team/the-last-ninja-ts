import type { Rect, Undef } from '@src/interfaces';

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

  abstract update(): void;

  abstract use(params?: CameraProps): void;
}
