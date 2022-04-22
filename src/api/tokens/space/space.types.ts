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

export enum GutterName {
  XS3 = '3XS',
  XS2 = '2XS',
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XL2 = '2XL',
  XL3 = '3XL',
  XL4 = '4XL',
  XL5 = '5XL',
}

export const gutterScale: GutterName[] = [
  GutterName.XS3,
  GutterName.XS2,
  GutterName.XS,
  GutterName.S,
  GutterName.M,
  GutterName.L,
  GutterName.XL,
  GutterName.XL2,
  GutterName.XL3,
  GutterName.XL4,
  GutterName.XL5,
];

export interface Gutter {
  name: GutterName;
  value: number;
}