import { Picture } from './Picture';
import type { SpriteProps } from './interfaces';

export class Sprite extends Picture {
  protected sourceX: number;

  protected sourceY: number;

  private imageWidth: number;

  private imageHeight: number;

  constructor({ name, sourceX = 0, sourceY = 0, x, y, width, height }: SpriteProps) {
    super({ name, x, y, width, height });

    this.sourceX = sourceX;
    this.sourceY = sourceY;

    this.imageWidth = width;
    this.imageHeight = height;
  }
}
