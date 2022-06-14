import type { Undef } from '@src/interfaces';
import type { InputController } from '@src/modules/input';
import type { Level } from '@src/modules/core';
import { Environment } from '@src/modules/environment';
import { RayCastCollider } from '@src/modules/collision';
import { DEFAULT_FRICTION, DEFAULT_GRAVITY } from '@src/constants';

import { PlayerCharacterController } from './controllers';
import { PlayerCharacterInterpreter } from './interpreters';
import { PlayerCharacterAnimationResolver } from './resolvers';
import { PlayerCharacterAnimator } from './animations';
import { Levels } from './levels';
import { UnitFactory, PlayerCharacter } from './unit';
import { findClosesRespawnPoint } from './utils/findClosesRespawnPoint';
import type { NewLevelCallbackProps } from './interfaces';

export class GameController {
  private readonly playerCharacterController: PlayerCharacterController;

  private readonly env: Environment;

  private level: Undef<Level>;

  private playerCharacter: Undef<PlayerCharacter>;

  private playerCharacterAnimation: Undef<PlayerCharacterAnimationResolver>;

  constructor(inputController: InputController) {
    this.playerCharacterController = new PlayerCharacterController(inputController);
    this.env = new Environment({ friction: DEFAULT_FRICTION, gravity: DEFAULT_GRAVITY });
  }

  new(level: keyof typeof Levels, callback: NewLevelCallbackProps) {
    this.level = new Levels[level]();

    const playerCharacter = UnitFactory.createPlayerCharacter(this.level.playerPosition);

    this.playerCharacterController.watch(playerCharacter);
    this.env.use(new RayCastCollider(this.level.area, this.level.collisions));
    this.env.add(playerCharacter);
    this.playerCharacter = playerCharacter;
    this.playerCharacterAnimation = new PlayerCharacterAnimationResolver(
      new PlayerCharacterInterpreter(playerCharacter),
      new PlayerCharacterAnimator(),
    );

    callback(this.level, playerCharacter);
  }

  private checkOutOfBounce() {
    if (this.playerCharacter && this.level) {
      const { area, respawns } = this.level;

      // Как только ушли за границу пола, то перемещаем игрока на стартовую позицию
      if (this.playerCharacter.getTop() > area.height) {
        this.playerCharacter.velocityX = 0;
        this.playerCharacter.velocityY = 0;
        this.playerCharacter.jumping = false;

        const respawn = findClosesRespawnPoint(this.playerCharacter, respawns);

        this.playerCharacter.x = respawn.x;
        this.playerCharacter.y = respawn.y;
      }
    }
  }

  update() {
    this.playerCharacterController.update();
    this.playerCharacterAnimation?.update();
    this.env.update();

    this.checkOutOfBounce();
  }
}
