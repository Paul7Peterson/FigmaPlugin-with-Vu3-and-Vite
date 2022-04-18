export enum RootSizeName {
  Tiny = 'Tiny',
  Small = 'Small',
  Medium = 'Medium',
  Big = 'Big',
  Huge = 'Huge',
}

export const rootSizeScale: RootSizeName[] = [
  RootSizeName.Tiny,
  RootSizeName.Small,
  RootSizeName.Medium,
  RootSizeName.Big,
  RootSizeName.Huge,
];

export interface RootSize {
  value: number;
  name: RootSizeName;
}

export type SizesMap = Partial<Record<RootSizeName, RootSize>>;

export type GutterName =
  | '3XS'
  | '2XS'
  | 'XS'
  | 'S'
  | 'M'
  | 'L'
  | 'XL'
  | '2XL'
  | '3XL'
  | '4XL'
  | '5XL';

export interface Gutter {
  name: GutterName;
  multiplier: number;
}