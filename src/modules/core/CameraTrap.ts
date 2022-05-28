import type { Undef, Rect, CameraProps } from '@src/interfaces';
import { Camera } from '@src/interfaces';
import { Vector } from '@src/math';

/**
 * Camera trap
 *
 * Камера, которая следует за заданной рамкой, которую игрок может двигать.
 * И применяя эти координаты, при отрисовки всей анимации, создается эффект динамичности происходящего,
 * что персонаж продвигается по уровню.
 *
 * Для визуальной отладки, создается 3 прямоугольника:
 * - зеленый - стартовая позиция камеры
 * - черный - рамка, которую "толкает" персонаж
 * - красный - финишная позиция камеры
 * */
export class CameraTrap extends Camera {
  private steps = 0;

  private index = 1;

  private newX = 0;

  private newY = 0;

  private widthBetweenViewPortAndLevel = 0;

  private heightBetweenViewPortAndLevel = 0;

  private cameraArea: Undef<Rect>;

  private screenArea: Undef<Rect>;

  private levelArea: Undef<Rect>;

  use({ cameraArea, screenArea, levelArea }: CameraProps) {
    // Координаты, относительно которых будем работать вывод на экран
    this.x = screenArea.x;
    this.y = screenArea.y;

    // Координаты, которые получены в текущий момент и от них нужно интерполировать, чтобы добавить плавности
    this.newX = this.x;
    this.newY = this.y;

    this.cameraArea = { ...cameraArea };
    this.screenArea = { ...screenArea };
    this.levelArea = { ...levelArea };

    this.widthBetweenViewPortAndLevel = this.screenArea.width - (cameraArea.x + cameraArea.width);
    this.heightBetweenViewPortAndLevel = this.screenArea.height - (cameraArea.y + cameraArea.height);

    return this;
  }

  private calcX() {
    if (!(this.object && this.cameraArea && this.levelArea && this.screenArea)) {
      return;
    }

    if (this.x > 0 && this.object.x - this.x < this.cameraArea.x) {
      /** Если уже есть X камеры и объект выходит за рамки назад по уровню, то высчитываем X координату */
      this.newX = Math.max(0, this.object.x - this.cameraArea.x);
    } else if (this.object.x > this.x + this.cameraArea.x + this.cameraArea.width - this.object.width) {
      /** Если объект выходит за рамки вперед по уровню, то высчитываем X координату */
      this.newX = this.object.x - (this.cameraArea.x + this.cameraArea.width - this.object.width);
    }

    if (this.object.x + this.object.width > this.levelArea.width - this.widthBetweenViewPortAndLevel) {
      /**
       * Объект достиг границы лимита по X координате с учетом рамки.
       * В этом случае, мы должны дать ему пройти до конца (за границу) уровня, не двигая рамку.
       * */
      if (this.screenArea.width === this.levelArea.width) {
        this.newX = 0;
      } else {
        this.newX = this.levelArea.width - this.screenArea.width;
      }
    }
  }

  private calcY() {
    if (!(this.object && this.cameraArea && this.levelArea && this.screenArea)) {
      return;
    }

    if (this.y > 0 && this.object.y - this.y < this.cameraArea.y) {
      /** Если уже есть Y камеры и объект выходит за рамки назад по уровню, то высчитываем Y координату */
      this.newY = Math.max(0, this.object.y - this.cameraArea.y);
    } else if (this.object.y > this.y + this.cameraArea.y + this.cameraArea.height - this.object.height) {
      /** Если объект выходит за рамки вперед по уровню, то высчитываем Y координату */
      this.newY = this.object.y - (this.cameraArea.y + this.cameraArea.height - this.object.height);
    }

    if (this.object.y + this.object.height > this.levelArea.height - this.heightBetweenViewPortAndLevel) {
      /**
       * Объект достиг границы лимита по Y координате с учетом рамки.
       * В этом случае, мы должны дать ему пройти до конца (за границу) уровня, не двигая рамку.
       * */
      if (this.screenArea.height === this.levelArea.height) {
        this.newY = 0;
      } else {
        this.newY = this.levelArea.height - this.screenArea.height;
      }
    }
  }

  update() {
    if (this.object && this.cameraArea && this.levelArea && this.screenArea) {
      this.calcX();
      this.calcY();

      // X координату применяем сразу, т.к. нет смысла делать плавность по причине того, что игрок всегда передвигается по горизонтали
      this.x = Math.round(this.newX);

      if (this.y !== Math.round(this.newY)) {
        // Интерполируем длину до новой точки, чтобы при падении или подъеме камера двигалась плавно
        const startPos = new Vector(this.x, this.y);
        const targetPos = new Vector(this.newX, this.newY);

        this.steps += 0.05 * this.index;
        this.index = +1;
        startPos.lerp(targetPos.x, targetPos.y, this.steps);

        this.y = Math.round(startPos.y);
      } else {
        this.steps = 0;
        this.index = 1;
      }
    }
  }
}
