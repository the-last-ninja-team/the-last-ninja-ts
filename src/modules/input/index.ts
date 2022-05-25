import { ButtonInput } from './ButtonInput';

/** Контроллер, который слушает ввод с клавиатуры и мыши (когда это понадобиться) */
export class InputController {
  readonly down: ButtonInput;

  readonly left: ButtonInput;

  readonly right: ButtonInput;

  readonly up: ButtonInput;

  readonly jump: ButtonInput;

  readonly cast: ButtonInput;

  readonly sword: ButtonInput;

  readonly bow: ButtonInput;

  readonly buttonCodes: Record<string, ButtonInput>;

  constructor() {
    /** Стрелка вниз - присесть или слайд во время движения */
    this.down = new ButtonInput('ArrowDown');
    /** Стрелка влево - двигаемся влево (во время прыжка можно управлять) */
    this.left = new ButtonInput('ArrowLeft');
    /** Стрелка вправо - двигаемся вправо (во время прыжка можно управлять) */
    this.right = new ButtonInput('ArrowRight');
    /** Стрелка вверх - пока ничего нет */
    this.up = new ButtonInput('ArrowUp');
    /** Пробел - прыжок */
    this.jump = new ButtonInput('Space');
    /** Клавиша F - каст файербола */
    this.cast = new ButtonInput('KeyF');
    /** Клавиша R - удар мечом (как на земле, так и в воздухе) */
    this.sword = new ButtonInput('KeyR');
    /** Клавиш B - выстрел из лука (как на земле, так и в воздухе) */
    this.bow = new ButtonInput('KeyB');

    this.buttonCodes = Object.values(this).reduce((acc, obj) => {
      if (obj instanceof ButtonInput) {
        acc[obj.code] = obj;
      }

      return acc;
    }, {});
  }

  keyDown(event: KeyboardEvent) {
    const buttonInput = this.buttonCodes[event.code];
    if (buttonInput) {
      buttonInput.action(event.type === 'keydown');
    }
  }
}
