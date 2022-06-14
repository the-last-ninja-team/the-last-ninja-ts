export enum LayerName {
  Level = 'level',
  Respawn = 'respawn',
  Enemies = 'enemies',
  Collisions = 'collisions',
  Before = 'before-layer',
}

export enum LayerType {
  Tile = 'tilelayer',
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

export interface LevelMap {
  width: number;
  height: number;
  tilewidth: number;
  tileheight: number;
  type: string;
  layers: LevelMapLayer[];
}

export interface LevelMapLayer {
  width?: number;
  height?: number;
  name: string;
  type: string;
  data?: number[];
  objects?: ObjectDef[];
}

export interface ObjectDef {
  name: string;
  height: number;
  width: number;
  type: string;
  x: number;
  y: number;
  polygon?: PolygonDef[];
}

export interface PolygonDef {
  x: number;
  y: number;
}
