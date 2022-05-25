import type { Measurement } from '@src/interfaces/shapes';

export type Asset = {
  name: string;
  src: string;
};

export type Image = Asset &
  Measurement & {
    name: string;
  };

export type Tile = Image & {
  spriteWidth: number;
  spriteHeight: number;
};

export type AssetElement = HTMLImageElement | HTMLCanvasElement;
