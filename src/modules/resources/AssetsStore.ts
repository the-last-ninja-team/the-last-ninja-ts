import type { AssetElement } from '@src/interfaces';

import type { AssetItem, LoadedAsset } from './interfaces';

export class AssetsStore {
  private readonly assets: AssetItem;

  constructor(assets: LoadedAsset[]) {
    this.assets = assets.reduce<AssetItem>((acc, { asset, image }) => {
      acc[asset.name] = image;
      return acc;
    }, {});
  }

  get(name: string) {
    return this.assets[name];
  }

  add(name: string, asset: AssetElement) {
    if (this.assets[name]) {
      throw new Error(`Image ${name} is already declared`);
    }

    this.assets[name] = asset;
  }
}
