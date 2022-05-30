import type { AssetElement, Point, Camera } from '@src/interfaces';
import type { Display, CanvasRender2D } from '@src/modules/core';

export enum LayerIndexes {
  Background = -200,
  Behind = -100,
  Enemy = -10,
  Player = 0,
  Arrow = 10,
  Fireball = 20,
  Front = 100,
  Foreground = 200,
}

export type GraphicAssetWithPoint = Point & {
  image: AssetElement;
};

export type GraphicItemAsset = {
  zIndex?: number;
  asset: GraphicAssetWithPoint | AssetElement;
};

export type GraphicsStoreEnvironment = {
  canvasRender: CanvasRender2D;
  display: Display;
  camera: Camera;
};

export abstract class GraphicItem {
  readonly assets: GraphicItemAsset[] = [];

  protected readonly env: GraphicsStoreEnvironment;

  constructor(env: GraphicsStoreEnvironment) {
    this.env = env;
  }

  protected add(...asset: GraphicItemAsset[]) {
    this.assets.push(...asset);
  }

  abstract resolve(...args: unknown[]): GraphicItem;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  update(time: number) {}
}

export type RenderCallback = (canvasRender: CanvasRender2D) => void;

export type GraphicItemDefinition = {
  zIndex: number;
  item?: GraphicItem;
  render?: RenderCallback;
};
