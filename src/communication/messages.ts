import type {
  SolidColor,
  Color,
  SolidColorInfo,
  SizesMap,
  RootSize,
  GridStyle,
  BoxShadowStyle,
  FontStyle,
  BorderStyle,
  GuttersMap,
  Gutter,
} from '@/api/styles/index.types';

type VoidFunction = (arg: null) => null;

export type RootSizesUIMessages = {
  listRootSizes: (args: null) => SizesMap;
  createRootSize: (args: null) => RootSize;
  modifyRootSizes: (args: RootSize[]) => null;
  deleteRootSize: (args: RootSize) => null;
};

export type GuttersUIMessages = {
  listGutters: (args: null) => GuttersMap;
  modifyGutters: (args: Gutter[]) => null;
  createGutter: (args: null) => Gutter;
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

export type UIMessagePayload =
  & RootSizesUIMessages
  & GuttersUIMessages
  & ColorsUIMessages
  & FontsUIMessages
  & BoxShadowsUIMessages
  & BordersUIMessages
  & GridsUIMessages
  & {
    getUser: (arg: null) => User;
    initApp: (arg: null) => null;
    resize: (args: { width: number, height: number; }) => null;
    closePlugin: VoidFunction;
  };