type VoidFunction = (arg: null) => null;

export type UIMessagePayload = {
  createRectangles: (arg: { count: number; }) => null;
  receiveMessage: (arg: { number: number; }) => number;
  closePlugin: VoidFunction;
};

export type UIMessageArg<T extends UIMessageCode> = Parameters<UIMessagePayload[T]>[0];
export type UIMessageReturn<T extends UIMessageCode> = ReturnType<UIMessagePayload[T]>;

export type UIMessageCode = keyof UIMessagePayload;

export type UIMessage<T extends UIMessageCode> =
  & {
    type: T;
    id: string;
    payload: UIMessageArg<T>;
  };

export type UIAnswer<T extends UIMessageCode> =
  & {
    type: T;
    id: string;
    payload: UIMessageReturn<T>;
  };