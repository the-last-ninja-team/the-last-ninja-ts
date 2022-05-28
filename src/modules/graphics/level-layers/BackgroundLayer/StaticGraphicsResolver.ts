import type { AssetElement } from '@src/interfaces';
import type { Display, Level } from '@src/modules/core';
import type { AssetsStore } from '@src/modules/resources';

import type { LevelLayersGraphic } from '../interfaces';

import type { StaticGraphicsResolverProps } from './interfaces';

export abstract class StaticGraphicsResolver {
  protected readonly level: Level;

  protected readonly display: Display;

  protected readonly assetsStore: AssetsStore;

  constructor({ level, display, assetsStore }: StaticGraphicsResolverProps) {
    this.level = level;
    this.display = display;
    this.assetsStore = assetsStore;
  }

  abstract resolve(levelLayers: LevelLayersGraphic[]): AssetElement;
}
