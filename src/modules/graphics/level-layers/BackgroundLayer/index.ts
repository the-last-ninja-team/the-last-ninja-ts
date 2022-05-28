import type { Display, Level } from '@src/modules/core';
import type { AssetsStore } from '@src/modules/resources';

import { GraphicItem } from '../../interfaces';
import type { DynamicImageType, ParallaxImageType } from '../interfaces';

import { FillTypeResolver } from './resolvers/FillTypeResolver';
import { DynamicTypeResolver } from './resolvers/DynamicTypeResolver';
import { ParallaxTypeResolver } from './resolvers/ParallaxTypeResolver';
import { DynamicGraphicsResolver } from './DynamicGraphicsResolver';

export class BackgroundLayer extends GraphicItem {
  private readonly dynamicResolvers: DynamicGraphicsResolver[] = [];

  constructor(level: Level, display: Display, assetsStore: AssetsStore) {
    super();

    const resolverProps = { level, display, assetsStore };
    const levelLayerGraphics = level.getLevelLayerGraphics();

    if (levelLayerGraphics) {
      const fillStatics = levelLayerGraphics.filter(({ props }) => props.type === 'fill');
      if (fillStatics.length) {
        this.add({ asset: new FillTypeResolver(resolverProps).resolve(fillStatics), zIndex: 1 });
      }

      levelLayerGraphics
        .filter(({ props }) => props.type === 'dynamic')
        .forEach(({ image, props, zIndex = 0 }) => {
          const dynamicTypeResolver = new DynamicTypeResolver(resolverProps);
          this.dynamicResolvers.push(dynamicTypeResolver);
          dynamicTypeResolver.resolve(image, props as DynamicImageType).forEach((asset) => {
            this.add({ asset, zIndex });
          });
        });

      levelLayerGraphics
        .filter(({ props }) => props.type === 'parallax')
        .forEach(({ image, props, zIndex = 0 }) => {
          const parallaxTypeResolver = new ParallaxTypeResolver(resolverProps);
          this.dynamicResolvers.push(parallaxTypeResolver);
          this.add({ asset: parallaxTypeResolver.resolve(image, props as ParallaxImageType), zIndex });
        });
    }
  }

  update(time: number) {
    this.dynamicResolvers.forEach((resolver) => resolver.update(time));
  }
}
