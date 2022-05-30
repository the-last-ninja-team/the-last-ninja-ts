import type { Image, Undef } from '@src/interfaces';

import { DynamicImageAnimation, DynamicImageDirection } from '../../../animation';
import type { DynamicImageType } from '../../interfaces';
import { DynamicGraphicsResolver } from '../DynamicGraphicsResolver';

export class DynamicTypeResolver extends DynamicGraphicsResolver {
  private speed = 0;

  private direction: DynamicImageDirection = DynamicImageDirection.Forward;

  private dynamicImageAnimation: Undef<DynamicImageAnimation>;

  resolve(image: Image, { y = 0, direction, speed }: DynamicImageType) {
    this.speed = speed;
    this.direction = direction;

    const { area } = this.level;

    const asset = this.assetsStore.get(image.name);
    this.dynamicImageAnimation = new DynamicImageAnimation(asset, area.width, image.width, y);

    return this.dynamicImageAnimation.images;
  }

  update() {
    this.dynamicImageAnimation?.update(this.direction, this.speed);
  }
}
