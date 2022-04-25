import {
  FigmaComponent
} from '~/api/components/index.types';
import type {
  BorderStyle, BoxShadowStyle, Color, FontStyle, GridStyle, Gutter, RootSize, SolidColor, SolidColorInfo
} from '~/api/tokens/index.types';
import { AppData } from './appData.types';



type VoidFunction = (arg: null) => null;

export type RootSizesUIMessages = {
  listRootSizes: (args: null) => RootSize[];
  createRootSize: (args: null) => RootSize;
  modifyRootSizes: (args: RootSize[]) => null;
  deleteRootSize: (args: RootSize) => null;
};

export type GuttersUIMessages = {
  listGutters: (args: null) => Gutter[];
  modifyGutters: (args: Gutter[]) => null;
  createGutter: (args: 'smaller' | 'bigger') => Gutter;
  deleteGutter: (args: Gutter) => null;
};

export type ColorsUIMessages = {
  getColorInfo: (args: Color) => SolidColorInfo;
  listSolidColors: (args: null) => SolidColor[];
  createSolidColor: (args: Color) => SolidColor;
  modifySolidColor: (args: { id: string, color: Color; }) => SolidColor;
  deleteSolidColor: (args: { id: string; }) => null;
};

export type FontsUIMessages = {
  listFontStyles: (args: null) => FontStyle[];
};

export type BoxShadowsUIMessages = {
  listBoxShadowsStyles: (args: null) => BoxShadowStyle[];
};

export type BordersUIMessages = {
  listBorderStyles: (args: null) => BorderStyle[];
};

export type GridsUIMessages = {
  listGridStyles: (args: null) => GridStyle[];
};

export type ComponentsUIMessages = {
  listComponents: (args: null) => FigmaComponent[];
};

export type UIMessagePayload =
  & RootSizesUIMessages
  & GuttersUIMessages
  & ColorsUIMessages
  & FontsUIMessages
  & BoxShadowsUIMessages
  & BordersUIMessages
  & GridsUIMessages
  & ComponentsUIMessages
  & {
    initApp: (arg: null) => AppData;
    resize: (args: { width: number, height: number; }) => null;
    updateDocumentation: VoidFunction;
    closePlugin: VoidFunction;
  };