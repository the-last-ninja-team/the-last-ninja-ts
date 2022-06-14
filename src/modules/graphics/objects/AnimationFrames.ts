import { Sprite } from './Sprite';
import type { AnimationFramesProps, SourcePoint } from './interfaces';

export class AnimationFrames extends Sprite {
  readonly id: string;

  readonly frames: SourcePoint[];

  constructor({ id, name, frames, width, height }: AnimationFramesProps) {
    const [{ sourceX, sourceY }] = frames;

    super({
      name,
      sourceX,
      sourceY,
      width,
      height,
    });

    this.id = id;
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

  equals(obj: AnimationFrames) {
    return this.id === obj.id;
  }
}
