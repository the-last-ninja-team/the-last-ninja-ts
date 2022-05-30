import type { Level } from '@src/modules/core';
import type { AssetsStore } from '@src/modules/resources';
import type { Mob } from '@src/modules/unit';

import { GraphicsStore } from '../GraphicsStore';
import { LayerIndexes } from '../interfaces';

import { BackgroundLayer } from './BackgroundLayer';
import { BehindLayerGraphicItem } from './BehindLayerGraphicItem';
import { FrontLayerGraphicItem } from './FrontLayerGraphicItem';

export class DrawLevelTileset {
  private readonly level: Level;

  private readonly assetsStore: AssetsStore;

  private readonly mob: Mob;

  constructor(level: Level, assetsStore: AssetsStore, mob: Mob) {
    this.level = level;
    this.assetsStore = assetsStore;
    this.mob = mob;

    return this;
  }

  use(store: GraphicsStore) {
    store
      .addItem(new BackgroundLayer(store.env).resolve(this.level, this.assetsStore, this.mob), LayerIndexes.Background)
      .addItem(new BehindLayerGraphicItem(store.env).resolve(this.level, this.assetsStore), LayerIndexes.Behind)
      .addItem(new FrontLayerGraphicItem(store.env).resolve(this.level, this.assetsStore), LayerIndexes.Front);
  }
}
