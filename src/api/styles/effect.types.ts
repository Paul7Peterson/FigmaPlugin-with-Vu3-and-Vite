import { BaseToken } from './_shared';
import { SolidColor } from './color.types';

export enum BoxShadowType {
  Elevation = 'Elevation',
  DieCut = 'Die cut',
  Boxed = 'Boxed',
  Setoff = 'Setoff',
}

/** */
export interface BoxShadowStyle extends BaseToken {
  type: BoxShadowType,
  level: number;
  dropShadows: any[];
  innerShadows: any[];
  blurEffects: any[];
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