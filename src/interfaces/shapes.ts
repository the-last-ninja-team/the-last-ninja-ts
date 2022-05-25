export type Point = {
  x: number;
  y: number;
};

export type Measurement = {
  width: number;
  height: number;
};

export type Rect = Point & Measurement;
