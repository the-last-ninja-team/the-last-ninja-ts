import type { Point, Measurement, Tileset } from '@src/interfaces';

export interface PictureProps extends Partial<Point>, Measurement {
  name: string;
}

export type SourcePoint = {
  sourceX: number;
  sourceY: number;
};

export type SpriteProps = PictureProps & Partial<SourcePoint>;

export interface AnimationFramesProps extends SpriteProps {
  id: string;
  frames: SourcePoint[];
}

export type SpriteSheetProps = Tileset;
