import type { Measurement, Camera } from '@src/interfaces';
import { CANVAS_CONTEXT } from '@src/constants';

import { CanvasRender2D } from './CanvasRender2D';

export class Display {
  readonly context: CanvasRenderingContext2D;

  readonly buffer: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.context = canvas.getContext(CANVAS_CONTEXT)!;
    this.buffer = this.createContext();
  }

  use(width: number, height: number) {
    this.buffer.canvas.width = width;
    this.buffer.canvas.height = height;
  }

  createContext = (measurement?: Measurement) => {
    const canvas = document.createElement('canvas');
    canvas.width = measurement?.width ?? 0;
    canvas.height = measurement?.height ?? 0;

    const context = canvas.getContext(CANVAS_CONTEXT);
    if (!context) {
      throw new Error('Error while create new canvas');
    }

    return context;
  };

  createCanvasRender(camera: Camera) {
    return new CanvasRender2D(this.buffer, camera, this.isNeedToDraw.bind(this));
  }

  resize(width: number, height: number) {
    const heightWidthRatio = this.buffer.canvas.height / this.buffer.canvas.width;

    if (height / width > heightWidthRatio) {
      this.context.canvas.height = width * heightWidthRatio;
      this.context.canvas.width = width;
    } else {
      this.context.canvas.height = height;
      this.context.canvas.width = height / heightWidthRatio;
    }

    // Флаг сглаживания отрисовки
    this.context.imageSmoothingEnabled = false;
  }

  /**
   * Функция для проверки, нужно ли по заданным координатам рисовать объект.
   * Если он полностью выходит за рамки экрана, то рисовать нет смысла
   * */
  isNeedToDraw(x: number, y: number, width: number, height: number) {
    return !(x >= this.context.canvas.width || y >= this.context.canvas.height || x + width <= 0 || y + height <= 0);
  }

  render() {
    this.context.drawImage(
      this.buffer.canvas,
      0,
      0,
      this.buffer.canvas.width,
      this.buffer.canvas.height,
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height,
    );
  }
}
