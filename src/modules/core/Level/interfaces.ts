import type { LevelMap, Measurement, Tileset } from '@src/interfaces';

export interface LevelProps {
  id: string;
  map: LevelMap;
  tileset: Tileset;
}

export type LevelDimension = {
  rows: number;
  columns: number;
  size: Measurement;
};
