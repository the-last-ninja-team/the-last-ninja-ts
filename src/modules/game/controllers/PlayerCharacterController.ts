import type { Undef } from '@src/interfaces';
import type { InputController } from '@src/modules/input';

import type { PlayerCharacter } from '../unit/PlayerCharacter';

export class PlayerCharacterController {
  private readonly inputController: InputController;

  private playerCharacter: Undef<PlayerCharacter>;

  constructor(inputController: InputController) {
    this.inputController = inputController;
  }

  watch(playerCharacter: PlayerCharacter) {
    this.playerCharacter = playerCharacter;
  }

  update() {
    if (!this.playerCharacter) {
      return;
    }

    // Флаг игрок присел/игрок встал
    this.playerCharacter.crouch(this.inputController.down.active);
    // Движение влево
    if (this.inputController.left.active) {
      this.playerCharacter.moveLeft();
    }
    // Движение вправо
    if (this.inputController.right.active) {
      this.playerCharacter.moveRight();
    }
    // Прыжок (после, сразу деактивируем нажатие, чтобы убрать эффект "прыгаем пока зажата клавиша")
    if (this.inputController.jump.active) {
      this.playerCharacter.jump();
      this.inputController.jump.active = false;
    }
    // Кастуем файербол
    if (this.inputController.cast.active) {
      this.playerCharacter.cast();
      this.inputController.cast.active = false;
    }
    // Удар мечом
    if (this.inputController.sword.active) {
      this.playerCharacter.sword();
      this.inputController.sword.active = false;
    }
    // Выстрел из лука
    if (this.inputController.bow.active) {
      this.playerCharacter.bow();
      this.inputController.bow.active = false;
    }
  }
}
