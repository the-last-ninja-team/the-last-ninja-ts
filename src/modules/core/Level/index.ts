import type { Undef, Tileset, Shape, LevelMap, ObjectDef, Maybe } from '@src/interfaces';
import { LayerName, LayerObjectType } from '@src/interfaces';
import type { LevelLayersGraphic } from '@src/modules/graphics';
import { Polygon, Rectangle } from '@src/modules/graphics/shapes';
import { findItemByName } from '@src/utils';

import type { LevelProps, LevelDimension } from './interfaces';

export class Level {
  readonly id: string;

  readonly map: LevelMap;

  readonly tileset: Tileset;

  readonly dimension: LevelDimension;

  readonly respawns: ObjectDef[];

  readonly enemies: ObjectDef[];

  readonly collisions: Shape[];

  readonly playerPosition: ObjectDef;

  readonly nextLevelGate: Undef<ObjectDef>;

  readonly prevLevelGate: Undef<ObjectDef>;

  readonly cameraArea: Rectangle;

  readonly screenArea: Rectangle;

  readonly area: Rectangle;

  constructor({ id, map, tileset }: LevelProps) {
    this.id = id;
    this.map = map;
    this.tileset = tileset;

    this.dimension = {
      rows: map.height,
      columns: map.width,
      size: {
        width: map.tilewidth,
        height: map.tileheight,
      },
    };

    const getLayerByName = findItemByName(map.layers);

    // Точки респауна
    this.respawns = getLayerByName(LayerName.Respawn)?.objects ?? [];
    // Исходные позиции противников
    this.enemies = getLayerByName(LayerName.Enemies)?.objects ?? [];
    // Объекты коллизий
    this.collisions = (getLayerByName(LayerName.Collisions)?.objects ?? []).map((object) => {
      switch (object.type) {
        case LayerObjectType.Triangle:
        case LayerObjectType.Polygon:
          return new Polygon(object.x, object.y, object?.polygon ?? []);
        default:
          return new Rectangle(object.x, object.y, object.width, object.height);
      }
    });

    const levelBoxes = getLayerByName(LayerName.Level);
    const getObjectByName = findItemByName(levelBoxes?.objects);

    // Позиция игрока на старте
    this.playerPosition = getObjectByName(LayerObjectType.Player)!;
    this.respawns.push(this.playerPosition);
    // Точка входа на следующий уровень
    this.nextLevelGate = getObjectByName(LayerObjectType.NextLevelGate);
    // Точка входа на предыдущий уровень
    this.prevLevelGate = getObjectByName(LayerObjectType.PrevLevelGate);

    // Позиция камеры
    const cameraArea = getObjectByName(LayerObjectType.CameraArea)!;
    // // Размер экрана
    const screen = getObjectByName(LayerObjectType.Screen)!;

    this.cameraArea = new Rectangle(cameraArea.x, cameraArea.y, cameraArea.width, cameraArea.height);
    this.screenArea = new Rectangle(screen.x, screen.y, screen.width, screen.height);
    this.area = new Rectangle(0, 0, map.width * map.tilewidth, map.height * map.tileheight);
  }

  getLevelLayerGraphics = (): Maybe<LevelLayersGraphic[]> => null;
}
