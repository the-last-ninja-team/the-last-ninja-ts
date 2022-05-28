import type { FillImageType, LevelLayersGraphic } from '../../interfaces';
import { StaticGraphicsResolver } from '../StaticGraphicsResolver';
import { getImageAreaCountsByX } from '../utils/getImageAreaCountsByX';

export class FillTypeResolver extends StaticGraphicsResolver {
  resolve(levelLayers: LevelLayersGraphic[]) {
    const { area } = this.level;

    const fillImageContext = this.display.createContext(area);
    levelLayers.forEach(({ image, props }) => {
      const fillImage = this.assetsStore.get(image.name);

      getImageAreaCountsByX(area.width, image.width).forEach((x) => {
        fillImageContext.drawImage(fillImage, x, (props as FillImageType).y ?? 0, image.width, image.height);
      });
    });

    return fillImageContext.canvas;
  }
}
