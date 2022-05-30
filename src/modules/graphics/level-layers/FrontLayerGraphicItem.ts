import { LayerName, LayerType } from '@src/interfaces';
import type { Level } from '@src/modules/core';
import type { AssetsStore } from '@src/modules/resources';

import { GraphicItem } from '../interfaces';

import { drawMapByTileset } from './utils/drawMapByTileset';

export class FrontLayerGraphicItem extends GraphicItem {
  resolve(level: Level, assetsStore: AssetsStore) {
    const { area, map, tileset } = level;

    const drawLevelMap = drawMapByTileset(map, tileset, assetsStore.get(tileset.name));
    const frontLayerLevelImage = this.env.display.createContext(area);
    drawLevelMap(frontLayerLevelImage, ({ name, type }) => type === LayerType.Tile && name === LayerName.Before);

    this.add({ asset: frontLayerLevelImage.canvas });

    return this;
  }
}
