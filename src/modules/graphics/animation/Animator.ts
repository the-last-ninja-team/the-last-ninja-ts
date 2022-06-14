import type { AnimationFrames } from '../objects/AnimationFrames';

import type { AnimatorProps, AnimationCallback } from './interfaces';
import { AnimatorMode } from './interfaces';

export class Animator {
  private readonly id: string;

  private count = 0;

  private frameIndex = 0;

  private delay: number;

  private played = false;

  private stopAnimation = false;

  private mode: AnimatorMode;

  private animation: AnimationFrames;

  constructor({ animation, delay, mode = AnimatorMode.Pause, id }: AnimatorProps) {
    this.delay = Math.max(delay, 1);
    this.animation = animation;
    this.mode = mode;
    this.id = id;
  }

  // Смена набора фреймов анимации с заданием с какого кадра ее проигрывать
  private changeFrameSet(animation: AnimationFrames, mode: AnimatorMode, delay = 10, frameIndex = 0) {
    if (this.animation.equals(animation)) {
      return;
    }

    this.count = 0;
    this.delay = Math.max(delay, 1);
    this.animation = animation;
    this.frameIndex = frameIndex;
    this.animation.setFrame(frameIndex);
    this.mode = mode;
    this.played = false;
  }

  // Флаг, что анимация проиграна до конца
  private isEnded() {
    return this.frameIndex === this.animation.frames.length - 1;
  }

  // Остановка анимации
  private stop() {
    this.stopAnimation = true;
  }

  // Сам процесс анимации
  private animate(callback?: AnimationCallback) {
    if (this.mode === AnimatorMode.Pause && this.played) {
      // Если в режиме пауза и анимация уже проиграна, что выходим
      return;
    }

    this.count += 1;

    // Цикл работает тогда, когда счетчик превысил заданную задержку (в нашем случае задержка - это кадр)
    // Т.е. исходим не из времени выполнения в миллисекундах, а кол-ве пройденных кадров
    while (this.count > this.delay) {
      this.count -= this.delay;
      // Следующий кадр
      this.frameIndex += 1;

      if (this.frameIndex === this.animation.frames.length) {
        this.frameIndex =
          this.mode === AnimatorMode.Loop
            ? (this.frameIndex = 0)
            : (this.frameIndex = this.animation.frames.length - 1);
      }

      this.animation.setFrame(this.frameIndex);

      const animationEnded = this.isEnded();
      if (this.stopAnimation || (this.mode === AnimatorMode.Pause && animationEnded)) {
        if (this.mode === AnimatorMode.Pause && animationEnded) {
          this.played = true;
          this.frameIndex = 0;
        }
        // Если анимацию остановили или в режиме "пауза" дошли до последнего кадра
        this.stopAnimation = false;

        // Когда закончилась анимация, то вызываем колбэк
        callback?.(animationEnded, this.animation);

        break;
      } else if (callback && animationEnded) {
        // Когда закончилась анимация, то вызываем колбэк
        callback(true, this.animation);
      }
    }
  }
}
