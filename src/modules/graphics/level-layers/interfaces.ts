import type { Image } from '@src/interfaces';

export type FillImageType = {
  type: 'fill';
  y?: number;
};

export type ParallaxImageType = {
  type: 'parallax';
};

export enum DynamicImageDirection {
  Forward = 'forward',
  Backward = 'backward',
}

export type DynamicImageType = {
  type: 'dynamic';
  direction: DynamicImageDirection;
  infinite?: boolean;
  speed: number;
  delay: number;
  y?: number;
};

export type LevelLayersGraphic = {
  zIndex?: number;
  image: Image;
  props: FillImageType | ParallaxImageType | DynamicImageType;
};
