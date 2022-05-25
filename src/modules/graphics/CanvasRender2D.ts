import type { AssetElement, Rect, Camera } from '@src/interfaces';

export class CanvasRender2D {
  private readonly context: CanvasRenderingContext2D;

  private readonly camera: Camera;

  constructor(context: CanvasRenderingContext2D, camera: Camera) {
    this.context = context;
    this.camera = camera;
  }

  drawRect(rect: Rect, color: string) {
    const { x, y, width, height } = rect;

    const destinationX = Math.round(x) - this.camera.getX();
    const destinationY = Math.round(y) - this.camera.getY();

    this.context.fillStyle = color;
    this.context.fillRect(destinationX, destinationY, width, height);
  }

  drawStroke(rect: Rect, color: string, lineWidth = 1) {
    const { x, y, width, height } = rect;

    this.context.strokeStyle = color;
    this.context.lineWidth = lineWidth;
    this.context.strokeRect(x, y, width, height);
  }

  fill(color: string) {
    this.context.fillStyle = color;
    this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

  drawImage(image: AssetElement, rect: Rect) {
    const { x, y, width, height } = rect;

    const destinationX = Math.round(x) - this.camera.getX();
    const destinationY = Math.round(y) - this.camera.getY();

    this.context.drawImage(image, destinationX, destinationY, width, height);
  }
}
