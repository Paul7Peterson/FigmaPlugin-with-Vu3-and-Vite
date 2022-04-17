import { parseBaseToken } from './_shared';
import {
  BoxShadowStyle,
  BorderStyle,
  BoxShadowType,
  ExtendedBoxShadowType
} from './effect.types';
import { getColorSpaces, paintToColor } from './color.helpers';

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
      const result: BoxShadowStyle = {
        ...parseBaseToken(effect),
        ...getBoxShadowTypeAndElevation(effect),
        dropShadows: [],
        innerShadows: [],
        backgroundBlurs: [],
        layerBlurs: [],
      };
      effect.effects.forEach((e) => {
        switch (e.type) {
          case 'BACKGROUND_BLUR':
          case 'LAYER_BLUR':
            result[e.type === 'LAYER_BLUR'
              ? 'layerBlurs'
              : 'backgroundBlurs'
            ].push({ blur: e.radius });
            break;
          case 'DROP_SHADOW':
          case 'INNER_SHADOW':
            result[e.type === 'DROP_SHADOW'
              ? 'dropShadows'
              : 'innerShadows'
            ].push({
              blur: e.radius,
              x: e.offset.x,
              y: e.offset.y,
              spread: e.spread || 0,
              blendMode: e.blendMode,
              color: getColorSpaces(paintToColor(e.color))
            });
            break;
          default: throw new Error(`Unknown effect.`);
        } e.type;
      });

      result.errors.push(...validateBoxShadow(result));
      return result;
    });
}

interface ValidationExports {
  type: ExtendedBoxShadowType;
  level: number;
  errors: string[];
  alternativeText?: string;
}

function getBoxShadowTypeAndElevation (effect: EffectStyle): ValidationExports {
  const errors: string[] = [];

  const [_type, _level, ..._] = effect.name.split('/');


  let alternativeText: string = '';
  if (!_type) throw new Error('A box shadow must be categorized in a type');

  let type = _type as ExtendedBoxShadowType;
  if (!Object.values(BoxShadowType).includes(_type as BoxShadowType)) {
    errors.push('A box shadow must have valid type');
    type = 'Other';
  }

  let level = 0;
  if (!_level) {
    errors.push('A box shadow must have a level value');
    alternativeText = _type;
  }
  if (isNaN(+_level)) {
    errors.push('A box shadow must have numeric level value');
    alternativeText = _level;
  } else {
    level = +_level;
  }

  const result: ValidationExports = { type, level, errors };
  if (alternativeText) result.alternativeText = alternativeText;
  return result;
}

export function listBorderStyles (): BorderStyle[] {
  return [];
}

function validateBoxShadow (boxShadow: BoxShadowStyle): string[] {
  const errors: string[] = [];
  // TODO
  return [];
}