import { parseBaseToken } from './_shared';
import { BoxShadowStyle, BorderStyle, BoxShadowType } from './effect.types';

/** */
export function listBoxShadows (): BoxShadowStyle[] {
  return figma.getLocalEffectStyles()
    .filter((effect) => {
      let validBoxShadow = true;
      try {
        getBoxShadowTypeAndElevation(effect);
      } catch (error) {
        const msg = `"${effect.name} "doesn't follow the naming convention`;
        console.error(msg);
        figma.notify(msg, { error: true });
        validBoxShadow = false;
      }
      return validBoxShadow;
    })
    .map((effect) => {
      return {
        ...parseBaseToken(effect),
        ...getBoxShadowTypeAndElevation(effect),
        dropShadows: [],
        innerShadows: [],
        blurEffects: [],
      };
    });
}

function getBoxShadowTypeAndElevation (effect: EffectStyle): { type: BoxShadowType; level: number; errors: string[]; } {
  const errors: string[] = [];

  const [_type, _level, ..._] = effect.name.split('/');


  if (!_type) throw new Error('A box shadow must be categorized in a type');
  if (!Object.values(BoxShadowType).includes(_type as BoxShadowType)) throw new Error('A box shadow must have valid type');
  const type: BoxShadowType = _type as BoxShadowType;

  if (!_level) throw new Error('A box shadow must have a level value');
  if (isNaN(+_level)) throw new Error('A box shadow must have numeric level value');
  const level = +_level;

  return { type, level, errors };
}

export function listBorderStyles (): BorderStyle[] {
  return [];
}