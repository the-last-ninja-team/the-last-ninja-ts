import type { Image } from '@src/interfaces';
import type { Display, Level } from '@src/modules/core';
import type { AssetsStore } from '@src/modules/resources';

import type { GraphicAssetWithPoint } from '../../interfaces';

import type { StaticGraphicsResolverProps } from './interfaces';

export abstract class DynamicGraphicsResolver {
  protected readonly level: Level;

  protected readonly display: Display;

  protected readonly assetsStore: AssetsStore;

  constructor({ level, display, assetsStore }: StaticGraphicsResolverProps) {
    this.level = level;
    this.display = display;
    this.assetsStore = assetsStore;
  }

  abstract resolve(image: Image, ...args: unknown[]): GraphicAssetWithPoint | GraphicAssetWithPoint[];

  abstract update(time: number): void;
}
