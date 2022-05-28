import type { Asset, Tileset, Image, AssetElement } from '@src/interfaces';

export interface ResourcesList {
  tilesets: Tileset[];
  images: Image[];
}

export type LoadedAsset = {
  asset: Asset;
  image: HTMLImageElement;
};

export type AssetItem = Record<string, AssetElement>;
