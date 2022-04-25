import { rgb } from 'color-convert';

import {
  ColorValues,
  ColorName,
  Color,
  RGB,
  SolidColor,
  ColorAlpha
} from './color.types';

function format (number: number): string {
  return number.toString().padStart(3);
}

/**
 * @see https://www.w3.org/TR/css-color-4/#color-conversion-code
 * @see https://css-tricks.com/converting-color-spaces-in-javascript/
 */

export function fromRGB (color: ColorAlpha) {
  Object.entries(color).forEach(([k, v]) => {
    if (v % 1) throw new Error(`"${k}" must be a integer`);
    if (v < 0 || v > 255) throw new Error(`"${k}" must be a value between 0 and 255`);
  });
  const { r, g, b, a } = color;
  const RGB: RGB = [r, g, b];

  return {
    text: () => `rgb(${format(r)}, ${format(g)}, ${format(b)})`,
    toHEX: {
      array: () => rgb.hex(RGB),
      text: () => {
        const result = rgb.hex(RGB);
        const alpha = a ? a.toString(16).toUpperCase().padStart(2, '0') : '';
        return `#${result}${alpha}`;
      },
    },
    toHSL: {
      array: () => rgb.hsl(RGB),
      text: () => {
        const [h, s, l] = rgb.hsl(RGB).map((n) => format(n));
        return `hsl(${h.toString().padStart(3)}°, ${s}%, ${l}%)`;
      }
    },
    toLCH: {
      array: () => rgb.lch(RGB),
      text: () => {
        const [l, c, h] = rgb.lch(RGB).map((n) => format(n));
        return `lch(${l}%, ${c}, ${h})`;
      }
    },
    toLab: {
      array: () => rgb.lab(RGB),
      text: () => {
        const [l, a, b] = rgb.lab(RGB).map((n) => format(n));
        return `lab(${l}%, ${a}, ${b})`;
      }
    },
    toCMYK: {
      array: () => rgb.cmyk(RGB),
      text: () => {
        const [c, m, y, k] = rgb.cmyk(RGB).map((n) => format(n));
        return `cmyk(${c}%, ${m}%, ${y}%, ${k}%)`;
      }
    },
    toGrey: () => rgb.gray(RGB)[0],
  };
}

export function getColorName (color: Color): ColorName {
  const [hue, saturation, _] = fromRGB(color).toHSL.array();

  if (!hue && !saturation) return 'Grey';
  const { min, max } = ColorValues.Red;
  if ((0 <= hue && max >= hue) || (min < hue && 360 >= hue)) return 'Red';

  const value = Object.entries(ColorValues).find(([name, { min, max }]) => {
    if (name === 'Red') return false;
    return min < hue && max >= hue;
  });

  if (!value) throw new Error('Color not properly formatted');
  return value[0] as ColorName;
}

export function getColorShadow (color: Color): number {
  return fromRGB(color).toLCH.array()[0];
}

export function paintToColor ({ r, g, b, a = 0 }: ColorAlpha): ColorAlpha {
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
    a: Math.round(a * 255),
  };
}

export function colorToPaint ({ r, g, b, a }: ColorAlpha): SolidPaint {
  return {
    type: 'SOLID',
    opacity: a || 1,
    visible: true,
    color: { r: r / 255, g: g / 255, b: b / 255 },
  };
}

export function getColorSpaces (color: ColorAlpha & { a: number; }): SolidColor['colorSpaces'] {
  const API = fromRGB(color);
  return {
    RGB: API.text(),
    HEX: API.toHEX.text(),
    HSL: API.toHSL.text(),
    Lab: API.toLab.text(),
    LCH: API.toLCH.text(),
    Grey: API.toGrey(),
    alpha: color.a / 255,
  };
}
