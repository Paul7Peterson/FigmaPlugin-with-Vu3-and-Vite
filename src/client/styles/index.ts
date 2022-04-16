import { SolidColor } from './color.types';
import { Text } from './text.types';
import { getTexts } from './text';
import { Grid } from './grid.types';
import { getGrids } from './grid';
import { Effect } from './effect.types';
import { getEffects } from './effect';

export interface GetAllStylesReturn {
  gradientColors: SolidColor[];
  texts: Text[];
  effects: Effect[];
  grids: Grid[];
}

/** */
export function getAllStyles (): GetAllStylesReturn {
  return {
    gradientColors: [],
    texts: getTexts(),
    effects: getEffects(),
    grids: getGrids(),
  };
}

export * from './color';
export * from './text';
export * from './grid';
export * from './effect';