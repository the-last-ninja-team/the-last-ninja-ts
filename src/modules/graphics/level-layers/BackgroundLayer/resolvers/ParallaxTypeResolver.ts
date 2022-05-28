import type { Image } from '@src/interfaces';

import type { ParallaxImageType } from '../../interfaces';
import { DynamicGraphicsResolver } from '../DynamicGraphicsResolver';

export class ParallaxTypeResolver extends DynamicGraphicsResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resolve(image: Image, props: ParallaxImageType) {
    return { image: this.display.createContext().canvas, x: 0, y: 0 };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  update(time: number) {}
}
