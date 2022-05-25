import type { Asset } from '@src/interfaces';

import type { LoadedAsset } from './interfaces';

export class AssetsLoader {
  private readonly assets: Asset[];

  constructor(assets: Asset[]) {
    this.assets = assets;

    return this;
  }

  private loadImage = (asset: Asset): Promise<LoadedAsset> =>
    new Promise((resolve) => {
      const image = new Image();
      image.src = asset.src;
      image.onload = () => resolve({ asset, image });
    });

  load() {
    return Promise.all(this.assets.map((asset) => this.loadImage(asset)));
  }
}
