import type { Level, Display } from '@src/modules/core';
import type { AssetsStore } from '@src/modules/resources';

import { GraphicsStore } from '../GraphicsStore';
import { LayerIndexes } from '../interfaces';

import { BackgroundLayer } from './BackgroundLayer';
import { BehindLayerGraphicItem } from './BehindLayerGraphicItem';
import { FrontLayerGraphicItem } from './FrontLayerGraphicItem';

export class DrawLevelTileset {
  private readonly level: Level;

  private readonly assetsStore: AssetsStore;

  private readonly display: Display;

  constructor(level: Level, assetsStore: AssetsStore, display: Display) {
    this.level = level;
    this.assetsStore = assetsStore;
    this.display = display;

    return this;
  }

  use(store: GraphicsStore) {
    store
      .addItem(new BackgroundLayer(this.level, this.display, this.assetsStore), LayerIndexes.Background)
      .addItem(new BehindLayerGraphicItem(this.level, this.display, this.assetsStore), LayerIndexes.Behind)
      .addItem(new FrontLayerGraphicItem(this.level, this.display, this.assetsStore), LayerIndexes.Front);
  }
}
