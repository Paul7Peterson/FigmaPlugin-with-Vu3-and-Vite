import { parseBaseToken } from './_shared';
import { Effect } from './effect.types';

/** */
export function getEffects (): Effect[] {
  return figma.getLocalEffectStyles().map((effect) => {
    return {
      ...parseBaseToken(effect),
      dropShadows: [],
      innerShadows: [],
      blurEffects: [],
    };
  });
}

