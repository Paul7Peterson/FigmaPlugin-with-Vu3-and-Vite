import { colorToPaint } from '../tokens/color/color.helpers';
import { ColorAlpha } from '../tokens/color/color.types';


export type HorizontalPosition = Lowercase<Exclude<TextNode['textAlignHorizontal'], 'JUSTIFIED'>>;
export type VerticalPosition = Lowercase<TextNode['textAlignVertical']>;

type ResizeOptions =
  | 'hug contents'
  | 'fill container';

export type AutoLayoutDirection =
  | 'horizontal'
  | 'vertical';

export type DirectionalAssign =
  | number
  | [number, number, number, number];

export interface ResizingOptions {
  width?: 'fixed width' | ResizeOptions;
  height?: 'fixed height' | ResizeOptions;
};

export interface NodeSize {
  width: number;
  height: number;
}

export type NodeFill = { color: ColorAlpha; } | DefaultColor;

export const DefaultColor = {
  Black: colorToPaint({ r: 0, g: 0, b: 0 }),
  White: colorToPaint({ r: 255, g: 255, b: 255 }),
};

export type DefaultColor = keyof typeof DefaultColor;

export interface AutoLayoutOptions {
  direction?: AutoLayoutDirection;
  gap?: number;
  padding?: DirectionalAssign;
  align?: [VerticalPosition, HorizontalPosition];
  distribution?: 'packed' | 'space between';
}

export type FontFamily =
  | 'Consolas'
  | 'Fabriga';

export type FontStyle =
  | 'Regular'
  | 'Medium'
  | 'Bold';