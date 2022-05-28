import type { Display, Level } from '@src/modules/core';
import type { AssetsStore } from '@src/modules/resources';

export interface StaticGraphicsResolverProps {
  level: Level;
  display: Display;
  assetsStore: AssetsStore;
}
