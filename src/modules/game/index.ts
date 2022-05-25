import type { Undef } from '@src/interfaces';
import type { InputController } from '@src/modules/input';
import type { Level } from '@src/modules/core';
import { Environment } from '@src/modules/environment';
import { RayCastCollider } from '@src/modules/collision';
import { DEFAULT_FRICTION, DEFAULT_GRAVITY } from '@src/constants';

import { PlayerCharacterController } from './controllers/PlayerCharacterController';
import { Levels } from './levels';
import { UnitFactory } from './unit';
import type { NewLevelCallbackProps } from './interfaces';

export class GameController {
  private readonly playerCharacterController: PlayerCharacterController;

  private readonly env: Environment;

  private level: Undef<Level>;

  constructor(inputController: InputController) {
    this.playerCharacterController = new PlayerCharacterController(inputController);
    this.env = new Environment({ friction: DEFAULT_FRICTION, gravity: DEFAULT_GRAVITY });
  }

  new(level: keyof typeof Levels, callback: NewLevelCallbackProps) {
    this.level = new Levels[level]();

    const playerCharacter = UnitFactory.createPlayerCharacter(this.level.playerPosition);

    this.playerCharacterController.watch(playerCharacter);
    this.env.init(new RayCastCollider(this.level.area, this.level.collisions));
    this.env.add(playerCharacter);

    callback(this.level, playerCharacter);
  }

  update() {
    this.playerCharacterController.update();
    this.env.update();
  }
}
