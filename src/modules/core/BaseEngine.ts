import type { Undef, UpdateCallback, RenderCallback } from '@src/interfaces';
import { GameEngine } from '@src/interfaces';

/** Это движок, который запускает отображение следующего кадра канвы */
export class BaseEngine extends GameEngine {
  private animationFrameRequest: Undef<number>;

  private accumulatedTime: number;

  private time: Undef<number>;

  private isUpdated: boolean;

  constructor(timeStep: number, update: UpdateCallback, render: RenderCallback) {
    super(timeStep, update, render);

    this.animationFrameRequest = undefined;
    this.accumulatedTime = 0;
    this.time = undefined;
    this.isUpdated = false;

    this.run = this.run.bind(this);
  }

  run(time: number) {
    this.animationFrameRequest = requestAnimationFrame(this.run);

    this.accumulatedTime += time - (this.time ?? 0);
    this.time = time;

    if (this.accumulatedTime >= this.timeStep * 3) {
      this.accumulatedTime = this.timeStep;
    }

    // На случай, если были "тормоза", все накопленное время разбиваем на заданное кол-во кадров и обновляем позиции
    while (this.accumulatedTime >= this.timeStep) {
      this.accumulatedTime -= this.timeStep;
      this.update(time);
      this.isUpdated = true;
    }

    if (this.isUpdated) {
      // Если обновили все позиции, то отрисовываем канву
      this.isUpdated = false;
      this.render(time);
    }
  }

  start() {
    this.accumulatedTime = this.timeStep;
    this.time = window.performance.now();
    this.animationFrameRequest = requestAnimationFrame(this.run);
  }

  stop() {
    if (this.animationFrameRequest) {
      cancelAnimationFrame(this.animationFrameRequest);
    }
  }
}
