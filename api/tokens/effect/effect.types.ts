import { ColorSpaces, SolidColor } from '../color/color.types';
import { BaseToken } from '../_shared';

export enum BoxShadowType {
  Elevation = 'Elevation',
  DieCut = 'Die cut',
  Boxed = 'Boxed',
  Setoff = 'Setoff',
  Embossed = 'Embossed',
  Debossed = 'Debossed'
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
