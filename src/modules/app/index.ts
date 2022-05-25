import type { GameEngine, RenderCallback, Undef, UpdateCallback } from '@src/interfaces';
import { DISPLAY_PADDING, FRAME_PER_SECONDS } from '@src/constants';
import { CanvasRender2D } from '@src/modules/graphics';
import { InputController } from '@src/modules/input';
import { CameraTrap, Display, BaseEngine } from '@src/modules/core';
import { ResourceFactory, AssetsLoader, AssetsStore } from '@src/modules/resources';
import { GameController } from '@src/modules/game';
import { DrawLevelTileset } from '@src/modules/graphics/static';
import type { Mob } from '@src/modules/unit';

export class AppController {
  private readonly display: Display;

  private readonly engine: GameEngine;

  private readonly canvasRender2D: CanvasRender2D;

  private readonly inputController: InputController;

  private readonly camera: CameraTrap;

  private readonly toRenderObjects: Array<RenderCallback> = [];

  private readonly toUpdateObjects: Array<UpdateCallback> = [];

  private readonly gameController: GameController;

  private readonly drawLevelTileset: DrawLevelTileset;

  private playerCharacter: Undef<Mob>;

  constructor(canvas: HTMLCanvasElement) {
    this.load = this.load.bind(this);
    this.resize = this.resize.bind(this);
    this.input = this.input.bind(this);

    this.camera = new CameraTrap();
    this.display = new Display(canvas);
    this.engine = new BaseEngine(FRAME_PER_SECONDS, this.update.bind(this), this.render.bind(this));
    this.canvasRender2D = new CanvasRender2D(this.display.buffer, this.camera);
    this.inputController = new InputController();
    this.gameController = new GameController(this.inputController);
    this.drawLevelTileset = new DrawLevelTileset(this.canvasRender2D);

    new AssetsLoader(ResourceFactory.getAllAssets())
      .load()
      .then((assets) => {
        this.drawLevelTileset.setAssetsStore(new AssetsStore(assets));

        this.gameController.new('Level01', (level, playerCharacter) => {
          const { screenArea, area, cameraArea } = level;
          const { width, height } = screenArea;

          this.display.init(width, height);
          this.camera.init({ screenArea, levelArea: area, cameraArea });
          this.camera.watch(playerCharacter);
          this.drawLevelTileset.init(level);

          // debug
          this.playerCharacter = playerCharacter;

          this.resize();
          this.engine.start();
        });
      })
      .catch((err) => console.error(err));

    this.toRenderObjects.push(this.drawLevelTileset.render.bind(this.drawLevelTileset));

    this.toUpdateObjects.push(this.gameController.update.bind(this.gameController));
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
  private render(time: number) {
    this.canvasRender2D.fill('gray');
    this.toRenderObjects.forEach((callback) => callback(time));
    if (this.playerCharacter) {
      this.canvasRender2D.drawRect(this.playerCharacter, 'red');
    }

    this.display.render();
  }
}
