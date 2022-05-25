/** Класс, где храним флаги нажатия/отжатия, активности клавиши */
export class ButtonInput {
  readonly code: string;

  pressed: boolean;

  active: boolean;

  disabled: boolean;

  constructor(code: string) {
    this.code = code;
    this.pressed = false;
    this.active = false;
    this.disabled = false;
  }

  action(pressed: boolean) {
    if (!this.disabled) {
      if (this.pressed !== pressed) {
        this.active = pressed;
      }

      this.pressed = pressed;
    }
  }
}
