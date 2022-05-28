import { LayerName, LayerType } from '@src/interfaces';
import type { Level, Display } from '@src/modules/core';
import type { AssetsStore } from '@src/modules/resources';

import { GraphicItem } from '../interfaces';

import { drawMapByTileset } from './utils/drawMapByTileset';

export class BehindLayerGraphicItem extends GraphicItem {
  constructor(level: Level, display: Display, assetsStore: AssetsStore) {
    super();

    const { area, map, tileset } = level;

    const drawLevelMap = drawMapByTileset(map, tileset, assetsStore.get(tileset.name));
    const mainLayerLevelImage = display.createContext(area);
    drawLevelMap(mainLayerLevelImage, ({ name, type }) => type === LayerType.Tile && name !== LayerName.Before);

    this.add({ asset: mainLayerLevelImage.canvas });

    return this;
  }
}
