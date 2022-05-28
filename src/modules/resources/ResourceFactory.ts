import type { Asset, Tileset, Image } from '@src/interfaces';

import type { ResourcesList } from './interfaces';

const resourcesJson = require('@src/assets/resources.json');

export class ResourceFactory {
  private static resources: ResourcesList = resourcesJson as ResourcesList;

  static getTileset(name: string): Tileset {
    const tileset = this.resources.tilesets.find((item) => item.name === name);
    if (!tileset) {
      throw new Error(`Can't get tile: ${name}`);
    }

    return tileset;
  }

  static getImage(name: string): Image {
    const image = this.resources.images.find((item) => item.name === name);
    if (!image) {
      throw new Error(`Can't get image: ${name}`);
    }

    return image;
  }

  static getAllAssets() {
    const { tilesets, images } = this.resources;
    return [...tilesets, ...images].map<Asset>(({ name, src }) => ({
      name,
      src,
    }));
  }
}
