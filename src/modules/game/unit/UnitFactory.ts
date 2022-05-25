import type { Point } from '@src/interfaces';

import { PlayerCharacter } from './PlayerCharacter';

export class UnitFactory {
  static createPlayerCharacter(coordinate: Point) {
    return new PlayerCharacter({
      ...coordinate,
      width: 16,
      height: 32,
      jumpPower: 22.5,
      speed: 1.55,
      hitbox: { width: 16, height: 32 },
      hitboxCrouch: { width: 16, height: 16 },
    });
  }
}
