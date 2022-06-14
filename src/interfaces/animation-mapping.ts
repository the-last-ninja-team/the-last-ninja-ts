export interface AnimationMap {
  type: string;
  layers: AnimationMapLayer[];
}

export interface AnimationMapLayer {
  name: string;
  data: number[];
}
