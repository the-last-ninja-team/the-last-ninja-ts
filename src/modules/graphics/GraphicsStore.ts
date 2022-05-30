import { sortByZIndex } from './utils/sortByZIndex';
import type { GraphicItemDefinition, GraphicItem, RenderCallback, GraphicsStoreEnvironment } from './interfaces';

export class GraphicsStore {
  readonly env: GraphicsStoreEnvironment;

  private items: GraphicItemDefinition[] = [];

  private isItemsSorted = false;

  constructor(env: GraphicsStoreEnvironment) {
    this.env = env;
  }

  addItem(item: GraphicItem, zIndex: number) {
    this.items.push({ item, zIndex });

    return this;
  }

  addRender(render: RenderCallback, zIndex: number) {
    this.items.push({ render, zIndex });
  }

  update(time: number) {
    this.items.forEach(({ item }) => {
      item?.update(time);
    });
  }

  render() {
    if (!this.isItemsSorted) {
      this.items = this.items.sort(sortByZIndex);
      this.isItemsSorted = true;
    }

    this.items.forEach(({ item, render }) => {
      if (item) {
        const items = item.assets.sort(sortByZIndex);

        items.forEach(({ asset }) => {
          let image;
          let x = 0;
          let y = 0;

          if (asset instanceof HTMLImageElement || asset instanceof HTMLCanvasElement) {
            image = asset;
          } else {
            image = asset.image;
            x = asset.x ?? 0;
            y = asset.y ?? 0;
          }

          const { width, height } = image;
          this.env.canvasRender.drawImage(image, { x, y, width, height });
        });
      }

      if (render) {
        render(this.env.canvasRender);
      }
    });
  }
}
