import type { Asset, Tile, Image, AssetElement } from '@src/interfaces';

export interface ResourcesList {
  tiles: Tile[];
  images: Image[];
}

export type LoadedAsset = {
  asset: Asset;
  image: HTMLImageElement;
};

export type AssetItem = Record<string, AssetElement>;
