import type { GameEngine, Undef, UpdateCallback } from '@src/interfaces';
import type { Level } from '@src/modules/core';
import type { Mob } from '@src/modules/unit';
import type { DebugEvent } from '@src/components/Debug';
import { DISPLAY_PADDING, FRAME_PER_SECONDS } from '@src/constants';
import { GraphicsStore, LayerIndexes } from '@src/modules/graphics';
import { InputController } from '@src/modules/input';
import { CameraTrap, Display, BaseEngine, CanvasRender2D } from '@src/modules/core';
import { ResourceFactory, AssetsLoader, AssetsStore } from '@src/modules/resources';
import { GameController } from '@src/modules/game';
import { DrawLevelTileset } from '@src/modules/graphics/level-layers';
import { Logger } from '@src/modules/logger';

export class AppController {
  private readonly display: Display;

  private readonly engine: GameEngine;

  private readonly canvasRender: CanvasRender2D;

  private readonly inputController: InputController;

  private readonly camera: CameraTrap;

  private readonly toUpdateObjects: Array<UpdateCallback> = [];

  private readonly gameController: GameController;

  private readonly graphicsStore: GraphicsStore;

  private readonly logger: Logger;

  private playerCharacter: Undef<Mob>;

  private level: Undef<Level>;

  constructor(canvas: HTMLCanvasElement) {
    this.load = this.load.bind(this);
    this.resize = this.resize.bind(this);
    this.input = this.input.bind(this);

    this.camera = new CameraTrap();
    this.display = new Display(canvas);
    this.logger = new Logger(this.display.buffer, this.camera);

    this.engine = new BaseEngine(FRAME_PER_SECONDS, this.update.bind(this), this.render.bind(this));
    this.canvasRender = this.display.createCanvasRender(this.camera);

    this.inputController = new InputController();
    this.gameController = new GameController(this.inputController);
    this.graphicsStore = new GraphicsStore({
      canvasRender: this.canvasRender,
      display: this.display,
      camera: this.camera,
    });

    new AssetsLoader(ResourceFactory.getAllAssets())
      .load()
      .then((assets) => {
        this.gameController.new('Level01', (level, playerCharacter) => {
          const { screenArea, area, cameraArea } = level;
          const { width, height } = screenArea;

          this.display.use(width, height);
          this.camera.use({ screenArea, levelArea: area, cameraArea }).watch(playerCharacter);

          new DrawLevelTileset(level, new AssetsStore(assets), playerCharacter).use(this.graphicsStore);

          // debug
          this.graphicsStore.addRender((canvasRender) => {
            if (this.playerCharacter) {
              canvasRender.drawRect(this.playerCharacter, 'red');
            }
          }, LayerIndexes.Player);

          this.playerCharacter = playerCharacter;
          this.level = level;

          this.resize();
          this.engine.start();
        });
      })
      .catch((err) => console.error(err));

    this.toUpdateObjects.push(this.gameController.update.bind(this.gameController));
    this.toUpdateObjects.push(this.graphicsStore.update.bind(this.graphicsStore));
  }

  debug(event: DebugEvent) {
    this.logger.debug(event);
  }

  stop() {
    this.engine.stop();
  }

  start() {
    this.engine.start();
  }

  load() {
    this.resize();
  }

  resize() {
    this.display.resize(
      document.documentElement.clientWidth - DISPLAY_PADDING,
      document.documentElement.clientHeight - DISPLAY_PADDING,
    );
    this.display.render();
  }

  input(event: KeyboardEvent) {
    this.inputController.keyDown(event);
  }

  /** здесь обновляем позиции объектов и "слушаем" ввод с клавиатуры */
  private update(time: number) {
    this.toUpdateObjects.forEach((callback) => callback(time));

    this.camera.update();
  }

  /** здесь происходит отрисовка (рендер) всех объектов игры */
  private render() {
    this.canvasRender.fill('gray');
    this.graphicsStore.render();

    this.logger.mob(this.playerCharacter);
    this.logger.level(this.level);

    this.display.render();
  }
}
