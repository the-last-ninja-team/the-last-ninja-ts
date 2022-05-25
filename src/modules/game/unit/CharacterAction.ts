import type { Undef } from '@src/interfaces';

import { CANCEL_ACTION_TIMEOUT } from './constants';
import type { CharacterActionCallback } from './interfaces';

export class CharacterAction {
  private readonly key: string;

  private readonly callback: Undef<CharacterActionCallback>;

  private canDoAction: boolean;

  private action: boolean;

  private timer: Undef<NodeJS.Timeout>;

  constructor(key: string, callback?: CharacterActionCallback) {
    this.canDoAction = true;
    this.action = false;
    this.key = key;
    this.callback = callback;

    this.clear = this.clear.bind(this);
  }

  isAction() {
    return this.action;
  }

  fire() {
    if (this.canDoAction) {
      this.canDoAction = false;
      this.action = true;

      // Запускаем таймаут сброса действия, если они не было произведено
      this.timer = setTimeout(this.clear, CANCEL_ACTION_TIMEOUT);
    }
  }

  clear() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }

    this.canDoAction = true;
    this.action = false;
  }

  done() {
    if (this.action) {
      this.action = false;
      this.callback?.();
    }
  }
}
