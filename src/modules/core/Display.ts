import type { Rect } from '@src/interfaces';

export class Display {
  readonly context: CanvasRenderingContext2D;

  readonly buffer: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.context = canvas.getContext('2d')!;
    this.buffer = document.createElement('canvas').getContext('2d')!;
  }

  init(width: number, height: number) {
    this.buffer.canvas.width = width;
    this.buffer.canvas.height = height;
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
  isNeedToDraw(rect: Rect) {
    const { x, y, width, height } = rect;

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
