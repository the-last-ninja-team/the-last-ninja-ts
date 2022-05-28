import type { Measurement } from '@src/interfaces/shapes';

export type Asset = {
  name: string;
  src: string;
};

export type Image = Asset & Measurement;

export type Tileset = Image & {
  spriteWidth: number;
  spriteHeight: number;
};

export type AssetElement = HTMLImageElement | HTMLCanvasElement;
