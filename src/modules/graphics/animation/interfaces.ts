import type { AnimationFrames } from '../objects/AnimationFrames';

export enum DynamicImageDirection {
  Forward = 'forward',
  Backward = 'backward',
}

export enum AnimatorMode {
  /** выполняем анимацию и когда она завершилась останавливаемся */
  Pause = 'pause',
  /** зацикливаем анимацию */
  Loop = 'loop',
}

export interface AnimatorProps {
  id: string;
  mode?: AnimatorMode;
  delay: number;
  animation: AnimationFrames;
}

export type AnimationCallback = (done: boolean, animation?: AnimationFrames) => void;
