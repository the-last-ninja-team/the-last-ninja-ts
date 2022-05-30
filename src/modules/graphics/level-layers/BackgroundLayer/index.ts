import type { Level } from '@src/modules/core';
import type { AssetsStore } from '@src/modules/resources';
import type { Mob } from '@src/modules/unit';

import { GraphicItem } from '../../interfaces';
import type { DynamicImageType, ParallaxImageType } from '../interfaces';

import { FillTypeResolver } from './resolvers/FillTypeResolver';
import { DynamicTypeResolver } from './resolvers/DynamicTypeResolver';
import { ParallaxTypeResolver } from './resolvers/ParallaxTypeResolver';
import { DynamicGraphicsResolver } from './DynamicGraphicsResolver';

export class BackgroundLayer extends GraphicItem {
  private readonly dynamicResolvers: DynamicGraphicsResolver[] = [];

  resolve(level: Level, assetsStore: AssetsStore, mob: Mob) {
    const resolverProps = { level, assetsStore, display: this.env.display };
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
          const parallaxTypeResolver = new ParallaxTypeResolver({ ...resolverProps, mob, camera: this.env.camera });
          this.dynamicResolvers.push(parallaxTypeResolver);
          parallaxTypeResolver.resolve(image, props as ParallaxImageType).forEach((asset) => {
            this.add({ asset, zIndex });
          });
        });
    }

    return this;
  }

  update(time: number) {
    this.dynamicResolvers.forEach((resolver) => resolver.update(time));
  }
}
