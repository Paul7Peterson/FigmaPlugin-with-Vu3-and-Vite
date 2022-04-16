import { parseBaseToken } from './_shared';
import {
  SolidColor,
  ColorName,
  ColorValues,
  SolidColorInfo,
  Color,
} from './color.types';
import {
  getColorName,
  getColorShadow,
  fromRGB,
} from './color.helpers';

/** */
export function getSolidColors (): SolidColor[] {

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

      const RGBColor = getRGBColor(paint);

      return {
        ...parseBaseToken(color),
        ...getColorNameAndShadowFromName(color),
        color: RGBColor,
        colorSpaces: getColorSpaces(RGBColor),
      };
    });
}

export function modifySolidColor (id: string, color: Color) {
  const baseColor = figma.getStyleById(id);
  if (!baseColor) throw new Error('Color not found');
  if (baseColor.type !== 'PAINT') throw new Error('The token is not a color');
  const parsedColor = baseColor as PaintStyle;

  const paint: SolidPaint = {
    type: 'SOLID',
    opacity: 1,
    visible: true,
    color: {
      r: color.r / 255,
      g: color.g / 255,
      b: color.b / 255,
    },
  };
  parsedColor.paints = [paint];
  parsedColor.name = `${getColorName(color)}/${getColorShadow(color)}`;

  return {
    ...parseBaseToken(parsedColor),
    ...getColorNameAndShadowFromName(parsedColor),
    color,
    colorSpaces: getColorSpaces(color),
  };
}

export function createSolidColor (color: Color): SolidColor {
  const newColor = figma.createPaintStyle();
  return modifySolidColor(newColor.id, color);
}

export function getSolidColorInfo (color: Color): SolidColorInfo {
  return {
    ...getColorNameAndShadow(color),
    color,
    colorSpaces: getColorSpaces(color),
  };
}

export function deleteColor (id: string) {
  const color = figma.getStyleById(id);
  if (!color) throw new Error('Color not found.');
  color.remove();
}

function getRGBColor (paint: SolidPaint): Color {
  return {
    r: Math.round(paint.color.r * 255),
    g: Math.round(paint.color.g * 255),
    b: Math.round(paint.color.b * 255),
  };
}

function getColorNameAndShadow (color: Color): { colorName: ColorName; colorShadow: number; } {
  return { colorName: getColorName(color), colorShadow: getColorShadow(color) };
}

function getColorNameAndShadowFromName (paint: PaintStyle): { colorName: ColorName; colorShadow: number; } {

  const [name, shadow, ..._] = paint.name.split('/');

  if (!name) throw new Error('A solid color must be categorized in a color');
  if (![...Object.keys(ColorValues), 'Grey'].includes(name)) throw new Error('A solid color must have valid color name');
  const colorName: ColorName = name as ColorName;

  if (!shadow) throw new Error('A solid color must have a shadow value');
  if (isNaN(+shadow)) throw new Error('A solid color must have numeric shadow value');
  const colorShadow = +shadow;

  const color = paint.paints[0];
  if (!color || color.type !== 'SOLID') throw new Error('');

  const real = getColorNameAndShadow(getRGBColor(color));

  if (real.colorName !== colorName)
    console.error(`${paint.name} should have the name "${real.colorName}" and not "${colorName}"`);
  if (real.colorShadow !== colorShadow)
    console.error(`${paint.name} should have the name "${real.colorShadow}" and not "${colorShadow}"`);

  return { colorName, colorShadow };
}

export function getColorSpaces (color: Color): SolidColor['colorSpaces'] {
  const API = fromRGB(color);
  return {
    RGB: API.text(),
    HEX: API.toHEX.text(),
    HSL: API.toHSL.text(),
    Lab: API.toLab.text(),
    LCH: API.toLCH.text(),
    Grey: API.toGrey(),
  };
}