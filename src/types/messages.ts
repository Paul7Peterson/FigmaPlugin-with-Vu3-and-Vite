import type { CreateRectanglePayload } from '@/types';

export type UIMessageCode =
  | 'createRectangles'
  | 'receiveMessage'
  | 'closePlugin';

export type UIMessage<T extends UIMessageCode> =
  & {
    type: T;
    id: string;
  }
  & (T extends 'createRectangles' ? CreateRectanglePayload : {});

