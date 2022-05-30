import type { Image } from '@src/interfaces';

import type { DynamicImageDirection } from '../animation';

export type FillImageType = {
  type: 'fill';
  y?: number;
};

export type ParallaxImageType = {
  type: 'parallax';
  speed: number;
  space?: number;
  y?: number;
};

export type DynamicImageType = {
  type: 'dynamic';
  direction: DynamicImageDirection;
  speed: number;
  y?: number;
};

export type LevelLayersGraphic = {
  zIndex?: number;
  image: Image;
  props: FillImageType | ParallaxImageType | DynamicImageType;
};
