import { UIMessagePayload } from './messages';

export type GenericMessageCollection = Record<string, (arg: any) => any>;

export type MessageInfo<U extends string | number | symbol> = {
  type: U;
  id: string;
};

/** */
export type GenericUIMessage<T extends GenericMessageCollection, U extends keyof T> =
  & MessageInfo<U>
  & { payload: Parameters<T[U]>[0]; };

/** */
export type UIMessage<T extends keyof UIMessagePayload> =
  GenericUIMessage<UIMessagePayload, T>;

/** */
export type AnyUIMessage = UIMessage<keyof UIMessagePayload>;

/** */
export type GenericUIAnswer<T extends GenericMessageCollection, U extends keyof T> =
  & MessageInfo<U>
  & { payload: ReturnType<T[U]>; };

/** */
export type UIAnswer<T extends keyof UIMessagePayload> =
  GenericUIAnswer<UIMessagePayload, T>;

/** */
export type ErrorMessage =
  & MessageInfo<'error'>
  & { payload: { message: string; }; };

/** */
export type BrokerGenericType<T extends GenericMessageCollection> = {
  [K in keyof T]: Parameters<T[K]>[0] extends null
  ? (() => Promise<ReturnType<T[K]>>)
  : ((arg: Parameters<T[K]>[0]) => Promise<ReturnType<T[K]>>)
};