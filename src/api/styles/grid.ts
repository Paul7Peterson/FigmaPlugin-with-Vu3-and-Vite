import { parseBaseToken } from './_shared';
import { GridStyle } from './grid.types';

/** */
export function listGridStyles (): GridStyle[] {
  return figma.getLocalGridStyles().map((grid) => {
    return {
      ...parseBaseToken(grid),
    };
  });
}