import { parseBaseToken } from '../_shared';
import {
  SolidColor,
  ColorName,
  ColorValues,
  SolidColorInfo,
  Color,
  ColorNameExtended,
} from './color.types';
import {
  getColorName,
  getColorShadow,
  getColorSpaces,
  paintToColor,
  colorToPaint,
} from './color.helpers';

/** */
export async function listSolidColors (): Promise<SolidColor[]> {
  return figma.getLocalPaintStyles()
    .filter((color) => {
      const { paints } = color;
      if (paints.length !== 1 && paints[0].type !== 'SOLID') return false;
      let validColor = true;
      try {
        getColorNameAndShadowFromName(color);
      } catch (error) {
        const msg = `"${color.name} "doesn't follow the naming convention`;
        console.error(msg);
        figma.notify(msg, { error: true });
        validColor = false;
      }
      return validColor && paints[0].opacity === 1;
    })
    .map((color) => {
      const paint = color.paints[0];
      if (paint.type !== 'SOLID') throw new Error('A solid color must have a solid paint');

      const RGBColor = paintToColor(paint.color);

      return {
        ...parseBaseToken(color),
        ...getColorNameAndShadowFromName(color),
        color: RGBColor,
        colorSpaces: getColorSpaces({ ...RGBColor, a: ~~((paint.opacity || 1) * 255) }),
      };
    });
}

/** */
export async function createOrModifySolidColor (color: Color, id?: string): Promise<SolidColor> {
  let parsedColor: PaintStyle;

  if (id) {
    const baseColor = figma.getStyleById(id);
    if (!baseColor) throw new Error('Color not found');
    if (baseColor.type !== 'PAINT') throw new Error('The token is not a color');
    parsedColor = baseColor as PaintStyle;
  } else {
    parsedColor = figma.createPaintStyle();
  }

  parsedColor.paints = [colorToPaint(color)];
  parsedColor.name = `${getColorName(color)}/${getColorShadow(color)}`;

  return {
    ...parseBaseToken(parsedColor),
    ...getColorNameAndShadowFromName(parsedColor),
    color,
    colorSpaces: getColorSpaces({ ...color, a: 255 }),
  };
}

/** */
export function getSolidColorInfo (color: Color): SolidColorInfo {
  return {
    ...getColorNameAndShadow(color),
    color,
    colorSpaces: getColorSpaces({ ...color, a: 255 }),
  };
}

/** */
export async function deleteColor (id: string): Promise<void> {
  const color = figma.getStyleById(id);
  if (!color) throw new Error('Color not found.');
  color.remove();
}

function getColorNameAndShadow (color: Color): { colorName: ColorName; colorShadow: number; } {
  return { colorName: getColorName(color), colorShadow: getColorShadow(color) };
}

interface ValidatedOutput {
  colorName: ColorNameExtended; colorShadow: number; errors: string[]; alternativeText?: string;
}

function getColorNameAndShadowFromName (paint: PaintStyle): ValidatedOutput {
  const errors: string[] = [];

  const [name, shadow, ..._] = paint.name.split('/');

  if (!name) throw new Error('A solid color must have a name');
  let colorName: ColorNameExtended = name as ColorName;
  if (![...Object.keys(ColorValues), 'Grey'].includes(name)) {
    errors.push('A solid color must have valid color name');
    colorName = 'Other';
  }

  let alternativeText: string = '';
  let colorShadow = 100;
  if (!shadow) {
    errors.push('A solid color must have a shadow value');
    alternativeText = name;
  } else {
    if (isNaN(+shadow)) {
      errors.push('A solid color must have numeric shadow value');
      alternativeText = shadow;
    } else {
      colorShadow = +shadow;
    }
  }

  const color = paint.paints[0];
  if (!color || color.type !== 'SOLID') throw new Error('');

  const real = getColorNameAndShadow(paintToColor(color.color));

  if (real.colorName !== colorName) {
    errors.push(`"${paint.name}" should have the name "${real.colorName}" and not "${colorName}"`);
  }
  if (real.colorShadow !== colorShadow)
    errors.push(`"${paint.name}" should have the name "${real.colorShadow}" and not "${colorShadow}"`);

  const result: ValidatedOutput = { colorName, colorShadow, errors };
  if (alternativeText) result.alternativeText = alternativeText;
  return result;
}
