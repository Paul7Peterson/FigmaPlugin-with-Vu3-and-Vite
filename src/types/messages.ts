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

export type UIMessagePayload = {
  getUser: (arg: null) => User;
  initApp: (arg: null) => null;
  resize: (args: { width: number, height: number; }) => null;
  getColorInfo: (args: Color) => SolidColorInfo;
  listSolidColors: (args: null) => SolidColor[];
  listRootSizes: (args: null) => SizesMap;
  listFontStyles: (args: null) => FontStyle[];
  listBoxShadowStyles: (args: null) => BoxShadowStyle[];
  listGridStyles: (args: null) => GridStyle[];
  listGutters: (args: null) => GuttersMap;
  listBorderStyles: (args: null) => BorderStyle[];
  deleteRootSize: (args: RootSize) => null;
  deleteSolidColor: (args: { id: string; }) => null;
  createSolidColor: (args: Color) => SolidColor;
  createRootSize: (args: null) => RootSize;
  createGutter: (args: null) => Gutter;
  modifyRootSizes: (args: RootSize[]) => null;
  modifyGutters: (args: Gutter[]) => null;
  modifySolidColor: (args: { id: string, color: Color; }) => SolidColor;
  closePlugin: VoidFunction;
};

export type UIMessageArg<T extends UIMessageCode> = Parameters<UIMessagePayload[T]>[0];
export type UIMessageReturn<T extends UIMessageCode> = ReturnType<UIMessagePayload[T]>;

export type UIMessageCode = keyof UIMessagePayload;

export type UIMessage<T extends UIMessageCode> = {
  type: T;
  id: string;
  payload: UIMessageArg<T>;
};

export type UIAnswer<T extends UIMessageCode> = {
  type: T;
  id: string;
  payload: UIMessageReturn<T>;
};

export interface ErrorMessage {
  type: 'error';
  id: string;
  payload: { message: string; };
}
