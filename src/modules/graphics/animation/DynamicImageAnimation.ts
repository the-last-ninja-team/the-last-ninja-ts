import type { AssetElement } from '@src/interfaces';

import type { GraphicAssetWithPoint } from '../interfaces';

import { DynamicImageDirection } from './interfaces';

export class DynamicImageAnimation {
  images: GraphicAssetWithPoint[] = [];

  constructor(asset: AssetElement, areaWidth: number, width: number, y: number) {
    const counts = Math.floor(areaWidth / width) + 2;

    let x = 0;
    for (let i = 0; i < counts; i += 1) {
      this.images.push({ image: asset, x, y });
      x += width;
    }
  }

  update(direction: DynamicImageDirection, speed: number) {
    this.images.forEach((image) => {
      // eslint-disable-next-line no-param-reassign
      image.x += direction === DynamicImageDirection.Forward ? -speed : speed;
    });

    const first = this.images[0];
    const last = this.images[this.images.length - 1];
    const others = this.images.filter((_, index) => index > 0 && index < this.images.length - 1);

    if (direction === DynamicImageDirection.Forward && first.x + first.image.width <= 0) {
      first.x = last.x + last.image.width;
      this.images = [...others, last, first];
    } else if (direction === DynamicImageDirection.Backward && first.x >= 0) {
      last.x = -(last.image.width - first.x);
      this.images = [last, first, ...others];
    }
  }
}
