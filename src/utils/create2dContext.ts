import type { Measurement } from '@src/interfaces';

export const create2dContext = (measurement: Measurement) => {
  const canvas = document.createElement('canvas');

  const { width, height } = measurement;
  canvas.width = width;
  canvas.height = height;
  return canvas.getContext('2d')!;
};
