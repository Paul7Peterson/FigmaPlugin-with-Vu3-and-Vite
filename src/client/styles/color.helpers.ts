import { ColorValues, ColorName, Color, RGB } from './color.types';
import { rgb } from 'color-convert';

/**
 * @see https://www.w3.org/TR/css-color-4/#color-conversion-code
 * @see https://css-tricks.com/converting-color-spaces-in-javascript/
 */

export function fromRGB ({ r, g, b }: Color) {
  const RGB: RGB = [r, g, b];

  return {
    text: () => `rgb(${r}, ${g}, ${b})`,
    toHEX: {
      array: () => rgb.hex(RGB),
      text: () => {
        const result = rgb.hex(RGB);
        return `#${result}`;
      }
    },
    toHSL: {
      array: () => rgb.hsl(RGB),
      text: () => {
        const [h, s, l] = rgb.hsl(RGB);
        return `hsl(${h}°, ${s}%, ${l}%)`;
      }
    },
    toLCH: {
      array: () => rgb.lch(RGB),
      text: () => {
        const [l, c, h] = rgb.lch(RGB);
        return `lch(${l}%, ${c}, ${h})`;
      }
    },
    toLab: {
      array: () => rgb.lab(RGB),
      text: () => {
        const [l, a, b] = rgb.lab(RGB);
        return `lab(${l}%, ${a}, ${b})`;
      }
    },
    toCMYK: {
      array: () => rgb.cmyk(RGB),
      text: () => {
        const [c, m, y, k] = rgb.cmyk(RGB);
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
