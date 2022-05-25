import type { Measurement, Tile } from '@src/interfaces';

export enum LayerName {
  Level = 'level',
  Respawn = 'respawn',
  Enemies = 'enemies',
  Collisions = 'collisions',
}

export enum LayerObjectType {
  Triangle = 'triangle',
  Polygon = 'polygon',
  Player = 'player',
  NextLevelGate = 'next-level-gate',
  PrevLevelGate = 'prev-level-gate',
  NextLevelArrow = 'next-level-arrow',
  CameraArea = 'camera-trap',
  Screen = 'screen',
}

export interface LevelProps {
  key: string;
  map: LevelMap;
  tile: Tile;
}

export type LevelDimension = {
  rows: number;
  columns: number;
  size: Measurement;
};

export interface LevelMap {
  compressionlevel: number;
  editorsettings: EditorSettings;
  height: number;
  infinite: boolean;
  layers: Layer[];
  nextlayerid: number;
  nextobjectid: number;
  orientation: string;
  renderorder: string;
  tiledversion: string;
  tileheight: number;
  tilesets: Tileset[];
  tilewidth: number;
  type: string;
  version: number;
  width: number;
}

export interface EditorSettings {
  export: Export;
}

export interface Export {
  format: string;
  target: string;
}

export interface Layer {
  data?: number[];
  height?: number;
  id: number;
  name: string;
  opacity: number;
  type: string;
  visible: boolean;
  width?: number;
  x: number;
  y: number;
  draworder?: string;
  objects?: ObjectDef[];
}

export interface ObjectDef {
  height: number;
  id: number;
  name: string;
  rotation: number;
  type: string;
  visible: boolean;
  width: number;
  x: number;
  y: number;
  polygon?: PolygonDef[];
}

export interface PolygonDef {
  x: number;
  y: number;
}

export interface Tileset {
  firstgid: number;
  source: string;
}
