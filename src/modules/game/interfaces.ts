import type { Level } from '@src/modules/core';
import type { Mob } from '@src/modules/unit';

export type NewLevelCallbackProps = (level: Level, playerCharacter: Mob) => void;
