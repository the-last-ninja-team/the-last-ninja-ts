import type { PlayerCharacter } from '@src/modules/game/unit';

/**
 * Здесь мы пытаемся интерпретировать состояние персонажа, в зависимости от его флагов,
 * положения, ускорения и т.д. в действие
 * */
export class PlayerCharacterInterpreter {
  readonly playerCharacter: PlayerCharacter;

  constructor(playerCharacter: PlayerCharacter) {
    this.playerCharacter = playerCharacter;
  }

  // Присел
  isCrouching() {
    return this.playerCharacter.isCrouching();
  }

  // Скользит
  isSliding() {
    return this.playerCharacter.isCrouching() && this.playerCharacter.velocityX > 1;
  }

  // Кастует
  isCasting() {
    return this.playerCharacter.castAction.isAction();
  }

  // Стрельба из лука
  isBowAttacking() {
    return this.playerCharacter.bowAttackAction.isAction();
  }

  // Удар мечом
  isSwordAttacking() {
    return this.playerCharacter.swordAttackAction.isAction();
  }

  // Прыжок
  isJumping() {
    const { velocityY } = this.playerCharacter;
    return velocityY < 0 && velocityY < -this.playerCharacter.jumpPower;
  }

  // Падение
  isFalling() {
    return this.playerCharacter.velocityY > 0;
  }

  // Переворот (верхняя точка прыжка)
  isFlipping() {
    const { velocityY } = this.playerCharacter;
    return velocityY < 0 && velocityY >= -this.playerCharacter.jumpPower;
  }

  // Ожидание
  isIdling() {
    return !this.playerCharacter.jumping && this.playerCharacter.velocityX < 0.05;
  }

  // Движение
  isMoving() {
    return !this.playerCharacter.jumping && !(this.playerCharacter.velocityX < 1);
  }

  // Замедление ускорения
  isSlowing() {
    const { velocityX } = this.playerCharacter;
    return velocityX < 1 && velocityX > 0.098 && !this.playerCharacter.jumping;
  }
}
