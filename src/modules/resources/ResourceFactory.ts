import type { Asset, Tile, Image } from '@src/interfaces';

import type { ResourcesList } from './interfaces';

const resourcesJson = require('@src/assets/resources.json');

export class ResourceFactory {
  private static resources: ResourcesList = resourcesJson as ResourcesList;

  static getTile(name: string): Tile {
    const tile = this.resources.tiles.find((item) => item.name === name);
    if (!tile) {
      throw new Error(`Can't get tile: ${name}`);
    }

    return tile;
  }

  static getImage(name: string): Image {
    const image = this.resources.images.find((item) => item.name === name);
    if (!image) {
      throw new Error(`Can't get image: ${name}`);
    }

    return image;
  }

  static getAllAssets() {
    const { tiles, images } = this.resources;
    return [...tiles, ...images].map<Asset>(({ name, src }) => ({
      name,
      src,
    }));
  }
}
