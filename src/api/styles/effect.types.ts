import { BaseToken } from './_shared';
import { SolidColor, ColorSpaces } from './color.types';

export enum BoxShadowType {
  Elevation = 'Elevation',
  DieCut = 'Die cut',
  Boxed = 'Boxed',
  Setoff = 'Setoff',
}

export type ExtendedBoxShadowType = BoxShadowType | 'Other';


export interface Blur {
  blur: number;
}

export interface Shadow extends Blur {
  x: number;
  y: number;
  spread: number;
  color: ColorSpaces;
  blendMode: string;
}

/** */
export interface BoxShadowStyle extends BaseToken {
  type: ExtendedBoxShadowType,
  level: number;
  dropShadows: Shadow[];
  innerShadows: Shadow[];
  backgroundBlurs: Blur[];
  layerBlurs: Blur[];
  alternativeText?: string;
  errors: string[];
}

export type StrokeDirection =
  | 'Inside'
  | 'Center'
  | 'Outside';

export type StrokeStyle =
  | 'Solid'
  | 'Dash';

export interface BorderStyle extends BaseToken {
  color: SolidColor;
  stroke: {
    width: number;
    direction: StrokeDirection;
    style: StrokeStyle;
  };
}