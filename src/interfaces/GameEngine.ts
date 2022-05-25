export type UpdateCallback = (time: number) => void;
export type RenderCallback = (time: number) => void;

export abstract class GameEngine {
  protected readonly timeStep: number;

  protected readonly update: UpdateCallback;

  protected readonly render: RenderCallback;

  protected constructor(timeStep: number, update: UpdateCallback, render: RenderCallback) {
    this.timeStep = timeStep;
    this.update = update;
    this.render = render;
  }

  /** Расчет анимации */
  abstract run(time: number): void;

  /** Старт анимации */
  abstract start(): void;

  /** Остановка анимации */
  abstract stop(): void;
}
