import type { Tileset, AnimationMap } from '@src/interfaces';

import { SpriteSheet } from './SpriteSheet';

export class TilesetCollection extends SpriteSheet {
  private readonly map: AnimationMap;

  constructor(tileset: Tileset, map: AnimationMap) {
    super(tileset);

    this.map = map;
  }

  getAnimationFramesById(id: string) {
    const indexes = this.map.layers.find((layer) => layer.name === id)?.data.filter((index) => index > 0) ?? [];
    if (indexes.length === 0) {
      return null;
    }

    return this.getAnimationFrames(id, indexes);
  }
}
