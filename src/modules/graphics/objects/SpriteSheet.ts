import { Sprite } from './Sprite';
import type { SpriteSheetProps } from './interfaces';

export class SpriteSheet {
  private readonly name: string;

  private readonly width: number;

  private readonly height: number;

  private readonly spriteWidth: number;

  private readonly spriteHeight: number;

  constructor({ name, width, height, spriteWidth, spriteHeight }: SpriteSheetProps) {
    this.name = name;
    this.width = width;
    this.height = height;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
  }

  getSprite(index: number) {
    return new Sprite({
      name: this.name,
      sourceX: this.getSourceX(index),
      sourceY: this.getSourceY(index),
      width: this.spriteWidth,
      height: this.spriteHeight,
    });
  }

  getSourceX(index: number) {
    return ((index - 1) * this.spriteWidth) % this.width;
  }

  getSourceY(index: number) {
    return Math.trunc(((index - 1) * this.spriteWidth) / this.width) * this.spriteHeight;
  }
}
