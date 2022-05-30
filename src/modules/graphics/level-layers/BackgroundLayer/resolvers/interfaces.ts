import type { Mob } from '@src/modules/unit';
import type { Camera } from '@src/interfaces';

import type { StaticGraphicsResolverProps } from '../interfaces';

export interface ParallaxTypeResolverProps extends StaticGraphicsResolverProps {
  mob: Mob;
  camera: Camera;
}
