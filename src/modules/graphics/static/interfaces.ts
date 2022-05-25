export enum LayerType {
  Level = 'level',
  Front = 'front',
}

export type LayersToDraw = { [key in LayerType]?: HTMLCanvasElement };
