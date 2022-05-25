import { Sprite } from './Sprite';
import type { AnimationFramesProps, SourcePoint } from './interfaces';

export class AnimationFrames extends Sprite {
  private readonly frames: SourcePoint[];

  constructor({ name, frames, width, height }: AnimationFramesProps) {
    const [{ sourceX, sourceY }] = frames;

    super({
      name,
      sourceX,
      sourceY,
      width,
      height,
    });

    this.frames = frames;
  }

  setFrame(index: number) {
    const frame = this.frames[index];

    if (frame) {
      const { sourceX, sourceY } = frame;
      this.sourceX = sourceX;
      this.sourceY = sourceY;
    }
  }
}
