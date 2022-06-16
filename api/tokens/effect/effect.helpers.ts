import { hex } from 'color-convert';

import { colorToPaint } from '../color/color.helpers';
import { BoxShadowStyle, Shadow } from './effect.types';

export function parseEffectFromShadow (shadow: Shadow, type: `${'INNER' | 'DROP'}_SHADOW`): Effect {
  const [r, g, b] = hex.rgb(shadow.color.HEX);
  const RGB = colorToPaint({ r, g, b }).color;
  const a = shadow.color.alpha;
  return {
    type,
    spread: shadow.spread,
    radius: shadow.blur,
    color: { ...RGB, a },
    blendMode: 'NORMAL',
    visible: true,
    offset: { x: shadow.x, y: shadow.y },
  };
}

export function parseCSSBoxShadow (boxShadow: BoxShadowStyle): string {
  const s = boxShadow;

  const shadow = (!s.dropShadows.length && !s.innerShadows.length)
    ? {}
    : {
      'box-shadow': [
        ...s.dropShadows.map((s) => shadowToValue(s)),
        ...s.innerShadows.map((s) => `inset ${shadowToValue(s)}`),
      ].join(',')
    };

  return Object.entries(shadow)
    .map(([k, v]) => `${k}: ${v.includes(',') ? '\n  ' : ''}${v.replaceAll(',', ',\n  ')};`)
    .join('\n');
}

export function shadowToValue (s: Shadow) {
  const values = [s.x, s.y, s.blur, s.spread]
    .map((x) => format(x ? `${x.toFixed(1)}px` : 0)).join(' ');
  const alphaHEX = Math.round(s.color.alpha * 255).toString(16).toUpperCase().padStart(2, '0')
  return `${values} ${s.color.HEX}${alphaHEX}`;
}

function format (number: number | string): string {
  return number.toString().padStart(6);
}
