import type { Undef } from '@src/interfaces';
import type { Level } from '@src/modules/core';
import { AssetsStore } from '@src/modules/resources';
import { CanvasRender2D } from '@src/modules/graphics';
import { create2dContext } from '@src/utils';

import { drawMapByTileset } from './utils/drawMapByTileset';
import { LayerType } from './interfaces';
import type { LayersToDraw } from './interfaces';

export class DrawLevelTileset {
  private readonly canvasRender2D: CanvasRender2D;

  private assetsStore: Undef<AssetsStore>;

  private layersToDraw: LayersToDraw = {};

  constructor(canvasRender2D: CanvasRender2D) {
    this.canvasRender2D = canvasRender2D;
  }

  setAssetsStore(assetsStore: AssetsStore) {
    this.assetsStore = assetsStore;
  }

  init(level: Level) {
    this.layersToDraw = {};

    if (!this.assetsStore) {
      throw new Error('Assets store is not valid');
    }

    const { key, map, tile } = level;

    const mapSize = { width: map.width * map.tilewidth, height: map.height * map.tileheight };
    const drawLevelMap = drawMapByTileset(map, tile, this.assetsStore.get(tile.name));

    const mainLayerLevelImage = create2dContext(mapSize);
    drawLevelMap(mainLayerLevelImage, ({ name, type }) => type === 'tilelayer' && name !== 'before-layer');

    this.assetsStore.add(key, mainLayerLevelImage.canvas);
    this.layersToDraw[LayerType.Level] = mainLayerLevelImage.canvas;

    const frontLayerLevelImage = create2dContext(mapSize);
    drawLevelMap(frontLayerLevelImage, ({ name, type }) => type === 'tilelayer' && name === 'before-layer');

    const frontLayerLevelName = `${key}-before-layer`;
    this.assetsStore.add(frontLayerLevelName, frontLayerLevelImage.canvas);
    this.layersToDraw[LayerType.Front] = frontLayerLevelImage.canvas;
  }

  render() {
    Object.values(this.layersToDraw).forEach((image) => {
      this.canvasRender2D.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
    });
  }
}
