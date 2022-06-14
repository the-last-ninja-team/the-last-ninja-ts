import type { Undef } from '@src/interfaces';
import { Mob } from '@src/modules/unit';
import type { MobProps } from '@src/modules/unit';

import { CharacterAction } from './CharacterAction';
import { HIDE_SWORD_TIMEOUT } from './constants';

export class PlayerCharacter extends Mob {
  private readonly actions: CharacterAction[] = [];

  readonly castAction: CharacterAction;

  readonly swordAttackAction: CharacterAction;

  readonly bowAttackAction: CharacterAction;

  private isArmed: boolean;

  private timer: Undef<NodeJS.Timeout>;

  constructor(props: MobProps) {
    super(props);

    this.actions.push((this.castAction = new CharacterAction('cast')));
    this.actions.push((this.swordAttackAction = new CharacterAction('sword-attack')));
    this.actions.push((this.bowAttackAction = new CharacterAction('bow-attack')));

    this.isArmed = false;
  }

  private isAction() {
    return this.actions.some((action) => action.isAction());
  }

  moveLeft() {
    if (!this.jumping && this.isAction()) {
      return;
    }

    super.moveLeft();
  }

  moveRight() {
    if (!this.jumping && this.isAction()) {
      return;
    }

    super.moveRight();
  }

  cast() {
    if (!this.jumping && !this.crouching) {
      // Кастуем, только на земле и когда стоим
      this.castAction.fire();
    }
  }

  sword() {
    if (!this.crouching) {
      // Атака мечом, только когда стоим или в воздухе
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.isArmed = true;
      this.swordAttackAction.fire();
      this.timer = setTimeout(() => {
        this.isArmed = false;
      }, HIDE_SWORD_TIMEOUT);
    }
  }

  bow() {
    if (!this.crouching) {
      // Стреляем из лука, только когда стоим, на земле или в воздухе на определенном расстоянии от "земли"
      this.bowAttackAction.fire();
    }
  }
}
