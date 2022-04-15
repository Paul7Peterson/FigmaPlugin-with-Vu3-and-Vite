import {
  UIMessage,
  UIAnswer,
  UIMessageCode,
} from '@/types';

import { createRectangles } from './func';

type BrokerType = Partial<{
  [K in UIMessageCode]: ((msg: UIMessage<K>) => void)
}>;

type AnswerHeader<T extends UIMessageCode> = { type: T, id: string; };

function answer<T extends UIMessageCode> ({ type, id }: AnswerHeader<T>, payload: UIAnswer<T>['payload']): void {
  return figma.ui.postMessage({ type, id, payload });
}

export const PostBroker: BrokerType = {
  receiveMessage: (msg) => answer(msg, msg.payload.number * 2),
  createRectangles: (msg) => {
    createRectangles(msg.payload.count);
    answer(msg, null);
  },
};