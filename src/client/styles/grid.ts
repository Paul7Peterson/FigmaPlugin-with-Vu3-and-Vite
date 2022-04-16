import { parseBaseToken } from './_shared';
import { Grid } from './grid.types';

/** */
export function getGrids (): Grid[] {
  return figma.getLocalGridStyles().map((grid) => {
    return {
      ...parseBaseToken(grid),
    };
  });
}