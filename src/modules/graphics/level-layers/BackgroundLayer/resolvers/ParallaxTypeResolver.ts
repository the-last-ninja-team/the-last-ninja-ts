import type { Image, Camera, Undef } from '@src/interfaces';
import type { Mob } from '@src/modules/unit';

import { DynamicImageAnimation, DynamicImageDirection } from '../../../animation';
import type { ParallaxImageType } from '../../interfaces';
import { DynamicGraphicsResolver } from '../DynamicGraphicsResolver';

import type { ParallaxTypeResolverProps } from './interfaces';

export class ParallaxTypeResolver extends DynamicGraphicsResolver {
  private readonly mob: Mob;

  private readonly maxViewPortalX: number;

  private readonly camera: Camera;

  private dynamicImageAnimation: Undef<DynamicImageAnimation>;

  private speed = 0;

  constructor({ mob, camera, assetsStore, display, level }: ParallaxTypeResolverProps) {
    super({ assetsStore, display, level });

    this.mob = mob;
    this.camera = camera;

    const { area, screenArea, cameraArea } = this.level;
    this.maxViewPortalX = area.width - screenArea.width + cameraArea.x + cameraArea.width;
  }

  resolve(image: Image, { space = 0, y = 0, speed = 0 }: ParallaxImageType) {
    this.speed = speed;

    const { area } = this.level;

    const asset = this.assetsStore.get(image.name);
    this.dynamicImageAnimation = new DynamicImageAnimation(asset, area.width, image.width + space, y);

    return this.dynamicImageAnimation.images;
  }

  update() {
    const { cameraArea, screenArea, area } = this.level;

    const x1 = cameraArea.x + Math.round(this.camera.getX()) + 0.5;
    const x2 = cameraArea.x + Math.round(this.camera.getX()) + cameraArea.width - 0.5;
    const roundedVelocityX = Math.trunc(Math.abs(this.mob.velocityX));

    if (
      (this.mob.x > x1 && this.mob.x + this.mob.width < x2) ||
      this.mob.x < cameraArea.x ||
      area.width === screenArea.width ||
      this.maxViewPortalX < this.mob.x + this.mob.width ||
      roundedVelocityX === 0
    ) {
      return;
    }

    this.dynamicImageAnimation?.update(
      this.mob.getDirectionX() < 0 ? DynamicImageDirection.Backward : DynamicImageDirection.Forward,
      this.speed,
    );
  }
}
