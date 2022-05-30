import type { LevelMap, Maybe } from '@src/interfaces';
import { Level } from '@src/modules/core';
import { ResourceFactory } from '@src/modules/resources';
import type { LevelLayersGraphic } from '@src/modules/graphics';
import { DynamicImageDirection } from '@src/modules/graphics/animation';

const levelO1Json = require('@src/assets/maps/level-maps/level01.json');

const skyImage = ResourceFactory.getImage('level01-sky');
const cloudsImage = ResourceFactory.getImage('level01-clouds');
const farGroundsImage = ResourceFactory.getImage('level01-far-grounds');

export class Level01 extends Level {
  constructor() {
    super({ key: 'level01', map: levelO1Json as LevelMap, tileset: ResourceFactory.getTileset('level01-tileset') });
  }

  getLevelLayerGraphics = (): Maybe<LevelLayersGraphic[]> => [
    {
      image: skyImage,
      props: { type: 'fill' },
    },
    {
      image: ResourceFactory.getImage('level01-sea'),
      props: { type: 'fill', y: skyImage.height },
    },
    {
      zIndex: 10,
      image: cloudsImage,
      props: {
        type: 'dynamic',
        direction: DynamicImageDirection.Forward,
        speed: 1,
        y: skyImage.height - cloudsImage.height,
      },
    },
    {
      zIndex: 20,
      image: farGroundsImage,
      props: {
        type: 'parallax',
        speed: 0.35,
        space: this.screenArea.width,
        y: this.area.height - farGroundsImage.height,
      },
    },
  ];
}
