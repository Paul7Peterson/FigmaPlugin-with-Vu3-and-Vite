import { BaseToken } from './_shared';

export interface Color {
  r: number;
  g: number;
  b: number;
};


export interface ColorAlpha extends Color {
  a?: number;
};

export type RGB = [x: number, y: number, z: number];

/** */
export const ColorValues = Object.freeze({
  /** */
  Red: { min: 345, def: 0, max: 15 },
  /** */
  Orange: { min: 15, def: 30, max: 36 },
  /** */
  Amber: { min: 36, def: 42, max: 46 },
  /** */
  Ochre: { min: 46, def: 50, max: 55 },
  /** */
  Yellow: { min: 55, def: 60, max: 63 },
  /** */
  Grape: { min: 63, def: 65, max: 71 },
  /** */
  Celery: { min: 71, def: 76, max: 82 },
  /** */
  Lime: { min: 82, def: 87, max: 104 },
  /** */
  Green: { min: 104, def: 120, max: 134 },
  /** */
  Emerald: { min: 134, def: 147, max: 154 },
  /** */
  Turquoise: { min: 154, def: 160, max: 166 },
  /** */
  Verdegris: { min: 166, def: 172, max: 176 },
  /** */
  Cyan: { min: 176, def: 180, max: 185 },
  /** */
  Azure: { min: 185, def: 190, max: 195 },
  /** */
  Cerulean: { min: 195, def: 200, max: 207 },
  /** */
  Cobalt: { min: 207, def: 214, max: 227 },
  /** */
  Blue: { min: 227, def: 240, max: 254 },
  /** */
  Indigo: { min: 254, def: 267, max: 274 },
  /** */
  Violet: { min: 274, def: 280, max: 285 },
  /** */
  Lila: { min: 285, def: 290, max: 295 },
  /** */
  Magenta: { min: 295, def: 300, max: 305 },
  /** */
  Pink: { min: 305, def: 310, max: 315 },
  /** */
  Plum: { min: 315, def: 320, max: 328 },
  /** */
  Carmin: { min: 328, def: 333, max: 345 },
});

/** */
export type ColorName = keyof typeof ColorValues | 'Grey';

export interface SolidColorInfo {
  color: { r: number, g: number, b: number; };
  colorName: ColorName;
  colorShadow: number;
  colorSpaces: {
    RGB: string;
    HEX: string;
    HSL: string;
    Lab: string;
    LCH: string;
    Grey: number;
  };
}

export type SolidColor =
  & BaseToken
  & SolidColorInfo;