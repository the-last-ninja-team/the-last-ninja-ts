import { Level, LevelMap } from '@src/modules/core';
import { ResourceFactory } from '@src/modules/resources';

const levelO1Json = require('@src/assets/maps/level-maps/level01.json');

const LEVEL_TILES = ResourceFactory.getTile('level01-tileset');

export class Level01 extends Level {
  constructor() {
    super({ key: 'level01', map: levelO1Json as LevelMap, tile: LEVEL_TILES });
  }
}
