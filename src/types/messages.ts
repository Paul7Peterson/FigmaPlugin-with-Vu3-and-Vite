import type { GetAllStylesReturn } from '@/client/styles';
import type {
  SolidColor,
  Color,
  SolidColorInfo,
} from '@/client/styles/index.types';

type VoidFunction = (arg: null) => null;

export type UIMessagePayload = {
  createRectangles: (arg: { count: number; }) => null;
  receiveMessage: (arg: { number: number; }) => number;
  getTokens: (arg: null) => GetAllStylesReturn;
  resize: (args: { width: number, height: number; }) => null;
  getColorInfo: (args: Color) => SolidColorInfo;
  listSolidColors: (args: null) => SolidColor[];
  deleteSolidColor: (args: { id: string; }) => null;
  createSolidColor: (args: Color) => SolidColor;
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
