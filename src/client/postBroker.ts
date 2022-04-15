import {
  UIMessage,
  UIAnswer,
  UIMessageCode,
} from '@/types';

export type PostBrokerType = {
  [K in UIMessageCode]: ((msg: UIMessage<K>) => void)
};

type AnswerHeader<T extends UIMessageCode> = { type: T, id: string; };

export function answer<T extends UIMessageCode> ({ type, id }: AnswerHeader<T>, payload: UIAnswer<T>['payload']): void {
  return figma.ui.postMessage({ type, id, payload });
}
