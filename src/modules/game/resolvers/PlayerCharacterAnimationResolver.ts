import type { PlayerCharacterAnimator } from '../animations';
import type { PlayerCharacterInterpreter } from '../interpreters';

export class PlayerCharacterAnimationResolver {
  private readonly interpreter: PlayerCharacterInterpreter;

  private readonly animator: PlayerCharacterAnimator;

  constructor(interpreter: PlayerCharacterInterpreter, animator: PlayerCharacterAnimator) {
    this.interpreter = interpreter;
    this.animator = animator;
  }

  update() {
    // eslint-disable-next-line
    console.log('PlayerCharacterAnimationResolver update', this.animator);
  }
}
