import type { Image } from '@src/interfaces';

import type { GraphicAssetWithPoint } from '../../../interfaces';
import type { DynamicImageType } from '../../interfaces';
import { DynamicImageDirection } from '../../interfaces';
import { DynamicGraphicsResolver } from '../DynamicGraphicsResolver';

export class DynamicTypeResolver extends DynamicGraphicsResolver {
  private count = 0;

  private delay = 0;

  private speed = 0;

  private y = 0;

  private direction: DynamicImageDirection = DynamicImageDirection.Forward;

  private dynamicImages: GraphicAssetWithPoint[] = [];

  resolve(image: Image, { delay, y = 0, direction, speed }: DynamicImageType) {
    this.delay = delay;
    this.y = y;
    this.speed = speed;
    this.direction = direction;

    const { area } = this.level;

    const asset = this.assetsStore.get(image.name);
    const counts = Math.floor(area.width / asset.width) + 2;

    let x = 0;
    for (let i = 0; i < counts; i += 1) {
      this.dynamicImages.push({ image: asset, x, y });
      x += image.width;
    }

    return this.dynamicImages;
  }

  private nextFrame() {
    this.dynamicImages.forEach((image) => {
      const x = image.x + (this.direction === DynamicImageDirection.Forward ? -this.speed : this.speed);
      // eslint-disable-next-line no-param-reassign
      image.x = Math.round(x);
    });

    const first = this.dynamicImages[0];
    const last = this.dynamicImages[this.dynamicImages.length - 1];
    const others = this.dynamicImages.filter((_, index) => index > 0 && index < this.dynamicImages.length - 1);

    if (this.direction === DynamicImageDirection.Forward && first.x + first.image.width <= 0) {
      first.x = last.x + last.image.width;
      this.dynamicImages = [...others, last, first];
    } else if (this.direction === DynamicImageDirection.Backward && first.x >= 0) {
      last.x = -(last.image.width - first.x);
      this.dynamicImages = [last, first, ...others];
    }
  }

  update() {
    this.count += 1;

    while (this.count > this.delay) {
      this.count -= this.delay;
      this.nextFrame();
    }
  }
}
