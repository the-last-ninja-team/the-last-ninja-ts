import type { AssetElement, Point } from '@src/interfaces';

import type { CanvasRender2D } from './CanvasRender2D';

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

export abstract class GraphicItem {
  readonly assets: GraphicItemAsset[] = [];

  protected add(...asset: GraphicItemAsset[]) {
    this.assets.push(...asset);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  update(time: number) {}
}

export type RenderCallback = (canvasRender: CanvasRender2D) => void;

export type GraphicItemDefinition = {
  zIndex: number;
  item?: GraphicItem;
  render?: RenderCallback;
};
