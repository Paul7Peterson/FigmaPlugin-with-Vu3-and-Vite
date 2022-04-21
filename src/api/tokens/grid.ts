import { parseBaseToken } from './_shared';
import { GridStyle } from './grid.types';

/** */
export async function listGridStyles (): Promise<GridStyle[]> {
  return figma.getLocalGridStyles().map((grid) => {
    return {
      ...parseBaseToken(grid),
    };
  });
}