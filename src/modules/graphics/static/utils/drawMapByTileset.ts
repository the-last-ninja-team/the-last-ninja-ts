import type { Tile, AssetElement } from '@src/interfaces';
import type { LevelMap, Layer } from '@src/modules/core';
import { SpriteSheet } from '@src/modules/graphics/objects';

export const drawMapByTileset =
  (map: LevelMap, tile: Tile, image: AssetElement) =>
  (context: CanvasRenderingContext2D, filter?: (layer: Layer) => boolean) => {
    const spriteSheet = new SpriteSheet(tile);
    const { tilewidth, tileheight } = map;

    map.layers
      .filter((layer) => filter?.(layer) ?? true)
      .forEach((layer) => {
        let row = 0;
        let col = 0;

        layer.data?.forEach((index) => {
          if (index) {
            context.drawImage(
              image,
              spriteSheet.getSourceX(index),
              spriteSheet.getSourceY(index),
              tilewidth,
              tileheight,
              col * tilewidth,
              row * tileheight,
              tilewidth,
              tileheight,
            );
          }

          col += 1;

          if (col > map.width - 1) {
            col = 0;
            row += 1;
          }
        });
      });
  };
